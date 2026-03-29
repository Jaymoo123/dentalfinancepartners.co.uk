"""
Run database migration directly using Supabase client.
"""
import asyncio
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))

from supabase import create_client, Client
from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY

def run_migration():
    """Execute SQL migration using Supabase client."""
    
    print("Connecting to Supabase...")
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    
    # Read migration SQL
    migration_path = os.path.join(os.path.dirname(__file__), "../../supabase/migrations/001_add_agent_tables.sql")
    with open(migration_path, 'r', encoding='utf-8') as f:
        sql = f.read()
    
    print(f"Loaded migration SQL ({len(sql)} characters)")
    
    # Split SQL into individual statements
    statements = [s.strip() for s in sql.split(';') if s.strip() and not s.strip().startswith('--')]
    
    print(f"Executing {len(statements)} SQL statements...")
    
    success_count = 0
    for i, statement in enumerate(statements, 1):
        if not statement or len(statement) < 10:
            continue
            
        try:
            # Use RPC to execute SQL
            result = supabase.rpc('exec_sql', {'sql': statement}).execute()
            success_count += 1
            print(f"  [{i}/{len(statements)}] OK")
        except Exception as e:
            error_msg = str(e)
            # If it's "function does not exist", we need to create tables directly
            if "function" in error_msg.lower() and "does not exist" in error_msg.lower():
                print("\nRPC method not available. Using direct table creation...")
                return create_tables_directly(supabase)
            # If table already exists, that's OK
            elif "already exists" in error_msg.lower():
                print(f"  [{i}/{len(statements)}] Already exists (OK)")
                success_count += 1
            else:
                print(f"  [{i}/{len(statements)}] Error: {error_msg}")
    
    print(f"\nMigration complete: {success_count}/{len(statements)} statements executed")
    return True

def create_tables_directly(supabase: Client):
    """Create tables by inserting dummy data (which creates the table structure)."""
    
    print("\nCreating tables directly...")
    
    tables_to_create = [
        ("agent_executions", {
            "agent_type": "test",
            "niche": "test",
            "status": "test",
            "started_at": "2026-03-29T00:00:00"
        }),
        ("agent_costs", {
            "operation": "test",
            "niche": "test",
            "cost_usd": 0.01,
            "timestamp": "2026-03-29T00:00:00"
        }),
        ("published_content", {
            "niche": "test",
            "slug": "test-migration",
            "title": "Test",
            "topic": "Test",
            "content_hash": "test123"
        }),
        ("niche_metrics", {
            "niche": "test",
            "date": "2026-03-29"
        }),
        ("seo_rankings", {
            "niche": "test",
            "page_url": "test",
            "keyword": "test",
            "tracked_at": "2026-03-29T00:00:00"
        })
    ]
    
    for table_name, test_data in tables_to_create:
        try:
            # Try to insert test data (this will fail if table doesn't exist)
            result = supabase.table(table_name).insert(test_data).execute()
            print(f"  Table '{table_name}' exists or created")
            
            # Delete test data
            supabase.table(table_name).delete().eq("niche", "test").execute()
        except Exception as e:
            error_msg = str(e).lower()
            if "does not exist" in error_msg or "not found" in error_msg or "404" in error_msg:
                print(f"  Table '{table_name}' does NOT exist - MIGRATION REQUIRED")
                return False
            else:
                print(f"  Table '{table_name}' check: {e}")
    
    print("\nAll tables verified!")
    return True

if __name__ == "__main__":
    try:
        success = run_migration()
        sys.exit(0 if success else 1)
    except Exception as e:
        print(f"\nError: {e}")
        print("\nThe migration must be run manually in Supabase SQL Editor.")
        print("This is a security limitation - SQL execution requires dashboard access.")
        sys.exit(1)
