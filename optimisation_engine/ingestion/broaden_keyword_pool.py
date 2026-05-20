"""
Broaden the DataForSEO keyword pool.

Adds two endpoints on top of the initial keyword_suggestions run:
  * related_keywords on the same GSC seeds (semantic neighbourhood)
  * keywords_for_site on top filtered competitor domains

Filters out aggregator / non-competitor domains (gov.uk, reddit, youtube, etc.)
before spending on keywords_for_site.

All calls run through CostTracker.guard — hard stop at DATAFORSEO_ABORT_AT.

Usage:
  python -m optimisation_engine.ingestion.broaden_keyword_pool                 # dry-run
  python -m optimisation_engine.ingestion.broaden_keyword_pool --execute       # spend money
"""
from __future__ import annotations

import argparse
import os
import sys

import httpx

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from optimisation_engine.clients.dataforseo_client import (  # noqa: E402
    DataForSEOClient,
    persist_keywords_for_site,
    persist_related_keywords,
)
from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL, get_site  # noqa: E402
from optimisation_engine.cost_tracker import BudgetExceeded, CostTracker, IdempotencyHit
from optimisation_engine.ingestion.ingest_dataforseo import (  # noqa: E402
    SITE_PLANS,
    _top_gsc_queries,
)

# Aggregators / non-competitor domains that show up in competitors_domain
# results but aren't useful keyword targets for a UK accounting niche.
COMPETITOR_JUNK = {
    "youtube.com", "reddit.com", "facebook.com", "twitter.com", "x.com",
    "linkedin.com", "instagram.com", "tiktok.com", "pinterest.com",
    "gov.uk", "www.gov.uk", "hmrc.gov.uk", "ico.org.uk",
    "litrg.org.uk", "hoa.org.uk", "moneysavingexpert.com",
    "which.co.uk", "justanswer.com", "justanswer.co.uk", "raisin.com",
    "quora.com", "wikipedia.org", "en.wikipedia.org",
    "answers.com", "stackoverflow.com",
}

# Endpoint per-call cost (UK, limit=200): 0.01 base + 0.0001 * 200 = 0.03
EST_COST_PER_CALL = 0.03

# Per-call row limit. Bigger = more keywords but linearly more expensive.
LIMIT = 200


def _supabase_headers() -> dict[str, str]:
    return {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}


def _top_competitors(site_key: str, *, n: int = 3) -> list[str]:
    """Pull top-N competitor domains for a site, excluding junk + own site."""
    own = (get_site(site_key).get("domain") or "").lower()
    own_norm = own.lstrip("https://").lstrip("http://").lstrip("www.").rstrip("/")

    url = f"{SUPABASE_URL}/rest/v1/dataforseo_competitor_data"
    r = httpx.get(
        url,
        headers=_supabase_headers(),
        params={
            "select": "competitor_domain,intersection_count",
            "site_key": f"eq.{site_key}",
            "intersection_count": "not.is.null",
            "order": "intersection_count.desc",
            "limit": "30",
        },
        timeout=15.0,
    )
    r.raise_for_status()
    out: list[str] = []
    seen: set[str] = set()
    for row in r.json():
        d = (row.get("competitor_domain") or "").lower().strip()
        if not d or d in seen:
            continue
        seen.add(d)
        d_norm = d.lstrip("www.").rstrip("/")
        if d in COMPETITOR_JUNK or d_norm in COMPETITOR_JUNK:
            continue
        if d_norm == own_norm or d == own:
            continue
        out.append(d)
        if len(out) >= n:
            break
    return out


def plan_for(site_key: str) -> dict:
    """Build the per-site call plan (seeds + filtered competitors)."""
    plan = SITE_PLANS.get(site_key, {})
    n_seeds = plan.get("n_seeds", 3)
    seeds = _top_gsc_queries(
        site_key,
        limit=n_seeds,
        exclude=plan.get("seed_exclude") or [],
    )
    competitors = _top_competitors(site_key, n=3)
    est = (len(seeds) + len(competitors)) * EST_COST_PER_CALL
    return {
        "site_key": site_key,
        "seeds": seeds,
        "competitors": competitors,
        "estimated_cost_usd": round(est, 4),
    }


def execute_site(site_key: str, *, dry_run: bool) -> dict:
    p = plan_for(site_key)
    summary = {"site_key": site_key, "seeds": p["seeds"], "competitors": p["competitors"], "calls": [], "rows": 0}
    print(f"\n=== {site_key} ===")
    print(f"  seeds:       {p['seeds']}")
    print(f"  competitors: {p['competitors']}")
    print(f"  est cost:    ${p['estimated_cost_usd']:.4f}")
    if dry_run:
        summary["dry_run"] = True
        return summary

    client = DataForSEOClient()

    # 1) related_keywords on each seed (cap at 200 each)
    for seed in p["seeds"]:
        try:
            resp = client.related_keywords(site_key=site_key, seed_keyword=seed, limit=LIMIT)
            n = persist_related_keywords(site_key=site_key, seed_keyword=seed, response=resp)
            summary["calls"].append({"call": "related_keywords", "seed": seed, "rows": n, "cost": resp.get("cost", 0)})
            summary["rows"] += n
        except (BudgetExceeded, IdempotencyHit) as exc:
            print(f"[{site_key}] related_keywords for {seed!r} aborted: {exc}")
            summary["calls"].append({"call": "related_keywords", "seed": seed, "error": str(exc)})

    # 2) keywords_for_site on each filtered competitor (cap at 200 each)
    for comp in p["competitors"]:
        try:
            resp = client.keywords_for_site(site_key=site_key, target_domain=comp, limit=LIMIT)
            n = persist_keywords_for_site(site_key=site_key, target_domain=comp, response=resp)
            summary["calls"].append({"call": "keywords_for_site", "domain": comp, "rows": n, "cost": resp.get("cost", 0)})
            summary["rows"] += n
        except (BudgetExceeded, IdempotencyHit) as exc:
            print(f"[{site_key}] keywords_for_site for {comp!r} aborted: {exc}")
            summary["calls"].append({"call": "keywords_for_site", "domain": comp, "error": str(exc)})

    return summary


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--sites", nargs="*", default=["agency", "property", "dentists"])
    parser.add_argument("--execute", action="store_true")
    args = parser.parse_args()

    print(f"Pre-run DataForSEO spend today: ${CostTracker.spent_today('dataforseo'):.4f}")
    print(f"Remaining budget gate:           ${CostTracker.remaining_budget_dataforseo():.4f}")

    plans = [plan_for(s) for s in args.sites]
    total_est = sum(p["estimated_cost_usd"] for p in plans)
    print(f"\nTotal estimated additional cost: ${total_est:.4f}")
    print("Per-site plan preview:")
    for p in plans:
        n_seeds = len(p["seeds"])
        n_comp = len(p["competitors"])
        print(f"  {p['site_key']:11s} seeds={n_seeds} comp={n_comp} est=${p['estimated_cost_usd']:.4f}")

    if not args.execute:
        print("\n[DRY-RUN] Pass --execute to actually spend the budget.")
        return

    summaries = [execute_site(s, dry_run=False) for s in args.sites]
    print("\n=== Final summary ===")
    total_rows = 0
    for s in summaries:
        print(s)
        total_rows += s.get("rows", 0)
    print(f"\nTotal NEW keyword rows persisted: {total_rows}")
    print(f"Post-run DataForSEO spend today: ${CostTracker.spent_today('dataforseo'):.4f}")


if __name__ == "__main__":
    main()
