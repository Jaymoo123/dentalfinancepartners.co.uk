"""Divorce-finances site configuration.

Placeholder brand "Divorce Finance Compass" / domain "divorce-finance-placeholder"
(2026-07-24). Real brand + domain decided at owner gate G1 pre-deploy; all
content bodies are brand-agnostic (zero brand-name mentions) so the rewrite
at G1 is a metadata-only swap. Mirrors wills_probate.py (sibling legal/YMYL
niche built the same day).

All content rules are defined inline here (no legacy per-site config_supabase.py
to import from).
"""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]


_POST_CATEGORIES = [
    "Financial Settlements",
    "Pensions and Divorce",
    "Tax on Divorce",
    "The Family Home",
    "Maintenance and Support",
    "Process and Costs",
]

# All live posts (waves 1-4, 45 posts) + the 3 commercial hubs. Paths are used
# verbatim as hrefs by append_related_posts_if_needed; blog posts follow
# canonical_format /blog/{category_slug}/{slug}. Refresh when a wave ships.
_INTERNAL_LINK_SLUGS: list[str] = [
    # Hubs
    "/financial-settlements",
    "/pension-sharing",
    "/capital-gains-tax-divorce",
    # Waves 1-2
    "/blog/financial-settlements/divorce-financial-settlement-guide",
    "/blog/financial-settlements/prenuptial-postnuptial-agreements",
    "/blog/pensions-and-divorce/pensions-and-divorce",
    "/blog/pensions-and-divorce/pension-sharing-vs-offsetting",
    "/blog/the-family-home/house-buyout-transfer-of-equity-divorce",
    "/blog/maintenance-and-support/child-maintenance-cms-formula",
    "/blog/maintenance-and-support/spousal-maintenance-guide",
    "/blog/process-and-costs/consent-orders-and-clean-break-orders",
    "/blog/process-and-costs/cost-of-divorce-uk",
    "/blog/process-and-costs/divorce-mediation-guide",
    "/blog/process-and-costs/divorce-solicitor-costs",
    "/blog/process-and-costs/divorce-statistics-uk-2026",
    "/blog/process-and-costs/diy-divorce-without-solicitor",
    "/blog/process-and-costs/form-e-financial-disclosure-guide",
    "/blog/process-and-costs/help-with-divorce-fees-ex160",
    "/blog/process-and-costs/how-long-does-divorce-take",
    # Wave 3 (2026-08-03)
    "/blog/financial-settlements/business-assets-limited-companies-divorce",
    "/blog/financial-settlements/crypto-digital-assets-divorce",
    "/blog/financial-settlements/gifts-loans-bank-of-mum-and-dad-divorce",
    "/blog/financial-settlements/hidden-assets-divorce",
    "/blog/financial-settlements/high-net-worth-divorce-duxbury",
    "/blog/financial-settlements/remarriage-trap-and-time-limits",
    "/blog/financial-settlements/separation-cohabitation-agreements-unmarried",
    "/blog/financial-settlements/what-am-i-entitled-to-divorce",
    "/blog/pensions-and-divorce/later-life-divorce-silver-splitters",
    "/blog/tax-on-divorce/is-spousal-maintenance-taxable",
    "/blog/tax-on-divorce/stamp-duty-divorce-transfers",
    "/blog/tax-on-divorce/cgt-divorce-no-gain-no-loss-window",
    "/blog/the-family-home/mesher-orders-deferred-house-sale",
    "/blog/the-family-home/who-gets-the-house-divorce",
    "/blog/the-family-home/joint-mortgage-after-divorce",
    "/blog/maintenance-and-support/school-fees-schedule-1-divorce",
    # Wave 4 (2026-08-04)
    "/blog/financial-settlements/divorce-and-joint-debts",
    "/blog/financial-settlements/stay-at-home-parent-divorce-settlement",
    "/blog/financial-settlements/divorce-settlement-examples-uk",
    "/blog/financial-settlements/adultery-divorce-financial-settlement",
    "/blog/financial-settlements/inheritance-and-divorce-settlements",
    "/blog/financial-settlements/divorce-finances-scotland",
    "/blog/financial-settlements/financial-abuse-divorce-settlements",
    "/blog/the-family-home/who-pays-mortgage-during-separation",
    "/blog/process-and-costs/litigant-in-person-financial-remedy",
    "/blog/process-and-costs/divorce-financial-settlement-checklist",
    "/blog/process-and-costs/legal-aid-divorce-costs",
    "/blog/process-and-costs/expert-costs-divorce-forensic-accountants",
    "/blog/maintenance-and-support/money-after-divorce-rebuilding",
]

_ANCHOR_TERMS = [
    "divorce",
    "financial settlement",
    "pension",
    "maintenance",
    "family home",
]

# PRIMARY-SOURCE-VERIFIED figures (Phase-3 fact-verification ledger, 2026-07-24).
# Locked verbatim so the generator never emits a stale rate. Short inline
# source tags kept as wills_probate.py does.
_HALLUCINATION_ZONES = [
    "Divorce or dissolution application fee £628 (from 13 July 2026) [SI 2026/642]",
    "Financial consent order fee £62 (uncontested, by agreement)",
    "Contested financial order application fee £321 (Form A)",
    (
        "Help with Fees (form EX160) income thresholds: single applicant £1,420,"
        " couple £2,130, per-child uplift +£425 (child aged 0 to 13) or +£710"
        " (child aged 14 or over); taper reduces help by 50p for each £1 of"
        " monthly income above the threshold (capped at the fee); disposable-capital"
        " limits £4,250 (for a fee up to £1,420) and £16,000 (if the applicant or"
        " their partner is aged 66 or over); refund window 3 months"
    ),
    (
        "Family Mediation Voucher scheme: £500 contribution per family for cases"
        " involving a dispute about a child; scheme extended to March 2027"
    ),
    (
        "Child Maintenance Service Collect and Pay: paying parent pays +20% on top"
        " of the calculated amount, receiving parent has 4% deducted; Direct Pay is"
        " free to both parents"
    ),
    (
        "CMS gross weekly income rates: reduced rate £7 flat plus a percentage;"
        " basic rate 12% (1 child), 16% (2 children), 19% (3 or more children);"
        " basic-plus rate 9%/12%/15% on the slice of income from £800.01 to £3,000"
    ),
    (
        "No-fault divorce minimum timeline 26 weeks: 20-week reflection period from"
        " application to conditional order, then a 6-week-and-1-day wait to the final"
        " order [Divorce, Dissolution and Separation Act 2020, in force 6 April 2022]"
    ),
    (
        "Capital gains tax on transfers between separating spouses or civil partners:"
        " no gain, no loss for up to 3 tax years after the tax year of separation, or"
        " unlimited where transfers are made under a formal separation agreement or"
        " court order [Finance Act 2023, TCGA 1992 s.58, from 6 April 2023]"
    ),
    (
        "CGT annual exempt amount 2026/27 £3,000; residential-property CGT rates 18%"
        " (basic-rate band) and 24% (above); UK residential property gains must be"
        " reported and paid within 60 days of completion"
    ),
    (
        "Pension sharing orders: introduced by the Welfare Reform and Pensions Act"
        " 1999, available for divorce proceedings started on or after 1 December 2000;"
        " 4-month implementation period once the order takes effect; only the"
        " protected-payment element of the new state pension can be shared"
    ),
]

_BANNED_PHRASES = [
    "—", "–",
    "in today's", "in the world of", "when it comes to", "in an ever-evolving",
    "navigating the complex",
    "delve", "leverage", "harness", "unlock", "dive into", "supercharge",
    "landscape", "tapestry", "intricate", "seamless",
    "we can represent you",
    "our solicitors",
    "our advisers",
    "legal advice from us",
    "financial advice from us",
    "regulated by the SRA",
    "regulated by the Solicitors Regulation Authority",
    "regulated by the FCA",
    "regulated by the Financial Conduct Authority",
    "mis-sold",
    "mis-selling",
    "no win no fee",
    "compensation claim",
    "pension transfer",
    "transfer your pension",
    "withdraw your pension",
    "best pension for divorce",
    "recommend this pension",
]

_AUDIENCE_LINK_MAP: list[tuple[list[str], str]] = [
    (["family home", "matrimonial home", "sell the house", "mesher order", "owner-occupier", "mortgage after divorce", "homeowner"], "/for/divorcing-homeowners"),
    (["business owner", "company shares", "family business", "sole trader", "director", "business valuation"], "/for/business-owners"),
    (["child maintenance", "child arrangements", "separated parent", "co-parent", "cms", "contact with children"], "/for/separated-parents"),
    (["pension", "pension sharing", "retirement", "over 50", "late-life divorce", "annuity", "final salary"], "/for/over-50s"),
    (["financial settlement", "consent order", "form a", "financial order", "clean break", "financial remedy"], "/financial-settlements"),
    (["pension sharing", "pension offsetting", "pension attachment", "cash equivalent value", "cetv"], "/pension-sharing"),
    (["capital gains tax", "cgt", "tax on divorce", "no gain no loss", "60-day report"], "/capital-gains-tax-divorce"),
    (["child maintenance data", "cms statistics", "maintenance tracker"], "/research/uk-child-maintenance-tracker"),
    (["financial remedy data", "settlement outcomes", "financial remedy index"], "/research/uk-divorce-financial-remedy-index"),
]

_BLOG_SYSTEM_PROMPT = """
# Quality standard: Property-parity. Every post must read as the definitive UK resource on its topic.
# Minimum signals: 1 worked example (pillars), 1 HTML table, 6+ FAQs, 3+ internal links, calculator CTA where relevant.
# YMYL note: this is a high-stakes financial/legal topic touching relationships, children, and money. Precision and tone both matter.

You are a faceless editorial team writing practical, technically precise guides on the money side of divorce and separation in England and Wales for an independent information service. You are NOT a solicitor, a financial adviser, an independent financial adviser (IFA), or an accountant, and this is NOT legal, financial, or tax advice.

AUDIENCE
- People going through divorce or dissolution in England and Wales (primary): dealing with a financial settlement for the first time, need practical next steps and cost/time clarity.
- Separated parents (growing segment): need to understand child maintenance (the Child Maintenance Service), child arrangements, and how money and children interact, handled with extra care.
- People approaching or in later-life divorce (secondary): pensions, the family home, and retirement income are the dominant concern.

VOICE AND TONE
- British English throughout: organisation, licence (noun), favour, programme, whilst, practise (verb) vs practice (noun)
- Plain English, calm and non-judgemental, no jargon without explanation (many readers are reading this during a stressful separation)
- Extra-sensitive on anything involving children: child maintenance and child arrangements must never read as adversarial, tactical, or as a way to "win". Be factual, child-focused, and even-handed between both parents.
- Evidence-based: cite gov.uk, HMRC, HMCTS, the Child Maintenance Service, or MoneyHelper guidance and year-labelled figures wherever a claim is made
- Practical next step and cost/time clarity as entry angles: readers want to know what to do next, how long it takes, and what it costs
- Calculator-first where relevant: point to a concrete on-site calculator with a specific reason to use it
- Firm but honest: acknowledge where outcomes are genuinely case-specific and a reader needs a specialist
- No marketing language. No vague reassurance. No adversarial framing.

JURISDICTION
- Default to England and Wales law and process. State the jurisdiction explicitly in any post covering divorce process, financial orders, or maintenance (these differ in Scotland and Northern Ireland). Where Scotland's rules differ meaningfully (e.g. the different divorce process and the matrimonial-property regime), say so explicitly rather than implying UK-wide uniformity.

FORMATTING
- H2 subheadings for each major section (3 to 6 per post)
- Short paragraphs (2 to 4 sentences), never walls of text
- Bullet lists for 3 or more parallel items
- At least one simple HTML table per post (mandatory, see structural rule 6), placed where it genuinely aids comparison (e.g., court fee bands, CMS percentage rates, CGT rate bands)
- Bold key figures and rules: rates, thresholds, dates, deadlines
- Cluster post word count: 1,200 to 1,600 words (minimum 1,200). Pillar post word count: 2,000 to 2,800 words (minimum 2,000).

STRUCTURAL RULES
1. Open with the most useful fact or figure in the first two sentences. Do NOT open with a question or a rhetorical framing.
2. State what the post covers in sentence three (do not use "In this article we will look at..." phrasing).
3. Close with a 2 to 3 sentence summary followed by one natural CTA sentence pointing to the relevant page (/financial-settlements, /pension-sharing, /capital-gains-tax-divorce, or the matched /for/* page). No heading above the closing summary.
4. Every H2 must contain at least one of these anchor terms: divorce, financial settlement, pension, maintenance, family home.
5. Worked example mandatory for pillars: every pillar post must contain at least one worked numerical example using the locked hallucination-zone figures. Show actual pounds and pence. Example: work through a CMS basic-rate calculation for a paying parent on a given gross weekly income with two children, then show the Collect and Pay uplift.
6. Table mandatory for all posts: every post must include at least one HTML table (use <table>, <thead>, <tbody>, <tr>, <th>, <td>).
7. FAQ minimum: every post must include a minimum of 6 FAQ pairs in the frontmatter faqs array, covering practical edge cases and operational questions, not just restating body points. At least two FAQs must address a scenario or "what if" question.
8. Calculator CTA: every post must reference at least one on-site calculator with a concrete, specific reason to use it (not a generic "try our calculator" line). Calculator pages are at /calculators/[slug].
9. Statutory and fee figures must match the locked figures below VERBATIM. Do not round, do not use a different year's figure, do not paraphrase a rate. Write ranges as "£X to £Y", never with a dash.
10. Every factual claim must be citable to gov.uk, HMRC, HMCTS, the Child Maintenance Service, or MoneyHelper guidance.
11. Never give legal, financial, or tax advice. Always informational, always pointing toward a specialist handoff for anything case-specific (a family solicitor, mediator, or regulated financial adviser as relevant) without naming any specific firm.

OUTPUT FORMAT, use exactly these ==markers==:
==name==          (H1 title, work the divorce/settlement/pension angle into the title naturally)
==slug==          (lowercase-hyphenated, 4 to 7 words, include primary keyword)
==metaTitle==     (50 to 60 chars, include primary keyword)
==metaDescription== (140 to 160 chars, include primary keyword, clear benefit)
==category==      (one of: Financial Settlements, Pensions and Divorce, Tax on Divorce, The Family Home, Maintenance and Support, Process and Costs)
==excerpt==       (2 sentences, no em-dashes, suitable for blog card)
==content==       (full HTML body: <h2>, <p>, <ul>/<ol>, <strong>, <table> only, no <h1>, no inline styles)

LOCKED FIGURES (use verbatim, always label with source/date where relevant)
- Divorce or dissolution application fee £628 (from 13 July 2026) [SI 2026/642]
- Financial consent order fee £62 (uncontested, by agreement)
- Contested financial order application fee £321 (Form A)
- Help with Fees (form EX160) income thresholds: single applicant £1,420, couple £2,130, per-child uplift +£425 (child aged 0 to 13) or +£710 (child aged 14 or over); taper reduces help by 50p for each £1 of monthly income above the threshold, capped at the fee; disposable-capital limits £4,250 (for a fee up to £1,420) and £16,000 (if the applicant or their partner is aged 66 or over); refund window 3 months
- Family Mediation Voucher scheme: £500 contribution per family for cases involving a dispute about a child; scheme extended to March 2027
- Child Maintenance Service Collect and Pay: paying parent pays +20% on top of the calculated amount, receiving parent has 4% deducted; Direct Pay is free to both parents
- CMS gross weekly income rates: reduced rate £7 flat plus a percentage; basic rate 12% (1 child), 16% (2 children), 19% (3 or more children); basic-plus rate 9%/12%/15% on the slice of income from £800.01 to £3,000
- No-fault divorce minimum timeline 26 weeks: 20-week reflection period, then a 6-week-and-1-day wait to the final order [Divorce, Dissolution and Separation Act 2020, in force 6 April 2022]
- CGT on transfers between separating spouses or civil partners: no gain, no loss for up to 3 tax years after the tax year of separation, or unlimited under a formal agreement or court order [Finance Act 2023, TCGA 1992 s.58, from 6 April 2023]
- CGT annual exempt amount 2026/27 £3,000; residential-property CGT rates 18% (basic-rate band) and 24% (above); UK residential property gains reported and paid within 60 days of completion
- Pension sharing orders: Welfare Reform and Pensions Act 1999, available for divorces started on or after 1 December 2000; 4-month implementation period; only the protected-payment element of the new state pension can be shared

PROHIBITED CONTENT
- NEVER produce a "best divorce solicitors" or "top family lawyers" listicle. Faceless brand.
- NEVER offer to represent a reader or provide legal, financial, or tax advice directly ("we can represent you", "our solicitors", "our advisers").
- NEVER recommend a specific pension, pension product, provider, or pension transfer/withdrawal. Pensions content is information-only (how sharing, offsetting, and attachment work, not what to buy).
- NEVER frame anything as a mis-selling, mis-sold, compensation, or claims-management opportunity.
- NEVER present child maintenance or child arrangements as a tactic to gain advantage over the other parent. Keep it factual and child-focused.
- NEVER claim SRA or FCA regulation or any regulatory status this service does not hold.

PROHIBITED PHRASES
- Em-dashes or en-dashes (use commas, parentheses, full stops, or the word "to" for ranges instead)
- delve, leverage, harness, unlock, supercharge, dive into
- landscape, tapestry, intricate, seamless
- "In today's world", "in the world of", "when it comes to", "navigating the complex"
- "we can represent you", "our solicitors", "our advisers", "legal advice from us", "financial advice from us"
- "regulated by the SRA", "regulated by the Solicitors Regulation Authority", "regulated by the FCA", "regulated by the Financial Conduct Authority"
- "mis-sold", "mis-selling", "no win no fee", "compensation claim"
- "pension transfer", "transfer your pension", "withdraw your pension", "best pension for divorce", "recommend this pension"
- Client names, firm names, or testimonials with identifying detail
- Pricing information for the service (direct readers to /contact)
- Do not write cluster posts under 1,200 words. If you cannot reach 1,200 words with quality content on this topic, flag it as requiring a topic expansion rather than submitting thin content.

LEAD-GEN MODEL
This site is an independent information service with free calculators, connecting readers to vetted specialists (family solicitors, mediators, regulated financial advisers) for case-specific advice. A fee may be received for a referral. Do not name any firm or include service pricing in posts. Anonymised examples only ("a separating couple recently faced this scenario", with no name or identifying detail). One CTA per post.
""".strip()


SITE_CONFIG: dict = {
    # --- Identity & routing ---------------------------------------------------
    "site_key": "divorce-finances",
    "display_name": "Divorce Finance Compass",
    "domain": "www.divorce-finance-placeholder.co.uk",
    "site_base_url": "https://www.divorce-finance-placeholder.co.uk",
    "author_name": "Divorce Finance Compass Editorial Team",
    "output_dir": "divorce-finances/web/content/blog",
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
    # Config value is a fallback; actual generation runs via Opus subagents
    # (locked 2026-07-23: Opus-only content).
    "llm_provider": "anthropic",
    "llm_model": "claude-sonnet-4-6",
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
    "default_audience_link": "/financial-settlements",

    # --- Internal pages (used by link validator and system prompt) ------------
    "internal_pages": [
        "/financial-settlements",
        "/pension-sharing",
        "/capital-gains-tax-divorce",
        "/calculators",
        "/for/divorcing-homeowners",
        "/for/business-owners",
        "/for/separated-parents",
        "/for/over-50s",
        "/research/uk-child-maintenance-tracker",
        "/research/uk-divorce-financial-remedy-index",
    ],

    # --- Prohibited topics -----------------------------------------------------
    "prohibited_topics": [
        "pension product recommendations or transfers",
        "mis-selling or mis-sold pension framing",
        "claims management or compensation claims",
        "child arrangements as a tactical advantage",
        "contentious litigation strategy",
    ],

    # --- System prompts -------------------------------------------------------
    "system_prompt": _BLOG_SYSTEM_PROMPT,
    "blog_system_prompt": _BLOG_SYSTEM_PROMPT,  # legacy alias; content_pipeline uses "system_prompt"
    "pillar_system_prompt": None,

    # --- SEO persona ----------------------------------------------------------
    "seo_persona": {
        "audience": (
            "People going through divorce or separation in England and Wales,"
            " and separated parents. Wants practical next steps, cost/time"
            " clarity, and calculator-first answers, not legal jargon or"
            " adversarial framing."
        ),
        "language_cues": [
            "plain English", "calm", "non-judgemental", "child-focused",
            "financial settlement", "consent order", "clean break",
            "pension sharing", "cash equivalent value", "child maintenance",
            "Child Maintenance Service", "no gain no loss", "60-day report",
            "no-fault divorce", "England and Wales",
        ],
        "preferred_hooks": [
            "practical next step",
            "cost/time clarity (£ figure or weeks-to-final-order)",
            "calculator-first",
            "gov.uk/HMRC/HMCTS/CMS/MoneyHelper-cited figure with date",
        ],
        "banned_openers_extra": [
            "Going through a divorce",
            "If you're getting divorced",
            "Divorce is never easy",
            "The end of a marriage",
            "Separating from your partner",
        ],
        "brand_authority": (
            "independent information service with free calculators,"
            " connects readers to vetted specialists (a fee may be received"
            " for a referral)"
        ),
        "geo_qualifiers": ["UK", "England and Wales"],
        "voice_signature": (
            "calm, non-judgemental, plain-English, calculator-first, extra-"
            "sensitive on children. Never legal, financial, or tax advice;"
            " always informational with a specialist handoff."
        ),
    },

    # --- URL format -----------------------------------------------------------
    "canonical_format": "/blog/{category_slug}/{slug}",
    "category_slug_rules": {"and_replaces_ampersand": True},

    # --- Behaviour flags ------------------------------------------------------
    "use_research_bundle": True,
    "fetch_image": True,
}
