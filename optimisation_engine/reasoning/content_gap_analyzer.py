"""
Checkpoint 5: SERP-grounded content gap analysis.

For an opportunity that targets an existing page (expand_page, near_miss,
or rewrite_title_meta with weak depth), this checkpoint:

  1. Pulls the top 3-5 organic UK SERP results for the primary query (Serper)
  2. Fetches each ranking page and extracts H1/H2/H3 + key terms
  3. Loads OUR page's H2 structure + body
  4. Asks DeepSeek to compare: what specific topics do competitors cover that
     we don't? Output a prioritised gap list.

Output schema:
{
  "competitors_analysed": [
    {"position": int, "domain": str, "url": str, "h2s": [str, ...]}
  ],
  "our_h2s": [str, ...],
  "topical_gaps": [
    {
      "topic": str,                  // 3-8 word description of the missing topic
      "competitor_coverage": [int],  // SERP positions of competitors who cover it
      "rationale": str,              // why this matters for the primary_query
      "priority": "high" | "medium" | "low",
      "suggested_section_heading": str,  // a suggested new H2 for our page
      "estimated_section_word_count": int
    },
    ...
  ],
  "competitive_depth_assessment": "our_page_underdeveloped" | "our_page_competitive" | "our_page_overdeveloped",
  "confidence": int
}

Cost: ~$0.005 per analysis (Serper $0.001 + 5x page fetches free + DeepSeek $0.004).
"""
from __future__ import annotations

import os
import re
import sys
from urllib.parse import urlparse

import httpx
from bs4 import BeautifulSoup

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from optimisation_engine.clients.serper_client import fetch_top_organic_urls  # noqa: E402
from optimisation_engine.config import get_site  # noqa: E402
from optimisation_engine.reasoning.action_specifier import _read_page  # noqa: E402
from optimisation_engine.reasoning.deepseek_runner import (  # noqa: E402
    ReasoningResult,
    must_be_in,
    no_em_dashes,
    require_keys,
    run_reasoning,
)

# Domains we skip when fetching competitor pages (we know they're not
# useful comparison targets, even if they rank).
SKIP_COMPETITOR_DOMAINS = {
    "youtube.com", "facebook.com", "twitter.com", "x.com",
    "reddit.com", "quora.com",
    "linkedin.com",
}

MAX_FETCH_BYTES = 200_000  # cap each competitor page download


def _fetch_html(url: str, *, timeout: float = 15.0) -> str | None:
    """Download a page; cap size; return text body. None on error."""
    try:
        with httpx.Client(timeout=timeout, follow_redirects=True) as client:
            r = client.get(url, headers={"User-Agent": "Mozilla/5.0 (compatible; AccountingResearchBot/1.0)"})
            if r.status_code >= 400:
                return None
            return r.text[:MAX_FETCH_BYTES]
    except Exception:
        return None


def _extract_headings_and_body(html: str) -> dict:
    """Parse the HTML and return {h1, h2s, h3s, word_count, body_excerpt}."""
    soup = BeautifulSoup(html, "html.parser")
    # Strip script/style/nav/footer
    for tag in soup(["script", "style", "nav", "footer", "header", "aside", "noscript"]):
        tag.decompose()

    h1 = (soup.find("h1").get_text(strip=True) if soup.find("h1") else "")
    h2s = [h.get_text(strip=True) for h in soup.find_all("h2")]
    h3s = [h.get_text(strip=True) for h in soup.find_all("h3")]

    # Body text approximation
    main = soup.find("main") or soup.find("article") or soup.body
    body_text = main.get_text(" ", strip=True) if main else soup.get_text(" ", strip=True)
    word_count = len(body_text.split())

    # First 2000 chars of body as excerpt
    excerpt = " ".join(body_text.split())[:2000]

    return {
        "h1": h1,
        "h2s": h2s[:25],  # cap
        "h3s": h3s[:30],
        "word_count": word_count,
        "body_excerpt": excerpt,
    }


def _analyse_competitor_page(serp_item: dict) -> dict | None:
    """Fetch + parse a single SERP competitor. Returns dict or None on skip/error."""
    domain = serp_item.get("domain") or ""
    if domain in SKIP_COMPETITOR_DOMAINS:
        return None
    url = serp_item.get("link")
    if not url:
        return None
    if url.lower().endswith(".pdf"):  # skip PDFs — can't extract HTML headings
        return None
    html = _fetch_html(url)
    if not html:
        return None
    extracted = _extract_headings_and_body(html)
    return {
        "position": serp_item.get("position"),
        "domain": domain,
        "url": url,
        "title": serp_item.get("title"),
        "h1": extracted["h1"],
        "h2s": extracted["h2s"],
        "h3s": extracted["h3s"][:10],
        "word_count": extracted["word_count"],
        "body_excerpt": extracted["body_excerpt"],
    }


def analyse_content_gap(
    *,
    site_key: str,
    target_slug: str,
    target_url: str,
    primary_query: str,
    target_query_cluster: list[str] | None = None,
    serp_n: int = 5,
) -> ReasoningResult:
    """Run the SERP-grounded content gap analysis for one opportunity."""

    # 1) Read OUR page
    our_page = _read_page(site_key, target_url, target_slug)
    if not our_page:
        return ReasoningResult(
            output={
                "competitors_analysed": [],
                "our_h2s": [],
                "topical_gaps": [],
                "competitive_depth_assessment": "our_page_underdeveloped",
                "confidence": 100,
                "notes": "Our page does not exist on filesystem — gap analysis assumes new_page.",
            },
            confidence=100,
            cost_usd=0.0,
            auto_applicable=True,
            raw_response="(no local page — short-circuit)",
        )

    # 2) Fetch top SERP results
    serp_results = fetch_top_organic_urls(primary_query, num=serp_n, site_key=site_key)
    if not serp_results:
        return ReasoningResult(
            output={
                "competitors_analysed": [],
                "our_h2s": our_page.get("h2_headings", []),
                "topical_gaps": [],
                "competitive_depth_assessment": "our_page_competitive",
                "confidence": 50,
                "notes": "No SERP results returned for primary_query.",
            },
            confidence=50,
            cost_usd=0.001,  # serper cost
            auto_applicable=False,
            raw_response="(serper returned no results)",
        )

    # 3) Analyse each competitor (skip ours if it appears)
    site = get_site(site_key)
    own_domain = (site.get("domain") or "").lower().lstrip("www.")
    competitor_analyses: list[dict] = []
    for serp_item in serp_results:
        if (serp_item.get("domain") or "").endswith(own_domain):
            continue
        analysis = _analyse_competitor_page(serp_item)
        if analysis:
            competitor_analyses.append(analysis)
        if len(competitor_analyses) >= 3:  # cap to top 3 actual competitors
            break

    if not competitor_analyses:
        return ReasoningResult(
            output={
                "competitors_analysed": [],
                "our_h2s": our_page.get("h2_headings", []),
                "topical_gaps": [],
                "competitive_depth_assessment": "our_page_competitive",
                "confidence": 40,
                "notes": "No competitor pages could be fetched/parsed.",
            },
            confidence=40,
            cost_usd=0.001 * len(serp_results),
            auto_applicable=False,
            raw_response="(no competitors parseable)",
        )

    # 4) Build prompt and call DeepSeek
    our_h2s = our_page.get("h2_headings") or []
    our_word_count = our_page.get("body_total_chars", 0) // 6  # rough

    comp_block = []
    for i, c in enumerate(competitor_analyses, 1):
        comp_block.append(
            f"--- COMPETITOR {i} (SERP pos {c['position']}, {c['domain']}, {c['word_count']} words) ---\n"
            f"H1: {c['h1']!r}\n"
            f"H2s ({len(c['h2s'])}):\n  " + "\n  ".join(f"{j+1}. {h}" for j, h in enumerate(c['h2s'])) + "\n"
            f"H3s (first 10): {c['h3s']}\n"
            f"Body excerpt: {c['body_excerpt'][:800]}\n"
        )
    comp_text = "\n".join(comp_block)

    user_input = f"""TARGET PAGE on {site['display_name']} ({site['domain']}):
  slug: {target_slug}
  title: {our_page.get('title')!r}
  metaTitle: {our_page.get('metaTitle')!r}
  H1: {our_page.get('h1')!r}
  Our H2 headings ({len(our_h2s)}): {our_h2s}
  Estimated word count: ~{our_word_count}

PRIMARY QUERY we want to win: {primary_query!r}

TOP SERP COMPETITORS (UK Google):

{comp_text}

For this query and our page vs these competitors, identify SPECIFIC topical
gaps: what topics or sub-questions do most/all competitors cover that we
don't? Be concrete — name the topic, not the heading. Skip generic gaps
like 'add more content'.
"""

    examples = [
        {
            "input": (
                "TARGET our H2s: ['Overview', 'Current Rates'] (~600 words)\n"
                "Query: 'uk cgt rates residential property 2026'\n"
                "COMP 1 H2s: ['Rates', 'Allowances', 'Reporting Deadline', 'Worked Example for Landlords']\n"
                "COMP 2 H2s: ['18% and 24% Rates', 'Annual Exempt Amount', '60-Day Reporting', 'Reliefs Available']"
            ),
            "output": {
                "competitors_analysed": [
                    {"position": 1, "domain": "rossmartin.co.uk", "url": "...", "h2s": ["..."]},
                ],
                "our_h2s": ["Overview", "Current Rates"],
                "topical_gaps": [
                    {
                        "topic": "Annual exempt amount for 2026/27",
                        "competitor_coverage": [1, 2],
                        "rationale": "Both top competitors dedicate a section to the £3,000 exemption; users typically search rates + exemption together.",
                        "priority": "high",
                        "suggested_section_heading": "Annual Exempt Amount for 2026/27 Property Disposals",
                        "estimated_section_word_count": 250,
                    },
                    {
                        "topic": "60-day reporting deadline",
                        "competitor_coverage": [1, 2],
                        "rationale": "Reporting timeline is a high-anxiety topic that users want addressed alongside rates.",
                        "priority": "high",
                        "suggested_section_heading": "When You Must Report: 60-Day CGT Reporting Rules",
                        "estimated_section_word_count": 300,
                    },
                    {
                        "topic": "Worked example for landlords",
                        "competitor_coverage": [1],
                        "rationale": "Concrete numerical example differentiates a guide from a rate-table; competitor 1 includes one.",
                        "priority": "medium",
                        "suggested_section_heading": "Worked Example: Calculating CGT on a Buy-to-Let Sale",
                        "estimated_section_word_count": 400,
                    },
                ],
                "competitive_depth_assessment": "our_page_underdeveloped",
                "confidence": 88,
            },
        }
    ]

    result = run_reasoning(
        endpoint_name="content_gap_analyzer",
        role=(
            "an SEO content auditor for a UK accounting firm. You compare a target page "
            "against the top 3 Google SERP competitors for a specific query and identify "
            "SPECIFIC topical gaps where competitors cover sub-topics our page does not."
        ),
        task=(
            "List the specific topical gaps. Each gap must reference at least one competitor "
            "by position. Prioritise gaps that appear across multiple competitors (priority='high'). "
            "Skip generic suggestions like 'add more content' — every gap must be a concrete topic."
        ),
        schema_description=(
            "{\n"
            '  "competitors_analysed": [ {position, domain, url, h2s[]} ],\n'
            '  "our_h2s": [str, ...],\n'
            '  "topical_gaps": [\n'
            '    {\n'
            '      "topic": string (3-8 word concrete topic),\n'
            '      "competitor_coverage": [int],   // SERP positions of covering competitors\n'
            '      "rationale": string,\n'
            '      "priority": "high"|"medium"|"low",\n'
            '      "suggested_section_heading": string,\n'
            '      "estimated_section_word_count": int\n'
            "    }\n"
            "  ],\n"
            '  "competitive_depth_assessment": "our_page_underdeveloped"|"our_page_competitive"|"our_page_overdeveloped",\n'
            '  "confidence": int 0-100\n'
            "}"
        ),
        must_not=[
            "use em-dashes or en-dashes",
            "list a gap that is not actually missing from our H2s (cross-check our_h2s before claiming a gap)",
            "list more than 6 gaps; surface the most impactful ones only",
            "claim a gap is high-priority unless at least 2 of 3 competitors cover it",
            "fabricate competitor coverage — only cite positions you saw in the input",
            "produce a topic longer than 8 words",
        ],
        examples=examples,
        validators=[
            require_keys("competitors_analysed", "our_h2s", "topical_gaps", "competitive_depth_assessment", "confidence"),
            must_be_in("competitive_depth_assessment", {"our_page_underdeveloped", "our_page_competitive", "our_page_overdeveloped"}),
            lambda o: (
                (True, None)
                if isinstance(o.get("topical_gaps"), list) and len(o["topical_gaps"]) <= 6
                else (False, "topical_gaps > 6 items")
            ),
            # Each gap must reference at least one competitor position from competitor_analyses
            lambda o: (
                (True, None)
                if all(
                    isinstance(g.get("competitor_coverage"), list)
                    and len(g["competitor_coverage"]) >= 1
                    and all(isinstance(p, int) for p in g["competitor_coverage"])
                    for g in (o.get("topical_gaps") or [])
                )
                else (False, "gap missing or invalid competitor_coverage list")
            ),
            # Priority must be valid
            lambda o: (
                (True, None)
                if all(
                    g.get("priority") in {"high", "medium", "low"}
                    for g in (o.get("topical_gaps") or [])
                )
                else (False, "invalid priority in gap")
            ),
        ],
        user_input=user_input,
        site_key=site_key,
        confidence_threshold=70,
        max_tokens=2500,
        temperature=0.3,
    )

    # Substitute the actual competitor data (model may have echoed example data)
    if isinstance(result.output, dict):
        result.output["competitors_analysed"] = [
            {"position": c["position"], "domain": c["domain"], "url": c["url"], "h2s": c["h2s"]}
            for c in competitor_analyses
        ]
        result.output["our_h2s"] = our_h2s

    return result


def main() -> None:
    import argparse
    import json

    parser = argparse.ArgumentParser()
    parser.add_argument("site_key")
    parser.add_argument("target_slug")
    parser.add_argument("primary_query")
    args = parser.parse_args()

    site = get_site(args.site_key)
    target_url = f"https://{site['domain']}/blog/{args.target_slug}"
    result = analyse_content_gap(
        site_key=args.site_key,
        target_slug=args.target_slug,
        target_url=target_url,
        primary_query=args.primary_query,
    )
    print(json.dumps(result.output, indent=2)[:4000])
    print(f"\nconfidence={result.confidence} cost=${result.cost_usd:.6f} notes={result.notes}")


if __name__ == "__main__":
    main()
