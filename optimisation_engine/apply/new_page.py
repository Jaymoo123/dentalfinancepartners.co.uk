"""
apply_new_page — create a complete new blog post from an optimisation opportunity.

Refactored to delegate to optimisation_engine.blog_generator (the consolidated
module). This file is now a thin bridge:
  1. build_brief() does lightweight pre-LLM validation (slug doesn't exist, etc.)
  2. apply() constructs an ephemeral Topic from the opportunity and calls
     blog_generator's content_pipeline.generate_content() + output_writer.write_blog()
     inside the apply_lifecycle (which handles git commit + audit log).

Why: previously new_page.py had its own ~400-line LLM pipeline (write_new_page_content
in _content_writer.py) that duplicated the consolidated generator. Every prompt
improvement had to be applied twice. After this refactor, the optimisation queue
benefits from every prompt improvement made for topic-driven generation
automatically, and vice versa.

Safety:
  - Pre-LLM: target slug must NOT already exist as a file (no clobber).
  - Routing: the consolidated generator's three-layer crossover guard
    refuses to write outside the site's expected directory.
  - LLM: the same hard rules apply (banned phrases, citation density gate,
    cited-only Sources, em-dash strip, etc.).
"""
from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.apply.base import (  # noqa: E402
    ApplyError,
    run_apply_lifecycle,
)
from optimisation_engine.apply.brief import ChangeBrief  # noqa: E402

CHANGE_TYPE = "new_content"


def build_brief(opportunity: dict) -> ChangeBrief:
    """Lightweight pre-LLM checks. No content generation happens here —
    that's deferred to apply() to avoid spending LLM budget on briefs that
    won't ship."""
    from optimisation_engine.blog_generator.generate import get_site_config
    from optimisation_engine.blog_generator.routing_safety import (
        SiteRoutingError,
        resolve_output_path,
    )

    site_key = opportunity["site_key"]
    primary_q = opportunity.get("primary_query") or ""
    cluster = opportunity.get("target_query_cluster") or [primary_q]

    plan = opportunity.get("action_plan") or {}
    patch = plan.get("patch") or {}
    np_patch = patch.get("new_page") or {}

    proposed_slug = np_patch.get("proposed_slug") or ""
    primary_h1 = np_patch.get("primary_h1") or ""
    page_type = np_patch.get("page_type") or "blog_post"
    target_words = int(np_patch.get("target_word_count") or 1500)

    # Resolve the target path through the consolidated module's safety guard.
    # If the site_key isn't registered or the path would escape the site dir,
    # this raises.
    try:
        site_config = get_site_config(site_key)
    except ValueError as exc:
        # Construct a minimal brief so the walker can render the error
        brief = ChangeBrief(
            apply_module="new_page",
            site_key=site_key,
            target_url="",
            target_file_path="",
            opportunity_id=opportunity.get("id"),
            files_to_modify=[],
        )
        brief.add_validation("site_key_known", False, str(exc))
        brief.finalise_can_apply()
        return brief

    target_path = None
    rel_path = ""
    if proposed_slug:
        try:
            target_path = resolve_output_path(
                site_key=site_key,
                output_dir_rel=site_config["output_dir"],
                slug=proposed_slug,
            )
            rel_path = str(target_path.relative_to(ROOT))
        except SiteRoutingError as exc:
            # Surface as a fatal validation failure rather than crashing
            brief = ChangeBrief(
                apply_module="new_page",
                site_key=site_key,
                target_url="",
                target_file_path="",
                opportunity_id=opportunity.get("id"),
                files_to_modify=[],
            )
            brief.add_validation("path_resolvable", False, str(exc))
            brief.finalise_can_apply()
            return brief

    target_url = f"{site_config['site_base_url'].rstrip('/')}/blog/{proposed_slug}" if proposed_slug else ""

    brief = ChangeBrief(
        apply_module="new_page",
        site_key=site_key,
        target_url=target_url,
        target_file_path=rel_path,
        opportunity_id=opportunity.get("id"),
        files_to_modify=[rel_path] if rel_path else [],
    )

    brief.current_state = {
        "site": site_config["display_name"],
        "proposed_slug": proposed_slug,
        "proposed_path": rel_path,
        "slug_exists_already": bool(target_path and target_path.exists()),
    }

    brief.opportunity_rationale = opportunity.get("rationale") or plan.get("rationale") or ""
    brief.opportunity_signal = {
        "primary_query": primary_q,
        "cluster": cluster[:5],
        "page_type": page_type,
        "target_word_count": target_words,
        "score": opportunity.get("score"),
        "action_specifier_confidence": opportunity.get("action_plan_confidence"),
    }
    brief.change_summary = f"Create new page /blog/{proposed_slug} via consolidated generator"
    brief.change_diff = {
        "proposed_slug": proposed_slug,
        "proposed_path": rel_path,
        "primary_keyword": primary_q,
        "cluster": cluster[:5],
        "page_type": page_type,
        "target_word_count": target_words,
        "generator": "optimisation_engine.blog_generator",
    }

    # Pre-LLM validators (cheap, deterministic)
    brief.add_validation("slug_present", bool(proposed_slug and len(proposed_slug) >= 6), f"slug={proposed_slug!r}")
    brief.add_validation(
        "slug_does_not_exist",
        not (target_path and target_path.exists()),
        "" if not (target_path and target_path.exists()) else f"file already exists: {rel_path}",
    )
    brief.add_validation("primary_query_present", bool(primary_q), f"primary_query={primary_q!r}")

    # Stash opportunity payload for apply() to consume
    brief.internal_data["opportunity"] = opportunity
    brief.internal_data["np_patch"] = np_patch
    brief.internal_data["target_path"] = str(target_path) if target_path else ""

    brief.finalise_can_apply()
    return brief


def apply(brief: ChangeBrief) -> dict:
    """Generate the blog via the consolidated pipeline and write it inside
    the apply lifecycle (so git commit + audit log are handled)."""
    from optimisation_engine.blog_generator.content_pipeline import generate_content
    from optimisation_engine.blog_generator.generate import get_site_config
    from optimisation_engine.blog_generator.output_writer import write_blog
    from optimisation_engine.blog_generator.topic_repository import Topic

    opportunity = brief.internal_data.get("opportunity") or {}
    np_patch = brief.internal_data.get("np_patch") or {}
    target_path_str = brief.internal_data.get("target_path") or ""
    if not target_path_str:
        raise ApplyError("brief.internal_data missing target_path — build_brief must have failed")

    site_config = get_site_config(brief.site_key)

    # Build the ephemeral Topic — the optimisation_opportunity row never
    # gets inserted into blog_topics_*. We just pass the data inline.
    proposed_slug = np_patch.get("proposed_slug") or ""
    primary_h1 = np_patch.get("primary_h1") or ""
    primary_q = opportunity.get("primary_query") or ""
    cluster = opportunity.get("target_query_cluster") or []
    target_words = int(np_patch.get("target_word_count") or 1500)
    page_type = np_patch.get("page_type") or "blog_post"

    topic = Topic(
        id=f"opportunity-{opportunity.get('id', 'unknown')}",
        topic_title=primary_h1 or primary_q,
        primary_keyword=primary_q,
        secondary_keywords=[k for k in cluster if k and k != primary_q],
        user_intent="informational",
        target_search_volume=opportunity.get("score") or "unknown",
        content_tier="pillar" if target_words >= 2500 else "cluster",
        suggested_slug=proposed_slug,
    )

    # Run the full pipeline
    result = generate_content(site_config=site_config, topic=topic)

    if result.issues:
        raise ApplyError(
            "Consolidated generator blocked the change:\n  " + "\n  ".join(result.issues)
        )

    # Force the slug to match the opportunity's proposed_slug
    # (the LLM may generate a different one; we want consistency)
    if proposed_slug:
        result.fields["slug"] = proposed_slug

    def _edit(b: ChangeBrief) -> tuple[str, str]:
        out_path = write_blog(
            site_config=site_config,
            fields=result.fields,
            body_html=result.body_html,
            cited_sources=result.cited_sources,
            image=result.image,
            dry_run=False,
        )
        summary = (
            f"slug={proposed_slug} sources_cited={len(result.cited_sources)} "
            f"bundle_sources={result.research_summary['n_sources']} "
            f"llm=${result.llm_cost_usd:.4f} research=${result.research_cost_usd:.4f}"
        )
        return "(new file)", summary

    return run_apply_lifecycle(
        brief=brief,
        edit_fn=_edit,
        change_type=CHANGE_TYPE,
        confidence="low",  # new pages stay low-confidence; always queue for human review
        auto_applied=False,  # never autonomously ship a new page
    )
