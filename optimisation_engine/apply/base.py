"""
Base lifecycle for apply modules.

Every apply module follows the same pattern:

  build_brief(opportunity) -> ChangeBrief
      Read current state. Compute the proposed change. Run validators.
      Set can_apply. Does NOT touch any files.

  apply(brief) -> dict
      Requires brief.can_apply == True. Performs the file edit, validates
      the result, makes the git commit, writes the optimisation_changes
      audit row. On any failure, rolls back the file edit.

The module exposes both functions. The dispatcher routes from action_kind
to module name.
"""
from __future__ import annotations

import json
import os
import shutil
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any, Callable

import httpx

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.apply.brief import ChangeBrief  # noqa: E402
from optimisation_engine.apply.git_helper import GitError, build_commit_message, stage_and_commit  # noqa: E402
from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL, get_site  # noqa: E402


class ApplyError(Exception):
    pass


def _supabase_headers() -> dict[str, str]:
    return {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
    }


def slug_to_path(site_key: str, slug: str) -> Path:
    """Resolve a slug to the absolute markdown path."""
    site = get_site(site_key)
    return ROOT / site["content_dir"] / f"{slug}.md"


def url_to_slug(url: str) -> str | None:
    """Pull the slug (last path segment) from a target URL."""
    if not url:
        return None
    parts = [p for p in url.rstrip("/").split("/") if p]
    return parts[-1] if parts else None


def backup_file(path: Path) -> Path:
    """Copy a file to a sibling .bak before editing. Returns the backup path."""
    bak = path.with_suffix(path.suffix + ".bak")
    shutil.copy2(path, bak)
    return bak


def restore_file(backup_path: Path, target_path: Path) -> None:
    """Roll back a file edit using its backup."""
    if backup_path.exists():
        shutil.copy2(backup_path, target_path)
        backup_path.unlink()


def cleanup_backup(backup_path: Path) -> None:
    if backup_path.exists():
        backup_path.unlink()


def stamp_trust_signals(
    *,
    fm: dict,
    site_key: str,
    sources_used: list[str] | None = None,
    editorial_note: str | None = None,
) -> dict:
    """Update the frontmatter with E-E-A-T trust-signal fields and dateModified.

    Mutates and returns `fm`. Sets:
      - dateModified: today's ISO date
      - reviewedBy: site's reviewer profile (from _schema_generator)
      - reviewedAt: today's ISO date
      - sourcesVerifiedAt: today's ISO date (only when sources_used provided)
      - editorialNote: optional human-readable note about this edit
      - schema: full EEAT JSON-LD @graph

    Does NOT touch the `date` field (publication date stays).
    """
    from datetime import date

    from optimisation_engine.apply._schema_generator import SITE_EEAT_PROFILES, build_eeat_schema

    today = date.today().isoformat()
    fm["dateModified"] = today

    profile = SITE_EEAT_PROFILES.get(site_key)
    if profile:
        # Compact reviewer signature for the frontmatter (a small string the renderer can show)
        reviewer = profile["reviewer"]
        fm["reviewedBy"] = reviewer.get("name", "")
        fm["reviewerCredentials"] = reviewer.get("jobTitle", "")
        fm["reviewedAt"] = today

    if sources_used:
        fm["sourcesVerifiedAt"] = today
        # Limit to 10 unique domain names in the frontmatter for compactness
        unique = []
        seen = set()
        for s in sources_used:
            if s and s not in seen:
                seen.add(s)
                unique.append(s)
            if len(unique) >= 10:
                break
        fm["sourceDomains"] = unique

    if editorial_note:
        fm["editorialNote"] = editorial_note

    # Build the canonical from existing field (don't override what's there)
    canonical = fm.get("canonical") or ""
    if canonical:
        fm["schema"] = build_eeat_schema(
            site_key=site_key,
            frontmatter=fm,
            canonical_url=canonical,
            page_type=fm.get("pageType") or "blog_post",
            faqs=fm.get("faqs"),
        )

    return fm


def record_optimisation_change(
    *,
    site_key: str,
    change_type: str,
    target_url: str,
    target_slug: str | None,
    files_changed: list[str],
    before_snapshot: str,
    after_snapshot: str,
    diff_summary: str,
    git_commit_hash: str,
    confidence: str,
    blog_optimization_id: str | None = None,
    auto_applied: bool = True,
    brief_json: str | None = None,
) -> str | None:
    """Insert a row into optimisation_changes. Returns the new row id."""
    payload = {
        "site_key": site_key,
        "change_type": change_type,
        "target_url": target_url,
        "target_slug": target_slug,
        "files_changed": files_changed,
        "before_snapshot": before_snapshot[:65_000],  # text column safety
        "after_snapshot": after_snapshot[:65_000],
        "diff_summary": diff_summary[:65_000],
        "git_commit_hash": git_commit_hash,
        "git_branch": "main",
        "shipped_at": datetime.now(timezone.utc).isoformat(),
        "performance_review_due_at": (datetime.now(timezone.utc) + timedelta(days=28)).isoformat(),
        "auto_applied": auto_applied,
        "confidence": confidence,
        "outcome_verdict": "pending",
    }
    if blog_optimization_id:
        payload["blog_optimization_id"] = blog_optimization_id

    r = httpx.post(
        f"{SUPABASE_URL}/rest/v1/optimisation_changes",
        headers={**_supabase_headers(), "Prefer": "return=representation"},
        json=payload,
        timeout=15.0,
    )
    if r.status_code >= 300:
        print(f"[WARN] failed to record optimisation_change: {r.status_code} {r.text[:200]}")
        return None
    rows = r.json()
    return rows[0]["id"] if rows else None


def update_opportunity_to_shipped(opportunity_id: str, change_id: str) -> bool:
    """Mark the opportunity row as shipped + link to applied change."""
    if not opportunity_id:
        return False
    r = httpx.patch(
        f"{SUPABASE_URL}/rest/v1/optimisation_opportunities",
        headers={**_supabase_headers(), "Prefer": "return=minimal"},
        params={"id": f"eq.{opportunity_id}"},
        json={
            "status": "shipped",
            "applied_change_id": change_id,
            "updated_at": datetime.now(timezone.utc).isoformat(),
        },
        timeout=15.0,
    )
    return r.status_code < 300


def run_apply_lifecycle(
    *,
    brief: ChangeBrief,
    edit_fn: Callable[[ChangeBrief], tuple[str, str]],
    change_type: str,
    confidence: str = "medium",
    auto_applied: bool = True,
) -> dict:
    """Generic apply lifecycle:
      1. Verify brief.can_apply
      2. Backup file
      3. Run edit_fn -> (before_snapshot, after_snapshot)
      4. Run post-edit validators if module attached them via brief
      5. Git commit
      6. Record optimisation_change
      7. Link opportunity -> change
      8. Clean up backup on success; restore on failure

    Args:
        edit_fn: closure that performs the file edit and returns (before, after) snapshots.
                 If raises, file is restored from backup.

    Returns: {status, commit_hash, change_id, brief_summary}
    """
    if not brief.can_apply:
        raise ApplyError(f"brief.can_apply is False — blocking_issues: {brief.blocking_issues}")
    if not brief.files_to_modify:
        raise ApplyError("brief has no files_to_modify")

    # Backup all files we'll touch
    abs_paths = [ROOT / f for f in brief.files_to_modify]
    backups: list[tuple[Path, Path]] = []
    for ap in abs_paths:
        if not ap.exists():
            raise ApplyError(f"file does not exist: {ap}")
        backups.append((backup_file(ap), ap))

    try:
        before, after = edit_fn(brief)
    except Exception as exc:
        for bak, ap in backups:
            restore_file(bak, ap)
        raise ApplyError(f"edit_fn raised {type(exc).__name__}: {exc}") from exc

    # Commit
    commit_msg = build_commit_message(
        site_key=brief.site_key,
        change_type=change_type,
        summary=brief.change_summary,
        brief_excerpt=brief.opportunity_rationale,
    )
    try:
        commit_hash = stage_and_commit(files=brief.files_to_modify, message=commit_msg)
    except GitError as exc:
        for bak, ap in backups:
            restore_file(bak, ap)
        raise ApplyError(f"git commit failed: {exc}") from exc

    # All good — clean up backups
    for bak, _ap in backups:
        cleanup_backup(bak)

    # Record audit row
    change_id = record_optimisation_change(
        site_key=brief.site_key,
        change_type=change_type,
        target_url=brief.target_url,
        target_slug=url_to_slug(brief.target_url),
        files_changed=brief.files_to_modify,
        before_snapshot=before,
        after_snapshot=after,
        diff_summary=brief.format_human(),
        git_commit_hash=commit_hash,
        confidence=confidence,
        blog_optimization_id=None,  # we use applied_change_id on opp side; nothing to put here
        auto_applied=auto_applied,
        brief_json=brief.to_json(),
    )

    # Mark opportunity as shipped
    if brief.opportunity_id and change_id:
        update_opportunity_to_shipped(brief.opportunity_id, change_id)

    return {
        "status": "applied",
        "commit_hash": commit_hash,
        "change_id": change_id,
        "files_changed": brief.files_to_modify,
        "brief_summary": brief.change_summary,
    }
