"""R3 tier2 FCA-regulated firms — Stage 1: SERP collection (DDG ONLY, free) + filter.

Adapted from tier1_care/s1_serp_collect.py. ZERO paid calls (no Serper, no DataForSEO).
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
    # head — buyer intent
    "accountants for fca regulated firms",
    "accountant for fca regulated business",
    "fca regulated accountants",
    "accountants for financial services firms uk",
    "specialist accountants financial services",
    "accountants for investment firms",
    "accountants for wealth managers",
    "accountants for mortgage brokers",
    "accountants for insurance brokers",
    "accountants for payment institutions",
    # CASS
    "cass audit firm",
    "cass audit accountants",
    "client assets audit uk",
    "cass compliance accountants",
    # safeguarding (PI/EMI)
    "safeguarding audit payment institution",
    "safeguarding audit emi",
    "emi safeguarding audit firm",
    "payment institution audit accountants",
    # regulatory reporting
    "fca regulatory reporting accountants",
    "regdata reporting help",
    "fca gabriel returns accountant",
    "mifidpru reporting accountant",
    "ifpr compliance accountants",
    "icara support accountants",
    "capital adequacy reporting fca",
    # authorisation / consumer credit / AR
    "fca authorisation accountant",
    "fca application financial projections",
    "consumer credit firm accountants",
    "accountants for appointed representatives",
    "accountants for crypto firms fca registered",
    # audit head
    "fca client money audit",
    "audit of fca regulated firm",
]

DIRECTORY_DOMAINS = {
    "indeed.com", "uk.indeed.com", "reed.co.uk", "linkedin.com",
    "yell.com", "bark.com", "trustpilot.com", "checkatrade.com", "unbiased.co.uk",
    "clutch.co", "glassdoor.co.uk", "totaljobs.com", "facebook.com", "youtube.com",
    "amazon.com", "amazon.co.uk", "reddit.com", "quora.com", "wikipedia.org",
    "icaew.com", "accaglobal.com",
    # regulator / info layer (not accountancy rivals)
    "fca.org.uk", "handbook.fca.org.uk", "bankofengland.co.uk", "frc.org.uk",
    "legislation.gov.uk", "fscs.org.uk", "financial-ombudsman.org.uk",
    "moneyhelper.org.uk", "which.co.uk", "citizensadvice.org.uk",
    # law firms / consultancies dominating this SERP (rivals for attention, not accountants;
    # kept in raw, dropped from accountancy candidate list)
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
                                "title": item.get("title", ""), "snippet": (item.get("snippet") or "")[:200]})

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
