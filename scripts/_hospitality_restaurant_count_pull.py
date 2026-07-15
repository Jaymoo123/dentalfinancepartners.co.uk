"""
Hospitality restaurant-count pull -- Companies House Advanced Search API.

Usage:
    python scripts/_hospitality_restaurant_count_pull.py

Fetches the live active company count for SIC 56101 + 56102 + 56103
(restaurants, cafes, takeaway food shops) and patches the value into
hospitality/web/src/data/uk-hospitality-openings-closures-index.json
under headline.restaurant_count_proxy.

Requires:
    COMPANIES_HOUSE_API_KEY in environment or .env at repo root.

Sources:
    Companies House Advanced Search API -- OGL v3.0
    https://developer.company-information.service.gov.uk/api/docs/
"""

import base64
import json
import os
import sys
import time
from datetime import date
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen

REPO_ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = (
    REPO_ROOT
    / "hospitality"
    / "web"
    / "src"
    / "data"
    / "uk-hospitality-openings-closures-index.json"
)

SIC_CODES = [56101, 56102, 56103]  # must match restaurants_cafes.sic_codes in JSON


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


def _ch_active_count(sic: int, api_key: str) -> int:
    """Return active company count for a single SIC code."""
    creds = base64.b64encode(f"{api_key}:".encode()).decode()
    url = (
        "https://api.company-information.service.gov.uk"
        f"/advanced-search/companies?sic_codes={sic}&company_status=active&size=1"
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
            return _ch_active_count(sic, api_key)
        raise
    finally:
        time.sleep(0.4)  # ponytail: 400 ms keeps well under 600/10-min limit


def main() -> None:
    api_key = _get_api_key()
    as_of = date.today().isoformat()
    total = 0
    for sic in SIC_CODES:
        count = _ch_active_count(sic, api_key)
        print(f"  SIC {sic} active = {count:,}")
        total += count
    print(f"  TOTAL (56101+56102+56103) active = {total:,} as at {as_of}")

    snapshot = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    snapshot["headline"]["restaurant_count_proxy"] = {
        "description": (
            f"Live active companies with SIC 56101 (licensed restaurants), "
            f"56102 (unlicensed restaurants and cafes) or 56103 (takeaway food shops "
            f"and mobile food stands) on the Companies House register as at {as_of}"
        ),
        "count": total,
        "as_of": as_of,
    }
    DATA_PATH.write_text(
        json.dumps(snapshot, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(f"  Patched {DATA_PATH}")


if __name__ == "__main__":
    main()
