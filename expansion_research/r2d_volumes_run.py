"""R2d: UK search volumes for 76 expansion niches via Google Ads search_volume (batch).

Usage:
  python expansion_research/r2d_volumes_run.py probe   # 10-keyword probe (1 paid call)
  python expansion_research/r2d_volumes_run.py full    # remaining keywords (1 paid call)
  python expansion_research/r2d_volumes_run.py report  # build r2d_volumes.json + R2D_VOLUMES.md (free)

All paid calls go through DataForSEOClient._post_paid (CostTracker + api_cost_log).
Raw responses saved to expansion_research/r2d_raw_<mode>.json so re-analysis is free.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from optimisation_engine.clients.dataforseo_client import DataForSEOClient
from optimisation_engine.config import (
    DATAFORSEO_LANGUAGE_CODE_EN,
    DATAFORSEO_LOCATION_CODE_UK,
)

HERE = Path(__file__).parent

# 13 R2c EXCLUDE rows skipped: 1,2,3,8,9,15,16,17,28,29,30,31,48
# ponytail: variants hand-curated; natural register per phase-9 volume=0 lesson.
NICHES: dict[int, tuple[str, list[str]]] = {
    4:  ("Property developers", ["accountants for property developers", "property developer accountant", "property development accountant", "property development tax"]),
    5:  ("Property management companies", ["accountants for property management companies", "property management accountant", "block management accountant"]),
    6:  ("Estate & letting agents", ["accountants for estate agents", "estate agent accountant", "letting agent accountant", "accountants for letting agents"]),
    7:  ("Landed estates / rural estates", ["rural accountant", "landed estate accountant", "accountants for rural businesses", "rural estate accountant"]),
    10: ("Plumbers / heating engineers", ["accountant for plumbers", "accountants for plumbers", "plumber accountant", "plumbing business accountant", "plumber tax"]),
    11: ("Electricians", ["accountant for electricians", "accountants for electricians", "electrician accountant", "electrician tax"]),
    12: ("Painters & decorators", ["accountant for painters and decorators", "accountants for decorators", "decorator accountant", "painter and decorator tax"]),
    13: ("Landscapers / gardeners", ["accountant for landscapers", "landscaper accountant", "accountants for gardeners", "landscaping business accountant"]),
    14: ("Tradespeople (family)", ["accountant for tradesmen", "accountants for tradespeople", "tradesman accountant", "trade accountant", "tradesman tax"]),
    18: ("Locum pharmacists", ["accountant for locum pharmacists", "locum pharmacist accountant", "locum pharmacist tax"]),
    19: ("Pharmacies", ["accountant for pharmacists", "accountants for pharmacies", "pharmacy accountant", "pharmacist accountant"]),
    20: ("Opticians / optometrists", ["accountant for opticians", "accountants for opticians", "optician accountant", "optometrist accountant"]),
    21: ("Vets", ["accountant for vets", "accountants for veterinary practices", "vet accountant", "veterinary accountant"]),
    22: ("Therapists & allied health", ["accountant for therapists", "therapist accountant", "physiotherapist accountant", "accountants for psychologists", "accountants for counsellors"]),
    23: ("Nurses / healthcare professionals", ["accountant for nurses", "accountants for nurses", "nurse accountant", "accountants for healthcare professionals"]),
    24: ("Care homes", ["accountant for care homes", "accountants for care homes", "care home accountant", "care home tax"]),
    25: ("Domiciliary care agencies", ["accountant for care agencies", "domiciliary care accountant", "home care agency accountant"]),
    26: ("Childminders / nurseries", ["accountant for childminders", "childminder accountant", "childminder tax", "nursery accountant", "accountants for nurseries"]),
    27: ("Foster carers", ["accountant for foster carers", "foster carer accountant", "foster carer tax", "foster care tax"]),
    32: ("Management consultants", ["accountant for consultants", "accountants for management consultants", "consultant accountant", "consultancy accountant"]),
    33: ("Startups", ["accountant for startups", "accountants for startups", "startup accountant", "start up accountant"]),
    34: ("Tech / SaaS companies", ["accountant for tech companies", "saas accountant", "tech accountant", "accountants for saas companies", "software company accountant"]),
    35: ("Ecommerce sellers", ["accountant for ecommerce", "ecommerce accountant", "accountants for online sellers", "shopify accountant", "ecommerce tax"]),
    36: ("Amazon FBA sellers", ["accountant for amazon sellers", "amazon seller accountant", "amazon fba accountant", "fba accountant"]),
    37: ("Content creators / influencers", ["accountant for content creators", "accountant for influencers", "influencer accountant", "youtuber accountant", "influencer tax"]),
    38: ("OnlyFans creators", ["accountant for onlyfans", "onlyfans accountant", "onlyfans tax", "onlyfans tax accountant"]),
    39: ("Crypto traders / investors", ["crypto accountant", "crypto tax accountant", "accountant for crypto", "cryptocurrency accountant", "crypto tax uk"]),
    40: ("Day / forex traders", ["accountant for day traders", "day trader accountant", "forex trader accountant", "accountants for traders", "trader tax"]),
    41: ("Musicians", ["accountant for musicians", "accountants for musicians", "musician accountant", "music accountant"]),
    42: ("Actors / entertainment industry", ["accountant for actors", "accountants for actors", "actor accountant", "entertainment accountant"]),
    43: ("Film & TV production", ["film accountant", "accountants for film industry", "tv production accountant", "media accountant"]),
    44: ("Artists / creatives", ["accountant for artists", "artist accountant", "accountants for creatives", "creative industry accountant"]),
    45: ("Authors / writers", ["accountant for authors", "author accountant", "accountant for writers", "writer accountant"]),
    46: ("Photographers", ["accountant for photographers", "accountants for photographers", "photographer accountant", "photographer tax"]),
    47: ("Interior designers", ["accountant for interior designers", "interior designer accountant", "accountants for designers"]),
    49: ("Recruitment agencies", ["accountant for recruitment agencies", "recruitment agency accountant", "recruitment accountant", "accountants for recruiters"]),
    50: ("Architects", ["accountant for architects", "accountants for architects", "architect accountant", "architect tax"]),
    51: ("Engineers / engineering consultants", ["accountant for engineers", "accountants for engineering companies", "engineer accountant", "engineering accountant"]),
    52: ("Financial advisers / FCA firms", ["accountant for financial advisers", "accountants for financial advisors", "ifa accountant", "financial adviser accountant"]),
    53: ("Restaurants", ["accountant for restaurants", "accountants for restaurants", "restaurant accountant", "restaurant accountants", "restaurant tax"]),
    54: ("Takeaways", ["accountant for takeaways", "accountants for takeaways", "takeaway accountant", "takeaway tax"]),
    55: ("Pubs & bars", ["accountant for pubs", "accountants for pubs", "pub accountant", "bar accountant"]),
    56: ("Hotels & guesthouses", ["accountant for hotels", "accountants for hotels", "hotel accountant", "bed and breakfast accountant"]),
    57: ("Hospitality (family)", ["hospitality accountant", "accountants for hospitality", "hospitality accounting", "hospitality tax"]),
    58: ("Event caterers", ["accountant for caterers", "catering accountant", "caterer accountant"]),
    59: ("Travel agents / tour operators", ["accountant for travel agents", "travel agent accountant", "tour operator accountant", "toms vat accountant"]),
    60: ("Hairdressers / barbers / beauty", ["accountant for hairdressers", "hairdresser accountant", "accountant for beauty salons", "salon accountant", "barber accountant"]),
    61: ("Gyms / fitness / personal trainers", ["accountant for personal trainers", "personal trainer accountant", "gym accountant", "accountants for gyms"]),
    62: ("Sports clubs", ["accountant for sports clubs", "sports club accountant", "football club accountant"]),
    63: ("Footballers / sports professionals", ["accountant for footballers", "footballer accountant", "accountants for athletes", "sports accountant"]),
    64: ("Taxi & private-hire drivers", ["accountant for taxi drivers", "taxi driver accountant", "taxi accountant", "uber driver accountant", "accountants for uber drivers"]),
    65: ("Couriers / delivery drivers", ["accountant for couriers", "courier accountant", "accountant for delivery drivers", "delivery driver tax"]),
    66: ("Hauliers / trucking", ["accountant for hauliers", "haulage accountant", "accountants for haulage companies", "truck driver accountant", "transport accountant"]),
    67: ("Pilots / aviation", ["accountant for pilots", "accountants for pilots", "pilot accountant", "aviation accountant"]),
    68: ("Farmers / agriculture", ["accountant for farmers", "accountants for farmers", "farm accountant", "farm accountants", "agricultural accountant"]),
    69: ("Retail / independent shops", ["accountant for retail business", "retail accountant", "accountants for retailers", "shop accountant"]),
    70: ("Used car dealers / automotive", ["accountant for car dealers", "car dealer accountant", "motor trade accountant", "accountants for car dealerships"]),
    71: ("Jewellers", ["accountant for jewellers", "jeweller accountant", "jewellery business accountant"]),
    72: ("Cake makers / food producers", ["accountant for food business", "food and drink accountant", "food manufacturer accountant", "accountants for food producers"]),
    73: ("Manufacturing", ["accountant for manufacturers", "manufacturing accountant", "accountants for manufacturing companies"]),
    74: ("Charities / non-profits", ["accountant for charities", "accountants for charities", "charity accountant", "charity accountants", "charity accounting"]),
    75: ("CICs / social enterprises", ["accountant for cic", "cic accountant", "community interest company accountant", "social enterprise accountant"]),
    76: ("Churches / religious organisations", ["accountant for churches", "accountants for churches", "church accountant"]),
    77: ("Schools & academies", ["accountant for schools", "school accountant", "academy accountant", "accountants for academies"]),
    78: ("Tutors / private teachers", ["accountant for tutors", "tutor accountant", "private tutor tax"]),
    79: ("Driving instructors", ["accountant for driving instructors", "driving instructor accountant", "driving instructor tax"]),
    80: ("Expats / non-residents", ["accountant for expats", "expat accountant", "expat tax accountant", "uk expat tax", "non resident accountant"]),
    81: ("High-net-worth individuals", ["accountant for high net worth individuals", "high net worth accountant", "private client accountant", "wealth accountant"]),
    82: ("Franchisees", ["accountant for franchisees", "franchise accountant", "accountants for franchises"]),
    83: ("Virtual assistants", ["accountant for virtual assistants", "virtual assistant accountant", "virtual assistant tax"]),
    84: ("Neurodivergent business owners", ["accountant for neurodivergent", "neurodivergent accountant", "adhd accountant", "accountants for neurodivergent business owners"]),
    85: ("Energy & renewables", ["accountant for oil and gas contractors", "oil and gas accountant", "renewable energy accountant", "energy accountant"]),
    86: ("Life sciences / pharma", ["accountant for pharma", "life sciences accountant", "pharmaceutical accountant", "biotech accountant"]),
    87: ("Maritime / seafarers", ["accountant for seafarers", "seafarer accountant", "seafarers earnings deduction", "seafarer tax", "maritime accountant"]),
    88: ("Security firms", ["accountant for security companies", "security company accountant", "security business accountant"]),
    89: ("Cleaning businesses", ["accountant for cleaners", "cleaning business accountant", "accountants for cleaning companies", "cleaner tax"]),
}

CANARY = ["accountant for landlords", "landlord accountant"]  # niche 0, validation only

ENDPOINT = "keywords_data/google_ads/search_volume/live"


def all_keywords() -> list[str]:
    kws = list(CANARY)
    for _, terms in NICHES.values():
        kws.extend(terms)
    # dedupe preserving order
    seen: set[str] = set()
    return [k for k in kws if not (k in seen or seen.add(k))]


PROBE_KEYWORDS = CANARY + NICHES[68][1] + NICHES[39][1][:3]  # canary + farmers + crypto = 10


def run_call(keywords: list[str], tag: str) -> dict:
    client = DataForSEOClient()
    payload = [{
        "keywords": keywords,
        "location_code": DATAFORSEO_LOCATION_CODE_UK,
        "language_code": DATAFORSEO_LANGUAGE_CODE_EN,
    }]
    body = client._post_paid(
        # ponytail: site_key=None — api_cost_log.site_key FKs public.sites and
        # 'expansion' is not a site; the run is identified by seed_keyword tag.
        ENDPOINT, payload, site_key=None,
        expected_rows=len(keywords),
        seed_keyword=f"r2d_{tag}:{len(keywords)}kw",
    )
    (HERE / f"r2d_raw_{tag}.json").write_text(json.dumps(body, indent=2), encoding="utf-8")
    task = body["tasks"][0]
    print(f"status_code={body.get('status_code')} task_status={task.get('status_code')} "
          f"cost=${body.get('cost')} keywords={len(keywords)}")
    for item in (task.get("result") or [])[:12]:
        print(f"  {item.get('keyword')!r:60} vol={item.get('search_volume')} "
              f"cpc={item.get('cpc')} comp={item.get('competition')} loc={item.get('location_code')}")
    return body


def collect_items() -> list[dict]:
    items = []
    for tag in ("probe", "full"):
        p = HERE / f"r2d_raw_{tag}.json"
        if p.exists():
            body = json.loads(p.read_text(encoding="utf-8"))
            for t in body.get("tasks", []):
                items.extend(t.get("result") or [])
    return items


def report() -> None:
    by_kw = {i["keyword"].lower(): i for i in collect_items()}
    rows, niche_rows = [], []
    kw_to_niche = {k.lower(): (nid, name) for nid, (name, terms) in NICHES.items() for k in terms}
    for k in CANARY:
        kw_to_niche[k.lower()] = (0, "CANARY (landlords, excluded niche)")
    missing = [k for k in (kw.lower() for kw in all_keywords()) if k not in by_kw]
    for kw, (nid, name) in kw_to_niche.items():
        i = by_kw.get(kw)
        rows.append({
            "keyword": kw, "niche_id": nid, "niche": name,
            "volume": (i or {}).get("search_volume"),
            "cpc": (i or {}).get("cpc"),
            "competition": (i or {}).get("competition"),
            "returned": i is not None,
        })
    (HERE / "r2d_volumes.json").write_text(json.dumps(rows, indent=2), encoding="utf-8")

    for nid, (name, terms) in sorted(NICHES.items()):
        nrows = [r for r in rows if r["niche_id"] == nid]
        vols = [(r["volume"] or 0) for r in nrows]
        best = max(nrows, key=lambda r: r["volume"] or 0)
        cpcs = [r["cpc"] for r in nrows if r["cpc"]]
        niche_rows.append({
            "id": nid, "niche": name, "cluster_volume": sum(vols),
            "best_term": best["keyword"], "best_volume": best["volume"] or 0,
            "max_cpc": max(cpcs) if cpcs else None,
            "n_terms": len(nrows), "n_zero": sum(1 for v in vols if v == 0),
        })
    niche_rows.sort(key=lambda r: -r["cluster_volume"])

    md = ["# R2D — UK head-term search volumes (76 niches)", "",
          "Google Ads search_volume, location_code 2826 (UK), 2026-07-11.",
          "Cluster volume = sum across 3-5 head-term variants (close variants may be",
          "grouped by Google Ads, so treat as demand-order signal, not additive truth).",
          "Skipped 13 R2c EXCLUDE niches (own-estate overlap): 1,2,3,8,9,15,16,17,28,29,30,31,48.", "",
          f"Keywords requested: {len(all_keywords())}. Missing from response: {len(missing)}"
          + (f" ({', '.join(missing[:10])})" if missing else "") + ".", "",
          "| Rank | # | Niche | Cluster vol | Best term | Best vol | Max CPC | Zero-vol terms |",
          "|---|---|---|---|---|---|---|---|"]
    for rank, r in enumerate(niche_rows, 1):
        cpc = f"${r['max_cpc']:.2f}" if r["max_cpc"] else "-"
        md.append(f"| {rank} | {r['id']} | {r['niche']} | {r['cluster_volume']:,} | "
                  f"{r['best_term']} | {r['best_volume']:,} | {cpc} | {r['n_zero']}/{r['n_terms']} |")
    md += ["", "## Anomalies", "",
           "- (filled by post-run verification)", ""]
    (HERE / "R2D_VOLUMES.md").write_text("\n".join(md), encoding="utf-8")
    print(f"[OK] {len(rows)} keyword rows -> r2d_volumes.json; {len(niche_rows)} niches -> R2D_VOLUMES.md")
    for r in niche_rows[:15]:
        print(f"  {r['cluster_volume']:>7,}  #{r['id']:<3} {r['niche']}  (best: {r['best_term']} {r['best_volume']:,})")


if __name__ == "__main__":
    mode = sys.argv[1] if len(sys.argv) > 1 else "report"
    if mode == "probe":
        run_call(PROBE_KEYWORDS, "probe")
    elif mode == "full":
        probe_set = {k.lower() for k in PROBE_KEYWORDS}
        remaining = [k for k in all_keywords() if k.lower() not in probe_set]
        run_call(remaining, "full")
    else:
        report()
