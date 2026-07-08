"""
Gap analyser: compare our page_content_map rows against competitor rows
for the same query and compute structured gap reports.

Two-pass process:
  1. Quantitative gaps computed in Python (no LLM needed)
  2. Content gap identified by Anthropic Sonnet from structured section/FAQ data
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

from optimisation_engine.competitor._db import _arr, _esc, _jsonb, _sql, parse_llm_json
from optimisation_engine.blog_generator.llm_providers import call_anthropic, LLMError
from optimisation_engine.config import SONNET_MODEL


# ---------------------------------------------------------------------------
# Priority scoring
# ---------------------------------------------------------------------------

def _priority_score(our_position: float, topic_gap_count: int, word_gap: int, structural_gap_count: int) -> float:
    pos_score = max(1.0, 10.0 - (our_position - 1) * (9.0 / 49.0))
    gap_score = min(10.0, topic_gap_count * 1.5 + structural_gap_count * 0.8)
    content_score = min(5.0, word_gap / 500.0)
    return round(pos_score * 0.45 + gap_score * 0.4 + content_score * 0.15, 1)


# ---------------------------------------------------------------------------
# Data loading
# ---------------------------------------------------------------------------

def _get_pending_analyses(site_key: str) -> list[dict]:
    """Return our pages that have SERP data but no gap report yet."""
    return _sql(f"""
        SELECT DISTINCT
            cs.site_key,
            cs.our_page_url,
            cs.query,
            cs.our_position,
            cs.id AS serp_id
        FROM competitor_serps cs
        WHERE cs.site_key = {_esc(site_key)}
          AND cs.our_page_url IS NOT NULL
          AND NOT EXISTS (
            SELECT 1 FROM competitor_gap_reports cgr
            WHERE cgr.site_key = cs.site_key
              AND cgr.our_page_url = cs.our_page_url
              AND cgr.primary_query = cs.query
          )
        ORDER BY cs.our_position ASC NULLS LAST
        LIMIT 100
    """)


def _get_our_content_map(page_url: str, query: str) -> dict | None:
    """Fetch the most recent page_content_map row for our page."""
    rows = _sql(f"""
        SELECT * FROM page_content_map
        WHERE page_url = {_esc(page_url)}
          AND is_our_page = TRUE
        ORDER BY fetch_date DESC
        LIMIT 1
    """)
    return rows[0] if rows else None


def _get_competitor_content_maps(serp_id: str) -> list[dict]:
    """Fetch page_content_map rows for top competitors of this SERP."""
    return _sql(f"""
        SELECT cp.position AS serp_position,
               pcm.page_url, pcm.title_tag, pcm.meta_description, pcm.h1_text,
               pcm.word_count, pcm.sections, pcm.faqs, pcm.query_coverage,
               pcm.has_lead_form, pcm.has_calculator, pcm.has_video,
               pcm.has_accordion, pcm.has_testimonials, pcm.first_paragraph_text
        FROM competitor_pages cp
        JOIN page_content_map pcm ON pcm.id = cp.content_map_id
        WHERE cp.serp_id = {_esc(serp_id)}
          AND pcm.js_rendered = FALSE
          AND pcm.word_count > 200
        ORDER BY cp.position ASC
        LIMIT 3
    """)


# ---------------------------------------------------------------------------
# Quantitative gap computation (no LLM)
# ---------------------------------------------------------------------------

def _compute_structural_gaps(our: dict, comps: list[dict]) -> list[str]:
    """Identify structural elements present in >= 2 competitors but absent in us."""
    if not comps:
        return []

    def _pct(field: str) -> float:
        return sum(1 for c in comps if c.get(field)) / len(comps)

    gaps: list[str] = []

    # Check boolean fields where 50%+ of competitors have it but we don't
    bool_checks = [
        ("has_lead_form",    "lead contact form"),
        ("has_calculator",   "calculator or tool"),
        ("has_video",        "video content"),
        ("has_accordion",    "FAQ accordion"),
        ("has_testimonials", "testimonials or reviews"),
        ("has_case_study",   "case study"),
        ("has_stats_block",  "stats or social proof block"),
        ("has_download",     "downloadable resource"),
        ("has_phone_visible","visible phone number"),
    ]

    for field, label in bool_checks:
        if not our.get(field) and _pct(field) >= 0.5:
            gaps.append(f"missing {label}")

    # Schema
    our_schema = set(our.get("schema_types") or [])
    for comp in comps:
        for t in (comp.get("schema_types") or []):
            if t not in our_schema and t in ("FAQPage", "HowTo", "Article", "BreadcrumbList"):
                gaps.append(f"missing {t} schema")
                our_schema.add(t)  # de-dupe

    # E-E-A-T gaps
    our_eeat = our.get("eeat") or {}
    if not our_eeat.get("author_name"):
        if any((c.get("eeat") or {}).get("author_name") for c in comps):
            gaps.append("no author attribution")
    if not our_eeat.get("last_updated_text"):
        if any((c.get("eeat") or {}).get("last_updated_text") for c in comps):
            gaps.append("no last-updated date")
    if not our_eeat.get("external_citations"):
        if any((c.get("eeat") or {}).get("external_citations") for c in comps):
            gaps.append("no HMRC/legislation citations")

    return list(dict.fromkeys(gaps))


def _compute_query_gaps(our: dict, comps: list[dict]) -> list[dict]:
    """Find query terms competitors use significantly more than we do."""
    our_coverage = our.get("query_coverage") or {}
    if not comps or not our_coverage:
        return []

    all_terms = set(our_coverage.keys())
    for c in comps:
        all_terms.update((c.get("query_coverage") or {}).keys())

    gaps: list[dict] = []
    for term in all_terms:
        our_count = our_coverage.get(term, 0)
        comp_counts = [(c.get("query_coverage") or {}).get(term, 0) for c in comps]
        avg_comp = sum(comp_counts) / len(comp_counts) if comp_counts else 0
        if avg_comp > our_count + 1.5 and avg_comp >= 2:
            gaps.append({
                "term": term,
                "our_count": our_count,
                "their_avg_count": round(avg_comp, 1),
            })

    return sorted(gaps, key=lambda g: -(g["their_avg_count"] - g["our_count"]))[:15]


# ---------------------------------------------------------------------------
# LLM content gap analysis
# ---------------------------------------------------------------------------

GAP_SYSTEM = """You are an expert SEO content analyst for UK professional services. You compare pages in search results and identify specific, actionable content gaps. Be surgical — name actual missing topics, specific figures, exact structural elements. You always respond with valid JSON."""

GAP_PROMPT_TEMPLATE = """Query: "{query}"
Our page position: {our_position}

OUR PAGE:
Title: {our_title}
H1: {our_h1}
Word count: {our_words}
H2 headings: {our_headings}
FAQ questions: {our_faqs}
First paragraph: {our_para}

COMPETITOR 1 (position {c1_pos}):
Title: {c1_title}
Word count: {c1_words}
H2 headings: {c1_headings}
Sections with content: {c1_sections}
FAQs: {c1_faqs}

{competitor2_block}

{competitor3_block}

Identify the specific content gaps. Return ONLY valid JSON:
{{
  "topic_gaps": [
    {{
      "topic": "exact topic name",
      "priority": "high|medium|low",
      "detail": "what specifically competitors cover that we don't — name figures, headings, examples"
    }}
  ],
  "structural_gaps": ["missing specific structural element"],
  "eeat_gaps": ["missing E-E-A-T signal"],
  "word_count_assessment": "short description of whether our word count is adequate"
}}"""


def _build_sections_summary(sections: Any) -> str:
    """Summarise sections for LLM prompt."""
    if not sections:
        return "none"
    if isinstance(sections, str):
        try:
            sections = json.loads(sections)
        except (json.JSONDecodeError, TypeError):
            return "none"
    if not isinstance(sections, list):
        return "none"

    parts: list[str] = []
    for s in sections[:8]:
        heading = s.get("heading") or ""
        wc = s.get("word_count") or 0
        content = s.get("content_text") or ""
        figures = s.get("figures_in_section") or []
        has_example = "yes" if s.get("has_example") else "no"
        figs_str = f" | figures: {', '.join(figures[:4])}" if figures else ""
        parts.append(f"  H{s.get('level',2)}: {heading} ({wc}w, example:{has_example}{figs_str})\n    {content[:150]}")
    return "\n".join(parts)


def _build_faqs_summary(faqs: Any) -> str:
    """Summarise FAQs for LLM prompt."""
    if not faqs:
        return "none"
    if isinstance(faqs, str):
        try:
            faqs = json.loads(faqs)
        except (json.JSONDecodeError, TypeError):
            return "none"
    if not isinstance(faqs, list):
        return "none"

    return "; ".join(f.get("question") or "" for f in faqs[:6] if f.get("question"))


def _build_headings_list(sections: Any) -> str:
    if not sections:
        return "none"
    if isinstance(sections, str):
        try:
            sections = json.loads(sections)
        except (json.JSONDecodeError, TypeError):
            return "none"
    if not isinstance(sections, list):
        return "none"
    return ", ".join(s.get("heading") or "" for s in sections[:10] if s.get("heading"))


def _run_llm_gap_analysis(our: dict, comps: list[dict], query: str, our_position: float) -> dict | None:
    """Run DeepSeek gap analysis. Returns parsed JSON or None."""
    c1 = comps[0] if comps else {}
    c2 = comps[1] if len(comps) > 1 else {}
    c3 = comps[2] if len(comps) > 2 else {}

    c2_block = ""
    if c2:
        c2_block = f"""COMPETITOR 2 (position {c2.get('serp_position', '?')}):
Title: {c2.get('title_tag') or ''}
Word count: {c2.get('word_count') or 0}
H2 headings: {_build_headings_list(c2.get('sections'))}
Sections: {_build_sections_summary(c2.get('sections'))}
FAQs: {_build_faqs_summary(c2.get('faqs'))}"""

    c3_block = ""
    if c3:
        c3_block = f"""COMPETITOR 3 (position {c3.get('serp_position', '?')}):
Title: {c3.get('title_tag') or ''}
Word count: {c3.get('word_count') or 0}
H2 headings: {_build_headings_list(c3.get('sections'))}
FAQs: {_build_faqs_summary(c3.get('faqs'))}"""

    prompt = GAP_PROMPT_TEMPLATE.format(
        query=query,
        our_position=our_position,
        our_title=our.get("title_tag") or "",
        our_h1=our.get("h1_text") or "",
        our_words=our.get("word_count") or 0,
        our_headings=_build_headings_list(our.get("sections")),
        our_faqs=_build_faqs_summary(our.get("faqs")),
        our_para=our.get("first_paragraph_text") or "",
        c1_pos=c1.get("serp_position", "?"),
        c1_title=c1.get("title_tag") or "",
        c1_words=c1.get("word_count") or 0,
        c1_headings=_build_headings_list(c1.get("sections")),
        c1_sections=_build_sections_summary(c1.get("sections")),
        c1_faqs=_build_faqs_summary(c1.get("faqs")),
        competitor2_block=c2_block,
        competitor3_block=c3_block,
    )

    try:
        result = call_anthropic(
            system_prompt=GAP_SYSTEM,
            user_prompt=prompt,
            model=SONNET_MODEL,
            max_tokens=3000,
            temperature=0.2,
        )
    except LLMError as exc:
        print(f"    [gap_analyser] LLM error: {exc}")
        return None

    parsed = parse_llm_json(result.text, label="gap_analyser")
    if parsed is None:
        return None
    parsed["_cost_usd"] = result.cost_usd
    return parsed


# ---------------------------------------------------------------------------
# Storage
# ---------------------------------------------------------------------------

def _upsert_gap_report(
    site_key: str,
    our_page_url: str,
    primary_query: str,
    our_position: float,
    competitor_urls: list[str],
    our: dict,
    comps: list[dict],
    llm_gaps: dict | None,
    quant_structural_gaps: list[str],
    query_gaps: list[dict],
    priority_score: float,
) -> None:
    topic_gaps = (llm_gaps or {}).get("topic_gaps") or []
    structural_gaps_llm = (llm_gaps or {}).get("structural_gaps") or []
    eeat_gaps = (llm_gaps or {}).get("eeat_gaps") or []

    # Merge structural gaps: LLM + quantitative
    all_structural = list(dict.fromkeys(structural_gaps_llm + quant_structural_gaps))

    our_wc = our.get("word_count") or 0
    comp_wcs = [c.get("word_count") or 0 for c in comps if c.get("word_count")]
    avg_comp_wc = round(sum(comp_wcs) / len(comp_wcs)) if comp_wcs else 0

    our_sections = our.get("sections") or []
    if isinstance(our_sections, str):
        try:
            our_sections = json.loads(our_sections)
        except Exception:
            our_sections = []
    our_sec_count = len(our_sections) if isinstance(our_sections, list) else 0

    comp_sec_counts = []
    for c in comps:
        secs = c.get("sections") or []
        if isinstance(secs, str):
            try:
                secs = json.loads(secs)
            except Exception:
                secs = []
        comp_sec_counts.append(len(secs) if isinstance(secs, list) else 0)
    avg_comp_sec = round(sum(comp_sec_counts) / len(comp_sec_counts)) if comp_sec_counts else 0

    our_faqs = our.get("faqs") or []
    if isinstance(our_faqs, str):
        try:
            our_faqs = json.loads(our_faqs)
        except Exception:
            our_faqs = []
    our_faq_count = len(our_faqs) if isinstance(our_faqs, list) else 0

    comp_faq_counts = []
    for c in comps:
        faqs = c.get("faqs") or []
        if isinstance(faqs, str):
            try:
                faqs = json.loads(faqs)
            except Exception:
                faqs = []
        comp_faq_counts.append(len(faqs) if isinstance(faqs, list) else 0)
    avg_comp_faq = round(sum(comp_faq_counts) / len(comp_faq_counts)) if comp_faq_counts else 0

    _sql(f"""
        INSERT INTO competitor_gap_reports (
            site_key, our_page_url, primary_query, our_avg_position,
            competitor_urls, our_word_count, competitor_avg_word_count,
            our_section_count, competitor_avg_section_count,
            our_faq_count, competitor_avg_faq_count,
            topic_gaps, query_gaps, structural_gaps, eeat_gaps,
            priority_score, status
        )
        VALUES (
            {_esc(site_key)}, {_esc(our_page_url)}, {_esc(primary_query)},
            {_esc(our_position)},
            {_arr(competitor_urls)},
            {_esc(our_wc)}, {_esc(avg_comp_wc)},
            {_esc(our_sec_count)}, {_esc(avg_comp_sec)},
            {_esc(our_faq_count)}, {_esc(avg_comp_faq)},
            {_jsonb(topic_gaps)}, {_jsonb(query_gaps)},
            {_arr(all_structural)}, {_arr(eeat_gaps)},
            {_esc(priority_score)}, 'pending'
        )
        ON CONFLICT (site_key, our_page_url, primary_query) DO UPDATE SET
            our_avg_position            = EXCLUDED.our_avg_position,
            competitor_urls             = EXCLUDED.competitor_urls,
            our_word_count              = EXCLUDED.our_word_count,
            competitor_avg_word_count   = EXCLUDED.competitor_avg_word_count,
            our_section_count           = EXCLUDED.our_section_count,
            competitor_avg_section_count= EXCLUDED.competitor_avg_section_count,
            our_faq_count               = EXCLUDED.our_faq_count,
            competitor_avg_faq_count    = EXCLUDED.competitor_avg_faq_count,
            topic_gaps                  = EXCLUDED.topic_gaps,
            query_gaps                  = EXCLUDED.query_gaps,
            structural_gaps             = EXCLUDED.structural_gaps,
            eeat_gaps                   = EXCLUDED.eeat_gaps,
            priority_score              = EXCLUDED.priority_score,
            updated_at                  = NOW()
    """)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def run_gap_analysis(site_key: str, *, max_pages: int | None = None) -> dict:
    """Compute gap reports for all pages that have SERP data but no gap report."""
    pending = _get_pending_analyses(site_key)
    if max_pages:
        pending = pending[:max_pages]

    print(f"[gap_analyser] {site_key}: {len(pending)} pages need gap analysis")
    total_cost = 0.0
    processed = 0

    for item in pending:
        query = item["query"]
        our_url = item["our_page_url"]
        our_pos = float(item.get("our_position") or 50)
        serp_id = item["serp_id"]

        print(f"\n  analysing: {query[:60]} | {our_url[:50]}")

        our = _get_our_content_map(our_url, query)
        if not our:
            print(f"    no page_content_map row for our page — skipping")
            continue

        comps = _get_competitor_content_maps(serp_id)
        if not comps:
            print(f"    no parsed competitor pages — skipping")
            continue

        comp_urls = [c.get("page_url") or "" for c in comps]

        # Quantitative gaps
        structural_gaps = _compute_structural_gaps(our, comps)
        query_gaps = _compute_query_gaps(our, comps)

        # LLM content gap
        llm_gaps = _run_llm_gap_analysis(our, comps, query, our_pos)
        if llm_gaps:
            total_cost += llm_gaps.get("_cost_usd", 0)

        # Priority score
        topic_count = len((llm_gaps or {}).get("topic_gaps") or [])
        our_wc = our.get("word_count") or 0
        comp_avg_wc = sum(c.get("word_count") or 0 for c in comps) / len(comps) if comps else 0
        word_gap = max(0, comp_avg_wc - our_wc)
        score = _priority_score(our_pos, topic_count, int(word_gap), len(structural_gaps))

        try:
            _upsert_gap_report(
                site_key, our_url, query, our_pos, comp_urls,
                our, comps, llm_gaps, structural_gaps, query_gaps, score
            )
            print(f"    gap report saved: score={score}, topic_gaps={topic_count}, structural={len(structural_gaps)}")
        except Exception as exc:
            print(f"    DB error: {exc}")

        processed += 1

    print(f"\n[gap_analyser] done: {processed} reports. DeepSeek cost: ${total_cost:.4f}")
    return {"processed": processed, "deepseek_cost_usd": total_cost}
