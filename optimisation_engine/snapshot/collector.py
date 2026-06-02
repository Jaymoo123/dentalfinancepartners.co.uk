"""
Supabase data collector for the snapshot module.

All queries go through the Supabase Management API (raw SQL) so we can use
CTEs, impression-weighted averages, and WoW delta calculations without
PostgREST row-limit friction.

Key join note: gsc_query_data stores full URLs (page_url), while
ga4_page_data stores normalised paths only (page_path). All joins strip
the domain from GSC URLs via regexp_replace.
"""
from __future__ import annotations

import os
from datetime import date, timedelta
from pathlib import Path
from typing import Any

import httpx

ROOT = Path(__file__).resolve().parents[2]

try:
    from dotenv import load_dotenv
    load_dotenv(ROOT / ".env")
except ImportError:
    pass

SUPABASE_ACCESS_TOKEN: str = os.getenv("SUPABASE_ACCESS_TOKEN", "")
PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"
MGMT_URL = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"


def _sql(query: str) -> list[dict]:
    """Execute raw SQL via Supabase Management API."""
    r = httpx.post(
        MGMT_URL,
        headers={
            "Authorization": f"Bearer {SUPABASE_ACCESS_TOKEN}",
            "Content-Type": "application/json",
        },
        json={"query": query},
        timeout=60.0,
    )
    r.raise_for_status()
    return r.json()


def _snapshot_date() -> date:
    """Today's date — each daily run stamps its own row."""
    return date.today()


def collect_overview(site_key: str) -> dict[str, Any]:
    """Tab 1: rolling 7-day metrics as of today. Runs daily."""
    today = _snapshot_date()

    rows = _sql(f"""
        WITH dark_pages AS (
            SELECT COUNT(*) AS n
            FROM blog_topics bt
            WHERE bt.site_key = '{site_key}'
              AND bt.used_at IS NOT NULL
              AND NOT EXISTS (
                  SELECT 1 FROM gsc_query_data g
                  WHERE g.site_key = '{site_key}'
                    AND g.date >= CURRENT_DATE - 90
                    AND g.page_url ILIKE '%/' || bt.slug
              )
        ),
        gsc_7d AS (
            SELECT
                COUNT(DISTINCT page_url)                                           AS gsc_pages,
                COALESCE(SUM(impressions), 0)                                      AS impressions,
                COALESCE(SUM(clicks), 0)                                           AS clicks,
                CASE WHEN SUM(impressions) > 0
                    THEN SUM(clicks)::FLOAT / SUM(impressions) ELSE 0 END          AS ctr,
                CASE WHEN SUM(impressions) > 0
                    THEN SUM(position * impressions) / SUM(impressions) ELSE 0 END AS avg_position
            FROM gsc_page_performance
            WHERE niche = '{site_key}'
              AND date >= CURRENT_DATE - 7
              AND date < CURRENT_DATE
        ),
        ga4_7d AS (
            SELECT
                COALESCE(SUM(sessions), 0)         AS sessions,
                COALESCE(SUM(engaged_sessions), 0) AS engaged_sessions,
                CASE WHEN SUM(sessions) > 0
                    THEN SUM(engaged_sessions)::FLOAT / SUM(sessions) ELSE 0 END AS engagement_rate
            FROM ga4_page_data
            WHERE site_key = '{site_key}'
              AND date >= CURRENT_DATE - 7
              AND date < CURRENT_DATE
        ),
        leads_7d AS (
            SELECT COUNT(*) AS leads
            FROM leads
            WHERE source = '{site_key}'
              AND created_at >= CURRENT_DATE - 7
        ),
        posts_7d AS (
            SELECT COUNT(*) AS posts_published
            FROM blog_topics
            WHERE site_key = '{site_key}'
              AND used_at >= CURRENT_DATE - 7
              AND used_at < CURRENT_DATE
        ),
        changes_7d AS (
            SELECT COUNT(*) AS changes_shipped
            FROM optimisation_changes
            WHERE site_key = '{site_key}'
              AND shipped_at >= CURRENT_DATE - 7
        ),
        cost_7d AS (
            SELECT COALESCE(SUM(cost_usd), 0) AS api_cost_usd
            FROM api_cost_log
            WHERE (site_key = '{site_key}' OR niche = '{site_key}')
              AND date_called >= CURRENT_DATE - 7
              AND status = 'success'
        )
        SELECT
            g.gsc_pages, g.impressions, g.clicks,
            ROUND(g.ctr::NUMERIC, 4)             AS ctr,
            ROUND(g.avg_position::NUMERIC, 2)    AS avg_position,
            a.sessions, a.engaged_sessions,
            ROUND(a.engagement_rate::NUMERIC, 4) AS engagement_rate,
            l.leads, p.posts_published, c.changes_shipped,
            ROUND(co.api_cost_usd::NUMERIC, 4)   AS api_cost_usd,
            dp.n                                  AS dark_pages
        FROM gsc_7d g, ga4_7d a, leads_7d l, posts_7d p, changes_7d c, cost_7d co, dark_pages dp
    """)

    row = rows[0] if rows else {}
    row["snapshot_date"] = today.isoformat()
    row["site_key"] = site_key
    return row


def collect_pages(site_key: str) -> list[dict]:
    """Tab 2: per-URL metrics for past 28 days with WoW deltas."""
    rows = _sql(f"""
        WITH gsc_28d AS (
            SELECT
                page_url,
                COALESCE(SUM(clicks), 0)        AS clicks,
                COALESCE(SUM(impressions), 0)   AS impressions,
                CASE WHEN SUM(impressions) > 0
                    THEN SUM(clicks)::FLOAT / SUM(impressions) ELSE 0 END AS ctr,
                CASE WHEN SUM(impressions) > 0
                    THEN SUM(position * impressions) / SUM(impressions) ELSE 0 END AS avg_position
            FROM gsc_page_performance
            WHERE niche = '{site_key}'
              AND date >= CURRENT_DATE - 28
              AND date < CURRENT_DATE
            GROUP BY page_url
        ),
        gsc_prior AS (
            SELECT
                page_url,
                COALESCE(SUM(impressions), 0) AS impressions_prior,
                CASE WHEN SUM(impressions) > 0
                    THEN SUM(position * impressions) / SUM(impressions) ELSE NULL END AS position_prior
            FROM gsc_page_performance
            WHERE niche = '{site_key}'
              AND date >= CURRENT_DATE - 56
              AND date < CURRENT_DATE - 28
            GROUP BY page_url
        ),
        ga4_28d AS (
            SELECT
                page_path,
                COALESCE(SUM(sessions), 0) AS sessions,
                CASE WHEN SUM(sessions) > 0
                    THEN SUM(engaged_sessions)::FLOAT / SUM(sessions) ELSE 0 END AS engagement_rate
            FROM ga4_page_data
            WHERE site_key = '{site_key}'
              AND date >= CURRENT_DATE - 28
              AND date < CURRENT_DATE
            GROUP BY page_path
        ),
        changes_last AS (
            SELECT DISTINCT ON (target_url)
                target_url,
                shipped_at AS last_changed
            FROM optimisation_changes
            WHERE site_key = '{site_key}'
            ORDER BY target_url, shipped_at DESC
        ),
        inspection AS (
            SELECT page_url, index_status, checked_at
            FROM gsc_url_inspection
            WHERE site_key = '{site_key}'
        )
        SELECT
            g.page_url,
            g.clicks,
            g.impressions,
            ROUND(g.ctr::NUMERIC, 4)                    AS ctr,
            ROUND(g.avg_position::NUMERIC, 2)           AS avg_position,
            ROUND((g.avg_position - p.position_prior)::NUMERIC, 2) AS pos_delta,
            CASE WHEN p.impressions_prior > 0
                THEN ROUND(((g.impressions - p.impressions_prior)::FLOAT / p.impressions_prior * 100)::NUMERIC, 1)
                ELSE NULL END                            AS imp_delta_pct,
            a.sessions,
            ROUND(a.engagement_rate::NUMERIC, 4)        AS engagement_rate,
            c.last_changed,
            i.index_status
        FROM gsc_28d g
        LEFT JOIN gsc_prior p ON p.page_url = g.page_url
        LEFT JOIN ga4_28d a
            ON a.page_path = regexp_replace(g.page_url, '^https?://[^/]+', '')
        LEFT JOIN changes_last c ON c.target_url = g.page_url
        LEFT JOIN inspection i ON i.page_url = g.page_url
        ORDER BY g.impressions DESC
        LIMIT 500
    """)
    return rows


def collect_queries(site_key: str) -> list[dict]:
    """Tab 3: top 200 queries by impressions (28d)."""
    rows = _sql(f"""
        WITH q_28d AS (
            SELECT
                query,
                SUM(clicks)       AS clicks,
                SUM(impressions)  AS impressions,
                CASE WHEN SUM(impressions) > 0
                    THEN SUM(clicks)::FLOAT / SUM(impressions) ELSE 0 END AS ctr,
                CASE WHEN SUM(impressions) > 0
                    THEN SUM(position * impressions) / SUM(impressions) ELSE 0 END AS avg_position
            FROM gsc_query_data
            WHERE site_key = '{site_key}'
              AND date >= CURRENT_DATE - 28
              AND date < CURRENT_DATE
            GROUP BY query
        ),
        primary_page AS (
            SELECT DISTINCT ON (query)
                query,
                page_url AS primary_page
            FROM gsc_query_data
            WHERE site_key = '{site_key}'
              AND date >= CURRENT_DATE - 28
              AND date < CURRENT_DATE
            GROUP BY query, page_url
            ORDER BY query, SUM(impressions) DESC
        )
        SELECT
            q.query,
            q.clicks,
            q.impressions,
            ROUND(q.ctr::NUMERIC, 4)          AS ctr,
            ROUND(q.avg_position::NUMERIC, 2) AS avg_position,
            pp.primary_page
        FROM q_28d q
        LEFT JOIN primary_page pp ON pp.query = q.query
        ORDER BY q.impressions DESC
        LIMIT 200
    """)
    return rows


def collect_leads(site_key: str) -> list[dict]:
    """Tab 4: weekly lead counts."""
    rows = _sql(f"""
        SELECT
            DATE_TRUNC('week', created_at)::DATE AS week_ending,
            COUNT(*) AS new_leads
        FROM leads
        WHERE source = '{site_key}'
        GROUP BY 1
        ORDER BY 1 DESC
        LIMIT 52
    """)
    # Add running total
    total = 0
    for row in reversed(rows):
        total += int(row.get("new_leads") or 0)
        row["running_total"] = total
    rows.reverse()
    return rows


def collect_changelog(site_key: str) -> list[dict]:
    """Tab 5: all shipped changes + published blog posts, most recent first."""
    rows = _sql(f"""
        SELECT
            shipped_at::DATE     AS date,
            'optimisation'       AS type,
            target_url           AS page,
            COALESCE(change_type, 'change') AS description,
            COALESCE(outcome_verdict, 'pending') AS outcome_30d
        FROM optimisation_changes
        WHERE site_key = '{site_key}'
          AND shipped_at IS NOT NULL

        UNION ALL

        SELECT
            used_at::DATE        AS date,
            'content_published'  AS type,
            COALESCE('/blog/' || slug, slug) AS page,
            topic                AS description,
            NULL                 AS outcome_30d
        FROM blog_topics
        WHERE site_key = '{site_key}'
          AND used_at IS NOT NULL

        ORDER BY date DESC
        LIMIT 200
    """)
    return rows


def collect_diagnostics_candidates(site_key: str) -> list[dict]:
    """Returns pages meeting underperformer criteria for Tab 6."""
    rows = _sql(f"""
        WITH gsc_28d AS (
            SELECT
                page_url,
                SUM(impressions)  AS impressions,
                SUM(clicks)       AS clicks,
                CASE WHEN SUM(impressions) > 0
                    THEN SUM(clicks)::FLOAT / SUM(impressions) ELSE 0 END AS ctr,
                CASE WHEN SUM(impressions) > 0
                    THEN SUM(position * impressions) / SUM(impressions) ELSE 0 END AS avg_position
            FROM gsc_page_performance
            WHERE niche = '{site_key}'
              AND date >= CURRENT_DATE - 28
              AND date < CURRENT_DATE
            GROUP BY page_url
        ),
        gsc_prior AS (
            SELECT
                page_url,
                SUM(impressions) AS impressions_prior,
                CASE WHEN SUM(impressions) > 0
                    THEN SUM(position * impressions) / SUM(impressions) ELSE NULL END AS position_prior
            FROM gsc_page_performance
            WHERE niche = '{site_key}'
              AND date >= CURRENT_DATE - 56
              AND date < CURRENT_DATE - 28
            GROUP BY page_url
        ),
        ga4_28d AS (
            SELECT
                page_path,
                SUM(sessions) AS sessions,
                CASE WHEN SUM(sessions) > 0
                    THEN SUM(engaged_sessions)::FLOAT / SUM(sessions) ELSE 0 END AS engagement_rate
            FROM ga4_page_data
            WHERE site_key = '{site_key}'
              AND date >= CURRENT_DATE - 28
              AND date < CURRENT_DATE
            GROUP BY page_path
        ),
        flagged AS (
            SELECT
                g.page_url,
                g.impressions,
                g.clicks,
                g.ctr,
                g.avg_position,
                g.avg_position - p.position_prior                          AS pos_delta,
                CASE WHEN p.impressions_prior > 0
                    THEN (g.impressions - p.impressions_prior)::FLOAT / p.impressions_prior
                    ELSE NULL END                                           AS imp_delta,
                a.sessions,
                a.engagement_rate,
                ARRAY_REMOVE(ARRAY[
                    CASE WHEN p.impressions_prior > 0
                         AND (g.impressions - p.impressions_prior)::FLOAT / p.impressions_prior < -0.20
                         THEN 'imp_drop_20pct' END,
                    CASE WHEN p.position_prior IS NOT NULL
                         AND g.avg_position - p.position_prior > 5
                         THEN 'position_drop_5' END,
                    CASE WHEN g.impressions > 200 AND g.ctr < 0.01
                         THEN 'high_imp_low_ctr' END,
                    CASE WHEN a.sessions > 50 AND a.engagement_rate < 0.30
                         THEN 'poor_engagement' END
                ], NULL)                                                    AS flag_reasons
            FROM gsc_28d g
            LEFT JOIN gsc_prior p ON p.page_url = g.page_url
            LEFT JOIN ga4_28d a
                ON a.page_path = regexp_replace(g.page_url, '^https?://[^/]+', '')
        )
        SELECT *
        FROM flagged
        WHERE cardinality(flag_reasons) > 0
        ORDER BY impressions DESC
    """)
    # Keep only actually flagged rows (array_length check above handles it,
    # but SQL NULL makes it tricky — filter here too)
    return [r for r in rows if r.get("flag_reasons")]


def collect_overview_history(site_key: str) -> list[dict]:
    """All historical rows from site_daily_snapshots, most recent first."""
    rows = _sql(f"""
        SELECT
            snapshot_date, gsc_pages, dark_pages, impressions, clicks,
            ctr, avg_position, sessions, engaged_sessions, engagement_rate,
            leads, posts_published, changes_shipped, api_cost_usd
        FROM site_daily_snapshots
        WHERE site_key = '{site_key}'
        ORDER BY snapshot_date DESC
    """)
    return rows


def upsert_weekly_snapshot(row: dict) -> None:
    """Persist the Overview row to site_weekly_snapshots for historical tracking."""
    def _q(v):
        if v is None:
            return "NULL"
        return f"'{v}'"

    _sql(f"""
        INSERT INTO site_daily_snapshots
            (site_key, snapshot_date, gsc_pages, impressions, clicks, ctr, avg_position,
             sessions, engaged_sessions, engagement_rate, leads, posts_published,
             changes_shipped, api_cost_usd, dark_pages)
        VALUES (
            {_q(row.get('site_key'))},
            {_q(row.get('snapshot_date'))},
            {_q(row.get('gsc_pages'))},
            {_q(row.get('impressions'))},
            {_q(row.get('clicks'))},
            {_q(row.get('ctr'))},
            {_q(row.get('avg_position'))},
            {_q(row.get('sessions'))},
            {_q(row.get('engaged_sessions'))},
            {_q(row.get('engagement_rate'))},
            {_q(row.get('leads'))},
            {_q(row.get('posts_published'))},
            {_q(row.get('changes_shipped'))},
            {_q(row.get('api_cost_usd'))},
            {_q(row.get('dark_pages'))}
        )
        ON CONFLICT (site_key, snapshot_date) DO UPDATE SET
            gsc_pages        = EXCLUDED.gsc_pages,
            impressions      = EXCLUDED.impressions,
            clicks           = EXCLUDED.clicks,
            ctr              = EXCLUDED.ctr,
            avg_position     = EXCLUDED.avg_position,
            sessions         = EXCLUDED.sessions,
            engaged_sessions = EXCLUDED.engaged_sessions,
            engagement_rate  = EXCLUDED.engagement_rate,
            leads            = EXCLUDED.leads,
            posts_published  = EXCLUDED.posts_published,
            changes_shipped  = EXCLUDED.changes_shipped,
            api_cost_usd     = EXCLUDED.api_cost_usd,
            dark_pages       = EXCLUDED.dark_pages
    """)
