#!/usr/bin/env python3
"""Extended GSC test to check multiple date ranges and both sites."""

import sys
sys.path.append('.')

from agents.utils.gsc_client_oauth import GSCClient

def main():
    print("=" * 80)
    print("GSC EXTENDED TEST - Multiple Sites & Date Ranges")
    print("=" * 80)
    
    try:
        client = GSCClient()
        print("\n[OK] Authentication successful!")
        
        # Test both sites with multiple date ranges
        sites_to_test = [
            'sc-domain:propertytaxpartners.co.uk',
            'https://www.dentalfinancepartners.co.uk/',
        ]
        
        date_ranges = [7, 28, 90]
        
        for site_url in sites_to_test:
            print("\n" + "=" * 80)
            print(f"SITE: {site_url}")
            print("=" * 80)
            
            for days in date_ranges:
                print(f"\n--- Last {days} days ---")
                try:
                    summary = client.get_site_summary(site_url, days=days)
                    print(f"  Queries: {summary['total_queries']}")
                    print(f"  Impressions: {summary['total_impressions']}")
                    print(f"  Clicks: {summary['total_clicks']}")
                    print(f"  Avg CTR: {summary['avg_ctr']:.2%}")
                    print(f"  Avg position: {summary['avg_position']:.1f}")
                    
                    if summary['total_impressions'] > 0:
                        # Show top queries
                        opportunities = client.get_top_opportunities(site_url, days=days, min_impressions=1)
                        if opportunities:
                            print(f"\n  Top 3 queries:")
                            for i, opp in enumerate(opportunities[:3], 1):
                                print(f"    {i}. '{opp['query']}' - Pos: {opp['position']:.1f}, Imp: {opp['impressions']}")
                
                except Exception as e:
                    print(f"  [ERROR] {e}")
        
        print("\n" + "=" * 80)
        print("[SUCCESS] Test complete!")
        print("=" * 80)
        
    except Exception as e:
        print(f"\n[ERROR] {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
