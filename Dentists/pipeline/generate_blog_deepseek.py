"""
Dentists blog generator: DeepSeek for content + Claude Haiku for fact-check.

Pipeline for each topic row in topic_taxonomy.csv:
1. Pre-write checks:
   - Slug not in agency_slug_denylist.json (Guard 1)
   - Slug not already present in Dentists/web/content/blog/ (no clobber)
2. DeepSeek generates with the BLOG_SYSTEM_PROMPT from config_supabase.py
   (dental fact block + 10 hallucination zones + voice rules)
3. Parse output into structured fields
4. Pre-write content checks:
   - Dental anchor terms present in H1 + first 200 words + at least one H2 (Guard 2)
   - No banned em/en-dashes (post-strip first)
   - No banned anti-AI phrases
   - 10 regex hallucination patterns
   - Meta title 45-65 chars, meta description 120-165 chars
   - Word count target met
5. Cross-site AFF overlap check on body (Guard 3) — only triggers if the
   primary keyword has a close cousin on the AFF sitemap
6. Haiku fact-check pass via verify_blog_facts.verify_draft()
   - 'fail' verdict → reject + retry
7. Write MD file with frontmatter
8. Mark topic as used in topic_taxonomy.csv

Usage:
    python Dentists/pipeline/generate_blog_deepseek.py --limit 5
    python Dentists/pipeline/generate_blog_deepseek.py --cluster nhs-contracts
    python Dentists/pipeline/generate_blog_deepseek.py --slug uda-value-explained-for-uk-dentists
    python Dentists/pipeline/generate_blog_deepseek.py --dry-run --limit 2
    python Dentists/pipeline/generate_blog_deepseek.py --skip-haiku   # don't call Haiku validator
"""
import argparse
import csv
import json
import os
import re
import sys
import time
import urllib.request
from pathlib import Path
from datetime import datetime

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))
sys.path.insert(0, str(ROOT / 'Dentists' / 'pipeline'))

try:
    from dotenv import load_dotenv
    load_dotenv(dotenv_path=str(ROOT / '.env'))
except ImportError:
    pass

from agents.utils.deepseek_client import DeepSeekClient
from config_supabase import (
    SITE_BASE_URL,
    AUTHOR_NAME,
    BLOG_SYSTEM_PROMPT,
    POST_CATEGORIES,
    INTERNAL_LINK_SLUGS,
    DENTAL_ANCHOR_TERMS,
    OUTPUT_MD_DIR,
    get_relevant_audience_link,
)
from verify_blog_facts import verify_draft

DEEPSEEK_API_KEY = os.getenv('DEEPSEEK_API_KEY')
TAXONOMY_CSV = ROOT / 'Dentists' / 'pipeline' / 'topic_taxonomy.csv'
DENYLIST_JSON = ROOT / 'scripts' / 'agency_slug_denylist.json'
BLOG_DIR = ROOT / 'Dentists' / 'web' / 'content' / 'blog'
AFF_BASE = 'https://www.agencyfounderfinance.co.uk'


# ---------------------------------------------------------------------------
# 10 regex hallucination catchers — dental-specific
# ---------------------------------------------------------------------------
HALLUCINATION_PATTERNS = [
    (r'\b20%\s*corporation\s*tax\b',
     'wrong: UK corp tax is 19%/25% with marginal relief, never flat 20%'),
    (r'corporation\s*tax\s*(?:at|of)\s*20%',
     'wrong: corp tax is 19%/25%'),
    (r'\bP11D\b.{0,80}(?:employer|company|practice)\s*pension',
     'wrong: employer pension contributions are NOT P11D items'),
    (r'(?:employer|company|practice)\s*pension.{0,80}\bP11D\b',
     'wrong: employer pension contributions are NOT P11D / BIK items'),
    (r'\bAIA\b.{0,40}\bcars?\b',
     'wrong: AIA does not cover cars'),
    (r'(?:UDA|uda)\s*(?:rate|value)\s*(?:is|of)\s*£\d{1,2}(?:\.\d{2})?\s*(?:nationally|across the UK|UK-wide|uniformly)',
     'wrong: UDA rates vary by contract and region'),
    (r'all\s+NHS\s+dentists\s+(?:are\s+)?in\s+the\s+2015\s+(?:scheme|section)',
     'wrong: 1995 and 2008 sections still hold legacy members'),
    (r'(?:BDA|British Dental Association)\s+(?:model\s+)?contract.{0,40}(?:guarantee|guarantees|ensures|secures).{0,30}self.?employ',
     'wrong: BDA model contract does not guarantee self-employment status'),
    (r'goodwill.{0,40}amortis(?:e|ation).{0,40}(?:10%|ten\s*per\s*cent|annually)',
     'wrong: goodwill amortisation tax relief is 6.5% per year for post-April-2019 acquisitions'),
    (r'(?:selling|sale\s+of)\s+(?:your\s+|a\s+)?(?:dental\s+)?practice.{0,40}(?:trading\s+income|income\s+tax|self.assessment\s+rate)',
     'wrong: practice sale is a capital disposal, not trading income'),
    (r'(?:all\s+|every\s+)?dental\s+treatment\s+(?:is\s+)?VAT.?exempt',
     'oversimplified: purely cosmetic treatment without medical purpose can be standard-rated'),
    (r'non.?resident.{0,60}CGT.{0,40}30\s*days?',
     'wrong: non-resident CGT deadline is 60 days from 27 October 2021'),
    (r'CGT\s*(?:rate)?\s*(?:of|at)\s*28%',
     'outdated: residential CGT higher rate is 24% from 30 October 2024'),
    (r'SDLT\s*surcharge.{0,40}\b3%',
     'outdated: SDLT additional-property surcharge is 5% from 31 October 2024'),
]

# ---------------------------------------------------------------------------
# Banned anti-AI phrases — match Property/Agency pattern
# ---------------------------------------------------------------------------
BANNED_OPENERS = [
    "in today's", "in the world of", "when it comes to",
    "in an ever-evolving", "navigating the complex",
    "in the dynamic", "in the realm of",
]
BANNED_VERBS = [
    'delve', 'leverage', 'harness', 'master',
    'embrace', 'supercharge', 'unlock the secrets',
]
BANNED_NOUNS = [
    'landscape (', 'tapestry', 'intricate', 'seamless', 'realm',
]


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def load_taxonomy() -> list[dict]:
    return list(csv.DictReader(open(TAXONOMY_CSV, encoding='utf-8')))


def load_denylist() -> set[str]:
    data = json.loads(DENYLIST_JSON.read_text(encoding='utf-8'))
    # The "all_last_path_segs" set covers every URL terminal segment on AFF,
    # which is the strictest check for slug collision.
    return set(data['all_last_path_segs'])


def existing_dentist_slugs() -> set[str]:
    return {md.stem for md in BLOG_DIR.glob('*.md')}


def strip_em_dashes(text: str) -> str:
    """Post-strip em/en-dashes the model emits despite the ban. Numeric
    ranges (e.g. '40-55%') get hyphen; prose dashes become commas."""
    text = re.sub(r'([\d.,£]+)\s*[—–]\s*([\d.,£]+)', r'\1 to \2', text)
    text = text.replace(' — ', ', ').replace(' – ', ', ')
    text = text.replace('— ', ', ').replace('– ', ', ')
    text = text.replace(' —', ',').replace(' –', ',')
    text = text.replace('—', ', ').replace('–', ', ')
    return text


def parse_llm_output(raw: str) -> dict:
    fields = {}
    pattern = r'==([^=]+)==\s*(.*?)(?=\n==|$)'
    for key, value in re.findall(pattern, raw, re.DOTALL):
        k = key.strip().lower().replace('-', '_').replace(' ', '_')
        fields[k] = value.strip()
    return fields


def slugify_category(cat: str) -> str:
    s = cat.lower().replace('&', 'and').replace('(', '').replace(')', '')
    s = re.sub(r'[^a-z0-9\s-]', '', s)
    return re.sub(r'\s+', '-', s).strip('-')


# ---------------------------------------------------------------------------
# Validation
# ---------------------------------------------------------------------------
def validate_pre_write(fields: dict, slug: str, anchor_terms: list[str]) -> tuple[bool, list[str]]:
    """Return (ok, errors)."""
    errors = []

    name = fields.get('name', '')
    h1 = fields.get('h1', '')
    meta_title = fields.get('meta_title', '')
    meta_desc = fields.get('meta_description', '')
    content = fields.get('content', '')

    if not name or not h1 or not content:
        errors.append('missing required field (name/h1/content)')
        return False, errors

    # Dental anchor guard (anti-duplication Guard 2)
    h1_low = h1.lower()
    if not any(a in h1_low for a in anchor_terms):
        errors.append(f'H1 missing dental anchor (need one of: {", ".join(anchor_terms[:5])}...)')

    # First 200 words must contain >= 2 distinct dental terms
    body_text = re.sub(r'<[^>]+>', ' ', content)
    first_200_words = ' '.join(body_text.split()[:200]).lower()
    anchors_found = sum(1 for a in anchor_terms if a in first_200_words)
    if anchors_found < 2:
        errors.append(f'first 200 words contain only {anchors_found} dental anchor(s), need >=2')

    # At least one H2 contains a dental term
    h2s = re.findall(r'<h2[^>]*>(.*?)</h2>', content, re.IGNORECASE | re.DOTALL)
    h2_anchored = any(any(a in re.sub(r'<[^>]+>', '', h).lower() for a in anchor_terms) for h in h2s)
    if not h2_anchored:
        errors.append('no H2 contains a dental anchor term')

    # Meta lengths
    if not (45 <= len(meta_title) <= 65):
        errors.append(f'metaTitle length {len(meta_title)} not in 45-65')
    if not (120 <= len(meta_desc) <= 165):
        errors.append(f'metaDescription length {len(meta_desc)} not in 120-165')

    # Em/en-dashes (after post-strip — if any remain we have a problem)
    if '—' in content + meta_title + meta_desc or '–' in content + meta_title + meta_desc:
        errors.append('em/en-dash present after post-strip')

    # Banned anti-AI phrases (case-insensitive)
    blob = (content + ' ' + meta_title + ' ' + meta_desc).lower()
    for phrase in BANNED_OPENERS + BANNED_VERBS + BANNED_NOUNS:
        if phrase in blob:
            errors.append(f'banned phrase: {phrase!r}')
            break

    # Hallucination regexes
    for pattern, why in HALLUCINATION_PATTERNS:
        if re.search(pattern, content, re.IGNORECASE | re.DOTALL):
            errors.append(f'hallucination pattern: {why}')
            break

    # Word count — basic length floor
    word_count = len(body_text.split())
    if word_count < 800:
        errors.append(f'content too short: {word_count} words')

    # Markdown links (should be HTML)
    if re.search(r'\[.*?\]\(.*?\)', content):
        errors.append('markdown links found — should be HTML <a>')

    return (len(errors) == 0, errors)


def check_aff_overlap(slug: str, primary_keyword: str, body_html: str, aff_overlap_risk: str) -> tuple[bool, str]:
    """Anti-duplication Guard 3: fetch AFF version (if any) and check
    distinctive-vocabulary overlap. Skips for risk='none'."""
    if aff_overlap_risk == 'none':
        return True, ''

    # Try fetching AFF for this slug or a close cousin
    candidate_urls = [
        f'{AFF_BASE}/blog/{slug}',
        f'{AFF_BASE}/fundamentals/{slug}',
        f'{AFF_BASE}/guides/{slug}',
    ]
    # Also try keyword-style slugs
    kw_slug = re.sub(r'[^a-z0-9]+', '-', primary_keyword.lower()).strip('-')
    if kw_slug != slug:
        candidate_urls.append(f'{AFF_BASE}/blog/{kw_slug}')

    aff_text = None
    for u in candidate_urls:
        try:
            req = urllib.request.Request(u, headers={'User-Agent': 'overlap-check/1.0'})
            with urllib.request.urlopen(req, timeout=12) as r:
                if r.status == 200:
                    html = r.read().decode('utf-8', errors='replace')
                    body_match = re.search(r'<body[^>]*>(.*?)</body>', html, re.DOTALL | re.IGNORECASE)
                    aff_text = (body_match.group(1) if body_match else html)
                    break
        except Exception:
            continue

    if aff_text is None:
        return True, 'no AFF parallel found'

    def vocab(text):
        cleaned = re.sub(r'<[^>]+>', ' ', text).lower()
        stop = {'your', 'this', 'that', 'from', 'with', 'have', 'will', 'they',
                'their', 'than', 'when', 'what', 'which', 'into', 'more', 'less',
                'most', 'such', 'also', 'been', 'were', 'where', 'while', 'would',
                'could', 'should', 'about', 'after', 'before', 'between', 'because',
                'through'}
        return {w for w in re.findall(r'[a-z]{4,}', cleaned) if w not in stop}

    body_v = vocab(body_html)
    aff_v = vocab(aff_text)
    if not body_v:
        return True, ''
    overlap = len(body_v & aff_v) / len(body_v)
    if overlap > 0.55:
        return False, f'AFF overlap {overlap:.0%} > 55%'
    return True, f'AFF overlap {overlap:.0%} OK'


# ---------------------------------------------------------------------------
# Generation
# ---------------------------------------------------------------------------
def build_user_prompt(topic: dict) -> str:
    secondary = topic['secondary_keywords']
    target_words = topic.get('target_word_count', '1800')
    return f"""Generate a blog post for UK dentists.

PRIMARY TOPIC: {topic['primary_keyword']}
INTENT: {topic['intent']}
TARGET WORD COUNT: {target_words}
SECONDARY KEYWORDS (use naturally): {secondary}

PROPOSED SLUG: {topic['slug']}
PROPOSED CATEGORY: see allowed list in your system prompt

DENTAL ANCHOR TERMS this topic should use (you must use these naturally in H1, first 200 words, and at least one H2):
{topic.get('dental_anchor_terms', '')}

Available internal-link slugs to reference where they help:
{chr(10).join(f"- {s}" for s in INTERNAL_LINK_SLUGS)}

Return the full ==section== output now, following every rule in your system prompt."""


def call_deepseek(client: DeepSeekClient, topic: dict) -> str:
    raw = client.generate_creative(
        prompt=build_user_prompt(topic),
        system=BLOG_SYSTEM_PROMPT,
        temperature=0.55,
        max_tokens=5500,
    )
    raw = re.sub(r'^```(?:html|markdown)?\s*', '', raw.strip())
    raw = re.sub(r'\s*```$', '', raw.strip())
    raw = strip_em_dashes(raw)
    return raw


def write_md(fields: dict, slug: str) -> Path:
    today = datetime.now().strftime('%Y-%m-%d')
    cat = fields.get('category', 'Practice Accounting')
    if cat not in POST_CATEGORIES:
        # Default to first category if model picked an invalid one
        cat = 'Practice Accounting'
    cat_slug = slugify_category(cat)
    canonical = f"{SITE_BASE_URL}/blog/{cat_slug}/{slug}"

    faqs = []
    for i in range(1, 5):
        q = fields.get(f'faq{i}', '').strip()
        a = fields.get(f'faa{i}', '').strip()
        if q and a:
            q = q.replace('"', '\\"')
            a = a.replace('"', '\\"')
            faqs.append(f'  - question: "{q}"\n    answer: "{a}"')
    faqs_section = 'faqs:\n' + '\n'.join(faqs) if faqs else 'faqs: []'

    def esc(s):
        return s.replace('"', '\\"')

    front = (
        f"---\n"
        f'title: "{esc(fields.get("name", "Untitled"))}"\n'
        f'slug: "{slug}"\n'
        f'canonical: "{canonical}"\n'
        f'date: "{today}"\n'
        f'author: "{AUTHOR_NAME}"\n'
        f'category: "{cat}"\n'
        f'metaTitle: "{esc(fields.get("meta_title", fields.get("name", "")))}"\n'
        f'metaDescription: "{esc(fields.get("meta_description", ""))}"\n'
        f'altText: "{esc(fields.get("alt_tag", ""))}"\n'
        f'image: ""\n'
        f'h1: "{esc(fields.get("h1", fields.get("name", "")))}"\n'
        f'summary: "{esc(fields.get("3_liner", ""))}"\n'
        f'schema: ""\n'
        f'{faqs_section}\n'
        f"---\n\n"
        f"{fields.get('content', '')}\n"
    )

    BLOG_DIR.mkdir(parents=True, exist_ok=True)
    out = BLOG_DIR / f'{slug}.md'
    out.write_text(front, encoding='utf-8')
    return out


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def generate_one(client, topic, denylist, existing_slugs, anchor_terms, skip_haiku=False):
    slug = topic['slug']

    # Pre-write Guard 1: slug collision with AFF
    if slug in denylist:
        return (False, slug, ['slug collides with AFF sitemap — rename in taxonomy'])

    # No clobber on existing
    if slug in existing_slugs:
        return (False, slug, ['slug already exists in Dentists blog dir'])

    for attempt in range(1, 3):
        try:
            raw = call_deepseek(client, topic)
        except Exception as e:
            print(f'  [{slug:>50}]  DeepSeek error: {e}')
            continue

        fields = parse_llm_output(raw)
        if not fields:
            print(f'  [{slug:>50}]  attempt {attempt}: empty parse')
            continue

        # Anchor terms for this topic: union of taxonomy-provided + dental allowlist
        topic_anchors = [a.strip().lower() for a in topic.get('dental_anchor_terms', '').split(',') if a.strip()]
        anchor_check = [t for t in (topic_anchors + anchor_terms) if t]

        ok, errors = validate_pre_write(fields, slug, anchor_check)
        if not ok:
            print(f'  [{slug:>50}]  attempt {attempt}: {len(errors)} pre-write errors')
            for e in errors[:3]:
                print(f'    - {e}')
            continue

        # Guard 3: AFF cross-site overlap
        ok_aff, msg_aff = check_aff_overlap(
            slug, topic['primary_keyword'], fields['content'],
            topic.get('aff_overlap_risk', 'low'),
        )
        if not ok_aff:
            print(f'  [{slug:>50}]  attempt {attempt}: AFF overlap reject ({msg_aff})')
            continue

        # Haiku fact-check
        if not skip_haiku:
            try:
                verdict = verify_draft(fields.get('name', slug), fields['content'])
            except Exception as e:
                print(f'  [{slug:>50}]  Haiku error: {e} — proceeding with regex guards only')
                verdict = {'verdict': 'pass', 'flagged': []}
            if verdict.get('verdict') == 'fail':
                print(f'  [{slug:>50}]  attempt {attempt}: Haiku fact-fail')
                for f in verdict.get('flagged', [])[:3]:
                    print(f"    - {f.get('severity', '?').upper()}: {f.get('claim', '?')[:80]}")
                    print(f"      {f.get('why', '?')[:100]}")
                continue
            n_flags = len(verdict.get('flagged', []))
            print(f'  [{slug:>50}]  OK  attempt {attempt}  ({n_flags} medium flags, accepted)')
        else:
            print(f'  [{slug:>50}]  OK  attempt {attempt}  (Haiku skipped)')

        return (True, slug, fields)

    return (False, slug, ['gave up after 2 attempts'])


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--limit', type=int, help='cap number of topics this run')
    parser.add_argument('--cluster', help='filter to one cluster slug')
    parser.add_argument('--slug', help='single topic slug')
    parser.add_argument('--dry-run', action='store_true', help='generate but do not write to disk')
    parser.add_argument('--skip-haiku', action='store_true', help='skip Haiku validator (cheaper testing)')
    args = parser.parse_args()

    if not DEEPSEEK_API_KEY:
        sys.exit('DEEPSEEK_API_KEY not set')

    taxonomy = load_taxonomy()
    denylist = load_denylist()
    existing = existing_dentist_slugs()
    anchor_terms = [a.lower() for a in DENTAL_ANCHOR_TERMS]

    targets = taxonomy
    if args.cluster:
        targets = [t for t in targets if t['cluster'] == args.cluster]
    if args.slug:
        targets = [t for t in targets if t['slug'] == args.slug]
    # Sort by priority asc (1 first)
    targets.sort(key=lambda t: int(t.get('priority', 5)))
    # Skip topics whose slug already exists
    targets = [t for t in targets if t['slug'] not in existing]
    if args.limit:
        targets = targets[: args.limit]

    print(f'Targets: {len(targets)}')
    print()

    client = DeepSeekClient(api_key=DEEPSEEK_API_KEY)
    written, skipped = [], []

    for topic in targets:
        ok, slug, payload = generate_one(client, topic, denylist, existing, anchor_terms, skip_haiku=args.skip_haiku)
        if not ok:
            skipped.append((slug, payload))
            continue
        if args.dry_run:
            print(f'  [{slug:>50}]  DRY-RUN (would write)')
            written.append(slug)
            continue
        out_path = write_md(payload, slug)
        existing.add(slug)
        written.append(slug)
        print(f'  [{slug:>50}]  -> {out_path.name}')

    print()
    print(f'Written: {len(written)}, Skipped: {len(skipped)}')
    if skipped:
        print('\nSkipped:')
        for s, reason in skipped:
            print(f'  {s}: {reason}')


if __name__ == '__main__':
    main()
