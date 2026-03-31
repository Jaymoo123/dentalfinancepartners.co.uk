"""
Test GSC API Connection
Verifies service account can access GSC data
"""
import os
import sys
from datetime import datetime, timedelta
from google.oauth2 import service_account
from googleapiclient.discovery import build

# Configuration
SERVICE_ACCOUNT_FILE = 'secrets/gsc-service-account.json'
SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly']

# Sites to test
SITES = [
    'https://www.propertytaxpartners.co.uk',
    'https://www.dentalfinancepartners.co.uk'
]

def test_connection():
    """Test GSC API connection and permissions."""
    
    print("=" * 80)
    print("GOOGLE SEARCH CONSOLE API CONNECTION TEST")
    print("=" * 80)
    
    # Check if service account file exists
    if not os.path.exists(SERVICE_ACCOUNT_FILE):
        print(f"\n❌ ERROR: Service account file not found at: {SERVICE_ACCOUNT_FILE}")
        print("\nPlease:")
        print("1. Download the service account JSON from Google Cloud Console")
        print("2. Save it to: secrets/gsc-service-account.json")
        return False
    
    print(f"\n✅ Service account file found: {SERVICE_ACCOUNT_FILE}")
    
    # Load credentials
    try:
        credentials = service_account.Credentials.from_service_account_file(
            SERVICE_ACCOUNT_FILE,
            scopes=SCOPES
        )
        print("✅ Credentials loaded successfully")
    except Exception as e:
        print(f"\n❌ ERROR loading credentials: {e}")
        return False
    
    # Build service
    try:
        service = build('searchconsole', 'v1', credentials=credentials)
        print("✅ GSC service built successfully")
    except Exception as e:
        print(f"\n❌ ERROR building service: {e}")
        return False
    
    # Test each site
    all_passed = True
    
    for site_url in SITES:
        print(f"\n{'=' * 80}")
        print(f"Testing: {site_url}")
        print('=' * 80)
        
        # Test 1: List site
        try:
            sites_list = service.sites().list().execute()
            site_entries = sites_list.get('siteEntry', [])
            
            if any(s.get('siteUrl') == site_url for s in site_entries):
                print(f"✅ Site accessible: {site_url}")
            else:
                print(f"❌ Site NOT accessible: {site_url}")
                print("\nPossible reasons:")
                print("1. Service account not added to GSC property")
                print("2. Wrong site URL format")
                print(f"\nAvailable sites: {[s.get('siteUrl') for s in site_entries]}")
                all_passed = False
                continue
        
        except Exception as e:
            print(f"❌ ERROR listing sites: {e}")
            all_passed = False
            continue
        
        # Test 2: Fetch recent data
        try:
            end_date = datetime.now().date()
            start_date = end_date - timedelta(days=7)
            
            request = {
                'startDate': str(start_date),
                'endDate': str(end_date),
                'dimensions': ['query'],
                'rowLimit': 5
            }
            
            response = service.searchanalytics().query(
                siteUrl=site_url,
                body=request
            ).execute()
            
            rows = response.get('rows', [])
            
            if rows:
                print(f"✅ Data fetched: {len(rows)} queries in last 7 days")
                print("\nSample queries:")
                for i, row in enumerate(rows[:3], 1):
                    query = row['keys'][0]
                    impressions = row.get('impressions', 0)
                    clicks = row.get('clicks', 0)
                    print(f"  {i}. '{query}' - {impressions} impressions, {clicks} clicks")
            else:
                print(f"⚠️  No data yet (site might be too new)")
                print("   This is normal for sites submitted < 7 days ago")
        
        except Exception as e:
            print(f"❌ ERROR fetching data: {e}")
            all_passed = False
    
    # Summary
    print(f"\n{'=' * 80}")
    print("TEST SUMMARY")
    print('=' * 80)
    
    if all_passed:
        print("\n✅ SUCCESS! GSC API is fully configured and working.")
        print("\nNext steps:")
        print("1. Run: python agents/weekly_gsc_analysis.py")
        print("2. Check optimization queue in Supabase")
    else:
        print("\n❌ FAILED! Please fix the errors above.")
        print("\nCommon issues:")
        print("1. Service account not added to GSC properties")
        print("2. Wrong permissions (need 'Owner' or 'Full')")
        print("3. API not enabled in Google Cloud Console")
    
    return all_passed

if __name__ == "__main__":
    success = test_connection()
    sys.exit(0 if success else 1)
