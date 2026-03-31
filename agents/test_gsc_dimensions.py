#!/usr/bin/env python3
"""Test GSC API with different dimension configurations."""

import sys
sys.path.append('.')

from agents.utils.gsc_client_oauth import GSCClient
from datetime import datetime, timedelta
import json

def main():
    print("=" * 80)
    print("GSC DIMENSIONS TEST")
    print("=" * 80)
    
    try:
        client = GSCClient()
        print("\n[OK] Authentication successful!")
        
        site_url = 'sc-domain:propertytaxpartners.co.uk'
        
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=28)
        
        print(f"\n[TESTING] {site_url}")
        print(f"Date range: {start_date} to {end_date}")
        
        # Test different dimension combinations
        test_cases = [
            ("No dimensions (aggregate)", None),
            ("Query only", ['query']),
            ("Page only", ['page']),
            ("Query + Page", ['query', 'page']),
            ("Query + Date", ['query', 'date']),
            ("Date only", ['date']),
        ]
        
        for label, dimensions in test_cases:
            print(f"\n{'=' * 80}")
            print(f"TEST: {label}")
            print(f"{'=' * 80}")
            
            request_body = {
                'startDate': start_date.strftime('%Y-%m-%d'),
                'endDate': end_date.strftime('%Y-%m-%d'),
                'rowLimit': 25,
            }
            
            if dimensions:
                request_body['dimensions'] = dimensions
            
            try:
                response = client.service.searchanalytics().query(
                    siteUrl=site_url,
                    body=request_body
                ).execute()
                
                rows = response.get('rows', [])
                
                if rows:
                    total_impressions = sum(row.get('impressions', 0) for row in rows)
                    total_clicks = sum(row.get('clicks', 0) for row in rows)
                    
                    print(f"[DATA FOUND!] {len(rows)} rows")
                    print(f"Total impressions: {total_impressions}")
                    print(f"Total clicks: {total_clicks}")
                    
                    print(f"\nFirst 10 rows:")
                    for i, row in enumerate(rows[:10], 1):
                        keys = row.get('keys', [])
                        impressions = row.get('impressions', 0)
                        clicks = row.get('clicks', 0)
                        position = row.get('position', 0)
                        ctr = row.get('ctr', 0)
                        
                        if keys:
                            print(f"  {i}. Keys: {keys}")
                        else:
                            print(f"  {i}. [Aggregate]")
                        print(f"     Pos: {position:.1f}, Imp: {impressions}, Clicks: {clicks}, CTR: {ctr:.2%}")
                else:
                    print(f"[NO DATA] 0 rows returned")
                    
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
