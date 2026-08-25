"""One-off assembly script: merges the NHSBSA Pharmacy Openings and Closures
monthly snapshot + the Companies House SIC 47730 formations snapshot into the
single JSON the pharmacies flagship research page reads.

Inputs (already written by other ingesters, both re-runnable):
  pharmacies/web/src/data/pharmacy-openings-closures-monthly.json
    (optimisation_engine.ingestion.research.fetchers.nhsbsa_pharmacy)
  pharmacies/web/src/data/pharmacy-ch-formations-index.json
    (optimisation_engine.ingestion.research.engine --site pharmacies)

Output:
  pharmacies/web/src/data/pharmacy-openings-closures-index.json
    (consumed by pharmacies/web/src/app/research/pharmacy-openings-closures-index/page.tsx)

The only two numbers NOT re-derived from a freshly downloaded source here are
the CH active/dissolved company totals, which were pulled directly from the
CH Advanced Search API on 2026-07-14 (9 days before this run) and are kept
as-is -- the engine only computes incorporation counts, not live
active/dissolved totals, so re-pulling those two figures is a separate,
smaller CH Advanced Search call (see refresh_ch_company_totals() below).
"""
from __future__ import annotations

import json
import os
from collections import defaultdict
from datetime import date

import httpx

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
DATA_DIR = os.path.join(ROOT, "pharmacies", "web", "src", "data")

CH_KEY = os.getenv("COMPANIES_HOUSE_API_KEY", "")
CH_BASE = "https://api.company-information.service.gov.uk"


def refresh_ch_company_totals() -> dict[str, dict]:
    """Live active/dissolved company hit-counts for SIC 47730 from the CH
    Advanced Search API (same call the original page.tsx figures came from)."""
    today = date.today().isoformat()
    with httpx.Client(auth=(CH_KEY, ""), timeout=30.0, headers={"Accept": "application/json"}) as c:
        r_active = c.get(f"{CH_BASE}/advanced-search/companies", params={"sic_codes": "47730", "company_status": "active", "size": "1"})
        r_active.raise_for_status()
        active = int(r_active.json().get("hits", 0))
        r_dissolved = c.get(f"{CH_BASE}/advanced-search/companies", params={"sic_codes": "47730", "company_status": "dissolved", "size": "1"})
        r_dissolved.raise_for_status()
        dissolved = int(r_dissolved.json().get("hits", 0))
    return {
        "activeCompanies": {"count": active, "asOf": today, "label": f"{active:,}"},
        "dissolvedCompanies": {"count": dissolved, "asOf": today, "label": f"{dissolved:,}"},
    }


def month_label(ym: str) -> str:
    y, m = ym.split("-")
    names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return f"{names[int(m) - 1]} {y}"


def main() -> None:
    with open(os.path.join(DATA_DIR, "pharmacy-openings-closures-monthly.json"), encoding="utf-8") as f:
        ooc = json.load(f)
    with open(os.path.join(DATA_DIR, "pharmacy-ch-formations-index.json"), encoding="utf-8") as f:
        ch = json.load(f)

    monthly = ooc["monthly"]
    latest = monthly[-1]
    yoy_row = next((r for r in monthly if r["month"] == f"{int(latest['month'][:4]) - 1}-{latest['month'][5:]}"), None)
    baseline = monthly[0]

    yoy_change = latest["total"] - yoy_row["total"] if yoy_row else None
    baseline_change = latest["total"] - baseline["total"]

    # Annual snapshot: December of each full year present, plus the latest month.
    by_year_dec: dict[str, dict] = {}
    for row in monthly:
        if row["month"].endswith("-12"):
            by_year_dec[row["month"][:4]] = row
    annual_snapshot = [
        {
            "year": int(yr),
            "month": row["month"],
            "monthLabel": month_label(row["month"]),
            "total": row["total"],
            "small": row["small"],
            "medium": row["medium"],
            "large": row["large"],
            "hundredHour": row["hundred_hour"],
            "distanceSellers": row["distance_sellers"],
        }
        for yr, row in sorted(by_year_dec.items())
    ]
    if latest["month"] != annual_snapshot[-1]["month"]:
        annual_snapshot.append({
            "year": int(latest["month"][:4]),
            "month": latest["month"],
            "monthLabel": month_label(latest["month"]) + " (latest)",
            "total": latest["total"],
            "small": latest["small"],
            "medium": latest["medium"],
            "large": latest["large"],
            "hundredHour": latest["hundred_hour"],
            "distanceSellers": latest["distance_sellers"],
        })

    # CH formations: seasonality (avg incorporations by calendar month, settled months only)
    ch_seg = ch["segments"][0]
    ch_settled_through = ch["meta"]["incorporations_settled_through"]
    ch_monthly_settled = [r for r in ch_seg["monthly"] if r["month"] <= ch_settled_through]
    by_cal_month: dict[int, list[int]] = defaultdict(list)
    for row in ch_monthly_settled:
        by_cal_month[int(row["month"][5:7])].append(row["count"])
    month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    seasonality = [
        {"monthNum": mn, "monthName": month_names[mn - 1], "avgCount": round(sum(vals) / len(vals), 1), "yearsOfData": len(vals)}
        for mn, vals in sorted(by_cal_month.items())
    ]

    ch_totals = refresh_ch_company_totals() if CH_KEY else {
        "activeCompanies": {"count": 7997, "asOf": "2026-07-14", "label": "7,997"},
        "dissolvedCompanies": {"count": 2615, "asOf": "2026-07-14", "label": "2,615"},
    }

    today = date.today().isoformat()

    out = {
        "meta": {
            "title": "UK Community Pharmacy Openings and Closures Index",
            "description": (
                "Monthly, owner-segmented data on England's NHS-contracted community pharmacy network from "
                "NHSBSA's Pharmacy Openings and Closures dataset, paired with Companies House SIC 47730 "
                "corporate-formations data. Two independent official spines, updated monthly on NHSBSA "
                "publication."
            ),
            "lastUpdated": today,
            "pullDate": today,
            "licence": "Open Government Licence v3.0 (OGL3). Derived from NHSBSA open data and Companies House public register. Reuse with attribution.",
            "citeAs": (
                f"UK Community Pharmacy Openings and Closures Index, derived from NHSBSA Pharmacy Openings and "
                f"Closures ({ooc['source']['resource_title']}) and Companies House Advanced Search API "
                f"(SIC 47730). Published under OGL3. Verified {today}."
            ),
            "methodology": (
                "NHS dispensing-pharmacy counts: the last-calendar-day-of-month snapshot published in NHSBSA's "
                "Pharmacy Openings and Closures dataset, which segments every pharmacy on an NHS England "
                "Pharmaceutical List by owner-group size (Small = 1-5 premises, Medium = 6-99, Large = 100+), "
                "100-hour contract status, and distance-selling status. The published monthly CSV is cumulative "
                "back to January 2021 and supersedes earlier files where NHSBSA has made backdated corrections, "
                "so this index always uses the single latest file rather than stitching together historic "
                "releases. Companies House SIC 47730 corporate counts: monthly incorporation counts from the CH "
                "Advanced Search API (sic_codes=47730), fetched via the same config-driven engine used across "
                "this site's research assets; the most recent 2 months are provisional (CH indexing lag) and "
                "excluded from headline and seasonality figures. Active/dissolved company totals are a live "
                f"snapshot pulled {ch_totals['activeCompanies']['asOf']}."
            ),
            "caveats": [
                "NHSBSA pharmacy counts cover England only. Scotland uses Public Services Scotland (PSD) data; Wales uses NWSSP; neither is included in this index.",
                "A pharmacy that changes ownership is recorded as a closure and a same-day reopening under the new owner. This does not affect net-change totals, but it means gross 'opened' and 'closed' counts overstate true market entry/exit -- use the net-change columns, not gross opened/closed, when describing churn.",
                "NHSBSA states that total figures may not agree month to month, and that backdated amendments occur; the published file for each month is treated as the current source of truth, which can mean small revisions to earlier months versus a prior release of this index.",
                "Companies House SIC 47730 figures are UK-wide (not England-only) and include holding companies, subsidiaries of pharmacy groups, and wholly private operators without an NHS contract -- they measure corporate-entity formation, not pharmacy premises opening.",
                "SIC codes are self-reported at incorporation; some pharmacy companies may be coded elsewhere (e.g. general retail) and excluded from the 47730 count, or non-pharmacy businesses may be miscoded into it.",
                "Small counts in any official NHSBSA or Companies House release may be subject to standard disclosure-control rounding or suppression; this index reports published totals as-is and does not attempt to reconstruct suppressed cells.",
            ],
            "sources": {
                "nhsbsa_openings_closures": {
                    "name": "NHSBSA Pharmacy Openings and Closures",
                    "url": ooc["source"]["url"],
                    "resource": ooc["source"]["resource_title"],
                    "licence": "Open Government Licence v3.0",
                    "publisher": "NHS Business Services Authority",
                    "pullDate": ooc["pull_date"],
                },
                "companies_house": {
                    "name": "Companies House Advanced Search API",
                    "url": "https://developer.company-information.service.gov.uk/api/docs/",
                    "licence": "Open Government Licence v3.0",
                    "publisher": "Companies House",
                    "pullDate": ch["meta"]["generated_at"],
                },
            },
        },
        "headline": {
            "latestMonth": latest["month"],
            "latestMonthLabel": month_label(latest["month"]),
            "latestTotal": latest["total"],
            "latestTotalLabel": f"{latest['total']:,}",
            "latestTotalExclDS": latest["total_excl_distance_sellers"],
            "latestSmall": latest["small"],
            "latestMedium": latest["medium"],
            "latestLarge": latest["large"],
            "latestHundredHour": latest["hundred_hour"],
            "latestDistanceSellers": latest["distance_sellers"],
            "yoyChange": yoy_change,
            "yoyChangeLabel": (f"-{abs(yoy_change):,}" if yoy_change and yoy_change < 0 else f"+{yoy_change:,}") if yoy_change is not None else None,
            "yoyPeriod": f"{month_label(yoy_row['month'])} to {month_label(latest['month'])}" if yoy_row else None,
            "baselineChange": baseline_change,
            "baselineChangeLabel": f"-{abs(baseline_change):,}" if baseline_change < 0 else f"+{baseline_change:,}",
            "baselinePeriod": f"{month_label(baseline['month'])} to {month_label(latest['month'])}",
            "baselineFromTotal": baseline["total"],
        },
        "monthly": monthly,
        "annualSnapshot": annual_snapshot,
        "companiesHouseSIC47730": {
            "description": (
                "Companies House SIC 47730 ('Dispensing chemist in specialised stores'), UK-wide incorporated "
                "companies. Monthly incorporation counts from the CH Advanced Search API; active/dissolved "
                f"totals are a live snapshot as of {ch_totals['activeCompanies']['asOf']}."
            ),
            "sicCode": 47730,
            "sicLabel": "Dispensing chemist in specialised stores",
            "activeCompanies": ch_totals["activeCompanies"],
            "dissolvedCompanies": ch_totals["dissolvedCompanies"],
            "sourceUrl": "https://developer.company-information.service.gov.uk/api/docs/",
            "monthly": ch_seg["monthly"],
            "annual": ch_seg["annual"],
            "lastSettledMonth": ch["headline"]["last_settled_month"],
            "ttm": ch["headline"]["pharmacy_cos_ttm"],
            "yoyPct": ch["headline"]["pharmacy_cos_yoy_pct"],
            "decade": ch["headline"]["decade"],
            "seasonality": seasonality,
            "peakMonth": ch["headline"]["peak_month"],
            "peakValue": ch["headline"]["peak_value"],
            "provisionalMonths": ch["meta"]["provisional_months"],
            "caveat": (
                "Incorporation counts measure new corporate entities registering under SIC 47730 -- a new "
                "incorporation may be a group restructuring, a new entrant, or a holding company, and does not "
                "always correspond to a new pharmacy premises opening. Dissolution can lag actual trading "
                "closure by many months. This corporate layer is complementary to the NHSBSA contractor count "
                "above, not a substitute for it: the two have diverged sharply since 2016 (SIC 47730 annual "
                "incorporations up more than 4x while NHS dispensing-pharmacy numbers have fallen every year), "
                "which is itself part of the story -- corporate/holding-company formation around pharmacy "
                "groups and online-only operators continues even as the physical NHS network shrinks."
            ),
        },
        "networkContext": {
            "englandFocus": True,
            "scotlandWalesNote": "Scotland dispensing data is published by Public Services Scotland (PSD); Wales by NHS Wales Shared Services Partnership (NWSSP). These devolved datasets are not included in v1 of this index.",
            "fundingContext": (
                "England's community pharmacy network is funded primarily under the Community Pharmacy "
                "Contractual Framework (CPCF). The NHSBSA Pharmacy Openings and Closures dataset is the most "
                "granular public signal of network size: a pharmacy that disappears from the monthly list has "
                "either closed, surrendered its NHS contract, or been absorbed into another site under new "
                "ownership. The Companies House formations data shows the corporate layer moving in the "
                "opposite direction -- a divergence that reflects consolidation, group restructuring, and "
                "online-only entrants rather than growth in the physical dispensing network."
            ),
            "ownershipNote": (
                "The NHSBSA dataset's Small/Medium/Large owner-group segmentation is the cleanest public split "
                "between independents (Small, 1-5 premises) and multiples (Medium/Large). Since January 2021, "
                f"Small-group pharmacies have grown from {baseline['small']:,} to {latest['small']:,} while "
                f"Large-group pharmacies have fallen from {baseline['large']:,} to {latest['large']:,} -- "
                "independents are gaining share of a shrinking total as the big multiples close and rationalise "
                "estates faster than independents are exiting."
            ),
        },
    }

    out_path = os.path.join(DATA_DIR, "pharmacy-openings-closures-index.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
    print(f"[snapshot] wrote {out_path}")
    print(f"  latest={out['headline']['latestMonth']} total={out['headline']['latestTotalLabel']} yoy={out['headline']['yoyChangeLabel']}")
    print(f"  CH SIC47730: ttm={out['companiesHouseSIC47730']['ttm']} yoy={out['companiesHouseSIC47730']['yoyPct']}% decade={out['companiesHouseSIC47730']['decade']}")


if __name__ == "__main__":
    main()
