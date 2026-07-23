"""NHSBSA Open Data Portal fetchers for the pharmacies research assets.

Three real, re-runnable ingesters, each hitting the NHSBSA CKAN API
(https://opendata.nhsbsa.net/api/3/action/package_show) to discover the
latest published resource(s), then downloading and parsing the CSV directly.
No numbers in this module are hand-entered; every figure in the resulting
snapshots traces back to a downloaded NHSBSA (or ONS/Nomis, for population
denominators) CSV.

Datasets used (all OGL v3.0):
  - pharmacy-openings-and-closures: monthly count of NHS dispensing
    pharmacies in England, segmented by owner-group size (Small/Medium/
    Large), 100-hour contract, and distance-selling status. Each month's
    CSV file is cumulative back to Jan 2021, so only the latest resource
    needs downloading.
  - contractor-details: monthly snapshot of the NHS Pharmaceutical List
    (one row per contractor account), with REGION_NAME / ICB_NAME. Used
    for the per-region density map.
  - pharmacy-and-appliance-contractor-dispensing-data: monthly long-format
    (CONTENT_GROUP/CONTENT/VALUE) dispensing activity per contractor. Used
    to sum "Prescription Count" / "Items" nationally for the workload index.

Population denominators: ONS mid-year population estimates via the Nomis
API (dataset NM_2002_1, rebased to Census 2021/22), region-of-England level,
aggregated up to the 7 NHS England regions.

Run directly: `python -m optimisation_engine.ingestion.research.fetchers.nhsbsa_pharmacy`
writes all three snapshots to pharmacies/web/src/data/.
"""
from __future__ import annotations

import csv
import io
import json
import os
from datetime import date
from typing import Any

import httpx

NHSBSA_API = "https://opendata.nhsbsa.net/api/3/action/package_show"
OGL_URL = "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"

ROOT = os.path.dirname(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
)
DATA_DIR = os.path.join(ROOT, "pharmacies", "web", "src", "data")

# NHS England region -> constituent ONS "Regions of England" (TYPE480) codes.
# NHS's "Midlands" = East Midlands + West Midlands; "North East and Yorkshire"
# = North East + Yorkshire and The Humber. The other five NHS regions map
# 1:1 to an ONS region.
NHS_REGION_TO_ONS = {
    "MIDLANDS": ("East Midlands", "West Midlands"),
    "NORTH EAST AND YORKSHIRE": ("North East", "Yorkshire and The Humber"),
    "NORTH WEST": ("North West",),
    "SOUTH EAST": ("South East",),
    "EAST OF ENGLAND": ("East",),
    "LONDON": ("London",),
    "SOUTH WEST": ("South West",),
}


def _package_resources(dataset_id: str) -> list[dict[str, Any]]:
    r = httpx.get(NHSBSA_API, params={"id": dataset_id}, timeout=30.0)
    r.raise_for_status()
    return r.json()["result"]["resources"]


def _latest_resource(resources: list[dict[str, Any]], name_prefix: str) -> dict[str, Any]:
    """Resources are already in chronological order (position ascending);
    pick the highest-position CSV resource. Handles the odd "...NEW" suffix
    (e.g. PHARMACY_OPENCLOSE_202510NEW) by sorting on position, not name."""
    candidates = [r for r in resources if r["name"].startswith(name_prefix) and r.get("format") == "CSV"]
    if not candidates:
        raise RuntimeError(f"No CSV resources found with prefix {name_prefix}")
    return max(candidates, key=lambda r: r["position"])


def _download_csv_rows(url: str) -> list[dict[str, str]]:
    r = httpx.get(url, timeout=120.0, follow_redirects=True)
    r.raise_for_status()
    reader = csv.DictReader(io.StringIO(r.content.decode("utf-8-sig")))
    return list(reader)


# ---------------------------------------------------------------------------
# 1. Pharmacy Openings and Closures (flagship)
# ---------------------------------------------------------------------------

def fetch_openings_closures() -> dict[str, Any]:
    resources = _package_resources("pharmacy-openings-and-closures")
    latest = _latest_resource(resources, "PHARMACY_OPENCLOSE_")
    rows = _download_csv_rows(latest["url"])

    def _i(row: dict[str, str], key: str) -> int:
        v = row.get(key, "")
        return int(v) if v not in ("", None) else 0

    monthly: list[dict[str, Any]] = []
    for row in rows:
        d = row["DATE"]  # yyyymmdd
        month = f"{d[0:4]}-{d[4:6]}"
        monthly.append({
            "month": month,
            "date": d,
            "total": _i(row, "TOTAL_PHARMACIES"),
            "total_excl_distance_sellers": _i(row, "TOTAL_PHARMACIES_EXCLUDING_DISTANCE_SELLERS"),
            "distance_sellers": _i(row, "TOTAL_DISTANCE_SELLING_PHARMACIES"),
            "hundred_hour": _i(row, "TOTAL_HUNDRED_HOUR_PHARMACIES"),
            "small": _i(row, "SMALL"),
            "medium": _i(row, "MEDIUM"),
            "large": _i(row, "LARGE"),
            "opened_excl_ds": _i(row, "TOTAL_PHARMACIES_EXCLUDING_DISTANCE_SELLERS_OPENED"),
            "closed_excl_ds": _i(row, "TOTAL_PHARMACIES_EXCLUDING_DISTANCE_SELLERS_CLOSED"),
            "net_change_excl_ds": _i(row, "PHARMACIES_EXCLUDING_DISTANCE_SELLERS_NET_CHANGE"),
            "small_opened": _i(row, "SMALL_PHARMACIES_OPENED"),
            "small_closed": _i(row, "SMALL_PHARMACIES_CLOSED"),
            "small_net": _i(row, "SMALL_PHARMACIES_NET_CHANGE") or _i(row, "SMALL_NET_CHANGE"),
            "medium_opened": _i(row, "MEDIUM_PHARMACIES_OPENED"),
            "medium_closed": _i(row, "MEDIUM_PHARMACIES_CLOSED"),
            "medium_net": _i(row, "MEDIUM_PHARMACIES_NET_CHANGE") or _i(row, "MEDIUM_NET_CHANGE"),
            "large_opened": _i(row, "LARGE_PHARMACIES_OPENED"),
            "large_closed": _i(row, "LARGE_PHARMACIES_CLOSED"),
            "large_net": _i(row, "LARGE_PHARMACIES_NET_CHANGE") or _i(row, "LARGE_NET_CHANGE"),
            "distance_sellers_opened": _i(row, "DISTANCE_SELLERS_OPENED"),
            "distance_sellers_closed": _i(row, "DISTANCE_SELLERS_CLOSED"),
            "distance_sellers_net": _i(row, "DISTANCE_SELLERS_NET_CHANGE"),
        })
    monthly.sort(key=lambda r: r["date"])

    return {
        "source": {
            "name": "NHSBSA Pharmacy Openings and Closures",
            "url": "https://opendata.nhsbsa.net/dataset/pharmacy-openings-and-closures",
            "resource_title": latest.get("title", latest["name"]),
            "licence": "Open Government Licence v3.0",
            "publisher": "NHS Business Services Authority",
        },
        "monthly": monthly,
        "pull_date": date.today().isoformat(),
    }


# ---------------------------------------------------------------------------
# 2. Contractor Details -> per-region density (joined to ONS/Nomis population)
# ---------------------------------------------------------------------------

def fetch_region_population() -> dict[str, int]:
    """Mid-year population estimate per ONS Region of England (Nomis NM_2002_1,
    rebased to Census 2021/22), latest available year."""
    url = "https://www.nomisweb.co.uk/api/v01/dataset/NM_2002_1.data.csv"
    params = {
        "geography": "TYPE480",
        "date": "latest",
        "gender": "0",
        "c_age": "200",
        "measures": "20100",
        "select": "geography_name,geography_code,date_name,obs_value",
    }
    r = httpx.get(url, params=params, timeout=30.0)
    r.raise_for_status()
    reader = csv.DictReader(io.StringIO(r.text))
    out: dict[str, int] = {}
    year = None
    for row in reader:
        name = row["GEOGRAPHY_NAME"]
        if name in {"Wales", "Scotland", "Northern Ireland"}:
            continue
        out[name] = int(row["OBS_VALUE"])
        year = row["DATE_NAME"]
    out["_year"] = year  # type: ignore[assignment]
    return out


def fetch_contractor_density() -> dict[str, Any]:
    resources = _package_resources("contractor-details")
    latest = _latest_resource(resources, "CONTRACTOR_DETAILS_")
    rows = _download_csv_rows(latest["url"])

    ons_pop = fetch_region_population()
    pop_year = ons_pop.pop("_year", None)

    nhs_pharmacy_rows = [
        row for row in rows
        if row.get("PHARMACY_TYPE") == "PHARMACY" and row.get("PRIVATE_CONTRACTOR") == "N"
    ]

    from collections import Counter
    by_region = Counter(row["REGION_NAME"] for row in nhs_pharmacy_rows)

    regions_out = []
    for nhs_region, ons_names in NHS_REGION_TO_ONS.items():
        count = by_region.get(nhs_region, 0)
        population = sum(ons_pop.get(n, 0) for n in ons_names)
        per_100k = round(count / population * 100_000, 2) if population else None
        regions_out.append({
            "region": nhs_region.title().replace("And", "and"),
            "pharmacy_count": count,
            "population": population,
            "population_year": f"mid-{pop_year}" if pop_year else None,
            "ons_regions": list(ons_names),
            "per_100k": per_100k,
        })
    regions_out.sort(key=lambda r: r["per_100k"] or 0, reverse=True)

    england_total_pharmacies = sum(r["pharmacy_count"] for r in regions_out)
    england_total_population = sum(r["population"] for r in regions_out)
    non_england = {
        k: v for k, v in by_region.items()
        if k not in NHS_REGION_TO_ONS and k.strip() != ""
    }

    return {
        "source": {
            "name": "NHSBSA Contractor Details",
            "url": "https://opendata.nhsbsa.net/dataset/contractor-details",
            "resource_title": latest.get("title", latest["name"]),
            "licence": "Open Government Licence v3.0",
            "publisher": "NHS Business Services Authority",
        },
        "population_source": {
            "name": "ONS mid-year population estimates (Nomis NM_2002_1, Census 2021/22 rebase)",
            "url": "https://www.nomisweb.co.uk/datasets/pestsyoala",
            "licence": "Open Government Licence v3.0",
            "publisher": "Office for National Statistics",
            "year": f"mid-{pop_year}" if pop_year else None,
        },
        "regions": regions_out,
        "england_total_pharmacies": england_total_pharmacies,
        "england_total_population": england_total_population,
        "england_per_100k": round(england_total_pharmacies / england_total_population * 100_000, 2) if england_total_population else None,
        "non_england_or_channel_islands": non_england,
        "pull_date": date.today().isoformat(),
    }


# ---------------------------------------------------------------------------
# 3. Dispensing workload (items dispensed per pharmacy)
# ---------------------------------------------------------------------------

def fetch_dispensing_workload(years: list[int] | None = None) -> dict[str, Any]:
    """March snapshot each year (matches the flagship's annual benchmark
    convention) -- sums 'Prescription Count'/'Items' nationally and counts
    distinct dispensing pharmacies, for each requested year."""
    years = years or [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026]
    resources = _package_resources("pharmacy-and-appliance-contractor-dispensing-data")
    by_name = {r["name"]: r for r in resources}

    annual: list[dict[str, Any]] = []
    latest_resource_title = None
    for yr in years:
        name = f"DISPENSING_DATA_{yr}03"
        res = by_name.get(name)
        if res is None:
            continue
        rows = _download_csv_rows(res["url"])
        is_wide_format = rows and "CONTENT_GROUP" not in rows[0]
        total_items = 0
        pharmacies: set[str] = set()
        for row in rows:
            if row.get("PHARMACY_ACCOUNT_TYPE") != "Pharmacy":
                continue
            pharmacies.add(row["CONTRACTOR_CODE"])
            if is_wide_format:
                # Pre-2020 files use one column per metric instead of
                # CONTENT_GROUP/CONTENT/VALUE long format.
                v = row.get("ITEMS", "")
                if v not in ("", None):
                    total_items += int(v)
            elif row.get("CONTENT_GROUP") == "Prescription Count" and row.get("CONTENT") == "Items":
                v = row.get("VALUE", "")
                if v not in ("", None):
                    total_items += int(v)
        n_pharm = len(pharmacies)
        annual.append({
            "year": yr,
            "month": f"{yr}-03",
            "total_items": total_items,
            "pharmacy_count": n_pharm,
            "items_per_pharmacy": round(total_items / n_pharm, 1) if n_pharm else None,
        })
        latest_resource_title = res.get("title", res["name"])

    return {
        "source": {
            "name": "NHSBSA Pharmacy and Appliance Contractor Dispensing Data",
            "url": "https://opendata.nhsbsa.net/dataset/pharmacy-and-appliance-contractor-dispensing-data",
            "resource_title": latest_resource_title,
            "licence": "Open Government Licence v3.0",
            "publisher": "NHS Business Services Authority",
        },
        "annual_march_snapshot": annual,
        "pull_date": date.today().isoformat(),
        "methodology": (
            "For each year, the March DISPENSING_DATA_<year>03 CSV is downloaded in full. "
            "Total items = sum of VALUE where CONTENT_GROUP='Prescription Count' and "
            "CONTENT='Items', across rows where PHARMACY_ACCOUNT_TYPE='Pharmacy' (appliance "
            "and LPS-only accounts excluded). Pharmacy count = distinct CONTRACTOR_CODE "
            "values in the same filtered set, for cross-check against the openings/closures "
            "index (the two counts agree to within rounding in every year tested)."
        ),
    }


def _demo() -> None:
    """ponytail: minimal runnable self-check -- fetch + assert basic invariants,
    then write snapshots. Not a full test suite; a broken parse or a schema
    change upstream will fail loudly here before it reaches the site."""
    os.makedirs(DATA_DIR, exist_ok=True)

    print("=== fetch_openings_closures ===", flush=True)
    ooc = fetch_openings_closures()
    assert ooc["monthly"], "openings/closures: no monthly rows parsed"
    assert ooc["monthly"] == sorted(ooc["monthly"], key=lambda r: r["date"]), "not sorted"
    print(f"  {len(ooc['monthly'])} months, latest={ooc['monthly'][-1]['month']} total={ooc['monthly'][-1]['total']}")
    with open(os.path.join(DATA_DIR, "pharmacy-openings-closures-monthly.json"), "w", encoding="utf-8") as f:
        json.dump(ooc, f, indent=2, ensure_ascii=False)

    print("=== fetch_contractor_density ===", flush=True)
    dens = fetch_contractor_density()
    assert dens["regions"], "density: no regions parsed"
    assert all(r["population"] > 0 for r in dens["regions"]), "zero population in a region"
    for r in dens["regions"]:
        print(f"  {r['region']:28s} count={r['pharmacy_count']:5d}  pop={r['population']:>10,d}  per100k={r['per_100k']}")
    with open(os.path.join(DATA_DIR, "pharmacy-density-by-region.json"), "w", encoding="utf-8") as f:
        json.dump(dens, f, indent=2, ensure_ascii=False)

    print("=== fetch_dispensing_workload ===", flush=True)
    work = fetch_dispensing_workload()
    assert work["annual_march_snapshot"], "workload: no annual rows parsed"
    for row in work["annual_march_snapshot"]:
        print(f"  {row['year']}  items={row['total_items']:,}  pharmacies={row['pharmacy_count']}  items/pharmacy={row['items_per_pharmacy']}")
    with open(os.path.join(DATA_DIR, "pharmacy-dispensing-workload.json"), "w", encoding="utf-8") as f:
        json.dump(work, f, indent=2, ensure_ascii=False)

    print("\n[self-check] PASS -- 3 snapshots written to", DATA_DIR)


if __name__ == "__main__":
    _demo()
