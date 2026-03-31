# Content Automation Strategy: DeepSeek + Claude + GSC Integration

**Date:** 31 March 2026  
**Goal:** Automate content generation using DeepSeek for research and Claude for writing, plus capitalize on GSC search queries

---

## 📊 CURRENT STATUS

### Content Inventory:
- **Dentists**: 48 blog posts
- **Property**: 45 blog posts  
- **Last generated**: 28-30 March 2026

### System Architecture:
✅ **DeepSeek integration** - Already implemented  
✅ **Claude integration** - Already implemented  
✅ **Supabase topics** - Already configured  
❌ **GSC integration** - Not yet implemented  
❌ **Automated scheduling** - Not running

---

## 🎯 OPTIMAL WORKFLOW: DeepSeek for Research, Claude for Writing

### Current Implementation:

The system ALREADY supports this! Here's how it works:

#### 1. **Keyword Research** (DeepSeek - Cheap)
```python
# agents/utils/keyword_researcher.py
researcher = KeywordResearcher(api_key, use_deepseek=True)
keywords = await researcher.research_keywords(target_keyword, niche_type)
```

**Cost**: $0.01 per research session  
**Tokens**: ~10K input + 15K output  
**Use case**: Generate 350-500 keywords with scoring

#### 2. **Blog Generation** (Claude - Quality)
```python
# Dentists/generate_blog_supabase.py
# Property/generate_blog_supabase.py
client = Anthropic(api_key=ANTHROPIC_API_KEY)
content = generate_content(topic_data)
```

**Cost**: $0.06 per blog post (with caching)  
**Tokens**: ~2K input + 2K output  
**Use case**: High-quality, professional blog content

### Why This Split Works:

| Task | Model | Cost | Reason |
|------|-------|------|--------|
| **Keyword research** | DeepSeek | $0.01 | Token-heavy, structured output, doesn't need creativity |
| **Content generation** | Claude | $0.06 | Needs excellent writing, UK English, professional tone |
| **Config generation** | DeepSeek | $0.003 | Structured JSON, deterministic |
| **Page generation** | DeepSeek | $0.01 | Template-based, less creative |

---

## 🚨 WHY NO NEW CONTENT?

### Issue #1: No Automated Scheduling

The blog generation scripts exist but aren't running automatically. You need to either:

**Option A: Manual Execution**
```powershell
# Generate one blog post for Dentists
cd Dentists
python generate_blog_supabase.py

# Generate one blog post for Property
cd Property
python generate_blog_supabase.py
```

**Option B: GitHub Actions** (Recommended)
- Check `.github/workflows/` for automation
- Should run daily at 6 AM UTC
- Generates 1 blog per niche per day

### Issue #2: Rate Limits

From `agents/config/cost_limits.py`:
```python
RATE_LIMITS = {
    "daily_blog_posts_per_niche": 1,  # Max 1 blog per niche per day
    "daily_content_research_calls": 0,  # Disabled
    "monthly_keyword_refresh": 1,  # Max 1 per month
}
```

**This is GOOD** - prevents cost spiral. But it means:
- Only 1 new blog post per niche per day
- Keyword research is monthly, not daily
- Content research is disabled

### Issue #3: Supabase Topics Might Be Depleted

Check how many unused topics remain:

```sql
-- Dentists
SELECT COUNT(*) FROM blog_topics WHERE used = false;

-- Property
SELECT COUNT(*) FROM blog_topics_property WHERE used = false;
```

If 0 unused topics → Need to run keyword research again

---

## 🔄 GSC INTEGRATION: Capitalize on Search Queries

### The Opportunity:

Property site is getting impressions! This means:
- Real search queries from real users
- Actual demand signals
- Low-hanging fruit keywords

### Proposed GSC Integration System:

#### Step 1: Fetch GSC Data

Create `agents/utils/gsc_client.py`:

```python
"""
Google Search Console API Client
Fetches search queries, impressions, clicks, CTR
"""
from google.oauth2 import service_account
from googleapiclient.discovery import build
from datetime import datetime, timedelta

class GSCClient:
    def __init__(self, credentials_path: str):
        credentials = service_account.Credentials.from_service_account_file(
            credentials_path,
            scopes=['https://www.googleapis.com/auth/webmasters.readonly']
        )
        self.service = build('searchconsole', 'v1', credentials=credentials)
    
    def get_top_queries(self, site_url: str, days: int = 7, min_impressions: int = 10):
        """
        Get top search queries with impressions but low CTR.
        These are opportunities - people are seeing us but not clicking.
        """
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=days)
        
        request = {
            'startDate': str(start_date),
            'endDate': str(end_date),
            'dimensions': ['query'],
            'rowLimit': 100
        }
        
        response = self.service.searchanalytics().query(
            siteUrl=site_url,
            body=request
        ).execute()
        
        # Filter for high impressions, low CTR (opportunity keywords)
        opportunities = []
        for row in response.get('rows', []):
            query = row['keys'][0]
            impressions = row['impressions']
            clicks = row['clicks']
            ctr = row['ctr']
            position = row['position']
            
            # Opportunity criteria:
            # - 10+ impressions
            # - CTR < 5% (people see us but don't click)
            # - Position 5-20 (we're on page 1-2, can improve)
            if impressions >= min_impressions and ctr < 0.05 and 5 <= position <= 20:
                opportunities.append({
                    'query': query,
                    'impressions': impressions,
                    'clicks': clicks,
                    'ctr': ctr,
                    'position': position,
                    'opportunity_score': impressions * (1 - ctr)  # Higher = better opportunity
                })
        
        # Sort by opportunity score
        opportunities.sort(key=lambda x: x['opportunity_score'], reverse=True)
        
        return opportunities
```

#### Step 2: Auto-Add GSC Queries to Supabase

Create `agents/gsc_topic_sync.py`:

```python
"""
GSC Topic Sync - Automatically add high-opportunity queries to Supabase
Runs weekly to capture new search trends
"""
import os
from agents.utils.gsc_client import GSCClient
from agents.utils.deepseek_client import DeepSeekClient
import httpx

def sync_gsc_topics(niche: str, site_url: str):
    """
    1. Fetch top opportunity queries from GSC
    2. Analyze with DeepSeek (cheap)
    3. Add to Supabase as high-priority topics
    """
    
    # Fetch GSC data
    gsc = GSCClient('path/to/credentials.json')
    opportunities = gsc.get_top_queries(site_url, days=7, min_impressions=10)
    
    print(f"Found {len(opportunities)} opportunity keywords from GSC")
    
    # Analyze with DeepSeek
    deepseek = DeepSeekClient(os.getenv('DEEPSEEK_API_KEY'))
    
    for opp in opportunities[:20]:  # Top 20 opportunities
        query = opp['query']
        impressions = opp['impressions']
        position = opp['position']
        
        # Generate topic analysis
        prompt = f"""Analyze this search query for content creation:

Query: "{query}"
Current position: {position}
Impressions: {impressions}/week

Generate a JSON object with:
- topic: Optimized blog post title (60 chars max)
- primary_keyword: Exact keyword to target
- secondary_keywords: [5 related keywords]
- user_intent: "informational" | "transactional" | "navigational"
- content_tier: "pillar" | "cluster" | "support"
- publish_priority: 1-10 (10 = highest, GSC queries should be 8-10)

Return ONLY valid JSON."""
        
        analysis = deepseek.generate_structured(prompt, temperature=0.2)
        topic_data = json.loads(analysis)
        
        # Add to Supabase
        add_topic_to_supabase(niche, topic_data, source='gsc')
        
        print(f"  Added: {topic_data['topic']}")

def add_topic_to_supabase(niche: str, topic_data: dict, source: str = 'manual'):
    """Add topic to appropriate Supabase table."""
    
    table_name = f"blog_topics_{niche}" if niche != "dentists" else "blog_topics"
    
    url = f"{os.getenv('SUPABASE_URL')}/rest/v1/{table_name}"
    headers = {
        "apikey": os.getenv('SUPABASE_KEY'),
        "Authorization": f"Bearer {os.getenv('SUPABASE_KEY')}",
        "Content-Type": "application/json"
    }
    
    payload = {
        **topic_data,
        "source": source,  # 'gsc', 'manual', 'research'
        "used": False,
        "created_at": datetime.utcnow().isoformat()
    }
    
    response = httpx.post(url, headers=headers, json=payload)
    response.raise_for_status()
```

#### Step 3: Prioritize GSC Topics

Update Supabase schema to add `source` column:

```sql
ALTER TABLE blog_topics ADD COLUMN source TEXT DEFAULT 'manual';
ALTER TABLE blog_topics_property ADD COLUMN source TEXT DEFAULT 'manual';

-- GSC topics get highest priority
UPDATE blog_topics SET publish_priority = 9 WHERE source = 'gsc';
UPDATE blog_topics_property SET publish_priority = 9 WHERE source = 'gsc';
```

---

## 🤖 AUTOMATED WORKFLOW

### Daily Schedule (GitHub Actions):

```yaml
# .github/workflows/daily-content.yml
name: Daily Content Generation

on:
  schedule:
    - cron: '0 6 * * *'  # 6 AM UTC daily
  workflow_dispatch:  # Manual trigger

jobs:
  generate-content:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: pip install -r requirements.txt
      
      - name: Generate Dentists blog
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_KEY: ${{ secrets.SUPABASE_KEY }}
        run: |
          cd Dentists
          python generate_blog_supabase.py
      
      - name: Generate Property blog
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_KEY: ${{ secrets.SUPABASE_KEY }}
        run: |
          cd Property
          python generate_blog_supabase.py
      
      - name: Commit and push
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add .
          git commit -m "chore: generate daily blog content [skip ci]" || echo "No changes"
          git push
```

### Weekly Schedule (GSC Sync):

```yaml
# .github/workflows/weekly-gsc-sync.yml
name: Weekly GSC Topic Sync

on:
  schedule:
    - cron: '0 9 * * 1'  # 9 AM UTC every Monday
  workflow_dispatch:

jobs:
  sync-gsc-topics:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: pip install -r requirements.txt
      
      - name: Sync Property GSC topics
        env:
          DEEPSEEK_API_KEY: ${{ secrets.DEEPSEEK_API_KEY }}
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_KEY: ${{ secrets.SUPABASE_KEY }}
          GSC_CREDENTIALS: ${{ secrets.GSC_CREDENTIALS }}
        run: |
          python agents/gsc_topic_sync.py --niche property --site-url https://www.propertytaxpartners.co.uk
      
      - name: Sync Dentists GSC topics (when it has impressions)
        env:
          DEEPSEEK_API_KEY: ${{ secrets.DEEPSEEK_API_KEY }}
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_KEY: ${{ secrets.SUPABASE_KEY }}
          GSC_CREDENTIALS: ${{ secrets.GSC_CREDENTIALS }}
        run: |
          python agents/gsc_topic_sync.py --niche dentists --site-url https://www.dentalfinancepartners.co.uk
```

---

## 💰 COST ANALYSIS

### Current Costs (Per Month):

| Activity | Model | Frequency | Cost/Operation | Monthly Cost |
|----------|-------|-----------|----------------|--------------|
| **Blog generation** | Claude | 2 niches × 30 days | $0.06 | $3.60 |
| **Keyword research** | DeepSeek | 2 niches × 1/month | $0.01 | $0.02 |
| **GSC sync** | DeepSeek | 2 niches × 4/month | $0.10 | $0.80 |
| **TOTAL** | | | | **$4.42/month** |

### With 10 Niches:

| Activity | Monthly Cost |
|----------|--------------|
| Blog generation (10 niches × 30 days × $0.06) | $18.00 |
| Keyword research (10 niches × $0.01) | $0.10 |
| GSC sync (10 niches × 4 × $0.10) | $4.00 |
| **TOTAL** | **$22.10/month** |

**Budget remaining**: $200 - $22 = **$178/month** for expansion!

---

## 🚀 IMMEDIATE ACTION PLAN

### Step 1: Check Current Automation (5 minutes)

```powershell
# Check if GitHub Actions are running
# Go to: https://github.com/YOUR_REPO/actions

# Check Supabase topics remaining
# Run this query in Supabase SQL Editor:
SELECT 
  'dentists' as niche,
  COUNT(*) FILTER (WHERE used = false) as unused_topics,
  COUNT(*) FILTER (WHERE used = true) as used_topics
FROM blog_topics
UNION ALL
SELECT 
  'property' as niche,
  COUNT(*) FILTER (WHERE used = false) as unused_topics,
  COUNT(*) FILTER (WHERE used = true) as used_topics
FROM blog_topics_property;
```

### Step 2: Manual Test (10 minutes)

```powershell
# Test Dentists blog generation
cd Dentists
python generate_blog_supabase.py

# Test Property blog generation
cd Property
python generate_blog_supabase.py
```

### Step 3: Implement GSC Integration (2-3 hours)

1. **Set up GSC API access**:
   - Go to Google Cloud Console
   - Enable Search Console API
   - Create service account
   - Download credentials JSON
   - Add service account to GSC properties

2. **Create GSC client** (copy code above to `agents/utils/gsc_client.py`)

3. **Create GSC sync script** (copy code above to `agents/gsc_topic_sync.py`)

4. **Test manually**:
   ```powershell
   python agents/gsc_topic_sync.py --niche property --site-url https://www.propertytaxpartners.co.uk
   ```

5. **Add to GitHub Actions** (copy workflow above)

### Step 4: Monitor & Optimize (Ongoing)

- Check GitHub Actions runs daily
- Monitor Supabase topic usage
- Review GSC Performance report weekly
- Adjust priorities based on results

---

## 📊 SUCCESS METRICS

### Week 1:
- ✅ 2 new blog posts per day (1 per niche)
- ✅ GitHub Actions running successfully
- ✅ No cost overruns

### Week 2-4:
- ✅ GSC integration live
- ✅ 5-10 GSC-sourced topics added per week
- ✅ Impressions increasing week-over-week

### Month 2+:
- ✅ 60+ new blog posts per niche
- ✅ GSC topics converting at higher CTR
- ✅ Organic traffic growing 20%+ month-over-month

---

## 🎯 KEY INSIGHTS

### Why DeepSeek + Claude Works:

1. **DeepSeek for research** = 15x cost savings on token-heavy tasks
2. **Claude for writing** = Professional quality that converts
3. **Best of both worlds** = Low cost + high quality

### Why GSC Integration Matters:

1. **Real demand signals** - Not guessing what people search for
2. **Low-hanging fruit** - Already getting impressions, just need better content
3. **Competitive advantage** - Most competitors don't do this

### Why Automation Matters:

1. **Consistency** - Daily content builds authority
2. **Scalability** - Can support 10+ niches with same effort
3. **Cost control** - Rate limits prevent runaway spending

---

## 🔧 TROUBLESHOOTING

### "No unused topics found"
**Solution**: Run keyword research to generate more topics
```powershell
python agents/generate_niche.py --niche-id dentists --display-name "Dental Finance Partners" --target-keyword "dental accountant" --model deepseek
```

### "GitHub Actions not running"
**Solution**: Check workflow files in `.github/workflows/`
- Ensure secrets are set (ANTHROPIC_API_KEY, SUPABASE_URL, etc.)
- Check workflow syntax
- Manually trigger via Actions tab

### "Content quality is poor"
**Solution**: Claude is already being used for generation. Check:
- Prompt quality in `generate_blog_supabase.py`
- Topic quality in Supabase
- Internal link relevance

---

**Last Updated:** 31 March 2026  
**Status:** Ready to implement  
**Next Action:** Check current automation status and test manual generation
