"""Quick test of agent system."""
import asyncio
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))

from agents.utils.supabase_client import SupabaseClient
from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY

async def main():
    print("="*80)
    print("QUICK AGENT SYSTEM TEST")
    print("="*80)
    print()
    
    client = SupabaseClient(SUPABASE_URL, SUPABASE_KEY)
    
    # Test 1: Read agent_executions
    print("1. Testing agent_executions table...")
    try:
        result = await client.select("agent_executions", limit=5)
        print(f"   SUCCESS: Found {len(result)} executions")
    except Exception as e:
        print(f"   FAILED: {e}")
        return False
    
    # Test 2: Read agent_costs
    print("2. Testing agent_costs table...")
    try:
        result = await client.select("agent_costs", limit=5)
        print(f"   SUCCESS: Found {len(result)} cost records")
    except Exception as e:
        print(f"   FAILED: {e}")
        return False
    
    # Test 3: Read published_content
    print("3. Testing published_content table...")
    try:
        result = await client.select("published_content", limit=5)
        print(f"   SUCCESS: Found {len(result)} published posts")
    except Exception as e:
        print(f"   FAILED: {e}")
        return False
    
    # Test 4: Check blog_topics_dentists
    print("4. Checking blog_topics_dentists...")
    try:
        result = await client.select("blog_topics_dentists", filters={"used": False}, limit=5)
        print(f"   SUCCESS: Found {len(result)} unused topics")
    except Exception as e:
        print(f"   FAILED: {e}")
        return False
    
    print()
    print("="*80)
    print("ALL TESTS PASSED - Database is ready!")
    print("="*80)
    return True

if __name__ == "__main__":
    success = asyncio.run(main())
    sys.exit(0 if success else 1)
