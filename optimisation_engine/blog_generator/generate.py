"""
Top-level entry point: generate_blog_for(site_key) and related helpers.

Drives one full topic-to-published-blog cycle:
  1. Load site config (with crossover safety check)
  2. Fetch next topic (or use override)
  3. Generate content via the pipeline
  4. Write to disk (in the correct site directory only)
  5. Mark topic done in Supabase (in the correct table only)
"""
from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.blog_generator.content_pipeline import generate_content
from optimisation_engine.blog_generator.output_writer import write_blog
from optimisation_engine.blog_generator.topic_repository import (
    Topic,
    fetch_next_topic,
    fetch_topic_by_keyword,
    mark_topic_done,
)


def get_site_config(site_key: str) -> dict:
    """Load and validate a site's config dict."""
    from optimisation_engine.blog_generator.site_configs import SITE_CONFIGS
    if site_key not in SITE_CONFIGS:
        raise ValueError(
            f"Unknown site_key={site_key!r}. Known: {sorted(SITE_CONFIGS.keys())}"
        )
    return SITE_CONFIGS[site_key]


def generate_blog_for(
    site_key: str,
    *,
    topic_keyword: str | None = None,
    dry_run: bool = False,
    skip_mark_done: bool = False,
) -> dict:
    """Generate ONE blog for the named site.

    Args:
      site_key: which site to generate for. Must be a key in SITE_CONFIGS.
      topic_keyword: if provided, force generation for this specific topic.
        Otherwise the next-priority unused topic is selected.
      dry_run: if True, skip writing the file and skip marking the topic done.
      skip_mark_done: if True, write the file but don't mark the topic
        as used. Useful for one-off regenerations.

    Returns a summary dict.
    """
    config = get_site_config(site_key)

    if topic_keyword:
        topic = fetch_topic_by_keyword(config, topic_keyword)
        if not topic:
            raise RuntimeError(f"No topic matching keyword={topic_keyword!r} in {config['topic_table']}")
    else:
        topic = fetch_next_topic(config)
        if not topic:
            return {
                "status": "no_topics",
                "site": site_key,
                "message": f"No unused topics in {config['topic_table']}",
            }

    print(f"[{site_key}] Generating for topic: {topic.primary_keyword!r}")
    if topic.publish_priority is not None:
        print(f"  priority={topic.publish_priority} difficulty={topic.keyword_difficulty} volume={topic.target_search_volume}")

    result = generate_content(site_config=config, topic=topic)

    print(f"  LLM cost: ${result.llm_cost_usd:.4f}  Research cost: ${result.research_cost_usd:.4f}")
    print(f"  Sources cited: {len(result.cited_sources)} (out of {result.research_summary['n_sources']} in bundle)")
    print(f"  Issues: {len(result.issues)}")
    for issue in result.issues:
        print(f"    - {issue}")

    if result.issues and not result.fields.get("slug"):
        return {
            "status": "blocked",
            "site": site_key,
            "topic": topic.primary_keyword,
            "issues": result.issues,
            "fields_seen": list(result.fields.keys()),
        }

    out_path = write_blog(
        site_config=config,
        fields=result.fields,
        body_html=result.body_html,
        cited_sources=result.cited_sources,
        image=result.image,
        dry_run=dry_run,
    )

    print(f"  {'[DRY-RUN] would write' if dry_run else '[OK] wrote'}: {out_path.relative_to(ROOT)}")

    if not dry_run and not skip_mark_done:
        try:
            mark_topic_done(config, topic.id, result.fields.get("slug", ""))
            print(f"  [OK] marked topic {topic.id[:8]} done in {config['topic_table']}")
        except Exception as exc:
            print(f"  [WARN] mark_topic_done failed: {exc}")

    return {
        "status": "ok",
        "site": site_key,
        "topic": topic.primary_keyword,
        "slug": result.fields.get("slug"),
        "path": str(out_path.relative_to(ROOT)),
        "issues": result.issues,
        "llm_cost_usd": result.llm_cost_usd,
        "research_cost_usd": result.research_cost_usd,
        "sources_cited": len(result.cited_sources),
        "research_summary": result.research_summary,
    }
