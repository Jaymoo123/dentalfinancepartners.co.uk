#!/usr/bin/env python3
"""List all GSC properties and test each one."""

import sys
sys.path.append('.')

from agents.utils.gsc_client_oauth import GSCClient

def main():
    print("=" * 80)
    print("GSC ALL PROPERTIES TEST")
    print("=" * 80)
    
    try:
        client = GSCClient()
        print("\n[OK] Authentication successful!")
        
        # List all sites
        print("\nListing all accessible sites...")
        sites_list = client.service.sites().list().execute()
        site_entries = sites_list.get('siteEntry', [])
        
        print(f"\n[OK] Found {len(site_entries)} sites:")
        for i, site in enumerate(site_entries, 1):
            site_url = site.get('siteUrl')
            permission = site.get('permissionLevel', 'unknown')
            print(f"  {i}. {site_url} [{permission}]")
        
        # Now test each property-related and dental-related site
        target_sites = [
            s.get('siteUrl') for s in site_entries 
            if 'propertytax' in s.get('siteUrl', '').lower() 
            or 'dentalfinance' in s.get('siteUrl', '').lower()
        ]
        
        print("\n" + "=" * 80)
        print("TESTING PROPERTY & DENTAL SITES")
        print("=" * 80)
        
        for site_url in target_sites:
            print(f"\n--- {site_url} ---")
            try:
                summary = client.get_site_summary(site_url, days=28)
                print(f"  Last 28 days:")
                print(f"    Queries: {summary['total_queries']}")
                print(f"    Impressions: {summary['total_impressions']}")
                print(f"    Clicks: {summary['total_clicks']}")
                print(f"    Avg position: {summary['avg_position']:.1f}")
                
                if summary['total_impressions'] > 0:
                    opportunities = client.get_top_opportunities(site_url, days=28, min_impressions=1)
                    if opportunities:
                        print(f"\n    Top 5 queries:")
                        for i, opp in enumerate(opportunities[:5], 1):
                            print(f"      {i}. '{opp['query']}'")
                            print(f"         Pos: {opp['position']:.1f}, Imp: {opp['impressions']}, Clicks: {opp['clicks']}")
            
            except Exception as e:
                print(f"  [ERROR] {e}")
        
        print("\n" + "=" * 80)
        print("[SUCCESS] Complete!")
        print("=" * 80)
        
    except Exception as e:
        print(f"\n[ERROR] {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
