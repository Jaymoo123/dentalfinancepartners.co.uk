"""UK Construction Insolvency Index -- data ingestion.

Fetches record-level data from the Insolvency Service (Company Insolvency
Statistics) and writes construction-cis/web/src/data/construction-insolvency-index.json.

Source:
  Company Insolvency Statistics, The Insolvency Service (gov.uk)
  Licence: Open Government Licence v3.0
  Record-level data covers England, Wales and Scotland from January 2016.
  SIC Section F (Construction) = 1-digit SIC code 'F'.

Usage:
  python -m optimisation_engine.ingestion.ingest_construction_insolvency

The script is intentionally self-contained: no Supabase, no git commit.
"""
from __future__ import annotations

import csv
import io
import json
import zipfile
from collections import defaultdict
from datetime import date
from pathlib import Path

import requests

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

# Latest May 2026 release (update URL when a new release is published)
RELEASE_PAGE = "https://www.gov.uk/government/statistics/company-insolvencies-may-2026"
RECORD_LEVEL_ZIP_URL = (
    "https://assets.publishing.service.gov.uk/media/"
    "6a315c2245124bc4cb61e1d9/"
    "Record-level_data_for_England_Wales_and_Scotland_-_"
    "Company_Insolvency_Statistics_May_2026.zip"
)
XLSX_URL = (
    "https://assets.publishing.service.gov.uk/media/"
    "6a33c90c0bea238415c9a20e/"
    "Data_Tables_in_Excel__xlsx__Format_-_"
    "Company_Insolvency_Statistics_May_2026.xlsx"
)
LICENCE = "Open Government Licence v3.0"
PUBLISHER = "The Insolvency Service"
RELEASE_DATE = "2026-06-19"
COVERAGE_PERIOD = "2016-01/2026-05"

# Map raw case_type strings to short keys used in the JSON
PROCEDURE_MAP = {
    "Creditors Voluntary Liquidation": "cvl",
    "Compulsory Liquidation": "compulsory",
    "In Administration": "administration",
    "Administration to CVL": "administration_to_cvl",
    "Corporate Voluntary Arrangement": "cva",
    "Administrative Receiver": "receivership",
    "Moratorium": "moratorium",
}

OUT_PATH = (
    Path(__file__).resolve().parents[2]
    / "construction-cis" / "web" / "src" / "data"
    / "construction-insolvency-index.json"
)


def fetch_zip(url: str) -> zipfile.ZipFile:
    r = requests.get(url, timeout=120)
    r.raise_for_status()
    return zipfile.ZipFile(io.BytesIO(r.content))


def parse_record_level(zf: zipfile.ZipFile) -> tuple[
    dict[str, dict[str, int]],  # by_month[month][procedure] = count
    dict[str, dict[str, int]],  # by_year[year][procedure] = count
]:
    by_month: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))
    by_year: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))

    with zf.open("record-level-data.csv") as f:
        reader = csv.DictReader(io.TextIOWrapper(f, encoding="latin-1"))
        for row in reader:
            if row["sic07_1_digit"] != "F":
                continue
            month = row["month_registered"]  # e.g. "2025-03"
            year = month[:4]
            ct = row["case_type"]
            proc = PROCEDURE_MAP.get(ct, "other")
            by_month[month][proc] += 1
            by_year[year][proc] += 1

    return dict(by_month), dict(by_year)


def build_series(
    by_month: dict[str, dict[str, int]],
    by_year: dict[str, dict[str, int]],
) -> tuple[list[dict], list[dict]]:
    all_procs = list(PROCEDURE_MAP.values())

    monthly = []
    for month in sorted(by_month):
        row: dict = {"month": month, "total": 0}
        t = 0
        for p in all_procs:
            v = by_month[month].get(p, 0)
            row[p] = v
            t += v
        row["total"] = t
        monthly.append(row)

    annual = []
    for year in sorted(by_year):
        row = {"year": int(year), "total": 0}
        t = 0
        for p in all_procs:
            v = by_year[year].get(p, 0)
            row[p] = v
            t += v
        row["total"] = t
        annual.append(row)

    return monthly, annual


def build_headline(
    monthly: list[dict],
    annual: list[dict],
) -> dict:
    # Latest settled month = most recent month in the series
    last_month = monthly[-1]
    prev_year_month = last_month["month"][:5] + last_month["month"][5:]  # same key

    # Find same month prior year for YoY
    last_ym = last_month["month"]
    ly = str(int(last_ym[:4]) - 1) + last_ym[4:]
    prev_month = next((m for m in monthly if m["month"] == ly), None)
    yoy = None
    if prev_month and prev_month["total"] > 0:
        yoy = round((last_month["total"] - prev_month["total"]) / prev_month["total"] * 100, 1)

    # TTM = trailing 12 months (last 12 settled months)
    ttm_rows = monthly[-12:]
    ttm_total = sum(r["total"] for r in ttm_rows)

    # Peak month by total
    peak = max(monthly, key=lambda r: r["total"])

    # Decade: first full year vs latest full year
    full_annual = [r for r in annual if r["year"] < 2026]
    decade_from = full_annual[0] if full_annual else annual[0]
    decade_to = full_annual[-1] if full_annual else annual[-1]
    decade_change = None
    if decade_from["total"] > 0:
        decade_change = round(
            (decade_to["total"] - decade_from["total"]) / decade_from["total"] * 100, 1
        )

    return {
        "last_settled_month": last_month["month"],
        "last_month_total": last_month["total"],
        "last_month_cvl": last_month.get("cvl", 0),
        "last_month_compulsory": last_month.get("compulsory", 0),
        "last_month_administration": last_month.get("administration", 0),
        "yoy_pct": yoy,
        "ttm_total": ttm_total,
        "peak_month": peak["month"],
        "peak_total": peak["total"],
        "decade": {
            "from_year": decade_from["year"],
            "to_year": decade_to["year"],
            "from_total": decade_from["total"],
            "to_total": decade_to["total"],
            "change_pct": decade_change,
        },
    }


def main() -> None:
    print("Fetching record-level ZIP from Insolvency Service...")
    zf = fetch_zip(RECORD_LEVEL_ZIP_URL)

    print("Parsing Construction (SIC Section F) records...")
    by_month, by_year = parse_record_level(zf)

    print(f"  Months found: {len(by_month)}, Years: {len(by_year)}")

    monthly, annual = build_series(by_month, by_year)
    headline = build_headline(monthly, annual)

    snapshot = {
        "meta": {
            "generated_at": date.today().isoformat(),
            "data_through": monthly[-1]["month"],
            "coverage": COVERAGE_PERIOD,
            "sic_section": "F",
            "sic_section_label": "Construction",
            "procedure_labels": {
                "cvl": "Creditors Voluntary Liquidation (CVL)",
                "compulsory": "Compulsory Liquidation",
                "administration": "Administration",
                "administration_to_cvl": "Administration converting to CVL",
                "cva": "Company Voluntary Arrangement (CVA)",
                "receivership": "Administrative Receivership",
                "moratorium": "Moratorium",
            },
            "sources": [
                {
                    "name": "Company Insolvency Statistics -- Record-Level Data",
                    "publisher": PUBLISHER,
                    "url": RECORD_LEVEL_ZIP_URL,
                    "release_page": RELEASE_PAGE,
                    "licence": LICENCE,
                    "retrieved": date.today().isoformat(),
                    "release_date": RELEASE_DATE,
                    "attribution": (
                        "Data sourced from The Insolvency Service under the "
                        "Open Government Licence v3.0. Free to cite with "
                        "attribution to Trade Tax Specialists."
                    ),
                }
            ],
            "notes": (
                "Counts cover England, Wales and Scotland. SIC Section F "
                "encompasses Division 41 (construction of buildings), "
                "Division 42 (civil engineering), and Division 43 "
                "(specialised construction activities). Totals are gross "
                "registered insolvencies -- each procedure entry is counted "
                "once on the date the insolvency was registered, not the "
                "underlying trading activity. 2026 data covers January to "
                "May only (partial year). All years are raw counts, not "
                "rates per active company."
            ),
            "attribution": (
                "UK Construction Insolvency Index compiled from Insolvency "
                "Service public records (Open Government Licence v3.0). "
                "Free to cite with attribution to Trade Tax Specialists."
            ),
        },
        "headline": headline,
        "insolvencies": {
            "monthly": monthly,
            "annual": annual,
        },
    }

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(snapshot, indent=2), encoding="utf-8")
    print(f"Written: {OUT_PATH}")

    # Self-check
    assert len(monthly) > 0, "Monthly series is empty"
    assert all(r["total"] >= 0 for r in monthly), "Negative totals in monthly series"
    assert all(r["total"] >= 0 for r in annual), "Negative totals in annual series"
    for r in monthly:
        proc_sum = sum(r.get(p, 0) for p in PROCEDURE_MAP.values())
        assert r["total"] == proc_sum, (
            f"Total mismatch at {r['month']}: {r['total']} != {proc_sum}"
        )
    print("Self-check passed.")
    print(f"Latest month: {headline['last_settled_month']} -- total {headline['last_month_total']}")
    print(f"TTM total: {headline['ttm_total']}")
    print(f"Peak: {headline['peak_month']} ({headline['peak_total']})")


if __name__ == "__main__":
    main()
