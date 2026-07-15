"""R3 tier2 retail — Stage 1: SERP collection (DDG only, free) + estate/directory filter.

Adapted from tier1_care/s1_serp_collect.py. FREE SOURCES ONLY (no Serper, no DataForSEO).
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

QUERIES = [
    # head — hire intent
    "retail accountant",
    "retail accountants uk",
    "accountant for retail business",
    "accountants for retailers",
    "accountant for shop owner",
    "accountants for independent shops",
    "high street shop accountant",
    "small shop accountant uk",
    # sub-sector heads
    "convenience store accountant",
    "accountants for convenience stores",
    "newsagent accountant",
    "off licence accountant",
    "butcher shop accountant",
    "accountants for fashion retailers",
    "furniture shop accountant",
    "garden centre accountants",
    "pet shop accountant",
    "franchise accountant uk",
    "accountants for franchisees",
    "post office accountant",
    # service long-tail — VAT / schemes
    "retail vat scheme accountant",
    "vat retail scheme point of sale",
    "vat apportionment scheme retail",
    "vat on mixed food sales shop",
    "flat rate vat retail shop",
    # EPOS / stock / margins
    "epos accounting integration accountant",
    "stock accounting for retail shop",
    "gross margin retail accounting",
    "cash business accountant hmrc",
    # rates / property / staff
    "business rates relief small shop accountant",
    "retail hospitality leisure relief 2026",
    "shop staff payroll accountant",
    # buy / sell
    "buying a convenience store accountant",
    "selling a retail business tax",
    "goodwill valuation retail shop",
]

DIRECTORY_DOMAINS = {
    "indeed.com", "uk.indeed.com", "reed.co.uk", "linkedin.com",
    "yell.com", "bark.com", "trustpilot.com", "checkatrade.com", "unbiased.co.uk",
    "clutch.co", "glassdoor.co.uk", "totaljobs.com", "facebook.com", "youtube.com",
    "amazon.com", "amazon.co.uk", "reddit.com", "quora.com", "wikipedia.org",
    "icaew.com", "accaglobal.com",
    # retail-sector info/trade/directory layer (not accountancy rivals)
    "britishretailconsortium.org.uk", "brc.org.uk", "retailgazette.co.uk",
    "retail-week.com", "acs.org.uk", "conveniencestore.co.uk", "thegrocer.co.uk",
    "betterretailing.com", "talkingretail.com", "fsb.org.uk", "britishchambers.org.uk",
    "which.co.uk", "moneyhelper.org.uk", "citizensadvice.org.uk",
    "startups.co.uk", "simplybusiness.co.uk", "checkatrade.com",
    "rightbiz.co.uk", "daltonsbusiness.com", "businessesforsale.com",  # brokers/listings
    "christie.com", "knightfrank.co.uk",
    "moneysavingexpert.com", "money.co.uk", "nerdwallet.com",
    "acas.org.uk", "crunch.co.uk",
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
    # working brands built on expansion/phase-0 but not yet in exclusion json
    out |= {"tradetaxspecialists.co.uk"}
    return out


def main() -> None:
    estate = load_estate()
    raw: dict = {"ddg": {}}
    hits: dict[str, list[dict]] = defaultdict(list)

    for q in QUERIES:
        results = fetch_organic_results(f"{q} uk", num=10, region="uk-en")
        raw["ddg"][q] = results
        for item in results:
            d = norm_domain(item.get("domain") or item.get("link", ""))
            if d:
                hits[d].append({"src": "ddg", "q": q, "pos": item.get("position"),
                                "title": item.get("title", ""), "snippet": (item.get("snippet") or "")[:200]})
        print(f"{q}: {len(results)}")

    (HERE / "raw" / "serp_raw.json").write_text(json.dumps(raw, indent=1), encoding="utf-8")

    survivors = {}
    dropped = {"estate": [], "directory_or_info": []}
    for d, ev in sorted(hits.items(), key=lambda kv: -len(kv[1])):
        if d in estate:
            dropped["estate"].append(d)
            continue
        if d in DIRECTORY_DOMAINS or d.endswith(".gov.uk") or d == "gov.uk" or d.endswith(".nhs.uk"):
            dropped["directory_or_info"].append(d)
            continue
        survivors[d] = {"hit_count": len(ev), "queries": sorted({e["q"] for e in ev}),
                        "sample": ev[:3]}

    assert not (set(survivors) & estate), f"estate leak: {set(survivors) & estate}"

    out = {"generated": "2026-07-15", "n_queries": len(QUERIES),
           "survivors": survivors, "dropped": dropped}
    (HERE / "candidates.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    print(f"queries={len(QUERIES)} domains_seen={len(hits)} survivors={len(survivors)} "
          f"dropped_estate={len(dropped['estate'])} dropped_dir={len(dropped['directory_or_info'])}")


if __name__ == "__main__":
    main()
