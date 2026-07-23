"""
UK Tech Startup Survival Curves -- ONS Business Demography reference tables pull.

Usage:
    python pull_tech_survival_index.py [path/to/business_demography_reference.xlsx]

If no path is given, downloads the current release from ons.gov.uk.

Writes:
    startups-tech/web/src/data/tech-startup-survival-index.json

Source:
    Office for National Statistics, Business Demography, UK: 2024 (reference
    tables), Table 4.2: Survival of newly born enterprises by broad industry
    group, births in 2019 to 2023 and their survival.
    https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/datasets/businessdemographyreferencetable
    Licence: Open Government Licence v3.0.

Every figure in the output JSON is read directly out of the ONS table below --
nothing is hardcoded or estimated. Re-run whenever ONS publishes a new edition
(annual, each November).
"""
from __future__ import annotations

import json
import re
import sys
import urllib.request
from datetime import date
from pathlib import Path

import pandas as pd

REPO_ROOT = Path(__file__).resolve().parents[2]
OUTPUT_PATH = REPO_ROOT / "startups-tech" / "web" / "src" / "data" / "tech-startup-survival-index.json"

SOURCE_URL = (
    "https://www.ons.gov.uk/file?uri=/businessindustryandtrade/business/"
    "activitysizeandlocation/datasets/businessdemographyreferencetable/"
    "current/businessdemographyexceltables2024.xlsx"
)
RELEASE_PAGE = "https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/bulletins/businessdemography/2024"
DATASET_PAGE = "https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/datasets/businessdemographyreferencetable"

PULL_DATE = date.today().isoformat()

TECH_INDUSTRY_LABEL = "Information and communication"


def fetch_xlsx(path_arg: str | None) -> Path:
    if path_arg:
        return Path(path_arg)
    tmp = REPO_ROOT / "tmp" / "startups-tech-research" / "ons_business_demography_2024.xlsx"
    if tmp.exists():
        return tmp
    tmp.parent.mkdir(parents=True, exist_ok=True)
    print(f"Downloading {SOURCE_URL} ...")
    urllib.request.urlretrieve(SOURCE_URL, tmp)
    return tmp


def num(v):
    """Cells are floats, ':' (suppressed/not yet available), or NaN -> null."""
    if v is None:
        return None
    s = str(v).strip()
    if s in ("", "nan", ":"):
        return None
    try:
        return round(float(v), 1) if isinstance(v, float) and not float(v).is_integer() else int(float(v))
    except (ValueError, TypeError):
        return None


def parse_table_4_2(fn: Path) -> dict:
    """Returns {cohort_year: {industry: {births, survival: {1: {count, pct}, ...}}}}."""
    d = pd.read_excel(fn, sheet_name="Table 4.2", engine="odf" if fn.suffix == ".ods" else "openpyxl", header=None)
    cohorts: dict[str, dict] = {}
    current_year: str | None = None
    year_re = re.compile(r"^(19|20)\d{2}$")
    for _, r in d.iterrows():
        col0 = str(r[0]).strip() if r[0] is not None else ""
        if year_re.match(col0):
            current_year = col0
            cohorts[current_year] = {}
            continue
        if current_year is None or col0 in ("", "nan"):
            continue
        births = num(r[1])
        if births is None:
            continue
        survival = {}
        # columns: 2=1yr count,3=1yr pct,4=2yr count,5=2yr pct,6=3yr count,7=3yr pct,8=4yr count,9=4yr pct,10=5yr count,11=5yr pct
        for yr_n, count_col, pct_col in [(1, 2, 3), (2, 4, 5), (3, 6, 7), (4, 8, 9), (5, 10, 11)]:
            count = num(r[count_col])
            pct = r[pct_col]
            pct_val = None
            if pct is not None and str(pct).strip() not in ("", "nan", ":"):
                try:
                    pct_val = round(float(pct), 1)
                except (ValueError, TypeError):
                    pct_val = None
            if count is not None and pct_val is not None:
                survival[str(yr_n)] = {"count": count, "pct": pct_val}
        cohorts[current_year][col0] = {"births": births, "survival": survival}
    return cohorts


def main() -> None:
    path_arg = sys.argv[1] if len(sys.argv) > 1 else None
    fn = fetch_xlsx(path_arg)
    print(f"Reading {fn} ...")

    cohorts = parse_table_4_2(fn)
    cohort_years = sorted(cohorts.keys())

    # Build a tidy series: for each cohort year, tech vs all-industry survival at each available horizon
    series = []
    for yr in cohort_years:
        industries = cohorts[yr]
        tech = industries.get(TECH_INDUSTRY_LABEL)
        total = industries.get("Total")
        if not tech or not total:
            continue
        series.append({
            "cohortYear": yr,
            "techBirths": tech["births"],
            "allIndustryBirths": total["births"],
            "techSurvival": tech["survival"],
            "allIndustrySurvival": total["survival"],
        })

    # Headline: the oldest cohort with 5-year data (2019, the only one with a full 5-year window)
    full_5yr = next((s for s in series if "5" in s["techSurvival"]), series[0])
    tech_5yr = full_5yr["techSurvival"].get("5")
    all_5yr = full_5yr["allIndustrySurvival"].get("5")

    # Latest cohort with 1-year data, for a "most recent" reading
    latest_cohort = series[-1]
    tech_1yr_latest = latest_cohort["techSurvival"].get("1")

    # Sector table for the most recent full 2-year cohort (broadest available sector list
    # with at least 2-year survival across most industries)
    two_yr_cohort_year = cohort_years[-2] if len(cohort_years) >= 2 else cohort_years[-1]
    sector_2yr_rows = []
    for industry, rec in cohorts[two_yr_cohort_year].items():
        if industry == "Total":
            continue
        s1 = rec["survival"].get("1")
        s2 = rec["survival"].get("2")
        sector_2yr_rows.append({
            "industry": industry,
            "births": rec["births"],
            "oneYearSurvivalPct": s1["pct"] if s1 else None,
            "twoYearSurvivalPct": s2["pct"] if s2 else None,
        })
    sector_2yr_rows.sort(key=lambda r: r["twoYearSurvivalPct"] or 0, reverse=True)

    snapshot = {
        "meta": {
            "title": "UK Tech Startup Survival Curves",
            "description": (
                "How many UK tech startups survive their first five years, compared against the "
                "all-industry baseline, compiled from ONS Business Demography reference tables. "
                "Tracks successive birth cohorts (2019 to 2023) through to their latest available "
                "survival anniversary."
            ),
            "pullDate": PULL_DATE,
            "lastUpdated": PULL_DATE,
            "licence": "Open Government Licence v3.0 (OGL3). Reuse with attribution.",
            "citeAs": (
                f"UK Tech Startup Survival Curves, derived from ONS Business Demography, UK: 2024 "
                f"(Table 4.2, reference tables). Published under OGL3. Data pulled {PULL_DATE}."
            ),
            "methodology": (
                "All figures are read directly from ONS Business Demography Table 4.2 (Survival of "
                "newly born enterprises by broad industry group). An enterprise 'births' in a given "
                "year if it is a new legal unit with no predecessor. Survival at N years means the "
                "enterprise was still active N years after birth, regardless of employment or "
                "turnover change. 'Information and communication' is ONS's broad industry group "
                "covering publishing, software, telecoms, broadcasting and IT services (SIC sections "
                "58 to 63), a broader grouping than software-only. Counts are control-rounded to the "
                "base 5 by ONS. Only the 2019 birth cohort has a complete 5-year survival window in "
                "this edition; more recent cohorts (2020 to 2023) have progressively shorter windows "
                "because fewer years have elapsed since birth."
            ),
            "caveats": [
                "'Information and communication' is a broad ONS industry group (SIC sections 58-63: publishing, software, telecoms, broadcasting, IT services), not a software/SaaS-only cut. It is the closest available official grouping to 'tech startups'.",
                "Survival counts are control-rounded by ONS to the nearest 5, so percentages calculated from the published counts may differ very slightly from ONS's own published percentages (both are shown here; ONS's own percentage is used).",
                "Only the 2019 birth cohort has a full 5-year survival reading in this edition. Later cohorts (2020-2023) are shown with only the survival horizons that have actually elapsed; cells marked as unavailable in the source ('suppressed pending data') are omitted, not treated as zero.",
                "'Survival' means the enterprise remained on the statistical business register (broadly, still trading or dormant with an active VAT/PAYE registration); it does not measure profitability, growth, or founder outcome. A company can survive while shrinking, and a company can be a successful trade sale or wind-down (not a 'failure') while counting as dissolved.",
                "This is an enterprise-level series (ONS Business Demography), separate from and not directly comparable to the Companies House incorporation/dissolution snapshot used in this site's other formation-tracking research pages.",
            ],
            "sources": {
                "ons_business_demography": {
                    "name": "Business Demography, UK: 2024",
                    "url": RELEASE_PAGE,
                    "datasetUrl": DATASET_PAGE,
                    "xlsxUrl": SOURCE_URL,
                    "licence": "Open Government Licence v3.0",
                    "publisher": "Office for National Statistics",
                    "pullDate": PULL_DATE,
                },
            },
        },
        "cohortSeries": series,
        "sectorTwoYear": {
            "cohortYear": two_yr_cohort_year,
            "rows": sector_2yr_rows,
        },
        "headline": {
            "fullFiveYearCohort": full_5yr["cohortYear"],
            "techFiveYearSurvivalPct": tech_5yr["pct"] if tech_5yr else None,
            "allIndustryFiveYearSurvivalPct": all_5yr["pct"] if all_5yr else None,
            "latestCohortYear": latest_cohort["cohortYear"],
            "techOneYearSurvivalPctLatest": tech_1yr_latest["pct"] if tech_1yr_latest else None,
        },
    }

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(snapshot, f, indent=2, ensure_ascii=False)
    print(f"Wrote {OUTPUT_PATH}")

    print("\n=== Headline check ===")
    print(f"{full_5yr['cohortYear']} cohort, 5-year survival: tech {tech_5yr['pct'] if tech_5yr else 'n/a'}% vs all-industry {all_5yr['pct'] if all_5yr else 'n/a'}%")
    print(f"Latest cohort {latest_cohort['cohortYear']}, 1-year survival: tech {tech_1yr_latest['pct'] if tech_1yr_latest else 'n/a'}%")


if __name__ == "__main__":
    main()
