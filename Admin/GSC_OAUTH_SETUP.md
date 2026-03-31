# GSC OAuth Setup - Alternative to Service Account

**Issue:** Organization policy blocks service account key creation  
**Solution:** Use OAuth authentication instead (more secure anyway!)

---

## 🔵 STEP 5 (ALTERNATIVE): CREATE OAUTH CREDENTIALS

Since service account keys are blocked, we'll use OAuth Desktop App credentials.

### Do This Now:

1. **Go to**: https://console.cloud.google.com/apis/credentials

2. **Click**: "+ CREATE CREDENTIALS" (top)

3. **Select**: "OAuth client ID"

4. **Configure consent screen** (if prompted):
   - Click "CONFIGURE CONSENT SCREEN"
   - Select "External"
   - Click "CREATE"
   - Fill in:
     - App name: `GSC Content Optimizer`
     - User support email: (your email)
     - Developer contact: (your email)
   - Click "SAVE AND CONTINUE"
   - Click "SAVE AND CONTINUE" (skip scopes)
   - Click "SAVE AND CONTINUE" (skip test users)
   - Click "BACK TO DASHBOARD"

5. **Create OAuth Client ID**:
   - Go back to: https://console.cloud.google.com/apis/credentials
   - Click "+ CREATE CREDENTIALS" → "OAuth client ID"
   - Application type: **Desktop app**
   - Name: `gsc-content-optimizer-desktop`
   - Click "CREATE"

6. **Download Credentials**:
   - A popup appears with "Client ID" and "Client secret"
   - Click "DOWNLOAD JSON"
   - Save the file

---

## 🔵 STEP 6: SAVE OAUTH CREDENTIALS

Run these commands:

```powershell
# Find the downloaded OAuth credentials file
Get-ChildItem "$env:USERPROFILE\Downloads" -Filter "client_secret_*.json" | Select-Object -First 1 -ExpandProperty FullName
```

Copy the path, then:

```powershell
# Move and rename the file
Move-Item "PATH_FROM_ABOVE" "C:\Users\user\Documents\Accounting\secrets\gsc_credentials.json"

# Verify
Test-Path "secrets\gsc_credentials.json"
```

Should return: **True**

---

## 🔵 STEP 7: FIRST-TIME AUTHENTICATION

Run this command:

```powershell
cd C:\Users\user\Documents\Accounting
python agents/utils/gsc_client_oauth.py
```

### What Will Happen:

1. **Browser opens automatically**
2. **Google asks you to sign in** (use your GSC account)
3. **Google asks for permission** to access Search Console data
4. **Click "Allow"**
5. **Browser shows "Authentication successful"**
6. **Token saved** to `secrets/gsc_token.pickle`
7. **Test runs** and shows Property site data

### Expected Output:

```
================================================================================
GSC OAUTH CLIENT TEST
================================================================================

✅ Authentication successful!

Fetching data for: https://www.propertytaxpartners.co.uk

📊 Summary (last 7 days):
  Total queries: 42
  Total impressions: 1,234
  Total clicks: 56
  Avg CTR: 4.54%
  Avg position: 12.3

🎯 Top 5 Opportunities:
  1. 'section 24 calculator'
     Position: 6.2, Impressions: 450, CTR: 2.67%
     Page: /blog/section-24-tax-calculator
  
  2. 'landlord tax deductions'
     Position: 8.5, Impressions: 320, CTR: 3.12%
     Page: /blog/landlord-tax-deductions-uk-2026

✅ SUCCESS! GSC client is working.
```

---

## ✅ ADVANTAGES OF OAUTH

1. **More secure** - No key files to manage
2. **No organization policy issues** - Works with restricted accounts
3. **Easier rotation** - Just re-authenticate when token expires
4. **Better audit trail** - Shows which user accessed data

---

## 🔄 TOKEN REFRESH

The token lasts 7 days. When it expires:
- Just run the script again
- Browser opens for re-authentication
- Takes 30 seconds

---

## 📋 UPDATED CHECKLIST

- [x] Step 1: Install packages ✅
- [x] Step 2: Create Google Cloud project ✅
- [x] Step 3: Enable Search Console API ✅
- [x] Step 4: Create service account ✅ (not needed for OAuth)
- [ ] Step 5: Create OAuth credentials
- [ ] Step 6: Save OAuth credentials
- [ ] Step 7: First-time authentication
- [ ] Step 8: Test runs successfully

---

**Current Step:** Step 5 (Create OAuth credentials)  
**Next Action:** Follow Step 5 above to create OAuth client ID
