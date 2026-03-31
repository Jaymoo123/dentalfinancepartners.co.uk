#!/usr/bin/env python3
"""
GSC Optimization System - Setup Verification
Checks that all components are properly configured

Usage:
    python agents/verify_gsc_setup.py
"""

import sys
import os

# Add project root to path
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)

from pathlib import Path


def check_files():
    """Check that all required files exist."""
    print("\n[1/7] Checking files...")
    
    required_files = [
        'agents/config/gsc_config.py',
        'agents/utils/gsc_client_oauth.py',
        'agents/utils/gsc_fetcher.py',
        'agents/utils/gsc_indexing_monitor.py',
        'agents/utils/gsc_analyzer.py',
        'agents/utils/performance_tracker.py',
        'agents/utils/content_expander.py',
        'agents/utils/deepseek_client.py',
        'agents/review_gsc_opportunities.py',
        'agents/run_gsc_optimization_cycle.py',
        'supabase/migrations/20260331134247_create_gsc_optimization_tables.sql',
    ]
    
    missing = []
    for file_path in required_files:
        if not Path(file_path).exists():
            missing.append(file_path)
    
    if missing:
        print(f"[ERROR] Missing {len(missing)} files:")
        for file_path in missing:
            print(f"  - {file_path}")
        return False
    
    print(f"[OK] All {len(required_files)} required files exist")
    return True


def check_credentials():
    """Check that credentials are configured."""
    print("\n[2/7] Checking credentials...")
    
    issues = []
    
    # Check .env file
    if not Path('.env').exists():
        issues.append(".env file not found")
    else:
        # Check required env vars
        from dotenv import load_dotenv
        load_dotenv()
        
        required_vars = [
            'SUPABASE_URL',
            'SUPABASE_KEY',
            'ANTHROPIC_API_KEY',
            'OPENAI_API_KEY',
        ]
        
        for var in required_vars:
            if not os.getenv(var):
                issues.append(f"{var} not set in .env")
    
    # Check GSC credentials
    if not Path('secrets/gsc_credentials.json').exists():
        issues.append("secrets/gsc_credentials.json not found (OAuth client)")
    
    if issues:
        print(f"[ERROR] {len(issues)} credential issues:")
        for issue in issues:
            print(f"  - {issue}")
        return False
    
    print("[OK] All credentials configured")
    return True


def check_config():
    """Check configuration validity."""
    print("\n[3/7] Checking configuration...")
    
    try:
        from agents.config.gsc_config import validate_config, get_enabled_niches
        
        is_valid, errors = validate_config()
        
        if not is_valid:
            print(f"[ERROR] Configuration validation failed:")
            for error in errors:
                print(f"  - {error}")
            return False
        
        enabled = get_enabled_niches()
        print(f"[OK] Configuration valid")
        print(f"  Enabled sites: {', '.join(enabled)}")
        return True
    
    except Exception as e:
        print(f"[ERROR] Configuration check failed: {e}")
        return False


def check_gsc_connection():
    """Test GSC API connection."""
    print("\n[4/7] Testing GSC API connection...")
    
    try:
        from agents.utils.gsc_client_oauth import GSCClient
        
        client = GSCClient()
        
        # Try to list sites
        sites = client.service.sites().list().execute()
        site_urls = [site['siteUrl'] for site in sites.get('siteEntry', [])]
        
        print(f"[OK] GSC API connected")
        print(f"  Accessible sites: {len(site_urls)}")
        for site_url in site_urls[:3]:
            print(f"    - {site_url}")
        
        return True
    
    except FileNotFoundError:
        print("[ERROR] GSC credentials not found")
        print("  Run: python agents/utils/gsc_client_oauth.py")
        return False
    
    except Exception as e:
        print(f"[ERROR] GSC connection failed: {e}")
        return False


def check_supabase_connection():
    """Test Supabase connection."""
    print("\n[5/7] Testing Supabase connection...")
    
    try:
        import httpx
        from dotenv import load_dotenv
        load_dotenv()
        
        url = f"{os.getenv('SUPABASE_URL')}/rest/v1/"
        headers = {
            "apikey": os.getenv('SUPABASE_KEY'),
            "Authorization": f"Bearer {os.getenv('SUPABASE_KEY')}",
        }
        
        response = httpx.get(url, headers=headers, timeout=5.0)
        response.raise_for_status()
        
        print("[OK] Supabase connected")
        return True
    
    except Exception as e:
        print(f"[ERROR] Supabase connection failed: {e}")
        return False


def check_database_schema():
    """Check that database tables exist."""
    print("\n[6/7] Checking database schema...")
    
    try:
        import httpx
        from dotenv import load_dotenv
        load_dotenv()
        
        url = f"{os.getenv('SUPABASE_URL')}/rest/v1/"
        headers = {
            "apikey": os.getenv('SUPABASE_KEY'),
            "Authorization": f"Bearer {os.getenv('SUPABASE_KEY')}",
        }
        
        required_tables = [
            'gsc_page_performance',
            'blog_optimizations',
            'gsc_indexing_issues',
        ]
        
        missing_tables = []
        
        for table in required_tables:
            try:
                response = httpx.get(f"{url}{table}?limit=1", headers=headers, timeout=5.0)
                response.raise_for_status()
            except:
                missing_tables.append(table)
        
        if missing_tables:
            print(f"[ERROR] Missing {len(missing_tables)} tables:")
            for table in missing_tables:
                print(f"  - {table}")
            print("\n  Run migration in Supabase SQL Editor:")
            print("  supabase/migrations/20260331134247_create_gsc_optimization_tables.sql")
            return False
        
        print(f"[OK] All {len(required_tables)} tables exist")
        return True
    
    except Exception as e:
        print(f"[ERROR] Database check failed: {e}")
        return False


def check_ai_apis():
    """Test AI API connections."""
    print("\n[7/7] Testing AI API connections...")
    
    results = {'claude': False, 'deepseek': False}
    
    # Test Claude
    try:
        from anthropic import Anthropic
        from dotenv import load_dotenv
        load_dotenv()
        
        client = Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))
        
        # Simple test
        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=10,
            messages=[{"role": "user", "content": "Say 'OK'"}]
        )
        
        if message.content:
            print("[OK] Claude API connected")
            results['claude'] = True
    
    except Exception as e:
        print(f"[ERROR] Claude API failed: {e}")
    
    # Test DeepSeek
    try:
        from agents.utils.deepseek_client import DeepSeekClient
        
        client = DeepSeekClient()
        response = client.generate("Say 'OK'", max_tokens=10)
        
        if response:
            print("[OK] DeepSeek API connected")
            results['deepseek'] = True
    
    except Exception as e:
        print(f"[ERROR] DeepSeek API failed: {e}")
    
    return all(results.values())


def main():
    """Run all verification checks."""
    
    print("=" * 80)
    print("GSC OPTIMIZATION SYSTEM - SETUP VERIFICATION")
    print("=" * 80)
    
    checks = [
        ("Files", check_files),
        ("Credentials", check_credentials),
        ("Configuration", check_config),
        ("GSC API", check_gsc_connection),
        ("Supabase", check_supabase_connection),
        ("Database Schema", check_database_schema),
        ("AI APIs", check_ai_apis),
    ]
    
    results = {}
    
    for name, check_func in checks:
        try:
            results[name] = check_func()
        except Exception as e:
            print(f"\n[ERROR] {name} check crashed: {e}")
            results[name] = False
    
    # Summary
    print("\n" + "=" * 80)
    print("VERIFICATION SUMMARY")
    print("=" * 80)
    
    for name, passed in results.items():
        status = "[OK]" if passed else "[FAIL]"
        print(f"  {status} {name}")
    
    all_passed = all(results.values())
    
    if all_passed:
        print("\n[SUCCESS] All checks passed!")
        print("\nNext steps:")
        print("  1. Run first cycle: python agents/run_gsc_optimization_cycle.py property")
        print("  2. Review opportunities: python agents/review_gsc_opportunities.py property")
    else:
        print("\n[INCOMPLETE] Some checks failed. Fix issues above before proceeding.")
    
    print("=" * 80)
    
    return all_passed


if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
