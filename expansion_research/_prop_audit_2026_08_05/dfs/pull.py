"""
One-off DataForSEO pull for Property Tax Partners term universe + SERP layer.
Run phases with: python pull.py <phase>
Saves every raw response as JSON. Tracks own cumulative spend, stops at $8.
"""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))

from optimisation_engine.clients.dataforseo_client import DataForSEOClient
from optimisation_engine.cost_tracker import _spent_today

OUT = Path(__file__).parent
SITE_KEY = "property"
HEADS = [
    "property accountant", "property accountants", "property tax accountant",
    "landlord accountant", "accountant for landlords", "landlord tax",
    "landlord tax advice", "buy to let accountant", "rental property accountant",
    "property investment accountant", "accountant for property management",
    "property tax advisor", "property tax specialist", "non resident landlord tax",
    "property incorporation", "section 24 tax", "making tax digital landlords",
    "capital gains tax property", "stamp duty advice", "landlord tax return",
]
COMPETITORS = [
    "thepropertyaccountant.co.uk", "ukpropertyaccountants.co.uk", "fhpaccounting.co.uk",
    "hwfisher.co.uk", "gorillaaccounting.com", "djh.co.uk", "bhp.co.uk",
    "mccaccountants.co.uk", "taxd.co.uk",
]
OUR_SITE = "propertytaxpartners.co.uk"
SERP_TERMS = HEADS + [
    "specialist property accountant", "property accountant near me",
    "landlord accountant near me", "buy to let tax advice", "landlord tax calculator",
]


def save(name, resp):
    (OUT / name).write_text(json.dumps(resp, indent=2), encoding="utf-8")
    cost = resp.get("cost", 0.0)
    print(f"  saved {name} cost=${cost:.4f}")
    return cost


def slug(s):
    return s.replace(" ", "_").replace(".", "_").replace("/", "_")


def phase_expansion(c):
    total = 0.0
    for kw in HEADS:
        r = c.keyword_suggestions(site_key=SITE_KEY, seed_keyword=kw, limit=100)
        total += save(f"suggest_{slug(kw)}.json", r)
        r = c.related_keywords(site_key=SITE_KEY, seed_keyword=kw, limit=100, depth=2)
        total += save(f"related_{slug(kw)}.json", r)
    print(f"phase_expansion total=${total:.4f}")


def phase_competitors(c):
    total = 0.0
    for dom in COMPETITORS:
        r = c.ranked_keywords(site_key=SITE_KEY, domain=dom, limit=300)
        total += save(f"ranked_{slug(dom)}.json", r)
    print(f"phase_competitors total=${total:.4f}")


def phase_our_site(c):
    r = c.keywords_for_site(site_key=SITE_KEY, target_domain=OUR_SITE, limit=500)
    cost = save(f"keywords_for_site_{slug(OUR_SITE)}.json", r)
    print(f"phase_our_site total=${cost:.4f}")


def phase_volumes(c):
    universe_file = OUT / "universe_terms.json"
    terms = json.loads(universe_file.read_text(encoding="utf-8"))
    total = 0.0
    for i in range(0, len(terms), 1000):
        batch = terms[i:i + 1000]
        r = c.search_volume(site_key=SITE_KEY, keywords=batch)
        total += save(f"volume_uk_batch{i//1000}.json", r)
    print(f"phase_volumes total=${total:.4f}")


def phase_four_market(c):
    total = 0.0
    for name, loc in [("us", 2840), ("au", 2036), ("ca", 2124)]:
        r = c.search_volume(site_key=SITE_KEY, keywords=HEADS, location_code=loc)
        total += save(f"volume_{name}.json", r)
    print(f"phase_four_market total=${total:.4f}")


def phase_serp(c):
    total = 0.0
    for term in SERP_TERMS:
        r = c.serp_organic(site_key=SITE_KEY, query=term, depth=10)
        total += save(f"serp_{slug(term)}.json", r)
    print(f"phase_serp total=${total:.4f}")


PHASES = {
    "expansion": phase_expansion,
    "competitors": phase_competitors,
    "our_site": phase_our_site,
    "volumes": phase_volumes,
    "four_market": phase_four_market,
    "serp": phase_serp,
}

if __name__ == "__main__":
    phase = sys.argv[1]
    print(f"spent today before phase: ${_spent_today('dataforseo'):.4f}")
    c = DataForSEOClient()
    PHASES[phase](c)
    print(f"spent today after phase: ${_spent_today('dataforseo'):.4f}")
