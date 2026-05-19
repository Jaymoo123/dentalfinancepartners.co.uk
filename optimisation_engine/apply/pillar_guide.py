"""apply/pillar_guide — create a flagship pillar guide page (2500-4000 words)."""
from __future__ import annotations

from optimisation_engine.apply._format_page_base import apply_format_page, build_format_brief
from optimisation_engine.apply._format_writers import write_pillar_guide
from optimisation_engine.apply.brief import ChangeBrief


def build_brief(opportunity: dict) -> ChangeBrief:
    """opportunity.action_plan.patch.pillar_guide = {topic, h1, outline, target_words}"""
    plan = opportunity.get("action_plan") or {}
    patch = plan.get("patch") or {}
    ppatch = patch.get("pillar_guide") or patch.get("new_page") or {}

    primary_query = opportunity.get("primary_query") or ""
    cluster = opportunity.get("target_query_cluster") or [primary_query]
    topic = ppatch.get("pillar_topic") or primary_query
    h1 = ppatch.get("primary_h1") or f"The Complete Guide to {topic.title()}"
    slug = ppatch.get("proposed_slug") or f"pillar-{primary_query.lower().replace(' ', '-')[:60]}"
    outline = ppatch.get("section_outline") or []
    target_words = int(ppatch.get("target_word_count") or 3000)

    return build_format_brief(
        apply_module_name="pillar_guide",
        change_type="new_content",
        page_type="pillar",
        site_key=opportunity["site_key"],
        proposed_slug=slug,
        primary_query=primary_query,
        cluster=cluster,
        writer_fn=write_pillar_guide,
        writer_kwargs={
            "pillar_topic": topic,
            "section_outline": outline,
            "target_word_count": target_words,
            "primary_h1": h1,
        },
        expected_min_words=2500,
        min_citations_per_1000=6.0,
        min_unique_sources=6,
        min_tier_types=3,
        opportunity_id=opportunity.get("id"),
        extra_change_diff={
            "pillar_topic": topic,
            "section_outline": outline,
            "target_word_count": target_words,
        },
    )


def apply(brief: ChangeBrief) -> dict:
    return apply_format_page(brief, default_category="Pillar Guides")
