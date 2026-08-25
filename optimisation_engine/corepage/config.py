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
