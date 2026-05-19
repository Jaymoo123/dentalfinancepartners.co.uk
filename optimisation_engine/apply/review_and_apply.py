"""
Interactive review CLI for the optimisation_opportunities queue.

For each proposed opportunity with an action_plan, this tool:
  1. Builds a ChangeBrief via the dispatcher.
  2. Prints the brief in the 3-section format.
  3. Prompts the operator: [a]pply / [r]eject / [s]kip / [q]uit.
  4. On apply: routes to the right apply module and reports the commit hash.
  5. On reject: marks the opportunity status='rejected' with notes.

Usage:
  python -m optimisation_engine.apply.review_and_apply
  python -m optimisation_engine.apply.review_and_apply --site property
  python -m optimisation_engine.apply.review_and_apply --kind meta_only
  python -m optimisation_engine.apply.review_and_apply --auto-apply-high-confidence
"""
from __future__ import annotations

import argparse
import os
import sys
from datetime import datetime, timezone
from pathlib import Path

import httpx

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.apply.base import ApplyError
from optimisation_engine.apply.dispatcher import apply_brief, build_brief_for
from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL


def _headers() -> dict[str, str]:
    return {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
    }


def fetch_queue(*, site_key: str | None, kind: str | None, min_confidence: int = 0, limit: int = 50) -> list[dict]:
    url = f"{SUPABASE_URL}/rest/v1/optimisation_opportunities"
    params = {
        "select": "*",
        "status": "eq.proposed",
        "action_kind": "not.is.null",
        "order": "action_plan_confidence.desc,score.desc",
        "limit": str(limit),
    }
    if site_key:
        params["site_key"] = f"eq.{site_key}"
    if kind:
        params["action_kind"] = f"eq.{kind}"
    if min_confidence > 0:
        params["action_plan_confidence"] = f"gte.{min_confidence}"
    r = httpx.get(url, headers={"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}, params=params, timeout=30.0)
    r.raise_for_status()
    return r.json()


def reject_opportunity(opp_id: str, reason: str) -> bool:
    url = f"{SUPABASE_URL}/rest/v1/optimisation_opportunities"
    r = httpx.patch(
        url,
        headers={**_headers(), "Prefer": "return=minimal"},
        params={"id": f"eq.{opp_id}"},
        json={
            "status": "rejected",
            "notes": f"manual review: {reason}",
            "reviewed_by": "operator_cli",
            "reviewed_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat(),
        },
        timeout=15.0,
    )
    return r.status_code < 300


def review_loop(*, opportunities: list[dict], auto_apply_high: bool = False, dry_run: bool = False) -> dict:
    applied = 0
    rejected = 0
    skipped = 0
    blocked = 0
    errors = 0

    for i, opp in enumerate(opportunities, 1):
        print()
        print("#" * 80)
        print(f"# OPPORTUNITY {i}/{len(opportunities)}")
        print("#" * 80)
        try:
            brief = build_brief_for(opp)
        except ApplyError as exc:
            print(f"[SKIP] could not build brief: {exc}")
            skipped += 1
            continue

        print(brief.format_human())

        if not brief.can_apply:
            blocked += 1
            if not dry_run:
                # Auto-reject blocked ones? Keep them as proposed for now so operator can see them.
                pass
            continue

        # Decide what to do
        decision = "?"
        if auto_apply_high and (opp.get("action_plan_confidence") or 0) >= 85 and brief.apply_module in {"meta_only", "schema_only"}:
            decision = "a"  # auto-apply only low-risk kinds at high confidence
            print(f"\n[AUTO-APPLY: confidence >= 85 and apply_module in safe-set]")
        elif dry_run:
            decision = "s"
            print("\n[DRY-RUN: skipping all applies]")
        else:
            try:
                choice = input("\n[a]pply / [r]eject / [s]kip / [q]uit > ").strip().lower()
            except EOFError:
                choice = "q"
            decision = choice[:1] if choice else "s"

        if decision == "q":
            print("Quitting review.")
            break
        if decision == "a":
            try:
                result = apply_brief(brief)
                print(f"[APPLIED] commit={result.get('commit_hash')[:10]} change_id={result.get('change_id')}")
                applied += 1
            except ApplyError as exc:
                print(f"[ERROR] apply failed: {exc}")
                errors += 1
        elif decision == "r":
            reason = "manual reject"
            if not dry_run:
                try:
                    reason = input("reason? > ").strip() or "manual reject"
                except EOFError:
                    pass
            if not dry_run:
                reject_opportunity(opp["id"], reason)
            print(f"[REJECTED] reason={reason}")
            rejected += 1
        else:
            print("[SKIPPED]")
            skipped += 1

    print()
    print("=" * 80)
    print(f"Review complete: applied={applied} rejected={rejected} skipped={skipped} blocked={blocked} errors={errors}")
    print("=" * 80)
    return {"applied": applied, "rejected": rejected, "skipped": skipped, "blocked": blocked, "errors": errors}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--site", default=None)
    parser.add_argument("--kind", default=None, help="action_kind filter (meta_only, in_text_embedding, etc.)")
    parser.add_argument("--min-confidence", type=int, default=0)
    parser.add_argument("--limit", type=int, default=50)
    parser.add_argument("--auto-apply-high-confidence", action="store_true",
                        help="auto-apply meta_only/schema_only at action_plan_confidence>=85")
    parser.add_argument("--dry-run", action="store_true",
                        help="show briefs only; never apply or reject")
    args = parser.parse_args()

    opps = fetch_queue(
        site_key=args.site,
        kind=args.kind,
        min_confidence=args.min_confidence,
        limit=args.limit,
    )
    print(f"Loaded {len(opps)} opportunities matching filters")
    if not opps:
        return
    review_loop(
        opportunities=opps,
        auto_apply_high=args.auto_apply_high_confidence,
        dry_run=args.dry_run,
    )


if __name__ == "__main__":
    main()
