"""
Supabase configuration for Solicitors niche blog generation.
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))
from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY

BLOG_TOPICS_TABLE = "blog_topics_solicitors"
SOURCE_IDENTIFIER = "solicitors"
WEB_CONTENT_PATH = "Solicitors/web/content/blog"

NICHE_CONFIG = {
    "niche_id": "solicitors",
    "display_name": "Accounts for Lawyers",
    "domain": "www.accountsforlawyers.co.uk",
    "blog_topics_table": BLOG_TOPICS_TABLE,
    "source_identifier": SOURCE_IDENTIFIER,
    "web_content_path": WEB_CONTENT_PATH,
}
