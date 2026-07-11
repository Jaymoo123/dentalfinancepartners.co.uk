"""R3 tier1 crypto — Stage 1: SERP collection (Serper UK + DDG) + estate/directory filter.

Cloned from tier1_startups_tech/s1_serp_collect.py; crypto/day-trader/forex query set.
Writes raw/serp_raw.json and candidates.json. Hard-asserts zero own-estate domains survive.
NOTE: zero DataForSEO calls anywhere in this dossier (daily cost guard exhausted).
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
    # head — hire intent (the slice R2 says to target)
    "crypto tax accountant",
    "crypto tax accountant uk",
    "crypto accountant uk",
    "cryptocurrency accountant",
    "accountant for crypto traders uk",
    "crypto tax advisor uk",
    "crypto tax specialist uk",
    "bitcoin accountant uk",
    "cryptocurrency tax advice uk",
    # complex-case / accountant-seeking tail
    "defi tax accountant uk",
    "nft tax accountant uk",
    "staking rewards tax uk accountant",
    "crypto capital gains tax help uk",
    "hmrc crypto nudge letter help",
    "hmrc crypto investigation accountant",
    "crypto tax disclosure hmrc accountant",
    "undeclared crypto gains hmrc",
    "crypto voluntary disclosure uk",
    "crypto tax return accountant uk",
    "lost crypto records tax uk",
    # trader-status / financial-trading edge
    "crypto day trader tax uk",
    "am i a crypto trader hmrc",
    "crypto trading as a business uk tax",
    "day trading tax accountant uk",
    "forex trading tax uk accountant",
    "day trader accountant uk",
    # DIY-leaning heads (to map the software/directory layer, not to win)
    "crypto tax uk",
    "how to pay tax on crypto uk",
    "crypto tax calculator uk",
    "koinly accountant",
    # adjacent money terms
    "crypto cgt accountant",
    "crypto self assessment accountant",
    "crypto tax planning uk",
    "crypto mining tax uk accountant",
]

DIRECTORY_DOMAINS = {
    "indeed.com", "uk.indeed.com", "reed.co.uk", "linkedin.com",
    "yell.com", "bark.com", "trustpilot.com", "checkatrade.com", "unbiased.co.uk",
    "clutch.co", "glassdoor.co.uk", "totaljobs.com", "facebook.com", "youtube.com",
    "amazon.com", "amazon.co.uk", "reddit.com", "quora.com", "wikipedia.org",
    "icaew.com", "accaglobal.com", "medium.com", "g2.com", "capterra.com",
    "moneysavingexpert.com", "which.co.uk", "coindesk.com", "cointelegraph.com",
    "investopedia.com", "forbes.com", "nerdwallet.com", "finder.com",
    "money.co.uk", "times-money-mentor", "thetimes.com", "telegraph.co.uk",
    "theguardian.com", "bbc.co.uk", "litrg.org.uk", "taxaid.org.uk",
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
