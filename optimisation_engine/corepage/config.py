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
