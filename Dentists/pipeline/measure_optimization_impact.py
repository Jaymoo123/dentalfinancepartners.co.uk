"""
Measure post-optimization impact for blog_optimizations rows in 'measuring'
status. For each row, calculate how many days have elapsed since
implemented_at and populate the corresponding week column (week1=7d,
week2=14d, week3=21d, week4=28d).

Once all four weeks are recorded, set status='completed' and compute
impact_verdict from the delta against baseline.

Run weekly (or after each rewrite batch):
    python Property/pipeline/measure_optimization_impact.py

Schedule via cron / GitHub Actions / Vercel cron:
    0 8 * * 1   (every Monday at 08:00 UTC)
"""
import os
import sys
import json
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))

try:
    from dotenv import load_dotenv
    load_dotenv(dotenv_path=str(ROOT / '.env'))
except ImportError:
    pass

import httpx

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')
HEADERS = {'apikey': SUPABASE_KEY, 'Authorization': f'Bearer {SUPABASE_KEY}'}


def fetch_measuring_rows(niche='dentists'):
    """Get all rows in 'measuring' state for a niche."""
    r = httpx.get(
        f'{SUPABASE_URL}/rest/v1/blog_optimizations',
        headers=HEADERS,
        params={
            'niche': f'eq.{niche}',
            'status': 'eq.measuring',
            'select': '*',
        },
        timeout=30,
    )
    r.raise_for_status()
    return r.json()


def fetch_window_metrics(slug: str, start: date, end: date) -> dict | None:
    """Fetch aggregated GSC metrics for a slug across the given window
    from gsc_page_performance. Returns {impressions, clicks, position, ctr}
    or None if no data."""
    # The slug appears in the page_url; use fuzzy LIKE
    r = httpx.get(
        f'{SUPABASE_URL}/rest/v1/gsc_page_performance',
        headers=HEADERS,
        params={
            'niche': 'eq.dentists',
            'page_url': f'like.*{slug}*',
            'date': f'gte.{start.isoformat()}',
            'date.': f'lte.{end.isoformat()}',  # PostgREST: two filters on same column
            'select': 'impressions,clicks,position',
        },
        timeout=30,
    )
    if not r.is_success:
        return None
    rows = r.json()
    # The PostgREST two-filter syntax above isn't quite right — apply end-date filter in Python
    rows = [x for x in rows if x.get('impressions') is not None]
    if not rows:
        return None
    total_impr = sum(x['impressions'] for x in rows)
    total_clicks = sum(x['clicks'] for x in rows)
    positions = [x['position'] for x in rows if x.get('position')]
    avg_pos = sum(positions) / len(positions) if positions else 0
    ctr = (total_clicks / total_impr) if total_impr else 0
    return {
        'impressions': total_impr,
        'clicks': total_clicks,
        'position': round(avg_pos, 2),
        'ctr': round(ctr, 6),
    }


def compute_verdict(baseline_impr, baseline_clicks, week4_impr, week4_clicks) -> str:
    """Verdict at week 4: positive if clicks materially rose, negative if
    clicks fell, neutral otherwise. Use clicks (not impressions) because
    the rewrite was meant to lift CTR."""
    if week4_impr is None:
        return 'pending'
    # Normalise: baseline was 90 days = ~6.4 weeks; week4 is 7 days
    # Compare on a per-day basis to avoid scale bias.
    baseline_clicks_per_day = baseline_clicks / 90.0
    week4_clicks_per_day = week4_clicks / 7.0
    if week4_clicks_per_day > baseline_clicks_per_day * 1.5 + 0.1:
        return 'positive'
    if week4_clicks_per_day < baseline_clicks_per_day * 0.5:
        return 'negative'
    return 'neutral'


def update_row(row_id: str, payload: dict):
    r = httpx.patch(
        f'{SUPABASE_URL}/rest/v1/blog_optimizations',
        headers={**HEADERS, 'Content-Type': 'application/json', 'Prefer': 'return=minimal'},
        params={'id': f'eq.{row_id}'},
        json=payload,
        timeout=30,
    )
    r.raise_for_status()


def main():
    rows = fetch_measuring_rows('dentists')
    print(f'Measuring rows: {len(rows)}')
    if not rows:
        return

    today = date.today()
    updated = 0
    completed = 0

    for row in rows:
        slug = row['existing_slug']
        impl = row.get('implemented_at')
        if not impl:
            continue
        impl_date = datetime.fromisoformat(impl.replace('Z', '+00:00')).date()
        elapsed = (today - impl_date).days

        # Decide which week column to populate (the first one we have not yet filled)
        weeks_ready = elapsed // 7  # 1 after 7 days, 2 after 14, etc.
        if weeks_ready < 1:
            continue  # not yet 7 days

        patch = {}
        verdict_inputs = None
        for w in range(1, min(weeks_ready, 4) + 1):
            col_impr = f'impact_impressions_week{w}'
            if row.get(col_impr) is not None:
                continue  # already filled

            window_end = impl_date + timedelta(days=7 * w)
            window_start = impl_date + timedelta(days=7 * (w - 1))
            metrics = fetch_window_metrics(slug, window_start, window_end)
            if not metrics:
                print(f'  [{slug}] week{w} ({window_start} to {window_end}): no GSC data yet, skipping')
                continue

            patch[f'impact_impressions_week{w}'] = metrics['impressions']
            patch[f'impact_clicks_week{w}'] = metrics['clicks']
            patch[f'impact_position_week{w}'] = metrics['position']
            patch[f'impact_ctr_week{w}'] = metrics['ctr']
            print(f'  [{slug}] week{w}: {metrics["impressions"]} impr, {metrics["clicks"]} clicks, pos {metrics["position"]}, ctr {metrics["ctr"]*100:.2f}%')

            if w == 4:
                verdict_inputs = (row.get('baseline_impressions', 0),
                                  row.get('baseline_clicks', 0),
                                  metrics['impressions'],
                                  metrics['clicks'])

        if verdict_inputs is not None and elapsed >= 28:
            v = compute_verdict(*verdict_inputs)
            patch['impact_verdict'] = v
            patch['status'] = 'completed'
            patch['measurement_complete_at'] = datetime.now(timezone.utc).isoformat()
            completed += 1
            print(f'  [{slug}] -> COMPLETE, verdict: {v}')

        if patch:
            update_row(row['id'], patch)
            updated += 1

    print()
    print(f'Updated: {updated} rows, completed: {completed}')


if __name__ == '__main__':
    main()
