# Dental Website - Quick Diagnostic Checklist

**Use this checklist to systematically identify why dentalfinancepartners.co.uk has 0 impressions**

---

## 🔴 CRITICAL CHECKS (Do These First)

### 1. Google Search Console Verification
- [ ] Log into https://search.google.com/search-console
- [ ] Is `dentalfinancepartners.co.uk` listed in your properties?
- [ ] Does it show as "Verified" (green checkmark)?
- [ ] If not verified, what verification method are you using?
- [ ] Is sitemap submitted? (Go to Sitemaps section)

**If NOT verified → This is your #1 problem. Add the property and verify it.**

---

### 2. Live Robots.txt Check
Open a terminal and run:
```bash
curl https://www.dentalfinancepartners.co.uk/robots.txt
```

**Expected output:**
```
User-Agent: *
Allow: /
Disallow: /thank-you

Sitemap: https://www.dentalfinancepartners.co.uk/sitemap.xml
```

**Check for:**
- [ ] No line breaks in the Sitemap URL (should be all on one line)
- [ ] URL includes `www.` prefix
- [ ] URL is `https://` not `http://`

**If line breaks exist → This is breaking Google's crawler. See fix below.**

---

### 3. Vercel Domain Configuration
- [ ] Log into https://vercel.com/dashboard
- [ ] Find your Dentists project (what's it called?)
- [ ] Go to Settings → Domains
- [ ] Is `dentalfinancepartners.co.uk` listed?
- [ ] Is `www.dentalfinancepartners.co.uk` listed?
- [ ] Do both show "Active" status?
- [ ] Click on each domain - any errors or warnings?

**If domains not added or showing errors → Add them and update DNS.**

---

### 4. Vercel Environment Variables
In your Dentists project in Vercel:
- [ ] Go to Settings → Environment Variables
- [ ] Find `NEXT_PUBLIC_SITE_URL`
- [ ] What is its value? ___________________________
- [ ] Is it set to `https://www.dentalfinancepartners.co.uk`? (with www)
- [ ] Is it set for "Production" environment?

**If wrong or missing → Update it to `https://www.dentalfinancepartners.co.uk`**

---

### 5. Site Actually Loads
- [ ] Open https://www.dentalfinancepartners.co.uk/ in a browser
- [ ] Does the site load?
- [ ] Is there a green padlock (SSL working)?
- [ ] Does it show the correct content (Dental Finance Partners)?
- [ ] Try https://dentalfinancepartners.co.uk/ (without www) - does it redirect?

**If site doesn't load → DNS or Vercel configuration issue.**

---

## 🟡 SECONDARY CHECKS

### 6. Google Verification File
- [ ] Open https://www.dentalfinancepartners.co.uk/google9b5077d68a9d0d70.html
- [ ] Does it load?
- [ ] What does it say? ___________________________
- [ ] Does this match what Google Search Console expects?

**Note:** Property site uses the SAME verification file, which is wrong. Each site needs its own unique file.

---

### 7. Sitemap Check
```bash
curl https://www.dentalfinancepartners.co.uk/sitemap.xml | head -30
```

- [ ] Does sitemap load?
- [ ] Does it contain URLs?
- [ ] Are URLs using `https://www.dentalfinancepartners.co.uk/` format?
- [ ] Are blog posts included?

---

### 8. Google Analytics
- [ ] Log into https://analytics.google.com
- [ ] Find property `G-273RJY0LZQ`
- [ ] Does it exist?
- [ ] Is it configured for dentalfinancepartners.co.uk?
- [ ] Check Real-time report - is it receiving data?
- [ ] Admin → Property Settings → Search Console Links - is GSC linked?

---

### 9. Indexing Status
Open Google and search:
```
site:dentalfinancepartners.co.uk
```

- [ ] How many results? ___________________________
- [ ] Does homepage show up?
- [ ] Do blog posts show up?

Also try:
```
site:www.dentalfinancepartners.co.uk
```

- [ ] How many results? ___________________________

**If 0 results → Site is not indexed at all.**

---

### 10. Recent Deployments
In Vercel dashboard:
- [ ] Go to Deployments tab
- [ ] When was the last successful deployment? ___________________________
- [ ] Click on it → View Build Logs
- [ ] Any errors in the logs?
- [ ] What's the deployment URL? ___________________________
- [ ] Does the deployment URL work?

---

## 🔧 QUICK FIXES

### Fix #1: Robots.txt Line Break Issue
If robots.txt has line breaks:

1. In Vercel → Settings → Environment Variables
2. Edit `NEXT_PUBLIC_SITE_URL`
3. Set to: `https://www.dentalfinancepartners.co.uk`
4. Save
5. Go to Deployments tab
6. Click ••• on latest deployment → Redeploy
7. **UNCHECK** "Use existing Build Cache"
8. Click Redeploy
9. Wait 3-5 minutes
10. Test again: `curl https://www.dentalfinancepartners.co.uk/robots.txt`

---

### Fix #2: Get Unique Google Verification File
If using wrong verification file:

1. Go to Google Search Console
2. Add property: `dentalfinancepartners.co.uk`
3. Choose "HTML file upload" method
4. Download the file (e.g., `googleABCDEF123456.html`)
5. In your local code:
   - Delete `Dentists/web/public/google9b5077d68a9d0d70.html`
   - Add the new file to `Dentists/web/public/`
6. Update `Dentists/niche.config.json`:
   ```json
   "google_site_verification": "ABCDEF123456"
   ```
   (Use the code from the filename, without "google" prefix or ".html" suffix)
7. Commit and push to GitHub
8. Wait for Vercel to deploy
9. Go back to GSC and click "Verify"

---

### Fix #3: Submit Sitemap
If sitemap not submitted:

1. In Google Search Console
2. Go to Sitemaps (in left sidebar)
3. Enter: `https://www.dentalfinancepartners.co.uk/sitemap.xml`
4. Click Submit
5. Wait 24-48 hours for Google to process

---

### Fix #4: Request Indexing
If site is verified but not indexed:

1. In Google Search Console
2. Use URL Inspection tool (top search bar)
3. Enter: `https://www.dentalfinancepartners.co.uk/`
4. Click "Request Indexing"
5. Repeat for:
   - `https://www.dentalfinancepartners.co.uk/services`
   - `https://www.dentalfinancepartners.co.uk/blog`
   - 2-3 of your best blog posts

---

## 📊 COMPARISON TO PROPERTY SITE

Run these commands to compare both sites:

```bash
# Robots.txt comparison
echo "=== DENTISTS ===" && curl -s https://www.dentalfinancepartners.co.uk/robots.txt && echo "" && echo "=== PROPERTY ===" && curl -s https://www.propertytaxpartners.co.uk/robots.txt

# Sitemap comparison
echo "=== DENTISTS ===" && curl -s https://www.dentalfinancepartners.co.uk/sitemap.xml | head -20 && echo "" && echo "=== PROPERTY ===" && curl -s https://www.propertytaxpartners.co.uk/sitemap.xml | head -20

# Verification file comparison
echo "=== DENTISTS ===" && curl -s https://www.dentalfinancepartners.co.uk/google9b5077d68a9d0d70.html && echo "" && echo "=== PROPERTY ===" && curl -s https://www.propertytaxpartners.co.uk/google9b5077d68a9d0d70.html
```

**Look for differences** - any difference could be the cause.

---

## ✅ SUCCESS CRITERIA

You'll know it's fixed when:

1. ✅ Site verified in Google Search Console
2. ✅ Sitemap submitted and showing "Success" status
3. ✅ robots.txt has no line breaks
4. ✅ `site:dentalfinancepartners.co.uk` shows results in Google
5. ✅ GSC Coverage report shows pages as "Indexed"
6. ✅ Impressions start appearing in GSC Performance report (2-7 days)

---

## 🆘 STILL STUCK?

If you've checked everything and still have 0 impressions:

1. **Compare every single value** in the checklist to Property site
2. **Check Vercel deployment logs** for any errors
3. **Check browser console** for any JavaScript errors
4. **Check GSC Coverage report** for specific errors
5. **Wait 48 hours** after making changes - Google needs time to recrawl

---

**Most Common Issues:**
1. Site not verified in GSC (60% of cases)
2. Robots.txt line break issue (20% of cases)
3. Wrong verification file (10% of cases)
4. Domain not connected in Vercel (5% of cases)
5. DNS not propagated (5% of cases)

---

**Last Updated:** 31 March 2026
