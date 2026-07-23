"""UK Sector Insolvency League (generalist) -- data ingestion.

The all-sector league table no single-SIC niche site can build: every SIC
1-digit section ranked by trailing-12-month company insolvencies, plus the
annual time series back to 2016 for each.

Source:
  Company Insolvency Statistics, Industry Tables (Table A1a: company
  insolvencies by 1-digit SIC section), The Insolvency Service (gov.uk).
  Licence: Open Government Licence v3.0. Coverage: England and Wales
  (Scotland and Northern Ireland published separately).

Usage:
  python -m optimisation_engine.ingestion.ingest_generalist_sector_insolvency_league

Self-contained: no Supabase, no git commit.
"""
from __future__ import annotations

import io
import json
import re
from datetime import date
from pathlib import Path

import openpyxl
import requests

UA = {"User-Agent": "Mozilla/5.0"}
LICENCE = "Open Government Licence v3.0"
PUBLISHER = "The Insolvency Service"
RELEASE_PAGE = "https://www.gov.uk/government/statistics/company-insolvencies-june-2026"
XLSX_URL = (
    "https://assets.publishing.service.gov.uk/media/6a58e5a15ca06bf11ccb4335/"
    "Industry_Tables_in_Excel__xlsx__Format_-_Company_Insolvency_Statistics_June_2026.xlsx"
)
ATTRIBUTION = (
    "UK Sector Insolvency League compiled from The Insolvency Service Company "
    "Insolvency Statistics, Industry Tables (Open Government Licence v3.0). "
    "Free to cite with attribution to Holloway Davies."
)

SECTION_LABELS = {
    "A": "Agriculture, forestry and fishing",
    "B": "Mining and quarrying",
    "C": "Manufacturing",
    "D": "Electricity, gas, steam and air conditioning supply",
    "E": "Water supply, sewerage, waste management and remediation",
    "F": "Construction",
    "G": "Wholesale and retail trade; repair of motor vehicles",
    "H": "Transportation and storage",
    "I": "Accommodation and food service activities",
    "J": "Information and communication",
    "K": "Financial and insurance activities",
    "L": "Real estate activities",
    "M": "Professional, scientific and technical activities",
    "N": "Administrative and support service activities",
    "O": "Public administration and defence; compulsory social security",
    "P": "Education",
    "Q": "Human health and social work activities",
    "R": "Arts, entertainment and recreation",
    "S": "Other service activities",
    "T": "Activities of households as employers",
    "U": "Activities of extraterritorial organisations and bodies",
}

OUT_PATH = (
    Path(__file__).resolve().parents[2]
    / "generalist" / "web" / "src" / "data" / "uk-sector-insolvency-league.json"
)

MONTH_MAP = {
    "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06",
    "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12",
}


def fetch_workbook(url: str) -> openpyxl.Workbook:
    r = requests.get(url, timeout=90, headers=UA)
    r.raise_for_status()
    return openpyxl.load_workbook(io.BytesIO(r.content), data_only=True, read_only=True)


def main() -> None:
    print("Fetching Insolvency Service Industry Tables (Table A1a)...")
    wb = fetch_workbook(XLSX_URL)
    ws = wb["Table_A1a"]
    rows = list(ws.iter_rows(values_only=True))
    header = next(r for r in rows if r[0] == "Section")

    year_cols = [(i, int(h)) for i, h in enumerate(header) if isinstance(h, str) and h.strip().isdigit()]
    month_cols = [
        (i, h) for i, h in enumerate(header)
        if isinstance(h, str) and re.match(r"^[A-Z][a-z]{2} \d{4}$", h)
    ]

    def to_ym(label: str) -> str:
        mon, yr = label.split(" ")
        return f"{yr}-{MONTH_MAP[mon]}"

    section_rows = {r[0]: r for r in rows if r[0] in SECTION_LABELS or r[0] in ("Total", "V")}
    total_row = section_rows["Total"]

    last_month_label = month_cols[-1][1]
    ttm_month_cols = month_cols[-12:]

    sections = []
    for code, label in SECTION_LABELS.items():
        r = section_rows.get(code)
        if r is None:
            continue
        annual = [{"year": y, "total": int(r[i]) if r[i] is not None else 0} for i, y in year_cols]
        ttm_total = sum(int(r[i]) for i, _ in ttm_month_cols if r[i] is not None)
        full_annual = [a for a in annual if a["year"] < int(last_month_label.split(" ")[1])]
        decade_from = full_annual[0] if full_annual else annual[0]
        decade_to = full_annual[-1] if full_annual else annual[-1]
        decade_change_pct = (
            round((decade_to["total"] - decade_from["total"]) / decade_from["total"] * 100, 1)
            if decade_from["total"] else None
        )
        sections.append({
            "code": code,
            "label": label,
            "annual": annual,
            "ttm_total": ttm_total,
            "decade_from_year": decade_from["year"],
            "decade_to_year": decade_to["year"],
            "decade_change_pct": decade_change_pct,
        })

    # Unclassified/"ALL OTHERS" residual -- shown separately, not ranked
    unclassified_row = section_rows.get("V")
    unclassified_ttm = (
        sum(int(unclassified_row[i]) for i, _ in ttm_month_cols if unclassified_row[i] is not None)
        if unclassified_row is not None else 0
    )

    ttm_grand_total = sum(int(total_row[i]) for i, _ in ttm_month_cols if total_row[i] is not None)
    for s in sections:
        s["ttm_share_pct"] = round(s["ttm_total"] / ttm_grand_total * 100, 1) if ttm_grand_total else None

    sections_ranked = sorted(sections, key=lambda s: -s["ttm_total"])

    top = sections_ranked[0]
    headline = {
        "data_through": to_ym(last_month_label),
        "ttm_total_all_sectors": ttm_grand_total,
        "ttm_unclassified": unclassified_ttm,
        "top_sector_code": top["code"],
        "top_sector_label": top["label"],
        "top_sector_ttm": top["ttm_total"],
        "top_sector_share_pct": top["ttm_share_pct"],
        "n_sections_ranked": len(sections_ranked),
        "coverage": "England and Wales",
    }

    snapshot = {
        "meta": {
            "generated_at": date.today().isoformat(),
            "data_through": to_ym(last_month_label),
            "coverage": "England and Wales",
            "sources": [{
                "name": "Company Insolvency Statistics -- Industry Tables (Table A1a)",
                "publisher": PUBLISHER,
                "url": XLSX_URL,
                "release_page": RELEASE_PAGE,
                "licence": LICENCE,
                "retrieved": date.today().isoformat(),
            }],
            "notes": (
                "Trailing-12-month (TTM) totals are the sum of the most recent 12 monthly "
                "figures for each SIC 2007 one-digit section. Coverage is England and Wales; "
                "Scotland and Northern Ireland insolvencies are published separately by the "
                "Insolvency Service and are not included. A residual 'unclassified' category "
                "(companies without a captured SIC code at time of filing) exists in the source "
                "data and is shown separately, not ranked among the 21 SIC sections. Section "
                "totals are gross registered insolvency events, not rates against the number of "
                "active companies in each sector, so a high count partly reflects sector size."
            ),
            "attribution": ATTRIBUTION,
        },
        "headline": headline,
        "sections": sections_ranked,
    }

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(snapshot, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\n[snapshot] wrote {OUT_PATH}")

    # Self-check
    assert len(sections_ranked) == 21, f"expected 21 SIC sections, got {len(sections_ranked)}"
    assert sections_ranked[0]["ttm_total"] >= sections_ranked[-1]["ttm_total"], "not sorted descending"
    ttm_sum_sections = sum(s["ttm_total"] for s in sections_ranked) + unclassified_ttm
    assert abs(ttm_sum_sections - ttm_grand_total) <= 2, (
        f"section TTM totals ({ttm_sum_sections}) don't reconcile with grand total ({ttm_grand_total})"
    )
    print("[self-check] PASS")
    print(f"Data through {headline['data_through']}. TTM all-sector total: {ttm_grand_total:,}")
    print(f"Top sector: {top['label']} -- {top['ttm_total']:,} ({top['ttm_share_pct']}%)")


if __name__ == "__main__":
    main()
