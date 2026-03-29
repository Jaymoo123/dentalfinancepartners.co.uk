# Property Tax Partners - Mobile-First Optimization Plan

**Date**: 2026-03-29  
**Priority**: CRITICAL - Must be completed before deployment  
**Status**: PLANNING PHASE

---

## Problem Statement

The Property Tax Partners website "looks horrendous on mobile" according to user feedback. Mobile-first optimization was skipped during initial deployment. This must be fixed as a first priority before the site can be considered production-ready.

---

## Current State Analysis

### Architecture Overview
- **Framework**: Next.js 15.5.14 with Tailwind CSS v4
- **Font**: Plus Jakarta Sans (400, 500, 600, 700, 800 weights)
- **Viewport**: Configured correctly (`width: device-width, initialScale: 1`)
- **Reference**: Dentists site uses similar stack with Cormorant Garamond + Plus Jakarta Sans

### Key Pages to Audit
1. **Homepage** (`/`) - Hero, calculators, service tiers, CTAs
2. **Contact** (`/contact`) - Lead form (critical conversion point)
3. **Services** (`/services`) - Service descriptions
4. **Calculators** (`/calculators`) - Interactive tools
5. **Incorporation** (`/incorporation`) - Specialized page
6. **Blog** (`/blog` and `/blog/[slug]`) - Content pages

### Components Requiring Mobile Optimization
1. **Hero Section** - 600-700px height, large text, image overlay
2. **Calculators** (4 total) - Input fields, results display, complex layouts
3. **ServiceTiers** - 3-column grid with cards
4. **LeadForm** - Form fields, validation, touch targets
5. **StickyCTA** - Fixed bottom bar
6. **Navigation** - Header and mobile menu
7. **Typography** - Heading sizes (5xl, 6xl, 7xl on desktop)

---

## Mobile Issues Identified (Predicted)

### Critical Issues

#### 1. Hero Section Typography Too Large
**Location**: `Property/web/src/app/page.tsx` line 118
```tsx
<h1 className="text-5xl font-bold leading-[1.1] text-white sm:text-6xl lg:text-7xl">
```
**Problem**: 
- Base size `text-5xl` (48px) is too large for mobile screens (320-375px width)
- Line height `1.1` is too tight for readability on small screens
- Hero height `h-[600px]` may be excessive on mobile

**Expected on Mobile**: Text overflow, poor readability, excessive vertical space

#### 2. Calculator Input Fields Not Touch-Optimized
**Location**: `Property/web/src/components/calculators/Section24Calculator.tsx` line 57
```tsx
className="flex-1 border-b-2 border-slate-300 bg-transparent px-2 py-3 text-2xl font-bold text-slate-900"
```
**Problem**:
- Input fields use `text-2xl` (24px) which may be too large on mobile
- Touch target size not explicitly set (should be min 44x44px)
- Number inputs may trigger incorrect mobile keyboards
- Horizontal layout may cause issues on narrow screens

**Expected on Mobile**: Cramped inputs, difficult to tap, poor keyboard experience

#### 3. Service Grid Not Responsive Enough
**Location**: `Property/web/src/app/page.tsx` line 164
```tsx
<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
```
**Problem**:
- 4-column grid on desktop collapses to single column on mobile
- Gap of `gap-8` (32px) may be excessive on mobile
- Icon size `h-20 w-20` (80px) may be too large

**Expected on Mobile**: Excessive spacing, oversized icons, poor use of screen space

#### 4. Form Fields Not Mobile-Optimized
**Location**: `Property/web/src/components/forms/LeadForm.tsx` line 10
```tsx
const fieldClass = "mt-1 w-full min-h-12 touch-manipulation rounded-lg border-2 border-slate-300 bg-white px-3.5 py-3 text-base text-slate-900"
```
**Problem**:
- `min-h-12` (48px) is good, but needs verification
- `touch-manipulation` is present (good)
- Font size `text-base` (16px) is correct (prevents iOS zoom)
- BUT: Grid layout `grid gap-5 sm:grid-cols-2` may cause issues

**Expected on Mobile**: Potentially acceptable, but needs testing

#### 5. Sticky CTA May Obscure Content
**Location**: `Property/web/src/components/ui/StickyCTA.tsx` line 34
```tsx
<div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
```
**Problem**:
- Fixed bottom bar with `py-4` (16px padding) = ~64px total height
- Text hidden on mobile: `hidden text-xs text-slate-300 sm:block`
- May cover important content or form submit buttons

**Expected on Mobile**: CTA blocks content, difficult to dismiss

#### 6. Button Sizing Inconsistent
**Location**: Multiple files
- Homepage: `text-lg px-10 py-4` (line 127)
- ServiceTiers: `px-8 py-4 text-base` (line 88)
- LeadForm: Uses `btnPrimary` utility

**Problem**: 
- Inconsistent padding and font sizes across components
- `px-10` (40px horizontal padding) may be excessive on mobile
- Touch targets may not meet 44x44px minimum

**Expected on Mobile**: Buttons too large or too small, inconsistent UX

#### 7. Image Heights Fixed Without Mobile Adjustment
**Location**: `Property/web/src/app/page.tsx`
- Hero: `h-[600px] sm:h-[700px]` (line 104)
- Property image: `h-96` (384px, line 225)

**Problem**:
- 600px hero height on mobile (375px wide) = excessive vertical space
- Images may not scale proportionally
- Content pushed below fold

**Expected on Mobile**: Poor above-fold content ratio, excessive scrolling

---

## Mobile-First Optimization Strategy

### Design Principles
1. **Touch-first**: All interactive elements ≥44x44px
2. **Readable**: Base font 16px minimum (prevents iOS zoom)
3. **Scannable**: Reduce visual density on small screens
4. **Fast**: Optimize images, reduce layout shifts
5. **Accessible**: WCAG 2.1 AA compliance

### Breakpoint Strategy (Tailwind)
- **Mobile**: `<640px` (default, no prefix)
- **Tablet**: `sm:` (≥640px)
- **Desktop**: `md:` (≥768px), `lg:` (≥1024px), `xl:` (≥1280px)

**Philosophy**: Design for 375px width first, enhance for larger screens.

---

## Implementation Plan

### Phase 1: Typography & Spacing (CRITICAL)

#### 1.1 Fix Hero Typography
**File**: `Property/web/src/app/page.tsx`
**Changes**:
- Line 118: Reduce base heading size
  - Current: `text-5xl ... sm:text-6xl lg:text-7xl`
  - New: `text-3xl ... sm:text-5xl lg:text-7xl`
- Line 118: Increase line height for mobile
  - Current: `leading-[1.1]`
  - New: `leading-[1.15] sm:leading-[1.1]`
- Line 123: Reduce body text size
  - Current: `text-xl ... sm:text-2xl`
  - New: `text-lg ... sm:text-xl lg:text-2xl`
- Line 104: Reduce hero height on mobile
  - Current: `h-[600px] sm:h-[700px]`
  - New: `h-[500px] sm:h-[600px] lg:h-[700px]`

#### 1.2 Fix Section Headings
**Files**: All page components
**Pattern**: Reduce all large headings for mobile
- `text-4xl sm:text-5xl` → `text-3xl sm:text-4xl lg:text-5xl`
- `text-3xl sm:text-4xl` → `text-2xl sm:text-3xl lg:text-4xl`

#### 1.3 Optimize Spacing
**Files**: All page components
**Changes**:
- Reduce vertical padding on mobile: `py-16 sm:py-20` → `py-12 sm:py-16 lg:py-20`
- Reduce grid gaps: `gap-8` → `gap-6 sm:gap-8`
- Reduce container padding where excessive

### Phase 2: Calculator Optimization (HIGH PRIORITY)

#### 2.1 Section24Calculator Mobile Layout
**File**: `Property/web/src/components/calculators/Section24Calculator.tsx`
**Changes**:
- Line 42: Make grid stack on mobile
  - Current: `grid gap-8 lg:grid-cols-[1fr_1.2fr]`
  - New: `grid gap-6 lg:gap-8 lg:grid-cols-[1fr_1.2fr]`
- Line 57: Reduce input text size on mobile
  - Current: `text-2xl font-bold`
  - New: `text-xl sm:text-2xl font-bold`
- Add mobile-specific input styling:
  - Increase touch target: `min-h-[44px]`
  - Adjust padding for mobile: `py-2 sm:py-3`

#### 2.2 Apply to All Calculators
**Files**: 
- `IncorporationCostCalculator.tsx`
- `MTDCheckerCalculator.tsx`
- `PortfolioProfitabilityCalculator.tsx`
- `RentalYieldCalculator.tsx`

**Pattern**: Same mobile optimizations as Section24Calculator

### Phase 3: Form Optimization (CONVERSION CRITICAL)

#### 3.1 LeadForm Touch Targets
**File**: `Property/web/src/components/forms/LeadForm.tsx`
**Current**: `min-h-12` (48px) - GOOD
**Verify**: All fields meet 44x44px minimum
**Changes**:
- Line 10: Increase padding on mobile if needed
  - Current: `px-3.5 py-3`
  - Verify: Total height ≥44px with text
- Line 180: Ensure grid stacks properly
  - Current: `grid gap-5 sm:grid-cols-2`
  - Verify: Works on 375px width

#### 3.2 Form Button Optimization
**File**: `Property/web/src/components/forms/LeadForm.tsx`
**Changes**:
- Line 259: Ensure button is full-width on mobile
  - Current: `w-full` - GOOD
- Verify: Button height ≥44px
- Add loading state visibility on mobile

### Phase 4: Navigation & CTA Optimization

#### 4.1 StickyCTA Mobile Refinement
**File**: `Property/web/src/components/ui/StickyCTA.tsx`
**Changes**:
- Line 34: Reduce padding on mobile
  - Current: `px-4 py-4`
  - New: `px-4 py-3 sm:py-4`
- Line 44: Reduce button padding on mobile
  - Current: `text-sm` - GOOD
  - Add: `px-4 py-2 sm:px-6 sm:py-3`
- Line 47: Increase close button touch target
  - Current: `h-8 w-8` (32px) - TOO SMALL
  - New: `h-11 w-11` (44px minimum)

#### 4.2 Header Navigation
**File**: `Property/web/src/components/layout/SiteHeader.tsx`
**Audit**: 
- Mobile menu functionality
- Touch targets for menu items
- Logo sizing on mobile
- Hamburger button size (must be ≥44x44px)

### Phase 5: Content Layout Optimization

#### 5.1 Service Cards Grid
**File**: `Property/web/src/app/page.tsx` line 164
**Changes**:
- Reduce gap on mobile: `gap-6 md:gap-8`
- Reduce icon size on mobile: `h-16 w-16 sm:h-20 sm:w-20`
- Adjust text sizing in cards

#### 5.2 ServiceTiers Cards
**File**: `Property/web/src/components/property/ServiceTiers.tsx`
**Changes**:
- Line 56: Reduce gap on mobile
  - Current: `gap-8 md:grid-cols-3`
  - New: `gap-6 sm:gap-8 md:grid-cols-3`
- Line 73: Reduce padding on mobile
  - Current: `p-8`
  - New: `p-6 sm:p-8`

#### 5.3 Who We Help Section
**File**: `Property/web/src/app/page.tsx` line 248
**Changes**:
- Reduce gap: `gap-6 md:gap-8`
- Reduce padding: `p-6 sm:p-8`
- Adjust border thickness on mobile if needed

### Phase 6: Image & Media Optimization

#### 6.1 Hero Image Height
**File**: `Property/web/src/app/page.tsx` line 104
**Changes**:
- Current: `h-[600px] sm:h-[700px]`
- New: `h-[450px] sm:h-[550px] lg:h-[700px]`

#### 6.2 Property Image Section
**File**: `Property/web/src/app/page.tsx` line 225
**Changes**:
- Current: `h-96` (384px)
- New: `h-72 sm:h-80 lg:h-96` (288px → 320px → 384px)

#### 6.3 Image Loading
**Verify**: 
- Priority images use `priority` prop
- Lazy loading for below-fold images
- Appropriate image sizes for mobile (use Next.js Image optimization)

### Phase 7: Interactive Elements

#### 7.1 FAQ Accordions
**File**: `Property/web/src/app/page.tsx` line 336
**Changes**:
- Reduce padding: `px-6 py-5` → `px-4 py-4 sm:px-6 sm:py-5`
- Increase tap target for summary
- Ensure + icon is large enough (currently `text-2xl` - verify)

#### 7.2 Button Consistency
**Create**: Mobile button utility classes
**Pattern**:
```tsx
// Mobile-first button sizing
const btnMobile = "px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg"
const btnMobileSmall = "px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base"
```

---

## Comparison with Dentists Site (Working Reference)

### What Dentists Does Well (Mobile)
1. **Typography scaling**: More conservative heading sizes
2. **Spacing**: Tighter spacing on mobile, expands on desktop
3. **Form layout**: Proven to work on mobile devices
4. **Navigation**: Mobile menu tested and functional

### Key Differences to Address
1. **Property uses larger hero** (600px vs Dentists' approach)
2. **Property has 4 calculators** (more complex than Dentists)
3. **Property uses emerald/slate** (vs Dentists' navy/gold)
4. **Property has more visual density** (needs reduction on mobile)

---

## Testing Strategy

### Device Matrix
**Primary Test Devices** (most common UK users):
- iPhone 12/13/14 (390x844px)
- iPhone SE (375x667px)
- Samsung Galaxy S21/S22 (360x800px)
- Google Pixel 5/6 (393x851px)

**Browser Testing**:
- Safari iOS (primary)
- Chrome Android (primary)
- Chrome iOS (secondary)

### Test Scenarios

#### Homepage Test
1. Load homepage on 375px viewport
2. Verify hero text is readable without horizontal scroll
3. Verify all buttons are tappable (44x44px minimum)
4. Verify images load and scale correctly
5. Verify calculators are usable (inputs, results)
6. Verify sticky CTA doesn't block content

#### Contact Form Test
1. Load `/contact` on mobile
2. Tap each form field - verify keyboard appears correctly
3. Fill out form with realistic data
4. Submit and verify success flow
5. Verify validation errors are visible
6. Verify form doesn't cause horizontal scroll

#### Blog Post Test
1. Load a blog post on mobile
2. Verify typography is readable (16px minimum)
3. Verify tables are responsive or scrollable
4. Verify images don't overflow
5. Verify CTA at bottom is visible and tappable

---

## Implementation Sequence

### Step 1: Create Mobile Testing Baseline
- [ ] Deploy current version
- [ ] Screenshot all pages on 375px viewport
- [ ] Document specific issues with screenshots

### Step 2: Typography & Spacing Pass
- [ ] Reduce all heading sizes for mobile
- [ ] Adjust line heights for readability
- [ ] Reduce section padding on mobile
- [ ] Reduce grid gaps on mobile

### Step 3: Interactive Elements Pass
- [ ] Verify all buttons ≥44x44px
- [ ] Optimize form inputs for touch
- [ ] Fix calculator layouts for mobile
- [ ] Adjust sticky CTA sizing

### Step 4: Layout & Images Pass
- [ ] Reduce hero heights on mobile
- [ ] Fix grid layouts (service cards, tiers)
- [ ] Optimize image sizing
- [ ] Fix any horizontal scroll issues

### Step 5: Testing & Refinement
- [ ] Test on iPhone Safari (375px)
- [ ] Test on Android Chrome (360px)
- [ ] Test form submission on mobile
- [ ] Test calculator interactions on mobile
- [ ] Fix any remaining issues

### Step 6: Deployment
- [ ] Commit all mobile optimizations
- [ ] Deploy to Vercel
- [ ] Test live site on real devices
- [ ] Verify no regressions on desktop

---

## Specific File Changes Required

### High Priority (Do First)
1. `Property/web/src/app/page.tsx` - Hero, typography, spacing
2. `Property/web/src/components/calculators/*.tsx` - All 4 calculators
3. `Property/web/src/components/forms/LeadForm.tsx` - Form optimization
4. `Property/web/src/components/ui/StickyCTA.tsx` - CTA sizing

### Medium Priority
5. `Property/web/src/components/property/ServiceTiers.tsx` - Card layout
6. `Property/web/src/app/contact/page.tsx` - Contact page layout
7. `Property/web/src/app/services/page.tsx` - Services layout
8. `Property/web/src/components/layout/SiteHeader.tsx` - Navigation

### Lower Priority (If Time Permits)
9. `Property/web/src/app/blog/[slug]/page.tsx` - Blog post layout
10. `Property/web/src/app/calculators/page.tsx` - Calculators page
11. All other pages - General mobile refinement

---

## Success Criteria

The mobile optimization is complete when:

1. ✅ All text is readable on 375px viewport without horizontal scroll
2. ✅ All interactive elements (buttons, inputs, links) are ≥44x44px
3. ✅ Form inputs trigger correct mobile keyboards (email, tel, number)
4. ✅ Hero section uses <60% of viewport height on mobile
5. ✅ Calculators are fully functional on mobile (inputs, results visible)
6. ✅ Sticky CTA doesn't block form submit buttons
7. ✅ No horizontal scroll on any page at 375px width
8. ✅ Images load quickly and scale appropriately
9. ✅ Typography hierarchy is clear and readable
10. ✅ Spacing feels comfortable, not cramped or excessive

---

## Risk Assessment

### High Risk
- **Breaking desktop layout**: Changes must be mobile-first, not mobile-only
  - **Mitigation**: Use responsive classes (`sm:`, `md:`, `lg:`)
  - **Testing**: Verify desktop layout after each change

### Medium Risk
- **Form submission issues**: Changes to LeadForm could break functionality
  - **Mitigation**: Test form locally after changes
  - **Testing**: Submit test lead on mobile before deploying

### Low Risk
- **Visual inconsistency**: Changes may not match Dentists aesthetic
  - **Mitigation**: Property has its own design language (emerald/slate)
  - **Acceptable**: Differences are intentional for niche differentiation

---

## Estimated Effort

**Total Changes**: ~50-70 className updates across 8-10 files  
**Tool Calls**: ~40-50 (read files, make edits, test, deploy)  
**Testing**: Manual testing on mobile devices required  
**Timeline**: Complete in single session (1-2 hours with testing)

---

## Next Action

**AWAITING USER APPROVAL**

Once approved, I will:
1. Start with Phase 2 (Typography & Spacing) - highest impact
2. Move to Phase 3 (Forms) - conversion critical
3. Continue through all phases systematically
4. Test at each major milestone
5. Deploy only when mobile experience is excellent

**User**: Please confirm you want me to proceed with mobile-first optimization. I will make ~50-70 changes across the Property site to ensure it looks professional and functions perfectly on mobile devices.
