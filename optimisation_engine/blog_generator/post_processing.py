"""
Post-processing applied to every LLM output, regardless of provider or site.

Combines the best practices observed across the 6 existing generators:
  - Em-dash / en-dash strip (was only on Agency/Generalist; now everywhere)
  - Meta title / description hard truncation with dangle-word cleanup (same)
  - Auto-append related-post links if internal-link count < 3 (same)
  - Pexels image fetch with photographer credit (was Agency/Generalist; now everywhere)
  - Citation rendering: [n] markers -> <sup><a href="#ref-n">[n]</a></sup>
  - Cited-only <h2>Sources</h2> block (this session)
  - Em-dash strip applied to source titles too (this session)
"""
from __future__ import annotations

import os
import re
from typing import Any

import httpx


# ---------------------------------------------------------------------------
# Em-dash / en-dash strip (deterministic, post-LLM)
# ---------------------------------------------------------------------------


def strip_em_dashes(text: str) -> str:
    """Deterministically remove em-dashes and en-dashes from `text`.

    Strategy:
      1. " — " (with spaces) and " – " become ", " — preserves natural pause
      2. Bare "—" and "–" also become ", "
      3. Collapse the double-comma artefact left by chained "— " -> ", " -> ", ,"
      4. Clean up dangling space-before-punctuation
    """
    if not text:
        return text
    out = (
        text.replace(" — ", ", ")
            .replace(" – ", ", ")
            .replace("—", ", ")
            .replace("–", ", ")
    )
    out = re.sub(r", ?,", ",", out)
    out = re.sub(r" +([.,;:])", r"\1", out)
    out = re.sub(r" {2,}", " ", out)
    return out


# ---------------------------------------------------------------------------
# Meta title / description truncation with dangle-word cleanup
# ---------------------------------------------------------------------------

_DANGLE_WORDS = {"to", "of", "for", "and", "the", "is", "are", "or", "in", "on", "a", "an", "with"}


def truncate_meta(text: str, max_len: int) -> str:
    """Truncate `text` to <= max_len, snapping to a word boundary and
    dropping trailing prepositions / articles / conjunctions."""
    if not text or len(text) <= max_len:
        return text or ""
    truncated = text[:max_len]
    if " " in truncated:
        truncated = truncated.rsplit(" ", 1)[0]
    while truncated and truncated.split()[-1].lower().rstrip(",.;:") in _DANGLE_WORDS:
        truncated = truncated.rsplit(" ", 1)[0]
    truncated = truncated.rstrip(",;:-—– ")
    return truncated


# ---------------------------------------------------------------------------
# Citation rendering ([n] -> <sup>...</sup>, cited-only <h2>Sources</h2>)
# ---------------------------------------------------------------------------


def render_inline_citations(body: str, n_sources: int) -> str:
    """Convert raw `[n]` markers to rendered superscript anchor links.

    Markers with n > n_sources or n < 1 are stripped (orphan-marker guard).
    """
    stripped: list[int] = []

    def _replace(m: re.Match) -> str:
        idx = int(m.group(1))
        if idx < 1 or idx > n_sources:
            stripped.append(idx)
            return ""
        return f'<sup><a href="#ref-{idx}" id="cite-{idx}">[{idx}]</a></sup>'

    body = re.sub(r"\[(\d+)\]", _replace, body)
    body = re.sub(r" {2,}", " ", body)
    body = re.sub(r" +([.,;:])", r"\1", body)
    return body


def render_sources_block(sources: list[dict]) -> str:
    """Build the cited-only <h2>Sources</h2><ol>...</ol> block.

    Each source dict: {domain, url, title}. Em / en dashes are stripped from
    titles before rendering.
    """
    if not sources:
        return ""
    lines = ["<h2>Sources</h2>", "<ol>"]
    for i, s in enumerate(sources, 1):
        raw_title = s.get("title") or s.get("domain") or ""
        clean_title = strip_em_dashes(raw_title).strip()
        title_safe = clean_title.replace("<", "&lt;").replace(">", "&gt;")
        lines.append(
            f'  <li id="ref-{i}"><strong>{s["domain"]}</strong>: '
            f'<a href="{s["url"]}" rel="noopener noreferrer">{title_safe}</a></li>'
        )
    lines.append("</ol>")
    return "\n".join(lines)


def attach_cited_only_sources(body: str, bundle_sources: list[dict]) -> tuple[str, list[dict]]:
    """Given body with `[n]` markers and the full bundle, render footnote
    links AND append a <h2>Sources</h2> block that lists only the sources
    actually cited (renumbered in citation order, no noise).

    Returns (final_body, cited_sources_in_order).
    """
    if not bundle_sources:
        return body, []

    # Pick out cited indices in first-appearance order
    seen_in_order: list[int] = []
    for m in re.finditer(r"\[(\d+)\]", body):
        idx = int(m.group(1))
        if 1 <= idx <= len(bundle_sources) and idx not in seen_in_order:
            seen_in_order.append(idx)

    if not seen_in_order:
        # No usable citations — strip any orphan markers, no Sources block
        body, _ = _strip_orphan_markers(body, max_valid=0)
        return body, []

    # Build the cited list and old->new index map
    cited: list[dict] = []
    old_to_new: dict[int, int] = {}
    for old_idx in seen_in_order:
        src = bundle_sources[old_idx - 1]
        cited.append(src)
        old_to_new[old_idx] = len(cited)

    # Rewrite markers using the new numbering, drop orphans
    def _renum(m: re.Match) -> str:
        old = int(m.group(1))
        new = old_to_new.get(old)
        if new is None:
            return ""
        return f'<sup><a href="#ref-{new}" id="cite-{new}">[{new}]</a></sup>'

    body = re.sub(r"\[(\d+)\]", _renum, body)
    body = re.sub(r" {2,}", " ", body)
    body = re.sub(r" +([.,;:])", r"\1", body)

    refs_block = render_sources_block(cited)
    return body.rstrip() + "\n\n" + refs_block + "\n", cited


def _strip_orphan_markers(body: str, *, max_valid: int) -> tuple[str, list[int]]:
    """Internal: strip [n] markers with n > max_valid or n < 1."""
    stripped: list[int] = []
    def _sub(m: re.Match) -> str:
        idx = int(m.group(1))
        if idx < 1 or idx > max_valid:
            stripped.append(idx)
            return ""
        return m.group(0)
    body = re.sub(r"\[(\d+)\]", _sub, body)
    body = re.sub(r" {2,}", " ", body)
    body = re.sub(r" +([.,;:])", r"\1", body)
    return body, stripped


# ---------------------------------------------------------------------------
# Auto-append related-post links if internal-link count < 3
# ---------------------------------------------------------------------------


def count_internal_links(body: str) -> int:
    """Count <a href="/..."> internal links (not external)."""
    return len(re.findall(r'<a\s+href="/[^"]+"', body, flags=re.IGNORECASE))


def append_related_posts_if_needed(
    body: str,
    *,
    internal_link_slugs: list[str],
    audience_link: str | None,
    min_required: int = 3,
) -> str:
    """If body has < min_required internal links, append a 'Related guides'
    block linking to up to (min_required - current) slugs from internal_link_slugs.
    Prioritises the topic-specific audience link first."""
    n = count_internal_links(body)
    if n >= min_required:
        return body

    need = min_required - n
    # Build the candidate slug list, audience link first if provided
    candidates: list[str] = []
    if audience_link and audience_link not in candidates:
        candidates.append(audience_link)
    for s in internal_link_slugs:
        if s not in candidates:
            candidates.append(s)
        if len(candidates) >= need + 2:  # over-cap a touch for variety
            break

    picks = candidates[:need]
    if not picks:
        return body

    items = "\n".join(
        f'  <li><a href="{slug}">{_humanise_slug(slug)}</a></li>'
        for slug in picks
    )
    related_block = (
        "\n\n<h3>Related guides</h3>\n<ul>\n"
        f"{items}\n"
        "</ul>\n"
    )
    return body.rstrip() + related_block


def _humanise_slug(slug: str) -> str:
    """/services/dental-accountants -> 'Dental accountants'"""
    parts = slug.strip("/").split("/")
    last = parts[-1] if parts else slug
    words = last.replace("-", " ").replace("_", " ").split()
    if not words:
        return slug
    return words[0].capitalize() + " " + " ".join(words[1:]) if len(words) > 1 else words[0].capitalize()


# ---------------------------------------------------------------------------
# Pexels image fetch with photographer credit
# ---------------------------------------------------------------------------


def fetch_image_for_post(query: str) -> dict | None:
    """Fetch a Pexels image for the post. Returns dict with url + photographer,
    or None if PEXELS_API_KEY is absent or the search fails.

    Cost: free (Pexels API is free up to rate limits).
    """
    api_key = os.getenv("PEXELS_API_KEY", "")
    if not api_key:
        return None
    try:
        r = httpx.get(
            "https://api.pexels.com/v1/search",
            headers={"Authorization": api_key},
            params={"query": query, "per_page": 3, "orientation": "landscape"},
            timeout=12.0,
        )
        if r.status_code >= 400:
            return None
        data = r.json()
        photos = data.get("photos") or []
        if not photos:
            return None
        p = photos[0]
        return {
            "url": p["src"]["large"],
            "photographer": p.get("photographer", ""),
            "photographer_url": p.get("photographer_url", ""),
            "pexels_url": p.get("url", ""),
            "alt": p.get("alt", query),
        }
    except Exception:
        return None
