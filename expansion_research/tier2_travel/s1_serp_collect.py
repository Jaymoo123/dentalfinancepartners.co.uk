"""R3 tier2 travel agents / tour operators — Stage 1: SERP collection (DDG only, free).

Adapted from tier1_care/s1_serp_collect.py + tier2_farmers pattern. ZERO paid API calls
(no Serper, no DataForSEO). Writes raw/serp_raw.json and candidates.json.
Hard-asserts zero own-estate domains survive.
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
    "accountant for travel agency",
    "accountants for travel agents uk",
    "travel agency accountant",
    "travel agent accountants uk",
    "tour operator accountant",
    "accountants for tour operators uk",
    "travel industry accountants",
    "accountants for travel companies",
    "travel business accountant uk",
    # TOMS VAT — the niche's signature technical wedge
    "toms vat accountant",
    "tour operators margin scheme accountant",
    "toms vat specialist",
    "toms vat adviser uk",
    "toms vat calculation help",
    "tour operators margin scheme advice",
    "toms vat return service",
    # ATOL / ARA — regulated reporting
    "atol reporting accountant",
    "atol reporting accountants scheme",
    "ara accountant atol",
    "atol renewal accountant",
    "atol annual accountants report",
    "accountant for atol licence application",
    # ABTA / bonding / trust accounts
    "abta bonding accountant",
    "abta membership financial criteria accountant",
    "travel trust account accountant",
    "trust account travel agency",
    "pipeline monies travel agent",
    # adjacent hire intent
    "homeworking travel agent accountant",
    "self employed travel agent tax",
    "travel agency bookkeeping services",
    "accountant for dmc uk",
    "coach tour operator accountant",
    "travel agency vat advice",
]

DIRECTORY_DOMAINS = {
    "indeed.com", "uk.indeed.com", "reed.co.uk", "linkedin.com",
    "yell.com", "bark.com", "trustpilot.com", "checkatrade.com", "unbiased.co.uk",
    "clutch.co", "glassdoor.co.uk", "totaljobs.com", "facebook.com", "youtube.com",
    "amazon.com", "amazon.co.uk", "reddit.com", "quora.com", "wikipedia.org",
    "icaew.com", "accaglobal.com",
    # travel-sector regulator / trade-body / consumer / info layer (not accountancy rivals)
    "caa.co.uk", "abta.com", "atol.org", "abtot.com", "aito.com",
    "travelweekly.co.uk", "ttgmedia.com", "travelgossip.co.uk", "traveltrade.co.uk",
    "gov.uk", "which.co.uk", "moneysavingexpert.com", "citizensadvice.org.uk",
    "tripadvisor.co.uk", "tripadvisor.com", "expedia.co.uk", "booking.com",
    "travelcounsellors.co.uk", "hays-travel.co.uk", "notjusttravel.com",
    "traveltimemachine.co.uk", "protectedtrustservices.com",  # PTS = trust provider, not accountant; keep visible via candidates if needed
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
