"""Ingest Companies House legal-sector incorporation counts.

Queries the CH Advanced Search API for monthly company incorporations
under SIC codes 69101, 69102, 69109 (legal activities) from 2015 onwards.

METHOD: The CH advanced-search API supports company_type filtering, but SIC
codes are rarely filed by LLPs in the legal sector -- the API returns 404
(zero hits) for LLP+SIC 69xxx in almost all monthly windows. The LLP vs
incorporated structure story therefore comes from the SRA data embedded
directly in this file (see sra_annual_snapshots below).

For the CH series we fetch:
  - company_type=ltd (private limited companies under legal SICs)
  - no company_type filter (total, all types)
  - ltd_share = ltd / total (proxy for incorporated share from CH)

NOTE: LLP + SIC 69xxx is not queryable via the CH API (LLPs rarely file
SIC codes on incorporation). The incorporated vs LLP split uses SRA data.

Outputs: Solicitors/web/src/data/uk-legal-incorporation-index.json
Licence: Companies House data is published under the Open Government Licence v3.0.
"""
from __future__ import annotations

import calendar
import json
import os
import sys
import time
from datetime import date
from pathlib import Path

import httpx

# ---------------------------------------------------------------------------
CH_BASE = "https://api.company-information.service.gov.uk"
CH_KEY = os.getenv("COMPANIES_HOUSE_API_KEY", "")
CH_SLEEP_S = 0.6
LEGAL_SICS = "69101,69102,69109"

# Output path relative to repo root
REPO_ROOT = Path(__file__).resolve().parent.parent.parent
OUT_PATH = REPO_ROOT / "Solicitors" / "web" / "src" / "data" / "uk-legal-incorporation-index.json"

# ---------------------------------------------------------------------------
# SRA annual snapshots of firm structure (July of each year, % rounded)
# Source: SRA Regulated Community Statistics
# https://www.sra.org.uk/sra/research-publications/regulated-community-statistics/data/solicitor_firms/
# Custom SRA licence -- aggregate statistics only, no named firms.
# ---------------------------------------------------------------------------
SRA_ANNUAL_SNAPSHOTS = [
    # year, sole_pct, partnership_pct, incorporated_pct, llp_pct, other_pct, total
    {"year": 2010, "month": "July",  "sole_pct": 37, "partnership_pct": 33, "incorporated_pct": 17, "llp_pct": 11, "other_pct": 1, "total": 10885, "sole": 4030, "partnership": 3620, "incorporated": 1898, "llp": 1262},
    {"year": 2011, "month": "July",  "sole_pct": 33, "partnership_pct": 30, "incorporated_pct": 22, "llp_pct": 13, "other_pct": 1, "total": 10867, "sole": 3640, "partnership": 3309, "incorporated": 2400, "llp": 1398},
    {"year": 2012, "month": "July",  "sole_pct": 31, "partnership_pct": 28, "incorporated_pct": 25, "llp_pct": 14, "other_pct": 2, "total": 11172, "sole": 3487, "partnership": 3115, "incorporated": 2843, "llp": 1550},
    {"year": 2013, "month": "July",  "sole_pct": 30, "partnership_pct": 26, "incorporated_pct": 29, "llp_pct": 14, "other_pct": 2, "total": 10866, "sole": 3225, "partnership": 2783, "incorporated": 3103, "llp": 1559},
    {"year": 2014, "month": "July",  "sole_pct": 28, "partnership_pct": 24, "incorporated_pct": 33, "llp_pct": 15, "other_pct": 1, "total": 10592, "sole": 2937, "partnership": 2502, "incorporated": 3462, "llp": 1591},
    {"year": 2015, "month": "July",  "sole_pct": 27, "partnership_pct": 22, "incorporated_pct": 36, "llp_pct": 15, "other_pct": 0, "total": 10412, "sole": 2796, "partnership": 2278, "incorporated": 3729, "llp": 1563},
    {"year": 2016, "month": "July",  "sole_pct": 26, "partnership_pct": 20, "incorporated_pct": 39, "llp_pct": 15, "other_pct": 0, "total": 10482, "sole": 2687, "partnership": 2046, "incorporated": 4133, "llp": 1570},
    {"year": 2017, "month": "July",  "sole_pct": 24, "partnership_pct": 18, "incorporated_pct": 43, "llp_pct": 15, "other_pct": 0, "total": 10471, "sole": 2549, "partnership": 1841, "incorporated": 4482, "llp": 1559},
    {"year": 2018, "month": "July",  "sole_pct": 23, "partnership_pct": 16, "incorporated_pct": 45, "llp_pct": 15, "other_pct": 0, "total": 10415, "sole": 2405, "partnership": 1714, "incorporated": 4710, "llp": 1546},
    {"year": 2019, "month": "July",  "sole_pct": 22, "partnership_pct": 16, "incorporated_pct": 47, "llp_pct": 15, "other_pct": 0, "total": 10385, "sole": 2277, "partnership": 1612, "incorporated": 4907, "llp": 1551},
    {"year": 2020, "month": "July",  "sole_pct": 21, "partnership_pct": 15, "incorporated_pct": 49, "llp_pct": 15, "other_pct": 0, "total": 10132, "sole": 2114, "partnership": 1499, "incorporated": 4955, "llp": 1527},
    {"year": 2021, "month": "July",  "sole_pct": 20, "partnership_pct": 14, "incorporated_pct": 51, "llp_pct": 15, "other_pct": 0, "total": 9943,  "sole": 1940, "partnership": 1384, "incorporated": 5085, "llp": 1501},
    {"year": 2022, "month": "July",  "sole_pct": 18, "partnership_pct": 13, "incorporated_pct": 53, "llp_pct": 15, "other_pct": 0, "total": 9731,  "sole": 1777, "partnership": 1265, "incorporated": 5157, "llp": 1497},
    {"year": 2023, "month": "July",  "sole_pct": 17, "partnership_pct": 12, "incorporated_pct": 55, "llp_pct": 16, "other_pct": 0, "total": 9471,  "sole": 1638, "partnership": 1143, "incorporated": 5175, "llp": 1481},
    {"year": 2024, "month": "July",  "sole_pct": 16, "partnership_pct": 11, "incorporated_pct": 56, "llp_pct": 16, "other_pct": 0, "total": 9301,  "sole": 1525, "partnership": 1061, "incorporated": 5221, "llp": 1463},
    {"year": 2025, "month": "July",  "sole_pct": 16, "partnership_pct": 11, "incorporated_pct": 57, "llp_pct": 16, "other_pct": 0, "total": 9053,  "sole": 1410, "partnership": 972,  "incorporated": 5206, "llp": 1436},
    {"year": 2026, "month": "June",  "sole_pct": 15, "partnership_pct": 10, "incorporated_pct": 59, "llp_pct": 16, "other_pct": 0, "total": 8916,  "sole": 1327, "partnership": 906,  "incorporated": 5234, "llp": 1421},
]


def ch_hits(client: httpx.Client, sic_codes: str, frm: str, to: str, company_type: str | None = None) -> int:
    params: dict = {
        "sic_codes": sic_codes,
        "incorporated_from": frm,
        "incorporated_to": to,
        "size": "1",
    }
    if company_type:
        params["company_type"] = company_type
    for attempt in range(4):
        r = client.get(f"{CH_BASE}/advanced-search/companies", params=params)
        if r.status_code == 429:
            wait = 60 * (attempt + 1)
            print(f"    [rate-limit] sleeping {wait}s ...", flush=True)
            time.sleep(wait)
            continue
        if r.status_code == 404:
            return 0
        r.raise_for_status()
        return int(r.json().get("hits", 0) or 0)
    raise RuntimeError(f"CH rate-limited repeatedly for {sic_codes} {frm}..{to}")


def month_windows_from(start_year: int) -> list[dict]:
    today = date.today()
    y, m = today.year, today.month
    # go to previous complete month
    m -= 1
    if m == 0:
        y, m = y - 1, 12
    windows = []
    cy, cm = start_year, 1
    while (cy, cm) <= (y, m):
        last_day = calendar.monthrange(cy, cm)[1]
        windows.append({
            "month": f"{cy:04d}-{cm:02d}",
            "frm": f"{cy:04d}-{cm:02d}-01",
            "to": f"{cy:04d}-{cm:02d}-{last_day:02d}",
        })
        cm += 1
        if cm > 12:
            cy, cm = cy + 1, 1
    return windows


def main() -> None:
    if not CH_KEY:
        print("ERROR: COMPANIES_HOUSE_API_KEY is not set", file=sys.stderr)
        sys.exit(1)

    print("Fetching CH legal-sector incorporation counts (2015-present)...")
    print("SIC codes:", LEGAL_SICS)
    print("Queries: total + ltd per month")
    print()

    windows = month_windows_from(2015)
    monthly: list[dict] = []

    auth = (CH_KEY, "")
    with httpx.Client(auth=auth, timeout=30.0, headers={"Accept": "application/json"}) as client:
        for i, w in enumerate(windows, 1):
            total = ch_hits(client, LEGAL_SICS, w["frm"], w["to"])
            time.sleep(CH_SLEEP_S)
            ltd = ch_hits(client, LEGAL_SICS, w["frm"], w["to"], company_type="ltd")
            time.sleep(CH_SLEEP_S)

            ltd_share = round(ltd / total * 100, 1) if total > 0 else None
            monthly.append({
                "month": w["month"],
                "total": total,
                "ltd": ltd,
                "ltd_share_pct": ltd_share,
            })
            print(f"  [{i:3d}/{len(windows)}] {w['month']}  total={total:4d}  ltd={ltd:4d}  ltd_share={ltd_share}%", flush=True)

    # Sanity checks
    assert all(r["total"] >= 0 for r in monthly), "Negative total found"
    assert all(r["ltd"] >= 0 for r in monthly), "Negative ltd count found"
    assert len(monthly) > 0, "No monthly data"
    print(f"\n[OK] {len(monthly)} months fetched")

    # Annual rollup (complete years only)
    annual_map: dict[int, dict] = {}
    for r in monthly:
        yr = int(r["month"][:4])
        if yr not in annual_map:
            annual_map[yr] = {"year": yr, "total": 0, "ltd": 0}
        annual_map[yr]["total"] += r["total"]
        annual_map[yr]["ltd"] += r["ltd"]

    today = date.today()
    complete_years = [y for y in annual_map if y < today.year]
    annual = []
    for y in sorted(complete_years):
        row = annual_map[y]
        row["ltd_share_pct"] = round(row["ltd"] / row["total"] * 100, 1) if row["total"] > 0 else None
        annual.append(row)

    # Headline metrics
    first_yr = annual[0]
    last_yr = annual[-1]
    decade_change = round((last_yr["total"] - first_yr["total"]) / first_yr["total"] * 100, 1) if first_yr["total"] > 0 else None

    ttm_total = sum(r["total"] for r in monthly[-12:])
    ttm_ltd = sum(r["ltd"] for r in monthly[-12:])

    # SRA headline
    sra_2011 = next(s for s in SRA_ANNUAL_SNAPSHOTS if s["year"] == 2011)
    sra_latest = SRA_ANNUAL_SNAPSHOTS[-1]

    snapshot = {
        "meta": {
            "generated_at": date.today().isoformat(),
            "data_through": monthly[-1]["month"],
            "coverage": f"{monthly[0]['month']}/{monthly[-1]['month']}",
            "sic_codes": LEGAL_SICS,
            "sic_label": "Legal activities (SIC 69101, 69102, 69109)",
            "method": "Companies House Advanced Search API, company_type=ltd + total",
            "note_on_llp": (
                "LLP incorporation counts are not obtainable via the CH advanced-search API "
                "with SIC code filtering: law firm LLPs rarely file SIC codes on incorporation, "
                "so SIC+LLP queries return zero hits in almost all monthly windows. "
                "The LLP vs incorporated firm structure series uses SRA Regulated Community "
                "Statistics instead (see sra_structure_series below)."
            ),
            "sources": [
                {
                    "name": "Companies House Advanced Search API",
                    "publisher": "Companies House (Crown copyright)",
                    "url": "https://api.company-information.service.gov.uk/advanced-search/companies",
                    "licence": "Open Government Licence v3.0",
                    "licence_url": "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
                },
                {
                    "name": "SRA Regulated Community Statistics: Solicitor Firms",
                    "publisher": "Solicitors Regulation Authority",
                    "url": "https://www.sra.org.uk/sra/research-publications/regulated-community-statistics/data/solicitor_firms/",
                    "licence": "SRA custom licence -- aggregate statistics only; no named-firm data",
                    "attribution": "Source: Solicitors Regulation Authority",
                },
            ],
        },
        "headline": {
            "ttm_total": ttm_total,
            "ttm_ltd": ttm_ltd,
            "ttm_ltd_share_pct": round(ttm_ltd / ttm_total * 100, 1) if ttm_total > 0 else None,
            "period_change_pct": decade_change,
            "from_year": first_yr["year"],
            "to_year": last_yr["year"],
            "from_total": first_yr["total"],
            "to_total": last_yr["total"],
            "sra_incorporated_2011_pct": sra_2011["incorporated_pct"],
            "sra_incorporated_latest_pct": sra_latest["incorporated_pct"],
            "sra_incorporated_latest_year": sra_latest["year"],
            "sra_incorporated_latest_month": sra_latest["month"],
            "sra_llp_latest_pct": sra_latest["llp_pct"],
            "sra_total_firms_latest": sra_latest["total"],
        },
        "incorporations": {
            "monthly": monthly,
            "annual": annual,
        },
        "sra_structure_series": SRA_ANNUAL_SNAPSHOTS,
    }

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUT_PATH, "w", encoding="utf-8") as f:
        json.dump(snapshot, f, indent=2)
    print(f"\nWrote {OUT_PATH}")
    print(f"  SRA shift: incorporated {sra_2011['incorporated_pct']}% (Jul 2011) -> {sra_latest['incorporated_pct']}% ({sra_latest['month']} {sra_latest['year']})")
    print(f"  LLP: {sra_2011['llp_pct']}% (Jul 2011) -> {sra_latest['llp_pct']}% ({sra_latest['month']} {sra_latest['year']})")


if __name__ == "__main__":
    # Load .env from repo root
    env_path = Path(__file__).resolve().parent.parent.parent / ".env"
    if env_path.exists():
        for line in env_path.read_text().splitlines():
            if "=" in line and not line.startswith("#"):
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip())
    main()
