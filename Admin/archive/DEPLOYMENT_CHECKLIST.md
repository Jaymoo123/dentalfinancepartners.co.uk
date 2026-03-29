# AI Agent System - Deployment Checklist

Use this checklist to deploy the autonomous agent system step by step.

---

## Phase 1: Database Setup

### 1.1 Run Database Migration

- [ ] Open Supabase SQL Editor:  
      https://supabase.com/dashboard/project/YOUR_PROJECT_ID/sql

- [ ] Copy entire contents of: `supabase/migrations/001_add_agent_tables.sql`

- [ ] Paste into SQL Editor and click "Run"

- [ ] Verify tables created (run this query):
      ```sql
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name LIKE 'agent_%';
      ```

- [ ] Expected tables:
  - `agent_executions`
  - `agent_costs`
  - `published_content`
  - `niche_metrics`
  - `seo_rankings`

### 1.2 Verify Existing Tables

- [ ] `blog_topics` (Dentists) exists
- [ ] `blog_topics_property` (Property) exists or needs creation
- [ ] `leads` (shared) exists or needs creation

---

## Phase 2: Local Setup

### 2.1 Install Dependencies

- [ ] Open terminal in project root
- [ ] Run: `cd agents`
- [ ] Run: `pip install -r requirements.txt`
- [ ] Verify installation: `pip list | grep anthropic`

### 2.2 Create Environment File

- [ ] Copy `.env.example` to `.env`
- [ ] Fill in all required values:
  - [ ] `ANTHROPIC_API_KEY`
  - [ ] `SUPABASE_URL`
  - [ ] `SUPABASE_KEY`
  - [ ] `VERCEL_TOKEN`
  - [ ] `GA4_PROPERTY_ID`
  - [ ] `GA4_CREDENTIALS` (optional for now)
  - [ ] `SLACK_WEBHOOK` (optional)
  - [ ] `DISCORD_WEBHOOK` (optional)

### 2.3 Test Setup

- [ ] Run: `python agents/setup/test_setup.py`
- [ ] All tests should pass (except GA4 if not configured)
- [ ] Fix any issues before proceeding

---

## Phase 3: GitHub Configuration

### 3.1 Add Repository Secrets

Go to: Repository Settings > Secrets and variables > Actions

Add these secrets:

- [ ] `ANTHROPIC_API_KEY` - Your Claude API key
- [ ] `SUPABASE_URL` - https://YOUR_PROJECT.supabase.co
- [ ] `SUPABASE_KEY` - Your Supabase service role key
- [ ] `VERCEL_TOKEN` - Generate at https://vercel.com/account/tokens
- [ ] `VERCEL_ORG_ID` - From Vercel project settings
- [ ] `VERCEL_PROJECT_ID` - From Vercel project settings (per niche)
- [ ] `GA4_PROPERTY_ID` - G-273RJY0LZQ
- [ ] `GA4_CREDENTIALS` - Service account JSON (optional for now)
- [ ] `SLACK_WEBHOOK` - Slack incoming webhook (optional)
- [ ] `DISCORD_WEBHOOK` - Discord webhook URL (optional)

### 3.2 Enable GitHub Actions

- [ ] Go to repository Actions tab
- [ ] Click "I understand my workflows, go ahead and enable them"
- [ ] Verify workflows appear:
  - Daily Content Pipeline
  - Daily Analytics Optimization
  - Weekly Cleanup
  - Weekly Performance Report

---

## Phase 4: Local Testing

### 4.1 Test Individual Agents

- [ ] Test content research:
      ```bash
      python agents/content_research_agent.py --niche Dentists
      ```
      Expected: 5 new topics added to `blog_topics` table

- [ ] Test blog generation:
      ```bash
      python agents/blog_generation_agent.py --niche Dentists --max-posts 1
      ```
      Expected: New blog post in `Dentists/web/content/blog/`

- [ ] Test coordinator:
      ```bash
      python agents/coordinator.py status
      ```
      Expected: System status displayed

### 4.2 Test Monitoring

- [ ] Run: `python agents/monitoring_dashboard.py status`
- [ ] Verify dashboard displays:
  - Budget status
  - Recent executions
  - Content stats
  - Quality metrics
  - System health

---

## Phase 5: GitHub Actions Testing

### 5.1 Manual Workflow Trigger

- [ ] Go to Actions > Daily Content Pipeline
- [ ] Click "Run workflow" > "Run workflow"
- [ ] Wait for completion (5-10 minutes)
- [ ] Check logs for errors
- [ ] Verify new blog post generated
- [ ] Verify Vercel deployment succeeded

### 5.2 Verify Automation

- [ ] Check that workflow ran successfully
- [ ] Verify new commit in repository
- [ ] Check Vercel deployment logs
- [ ] Visit website to see new blog post
- [ ] Check Supabase tables:
  - `agent_executions` has new records
  - `agent_costs` has cost entries
  - `published_content` has new entry

---

## Phase 6: Monitoring Setup

### 6.1 Configure Alerts (Optional)

If using Slack:
- [ ] Create Slack incoming webhook
- [ ] Add to GitHub secrets as `SLACK_WEBHOOK`
- [ ] Test: Run agent and verify Slack notification

If using Discord:
- [ ] Create Discord webhook
- [ ] Add to GitHub secrets as `DISCORD_WEBHOOK`
- [ ] Test: Run agent and verify Discord notification

### 6.2 Set Up Monitoring Routine

- [ ] Bookmark Supabase dashboard
- [ ] Bookmark GitHub Actions page
- [ ] Set calendar reminder: Check dashboard weekly
- [ ] Set calendar reminder: Review costs monthly

---

## Phase 7: Production Readiness

### 7.1 Verify All Systems

- [ ] Database migration complete
- [ ] GitHub secrets configured
- [ ] Local tests passing
- [ ] GitHub Actions working
- [ ] Vercel deployments successful
- [ ] Alerts configured (optional)
- [ ] Monitoring dashboard accessible

### 7.2 Initial Content

- [ ] Add 10+ topics to `blog_topics` table (Dentists)
- [ ] Add 10+ topics to `blog_topics_property` table (Property)
- [ ] Verify topics have proper format (topic, keywords, category, priority)

### 7.3 Final Checks

- [ ] Review cost limits in `agents/config/cost_limits.py`
- [ ] Review quality thresholds in `agents/config/cost_limits.py`
- [ ] Review rate limits (1 blog/niche/day)
- [ ] Confirm auto-publish is enabled
- [ ] Confirm no auto-retry on failures

---

## Phase 8: Go Live

### 8.1 Enable Scheduled Workflows

- [ ] Workflows are enabled (should auto-run on schedule)
- [ ] Next run: 6 AM UTC tomorrow
- [ ] Set reminder to check results

### 8.2 Monitor First Week

Day 1:
- [ ] Check 6 AM run completed
- [ ] Verify new blog posts generated
- [ ] Check quality metrics
- [ ] Review costs

Day 2-7:
- [ ] Daily check of monitoring dashboard
- [ ] Review any alerts
- [ ] Check cost trends
- [ ] Verify deployments

Week 1 Review:
- [ ] Total blogs generated: ___
- [ ] Quality pass rate: ___%
- [ ] Duplicates caught: ___
- [ ] Total cost: $___
- [ ] Any issues to address: ___

---

## Troubleshooting

### Database Migration Fails

**Issue:** SQL errors when running migration

**Fix:**
- Check if tables already exist
- Drop existing tables if needed: `DROP TABLE IF EXISTS agent_executions CASCADE;`
- Re-run migration

### GitHub Actions Fails

**Issue:** Workflow fails with error

**Fix:**
- Check Actions logs for specific error
- Verify all secrets are set correctly
- Test locally first: `python agents/coordinator.py status`
- Check Python version (needs 3.11+)

### Budget Exceeded Immediately

**Issue:** Operations stop due to budget

**Fix:**
- Check current spending: `python agents/monitoring_dashboard.py status`
- Adjust limits in `agents/config/cost_limits.py`
- Clear old cost records if testing

### Quality Checks Always Fail

**Issue:** All generated content fails quality checks

**Fix:**
- Review specific failures in `agent_executions` table
- Adjust prompts in `{Niche}/config_supabase.py`
- Lower thresholds temporarily in `agents/config/cost_limits.py`

### No Topics Available

**Issue:** Blog generation skips due to no topics

**Fix:**
- Run: `python agents/content_research_agent.py --niche Dentists`
- Or add topics manually to Supabase
- Check `used` column isn't all `true`

---

## Success Criteria

After 1 week, you should see:

- ✅ 7 blog posts generated (1/day per niche)
- ✅ Quality pass rate > 80%
- ✅ Zero duplicates published
- ✅ Cost < $1 for the week
- ✅ No failed deployments
- ✅ Analytics data flowing to Supabase

---

## Support Resources

- **Complete docs:** `agents/docs/README.md`
- **Quick start:** `agents/docs/QUICKSTART.md`
- **Architecture:** `agents/docs/ARCHITECTURE.md`
- **AI context:** `.cursorrules`
- **Implementation notes:** `agents/docs/IMPLEMENTATION_COMPLETE.md`

---

## Next Steps After Deployment

1. **Week 1:** Monitor daily, fix any issues
2. **Week 2:** Review metrics, adjust thresholds
3. **Week 3:** Optimize prompts based on quality
4. **Week 4:** Add GA4 service account for optimization
5. **Month 2:** Consider adding new niches

---

**Ready to deploy? Start with Phase 1!**
