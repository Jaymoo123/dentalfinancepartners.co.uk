"""UK Hospitality Insolvency Index + ONS survival curve -- data ingestion.

Flagship research asset for the hospitality site. Combines two real, open,
machine-readable government sources:

  A) Insolvency Service record-level data (Company Insolvency Statistics),
     filtered to SIC Section I (Accommodation and food service activities).
     Format: ZIP containing record-level-data.csv. Licence: OGL v3.0.
     Landing: https://www.gov.uk/government/collections/insolvency-service-official-statistics

  B) ONS Business Demography, Table 4.2 (Survival of newly born enterprises
     by broad industry group), row "Accommodation and food services", for
     each birth-cohort year 2019-2023, tracked 1 to 5 years post-birth.
     Format: XLSX. Licence: OGL v3.0.
     Landing: https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/datasets/businessdemographyreferencetable

Writes hospitality/web/src/data/hospitality-insolvency-index.json.

Usage:
  python -m optimisation_engine.ingestion.ingest_hospitality_insolvency

Self-contained: no Supabase, no git commit. Requires: requests, openpyxl.
"""
from __future__ import annotations

import csv
import io
import json
import zipfile
from collections import defaultdict
from datetime import date
from pathlib import Path

import openpyxl
import requests

# ---------------------------------------------------------------------------
# Config -- update these URLs when a newer release is published
# ---------------------------------------------------------------------------

INSOLVENCY_RELEASE_PAGE = "https://www.gov.uk/government/statistics/company-insolvencies-june-2026"
INSOLVENCY_ZIP_URL = (
    "https://assets.publishing.service.gov.uk/media/"
    "6a57978e31fb6daf3141374c/"
    "Record-level_data_for_England_Wales_and_Scotland_-_"
    "Company_Insolvency_Statistics_June_2026.zip"
)
INSOLVENCY_RELEASE_DATE = "2026-07-17"
INSOLVENCY_COVERAGE = "2016-01/2026-06"

SURVIVAL_PAGE = (
    "https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/"
    "datasets/businessdemographyreferencetable"
)
SURVIVAL_XLSX_URL = (
    "https://www.ons.gov.uk/file?uri=/businessindustryandtrade/business/activitysizeandlocation/"
    "datasets/businessdemographyreferencetable/current/businessdemographyexceltables2024.xlsx"
)
SURVIVAL_RELEASE_DATE = "2025-11-20"
SURVIVAL_SHEET = "Table 4.2"
SURVIVAL_ROW_LABEL = "Accommodation and food services"
SURVIVAL_COMPARATOR_LABEL = "Total"

LICENCE = "Open Government Licence v3.0"
USER_AGENT = "HospitalityTax-Research/1.0"

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
    / "hospitality" / "web" / "src" / "data"
    / "hospitality-insolvency-index.json"
)


# ---------------------------------------------------------------------------
# Source A: Insolvency Service record-level data, SIC Section I
# ---------------------------------------------------------------------------

def fetch_zip(url: str) -> zipfile.ZipFile:
    r = requests.get(url, headers={"User-Agent": USER_AGENT}, timeout=120)
    r.raise_for_status()
    return zipfile.ZipFile(io.BytesIO(r.content))


def parse_record_level(zf: zipfile.ZipFile) -> tuple[dict, dict]:
    by_month: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))
    by_year: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))

    with zf.open("record-level-data.csv") as f:
        reader = csv.DictReader(io.TextIOWrapper(f, encoding="latin-1"))
        for row in reader:
            if row["sic07_1_digit"] != "I":
                continue
            month = row["month_registered"]
            year = month[:4]
            proc = PROCEDURE_MAP.get(row["case_type"], "other")
            by_month[month][proc] += 1
            by_year[year][proc] += 1

    return dict(by_month), dict(by_year)


def build_series(by_month: dict, by_year: dict) -> tuple[list[dict], list[dict]]:
    all_procs = list(PROCEDURE_MAP.values())

    monthly = []
    for month in sorted(by_month):
        row: dict = {"month": month}
        t = 0
        for p in all_procs:
            v = by_month[month].get(p, 0)
            row[p] = v
            t += v
        row["total"] = t
        monthly.append(row)

    annual = []
    for year in sorted(by_year):
        row: dict = {"year": int(year)}
        t = 0
        for p in all_procs:
            v = by_year[year].get(p, 0)
            row[p] = v
            t += v
        row["total"] = t
        annual.append(row)

    return monthly, annual


def build_headline(monthly: list[dict], annual: list[dict]) -> dict:
    last_month = monthly[-1]
    last_ym = last_month["month"]
    ly = str(int(last_ym[:4]) - 1) + last_ym[4:]
    prev_month = next((m for m in monthly if m["month"] == ly), None)
    yoy = None
    if prev_month and prev_month["total"] > 0:
        yoy = round((last_month["total"] - prev_month["total"]) / prev_month["total"] * 100, 1)

    ttm_rows = monthly[-12:]
    ttm_total = sum(r["total"] for r in ttm_rows)

    peak = max(monthly, key=lambda r: r["total"])

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


# ---------------------------------------------------------------------------
# Source B: ONS Business Demography Table 4.2, survival by cohort
# ---------------------------------------------------------------------------

def fetch_survival_workbook(url: str) -> openpyxl.Workbook:
    r = requests.get(url, headers={"User-Agent": USER_AGENT}, timeout=120)
    r.raise_for_status()
    return openpyxl.load_workbook(io.BytesIO(r.content), read_only=True, data_only=True)


def parse_survival(wb: openpyxl.Workbook) -> list[dict]:
    """Extract 'Accommodation and food services' + 'Total' rows for each
    birth-cohort year block in Table 4.2. Suppressed cells (later survival
    years not yet observable for recent cohorts) are ':' and mapped to None.
    """
    ws = wb[SURVIVAL_SHEET]
    cohorts: list[dict] = []
    cohort_year: int | None = None
    row_by_year: dict[int, dict] = {}

    def clean(v):
        if v is None or v == ":":
            return None
        return v

    for row in ws.iter_rows(min_row=1, max_row=200, values_only=True):
        if isinstance(row[0], int) and 2000 <= row[0] <= 2030:
            cohort_year = row[0]
            continue
        if cohort_year is None:
            continue
        label = row[0]
        if label == SURVIVAL_ROW_LABEL:
            row_by_year.setdefault(cohort_year, {})["hospitality"] = row
        elif label == SURVIVAL_COMPARATOR_LABEL:
            row_by_year.setdefault(cohort_year, {})["all_industry"] = row

    for year in sorted(row_by_year):
        h = row_by_year[year].get("hospitality")
        a = row_by_year[year].get("all_industry")
        if not h:
            continue

        def pct(idx):
            return clean(h[idx])

        def count(idx):
            return clean(h[idx])

        cohorts.append({
            "cohort_year": year,
            "births": h[1],
            "survival_1yr_count": count(2),
            "survival_1yr_pct": pct(3),
            "survival_2yr_count": count(4),
            "survival_2yr_pct": pct(5),
            "survival_3yr_count": count(6),
            "survival_3yr_pct": pct(7),
            "survival_4yr_count": count(8),
            "survival_4yr_pct": pct(9),
            "survival_5yr_count": count(10),
            "survival_5yr_pct": pct(11),
            "all_industry_1yr_pct": clean(a[3]) if a else None,
            "all_industry_2yr_pct": clean(a[5]) if a else None,
            "all_industry_3yr_pct": clean(a[7]) if a else None,
            "all_industry_4yr_pct": clean(a[9]) if a else None,
            "all_industry_5yr_pct": clean(a[11]) if a else None,
        })

    return cohorts


# ---------------------------------------------------------------------------

def main() -> None:
    print("Fetching Insolvency Service record-level ZIP...")
    zf = fetch_zip(INSOLVENCY_ZIP_URL)
    print("Parsing SIC Section I (Accommodation and food service activities) records...")
    by_month, by_year = parse_record_level(zf)
    monthly, annual = build_series(by_month, by_year)
    headline = build_headline(monthly, annual)
    print(f"  Months: {len(monthly)}, latest: {headline['last_settled_month']}, TTM: {headline['ttm_total']}")

    print("Fetching ONS Business Demography workbook...")
    wb = fetch_survival_workbook(SURVIVAL_XLSX_URL)
    print("Parsing Table 4.2 survival cohorts for Accommodation and food services...")
    cohorts = parse_survival(wb)
    print(f"  Cohorts parsed: {[c['cohort_year'] for c in cohorts]}")

    latest_full_cohort = next((c for c in reversed(cohorts) if c["survival_5yr_pct"] is not None), None)

    snapshot = {
        "meta": {
            "generated_at": date.today().isoformat(),
            "data_through": monthly[-1]["month"],
            "coverage": INSOLVENCY_COVERAGE,
            "sic_section": "I",
            "sic_section_label": "Accommodation and food service activities",
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
                    "publisher": "The Insolvency Service",
                    "url": INSOLVENCY_ZIP_URL,
                    "release_page": INSOLVENCY_RELEASE_PAGE,
                    "licence": LICENCE,
                    "retrieved": date.today().isoformat(),
                    "release_date": INSOLVENCY_RELEASE_DATE,
                    "attribution": (
                        "Data sourced from The Insolvency Service under the "
                        "Open Government Licence v3.0. Free to cite with "
                        "attribution to Hospitality Tax."
                    ),
                },
                {
                    "name": "Business Demography, UK -- Table 4.2 (Survival by broad industry group)",
                    "publisher": "Office for National Statistics",
                    "url": SURVIVAL_XLSX_URL,
                    "release_page": SURVIVAL_PAGE,
                    "licence": LICENCE,
                    "retrieved": date.today().isoformat(),
                    "release_date": SURVIVAL_RELEASE_DATE,
                    "attribution": (
                        "Data sourced from the Office for National Statistics "
                        "under the Open Government Licence v3.0. Free to cite "
                        "with attribution to Hospitality Tax."
                    ),
                },
            ],
            "notes": (
                "Insolvency counts cover England, Wales and Scotland. SIC Section I "
                "(Accommodation and food service activities) is a clean, whole-section "
                "match for the hospitality sector: Division 55 (accommodation) and "
                "Division 56 (food and beverage service). Totals are gross registered "
                "insolvencies -- each procedure entry is counted once on the date "
                "registered, not the underlying trading activity. 2026 covers "
                "January to June only (partial year). Survival cohorts come from ONS "
                "Business Demography Table 4.2, which tracks each year's newly born "
                "enterprises (by ONS 'broad industry group', of which Accommodation "
                "and food services maps directly onto SIC Section I) for up to 5 years. "
                "Later survival years are not yet observable for more recent cohorts "
                "and are shown as null (ONS suppresses them with ':')."
            ),
            "attribution": (
                "UK Hospitality Insolvency Index compiled from Insolvency Service and "
                "ONS public records (Open Government Licence v3.0). Free to cite with "
                "attribution to Hospitality Tax."
            ),
        },
        "headline": headline,
        "insolvencies": {
            "monthly": monthly,
            "annual": annual,
        },
        "survival": {
            "cohorts": cohorts,
            "latest_full_cohort_year": latest_full_cohort["cohort_year"] if latest_full_cohort else None,
        },
    }

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(snapshot, indent=2), encoding="utf-8")
    print(f"Written: {OUT_PATH}")

    # Self-check
    assert len(monthly) > 0, "Monthly series is empty"
    assert all(r["total"] >= 0 for r in monthly), "Negative totals in monthly series"
    for r in monthly:
        proc_sum = sum(r.get(p, 0) for p in PROCEDURE_MAP.values())
        assert r["total"] == proc_sum, f"Total mismatch at {r['month']}"
    assert len(cohorts) >= 3, "Expected at least 3 survival cohorts"
    assert cohorts[0]["survival_5yr_pct"] is not None, "Earliest cohort should have full 5yr data"
    print("Self-check passed.")
    print(f"Latest month: {headline['last_settled_month']} -- total {headline['last_month_total']}")
    print(f"TTM total: {headline['ttm_total']}")
    print(f"Peak: {headline['peak_month']} ({headline['peak_total']})")
    if latest_full_cohort:
        print(
            f"5yr survival, {latest_full_cohort['cohort_year']} cohort: "
            f"{latest_full_cohort['survival_5yr_pct']}% (all-industry: "
            f"{latest_full_cohort['all_industry_5yr_pct']}%)"
        )


if __name__ == "__main__":
    main()
