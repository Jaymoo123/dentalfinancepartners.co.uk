"""
Shared apply lifecycle for format pages (glossary, pillar, case study, comparison).

Each format apply module is thin: it sets format-specific config, calls
this module's `apply_format_page`, and that's it. The shared module handles:
  - Slug to path
  - Validators
  - Research bundle synthesis
  - Format writer invocation
  - Citation rendering + References section
  - E-E-A-T trust signal stamping
  - File write + git commit + audit row

Each format has different:
  - action_kind (used in optimisation_changes)
  - page_type (used in schema generation: Article subtype + Service if applicable)
  - directory (could be /blog/, /glossary/, /guides/ — but for now all /blog/)
  - default schema types to include
  - writer function (write_glossary_entry, write_pillar_guide, etc.)
"""
from __future__ import annotations

import sys
from datetime import date
from pathlib import Path
from typing import Callable

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.apply._citation_renderer import (
    assemble_final_body,
    citation_density_meets_minimum,
    citation_diversity_meets_minimum,
)
from optimisation_engine.apply.base import (
    ApplyError,
    run_apply_lifecycle,
    slug_to_path,
    stamp_trust_signals,
)
from optimisation_engine.apply.brief import ChangeBrief
from optimisation_engine.apply.frontmatter_utils import estimate_word_count, write
from optimisation_engine.apply.validators import no_banned_chars
from optimisation_engine.config import get_site
from optimisation_engine.reasoning.research_synthesizer import synthesize_research


def build_format_brief(
    *,
    apply_module_name: str,
    change_type: str,
    page_type: str,
    site_key: str,
    proposed_slug: str,
    primary_query: str,
    cluster: list[str],
    writer_fn: Callable,
    writer_kwargs: dict,
    expected_min_words: int,
    min_citations_per_1000: float = 5.0,
    min_unique_sources: int = 5,
    min_tier_types: int = 2,
    opportunity_id: str | None = None,
    extra_change_diff: dict | None = None,
) -> ChangeBrief:
    """Generic format-page brief builder."""
    site = get_site(site_key)
    target_url = f"https://{site['domain']}/blog/{proposed_slug}"
    proposed_path = slug_to_path(site_key, proposed_slug) if proposed_slug else None
    rel_path = str(proposed_path.relative_to(ROOT)) if proposed_path else ""

    brief = ChangeBrief(
        apply_module=apply_module_name,
        site_key=site_key,
        target_url=target_url,
        target_file_path=rel_path,
        opportunity_id=opportunity_id,
        files_to_modify=[rel_path] if rel_path else [],
    )

    brief.current_state = {
        "site": site["display_name"],
        "proposed_slug": proposed_slug,
        "proposed_path": rel_path,
        "slug_exists_already": bool(proposed_path and proposed_path.exists()),
        "format": page_type,
    }
    brief.opportunity_rationale = writer_kwargs.get("rationale", "") or "Format-specific page proposed by optimisation engine."
    brief.opportunity_signal = {
        "primary_query": primary_query,
        "cluster": cluster[:5],
        "page_type": page_type,
        "expected_min_words": expected_min_words,
    }

    # Pre-LLM validators
    brief.add_validation(
        "slug_present",
        bool(proposed_slug and len(proposed_slug) >= 6),
        f"slug={proposed_slug!r}",
    )
    brief.add_validation(
        "slug_does_not_exist",
        not (proposed_path and proposed_path.exists()),
        "" if not (proposed_path and proposed_path.exists()) else f"file already exists: {rel_path}",
    )

    if brief.blocking_issues:
        brief.change_summary = f"Create {page_type} /blog/{proposed_slug} (blocked — see validators)"
        brief.finalise_can_apply()
        return brief

    # Research synthesis
    try:
        research_bundle = synthesize_research(topic_query=primary_query, site_key=site_key)
    except Exception as exc:
        brief.add_validation("research_synthesis", False, f"research failed: {type(exc).__name__}: {exc}")
        brief.finalise_can_apply()
        return brief

    # Call the format-specific writer
    try:
        gen = writer_fn(
            site_key=site_key,
            primary_query=primary_query,
            cluster=cluster,
            research_bundle=research_bundle,
            **writer_kwargs,
        )
    except Exception as exc:
        brief.add_validation("content_generation", False, f"writer failed: {type(exc).__name__}: {exc}")
        brief.finalise_can_apply()
        return brief

    content = gen.output or {}
    raw_body_html = content.get("body_html") or ""
    body_html = assemble_final_body(raw_body_html, research_bundle, append_references=True)
    content["body_html"] = body_html
    word_count = estimate_word_count(body_html)

    # Validators
    ok_density, det_density = citation_density_meets_minimum(raw_body_html, min_per_1000_words=min_citations_per_1000)
    ok_diversity, det_diversity = citation_diversity_meets_minimum(
        raw_body_html, research_bundle,
        min_unique_sources=min_unique_sources, min_tier_types=min_tier_types,
    )

    brief.change_summary = (
        f"Create {page_type} /blog/{proposed_slug} "
        f"(research-grounded, {len(research_bundle.sources)} sources, "
        f"{research_bundle.diversity_tier_count} tiers)"
    )
    diff = {
        "proposed_slug": proposed_slug,
        "proposed_path": rel_path,
        "page_type": page_type,
        "generated_title": content.get("title"),
        "generated_metaTitle": content.get("metaTitle"),
        "generated_metaDescription": content.get("metaDescription"),
        "generated_h1": content.get("h1"),
        "generated_summary": content.get("summary"),
        "generated_body_word_count": word_count,
        "generated_body_preview": body_html[:1500],
        "generated_faqs": content.get("faqs") or [],
        "research_sources_count": len(research_bundle.sources),
        "research_claims_count": len(research_bundle.claims),
        "research_tiers_covered": research_bundle.diversity_tier_count,
        "research_canonical_present": research_bundle.canonical_sources_present,
        "research_cost_usd": round(research_bundle.total_serper_cost_usd + research_bundle.total_deepseek_cost_usd, 4),
        "citation_density_detail": det_density,
        "citation_diversity_detail": det_diversity,
        "cited_source_domains": sorted({s.domain for s in research_bundle.sources}),
        "llm_confidence": gen.confidence,
        "llm_cost_usd": round(gen.cost_usd, 6),
        "llm_validator_notes": gen.notes,
    }
    if extra_change_diff:
        diff.update(extra_change_diff)
    brief.change_diff = diff
    brief.internal_data["generated_content"] = content
    brief.internal_data["research_bundle"] = research_bundle
    brief.internal_data["page_type"] = page_type
    brief.internal_data["change_type"] = change_type
    brief.internal_data["proposed_slug"] = proposed_slug
    brief.internal_data["primary_h1"] = writer_kwargs.get("primary_h1") or content.get("h1") or proposed_slug

    # Post-LLM validators
    brief.add_validation(
        "content_generation_ok",
        gen.auto_applicable and bool(body_html),
        f"llm_confidence={gen.confidence}, body_chars={len(body_html)}, notes={gen.notes}",
    )
    brief.add_validation(
        "word_count_meets_minimum",
        word_count >= expected_min_words,
        f"got {word_count} vs min {expected_min_words}",
    )
    brief.add_validation("citation_density", ok_density, det_density)
    brief.add_validation("citation_diversity", ok_diversity, det_diversity)
    brief.add_validation(
        "canonical_source_cited",
        research_bundle.canonical_sources_present,
        f"canonical_present={research_bundle.canonical_sources_present}",
    )

    brief.finalise_can_apply()
    return brief


def apply_format_page(brief: ChangeBrief, *, default_category: str = "General") -> dict:
    """Apply a format-page brief: build frontmatter + body + schema, write file, commit."""
    content = brief.internal_data.get("generated_content")
    proposed_slug = brief.internal_data.get("proposed_slug")
    research_bundle = brief.internal_data.get("research_bundle")
    page_type = brief.internal_data.get("page_type") or "blog_post"
    change_type = brief.internal_data.get("change_type") or "new_content"
    primary_h1 = brief.internal_data.get("primary_h1") or content.get("h1") or ""

    if not content or not proposed_slug:
        raise ApplyError("brief.internal_data missing generated_content or proposed_slug")

    site_key = brief.site_key
    site = get_site(site_key)
    page_path = slug_to_path(site_key, proposed_slug)
    if page_path.exists():
        raise ApplyError(f"slug already taken at apply time: {page_path}")

    body_html = content.get("body_html") or ""
    sources_used = sorted({s.domain for s in (research_bundle.sources if research_bundle else [])})

    fm = {
        "title": content.get("title") or primary_h1,
        "slug": proposed_slug,
        "canonical": f"https://{site['domain']}/blog/{proposed_slug}",
        "date": date.today().isoformat(),
        "author": f"{site['display_name']} Editorial Team",
        "category": content.get("category") or default_category,
        "metaTitle": content.get("metaTitle") or "",
        "metaDescription": content.get("metaDescription") or "",
        "altText": f"{primary_h1} illustration",
        "image": "",
        "h1": content.get("h1") or primary_h1,
        "summary": content.get("summary") or "",
        "pageType": page_type,
        "schema": "",
        "faqs": content.get("faqs") or [],
    }

    # Banned chars sanity
    for k in ("title", "metaTitle", "metaDescription", "h1", "summary"):
        if isinstance(fm.get(k), str):
            ok, det = no_banned_chars(fm[k])
            if not ok:
                raise ApplyError(f"{k} contains banned char: {det}")

    # Trust signals + schema
    stamp_trust_signals(
        fm=fm,
        site_key=site_key,
        sources_used=sources_used,
        editorial_note=(
            f"New {page_type} grounded in research across {len(sources_used)} authority sources, "
            f"{research_bundle.diversity_tier_count if research_bundle else 0} source tiers."
        ),
    )

    page_path.parent.mkdir(parents=True, exist_ok=True)
    page_path.write_text("---\nplaceholder: true\n---\n", encoding="utf-8")

    def _edit(b: ChangeBrief) -> tuple[str, str]:
        write(page_path, fm, body_html)
        word_count = estimate_word_count(body_html)
        return "(new file)", (
            f"format={page_type} slug={proposed_slug} word_count={word_count} "
            f"sources={len(sources_used)} schema_chars={len(fm.get('schema') or '')}"
        )

    try:
        return run_apply_lifecycle(
            brief=brief,
            edit_fn=_edit,
            change_type=change_type,
            confidence="low",  # All new format pages queue for human review on first cycles
            auto_applied=False,
        )
    except Exception:
        if page_path.exists():
            page_path.unlink()
        raise
