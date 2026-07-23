"""UK Construction Payment Practices League -- data ingestion.

Builds a "who pays construction subcontractors slowest" league table from
the Payment Practices Reporting (PPR) service: a statutory public disclosure
that large UK businesses must publish twice a year under the Reporting on
Payment Practices and Performance Regulations 2017.

Method:
  1. Download the full PPR CSV export (all businesses, all periods).
  2. Keep only rows flagged "Qualifying construction contracts in reporting
     period" = True (the company had construction contracts requiring
     Construction Act / retention-clause reporting that period).
  3. Cross-reference each such company's registered SIC codes at Companies
     House, and keep only those whose SIC codes intersect the site's 19-code
     construction universe. This step matters: the QCC flag alone catches
     many companies that are NOT construction businesses (steel makers,
     consumer goods, publishers who simply commissioned building work), so
     without this filter a "construction slowest payers" framing would be
     misleading. Confirmed manually 2026-07-23 (e.g. Tata Steel UK Ltd and
     Church & Dwight UK Ltd have QCC=True but are not construction-SIC).
  4. Take each matched company's most recent filing and rank by "Average
     time to pay" (the statutory self-reported figure; it is the company's
     overall average across all supplier invoices, not isolable to
     construction contracts specifically -- flagged in the page copy).

REPUTATIONAL NOTE (flagged for manager review before deploy): this page
names real, large companies using their own statutory self-disclosure. That
is the entire purpose of the PPR regime (public accountability for payment
practices) and Build UK and others already publish similar leagues, but the
framing should stay neutral and factual (their own filed numbers, not an
accusation) -- see the page copy's caveats section.

Source:
  Payment Practices Reporting service (gov.uk / check-payment-practices.service.gov.uk)
  Licence: Crown Copyright / statutory public register (not OGL-badged, but
  a public disclosure regime -- see gov.uk/guidance/payment-practices-and-performance-reporting-requirements).
  Companies House Advanced Search / company profile API (SIC cross-reference).
  Licence: Open Government Licence v3.0.

Usage:
  python -m optimisation_engine.ingestion.ingest_construction_ppr_league

Self-contained: no Supabase writes, no git commit. Caches the CH SIC lookup
locally (optimisation_engine/.cache/ppr_sic_lookup.json, gitignored) so
repeat runs don't re-fetch ~850+ company profiles every time.
"""
from __future__ import annotations

import csv
import io
import json
import os
import sys
import time
from datetime import date
from pathlib import Path
from typing import Any

import httpx
import requests

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

import optimisation_engine.config  # noqa: E402,F401  (triggers .env load)

PPR_CSV_URL = "https://check-payment-practices.service.gov.uk/export/csv/"
CH_BASE = "https://api.company-information.service.gov.uk"
CH_KEY = os.getenv("COMPANIES_HOUSE_API_KEY", "")

CACHE_PATH = ROOT / "optimisation_engine" / ".cache" / "ppr_sic_lookup.json"
OUT_PATH = (
    ROOT / "construction-cis" / "web" / "src" / "data" / "construction-ppr-league.json"
)

SIC_LABELS = {
    "41100": "Development of building projects",
    "41201": "Construction of commercial buildings",
    "41202": "Construction of domestic buildings",
    "42110": "Construction of roads and motorways",
    "42120": "Construction of railways and underground railways",
    "42130": "Construction of bridges and tunnels",
    "42910": "Construction of water projects",
    "42990": "Construction of other civil engineering projects n.e.c.",
    "43110": "Demolition",
    "43120": "Site preparation",
    "43210": "Electrical installation",
    "43220": "Plumbing, heat and air-conditioning installation",
    "43290": "Other installation activities",
    "43310": "Plastering",
    "43320": "Joinery installation",
    "43330": "Floor and wall covering",
    "43341": "Painting",
    "43390": "Other building completion and finishing",
    "43999": "Other specialised construction activities n.e.c.",
}
ALL_SICS = set(SIC_LABELS)

MIN_YEAR, MAX_YEAR = 2016, date.today().year
RECENT_CUTOFF = f"{date.today().year - 1}-01-01"  # keep filings from the last ~18 months for the "current" league


def download_ppr_csv() -> str:
    r = requests.get(PPR_CSV_URL, timeout=180)
    r.raise_for_status()
    return r.text


def qcc_company_numbers(csv_text: str) -> set[str]:
    reader = csv.DictReader(io.StringIO(csv_text))
    return {
        row["Company number"]
        for row in reader
        if row.get("Qualifying construction contracts in reporting period", "").strip() == "True"
    }


def load_sic_cache() -> dict[str, Any]:
    if CACHE_PATH.exists():
        return json.loads(CACHE_PATH.read_text(encoding="utf-8"))
    return {}


def save_sic_cache(cache: dict[str, Any]) -> None:
    CACHE_PATH.parent.mkdir(parents=True, exist_ok=True)
    CACHE_PATH.write_text(json.dumps(cache, indent=2), encoding="utf-8")


def fetch_sic_codes(company_numbers: set[str], cache: dict[str, Any]) -> dict[str, Any]:
    if not CH_KEY:
        raise RuntimeError("COMPANIES_HOUSE_API_KEY is not set in .env")

    missing = sorted(cn for cn in company_numbers if cn not in cache)
    if not missing:
        print(f"  [cache] all {len(company_numbers)} company profiles already cached")
        return cache

    print(f"  [CH] fetching {len(missing)} new company profiles (cached: {len(company_numbers) - len(missing)})...")
    with httpx.Client(auth=(CH_KEY, ""), timeout=30.0) as client:
        for i, cn in enumerate(missing, 1):
            for attempt in range(4):
                r = client.get(f"{CH_BASE}/company/{cn}")
                if r.status_code == 429:
                    wait = 60 * (attempt + 1)
                    print(f"    [rate-limit] sleeping {wait}s ...", flush=True)
                    time.sleep(wait)
                    continue
                if r.status_code == 404:
                    cache[cn] = {"name": None, "sic_codes": [], "status": "not_found"}
                    break
                r.raise_for_status()
                d = r.json()
                cache[cn] = {"name": d.get("company_name"), "sic_codes": d.get("sic_codes", []), "status": d.get("company_status")}
                break
            time.sleep(0.6)
            if i % 100 == 0:
                print(f"    [{i}/{len(missing)}]", flush=True)
                save_sic_cache(cache)
    save_sic_cache(cache)
    return cache


def build_league(csv_text: str, sic_cache: dict[str, Any]) -> dict[str, Any]:
    construction_numbers = {
        cn for cn, info in sic_cache.items()
        if any(s in ALL_SICS for s in (info.get("sic_codes") or []))
    }

    by_company: dict[str, list[dict[str, Any]]] = {}
    reader = csv.DictReader(io.StringIO(csv_text))
    for row in reader:
        cn = row["Company number"]
        if cn not in construction_numbers:
            continue
        if row.get("Qualifying construction contracts in reporting period", "").strip() != "True":
            continue
        end = row.get("End date", "").strip()
        if not (end[:4].isdigit() and MIN_YEAR <= int(end[:4]) <= MAX_YEAR):
            continue
        try:
            atp = float(row.get("Average time to pay", "").strip())
        except ValueError:
            continue
        by_company.setdefault(cn, []).append({
            "name": row["Company"],
            "end": end,
            "atp": atp,
            "pct_within_30": row.get("% Invoices paid within 30 days", ""),
            "pct_31_60": row.get("% Invoices paid between 31 and 60 days", ""),
            "pct_later_60": row.get("% Invoices paid later than 60 days", ""),
            "pct_not_agreed_terms": row.get("% Invoices not paid within agreed terms", ""),
            "retention_clauses_all": row.get("Retention clauses included in all construction contracts", ""),
            "shortest_term_days": row.get("Shortest (or only) standard payment period", ""),
            "longest_term_days": row.get("Longest standard payment period", ""),
        })

    latest_rows = []
    for cn, recs in by_company.items():
        recs.sort(key=lambda r: r["end"])
        latest = dict(recs[-1])
        latest["company_number"] = cn
        latest["n_filings"] = len(recs)
        sics = sic_cache[cn].get("sic_codes") or []
        matched_sic = next((s for s in sics if s in ALL_SICS), None)
        latest["sic_code"] = matched_sic
        latest["sic_label"] = SIC_LABELS.get(matched_sic, "")
        latest_rows.append(latest)

    # "Current" cohort: most recent filing within the last ~18 months
    current = [r for r in latest_rows if r["end"] >= RECENT_CUTOFF]
    current_sorted = sorted(current, key=lambda r: -r["atp"])

    atp_values = [r["atp"] for r in current]
    n = len(atp_values)
    mean_atp = round(sum(atp_values) / n, 1) if n else None
    sorted_vals = sorted(atp_values)
    median_atp = (
        sorted_vals[n // 2] if n % 2 else round((sorted_vals[n // 2 - 1] + sorted_vals[n // 2]) / 2, 1)
    ) if n else None

    return {
        "meta": {
            "generated_at": date.today().isoformat(),
            "source_url": PPR_CSV_URL,
            "release_page": "https://www.gov.uk/check-when-businesses-pay-invoices",
            "regulations_page": "https://www.gov.uk/government/publications/business-payment-practices-and-performance-directors-reporting-requirements/guidance-to-reporting-on-payment-data-in-directors-reports",
            "current_cohort_cutoff": RECENT_CUTOFF,
            "sources": [
                {
                    "name": "Payment Practices Reporting -- full CSV export",
                    "publisher": "Department for Business and Trade",
                    "url": PPR_CSV_URL,
                    "release_page": "https://www.gov.uk/check-when-businesses-pay-invoices",
                    "licence": "Statutory public disclosure (Reporting on Payment Practices and Performance Regulations 2017)",
                    "retrieved": date.today().isoformat(),
                    "attribution": (
                        "Data sourced from the Payment Practices Reporting service (gov.uk), a "
                        "statutory disclosure every large UK business must publish twice yearly. "
                        "Free to cite with attribution to Trade Tax Specialists."
                    ),
                },
                {
                    "name": "Companies House company profile API (SIC cross-reference)",
                    "publisher": "Companies House",
                    "url": "https://developer.company-information.service.gov.uk/",
                    "licence": "Open Government Licence v3.0",
                    "attribution": "Companies House public records, Open Government Licence v3.0.",
                },
            ],
            "notes": (
                "'Average time to pay' is each company's own statutory self-reported figure, "
                "an overall average across all supplier invoices in the reporting period, not "
                "isolable to construction contracts alone (the PPR return does not separate "
                "average days-to-pay by contract type). Companies are included here only if "
                "they (a) flagged having qualifying construction contracts in the reporting "
                "period, i.e. contracts subject to the Construction Act / retention-clause "
                "reporting requirements, AND (b) are registered at Companies House under one of "
                "the 19 construction SIC codes this site tracks elsewhere. The QCC flag alone is "
                "not sufficient: many large businesses outside construction (manufacturers, "
                "retailers, publishers who commissioned building work) also flag it, and are "
                "excluded here by the SIC cross-reference. 'Current cohort' = each company's "
                "most recent filing with a period end date on or after " + RECENT_CUTOFF + "."
            ),
            "attribution": (
                "UK Construction Payment Practices League compiled from the Payment Practices "
                "Reporting service (statutory disclosure) cross-referenced against Companies "
                "House SIC codes (Open Government Licence v3.0). Free to cite with attribution "
                "to Trade Tax Specialists."
            ),
        },
        "headline": {
            "n_companies": n,
            "mean_days_to_pay": mean_atp,
            "median_days_to_pay": median_atp,
            "slowest": current_sorted[0] if current_sorted else None,
            "fastest": current_sorted[-1] if current_sorted else None,
        },
        "companies": current_sorted,
    }


def main() -> None:
    print("Downloading Payment Practices Reporting full CSV export...")
    csv_text = download_ppr_csv()
    print(f"  {len(csv_text):,} bytes")

    numbers = qcc_company_numbers(csv_text)
    print(f"Unique companies ever flagged 'qualifying construction contracts': {len(numbers)}")

    cache = load_sic_cache()
    cache = fetch_sic_codes(numbers, cache)

    matched = sum(1 for cn in numbers if any(s in ALL_SICS for s in (cache.get(cn, {}).get("sic_codes") or [])))
    print(f"Matched to construction SIC codes: {matched} / {len(numbers)}")

    league = build_league(csv_text, cache)

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(league, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\n[snapshot] wrote {OUT_PATH}")

    # Self-check
    h = league["headline"]
    assert h["n_companies"] > 0, "no companies in current cohort"
    assert h["slowest"] and h["fastest"], "missing slowest/fastest"
    assert h["slowest"]["atp"] >= h["fastest"]["atp"], "sort order broken"
    for c in league["companies"]:
        assert c["atp"] >= 0, f"negative ATP for {c['name']}"
    print("[self-check] PASS")
    print(f"n={h['n_companies']}, mean={h['mean_days_to_pay']}, median={h['median_days_to_pay']}")
    print(f"Slowest: {h['slowest']['name']} ({h['slowest']['atp']} days)")
    print(f"Fastest: {h['fastest']['name']} ({h['fastest']['atp']} days)")


if __name__ == "__main__":
    main()
