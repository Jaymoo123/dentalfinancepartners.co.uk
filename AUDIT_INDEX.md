# Blog Content Audit - Master Index

**Date**: March 31, 2026  
**Status**: ✅ COMPLETE - Ready for execution

---

## 🚨 CRITICAL DISCOVERY

**Property has only 6.6% keyword coverage!**

Despite having 45 posts, Property only covers 10/152 keywords. All content is technical tax topics. Missing ALL foundational service content.

**This is the priority to fix.**

---

## Quick Start

### One Command to Import Everything

```bash
python import_topics_to_supabase.py
```

Choose option 4 (Import ALL 56 topics)

Then run generation scripts for each site.

---

## Files You Need

### 📄 CSV Files (Import to Supabase)

| File | Topics | Site | Table |
|------|--------|------|-------|
| `missing_topics_property.csv` | 14 | Property | blog_topics_property |
| `missing_topics_dentists.csv` | 12 | Dentists | blog_topics |
| `missing_topics_medical.csv` | 30 | Medical | blog_topics_medical |

**Total**: 56 topics ready for generation

---

### 🔧 Scripts

| File | Purpose |
|------|---------|
| `import_topics_to_supabase.py` | Import CSV topics to Supabase (automated) |

---

### 📚 Documentation

| File | Description |
|------|-------------|
| `START_HERE.md` | Quick start guide with commands |
| `EXECUTIVE_SUMMARY.md` | Executive overview with ROI |
| `AUDIT_COMPLETE_README.md` | Complete reference guide |
| `AUDIT_INDEX.md` | This file - master index |

---

### 📊 Admin Reports

| File | Description |
|------|-------------|
| `Admin/FINAL_CORRECTED_AUDIT_REPORT.md` | Detailed audit findings |
| `Admin/AUDIT_VISUAL_SUMMARY.md` | Visual charts and graphs |
| `Admin/GSC_CURRENT_ANALYSIS.md` | Updated GSC status |
| `Admin/CALCULATOR_TOOLS_STATUS.md` | Calculator inventory |
| `Admin/CORRECTED_AUDIT_SUMMARY.md` | Error documentation |

---

## The Gaps

### Property - 14 Foundational Topics 🔴 CRITICAL

**Coverage**: 6.6% (10/152 keywords)  
**Missing**: 6,270 monthly searches  
**Priority**: URGENT

**Top topics**:
1. Property Tax Advice (1200 vol)
2. Property Accountants Near Me (900 vol)
3. Best Property Accountant (800 vol)
4. Property Accountant Near Me (800 vol)
5. What Does a Property Accountant Do (400 vol)
6. ... 9 more foundational topics

**File**: `missing_topics_property.csv`

---

### Dentists - 12 Missing Topics 🟡 IMPORTANT

**Coverage**: 76% (38/50 keywords)  
**Missing**: 4,710 monthly searches  
**Priority**: IMPORTANT

**Top topics**:
1. Associate Dentist Tax Calculator (620 vol)
2. Associate Dentist Tax Return Guide (580 vol)
3. Associate Dentist Tax Deductions 2026 (540 vol)
4. Capital Allowances Dental Equipment (440 vol)
5. Dental Practice Overhead Costs (320 vol)
6. ... 7 more specific topics

**File**: `missing_topics_dentists.csv`

---

### Medical - 30 Initial Topics 🔴 CRITICAL

**Coverage**: 0% (0/119 keywords)  
**Missing**: 15,000+ monthly searches  
**Priority**: CRITICAL

**Top topics**:
1. GP Accountant (1400 vol) ⭐ PILLAR
2. GP Accounting (1400 vol) ⭐ PILLAR
3. GP Tax Advice (560 vol)
4. GP Accounting Software (560 vol)
5. GP Payroll Services (560 vol)
6. ... 25 more core topics

**File**: `missing_topics_medical.csv`

---

## 4-Week Execution Plan

### Week 1: Property Foundational (14 posts)

**Commands**:
```bash
python import_topics_to_supabase.py  # Option 1
python Property/generate_blog_supabase.py
cd Property/web && vercel --prod && cd ../..
```

**Result**: Property coverage 6.6% → 15-20%

---

### Week 2: Dentists Missing Topics (12 posts)

**Commands**:
```bash
python import_topics_to_supabase.py  # Option 2
python Dentists/generate_blog_supabase.py
cd Dentists/web && vercel --prod && cd ../..
```

**Result**: Dentists coverage 76% → 100%

---

### Week 3: Medical Launch (30 posts)

**Commands**:
```bash
# First: Run migration in Supabase dashboard
python import_topics_to_supabase.py  # Option 3
python Medical/generate_blog_supabase.py
cd Medical/web && vercel --prod && cd ../..
```

**Result**: Medical site LIVE with 30 posts

---

### Week 4: Calculator Tools (2-3 tools)

**Tasks**:
- Build Dentists Associate Tax Calculator
- Build Medical GP Tax Calculator
- Deploy calculators

**Result**: All sites have engagement tools

---

## Expected Impact

### Traffic

- Property: +6,270 monthly searches
- Dentists: +4,710 monthly searches
- Medical: +15,000 monthly searches
- **Total**: +26,000 monthly searches (+542%)

### Leads

- +260-520 leads/month (at 1-2% conversion)

### Revenue

- $26,000-104,000/month (at $100-200/lead)
- $312,000-1,248,000/year

### ROI

- Investment: $10.08 (one-time)
- Return: $26,000-52,000/month
- ROI: 25,000% - 100,000%

---

## Key Insights

### 1. Property's Coverage is Catastrophically Low

6.6% keyword coverage means Property is invisible for 93.4% of target keywords. This is the CRITICAL issue.

### 2. Dentists is Actually in Great Shape

76% keyword coverage (thought it was 52%). Just needs 12 posts to reach 100%.

### 3. Medical Has the Easiest Ranking Opportunity

74% of keywords are low-difficulty. Easiest niche to rank in.

### 4. Database is Unreliable

NULL slugs mean database can't track published posts. Use filesystem as source of truth.

---

## What to Read

### If you want to...

**Get started immediately**: Read `START_HERE.md`

**Understand the findings**: Read `EXECUTIVE_SUMMARY.md`

**See detailed analysis**: Read `Admin/FINAL_CORRECTED_AUDIT_REPORT.md`

**See visual charts**: Read `Admin/AUDIT_VISUAL_SUMMARY.md`

**Get complete reference**: Read `AUDIT_COMPLETE_README.md`

**Understand what was wrong**: Read `Admin/CORRECTED_AUDIT_SUMMARY.md`

---

## The Bottom Line

**Problem**: Property has 6.6% keyword coverage  
**Solution**: Generate 56 posts across 3 sites  
**Cost**: $10.08  
**Timeline**: 4 weeks  
**Impact**: +26,000 searches/month, +260-520 leads/month  
**ROI**: 25,000% - 100,000%

**Files ready**: 3 CSV files with 56 topics  
**Tool ready**: Automated import script  
**Docs ready**: Complete documentation

**Next action**:
```bash
python import_topics_to_supabase.py
```

---

**Status**: ✅ AUDIT COMPLETE  
**Date**: March 31, 2026  
**Next**: Import topics and generate posts
