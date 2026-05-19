"""
Shared DeepSeek content writer for LLM-driven apply modules.

Used by new_section, in_text_embedding, and new_page. Each apply module
has its own role + prompt + validators; this module provides the strict
reasoning runner adapter.

Brand-voice rules apply to all content writes:
  - No em-dashes / en-dashes (commas, parentheses, full stops, middle dots)
  - No hype words (ultimate, amazing, discover, unlock, leverage, etc.)
  - UK English spellings (organisation not organization, optimise not optimize)
  - ICAEW professional tone — not casual, not patronising
  - Lead-gen sites are HANDOFFS to partner firms — no client names, no pricing
"""
from __future__ import annotations

from optimisation_engine.apply.fact_checker import fact_check_validator
from optimisation_engine.config import get_site
from optimisation_engine.reasoning.deepseek_runner import ReasoningResult, no_em_dashes, run_reasoning


BRAND_VOICE_RULES = """
BRAND VOICE RULES (must be followed in EVERY generated paragraph/heading/FAQ):
  - NO em-dashes (—) or en-dashes (–). Use commas, parentheses, full stops.
  - NO hype words: 'ultimate', 'amazing', 'discover', 'unlock', 'leverage',
    'deep dive', 'game-changer', 'supercharge', 'comprehensive guide'.
  - NO patronising openers like 'In this article we will explore...'
  - UK English: organisation, optimise, specialise, programme, behaviour,
    licence (noun), license (verb), enquiries, whilst, amongst.
  - Professional ICAEW-aligned tone: direct, accurate, no hedging cliches.
  - These are LEAD-GEN sites. Never use client names, real testimonials,
    pricing, or company-specific anecdotes. Generic professional voice only.
  - Use specific UK figures where appropriate (rates, thresholds, £-amounts
    for current and recent tax years). If not 100% confident, say 'current
    rates' rather than fabricate a number.
"""


def get_site_voice_block(site_key: str) -> str:
    """Per-site additional voice notes (memory-derived)."""
    site_specific = {
        "agency": (
            "Audience: UK and UAE agency founders (marketing, creative, digital, PR, "
            "web, recruitment). Plain English. Founder-to-founder tone."
        ),
        "property": (
            "Audience: UK landlords, BTL investors, property developers. "
            "Concrete figures (Section 24, CGT 18%/24%, SDLT). Tax-savvy practical voice."
        ),
        "dentists": (
            "Audience: UK dental practice owners + associates. Aware of NHS contracts, "
            "associate vs principal differences, practice acquisition realities."
        ),
        "generalist": (
            "Audience: UK SME owners, contractors, sole traders, partnerships across "
            "all sectors. Use 'business' over 'company' when speaking broadly. "
            "Brand is Holloway Davies, ICAEW chartered."
        ),
    }
    site = get_site(site_key)
    return (
        f"\nSITE-SPECIFIC VOICE:\n"
        f"  Brand: {site.get('display_name')} ({site.get('domain')}).\n"
        f"  {site_specific.get(site_key, '')}\n"
    )


def write_new_section_body(
    *,
    site_key: str,
    page_title: str,
    section_heading: str,
    section_outline: list[str],
    target_word_count: int,
    primary_query: str,
    cluster: list[str],
) -> ReasoningResult:
    """Generate the body for a new H2 section."""
    user_input = f"""SITE: {site_key}
PAGE TITLE: {page_title!r}

NEW H2 HEADING TO WRITE: {section_heading!r}
TARGET WORD COUNT: ~{target_word_count} words

SECTION OUTLINE / KEY POINTS TO COVER:
{chr(10).join(f"  - {p}" for p in section_outline)}

PRIMARY QUERY this section should help win: {primary_query!r}
SUPPORTING QUERY VARIANTS: {cluster[:5]}

Write the body of this section as HTML-in-markdown matching the site's
existing structure: <p>...</p> paragraphs and optionally <ul><li>...</li></ul>
for lists. DO NOT include the H2 heading itself — start with the first <p>.
DO NOT include facts you cannot verify; prefer 'current rates' over invented numbers.

{BRAND_VOICE_RULES}{get_site_voice_block(site_key)}
"""
    return run_reasoning(
        endpoint_name="apply_new_section_body",
        role=(
            "a senior UK accounting content writer producing an additional section "
            "for an existing blog post. The page already has other sections; you are "
            "writing just ONE H2's worth of body content."
        ),
        task=(
            "Write the body content for this section. Use HTML-in-markdown <p> tags. "
            "Hit close to target_word_count. Cover each outline point in 1-3 paragraphs."
        ),
        schema_description=(
            "{\n"
            '  "body_html": string (the section body as HTML-in-markdown, starting with <p>),\n'
            '  "word_count": integer (your estimate),\n'
            '  "confidence": integer 0-100\n'
            "}"
        ),
        must_not=[
            "include the H2 heading in body_html (caller adds it)",
            "use em-dashes or en-dashes",
            "use hype words: ultimate, amazing, discover, unlock, leverage, comprehensive, supercharge, deep dive, game-changer",
            "fabricate specific numbers/rates if not in the outline; use 'current rates' instead",
            "mention pricing, named clients, or company-specific anecdotes",
            "include client testimonials or success quotes",
            "use US English spelling",
        ],
        examples=[
            {
                "input": "H2: 'When You Must Report a Property Sale: 60-Day CGT Rule'\nOutline: ['Completion date triggers the 60-day clock', 'How to report via HMRC online service', 'Penalties for missing the deadline']\nTarget: 300 words",
                "output": {
                    "body_html": (
                        "<p>The 60-day reporting clock starts on the completion date of the property sale, not the exchange date. "
                        "Landlords must file a Capital Gains Tax return through HMRC's online service within 60 calendar days, "
                        "or face an automatic £100 penalty.</p>"
                        "<p>The return is filed through the Capital Gains Tax on UK Property service on gov.uk. "
                        "You will need your completion statement, original purchase documents, and details of any allowable expenses. "
                        "HMRC processes the return and confirms the tax due, which must also be paid within the 60-day window.</p>"
                        "<p>Missing the deadline triggers fixed and tax-geared penalties. The initial £100 fixed penalty applies even "
                        "if no tax is owed. After three months, daily penalties of £10 can apply for up to 90 days, plus interest on any "
                        "unpaid tax at the current HMRC rate.</p>"
                    ),
                    "word_count": 165,
                    "confidence": 85,
                },
            }
        ],
        validators=[
            lambda o: (True, None) if isinstance(o.get("body_html"), str) and len(o["body_html"]) > 100 else (False, "body_html missing or too short"),
            no_em_dashes("body_html"),
            lambda o: (True, None) if "<h2>" not in o.get("body_html", "").lower() and "<h1>" not in o.get("body_html", "").lower() else (False, "body_html contains H1/H2 — caller adds heading"),
            fact_check_validator("body_html"),
        ],
        user_input=user_input,
        site_key=site_key,
        confidence_threshold=70,
        max_tokens=3500,
        temperature=0.3,
    )


def rewrite_for_embedding(
    *,
    site_key: str,
    page_title: str,
    target_paragraph: str,
    query_variants_to_weave: list[str],
) -> ReasoningResult:
    """Rewrite a single paragraph to weave in query variants naturally."""
    user_input = f"""SITE: {site_key}
PAGE TITLE: {page_title!r}

QUERY VARIANTS to weave into the paragraph (use at least 2 of them, naturally):
{chr(10).join(f"  - {q}" for q in query_variants_to_weave)}

ORIGINAL PARAGRAPH:
{target_paragraph}

Rewrite the paragraph so it naturally incorporates the listed query variants
WITHOUT changing the substantive meaning, claims, or facts. The new paragraph
should:
  - Be roughly the same length (within ±25 words)
  - Sound natural (not keyword-stuffed)
  - Include at least 2 of the query variants verbatim or as a close inflection
  - Keep any existing <a> links and <strong> tags intact

{BRAND_VOICE_RULES}{get_site_voice_block(site_key)}
"""
    return run_reasoning(
        endpoint_name="apply_in_text_embedding",
        role=(
            "a UK accounting content editor making minimal in-text rewrites to a single "
            "paragraph to better signal a query intent, without changing meaning."
        ),
        task="Rewrite the paragraph to weave in the query variants naturally.",
        schema_description=(
            "{\n"
            '  "rewritten_paragraph": string,\n'
            '  "variants_used": [string, ...],\n'
            '  "confidence": integer 0-100\n'
            "}"
        ),
        must_not=[
            "change the substantive meaning, claims, or numbers",
            "keyword-stuff (each variant should appear at most once unless natural)",
            "use em-dashes",
            "remove existing <a> link tags or <strong> emphasis",
            "use hype words",
        ],
        examples=[
            {
                "input": "ORIGINAL: <p>Capital Gains Tax on property is charged at 18% or 24%.</p>\nVARIANTS: ['uk cgt rates residential property 2026', 'cgt rates 2026/27']",
                "output": {
                    "rewritten_paragraph": "<p>The UK CGT rates on residential property for 2026/27 stay at 18% for basic-rate taxpayers and 24% for higher-rate taxpayers.</p>",
                    "variants_used": ["uk cgt rates residential property 2026", "cgt rates 2026/27"],
                    "confidence": 88,
                },
            }
        ],
        validators=[
            lambda o: (True, None) if isinstance(o.get("rewritten_paragraph"), str) and len(o["rewritten_paragraph"]) > 30 else (False, "rewritten_paragraph missing"),
            no_em_dashes("rewritten_paragraph"),
            # Must contain at least one variant
            lambda o: (
                (True, None)
                if any(v.lower() in (o.get("rewritten_paragraph") or "").lower() for v in query_variants_to_weave)
                else (False, "rewritten_paragraph contains no variant verbatim")
            ),
            fact_check_validator("rewritten_paragraph"),
        ],
        user_input=user_input,
        site_key=site_key,
        confidence_threshold=70,
        max_tokens=1500,
        temperature=0.3,
    )


def write_new_page_content(
    *,
    site_key: str,
    proposed_slug: str,
    page_type: str,
    primary_h1: str,
    section_outline: list[str],
    schema_to_include: list[str],
    target_word_count: int,
    primary_query: str,
    cluster: list[str],
) -> ReasoningResult:
    """Generate a full new page (frontmatter fields + body)."""
    user_input = f"""SITE: {site_key}
PROPOSED SLUG: {proposed_slug}
PAGE TYPE: {page_type}
PRIMARY H1: {primary_h1!r}

SECTION OUTLINE (each becomes an H2):
{chr(10).join(f"  - {s}" for s in section_outline)}

SCHEMA TYPES TO INCLUDE: {schema_to_include}
TARGET WORD COUNT: ~{target_word_count}

PRIMARY QUERY this page should win: {primary_query!r}
CLUSTER: {cluster[:5]}

Write a complete page consisting of:
  - title (string, <=70 chars, includes primary_h1's key phrase)
  - metaTitle (string, <=60 chars, leads with primary query)
  - metaDescription (string, 140-155 chars, includes primary query + value prop)
  - summary (string, 1-2 sentences, the lead paragraph essentially)
  - h1 (string — exactly primary_h1)
  - body_html (string, HTML-in-markdown with <h2>...</h2> for each section
    in the outline, <p>...</p> paragraphs, optionally <ul><li>...</li></ul>)
  - faqs (list of {{question, answer}} — 3-5 entries relevant to the cluster)

{BRAND_VOICE_RULES}{get_site_voice_block(site_key)}
"""
    return run_reasoning(
        endpoint_name="apply_new_page",
        role=(
            "a senior UK accounting content writer producing a complete new page "
            "for a lead-generation accountancy site. The page should target a specific "
            "query, follow the outline, and be ready to publish."
        ),
        task="Write the complete page content.",
        schema_description=(
            "{\n"
            '  "title": string,\n'
            '  "metaTitle": string (<=60 chars),\n'
            '  "metaDescription": string (140-155 chars),\n'
            '  "summary": string,\n'
            '  "h1": string,\n'
            '  "body_html": string,\n'
            '  "faqs": [{question, answer}, ...],\n'
            '  "confidence": integer 0-100\n'
            "}"
        ),
        must_not=[
            "use em-dashes or hype words",
            "fabricate specific numbers/rates not generally true for UK tax",
            "include client names, pricing, or company-specific anecdotes",
            "include the H1 inside body_html (it's a separate field)",
            "produce metaTitle > 60 chars or metaDescription outside 140-160 chars",
            "use US English spelling",
        ],
        examples=[],  # full-page examples are too long; rely on schema + outline
        validators=[
            lambda o: (True, None) if isinstance(o.get("body_html"), str) and len(o["body_html"]) > 1000 else (False, "body_html missing or too short"),
            lambda o: (True, None) if isinstance(o.get("metaTitle"), str) and len(o["metaTitle"]) <= 60 else (False, "metaTitle missing or > 60 chars"),
            lambda o: (True, None) if isinstance(o.get("metaDescription"), str) and 130 <= len(o["metaDescription"]) <= 170 else (False, "metaDescription length out of bounds"),
            no_em_dashes("body_html"),
            no_em_dashes("metaTitle"),
            no_em_dashes("metaDescription"),
            no_em_dashes("title"),
            no_em_dashes("h1"),
            lambda o: (True, None) if isinstance(o.get("faqs"), list) and 3 <= len(o["faqs"]) <= 8 else (False, "faqs missing or out of [3,8] count"),
            fact_check_validator("body_html"),
            fact_check_validator("summary"),
        ],
        user_input=user_input,
        site_key=site_key,
        confidence_threshold=70,
        max_tokens=8000,
        temperature=0.3,
    )
