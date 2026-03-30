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
    """
    Fetch the highest priority unused topic from Supabase.
    Priority-based selection: highest publish_priority first, then easiest keyword_difficulty.
    """
    url = f"{SUPABASE_URL}/rest/v1/blog_topics_property"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
    }
    params = {
        "used": "eq.false",
        "order": "publish_priority.desc.nullslast,keyword_difficulty.asc.nullslast,created_at.asc",
        "limit": "1"
    }
    
    response = httpx.get(url, headers=headers, params=params)
    response.raise_for_status()
    topics = response.json()
    
    if not topics:
        print("No unused topics found in Supabase.")
        return None
    
    topic = topics[0]
    
    print(f"Selected topic (priority {topic.get('publish_priority', 'N/A')}, difficulty {topic.get('keyword_difficulty', 'N/A')}): {topic['topic']}")
    
    return topic

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

def generate_content(topic_data):
    """Generate blog content using Anthropic with keyword optimization."""
    client = Anthropic(api_key=ANTHROPIC_API_KEY)
    
    topic = topic_data["topic"]
    primary_keyword = topic_data.get("primary_keyword", topic)
    secondary_keywords = topic_data.get("secondary_keywords", [])
    user_intent = topic_data.get("user_intent", "informational")
    search_volume = topic_data.get("target_search_volume", "unknown")
    content_tier = topic_data.get("content_tier", "cluster")
    
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
    
    user_prompt = f"""Generate a comprehensive blog post for UK landlords and property investors.

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
    
    print(f"[OK] Found topic: {topic_row['topic']}")
    if topic_row.get("primary_keyword"):
        print(f"     Primary keyword: {topic_row['primary_keyword']}")
        print(f"     Priority: {topic_row.get('publish_priority', 'N/A')}, Difficulty: {topic_row.get('keyword_difficulty', 'N/A')}")
    
    # 2. Generate content
    print("\n[2/4] Generating content with Anthropic...")
    raw_content = generate_content(topic_row)
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
