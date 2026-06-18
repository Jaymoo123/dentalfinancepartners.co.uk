"""Solicitors site configuration."""
from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]

_CONFIG_PATH = ROOT / "Solicitors" / "pipeline" / "config_supabase.py"
_spec = importlib.util.spec_from_file_location("_solicitors_config_supabase", _CONFIG_PATH)
if _spec is None or _spec.loader is None:
    raise ImportError(f"Cannot load Solicitors config from {_CONFIG_PATH}")
_mod = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_mod)

_BLOG_SYSTEM_PROMPT = _mod.BLOG_SYSTEM_PROMPT
_POST_CATEGORIES = _mod.POST_CATEGORIES
_INTERNAL_LINK_SLUGS = _mod.INTERNAL_LINK_SLUGS
_ANCHOR_TERMS = _mod.SOLICITOR_ANCHOR_TERMS


_AUDIENCE_LINK_MAP: list[tuple[list[str], str]] = [
    (["partner", "equity", "llp profit", "extraction"], "/for-partners"),
    (["trainee", "junior", "associate solicitor", "paralegal"], "/for-junior-solicitors"),
    (["buying", "acquisition", "merger", "due diligence"], "/for-firm-buyers"),
    (["locum", "consultant solicitor"], "/for-locum-solicitors"),
    (["sra", "accounts rules", "client account"], "/services/sra-accounts-rules"),
    (["valuation", "goodwill", "sale"], "/services/practice-valuation"),
    (["cofa", "colp", "compliance"], "/services/cofa-compliance-support"),
]


_HALLUCINATION_ZONES: list[str] = [
    'LLPs are TAX TRANSPARENT (NOT subject to corporation tax). Members are taxed on their share of profits via self-assessment.',
    'SRA Accounts Rules reconciliation requirement: every 5 weeks. Exemption applies only to firms with < £10k client money AND < £250 average balance.',
    'Salaried member rules (Finance Act 2014): treat an LLP member as employed for tax if 3 conditions are met (disguised salary, no significant influence, no capital contribution >= 25% of disguised salary).',
    'Goodwill amortisation tax relief is 6.5% per year (NOT 10%) for qualifying goodwill acquired post-1 April 2019. Pre-2019 goodwill generally has no relief.',
    'Conveyancing is subject to SDLT in England/Northern Ireland, LTT in Wales, LBTT in Scotland. Do NOT use SDLT terminology for Welsh or Scottish transactions.',
    'PII (Professional Indemnity Insurance) minimum: £2 million standard, £3 million for sole practitioners and partnerships without recognised legal entity status.',
    'COLP and COFA: Compliance Officer for Legal Practice (regulatory compliance) and Compliance Officer for Finance and Administration (financial compliance + Accounts Rules). Required roles for SRA-regulated firms.',
    'Solicitor practice sale is a CAPITAL disposal (CGT, with BADR if conditions met), NOT trading income.',
    'Money laundering regulations 2017: regulated sector includes legal services involving conveyancing, formations, trust and company services, tax advice. Customer due diligence is mandatory.',
    'Locum solicitor via Ltd company: IR35 rules apply. From 6 April 2021, when the engaging firm is medium/large, the firm (not the PSC) determines status.',
]


_BANNED_PHRASES: list[str] = [
    "—", "–",
    "in today's", "in the world of", "when it comes to",
    "delve", "leverage", "harness", "unlock", "supercharge",
    "landscape", "tapestry", "intricate", "seamless",
]


SITE_CONFIG: dict = {
    "site_key": "solicitors",
    "display_name": "Accounts for Lawyers",
    "domain": "accountsforlawyers.co.uk",
    "site_base_url": "https://www.accountsforlawyers.co.uk",
    "author_name": "Accounts for Lawyers Editorial Team",
    "output_dir": "Solicitors/web/content/blog",
    "pillar_output_dir": None,

    "topic_table": "blog_topics",  # unified post Phase 4; site_key column isolates rows
    "topic_column": "topic",  # was "keyword" pre-Phase 4 — renamed in backfill
    "secondary_keywords_shape": "array",
    "done_marker_field": "status",
    "done_marker_value": "published",
    "done_timestamp_field": "published_at",
    "slug_field": "slug",
    "topic_order": "priority.asc,keyword_difficulty.asc.nullslast,created_at.asc",  # was "difficulty"

    "llm_provider": "anthropic",
    "llm_model": "claude-sonnet-4-20250514",
    "max_tokens": 6500,
    "temperature": 0.3,
    "verify_with_haiku": True,

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

    "audience_link_map": _AUDIENCE_LINK_MAP,
    "default_audience_link": "/services",

    "system_prompt": _BLOG_SYSTEM_PROMPT,
    "pillar_system_prompt": None,

    "seo_persona": {
        "audience": "UK law firm partners, sole practitioner solicitors, COLP/COFA officers, LLP members. Regulated by SRA. Tax-aware around partnership, client account, professional indemnity.",
        "language_cues": [
            "SRA Accounts Rules", "client account reconciliation", "COLP", "COFA",
            "LLP tax-transparent", "salaried member rules FA 2014", "PII minimum",
            "AML regulated", "conveyancing SDLT/LTT/LBTT", "goodwill 6.5%",
        ],
        "preferred_hooks": ["named SRA rule", "£ PII minimum", "regulatory deadline", "salaried-member trigger"],
        "banned_openers_extra": ["For solicitors", "If you're a partner"],
        "brand_authority": "mid",
        "geo_qualifiers": "none",
        "voice_signature": "SRA-Accounts-Rules-fluent. Partnership-vs-LLP-literate. Compliance-aware.",
    },

    "canonical_format": "/blog/{category_slug}/{slug}",
    "category_slug_rules": {"and_replaces_ampersand": True},

    "use_research_bundle": True,
    "fetch_image": True,
}
