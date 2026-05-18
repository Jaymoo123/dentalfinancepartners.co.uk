"""
Seed blog_optimizations baseline rows for Solicitors.

For the measurement script (measure_optimization_impact.py) to pick up
post-optimisation tracking, each optimised page needs a baseline row in
blog_optimizations with status='measuring' and implemented_at set.

This script inserts baseline rows for two cohorts:

A) META REWRITES: pages where we changed metaTitle / metaDescription in
   the meta-rewrite session. The pre-rewrite GSC data (from the worksheet)
   is the baseline. We expect impressions to stay similar but CTR to lift.

B) NEW PAGES: pages launched this session (services, calculators, pillar
   guides, audience pages, plus the 14 Opus-written demand-validated blog
   posts). Baseline is zero (page didn't exist 90 days ago). We expect
   impressions and clicks to grow from zero.

Run:
    python Solicitors/pipeline/seed_baseline_optimizations.py --dry-run
    python Solicitors/pipeline/seed_baseline_optimizations.py
"""
import argparse
import hashlib
import json
import os
import sys
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

import httpx

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))

try:
    from dotenv import load_dotenv
    load_dotenv(dotenv_path=str(ROOT / '.env'))
except ImportError:
    pass

NICHE = 'solicitors'
SITE_URL_PREFIX = 'https://www.accountsforlawyers.co.uk'
WORKSHEET = Path('C:/Users/user/AppData/Local/Temp/solicitors_analysis/phase2_worksheet.json')

SUPABASE_URL = os.getenv('SUPABASE_URL', '').rstrip('/')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY') or os.getenv('SUPABASE_KEY')
HEADERS = {
    'apikey': SUPABASE_KEY,
    'Authorization': f'Bearer {SUPABASE_KEY}',
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal',
}

# Pages launched this session that need 'new content' baseline tracking
NEW_PAGES = [
    # Services hub + sub-pages
    ('/services', 'services-hub'),
    ('/services/solicitor-accountants', 'services-solicitor-accountants'),
    ('/services/sra-accounts-rules', 'services-sra-accounts-rules'),
    ('/services/llp-accounts', 'services-llp-accounts'),
    ('/services/practice-valuation', 'services-practice-valuation'),
    ('/services/cofa-compliance-support', 'services-cofa-compliance-support'),
    # Audience pages
    ('/for-partners', 'for-partners'),
    ('/for-junior-solicitors', 'for-junior-solicitors'),
    ('/for-firm-buyers', 'for-firm-buyers'),
    ('/for-locum-solicitors', 'for-locum-solicitors'),
    # Pillar guides
    ('/solicitor-guides', 'solicitor-guides-hub'),
    ('/solicitor-guides/sra-accounts-rules-essentials', 'pillar-sra-accounts-rules'),
    ('/solicitor-guides/partnership-vs-llp-for-solicitors', 'pillar-partnership-vs-llp'),
    ('/solicitor-guides/post-merger-integration', 'pillar-post-merger'),
    ('/solicitor-guides/professional-indemnity-tax-treatment', 'pillar-pii'),
    ('/solicitor-guides/cofa-fundamentals', 'pillar-cofa'),
    ('/solicitor-guides/fee-share-vs-equity-partner', 'pillar-fee-share-equity'),
    # Health check + calculators
    ('/free-firm-health-check', 'free-firm-health-check'),
    ('/calculators', 'calculators-hub'),
    ('/calculators/law-firm-valuation', 'calc-law-firm-valuation'),
    ('/calculators/fa-2014-salaried-member', 'calc-fa-2014'),
    ('/calculators/llp-profit-share-allocation', 'calc-llp-profit-share'),
    ('/calculators/partnership-vs-llp-take-home', 'calc-partnership-llp-take-home'),
    ('/calculators/sra-client-account-reserve', 'calc-sra-reserve'),
    ('/calculators/indemnity-premium-estimator', 'calc-indemnity'),
    # Reference + decision pages
    ('/uk-solicitor-tax-rates', 'uk-solicitor-tax-rates'),
    ('/specialist-vs-generalist-accountant', 'specialist-vs-generalist'),
    # The 14 Opus-written demand-validated blog posts
    ('/blog/how-much-does-it-cost-to-buy-a-uk-law-firm', 'opus-cost-buy-law-firm'),
    ('/blog/how-much-does-it-cost-to-start-a-law-firm-uk', 'opus-cost-start-law-firm'),
    ('/blog/how-much-do-trainee-solicitors-earn-uk-2025-26', 'opus-trainee-salary'),
    ('/blog/how-much-do-uk-solicitors-charge-per-hour', 'opus-hourly-rates'),
    ('/blog/difference-between-llp-and-partnership-uk-solicitors', 'opus-llp-vs-partnership'),
    ('/blog/can-a-non-lawyer-buy-a-uk-law-firm-abs-explained', 'opus-abs-non-lawyer'),
    ('/blog/how-much-does-it-cost-to-buy-into-uk-law-firm-partnership', 'opus-buy-in-partnership'),
    ('/blog/do-uk-solicitors-charge-vat', 'opus-do-solicitors-charge-vat'),
    ('/blog/newly-qualified-solicitor-salary-uk-2025-26', 'opus-nq-salary'),
    ('/blog/how-much-do-uk-conveyancing-solicitors-charge', 'opus-conveyancing-charges'),
    ('/blog/law-firm-ebitda-multiples-uk-2025-26', 'opus-ebitda-multiples'),
    ('/blog/is-it-hard-to-make-partner-at-a-uk-law-firm', 'opus-making-partner'),
    ('/blog/llp-tax-return-deadline-uk-2025-26', 'opus-llp-deadline'),
    ('/blog/uk-llp-tax-non-resident-members', 'opus-llp-non-resident'),
]


def compute_data_hash(*args) -> str:
    """Stable hash for duplicate detection across runs."""
    return hashlib.sha256('|'.join(str(a) for a in args).encode()).hexdigest()[:32]


def load_worksheet() -> list[dict]:
    if not WORKSHEET.exists():
        print(f'Worksheet not found at {WORKSHEET}. Run build_phase2_worksheet.py first.')
        return []
    return json.loads(WORKSHEET.read_text(encoding='utf-8'))


def existing_optimizations(slugs: set[str]) -> set[str]:
    """Pull existing solicitors blog_optimizations rows to avoid duplicates."""
    if not slugs:
        return set()
    r = httpx.get(
        f'{SUPABASE_URL}/rest/v1/blog_optimizations',
        headers={k: v for k, v in HEADERS.items() if k != 'Prefer'},
        params={
            'niche': f'eq.{NICHE}',
            'select': 'existing_slug',
            'limit': '500',
        },
        timeout=30,
    )
    r.raise_for_status()
    return {row['existing_slug'] for row in r.json() if row.get('existing_slug')}


def build_meta_rewrite_rows(worksheet: list[dict], today: date) -> list[dict]:
    """For pages categorised A_RANKING_PAGE1 or B_PAGE2_CLIMB where we rewrote
    meta this session, create a baseline row using the pre-rewrite GSC numbers."""
    targets = []
    end_date = today
    start_date = end_date - timedelta(days=90)
    for r in worksheet:
        if r.get('category_bucket') not in ('A_RANKING_PAGE1', 'B_PAGE2_CLIMB'):
            continue
        if not r.get('has_md'):
            continue
        slug = r.get('slug') or ''
        if not slug:
            continue
        targets.append({
            'niche': NICHE,
            'existing_slug': slug,
            'gsc_page_url': r['gsc_url'],
            'gsc_data_start_date': start_date.isoformat(),
            'gsc_data_end_date': end_date.isoformat(),
            'gsc_impressions': r['impressions_90d'],
            'gsc_clicks': r['clicks_90d'],
            'gsc_position': r['avg_position'],
            'gsc_ctr': r['ctr_pct'] / 100,
            'analysis_date': today.isoformat(),
            'data_hash': compute_data_hash(NICHE, slug, r['impressions_90d'], r['avg_position'], 'meta-rewrite'),
            'opportunity_type': 'section_expansion',
            'priority': 80 if r['category_bucket'] == 'A_RANKING_PAGE1' else 60,
            'recommended_action': 'Meta title + description rewritten to mirror top GSC query and lift CTR.',
            'target_keywords': [r['top_query_1'], r['top_query_2'], r['top_query_3']],
            'deepseek_reasoning': f'GSC bucket {r["category_bucket"]}: page ranking at avg position {r["avg_position"]} with low/zero CTR. Pre-rewrite impressions {r["impressions_90d"]}, clicks {r["clicks_90d"]}.',
            'status': 'measuring',
            'approved_at': datetime.now(timezone.utc).isoformat(),
            'implemented_at': datetime.now(timezone.utc).isoformat(),
            'implementation_notes': 'Meta rewrite via rewrite_meta_for_ctr.py session 2026-05-18/19.',
            # Baseline = pre-rewrite GSC numbers
            'baseline_impressions': r['impressions_90d'],
            'baseline_clicks': r['clicks_90d'],
            'baseline_position': r['avg_position'],
            'baseline_ctr': r['ctr_pct'] / 100,
            'baseline_period_start': start_date.isoformat(),
            'baseline_period_end': end_date.isoformat(),
        })
    return targets


def build_new_page_rows(today: date) -> list[dict]:
    """For pages launched this session, create a baseline row with impressions=0."""
    rows = []
    for path, key in NEW_PAGES:
        slug = path.lstrip('/').replace('/', '__')
        rows.append({
            'niche': NICHE,
            'existing_slug': slug,
            'gsc_page_url': f'{SITE_URL_PREFIX}{path}',
            'gsc_data_start_date': (today - timedelta(days=90)).isoformat(),
            'gsc_data_end_date': today.isoformat(),
            'gsc_impressions': 0,
            'gsc_clicks': 0,
            'gsc_position': 0,
            'gsc_ctr': 0,
            'analysis_date': today.isoformat(),
            'data_hash': compute_data_hash(NICHE, slug, 'new-page', key),
            'opportunity_type': 'new_content',
            'priority': 70,
            'recommended_action': f'New page launched this session: {path}',
            'target_keywords': [],
            'deepseek_reasoning': 'Page launched 2026-05-18/19 — no prior GSC data. Baseline = 0.',
            'status': 'measuring',
            'approved_at': datetime.now(timezone.utc).isoformat(),
            'implemented_at': datetime.now(timezone.utc).isoformat(),
            'implementation_notes': f'New page launched as part of Solicitors lift session, key={key}.',
            'baseline_impressions': 0,
            'baseline_clicks': 0,
            'baseline_position': None,
            'baseline_ctr': 0,
            'baseline_period_start': (today - timedelta(days=90)).isoformat(),
            'baseline_period_end': today.isoformat(),
        })
    return rows


def insert_rows(rows: list[dict]) -> int:
    if not rows:
        return 0
    inserted = 0
    # POST in batches of 50 to keep payloads modest
    for i in range(0, len(rows), 50):
        batch = rows[i:i + 50]
        r = httpx.post(
            f'{SUPABASE_URL}/rest/v1/blog_optimizations',
            headers=HEADERS,
            json=batch,
            timeout=60,
        )
        if r.status_code not in (200, 201, 204):
            print(f'  Batch {i // 50}: HTTP {r.status_code} — {r.text[:400]}')
            continue
        inserted += len(batch)
        print(f'  Batch {i // 50}: inserted {len(batch)} rows')
    return inserted


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--dry-run', action='store_true')
    args = parser.parse_args()

    if not SUPABASE_URL or not SUPABASE_KEY:
        print('SUPABASE_URL and SUPABASE_KEY (or SUPABASE_SERVICE_ROLE_KEY) must be set.')
        return 1

    today = date.today()
    worksheet = load_worksheet()
    print(f'Loaded {len(worksheet)} worksheet rows')

    meta_rows = build_meta_rewrite_rows(worksheet, today)
    new_page_rows = build_new_page_rows(today)
    print(f'Meta-rewrite baseline rows to insert: {len(meta_rows)}')
    print(f'New-page baseline rows to insert: {len(new_page_rows)}')

    all_rows = meta_rows + new_page_rows
    all_slugs = {r['existing_slug'] for r in all_rows}
    existing = existing_optimizations(all_slugs)
    if existing:
        print(f'Filtering {len(existing)} slugs that already have rows: {sorted(existing)[:5]}...')
        all_rows = [r for r in all_rows if r['existing_slug'] not in existing]
        print(f'After de-dup: {len(all_rows)} rows to insert')

    if args.dry_run:
        print('\nDRY RUN — sample row:')
        if all_rows:
            print(json.dumps(all_rows[0], indent=2, default=str))
        return 0

    if not all_rows:
        print('Nothing to insert.')
        return 0

    print(f'\nInserting {len(all_rows)} rows...')
    inserted = insert_rows(all_rows)
    print(f'\nTotal inserted: {inserted} / {len(all_rows)}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
