#!/usr/bin/env python3
"""Make raw GSC API request to see exact response."""

import sys
sys.path.append('.')

from agents.utils.gsc_client_oauth import GSCClient
from datetime import datetime, timedelta
import json

def main():
    print("=" * 80)
    print("GSC RAW API REQUEST TEST")
    print("=" * 80)
    
    try:
        client = GSCClient()
        print("\n[OK] Authentication successful!")
        
        site_url = 'sc-domain:propertytaxpartners.co.uk'
        
        # Use a wide date range to catch any data
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=28)
        
        print(f"\n[TESTING] {site_url}")
        print(f"Date range: {start_date} to {end_date}")
        
        # Make the most basic request possible
        request_body = {
            'startDate': start_date.strftime('%Y-%m-%d'),
            'endDate': end_date.strftime('%Y-%m-%d'),
            'rowLimit': 100,
        }
        
        print(f"\n[REQUEST BODY]")
        print(json.dumps(request_body, indent=2))
        
        print(f"\n[SENDING REQUEST...]")
        response = client.service.searchanalytics().query(
            siteUrl=site_url,
            body=request_body
        ).execute()
        
        print(f"\n[RAW RESPONSE]")
        print(json.dumps(response, indent=2))
        
        rows = response.get('rows', [])
        print(f"\n[SUMMARY] Returned {len(rows)} rows")
        
        if not rows:
            print("\n[DIAGNOSIS]")
            print("  The API is returning 0 rows even though GSC web UI shows data.")
            print("\n  Possible causes:")
            print("  1. Data freshness delay (API lags behind web UI by 24-48 hours)")
            print("  2. You're viewing a different property in web UI")
            print("  3. The web UI date range is different from what we're testing")
            print("  4. There's a bug in the API request")
            print("\n  Next steps:")
            print("  - Verify the exact property name in GSC web UI dropdown")
            print("  - Check the exact date range in GSC web UI")
            print("  - Try again in 24 hours to see if data appears")
        
    except Exception as e:
        print(f"\n[ERROR] {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
