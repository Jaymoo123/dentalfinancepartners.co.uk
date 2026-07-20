"""
Dental Practice Density ingester -- "Dental Deserts" map.

Source:  CQC Care Directory CSV (all CQC-registered locations), monthly release.
         https://www.cqc.org.uk/sites/default/files/2026-07/15_July_2026_CQC_directory.csv
         Open Government Licence v3.0.

Population: ONS Mid-2023 population estimates for England regions (embedded constants;
            avoids xlsx dependency). Updated to mid-2024 values from ONS bulletin Sep 2025.
            Source: https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/
                    populationestimates/bulletins/annualmidyearpopulationestimates/mid2024
            Licence: OGL v3.0.

Output: Dentists/web/src/data/dental-practice-density.json

Self-check: counts > 0, ratios computed for all regions.

Usage:
    python optimisation_engine/ingestion/ingest_dental_density.py
"""
from __future__ import annotations

import csv
import io
import json
import sys
import datetime
import urllib.request
from pathlib import Path
from collections import defaultdict

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

CQC_CSV_URL = "https://www.cqc.org.uk/sites/default/files/2026-07/15_July_2026_CQC_directory.csv"
CQC_DATA_DATE = "2026-07-15"

OUT_PATH = (
    Path(__file__).parents[2]
    / "Dentists" / "web" / "src" / "data" / "dental-practice-density.json"
)

# ONS Mid-2024 population estimates for England regions (thousands of people).
# Source: ONS "Mid-2024 Population Estimates for UK", published 26 Sep 2025.
# URL: https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/
#      populationestimates/bulletins/annualmidyearpopulationestimates/mid2024
# Figures are total persons (all ages), in thousands -- we store raw here.
# Region labels match the CQC "Region" column values.
ONS_REGION_POPULATION: dict[str, int] = {
    "East Midlands":            4_960_000,
    "East of England":          6_370_000,
    "London":                  9_748_000,
    "North East":               2_657_000,
    "North West":               7_480_000,
    "South East":              9_263_000,
    "South West":               5_778_000,
    "West Midlands":            5_950_000,
    "Yorkshire & Humberside":   5_547_000,
    # ONS uses "Yorkshire and The Humber"; CQC uses "Yorkshire & Humberside" -- normalised above.
    # "Yorkshire and The Humber" kept here as fallback if normalisation map ever misses it.
    "Yorkshire and The Humber": 5_547_000,
}

# CQC region label normalisation (CQC sometimes uses variant spellings)
REGION_NORMALISE: dict[str, str] = {
    "yorkshire & humberside":   "Yorkshire & Humberside",
    "yorkshire and the humber": "Yorkshire & Humberside",
    "east midlands":            "East Midlands",
    "east of england":          "East of England",
    "east":                     "East of England",   # CQC label for ONS "East of England"
    "london":                   "London",
    "north east":               "North East",
    "north west":               "North West",
    "south east":               "South East",
    "south west":               "South West",
    "west midlands":            "West Midlands",
}

# ---------------------------------------------------------------------------
# Fetch helpers
# ---------------------------------------------------------------------------

UA = "DentalFinancePartners-Research/1.0"


def fetch_url(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=120) as r:
        return r.read()


# ---------------------------------------------------------------------------
# Parse CQC CSV
# ---------------------------------------------------------------------------

# The CQC CSV has 4 header rows before the actual column header row.
# Row 0: "CQC Locations data"
# Row 1: (blank)
# Row 2: "This data was produced on ..."
# Row 3: (blank)
# Row 4: Name, Also known as, Address, ..., Service types, ..., Region, ...

COL_SERVICE_TYPES = "Service types"
COL_REGION = "Region"
COL_LOCAL_AUTHORITY = "Local authority"
DENTAL_SERVICE_TYPE = "Dentist"


def parse_cqc_csv(content: bytes) -> dict:
    """Return region -> count and local_authority -> (region, count) dicts for dental locations."""
    text = content.decode("utf-8-sig", errors="replace")
    lines = text.splitlines()

    # Find header row (line starting with "Name,")
    header_line = None
    data_start = None
    for i, line in enumerate(lines):
        if line.startswith("Name,"):
            header_line = i
            data_start = i + 1
            break

    if header_line is None:
        raise ValueError("Could not find header row in CQC CSV")

    reader = csv.DictReader(lines[header_line:])

    region_counts: dict[str, int] = defaultdict(int)
    la_counts: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))
    total = 0

    for row in reader:
        svc = (row.get(COL_SERVICE_TYPES) or "").strip()
        if svc != DENTAL_SERVICE_TYPE:
            continue
        raw_region = (row.get(COL_REGION) or "").strip()
        raw_la = (row.get(COL_LOCAL_AUTHORITY) or "").strip()

        region = REGION_NORMALISE.get(raw_region.lower(), raw_region) if raw_region else "Unknown"
        region_counts[region] += 1
        if raw_la:
            la_counts[region][raw_la] += 1
        total += 1

    return {
        "total": total,
        "by_region": dict(region_counts),
        "by_la": {r: dict(las) for r, las in la_counts.items()},
    }


# ---------------------------------------------------------------------------
# Build snapshot
# ---------------------------------------------------------------------------

def build_snapshot(parsed: dict) -> dict:
    total = parsed["total"]
    by_region = parsed["by_region"]
    by_la = parsed["by_la"]

    regions = []
    for region, count in sorted(by_region.items()):
        pop = ONS_REGION_POPULATION.get(region)
        ratio = round(count / pop * 100_000, 2) if pop else None

        # Top 5 local authorities by count
        top_las = sorted(
            (by_la.get(region) or {}).items(),
            key=lambda kv: kv[1],
            reverse=True,
        )[:5]

        regions.append({
            "region": region,
            "dental_locations": count,
            "population": pop,
            "per_100k": ratio,
            "top_local_authorities": [
                {"local_authority": la, "count": c} for la, c in top_las
            ],
        })

    # Sort by per_100k descending (None last)
    regions.sort(key=lambda r: r["per_100k"] if r["per_100k"] is not None else -1, reverse=True)

    england_known = [r for r in regions if r["population"] is not None]
    england_pop = sum(r["population"] for r in england_known)
    england_count = sum(r["dental_locations"] for r in england_known)
    england_per_100k = round(england_count / england_pop * 100_000, 2) if england_pop else None

    highest = regions[0] if regions else None
    lowest_known = [r for r in reversed(regions) if r["per_100k"] is not None]
    lowest = lowest_known[0] if lowest_known else None

    return {
        "meta": {
            "generated_at": datetime.date.today().isoformat(),
            "cqc_data_date": CQC_DATA_DATE,
            "coverage": "England (CQC-registered dental locations only)",
            "population_reference": "ONS Mid-2024 Population Estimates (published Sep 2025)",
            "sources": [
                {
                    "name": "CQC Care Directory",
                    "publisher": "Care Quality Commission",
                    "url": CQC_CSV_URL,
                    "portal": "https://www.cqc.org.uk/about-us/transparency/using-cqc-data",
                    "licence": "Open Government Licence v3.0",
                    "retrieved": CQC_DATA_DATE,
                    "attribution": "Contains public sector information licensed under the Open Government Licence v3.0.",
                },
                {
                    "name": "Mid-2024 Population Estimates",
                    "publisher": "Office for National Statistics",
                    "url": "https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates/bulletins/annualmidyearpopulationestimates/mid2024",
                    "portal": "https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates/datasets/populationestimatesforukenglandandwalesscotlandandnorthernireland/mid2024",
                    "licence": "Open Government Licence v3.0",
                    "retrieved": "2025-09-26",
                    "attribution": "Source: Office for National Statistics licensed under the Open Government Licence v3.0.",
                },
            ],
            "notes": (
                "CQC registers all dental locations (including NHS, mixed, and private practices) "
                "under Service types = 'Dentist'. This count reflects CQC-registered locations, "
                "not individual dentists or chairs. Some locations may be closed or inactive but "
                "remain on the register. England-only: Scotland, Wales and Northern Ireland are "
                "regulated separately. Population figures are ONS mid-2024 estimates."
            ),
        },
        "headline": {
            "total_dental_locations": total,
            "england_per_100k": england_per_100k,
            "england_population": england_pop,
            "highest_density_region": highest["region"] if highest else None,
            "highest_density_per_100k": highest["per_100k"] if highest else None,
            "lowest_density_region": lowest["region"] if lowest else None,
            "lowest_density_per_100k": lowest["per_100k"] if lowest else None,
        },
        "regions": regions,
    }


# ---------------------------------------------------------------------------
# Self-check
# ---------------------------------------------------------------------------

def self_check(snap: dict) -> list[str]:
    failures = []
    if snap["headline"]["total_dental_locations"] == 0:
        failures.append("total_dental_locations is 0")
    if not snap["regions"]:
        failures.append("regions list is empty")
    for r in snap["regions"]:
        if r["dental_locations"] <= 0:
            failures.append(f"region {r['region']} has count <= 0")
        if r["population"] is not None and r["per_100k"] is None:
            failures.append(f"region {r['region']} has population but per_100k is None")
    return failures


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    print(f"Fetching CQC directory from {CQC_CSV_URL} ...", flush=True)
    content = fetch_url(CQC_CSV_URL)
    print(f"  Downloaded {len(content):,} bytes", flush=True)

    print("Parsing CSV ...", flush=True)
    parsed = parse_cqc_csv(content)
    print(f"  Total dental locations: {parsed['total']:,}", flush=True)
    print(f"  Regions found: {sorted(parsed['by_region'].keys())}", flush=True)

    snap = build_snapshot(parsed)

    h = snap["headline"]
    print(f"\n=== Headline ===")
    print(f"  Total CQC dental locations: {h['total_dental_locations']:,}")
    print(f"  England per 100k: {h['england_per_100k']}")
    print(f"  Highest density: {h['highest_density_region']} ({h['highest_density_per_100k']} per 100k)")
    print(f"  Lowest density:  {h['lowest_density_region']} ({h['lowest_density_per_100k']} per 100k)")
    print()
    for r in snap["regions"]:
        print(f"  {r['region']}: {r['dental_locations']} locations, {r['per_100k']} per 100k")

    failures = self_check(snap)
    if failures:
        print("\n[self-check] FAILED:")
        for f in failures:
            print(f"  - {f}")
        sys.exit(1)
    else:
        print("\n[self-check] PASS")

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUT_PATH, "w", encoding="utf-8") as fh:
        json.dump(snap, fh, indent=2, ensure_ascii=False)
    print(f"\n[output] wrote {OUT_PATH}")


if __name__ == "__main__":
    main()
