"""
Checkpoint 8: Research Synthesizer (multi-tier source pyramid).

For any topic (primary_query), harvest claims from a tiered pyramid of
authoritative sources, classify each claim, weight by recency, and return
a structured `ResearchBundle` that downstream content writers consume.

Source tiers (try in order, fall back if no results):
  TIER 1 - canonical: gov.uk, HMRC, ONS, OBR, BoE, IFS via Serper site: queries
  TIER 2 - authority: ICAEW, CIOT, trade bodies, regulators (per-niche)
  TIER 3 - industry: Tax Journal, Big-4 commentary, specialist press
  TIER 4 - press: FT, BBC, Telegraph (only if recent + topical)

The output is a `ResearchBundle`:
  - claims: list of {kind, text, source_url, source_domain, source_tier, recency_date}
  - sources: list of {domain, url, title, tier, score}
  - canonical_sources_present: bool (TRUE if at least one Tier 1 source had relevant content)
  - cached: bool (TRUE if reused from research_cache)
  - cost_usd: float

Cache:
  - research_cache table keyed by (topic_key, source_url)
  - TTL 30 days; outside the TTL, re-fetch
"""
from __future__ import annotations

import json
import re
from dataclasses import asdict, dataclass, field
from datetime import date, datetime, timedelta, timezone
from typing import Any
from urllib.parse import urlparse

import httpx
from bs4 import BeautifulSoup

from optimisation_engine.clients.serper_client import SerperClient
from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL
from optimisation_engine.cost_tracker import IdempotencyHit
from optimisation_engine.reasoning.authority_allowlist import (
    AUTHORITY_DOMAINS_ALL,
    BLOCKED_DOMAINS,
    authority_score_for_domain,
    domains_by_tier,
    tier_for_domain,
)
from optimisation_engine.reasoning.deepseek_runner import (
    ReasoningResult,
    no_em_dashes,
    require_keys,
    run_reasoning,
)

CACHE_TTL_DAYS = 30
MAX_FETCH_BYTES = 250_000


# ============================================================================
# Data shapes
# ============================================================================


@dataclass
class Claim:
    kind: str               # 'statistic'|'rule'|'quote'|'definition'|'worked_example'|'general'
    text: str
    source_url: str
    source_domain: str
    source_tier: str
    source_authority_score: int
    recency_date: str | None  # ISO date if extractable
    contains_number: bool
    contains_date: bool


@dataclass
class Source:
    domain: str
    url: str
    title: str
    tier: str
    score: int
    fetched_at: str
    n_claims: int
    # Publication date of the source article (ISO date), as extracted from the
    # page (<time>, meta, prose). None when no date could be parsed. Used by
    # downstream prompts to frame older figures as historical, not current.
    recency_date: str | None = None


@dataclass
class ResearchBundle:
    topic_query: str
    topic_key: str
    claims: list[Claim] = field(default_factory=list)
    sources: list[Source] = field(default_factory=list)
    canonical_sources_present: bool = False
    authority_sources_present: bool = False
    diversity_tier_count: int = 0
    cached_hits: int = 0
    fresh_fetches: int = 0
    total_serper_cost_usd: float = 0.0
    total_deepseek_cost_usd: float = 0.0
    # Top-N competitor SERP results (title + snippet + domain) for the topic
    # query. Captured for the metaTitle / metaDescription differentiation step
    # in the consolidated blog generator. NOT the same thing as research
    # sources — these are pages we want to beat in the SERP.
    competitor_serp: list[dict] = field(default_factory=list)

    def claims_by_tier(self) -> dict[str, int]:
        out: dict[str, int] = {}
        for c in self.claims:
            out[c.source_tier] = out.get(c.source_tier, 0) + 1
        return out

    def to_prompt_block(self, *, max_claims: int = 25) -> str:
        """Format the bundle as a prompt-ready block for content writers.

        IMPORTANT: claims are bulleted (no number) so the writer doesn't confuse
        claim-indices with source-indices. The [n] markers used in the body
        ALWAYS refer to the SOURCES list (numbered [1]..[N_sources]).
        """
        # Build a source-index lookup so we can show each claim with its source's [n]
        source_idx_by_url: dict[str, int] = {s.url: i for i, s in enumerate(self.sources, 1)}

        tier_order = {"canonical": 0, "authority": 1, "industry": 2, "press": 3, "organic": 4, "unknown": 5}
        sorted_claims = sorted(
            self.claims,
            key=lambda c: (tier_order.get(c.source_tier, 9), c.recency_date or "", -c.source_authority_score),
        )[:max_claims]

        lines = [
            f"RESEARCH BUNDLE for topic: {self.topic_query!r}",
            f"  {len(self.sources)} sources fetched across {self.diversity_tier_count} tier(s)",
            f"  {len(self.claims)} claims extracted (showing top {len(sorted_claims)})",
            "",
            "SOURCES — cite these in body with [n] where n is the source number:",
        ]
        for i, s in enumerate(self.sources, 1):
            lines.append(f"  [{i}] ({s.tier}, score {s.score}) {s.domain} -- {s.title!r}")
            lines.append(f"        URL: {s.url}")
        lines.append("")
        lines.append("CLAIMS — these are the factual basis for the content. Each is tagged with the SOURCE NUMBER from above.")
        for c in sorted_claims:
            src_idx = source_idx_by_url.get(c.source_url, "?")
            recency = f" ({c.recency_date})" if c.recency_date else ""
            lines.append(f"  - [from source {src_idx}] ({c.source_tier}, {c.kind}){recency}: {c.text}")
        lines.append("")
        lines.append(
            "CITATION RULES — STRICT:\n"
            "  - When you use any factual claim above, append [n] where n matches the SOURCE NUMBER.\n"
            "  - You may aggregate adjacent citations as [1][2] or [2] alone — never invent numbers above "
            f"{len(self.sources)}.\n"
            "  - Cite the most authoritative tier when multiple sources support the same claim.\n"
            "  - Spread citations across different sources — don't lean on one repeatedly."
        )
        return "\n".join(lines)


# ============================================================================
# Cache I/O
# ============================================================================


def _normalise_topic(query: str) -> str:
    return re.sub(r"\s+", " ", query.lower().strip())


def _headers() -> dict[str, str]:
    return {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
    }


def _cache_lookup(topic_key: str) -> list[dict]:
    """Return cached rows newer than CACHE_TTL_DAYS."""
    fresh_since = (datetime.now(timezone.utc) - timedelta(days=CACHE_TTL_DAYS)).isoformat()
    r = httpx.get(
        f"{SUPABASE_URL}/rest/v1/research_cache",
        headers={"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"},
        params={
            "select": "*",
            "topic_key": f"eq.{topic_key}",
            "fetched_at": f"gte.{fresh_since}",
        },
        timeout=15.0,
    )
    return r.json() if r.status_code < 300 else []


def _cache_insert(*, topic_key: str, topic_query: str, source_url: str, source_domain: str, source_tier: str, source_authority_score: int, source_title: str, recency_date: str | None, extracted_claims: list[dict], h1: str, h2s: list[str], excerpt: str) -> None:
    payload = {
        "topic_key": topic_key,
        "topic_query": topic_query,
        "source_url": source_url,
        "source_domain": source_domain,
        "source_tier": source_tier,
        "source_title": source_title,
        "source_authority_score": source_authority_score,
        "source_recency_date": recency_date,
        "extracted_claims": extracted_claims,
        "claims_count": len(extracted_claims),
        "raw_h1": h1,
        "raw_h2s": h2s,
        "raw_excerpt": excerpt,
    }
    httpx.post(
        f"{SUPABASE_URL}/rest/v1/research_cache",
        headers={**_headers(), "Prefer": "resolution=merge-duplicates,return=minimal"},
        json=payload,
        timeout=15.0,
    )


# ============================================================================
# Fetching + parsing
# ============================================================================


def _domain_of(url: str) -> str:
    try:
        host = urlparse(url).hostname or ""
    except Exception:
        return ""
    return host.lower().lstrip("www.")


def _fetch_html(url: str, *, timeout: float = 12.0) -> str | None:
    try:
        with httpx.Client(timeout=timeout, follow_redirects=True) as client:
            r = client.get(
                url,
                headers={"User-Agent": "Mozilla/5.0 (compatible; AccountingResearchBot/1.0)"},
            )
            if r.status_code >= 400:
                return None
            return r.text[:MAX_FETCH_BYTES]
    except Exception:
        return None


def _parse_page(html: str) -> dict:
    soup = BeautifulSoup(html, "html.parser")
    for tag in soup(["script", "style", "nav", "footer", "header", "aside", "noscript", "form"]):
        tag.decompose()
    h1 = (soup.find("h1").get_text(strip=True) if soup.find("h1") else "")
    h2s = [h.get_text(strip=True) for h in soup.find_all("h2")][:20]
    main = soup.find("main") or soup.find("article") or soup.body
    body_text = main.get_text(" ", strip=True) if main else soup.get_text(" ", strip=True)
    # Find a date if visible: look in <time> tags, then meta tags, then prose
    pub_date = None
    if soup.find("time"):
        t = soup.find("time")
        pub_date = t.get("datetime") or t.get_text(strip=True)[:10]
    elif soup.find("meta", {"property": "article:published_time"}):
        pub_date = soup.find("meta", {"property": "article:published_time"}).get("content", "")[:10]
    elif soup.find("meta", {"name": "date"}):
        pub_date = soup.find("meta", {"name": "date"}).get("content", "")[:10]
    return {
        "h1": h1,
        "h2s": h2s,
        "body_text": body_text,
        "pub_date": pub_date,
    }


# ============================================================================
# Claim extraction (LLM-driven)
# ============================================================================


def _extract_claims_with_llm(*, source_url: str, source_domain: str, source_tier: str, page_data: dict, topic_query: str) -> tuple[list[Claim], float]:
    """Use DeepSeek to extract specific, citable claims from a source's content."""
    if not page_data.get("body_text"):
        return [], 0.0

    body_excerpt = page_data["body_text"][:6000]
    h2_block = "\n".join(f"  - {h}" for h in page_data.get("h2s", []))

    user_input = f"""SOURCE: {source_domain} ({source_tier} tier)
URL: {source_url}
H1: {page_data.get('h1')!r}
H2s on page:
{h2_block}

BODY EXCERPT (first 6000 chars):
{body_excerpt}

TOPIC WE'RE RESEARCHING: {topic_query!r}

Extract up to 6 SPECIFIC, CITABLE claims from this source that are relevant
to the topic. Each claim must be a self-contained sentence containing a
specific fact (a number, a date, a named entity, or a quoted statement of rule).

Skip generic statements like 'this is important' or 'taxpayers should be aware'.
Only extract claims that would be USEFUL to cite in our content."""

    result = run_reasoning(
        endpoint_name="research_synthesizer_claim_extraction",
        role=(
            "a UK accounting research analyst. You read source pages and extract "
            "specific, citable claims (statistics, rules, dates, named entities, "
            "direct quotes) that would be useful in writing well-sourced content."
        ),
        task=(
            "Extract up to 6 specific claims from this source page that relate to "
            "the topic. Each claim must contain a number, date, named entity, or "
            "quoted rule statement. Skip generic statements."
        ),
        schema_description=(
            "{\n"
            '  "claims": [\n'
            '    {\n'
            '      "kind": one of "statistic"|"rule"|"quote"|"definition"|"worked_example"|"general",\n'
            '      "text": string (self-contained citable sentence),\n'
            '      "contains_number": boolean,\n'
            '      "contains_date": boolean\n'
            "    }, ...\n"
            "  ],\n"
            '  "confidence": integer 0-100\n'
            "}"
        ),
        must_not=[
            "extract more than 6 claims",
            "extract generic statements without a number / date / named entity / quoted rule",
            "fabricate claims not in the source text",
            "use em-dashes",
        ],
        examples=[
            {
                "input": "SOURCE: gov.uk -- 'For 2026/27, the basic rate of CGT on residential property remains at 18% and the higher rate at 24%. The annual exempt amount is £3,000, unchanged from 2025/26.'",
                "output": {
                    "claims": [
                        {"kind": "rule", "text": "For 2026/27, the basic rate of CGT on residential property is 18% and the higher rate is 24%.", "contains_number": True, "contains_date": True},
                        {"kind": "statistic", "text": "The CGT annual exempt amount for 2026/27 is £3,000, unchanged from 2025/26.", "contains_number": True, "contains_date": True},
                    ],
                    "confidence": 95,
                },
            }
        ],
        validators=[
            require_keys("claims", "confidence"),
            lambda o: (True, None) if isinstance(o.get("claims"), list) and len(o["claims"]) <= 6 else (False, "claims > 6"),
            no_em_dashes("claims"),
        ],
        user_input=user_input,
        site_key=None,
        confidence_threshold=70,
        max_tokens=2000,
        temperature=0.2,
    )

    out_claims: list[Claim] = []
    for c in (result.output or {}).get("claims") or []:
        out_claims.append(
            Claim(
                kind=c.get("kind", "general"),
                text=c.get("text", ""),
                source_url=source_url,
                source_domain=source_domain,
                source_tier=source_tier,
                source_authority_score=authority_score_for_domain(source_domain),
                recency_date=page_data.get("pub_date"),
                contains_number=bool(c.get("contains_number")),
                contains_date=bool(c.get("contains_date")),
            )
        )
    return out_claims, result.cost_usd


# ============================================================================
# Tier-based source discovery
# ============================================================================


def _search_tier(*, query: str, tier_domains: list[str], serper: SerperClient, site_key: str | None, n_per_domain: int = 1) -> list[dict]:
    """For each domain in the tier, do a Serper site: query and return top N organic results."""
    out: list[dict] = []
    for d in tier_domains:
        site_query = f"site:{d} {query}"
        try:
            resp = serper.search(query=site_query, num=n_per_domain + 1, site_key=site_key)
        except IdempotencyHit:
            continue
        except Exception:
            continue
        for item in (resp.get("organic") or [])[:n_per_domain]:
            url = item.get("link") or ""
            host = _domain_of(url)
            if host in BLOCKED_DOMAINS:
                continue
            # Verify it really is on the authority domain (Serper occasionally returns
            # off-domain results)
            if not (host == d or host.endswith("." + d) or d.endswith("." + host)):
                continue
            if url.lower().endswith(".pdf"):
                continue
            out.append({
                "url": url,
                "domain": host,
                "title": item.get("title", ""),
                "snippet": item.get("snippet", ""),
                "tier": tier_for_domain(host),
            })
    return out


def _search_organic_top(*, query: str, serper: SerperClient, site_key: str | None, n: int = 5) -> list[dict]:
    """Top-N organic SERP results, dedup against blocked + already-fetched."""
    try:
        resp = serper.search(query=query, num=n + 3, site_key=site_key)
    except IdempotencyHit:
        return []
    out: list[dict] = []
    for item in (resp.get("organic") or [])[: n + 3]:
        url = item.get("link") or ""
        host = _domain_of(url)
        if host in BLOCKED_DOMAINS:
            continue
        if url.lower().endswith(".pdf"):
            continue
        out.append({
            "url": url,
            "domain": host,
            "title": item.get("title", ""),
            "snippet": item.get("snippet", ""),
            "tier": tier_for_domain(host),
        })
        if len(out) >= n:
            break
    return out


# ============================================================================
# Main entry point
# ============================================================================


def synthesize_research(
    *,
    topic_query: str,
    site_key: str,
    max_canonical_domains: int = 5,
    max_authority_domains: int = 8,
    max_industry_domains: int = 4,
    max_organic_results: int = 4,
    max_total_sources: int = 12,
    fallback_queries: list[str] | None = None,
) -> ResearchBundle:
    """Build a multi-tier research bundle for `topic_query`.

    Strategy:
      1. Look up cache for topic_key; reuse rows within TTL.
      2. For uncached sources, fetch via Serper site: queries per tier.
      3. Fetch HTML + parse + extract claims via DeepSeek for each new source.
      4. Persist each fresh fetch to research_cache.
      5. Assemble the ResearchBundle.

    Costs:
      Serper: ~$0.001 per site: query
      DeepSeek: ~$0.001 per claim extraction
      Typical full run: ~$0.03-0.05
    """
    topic_key = _normalise_topic(topic_query)
    bundle = ResearchBundle(topic_query=topic_query, topic_key=topic_key)

    # ---- Cache lookup --------------------------------------------------------
    cached_rows = _cache_lookup(topic_key)
    cached_by_url: dict[str, dict] = {r["source_url"]: r for r in cached_rows}
    bundle.cached_hits = len(cached_by_url)
    for r in cached_rows:
        claims = r.get("extracted_claims") or []
        for c in claims:
            bundle.claims.append(
                Claim(
                    kind=c.get("kind", "general"),
                    text=c.get("text", ""),
                    source_url=r["source_url"],
                    source_domain=r["source_domain"],
                    source_tier=r["source_tier"],
                    source_authority_score=r.get("source_authority_score") or 0,
                    recency_date=r.get("source_recency_date"),
                    contains_number=bool(c.get("contains_number")),
                    contains_date=bool(c.get("contains_date")),
                )
            )
        bundle.sources.append(
            Source(
                domain=r["source_domain"],
                url=r["source_url"],
                title=r.get("source_title", ""),
                tier=r["source_tier"],
                score=r.get("source_authority_score") or 0,
                fetched_at=r["fetched_at"],
                n_claims=r.get("claims_count") or 0,
                recency_date=r.get("source_recency_date"),
            )
        )

    # ---- Build the candidate list (excluding cached URLs) -------------------
    serper = SerperClient()
    candidates: list[dict] = []

    # Tier 1 - canonical
    canon_doms = [d.domain for d in domains_by_tier(site_key, "canonical")][:max_canonical_domains]
    candidates += _search_tier(query=topic_query, tier_domains=canon_doms, serper=serper, site_key=site_key)
    bundle.total_serper_cost_usd += 0.001 * len(canon_doms)

    # Tier 2 - authority
    auth_doms = [d.domain for d in domains_by_tier(site_key, "authority")][:max_authority_domains]
    candidates += _search_tier(query=topic_query, tier_domains=auth_doms, serper=serper, site_key=site_key)
    bundle.total_serper_cost_usd += 0.001 * len(auth_doms)

    # Tier 3 - industry
    ind_doms = [d.domain for d in domains_by_tier(site_key, "industry")][:max_industry_domains]
    candidates += _search_tier(query=topic_query, tier_domains=ind_doms, serper=serper, site_key=site_key)
    bundle.total_serper_cost_usd += 0.001 * len(ind_doms)

    # Tier 4 - organic top. ALSO captures the top-N organic SERP results
    # as competitor_serp (title + snippet + domain) for the meta strategy.
    organic_top = _search_organic_top(query=topic_query, serper=serper, site_key=site_key, n=max_organic_results)
    candidates += organic_top
    bundle.total_serper_cost_usd += 0.001
    # Take the top 5 (or however many) for meta differentiation regardless of
    # whether they end up as research sources.
    bundle.competitor_serp = [
        {"title": r["title"], "snippet": r["snippet"], "domain": r["domain"]}
        for r in organic_top[:5]
    ]

    # Dedup against cached
    seen_urls: set[str] = set(cached_by_url.keys())
    fresh_candidates: list[dict] = []
    for c in candidates:
        if c["url"] in seen_urls:
            continue
        seen_urls.add(c["url"])
        fresh_candidates.append(c)

    # Cap total new sources we fetch (cost control)
    remaining_budget = max_total_sources - bundle.cached_hits
    if remaining_budget <= 0:
        # We're already at cache limit — return bundle from cache only
        bundle.diversity_tier_count = len({c.source_tier for c in bundle.claims})
        bundle.canonical_sources_present = any(c.source_tier == "canonical" for c in bundle.claims)
        bundle.authority_sources_present = any(c.source_tier == "authority" for c in bundle.claims)
        return bundle

    fresh_candidates = fresh_candidates[:remaining_budget]

    # ---- Fetch + extract for each fresh candidate ---------------------------
    for cand in fresh_candidates:
        html = _fetch_html(cand["url"])
        if not html:
            continue
        parsed = _parse_page(html)
        if not parsed.get("body_text"):
            continue
        try:
            claims, cost = _extract_claims_with_llm(
                source_url=cand["url"],
                source_domain=cand["domain"],
                source_tier=cand["tier"],
                page_data=parsed,
                topic_query=topic_query,
            )
        except Exception as exc:
            print(f"[research_synth] claim extraction failed for {cand['url']}: {exc}")
            continue
        bundle.total_deepseek_cost_usd += cost
        bundle.fresh_fetches += 1
        bundle.claims.extend(claims)
        bundle.sources.append(
            Source(
                domain=cand["domain"],
                url=cand["url"],
                title=cand["title"],
                tier=cand["tier"],
                score=authority_score_for_domain(cand["domain"]),
                fetched_at=datetime.now(timezone.utc).isoformat(),
                n_claims=len(claims),
                recency_date=parsed.get("pub_date"),
            )
        )
        # Cache
        _cache_insert(
            topic_key=topic_key,
            topic_query=topic_query,
            source_url=cand["url"],
            source_domain=cand["domain"],
            source_tier=cand["tier"],
            source_authority_score=authority_score_for_domain(cand["domain"]),
            source_title=cand["title"],
            recency_date=parsed.get("pub_date"),
            extracted_claims=[asdict(c) for c in claims],
            h1=parsed.get("h1", ""),
            h2s=parsed.get("h2s", []),
            excerpt=(parsed.get("body_text") or "")[:2000],
        )

    # ---- Expansion pass: if bundle is thin, broaden the search ---------------
    unique_domains = {s.domain for s in bundle.sources}
    if len(unique_domains) < 3 and bundle.cached_hits + bundle.fresh_fetches < max_total_sources:
        seen_urls.update({s.url for s in bundle.sources})
        # Try 3 URLs per authority domain (instead of 1) — bigger draw from each
        more_candidates: list[dict] = []
        auth_doms_deep = [d.domain for d in domains_by_tier(site_key, "authority")][:max_authority_domains]
        more_candidates += _search_tier(
            query=topic_query, tier_domains=auth_doms_deep, serper=serper, site_key=site_key, n_per_domain=3
        )
        bundle.total_serper_cost_usd += 0.001 * len(auth_doms_deep)
        ind_doms_deep = [d.domain for d in domains_by_tier(site_key, "industry")][:max_industry_domains]
        more_candidates += _search_tier(
            query=topic_query, tier_domains=ind_doms_deep, serper=serper, site_key=site_key, n_per_domain=2
        )
        bundle.total_serper_cost_usd += 0.001 * len(ind_doms_deep)
        # Pull more organic results too
        more_candidates += _search_organic_top(query=topic_query, serper=serper, site_key=site_key, n=8)
        bundle.total_serper_cost_usd += 0.001

        # Dedup + cap
        deep_fresh: list[dict] = []
        for c in more_candidates:
            if c["url"] in seen_urls:
                continue
            if c["domain"] in unique_domains:
                # Prefer NEW domains during the expansion pass; only re-cite an
                # existing domain if we genuinely can't find anything else
                continue
            seen_urls.add(c["url"])
            deep_fresh.append(c)
            if len({d["domain"] for d in deep_fresh} | unique_domains) >= 5:
                break

        for cand in deep_fresh[: max_total_sources - len(bundle.sources)]:
            html = _fetch_html(cand["url"])
            if not html:
                continue
            parsed = _parse_page(html)
            if not parsed.get("body_text"):
                continue
            try:
                claims, cost = _extract_claims_with_llm(
                    source_url=cand["url"],
                    source_domain=cand["domain"],
                    source_tier=cand["tier"],
                    page_data=parsed,
                    topic_query=topic_query,
                )
            except Exception:
                continue
            bundle.total_deepseek_cost_usd += cost
            bundle.fresh_fetches += 1
            bundle.claims.extend(claims)
            bundle.sources.append(
                Source(
                    domain=cand["domain"],
                    url=cand["url"],
                    title=cand["title"],
                    tier=cand["tier"],
                    score=authority_score_for_domain(cand["domain"]),
                    fetched_at=datetime.now(timezone.utc).isoformat(),
                    n_claims=len(claims),
                    recency_date=parsed.get("pub_date"),
                )
            )
            _cache_insert(
                topic_key=topic_key,
                topic_query=topic_query,
                source_url=cand["url"],
                source_domain=cand["domain"],
                source_tier=cand["tier"],
                source_authority_score=authority_score_for_domain(cand["domain"]),
                source_title=cand["title"],
                recency_date=parsed.get("pub_date"),
                extracted_claims=[asdict(c) for c in claims],
                h1=parsed.get("h1", ""),
                h2s=parsed.get("h2s", []),
                excerpt=(parsed.get("body_text") or "")[:2000],
            )
            unique_domains.add(cand["domain"])
            if len(unique_domains) >= 5:
                break

    # ---- Cluster fallback: if bundle is still thin in claims, try fallback queries
    if fallback_queries and len(bundle.claims) < 5:
        for fq in fallback_queries:
            if fq.strip().lower() == topic_query.strip().lower():
                continue
            # Just one tier of authority searches per fallback, n=2 per domain
            fb_candidates: list[dict] = []
            fb_auth = [d.domain for d in domains_by_tier(site_key, "authority")][:max_authority_domains]
            fb_candidates += _search_tier(
                query=fq, tier_domains=fb_auth, serper=serper, site_key=site_key, n_per_domain=2
            )
            bundle.total_serper_cost_usd += 0.001 * len(fb_auth)
            fb_candidates += _search_organic_top(query=fq, serper=serper, site_key=site_key, n=4)
            bundle.total_serper_cost_usd += 0.001

            seen_urls_local = {s.url for s in bundle.sources}
            seen_doms_local = {s.domain for s in bundle.sources}
            for cand in fb_candidates[:6]:
                if cand["url"] in seen_urls_local:
                    continue
                if cand["domain"] in seen_doms_local:
                    continue  # only add new domains during fallback
                html = _fetch_html(cand["url"])
                if not html:
                    continue
                parsed = _parse_page(html)
                if not parsed.get("body_text"):
                    continue
                try:
                    claims, cost = _extract_claims_with_llm(
                        source_url=cand["url"],
                        source_domain=cand["domain"],
                        source_tier=cand["tier"],
                        page_data=parsed,
                        topic_query=topic_query,
                    )
                except Exception:
                    continue
                bundle.total_deepseek_cost_usd += cost
                bundle.fresh_fetches += 1
                bundle.claims.extend(claims)
                bundle.sources.append(
                    Source(
                        domain=cand["domain"],
                        url=cand["url"],
                        title=cand["title"],
                        tier=cand["tier"],
                        score=authority_score_for_domain(cand["domain"]),
                        fetched_at=datetime.now(timezone.utc).isoformat(),
                        n_claims=len(claims),
                        recency_date=parsed.get("pub_date"),
                    )
                )
                _cache_insert(
                    topic_key=topic_key,
                    topic_query=topic_query,
                    source_url=cand["url"],
                    source_domain=cand["domain"],
                    source_tier=cand["tier"],
                    source_authority_score=authority_score_for_domain(cand["domain"]),
                    source_title=cand["title"],
                    recency_date=parsed.get("pub_date"),
                    extracted_claims=[asdict(c) for c in claims],
                    h1=parsed.get("h1", ""),
                    h2s=parsed.get("h2s", []),
                    excerpt=(parsed.get("body_text") or "")[:2000],
                )
                seen_urls_local.add(cand["url"])
                seen_doms_local.add(cand["domain"])
                if len(bundle.claims) >= 8:
                    break
            if len(bundle.claims) >= 8:
                break

    # ---- Final stats ---------------------------------------------------------
    tier_counts = bundle.claims_by_tier()
    bundle.diversity_tier_count = len([t for t, c in tier_counts.items() if c > 0])
    bundle.canonical_sources_present = tier_counts.get("canonical", 0) > 0
    bundle.authority_sources_present = tier_counts.get("authority", 0) > 0

    return bundle


def main() -> None:
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("topic_query")
    parser.add_argument("site_key", choices=["agency", "property", "dentists", "generalist"])
    args = parser.parse_args()

    bundle = synthesize_research(topic_query=args.topic_query, site_key=args.site_key)
    print(bundle.to_prompt_block())
    print()
    print(f"diversity_tier_count: {bundle.diversity_tier_count}")
    print(f"canonical present: {bundle.canonical_sources_present}")
    print(f"authority present: {bundle.authority_sources_present}")
    print(f"cached hits: {bundle.cached_hits}")
    print(f"fresh fetches: {bundle.fresh_fetches}")
    print(f"Serper cost: ${bundle.total_serper_cost_usd:.4f}")
    print(f"DeepSeek cost: ${bundle.total_deepseek_cost_usd:.4f}")


if __name__ == "__main__":
    main()
