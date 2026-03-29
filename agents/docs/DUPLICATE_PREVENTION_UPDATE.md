# Duplicate Prevention System - Enhanced

**Date:** March 28, 2026  
**Update:** Added proactive duplicate filtering to Content Research Agent

---

## Problem

Previously, the system only checked for duplicates **after** selecting a topic for generation. This meant:

1. Research agent could add duplicate topics to the queue
2. Blog generation agent would select them
3. Duplicate check would fail
4. Topic marked as used but no content generated
5. **Result:** Wasted topic slots, no useful output

---

## Solution Implemented

### Option 1: Duplicate Check in Research Agent ✅

**What it does:**
- Checks each topic for duplicates **before** inserting into `blog_topics` table
- Uses semantic similarity (same 80% threshold as blog generation)
- Filters out duplicates proactively

**How it works:**

```python
# In content_research_agent.py _insert_topics()
for topic in topics:
    # Check if duplicate
    is_duplicate, similar_slug = await self.dedup_checker.check_duplicate_topic(
        topic["topic"],
        self.niche
    )
    
    if is_duplicate:
        print(f"Skipping duplicate: '{topic['topic']}' (similar to: {similar_slug})")
        duplicate_count += 1
        continue
    
    # Only insert if unique
    await self.supabase.insert(...)
```

**Benefits:**
- Only unique topics enter the queue
- No wasted generation attempts
- Cleaner topic inventory
- Better visibility (shows which topics were filtered)

**Cost impact:**
- +$0.005 per topic checked
- 5 topics = +$0.025 per research run
- Updated `topic_research` cost: $0.01 → $0.035

### Option 3: Smarter Prompting ✅

**What it does:**
- Fetches 20 most recent topics from database
- Includes them in Claude prompt with "AVOID these topics"
- Instructs Claude to generate different topics

**How it works:**

```python
# In content_research_agent.py _research_topics_with_claude()
# Get recent topics
recent_topics = await self.supabase.select(
    self.niche_config["blog_topics_table"],
    order="created_at.desc",
    limit=20
)

# Add to prompt
prompt = f"""Generate 5 high-value blog topic ideas for {audience}.

AVOID these recently covered topics:
- {topic 1}
- {topic 2}
- {topic 3}
...

Requirements:
- Topics MUST be DIFFERENT from any listed above
- Focus on unique angles, specific scenarios, or emerging issues
..."""
```

**Benefits:**
- Proactively reduces duplicate generation
- No extra API cost (same prompt size)
- Better topic diversity
- Claude sees what's already covered

---

## Combined Effect

**Before:**
1. Research agent generates 5 topics
2. 3 might be duplicates
3. Blog agent tries all 5
4. 3 fail duplicate check
5. **Result:** 2 useful topics, 3 wasted slots

**After:**
1. Research agent fetches recent 20 topics
2. Claude generates 5 topics avoiding those 20
3. Each topic checked for semantic similarity
4. Only unique topics inserted
5. **Result:** 3-5 useful topics, 0-2 filtered duplicates

**Expected duplicate rate:**
- Before: ~60% duplicates
- After: ~10-20% duplicates

---

## Cost Analysis

### Per Research Run

**Before:**
- Topic generation: $0.01
- **Total: $0.01**

**After:**
- Topic generation: $0.01
- Duplicate checks (5 topics × $0.005): $0.025
- **Total: $0.035**

**Increase:** +$0.025 per run (+250%)

### Monthly Impact

**Frequency:** 1 research run per day (if < 10 topics)

**Before:**
- 30 runs × $0.01 = $0.30/month

**After:**
- 30 runs × $0.035 = $1.05/month

**Increase:** +$0.75/month

### Value Analysis

**Cost:** +$0.75/month  
**Benefit:** Prevents ~15 wasted blog generation attempts/month  
**Savings:** 15 × $0.03 = $0.45/month in wasted generation  
**Net cost:** +$0.30/month  
**Non-monetary benefit:** Cleaner topic queue, better content diversity

**Verdict:** Worth it for improved system efficiency and content quality

---

## Updated Metrics

### Execution Metrics

Research agent now tracks:

```json
{
  "topics_generated": 5,        // Total topics from Claude
  "topics_inserted": 3,          // Unique topics added
  "duplicates_filtered": 2,      // Duplicates caught
  "unused_before": 8,
  "unused_after": 11
}
```

### Console Output

```
=== Content Research Agent: Dentists ===
Current unused topics: 8
Researching trending topics...
Filtering and inserting 5 topics...
   ✅ Added: 'Dental practice exit planning checklist 2026'
   ⏭️  Skipping duplicate: 'Associate dentist tax guide' (similar to: associate-dentist-tax-self-assessment-uk)
   ✅ Added: 'NHS pension annual allowance calculator'
   ✅ Added: 'Dental practice goodwill valuation methods'
   ⏭️  Skipping duplicate: 'Practice finance strategies' (similar to: dental-practice-profit-extraction-strategies)
✅ Successfully researched and added 3 topics (2 duplicates filtered)
```

---

## Configuration

### Similarity Threshold

Controlled in `agents/config/cost_limits.py`:

```python
QUALITY_THRESHOLDS = {
    "duplicate_similarity_threshold": 0.80,  # 80% = duplicate
}
```

**Adjust if needed:**
- Lower (0.70): Stricter, catches more duplicates
- Higher (0.90): Looser, allows more similar topics

### Recent Topics Lookback

Currently: 20 most recent topics

**Adjust in `content_research_agent.py`:**

```python
recent_topics = await self.supabase.select(
    self.niche_config["blog_topics_table"],
    order="created_at.desc",
    limit=20  # Change this number
)
```

**Recommendations:**
- 10-20: Good balance
- 30+: Better coverage but longer prompt
- 5-10: Less coverage but faster

---

## Testing

### Test Duplicate Detection

```bash
# Add some topics manually to Supabase
# Then run research agent
python agents/content_research_agent.py --niche Dentists

# Expected output:
# - Shows recent topics being avoided
# - Shows duplicate filtering in action
# - Metrics show duplicates_filtered count
```

### Verify in Database

```sql
-- Check recent research executions
SELECT 
  started_at,
  metrics->>'topics_generated' as generated,
  metrics->>'topics_inserted' as inserted,
  metrics->>'duplicates_filtered' as duplicates
FROM agent_executions
WHERE agent_type = 'content_research'
ORDER BY started_at DESC
LIMIT 10;
```

---

## Monitoring

### Key Metrics to Watch

1. **Duplicate filter rate:**
   - Target: 10-20%
   - If > 50%: Topics too similar, need more diversity
   - If < 5%: System working well

2. **Topics inserted per run:**
   - Target: 3-5 unique topics
   - If < 2: Increase generation count or adjust threshold
   - If = 5: Perfect, no duplicates

3. **Cost per research run:**
   - Expected: $0.035
   - Monitor in `agent_costs` table

### Dashboard View

```bash
python agents/monitoring_dashboard.py status
```

Shows:
- Recent research executions
- Duplicate filter rates
- Cost trends

---

## Future Enhancements

### If Duplicate Rate Stays High (>40%)

**Option A: Generate More Topics**
```python
# In _research_topics_with_claude()
prompt = f"""Generate 10 high-value blog topic ideas..."""
# Then filter to ~5 unique
```

**Option B: Use External Sources**
- Google Trends API
- Reddit API
- SERP analysis
- News feeds

**Option C: Adjust Similarity Threshold**
```python
# In cost_limits.py
"duplicate_similarity_threshold": 0.70,  # Stricter
```

### If Cost Becomes Issue

**Option A: Batch Duplicate Checks**
- Check all 5 topics in single Claude call
- Reduce from 5 calls to 1 call
- Cost: $0.01 instead of $0.025

**Option B: Cache Similarity Scores**
- Store topic embeddings
- Use vector similarity (free)
- Only use Claude for borderline cases

---

## Rollback Instructions

If issues arise, revert changes:

```bash
# Restore original content_research_agent.py
git checkout HEAD~1 agents/content_research_agent.py

# Restore original cost_limits.py
git checkout HEAD~1 agents/config/cost_limits.py
```

Or manually:
1. Remove `DeduplicationChecker` import
2. Remove duplicate check in `_insert_topics()`
3. Remove recent topics fetch in `_research_topics_with_claude()`
4. Change `topic_research` cost back to $0.01

---

## Summary

**Changes made:**
1. ✅ Added duplicate check before inserting topics
2. ✅ Added recent topics to prompt (avoid duplicates)
3. ✅ Updated cost tracking (+$0.025 per run)
4. ✅ Enhanced metrics and logging

**Expected results:**
- 80-90% reduction in duplicate topics entering queue
- Cleaner topic inventory
- Better content diversity
- +$0.30/month cost increase
- More efficient system overall

**Status:** Ready for testing and deployment
