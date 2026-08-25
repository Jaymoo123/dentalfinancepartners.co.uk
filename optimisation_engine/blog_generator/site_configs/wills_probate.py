"""Probate Compass (wills-probate) site configuration.

Placeholder brand "Probate Compass" / domain "probate-compass-placeholder"
(2026-07-24). Real brand + domain decided at owner gate G1 pre-deploy; all
content bodies are brand-agnostic (zero brand-name mentions) so the rewrite
at G1 is a metadata-only swap.

All content rules are defined inline here (no legacy per-site config_supabase.py
to import from; mirrors construction_cis.py structure).
"""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]


_POST_CATEGORIES = [
    "Probate Process",
    "Making a Will",
    "Inheritance Tax",
    "Executors",
    "Intestacy",
    "Pensions and IHT 2027",
    "Power of Attorney",
]

_INTERNAL_LINK_SLUGS: list[str] = [
    # Hubs
    "/probate",
    "/wills",
    "/inheritance-tax",
    "/lasting-power-of-attorney",
    # Full live corpus (146 posts), refreshed 2026-08-04
    "/blog/executors/can-executor-also-be-beneficiary",
    "/blog/executors/can-executor-resign-or-delegate-duties",
    "/blog/executors/estate-accounts-for-executors",
    "/blog/executors/executor-duties-and-responsibilities",
    "/blog/executors/executor-duties-checklist",
    "/blog/executors/executor-fees-uk-what-can-you-charge",
    "/blog/executors/executor-property-insurance-obligations",
    "/blog/executors/executor-step-by-step-guide",
    "/blog/executors/first-30-days-for-executors",
    "/blog/executors/renouncing-executorship-vs-reserving-power",
    "/blog/inheritance-tax/7-year-rule-gifts-inheritance-tax",
    "/blog/inheritance-tax/agricultural-relief-inheritance-tax-basics",
    "/blog/inheritance-tax/business-relief-inheritance-tax-basics",
    "/blog/inheritance-tax/capital-gains-tax-on-inherited-property",
    "/blog/inheritance-tax/declaration-of-trust-for-jointly-held-property",
    "/blog/inheritance-tax/deed-of-variation-explained",
    "/blog/inheritance-tax/do-you-need-a-professional-rics-valuation-for-probate",
    "/blog/inheritance-tax/how-many-valuations-do-you-need-for-probate",
    "/blog/inheritance-tax/how-to-value-an-estate-for-probate",
    "/blog/inheritance-tax/iht400-vs-iht205-excepted-estates-walkthrough",
    "/blog/inheritance-tax/inheritance-tax-on-trusts-10-year-charge",
    "/blog/inheritance-tax/inheritance-tax-rates-and-allowances-explained",
    "/blog/inheritance-tax/inheritance-tax-threshold-calculator-how-it-works",
    "/blog/inheritance-tax/inheritance-tax-threshold-married-couples-rnrb",
    "/blog/inheritance-tax/inheritance-tax-threshold-scotland",
    "/blog/inheritance-tax/inheritance-tax-threshold-uk",
    "/blog/inheritance-tax/leaving-10-percent-to-charity-36-rate-iht",
    "/blog/inheritance-tax/life-insurance-written-in-trust-explained",
    "/blog/inheritance-tax/normal-expenditure-out-of-income-exemption",
    "/blog/inheritance-tax/paying-inheritance-tax-before-probate-direct-payment-scheme",
    "/blog/inheritance-tax/property-protection-trust-in-a-will",
    "/blog/inheritance-tax/refusing-or-disclaiming-an-inheritance",
    "/blog/inheritance-tax/stamp-duty-implications-during-probate",
    "/blog/inheritance-tax/taper-relief-gifts-inheritance-tax",
    "/blog/inheritance-tax/the-nil-rate-band-explained",
    "/blog/inheritance-tax/trust-registration-service-requirements",
    "/blog/inheritance-tax/wedding-gift-small-gift-exemptions-inheritance-tax",
    "/blog/inheritance-tax/what-counts-as-a-gift-inheritance-tax",
    "/blog/inheritance-tax/what-happens-to-a-business-when-the-owner-dies",
    "/blog/intestacy/deathbed-marriages-and-effect-on-intestacy",
    "/blog/intestacy/intestacy-rules-spouse-and-children",
    "/blog/intestacy/intestacy-rules-unmarried-partners",
    "/blog/intestacy/scottish-intestacy-rules-explained",
    "/blog/intestacy/who-inherits-if-there-is-no-will",
    "/blog/making-a-will/blended-families-and-unmarried-partners-inheritance-rights",
    "/blog/making-a-will/finding-a-solicitor-or-will-writer-near-you",
    "/blog/making-a-will/guardianship-clauses-for-children-in-a-will",
    "/blog/making-a-will/how-much-does-it-cost-to-make-a-will",
    "/blog/making-a-will/how-to-make-a-will-in-the-uk",
    "/blog/making-a-will/legal-rights-in-scotland-why-you-cant-fully-disinherit-family",
    "/blog/making-a-will/letters-of-wishes-explained",
    "/blog/making-a-will/making-a-will-online-or-for-free-what-you-need-to-know",
    "/blog/making-a-will/mental-capacity-dementia-and-will-validity",
    "/blog/making-a-will/mirror-wills-vs-mutual-wills-whats-the-difference",
    "/blog/making-a-will/pets-and-inheritance-providing-for-pets-in-a-will",
    "/blog/making-a-will/remote-and-video-witnessing-of-wills",
    "/blog/making-a-will/storing-a-will-and-the-national-will-register",
    "/blog/making-a-will/updating-a-will-after-marriage-or-divorce-revocation-rules",
    "/blog/making-a-will/what-makes-a-will-valid-signing-and-witnessing-rules",
    "/blog/pensions-and-iht-2027/db-vs-dc-pension-inheritance-tax",
    "/blog/pensions-and-iht-2027/death-in-service-benefits-iht-2027",
    "/blog/pensions-and-iht-2027/discretionary-pension-trust-iht-2027",
    "/blog/pensions-and-iht-2027/executor-pension-provider-information-death-2027",
    "/blog/pensions-and-iht-2027/executor-pension-reporting-iht-2027",
    "/blog/pensions-and-iht-2027/pension-death-benefits-tax-current-rules",
    "/blog/pensions-and-iht-2027/pension-iht-2027-explained",
    "/blog/pensions-and-iht-2027/pension-iht-2027-married-couples",
    "/blog/pensions-and-iht-2027/pension-iht-2027-timeline-key-dates",
    "/blog/pensions-and-iht-2027/pension-iht-reform-guide-2027",
    "/blog/pensions-and-iht-2027/pension-scheme-hmrc-reporting-death-benefits-2027",
    "/blog/pensions-and-iht-2027/pensions-iht-2027-changes",
    "/blog/pensions-and-iht-2027/rnrb-taper-pension-inheritance-tax",
    "/blog/pensions-and-iht-2027/unused-pension-pot-inheritance-tax-2027",
    "/blog/pensions-and-iht-2027/who-is-affected-pension-iht-2027",
    "/blog/power-of-attorney/court-of-protection-guide",
    "/blog/power-of-attorney/lpa-vs-deputyship-after-loss-of-capacity",
    "/blog/power-of-attorney/power-of-attorney-vs-probate",
    "/blog/power-of-attorney/property-and-finance-lpa-vs-health-and-welfare-lpa-whats-the-difference",
    "/blog/power-of-attorney/registering-a-lasting-power-of-attorney-process-and-costs",
    "/blog/probate-process/are-probate-fees-tax-deductible",
    "/blog/probate-process/beneficiary-living-in-an-inherited-house",
    "/blog/probate-process/bereavement-support-payment-and-dwp-bereavement-benefits-how-they-interact-with-an-estate",
    "/blog/probate-process/can-a-trust-help-you-avoid-probate",
    "/blog/probate-process/confirmation-the-scottish-probate-process-explained",
    "/blog/probate-process/digital-assets-and-digital-legacy-after-death",
    "/blog/probate-process/do-you-need-a-death-certificate-to-apply-for-probate",
    "/blog/probate-process/do-you-need-a-solicitor-for-probate",
    "/blog/probate-process/do-you-need-a-solicitor-or-lawyer-to-get-probate",
    "/blog/probate-process/do-you-need-a-valuation-before-you-can-get-probate",
    "/blog/probate-process/do-you-need-probate",
    "/blog/probate-process/do-you-need-probate-confirmation-in-scotland",
    "/blog/probate-process/do-you-need-probate-for-a-small-or-excepted-estate",
    "/blog/probate-process/do-you-need-probate-for-bank-accounts-isas-and-life-insurance",
    "/blog/probate-process/do-you-need-probate-for-jointly-owned-assets",
    "/blog/probate-process/do-you-need-probate-if-there-is-a-will",
    "/blog/probate-process/do-you-need-probate-if-there-is-no-will-or-no-assets",
    "/blog/probate-process/do-you-need-probate-if-youre-the-executor-and-sole-beneficiary",
    "/blog/probate-process/do-you-need-probate-to-sell-or-transfer-a-property",
    "/blog/probate-process/do-you-need-probate-when-a-parent-dies",
    "/blog/probate-process/do-you-need-probate-when-spouse-dies",
    "/blog/probate-process/do-you-need-to-complete-iht205-or-iht400-before-probate",
    "/blog/probate-process/executor-costs-and-fees-explained",
    "/blog/probate-process/grant-of-probate-vs-letters-of-administration",
    "/blog/probate-process/how-long-does-probate-take",
    "/blog/probate-process/how-many-copies-of-the-grant-of-probate-do-you-need",
    "/blog/probate-process/how-much-does-a-grant-of-probate-cost",
    "/blog/probate-process/how-much-does-a-probate-valuation-cost",
    "/blog/probate-process/how-much-does-diy-probate-cost",
    "/blog/probate-process/how-much-does-it-cost-to-contest-probate",
    "/blog/probate-process/how-much-does-probate-cost",
    "/blog/probate-process/how-much-does-probate-cost-for-a-simple-estate",
    "/blog/probate-process/how-much-do-probate-court-fees-cost",
    "/blog/probate-process/how-to-contest-a-will-in-the-uk",
    "/blog/probate-process/how-to-fill-in-the-probate-application-form-correctly",
    "/blog/probate-process/how-to-know-if-you-need-probate",
    "/blog/probate-process/inheritance-act-1975-claims-explained",
    "/blog/probate-process/insolvent-estates-what-happens-when-debts-exceed-assets",
    "/blog/probate-process/international-probate-and-overseas-assets",
    "/blog/probate-process/joint-bank-accounts-and-survivorship-after-death",
    "/blog/probate-process/missing-beneficiaries-and-probate-genealogy",
    "/blog/probate-process/missing-will-what-to-do-if-you-cant-find-one",
    "/blog/probate-process/paying-for-a-funeral-from-the-estate-before-probate",
    "/blog/probate-process/probate-and-estate-administration-common-questions",
    "/blog/probate-process/probate-and-inheritance-advance-loans",
    "/blog/probate-process/probate-and-selling-the-deceaseds-property-how-it-works-with-conveyancing",
    "/blog/probate-process/probate-bonds-oaths-and-court-hearings-explained",
    "/blog/probate-process/probate-checker-how-to-find-out-if-you-need-probate",
    "/blog/probate-process/probate-costs-in-england-wales-and-scotland-compared",
    "/blog/probate-process/probate-disputes-and-caveats-an-overview",
    "/blog/probate-process/probate-forms-explained",
    "/blog/probate-process/probate-solicitor-cost",
    "/blog/probate-process/probate-timeline-and-cost-what-to-expect",
    "/blog/probate-process/proprietary-estoppel-in-probate-disputes",
    "/blog/probate-process/registering-a-death-step-by-step",
    "/blog/probate-process/right-to-organise-a-funeral",
    "/blog/probate-process/section-27-notice-in-probate-explained",
    "/blog/probate-process/success-rate-of-contesting-a-will-uk",
    "/blog/probate-process/tell-us-once-service-explained",
    "/blog/probate-process/unclaimed-estates-and-bona-vacantia",
    "/blog/probate-process/valuing-personal-possessions-chattels-for-probate",
    "/blog/probate-process/what-documents-do-you-need-to-apply-for-probate",
    "/blog/probate-process/what-does-a-probate-solicitor-do",
    "/blog/probate-process/what-does-it-mean-to-contest-a-will",
    "/blog/probate-process/which-probate-form-do-you-need-pa1p-or-pa1a",
    "/blog/probate-process/will-fraud-forgery-and-undue-influence-claims",
    "/blog/probate-process/wills-and-probate-solicitor-near-you",
]

_ANCHOR_TERMS = [
    "probate",
    "inheritance tax",
    "estate",
    "executor",
    "will",
]

_HALLUCINATION_ZONES = [
    "Nil-rate band £325,000 (frozen)",
    "Residence nil-rate band £175,000, tapered £1 per £2 above £2,000,000",
    "IHT rates 40% standard, 36% where 10%+ of net estate left to charity",
    "Annual gift exemption £3,000; small gifts £250; wedding gifts £5,000 child / £2,500 grandchild / £1,000 other",
    "Gift taper relief 3-7 years: effective rates 32%/24%/16%/8%",
    "Probate application fee £526 for estates over £5,000, no fee at or below (from 13 July 2026); sealed copies £2 each with the application",
    "Statutory legacy £322,000 (England and Wales intestacy)",
    (
        "Pensions: unused pension funds and death benefits enter IHT from 6 April 2027;"
        " personal representatives liable; death in service benefits EXCLUDED;"
        " 10,500 estates newly liable and 38,500 paying more per year (HMRC TIIN 21 July 2025),"
        " average increase around £34,000"
    ),
    "HMCTS probate grant timeliness 2026 Q1: mean 6.4 weeks all channels, digital 4.5 weeks (82.6% of grants), paper 16.5 weeks",
    "OPG LPA registration fee £92 per LPA (from 17 November 2025)",
]

_BANNED_PHRASES = [
    "—", "–",
    "in today's", "in the world of", "when it comes to", "in an ever-evolving",
    "navigating the complex",
    "delve", "leverage", "harness", "unlock", "dive into", "supercharge",
    "landscape", "tapestry", "intricate", "seamless",
    "we can write your will",
    "we will write your will",
    "our solicitors",
    "legal advice from us",
    "regulated by the SRA",
    "regulated by the Solicitors Regulation Authority",
    "equity release",
    "pension transfer",
    "transfer your pension",
    "withdraw your pension",
]

_AUDIENCE_LINK_MAP: list[tuple[list[str], str]] = [
    (["executor", "administrator", "personal representative", "grant of probate", "letters of administration"], "/for/executors"),
    (["surviving spouse", "widow", "widower", "spouse exemption", "bereaved spouse"], "/for/surviving-spouses"),
    (["pension", "pension fund", "death benefits", "2027 pension iht", "unused pension"], "/for/pension-holders-2027"),
    (["business owner", "business relief", "family business", "company shares", "sole trader estate"], "/for/business-owners"),
    (["probate application", "grant of probate", "probate fee", "probate registry", "probate timeline"], "/probate"),
    (["will", "making a will", "last will and testament", "codicil"], "/wills"),
    (["inheritance tax", "iht", "nil-rate band", "residence nil-rate band", "estate tax"], "/inheritance-tax"),
    (["lasting power of attorney", "lpa", "power of attorney", "opg"], "/lasting-power-of-attorney"),
    (["probate wait times", "grant timeliness", "hmcts data"], "/research/uk-probate-wait-times-index"),
    (["pension inheritance tax data", "2027 pension iht research"], "/research/pensions-inheritance-tax-2027"),
]

_BLOG_SYSTEM_PROMPT = """
# Quality standard: Property-parity. Every post must read as the definitive UK resource on its topic.
# Minimum signals: 1 worked example (pillars), 1 HTML table, 6+ FAQs, 3+ internal links, calculator CTA where relevant.
# YMYL note: this is a bereavement-adjacent, high-stakes financial/legal topic. Precision and tone both matter.

You are a faceless editorial team writing practical, technically precise guides on UK probate, wills, and inheritance tax for an independent information service. You are NOT a solicitor and this is NOT legal advice.

AUDIENCE
- UK executors and administrators (primary): often recently bereaved, dealing with probate for the first time, need practical next steps and cost/time clarity.
- People planning their own estates (secondary): writing a will, setting up a Lasting Power of Attorney, or thinking about inheritance tax exposure ahead of time.
- Pension holders affected by the April 2027 pension IHT change (growing segment): need to understand a genuinely new liability.

VOICE AND TONE
- British English throughout: organisation, licence (noun), favour, programme, whilst, practise (verb) vs practice (noun)
- Plain English, empathetic, no jargon without explanation — many readers are reading this in the middle of a bereavement
- Bereavement-sensitive: never brisk or transactional in tone when discussing a death; be clear and calm, not clinical
- Evidence-based: cite gov.uk, HMRC, HMCTS, or OPG guidance and year-labelled figures wherever a claim is made
- Practical next step and cost/time clarity as entry angles: readers want to know what to do next, how long it takes, and what it costs
- Calculator-first where relevant: point to a concrete on-site calculator with a specific reason to use it
- Firm but honest: acknowledge where rules are genuinely unclear or a case needs a specialist
- No marketing language. No vague reassurance.

JURISDICTION
- Default to England and Wales law and process. State the jurisdiction explicitly in any post covering probate process, intestacy, or LPA (these differ in Scotland and Northern Ireland). Where Scotland's rules differ meaningfully (e.g. confirmation vs probate, forced heirship), say so explicitly rather than implying UK-wide uniformity.

FORMATTING
- H2 subheadings for each major section (3 to 6 per post)
- Short paragraphs (2 to 4 sentences), never walls of text
- Bullet lists for 3 or more parallel items
- One simple table permitted where it genuinely aids comparison (e.g., IHT rates, probate fee bands, gift taper relief rates)
- Bold key figures and rules: rates, thresholds, dates
- Cluster post word count: 1,200 to 1,600 words (minimum 1,200). Pillar post word count: 2,000 to 2,800 words (minimum 2,000).

STRUCTURAL RULES
1. Open with the most useful fact or figure in the first two sentences. Do NOT open with a question or a rhetorical framing.
2. State what the post covers in sentence three (do not use "In this article we will look at..." phrasing).
3. Close with a 2 to 3 sentence summary followed by one natural CTA sentence pointing to the relevant page (/probate, /wills, /inheritance-tax, /lasting-power-of-attorney, or the matched /for/* page). No heading above the closing summary.
4. Every H2 must contain at least one of these anchor terms: probate, inheritance tax, estate, executor, will.
5. Worked example mandatory for pillars: every pillar post must contain at least one worked numerical example using the locked hallucination-zone figures. Show actual pounds and pence. Example: an estate of £500,000 with nil-rate band £325,000 and residence nil-rate band £175,000 fully available pays no IHT; work through the arithmetic.
6. Table mandatory for all posts: every post must include at least one HTML table (use <table>, <thead>, <tbody>, <tr>, <th>, <td>).
7. FAQ minimum: every post must include a minimum of 6 FAQ pairs in the frontmatter faqs array, covering practical edge cases and operational questions, not just restating body points. At least two FAQs must address a scenario or "what if" question.
8. Calculator CTA: every post must reference at least one on-site calculator with a concrete, specific reason to use it (not a generic "try our calculator" line). Calculator pages are at /calculators/[slug].
9. Statutory figures must match the locked figures below VERBATIM. Do not round, do not use a different tax year's figure, do not paraphrase a rate.
10. Every factual claim must be citable to gov.uk, HMRC, HMCTS, or OPG guidance.
11. Never give legal or financial advice. Always informational, always pointing toward a specialist handoff for anything case-specific (a solicitor, financial adviser, or authorised OPG/probate professional as relevant) without naming any specific firm.

OUTPUT FORMAT — use exactly these ==markers==:
==name==          (H1 title, work the probate/IHT/will angle into the title naturally)
==slug==          (lowercase-hyphenated, 4 to 7 words, include primary keyword)
==metaTitle==     (50 to 60 chars, include primary keyword)
==metaDescription== (140 to 160 chars, include primary keyword, clear benefit)
==category==      (one of: Probate Process, Making a Will, Inheritance Tax, Executors, Intestacy, Pensions and IHT 2027, Power of Attorney)
==excerpt==       (2 sentences, no em-dashes, suitable for blog card)
==content==       (full HTML body: <h2>, <p>, <ul>/<ol>, <strong>, <table> only — no <h1>, no inline styles)

LOCKED STATUTORY FIGURES (use verbatim, always label with source/date where relevant)
- Nil-rate band £325,000 (frozen)
- Residence nil-rate band £175,000, tapered £1 per £2 above £2,000,000
- IHT rates 40% standard, 36% where 10%+ of net estate left to charity
- Annual gift exemption £3,000; small gifts £250; wedding gifts £5,000 child / £2,500 grandchild / £1,000 other
- Gift taper relief 3-7 years: effective rates 32%/24%/16%/8%
- Probate application fee £526 for estates over £5,000, no fee at or below (from 13 July 2026); sealed copies £2 each with the application
- Statutory legacy £322,000 (England and Wales intestacy)
- Pensions: unused pension funds and death benefits enter IHT from 6 April 2027; personal representatives liable; death in service benefits EXCLUDED; 10,500 estates newly liable and 38,500 paying more per year (HMRC TIIN 21 July 2025), average increase around £34,000
- HMCTS probate grant timeliness 2026 Q1: mean 6.4 weeks all channels, digital 4.5 weeks (82.6% of grants), paper 16.5 weeks
- OPG LPA registration fee £92 per LPA (from 17 November 2025)

PROHIBITED CONTENT
- NEVER produce a "best probate solicitors" or "top wills solicitors" listicle. Faceless brand.
- NEVER offer to write a will or provide legal advice directly ("we can write your will", "our solicitors").
- NEVER cover equity release, pension transfers/withdrawals, or any pension product recommendation.
- NEVER cover contentious probate legal strategy (disputes, litigation tactics), personal injury, or claims management.
- NEVER claim SRA regulation or any regulatory status this service does not hold.

PROHIBITED PHRASES
- Em-dashes or en-dashes (use commas, parentheses, or full stops instead)
- delve, leverage, harness, unlock, supercharge, dive into
- landscape, tapestry, intricate, seamless
- "In today's world", "in the world of", "when it comes to", "navigating the complex"
- "we can write your will", "we will write your will", "our solicitors", "legal advice from us"
- "regulated by the SRA", "regulated by the Solicitors Regulation Authority"
- "equity release", "pension transfer", "transfer your pension", "withdraw your pension"
- Client names, firm names, or testimonials with identifying detail
- Pricing information (direct readers to /contact)
- Do not write cluster posts under 1,200 words. If you cannot reach 1,200 words with quality content on this topic, flag it as requiring a topic expansion rather than submitting thin content.

LEAD-GEN MODEL
This site is an independent information service with free calculators, connecting readers to vetted specialists (solicitors, financial advisers, probate professionals) for case-specific advice. Do not name any firm or include pricing in posts. Anonymised examples only ("an executor recently encountered this scenario" — no name or identifying detail). One CTA per post.
""".strip()


SITE_CONFIG: dict = {
    # --- Identity & routing ---------------------------------------------------
    "site_key": "wills-probate",
    "display_name": "Probate Compass",
    "domain": "www.probate-compass-placeholder.co.uk",
    "site_base_url": "https://www.probate-compass-placeholder.co.uk",
    "author_name": "Probate Compass Editorial Team",
    "output_dir": "wills-probate/web/content/blog",
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
    "default_audience_link": "/probate",

    # --- Internal pages (used by link validator and system prompt) ------------
    "internal_pages": [
        "/probate",
        "/wills",
        "/inheritance-tax",
        "/lasting-power-of-attorney",
        "/calculators",
        "/for/executors",
        "/for/surviving-spouses",
        "/for/pension-holders-2027",
        "/research/uk-probate-wait-times-index",
        "/research/pensions-inheritance-tax-2027",
    ],

    # --- Prohibited topics -----------------------------------------------------
    "prohibited_topics": [
        "equity release",
        "pension product recommendations or transfers",
        "contentious probate legal strategy",
        "personal injury",
        "claims management",
    ],

    # --- System prompts -------------------------------------------------------
    "system_prompt": _BLOG_SYSTEM_PROMPT,
    "blog_system_prompt": _BLOG_SYSTEM_PROMPT,  # legacy alias; content_pipeline uses "system_prompt"
    "pillar_system_prompt": None,

    # --- SEO persona ----------------------------------------------------------
    "seo_persona": {
        "audience": (
            "UK executors, administrators, and people planning their estates,"
            " often recently bereaved. Wants practical next steps, cost/time"
            " clarity, and calculator-first answers, not legal jargon."
        ),
        "language_cues": [
            "plain English", "empathetic", "no jargon without explanation",
            "grant of probate", "letters of administration", "nil-rate band",
            "residence nil-rate band", "IHT 40%", "statutory legacy",
            "gift taper relief", "OPG", "lasting power of attorney",
            "April 2027 pension IHT", "England and Wales",
        ],
        "preferred_hooks": [
            "practical next step",
            "cost/time clarity (£ figure or weeks-to-grant)",
            "calculator-first",
            "gov.uk/HMRC/HMCTS/OPG-cited figure with date",
        ],
        "banned_openers_extra": [
            "For executors",
            "If you're an executor",
            "As an executor",
            "Losing a loved one",
            "Dealing with the death of",
        ],
        "brand_authority": (
            "independent information service with free calculators,"
            " connects readers to vetted specialists"
        ),
        "geo_qualifiers": ["UK", "England and Wales"],
        "voice_signature": (
            "bereavement-sensitive, plain-English, calculator-first."
            " Never legal or financial advice; always informational with a"
            " specialist handoff."
        ),
    },

    # --- URL format -----------------------------------------------------------
    "canonical_format": "/blog/{category_slug}/{slug}",
    "category_slug_rules": {"and_replaces_ampersand": True},

    # --- Behaviour flags ------------------------------------------------------
    "use_research_bundle": True,
    "fetch_image": True,
}
