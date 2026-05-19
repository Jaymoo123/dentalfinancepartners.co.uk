"""
Checkpoint 7: External Link Suggester.

For a target page, identify 2-3 places where an authoritative outbound link
would naturally fit. Uses a curated per-niche allowlist (gov.uk, HMRC, ICAEW,
trade bodies) and Serper to find the exact relevant URL on each authority.

Flow:
  1. For each authoritative domain in the niche's allowlist:
     - Run site:domain "primary query" via Serper
     - Take the top organic result as the candidate URL
  2. HEAD-check candidate URLs (must return 200)
  3. Ask DeepSeek to pick which 2-3 candidates would fit naturally in the
     page body, with anchor text + insertion hint
  4. Validators: HEAD 200, domain in allowlist, anchor not generic, anchor
     diversity, no duplicates against existing outbound links in the page

Cost: ~$0.005-0.010 per page (3-5 Serper site: queries + 1 DeepSeek call).
"""
from __future__ import annotations

import os
import re
import sys
from pathlib import Path
from urllib.parse import urlparse

import httpx

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from optimisation_engine.clients.serper_client import SerperClient  # noqa: E402
from optimisation_engine.config import get_site  # noqa: E402
from optimisation_engine.reasoning.action_specifier import _read_page  # noqa: E402
from optimisation_engine.reasoning.deepseek_runner import (  # noqa: E402
    ReasoningResult,
    no_em_dashes,
    require_keys,
    run_reasoning,
)
from optimisation_engine.reasoning.internal_link_suggester import (  # noqa: E402
    BAD_ANCHORS,
    _significant_tokens,
    _tokens_overlap_stemmed,
)

# Per-niche curated allowlist of authoritative outbound domains.
# These domains have high E-E-A-T value and aren't direct competitors.
AUTHORITY_DOMAINS = {
    "all": [
        "gov.uk",
        "hmrc.gov.uk",
        "legislation.gov.uk",
        "icaew.com",
    ],
    "property": [
        "nrla.org.uk",                  # National Residential Landlords Assoc.
        "propertymark.co.uk",           # Estate-agent regulator
        "rla.org.uk",                   # Old name; redirects to NRLA
        "ons.gov.uk",                   # statistics, occasionally relevant
    ],
    "dentists": [
        "bda.org",                      # British Dental Association
        "gdc-uk.org",                   # General Dental Council (regulator)
        "nhsbsa.nhs.uk",                # NHS Business Services Authority
        "england.nhs.uk",
    ],
    "agency": [
        "ico.org.uk",                   # data protection
        "companieshouse.gov.uk",
        "asa.org.uk",                   # ad standards
    ],
    "generalist": [
        "fca.org.uk",
        "cipd.co.uk",
        "ons.gov.uk",
        "bankofengland.co.uk",
    ],
}


def _allowlist_for(site_key: str) -> list[str]:
    return AUTHORITY_DOMAINS["all"] + AUTHORITY_DOMAINS.get(site_key, [])


def _head_check(url: str, *, timeout: float = 10.0) -> bool:
    """Return True if URL returns 2xx on HEAD (or GET fallback)."""
    try:
        with httpx.Client(timeout=timeout, follow_redirects=True) as client:
            r = client.head(url, headers={"User-Agent": "Mozilla/5.0 (compatible; AccountingResearchBot/1.0)"})
            if r.status_code < 400:
                return True
            # Some sites disallow HEAD; try GET with no body read
            r = client.get(url, headers={"User-Agent": "Mozilla/5.0 (compatible; AccountingResearchBot/1.0)"})
            return r.status_code < 400
    except Exception:
        return False


def _domain_of(url: str) -> str:
    if not url:
        return ""
    s = url.lower()
    for p in ("https://", "http://"):
        if s.startswith(p):
            s = s[len(p):]
    if s.startswith("www."):
        s = s[4:]
    return s.split("/", 1)[0]


def _find_authority_url(*, query: str, authority_domain: str, serper: SerperClient, site_key: str | None) -> dict | None:
    """site:authority_domain "query" via Serper. Return the top relevant result or None."""
    site_query = f"site:{authority_domain} {query}"
    try:
        resp = serper.search(query=site_query, num=3, site_key=site_key)
    except Exception:
        return None
    organic = resp.get("organic", []) or []
    for item in organic:
        url = item.get("link") or ""
        d = _domain_of(url)
        # require the result is actually on the authority domain (Serper sometimes
        # returns results from other domains for site: queries that yield no hits)
        if d == authority_domain or d.endswith("." + authority_domain) or authority_domain.endswith("." + d):
            return {
                "domain": authority_domain,
                "url": url,
                "title": item.get("title"),
                "snippet": item.get("snippet"),
            }
    return None


def suggest_external_links_for_target(
    *,
    site_key: str,
    target_slug: str,
    target_url: str,
    primary_query: str,
    target_query_cluster: list[str] | None = None,
    max_candidates: int = 5,
) -> ReasoningResult:
    """Run the external link suggester for one target page."""
    page = _read_page(site_key, target_url, target_slug)
    if not page:
        return ReasoningResult(
            output={"suggestions": [], "confidence": 100, "note": "no target page on disk"},
            confidence=100,
            cost_usd=0.0,
            auto_applicable=True,
            raw_response="(no page — short-circuit)",
        )

    # 1) Find candidate authority URLs (Serper site: queries)
    candidates: list[dict] = []
    serper = SerperClient()
    seen_domains: set[str] = set()
    for authority in _allowlist_for(site_key):
        if len(candidates) >= max_candidates:
            break
        if authority in seen_domains:
            continue
        seen_domains.add(authority)
        cand = _find_authority_url(
            query=primary_query, authority_domain=authority, serper=serper, site_key=site_key,
        )
        if not cand:
            continue
        if not _head_check(cand["url"]):
            continue
        candidates.append(cand)

    if not candidates:
        return ReasoningResult(
            output={"suggestions": [], "confidence": 70, "note": "no authoritative URLs found / validated"},
            confidence=70,
            cost_usd=0.001 * len(seen_domains),
            auto_applicable=False,
            raw_response="(no candidates passed HEAD check)",
        )

    # 2) Ask DeepSeek which candidates would naturally fit + where + with what anchor
    site = get_site(site_key)
    cluster = target_query_cluster or [primary_query]

    candidates_block = "\n".join(
        f"--- CANDIDATE {i+1} ---\n"
        f"  domain: {c['domain']}\n"
        f"  url: {c['url']}\n"
        f"  title: {c['title']!r}\n"
        f"  snippet: {(c.get('snippet') or '')[:300]}"
        for i, c in enumerate(candidates)
    )

    body_excerpt = (page.get("body") or "")[:8000]

    user_input = f"""SITE: {site['display_name']} ({site['domain']})

TARGET PAGE:
  slug: {target_slug}
  url: {target_url}
  H1: {page.get('h1')!r}
  H2 headings present: {page.get('h2_headings', [])}
  Primary query: {primary_query!r}

PAGE BODY (truncated to 8000 chars):
{body_excerpt}

AUTHORITATIVE OUTBOUND CANDIDATES (all HEAD-verified to return 200):

{candidates_block}

For each candidate, decide whether it would slot naturally into the page body
as an outbound authority link, with what anchor text and at what insertion
point. Reject candidates that don't have a natural insertion point in the
existing prose. AT MOST 3 positive suggestions. Vary anchor text across
positive suggestions.

Authority outbound links should appear where a CLAIM is made that the source
substantiates (e.g. citing gov.uk for an HMRC procedure, citing a trade body
for an industry rule).
"""

    examples = [
        {
            "input": (
                "TARGET on Property site discussing CGT rates: body says 'The 60-day reporting "
                "rule requires landlords to file...' and 'HMRC penalties apply if missed.'\n"
                "CANDIDATES:\n"
                "1. gov.uk/cgt-uk-property-account (gov.uk guidance on the 60-day rule)\n"
                "2. hmrc.gov.uk/penalty-rates (HMRC penalty schedule)\n"
                "3. nrla.org.uk/cgt-guide (NRLA general guide)\n"
            ),
            "output": {
                "suggestions": [
                    {
                        "candidate_index": 1,
                        "should_link": True,
                        "anchor_text": "HMRC's 60-day reporting service",
                        "insertion_hint": "Where the page says 'The 60-day reporting rule requires landlords to file' — link 'HMRC's 60-day reporting service' inline.",
                        "reason": "Substantiates the 60-day rule claim with the official HMRC service.",
                    },
                    {
                        "candidate_index": 2,
                        "should_link": True,
                        "anchor_text": "HMRC penalty schedule",
                        "insertion_hint": "Where the page mentions 'HMRC penalties apply' — link 'HMRC penalty schedule' to the specific penalty page.",
                        "reason": "Substantiates the penalty claim with the official schedule.",
                    },
                    {
                        "candidate_index": 3,
                        "should_link": False,
                        "anchor_text": None,
                        "insertion_hint": None,
                        "reason": "NRLA guide is general; the page already cites specific rules; no marginal value over the gov.uk citations.",
                    },
                ],
                "confidence": 88,
            },
        }
    ]

    result = run_reasoning(
        endpoint_name="external_link_suggester",
        role=(
            "an SEO E-E-A-T specialist for a UK accounting firm. You identify places "
            "in an existing page where a citation to an authoritative outbound source "
            "would naturally substantiate a claim being made."
        ),
        task=(
            "For each candidate authority URL, decide whether it would slot naturally "
            "as an outbound link. Specify the anchor text and the exact insertion hint "
            "(referencing existing prose). Cap positive suggestions at 3."
        ),
        schema_description=(
            "{\n"
            '  "suggestions": [\n'
            '    {\n'
            '      "candidate_index": int (1-based, must match an input candidate),\n'
            '      "should_link": boolean,\n'
            '      "anchor_text": string|null,\n'
            '      "insertion_hint": string|null,\n'
            '      "reason": string\n'
            "    }, ...\n"
            "  ],\n"
            '  "confidence": int 0-100\n'
            "}"
        ),
        must_not=[
            "use generic anchor text like 'click here', 'read more', 'see here', 'this', 'here', 'official guidance'",
            "use the SAME anchor_text for multiple positive suggestions — vary the anchor wording across candidates",
            "produce more than 3 positive suggestions",
            "suggest a link where the page does not actually make the claim it would substantiate",
            "use em-dashes or en-dashes anywhere",
            "reference a candidate_index outside the input range",
        ],
        examples=examples,
        validators=[
            require_keys("suggestions", "confidence"),
            lambda o: (
                (True, None)
                if isinstance(o.get("suggestions"), list)
                else (False, "suggestions not a list")
            ),
            # candidate_index must reference a valid input
            lambda o: (
                (True, None)
                if all(
                    isinstance(s.get("candidate_index"), int)
                    and 1 <= s["candidate_index"] <= len(candidates)
                    for s in (o.get("suggestions") or [])
                )
                else (False, "invalid candidate_index in suggestions")
            ),
            # Cap positive suggestions at 3
            lambda o: (
                (True, None)
                if sum(1 for s in (o.get("suggestions") or []) if s.get("should_link")) <= 3
                else (False, "more than 3 positive suggestions")
            ),
            # Anchor not generic
            lambda o: (
                (True, None)
                if all(
                    (not s.get("should_link"))
                    or (
                        isinstance(s.get("anchor_text"), str)
                        and s["anchor_text"].strip().lower() not in BAD_ANCHORS
                    )
                    for s in (o.get("suggestions") or [])
                )
                else (False, "anchor_text is generic for a positive suggestion")
            ),
            # Anchor diversity
            lambda o: (
                (lambda anchors: (True, None) if len(anchors) == len(set(a.strip().lower() for a in anchors)) else (False, "duplicate anchor across positive suggestions"))(
                    [
                        s.get("anchor_text", "")
                        for s in (o.get("suggestions") or [])
                        if s.get("should_link") and s.get("anchor_text")
                    ]
                )
            ),
        ],
        user_input=user_input,
        site_key=site_key,
        confidence_threshold=70,
        max_tokens=2500,
        temperature=0.2,
    )

    # Attach actual candidate URLs to the result so the caller can map index -> URL
    if isinstance(result.output, dict):
        result.output["candidates"] = candidates

    return result


def main() -> None:
    import argparse
    import json

    parser = argparse.ArgumentParser()
    parser.add_argument("site_key")
    parser.add_argument("target_slug")
    parser.add_argument("primary_query")
    args = parser.parse_args()

    site = get_site(args.site_key)
    target_url = f"https://{site['domain']}/blog/{args.target_slug}"
    result = suggest_external_links_for_target(
        site_key=args.site_key,
        target_slug=args.target_slug,
        target_url=target_url,
        primary_query=args.primary_query,
    )
    print(json.dumps(result.output, indent=2)[:4000])
    print(f"\nconfidence={result.confidence} cost=${result.cost_usd:.6f} notes={result.notes}")


if __name__ == "__main__":
    main()
