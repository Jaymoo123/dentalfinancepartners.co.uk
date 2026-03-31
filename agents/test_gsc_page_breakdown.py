#!/usr/bin/env python3
"""Get page-level breakdown since that dimension works."""

import sys
sys.path.append('.')

from agents.utils.gsc_client_oauth import GSCClient
from datetime import datetime, timedelta

def main():
    print("=" * 80)
    print("GSC PAGE BREAKDOWN TEST")
    print("=" * 80)
    
    try:
        client = GSCClient()
        print("\n[OK] Authentication successful!")
        
        site_url = 'sc-domain:propertytaxpartners.co.uk'
        
        # Test multiple date ranges with page dimension
        date_ranges = [
            ("Last 1 day", 1),
            ("Last 2 days", 2),
            ("Last 3 days", 3),
            ("Last 7 days", 7),
            ("Last 28 days", 28),
        ]
        
        for label, days in date_ranges:
            end_date = datetime.now().date()
            start_date = end_date - timedelta(days=days)
            
            print(f"\n{'=' * 80}")
            print(f"{label} ({start_date} to {end_date})")
            print(f"{'=' * 80}")
            
            request_body = {
                'startDate': start_date.strftime('%Y-%m-%d'),
                'endDate': end_date.strftime('%Y-%m-%d'),
                'dimensions': ['page'],
                'rowLimit': 100,
            }
            
            try:
                response = client.service.searchanalytics().query(
                    siteUrl=site_url,
                    body=request_body
                ).execute()
                
                rows = response.get('rows', [])
                
                if rows:
                    total_impressions = sum(row.get('impressions', 0) for row in rows)
                    total_clicks = sum(row.get('clicks', 0) for row in rows)
                    
                    print(f"[DATA] {len(rows)} pages")
                    print(f"Total impressions: {total_impressions}")
                    print(f"Total clicks: {total_clicks}")
                    
                    print(f"\nAll pages:")
                    for i, row in enumerate(rows, 1):
                        page = row['keys'][0]
                        impressions = row.get('impressions', 0)
                        clicks = row.get('clicks', 0)
                        position = row.get('position', 0)
                        ctr = row.get('ctr', 0)
                        print(f"  {i}. {page}")
                        print(f"     Pos: {position:.1f}, Imp: {impressions}, Clicks: {clicks}, CTR: {ctr:.2%}")
                else:
                    print(f"[NO DATA] 0 rows")
                    
            except Exception as e:
                print(f"[ERROR] {e}")
        
        print("\n" + "=" * 80)
        print("[COMPLETE]")
        print("=" * 80)
        
    except Exception as e:
        print(f"\n[ERROR] {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
