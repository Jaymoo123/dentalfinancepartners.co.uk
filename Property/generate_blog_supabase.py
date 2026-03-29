"""
Blog generation script using Anthropic + Supabase.
Fetches an unused topic from Supabase, generates content, exports to Markdown.
"""
import os
import sys
import json
import re
from datetime import datetime
from anthropic import Anthropic
import httpx

# Import config
try:
    from config_supabase import (
        ANTHROPIC_API_KEY,
        SUPABASE_URL,
        SUPABASE_KEY,
        OUTPUT_MD_DIR,
        SITE_BASE_URL,
        AUTHOR_NAME,
        BLOG_SYSTEM_PROMPT,
        POST_CATEGORIES,
        INTERNAL_LINK_SLUGS,
        get_relevant_audience_link,
    )
except ImportError:
    print("Error: config_supabase.py not found")
    sys.exit(1)

def fetch_unused_topic():
    """Fetch the first unused topic from Supabase."""
    url = f"{SUPABASE_URL}/rest/v1/blog_topics_property"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
    }
    params = {
        "used": "eq.false",
        "order": "priority.desc,created_at.asc",
        "limit": "1"
    }
    
    response = httpx.get(url, headers=headers, params=params)
    response.raise_for_status()
    topics = response.json()
    
    if not topics:
        print("No unused topics found in Supabase.")
        return None
    
    return topics[0]

def mark_topic_used(topic_id, slug):
    """Mark topic as used in Supabase."""
    url = f"{SUPABASE_URL}/rest/v1/blog_topics_property"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
    }
    params = {"id": f"eq.{topic_id}"}
    payload = {
        "used": True,
        "used_at": datetime.utcnow().isoformat()
    }
    
    response = httpx.patch(url, headers=headers, params=params, json=payload)
    response.raise_for_status()
    print(f"[OK] Marked topic {topic_id} as used")

def generate_content(topic, secondary_keywords):
    """Generate blog content using Anthropic."""
    client = Anthropic(api_key=ANTHROPIC_API_KEY)
    
    keywords_text = ", ".join([k for k in secondary_keywords if k]) if secondary_keywords else ""
    
    user_prompt = f"""Generate a comprehensive blog post for UK landlords and property investors.

Primary topic: {topic}
Secondary keywords: {keywords_text}

Available internal links you can reference naturally:
{chr(10).join(f"- {link}" for link in INTERNAL_LINK_SLUGS)}

Categories to choose from: {", ".join(POST_CATEGORIES)}

Generate the content following the exact format specified in your system prompt."""

    print(f"Generating content for: {topic}")
    
    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=4096,
        system=BLOG_SYSTEM_PROMPT,
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

def export_to_markdown(fields):
    """Export parsed fields to Markdown file."""
    slug = fields.get("slug", "untitled")
    today = datetime.now().strftime("%Y-%m-%d")
    
    # Build FAQs array for frontmatter
    faqs = []
    for i in range(1, 5):
        question = fields.get(f'faq{i}', '').strip()
        answer = fields.get(f'faa{i}', '').strip()
        if question and answer:
            # Escape quotes in YAML
            question_escaped = question.replace('"', '\\"')
            answer_escaped = answer.replace('"', '\\"')
            faqs.append(f'  - question: "{question_escaped}"\n    answer: "{answer_escaped}"')
    
    faqs_yaml = "\n".join(faqs) if faqs else ""
    faqs_section = f"faqs:\n{faqs_yaml}" if faqs_yaml else "faqs: []"
    
    front_matter = f"""---
title: "{fields.get('name', 'Untitled')}"
slug: "{slug}"
date: "{today}"
author: "{AUTHOR_NAME}"
category: "{fields.get('category', 'Section 24 & Tax Relief')}"
metaTitle: "{fields.get('meta_title', fields.get('name', 'Untitled'))}"
metaDescription: "{fields.get('meta_description', '')}"
altText: "{fields.get('alt_tag', '')}"
image: ""
h1: "{fields.get('h1', fields.get('name', 'Untitled'))}"
summary: "{fields.get('3_liner', '')}"
schema: ""
canonical: ""
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
    print("=" * 60)
    print("Blog Generation Pipeline (Anthropic + Supabase)")
    print("=" * 60)
    
    # 1. Fetch unused topic
    print("\n[1/4] Fetching unused topic from Supabase...")
    topic_row = fetch_unused_topic()
    if not topic_row:
        print("No topics to process. Add topics to the blog_topics table.")
        return
    
    topic_id = topic_row["id"]
    topic = topic_row["topic"]
    secondary_keywords = [
        topic_row.get(f"secondary_keyword_{i}")
        for i in range(1, 11)
        if topic_row.get(f"secondary_keyword_{i}")
    ]
    
    print(f"[OK] Found topic: {topic}")
    
    # 2. Generate content
    print("\n[2/4] Generating content with Anthropic...")
    raw_content = generate_content(topic, secondary_keywords)
    print(f"[OK] Generated {len(raw_content)} characters")
    
    # 3. Parse output
    print("\n[3/4] Parsing LLM output...")
    fields = parse_llm_output(raw_content)
    print(f"[OK] Parsed {len(fields)} fields")
    
    # 4. Export to Markdown
    print("\n[4/4] Exporting to Markdown...")
    slug = export_to_markdown(fields)
    
    # 5. Mark as used
    print("\n[5/5] Marking topic as used...")
    mark_topic_used(topic_id, slug)
    
    print("\n" + "=" * 60)
    print(f"[COMPLETE] {slug}.md")
    print(f"View at: {SITE_BASE_URL}/blog/{slug}")
    print("=" * 60)

if __name__ == "__main__":
    main()
