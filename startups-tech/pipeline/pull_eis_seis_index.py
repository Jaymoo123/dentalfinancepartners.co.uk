"""
UK Tech-Funding Reliefs Index (SEIS/EIS) -- HMRC statistics ODS pull.

Usage:
    python pull_eis_seis_index.py [path/to/eis_seis_tables.ods]

If no path is given, downloads the current release from gov.uk.

Writes:
    startups-tech/web/src/data/uk-tech-funding-reliefs-index.json

Source:
    HM Revenue and Customs, Enterprise Investment Scheme, Seed Enterprise
    Investment Scheme and Social Investment Tax Relief statistics: May 2026.
    https://www.gov.uk/government/statistics/enterprise-investment-scheme-and-seed-enterprise-investment-scheme-may-2026
    Licence: Open Government Licence v3.0.

Every figure in the output JSON is read directly out of the ODS tables below
-- nothing is hardcoded or estimated. Re-run this script whenever HMRC
publishes a new edition (annual, each May).
"""
from __future__ import annotations

import json
import sys
import urllib.request
from datetime import date
from pathlib import Path

import pandas as pd

REPO_ROOT = Path(__file__).resolve().parents[2]
OUTPUT_PATH = REPO_ROOT / "startups-tech" / "web" / "src" / "data" / "uk-tech-funding-reliefs-index.json"

SOURCE_URL = "https://assets.publishing.service.gov.uk/media/6a05db68da82768016cb3f9c/eis_seis_tables_2026.ods"
RELEASE_PAGE = "https://www.gov.uk/government/statistics/enterprise-investment-scheme-and-seed-enterprise-investment-scheme-may-2026"

PULL_DATE = date.today().isoformat()

INDUSTRY_SHORT = {
    "A. Agriculture, Forestry and Fishing; B. Mining and Quarrying": "Agriculture, forestry, fishing, mining",
    "C. Manufacturing": "Manufacturing",
    "D. Electricity, Gas, Steam and Air Conditioning; E. Water, Sewerage and Waste": "Energy, water, waste",
    "F. Construction": "Construction",
    "G. Wholesale and Retail Trade, Repairs": "Wholesale, retail and repairs",
    "H. Transport and Storage": "Transport and storage",
    "I. Accommodation and Food": "Accommodation and food",
    "J. Information and Communication": "Information and Communication",
    "K. Financial and Insurance": "Financial and insurance",
    "L. Real Estate": "Real estate",
    "M. Professional, Scientific and Technical": "Professional, scientific and technical",
    "N. Admin and Support Services; O. Public Admin, Defence and Social Services": "Admin, support and public services",
    "P. Education": "Education",
    "Q. Health and Social Work": "Health and social work",
    "R. Arts, Entertainment and Recreation": "Arts, entertainment and recreation",
    "S. Other services activities; T. Households; U. Overseas": "Other services and overseas",
}


def fetch_ods(path_arg: str | None) -> Path:
    if path_arg:
        return Path(path_arg)
    tmp = REPO_ROOT / "tmp" / "startups-tech-research" / "eis_seis_tables_2026.ods"
    if tmp.exists():
        return tmp
    tmp.parent.mkdir(parents=True, exist_ok=True)
    print(f"Downloading {SOURCE_URL} ...")
    urllib.request.urlretrieve(SOURCE_URL, tmp)
    return tmp


def read(fn: Path, sheet: str) -> pd.DataFrame:
    return pd.read_excel(fn, sheet_name=sheet, engine="odf", header=None)


def time_series(fn: Path, sheet_n: str, sheet_amt: str) -> list[dict]:
    """Merge the 'number of companies' sheet and the '£m raised' sheet by year."""
    dn = read(fn, sheet_n)
    da = read(fn, sheet_amt)
    # Header row is the last all-string row before numeric data starts.
    hdr_n = next(i for i in range(len(dn)) if str(dn.iloc[i, 0]).strip() == "Year")
    hdr_a = next(i for i in range(len(da)) if str(da.iloc[i, 0]).strip() == "Year")
    rows_n = dn.iloc[hdr_n + 1:].dropna(subset=[0])
    rows_a = da.iloc[hdr_a + 1:].dropna(subset=[0])
    amt_by_year = {str(r[0]): r for _, r in rows_a.iterrows()}
    out = []
    for _, r in rows_n.iterrows():
        year = str(r[0])
        a = amt_by_year.get(year)
        out.append({
            "year": year,
            "companiesFirstTime": int(r[1]),
            "companiesAll": int(r[len(r) - 2]) if len(r) > 3 else int(r[2]),
            "subscriptions": int(r[len(r) - 1]),
            "amountAllM": int(a.iloc[-1]) if a is not None else None,
        })
    return out


def eis_time_series(fn: Path) -> list[dict]:
    dn = read(fn, "1")
    da = read(fn, "2")
    hdr_n = next(i for i in range(len(dn)) if str(dn.iloc[i, 0]).strip() == "Year")
    hdr_a = next(i for i in range(len(da)) if str(da.iloc[i, 0]).strip() == "Year")
    rows_n = dn.iloc[hdr_n + 1:].dropna(subset=[0])
    rows_a = da.iloc[hdr_a + 1:].dropna(subset=[0])
    amt_by_year = {str(r[0]): r for _, r in rows_a.iterrows()}
    out = []
    for _, r in rows_n.iterrows():
        year = str(r[0])
        a = amt_by_year.get(year)
        out.append({
            "year": year,
            "companiesFirstTime": int(r[1]),
            "kicsRaisingFunds": int(r[2]),
            "companiesAll": int(r[3]),
            "subscriptions": int(r[4]),
            "amountFirstTimeM": int(a[1]) if a is not None else None,
            "amountKicsM": int(a[2]) if a is not None else None,
            "amountAllM": int(a[3]) if a is not None else None,
        })
    return out


def seis_time_series(fn: Path) -> list[dict]:
    dn = read(fn, "12")
    da = read(fn, "13")
    hdr_n = next(i for i in range(len(dn)) if str(dn.iloc[i, 0]).strip() == "Year")
    hdr_a = next(i for i in range(len(da)) if str(da.iloc[i, 0]).strip() == "Year")
    rows_n = dn.iloc[hdr_n + 1:].dropna(subset=[0])
    rows_a = da.iloc[hdr_a + 1:].dropna(subset=[0])
    amt_by_year = {str(r[0]): r for _, r in rows_a.iterrows()}
    out = []
    for _, r in rows_n.iterrows():
        year = str(r[0])
        a = amt_by_year.get(year)
        out.append({
            "year": year,
            "companiesFirstTime": int(r[1]),
            "companiesAll": int(r[2]),
            "subscriptions": int(r[3]),
            "amountFirstTimeM": int(a[1]) if a is not None else None,
            "amountAllM": int(a[2]) if a is not None else None,
        })
    return out


def sector_breakdown(fn: Path, sheet_companies: str, sheet_amount: str) -> dict:
    dc = read(fn, sheet_companies)
    da = read(fn, sheet_amount)
    hdr_c = next(i for i in range(len(dc)) if str(dc.iloc[i, 0]).strip() == "Industry")
    hdr_a = next(i for i in range(len(da)) if str(da.iloc[i, 0]).strip() == "Industry")
    years = [str(v) for v in dc.iloc[hdr_c, 1:4].tolist()]
    rows_c = dc.iloc[hdr_c + 1:hdr_c + 17].dropna(subset=[0])
    rows_a = da.iloc[hdr_a + 1:hdr_a + 17].dropna(subset=[0])
    amt_by_ind = {str(r[0]): r for _, r in rows_a.iterrows()}
    latest_year = years[-1]
    total_companies_latest = 0
    total_amount_latest = 0
    out_rows = []
    for _, r in rows_c.iterrows():
        industry = str(r[0])
        a = amt_by_ind.get(industry)
        companies = [int(r[i + 1]) for i in range(3)]
        amount = [int(a[i + 1]) for i in range(3)] if a is not None else [None, None, None]
        total_companies_latest += companies[-1]
        total_amount_latest += amount[-1] if amount[-1] is not None else 0
        out_rows.append({
            "industry": INDUSTRY_SHORT.get(industry, industry),
            "industryFull": industry,
            "companiesByYear": dict(zip(years, companies)),
            "amountMByYear": dict(zip(years, amount)),
        })
    for row in out_rows:
        latest_amt = row["amountMByYear"][latest_year]
        row["amountSharePctLatest"] = (
            round(latest_amt / total_amount_latest * 100, 1) if total_amount_latest and latest_amt is not None else None
        )
    return {"years": years, "rows": out_rows, "totalAmountMLatest": total_amount_latest, "totalCompaniesLatest": total_companies_latest}


def region_breakdown(fn: Path, sheet_companies: str, sheet_amount: str) -> dict:
    dc = read(fn, sheet_companies)
    da = read(fn, sheet_amount)
    hdr_c = next(i for i in range(len(dc)) if str(dc.iloc[i, 0]).strip() == "Government Office Region")
    hdr_a = next(i for i in range(len(da)) if str(da.iloc[i, 0]).strip() == "Government Office Region")
    years = [str(v) for v in dc.iloc[hdr_c, 1:4].tolist()]
    body_c = dc.iloc[hdr_c + 1:].dropna(subset=[0])
    body_a = da.iloc[hdr_a + 1:].dropna(subset=[0])
    amt_by_region = {str(r[0]): r for _, r in body_a.iterrows()}
    latest_year = years[-1]
    out_rows = []
    total_amount_latest = None
    for _, r in body_c.iterrows():
        region = str(r[0])
        if region == "Total":
            continue
        a = amt_by_region.get(region)
        companies = []
        for i in range(3):
            v = r[i + 1]
            companies.append(None if str(v).strip().startswith("<") else int(v))
        amount = []
        if a is not None:
            for i in range(3):
                v = a[i + 1]
                amount.append(None if str(v).strip().startswith("<") else int(v))
        else:
            amount = [None, None, None]
        out_rows.append({
            "region": region,
            "companiesByYear": dict(zip(years, companies)),
            "amountMByYear": dict(zip(years, amount)),
        })
    total_row_a = amt_by_region.get("Total")
    if total_row_a is not None:
        total_amount_latest = int(total_row_a[3])
    for row in out_rows:
        latest_amt = row["amountMByYear"][latest_year]
        row["amountSharePctLatest"] = (
            round(latest_amt / total_amount_latest * 100, 1) if total_amount_latest and latest_amt is not None else None
        )
    london_se = sum(
        row["amountMByYear"][latest_year] or 0
        for row in out_rows
        if row["region"] in ("London", "South East")
    )
    return {
        "years": years,
        "rows": out_rows,
        "totalAmountMLatest": total_amount_latest,
        "londonSouthEastAmountMLatest": london_se,
        "londonSouthEastSharePctLatest": round(london_se / total_amount_latest * 100, 1) if total_amount_latest else None,
    }


def aar_breakdown(fn: Path, sheet: str) -> dict:
    d = read(fn, sheet)
    hdr = next(i for i in range(len(d)) if str(d.iloc[i, 0]).strip() == "Year")
    rows = d.iloc[hdr + 1:].dropna(subset=[0])
    cols = ["year", "companiesSeekingAAR", "applicationsReceived", "approvedSameYear", "rejectedSameYear",
            "pendingOrNotPursued", "approvedSubsequentYears", "rejectedSubsequentYears"]
    out = []
    for _, r in rows.iterrows():
        rec = {cols[i]: (str(r[i]) if i == 0 else int(r[i])) for i in range(len(cols))}
        out.append(rec)
    latest = out[-1]
    approved_pct = round(latest["approvedSameYear"] / latest["applicationsReceived"] * 100, 0) if latest["applicationsReceived"] else None
    return {"years": out, "latestYear": latest["year"], "latestApprovedSameYearPct": approved_pct}


def main() -> None:
    path_arg = sys.argv[1] if len(sys.argv) > 1 else None
    fn = fetch_ods(path_arg)
    print(f"Reading {fn} ...")

    eis_series = eis_time_series(fn)
    seis_series = seis_time_series(fn)
    eis_sector = sector_breakdown(fn, "3", "4")
    seis_sector = sector_breakdown(fn, "14", "15")
    eis_region = region_breakdown(fn, "7", "8")
    seis_region = region_breakdown(fn, "18", "19")
    eis_aar = aar_breakdown(fn, "11")
    seis_aar = aar_breakdown(fn, "22")

    eis_latest = eis_series[-1]
    seis_latest = seis_series[-1]
    eis_ic = next(r for r in eis_sector["rows"] if r["industryFull"] == "J. Information and Communication")
    seis_ic = next(r for r in seis_sector["rows"] if r["industryFull"] == "J. Information and Communication")
    latest_sector_year = eis_sector["years"][-1]

    snapshot = {
        "meta": {
            "title": "UK Tech-Funding Reliefs Index (SEIS/EIS)",
            "description": (
                "Where UK startup equity money actually goes: annual EIS and SEIS company and "
                "funding statistics by sector and region, compiled from HMRC official statistics. "
                "EIS series runs from 1993-94, SEIS from 2012-13."
            ),
            "pullDate": PULL_DATE,
            "lastUpdated": PULL_DATE,
            "licence": "Open Government Licence v3.0 (OGL3). Reuse with attribution.",
            "citeAs": (
                f"UK Tech-Funding Reliefs Index, derived from HMRC Enterprise Investment Scheme and "
                f"Seed Enterprise Investment Scheme statistics: May 2026. Published under OGL3. "
                f"Data pulled {PULL_DATE}."
            ),
            "methodology": (
                "All figures are read directly from HMRC's published EIS/SEIS statistical tables "
                "(ODS format). Industrial allocation is based on each company's SIC 2007 code as held "
                "by HMRC; some companies may be re-classified between editions. Regional allocation is "
                "based on the postcode of the company's registered office, which may not match where "
                "the investment or trading activity actually took place. Company and subscription "
                "numbers are rounded by HMRC to the nearest 5; amounts to the nearest £1 million (SEIS) "
                "or as published (EIS). Figures marked '<5' or '<1' in the source are recorded as null "
                "here, not zero."
            ),
            "caveats": [
                "Sector and region breakdowns are only published by HMRC for the three most recent tax years (2022-23 to 2024-25); the long-run time series (EIS from 1993-94, SEIS from 2012-13) is UK-wide only, with no sector or region cut.",
                "Company and subscription counts are rounded to the nearest 5; totals may not sum exactly due to rounding.",
                "A company's sector is based on SIC 2007 self-classification; SIC-code miscoding is common across HMRC and Companies House data generally.",
                "Advance assurance requests (AAR) are a forward-looking pipeline signal, not a guarantee: 'approved in subsequent years' outcomes for the most recent 1-2 years are understated because HMRC has not yet processed all pending applications.",
                "Figures for the most recent tax year in any series may be revised in the next annual release.",
            ],
            "sources": {
                "hmrc_eis_seis_stats": {
                    "name": "Enterprise Investment Scheme, Seed Enterprise Investment Scheme and Social Investment Tax Relief statistics: May 2026",
                    "url": RELEASE_PAGE,
                    "odsUrl": SOURCE_URL,
                    "licence": "Open Government Licence v3.0",
                    "publisher": "HM Revenue and Customs",
                    "pullDate": PULL_DATE,
                },
            },
        },
        "eis": {
            "timeSeries": eis_series,
            "bySector": eis_sector,
            "byRegion": eis_region,
            "aar": eis_aar,
            "latest": {
                "year": eis_latest["year"],
                "companiesAll": eis_latest["companiesAll"],
                "amountAllM": eis_latest["amountAllM"],
                "infoCommsAmountM": eis_ic["amountMByYear"][latest_sector_year],
                "infoCommsSharePct": eis_ic["amountSharePctLatest"],
            },
        },
        "seis": {
            "timeSeries": seis_series,
            "bySector": seis_sector,
            "byRegion": seis_region,
            "aar": seis_aar,
            "latest": {
                "year": seis_latest["year"],
                "companiesAll": seis_latest["companiesAll"],
                "amountAllM": seis_latest["amountAllM"],
                "infoCommsAmountM": seis_ic["amountMByYear"][latest_sector_year],
                "infoCommsSharePct": seis_ic["amountSharePctLatest"],
            },
        },
    }

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(snapshot, f, indent=2, ensure_ascii=False)
    print(f"Wrote {OUTPUT_PATH}")

    print("\n=== Headline check ===")
    print(f"EIS {eis_latest['year']}: {eis_latest['companiesAll']} companies, £{eis_latest['amountAllM']}m raised")
    print(f"  Info & Comms: £{eis_ic['amountMByYear'][latest_sector_year]}m ({eis_ic['amountSharePctLatest']}%)")
    print(f"  London+SE: £{eis_region['londonSouthEastAmountMLatest']}m ({eis_region['londonSouthEastSharePctLatest']}%)")
    print(f"SEIS {seis_latest['year']}: {seis_latest['companiesAll']} companies, £{seis_latest['amountAllM']}m raised")
    print(f"  Info & Comms: £{seis_ic['amountMByYear'][latest_sector_year]}m ({seis_ic['amountSharePctLatest']}%)")
    print(f"  London+SE: £{seis_region['londonSouthEastAmountMLatest']}m ({seis_region['londonSouthEastSharePctLatest']}%)")
    print(f"EIS AAR {eis_aar['latestYear']}: {eis_aar['years'][-1]['applicationsReceived']} applications, {eis_aar['latestApprovedSameYearPct']}% approved same year")
    print(f"SEIS AAR {seis_aar['latestYear']}: {seis_aar['years'][-1]['applicationsReceived']} applications, {seis_aar['latestApprovedSameYearPct']}% approved same year")


if __name__ == "__main__":
    main()
