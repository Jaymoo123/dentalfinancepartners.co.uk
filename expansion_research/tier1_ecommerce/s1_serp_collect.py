"""R3 tier1 ecommerce — Stage 1: SERP collection (Serper probe + DDG) + estate/directory filter.

Adapted from tier1_care/s1_serp_collect.py. FREE SOURCES ONLY (no DataForSEO).
Serper is known out-of-credits estate-wide: we make AT MOST ONE probe call; on failure
the sweep is DDG-only (recorded as an anomaly, matching tier1_care).
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
    # head — ecommerce generally
    "ecommerce accountant",
    "ecommerce accountants uk",
    "accountants for ecommerce businesses",
    "online seller accountant",
    "accountants for online retailers",
    "ecommerce bookkeeping services uk",
    "ecommerce tax accountant",
    # head — Amazon sellers
    "amazon seller accountant",
    "amazon fba accountant uk",
    "accountants for amazon sellers",
    "amazon seller bookkeeping uk",
    "amazon fba bookkeeping",
    # head — Shopify / other platforms
    "shopify accountant",
    "shopify accountant uk",
    "etsy seller accountant uk",
    "ebay seller accountant",
    "dropshipping accountant uk",
    # VAT — the technical core
    "ecommerce vat accountant",
    "amazon seller vat uk",
    "vat on amazon fees uk",
    "marketplace vat collection uk",
    "vat for online sellers uk",
    "eu vat for uk sellers",
    "ioss registration uk seller",
    "oss vat scheme uk",
    "selling to eu after brexit vat",
    "amazon pan eu fba vat",
    # bookkeeping mechanics / tooling space
    "amazon settlement reconciliation",
    "shopify payout reconciliation xero",
    "a2x accountant",
    "link my books accountant",
    "inventory accounting ecommerce",
    "cogs amazon seller",
    # tax / structure long-tail
    "amazon seller limited company or sole trader",
    "hmrc online sellers side hustle tax",
    "dropshipping tax uk",
]

DIRECTORY_DOMAINS = {
    "indeed.com", "uk.indeed.com", "reed.co.uk", "linkedin.com",
    "yell.com", "bark.com", "trustpilot.com", "checkatrade.com", "unbiased.co.uk",
    "clutch.co", "glassdoor.co.uk", "totaljobs.com", "facebook.com", "youtube.com",
    "amazon.com", "amazon.co.uk", "sellercentral.amazon.co.uk", "sell.amazon.co.uk",
    "reddit.com", "quora.com", "wikipedia.org",
    "icaew.com", "accaglobal.com",
    # ecommerce SaaS / marketplaces / info layer (not accountancy rivals — but the
    # SaaS content arms ARE mapped separately as adjacent players in COMPETITORS.md)
    "shopify.com", "ebay.co.uk", "ebay.com", "etsy.com", "aliexpress.com",
    "xero.com", "quickbooks.intuit.com", "intuit.com", "sage.com",
    "avalara.com", "taxjar.com", "stripe.com", "paypal.com",
    "junglescout.com", "helium10.com", "sellerapp.com",
    "which.co.uk", "moneysavingexpert.com", "moneyhelper.org.uk",
    "citizensadvice.org.uk", "simplybusiness.co.uk", "startups.co.uk",
    "europa.eu", "taxation-customs.ec.europa.eu",
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

    # ponytail: single Serper probe only — account is known out of credits (400s)
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
        serper_ok = True
    except Exception as e:
        raw["serper"][probe_q] = {"error": str(e)}
        serper_ok = False
    raw["serper_probe_only"] = not serper_ok

    if serper_ok:
        for q in QUERIES[1:]:
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
        if d in DIRECTORY_DOMAINS or d.endswith(".gov.uk") or d == "gov.uk" or d.endswith(".europa.eu"):
            dropped["directory_or_info"].append(d)
            continue
        survivors[d] = {"hit_count": len(ev), "queries": sorted({e["q"] for e in ev}),
                        "sample": ev[:3]}

    assert not (set(survivors) & estate), f"estate leak: {set(survivors) & estate}"

    out = {"generated": "2026-07-11", "n_queries": len(QUERIES),
           "serper_probe_only": not serper_ok,
           "survivors": survivors, "dropped": dropped}
    (HERE / "candidates.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    print(f"queries={len(QUERIES)} serper_ok={serper_ok} domains_seen={len(hits)} survivors={len(survivors)} "
          f"dropped_estate={len(dropped['estate'])} dropped_dir={len(dropped['directory_or_info'])}")


if __name__ == "__main__":
    main()
