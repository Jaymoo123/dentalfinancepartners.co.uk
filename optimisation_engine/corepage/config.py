"""Configuration for the core-page SEO optimisation engine.

Site-agnostic by design: ALL page-specific knowledge lives in CORE_PAGES.
Engine functions take ``(site_key, page_key)`` and read everything else from
here. Adding another core page (or another site's homepage) = add an entry,
no code change.

A "core page" is a commercial/landing page (homepage, /services, /locations
hub, /incorporation) as opposed to a blog post. These pages should own the
head-keyword family for the niche; blog pages should hold long-tail intent
and link UP to the core page.
"""
from __future__ import annotations


CORE_PAGES: dict[str, dict[str, dict]] = {
    "property": {
        "homepage": {
            "site_key": "property",
            "page_key": "homepage",
            "page_type": "homepage",
            # Bare registrable domain (no scheme/www) — used to drop our own
            # results out of the competitor SERP.
            "domain": "propertytaxpartners.co.uk",
            "page_url": "https://www.propertytaxpartners.co.uk/",
            "canonical_path": "/",
            "source_tsx": "Property/web/src/app/page.tsx",
            "web_root": "Property/web",
            # The national head-keyword family this page should OWN. Used to
            # seed competitor SERP probes and to mark which GSC queries are the
            # primary (national) targets vs geo variants.
            "head_terms": [
                "property accountant",
                "property accountants",
                "property tax accountant",
                "landlord accountant",
                "buy to let accountant",
                "property investment accountant",
                "specialist property accountant",
                "accountant for landlords",
            ],
            # Geo modifiers seen in GSC. A head query carrying one of these is
            # local intent -> it should funnel to /locations, NOT be claimed by
            # the national homepage.
            "geo_modifiers": [
                "london", "manchester", "birmingham", "leeds", "liverpool",
                "peterborough", "leicester", "nottingham", "bournemouth",
                "northampton", "wolverhampton", "near me",
            ],
            # ILIKE patterns used to detect the head family in gsc_query_data.
            "head_match_like": ["%accountant%", "%accountancy%"],
            # Single tokens worth tracking on-page (term_analysis density).
            "root_tokens": ["accountant", "accountants", "property", "landlord",
                            "landlords", "tax", "buy-to-let", "investor", "investors"],
            # The "main keyword" rollup (singular+plural of the primary term).
            "main_keyword_terms": ["property accountant", "property accountants"],
        },
    },
    "generalist": {
        "homepage": {
            "site_key": "generalist",
            "page_key": "homepage",
            "page_type": "homepage",
            # Bare registrable domain (no scheme/www) — drops our own results
            # out of the competitor SERP.
            "domain": "hollowaydavies.co.uk",
            "page_url": "https://www.hollowaydavies.co.uk/",
            "canonical_path": "/",
            "source_tsx": "generalist/web/src/app/page.tsx",
            "web_root": "generalist/web",
            # National head-keyword family the homepage should OWN. Holloway
            # Davies is a general-practice firm for UK SMEs (limited companies,
            # contractors, sole traders, partnerships). These mirror the firm's
            # own /fundamentals pillar pages and the commercial-intent demand.
            "head_terms": [
                "small business accountant",
                "accountant for small business",
                "limited company accountant",
                "accountant for limited company",
                "online accountant",
                "contractor accountant",
                "sole trader accountant",
                "fixed fee accountant",
            ],
            # Geo modifiers seen in GSC -> local intent should funnel to
            # /locations / /accountant-near-me, NOT be claimed by the homepage.
            "geo_modifiers": [
                "london", "manchester", "birmingham", "leeds", "liverpool",
                "bristol", "glasgow", "edinburgh", "st albans", "burnley",
                "near me",
            ],
            "head_match_like": ["%accountant%", "%accountancy%"],
            "root_tokens": ["accountant", "accountants", "accountancy", "tax",
                            "small", "business", "limited", "company",
                            "contractor", "sole", "trader"],
            "main_keyword_terms": ["small business accountant",
                                   "accountant for small business"],
        },
        # Authored 2026-08-25 (Stage 2 item 2). Analysis + rewrite not yet run
        # for these pages; homepage was rewritten first.
        "services": {
            "site_key": "generalist",
            "page_key": "services",
            "page_type": "services",
            "domain": "hollowaydavies.co.uk",
            "page_url": "https://www.hollowaydavies.co.uk/services",
            "canonical_path": "/services",
            "source_tsx": "generalist/web/src/app/services/page.tsx",
            "web_root": "generalist/web",
            "head_terms": [
                "accounting services for small business",
                "small business accounting services",
                "accountancy services",
                "limited company accounting services",
                "bookkeeping and accounting services",
                "payroll services for small business",
            ],
            "geo_modifiers": [
                "london", "manchester", "birmingham", "leeds", "liverpool",
                "bristol", "glasgow", "edinburgh", "st albans", "burnley",
                "near me",
            ],
            "head_match_like": ["%accounting service%", "%accountancy service%",
                                "%bookkeeping%", "%payroll service%"],
            "root_tokens": ["accounting", "accountancy", "services", "payroll",
                            "bookkeeping", "vat", "tax", "small", "business"],
            "main_keyword_terms": ["accounting services for small business",
                                   "small business accounting services"],
        },
        "r_and_d": {
            "site_key": "generalist",
            "page_key": "r_and_d",
            "page_type": "landing",
            "domain": "hollowaydavies.co.uk",
            "page_url": "https://www.hollowaydavies.co.uk/r-and-d-credits",
            "canonical_path": "/r-and-d-credits",
            "source_tsx": "generalist/web/src/app/r-and-d-credits/page.tsx",
            "web_root": "generalist/web",
            "head_terms": [
                "r&d tax credits",
                "r&d tax relief",
                "r&d tax credit accountant",
                "research and development tax credits",
                "r&d claim",
            ],
            "geo_modifiers": [
                "london", "manchester", "birmingham", "leeds", "liverpool",
                "bristol", "glasgow", "edinburgh", "near me",
            ],
            "head_match_like": ["%r&d%", "%r and d%", "%research and development%"],
            "root_tokens": ["r&d", "research", "development", "tax", "credit",
                            "credits", "relief", "claim", "hmrc", "merged"],
            "main_keyword_terms": ["r&d tax credits", "r&d tax relief"],
        },
        "incorporation": {
            "site_key": "generalist",
            "page_key": "incorporation",
            "page_type": "landing",
            "domain": "hollowaydavies.co.uk",
            "page_url": "https://www.hollowaydavies.co.uk/incorporation",
            "canonical_path": "/incorporation",
            "source_tsx": "generalist/web/src/app/incorporation/page.tsx",
            "web_root": "generalist/web",
            "head_terms": [
                "company formation accountant",
                "accountant to set up limited company",
                "sole trader to limited company",
                "incorporating a business",
                "company incorporation services",
            ],
            "geo_modifiers": [
                "london", "manchester", "birmingham", "leeds", "liverpool",
                "bristol", "glasgow", "edinburgh", "near me",
            ],
            "head_match_like": ["%incorporat%", "%company formation%",
                                "%set up%limited company%"],
            "root_tokens": ["incorporation", "incorporate", "formation",
                            "company", "limited", "sole", "trader", "s162"],
            "main_keyword_terms": ["company formation accountant",
                                   "sole trader to limited company"],
        },
    },
    "solicitors": {
        "services": {
            "site_key": "solicitors",
            "page_key": "services",
            "page_type": "services",
            "domain": "accountsforlawyers.co.uk",
            "page_url": "https://www.accountsforlawyers.co.uk/services",
            "canonical_path": "/services",
            "source_tsx": "Solicitors/web/src/app/services/page.tsx",
            "web_root": "Solicitors/web",
            # National head family /services should OWN. NOTE: /contact holds
            # pos 18-22 on "accountant for lawyers" — migrating that query
            # needs explicit owner OK (approved W1 per plan 2026-07-19).
            "head_terms": [
                "accounting for solicitors",
                "accountants for solicitors",
                "solicitor accountants",
                "accountant for lawyers",
                "accounting services for law firms",
                "law firm accounting services",
            ],
            "geo_modifiers": [
                "london", "manchester", "birmingham", "leeds", "liverpool",
                "bristol", "glasgow", "edinburgh", "near me",
            ],
            "head_match_like": ["%accountant%", "%accountancy%", "%accounting%"],
            "root_tokens": ["accountant", "accountants", "accounting",
                            "solicitor", "solicitors", "law", "firm", "firms",
                            "sra", "legal", "tax"],
            "main_keyword_terms": ["accounting for solicitors",
                                   "accountants for solicitors"],
        },
    },
    "medical": {
        # Authored 2026-08-26 (Stage 2 item 2, §5.0a). Live host is
        # www.medicalaccounts.co.uk; the bare apex 308-redirects to www, so
        # page_url always carries the www form (matches sites/medical.json
        # vercel.productionDomain and site_configs/medical.py site_base_url).
        # Medical uses FLAT routing (memory `medical_parked`); non-blog routes
        # are single-segment paths off root.
        #
        # Head-family split, decided from the 90d GSC pull (data through
        # 2026-08-23): the homepage already catches the whole national
        # "gp/medical accountants" family at pos ~52 and is the strongest URL,
        # so it KEEPS the individual-practitioner head. /for-gps takes the
        # practice-entity sub-family ("gp practice accountants", "accountants
        # for gp practices", "accounting for gp partners"), which is a
        # genuinely different buyer (the partnership, not the doctor).
        "homepage": {
            "site_key": "medical",
            "page_key": "homepage",
            "page_type": "homepage",
            "domain": "medicalaccounts.co.uk",
            "page_url": "https://www.medicalaccounts.co.uk/",
            "canonical_path": "/",
            "source_tsx": "Medical/web/src/app/page.tsx",
            "web_root": "Medical/web",
            "head_terms": [
                "gp accountants",
                "medical accountants",
                "specialist medical accountants",
                "medical accountants uk",
                "accountants for doctors",
                "accountant for medical professionals",
                "gp accountant",
                "medical accountant",
            ],
            "geo_modifiers": [
                "london", "manchester", "birmingham", "leeds", "liverpool",
                "bristol", "glasgow", "edinburgh", "newcastle", "scotland",
                "near me",
            ],
            "head_match_like": ["%accountant%", "%accountancy%", "%accounting%"],
            "root_tokens": ["accountant", "accountants", "accounting",
                            "doctor", "doctors", "gp", "gps", "medical",
                            "nhs", "consultant", "locum", "pension", "tax"],
            "main_keyword_terms": ["gp accountants", "medical accountants"],
        },
        "services": {
            "site_key": "medical",
            "page_key": "services",
            "page_type": "services",
            "domain": "medicalaccounts.co.uk",
            "page_url": "https://www.medicalaccounts.co.uk/services",
            "canonical_path": "/services",
            "source_tsx": "Medical/web/src/app/services/page.tsx",
            "web_root": "Medical/web",
            "head_terms": [
                "medical accounting",
                "medical accounting services",
                "accounting for doctors",
                "accounting services for doctors",
                "bookkeeping for doctors",
                "tax accountants for doctors",
            ],
            "geo_modifiers": [
                "london", "manchester", "birmingham", "leeds", "bristol",
                "glasgow", "edinburgh", "near me",
            ],
            "head_match_like": ["%accounting%", "%accountancy service%",
                                "%bookkeeping%", "%tax service%"],
            "root_tokens": ["accounting", "accountancy", "services",
                            "bookkeeping", "tax", "medical", "doctors",
                            "practice", "nhs", "pension"],
            "main_keyword_terms": ["medical accounting",
                                   "medical accounting services"],
        },
        "for_gps": {
            "site_key": "medical",
            "page_key": "for_gps",
            "page_type": "landing",
            "domain": "medicalaccounts.co.uk",
            "page_url": "https://www.medicalaccounts.co.uk/for-gps",
            "canonical_path": "/for-gps",
            "source_tsx": "Medical/web/src/app/for-gps/page.tsx",
            "web_root": "Medical/web",
            # Practice-ENTITY family, deliberately disjoint from the homepage's
            # individual-practitioner head so the two do not compete.
            "head_terms": [
                "gp practice accountants",
                "accountants for gp practices",
                "accounting for gp partners",
                "gp practice accounts",
                "gp partnership accounts",
                "accountants for gp partners",
            ],
            "geo_modifiers": [
                "london", "manchester", "birmingham", "leeds", "bristol",
                "glasgow", "edinburgh", "scotland", "near me",
            ],
            "head_match_like": ["%gp practice%", "%gp partner%",
                                "%partnership account%"],
            "root_tokens": ["gp", "practice", "partnership", "partner",
                            "partners", "accounts", "accountants", "salaried",
                            "profit", "share", "superannuation", "pcse"],
            "main_keyword_terms": ["gp practice accountants",
                                   "accountants for gp practices"],
        },
        "for_locum_doctors": {
            "site_key": "medical",
            "page_key": "for_locum_doctors",
            "page_type": "landing",
            "domain": "medicalaccounts.co.uk",
            "page_url": "https://www.medicalaccounts.co.uk/for-locum-doctors",
            "canonical_path": "/for-locum-doctors",
            "source_tsx": "Medical/web/src/app/for-locum-doctors/page.tsx",
            "web_root": "Medical/web",
            "head_terms": [
                "accountants for locum doctors",
                "locum doctor accountant",
                "locum accountant",
                "accountants for locums",
                "locum doctor tax",
                "ir35 locum doctor",
            ],
            "geo_modifiers": [
                "london", "manchester", "birmingham", "leeds", "bristol",
                "glasgow", "edinburgh", "near me",
            ],
            "head_match_like": ["%locum%"],
            "root_tokens": ["locum", "locums", "accountant", "accountants",
                            "ir35", "umbrella", "limited", "company",
                            "self-assessment", "expenses", "pension"],
            "main_keyword_terms": ["accountants for locum doctors",
                                   "locum doctor accountant"],
        },
        "calculators": {
            "site_key": "medical",
            "page_key": "calculators",
            "page_type": "tool_hub",
            "domain": "medicalaccounts.co.uk",
            "page_url": "https://www.medicalaccounts.co.uk/calculators",
            "canonical_path": "/calculators",
            "source_tsx": "Medical/web/src/app/calculators/page.tsx",
            "web_root": "Medical/web",
            "head_terms": [
                "nhs pension annual allowance calculator",
                "locum tax calculator",
                "nhs pension calculator",
                "doctor tax calculator",
                "tapered annual allowance calculator",
                "nhs superannuation calculator",
            ],
            "geo_modifiers": [],
            "head_match_like": ["%calculator%", "%calculate%"],
            "root_tokens": ["calculator", "calculators", "nhs", "pension",
                            "annual", "allowance", "tapered", "locum", "tax",
                            "superannuation", "take-home", "drawings"],
            "main_keyword_terms": ["nhs pension annual allowance calculator",
                                   "locum tax calculator"],
        },
        "medical_guides": {
            "site_key": "medical",
            "page_key": "medical_guides",
            "page_type": "hub",
            "domain": "medicalaccounts.co.uk",
            "page_url": "https://www.medicalaccounts.co.uk/medical-guides",
            "canonical_path": "/medical-guides",
            "source_tsx": "Medical/web/src/app/medical-guides/page.tsx",
            "web_root": "Medical/web",
            "head_terms": [
                "nhs pension annual allowance guide",
                "gp partnership accounts guide",
                "medical expenses tax treatment",
                "ir35 for locums",
                "consultant private practice tax",
                "doctors tax guide uk",
            ],
            "geo_modifiers": [],
            "head_match_like": ["%guide%", "%explained%", "%how to%"],
            "root_tokens": ["guide", "guides", "nhs", "pension", "allowance",
                            "gp", "partnership", "expenses", "ir35", "locum",
                            "consultant", "private", "practice", "tax"],
            "main_keyword_terms": ["nhs pension annual allowance guide",
                                   "gp partnership accounts guide"],
        },
    },
    "dentists": {
        "homepage": {
            "site_key": "dentists",
            "page_key": "homepage",
            "page_type": "homepage",
            "domain": "dentalfinancepartners.co.uk",
            "page_url": "https://www.dentalfinancepartners.co.uk/",
            "canonical_path": "/",
            "source_tsx": "Dentists/web/src/app/page.tsx",
            "web_root": "Dentists/web",
            "head_terms": [
                "dental accountants",
                "accountants for dentists",
                "dental accountant",
                "specialist dental accountants",
                "dental practice accountants",
            ],
            "geo_modifiers": [
                "london", "manchester", "birmingham", "leeds", "liverpool",
                "bristol", "glasgow", "edinburgh", "wales", "near me",
            ],
            "head_match_like": ["%accountant%", "%accountancy%", "%accounting%"],
            "root_tokens": ["accountant", "accountants", "accounting",
                            "dentist", "dentists", "dental", "practice",
                            "associate", "nhs", "tax"],
            "main_keyword_terms": ["dental accountants",
                                   "accountants for dentists"],
        },
    },
}


def get_core_page(site_key: str, page_key: str) -> dict:
    """Return the CORE_PAGES entry, or raise with a helpful list of valids."""
    try:
        return CORE_PAGES[site_key][page_key]
    except KeyError as exc:
        known = [f"{s}/{p}" for s in CORE_PAGES for p in CORE_PAGES[s]]
        raise KeyError(
            f"No CORE_PAGES entry for site={site_key!r} page={page_key!r}. "
            f"Known core pages: {known}"
        ) from exc
