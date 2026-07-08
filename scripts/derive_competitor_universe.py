"""Derive the competitor universe for a site by SERP-ing its top head queries.

Pulls the site's top head queries from Supabase gsc_query_data (last 90d, by
SUM(impressions)), SERPs each via the DDG client, tallies registrable domains
across queries, drops our own domain + obvious non-competitors/directories,
ranks by frequency, takes the top ~15, and writes them into
sites/<site>.discovery.json under "competitors".

Supabase access uses the Management API _mgmt_sql / MGMT_URL pattern from
optimisation_engine/clients/gsc_query_client.py.
"""
from __future__ import annotations

import argparse
import json
import os
import sys
from collections import Counter
from pathlib import Path
from urllib.parse import urlparse

import httpx

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

try:
    from dotenv import load_dotenv
    load_dotenv(ROOT / ".env")
except ImportError:
    pass

from optimisation_engine.clients.ddg_serp_client import fetch_organic_results

SUPABASE_ACCESS_TOKEN: str = os.getenv("SUPABASE_ACCESS_TOKEN", "")
PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"
MGMT_URL = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"


def _mgmt_select(query: str) -> list[dict]:
    """Run a SELECT via the Management API and return rows as a list of dicts."""
    r = httpx.post(
        MGMT_URL,
        headers={"Authorization": f"Bearer {SUPABASE_ACCESS_TOKEN}", "Content-Type": "application/json"},
        json={"query": query},
        timeout=60.0,
    )
    r.raise_for_status()
    return r.json()


# Two-label public suffixes where the registrable domain needs three labels.
_TWO_LABEL_SUFFIXES = {"co.uk", "org.uk", "ltd.uk", "plc.uk", "me.uk", "gov.uk", "ac.uk", "net.uk", "sch.uk"}


def registrable_domain(host: str) -> str:
    host = (host or "").lower().lstrip(".")
    if host.startswith("www."):
        host = host[4:]
    parts = host.split(".")
    if len(parts) < 2:
        return host
    last_two = ".".join(parts[-2:])
    if last_two in _TWO_LABEL_SUFFIXES and len(parts) >= 3:
        return ".".join(parts[-3:])
    return last_two


# Domains that are never competitors (search engines, socials, gov, directories,
# regulators, job boards, dental orgs).
EXCLUDE_DOMAINS = {
    "google.com", "google.co.uk", "facebook.com", "linkedin.com", "youtube.com",
    "bing.com", "duckduckgo.com", "yahoo.com",
    "twitter.com", "x.com", "instagram.com", "tiktok.com", "pinterest.com",
    "wikipedia.org", "gov.uk", "nhs.uk", "england.nhs.uk", "bda.org",
    "gdc-uk.org", "yell.com", "checkatrade.com", "trustpilot.com",
    "indeed.com", "reed.co.uk", "totaljobs.com", "glassdoor.co.uk",
    "thedentistdirectory.co.uk", "dentistry.co.uk", "fmc.co.uk",
    "moneysavingexpert.com", "which.co.uk", "bbc.co.uk", "theguardian.com",
    "amazon.co.uk", "apple.com", "microsoft.com", "researchgate.net",
    "find-and-update.company-information.service.gov.uk", "companieshouse.gov.uk",
    "denplan.co.uk", "gov.scot", "nhsbsa.nhs.uk", "pensions.nhs.uk",
    "rcseng.ac.uk", "gdpuk.com", "dentalprotection.org", "the-dentist.co.uk",
    "quora.com", "reddit.com", "mumsnet.com", "moneyhelper.org.uk",
    "litrg.org.uk", "tax.org.uk", "icaew.com", "accaglobal.com",
    # Own estate — must never appear as competitors
    "propertytaxpartners.co.uk",
    "hollowaydavies.co.uk",
    "dentalfinancepartners.co.uk",
    "medicalaccounts.co.uk",
    "accountsforlawyers.co.uk",
    "agencyfounderfinance.co.uk",
    "contractortaxaccountants.co.uk",
    "tradetaxspecialists.co.uk",
}


def _load_discovery(site: str) -> tuple[Path, dict]:
    p = ROOT / "sites" / f"{site}.discovery.json"
    if not p.exists():
        raise FileNotFoundError(f"Discovery config missing: {p}")
    return p, json.loads(p.read_text(encoding="utf-8"))


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--site", type=str, required=True, help="Site key (e.g. dentists)")
    ap.add_argument("--top-queries", type=int, default=20, help="Number of head queries to SERP")
    ap.add_argument("--keep", type=int, default=15, help="Number of competitors to keep")
    ap.add_argument("--num", type=int, default=10, help="Organic results per query")
    args = ap.parse_args()
    site = args.site

    if not SUPABASE_ACCESS_TOKEN:
        print("ERROR: SUPABASE_ACCESS_TOKEN not set in env.")
        return 1

    disc_path, disc = _load_discovery(site)
    own = (disc.get("ownDomain") or "").lower()
    exclude = set(EXCLUDE_DOMAINS)
    if own:
        exclude.add(own)

    # 1. Top head queries from GSC
    sql = f"""
        SELECT query, SUM(impressions) AS imp
        FROM gsc_query_data
        WHERE site_key = '{site}'
          AND date >= (CURRENT_DATE - INTERVAL '90 days')
        GROUP BY query
        ORDER BY imp DESC
        LIMIT {args.top_queries}
    """
    rows = _mgmt_select(sql)
    queries = [r["query"] for r in rows if r.get("query")]
    print(f"Top {len(queries)} head queries for {site} (last 90d):")
    for r in rows:
        print(f"  {int(r['imp']):>6}  {r['query']}")
    print()

    if not queries:
        print("No GSC queries found — cannot derive competitors from SERP.")
        return 1

    # 2. SERP each query, tally registrable domains
    freq: Counter[str] = Counter()
    query_hits: dict[str, set[str]] = {}
    for q in queries:
        results = fetch_organic_results(q, num=args.num, region="uk-en", site_key=site)
        if not results:
            print(f"  [skip] no results for: {q!r}")
            continue
        seen_this_query: set[str] = set()
        for res in results:
            host = res.get("domain") or urlparse(res.get("link") or "").netloc
            dom = registrable_domain(host)
            if not dom or dom in exclude:
                continue
            # Count each domain at most once per query (presence, not depth)
            if dom in seen_this_query:
                continue
            seen_this_query.add(dom)
            freq[dom] += 1
            query_hits.setdefault(dom, set()).add(q)
        print(f"  [{q!r}] -> {len(seen_this_query)} candidate domains")

    if not freq:
        print("\nNo competitor domains derived (DDG returned nothing usable).")
        return 1

    ranked = freq.most_common()
    print("\n=== Ranked competitor universe (domain | #queries-present) ===")
    for dom, n in ranked:
        print(f"  {n:>3}  {dom}")

    top = [dom for dom, _ in ranked[: args.keep]]
    disc["competitors"] = top
    disc_path.write_text(json.dumps(disc, indent=2) + "\n", encoding="utf-8")

    print(f"\nWrote top {len(top)} competitors into {disc_path}:")
    for dom in top:
        print(f"  {freq[dom]:>3}  {dom}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
