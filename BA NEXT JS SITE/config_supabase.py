"""
Configuration for blog generation using Anthropic + Supabase.
"""
import os

# ============================================================================
# PATHS
# ============================================================================
OUTPUT_MD_DIR = os.path.join(os.path.dirname(__file__), "../web/content/blog")

# ============================================================================
# SITE CONFIG
# ============================================================================
SITE_BASE_URL = "https://dentalfinancepartners.co.uk"
AUTHOR_NAME = "Dental Finance Partners"

# ============================================================================
# SUPABASE CONFIG
# ============================================================================
SUPABASE_URL = "https://dhlxwmvmkrfnmcgjbntk.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRobHh3bXZta3Jmbm1jZ2pibnRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0ODM0NjMsImV4cCI6MjA3NDA1OTQ2M30.hwUgd2x91wFqX8HKENztrXtGkabR21LPKhC-oxzuOA8"

# ============================================================================
# ANTHROPIC CONFIG
# ============================================================================
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")

# ============================================================================
# BLOG CATEGORIES
# ============================================================================
POST_CATEGORIES = [
    "Associate tax",
    "Practice finance",
    "Buying a practice",
    "Practice accounting",
    "VAT & compliance",
]

# ============================================================================
# INTERNAL LINKS
# ============================================================================
INTERNAL_LINK_SLUGS = [
    "/services",
    "/about",
    "/contact",
    "/blog/associate-dentist-tax-self-assessment-uk",
    "/blog/dental-practice-profit-extraction-uk",
    "/blog/nhs-private-mix-dental-accounts",
    "/blog/practice-acquisition-financial-due-diligence",
]

def get_relevant_audience_link(topic: str) -> str:
    """Map blog topic to the most relevant audience page."""
    topic_lower = topic.lower()
    if "associate" in topic_lower:
        return "/services"
    elif "owner" in topic_lower or "practice" in topic_lower:
        return "/services"
    elif "acquisition" in topic_lower or "buying" in topic_lower:
        return "/contact"
    else:
        return "/services"

# ============================================================================
# BLOG SYSTEM PROMPT
# ============================================================================
BLOG_SYSTEM_PROMPT = """You are a specialist UK dental accountant writing blog content for Dental Finance Partners.

AUDIENCE: UK dentists (associates, practice owners, multi-site groups).

TONE:
- Direct, professional, no fluff.
- Plain English — avoid jargon unless it is standard in UK dentistry (e.g. UDA, NHS contract, Self Assessment).
- Practical and grounded — not promotional or over-confident.
- Write as if you are explaining something to a colleague who knows dentistry but not accounting.

CONTENT STRUCTURE:
- Use <h2> for main sections, <h3> for subsections if needed.
- Use <p> for paragraphs, <ul>/<li> for lists, <strong> for emphasis.
- NO markdown — output raw HTML only.
- Keep paragraphs short (2-4 sentences).
- Use real examples where helpful (e.g. "an associate earning £80k with £6k in expenses").

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
[One of: Associate tax, Practice finance, Buying a practice, Practice accounting, VAT & compliance]

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
[DALL-E prompt for a relevant image — professional, UK dental context]

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
