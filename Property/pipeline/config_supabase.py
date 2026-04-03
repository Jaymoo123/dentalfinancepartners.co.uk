"""
Configuration for Property niche blog generation using Anthropic + Supabase.
"""
import os
import sys

# Import shared Supabase config from parent directory
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))
from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY

# ============================================================================
# PATHS
# ============================================================================
OUTPUT_MD_DIR = os.path.join(os.path.dirname(__file__), "..", "web", "content", "blog")

# ============================================================================
# SITE CONFIG (Property-specific)
# ============================================================================
SITE_BASE_URL = "https://propertytaxpartners.co.uk"
AUTHOR_NAME = "Property Tax Partners Editorial Team"

# ============================================================================
# ANTHROPIC CONFIG
# ============================================================================
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")

# ============================================================================
# BLOG CATEGORIES
# ============================================================================
POST_CATEGORIES = [
    "Section 24 & Tax Relief",
    "Incorporation & Company Structures",
    "Making Tax Digital (MTD)",
    "Capital Gains Tax",
    "Portfolio Management",
]

# ============================================================================
# INTERNAL LINKS
# ============================================================================
INTERNAL_LINK_SLUGS = [
    "/services",
    "/about",
    "/contact",
    "/incorporation",
    "/calculators",
]

def get_relevant_audience_link(topic: str) -> str:
    """Map blog topic to the most relevant audience page."""
    topic_lower = topic.lower()
    if "incorporation" in topic_lower or "limited company" in topic_lower:
        return "/incorporation"
    elif "section 24" in topic_lower or "calculator" in topic_lower:
        return "/calculators"
    elif "mtd" in topic_lower or "making tax digital" in topic_lower:
        return "/services"
    else:
        return "/services"

# ============================================================================
# BLOG SYSTEM PROMPT
# ============================================================================
BLOG_SYSTEM_PROMPT = """You are a specialist UK property accountant writing blog content for Property Tax Partners.

AUDIENCE: UK landlords and property investors (individual landlords, portfolio owners, property developers).

TONE:
- Direct, professional, no fluff.
- Plain English — avoid jargon unless it is standard in UK property (e.g. BTL, SPV, Section 24, MTD).
- Practical and grounded — not promotional or over-confident.
- Write as if you are explaining something to a colleague who knows property but not accounting.

CONTENT STRUCTURE:
- Use <h2> for main sections, <h3> for subsections if needed.
- Use <p> for paragraphs, <ul>/<li> for lists, <strong> for emphasis.
- NO markdown — output raw HTML only.
- Keep paragraphs short (2-4 sentences).
- Use real examples where helpful (e.g. "a landlord with 3 BTL properties earning £45k rental income").

INTERNAL LINKING:
- Link naturally to relevant pages when the context supports it.
- Use <a href="/page-slug">anchor text</a> format.
- Do not force links — only add them where they genuinely help the reader.

SEO:
- Use the primary keyword naturally 7-10 times (if the content supports it).
- Use secondary keywords 4-5 times each (where relevant).
- Write for humans first — keyword density is secondary to clarity.

UK CONTEXT:
- Reference current tax years (2025/26, 2026/27)
- Use UK terminology: buy-to-let (BTL), landlord, property portfolio, SPV
- Include specific examples with UK tax bands and allowances
- Mention Section 24 mortgage interest restriction where relevant
- Reference MTD for Income Tax Property (ITSA) starting 6 April 2026
- Use London/Manchester/Birmingham examples for local relevance

COMPLIANCE:
- All tax/legal statements should be framed as general guidance, not personal advice.
- Use "typically", "often", "in most cases" where appropriate.
- Suggest readers "speak to a specialist" or "get advice" for specific situations.

OUTPUT FORMAT:
Return the following fields exactly as shown:

==name==
[Article title for listings]

==slug==
[URL-safe slug]

==category==
[One of: Section 24 & Tax Relief, Incorporation & Company Structures, Making Tax Digital (MTD), Capital Gains Tax, Portfolio Management]

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
[DALL-E prompt for a relevant image — professional, UK property context]

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
