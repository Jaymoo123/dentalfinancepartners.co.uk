"""
Unified post-generation validation.

Combines the strictest checks observed across the 6 existing generators
plus the new validators from this session's hardening.

Returns a list of validation issues (empty = pass). Designed to be called
AFTER post_processing has run, so em-dash strip / meta truncation /
citation render have already happened.
"""
from __future__ import annotations

import re
from typing import Any


def validate_post(fields: dict, *, site_config: dict) -> list[str]:
    """Run all validation rules and return a list of issue strings.

    Empty list means the post passes. Each issue is a short human-readable
    string; the caller decides how to handle them (warn vs reject).
    """
    issues: list[str] = []

    # ---- Required fields --------------------------------------------------
    name = fields.get("name") or fields.get("title") or ""
    slug = fields.get("slug") or ""
    category = fields.get("category") or ""
    meta_title = fields.get("meta_title") or fields.get("metaTitle") or ""
    meta_desc = fields.get("meta_description") or fields.get("metaDescription") or ""
    content = fields.get("content") or fields.get("body_html") or ""

    if not name:
        issues.append("Missing title/name")
    if not slug or slug == "untitled":
        issues.append("Missing or default slug")
    if category and site_config.get("post_categories"):
        if category not in site_config["post_categories"]:
            issues.append(f"Category {category!r} not in configured list")
    if not meta_title:
        issues.append("Missing metaTitle")
    if not meta_desc:
        issues.append("Missing metaDescription")
    if not content:
        issues.append("Missing content")

    # ---- Length checks (after deterministic truncation has run) ----------
    if meta_title and len(meta_title) > 60:
        issues.append(f"metaTitle too long ({len(meta_title)} chars, max 60)")
    if meta_desc and len(meta_desc) > 155:
        issues.append(f"metaDescription too long ({len(meta_desc)} chars, max 155)")
    if meta_desc and len(meta_desc) < 50:
        issues.append(f"metaDescription too short ({len(meta_desc)} chars, min 50)")
    if content and len(content) < 500:
        issues.append(f"Content too short ({len(content)} chars, min 500)")

    # ---- Markdown contamination -----------------------------------------
    if content and re.search(r"\[.*?\]\(.*?\)", content):
        issues.append("Content contains markdown links (should be HTML <a> tags)")

    # ---- Em-dash / en-dash should be stripped by now --------------------
    if content and ("—" in content or "–" in content):
        issues.append("Content contains em/en-dashes after strip pass")
    if meta_title and ("—" in meta_title or "–" in meta_title):
        issues.append("metaTitle contains em/en-dashes")
    if meta_desc and ("—" in meta_desc or "–" in meta_desc):
        issues.append("metaDescription contains em/en-dashes")

    # ---- FAQ count ------------------------------------------------------
    n_faqs = sum(
        1 for i in range(1, 9)
        if (fields.get(f"faq{i}") or "").strip() and (fields.get(f"faa{i}") or "").strip()
    )
    if n_faqs < 3:
        issues.append(f"Only {n_faqs} FAQs (need at least 3)")

    # ---- Citation marker bounds ----------------------------------------
    n_sources = fields.get("_n_sources_in_block", 0)
    if isinstance(n_sources, int) and n_sources > 0:
        bad = [
            int(m.group(1)) for m in re.finditer(r'href="#ref-(\d+)"', content)
            if int(m.group(1)) < 1 or int(m.group(1)) > n_sources
        ]
        if bad:
            issues.append(f"Orphan citation indices in body: {sorted(set(bad))[:5]} (max valid {n_sources})")

    # ---- Citation DENSITY (when bundle is rich) ------------------------
    # If the research bundle had a canonical source AND >= 5 claims AND >= 5
    # sources, the body must have at least one [n] citation per 500 words.
    # This catches the "DeepSeek ignored a rich bundle entirely" failure mode.
    research_summary = fields.get("_research_summary") or {}
    if (
        research_summary.get("canonical_present")
        and research_summary.get("n_claims", 0) >= 5
        and research_summary.get("n_sources", 0) >= 5
    ):
        n_cites = len(re.findall(r'<sup><a href="#ref-\d+"', content))
        word_count = len(content.split())
        if word_count >= 500:
            min_required = max(1, word_count // 500)
            if n_cites < min_required:
                issues.append(
                    f"Citation density too low: {n_cites} cites in {word_count} words "
                    f"(need >= {min_required}). Bundle has {research_summary.get('n_sources')} sources "
                    f"with canonical present, so citations are required."
                )

    # ---- SEO meta strategy pre-flight gates ----------------------------
    if meta_desc:
        issues.extend(_validate_meta_description(meta_desc, site_config))
    if meta_title:
        issues.extend(_validate_meta_title(meta_title))

    # ---- Site-specific anchor-term requirement (Dentists / Solicitors) ---
    anchor_terms = site_config.get("anchor_terms")
    anchor_rules = site_config.get("anchor_rules")
    if anchor_terms and anchor_rules:
        issues.extend(_validate_anchor_terms(name, content, anchor_terms, anchor_rules))

    # ---- Competitor name-drop checks ------------------------------------
    if content:
        # Pattern 1: a sentence framing other firms as the example.
        # "Firms like X Ltd...", "such as Y Ltd at 123 Address...",
        # "companies like Z Limited", "firms such as ABC Accountants LLP".
        competitor_intro = re.compile(
            r"\b(?:firms?|companies|practices)\s+(?:like|such as|including|e\.g\.)\s+"
            r"[A-Z][A-Za-z]+(?:\s+[A-Z][A-Za-z]+)*\s+"
            r"(?:Ltd|Limited|LLP|Plc|Group|Accountants|Accountancy)",
            re.IGNORECASE,
        )
        if competitor_intro.search(content):
            issues.append("Content names a specific competitor firm via 'firms like X Ltd'/'such as Y Accountants' pattern")
        # Pattern 2: a UK postcode in the body (likely a competitor address)
        postcode = re.compile(r"\b[A-Z]{1,2}\d[A-Z\d]?\s+\d[A-Z]{2}\b")
        if postcode.search(content):
            issues.append("Content contains a UK postcode (likely a competitor address)")

    # ---- Banned-phrase checks (per-site) --------------------------------
    banned = site_config.get("banned_phrases") or []
    if banned and content:
        content_lower = content.lower()
        for phrase in banned:
            if phrase.lower() in content_lower:
                issues.append(f"Banned phrase appears in content: {phrase!r}")

    return issues


def _validate_anchor_terms(
    name: str,
    content: str,
    anchor_terms: list[str],
    anchor_rules: dict,
) -> list[str]:
    """Check that anchor terms appear where the rules say they must."""
    issues: list[str] = []
    name_lower = (name or "").lower()
    content_lower = (content or "").lower()

    # H1 (title) must contain at least one anchor term
    if anchor_rules.get("h1_must_contain_any", True):
        if not any(t.lower() in name_lower for t in anchor_terms):
            issues.append("H1/title contains no anchor term (must contain at least one)")

    # First 200 words must contain at least N distinct anchor terms
    min_in_intro = anchor_rules.get("first_200_words_min_count", 0)
    if min_in_intro:
        intro_words = " ".join(content_lower.split()[:200])
        n_found = len({t.lower() for t in anchor_terms if t.lower() in intro_words})
        if n_found < min_in_intro:
            issues.append(
                f"Intro (first 200 words) contains {n_found} anchor terms, "
                f"needs {min_in_intro}"
            )

    # At least one H2 must contain an anchor term
    if anchor_rules.get("h2_must_contain_any", False):
        h2s = re.findall(r"<h2[^>]*>(.*?)</h2>", content, flags=re.IGNORECASE | re.DOTALL)
        if not any(any(t.lower() in h.lower() for t in anchor_terms) for h in h2s):
            issues.append("No <h2> contains an anchor term")

    return issues


# ---------------------------------------------------------------------------
# SEO meta strategy validators (the pre-flight gates from the meta strategy)
# ---------------------------------------------------------------------------

# Banned meta-description openers (generic, low-CTR phrases)
_BANNED_META_OPENERS = {
    "learn", "discover", "find", "in", "everything",
    "if", "read", "understand", "explore", "uncover",
}

# Per-meta-description hook signals: at least ONE must be present.
_HOOK_PATTERNS = [
    re.compile(r"£\s?\d"),                             # £ figure
    re.compile(r"\d{1,3}(?:\.\d+)?%"),                 # percentage
    re.compile(r"20\d{2}"),                            # year (2020+)
    re.compile(r"\b(?:Section|s\.|Schedule|Sch)\s?\d", re.IGNORECASE),  # named rule
    re.compile(r"\b(?:April|January|July|October)\s+20\d{2}"),  # specific deadline
    re.compile(r"\b\d+\s+(?:day|month|year|week)s?\b", re.IGNORECASE),  # time qualifier
]


def _validate_meta_description(meta_desc: str, site_config: dict) -> list[str]:
    """Pre-flight gates from the holistic meta strategy."""
    issues: list[str] = []

    first_word = meta_desc.strip().split(" ", 1)[0].strip(",.;:").lower() if meta_desc.strip() else ""
    if first_word in _BANNED_META_OPENERS:
        issues.append(f"metaDescription opens with banned word {first_word!r} — pick a specific hook instead")

    # Per-site banned openers (in addition to global)
    persona = site_config.get("seo_persona") or {}
    extra_banned = [b.lower() for b in (persona.get("banned_openers_extra") or [])]
    md_lower = meta_desc.lower()
    for ban in extra_banned:
        if md_lower.startswith(ban.lower()):
            issues.append(f"metaDescription opens with site-banned phrase {ban!r}")

    # Must contain at least one specific signal (hook)
    has_hook = any(rx.search(meta_desc) for rx in _HOOK_PATTERNS)
    if not has_hook:
        issues.append(
            "metaDescription has no specific signal (£ figure, % rate, year 20XX, "
            "section/schedule, deadline, or time qualifier). Add a concrete number."
        )

    return issues


def _validate_meta_title(meta_title: str) -> list[str]:
    """Pre-flight gates for metaTitle."""
    issues: list[str] = []

    # No site-brand suffix appended by the LLM
    # Match " | Brand", " | Brand Name", " | Brand Name Partners", etc.
    suspicious_endings = re.search(r"\|\s*[A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)*\s*$", meta_title)
    if suspicious_endings:
        issues.append(f"metaTitle appears to include a brand suffix: {suspicious_endings.group(0)!r}. The renderer adds it.")

    # No generic "complete guide to..." or "everything you need..."
    weak_patterns = [
        r"complete guide to",
        r"everything you need",
        r"comprehensive guide",
        r"ultimate guide",
        r"\ba complete\b",
    ]
    ml = meta_title.lower()
    for pat in weak_patterns:
        if re.search(pat, ml):
            issues.append(f"metaTitle contains weak/generic phrasing matching {pat!r}")

    return issues
