"""apply/comparison_page — create an 'X vs Y' comparison page."""
from __future__ import annotations

import re

from optimisation_engine.apply._format_page_base import apply_format_page, build_format_brief
from optimisation_engine.apply._format_writers import write_comparison_page
from optimisation_engine.apply.brief import ChangeBrief


def _vs_slug(option_a: str, option_b: str) -> str:
    a = re.sub(r"[^a-z0-9\s]", "", option_a.lower()).strip()
    b = re.sub(r"[^a-z0-9\s]", "", option_b.lower()).strip()
    a = re.sub(r"\s+", "-", a)
    b = re.sub(r"\s+", "-", b)
    return f"{a}-vs-{b}"[:80]


def build_brief(opportunity: dict) -> ChangeBrief:
    """opportunity.action_plan.patch.comparison_page = {option_a, option_b, audience}"""
    plan = opportunity.get("action_plan") or {}
    patch = plan.get("patch") or {}
    cpatch = patch.get("comparison_page") or {}

    primary_query = opportunity.get("primary_query") or ""
    option_a = cpatch.get("option_a") or ""
    option_b = cpatch.get("option_b") or ""
    audience = cpatch.get("audience") or f"UK businesses on {opportunity['site_key']}"
    h1 = cpatch.get("primary_h1") or f"{option_a} vs {option_b}: Which Is Better for Your UK Business?"
    slug = cpatch.get("proposed_slug") or _vs_slug(option_a, option_b)
    target_words = int(cpatch.get("target_word_count") or 2000)

    return build_format_brief(
        apply_module_name="comparison_page",
        change_type="new_content",
        page_type="comparison",
        site_key=opportunity["site_key"],
        proposed_slug=slug,
        primary_query=primary_query,
        cluster=opportunity.get("target_query_cluster") or [primary_query],
        writer_fn=write_comparison_page,
        writer_kwargs={
            "option_a": option_a,
            "option_b": option_b,
            "audience": audience,
            "target_word_count": target_words,
            "primary_h1": h1,
        },
        expected_min_words=1500,
        min_citations_per_1000=5.0,
        min_unique_sources=5,
        min_tier_types=2,
        opportunity_id=opportunity.get("id"),
        extra_change_diff={"option_a": option_a, "option_b": option_b, "audience": audience},
    )


def apply(brief: ChangeBrief) -> dict:
    return apply_format_page(brief, default_category="Comparisons")
