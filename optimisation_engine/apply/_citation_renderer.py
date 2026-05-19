"""
Citation rendering for research-grounded content.

Given a content body with [n] markers and a ResearchBundle, produce:
  - Body with footnote-style superscript links (the [n] becomes a hyperlink anchor)
  - A References section appended at the end of body
  - Per-page authority score persisted to content_authority_score

Also exposes validators used by the content writers:
  - citation_density_meets_minimum(body, bundle, min_per_1000_words)
  - citation_diversity_meets_minimum(body, bundle, min_unique_sources, min_tier_types)
"""
from __future__ import annotations

import re
from datetime import datetime, timezone
from typing import Any

import httpx

from optimisation_engine.apply.frontmatter_utils import estimate_word_count


_CITE_MARKER_RX = re.compile(r"\[(\d+)\]")


def extract_citation_indices(body: str) -> list[int]:
    """Return ordered list of all [n] marker indices appearing in body."""
    return [int(m.group(1)) for m in _CITE_MARKER_RX.finditer(body)]


def citation_density_meets_minimum(body: str, *, min_per_1000_words: float = 5.0) -> tuple[bool, str]:
    """Validator: minimum citations per 1000 words.

    5 per 1000 words = 1 per 200 words.
    """
    n_citations = len(extract_citation_indices(body))
    words = estimate_word_count(body)
    if words < 100:
        # Too short to enforce density meaningfully
        return True, f"body too short ({words} words) to enforce density"
    per_1000 = (n_citations / words) * 1000
    if per_1000 >= min_per_1000_words:
        return True, f"{n_citations} cites / {words} words = {per_1000:.1f}/1000w (>= {min_per_1000_words})"
    return False, f"density {per_1000:.1f}/1000w < required {min_per_1000_words}/1000w ({n_citations} cites in {words} words)"


def citation_diversity_meets_minimum(body: str, bundle, *, min_unique_sources: int = 5, min_tier_types: int = 2) -> tuple[bool, str]:
    """Validator: unique source count + tier-type spread."""
    if bundle is None or not getattr(bundle, "sources", None):
        return False, "no research bundle attached"
    indices = set(extract_citation_indices(body))
    if not indices:
        return False, "no [n] markers in body"
    n_sources = len(bundle.sources)
    cited_sources = [bundle.sources[i - 1] for i in indices if 1 <= i <= n_sources]
    unique_domains = {s.domain for s in cited_sources}
    unique_tiers = {s.tier for s in cited_sources}
    if len(unique_domains) < min_unique_sources:
        return False, f"only {len(unique_domains)} unique sources cited (need {min_unique_sources})"
    if len(unique_tiers) < min_tier_types:
        return False, f"only {len(unique_tiers)} source tiers represented (need {min_tier_types})"
    return True, f"{len(unique_domains)} sources across {len(unique_tiers)} tiers"


def render_body_with_footnotes(body: str, bundle) -> str:
    """Convert [n] markers to superscript anchor links pointing at #ref-n."""
    if bundle is None or not getattr(bundle, "sources", None):
        return body
    n_sources = len(bundle.sources)

    def _replace(m: re.Match) -> str:
        idx = int(m.group(1))
        if 1 <= idx <= n_sources:
            return f'<sup><a href="#ref-{idx}" id="cite-{idx}">[{idx}]</a></sup>'
        return m.group(0)  # leave malformed markers as-is

    return _CITE_MARKER_RX.sub(_replace, body)


def render_references_section(bundle, *, heading_level: str = "h2") -> str:
    """Build the References block as HTML-in-markdown."""
    if bundle is None or not getattr(bundle, "sources", None):
        return ""
    lines = [f"<{heading_level}>References</{heading_level}>", "<ol>"]
    for i, s in enumerate(bundle.sources, 1):
        raw_title = s.title or s.domain
        clean_title = raw_title.replace(" — ", ", ").replace(" – ", ", ").replace("—", ", ").replace("–", ", ")
        title = clean_title.replace("<", "&lt;").replace(">", "&gt;")
        lines.append(
            f'  <li id="ref-{i}"><strong>{s.domain}</strong>: '
            f'<a href="{s.url}" rel="noopener noreferrer">{title}</a></li>'
        )
    lines.append("</ol>")
    return "\n".join(lines)


def strip_em_dashes(body: str) -> str:
    """Deterministic em-dash / en-dash removal. Replaces with ', ' (comma + space)
    in most contexts; standalone em-dashes between words become full stops.

    This is a safety-net post-processor — the prompt rules already forbid em-dashes,
    but DeepSeek sometimes slips one in. We strip them before render so they
    never reach the user-facing site.
    """
    # First, ' — ' or ' – ' (em-dash with spaces): treat as a comma break
    body = body.replace(" — ", ", ").replace(" – ", ", ")
    # Then anything else: replace with comma
    body = body.replace("—", ", ").replace("–", ", ")
    return body


def strip_orphan_citation_markers(body: str, max_valid_index: int) -> tuple[str, list[int]]:
    """Remove inline citation markers whose index exceeds max_valid_index.

    Handles both raw `[n]` markers and rendered `<sup><a href="#ref-n">[n]</a></sup>`.

    Returns (cleaned_body, list_of_stripped_indices).
    """
    stripped: list[int] = []

    # First: handle rendered footnote spans
    def _strip_rendered(m: re.Match) -> str:
        idx = int(m.group(1))
        if idx > max_valid_index or idx < 1:
            stripped.append(idx)
            return ""  # remove the whole <sup>...</sup>
        return m.group(0)

    rendered_rx = re.compile(r'<sup><a href="#ref-(\d+)"[^>]*>\[\d+\]</a></sup>')
    body = rendered_rx.sub(_strip_rendered, body)

    # Second: handle raw [n] markers that weren't rendered
    def _strip_raw(m: re.Match) -> str:
        idx = int(m.group(1))
        if idx > max_valid_index or idx < 1:
            stripped.append(idx)
            return ""
        return m.group(0)

    raw_rx = re.compile(r"\[(\d+)\]")
    body = raw_rx.sub(_strip_raw, body)

    # Tidy: collapse double-spaces left by removals
    body = re.sub(r" {2,}", " ", body)
    # Tidy: dangling spaces before punctuation
    body = re.sub(r" +([.,;:])", r"\1", body)
    return body, stripped


def citation_markers_within_bounds(body: str, max_valid_index: int) -> tuple[bool, str]:
    """Validator: every [n] / #ref-n marker must satisfy 1 <= n <= max_valid_index."""
    bad: list[int] = []
    for m in re.finditer(r"\[(\d+)\]", body):
        idx = int(m.group(1))
        if idx < 1 or idx > max_valid_index:
            bad.append(idx)
    for m in re.finditer(r'href="#ref-(\d+)"', body):
        idx = int(m.group(1))
        if idx < 1 or idx > max_valid_index:
            bad.append(idx)
    if bad:
        unique = sorted(set(bad))
        return False, f"orphan citation indices: {unique[:8]} (max valid is {max_valid_index})"
    return True, f"{max_valid_index} sources, all indices in range"


def assemble_final_body(body: str, bundle, *, append_references: bool = True) -> str:
    """Full post-process pipeline: strip em-dashes, strip orphan markers,
    render footnote links, append References."""
    body = strip_em_dashes(body)
    # Strip orphan markers BEFORE rendering footnotes
    n_sources = len(getattr(bundle, "sources", []) or []) if bundle is not None else 0
    if n_sources > 0:
        body, stripped = strip_orphan_citation_markers(body, max_valid_index=n_sources)
        # (Logging the stripped count is the caller's job)
    rendered = render_body_with_footnotes(body, bundle)
    if not append_references:
        return rendered
    refs = render_references_section(bundle)
    if refs:
        return rendered.rstrip() + "\n\n" + refs + "\n"
    return rendered


# ----------------------------------------------------------------------------
# Page-level Sources / References merging (for new_section etc.)
# ----------------------------------------------------------------------------

import re as _re

_REFS_BLOCK_RX = _re.compile(
    r"<h2[^>]*>\s*(?:References|Sources)\s*</h2>\s*<ol[^>]*>(.*?)</ol>",
    flags=_re.IGNORECASE | _re.DOTALL,
)
_SOURCE_URL_RX = _re.compile(r'href="([^"]+)"', flags=_re.IGNORECASE)
_SOURCE_DOMAIN_RX = _re.compile(r"<strong>([^<]+)</strong>")


def _extract_existing_sources(body: str) -> list[dict]:
    """Pull domain + url + title triples from an existing References block."""
    m = _REFS_BLOCK_RX.search(body)
    if not m:
        return []
    block = m.group(1)
    items = _re.findall(r"<li[^>]*>(.*?)</li>", block, flags=_re.DOTALL | _re.IGNORECASE)
    out: list[dict] = []
    for li in items:
        url_m = _SOURCE_URL_RX.search(li)
        dom_m = _SOURCE_DOMAIN_RX.search(li)
        if not url_m:
            continue
        url = url_m.group(1)
        domain_label = dom_m.group(1) if dom_m else ""
        # Strip the optional " (tier)" suffix
        domain = _re.sub(r"\s*\([^)]+\)\s*$", "", domain_label).strip()
        # Title is inside the <a>...</a>
        title_m = _re.search(r"<a[^>]*>([^<]+)</a>", li, flags=_re.IGNORECASE)
        title = title_m.group(1).strip() if title_m else domain
        # Tier label
        tier_m = _re.search(r"\(([^)]+)\)", domain_label)
        tier = tier_m.group(1) if tier_m else ""
        out.append({"domain": domain, "url": url, "title": title, "tier": tier})
    return out


def _build_merged_refs_html(sources: list[dict]) -> str:
    """Render the consolidated References section."""
    if not sources:
        return ""
    lines = ["<h2>Sources</h2>", "<ol>"]
    for i, s in enumerate(sources, 1):
        raw_title = s.get("title") or s.get("domain") or ""
        # Brand voice: no em/en dashes even in source titles. URL stays intact.
        clean_title = raw_title.replace(" — ", ", ").replace(" – ", ", ").replace("—", ", ").replace("–", ", ")
        title = clean_title.replace("<", "&lt;").replace(">", "&gt;")
        lines.append(
            f'  <li id="ref-{i}"><strong>{s["domain"]}</strong>: '
            f'<a href="{s["url"]}" rel="noopener noreferrer">{title}</a></li>'
        )
    lines.append("</ol>")
    return "\n".join(lines)


def merge_references_into_body(body: str, new_bundle) -> str:
    """Ensure the page body has a Sources / References section listing only the
    sources actually cited in the body.

    Strategy:
      1. Find every [n] / #ref-n marker referenced in the body.
      2. Map each cited n to the actual source (from existing block + new bundle).
      3. Renumber from 1 in citation order, rewriting markers and the block.
      4. Drop any "research bundle" sources that the body did not cite —
         keep noise out of the Sources list.

    Renumbers in-place so [n] markers in body stay consistent with the new ol order.
    """
    if new_bundle is None or not getattr(new_bundle, "sources", None):
        return body

    # 1. Collect cited indices in order of first appearance
    seen_in_order: list[int] = []
    for m in _re.finditer(r'<sup><a href="#ref-(\d+)"', body):
        idx = int(m.group(1))
        if idx not in seen_in_order:
            seen_in_order.append(idx)
    for m in _re.finditer(r"\[(\d+)\]", body):
        idx = int(m.group(1))
        if idx not in seen_in_order:
            seen_in_order.append(idx)

    if not seen_in_order:
        # No inline citations to anchor a Sources block — strip any existing
        # block (it would have nothing to point at)
        if _REFS_BLOCK_RX.search(body):
            return _REFS_BLOCK_RX.sub("", body, count=1).rstrip() + "\n"
        return body

    # 2. Build the candidate-source pool (existing block first, then new bundle)
    candidates: list[dict] = list(_extract_existing_sources(body))
    candidate_urls = {c["url"] for c in candidates}
    for s in new_bundle.sources:
        if s.url in candidate_urls:
            continue
        candidates.append({
            "domain": s.domain,
            "url": s.url,
            "title": s.title or s.domain,
            "tier": s.tier or "",
        })
        candidate_urls.add(s.url)

    # 3. Resolve each cited n to a source. Old n is 1-indexed into existing[].
    #    But if the body was generated against new_bundle.sources, the [n] markers
    #    refer to bundle indices. Existing block may not align. We try existing
    #    first, then fall back to bundle index.
    existing_list = _extract_existing_sources(body)
    bundle_list = [{
        "domain": s.domain, "url": s.url, "title": s.title or s.domain, "tier": s.tier or "",
    } for s in new_bundle.sources]

    cited_sources: list[dict] = []
    cited_url_seen: set[str] = set()
    old_to_new: dict[int, int] = {}

    for old_idx in seen_in_order:
        src = None
        # Prefer existing block (if it had a source at that index)
        if 1 <= old_idx <= len(existing_list):
            src = existing_list[old_idx - 1]
        elif 1 <= old_idx <= len(bundle_list):
            src = bundle_list[old_idx - 1]
        if src is None:
            # Orphan marker — caller should have stripped these; ignore here
            continue
        if src["url"] in cited_url_seen:
            # Already mapped this URL under a different old_idx — point to existing new index
            new_idx = next((i for i, c in enumerate(cited_sources, 1) if c["url"] == src["url"]), None)
            if new_idx:
                old_to_new[old_idx] = new_idx
            continue
        cited_sources.append(src)
        cited_url_seen.add(src["url"])
        old_to_new[old_idx] = len(cited_sources)

    # 4. Rewrite inline markers using old_to_new.
    # Segment the body into rendered <sup>...</sup> spans and the surrounding
    # text so the raw [N] pass can't munch the digits the rendered pass just emitted.
    rendered_rx = _re.compile(r'<sup><a href="#ref-(\d+)"[^>]*>\[\d+\]</a></sup>')

    def _renum_rendered(m: _re.Match) -> str:
        old = int(m.group(1))
        new = old_to_new.get(old)
        if new is None:
            return ""  # orphan, strip
        return f'<sup><a href="#ref-{new}" id="cite-{new}">[{new}]</a></sup>'

    def _renum_raw_outside(text: str) -> str:
        raw_rx = _re.compile(r"\[(\d+)\]")
        def _sub(m: _re.Match) -> str:
            old = int(m.group(1))
            new = old_to_new.get(old)
            if new is None:
                return ""
            return f"[{new}]"
        return raw_rx.sub(_sub, text)

    out_parts: list[str] = []
    last = 0
    for m in rendered_rx.finditer(body):
        out_parts.append(_renum_raw_outside(body[last:m.start()]))
        out_parts.append(_renum_rendered(m))
        last = m.end()
    out_parts.append(_renum_raw_outside(body[last:]))
    body = "".join(out_parts)
    # Tidy stray double spaces left by stripped orphans
    body = _re.sub(r" {2,}", " ", body)
    body = _re.sub(r" +([.,;:])", r"\1", body)

    # 5. Render new Sources block (only cited sources, renumbered)
    new_block = _build_merged_refs_html(cited_sources)
    if _REFS_BLOCK_RX.search(body):
        return _REFS_BLOCK_RX.sub(new_block, body, count=1)
    return body.rstrip() + "\n\n" + new_block + "\n"


# ----------------------------------------------------------------------------
# Authority scoring (persists to content_authority_score)
# ----------------------------------------------------------------------------


def compute_and_persist_authority_score(
    *,
    site_key: str,
    page_url: str,
    page_slug: str | None,
    body: str,
    bundle,
    supabase_url: str,
    supabase_key: str,
) -> dict:
    """Score the page's citation diversity + source quality and persist."""
    word_count = estimate_word_count(body)
    indices = extract_citation_indices(body)
    if bundle is None or not getattr(bundle, "sources", None):
        cited_sources = []
    else:
        n_sources = len(bundle.sources)
        cited_sources = [bundle.sources[i - 1] for i in indices if 1 <= i <= n_sources]
    unique_domains = sorted({s.domain for s in cited_sources})
    unique_tiers = sorted({s.tier for s in cited_sources})
    citations_per_1000 = (len(indices) / max(1, word_count)) * 1000

    # Citation density score (0-100; >=5/1000w = 100, scales linearly)
    density_score = min(100, int(citations_per_1000 * 20))
    # Source diversity score (0-100; based on unique domains + tiers)
    diversity_score = min(100, len(unique_domains) * 10 + len(unique_tiers) * 15)
    # Source quality (weighted avg of cited source scores)
    if cited_sources:
        quality_score = int(sum(s.score for s in cited_sources) / len(cited_sources))
    else:
        quality_score = 0
    overall = int(0.4 * density_score + 0.3 * diversity_score + 0.3 * quality_score)

    flags: list[str] = []
    if "canonical" not in unique_tiers:
        flags.append("no_canonical_source")
    if len(unique_domains) < 3:
        flags.append("under_3_unique_domains")
    if density_score < 50:
        flags.append("low_citation_density")

    tier_breakdown: dict[str, int] = {}
    for s in cited_sources:
        tier_breakdown[s.tier] = tier_breakdown.get(s.tier, 0) + 1

    payload = {
        "site_key": site_key,
        "page_url": page_url,
        "page_slug": page_slug,
        "word_count": word_count,
        "total_citations": len(indices),
        "unique_source_domains": len(unique_domains),
        "unique_source_tiers": len(unique_tiers),
        "citations_per_1000_words": round(citations_per_1000, 2),
        "citation_density_score": density_score,
        "source_diversity_score": diversity_score,
        "source_quality_score": quality_score,
        "overall_authority_score": overall,
        "cited_domains": unique_domains,
        "citation_breakdown_by_tier": tier_breakdown,
        "missing_canonical_sources": "canonical" not in unique_tiers,
        "flags": flags,
    }

    try:
        httpx.post(
            f"{supabase_url}/rest/v1/content_authority_score",
            headers={
                "apikey": supabase_key,
                "Authorization": f"Bearer {supabase_key}",
                "Content-Type": "application/json",
                "Prefer": "return=minimal",
            },
            json=payload,
            timeout=15.0,
        )
    except Exception:
        pass  # non-fatal

    return payload


# ----------------------------------------------------------------------------
# Validator factory functions (curried for use in run_reasoning)
# ----------------------------------------------------------------------------


def citation_density_validator(body_field: str = "body_html", min_per_1000_words: float = 5.0):
    def _v(o):
        body = (o or {}).get(body_field) or ""
        return citation_density_meets_minimum(body, min_per_1000_words=min_per_1000_words)
    return _v


def citation_diversity_validator(bundle, body_field: str = "body_html", min_unique_sources: int = 5, min_tier_types: int = 2):
    def _v(o):
        body = (o or {}).get(body_field) or ""
        return citation_diversity_meets_minimum(body, bundle, min_unique_sources=min_unique_sources, min_tier_types=min_tier_types)
    return _v


if __name__ == "__main__":
    # Quick self-test
    body = """<p>UK CGT rates on residential property for 2026/27 are 18% [1] and 24% [2].
    The annual exempt amount is £3,000 [3], unchanged from 2025/26 [4]. The 60-day
    reporting window remains in place [5].</p>"""

    class _FakeBundle:
        class _Source:
            def __init__(self, **kw): self.__dict__.update(kw)
        sources = [
            _Source(domain="gov.uk", url="https://gov.uk/cgt", title="CGT rates", tier="canonical", score=100),
            _Source(domain="hmrc.gov.uk", url="https://hmrc.gov.uk/cgt", title="HMRC CGT", tier="canonical", score=100),
            _Source(domain="icaew.com", url="https://icaew.com/cgt", title="ICAEW CGT", tier="authority", score=90),
            _Source(domain="ifs.org.uk", url="https://ifs.org.uk/cgt", title="IFS CGT", tier="authority", score=95),
            _Source(domain="taxjournal.com", url="https://taxjournal.com/cgt", title="Tax Journal CGT", tier="industry", score=75),
        ]
        claims = []

    ok_density, det_density = citation_density_meets_minimum(body)
    print(f"density: {ok_density} - {det_density}")

    ok_div, det_div = citation_diversity_meets_minimum(body, _FakeBundle())
    print(f"diversity: {ok_div} - {det_div}")

    print()
    print("=== Rendered body ===")
    print(assemble_final_body(body, _FakeBundle()))
