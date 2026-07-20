"""
NHS Dental Activity Recovery Index ingester.

Source: NHSBSA "English Contractor Monthly General Dental Activity"
Portal:  https://opendata.nhsbsa.net/dataset/english-contractor-monthly-general-dental-activity
Licence: Open Government Licence v3.0

For each available monthly CSV (one per contract month) the ingester:
  - Fetches the CKAN resource list for the dataset
  - Downloads each CSV and aggregates UDA_DELIVERED + Band counts nationally
    and by ICB commissioner (regional proxy)
  - Computes a RECOVERY INDEX vs the 2019/20 full-year average (= 100)
  - Writes Dentists/web/src/data/nhs-dental-activity-index.json

Usage:
    python optimisation_engine/ingestion/ingest_dental_activity.py

Self-check assertion runs at end.
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

DATASET_ID = "9621bedf-c03c-4af6-9e8f-5f4afb5b780c"
CKAN_API = f"https://opendata.nhsbsa.net/api/3/action/package_show?id={DATASET_ID}"

# Columns in each monthly CSV
COL_YEAR_MONTH      = "YEAR_MONTH"
COL_COMMISSIONER    = "COMMISSIONER_NAME"
COL_UDA_DELIVERED   = "UDA_DELIVERED"
COL_BAND1           = "BAND_1_DELIVERED"
COL_BAND2A          = "BAND_2A_DELIVERED"
COL_BAND2B          = "BAND_2B_DELIVERED"
COL_BAND2C          = "BAND_2C_DELIVERED"
COL_BAND3           = "BAND_3_DELIVERED"
COL_URGENT          = "BAND_URGENT_DELIVERED"

# Pre-Covid baseline period: April 2019 -- March 2020 (NHS financial year 2019/20)
BASELINE_START = 201904
BASELINE_END   = 202003

OUT_PATH = Path(__file__).parents[2] / "Dentists" / "web" / "src" / "data" / "nhs-dental-activity-index.json"


def fetch_url(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": "DentalFinancePartners-Research/1.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()


def get_csv_resources() -> list[dict]:
    """Return all CSV resource records from the CKAN package."""
    data = json.loads(fetch_url(CKAN_API))
    resources = data["result"]["resources"]
    csvs = [r for r in resources if r.get("format", "").upper() == "CSV" and r.get("url")]
    # Sort by name desc so most recent first (names contain YYYYMM or YYYYMMDD)
    csvs.sort(key=lambda r: r.get("name", ""), reverse=True)
    return csvs


def parse_ym(raw: str) -> str:
    """202604 -> '2026-04'"""
    s = str(raw).strip()
    if len(s) == 6:
        return f"{s[:4]}-{s[4:]}"
    return s


def aggregate_csv(content: bytes) -> dict:
    """
    Aggregate one monthly CSV into:
      national: {ym, uda, band1, band2, band3, urgent, cot}
      regional: {commissioner_name: {uda, cot}}
    Returns None if parse fails.
    """
    try:
        text = content.decode("utf-8-sig")
    except UnicodeDecodeError:
        text = content.decode("latin-1")

    reader = csv.DictReader(io.StringIO(text))
    # Strip leading/trailing whitespace from column names (some files have " COMMISSIONER_NAME")
    if reader.fieldnames:
        reader.fieldnames = [f.strip() for f in reader.fieldnames]
    rows = list(reader)
    if not rows:
        return None

    ym_raw = rows[0].get(COL_YEAR_MONTH, "")
    ym = parse_ym(ym_raw)

    nat_uda = 0.0
    nat_band1 = 0.0
    nat_band2 = 0.0
    nat_band3 = 0.0
    nat_urgent = 0.0
    regional = defaultdict(lambda: {"uda": 0.0, "cot": 0.0})

    def _f(row: dict, col: str) -> float:
        v = (row.get(col) or row.get(" " + col) or "0").strip()
        try:
            return float(v)
        except ValueError:
            return 0.0

    for row in rows:
        try:
            uda    = _f(row, COL_UDA_DELIVERED)
            b1     = _f(row, COL_BAND1)
            b2a    = _f(row, COL_BAND2A)
            b2b    = _f(row, COL_BAND2B)
            b2c    = _f(row, COL_BAND2C)
            b3     = _f(row, COL_BAND3)
            urgent = _f(row, COL_URGENT)
        except (ValueError, TypeError):
            continue

        b2 = b2a + b2b + b2c
        cot = b1 + b2 + b3 + urgent

        nat_uda    += uda
        nat_band1  += b1
        nat_band2  += b2
        nat_band3  += b3
        nat_urgent += urgent

        comm = (row.get(COL_COMMISSIONER) or row.get(" " + COL_COMMISSIONER) or "Unknown").strip()
        regional[comm]["uda"] += uda
        regional[comm]["cot"] += cot

    nat_cot = nat_band1 + nat_band2 + nat_band3 + nat_urgent

    return {
        "ym": ym,
        "ym_int": int(ym_raw[:6]) if ym_raw else 0,
        "national": {
            "uda": round(nat_uda),
            "cot": round(nat_cot),
            "band1": round(nat_band1),
            "band2": round(nat_band2),
            "band3": round(nat_band3),
            "urgent": round(nat_urgent),
        },
        "regional": {k: {"uda": round(v["uda"]), "cot": round(v["cot"])} for k, v in regional.items()},
    }


def compute_recovery_index(monthly: list[dict]) -> list[dict]:
    """
    Baseline = mean monthly UDA for 2019/20 (Apr 2019 -- Mar 2020).
    Recovery index = (month_uda / baseline_monthly_avg) * 100, rounded to 1dp.
    """
    baseline_uda = [m["national"]["uda"] for m in monthly if BASELINE_START <= m["ym_int"] <= BASELINE_END]
    if not baseline_uda:
        print("WARNING: no baseline months found; recovery index will be null", file=sys.stderr)
        baseline_avg = None
    else:
        baseline_avg = sum(baseline_uda) / len(baseline_uda)

    result = []
    for m in monthly:
        idx = None
        if baseline_avg and baseline_avg > 0:
            idx = round(m["national"]["uda"] / baseline_avg * 100, 1)
        result.append({
            "month": m["ym"],
            "uda": m["national"]["uda"],
            "cot": m["national"]["cot"],
            "band1": m["national"]["band1"],
            "band2": m["national"]["band2"],
            "band3": m["national"]["band3"],
            "urgent": m["national"]["urgent"],
            "recovery_index": idx,
        })
    return result, baseline_avg


def compute_regional_series(monthly: list[dict]) -> list[dict]:
    """Aggregate UDA and COT by commissioner across all months in the latest year available."""
    if not monthly:
        return []
    latest_ym = max(m["ym_int"] for m in monthly)
    latest_year = latest_ym // 100

    # Use April of latest year back 12 months
    by_comm = defaultdict(lambda: {"uda": 0.0, "cot": 0.0, "months": 0})
    for m in monthly:
        y = m["ym_int"] // 100
        if y == latest_year or (y == latest_year - 1 and (m["ym_int"] % 100) >= 4):
            for comm, vals in m["regional"].items():
                by_comm[comm]["uda"] += vals["uda"]
                by_comm[comm]["cot"] += vals["cot"]
                by_comm[comm]["months"] += 1

    # Also compute baseline for regional (2019/20)
    baseline_by_comm = defaultdict(lambda: {"uda": 0.0, "count": 0})
    for m in monthly:
        if BASELINE_START <= m["ym_int"] <= BASELINE_END:
            for comm, vals in m["regional"].items():
                baseline_by_comm[comm]["uda"] += vals["uda"]
                baseline_by_comm[comm]["count"] += 1

    rows = []
    for comm, vals in sorted(by_comm.items(), key=lambda x: -x[1]["uda"]):
        b = baseline_by_comm.get(comm)
        if b and b["count"] > 0:
            baseline_monthly = b["uda"] / b["count"]
            current_monthly = vals["uda"] / max(vals["months"], 1)
            ridx = round(current_monthly / baseline_monthly * 100, 1) if baseline_monthly > 0 else None
        else:
            ridx = None
        rows.append({
            "commissioner": comm,
            "uda_ttm": round(vals["uda"]),
            "cot_ttm": round(vals["cot"]),
            "recovery_index": ridx,
        })
    return rows


def main():
    print("Fetching CKAN resource list ...", file=sys.stderr)
    resources = get_csv_resources()
    print(f"  Found {len(resources)} CSV resources", file=sys.stderr)

    monthly_raw = []
    errors = 0
    downloaded_urls = []

    for res in resources:
        url = res["url"]
        name = res.get("name", "")
        print(f"  Downloading {name} ...", file=sys.stderr, end="\r")
        try:
            content = fetch_url(url)
            agg = aggregate_csv(content)
            if agg:
                monthly_raw.append(agg)
                downloaded_urls.append(url)
        except (urllib.error.URLError, Exception) as e:
            print(f"\n  SKIP {name}: {e}", file=sys.stderr)
            errors += 1

    print(f"\nAggregated {len(monthly_raw)} months ({errors} errors)", file=sys.stderr)

    # Sort chronologically
    monthly_raw.sort(key=lambda m: m["ym_int"])

    national_series, baseline_avg = compute_recovery_index(monthly_raw)
    regional_series = compute_regional_series(monthly_raw)

    last = national_series[-1] if national_series else {}
    prev_year = next(
        (m for m in reversed(national_series) if m["month"][:4] == str(int(last.get("month", "0000")[:4]) - 1)),
        None,
    )

    yoy_pct = None
    if prev_year and prev_year["uda"] and last.get("uda"):
        yoy_pct = round((last["uda"] - prev_year["uda"]) / prev_year["uda"] * 100, 1)

    # Baseline months for provenance
    baseline_months = [m for m in monthly_raw if BASELINE_START <= m["ym_int"] <= BASELINE_END]

    snapshot = {
        "meta": {
            "generated_at": datetime.date.today().isoformat(),
            "data_through": last.get("month", ""),
            "coverage": f"{national_series[0]['month'] if national_series else ''}/{last.get('month', '')}",
            "baseline_period": "2019/20 (Apr 2019 to Mar 2020)",
            "baseline_monthly_avg_uda": round(baseline_avg) if baseline_avg else None,
            "sources": [
                {
                    "name": "English Contractor Monthly General Dental Activity",
                    "publisher": "NHS Business Services Authority (NHSBSA)",
                    "portal": "https://opendata.nhsbsa.net/dataset/english-contractor-monthly-general-dental-activity",
                    "licence": "Open Government Licence v3.0",
                    "retrieved": datetime.date.today().isoformat(),
                    "attribution": "Data sourced from NHS Business Services Authority under the Open Government Licence v3.0. Free to cite with attribution to Dental Finance Partners.",
                }
            ],
            "notes": (
                "UDA = Unit of Dental Activity. Courses of treatment (COT) are the sum of Band 1, Band 2 (2a+2b+2c), Band 3 and Urgent bands. "
                "Recovery Index = monthly UDA / average monthly UDA in 2019/20 * 100 (100 = full pre-Covid baseline). "
                "Regional figures use ICB commissioner groupings as at each monthly submission. "
                "Data cover NHS England contracted dental activity only; private dentistry is not included."
            ),
        },
        "headline": {
            "last_settled_month": last.get("month", ""),
            "last_month_uda": last.get("uda", 0),
            "last_month_cot": last.get("cot", 0),
            "last_month_recovery_index": last.get("recovery_index"),
            "yoy_pct_uda": yoy_pct,
            "baseline_monthly_avg_uda": round(baseline_avg) if baseline_avg else None,
            "months_below_90": sum(1 for m in national_series if m["recovery_index"] is not None and m["recovery_index"] < 90),
            "regions_above_90": sum(1 for r in regional_series if r["recovery_index"] is not None and r["recovery_index"] >= 90),
            "regions_below_90": sum(1 for r in regional_series if r["recovery_index"] is not None and r["recovery_index"] < 90),
        },
        "series": {
            "national": national_series,
            "regional": regional_series,
        },
        "provenance": {
            "resource_urls_used": downloaded_urls[:5],  # sample; full list would be very long
            "total_resources_downloaded": len(downloaded_urls),
        },
    }

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(snapshot, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Written: {OUT_PATH}", file=sys.stderr)

    # Self-check
    assert len(national_series) > 0, "No national series entries"
    assert all(m["uda"] >= 0 for m in national_series), "Negative UDA values found"
    assert last.get("recovery_index") is not None, "Recovery index not computed for latest month"
    print("Self-check PASSED", file=sys.stderr)


if __name__ == "__main__":
    main()
