# START HERE - Blog Content Generation Guide

**Date**: March 31, 2026  
**Status**: Ready to execute  
**Total**: 56 topics to generate across 3 sites

---

## 🚨 CRITICAL FINDING

**Property has only 6.6% keyword coverage!**

Despite having 45 posts, Property only covers 10/152 keywords. All content is technical tax topics. Missing ALL foundational service content (what/how/where queries).

**This must be fixed first.**

---

## Quick Summary

### What We Have

- Property: 45 posts, 6.6% coverage 🔴
- Dentists: 48 posts, 76% coverage ✅
- Medical: 0 posts, 0% coverage 🔴

### What We Need

- Property: 14 foundational topics (CRITICAL)
- Dentists: 12 missing topics (IMPORTANT)
- Medical: 30 initial topics (CRITICAL)

### Files Ready

✅ `missing_topics_property.csv` (14 topics)  
✅ `missing_topics_dentists.csv` (12 topics)  
✅ `missing_topics_medical.csv` (30 topics)  
✅ `import_topics_to_supabase.py` (import tool)

---

## How to Generate Content

### Step 1: Import Topics to Supabase

```bash
python import_topics_to_supabase.py
```

**Choose option 4** (Import ALL 56 topics)

This will:
- Insert 14 topics to `blog_topics_property`
- Insert 12 topics to `blog_topics`
- Insert 30 topics to `blog_topics_medical`

---

### Step 2: Generate Posts

**Property** (14 posts):
```bash
python Property/generate_blog_supabase.py
```

**Dentists** (12 posts):
```bash
python Dentists/generate_blog_supabase.py
```

**Medical** (30 posts):
```bash
python Medical/generate_blog_supabase.py
```

---

### Step 3: Deploy

**Property**:
```bash
cd Property/web
vercel --prod
cd ../..
```

**Dentists**:
```bash
cd Dentists/web
vercel --prod
cd ../..
```

**Medical**:
```bash
cd Medical/web
vercel --prod
cd ../..
```

---

## The 14 Property Topics You Need

These are the foundational service topics Property is missing:

1. **Property Tax Advice** (1200 vol, diff 40) ⭐ HIGHEST VOLUME
2. **Property Accountants Near Me** (900 vol, diff 45)
3. **Best Property Accountant** (800 vol, diff 42)
4. **Property Accountant Near Me** (800 vol, diff 42)
5. **Property Accountant UK** (600 vol, diff 35)
6. **What Does a Property Accountant Do** (400 vol, diff 20) ⭐ CRITICAL
7. **Property Accountant Cost** (300 vol, diff 28)
8. **Property Accountant Services** (300 vol, diff 32)
9. **Property Accountant Fees** (250 vol, diff 26)
10. **How to Find a Property Accountant** (200 vol, diff 20)
11. **Do I Need a Property Accountant** (200 vol, diff 18)
12. **How to Choose a Property Accountant** (150 vol, diff 18)
13. **Why Use a Property Accountant** (150 vol, diff 18)
14. **When to Hire a Property Accountant** (120 vol, diff 16)

**Total**: 6,270 monthly searches  
**All low difficulty**: 16-45  
**All foundational**: what/how/where/when/cost

---

## The 12 Dentists Topics You Need

These fill specific gaps in otherwise good coverage:

1. **Associate Dentist Tax Calculator** (620 vol, diff 36) ⭐ TOOL
2. **Associate Dentist Tax Return Guide** (580 vol, diff 36)
3. **Associate Dentist Tax Deductions 2026** (540 vol, diff 34) ⭐
4. **Capital Allowances Dental Equipment** (440 vol, diff 38)
5. **Dental Practice Overhead Costs** (320 vol, diff 37)
6. **Dental Practice Software Accounting** (310 vol, diff 35)
7. **NHS Dental Contract Accounting** (310 vol, diff 39)
8. **Hiring Associate Dentist Costs** (270 vol, diff 35)
9. **Dental Practice Partnership Tax** (260 vol, diff 43)
10. **Dental Practice Lease Buy Decision** (190 vol, diff 40)
11. **Dental Practice Working Capital** (190 vol, diff 38)
12. **Dental Practice Cash Flow Forecasting** (180 vol, diff 37)

**Total**: 4,710 monthly searches

---

## The 30 Medical Topics You Need

Top 10 priorities (see CSV for all 30):

1. **GP Accountant** (1400 vol, diff 60) ⭐ PILLAR
2. **GP Accounting** (1400 vol, diff 60) ⭐ PILLAR
3. **GP Tax Advice** (560 vol, diff 40)
4. **GP Accounting Software** (560 vol, diff 40)
5. **GP Payroll Services** (560 vol, diff 40)
6. **GP Accountant Cost** (560 vol, diff 40)
7. **GP Corporation Tax** (560 vol, diff 40)
8. **GP Financial Planning** (560 vol, diff 40)
9. **GP Tax Return** (560 vol, diff 40)
10. **GP Bookkeeping** (560 vol, diff 40)

**Total**: 15,000+ monthly searches

---

## Expected Results

### After Generating All 56 Posts

**Traffic**:
- Property: +6,270 monthly searches
- Dentists: +4,710 monthly searches
- Medical: +15,000 monthly searches
- **Total**: +26,000 monthly searches

**Leads** (at 1-2% conversion):
- +260-520 leads/month

**Value** (at $100-200/lead):
- $26,000-104,000/month

**ROI**: 25,000% - 100,000%

---

## Cost & Time

**Content Generation**:
- 56 posts × $0.18 = $10.08
- 56 posts × 5 min = 4.7 hours automated

**Calculator Development** (Week 4):
- 2-3 tools
- $0 (reuse Property code)
- 12-18 hours manual dev

**Total**:
- $10.08
- 19-25 hours
- 4 weeks

---

## One Command to Import Everything

```bash
python import_topics_to_supabase.py
```

**Choose option 4** (Import ALL)

This imports all 56 topics to Supabase in one go.

Then run generation scripts for each site.

---

## Documentation

**Main report**: `Admin/FINAL_CORRECTED_AUDIT_REPORT.md`  
**Visual summary**: `Admin/AUDIT_VISUAL_SUMMARY.md`  
**Quick reference**: `AUDIT_COMPLETE_README.md`  
**This file**: `START_HERE.md`

---

## Why Property is the Priority

### The Numbers

- **45 posts** but only **6.6% keyword coverage**
- Missing **142/152 keywords** (93.4%)
- Missing **6,270 monthly searches**
- Missing **ALL foundational content**

### The Problem

Property is invisible for basic queries:
- "What does a property accountant do"
- "How to find a property accountant"
- "Property accountant cost"
- "Best property accountant"

### The Fix

Generate 14 foundational posts (Week 1):
- Cost: $2.52
- Time: 2 hours
- Impact: +6,270 searches/month
- Result: Property becomes discoverable

---

## Your Next Action

### Right Now

1. Review the 3 CSV files:
   - `missing_topics_property.csv`
   - `missing_topics_dentists.csv`
   - `missing_topics_medical.csv`

2. Approve the topics (or edit CSV if needed)

---

### Tomorrow (April 1)

Run these commands:

```bash
# Import all topics
python import_topics_to_supabase.py
# Choose option 4

# Generate Property posts
python Property/generate_blog_supabase.py

# Deploy Property
cd Property/web && vercel --prod && cd ../..
```

**Result**: Property will have 59 posts with foundational content coverage

---

### This Week (April 1-4)

```bash
# Day 1: Property (14 posts)
python import_topics_to_supabase.py  # Option 1
python Property/generate_blog_supabase.py
cd Property/web && vercel --prod && cd ../..

# Day 2: Dentists (12 posts)
python import_topics_to_supabase.py  # Option 2
python Dentists/generate_blog_supabase.py
cd Dentists/web && vercel --prod && cd ../..

# Day 3: Medical (30 posts)
# First: Run migration in Supabase
python import_topics_to_supabase.py  # Option 3
python Medical/generate_blog_supabase.py
cd Medical/web && vercel --prod && cd ../..

# Day 4: Verify all sites
# Check posts are live
# Submit sitemaps to GSC
```

---

## Success Criteria

### Week 1 Complete

✅ Property has 59 posts (45 + 14)  
✅ Property keyword coverage 6.6% → 15-20%  
✅ Property discoverable for service queries  
✅ +6,270 monthly search opportunity

### Week 2 Complete

✅ Dentists has 60 posts (48 + 12)  
✅ Dentists keyword coverage 76% → 100%  
✅ Dentists comprehensive coverage  
✅ +4,710 monthly search opportunity

### Week 3 Complete

✅ Medical site LIVE  
✅ Medical has 30 posts  
✅ Medical keyword coverage 0% → 25-30%  
✅ +15,000 monthly search opportunity

### Week 4 Complete

✅ Dentists has 2 calculators  
✅ Medical has 1 calculator  
✅ All sites have engagement tools  
✅ +50-100 leads/month from calculators

---

## The Bottom Line

**Problem**: Property has 6.6% keyword coverage (catastrophically low)  
**Solution**: Generate 56 posts across 3 sites  
**Cost**: $10.08  
**Timeline**: 4 weeks  
**Impact**: +26,000 monthly searches, +260-520 leads/month  
**ROI**: 25,000% - 100,000%

**Next action**: 
```bash
python import_topics_to_supabase.py
```

---

**Status**: ✅ READY TO EXECUTE  
**Files**: ✅ 3 CSV files with 56 topics  
**Script**: ✅ Automated import tool ready  
**Docs**: ✅ Complete documentation  
**Next**: Import topics and generate posts
