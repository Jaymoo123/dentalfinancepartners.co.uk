"""R3 tier1 care — Stage 1: SERP collection (Serper UK + DDG) + estate/directory filter.

Adapted from tier1_hospitality/s1_serp_collect.py. FREE SOURCES ONLY (no DataForSEO).
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
    # head — care homes
    "care home accountant",
    "care home accountants",
    "accountants for care homes",
    "care home accountants uk",
    "nursing home accountant",
    "accountants for nursing homes",
    "residential care home accountants",
    "care sector accountants uk",
    "accountants for care providers",
    # head — domiciliary / agency
    "domiciliary care accountant",
    "accountants for domiciliary care agencies",
    "home care agency accountant",
    "care agency accountant",
    "accountants for home care providers",
    "supported living accountants",
    "childrens home accountants",
    # service long-tail — payroll / NMW / sleep-ins
    "care home payroll services",
    "domiciliary care payroll services",
    "sleep in shift pay rules care",
    "national minimum wage care workers travel time",
    # service long-tail — VAT
    "vat on care home fees",
    "vat exemption domiciliary care",
    "care home vat recovery",
    "vat welfare services exemption",
    # acquisition / sale / finance
    "care home purchase accountant",
    "buying a care home tax advice",
    "selling a care home capital gains tax",
    "care home business valuation",
    "care home due diligence accountant",
    "capital allowances care home",
    # CQC / regulatory / funding
    "CQC financial viability statement accountant",
    "CQC registration financial requirements",
    "start a domiciliary care agency accounts",
    "funded nursing care rate",
    "local authority fee rates care homes",
    "care home cost of care report",
]

DIRECTORY_DOMAINS = {
    "indeed.com", "uk.indeed.com", "reed.co.uk", "linkedin.com",
    "yell.com", "bark.com", "trustpilot.com", "checkatrade.com", "unbiased.co.uk",
    "clutch.co", "glassdoor.co.uk", "totaljobs.com", "facebook.com", "youtube.com",
    "amazon.com", "amazon.co.uk", "reddit.com", "quora.com", "wikipedia.org",
    "icaew.com", "accaglobal.com",
    # care-sector info/consumer/directory layer (not accountancy rivals)
    "cqc.org.uk", "carehome.co.uk", "homecare.co.uk", "ageuk.org.uk", "nhs.uk",
    "carequalitymatters.co.uk", "careengland.org.uk", "homecareassociation.org.uk",
    "skillsforcare.org.uk", "kingsfund.org.uk", "communitycare.co.uk",
    "caremanagementmatters.co.uk", "careinfo.org", "thecareruk.com",
    "scie.org.uk", "local.gov.uk", "moneyhelper.org.uk", "which.co.uk",
    "citizensadvice.org.uk", "daynurseries.co.uk", "autumna.co.uk", "lottie.org",
    "carehomeprofessional.com", "homecareinsight.co.uk",
    "christie.com", "knightfrank.co.uk", "dccare.co.uk",  # brokers, not accountants
    "acas.org.uk",
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
        if d in DIRECTORY_DOMAINS or d.endswith(".gov.uk") or d == "gov.uk" or d.endswith(".nhs.uk"):
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
