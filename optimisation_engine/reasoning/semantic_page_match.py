"""
Checkpoint 1: Semantic page-match.

Given a keyword the detector wants to make a 'new_page' opportunity for,
ask DeepSeek to check whether any existing page on the site already covers
the topic. Slug-based regex check would miss synonyms like 'AIA' vs
'annual investment allowance'; semantic match catches them.

Output schema:
{
  "match_found": bool,
  "matching_slug": str | null,        // best match if any
  "match_strength": "exact" | "strong_synonym" | "partial" | "none",
  "matching_metaTitle": str | null,
  "recommended_action": "skip_new_page_use_existing" | "expand_existing" | "build_new",
  "confidence": int                   // 0-100
}

If a match is found, the original 'new_page' opportunity should be DROPPED
and replaced with a 'title_meta_rewrite' or 'expand_page' opportunity on
the existing slug.
"""
from __future__ import annotations

import os
import re
from pathlib import Path

from optimisation_engine.config import get_site
from optimisation_engine.reasoning.deepseek_runner import (
    ReasoningResult,
    must_be_in,
    require_keys,
    run_reasoning,
)

ROOT = Path(__file__).resolve().parents[2]


def _read_site_pages(site_key: str, *, max_chars_per_page: int = 0) -> list[dict]:
    """Return a list of {slug, title, metaTitle, h1, category} for every blog page.

    We deliberately don't include the page body here — keeping the prompt
    small. The slug + title + metaTitle + h1 is enough for semantic match.
    """
    site = get_site(site_key)
    content_dir = ROOT / site["content_dir"]
    if not content_dir.exists():
        return []

    pages: list[dict] = []
    for md_path in content_dir.glob("*.md"):
        try:
            txt = md_path.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue
        if not txt.startswith("---"):
            continue
        # Extract frontmatter (between first two '---')
        m = re.search(r"^---\s*\n(.+?)\n---\s*", txt, flags=re.DOTALL)
        if not m:
            continue
        fm = m.group(1)

        def _field(name: str) -> str | None:
            mm = re.search(rf"^{re.escape(name)}:\s*(.+?)\s*$", fm, flags=re.MULTILINE)
            if not mm:
                return None
            val = mm.group(1).strip().strip("\"'")
            return val if val else None

        pages.append(
            {
                "slug": md_path.stem,
                "title": _field("title"),
                "metaTitle": _field("metaTitle"),
                "h1": _field("h1"),
                "category": _field("category"),
            }
        )
    return pages


def check_keyword_against_site(
    *,
    site_key: str,
    keyword: str,
    pages_cache: list[dict] | None = None,
) -> ReasoningResult:
    """Ask DeepSeek if any existing page on site covers this keyword.

    Args:
        site_key: e.g. 'agency'
        keyword: e.g. 'annual investment allowance'
        pages_cache: optional pre-loaded list (saves rereading filesystem in batch).

    Returns:
        ReasoningResult with semantic-match output.
    """
    pages = pages_cache if pages_cache is not None else _read_site_pages(site_key)
    if not pages:
        # No pages = definitively a new_page candidate
        return ReasoningResult(
            output={
                "match_found": False,
                "matching_slug": None,
                "match_strength": "none",
                "matching_metaTitle": None,
                "recommended_action": "build_new",
                "confidence": 100,
            },
            confidence=100,
            cost_usd=0.0,
            auto_applicable=True,
            raw_response="(no pages to check — local short-circuit)",
        )

    # Compact pages payload — slug + titles only
    page_blob = "\n".join(
        f"- slug={p['slug']!r} title={p.get('title')!r} metaTitle={p.get('metaTitle')!r} h1={p.get('h1')!r} category={p.get('category')!r}"
        for p in pages
    )

    site = get_site(site_key)

    user_input = f"""SITE: {site['display_name']} ({site['domain']})
Site focus: {site.get('target_buyer_persona') or 'UK accounting services'}

KEYWORD UNDER REVIEW: {keyword!r}

EXISTING BLOG PAGES ON THIS SITE ({len(pages)} total):
{page_blob}

Does any existing page already target this keyword (exactly or as a strong synonym)?
"""

    examples = [
        {
            "input": "KEYWORD: 'annual investment allowance'\nEXISTING: slug='annual-investment-allowance-agency-equipment-2025-26' title='How to Use the Annual Investment Allowance for Agency Equipment Purchases in 2025/26'",
            "output": {
                "match_found": True,
                "matching_slug": "annual-investment-allowance-agency-equipment-2025-26",
                "match_strength": "strong_synonym",
                "matching_metaTitle": "AIA for Agency Equipment: 2025/26 Guide",
                "recommended_action": "expand_existing",
                "confidence": 92,
            },
        },
        {
            "input": "KEYWORD: 'sole trader vat threshold'\nEXISTING: slug='cgt-rates-property-2026' title='What Are the CGT Rates for Property in 2026/27?' (no VAT-related pages on the site)",
            "output": {
                "match_found": False,
                "matching_slug": None,
                "match_strength": "none",
                "matching_metaTitle": None,
                "recommended_action": "build_new",
                "confidence": 95,
            },
        },
        {
            "input": "KEYWORD: 'property cgt deadlines'\nEXISTING: slug='cgt-payment-deadlines-property-sales-2026' title='CGT Payment Deadlines for Property Sales 2026: What Landlords Need to Know'",
            "output": {
                "match_found": True,
                "matching_slug": "cgt-payment-deadlines-property-sales-2026",
                "match_strength": "exact",
                "matching_metaTitle": "HMRC CGT Reporting Deadlines 2026: 60-Day Property Rule",
                "recommended_action": "skip_new_page_use_existing",
                "confidence": 98,
            },
        },
    ]

    return run_reasoning(
        endpoint_name="semantic_page_match",
        role=(
            "an SEO content analyst for a UK accounting firm. You compare a single keyword "
            "against a list of existing blog page titles/slugs and decide whether any page "
            "is already targeting the keyword or a strong synonym."
        ),
        task=(
            "Decide whether any existing blog page on this site already targets the keyword. "
            "Strong synonyms count (e.g. 'AIA' ≈ 'annual investment allowance', "
            "'Section 24' ≈ 'mortgage interest relief restriction'). Acronym matches count. "
            "But topical adjacency without targeting does NOT count — e.g. a 'CGT rates' page "
            "does not target 'CGT deadlines'."
        ),
        schema_description=(
            "{\n"
            '  "match_found": boolean,                       // true if any existing page targets this keyword\n'
            '  "matching_slug": string|null,                 // exact slug from the input list, or null\n'
            '  "match_strength": "exact"|"strong_synonym"|"partial"|"none",\n'
            '  "matching_metaTitle": string|null,            // the metaTitle of the matched page, or null\n'
            '  "recommended_action": "skip_new_page_use_existing"|"expand_existing"|"build_new",\n'
            '  "confidence": integer 0-100                    // how sure you are\n'
            "}"
        ),
        must_not=[
            "invent a slug that is not in the input list",
            "claim a match when only the topic is loosely related (e.g. CGT rates is NOT a match for 'CGT deadlines')",
            "return prose outside the JSON",
            "use confidence > 85 unless the match is exact or a textbook acronym/synonym",
        ],
        examples=examples,
        validators=[
            require_keys("match_found", "matching_slug", "match_strength", "recommended_action", "confidence"),
            must_be_in("match_strength", {"exact", "strong_synonym", "partial", "none"}),
            must_be_in("recommended_action", {"skip_new_page_use_existing", "expand_existing", "build_new"}),
            # If match_found is True, matching_slug must not be null and must be in the input list
            lambda o: (
                (True, None)
                if not o.get("match_found")
                else (
                    (False, "match_found=true but matching_slug is null")
                    if not o.get("matching_slug")
                    else (
                        (True, None)
                        if any(p["slug"] == o["matching_slug"] for p in pages)
                        else (False, f"matching_slug {o['matching_slug']!r} is not in the input page list (hallucination)")
                    )
                )
            ),
        ],
        user_input=user_input,
        site_key=site_key,
        confidence_threshold=80,
    )


def main() -> None:
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("site_key")
    parser.add_argument("keyword")
    args = parser.parse_args()

    result = check_keyword_against_site(site_key=args.site_key, keyword=args.keyword)
    import json
    print(json.dumps(result.output, indent=2))
    print(f"\nconfidence={result.confidence} auto_applicable={result.auto_applicable}")
    print(f"cost=${result.cost_usd:.6f} (in={result.input_tokens} out={result.output_tokens} tokens)")
    if result.notes:
        print(f"notes: {result.notes}")


if __name__ == "__main__":
    main()
