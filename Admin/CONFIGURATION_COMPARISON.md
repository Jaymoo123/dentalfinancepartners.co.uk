# Configuration Comparison: Dentists vs Property

**Purpose:** Side-by-side comparison of all configuration values to identify inconsistencies

---

## 🔍 NICHE.CONFIG.JSON COMPARISON

| Setting | Dentists | Property | Status |
|---------|----------|----------|--------|
| **niche_id** | `dentists` | `property` | ✅ Different (correct) |
| **display_name** | `Dental Finance Partners` | `Property Tax Partners` | ✅ Different (correct) |
| **legal_name** | `Dental Finance Partners Ltd` | `Property Tax Partners Ltd` | ✅ Different (correct) |
| **domain** | `www.dentalfinancepartners.co.uk` | `www.propertytaxpartners.co.uk` | ✅ Different (correct) |
| **tagline** | `Accounting for UK dentists — nothing else` | `Get your property tax sorted` | ✅ Different (correct) |
| **primary_color** | `#2563eb` (blue) | `#047857` (emerald) | ✅ Different (correct) |
| **email** | `hello@dentalfinancepartners.co.uk` | `hello@propertytaxpartners.co.uk` | ✅ Different (correct) |
| **phone** | `+44 20 0000 0000` | `+44 20 3026 1111` | 🟡 Dentists has placeholder |
| **google_analytics_id** | `G-273RJY0LZQ` | `G-B5MCP5NGMY` | ✅ Different (correct) |
| **google_site_verification** | `6Yl4g8aauEScoYRA4pqJ-d-l_CeAhKUPV1dHvOirf1E` | `PROPERTY-VERIFICATION-PLACEHOLDER` | 🟡 Property has placeholder |
| **theme_color** | `#001B3D` | `#047857` | ✅ Different (correct) |
| **supabase_table** | `blog_topics` | `blog_topics_property` | ✅ Different (correct) |
| **source_identifier** | `dentists` | `property` | ✅ Different (correct) |
| **locations_count** | 2 (London, Manchester) | 5 (London, Manchester, Birmingham, Leeds, Bristol) | 🟡 Different counts |
| **shared_components_version** | `1.0.0` | `1.0.0` | ✅ Same (correct) |
| **last_sync** | `2026-03-30T07:20:40.710812` | `2026-03-30T07:22:47.327399` | ✅ Different timestamps |

---

## 🌐 PUBLIC FILES COMPARISON

| File | Dentists | Property | Status |
|------|----------|----------|--------|
| **google9b5077d68a9d0d70.html** | Exists | Exists | 🔴 SAME FILE (WRONG!) |
| **robots.txt** | Generated dynamically | Generated dynamically | ✅ Same logic |
| **sitemap.xml** | Generated dynamically | Generated dynamically | ✅ Same logic |
| **og-placeholder.svg** | Exists | Exists | ✅ Same (correct) |

**CRITICAL ISSUE:** Both sites have the same `google9b5077d68a9d0d70.html` file. This means only ONE of them can be verified in Google Search Console. Each site needs its own unique verification file.

---

## 📦 PACKAGE.JSON COMPARISON

| Setting | Dentists | Property | Status |
|---------|----------|----------|--------|
| **dev port** | `3000` | `3001` | ✅ Different (correct for local dev) |
| **start port** | `3000` | `3001` | ✅ Different (correct for local dev) |
| **next version** | `15.5.14` | `15.5.14` | ✅ Same (correct) |
| **react version** | `19.1.0` | `19.1.0` | ✅ Same (correct) |
| **dependencies** | Same | Same | ✅ Identical (correct) |

---

## ⚙️ NEXT.CONFIG.TS COMPARISON

| Setting | Dentists | Property | Status |
|---------|----------|----------|--------|
| **outputFileTracingRoot** | Set to appDir | Set to appDir | ✅ Same (correct) |
| **eslint.ignoreDuringBuilds** | Not set (default: true) | `false` | 🟡 Property has stricter linting |
| **images.remotePatterns** | Not set | Unsplash configured | 🟡 Property has image config |
| **Security headers** | Configured | Configured | ✅ Same (correct) |
| **CSP policy** | Configured | Configured | ✅ Same (correct) |

**Analysis:** Property has slightly better configuration (ESLint enabled, images configured), but this shouldn't affect SEO or indexing.

---

## 📄 LAYOUT.TSX COMPARISON

| Setting | Dentists | Property | Status |
|---------|----------|----------|--------|
| **Fonts** | Cormorant_Garamond + Plus_Jakarta_Sans | Plus_Jakarta_Sans only | 🟡 Cosmetic difference |
| **Google Analytics** | Configured | Configured | ✅ Both configured |
| **Verification meta tag** | From niche.config | From niche.config | ✅ Same logic |
| **Viewport** | Configured | Configured | ✅ Same (correct) |
| **Metadata** | Configured | Configured | ✅ Same logic |

---

## 📝 CONTENT COMPARISON

| Metric | Dentists | Property | Status |
|--------|----------|----------|--------|
| **Blog posts** | 48 posts | 46 posts | ✅ Similar volume |
| **Static pages** | 9 pages | 11 pages | 🟡 Property has more pages |
| **Locations** | 2 location pages | 5 location pages | 🟡 Property has more locations |
| **Unique pages** | None | Incorporation, Calculators | 🟡 Property has extra features |

**Analysis:** Content volume is similar, so this is NOT the cause of 0 impressions.

---

## 🚀 VERCEL CONFIGURATION (TO CHECK)

| Setting | Dentists | Property | Action Required |
|---------|----------|----------|-----------------|
| **Project exists?** | ❓ Check | ❓ Check | Log into Vercel dashboard |
| **Domain added?** | ❓ Check | ❓ Check | Settings → Domains |
| **Domain status** | ❓ Check | ❓ Check | Should show "Active" |
| **NEXT_PUBLIC_SITE_URL** | ❓ Check | ❓ Check | Settings → Environment Variables |
| **SUPABASE_URL** | ❓ Check | ❓ Check | Settings → Environment Variables |
| **SUPABASE_ANON_KEY** | ❓ Check | ❓ Check | Settings → Environment Variables |
| **Latest deployment** | ❓ Check | ❓ Check | Deployments tab |
| **Build logs** | ❓ Check | ❓ Check | Click on deployment |

**ACTION:** You need to log into Vercel and check these settings for both projects.

---

## 🔍 GOOGLE SEARCH CONSOLE (TO CHECK)

| Setting | Dentists | Property | Action Required |
|---------|----------|----------|-----------------|
| **Property exists?** | ❓ Check | ❓ Check | Log into GSC |
| **Verified?** | ❓ Check | ❓ Check | Should show green checkmark |
| **Verification method** | ❓ Check | ❓ Check | HTML file, meta tag, DNS, or GA? |
| **Sitemap submitted?** | ❓ Check | ❓ Check | Sitemaps section |
| **Sitemap status** | ❓ Check | ❓ Check | Should show "Success" |
| **Pages indexed** | ❓ Check | ❓ Check | Coverage report |
| **Crawl errors** | ❓ Check | ❓ Check | Coverage report |
| **Impressions** | 0 | Getting impressions | Performance report |

**ACTION:** You need to log into Google Search Console and check these for both properties.

---

## 🔴 CRITICAL DIFFERENCES FOUND

### 1. Same Google Verification File
**Issue:** Both sites use `google9b5077d68a9d0d70.html`  
**Impact:** Only one site can be verified with this file  
**Fix:** Generate a new verification file for Dentists in GSC

### 2. Dentists Has Placeholder Phone Number
**Issue:** `+44 20 0000 0000` is clearly a placeholder  
**Impact:** Users can't call, looks unprofessional  
**Fix:** Add real phone number or remove phone option

### 3. Property Has Placeholder Verification Code
**Issue:** `PROPERTY-VERIFICATION-PLACEHOLDER` in niche.config.json  
**Impact:** If using meta tag verification, Property might not be verified  
**Fix:** Update with real verification code from GSC

### 4. Robots.txt Line Break Issue (Dentists)
**Issue:** Per ROBOTS_TXT_FIX_STATUS.md, live robots.txt has line breaks  
**Impact:** Google's crawler might fail to parse sitemap URL  
**Fix:** Update Vercel environment variable and redeploy

---

## 🟡 MINOR DIFFERENCES (Unlikely to Cause Issues)

1. **Fonts:** Dentists uses 2 fonts, Property uses 1
2. **ESLint:** Property has stricter linting enabled
3. **Images:** Property has Unsplash configured
4. **Locations:** Property has 5 locations vs Dentists' 2
5. **Extra pages:** Property has Incorporation and Calculators pages

These differences are cosmetic or feature-related and should NOT affect indexing.

---

## ✅ THINGS THAT ARE CORRECT

1. ✅ Both sites have unique domains
2. ✅ Both sites have unique Google Analytics IDs
3. ✅ Both sites have unique email addresses
4. ✅ Both sites have similar content volume
5. ✅ Both sites use the same Next.js version
6. ✅ Both sites have robots.txt and sitemap.xml configured
7. ✅ Both sites have security headers configured
8. ✅ Both sites have proper metadata structure
9. ✅ Both sites have blog content
10. ✅ Both sites use the same shared components

---

## 🎯 RECOMMENDED ACTIONS (Priority Order)

### 1. IMMEDIATE (Do First)
- [ ] Check if Dentists is verified in Google Search Console
- [ ] Check if sitemap is submitted in GSC
- [ ] Generate new unique verification file for Dentists
- [ ] Fix robots.txt line break issue (update Vercel env var)

### 2. HIGH PRIORITY
- [ ] Check Vercel domain configuration for both projects
- [ ] Compare Vercel environment variables
- [ ] Check latest deployment status and logs
- [ ] Test live robots.txt and sitemap on both sites

### 3. MEDIUM PRIORITY
- [ ] Update Dentists phone number (or remove if not ready)
- [ ] Update Property verification code (if using meta tag method)
- [ ] Request indexing for key pages in GSC
- [ ] Compare GSC Coverage reports

### 4. LOW PRIORITY
- [ ] Add ESLint config to Dentists (match Property)
- [ ] Add images.remotePatterns to Dentists (if using external images)
- [ ] Consider adding more location pages to Dentists

---

## 📊 VERIFICATION CHECKLIST

Use this to verify you've checked everything:

### Configuration Files
- [x] Compared niche.config.json
- [x] Compared package.json
- [x] Compared next.config.ts
- [x] Compared layout.tsx
- [x] Compared robots.ts
- [x] Compared sitemap.ts
- [ ] Compared .env files (if any)

### Public Files
- [x] Checked google verification files
- [ ] Checked if files are accessible online
- [ ] Checked robots.txt output
- [ ] Checked sitemap.xml output

### Deployment
- [ ] Checked Vercel projects exist
- [ ] Checked domains are connected
- [ ] Checked environment variables
- [ ] Checked latest deployments
- [ ] Checked deployment logs

### Google Services
- [ ] Checked GSC property exists
- [ ] Checked verification status
- [ ] Checked sitemap submission
- [ ] Checked indexing status
- [ ] Checked GA4 configuration

### Live Site Testing
- [ ] Tested site loads (https://www.dentalfinancepartners.co.uk)
- [ ] Tested SSL certificate
- [ ] Tested robots.txt
- [ ] Tested sitemap.xml
- [ ] Tested verification file
- [ ] Tested meta tags in HTML

---

## 🔧 TESTING COMMANDS

Run these to check both sites:

```powershell
# Run the comparison script
.\scripts\compare_sites.ps1

# Or manually test:

# Test robots.txt
curl https://www.dentalfinancepartners.co.uk/robots.txt
curl https://www.propertytaxpartners.co.uk/robots.txt

# Test sitemap
curl https://www.dentalfinancepartners.co.uk/sitemap.xml | Select-String -Pattern "loc" | Select-Object -First 10
curl https://www.propertytaxpartners.co.uk/sitemap.xml | Select-String -Pattern "loc" | Select-Object -First 10

# Test verification file
curl https://www.dentalfinancepartners.co.uk/google9b5077d68a9d0d70.html
curl https://www.propertytaxpartners.co.uk/google9b5077d68a9d0d70.html

# Test homepage loads
curl https://www.dentalfinancepartners.co.uk/ | Select-String -Pattern "google-site-verification"
curl https://www.propertytaxpartners.co.uk/ | Select-String -Pattern "google-site-verification"
```

---

**Last Updated:** 31 March 2026  
**Status:** Awaiting user checks on Vercel and Google Search Console
