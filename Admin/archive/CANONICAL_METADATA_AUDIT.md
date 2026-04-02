# Canonical Tags & Metadata Audit - Complete

**Date**: 2026-03-29  
**Status**: ✅ COMPLETE  
**Scope**: Both Property and Dentists websites

---

## Executive Summary

Comprehensive audit and fix of canonical tags and OpenGraph metadata across both websites. All pages now have proper canonical URLs pointing to production domains, complete OpenGraph metadata for social sharing, and consistent URL formatting.

---

## Issues Identified & Fixed

### 1. Missing Canonical Tags (Dentists Site)
**Problem**: 4 key pages missing canonical tags
- `/about` - ❌ No canonical
- `/services` - ❌ No canonical
- `/contact` - ❌ No canonical
- `/blog` - ❌ No canonical

**Fix**: Added `alternates: { canonical: \`\${siteConfig.url}/[path]\` }` to all pages

### 2. Missing OpenGraph Metadata (Dentists Site)
**Problem**: 5 pages missing OG tags for social sharing
- `/about` - ❌ No OG
- `/services` - ❌ No OG
- `/contact` - ❌ No OG
- `/blog` - ❌ No OG
- `/locations` - ❌ No OG

**Fix**: Added complete OpenGraph metadata with title, description, url, and type

### 3. Inconsistent URL Generation (Property Site)
**Problem**: `getSiteUrl()` was using `VERCEL_URL` for preview environments, which could cause canonical URLs to point to preview URLs instead of production

**Before**:
```typescript
export function getSiteUrl(): string {
  if (process.env.VERCEL_ENV === "production") {
    return `https://${niche.domain}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;  // ❌ Preview URLs in canonicals
  }
  return process.env.NEXT_PUBLIC_SITE_URL || `http://localhost:3000`;
}
```

**After**:
```typescript
export function getSiteUrl(): string {
  return (
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) ||
    `https://${niche.domain}`
  );
}
```

**Fix**: Canonical URLs now ALWAYS point to production domain unless explicitly overridden by `NEXT_PUBLIC_SITE_URL`

### 4. Unnecessary URL Manipulation
**Problem**: `/locations` page had `.replace(/\/$/, "")` which was unnecessary
**Fix**: Removed redundant regex replacement

---

## Verification Checklist

### Property Site (propertytaxpartners.co.uk)
- ✅ Homepage (`/`) - canonical + OG
- ✅ About (`/about`) - canonical + OG
- ✅ Services (`/services`) - canonical + OG
- ✅ Contact (`/contact`) - canonical + OG
- ✅ Blog Index (`/blog`) - canonical + OG
- ✅ Blog Posts (`/blog/[slug]`) - canonical + OG
- ✅ Calculators (`/calculators`) - canonical + OG
- ✅ Incorporation (`/incorporation`) - canonical + OG
- ✅ Locations (`/locations`) - canonical + OG
- ✅ Location Pages (`/locations/[slug]`) - canonical + OG
- ✅ Privacy Policy (`/privacy-policy`) - canonical
- ✅ Cookie Policy (`/cookie-policy`) - canonical
- ✅ Terms (`/terms`) - canonical
- ✅ Thank You (`/thank-you`) - noindex (correct)

### Dentists Site (dentalfinancepartners.co.uk)
- ✅ Homepage (`/`) - canonical + OG
- ✅ About (`/about`) - canonical + OG *(FIXED)*
- ✅ Services (`/services`) - canonical + OG *(FIXED)*
- ✅ Contact (`/contact`) - canonical + OG *(FIXED)*
- ✅ Blog Index (`/blog`) - canonical + OG *(FIXED)*
- ✅ Blog Posts (`/blog/[slug]`) - canonical + OG
- ✅ Locations (`/locations`) - canonical + OG *(FIXED)*
- ✅ Location Pages (`/locations/[slug]`) - canonical + OG
- ✅ Privacy Policy (`/privacy-policy`) - canonical
- ✅ Cookie Policy (`/cookie-policy`) - canonical
- ✅ Terms (`/terms`) - canonical
- ✅ Thank You (`/thank-you`) - noindex (correct)

---

## Metadata Configuration

### Root Layout (Both Sites)
Both sites have proper `metadataBase` configuration:

```typescript
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  // ... other metadata
};
```

### URL Generation
Both sites now use consistent URL generation:

```typescript
export function getSiteUrl(): string {
  return (
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) ||
    `https://${niche.domain}`
  );
}
```

This ensures:
- ✅ Production builds use production domain
- ✅ Preview builds use production domain (not preview URLs)
- ✅ Local dev can override with `NEXT_PUBLIC_SITE_URL`
- ✅ Canonical URLs are always consistent

---

## SEO Best Practices Implemented

### 1. Canonical Tags
- ✅ Every indexable page has a canonical tag
- ✅ Canonical URLs are absolute (include domain)
- ✅ Canonical URLs point to production domain
- ✅ No trailing slashes (consistent)
- ✅ Thank-you pages correctly set to `noindex`

### 2. OpenGraph Metadata
- ✅ All main pages have OG tags
- ✅ OG URLs match canonical URLs
- ✅ OG titles and descriptions are optimized
- ✅ OG type set to "website" for pages, "article" for blog posts
- ✅ OG images configured at root level

### 3. URL Consistency
- ✅ No mixed http/https
- ✅ No trailing slash inconsistencies
- ✅ No www/non-www conflicts
- ✅ Preview environments don't pollute canonical URLs

---

## Google Search Console Impact

### Expected Improvements
1. **Canonical Tag Coverage**: 100% of indexable pages now have canonical tags
2. **Duplicate Content**: Eliminated risk of preview/staging URLs being indexed
3. **Social Sharing**: Complete OG metadata for better social media appearance
4. **URL Consistency**: Single authoritative URL for each page

### GSC Monitoring
After deployment, verify in Google Search Console:
- Coverage report shows no "Duplicate without user-selected canonical"
- All pages show correct canonical URL
- No indexing issues related to missing canonicals
- Social media previews display correctly

---

## Files Modified

### Property Site
1. `Property/web/src/config/niche-loader.ts` - Fixed getSiteUrl() logic
2. `Property/web/src/app/blog/page.tsx` - Added OG metadata
3. `Property/web/src/app/locations/page.tsx` - Added OG metadata, cleaned URL

### Dentists Site
1. `Dentists/web/src/app/about/page.tsx` - Added canonical + OG
2. `Dentists/web/src/app/services/page.tsx` - Added canonical + OG
3. `Dentists/web/src/app/contact/page.tsx` - Added canonical + OG
4. `Dentists/web/src/app/blog/page.tsx` - Added canonical + OG
5. `Dentists/web/src/app/locations/page.tsx` - Added OG metadata

---

## Testing Recommendations

### 1. Manual Verification
View source on live site and verify:
```html
<link rel="canonical" href="https://propertytaxpartners.co.uk/" />
<meta property="og:url" content="https://propertytaxpartners.co.uk/" />
```

### 2. GSC Verification
- Check "Coverage" report for canonical issues
- Use URL Inspection tool to verify canonical tags
- Monitor for "Duplicate without user-selected canonical" errors

### 3. Social Media Testing
- Test Facebook sharing: https://developers.facebook.com/tools/debug/
- Test Twitter/X cards: https://cards-dev.twitter.com/validator
- Test LinkedIn preview

---

## Conclusion

All canonical tags and OpenGraph metadata are now properly configured across both websites. The sites follow SEO best practices with:
- ✅ 100% canonical tag coverage
- ✅ Consistent URL formatting
- ✅ Complete OpenGraph metadata
- ✅ Proper noindex on utility pages
- ✅ Production-only canonical URLs

**Ready for deployment and GSC verification.**
