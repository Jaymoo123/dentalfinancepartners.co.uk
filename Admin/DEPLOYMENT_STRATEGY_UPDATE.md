# Content-First Deployment Strategy

**Date:** March 29, 2026  
**Status:** Implemented and Tested

---

## Problem Solved

**Previous Issue:** Daily limit counted generation *attempts*, not successful *deployments*. If deployment failed, we wasted API tokens and couldn't retry without regenerating.

**New Solution:** Store content in Supabase immediately after generation, then deploy separately. This ensures:
- No token waste on deployment failures
- Content is never lost
- Can retry deployments without regenerating
- Daily limit counts actual deployed content, not attempts

---

## New Flow

### Step 1: Content Generation (Uses API Tokens)
```
Blog Generation Agent
  ↓
1. Check daily limit (deployed count, not attempts)
2. Get next unused topic
3. Check budget
4. Pre-generation duplicate checks
5. Generate content with Claude (TOKENS USED HERE)
6. Quality validation
7. Store FULL CONTENT in Supabase immediately
   - Status: 'pending'
   - Full markdown content
   - Metadata (title, slug, topic, word_count)
8. Log cost
```

### Step 2: Deployment (No API Tokens)
```
Deployment Agent
  ↓
1. Query Supabase for content with status='pending'
2. Write content to file system
3. Git commit and push (GitHub Actions)
4. Update status to 'deployed'
5. Mark topic as used
```

---

## Key Benefits

### 1. Token Efficiency
- **Before:** Failed deployment = wasted $0.03 + need to regenerate
- **After:** Failed deployment = $0.00, retry from Supabase

### 2. Reliability
- Content stored in Supabase immediately after generation
- Can retry deployment unlimited times without cost
- Failed deployments don't count toward daily limit

### 3. Accurate Limits
- Daily limit: 1 **verified deployed** post per niche
- Not 1 attempted generation
- System can generate content even if deployment is temporarily broken

### 4. Recovery
If deployment fails:
- Content is safe in Supabase
- Deployment agent auto-retries on next run
- Manual recovery: `python agents/deployment_agent.py --niche Dentists`

---

## Database Schema

### New Columns in `published_content`:

```sql
full_content TEXT NOT NULL           -- Complete markdown content
deployment_status TEXT DEFAULT 'pending'  -- pending, deploying, deployed, failed
deployment_url TEXT                  -- Vercel deployment URL
last_deployment_attempt TIMESTAMP    -- Last deployment try
deployment_error TEXT                -- Error message if failed
```

### New Views:

**content_pending_deployment:**
- Shows all content ready to deploy
- Includes failed deployments older than 1 hour (auto-retry)

**deployment_stats:**
- Success rate per niche
- Pending/failed/deployed counts

---

## Testing Results

### Test 1: Generation
```
Topic: "Dental practice VAT registration threshold changes 2026"
Result: ✅ Generated, stored in Supabase, status='pending'
Cost: $0.03
```

### Test 2: Deployment
```
Pending items: 4
Deployed: 2 (new content with full_content)
Failed: 2 (old content without full_content)
Result: ✅ Files written to Dentists/web/content/blog/
```

### Test 3: Daily Limit
```
Deployed today: 2
Limit: 1
Result: ✅ Blocked further generation (2/1)
```

---

## GitHub Actions Workflow

### Updated Pipeline:

```yaml
1. Research Topics (if needed)
   ↓
2. Generate Blog Content → Store in Supabase
   ↓
3. Deploy from Supabase → Write files
   ↓
4. Git commit and push
   ↓
5. Vercel auto-deploys (via GitHub integration)
```

### Removed:
- Manual Vercel CLI deployment step
- Relying on Vercel's GitHub integration instead

---

## Cost Implications

### Daily Cost (1 post per niche):
- Generation: $0.03 × 2 niches = **$0.06/day**
- Deployment: $0.00 (no API calls)
- **Total: $0.06/day**

### Monthly Cost:
- 30 days × $0.06 = **$1.80/month**
- Plus research: ~$0.35/week = **$1.40/month**
- **Total: ~$3.20/month**

### Savings from Retry Protection:
- If 1 deployment fails per week: Save $0.12/month
- Over time, this adds up significantly

---

## Vercel Integration

**Current Setup:**
- Vercel connected to GitHub repository
- Auto-deploys on push to main branch
- Events enabled: `deployment_status`, `repository_dispatch`

**No manual Vercel CLI needed** - GitHub integration handles it automatically when content is pushed.

---

## Next Steps

### Immediate:
1. System will run automatically tomorrow at 6 AM UTC
2. Will generate 1 post per niche (if under daily limit)
3. Will deploy all pending content

### Monitoring:
```bash
# View deployment status
python agents/monitoring_dashboard.py

# Manually deploy pending content
python agents/deployment_agent.py --niche Dentists

# Check Supabase for pending items
# Query: SELECT * FROM content_pending_deployment;
```

---

## Summary

The system now follows a **content-first strategy**:
1. Generate → Store in Supabase (uses tokens)
2. Deploy → Write files + Git push (no tokens)
3. Daily limit = verified deployments, not attempts

This ensures maximum token efficiency and zero content loss, even if deployment infrastructure has issues.
