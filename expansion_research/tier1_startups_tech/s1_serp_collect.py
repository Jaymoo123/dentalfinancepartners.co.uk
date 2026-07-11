"""R3 tier1 startups/tech — Stage 1: SERP collection (Serper UK + DDG) + estate/directory filter.

Cloned from pilot_charities/s1_serp_collect.py; startup/SaaS query set.
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
    # head
    "startup accountant",
    "startup accountants uk",
    "accountants for startups",
    "accountant for tech company",
    "tech startup accountants london",
    "saas accountant uk",
    "saas accountants",
    "accountants for saas companies",
    "accountants for software companies uk",
    "tech accountants uk",
    "accountants for tech startups",
    "fintech startup accountant",
    # R&D
    "r&d tax credit accountant",
    "r&d tax credits advisor uk",
    "r&d tax relief specialist accountant",
    "merged scheme r&d accountant",
    "software r&d tax claim help",
    # SEIS/EIS
    "seis advance assurance help",
    "eis advance assurance accountant",
    "seis eis accountant",
    "seis compliance statement help",
    "eis3 form accountant",
    # share schemes
    "emi scheme setup accountant",
    "emi valuation accountant",
    "emi share options accountant",
    "growth shares accountant",
    "employee share scheme accountant uk",
    # founder / funding stage
    "accountant for pre revenue startup",
    "accountant for vc backed startup",
    "startup cfo services uk",
    "fractional cfo for startups uk",
    "accountant for funded startup",
    "startup accounting fees uk",
    "revenue recognition saas accountant",
    "startup payroll and share options accountant",
]

DIRECTORY_DOMAINS = {
    "indeed.com", "uk.indeed.com", "reed.co.uk", "linkedin.com",
    "yell.com", "bark.com", "trustpilot.com", "checkatrade.com", "unbiased.co.uk",
    "clutch.co", "glassdoor.co.uk", "totaljobs.com", "facebook.com", "youtube.com",
    "amazon.com", "amazon.co.uk", "reddit.com", "quora.com", "wikipedia.org",
    "icaew.com", "accaglobal.com", "medium.com", "g2.com", "capterra.com",
    "startups.co.uk", "sifted.eu", "techcrunch.com", "crunchbase.com",
    "growthbusiness.co.uk", "uktech.news", "beauhurst.com", "expertmarket.com",
    "moneysavingexpert.com", "which.co.uk", "designrush.com", "sortlist.com",
    "goodfirms.co", "themanifest.com",
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
