"""R3 tier1 manufacturing — Stage 1: SERP collection (Serper probe + DDG) + estate/directory filter.

Adapted from tier1_care/s1_serp_collect.py. FREE SOURCES ONLY (no DataForSEO).
Serper is known out-of-credits estate-wide: ONE probe call only to confirm, then DDG-only.
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
    # head — manufacturing
    "manufacturing accountant",
    "manufacturing accountants",
    "accountants for manufacturers",
    "manufacturing accountants uk",
    "accountants for manufacturing businesses",
    "manufacturing sector accountants",
    "accountants for manufacturing companies",
    # head — engineering
    "engineering accountant",
    "accountants for engineering companies",
    "engineering firm accountant",
    "accountants for engineers uk",
    "precision engineering accountants",
    # sub-segments
    "food manufacturing accountants",
    "aerospace manufacturing accountants",
    "fabrication company accountant",
    "factory accountant uk",
    # service long-tail — capital allowances / plant & machinery
    "capital allowances plant and machinery",
    "full expensing plant and machinery",
    "capital allowances manufacturing equipment",
    "annual investment allowance machinery",
    # R&D / patent box
    "r&d tax relief manufacturing",
    "r&d tax credits engineering company",
    "patent box manufacturing",
    "patent box claim accountant",
    # stock / WIP / costing
    "wip accounting manufacturing",
    "stock valuation manufacturing accounts",
    "standard costing manufacturing accounts",
    "manufacturing management accounts",
    "tooling costs accounting treatment",
    # export / customs / CBAM
    "cbam uk importers",
    "vat on exports manufacturer",
    "customs duty accountant manufacturer",
    # deals / funding
    "selling a manufacturing business tax",
    "buying a manufacturing business accountant",
    "manufacturing business valuation",
    "grant funding manufacturing accountant",
]

DIRECTORY_DOMAINS = {
    "indeed.com", "uk.indeed.com", "reed.co.uk", "linkedin.com",
    "yell.com", "bark.com", "trustpilot.com", "checkatrade.com", "unbiased.co.uk",
    "clutch.co", "glassdoor.co.uk", "totaljobs.com", "facebook.com", "youtube.com",
    "amazon.com", "amazon.co.uk", "reddit.com", "quora.com", "wikipedia.org",
    "icaew.com", "accaglobal.com", "aat.org.uk", "cimaglobal.com", "aicpa-cima.com",
    # manufacturing/engineering trade-info layer (not accountancy rivals)
    "makeuk.org", "themanufacturer.com", "theengineer.co.uk", "imeche.org",
    "engc.org.uk", "raeng.org.uk", "ice.org.uk", "theiet.org",
    "manufacturingglobal.com", "pesmedia.com", "machinery.co.uk",
    "mtdmfg.com", "catapult.org.uk", "hvm.catapult.org.uk", "swmas.co.uk",
    "british-business-bank.co.uk", "moneyhelper.org.uk", "which.co.uk",
    "citizensadvice.org.uk", "acas.org.uk", "local.gov.uk",
    # academic / career / definition layer
    "investopedia.com", "accountingtools.com", "wallstreetmojo.com",
    "corporatefinanceinstitute.com", "coursera.org", "prospects.ac.uk",
    "targetjobs.co.uk", "studocu.com", "chegg.com",
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

    # ONE Serper probe only (estate-wide out-of-credits; do not burn attempts)
    sc = SerperClient()
    probe_q = QUERIES[0]
    try:
        resp = sc.search(query=probe_q, gl="gb", num=10, site_key=None)
        raw["serper"][probe_q] = resp
        for item in resp.get("organic", []):
            d = norm_domain(item.get("link", ""))
            if d:
                hits[d].append({"src": "serper", "q": probe_q, "pos": item.get("position"),
                                "title": item.get("title", ""), "snippet": item.get("snippet", "")[:200]})
        raw["serper"]["_note"] = "probe unexpectedly succeeded; remaining queries still DDG-only by plan"
    except Exception as e:
        raw["serper"][probe_q] = {"error": str(e)}
        raw["serper"]["_note"] = "single probe failed as expected; no further Serper attempts"

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
        if d in DIRECTORY_DOMAINS or d.endswith(".gov.uk") or d == "gov.uk" or d.endswith(".ac.uk"):
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
