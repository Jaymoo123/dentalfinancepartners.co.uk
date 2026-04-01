# Generation Plan - Property & Dentists Only

**Date**: March 31, 2026  
**Scope**: Property and Dentists only (Medical later)  
**Status**: Ready to execute

---

## This Round: 26 Posts

### Property - 14 Foundational Topics ✅

**Coverage**: 6.6% → 15.8%  
**Cost**: $2.52  
**Time**: 2 hours

**All topics are property-specific** (100% property niche)

**Top topics**:
1. Property Tax Advice (1200 vol)
2. Property Accountants Near Me (900 vol)
3. Best Property Accountant (800 vol)
4. Property Accountant Near Me (800 vol)
5. Property Accountant UK (600 vol)
6. What Does a Property Accountant Do (400 vol)
7. Property Accountant Cost (300 vol)
8. Property Accountant Services (300 vol)
9. Property Accountant Fees (250 vol)
10. How to Find a Property Accountant (200 vol)
11. Do I Need a Property Accountant (200 vol)
12. How to Choose a Property Accountant (150 vol)
13. Why Use a Property Accountant (150 vol)
14. When to Hire a Property Accountant (120 vol)

**File**: `missing_topics_property.csv`

---

### Dentists - 12 Missing Topics ✅

**Coverage**: 60-70% → 100%  
**Cost**: $2.16  
**Time**: 2 hours

**All topics are dental-specific** (100% dental niche)

**Topics**:
1. Associate Dentist Tax Deductions 2026 (540 vol)
2. Associate Dentist Tax Calculator (620 vol) - Note: actual calculator tool comes Week 4
3. Associate Dentist Tax Return Guide (580 vol)
4. Capital Allowances Dental Equipment (440 vol)
5. Dental Practice Overhead Costs (320 vol)
6. Dental Practice Software Accounting (310 vol)
7. NHS Dental Contract Accounting (310 vol)
8. Hiring Associate Dentist Costs (270 vol)
9. Dental Practice Partnership Tax (260 vol)
10. Dental Practice Lease Buy Decision (190 vol)
11. Dental Practice Working Capital (190 vol)
12. Dental Practice Cash Flow Forecasting (180 vol)

**File**: `missing_topics_dentists.csv`

---

## Verification Complete

### ✅ No Duplicates
- Property: 14 new topics, 0 conflicts with 45 existing files
- Dentists: 12 new topics, 0 conflicts with 48 existing files

### ✅ Niches Are Distinct
- Property: 100% property-specific (every keyword includes "property")
- Dentists: 100% dental-specific (every keyword includes "dental/dentist")
- No overlap between niches

### ✅ Completeness
- Property: Foundational covered (can add more in Round 2)
- Dentists: COMPLETE (100% keyword coverage)

---

## Execution Plan

### Day 1 (April 1) - Property

**Import**:
```bash
python import_topics_to_supabase.py
# Choose option 1 (Property - 14 topics)
```

**Generate**:
```bash
python Property/generate_blog_supabase.py
```

**Deploy**:
```bash
cd Property/web
vercel --prod
cd ../..
```

**Result**: Property has 59 posts (45 + 14), coverage 6.6% → 15.8%

---

### Day 2 (April 2) - Dentists

**Import**:
```bash
python import_topics_to_supabase.py
# Choose option 2 (Dentists - 12 topics)
```

**Generate**:
```bash
python Dentists/generate_blog_supabase.py
```

**Deploy**:
```bash
cd Dentists/web
vercel --prod
cd ../..
```

**Result**: Dentists has 60 posts (48 + 12), coverage 60-70% → 100%

---

### Week 4 (Later) - Calculator Tools

**Build**:
- Dentists: Associate Tax Calculator
- Medical: GP Tax Calculator (when Medical launches)

**Method**: Manual React development (reuse Property calculator code)

---

## Total Investment (This Round)

**Posts**: 26 (Property: 14, Dentists: 12)  
**Cost**: $4.68  
**Time**: 4 hours automated  
**Timeline**: 2 days

**Expected return**:
- Property: +6,270 monthly searches
- Dentists: +4,710 monthly searches
- **Total**: +10,980 monthly searches
- **Leads**: +110-220 leads/month

---

## What About Medical?

**Status**: Skipping this round

**Why**: Focus on Property and Dentists first

**When**: Later (after Property/Dentists are complete)

**Plan**: 
- Generate 20-30 GP-specific topics
- Launch Medical site
- Build GP Tax Calculator

---

## Your Next Action

```bash
python import_topics_to_supabase.py
```

**Choose option 1** (Property - 14 topics)

Then generate Property posts, deploy, and move to Dentists.

---

**Status**: ✅ READY TO EXECUTE  
**Scope**: Property + Dentists only (26 posts)  
**Cost**: $4.68  
**Timeline**: 2 days  
**Medical**: Later round
