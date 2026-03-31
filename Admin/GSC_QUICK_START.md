# GSC API Quick Start - Do This Now

**Time:** 20-30 minutes  
**Goal:** Get GSC API working so you can analyze Property site search queries

---

## 🚀 STEP-BY-STEP (Follow in Order)

### 1. Install Python Packages (2 minutes)

```powershell
cd C:\Users\user\Documents\Accounting
pip install -r requirements.txt
```

Wait for installation to complete.

---

### 2. Create Google Cloud Project (5 minutes)

1. **Open**: https://console.cloud.google.com/
2. **Click**: Project dropdown (top left)
3. **Click**: "New Project"
4. **Enter**: 
   - Project name: `accounting-niches-gsc`
   - Click "Create"
5. **Wait**: 30 seconds for project creation
6. **Select**: The new project from dropdown

---

### 3. Enable Search Console API (2 minutes)

1. **Open**: https://console.cloud.google.com/apis/library
2. **Search**: `Search Console API`
3. **Click**: "Google Search Console API"
4. **Click**: Blue "ENABLE" button
5. **Wait**: 10-20 seconds

---

### 4. Create Service Account (5 minutes)

1. **Open**: https://console.cloud.google.com/apis/credentials
2. **Click**: "+ CREATE CREDENTIALS" (top)
3. **Select**: "Service account"
4. **Enter**:
   - Name: `gsc-content-optimizer`
   - Description: `Automated GSC data fetching`
5. **Click**: "CREATE AND CONTINUE"
6. **Click**: "CONTINUE" (skip role)
7. **Click**: "DONE"

---

### 5. Download Service Account Key (3 minutes)

1. **In Credentials page**, find the service account:
   - `gsc-content-optimizer@accounting-niches-gsc.iam.gserviceaccount.com`
2. **Click**: The email address
3. **Click**: "KEYS" tab (top)
4. **Click**: "ADD KEY" → "Create new key"
5. **Select**: JSON format
6. **Click**: "CREATE"
7. **File downloads**: `accounting-niches-gsc-XXXXX.json`

---

### 6. Save the Key File (2 minutes)

```powershell
# Move the downloaded file from Downloads to secrets/
# Replace XXXXX with your actual filename
Move-Item "$env:USERPROFILE\Downloads\accounting-niches-gsc-*.json" "C:\Users\user\Documents\Accounting\secrets\gsc-service-account.json"

# Verify it's there
Test-Path "secrets\gsc-service-account.json"
# Should return: True
```

---

### 7. Copy Service Account Email (1 minute)

**Copy this email** (you'll need it in next step):
```
gsc-content-optimizer@accounting-niches-gsc.iam.gserviceaccount.com
```

---

### 8. Add Service Account to Property GSC (3 minutes)

1. **Open**: https://search.google.com/search-console
2. **Select**: `https://www.propertytaxpartners.co.uk`
3. **Click**: Settings (gear icon, bottom left)
4. **Click**: "Users and permissions"
5. **Click**: "ADD USER" (top right)
6. **Paste**: `gsc-content-optimizer@accounting-niches-gsc.iam.gserviceaccount.com`
7. **Select**: Permission level: **Owner**
8. **Click**: "ADD"
9. **Verify**: Email appears in users list

---

### 9. Add Service Account to Dentists GSC (3 minutes)

Repeat Step 8 for:
- Select: `https://www.dentalfinancepartners.co.uk`
- Same service account email
- Permission: **Owner**

---

### 10. Test the Connection (2 minutes)

```powershell
cd C:\Users\user\Documents\Accounting
python agents/test_gsc_connection.py
```

### Expected Output:

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

================================================================================
TEST SUMMARY
================================================================================

✅ SUCCESS! GSC API is fully configured and working.
```

---

## ❌ IF TEST FAILS

### Error: "Service account file not found"

```powershell
# Check Downloads folder
Get-ChildItem "$env:USERPROFILE\Downloads" -Filter "accounting-niches-gsc-*.json"

# Move it manually
Move-Item "PATH_FROM_ABOVE" "secrets\gsc-service-account.json"
```

### Error: "Site NOT accessible"

**Cause**: Service account not added to GSC

**Fix**:
1. Go to Google Search Console
2. Settings → Users and permissions
3. Make sure service account email is listed
4. Permission must be "Owner" or "Full"
5. Wait 5 minutes, then test again

### Error: "API not enabled"

**Fix**:
1. Go to: https://console.cloud.google.com/apis/library
2. Make sure you're in the `accounting-niches-gsc` project
3. Search: "Search Console API"
4. Click "ENABLE"
5. Wait 1 minute, test again

---

## ✅ SUCCESS CHECKLIST

- [ ] Python packages installed
- [ ] Google Cloud project created
- [ ] Search Console API enabled
- [ ] Service account created
- [ ] Service account key downloaded
- [ ] Key saved to `secrets/gsc-service-account.json`
- [ ] Service account added to Property GSC (Owner permission)
- [ ] Service account added to Dentists GSC (Owner permission)
- [ ] Test script runs successfully
- [ ] Sample data displayed for Property site

---

## 🎯 WHAT'S NEXT?

Once the test passes, I'll help you:

1. **Create the GSC analyzer** - Smart categorization (optimize/expand/create)
2. **Set up Supabase tables** - Track optimization tasks
3. **Run first analysis** - See what opportunities exist in Property data
4. **Automate weekly** - GitHub Actions workflow

---

## 📞 NEED HELP?

If you get stuck:
1. Take a screenshot of the error
2. Check which step failed
3. Follow the troubleshooting guide above

Most common issue: Forgetting to add service account to GSC properties (Step 8-9)

---

**Last Updated:** 31 March 2026  
**Status:** Ready to execute  
**Start here**: Step 1 (Install packages)
