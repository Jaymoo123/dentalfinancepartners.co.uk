"""Landlord Tax Index data ingestion.

Builds the data behind the Property site's "UK Landlord Tax Index" research
asset (a faceless, sourced, data-PR / GEO page). Two real, current public
sources, no scraping:

  1. Companies House Advanced Search API (COMPANIES_HOUSE_API_KEY) -> monthly
     counts of newly incorporated property companies by SIC code, plus the
     deduplicated union across the four property SIC codes. The `hits` field is
     gross incorporations (dissolved companies remain on the register, so there
     is no survivorship bias). This is the hero metric: the Section-24-driven
     surge in landlord limited companies.

  2. HM Land Registry UK House Price Index (open CSV, no key) -> monthly average
     price + annual change for the UK, the four nations and London. Context for
     the CGT / SDLT exposure that pushes landlords to incorporate.

Outputs:
  * A committed static snapshot the web page imports at build time:
    Property/web/src/data/landlord-tax-index.json  (always written under --execute)
  * Optional upsert into Supabase tables landlord_incorporations +
    housing_market_series (skipped with --no-supabase, e.g. before the migration
    is applied).

Usage:
  python -m optimisation_engine.ingestion.ingest_landlord_data --dry-run
  python -m optimisation_engine.ingestion.ingest_landlord_data --execute --no-supabase
  python -m optimisation_engine.ingestion.ingest_landlord_data --execute

Rents are intentionally NOT in v1: the only API-accessible rent series (ONS
IPHRP) was discontinued at Jan 2024, and presenting stale data as current would
breach the quality bar. The live PIPR (spreadsheet-only) is a documented v2.
"""
from __future__ import annotations

import argparse
import calendar
import csv
import io
import json
import os
import sys
import time
from datetime import date
from typing import Any

import httpx

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL  # noqa: E402

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

CH_BASE = "https://api.company-information.service.gov.uk"
CH_KEY = os.getenv("COMPANIES_HOUSE_API_KEY", "")

# The four real-estate SIC codes. 68209 is the classic buy-to-let SPV code and
# is treated as the primary "landlord company" line; the union of all four is
# the "all property companies" total.
SIC_LABELS: dict[str, str] = {
    "68100": "Buying and selling of own real estate",
    "68201": "Renting and operating of Housing Association real estate",
    "68209": "Other letting and operating of own or leased real estate",
    "68320": "Management of real estate on a fee or contract basis",
}
PRIMARY_SIC = "68209"
ALL_SICS = list(SIC_LABELS.keys())

# Pacing: CH allows 600 requests / 5 min. A 0.6s gap keeps us comfortably under
# that even across the longest windows (2 calls/sec would sit exactly on the
# limit, so we stay a little below).
CH_SLEEP_S = 0.6

DEFAULT_MONTHS = 132  # 11 years; gives clean full-year comparisons back to 2016

# Companies House indexes very recent incorporations with a short lag, so the
# newest months under-count. We mark the last N months provisional and never
# base a headline claim on them (claims rest on annual + trailing-12-month).
PROVISIONAL_MONTHS = 2

# HM Land Registry UK HPI "Average prices" monthly file.
HPI_URL = (
    "http://publicdata.landregistry.gov.uk/market-trend-data/"
    "house-price-index-data/Average-prices-{ym}.csv"
)
HPI_REGIONS = [
    "United Kingdom",
    "England",
    "London",
    "Wales",
    "Scotland",
    "Northern Ireland",
]

SNAPSHOT_PATH = os.path.join(
    ROOT, "Property", "web", "src", "data", "landlord-tax-index.json"
)

SOURCES = [
    {
        "name": "Companies House Advanced Search API",
        "publisher": "Companies House",
        "url": "https://developer.company-information.service.gov.uk/",
    },
    {
        "name": "UK House Price Index",
        "publisher": "HM Land Registry / ONS",
        "url": "https://www.gov.uk/government/collections/uk-house-price-index-reports",
    },
]


# ---------------------------------------------------------------------------
# Date helpers
# ---------------------------------------------------------------------------


def month_windows(n_months: int) -> list[dict[str, str]]:
    """Return the last `n_months` COMPLETE months (oldest first).

    The current month is excluded because it is still in progress.
    """
    today = date.today()
    # Walk back to the first day of last month.
    y, m = today.year, today.month
    m -= 1
    if m == 0:
        y, m = y - 1, 12

    out: list[dict[str, str]] = []
    for _ in range(n_months):
        last_day = calendar.monthrange(y, m)[1]
        out.append(
            {
                "month": f"{y:04d}-{m:02d}",
                "frm": f"{y:04d}-{m:02d}-01",
                "to": f"{y:04d}-{m:02d}-{last_day:02d}",
            }
        )
        m -= 1
        if m == 0:
            y, m = y - 1, 12
    out.reverse()
    return out


# ---------------------------------------------------------------------------
# Companies House
# ---------------------------------------------------------------------------


def ch_hits(client: httpx.Client, sic_codes: str, frm: str, to: str) -> int:
    """Count companies (any status) incorporated in [frm, to] with the given
    SIC code(s). `sic_codes` may be a single code or a comma-joined list (the
    API returns the deduplicated union for a list)."""
    params = {
        "sic_codes": sic_codes,
        "incorporated_from": frm,
        "incorporated_to": to,
        "size": "1",
    }
    for attempt in range(4):
        r = client.get(f"{CH_BASE}/advanced-search/companies", params=params)
        if r.status_code == 429:
            time.sleep(60 * (attempt + 1))
            continue
        r.raise_for_status()
        return int(r.json().get("hits", 0) or 0)
    raise RuntimeError(f"CH rate-limited repeatedly for {sic_codes} {frm}..{to}")


def fetch_incorporations(months: list[dict[str, str]]) -> list[dict[str, Any]]:
    """Per-SIC + union monthly counts. Returns rows for both Supabase and the
    snapshot."""
    if not CH_KEY:
        raise RuntimeError("COMPANIES_HOUSE_API_KEY is not set in .env")
    rows: list[dict[str, Any]] = []
    auth = (CH_KEY, "")
    with httpx.Client(auth=auth, timeout=30.0, headers={"Accept": "application/json"}) as client:
        for i, w in enumerate(months, 1):
            per_sic: dict[str, int] = {}
            for sic in ALL_SICS:
                cnt = ch_hits(client, sic, w["frm"], w["to"])
                per_sic[sic] = cnt
                rows.append(
                    {
                        "month": w["month"],
                        "sic_code": sic,
                        "sic_label": SIC_LABELS[sic],
                        "count": cnt,
                        "is_union": False,
                    }
                )
                time.sleep(CH_SLEEP_S)
            union = ch_hits(client, ",".join(ALL_SICS), w["frm"], w["to"])
            rows.append(
                {
                    "month": w["month"],
                    "sic_code": "union",
                    "sic_label": "All property companies (deduplicated)",
                    "count": union,
                    "is_union": True,
                }
            )
            time.sleep(CH_SLEEP_S)
            print(
                f"  [{i:3d}/{len(months)}] {w['month']}  "
                f"68209={per_sic['68209']:5d}  union={union:5d}",
                flush=True,
            )
    return rows


# ---------------------------------------------------------------------------
# House prices (Land Registry UK HPI)
# ---------------------------------------------------------------------------


def latest_hpi_month() -> str:
    """Discover the most recent published Average-prices-YYYY-MM.csv by probing
    backwards from last month (the release lags ~6 weeks)."""
    today = date.today()
    y, m = today.year, today.month
    for _ in range(6):
        m -= 1
        if m == 0:
            y, m = y - 1, 12
        ym = f"{y:04d}-{m:02d}"
        r = httpx.head(HPI_URL.format(ym=ym), timeout=20.0, follow_redirects=True)
        if r.status_code == 200:
            return ym
    raise RuntimeError("Could not find a published UK HPI Average-prices file")


def fetch_house_prices(start_month: str) -> tuple[list[dict[str, Any]], str]:
    """Download the latest UK HPI file, filter to target regions and to months
    >= start_month. Returns (rows, hpi_through)."""
    ym = latest_hpi_month()
    r = httpx.get(HPI_URL.format(ym=ym), timeout=120.0, follow_redirects=True)
    r.raise_for_status()
    reader = csv.DictReader(io.StringIO(r.text))
    regions = set(HPI_REGIONS)
    rows: list[dict[str, Any]] = []
    latest_seen = ""
    for rec in reader:
        region = (rec.get("Region_Name") or "").strip()
        if region not in regions:
            continue
        d = (rec.get("Date") or "").strip()  # YYYY-MM-01
        if len(d) < 7:
            continue
        month = d[:7]
        if month > latest_seen:
            latest_seen = month
        if month < start_month:
            continue
        price = rec.get("Average_Price")
        ann = rec.get("Annual_Change")
        try:
            price_v = round(float(price)) if price not in (None, "") else None
        except ValueError:
            price_v = None
        try:
            ann_v = round(float(ann), 1) if ann not in (None, "") else None
        except ValueError:
            ann_v = None
        if price_v is None:
            continue
        rows.append(
            {"month": month, "region": region, "metric": "avg_price", "value": price_v, "source": "uk_hpi"}
        )
        if ann_v is not None:
            rows.append(
                {"month": month, "region": region, "metric": "annual_change_pct", "value": ann_v, "source": "uk_hpi"}
            )
    return rows, latest_seen


# ---------------------------------------------------------------------------
# Snapshot
# ---------------------------------------------------------------------------


def build_snapshot(
    incorp: list[dict[str, Any]],
    hpi: list[dict[str, Any]],
    incorp_through: str,
    hpi_through: str,
) -> dict[str, Any]:
    """Shape the page-ready JSON + computed headline facts."""
    # Monthly incorporations pivot: {month: {sic: count, union: count}}
    by_month: dict[str, dict[str, int]] = {}
    for r in incorp:
        by_month.setdefault(r["month"], {})[r["sic_code"]] = r["count"]
    months_sorted = sorted(by_month)
    monthly = [{"month": mth, **by_month[mth]} for mth in months_sorted]

    # Annual totals (complete calendar years only).
    annual_acc: dict[int, dict[str, int]] = {}
    month_count: dict[int, int] = {}
    for mth in months_sorted:
        yr = int(mth[:4])
        month_count[yr] = month_count.get(yr, 0) + 1
        acc = annual_acc.setdefault(yr, {})
        for k, v in by_month[mth].items():
            acc[k] = acc.get(k, 0) + v
    annual = [
        {"year": yr, **annual_acc[yr]}
        for yr in sorted(annual_acc)
        if month_count[yr] == 12
    ]

    def sic_series(code: str) -> list[int]:
        return [by_month[m].get(code, 0) for m in months_sorted]

    p_series = sic_series(PRIMARY_SIC)
    u_series = sic_series("union")

    # Settled vs provisional: the last PROVISIONAL_MONTHS under-count (CH index
    # lag), so headline claims use only settled months / complete years.
    n = len(months_sorted)
    settled_end = max(0, n - PROVISIONAL_MONTHS)
    settled_months = months_sorted[:settled_end]
    provisional = months_sorted[settled_end:]
    p_settled = p_series[:settled_end]
    last_settled = settled_months[-1] if settled_months else None

    def settled_yoy(series_settled: list[int]) -> float | None:
        if len(series_settled) < 13 or series_settled[-13] == 0:
            return None
        return round((series_settled[-1] - series_settled[-13]) / series_settled[-13] * 100, 1)

    # Trailing 12 months ending at the last settled month (robust to lag + season).
    def ttm(code: str) -> int | None:
        s = sic_series(code)[:settled_end]
        return sum(s[-12:]) if len(s) >= 12 else None

    # Annual full-year decade comparison for the primary SIC.
    full_years = [a["year"] for a in annual]
    decade = None
    if full_years:
        y0, y1 = min(full_years), max(full_years)
        a0 = next(a for a in annual if a["year"] == y0)
        a1 = next(a for a in annual if a["year"] == y1)
        p0, p1 = a0.get(PRIMARY_SIC, 0), a1.get(PRIMARY_SIC, 0)
        decade = {
            "from_year": y0,
            "to_year": y1,
            "from_value": p0,
            "to_value": p1,
            "multiple": round(p1 / p0, 1) if p0 else None,
            "change_pct": round((p1 - p0) / p0 * 100, 1) if p0 else None,
            "union_from": a0.get("union", 0),
            "union_to": a1.get("union", 0),
        }

    peak_val = max(p_settled) if p_settled else 0
    peak_month = settled_months[p_settled.index(peak_val)] if p_settled else None

    headline = {
        "primary_sic": PRIMARY_SIC,
        "primary_sic_label": SIC_LABELS[PRIMARY_SIC],
        "last_settled_month": last_settled,
        "landlord_cos_settled": p_settled[-1] if p_settled else None,
        "landlord_cos_yoy_pct": settled_yoy(p_settled),
        "landlord_cos_ttm": ttm(PRIMARY_SIC),
        "all_property_cos_ttm": ttm("union"),
        "decade": decade,
        "peak_month": peak_month,
        "peak_value": peak_val,
    }

    # House prices pivots.
    hp_by_month: dict[str, dict[str, Any]] = {}
    hp_latest: dict[str, dict[str, Any]] = {}
    hp_latest_month = ""
    for r in hpi:
        if r["metric"] == "avg_price":
            hp_by_month.setdefault(r["month"], {})[r["region"]] = r["value"]
            if r["month"] > hp_latest_month:
                hp_latest_month = r["month"]
    for r in hpi:
        if r["month"] == hp_latest_month:
            entry = hp_latest.setdefault(r["region"], {})
            entry["price" if r["metric"] == "avg_price" else "annual_change_pct"] = r["value"]
    hp_monthly = [{"month": m, **hp_by_month[m]} for m in sorted(hp_by_month)]

    return {
        "meta": {
            "generated_at": date.today().isoformat(),
            "incorporations_through": incorp_through,
            "incorporations_settled_through": last_settled,
            "provisional_months": provisional,
            "house_prices_through": hpi_through,
            "sic_labels": SIC_LABELS,
            "sources": SOURCES,
            "notes": "Incorporation counts are gross (dissolved companies remain on the register). "
            "Union is the deduplicated count across the four real-estate SIC codes. The most recent "
            f"{PROVISIONAL_MONTHS} months are provisional (Companies House indexing lag) and are excluded "
            "from headline figures.",
        },
        "headline": headline,
        "incorporations": {"monthly": monthly, "annual": annual},
        "house_prices": {"regions": HPI_REGIONS, "monthly": hp_monthly, "latest": hp_latest},
    }


# ---------------------------------------------------------------------------
# Supabase
# ---------------------------------------------------------------------------


def upsert(table: str, rows: list[dict[str, Any]], conflict: str) -> int:
    if not rows:
        return 0
    url = f"{SUPABASE_URL}/rest/v1/{table}"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates,return=minimal",
    }
    total = 0
    for i in range(0, len(rows), 500):
        chunk = rows[i : i + 500]
        r = httpx.post(url, headers=headers, params={"on_conflict": conflict}, json=chunk, timeout=30.0)
        if r.status_code >= 400:
            raise RuntimeError(f"{table} upsert failed: {r.status_code} {r.text[:300]}")
        total += len(chunk)
    return total


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def main() -> None:
    ap = argparse.ArgumentParser(description="Ingest Landlord Tax Index data.")
    ap.add_argument("--months", type=int, default=DEFAULT_MONTHS, help=f"Months of CH history (default {DEFAULT_MONTHS})")
    ap.add_argument("--dry-run", action="store_true", help="Fetch + summarise; write nothing")
    ap.add_argument("--execute", action="store_true", help="Write the JSON snapshot (and Supabase unless --no-supabase)")
    ap.add_argument("--no-supabase", action="store_true", help="Skip the Supabase upsert (still writes JSON under --execute)")
    args = ap.parse_args()

    if not args.dry_run and not args.execute:
        ap.error("pass --dry-run or --execute")

    windows = month_windows(args.months)
    print(f"=== Companies House: {len(windows)} months ({windows[0]['month']} .. {windows[-1]['month']}) ===")
    incorp = fetch_incorporations(windows)
    incorp_through = windows[-1]["month"]

    print("=== UK House Price Index ===")
    hpi, hpi_through = fetch_house_prices(start_month=windows[0]["month"])
    print(f"  parsed {len(hpi)} rows across {len(HPI_REGIONS)} regions; through {hpi_through}")

    snapshot = build_snapshot(incorp, hpi, incorp_through, hpi_through)
    h = snapshot["headline"]
    d = h["decade"] or {}
    print("\n=== Headline (settled data only) ===")
    print(f"  Last settled month {h['last_settled_month']}: SIC {PRIMARY_SIC} = {h['landlord_cos_settled']} "
          f"(YoY {h['landlord_cos_yoy_pct']}%)")
    print(f"  Trailing 12m: SIC {PRIMARY_SIC} = {h['landlord_cos_ttm']}  |  all property (union) = {h['all_property_cos_ttm']}")
    if d:
        print(f"  Decade: {d['from_year']} {d['from_value']} -> {d['to_year']} {d['to_value']} "
              f"({d['multiple']}x, +{d['change_pct']}%)")
    print(f"  Peak settled month: {h['peak_month']} ({h['peak_value']})")
    print(f"  Provisional (excluded): {snapshot['meta']['provisional_months']}")
    print(f"  House prices through {hpi_through}; UK latest: {snapshot['house_prices']['latest'].get('United Kingdom')}")

    if args.dry_run:
        print("\n[dry-run] no files or DB writes.")
        return

    os.makedirs(os.path.dirname(SNAPSHOT_PATH), exist_ok=True)
    with open(SNAPSHOT_PATH, "w", encoding="utf-8") as f:
        json.dump(snapshot, f, indent=2, ensure_ascii=False)
    print(f"\n[snapshot] wrote {SNAPSHOT_PATH}")

    if args.no_supabase:
        print("[supabase] skipped (--no-supabase)")
        return

    n1 = upsert("landlord_incorporations", incorp, "month,sic_code")
    n2 = upsert("housing_market_series", hpi, "month,region,metric")
    print(f"[supabase] upserted landlord_incorporations={n1}  housing_market_series={n2}")


if __name__ == "__main__":
    main()
