# Analytics Setup Guide

Quick reference for completing the analytics configuration.

---

## Current Status

✅ **Working Now**:
- Dentists website: Tracking live with GA4 ID `G-273RJY0LZQ`
- Lead form conversion tracking on both sites
- Privacy policies and cookie notices
- Database schema ready

⚠️ **Needs Setup**:
- Property website: Replace placeholder GA4 ID
- Backend analytics: Add GA4 API credentials

---

## Task 1: Property GA4 Setup (5 minutes)

### Step 1: Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com)
2. Click **Admin** (gear icon, bottom left)
3. Click **Create Property**
4. Enter details:
   - **Property name**: Property Tax Partners
   - **Timezone**: United Kingdom
   - **Currency**: Pound Sterling (£)
5. Click **Next** → Complete business details → Click **Create**

### Step 2: Add Data Stream

1. Click **Data Streams**
2. Click **Add stream** → **Web**
3. Enter:
   - **Website URL**: `https://propertytaxpartners.co.uk`
   - **Stream name**: Property Tax Partners Website
4. Click **Create stream**
5. **Copy the Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 3: Update Configuration Files

Edit these two files and replace `G-PROPERTY-PLACEHOLDER`:

**File 1**: `Property/niche.config.json`
```json
{
  "seo": {
    "google_analytics_id": "G-XXXXXXXXXX"  // ← Replace with your ID
  }
}
```

**File 2**: `Property/web/niche.config.json`
```json
{
  "seo": {
    "google_analytics_id": "G-XXXXXXXXXX"  // ← Replace with your ID
  }
}
```

### Step 4: Deploy

```bash
git add Property/niche.config.json Property/web/niche.config.json
git commit -m "Add Property GA4 measurement ID"
git push
```

✅ **Done!** Property website will now track analytics.

---

## Task 2: Backend Analytics API Setup (30 minutes)

This enables automated content optimization and weekly reports.

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click project dropdown (top left) → **New Project**
3. Enter:
   - **Project name**: Analytics API Access
   - **Organization**: (your organization or leave blank)
4. Click **Create**
5. Wait for project creation, then select it

### Step 2: Enable Analytics Data API

1. In Google Cloud Console, go to **APIs & Services** → **Library**
2. Search for: `Google Analytics Data API`
3. Click on it → Click **Enable**
4. Wait for API to be enabled

### Step 3: Create Service Account

1. Go to **IAM & Admin** → **Service Accounts**
2. Click **Create Service Account**
3. Enter:
   - **Service account name**: `analytics-optimization-agent`
   - **Service account ID**: (auto-filled)
   - **Description**: "Reads GA4 data for content optimization"
4. Click **Create and Continue**
5. **Grant this service account access to project**:
   - Select role: **Viewer**
   - Click **Continue**
6. Click **Done**

### Step 4: Create Service Account Key

1. Click on the service account you just created
2. Go to **Keys** tab
3. Click **Add Key** → **Create new key**
4. Select **JSON** → Click **Create**
5. **Save the downloaded JSON file** (keep it secure!)

### Step 5: Grant GA4 Access

1. Go back to [Google Analytics](https://analytics.google.com)
2. Click **Admin** (gear icon)
3. Under **Property**, click **Property Access Management**
4. Click **+** (top right) → **Add users**
5. Enter the service account email:
   - Format: `analytics-optimization-agent@PROJECT-ID.iam.gserviceaccount.com`
   - Find it in the JSON file under `"client_email"`
6. Select role: **Viewer**
7. Click **Add**

**Repeat for both GA4 properties** (Dentists and Property)

### Step 6: Add Credentials to Environment

#### For Local Development

Edit `.env` file in project root:

```bash
# Copy the entire JSON file content as a single line
GA4_CREDENTIALS='{"type":"service_account","project_id":"your-project","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}'

# Use the numeric property ID (find in GA4 Admin → Property Settings)
GA4_PROPERTY_ID=123456789
```

**Important**: The JSON must be on a single line with escaped quotes.

#### For GitHub Actions

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add secret:
   - **Name**: `GA4_CREDENTIALS`
   - **Value**: Paste the entire JSON file content (can be multi-line here)
5. Click **Add secret**

The `GA4_PROPERTY_ID` secret should already exist. If not, add it with the numeric property ID.

### Step 7: Test

```bash
# Test weekly report generation
python agents/analytics_optimization_agent.py --mode weekly-report

# Test daily optimization
python agents/analytics_optimization_agent.py
```

If successful, you'll see:
```
=== Weekly Performance Report ===
Fetching GA4 data...
Analyzed X pages
...
```

✅ **Done!** Backend analytics automation is now operational.

---

## Verification Checklist

### Frontend Tracking
- [ ] Dentists website: Check GA4 real-time reports
- [ ] Property website: Check GA4 real-time reports (after setup)
- [ ] Test lead form submission → Check GA4 events
- [ ] No console errors in browser

### Backend Analytics
- [ ] Run weekly report manually (no errors)
- [ ] Check Supabase `seo_rankings` table for data
- [ ] GitHub Actions workflows run successfully
- [ ] Slack/Discord notifications received (if configured)

---

## Troubleshooting

### "Property not found" error
- Check that you're using the **numeric property ID**, not the measurement ID
- Find it in GA4: Admin → Property Settings → Property ID

### "Permission denied" error
- Verify service account email is added to GA4 property
- Check role is at least "Viewer"
- Wait 5-10 minutes for permissions to propagate

### "Invalid credentials" error
- Verify JSON is properly formatted (single line for .env)
- Check for escaped quotes and newlines in private key
- Ensure no extra spaces or line breaks

### No data in reports
- Verify websites have real traffic
- Check that GA4 properties are collecting data (Real-time reports)
- Ensure date range includes days with traffic

---

## Cost Considerations

### Google Cloud
- **Google Analytics Data API**: Free for up to 200,000 requests/day
- **Service Account**: Free
- **Current usage**: ~50 requests/day (well within free tier)

### Google Analytics
- **GA4**: Free (standard properties)
- **Data retention**: 14 months (default)
- **No additional costs**

---

## Security Notes

1. **Service Account Key**: Treat like a password
   - Never commit to git
   - Store securely (password manager)
   - Rotate annually

2. **GitHub Secrets**: Encrypted at rest
   - Only accessible to workflows
   - Not visible in logs

3. **Minimal Permissions**: Service account has "Viewer" only
   - Cannot modify GA4 data
   - Cannot delete properties
   - Read-only access

---

## Next Steps After Setup

1. **Monitor for 1 week**: Let data accumulate
2. **Review first weekly report**: Check metrics make sense
3. **Tune optimization thresholds**: Adjust in `analytics_optimization_agent.py`
4. **Set up custom events**: Track calculator usage, scroll depth, etc.
5. **Create GA4 audiences**: For remarketing and analysis

---

## Support Resources

- [Google Analytics Data API Docs](https://developers.google.com/analytics/devguides/reporting/data/v1)
- [Service Account Setup Guide](https://cloud.google.com/docs/authentication/getting-started)
- [GA4 Property Setup](https://support.google.com/analytics/answer/9304153)

---

**Last Updated**: 2026-03-30  
**Estimated Setup Time**: 35 minutes total  
**Difficulty**: Beginner-Intermediate
