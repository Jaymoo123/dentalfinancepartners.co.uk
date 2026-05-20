"""
Shared Supabase configuration for all niche lead generation sites.
This file is used by all subfolders (Dentists, Property, etc.)
"""
import os
from pathlib import Path

# Load .env file if it exists
try:
    from dotenv import load_dotenv
    env_path = Path(__file__).parent / '.env'
    load_dotenv(env_path)
except ImportError:
    # dotenv not installed, rely on system environment variables
    pass

# ============================================================================
# SUPABASE CONFIG (Shared across all niches)
# ============================================================================
# Load from environment variables for security
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Validate required environment variables
if not SUPABASE_URL:
    raise ValueError("SUPABASE_URL environment variable is required. Create a .env file or set system environment variable.")
if not SUPABASE_KEY:
    raise ValueError("SUPABASE_KEY environment variable is required. Create a .env file or set system environment variable.")

# ============================================================================
# SHARED TABLES
# ============================================================================
# All niches funnel leads into the same table with a 'source' column
LEADS_TABLE = "leads"

# Post Phase 4 (2026-05-20): all sites share a single blog_topics table.
# Row-level isolation is via the `site_key` column. Callers MUST pass
# `site_key=eq.<site>` on every query — use `with_site_key()` below.
BLOG_TOPICS_TABLE = "blog_topics"

# Legacy per-site constants — kept as aliases for any historical code that
# still imports them. They now all resolve to the unified table. The
# `site_key` for filtering is the niche identifier (dentists, property, etc.).
# DO NOT use these in new code. Use BLOG_TOPICS_TABLE + with_site_key().
BLOG_TOPICS_DENTISTS = BLOG_TOPICS_TABLE
BLOG_TOPICS_PROPERTY = BLOG_TOPICS_TABLE
BLOG_TOPICS_MEDICAL = BLOG_TOPICS_TABLE
BLOG_TOPICS_SOLICITORS = BLOG_TOPICS_TABLE
BLOG_TOPICS_AGENCY = BLOG_TOPICS_TABLE
BLOG_TOPICS_GENERALIST = BLOG_TOPICS_TABLE


def with_site_key(site_key: str, params: dict | None = None) -> dict:
    """Return a params dict with `site_key=eq.<site_key>` merged in.

    Post Phase 4 all blog_topics queries MUST filter by site_key to avoid
    cross-site contamination. Use this helper everywhere a query is built:

        params = with_site_key("dentists", {"slug": f"eq.{slug}"})
        httpx.get(f"{SUPABASE_URL}/rest/v1/{BLOG_TOPICS_TABLE}", params=params)
    """
    if not site_key:
        raise ValueError("with_site_key requires a non-empty site_key")
    out = dict(params or {})
    out["site_key"] = f"eq.{site_key}"
    return out

# ============================================================================
# NICHE SOURCE IDENTIFIERS
# ============================================================================
# These are used in the 'source' column of the leads table
SOURCE_DENTISTS = "dentists"
SOURCE_PROPERTY = "property"
SOURCE_MEDICAL = "medical"
SOURCE_SOLICITORS = "solicitors"
SOURCE_AGENCY = "agency-founder-finance"
SOURCE_GENERALIST = "uk-business-accountants"
