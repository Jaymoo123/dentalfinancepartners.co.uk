# Google Search Console API Setup Guide

**Date:** 31 March 2026  
**Goal:** Set up GSC API access for automated content optimization

---

## 📋 PREREQUISITES

- Google account with GSC access to your properties
- Access to Google Cloud Console
- Admin access to both dentalfinancepartners.co.uk and propertytaxpartners.co.uk in GSC

---

## 🚀 STEP-BY-STEP SETUP

### Step 1: Create Google Cloud Project (5 minutes)

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create New Project**
   - Click the project dropdown (top left)
   - Click "New Project"
   - Project name: `accounting-niches-gsc`
   - Click "Create"
   - Wait for project creation (30 seconds)

3. **Select Your Project**
   - Click the project dropdown again
   - Select `accounting-niches-gsc`

---

### Step 2: Enable Search Console API (2 minutes)

1. **Navigate to APIs & Services**
   - In the left menu, click "APIs & Services" → "Library"
   - Or visit: https://console.cloud.google.com/apis/library

2. **Search for Search Console API**
   - In the search box, type: `Search Console API`
   - Click on "Google Search Console API"

3. **Enable the API**
   - Click the blue "ENABLE" button
   - Wait for activation (10-20 seconds)
   - You should see "API enabled" message

---

### Step 3: Create Service Account (5 minutes)

1. **Navigate to Service Accounts**
   - Left menu: "APIs & Services" → "Credentials"
   - Or visit: https://console.cloud.google.com/apis/credentials

2. **Create Service Account**
   - Click "+ CREATE CREDENTIALS" (top)
   - Select "Service account"

3. **Service Account Details**
   - Service account name: `gsc-content-optimizer`
   - Service account ID: (auto-filled) `gsc-content-optimizer`
   - Description: `Automated GSC data fetching for content optimization`
   - Click "CREATE AND CONTINUE"

4. **Grant Permissions** (Optional - Skip)
   - Click "CONTINUE" (no role needed for GSC)

5. **Grant Users Access** (Optional - Skip)
   - Click "DONE"

---

### Step 4: Create Service Account Key (3 minutes)

1. **Find Your Service Account**
   - You should see `gsc-content-optimizer@accounting-niches-gsc.iam.gserviceaccount.com` in the list
   - Click on the email address

2. **Create Key**
   - Click the "KEYS" tab (top)
   - Click "ADD KEY" → "Create new key"

3. **Download Key**
   - Select "JSON" format
   - Click "CREATE"
   - **IMPORTANT**: A JSON file will download automatically
   - Filename: `accounting-niches-gsc-XXXXX.json`

4. **Save the Key File**
   - Move the downloaded JSON file to: `C:\Users\user\Documents\Accounting\secrets\`
   - Rename it to: `gsc-service-account.json`
   - **NEVER commit this file to git!**

---

### Step 5: Add Service Account to Google Search Console (5 minutes)

**CRITICAL**: The service account needs permission to access your GSC properties.

#### For Property Site:

1. **Open Google Search Console**
   - Visit: https://search.google.com/search-console
   - Select property: `https://www.propertytaxpartners.co.uk`

2. **Go to Settings**
   - Click "Settings" (gear icon, bottom left)

3. **Add User**
   - Click "Users and permissions"
   - Click "ADD USER" (top right)

4. **Enter Service Account Email**
   - Email address: `gsc-content-optimizer@accounting-niches-gsc.iam.gserviceaccount.com`
   - Permission: **Owner** (or at minimum "Full")
   - Click "ADD"

5. **Verify**
   - You should see the service account email in the users list

#### For Dentists Site:

Repeat the same steps for:
- Property: `https://www.dentalfinancepartners.co.uk`
- Service account: Same email as above

---

### Step 6: Create Secrets Directory (1 minute)

```powershell
# Create secrets directory
New-Item -ItemType Directory -Path "C:\Users\user\Documents\Accounting\secrets" -Force

# Move your downloaded key file here
# Rename it to: gsc-service-account.json

# Verify it exists
Test-Path "C:\Users\user\Documents\Accounting\secrets\gsc-service-account.json"
# Should return: True
```

---

### Step 7: Update .gitignore (1 minute)

Make sure secrets are never committed:

```powershell
# Check if secrets/ is in .gitignore
Get-Content .gitignore | Select-String "secrets"

# If not found, add it:
Add-Content .gitignore "`nsecrets/`n*.json"
```

---

### Step 8: Install Required Python Packages (2 minutes)

```powershell
# Install Google API client libraries
pip install google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client
```

---

## 🧪 STEP 9: TEST THE CONNECTION

### Create Test Script:

Save this as `agents/test_gsc_connection.py`:

```python
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
```

### Run the Test:

```powershell
python agents/test_gsc_connection.py
```

### Expected Output (Success):

```
================================================================================
GOOGLE SEARCH CONSOLE API CONNECTION TEST
================================================================================

✅ Service account file found: secrets/gsc-service-account.json
✅ Credentials loaded successfully
✅ GSC service built successfully

================================================================================
Testing: https://www.propertytaxpartners.co.uk
================================================================================
✅ Site accessible: https://www.propertytaxpartners.co.uk
✅ Data fetched: 5 queries in last 7 days

Sample queries:
  1. 'section 24 calculator' - 450 impressions, 12 clicks
  2. 'property tax accountant' - 320 impressions, 8 clicks
  3. 'landlord tax advice' - 180 impressions, 5 clicks

================================================================================
Testing: https://www.dentalfinancepartners.co.uk
================================================================================
✅ Site accessible: https://www.dentalfinancepartners.co.uk
⚠️  No data yet (site might be too new)
   This is normal for sites submitted < 7 days ago

================================================================================
TEST SUMMARY
================================================================================

✅ SUCCESS! GSC API is fully configured and working.

Next steps:
1. Run: python agents/weekly_gsc_analysis.py
2. Check optimization queue in Supabase
```

---

## 🔧 TROUBLESHOOTING

### Error: "Service account file not found"

**Solution:**
```powershell
# Check if file exists
Test-Path "secrets/gsc-service-account.json"

# If False, move your downloaded JSON file:
Move-Item "C:\Users\user\Downloads\accounting-niches-gsc-*.json" "secrets/gsc-service-account.json"
```

### Error: "Site NOT accessible"

**Cause:** Service account not added to GSC property

**Solution:**
1. Go to Google Search Console
2. Select the property
3. Settings → Users and permissions
4. Add the service account email with "Owner" permission
5. Wait 5 minutes for permissions to propagate
6. Run test again

### Error: "API not enabled"

**Solution:**
1. Go to: https://console.cloud.google.com/apis/library
2. Search: "Search Console API"
3. Click "ENABLE"
4. Wait 1 minute
5. Run test again

### Error: "Invalid JSON"

**Cause:** Service account file is corrupted or wrong format

**Solution:**
1. Re-download the key from Google Cloud Console
2. Make sure you selected "JSON" format
3. Don't edit the file manually
4. Replace the file in `secrets/`

---

## 🔐 SECURITY BEST PRACTICES

### ✅ DO:
- Store service account key in `secrets/` directory
- Add `secrets/` to `.gitignore`
- Use read-only scope (`webmasters.readonly`)
- Rotate keys every 90 days

### ❌ DON'T:
- Commit service account key to git
- Share the key file publicly
- Use write scopes unless necessary
- Store key in public directories

---

## 📊 WHAT'S NEXT?

Once the test passes, you can:

1. **Run GSC Analysis** (manual):
   ```powershell
   python agents/weekly_gsc_analysis.py --niche property
   ```

2. **Set up GitHub Actions** (automated):
   - Add `GSC_SERVICE_ACCOUNT` secret to GitHub
   - Enable weekly workflow
   - Runs every Monday at 9 AM

3. **Check Results**:
   - View optimization queue in Supabase
   - See new topics added from GSC queries
   - Monitor CTR improvements

---

## 📝 CHECKLIST

- [ ] Created Google Cloud project
- [ ] Enabled Search Console API
- [ ] Created service account
- [ ] Downloaded service account key JSON
- [ ] Saved key to `secrets/gsc-service-account.json`
- [ ] Added service account to Property GSC property
- [ ] Added service account to Dentists GSC property
- [ ] Updated `.gitignore`
- [ ] Installed Python packages
- [ ] Ran test script successfully
- [ ] Ready to run GSC analysis

---

**Last Updated:** 31 March 2026  
**Status:** Ready to implement  
**Estimated Time:** 20-30 minutes total
