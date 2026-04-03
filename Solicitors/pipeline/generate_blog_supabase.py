"""
Blog generation script for Solicitors niche using Anthropic + Supabase.
Fetches an unused topic from Supabase, generates content, exports to Markdown.
"""
import os
import sys
import json
import re
from datetime import datetime
from anthropic import Anthropic
import httpx

try:
    from config_supabase import (
        SUPABASE_URL,
        SUPABASE_KEY,
        BLOG_TOPICS_TABLE,
        SOURCE_IDENTIFIER,
        WEB_CONTENT_PATH,
        NICHE_CONFIG,
    )
except ImportError:
    print("Error: config_supabase.py not found")
    sys.exit(1)

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
OUTPUT_MD_DIR = os.path.join(os.path.dirname(__file__), "..", "web", "content", "blog")
SITE_BASE_URL = f"https://{NICHE_CONFIG['domain']}"
AUTHOR_NAME = f"{NICHE_CONFIG['display_name']} Editorial Team"

POST_CATEGORIES = [
    "SRA Compliance & Trust Accounting",
    "Sole Practitioner Tax",
    "Partnership & LLP Accounting",
    "VAT & Compliance",
    "Practice Finance & Cash Flow",
    "Practice Succession & Sale",
    "Structure & Incorporation",
]

INTERNAL_LINK_SLUGS = [
    "/services",
    "/about",
    "/contact",
    "/sra-compliance",
]

def get_relevant_audience_link(topic: str) -> str:
    """Map blog topic to the most relevant audience page."""
    topic_lower = topic.lower()
    if "sra" in topic_lower or "compliance" in topic_lower or "trust" in topic_lower:
        return "/sra-compliance"
    elif "partnership" in topic_lower or "llp" in topic_lower:
        return "/services"
    else:
        return "/services"

BLOG_SYSTEM_PROMPT = """You are a specialist UK solicitor accountant writing blog content for Accounts for Lawyers.

AUDIENCE: UK solicitors, law firm partners, sole practitioners, practice managers, COFAs, and legal practice owners.

TONE:
- Direct, professional, no fluff.
- Plain English — avoid jargon unless it is standard in UK legal practice (e.g. SRA, COFA, client money, trust accounting, LLP, partnership).
- Practical and grounded — not promotional or over-confident.
- Write as if you are explaining something to a legal colleague who understands law but not accounting.

CONTENT STRUCTURE:
- Use <h2> for main sections, <h3> for subsections if needed.
- Use <p> for paragraphs, <ul>/<li> for lists, <strong> for emphasis.
- NO markdown — output raw HTML only.
- Keep paragraphs short (2-4 sentences).
- Use real examples where helpful (e.g. "a 3-partner firm with £600k annual turnover").

INTERNAL LINKING:
- Link naturally to relevant pages when the context supports it.
- Use <a href="/page-slug">anchor text</a> format.
- Do not force links — only add them where they genuinely help the reader.

SEO:
- Use the primary keyword naturally 7-10 times (if the content supports it).
- Use secondary keywords 4-5 times each (where relevant).
- Write for humans first — keyword density is secondary to clarity.

UK LEGAL SECTOR CONTEXT:
- Reference current tax years (2025/26, 2026/27)
- Use UK legal terminology: sole practitioner, law firm partner, LLP member, COFA, SRA, client money, trust accounting
- Include specific examples with UK tax bands and allowances
- Mention SRA Accounts Rules and client money regulations where relevant
- Reference Making Tax Digital (MTD) for Income Tax (April 2026 rollout)
- Mention Basis Period Reform implications for partnerships
- Reference potential employer NI changes for LLPs (2026 Budget)
- Use London/Manchester/Birmingham examples for local relevance

LEGAL SECTOR-SPECIFIC TAX ISSUES:
- SRA Accounts Rules compliance and client money handling
- Partnership vs LLP taxation and structure decisions
- Sole practitioner self-assessment and MTD compliance
- VAT on legal services and disbursements treatment
- Practice cash flow management and lock-up reduction
- Practice succession planning and goodwill valuation
- Partner retirement and exit strategies

COMPLIANCE:
- All tax/legal statements should be framed as general guidance, not personal advice.
- Use "typically", "often", "in most cases" where appropriate.
- Suggest readers "speak to a specialist solicitor accountant" or "get advice" for specific situations.

OUTPUT FORMAT:
Return the following fields exactly as shown:

==name==
[Article title for listings]

==slug==
[URL-safe slug]

==category==
[One of: SRA Compliance & Trust Accounting, Sole Practitioner Tax, Partnership & LLP Accounting, VAT & Compliance, Practice Finance & Cash Flow, Practice Succession & Sale, Structure & Incorporation]

==h1==
[Page heading]

==meta-title==
[SEO title, 50-60 chars]

==meta-description==
[SEO description, 140-160 chars]

==3-liner==
[Short summary for cards/listings, 1-2 sentences]

==alt-tag==
[Image alt text if an image were used]

==image-prompt==
[DALL-E prompt for a relevant image — professional, UK legal context]

==content==
[Full HTML article body — structured with <h2>, <p>, <ul>, etc.]

==FAQ1==
[First FAQ question]

==FAA1==
[First FAQ answer]

==FAQ2==
[Second FAQ question]

==FAA2==
[Second FAQ answer]

==FAQ3==
[Third FAQ question]

==FAA3==
[Third FAQ answer]

==FAQ4==
[Fourth FAQ question]

==FAA4==
[Fourth FAQ answer]
"""

def fetch_unused_topic():
    """
    Fetch the highest priority unused topic from Supabase.
    Priority-based selection: lowest priority number first, then easiest difficulty.
    """
    url = f"{SUPABASE_URL}/rest/v1/{BLOG_TOPICS_TABLE}"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
    }
    params = {
        "status": "eq.pending",
        "order": "priority.asc,difficulty.asc.nullslast,created_at.asc",
        "limit": "1"
    }
    
    response = httpx.get(url, headers=headers, params=params)
    response.raise_for_status()
    topics = response.json()
    
    if not topics:
        print("No unused topics found in Supabase.")
        return None
    
    topic = topics[0]
    
    print(f"Selected topic (priority {topic.get('priority', 'N/A')}, difficulty {topic.get('difficulty', 'N/A')}): {topic['keyword']}")
    
    return topic

def mark_topic_used(topic_id, slug):
    """Mark topic as published in Supabase."""
    url = f"{SUPABASE_URL}/rest/v1/{BLOG_TOPICS_TABLE}"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
    }
    params = {"id": f"eq.{topic_id}"}
    payload = {
        "status": "published",
        "published_at": datetime.utcnow().isoformat(),
        "slug": slug
    }
    
    response = httpx.patch(url, headers=headers, params=params, json=payload)
    response.raise_for_status()
    print(f"[OK] Marked topic {topic_id} as published with slug: {slug}")

def generate_content(topic_data):
    """Generate blog content using Anthropic with keyword optimization."""
    client = Anthropic(api_key=ANTHROPIC_API_KEY)
    
    topic = topic_data["keyword"]
    primary_keyword = topic_data.get("keyword", topic)
    secondary_keywords = [
        topic_data.get(f"secondary_keyword_{i}")
        for i in range(1, 11)
        if topic_data.get(f"secondary_keyword_{i}")
    ] or topic_data.get("secondary_keywords", [])
    user_intent = topic_data.get("intent", "informational")
    search_volume = topic_data.get("search_volume", "unknown")
    content_tier = "foundational" if topic_data.get("priority", 50) <= 3 else "cluster"
    
    keywords_text = ", ".join([k for k in secondary_keywords if k]) if secondary_keywords else "none"
    
    seo_guidance = f"""
SEO OPTIMIZATION REQUIREMENTS:
- Primary keyword: "{primary_keyword}" (search volume: {search_volume}/month)
- Secondary keywords: {keywords_text}
- Search intent: {user_intent}
- Content type: {content_tier}

KEYWORD USAGE:
- Use primary keyword in: title (H1), first paragraph, and 2-3 times naturally throughout
- Include secondary keywords naturally in subheadings and body content
- Optimize for {user_intent} intent ({"provide comprehensive information" if user_intent == "informational" else "guide users to take action" if user_intent == "transactional" else "help users navigate to resources"})
- Natural language - avoid keyword stuffing
"""
    
    user_prompt = f"""Generate a comprehensive blog post for UK solicitors and law firms.

Primary topic: {topic}
{seo_guidance}

Available internal links you can reference naturally:
{chr(10).join(f"- {link}" for link in INTERNAL_LINK_SLUGS)}

Categories to choose from: {", ".join(POST_CATEGORIES)}

Generate the content following the exact format specified in your system prompt."""

    print(f"Generating content for: {topic}")
    print(f"  Primary keyword: {primary_keyword}")
    print(f"  Intent: {user_intent}, Volume: {search_volume}, Tier: {content_tier}")
    
    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=4096,
        system=[
            {
                "type": "text",
                "text": BLOG_SYSTEM_PROMPT,
                "cache_control": {"type": "ephemeral"}
            }
        ],
        messages=[{"role": "user", "content": user_prompt}]
    )
    
    content = message.content[0].text
    return content

def parse_llm_output(raw_text):
    """Parse the LLM output into structured fields."""
    fields = {}
    pattern = r'==([^=]+)==\s*(.*?)(?=\n==|$)'
    matches = re.findall(pattern, raw_text, re.DOTALL)
    
    for key, value in matches:
        key_clean = key.strip().lower().replace("-", "_").replace(" ", "_")
        fields[key_clean] = value.strip()
    
    return fields

def slugify_category(category):
    """Convert category name to URL slug. Solicitors strips & entirely."""
    return re.sub(r'\s+', '-', re.sub(r'[^a-z0-9\s-]', '', category.lower().replace('(', '').replace(')', ''))).strip('-')


def validate_post(fields, slug, canonical):
    """Validate generated content quality before writing."""
    issues = []
    meta_title = fields.get('meta_title', '')
    meta_desc = fields.get('meta_description', '')
    content = fields.get('content', '')
    
    if not slug or slug == 'untitled':
        issues.append("Missing or default slug")
    if not fields.get('name'):
        issues.append("Missing title")
    if not fields.get('category'):
        issues.append("Missing category")
    if len(meta_title) > 60:
        issues.append(f"metaTitle too long ({len(meta_title)} chars, max 60)")
    if len(meta_desc) > 155:
        issues.append(f"metaDescription too long ({len(meta_desc)} chars, max 155)")
    if not meta_desc:
        issues.append("Missing metaDescription")
    if re.search(r'\[.*?\]\(.*?\)', content):
        issues.append("Content contains markdown links (should be HTML <a> tags)")
    if not fields.get('faq1'):
        issues.append("No FAQs generated")
    if len(content) < 500:
        issues.append(f"Content too short ({len(content)} chars)")
    
    if issues:
        print(f"[WARN] Validation issues for {slug}:")
        for issue in issues:
            print(f"  - {issue}")
    else:
        print(f"[OK] Validation passed for {slug}")
    
    return issues


def export_to_markdown(fields):
    """Export parsed fields to Markdown file."""
    slug = fields.get("slug", "untitled")
    today = datetime.now().strftime("%Y-%m-%d")
    category = fields.get('category', 'SRA Compliance & Trust Accounting')
    category_slug = slugify_category(category)
    canonical = f"{SITE_BASE_URL}/blog/{category_slug}/{slug}"
    
    faqs = []
    for i in range(1, 5):
        question = fields.get(f'faq{i}', '').strip()
        answer = fields.get(f'faa{i}', '').strip()
        if question and answer:
            question_escaped = question.replace('"', '\\"')
            answer_escaped = answer.replace('"', '\\"')
            faqs.append(f'  - question: "{question_escaped}"\n    answer: "{answer_escaped}"')
    
    faqs_yaml = "\n".join(faqs) if faqs else ""
    faqs_section = f"faqs:\n{faqs_yaml}" if faqs_yaml else "faqs: []"
    
    validate_post(fields, slug, canonical)
    
    front_matter = f"""---
title: "{fields.get('name', 'Untitled')}"
slug: "{slug}"
canonical: "{canonical}"
date: "{today}"
author: "{AUTHOR_NAME}"
category: "{category}"
metaTitle: "{fields.get('meta_title', fields.get('name', 'Untitled'))}"
metaDescription: "{fields.get('meta_description', '')}"
altText: "{fields.get('alt_tag', '')}"
image: ""
h1: "{fields.get('h1', fields.get('name', 'Untitled'))}"
summary: "{fields.get('3_liner', '')}"
schema: ""
{faqs_section}
---

{fields.get('content', '')}
"""
    
    os.makedirs(OUTPUT_MD_DIR, exist_ok=True)
    output_path = os.path.join(OUTPUT_MD_DIR, f"{slug}.md")
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(front_matter)
    
    print(f"[OK] Exported to: {output_path}")
    return slug

def main():
    """Main pipeline."""
    if not ANTHROPIC_API_KEY:
        print("Error: ANTHROPIC_API_KEY not set")
        sys.exit(1)
    
    print("=" * 80)
    print("SOLICITORS BLOG GENERATION (Supabase)")
    print("=" * 80)
    
    topic = fetch_unused_topic()
    if not topic:
        print("No topics available. Exiting.")
        sys.exit(0)
    
    raw_content = generate_content(topic)
    
    fields = parse_llm_output(raw_content)
    
    if not fields.get("slug"):
        print("Error: No slug generated")
        sys.exit(1)
    
    slug = export_to_markdown(fields)
    
    mark_topic_used(topic["id"], slug)
    
    print("=" * 80)
    print(f"[SUCCESS] Blog post generated: {slug}")
    print(f"Topic: {topic['keyword']}")
    print(f"Category: {fields.get('category', 'N/A')}")
    print("=" * 80)

if __name__ == "__main__":
    main()
