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
# NHSBSA split Band 2 into 2A/2B/2C from the April 2023 file onward. Files up to and
# including March 2023 carry a single BAND_2_DELIVERED column instead. Read whichever
# the file actually has; reading only the 2A/2B/2C set silently zeroes Band 2 for the
# 84 months from April 2016 to March 2023.
COL_BAND2           = "BAND_2_DELIVERED"
COL_BAND2A          = "BAND_2A_DELIVERED"
COL_BAND2B          = "BAND_2B_DELIVERED"
COL_BAND2C          = "BAND_2C_DELIVERED"
COL_BAND3           = "BAND_3_DELIVERED"
COL_URGENT          = "BAND_URGENT_DELIVERED"

# Resources named UDA_CONTRACTOR_YYYYMM are the settled contractor series. NHSBSA also
# publishes the current in-year month as a standalone MONTHLY_DATA_UDA_YYYYMMDD file,
# which is provisional and subject to revision before it joins the settled series.
SETTLED_RESOURCE_PREFIX = "UDA_CONTRACTOR_"

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


_MONTHS = ["January", "February", "March", "April", "May", "June",
           "July", "August", "September", "October", "November", "December"]


def month_name(ym: str) -> str:
    """'2026-03' -> 'March 2026'"""
    y, _, m = ym.partition("-")
    return f"{_MONTHS[int(m) - 1]} {y}" if m.isdigit() else ym


def parse_ym(raw: str) -> str:
    """202604 -> '2026-04'"""
    s = str(raw).strip()
    if len(s) == 6:
        return f"{s[:4]}-{s[4:]}"
    return s


def aggregate_csv(content: bytes, settled: bool = True) -> dict:
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

    fields = set(reader.fieldnames or [])
    band2_split = COL_BAND2A in fields
    if not band2_split and COL_BAND2 not in fields:
        raise ValueError(f"{ym}: no Band 2 column found (neither {COL_BAND2} nor {COL_BAND2A})")

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
            if band2_split:
                b2 = _f(row, COL_BAND2A) + _f(row, COL_BAND2B) + _f(row, COL_BAND2C)
            else:
                b2 = _f(row, COL_BAND2)
            b3     = _f(row, COL_BAND3)
            urgent = _f(row, COL_URGENT)
        except (ValueError, TypeError):
            continue

        cot = b1 + b2 + b3 + urgent

        nat_uda    += uda
        nat_band1  += b1
        nat_band2  += b2
        nat_band3  += b3
        nat_urgent += urgent

        comm = (row.get(COL_COMMISSIONER) or row.get(" " + COL_COMMISSIONER) or "Unknown").strip()
        # NHSBSA renamed a commissioner mid-2025/26 ("Hampshire and Isle Of Wight ICB"
        # became "NHS Hampshire and Isle Of Wight ICB"). Strip the prefix so both halves
        # of the year aggregate to one geography instead of splitting its TTM total.
        if comm.startswith("NHS ") and comm.endswith("ICB"):
            comm = comm[4:]
        regional[comm]["uda"] += uda
        regional[comm]["cot"] += cot

    nat_cot = nat_band1 + nat_band2 + nat_band3 + nat_urgent

    return {
        "ym": ym,
        "ym_int": int(ym_raw[:6]) if ym_raw else 0,
        "settled": settled,
        "band2_split": band2_split,
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
        row = {
            "month": m["ym"],
            "uda": m["national"]["uda"],
            "cot": m["national"]["cot"],
            "band1": m["national"]["band1"],
            "band2": m["national"]["band2"],
            "band3": m["national"]["band3"],
            "urgent": m["national"]["urgent"],
            "recovery_index": idx,
        }
        if not m["settled"]:
            row["provisional"] = True
        result.append(row)
    return result, baseline_avg


def compute_regional_series(monthly: list[dict]) -> tuple[list[dict], list[str]]:
    """
    Aggregate UDA and COT by commissioner over the trailing TWELVE settled months.

    Returns (rows, window) where window is the [first_month, last_month] the totals cover,
    so callers can label the figures with the period they actually describe.
    """
    if not monthly:
        return [], []
    # Provisional months are excluded: they are revised before they join the settled series.
    settled = sorted((m for m in monthly if m["settled"]), key=lambda m: m["ym_int"])
    window = settled[-12:]
    if not window:
        return [], []

    by_comm = defaultdict(lambda: {"uda": 0.0, "cot": 0.0, "months": 0})
    for m in window:
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
    return rows, [window[0]["ym"], window[-1]["ym"]]


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
            agg = aggregate_csv(content, settled=name.upper().startswith(SETTLED_RESOURCE_PREFIX))
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
    regional_series, regional_window = compute_regional_series(monthly_raw)

    last = national_series[-1] if national_series else {}

    # Headline figures come from the last SETTLED month. The most recent month is often the
    # provisional in-year file, which is revised before it joins the settled series.
    settled_series = [m for m in national_series if not m.get("provisional")]
    last_settled = settled_series[-1] if settled_series else {}
    provisional_months = [m["month"] for m in national_series if m.get("provisional")]

    # Year on year on a rolling 12-month basis: the 12 settled months ending at the last
    # settled month, against the 12 months before them. Single-month comparisons swing wildly
    # on working-day counts and on where a month sat in the post-Covid recovery, so they are
    # not a defensible headline.
    yoy_pct = None
    yoy_basis = None
    if len(settled_series) >= 24:
        recent = settled_series[-12:]
        prior = settled_series[-24:-12]
        recent_uda = sum(m["uda"] for m in recent)
        prior_uda = sum(m["uda"] for m in prior)
        if prior_uda:
            yoy_pct = round((recent_uda - prior_uda) / prior_uda * 100, 1)
            yoy_basis = (
                f"Rolling 12 settled months ({month_name(recent[0]['month'])} to "
                f"{month_name(recent[-1]['month'])}) against the preceding 12 "
                f"({month_name(prior[0]['month'])} to {month_name(prior[-1]['month'])})."
            )

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
            "latest_month": last.get("month", ""),
            "last_settled_month": last_settled.get("month", ""),
            "provisional_months": provisional_months,
            "regional_window": regional_window,
            "notes": (
                "UDA = Unit of Dental Activity. Courses of treatment (COT) are the sum of the Band 1, Band 2, Band 3 and Urgent bands. "
                "NHSBSA reported Band 2 as a single column up to March 2023 and as 2A + 2B + 2C from April 2023; both forms are read and summed to one Band 2 total. "
                "Recovery Index = monthly UDA / average monthly UDA in 2019/20 * 100 (100 = full pre-Covid baseline). "
                "Headline figures use the most recent SETTLED month. NHSBSA also publishes the current in-year month as a separate provisional file, which is included in the charted series but flagged provisional and excluded from the headline. "
                "Regional figures use ICB commissioner groupings as at each monthly submission and cover the trailing twelve SETTLED months (see regional_window). "
                "Data cover NHS England contracted dental activity only; private dentistry is not included."
            ),
        },
        "headline": {
            "last_settled_month": last_settled.get("month", ""),
            "last_month_uda": last_settled.get("uda", 0),
            "last_month_cot": last_settled.get("cot", 0),
            "last_month_recovery_index": last_settled.get("recovery_index"),
            "yoy_pct_uda": yoy_pct,
            "yoy_basis": yoy_basis,
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
    # Every month must carry a Band 2 count; a zero means the column mapping missed the
    # BAND_2_DELIVERED / BAND_2A_DELIVERED switch again.
    zero_band2 = [m["month"] for m in national_series if not m["band2"]]
    assert not zero_band2, f"Band 2 is zero for {len(zero_band2)} months, first {zero_band2[:3]}"
    assert all(m["cot"] == m["band1"] + m["band2"] + m["band3"] + m["urgent"] for m in national_series), \
        "COT does not reconcile to the sum of its bands"
    assert last_settled.get("month"), "No settled month found"
    assert len(regional_window) == 2, "Regional window not recorded"
    print("Self-check PASSED", file=sys.stderr)


if __name__ == "__main__":
    main()
