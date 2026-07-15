"""R3 tier2 expats/non-residents — Stage 1: SERP collection (DDG only, free) + filter.

Adapted from tier1_care/s1_serp_collect.py. ZERO PAID CALLS: Serper credits are
exhausted estate-wide, so this run is DDG-only by design (no Serper attempt at all).
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
    "expat accountant uk",
    "uk expat tax advisor",
    "accountants for uk expats",
    "expat tax specialist uk",
    "non resident tax adviser uk",
    "non resident accountant uk",
    "uk tax advice for expats",
    "international tax accountant uk individuals",
    # non-resident landlord
    "non resident landlord accountant",
    "non resident landlord tax return service",
    "nrl scheme accountant",
    "overseas landlord uk tax accountant",
    "non resident landlord self assessment help",
    # NRCGT
    "non resident capital gains tax uk advice",
    "nrcgt return accountant",
    "selling uk property non resident tax advice",
    # leaving / returning UK
    "leaving the uk tax advice",
    "moving abroad uk tax advisor",
    "split year treatment tax advice",
    "p85 leaving the uk help",
    "returning to uk tax advice",
    "statutory residence test advice",
    # FIG / former non-dom
    "fig regime tax advice",
    "foreign income and gains regime advisor",
    "non dom tax adviser uk",
    "arriving in the uk tax advice",
    # dual residence / treaty
    "dual residence tax advice uk",
    "double taxation relief accountant uk",
    "uk tax treaty advice individual",
    # US-in-UK layer (inbound)
    "us expat tax uk accountant",
    "american expat tax advisor london",
    # misc hire intent
    "offshore income disclosure accountant",
    "uk self assessment non resident accountant",
    "expat pension tax advice uk",
]

DIRECTORY_DOMAINS = {
    "indeed.com", "uk.indeed.com", "reed.co.uk", "linkedin.com",
    "yell.com", "bark.com", "trustpilot.com", "checkatrade.com", "unbiased.co.uk",
    "clutch.co", "glassdoor.co.uk", "totaljobs.com", "facebook.com", "youtube.com",
    "amazon.com", "amazon.co.uk", "reddit.com", "quora.com", "wikipedia.org",
    "icaew.com", "accaglobal.com", "tax.org.uk", "att.org.uk", "litrg.org.uk",
    # info/consumer layer (not accountancy rivals)
    "moneyhelper.org.uk", "which.co.uk", "citizensadvice.org.uk",
    "moneysavingexpert.com", "expatica.com", "expatfocus.com", "expatnetwork.com",
    "internations.org", "britishexpats.com", "expatforum.com",
    "thetimes.com", "thetimes.co.uk", "theguardian.com", "telegraph.co.uk", "ft.com",
    "investopedia.com", "wise.com", "xe.com", "monito.com",
    "taxation.co.uk", "taxadvisermagazine.com", "accountingweb.co.uk",
    "lawsociety.org.uk", "pensionsadvisoryservice.org.uk",
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
        results = fetch_organic_results(f"{q} uk" if " uk" not in q else q, num=10, region="uk-en")
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
