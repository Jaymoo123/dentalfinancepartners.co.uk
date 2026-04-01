# Medical Site Completion Plan
**Date:** 2026-04-01 00:50 UTC

## Goal: Complete Medical Site Fundamentals (No Blog Yet)

**Scope:** Get Medical site to same structural completeness as Property/Dentists
**Exclusions:** Blog content, calculators (Week 4), advanced features

---

## Current State Analysis

### What Medical HAS ✓
- Homepage (page.tsx) - Full design with sections
- Services page - Full design
- About page - Full design
- Layout (layout.tsx) - Navigation, footer
- Shared components (forms, brand, layout, UI)
- Niche config (niche.config.json)

### What Medical NEEDS ❌
1. Contact page
2. Blog infrastructure (blog/page.tsx, blog/[slug]/page.tsx)
3. Locations pages (locations/page.tsx, locations/[slug]/page.tsx)
4. Legal pages (privacy-policy, terms, cookie-policy)
5. Utility pages (thank-you, not-found, error, global-error)
6. Sitemap (sitemap.ts)
7. Robots (robots.ts)
8. Public assets folder

---

## Page-by-Page Plan

### 1. Contact Page (/contact)

**Source:** Copy from Dentists (simpler, cleaner design than Property)

**Changes needed:**
- ✓ Uses siteConfig (no hardcoded text)
- Change: Hero image (medical-themed, not dental)
- Change: "What to expect" bullets - medical-specific language
- Change: Form context - mention NHS pension, locum tax, GP accounting

**Uniqueness strategy:**
- Different hero image
- Medical-specific "what to expect" points
- GP/consultant language (not dental)
- Emphasize NHS pension complexity

---

### 2. Blog Infrastructure

#### A. Blog Listing Page (/blog/page.tsx)

**Source:** Copy from Dentists

**Changes needed:**
- ✓ Uses siteConfig
- ✓ Uses getAllPosts() from lib/blog.ts
- Change: Hero image (medical-themed)
- Change: Page title/description - medical keywords
- Change: Intro text - GP/medical focus

**Uniqueness:**
- Different hero image
- Medical-specific intro paragraph
- Categories: "GP Tax", "NHS Pension", "Locum Tax", etc.

#### B. Blog Post Page (/blog/[slug]/page.tsx)

**Source:** Copy from Property or Dentists (both similar)

**Changes needed:**
- ✓ Uses siteConfig
- ✓ Uses getPostBySlug(), getRelatedPosts()
- ✓ Uses BlogPostRenderer component
- No changes needed - fully dynamic

**Uniqueness:** Content itself (blog posts) will be unique

---

### 3. Locations Pages

#### A. Locations Listing (/locations/page.tsx)

**Source:** Copy from Dentists

**Changes needed:**
- ✓ Uses niche.config.json locations
- Change: Hero image (medical-themed)
- Change: Page title - "GP Accountants in [City]"
- Change: Intro text - medical-specific

**Uniqueness:**
- Different hero image
- Medical-specific messaging
- GP/consultant language

#### B. Individual Location (/locations/[slug]/page.tsx)

**Source:** Copy from Dentists

**Changes needed:**
- ✓ Uses niche.config.json
- ✓ Dynamic city names
- Change: Hero images (medical-themed per city)
- Change: Service descriptions - medical-specific
- Change: Local business schema - medical organization type

**Uniqueness:**
- Different images
- Medical-specific services
- GP accountant positioning
- NHS pension emphasis

---

### 4. Legal Pages

**Source:** Copy from Dentists (simpler than Property)

**Pages:**
- `/privacy-policy` - GDPR compliance
- `/terms` - Terms of service
- `/cookie-policy` - Cookie usage

**Changes needed:**
- Replace company name with "Medical Accountants UK Ltd"
- Replace email with medical site email
- Update service descriptions (medical, not dental)

**Uniqueness:**
- Different company name
- Medical-specific service descriptions
- GP/doctor language

---

### 5. Utility Pages

**Source:** Copy from Dentists

**Pages:**
- `/thank-you` - Form submission confirmation
- `/not-found` - 404 page
- `/error.tsx` - Error boundary
- `/global-error.tsx` - Global error boundary

**Changes needed:**
- ✓ Most use siteConfig (minimal changes)
- Update any hardcoded text to medical context

---

### 6. Sitemap & Robots

**Source:** Copy from Dentists

**Files:**
- `sitemap.ts` - XML sitemap generation
- `robots.ts` - robots.txt

**Changes needed:**
- ✓ Uses siteConfig.url (no changes needed)
- ✓ Dynamic based on pages/posts

---

### 7. Public Assets Folder

**Source:** Create new (can't copy - would be duplicate content)

**Needed:**
- `/public/og-placeholder.svg` - OpenGraph image
- `/public/brand/logo.png` - Logo (if custom)
- Hero images for pages (Unsplash medical-themed)

**Strategy:**
- Use different Unsplash images (medical professionals, hospitals, stethoscopes)
- Create unique OG image with medical branding
- Ensure no image overlap with Property/Dentists

---

## Differentiation Strategy: Avoiding Google Duplicate Content

### Structural Differentiation ✓
- Different niche configs (audience, services, locations)
- Different color schemes (medical teal vs property emerald vs dentist blue)
- Different domains
- Different company names

### Content Differentiation (Critical)

**What's Safe to Copy:**
- ✓ Component structure (React components)
- ✓ Layout patterns (Next.js pages)
- ✓ Utility functions (lib files)
- ✓ Form components

**What MUST Be Unique:**
1. **All visible text content:**
   - Page titles, descriptions, headings
   - Body paragraphs
   - Service descriptions
   - Legal page content (company-specific)

2. **Images:**
   - Hero images (different Unsplash photos)
   - OG images (unique branding)
   - Icons (can be same - not indexed)

3. **Metadata:**
   - Page titles
   - Meta descriptions
   - OpenGraph text
   - Schema.org data (different company names)

4. **Blog posts:**
   - Completely unique content per niche
   - Different keywords, topics, angles

### How We'll Ensure Uniqueness

**For each page copied:**
1. Replace all hardcoded text with medical-specific language
2. Rewrite intro paragraphs from scratch
3. Use different hero images
4. Update metadata completely
5. Change service descriptions to medical focus
6. Use GP/consultant/locum terminology (not landlord/property)

**Example transformations:**
- "landlords" → "GPs and medical professionals"
- "Section 24" → "NHS pension annual allowance"
- "property portfolio" → "medical practice"
- "rental income" → "private practice income"
- "incorporation" → "private practice incorporation"

---

## Implementation Order

### Phase 1: Essential Pages (1-2 hours)
1. Contact page - High priority, simple
2. Legal pages (privacy, terms, cookies) - Required for launch
3. Utility pages (thank-you, not-found, errors) - Quick

### Phase 2: Blog Infrastructure (30 min)
4. Blog listing page
5. Blog post page
6. Update lib/blog.ts if needed

### Phase 3: Location Pages (1 hour)
7. Locations listing
8. Individual location pages

### Phase 4: Assets & Polish (30 min)
9. Public folder with images
10. Test all pages
11. Fix any linter errors

---

## File Copying Matrix

| Page | Copy From | Complexity | Changes Required |
|------|-----------|------------|------------------|
| contact | Dentists | Low | Hero image, text |
| blog/page | Dentists | Low | Hero image, intro text |
| blog/[slug] | Dentists | Low | None (dynamic) |
| locations/page | Dentists | Medium | Hero image, all text |
| locations/[slug] | Dentists | Medium | Images, service text, schema |
| privacy-policy | Dentists | Low | Company name, services |
| terms | Dentists | Low | Company name, services |
| cookie-policy | Dentists | Low | Company name |
| thank-you | Dentists | Low | Minimal |
| not-found | Dentists | Low | Minimal |
| error.tsx | Dentists | Low | None |
| global-error.tsx | Dentists | Low | None |
| sitemap.ts | Dentists | Low | None (dynamic) |
| robots.ts | Dentists | Low | None (dynamic) |

---

## Text Uniqueness Checklist

For each page, we'll ensure:
- [ ] Page title is unique and medical-specific
- [ ] Meta description is unique
- [ ] H1 heading is rewritten
- [ ] Intro paragraph is written from scratch
- [ ] Service descriptions use medical terminology
- [ ] Hero image is different
- [ ] No shared sentences with Property/Dentists
- [ ] Company name updated throughout
- [ ] Contact details updated
- [ ] Schema.org data is medical-specific

---

## Quality Gates

Before marking Medical as "fundamentally complete":
1. ✓ All 14 pages exist and render
2. ✓ All visible text is unique (no copy-paste from other sites)
3. ✓ All images are different
4. ✓ All metadata is unique
5. ✓ Navigation works
6. ✓ Forms submit correctly
7. ✓ No linter errors
8. ✓ Builds successfully
9. ✓ Mobile responsive
10. ✓ Accessibility (alt text, ARIA labels)

---

## Post-Fundamentals (Future)

**Not in this phase:**
- Blog content generation (separate task)
- Calculator tools (Week 4)
- Advanced features
- SEO optimization
- Performance tuning

---

## Estimated Effort

**Total time:** 3-4 hours
**Complexity:** Medium (mostly copying with careful text rewriting)
**Risk:** Low (proven templates, just need unique content)

**Breakdown:**
- Contact page: 20 min
- Blog pages: 30 min
- Location pages: 60 min
- Legal pages: 40 min
- Utility pages: 20 min
- Assets: 20 min
- Testing: 30 min

---

## Success Criteria

Medical site will be "fundamentally complete" when:
- ✓ All core pages exist and work
- ✓ Site builds without errors
- ✓ All text content is unique (passes Google duplicate content check)
- ✓ All images are unique
- ✓ Ready for blog content generation (Phase 2)
- ✓ Ready for calculator tools (Week 4)

**Then:** Medical will be at parity with Property/Dentists structure, just needs content.
