"""UK Agency Insolvency Index -- data ingestion.

Fetches record-level data from the Insolvency Service (Company Insolvency
Statistics) and writes digital-agency/web/src/data/uk-agency-insolvency-index.json.

KEY ADVANTAGE over the coarse section-level fallback other niches settle
for: the record-level file carries sic07_5_digit, so the agency SIC cluster
(73110, 73120, 70210, 74100, 73200, 62012, 62020, the same 7 codes used in
the UK Agency Formation Index) is isolable EXACTLY, not just to
division/section level. This is finer than the spec's minimum bar of
"division 731 isolable to 3-digit": the record-level file supports the full
5-digit match.

Source:
  Company Insolvency Statistics, The Insolvency Service (gov.uk)
  Licence: Open Government Licence v3.0
  Record-level data covers England, Wales and Scotland from January 2016.

Also tracks two broader SIC Section totals for backdrop context (NOT part of
the agency-specific figures): Section J (Information and Communication,
divisions 58-63, covers our 62012/62020 codes) and Section M (Professional,
scientific and technical activities, divisions 69-75, covers our
73110/73120/70210/74100/73200 codes).

Usage:
  python digital-agency/pipeline/build_agency_insolvency_index.py

The script is intentionally self-contained: no Supabase, no git commit.
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
# Config -- update these when a newer release is published
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

# The exact agency SIC cluster (matches the UK Agency Formation Index and
# the SIC cluster in docs/_engines/scout_batch2/digital-agency.md).
AGENCY_SIC_LABELS: dict[str, str] = {
    "73110": "Advertising agencies",
    "73120": "Media representation",
    "70210": "Public relations and communications activities",
    "74100": "Specialised design activities",
    "73200": "Market research and public opinion polling",
    "62012": "Business and domestic software development",
    "62020": "Information technology consultancy activities",
}

# Section-level context only (NOT agency-specific -- see caveats in meta.notes).
SECTION_LABELS = {
    "J": "Information and Communication (divisions 58-63, all companies)",
    "M": "Professional, Scientific and Technical Activities (divisions 69-75, all companies)",
}

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
    Path(__file__).resolve().parent.parent
    / "web" / "src" / "data" / "uk-agency-insolvency-index.json"
)


def fetch_zip(url: str) -> zipfile.ZipFile:
    r = requests.get(url, timeout=120)
    r.raise_for_status()
    return zipfile.ZipFile(io.BytesIO(r.content))


def parse_record_level(zf: zipfile.ZipFile) -> tuple[
    dict[str, dict[str, int]],  # by_month_sic[month][sic5] = count
    dict[str, dict[str, str]],  # (unused placeholder, kept for symmetry)
    dict[str, int],             # by_month_captured_total[month] = count (all SIC, all sections)
    dict[str, dict[str, int]],  # by_month_section[month][section] = count
    dict[str, dict[str, int]],  # by_month_proc[month][proc] = count, agency cluster only
]:
    by_month_sic: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))
    by_month_captured_total: dict[str, int] = defaultdict(int)
    by_month_section: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))
    by_month_proc: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))

    with zf.open("record-level-data.csv") as f:
        reader = csv.DictReader(io.TextIOWrapper(f, encoding="latin-1"))
        for row in reader:
            month = row["month_registered"]
            by_month_captured_total[month] += 1

            section = row.get("sic07_1_digit", "").strip()
            if section in SECTION_LABELS:
                by_month_section[month][section] += 1

            sic5 = row.get("sic07_5_digit", "").strip()
            if sic5 in AGENCY_SIC_LABELS:
                by_month_sic[month][sic5] += 1
                proc = PROCEDURE_MAP.get(row["case_type"], "other")
                by_month_proc[month][proc] += 1

    return dict(by_month_sic), {}, dict(by_month_captured_total), dict(by_month_section), dict(by_month_proc)


def build_agency_series(
    by_month_sic: dict[str, dict[str, int]],
    by_month_captured_total: dict[str, int],
    by_month_section: dict[str, dict[str, int]],
    by_month_proc: dict[str, dict[str, int]],
) -> tuple[list[dict], list[dict]]:
    """Monthly/annual agency-cluster insolvency counts: per SIC, union, section context."""
    all_months = sorted(by_month_captured_total)
    sic_codes = list(AGENCY_SIC_LABELS.keys())
    sections = list(SECTION_LABELS.keys())
    procs = list(PROCEDURE_MAP.values())

    monthly = []
    for month in all_months:
        row: dict = {"month": month, "captured_total": by_month_captured_total.get(month, 0)}
        union = 0
        for sic in sic_codes:
            v = by_month_sic.get(month, {}).get(sic, 0)
            row[sic] = v
            union += v
        row["union"] = union
        for s in sections:
            row[f"section_{s}"] = by_month_section.get(month, {}).get(s, 0)
        for p in procs:
            row[p] = by_month_proc.get(month, {}).get(p, 0)
        monthly.append(row)

    annual_acc: dict[int, dict] = {}
    month_count: dict[int, int] = {}
    for row in monthly:
        yr = int(row["month"][:4])
        month_count[yr] = month_count.get(yr, 0) + 1
        acc = annual_acc.setdefault(yr, {"year": yr, "union": 0, "captured_total": 0})
        acc["union"] += row["union"]
        acc["captured_total"] += row["captured_total"]
        for sic in sic_codes:
            acc[sic] = acc.get(sic, 0) + row[sic]
        for s in sections:
            k = f"section_{s}"
            acc[k] = acc.get(k, 0) + row[k]
        for p in procs:
            acc[p] = acc.get(p, 0) + row[p]
    annual = [annual_acc[yr] for yr in sorted(annual_acc)]

    return monthly, annual


def build_headline(monthly: list[dict], annual: list[dict]) -> dict:
    last_month = monthly[-1]
    last_ym = last_month["month"]
    ly = str(int(last_ym[:4]) - 1) + last_ym[4:]
    prev_month = next((m for m in monthly if m["month"] == ly), None)
    yoy = None
    if prev_month and prev_month["union"] > 0:
        yoy = round((last_month["union"] - prev_month["union"]) / prev_month["union"] * 100, 1)

    ttm_rows = monthly[-12:]
    ttm_union = sum(r["union"] for r in ttm_rows)
    ttm_captured_total = sum(r["captured_total"] for r in ttm_rows)
    ttm_share_pct = round(ttm_union / ttm_captured_total * 100, 2) if ttm_captured_total else None

    peak = max(monthly, key=lambda r: r["union"])

    full_annual = [r for r in annual if r["year"] < 2026]
    decade_from = full_annual[0] if full_annual else annual[0]
    decade_to = full_annual[-1] if full_annual else annual[-1]
    decade_change = None
    if decade_from["union"] > 0:
        decade_change = round((decade_to["union"] - decade_from["union"]) / decade_from["union"] * 100, 1)

    ttm_by_sic = {sic: sum(r.get(sic, 0) for r in ttm_rows) for sic in AGENCY_SIC_LABELS}
    ttm_by_section = {s: sum(r.get(f"section_{s}", 0) for r in ttm_rows) for s in SECTION_LABELS}

    return {
        "last_settled_month": last_month["month"],
        "last_month_union": last_month["union"],
        "last_month_cvl": last_month.get("cvl", 0),
        "last_month_compulsory": last_month.get("compulsory", 0),
        "last_month_administration": last_month.get("administration", 0),
        "yoy_pct": yoy,
        "ttm_union": ttm_union,
        "ttm_captured_total": ttm_captured_total,
        "ttm_share_of_captured_pct": ttm_share_pct,
        "ttm_by_sic": ttm_by_sic,
        "ttm_by_section": ttm_by_section,
        "peak_month": peak["month"],
        "peak_union": peak["union"],
        "decade": {
            "from_year": decade_from["year"],
            "to_year": decade_to["year"],
            "from_total": decade_from["union"],
            "to_total": decade_to["union"],
            "change_pct": decade_change,
        },
    }


def main() -> None:
    print("Fetching record-level ZIP from Insolvency Service...")
    zf = fetch_zip(RECORD_LEVEL_ZIP_URL)

    print("Parsing agency SIC cluster (5-digit exact match) + Section J/M context...")
    by_month_sic, _unused, by_month_captured_total, by_month_section, by_month_proc = parse_record_level(zf)

    print(f"  Months found: {len(by_month_captured_total)}")

    monthly, annual = build_agency_series(by_month_sic, by_month_captured_total, by_month_section, by_month_proc)
    headline = build_headline(monthly, annual)

    snapshot = {
        "meta": {
            "generated_at": date.today().isoformat(),
            "data_through": monthly[-1]["month"],
            "coverage": COVERAGE_PERIOD,
            "agency_sic_labels": AGENCY_SIC_LABELS,
            "section_labels": SECTION_LABELS,
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
                        "Data sourced from The Insolvency Service under the "
                        "Open Government Licence v3.0. Free to cite with "
                        "attribution to Agency Founder Finance."
                    ),
                }
            ],
            "notes": (
                "Counts cover England, Wales and Scotland. The agency figures (the 'union' "
                "series and per-SIC breakdown) are an EXACT match to 7 SIC codes: 73110 "
                "(advertising agencies), 73120 (media representation), 70210 (PR and "
                "communications), 74100 (specialised design), 73200 (market research), "
                "62012 (business/domestic software development) and 62020 (IT consultancy), "
                "the same cluster used throughout this site's agency research. The "
                "record-level file carries a 5-digit SIC field, so this is not a "
                "division- or section-level approximation. Section J (Information and "
                "Communication) and Section M (Professional, Scientific and Technical "
                "Activities) totals are included as broader BACKDROP CONTEXT ONLY: they "
                "cover every company in those sections (including many with nothing to do "
                "with agencies, such as telecoms firms in Section J or veterinary practices "
                "in Section M) and are not agency-specific figures. "
                "'Industry captured' coverage caveat: the Insolvency Service record-level "
                "file tags every registered insolvency with a SIC code, but a small share of "
                "records have no usable SIC classification and fall outside every section "
                "total; ttm_share_of_captured_pct in the headline expresses the agency "
                "cluster's insolvencies as a share of ALL captured (SIC-classified) company "
                "insolvencies in the same 12-month window, not a share of the whole UK "
                "economy. Counts are gross registered events, not unique companies: a "
                "company that enters administration and later converts to CVL is counted "
                "once for each procedure, consistent with how the Insolvency Service reports "
                "its own headline figures. Counts are not rates: an increase may partly "
                "reflect growth in the total number of active agencies rather than a "
                "worsening of sector conditions."
            ),
            "attribution": (
                "UK Agency Insolvency Index compiled from Insolvency Service public records "
                "(Open Government Licence v3.0). Free to cite with attribution to Agency "
                "Founder Finance."
            ),
        },
        "headline": headline,
        "insolvencies": {
            "monthly": monthly,
            "annual": annual,
        },
    }

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(snapshot, indent=2), encoding="utf-8")
    print(f"Written: {OUT_PATH}")

    # Self-check
    assert len(monthly) > 0, "Monthly series is empty"
    assert all(r["union"] >= 0 for r in monthly), "Negative union totals in monthly series"
    assert all(r["union"] <= r["captured_total"] for r in monthly), "union exceeds captured_total in a month"
    for r in monthly:
        sic_sum = sum(r.get(sic, 0) for sic in AGENCY_SIC_LABELS)
        assert r["union"] == sic_sum, f"union mismatch at {r['month']}: {r['union']} != {sic_sum}"
    assert headline["ttm_share_of_captured_pct"] is not None, "ttm_share_of_captured_pct missing"
    assert 0 < headline["ttm_share_of_captured_pct"] < 100, "ttm_share_of_captured_pct out of plausible range"
    print("Self-check passed.")
    print(f"Latest month: {headline['last_settled_month']} -- agency union {headline['last_month_union']}")
    print(f"TTM union: {headline['ttm_union']} ({headline['ttm_share_of_captured_pct']}% of captured)")
    print(f"Peak: {headline['peak_month']} ({headline['peak_union']})")
    print(f"TTM by SIC: {headline['ttm_by_sic']}")


if __name__ == "__main__":
    main()
