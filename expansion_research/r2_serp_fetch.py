"""R2a SERP-composition fetch. Serper (gl=gb) primary, DDG fallback.

Resume-able: caches per-query results in r2_serp_raw.json; re-run safely.
NO DataForSEO calls.
"""
from __future__ import annotations

import json
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from optimisation_engine import config  # noqa: F401  (loads .env)
from optimisation_engine.clients.serper_client import SERPER_API_KEY, SERPER_URL, _domain_of

import httpx

HERE = Path(__file__).parent
RAW = HERE / "r2_serp_raw.json"

# niche # -> (canonical name, [query variants]) — phrasing adapted per niche register
NICHES = {
    1: ("Landlords (buy-to-let)", ["accountant for landlords", "landlord tax accountant", "buy to let accountant"]),
    2: ("Property investors", ["accountant for property investors", "property investment accountant", "property investor tax advisor"]),
    3: ("Airbnb / holiday-let hosts", ["airbnb accountant uk", "holiday let accountant", "accountant for serviced accommodation"]),
    4: ("Property developers", ["accountant for property developers", "property developer accountant", "property development tax advisor"]),
    5: ("Property management companies", ["accountant for property management companies", "block management accountant", "property management company accountant"]),
    6: ("Estate & letting agents", ["accountant for estate agents", "letting agent accountant", "estate agency accountant"]),
    7: ("Landed estates / rural estates", ["landed estate accountant", "rural estate accountants", "accountants for rural businesses"]),
    8: ("Construction / CIS subcontractors", ["CIS accountant", "accountant for construction industry", "CIS subcontractor tax return"]),
    9: ("Builders", ["accountant for builders", "builders accountant", "tax advisor for builders"]),
    10: ("Plumbers / heating engineers", ["accountant for plumbers", "plumber accountant", "accountant for heating engineers"]),
    11: ("Electricians", ["accountant for electricians", "electrician accountant", "self employed electrician tax"]),
    12: ("Painters & decorators", ["accountant for painters and decorators", "decorator accountant", "self employed decorator tax"]),
    13: ("Landscapers / gardeners", ["accountant for landscapers", "accountant for gardeners", "landscaping business accountant"]),
    14: ("Tradespeople (family)", ["accountant for tradesmen", "trades accountant", "accountant for tradespeople"]),
    15: ("Dentists", ["dental accountant", "accountant for dentists", "dental practice accountant"]),
    16: ("Doctors / GPs", ["medical accountant", "accountant for doctors", "GP practice accountant"]),
    17: ("Locum doctors", ["locum doctor accountant", "accountant for locum doctors", "locum GP limited company accountant"]),
    18: ("Locum pharmacists", ["locum pharmacist accountant", "accountant for locum pharmacists"]),
    19: ("Pharmacies", ["pharmacy accountant", "accountant for pharmacists", "community pharmacy accountant"]),
    20: ("Opticians / optometrists", ["optician accountant", "accountant for opticians", "optometrist accountant uk"]),
    21: ("Vets", ["veterinary accountant", "accountant for vets", "vet practice accountant"]),
    22: ("Therapists & allied health", ["accountant for therapists", "accountant for physiotherapists", "accountant for private practice therapists"]),
    23: ("Nurses / healthcare professionals", ["accountant for nurses", "agency nurse tax return", "accountant for healthcare professionals"]),
    24: ("Care homes", ["care home accountant", "accountant for care homes", "care sector accountants"]),
    25: ("Domiciliary care agencies", ["accountant for domiciliary care", "home care agency accountant", "accountants for care agencies"]),
    26: ("Childminders / nurseries", ["accountant for childminders", "nursery accountant", "childcare business accountant"]),
    27: ("Foster carers", ["accountant for foster carers", "foster carer tax return", "foster carer tax advisor"]),
    28: ("Solicitors / law firms", ["accountant for solicitors", "law firm accountant", "solicitors accountants SRA"]),
    29: ("Barristers", ["accountant for barristers", "barrister accountant", "barristers tax advisor"]),
    30: ("IT contractors", ["contractor accountant", "accountant for IT contractors", "limited company contractor accountant"]),
    31: ("Freelancers", ["accountant for freelancers", "freelancer accountant", "freelance tax advisor uk"]),
    32: ("Management consultants", ["accountant for consultants", "management consultant accountant", "accountant for consultancy business"]),
    33: ("Startups", ["startup accountant", "accountant for startups", "accountants for new businesses"]),
    34: ("Tech / SaaS companies", ["accountant for tech companies", "SaaS accountant uk", "accountants for technology businesses"]),
    35: ("Ecommerce sellers", ["ecommerce accountant", "accountant for online sellers", "accountant for shopify sellers"]),
    36: ("Amazon FBA sellers", ["amazon fba accountant", "accountant for amazon sellers", "amazon seller accountant uk"]),
    37: ("Content creators / influencers", ["accountant for content creators", "influencer accountant", "accountant for youtubers"]),
    38: ("OnlyFans creators", ["onlyfans accountant", "accountant for onlyfans creators", "onlyfans tax uk accountant"]),
    39: ("Crypto traders / investors", ["crypto accountant uk", "cryptocurrency tax accountant", "accountant for crypto investors"]),
    40: ("Day / forex traders", ["accountant for day traders uk", "forex trader tax accountant", "accountant for traders"]),
    41: ("Musicians", ["accountant for musicians", "musician accountant", "music industry accountant"]),
    42: ("Actors / entertainment industry", ["accountant for actors", "entertainment industry accountant", "accountant for performers"]),
    43: ("Film & TV production", ["film production accountant", "accountant for film industry", "TV production accountancy"]),
    44: ("Artists / creatives", ["accountant for artists", "accountant for creatives", "creative industry accountant"]),
    45: ("Authors / writers", ["accountant for authors", "accountant for writers", "freelance writer tax accountant"]),
    46: ("Photographers", ["accountant for photographers", "photographer accountant", "self employed photographer tax"]),
    47: ("Interior designers", ["accountant for interior designers", "interior design accountant", "accountant for designers"]),
    48: ("Marketing agencies", ["accountant for marketing agencies", "digital agency accountant", "accountant for creative agencies"]),
    49: ("Recruitment agencies", ["accountant for recruitment agencies", "recruitment agency accountant", "recruiter accountant"]),
    50: ("Architects", ["accountant for architects", "architect accountant", "accountants for architecture practices"]),
    51: ("Engineers / engineering consultants", ["accountant for engineers", "engineering consultant accountant", "accountant for engineering companies"]),
    52: ("Financial advisers / FCA-regulated firms", ["accountant for financial advisers", "accountant for FCA regulated firms", "IFA accountant"]),
    53: ("Restaurants", ["restaurant accountant", "accountant for restaurants", "hospitality accountant restaurant"]),
    54: ("Takeaways", ["accountant for takeaways", "takeaway accountant", "fast food business accountant"]),
    55: ("Pubs & bars", ["accountant for pubs", "pub accountant", "accountant for bars"]),
    56: ("Hotels & guesthouses", ["hotel accountant", "accountant for hotels", "accountant for bed and breakfast"]),
    57: ("Hospitality (family)", ["hospitality accountant", "accountant for hospitality business", "hospitality and leisure accountants"]),
    58: ("Event caterers", ["accountant for caterers", "catering business accountant", "accountant for events business"]),
    59: ("Travel agents / tour operators", ["accountant for travel agents", "travel agency accountant", "TOMS VAT accountant"]),
    60: ("Hairdressers / barbers / beauty", ["accountant for hairdressers", "salon accountant", "accountant for beauty salons"]),
    61: ("Gyms / fitness / personal trainers", ["accountant for personal trainers", "gym accountant", "accountant for fitness professionals"]),
    62: ("Sports clubs", ["accountant for sports clubs", "sports club accountant", "football club accountants"]),
    63: ("Footballers / sports professionals", ["accountant for footballers", "accountant for professional athletes", "sports professional tax advisor"]),
    64: ("Taxi & private-hire drivers", ["accountant for taxi drivers", "taxi driver accountant", "uber driver tax return uk"]),
    65: ("Couriers / delivery drivers", ["accountant for couriers", "delivery driver accountant", "self employed courier tax return"]),
    66: ("Hauliers / trucking", ["accountant for hauliers", "haulage accountant", "accountant for transport business"]),
    67: ("Pilots / aviation", ["accountant for pilots", "pilot tax advisor uk", "aviation accountant"]),
    68: ("Farmers / agriculture", ["accountant for farmers", "farm accountant", "agricultural accountants"]),
    69: ("Retail / independent shops", ["accountant for retail business", "retail accountant", "accountant for shops"]),
    70: ("Used car dealers / automotive", ["accountant for car dealers", "motor trade accountant", "used car dealer accountant"]),
    71: ("Jewellers", ["accountant for jewellers", "jewellery business accountant"]),
    72: ("Cake makers / food producers", ["accountant for food producers", "food and drink accountant", "accountant for food business"]),
    73: ("Manufacturing", ["accountant for manufacturers", "manufacturing accountant", "accountants for manufacturing companies"]),
    74: ("Charities / non-profits", ["charity accountant", "accountant for charities", "not for profit accountants"]),
    75: ("CICs / social enterprises", ["CIC accountant", "accountant for community interest companies", "social enterprise accountant"]),
    76: ("Churches / religious organisations", ["accountant for churches", "church accountant uk", "accountants for religious organisations"]),
    77: ("Schools & academies", ["academy accountant", "accountant for schools", "academy trust auditors"]),
    78: ("Tutors / private teachers", ["accountant for tutors", "private tutor tax return", "self employed tutor accountant"]),
    79: ("Driving instructors", ["accountant for driving instructors", "driving instructor accountant", "driving instructor tax return"]),
    80: ("Expats / non-residents", ["accountant for expats uk", "expat tax accountant", "non resident tax advisor uk"]),
    81: ("High-net-worth individuals", ["accountant for high net worth individuals", "private client tax advisor", "HNW tax accountant"]),
    82: ("Franchisees", ["accountant for franchisees", "franchise accountant", "accountant for franchise business"]),
    83: ("Virtual assistants", ["accountant for virtual assistants", "virtual assistant accountant", "VA business accountant"]),
    84: ("Neurodivergent business owners", ["accountant for neurodivergent business owners", "adhd friendly accountant", "accountant for adhd entrepreneurs"]),
    85: ("Energy & renewables", ["accountant for renewable energy companies", "energy sector accountant", "oil and gas contractor accountant"]),
    86: ("Life sciences / pharma", ["accountant for life sciences", "pharmaceutical company accountant", "biotech accountant uk"]),
    87: ("Maritime", ["seafarer tax accountant", "accountant for seafarers", "seafarers earnings deduction accountant"]),
    88: ("Security firms", ["accountant for security companies", "security firm accountant", "accountant for security guards"]),
    89: ("Cleaning businesses", ["accountant for cleaning business", "cleaner accountant", "accountant for cleaning companies"]),
}


def load_raw() -> dict:
    if RAW.exists():
        return json.loads(RAW.read_text(encoding="utf-8"))
    return {}


def save_raw(data: dict) -> None:
    RAW.write_text(json.dumps(data, indent=1, ensure_ascii=False), encoding="utf-8")


# ponytail: direct Serper call — CostTracker guard 409s on api_cost_log idempotency
# (prior run today already logged these keys); one-off research script, cost ~$0.27 total.
def fetch_query(client, q: str) -> list[dict]:
    r = httpx.post(SERPER_URL, headers={"X-API-KEY": SERPER_API_KEY, "Content-Type": "application/json"},
                   json={"q": q, "gl": "gb", "hl": "en", "num": 10}, timeout=20.0)
    r.raise_for_status()
    resp = r.json()
    out = []
    for item in (resp.get("organic") or [])[:10]:
        out.append({
            "position": item.get("position"),
            "title": item.get("title"),
            "link": item.get("link"),
            "snippet": item.get("snippet"),
            "domain": _domain_of(item.get("link") or ""),
        })
    return out


def main() -> None:
    data = load_raw()
    client = None
    n_calls = 0
    for num, (name, variants) in NICHES.items():
        key = str(num)
        entry = data.setdefault(key, {"niche": name, "queries": {}})
        for q in variants:
            if entry["queries"].get(q):
                continue
            try:
                results = fetch_query(client, q)
            except Exception as exc:
                print(f"[{num}] {q!r} FAILED: {exc}")
                results = []
            if results:
                entry["queries"][q] = results
                print(f"[{num}] {q!r} -> {len(results)} results")
            n_calls += 1
            save_raw(data)
            time.sleep(1.2)  # polite
    print(f"Done. {n_calls} calls this run.")


if __name__ == "__main__":
    main()
