"""UK Construction Index data ingestion.

Builds the data behind the construction-cis site's "UK Construction Index"
research asset (a faceless, sourced, data-PR / GEO page). Two intended
sources; one is live, one is documented as a v2 TODO:

  1. Companies House Advanced Search API (COMPANIES_HOUSE_API_KEY) -> monthly
     counts of newly incorporated construction companies by SIC code, plus the
     deduplicated union across all construction SIC codes. The `hits` field is
     gross incorporations (dissolved companies remain on the register, so there
     is no survivorship bias). This is the hero metric: the flux in business
     formation across residential, civil and specialist construction trades.

  2. [TODO v2] ONS monthly construction output for Great Britain -- value of
     all construction output, current prices, seasonally adjusted (series VABQ
     or equivalent from the "Output in the Construction Industry" publication).
     Status: ONS publishes this as XLSX only (no stable CSV or JSON endpoint
     as of 2026-06; the /generator?format=csv and all timeseries API paths
     return 404). The snapshot includes a clearly-labelled placeholder so the
     web layer can render gracefully without the second series, and a future
     ingest pass can fill it in once ONS exposes a stable machine-readable
     feed. Attribution / source block is pre-populated.

Outputs:
  * A static snapshot the web page imports at build time:
    construction-cis/web/src/data/uk-construction-index.json
    (always written under --execute)
  * Optional upsert into Supabase tables construction_incorporations +
    construction_output_series (skipped by default with --no-supabase, since
    the tables may not exist yet -- do not create them until migration is
    reviewed and applied).

Usage:
  python -m optimisation_engine.ingestion.ingest_construction_data --dry-run
  python -m optimisation_engine.ingestion.ingest_construction_data --execute --no-supabase
  python -m optimisation_engine.ingestion.ingest_construction_data --execute
"""
from __future__ import annotations

import argparse
import calendar
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

# Construction SIC codes, three-division coverage:
#
# Division 41 – Building construction
#   41100  Development of building projects (developers; master builders)
#   41201  Construction of commercial buildings
#   41202  Construction of domestic buildings  ← PRIMARY headline line
#
# Division 42 – Civil engineering
#   42110  Construction of roads and motorways
#   42120  Construction of railways and underground railways
#   42130  Construction of bridges and tunnels
#   42910  Construction of water projects
#   42990  Construction of other civil engineering projects
#
# Division 43 – Specialised construction activities
#   43110  Demolition
#   43120  Site preparation
#   43210  Electrical installation
#   43220  Plumbing, heat and air-conditioning installation
#   43290  Other installation activities
#   43310  Plastering
#   43320  Joinery installation
#   43330  Floor and wall covering
#   43341  Painting (UK companies typically use 43341, the GB variant of 43340)
#   43390  Other building completion and finishing
#   43999  Other specialised construction activities n.e.c.
#
# PRIMARY_SIC = 41202 (domestic buildings): the closest proxy to small
# builders/subcontractors incorporating; high volume and the most newsworthy
# trend for residential-focused CIS audiences.
#
# The "All construction" union is the deduplicated count across ALL codes:
# the CH API handles deduplication natively when passed a comma-joined list.

SIC_LABELS: dict[str, str] = {
    # Division 41
    "41100": "Development of building projects",
    "41201": "Construction of commercial buildings",
    "41202": "Construction of domestic buildings",
    # Division 42
    "42110": "Construction of roads and motorways",
    "42120": "Construction of railways and underground railways",
    "42130": "Construction of bridges and tunnels",
    "42910": "Construction of water projects",
    "42990": "Construction of other civil engineering projects n.e.c.",
    # Division 43
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

PRIMARY_SIC = "41202"
ALL_SICS = list(SIC_LABELS.keys())

# Pacing: CH allows 600 requests / 5 min.  A 0.6 s gap keeps us comfortably
# under that limit even across the longest windows (same logic as the landlord
# script, which this mirrors).
CH_SLEEP_S = 0.6

DEFAULT_MONTHS = 132  # 11 years; gives clean full-year comparisons back to 2016

# Companies House indexes very recent incorporations with a short lag, so the
# newest months under-count.  We mark the last N months provisional and never
# base a headline claim on them.
PROVISIONAL_MONTHS = 2

SNAPSHOT_PATH = os.path.join(
    ROOT, "construction-cis", "web", "src", "data", "uk-construction-index.json"
)

SOURCES = [
    {
        "name": "Companies House Advanced Search API",
        "publisher": "Companies House",
        "url": "https://developer.company-information.service.gov.uk/",
        "licence": "Open Government Licence v3.0",
        "attribution": "Data sourced from Companies House under the Open Government Licence v3.0. "
        "Free to cite with attribution to Trade Tax Specialists "
        "(construction-cis.tradeTaxSpecialists.co.uk).",
    },
    {
        "name": "Construction Output in Great Britain (CGBR) — TODO v2",
        "publisher": "Office for National Statistics",
        "url": "https://www.ons.gov.uk/businessindustryandtrade/constructionindustry/"
        "datasets/outputintheconstructionindustry",
        "licence": "Open Government Licence v3.0",
        "series": "VABQ — All work, current prices, seasonally adjusted (£ million)",
        "status": "deferred_v2",
        "note": "ONS publishes this as XLSX only; no stable CSV/JSON endpoint available "
        "as of 2026-06. Second series slot is reserved; web layer renders gracefully "
        "when construction_output is null.",
    },
]

DIVISION_LABELS: dict[str, str] = {
    "41": "Building construction (Division 41)",
    "42": "Civil engineering (Division 42)",
    "43": "Specialised construction activities (Division 43)",
}


# ---------------------------------------------------------------------------
# Date helpers (identical logic to the landlord script)
# ---------------------------------------------------------------------------


def month_windows(n_months: int) -> list[dict[str, str]]:
    """Return the last `n_months` COMPLETE months (oldest first).

    The current month is excluded because it is still in progress.
    """
    today = date.today()
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
            wait = 60 * (attempt + 1)
            print(f"    [rate-limit] sleeping {wait}s ...", flush=True)
            time.sleep(wait)
            continue
        if r.status_code == 404:
            # CH returns 404 when a SIC/date combo has zero registered companies
            # (confirmed by testing: rare civil-engineering codes in low-volume
            # months). Treat as 0, not an error.
            return 0
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
                        "division": sic[:2],
                        "count": cnt,
                        "is_union": False,
                    }
                )
                time.sleep(CH_SLEEP_S)

            # Union: CH API deduplicates natively when given a comma-joined list.
            union = ch_hits(client, ",".join(ALL_SICS), w["frm"], w["to"])
            rows.append(
                {
                    "month": w["month"],
                    "sic_code": "union",
                    "sic_label": "All construction companies (deduplicated union across all 19 SIC codes)",
                    "division": "union",
                    "count": union,
                    "is_union": True,
                }
            )
            time.sleep(CH_SLEEP_S)

            print(
                f"  [{i:3d}/{len(months)}] {w['month']}  "
                f"41202={per_sic.get('41202', 0):5d}  "
                f"41100={per_sic.get('41100', 0):5d}  "
                f"43210={per_sic.get('43210', 0):5d}  "
                f"union={union:6d}",
                flush=True,
            )
    return rows


# ---------------------------------------------------------------------------
# ONS Construction Output (v2 placeholder)
# ---------------------------------------------------------------------------


def fetch_construction_output_placeholder() -> tuple[list[dict[str, Any]], str]:
    """Placeholder for the ONS monthly construction output series.

    TODO v2: Once ONS exposes a stable machine-readable endpoint for the CGBR
    publication (series VABQ -- All work, current prices, SA), implement the
    fetch here. The XLSX is published monthly at:
      https://www.ons.gov.uk/businessindustryandtrade/constructionindustry/
        datasets/outputintheconstructionindustry/current/bulletindataset2.xlsx

    The web layer checks construction_output.available and renders gracefully
    when False.
    """
    return [], ""


# ---------------------------------------------------------------------------
# Snapshot
# ---------------------------------------------------------------------------


def build_snapshot(
    incorp: list[dict[str, Any]],
    incorp_through: str,
) -> dict[str, Any]:
    """Shape the page-ready JSON + computed headline facts."""
    # ---- Monthly pivot: {month: {sic: count, union: count}} ----
    by_month: dict[str, dict[str, int]] = {}
    for r in incorp:
        by_month.setdefault(r["month"], {})[r["sic_code"]] = r["count"]
    months_sorted = sorted(by_month)

    monthly = [{"month": mth, **by_month[mth]} for mth in months_sorted]

    # ---- Annual totals (complete calendar years only) ----
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

    # ---- Per-division annual totals (sum of codes within division) ----
    def sic_series(code: str) -> list[int]:
        return [by_month[m].get(code, 0) for m in months_sorted]

    p_series = sic_series(PRIMARY_SIC)
    u_series = sic_series("union")

    # ---- Settled vs provisional: last PROVISIONAL_MONTHS excluded from claims ----
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

    # Trailing 12 months ending at the last settled month.
    def ttm(code: str) -> int | None:
        s = sic_series(code)[:settled_end]
        return sum(s[-12:]) if len(s) >= 12 else None

    # ---- Decade comparison (full calendar years only) ----
    full_years = [a["year"] for a in annual]
    decade = None
    if full_years:
        y0, y1 = min(full_years), max(full_years)
        a0 = next(a for a in annual if a["year"] == y0)
        a1 = next(a for a in annual if a["year"] == y1)
        p0, p1 = a0.get(PRIMARY_SIC, 0), a1.get(PRIMARY_SIC, 0)
        u0, u1 = a0.get("union", 0), a1.get("union", 0)
        decade = {
            "from_year": y0,
            "to_year": y1,
            "from_value": p0,
            "to_value": p1,
            "multiple": round(p1 / p0, 1) if p0 else None,
            "change_pct": round((p1 - p0) / p0 * 100, 1) if p0 else None,
            "union_from": u0,
            "union_to": u1,
            "union_change_pct": round((u1 - u0) / u0 * 100, 1) if u0 else None,
        }

    # ---- Peak settled month ----
    peak_val = max(p_settled) if p_settled else 0
    peak_month = settled_months[p_settled.index(peak_val)] if p_settled else None

    # ---- Per-SIC zero-data flags (quality signal for callers) ----
    zero_sics = [
        sic for sic in ALL_SICS
        if all(by_month[m].get(sic, 0) == 0 for m in months_sorted)
    ]

    # ---- Division annual breakdown (sums by div within annual) ----
    div_codes: dict[str, list[str]] = {"41": [], "42": [], "43": []}
    for sic in ALL_SICS:
        div = sic[:2]
        if div in div_codes:
            div_codes[div].append(sic)

    annual_by_div = []
    for a in annual:
        entry: dict[str, Any] = {"year": a["year"]}
        for div, codes in div_codes.items():
            entry[f"div{div}"] = sum(a.get(c, 0) for c in codes)
        entry["union"] = a.get("union", 0)
        annual_by_div.append(entry)

    headline = {
        "primary_sic": PRIMARY_SIC,
        "primary_sic_label": SIC_LABELS[PRIMARY_SIC],
        "last_settled_month": last_settled,
        "domestic_building_cos_settled": p_settled[-1] if p_settled else None,
        "domestic_building_cos_yoy_pct": settled_yoy(p_settled),
        "domestic_building_cos_ttm": ttm(PRIMARY_SIC),
        "all_construction_cos_ttm": ttm("union"),
        "decade": decade,
        "peak_month": peak_month,
        "peak_value": peak_val,
        "zero_data_sics": zero_sics,
    }

    return {
        "meta": {
            "generated_at": date.today().isoformat(),
            "incorporations_through": incorp_through,
            "incorporations_settled_through": last_settled,
            "provisional_months": provisional,
            "sic_labels": SIC_LABELS,
            "division_labels": DIVISION_LABELS,
            "sources": SOURCES,
            "attribution": (
                "UK Construction Index data compiled from Companies House public records "
                "(Open Government Licence v3.0). Free to cite with attribution to "
                "Trade Tax Specialists."
            ),
            "notes": (
                "Incorporation counts are gross (dissolved companies remain on the register; "
                "no survivorship bias). Union is the deduplicated count across all 19 "
                "construction SIC codes -- a company registering multiple SIC codes from the "
                "set is counted once. The most recent "
                f"{PROVISIONAL_MONTHS} months are provisional (Companies House indexing lag) "
                "and are excluded from headline figures and decade comparisons."
            ),
        },
        "headline": headline,
        "incorporations": {
            "monthly": monthly,
            "annual": annual,
            "annual_by_division": annual_by_div,
        },
        "construction_output": {
            "available": False,
            "series": "VABQ — All construction output, current prices, SA (ONS CGBR)",
            "status": "deferred_v2",
            "note": (
                "ONS publishes this data as XLSX only (no stable CSV or JSON endpoint "
                "available 2026-06). Monthly series will be populated in a future ingest "
                "pass once a machine-readable feed is available."
            ),
            "monthly": [],
        },
    }


# ---------------------------------------------------------------------------
# Supabase (gated behind --no-supabase default)
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
        r = httpx.post(
            url,
            headers=headers,
            params={"on_conflict": conflict},
            json=chunk,
            timeout=30.0,
        )
        if r.status_code >= 400:
            raise RuntimeError(f"{table} upsert failed: {r.status_code} {r.text[:300]}")
        total += len(chunk)
    return total


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def main() -> None:
    ap = argparse.ArgumentParser(description="Ingest UK Construction Index data.")
    ap.add_argument(
        "--months",
        type=int,
        default=DEFAULT_MONTHS,
        help=f"Months of CH history (default {DEFAULT_MONTHS})",
    )
    ap.add_argument(
        "--dry-run",
        action="store_true",
        help="Fetch + summarise; write nothing",
    )
    ap.add_argument(
        "--execute",
        action="store_true",
        help="Write the JSON snapshot (and Supabase unless --no-supabase)",
    )
    ap.add_argument(
        "--no-supabase",
        action="store_true",
        help="Skip the Supabase upsert (still writes JSON under --execute)",
    )
    args = ap.parse_args()

    if not args.dry_run and not args.execute:
        ap.error("pass --dry-run or --execute")

    windows = month_windows(args.months)
    print(
        f"=== Companies House: {len(windows)} months "
        f"({windows[0]['month']} .. {windows[-1]['month']}) "
        f"× {len(ALL_SICS)} SIC codes + 1 union call/month "
        f"= {len(windows) * (len(ALL_SICS) + 1)} total API calls ==="
    )
    print(f"    Estimated time at {CH_SLEEP_S}s gap: "
          f"~{len(windows) * (len(ALL_SICS) + 1) * CH_SLEEP_S / 60:.0f} minutes")

    incorp = fetch_incorporations(windows)
    incorp_through = windows[-1]["month"]

    print("\n=== ONS Construction Output ===")
    print("  [deferred v2] ONS publishes construction output as XLSX only; "
          "no stable CSV/JSON endpoint found. Placeholder included in snapshot.")

    snapshot = build_snapshot(incorp, incorp_through)
    h = snapshot["headline"]
    d = h["decade"] or {}

    print("\n=== Headline (settled data only) ===")
    print(
        f"  Last settled month {h['last_settled_month']}: "
        f"SIC {PRIMARY_SIC} (domestic buildings) = {h['domestic_building_cos_settled']} "
        f"(YoY {h['domestic_building_cos_yoy_pct']}%)"
    )
    print(
        f"  Trailing 12m: SIC {PRIMARY_SIC} = {h['domestic_building_cos_ttm']}  "
        f"|  all construction (union) = {h['all_construction_cos_ttm']}"
    )
    if d:
        print(
            f"  Decade: {d['from_year']} -> {d['to_year']}  "
            f"primary {d['from_value']} -> {d['to_value']} "
            f"({d['multiple']}x, {'+' if (d['change_pct'] or 0) >= 0 else ''}{d['change_pct']}%)  "
            f"|  union {d['union_from']} -> {d['union_to']}"
        )
    print(f"  Peak settled month: {h['peak_month']} ({h['peak_value']})")
    print(f"  Provisional (excluded): {snapshot['meta']['provisional_months']}")
    if h["zero_data_sics"]:
        print(f"  WARNING zero-data SIC codes: {h['zero_data_sics']}")
    else:
        print("  All SIC codes returned data.")

    # Per-SIC summary for the first and last settled full year
    ann = snapshot["incorporations"]["annual"]
    if ann:
        first_yr = ann[0]
        last_yr = ann[-1]
        print(f"\n=== Annual breakdown: {first_yr['year']} vs {last_yr['year']} ===")
        for sic in ALL_SICS:
            f_val = first_yr.get(sic, 0)
            l_val = last_yr.get(sic, 0)
            lbl = SIC_LABELS[sic][:45]
            print(f"  {sic}  {f_val:6d} -> {l_val:6d}  {lbl}")
        print(f"  union  {first_yr.get('union', 0):6d} -> {last_yr.get('union', 0):6d}  All construction (union)")

    if args.dry_run:
        print("\n[dry-run] no files or DB writes.")
        return

    os.makedirs(os.path.dirname(SNAPSHOT_PATH), exist_ok=True)
    with open(SNAPSHOT_PATH, "w", encoding="utf-8") as f:
        json.dump(snapshot, f, indent=2, ensure_ascii=False)
    print(f"\n[snapshot] wrote {SNAPSHOT_PATH}")

    # Verify round-trip.
    with open(SNAPSHOT_PATH, "r", encoding="utf-8") as f:
        check = json.load(f)
    monthly_count = len(check["incorporations"]["monthly"])
    annual_count = len(check["incorporations"]["annual"])
    print(f"[verify] JSON loads OK: {monthly_count} monthly rows, {annual_count} annual rows")

    if args.no_supabase:
        print("[supabase] skipped (--no-supabase)")
        return

    # Strip division field (not in the DB schema yet) before upsert.
    incorp_db = [
        {k: v for k, v in row.items() if k != "division"}
        for row in incorp
    ]
    n1 = upsert("construction_incorporations", incorp_db, "month,sic_code")
    print(f"[supabase] upserted construction_incorporations={n1}")


if __name__ == "__main__":
    main()
