"""
Rollback a shipped optimisation_change.

Usage:
  python -m optimisation_engine.apply.rollback <change_id>           # interactive
  python -m optimisation_engine.apply.rollback <change_id> --reason "intent drifted off"
  python -m optimisation_engine.apply.rollback --recent              # show recent shipped changes

Two rollback strategies:
  1. PATH_REVERT — restore the specific files in this change to their state
     before the original commit. Best for isolated changes (meta_only,
     internal_link, schema_only, faq_addition). Produces a new revert commit.
  2. GIT_REVERT — `git revert <commit>` for the whole commit. Best when
     a change modified an entire new page that we want fully removed.

Either way the optimisation_changes row is marked:
  rolled_back = true
  rolled_back_at = now
  rollback_reason = <reason>
  rollback_commit_hash = <new sha>

Idempotent: a row already rolled back will not roll back again.
"""
from __future__ import annotations

import argparse
import os
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

import httpx

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.apply.git_helper import GitError, _run  # noqa: E402
from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL  # noqa: E402


def _headers() -> dict[str, str]:
    return {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
    }


def fetch_change(change_id: str) -> dict | None:
    r = httpx.get(
        f"{SUPABASE_URL}/rest/v1/optimisation_changes",
        headers={"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"},
        params={"select": "*", "id": f"eq.{change_id}"},
        timeout=15.0,
    )
    if r.status_code >= 300:
        return None
    rows = r.json()
    return rows[0] if rows else None


def fetch_recent_changes(*, days: int = 30, limit: int = 20) -> list[dict]:
    since = (datetime.now(timezone.utc).date() - __import__("datetime").timedelta(days=days)).isoformat()
    r = httpx.get(
        f"{SUPABASE_URL}/rest/v1/optimisation_changes",
        headers={"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"},
        params={
            "select": "id,site_key,change_type,target_slug,target_url,shipped_at,git_commit_hash,rolled_back,outcome_verdict",
            "shipped_at": f"gte.{since}",
            "rolled_back": "eq.false",
            "order": "shipped_at.desc",
            "limit": str(limit),
        },
        timeout=15.0,
    )
    return r.json() if r.status_code < 300 else []


def mark_rolled_back(change_id: str, *, rollback_commit_hash: str, reason: str) -> bool:
    r = httpx.patch(
        f"{SUPABASE_URL}/rest/v1/optimisation_changes",
        headers={**_headers(), "Prefer": "return=minimal"},
        params={"id": f"eq.{change_id}"},
        json={
            "rolled_back": True,
            "rolled_back_at": datetime.now(timezone.utc).isoformat(),
            "rollback_reason": reason,
            "rollback_commit_hash": rollback_commit_hash,
        },
        timeout=15.0,
    )
    return r.status_code < 300


def rollback_via_path_revert(change: dict, reason: str) -> str:
    """Restore each file in files_changed to its pre-commit state, then commit."""
    files = change.get("files_changed") or []
    original_sha = change.get("git_commit_hash")
    if not original_sha:
        raise RuntimeError("change has no git_commit_hash")

    if not files:
        # Fall back to full git revert
        return rollback_via_git_revert(change, reason)

    # Use git checkout <sha>^ -- <file> to grab the pre-change version
    parent_ref = f"{original_sha}^"
    for f in files:
        # First confirm the file existed at parent commit
        rc, out, err = _run(["git", "ls-tree", parent_ref, "--", f])
        if rc != 0 or not out.strip():
            # File didn't exist before — for new_page, this is normal; rollback = delete file
            path = ROOT / f
            if path.exists():
                path.unlink()
        else:
            rc, _o, err = _run(["git", "checkout", parent_ref, "--", f])
            if rc != 0:
                raise RuntimeError(f"git checkout {parent_ref} -- {f} failed: {err}")

    # Stage all rolled-back files
    rc, _o, err = _run(["git", "add", "--"] + files)
    if rc != 0:
        raise RuntimeError(f"git add failed: {err}")

    # Commit
    msg = (
        f"Rollback: {change['site_key']} {change['change_type']} (change_id={change['id']})\n\n"
        f"Reason: {reason}\n"
        f"Reverting commit: {original_sha}\n\n"
        f"Files restored: {', '.join(files)}\n\n"
        "Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
    )
    rc, _o, err = _run(["git", "commit", "-m", msg])
    if rc != 0:
        # Nothing to commit (files are identical to current) — that means rollback is a no-op
        _run(["git", "reset", "--"] + files)
        raise RuntimeError(f"git commit failed: {err}")

    rc, sha, err = _run(["git", "rev-parse", "HEAD"])
    if rc != 0:
        raise RuntimeError(f"git rev-parse failed: {err}")
    return sha.strip()


def rollback_via_git_revert(change: dict, reason: str) -> str:
    """git revert <commit>. Safer for full-page changes."""
    original_sha = change.get("git_commit_hash")
    if not original_sha:
        raise RuntimeError("change has no git_commit_hash")

    rc, _o, err = _run(["git", "revert", "--no-edit", original_sha])
    if rc != 0:
        raise RuntimeError(f"git revert failed: {err}")

    # Amend the revert commit to include our reason
    msg = (
        f"Rollback: change_id={change['id']} ({change['site_key']} {change['change_type']})\n\n"
        f"Reason: {reason}\n"
        f"Reverting commit: {original_sha}\n\n"
        "Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
    )
    rc, _o, err = _run(["git", "commit", "--amend", "-m", msg])
    if rc != 0:
        raise RuntimeError(f"git commit --amend failed: {err}")

    rc, sha, err = _run(["git", "rev-parse", "HEAD"])
    if rc != 0:
        raise RuntimeError(f"git rev-parse failed: {err}")
    return sha.strip()


def rollback(change_id: str, *, reason: str, strategy: str = "auto") -> dict:
    change = fetch_change(change_id)
    if not change:
        raise RuntimeError(f"change_id {change_id!r} not found")
    if change.get("rolled_back"):
        raise RuntimeError(
            f"change {change_id} already rolled back at {change.get('rolled_back_at')!r}"
        )

    # Confirm clean working tree before any git ops
    rc, status, err = _run(["git", "status", "--porcelain"])
    # Allow only pre-existing unrelated dirty state to NOT block; warn but proceed
    dirty_lines = [l for l in status.splitlines() if l.strip()]
    if dirty_lines:
        print(f"[warn] working tree has {len(dirty_lines)} uncommitted change(s); proceeding with caution")

    # Pick strategy
    use_strategy = strategy
    if use_strategy == "auto":
        # For new_content (new_page): use git_revert.
        # For all other change_types: use path_revert.
        if change.get("change_type") == "new_content":
            use_strategy = "git_revert"
        else:
            use_strategy = "path_revert"

    print(f"Rolling back change {change_id}:")
    print(f"  site:       {change['site_key']}")
    print(f"  type:       {change['change_type']}")
    print(f"  target:     {change.get('target_url')}")
    print(f"  shipped:    {change['shipped_at']}")
    print(f"  commit:     {change['git_commit_hash']}")
    print(f"  strategy:   {use_strategy}")
    print(f"  reason:     {reason}")
    print()

    if use_strategy == "git_revert":
        new_sha = rollback_via_git_revert(change, reason)
    else:
        new_sha = rollback_via_path_revert(change, reason)

    ok = mark_rolled_back(change_id, rollback_commit_hash=new_sha, reason=reason)
    print(f"[OK] rollback commit: {new_sha}")
    print(f"[OK] optimisation_changes updated: {ok}")
    return {"rollback_commit": new_sha, "supabase_updated": ok}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("change_id", nargs="?", help="change_id to roll back")
    parser.add_argument("--reason", default="manual rollback")
    parser.add_argument("--strategy", choices=["auto", "path_revert", "git_revert"], default="auto")
    parser.add_argument("--recent", action="store_true", help="list recent non-rolled-back changes")
    args = parser.parse_args()

    if args.recent or not args.change_id:
        rows = fetch_recent_changes(days=30, limit=20)
        if not rows:
            print("No recent shipped changes.")
            return
        print(f"{'shipped':25s} {'site':10s} {'type':22s} {'slug':50s} {'verdict':10s} {'commit':12s} {'change_id'}")
        print("-" * 160)
        for r in rows:
            shipped = (r.get("shipped_at") or "")[:19]
            slug = (r.get("target_slug") or "")[:48]
            sha = (r.get("git_commit_hash") or "")[:10]
            verdict = r.get("outcome_verdict") or "-"
            print(f"{shipped:25s} {r['site_key']:10s} {r['change_type']:22s} {slug:50s} {verdict:10s} {sha:12s} {r['id']}")
        return

    rollback(args.change_id, reason=args.reason, strategy=args.strategy)


if __name__ == "__main__":
    main()
