# Property Content Generation Guide

**Domain:** propertytaxpartners.co.uk  
**Status:** ✅ Fully configured and ready  
**Last Updated:** 29 March 2026

---

## ✅ ARCHITECTURE VERIFICATION

### How It Works (Already Set Up)

The multi-niche architecture is **already fully configured** for Property:

```
┌─────────────────────────────────────────────────────────┐
│  CENTRALIZED AGENT SYSTEM (agents/)                     │
│  ├── content_research_agent.py  → Finds trending topics │
│  ├── blog_generation_agent.py   → Generates articles    │
│  └── deployment_agent.py        → Deploys to filesystem │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  NICHE ROUTING (agents/config/agent_config.py)          │
│  ├── Dentists  → blog_topics (table)                    │
│  └── Property  → blog_topics_property (table)           │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  SUPABASE DATABASE                                       │
│  ├── blog_topics (Dentists)                             │
│  ├── blog_topics_property (Property) ← NEW              │
│  ├── published_content (both niches)                    │
│  └── leads (unified, with 'source' column)              │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  NICHE-SPECIFIC CONFIG                                   │
│  ├── Property/niche.config.json                         │
│  └── Property/config_supabase.py                        │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  OUTPUT                                                  │
│  └── Property/web/content/blog/*.md                     │
└─────────────────────────────────────────────────────────┘
```

### Key Configuration Points

✅ **Agent Config** (`agents/config/agent_config.py`):
```python
NICHE_CONFIG = {
    "Property": {
        "enabled": True,
        "blog_topics_table": "blog_topics_property",
        "web_path": "Property/web",
        "source_identifier": "property",
    }
}
```

✅ **Property Config** (`Property/config_supabase.py`):
- Site URL: `https://propertytaxpartners.co.uk`
- Author: `Property Tax Partners`
- Categories: Section 24, Incorporation, MTD, CGT, Portfolio Management
- System prompt: Property-specific expertise and tone

✅ **Niche Config** (`Property/niche.config.json`):
- Domain: `propertytaxpartners.co.uk`
- Display name: `Property Tax Partners`
- Content strategy: `blog_topics_property` table

✅ **GitHub Actions** (`.github/workflows/daily-content-pipeline.yml`):
- Matrix includes both `Dentists` and `Property`
- Runs independently for each niche
- No interference between niches

---

## 🚀 GENERATING CONTENT

### Option 1: Manual Generation (Immediate)

Generate 15-20 articles right now:

```bash
# Step 1: Research and populate topics (generates 5 topics)
python agents/content_research_agent.py --niche Property

# Step 2: Generate blog posts (run multiple times)
python agents/blog_generation_agent.py --niche Property --max-posts 5

# Step 3: Deploy content to filesystem
python agents/deployment_agent.py --niche Property --max-deployments 20
```

**Repeat Step 2 until you have 15-20 articles.**

### Option 2: Automated Daily Generation

The GitHub Actions workflow runs automatically:
- **Schedule:** Daily at 6 AM UTC
- **Process:**
  1. Research topics (if < 10 unused topics)
  2. Generate 1 blog post per niche
  3. Deploy to filesystem
  4. Commit and push to Git

**To trigger manually:**
```bash
# Via GitHub UI: Actions → Daily Content Pipeline → Run workflow
# Or via gh CLI:
gh workflow run daily-content-pipeline.yml
```

---

## 📊 CONTENT SEPARATION

### How Niches Stay Separate

1. **Separate Supabase Tables:**
   - Dentists: `blog_topics` → generates dental content
   - Property: `blog_topics_property` → generates property content

2. **Niche-Specific Prompts:**
   - Dentists: "UK dentists, associates, practice owners..."
   - Property: "UK landlords, BTL investors, portfolio owners..."

3. **Separate Output Directories:**
   - Dentists: `Dentists/web/content/blog/`
   - Property: `Property/web/content/blog/`

4. **Independent Deployment:**
   - Each niche deploys to its own Vercel project
   - No shared content files
   - No duplicate content risk

### Lead Attribution

All leads go to the same `leads` table with a `source` column:
- Dentists form → `source: "dentists"`
- Property form → `source: "property"`

This allows unified lead management while tracking origin.

---

## 🧪 TESTING THE SYSTEM

### Test Content Generation

```bash
# 1. Check if topics exist
python -c "
import sys; sys.path.insert(0, 'agents')
from utils.supabase_client import SupabaseClient
from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY
import asyncio

async def check():
    client = SupabaseClient(SUPABASE_URL, SUPABASE_KEY)
    topics = await client.select('blog_topics_property', filters={'used': False})
    print(f'Unused Property topics: {len(topics)}')
    if topics:
        for t in topics[:3]:
            print(f'  - {t[\"topic\"]}')

asyncio.run(check())
"

# 2. Generate one test article
python agents/blog_generation_agent.py --niche Property --max-posts 1

# 3. Check output
ls Property/web/content/blog/
```

### Test Lead Form Attribution

```bash
# Submit test lead through Property form
# Check Supabase leads table
# Verify source = "property"
```

---

## 🔄 WORKFLOW COMPARISON

### Dentists (Already Running)
```
Daily 6 AM UTC:
  → Research topics (if needed)
  → Generate 1 blog post
  → Deploy to Dentists/web/content/blog/
  → Commit to Git
  → Vercel auto-deploys to dentalfinancepartners.co.uk
```

### Property (Now Enabled)
```
Daily 6 AM UTC:
  → Research topics (if needed)
  → Generate 1 blog post
  → Deploy to Property/web/content/blog/
  → Commit to Git
  → Vercel auto-deploys to propertytaxpartners.co.uk
```

**Key Point:** Both run in parallel, completely independent. No interference.

---

## 📋 IMMEDIATE NEXT STEPS

### 1. Generate Initial Content (Today)

Run this to generate 15 articles:

```bash
# Generate topics first (creates 5 topics)
python agents/content_research_agent.py --niche Property

# Generate 5 posts
python agents/blog_generation_agent.py --niche Property --max-posts 5

# Generate more topics
python agents/content_research_agent.py --niche Property

# Generate 5 more posts
python agents/blog_generation_agent.py --niche Property --max-posts 5

# Generate final batch of topics
python agents/content_research_agent.py --niche Property

# Generate final 5 posts
python agents/blog_generation_agent.py --niche Property --max-posts 5

# Deploy all to filesystem
python agents/deployment_agent.py --niche Property --max-deployments 20
```

### 2. Commit and Push

```bash
git add Property/web/content/blog/
git commit -m "Add initial Property blog content"
git push origin main
```

### 3. Verify Deployment

- Check Vercel auto-deploys the new content
- Visit https://propertytaxpartners.co.uk/blog
- Verify articles render correctly

---

## 🎯 QUALITY CONTROLS (Already Built In)

The agent system includes:

✅ **Duplicate Detection:** Checks for similar topics before generating  
✅ **Quality Validation:** Word count, structure, keyword usage  
✅ **Cost Tracking:** Monitors API usage and budget  
✅ **Error Handling:** Logs failures, sends alerts  
✅ **Rate Limiting:** Max 10 posts per niche per day  
✅ **Deduplication:** Prevents generating same topic twice  

---

## 🔐 SECURITY

✅ **API Keys:** Stored in `.env` (gitignored)  
✅ **Supabase Keys:** Shared across niches (anon key, safe for client)  
✅ **Lead Attribution:** Source column prevents data mixing  
✅ **Content Isolation:** Separate tables, separate directories  

---

## 📈 MONITORING

### Check System Status

```bash
# View recent agent executions
python agents/monitoring_dashboard.py

# Check topic inventory
python -c "
import sys; sys.path.insert(0, 'agents')
from utils.supabase_client import SupabaseClient
from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY
import asyncio

async def status():
    client = SupabaseClient(SUPABASE_URL, SUPABASE_KEY)
    
    # Dentists
    d_topics = await client.select('blog_topics', filters={'used': False})
    d_content = await client.select('published_content', filters={'niche': 'dentists'})
    
    # Property
    p_topics = await client.select('blog_topics_property', filters={'used': False})
    p_content = await client.select('published_content', filters={'niche': 'property'})
    
    print(f'Dentists: {len(d_topics)} unused topics, {len(d_content)} published articles')
    print(f'Property: {len(p_topics)} unused topics, {len(p_content)} published articles')

asyncio.run(status())
"
```

---

## ✅ READY TO GO

Everything is configured correctly:

1. ✅ Property niche enabled in `agent_config.py`
2. ✅ Separate `blog_topics_property` table in Supabase
3. ✅ Property-specific prompts and categories
4. ✅ Domain updated to `propertytaxpartners.co.uk`
5. ✅ GitHub Actions includes Property in matrix
6. ✅ No interference with Dentists automation

**You can now generate content immediately using the commands above.**

The automated daily pipeline will also start working once topics are in the database.
