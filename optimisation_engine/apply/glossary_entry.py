"""apply/glossary_entry — create a glossary page for one UK accounting term."""
from __future__ import annotations

import re

from optimisation_engine.apply._format_page_base import apply_format_page, build_format_brief
from optimisation_engine.apply._format_writers import write_glossary_entry
from optimisation_engine.apply.brief import ChangeBrief


def _term_to_slug(term: str) -> str:
    s = re.sub(r"[^a-z0-9\s-]", "", term.lower()).strip()
    s = re.sub(r"\s+", "-", s)
    return f"glossary-{s}"[:80]


def build_brief(opportunity: dict) -> ChangeBrief:
    """opportunity.action_plan.patch.glossary_entry = {term, related_terms}"""
    plan = opportunity.get("action_plan") or {}
    patch = plan.get("patch") or {}
    gpatch = patch.get("glossary_entry") or {}
    term = gpatch.get("term") or opportunity.get("primary_query") or ""
    related_terms = gpatch.get("related_terms") or []

    return build_format_brief(
        apply_module_name="glossary_entry",
        change_type="new_content",
        page_type="glossary",
        site_key=opportunity["site_key"],
        proposed_slug=_term_to_slug(term),
        primary_query=term,
        cluster=opportunity.get("target_query_cluster") or [term],
        writer_fn=write_glossary_entry,
        writer_kwargs={"term": term, "related_terms": related_terms, "primary_h1": f"{term} | UK Accounting Glossary"},
        expected_min_words=180,
        min_citations_per_1000=3.0,
        min_unique_sources=2,
        min_tier_types=1,
        opportunity_id=opportunity.get("id"),
        extra_change_diff={"term": term, "related_terms": related_terms},
    )


def apply(brief: ChangeBrief) -> dict:
    return apply_format_page(brief, default_category="Glossary")
