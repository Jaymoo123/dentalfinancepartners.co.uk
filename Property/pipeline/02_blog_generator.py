from openai import OpenAI
import os
import sys
import re

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
if CURRENT_DIR not in sys.path:
    sys.path.insert(0, CURRENT_DIR)

import config
from service_mappings import get_service_prompt_instructions, validate_and_fix_service_urls

client = OpenAI(
    api_key=config.DEESEEK_API_KEY,
    base_url=config.LLM_BASE_URL
)

def detect_year_in_topic(blog_topic):
    """
    Detect if a specific year (2026, 2027, etc.) is mentioned in the blog topic.
    Returns the year as a string if found, otherwise returns None.
    """
    # Look for 4-digit years from 2025 onwards in the topic
    year_match = re.search(r'\b(202[5-9]|203[0-9])\b', blog_topic)
    if year_match:
        return year_match.group(1)
    return None

def generate_blog_from_row(row_data):
    blog_topic = row_data.get("Blog Topic", "").strip()
    secondary_keywords = [row_data.get(f"Secondary Keyword{i}", "").strip() for i in range(1, 18)]

    # Detect if a specific year is mentioned in the blog topic
    detected_year = detect_year_in_topic(blog_topic)

    # Create dynamic context instruction based on detected year
    if detected_year and detected_year != "2025":
        # If a future year is explicitly mentioned, write about that year but use current tax rules
        context_instruction = f"accurate for UK {detected_year}, using the current 2025/26 UK tax rules, rates, and thresholds (as {detected_year} rates may not yet be confirmed)"
        print(f"[ℹ] Detected year {detected_year} in topic - will write about {detected_year} using 2025/26 tax rules")
    else:
        # Default to current tax year context
        context_instruction = "accurate for the UK 2025/26 context"

    # === SYSTEM PROMPT (parametrized via config) ===
    system_prompt = config.BLOG_SYSTEM_PROMPT
    internal_links_block = "\n".join(config.INTERNAL_LINK_SLUGS)
    categories_list = "\n".join(config.POST_CATEGORIES)
    
    # Get contextually relevant audience link
    relevant_audience_link = config.get_relevant_audience_link(blog_topic)

    # Insert SITE_BASE_URL for {{BASE}} placeholder in the system prompt examples via separate user context.
    user_prompt = (
        f"""Main Blog Topic: {blog_topic}
Secondary Keywords:
""" + "\n".join([f"{i+1}. {kw}" for i, kw in enumerate(secondary_keywords)]) + f"""

Please return the following fields:

- ==name==
- ==slug==
- ==category==
- ==h1==
- ==meta-title==
- ==meta-description==
- ==3-liner==
- ==alt-tag==
- ==image-prompt==
- ==content==
- ==FAQ1==
- ==FAA1==
- ==FAQ2==
- ==FAA2==
- ==FAQ3==
- ==FAA3==
- ==FAQ4==
- ==FAA4==

The content field must be fully structured in raw HTML, following all instructions in the system prompt. The primary keyword (Main Blog Topic: {blog_topic}) Must be used naturally around 7-10 times in the content (content and context permitting), though as many times as can be done whilst still feeling natural. Secondary keywords should be used around 4-5 times each.

Internal linking is quite important:
Main URL: {config.SITE_BASE_URL} is the homepage so try to weave that in where relevant in to the content.

PRIORITY LINK: Based on the topic "{blog_topic}", the most relevant audience page is: 
{config.SITE_BASE_URL}{relevant_audience_link}
Use this as your primary audience-specific link when mentioning professional services or specialist support.

Other available internal links (use sparingly):
{internal_links_block}

{get_service_prompt_instructions()}

Try to get around 2-3 internal links in total, with the priority link being the most important.

Replace {{BASE}} with: {config.SITE_BASE_URL}

    The word count must be between 1100 and 1500 words to avoid it being considered loose or unspecialised. It also needs to be EEAT compliant, practical, and {context_instruction}."""
    )

    print(f"[→] Calling DeepSeek API for topic: {blog_topic}")

    response = client.chat.completions.create(
        model=config.LLM_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        stream=False,
        temperature=0.3,
        timeout=120  # Add 2 minute timeout
    )

    blog_output = response.choices[0].message.content
    
    # Replace any remaining {BASE} or {{BASE}} patterns with actual site URL
    blog_output = blog_output.replace("{BASE}", config.SITE_BASE_URL)
    blog_output = blog_output.replace("{{BASE}}", config.SITE_BASE_URL)
    
    # Validate and fix any incorrect service URLs the LLM might have generated
    blog_output, fixes = validate_and_fix_service_urls(blog_output)
    if fixes:
        print(f"[✓] Fixed {len(fixes)} incorrect service URLs:")
        for fix in fixes:
            print(f"    - {fix}")

    return blog_output