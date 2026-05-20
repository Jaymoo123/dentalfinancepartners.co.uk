"""
Sequential queue walker — apply one action_kind at a time.

Usage:
  python -m optimisation_engine.apply.walk_queue --kind meta_only
  python -m optimisation_engine.apply.walk_queue --kind in_text_embedding
  python -m optimisation_engine.apply.walk_queue --kind new_section
  python -m optimisation_engine.apply.walk_queue --kind new_page --site property

For each opportunity matching the filters, builds the brief and applies it
WITHOUT prompting. Blockers are surfaced and the opportunity is skipped (not
rejected — stays as proposed so it can be retried after fixes).

Prints a compact one-line result per opportunity:
  [N/N] site/kind  slug  -> APPLIED commit=<sha> | BLOCKED <reasons> | ERROR <msg>
"""
from __future__ import annotations

import argparse
import os
import sys
import uuid
from pathlib import Path

import httpx

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.apply._self_heal import build_brief_with_self_heal
from optimisation_engine.apply.base import ApplyError
from optimisation_engine.apply.dispatcher import apply_brief, build_brief_for
from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL


def _headers() -> dict[str, str]:
    return {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}


def _log_attempt(
    *,
    walker_run_id: str,
    opp: dict,
    outcome: str,
    blocking_issues: list[str] | None = None,
    error_message: str | None = None,
    error_type: str | None = None,
    change_id: str | None = None,
    git_commit_hash: str | None = None,
    n_self_heal_retries: int = 0,
) -> None:
    """Write one row to apply_attempts. Never raises — if the log call fails
    (network blip, table missing), we just print a warning and continue, so
    the walker isn't blocked by audit failures."""
    payload = {
        "site_key": opp.get("site_key"),
        "action_kind": opp.get("action_kind"),
        "opportunity_id": opp.get("id"),
        "target_url": opp.get("target_url"),
        "target_slug": (opp.get("target_url") or "").rstrip("/").rsplit("/", 1)[-1][:100],
        "primary_query": opp.get("primary_query"),
        "outcome": outcome,
        "blocking_issues": blocking_issues or None,
        "error_message": (error_message[:1500] if error_message else None),
        "error_type": error_type,
        "change_id": change_id,
        "git_commit_hash": git_commit_hash,
        "n_self_heal_retries": n_self_heal_retries,
        "walker_run_id": walker_run_id,
    }
    try:
        r = httpx.post(
            f"{SUPABASE_URL}/rest/v1/apply_attempts",
            headers={**_headers(), "Content-Type": "application/json", "Prefer": "return=minimal"},
            json=payload,
            timeout=15.0,
        )
        if r.status_code >= 400:
            print(f"  [LOG WARN] apply_attempts insert {r.status_code}: {r.text[:200]}")
    except Exception as exc:
        print(f"  [LOG WARN] apply_attempts insert failed: {type(exc).__name__}: {exc}")


def fetch(*, kind: str | None, site: str | None, min_confidence: int = 0, limit: int = 50) -> list[dict]:
    params = {
        "select": "*",
        "status": "eq.proposed",
        "order": "action_plan_confidence.desc,score.desc",
        "limit": str(limit),
    }
    if kind:
        params["action_kind"] = f"eq.{kind}"
    if site:
        params["site_key"] = f"eq.{site}"
    if min_confidence > 0:
        params["action_plan_confidence"] = f"gte.{min_confidence}"
    r = httpx.get(f"{SUPABASE_URL}/rest/v1/optimisation_opportunities", headers=_headers(), params=params, timeout=30.0)
    r.raise_for_status()
    return r.json()


def run(*, kind: str | None, site: str | None, min_confidence: int = 0, limit: int = 50, max_apply: int | None = None) -> None:
    walker_run_id = uuid.uuid4().hex[:12]
    opps = fetch(kind=kind, site=site, min_confidence=min_confidence, limit=limit)
    print(f"\nWalking {len(opps)} opportunities  (kind={kind}, site={site or 'all'}, min_conf={min_confidence})")
    print(f"walker_run_id={walker_run_id}")
    print("=" * 100)

    applied = 0
    blocked = 0
    errored = 0

    for i, opp in enumerate(opps, 1):
        slug = (opp.get("target_url") or "(new)").rstrip("/").rsplit("/", 1)[-1][:55]
        kind_disp = opp.get("action_kind") or "?"
        prefix = f"[{i:3d}/{len(opps)}] {opp['site_key']:11s} {kind_disp:22s} slug=.../{slug:55s}"

        try:
            brief, attempt_log = build_brief_with_self_heal(opp, verbose=False)
        except ApplyError as exc:
            print(f"{prefix}  ERROR  build_brief: {exc}")
            errored += 1
            _log_attempt(walker_run_id=walker_run_id, opp=opp, outcome="errored",
                         error_message=str(exc), error_type="ApplyError")
            continue
        except Exception as exc:
            print(f"{prefix}  ERROR  build_brief raised: {type(exc).__name__}: {exc}")
            errored += 1
            _log_attempt(walker_run_id=walker_run_id, opp=opp, outcome="errored",
                         error_message=str(exc), error_type=type(exc).__name__)
            continue

        retries = len(attempt_log) - 1
        retry_note = f" (self_heal retries={retries})" if retries > 0 else ""

        if not brief.can_apply:
            blockers = "; ".join(brief.blocking_issues[:2])[:120]
            print(f"{prefix}  BLOCKED{retry_note}  {blockers}")
            blocked += 1
            _log_attempt(walker_run_id=walker_run_id, opp=opp, outcome="blocked",
                         blocking_issues=list(brief.blocking_issues),
                         n_self_heal_retries=retries)
            continue

        try:
            result = apply_brief(brief)
        except ApplyError as exc:
            print(f"{prefix}  ERROR  apply: {str(exc)[:120]}")
            errored += 1
            _log_attempt(walker_run_id=walker_run_id, opp=opp, outcome="errored",
                         error_message=str(exc), error_type="ApplyError",
                         n_self_heal_retries=retries)
            continue
        except Exception as exc:
            print(f"{prefix}  ERROR  apply raised: {type(exc).__name__}: {exc}")
            errored += 1
            _log_attempt(walker_run_id=walker_run_id, opp=opp, outcome="errored",
                         error_message=str(exc), error_type=type(exc).__name__,
                         n_self_heal_retries=retries)
            continue

        sha = (result.get("commit_hash") or "")[:10]
        print(f"{prefix}  APPLIED{retry_note}  commit={sha}")
        applied += 1
        _log_attempt(walker_run_id=walker_run_id, opp=opp, outcome="applied",
                     change_id=result.get("change_id"),
                     git_commit_hash=result.get("commit_hash"),
                     n_self_heal_retries=retries)

        if max_apply and applied >= max_apply:
            print(f"\nReached max_apply={max_apply}. Stopping.")
            break

    print()
    print("=" * 100)
    print(f"SUMMARY  applied={applied}  blocked={blocked}  errored={errored}")
    print("=" * 100)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--kind", default=None, help="action_kind filter (e.g. meta_only)")
    parser.add_argument("--site", default=None)
    parser.add_argument("--min-confidence", type=int, default=0)
    parser.add_argument("--limit", type=int, default=50)
    parser.add_argument("--max-apply", type=int, default=None, help="stop after N successful applies")
    args = parser.parse_args()
    run(kind=args.kind, site=args.site, min_confidence=args.min_confidence, limit=args.limit, max_apply=args.max_apply)


if __name__ == "__main__":
    main()
