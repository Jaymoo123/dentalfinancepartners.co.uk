"""
Brief generator: takes a gap report and generates a specific, actionable
improvement brief that names exactly what to add, where, and why.

Output stored in competitor_gap_reports.improvement_brief (TEXT).
"""
from __future__ import annotations

import json
import re
import sys
import os
from typing import Any

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from optimisation_engine.competitor._db import _esc, _sql
from optimisation_engine.blog_generator.llm_providers import call_anthropic, LLMError
from optimisation_engine.config import SONNET_MODEL


# ---------------------------------------------------------------------------
# Data loading
# ---------------------------------------------------------------------------

def _get_pending_briefs(site_key: str, limit: int = 50) -> list[dict]:
    """Return gap reports that have topic_gaps but no improvement_brief yet."""
    return _sql(f"""
        SELECT id, site_key, our_page_url, primary_query, our_avg_position,
               competitor_urls, our_word_count, competitor_avg_word_count,
               our_section_count, competitor_avg_section_count,
               our_faq_count, competitor_avg_faq_count,
               topic_gaps, query_gaps, structural_gaps, eeat_gaps,
               priority_score
        FROM competitor_gap_reports
        WHERE site_key = {_esc(site_key)}
          AND (improvement_brief IS NULL OR improvement_brief = '')
          AND topic_gaps IS NOT NULL
        ORDER BY priority_score DESC NULLS LAST
        LIMIT {limit}
    """)


def _get_our_page_map(page_url: str) -> dict | None:
    rows = _sql(f"""
        SELECT title_tag, h1_text, meta_description, word_count,
               sections, faqs, query_in_title, query_in_h1,
               query_density_pct, schema_types, eeat
        FROM page_content_map
        WHERE page_url = {_esc(page_url)}
          AND is_our_page = TRUE
        ORDER BY fetch_date DESC
        LIMIT 1
    """)
    return rows[0] if rows else None


# ---------------------------------------------------------------------------
# Brief prompt
# ---------------------------------------------------------------------------

BRIEF_SYSTEM = """You are a senior SEO content strategist for UK professional services accountancy firms. You write highly specific improvement briefs that tell a content editor exactly what to add, how much, and why it will help rankings.

Be surgical. Name actual figures, specific legislation, exact heading text, real FAQ questions. Never write "add more content about X" — write "add a worked numerical example showing: purchase price £280,000, gain after allowance £77,000, CGT at 18% = £13,860."

Use plain UK English. No buzzwords. Be direct."""

BRIEF_TEMPLATE = """Write a specific, actionable improvement brief for this page.

PAGE: {page_url}
QUERY: "{query}"
CURRENT POSITION: {position}
TARGET: top 3

CURRENT STATE:
- Title: {title}
- H1: {h1}
- Word count: {our_words} (competitor average: {comp_words})
- Sections (H2s): {our_sections}
- FAQ count: {our_faqs} (competitor average: {comp_faqs})
- Schema types: {schema_types}
- Query in title: {q_in_title}
- Query in H1: {q_in_h1}

CONTENT GAPS (identified from competitor analysis):
{topic_gaps_text}

STRUCTURAL GAPS:
{structural_gaps_text}

E-E-A-T GAPS:
{eeat_gaps_text}

QUERY COVERAGE GAPS (terms competitors use more):
{query_gaps_text}

Write the improvement brief in this exact format:

IMPROVEMENT BRIEF
Page: [page path only, not full URL]
Query: "[query]"
Position: [position] -> target: top 3
Priority score: [score]

CONTENT GAPS (fix in order):
[numbered list — each item must say: what's missing, what competitors have, what specifically to add. Use [CRITICAL] / [HIGH] / [MEDIUM] labels.]

TITLE/META:
Current title: [title]
[Specific suggested title — include primary query tokens, keep under 60 chars]
[Suggested meta description — specific, under 155 chars]

E-E-A-T:
[Specific actions to add expertise/authority signals]

WORD COUNT: Current [X]. Target: [Y-Z] (competitor average [comp_avg]).

FAQ ADDITIONS:
[List the exact FAQ questions to add — real questions a searcher would type]

SCHEMA:
[Exact schema types to add if missing]"""


def _format_topic_gaps(gaps: Any) -> str:
    if not gaps:
        return "none identified"
    if isinstance(gaps, str):
        try:
            gaps = json.loads(gaps)
        except Exception:
            return str(gaps)[:300]
    if not isinstance(gaps, list):
        return str(gaps)[:300]

    lines: list[str] = []
    for g in gaps:
        priority = (g.get("priority") or "medium").upper()
        topic = g.get("topic") or ""
        detail = g.get("detail") or ""
        lines.append(f"[{priority}] {topic}: {detail}")
    return "\n".join(lines)


def _format_list(v: Any) -> str:
    if not v:
        return "none"
    if isinstance(v, str):
        try:
            v = json.loads(v)
        except Exception:
            return str(v)[:300]
    if isinstance(v, list):
        return "\n".join(f"- {item}" for item in v[:10])
    return str(v)[:300]


def _format_query_gaps(gaps: Any) -> str:
    if not gaps:
        return "none"
    if isinstance(gaps, str):
        try:
            gaps = json.loads(gaps)
        except Exception:
            return str(gaps)[:300]
    if not isinstance(gaps, list):
        return str(gaps)[:300]

    lines: list[str] = []
    for g in gaps[:8]:
        term = g.get("term") or ""
        ours = g.get("our_count", 0)
        theirs = g.get("their_avg_count", 0)
        lines.append(f"  '{term}': we use {ours}x, competitors avg {theirs}x")
    return "\n".join(lines)


def _format_sections(sections: Any) -> str:
    if not sections:
        return "none"
    if isinstance(sections, str):
        try:
            sections = json.loads(sections)
        except Exception:
            return str(sections)[:200]
    if not isinstance(sections, list):
        return "none"
    headings = [s.get("heading") or "" for s in sections[:8]]
    return ", ".join(h for h in headings if h)


# ---------------------------------------------------------------------------
# Generation
# ---------------------------------------------------------------------------

def _generate_brief(report: dict, our_map: dict | None) -> str | None:
    """Generate improvement brief text for a single gap report."""
    page_url = report.get("our_page_url") or ""
    query = report.get("primary_query") or ""
    position = report.get("our_avg_position") or 50
    score = report.get("priority_score") or 0

    # Extract path from URL for display
    from urllib.parse import urlparse
    page_path = urlparse(page_url).path or page_url

    our_words = report.get("our_word_count") or (our_map.get("word_count") if our_map else 0) or 0
    comp_words = report.get("competitor_avg_word_count") or 0
    our_faqs = report.get("our_faq_count") or 0
    comp_faqs = report.get("competitor_avg_faq_count") or 0
    our_sections = _format_sections((our_map or {}).get("sections"))

    title = (our_map or {}).get("title_tag") or ""
    h1 = (our_map or {}).get("h1_text") or ""
    schema_types = _format_list((our_map or {}).get("schema_types"))
    q_in_title = "yes" if (our_map or {}).get("query_in_title") else "no"
    q_in_h1 = "yes" if (our_map or {}).get("query_in_h1") else "no"

    prompt = BRIEF_TEMPLATE.format(
        page_url=page_path,
        query=query,
        position=position,
        title=title,
        h1=h1,
        our_words=our_words,
        comp_words=comp_words,
        our_sections=our_sections,
        our_faqs=our_faqs,
        comp_faqs=comp_faqs,
        schema_types=schema_types,
        q_in_title=q_in_title,
        q_in_h1=q_in_h1,
        topic_gaps_text=_format_topic_gaps(report.get("topic_gaps")),
        structural_gaps_text=_format_list(report.get("structural_gaps")),
        eeat_gaps_text=_format_list(report.get("eeat_gaps")),
        query_gaps_text=_format_query_gaps(report.get("query_gaps")),
    )

    try:
        result = call_anthropic(
            system_prompt=BRIEF_SYSTEM,
            user_prompt=prompt,
            model=SONNET_MODEL,
            max_tokens=3000,
            temperature=0.3,
        )
        return result.text.strip(), result.cost_usd
    except LLMError as exc:
        print(f"    [brief_generator] LLM error: {exc}")
        return None, 0.0


def _save_brief(report_id: str, brief_text: str) -> None:
    _sql(f"""
        UPDATE competitor_gap_reports
        SET improvement_brief = {_esc(brief_text[:10000])},
            status = 'brief_ready',
            updated_at = NOW()
        WHERE id = {_esc(report_id)}
    """)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def run_brief_generation(site_key: str, *, max_pages: int | None = None) -> dict:
    """Generate improvement briefs for all pending gap reports."""
    pending = _get_pending_briefs(site_key, limit=max_pages or 50)
    print(f"[brief_generator] {site_key}: {len(pending)} briefs to generate")

    total_cost = 0.0
    generated = 0

    for report in pending:
        our_url = report.get("our_page_url") or ""
        query = report.get("primary_query") or ""
        print(f"\n  generating brief: {query[:60]} | score={report.get('priority_score')}")

        our_map = _get_our_page_map(our_url)
        result = _generate_brief(report, our_map)

        if result[0]:
            brief_text, cost = result
            total_cost += cost
            try:
                _save_brief(report["id"], brief_text)
                generated += 1
                print(f"    brief saved ({len(brief_text)} chars, ${cost:.4f})")
            except Exception as exc:
                print(f"    DB save error: {exc}")

    print(f"\n[brief_generator] done: {generated} briefs. DeepSeek cost: ${total_cost:.4f}")
    return {"generated": generated, "deepseek_cost_usd": total_cost}
