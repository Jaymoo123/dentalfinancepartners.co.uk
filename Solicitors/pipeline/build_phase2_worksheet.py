"""
Build the Phase 2 GSC-driven meta-rewrite worksheet for Solicitors.

Fetches 90-day GSC data for accountsforlawyers.co.uk, joins it with the
local blog frontmatter (current metaTitle / metaDescription), and writes
phase2_worksheet.json for consumption by rewrite_meta_for_ctr.py.

Bucketing logic (mirrors Property + Dentists):
- A_RANKING_PAGE1: avg pos <= 10, at least 5 impressions, low CTR
- B_PAGE2_CLIMB: avg pos 11-20, at least 5 impressions, low CTR
- C_DEEP_RANKING: avg pos > 20, decent impressions (>= 10)
- D_DEEP_TOPIC_HAS_DEMAND: URL is not a blog post (home, /blog hub, etc.) but has impressions
- E_LOW_PRIORITY: low impressions, deep ranking — skip

Run:
    python Solicitors/pipeline/build_phase2_worksheet.py
"""
import json
import os
import re
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))

try:
    from dotenv import load_dotenv
    load_dotenv(dotenv_path=str(ROOT / '.env'))
except ImportError:
    pass

from agents.utils.gsc_client_oauth import GSCClient

SITE_URL = "sc-domain:accountsforlawyers.co.uk"
BASE_URL = "https://www.accountsforlawyers.co.uk"
BLOG_DIR = ROOT / 'Solicitors' / 'web' / 'content' / 'blog'
OUT_PATH = Path('C:/Users/user/AppData/Local/Temp/solicitors_analysis/phase2_worksheet.json')


def url_to_slug(url: str) -> str:
    """Extract the slug from a GSC URL, normalising www/non-www and category-prefixed paths."""
    # Strip both possible hosts
    for prefix in ("https://www.accountsforlawyers.co.uk", "https://accountsforlawyers.co.uk"):
        if url.startswith(prefix):
            url = url[len(prefix):]
            break
    # Strip /blog/ and any category segment to get the terminal slug
    url = url.lstrip('/')
    if url.startswith('blog/'):
        parts = url[len('blog/'):].split('/')
        # e.g. "partnership-llp-accounting/llp-vs-partnership-tax" → last segment is the slug
        return parts[-1].rstrip('/') if parts else ''
    return url.rstrip('/')


def load_frontmatter(slug: str) -> dict:
    """Read metaTitle and metaDescription from the blog .md file's YAML frontmatter."""
    fp = BLOG_DIR / f"{slug}.md"
    if not fp.exists():
        return {'has_md': False, 'current_meta_title': '', 'current_meta_description': ''}
    text = fp.read_text(encoding='utf-8')
    # Extract YAML frontmatter (between first ---/--- block)
    m = re.match(r'^---\n(.*?)\n---', text, re.DOTALL)
    if not m:
        return {'has_md': True, 'current_meta_title': '', 'current_meta_description': ''}
    fm = m.group(1)
    title_m = re.search(r'^metaTitle:\s*"?(.+?)"?\s*$', fm, re.MULTILINE)
    desc_m = re.search(r'^metaDescription:\s*"?(.+?)"?\s*$', fm, re.MULTILINE)
    return {
        'has_md': True,
        'current_meta_title': title_m.group(1).strip().rstrip('"') if title_m else '',
        'current_meta_description': desc_m.group(1).strip().rstrip('"') if desc_m else '',
    }


def categorise(avg_pos: float, impr: int, ctr_pct: float, has_md: bool) -> str:
    if not has_md:
        return 'D_DEEP_TOPIC_HAS_DEMAND' if impr >= 5 else 'E_LOW_PRIORITY'
    if avg_pos <= 10 and impr >= 5 and ctr_pct < 5:
        return 'A_RANKING_PAGE1'
    if avg_pos <= 20 and impr >= 5 and ctr_pct < 3:
        return 'B_PAGE2_CLIMB'
    if avg_pos > 20 and impr >= 10:
        return 'C_DEEP_RANKING'
    return 'E_LOW_PRIORITY'


def main():
    print(f'Fetching 90d GSC data for {SITE_URL}...')
    client = GSCClient()

    # Per-URL aggregate metrics
    url_metrics = client.get_search_analytics(
        site_url=SITE_URL,
        days=90,
        dimensions=['page'],
        row_limit=500,
    )
    print(f'  {len(url_metrics)} URLs ranking')

    # Per (URL, query) for top-query extraction
    url_query_rows = client.get_search_analytics(
        site_url=SITE_URL,
        days=90,
        dimensions=['page', 'query'],
        row_limit=5000,
    )
    print(f'  {len(url_query_rows)} (URL, query) rows')

    # Group queries by URL, sorted by impressions desc
    url_queries: dict[str, list] = defaultdict(list)
    for row in url_query_rows:
        url = row.get('page', '')
        q = row.get('query', '')
        impr = row.get('impressions', 0)
        if not q:
            continue
        url_queries[url].append((q, impr))

    for url in url_queries:
        url_queries[url].sort(key=lambda x: -x[1])

    # Build worksheet
    rows = []
    for u in url_metrics:
        url = u.get('page', '')
        if not url:
            continue
        # Normalise www vs non-www to www
        norm_url = url.replace('https://accountsforlawyers.co.uk', 'https://www.accountsforlawyers.co.uk')
        slug = url_to_slug(url)
        fm = load_frontmatter(slug)
        impr = u.get('impressions', 0)
        clicks = u.get('clicks', 0)
        avg_pos = u.get('position', 0)
        ctr_pct = (clicks / impr * 100) if impr else 0

        top_q = url_queries.get(url, [])[:3]
        while len(top_q) < 3:
            top_q.append(('', 0))

        bucket = categorise(avg_pos, impr, ctr_pct, fm['has_md'])

        rows.append({
            'gsc_url': norm_url,
            'slug': slug,
            'has_md': fm['has_md'],
            'current_meta_title': fm['current_meta_title'],
            'current_meta_description': fm['current_meta_description'],
            'impressions_90d': impr,
            'clicks_90d': clicks,
            'ctr_pct': round(ctr_pct, 2),
            'avg_position': round(avg_pos, 1),
            'top_query_1': top_q[0][0],
            'top_query_1_impr': top_q[0][1],
            'top_query_2': top_q[1][0],
            'top_query_2_impr': top_q[1][1],
            'top_query_3': top_q[2][0],
            'top_query_3_impr': top_q[2][1],
            'category_bucket': bucket,
        })

    rows.sort(key=lambda r: -r['impressions_90d'])

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(rows, indent=2), encoding='utf-8')
    print(f'\nWrote {len(rows)} rows to {OUT_PATH}')

    bucket_counts: dict[str, int] = defaultdict(int)
    for r in rows:
        bucket_counts[r['category_bucket']] += 1
    print('\nBucket distribution:')
    for b in sorted(bucket_counts):
        print(f'  {b}: {bucket_counts[b]}')

    # Print actionable rows
    actionable = [r for r in rows if r['category_bucket'] in ('A_RANKING_PAGE1', 'B_PAGE2_CLIMB') and r['has_md']]
    print(f'\nMeta-rewrite candidates: {len(actionable)}')
    for r in actionable[:15]:
        print(f'  [{r["category_bucket"]}] {r["impressions_90d"]:4d} impr / {r["clicks_90d"]:2d} clicks / pos {r["avg_position"]:5.1f}  -- {r["slug"]}')


if __name__ == '__main__':
    main()
