"""
Opportunity detectors. Each function:
  - Reads gsc_query_data + gsc_page_performance for a site
  - Applies a deterministic rule
  - Returns a list of opportunity dicts ready to upsert into optimisation_opportunities

Confidence levels:
  high   - signal is unambiguous; can be auto-applied (title/meta rewrites, schema additions)
  medium - clear signal but needs human judgement (expand_page, internal_link)
  low    - speculative or requires intent decision (intent_realignment, new_page from sparse data)

All detectors are pure-data — no LLM calls, no HTTP to third parties. The
optional LLM step (composing the actual rewrite copy) happens at apply time.
"""
from __future__ import annotations

import hashlib
import json
import re
from collections import defaultdict
from dataclasses import dataclass, field
from datetime import date, timedelta
from typing import Any

import httpx

from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL

# -----------------------------------------------------------------------------
# Data access
# -----------------------------------------------------------------------------


def _supabase_headers() -> dict[str, str]:
    return {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}


def _fetch_query_data(site_key: str, days: int = 28) -> list[dict]:
    """Pull raw rows from gsc_query_data for a site. Each row = (page, query, date)."""
    start = (date.today() - timedelta(days=days)).isoformat()
    url = f"{SUPABASE_URL}/rest/v1/gsc_query_data"
    out: list[dict] = []
    offset = 0
    page_size = 1000
    while True:
        r = httpx.get(
            url,
            headers=_supabase_headers(),
            params={
                "select": "page_url,query,date,impressions,clicks,ctr,position",
                "site_key": f"eq.{site_key}",
                "date": f"gte.{start}",
                "order": "impressions.desc",
                "limit": str(page_size),
                "offset": str(offset),
            },
            timeout=30.0,
        )
        r.raise_for_status()
        batch = r.json()
        out.extend(batch)
        if len(batch) < page_size:
            break
        offset += page_size
    return out


def aggregate_by_page_query(rows: list[dict]) -> dict[tuple[str, str], dict]:
    """Sum across dates so we get one record per (page, query) in the window."""
    agg: dict[tuple[str, str], dict] = defaultdict(
        lambda: {"impressions": 0, "clicks": 0, "positions": [], "ctrs": []}
    )
    for row in rows:
        key = (row["page_url"], row["query"])
        a = agg[key]
        a["impressions"] += int(row.get("impressions") or 0)
        a["clicks"] += int(row.get("clicks") or 0)
        if row.get("position") is not None:
            a["positions"].append(float(row["position"]))
        if row.get("ctr") is not None:
            a["ctrs"].append(float(row["ctr"]))
    # Reduce
    out: dict[tuple[str, str], dict] = {}
    for k, v in agg.items():
        n = len(v["positions"]) or 1
        out[k] = {
            "impressions": v["impressions"],
            "clicks": v["clicks"],
            "avg_position": sum(v["positions"]) / n if v["positions"] else 0.0,
            "avg_ctr": (v["clicks"] / v["impressions"]) if v["impressions"] else 0.0,
            "days_observed": n,
        }
    return out


def aggregate_by_page(by_pq: dict[tuple[str, str], dict]) -> dict[str, dict]:
    """Roll up to page level."""
    by_page: dict[str, dict] = defaultdict(
        lambda: {"impressions": 0, "clicks": 0, "queries": [], "best_position": 999.0}
    )
    for (page, query), m in by_pq.items():
        b = by_page[page]
        b["impressions"] += m["impressions"]
        b["clicks"] += m["clicks"]
        b["queries"].append((query, m["impressions"], m["avg_position"]))
        if m["avg_position"] and m["avg_position"] < b["best_position"]:
            b["best_position"] = m["avg_position"]
    return by_page


# -----------------------------------------------------------------------------
# Detectors
# -----------------------------------------------------------------------------


@dataclass
class Opportunity:
    site_key: str
    opportunity_type: str
    target_url: str | None
    primary_query: str | None
    target_query_cluster: list[str]
    recommended_action: str
    rationale: str
    score: int
    confidence: str
    supporting_data: dict[str, Any] = field(default_factory=dict)

    @property
    def data_hash(self) -> str:
        h = hashlib.sha256()
        h.update(f"{self.site_key}|{self.opportunity_type}|{self.target_url}|{self.primary_query}".encode())
        return h.hexdigest()


def detect_ctr_problems(
    site_key: str,
    by_pq: dict[tuple[str, str], dict],
    *,
    min_impressions: int = 30,
    max_ctr: float = 0.02,
    min_position: float = 1.0,
    max_position: float = 15.0,
    cannibalised_query_min_impressions: int = 10,
    cannibalised_query_max_position: float = 20.0,
) -> list[Opportunity]:
    """Pages ranking well but earning few clicks. Title/meta failing.

    Confidence: HIGH when position < 10 and impressions > 50 (textbook case).
                MEDIUM otherwise within the band.

    Cannibalisation guard: a query is "contested" on this site if 2+ pages
    have non-trivial impressions and ranking for it. We DO NOT emit a
    rewrite_title_meta opp whose primary_query is contested — rewriting one
    of the cannibalising pages without resolving the cannibalisation first
    would either deepen the conflict or shift impressions sideways. The
    cannibalisation_resolution opportunity from detect_cannibalisation
    handles those queries instead.
    """
    # Identify contested queries — same query, multiple pages ranking on
    # this site with enough signal to matter.
    queries_by_page_count: dict[str, int] = defaultdict(int)
    for (pg, q), m in by_pq.items():
        if (
            m["impressions"] >= cannibalised_query_min_impressions
            and m["avg_position"] <= cannibalised_query_max_position
        ):
            queries_by_page_count[q] += 1
    contested_queries: set[str] = {q for q, n in queries_by_page_count.items() if n >= 2}

    # Group by page so we don't emit one opp per query for the same page.
    page_q: dict[str, list[tuple[str, dict]]] = defaultdict(list)
    for (pg, q), m in by_pq.items():
        if m["impressions"] < 5:
            continue
        if min_position <= m["avg_position"] <= max_position and m["avg_ctr"] <= max_ctr:
            page_q[pg].append((q, m))

    out: list[Opportunity] = []
    skipped_due_to_cannibalisation = 0
    for page, queries in page_q.items():
        # Sum across queries on this page to get the page-level signal
        total_impr = sum(m["impressions"] for _, m in queries)
        if total_impr < min_impressions:
            continue
        total_clicks = sum(m["clicks"] for _, m in queries)
        # Sort queries by impressions, take top one as primary
        queries.sort(key=lambda kv: kv[1]["impressions"], reverse=True)
        primary_q, primary_m = queries[0]
        cluster = [q for q, _ in queries[:8]]

        # Source patch: do NOT emit a rewrite if the primary query is contested
        # on this site (another page is also ranking for it). Let
        # detect_cannibalisation own that query's resolution first.
        if primary_q in contested_queries:
            skipped_due_to_cannibalisation += 1
            continue

        # Confidence scoring
        page_ctr = total_clicks / total_impr if total_impr else 0
        best_pos = min(m["avg_position"] for _, m in queries)
        if best_pos < 10 and total_impr >= 50:
            confidence = "high"
            score = min(100, 60 + int(total_impr / 5))
        elif best_pos < 15 and total_impr >= 30:
            confidence = "medium"
            score = min(100, 40 + int(total_impr / 5))
        else:
            confidence = "low"
            score = max(20, int(total_impr / 4))

        out.append(
            Opportunity(
                site_key=site_key,
                opportunity_type="rewrite_title_meta",
                target_url=page,
                primary_query=primary_q,
                target_query_cluster=cluster,
                recommended_action=(
                    f"Rewrite metaTitle + metaDescription on '{page}' to front-load "
                    f"the primary query '{primary_q}' and adjacent variants. "
                    f"Page ranks at position {best_pos:.1f} for {total_impr} monthly "
                    f"impressions but earns CTR {page_ctr:.2%} — meta is failing."
                ),
                rationale=(
                    f"{total_impr} impressions across {len(queries)} queries; "
                    f"best position {best_pos:.1f}; CTR {page_ctr:.2%} (industry avg "
                    f"for this position is ~8-15%). Title/description likely lacks "
                    f"the dominant query or value prop."
                ),
                score=score,
                confidence=confidence,
                supporting_data={
                    "page_impressions_28d": total_impr,
                    "page_clicks_28d": total_clicks,
                    "page_ctr_28d": round(page_ctr, 6),
                    "best_position": round(best_pos, 2),
                    "top_queries": [
                        {"query": q, "impressions": m["impressions"], "position": round(m["avg_position"], 2)}
                        for q, m in queries[:5]
                    ],
                },
            )
        )
    if skipped_due_to_cannibalisation:
        print(
            f"  detect_ctr_problems: skipped {skipped_due_to_cannibalisation} opp(s) "
            f"because primary_query is contested on this site — "
            f"detect_cannibalisation will handle them"
        )
    return out


def detect_near_miss_expansion(
    site_key: str,
    by_pq: dict[tuple[str, str], dict],
    *,
    min_impressions: int = 30,
    min_position: float = 8.0,
    max_position: float = 20.0,
) -> list[Opportunity]:
    """Pages on the edge of page 1 / on page 2 — content depth gap suspected."""
    page_q: dict[str, list[tuple[str, dict]]] = defaultdict(list)
    for (pg, q), m in by_pq.items():
        if min_position <= m["avg_position"] <= max_position and m["impressions"] >= 5:
            page_q[pg].append((q, m))

    out: list[Opportunity] = []
    for page, queries in page_q.items():
        total_impr = sum(m["impressions"] for _, m in queries)
        if total_impr < min_impressions:
            continue
        queries.sort(key=lambda kv: kv[1]["impressions"], reverse=True)
        primary_q, primary_m = queries[0]
        cluster = [q for q, _ in queries[:8]]

        best_pos = min(m["avg_position"] for _, m in queries)
        # Confidence medium by default; high if signal is very clear
        if total_impr >= 100 and best_pos >= 10 and best_pos <= 15:
            confidence = "high"
            score = min(100, 65 + int(total_impr / 10))
        else:
            confidence = "medium"
            score = min(100, 40 + int(total_impr / 10))

        out.append(
            Opportunity(
                site_key=site_key,
                opportunity_type="expand_page",
                target_url=page,
                primary_query=primary_q,
                target_query_cluster=cluster,
                recommended_action=(
                    f"Expand content depth on '{page}': add sections that cover the "
                    f"adjacent queries it's already getting impressions for. Compare "
                    f"against top-3 ranking pages for '{primary_q}' to find topical gaps."
                ),
                rationale=(
                    f"Page sits in the position {best_pos:.1f} range for {total_impr} "
                    f"impressions across {len(queries)} queries — the algorithm sees it "
                    f"as relevant but not authoritative enough. Adding depth + adjacent "
                    f"query coverage typically lifts to position 5-8."
                ),
                score=score,
                confidence=confidence,
                supporting_data={
                    "page_impressions_28d": total_impr,
                    "best_position": round(best_pos, 2),
                    "n_adjacent_queries": len(queries),
                    "top_queries": [
                        {"query": q, "impressions": m["impressions"], "position": round(m["avg_position"], 2)}
                        for q, m in queries[:5]
                    ],
                },
            )
        )
    return out


def detect_cannibalisation(
    site_key: str,
    by_pq: dict[tuple[str, str], dict],
    *,
    min_total_impressions: int = 20,
) -> list[Opportunity]:
    """Multiple pages competing for the same query.

    Confidence MEDIUM by default — auto-resolving cannibalisation requires
    judgement on which page wins and which redirects/consolidates.
    """
    by_query: dict[str, list[tuple[str, dict]]] = defaultdict(list)
    for (pg, q), m in by_pq.items():
        if m["impressions"] >= 3:
            by_query[q].append((pg, m))

    out: list[Opportunity] = []
    for query, pages in by_query.items():
        if len(pages) < 2:
            continue
        total_impr = sum(m["impressions"] for _, m in pages)
        if total_impr < min_total_impressions:
            continue
        pages.sort(key=lambda kv: kv[1]["avg_position"])  # best position first
        # The 'winner' is the page closest to rank 1
        winner_pg, winner_m = pages[0]
        score = min(100, 45 + int(total_impr / 5))

        out.append(
            Opportunity(
                site_key=site_key,
                opportunity_type="intent_realignment",
                target_url=winner_pg,
                primary_query=query,
                target_query_cluster=[query],
                recommended_action=(
                    f"Resolve cannibalisation on '{query}': consolidate or differentiate "
                    f"the {len(pages)} competing pages. Strongest signal: '{winner_pg}' at "
                    f"position {winner_m['avg_position']:.1f}. Decide intent split — same "
                    f"intent => merge & redirect; different sub-intents => differentiate H1 + meta."
                ),
                rationale=(
                    f"{len(pages)} pages on the same site receive impressions for '{query}'. "
                    f"Total {total_impr} impressions split across them dilutes ranking signal."
                ),
                score=score,
                confidence="medium",
                supporting_data={
                    "total_impressions_28d": total_impr,
                    "competing_pages": [
                        {"page": pg, "impressions": m["impressions"], "position": round(m["avg_position"], 2)}
                        for pg, m in pages
                    ],
                },
            )
        )
    return out


def detect_query_page_mismatch(
    site_key: str,
    by_pq: dict[tuple[str, str], dict],
    *,
    min_impressions: int = 20,
    min_position_for_signal: float = 50.0,
) -> list[Opportunity]:
    """Pages receiving impressions for queries far outside their declared topic.

    Cheap heuristic without HTML parsing: a query is 'foreign' to a page if the
    page's URL slug shares zero meaningful tokens with the query.
    """
    out: list[Opportunity] = []
    seen: set[tuple[str, str]] = set()  # (page, primary_query)

    for (page, query), m in by_pq.items():
        if m["impressions"] < min_impressions:
            continue
        if m["avg_position"] > min_position_for_signal:
            # Position too poor — likely just bot impressions, not real intent
            continue
        slug = page.rstrip("/").rsplit("/", 1)[-1] or ""
        slug_tokens = set(re.split(r"[-_/]", slug.lower()))
        query_tokens = {t.lower() for t in re.split(r"\W+", query) if t and len(t) > 2}
        stop = {"the", "and", "for", "with", "uk", "you", "are", "how", "what", "this", "that", "of", "to", "in"}
        meaningful = query_tokens - stop
        if not meaningful:
            continue
        overlap = slug_tokens & meaningful
        if overlap:
            continue
        # No token overlap = potential intent mismatch
        key = (page, query)
        if key in seen:
            continue
        seen.add(key)

        out.append(
            Opportunity(
                site_key=site_key,
                opportunity_type="intent_realignment",
                target_url=page,
                primary_query=query,
                target_query_cluster=[query],
                recommended_action=(
                    f"Review intent match: '{page}' is getting {m['impressions']} impressions "
                    f"for '{query}' at position {m['avg_position']:.1f} but the URL/topic "
                    f"doesn't reflect this query. Decide: weave the query into content "
                    f"naturally OR move it to a new dedicated page."
                ),
                rationale=(
                    f"Slug tokens {sorted(slug_tokens)} have no overlap with query tokens "
                    f"{sorted(meaningful)}. Either page content has drifted from its URL, "
                    f"or this is a query the site should be targeting via a new/different page."
                ),
                score=min(100, 35 + int(m["impressions"] / 5)),
                confidence="low",
                supporting_data={
                    "impressions_28d": m["impressions"],
                    "position": round(m["avg_position"], 2),
                    "slug_tokens": sorted(slug_tokens),
                    "query_tokens": sorted(meaningful),
                },
            )
        )
    return out


def _fetch_dataforseo_keywords(site_key: str) -> list[dict]:
    """Pull keyword_suggestions rows for this site with populated metrics."""
    url = f"{SUPABASE_URL}/rest/v1/dataforseo_keyword_data"
    r = httpx.get(
        url,
        headers=_supabase_headers(),
        params={
            "select": "related_keyword,search_volume,keyword_difficulty,cpc,search_intent,seed_keyword",
            "site_key": f"eq.{site_key}",
            "related_keyword": "not.is.null",
            "search_volume": "not.is.null",
            "order": "search_volume.desc.nullslast",
            "limit": "1000",
        },
        timeout=30.0,
    )
    r.raise_for_status()
    return r.json()


def _fetch_existing_gsc_queries(site_key: str, days: int = 28) -> set[str]:
    """Return the set of lowercase queries our pages have already shown for."""
    start = (date.today() - timedelta(days=days)).isoformat()
    url = f"{SUPABASE_URL}/rest/v1/gsc_query_data"
    r = httpx.get(
        url,
        headers=_supabase_headers(),
        params={
            "select": "query",
            "site_key": f"eq.{site_key}",
            "date": f"gte.{start}",
            "limit": "2000",
        },
        timeout=30.0,
    )
    r.raise_for_status()
    return {(row.get("query") or "").lower() for row in r.json() if row.get("query")}


def _existing_post_tokens(site_key: str) -> list[frozenset]:
    """Tokenise every existing blog post on disk for this site.

    Used by the new_page detectors to skip emitting opportunities whose
    primary_query already matches a post that exists. The action_specifier
    + apply layer would catch literal slug collisions, but this catches
    "different slug, same topic" semantic duplicates before LLM spend.
    """
    try:
        from optimisation_engine.config import get_site
    except Exception:
        return []
    try:
        site = get_site(site_key)
    except Exception:
        return []
    content_dir = site.get("content_dir")
    if not content_dir:
        return []
    from pathlib import Path
    full_path = Path(content_dir)
    if not full_path.is_absolute():
        ROOT_PATH = Path(__file__).resolve().parents[2]
        full_path = ROOT_PATH / content_dir
    if not full_path.exists():
        return []

    out: list[frozenset] = []
    for p in full_path.rglob("*.md"):
        if p.name.startswith("_"):
            continue
        title = None
        try:
            text = p.read_text(encoding="utf-8", errors="ignore")
            fm_match = re.search(r"^title:\s*['\"]?(.+?)['\"]?\s*$", text, re.MULTILINE)
            if fm_match:
                title = fm_match.group(1).strip()
        except Exception:
            pass
        slug = p.stem
        combined = (title or slug.replace("-", " ")) + " " + slug
        out.append(_intent_tokens(combined))
    return out


def _is_semantic_dupe_of_existing_post(
    candidate_query: str,
    existing_post_tokens: list[frozenset],
    threshold: float = 0.5,
) -> bool:
    """True if candidate_query's tokenised form Jaccard-overlaps >= threshold
    with any existing post on the site."""
    cand = _intent_tokens(candidate_query)
    if not cand or not existing_post_tokens:
        return False
    for existing in existing_post_tokens:
        if not existing:
            continue
        overlap = len(cand & existing) / max(1, len(cand | existing))
        if overlap >= threshold:
            return True
    return False


def detect_dataforseo_keyword_gap(
    site_key: str,
    *,
    min_volume: int = 50,
    max_kd: int = 30,
) -> list[Opportunity]:
    """Surface keywords from DataForSEO that the site is NOT yet appearing for.

    Compares dataforseo_keyword_data (paid keyword universe) against the queries
    already in gsc_query_data (queries we're getting impressions for). Keywords
    in the DFS pool but not in our GSC pool with decent volume + low KD are
    new_page candidates.

    Confidence: MEDIUM by default; HIGH when volume >= 200 and kd <= 10.
    """
    kw_rows = _fetch_dataforseo_keywords(site_key)
    if not kw_rows:
        return []
    existing = _fetch_existing_gsc_queries(site_key)
    # Source patch: existing posts on disk → skip emitting new_page for any
    # candidate that semantically duplicates a page that already exists.
    existing_post_tokens = _existing_post_tokens(site_key)

    out: list[Opportunity] = []
    seen: set[str] = set()
    skipped_existing_post = 0
    for row in kw_rows:
        kw = (row.get("related_keyword") or "").strip().lower()
        if not kw or kw in seen:
            continue
        vol = int(row.get("search_volume") or 0)
        kd = row.get("keyword_difficulty")
        kd_int = int(kd) if kd is not None else 100
        if vol < min_volume or kd_int > max_kd:
            continue
        if kw in existing:
            continue  # Already appearing for it
        if _is_semantic_dupe_of_existing_post(kw, existing_post_tokens):
            skipped_existing_post += 1
            continue
        seen.add(kw)

        intent = row.get("search_intent") or "unknown"
        score = min(100, 30 + int(vol / 10) + (20 if kd_int <= 10 else 0))
        if vol >= 200 and kd_int <= 10:
            confidence = "high"
        elif vol >= 100 or kd_int <= 5:
            confidence = "medium"
        else:
            confidence = "low"

        out.append(
            Opportunity(
                site_key=site_key,
                opportunity_type="new_page",
                target_url=None,
                primary_query=kw,
                target_query_cluster=[kw],
                recommended_action=(
                    f"Consider a dedicated page for '{kw}' (volume {vol}/mo, "
                    f"KD {kd_int}, intent={intent}). The site does not currently "
                    f"appear for this query in GSC."
                ),
                rationale=(
                    f"DataForSEO Labs surfaced '{kw}' from seed '{row.get('seed_keyword')}'. "
                    f"Volume {vol}, KD {kd_int}, intent {intent}. No matching query in "
                    f"our last 28 days of GSC data — true 'missing page' candidate."
                ),
                score=score,
                confidence=confidence,
                supporting_data={
                    "source": "dataforseo_keyword_suggestions",
                    "search_volume": vol,
                    "keyword_difficulty": kd_int,
                    "cpc": row.get("cpc"),
                    "search_intent": intent,
                    "seed_keyword": row.get("seed_keyword"),
                },
            )
        )
    if skipped_existing_post:
        print(
            f"  detect_dataforseo_keyword_gap: skipped {skipped_existing_post} candidate(s) "
            f"that semantically duplicate existing posts on disk"
        )
    return out


def detect_missing_pages(
    site_key: str,
    by_pq: dict[tuple[str, str], dict],
    *,
    min_impressions: int = 50,
    min_position: float = 30.0,
) -> list[Opportunity]:
    """Queries receiving substantial impressions where best page rank is poor.

    Signal: the site appears in SERPs (impressions) but no page is a good match
    (position > 30). Likely a new-page opportunity.
    """
    # Group impressions by query, find the best page rank per query
    by_query: dict[str, dict] = defaultdict(lambda: {"impressions": 0, "best_position": 999.0, "pages": []})
    for (pg, q), m in by_pq.items():
        b = by_query[q]
        b["impressions"] += m["impressions"]
        b["pages"].append((pg, m["avg_position"]))
        if m["avg_position"] < b["best_position"]:
            b["best_position"] = m["avg_position"]

    # Source patch: skip "missing page" candidates whose query semantically
    # duplicates a post that already exists on disk.
    existing_post_tokens = _existing_post_tokens(site_key)

    out: list[Opportunity] = []
    skipped_existing_post = 0
    for query, info in by_query.items():
        if info["impressions"] < min_impressions:
            continue
        if info["best_position"] < min_position:
            continue  # Some page is doing OK; not a missing-page case
        if _is_semantic_dupe_of_existing_post(query, existing_post_tokens):
            skipped_existing_post += 1
            continue
        score = min(100, 40 + int(info["impressions"] / 10))
        out.append(
            Opportunity(
                site_key=site_key,
                opportunity_type="new_page",
                target_url=None,
                primary_query=query,
                target_query_cluster=[query],
                recommended_action=(
                    f"Consider creating a dedicated page targeting '{query}'. The site "
                    f"appears for it ({info['impressions']} impressions / 28d) but best "
                    f"current page rank is {info['best_position']:.1f}."
                ),
                rationale=(
                    f"High-volume query with no strongly matched page on the site. "
                    f"{len(info['pages'])} pages have surfaced for it but none reach "
                    f"position 30 or better."
                ),
                score=score,
                confidence="medium",
                supporting_data={
                    "query_impressions_28d": info["impressions"],
                    "best_existing_position": round(info["best_position"], 2),
                    "pages_currently_ranking": [
                        {"page": pg, "position": round(p, 2)} for pg, p in sorted(info["pages"], key=lambda x: x[1])[:5]
                    ],
                },
            )
        )
    if skipped_existing_post:
        print(
            f"  detect_missing_pages: skipped {skipped_existing_post} candidate(s) "
            f"that semantically duplicate existing posts on disk"
        )
    return out


# -----------------------------------------------------------------------------
# Persistence
# -----------------------------------------------------------------------------


# Stopwords + Jaccard threshold for intent-duplicate detection at insert time.
# This stops two opps with semantically identical primary_queries (e.g.
# "annual investment allowance" + "annual investment allowance 2025") from
# both entering the queue and producing duplicate-intent pages.
_INTENT_STOPWORDS = {
    "the","a","an","of","for","to","in","and","or","uk","your","my","how","what","when","why","where",
    "do","does","can","should","would","will","vs","versus","it","this","that","near","me","is","are",
}
_INTENT_DUPE_JACCARD_THRESHOLD = 0.6  # match the audit script


def _intent_tokens(s: str) -> frozenset:
    import re as _re_intent
    s = (s or "").lower()
    return frozenset(
        t for t in _re_intent.findall(r"[a-z][a-z0-9-]+", s)
        if t not in _INTENT_STOPWORDS and len(t) > 2
    )


def _is_intent_duplicate_of_existing(opp, existing_tokens: list[tuple[str, frozenset]]) -> str | None:
    """Return the existing primary_query if `opp` is a duplicate-intent of one
    already proposed/in-progress for the same site. Else None."""
    cand = _intent_tokens(opp.primary_query)
    if not cand:
        return None
    for existing_q, existing_tok in existing_tokens:
        if not existing_tok:
            continue
        overlap = len(cand & existing_tok) / max(1, len(cand | existing_tok))
        if overlap >= _INTENT_DUPE_JACCARD_THRESHOLD:
            return existing_q
    return None


def _fetch_existing_proposed_for_site(site_key: str, opportunity_type: str) -> list[tuple[str, frozenset]]:
    """Pull the in-flight primary_queries for one site / opportunity_type so we
    can intent-compare without round-tripping per candidate."""
    r = httpx.get(
        f"{SUPABASE_URL}/rest/v1/optimisation_opportunities",
        headers=_supabase_headers(),
        params={
            "select": "primary_query",
            "site_key": f"eq.{site_key}",
            "opportunity_type": f"eq.{opportunity_type}",
            "status": "in.(proposed,approved,in_progress,shipped)",
            "limit": "1000",
        },
        timeout=20.0,
    )
    if r.status_code >= 300:
        return []
    rows = r.json()
    return [(row.get("primary_query") or "", _intent_tokens(row.get("primary_query") or "")) for row in rows]


def persist_opportunities(opportunities: list[Opportunity]) -> dict[str, int]:
    """Upsert opportunities into optimisation_opportunities.

    Idempotent: the table's UNIQUE index on
    (site_key, opportunity_type, COALESCE(target_url,''), COALESCE(primary_query,''))
    where status IN (proposed, approved, in_progress) prevents exact duplicates.

    Also runs an intent-duplicate check (Jaccard >= 0.6 on tokenised primary_query)
    against already-proposed/shipped opps for the same site + opportunity_type.
    Catches semantic dupes the UNIQUE index misses (e.g. "annual investment
    allowance" vs "annual investment allowance 2025").
    """
    if not opportunities:
        return {"inserted": 0, "skipped": 0, "errored": 0, "skipped_intent_dupe": 0}
    url = f"{SUPABASE_URL}/rest/v1/optimisation_opportunities"
    headers = {**_supabase_headers(), "Content-Type": "application/json", "Prefer": "return=minimal"}

    # Pre-fetch existing in-flight queries per (site, type) so we don't repeat
    # the lookup for each opp.
    existing_cache: dict[tuple[str, str], list[tuple[str, frozenset]]] = {}

    # Also dedupe within the current batch — two new opps proposed in this run
    # shouldn't both insert if they're intent-equivalent.
    batch_tokens: dict[tuple[str, str], list[tuple[str, frozenset]]] = {}

    inserted = 0
    skipped = 0
    errored = 0
    skipped_intent = 0

    for opp in opportunities:
        # Build the comparison pool: existing in-flight + already-accepted from this batch
        key = (opp.site_key, opp.opportunity_type)
        if key not in existing_cache:
            existing_cache[key] = _fetch_existing_proposed_for_site(opp.site_key, opp.opportunity_type)
        pool = list(existing_cache[key]) + list(batch_tokens.get(key, []))

        dup_of = _is_intent_duplicate_of_existing(opp, pool)
        if dup_of:
            skipped_intent += 1
            print(
                f"[PERSIST] intent-dupe skip {opp.site_key}/{opp.opportunity_type}: "
                f"{opp.primary_query!r} (overlaps with {dup_of!r})"
            )
            continue

        payload = {
            "site_key": opp.site_key,
            "opportunity_type": opp.opportunity_type,
            "target_url": opp.target_url,
            "primary_query": opp.primary_query,
            "target_query_cluster": opp.target_query_cluster,
            "recommended_action": opp.recommended_action,
            "rationale": opp.rationale,
            "supporting_data": opp.supporting_data,
            "score": opp.score,
            "confidence": opp.confidence,
            "status": "proposed",
            "data_hash": opp.data_hash,
        }
        r = httpx.post(url, headers=headers, json=payload, timeout=20.0)
        if r.status_code == 201 or r.status_code == 200:
            inserted += 1
            batch_tokens.setdefault(key, []).append((opp.primary_query, _intent_tokens(opp.primary_query)))
        elif r.status_code == 409:
            skipped += 1
        else:
            errored += 1
            print(f"[PERSIST] {opp.site_key} {opp.opportunity_type} {opp.primary_query!r}: {r.status_code} {r.text[:200]}")
    return {
        "inserted": inserted,
        "skipped": skipped,
        "errored": errored,
        "skipped_intent_dupe": skipped_intent,
    }


# -----------------------------------------------------------------------------
# GA4-driven detectors
# -----------------------------------------------------------------------------
# Need post-click signal (engagement, conversions) that GSC can't provide.
# Both detectors are deliberately conservative so they stay quiet until the
# sites have meaningful traffic floor.
#
# BOT HANDLING:
#   GA4's built-in bot filtering catches known crawlers (IAB list: Googlebot,
#   Bingbot, AhrefsBot, etc.) but does NOT catch sophisticated automation
#   that executes JS (headless Chrome, Selenium, some AI crawlers). To guard
#   against bot-driven false signals, detectors use `engaged_sessions` as the
#   traffic floor, not raw `sessions`. Engaged sessions require at least 10s
#   on page OR 2+ pageviews OR a key event — bots rarely clear that bar.
#
#   Conversion-based detectors are doubly safe: GA4 conversions are explicit
#   events (form submit, etc.) that bots almost never trigger correctly. The
#   Supabase `leads` table is the ultimate ground truth for actual lead
#   volume; see `detect_traffic_without_leads` below.


def _fetch_engagement_vs_impressions(site_key: str) -> list[dict]:
    """Pull the cross-reference view: 28d GSC impressions + 28d GA4 sessions
    + engagement_rate per page. View handles the URL→path normalisation.
    """
    url = f"{SUPABASE_URL}/rest/v1/vw_engagement_vs_impressions"
    r = httpx.get(
        url,
        headers=_supabase_headers(),
        params={
            "select": "page_path,impressions_28d,clicks_28d,sessions_28d,engaged_sessions_28d,engagement_rate_28d,conversions_28d,events_28d",
            "site_key": f"eq.{site_key}",
            "order": "impressions_28d.desc",
        },
        timeout=30.0,
    )
    r.raise_for_status()
    return r.json()


def detect_engagement_gap(
    site_key: str,
    *,
    min_engaged_sessions: int = 5,
    min_impressions: int = 100,
    max_engagement_rate: float = 0.20,
) -> list[Opportunity]:
    """Pages that pull traffic (GSC impressions + GA4 sessions) but engage poorly.

    Bot defense: floor is `engaged_sessions` not raw `sessions`. Engaged sessions
    require >=10s on page OR 2+ pageviews OR a key event. Bots almost never
    clear that bar. With min_engaged_sessions=5 + max_engagement_rate=0.20,
    the implied raw-session count is at least 25 (5/0.20), of which at least 20
    failed to engage — a genuine engagement problem, not bot bounce.

    Confidence: MEDIUM. Signal interpretation still needs human judgement
    (intent mismatch? slow page? wrong audience? content disappoints?).
    """
    try:
        rows = _fetch_engagement_vs_impressions(site_key)
    except Exception as exc:
        print(f"  detect_engagement_gap: view fetch failed: {exc}")
        return []

    out: list[Opportunity] = []
    for row in rows:
        sessions = int(row.get("sessions_28d") or 0)
        engaged = int(row.get("engaged_sessions_28d") or 0)
        impressions = int(row.get("impressions_28d") or 0)
        engagement = row.get("engagement_rate_28d")
        page_path = row.get("page_path")
        if not page_path or page_path in ("(not set)", "(other)"):
            continue
        if engaged < min_engaged_sessions or impressions < min_impressions:
            continue
        if engagement is None:
            continue
        engagement_float = float(engagement)
        if engagement_float >= max_engagement_rate:
            continue

        score = min(95, int((1.0 - engagement_float) * 100) + min(20, engaged))
        out.append(
            Opportunity(
                site_key=site_key,
                opportunity_type="engagement_gap",
                target_url=page_path,
                primary_query=None,
                target_query_cluster=[],
                recommended_action=(
                    "Audit on-page content for intent mismatch, slow load, weak hook, "
                    "or above-fold disappointment. Traffic is arriving but bouncing."
                ),
                rationale=(
                    f"{impressions} GSC impressions and {sessions} GA4 sessions ({engaged} engaged) in 28d, "
                    f"but only {engagement_float:.1%} engagement rate."
                ),
                score=score,
                confidence="medium",
                supporting_data={
                    "impressions_28d": impressions,
                    "clicks_28d": int(row.get("clicks_28d") or 0),
                    "sessions_28d": sessions,
                    "engaged_sessions_28d": engaged,
                    "engagement_rate_28d": round(engagement_float, 4),
                },
            )
        )
    return out


def detect_conversion_drop(
    site_key: str,
    *,
    min_baseline_days: int = 14,
    min_sessions_per_period: int = 30,
) -> list[Opportunity]:
    """Pages that previously converted but stopped.

    Requires at least `min_baseline_days` of GA4 data to compare two equal
    halves of the window. Until we have that history, returns [] silently.

    Conservative: needs both halves to clear the sessions floor; needs the
    drop to be from non-zero to zero (not 5 -> 4).

    Confidence: HIGH if both halves clear floor and drop is from >=3 to 0.
                MEDIUM otherwise.
    """
    url = f"{SUPABASE_URL}/rest/v1/ga4_page_data"
    half_window = min_baseline_days // 2
    today = date.today()
    cutoff = today - timedelta(days=min_baseline_days * 2 + 2)
    older_start = today - timedelta(days=min_baseline_days * 2 + 2)
    older_end = today - timedelta(days=min_baseline_days + 2)
    newer_start = today - timedelta(days=min_baseline_days + 2)
    newer_end = today - timedelta(days=2)

    r = httpx.get(
        url,
        headers=_supabase_headers(),
        params={
            "select": "page_path,date,sessions,conversions",
            "site_key": f"eq.{site_key}",
            "date": f"gte.{cutoff.isoformat()}",
        },
        timeout=30.0,
    )
    if r.status_code >= 400:
        return []
    rows = r.json() or []
    if not rows:
        return []

    # Bucket by page
    by_page: dict[str, dict[str, dict[str, int]]] = defaultdict(lambda: {"older": {"sessions": 0, "conv": 0}, "newer": {"sessions": 0, "conv": 0}})
    for row in rows:
        d = row.get("date")
        path = row.get("page_path")
        if not d or not path:
            continue
        try:
            row_date = datetime.fromisoformat(d).date() if "T" in d else date.fromisoformat(d)
        except ValueError:
            continue
        if older_start <= row_date <= older_end:
            bucket = "older"
        elif newer_start <= row_date <= newer_end:
            bucket = "newer"
        else:
            continue
        by_page[path][bucket]["sessions"] += int(row.get("sessions") or 0)
        by_page[path][bucket]["conv"] += int(row.get("conversions") or 0)

    out: list[Opportunity] = []
    for path, halves in by_page.items():
        older_sess = halves["older"]["sessions"]
        newer_sess = halves["newer"]["sessions"]
        older_conv = halves["older"]["conv"]
        newer_conv = halves["newer"]["conv"]
        # Both halves need traffic floor
        if older_sess < min_sessions_per_period or newer_sess < min_sessions_per_period:
            continue
        # We're looking for: converted before, stopped now
        if older_conv < 3 or newer_conv != 0:
            continue
        # Score scales with prior conversion volume
        score = min(95, 60 + older_conv * 5)
        confidence = "high" if older_conv >= 5 else "medium"
        out.append(
            Opportunity(
                site_key=site_key,
                opportunity_type="conversion_drop",
                target_url=path,
                primary_query=None,
                target_query_cluster=[],
                recommended_action=(
                    "Investigate why this page stopped converting. Check recent code changes, "
                    "lead-form rendering, page load, or content edits."
                ),
                rationale=(
                    f"Earlier half ({min_baseline_days}d): {older_sess} sessions, {older_conv} conversions. "
                    f"Recent half ({min_baseline_days}d): {newer_sess} sessions, 0 conversions."
                ),
                score=score,
                confidence=confidence,
                supporting_data={
                    "older_sessions": older_sess,
                    "older_conversions": older_conv,
                    "newer_sessions": newer_sess,
                    "newer_conversions": newer_conv,
                    "baseline_days": min_baseline_days,
                },
            )
        )
    return out


def detect_traffic_without_leads(
    site_key: str,
    *,
    min_engaged_sessions: int = 100,
    days: int = 28,
) -> list[Opportunity]:
    """Site-level (not page-level): if engaged GA4 sessions are non-trivial but
    the Supabase `leads` table shows zero submissions in the same window,
    something in the funnel is broken — or GA4 is being driven by sophisticated
    bots that pass engagement heuristics.

    Either way the optimisation engine should NOT trust per-page GA4 signal
    as a conversion proxy on this site this week. Emit one opportunity per
    flagged site so a human investigates before tuning content.

    Confidence: HIGH at the site-level — broken funnel is more likely than
    "100+ engaged humans actually didn't want to convert". MEDIUM if site is
    pre-launch / brand-new with no conversion history at all.
    """
    # Engaged sessions for this site in the window
    cutoff = (date.today() - timedelta(days=days)).isoformat()
    r = httpx.get(
        f"{SUPABASE_URL}/rest/v1/ga4_page_data",
        headers=_supabase_headers(),
        params={
            "select": "engaged_sessions,sessions,conversions",
            "site_key": f"eq.{site_key}",
            "date": f"gte.{cutoff}",
        },
        timeout=30.0,
    )
    if r.status_code >= 400:
        return []
    rows = r.json() or []
    total_engaged = sum(int(row.get("engaged_sessions") or 0) for row in rows)
    total_sessions = sum(int(row.get("sessions") or 0) for row in rows)
    total_ga4_conv = sum(int(row.get("conversions") or 0) for row in rows)
    if total_engaged < min_engaged_sessions:
        return []

    # Real lead count for this site in the same window. The leads table uses
    # `source` column to identify the site (per memory: dentists / property /
    # medical / solicitors / general / agency).
    SOURCE_MAP = {
        "dentists": "dentists", "property": "property",
        "medical": "medical", "solicitors": "solicitors",
        "agency": "agency-founder-finance", "generalist": "general",
    }
    leads_source = SOURCE_MAP.get(site_key, site_key)
    rl = httpx.get(
        f"{SUPABASE_URL}/rest/v1/leads",
        headers={**_supabase_headers(), "Prefer": "count=exact", "Range": "0-0"},
        params={
            "select": "id",
            "source": f"eq.{leads_source}",
            "created_at": f"gte.{cutoff}T00:00:00",
        },
        timeout=20.0,
    )
    real_leads = 0
    if rl.status_code in (200, 206):
        content_range = rl.headers.get("Content-Range", "")
        if "/" in content_range:
            try:
                real_leads = int(content_range.split("/")[-1])
            except ValueError:
                pass

    if real_leads > 0:
        return []  # ground truth says leads exist; not a broken-funnel signal

    score = min(95, 50 + min(40, total_engaged // 25))
    return [
        Opportunity(
            site_key=site_key,
            opportunity_type="traffic_without_leads",
            target_url=None,
            primary_query=None,
            target_query_cluster=[],
            recommended_action=(
                "Investigate lead funnel: form rendering, submit handler, "
                "Supabase RLS, GA4 conversion event firing. Also check whether "
                "traffic is bot-driven despite engagement-rate filters."
            ),
            rationale=(
                f"{total_engaged} engaged GA4 sessions in last {days}d "
                f"({total_sessions} raw, {total_ga4_conv} GA4-recorded conversions), "
                f"but zero rows in Supabase leads table (source={leads_source!r}) "
                f"for the same window. Funnel may be broken, or traffic may be bot-driven."
            ),
            score=score,
            confidence="high",
            supporting_data={
                "engaged_sessions_window": total_engaged,
                "sessions_window": total_sessions,
                "ga4_conversions_window": total_ga4_conv,
                "real_leads_window": real_leads,
                "window_days": days,
                "leads_source_filter": leads_source,
            },
        )
    ]


def run_all_detectors(site_key: str, days: int = 28) -> dict[str, Any]:
    print(f"\n=== Detectors for {site_key} ===")
    rows = _fetch_query_data(site_key, days=days)
    by_pq = aggregate_by_page_query(rows) if rows else {}
    if rows:
        print(f"  loaded {len(rows)} rows aggregating to {len(by_pq)} (page, query) pairs")
    else:
        print(f"  no GSC query data for {site_key} (still running DataForSEO-based detectors)")

    opportunities: list[Opportunity] = []
    if by_pq:
        opportunities += detect_ctr_problems(site_key, by_pq)
        opportunities += detect_near_miss_expansion(site_key, by_pq)
        opportunities += detect_cannibalisation(site_key, by_pq)
        opportunities += detect_query_page_mismatch(site_key, by_pq)
        opportunities += detect_missing_pages(site_key, by_pq)
    opportunities += detect_dataforseo_keyword_gap(site_key)

    # GA4-driven detectors (only fire for sites with GA4 property + traffic floor).
    # See bot-handling notes above each function.
    opportunities += detect_engagement_gap(site_key)
    opportunities += detect_conversion_drop(site_key)
    opportunities += detect_traffic_without_leads(site_key)

    # Sort by score desc for nicer logs
    opportunities.sort(key=lambda o: o.score, reverse=True)

    # Report
    by_type: dict[str, int] = defaultdict(int)
    by_conf: dict[str, int] = defaultdict(int)
    for o in opportunities:
        by_type[o.opportunity_type] += 1
        by_conf[o.confidence] += 1
    print(f"  detected {len(opportunities)} opportunities")
    for t, c in sorted(by_type.items()):
        print(f"    {t}: {c}")
    print(f"  confidence: high={by_conf.get('high',0)} medium={by_conf.get('medium',0)} low={by_conf.get('low',0)}")

    # Top 5 by score
    print("  top 5 by score:")
    for o in opportunities[:5]:
        url_short = (o.target_url or "(new)").rsplit("/", 1)[-1][:50]
        print(f"    score={o.score} {o.confidence:6s} {o.opportunity_type:22s} q={o.primary_query!r:55s} pg=.../{url_short}")

    result = persist_opportunities(opportunities)
    print(f"  persisted: inserted={result['inserted']} skipped={result['skipped']} errored={result['errored']} intent_dupes_skipped={result.get('skipped_intent_dupe', 0)}")

    return {"site_key": site_key, "opportunities": len(opportunities), **result}


def main() -> None:
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("sites", nargs="*", default=None, help="default = all active")
    parser.add_argument("--days", type=int, default=28)
    args = parser.parse_args()

    sites = args.sites or ["agency", "property", "dentists"]  # generalist has no data yet
    summaries = []
    for site in sites:
        try:
            summaries.append(run_all_detectors(site, days=args.days))
        except Exception as exc:
            print(f"[ERROR] {site}: {exc}")
            summaries.append({"site_key": site, "error": str(exc)})

    print("\n=== Summary ===")
    for s in summaries:
        print(s)


if __name__ == "__main__":
    main()
