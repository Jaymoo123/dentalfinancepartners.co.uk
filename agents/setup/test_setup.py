"""
Test script to verify agent system setup.
Run this to check if everything is configured correctly.
"""
import os
import sys
import asyncio

# Add parent directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))

async def test_setup():
    """Test all system components."""
    print("=" * 80)
    print("AGENT SYSTEM SETUP TEST")
    print("=" * 80)
    print()
    
    all_passed = True
    
    # 1. Check environment variables
    print("1. Checking environment variables...")
    required_vars = [
        "ANTHROPIC_API_KEY",
        "SUPABASE_URL",
        "SUPABASE_KEY",
    ]
    
    optional_vars = [
        "GA4_PROPERTY_ID",
        "GA4_CREDENTIALS",
        "VERCEL_TOKEN",
        "SLACK_WEBHOOK",
        "DISCORD_WEBHOOK",
    ]
    
    for var in required_vars:
        if os.getenv(var):
            print(f"   ✅ {var}")
        else:
            print(f"   ❌ {var} - MISSING (required)")
            all_passed = False
    
    for var in optional_vars:
        if os.getenv(var):
            print(f"   ✅ {var}")
        else:
            print(f"   ⚠️  {var} - Not set (optional)")
    
    print()
    
    # 2. Test Supabase connection
    print("2. Testing Supabase connection...")
    try:
        from agents.utils.supabase_client import SupabaseClient
        from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY
        
        supabase = SupabaseClient(SUPABASE_URL, SUPABASE_KEY)
        
        # Try to query blog_topics
        topics = await supabase.select("blog_topics", limit=1)
        print(f"   ✅ Connected to Supabase")
        print(f"   ✅ blog_topics table accessible")
        
        # Try to query agent tables (will fail if migration not run)
        try:
            executions = await supabase.select("agent_executions", limit=1)
            print(f"   ✅ agent_executions table exists")
        except Exception as e:
            print(f"   ❌ agent_executions table missing - Run database migration!")
            all_passed = False
        
    except Exception as e:
        print(f"   ❌ Supabase connection failed: {e}")
        all_passed = False
    
    print()
    
    # 3. Test Anthropic API
    print("3. Testing Anthropic API...")
    try:
        from anthropic import Anthropic
        
        anthropic = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
        
        # Simple test call
        message = await asyncio.to_thread(
            anthropic.messages.create,
            model="claude-sonnet-4-20250514",
            max_tokens=10,
            messages=[{"role": "user", "content": "Say 'test'"}]
        )
        
        print(f"   ✅ Anthropic API working")
        
    except Exception as e:
        print(f"   ❌ Anthropic API failed: {e}")
        all_passed = False
    
    print()
    
    # 4. Check file structure
    print("4. Checking file structure...")
    required_files = [
        "agents/coordinator.py",
        "agents/blog_generation_agent.py",
        "agents/content_research_agent.py",
        "agents/analytics_optimization_agent.py",
        "agents/config/cost_limits.py",
        "agents/utils/cost_tracker.py",
        "agents/utils/quality_checker.py",
        "agents/utils/deduplication_checker.py",
        "supabase/migrations/001_add_agent_tables.sql",
        ".github/workflows/daily-content-pipeline.yml",
    ]
    
    for file in required_files:
        full_path = os.path.join(os.path.dirname(__file__), "../..", file)
        if os.path.exists(full_path):
            print(f"   ✅ {file}")
        else:
            print(f"   ❌ {file} - MISSING")
            all_passed = False
    
    print()
    
    # 5. Check niche configuration
    print("5. Checking niche configuration...")
    try:
        from agents.config.agent_config import NICHE_CONFIG, ACTIVE_NICHES
        
        for niche in ACTIVE_NICHES:
            config = NICHE_CONFIG[niche]
            print(f"   ✅ {niche}: {config['blog_topics_table']}")
        
    except Exception as e:
        print(f"   ❌ Configuration error: {e}")
        all_passed = False
    
    print()
    
    # Summary
    print("=" * 80)
    if all_passed:
        print("✅ ALL TESTS PASSED")
        print()
        print("Next steps:")
        print("1. Run database migration in Supabase SQL Editor")
        print("2. Configure GitHub Actions secrets")
        print("3. Test manually: python agents/coordinator.py status")
        print("4. Enable GitHub Actions workflows")
    else:
        print("❌ SOME TESTS FAILED")
        print()
        print("Fix the issues above and run this test again.")
    print("=" * 80)

if __name__ == "__main__":
    asyncio.run(test_setup())
