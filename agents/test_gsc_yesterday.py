#!/usr/bin/env python3
"""Test GSC API with yesterday's date specifically."""

import sys
sys.path.append('.')

from agents.utils.gsc_client_oauth import GSCClient
from datetime import datetime, timedelta

def main():
    print("=" * 80)
    print("GSC YESTERDAY TEST")
    print("=" * 80)
    
    try:
        client = GSCClient()
        print("\n[OK] Authentication successful!")
        
        site_url = 'sc-domain:propertytaxpartners.co.uk'
        
        # Test specific dates
        today = datetime.now().date()
        yesterday = today - timedelta(days=1)
        two_days_ago = today - timedelta(days=2)
        three_days_ago = today - timedelta(days=3)
        
        print(f"\n[INFO] Today is: {today}")
        print(f"[INFO] Testing site: {site_url}")
        
        test_ranges = [
            ("Today only", today, today),
            ("Yesterday only", yesterday, yesterday),
            ("2 days ago only", two_days_ago, two_days_ago),
            ("3 days ago only", three_days_ago, three_days_ago),
            ("Yesterday + Today", yesterday, today),
            ("Last 3 days", three_days_ago, today),
            ("Last 7 days", today - timedelta(days=7), today),
            ("March 29-30", datetime(2026, 3, 29).date(), datetime(2026, 3, 30).date()),
            ("March 30 only", datetime(2026, 3, 30).date(), datetime(2026, 3, 30).date()),
        ]
        
        for label, start, end in test_ranges:
            print(f"\n--- {label} ({start} to {end}) ---")
            
            request_body = {
                'startDate': start.strftime('%Y-%m-%d'),
                'endDate': end.strftime('%Y-%m-%d'),
                'dimensions': ['query', 'page'],
                'rowLimit': 25,
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
                    print(f"  [DATA FOUND!] {len(rows)} rows")
                    print(f"  Total impressions: {total_impressions}")
                    print(f"  Total clicks: {total_clicks}")
                    
                    print(f"\n  Top queries:")
                    for i, row in enumerate(rows[:10], 1):
                        query = row['keys'][0]
                        page = row['keys'][1] if len(row['keys']) > 1 else 'N/A'
                        impressions = row.get('impressions', 0)
                        clicks = row.get('clicks', 0)
                        position = row.get('position', 0)
                        ctr = row.get('ctr', 0)
                        print(f"    {i}. '{query}'")
                        print(f"       Page: {page}")
                        print(f"       Pos: {position:.1f}, Imp: {impressions}, Clicks: {clicks}, CTR: {ctr:.2%}")
                else:
                    print(f"  [NO DATA] 0 rows returned")
                    
            except Exception as e:
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
