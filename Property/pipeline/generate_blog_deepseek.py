"""
Blog generation script using DeepSeek + Supabase (cheaper alternative to
the Anthropic version at generate_blog_supabase.py).

Reuses the existing BLOG_SYSTEM_PROMPT from config_supabase.py (which has
the current UK tax facts pinned) so the only switch is the client.

Adds an explicit factual-accuracy validation pass before writing, to
catch the hallucination patterns we have seen from DeepSeek on UK tax
content (e.g. wrong corp tax rates, P11D claims for employer pension
contributions, fabricated HMRC form references).

Run:
    python Property/pipeline/generate_blog_deepseek.py            # one topic
    python Property/pipeline/generate_blog_deepseek.py --batch 7  # next 7
    python Property/pipeline/generate_blog_deepseek.py --slug ... # specific draft slug
"""
import argparse
import os
import sys
import json
import re
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))

try:
    from dotenv import load_dotenv
    load_dotenv(dotenv_path=str(ROOT / '.env'))
except ImportError:
    pass

import httpx

from agents.utils.deepseek_client import DeepSeekClient

# Reuse the existing Anthropic-version config: same prompt, same paths, same
# Supabase wiring. Only the LLM client changes.
sys.path.insert(0, str(ROOT / 'Property' / 'pipeline'))
from config_supabase import (
    SUPABASE_URL,
    SUPABASE_KEY,
    OUTPUT_MD_DIR,
    SITE_BASE_URL,
    AUTHOR_NAME,
    BLOG_SYSTEM_PROMPT,
    POST_CATEGORIES,
    INTERNAL_LINK_SLUGS,
)


DEEPSEEK_API_KEY = os.getenv('DEEPSEEK_API_KEY')


# Known hallucination patterns we have hit before on UK tax content.
# These are checked against the generated body and flagged for human review.
# Each entry is (regex_pattern, why_it_is_wrong).
SUSPECT_PATTERNS = [
    (r'\b20%\s*corporation\s*tax\b',
     'wrong: UK corp tax is 19% (small profits up to £250k) or 25% (main rate)'),
    (r'corporation\s*tax\s*(?:at|of)\s*20%',
     'wrong: corp tax is 19%/25%, never 20%'),
    (r'CGT\s*(?:rate)?\s*(?:of|at)\s*28%',
     'outdated: residential CGT higher rate is 24% from 30 Oct 2024 (was 28%)'),
    (r'\bP11D\b.{0,80}employer\s*pension',
     'wrong: employer pension contributions are NOT P11D items'),
    (r'employer\s*pension.{0,80}\bP11D\b',
     'wrong: employer pension contributions are NOT P11D / BIK items'),
    (r'\bbenefit\s*in\s*kind\b.{0,80}(?:employer\s*pension|company\s*pension)',
     'wrong: employer pension is not a BIK for the director'),
    (r'\bAIA\b.{0,40}\bcars?\b',
     'wrong: AIA does not cover cars'),
    (r'SDLT\s*surcharge.{0,40}\b3%',
     'outdated: SDLT additional-property surcharge is 5% from 31 Oct 2024 (was 3%)'),
    (r'(?:furnished\s*holiday\s*let|FHL).{0,120}(?:capital\s*allowances|business\s*asset\s*disposal\s*relief|BADR)\s*(?:still|continues|apply|applies|available)',
     'wrong: FHL regime abolished from April 2025, those reliefs no longer apply'),
    (r'MTD.{0,40}\b£\s*50,?000\s*threshold',
     'wrong: MTD for ITSA threshold is £10k from April 2026 (£50k was the old original Phase 1 number)'),
    (r'mortgage\s*interest\s*(?:fully\s*deductible|fully\s*offset)',
     'wrong: Section 24 caps relief at 20% basic-rate credit, not full deduction'),
    (r'(?:non-?resident|nrl).{0,80}30\s*days?\s*(?:rule|deadline|to\s*report|window)',
     'wrong: non-resident CGT deadline was aligned with UK resident at 60 days from 27 Oct 2021 (was 30 days before)'),
    (r'30-?day\s*(?:rule|deadline)\s*(?:remains|still|applies).{0,40}non-?resident',
     'wrong: non-resident CGT deadline is now 60 days (aligned with UK residents from 27 Oct 2021)'),
    (r'non-?resident.{0,40}(?:within|in)\s*30\s*days',
     'wrong: non-resident CGT deadline is 60 days from 27 Oct 2021'),
]

# Hard banned strings — reject immediately
BANNED_STRINGS = (
    '—',  # em-dash
    '–',  # en-dash
)


def fetch_target_draft(slug: str | None = None, exclude_ids: set | None = None) -> dict | None:
    """Fetch the next unused draft topic from blog_topics_property.
    If slug provided, fetch that exact one. Otherwise: highest publish_priority
    among rows tagged with keyword_source='gsc-gap-2026-05' (our Phase 5 batch).
    exclude_ids: set of topic ids to skip (in-session failure tracking)."""
    url = f"{SUPABASE_URL}/rest/v1/blog_topics_property"
    headers = {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}
    params = {
        "used": "eq.false",
        "limit": "1",
    }
    if slug:
        params["slug"] = f"eq.{slug}"
    else:
        params["keyword_source"] = "eq.gsc-gap-2026-05"
        params["order"] = "search_volume.desc.nullslast,created_at.asc"
        if exclude_ids:
            # PostgREST in-clause for not equal: id=not.in.(uuid1,uuid2,...)
            id_list = ",".join(exclude_ids)
            params["id"] = f"not.in.({id_list})"

    r = httpx.get(url, headers=headers, params=params, timeout=15)
    r.raise_for_status()
    rows = r.json()
    return rows[0] if rows else None


def mark_topic_used(topic_id):
    url = f"{SUPABASE_URL}/rest/v1/blog_topics_property"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
    }
    r = httpx.patch(
        url, headers=headers,
        params={"id": f"eq.{topic_id}"},
        json={"used": True, "used_at": datetime.utcnow().isoformat()},
        timeout=15,
    )
    r.raise_for_status()


def build_user_prompt(topic_row: dict) -> str:
    topic = topic_row["topic"]
    primary = topic_row.get("primary_keyword", topic)
    secondary = topic_row.get("secondary_keywords") or []
    intent = topic_row.get("user_intent", "informational")
    volume = topic_row.get("target_search_volume", "unknown")
    angle = topic_row.get("pillar_topic", "")

    sec_text = ", ".join([k for k in secondary if k]) if secondary else "none"

    return f"""Generate a comprehensive blog post for UK landlords and property investors.

Primary topic: {topic}

ARTICLE ANGLE / WHAT TO COVER (from the GSC analysis that surfaced this gap):
{angle}

SEO OPTIMIZATION REQUIREMENTS:
- Primary keyword: "{primary}" (90-day GSC impressions: {volume})
- Secondary keywords: {sec_text}
- Search intent: {intent}
- These are GSC queries the site is already showing for but has no dedicated page. The new post needs to be the dedicated page for the primary keyword.

KEYWORD USAGE:
- Primary keyword in the H1 / title, the first paragraph, and 2-3 times naturally in body
- Each secondary keyword at least once, in a heading or body where it fits
- Natural language only, no stuffing

ACCURACY REQUIREMENTS (CRITICAL — your output will be rejected if it violates these):
- Cite ONLY facts from the UK TAX CONTEXT section of your system prompt above. Do not invent rates, thresholds, deadlines, or HMRC form names.
- If a worked example needs a number not in your context block, use a realistic-but-illustrative figure and mark it as an example, never as an HMRC-specified value.
- Employer pension contributions from a limited company are NOT P11D items and NOT benefits in kind for the director. Do not claim they are.
- Corporation tax rates are 19% (small profits up to £250k) and 25% (main rate above £250k) with marginal relief between. Never cite 20% or 21% as corp tax.
- CGT on residential property: 18% basic / 24% higher rate. The pre-October-2024 28% higher rate no longer applies.
- SDLT additional-property surcharge is 5% (raised from 3% on 31 October 2024).
- FHL regime was abolished from April 2025. Capital allowances, BADR via FHL, and the SDLT FHL angle all changed — only state what applies post-abolition.

Available internal links to reference where they naturally help the reader:
{chr(10).join(f"- {link}" for link in INTERNAL_LINK_SLUGS)}

Category for this post: "{topic_row.get('category', 'Landlord Tax Essentials')}"

Generate the content following the exact ==section== format specified in your system prompt."""


def call_deepseek(client: DeepSeekClient, topic_row: dict) -> str:
    user_prompt = build_user_prompt(topic_row)
    raw = client.generate_creative(
        prompt=user_prompt,
        system=BLOG_SYSTEM_PROMPT,
        temperature=0.5,  # lower than default 0.8: factual content, less creativity
        max_tokens=4096,
    )
    # Post-strip em/en-dashes the model emits despite the system prompt ban
    # (DeepSeek consistently ignores no-em-dash instructions). Replace
    # number-range dashes (X-Y) with " to ", and prose dashes with commas.
    raw = re.sub(r'([\d.,]+)\s*[—–]\s*([\d.,£]+)', r' to ', raw)
    raw = raw.replace(' — ', ', ').replace(' – ', ', ')
    raw = raw.replace('— ', ', ').replace('– ', ', ')
    raw = raw.replace(' —', ',').replace(' –', ',')
    raw = raw.replace('—', ', ').replace('–', ', ')
    return raw


def parse_llm_output(raw_text: str) -> dict:
    fields = {}
    pattern = r'==([^=]+)==\s*(.*?)(?=\n==|$)'
    matches = re.findall(pattern, raw_text, re.DOTALL)
    for key, value in matches:
        k = key.strip().lower().replace('-', '_').replace(' ', '_')
        fields[k] = value.strip()
    return fields


def fact_check(content: str) -> list[str]:
    """Return list of hallucination warnings."""
    warnings = []
    for pattern, why in SUSPECT_PATTERNS:
        if re.search(pattern, content, re.IGNORECASE | re.DOTALL):
            warnings.append(f'{why}  [matched: /{pattern[:80]}/]')
    return warnings


def validate(fields: dict, slug: str) -> tuple[list[str], list[str]]:
    """Return (hard_errors, soft_warnings). Hard errors block writing."""
    errors = []
    warnings = []

    meta_title = fields.get('meta_title', '')
    meta_desc = fields.get('meta_description', '')
    content = fields.get('content', '')

    if not slug or slug == 'untitled':
        errors.append('Missing or default slug')
    if not fields.get('name'):
        errors.append('Missing title')
    if not fields.get('category'):
        errors.append('Missing category')

    if not (45 <= len(meta_title) <= 65):
        warnings.append(f'metaTitle length {len(meta_title)} (target 50-60)')
    if not (120 <= len(meta_desc) <= 165):
        warnings.append(f'metaDescription length {len(meta_desc)} (target 130-155)')
    if not meta_desc:
        errors.append('Missing metaDescription')

    if re.search(r'\[.*?\]\(.*?\)', content):
        errors.append('Content contains markdown links (should be <a>)')

    # Check for banned dashes anywhere in the body or meta
    blob = meta_title + ' ' + meta_desc + ' ' + content
    for b in BANNED_STRINGS:
        if b in blob:
            errors.append(f'Banned character present: {b!r} (use commas/parens)')
            break

    if not fields.get('faq1'):
        warnings.append('No FAQs generated')
    if len(content) < 3000:
        warnings.append(f'Content short ({len(content)} chars, target >5000)')

    # Factual accuracy check
    fact_warnings = fact_check(content)
    for w in fact_warnings:
        errors.append(f'FACT-CHECK: {w}')  # treat fact issues as hard errors

    return errors, warnings


def slugify_category(category: str) -> str:
    s = category.lower().replace('&', 'and').replace('(', '').replace(')', '')
    s = re.sub(r'[^a-z0-9\s-]', '', s)
    return re.sub(r'\s+', '-', s).strip('-')


def export_to_markdown(fields: dict, category: str | None = None) -> str:
    slug = fields.get('slug', 'untitled')
    today = datetime.now().strftime('%Y-%m-%d')
    cat = category or fields.get('category', 'Landlord Tax Essentials')
    cat_slug = slugify_category(cat)
    canonical = f"{SITE_BASE_URL}/blog/{cat_slug}/{slug}"

    faqs = []
    for i in range(1, 5):
        q = fields.get(f'faq{i}', '').strip()
        a = fields.get(f'faa{i}', '').strip()
        if q and a:
            q_e = q.replace('"', '\\"')
            a_e = a.replace('"', '\\"')
            faqs.append(f'  - question: "{q_e}"\n    answer: "{a_e}"')
    faqs_yaml = "\n".join(faqs) if faqs else ""
    faqs_section = f"faqs:\n{faqs_yaml}" if faqs_yaml else "faqs: []"

    name = fields.get('name', 'Untitled').replace('"', '\\"')
    mt = fields.get('meta_title', name).replace('"', '\\"')
    md = fields.get('meta_description', '').replace('"', '\\"')
    alt = fields.get('alt_tag', '').replace('"', '\\"')
    h1 = fields.get('h1', name).replace('"', '\\"')
    summary = fields.get('3_liner', '').replace('"', '\\"')

    front_matter = (
        f"---\n"
        f'title: "{name}"\n'
        f'slug: "{slug}"\n'
        f'canonical: "{canonical}"\n'
        f'date: "{today}"\n'
        f'author: "{AUTHOR_NAME}"\n'
        f'category: "{cat}"\n'
        f'metaTitle: "{mt}"\n'
        f'metaDescription: "{md}"\n'
        f'altText: "{alt}"\n'
        f'image: ""\n'
        f'h1: "{h1}"\n'
        f'summary: "{summary}"\n'
        f'schema: ""\n'
        f'{faqs_section}\n'
        f"---\n\n"
        f"{fields.get('content', '')}\n"
    )

    os.makedirs(OUTPUT_MD_DIR, exist_ok=True)
    out_path = os.path.join(OUTPUT_MD_DIR, f"{slug}.md")
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(front_matter)
    return out_path


def category_label(slug_or_label: str) -> str:
    """Map our supabase category slug (eg 'making-tax-digital-mtd') to the
    POST_CATEGORIES label (eg 'Making Tax Digital (MTD)') the LLM expects."""
    slug = slug_or_label.lower()
    for lbl in POST_CATEGORIES:
        if slugify_category(lbl) == slug:
            return lbl
    # Already a label?
    if slug_or_label in POST_CATEGORIES:
        return slug_or_label
    return 'Landlord Tax Essentials'


def generate_one(client: DeepSeekClient, topic_row: dict) -> tuple[bool, str, list[str]]:
    """Generate one post. Returns (success, slug_or_msg, warnings)."""
    slug = topic_row.get('slug', '')
    print(f'\n{"=" * 70}')
    print(f'TOPIC: {topic_row["topic"]}')
    print(f'SLUG: {slug}')
    print(f'CATEGORY: {topic_row.get("category", "?")} -> {category_label(topic_row.get("category", ""))}')
    print(f'KEYWORD: {topic_row.get("primary_keyword", "?")}')

    for attempt in range(1, 3):
        print(f'  Attempt {attempt}: calling DeepSeek (temp=0.5, max_tokens=4096)...')
        raw = call_deepseek(client, topic_row)
        fields = parse_llm_output(raw)
        # Override category with our supabase one (the LLM picks one but we want consistency)
        fields['category'] = category_label(topic_row.get('category', ''))
        # Force slug to match the planned slug, not whatever LLM picks
        fields['slug'] = slug

        errors, warnings = validate(fields, slug)
        if not errors:
            out_path = export_to_markdown(fields, category=fields['category'])
            print(f'  OK  wrote {out_path}')
            for w in warnings:
                print(f'    WARN: {w}')
            return True, out_path, warnings
        print(f'  Attempt {attempt}: {len(errors)} hard errors:')
        for e in errors:
            print(f'    ERR: {e}')
        if attempt == 1:
            print('  Retrying with stronger constraint reminders...')

    return False, f'gave up after 2 attempts', []


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--batch', type=int, default=1, help='generate next N topics')
    p.add_argument('--slug', help='generate one specific slug from blog_topics_property')
    p.add_argument('--dry-run', action='store_true', help='do not mark used / commit')
    args = p.parse_args()

    if not DEEPSEEK_API_KEY:
        sys.exit('DEEPSEEK_API_KEY not set')

    client = DeepSeekClient(api_key=DEEPSEEK_API_KEY)

    results = []
    failed_ids = set()
    n_target = 1 if args.slug else args.batch
    for i in range(n_target):
        topic = fetch_target_draft(slug=args.slug, exclude_ids=failed_ids)
        if not topic:
            print(f'No more unused gsc-gap-2026-05 topics in queue.')
            break
        ok, msg, warnings = generate_one(client, topic)
        results.append((topic['slug'], ok, msg, warnings))
        if ok and not args.dry_run:
            mark_topic_used(topic['id'])
            print(f'  marked {topic["slug"]} as used in Supabase')
        elif not ok:
            failed_ids.add(topic['id'])
        if args.slug:
            break  # only one when targeting a specific slug

    print(f'\n{"=" * 70}')
    print(f'BATCH SUMMARY')
    print(f'{"=" * 70}')
    ok_count = sum(1 for _, ok, _, _ in results if ok)
    print(f'  Generated: {ok_count} / {len(results)}')
    for slug, ok, msg, warnings in results:
        status = 'OK' if ok else 'FAIL'
        print(f'  [{status}] {slug}: {msg}')
        for w in warnings:
            print(f'         WARN: {w}')


if __name__ == '__main__':
    main()
