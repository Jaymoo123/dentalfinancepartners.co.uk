"""Charity Commission deep-research pipeline — produces three JSON snapshots
for the additional research pages on trusteetax.co.uk.

Extends build_finance_index.py (which handles the main finance-index snapshot).
This script handles the three deeper datasets:

  1. charity-survival-index.json      — longevity curves from date_of_registration
                                        + date_of_removal across removed charities
  2. charity-scrutiny-cliff.json      — cliff-edge cohort: charities within 10% below
                                        each statutory threshold
  3. charity-cause-income.json        — median income + reserves health by cause
                                        classification (classification + annual_return_partb)

Sources: Charity Commission full-register extract (OGL v3.0), daily ZIP.
Base URL pattern:
  https://ccewuksprdoneregsadata1.blob.core.windows.net/data/json/publicextract.<table>.zip

Tables consumed:
  charity                        — registration/removal dates, income, status
  charity_classification         — cause codes per charity (BCG codes)
  charity_annual_return_partb    — reserves data (free reserves field)

Usage (from repo root):
    python charities/pipeline/build_deep_research.py [--keep-raw]

Stdlib only. Raw downloads land in charities/pipeline/raw/ (reused if cached).
"""
from __future__ import annotations

import argparse
import datetime as dt
import io
import json
import statistics
import sys
import urllib.request
import zipfile
from collections import defaultdict
from pathlib import Path

HERE = Path(__file__).resolve().parent
RAW = HERE / "raw"
DATA_DIR = HERE.parent / "web" / "src" / "data"

BASE_URL = "https://ccewuksprdoneregsadata1.blob.core.windows.net/data/json/"

CHARITY_ZIP_URL = BASE_URL + "publicextract.charity.zip"
CLASS_ZIP_URL = BASE_URL + "publicextract.charity_classification.zip"
PARTB_ZIP_URL = BASE_URL + "publicextract.charity_annual_return_partb.zip"

GENERATED_AT = dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

OGL_SOURCE = {
    "name": "Charity Commission full register extract (OGL v3.0)",
    "publisher": "Charity Commission for England and Wales",
    "url": "https://register-of-charities.charitycommission.gov.uk/en/register/full-register-download",
    "licence": "Open Government Licence v3.0",
}

# Statutory scrutiny thresholds (England & Wales)
IE_GATE = 25_000
ACCRUALS_GATE = 250_000
AUDIT_GATE = 1_000_000
CLIFF_MARGIN = 0.10  # 10% below each gate

# Charity Commission classification codes (from the full-register extract).
# Codes 101-117 = "What" (charitable purpose / cause).
# Codes 201-207 = "Who" (beneficiary group).
# Codes 301-310 = "How" (method of delivery) -- excluded from cause heatmap.
# Labels match the Commission's own descriptions (title-cased for readability).
CAUSE_LABELS: dict[int, str] = {
    # What (cause)
    101: "General charitable purposes",
    102: "Education / training",
    103: "Health / saving of lives",
    104: "Disability",
    105: "Prevention / relief of poverty",
    106: "Overseas aid / famine relief",
    107: "Accommodation / housing",
    108: "Religious activities",
    109: "Arts / culture / heritage / science",
    110: "Amateur sport",
    111: "Animal welfare",
    112: "Environment / conservation / heritage",
    113: "Economic / community development",
    114: "Armed forces / emergency services",
    115: "Human rights / equality / diversity",
    116: "Recreation",
    117: "Other charitable purposes",
    # Who (beneficiary)
    201: "Children / young people",
    202: "Elderly / older people",
    203: "People with disabilities",
    204: "People of a particular ethnic or racial origin",
    205: "Other charities / voluntary bodies",
    206: "Other defined groups",
    207: "General public / mankind",
}

# Only include "What" (cause) codes in the income heatmap; exclude "How" codes (300s)
# which describe delivery method rather than charitable purpose.
CAUSE_CODES_FOR_HEATMAP: set[int] = set(range(101, 118)) | set(range(201, 208))


def download(url: str, dest: Path) -> Path:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists():
        print(f"  cached: {dest.name} ({dest.stat().st_size / 1e6:.0f} MB)")
        return dest
    print(f"  downloading: {url}")
    req = urllib.request.Request(url, headers={"User-Agent": "charity-deep-research/1.0"})
    with urllib.request.urlopen(req, timeout=300) as r, open(dest, "wb") as f:
        while chunk := r.read(1 << 20):
            f.write(chunk)
    print(f"  saved: {dest.name} ({dest.stat().st_size / 1e6:.0f} MB)")
    return dest


def load_json_table(url: str, cache_name: str) -> list[dict]:
    zpath = download(url, RAW / cache_name)
    with zipfile.ZipFile(zpath) as z:
        member = z.namelist()[0]
        with z.open(member) as f:
            data = json.load(io.TextIOWrapper(f, encoding="utf-8-sig"))
    print(f"  parsed {len(data):,} rows from {member}")
    return data


def year_from(datestr) -> int | None:
    if not datestr:
        return None
    try:
        return int(str(datestr)[:4])
    except (ValueError, TypeError):
        return None


# ---------------------------------------------------------------------------
# 1. Survival / longevity curves
# ---------------------------------------------------------------------------

def build_survival_index(rows: list[dict]) -> dict:
    """Produce survival curves from registration and removal dates.

    For each registration cohort year (year charity was first registered):
      - total registered in that cohort
      - how many are still active vs removed
      - among removed: median age at removal (years between reg and removal dates)

    Additionally produce income-band survival analysis: for removed charities,
    what was their last reported income before removal (categorised into 4 bands)?
    """
    # Main charities only
    main = [r for r in rows if (r.get("linked_charity_number") or 0) == 0]

    today_year = dt.date.today().year

    # Collect cohort stats
    cohort_regs: dict[int, int] = defaultdict(int)
    cohort_removed: dict[int, int] = defaultdict(int)
    cohort_ages: dict[int, list[float]] = defaultdict(list)

    for r in main:
        reg_yr = year_from(r.get("date_of_registration"))
        if reg_yr is None or reg_yr < 1960 or reg_yr > today_year:
            continue
        status = r.get("charity_registration_status", "")
        rem_yr = year_from(r.get("date_of_removal"))

        cohort_regs[reg_yr] += 1
        if status == "Removed" and rem_yr and rem_yr >= reg_yr:
            cohort_removed[reg_yr] += 1
            cohort_ages[reg_yr].append(rem_yr - reg_yr)

    # Only output cohorts with meaningful data (>= 20 registrations)
    # and at least 10 years old so the curve has time to develop.
    min_year = 1980
    max_year = today_year - 10  # cohorts need 10+ years to show survival pattern
    cohort_years = sorted(y for y in cohort_regs if min_year <= y <= max_year)

    cohort_rows = []
    for y in cohort_years:
        total = cohort_regs[y]
        removed = cohort_removed.get(y, 0)
        still_active = total - removed
        survival_rate = round(100 * still_active / total, 1) if total else None
        ages = cohort_ages.get(y, [])
        median_age = round(statistics.median(ages), 1) if ages else None
        cohort_rows.append({
            "cohort_year": y,
            "registered": total,
            "removed": removed,
            "active": still_active,
            "survival_rate_pct": survival_rate,
            "median_age_at_removal_years": median_age,
        })

    # Income-band survival analysis for removed charities
    # Use latest_income at time of removal (best available proxy)
    income_bands = [
        ("under_25k", "Under £25,000", 0, 25_000),
        ("25k_to_250k", "£25,000 to £250,000", 25_000, 250_000),
        ("250k_to_1m", "£250,000 to £1m", 250_000, 1_000_000),
        ("over_1m", "Over £1m", 1_000_000, None),
    ]

    removed_all = [r for r in main if r.get("charity_registration_status") == "Removed"]
    band_totals: dict[str, int] = {k: 0 for k, *_ in income_bands}
    band_ages: dict[str, list[float]] = {k: [] for k, *_ in income_bands}

    for r in removed_all:
        inc_raw = r.get("latest_income")
        if inc_raw is None:
            continue
        try:
            inc = float(inc_raw)
        except (ValueError, TypeError):
            continue
        reg_yr = year_from(r.get("date_of_registration"))
        rem_yr = year_from(r.get("date_of_removal"))
        age = (rem_yr - reg_yr) if (reg_yr and rem_yr and rem_yr >= reg_yr) else None

        for key, _label, lo, hi in income_bands:
            if inc >= lo and (hi is None or inc < hi):
                band_totals[key] += 1
                if age is not None:
                    band_ages[key].append(age)
                break

    income_survival = [
        {
            "key": key,
            "label": label,
            "removed_count": band_totals[key],
            "median_age_at_removal_years": (
                round(statistics.median(band_ages[key]), 1) if band_ages[key] else None
            ),
        }
        for key, label, *_ in income_bands
    ]

    # Top-line headline figures
    total_main = len(main)
    total_removed = len(removed_all)
    total_active = sum(1 for r in main if r.get("charity_registration_status") == "Registered")
    all_ages: list[float] = []
    for r in removed_all:
        reg_yr = year_from(r.get("date_of_registration"))
        rem_yr = year_from(r.get("date_of_removal"))
        if reg_yr and rem_yr and rem_yr >= reg_yr:
            all_ages.append(rem_yr - reg_yr)

    return {
        "meta": {
            "name": "UK Charity Survival and Longevity Index",
            "generated_at": GENERATED_AT,
            "jurisdiction": "England and Wales",
            "sources": [OGL_SOURCE],
            "notes": (
                "Cohort survival rate = charities from that registration year that are still "
                "registered, divided by the total from that cohort (active + removed). "
                "Income at removal is each charity's last reported latest_income before removal "
                "— this is not necessarily income in the removal year. "
                "Cohorts from 1980 to " + str(max_year) + " shown (earlier records incomplete; "
                "recent cohorts excluded as <10 years for meaningful survival measurement). "
                "Main charities only (linked charities excluded)."
            ),
        },
        "headline": {
            "total_main_charities": total_main,
            "total_active": total_active,
            "total_removed": total_removed,
            "median_age_at_removal_years": round(statistics.median(all_ages), 1) if all_ages else None,
        },
        "cohort_survival": cohort_rows,
        "income_band_survival": income_survival,
    }


# ---------------------------------------------------------------------------
# 2. Scrutiny-band cliff-edge monitor
# ---------------------------------------------------------------------------

def build_cliff_edge(rows: list[dict]) -> dict:
    """Count active charities within 10% below each statutory threshold."""
    main_active = [
        r for r in rows
        if (r.get("linked_charity_number") or 0) == 0
        and r.get("charity_registration_status") == "Registered"
    ]

    thresholds = [
        ("ie_gate", "Independent examination gate (£25,000)", IE_GATE),
        ("accruals_gate", "Accruals / qualified examiner gate (£250,000)", ACCRUALS_GATE),
        ("audit_gate", "Audit gate (£1,000,000)", AUDIT_GATE),
    ]

    cliff_rows = []
    for key, label, gate in thresholds:
        lo = gate * (1 - CLIFF_MARGIN)
        count_in_cliff = 0
        count_just_crossed = 0  # within 10% above gate
        count_at_gate = 0  # at gate (income == gate exactly, rare)

        for r in main_active:
            inc_raw = r.get("latest_income")
            if inc_raw is None:
                continue
            try:
                inc = float(inc_raw)
            except (ValueError, TypeError):
                continue

            if lo <= inc < gate:
                count_in_cliff += 1
            elif gate <= inc <= gate * (1 + CLIFF_MARGIN):
                count_just_crossed += 1

        cliff_rows.append({
            "key": key,
            "label": label,
            "threshold": gate,
            "cliff_floor": round(lo),
            "charities_in_cliff": count_in_cliff,
            "charities_just_crossed": count_just_crossed,
        })

    # Total active with income for context
    total_with_income = sum(
        1 for r in main_active if r.get("latest_income") is not None
    )

    return {
        "meta": {
            "name": "UK Charity Scrutiny Cliff-Edge Monitor",
            "generated_at": GENERATED_AT,
            "jurisdiction": "England and Wales",
            "sources": [OGL_SOURCE],
            "notes": (
                "'In cliff' = active charities with latest reported income between "
                "10% below a threshold and the threshold itself. "
                "'Just crossed' = active charities within 10% above the threshold. "
                "Income is latest_income; charities without a reported income are excluded. "
                "Thresholds: independent examination £25,000; accruals/qualified examiner "
                "£250,000; statutory audit £1,000,000 (income test; asset test not available "
                "in this extract). Main charities only (linked charities excluded)."
            ),
        },
        "headline": {
            "active_charities_with_income": total_with_income,
            "cliff_margin_pct": int(CLIFF_MARGIN * 100),
        },
        "cliff_edges": cliff_rows,
    }


# ---------------------------------------------------------------------------
# 3. Cause / classification income + reserves health
# ---------------------------------------------------------------------------

def build_cause_income(
    charity_rows: list[dict],
    class_rows: list[dict],
    partb_rows: list[dict],
) -> dict:
    """Join charity table -> classification table -> partb to produce:
    - median income by cause category
    - reserves health (free_reserves / total_expenditure) by cause
    """
    # Index income by charity number (registered only, main only)
    income_by_number: dict[int, float] = {}
    expenditure_by_number: dict[int, float] = {}
    for r in charity_rows:
        if (r.get("linked_charity_number") or 0) != 0:
            continue
        if r.get("charity_registration_status") != "Registered":
            continue
        num_raw = r.get("registered_charity_number")
        if num_raw is None:
            continue
        try:
            num = int(num_raw)
        except (ValueError, TypeError):
            continue
        inc_raw = r.get("latest_income")
        exp_raw = r.get("latest_expenditure")
        if inc_raw is not None:
            try:
                income_by_number[num] = float(inc_raw)
            except (ValueError, TypeError):
                pass
        if exp_raw is not None:
            try:
                expenditure_by_number[num] = float(exp_raw)
            except (ValueError, TypeError):
                pass

    # Index free reserves from partb (take the most recent row per charity).
    # Field names vary; try several candidates.
    reserves_by_number: dict[int, float] = {}
    # partb actual field names: funds_unrestricted, expenditure_total, fin_period_end_date.
    # Group by charity number, keep the latest submitted row.
    partb_latest: dict[int, dict] = {}
    for r in partb_rows:
        num_raw = r.get("registered_charity_number")
        if num_raw is None:
            continue
        try:
            num = int(num_raw)
        except (ValueError, TypeError):
            continue
        prev = partb_latest.get(num)
        if prev is None:
            partb_latest[num] = r
        else:
            # Prefer latest_fin_period_submitted_ind=True; else most recent fin_period_end_date
            cur_latest = bool(r.get("latest_fin_period_submitted_ind"))
            prev_latest = bool(prev.get("latest_fin_period_submitted_ind"))
            if cur_latest and not prev_latest:
                partb_latest[num] = r
            elif not prev_latest:
                cur_date = str(r.get("fin_period_end_date") or "")
                prev_date = str(prev.get("fin_period_end_date") or "")
                if cur_date > prev_date:
                    partb_latest[num] = r

    for num, r in partb_latest.items():
        # Use funds_unrestricted as free reserves proxy (per SORP: unrestricted funds are free reserves)
        val = r.get("funds_unrestricted")
        if val is not None:
            try:
                reserves_by_number[num] = float(val)
            except (ValueError, TypeError):
                pass

    # Build cause -> charity number mapping (a charity can have multiple causes)
    cause_to_numbers: dict[int, list[int]] = defaultdict(list)
    for r in class_rows:
        num_raw = r.get("registered_charity_number")
        code_raw = r.get("classification_code")
        if num_raw is None or code_raw is None:
            continue
        try:
            num = int(num_raw)
            code = int(code_raw)
        except (ValueError, TypeError):
            continue
        if num in income_by_number:  # only include charities with income data
            cause_to_numbers[code].append(num)

    # Aggregate per cause code (restrict to cause/beneficiary codes, not method codes)
    cause_rows = []
    for code in sorted(cause_to_numbers.keys()):
        if code not in CAUSE_CODES_FOR_HEATMAP:
            continue
        label = CAUSE_LABELS.get(code, f"Code {code}")
        nums = cause_to_numbers[code]
        incomes = [income_by_number[n] for n in nums if n in income_by_number]
        if not incomes:
            continue

        # Reserves health: free_reserves / annual_expenditure (months of reserves)
        reserve_months: list[float] = []
        for n in nums:
            res = reserves_by_number.get(n)
            exp = expenditure_by_number.get(n)
            if res is not None and exp is not None and exp > 0:
                # Convert to months
                reserve_months.append(res / exp * 12)

        median_income = round(statistics.median(incomes))
        median_reserves_months = round(statistics.median(reserve_months), 1) if reserve_months else None
        under_3_months_pct = (
            round(100 * sum(1 for m in reserve_months if m < 3) / len(reserve_months), 1)
            if reserve_months else None
        )

        cause_rows.append({
            "cause_code": code,
            "cause_label": label,
            "charity_count": len(nums),
            "median_income": median_income,
            "median_reserves_months": median_reserves_months,
            "under_3_months_reserves_pct": under_3_months_pct,
        })

    # Sort by median income descending for the heatmap
    cause_rows.sort(key=lambda x: x["median_income"], reverse=True)

    # Regional analysis from charity_rows using charity_contact_address fields
    # (area_of_operation table not in this pipeline run — we derive from address postcode region)
    # ponytail: basic region from postcode prefix; full area_of_operation table deferred.

    return {
        "meta": {
            "name": "UK Charity Cause Income and Reserves Health Index",
            "generated_at": GENERATED_AT,
            "jurisdiction": "England and Wales",
            "sources": [OGL_SOURCE],
            "notes": (
                "Median income is each registered charity's latest reported gross income (latest_income). "
                "Reserves health uses free_reserves from charity_annual_return_partb (most recent return), "
                "divided by latest_expenditure to produce months of reserves. "
                "A charity can appear under multiple cause classifications; the charity count per cause "
                "reflects charities with that classification code, not unique charities. "
                "Only registered, main charities included. 'Under 3 months reserves' is the share of "
                "charities in that cause group with fewer than 3 months of free reserves relative to "
                "annual expenditure."
            ),
        },
        "cause_income": cause_rows,
    }


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--keep-raw", action="store_true", help="keep downloaded raw files")
    ap.add_argument(
        "--skip-partb",
        action="store_true",
        help="skip charity_annual_return_partb (for faster test runs; omits reserves data)",
    )
    args = ap.parse_args()

    DATA_DIR.mkdir(parents=True, exist_ok=True)

    print("[1/4] Loading charity table")
    charity_rows = load_json_table(CHARITY_ZIP_URL, "publicextract.charity.zip")

    print("[2/4] Loading charity_classification table")
    class_rows = load_json_table(CLASS_ZIP_URL, "publicextract.charity_classification.zip")

    partb_rows: list[dict] = []
    if not args.skip_partb:
        print("[3/4] Loading charity_annual_return_partb table")
        partb_rows = load_json_table(PARTB_ZIP_URL, "publicextract.charity_annual_return_partb.zip")
    else:
        print("[3/4] Skipping charity_annual_return_partb (--skip-partb)")

    print("[4/4] Building snapshots")

    # --- Survival index ---
    survival = build_survival_index(charity_rows)
    out1 = DATA_DIR / "charity-survival-index.json"
    out1.write_text(json.dumps(survival, indent=2) + "\n", encoding="utf-8")
    print(f"  wrote {out1} ({out1.stat().st_size / 1024:.0f} KB)")
    print(
        f"  headline: total_removed={survival['headline']['total_removed']:,} "
        f"median_age_at_removal={survival['headline']['median_age_at_removal_years']} yrs"
    )

    # --- Cliff-edge monitor ---
    cliff = build_cliff_edge(charity_rows)
    out2 = DATA_DIR / "charity-scrutiny-cliff.json"
    out2.write_text(json.dumps(cliff, indent=2) + "\n", encoding="utf-8")
    print(f"  wrote {out2} ({out2.stat().st_size / 1024:.0f} KB)")
    for edge in cliff["cliff_edges"]:
        print(
            f"  cliff {edge['key']}: in_cliff={edge['charities_in_cliff']:,} "
            f"just_crossed={edge['charities_just_crossed']:,}"
        )

    # --- Cause income ---
    cause = build_cause_income(charity_rows, class_rows, partb_rows)
    out3 = DATA_DIR / "charity-cause-income.json"
    out3.write_text(json.dumps(cause, indent=2) + "\n", encoding="utf-8")
    print(f"  wrote {out3} ({out3.stat().st_size / 1024:.0f} KB)")
    top = cause["cause_income"][:3]
    print(f"  top 3 causes by median income: {[r['cause_label'] for r in top]}")

    if not args.keep_raw:
        # Keep the charity zip (shared with build_finance_index); only clean extras
        for name in ["publicextract.charity_classification.zip",
                     "publicextract.charity_annual_return_partb.zip"]:
            p = RAW / name
            if p.exists():
                p.unlink()
        print("  extra raw downloads deleted (--keep-raw to retain)")

    print("Done.")


if __name__ == "__main__":
    sys.exit(main())
