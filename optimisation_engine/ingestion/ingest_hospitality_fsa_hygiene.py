"""UK Hospitality Food Hygiene (FHRS/FHIS) density + rating map -- data ingestion.

Supplementary research asset (S1) for the hospitality site. Pulls the live
Food Standards Agency ratings API (no key, no registration; FHRS for England,
Wales and Northern Ireland, FHIS for Scotland) and builds AGGREGATE counts
only, by local authority and by hospitality business type. No individual
establishment is named in the output -- this is a hard rule (reputational
risk of naming a specific low-rated business), enforced by construction: the
snapshot never stores establishment names, only counts.

Source: FSA Ratings API v2 (https://api.ratings.food.gov.uk/, help at
https://api.ratings.food.gov.uk/help). Licence: FSA open-data terms and
conditions (bespoke wording rather than a bare OGL badge; treated here as
open + attribution, aggregate-only, per the scout brief's licence flag).

Business types pulled (the hospitality-relevant subset of the FSA's ~13
categories; excludes retailers, schools, hospitals, distributors, importers,
manufacturers and farmers, which are not hospitality):
  1     Restaurant/Cafe/Canteen
  7841  Other catering premises
  7842  Hotel/bed & breakfast/guest house
  7843  Pub/bar/nightclub
  7844  Takeaway/sandwich shop
  7846  Mobile caterer

Writes hospitality/web/src/data/hospitality-fsa-hygiene-index.json.

Usage:
  python -m optimisation_engine.ingestion.ingest_hospitality_fsa_hygiene

Self-contained: no Supabase, no git commit. Requires: requests.
"""
from __future__ import annotations

import json
import time
from collections import defaultdict
from datetime import date
from pathlib import Path

import requests

API_BASE = "https://api.ratings.food.gov.uk"
HEADERS = {"x-api-version": "2", "accept": "application/json", "User-Agent": "HospitalityTax-Research/1.0"}
PAGE_SIZE = 5000
MIN_SAMPLE_FOR_LEAGUE_TABLE = 150  # LAs below this hospitality establishment count are excluded from league tables (too noisy)

BUSINESS_TYPES: dict[int, str] = {
    1: "restaurants_cafes_canteens",
    7841: "other_catering_premises",
    7842: "hotels_bed_breakfast_guest_houses",
    7843: "pubs_bars_nightclubs",
    7844: "takeaways_sandwich_shops",
    7846: "mobile_caterers",
}
BUSINESS_TYPE_LABELS: dict[str, str] = {
    "restaurants_cafes_canteens": "Restaurants, cafes and canteens",
    "other_catering_premises": "Other catering premises",
    "hotels_bed_breakfast_guest_houses": "Hotels, B&Bs and guest houses",
    "pubs_bars_nightclubs": "Pubs, bars and nightclubs",
    "takeaways_sandwich_shops": "Takeaways and sandwich shops",
    "mobile_caterers": "Mobile caterers",
}

OUT_PATH = (
    Path(__file__).resolve().parents[2]
    / "hospitality" / "web" / "src" / "data"
    / "hospitality-fsa-hygiene-index.json"
)

FHRS_RATINGS = ["5", "4", "3", "2", "1", "0"]
FHIS_RATINGS = ["Pass", "Improvement Required"]


def get_json(url: str, params: dict) -> dict:
    for attempt in range(3):
        try:
            r = requests.get(url, params=params, headers=HEADERS, timeout=60)
            r.raise_for_status()
            return r.json()
        except requests.RequestException:
            if attempt == 2:
                raise
            time.sleep(2)
    raise RuntimeError("unreachable")


def fetch_authorities() -> dict[str, str]:
    """Returns {LocalAuthorityName: scheme} where scheme is 'FHRS' or 'FHIS'."""
    data = get_json(f"{API_BASE}/authorities/basic", {})
    scheme_by_name: dict[str, str] = {}
    for a in data["authorities"]:
        scheme_by_name[a["Name"]] = "FHIS" if a.get("SchemeType") == 2 else "FHRS"
    return scheme_by_name


def fetch_business_type_establishments(business_type_id: int) -> list[dict]:
    """Fetch every establishment for one business type, nationally, paginated."""
    out: list[dict] = []
    page = 1
    while True:
        data = get_json(
            f"{API_BASE}/Establishments",
            {"businessTypeId": business_type_id, "pageSize": PAGE_SIZE, "pageNumber": page},
        )
        rows = data.get("establishments", [])
        out.extend(rows)
        total_pages = data["meta"]["totalPages"]
        print(f"    businessTypeId={business_type_id} page {page}/{total_pages} ({len(rows)} rows)")
        if page >= total_pages or not rows:
            break
        page += 1
    return out


def main() -> None:
    print("Fetching local authority list (for scheme type: FHRS vs FHIS)...")
    scheme_by_la = fetch_authorities()

    # Aggregation state
    by_business_type: dict[str, dict] = {
        key: {"total": 0, "rating_counts": defaultdict(int)} for key in BUSINESS_TYPES.values()
    }
    by_la: dict[str, dict] = {}  # LA name -> {scheme, total, by_type: {key: count}, rating_counts}
    national_scheme_totals = {"FHRS": 0, "FHIS": 0}

    for bt_id, bt_key in BUSINESS_TYPES.items():
        print(f"Fetching business type {bt_id} ({BUSINESS_TYPE_LABELS[bt_key]})...")
        rows = fetch_business_type_establishments(bt_id)
        by_business_type[bt_key]["total"] = len(rows)

        for row in rows:
            la_name = row.get("LocalAuthorityName") or "Unknown"
            rating = row.get("RatingValue")
            scheme = scheme_by_la.get(la_name, "FHRS")

            by_business_type[bt_key]["rating_counts"][str(rating)] += 1
            national_scheme_totals[scheme] += 1

            if la_name not in by_la:
                by_la[la_name] = {
                    "scheme": scheme,
                    "total": 0,
                    "by_type": defaultdict(int),
                    "rating_counts": defaultdict(int),
                }
            by_la[la_name]["total"] += 1
            by_la[la_name]["by_type"][bt_key] += 1
            by_la[la_name]["rating_counts"][str(rating)] += 1

    total_establishments = sum(v["total"] for v in by_business_type.values())
    print(f"Total hospitality-relevant establishments pulled: {total_establishments}")

    # ---------------------------------------------------------------------
    # National rating distribution per business type
    # ---------------------------------------------------------------------
    business_type_summary = []
    for key, label in BUSINESS_TYPE_LABELS.items():
        rc = by_business_type[key]["rating_counts"]
        total = by_business_type[key]["total"]
        fhrs_5_count = rc.get("5", 0)
        fhrs_rated_total = sum(rc.get(r, 0) for r in FHRS_RATINGS)
        business_type_summary.append({
            "key": key,
            "label": label,
            "total": total,
            "rating_counts": dict(rc),
            "fhrs_top_rating_share_pct": round(fhrs_5_count / fhrs_rated_total * 100, 1) if fhrs_rated_total > 0 else None,
        })
    business_type_summary.sort(key=lambda r: -r["total"])

    # ---------------------------------------------------------------------
    # Local authority league table (FHRS LAs only -- 0-5 scale; FHIS Scotland
    # uses Pass/Improvement Required so is reported separately)
    # ---------------------------------------------------------------------
    la_rows = []
    for name, v in by_la.items():
        if v["scheme"] != "FHRS":
            continue
        rc = v["rating_counts"]
        rated_total = sum(rc.get(r, 0) for r in FHRS_RATINGS)
        if rated_total < MIN_SAMPLE_FOR_LEAGUE_TABLE:
            continue
        top_share = round(rc.get("5", 0) / rated_total * 100, 1) if rated_total > 0 else None
        low_share = round((rc.get("0", 0) + rc.get("1", 0)) / rated_total * 100, 1) if rated_total > 0 else None
        la_rows.append({
            "local_authority": name,
            "total_hospitality_establishments": v["total"],
            "rated_total": rated_total,
            "top_rating_5_share_pct": top_share,
            "low_rating_0_or_1_share_pct": low_share,
        })

    la_rows_by_top_share = sorted(la_rows, key=lambda r: (-(r["top_rating_5_share_pct"] or 0)))
    top15_la = la_rows_by_top_share[:15]
    bottom15_la = sorted(la_rows, key=lambda r: (r["top_rating_5_share_pct"] or 0))[:15]

    density_top15_la = sorted(la_rows, key=lambda r: -r["total_hospitality_establishments"])[:15]

    # Scotland (FHIS) national pass rate
    scotland_pass = 0
    scotland_total_rated = 0
    for v in by_la.values():
        if v["scheme"] != "FHIS":
            continue
        rc = v["rating_counts"]
        scotland_pass += rc.get("Pass", 0)
        scotland_total_rated += sum(rc.get(r, 0) for r in FHIS_RATINGS)

    # National FHRS top-rating (5) share across all hospitality types combined
    national_fhrs_rated = sum(
        by_business_type[k]["rating_counts"].get(r, 0)
        for k in BUSINESS_TYPES.values()
        for r in FHRS_RATINGS
    )
    national_fhrs_5 = sum(by_business_type[k]["rating_counts"].get("5", 0) for k in BUSINESS_TYPES.values())
    national_top_rating_share_pct = round(national_fhrs_5 / national_fhrs_rated * 100, 1) if national_fhrs_rated else None

    snapshot = {
        "meta": {
            "generated_at": date.today().isoformat() + "T00:00:00Z",
            "pull_date": date.today().isoformat(),
            "source": "Food Standards Agency Ratings API (FHRS/FHIS)",
            "source_url": "https://api.ratings.food.gov.uk/help",
            "open_data_page": "https://ratings.food.gov.uk/open-data",
            "licence": "FSA open-data terms and conditions (treated as open + attribution; no bare OGL badge published for this dataset)",
            "coverage": "England, Wales, Northern Ireland (FHRS, 0-5 scale) and Scotland (FHIS, Pass / Improvement Required scale)",
            "business_types_included": BUSINESS_TYPE_LABELS,
            "business_types_excluded_note": (
                "Retailers, schools/colleges, hospitals/childcare/caring premises, distributors/transporters, "
                "importers/exporters, manufacturers/packers and farmers/growers are excluded as non-hospitality."
            ),
            "min_sample_for_league_table": MIN_SAMPLE_FOR_LEAGUE_TABLE,
            "aggregation_rule": (
                "AGGREGATE STATISTICS ONLY. No individual establishment name, address or FHRSID is stored "
                "or published anywhere in this dataset or the page that renders it. All figures are counts "
                "and percentages grouped by local authority and by business type. This is a deliberate policy, "
                "not a technical limitation: FSA rating data can identify specific low-rated businesses and "
                "this asset does not name any."
            ),
            "notes": (
                "Local authority league tables are restricted to local authorities operating the FHRS 0-5 scale "
                "(England, Wales, Northern Ireland) with at least "
                f"{MIN_SAMPLE_FOR_LEAGUE_TABLE} rated hospitality establishments, to avoid small-sample noise. "
                "Scotland uses the FHIS Pass / Improvement Required scale, which is not numerically comparable "
                "to the 0-5 scale, and is reported as a separate national pass rate. Ratings reflect the most "
                "recent inspection on file at pull date and are not real-time; some establishments show "
                "'Awaiting Inspection' or 'Exempt' and are excluded from rated-total denominators."
            ),
        },
        "headline": {
            "total_establishments": total_establishments,
            "national_top_rating_5_share_pct": national_top_rating_share_pct,
            "scotland_pass_rate_pct": round(scotland_pass / scotland_total_rated * 100, 1) if scotland_total_rated else None,
            "local_authorities_covered": len(by_la),
            "local_authorities_in_league_table": len(la_rows),
        },
        "business_types": business_type_summary,
        "local_authority_league_table": {
            "top15_by_top_rating_share": top15_la,
            "bottom15_by_top_rating_share": bottom15_la,
            "top15_by_density": density_top15_la,
        },
    }

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(snapshot, indent=2), encoding="utf-8")
    print(f"Written: {OUT_PATH}")

    # Self-check: no establishment-level identifiers anywhere in the output
    # (checks for the JSON *key* pattern, not bare substrings, since the
    # aggregation_rule note above legitimately mentions these field names in prose)
    dump = json.dumps(snapshot)
    assert '"BusinessName"' not in dump, "Establishment name leaked into aggregate snapshot"
    assert '"FHRSID"' not in dump, "Establishment ID leaked into aggregate snapshot"
    assert '"AddressLine' not in dump, "Establishment address leaked into aggregate snapshot"
    assert total_establishments > 300000, "Sanity check: expected 300k+ hospitality establishments"
    assert len(la_rows) > 50, "Expected 50+ local authorities in the league table"
    print("Self-check passed (aggregate-only, no establishment identifiers).")
    print(f"Total establishments: {total_establishments}")
    print(f"National top-rating (5) share: {national_top_rating_share_pct}%")
    print(f"Scotland pass rate: {snapshot['headline']['scotland_pass_rate_pct']}%")


if __name__ == "__main__":
    main()
