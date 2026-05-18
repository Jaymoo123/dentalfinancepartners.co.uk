"""
Retroactive keyword intelligence pass for Solicitors.

Goal: identify which generated long-tail posts hit real search demand
and which are speculative. Output a CSV showing each new post mapped
against verified-demand signals.

Method:
1. Pull live GSC 90d queries (every query the site shows for)
2. Expand the legal-sector seed query universe via Google Autocomplete
3. Pull Serper UK SERP top-10 organic for each seed (optional, if API key)
4. Cross-reference against each post's primary keyword (from frontmatter)
5. Score each post: GSC-validated / autocomplete-validated / serper-validated / speculative

Output: Solicitors/seo-research/keyword-validation.csv

Run:
    python Solicitors/pipeline/keyword_intelligence.py
"""
import argparse
import csv
import json
import os
import re
import sys
import time
from pathlib import Path
from collections import defaultdict

import httpx

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))

try:
    from dotenv import load_dotenv
    load_dotenv(dotenv_path=str(ROOT / '.env'))
except ImportError:
    pass

from agents.utils.gsc_client_oauth import GSCClient

SITE_URL = "sc-domain:accountsforlawyers.co.uk"
BLOG_DIR = ROOT / 'Solicitors' / 'web' / 'content' / 'blog'
OUT_DIR = ROOT / 'Solicitors' / 'seo-research'
OUT_CSV = OUT_DIR / 'keyword-validation.csv'
SERPER_KEY = os.getenv('SERPER_API_KEY', '')

# Seed queries for Autocomplete + Serper expansion. Anchored on legal-sector
# accounting terms we believe should have search demand.
SEED_QUERIES = [
    "accountants for solicitors",
    "accountant for lawyers",
    "accountants for law firms",
    "sra accounts rules",
    "sra accountants report",
    "law firm accountant",
    "law firm valuation",
    "law firm valuation formula",
    "llp accounting",
    "llp tax uk",
    "llp vs partnership",
    "partnership vs llp solicitors",
    "salaried member rules",
    "fa 2014 salaried member",
    "salaried partner tax",
    "law firm valuation multiple",
    "selling a law firm",
    "buying a law firm",
    "law firm goodwill",
    "law firm partnership",
    "client account reconciliation",
    "client money solicitor",
    "cofa solicitor",
    "colp solicitor",
    "professional indemnity insurance solicitor",
    "pii law firm",
    "solicitor tax planning",
    "solicitor self assessment",
    "law firm wip valuation",
    "wip law firm tax",
    "law firm vat",
    "vat disbursements solicitor",
    "conveyancing accounts",
    "conveyancing firm finance",
    "law firm payroll",
    "trainee solicitor salary",
    "locum solicitor tax",
    "consultant solicitor structure",
    "solicitor mortgage self employed",
    "law firm merger tax",
    "post merger integration law firm",
    "law firm acquisition due diligence",
    "law firm ebitda",
    "law firm management accounts",
    "law firm sale tax",
    "badr law firm sale",
    "section 162 incorporation relief",
    "incorporating a law firm",
    "abs licence solicitor",
    "abs application",
    "mtd itsa solicitor",
    "solicitor pension contribution",
    "partner pension solicitor",
    "solicitor expenses claim",
    "salaried partner mortgage",
]

PREFIXES = ["", "how", "what", "when", "why", "can i", "how much", "how to", "do i", "should i"]
SUFFIXES = ["", "uk", "2025", "2026", "cost", "explained"]


def fetch_gsc_queries() -> set[str]:
    """Pull all 90d query strings the Solicitors site shows for."""
    print('Pulling live GSC 90d queries...')
    client = GSCClient()
    data = client.get_search_analytics(
        site_url=SITE_URL,
        days=90,
        dimensions=['query'],
        row_limit=1000,
    )
    queries = {normalise(r.get('query', '')) for r in data if r.get('query')}
    queries.discard('')
    print(f'  {len(queries)} unique GSC queries\n')
    return queries


def autocomplete(query: str, client: httpx.Client) -> list[str]:
    """Google Autocomplete UK endpoint."""
    try:
        r = client.get(
            "http://suggestqueries.google.com/complete/search",
            params={"client": "firefox", "q": query, "hl": "en-GB", "gl": "uk"},
            timeout=8.0,
        )
        if r.status_code != 200:
            return []
        data = r.json()
        if isinstance(data, list) and len(data) > 1 and isinstance(data[1], list):
            return [s for s in data[1] if isinstance(s, str)]
    except Exception:
        return []
    return []


def build_variants(seed: str) -> list[str]:
    out = set()
    for prefix in PREFIXES:
        for suffix in SUFFIXES:
            parts = []
            if prefix:
                parts.append(prefix)
            parts.append(seed)
            if suffix:
                parts.append(suffix)
            out.add(" ".join(parts).strip())
    return sorted(out)


def expand_autocomplete_seeds() -> set[str]:
    """For every seed, query Autocomplete with WH-prefixed and modifier-suffixed variants."""
    print(f'Expanding {len(SEED_QUERIES)} seeds via Google Autocomplete...')
    suggestions: set[str] = set()
    with httpx.Client() as client:
        for i, seed in enumerate(SEED_QUERIES, 1):
            variants = build_variants(seed)
            for v in variants:
                for s in autocomplete(v, client):
                    suggestions.add(normalise(s))
            if i % 5 == 0:
                print(f'  {i}/{len(SEED_QUERIES)} seeds, {len(suggestions)} suggestions so far')
            time.sleep(0.05)
    suggestions.discard('')
    print(f'  {len(suggestions)} unique autocomplete suggestions\n')
    return suggestions


def serper_uk_organic(seed: str, client: httpx.Client) -> list[str]:
    """Pull Serper UK SERP and return organic result titles for query expansion."""
    if not SERPER_KEY:
        return []
    try:
        r = client.post(
            'https://google.serper.dev/search',
            headers={'X-API-KEY': SERPER_KEY, 'Content-Type': 'application/json'},
            json={'q': seed, 'gl': 'gb', 'hl': 'en', 'num': 10},
            timeout=15.0,
        )
        if r.status_code != 200:
            return []
        data = r.json()
        titles = [normalise(o.get('title', '')) for o in data.get('organic', [])]
        return [t for t in titles if t]
    except Exception:
        return []


def expand_serper_seeds() -> set[str]:
    """Pull Serper organic titles for each seed; titles are query candidates / related phrasings."""
    if not SERPER_KEY:
        print('SERPER_API_KEY not set — skipping Serper expansion\n')
        return set()
    print(f'Pulling Serper UK organic for {len(SEED_QUERIES)} seeds...')
    titles: set[str] = set()
    with httpx.Client() as client:
        for i, seed in enumerate(SEED_QUERIES, 1):
            for t in serper_uk_organic(seed, client):
                titles.add(t)
            if i % 10 == 0:
                print(f'  {i}/{len(SEED_QUERIES)} seeds, {len(titles)} titles so far')
            time.sleep(0.2)
    print(f'  {len(titles)} unique Serper organic titles\n')
    return titles


def normalise(s: str) -> str:
    return re.sub(r"[^a-z0-9 ]+", " ", (s or "").lower()).strip()


def load_posts() -> list[dict]:
    """Read every Solicitor post's primary keyword + slug from frontmatter."""
    posts = []
    for fp in sorted(BLOG_DIR.glob('*.md')):
        try:
            text = fp.read_text(encoding='utf-8')
        except Exception:
            continue
        m = re.match(r'^---\n(.*?)\n---', text, re.DOTALL)
        if not m:
            continue
        fm = m.group(1)
        title_m = re.search(r'^title:\s*"?(.+?)"?\s*$', fm, re.MULTILINE)
        meta_m = re.search(r'^metaTitle:\s*"?(.+?)"?\s*$', fm, re.MULTILINE)
        date_m = re.search(r'^date:\s*"?(.+?)"?\s*$', fm, re.MULTILINE)
        slug = fp.stem
        posts.append({
            'slug': slug,
            'title': title_m.group(1).strip().rstrip('"') if title_m else slug,
            'metaTitle': meta_m.group(1).strip().rstrip('"') if meta_m else '',
            'date': date_m.group(1).strip().rstrip('"') if date_m else '',
        })
    return posts


def score_post(post: dict, gsc_set: set[str], ac_set: set[str], serper_set: set[str]) -> dict:
    """Score: how well does this post's keywords overlap with verified-demand query universes?"""
    title_norm = normalise(post['title'])
    meta_norm = normalise(post['metaTitle'])
    slug_norm = normalise(post['slug'].replace('-', ' '))
    text = f"{title_norm} {meta_norm} {slug_norm}"

    # Direct GSC match (substring or close)
    gsc_matches = [q for q in gsc_set if q and (q in text or text_contains_query_terms(text, q))]
    ac_matches = [q for q in ac_set if q and (q in text or text_contains_query_terms(text, q))]
    serper_matches = [q for q in serper_set if q and text_contains_query_terms(text, q)]

    verdict = 'speculative'
    if gsc_matches:
        verdict = 'gsc-validated'
    elif ac_matches:
        verdict = 'autocomplete-validated'
    elif serper_matches:
        verdict = 'serper-validated'

    return {
        **post,
        'verdict': verdict,
        'gsc_match_count': len(gsc_matches),
        'gsc_top_match': gsc_matches[0] if gsc_matches else '',
        'ac_match_count': len(ac_matches),
        'ac_top_match': ac_matches[0] if ac_matches else '',
        'serper_match_count': len(serper_matches),
    }


def text_contains_query_terms(text: str, query: str) -> bool:
    """STRICT match: post's combined text must contain ALL non-stopword content tokens
    of the query AND the consecutive ordered phrase must appear as a substring OR
    the query's most-specific 2-3 word noun phrase must appear in the title/slug.

    Loose token-overlap (60%) was generating false positives where a 'law firm'
    post would match any GSC query containing 'law' + 'firm'. The new rule
    requires either exact phrase match or every content token to be present
    AND the phrase length to be >=2 tokens (single-token queries never match,
    they are too generic)."""
    stop = {'a', 'an', 'the', 'and', 'or', 'of', 'to', 'for', 'in', 'on', 'with',
            'is', 'are', 'do', 'does', 'did', 'i', 'my', 'me', 'your', 'we', 'us',
            'how', 'what', 'when', 'why', 'where', 'which', 'who', 'whose',
            'be', 'been', 'being', 'have', 'has', 'had', 'will', 'would', 'should',
            'can', 'could', 'may', 'might', 'must', 'shall',
            'uk', 'gb', 'great', 'britain', 'united', 'kingdom',
            'between', 'difference', 'better', 'worse', 'than',
            'their', 'there', 'they', 'these', 'those', 'this', 'that',
            'into', 'out', 'over', 'under', 'about', 'as', 'at', 'by',
            'cost', 'much', 'many', 'paid', 'pay', 'get', 'earn'}
    q_toks_all = re.findall(r'[a-z0-9]+', query)
    q_toks = [w for w in q_toks_all if w not in stop and len(w) > 1]
    if len(q_toks) < 2:
        # Single-content-token queries are too generic to validate
        return False
    # Stricter: exact phrase OR all-tokens-AND-bigram in text
    q_phrase = ' '.join(q_toks)
    if q_phrase in text:
        return True
    # Must have ALL content tokens present
    t_toks = set(re.findall(r'[a-z0-9]+', text))
    if not all(w in t_toks for w in q_toks):
        return False
    # AND at least one query bigram present consecutively
    bigrams = [f'{q_toks[i]} {q_toks[i+1]}' for i in range(len(q_toks) - 1)]
    return any(b in text for b in bigrams)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--skip-serper', action='store_true')
    args = parser.parse_args()

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    gsc_set = fetch_gsc_queries()
    ac_set = expand_autocomplete_seeds()
    serper_set = set() if args.skip_serper else expand_serper_seeds()

    posts = load_posts()
    print(f'Loaded {len(posts)} solicitor posts from disk\n')

    print('Scoring each post against the validated-query universes...\n')
    scored = [score_post(p, gsc_set, ac_set, serper_set) for p in posts]

    # Bucket counts
    by_verdict: dict[str, int] = defaultdict(int)
    for s in scored:
        by_verdict[s['verdict']] += 1
    print('Verdict distribution:')
    for v in sorted(by_verdict):
        print(f'  {v}: {by_verdict[v]}')
    print()

    # Verified-demand queries NOT yet covered
    all_post_text = ' '.join(normalise(p['title'] + ' ' + p['slug']) for p in posts)
    uncovered_gsc = sorted(q for q in gsc_set if q and not text_contains_query_terms(all_post_text, q))
    uncovered_ac = sorted(q for q in ac_set if q and not text_contains_query_terms(all_post_text, q))
    print(f'Verified GSC queries NOT covered by any current post: {len(uncovered_gsc)}')
    print(f'Verified Autocomplete suggestions NOT covered: {len(uncovered_ac)}')
    print()

    # Write CSV
    fieldnames = ['slug', 'title', 'date', 'verdict', 'gsc_match_count', 'gsc_top_match', 'ac_match_count', 'ac_top_match', 'serper_match_count']
    with open(OUT_CSV, 'w', encoding='utf-8', newline='') as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        for s in scored:
            w.writerow({k: s.get(k, '') for k in fieldnames})

    print(f'Wrote validation CSV to {OUT_CSV}')

    # Write uncovered-gaps CSV
    gaps_path = OUT_DIR / 'uncovered-keyword-gaps.csv'
    with open(gaps_path, 'w', encoding='utf-8', newline='') as f:
        w = csv.writer(f)
        w.writerow(['source', 'query'])
        for q in uncovered_gsc:
            w.writerow(['gsc', q])
        for q in uncovered_ac:
            w.writerow(['autocomplete', q])
    print(f'Wrote uncovered gaps to {gaps_path}')

    # Print speculative posts for visibility
    speculative = [s for s in scored if s['verdict'] == 'speculative']
    print(f'\nSpeculative posts (no demand signal found in GSC / Autocomplete / Serper): {len(speculative)}')
    for s in speculative[:20]:
        print(f'  - {s["slug"]}')


if __name__ == '__main__':
    main()
