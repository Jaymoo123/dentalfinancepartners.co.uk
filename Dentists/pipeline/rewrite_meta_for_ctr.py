"""
Rewrite metaTitle + metaDescription on Property blog posts to lift SERP CTR.

Why: 42 high-impression Property pages are ranking on page 1-2 but earning
near-zero clicks. The diagnosis (Phase 2 of the GSC-driven optimisation
plan) is that the meta titles and descriptions are not click-worthy.

This script:
- Reads the Phase 2 worksheet (top GSC queries per URL, current meta, ranking
  position).
- For each target post (buckets A_PAGE2_CLIMBER_NO_CLICK,
  B_HIGH_IMPR_NO_CLICK_PAGE1, B_LOW_CTR, B_DEEP_RANKING_NO_CLICK), sends a
  CTR-best-practice prompt to DeepSeek with the page's full body as context.
- Validates the output against character limits, banned strings (em-dash,
  hype words) and a required-substring check (the top GSC query or close
  variant must appear in the title).
- Patches the frontmatter in place. Old metaTitle/metaDescription are
  preserved in a `metaTitle_prev` / `metaDescription_prev` line so we can
  roll back or compare.

Run:
    python Property/pipeline/rewrite_meta_for_ctr.py --dry-run --limit 1
    python Property/pipeline/rewrite_meta_for_ctr.py --bucket B_HIGH_IMPR_NO_CLICK_PAGE1
    python Property/pipeline/rewrite_meta_for_ctr.py --workers 4
"""
import argparse
import json
import os
import re
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))

try:
    from dotenv import load_dotenv
    load_dotenv(dotenv_path=str(ROOT / '.env'))
except ImportError:
    pass

from agents.utils.deepseek_client import DeepSeekClient

DEEPSEEK_API_KEY = os.getenv('DEEPSEEK_API_KEY')

WORKSHEET = Path('C:/Users/user/AppData/Local/Temp/dentists_analysis/phase2_worksheet.json')
BLOG_DIR = ROOT / 'Dentists' / 'web' / 'content' / 'blog'

# Dentists overall ranks deep (avg pos 30+). Only target pages that already
# rank on page 1 or near top of page 2 where a meta rewrite can actually
# earn extra clicks.
TARGET_BUCKETS = {
    'A_RANKING_PAGE1',
    'B_PAGE2_CLIMB',
}

SYSTEM_PROMPT = """You are a senior UK dental finance editor writing SERP meta titles and descriptions for Dental Finance Partners (www.dentalfinancepartners.co.uk).

The page you are writing meta for is RANKING in Google but earning low or zero clicks. Your job is to rewrite both fields to maximise click-through rate while staying accurate to the article.

ABSOLUTE RULES — non-negotiable, the output will be rejected if any are violated:

1. TITLE: 50-60 characters total. Front-load with the dominant searcher intent. Include the year "2026" or "2025/26" if the article is tax-rate-bound. End with the brand pipe " | Dental Finance Partners" ONLY if there are characters left under 60, otherwise omit the brand.

2. DESCRIPTION: 130-155 characters. Open with the searcher's outcome ("Cut your associate tax bill", "Structure your buy-in", "Maximise practice goodwill"). Include one specific number (rate, threshold, deadline, £-figure) from the article. Close with a benefit-clarity verb (read, model, claim, plan, avoid).

3. TITLE MUST CONTAIN the dominant GSC query (or its core noun phrase). The user is searching for those exact terms; mirror them.

4. NO em-dashes (—) or en-dashes (–) anywhere. Use commas, full stops, parentheses, or restructure.

5. NO hype clichés: "ultimate", "unlock", "secret", "amazing", "discover", "supercharge". Dental practice owners and associates are practical professionals, not entertainment-seeking.

6. NO duplication between title and description. Description must add information title doesn't carry.

7. UK English: specialise, organise, recognise, optimised, modelled.

8. NO fabrication. The £-figure, rate, or NHS-specific detail you cite must appear in the article body provided. If no specific number is in the article, cite a general benefit ("clear 8-point checklist", "with worked examples") instead of inventing one.

OUTPUT FORMAT — exactly this JSON object, nothing else, no markdown fences, no commentary:

{
  "metaTitle": "<new title, 50-60 chars>",
  "metaDescription": "<new description, 130-155 chars>",
  "title_chars": <integer>,
  "description_chars": <integer>,
  "rationale": "<one short sentence on which search intent you targeted and what hook you used to earn the click>"
}
"""


def _vocab_match(text: str, query: str) -> bool:
    """Title-quality check: does the title contain the core noun phrase of
    the query? Tokenise both, drop stop words, require >=40% of query nouns
    appear in title (relaxed from 60% to handle long queries where the
    title can't carry every term)."""
    stop = {'a', 'an', 'the', 'and', 'or', 'of', 'to', 'for', 'in', 'on', 'with', 'is', 'are', 'do', 'i', 'my', 'me', 'your', 'how', 'what', 'when', 'where', 'which', 'uk', 'rated', 'top'}
    def toks(s):
        return [w for w in re.findall(r'[a-z0-9]+', s.lower()) if w not in stop and len(w) > 1]
    q = toks(query)
    t = toks(text)
    if not q:
        return True
    common = sum(1 for w in q if w in t)
    return common / len(q) >= 0.4


def call_deepseek(client, entry, body_excerpt, avoid_titles=None, attempt=1):
    top_queries = [(entry['top_query_1'], entry['top_query_1_impr']),
                   (entry['top_query_2'], entry['top_query_2_impr']),
                   (entry['top_query_3'], entry['top_query_3_impr'])]
    top_queries = [(q, i) for q, i in top_queries if q]

    queries_block = '\n'.join(
        f'  {i} impressions, query: "{q}"' for q, i in top_queries
    ) or '  (no specific queries surfaced; this URL aggregates anonymised low-volume queries)'

    avoid_block = ''
    if avoid_titles:
        joined = '\n'.join(f'  - "{t}"' for t in avoid_titles)
        avoid_block = f"""

DIFFERENTIATION REQUIREMENT: another Property Tax Partners post already uses (or has been allocated) a title matching the dominant query above. You MUST produce a title that targets a DIFFERENT angle on the same topic so the two posts don't cannibalise each other in the SERP. Allowed angles include: "worked example", "allowances and exemptions", "how to calculate", "what to file with HMRC", "case study", "step-by-step", "for higher-rate taxpayers". Pick whichever the article body actually supports.

Titles already taken — your title must NOT closely resemble any of these:
{joined}
"""

    retry_nudge = ''
    if attempt > 1:
        retry_nudge = f"\n\nThis is retry attempt {attempt}. The previous attempt was rejected by validation. Pay extra attention to character limits, the no-em-dash rule, and the requirement that the title contain the dominant query's core terms."

    user_prompt = f"""ARTICLE BODY (first 2000 chars, for fact-grounding only — do not summarise it, just use it to confirm any specific numbers or claims you put in the meta):

{body_excerpt[:2000]}

CURRENT META (the one that is failing):
- Current metaTitle: "{entry['current_meta_title']}"
- Current metaDescription: "{entry['current_meta_description']}"

90-DAY GSC PERFORMANCE:
- Impressions: {entry['impressions_90d']}
- Clicks: {entry['clicks_90d']} (CTR {entry['ctr_pct']}%)
- Average Google position: {entry['avg_position']}
- Category bucket: {entry['category_bucket']}

TOP GSC QUERIES SHOWING THIS PAGE:
{queries_block}

CRITICAL: the new title MUST contain the dominant query's core noun phrase. The user is searching for THOSE EXACT TERMS — mirror them in the title so the SERP listing visibly matches the query.{avoid_block}{retry_nudge}

Return the JSON object now."""

    raw = client.generate_creative(
        prompt=user_prompt,
        system=SYSTEM_PROMPT,
        temperature=0.7,
        max_tokens=900,
    )
    raw = re.sub(r'^```(?:json)?\s*', '', raw.strip())
    raw = re.sub(r'\s*```$', '', raw.strip())
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return None


def validate(new, entry):
    for key in ('metaTitle', 'metaDescription'):
        if key not in new or not new[key]:
            return False, f'missing {key}'
    title = new['metaTitle']
    desc = new['metaDescription']
    if any(c in title + desc for c in ('—', '–')):
        return False, 'em/en-dash present'
    bans = ('ultimate', 'unlock', 'secret', 'amazing', 'discover', 'supercharge', 'mind-blowing')
    if any(b in title.lower() or b in desc.lower() for b in bans):
        return False, 'hype cliché present'
    if not (45 <= len(title) <= 62):
        return False, f'title length {len(title)} not in 45-62'
    if not (120 <= len(desc) <= 160):
        return False, f'description length {len(desc)} not in 120-160'
    # Title must include the core noun phrase of the dominant query
    top_q = entry.get('top_query_1') or ''
    if top_q and not _vocab_match(title, top_q):
        return False, f'title does not include core terms of top query "{top_q}"'
    return True, ''


def patch_frontmatter(md_text, new_title, new_description):
    """Replace metaTitle and metaDescription lines, preserving the previous
    values on metaTitle_prev / metaDescription_prev lines for audit/rollback."""
    out = md_text
    # Capture existing values first
    prev_title_m = re.search(r'^metaTitle:\s*"?([^"\n]+?)"?\s*$', out, re.MULTILINE)
    prev_desc_m = re.search(r'^metaDescription:\s*"?([^"\n]+?)"?\s*$', out, re.MULTILINE)
    prev_title = prev_title_m.group(1) if prev_title_m else ''
    prev_desc = prev_desc_m.group(1) if prev_desc_m else ''

    # Escape any double-quotes in the new values
    def esc(s):
        return s.replace('"', '\\"')

    if prev_title_m:
        out = re.sub(
            r'^metaTitle:\s*"?[^"\n]+?"?\s*$',
            f'metaTitle: "{esc(new_title)}"',
            out, count=1, flags=re.MULTILINE,
        )
    if prev_desc_m:
        out = re.sub(
            r'^metaDescription:\s*"?[^"\n]+?"?\s*$',
            f'metaDescription: "{esc(new_description)}"',
            out, count=1, flags=re.MULTILINE,
        )

    # Insert the _prev fields just after metaDescription, if not already present
    if 'metaTitle_prev' not in out and prev_title:
        out = re.sub(
            r'^(metaDescription:\s*"[^"]+"\s*)$',
            r'\1\nmetaTitle_prev: "' + esc(prev_title) + '"\nmetaDescription_prev: "' + esc(prev_desc) + '"',
            out, count=1, flags=re.MULTILINE,
        )

    return out


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--limit', type=int, help='cap number of posts')
    parser.add_argument('--bucket', help='only process this category_bucket')
    parser.add_argument('--slug', help='only process this slug')
    parser.add_argument('--workers', type=int, default=3)
    parser.add_argument('--dry-run', action='store_true', help='show outputs, do not write')
    args = parser.parse_args()

    if not DEEPSEEK_API_KEY:
        sys.exit('DEEPSEEK_API_KEY not set')
    if not WORKSHEET.exists():
        sys.exit(f'worksheet not found: {WORKSHEET}')

    worksheet = json.loads(WORKSHEET.read_text(encoding='utf-8'))

    # Filter targets — dedup by slug, prefer the canonical URL (with category)
    # over the legacy URL when both exist for the same slug, and aggregate
    # impressions across both.
    seen_slugs = {}
    for r in worksheet:
        if not r.get('has_md'):
            continue
        if r['category_bucket'] not in TARGET_BUCKETS:
            continue
        if args.bucket and r['category_bucket'] != args.bucket:
            continue
        if args.slug and r['slug'] != args.slug:
            continue
        slug = r['slug']
        if slug in seen_slugs:
            # Sum impressions and clicks
            existing = seen_slugs[slug]
            existing['impressions_90d'] += r['impressions_90d']
            existing['clicks_90d'] += r['clicks_90d']
            # Prefer canonical (not legacy) for the main URL
            if existing.get('is_legacy_url') and not r.get('is_legacy_url'):
                # keep the new (canonical) URL
                r['impressions_90d'] = existing['impressions_90d']
                r['clicks_90d'] = existing['clicks_90d']
                seen_slugs[slug] = r
        else:
            seen_slugs[slug] = r
    targets = list(seen_slugs.values())
    if args.limit:
        targets = targets[:args.limit]

    print(f'Targets to rewrite: {len(targets)}')
    print()

    client = DeepSeekClient(api_key=DEEPSEEK_API_KEY)

    # Build duplicate-detection state: titles to avoid (existing + in-batch)
    # Title equality is checked case-insensitively on the lowercased title
    used_titles_lock_state = {'titles': set()}
    # Pre-seed with current metaTitles of all targets so we don't pick a title
    # that's already in active use on another post in this batch
    for t in targets:
        ct = (t.get('current_meta_title') or '').strip()
        if ct:
            used_titles_lock_state['titles'].add(ct.lower())

    import threading
    lock = threading.Lock()

    def work(entry):
        slug = entry['slug']
        md_path = BLOG_DIR / f'{slug}.md'
        if not md_path.exists():
            print(f'  [{slug:>50}]  MD file missing')
            return None
        md_text = md_path.read_text(encoding='utf-8', errors='replace')
        body_match = re.split(r'^---\s*$', md_text, maxsplit=2, flags=re.MULTILINE)
        body_excerpt = body_match[-1] if len(body_match) >= 3 else md_text

        # Snapshot the currently-taken titles, excluding this post's own
        own_title = (entry.get('current_meta_title') or '').strip().lower()
        for attempt in range(1, 4):
            with lock:
                avoid = sorted(used_titles_lock_state['titles'] - {own_title})
            try:
                new = call_deepseek(client, entry, body_excerpt,
                                    avoid_titles=avoid if attempt > 1 or len(avoid) < 50 else None,
                                    attempt=attempt)
            except Exception as e:
                print(f'  [{slug:>50}]  DeepSeek error: {e}')
                continue
            if new is None:
                print(f'  [{slug:>50}]  attempt {attempt}: JSON parse failed')
                continue
            ok, msg = validate(new, entry)
            if not ok:
                print(f'  [{slug:>50}]  attempt {attempt}: {msg}')
                continue
            new_title_low = new['metaTitle'].strip().lower()
            with lock:
                if new_title_low in used_titles_lock_state['titles']:
                    print(f'  [{slug:>50}]  attempt {attempt}: title collides with already-used title, retrying')
                    continue
                used_titles_lock_state['titles'].add(new_title_low)
            print(f'  [{slug:>50}]  OK  T={len(new["metaTitle"]):>2}c D={len(new["metaDescription"]):>3}c')
            return (slug, md_path, md_text, new)
        print(f'  [{slug:>50}]  GAVE UP after 3 attempts')
        return None

    successes = []
    # Run sequentially so the cannibalisation lock and avoid_titles list stays
    # coherent (3 parallel workers race-condition into duplicate titles).
    for entry in targets:
        res = work(entry)
        if res:
            successes.append(res)

    print()
    print(f'Successful rewrites: {len(successes)} / {len(targets)}')

    if args.dry_run:
        print('\n[dry-run] Sample outputs:')
        for slug, _, _, new in successes[:3]:
            print(f'\n--- {slug} ---')
            print(f'  title:       {new["metaTitle"]}')
            print(f'  description: {new["metaDescription"]}')
            print(f'  rationale:   {new.get("rationale", "")}')
        return

    # Write
    for slug, md_path, md_text, new in successes:
        patched = patch_frontmatter(md_text, new['metaTitle'], new['metaDescription'])
        md_path.write_text(patched, encoding='utf-8')
    print(f'Patched {len(successes)} files')


if __name__ == '__main__':
    main()
