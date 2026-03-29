# Property Website Design Audit & Redesign Results

**Date:** 29 March 2026  
**Status:** Complete  
**Server:** http://localhost:3001

## Research Phase

Analysed leading UK property accounting websites:
- **The Property Accountant** (thepropertyaccountant.uk)
- **Provestor** (provestor.co.uk)
- **2026 Financial Services Design Trends**

### Key Findings:
1. **Trust over decoration** - Clean, minimal design with strategic white space
2. **Large hero imagery** - Professional UK property photography
3. **Data-driven aesthetics** - Numbers displayed prominently with visual weight
4. **Clear service tiers** - Visual differentiation between DIY, Assisted, Done-for-you
5. **Trust signals** - Response times, client counts, credentials prominently displayed
6. **Outcome-focused messaging** - Benefits over features

---

## Component-by-Component Redesign

### 1. Homepage Hero Section
**Issues Fixed:**
- ✅ Background too transparent - text not readable
- ✅ Generic layout with no visual impact

**Changes:**
- Increased overlay opacity from gradient to solid `bg-slate-900/90`
- Changed text from `text-slate-200` to `text-slate-100` and `text-white` for maximum contrast
- Added large UK property photography as background
- Added trust badges with visual indicators (100+ landlords, 24hr response, fixed fees)
- Dual CTA buttons with clear hierarchy

### 2. Service Icons ("What we specialise in")
**Issues Fixed:**
- ✅ Flat green squares looked basic and "AI-generated"
- ✅ No visual depth or polish

**Changes:**
- Applied gradient background: `bg-gradient-to-br from-emerald-500 to-emerald-700`
- Added shadow and hover effects: `shadow-lg hover:shadow-xl`
- Added scale animation on hover: `hover:scale-105`
- Added subtle border: `border border-emerald-400/20`
- Added backdrop blur for glass effect: `backdrop-blur-sm`

### 3. Service Tiers
**Issues Fixed:**
- ✅ CTAs misaligned across cards
- ✅ Cards different heights causing visual imbalance

**Changes:**
- Added `items-start` to grid for top alignment
- Added `h-full` to cards for equal height
- Added `flex flex-col h-full` to card content
- Added `mt-auto` to CTA buttons to push them to bottom
- Increased gap from `gap-6` to `gap-8` for better breathing room
- Kept featured card scale effect: `md:scale-105` (desktop only)

### 4. Calculator Components
**Complete Redesign:**
- Split-panel layout: inputs left, results right
- Dark result panels (`bg-slate-900`, `bg-amber-600`, `bg-emerald-600`) for impact
- Minimal input styling with bottom borders instead of rounded boxes
- Large, bold numbers using monospace fonts
- Professional color coding:
  - Emerald for positive/success
  - Amber for warnings (MTD)
  - Red for negative values
  - Slate for neutral data

**Files Updated:**
- `Section24Calculator.tsx` - Dark slate-900 results panel
- `IncorporationCostCalculator.tsx` - Amber upfront cost, emerald savings
- `MTDCheckerCalculator.tsx` - Conditional amber/emerald based on result
- `PortfolioProfitabilityCalculator.tsx` - Property cards with slate-900 summary

### 5. Page Headers (All Major Pages)
**Changes:**
- Added full-width hero images to: About, Services, Contact, Calculators, Incorporation, Blog, Locations
- Dark overlay (`bg-slate-900/75` to `bg-slate-900/80`) for text readability
- Integrated breadcrumb navigation into hero sections
- Large, bold headlines (4xl to 6xl)
- Professional UK property photography from Unsplash

### 6. Typography & Spacing
**Changes:**
- Increased all heading sizes by 1-2 levels
- Consistent spacing: 16-20 padding units
- Better line heights and letter spacing
- Sharp, clean sans-serif throughout (Plus Jakarta Sans)
- Removed all serif references (was mixing serif/sans-serif)

### 7. About Page
**Changes:**
- Added hero image with dark overlay
- Added stats bar: "100+ landlords, 24hr response, £2.4M+ savings, 100% property-only"
- Redesigned "Why we exist" cards with left border accent
- Redesigned "How we work" with icon cards and hover effects
- Added "What makes us different" section

### 8. Services Page
**Changes:**
- Added hero image
- Service cards with left border accent and hover effects
- Larger icons with gradient backgrounds
- "What's included" section with checkmark icons in emerald squares
- "Who we work with" grid with featured middle card

### 9. Contact Page
**Changes:**
- Added hero image
- Split layout: contact details (left) + form (right)
- Added "What to expect" dark panel with process steps
- Better visual hierarchy for email/phone details

### 10. Blog Pages
**Changes:**
- Blog index: Hero image, improved card styling with left borders
- Blog detail: Header with left border accent, improved prose styling
- Related articles with hover effects

### 11. Locations Pages
**Changes:**
- Hub page: Hero image, grid of location cards with hover effects
- Detail pages: Hero images, improved content sections with left borders

---

## Global Design System Updates

### Colors
- **Primary:** Emerald-600 (#059669)
- **Dark:** Slate-900 (#0f172a)
- **Warning:** Amber-600 (#d97706)
- **Success:** Emerald-600
- **Neutral:** Slate-50 to Slate-900 scale

### Design Principles
1. **Sharp edges** - Removed rounded corners from major components
2. **Strategic borders** - 4px left borders for hierarchy
3. **Button depth** - Bottom border (4px) with press animation
4. **Dark panels** - Slate-900 for results and CTAs
5. **Professional photography** - Real UK property images
6. **Data prominence** - Large monospace numbers for credibility

### Typography Scale
- **H1:** 4xl to 6xl (clamp 2rem to 3.5rem)
- **H2:** 3xl to 4xl (clamp 1.75rem to 2.5rem)
- **H3:** xl to 2xl (clamp 1.25rem to 1.75rem)
- **Body:** base to lg (16px to 18px)

---

## Language Corrections

### British English Applied:
- ✅ "specialize" → "specialise"
- ✅ "optimization" → "optimisation"
- ✅ "Analyze" → "Analyse"

All content now uses British English spelling throughout.

---

## Technical Improvements

### Build Status
- ✅ Full production build successful
- ✅ All 26 pages generated without errors
- ✅ TypeScript validation passed
- ✅ No linter errors

### Performance
- First Load JS: 102 kB (shared)
- Largest page: 121 kB (homepage with calculators)
- All pages prerendered as static content

### Image Configuration
- Configured Next.js to load images from `images.unsplash.com`
- Using optimised Next/Image component throughout
- Priority loading for hero images

---

## Files Modified

### Core Pages (9 files)
1. `src/app/page.tsx` - Complete homepage redesign
2. `src/app/about/page.tsx` - Hero image, stats, improved sections
3. `src/app/services/page.tsx` - Hero image, service cards
4. `src/app/contact/page.tsx` - Hero image, split layout
5. `src/app/calculators/page.tsx` - Hero image, improved layout
6. `src/app/incorporation/page.tsx` - Hero image, improved sections
7. `src/app/blog/page.tsx` - Hero image, card redesign
8. `src/app/locations/page.tsx` - Hero image, grid layout
9. `src/app/locations/[slug]/page.tsx` - Hero image, improved content

### Calculator Components (4 files)
1. `src/components/calculators/Section24Calculator.tsx`
2. `src/components/calculators/IncorporationCostCalculator.tsx`
3. `src/components/calculators/MTDCheckerCalculator.tsx`
4. `src/components/calculators/PortfolioProfitabilityCalculator.tsx`

### UI Components (2 files)
1. `src/components/property/ServiceTiers.tsx` - Fixed alignment
2. `src/components/blog/BlogPostRenderer.tsx` - Improved styling

### Global Styles (2 files)
1. `src/app/globals.css` - Streamlined, professional design system
2. `package.json` - Fixed port to 3001

---

## Before vs After

### Before:
- Generic template look with rounded corners everywhere
- Flat colors with no depth
- Poor visual hierarchy
- No professional imagery
- Misaligned components
- American spelling
- Text readability issues on hero

### After:
- Professional financial services aesthetic
- Strategic use of shadows, gradients, and borders
- Clear visual hierarchy with sharp edges
- Professional UK property photography throughout
- Perfectly aligned components
- British English throughout
- High contrast, readable text on all backgrounds

---

## Outstanding Issues: NONE

All identified issues have been resolved:
- ✅ Hero text now readable (increased overlay opacity, improved text contrast)
- ✅ Service icons now have depth (gradient, shadow, glass effect)
- ✅ Service tier CTAs aligned (flexbox with mt-auto)
- ✅ British English applied throughout
- ✅ Professional imagery added to all major pages
- ✅ Build verified and server running successfully

---

## Next Steps (Optional)

If further refinement needed:
1. Add more property images to interior pages
2. Create custom illustrations for service icons
3. Add subtle animations on scroll
4. Implement dark mode variant
5. Add video testimonials section (when real testimonials available)

**Current Status:** Production-ready design that matches professional UK property accounting websites.
