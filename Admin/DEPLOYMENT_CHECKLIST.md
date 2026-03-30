# Deployment Checklist - Prevent Common Issues

**Purpose**: Ensure all placeholders are replaced and configurations are correct before deployment  
**Last Updated**: 2026-03-30

---

## Pre-Deployment Checklist

Use this checklist for **every new niche deployment** to avoid the issues we encountered with Dentists and Property sites.

---

## 1. Configuration Files

### Niche Config Files

Check BOTH files for each niche:

**Files to Check**:
- `[Niche]/niche.config.json`
- `[Niche]/web/niche.config.json`

**Required Updates**:

```json
{
  "domain": "www.yourdomain.co.uk",  // ✅ MUST include www subdomain
  "contact": {
    "email": "hello@yourdomain.co.uk",  // ✅ Replace placeholder
    "phone": "+44 20 XXXX XXXX"  // ✅ Replace placeholder
  },
  "seo": {
    "google_analytics_id": "G-XXXXXXXXXX",  // ❌ Replace "G-PROPERTY-PLACEHOLDER"
    "google_site_verification": "XXXXX",  // ✅ Get from Google Search Console
    "theme_color": "#XXXXXX"  // ✅ Set brand color
  }
}
```

**Common Mistakes**:
- ❌ Domain without www: `"domain": "yourdomain.co.uk"` → Causes robots.txt line breaks
- ❌ Placeholder GA ID: `"G-PROPERTY-PLACEHOLDER"` → Analytics won't work
- ❌ Missing verification code → Can't verify in GSC

---

## 2. Environment Variables

### Local Development (.env.local)

**File**: `[Niche]/web/.env.local`

```bash
# ✅ For local dev, use localhost
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# ✅ Must have real Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

**Check**:
- [ ] NEXT_PUBLIC_SITE_URL is localhost for local dev
- [ ] Supabase URL is real (not placeholder)
- [ ] Supabase key is real (not "your-anon-key-here")

### Vercel Production Environment

**Location**: Vercel Dashboard → Project → Settings → Environment Variables

**Required Variables**:

```bash
# ✅ CRITICAL: Must include www subdomain
NEXT_PUBLIC_SITE_URL=https://www.yourdomain.co.uk

# ✅ Must match local .env.local
NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

**Environment Selection**: Set for **Production** (at minimum)

**Common Mistakes**:
- ❌ Missing www: `https://yourdomain.co.uk` → Causes robots.txt issues
- ❌ Localhost URL in production → Breaks all metadata and sitemaps
- ❌ Wrong Supabase credentials → Lead forms won't work

---

## 3. Google Analytics Setup

### Create GA4 Property

**Before deploying**, create the GA4 property:

1. Go to https://analytics.google.com
2. Admin → Create Property
3. Property name: "[Niche] Website"
4. Timezone: United Kingdom
5. Currency: Pound Sterling (£)
6. Add data stream for your domain
7. **Copy the Measurement ID** (format: G-XXXXXXXXXX)

### Update Configuration

Replace placeholder in both niche.config.json files:

```json
{
  "seo": {
    "google_analytics_id": "G-XXXXXXXXXX"  // ← Your real GA4 ID
  }
}
```

**Test After Deployment**:
- Visit your site
- Open browser DevTools → Network tab
- Should see requests to `googletagmanager.com`
- Check GA4 Real-time reports for activity

---

## 4. Google Search Console Setup

### Add Property to GSC

**Before or immediately after deploying**:

1. Go to https://search.google.com/search-console
2. Click "Add property"
3. Enter: `https://www.yourdomain.co.uk` (with www!)
4. Choose verification method: **HTML tag**
5. Copy verification meta tag
6. Add to `niche.config.json`:

```json
{
  "seo": {
    "google_site_verification": "VERIFICATION_CODE_HERE"
  }
}
```

7. Commit, push, redeploy
8. Return to GSC and click "Verify"

### Submit Sitemap

After verification:
1. GSC → Sitemaps
2. Enter: `sitemap.xml`
3. Click Submit

---

## 5. Domain Configuration

### DNS Records (At Domain Registrar)

**For Vercel deployment**:

```
Type    Name    Value                    TTL
A       @       76.76.21.21             Auto
CNAME   www     cname.vercel-dns.com    Auto
```

**Check**:
- [ ] Root domain (@) points to Vercel
- [ ] www subdomain CNAME is set
- [ ] DNS propagation complete (use https://dnschecker.org)

### Vercel Domain Settings

**Location**: Vercel Dashboard → Project → Settings → Domains

**Add Both**:
1. `yourdomain.co.uk` (root)
2. `www.yourdomain.co.uk` (www subdomain)

**Set Primary**: Choose which one is primary (recommend: www)

**Redirect**: Set non-primary to redirect to primary

---

## 6. GitHub Secrets

### Required Secrets

**Location**: GitHub Repo → Settings → Secrets and variables → Actions

**Secrets Needed**:

```
ANTHROPIC_API_KEY=sk-ant-api03-...
SUPABASE_URL=https://yourproject.supabase.co
SUPABASE_KEY=eyJhbGci...
GA4_PROPERTY_ID=123456789  (numeric ID, not G-XXXXXX)
GA4_CREDENTIALS={"type":"service_account",...}  (optional, for analytics automation)
SLACK_WEBHOOK=https://hooks.slack.com/...  (optional)
```

**Check**:
- [ ] All secrets are set (not empty)
- [ ] Values match your .env file
- [ ] No placeholder values

---

## 7. Pre-Deployment Build Test

**Before deploying**, run local build:

```bash
cd [Niche]/web
npm run build
```

**Check Output**:
- [ ] Build completes successfully
- [ ] No TypeScript errors
- [ ] No ESLint errors (warnings OK)
- [ ] Correct number of static pages generated

**Check Generated Files**:

```bash
# Check robots.txt
cat .next/server/app/robots.txt.body

# Should show (no line breaks):
Sitemap: https://www.yourdomain.co.uk/sitemap.xml
```

---

## 8. Post-Deployment Verification

### Immediate Checks (Within 5 Minutes)

**Site Accessibility**:
```bash
curl -I https://www.yourdomain.co.uk
# Should return: 200 OK
```

**robots.txt**:
```bash
curl https://www.yourdomain.co.uk/robots.txt
# Check: No line breaks in sitemap URL
```

**sitemap.xml**:
```bash
curl https://www.yourdomain.co.uk/sitemap.xml | grep "<loc>" | head -5
# Check: All URLs are properly formatted (no line breaks)
```

**Google Analytics**:
- Visit your site
- Open DevTools → Network tab
- Filter: "gtag"
- Should see requests to Google Analytics

**Lead Form**:
- Submit a test lead
- Check Google Apps Script execution log
- Verify data appears in spreadsheet

### Within 24 Hours

**Google Search Console**:
- [ ] Sitemap submitted
- [ ] Verification successful
- [ ] No crawl errors
- [ ] robots.txt shows as "Fetched"

**Vercel Analytics**:
- [ ] Check for any 404 errors
- [ ] Verify all pages are accessible
- [ ] Check response times

---

## 9. Common Issues & Solutions

### Issue: robots.txt Has Line Breaks

**Cause**: Domain in niche.config.json doesn't include www subdomain

**Fix**:
1. Update `niche.config.json`: `"domain": "www.yourdomain.co.uk"`
2. Update Vercel env var: `NEXT_PUBLIC_SITE_URL=https://www.yourdomain.co.uk`
3. Redeploy without cache

### Issue: Google Analytics Not Tracking

**Cause**: Using placeholder GA ID

**Fix**:
1. Create GA4 property
2. Update niche.config.json with real ID
3. Redeploy

### Issue: Lead Form Not Working

**Cause**: Supabase credentials not set in Vercel

**Fix**:
1. Add NEXT_PUBLIC_SUPABASE_URL to Vercel
2. Add NEXT_PUBLIC_SUPABASE_ANON_KEY to Vercel
3. Redeploy

### Issue: Site Not Accessible

**Cause**: DNS not configured or not propagated

**Fix**:
1. Check DNS records at registrar
2. Wait for propagation (up to 48 hours)
3. Use https://dnschecker.org to verify

---

## 10. Placeholder Tracking Sheet

### Current Status (2026-03-30)

| Item | Dentists | Property | Notes |
|------|----------|----------|-------|
| Domain (www) | ✅ www.dentalfinancepartners.co.uk | ✅ www.propertytaxpartners.co.uk | Fixed 2026-03-30 |
| GA4 ID | ✅ G-273RJY0LZQ | ❌ G-PROPERTY-PLACEHOLDER | Need to create |
| GSC Verification | ✅ Verified | ⚠️ Added, not verified | Need to verify |
| Site Live | ✅ Live | ⚠️ Deployed but not accessible | Check DNS/Vercel |
| Vercel NEXT_PUBLIC_SITE_URL | ✅ Set with www | ⚠️ Check value | Must include www |
| Supabase Credentials | ✅ Set | ⚠️ Check | Required for forms |
| GA4 API Credentials | ❌ Not set | ❌ Not set | Optional (for automation) |

### Action Items

**Dentists**:
- [x] Fix robots.txt line breaks
- [x] Update domain to include www
- [ ] Submit sitemap to GSC
- [ ] Wait for indexing

**Property**:
- [x] Update domain to include www
- [ ] Create GA4 property and get real ID
- [ ] Verify site is accessible
- [ ] Verify GSC ownership
- [ ] Submit sitemap to GSC

---

## 11. New Niche Deployment Template

When adding a new niche, use this checklist:

### Phase 1: Configuration (Before Deployment)
- [ ] Create niche.config.json with www subdomain
- [ ] Set real email and phone (no placeholders)
- [ ] Create GA4 property and add real measurement ID
- [ ] Add property to Google Search Console
- [ ] Get GSC verification code
- [ ] Update niche.config.json with verification code
- [ ] Set up Google Apps Script for lead forms
- [ ] Test local build (check robots.txt output)

### Phase 2: Vercel Setup
- [ ] Create new Vercel project
- [ ] Set root directory to `[Niche]/web`
- [ ] Add environment variables (with www subdomain!)
- [ ] Configure custom domain
- [ ] Add both root and www subdomain
- [ ] Set up domain redirect (non-www → www or vice versa)

### Phase 3: DNS Configuration
- [ ] Add A record for root domain
- [ ] Add CNAME for www subdomain
- [ ] Wait for propagation (check with dnschecker.org)
- [ ] Verify both URLs work

### Phase 4: Post-Deployment
- [ ] Verify site loads at www.yourdomain.co.uk
- [ ] Check robots.txt (no line breaks)
- [ ] Check sitemap.xml (all URLs formatted correctly)
- [ ] Test lead form submission
- [ ] Verify GA4 tracking in real-time reports
- [ ] Complete GSC verification
- [ ] Submit sitemap to GSC
- [ ] Request indexing for key pages

### Phase 5: Monitoring (First Week)
- [ ] Check GSC for crawl activity (daily)
- [ ] Monitor Vercel for errors
- [ ] Check GA4 for traffic
- [ ] Test lead form deliverability
- [ ] Watch for first impressions in GSC

---

## 12. Critical Lessons Learned

### From Dentists Deployment:

1. **Always use www subdomain in domain config** - Prevents robots.txt line breaks
2. **Vercel environment variables override niche.config** - Must be consistent
3. **Build cache can hide issues** - Always redeploy without cache after config changes
4. **GSC takes 24-48 hours to show data** - Don't panic if "No robots.txt file" initially

### From Property Deployment:

1. **Create GA4 property BEFORE deployment** - Avoid using placeholders
2. **Test DNS before assuming site is live** - DNS propagation can take time
3. **Verify Vercel domain configuration** - Both root and www must be added

---

## 13. Quick Reference Commands

### Check Live Site Status
```bash
# Test if site is accessible
curl -I https://www.yourdomain.co.uk

# Check robots.txt
curl https://www.yourdomain.co.uk/robots.txt

# Check sitemap
curl https://www.yourdomain.co.uk/sitemap.xml | grep "<loc>" | head -5

# Check DNS
nslookup www.yourdomain.co.uk
```

### Local Build Verification
```bash
cd [Niche]/web
npm run build
cat .next/server/app/robots.txt.body
```

### Vercel CLI Commands
```bash
# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View environment variables
vercel env ls
```

---

## 14. Placeholder Hunt Script

Use this to find remaining placeholders:

```bash
# Search for common placeholders
grep -r "PLACEHOLDER" --include="*.json" --include="*.ts" --include="*.tsx"
grep -r "your-" --include="*.json" --include="*.env.example"
grep -r "example.com" --include="*.json" --include="*.ts"
grep -r "+44 20 0000" --include="*.json"
```

**Current Known Placeholders**:
- ✅ Property GA4 ID: `G-PROPERTY-PLACEHOLDER` → Need real ID
- ✅ Dentists phone (old): `+44 20 0000 0000` → Already updated?

---

## 15. Next Phase: Property Tax Partners

### Immediate Actions Needed:

1. **Create GA4 Property** (5 min):
   - Go to Google Analytics
   - Create property for "Property Tax Partners"
   - Add data stream for www.propertytaxpartners.co.uk
   - Copy measurement ID
   - Update both niche.config.json files
   - Commit and push

2. **Verify Vercel Configuration** (5 min):
   - Check Environment Variables
   - Ensure NEXT_PUBLIC_SITE_URL includes www
   - Verify Supabase credentials are set
   - Check Domains tab has both root and www

3. **Test Site Accessibility** (2 min):
   - Visit https://www.propertytaxpartners.co.uk
   - Should load without errors
   - If not, check Vercel deployment logs

4. **Verify GSC** (5 min):
   - Complete ownership verification
   - Submit sitemap
   - Request indexing for homepage

### After Property is Live:

5. **Monitor for 1 Week**:
   - Check GSC daily for crawl activity
   - Watch for first impressions
   - Monitor Vercel for errors
   - Test lead form

6. **Set Up Analytics Automation** (30 min - optional):
   - Create Google Cloud service account
   - Add GA4_CREDENTIALS to GitHub Secrets
   - Enable analytics workflows

---

## 16. Maintenance Schedule

### Daily (Automated):
- Content generation pipeline
- Risk manager checks

### Weekly:
- Check GSC for new impressions/clicks
- Review Vercel analytics for errors
- Monitor GA4 for traffic trends

### Monthly:
- Refresh keyword research
- Update keyword CSV files
- Run keyword topic tree builder
- Review and update placeholder tracking sheet

### Quarterly:
- Full system health check
- Update dependencies (npm, Python packages)
- Review and optimize top-performing content
- Audit for any new placeholders

---

## 17. Emergency Contacts & Resources

### Documentation
- System Health: `SYSTEM_HEALTH_CHECK_2026-03-30.md`
- Analytics: `ANALYTICS_HEALTH_CHECK_2026-03-30.md`
- Analytics Setup: `ANALYTICS_SETUP_GUIDE.md`
- Workflow Failures: `GITHUB_WORKFLOW_FAILURES_2026-03-30.md`
- Robots Fix: `ROBOTS_TXT_FIX_STATUS.md`

### External Resources
- Vercel Dashboard: https://vercel.com/dashboard
- Google Analytics: https://analytics.google.com
- Google Search Console: https://search.google.com/search-console
- DNS Checker: https://dnschecker.org

### Support
- Vercel Support: https://vercel.com/support
- Supabase Support: https://supabase.com/support
- Next.js Docs: https://nextjs.org/docs

---

## 18. Success Criteria

### Deployment is Successful When:

- [ ] Site loads at www.yourdomain.co.uk (200 OK)
- [ ] robots.txt shows correct sitemap URL (no line breaks)
- [ ] sitemap.xml contains all pages (no line breaks in URLs)
- [ ] Google Analytics tracking works (check real-time reports)
- [ ] Lead form submits successfully
- [ ] GSC ownership verified
- [ ] Sitemap submitted to GSC
- [ ] No 404 errors in Vercel analytics
- [ ] All GitHub Actions workflows passing

### Within 1 Week:

- [ ] Google has crawled robots.txt (shows in GSC)
- [ ] Pages appearing in GSC Coverage report
- [ ] First impressions appearing in GSC Performance
- [ ] No crawl errors in GSC

---

**Use this checklist for every deployment to avoid the issues we encountered!**

**Last Updated**: 2026-03-30  
**Tested On**: Dentists (live), Property (pending)
