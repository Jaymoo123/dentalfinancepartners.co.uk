"""
Shared validators used by every apply module.

These run during build_brief() and add their pass/fail to ChangeBrief.
Designed to be conservative — if there's any doubt, fail closed (can_apply=False).
"""
from __future__ import annotations

import re
from pathlib import Path

# Banned characters/patterns in user-facing copy (per memory: no em-dashes).
BANNED_CHARS = ["—", "–"]  # em-dash, en-dash
BANNED_PHRASES = [
    "click here", "read more", "see here", "find out more",
    "ultimate guide", "amazing", "discover", "unlock", "supercharge",
    "leverage", "deep dive", "game-changer", "game changer",
]


def no_banned_chars(text: str) -> tuple[bool, str]:
    """Pass if no banned characters are present."""
    if not isinstance(text, str):
        return True, ""
    for ch in BANNED_CHARS:
        if ch in text:
            return False, f"banned char {ch!r} present"
    return True, ""


def no_banned_phrases(text: str) -> tuple[bool, str]:
    if not isinstance(text, str):
        return True, ""
    low = text.lower()
    for p in BANNED_PHRASES:
        if p in low:
            return False, f"banned phrase {p!r} present"
    return True, ""


def char_limit(text: str, *, min_len: int, max_len: int) -> tuple[bool, str]:
    if not isinstance(text, str):
        return False, "not a string"
    if not (min_len <= len(text) <= max_len):
        return False, f"length {len(text)} not in [{min_len}, {max_len}]"
    return True, ""


def contains_token(text: str, tokens: list[str]) -> tuple[bool, str]:
    """At least ONE of the tokens must appear in text (case-insensitive)."""
    low = (text or "").lower()
    for t in tokens:
        if t and t.lower() in low:
            return True, ""
    return False, f"none of tokens {tokens} found in text"


def file_exists(path: Path | str) -> tuple[bool, str]:
    p = Path(path)
    if p.exists() and p.is_file():
        return True, ""
    return False, f"file not found: {p}"


def url_resolves(url: str, *, timeout: float = 10.0) -> tuple[bool, str]:
    import httpx
    if not url or not url.startswith(("http://", "https://")):
        return False, f"invalid URL: {url!r}"
    try:
        with httpx.Client(timeout=timeout, follow_redirects=True) as client:
            r = client.head(url, headers={"User-Agent": "Mozilla/5.0 (compatible; AccountingBot/1.0)"})
            if r.status_code < 400:
                return True, f"HEAD {r.status_code}"
            r = client.get(url, headers={"User-Agent": "Mozilla/5.0 (compatible; AccountingBot/1.0)"})
            if r.status_code < 400:
                return True, f"GET {r.status_code}"
            return False, f"status {r.status_code}"
    except Exception as exc:
        return False, f"request error: {type(exc).__name__}"


def valid_markdown_after_edit(body: str) -> tuple[bool, str]:
    """Cheap sanity checks on the post-edit body."""
    if not body or not body.strip():
        return False, "body is empty"
    # Mismatched paragraph tags
    p_open = body.count("<p>")
    p_close = body.count("</p>")
    if p_open != p_close:
        return False, f"mismatched <p> tags: {p_open} open vs {p_close} close"
    h2_open = body.count("<h2>")
    h2_close = body.count("</h2>")
    if h2_open != h2_close:
        return False, f"mismatched <h2> tags: {h2_open} open vs {h2_close} close"
    return True, ""


def markdown_link_format(anchor: str, url: str) -> tuple[bool, str]:
    """The markdown link will render correctly."""
    if "]" in anchor or "[" in anchor:
        return False, f"anchor contains square brackets: {anchor!r}"
    if "(" in url or ")" in url:
        # URLs with parens require escaping; for simplicity reject
        return False, f"URL contains parens: {url!r}"
    if not url.startswith(("http://", "https://", "/")):
        return False, f"URL doesn't look like a valid link target: {url!r}"
    return True, ""


def yaml_round_trip(path: Path | str) -> tuple[bool, str]:
    """After edit, file still parses as YAML frontmatter."""
    from optimisation_engine.apply.frontmatter_utils import read, FrontmatterError
    try:
        read(path)
        return True, ""
    except FrontmatterError as exc:
        return False, str(exc)
