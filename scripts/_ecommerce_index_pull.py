"""
UK Online Seller Business Index -- Companies House + ONS data pull.

Usage:
    python scripts/_ecommerce_index_pull.py

Writes:
    ecommerce/web/src/data/online-seller-index.json

Requires:
    COMPANIES_HOUSE_API_KEY in environment or .env at repo root.

Sources:
    Companies House Advanced Search API -- OGL v3.0
    https://developer.company-information.service.gov.uk/api/docs/
    ONS Retail Sales Index J4MC/DRSI -- OGL v3.0
    https://www.ons.gov.uk/businessindustryandtrade/retailindustry/timeseries/j4mc/drsi

SIC codes:
    PRIMARY:   47910  Retail sale via mail order houses or via internet
    SECONDARY: 47990  Other retail not in stores
    SECONDARY: 46900  Non-specialised wholesale (common FBA-wholesaler code)

Rate-limit: CH Advanced Search allows ~600 req/10 min. Script issues
~80 requests; 400 ms sleep between requests keeps well clear.
"""

import base64
import csv
import io
import json
import os
import sys
import time
from datetime import date
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

REPO_ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PATH = REPO_ROOT / "ecommerce" / "web" / "src" / "data" / "online-seller-index.json"
CACHE_PATH = REPO_ROOT / "ecommerce" / "pipeline" / "_cache_ch_ecommerce.json"

PULL_DATE = date.today().isoformat()

QUARTERS = [
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

ONS_CSV_URL = (
    "https://www.ons.gov.uk/generator"
    "?format=csv&uri=/businessindustryandtrade/retailindustry/timeseries/j4mc/drsi"
)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _get_api_key() -> str:
    key = os.environ.get("COMPANIES_HOUSE_API_KEY", "")
    if not key:
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
    """Return the hits count from a CH Advanced Search query. Rate-limited."""
    creds = base64.b64encode(f"{api_key}:".encode()).decode()
    url = (
        f"https://api.company-information.service.gov.uk"
        f"/advanced-search/companies?{params}&size=1"
    )
    req = Request(url, headers={"Authorization": f"Basic {creds}"})
    try:
        with urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read())
            return int(data.get("hits", 0))
    except HTTPError as e:
        if e.code == 429:
            print("  Rate limited -- sleeping 10 s")
            time.sleep(10)
            return _ch_get(params, api_key)
        raise
    finally:
        time.sleep(0.4)  # ponytail: 400 ms keeps well under 600/10-min limit


def _fetch_ons_j4mc() -> list[dict]:
    """Fetch ONS J4MC series via the generator CSV endpoint. Returns annual rows only."""
    req = Request(ONS_CSV_URL, headers={"User-Agent": "Mozilla/5.0"})
    with urlopen(req, timeout=30) as resp:
        raw = resp.read().decode("utf-8-sig")

    reader = csv.reader(io.StringIO(raw))
    rows = []
    in_data = False
    for row in reader:
        if not row:
            continue
        # ONS CSVs have a metadata header block; data rows start where the first
        # cell is a 4-digit year (annual) or a year+month (monthly).
        cell = row[0].strip().strip('"')
        if len(cell) == 4 and cell.isdigit():
            in_data = True
        if not in_data:
            continue
        if len(cell) == 4 and cell.isdigit() and len(row) >= 2:
            val = row[1].strip().strip('"')
            try:
                rows.append({"year": cell, "pct": float(val)})
            except ValueError:
                pass  # suppress non-numeric (e.g. blank provisional rows)
    return rows


# ---------------------------------------------------------------------------
# Main pull
# ---------------------------------------------------------------------------

def pull(api_key: str) -> dict:
    # --- SIC 47910 (primary) ---
    print("SIC 47910 active + dissolved totals...")
    active_47910 = _ch_get("sic_codes=47910&company_status=active", api_key)
    dissolved_47910 = _ch_get("sic_codes=47910&company_status=dissolved", api_key)
    print(f"  47910 active={active_47910:,}  dissolved={dissolved_47910:,}")

    # --- SIC 47990 (secondary) ---
    print("SIC 47990 active + dissolved totals...")
    active_47990 = _ch_get("sic_codes=47990&company_status=active", api_key)
    dissolved_47990 = _ch_get("sic_codes=47990&company_status=dissolved", api_key)
    print(f"  47990 active={active_47990:,}  dissolved={dissolved_47990:,}")

    # --- SIC 46900 (secondary) ---
    print("SIC 46900 active + dissolved totals...")
    active_46900 = _ch_get("sic_codes=46900&company_status=active", api_key)
    dissolved_46900 = _ch_get("sic_codes=46900&company_status=dissolved", api_key)
    print(f"  46900 active={active_46900:,}  dissolved={dissolved_46900:,}")

    # --- Quarterly births + deaths for SIC 47910 (primary series) ---
    print("\nQuarterly incorporations + dissolutions for SIC 47910 (2021-Q1 to 2026-Q2)...")
    quarters_47910 = []
    for label, from_d, to_d in QUARTERS:
        inc = _ch_get(
            f"sic_codes=47910&incorporated_from={from_d}&incorporated_to={to_d}",
            api_key,
        )
        dis = _ch_get(
            f"sic_codes=47910&dissolved_from={from_d}&dissolved_to={to_d}",
            api_key,
        )
        quarters_47910.append({
            "quarter": label,
            "incorporations": inc,
            "dissolutions": dis,
            "net": inc - dis,
        })
        print(f"  {label}: inc={inc:,}  dis={dis:,}  net={inc - dis:+,}")

    # --- ONS J4MC demand overlay ---
    print("\nFetching ONS J4MC annual series...")
    try:
        ons_annual = _fetch_ons_j4mc()
        print(f"  ONS J4MC: {len(ons_annual)} annual data points fetched")
        print(f"  Latest: {ons_annual[-1]}")
    except Exception as e:
        print(f"  WARNING: ONS J4MC fetch failed: {e}")
        ons_annual = None

    return {
        "active_47910": active_47910,
        "dissolved_47910": dissolved_47910,
        "active_47990": active_47990,
        "dissolved_47990": dissolved_47990,
        "active_46900": active_46900,
        "dissolved_46900": dissolved_46900,
        "quarters_47910": quarters_47910,
        "ons_j4mc_annual": ons_annual,
    }


# ---------------------------------------------------------------------------
# Build output JSON
# ---------------------------------------------------------------------------

def build_json(raw: dict) -> dict:
    active = raw["active_47910"]
    dissolved = raw["dissolved_47910"]
    total_ever = active + dissolved
    snapshot_pct = round(active / total_ever * 100, 1) if total_ever else None

    # Cohort survival proxy: companies incorporated 2021 (lockdown boom) that are
    # still active. Active count by incorporation period is not directly available
    # from the API hits endpoint, so we derive a proxy: incorporations in 2021
    # (sum of Q1+Q2+Q3+Q4 incorporation counts) vs. what has dissolved since.
    # This is documented as a proxy, not a true cohort survival rate.
    cohort_2021_inc = sum(
        q["incorporations"]
        for q in raw["quarters_47910"]
        if q["quarter"].startswith("2021-")
    )
    cohort_2021_dis_by_2026q2 = sum(
        q["dissolutions"]
        for q in raw["quarters_47910"]
        if q["quarter"] >= "2022-Q1"  # dissolutions after the 2021 cohort formed
    )
    # NOTE: dis_by_2026q2 covers all SIC-47910 dissolutions from 2022 onward, not
    # only the 2021 cohort. A true cohort survival curve requires the bulk snapshot
    # cross-referenced by incorporation date -- this cannot be derived from the
    # Advanced Search API alone. This field is intentionally omitted; the page
    # notes that true cohort data requires the bulk snapshot.

    return {
        "meta": {
            "title": "UK Online Seller Business Index",
            "pullDate": PULL_DATE,
            "lastUpdated": PULL_DATE,
            "nextRefresh": "Q4 2026 (quarterly cadence)",
            "licence": "Open Government Licence v3.0. Derived from Companies House public register and ONS Retail Sales Index. Reuse with attribution.",
            "citeAs": (
                f"UK Online Seller Business Index, derived from Companies House "
                f"Advanced Search API (SIC 47910) and ONS J4MC/DRSI series. "
                f"Published under OGL v3.0. Data pulled {PULL_DATE}."
            ),
            "methodology": (
                "Active and dissolved company counts: live hit counts from the CH Advanced "
                "Search API filtered by sic_codes and company_status (active / dissolved). "
                "Quarterly incorporations: CH incorporated_from / incorporated_to date "
                "filters with no company_status restriction (counts all companies ever "
                "incorporated in that quarter). Quarterly dissolutions: CH "
                "dissolved_from / dissolved_to date filters. "
                "SIC codes are self-reported at incorporation and may be updated later; "
                "some miscoding is expected. "
                "ONS demand overlay: series J4MC (internet retail as proportion of all "
                "retail sales, seasonally adjusted) from the ONS Retail Sales Index, "
                "fetched via the ONS generator CSV endpoint."
            ),
            "caveats": [
                "Active count is a Companies House register snapshot, NOT a survival rate. "
                "It is currently-active-on-register as at the pull date and mixes companies "
                "of all ages.",
                "SIC 47910 captures some legacy catalogue and mail-order companies that "
                "pre-date internet retail. Flows (quarterly births and deaths) are more "
                "reliable than absolute counts.",
                "Marketplace-only sole traders (the Vinted/eBay side-hustle layer) never "
                "appear in Companies House. This index measures the incorporated layer only.",
                "Formal dissolution typically lags actual trading closure by weeks to months "
                "for voluntary strikes-off.",
                "The secondary SIC series (47990, 46900) are tracked and reported separately "
                "and are never blended silently into the SIC 47910 headline.",
                "2020-Q2 dissolutions are not shown as a series start point because "
                "Companies House suspended compulsory strike-off under the Corporate "
                "Insolvency and Governance Act 2020 (April to September 2020), making "
                "that period anomalously low.",
            ],
            "sources": {
                "companies_house": {
                    "name": "Companies House Advanced Search API",
                    "url": "https://developer.company-information.service.gov.uk/api/docs/",
                    "licence": "Open Government Licence v3.0",
                    "publisher": "Companies House",
                    "pullDate": PULL_DATE,
                },
                "ons_j4mc": {
                    "name": "ONS Retail Sales Index, series J4MC (internet retail proportion)",
                    "url": "https://www.ons.gov.uk/businessindustryandtrade/retailindustry/timeseries/j4mc/drsi",
                    "licence": "Open Government Licence v3.0",
                    "publisher": "Office for National Statistics",
                    "pullDate": PULL_DATE,
                },
            },
        },
        "sic47910": {
            "label": "SIC 47910 -- Retail sale via mail order houses or via internet",
            "note": "Primary series. Headline figures for the UK Online Seller Business Index.",
            "activeCompanies": {
                "count": active,
                "label": f"{active:,}",
                "asOf": PULL_DATE,
                "caveat": "Currently-active-on-register snapshot. NOT a survival rate.",
            },
            "dissolvedCompanies": {
                "count": dissolved,
                "label": f"{dissolved:,}",
                "asOf": PULL_DATE,
                "caveat": "All-time cumulative dissolved count, not a rate.",
            },
            "totalEverRegistered": {
                "count": total_ever,
                "label": f"{total_ever:,}",
                "note": (
                    "Active + dissolved. Excludes companies in administration or "
                    "voluntary strike-off not yet formally dissolved."
                ),
            },
            "snapshotActiveRate": {
                "pct": snapshot_pct,
                "label": f"{snapshot_pct}%" if snapshot_pct is not None else "N/A",
                "caveat": (
                    "Snapshot active rate: active / (active + dissolved) as at pull date. "
                    "This is NOT a cohort survival rate. It mixes companies of all ages "
                    "and is inflated by recently formed companies that have not yet had "
                    "time to fail or dissolve."
                ),
            },
        },
        "secondarySics": [
            {
                "sicCode": "47990",
                "label": "Other retail not in stores",
                "active": raw["active_47990"],
                "dissolved": raw["dissolved_47990"],
                "activeLabel": f"{raw['active_47990']:,}",
                "dissolvedLabel": f"{raw['dissolved_47990']:,}",
                "note": "Labelled secondary series. Not blended into SIC 47910 headline.",
            },
            {
                "sicCode": "46900",
                "label": "Non-specialised wholesale (common FBA-wholesaler filing code)",
                "active": raw["active_46900"],
                "dissolved": raw["dissolved_46900"],
                "activeLabel": f"{raw['active_46900']:,}",
                "dissolvedLabel": f"{raw['dissolved_46900']:,}",
                "note": "Labelled secondary series. Not blended into SIC 47910 headline.",
            },
        ],
        "quarterlyChurn47910": {
            "description": (
                "Quarterly incorporations and dissolutions for SIC 47910, "
                "2021-Q1 to 2026-Q2. Source: CH Advanced Search "
                "incorporated_from/to and dissolved_from/to filters. UK-wide."
            ),
            "quarters": raw["quarters_47910"],
            "caveat": (
                "Incorporations count all companies ever incorporated in that quarter "
                "regardless of current status. Dissolutions count companies whose "
                "dissolution date falls within that quarter."
            ),
        },
        "cohortNote": {
            "lockdownCohort2021Incorporations": cohort_2021_inc,
            "lockdownCohort2021IncorporationsLabel": f"{cohort_2021_inc:,}",
            "note": (
                "Companies incorporating under SIC 47910 across all four quarters of 2021 "
                "(the lockdown e-commerce boom year). True cohort survival rates require "
                "cross-referencing incorporation date against dissolution date at the "
                "company level, which requires the Companies House bulk snapshot, not the "
                "Advanced Search API. The quarterly dissolution counts above show aggregate "
                "SIC 47910 deaths by quarter but cannot be attributed to specific cohorts "
                "via the API. Cohort survival curves are planned for a future update using "
                "the bulk snapshot."
            ),
        },
        "onsJ4mc": (
            {
                "description": (
                    "Internet retail as a proportion of all retail sales (%), seasonally "
                    "adjusted. ONS series J4MC, dataset DRSI (Retail Sales Index). "
                    "Annual figures. Used as a demand-side external anchor against "
                    "SIC 47910 company-birth rates."
                ),
                "sourceUrl": "https://www.ons.gov.uk/businessindustryandtrade/retailindustry/timeseries/j4mc/drsi",
                "unit": "%",
                "annual": raw["ons_j4mc_annual"],
            }
            if raw.get("ons_j4mc_annual")
            else {
                "description": "ONS J4MC series -- fetch failed at pull time. See source URL.",
                "sourceUrl": "https://www.ons.gov.uk/businessindustryandtrade/retailindustry/timeseries/j4mc/drsi",
                "annual": None,
                "fetchError": True,
            }
        ),
    }


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    api_key = _get_api_key()
    raw = pull(api_key)

    CACHE_PATH.parent.mkdir(parents=True, exist_ok=True)
    CACHE_PATH.write_text(json.dumps(raw, indent=2), encoding="utf-8")
    print(f"\nRaw cache written: {CACHE_PATH}")

    output = build_json(raw)
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(output, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"JSON dataset written: {OUTPUT_PATH}")

    s = output["sic47910"]
    print(f"\nHeadline figures (as at {PULL_DATE}):")
    print(f"  SIC 47910 active:         {s['activeCompanies']['label']}")
    print(f"  SIC 47910 dissolved:      {s['dissolvedCompanies']['label']}")
    print(f"  Total ever registered:    {s['totalEverRegistered']['label']}")
    print(f"  Snapshot active rate:     {s['snapshotActiveRate']['label']}")
    cohort = output["cohortNote"]
    print(f"  2021 cohort incorporations: {cohort['lockdownCohort2021IncorporationsLabel']}")
    if output["onsJ4mc"].get("annual"):
        latest_ons = output["onsJ4mc"]["annual"][-1]
        print(f"  ONS J4MC latest annual:   {latest_ons['year']} = {latest_ons['pct']}%")
