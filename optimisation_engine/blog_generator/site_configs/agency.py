"""Digital Agency (Agency Founder Finance) site configuration."""
from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]

_CONFIG_PATH = ROOT / "digital-agency" / "pipeline" / "config_supabase.py"
_spec = importlib.util.spec_from_file_location("_agency_config_supabase", _CONFIG_PATH)
if _spec is None or _spec.loader is None:
    raise ImportError(f"Cannot load Agency config from {_CONFIG_PATH}")
_mod = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_mod)

_BLOG_SYSTEM_PROMPT = _mod.BLOG_SYSTEM_PROMPT
_PILLAR_SYSTEM_PROMPT = _mod.PILLAR_SYSTEM_PROMPT
_POST_CATEGORIES = _mod.POST_CATEGORIES
_INTERNAL_LINK_SLUGS = _mod.INTERNAL_LINK_SLUGS


_AUDIENCE_LINK_MAP: list[tuple[list[str], str]] = [
    (["ir35", "contractor"], "/blog/contractors-and-ir35"),
    (["salary", "dividend"], "/blog/salary-and-dividends"),
    (["incorporat", "limited company", "holding"], "/blog/incorporation-and-structure"),
    (["exit", "sell", "badr", "disposal"], "/blog/growth-and-exit"),
    (["mtd", "making tax digital"], "/blog/making-tax-digital"),
    (["international", "uae", "dubai"], "/blog/international-agencies"),
    (["accountant"], "/blog/agency-accountant-services"),
]


_HALLUCINATION_ZONES: list[str] = [
    'Corporation tax for the small profits rate is 19% (up to £50,000 profit), main rate 25% (above £250,000), with marginal relief in between.',
    'Dividend allowance is £500 (NOT £1,000 or £2,000). Dividend tax rates: 8.75% basic / 33.75% higher / 39.35% additional.',
    'BADR (Business Asset Disposal Relief): 14% for 2025/26, rising to 18% from 6 April 2026. Lifetime limit £1m.',
    'R&D Enhanced Deduction (small profits regime, RDEC successor): 186% for SME loss-makers from 1 April 2023, with the SME merged scheme effective from accounting periods on/after 1 April 2024.',
    'VAT flat rate scheme: rates vary by business type (10.5%-16.5%); limited-cost-trader rate is 16.5%. Eligibility: turnover under £150,000.',
    'IR35 for off-payroll workers: from 6 April 2021, medium and large clients determine the status (not the PSC). Inside-IR35 triggers PAYE deductions.',
    'Employment Allowance 2025/26: £10,500 (NOT £5,000 — raised in 2024 Autumn Budget).',
    'Employer NI: 15% on earnings above £5,000/year (NOT 13.8%, NOT threshold £9,100 — both changed in Autumn Budget 2024 effective April 2025).',
    'VAT registration threshold: £90,000 (raised from £85,000 on 1 April 2024). Deregistration threshold: £88,000.',
    'Agency utilisation rate (chargeable hours / available hours) is a leading-indicator metric, NOT a tax figure. Don\'t conflate it with profit margin.',
]


_BANNED_PHRASES: list[str] = [
    "—", "–",
    "in today's", "in the world of", "when it comes to",
    "delve", "leverage", "harness", "unlock", "supercharge",
    "landscape", "tapestry", "intricate", "seamless",
]


SITE_CONFIG: dict = {
    "site_key": "agency",
    "display_name": "Agency Founder Finance",
    "domain": "agencyfounderfinance.co.uk",
    "site_base_url": "https://www.agencyfounderfinance.co.uk",
    "author_name": "Agency Founder Finance Editorial Team",
    "output_dir": "digital-agency/web/content/blog",
    "pillar_output_dir": "digital-agency/web/content/fundamentals",

    "topic_table": "blog_topics",  # unified post Phase 4; site_key column isolates rows
    "topic_column": "topic",
    "secondary_keywords_shape": "array",
    "done_marker_field": "used",
    "done_marker_value": True,
    "done_timestamp_field": "used_at",
    "slug_field": "slug",
    "topic_order": "publish_priority.desc.nullslast,keyword_difficulty.asc.nullslast,created_at.asc",

    "llm_provider": "anthropic",
    "llm_model": "claude-sonnet-4-6",
    "max_tokens": 6500,
    "temperature": 0.3,
    "verify_with_haiku": True,

    "post_categories": list(_POST_CATEGORIES),
    "internal_link_slugs": list(_INTERNAL_LINK_SLUGS),
    "anchor_terms": None,
    "anchor_rules": None,
    "hallucination_zones": _HALLUCINATION_ZONES,
    "banned_phrases": _BANNED_PHRASES,

    "audience_link_map": _AUDIENCE_LINK_MAP,
    "default_audience_link": "/services",

    "system_prompt": _BLOG_SYSTEM_PROMPT,
    "pillar_system_prompt": _PILLAR_SYSTEM_PROMPT,

    "seo_persona": {
        "audience": "UK marketing/digital/creative/PR agency founders. Service-business cash flow. IR35-aware. Want to scale + sell. ICAEW-aligned advisory tone.",
        "language_cues": [
            "utilisation rate", "billable rate", "retainer book", "project burn",
            "gross margin", "EBITDA multiple", "R&D 186% deduction", "IR35 SDS",
            "VAT flat rate 14.5%", "BADR 14%", "growth share scheme",
        ],
        "preferred_hooks": ["specific % margin", "£ R&D credit", "agency-specific metric", "BADR rate + year"],
        "banned_openers_extra": ["For agencies", "If you run an agency", "Agency founders"],
        "brand_authority": "mid",
        "geo_qualifiers": "Shoreditch / Manchester NQ / Bristol Harbourside / Soho when topic is geographic",
        "voice_signature": "Founder-to-founder. Agency operations + accounting. Not generic business advice.",
    },

    "canonical_format": "/blog/{category_slug}/{slug}",
    "category_slug_rules": {"and_replaces_ampersand": False},  # Agency uses "and" written naturally

    "use_research_bundle": True,
    "fetch_image": True,
}
