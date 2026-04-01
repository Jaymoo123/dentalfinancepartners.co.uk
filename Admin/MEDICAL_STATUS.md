# Medical Site Status Report
**Date:** 2026-04-01 00:48 UTC

## Overview: Medical = GPs & Doctors ONLY (No Pharmacies)

**Target Audience:**
- GP Partners & Salaried GPs
- Hospital Consultants
- Locum Doctors
- Private Practice Owners

**NOT included:** Pharmacies, pharmacists, or pharmacy accounting

---

## Design Status: BASIC STRUCTURE COMPLETE

### What's Built ✓

**Homepage (`Medical/web/src/app/page.tsx`):**
- ✓ Hero section with branding
- ✓ "Who we work with" section (GPs, Consultants, Locums)
- ✓ "How we work" section (6 services)
- ✓ Trust indicators (100% medical focus, 50+ clients, fixed fees)
- ✓ Problem/solution messaging
- ✓ Lead form integration
- ✓ Sticky CTA
- ✓ Organization schema

**Pages Built:**
- ✓ `/` - Homepage
- ✓ `/about` - About page
- ✓ `/services` - Services page

**Infrastructure:**
- ✓ Next.js 15 setup
- ✓ Tailwind CSS 4
- ✓ TypeScript
- ✓ Shared components (forms, layout, brand)
- ✓ Niche config system

### What's Missing ❌

**Pages:**
- ❌ `/blog` - Blog listing page
- ❌ `/blog/[slug]` - Individual blog posts
- ❌ `/contact` - Contact page
- ❌ `/nhs-pension` - NHS Pension page
- ❌ `/locations` - Location pages
- ❌ `/locations/[slug]` - Individual location pages
- ❌ `/calculators` - Calculator tools
- ❌ `/privacy-policy`, `/terms`, `/cookie-policy`

**Content:**
- ❌ Blog posts (0 posts)
- ❌ Supabase table (`blog_topics_medical` returns 404)

**Components:**
- ❌ Medical-specific components (no `components/medical/` folder)
- ❌ Calculator components
- ❌ Blog renderer

**Assets:**
- ❌ Public folder (images, logos, etc.)

---

## Design Consistency

**Current State:**
- Uses shared component system (same as Property & Dentists)
- Medical teal color scheme (#0891b2)
- Coral accent color
- Professional, clean design
- Matches Property/Dentists visual language

**Messaging:**
- Clear GP/medical focus throughout
- NHS pension emphasis
- Locum tax positioning
- No pharmacy mentions ✓

---

## Content Strategy (from config)

**Categories:**
1. GP Tax & Accounts
2. NHS Pension Planning
3. Locum Tax
4. Private Practice
5. Medical Expenses
6. Incorporation & Company Structures
7. Consultant Tax

**Locations:**
- London, Manchester, Birmingham, Leeds, Bristol

**Supabase Table:** `blog_topics_medical` (currently doesn't exist)

---

## What Needs to Happen

### Phase 1: Complete Core Pages (Before Content)
1. Create blog infrastructure (`/blog`, `/blog/[slug]`)
2. Add missing pages (contact, nhs-pension, locations, etc.)
3. Create Medical-specific components if needed
4. Add public assets (logos, images)

### Phase 2: Content Generation
1. Create Supabase table `blog_topics_medical`
2. Import topic planning CSV
3. Generate blog posts (similar to Property/Dentists)

### Phase 3: Calculator Tools (Week 4)
1. NHS Pension Annual Allowance Calculator
2. Locum Tax Calculator
3. Private Practice Incorporation Calculator

---

## Comparison to Property & Dentists

| Feature | Property | Dentists | Medical |
|---------|----------|----------|---------|
| Homepage | ✓ Complete | ✓ Complete | ✓ Complete |
| Services | ✓ Complete | ✓ Complete | ✓ Complete |
| About | ✓ Complete | ✓ Complete | ✓ Complete |
| Contact | ✓ Complete | ✓ Complete | ❌ Missing |
| Blog listing | ✓ Complete | ✓ Complete | ❌ Missing |
| Blog posts | ✓ 118 posts | ✓ 69 posts | ❌ 0 posts |
| Locations | ✓ Complete | ✓ Complete | ❌ Missing |
| Calculators | ✓ 4 tools | ✓ 0 tools | ❌ 0 tools |
| Supabase table | ✓ 231 topics | ✓ 117 topics | ❌ No table |

---

## Recommendation

**Medical is ~40% complete:**
- ✓ Design system and branding
- ✓ Core homepage with messaging
- ✓ Basic pages (about, services)
- ❌ Blog infrastructure
- ❌ Content
- ❌ Location pages
- ❌ Contact page

**Next Steps:**
1. Copy missing page templates from Property/Dentists
2. Create blog infrastructure
3. Set up Supabase table
4. Generate content (similar phased approach)

**Timeline Estimate:**
- Page setup: 1-2 hours
- Content generation: 4-6 hours (assuming similar volume to Dentists)
- Total: 1 day to reach parity with Property/Dentists

---

## Audience Clarity: ✓ CONFIRMED

Medical site is **exclusively for GPs and doctors:**
- GPs (partners and salaried)
- Hospital consultants
- Locum doctors
- Private practice owners

**No pharmacy content** - completely separate audience and would require a different niche site if needed.
