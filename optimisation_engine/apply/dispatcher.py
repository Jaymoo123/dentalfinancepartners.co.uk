"""
Dispatcher: routes an opportunity (with action_plan) to the correct apply module.

  build_brief_for(opportunity) -> ChangeBrief
      Resolves the apply module by action_kind, runs its build_brief.

  apply_brief(brief) -> dict
      Routes back to the same module's apply() function.

Used by:
  - The operator CLI (review_and_apply.py)
  - The weekly cron auto-apply step (when wired in)
"""
from __future__ import annotations

from typing import Any

from optimisation_engine.apply import (
    case_study,
    comparison_page,
    external_link,
    faq_addition,
    glossary_entry,
    in_text_embedding,
    internal_link,
    meta_only,
    new_page,
    new_section,
    pillar_guide,
    schema_only,
)
from optimisation_engine.apply.base import ApplyError
from optimisation_engine.apply.brief import ChangeBrief


# action_kind -> module
_MODULES = {
    "meta_only": meta_only,
    "schema_only": schema_only,
    "faq_addition": faq_addition,
    "in_text_embedding": in_text_embedding,
    "new_section": new_section,
    "new_page": new_page,
    "glossary_entry": glossary_entry,
    "pillar_guide": pillar_guide,
    "case_study": case_study,
    "comparison_page": comparison_page,
}


def build_brief_for(opportunity: dict) -> ChangeBrief:
    """Route an opportunity to the right apply module's build_brief."""
    action_kind = opportunity.get("action_kind")
    if not action_kind:
        raise ApplyError(f"opportunity {opportunity.get('id')} has no action_kind")
    if action_kind == "skip":
        b = ChangeBrief(
            apply_module="skip",
            site_key=opportunity.get("site_key", "?"),
            target_url=opportunity.get("target_url", ""),
            target_file_path="",
            opportunity_id=opportunity.get("id"),
            current_state={"note": "opportunity action_kind is 'skip'"},
            opportunity_rationale=(opportunity.get("action_plan") or {}).get("rationale") or "skip",
            change_summary="no action — skip per Action Specifier",
        )
        b.add_validation("non_skip_action", False, "action_kind=skip")
        b.finalise_can_apply()
        return b
    module = _MODULES.get(action_kind)
    if not module:
        raise ApplyError(f"no apply module for action_kind={action_kind!r}")
    return module.build_brief(opportunity)


def apply_brief(brief: ChangeBrief) -> dict:
    """Route brief to the right apply module."""
    module = _MODULES.get(brief.apply_module)
    if not module:
        raise ApplyError(f"no apply module for apply_module={brief.apply_module!r}")
    return module.apply(brief)


# Convenience entry points for link applies (they consume suggestion rows, not opportunities)


def build_internal_link_brief_from_change_row(change_row: dict, *, opportunity_url: str | None = None, anchor_text: str = "", insertion_hint: str = "", site_key: str = "") -> ChangeBrief:
    """Helper for internal-link suggestions stored as optimisation_changes rows."""
    return internal_link.build_brief_from_suggestion(
        site_key=site_key or change_row.get("site_key", ""),
        from_slug=change_row.get("from_slug") or "",
        target_url=opportunity_url or change_row.get("target_url") or "",
        anchor_text=anchor_text,
        insertion_hint=insertion_hint,
        source_change_id=change_row.get("id"),
    )


def apply_internal_link(brief: ChangeBrief) -> dict:
    return internal_link.apply(brief)


def apply_external_link(brief: ChangeBrief) -> dict:
    return external_link.apply(brief)
