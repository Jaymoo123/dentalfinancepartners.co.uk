"""
Database setup script - Run this once to create all required tables.
"""
import os
import sys
import asyncio

# Add parent directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))

from agents.utils.supabase_client import SupabaseClient
from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY

async def setup():
    """Setup database tables and functions."""
    print("=== Database Setup ===")
    print("\nIMPORTANT: This script provides SQL to run manually.")
    print("Copy the SQL from supabase/migrations/001_add_agent_tables.sql")
    print("and run it in the Supabase SQL Editor:\n")
    print("https://supabase.com/dashboard/project/dhlxwmvmkrfnmcgjbntk/sql\n")
    
    # Test connection
    print("Testing Supabase connection...")
    supabase = SupabaseClient(SUPABASE_URL, SUPABASE_KEY)
    
    try:
        # Try to query existing tables
        result = await supabase.select("blog_topics", limit=1)
        print("✅ Connection successful!")
        print(f"   Found {len(result)} topics in blog_topics table")
    except Exception as e:
        print(f"❌ Connection failed: {e}")
        return
    
    print("\n=== Next Steps ===")
    print("1. Run the SQL migration in Supabase SQL Editor")
    print("2. Verify tables created: agent_executions, agent_costs, published_content, etc.")
    print("3. Set up GitHub Actions secrets")
    print("4. Test locally: python agents/coordinator.py status")

if __name__ == "__main__":
    asyncio.run(setup())
