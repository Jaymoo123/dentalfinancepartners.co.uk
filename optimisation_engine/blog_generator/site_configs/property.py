"""
Property site configuration.

Imports verbatim from Property/pipeline/config_supabase.py so the system
prompt, internal links, categories, and audience mapping stay in sync with
the existing production config.
"""
from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]

_CONFIG_PATH = ROOT / "Property" / "pipeline" / "config_supabase.py"
_spec = importlib.util.spec_from_file_location("_property_config_supabase", _CONFIG_PATH)
if _spec is None or _spec.loader is None:
    raise ImportError(f"Cannot load Property config from {_CONFIG_PATH}")
_mod = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_mod)

_BLOG_SYSTEM_PROMPT = _mod.BLOG_SYSTEM_PROMPT
_POST_CATEGORIES = _mod.POST_CATEGORIES
_INTERNAL_LINK_SLUGS = _mod.INTERNAL_LINK_SLUGS


_AUDIENCE_LINK_MAP: list[tuple[list[str], str]] = [
    (["incorporation", "limited company"], "/incorporation"),
    (["section 24", "calculator"], "/calculators"),
    (["mtd", "making tax digital"], "/services"),
]


# Property-specific hallucination zones. Property pages frequently get these
# wrong; explicit zones tell the Haiku verifier exactly what to watch for.
_HALLUCINATION_ZONES: list[str] = [
    'Section 24 is FULL restriction (mortgage interest relief is a 20% tax credit, not a tax deduction). Applies to individual landlords, not to limited companies or commercial property.',
    'CGT rates on residential property are 18% basic / 24% higher rate (NOT the old 18%/28%, which was cut to 24% from 30 Oct 2024). Annual exempt amount is £3,000.',
    'SDLT surcharge on additional residential properties is 5% (raised from 3% in October 2024). Applies to second homes, BTLs, holiday lets.',
    'Furnished Holiday Lettings (FHL) regime was abolished from April 2025. There is no longer separate FHL treatment for income, CGT, or capital allowances.',
    '60-day CGT reporting on UK residential property disposals is mandatory for both UK residents and non-residents. Starts on the COMPLETION date, not exchange.',
    'MTD for Income Tax mandates from 6 April 2026 for landlords with gross property income > £50,000. Drops to > £30,000 in April 2027.',
    'From April 2027, separate property income tax rates of 22% basic / 42% higher / 47% additional apply to property income (NOT the standard income tax bands).',
    'Section 21 no-fault evictions are abolished from May 2026 under the Renters Rights Act. New possession grounds replace the old regime.',
    'For limited companies (SPVs) holding rental property: mortgage interest is fully deductible (Section 24 does NOT apply), and corporation tax applies (19%/25%), not income tax.',
    'Commercial property: Section 24 does NOT apply, capital allowances ARE available on integral features (lifts, lighting, HVAC), and VAT option-to-tax can be relevant.',
]


_BANNED_PHRASES: list[str] = [
    "—", "–",
    "in today's", "in the world of", "when it comes to",
    "delve", "leverage", "harness", "unlock", "supercharge",
    "landscape", "tapestry", "intricate", "seamless",
]


SITE_CONFIG: dict = {
    # --- Identity & routing -------------------------------------------------
    "site_key": "property",
    "display_name": "Property Tax Partners",
    "domain": "propertytaxpartners.co.uk",
    "site_base_url": "https://www.propertytaxpartners.co.uk",
    "author_name": "Property Tax Partners Editorial Team",
    "output_dir": "Property/web/content/blog",
    "pillar_output_dir": None,

    # --- Topic table -------------------------------------------------------
    "topic_table": "blog_topics_property",
    "topic_column": "topic",
    "secondary_keywords_shape": "array",  # JSON array column
    "done_marker_field": "used",
    "done_marker_value": True,
    "done_timestamp_field": "used_at",
    "slug_field": None,
    "topic_order": "publish_priority.desc.nullslast,keyword_difficulty.asc.nullslast,created_at.asc",

    # --- LLM provider ------------------------------------------------------
    "llm_provider": "deepseek",
    "llm_model": "deepseek-chat",
    "max_tokens": 6500,
    "temperature": 0.3,
    "verify_with_haiku": True,

    # --- Site-specific content rules --------------------------------------
    "post_categories": list(_POST_CATEGORIES),
    "internal_link_slugs": list(_INTERNAL_LINK_SLUGS),
    "anchor_terms": None,  # Property doesn't use the strict anchor-allowlist mechanism
    "anchor_rules": None,
    "hallucination_zones": _HALLUCINATION_ZONES,
    "banned_phrases": _BANNED_PHRASES,

    # --- Audience link map -------------------------------------------------
    "audience_link_map": _AUDIENCE_LINK_MAP,
    "default_audience_link": "/services",

    # --- System prompt (imported verbatim) ---------------------------------
    "system_prompt": _BLOG_SYSTEM_PROMPT,
    "pillar_system_prompt": None,

    # --- SEO persona for meta title/description strategy -------------------
    "seo_persona": {
        "audience": "UK BTL landlords, SPV owners, portfolio investors, holiday-let owners, non-resident landlords. Tax-conscious, mortgage-aware. Wants specific £ figures and rules, not generic 'property is a good investment'.",
        "language_cues": [
            "Section 24", "20% tax credit", "CGT 18%/24%", "60-day reporting", "MTD ITSA",
            "SDLT 5% surcharge", "FHL abolition", "BTL mortgage", "PPR relief", "NRL scheme",
            "Section 162", "BADR", "SPV", "incorporation relief",
        ],
        "preferred_hooks": ["£ threshold + year", "% tax rate", "specific deadline (April 2026, etc.)", "named scheme/section"],
        "banned_openers_extra": ["For landlords", "If you're a landlord"],
        "brand_authority": "high",
        "geo_qualifiers": "city-specific when slug names a city (Manchester, Bristol, Birmingham, etc.) — include in metaTitle",
        "voice_signature": "Tax-savvy practical voice. Section-24-literate. Lender-aware.",
    },

    # --- URL format --------------------------------------------------------
    "canonical_format": "/blog/{category_slug}/{slug}",
    "category_slug_rules": {"and_replaces_ampersand": True},

    # --- Behaviour flags ---------------------------------------------------
    "use_research_bundle": True,
    "fetch_image": True,
}
