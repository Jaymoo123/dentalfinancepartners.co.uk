# Comprehensive Architecture Audit - Findings & Fixes

**Date:** March 28, 2026  
**Auditor:** AI Assistant  
**Scope:** Complete system audit for niche isolation and dynamic configuration

---

## Executive Summary

**Status:** 🟡 **ISSUES FOUND** - Multiple hardcoded niche-specific values in shared components

**Critical Issues:** 4  
**Medium Issues:** 2  
**Low Issues:** 3  

**Action Required:** Fix all critical and medium issues before Property niche activation.

---

## CRITICAL ISSUES (Must Fix)

### 1. BrandWordmarkHomeLink - Hardcoded "Dental Finance Partners"

**File:** `Dentists/web/src/components/brand/BrandWordmarkHomeLink.tsx`  
**Status:** ❌ **NOT SHARED** (Lives in Dentists folder, not shared)  
**Issue:** Contains hardcoded text "Dental Finance" and "Partners"

```tsx
<span>Dental Finance</span>
<span>Partners</span>
```

**Impact:** HIGH - This is the logo/wordmark shown on every page. Property will show dental branding.

**Fix Required:**
- Option A: Move to niche-specific folder (keep in `Dentists/web/src/components/brand/`)
- Option B: Make dynamic by loading from config
- **Recommendation:** Option A - Brand wordmark should be unique per niche, not shared

**Action:** ✅ **ALREADY SAFE** - This file is in `Dentists/web/src/components/brand/`, NOT in `shared/web-core/`. Each niche will have its own version.

---

### 2. LeadForm - Hardcoded Dental Role Options

**File:** `shared/web-core/components/forms/LeadForm.tsx`  
**Lines:** 254-257  
**Issue:** Dropdown options are dental-specific

```tsx
<option value="Associate dentist">Associate dentist</option>
<option value="Practice owner">Practice owner</option>
<option value="Multi-practice group">Multi-practice group</option>
<option value="Other">Other</option>
```

**Impact:** HIGH - Property niche will show "Associate dentist" options to landlords.

**Fix Required:** Make role options configurable via niche config

```json
// niche.config.json
{
  "lead_form": {
    "role_options": [
      { "value": "Associate dentist", "label": "Associate dentist" },
      { "value": "Practice owner", "label": "Practice owner" },
      { "value": "Multi-practice group", "label": "Multi-practice group" },
      { "value": "Other", "label": "Other" }
    ],
    "placeholder_examples": {
      "name": "Dr Sarah Patel",
      "message": "e.g. I'm not sure if I should incorporate my practice..."
    }
  }
}
```

---

### 3. LeadForm - Hardcoded Placeholder Examples

**File:** `shared/web-core/components/forms/LeadForm.tsx`  
**Lines:** 182, 276  
**Issue:** Placeholders are dental-specific

```tsx
placeholder="Dr Sarah Patel"  // Line 182
placeholder="e.g. I'm not sure if I should incorporate my practice, or I'd like help with my self assessment…"  // Line 276
```

**Impact:** MEDIUM - Property niche will show dental examples to landlords.

**Fix Required:** Load from niche config (see above).

---

### 4. StickyCTA - Hardcoded "dental accountant" Text

**File:** `shared/web-core/components/ui/StickyCTA.tsx`  
**Lines:** 36, 39  
**Issue:** Contains hardcoded dental-specific copy

```tsx
Ready to work with a specialist dental accountant?
Book your free consultation today
```

**Impact:** HIGH - Property niche will show "dental accountant" in sticky CTA.

**Fix Required:** Make text configurable via props or niche config

```json
// niche.config.json
{
  "cta": {
    "sticky_primary": "Ready to work with a specialist dental accountant?",
    "sticky_secondary": "Book your free consultation today",
    "sticky_button": "Get started"
  }
}
```

---

### 5. BlogPostRenderer - Hardcoded "dental practice" Text

**File:** `shared/web-core/components/blog/BlogPostRenderer.tsx`  
**Line:** 91  
**Issue:** Contains hardcoded dental-specific copy in CTA section

```tsx
Every dental practice is different. If you would like to discuss how this applies to your specific circumstances, fill in the form below and we will arrange a short introductory call.
```

**Impact:** HIGH - Property blog posts will show "dental practice" in lead capture CTA.

**Fix Required:** Make text configurable via niche config

```json
// niche.config.json
{
  "blog": {
    "cta_heading": "Get specialist advice for your situation",
    "cta_body": "Every dental practice is different. If you would like to discuss how this applies to your specific circumstances, fill in the form below and we will arrange a short introductory call.",
    "cta_button": "Request a callback"
  }
}
```

---

## MEDIUM ISSUES (Should Fix)

### 6. Missing Source Tracking in LeadForm

**File:** `shared/web-core/components/forms/LeadForm.tsx`  
**Issue:** Form submits to Supabase but doesn't include `source` field

**Current Payload:**
```typescript
const payload = {
  full_name: "...",
  email: "...",
  phone: "...",
  role: "...",
  practice_name: "...",
  message: "...",
  source_url: "...",
  submitted_at: "..."
};
```

**Missing:** `source: "dentists"` or `source: "property"`

**Impact:** MEDIUM - Leads won't be properly tagged by niche in Supabase.

**Fix Required:** Add source field from niche config

```typescript
const payload = {
  ...existing fields,
  source: niche.content_strategy.source_identifier  // "dentists" or "property"
};
```

---

### 7. Google Analytics Event Tracking

**File:** `shared/web-core/components/forms/LeadForm.tsx`  
**Lines:** 126-131  
**Issue:** GA event tracking uses generic label, could be more specific

**Current:**
```typescript
gtag("event", "generate_lead", {
  event_category: "engagement",
  event_label: payload.role,
  value: 1,
});
```

**Impact:** LOW - Works, but could be more informative with source tracking.

**Enhancement:** Add niche identifier to event

```typescript
gtag("event", "generate_lead", {
  event_category: "engagement",
  event_label: `${niche.niche_id}_${payload.role}`,  // "dentists_Associate dentist"
  value: 1,
});
```

---

## LOW ISSUES (Nice to Have)

### 8. Comments Reference "Dental Finance Partners"

**File:** `shared/web-core/components/ui/layout-utils.ts`  
**Line:** 1  
**Issue:** Comment says "Dental Finance Partners"

```typescript
/** Shared layout primitives — mobile-first, Dental Finance Partners */
```

**Impact:** VERY LOW - Just a comment, doesn't affect functionality.

**Fix:** Update to generic comment.

---

### 9. CSS Comments Reference Dental Branding

**File:** `Dentists/web/src/app/globals.css`  
**Lines:** 5-6  
**Issue:** Comments mention "Dental Finance Partners" and "Navy + gold brand"

**Impact:** VERY LOW - Comments only, doesn't affect rendering.

**Fix:** Update to generic comments or leave as-is (niche-specific file).

---

## PAGES AUDIT (Niche-Specific Content)

### ✅ CORRECT - These Should Be Unique Per Niche

All page files in `Dentists/web/src/app/` contain niche-specific content. This is **correct and expected**.

**Files Audited:**
- ✅ `page.tsx` (Homepage) - Full of dental-specific copy (CORRECT - unique per niche)
- ✅ `services/page.tsx` - Dental services (CORRECT - unique per niche)
- ✅ `about/page.tsx` - About dental practice (CORRECT - unique per niche)
- ✅ `contact/page.tsx` - Uses dynamic `siteConfig` (CORRECT)
- ✅ `blog/page.tsx` - Generic blog listing (CORRECT)
- ✅ `blog/[slug]/page.tsx` - Uses BlogPostRenderer (needs fix, see #5)
- ✅ `locations/page.tsx` - Uses dynamic `siteConfig.locations` (CORRECT)
- ✅ `locations/[slug]/page.tsx` - Dynamic location pages (CORRECT)

**Verdict:** Pages are correctly isolated. No action needed on pages themselves.

---

## METADATA AUDIT

### ✅ CORRECT - Dynamic Metadata

**Files Audited:**
- ✅ `layout.tsx` - Uses `niche.seo.google_analytics_id`, `google_site_verification`, `theme_color`
- ✅ `sitemap.ts` - Uses `siteConfig.url` and `siteConfig.locations` (dynamic)
- ✅ `robots.ts` - Uses `siteConfig.url` (dynamic)
- ✅ `lib/schema.ts` - Uses `siteConfig` for all JSON-LD (dynamic)
- ✅ `lib/organization-schema.ts` - Uses `siteConfig` (dynamic)

**Verdict:** All metadata is properly dynamic. No hardcoded values.

---

## FORM SUBMISSION AUDIT

### 🟡 NEEDS FIX - Missing Source Field

**File:** `shared/web-core/components/forms/LeadForm.tsx`

**Current Behavior:**
- Submits to Supabase `leads` table
- Includes: name, email, phone, role, message, source_url, submitted_at
- **Missing:** `source` field ("dentists" or "property")

**Impact:** Leads from different niches won't be properly differentiated in Supabase.

**Fix Required:** Add source field from niche config (see Issue #6).

---

## ANALYTICS AUDIT

### ✅ CORRECT - Isolated Per Niche

**Google Analytics:**
- ✅ Each niche has unique GA4 property ID in `niche.config.json`
- ✅ Loaded dynamically: `<GoogleAnalytics measurementId={niche.seo.google_analytics_id} />`
- ✅ No cross-contamination possible

**Google Search Console:**
- ✅ Each niche has unique verification code in `niche.config.json`
- ✅ Loaded dynamically: `verification: { google: niche.seo.google_site_verification }`

**Verdict:** Analytics are properly isolated.

---

## CONFIG LOADING AUDIT

### ✅ CORRECT - Proper Loading Chain

**Flow:**
1. `niche.config.json` (JSON file in niche root)
2. `niche-loader.ts` (imports JSON, provides types)
3. `site.ts` (creates `siteConfig` from niche data)
4. Components import `siteConfig` or `niche` as needed

**Verified:**
- ✅ `tsconfig.json` includes `resolveJsonModule: true`
- ✅ `tsconfig.json` includes `../niche.config.json` in paths
- ✅ Build succeeds with dynamic config loading
- ✅ No runtime errors

**Verdict:** Config loading is correct and type-safe.

---

## SUMMARY OF REQUIRED FIXES

### Priority 1 (Must Fix Before Property Launch)

1. **LeadForm - Role Options** (Issue #2)
   - Add `lead_form.role_options` to `niche.config.json`
   - Update `LeadForm.tsx` to load options from config
   - Add `lead_form.placeholder_examples` to config

2. **LeadForm - Source Tracking** (Issue #6)
   - Add `source` field to form submission payload
   - Load from `niche.content_strategy.source_identifier`

3. **StickyCTA - Copy Text** (Issue #4)
   - Add `cta.sticky_primary`, `cta.sticky_secondary` to config
   - Update `StickyCTA.tsx` to load from config

4. **BlogPostRenderer - CTA Text** (Issue #5)
   - Add `blog.cta_heading`, `blog.cta_body` to config
   - Update `BlogPostRenderer.tsx` to load from config

### Priority 2 (Nice to Have)

5. **GA Event Tracking Enhancement** (Issue #7)
   - Add niche identifier to GA events

6. **Comment Cleanup** (Issues #8, #9)
   - Update comments to be generic

---

## TESTING CHECKLIST

Once fixes are applied, test:

### Build Tests
- [ ] `cd Dentists/web && npm run build` - Should succeed
- [ ] `cd Property/web && npm run build` - Should succeed (after Property setup)

### Config Loading Tests
- [ ] Verify `niche.config.json` loads correctly in both niches
- [ ] Check browser DevTools: page title, meta tags, JSON-LD all show correct niche data

### Form Submission Tests
- [ ] Submit lead from Dentists site
  - [ ] Check Supabase: `source = 'dentists'`
  - [ ] Check role options are dental-specific
- [ ] Submit lead from Property site
  - [ ] Check Supabase: `source = 'property'`
  - [ ] Check role options are property-specific

### Component Rendering Tests
- [ ] StickyCTA shows niche-specific text
- [ ] BlogPostRenderer CTA shows niche-specific text
- [ ] Header/Footer show correct niche branding
- [ ] Contact info is correct per niche

### Analytics Tests
- [ ] Dentists site sends events to `G-273RJY0LZQ`
- [ ] Property site sends events to different GA4 property
- [ ] No cross-contamination in GA4 reports

---

## FILES REQUIRING CHANGES

### Shared Components (Need Updates)
1. `shared/web-core/components/forms/LeadForm.tsx`
2. `shared/web-core/components/ui/StickyCTA.tsx`
3. `shared/web-core/components/blog/BlogPostRenderer.tsx`

### Configuration Files (Need Schema Updates)
1. `Dentists/niche.config.json`
2. `Dentists/web/src/config/niche-loader.ts` (TypeScript interface)

### Future Files (When Creating Property)
1. `Property/niche.config.json` (with property-specific values)

---

## VERIFIED SAFE (No Issues)

### Shared Components ✅
- `shared/web-core/components/layout/SiteHeader.tsx` - Fully dynamic
- `shared/web-core/components/layout/SiteFooter.tsx` - Fully dynamic
- `shared/web-core/components/layout/PageShell.tsx` - Fully dynamic
- `shared/web-core/components/ui/CTASection.tsx` - Fully dynamic (accepts props)
- `shared/web-core/components/ui/Breadcrumb.tsx` - Fully dynamic

### Utilities ✅
- `shared/web-core/lib/blog.ts` - Generic markdown parsing
- `shared/web-core/lib/schema.ts` - Uses `siteConfig` (dynamic)
- `shared/web-core/lib/organization-schema.ts` - Uses `siteConfig` (dynamic)

### Pages ✅
- All pages in `Dentists/web/src/app/` are niche-specific (CORRECT)
- Pages use `siteConfig` for dynamic values (CORRECT)
- No shared pages (CORRECT - pages should be unique)

### Metadata ✅
- `layout.tsx` - All metadata dynamic
- `sitemap.ts` - Fully dynamic
- `robots.ts` - Fully dynamic

---

## ARCHITECTURAL ASSESSMENT

### What's Working Well ✅

1. **Clear Boundaries**
   - Shared components in `/shared/web-core/`
   - Niche pages in `{Niche}/web/src/app/`
   - Configuration in `{Niche}/niche.config.json`

2. **Dynamic Configuration**
   - Site name, domain, contact info all load from config
   - Navigation, footer, locations all dynamic
   - Metadata (GA, Search Console) all dynamic

3. **Type Safety**
   - TypeScript interfaces for config
   - Compile-time validation
   - No runtime config errors

4. **Sync Process**
   - Script works correctly
   - Updates timestamp
   - Validates structure

### What Needs Improvement 🟡

1. **Incomplete Configuration Schema**
   - Missing `lead_form` section
   - Missing `cta` section
   - Missing `blog` section

2. **Hardcoded UI Copy**
   - StickyCTA text
   - BlogPostRenderer CTA text
   - LeadForm placeholders and options

3. **Missing Source Tracking**
   - Lead submissions don't include `source` field

---

## RECOMMENDED FIXES (In Order)

### Step 1: Update Configuration Schema

Add to `Dentists/niche.config.json`:

```json
{
  "lead_form": {
    "role_label": "I am a…",
    "role_options": [
      { "value": "Associate dentist", "label": "Associate dentist" },
      { "value": "Practice owner", "label": "Practice owner" },
      { "value": "Multi-practice group", "label": "Multi-practice group" },
      { "value": "Other", "label": "Other" }
    ],
    "placeholders": {
      "name": "Dr Sarah Patel",
      "email": "sarah@example.com",
      "phone": "07700 000000",
      "message": "e.g. I'm not sure if I should incorporate my practice, or I'd like help with my self assessment…"
    }
  },
  "cta": {
    "sticky_primary": "Ready to work with a specialist dental accountant?",
    "sticky_secondary": "Book your free consultation today",
    "sticky_button": "Get started"
  },
  "blog": {
    "cta_heading": "Get specialist advice for your situation",
    "cta_body": "Every dental practice is different. If you would like to discuss how this applies to your specific circumstances, fill in the form below and we will arrange a short introductory call.",
    "cta_button": "Request a callback"
  }
}
```

### Step 2: Update TypeScript Interface

Update `Dentists/web/src/config/niche-loader.ts` with new types.

### Step 3: Update Shared Components

Update the 3 components to load text from config instead of hardcoding.

### Step 4: Test Everything

Run full test suite (see checklist above).

### Step 5: Sync to Shared

Once verified, sync updated components:
```bash
python scripts/sync_shared_components.py --all
```

---

## RISK ASSESSMENT

### If We Deploy Without Fixes

**High Risk:**
- Property website shows "Associate dentist" in lead form
- Property website shows "dental accountant" in sticky CTA
- Property blog posts show "dental practice" in lead capture
- Leads from Property aren't tagged with `source = 'property'`

**Result:** Confused visitors, unprofessional appearance, poor lead tracking.

### If We Fix Before Deploying

**Low Risk:**
- All text is niche-appropriate
- Lead tracking works correctly
- Professional appearance maintained
- Easy to add more niches in future

---

## ESTIMATED FIX TIME

- Configuration updates: ~10 minutes
- Component updates: ~20 minutes
- Testing: ~15 minutes
- **Total: ~45 minutes**

---

## NEXT STEPS

1. Review this audit with user
2. Implement fixes (Priority 1 items)
3. Run full test suite
4. Update documentation
5. Proceed with Property niche activation

---

**Audit Status:** COMPLETE  
**Recommendation:** Fix Priority 1 issues before proceeding with Property niche.
