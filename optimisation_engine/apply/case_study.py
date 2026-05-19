"""apply/case_study — create an anonymised worked-example case study page."""
from __future__ import annotations

import re

from optimisation_engine.apply._format_page_base import apply_format_page, build_format_brief
from optimisation_engine.apply._format_writers import write_case_study
from optimisation_engine.apply.brief import ChangeBrief


def _scenario_to_slug(scenario: str) -> str:
    s = re.sub(r"[^a-z0-9\s-]", "", scenario.lower()).strip()
    s = re.sub(r"\s+", "-", s)
    return f"case-study-{s}"[:80]


def build_brief(opportunity: dict) -> ChangeBrief:
    """opportunity.action_plan.patch.case_study = {scenario, h1, target_words}"""
    plan = opportunity.get("action_plan") or {}
    patch = plan.get("patch") or {}
    cspatch = patch.get("case_study") or {}

    primary_query = opportunity.get("primary_query") or ""
    scenario = cspatch.get("scenario") or primary_query
    h1 = cspatch.get("primary_h1") or f"Worked Example: {scenario}"
    slug = cspatch.get("proposed_slug") or _scenario_to_slug(scenario)
    target_words = int(cspatch.get("target_word_count") or 1200)

    return build_format_brief(
        apply_module_name="case_study",
        change_type="new_content",
        page_type="case_study",
        site_key=opportunity["site_key"],
        proposed_slug=slug,
        primary_query=primary_query,
        cluster=opportunity.get("target_query_cluster") or [primary_query],
        writer_fn=write_case_study,
        writer_kwargs={
            "scenario": scenario,
            "target_word_count": target_words,
            "primary_h1": h1,
        },
        expected_min_words=900,
        min_citations_per_1000=5.0,
        min_unique_sources=3,
        min_tier_types=2,
        opportunity_id=opportunity.get("id"),
        extra_change_diff={"scenario": scenario, "target_word_count": target_words},
    )


def apply(brief: ChangeBrief) -> dict:
    return apply_format_page(brief, default_category="Worked Examples")
