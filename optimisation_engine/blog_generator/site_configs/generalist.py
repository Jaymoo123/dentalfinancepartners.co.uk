"""Generalist (Holloway Davies) site configuration."""
from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]

_CONFIG_PATH = ROOT / "generalist" / "pipeline" / "config_supabase.py"
_spec = importlib.util.spec_from_file_location("_generalist_config_supabase", _CONFIG_PATH)
if _spec is None or _spec.loader is None:
    raise ImportError(f"Cannot load Generalist config from {_CONFIG_PATH}")
_mod = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_mod)

_BLOG_SYSTEM_PROMPT = _mod.BLOG_SYSTEM_PROMPT
_PILLAR_SYSTEM_PROMPT = _mod.PILLAR_SYSTEM_PROMPT
_POST_CATEGORIES = _mod.POST_CATEGORIES
_INTERNAL_LINK_SLUGS = _mod.INTERNAL_LINK_SLUGS


_AUDIENCE_LINK_MAP: list[tuple[list[str], str]] = [
    (["ir35", "contractor"], "/blog/limited-company-tax"),
    (["dividend", "director", "salary"], "/blog/director-pay-and-dividends"),
    (["incorporat", "limited company vs", "holding", "family investment"], "/blog/incorporation-and-structure"),
    (["exit", "sell", "badr", "disposal", "cgt", "capital gains"], "/blog/exit-and-capital-gains"),
    (["mtd", "making tax digital", "vat"], "/blog/vat-and-making-tax-digital"),
    (["r&d", "research and development"], "/r-and-d-credits"),
    (["payroll", "paye", "p11d"], "/blog/payroll-and-paye"),
    (["corporation tax"], "/blog/corporation-tax"),
    (["sole trader", "self employ", "self assessment"], "/blog/sole-trader-and-self-employment"),
    (["bookkeep", "confirmation statement", "companies house"], "/blog/bookkeeping-and-compliance"),
]


_HALLUCINATION_ZONES: list[str] = [
    'Corporation tax: 19% small profits (up to £50,000), 25% main rate (above £250,000), marginal relief between.',
    'Dividend allowance is £500 for 2024/25 onwards. Dividend tax: 8.75% basic / 33.75% higher / 39.35% additional.',
    'BADR (Business Asset Disposal Relief): 14% for 2025/26, rising to 18% from 6 April 2026. Lifetime limit £1m.',
    'Personal allowance: £12,570 (tapered above £100,000, fully removed at £125,140).',
    'VAT registration threshold: £90,000 (raised April 2024). Deregistration threshold: £88,000. Standard VAT rate: 20%.',
    'MTD for Income Tax mandates from 6 April 2026 for sole traders + landlords with gross income > £50,000. Drops to > £30,000 in April 2027.',
    'R&D Enhanced Deduction: 186% for SME loss-makers from 1 April 2023. SME and RDEC merged scheme from accounting periods on/after 1 April 2024.',
    'IR35 off-payroll rules: medium / large clients determine status from 6 April 2021 (not the PSC). Inside-IR35 triggers PAYE deductions.',
    'Employment Allowance 2025/26: £10,500 (NOT £5,000). Employer NI: 15% above £5,000/year threshold.',
    'Self Assessment: paper deadline 31 October, online deadline 31 January. Payment on Account threshold is £1,000 (50/50 split, 31 January + 31 July).',
]


_BANNED_PHRASES: list[str] = [
    "—", "–",
    "in today's", "in the world of", "when it comes to",
    "delve", "leverage", "harness", "unlock", "supercharge",
    "landscape", "tapestry", "intricate", "seamless",
]


SITE_CONFIG: dict = {
    "site_key": "generalist",
    "display_name": "Holloway Davies",
    "domain": "hollowaydavies.co.uk",
    "site_base_url": "https://www.hollowaydavies.co.uk",
    "author_name": "Holloway Davies Editorial Team",
    "output_dir": "generalist/web/content/blog",
    "pillar_output_dir": "generalist/web/content/fundamentals",

    "topic_table": "blog_topics_generalist",
    "topic_column": "topic",
    "secondary_keywords_shape": "array",
    "done_marker_field": "used",
    "done_marker_value": True,
    "done_timestamp_field": "used_at",
    "slug_field": "slug",
    "topic_order": "publish_priority.desc.nullslast,keyword_difficulty.asc.nullslast,created_at.asc",

    "llm_provider": "deepseek",
    "llm_model": "deepseek-chat",
    "max_tokens": 4096,
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

    "canonical_format": "/blog/{category_slug}/{slug}",
    "category_slug_rules": {"and_replaces_ampersand": False},

    "use_research_bundle": True,
    "fetch_image": True,
}
