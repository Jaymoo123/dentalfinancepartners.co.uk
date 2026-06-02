"""
Backfill site_daily_snapshots with historical data.

Loops over every day for which we have GSC data and runs the parameterised
overview query for that date. Safe to re-run — ON CONFLICT DO UPDATE.

Usage:
    python -m optimisation_engine.snapshot.backfill --site property
    python -m optimisation_engine.snapshot.backfill --site property --from 2026-04-28
"""
from __future__ import annotations

import argparse
import sys
from datetime import date, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.snapshot.collector import _sql, _snapshot_date


def _overview_for_date(site_key: str, as_of: date) -> dict:
    """Run the overview query as if today were `as_of`."""
    window_start = as_of - timedelta(days=7)

    rows = _sql(f"""
        WITH dark_pages AS (
            SELECT COUNT(*) AS n
            FROM blog_topics bt
            WHERE bt.site_key = '{site_key}'
              AND bt.used_at IS NOT NULL
              AND bt.used_at <= '{as_of}'
              AND NOT EXISTS (
                  SELECT 1 FROM gsc_query_data g
                  WHERE g.site_key = '{site_key}'
                    AND g.date >= '{as_of}'::DATE - 90
                    AND g.date <= '{as_of}'
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
              AND date >= '{window_start}'
              AND date < '{as_of}'
        ),
        ga4_7d AS (
            SELECT
                COALESCE(SUM(sessions), 0)         AS sessions,
                COALESCE(SUM(engaged_sessions), 0) AS engaged_sessions,
                CASE WHEN SUM(sessions) > 0
                    THEN SUM(engaged_sessions)::FLOAT / SUM(sessions) ELSE 0 END AS engagement_rate
            FROM ga4_page_data
            WHERE site_key = '{site_key}'
              AND date >= '{window_start}'
              AND date < '{as_of}'
        ),
        leads_7d AS (
            SELECT COUNT(*) AS leads
            FROM leads
            WHERE source = '{site_key}'
              AND created_at >= '{window_start}'
              AND created_at < '{as_of}'::DATE + 1
        ),
        posts_7d AS (
            SELECT COUNT(*) AS posts_published
            FROM blog_topics
            WHERE site_key = '{site_key}'
              AND used_at >= '{window_start}'
              AND used_at < '{as_of}'
        ),
        changes_7d AS (
            SELECT COUNT(*) AS changes_shipped
            FROM optimisation_changes
            WHERE site_key = '{site_key}'
              AND shipped_at >= '{window_start}'
              AND shipped_at < '{as_of}'::DATE + 1
        ),
        cost_7d AS (
            SELECT COALESCE(SUM(cost_usd), 0) AS api_cost_usd
            FROM api_cost_log
            WHERE (site_key = '{site_key}' OR niche = '{site_key}')
              AND date_called >= '{window_start}'
              AND date_called < '{as_of}'::DATE + 1
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
    row["snapshot_date"] = as_of.isoformat()
    row["site_key"] = site_key
    return row


def _upsert_row(row: dict) -> None:
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


def run_backfill(site_key: str, from_date: date | None = None) -> None:
    """Backfill daily snapshots from `from_date` to yesterday."""
    # Find earliest date we have 7 days of GSC data for
    if from_date is None:
        r = _sql(f"SELECT MIN(date) AS earliest FROM gsc_query_data WHERE site_key = '{site_key}'")
        earliest_gsc = date.fromisoformat(r[0]["earliest"]) if r and r[0]["earliest"] else date.today()
        from_date = earliest_gsc + timedelta(days=7)

    today = date.today()
    current = from_date

    print(f"Backfilling {site_key} from {from_date} to {today} ({(today - from_date).days + 1} days)...")

    while current <= today:
        row = _overview_for_date(site_key, current)
        _upsert_row(row)
        imp = row.get("impressions", 0)
        pages = row.get("gsc_pages", 0)
        print(f"  {current}  pages={pages}  impressions={imp}  dark={row.get('dark_pages', '?')}")
        current += timedelta(days=1)

    print(f"Done. {(today - from_date).days + 1} rows written to site_daily_snapshots.")


def main() -> None:
    p = argparse.ArgumentParser(description="Backfill site_daily_snapshots with historical data.")
    p.add_argument("--site", required=True)
    p.add_argument("--from", dest="from_date", default=None, help="Start date YYYY-MM-DD")
    args = p.parse_args()

    from_date = date.fromisoformat(args.from_date) if args.from_date else None
    run_backfill(args.site, from_date)


if __name__ == "__main__":
    main()
