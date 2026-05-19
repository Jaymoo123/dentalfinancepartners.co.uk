"""Medical site configuration."""
from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]

_CONFIG_PATH = ROOT / "Medical" / "pipeline" / "config_supabase.py"
_spec = importlib.util.spec_from_file_location("_medical_config_supabase", _CONFIG_PATH)
if _spec is None or _spec.loader is None:
    raise ImportError(f"Cannot load Medical config from {_CONFIG_PATH}")
_mod = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_mod)

_BLOG_SYSTEM_PROMPT = _mod.BLOG_SYSTEM_PROMPT
_POST_CATEGORIES = _mod.POST_CATEGORIES
_INTERNAL_LINK_SLUGS = _mod.INTERNAL_LINK_SLUGS


_AUDIENCE_LINK_MAP: list[tuple[list[str], str]] = [
    (["nhs pension", "annual allowance"], "/nhs-pension"),
    (["incorporation", "limited company"], "/services"),
    (["calculator"], "/calculators"),
]


_HALLUCINATION_ZONES: list[str] = [
    'NHS Pension annual allowance is £60,000 standard (NOT £40,000 — raised in April 2023). Tapered for adjusted income above £260,000.',
    'McCloud remedy applies to members with benefits in legacy schemes (1995 or 2008) between 1 April 2015 and 31 March 2022. They can choose at retirement which scheme rules apply for that period.',
    'NHS Pension Scheme has three sections: 1995 (closed), 2008 (closed), 2015 CARE (current). Many members have legacy benefits from 1995 or 2008.',
    'IR35 status for locum doctors via Ltd company: from 6 April 2021, when the engaging NHS trust or hospital is medium/large, the engager (not the PSC) determines status. Inside-IR35 means PAYE deductions.',
    'MDU / MPS / MDDUS indemnity is an allowable trade expense for self-employed doctors. For employees, treatment depends on whether the employer reimburses.',
    'GP partners are typically self-employed and taxed on their share of partnership profits via self-assessment, not PAYE.',
    'Private practice income through a limited company: corporation tax (19% / 25% with marginal relief), dividend tax on extracted profits. Not income tax on the full sum.',
    'NHS England, Welsh NHS, NHS Scotland, and HSC NI each have separate contract / pension administration. Do not assume rules are uniform across the UK nations.',
    'Tapered annual allowance: threshold income above £200,000 AND adjusted income above £260,000 triggers taper. Reduces annual allowance by £1 for every £2 over.',
    'Doctors\' working time directive: 48-hour average opt-out is voluntary. Not directly a tax matter but affects locum/permanent role structure.',
]


_BANNED_PHRASES: list[str] = [
    "—", "–",
    "in today's", "in the world of", "when it comes to",
    "delve", "leverage", "harness", "unlock", "supercharge",
    "landscape", "tapestry", "intricate", "seamless",
]


SITE_CONFIG: dict = {
    "site_key": "medical",
    "display_name": "Medical Accountants UK",
    "domain": "medicalaccountantsuk.co.uk",
    "site_base_url": "https://medicalaccountantsuk.co.uk",
    "author_name": "Medical Accountants UK Editorial Team",
    "output_dir": "Medical/web/content/blog",
    "pillar_output_dir": None,

    "topic_table": "blog_topics_medical",
    "topic_column": "keyword",  # Medical uses "keyword" not "topic"
    "secondary_keywords_shape": "columns",
    "done_marker_field": "status",  # Medical uses status, not used
    "done_marker_value": "published",
    "done_timestamp_field": "published_at",
    "slug_field": "slug",
    "topic_order": "priority.asc,difficulty.asc.nullslast,created_at.asc",

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
    "pillar_system_prompt": None,

    "canonical_format": "/blog/{slug}",  # Medical uses flat /blog/{slug}
    "category_slug_rules": {"and_replaces_ampersand": True},

    "use_research_bundle": True,
    "fetch_image": True,
}
