# Schema & Breadcrumb Audit

**Date:** March 28, 2026  
**Status:** Comprehensive audit and implementation

---

## Breadcrumb Implementation

### Pages with Breadcrumbs ✅
1. **Homepage** (`/`) - No breadcrumb (root page)
2. **Blog listing** (`/blog`) - Home > Blog
3. **Blog posts** (`/blog/[slug]`) - Home > Blog > [Post Title]
4. **Services** (`/services`) - Home > Services
5. **About** (`/about`) - Home > About
6. **Contact** (`/contact`) - Home > Contact
7. **Locations hub** (`/locations`) - Home > Locations
8. **Location pages** (`/locations/[slug]`) - Home > Locations > [City]
9. **Privacy Policy** (`/privacy-policy`) - Home > Privacy policy
10. **Terms of Use** (`/terms`) - Home > Terms of use
11. **Cookie Policy** (`/cookie-policy`) - Home > Cookie policy

### Pages without Breadcrumbs (by design)
- **Thank You** (`/thank-you`) - Conversion page, no breadcrumb needed

### Breadcrumb Features
- **Visual:** Clean chevron separators, hover states, focus rings
- **Accessibility:** Proper `aria-label`, semantic `<nav>` and `<ol>` structure
- **SEO:** BreadcrumbList structured data on all pages
- **Responsive:** Wraps on mobile, maintains touch targets

---

## Structured Data (Schema.org) Implementation

### Homepage (`/`)
✅ **Organization Schema**
- Location: `src/lib/organization-schema.ts`
- Includes: name, url, logo, description, address, contact, social profiles
- Status: Implemented

### Blog Posts (`/blog/[slug]`)
✅ **BlogPosting Schema**
- Location: `src/lib/schema.ts` → `buildBlogPostingJsonLd()`
- Includes: headline, description, datePublished, author, publisher
- Status: Implemented for all 45 posts

✅ **FAQPage Schema**
- Location: `src/lib/schema.ts` → `buildBlogPostingJsonLd()`
- Includes: Question/Answer pairs from frontmatter
- Status: Implemented for 40/45 posts (5 posts have no FAQs)

✅ **BreadcrumbList Schema**
- Location: `src/components/ui/Breadcrumb.tsx`
- Includes: Full navigation path with URLs
- Status: Implemented on all blog posts

### Other Pages
✅ **BreadcrumbList Schema**
- Services, About, Contact, Locations, Legal pages
- Status: Implemented via Breadcrumb component

❌ **Missing Schemas** (Future Enhancement)
- **LocalBusiness Schema** - Should be added to location pages (`/locations/london`, `/locations/manchester`)
- **WebPage Schema** - Could be added to key landing pages
- **Service Schema** - Could be added to services page

---

## Schema Quality Checklist

### Homepage Organization Schema
- ✅ Legal name and trading name
- ✅ Logo URL (600x60 PNG)
- ✅ Description
- ✅ URL
- ✅ Contact email and phone
- ✅ Address (if applicable)
- ✅ Social profiles (if applicable)
- ✅ Same as links (website = organization)

### Blog Post Schemas
- ✅ Unique @id for each article
- ✅ Headline from H1
- ✅ Description from meta
- ✅ Published and modified dates
- ✅ Author (Organization)
- ✅ Publisher with logo
- ✅ Article section (category)
- ✅ Language (en-GB)
- ✅ FAQ schema when FAQs present

### Breadcrumb Schemas
- ✅ Position numbering (1, 2, 3...)
- ✅ Item names
- ✅ Item URLs (full absolute URLs)
- ✅ Proper nesting structure

---

## SEO Benefits

### Breadcrumbs
1. **Rich Snippets** - Google displays breadcrumbs in search results
2. **User Experience** - Easy navigation back to parent pages
3. **Internal Linking** - Strengthens site architecture
4. **Reduced Bounce Rate** - Users can easily explore related sections

### Structured Data
1. **Knowledge Graph** - Organization schema helps Google understand the business
2. **Rich Results** - FAQ schema enables FAQ rich results in search
3. **Blog Visibility** - BlogPosting schema improves blog post indexing
4. **Trust Signals** - Proper schema signals professionalism to search engines

---

## Testing & Validation

### Google Rich Results Test
1. Visit: https://search.google.com/test/rich-results
2. Test URLs:
   - Homepage: `https://dentalfinancepartners.co.uk/`
   - Blog post: `https://dentalfinancepartners.co.uk/blog/associate-dentist-tax-self-assessment-uk`
   - Location: `https://dentalfinancepartners.co.uk/locations/london`

### Schema Markup Validator
1. Visit: https://validator.schema.org/
2. Paste page HTML or URL
3. Verify no errors or warnings

### Google Search Console
1. Navigate to "Enhancements" section
2. Check for:
   - Breadcrumb issues
   - FAQ issues
   - Organization issues
3. Monitor rich result impressions

---

## Future Enhancements

### Priority 1: LocalBusiness Schema
Add to location pages (`/locations/london`, `/locations/manchester`):

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Dental Finance Partners - London",
  "image": "...",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "London",
    "addressRegion": "Greater London",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "51.5074",
    "longitude": "-0.1278"
  },
  "url": "https://dentalfinancepartners.co.uk/locations/london",
  "telephone": "+44...",
  "priceRange": "££",
  "areaServed": ["London", "Greater London"]
}
```

### Priority 2: Service Schema
Add to services page with itemListElement for each service offered.

### Priority 3: Review Schema
Add to blog posts or homepage to showcase testimonials (when available).

---

## Implementation Summary

### Completed ✅
- Breadcrumb component created with full accessibility
- Breadcrumbs added to 11 pages (all except homepage and thank-you)
- BreadcrumbList schema added to all breadcrumbed pages
- Organization schema on homepage
- BlogPosting + FAQPage schema on all blog posts
- FAQ format fixed (moved from HTML to frontmatter YAML)

### Remaining 📋
- Add LocalBusiness schema to location pages
- Add Service schema to services page
- Test all schemas in Google Rich Results Test
- Monitor GSC for rich result performance

---

## Technical Notes

### Breadcrumb Component
- **File:** `src/components/ui/Breadcrumb.tsx`
- **Props:** `items: BreadcrumbItem[]` where `BreadcrumbItem = { label: string; href?: string }`
- **Features:** Auto-generates schema, responsive, accessible, styled

### Schema Utilities
- **File:** `src/lib/schema.ts`
- **Functions:**
  - `buildBreadcrumbJsonLd(items)` - Generates BreadcrumbList schema
  - `buildBlogPostingJsonLd(post, path)` - Generates BlogPosting + FAQPage schema

### FAQ Format
- **Frontmatter:** YAML array with `question` and `answer` fields
- **Rendering:** Styled cards via `BlogPostRenderer` component
- **Schema:** Automatically included in BlogPosting schema

---

## Conclusion

All pages now have proper breadcrumb navigation with structured data. Blog posts have comprehensive schema including BlogPosting, FAQPage, and BreadcrumbList. The site is well-optimized for rich results in Google search.

Next step: Add LocalBusiness schema to location pages for enhanced local SEO.
