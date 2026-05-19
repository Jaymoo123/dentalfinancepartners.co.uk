"""
Weekly optimisation run.

Single entry point that orchestrates the whole pipeline:

  1. Pull fresh GSC query-level data (page+query+date) for all active sites.
  2. Pull a small, rotating DataForSEO slice (one priority site gets the
     deeper pull each week; others get a smaller refresh).
  3. Re-run opportunity detection across every site.
  4. Auto-apply the highest-confidence, lowest-risk changes
     (title/meta rewrites, schema additions, internal links) on a
     per-site feature branch, commit, and notify.
  5. Queue medium/high-risk proposals into optimisation_opportunities for
     human review.
  6. Log everything to optimisation_changes / api_cost_log.

Idempotent: re-running on the same day won't double-bill DataForSEO (idempotency
keys + api_cost_log gates), won't duplicate GSC rows (UNIQUE constraint), and
won't queue duplicate opportunities (UNIQUE index on
(site_key, opportunity_type, target_url, primary_query) for non-terminal statuses).

Usage:
  python -m optimisation_engine.weekly_run                       # full run
  python -m optimisation_engine.weekly_run --skip-dataforseo     # cheap dev run
  python -m optimisation_engine.weekly_run --skip-apply          # detect-only
  python -m optimisation_engine.weekly_run --site agency         # one site

Schedule:
  GitHub Actions cron suggested; see .github/workflows/weekly-optimisation.yml
"""
from __future__ import annotations

import argparse
import json
import os
import sys
from datetime import date, timedelta
from typing import Any

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from optimisation_engine.analysis.detectors import run_all_detectors  # noqa: E402
from optimisation_engine.config import PRIORITY_ORDER, get_sites  # noqa: E402
from optimisation_engine.cost_tracker import CostTracker  # noqa: E402
from optimisation_engine.ingestion.ingest_dataforseo import (  # noqa: E402
    SITE_PLANS as DFS_SITE_PLANS,
    execute_site as execute_dfs_site,
    estimate_site_cost,
)
from optimisation_engine.ingestion.ingest_gsc_queries import run as run_gsc_ingestion  # noqa: E402

# ---------------------------------------------------------------------------
# Weekly DataForSEO rotation
# ---------------------------------------------------------------------------
# The brief specifies that each week one site should get the deeper pull and
# the others should get a smaller refresh, so that over a month all niches are
# covered without ever exceeding the trial budget.
#
# Rotation: based on ISO week number mod 4 against the priority order.

ROTATION = ["agency", "property", "dentists", "generalist"]


def deep_pull_site_this_week() -> str:
    iso_week = date.today().isocalendar()[1]
    return ROTATION[iso_week % len(ROTATION)]


def light_dfs_plan_for(site_key: str) -> dict:
    """Smaller plan used for non-deep-pull weeks: keyword_suggestions on 2 seeds
    + bulk_keyword_difficulty only. No competitor calls. Cost ~$0.07.
    """
    base = dict(DFS_SITE_PLANS[site_key])
    base["n_seeds"] = 2
    base["do_competitors"] = False
    base["do_ranked_keywords"] = False
    base["n_competitors_for_ranked"] = 0
    base["do_bulk_kd"] = True
    return base


# ---------------------------------------------------------------------------
# Steps
# ---------------------------------------------------------------------------


def step_ingest_gsc(sites: list[str]) -> dict[str, int]:
    print("\n" + "=" * 80)
    print("[Step 1] GSC query-level ingestion (free)")
    print("=" * 80)
    return run_gsc_ingestion(site_keys=sites, days=28)


def step_ingest_dataforseo(*, sites: list[str], execute: bool) -> list[dict]:
    print("\n" + "=" * 80)
    print(f"[Step 2] DataForSEO ingestion ({'EXECUTE' if execute else 'DRY-RUN'})")
    print("=" * 80)

    deep_site = deep_pull_site_this_week()
    print(f"  This week's deep-pull site: {deep_site}")
    print(f"  Pre-run DataForSEO spend today: ${CostTracker.spent_today('dataforseo'):.4f}")
    print(f"  Remaining budget:                ${CostTracker.remaining_budget_dataforseo():.4f}")

    summaries: list[dict] = []
    for site in sites:
        plan = DFS_SITE_PLANS[site] if site == deep_site else light_dfs_plan_for(site)
        # Patch DFS_SITE_PLANS for this call (execute_dfs_site reads from it)
        original = DFS_SITE_PLANS[site]
        DFS_SITE_PLANS[site] = plan
        try:
            est = estimate_site_cost(site, plan)
            print(f"  {site:11s} {'DEEP' if site == deep_site else 'light'} estimated ${est:.4f}")
            if execute:
                summaries.append(execute_dfs_site(site, dry_run=False))
            else:
                summaries.append({"site_key": site, "dry_run": True, "estimated": est, "plan": plan})
        finally:
            DFS_SITE_PLANS[site] = original

    print(f"  Post-run DataForSEO spend today: ${CostTracker.spent_today('dataforseo'):.4f}")
    return summaries


def step_detect(sites: list[str]) -> list[dict]:
    print("\n" + "=" * 80)
    print("[Step 3] Opportunity detection")
    print("=" * 80)
    return [run_all_detectors(s) for s in sites]


def step_apply_high_confidence(*, dry_run: bool) -> dict:
    """Auto-apply only the lowest-risk, highest-confidence proposals.

    This session: NOT auto-applying via LLM in the cron path yet — the
    rewrite copy generation is the part that benefits most from human/Claude
    review. The cron path queues even high-confidence opportunities for the
    operator to apply in the next interactive session, with a clear summary.

    Future: gate true auto-apply behind a flag once the LLM-driven rewrite
    composer (Claude Sonnet 4.6 for strategy + DeepSeek for mechanical
    drafting) has shipped and been validated for two cycles.
    """
    print("\n" + "=" * 80)
    print("[Step 4] Auto-apply (dry-run by default this cycle)")
    print("=" * 80)
    print("  No auto-applied changes this cycle. High-confidence opportunities are")
    print("  queued in public.optimisation_opportunities for interactive review.")
    print("  Once the LLM rewrite composer is validated, this step will:")
    print("    - rewrite_title_meta opportunities at confidence='high' -> auto-apply")
    print("    - schema_addition + internal_link opportunities -> auto-apply")
    print("    - expand_page, new_page, intent_realignment -> always queue")
    return {"auto_applied": 0, "queued_for_review": "see optimisation_opportunities"}


def step_review_outcomes() -> dict:
    """For each shipped change whose performance_review_due_at has passed and
    outcome_verdict is still pending, compute a simple verdict from
    vw_change_performance and update the row.

    Heuristic verdict:
      - sum(impressions) post-shipping vs gsc_baseline.impressions_28d
      - sum(clicks) post-shipping vs gsc_baseline.clicks_28d
      - average position post-shipping vs gsc_baseline.best_position_28d
    """
    import httpx
    from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL

    h = {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}
    today_iso = date.today().isoformat()
    r = httpx.get(
        f"{SUPABASE_URL}/rest/v1/optimisation_changes",
        headers=h,
        params={
            "select": "id,site_key,target_url,shipped_at,gsc_baseline",
            "performance_review_due_at": f"lte.{today_iso}",
            "outcome_verdict": "eq.pending",
            "order": "shipped_at.asc",
        },
        timeout=20.0,
    )
    due = r.json() if r.status_code < 300 else []
    print(f"\n[Step 5] Outcome review: {len(due)} changes have hit their review window")

    verdicts: list[dict] = []
    for change in due:
        baseline = change.get("gsc_baseline") or {}
        baseline_imp = baseline.get("impressions_28d") or 0
        baseline_clicks = baseline.get("clicks_28d") or 0
        baseline_pos = baseline.get("best_position_28d") or 99

        # Sum impressions / clicks since shipped_at
        rp = httpx.get(
            f"{SUPABASE_URL}/rest/v1/vw_change_performance",
            headers=h,
            params={
                "select": "perf_date,impressions,clicks,position",
                "change_id": f"eq.{change['id']}",
                "days_since_shipped": "gte.0",
            },
            timeout=20.0,
        )
        rows = rp.json() if rp.status_code < 300 else []
        if not rows:
            verdicts.append({"change_id": change["id"], "verdict": "neutral", "reason": "no post-ship GSC rows"})
            continue
        post_imp = sum(int(x.get("impressions") or 0) for x in rows)
        post_clicks = sum(int(x.get("clicks") or 0) for x in rows)
        positions = [float(x["position"]) for x in rows if x.get("position")]
        avg_pos = sum(positions) / len(positions) if positions else 99

        imp_delta = post_imp - baseline_imp
        click_delta = post_clicks - baseline_clicks
        pos_delta = baseline_pos - avg_pos  # positive = improved (lower number)

        if click_delta > 0 and (imp_delta >= 0 or pos_delta >= 0):
            verdict = "positive"
        elif click_delta < 0 and pos_delta < -2:
            verdict = "negative"
        else:
            verdict = "neutral"
        verdicts.append(
            {
                "change_id": change["id"],
                "verdict": verdict,
                "imp_delta": imp_delta,
                "click_delta": click_delta,
                "pos_delta": round(pos_delta, 2),
            }
        )

        httpx.patch(
            f"{SUPABASE_URL}/rest/v1/optimisation_changes",
            headers={**h, "Prefer": "return=minimal", "Content-Type": "application/json"},
            params={"id": f"eq.{change['id']}"},
            json={
                "outcome_verdict": verdict,
                "outcome_notes": json.dumps({"imp_delta": imp_delta, "click_delta": click_delta, "pos_delta": pos_delta}),
            },
            timeout=15.0,
        )

    for v in verdicts:
        print(f"  {v['change_id'][:8]} verdict={v['verdict']} {v}")
    return {"verdicts_recorded": len(verdicts), "details": verdicts}


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--site", help="Restrict to one site_key (otherwise all active)")
    parser.add_argument("--skip-dataforseo", action="store_true")
    parser.add_argument("--dataforseo-dry-run", action="store_true", help="Run DFS planning but do not spend")
    parser.add_argument("--skip-detect", action="store_true")
    parser.add_argument("--skip-apply", action="store_true")
    parser.add_argument("--skip-review", action="store_true")
    args = parser.parse_args()

    if args.site:
        sites = [args.site]
    else:
        sites = [s["site_key"] for s in get_sites(active_only=True)]
        sites.sort(key=lambda k: PRIORITY_ORDER.index(k) if k in PRIORITY_ORDER else 999)

    print(f"Weekly run: sites={sites} date={date.today().isoformat()}")

    report: dict[str, Any] = {"date": date.today().isoformat(), "sites": sites}

    # Step 1: GSC (always free, always run)
    report["gsc"] = step_ingest_gsc(sites)

    # Step 2: DataForSEO
    if args.skip_dataforseo:
        print("\n[Step 2] DataForSEO skipped via --skip-dataforseo")
        report["dataforseo"] = "skipped"
    else:
        report["dataforseo"] = step_ingest_dataforseo(
            sites=[s for s in sites if s in DFS_SITE_PLANS],
            execute=not args.dataforseo_dry_run,
        )

    # Step 3: Detect
    if args.skip_detect:
        print("\n[Step 3] Detection skipped via --skip-detect")
        report["detect"] = "skipped"
    else:
        report["detect"] = step_detect(sites)

    # Step 4: Apply (conservative this cycle)
    if args.skip_apply:
        report["apply"] = "skipped"
    else:
        report["apply"] = step_apply_high_confidence(dry_run=True)

    # Step 5: Outcome review
    if args.skip_review:
        report["review"] = "skipped"
    else:
        report["review"] = step_review_outcomes()

    print("\n" + "=" * 80)
    print("Weekly run complete")
    print("=" * 80)
    print(json.dumps(report, indent=2, default=str)[:3000])


if __name__ == "__main__":
    main()
