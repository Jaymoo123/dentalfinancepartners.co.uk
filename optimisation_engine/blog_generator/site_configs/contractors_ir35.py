"""Contractor Finance Partners (contractors-ir35) site configuration.

All content rules are defined inline here (no legacy per-site config_supabase.py
to import from; this site was scaffolded after the Phase 4 consolidation).
"""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]


_POST_CATEGORIES = [
    "IR35 Status",
    "Limited Company Tax",
    "Umbrella vs Limited Company",
    "Expenses and Deductions",
    "Pension and Dividends",
    "MTD and Compliance",
    "Contractor Accounting Basics",
]

# Slugs that will exist after the first content batch. Used for internal linking.
_INTERNAL_LINK_SLUGS = [
    "what-is-ir35",
    "inside-ir35",
    "outside-ir35",
    "how-to-use-cest",
    "sds-status-determination-statement",
    "limited-company-vs-umbrella-contractor",
    "contractor-tax-planning-guide",
    "dividend-tax-rates-contractors",
    "contractor-expenses-allowable-guide",
    "off-payroll-working-rules-private-sector",
    "psc-limited-company-contractor-tax",
    "msc-legislation-contractors",
    "contractor-pension-employer-contributions",
    "umbrella-company-explained",
    "deemed-employment-tax-implications",
    "director-salary-dividends-strategy",
    "travel-expenses-24-month-rule",
    "corporation-tax-limited-company-contractor",
    "contractor-self-assessment-guide",
    "ir35-contract-review",
    "fee-payer-liability-explained",
]

_ANCHOR_TERMS = [
    "contractor",
    "IR35",
    "off-payroll working",
    "limited company contractor",
    "umbrella company",
    "PSC",
    "personal service company",
    "inside IR35",
    "outside IR35",
    "CEST",
    "SDS",
    "deemed employment",
    "intermediary",
    "off-payroll rules",
    "IR35 status",
    "end client",
    "fee-payer",
    "contractor accountant",
    "MSC legislation",
    "deemed salary",
    "working through a limited company",
    "director's salary",
    "dividends",
    "contractor tax",
    "small company exemption",
]

_HALLUCINATION_ZONES = [
    (
        "Off-payroll rule liability shift timeline: PUBLIC SECTOR shifted to engager from 6 April 2017."
        " PRIVATE SECTOR (medium/large businesses only) from 6 April 2021."
        " Small businesses (meeting 2 of 3: turnover <= £15m, balance sheet <= £7.5m, < 50 employees,"
        " thresholds raised for financial years beginning on/after 6 April 2025; earliest a previously"
        " medium client exits Chapter 10 is 6 April 2027) remain exempt — the PSC still self-assesses."
    ),
    (
        "INSIDE IR35 tax treatment: the FEE-PAYER deducts income tax + employee NICs from the contract"
        " fee BEFORE paying the PSC. The PSC then pays a deemed employment payment to the director;"
        " this income is NOT subject to additional corporation tax. The contractor does NOT receive gross"
        " then repay tax — it is deducted at source by the fee-payer."
    ),
    (
        "OUTSIDE IR35: the contractor receives gross contract fees into the PSC. The PSC pays corporation"
        " tax on profit. The director then extracts money via a combination of low salary and dividends."
        " This structure is legitimate but status must be correct for each individual engagement."
    ),
    (
        "CEST (Check Employment Status for Tax): HMRC's online tool. HMRC will stand behind CEST results"
        " ONLY if the information entered accurately reflects the working practices. CEST does NOT"
        " explicitly test Mutuality of Obligation (MOO) — MOO is still a legally relevant factor."
        " An 'undetermined' CEST result means the tool cannot decide; HMRC has not pre-approved inside."
    ),
    (
        "Dividend tax rates 2026/27 (FA 2026 s.4, from 6 April 2026): basic rate band 10.75%,"
        " higher rate 35.75%, additional rate 39.35% (unchanged). Old rates 8.75%/33.75% apply to"
        " 2025/26 and earlier only. Dividend allowance £500."
        " ALWAYS label rates with the specific tax year. Do not quote 2022/23 or older rates as current."
    ),
    (
        "24-month travel expense rule: a workplace becomes a 'permanent workplace' (ordinary commuting)"
        " if the contractor attends for more than 24 months OR if at the outset it is expected to exceed"
        " 24 months. Once permanent workplace status is established, travel and subsistence from home"
        " are NOT allowable expenses. The rule applies PER ENGAGEMENT SITE."
    ),
    (
        "MSC (Managed Service Company) legislation (ITEPA 2003 s.61B onwards): catches arrangements"
        " where a third-party MSC provider manages the contractor's company finances. IR35 and MSC are"
        " SEPARATE regimes — both can apply independently. MSC debt transfer to directors is possible."
        " A contractor operating their own bona fide limited company is generally not an MSC."
    ),
    (
        "Contractor pension via PSC: employer pension contributions from the PSC are an ALLOWABLE"
        " BUSINESS EXPENSE (reduce corporation tax). They are exempt from income tax for the individual"
        " up to the annual allowance (£60,000 in 2024/25, or 100% of relevant UK earnings if lower)."
        " Salary sacrifice is NOT available through a PSC in the same way as a PAYE employer scheme."
    ),
    (
        "SDS (Status Determination Statement): medium/large end clients MUST issue an SDS stating the"
        " IR35 status AND the reasons. Contractors have a statutory right to dispute the SDS via a"
        " client-led disagreement process. If the client fails to issue a valid SDS, IR35 liability"
        " reverts to the client (not the fee-payer or PSC)."
    ),
    (
        "Limited company is NOT a guarantee of outside IR35 status. IR35 is assessed"
        " contract-by-contract and engagement-by-engagement based on actual working practices:"
        " control, substitution rights, mutuality of obligation, financial risk, integration."
        " Blanket 'outside IR35' determinations for all workers are legally invalid after April 2021."
    ),
    (
        "Corporation tax rates 2023/24 onwards: 19% on profits up to £50,000 (small profits rate);"
        " 25% on profits over £250,000 (main rate); marginal relief applies between £50k and £250k."
        " Do NOT state a flat 25% rate for all PSCs — most small contractor PSCs pay 19% or a"
        " marginal rate. The £50k/£250k thresholds are DIVIDED by the number of associated companies."
    ),
]

_BANNED_PHRASES = [
    "—", "–",
    "in today's", "in the world of", "when it comes to", "in an ever-evolving",
    "navigating the complex",
    "delve", "leverage", "harness", "unlock", "dive into", "supercharge",
    "landscape", "tapestry", "intricate", "seamless",
]

_AUDIENCE_LINK_MAP: list[tuple[list[str], str]] = [
    (["inside ir35", "deemed employee", "paye contractor", "deemed salary"], "/inside-ir35"),
    (["outside ir35", "ir35 defence", "contract review", "break test", "substitution"], "/outside-ir35"),
    (["limited company", "psc", "personal service company", "director salary", "corporation tax"], "/limited-company"),
    (["umbrella vs", "umbrella company", "going limited", "umbrella vs limited"], "/umbrella-vs-limited"),
    (["expenses", "travel", "24 month", "mileage", "subsistence", "allowable costs"], "/contractor-expenses"),
    (["pension", "sipp", "employer contribution", "annual allowance", "retirement"], "/contractor-pension"),
    (["cest", "status check", "sds", "disagreement", "ir35 review", "determination"], "/ir35-status-check"),
    (["self assessment", "sa100", "tax return", "payment on account"], "/self-assessment"),
]

_BLOG_SYSTEM_PROMPT = """
You are a senior UK chartered accountant specialising in contractor and IR35 tax matters. You write practical, technically precise guides for UK contractors, limited company directors, and IR35-affected workers.

AUDIENCE
- IT contractors, engineering and management consultants, locum professionals operating via PSC
- Limited company (PSC) directors evaluating inside vs outside IR35 outcomes
- Contractors researching umbrella vs limited company structures
- Workers who have received an SDS and want to understand their position

VOICE AND TONE
- British English throughout: organisation, licence (noun), favour, programme, whilst, practise (verb) vs practice (noun)
- Plain specialist: explain like a knowledgeable accountant in a face-to-face meeting, not a textbook or a brochure
- Evidence-based: cite specific legislation (ITEPA 2003, Finance Act 2021, SI 2021/1106), HMRC guidance references, or year-labelled financial figures where relevant
- Firm but honest: acknowledge where the rules are genuinely unclear or where HMRC tools have limitations
- No marketing language. No vague reassurance.

FORMATTING
- H2 subheadings for each major section (3 to 6 per post)
- Short paragraphs (2 to 4 sentences), never walls of text
- Bullet lists for 3 or more parallel items
- One simple table permitted where it genuinely aids comparison (e.g., inside vs outside IR35 net pay)
- Bold key figures and rules: rates, thresholds, dates
- Cluster post word count: 900 to 1,400 words. Pillar post word count: 1,800 to 2,500 words.

STRUCTURAL RULES
1. Open with the most useful fact or figure in the first two sentences. Do NOT open with a question or a rhetorical framing.
2. State what the post covers in sentence three (do not use "In this article we will look at..." phrasing).
3. Close with a 2 to 3 sentence summary followed by one natural CTA sentence pointing to the relevant service page (/services or the matched audience page). No heading above the closing summary.
4. Every H2 must contain at least one of these anchor terms: contractor, IR35, off-payroll, PSC, limited company, umbrella, CEST, SDS, dividends, expenses, pension.

OUTPUT FORMAT — use exactly these ==markers==:
==name==          (H1 title, no "IR35:" prefix needed — work it into the title naturally)
==slug==          (lowercase-hyphenated, 4 to 7 words, include primary keyword)
==metaTitle==     (50 to 60 chars, include primary keyword + brand "| Contractor Finance Partners")
==metaDescription== (140 to 160 chars, include primary keyword, clear benefit)
==category==      (one of: IR35 Status, Limited Company Tax, Umbrella vs Limited Company, Expenses and Deductions, Pension and Dividends, MTD and Compliance, Contractor Accounting Basics)
==excerpt==       (2 sentences, no em-dashes, suitable for blog card)
==content==       (full HTML body: <h2>, <p>, <ul>/<ol>, <strong>, <table> only — no <h1>, no inline styles)

CONTENT RULES
- Use current 2026/27 tax year figures and ALWAYS label them with the year.
- Dividend tax rates 2026/27: basic 10.75%, higher 35.75%, additional 39.35%. Dividend allowance £500.
- Corporation tax: 19% on profits up to £50,000 (small profits rate), 25% above £250,000, marginal relief between.
- Off-payroll rules: public sector April 2017, private sector medium/large April 2021, small companies exempt.
- Travel expenses: 24-month rule. Ordinary commuting is not allowable once the workplace becomes permanent.
- Annual pension allowance: £60,000 in 2024/25.
- NEVER state blanket "outside IR35" is achievable through specific contract wording alone.
- NEVER say CEST is definitive or that HMRC always accepts its output.
- NEVER imply IR35 does not apply to limited companies.

PROHIBITED PHRASES
- Em-dashes (use commas, parentheses, or full stops instead)
- delve, leverage, harness, unlock, supercharge, dive into
- landscape, tapestry, intricate, seamless
- "In today's world", "in the world of", "when it comes to", "navigating the complex"
- Client names, firm names, or testimonials with identifying detail
- Pricing information (direct readers to /contact)

LEAD-GEN MODEL
This site generates leads for a specialist contractor accounting firm. Do not name the firm or include pricing in posts. Anonymised examples only ("a contractor client recently encountered this scenario" — no name or employer). One CTA per post.
""".strip()


SITE_CONFIG: dict = {
    # --- Identity & routing ---------------------------------------------------
    "site_key": "contractors-ir35",
    "display_name": "Contractor Finance Partners",
    "domain": "www.contractor-finance-partners.co.uk",
    "site_base_url": "https://www.contractor-finance-partners.co.uk",
    "author_name": "Contractor Finance Partners Editorial Team",
    "output_dir": "contractors-ir35/web/content/blog",
    "pillar_output_dir": None,

    # --- Topic table (unified post Phase 4) -----------------------------------
    "topic_table": "blog_topics",
    "topic_column": "topic",
    "secondary_keywords_shape": "array",
    "done_marker_field": "used",
    "done_marker_value": True,
    "done_timestamp_field": "used_at",
    "slug_field": "slug",
    "topic_order": "publish_priority.desc.nullslast,keyword_difficulty.asc.nullslast,created_at.asc",

    # --- LLM provider ---------------------------------------------------------
    # Writing model decided by the 2026-06 bake-off (docs/contractors-ir35/BAKEOFF_2026-06.md); python llm path is not the estate writing pipeline.
    "llm_provider": "deepseek",
    "llm_model": "deepseek-chat",
    "max_tokens": 6500,
    "temperature": 0.3,
    "verify_with_haiku": True,

    # --- Content rules --------------------------------------------------------
    "post_categories": _POST_CATEGORIES,
    "internal_link_slugs": _INTERNAL_LINK_SLUGS,
    "anchor_terms": _ANCHOR_TERMS,
    "anchor_rules": {
        "h1_must_contain_any": True,
        "first_200_words_min_count": 2,
        "h2_must_contain_any": True,
    },
    "hallucination_zones": _HALLUCINATION_ZONES,
    "banned_phrases": _BANNED_PHRASES,

    # --- Audience link map ----------------------------------------------------
    "audience_link_map": _AUDIENCE_LINK_MAP,
    "default_audience_link": "/services",

    # --- System prompts -------------------------------------------------------
    "system_prompt": _BLOG_SYSTEM_PROMPT,
    "blog_system_prompt": _BLOG_SYSTEM_PROMPT,  # legacy alias; content_pipeline uses "system_prompt"
    "pillar_system_prompt": None,

    # --- SEO persona ----------------------------------------------------------
    "seo_persona": {
        "audience": (
            "UK contractors, PSC directors, IR35-affected workers, umbrella vs Ltd researchers."
            " Knows basic contracting but wants precise tax rules and legislation references,"
            " not generic SME advice."
        ),
        "language_cues": [
            "IR35 status", "inside/outside IR35", "off-payroll rules", "CEST tool",
            "deemed employment", "PSC", "fee-payer liability", "SDS", "24-month rule",
            "dividend tax 10.75%/35.75%", "corporation tax 19%/25%", "MSC legislation",
            "£60k pension allowance", "April 2021 private sector", "small company exemption",
        ],
        "preferred_hooks": [
            "£ figure with tax year",
            "named legislation or SI reference",
            "HMRC deadline or threshold",
            "specific rate with year label",
        ],
        "banned_openers_extra": [
            "For contractors",
            "If you're a contractor",
            "As a contractor",
        ],
        "brand_authority": "mid",
        "geo_qualifiers": ["UK"],
        "voice_signature": (
            "IR35-specialist, off-payroll-literate, PSC-director-savvy."
            " Not generic accountancy."
        ),
    },

    # --- URL format -----------------------------------------------------------
    "canonical_format": "/blog/{category_slug}/{slug}",
    "category_slug_rules": {"and_replaces_ampersand": True},

    # --- Behaviour flags ------------------------------------------------------
    "use_research_bundle": True,
    "fetch_image": True,
}
