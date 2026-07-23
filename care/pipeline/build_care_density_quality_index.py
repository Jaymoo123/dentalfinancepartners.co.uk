"""UK Care Home Density & Quality Index -- data pipeline (flagship research asset).

Cross-references three CQC HSCA extracts with ONS mid-2024 population estimates to
build a beds-per-capita + rating-quality + closure-churn map of England's care homes,
aggregated by region and local authority ONLY (never a named provider/location).

Inputs (already downloaded, reused as-is -- do NOT re-fetch):
  care/pipeline/raw/hsca_active.ods   -- CQC HSCA Active Locations (with filters + ratings), ODS, monthly
  care/pipeline/raw/deactivated.ods  -- CQC Deactivated Locations, ODS, monthly
  care/pipeline/raw/ratings.ods      -- CQC ratings by domain (Safe/Effective/Caring/Responsive/Well-led), ODS, monthly
  care/pipeline/raw/ons_pop_extract.json -- pre-extracted ONS mid-2024 (MYE24) population estimates by
    region and local authority, all-ages and 65+, England. Extracted from ons_mye24.xlsx.

Source (CQC): https://www.cqc.org.uk/about-us/transparency/using-cqc-data
Source (ONS): https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates/bulletins/annualmidyearpopulationestimates/mid2024
Licence: Open Government Licence v3.0 (both CQC and ONS).

ODS files are parsed with stdlib zipfile + xml.etree.iterparse (content.xml is ~400-500MB
uncompressed; no pandas/odfpy load, streamed row-by-row with immediate .clear()).

Scope: CARE HOMES only ("Care home?" = Y in the CQC extracts) -- domiciliary care,
supported living and other adult-social-care location types are outside this index's
beds/ratings scope (they have no bed count and are covered by the sibling
care-provider-business-index asset).

Reputational rule (hard, locked): aggregate by region / local authority / rating band
ONLY. Never name an individual care home or provider, never publish a named "worst"
ranking. LA names are fine (areas, not entities).

Usage (from repo root):
    python care/pipeline/build_care_density_quality_index.py
"""
from __future__ import annotations

import datetime as dt
import json
import zipfile
import xml.etree.ElementTree as ET
from collections import Counter, defaultdict
from pathlib import Path

HERE = Path(__file__).resolve().parent
RAW = HERE / "raw"
OUT = HERE.parent / "web" / "src" / "data" / "uk-care-density-quality-index.json"
OUT.parent.mkdir(parents=True, exist_ok=True)

NS = "{urn:oasis:names:tc:opendocument:xmlns:table:1.0}"

PULL_DATE = dt.date.today().isoformat()

# CQC region names -> ONS MYE24 region names (uppercase). Only "East of England"
# needs remapping; the rest match after .upper().
REGION_TO_ONS = {
    "East of England": "EAST",
}

RATING_BANDS = ["Outstanding", "Good", "Requires improvement", "Inadequate", "Not yet rated"]
NOT_YET_RATED = {"", "Not Rated", "Insufficient evidence to rate", "Not applicable"}


def _normalise_rating(raw: str) -> str:
    if raw in NOT_YET_RATED:
        return "Not yet rated"
    if raw in ("Outstanding", "Good", "Requires improvement", "Inadequate"):
        return raw
    return "Not yet rated"


def _region_key(cqc_region: str) -> str:
    return REGION_TO_ONS.get(cqc_region, cqc_region.upper())


def _iter_rows(path: Path, table_name_prefix: str | None = None):
    """Yield (header, cells) for each data row in the first non-README table of an ODS."""
    z = zipfile.ZipFile(path)
    f = z.open("content.xml")
    in_data = False
    header: list[str] | None = None
    idx: dict[str, int] = {}
    for ev, el in ET.iterparse(f, events=("start", "end")):
        if ev == "start" and el.tag == NS + "table":
            name = el.get(NS + "name")
            in_data = name != "README"
            continue
        if ev == "end" and el.tag == NS + "table-row":
            if in_data:
                cells: list[str] = []
                for c in el.iter(NS + "table-cell"):
                    rep = int(c.get(NS + "number-columns-repeated", "1"))
                    txt = "".join(c.itertext())
                    cells.extend([txt] * min(rep, 500))
                if header is None:
                    if any(x.strip() for x in cells):
                        header = cells
                        idx = {h: i for i, h in enumerate(header)}
                        yield idx, None
                else:
                    if any(x.strip() for x in cells):
                        yield idx, cells
            el.clear()
    z.close()


def _cell(cells: list[str], idx: dict[str, int], name: str) -> str:
    i = idx.get(name)
    if i is None or i >= len(cells):
        return ""
    return cells[i].strip()


class Bucket:
    """Accumulator for one region or one local authority."""

    __slots__ = (
        "care_homes", "beds", "dormant_care_homes", "rating_counts",
        "deactivations_12m", "beds_lost_12m",
    )

    def __init__(self) -> None:
        self.care_homes = 0
        self.beds = 0
        self.dormant_care_homes = 0
        self.rating_counts: Counter[str] = Counter()
        self.deactivations_12m = 0
        self.beds_lost_12m = 0


def _new_bucket_map() -> defaultdict[str, Bucket]:
    return defaultdict(Bucket)


def parse_active(path: Path) -> tuple[defaultdict[str, Bucket], defaultdict[str, Bucket], dict]:
    """Parse hsca_active.ods. Returns (by_region, by_la, national_extra)."""
    by_region = _new_bucket_map()
    by_la = _new_bucket_map()
    total_asc_locations = 0
    total_care_homes = 0
    unmatched_la_rows = 0

    for idx, cells in _iter_rows(path):
        if cells is None:
            continue
        if _cell(cells, idx, "Location Inspection Directorate") != "Adult social care":
            continue
        total_asc_locations += 1
        if _cell(cells, idx, "Care home?") != "Y":
            continue
        total_care_homes += 1

        region = _cell(cells, idx, "Location Region")
        la = _cell(cells, idx, "Location Local Authority")
        dormant = _cell(cells, idx, "Dormant (Y/N)") == "Y"
        rating = _normalise_rating(_cell(cells, idx, "Location Latest Overall Rating"))
        beds_raw = _cell(cells, idx, "Care homes beds")
        beds = int(beds_raw) if beds_raw.isdigit() else 0

        if region and region != "Unspecified":
            b = by_region[region]
            b.care_homes += 1
            b.beds += beds
            b.rating_counts[rating] += 1
            if dormant:
                b.dormant_care_homes += 1

        if la:
            b = by_la[la]
            b.care_homes += 1
            b.beds += beds
            b.rating_counts[rating] += 1
            if dormant:
                b.dormant_care_homes += 1
        else:
            unmatched_la_rows += 1

    return by_region, by_la, {
        "total_adult_social_care_locations": total_asc_locations,
        "total_care_homes": total_care_homes,
        "unmatched_la_rows": unmatched_la_rows,
    }


def parse_deactivated(path: Path, since: dt.date) -> tuple[defaultdict[str, Bucket], defaultdict[str, Bucket], int]:
    """Parse deactivated.ods, care-home deactivations with end date >= `since`."""
    by_region = _new_bucket_map()
    by_la = _new_bucket_map()
    total = 0

    for idx, cells in _iter_rows(path):
        if cells is None:
            continue
        if _cell(cells, idx, "Location Inspection Directorate") != "Adult social care":
            continue
        if _cell(cells, idx, "Care home?") != "Y":
            continue
        end_raw = _cell(cells, idx, "Location HSCA End Date")
        if not end_raw:
            continue
        try:
            end_date = dt.datetime.strptime(end_raw, "%d/%m/%Y").date()
        except ValueError:
            continue
        if end_date < since:
            continue

        total += 1
        region = _cell(cells, idx, "Location Region")
        la = _cell(cells, idx, "Location Local Authority")
        beds_raw = _cell(cells, idx, "Care homes beds at point location de-activated")
        beds = int(beds_raw) if beds_raw.isdigit() else 0

        if region and region != "Unspecified":
            b = by_region[region]
            b.deactivations_12m += 1
            b.beds_lost_12m += beds
        if la:
            b = by_la[la]
            b.deactivations_12m += 1
            b.beds_lost_12m += beds

    return by_region, by_la, total


VALID_DOMAINS = {"Safe", "Effective", "Caring", "Responsive", "Well-led"}


def parse_domain_ratings(path: Path) -> dict[str, Counter[str]]:
    """Parse ratings.ods: national rating distribution per CQC domain, care homes only."""
    by_domain: dict[str, Counter[str]] = {d: Counter() for d in VALID_DOMAINS}
    for idx, cells in _iter_rows(path):
        if cells is None:
            continue
        if _cell(cells, idx, "Care Home?") != "Y":
            continue
        if _cell(cells, idx, "Report Type") != "Location":
            continue
        domain = _cell(cells, idx, "Domain")
        if domain not in VALID_DOMAINS:
            continue
        rating = _normalise_rating(_cell(cells, idx, "Latest Rating"))
        by_domain[domain][rating] += 1
    return by_domain


def _rating_pct(counts: Counter[str]) -> dict[str, float]:
    total = sum(counts.values())
    if not total:
        return {b: 0.0 for b in RATING_BANDS}
    return {b: round(counts.get(b, 0) / total * 100, 1) for b in RATING_BANDS}


def _good_or_above_pct(counts: Counter[str]) -> float | None:
    total = sum(counts.values())
    if not total:
        return None
    good_plus = counts.get("Good", 0) + counts.get("Outstanding", 0)
    return round(good_plus / total * 100, 1)


def _per_100(numerator: int, denominator: int) -> float | None:
    if not denominator:
        return None
    return round(numerator / denominator * 100, 1)


def main() -> None:
    pop = json.loads((RAW / "ons_pop_extract.json").read_text(encoding="utf-8"))
    region_pop: dict[str, int] = pop["region_pop"]
    region_65: dict[str, int] = pop["region_65"]
    la_pop: dict[str, int] = pop["la_pop"]
    la_65: dict[str, int] = pop["la_65"]

    print("[1/3] parsing hsca_active.ods (active locations, ~57.7k rows) ...")
    active_by_region, active_by_la, active_extra = parse_active(RAW / "hsca_active.ods")
    print(f"  {active_extra}")

    since = dt.date.today() - dt.timedelta(days=365)
    print(f"[2/3] parsing deactivated.ods (churn since {since.isoformat()}) ...")
    deact_by_region, deact_by_la, deact_total = parse_deactivated(RAW / "deactivated.ods", since)
    print(f"  care-home deactivations in window: {deact_total}")

    print("[3/3] parsing ratings.ods (5-domain breakdown, care homes only) ...")
    domain_ratings = parse_domain_ratings(RAW / "ratings.ods")
    for d, c in domain_ratings.items():
        print(f"  {d}: {dict(c.most_common())}")

    # ---- Merge region-level ----
    all_regions = sorted(set(active_by_region) | set(deact_by_region))
    regions_out = []
    for region in all_regions:
        ab = active_by_region.get(region, Bucket())
        db = deact_by_region.get(region, Bucket())
        ons_key = _region_key(region)
        pop_65 = region_65.get(ons_key)
        pop_all = region_pop.get(ons_key)
        care_homes = ab.care_homes
        churn_base = care_homes + db.deactivations_12m
        regions_out.append({
            "region": region,
            "active_care_homes": care_homes,
            "beds_total": ab.beds,
            "dormant_care_homes": ab.dormant_care_homes,
            "population_65_plus": pop_65,
            "population_total": pop_all,
            "beds_per_100_over65": _per_100(ab.beds, pop_65) if pop_65 else None,
            "care_homes_per_100k_over65": (
                round(care_homes / pop_65 * 100_000, 1) if pop_65 else None
            ),
            "rating_pct": _rating_pct(ab.rating_counts),
            "good_or_above_pct": _good_or_above_pct(ab.rating_counts),
            "deactivations_12m": db.deactivations_12m,
            "beds_lost_12m": db.beds_lost_12m,
            "churn_rate_pct": _per_100(db.deactivations_12m, churn_base) if churn_base else None,
        })
    regions_out.sort(key=lambda r: r["region"])

    # ---- Merge LA-level (only LAs present in ONS population extract) ----
    all_las = sorted(set(active_by_la) | set(deact_by_la))
    las_out = []
    unmatched_las = []
    for la in all_las:
        if la not in la_pop:
            unmatched_las.append(la)
            continue
        ab = active_by_la.get(la, Bucket())
        db = deact_by_la.get(la, Bucket())
        pop_65 = la_65.get(la)
        pop_all = la_pop.get(la)
        care_homes = ab.care_homes
        churn_base = care_homes + db.deactivations_12m
        las_out.append({
            "local_authority": la,
            "active_care_homes": care_homes,
            "beds_total": ab.beds,
            "population_65_plus": pop_65,
            "population_total": pop_all,
            "beds_per_100_over65": _per_100(ab.beds, pop_65) if pop_65 else None,
            "good_or_above_pct": _good_or_above_pct(ab.rating_counts),
            "deactivations_12m": db.deactivations_12m,
            "churn_rate_pct": _per_100(db.deactivations_12m, churn_base) if churn_base else None,
        })
    las_out.sort(key=lambda r: r["local_authority"])

    # ---- National headline ----
    national_care_homes = sum(r["active_care_homes"] for r in regions_out)
    national_beds = sum(r["beds_total"] for r in regions_out)
    national_dormant = sum(r["dormant_care_homes"] for r in regions_out)
    national_pop_65 = sum(v for v in region_65.values())
    national_rating_counts: Counter[str] = Counter()
    for region in active_by_region.values():
        national_rating_counts.update(region.rating_counts)
    national_deact = sum(r["deactivations_12m"] for r in regions_out)
    national_beds_lost = sum(r["beds_lost_12m"] for r in regions_out)
    national_churn_base = national_care_homes + national_deact

    # Care deserts: LAs with >=5 care homes (avoid noisy small-N), lowest beds-per-100-over65
    eligible_for_desert = [r for r in las_out if r["active_care_homes"] >= 5 and r["beds_per_100_over65"] is not None]
    care_deserts = sorted(eligible_for_desert, key=lambda r: r["beds_per_100_over65"])[:10]
    best_provided = sorted(eligible_for_desert, key=lambda r: -r["beds_per_100_over65"])[:10]

    snapshot = {
        "meta": {
            "title": "UK Care Home Density & Quality Index",
            "description": (
                "Beds-per-capita, CQC rating-band distribution and closure/deactivation churn "
                "for England's registered care homes, by region and local authority, cross-referenced "
                "with ONS mid-2024 population estimates."
            ),
            "coverage": "England (CQC-registered care homes only)",
            "generated_at": dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "pull_date": PULL_DATE,
            "churn_window": {"from": since.isoformat(), "to": PULL_DATE},
            "licence": "Open Government Licence v3.0",
            "sources": [
                {
                    "name": "CQC HSCA Active Locations (directory with filters and ratings)",
                    "publisher": "Care Quality Commission",
                    "url": "https://www.cqc.org.uk/about-us/transparency/using-cqc-data",
                    "licence": "Open Government Licence v3.0",
                    "cadence": "Monthly",
                },
                {
                    "name": "CQC Deactivated Locations",
                    "publisher": "Care Quality Commission",
                    "url": "https://www.cqc.org.uk/about-us/transparency/using-cqc-data",
                    "licence": "Open Government Licence v3.0",
                    "cadence": "Monthly",
                },
                {
                    "name": "CQC ratings by domain (Safe, Effective, Caring, Responsive, Well-led)",
                    "publisher": "Care Quality Commission",
                    "url": "https://www.cqc.org.uk/about-us/transparency/using-cqc-data",
                    "licence": "Open Government Licence v3.0",
                    "cadence": "Monthly",
                },
                {
                    "name": "Mid-2024 population estimates (MYE24), local authority districts, England",
                    "publisher": "Office for National Statistics",
                    "url": "https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates/bulletins/annualmidyearpopulationestimates/mid2024",
                    "licence": "Open Government Licence v3.0",
                    "vintage": "Mid-2024 (published 2025)",
                },
            ],
            "attribution": (
                "UK Care Home Density & Quality Index data compiled from CQC open data and ONS "
                "mid-2024 population estimates (Open Government Licence v3.0). Free to cite with "
                "attribution to Care Home Tax."
            ),
            "methodology": (
                "Scope is CQC-registered care homes in England ('Care home?' = Y in the CQC HSCA "
                "Active Locations extract), which have a bed count and an overall CQC rating. "
                "Domiciliary care, supported living and other adult-social-care location types do "
                "not have bed counts and are outside this index (see the Care Provider Business "
                "Index for the Companies House incorporation view of the full care sector). Region "
                "and local authority are the CQC-assigned fields on each active location record. "
                "Population denominators are ONS mid-2024 (MYE24) local authority district and "
                "region population estimates, all ages and 65-and-over. Beds-per-100-over-65 is a "
                "density proxy: some care home beds serve working-age residents (learning "
                "disability, mental health, physical disability services), so it is not a literal "
                "elderly-bed-occupancy ratio. Closure/deactivation churn counts CQC 'HSCA End Date' "
                f"deactivations of care homes in the trailing 12 months to {PULL_DATE}; a "
                "deactivation on the CQC register can reflect a change of registered provider or "
                "relocation as well as an outright closure, so churn should be read as registration "
                "turnover, not solely business failure."
            ),
            "caveats": [
                "England only. CQC does not regulate care homes in Scotland, Wales or Northern Ireland.",
                f"{active_extra['total_care_homes']:,} active care home locations at pipeline pull date "
                f"{PULL_DATE}; CQC's directory refreshes monthly and does not carry a single as-of date "
                "per file (individual rows show their last inspection publication date, which can be "
                "several years old for homes not recently re-inspected).",
                f"{national_dormant:,} of the active care homes ({_per_100(national_dormant, national_care_homes)}%) "
                "are flagged dormant (registered but not currently operating, e.g. a newly registered "
                "home not yet open); these are included in location and bed counts, which therefore "
                "slightly overstate current operating capacity.",
                "Beds-per-100-over-65 is a density proxy, not an occupancy or exact-need ratio: some "
                "care home beds serve working-age adults, not people aged 65 and over.",
                (
                    "Local-authority figures are shown only where the CQC-assigned local authority "
                    "name matches an ONS mid-2024 population estimate; "
                    + (
                        f"{len(unmatched_las)} local-authority label(s) in the CQC extract did not "
                        "match (excluded from the local-authority table, included in region and "
                        "national totals): " + ", ".join(sorted(x for x in unmatched_las if x)) + "."
                        if unmatched_las
                        else "all local authorities with at least one active care home matched."
                    )
                ),
                "Rating bands combine CQC's 'Not Rated', 'Insufficient evidence to rate' and blank "
                "values into a single 'Not yet rated' category (recently registered homes, or homes "
                "not yet inspected under the current framework).",
                "Care-desert and best-provided local authority lists require at least 5 active care "
                "homes in that local authority, to avoid single-home local authorities distorting a "
                "per-capita ratio.",
                "Closure/deactivation figures aggregate by region and local authority only. No "
                "individual care home or provider is named anywhere in this dataset or page.",
            ],
        },
        "national": {
            "active_care_homes": national_care_homes,
            "beds_total": national_beds,
            "dormant_care_homes": national_dormant,
            "population_65_plus": national_pop_65,
            "beds_per_100_over65": _per_100(national_beds, national_pop_65),
            "rating_pct": _rating_pct(national_rating_counts),
            "good_or_above_pct": _good_or_above_pct(national_rating_counts),
            "deactivations_12m": national_deact,
            "beds_lost_12m": national_beds_lost,
            "churn_rate_pct": _per_100(national_deact, national_churn_base) if national_churn_base else None,
        },
        "domain_ratings": {
            domain: {
                "rating_pct": _rating_pct(counts),
                "good_or_above_pct": _good_or_above_pct(counts),
            }
            for domain, counts in domain_ratings.items()
        },
        "regions": regions_out,
        "care_deserts": care_deserts,
        "best_provided_local_authorities": best_provided,
        "local_authorities": las_out,
        "rating_bands": RATING_BANDS,
    }

    OUT.write_text(json.dumps(snapshot, indent=2) + "\n", encoding="utf-8")
    print(f"\n[done] wrote {OUT} ({OUT.stat().st_size / 1024:.0f} KB)")
    print(f"  national active care homes: {national_care_homes:,}")
    print(f"  national beds: {national_beds:,}")
    print(f"  national beds per 100 over-65: {snapshot['national']['beds_per_100_over65']}")
    print(f"  national rating pct: {snapshot['national']['rating_pct']}")
    print(f"  national churn rate (12m): {snapshot['national']['churn_rate_pct']}%")
    print(f"  regions: {len(regions_out)}, local authorities matched: {len(las_out)}, unmatched: {len(unmatched_las)}")


if __name__ == "__main__":
    main()
