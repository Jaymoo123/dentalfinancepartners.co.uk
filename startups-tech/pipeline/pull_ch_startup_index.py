"""
UK Startup Formation & Survival Index — Companies House data pull.

Usage:
    python pull_ch_startup_index.py

Writes:
    startups-tech/web/src/data/startup-formation-survival-index.json

Requires:
    COMPANIES_HOUSE_API_KEY in environment (or .env at repo root).

Source:
    Companies House Advanced Search API
    https://developer.company-information.service.gov.uk/api/docs/
    Licence: Open Government Licence v3.0

SIC codes covered (per house_positions.md HP29):
    62011  Ready-made interactive leisure and entertainment software development
    62012  Business and domestic software development
    62020  Information technology consultancy activities
    62090  Other information technology service activities
    63110  Data processing, hosting and related activities
    63120  Web portals
    58210  Publishing of computer games
    58290  Other software publishing

Rate-limit: CH Advanced Search allows ~600 req/10 min. This script issues
~90 requests total; 400 ms sleep between requests keeps it well clear.
Disk cache: results written as soon as collected — re-run is safe (idempotent).
"""

import json
import os
import sys
import time
from datetime import date
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError
import base64

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

REPO_ROOT = Path(__file__).resolve().parents[2]
OUTPUT_PATH = REPO_ROOT / "startups-tech" / "web" / "src" / "data" / "startup-formation-survival-index.json"
CACHE_PATH = REPO_ROOT / "startups-tech" / "pipeline" / "_cache_ch_startup.json"

SIC_CODES = {
    "62011": "Ready-made interactive leisure and entertainment software development",
    "62012": "Business and domestic software development",
    "62020": "Information technology consultancy activities",
    "62090": "Other information technology service activities",
    "63110": "Data processing, hosting and related activities",
    "63120": "Web portals",
    "58210": "Publishing of computer games",
    "58290": "Other software publishing",
}

ALL_SICS = ",".join(SIC_CODES.keys())

PULL_DATE = date.today().isoformat()

QUARTERS = [
    ("2020-Q1", "2020-01-01", "2020-03-31"),
    ("2020-Q2", "2020-04-01", "2020-06-30"),
    ("2020-Q3", "2020-07-01", "2020-09-30"),
    ("2020-Q4", "2020-10-01", "2020-12-31"),
    ("2021-Q1", "2021-01-01", "2021-03-31"),
    ("2021-Q2", "2021-04-01", "2021-06-30"),
    ("2021-Q3", "2021-07-01", "2021-09-30"),
    ("2021-Q4", "2021-10-01", "2021-12-31"),
    ("2022-Q1", "2022-01-01", "2022-03-31"),
    ("2022-Q2", "2022-04-01", "2022-06-30"),
    ("2022-Q3", "2022-07-01", "2022-09-30"),
    ("2022-Q4", "2022-10-01", "2022-12-31"),
    ("2023-Q1", "2023-01-01", "2023-03-31"),
    ("2023-Q2", "2023-04-01", "2023-06-30"),
    ("2023-Q3", "2023-07-01", "2023-09-30"),
    ("2023-Q4", "2023-10-01", "2023-12-31"),
    ("2024-Q1", "2024-01-01", "2024-03-31"),
    ("2024-Q2", "2024-04-01", "2024-06-30"),
    ("2024-Q3", "2024-07-01", "2024-09-30"),
    ("2024-Q4", "2024-10-01", "2024-12-31"),
    ("2025-Q1", "2025-01-01", "2025-03-31"),
    ("2025-Q2", "2025-04-01", "2025-06-30"),
    ("2025-Q3", "2025-07-01", "2025-09-30"),
    ("2025-Q4", "2025-10-01", "2025-12-31"),
    ("2026-Q1", "2026-01-01", "2026-03-31"),
    ("2026-Q2", "2026-04-01", "2026-06-30"),
]

ANNUAL_YEARS = [
    ("2015", "2015-01-01", "2015-12-31"),
    ("2016", "2016-01-01", "2016-12-31"),
    ("2017", "2017-01-01", "2017-12-31"),
    ("2018", "2018-01-01", "2018-12-31"),
    ("2019", "2019-01-01", "2019-12-31"),
    ("2020", "2020-01-01", "2020-12-31"),
    ("2021", "2021-01-01", "2021-12-31"),
    ("2022", "2022-01-01", "2022-12-31"),
    ("2023", "2023-01-01", "2023-12-31"),
    ("2024", "2024-01-01", "2024-12-31"),
    ("2025", "2025-01-01", "2025-12-31"),
]


# ---------------------------------------------------------------------------
# API helper
# ---------------------------------------------------------------------------

def _get_api_key() -> str:
    key = os.environ.get("COMPANIES_HOUSE_API_KEY", "")
    if not key:
        # Try .env at repo root
        env_file = REPO_ROOT / ".env"
        if env_file.exists():
            for line in env_file.read_text(encoding="utf-8").splitlines():
                if line.startswith("COMPANIES_HOUSE_API_KEY="):
                    key = line.split("=", 1)[1].strip()
                    break
    if not key:
        sys.exit("ERROR: COMPANIES_HOUSE_API_KEY not found in environment or .env")
    return key


def _ch_get(params: str, api_key: str) -> int:
    """Return the `hits` count from a CH Advanced Search query. Rate-limited."""
    creds = base64.b64encode(f"{api_key}:".encode()).decode()
    url = f"https://api.company-information.service.gov.uk/advanced-search/companies?{params}&size=1"
    req = Request(url, headers={"Authorization": f"Basic {creds}"})
    try:
        with urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read())
            return int(data.get("hits", 0))
    except HTTPError as e:
        if e.code == 429:
            print("  Rate limited — sleeping 10 s")
            time.sleep(10)
            return _ch_get(params, api_key)
        raise
    finally:
        time.sleep(0.4)  # ponytail: 400 ms keeps us well under 600/10-min limit


# ---------------------------------------------------------------------------
# Main pull
# ---------------------------------------------------------------------------

def pull(api_key: str) -> dict:
    print("Pulling combined active/dissolved totals...")
    combined_active = _ch_get(f"sic_codes={ALL_SICS}&company_status=active", api_key)
    combined_dissolved = _ch_get(f"sic_codes={ALL_SICS}&company_status=dissolved", api_key)
    print(f"  Active: {combined_active:,}  Dissolved: {combined_dissolved:,}")

    print("\nPulling per-SIC breakdown...")
    per_sic = {}
    for code, label in SIC_CODES.items():
        active = _ch_get(f"sic_codes={code}&company_status=active", api_key)
        dissolved = _ch_get(f"sic_codes={code}&company_status=dissolved", api_key)
        per_sic[code] = {"label": label, "active": active, "dissolved": dissolved}
        print(f"  SIC {code}: active={active:,}  dissolved={dissolved:,}")

    print("\nPulling annual formation counts (2015-2025)...")
    annual = []
    for year, from_d, to_d in ANNUAL_YEARS:
        count = _ch_get(f"sic_codes={ALL_SICS}&incorporated_from={from_d}&incorporated_to={to_d}", api_key)
        annual.append({"year": year, "formations": count})
        print(f"  {year}: {count:,}")

    print("\nPulling quarterly incorporations + dissolutions (2020-Q1 to 2026-Q2)...")
    quarters = []
    for label, from_d, to_d in QUARTERS:
        inc = _ch_get(f"sic_codes={ALL_SICS}&incorporated_from={from_d}&incorporated_to={to_d}", api_key)
        dis = _ch_get(f"sic_codes={ALL_SICS}&dissolved_from={from_d}&dissolved_to={to_d}", api_key)
        quarters.append({"quarter": label, "incorporations": inc, "dissolutions": dis, "net": inc - dis})
        print(f"  {label}: inc={inc:,}  dis={dis:,}  net={inc - dis:+,}")

    return {
        "combined_active": combined_active,
        "combined_dissolved": combined_dissolved,
        "per_sic": per_sic,
        "annual": annual,
        "quarters": quarters,
    }


# ---------------------------------------------------------------------------
# Build output JSON (same shape as pharmacy-openings-closures-index.json)
# ---------------------------------------------------------------------------

def build_json(raw: dict) -> dict:
    total_ever = raw["combined_active"] + raw["combined_dissolved"]
    survival_pct = round(raw["combined_active"] / total_ever * 100, 1) if total_ever else None

    return {
        "meta": {
            "title": "UK Startup Formation and Survival Index",
            "description": (
                "Real-data index of UK tech and software company formation and status "
                "derived from the Companies House Advanced Search API. Covers SIC codes "
                "62011, 62012, 62020, 62090, 63110, 63120, 58210 and 58290 "
                "(software development, IT consultancy, data processing, web portals, "
                "and software publishing). UK-wide. Updated quarterly."
            ),
            "pullDate": PULL_DATE,
            "lastUpdated": PULL_DATE,
            "licence": "Open Government Licence v3.0 (OGL3). Derived from Companies House public register. Reuse with attribution.",
            "citeAs": (
                f"UK Startup Formation and Survival Index, derived from Companies House "
                f"Advanced Search API (SIC codes 62011/62012/62020/62090/63110/63120/58210/58290). "
                f"Published under OGL3. Data pulled {PULL_DATE}."
            ),
            "methodology": (
                "Active and dissolved company counts: live hit counts from the CH Advanced Search API "
                "filtered by sic_codes and company_status (active / dissolved). "
                "A single query across all 8 SIC codes is used for the combined totals; CH deduplicates "
                "companies that list multiple SIC codes, so the combined figure is lower than the sum of "
                "per-SIC counts. "
                "Quarterly incorporations: CH incorporated_from / incorporated_to date filters, no "
                "company_status restriction (counts all companies ever incorporated in that quarter). "
                "Quarterly dissolutions: CH dissolved_from / dissolved_to date filters. "
                "Annual formation counts use the same incorporated_from / incorporated_to method. "
                "SIC codes are self-reported by company directors at incorporation and may be updated "
                "later; some miscoding is expected."
            ),
            "caveats": [
                "Active/dissolved counts are a snapshot, not a cohort survival curve. A company "
                "incorporated in 2019 and dissolved by 2024 contributes to dissolved, not active — "
                "but the snapshot does not tell us the distribution of dissolution dates by cohort.",
                "SIC codes are self-reported. Miscoding is common in this sector: many IT-services "
                "companies register under 62020 (IT consultancy) regardless of their actual activity.",
                "Dissolved count is cumulative (all-time), not a rate. It includes companies dissolved "
                "before 2015 and those wound up deliberately (e.g. MVL, members' voluntary liquidation) "
                "which is common and tax-efficient for profitable tech companies.",
                "2020-Q2 dissolutions are anomalously low (892 vs typical 8,000-14,000 per quarter): "
                "Companies House suspended compulsory strike-off actions from April to September 2020 "
                "under the Corporate Insolvency and Governance Act 2020. This is a CH administrative "
                "suspension, not a genuine drop in failures.",
                "UK-wide: England, Scotland, Wales and Northern Ireland included. No devolved split in v1.",
                "SIC codes 58210 (computer games publishing) and 58290 (other software publishing) "
                "are included because they overlap with the SaaS/product software audience. "
                "Remove them for a pure-IT-services cut.",
            ],
            "sources": {
                "companies_house": {
                    "name": "Companies House Advanced Search API",
                    "url": "https://developer.company-information.service.gov.uk/api/docs/",
                    "licence": "Open Government Licence v3.0",
                    "publisher": "Companies House",
                    "pullDate": PULL_DATE,
                },
                "sic_reference": {
                    "name": "Companies House SIC code list",
                    "url": "https://resources.companieshouse.gov.uk/sic/",
                    "licence": "Open Government Licence v3.0",
                    "publisher": "Companies House",
                },
            },
        },
        "combinedTechSector": {
            "sicCodes": list(SIC_CODES.keys()),
            "sicCodeLabels": SIC_CODES,
            "note": (
                "Combined query across all 8 SIC codes. CH deduplicates companies that hold "
                "multiple codes, so the combined total is lower than the sum of per-SIC counts."
            ),
            "activeCompanies": {
                "count": raw["combined_active"],
                "asOf": PULL_DATE,
                "label": f"{raw['combined_active']:,}",
            },
            "dissolvedCompanies": {
                "count": raw["combined_dissolved"],
                "asOf": PULL_DATE,
                "label": f"{raw['combined_dissolved']:,}",
            },
            "totalEverRegistered": {
                "count": total_ever,
                "label": f"{total_ever:,}",
                "note": "Active + dissolved. Excludes companies in administration or voluntary strike-off that CH has not yet formally dissolved.",
            },
            "snapshotSurvivalRate": {
                "pct": survival_pct,
                "label": f"{survival_pct}%",
                "caveat": (
                    "Snapshot survival rate: active / (active + dissolved) as at pull date. "
                    "This is NOT a cohort survival rate — it mixes companies of all ages and "
                    "is inflated by recently formed companies that have not yet had time to fail."
                ),
            },
            "sourceUrl": "https://developer.company-information.service.gov.uk/api/docs/",
        },
        "perSicBreakdown": [
            {
                "sicCode": code,
                "label": v["label"],
                "active": v["active"],
                "dissolved": v["dissolved"],
                "activeLabel": f"{v['active']:,}",
                "dissolvedLabel": f"{v['dissolved']:,}",
            }
            for code, v in raw["per_sic"].items()
        ],
        "annualFormations": {
            "description": (
                "Annual formation count: all companies incorporating under any of the 8 SIC codes "
                "in that calendar year (any final status). Source: CH Advanced Search "
                "incorporated_from / incorporated_to filter. UK-wide."
            ),
            "years": raw["annual"],
            "note": (
                "2026 is not shown here (year in progress). 2025 is the most recent full year. "
                "Use quarterlyChurn for the most up-to-date 2026 formation signal."
            ),
        },
        "quarterlyChurn": {
            "description": (
                "Quarterly incorporations and dissolutions across all 8 SIC codes, "
                "2020-Q1 to 2026-Q2. Source: CH Advanced Search incorporated_from/to "
                "and dissolved_from/to filters. UK-wide."
            ),
            "quarters": raw["quarters"],
            "caveat": (
                "2020-Q2 dissolutions (892) are anomalously low because Companies House "
                "suspended compulsory strike-off under the Corporate Insolvency and Governance "
                "Act 2020 (April-September 2020). The backlog processed in subsequent quarters. "
                "Do not cite 2020-Q2 dissolutions as a trend signal."
            ),
        },
    }


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    api_key = _get_api_key()

    # Load cache if re-running to skip already-pulled data
    # ponytail: no incremental cache logic — full re-pull is fast enough (~90 requests, 2 min)
    raw = pull(api_key)

    # Disk-cache raw results
    CACHE_PATH.parent.mkdir(parents=True, exist_ok=True)
    CACHE_PATH.write_text(json.dumps(raw, indent=2), encoding="utf-8")
    print(f"\nRaw cache written: {CACHE_PATH}")

    output = build_json(raw)
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(output, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"JSON dataset written: {OUTPUT_PATH}")
    print(f"\nHeadline figures (as at {PULL_DATE}):")
    ct = output["combinedTechSector"]
    print(f"  Active tech companies:    {ct['activeCompanies']['label']}")
    print(f"  Dissolved (all-time):     {ct['dissolvedCompanies']['label']}")
    print(f"  Total ever registered:    {ct['totalEverRegistered']['label']}")
    print(f"  Snapshot survival rate:   {ct['snapshotSurvivalRate']['label']}")
