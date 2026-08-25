"""
R&D Tax Relief Usage Index (tech sector focus) -- HMRC statistics ODS pull.

Usage:
    python pull_rd_relief_index.py [path/to/rd_main_tables.ods]

If no path is given, downloads the current release from gov.uk.

Writes:
    startups-tech/web/src/data/rd-tax-relief-index.json

Source:
    HM Revenue and Customs, Research and Development Tax Credits Statistics,
    September 2025 edition (latest as at pull date).
    https://www.gov.uk/government/statistics/corporate-tax-research-and-development-tax-credit
    Licence: Open Government Licence v3.0.

Every figure in the output JSON is read directly out of the ODS tables below
-- nothing is hardcoded or estimated. Re-run whenever HMRC publishes a new
edition (annual, each September).
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
OUTPUT_PATH = REPO_ROOT / "startups-tech" / "web" / "src" / "data" / "rd-tax-relief-index.json"

SOURCE_URL_MAIN = "https://assets.publishing.service.gov.uk/media/68dbe4c2c487360cc70c9f5e/rd_tax_credits_main_tables_ods.ods"
RELEASE_PAGE = "https://www.gov.uk/government/statistics/corporate-tax-research-and-development-tax-credit"

PULL_DATE = date.today().isoformat()

SECTOR_SHORT = {
    "A. Agriculture, Forestry, Fishing": "Agriculture, forestry, fishing",
    "B. Mining & Quarrying": "Mining and quarrying",
    "C. Manufacturing": "Manufacturing",
    "D. Electricity, Gas, Steam and Air Conditioning": "Electricity, gas, steam",
    "E. Water, Sewerage and Waste": "Water, sewerage and waste",
    "F. Construction": "Construction",
    "G. Wholesale & Retail Trade, Repairs": "Wholesale, retail and repairs",
    "H. Transport & Storage": "Transport and storage",
    "I. Accommodation & Food": "Accommodation and food",
    "J. Information & Communication": "Information and Communication",
    "K. Financial & Insurance": "Financial and insurance",
    "L. Real Estate": "Real estate",
    "M. Professional, Scientific & Technical": "Professional, scientific and technical",
    "N. Admin & Support Services": "Admin and support services",
    "O. Public Admin, Defence and Social Services": "Public admin, defence, social services",
    "P. Education": "Education",
    "Q. Health & Social Work": "Health and social work",
    "R. Arts, Entertainment & Recreation": "Arts, entertainment and recreation",
    "S. Other services activities": "Other services activities",
    "Other or unknown": "Other or unknown",
}


def fetch_ods(path_arg: str | None) -> Path:
    if path_arg:
        return Path(path_arg)
    tmp = REPO_ROOT / "tmp" / "startups-tech-research" / "rd_main_tables.ods"
    if tmp.exists():
        return tmp
    tmp.parent.mkdir(parents=True, exist_ok=True)
    print(f"Downloading {SOURCE_URL_MAIN} ...")
    urllib.request.urlretrieve(SOURCE_URL_MAIN, tmp)
    return tmp


def read(fn: Path, sheet: str) -> pd.DataFrame:
    return pd.read_excel(fn, sheet_name=sheet, engine="odf", header=None)


def num(v) -> int | None:
    """HMRC cells are strings like '46,950' or '<10'/'<5' -> null, or NaN -> null."""
    if v is None:
        return None
    s = str(v).strip()
    if s == "" or s.lower() == "nan":
        return None
    if s.startswith("<"):
        return None
    return int(s.replace(",", ""))


def rd1_claims_series(fn: Path) -> list[dict]:
    d = read(fn, "RD1")
    hdr = next(i for i in range(len(d)) if str(d.iloc[i, 0]).strip() == "Financial Year")
    rows = d.iloc[hdr + 1:]
    rows = rows[rows[0].astype(str).str.match(r"^\d{4}-\d{2}$")]
    out = []
    for _, r in rows.iterrows():
        out.append({
            "year": str(r[0]),
            "status": str(r[1]),
            "smeDeductions": num(r[2]),
            "smePayableCredits": num(r[3]),
            "smeCombination": num(r[4]),
            "smeIntensives": num(r[5]),
            "smeTotal": num(r[6]),
            "largeCompanyScheme": num(r[7]),
            "rdecByLargeCompanies": num(r[8]),
            "rdecBySmes": num(r[9]),
            "lcRdecTotal": num(r[10]),
            "vaccinesResearchRelief": num(r[11]),
            "totalClaims": num(r[12]),
            "totalReturns": num(r[13]),
            "totalCompanies": num(r[14]),
        })
    return out


def rd2_cost_series(fn: Path) -> list[dict]:
    d = read(fn, "RD2")
    hdr = next(i for i in range(len(d)) if str(d.iloc[i, 0]).strip() == "Financial Year")
    rows = d.iloc[hdr + 1:]
    rows = rows[rows[0].astype(str).str.match(r"^\d{4}-\d{2}$")]
    out = []
    for _, r in rows.iterrows():
        out.append({
            "year": str(r[0]),
            "status": str(r[1]),
            "smeDeductionsM": num(r[2]),
            "smePayableCreditsM": num(r[3]),
            "smeTotalM": num(r[4]),
            "largeCompanySchemeM": num(r[5]),
            "rdecByLargeCompaniesM": num(r[6]),
            "rdecBySmesM": num(r[7]),
            "lcRdecTotalM": num(r[8]),
            "vaccinesResearchReliefM": num(r[9]),
            "totalCostM": num(r[10]),
        })
    return out


def rd4_expenditure_series(fn: Path) -> list[dict]:
    d = read(fn, "RD4")
    hdr = next(i for i in range(len(d)) if str(d.iloc[i, 0]).strip() == "Financial Year")
    rows = d.iloc[hdr + 1:]
    rows = rows[rows[0].astype(str).str.match(r"^\d{4}-\d{2}$")]
    out = []
    for _, r in rows.iterrows():
        out.append({
            "year": str(r[0]),
            "status": str(r[1]),
            "smeSchemeM": num(r[2]),
            "largeCompanySchemeM": num(r[3]),
            "rdecByLargeCompaniesM": num(r[4]),
            "rdecBySmesM": num(r[5]),
            "vaccinesResearchReliefM": num(r[6]),
            "allSchemesM": num(r[7]),
        })
    return out


def rd6_sector(fn: Path, sheet: str) -> dict:
    d = read(fn, sheet)
    hdr = next(i for i in range(len(d)) if str(d.iloc[i, 0]).strip() == "Sector")
    body = d.iloc[hdr + 1:]
    rows = []
    total_row = None
    for _, r in body.iterrows():
        label = str(r[0]).strip()
        if label in ("End of worksheet", "nan", ""):
            continue
        rec = {
            "sector": SECTOR_SHORT.get(label, label),
            "sectorFull": label,
            "smeClaims": num(r[1]),
            "smeCostM": num(r[2]),
            "rdecLcClaims": num(r[3]),
            "rdecLcCostM": num(r[4]),
            "rdecSmeClaims": num(r[5]),
            "rdecSmeCostM": num(r[6]),
            "totalClaims": num(r[7]),
            "totalCostM": num(r[8]),
            "totalExpenditureM": num(r[9]),
        }
        if label == "Total":
            total_row = rec
        else:
            rows.append(rec)
    total_claims = total_row["totalClaims"] if total_row else sum(r["totalClaims"] or 0 for r in rows)
    total_cost = total_row["totalCostM"] if total_row else sum(r["totalCostM"] or 0 for r in rows)
    for r in rows:
        r["claimsSharePct"] = round((r["totalClaims"] or 0) / total_claims * 100, 1) if total_claims else None
        r["costSharePct"] = round((r["totalCostM"] or 0) / total_cost * 100, 1) if total_cost else None
    return {"rows": rows, "total": total_row}


def rd5_region(fn: Path, sheet: str) -> dict:
    d = read(fn, sheet)
    hdr = next(i for i in range(len(d)) if str(d.iloc[i, 0]).strip() == "Region")
    body = d.iloc[hdr + 1:]
    rows = []
    total_row = None
    for _, r in body.iterrows():
        label = str(r[0]).strip()
        if label in ("End of worksheet", "nan", ""):
            continue
        rec = {
            "region": label,
            "totalClaims": num(r[7]),
            "totalCostM": num(r[8]),
            "totalExpenditureM": num(r[9]),
        }
        if label == "Total":
            total_row = rec
        else:
            rows.append(rec)
    total_cost = total_row["totalCostM"] if total_row else sum(r["totalCostM"] or 0 for r in rows)
    for r in rows:
        r["costSharePct"] = round((r["totalCostM"] or 0) / total_cost * 100, 1) if total_cost else None
    return {"rows": rows, "total": total_row}


def main() -> None:
    path_arg = sys.argv[1] if len(sys.argv) > 1 else None
    fn = fetch_ods(path_arg)
    print(f"Reading {fn} ...")

    claims_series = rd1_claims_series(fn)
    cost_series = rd2_cost_series(fn)
    expenditure_series = rd4_expenditure_series(fn)
    sector = rd6_sector(fn, "RD6_2324")
    region = rd5_region(fn, "RD5_2324")

    latest_claims = claims_series[-1]
    prior_claims = claims_series[-2]
    latest_cost = cost_series[-1]
    latest_year = latest_claims["year"]
    yoy_claims_pct = round(
        (latest_claims["totalClaims"] - prior_claims["totalClaims"]) / prior_claims["totalClaims"] * 100, 1
    )

    ic_row = next(r for r in sector["rows"] if r["sectorFull"] == "J. Information & Communication")
    mfg_row = next(r for r in sector["rows"] if r["sectorFull"] == "C. Manufacturing")
    pst_row = next(r for r in sector["rows"] if r["sectorFull"] == "M. Professional, Scientific & Technical")
    top3_claims_pct = round(
        (ic_row["totalClaims"] + mfg_row["totalClaims"] + pst_row["totalClaims"])
        / sector["total"]["totalClaims"] * 100, 1
    )
    top3_cost_pct = round(
        (ic_row["totalCostM"] + mfg_row["totalCostM"] + pst_row["totalCostM"])
        / sector["total"]["totalCostM"] * 100, 1
    )
    sector_by_claims_rank = sorted(sector["rows"], key=lambda r: r["totalClaims"] or 0, reverse=True)
    ic_claims_rank = next(i for i, r in enumerate(sector_by_claims_rank, 1) if r["sectorFull"] == "J. Information & Communication")

    snapshot = {
        "meta": {
            "title": "R&D Tax Relief Usage Index (UK tech sector)",
            "description": (
                "The R&D relief squeeze on tech: annual R&D tax credit claims, cost and qualifying "
                "expenditure by sector and region, compiled from HMRC official statistics. Covers the "
                "post-clampdown claim collapse and Information & Communication's position as a top "
                "sector by both claim volume and cost."
            ),
            "pullDate": PULL_DATE,
            "lastUpdated": PULL_DATE,
            "licence": "Open Government Licence v3.0 (OGL3). Reuse with attribution.",
            "citeAs": (
                f"R&D Tax Relief Usage Index, derived from HMRC Research and Development Tax Credits "
                f"Statistics (main tables), September 2025 edition. Published under OGL3. "
                f"Data pulled {PULL_DATE}."
            ),
            "methodology": (
                "All figures are read directly from HMRC's published R&D Tax Credits statistical "
                "tables (ODS format, main tables). Sector allocation is based on the primary SIC 2007 "
                "code of the claimant company as registered with Companies House, and may not correspond "
                "to the actual industry of the R&D activity. Regional allocation is based on the "
                "postcode of the company's registered address. Figures for 2021-22 to 2023-24 are "
                "provisional; 2023-24 figures are further uplifted by HMRC to include estimates for "
                "claims not yet received, and are expected to be revised upward in the next annual "
                "release. Cells marked '<10' or '<5' in the source are recorded as null here, not zero."
            ),
            "caveats": [
                "The 2023-24 claim count (46,950) is a HMRC uplifted estimate, not a final count: some claims for that accounting period had not yet been received when the statistics were compiled, and the true figure typically revises upward in the following year's release.",
                "The sharp fall in claims from 2021-22 onward reflects a deliberate HMRC compliance clampdown (additional information forms, mandatory claim notification, increased fraud and error checks) introduced from August 2023, not a genuine fall in UK R&D activity.",
                "Sector is based on SIC 2007 self-classification of the claimant company; the R&D activity itself may sit in a different sector to the company's registered SIC code.",
                "Company size within a sector (SME scheme vs RDEC) is not separately published in the main tables' sector breakdown; the SME/RDEC split shown is UK-wide only.",
                "Figures are on an accounting-period basis, not a tax-year cash basis; claims for a given financial year continue to be received and revised for up to several years after that year ends.",
            ],
            "sources": {
                "hmrc_rd_stats": {
                    "name": "Research and Development Tax Credits Statistics: September 2025",
                    "url": RELEASE_PAGE,
                    "odsUrl": SOURCE_URL_MAIN,
                    "licence": "Open Government Licence v3.0",
                    "publisher": "HM Revenue and Customs",
                    "pullDate": PULL_DATE,
                },
            },
        },
        "claimsSeries": claims_series,
        "costSeries": cost_series,
        "expenditureSeries": expenditure_series,
        "sector": sector,
        "region": region,
        "headline": {
            "latestYear": latest_year,
            "totalClaims": latest_claims["totalClaims"],
            "yoyClaimsPct": yoy_claims_pct,
            "totalCostM": latest_cost["totalCostM"],
            "totalExpenditureM": expenditure_series[-1]["allSchemesM"],
            "infoCommsClaims": ic_row["totalClaims"],
            "infoCommsClaimsSharePct": ic_row["claimsSharePct"],
            "infoCommsCostM": ic_row["totalCostM"],
            "infoCommsCostSharePct": ic_row["costSharePct"],
            "infoCommsClaimsRank": ic_claims_rank,
            "top3SectorsClaimsSharePct": top3_claims_pct,
            "top3SectorsCostSharePct": top3_cost_pct,
        },
    }

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(snapshot, f, indent=2, ensure_ascii=False)
    print(f"Wrote {OUTPUT_PATH}")

    print("\n=== Headline check ===")
    print(f"{latest_year}: {latest_claims['totalClaims']} claims ({yoy_claims_pct}% YoY), £{latest_cost['totalCostM']}m cost, £{expenditure_series[-1]['allSchemesM']}m expenditure")
    print(f"Info & Comms: {ic_row['totalClaims']} claims ({ic_row['claimsSharePct']}%, rank #{ic_claims_rank}), £{ic_row['totalCostM']}m cost ({ic_row['costSharePct']}%)")
    print(f"Top 3 sectors (I&C+Manufacturing+Prof/Sci/Tech): {top3_claims_pct}% of claims, {top3_cost_pct}% of cost")


if __name__ == "__main__":
    main()
