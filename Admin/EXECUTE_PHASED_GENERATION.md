# Phased Generation Plan - Execute Everything

**Date**: March 31, 2026  
**Scope**: Property + Dentists (Medical later)  
**Total**: 163 topics in 2 phases

---

## Why 26 Posts Initially?

**You asked why only 26 posts** - Good question!

**Answer**: I was being conservative and only selecting "foundational" topics. But you said **"let's do everything"**, so:

**Actually available**:
- Property: 142 uncovered keywords (not 14!)
- Dentists: 21 uncovered keywords (not 12!)
- **Total**: 163 topics

**But we'll do it in 2 phases** as you requested:
1. **Phase 1**: Core foundational (21 topics) - Generate first, review quality
2. **Phase 2**: Comprehensive (142 topics) - Generate after review

---

## The Full Plan

### PHASE 1: Core Foundational (21 topics)

**Property**: 12 core topics
- What Does a Property Accountant Do
- Property Tax Advice (1200 vol)
- Best Property Accountant (800 vol)
- Property Accountant Near Me (800 vol)
- Property Accountants Near Me (900 vol)
- Property Accountant UK (600 vol)
- Property Accountant Cost
- Property Accountant Fees
- How to Find/Choose/When to Hire
- Plus 3 more foundational

**Dentists**: 9 core topics
- Dental Practice Accountant (1400 vol)
- Dental Practice Accountant London (640 vol)
- Associate Dentist Tax Calculator (620 vol)
- Associate Dentist Tax Return Guide (580 vol)
- Associate Dentist Tax Deductions 2026 (540 vol)
- Private Dental Practice Tax (450 vol)
- Dental Associate vs Self Employed (490 vol)
- Plus 2 more

**Cost**: $3.78  
**Time**: ~2 hours  
**Result**: Property 6.6% → 14.5%, Dentists 60-70% → 85-90%

---

### PHASE 2: Comprehensive (142 topics)

**Property**: 130 additional topics
- Location content (London, Manchester, Birmingham, Leeds, etc.)
- Advanced technical topics
- Service variations
- Employment/jobs queries
- Specialized services

**Dentists**: 12 additional topics
- Remaining technical gaps
- Specialized services
- Complete coverage

**Cost**: $25.56  
**Time**: ~12 hours  
**Result**: Property 14.5% → 100%, Dentists 85-90% → 100%

---

### GRAND TOTAL

**Topics**: 163  
**Cost**: $29.34  
**Time**: ~14 hours automated  
**Result**: Both sites at 100% keyword coverage

**After completion**:
- Property: 45 → 187 posts
- Dentists: 48 → 69 posts
- Total: 256 posts across both sites

---

## Execution Steps

### STEP 1: Import Phase 1 Core Topics

```bash
python PHASE1_import_core.py
```

**This will**:
- Import 12 Property core topics
- Import 9 Dentists core topics
- Show detailed status for each topic
- Display: keyword, slug, volume, difficulty, priority
- Total: 21 topics imported

**Status updates**: You'll see progress for each topic as it's imported.

---

### STEP 2: Generate Phase 1 Posts

**Property** (12 posts):
```bash
python Property/generate_blog_supabase.py
```

**Expected output**:
- Status updates per post generation
- Shows: which topic, progress (1/12, 2/12, etc.)
- Time: ~1 hour
- Result: 12 new .md files in Property/web/content/blog/

**Dentists** (9 posts):
```bash
python Dentists/generate_blog_supabase.py
```

**Expected output**:
- Status updates per post generation
- Shows: which topic, progress (1/9, 2/9, etc.)
- Time: ~45 minutes
- Result: 9 new .md files in Dentists/web/content/blog/

---

### STEP 3: Deploy Phase 1

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

---

### STEP 4: REVIEW QUALITY ⚠️ CRITICAL

**Check these things**:

1. **Blog post quality**:
   - Content is accurate and helpful
   - Proper structure (H1, H2, H3)
   - Good readability
   - No AI-sounding fluff

2. **Keyword coverage**:
   - Target keyword appears in title
   - Keyword in first paragraph
   - Natural keyword usage throughout
   - Related terms included

3. **Standards**:
   - Matches your existing post quality
   - Proper UK spelling and terminology
   - Accurate tax/accounting information
   - Professional tone

4. **Technical**:
   - Frontmatter correct
   - Slugs match expectations
   - Categories appropriate
   - No formatting issues

**If quality is good**: Proceed to Phase 2  
**If issues found**: Fix generation prompts, regenerate Phase 1

---

### STEP 5: Import Phase 2 Comprehensive (After Review)

```bash
python PHASE2_import_comprehensive.py
```

**This will**:
- Import 130 Property comprehensive topics
- Import 12 Dentists comprehensive topics
- Show progress every 10 topics
- Total: 142 topics imported

**Status updates**: Progress shown every 10 topics (10/130, 20/130, etc.)

---

### STEP 6: Generate Phase 2 Posts

**Property** (130 posts):
```bash
python Property/generate_blog_supabase.py
```

**Expected**:
- ~10 hours generation time
- Status updates per post
- 130 new .md files

**Dentists** (12 posts):
```bash
python Dentists/generate_blog_supabase.py
```

**Expected**:
- ~1 hour generation time
- Status updates per post
- 12 new .md files

---

### STEP 7: Deploy Phase 2

```bash
cd Property/web && vercel --prod && cd ../..
cd Dentists/web && vercel --prod && cd ../..
```

---

### STEP 8: Final Verification

**Check**:
- Property: 187 total posts
- Dentists: 69 total posts
- Both sites at ~100% keyword coverage
- All posts live and indexed

---

## Files Created

### Phase 1 (Core)

📄 **`PHASE1_CORE_property.csv`** (12 topics)  
📄 **`PHASE1_CORE_dentists.csv`** (9 topics)  
🔧 **`PHASE1_import_core.py`** (import script with status updates)

---

### Phase 2 (Comprehensive)

📄 **`PHASE2_COMPREHENSIVE_property.csv`** (130 topics)  
📄 **`PHASE2_COMPREHENSIVE_dentists.csv`** (12 topics)  
🔧 **`PHASE2_import_comprehensive.py`** (import script with progress tracking)

---

## Status Updates You'll See

### During Import

```
22:53:15 [OK]   [1/12] Imported: What Does a Property Accountant Do
         Keyword: what does a property accountant do
         Slug: what-does-a-property-accountant-do
         Volume:   400 | Difficulty:  20 | Priority: 2

22:53:16 [OK]   [2/12] Imported: Property Tax Advice: Expert Services
         Keyword: property tax advice
         Slug: property-tax-advice
         Volume:  1200 | Difficulty:  40 | Priority: 3
```

---

### During Generation

Your `generate_blog_supabase.py` scripts should show:

```
Generating blog posts from Supabase...
Found 12 topics to generate

[1/12] Generating: What Does a Property Accountant Do
       Keyword: what does a property accountant do
       Calling Claude API...
       Writing to: what-does-a-property-accountant-do.md
       Updating Supabase: used=true
       ✓ Complete

[2/12] Generating: Property Tax Advice: Expert Services
       Keyword: property tax advice
       Calling Claude API...
       Writing to: property-tax-advice.md
       Updating Supabase: used=true
       ✓ Complete
```

---

## Timeline

### Day 1 (April 1) - Phase 1 Property

**Morning**:
```bash
python PHASE1_import_core.py  # Import 21 topics (~5 min)
python Property/generate_blog_supabase.py  # Generate 12 posts (~1 hour)
```

**Afternoon**:
```bash
cd Property/web && vercel --prod  # Deploy (~5 min)
# REVIEW quality
```

---

### Day 2 (April 2) - Phase 1 Dentists

**Morning**:
```bash
python Dentists/generate_blog_supabase.py  # Generate 9 posts (~45 min)
cd Dentists/web && vercel --prod  # Deploy (~5 min)
# REVIEW quality
```

**Afternoon**:
- Review both sites
- Check quality meets standards
- Approve Phase 2

---

### Day 3 (April 3) - Phase 2 Import

**If quality approved**:
```bash
python PHASE2_import_comprehensive.py  # Import 142 topics (~10 min)
```

---

### Days 4-5 (April 4-5) - Phase 2 Generation

**Property** (130 posts):
```bash
python Property/generate_blog_supabase.py  # ~10 hours
```

**Dentists** (12 posts):
```bash
python Dentists/generate_blog_supabase.py  # ~1 hour
```

**Note**: These can run overnight or during work hours

---

### Day 6 (April 6) - Phase 2 Deploy

```bash
cd Property/web && vercel --prod && cd ../..
cd Dentists/web && vercel --prod && cd ../..
```

**Final check**:
- Property: 187 posts
- Dentists: 69 posts
- Both at 100% coverage

---

## Summary

### Why Phased?

**Phase 1**: Core foundational (21 topics)
- **Generate first**: Critical service discovery content
- **Review quality**: Make sure blogs meet your standards
- **Verify coverage**: Ensure keywords are properly covered
- **Quick win**: Immediate SEO impact

**Phase 2**: Comprehensive (142 topics)
- **Generate after review**: Only if Phase 1 quality is good
- **Complete coverage**: All remaining keywords
- **Larger batch**: More efficient to generate all at once

---

### Status Updates

**Import scripts**: Show each topic as it's imported (keyword, slug, volume, difficulty)

**Generation scripts**: Your existing scripts should show progress (1/12, 2/12, etc.)

**Result**: You can monitor progress in real-time

---

### What You Asked For

✅ **Do everything**: 163 topics total  
✅ **Core first**: 21 core topics in Phase 1  
✅ **Review before comprehensive**: Pause after Phase 1  
✅ **Status updates**: Detailed logs per generation  
✅ **Verify standards**: Review quality before Phase 2

---

## Your Next Command

```bash
python PHASE1_import_core.py
```

This will:
1. Import 21 core topics
2. Show detailed status for each
3. Tell you what to do next

**Ready to start?**
