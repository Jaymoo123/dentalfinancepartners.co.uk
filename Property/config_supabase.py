"""
Configuration for Property/Landlord niche blog generation using Anthropic + Supabase.
"""
import os
import sys

# Import shared Supabase config from parent directory
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY

# ============================================================================
# PATHS
# ============================================================================
OUTPUT_MD_DIR = os.path.join(os.path.dirname(__file__), "web/content/blog")

# ============================================================================
# SITE CONFIG (Property/Landlord-specific)
# ============================================================================
SITE_BASE_URL = "https://propertyaccountants.co.uk"  # TODO: Update with actual domain
AUTHOR_NAME = "Property Finance Partners"  # TODO: Update with actual brand name

# ============================================================================
# ANTHROPIC CONFIG
# ============================================================================
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")

# ============================================================================
# BLOG CATEGORIES (Property/Landlord-specific)
# ============================================================================
POST_CATEGORIES = [
    "Landlord tax",
    "Property finance",
    "Buy-to-let accounting",
    "Capital gains tax",
    "Property compliance",
]

# ============================================================================
# INTERNAL LINKS (Property-specific)
# ============================================================================
INTERNAL_LINK_SLUGS = [
    "/services",
    "/about",
    "/contact",
    "/blog/landlord-tax-return-uk",
    "/blog/property-portfolio-accounting",
    "/blog/buy-to-let-mortgage-interest-relief",
    "/blog/capital-gains-tax-property-sale",
]

def get_relevant_audience_link(topic: str) -> str:
    """Map blog topic to the most relevant audience page."""
    topic_lower = topic.lower()
    if "landlord" in topic_lower or "rental" in topic_lower:
        return "/services"
    elif "portfolio" in topic_lower or "property" in topic_lower:
        return "/services"
    elif "capital gains" in topic_lower or "selling" in topic_lower:
        return "/contact"
    else:
        return "/services"

# ============================================================================
# BLOG SYSTEM PROMPT (Property/Landlord-specific)
# ============================================================================
BLOG_SYSTEM_PROMPT = """You are a specialist UK property accountant writing blog content for Property Finance Partners.

AUDIENCE: UK landlords (individual landlords, portfolio owners, property investors).

TONE:
- Direct, professional, no fluff.
- Plain English — avoid jargon unless it is standard in UK property investment (e.g. BTL, HMO, Section 24, Capital Allowances).
- Practical and grounded — not promotional or over-confident.
- Write as if you are explaining something to a colleague who knows property investment but not accounting.

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
[One of: Landlord tax, Property finance, Buy-to-let accounting, Capital gains tax, Property compliance]

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
[DALL-E prompt for a relevant image — professional, UK property/landlord context]

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
