# Smart GSC Content Strategy: Optimize Existing vs Create New

**Date:** 31 March 2026  
**Problem:** GSC queries shouldn't blindly create new content - need to optimize existing content first

---

## 📊 WHAT GSC ACTUALLY PROVIDES

### Available Data Points (Per Query):

```json
{
  "query": "section 24 tax relief calculator",
  "clicks": 12,
  "impressions": 450,
  "ctr": 0.027,  // 2.7% click-through rate
  "position": 8.5,  // Average position in search results
  "page": "https://www.propertytaxpartners.co.uk/blog/section-24-tax-calculator"
}
```

### Key Metrics Explained:

| Metric | What It Means | Action Signal |
|--------|---------------|---------------|
| **Impressions** | How many times your page appeared in search results | High impressions = Google thinks you're relevant |
| **Clicks** | How many people clicked through | Low clicks despite high impressions = poor title/meta |
| **CTR** | Clicks ÷ Impressions | Low CTR = optimize title/description |
| **Position** | Average ranking (1 = top result) | Position 5-15 = optimization opportunity |
| **Page** | Which URL is ranking | Tells you WHICH existing page to optimize |

### What GSC CANNOT Tell You:

- ❌ User intent (informational vs transactional)
- ❌ Content quality
- ❌ Keyword difficulty
- ❌ Search volume trends
- ❌ Competitor rankings

---

## 🎯 SMART CONTENT DECISION MATRIX

### Decision Flow:

```
GSC Query → Check if existing page ranks → YES → Optimize existing
                                        → NO → Check if related page exists → YES → Add section to existing
                                                                           → NO → Create new content
```

### The 4 Content Actions:

#### 1. **OPTIMIZE EXISTING** (Most Common - 60% of queries)

**When:**
- Query ranks for an existing page
- Position 5-20 (page 1-2)
- High impressions, low CTR

**Example:**
```
Query: "section 24 tax relief calculator"
Page: /blog/section-24-tax-calculator
Position: 8.5
Impressions: 450
CTR: 2.7%

ACTION: Optimize existing page
- Update title to include "relief" keyword
- Improve meta description
- Add FAQ section answering "how much relief"
- Update H2s to match search intent
```

#### 2. **EXPAND EXISTING** (Common - 25% of queries)

**When:**
- Query is related to existing page but not exact match
- Existing page doesn't fully cover the query
- Query has different intent than existing page

**Example:**
```
Query: "section 24 basic rate taxpayer"
Existing page: /blog/section-24-mortgage-interest-restriction
Position: 15
Impressions: 120
CTR: 1.5%

ACTION: Expand existing page
- Add new section: "How Section 24 Affects Basic Rate Taxpayers"
- Add comparison table: Basic vs Higher Rate
- Update internal links
- Don't create new page (would compete with existing)
```

#### 3. **CREATE NEW** (Rare - 10% of queries)

**When:**
- No existing page ranks for this query
- Query is sufficiently different from existing content
- Query has high search volume
- Query represents new topic cluster

**Example:**
```
Query: "section 24 vs incorporation which is better"
Existing pages: 
  - /blog/section-24-mortgage-interest-restriction (doesn't compare)
  - /blog/incorporation-cost-calculator (doesn't mention Section 24)
Position: None (not ranking)
Impressions: 0

ACTION: Create new comparison page
- Title: "Section 24 vs Incorporation: Which Saves More Tax?"
- Compare both strategies side-by-side
- Link to both existing pages
- Fill content gap
```

#### 4. **IGNORE** (Sometimes - 5% of queries)

**When:**
- Query is brand search (already ranking #1)
- Query is navigational ("login", "contact")
- Query is irrelevant to your niche
- Query has <5 impressions (noise)

---

## 🔍 GSC ANALYSIS SYSTEM

### Step 1: Fetch & Categorize GSC Data

```python
"""
GSC Smart Analyzer - Categorizes queries into optimize/expand/create/ignore
"""
from typing import List, Dict, Literal
import httpx
from agents.utils.deepseek_client import DeepSeekClient

class GSCSmartAnalyzer:
    def __init__(self, gsc_client, deepseek_client, supabase_url, supabase_key):
        self.gsc = gsc_client
        self.deepseek = deepseek_client
        self.supabase_url = supabase_url
        self.supabase_key = supabase_key
    
    def analyze_queries(self, site_url: str, niche: str) -> Dict:
        """
        Analyze GSC queries and categorize into actions.
        Returns: {
            'optimize': [...],  # Existing pages to optimize
            'expand': [...],    # Existing pages to expand
            'create': [...],    # New content needed
            'ignore': [...]     # No action needed
        }
        """
        
        # 1. Fetch GSC data (last 28 days for stable data)
        gsc_data = self.gsc.get_search_analytics(site_url, days=28)
        
        # 2. Get existing blog posts
        existing_posts = self._get_existing_posts(niche)
        
        # 3. Match queries to existing content
        matched_queries = self._match_queries_to_content(gsc_data, existing_posts)
        
        # 4. Categorize with DeepSeek
        categorized = self._categorize_queries(matched_queries, niche)
        
        return categorized
    
    def _get_existing_posts(self, niche: str) -> List[Dict]:
        """Fetch all existing blog posts from Supabase."""
        
        table_name = f"blog_topics_{niche}" if niche != "dentists" else "blog_topics"
        
        url = f"{self.supabase_url}/rest/v1/{table_name}"
        headers = {
            "apikey": self.supabase_key,
            "Authorization": f"Bearer {self.supabase_key}"
        }
        params = {
            "used": "eq.true",  # Only published posts
            "select": "topic,primary_keyword,secondary_keywords,generated_slug"
        }
        
        response = httpx.get(url, headers=headers, params=params)
        response.raise_for_status()
        
        return response.json()
    
    def _match_queries_to_content(self, gsc_data: List[Dict], existing_posts: List[Dict]) -> List[Dict]:
        """
        Match GSC queries to existing content.
        Returns queries with matched_post info.
        """
        
        matched = []
        
        for query_data in gsc_data:
            query = query_data['query']
            page_url = query_data.get('page', '')
            
            # Try to match by URL first (most accurate)
            matched_post = None
            if page_url:
                # Extract slug from URL: /blog/section-24-calculator → section-24-calculator
                slug = page_url.split('/blog/')[-1].rstrip('/')
                matched_post = next((p for p in existing_posts if p.get('generated_slug') == slug), None)
            
            # If no URL match, try keyword matching
            if not matched_post:
                query_lower = query.lower()
                for post in existing_posts:
                    primary = post.get('primary_keyword', '').lower()
                    if primary and primary in query_lower:
                        matched_post = post
                        break
            
            matched.append({
                **query_data,
                'matched_post': matched_post,
                'has_match': matched_post is not None
            })
        
        return matched
    
    def _categorize_queries(self, matched_queries: List[Dict], niche: str) -> Dict:
        """
        Use DeepSeek to intelligently categorize queries.
        Cost: ~$0.05 per 100 queries
        """
        
        # Filter for actionable queries (min 10 impressions, position 5-30)
        actionable = [
            q for q in matched_queries 
            if q['impressions'] >= 10 and 5 <= q['position'] <= 30
        ]
        
        if not actionable:
            return {'optimize': [], 'expand': [], 'create': [], 'ignore': []}
        
        # Batch analyze with DeepSeek
        prompt = f"""Analyze these GSC search queries and categorize each into ONE action:

NICHE: {niche} accounting
QUERIES: {json.dumps(actionable, indent=2)}

DECISION RULES:

1. OPTIMIZE (has_match=true, position 5-15, CTR < 5%)
   - Query ranks for existing page
   - Page is on page 1-2 but CTR is low
   - Action: Improve title, meta, add FAQ

2. EXPAND (has_match=true, query differs from primary_keyword)
   - Query is related but not exact match
   - Existing page partially covers topic
   - Action: Add section to existing page

3. CREATE (has_match=false, impressions > 50)
   - No existing page ranks
   - Query represents new topic
   - High enough volume to justify new content
   - Action: Create new blog post

4. IGNORE (all others)
   - Brand queries (already ranking #1)
   - Low volume (< 10 impressions)
   - Navigational queries
   - Irrelevant to niche

OUTPUT FORMAT (JSON):
{{
  "optimize": [
    {{
      "query": "section 24 calculator",
      "matched_post_slug": "section-24-tax-calculator",
      "current_position": 8.5,
      "current_ctr": 0.027,
      "action_items": [
        "Update title to include 'relief' keyword",
        "Add FAQ: How much relief do I get?",
        "Improve meta description CTR"
      ],
      "priority": 9
    }}
  ],
  "expand": [
    {{
      "query": "section 24 basic rate taxpayer",
      "matched_post_slug": "section-24-mortgage-interest-restriction",
      "new_section_title": "How Section 24 Affects Basic Rate Taxpayers",
      "priority": 7
    }}
  ],
  "create": [
    {{
      "query": "section 24 vs incorporation comparison",
      "suggested_title": "Section 24 vs Incorporation: Which Saves More Tax?",
      "primary_keyword": "section 24 vs incorporation",
      "priority": 8
    }}
  ],
  "ignore": [
    {{"query": "property tax partners login", "reason": "navigational"}}
  ]
}}

Return ONLY valid JSON. Prioritize optimize > expand > create."""

        response = self.deepseek.generate_structured(
            prompt=prompt,
            system="You are a UK SEO specialist. Analyze GSC data and return ONLY valid JSON.",
            temperature=0.2,
            max_tokens=8000
        )
        
        # Parse JSON
        categorized = json.loads(response)
        
        return categorized
```

### Step 2: Execute Actions

```python
"""
GSC Action Executor - Performs optimize/expand/create actions
"""

class GSCActionExecutor:
    def __init__(self, supabase_url, supabase_key):
        self.supabase_url = supabase_url
        self.supabase_key = supabase_key
    
    def execute_optimize_actions(self, optimize_list: List[Dict], niche: str):
        """
        For OPTIMIZE actions: Update Supabase with optimization tasks.
        Don't regenerate content - just flag for manual review or automated optimization.
        """
        
        table_name = f"blog_topics_{niche}" if niche != "dentists" else "blog_topics"
        
        for item in optimize_list:
            slug = item['matched_post_slug']
            action_items = item['action_items']
            
            # Add to optimization queue in Supabase
            self._add_optimization_task(
                table_name=table_name,
                slug=slug,
                query=item['query'],
                actions=action_items,
                priority=item['priority']
            )
            
            print(f"[OPTIMIZE] {slug} for query '{item['query']}'")
    
    def execute_expand_actions(self, expand_list: List[Dict], niche: str):
        """
        For EXPAND actions: Add expansion tasks to Supabase.
        """
        
        for item in expand_list:
            slug = item['matched_post_slug']
            new_section = item['new_section_title']
            
            # Add expansion task
            self._add_expansion_task(
                slug=slug,
                query=item['query'],
                new_section=new_section,
                priority=item['priority']
            )
            
            print(f"[EXPAND] {slug} - add section: {new_section}")
    
    def execute_create_actions(self, create_list: List[Dict], niche: str):
        """
        For CREATE actions: Add to Supabase as new topics (high priority).
        """
        
        table_name = f"blog_topics_{niche}" if niche != "dentists" else "blog_topics"
        
        for item in create_list:
            # Check if topic already exists
            existing = self._check_duplicate_topic(
                table_name=table_name,
                keyword=item['primary_keyword']
            )
            
            if existing:
                print(f"[SKIP] Topic already exists: {item['suggested_title']}")
                continue
            
            # Add new topic
            self._add_new_topic(
                table_name=table_name,
                topic=item['suggested_title'],
                primary_keyword=item['primary_keyword'],
                source='gsc',
                priority=item['priority']
            )
            
            print(f"[CREATE] New topic: {item['suggested_title']}")
    
    def _check_duplicate_topic(self, table_name: str, keyword: str) -> bool:
        """Check if topic with similar keyword already exists."""
        
        url = f"{self.supabase_url}/rest/v1/{table_name}"
        headers = {
            "apikey": self.supabase_key,
            "Authorization": f"Bearer {self.supabase_key}"
        }
        params = {
            "primary_keyword": f"ilike.%{keyword}%",
            "select": "id"
        }
        
        response = httpx.get(url, headers=headers, params=params)
        results = response.json()
        
        return len(results) > 0
```

---

## 📊 EXAMPLE: Property Site Analysis

### Input: GSC Data (Last 28 Days)

```json
[
  {
    "query": "section 24 calculator",
    "clicks": 45,
    "impressions": 890,
    "ctr": 0.051,
    "position": 6.2,
    "page": "/blog/section-24-tax-calculator"
  },
  {
    "query": "section 24 basic rate taxpayer",
    "clicks": 8,
    "impressions": 320,
    "ctr": 0.025,
    "position": 12.5,
    "page": "/blog/section-24-mortgage-interest-restriction"
  },
  {
    "query": "section 24 vs incorporation which is better",
    "clicks": 0,
    "impressions": 0,
    "position": null,
    "page": null
  }
]
```

### Output: Categorized Actions

```json
{
  "optimize": [
    {
      "query": "section 24 calculator",
      "matched_post_slug": "section-24-tax-calculator",
      "current_position": 6.2,
      "current_ctr": 0.051,
      "action_items": [
        "Already performing well (5.1% CTR)",
        "Consider adding calculator embed in meta description",
        "Add schema markup for SoftwareApplication"
      ],
      "priority": 6
    }
  ],
  "expand": [
    {
      "query": "section 24 basic rate taxpayer",
      "matched_post_slug": "section-24-mortgage-interest-restriction",
      "new_section_title": "How Section 24 Affects Basic Rate Taxpayers",
      "action_items": [
        "Add H2: 'Impact on Basic Rate Taxpayers'",
        "Add comparison table: Basic vs Higher Rate",
        "Add FAQ: 'Am I affected if I'm a basic rate taxpayer?'"
      ],
      "priority": 8
    }
  ],
  "create": [
    {
      "query": "section 24 vs incorporation which is better",
      "suggested_title": "Section 24 vs Incorporation: Which Saves More Tax in 2026?",
      "primary_keyword": "section 24 vs incorporation",
      "secondary_keywords": [
        "section 24 or limited company",
        "incorporation vs section 24",
        "should i incorporate section 24"
      ],
      "priority": 9,
      "reason": "No existing page covers this comparison directly"
    }
  ],
  "ignore": [
    {
      "query": "property tax partners",
      "reason": "Brand query - already ranking #1"
    }
  ]
}
```

---

## 🎯 SUPABASE SCHEMA UPDATES

### Add Optimization Tracking Tables:

```sql
-- Track optimization tasks from GSC
CREATE TABLE blog_optimization_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  niche TEXT NOT NULL,
  post_slug TEXT NOT NULL,
  gsc_query TEXT NOT NULL,
  current_position DECIMAL,
  current_ctr DECIMAL,
  action_items JSONB,
  priority INTEGER DEFAULT 5,
  status TEXT DEFAULT 'pending',  -- pending, in_progress, completed
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Track expansion tasks
CREATE TABLE blog_expansion_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  niche TEXT NOT NULL,
  post_slug TEXT NOT NULL,
  gsc_query TEXT NOT NULL,
  new_section_title TEXT NOT NULL,
  priority INTEGER DEFAULT 5,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Add source tracking to existing tables
ALTER TABLE blog_topics ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'manual';
ALTER TABLE blog_topics_property ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'manual';

-- Index for performance
CREATE INDEX idx_optimization_status ON blog_optimization_queue(status, priority DESC);
CREATE INDEX idx_expansion_status ON blog_expansion_queue(status, priority DESC);
```

---

## 🔄 WEEKLY WORKFLOW

### Monday 9 AM: GSC Analysis

```python
# agents/weekly_gsc_analysis.py
analyzer = GSCSmartAnalyzer(gsc_client, deepseek_client, supabase_url, supabase_key)

# Analyze Property site (has impressions)
results = analyzer.analyze_queries('https://www.propertytaxpartners.co.uk', 'property')

print(f"Optimize: {len(results['optimize'])} pages")
print(f"Expand: {len(results['expand'])} pages")
print(f"Create: {len(results['create'])} new topics")
print(f"Ignore: {len(results['ignore'])} queries")

# Execute actions
executor = GSCActionExecutor(supabase_url, supabase_key)
executor.execute_optimize_actions(results['optimize'], 'property')
executor.execute_expand_actions(results['expand'], 'property')
executor.execute_create_actions(results['create'], 'property')
```

### Output Example:

```
=== GSC ANALYSIS: property ===
Fetched 156 queries from last 28 days
Filtered to 42 actionable queries (10+ impressions, position 5-30)

OPTIMIZE: 12 pages
  - section-24-tax-calculator (position 6.2, CTR 5.1%)
  - landlord-tax-deductions-uk-2026 (position 8.5, CTR 3.2%)
  ...

EXPAND: 8 pages
  - section-24-mortgage-interest-restriction + "basic rate taxpayer" section
  - incorporation-cost-calculator + "CGT implications" section
  ...

CREATE: 3 new topics
  - "Section 24 vs Incorporation: Which Saves More Tax?"
  - "Landlord Insurance Tax Deductible: Complete Guide"
  - "Property Company Dividend Tax Rates 2026"

IGNORE: 19 queries (brand searches, low volume)

[OK] Added 12 optimization tasks to queue
[OK] Added 8 expansion tasks to queue
[OK] Added 3 new topics to blog_topics_property (priority 9)
```

---

## 💰 COST ANALYSIS

### GSC Analysis (Weekly):

| Task | Model | Cost |
|------|-------|------|
| Fetch GSC data | Free (Google API) | $0.00 |
| Match to existing content | Local logic | $0.00 |
| Categorize 100 queries | DeepSeek | $0.05 |
| **Total per week** | | **$0.05** |
| **Total per month** | | **$0.20** |

### With 10 Niches:

- **$2.00/month** for GSC analysis across all niches
- Still well within $200/month budget

---

## ✅ BENEFITS OF THIS APPROACH

### 1. **No Duplicate Content**
- Checks existing content first
- Expands rather than duplicates
- Only creates when gap exists

### 2. **Optimizes Existing Assets**
- Improves pages that are "almost there"
- Better ROI than always creating new
- Compounds existing authority

### 3. **Data-Driven Decisions**
- Real user search data
- Actual performance metrics
- Not guessing what to write

### 4. **Scalable**
- Automated analysis
- Prioritized queue
- Can handle 100s of queries

---

## 🎯 SUCCESS METRICS

### Week 1:
- ✅ 10-15 optimization tasks identified
- ✅ 5-8 expansion opportunities found
- ✅ 2-3 new content gaps discovered

### Month 1:
- ✅ Optimized pages see 20-50% CTR improvement
- ✅ Expanded pages rank for 2-3 additional queries
- ✅ New content fills strategic gaps

### Month 3:
- ✅ Overall organic traffic up 30%+
- ✅ More queries ranking in top 5
- ✅ Lower cost per acquisition

---

**Last Updated:** 31 March 2026  
**Status:** Ready to implement  
**Next Action:** Set up GSC API access and test analysis on Property site
