"""R3 tier1 hospitality — Stage 1: SERP collection (Serper UK + DDG) + estate/directory filter.

Adapted from pilot_charities/s1_serp_collect.py.
Writes raw/serp_raw.json and candidates.json. Hard-asserts zero own-estate domains survive.
"""
from __future__ import annotations

import json
import sys
from collections import defaultdict
from pathlib import Path
from urllib.parse import urlparse

HERE = Path(__file__).parent
ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT))

from dotenv import load_dotenv

load_dotenv(ROOT / ".env")

from optimisation_engine.clients.ddg_serp_client import fetch_organic_results
from optimisation_engine.clients.serper_client import SerperClient

QUERIES = [
    # head — sector
    "hospitality accountants",
    "hospitality accountants uk",
    "accountants for hospitality",
    "hospitality accounting services uk",
    # restaurants
    "restaurant accountant",
    "restaurant accountants uk",
    "accountants for restaurants",
    "restaurant bookkeeping services uk",
    # pubs & bars
    "pub accountant",
    "accountants for pubs",
    "pub accountants uk",
    "bar accountant uk",
    # takeaways
    "takeaway accountant",
    "accountants for takeaways",
    "fish and chip shop accountant",
    # hotels & guesthouses
    "hotel accountant",
    "accountants for hotels uk",
    "guest house accountant",
    "bed and breakfast accountant uk",
    # cafes & caterers
    "cafe accountant uk",
    "accountants for cafes",
    "catering business accountant",
    "accountants for caterers uk",
    # service long-tail
    "tronc scheme advice",
    "tronc scheme accountant",
    "troncmaster services",
    "tips and service charge payroll advice",
    "VAT on food takeaway advice",
    "vat on hot food takeaway accountant",
    "hospitality vat advice uk",
    "TOMS accountant",
    "tour operators margin scheme accountant",
    "hospitality payroll services uk",
    "restaurant tax advisor uk",
    "hospitality business rates relief advice",
    "pub tenancy accounts service",
]

DIRECTORY_DOMAINS = {
    "indeed.com", "uk.indeed.com", "reed.co.uk", "linkedin.com", "caterer.com",
    "yell.com", "bark.com", "trustpilot.com", "checkatrade.com", "unbiased.co.uk",
    "clutch.co", "glassdoor.co.uk", "totaljobs.com", "facebook.com", "youtube.com",
    "amazon.com", "amazon.co.uk", "reddit.com", "quora.com", "wikipedia.org",
    "icaew.com", "accaglobal.com", "ukhospitality.org.uk", "bighospitality.co.uk",
    "morningadvertiser.co.uk", "thecaterer.com", "instagram.com", "x.com", "twitter.com",
}


def norm_domain(url_or_domain: str) -> str:
    d = url_or_domain
    if "//" in d:
        d = urlparse(d).netloc
    d = d.lower().strip()
    return d[4:] if d.startswith("www.") else d


def load_estate() -> set[str]:
    data = json.loads((ROOT / "expansion_research" / "own_estate_exclusion.json").read_text(encoding="utf-8"))
    out = set()
    for site in data["sites"].values():
        for dom in site["domains"]:
            out.add(norm_domain(dom))
    return out


def main() -> None:
    estate = load_estate()
    raw: dict = {"serper": {}, "ddg": {}}
    hits: dict[str, list[dict]] = defaultdict(list)

    sc = SerperClient()
    for q in QUERIES:
        try:
            resp = sc.search(query=q, gl="gb", num=10, site_key=None)
        except Exception as e:
            raw["serper"][q] = {"error": str(e)}
            continue
        raw["serper"][q] = resp
        for item in resp.get("organic", []):
            d = norm_domain(item.get("link", ""))
            if d:
                hits[d].append({"src": "serper", "q": q, "pos": item.get("position"),
                                "title": item.get("title", ""), "snippet": item.get("snippet", "")[:200]})

    for q in QUERIES:
        results = fetch_organic_results(f"{q} uk", num=10, region="uk-en")
        raw["ddg"][q] = results
        for item in results:
            d = norm_domain(item.get("domain") or item.get("link", ""))
            if d:
                hits[d].append({"src": "ddg", "q": q, "pos": item.get("position"),
                                "title": item.get("title", ""), "snippet": (item.get("snippet") or "")[:200]})

    (HERE / "raw" / "serp_raw.json").write_text(json.dumps(raw, indent=1), encoding="utf-8")

    survivors = {}
    dropped = {"estate": [], "directory_or_info": []}
    for d, ev in sorted(hits.items(), key=lambda kv: -len(kv[1])):
        if d in estate:
            dropped["estate"].append(d)
            continue
        if d in DIRECTORY_DOMAINS or d.endswith(".gov.uk") or d == "gov.uk":
            dropped["directory_or_info"].append(d)
            continue
        survivors[d] = {"hit_count": len(ev), "queries": sorted({e["q"] for e in ev}),
                        "sample": ev[:3]}

    assert not (set(survivors) & estate), f"estate leak: {set(survivors) & estate}"

    out = {"generated": "2026-07-11", "n_queries": len(QUERIES),
           "survivors": survivors, "dropped": dropped}
    (HERE / "candidates.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    print(f"queries={len(QUERIES)} domains_seen={len(hits)} survivors={len(survivors)} "
          f"dropped_estate={len(dropped['estate'])} dropped_dir={len(dropped['directory_or_info'])}")


if __name__ == "__main__":
    main()
