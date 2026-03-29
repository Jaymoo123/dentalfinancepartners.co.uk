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

# Each niche has its own blog topics table
BLOG_TOPICS_DENTISTS = "blog_topics"
BLOG_TOPICS_PROPERTY = "blog_topics_property"

# ============================================================================
# NICHE SOURCE IDENTIFIERS
# ============================================================================
# These are used in the 'source' column of the leads table
SOURCE_DENTISTS = "dentists"
SOURCE_PROPERTY = "property"
