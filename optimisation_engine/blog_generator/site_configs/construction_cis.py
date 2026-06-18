"""Trade Tax Specialists (construction-cis) site configuration.

All content rules are defined inline here (no legacy per-site config_supabase.py
to import from; this site was scaffolded after the Phase 4 consolidation).
"""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]


_POST_CATEGORIES = [
    "CIS Basics",
    "CIS Compliance",
    "CIS Refunds",
    "CIS Advanced",
    "VAT and MTD",
    "Expenses",
    "Limited Company",
    "Software and Tools",
]

# Slugs that will exist after the first content batch. Used for internal linking.
_INTERNAL_LINK_SLUGS = [
    "what-is-cis",
    "cis-gross-payment-status-guide",
    "cis-sole-trader-vs-limited-company",
    "how-to-register-for-cis",
    "cis-deduction-rates-explained",
    "cis-tax-refund-how-to-claim",
    "allowable-expenses-cis-subcontractor",
    "vat-reverse-charge-construction",
    "cis-limited-company-reclaim",
    "cis-monthly-return-guide",
    "mtd-income-tax-cis",
    "cis-subcontractor-verification",
    "what-is-a-cis-accountant",
    "cis-vs-paye",
    "cis-nil-return-explained",
]

_ANCHOR_TERMS = [
    "CIS",
    "Construction Industry Scheme",
    "subcontractor",
    "CIS deduction",
    "CIS refund",
    "gross payment status",
    "GPS",
    "CIS registration",
    "CIS accountant",
    "construction accountant",
    "CIS300",
    "nil return",
    "VAT reverse charge",
    "domestic reverse charge",
    "DRC",
    "MTD ITSA",
    "Making Tax Digital",
    "20% deduction",
    "30% deduction",
    "EPS",
    "construction tax",
    "sole trader subcontractor",
    "limited company director",
    "main contractor",
    "allowable expenses",
    "self-assessment",
]

_HALLUCINATION_ZONES = [
    (
        "CIS deduction rates are labour-only: 0% (gross payment status), 20% (registered subcontractor),"
        " 30% (unregistered subcontractor). The deduction applies to the LABOUR element of the payment ONLY."
        " Materials costs are EXCLUDED from the deduction base. This is one of the most commonly"
        " misunderstood rules — always state it explicitly."
    ),
    (
        "Gross payment status (GPS) turnover test (2026/27):"
        " Sole trader: £30,000 net CIS turnover. Partnership: £30,000 per partner OR £100,000 total."
        " Limited company: £30,000 per director OR £100,000 total."
        " Closely controlled company (5 or fewer controllers): £30,000 per controller."
        " 'Net' = excludes VAT and cost of materials purchased for jobs."
        " Measurement period: last 12 months of CIS-relevant construction work."
        " All three tests (business, turnover, compliance) must be passed."
    ),
    (
        "April 2026 GPS anti-fraud changes (Finance Bill 2026, in force 6 April 2026):"
        " HMRC can revoke GPS immediately without advance notice where a contractor 'knew or should have"
        " known' about fraudulent supply-chain connections — no intent required, failure to carry out due"
        " diligence is sufficient. Five-year reapplication ban replaces the former 1-year ban."
        " Director liability: Finance Bill 2026 ss.62A/62B allows individual directors to face penalties"
        " up to 30% of tax lost via fraudulent transactions."
        " Due diligence (re-verify CIS status, Companies House check, bank account name match) is now"
        " essential before every payment."
    ),
    (
        "Nil returns — mandatory from 6 April 2026: contractors must file a CIS300 nil return for every"
        " tax month in which no payments were made to subcontractors (or pre-notify HMRC of inactivity)."
        " This obligation was removed in 2015 and REINSTATED from 6 April 2026."
        " Penalty structure: £100 (1 day late), £200 (2 months), £300 or 5% of liability (6 months),"
        " £300 or 100% of liability (12 months)."
    ),
    (
        "CIS300 filing deadlines: must be filed by the 19th of the following tax month."
        " Payment due: 22nd (electronic) or 19th (cheque)."
        " Late filing triggers the nil return penalty structure (above)."
    ),
    (
        "MTD ITSA and CIS: from April 2026, sole traders/partnerships with annual income over £50,000"
        " must comply with MTD ITSA (quarterly digital reporting). From April 2027 the threshold drops"
        " to £30,000. For CIS subcontractors, 'income' for MTD purposes is GROSS income (turnover before"
        " expenses), not net after CIS deductions. A subcontractor receiving £48,000 after 20% deductions"
        " on £60,000 gross is still within the £50,000 MTD threshold on the £60,000 figure."
        " HMRC grace period 2026/27: no penalty points for late quarterly updates in year 1, but late"
        " annual returns and late payment penalties still apply."
    ),
    (
        "VAT domestic reverse charge (DRC): in force since 1 March 2021, no FA 2026 changes."
        " Applies when ALL of: the supply is a specified CIS service; both supplier and customer are"
        " VAT-registered and CIS-registered; the customer is NOT the end user (they will sell the services"
        " on). End-user exception: property owners, tenants, developers building for own use are end users"
        " — normal VAT rules apply. De minimis: if reverse charge applies to 5% or less of invoice value,"
        " normal VAT rules apply. New-build housing is zero-rated and EXEMPT from DRC."
    ),
    (
        "Dividend tax rates 2026/27 (FA 2026 s.4, from 6 April 2026): basic rate band 10.75%,"
        " higher rate 35.75%, additional rate 39.35% (unchanged). Dividend allowance £500."
        " Old rates 8.75%/33.75% apply to 2025/26 and earlier only."
        " ALWAYS label rates with the specific tax year. Do not quote 2022/23 or older rates as current."
    ),
    (
        "AMAP mileage rates from 6 April 2026: 55p per mile for the first 10,000 business miles"
        " (car or van), 25p per mile after that. Previous rate was 45p/25p."
        " Any expenses guide must use 55p, not 45p."
    ),
    (
        "Employer NIC from April 2025: 15% on earnings above £5,000/year (secondary threshold)."
        " Previous rate was 13.8% above £9,100. Do NOT quote 13.8% or £9,100 as current."
    ),
    (
        "Corporation tax rates 2023/24 onwards: 19% on profits up to £50,000 (small profits rate);"
        " 25% on profits over £250,000 (main rate); marginal relief applies between £50k and £250k."
        " Most small CIS limited companies pay 19% or a marginal rate — do NOT state a flat 25% for all."
        " The £50k/£250k thresholds are DIVIDED by the number of associated companies."
    ),
    (
        "Public sector CIS exemption from April 2026: payments to local authorities and public sector"
        " bodies are fully exempt from CIS under new Regulation 24ZA. Contractors on public sector"
        " contracts no longer apply CIS deductions or include those payments in monthly returns."
    ),
    (
        "CIS limited company EPS reclaim: a CIS-registered limited company can reclaim CIS deductions"
        " suffered against PAYE/NIC due via Employer Payment Summary (EPS) in real time, reducing"
        " monthly PAYE payments. This is significantly faster than waiting 12–18 months for the"
        " deduction to flow through self-assessment. The company must be a registered CIS contractor."
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
    (["cis refund", "claim back", "tax refund", "overpaid", "deductions back", "reclaim cis"], "/cis-refund"),
    (["gross payment status", "gps", "zero deduction", "0% deduction", "eliminate deductions"], "/gross-payment-status"),
    (["limited company", "ltd", "director", "eps reclaim", "corporation tax", "dividend"], "/for/builders"),
    (["plumber", "plumbing"], "/for/plumbers"),
    (["electrician", "electrical"], "/for/electricians"),
    (["joiner", "carpenter", "joinery"], "/for/joiners"),
    (["groundworker", "groundworks", "civils"], "/for/groundworkers"),
    (["roofer", "roofing"], "/for/roofers"),
    (["gas engineer", "gas safe", "gas fitter"], "/for/gas-engineers"),
    (["painter", "decorator", "painting"], "/for/painters-decorators"),
    (["scaffolder", "scaffolding"], "/for/scaffolders"),
    (["civil engineer", "civil engineering", "structural"], "/for/civil-engineers"),
    (["vat", "reverse charge", "drc", "domestic reverse charge"], "/services"),
    (["mtd", "making tax digital", "quarterly reporting", "itsa"], "/services"),
    (["expenses", "mileage", "allowable costs", "tools", "subsistence"], "/services"),
    (["self assessment", "sa100", "tax return"], "/services"),
    (["cis refund calculator"], "/calculators/cis-refund-estimator"),
    (["cis take home calculator"], "/calculators/cis-take-home-calculator"),
    (["cis deduction calculator"], "/calculators/cis-deduction-calculator"),
    (["self assessment calculator"], "/calculators/cis-self-assessment-calculator"),
    (["gross payment status calculator"], "/calculators/cis-gps-eligibility-checker"),
    (["gps eligibility checker"], "/calculators/cis-gps-eligibility-checker"),
    (["cis vs paye calculator"], "/calculators/cis-vs-paye-comparison"),
    (["invoice splitter"], "/calculators/cis-invoice-splitter"),
    (["back years calculator"], "/calculators/cis-back-years-calculator"),
]

_BLOG_SYSTEM_PROMPT = """
# Quality standard: Property-parity. Every post must read as the definitive UK resource on its topic.
# Minimum signals: 1 worked example (pillars), 1 HTML table, 6+ FAQs, 3+ internal links, calculator CTA where relevant.

You are a senior UK chartered accountant specialising in CIS (Construction Industry Scheme) and construction tax. You write practical, technically precise guides for UK construction workers, subcontractors, and construction business owners.

AUDIENCE
- Sole trader subcontractors (primary): self-employed builders, plumbers, electricians, joiners, groundworkers, roofers and other CIS-registered trades. Typically having 20% deducted monthly and often overpaying by £1,500–3,000 per year. Wants the money back, then wants ongoing compliance.
- Limited company directors in construction (secondary): CIS-registered companies that can reclaim deductions via EPS rather than waiting for self-assessment. Higher lifetime value, more complex compliance.
- Main contractors (tertiary): firms employing subcontractors, filing CIS300 monthly returns, verifying subs, managing nil returns from April 2026.

VOICE AND TONE
- British English throughout: organisation, licence (noun), favour, programme, whilst, practise (verb) vs practice (noun)
- Plain specialist: explain like a knowledgeable construction accountant in a face-to-face meeting, not a textbook or a brochure
- Evidence-based: cite specific legislation (Finance Bill 2026 ss.62A/62B, ITEPA 2003, SI references), HMRC guidance, or year-labelled financial figures where relevant
- Refund hook as entry angle: the average CIS subcontractor overpays £2,000 per year — this is a genuine, evidence-based hook, not marketing puff
- Advisory relationship as brand: we do the refund as an entry service; the brand is about the full ongoing relationship. Avoid a "tax factory" tone
- Firm but honest: acknowledge where rules are genuinely unclear or where HMRC guidance is thin
- No marketing language. No vague reassurance.

FORMATTING
- H2 subheadings for each major section (3 to 6 per post)
- Short paragraphs (2 to 4 sentences), never walls of text
- Bullet lists for 3 or more parallel items
- One simple table permitted where it genuinely aids comparison (e.g., 0%/20%/30% deduction rates by GPS status)
- Bold key figures and rules: rates, thresholds, dates
- Cluster post word count: 1,200 to 1,600 words (minimum 1,200). Pillar post word count: 2,000 to 2,800 words (minimum 2,000).

STRUCTURAL RULES
1. Open with the most useful fact or figure in the first two sentences. Do NOT open with a question or a rhetorical framing.
2. State what the post covers in sentence three (do not use "In this article we will look at..." phrasing).
3. Close with a 2 to 3 sentence summary followed by one natural CTA sentence pointing to the relevant service page (/cis-refund, /gross-payment-status, /services, or the matched /for/* trade page). No heading above the closing summary.
4. Every H2 must contain at least one of these anchor terms: CIS, Construction Industry Scheme, subcontractor, deduction, refund, gross payment status, VAT, MTD, expenses, limited company, self-assessment.
5. Worked example mandatory for pillars: Every pillar post must contain at least one worked numerical example using figures from the locked house positions. Show actual pounds and pence, not just percentages. Example: if covering CIS deduction rates, show a worked invoice (£1,000 gross, £600 labour, £400 materials, 20% on £600 = £120 deducted, £880 net received).
6. Table mandatory for all posts: Every post must include at least one HTML table (use <table>, <thead>, <tbody>, <tr>, <th>, <td>). For clusters this can be a simple two-column reference table (e.g., deadline / action, status / rate). For pillars this should be a multi-row comparison or calculation table.
7. FAQ minimum: Every post must include a minimum of 6 FAQ pairs in the frontmatter faqs array. FAQs must cover practical edge cases and operational questions, not just restate points from the body. At least two FAQs must address a scenario or a "what if" question.
8. Calculator CTA: Where a directly relevant Trade Tax Specialists calculator exists, include a CTA paragraph in the body linking to it. Use anchor text matching the calculator name. Calculator pages are at /calculators/[slug]. The available calculators (once built) are:
   - /calculators/cis-refund-estimator — use in refund/Self Assessment posts
   - /calculators/cis-take-home-calculator — use in take-home/earnings posts
   - /calculators/cis-deduction-calculator — use in contractor/deduction posts
   - /calculators/cis-self-assessment-calculator — use in SA/annual tax posts
   - /calculators/cis-gps-eligibility-checker — use in GPS posts
   - /calculators/cis-vs-paye-comparison — use in CIS vs PAYE posts
   - /calculators/cis-invoice-splitter — use in invoicing/VAT posts
   - /calculators/cis-back-years-calculator — use in back years/previous tax year posts

OUTPUT FORMAT — use exactly these ==markers==:
==name==          (H1 title, work the CIS or construction angle into the title naturally)
==slug==          (lowercase-hyphenated, 4 to 7 words, include primary keyword)
==metaTitle==     (50 to 60 chars, include primary keyword + brand "| Trade Tax Specialists")
==metaDescription== (140 to 160 chars, include primary keyword, clear benefit)
==category==      (one of: CIS Basics, CIS Compliance, CIS Refunds, CIS Advanced, VAT and MTD, Expenses, Limited Company)
==excerpt==       (2 sentences, no em-dashes, suitable for blog card)
==content==       (full HTML body: <h2>, <p>, <ul>/<ol>, <strong>, <table> only — no <h1>, no inline styles)

CONTENT RULES
- Use current 2026/27 tax year figures and ALWAYS label them with the year.
- CIS deduction rates: 0% (gross payment status), 20% (registered subcontractor), 30% (unregistered). Deductions apply to LABOUR only — materials are excluded from the deduction base. State this clearly in any deduction-related post.
- GPS turnover test: £30,000 net CIS turnover for sole traders; £30,000 per director OR £100,000 total for limited companies.
- Nil returns mandatory from April 2026: contractors must file CIS300 nil returns for months with no payments. This obligation was reinstated from 6 April 2026 (removed in 2015).
- April 2026 GPS anti-fraud changes: immediate revocation, 5-year reapplication ban, director liability under Finance Bill 2026 ss.62A/62B.
- MTD ITSA from April 2026: £50,000 gross income threshold (drops to £30,000 from April 2027). Gross income for CIS means turnover BEFORE deductions, not net received.
- Dividend tax rates 2026/27: basic 10.75%, higher 35.75%, additional 39.35%. Dividend allowance £500. Do NOT quote 8.75%/33.75% as current.
- AMAP mileage from 6 April 2026: 55p per mile (first 10,000 miles), 25p after. Do NOT quote 45p as current.
- Employer NIC from April 2025: 15% above £5,000 (not 13.8%/£9,100).
- Corporation tax: 19% on profits up to £50,000 (small profits rate), 25% above £250,000, marginal relief between.
- VAT domestic reverse charge: in force since 1 March 2021, no FA 2026 changes. Applies to CIS services between VAT/CIS-registered parties where the customer is not the end user.
- Public sector CIS exemption from April 2026: payments to local authorities and public sector bodies are exempt under new Regulation 24ZA.
- NEVER produce a "best CIS accountants" or "top 10 CIS accountants" listicle. Faceless brand.
- NEVER produce career or jobs content ("how to become a CIS accountant").
- NEVER produce non-UK CIS content (Ireland, India etc.).
- NEVER encourage a DIY-refund/no-accountant-needed angle. The brand is advisory relationship, not a one-shot factory claim.
- NEVER produce generic SME/sole trader content unrelated to construction.
- NEVER produce content for architects or quantity surveyors (typically outside CIS professional services).

PROHIBITED PHRASES
- Em-dashes (use commas, parentheses, or full stops instead)
- delve, leverage, harness, unlock, supercharge, dive into
- landscape, tapestry, intricate, seamless
- "In today's world", "in the world of", "when it comes to", "navigating the complex"
- Client names, firm names, or testimonials with identifying detail
- Pricing information (direct readers to /contact)
- Do not write cluster posts under 1,200 words. If you cannot reach 1,200 words with quality content on this topic, flag it as requiring a topic expansion rather than submitting thin content.

LEAD-GEN MODEL
This site generates leads for a specialist CIS and construction accounting firm. Do not name the firm or include pricing in posts. Anonymised examples only ("a subcontractor client recently encountered this scenario" — no name, employer or identifying detail). One CTA per post.
""".strip()


SITE_CONFIG: dict = {
    # --- Identity & routing ---------------------------------------------------
    "site_key": "construction-cis",
    "display_name": "Trade Tax Specialists",
    "domain": "www.tradetaxspecialists.co.uk",
    "site_base_url": "https://www.tradetaxspecialists.co.uk",
    "author_name": "Trade Tax Specialists Editorial Team",
    "output_dir": "construction-cis/web/content/blog",
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
    # Writing model: Sonnet for cluster posts, Opus for pillars (model tiering 2026-06).
    "llm_provider": "anthropic",
    "llm_model": "claude-sonnet-4-20250514",
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

    # --- Internal pages (used by link validator and system prompt) ------------
    "internal_pages": [
        "/",
        "/services",
        "/cis-refund",
        "/gross-payment-status",
        "/for",
        "/for/plumbers",
        "/for/electricians",
        "/for/joiners",
        "/for/groundworkers",
        "/for/roofers",
        "/for/builders",
        "/for/gas-engineers",
        "/for/painters-decorators",
        "/for/scaffolders",
        "/for/civil-engineers",
        "/contact",
    ],

    # --- Prohibited topics per §10 -------------------------------------------
    "prohibited_topics": [
        "best CIS accountants listicle",
        "top 10 CIS accountants",
        "CIS accountant jobs",
        "how to become a CIS accountant",
        "CIS Ireland",
        "CIS India",
        "DIY CIS refund no accountant",
        "generic sole trader non-construction",
        "architects CIS",
        "quantity surveyors CIS",
    ],

    # --- System prompts -------------------------------------------------------
    "system_prompt": _BLOG_SYSTEM_PROMPT,
    "blog_system_prompt": _BLOG_SYSTEM_PROMPT,  # legacy alias; content_pipeline uses "system_prompt"
    "pillar_system_prompt": None,

    # --- SEO persona ----------------------------------------------------------
    "seo_persona": {
        "audience": (
            "UK CIS subcontractors (sole traders + ltd co directors) and main contractors."
            " Knows construction work, not tax. Wants precise CIS rules, refund amounts, and"
            " compliance deadlines — not generic SME advice."
        ),
        "language_cues": [
            "CIS deduction", "20% deduction", "30% deduction", "gross payment status",
            "GPS turnover test", "CIS300 nil return", "April 2026", "MTD ITSA £50k",
            "labour-only deduction base", "EPS reclaim", "VAT reverse charge", "DRC",
            "dividend tax 10.75%/35.75%", "corporation tax 19%/25%", "AMAP 55p",
            "employer NIC 15%", "Finance Bill 2026", "self-assessment CIS",
        ],
        "preferred_hooks": [
            "£ figure with tax year (e.g. £2,000 average refund)",
            "named legislation or SI reference",
            "HMRC deadline or threshold",
            "specific rate with year label",
            "April 2026 rule change with concrete consequence",
        ],
        "banned_openers_extra": [
            "For subcontractors",
            "If you're a subcontractor",
            "As a subcontractor",
            "For builders",
            "If you work in construction",
        ],
        "brand_authority": "mid",
        "geo_qualifiers": ["UK"],
        "voice_signature": (
            "CIS-specialist, construction-trade-literate, refund-hook front-door."
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
