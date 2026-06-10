"""
Phase 0: Discovery run.

Fetches top competitor pages for a sample of queries and runs DeepSeek
analysis to surface what the best pages are actually doing — what sections
they cover, what queries they target, what trust signals they deploy.

This is a one-time calibration step run manually, not part of the weekly
pipeline. Run it first on property, review the output, then proceed with
the full extraction pipeline.

Usage:
    python -m optimisation_engine.competitor --site property --discover
    python -m optimisation_engine.competitor --site property --discover --n-queries 10
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
from optimisation_engine.competitor._fetch import fetch_url
from optimisation_engine.clients.ddg_serp_client import fetch_organic_results
from optimisation_engine.blog_generator.llm_providers import call_deepseek, LLMError


# ---------------------------------------------------------------------------
# Query sampling
# ---------------------------------------------------------------------------

def _sample_queries(site_key: str, n: int = 15) -> list[dict]:
    """Pick a diverse sample of queries spread across position ranges.

    Returns list of {query, avg_position, page_url, total_impressions}.
    Covers: low (1-15), mid (15-40), deep (40+) positions.
    """
    rows = _sql(f"""
        SELECT DISTINCT ON (page_url)
            page_url,
            query,
            ROUND(AVG(position)::NUMERIC, 1) AS avg_position,
            SUM(impressions) AS total_impressions
        FROM gsc_query_data
        WHERE site_key = {_esc(site_key)}
          AND date >= CURRENT_DATE - 28
        GROUP BY page_url, query
        HAVING SUM(impressions) > 5
        ORDER BY page_url, SUM(impressions) DESC
    """)

    # Split into position buckets
    near = [r for r in rows if float(r.get("avg_position") or 100) <= 15]
    mid = [r for r in rows if 15 < float(r.get("avg_position") or 100) <= 40]
    deep = [r for r in rows if float(r.get("avg_position") or 100) > 40]

    # Sort each bucket by total_impressions desc
    near.sort(key=lambda r: -int(r.get("total_impressions") or 0))
    mid.sort(key=lambda r: -int(r.get("total_impressions") or 0))
    deep.sort(key=lambda r: -int(r.get("total_impressions") or 0))

    # Proportional allocation: 40% near, 35% mid, 25% deep
    n_near = max(1, round(n * 0.4))
    n_mid = max(1, round(n * 0.35))
    n_deep = n - n_near - n_mid

    sample = (near[:n_near] + mid[:n_mid] + deep[:n_deep])[:n]
    print(f"[discovery] Sampled {len(sample)} queries: {n_near} near-page-1, {n_mid} mid, {n_deep} deep")
    return sample


# ---------------------------------------------------------------------------
# Page text extraction (minimal — just for DeepSeek input)
# ---------------------------------------------------------------------------

def _extract_page_text(html: str, max_chars: int = 12000) -> str:
    """Strip HTML tags and return readable page text for DeepSeek."""
    from bs4 import BeautifulSoup
    try:
        soup = BeautifulSoup(html, "lxml")
        for tag in soup(["script", "style", "nav", "footer", "header", "aside", "noscript"]):
            tag.decompose()
        text = soup.get_text(separator="\n", strip=True)
        # Collapse blank lines
        text = re.sub(r"\n{3,}", "\n\n", text)
        return text[:max_chars]
    except Exception:
        return html[:max_chars]


# ---------------------------------------------------------------------------
# DeepSeek discovery prompt
# ---------------------------------------------------------------------------

DISCOVERY_SYSTEM = """You are an expert SEO content analyst specialising in UK professional services and accountancy websites. You analyse competitor pages to identify exactly what makes them rank well in Google search results. You always respond with valid JSON."""

DISCOVERY_PROMPT_TEMPLATE = """You are analysing a web page that ranks in the top positions for the query: "{query}"

Read this page carefully and answer in structured JSON:

1. CONTENT STRUCTURE: List every major section/topic this page covers, in order.
   For each section: heading, what specific content it contains (actual figures, examples, legislation named), approximate word count, and whether it has: a worked example, a table, a list, FAQ content.

2. QUERY TARGETING: What search queries is this page clearly targeting? List ALL of them — not just "{query}" but every related query this page appears optimised for. Include long-tail variants, question-format queries, and adjacent topics.

3. COMPETITIVE ADVANTAGES: What does this page have that a basic article on the same topic would NOT have? Name specific things — actual credentials cited, specific figures quoted, tools/calculators, worked examples, named legislation.

4. TRUST SIGNALS: What does this page do to establish expertise and trust? Be specific — name actual credentials, HMRC citations, organisations referenced, author qualifications, last-updated dates.

5. OUTRANKING REQUIREMENTS: If you were writing a page to outrank this one, what would you need to include? What is the minimum viable improvement to beat it?

Return ONLY valid JSON with exactly these keys:
{{
  "sections": [
    {{
      "heading": "string",
      "topics": ["string"],
      "figures": ["string"],
      "word_count_est": number,
      "has_worked_example": boolean,
      "has_table": boolean,
      "has_list": boolean
    }}
  ],
  "queries_targeted": ["string"],
  "competitive_advantages": ["string"],
  "trust_signals": ["string"],
  "outranking_requirements": ["string"]
}}

PAGE TEXT:
{page_text}"""


def _call_discovery(query: str, page_text: str, url: str) -> dict | None:
    """Run DeepSeek discovery analysis on a single page. Returns parsed JSON or None."""
    if not page_text or len(page_text.split()) < 100:
        print(f"    [discovery] skipping {url[:60]} — too little text ({len(page_text.split())} words)")
        return None

    prompt = DISCOVERY_PROMPT_TEMPLATE.format(
        query=query,
        page_text=page_text,
    )

    try:
        result = call_deepseek(
            system_prompt=DISCOVERY_SYSTEM,
            user_prompt=prompt,
            model="deepseek-chat",
            max_tokens=4096,
            temperature=0.2,
            json_mode=True,
        )
    except LLMError as exc:
        print(f"    [discovery] DeepSeek error for {url[:60]}: {exc}")
        return None

    parsed = parse_llm_json(result.text, label=f"discovery:{url[:40]}")
    if parsed is None:
        return None
    parsed["_raw"] = result.text
    parsed["_cost_usd"] = result.cost_usd
    return parsed


# ---------------------------------------------------------------------------
# Storage
# ---------------------------------------------------------------------------

def _upsert_discovery(
    site_key: str,
    query: str,
    competitor_url: str,
    position: int,
    analysis: dict,
) -> None:
    raw_text = analysis.get("_raw") or ""
    sections = analysis.get("sections")
    queries_targeted = analysis.get("queries_targeted") or []
    competitive_advantages = analysis.get("competitive_advantages") or []
    trust_signals = analysis.get("trust_signals") or []
    outranking_requirements = analysis.get("outranking_requirements") or []

    _sql(f"""
        INSERT INTO competitor_discovery (
            site_key, query, competitor_url, competitor_position,
            sections_found, queries_targeted, competitive_advantages,
            trust_signals, outranking_requirements, raw_analysis
        )
        VALUES (
            {_esc(site_key)}, {_esc(query)}, {_esc(competitor_url)}, {_esc(position)},
            {_jsonb(sections)},
            {_arr(queries_targeted)},
            {_arr(competitive_advantages)},
            {_arr(trust_signals)},
            {_arr(outranking_requirements)},
            {_esc(raw_text[:10000])}
        )
        ON CONFLICT (site_key, query, competitor_url) DO UPDATE SET
            competitor_position     = EXCLUDED.competitor_position,
            sections_found          = EXCLUDED.sections_found,
            queries_targeted        = EXCLUDED.queries_targeted,
            competitive_advantages  = EXCLUDED.competitive_advantages,
            trust_signals           = EXCLUDED.trust_signals,
            outranking_requirements = EXCLUDED.outranking_requirements,
            raw_analysis            = EXCLUDED.raw_analysis,
            analysed_at             = NOW()
    """)


# ---------------------------------------------------------------------------
# Main discovery run
# ---------------------------------------------------------------------------

def run_discovery(
    site_key: str,
    *,
    n_queries: int = 15,
    n_competitors: int = 3,
    verbose: bool = True,
) -> list[dict]:
    """
    Run Phase 0 discovery on a site.

    Steps:
      1. Sample n_queries diverse queries from gsc_query_data
      2. Fetch top n_competitors Serper results for each
      3. Fetch HTML of each competitor page
      4. Send to DeepSeek for structured analysis
      5. Store in competitor_discovery

    Returns aggregated findings across all queries.
    """
    print(f"\n{'='*70}")
    print(f"[discovery] Phase 0 run: site={site_key} queries={n_queries} competitors={n_competitors}")
    print(f"{'='*70}")

    sample = _sample_queries(site_key, n=n_queries)
    if not sample:
        print("[discovery] No queries found — has GSC data been ingested?")
        return []

    total_cost = 0.0
    results: list[dict] = []

    for i, page_row in enumerate(sample, 1):
        query = page_row["query"]
        our_url = page_row["page_url"]
        our_pos = page_row.get("avg_position") or "?"
        print(f"\n[{i}/{len(sample)}] query={query!r} our_pos={our_pos}")

        # Fetch Serper SERP
        try:
            serp = fetch_organic_results(query, num=n_competitors + 2, site_key=site_key)
        except Exception as exc:
            print(f"  CSE error: {exc}")
            continue

        if not serp:
            print(f"  Serper: no results (idempotency hit?)")
            continue

        # Filter out our own domain
        our_domain = _domain_of(our_url)
        competitors = [r for r in serp if our_domain not in (r.get("domain") or "")][:n_competitors]
        print(f"  Top {len(competitors)} competitors: {[r['domain'] for r in competitors]}")

        query_results: list[dict] = []

        for comp in competitors:
            comp_url = comp.get("link") or ""
            comp_pos = comp.get("position") or 0
            comp_domain = comp.get("domain") or ""
            if not comp_url:
                continue

            print(f"  #{comp_pos} {comp_domain} — fetching...")
            http_status, html = fetch_url(comp_url)

            if http_status == -1:
                print(f"    blocked by robots.txt")
                continue
            if http_status <= 0 or http_status >= 400:
                print(f"    fetch error: {html[:80]}")
                continue

            page_text = _extract_page_text(html)
            word_count = len(page_text.split())

            # Content relevance check — skip pages whose text doesn't relate to the query
            query_tokens = [w for w in query.lower().split() if len(w) > 3]
            text_lower = page_text.lower()
            token_hits = sum(1 for t in query_tokens if t in text_lower)
            if query_tokens and token_hits < max(2, round(len(query_tokens) * 0.3)):
                print(f"    skipping {comp_url[:60]} — content not relevant to query ({token_hits}/{len(query_tokens)} tokens matched)")
                continue

            print(f"    {word_count} words extracted — running DeepSeek analysis...")

            analysis = _call_discovery(query, page_text, comp_url)
            if analysis:
                cost = analysis.get("_cost_usd", 0)
                total_cost += cost
                print(f"    analysis done (${cost:.4f}) — "
                      f"{len(analysis.get('queries_targeted') or [])} queries targeted, "
                      f"{len(analysis.get('competitive_advantages') or [])} advantages")

                try:
                    _upsert_discovery(site_key, query, comp_url, comp_pos, analysis)
                except Exception as exc:
                    print(f"    DB upsert error: {exc}")

                query_results.append({
                    "url": comp_url,
                    "position": comp_pos,
                    "domain": comp_domain,
                    "queries_targeted": analysis.get("queries_targeted") or [],
                    "competitive_advantages": analysis.get("competitive_advantages") or [],
                    "trust_signals": analysis.get("trust_signals") or [],
                    "outranking_requirements": analysis.get("outranking_requirements") or [],
                    "section_count": len(analysis.get("sections") or []),
                })

        results.append({
            "query": query,
            "our_position": our_pos,
            "our_url": our_url,
            "competitors": query_results,
        })

    print(f"\n{'='*70}")
    print(f"[discovery] Complete. Analysed {len(results)} queries. Total DeepSeek cost: ${total_cost:.4f}")
    print(f"{'='*70}")

    # Print aggregated patterns
    if results and verbose:
        _print_aggregated_patterns(results)

    return results


def _print_aggregated_patterns(results: list[dict]) -> None:
    """Print a readable summary of what the top pages are doing."""
    all_queries: list[str] = []
    all_advantages: list[str] = []
    all_trust: list[str] = []
    all_requirements: list[str] = []

    for r in results:
        for comp in r.get("competitors") or []:
            all_queries.extend(comp.get("queries_targeted") or [])
            all_advantages.extend(comp.get("competitive_advantages") or [])
            all_trust.extend(comp.get("trust_signals") or [])
            all_requirements.extend(comp.get("outranking_requirements") or [])

    def _top_n(items: list[str], n: int = 10) -> list[tuple[str, int]]:
        from collections import Counter
        return Counter(items).most_common(n)

    print("\n=== AGGREGATED DISCOVERY PATTERNS ===")
    print("\nTop queries competitors are targeting:")
    for item, count in _top_n(all_queries):
        print(f"  ({count}x) {item}")

    print("\nMost common competitive advantages:")
    for item, count in _top_n(all_advantages):
        print(f"  ({count}x) {item}")

    print("\nMost common trust signals:")
    for item, count in _top_n(all_trust):
        print(f"  ({count}x) {item}")

    print("\nOutranking requirements (what we need to add):")
    for item, count in _top_n(all_requirements):
        print(f"  ({count}x) {item}")


def _domain_of(url: str) -> str:
    if not url:
        return ""
    from urllib.parse import urlparse
    netloc = urlparse(url).netloc.lower()
    return netloc.lstrip("www.").split(":")[0]
