# Property Agent System Verification

**Date:** 29 March 2026  
**Domain:** propertytaxpartners.co.uk  
**Status:** ✅ READY TO GENERATE CONTENT

---

## ✅ ARCHITECTURE VERIFICATION

### How Content Attribution Works

The system is **already fully configured** to keep Dentists and Property completely separate:

```
CONTENT RESEARCH AGENT
  ↓
  Checks niche parameter → routes to correct table
  ↓
  ├─ --niche Dentists  → blog_topics (table)
  └─ --niche Property  → blog_topics_property (table)

BLOG GENERATION AGENT
  ↓
  Reads from niche-specific table
  ↓
  ├─ Dentists → reads blog_topics → uses Dentists/config_supabase.py
  └─ Property → reads blog_topics_property → uses Property/config_supabase.py

DEPLOYMENT AGENT
  ↓
  Writes to niche-specific directory
  ↓
  ├─ Dentists → Dentists/web/content/blog/
  └─ Property → Property/web/content/blog/

GITHUB ACTIONS (Automated Daily)
  ↓
  Matrix strategy runs both niches independently
  ↓
  ├─ Job 1: Dentists (blog_topics → Dentists/web/)
  └─ Job 2: Property (blog_topics_property → Property/web/)
```

### Key Separation Points

1. **Database Tables:**
   - Dentists: `blog_topics` (existing, populated)
   - Property: `blog_topics_property` (new, empty)
   - Both write to: `published_content` (with `niche` column)
   - Both write to: `leads` (with `source` column)

2. **Config Files:**
   - `agents/config/agent_config.py` → Routes by niche name
   - `Dentists/config_supabase.py` → Dental-specific prompts
   - `Property/config_supabase.py` → Property-specific prompts

3. **Output Directories:**
   - Completely separate filesystem paths
   - No shared content files
   - No risk of cross-contamination

4. **Deployment:**
   - Separate Vercel projects
   - Separate domains
   - Independent CI/CD pipelines

---

## 🔍 WHAT THE AGENTS KNOW

### Content Research Agent
**Input:** `--niche Property`  
**Knows:**
- Target table: `blog_topics_property`
- Audience: "UK landlords (individual landlords, portfolio owners, property investors)"
- Categories: "Landlord tax", "Property finance", "Buy-to-let accounting", etc.
- Avoids recent topics from the same table

### Blog Generation Agent
**Input:** `--niche Property`  
**Knows:**
- Read from: `blog_topics_property` table
- Config: `Property/config_supabase.py`
- System prompt: Property-specific expertise (Section 24, BTL, SPV, etc.)
- Output: `Property/web/content/blog/`
- Author: "Property Tax Partners"
- Site URL: "https://propertytaxpartners.co.uk"

### Deployment Agent
**Input:** `--niche Property`  
**Knows:**
- Read from: `published_content` WHERE `niche = 'property'`
- Write to: `Property/web/content/blog/`
- Mark topic as used in: `blog_topics_property`

---

## 🔒 NO INTERFERENCE WITH DENTISTS

### How Dentists Stays Unaffected

1. **Separate Tables:**
   - Dentists agents ONLY read from `blog_topics`
   - Property agents ONLY read from `blog_topics_property`
   - No shared topic pool

2. **Niche Parameter Required:**
   - Every agent call requires `--niche` parameter
   - No default niche
   - Explicit routing prevents mistakes

3. **GitHub Actions Matrix:**
   ```yaml
   strategy:
     matrix:
       niche: [Dentists, Property]
     max-parallel: 1  # Sequential, not parallel
   ```
   - Runs Dentists first, then Property
   - Independent execution contexts
   - Failure in one doesn't affect the other

4. **Published Content Filtering:**
   - `published_content` table has `niche` column
   - Deployment agent filters: `WHERE niche = 'property'`
   - Each niche only sees its own content

---

## 🎯 CURRENT STATUS

### Dentists (Production)
- ✅ Topics: ~XX in `blog_topics` table
- ✅ Content: ~45 articles deployed
- ✅ Automation: Running daily at 6 AM UTC
- ✅ Domain: dentalfinancepartners.co.uk
- ✅ Status: LIVE and automated

### Property (Ready to Launch)
- ⚠️ Topics: 0 in `blog_topics_property` table
- ⚠️ Content: 0 articles generated
- ✅ Automation: Configured and ready
- ✅ Domain: propertytaxpartners.co.uk (configured)
- ✅ Status: READY (needs initial content)

---

## 🚀 GENERATING INITIAL CONTENT

### Quick Command Sequence

```bash
# 1. Generate topics (run 3 times for 15 topics)
python agents/content_research_agent.py --niche Property
python agents/content_research_agent.py --niche Property
python agents/content_research_agent.py --niche Property

# 2. Generate articles (15 posts)
python agents/blog_generation_agent.py --niche Property --max-posts 15

# 3. Deploy to filesystem
python agents/deployment_agent.py --niche Property --max-deployments 20

# 4. Commit and push
git add Property/web/content/blog/
git commit -m "Add initial Property blog content"
git push origin main
```

### Or Use the Batch Script

```bash
python generate_property_content.py
```

This will:
1. Research 15 topics
2. Generate 15 articles
3. Deploy to filesystem
4. Show summary

---

## ✅ SAFETY GUARANTEES

### Why Dentists Won't Be Affected

1. **Database Isolation:**
   - Property reads from `blog_topics_property`
   - Dentists reads from `blog_topics`
   - Zero overlap

2. **Filesystem Isolation:**
   - Property writes to `Property/web/content/blog/`
   - Dentists writes to `Dentists/web/content/blog/`
   - Separate directories

3. **Config Isolation:**
   - Property uses `Property/config_supabase.py`
   - Dentists uses `Dentists/config_supabase.py`
   - Different prompts, categories, internal links

4. **Deployment Isolation:**
   - Property deploys to propertytaxpartners.co.uk
   - Dentists deploys to dentalfinancepartners.co.uk
   - Separate Vercel projects

5. **Lead Attribution:**
   - Property form → `source: "property"`
   - Dentists form → `source: "dentists"`
   - Same table, different source identifier

---

## 🔄 AUTOMATED DAILY WORKFLOW (After Initial Generation)

Once content is generated, the daily automation works like this:

### Every Day at 6 AM UTC

**For Dentists:**
1. Check if < 10 unused topics → research 5 new topics
2. Generate 1 blog post from `blog_topics`
3. Deploy to `Dentists/web/content/blog/`
4. Commit and push
5. Vercel auto-deploys to dentalfinancepartners.co.uk

**For Property:**
1. Check if < 10 unused topics → research 5 new topics
2. Generate 1 blog post from `blog_topics_property`
3. Deploy to `Property/web/content/blog/`
4. Commit and push
5. Vercel auto-deploys to propertytaxpartners.co.uk

**Both run sequentially, completely independent.**

---

## 📊 MONITORING

### Check System Health

```bash
# View all agent executions
python agents/monitoring_dashboard.py

# Check specific niche status
python check_property_topics.py
```

### Check Supabase Directly

1. Go to https://supabase.com/dashboard
2. Project: dhlxwmvmkrfnmcgjbntk
3. Check tables:
   - `blog_topics` (Dentists)
   - `blog_topics_property` (Property)
   - `published_content` (both, filtered by `niche` column)
   - `leads` (both, filtered by `source` column)

---

## ✅ CONCLUSION

**Everything is already wired up correctly:**

✅ Agent config routes Property to `blog_topics_property` table  
✅ Property config uses propertytaxpartners.co.uk domain  
✅ Separate prompts ensure property-specific content  
✅ Separate output directories prevent file conflicts  
✅ GitHub Actions matrix handles both niches independently  
✅ Lead attribution keeps sources separate  

**No changes needed to Dentists automation.**

**Ready to generate Property content immediately.**

---

## 🎯 NEXT ACTION

Run this command to generate 15 Property articles:

```bash
python generate_property_content.py
```

This will populate the Property site with initial content without affecting Dentists in any way.
