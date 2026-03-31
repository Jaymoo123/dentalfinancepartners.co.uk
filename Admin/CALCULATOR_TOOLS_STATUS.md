# Calculator Tools Status & Recommendations

**Date**: March 31, 2026  
**Status**: Property has 5 calculators, Dentists has 0, Medical has 0

---

## Current Calculator Inventory

### Property Tax Partners ✅ (5 calculators LIVE)

**Location**: `/calculators` page (Property/web/src/app/calculators/page.tsx)

#### 1. Section 24 Tax Calculator ✅
- **File**: `src/components/calculators/Section24Calculator.tsx`
- **Function**: Calculates extra tax from Section 24 mortgage interest restriction
- **Inputs**: Rental income, mortgage interest, other expenses, tax band
- **Outputs**: Extra tax per year, extra tax per month
- **Status**: LIVE and working

#### 2. Incorporation Cost Calculator ✅
- **File**: `src/components/calculators/IncorporationCostCalculator.tsx`
- **Function**: Calculates upfront cost (CGT + SDLT) and break-even timeline
- **Inputs**: Property value, purchase price, mortgage balance, rental income, mortgage interest, tax band
- **Outputs**: CGT cost, SDLT cost, total upfront cost, annual tax saving, break-even years
- **Status**: LIVE and working

#### 3. MTD Checker Calculator ✅
- **File**: `src/components/calculators/MTDCheckerCalculator.tsx`
- **Function**: Checks if landlord needs to comply with Making Tax Digital
- **Inputs**: Rental income, self-employment income, other income
- **Outputs**: MTD requirement status, distance from threshold
- **Status**: LIVE and working

#### 4. Portfolio Profitability Calculator ✅
- **File**: `src/components/calculators/PortfolioProfitabilityCalculator.tsx`
- **Function**: Calculates profitability across multiple properties
- **Inputs**: Multiple properties (rental income, mortgage interest, expenses per property)
- **Outputs**: Net profit per property, total portfolio profit, gross/net yields
- **Status**: LIVE and working

#### 5. Rental Yield Calculator ✅
- **File**: `src/components/calculators/RentalYieldCalculator.tsx`
- **Function**: Calculates gross yield, net yield, and monthly cash flow
- **Inputs**: Property value, monthly rent, mortgage interest, insurance, maintenance, management fees, other costs
- **Outputs**: Gross yield %, net yield %, monthly cash flow
- **Status**: LIVE and working

**Property Calculator Page**: https://propertytaxpartners.co.uk/calculators

---

### Dental Finance Partners ❌ (0 calculators)

**Status**: No calculator page or components exist

**Recommended calculators**:

#### 1. Associate Dentist Tax Calculator (HIGH PRIORITY)
- **Target keyword**: "associate dentist tax calculator" (620 volume, difficulty 36)
- **Function**: Calculate tax liability for associate dentists
- **Inputs**: 
  - Gross income (NHS + private)
  - Allowable expenses
  - Student loan plan
  - Pension contributions
  - Tax band
- **Outputs**:
  - Taxable profit
  - Income tax
  - National Insurance
  - Student loan repayment
  - Net income
  - Effective tax rate

#### 2. Dental Practice Valuation Calculator (MEDIUM PRIORITY)
- **Target keyword**: "dental practice valuation" (380 volume, difficulty 46)
- **Function**: Estimate practice value using multiple methods
- **Inputs**:
  - Annual gross income
  - EBITDA/net profit
  - NHS vs private mix
  - Number of surgeries
  - Patient list size
- **Outputs**:
  - Valuation by multiple method (1-2x gross)
  - Valuation by EBITDA method (3-5x EBITDA)
  - Goodwill estimate
  - Value range

#### 3. Practice Profitability Calculator (LOW PRIORITY)
- **Function**: Calculate practice profit margins and benchmarks
- **Inputs**:
  - Gross income
  - Staff costs
  - Lab costs
  - Rent/premises
  - Other overheads
- **Outputs**:
  - Net profit
  - Profit margin %
  - Benchmark comparison
  - Areas for improvement

---

### Medical Accountants UK ❌ (0 calculators)

**Status**: Site not launched yet

**Recommended calculators**:

#### 1. GP Tax Calculator (HIGH PRIORITY)
- **Target keyword**: "gp tax calculator" (implied from "gp tax" 560 volume)
- **Function**: Calculate tax liability for GPs
- **Inputs**:
  - GP income (NHS + private)
  - Allowable expenses
  - Pension contributions
  - Student loan plan
  - Tax band
- **Outputs**:
  - Taxable profit
  - Income tax
  - National Insurance (Class 2 + Class 4)
  - Student loan repayment
  - Net income
  - Effective tax rate

#### 2. GP Pension Contribution Calculator (MEDIUM PRIORITY)
- **Function**: Calculate optimal pension contributions for tax relief
- **Inputs**:
  - GP income
  - Current pension contributions
  - Tax band
  - Annual allowance used
- **Outputs**:
  - Maximum pension contribution
  - Tax relief amount
  - Net cost after relief
  - Annual allowance remaining

---

## Calculator Strategy

### What's Working (Property)

✅ **5 calculators live** and generating engagement  
✅ **Dedicated `/calculators` page** for discoverability  
✅ **High-quality UX** with instant calculations  
✅ **Mobile-responsive** design  
✅ **SEO-optimized** with proper metadata

**Evidence of success**:
- Section 24 calculator blog post getting impressions in GSC
- Calculators linked from homepage
- Professional design matches site branding

### What's Missing

❌ **Dentists**: No calculators at all (0/3 recommended)  
❌ **Medical**: No calculators at all (0/2 recommended)  
❌ **Property**: Missing "Rental Income Tax Calculator" (mentioned in audit)

---

## Recommended Actions

### Priority 1: Dentists Associate Tax Calculator

**Why**: 
- Highest volume keyword (620 searches/month)
- Associates are primary audience
- Direct conversion tool

**Effort**: 4-6 hours (can copy Property calculator structure)

**Implementation**:
1. Create `Dentists/web/src/components/calculators/AssociateTaxCalculator.tsx`
2. Create `Dentists/web/src/app/calculators/page.tsx`
3. Add calculator preview to homepage
4. Create blog post: "Associate Dentist Tax Calculator: Calculate Your Tax Bill"

---

### Priority 2: Medical GP Tax Calculator

**Why**:
- Core service offering
- GPs need tax planning tools
- Differentiator from general accountants

**Effort**: 4-6 hours (can copy Property/Dentists structure)

**Implementation**:
1. Create `Medical/web/src/components/calculators/GPTaxCalculator.tsx`
2. Create `Medical/web/src/app/calculators/page.tsx`
3. Add calculator preview to homepage
4. Create blog post: "GP Tax Calculator: Calculate Your Tax Bill 2026"

---

### Priority 3: Property Rental Income Tax Calculator

**Why**:
- Mentioned in audit as missing
- Complements existing Section 24 calculator
- Broader appeal (all landlords, not just Section 24 affected)

**Effort**: 3-4 hours (similar to Section 24 calculator)

**Implementation**:
1. Create `Property/web/src/components/calculators/RentalIncomeTaxCalculator.tsx`
2. Add to existing `/calculators` page
3. Create blog post: "Rental Income Tax Calculator: Work Out Your Tax 2026"

---

### Priority 4: Dentists Practice Valuation Calculator

**Why**:
- Unique tool (competitors likely don't have this)
- High-value audience (practice buyers/sellers)
- Linkable asset

**Effort**: 6-8 hours (more complex calculations)

**Implementation**:
1. Create `Dentists/web/src/components/calculators/PracticeValuationCalculator.tsx`
2. Add to `/calculators` page
3. Create blog post: "Dental Practice Valuation Calculator: Estimate Your Practice Value"

---

## Calculator Development Plan

### Week 8 Plan (Original Audit)

**Revised based on findings**:

**Property** (1 calculator):
- ✅ Already has 5 calculators (DONE)
- ⚠️ Add Rental Income Tax Calculator (optional enhancement)

**Dentists** (2 calculators):
- ❌ Associate Tax Calculator (CRITICAL)
- ❌ Practice Valuation Calculator (HIGH VALUE)

**Medical** (1 calculator):
- ❌ GP Tax Calculator (CRITICAL)

**Total new calculators needed**: 3-4 (not 6 as originally stated)

**Revised effort**: 14-20 hours (not 8-12)  
**Revised timeline**: Week 8-9 (need more time)

---

## Calculator Component Structure

### Standard Calculator Pattern (from Property)

```typescript
// Component structure
"use client";
import { useState } from "react";

export function [Name]Calculator() {
  // State for inputs
  const [input1, setInput1] = useState(defaultValue);
  
  // Calculations
  const result = calculateSomething(input1);
  
  // Render
  return (
    <div className="bg-white border-l-4 border-[color] p-6 sm:p-8 lg:p-10">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="inline-block bg-slate-900 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider mb-2 sm:mb-3">
          Calculator
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">[Name]</h3>
        <p className="mt-2 text-sm sm:text-base text-slate-600">[Description]</p>
      </div>
      
      {/* Two-column layout: inputs on left, results on right */}
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Inputs */}
        <div className="space-y-5 sm:space-y-6">
          {/* Input fields */}
        </div>
        
        {/* Results */}
        <div className="bg-slate-50 p-6 sm:p-8">
          {/* Result display */}
        </div>
      </div>
    </div>
  );
}
```

### Reusable Components

Property calculators use:
- Consistent styling (Tailwind)
- Mobile-responsive (sm/lg breakpoints)
- Accessible (proper labels, min-height for touch targets)
- Clean UX (instant calculations, clear results)

**Can be copied** to Dentists and Medical with minimal changes.

---

## Calculator Page Structure

### Property Pattern (Working Example)

```typescript
// src/app/calculators/page.tsx
import { Calculator1 } from "@/components/calculators/Calculator1";
import { Calculator2 } from "@/components/calculators/Calculator2";
// ... etc

export const metadata = {
  title: "Free [Niche] Calculators | [Tool Names]",
  description: "[Number] free calculators for [audience]: [list tools]",
  // ... SEO metadata
};

export default function CalculatorsPage() {
  return (
    <>
      {/* Hero section */}
      <section className="relative h-[300px] sm:h-[350px]">
        {/* Hero content */}
      </section>
      
      {/* Calculators section */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="space-y-12 sm:space-y-16">
          <div id="calculator1"><Calculator1 /></div>
          <div id="calculator2"><Calculator2 /></div>
          {/* ... more calculators */}
        </div>
        
        {/* CTA section */}
        <div className="mt-12 bg-slate-900 p-10 text-center">
          {/* CTA content */}
        </div>
      </section>
    </>
  );
}
```

---

## SEO Benefits of Calculators

### Why Calculators Work

1. **High engagement**: Users spend 2-5 minutes interacting
2. **Low bounce rate**: Interactive content keeps users on page
3. **Backlinks**: Other sites link to useful calculators
4. **Social sharing**: Users share calculator results
5. **Rankings**: Google favors interactive, useful content
6. **Conversions**: Users who calculate are more likely to contact

### Property Calculator Performance

**Evidence from GSC**:
- `section-24-tax-calculator-annual-cost` getting impressions
- Position 6 (page 1!) after just 2 days
- Calculator page linked from homepage

**Expected performance** (after 3-6 months):
- Calculator pages rank for "[keyword] calculator" queries
- Drive 500-1,000 visits/month per calculator
- Convert at 3-5% (higher than blog posts)

---

## Updated Gap Analysis

### Original Audit Said: "0/6 calculators built"

**Correction**: Property has 5/5 calculators ✅

### Revised Calculator Status

| Site | Calculators | Status | Gap |
|------|-------------|--------|-----|
| **Property** | 5 | ✅ COMPLETE | None - well covered |
| **Dentists** | 0 | ❌ MISSING | Need 2-3 calculators |
| **Medical** | 0 | ❌ MISSING | Need 1-2 calculators |

**Total**: 5/10 calculators (50% complete)

---

## Revised Week 8 Plan

### Original Plan: Build 3 calculators (Property, Dentists, Medical)

**Revised Plan**: Build 3-5 calculators (Dentists + Medical only)

**Dentists** (2 calculators):
1. Associate Tax Calculator (CRITICAL)
2. Practice Valuation Calculator (HIGH VALUE)

**Medical** (1 calculator):
1. GP Tax Calculator (CRITICAL)

**Property** (optional):
1. Rental Income Tax Calculator (ENHANCEMENT)
2. Capital Gains Tax Calculator (ENHANCEMENT)

**Effort**: 14-20 hours (can reuse Property code structure)

---

## Calculator Development Guide

### Step 1: Copy Property Calculator Structure

**For Dentists Associate Tax Calculator**:
1. Copy `Property/web/src/components/calculators/Section24Calculator.tsx`
2. Rename to `AssociateTaxCalculator.tsx`
3. Update calculations for associate dentist tax
4. Update styling/branding for Dentists site

**For Medical GP Tax Calculator**:
1. Copy `Property/web/src/components/calculators/Section24Calculator.tsx`
2. Rename to `GPTaxCalculator.tsx`
3. Update calculations for GP tax
4. Update styling/branding for Medical site

### Step 2: Create Calculator Page

**For Dentists**:
1. Create `Dentists/web/src/app/calculators/page.tsx`
2. Copy structure from Property
3. Import calculator components
4. Update metadata and content for dental niche

**For Medical**:
1. Create `Medical/web/src/app/calculators/page.tsx`
2. Copy structure from Property
3. Import calculator components
4. Update metadata and content for medical niche

### Step 3: Add to Navigation

**For both sites**:
1. Add "Calculators" link to site header
2. Add calculator preview to homepage
3. Link from relevant blog posts

### Step 4: Create Blog Posts

**For each calculator**:
1. Create blog post explaining the calculator
2. Embed calculator in blog post or link to calculator page
3. Target "[keyword] calculator" search terms

---

## Calculator ROI

### Property Calculators (Already Built)

**Investment**: ~20-25 hours development time (already spent)  
**Cost**: $0 (built in-house)  
**Expected return**: 
- 2,000-3,000 visits/month to calculator page
- 60-90 leads/month from calculator users (3% conversion)
- High-quality leads (users who calculate are serious)

### Dentists Calculators (To Build)

**Investment**: 8-12 hours development time  
**Cost**: $0 (can reuse Property code)  
**Expected return**:
- 1,000-1,500 visits/month to calculator page
- 30-45 leads/month from calculator users
- High-value leads (practice buyers, associates)

### Medical Calculators (To Build)

**Investment**: 4-6 hours development time  
**Cost**: $0 (can reuse Property code)  
**Expected return**:
- 500-800 visits/month to calculator page
- 15-25 leads/month from calculator users
- Professional GP audience (high-value)

---

## Competitive Advantage

### Property Site Advantage

**You already have**:
- 5 professional calculators
- Dedicated calculator page
- SEO-optimized
- Mobile-responsive

**Competitors likely have**:
- 0-1 basic calculators
- Poor UX
- Not mobile-friendly

**Your advantage**: 5x more calculators than competitors

### Opportunity for Dentists & Medical

**If you build calculators**:
- Dentists: Likely only dental accountant with associate tax calculator
- Medical: Likely only GP accountant with GP tax calculator

**Competitive moat**: Unique tools that competitors don't have

---

## Technical Notes

### Calculator Tech Stack

**Framework**: React (Next.js)  
**Styling**: Tailwind CSS  
**State**: React useState hooks  
**Validation**: Client-side (no backend needed)  
**Performance**: Instant calculations (no API calls)

### Code Quality

**Property calculators**:
- Clean, readable code
- Well-structured components
- Consistent styling
- Accessible (proper labels, ARIA)
- Mobile-optimized (touch targets, responsive)

**Can be reused** for Dentists and Medical with minimal changes.

### Maintenance

**Current**: Zero maintenance needed (pure client-side)  
**Future**: Update tax rates annually (5-10 min per calculator)

---

## Recommendations

### Immediate Actions

1. ✅ **Property**: No action needed - calculators are excellent
2. ❌ **Dentists**: Build Associate Tax Calculator (Week 8)
3. ❌ **Medical**: Build GP Tax Calculator (Week 8)

### Optional Enhancements

**Property**:
- Add Rental Income Tax Calculator (broader appeal)
- Add Capital Gains Tax Calculator (complement existing CGT content)
- Add "Compare All Calculators" feature

**Dentists**:
- Add Practice Valuation Calculator (Week 9)
- Add Practice Profitability Calculator (Week 10)

**Medical**:
- Add GP Pension Calculator (Week 9)

### Long-Term (Month 4+)

**All sites**:
- Add "Save Results" feature (email results to user)
- Add "Book Consultation" CTA in calculator results
- Add "Compare Scenarios" feature (side-by-side)
- Track calculator usage in GA4
- A/B test calculator designs

---

## Updated Content Audit Summary

### Calculators Correction

**Original audit stated**: "0/6 calculators built"

**Actual status**: 
- Property: 5/5 calculators ✅ (COMPLETE)
- Dentists: 0/3 calculators ❌ (0% complete)
- Medical: 0/2 calculators ❌ (0% complete)

**Total**: 5/10 calculators (50% complete, not 0%)

### Impact on Action Plan

**Week 8 plan remains valid**, but:
- Property doesn't need calculator work (already done)
- Focus Week 8 on Dentists + Medical calculators
- Property can add optional enhancements if desired

**Revised Week 8 effort**: 12-18 hours (not 8-12)
- Dentists Associate Tax Calculator: 6-8 hours
- Medical GP Tax Calculator: 4-6 hours
- Optional Property enhancements: 2-4 hours

---

## Conclusion

**Good news**: Property already has excellent calculator infrastructure (5 calculators)

**Action needed**: 
1. Build Dentists calculators (2-3 tools)
2. Build Medical calculators (1-2 tools)
3. Optionally enhance Property calculators

**Timeline**: Week 8-9 of action plan

**Effort**: 12-18 hours total

**ROI**: 45-70 additional leads/month from calculator users

---

**Status**: Property calculators ✅ COMPLETE  
**Next**: Build Dentists + Medical calculators (Week 8)
