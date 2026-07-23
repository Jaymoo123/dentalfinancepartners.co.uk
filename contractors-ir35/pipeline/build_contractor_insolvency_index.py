"""UK Contractor Insolvency Index -- data pipeline.

Fetches record-level data from the Insolvency Service (Company Insolvency
Statistics) and writes contractors-ir35/web/src/data/uk-contractor-insolvency-index.json.

Contractors sit across two SIC 2007 1-digit sections:
  Section J: Information and communication (IT contracting)
  Section M: Professional, scientific and technical activities (management
             consultancy, engineering)
Both are coarse: Section J also covers publishing, broadcasting and telecoms;
Section M also covers legal/accounting, advertising and R&D. The "captured"
series below narrows to the specific 2-digit SIC divisions that overlap the UK
Contractor Index SIC set (62 IT consultancy, 70 management consultancy, 71
engineering), giving a share-of-industry-captured figure alongside the coarser
section-level headline.

Source:
  Company Insolvency Statistics, The Insolvency Service (gov.uk)
  Licence: Open Government Licence v3.0
  Record-level data covers England, Wales and Scotland from January 2016.

Usage (from repo root):
  python contractors-ir35/pipeline/build_contractor_insolvency_index.py

Self-contained: no Supabase, no git commit.
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
# Config -- same June 2026 release used by the hospitality insolvency ingester
# (optimisation_engine/ingestion/ingest_hospitality_insolvency.py); update the
# URL here when a newer release is published.
# ---------------------------------------------------------------------------

RELEASE_PAGE = "https://www.gov.uk/government/statistics/company-insolvencies-june-2026"
RECORD_LEVEL_ZIP_URL = (
    "https://assets.publishing.service.gov.uk/media/"
    "6a57978e31fb6daf3141374c/"
    "Record-level_data_for_England_Wales_and_Scotland_-_"
    "Company_Insolvency_Statistics_June_2026.zip"
)
LICENCE = "Open Government Licence v3.0"
PUBLISHER = "The Insolvency Service"
RELEASE_DATE = "2026-07-17"
COVERAGE_PERIOD = "2016-01/2026-06"
COVERAGE = "England, Wales and Scotland"
USER_AGENT = "ContractorTaxAccountants-Research/1.0"

PROCEDURE_MAP = {
    "Creditors Voluntary Liquidation": "cvl",
    "Compulsory Liquidation": "compulsory",
    "In Administration": "administration",
    "Administration to CVL": "administration_to_cvl",
    "Corporate Voluntary Arrangement": "cva",
    "Administrative Receiver": "receivership",
    "Moratorium": "moratorium",
}

SIC_SECTIONS = {
    "J": "Information and communication",
    "M": "Professional, scientific and technical activities",
}
CAPTURED_DIVISIONS = {
    "62": "Computer programming, consultancy and related activities",
    "70": "Activities of head offices; management consultancy activities",
    "71": "Architectural and engineering activities; technical testing and analysis",
}

OUT_PATH = (
    Path(__file__).resolve().parent.parent
    / "web" / "src" / "data" / "uk-contractor-insolvency-index.json"
)


def fetch_zip(url: str) -> zipfile.ZipFile:
    r = requests.get(url, headers={"User-Agent": USER_AGENT}, timeout=120)
    r.raise_for_status()
    return zipfile.ZipFile(io.BytesIO(r.content))


def parse_record_level(zf: zipfile.ZipFile) -> tuple[
    dict[str, dict[str, int]],  # by_month[month][procedure] = count -- Sections J+M combined
    dict[str, dict[str, int]],  # by_year[year][procedure] = count -- Sections J+M combined
    dict[str, dict[str, int]],  # section_by_month[month][section] = count
    dict[str, dict[str, int]],  # section_by_year[year][section] = count
    dict[str, int],             # captured_by_month[month] = count (divisions 62/70/71)
    dict[str, int],             # captured_by_year[year] = count (divisions 62/70/71)
]:
    by_month: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))
    by_year: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))
    section_by_month: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))
    section_by_year: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))
    captured_by_month: dict[str, int] = defaultdict(int)
    captured_by_year: dict[str, int] = defaultdict(int)

    with zf.open("record-level-data.csv") as f:
        reader = csv.DictReader(io.TextIOWrapper(f, encoding="latin-1"))
        for row in reader:
            section = row["sic07_1_digit"]
            if section not in SIC_SECTIONS:
                continue
            month = row["month_registered"]  # e.g. "2025-03"
            year = month[:4]
            proc = PROCEDURE_MAP.get(row["case_type"], "other")

            by_month[month][proc] += 1
            by_year[year][proc] += 1
            section_by_month[month][section] += 1
            section_by_year[year][section] += 1

            division = row.get("sic07_2_digit", "").strip()
            if division in CAPTURED_DIVISIONS:
                captured_by_month[month] += 1
                captured_by_year[year] += 1

    return (
        dict(by_month), dict(by_year),
        dict(section_by_month), dict(section_by_year),
        dict(captured_by_month), dict(captured_by_year),
    )


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


def build_section_series(
    section_by_month: dict, section_by_year: dict,
) -> tuple[list[dict], list[dict]]:
    secs = list(SIC_SECTIONS.keys())

    monthly = []
    for month in sorted(section_by_month):
        row: dict = {"month": month}
        t = 0
        for s in secs:
            v = section_by_month[month].get(s, 0)
            row[s] = v
            t += v
        row["total"] = t
        monthly.append(row)

    annual = []
    for year in sorted(section_by_year):
        row: dict = {"year": int(year)}
        t = 0
        for s in secs:
            v = section_by_year[year].get(s, 0)
            row[s] = v
            t += v
        row["total"] = t
        annual.append(row)

    return monthly, annual


def build_captured_series(captured_by_month: dict, captured_by_year: dict) -> tuple[list[dict], list[dict]]:
    monthly = [{"month": m, "total": captured_by_month[m]} for m in sorted(captured_by_month)]
    annual = [{"year": int(y), "total": captured_by_year[y]} for y in sorted(captured_by_year)]
    return monthly, annual


def build_headline(monthly: list[dict], annual: list[dict], section_monthly: list[dict],
                    captured_monthly: list[dict], captured_annual: list[dict]) -> dict:
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

    last_year = int(last_ym[:4])
    full_annual = [r for r in annual if r["year"] < last_year]
    decade_from = full_annual[0] if full_annual else annual[0]
    decade_to = full_annual[-1] if full_annual else annual[-1]
    decade_change = None
    if decade_from["total"] > 0:
        decade_change = round((decade_to["total"] - decade_from["total"]) / decade_from["total"] * 100, 1)

    section_ttm_rows = section_monthly[-12:]
    sections_ttm = {s: sum(r.get(s, 0) for r in section_ttm_rows) for s in SIC_SECTIONS}

    captured_ttm_rows = captured_monthly[-12:]
    captured_ttm = sum(r["total"] for r in captured_ttm_rows)
    captured_share_pct = round(captured_ttm / ttm_total * 100, 1) if ttm_total else None

    full_captured_annual = [r for r in captured_annual if r["year"] < last_year]
    cap_decade_from = full_captured_annual[0] if full_captured_annual else captured_annual[0]
    cap_decade_to = full_captured_annual[-1] if full_captured_annual else captured_annual[-1]
    cap_decade_change = None
    if cap_decade_from["total"] > 0:
        cap_decade_change = round(
            (cap_decade_to["total"] - cap_decade_from["total"]) / cap_decade_from["total"] * 100, 1
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
        "sections_ttm": sections_ttm,
        "captured_ttm": captured_ttm,
        "captured_share_pct": captured_share_pct,
        "captured_decade": {
            "from_year": cap_decade_from["year"],
            "to_year": cap_decade_to["year"],
            "from_total": cap_decade_from["total"],
            "to_total": cap_decade_to["total"],
            "change_pct": cap_decade_change,
        },
    }


def main() -> None:
    print("Fetching record-level ZIP from Insolvency Service...")
    zf = fetch_zip(RECORD_LEVEL_ZIP_URL)

    print("Parsing Section J and M (contractor sectors) records...")
    (
        by_month, by_year,
        section_by_month, section_by_year,
        captured_by_month, captured_by_year,
    ) = parse_record_level(zf)

    print(f"  Months found: {len(by_month)}, Years: {len(by_year)}")

    monthly, annual = build_series(by_month, by_year)
    section_monthly, section_annual = build_section_series(section_by_month, section_by_year)
    captured_monthly, captured_annual = build_captured_series(captured_by_month, captured_by_year)
    headline = build_headline(monthly, annual, section_monthly, captured_monthly, captured_annual)

    snapshot = {
        "meta": {
            "generated_at": date.today().isoformat(),
            "data_through": monthly[-1]["month"],
            "coverage": COVERAGE,
            "sic_sections": SIC_SECTIONS,
            "captured_divisions": CAPTURED_DIVISIONS,
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
                        "Data sourced from The Insolvency Service under the Open Government "
                        "Licence v3.0. Free to cite with attribution to Contractor Tax "
                        "Accountants."
                    ),
                }
            ],
            "notes": (
                "Counts cover England, Wales and Scotland. Contractors sit across two SIC 2007 "
                "1-digit sections: J (Information and communication, which captures IT "
                "contracting) and M (Professional, scientific and technical activities, which "
                "captures management consultancy and engineering). Both sections are coarse: J "
                "also covers publishing, broadcasting and telecoms; M also covers legal and "
                "accounting, advertising, R&D and veterinary activities, none of which are "
                "contractor-heavy. The 'captured' series narrows to the specific 2-digit SIC "
                "divisions that overlap the UK Contractor Index SIC set (62 IT consultancy, 70 "
                "management consultancy, 71 engineering), so the 'share of industry captured' "
                "figure shows what fraction of the coarser J+M section total sits in the "
                "divisions this site actually tracks. Totals are gross registered insolvencies: "
                "each procedure entry is counted once on the date the insolvency was "
                "registered, not the underlying trading activity. Counts are not rates: they "
                "are not adjusted for the number of active companies in each sector or "
                "division, so a rising count can partly reflect sector growth rather than "
                "worsening conditions. 2026 data is a partial year."
            ),
            "attribution": (
                "UK Contractor Insolvency Index compiled from Insolvency Service public "
                "records (Open Government Licence v3.0). Free to cite with attribution to "
                "Contractor Tax Accountants."
            ),
        },
        "headline": headline,
        "insolvencies": {
            "monthly": monthly,
            "annual": annual,
        },
        "sections": {
            "monthly": section_monthly,
            "annual": section_annual,
        },
        "captured": {
            "monthly": captured_monthly,
            "annual": captured_annual,
        },
    }

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(snapshot, indent=2), encoding="utf-8")
    print(f"Written: {OUT_PATH}")

    # Self-check
    assert len(monthly) > 0, "Monthly series is empty"
    for r in monthly:
        proc_sum = sum(r.get(p, 0) for p in PROCEDURE_MAP.values())
        assert r["total"] == proc_sum, f"Total mismatch at {r['month']}: {r['total']} != {proc_sum}"
    assert len(section_monthly) == len(monthly), "section monthly series length mismatch"
    sec_by_month = {r["month"]: r for r in section_monthly}
    for r in monthly:
        s = sec_by_month.get(r["month"])
        assert s is not None, f"missing section row for {r['month']}"
        assert s["total"] == r["total"], f"section total mismatch at {r['month']}: {s['total']} != {r['total']}"
    cap_by_month = {r["month"]: r["total"] for r in captured_monthly}
    for r in monthly:
        cap_total = cap_by_month.get(r["month"], 0)
        assert cap_total <= r["total"], f"captured exceeds section total at {r['month']}"
    print("Self-check passed.")
    print(f"Latest month: {headline['last_settled_month']} -- J+M total {headline['last_month_total']}")
    print(f"TTM total: {headline['ttm_total']}")
    print(f"Captured TTM: {headline['captured_ttm']} ({headline['captured_share_pct']}% of J+M)")
    print(f"Sections TTM: {headline['sections_ttm']}")


if __name__ == "__main__":
    main()
