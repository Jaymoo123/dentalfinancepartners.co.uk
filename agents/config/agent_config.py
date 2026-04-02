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
ACTIVE_NICHES = ["Dentists", "Property", "Medical", "Solicitors"]

NICHE_CONFIG = {
    "Dentists": {
        "enabled": True,
        "blog_topics_table": "blog_topics_dentists",
        "web_path": "Dentists/web",
        "source_identifier": "dentists",
        "ga4_measurement_id": "G-273RJY0LZQ",
        "ga4_property_id": "464353754",  # Numeric property ID from GA4 Admin → Property Settings
    },
    "Property": {
        "enabled": True,
        "blog_topics_table": "blog_topics_property",
        "web_path": "Property/web",
        "source_identifier": "property",
        "ga4_measurement_id": "G-B5MCP5NGMY",
        "ga4_property_id": "14279101919",  # From your screenshot: Stream ID 14279101919
    },
    "Medical": {
        "enabled": True,
        "blog_topics_table": "blog_topics_medical",
        "web_path": "Medical/web",
        "source_identifier": "medical",
        "ga4_measurement_id": "G-CQF7KFZ1P6",
        "ga4_property_id": "000000000",  # Update with numeric property ID from GA4 Admin
    },
    "Solicitors": {
        "enabled": True,
        "blog_topics_table": "blog_topics_solicitors",
        "web_path": "Solicitors/web",
        "source_identifier": "solicitors",
        "ga4_measurement_id": "G-N6ZPRB3DSQ",
        "ga4_property_id": "14301281732",
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
GA4_CREDENTIALS = os.getenv("GA4_CREDENTIALS")  # Service account JSON (shared across all properties)
SLACK_WEBHOOK = os.getenv("SLACK_WEBHOOK")
DISCORD_WEBHOOK = os.getenv("DISCORD_WEBHOOK")
VERCEL_TOKEN = os.getenv("VERCEL_TOKEN")
