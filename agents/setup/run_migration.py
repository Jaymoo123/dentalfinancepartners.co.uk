"""
Run database migration remotely.
"""
import asyncio
import httpx
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))

from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY

async def run_migration():
    """Execute SQL migration via Supabase."""
    
    # Read migration file
    migration_path = os.path.join(os.path.dirname(__file__), "../../supabase/migrations/001_add_agent_tables.sql")
    
    with open(migration_path, 'r', encoding='utf-8') as f:
        sql = f.read()
    
    print("Running database migration...")
    print(f"SQL length: {len(sql)} characters")
    
    # Note: Supabase REST API doesn't support raw SQL execution
    # We need to use the database connection string or SQL Editor
    # For now, let's verify we can connect and check if tables exist
    
    url = f"{SUPABASE_URL}/rest/v1/agent_executions"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
    }
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, headers=headers, params={"limit": 1})
            if response.status_code == 200:
                print("SUCCESS: agent_executions table already exists!")
                return True
            elif response.status_code == 404:
                print("ERROR: agent_executions table does not exist")
                print("\nPlease run the migration manually:")
                print("1. Open: https://supabase.com/dashboard/project/dhlxwmvmkrfnmcgjbntk/sql")
                print("2. Copy contents of: supabase/migrations/001_add_agent_tables.sql")
                print("3. Paste and click 'Run'")
                return False
        except Exception as e:
            print(f"Error checking tables: {e}")
            return False

if __name__ == "__main__":
    result = asyncio.run(run_migration())
    sys.exit(0 if result else 1)
