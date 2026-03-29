# End-to-End Test Plan - AI Agent System

**Date:** March 28, 2026  
**Site Status:** ✅ Dentists site is LIVE at https://dentalfinancepartners.co.uk  
**Agent System Status:** ⏳ Ready to test

---

## Current Status

### What's Already Working

✅ **Dentists Website:**
- Live at: https://dentalfinancepartners.co.uk
- 45 blog posts published
- Forms connected to Supabase
- GA4 tracking active (G-273RJY0LZQ)

✅ **Existing Blog Generation:**
- `Dentists/generate_blog_supabase.py` - Working
- `Dentists/config_supabase.py` - Configured
- Supabase `blog_topics` table - Has topics

✅ **New Agent System:**
- All agents implemented
- Risk management system complete
- GitHub Actions workflows created
- Documentation complete

### What Needs Testing

⏳ **Database Migration** - Need to run SQL migration  
⏳ **Agent Execution** - Need to test agents locally  
⏳ **GitHub Actions** - Need to enable and test workflows  
⏳ **End-to-End Flow** - Full pipeline test

---

## Test Plan Overview

### Phase 1: Database Setup (5 minutes)
1. Run Supabase migration
2. Verify tables created
3. Check existing data

### Phase 2: Local Agent Testing (15 minutes)
1. Test content research agent
2. Test blog generation agent
3. Test risk manager agent
4. Test monitoring dashboard

### Phase 3: GitHub Actions Setup (10 minutes)
1. Configure secrets
2. Enable workflows
3. Manual trigger test

### Phase 4: End-to-End Verification (20 minutes)
1. Full content pipeline
2. Deployment verification
3. Website check
4. Database verification

**Total Time:** ~50 minutes

---

## Phase 1: Database Setup

### Step 1.1: Run Migration

```bash
# Open Supabase SQL Editor
# URL: https://supabase.com/dashboard/project/YOUR_PROJECT_ID/sql

# Copy and paste entire contents of:
# supabase/migrations/001_add_agent_tables.sql

# Click "Run"
```

**Expected Output:**
```
Success. No rows returned
```

### Step 1.2: Verify Tables Created

```sql
-- Run this query in Supabase
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE 'agent_%'
ORDER BY table_name;
```

**Expected Result:**
- `agent_costs`
- `agent_executions`

Also check:
- `published_content`
- `niche_metrics`
- `seo_rankings`

### Step 1.3: Check Existing Data

```sql
-- Check blog topics
SELECT COUNT(*) as total_topics, 
       SUM(CASE WHEN used THEN 1 ELSE 0 END) as used_topics,
       SUM(CASE WHEN NOT used THEN 1 ELSE 0 END) as unused_topics
FROM blog_topics;

-- Check if Property table exists
SELECT COUNT(*) FROM blog_topics_property;
```

**Expected:**
- Dentists: Some topics (used and unused)
- Property: May not exist yet (create if needed)

---

## Phase 2: Local Agent Testing

### Step 2.1: Setup Environment

```bash
# Navigate to agents folder
cd agents

# Install dependencies
pip install -r requirements.txt

# Create .env file (if not exists)
# Copy from .env.example and fill in values
```

**Required environment variables:**
```
ANTHROPIC_API_KEY=sk-ant-...
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_KEY=eyJhbGci...
```

### Step 2.2: Test Setup Script

```bash
python setup/test_setup.py
```

**Expected Output:**
```
================================================================================
AGENT SYSTEM SETUP TEST
================================================================================

1. Checking environment variables...
   ✅ ANTHROPIC_API_KEY
   ✅ SUPABASE_URL
   ✅ SUPABASE_KEY
   ⚠️  GA4_PROPERTY_ID - Not set (optional)
   ⚠️  GA4_CREDENTIALS - Not set (optional)
   ...

2. Testing Supabase connection...
   ✅ Connected to Supabase
   ✅ blog_topics table accessible
   ✅ agent_executions table exists

3. Testing Anthropic API...
   ✅ Anthropic API working

4. Checking file structure...
   ✅ agents/coordinator.py
   ✅ agents/blog_generation_agent.py
   ...

5. Checking niche configuration...
   ✅ Dentists: blog_topics
   ✅ Property: blog_topics_property

================================================================================
✅ ALL TESTS PASSED
================================================================================
```

### Step 2.3: Test Content Research Agent

```bash
python content_research_agent.py --niche Dentists
```

**Expected Output:**
```
=== Content Research Agent: Dentists ===
Current unused topics: 12
Sufficient topics available. Skipping research.
✅ Successfully researched and added 0 topics
```

**Or if < 10 topics:**
```
=== Content Research Agent: Dentists ===
Current unused topics: 8
Researching trending topics...
Filtering and inserting 5 topics...
   ✅ Added: 'Dental practice exit planning checklist 2026'
   ⏭️  Skipping duplicate: 'Associate dentist tax guide' (similar to: ...)
   ✅ Added: 'NHS pension annual allowance calculator'
   ✅ Added: 'Dental practice goodwill valuation methods'
   ⏭️  Skipping duplicate: 'Practice finance strategies' (similar to: ...)
✅ Successfully researched and added 3 topics (2 duplicates filtered)
```

**Verify in Supabase:**
```sql
SELECT topic, priority, used, created_at 
FROM blog_topics 
WHERE used = FALSE 
ORDER BY created_at DESC 
LIMIT 5;
```

### Step 2.4: Test Blog Generation Agent (DRY RUN)

**Important:** This will generate a real blog post!

```bash
python blog_generation_agent.py --niche Dentists --max-posts 1
```

**Expected Output:**
```
=== Blog Generation Agent: Dentists ===
Checking rate limit...
Getting next unused topic...
Processing topic: 'Dental practice exit planning checklist 2026'
Checking budget...
Running pre-generation checks...
   Semantic similarity check...
   Recent use check...
Calling generate_blog_supabase.py...
[Output from existing script...]
Generated: dental-practice-exit-planning-checklist-2026
Running post-generation quality checks...
   ✅ Word count: 2,150 words
   ✅ HTML structure: Valid
   ✅ FAQ count: 6 questions
   ✅ Internal links: 3 links
   ✅ Keyword density: 2.1%
   ✅ Front matter: Valid
Quality check passed
Registering content...
Logging cost...
✅ Successfully generated and validated: dental-practice-exit-planning-checklist-2026
```

**Verify:**
1. Check file created: `Dentists/web/content/blog/dental-practice-exit-planning-checklist-2026.md`
2. Check Supabase `agent_executions` table
3. Check Supabase `agent_costs` table
4. Check Supabase `published_content` table

### Step 2.5: Test Risk Manager Agent

```bash
python risk_manager_agent.py
```

**Expected Output:**
```
================================================================================
RISK MANAGER AGENT - System Health Check
Time: 2026-03-28 14:30:00
================================================================================

1. Checking budget status...
   Monthly: $0.03 / $200.00 (0%)
   Daily: $0.03 / $10.00 (0%)
   ✅ Budget healthy

2. Checking topic inventory...
   Dentists: 11 topics (healthy)
   Property: 0 topics (critical)
   ⚠️  Property needs topics

3. Checking for anomalies...
   ✅ No anomalies detected

4. Checking system heartbeat...
   Status: healthy
   Last execution: 0.5 hours ago
   ✅ Heartbeat healthy

5. Checking deployment health...
   Success rate: 100% (1/1)
   ✅ Deployment health good

6. Checking database health...
   Latency: 125ms
   ✅ Database healthy

================================================================================
⚠️  1 risk(s) detected - see alerts
================================================================================
```

### Step 2.6: Test Monitoring Dashboard

```bash
python monitoring_dashboard.py status
```

**Expected Output:**
```
================================================================================
AGENT MONITORING DASHBOARD
Generated: 2026-03-28 14:35:00
================================================================================

💰 BUDGET STATUS
--------------------------------------------------------------------------------
Monthly: $0.03 / $200.00 (0%)
Daily:   $0.03 / $10.00 (0%)
Remaining: $199.97

🤖 RECENT EXECUTIONS (Last 24h)
--------------------------------------------------------------------------------
✅ blog_generation    | Dentists   | completed            | 2026-03-28 14:30
✅ content_research   | Dentists   | skipped_sufficient   | 2026-03-28 14:25
✅ risk_manager       | system     | completed            | 2026-03-28 14:35

📝 CONTENT GENERATION
--------------------------------------------------------------------------------
Dentists   | Published:  46 | Unused topics:  11
Property   | Published:   0 | Unused topics:   0

✨ QUALITY METRICS (Last 7 days)
--------------------------------------------------------------------------------
Total attempts:    1
Successful:        1 (100%)
Quality failures:  0
Duplicates caught: 0

🏥 SYSTEM HEALTH
--------------------------------------------------------------------------------
✅ No failures in last 24h
✅ Budget healthy: 0% used

================================================================================
```

---

## Phase 3: GitHub Actions Setup

### Step 3.1: Add GitHub Secrets

Go to: https://github.com/[your-repo]/settings/secrets/actions

Add these secrets:

```
ANTHROPIC_API_KEY=sk-ant-...
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_KEY=eyJhbGci...
VERCEL_TOKEN=[from Vercel]
VERCEL_ORG_ID=[from Vercel]
VERCEL_PROJECT_ID=[from Vercel - Dentists project]
GA4_PROPERTY_ID=G-273RJY0LZQ
GA4_CREDENTIALS=[service account JSON] (optional for now)
SLACK_WEBHOOK=[optional]
DISCORD_WEBHOOK=[optional]
```

### Step 3.2: Enable GitHub Actions

1. Go to: https://github.com/[your-repo]/actions
2. Click "I understand my workflows, go ahead and enable them"
3. Verify workflows appear:
   - Daily Content Pipeline
   - Daily Analytics Optimization
   - Weekly Cleanup
   - Weekly Performance Report
   - Risk Manager

### Step 3.3: Manual Workflow Trigger

1. Go to Actions > Daily Content Pipeline
2. Click "Run workflow"
3. Select branch: `main`
4. Click "Run workflow"

**Monitor the run:**
- Should take 5-10 minutes
- Watch for errors in logs
- Check each step completes

**Expected Steps:**
1. ✅ Checkout code
2. ✅ Set up Python
3. ✅ Install dependencies
4. ✅ Run Content Research Agent
5. ✅ Generate blog for Dentists
6. ✅ Commit generated content
7. ✅ Deploy to Vercel

---

## Phase 4: End-to-End Verification

### Step 4.1: Check Generated Content

```bash
# Check if new file was created
ls Dentists/web/content/blog/*.md | Sort-Object -Descending | Select-Object -First 1

# Read the file
cat [filename].md | Select-Object -First 30
```

**Verify:**
- ✅ File exists
- ✅ Front matter is valid
- ✅ Content is well-formatted
- ✅ FAQs are present
- ✅ Internal links exist

### Step 4.2: Check Git Commit

```bash
git log --oneline -1
```

**Expected:**
```
abc1234 Add new blog post for Dentists
```

### Step 4.3: Check Vercel Deployment

1. Go to: https://vercel.com/dashboard
2. Find Dentists project
3. Check latest deployment
4. Verify status: "Ready"
5. Click "Visit" to see live site

### Step 4.4: Verify on Live Website

```bash
# Get the slug from the filename
$slug = "dental-practice-exit-planning-checklist-2026"

# Visit the URL
Start-Process "https://dentalfinancepartners.co.uk/blog/$slug"
```

**Checklist:**
- [ ] Page loads (HTTP 200)
- [ ] Content displays correctly
- [ ] FAQs render as styled cards
- [ ] Breadcrumbs work
- [ ] Internal links work
- [ ] Mobile responsive
- [ ] No console errors

### Step 4.5: Check Database Records

```sql
-- Check agent execution
SELECT * FROM agent_executions 
ORDER BY started_at DESC 
LIMIT 5;

-- Check costs
SELECT * FROM agent_costs 
ORDER BY timestamp DESC 
LIMIT 5;

-- Check published content
SELECT * FROM published_content 
ORDER BY published_at DESC 
LIMIT 5;

-- Verify topic marked as used
SELECT * FROM blog_topics 
WHERE used = TRUE 
ORDER BY generated_at DESC 
LIMIT 1;
```

### Step 4.6: Test Risk Manager

Wait 6 hours or manually trigger:

```bash
# Go to Actions > Risk Manager
# Click "Run workflow"
```

**Verify:**
- ✅ Health check completes
- ✅ No critical risks detected
- ✅ Budget status correct
- ✅ Topic inventory accurate

---

## Success Criteria

### ✅ Phase 1: Database
- [ ] All agent tables created
- [ ] Views and functions working
- [ ] Existing data intact

### ✅ Phase 2: Local Testing
- [ ] All agents run successfully
- [ ] Quality checks pass
- [ ] Deduplication works
- [ ] Cost tracking works
- [ ] Risk manager detects issues

### ✅ Phase 3: GitHub Actions
- [ ] Secrets configured
- [ ] Workflows enabled
- [ ] Manual trigger succeeds
- [ ] Deployment completes

### ✅ Phase 4: End-to-End
- [ ] New blog post generated
- [ ] Quality validated
- [ ] Git committed
- [ ] Vercel deployed
- [ ] Live on website
- [ ] Database updated

---

## Troubleshooting

### Database Migration Fails

**Error:** Table already exists

**Fix:**
```sql
-- Drop existing tables if needed
DROP TABLE IF EXISTS agent_executions CASCADE;
DROP TABLE IF EXISTS agent_costs CASCADE;
-- Then re-run migration
```

### Agent Test Fails

**Error:** Module not found

**Fix:**
```bash
# Ensure you're in agents folder
cd agents

# Reinstall dependencies
pip install -r requirements.txt

# Check Python path
python -c "import sys; print(sys.path)"
```

### GitHub Actions Fails

**Error:** Secrets not found

**Fix:**
1. Verify secrets are added in repository settings
2. Check secret names match exactly (case-sensitive)
3. Re-add any missing secrets

### Deployment Verification Fails

**Error:** Page not found (404)

**Fix:**
1. Wait 2-3 minutes for Vercel propagation
2. Check Vercel deployment logs
3. Verify slug matches filename
4. Clear browser cache

---

## Quick Test Script

Run this to test everything at once:

```bash
# Quick test script
cd c:\Users\user\Documents\Accounting

# Test 1: Setup
Write-Host "Testing setup..." -ForegroundColor Yellow
python agents/setup/test_setup.py

# Test 2: Risk Manager
Write-Host "`nTesting risk manager..." -ForegroundColor Yellow
python agents/risk_manager_agent.py

# Test 3: Monitoring Dashboard
Write-Host "`nTesting monitoring dashboard..." -ForegroundColor Yellow
python agents/monitoring_dashboard.py status

Write-Host "`n✅ All tests complete!" -ForegroundColor Green
```

---

## Next Steps After Testing

1. **If all tests pass:**
   - Enable GitHub Actions schedules
   - Monitor first automated run (tomorrow 6 AM UTC)
   - Check weekly for issues

2. **If tests fail:**
   - Review error logs
   - Check troubleshooting section
   - Fix issues and re-test

3. **Ongoing monitoring:**
   - Check dashboard weekly: `python agents/monitoring_dashboard.py status`
   - Review risk manager reports
   - Monitor Supabase tables
   - Check website for new content

---

**Ready to start testing? Begin with Phase 1: Database Setup!**
