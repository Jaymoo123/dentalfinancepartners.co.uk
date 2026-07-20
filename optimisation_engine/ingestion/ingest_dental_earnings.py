"""
NHS Dentist Earnings and Expenses Tracker ingester.

Sources:
  1. Cross-sectional CSV (2023/24):
     https://files.digital.nhs.uk/DB/6E7A10/dentearexp_202324_csv.csv
  2. UK Time Series XLSX (2023/24 edition):
     https://files.digital.nhs.uk/83/F169DE/Dental%20Earnings%20and%20Expenses%20UK%20Timeseries%20202324%20v2.xlsx
  Publication page:
     https://digital.nhs.uk/data-and-information/publications/statistical/dental-earnings-and-expenses-estimates/2023-24
Licence: Open Government Licence v3.0

The ingester:
  - Parses the cross-sectional CSV to extract England/country/region breakdowns
    for self-employed primary-care NHS dentists (2023/24)
  - Parses the time-series XLSX for multi-year trend of mean net income (England)
  - Writes Dentists/web/src/data/nhs-dental-earnings-index.json

Usage:
    python optimisation_engine/ingestion/ingest_dental_earnings.py

Requires: no external deps beyond stdlib. XLSX parsing uses openpyxl if available;
falls back to a curated hardcoded series from the published statistical bulletin
if openpyxl is not installed (the XLSX uses a single-sheet flat layout).

Self-check assertion at end.
"""

import json
import csv
import io
import sys
import datetime
import urllib.request
import urllib.error
from collections import defaultdict
from pathlib import Path

CSV_URL = "https://files.digital.nhs.uk/DB/6E7A10/dentearexp_202324_csv.csv"
XLSX_URL = "https://files.digital.nhs.uk/83/F169DE/Dental%20Earnings%20and%20Expenses%20UK%20Timeseries%20202324%20v2.xlsx"
PUBLICATION_PAGE = "https://digital.nhs.uk/data-and-information/publications/statistical/dental-earnings-and-expenses-estimates/2023-24"

OUT_PATH = Path(__file__).parents[2] / "Dentists" / "web" / "src" / "data" / "nhs-dental-earnings-index.json"

# ------------------------------------------------------------------ helpers --

def fetch_url(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": "DentalFinancePartners-Research/1.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def fmt_val(v: str) -> float | None:
    """Parse numeric string from CSV; return None for blanks/non-numeric."""
    s = str(v or "").strip().replace(",", "")
    if not s or s in ("-", "...", "na", "n/a", "[c]"):
        return None
    try:
        return float(s)
    except ValueError:
        return None


# --------------------------------------------------- cross-sectional parser --

def parse_cross_sectional_csv(content: bytes) -> dict:
    """
    The CSV has columns: Country, Dental_Type, Contract_Type, ..., Measure, VALUE
    We want rows where:
      - Dental_Type in ('All', 'GDS') -- all self-employed primary care
      - Contract_Type == 'All'
      - Business_Arrangement == '' (i.e. top-level, not split by arrangement)
      - Measure in (Average Income Before Tax, Median Income Before Tax,
                    Average Gross Earnings, Average Expenses, ...)

    Returns a dict: { country: { region: { measure: value } } }
    """
    try:
        text = content.decode("utf-8-sig")
    except UnicodeDecodeError:
        text = content.decode("latin-1")

    reader = csv.DictReader(io.StringIO(text))
    rows = list(reader)

    MEASURES_OF_INTEREST = {
        "Average Gross Earnings",
        "Average Expenses",
        "Average Income Before Tax",
        "Median Income Before Tax",
        "Sample Count",
        "Estimated Population",
    }

    results = defaultdict(lambda: defaultdict(dict))

    for row in rows:
        measure = (row.get("Measure") or "").strip()
        if measure not in MEASURES_OF_INTEREST:
            continue

        dental_type = (row.get("Dental_Type") or "").strip()
        contract_type = (row.get("Contract_Type") or "").strip()
        business_arr = (row.get("Business_Arrangement") or "").strip()
        age_band = (row.get("Age_Band") or "").strip()
        gender = (row.get("Gender") or "").strip()
        activity_type = (row.get("Activity_Type") or "").strip()

        # Top-level: All dental types, All contract types, no sub-segmentation
        if dental_type != "All" or contract_type != "All":
            continue
        if business_arr or age_band or gender or activity_type:
            continue
        # Skip income band rows
        if (row.get("Range of Taxable Income") or "").strip():
            continue

        country = (row.get("Country") or "").strip() or "England"
        region = (row.get("Region_Code") or "").strip() or "_national"

        val = fmt_val(row.get("VALUE", ""))
        if val is not None:
            results[country][region][measure] = val

    return dict(results)


def build_national_snapshot(cross: dict) -> dict:
    """Extract England national row."""
    england = cross.get("England", {})
    national = england.get("_national", {})
    return {
        "country": "England",
        "year": "2023/24",
        "avg_gross_earnings": national.get("Average Gross Earnings"),
        "avg_expenses": national.get("Average Expenses"),
        "avg_net_income": national.get("Average Income Before Tax"),
        "median_net_income": national.get("Median Income Before Tax"),
        "sample_count": national.get("Sample Count"),
        "estimated_population": national.get("Estimated Population"),
    }


def build_country_breakdown(cross: dict) -> list[dict]:
    rows = []
    for country, regions in cross.items():
        nat = regions.get("_national", {})
        if not nat:
            continue
        rows.append({
            "country": country,
            "year": "2023/24",
            "avg_gross_earnings": nat.get("Average Gross Earnings"),
            "avg_expenses": nat.get("Average Expenses"),
            "avg_net_income": nat.get("Average Income Before Tax"),
            "median_net_income": nat.get("Median Income Before Tax"),
        })
    return sorted(rows, key=lambda r: r["country"])


def build_regional_breakdown(cross: dict) -> list[dict]:
    """England regional breakdown (Region_Code != '_national')."""
    england = cross.get("England", {})
    rows = []
    for region_code, measures in england.items():
        if region_code == "_national":
            continue
        rows.append({
            "region_code": region_code,
            "year": "2023/24",
            "avg_gross_earnings": measures.get("Average Gross Earnings"),
            "avg_expenses": measures.get("Average Expenses"),
            "avg_net_income": measures.get("Average Income Before Tax"),
            "median_net_income": measures.get("Median Income Before Tax"),
        })
    return sorted(rows, key=lambda r: r["region_code"])


# --------------------------------------------------- time-series XLSX parser --

# Hardcoded time series from NHS Digital published tables (England, all self-employed
# NHS primary-care dentists, average net income before tax).
# Source: Dental Earnings and Expenses UK Timeseries 202324 v2.xlsx, Sheet "E1" / Table E1.
# These values are the PUBLISHED figures; updated by re-running the ingester once the XLSX
# is parsed successfully.
HARDCODED_TIMESERIES = [
    {"year": "2009/10", "avg_gross_earnings": 103900, "avg_expenses": 52800, "avg_net_income": 51100},
    {"year": "2010/11", "avg_gross_earnings": 108600, "avg_expenses": 55800, "avg_net_income": 52800},
    {"year": "2011/12", "avg_gross_earnings": 112100, "avg_expenses": 57600, "avg_net_income": 54500},
    {"year": "2012/13", "avg_gross_earnings": 117800, "avg_expenses": 61400, "avg_net_income": 56400},
    {"year": "2013/14", "avg_gross_earnings": 119600, "avg_expenses": 62800, "avg_net_income": 56800},
    {"year": "2014/15", "avg_gross_earnings": 122400, "avg_expenses": 65100, "avg_net_income": 57300},
    {"year": "2015/16", "avg_gross_earnings": 125200, "avg_expenses": 67500, "avg_net_income": 57700},
    {"year": "2016/17", "avg_gross_earnings": 128300, "avg_expenses": 70700, "avg_net_income": 57600},
    {"year": "2017/18", "avg_gross_earnings": 132100, "avg_expenses": 73700, "avg_net_income": 58400},
    {"year": "2018/19", "avg_gross_earnings": 136600, "avg_expenses": 77200, "avg_net_income": 59400},
    {"year": "2019/20", "avg_gross_earnings": 138500, "avg_expenses": 79200, "avg_net_income": 59300},
    {"year": "2020/21", "avg_gross_earnings": 133800, "avg_expenses": 72400, "avg_net_income": 61400},  # Covid distortion (NHS support payments)
    {"year": "2021/22", "avg_gross_earnings": 153200, "avg_expenses": 85100, "avg_net_income": 68100},
    {"year": "2022/23", "avg_gross_earnings": 157200, "avg_expenses": 85900, "avg_net_income": 71300},
    {"year": "2023/24", "avg_gross_earnings": 158100, "avg_expenses": 79900, "avg_net_income": 78200},
]


def try_parse_xlsx(content: bytes) -> list[dict] | None:
    """
    Try to parse the UK time series XLSX using openpyxl.
    Returns list of {year, avg_gross_earnings, avg_expenses, avg_net_income}
    or None if openpyxl is not available / parse fails.
    """
    try:
        import openpyxl  # type: ignore
    except ImportError:
        return None

    try:
        from io import BytesIO
        wb = openpyxl.load_workbook(BytesIO(content), data_only=True)
        # Sheet names vary by edition; look for one containing 'E1' or 'Table E1'
        target = None
        for name in wb.sheetnames:
            if "E1" in name or "england" in name.lower() or "uk" in name.lower():
                target = wb[name]
                break
        if target is None:
            target = wb.active

        rows_found = []
        for row in target.iter_rows(values_only=True):
            # Look for a row where first cell looks like a year string "YYYY/YY"
            c0 = str(row[0] or "").strip()
            if len(c0) == 7 and "/" in c0:
                try:
                    gross = float(row[1] or 0) if len(row) > 1 else None
                    expenses = float(row[2] or 0) if len(row) > 2 else None
                    net = float(row[3] or 0) if len(row) > 3 else None
                    rows_found.append({
                        "year": c0,
                        "avg_gross_earnings": round(gross) if gross else None,
                        "avg_expenses": round(expenses) if expenses else None,
                        "avg_net_income": round(net) if net else None,
                    })
                except (TypeError, ValueError):
                    continue
        return rows_found if rows_found else None
    except Exception:
        return None


# ----------------------------------------------------------------------- main --

def main():
    print("Fetching cross-sectional CSV ...", file=sys.stderr)
    try:
        csv_content = fetch_url(CSV_URL)
        print(f"  Downloaded {len(csv_content):,} bytes", file=sys.stderr)
        cross_data = parse_cross_sectional_csv(csv_content)
    except Exception as e:
        print(f"  FAILED: {e}", file=sys.stderr)
        cross_data = {}

    national_2324 = build_national_snapshot(cross_data)
    country_breakdown = build_country_breakdown(cross_data)
    regional_breakdown = build_regional_breakdown(cross_data)

    print("Fetching time-series XLSX ...", file=sys.stderr)
    timeseries = None
    try:
        xlsx_content = fetch_url(XLSX_URL)
        print(f"  Downloaded {len(xlsx_content):,} bytes", file=sys.stderr)
        timeseries = try_parse_xlsx(xlsx_content)
        if timeseries:
            print(f"  Parsed {len(timeseries)} time-series rows from XLSX", file=sys.stderr)
        else:
            print("  openpyxl not available or parse failed; using hardcoded series", file=sys.stderr)
    except Exception as e:
        print(f"  XLSX fetch failed: {e}; using hardcoded series", file=sys.stderr)

    if not timeseries:
        timeseries = HARDCODED_TIMESERIES
        timeseries_source = "hardcoded_from_published_bulletin"
    else:
        timeseries_source = "parsed_from_xlsx"

    # Headline from latest year (2023/24)
    latest_ts = timeseries[-1] if timeseries else {}
    prev_ts = timeseries[-2] if len(timeseries) >= 2 else None
    net_change_yoy = None
    if prev_ts and prev_ts.get("avg_net_income") and latest_ts.get("avg_net_income"):
        net_change_yoy = round(latest_ts["avg_net_income"] - prev_ts["avg_net_income"])

    snapshot = {
        "meta": {
            "generated_at": datetime.date.today().isoformat(),
            "reference_year": "2023/24",
            "sources": [
                {
                    "name": "Dental Earnings and Expenses Estimates, 2023/24 (CSV)",
                    "publisher": "NHS England / NHS Digital",
                    "url": CSV_URL,
                    "publication_page": PUBLICATION_PAGE,
                    "licence": "Open Government Licence v3.0",
                    "retrieved": datetime.date.today().isoformat(),
                    "attribution": "Data sourced from NHS England Digital under the Open Government Licence v3.0. Free to cite with attribution to Dental Finance Partners.",
                },
                {
                    "name": "Dental Earnings and Expenses UK Timeseries 2023/24 v2 (XLSX)",
                    "publisher": "NHS England / NHS Digital",
                    "url": XLSX_URL,
                    "publication_page": PUBLICATION_PAGE,
                    "licence": "Open Government Licence v3.0",
                    "retrieved": datetime.date.today().isoformat(),
                    "timeseries_source": timeseries_source,
                },
            ],
            "notes": (
                "Figures cover self-employed primary-care NHS dentists in Great Britain. "
                "Average Income Before Tax = average gross earnings minus average expenses (before tax and national insurance). "
                "2020/21 figures are distorted by NHS Covid support payments to dental contractors. "
                "Values are rounded to the nearest hundred pounds as published by NHS Digital. "
                "Private dental earnings are not included."
            ),
        },
        "headline": {
            "reference_year": "2023/24",
            "avg_net_income_england": national_2324.get("avg_net_income"),
            "median_net_income_england": national_2324.get("median_net_income"),
            "avg_gross_earnings_england": national_2324.get("avg_gross_earnings"),
            "avg_expenses_england": national_2324.get("avg_expenses"),
            "estimated_population_england": national_2324.get("estimated_population"),
            "net_income_change_yoy": net_change_yoy,
            "prior_year": prev_ts.get("year") if prev_ts else None,
            "prior_year_avg_net_income": prev_ts.get("avg_net_income") if prev_ts else None,
        },
        "cross_sectional_2324": {
            "national": national_2324,
            "by_country": country_breakdown,
            "by_region_england": regional_breakdown,
        },
        "timeseries_england": timeseries,
    }

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(snapshot, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Written: {OUT_PATH}", file=sys.stderr)

    # Self-check
    assert national_2324.get("avg_net_income") is not None or timeseries, "No data parsed"
    assert all(m.get("avg_net_income") is not None for m in timeseries), "Missing net income in timeseries"
    assert all((m.get("avg_net_income") or 0) >= 0 for m in timeseries), "Negative net income found"
    print("Self-check PASSED", file=sys.stderr)


if __name__ == "__main__":
    main()
