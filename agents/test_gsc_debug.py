#!/usr/bin/env python3
"""Debug GSC API to understand the data discrepancy."""

import sys
sys.path.append('.')

from agents.utils.gsc_client_oauth import GSCClient
from datetime import datetime, timedelta

def main():
    print("=" * 80)
    print("GSC DEBUG - Raw API Response Analysis")
    print("=" * 80)
    
    try:
        client = GSCClient()
        print("\n[OK] Authentication successful!")
        
        # Test the domain property that showed 71 impressions in web UI
        site_url = 'sc-domain:propertytaxpartners.co.uk'
        
        print(f"\n[TESTING] {site_url}")
        print("=" * 80)
        
        # Try different date ranges
        date_ranges = [
            ("Last 1 day", 1),
            ("Last 2 days", 2),
            ("Last 3 days", 3),
            ("Last 7 days", 7),
            ("Last 16 days", 16),  # Max freshness delay
        ]
        
        for label, days in date_ranges:
            print(f"\n--- {label} ---")
            
            end_date = datetime.now().date()
            start_date = end_date - timedelta(days=days)
            
            request_body = {
                'startDate': start_date.strftime('%Y-%m-%d'),
                'endDate': end_date.strftime('%Y-%m-%d'),
                'dimensions': ['query'],
                'rowLimit': 10,
            }
            
            print(f"  API Request: {start_date} to {end_date}")
            
            try:
                response = client.service.searchanalytics().query(
                    siteUrl=site_url,
                    body=request_body
                ).execute()
                
                rows = response.get('rows', [])
                
                if rows:
                    print(f"  [DATA FOUND] {len(rows)} queries returned")
                    total_impressions = sum(row.get('impressions', 0) for row in rows)
                    total_clicks = sum(row.get('clicks', 0) for row in rows)
                    print(f"  Total impressions: {total_impressions}")
                    print(f"  Total clicks: {total_clicks}")
                    print(f"\n  Top 5 queries:")
                    for i, row in enumerate(rows[:5], 1):
                        query = row['keys'][0]
                        impressions = row.get('impressions', 0)
                        clicks = row.get('clicks', 0)
                        position = row.get('position', 0)
                        print(f"    {i}. '{query}' - Pos: {position:.1f}, Imp: {impressions}, Clicks: {clicks}")
                else:
                    print(f"  [NO DATA] API returned 0 rows")
                    
            except Exception as e:
                print(f"  [ERROR] {e}")
        
        # Now check if there's a URL-prefix property we're missing
        print("\n" + "=" * 80)
        print("CHECKING FOR URL-PREFIX PROPERTIES")
        print("=" * 80)
        
        # Check if these exist (even though they weren't in the list)
        potential_urls = [
            'https://propertytaxpartners.co.uk/',
            'https://www.propertytaxpartners.co.uk/',
            'http://propertytaxpartners.co.uk/',
            'http://www.propertytaxpartners.co.uk/',
        ]
        
        for test_url in potential_urls:
            print(f"\n[TESTING] {test_url}")
            try:
                # Try to get site info
                request_body = {
                    'startDate': (datetime.now().date() - timedelta(days=7)).strftime('%Y-%m-%d'),
                    'endDate': datetime.now().date().strftime('%Y-%m-%d'),
                    'dimensions': ['query'],
                    'rowLimit': 1,
                }
                
                response = client.service.searchanalytics().query(
                    siteUrl=test_url,
                    body=request_body
                ).execute()
                
                rows = response.get('rows', [])
                if rows:
                    total_impressions = sum(row.get('impressions', 0) for row in rows)
                    print(f"  [FOUND] This property exists and has data! Impressions: {total_impressions}")
                else:
                    print(f"  [FOUND] This property exists but has no data")
                    
            except Exception as e:
                if '404' in str(e) or 'not found' in str(e).lower():
                    print(f"  [NOT FOUND] This property doesn't exist")
                elif '403' in str(e) or 'permission' in str(e).lower():
                    print(f"  [NO ACCESS] Property exists but you don't have permission")
                else:
                    print(f"  [ERROR] {e}")
        
        print("\n" + "=" * 80)
        print("[COMPLETE]")
        print("=" * 80)
        
    except Exception as e:
        print(f"\n[ERROR] {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
