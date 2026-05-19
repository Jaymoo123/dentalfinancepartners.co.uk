"""
Dentists site configuration.

Imports verbatim from Dentists/pipeline/config_supabase.py so the system
prompt, anchor allowlist, hallucination zones, internal links, and audience
mapping all stay in sync with the existing production config (which other
tools may also read).
"""
from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]

# Load Dentists' config_supabase.py as a uniquely-named module so it doesn't
# collide with other sites' config_supabase.py files in sys.modules cache.
_CONFIG_PATH = ROOT / "Dentists" / "pipeline" / "config_supabase.py"
_spec = importlib.util.spec_from_file_location("_dentists_config_supabase", _CONFIG_PATH)
if _spec is None or _spec.loader is None:
    raise ImportError(f"Cannot load Dentists config from {_CONFIG_PATH}")
_mod = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_mod)

_BLOG_SYSTEM_PROMPT = _mod.BLOG_SYSTEM_PROMPT
_POST_CATEGORIES = _mod.POST_CATEGORIES
_INTERNAL_LINK_SLUGS = _mod.INTERNAL_LINK_SLUGS
_ANCHOR_TERMS = _mod.DENTAL_ANCHOR_TERMS


# Translate the existing function-based audience map into a static list of
# (keyword_set, link) rules so the generator doesn't need to invoke the
# function. Order matters: first match wins (matches existing function).
_AUDIENCE_LINK_MAP: list[tuple[list[str], str]] = [
    (["associate", "self-employment", "expenses"], "/for-associates"),
    (["principal", "practice owner", "extraction"], "/for-principals"),
    (["buying", "purchase", "due diligence", "acquisition"], "/for-practice-buyers"),
    (["locum"], "/for-locum-dentists"),
    (["uda", "nhs contract"], "/services/practice-accounting"),
    (["valuation", "goodwill"], "/services/practice-valuation"),
]


# 10 dental-specific hallucination zones (matches the numbered list in the
# existing system prompt). Used by the optional Haiku verification pass.
_HALLUCINATION_ZONES: list[str] = [
    'UDA value is NOT £25 per point nationally. Quote a range, varies by contract and region.',
    'NHS Pension has THREE sections (1995, 2008, 2015 CARE). 1995 + 2008 closed to new members but legacy benefits remain. McCloud remedy applies 1 April 2015 to 31 March 2022.',
    'BDA model associate contract does NOT guarantee self-employment status. Status determined by actual working practice (control, substitution, MOO, financial risk, integration).',
    'Goodwill amortisation tax relief is 6.5% per year (not 10%) for qualifying goodwill acquired post-1 April 2019. Goodwill purchased 8 July 2015 to 31 March 2019 generally has no tax relief.',
    'Dental practice sale is a CAPITAL disposal (CGT, with BADR if conditions met), NOT trading income.',
    'Dental treatment by a registered dental professional in the course of their profession is VAT-EXEMPT under VATA 1994 Sch 9 Group 7. Purely cosmetic services can be standard-rated. Tooth whitening is a HMRC borderline case.',
    'Locum dentists via Ltd company are subject to IR35: when the engaging practice is medium/large (post-6 April 2021), the practice (not the PSC) determines status.',
    'Dental practice valuations are NOT 1x annual income across the UK. Multiples vary widely (EBITDA 0.6-1.4x, NHS/private mix, region).',
    'Structures and Buildings Allowance gives 3% per year on qualifying construction/acquisition costs of post-29 Oct 2018 commercial premises. Fixtures (chairs, compressors, X-ray units) qualify under AIA / general plant and machinery.',
    'Employer pension contributions are NOT P11D benefits in kind. They are allowable trade expenses, tax-free for the recipient up to the annual allowance.',
]


# Banned phrases (matches the prompt's anti-AI voice rules)
_BANNED_PHRASES: list[str] = [
    # No em-dash / en-dash check is done at the validator level too
    "—", "–",
    # Banned openers
    "in today's", "in the world of", "when it comes to", "in an ever-evolving",
    "navigating the complex",
    # Banned verbs (use case-insensitive substring search)
    "delve", "leverage", "harness", "unlock", "dive into", "supercharge",
    # Banned nouns/adjectives in metaphorical use
    "landscape", "tapestry", "intricate", "seamless",
]


SITE_CONFIG: dict = {
    # --- Identity & routing -------------------------------------------------
    "site_key": "dentists",
    "display_name": "Dental Finance Partners",
    "domain": "dentalfinancepartners.co.uk",
    "site_base_url": "https://www.dentalfinancepartners.co.uk",
    "author_name": "Dental Finance Partners Editorial Team",
    "output_dir": "Dentists/web/content/blog",
    "pillar_output_dir": None,

    # --- Topic table -------------------------------------------------------
    "topic_table": "blog_topics_dentists",
    "topic_column": "topic",
    "secondary_keywords_shape": "columns",  # 1..10 individual columns
    "done_marker_field": "used",
    "done_marker_value": True,
    "done_timestamp_field": "generated_at",
    "slug_field": "generated_slug",
    "topic_order": "publish_priority.desc.nullslast,keyword_difficulty.asc.nullslast,created_at.asc",

    # --- LLM provider ------------------------------------------------------
    "llm_provider": "deepseek",
    "llm_model": "deepseek-chat",
    "max_tokens": 6500,
    "temperature": 0.3,
    "verify_with_haiku": True,  # mitigates DeepSeek hallucination risk

    # --- Site-specific content rules --------------------------------------
    "post_categories": list(_POST_CATEGORIES),
    "internal_link_slugs": list(_INTERNAL_LINK_SLUGS),
    "anchor_terms": list(_ANCHOR_TERMS),
    "anchor_rules": {
        "h1_must_contain_any": True,
        "first_200_words_min_count": 2,
        "h2_must_contain_any": True,
    },
    "hallucination_zones": _HALLUCINATION_ZONES,
    "banned_phrases": _BANNED_PHRASES,

    # --- Audience link map -------------------------------------------------
    "audience_link_map": _AUDIENCE_LINK_MAP,
    "default_audience_link": "/services",

    # --- System prompt (imported verbatim) ---------------------------------
    "system_prompt": _BLOG_SYSTEM_PROMPT,
    "pillar_system_prompt": None,

    # --- URL format --------------------------------------------------------
    "canonical_format": "/blog/{category_slug}/{slug}",
    "category_slug_rules": {"and_replaces_ampersand": True},

    # --- Behaviour flags ---------------------------------------------------
    "use_research_bundle": True,
    "fetch_image": True,
}
