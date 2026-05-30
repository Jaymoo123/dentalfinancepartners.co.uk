"""Pull all Supabase data for a single property page slug.

Usage:
    python -m optimisation_engine.track2.pull_page_data --slug <slug>
    python -m optimisation_engine.track2.pull_page_data --slug <slug> --json

Pulls (read-only):
    - gsc_query_data (top 25 queries by impressions, 90d)
    - bing_query_data (top 25 Bing queries, latest snapshot; legacy pages often
      rank far better on Bing than Google for the same intent)
    - ga4_page_data (engagement signals, 90d)
    - competitor_serps (any SERP runs referencing this URL)
    - competitor_pages (competitor URLs at those SERPs)
    - page_content_map (our page parsed signals + competitor signals)
    - competitor_gap_reports (DeepSeek gap analysis if exists)
    - adjacent keyword opportunity (FREE/CACHED sources only: competitor_gap_reports
      query gaps, blog_topics seed-matched keywords, cached dataforseo_keyword_data) -
      NO live paid API calls.

Two reusable functions are exposed at module level for the query-coverage
checker (scripts/track2_query_coverage.py) so the two tools can never disagree
on the target query set:
    - build_target_queries(slug, days) -> merged+deduped GSC+Bing demand
    - build_adjacent(slug, seed_terms)  -> free/cached adjacent keyword ideas

Per `docs/property/TRACK2_PROGRAM.md` §9 + inherited URL-liveness discipline
from `docs/property/NETNEW_PROGRAM.md` §16.31.

Reads SUPABASE_ACCESS_TOKEN from .env. Read-only SELECTs against Supabase
Management API; no writes.
"""
from __future__ import annotations

import argparse
import json
import re
import sys

from optimisation_engine.competitor._db import _sql


def _section(title: str) -> None:
    print(f"\n{'=' * 70}\n{title}\n{'=' * 70}")


# --------------------------------------------------------------------------- #
# Reusable query-set builders (imported by scripts/track2_query_coverage.py).  #
# These run the SAME SQL the human report uses, so the coverage gate and the   #
# data dump can never disagree on what the target query set is.                #
# --------------------------------------------------------------------------- #

# Stop / short words dropped when deriving seed terms from a slug.
_SEED_STOP = {
    "the", "a", "an", "for", "to", "of", "in", "on", "uk", "and", "or", "with",
    "vs", "your", "my", "how", "what", "is", "are", "do", "can", "i",
}


def _gsc_query_rows(slug: str, days: int = 90) -> list[dict]:
    """Top GSC queries for the page (same SQL as the §1 human block)."""
    url_like = f"%{slug}%"
    return _sql(f"""
        SELECT query, SUM(impressions) AS impressions, SUM(clicks) AS clicks,
               ROUND(AVG(position)::numeric, 2) AS avg_position,
               ROUND((SUM(clicks)::numeric / NULLIF(SUM(impressions),0) * 100), 2) AS ctr_pct
        FROM gsc_query_data
        WHERE site_key='property' AND page_url ILIKE '{url_like}'
          AND date > now() - interval '{days} days'
        GROUP BY query
        ORDER BY 2 DESC
        LIMIT 25;
    """)


def _bing_query_rows(slug: str) -> list[dict]:
    """Top Bing queries for the page (same SQL as the §1b human block)."""
    url_like = f"%{slug}%"
    return _sql(f"""
        SELECT query, SUM(impressions) AS impressions, SUM(clicks) AS clicks,
               ROUND(AVG(position)::numeric, 1) AS avg_position,
               ROUND((SUM(clicks)::numeric / NULLIF(SUM(impressions),0) * 100), 2) AS ctr_pct
        FROM bing_query_data
        WHERE site_key='property' AND page_url ILIKE '{url_like}'
          AND date = (SELECT MAX(date) FROM bing_query_data WHERE site_key='property')
        GROUP BY query
        ORDER BY 2 DESC
        LIMIT 25;
    """)


def build_target_queries(slug: str, days: int = 90) -> list[dict]:
    """Merge GSC + Bing demand into one deduped target-query list.

    Dedup key is the lowercased+stripped query string. Impressions are summed
    across sources; the best (lowest) position is kept; source is set to
    'gsc' / 'bing' / 'both'. Sorted by impressions descending.

    Returns: [{"query": str, "source": str, "impr": int, "pos": float}, ...]
    """
    merged: dict[str, dict] = {}

    def _ingest(rows: list[dict], src: str) -> None:
        for r in rows:
            q = (r.get("query") or "").strip()
            if not q:
                continue
            key = q.lower()
            impr = int(r.get("impressions") or 0)
            pos = r.get("avg_position")
            pos = float(pos) if pos is not None else None
            if key not in merged:
                merged[key] = {"query": q, "source": src, "impr": impr, "pos": pos}
            else:
                m = merged[key]
                m["impr"] += impr
                if pos is not None and (m["pos"] is None or pos < m["pos"]):
                    m["pos"] = pos
                if m["source"] != src:
                    m["source"] = "both"

    try:
        _ingest(_gsc_query_rows(slug, days), "gsc")
    except Exception as exc:  # noqa: BLE001 - best effort, never crash the gate
        print(f"  [build_target_queries] GSC pull failed: {exc}", file=sys.stderr)
    try:
        _ingest(_bing_query_rows(slug), "bing")
    except Exception as exc:  # noqa: BLE001
        print(f"  [build_target_queries] Bing pull failed: {exc}", file=sys.stderr)

    out = list(merged.values())
    for m in out:
        if m["pos"] is not None:
            m["pos"] = round(float(m["pos"]), 2)
    out.sort(key=lambda m: m["impr"], reverse=True)
    return out


def _seed_terms_from(slug: str) -> list[str]:
    """Significant single-word seed terms from a slug (stopwords/short dropped)."""
    parts = [p for p in re.split(r"[-_\s]+", slug.lower()) if p]
    return [p for p in parts if len(p) > 2 and p not in _SEED_STOP]


def build_adjacent(slug: str, seed_terms) -> list[dict]:
    """Pull adjacent keyword ideas from FREE / CACHED sources only.

    NO live paid API call. Every source is wrapped in try/except so a missing
    table or schema drift never crashes the caller. Sources:
      - competitor_gap_reports.primary_query        -> source 'gap'
      - blog_topics primary_keyword + secondary     -> source 'blog_topics'
      - dataforseo_keyword_data.related_keyword      -> source 'dataforseo'
        (cached only; google-autocomplete rows have null search_volume - fine)

    `seed_terms` may be a string (single seed) or a list of seed terms. Terms
    are matched ILIKE against the cached tables; significant slug words are also
    folded in so the match is not over-narrow.

    Returns deduped [{"term": str, "source": str, "volume": int|null}], cap ~40.
    """
    if isinstance(seed_terms, str):
        base_seeds = [seed_terms]
    else:
        base_seeds = list(seed_terms or [])
    # Fold in significant slug words to widen the ILIKE net.
    seeds: list[str] = []
    for s in base_seeds + _seed_terms_from(slug):
        s = (s or "").strip()
        if s and s.lower() not in {x.lower() for x in seeds}:
            seeds.append(s)
    if not seeds:
        seeds = [slug.replace("-", " ")]

    url_like = f"%{slug}%"
    out: list[dict] = []
    seen: set[str] = set()

    def _add(term, source: str, volume=None) -> None:
        term = (term or "").strip()
        if not term:
            return
        key = term.lower()
        if key in seen:
            return
        seen.add(key)
        vol = int(volume) if volume not in (None, "") else None
        out.append({"term": term, "source": source, "volume": vol})

    # --- competitor_gap_reports (gap queries for this page) ------------------
    try:
        rows = _sql(f"""
            SELECT primary_query
            FROM competitor_gap_reports
            WHERE site_key='property' AND our_page_url ILIKE '{url_like}'
              AND primary_query IS NOT NULL;
        """)
        for r in rows:
            _add(r.get("primary_query"), "gap")
    except Exception as exc:  # noqa: BLE001
        print(f"  [build_adjacent] competitor_gap_reports skipped: {exc}", file=sys.stderr)

    # ILIKE OR-clause over the seed terms.
    def _ilike_clause(col: str) -> str:
        clauses = [f"{col} ILIKE '%{s.replace(chr(39), chr(39) * 2)}%'" for s in seeds]
        return "(" + " OR ".join(clauses) + ")"

    # --- blog_topics (seed-matched primary + secondary keywords) -------------
    try:
        rows = _sql(f"""
            SELECT bt.primary_keyword,
                   sk.kw AS secondary_keyword
            FROM blog_topics bt
            LEFT JOIN LATERAL jsonb_array_elements_text(
                CASE WHEN jsonb_typeof(bt.secondary_keywords) = 'array'
                     THEN bt.secondary_keywords ELSE '[]'::jsonb END
            ) AS sk(kw) ON TRUE
            WHERE bt.site_key='property'
              AND ({_ilike_clause('bt.primary_keyword')}
                   OR {_ilike_clause('bt.topic')})
            LIMIT 60;
        """)
        for r in rows:
            _add(r.get("primary_keyword"), "blog_topics")
            _add(r.get("secondary_keyword"), "blog_topics")
    except Exception as exc:  # noqa: BLE001
        print(f"  [build_adjacent] blog_topics skipped: {exc}", file=sys.stderr)

    # --- dataforseo_keyword_data (CACHED rows only) --------------------------
    try:
        rows = _sql(f"""
            SELECT related_keyword, search_volume
            FROM dataforseo_keyword_data
            WHERE site_key='property'
              AND related_keyword IS NOT NULL
              AND {_ilike_clause('related_keyword')}
            LIMIT 25;
        """)
        for r in rows:
            _add(r.get("related_keyword"), "dataforseo", r.get("search_volume"))
    except Exception as exc:  # noqa: BLE001
        print(f"  [build_adjacent] dataforseo_keyword_data skipped: {exc}", file=sys.stderr)

    return out[:40]


def _seed_terms_for_adjacent(slug: str, gsc_rows: list[dict], bing_rows: list[dict]) -> list[str]:
    """Pick seed terms: top GSC query else top Bing query else slug words."""
    if gsc_rows:
        return [gsc_rows[0].get("query") or slug.replace("-", " ")]
    if bing_rows:
        return [bing_rows[0].get("query") or slug.replace("-", " ")]
    return [slug.replace("-", " ")]


def pull_json(slug: str, days: int = 90) -> dict:
    """Assemble the full machine-readable payload for one slug.

    Reuses the same SELECTs as the human ``pull()`` report. Every section is
    best-effort: a failing/missing table yields an empty list or null, never an
    exception, so the JSON contract stays stable.
    """
    url_like = f"%{slug}%"

    def _safe(fn, default):
        try:
            return fn()
        except Exception as exc:  # noqa: BLE001
            print(f"  [pull_json] section failed: {exc}", file=sys.stderr)
            return default

    # --- GSC ---------------------------------------------------------------
    gsc_rows = _safe(lambda: _gsc_query_rows(slug, days), [])
    gsc = [
        {
            "query": r.get("query"),
            "impr": int(r.get("impressions") or 0),
            "clk": int(r.get("clicks") or 0),
            "pos": float(r["avg_position"]) if r.get("avg_position") is not None else None,
            "ctr": float(r["ctr_pct"]) if r.get("ctr_pct") is not None else 0.0,
        }
        for r in gsc_rows
    ]

    # --- Bing --------------------------------------------------------------
    bing_rows = _safe(lambda: _bing_query_rows(slug), [])
    bing = [
        {
            "query": r.get("query"),
            "impr": int(r.get("impressions") or 0),
            "clk": int(r.get("clicks") or 0),
            "pos": float(r["avg_position"]) if r.get("avg_position") is not None else None,
            "ctr": float(r["ctr_pct"]) if r.get("ctr_pct") is not None else 0.0,
        }
        for r in bing_rows
    ]

    # --- GA4 ---------------------------------------------------------------
    def _ga4():
        rows = _sql(f"""
            SELECT SUM(sessions) AS sessions,
                   SUM(engaged_sessions) AS engaged_sessions,
                   ROUND(AVG(engagement_rate)::numeric, 3) AS engagement_rate,
                   ROUND(AVG(bounce_rate)::numeric, 3) AS bounce_rate,
                   ROUND(AVG(average_session_duration)::numeric, 1) AS avg_duration_s,
                   SUM(conversions) AS conversions
            FROM ga4_page_data
            WHERE site_key='property' AND page_path ILIKE '{url_like}'
              AND date > now() - interval '{days} days';
        """)
        if not rows or rows[0].get("sessions") is None:
            return None
        r = rows[0]
        return {
            "sessions": int(r.get("sessions") or 0),
            "engaged_sessions": int(r.get("engaged_sessions") or 0),
            "engagement_rate": float(r["engagement_rate"]) if r.get("engagement_rate") is not None else None,
            "bounce_rate": float(r["bounce_rate"]) if r.get("bounce_rate") is not None else None,
            "avg_duration_s": float(r["avg_duration_s"]) if r.get("avg_duration_s") is not None else None,
            "conversions": int(r.get("conversions") or 0),
        }

    ga4 = _safe(_ga4, None)

    # --- competitors (top competitor URLs at our SERPs) --------------------
    def _competitors():
        rows = _sql(f"""
            SELECT cp.position, cp.url, cp.domain, cp.title
            FROM competitor_pages cp
            JOIN competitor_serps cs ON cs.id = cp.serp_id
            WHERE cs.site_key='property' AND cs.our_page_url ILIKE '{url_like}'
            ORDER BY cs.fetch_date DESC, cp.position ASC
            LIMIT 20;
        """)
        return [
            {"pos": r.get("position"), "domain": r.get("domain"),
             "url": r.get("url"), "title": r.get("title")}
            for r in rows
        ]

    competitors = _safe(_competitors, [])

    # --- competitor_depth --------------------------------------------------
    def _competitor_depth():
        rows = _sql(f"""
            SELECT pcm.page_url, pcm.word_count,
                   jsonb_array_length(COALESCE(pcm.sections, '[]'::jsonb)) AS section_count,
                   jsonb_array_length(COALESCE(pcm.faqs, '[]'::jsonb)) AS faq_count
            FROM page_content_map pcm
            JOIN competitor_pages cp ON cp.url = pcm.page_url
            JOIN competitor_serps cs ON cs.id = cp.serp_id
            WHERE cs.site_key='property' AND cs.our_page_url ILIKE '{url_like}'
            GROUP BY pcm.page_url, pcm.word_count, pcm.sections, pcm.faqs
            ORDER BY pcm.word_count DESC NULLS LAST
            LIMIT 10;
        """)
        return [
            {"url": r.get("page_url"), "wc": r.get("word_count") or 0,
             "sections": r.get("section_count") or 0, "faqs": r.get("faq_count") or 0}
            for r in rows
        ]

    competitor_depth = _safe(_competitor_depth, [])

    # --- page_map (our parsed signals) -------------------------------------
    def _page_map():
        rows = _sql(f"""
            SELECT word_count, title_tag, meta_description, h1_text,
                   jsonb_array_length(COALESCE(sections, '[]'::jsonb)) AS section_count,
                   jsonb_array_length(COALESCE(faqs, '[]'::jsonb)) AS faq_count
            FROM page_content_map
            WHERE site_key='property' AND is_our_page=true AND page_url ILIKE '{url_like}'
            ORDER BY fetch_date DESC
            LIMIT 1;
        """)
        if not rows:
            return None
        r = rows[0]
        return {
            "word_count": r.get("word_count"),
            "sections": r.get("section_count") or 0,
            "faqs": r.get("faq_count") or 0,
            "title_tag": r.get("title_tag"),
            "meta_description": r.get("meta_description"),
            "h1_text": r.get("h1_text"),
        }

    page_map = _safe(_page_map, None)

    # --- gap_report --------------------------------------------------------
    def _gap_report():
        rows = _sql(f"""
            SELECT primary_query, priority_score,
                   our_word_count, competitor_avg_word_count
            FROM competitor_gap_reports
            WHERE site_key='property' AND our_page_url ILIKE '{url_like}'
            ORDER BY priority_score DESC NULLS LAST
            LIMIT 1;
        """)
        if not rows:
            return None
        r = rows[0]
        return {
            "primary_query": r.get("primary_query"),
            "priority_score": float(r["priority_score"]) if r.get("priority_score") is not None else None,
            "our_word_count": r.get("our_word_count"),
            "competitor_avg_word_count": r.get("competitor_avg_word_count"),
        }

    gap_report = _safe(_gap_report, None)

    # --- adjacent + target_queries -----------------------------------------
    target_queries = build_target_queries(slug, days)
    seed_terms = _seed_terms_for_adjacent(slug, gsc_rows, bing_rows)
    adjacent = _safe(lambda: build_adjacent(slug, seed_terms), [])

    return {
        "slug": slug,
        "gsc": gsc,
        "bing": bing,
        "ga4": ga4,
        "competitors": competitors,
        "competitor_depth": competitor_depth,
        "page_map": page_map,
        "gap_report": gap_report,
        "adjacent": adjacent,
        "target_queries": target_queries,
    }


def pull(slug: str, days: int = 90) -> None:
    url_like = f"%{slug}%"

    _section(f"1. GSC query_data - top queries by impressions ({days}d)")
    rows = _sql(f"""
        SELECT query, SUM(impressions) AS impressions, SUM(clicks) AS clicks,
               ROUND(AVG(position)::numeric, 2) AS avg_position,
               ROUND((SUM(clicks)::numeric / NULLIF(SUM(impressions),0) * 100), 2) AS ctr_pct
        FROM gsc_query_data
        WHERE site_key='property' AND page_url ILIKE '{url_like}'
          AND date > now() - interval '{days} days'
        GROUP BY query
        ORDER BY 2 DESC
        LIMIT 25;
    """)
    if not rows:
        print("  (no GSC rows for this slug in the window)")
    for r in rows:
        print(
            f"  {r['impressions']:>5} imp | {r['clicks']:>3} clk | "
            f"pos {r['avg_position']:>5} | CTR {r['ctr_pct'] or 0:>5}% | "
            f"{r['query']}"
        )

    _section("1b. Bing query_data - what this page ranks for on Bing (latest snapshot)")
    print(
        "  NOTE: many legacy pages rank FAR better on Bing (often page 1) than on\n"
        "  Google for the same intent. Treat these queries as proven demand to keep\n"
        "  serving, and the strong Bing positions as evidence the page's core answer\n"
        "  already works - the rewrite should DEEPEN and lift Google, not discard it."
    )
    rows = _sql(f"""
        SELECT query, SUM(impressions) AS impressions, SUM(clicks) AS clicks,
               ROUND(AVG(position)::numeric, 1) AS avg_position,
               ROUND((SUM(clicks)::numeric / NULLIF(SUM(impressions),0) * 100), 2) AS ctr_pct
        FROM bing_query_data
        WHERE site_key='property' AND page_url ILIKE '{url_like}'
          AND date = (SELECT MAX(date) FROM bing_query_data WHERE site_key='property')
        GROUP BY query
        ORDER BY 2 DESC
        LIMIT 25;
    """)
    if not rows:
        print("  (no Bing rows for this slug - INVISIBLE on Bing, or below the GetPageStats cap)")
    for r in rows:
        print(
            f"  {r['impressions']:>5} imp | {r['clicks']:>3} clk | "
            f"pos {r['avg_position']:>5} | CTR {r['ctr_pct'] or 0:>5}% | "
            f"{r['query']}"
        )

    _section(f"2. GA4 page_data - engagement signals ({days}d)")
    rows = _sql(f"""
        SELECT page_path,
               SUM(sessions) AS sessions,
               SUM(active_users) AS active_users,
               SUM(engaged_sessions) AS engaged_sessions,
               ROUND(AVG(engagement_rate)::numeric, 3) AS engagement_rate,
               ROUND(AVG(bounce_rate)::numeric, 3) AS bounce_rate,
               ROUND(AVG(average_session_duration)::numeric, 1) AS avg_duration_s,
               SUM(conversions) AS conversions
        FROM ga4_page_data
        WHERE site_key='property' AND page_path ILIKE '{url_like}'
          AND date > now() - interval '{days} days'
        GROUP BY page_path;
    """)
    if not rows:
        print("  (no GA4 rows)")
    for r in rows:
        print(f"  path: {r['page_path']}")
        print(
            f"  sessions={r['sessions']} active_users={r['active_users']} "
            f"engaged_sessions={r['engaged_sessions']}"
        )
        print(
            f"  engagement_rate={r['engagement_rate']} "
            f"bounce_rate={r['bounce_rate']} "
            f"avg_duration_s={r['avg_duration_s']}"
        )
        print(f"  conversions={r['conversions']}")

    _section("3. competitor_serps - SERPs referencing this page")
    rows = _sql(f"""
        SELECT cs.query, cs.our_position, cs.fetch_date,
               (SELECT COUNT(*) FROM competitor_pages WHERE serp_id = cs.id) AS competitor_count
        FROM competitor_serps cs
        WHERE cs.site_key='property' AND cs.our_page_url ILIKE '{url_like}'
        ORDER BY cs.fetch_date DESC
        LIMIT 10;
    """)
    if not rows:
        print("  (no SERP rows; never been SERP-runner'd)")
    for r in rows:
        print(
            f"  {r['fetch_date']} | pos={r['our_position']} | "
            f"query='{r['query']}' | {r['competitor_count']} competitors"
        )

    _section("4. competitor_pages - top-position competitor URLs at our SERPs")
    rows = _sql(f"""
        SELECT cp.position, cp.url, cp.domain, cp.title
        FROM competitor_pages cp
        JOIN competitor_serps cs ON cs.id = cp.serp_id
        WHERE cs.site_key='property' AND cs.our_page_url ILIKE '{url_like}'
        ORDER BY cs.fetch_date DESC, cp.position ASC
        LIMIT 20;
    """)
    if not rows:
        print("  (no competitor pages stored)")
    for r in rows:
        print(f"  pos={r['position']:>2} | {r['domain']:<35} | {r['url']}")

    _section("5. page_content_map - OUR page parsed signals")
    rows = _sql(f"""
        SELECT page_url, fetch_date, word_count, title_tag, meta_description, h1_text,
               jsonb_array_length(COALESCE(sections, '[]'::jsonb)) AS section_count,
               jsonb_array_length(COALESCE(faqs, '[]'::jsonb)) AS faq_count
        FROM page_content_map
        WHERE site_key='property' AND is_our_page=true AND page_url ILIKE '{url_like}'
        ORDER BY fetch_date DESC
        LIMIT 3;
    """)
    if not rows:
        print("  (no page_content_map row; never been parsed)")
    for r in rows:
        print(f"  {r['fetch_date']}")
        print(
            f"    word_count={r['word_count']} sections={r['section_count']} "
            f"faqs={r['faq_count']}"
        )
        print(f"    title_tag: {r['title_tag']}")
        print(f"    meta_description: {r['meta_description']}")
        print(f"    h1_text: {r['h1_text']}")

    _section("6. page_content_map - COMPETITOR signals at our SERPs")
    rows = _sql(f"""
        SELECT pcm.page_url, pcm.word_count,
               jsonb_array_length(COALESCE(pcm.sections, '[]'::jsonb)) AS section_count,
               jsonb_array_length(COALESCE(pcm.faqs, '[]'::jsonb)) AS faq_count
        FROM page_content_map pcm
        JOIN competitor_pages cp ON cp.url = pcm.page_url
        JOIN competitor_serps cs ON cs.id = cp.serp_id
        WHERE cs.site_key='property' AND cs.our_page_url ILIKE '{url_like}'
        GROUP BY pcm.page_url, pcm.word_count, pcm.sections, pcm.faqs
        ORDER BY pcm.word_count DESC NULLS LAST
        LIMIT 10;
    """)
    if not rows:
        print("  (no competitor signals)")
    for r in rows:
        print(
            f"  wc={r['word_count'] or 0:>5} | sections={r['section_count']:>2} | "
            f"faqs={r['faq_count']:>2} | {r['page_url']}"
        )

    _section("7. competitor_gap_reports - DeepSeek gap analysis (legacy)")
    rows = _sql(f"""
        SELECT primary_query, our_avg_position,
               our_word_count, competitor_avg_word_count,
               our_section_count, competitor_avg_section_count,
               our_faq_count, competitor_avg_faq_count,
               priority_score, status
        FROM competitor_gap_reports
        WHERE site_key='property' AND our_page_url ILIKE '{url_like}'
        LIMIT 3;
    """)
    if not rows:
        print("  (no gap report)")
    for r in rows:
        print(f"  primary_query: {r['primary_query']}")
        print(f"  pos={r['our_avg_position']} priority_score={r['priority_score']} status={r['status']}")
        print(f"  our_wc={r['our_word_count']} vs comp_avg={r['competitor_avg_word_count']}")
        print(f"  our_sections={r['our_section_count']} vs comp_avg={r['competitor_avg_section_count']}")
        print(f"  our_faqs={r['our_faq_count']} vs comp_avg={r['competitor_avg_faq_count']}")

    _section("8. Adjacent keyword opportunity (FREE/CACHED sources only - no paid API)")
    # Seed from the top GSC query, else top Bing query, else the slug words.
    gsc_top = _gsc_query_rows(slug, days)
    bing_top = _bing_query_rows(slug)
    seeds = _seed_terms_for_adjacent(slug, gsc_top, bing_top)
    print(f"  seed terms: {seeds}")
    adj = build_adjacent(slug, seeds)
    if not adj:
        print("  (no adjacent keyword ideas from gap reports / blog_topics / cached dataforseo)")
    for a in adj:
        vol = a["volume"]
        vol_s = f"vol {vol:>6}" if vol is not None else "vol     --"
        print(f"  {a['source']:<11} | {vol_s} | {a['term']}")

    print("\n\nDONE")


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Pull Supabase data for one property page slug (Track 2 brief Stage 2 input)."
    )
    parser.add_argument("--slug", required=True, help="Page slug (filename without .md)")
    parser.add_argument(
        "--days",
        type=int,
        default=90,
        help="GSC/GA4 lookback window in days (default 90)",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Emit the machine-readable JSON payload only (suppress human report).",
    )
    args = parser.parse_args()
    if args.json:
        print(json.dumps(pull_json(args.slug, days=args.days), indent=2))
    else:
        pull(args.slug, days=args.days)
    return 0


if __name__ == "__main__":
    sys.exit(main())
