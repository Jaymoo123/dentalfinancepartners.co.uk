"""
DataForSEO ingestion — executes the approved budget plan.

Per-site allocation (from the brief, confirmed 2026-05-19):
  agency:     ~$0.24 (4 calls: competitors, suggestions, ranked, bulk KD)
  property:   ~$0.16 (4 calls)
  dentists:   ~$0.10 (3 calls — no competitor ranked_keywords this round)
  generalist: ~$0.05 (2 calls — minimal)

Hard stop: refuses any call that would push the day's DataForSEO total over
DATAFORSEO_ABORT_AT (defaults to $0.85). The CostTracker.guard handles this.

The plan is data-driven:
  - Seed keywords come from the top GSC queries by impressions in the last 28 days.
  - Competitors come from competitors_domain on the site's own domain.

This script does NOT auto-run unless --execute is passed. Default is --dry-run
which prints the planned calls and estimated costs without spending.
"""
from __future__ import annotations

import argparse
import os
import sys
from datetime import date, timedelta

import httpx

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from optimisation_engine.clients.dataforseo_client import (  # noqa: E402
    DataForSEOClient,
    persist_bulk_keyword_difficulty,
    persist_competitors_domain,
    persist_keyword_suggestions,
    persist_ranked_keywords,
)
from optimisation_engine.config import (  # noqa: E402
    DATAFORSEO_SITE_BUDGETS,
    SUPABASE_KEY,
    SUPABASE_URL,
    get_site,
)
from optimisation_engine.cost_tracker import BudgetExceeded, CostTracker, IdempotencyHit


_DEFAULT_STOP = {
    "uk", "the", "a", "an", "and", "or", "for", "of", "in", "on", "to",
    "is", "are", "do", "what", "how", "why", "when", "with", "by", "at",
    "vs", "as",
}


def _tokens(q: str) -> set[str]:
    return {t for t in q.lower().split() if t and t not in _DEFAULT_STOP}


def _jaccard(a: set[str], b: set[str]) -> float:
    if not a or not b:
        return 0.0
    return len(a & b) / max(1, len(a | b))


def _top_gsc_queries(
    site_key: str,
    *,
    limit: int,
    days: int = 28,
    exclude: list[str] | None = None,
    max_overlap: float = 0.7,
    candidate_pool: int = 50,
) -> list[str]:
    """Return top distinct GSC queries by impressions for this site.

    Filters:
      - 'exclude' list (lowercase exact match) is dropped first.
      - Each new seed must have Jaccard overlap < max_overlap against every
        already-accepted seed, so near-duplicates ('uk cgt rates ...' vs
        'current uk cgt rates ...') don't both consume DataForSEO budget.

    Args:
        candidate_pool: how many ranked queries to consider before filtering.
    """
    exclude_set = {(s or "").strip().lower() for s in (exclude or [])}

    start = (date.today() - timedelta(days=days)).isoformat()
    url = f"{SUPABASE_URL}/rest/v1/gsc_query_data"
    headers = {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}
    r = httpx.get(
        url,
        headers=headers,
        params={
            "select": "query,impressions",
            "site_key": f"eq.{site_key}",
            "date": f"gte.{start}",
            "order": "impressions.desc",
            "limit": "2000",
        },
        timeout=15.0,
    )
    r.raise_for_status()

    seen_exact: set[str] = set()
    accepted: list[str] = []
    accepted_tokens: list[set[str]] = []
    considered = 0

    for row in r.json():
        if considered >= candidate_pool and len(accepted) >= limit:
            break
        q = (row.get("query") or "").strip()
        if not q or q in seen_exact:
            continue
        seen_exact.add(q)
        considered += 1
        if q.lower() in exclude_set:
            continue
        toks = _tokens(q)
        if any(_jaccard(toks, prev) >= max_overlap for prev in accepted_tokens):
            continue
        accepted.append(q)
        accepted_tokens.append(toks)
        if len(accepted) >= limit:
            break
    return accepted


# Per-site call plan: seeds + competitor depth + manual seed exclusions.
# The seed exclusions catch noise impressions that aren't real niche intent
# (e.g. 'cis accountant' on the agency site).
SITE_PLANS: dict[str, dict] = {
    "agency": {
        "n_seeds": 5,
        "do_competitors": True,
        "do_ranked_keywords": True,
        "n_competitors_for_ranked": 2,
        "do_bulk_kd": True,
        "seed_exclude": ["cis accountant"],
    },
    "property": {
        "n_seeds": 3,
        "do_competitors": True,
        "do_ranked_keywords": True,
        "n_competitors_for_ranked": 1,
        "do_bulk_kd": True,
        "seed_exclude": [],
    },
    "dentists": {
        "n_seeds": 3,
        "do_competitors": True,
        "do_ranked_keywords": False,
        "n_competitors_for_ranked": 0,
        "do_bulk_kd": True,
        "seed_exclude": [],
    },
    # generalist intentionally omitted from active plan: no GSC seeds yet (2026-05-19)
    "generalist": {
        "n_seeds": 3,
        "do_competitors": False,
        "do_ranked_keywords": False,
        "n_competitors_for_ranked": 0,
        "do_bulk_kd": True,
        "seed_exclude": [],
    },
}


def estimate_site_cost(site_key: str, plan: dict) -> float:
    """Rough cost estimate based on the plan."""
    suggestions = plan["n_seeds"] * (0.01 + 0.0001 * 200)  # 200 rows per seed
    competitors = 0.05 if plan["do_competitors"] else 0.0
    ranked = plan["n_competitors_for_ranked"] * (0.01 + 0.0001 * 500) if plan["do_ranked_keywords"] else 0.0
    bulk_kd = 0.01 if plan["do_bulk_kd"] else 0.0
    return suggestions + competitors + ranked + bulk_kd


def execute_site(site_key: str, *, dry_run: bool) -> dict:
    """Run the planned DataForSEO calls for one site."""
    plan = SITE_PLANS[site_key]
    budget = DATAFORSEO_SITE_BUDGETS[site_key]
    site = get_site(site_key)

    seeds = _top_gsc_queries(
        site_key,
        limit=plan["n_seeds"],
        exclude=plan.get("seed_exclude") or [],
    )
    if not seeds:
        print(f"[{site_key}] no GSC seed queries available yet (gsc_query_data empty). Skipping.")
        return {"site_key": site_key, "skipped": True, "reason": "no_gsc_seeds"}

    cost_est = estimate_site_cost(site_key, plan)
    print(f"\n=== {site_key} ===")
    print(f"  domain:              {site['domain']}")
    print(f"  budget ceiling:      ${budget:.2f}")
    print(f"  estimated cost:      ${cost_est:.4f}")
    print(f"  seeds ({len(seeds)}):", seeds)
    print(f"  do_competitors:      {plan['do_competitors']}")
    print(f"  do_ranked_keywords:  {plan['do_ranked_keywords']} (n={plan['n_competitors_for_ranked']})")
    print(f"  do_bulk_kd:          {plan['do_bulk_kd']}")

    if dry_run:
        return {"site_key": site_key, "dry_run": True, "estimated": cost_est, "seeds": seeds}

    client = DataForSEOClient()
    summary = {"site_key": site_key, "calls": [], "rows_persisted": 0}
    all_keywords_seen: set[str] = set()

    # 1) keyword_suggestions for each seed
    for seed in seeds:
        try:
            resp = client.keyword_suggestions(site_key=site_key, seed_keyword=seed, limit=200)
            n = persist_keyword_suggestions(site_key=site_key, seed_keyword=seed, response=resp)
            summary["calls"].append({"call": "keyword_suggestions", "seed": seed, "rows": n, "cost": resp.get("cost", 0)})
            summary["rows_persisted"] += n
            # Collect for bulk KD enrichment
            for task in resp.get("tasks", []) or []:
                for result in task.get("result", []) or []:
                    for item in result.get("items", []) or []:
                        kw = (item.get("keyword_data") or {}).get("keyword")
                        if kw:
                            all_keywords_seen.add(kw)
        except (BudgetExceeded, IdempotencyHit) as exc:
            print(f"[{site_key}] keyword_suggestions for '{seed}' aborted: {exc}")
            summary["calls"].append({"call": "keyword_suggestions", "seed": seed, "error": str(exc)})

    # 2) competitors_domain
    competitor_domains: list[str] = []

    def _normalise_domain(d: str | None) -> str:
        if not d:
            return ""
        # Strip protocol, leading 'www.', trailing slash; lowercase
        d = d.lower().strip()
        for prefix in ("https://", "http://"):
            if d.startswith(prefix):
                d = d[len(prefix):]
        if d.startswith("www."):
            d = d[4:]
        return d.rstrip("/")

    own_domain_norm = _normalise_domain(site["domain"])

    if plan["do_competitors"]:
        try:
            resp = client.competitors_domain(site_key=site_key, domain=site["domain"], limit=20)
            n = persist_competitors_domain(site_key=site_key, response=resp)
            summary["calls"].append({"call": "competitors_domain", "rows": n, "cost": resp.get("cost", 0)})
            summary["rows_persisted"] += n
            for task in resp.get("tasks", []) or []:
                for result in task.get("result", []) or []:
                    for item in result.get("items", []) or []:
                        d = item.get("domain")
                        if d and _normalise_domain(d) != own_domain_norm:
                            competitor_domains.append(d)
        except (BudgetExceeded, IdempotencyHit) as exc:
            print(f"[{site_key}] competitors_domain aborted: {exc}")
            summary["calls"].append({"call": "competitors_domain", "error": str(exc)})

    # 3) ranked_keywords for top competitors
    if plan["do_ranked_keywords"] and competitor_domains:
        for comp in competitor_domains[: plan["n_competitors_for_ranked"]]:
            try:
                resp = client.ranked_keywords(site_key=site_key, domain=comp, limit=500)
                n = persist_ranked_keywords(site_key=site_key, competitor_domain=comp, response=resp)
                summary["calls"].append({"call": "ranked_keywords", "domain": comp, "rows": n, "cost": resp.get("cost", 0)})
                summary["rows_persisted"] += n
            except (BudgetExceeded, IdempotencyHit) as exc:
                print(f"[{site_key}] ranked_keywords for '{comp}' aborted: {exc}")
                summary["calls"].append({"call": "ranked_keywords", "domain": comp, "error": str(exc)})

    # 4) bulk_keyword_difficulty over collected keywords (up to 1000)
    if plan["do_bulk_kd"] and all_keywords_seen:
        kw_list = list(all_keywords_seen)[:1000]
        try:
            resp = client.bulk_keyword_difficulty(site_key=site_key, keywords=kw_list)
            n = persist_bulk_keyword_difficulty(site_key=site_key, response=resp)
            summary["calls"].append({"call": "bulk_keyword_difficulty", "rows": n, "cost": resp.get("cost", 0)})
            summary["rows_persisted"] += n
        except (BudgetExceeded, IdempotencyHit) as exc:
            print(f"[{site_key}] bulk_keyword_difficulty aborted: {exc}")
            summary["calls"].append({"call": "bulk_keyword_difficulty", "error": str(exc)})

    return summary


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--sites", nargs="*", default=None, help="Default = all in priority order")
    parser.add_argument("--execute", action="store_true", help="Actually spend money. Default is dry-run.")
    args = parser.parse_args()

    sites = args.sites or ["agency", "property", "dentists", "generalist"]

    print(f"\n{'EXECUTING' if args.execute else 'DRY-RUN'} DataForSEO ingestion for: {sites}")
    print(f"Pre-run DataForSEO spend today: ${CostTracker.spent_today('dataforseo'):.4f}")
    print(f"Remaining budget:                ${CostTracker.remaining_budget_dataforseo():.4f}")

    if args.execute:
        client = DataForSEOClient()
        bal = client.get_account_balance()
        balance = (bal.get("tasks", [{}])[0].get("result", [{}])[0].get("money") or {}).get("balance", 0)
        print(f"Live DataForSEO account balance: ${balance}")

    grand_total_est = sum(estimate_site_cost(s, SITE_PLANS[s]) for s in sites)
    print(f"Total estimated cost across {len(sites)} sites: ${grand_total_est:.4f}")

    summaries = []
    for site_key in sites:
        try:
            summaries.append(execute_site(site_key, dry_run=not args.execute))
        except Exception as exc:
            print(f"[ERROR] site {site_key} failed: {exc}")
            summaries.append({"site_key": site_key, "error": str(exc)})

    print("\n=== Final summary ===")
    for s in summaries:
        print(s)
    print(f"\nPost-run DataForSEO spend today: ${CostTracker.spent_today('dataforseo'):.4f}")


if __name__ == "__main__":
    main()
