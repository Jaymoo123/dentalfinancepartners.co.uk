"""R3 tier2 farmers — Stage 1: SERP collection (DDG only, free) + estate/directory filter.

Adapted from tier1_care/s1_serp_collect.py. ZERO paid API calls (no Serper, no DataForSEO).
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

from optimisation_engine.clients.ddg_serp_client import fetch_organic_results

QUERIES = [
    # head — hire intent
    "accountant for farmers",
    "accountants for farmers uk",
    "farm accountant",
    "farm accountants uk",
    "agricultural accountant",
    "agricultural accountants uk",
    "rural accountants",
    "accountants for rural businesses",
    "farming accountants",
    "farm tax adviser",
    "agricultural tax specialist",
    "rural estate accountants",
    "landed estate accountants",
    "accountants for agricultural businesses",
    # tax-topic hire intent
    "farmers averaging accountant",
    "farmers averaging tax relief",
    "herd basis election accountant",
    "agricultural property relief adviser",
    "apr bpr inheritance tax farm",
    "inheritance tax planning farmers",
    "farm succession planning accountant",
    "capital gains tax selling farmland",
    "vat on farm diversification",
    "farm diversification tax advice",
    "contract farming agreement tax",
    "share farming agreement accountant",
    "farm partnership accounts",
    "tenant farmer accountant",
    "aha tenancy tax",
    "farm business tenancy tax advice",
    # adjacent hire intent
    "farm payroll services",
    "farm bookkeeping services",
    "making tax digital farmers",
    "basic payment scheme accounting treatment",
    "sfi payments tax treatment",
]

DIRECTORY_DOMAINS = {
    "indeed.com", "uk.indeed.com", "reed.co.uk", "linkedin.com",
    "yell.com", "bark.com", "trustpilot.com", "checkatrade.com", "unbiased.co.uk",
    "clutch.co", "glassdoor.co.uk", "totaljobs.com", "facebook.com", "youtube.com",
    "amazon.com", "amazon.co.uk", "reddit.com", "quora.com", "wikipedia.org",
    "icaew.com", "accaglobal.com", "tax.org.uk", "att.org.uk", "litrg.org.uk",
    # farming-sector info/press/membership layer (not accountancy rivals)
    "nfuonline.com", "nfu-cymru.wales", "nfus.org.uk", "cla.org.uk", "tfa.org.uk",
    "fwi.co.uk", "farminguk.com", "farmersguardian.com", "fginsight.com",
    "agriland.co.uk", "thescottishfarmer.co.uk", "farmingforum.co.uk",
    "thefarmingforum.co.uk", "ahdb.org.uk", "defra.gov.uk", "ruralpaymentswales.co.uk",
    "rau.ac.uk", "harper-adams.ac.uk", "rics.org", "caav.org.uk",
    "savills.co.uk", "knightfrank.co.uk", "struttandparker.com", "carterjonas.co.uk",
    "brown-co.com", "gscgrays.co.uk",  # land agents, not accountants
    "moneyhelper.org.uk", "which.co.uk", "citizensadvice.org.uk",
    "lawsociety.org.uk", "step.org",
    "taxadvisermagazine.com", "accountingweb.co.uk", "accountancyage.com",
    "croner-i.co.uk", "rossmartin.co.uk", "taxation.co.uk",
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
    raw: dict = {"ddg": {}}
    hits: dict[str, list[dict]] = defaultdict(list)

    for q in QUERIES:
        results = fetch_organic_results(f"{q} uk", num=10, region="uk-en")
        raw["ddg"][q] = results
        for item in results:
            d = norm_domain(item.get("domain") or item.get("link", ""))
            if d:
                hits[d].append({"src": "ddg", "q": q, "pos": item.get("position"),
                                "title": item.get("title", ""), "snippet": (item.get("snippet") or "")[:200],
                                "link": item.get("link", "")})
        print(f"  {q}: {len(results)}")

    (HERE / "raw" / "serp_raw.json").write_text(json.dumps(raw, indent=1), encoding="utf-8")

    survivors = {}
    dropped = {"estate": [], "directory_or_info": []}
    for d, ev in sorted(hits.items(), key=lambda kv: -len(kv[1])):
        if d in estate:
            dropped["estate"].append(d)
            continue
        if d in DIRECTORY_DOMAINS or d.endswith(".gov.uk") or d == "gov.uk" or d.endswith(".nhs.uk") or d.endswith(".ac.uk"):
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
