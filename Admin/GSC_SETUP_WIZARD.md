# GSC API Setup Wizard - Follow These Steps

**Status:** Step 1 Complete ✅  
**Next:** Steps 2-10 (Google Cloud Console setup)

---

## ✅ STEP 1: INSTALL PACKAGES (COMPLETE)

Packages installed successfully!

---

## 🔵 STEP 2: CREATE GOOGLE CLOUD PROJECT

### Do This Now:

1. **Open this link**: https://console.cloud.google.com/projectcreate

2. **Fill in the form**:
   - Project name: `accounting-niches-gsc`
   - Organization: (leave as default)
   - Location: (leave as default)

3. **Click**: "CREATE"

4. **Wait**: 30 seconds for project creation

5. **Come back here when done** ✓

---

## 🔵 STEP 3: ENABLE SEARCH CONSOLE API

### Do This Now:

1. **Make sure you're in the right project**:
   - Look at top left of Google Cloud Console
   - Should say: `accounting-niches-gsc`
   - If not, click the dropdown and select it

2. **Open this link**: https://console.cloud.google.com/apis/library/searchconsole.googleapis.com

3. **Click**: Blue "ENABLE" button

4. **Wait**: 10-20 seconds

5. **You should see**: "API enabled" message

6. **Come back here when done** ✓

---

## 🔵 STEP 4: CREATE SERVICE ACCOUNT

### Do This Now:

1. **Open this link**: https://console.cloud.google.com/iam-admin/serviceaccounts/create

2. **Fill in Service account details**:
   - Service account name: `gsc-content-optimizer`
   - Service account ID: (auto-filled)
   - Description: `Automated GSC data fetching for content optimization`

3. **Click**: "CREATE AND CONTINUE"

4. **Grant this service account access to project** (Step 2):
   - Just click "CONTINUE" (skip this step)

5. **Grant users access to this service account** (Step 3):
   - Click "DONE"

6. **Come back here when done** ✓

---

## 🔵 STEP 5: DOWNLOAD SERVICE ACCOUNT KEY

### Do This Now:

1. **You should see the service accounts list**
   - If not, go to: https://console.cloud.google.com/iam-admin/serviceaccounts

2. **Find your service account**:
   - Email: `gsc-content-optimizer@accounting-niches-gsc.iam.gserviceaccount.com`
   - Click on the email address

3. **Click the "KEYS" tab** (top of page)

4. **Click**: "ADD KEY" → "Create new key"

5. **Select**: JSON

6. **Click**: "CREATE"

7. **A file will download**: `accounting-niches-gsc-XXXXX.json`
   - Note where it downloaded (usually Downloads folder)

8. **Come back here when done** ✓

---

## 🔵 STEP 6: SAVE THE KEY FILE

### Do This Now:

Run these commands in PowerShell:

```powershell
# Find the downloaded file
Get-ChildItem "$env:USERPROFILE\Downloads" -Filter "accounting-niches-gsc-*.json" | Select-Object -First 1 -ExpandProperty FullName
```

Copy the path that appears, then run:

```powershell
# Replace PATH_FROM_ABOVE with the actual path
Move-Item "PATH_FROM_ABOVE" "C:\Users\user\Documents\Accounting\secrets\gsc-service-account.json"

# Verify it's there
Test-Path "secrets\gsc-service-account.json"
```

Should return: **True**

**Come back here when done** ✓

---

## 🔵 STEP 7: COPY SERVICE ACCOUNT EMAIL

### Your Service Account Email:

```
gsc-content-optimizer@accounting-niches-gsc.iam.gserviceaccount.com
```

**Copy this email** - you'll need it in the next steps!

---

## 🔵 STEP 8: ADD TO PROPERTY GSC

### Do This Now:

1. **Open**: https://search.google.com/search-console

2. **Select property**: `https://www.propertytaxpartners.co.uk`
   - Click on it in the left sidebar

3. **Click**: Settings (gear icon, bottom left)

4. **Click**: "Users and permissions"

5. **Click**: "ADD USER" button (top right)

6. **Paste the email**:
   ```
   gsc-content-optimizer@accounting-niches-gsc.iam.gserviceaccount.com
   ```

7. **Select permission**: **Owner**

8. **Click**: "ADD"

9. **Verify**: Email appears in the users list

10. **Come back here when done** ✓

---

## 🔵 STEP 9: ADD TO DENTISTS GSC

### Do This Now:

Repeat Step 8 for the Dentists site:

1. **In Google Search Console**, select: `https://www.dentalfinancepartners.co.uk`

2. **Settings** → "Users and permissions"

3. **ADD USER**

4. **Paste email**:
   ```
   gsc-content-optimizer@accounting-niches-gsc.iam.gserviceaccount.com
   ```

5. **Permission**: **Owner**

6. **Click**: "ADD"

7. **Come back here when done** ✓

---

## 🔵 STEP 10: TEST THE CONNECTION

### Do This Now:

Run this command:

```powershell
cd C:\Users\user\Documents\Accounting
python agents/test_gsc_connection.py
```

### What You Should See:

```
✅ Service account file found
✅ Credentials loaded successfully
✅ GSC service built successfully

Testing: https://www.propertytaxpartners.co.uk
✅ Site accessible
✅ Data fetched: X queries

Testing: https://www.dentalfinancepartners.co.uk
✅ Site accessible
⚠️  No data yet (too new)

✅ SUCCESS! GSC API is fully configured and working.
```

---

## ❌ TROUBLESHOOTING

### If Step 6 fails (file not found):

```powershell
# Manually find the file
explorer "$env:USERPROFILE\Downloads"

# Look for: accounting-niches-gsc-XXXXX.json
# Drag it to: C:\Users\user\Documents\Accounting\secrets\
# Rename to: gsc-service-account.json
```

### If Step 10 fails (Site NOT accessible):

**Most common issue**: Forgot to add service account to GSC

**Fix**:
1. Go back to Google Search Console
2. Settings → Users and permissions
3. Make sure the service account email is there
4. Permission must be "Owner"
5. Wait 5 minutes for permissions to sync
6. Run test again

---

## 📋 PROGRESS TRACKER

- [x] Step 1: Install packages ✅
- [ ] Step 2: Create Google Cloud project
- [ ] Step 3: Enable Search Console API
- [ ] Step 4: Create service account
- [ ] Step 5: Download service account key
- [ ] Step 6: Save key file
- [ ] Step 7: Copy service account email
- [ ] Step 8: Add to Property GSC
- [ ] Step 9: Add to Dentists GSC
- [ ] Step 10: Test connection

---

**Current Step:** Step 2  
**Next Action:** Create Google Cloud project  
**Link:** https://console.cloud.google.com/projectcreate
