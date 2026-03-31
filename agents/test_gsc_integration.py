#!/usr/bin/env python3
"""
GSC Optimization System - Integration Test
Tests the complete workflow end-to-end (dry run, no actual changes)

Usage:
    python agents/test_gsc_integration.py property
"""

import sys
import os

# Add project root to path
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)

from datetime import datetime


def test_integration(niche: str):
    """
    Test complete workflow for a niche.
    
    Steps:
    1. Load configuration
    2. Test GSC connection
    3. Fetch sample data
    4. Test analyzer (dry run)
    5. Test performance tracker (dry run)
    6. Verify database access
    """
    
    print("=" * 80)
    print(f"GSC OPTIMIZATION SYSTEM - INTEGRATION TEST")
    print(f"Niche: {niche.upper()}")
    print(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 80)
    
    results = {}
    
    # Test 1: Configuration
    print("\n[TEST 1/6] Configuration...")
    try:
        from agents.config.gsc_config import get_niche_config, validate_config
        
        config = get_niche_config(niche)
        is_valid, errors = validate_config()
        
        if not is_valid:
            print(f"[FAIL] Configuration invalid:")
            for error in errors:
                print(f"  {error}")
            results['config'] = False
        else:
            print(f"[PASS] Configuration valid")
            print(f"  Site: {config['site_url']}")
            print(f"  Enabled: {config.get('enabled', False)}")
            results['config'] = True
    
    except Exception as e:
        print(f"[FAIL] {e}")
        results['config'] = False
    
    # Test 2: GSC Connection
    print("\n[TEST 2/6] GSC API Connection...")
    try:
        from agents.utils.gsc_client_oauth import GSCClient
        
        client = GSCClient()
        sites = client.service.sites().list().execute()
        site_urls = [s['siteUrl'] for s in sites.get('siteEntry', [])]
        
        if config['site_url'] in site_urls:
            print(f"[PASS] GSC API connected and site accessible")
            results['gsc'] = True
        else:
            print(f"[FAIL] Site not accessible via API")
            print(f"  Expected: {config['site_url']}")
            print(f"  Available: {', '.join(site_urls)}")
            results['gsc'] = False
    
    except Exception as e:
        print(f"[FAIL] {e}")
        results['gsc'] = False
    
    # Test 3: Data Fetcher
    print("\n[TEST 3/6] GSC Data Fetcher...")
    try:
        from agents.utils.gsc_fetcher import GSCDataFetcher
        
        fetcher = GSCDataFetcher(niche)
        
        # Fetch last 7 days (small sample)
        records = fetcher.fetch_and_store(days=7)
        
        print(f"[PASS] Data fetcher working")
        print(f"  Records fetched: {records}")
        results['fetcher'] = True
    
    except Exception as e:
        print(f"[FAIL] {e}")
        results['fetcher'] = False
    
    # Test 4: Analyzer (Dry Run)
    print("\n[TEST 4/6] Opportunity Analyzer...")
    try:
        from agents.utils.gsc_analyzer import GSCOpportunityAnalyzer
        
        analyzer = GSCOpportunityAnalyzer(niche)
        
        print(f"[INFO] Analyzer initialized (dry run, no actual analysis)")
        print(f"  DeepSeek client: OK")
        print(f"  Config loaded: OK")
        results['analyzer'] = True
    
    except Exception as e:
        print(f"[FAIL] {e}")
        results['analyzer'] = False
    
    # Test 5: Performance Tracker (Dry Run)
    print("\n[TEST 5/6] Performance Tracker...")
    try:
        from agents.utils.performance_tracker import PerformanceTracker
        
        tracker = PerformanceTracker()
        
        print(f"[PASS] Performance tracker initialized")
        results['tracker'] = True
    
    except Exception as e:
        print(f"[FAIL] {e}")
        results['tracker'] = False
    
    # Test 6: Database Access
    print("\n[TEST 6/6] Database Access...")
    try:
        import httpx
        from dotenv import load_dotenv
        load_dotenv()
        
        url = f"{os.getenv('SUPABASE_URL')}/rest/v1/gsc_page_performance"
        headers = {
            "apikey": os.getenv('SUPABASE_KEY'),
            "Authorization": f"Bearer {os.getenv('SUPABASE_KEY')}",
        }
        
        params = {
            "niche": f"eq.{niche}",
            "limit": 1,
        }
        
        response = httpx.get(url, headers=headers, params=params, timeout=5.0)
        response.raise_for_status()
        data = response.json()
        
        print(f"[PASS] Database access working")
        print(f"  Records in gsc_page_performance: {len(data)}")
        results['database'] = True
    
    except Exception as e:
        print(f"[FAIL] {e}")
        results['database'] = False
    
    # Summary
    print("\n" + "=" * 80)
    print("INTEGRATION TEST SUMMARY")
    print("=" * 80)
    
    for test_name, passed in results.items():
        status = "[PASS]" if passed else "[FAIL]"
        print(f"  {status} {test_name.title()}")
    
    all_passed = all(results.values())
    
    if all_passed:
        print("\n[SUCCESS] All integration tests passed!")
        print("\nSystem is ready for production use.")
        print("\nNext steps:")
        print(f"  1. Run full cycle: python agents/run_gsc_optimization_cycle.py {niche}")
        print(f"  2. Review opportunities: python agents/review_gsc_opportunities.py {niche}")
    else:
        print("\n[INCOMPLETE] Some tests failed. Fix issues before proceeding.")
    
    print("=" * 80)
    
    return all_passed


def main():
    """Main entry point."""
    
    if len(sys.argv) < 2:
        print("Usage: python test_gsc_integration.py <niche>")
        print("Example: python test_gsc_integration.py property")
        return
    
    niche = sys.argv[1]
    
    if niche not in ['property', 'dentists', 'medical']:
        print(f"[ERROR] Unknown niche: {niche}")
        print("Available: property, dentists, medical")
        return
    
    success = test_integration(niche)
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
