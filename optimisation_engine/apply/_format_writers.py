"""
Format-specific content writers for the four "stand out" content types:

  - Glossary entries (200-400 words, term + definition + example + cross-links)
  - Pillar guides (2500-4000 words with TOC, downloadable PDF reference, deep authority)
  - Case studies (anonymised worked examples with named-but-fake characters)
  - Comparison pages (X vs Y with structured comparison table)

Each reuses:
  - synthesize_research()       — multi-tier source pyramid
  - BRAND_VOICE_RULES           — no em-dashes, no hype, UK English
  - fact_check_validator()      — known UK facts catalogue
  - citation density validators — minimum [n] markers per 1000 words

Output schema is consistent across formats so the apply lifecycle can be
shared via new_page-style writers.
"""
from __future__ import annotations

from optimisation_engine.apply._content_writer import (
    BRAND_VOICE_RULES,
    get_site_voice_block,
)
from optimisation_engine.apply.fact_checker import fact_check_validator
from optimisation_engine.reasoning.deepseek_runner import (
    ReasoningResult,
    no_em_dashes,
    require_keys,
    run_reasoning,
)


# ============================================================================
# GLOSSARY ENTRY
# ============================================================================


def write_glossary_entry(
    *,
    site_key: str,
    term: str,
    related_terms: list[str] | None = None,
    research_bundle=None,
) -> ReasoningResult:
    """Generate a single glossary entry: definition + plain-English explanation +
    example + cross-links to related terms.

    Glossary entries are short (200-400 words), highly focused, and become
    long-tail SEO assets that capture 'what is X' / 'X meaning' queries.
    """
    related_terms = related_terms or []
    research_block = ""
    citation_rules = ""
    if research_bundle is not None and getattr(research_bundle, "claims", None):
        research_block = research_bundle.to_prompt_block(max_claims=10)
        citation_rules = """
CITATION RULES:
  - Use [n] markers inline to cite authoritative sources where you state a
    specific number, rate, or rule.
  - Aim for 2-3 citations for the entry.
"""

    user_input = f"""SITE: {site_key}
TERM TO DEFINE: {term!r}
RELATED TERMS (for cross-linking — mention with [LINK: term] markers): {related_terms}

{research_block}
{citation_rules}

Write a glossary entry for this term. Structure:
  1. Definition (1-2 sentences, accessible to a non-specialist UK business owner)
  2. Plain-English explanation (1 paragraph — why it matters, who it applies to)
  3. Worked example (1 short paragraph with concrete UK figures)
  4. Related terms cross-link callout (HTML, listing relevant related_terms with [LINK: ...] markers)

Output the entry as HTML-in-markdown: <p>...</p> paragraphs, optionally
<ul><li>...</li></ul> for lists.

Length target: 250-350 words. Glossary entries are SHORT — don't bloat.

{BRAND_VOICE_RULES}{get_site_voice_block(site_key)}
"""

    return run_reasoning(
        endpoint_name="format_writer_glossary",
        role=(
            "a UK accounting writer producing concise, accessible glossary entries "
            "for an SME audience. Each entry must be precise, sourced, and "
            "cross-linked to other glossary terms."
        ),
        task=(
            "Write a glossary entry: definition + plain-English explanation + "
            "worked example + related-terms cross-link list."
        ),
        schema_description=(
            "{\n"
            '  "definition": string (1-2 sentences),\n'
            '  "body_html": string (HTML-in-markdown, all 4 sections combined),\n'
            '  "metaTitle": string (<=60 chars),\n'
            '  "metaDescription": string (140-155 chars),\n'
            '  "word_count": int,\n'
            '  "confidence": int 0-100\n'
            "}"
        ),
        must_not=[
            "produce more than 400 words of body_html",
            "use em-dashes, hype words, or patronising openers",
            "fabricate UK tax numbers — use the research bundle or omit specifics",
        ],
        examples=[
            {
                "input": "TERM: 'Annual Investment Allowance'",
                "output": {
                    "definition": "The Annual Investment Allowance (AIA) is a UK tax relief that lets businesses deduct the full value of qualifying capital equipment from their taxable profits in the year of purchase.",
                    "body_html": "<p><strong>Definition.</strong> The Annual Investment Allowance (AIA) is a UK tax relief that lets businesses deduct the full value of qualifying capital equipment from their taxable profits in the year of purchase.</p><p><strong>Why it matters.</strong> AIA accelerates tax relief on equipment costs, improving cash flow for limited companies, sole traders, and partnerships investing in plant and machinery.</p><p><strong>Example.</strong> A UK limited company spending £30,000 on office computers and software can deduct the full £30,000 from taxable profits in the year of purchase, reducing corporation tax by £7,500 at the 25% main rate.</p><p><strong>Related terms:</strong> [LINK: capital allowances], [LINK: writing down allowance], [LINK: full expensing]</p>",
                    "metaTitle": "Annual Investment Allowance Explained | UK Tax Glossary",
                    "metaDescription": "Annual Investment Allowance (AIA) explained: how the 100% capital allowance works for UK businesses, what qualifies, and a worked example with current rates.",
                    "word_count": 145,
                    "confidence": 92,
                },
            },
        ],
        validators=[
            require_keys("definition", "body_html", "metaTitle", "metaDescription"),
            lambda o: (True, None) if 50 <= len(o.get("body_html") or "") <= 4000 else (False, "body_html out of length bounds"),
            no_em_dashes("body_html"),
            no_em_dashes("metaTitle"),
            no_em_dashes("metaDescription"),
            fact_check_validator("body_html"),
            lambda o: (True, None) if isinstance(o.get("metaTitle"), str) and 30 <= len(o["metaTitle"]) <= 65 else (False, "metaTitle out of length bounds"),
            lambda o: (True, None) if isinstance(o.get("metaDescription"), str) and 130 <= len(o["metaDescription"]) <= 170 else (False, "metaDescription out of length bounds"),
        ],
        user_input=user_input,
        site_key=site_key,
        confidence_threshold=75,
        max_tokens=2000,
        temperature=0.3,
    )


# ============================================================================
# PILLAR GUIDE (long-form authoritative page)
# ============================================================================


def write_pillar_guide(
    *,
    site_key: str,
    pillar_topic: str,
    primary_query: str,
    cluster: list[str],
    section_outline: list[str],
    target_word_count: int = 3000,
    research_bundle=None,
) -> ReasoningResult:
    """Generate a long-form pillar guide page.

    Pillar guides are the FLAGSHIP page-1 contenders. They are:
      - 2500-4000 words
      - Cover every angle of a topic
      - Heavily sourced (10+ citations across 5+ sources)
      - Include a Table of Contents with jump links
      - Include a 'Quick reference' summary table at the top
      - End with a References section + 'When this does NOT apply' callout
    """
    research_block = research_bundle.to_prompt_block(max_claims=30) if research_bundle else ""
    n_sources = len(getattr(research_bundle, "sources", []) or [])

    user_input = f"""SITE: {site_key}
PILLAR TOPIC: {pillar_topic!r}

PRIMARY QUERY (this is what we want to rank for): {primary_query!r}
QUERY CLUSTER: {cluster[:8]}

SECTION OUTLINE (each becomes an H2):
{chr(10).join(f"  {i+1}. {s}" for i, s in enumerate(section_outline))}

TARGET WORD COUNT: ~{target_word_count} words

{research_block}

Write a comprehensive pillar guide. Structure:
  1. Lead paragraph (~150 words) — answers the primary query immediately with key figures.
  2. Quick-Reference Table (HTML <table>) — at-a-glance summary of key values (rates, thresholds, deadlines).
  3. Table of Contents (HTML <ul> with anchor links #section-N to each H2).
  4. Each section in the outline as an H2 with 300-500 words.
  5. 'When this does NOT apply' callout (HTML <aside class="note">) explaining edge cases.
  6. 'Common myths' section addressing 3-5 misconceptions.
  7. Closing summary checklist (HTML <ol class="checklist">).
  8. FAQs (5-7 entries).

CITATION RULES (MANDATORY):
  - Use [n] markers inline. n = source index from RESEARCH BUNDLE above (1..{n_sources}).
  - Minimum 12 citations spread across the page.
  - At least 6 different sources cited.
  - At least 3 different source tiers (canonical + authority + industry).
  - Cite specific numbers (rates, thresholds, dates) from the bundle only.

{BRAND_VOICE_RULES}{get_site_voice_block(site_key)}
"""

    return run_reasoning(
        endpoint_name="format_writer_pillar_guide",
        role=(
            "a senior UK tax content writer producing a flagship pillar guide. "
            "This is the page we want to rank #1 for. It must be authoritative, "
            "heavily sourced, structured for skim-reading and deep-reading, and "
            "comprehensive across all angles of the topic."
        ),
        task="Write the full pillar guide.",
        schema_description=(
            "{\n"
            '  "title": string,\n'
            '  "metaTitle": string (<=60 chars),\n'
            '  "metaDescription": string (140-155 chars),\n'
            '  "summary": string (1-2 sentences),\n'
            '  "h1": string,\n'
            '  "table_of_contents_html": string (HTML <ul> with anchor links),\n'
            '  "quick_reference_table_html": string (HTML <table>),\n'
            '  "body_html": string (the main body — lead para + each H2 section + when-does-not-apply + myths + checklist),\n'
            '  "faqs": [{question, answer}, ...] (5-7 entries),\n'
            '  "confidence": integer 0-100\n'
            "}"
        ),
        must_not=[
            "use em-dashes, hype words, or patronising language",
            "fabricate UK tax figures — use only the research bundle",
            "produce body_html under 2000 words",
        ],
        examples=[],
        validators=[
            require_keys("title", "metaTitle", "metaDescription", "body_html", "faqs"),
            lambda o: (True, None) if isinstance(o.get("body_html"), str) and len(o["body_html"]) > 6000 else (False, "body_html missing or too short"),
            lambda o: (True, None) if isinstance(o.get("metaTitle"), str) and len(o["metaTitle"]) <= 65 else (False, "metaTitle too long"),
            lambda o: (True, None) if isinstance(o.get("metaDescription"), str) and 130 <= len(o["metaDescription"]) <= 170 else (False, "metaDescription length out of bounds"),
            no_em_dashes("body_html"),
            no_em_dashes("metaTitle"),
            no_em_dashes("metaDescription"),
            no_em_dashes("title"),
            lambda o: (True, None) if isinstance(o.get("faqs"), list) and 5 <= len(o["faqs"]) <= 8 else (False, "faqs out of [5,8] range"),
            fact_check_validator("body_html"),
        ],
        user_input=user_input,
        site_key=site_key,
        confidence_threshold=70,
        max_tokens=12000,
        temperature=0.3,
    )


# ============================================================================
# CASE STUDY (worked-example anonymised)
# ============================================================================


def write_case_study(
    *,
    site_key: str,
    scenario: str,
    primary_query: str,
    target_word_count: int = 1200,
    research_bundle=None,
) -> ReasoningResult:
    """Generate a worked-example case study.

    Case studies are E-E-A-T gold: specific scenarios with concrete numbers,
    walked through step by step. The 'characters' are anonymised but named for
    readability ('Sarah, a London-based dental associate earning £85k...').
    """
    research_block = research_bundle.to_prompt_block(max_claims=15) if research_bundle else ""
    n_sources = len(getattr(research_bundle, "sources", []) or [])

    user_input = f"""SITE: {site_key}
SCENARIO (one-line summary): {scenario!r}

PRIMARY QUERY: {primary_query!r}
TARGET WORD COUNT: ~{target_word_count} words

{research_block}

Write a worked-example case study. Structure:
  1. Scenario setup (~150 words) — introduce a NAMED-BUT-ANONYMOUS character
     (e.g. 'Sarah, a London-based dental associate') with specific numbers
     (income, hours, status). The character is fictional but representative.
  2. The challenge (1 paragraph) — what tax / accounting question they face.
  3. Step-by-step analysis with calculations (the main content). Show working.
  4. Outcome summary with the final number / decision.
  5. Three key takeaways for readers in similar positions.
  6. 'What if it were different' variants (2-3 short paragraphs covering
     'if income were higher / if structure were different / if location were').
  7. Footer disclaimer: 'This is an illustrative example. Real positions vary.'

CITATION RULES:
  - Cite [n] markers for rates / thresholds (n from RESEARCH BUNDLE, 1..{n_sources}).
  - Minimum 6 citations spread across the analysis.

{BRAND_VOICE_RULES}{get_site_voice_block(site_key)}
"""

    return run_reasoning(
        endpoint_name="format_writer_case_study",
        role=(
            "a UK accounting writer producing illustrative worked-example case "
            "studies. The characters are anonymised but specific. The numbers "
            "are calculated using UK tax rules from the research bundle."
        ),
        task="Write a worked-example case study.",
        schema_description=(
            "{\n"
            '  "title": string,\n'
            '  "metaTitle": string,\n'
            '  "metaDescription": string,\n'
            '  "summary": string,\n'
            '  "h1": string,\n'
            '  "body_html": string (HTML with all sections, calculations shown),\n'
            '  "key_takeaways": [string, ...] (3 takeaways),\n'
            '  "confidence": integer 0-100\n'
            "}"
        ),
        must_not=[
            "use em-dashes",
            "fabricate UK tax numbers — calculate from research bundle facts",
            "imply the example is a real client",
            "produce body_html under 800 words",
        ],
        examples=[],
        validators=[
            require_keys("title", "body_html", "key_takeaways"),
            lambda o: (True, None) if isinstance(o.get("body_html"), str) and len(o["body_html"]) > 2500 else (False, "body_html missing or too short"),
            no_em_dashes("body_html"),
            no_em_dashes("title"),
            no_em_dashes("metaTitle"),
            no_em_dashes("metaDescription"),
            lambda o: (True, None) if isinstance(o.get("key_takeaways"), list) and len(o["key_takeaways"]) == 3 else (False, "need exactly 3 key_takeaways"),
            fact_check_validator("body_html"),
        ],
        user_input=user_input,
        site_key=site_key,
        confidence_threshold=70,
        max_tokens=5000,
        temperature=0.3,
    )


# ============================================================================
# COMPARISON PAGE (X vs Y)
# ============================================================================


def write_comparison_page(
    *,
    site_key: str,
    option_a: str,
    option_b: str,
    audience: str,
    primary_query: str,
    target_word_count: int = 2000,
    research_bundle=None,
) -> ReasoningResult:
    """Generate a 'X vs Y' comparison page.

    Comparison pages have strong commercial intent (people decide here) and
    rank well because they directly answer 'which is better' queries.

    Structure: side-by-side comparison table → detailed comparison of each
    dimension → scenarios where each wins → final recommendation framework.
    """
    research_block = research_bundle.to_prompt_block(max_claims=20) if research_bundle else ""
    n_sources = len(getattr(research_bundle, "sources", []) or [])

    user_input = f"""SITE: {site_key}
COMPARISON: {option_a!r} vs {option_b!r}
AUDIENCE: {audience!r}
PRIMARY QUERY: {primary_query!r}
TARGET WORD COUNT: ~{target_word_count} words

{research_block}

Write a comparison page. Structure:
  1. Lead paragraph (~120 words) — the headline difference + when each wins.
  2. Quick-reference COMPARISON TABLE (HTML <table>) — side-by-side rows for
     each key dimension: tax treatment, admin burden, cost, flexibility,
     suitable income range, etc.
  3. Detailed analysis sections, one per major dimension (5-7 H2 sections).
     Each: 'For {option_a}', 'For {option_b}', 'Verdict'.
  4. Scenarios — three illustrative situations where the choice goes one
     way vs the other.
  5. Decision framework — a short checklist or flowchart-as-list helping the
     reader decide.
  6. Common misconceptions.
  7. FAQ (4-6 entries).

CITATION RULES:
  - [n] citations throughout (n = source index, 1..{n_sources}).
  - Minimum 10 citations.
  - Tax / regulatory claims MUST be sourced.

{BRAND_VOICE_RULES}{get_site_voice_block(site_key)}
"""

    return run_reasoning(
        endpoint_name="format_writer_comparison_page",
        role=(
            "a senior UK accounting writer producing structured comparison pages "
            "that help readers decide between two options. You are balanced (neither "
            "option is always the right answer) and concrete (every claim is sourced)."
        ),
        task="Write a comparison page.",
        schema_description=(
            "{\n"
            '  "title": string,\n'
            '  "metaTitle": string,\n'
            '  "metaDescription": string,\n'
            '  "summary": string,\n'
            '  "h1": string,\n'
            '  "comparison_table_html": string (HTML <table>),\n'
            '  "body_html": string (HTML with all comparison sections),\n'
            '  "faqs": [{question, answer}, ...] (4-6 entries),\n'
            '  "confidence": int 0-100\n'
            "}"
        ),
        must_not=[
            "use em-dashes",
            "fabricate UK tax numbers",
            "produce body_html under 1500 words",
            "be one-sided — comparisons require balance",
        ],
        examples=[],
        validators=[
            require_keys("title", "comparison_table_html", "body_html", "faqs"),
            lambda o: (True, None) if isinstance(o.get("body_html"), str) and len(o["body_html"]) > 5000 else (False, "body_html missing or too short"),
            lambda o: (True, None) if isinstance(o.get("comparison_table_html"), str) and "<table" in (o.get("comparison_table_html") or "").lower() else (False, "comparison_table_html missing <table>"),
            no_em_dashes("body_html"),
            no_em_dashes("comparison_table_html"),
            no_em_dashes("title"),
            no_em_dashes("metaTitle"),
            no_em_dashes("metaDescription"),
            lambda o: (True, None) if isinstance(o.get("faqs"), list) and 4 <= len(o["faqs"]) <= 7 else (False, "faqs out of [4,7] range"),
            fact_check_validator("body_html"),
        ],
        user_input=user_input,
        site_key=site_key,
        confidence_threshold=70,
        max_tokens=8000,
        temperature=0.3,
    )
