"""
Runner for Checkpoint 4 — Action Specifier.

Reads top-N proposed opportunities from optimisation_opportunities, runs
each through specify_action(), and updates the row with action_kind +
action_plan + action_plan_confidence + action_plan_generated_at.

Idempotent: skips opportunities that already have action_plan_generated_at
within last 14 days (configurable).
"""
from __future__ import annotations

import argparse
import json
import os
import sys
from datetime import datetime, timedelta

import httpx

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL  # noqa: E402
from optimisation_engine.reasoning.action_specifier import specify_action  # noqa: E402


def _headers() -> dict[str, str]:
    return {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}", "Content-Type": "application/json"}


def fetch_proposed(site_key: str | None, *, limit: int, skip_recent_days: int = 14, min_score: int = 0) -> list[dict]:
    url = f"{SUPABASE_URL}/rest/v1/optimisation_opportunities"
    params = {
        "select": "id,site_key,opportunity_type,target_url,primary_query,target_query_cluster,recommended_action,rationale,supporting_data,score,confidence,action_plan_generated_at",
        "status": "eq.proposed",
        "order": "score.desc,created_at.desc",
        "limit": str(limit * 3),  # over-fetch to filter
    }
    if site_key:
        params["site_key"] = f"eq.{site_key}"
    if min_score > 0:
        params["score"] = f"gte.{min_score}"
    r = httpx.get(url, headers={"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}, params=params, timeout=30.0)
    r.raise_for_status()
    out = []
    cutoff = (datetime.utcnow() - timedelta(days=skip_recent_days)).isoformat()
    for row in r.json():
        # Skip if already specified within the gate window
        if row.get("action_plan_generated_at"):
            if row["action_plan_generated_at"] > cutoff:
                continue
        out.append(row)
        if len(out) >= limit:
            break
    return out


def save_action_plan(opportunity_id: str, result: dict, confidence: int) -> bool:
    url = f"{SUPABASE_URL}/rest/v1/optimisation_opportunities"
    patch = {
        "action_kind": result.get("action_kind"),
        "action_plan": result,
        "action_plan_confidence": confidence,
        "action_plan_generated_at": datetime.utcnow().isoformat(),
        "action_plan_validated": False,  # human-review gate; not yet validated
        "updated_at": datetime.utcnow().isoformat(),
    }
    r = httpx.patch(
        url,
        headers={**_headers(), "Prefer": "return=minimal"},
        params={"id": f"eq.{opportunity_id}"},
        json=patch,
        timeout=20.0,
    )
    if r.status_code >= 300:
        print(f"  [ERR] persist plan for {opportunity_id}: {r.status_code} {r.text[:200]}")
        return False
    return True


def run(*, site_key: str | None = None, limit: int = 10, min_score: int = 50, dry_run: bool = False) -> dict:
    opps = fetch_proposed(site_key, limit=limit, min_score=min_score)
    if not opps:
        print(f"No proposed opportunities to specify (site={site_key} min_score={min_score})")
        return {"specified": 0, "skipped": 0, "cost": 0.0}

    print(f"Specifying actions for {len(opps)} opportunities (site={site_key or 'all'}, min_score={min_score})")
    total_cost = 0.0
    specified = 0
    skipped = 0
    persisted = 0
    by_kind: dict[str, int] = {}

    for i, opp in enumerate(opps, 1):
        slug = (opp.get("target_url") or "(new)").rstrip("/").rsplit("/", 1)[-1][:40]
        print(f"\n[{i}/{len(opps)}] {opp['site_key']} {opp['opportunity_type']:22s} score={opp['score']} q={opp.get('primary_query')!r:45s} pg=.../{slug}")

        try:
            result = specify_action(opp)
        except Exception as exc:
            print(f"  [ERR] specify_action raised: {exc}")
            skipped += 1
            continue

        total_cost += result.cost_usd
        kind = result.output.get("action_kind", "unknown")
        by_kind[kind] = by_kind.get(kind, 0) + 1
        confidence = result.confidence
        print(f"  action_kind={kind} confidence={confidence} cost=${result.cost_usd:.6f}")
        if result.notes:
            print(f"  validator notes: {result.notes}")

        if dry_run:
            print(f"  [DRY-RUN] plan preview: {json.dumps(result.output, indent=2)[:400]}")
            specified += 1
            continue

        if save_action_plan(opp["id"], result.output, confidence):
            persisted += 1
            specified += 1

    print(f"\n=== Action Specifier complete ===")
    print(f"  opportunities processed: {specified}")
    print(f"  skipped on error:        {skipped}")
    print(f"  persisted to Supabase:   {persisted}")
    print(f"  by action_kind:          {by_kind}")
    print(f"  total DeepSeek cost:     ${total_cost:.6f}")
    return {"specified": specified, "skipped": skipped, "persisted": persisted, "by_kind": by_kind, "cost": total_cost}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--site", default=None)
    parser.add_argument("--limit", type=int, default=10)
    parser.add_argument("--min-score", type=int, default=50)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    run(site_key=args.site, limit=args.limit, min_score=args.min_score, dry_run=args.dry_run)


if __name__ == "__main__":
    main()
