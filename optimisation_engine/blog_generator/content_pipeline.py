"""
Content pipeline: orchestrates research -> prompt -> LLM call -> parsing
                                          -> post-processing -> validation.

This is the heart of the generator. Per-site behaviour is driven entirely
by the site_config dict.
"""
from __future__ import annotations

import json
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.blog_generator.llm_providers import call_llm, LLMResult, call_anthropic
from optimisation_engine.blog_generator.post_processing import (
    append_related_posts_if_needed,
    attach_cited_only_sources,
    fetch_image_for_post,
    strip_em_dashes,
    truncate_meta,
)
from optimisation_engine.blog_generator.topic_repository import Topic
from optimisation_engine.blog_generator.validation import validate_post


# ---------------------------------------------------------------------------
# Output marker format used by all 6 existing generators: ==field==
# ---------------------------------------------------------------------------

_MARKER_RX = re.compile(r"==([^=]+)==\s*(.*?)(?=\n==|$)", re.DOTALL)


def parse_marker_output(raw_text: str) -> dict:
    """Parse ==field== blocks into a dict. Matches the existing convention
    so existing prompts work unchanged."""
    fields: dict = {}
    for m in _MARKER_RX.finditer(raw_text):
        key = m.group(1).strip().lower().replace("-", "_").replace(" ", "_")
        fields[key] = m.group(2).strip()
    return fields


# ---------------------------------------------------------------------------
# Pipeline result
# ---------------------------------------------------------------------------


@dataclass
class GenerationResult:
    fields: dict
    body_html: str
    cited_sources: list[dict]
    image: dict | None
    issues: list[str]
    llm_cost_usd: float
    research_cost_usd: float
    audience_link: str | None
    research_summary: dict = field(default_factory=dict)


# ---------------------------------------------------------------------------
# Main entry point
# ---------------------------------------------------------------------------


def generate_content(
    *,
    site_config: dict,
    topic: Topic,
) -> GenerationResult:
    """End-to-end content generation for one topic.

    Steps:
      1. Synthesize research (authority sources + claims) for the topic.
      2. Pick audience link.
      3. Build user prompt; call the configured LLM provider.
      4. Parse ==field== output.
      5. Post-process: em-dash strip, meta truncate, citation render,
         cited-only Sources block, related-posts auto-link.
      6. Optionally fetch image.
      7. Optional Haiku verification pass.
      8. Validate.
    """
    # 1. Research
    research_bundle, research_cost = _synthesize_research(site_config, topic)

    # 2. Audience link
    audience_link = _pick_audience_link(site_config, topic.primary_keyword)

    # 3. User prompt + LLM call
    user_prompt = _build_user_prompt(
        site_config=site_config,
        topic=topic,
        research_bundle=research_bundle,
        audience_link=audience_link,
    )
    llm = call_llm(
        provider=site_config["llm_provider"],
        system_prompt=site_config["system_prompt"],
        user_prompt=user_prompt,
        model=site_config["llm_model"],
        max_tokens=site_config.get("max_tokens", 4096),
        temperature=site_config.get("temperature", 0.3),
    )

    # 4. Parse output
    fields = parse_marker_output(llm.text)

    # 5. Post-processing
    fields = _apply_post_processing(
        fields=fields,
        site_config=site_config,
        research_bundle=research_bundle,
        audience_link=audience_link,
    )

    body_html = fields.get("content", "")
    cited_sources = fields.pop("_cited_sources", [])

    # 6. Optional image fetch (config controls whether)
    image = None
    if site_config.get("fetch_image", True):
        query = fields.get("name") or topic.primary_keyword
        image = fetch_image_for_post(query)

    # 7. Optional Haiku verification (config controls whether)
    verify_cost = 0.0
    if site_config.get("verify_with_haiku", False) and body_html:
        verify_cost = _haiku_verification_pass(
            site_config=site_config,
            fields=fields,
            body_html=body_html,
        )

    # Re-set content with updated body (post-processing may have changed it)
    fields["content"] = body_html
    fields["_n_sources_in_block"] = len(cited_sources)

    # 8. Validation
    issues = validate_post(fields, site_config=site_config)

    return GenerationResult(
        fields=fields,
        body_html=body_html,
        cited_sources=cited_sources,
        image=image,
        issues=issues,
        llm_cost_usd=round(llm.cost_usd + verify_cost, 6),
        research_cost_usd=round(research_cost, 6),
        audience_link=audience_link,
        research_summary={
            "n_sources": len(research_bundle["sources"]) if research_bundle else 0,
            "n_claims": len(research_bundle["claims"]) if research_bundle else 0,
            "tiers": research_bundle["diversity_tier_count"] if research_bundle else 0,
            "canonical_present": research_bundle["canonical_present"] if research_bundle else False,
            "thin_bundle": research_bundle.get("thin_bundle", False) if research_bundle else True,
        },
    )


# ---------------------------------------------------------------------------
# Research synthesis adapter
# ---------------------------------------------------------------------------


def _synthesize_research(site_config: dict, topic: Topic) -> tuple[dict | None, float]:
    """Call the shared synthesize_research and normalise into a simple dict
    the prompt builder can consume.

    Returns (bundle_dict | None, total_cost_usd).
    """
    if not site_config.get("use_research_bundle", True):
        return None, 0.0
    try:
        from optimisation_engine.reasoning.research_synthesizer import synthesize_research
    except Exception:
        return None, 0.0

    fallback = [k for k in topic.secondary_keywords if k][:3]
    try:
        bundle = synthesize_research(
            topic_query=topic.primary_keyword,
            site_key=site_config["site_key"],
            fallback_queries=fallback,
        )
    except Exception:
        return None, 0.0

    sources = [
        {
            "domain": s.domain,
            "url": s.url,
            "title": s.title or s.domain,
            "tier": s.tier,
            "n_claims": s.n_claims,
        }
        for s in bundle.sources
    ]
    productive = sum(1 for s in sources if s["n_claims"] > 0)
    # thin = the bundle genuinely cannot support citation. Canonical (gov.uk)
    # presence is preferred but not required: for niche-specific topics,
    # authority-tier sources (BDA, ICAEW, SRA, RICS) are perfectly valid
    # anchors. We treat the bundle as thin only when there's nothing to cite.
    thin = productive < 2 or len(bundle.claims) < 4
    return (
        {
            "topic_query": topic.primary_keyword,
            "sources": sources,
            "claims": [
                {
                    "kind": c.kind,
                    "text": c.text,
                    "source_url": c.source_url,
                    "source_domain": c.source_domain,
                    "source_tier": c.source_tier,
                }
                for c in bundle.claims
            ],
            "diversity_tier_count": bundle.diversity_tier_count,
            "canonical_present": bundle.canonical_sources_present,
            "thin_bundle": thin,
        },
        bundle.total_serper_cost_usd + bundle.total_deepseek_cost_usd,
    )


# ---------------------------------------------------------------------------
# Audience link picker (per-site rules)
# ---------------------------------------------------------------------------


def _pick_audience_link(site_config: dict, topic_text: str) -> str | None:
    rules = site_config.get("audience_link_map") or []
    topic_lower = (topic_text or "").lower()
    for keywords, link in rules:
        if any(kw in topic_lower for kw in keywords):
            return link
    return site_config.get("default_audience_link")


# ---------------------------------------------------------------------------
# User-prompt construction
# ---------------------------------------------------------------------------


def _build_user_prompt(
    *,
    site_config: dict,
    topic: Topic,
    research_bundle: dict | None,
    audience_link: str | None,
) -> str:
    """Assemble the per-topic user prompt the LLM sees on top of the
    site's system prompt."""
    secondary = ", ".join(topic.secondary_keywords) if topic.secondary_keywords else "none"
    audience_block = (
        f"\nMost-relevant audience landing page: {audience_link}\n"
        if audience_link
        else ""
    )
    research_block = _format_research_for_prompt(research_bundle) if research_bundle else ""

    categories = site_config.get("post_categories") or []
    cat_block = (
        f"Available categories (pick one):\n  - " + "\n  - ".join(categories)
        if categories
        else ""
    )

    links = site_config.get("internal_link_slugs") or []
    links_block = (
        "Available internal links to weave in naturally (use HTML <a href=...>):\n  - "
        + "\n  - ".join(links)
        if links
        else ""
    )

    pillar_hint = ""
    if topic.content_tier == "pillar" and site_config.get("pillar_system_prompt"):
        pillar_hint = "\nTHIS IS A PILLAR POST. Target 3,500-5,000 words, 8-12 H2 sections.\n"

    return f"""Generate a comprehensive UK accounting blog post for {site_config["display_name"]}.

PRIMARY TOPIC: {topic.primary_keyword}
USER INTENT: {topic.user_intent}
SEARCH VOLUME: {topic.target_search_volume}
SECONDARY KEYWORDS: {secondary}
{pillar_hint}{audience_block}
{cat_block}

{links_block}
{research_block}
Generate the content following the EXACT ==field== format specified in your
system prompt. Every field marker must appear. Do not add any prose outside
the markers.
"""


def _format_research_for_prompt(bundle: dict) -> str:
    if not bundle or not bundle.get("sources"):
        return ""
    if bundle.get("thin_bundle"):
        return (
            "\nRESEARCH BUNDLE (thin — no usable claims):\n"
            "  No grounded citations available for this topic. Write WITHOUT [n] markers.\n"
            "  Do not invent source numbers.\n"
        )

    n = len(bundle["sources"])
    lines = [
        "",
        f"RESEARCH BUNDLE — cite these inline using [n] markers (1..{n}):",
        "",
        "SOURCES:",
    ]
    for i, s in enumerate(bundle["sources"], 1):
        lines.append(f"  [{i}] ({s['tier']}) {s['domain']} -- {s['title']!r}")
    lines.append("")
    lines.append("CLAIMS (each is tagged with its source number):")
    # Group by source for readability; bullet by source
    by_source: dict[str, list[dict]] = {}
    src_idx_by_url = {s["url"]: i for i, s in enumerate(bundle["sources"], 1)}
    for c in bundle["claims"][:25]:
        src_idx = src_idx_by_url.get(c["source_url"])
        if src_idx is None:
            continue
        by_source.setdefault(str(src_idx), []).append(c)
    for idx, claims in sorted(by_source.items(), key=lambda x: int(x[0])):
        for c in claims:
            lines.append(f"  - [from source {idx}]: {c['text']}")
    lines.append("")
    lines.append("STRICT CITATION RULES:")
    lines.append(f"  - Valid markers: [1] through [{n}] only.")
    lines.append(f"  - NEVER write [{n+1}] or any number above {n}.")
    lines.append(f"  - At least 1 [n] citation per 250 words of the article.")
    lines.append(f"  - Do not invent figures: only quote numbers that appear in the claims above.")
    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Post-processing chain
# ---------------------------------------------------------------------------


def _apply_post_processing(
    *,
    fields: dict,
    site_config: dict,
    research_bundle: dict | None,
    audience_link: str | None,
) -> dict:
    """Apply em-dash strip, meta truncation, citation render, related-posts auto-link."""

    # Em-dash / en-dash strip on every text-bearing field
    for key in ("content", "meta_title", "meta_description", "3_liner", "name", "h1", "alt_tag"):
        if key in fields and isinstance(fields[key], str):
            fields[key] = strip_em_dashes(fields[key])

    # FAQ answers are common em-dash zones
    for i in range(1, 9):
        for k in (f"faq{i}", f"faa{i}"):
            if k in fields and isinstance(fields[k], str):
                fields[k] = strip_em_dashes(fields[k])

    # Hard meta caps with dangle-word cleanup
    if fields.get("meta_title"):
        fields["meta_title"] = truncate_meta(fields["meta_title"], 60)
    if fields.get("meta_description"):
        fields["meta_description"] = truncate_meta(fields["meta_description"], 155)

    # Citation render + cited-only Sources block
    body = fields.get("content", "")
    if research_bundle and research_bundle.get("sources") and not research_bundle.get("thin_bundle"):
        body, cited = attach_cited_only_sources(body, research_bundle["sources"])
    else:
        # No usable bundle: strip any orphan [n] markers so we don't ship them
        from optimisation_engine.blog_generator.post_processing import _strip_orphan_markers
        body, _ = _strip_orphan_markers(body, max_valid=0)
        cited = []

    # Auto-related-posts if internal links < 3
    body = append_related_posts_if_needed(
        body,
        internal_link_slugs=site_config.get("internal_link_slugs") or [],
        audience_link=audience_link,
        min_required=3,
    )

    fields["content"] = body
    fields["_cited_sources"] = cited
    return fields


# ---------------------------------------------------------------------------
# Haiku verification pass (mitigates DeepSeek hallucination risk)
# ---------------------------------------------------------------------------


def _haiku_verification_pass(
    *,
    site_config: dict,
    fields: dict,
    body_html: str,
) -> float:
    """Ask Haiku to flag any factually-incorrect claims in the body, citing
    the site's hallucination_zones config. Returns the cost in USD.

    The verification result is attached to fields['_verification_notes']. It
    does NOT modify content; it's purely informational for the validator to
    pick up if needed.
    """
    zones = site_config.get("hallucination_zones") or []
    zones_block = "\n".join(f"  {i+1}. {z}" for i, z in enumerate(zones)) if zones else "(none)"

    verifier_system = f"""You are a fact-checker for UK accounting blog posts.
Read the article body and report any claims that conflict with the
hallucination zones below, or any specific numeric claims (£ amounts,
%, deadlines) that look likely to be incorrect for the UK 2025/26 or
2026/27 tax year.

Hallucination zones for this niche:
{zones_block}

Return a JSON object with two keys:
  - "wrong_claims": list of strings, each describing a wrong claim found.
  - "uncertain_claims": list of strings, each describing a claim you cannot
    verify with high confidence (LLM should flag but not necessarily reject).

If no issues, return {{"wrong_claims": [], "uncertain_claims": []}}.
"""
    user = f"Article body:\n\n{body_html[:8000]}\n"
    try:
        result = call_anthropic(
            system_prompt=verifier_system,
            user_prompt=user,
            model="claude-haiku-4-5-20251001",
            max_tokens=800,
            temperature=0.0,
        )
    except Exception:
        return 0.0

    raw = (result.text or "").strip()
    # Strip markdown JSON fence if present
    if raw.startswith("```"):
        raw = re.sub(r"^```(?:json)?", "", raw).rstrip("`").strip()
    try:
        data = json.loads(raw)
        fields["_verification_notes"] = data
    except Exception:
        fields["_verification_notes"] = {"raw": raw[:500]}
    return result.cost_usd
