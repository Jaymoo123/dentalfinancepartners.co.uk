"""R1: UK company-count magnitudes per candidate accounting niche via the
Companies House Advanced Search count endpoint (free, keyed).

For each sector we map plausible SIC codes (UK condensed SIC 2007) and pull
active-company hit counts. Note: sole traders / partnerships are NOT in CH, so
sectors dominated by unincorporated traders (landlords, tradesmen, taxi
drivers, locums) understate true audience — flagged in notes downstream.

Writes expansion_research/r1_sic_counts.json.
"""
import json
import os
import time

import httpx

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# minimal .env parse (no dotenv dependency guaranteed at repo root)
for line in open(os.path.join(ROOT, ".env"), encoding="utf-8"):
    if line.startswith("COMPANIES_HOUSE_API_KEY="):
        os.environ.setdefault("COMPANIES_HOUSE_API_KEY", line.split("=", 1)[1].strip())
CH_KEY = os.environ["COMPANIES_HOUSE_API_KEY"]
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "r1_sic_counts.json")

# sector -> SIC codes (condensed SIC 2007)
SECTORS: dict[str, list[str]] = {
    "dentists": ["86230"],
    "gps / private doctors": ["86210", "86220"],
    "other human health (physio, psychology, clinics)": ["86900"],
    "opticians": ["47782"],
    "pharmacies": ["47730"],
    "vets": ["75000"],
    "care homes": ["87100", "87300"],
    "domiciliary care agencies": ["88100"],
    "nurseries / childcare": ["88910"],
    "solicitors / legal": ["69102", "69109"],
    "barristers": ["69101"],
    "property landlords (letting own property)": ["68209", "68100"],
    "property management": ["68320"],
    "estate / letting agents": ["68310"],
    "construction of buildings": ["41202", "41100"],
    "plumbers / HVAC": ["43220"],
    "electricians": ["43210"],
    "painters / decorators": ["43341"],
    "roofers": ["43910"],
    "joiners / carpenters": ["43320"],
    "landscapers / gardeners": ["81300"],
    "cleaning businesses": ["81210", "81220"],
    "IT contractors / software dev": ["62012", "62020", "62090"],
    "management consultants": ["70229"],
    "marketing / advertising agencies": ["73110"],
    "architects": ["71111"],
    "engineering consultants": ["71121", "71129"],
    "recruitment agencies": ["78109", "78200", "78300"],
    "ecommerce / online retail": ["47910"],
    "restaurants": ["56101"],
    "takeaways": ["56103"],
    "pubs / bars": ["56302"],
    "hotels": ["55100"],
    "holiday lets / self catering": ["55209", "55202"],
    "cafes": ["56102"],
    "event catering": ["56210"],
    "travel agents / tour operators": ["79110", "79120"],
    "taxi / private hire": ["49320"],
    "couriers": ["53202"],
    "haulage / road freight": ["49410"],
    "farmers / agriculture": ["01110", "01410", "01500"],
    "hairdressers / beauty salons": ["96020"],
    "gyms / fitness": ["93130"],
    "sports clubs": ["93120"],
    "personal trainers / sports activities": ["93199", "85510"],
    "film / tv production": ["59111", "59112"],
    "performing artists / musicians": ["90010", "90020", "90030"],
    "photographers": ["74202", "74201", "74209"],
    "tutors / private education": ["85590", "85600"],
    "driving instructors": ["85530"],
    "charities / membership orgs (proxy)": ["94990"],
    "religious organisations": ["94910"],
    "security firms": ["80100"],
    "dental / medical labs": ["86901", "32500"],
    "financial advisers / intermediaries": ["66190", "66220"],
    "amazon-style wholesale (non-specialised)": ["46900"],
    "freelance designers": ["74100"],
    "translators": ["74300"],
}


def count(client: httpx.Client, sics: list[str]) -> int:
    total = 0
    for sic in sics:  # advanced-search ORs multiple sic_codes params; per-code is clearer
        for attempt in range(4):
            r = client.get(
                "https://api.company-information.service.gov.uk/advanced-search/companies",
                params={"sic_codes": sic, "company_status": "active", "size": "1"},
                auth=(CH_KEY, ""),
                timeout=20.0,
            )
            if r.status_code == 429:
                time.sleep(30 * (attempt + 1))
                continue
            r.raise_for_status()
            total += int(r.json().get("hits", 0) or 0)
            break
        time.sleep(0.3)
    return total


def main() -> None:
    out = []
    with httpx.Client() as client:
        for sector, sics in SECTORS.items():
            try:
                n = count(client, sics)
            except Exception as e:  # keep going; record failure
                out.append({"sector": sector, "sic_codes": sics, "active_companies": None, "error": str(e)})
                print(f"{sector}: ERROR {e}")
                continue
            out.append({"sector": sector, "sic_codes": sics, "active_companies": n,
                        "method": "CH advanced-search hits, active only, per-SIC summed"})
            print(f"{sector}: {n}")
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump({"generated": time.strftime("%Y-%m-%d"),
                   "caveat": "CH counts incorporated companies only; sole-trader-heavy niches understated",
                   "sectors": out}, f, indent=1)
    print(f"-> {OUT}")


if __name__ == "__main__":
    main()
