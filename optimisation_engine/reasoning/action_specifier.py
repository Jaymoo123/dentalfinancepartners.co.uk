"""
Checkpoint 4: Action Specifier.

Given a proposed opportunity (target_url + primary_query + cluster + supporting
GSC/DataForSEO data), reads the target page's actual body and decides:

  - action_kind: in_text_embedding | new_section | faq_addition | new_page |
                 meta_only | schema_only | internal_links_only | skip
  - patch: concrete content change (sections, embedding locations, FAQ entries, etc.)
  - backlinking implications: which sibling pages should link IN to this change

Reads the target file from disk (frontmatter + markdown body) so the decision
is grounded in actual content, not just a slug.

Output schema:
{
  "action_kind": "in_text_embedding"|"new_section"|"faq_addition"|"new_page"
                |"meta_only"|"schema_only"|"internal_links_only"|"skip",
  "rationale": str,
  "patch": {
     // shape depends on action_kind — see schema_description below
  },
  "backlinking": [
    {"from_slug": str, "anchor": str, "insertion_hint": str}
  ],
  "estimated_word_count": int,
  "confidence": int
}
"""
from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.config import get_site
from optimisation_engine.reasoning.deepseek_runner import (
    ReasoningResult,
    must_be_in,
    no_em_dashes,
    require_keys,
    run_reasoning,
)

VALID_ACTION_KINDS = {
    "in_text_embedding", "new_section", "faq_addition", "new_page",
    "meta_only", "schema_only", "internal_links_only", "skip",
}

MAX_BODY_CHARS = 18000  # cap to keep prompts manageable


def _read_page(site_key: str, target_url: str | None, target_slug: str | None) -> dict | None:
    """Locate the markdown file by slug or by URL's final path segment."""
    site = get_site(site_key)
    content_dir = ROOT / site["content_dir"]
    if not content_dir.exists():
        return None

    slug = target_slug
    if not slug and target_url:
        # Derive slug from URL: last non-empty path segment
        parts = [p for p in target_url.rstrip("/").split("/") if p]
        slug = parts[-1] if parts else None
    if not slug:
        return None

    candidate = content_dir / f"{slug}.md"
    if not candidate.exists():
        # Try with any prefix/suffix variant
        matches = list(content_dir.glob(f"*{slug}*.md"))
        if not matches:
            return None
        candidate = matches[0]

    txt = candidate.read_text(encoding="utf-8", errors="ignore")
    # Split frontmatter and body
    m = re.match(r"^---\s*\n(.+?)\n---\s*\n(.*)$", txt, flags=re.DOTALL)
    if m:
        fm_raw = m.group(1)
        body = m.group(2)
    else:
        fm_raw = ""
        body = txt

    def fm_field(name: str) -> str | None:
        mm = re.search(rf"^{re.escape(name)}:\s*(.+?)\s*$", fm_raw, flags=re.MULTILINE)
        if not mm:
            return None
        return mm.group(1).strip().strip("\"'")

    # Extract H2 structure for the prompt
    h2s = re.findall(r"<h2[^>]*>([^<]+)</h2>", body, flags=re.IGNORECASE)
    if not h2s:
        h2s = re.findall(r"^## (.+?)$", body, flags=re.MULTILINE)

    return {
        "slug": candidate.stem,
        "path": str(candidate.relative_to(ROOT)),
        "title": fm_field("title"),
        "metaTitle": fm_field("metaTitle"),
        "metaDescription": fm_field("metaDescription"),
        "h1": fm_field("h1"),
        "category": fm_field("category"),
        "body": body[:MAX_BODY_CHARS],
        "body_truncated": len(body) > MAX_BODY_CHARS,
        "body_total_chars": len(body),
        "h2_headings": h2s,
        "has_faqs": bool(re.search(r"^faqs:\s*\[\s*\]\s*$", fm_raw, flags=re.MULTILINE) is None and "faqs:" in fm_raw),
    }


def _related_pages_for_site(site_key: str, *, limit: int = 30) -> list[dict]:
    """List of {slug, title, category, h1} for sibling pages (used for backlinking suggestions)."""
    site = get_site(site_key)
    content_dir = ROOT / site["content_dir"]
    if not content_dir.exists():
        return []
    out = []
    for md_path in sorted(content_dir.glob("*.md"))[:limit]:
        txt = md_path.read_text(encoding="utf-8", errors="ignore")
        m = re.match(r"^---\s*\n(.+?)\n---\s*\n", txt, flags=re.DOTALL)
        if not m:
            continue
        fm = m.group(1)

        def f(n):
            mm = re.search(rf"^{re.escape(n)}:\s*(.+?)\s*$", fm, flags=re.MULTILINE)
            return mm.group(1).strip().strip("\"'") if mm else None
        out.append({"slug": md_path.stem, "title": f("title"), "category": f("category"), "h1": f("h1")})
    return out


def specify_action(opportunity: dict) -> ReasoningResult:
    """Decide what to do for a single opportunity.

    opportunity should have these keys (matches optimisation_opportunities row):
      site_key, opportunity_type, target_url, primary_query, target_query_cluster,
      recommended_action (from detector), rationale, supporting_data
    """
    site_key = opportunity["site_key"]
    site = get_site(site_key)
    target_url = opportunity.get("target_url")
    primary_q = opportunity.get("primary_query") or ""
    cluster = opportunity.get("target_query_cluster") or [primary_q]
    sd = opportunity.get("supporting_data") or {}

    # Load the page if there is one
    page = _read_page(site_key, target_url, opportunity.get("target_slug"))

    # Related-pages context for backlinking
    related = _related_pages_for_site(site_key, limit=25)
    rel_block = "\n".join(
        f"- slug={p['slug']!r} title={p.get('title')!r} category={p.get('category')!r}"
        for p in related[:20]
    )

    # Construct user input
    if page:
        page_block = (
            f"TARGET PAGE EXISTS:\n"
            f"  slug:            {page['slug']}\n"
            f"  path:            {page['path']}\n"
            f"  title:           {page['title']!r}\n"
            f"  metaTitle:       {page['metaTitle']!r}\n"
            f"  metaDescription: {page['metaDescription']!r}\n"
            f"  h1:              {page['h1']!r}\n"
            f"  category:        {page['category']!r}\n"
            f"  H2 headings present: {page['h2_headings']}\n"
            f"  total body chars: {page['body_total_chars']} "
            f"{'(TRUNCATED)' if page['body_truncated'] else ''}\n\n"
            f"BODY (truncated to {MAX_BODY_CHARS} chars):\n{page['body']}\n"
        )
    else:
        page_block = (
            f"TARGET PAGE: does not exist (or could not be located by slug/url). "
            f"This is likely a new_page candidate.\n"
        )

    user_input = f"""SITE: {site['display_name']} ({site['domain']})
Audience: {site.get('target_buyer_persona') or 'UK accounting clients'}

OPPORTUNITY:
  detector type:   {opportunity['opportunity_type']}
  primary query:   {primary_q!r}
  cluster:         {cluster[:8]}
  recommended:     {opportunity.get('recommended_action')!r}
  rationale:       {opportunity.get('rationale')!r}
  supporting GSC/DFS data: {json.dumps(sd, default=str)[:1200]}

{page_block}

OTHER PAGES ON THIS SITE (for backlinking decisions, up to 20):
{rel_block}

Decide the SPECIFIC action to take and produce a structured patch plan.
"""

    examples = [
        {
            "input": (
                "Page exists at slug 'annual-investment-allowance-agency-equipment-2025-26' "
                "with title 'How to Use the Annual Investment Allowance for Agency Equipment Purchases in 2025/26' "
                "but metaTitle is 'AIA for Agency Equipment: 2025/26 Guide'. "
                "New keyword: 'annual investment allowance' (vol 1900, KD 7). "
                "Page ranks but doesn't lead with the exact term."
            ),
            "output": {
                "action_kind": "in_text_embedding",
                "rationale": "Page exists and is on-topic. metaTitle front-loads 'AIA' but not the full 'annual investment allowance' term. Embedding the variants into intro paragraph + early H2 will signal both intent without changing structure.",
                "patch": {
                    "in_text_embedding": {
                        "weave_into_intro_paragraph": [
                            "annual investment allowance",
                            "annual investment allowance for agency equipment",
                        ],
                        "weave_into_h2_headings": [
                            "What is the Annual Investment Allowance (AIA)?"
                        ],
                        "do_not_keyword_stuff": True,
                    },
                    "meta_changes": {
                        "metaTitle": "Annual Investment Allowance for Agency Equipment 2025/26",
                        "metaDescription": "The Annual Investment Allowance lets UK agencies claim 100% tax relief on equipment up to £1m. See what qualifies and how to claim.",
                    }
                },
                "backlinking": [
                    {"from_slug": "capital-allowances-office-fit-out-agency", "anchor": "annual investment allowance", "insertion_hint": "Where the page discusses claiming relief on equipment."}
                ],
                "estimated_word_count": 50,
                "confidence": 85
            },
        },
        {
            "input": (
                "Page exists at slug 'cgt-payment-deadlines-property-sales-2026' "
                "with metaTitle 'HMRC CGT Reporting Deadlines 2026: 60-Day Property Rule'. "
                "Page ranks position 11 for 'hmrc cgt reporting deadlines 2026' but body has no worked example of penalties or scheduling. "
                "Detector type: expand_page."
            ),
            "output": {
                "action_kind": "new_section",
                "rationale": "Page covers the rule but lacks the worked-example depth competitors offer. Adding a new H2 with a specific 60-day timeline example targets the position 11 ranking with content depth.",
                "patch": {
                    "new_section": {
                        "insertion_point": "after_h2_What_Are_the_Reporting_Deadlines",
                        "new_h2_heading": "Worked Example: 60-Day CGT Reporting Timeline",
                        "new_body_outline": [
                            "Day 0: completion of sale",
                            "Day 7: gather completion statement + costs",
                            "Day 30: submit draft CGT return for review",
                            "Day 50: file and pay via HMRC Capital Gains Tax Service",
                            "Day 60: HARD DEADLINE — £100 fixed penalty + 6-month interest if missed",
                        ],
                        "target_word_count": 400,
                    }
                },
                "backlinking": [
                    {"from_slug": "cgt-rates-property-2026-27-current-rates-explained", "anchor": "60-day CGT reporting deadline", "insertion_hint": "Anywhere the rates page mentions filing."}
                ],
                "estimated_word_count": 400,
                "confidence": 80
            },
        },
        {
            "input": (
                "No matching page on the site. New keyword 'specialist dental accountants london' (vol 320, KD 12). "
                "Dentists site has home page and several blog posts but no dedicated /specialist-dental-accountants-london page."
            ),
            "output": {
                "action_kind": "new_page",
                "rationale": "Distinct enough commercial intent (specialist + dental + location) to warrant its own service page. Should be a transactional landing page, not a blog post.",
                "patch": {
                    "new_page": {
                        "proposed_slug": "specialist-dental-accountants-london",
                        "page_type": "service_landing",
                        "primary_h1": "Specialist Dental Accountants in London",
                        "section_outline": [
                            "Why specialist dental accounting matters",
                            "Services for London-based dental practices",
                            "NHS contract accounting in London practices",
                            "Practice acquisition support",
                            "Client testimonials (anonymised)",
                            "Book a free consultation",
                        ],
                        "schema_to_include": ["LocalBusiness", "Service", "BreadcrumbList", "FAQPage"],
                        "target_word_count": 1800,
                    }
                },
                "backlinking": [
                    {"from_slug": "associate-dentist-tax-self-assessment-uk", "anchor": "specialist dental accountants in London", "insertion_hint": "When the page mentions getting professional advice."}
                ],
                "estimated_word_count": 1800,
                "confidence": 75
            },
        }
    ]

    return run_reasoning(
        endpoint_name="action_specifier",
        role=(
            "a senior SEO content strategist for a UK accounting firm. You decide the "
            "SPECIFIC change to make for an opportunity by reading the page body, the "
            "GSC/DataForSEO signals, and the surrounding site structure. Your output "
            "is a structured patch plan that a developer or content editor can apply."
        ),
        task=(
            "Decide the action_kind and produce a patch plan. Use 'skip' only if "
            "the opportunity is genuinely not worth pursuing on this page (cite why). "
            "Prefer the LEAST invasive change that fits the signal — meta_only > "
            "in_text_embedding > faq_addition > new_section > new_page."
        ),
        schema_description=(
            "{\n"
            '  "action_kind": one of "in_text_embedding"|"new_section"|"faq_addition"|"new_page"|"meta_only"|"schema_only"|"internal_links_only"|"skip",\n'
            '  "rationale": string (1-2 sentences),\n'
            '  "patch": {\n'
            "    // shape depends on action_kind:\n"
            "    // in_text_embedding: { weave_into_intro_paragraph: [str], weave_into_h2_headings: [str], do_not_keyword_stuff: true, meta_changes?: {metaTitle, metaDescription} }\n"
            "    // new_section: { insertion_point: str, new_h2_heading: str, new_body_outline: [str], target_word_count: int }\n"
            "    // faq_addition: { faq_entries: [{question: str, answer: str}] }\n"
            "    // new_page: { proposed_slug, page_type, primary_h1, section_outline: [str], schema_to_include: [str], target_word_count: int }\n"
            "    // meta_only: { metaTitle: str (<=60 chars), metaDescription: str (140-155 chars) }\n"
            "    // schema_only: { schema_type: str, why: str, suggested_fields: object }\n"
            "    // internal_links_only: {} (the backlinking[] array IS the content)\n"
            "    // skip: { reason: str }\n"
            "  },\n"
            '  "backlinking": [\n'
            '    {"from_slug": str (must be in OTHER PAGES list), "anchor": str (descriptive, contains query token), "insertion_hint": str},\n'
            "    ...\n"
            "  ],\n"
            '  "estimated_word_count": int (estimated NEW content words; 0 for meta_only/schema_only/skip),\n'
            '  "confidence": int 0-100\n'
            "}"
        ),
        must_not=[
            "use em-dashes or en-dashes in any output text (use commas, parentheses, or full stops)",
            "include from_slug values not in the OTHER PAGES list",
            "produce metaTitle > 60 chars",
            "produce metaDescription outside 140-155 chars",
            "produce more than 3 backlinking entries",
            "produce hype words ('amazing', 'ultimate', 'best', 'discover', 'unlock')",
            "invent facts; ground every claim in the input data or general UK tax knowledge",
            "produce a patch that requires changing more than one section unless action_kind is new_page",
        ],
        examples=examples,
        validators=[
            require_keys("action_kind", "rationale", "patch", "backlinking", "confidence"),
            must_be_in("action_kind", VALID_ACTION_KINDS),
            no_em_dashes("rationale"),
            lambda o: (True, None) if isinstance(o.get("backlinking"), list) and len(o["backlinking"]) <= 3 else (False, "backlinking > 3 entries"),
            lambda o: (
                (True, None)
                if (
                    o.get("action_kind") != "meta_only"
                    or (
                        isinstance(o.get("patch"), dict)
                        and isinstance(o["patch"].get("metaTitle"), str)
                        and len(o["patch"]["metaTitle"]) <= 60
                        and isinstance(o["patch"].get("metaDescription"), str)
                        and 140 <= len(o["patch"]["metaDescription"]) <= 160
                    )
                )
                else (False, "meta_only patch fails char-limit validation")
            ),
        ],
        user_input=user_input,
        site_key=site_key,
        confidence_threshold=70,
        max_tokens=3000,
        temperature=0.3,
    )


def main() -> None:
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("opportunity_id", help="UUID of a row in optimisation_opportunities")
    args = parser.parse_args()

    import httpx
    from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL
    h = {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}
    r = httpx.get(
        f"{SUPABASE_URL}/rest/v1/optimisation_opportunities",
        headers=h,
        params={"select": "*", "id": f"eq.{args.opportunity_id}"},
        timeout=15.0,
    )
    rows = r.json()
    if not rows:
        print(f"No opportunity with id {args.opportunity_id}")
        return
    opp = rows[0]
    print(f"Specifying action for: site={opp['site_key']} type={opp['opportunity_type']} q={opp.get('primary_query')!r}")
    result = specify_action(opp)
    print(json.dumps(result.output, indent=2)[:3000])
    print(f"\nconfidence={result.confidence} auto_applicable={result.auto_applicable}")
    print(f"cost=${result.cost_usd:.6f}")
    if result.notes:
        print(f"notes: {result.notes}")


if __name__ == "__main__":
    main()
