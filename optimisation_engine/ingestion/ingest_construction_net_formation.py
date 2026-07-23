"""UK Construction Net Formation Index -- data ingestion.

Net formation = new incorporations minus dissolutions, per calendar year, for
the construction SIC universe already tracked by uk-construction-index.json.

Incorporations are NOT re-fetched: this script reads the annual union/division/
primary-segment totals straight out of the already-committed
construction-cis/web/src/data/uk-construction-index.json (same Companies House
Advanced Search source, already gross and deduplicated). Only dissolutions are
fetched fresh, via Companies House Advanced Search with
company_status=dissolved + dissolved_from/dissolved_to (no bulk download
needed -- confirmed working 2026-07-23).

Source:
  Companies House Advanced Search API (incorporations AND dissolutions)
  Licence: Open Government Licence v3.0

Usage:
  python -m optimisation_engine.ingestion.ingest_construction_net_formation

Self-contained: no Supabase, no git commit.
"""
from __future__ import annotations

import calendar
import json
import os
import sys
import time
from datetime import date
from pathlib import Path
from typing import Any

import httpx

ROOT = str(Path(__file__).resolve().parents[2])
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

import optimisation_engine.config  # noqa: E402,F401  (triggers .env load)

CH_BASE = "https://api.company-information.service.gov.uk"
CH_KEY = os.getenv("COMPANIES_HOUSE_API_KEY", "")
CH_SLEEP_S = 0.6

DIV41 = ["41100", "41201", "41202"]
DIV42 = ["42110", "42120", "42130", "42910", "42990"]
DIV43 = ["43110", "43120", "43210", "43220", "43290", "43310", "43320", "43330", "43341", "43390", "43999"]
ALL_SICS = DIV41 + DIV42 + DIV43

# (segment key, sic codes, label)
SEGMENTS: list[tuple[str, list[str], str]] = [
    ("union", ALL_SICS, "All construction companies (deduplicated, 19 SIC codes)"),
    ("div41", DIV41, "Building construction (Division 41)"),
    ("div42", DIV42, "Civil engineering (Division 42)"),
    ("div43", DIV43, "Specialised construction activities (Division 43)"),
    ("primary_41202", ["41202"], "Construction of domestic buildings (SIC 41202)"),
]

INDEX_SNAPSHOT_PATH = (
    Path(__file__).resolve().parents[2]
    / "construction-cis" / "web" / "src" / "data" / "uk-construction-index.json"
)
OUT_PATH = (
    Path(__file__).resolve().parents[2]
    / "construction-cis" / "web" / "src" / "data" / "construction-net-formation-index.json"
)

LICENCE = "Open Government Licence v3.0"
ATTRIBUTION = (
    "UK Construction Net Formation Index compiled from Companies House public "
    "records (Open Government Licence v3.0). Free to cite with attribution to "
    "Trade Tax Specialists."
)


def ch_dissolved_hits(client: httpx.Client, sic_codes: str, frm: str, to: str) -> int:
    """Count companies DISSOLVED in [frm, to] for the given SIC code(s).

    Mirrors companies_house.ch_hits but queries company_status=dissolved +
    dissolved_from/dissolved_to instead of incorporated_from/incorporated_to.
    404 -> 0 (confirmed CH behaviour for zero-hit SIC/date combinations).
    """
    params = {
        "sic_codes": sic_codes,
        "company_status": "dissolved",
        "dissolved_from": frm,
        "dissolved_to": to,
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
            return 0
        r.raise_for_status()
        return int(r.json().get("hits", 0) or 0)
    raise RuntimeError(f"CH rate-limited repeatedly for {sic_codes} {frm}..{to}")


def fetch_dissolutions_by_year(years: list[int], current_year_to: str) -> dict[str, dict[str, int]]:
    """{segment_key: {year_str: dissolutions_count}} for every segment/year.

    current_year_to: the "dissolved_to" bound for the in-progress current year.
    Must match the incorporations settled-through date (not today) so the
    partial-year comparison is apples-to-apples -- dissolutions have no
    indexing lag, but incorporations do, so capping both to the same date
    avoids an artificially negative partial-year "net" from the extra weeks
    of dissolutions the incorporations side hasn't caught up to yet.
    """
    if not CH_KEY:
        raise RuntimeError("COMPANIES_HOUSE_API_KEY is not set in .env")

    out: dict[str, dict[str, int]] = {}
    with httpx.Client(auth=(CH_KEY, ""), timeout=30.0, headers={"Accept": "application/json"}) as client:
        for seg_key, sics, label in SEGMENTS:
            out[seg_key] = {}
            sic_param = ",".join(sics)
            for year in years:
                frm = f"{year}-01-01"
                to = f"{year}-12-31" if year < date.today().year else current_year_to
                n = ch_dissolved_hits(client, sic_param, frm, to)
                out[seg_key][str(year)] = n
                time.sleep(CH_SLEEP_S)
            print(f"  [{label}] {out[seg_key]}", flush=True)
    return out


def main() -> None:
    if not INDEX_SNAPSHOT_PATH.exists():
        raise RuntimeError(
            f"{INDEX_SNAPSHOT_PATH} not found -- run the uk-construction-index "
            "engine ingest first (this script reuses its annual incorporations)."
        )
    index_snap = json.loads(INDEX_SNAPSHOT_PATH.read_text(encoding="utf-8"))
    annual_by_year = {a["year"]: a for a in index_snap["incorporations"]["annual"]}
    div_by_year = {a["year"]: a for a in index_snap["incorporations"]["annual_by_division"]}

    full_years = sorted(annual_by_year)  # complete calendar years already in the index snapshot
    current_year = date.today().year
    fetch_years = full_years + ([current_year] if current_year not in full_years else [])

    settled_through = index_snap["meta"]["incorporations_settled_through"]  # e.g. "2026-04"
    sy, sm = (int(x) for x in settled_through.split("-"))
    settled_last_day = f"{sy:04d}-{sm:02d}-{calendar.monthrange(sy, sm)[1]:02d}"

    print(f"=== Fetching construction dissolutions for {len(fetch_years)} years x {len(SEGMENTS)} segments ===", flush=True)
    dissolutions = fetch_dissolutions_by_year(fetch_years, current_year_to=settled_last_day)

    def incorporations_for(seg_key: str, year: int) -> int:
        if seg_key == "union":
            return annual_by_year[year]["union"]
        if seg_key == "primary_41202":
            return annual_by_year[year]["41202"]
        return div_by_year[year][seg_key]

    annual_rows: list[dict[str, Any]] = []
    for year in full_years:
        row: dict[str, Any] = {"year": year}
        for seg_key, _sics, _label in SEGMENTS:
            inc = incorporations_for(seg_key, year)
            diss = dissolutions[seg_key][str(year)]
            row[f"{seg_key}_inc"] = inc
            row[f"{seg_key}_diss"] = diss
            row[f"{seg_key}_net"] = inc - diss
        annual_rows.append(row)

    # Partial current year (dissolutions to date; incorporations only settled
    # through the index snapshot's settled month -- NOT comparable to full
    # years, shown separately and excluded from headline/decade maths).
    partial_2026: dict[str, Any] | None = None
    if current_year not in full_years:
        settled_through = index_snap["meta"]["incorporations_settled_through"]
        settled_months_this_year = [
            m for m in index_snap["incorporations"]["monthly"]
            if m["month"].startswith(str(current_year)) and m["month"] <= settled_through
        ]
        partial_2026 = {"year": current_year, "incorporations_settled_through": settled_through}
        for seg_key, _sics, _label in SEGMENTS:
            inc_ytd = sum(
                (m["union"] if seg_key == "union" else m.get("41202") if seg_key == "primary_41202" else None)
                or 0
                for m in settled_months_this_year
            ) if seg_key in ("union", "primary_41202") else None
            diss_ytd = dissolutions[seg_key][str(current_year)]
            partial_2026[f"{seg_key}_diss_ytd"] = diss_ytd
            if inc_ytd is not None:
                partial_2026[f"{seg_key}_inc_ytd"] = inc_ytd
                partial_2026[f"{seg_key}_net_ytd"] = inc_ytd - diss_ytd

    # Headline: first vs latest full year, union + primary segment
    y0, y1 = full_years[0], full_years[-1]
    r0 = next(r for r in annual_rows if r["year"] == y0)
    r1 = next(r for r in annual_rows if r["year"] == y1)

    def pct_change(a: int, b: int) -> float | None:
        return round((b - a) / a * 100, 1) if a else None

    # First year (if any) the primary segment's net formation went negative
    primary_negative_years = [r["year"] for r in annual_rows if r["primary_41202_net"] < 0]
    union_negative_years = [r["year"] for r in annual_rows if r["union_net"] < 0]

    headline = {
        "from_year": y0,
        "to_year": y1,
        "union_net_from": r0["union_net"],
        "union_net_to": r1["union_net"],
        "union_net_change_pct": pct_change(r0["union_net"], r1["union_net"]),
        "primary_net_from": r0["primary_41202_net"],
        "primary_net_to": r1["primary_41202_net"],
        "primary_first_negative_year": primary_negative_years[0] if primary_negative_years else None,
        "union_first_negative_year": union_negative_years[0] if union_negative_years else None,
    }

    snapshot = {
        "meta": {
            "generated_at": date.today().isoformat(),
            "coverage": f"{y0}/{y1}",
            "incorporations_source": "reused from uk-construction-index.json (Companies House Advanced Search, incorporated_from/incorporated_to)",
            "dissolutions_source": "Companies House Advanced Search API (company_status=dissolved, dissolved_from/dissolved_to)",
            "sources": [
                {
                    "name": "Companies House Advanced Search API",
                    "publisher": "Companies House",
                    "url": "https://developer.company-information.service.gov.uk/",
                    "licence": LICENCE,
                    "attribution": ATTRIBUTION,
                }
            ],
            "segment_labels": {seg_key: label for seg_key, _sics, label in SEGMENTS},
            "notes": (
                "Net formation = companies incorporated minus companies dissolved in the same "
                "calendar year, for the same 19-SIC-code construction universe as the UK "
                "Construction Index. Dissolutions are companies actually removed from the "
                "register (company_status=dissolved), not insolvency events -- a company can be "
                "dissolved through simple strike-off as well as after insolvency. Only complete "
                "calendar years are used in headline and decade comparisons; the current "
                "in-progress year is shown separately and excluded."
            ),
            "attribution": ATTRIBUTION,
        },
        "headline": headline,
        "annual": annual_rows,
        "partial_current_year": partial_2026,
    }

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(snapshot, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\n[snapshot] wrote {OUT_PATH}")

    # Self-check
    assert len(annual_rows) >= 5, "annual series too short"
    for r in annual_rows:
        for seg_key, _sics, _label in SEGMENTS:
            assert r[f"{seg_key}_inc"] >= 0 and r[f"{seg_key}_diss"] >= 0, f"negative count at {r['year']}"
            assert r[f"{seg_key}_net"] == r[f"{seg_key}_inc"] - r[f"{seg_key}_diss"], f"net mismatch at {r['year']}"
    print("[self-check] PASS")
    print(f"Headline: union net formation {headline['union_net_from']} ({y0}) -> {headline['union_net_to']} ({y1}), {headline['union_net_change_pct']}%")
    print(f"Primary (41202) net: {headline['primary_net_from']} ({y0}) -> {headline['primary_net_to']} ({y1}); first negative year: {headline['primary_first_negative_year']}")


if __name__ == "__main__":
    main()
