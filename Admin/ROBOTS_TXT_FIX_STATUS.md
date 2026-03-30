# Robots.txt Fix Status - 2026-03-30

## Current Situation

**Status**: ISSUE PERSISTS - Deployment triggered but line breaks still present

### What Was Done

1. ✅ Updated `Dentists/niche.config.json` with `"domain": "www.dentalfinancepartners.co.uk"`
2. ✅ Committed to git (commit `a722d25`)
3. ✅ Triggered redeployment (commit `3f6bbf2`)
4. ✅ GitHub CI passed successfully
5. ✅ Local build verified - generates correct robots.txt
6. ❌ **Live site still shows line breaks**

### Current Live Output

```
User-Agent: *
Allow: /
Disallow: /thank-you

Sitemap: https://dentalfinancepartners.co.uk
/sitemap.xml
```

### Expected Output

```
User-Agent: *
Allow: /
Disallow: /thank-you

Sitemap: https://www.dentalfinancepartners.co.uk/sitemap.xml
```

## Root Cause Analysis

The issue is that **Vercel's environment variable is overriding the niche.config.json**, but the environment variable itself might have the wrong value OR there's a caching issue.

### The Code Flow

```typescript
// Dentists/web/src/config/niche-loader.ts
export function getSiteUrl(): string {
  return (
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) ||
    `https://${niche.domain}`
  );
}
```

This checks `NEXT_PUBLIC_SITE_URL` **first**, then falls back to `niche.domain`.

## What You Need to Do in Vercel

### Step 1: Check Environment Variable

1. Go to https://vercel.com/dashboard
2. Select your Dentists project
3. Go to **Settings** → **Environment Variables**
4. Find `NEXT_PUBLIC_SITE_URL`

**Check if it's set to**:
- ✅ CORRECT: `https://www.dentalfinancepartners.co.uk`
- ❌ WRONG: `https://dentalfinancepartners.co.uk` (missing www)
- ❌ WRONG: Anything else

### Step 2: If Variable is Wrong

1. Click **Edit** on `NEXT_PUBLIC_SITE_URL`
2. Change value to: `https://www.dentalfinancepartners.co.uk`
3. Make sure it's set for **Production** environment
4. Click **Save**

### Step 3: Force Fresh Deployment

Even if the variable is correct, you need to force a deployment **without cache**:

1. Go to **Deployments** tab
2. Find the latest deployment (should be from the last few minutes)
3. Click the **three dots (•••)** menu
4. Click **Redeploy**
5. **CRITICAL**: **UNCHECK** "Use existing Build Cache"
6. Click **Redeploy**

### Step 4: Wait and Verify

Wait 3-5 minutes, then check:

```bash
# Check robots.txt
curl https://www.dentalfinancepartners.co.uk/robots.txt

# Check sitemap
curl https://www.dentalfinancepartners.co.uk/sitemap.xml | grep -A 2 "<loc>"
```

## Alternative: Remove Environment Variable

If the environment variable is causing issues, you can:

1. **Delete** `NEXT_PUBLIC_SITE_URL` from Vercel environment variables
2. Redeploy (it will use `niche.domain` from config, which is now correct)

This might be the cleanest solution since the niche.config.json is now correct.

## Why Line Breaks Are Happening

The line breaks suggest that:
1. The URL being used is `https://dentalfinancepartners.co.uk` (without www)
2. Something in Next.js's robots.txt generation is adding a line break
3. This is likely a character encoding or template rendering issue

The fact that the local build works correctly proves the code is fine - this is purely a deployment/environment issue.

## Next Steps After Fix

Once robots.txt is fixed:

1. **Submit sitemap to Google Search Console**:
   - Go to GSC → Sitemaps
   - Submit: `https://www.dentalfinancepartners.co.uk/sitemap.xml`

2. **Request indexing** for key pages:
   - Homepage
   - 2-3 top blog posts
   - Use "Request Indexing" in GSC

3. **Monitor**:
   - Check GSC in 24-48 hours for crawl activity
   - Impressions should start appearing in 3-7 days

## Technical Details

### Files Involved
- `Dentists/niche.config.json` - Domain configuration
- `Dentists/web/src/config/niche-loader.ts` - URL generation logic
- `Dentists/web/src/app/robots.ts` - Robots.txt generation
- `Dentists/web/src/app/sitemap.ts` - Sitemap generation

### Commits
- `a722d25` - Fixed domain in niche.config.json
- `3f6bbf2` - Triggered redeployment (empty commit)

### Verification Commands
```bash
# Local build (works correctly)
cd Dentists/web
npm run build
cat .next/server/app/robots.txt.body

# Live site (still has issues)
curl https://www.dentalfinancepartners.co.uk/robots.txt
```

---

**Last Updated**: 2026-03-30 10:40 UTC  
**Status**: Awaiting Vercel environment variable check and fresh deployment
