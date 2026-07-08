"""
meta_apply.py — SERP meta-optimisation program: batch apply proposals.

CLI:
    python scripts/meta_apply.py --site <key> --proposals <path.json> [--execute]

Default is DRY-RUN: validates all proposals, prints what would change, but writes
nothing. Pass --execute to apply.

Input JSON: array of objects with:
    {
        "slug": "slug-string",
        "file": "repo/relative/path/to/file.md",
        "metaTitle": "Proposed title (15-60 chars)",
        "metaDescription": "Proposed description (120-170 chars)",
        "primary_query": "main query this targets",
        "rationale": "why this change is warranted"
    }

For each proposal:
  - Validates via existing validators (char limits, no banned chars/phrases,
    contains primary_query token, meaningfully different from current).
  - On --execute: applies via a thin adapter over the existing meta_only.py
    lifecycle (ChangeBrief + run_apply_lifecycle) so we get:
      * metaTitle_prev / metaDescription_prev preservation
      * dateModified + reviewedBy trust-signal stamps
      * Atomic file write
      * optimisation_changes audit row (change_type=title_meta_rewrite,
        confidence=high, auto_applied=True)
    OPTIMISATION_AUTO_COMMIT default-off is respected: no git commit unless
    the env var is set.

Results manifest:
    .cache/meta_program/<site>/apply_results.json
    {applied: [...], rejected: [{slug, reasons}]}

No Supabase writes in dry-run. No git commits (unless OPTIMISATION_AUTO_COMMIT=1).
"""
from __future__ import annotations

import argparse
import json
import os
import sys
from datetime import date, datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.apply.brief import ChangeBrief  # noqa: E402
from optimisation_engine.apply.base import (  # noqa: E402
    ApplyError,
    run_apply_lifecycle,
    stamp_trust_signals,
)
from optimisation_engine.apply.frontmatter_utils import read as fm_read, write as fm_write  # noqa: E402
from optimisation_engine.apply.validators import (  # noqa: E402
    char_limit,
    contains_token,
    file_exists,
    no_banned_chars,
    no_banned_phrases,
)

CHANGE_TYPE = "title_meta_rewrite"


# ---------------------------------------------------------------------------
# Validation
# ---------------------------------------------------------------------------

def _validate_proposal(proposal: dict, abs_path: Path) -> list[str]:
    """Run all validators on a proposal. Returns list of failure reasons (empty = pass)."""
    failures: list[str] = []
    new_title = (proposal.get("metaTitle") or "").strip()
    new_desc = (proposal.get("metaDescription") or "").strip()
    primary_query = (proposal.get("primary_query") or "").strip()

    # --- file existence ---
    ok, detail = file_exists(abs_path)
    if not ok:
        failures.append(f"file_exists: {detail}")
        return failures  # cannot read current state — stop here

    # --- read current frontmatter ---
    try:
        fm, _body = fm_read(abs_path)
    except Exception as exc:
        failures.append(f"file_readable: {exc}")
        return failures

    current_title = (fm.get("metaTitle") or "").strip()
    current_desc = (fm.get("metaDescription") or "").strip()

    # --- metaTitle ---
    if not new_title:
        failures.append("metaTitle_present: no metaTitle in proposal")
    else:
        ok, detail = char_limit(new_title, min_len=15, max_len=60)
        if not ok:
            failures.append(f"metaTitle_char_limit: {detail}")
        ok, detail = no_banned_chars(new_title)
        if not ok:
            failures.append(f"metaTitle_no_banned_chars: {detail}")
        ok, detail = no_banned_phrases(new_title)
        if not ok:
            failures.append(f"metaTitle_no_hype_phrases: {detail}")
        if primary_query:
            tokens = [t for t in primary_query.split() if len(t) >= 4]
            if tokens:
                ok, detail = contains_token(new_title, tokens)
                if not ok:
                    failures.append(f"metaTitle_contains_query_token: {detail}")

    # --- metaDescription ---
    if not new_desc:
        failures.append("metaDescription_present: no metaDescription in proposal")
    else:
        ok, detail = char_limit(new_desc, min_len=120, max_len=170)
        if not ok:
            failures.append(f"metaDescription_char_limit: {detail}")
        ok, detail = no_banned_chars(new_desc)
        if not ok:
            failures.append(f"metaDescription_no_banned_chars: {detail}")
        ok, detail = no_banned_phrases(new_desc)
        if not ok:
            failures.append(f"metaDescription_no_hype_phrases: {detail}")

    # --- meaningful change ---
    if new_title and new_desc and new_title == current_title and new_desc == current_desc:
        failures.append("change_is_meaningful: new values identical to current")

    return failures


# ---------------------------------------------------------------------------
# Apply adapter (thin wrapper over run_apply_lifecycle)
# ---------------------------------------------------------------------------

_WORKLIST_URLS: dict[str, dict[str, str]] = {}


def _worklist_page_url(site_key: str, slug: str) -> str:
    """slug -> page_url from the site's cached worklist (so audit rows carry a
    joinable target_url; empty target_url made batch-1 verdicts un-computable)."""
    if site_key not in _WORKLIST_URLS:
        wl_path = ROOT / ".cache" / "meta_program" / site_key / "worklist.json"
        try:
            items = json.loads(wl_path.read_text(encoding="utf-8"))
            _WORKLIST_URLS[site_key] = {i["slug"]: i["page_url"] for i in items if i.get("page_url")}
        except Exception:
            _WORKLIST_URLS[site_key] = {}
    return _WORKLIST_URLS[site_key].get(slug, "")


def _apply_one(proposal: dict, abs_path: Path, site_key: str) -> dict:
    """Apply a single validated proposal via the meta_only lifecycle.

    Builds a minimal ChangeBrief from the proposal dict (bypassing the
    opportunity-table lookup that build_brief() in meta_only.py performs),
    then calls run_apply_lifecycle with an inline edit function.

    This is a thin adapter rather than modifying meta_only.py because:
      - Our input is a flat proposals array (not an optimisation_opportunities row).
      - We don't need the full opportunity-table machinery.
      - We still get all lifecycle benefits (backup, atomic write, audit row).
    """
    new_title: str = proposal["metaTitle"].strip()
    new_desc: str = proposal["metaDescription"].strip()
    slug: str = (proposal.get("slug") or "").strip()
    page_url: str = (proposal.get("page_url") or _worklist_page_url(site_key, slug) or "").strip()
    rel_path: str = str(abs_path.relative_to(ROOT)).replace("\\", "/")
    primary_query: str = (proposal.get("primary_query") or "").strip()
    rationale: str = (proposal.get("rationale") or "").strip()

    # Read current state for the brief.
    fm, _body = fm_read(abs_path)
    current_title = fm.get("metaTitle") or ""
    current_desc = fm.get("metaDescription") or ""

    # Build ChangeBrief.
    brief = ChangeBrief(
        apply_module="meta_only",
        site_key=site_key,
        target_url=page_url,
        target_file_path=rel_path,
        opportunity_id=None,
        files_to_modify=[rel_path],
    )
    brief.current_state = {
        "slug": slug,
        "metaTitle": current_title,
        "metaDescription": current_desc,
    }
    brief.opportunity_rationale = rationale
    brief.opportunity_signal = {"primary_query": primary_query}
    brief.change_summary = f"Rewrite metaTitle + metaDescription on {slug}"
    brief.change_diff = {
        "metaTitle_before": current_title,
        "metaTitle_after": new_title,
        "metaDescription_before": current_desc,
        "metaDescription_after": new_desc,
        "preserve_as": "metaTitle_prev / metaDescription_prev (rollback path)",
    }

    # Add validators (for the brief record; we already validated above but
    # the brief needs them for the audit row).
    ok_title, d = char_limit(new_title, min_len=15, max_len=60)
    brief.add_validation("metaTitle_char_limit", ok_title, d)
    ok_desc, d = char_limit(new_desc, min_len=120, max_len=170)
    brief.add_validation("metaDescription_char_limit", ok_desc, d)
    brief.add_validation(
        "change_is_meaningful",
        not (new_title == current_title and new_desc == current_desc),
        "",
    )
    brief.finalise_can_apply()

    if not brief.can_apply:
        raise ApplyError(f"brief.can_apply is False: {brief.blocking_issues}")

    def _edit_fn(b: ChangeBrief) -> tuple[str, str]:
        before_fm, before_body = fm_read(abs_path)
        before_snapshot = (
            f"metaTitle: {before_fm.get('metaTitle')!r}\n"
            f"metaDescription: {before_fm.get('metaDescription')!r}"
        )

        new_fm = dict(before_fm)
        # Preserve previous values
        if before_fm.get("metaTitle"):
            new_fm["metaTitle_prev"] = before_fm["metaTitle"]
        if before_fm.get("metaDescription"):
            new_fm["metaDescription_prev"] = before_fm["metaDescription"]
        new_fm["metaTitle"] = new_title
        new_fm["metaDescription"] = new_desc

        stamp_trust_signals(
            fm=new_fm,
            site_key=b.site_key,
            editorial_note=(
                "metaTitle and metaDescription rewritten via meta_apply.py "
                "(SERP meta-optimisation program) after GSC+Bing CTR analysis."
            ),
        )

        fm_write(abs_path, new_fm, before_body)

        after_fm, _ = fm_read(abs_path)
        after_snapshot = (
            f"metaTitle: {after_fm.get('metaTitle')!r}\n"
            f"metaDescription: {after_fm.get('metaDescription')!r}\n"
            f"dateModified: {after_fm.get('dateModified')!r}\n"
            f"reviewedBy: {after_fm.get('reviewedBy')!r}"
        )
        return before_snapshot, after_snapshot

    return run_apply_lifecycle(
        brief=brief,
        edit_fn=_edit_fn,
        change_type=CHANGE_TYPE,
        confidence="high",
        auto_applied=True,
    )


# ---------------------------------------------------------------------------
# Batch processor
# ---------------------------------------------------------------------------

def process_proposals(
    site_key: str,
    proposals: list[dict],
    execute: bool = False,
) -> dict:
    """Validate (and optionally apply) a batch of meta proposals.

    Returns: {applied: [...], rejected: [{slug, reasons}]}
    """
    applied: list[dict] = []
    rejected: list[dict] = []

    total = len(proposals)
    print(f"[meta_apply] site={site_key} proposals={total} execute={execute}")

    for i, proposal in enumerate(proposals, 1):
        slug = (proposal.get("slug") or "").strip()
        file_rel = (proposal.get("file") or "").strip()
        new_title = (proposal.get("metaTitle") or "").strip()
        new_desc = (proposal.get("metaDescription") or "").strip()
        primary_query = (proposal.get("primary_query") or "").strip()

        print(f"\n  [{i}/{total}] slug={slug!r}")

        if not file_rel:
            rejected.append({"slug": slug, "reasons": ["file field missing in proposal"]})
            print(f"    REJECTED: file field missing")
            continue

        abs_path = ROOT / file_rel

        # Validate.
        failures = _validate_proposal(proposal, abs_path)
        if failures:
            rejected.append({"slug": slug, "reasons": failures})
            print(f"    REJECTED: {failures}")
            continue

        # Dry-run: print what would change.
        print(f"    VALID")
        print(f"      title:  {new_title!r}")
        print(f"      desc:   {new_desc!r}")
        print(f"      query:  {primary_query!r}")

        if not execute:
            print(f"    [DRY RUN] would apply — re-run with --execute to apply")
            applied.append({
                "slug": slug,
                "file": file_rel,
                "status": "dry_run",
                "metaTitle": new_title,
                "metaDescription": new_desc,
            })
            continue

        # Execute.
        try:
            result = _apply_one(proposal, abs_path, site_key)
            applied.append({
                "slug": slug,
                "file": file_rel,
                "status": "applied",
                "commit_hash": result.get("commit_hash", ""),
                "change_id": result.get("change_id"),
                "metaTitle": new_title,
                "metaDescription": new_desc,
            })
            print(f"    APPLIED change_id={result.get('change_id')} commit={result.get('commit_hash') or '(no commit)'}")
        except ApplyError as exc:
            rejected.append({"slug": slug, "reasons": [str(exc)]})
            print(f"    FAILED: {exc}")
        except Exception as exc:
            rejected.append({"slug": slug, "reasons": [f"{type(exc).__name__}: {exc}"]})
            print(f"    ERROR: {type(exc).__name__}: {exc}")

    return {"applied": applied, "rejected": rejected}


# ---------------------------------------------------------------------------
# CLI entry point
# ---------------------------------------------------------------------------

def main() -> int:
    parser = argparse.ArgumentParser(
        description=(
            "SERP meta-optimisation: apply a batch of meta proposals to a site. "
            "Default is DRY-RUN (validates only). Pass --execute to apply. "
            "No git commits unless OPTIMISATION_AUTO_COMMIT=1."
        )
    )
    parser.add_argument(
        "--site", required=True,
        help="site_key (dentists|property|medical|solicitors|generalist|agency)",
    )
    parser.add_argument(
        "--proposals", required=True,
        help="Path to proposals JSON file (array of {slug, file, metaTitle, metaDescription, primary_query, rationale})",
    )
    parser.add_argument(
        "--execute", action="store_true",
        help="Apply the proposals (default is dry-run: validate only)",
    )
    args = parser.parse_args()

    proposals_path = Path(args.proposals)
    if not proposals_path.exists():
        print(f"ERROR: proposals file not found: {proposals_path}", file=sys.stderr)
        return 1

    try:
        proposals = json.loads(proposals_path.read_text(encoding="utf-8"))
    except Exception as exc:
        print(f"ERROR: cannot parse proposals JSON: {exc}", file=sys.stderr)
        return 1

    if not isinstance(proposals, list):
        print("ERROR: proposals JSON must be an array", file=sys.stderr)
        return 1

    results = process_proposals(
        site_key=args.site,
        proposals=proposals,
        execute=args.execute,
    )

    # Write results manifest.
    out_dir = ROOT / ".cache" / "meta_program" / args.site
    out_dir.mkdir(parents=True, exist_ok=True)
    manifest_path = out_dir / "apply_results.json"
    manifest_path.write_text(
        json.dumps(results, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )

    n_applied = len(results["applied"])
    n_rejected = len(results["rejected"])
    print(f"\n[meta_apply] Done. applied={n_applied} rejected={n_rejected}")
    print(f"  Manifest: {manifest_path.relative_to(ROOT)}")

    if not args.execute and n_applied > 0:
        print(f"  [DRY RUN] Re-run with --execute to apply {n_applied} valid proposal(s).")

    return 0


if __name__ == "__main__":
    sys.exit(main())
