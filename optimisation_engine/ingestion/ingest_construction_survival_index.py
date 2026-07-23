"""UK Construction Survival Index -- data ingestion.

Fetches ONS Business Demography reference tables (Table 4.2: survival of
newly-born enterprises by broad industry group) and writes
construction-cis/web/src/data/construction-survival-index.json.

Source:
  Business demography, UK, Office for National Statistics (gov.uk)
  Licence: Open Government Licence v3.0
  Table 4.2 gives, for each enterprise birth-year cohort (2019-2023), the
  count and percentage of Construction-sector (broad industry group) births
  still active 1 to 5 years later. The "Total" row (all industries) is kept
  alongside Construction as the comparison baseline.

Usage:
  python -m optimisation_engine.ingestion.ingest_construction_survival_index

Self-contained: no Supabase, no git commit.
"""
from __future__ import annotations

import json
import re
from datetime import date
from pathlib import Path
from typing import Any

import openpyxl
import requests

DATASET_PAGE = (
    "https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/"
    "datasets/businessdemographyreferencetable/current"
)
RELEASE_DATE = "2025-11-20"  # "Date published" cell on the Contents sheet

LICENCE = "Open Government Licence v3.0"
PUBLISHER = "Office for National Statistics"

OUT_PATH = (
    Path(__file__).resolve().parents[2]
    / "construction-cis" / "web" / "src" / "data"
    / "construction-survival-index.json"
)

SURVIVAL_COLS = [
    # (key, count_col_index, pct_col_index) -- row-tuple indices; row[1] is births
    ("y1", 2, 3),
    ("y2", 4, 5),
    ("y3", 6, 7),
    ("y4", 8, 9),
    ("y5", 10, 11),
]


def discover_xlsx_url() -> str:
    """Find the current-release XLSX link on the ONS dataset landing page."""
    r = requests.get(DATASET_PAGE, timeout=30, headers={"User-Agent": "Mozilla/5.0"})
    r.raise_for_status()
    # Current-release links live under .../current/<file>.xlsx (not .../current/previous/...)
    matches = re.findall(r'href="(/file\?uri=[^"]+businessdemographyexceltables[^"]+\.xlsx)"', r.text)
    current = [m for m in matches if "/previous/" not in m]
    if not current:
        raise RuntimeError("Could not find current-release XLSX link on ONS dataset page")
    return "https://www.ons.gov.uk" + current[0]


def fetch_workbook(url: str) -> openpyxl.Workbook:
    r = requests.get(url, timeout=60, headers={"User-Agent": "Mozilla/5.0"})
    r.raise_for_status()
    import io
    return openpyxl.load_workbook(io.BytesIO(r.content), data_only=True, read_only=True)


def parse_table_4_2(wb: openpyxl.Workbook) -> dict[int, dict[str, dict[str, Any]]]:
    """{birth_year: {"Construction": {...}, "Total": {...}}}"""
    ws = wb["Table 4.2"]
    cohorts: dict[int, dict[str, dict[str, Any]]] = {}
    cur_year: int | None = None

    for row in ws.iter_rows(values_only=True):
        if row[0] is None:
            continue
        if isinstance(row[0], int) and 2000 < row[0] < 2100:
            cur_year = row[0]
            cohorts[cur_year] = {}
            continue
        label = str(row[0]).strip()
        if cur_year is None or label not in ("Construction", "Total"):
            continue
        births = row[1]
        entry: dict[str, Any] = {"births": int(births) if births is not None else None}
        for key, count_off, pct_off in SURVIVAL_COLS:
            count_v = row[count_off]
            pct_v = row[pct_off]
            entry[f"{key}_count"] = int(count_v) if isinstance(count_v, (int, float)) else None
            entry[f"{key}_pct"] = round(float(pct_v), 1) if isinstance(pct_v, (int, float)) else None
        cohorts[cur_year][label] = entry

    return cohorts


def main() -> None:
    print("Discovering current ONS Business Demography XLSX URL...")
    xlsx_url = discover_xlsx_url()
    print(f"  {xlsx_url}")

    print("Downloading and parsing Table 4.2 (survival by broad industry group)...")
    wb = fetch_workbook(xlsx_url)
    cohorts = parse_table_4_2(wb)
    print(f"  Cohort years found: {sorted(cohorts)}")

    # Build cohort rows, most recent birth year first is NOT required; keep ascending
    cohort_rows = []
    for year in sorted(cohorts):
        c = cohorts[year].get("Construction")
        t = cohorts[year].get("Total")
        if not c or not t:
            continue
        cohort_rows.append({"birth_year": year, "construction": c, "all_industries": t})

    # Headline: the most recent cohort with a full 5-year survival figure
    five_yr_cohorts = [r for r in cohort_rows if r["construction"]["y5_pct"] is not None]
    latest_5yr = five_yr_cohorts[-1] if five_yr_cohorts else None

    # Most recent cohort with at least a 1-year figure (freshest data point)
    one_yr_cohorts = [r for r in cohort_rows if r["construction"]["y1_pct"] is not None]
    latest_1yr = one_yr_cohorts[-1] if one_yr_cohorts else None

    headline = {
        "latest_5yr_cohort_year": latest_5yr["birth_year"] if latest_5yr else None,
        "latest_5yr_construction_pct": latest_5yr["construction"]["y5_pct"] if latest_5yr else None,
        "latest_5yr_all_industries_pct": latest_5yr["all_industries"]["y5_pct"] if latest_5yr else None,
        "latest_1yr_cohort_year": latest_1yr["birth_year"] if latest_1yr else None,
        "latest_1yr_construction_pct": latest_1yr["construction"]["y1_pct"] if latest_1yr else None,
        "latest_1yr_all_industries_pct": latest_1yr["all_industries"]["y1_pct"] if latest_1yr else None,
    }

    snapshot = {
        "meta": {
            "generated_at": date.today().isoformat(),
            "source_url": xlsx_url,
            "release_page": DATASET_PAGE,
            "release_date": RELEASE_DATE,
            "publisher": PUBLISHER,
            "licence": LICENCE,
            "sources": [
                {
                    "name": "Business Demography, UK -- Table 4.2 (Survival of newly born enterprises, broad industry group)",
                    "publisher": PUBLISHER,
                    "url": xlsx_url,
                    "release_page": DATASET_PAGE,
                    "licence": LICENCE,
                    "retrieved": date.today().isoformat(),
                    "release_date": RELEASE_DATE,
                    "attribution": (
                        "Data sourced from the Office for National Statistics (ONS) under the "
                        "Open Government Licence v3.0. Free to cite with attribution to Trade "
                        "Tax Specialists."
                    ),
                }
            ],
            "notes": (
                "Survival counts and percentages are for the 'Construction' broad industry group "
                "(ONS SIC 2007 broad grouping, aligned to SIC Section F) as published in ONS Business "
                "Demography Table 4.2. Births are new enterprises (not necessarily companies -- ONS "
                "enterprise definition includes sole traders and partnerships registered for VAT "
                "or PAYE), counted in the year they were born, then tracked for up to 5 years. "
                "Control-rounded to base 5 by ONS; later survival years for the most recent cohorts "
                "are not yet available (fewer years have elapsed) and are omitted rather than shown "
                "as zero."
            ),
            "attribution": (
                "UK Construction Survival Index compiled from ONS Business Demography data (Open "
                "Government Licence v3.0). Free to cite with attribution to Trade Tax Specialists."
            ),
        },
        "headline": headline,
        "cohorts": cohort_rows,
    }

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(snapshot, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\n[snapshot] wrote {OUT_PATH}")

    # Self-check
    assert len(cohort_rows) >= 3, "too few cohort years parsed"
    for r in cohort_rows:
        assert r["construction"]["births"] and r["construction"]["births"] > 0, f"missing births at {r['birth_year']}"
        for key, *_ in SURVIVAL_COLS:
            pct = r["construction"][f"{key}_pct"]
            if pct is not None:
                assert 0 <= pct <= 100, f"pct out of range at {r['birth_year']} {key}: {pct}"
    print("[self-check] PASS")
    if latest_5yr:
        print(f"Latest 5-year cohort: {latest_5yr['birth_year']} -- Construction {headline['latest_5yr_construction_pct']}% vs all-industries {headline['latest_5yr_all_industries_pct']}%")
    if latest_1yr:
        print(f"Latest 1-year cohort: {latest_1yr['birth_year']} -- Construction {headline['latest_1yr_construction_pct']}% vs all-industries {headline['latest_1yr_all_industries_pct']}%")


if __name__ == "__main__":
    main()
