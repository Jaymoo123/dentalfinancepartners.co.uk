# GitHub Actions Secrets Setup Guide

**Repository:** https://github.com/Jaymoo123/dentalfinancepartners.co.uk

## 🔑 Required Secrets

You need to add 3 essential secrets to enable automation:

### Step-by-Step Instructions:

1. **Go to GitHub Secrets Page:**
   ```
   https://github.com/Jaymoo123/dentalfinancepartners.co.uk/settings/secrets/actions
   ```

2. **Click "New repository secret"** for each of the following:

---

### Secret 1: ANTHROPIC_API_KEY

**Name:** `ANTHROPIC_API_KEY`

**Value:** Copy from your `.env` file (line 8)
```
sk-ant-api03-[YOUR_KEY_HERE]
```

---

### Secret 2: SUPABASE_URL

**Name:** `SUPABASE_URL`

**Value:** Copy from your `.env` file (line 13)
```
https://[YOUR_PROJECT_ID].supabase.co
```

---

### Secret 3: SUPABASE_KEY

**Name:** `SUPABASE_KEY`

**Value:** Copy from your `.env` file (line 14)
```
eyJhbGci[YOUR_KEY_HERE]
```

---

## ✅ Verification

After adding all 3 secrets, you should see them listed on the secrets page:
- ANTHROPIC_API_KEY
- SUPABASE_URL
- SUPABASE_KEY

## 🚀 What Happens Next

Once secrets are added:
1. Commit and push the workflow files
2. GitHub Actions will be enabled
3. Daily automation starts at 6 AM UTC
4. System generates content automatically

## 📋 Optional Secrets (Add Later)

For enhanced features, you can add:

### For Automatic Deployment:
- `VERCEL_TOKEN` - Get from https://vercel.com/account/tokens
- `VERCEL_ORG_ID` - From Vercel project settings
- `VERCEL_PROJECT_ID` - From Vercel project settings

### For Analytics:
- `GA4_PROPERTY_ID` - Already have: G-273RJY0LZQ
- `GA4_CREDENTIALS` - Service account JSON (single line)

### For Alerts:
- `SLACK_WEBHOOK` - Slack incoming webhook URL
- `DISCORD_WEBHOOK` - Discord webhook URL

---

## 🧪 Testing

After adding secrets, test with manual trigger:
1. Go to: https://github.com/Jaymoo123/dentalfinancepartners.co.uk/actions
2. Click "Daily Content Pipeline"
3. Click "Run workflow"
4. Select branch: main
5. Click "Run workflow"

Expected: Workflow runs successfully, generates content, commits to repo

---

**Time Required:** 5 minutes  
**Cost:** $0 (just configuration)  
**Next Step:** Add the 3 secrets, then I'll help you test!
