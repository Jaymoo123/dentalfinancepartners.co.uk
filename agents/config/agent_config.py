"""
General agent configuration.
"""
import os

# ============================================================================
# AGENT SETTINGS
# ============================================================================
AGENT_CONFIG = {
    "enabled": True,
    "auto_publish": True,  # Publish content automatically
    "auto_retry": False,  # Don't retry on failure (alert only)
    "data_retention_days": 90,  # Keep logs for 90 days
}

# ============================================================================
# NICHE CONFIGURATION
# ============================================================================
ACTIVE_NICHES = ["Dentists", "Property"]

NICHE_CONFIG = {
    "Dentists": {
        "enabled": True,
        "blog_topics_table": "blog_topics",
        "web_path": "Dentists/web",
        "source_identifier": "dentists",
    },
    "Property": {
        "enabled": True,
        "blog_topics_table": "blog_topics_property",
        "web_path": "Property/web",
        "source_identifier": "property",
    },
}

# ============================================================================
# PATHS
# ============================================================================
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))
AGENTS_DIR = os.path.join(PROJECT_ROOT, "agents")
LOGS_DIR = os.path.join(AGENTS_DIR, "docs/logs")

# ============================================================================
# ENVIRONMENT VARIABLES
# ============================================================================
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
SUPABASE_URL = os.getenv("SUPABASE_URL", "https://dhlxwmvmkrfnmcgjbntk.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
GA4_PROPERTY_ID = os.getenv("GA4_PROPERTY_ID", "G-273RJY0LZQ")
GA4_CREDENTIALS = os.getenv("GA4_CREDENTIALS")  # Service account JSON
SLACK_WEBHOOK = os.getenv("SLACK_WEBHOOK")
DISCORD_WEBHOOK = os.getenv("DISCORD_WEBHOOK")
VERCEL_TOKEN = os.getenv("VERCEL_TOKEN")
