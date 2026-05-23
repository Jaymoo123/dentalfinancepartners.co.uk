"""Pull all Supabase data for a single property page slug.

Usage:
    python -m optimisation_engine.track2.pull_page_data --slug <slug>

Pulls (read-only):
    - gsc_query_data (top 25 queries by impressions, 90d)
    - ga4_page_data (engagement signals, 90d)
    - competitor_serps (any SERP runs referencing this URL)
    - competitor_pages (competitor URLs at those SERPs)
    - page_content_map (our page parsed signals + competitor signals)
    - competitor_gap_reports (DeepSeek gap analysis if exists)

Per `docs/property/TRACK2_PROGRAM.md` §9 + inherited URL-liveness discipline
from `docs/property/NETNEW_PROGRAM.md` §16.31.

Reads SUPABASE_ACCESS_TOKEN from .env. Read-only SELECTs against Supabase
Management API; no writes.
"""
from __future__ import annotations

import argparse
import sys

from optimisation_engine.competitor._db import _sql


def _section(title: str) -> None:
    print(f"\n{'=' * 70}\n{title}\n{'=' * 70}")


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
    args = parser.parse_args()
    pull(args.slug, days=args.days)
    return 0


if __name__ == "__main__":
    sys.exit(main())
