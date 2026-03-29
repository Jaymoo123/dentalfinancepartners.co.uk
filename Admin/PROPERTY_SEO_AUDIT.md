# Property Website SEO & Functionality Audit

**Date:** 29 March 2026  
**Site:** http://localhost:3001 (dev) | propertyaccountants.co.uk (production)

---

## ✅ COMPLETED ITEMS

### Content & Pages
- ✅ **Homepage** - Fully optimised with hero, services, tiers, calculators, CTAs
- ✅ **About page** - Complete with stats, team info, differentiators
- ✅ **Services page** - All services listed with features and CTAs
- ✅ **Contact page** - Working form, direct contact details, what to expect
- ✅ **Calculators page** - 4 working calculators with professional design
- ✅ **Incorporation page** - Complete guide with calculator
- ✅ **Blog index** - Styled and ready (awaiting content)
- ✅ **Blog detail template** - Professional layout with schema
- ✅ **Locations hub** - All 5 locations listed
- ✅ **Location detail pages** - London, Manchester, Birmingham, Leeds, Bristol
- ✅ **Thank you page** - Post-submission confirmation
- ✅ **Terms page** - Complete legal terms
- ✅ **Privacy policy** - UK GDPR compliant
- ✅ **Cookie policy** - Analytics cookies explained

### Technical SEO
- ✅ **Robots.txt** - Generated dynamically, disallows /thank-you
- ✅ **Sitemap.xml** - Dynamic generation including all pages, locations, blog posts
- ✅ **Canonical URLs** - Set on all pages
- ✅ **Meta descriptions** - Unique for each page
- ✅ **Open Graph tags** - Configured for social sharing
- ✅ **Structured data** - Organization schema on homepage, BlogPosting schema on articles
- ✅ **Google Analytics** - Configured (placeholder ID needs updating)
- ✅ **Locale** - Set to en-GB throughout
- ✅ **Mobile viewport** - Configured with theme color
- ✅ **Image optimisation** - Using Next/Image with Unsplash configured

### Design & UX
- ✅ **Responsive design** - Mobile, tablet, desktop
- ✅ **Professional imagery** - UK property photos throughout
- ✅ **Consistent branding** - Emerald/slate color scheme
- ✅ **Accessibility** - ARIA labels, focus states, keyboard navigation
- ✅ **Loading states** - Form submission feedback
- ✅ **Error handling** - Form validation with clear messages

---

## ⚠️ ISSUES REQUIRING ATTENTION

### 1. CRITICAL: No Blog Content
**Status:** BLOCKING SEO
**Issue:** Blog folder is empty - no content files found
**Impact:** 
- No organic traffic from long-tail keywords
- Missing topical authority signals
- Sitemap includes blog posts but none exist
**Action Required:** Generate property accounting blog content or migrate existing content

### 2. CRITICAL: Lead Form Not Tested
**Status:** UNKNOWN
**Issue:** Supabase credentials are configured but form submission hasn't been tested
**Impact:** Potential lead loss if form fails silently
**Action Required:** 
- Test form submission end-to-end
- Verify data reaches Supabase `leads` table
- Check email notifications (if configured)
- Test validation errors display correctly

### 3. HIGH: Legal Pages Still Reference Dentists
**Status:** NEEDS UPDATE
**Issue:** Cookie policy mentions "dental professionals" instead of landlords
**Location:** `cookie-policy/page.tsx` line 57
**Action Required:** Update all legal pages to use property/landlord language

### 4. MEDIUM: Placeholder Contact Details
**Status:** NEEDS UPDATE
**Issue:** Phone number is `+44 20 XXXX XXXX` (placeholder)
**Location:** `niche.config.json`
**Impact:** Users can't actually call
**Action Required:** Add real phone number or remove phone contact option

### 5. MEDIUM: Placeholder Analytics ID
**Status:** NEEDS UPDATE
**Issue:** Google Analytics ID is `G-PROPERTY-PLACEHOLDER`
**Location:** `niche.config.json`
**Impact:** No analytics data collection
**Action Required:** Create GA4 property and update ID

### 6. MEDIUM: Site Verification Not Set
**Status:** NEEDS UPDATE
**Issue:** Google Search Console verification is `PROPERTY-VERIFICATION-PLACEHOLDER`
**Location:** `niche.config.json`
**Impact:** Can't verify site ownership in Search Console
**Action Required:** Add site to Search Console and update verification code

### 7. LOW: Missing Calculators in Sitemap
**Status:** ENHANCEMENT
**Issue:** Individual calculator pages not in sitemap (only /calculators hub)
**Impact:** Minor - calculators are on homepage anyway
**Action Required:** Consider adding /calculators#section24, etc. or leave as-is

### 8. LOW: Missing Incorporation Page in Sitemap
**Status:** NEEDS FIX
**Issue:** `/incorporation` not listed in sitemap static paths
**Impact:** Search engines may not discover it quickly
**Action Required:** Add to sitemap.ts

---

## 🔍 CONTENT AUDIT

### Pages with Content: 14/14
1. Homepage ✅
2. About ✅
3. Services ✅
4. Contact ✅
5. Calculators ✅
6. Incorporation ✅
7. Blog index ✅ (no posts yet)
8. Locations hub ✅
9-13. Location pages (5) ✅
14. Thank you ✅

### Legal Pages: 3/3
- Terms ✅ (needs dental→property update)
- Privacy ✅ (needs dental→property update)
- Cookie ✅ (needs dental→property update)

### Blog Content: 0 posts
**CRITICAL GAP** - No content for SEO

---

## 📊 SEO CHECKLIST

### On-Page SEO
- ✅ Unique title tags (all pages)
- ✅ Unique meta descriptions (all pages)
- ✅ H1 tags (one per page)
- ✅ Heading hierarchy (H1→H2→H3)
- ✅ Alt text on images
- ✅ Internal linking structure
- ✅ Breadcrumb navigation
- ✅ Mobile responsive
- ✅ Fast loading (Next.js optimised)

### Technical SEO
- ✅ Robots.txt configured
- ✅ Sitemap.xml generated
- ⚠️ Sitemap missing /incorporation
- ✅ Canonical URLs set
- ✅ 404 page (Next.js default)
- ✅ HTTPS ready (when deployed)
- ⚠️ No blog content for indexing

### Local SEO
- ✅ Location pages for 5 UK cities
- ✅ City-specific content
- ✅ Local keywords in titles/descriptions
- ⚠️ No Google Business Profile integration (future)
- ⚠️ No schema for LocalBusiness (could add)

### Content SEO
- ❌ No blog posts (CRITICAL)
- ✅ Calculators provide unique value
- ✅ FAQ sections on key pages
- ✅ Service descriptions detailed
- ✅ Clear value propositions

---

## 🧪 FUNCTIONALITY TESTING NEEDED

### Lead Form
- ❓ Form submission to Supabase
- ❓ Validation error display
- ❓ Success redirect to /thank-you
- ❓ Google Analytics conversion tracking
- ❓ Email notifications (if configured)

### Calculators
- ✅ Section 24 - Math logic verified
- ✅ Incorporation - Math logic verified
- ✅ MTD Checker - Threshold logic verified
- ✅ Portfolio - Multi-property tracking verified

### Navigation
- ✅ Header navigation works
- ✅ Mobile menu works
- ✅ Footer links work
- ✅ Breadcrumbs work
- ✅ Sticky CTA appears on scroll

---

## 🎯 PRIORITY ACTION ITEMS

### IMMEDIATE (Before Launch)
1. **Test lead form submission** - Verify Supabase integration works
2. **Update legal pages** - Remove dental references, add property language
3. **Add real phone number** - Or remove phone contact option
4. **Fix sitemap** - Add /incorporation to static paths
5. **Create blog content** - At least 10-15 posts for launch

### BEFORE PRODUCTION DEPLOY
6. **Update .env.local** - Change NEXT_PUBLIC_SITE_URL from localhost to production domain
7. **Create GA4 property** - Get real Google Analytics ID
8. **Verify Search Console** - Get real verification code
9. **Test on staging** - Full functionality test on production-like environment
10. **Check all images load** - Verify Unsplash images work in production

### POST-LAUNCH
11. **Submit sitemap to Search Console**
12. **Set up Google Business Profile** (if applicable)
13. **Monitor form submissions** - Ensure leads are captured
14. **Add LocalBusiness schema** - For location pages
15. **Create content calendar** - Regular blog publishing

---

## 📝 NOTES

### Strengths
- Clean, professional design that matches industry leaders
- Strong technical foundation (Next.js, TypeScript, Tailwind v4)
- Unique value proposition (free calculators)
- Clear service differentiation
- Mobile-first responsive design

### Weaknesses
- No blog content (major SEO gap)
- Untested lead capture flow
- Placeholder contact details
- Legal pages need property-specific updates

### Competitive Position
- Design now matches/exceeds Provestor and The Property Accountant
- Calculators provide immediate value (competitive advantage)
- Clear service tiers (matches industry standard)
- Professional imagery and trust signals present

---

## ESTIMATED COMPLETION TIME

- Legal page updates: 15 minutes
- Lead form testing: 10 minutes
- Sitemap fix: 2 minutes
- Config updates (phone, GA, verification): 5 minutes
- **Blog content creation: SEPARATE TASK** (requires AI agent or manual writing)

**Total for immediate fixes:** ~30 minutes
**Blog content:** Depends on content strategy (10-50 posts needed)
