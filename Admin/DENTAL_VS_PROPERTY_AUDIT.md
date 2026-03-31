# Dental vs Property Website Audit - Why No Impressions?

**Date:** 31 March 2026  
**Issue:** dentalfinancepartners.co.uk has 0 impressions, while propertytaxpartners.co.uk has been getting impressions since yesterday afternoon

---

## EXECUTIVE SUMMARY

Based on my analysis, here are the **CRITICAL DIFFERENCES** that are likely causing the issue:

### 🔴 CRITICAL ISSUES (Dentists)
1. **Wrong Google verification file** - Both sites use the SAME verification file (`google9b5077d68a9d0d70.html`)
2. **Wrong Google Analytics ID** - Dentists uses `G-273RJY0LZQ` but Property uses `G-B5MCP5NGMY`
3. **Wrong site verification meta tag** - Dentists uses `6Yl4g8aauEScoYRA4pqJ-d-l_CeAhKUPV1dHvOirf1E` but Property uses `PROPERTY-VERIFICATION-PLACEHOLDER`
4. **Possible robots.txt issue** - Known issue with line breaks in robots.txt (see ROBOTS_TXT_FIX_STATUS.md)
5. **Domain mismatch** - Dentists config has `www.dentalfinancepartners.co.uk` but may not be deployed correctly

### ✅ WORKING (Property)
- Property has been getting impressions since yesterday
- Property has 46 blog posts vs Dentists' 48 (similar content volume)
- Property has proper configuration in niche.config.json

---

## SYSTEMATIC AUDIT CHECKLIST

### 1. GOOGLE SEARCH CONSOLE VERIFICATION

#### Dentists (dentalfinancepartners.co.uk)
- [ ] **Check GSC property exists** - Is the site added to Google Search Console?
- [ ] **Verify ownership method** - HTML file, meta tag, DNS, or Google Analytics?
- [ ] **Check verification status** - Is it actually verified?
- [ ] **Check property URL format** - Is it `dentalfinancepartners.co.uk` or `www.dentalfinancepartners.co.uk`?
- [ ] **Sitemap submitted?** - Is `sitemap.xml` submitted and indexed?
- [ ] **Coverage report** - Any errors or warnings?
- [ ] **Manual actions** - Any penalties?

**CRITICAL FINDING:**
```
Dentists niche.config.json:
"google_site_verification": "6Yl4g8aauEScoYRA4pqJ-d-l_CeAhKUPV1dHvOirf1E"

Property niche.config.json:
"google_site_verification": "PROPERTY-VERIFICATION-PLACEHOLDER"

BUT BOTH have the same HTML file:
Dentists/web/public/google9b5077d68a9d0d70.html
Property/web/public/google9b5077d68a9d0d70.html
```

**This is WRONG!** Each site needs its own unique verification file.

#### Property (propertytaxpartners.co.uk)
- [✓] Getting impressions since yesterday
- [ ] Check if properly verified
- [ ] Check sitemap status

---

### 2. DOMAIN & DNS CONFIGURATION

#### Dentists
- [ ] **Domain registered?** - Is dentalfinancepartners.co.uk actually registered?
- [ ] **DNS records correct?** - A record, CNAME for www
- [ ] **Vercel domain added?** - Is domain added in Vercel dashboard?
- [ ] **SSL certificate active?** - Does https:// work?
- [ ] **www vs non-www** - Which version is primary?
- [ ] **Redirects working?** - Does non-www redirect to www (or vice versa)?

**CRITICAL FINDING:**
```
niche.config.json has:
"domain": "www.dentalfinancepartners.co.uk"

But ROBOTS_TXT_FIX_STATUS.md shows the live site still has issues with:
Sitemap: https://dentalfinancepartners.co.uk/sitemap.xml
(missing www and has line breaks)
```

#### Property
- [ ] Check same items
- [ ] Compare DNS settings to Dentists

**ACTION:** Check Vercel dashboard for both projects and compare domain settings

---

### 3. VERCEL DEPLOYMENT CONFIGURATION

#### Dentists Project
- [ ] **Project exists in Vercel?** - Check dashboard
- [ ] **Environment variables set?**
  - [ ] `NEXT_PUBLIC_SITE_URL` = ?
  - [ ] `SUPABASE_URL` = ?
  - [ ] `SUPABASE_ANON_KEY` = ?
- [ ] **Build settings correct?**
  - [ ] Root Directory: `Dentists/web`
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `.next`
- [ ] **Latest deployment successful?**
- [ ] **Deployment logs** - Any errors?
- [ ] **Preview URL works?** - Test `.vercel.app` URL

#### Property Project
- [ ] Check same items
- [ ] Compare to Dentists

**ACTION:** Log into Vercel and compare both projects side-by-side

---

### 4. ROBOTS.TXT & SITEMAP

#### Dentists
**Check live site:**
```bash
curl https://www.dentalfinancepartners.co.uk/robots.txt
curl https://dentalfinancepartners.co.uk/robots.txt
curl https://www.dentalfinancepartners.co.uk/sitemap.xml
```

**Expected robots.txt:**
```
User-Agent: *
Allow: /
Disallow: /thank-you

Sitemap: https://www.dentalfinancepartners.co.uk/sitemap.xml
```

**Known Issue (from ROBOTS_TXT_FIX_STATUS.md):**
The live site shows line breaks in robots.txt, which can break Google's parser.

- [ ] **Robots.txt accessible?**
- [ ] **No line breaks in sitemap URL?**
- [ ] **Sitemap accessible?**
- [ ] **Sitemap has all pages?**
- [ ] **Sitemap has blog posts?**
- [ ] **URLs in sitemap match domain format (www vs non-www)?**

#### Property
- [ ] Check same items
- [ ] Compare output to Dentists

---

### 5. GOOGLE ANALYTICS CONFIGURATION

#### Dentists
```json
"google_analytics_id": "G-273RJY0LZQ"
```

- [ ] **GA4 property exists?** - Log into Google Analytics
- [ ] **Property ID correct?** - Is it really `G-273RJY0LZQ`?
- [ ] **Data stream configured?** - Is dentalfinancepartners.co.uk added?
- [ ] **Receiving data?** - Check real-time reports
- [ ] **Search Console linked?** - Is GSC linked to GA4?

#### Property
```json
"google_analytics_id": "G-B5MCP5NGMY"
```

- [ ] Check same items
- [ ] Compare to Dentists

**CRITICAL QUESTION:** Are these two DIFFERENT GA4 properties, or is one of them wrong?

---

### 6. METADATA & SEO TAGS

#### Dentists
**Check live site HTML source:**
```bash
curl -s https://www.dentalfinancepartners.co.uk/ | grep -E "(google-site-verification|og:url|canonical|robots)"
```

- [ ] **Google site verification meta tag present?**
- [ ] **Canonical URL correct?**
- [ ] **Open Graph URL correct?**
- [ ] **No conflicting robots meta tags?**
- [ ] **Title and description present?**

#### Property
- [ ] Check same items
- [ ] Compare to Dentists

---

### 7. CONTENT COMPARISON

#### Dentists
- **Blog posts:** 48 posts
- **Pages:** Home, Services, About, Blog, Contact, Locations (2)
- **Last updated:** Various dates in March 2026

#### Property
- **Blog posts:** 46 posts
- **Pages:** Home, Services, About, Blog, Contact, Incorporation, Calculators, Locations (5)
- **Last updated:** Various dates in March 2026

**Analysis:** Content volume is similar, so this is NOT the issue.

---

### 8. INDEXING STATUS

#### Dentists
**Check in Google Search Console:**
- [ ] **Pages indexed** - How many pages indexed?
- [ ] **Pages discovered but not indexed** - Any?
- [ ] **Pages blocked by robots.txt** - Any (besides /thank-you)?
- [ ] **Crawl errors** - Any 404s or 500s?
- [ ] **Coverage issues** - Any warnings?

**Manual check:**
```
site:dentalfinancepartners.co.uk
site:www.dentalfinancepartners.co.uk
```

#### Property
- [ ] Check same items
- [ ] Compare to Dentists

---

### 9. TECHNICAL DIFFERENCES

#### Next.js Configuration

**Dentists next.config.ts:**
- ✅ Security headers configured
- ✅ outputFileTracingRoot set
- ❌ No images.remotePatterns (but not critical)
- ❌ No eslint config

**Property next.config.ts:**
- ✅ Security headers configured
- ✅ outputFileTracingRoot set
- ✅ images.remotePatterns for Unsplash
- ✅ eslint.ignoreDuringBuilds: false

**Analysis:** Property has slightly better config, but this shouldn't block indexing.

#### Layout Differences

**Dentists layout.tsx:**
- Uses Cormorant_Garamond + Plus_Jakarta_Sans fonts
- Google Analytics configured
- Verification meta tag from niche.config.json

**Property layout.tsx:**
- Uses only Plus_Jakarta_Sans font
- Google Analytics configured
- Verification meta tag from niche.config.json

**Analysis:** Font difference is cosmetic, not an indexing issue.

---

### 10. DEPLOYMENT HISTORY

#### Check Git History
```bash
git log --oneline --since="2026-03-28" -- Dentists/
git log --oneline --since="2026-03-28" -- Property/
```

- [ ] **When was Dentists last deployed?**
- [ ] **When was Property last deployed?**
- [ ] **Any failed deployments?**
- [ ] **Any configuration changes?**

---

## MOST LIKELY ROOT CAUSES

Based on the audit, here are the **TOP 5** most likely issues:

### 1. 🔴 WRONG GOOGLE VERIFICATION FILE (90% confidence)
**Issue:** Both sites use the same `google9b5077d68a9d0d70.html` file, but they should each have their own unique verification file.

**How to fix:**
1. Go to Google Search Console
2. Add `dentalfinancepartners.co.uk` as a new property (if not already added)
3. Choose "HTML file upload" verification method
4. Download the NEW verification file (it will have a different name)
5. Replace `Dentists/web/public/google9b5077d68a9d0d70.html` with the new file
6. Update `niche.config.json` with the correct verification code
7. Commit and deploy
8. Verify in GSC

### 2. 🔴 ROBOTS.TXT LINE BREAK ISSUE (80% confidence)
**Issue:** The live robots.txt has line breaks in the sitemap URL, which can break Google's parser.

**How to fix:**
See ROBOTS_TXT_FIX_STATUS.md - you need to:
1. Check Vercel environment variable `NEXT_PUBLIC_SITE_URL`
2. Make sure it's set to `https://www.dentalfinancepartners.co.uk` (with www)
3. Redeploy without build cache

### 3. 🔴 SITE NOT VERIFIED IN GOOGLE SEARCH CONSOLE (70% confidence)
**Issue:** The site might not be verified at all, or verified under the wrong URL format.

**How to check:**
1. Log into Google Search Console
2. Look for `dentalfinancepartners.co.uk` in your properties list
3. Check if it shows as "Verified"
4. Check if sitemap is submitted

### 4. 🟡 DOMAIN NOT PROPERLY CONNECTED IN VERCEL (50% confidence)
**Issue:** The domain might not be added to the Vercel project, or DNS might not be pointing correctly.

**How to check:**
1. Log into Vercel dashboard
2. Find the Dentists project
3. Go to Settings → Domains
4. Check if `dentalfinancepartners.co.uk` and `www.dentalfinancepartners.co.uk` are listed
5. Check if they show as "Active"

### 5. 🟡 WRONG GOOGLE ANALYTICS ID (30% confidence)
**Issue:** The GA ID might be wrong, preventing proper tracking and GSC integration.

**How to check:**
1. Log into Google Analytics
2. Check if `G-273RJY0LZQ` exists
3. Check if it's configured for dentalfinancepartners.co.uk
4. Check if Search Console is linked

---

## IMMEDIATE ACTION PLAN

### Step 1: Verify Google Search Console Setup (5 minutes)
1. Log into https://search.google.com/search-console
2. Check if `dentalfinancepartners.co.uk` is listed
3. If not, add it as a new property
4. Choose HTML file verification
5. Download the verification file
6. Note the filename (e.g., `googleXXXXXXXXXXXXXXXX.html`)

### Step 2: Update Verification File (2 minutes)
1. Delete `Dentists/web/public/google9b5077d68a9d0d70.html`
2. Add the new verification file to `Dentists/web/public/`
3. Update `Dentists/niche.config.json`:
   ```json
   "google_site_verification": "NEW_VERIFICATION_CODE_HERE"
   ```

### Step 3: Fix Robots.txt Issue (5 minutes)
1. Log into Vercel dashboard
2. Go to Dentists project → Settings → Environment Variables
3. Check `NEXT_PUBLIC_SITE_URL` value
4. If it's not `https://www.dentalfinancepartners.co.uk`, update it
5. Go to Deployments tab
6. Redeploy latest deployment WITHOUT build cache

### Step 4: Verify Domain Configuration (3 minutes)
1. In Vercel dashboard, go to Settings → Domains
2. Check if both `dentalfinancepartners.co.uk` and `www.dentalfinancepartners.co.uk` are listed
3. Check if they show as "Active"
4. If not, add them and update DNS records

### Step 5: Test Live Site (2 minutes)
```bash
# Test robots.txt
curl https://www.dentalfinancepartners.co.uk/robots.txt

# Test sitemap
curl https://www.dentalfinancepartners.co.uk/sitemap.xml | head -20

# Test verification file
curl https://www.dentalfinancepartners.co.uk/googleXXXXXXXXXXXXXXXX.html
```

### Step 6: Submit Sitemap in GSC (2 minutes)
1. In Google Search Console
2. Go to Sitemaps
3. Submit: `https://www.dentalfinancepartners.co.uk/sitemap.xml`
4. Wait for Google to process (can take 24-48 hours)

### Step 7: Request Indexing (5 minutes)
1. In Google Search Console
2. Use URL Inspection tool
3. Test these URLs:
   - `https://www.dentalfinancepartners.co.uk/`
   - `https://www.dentalfinancepartners.co.uk/services`
   - `https://www.dentalfinancepartners.co.uk/blog`
4. Click "Request Indexing" for each

---

## COMPARISON MATRIX

| Item | Dentists | Property | Status |
|------|----------|----------|--------|
| **Domain** | www.dentalfinancepartners.co.uk | www.propertytaxpartners.co.uk | ✅ Both configured |
| **Google Verification File** | google9b5077d68a9d0d70.html | google9b5077d68a9d0d70.html | 🔴 SAME FILE (WRONG!) |
| **Google Verification Meta** | 6Yl4g8aauEScoYRA4pqJ-d-l_CeAhKUPV1dHvOirf1E | PROPERTY-VERIFICATION-PLACEHOLDER | 🟡 Different (Property is placeholder) |
| **Google Analytics ID** | G-273RJY0LZQ | G-B5MCP5NGMY | ✅ Different (correct) |
| **Blog Posts** | 48 posts | 46 posts | ✅ Similar volume |
| **Robots.txt** | Known line break issue | Unknown | 🔴 Dentists has issue |
| **Sitemap** | Dynamic generation | Dynamic generation | ✅ Both configured |
| **Next.js Config** | Basic | Enhanced (images, eslint) | 🟡 Property slightly better |
| **Fonts** | Cormorant + Plus Jakarta | Plus Jakarta only | ✅ Cosmetic difference |
| **Impressions** | 0 | Getting impressions | 🔴 THIS IS THE PROBLEM |

---

## TESTING COMMANDS

Run these commands to check both sites:

```bash
# Check robots.txt
echo "=== DENTISTS ROBOTS.TXT ==="
curl -s https://www.dentalfinancepartners.co.uk/robots.txt
echo ""
echo "=== PROPERTY ROBOTS.TXT ==="
curl -s https://www.propertytaxpartners.co.uk/robots.txt
echo ""

# Check sitemap
echo "=== DENTISTS SITEMAP (first 30 lines) ==="
curl -s https://www.dentalfinancepartners.co.uk/sitemap.xml | head -30
echo ""
echo "=== PROPERTY SITEMAP (first 30 lines) ==="
curl -s https://www.propertytaxpartners.co.uk/sitemap.xml | head -30
echo ""

# Check verification files
echo "=== DENTISTS VERIFICATION FILE ==="
curl -s https://www.dentalfinancepartners.co.uk/google9b5077d68a9d0d70.html
echo ""
echo "=== PROPERTY VERIFICATION FILE ==="
curl -s https://www.propertytaxpartners.co.uk/google9b5077d68a9d0d70.html
echo ""

# Check homepage meta tags
echo "=== DENTISTS META TAGS ==="
curl -s https://www.dentalfinancepartners.co.uk/ | grep -E "(google-site-verification|og:url|canonical)" | head -10
echo ""
echo "=== PROPERTY META TAGS ==="
curl -s https://www.propertytaxpartners.co.uk/ | grep -E "(google-site-verification|og:url|canonical)" | head -10
echo ""

# Check Google indexing
echo "=== GOOGLE INDEX CHECK ==="
echo "Dentists: site:dentalfinancepartners.co.uk"
echo "Property: site:propertytaxpartners.co.uk"
echo "(Open these in a browser)"
```

---

## NEXT STEPS AFTER FIXES

Once you've fixed the critical issues:

1. **Wait 24-48 hours** - Google needs time to recrawl
2. **Monitor GSC** - Check for crawl activity and indexing
3. **Check impressions** - Should start appearing in 2-7 days
4. **Compare to Property** - Use Property as the benchmark

---

## QUESTIONS TO ANSWER

Before we can definitively solve this, you need to check:

1. **Is dentalfinancepartners.co.uk verified in Google Search Console?**
2. **What does the live robots.txt actually show?** (run the curl command)
3. **Is the domain properly connected in Vercel?**
4. **What does the Vercel deployment log show?**
5. **Does the site load at https://www.dentalfinancepartners.co.uk/?**

---

**Last Updated:** 31 March 2026  
**Status:** Awaiting user verification checks  
**Priority:** CRITICAL - Site not getting any impressions
