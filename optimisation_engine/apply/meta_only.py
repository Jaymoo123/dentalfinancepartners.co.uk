"""
apply_meta_only — frontmatter rewrite of metaTitle + metaDescription.

Used when the Action Specifier returns action_kind='meta_only' or when a
detector flags a CTR problem with high confidence.

Preserves the existing metaTitle/metaDescription as metaTitle_prev /
metaDescription_prev (matching the existing site pattern from
Property/pipeline/rewrite_meta_for_ctr.py).
"""
from __future__ import annotations

import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.apply.base import (  # noqa: E402
    ApplyError,
    run_apply_lifecycle,
    slug_to_path,
    url_to_slug,
)
from optimisation_engine.apply.brief import ChangeBrief  # noqa: E402
from optimisation_engine.apply.frontmatter_utils import (  # noqa: E402
    read,
    update_fields,
    write,
)
from optimisation_engine.apply.validators import (  # noqa: E402
    char_limit,
    contains_token,
    file_exists,
    no_banned_chars,
    no_banned_phrases,
)

CHANGE_TYPE = "title_meta_rewrite"


def build_brief(opportunity: dict) -> ChangeBrief:
    """Build a ChangeBrief for a meta_only apply.

    Expects opportunity to have action_plan.patch with metaTitle + metaDescription.
    """
    site_key = opportunity["site_key"]
    target_url = opportunity.get("target_url") or ""
    slug = url_to_slug(target_url) or opportunity.get("target_slug")

    plan = (opportunity.get("action_plan") or {})
    patch = plan.get("patch") or {}
    meta_block = patch.get("meta_only") or patch.get("meta_changes") or patch  # tolerate either shape

    new_title = meta_block.get("metaTitle") or meta_block.get("metaTitle_new")
    new_desc = meta_block.get("metaDescription") or meta_block.get("metaDescription_new")

    path = slug_to_path(site_key, slug) if slug else None
    rel_path = str(path.relative_to(ROOT)) if path else ""

    brief = ChangeBrief(
        apply_module="meta_only",
        site_key=site_key,
        target_url=target_url,
        target_file_path=rel_path,
        opportunity_id=opportunity.get("id"),
        files_to_modify=[rel_path] if rel_path else [],
    )

    # --- WHAT (current state) -------------------------------------------------
    if path and path.exists():
        try:
            fm, _body = read(path)
            brief.current_state = {
                "slug": slug,
                "metaTitle": fm.get("metaTitle"),
                "metaDescription": fm.get("metaDescription"),
                "title": fm.get("title"),
                "h1": fm.get("h1"),
                "category": fm.get("category"),
            }
        except Exception as exc:
            brief.add_validation("file_readable", False, str(exc))
            brief.finalise_can_apply()
            return brief

    # --- WHY (opportunity) ----------------------------------------------------
    sd = opportunity.get("supporting_data") or {}
    brief.opportunity_rationale = opportunity.get("rationale") or plan.get("rationale") or ""
    brief.opportunity_signal = {
        "primary_query": opportunity.get("primary_query"),
        "cluster": (opportunity.get("target_query_cluster") or [])[:5],
        "page_impressions_28d": sd.get("page_impressions_28d"),
        "page_clicks_28d": sd.get("page_clicks_28d"),
        "page_ctr_28d": sd.get("page_ctr_28d"),
        "best_position_28d": sd.get("best_position_28d") or sd.get("best_position"),
        "trajectory": sd.get("trajectory"),
        "score": opportunity.get("score"),
        "detector_confidence": opportunity.get("confidence"),
        "action_specifier_confidence": opportunity.get("action_plan_confidence"),
    }

    # --- HOW (proposed change) ------------------------------------------------
    brief.change_summary = f"Rewrite metaTitle + metaDescription on {slug}"
    brief.change_diff = {
        "metaTitle_before": brief.current_state.get("metaTitle"),
        "metaTitle_after": new_title,
        "metaDescription_before": brief.current_state.get("metaDescription"),
        "metaDescription_after": new_desc,
        "preserve_as": "metaTitle_prev / metaDescription_prev (rollback path)",
    }

    # --- Validators -----------------------------------------------------------
    if not rel_path:
        brief.add_validation("path_resolvable", False, "could not resolve slug to filesystem path")
    else:
        ok, detail = file_exists(path)
        brief.add_validation("file_exists", ok, detail)

    if not new_title:
        brief.add_validation("metaTitle_present", False, "action_plan.patch has no metaTitle")
    else:
        ok, detail = char_limit(new_title, min_len=15, max_len=60)
        brief.add_validation("metaTitle_char_limit", ok, detail)
        ok, detail = no_banned_chars(new_title)
        brief.add_validation("metaTitle_no_banned_chars", ok, detail)
        ok, detail = no_banned_phrases(new_title)
        brief.add_validation("metaTitle_no_hype_phrases", ok, detail)
        if opportunity.get("primary_query"):
            # Optional: title contains at least one significant token from the primary query
            tokens = [t for t in (opportunity["primary_query"]).split() if len(t) >= 4]
            ok, detail = contains_token(new_title, tokens) if tokens else (True, "")
            brief.add_validation("metaTitle_contains_query_token", ok, detail)

    if not new_desc:
        brief.add_validation("metaDescription_present", False, "action_plan.patch has no metaDescription")
    else:
        ok, detail = char_limit(new_desc, min_len=120, max_len=170)
        brief.add_validation("metaDescription_char_limit", ok, detail)
        ok, detail = no_banned_chars(new_desc)
        brief.add_validation("metaDescription_no_banned_chars", ok, detail)
        ok, detail = no_banned_phrases(new_desc)
        brief.add_validation("metaDescription_no_hype_phrases", ok, detail)

    # New values must differ from current
    if (
        brief.current_state.get("metaTitle") == new_title
        and brief.current_state.get("metaDescription") == new_desc
    ):
        brief.add_validation("change_is_meaningful", False, "new values identical to current")
    else:
        brief.add_validation("change_is_meaningful", True, "")

    brief.finalise_can_apply()
    return brief


def apply(brief: ChangeBrief) -> dict:
    """Execute the meta rewrite. brief.can_apply must be True."""
    new_title = brief.change_diff["metaTitle_after"]
    new_desc = brief.change_diff["metaDescription_after"]
    path = ROOT / brief.target_file_path

    def _edit(b: ChangeBrief) -> tuple[str, str]:
        from optimisation_engine.apply.base import stamp_trust_signals
        from optimisation_engine.apply.frontmatter_utils import read as _read, write as _write

        before_fm, before_body = _read(path)
        before_snapshot = f"metaTitle: {before_fm.get('metaTitle')!r}\nmetaDescription: {before_fm.get('metaDescription')!r}"

        # Push current values to *_prev BEFORE applying new
        new_fm = dict(before_fm)
        if before_fm.get("metaTitle"):
            new_fm["metaTitle_prev"] = before_fm["metaTitle"]
        if before_fm.get("metaDescription"):
            new_fm["metaDescription_prev"] = before_fm["metaDescription"]
        new_fm["metaTitle"] = new_title
        new_fm["metaDescription"] = new_desc

        # Stamp trust signals (dateModified, reviewedBy, schema)
        stamp_trust_signals(
            fm=new_fm,
            site_key=brief.site_key,
            editorial_note="metaTitle and metaDescription rewritten via optimisation engine after GSC CTR analysis.",
        )

        _write(path, new_fm, before_body)

        after_fm, _ = _read(path)
        after_snapshot = (
            f"metaTitle: {after_fm.get('metaTitle')!r}\n"
            f"metaDescription: {after_fm.get('metaDescription')!r}\n"
            f"dateModified: {after_fm.get('dateModified')!r}\n"
            f"reviewedBy: {after_fm.get('reviewedBy')!r}"
        )
        return before_snapshot, after_snapshot

    return run_apply_lifecycle(
        brief=brief,
        edit_fn=_edit,
        change_type=CHANGE_TYPE,
        confidence="high",  # meta_only changes are low-risk, high-precision
        auto_applied=True,
    )
