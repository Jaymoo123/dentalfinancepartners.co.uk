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
        title = (s.title or s.domain).replace("<", "&lt;").replace(">", "&gt;")
        tier_label = f" ({s.tier})" if s.tier else ""
        lines.append(
            f'  <li id="ref-{i}"><strong>{s.domain}{tier_label}</strong>: '
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


def assemble_final_body(body: str, bundle, *, append_references: bool = True) -> str:
    """Full post-process pipeline: strip em-dashes, render footnote links, append References."""
    body = strip_em_dashes(body)
    rendered = render_body_with_footnotes(body, bundle)
    if not append_references:
        return rendered
    refs = render_references_section(bundle)
    if refs:
        return rendered.rstrip() + "\n\n" + refs + "\n"
    return rendered


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
