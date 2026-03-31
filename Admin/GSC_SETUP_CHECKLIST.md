# GSC Smart Content Optimizer - Setup Checklist

**Complete these steps before first run**

## Pre-Setup Requirements

- [ ] Python 3.11+ installed
- [ ] Git installed and configured
- [ ] Google Search Console access (verified owner)
- [ ] Supabase account with project created
- [ ] Claude API key (Anthropic)
- [ ] DeepSeek API key (OpenAI-compatible)

## Step 1: Database Setup

- [ ] Open Supabase SQL Editor
- [ ] Copy contents of `supabase/migrations/20260331134247_create_gsc_optimization_tables.sql`
- [ ] Run migration in SQL Editor
- [ ] Verify tables created:
  ```sql
  SELECT table_name FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name IN ('gsc_page_performance', 'blog_optimizations', 'gsc_indexing_issues');
  ```
- [ ] Should return 3 rows

## Step 2: Environment Configuration

- [ ] Create `.env` file in project root
- [ ] Add Supabase credentials:
  ```
  SUPABASE_URL=https://your-project.supabase.co
  SUPABASE_KEY=your-anon-key
  ```
- [ ] Add AI API keys:
  ```
  ANTHROPIC_API_KEY=sk-ant-...
  OPENAI_API_KEY=sk-...
  ```
- [ ] Verify `.env` is in `.gitignore`

## Step 3: GSC OAuth Setup

- [ ] Go to Google Cloud Console
- [ ] Create OAuth 2.0 Client ID (Desktop app)
- [ ] Download credentials JSON
- [ ] Save as `secrets/gsc_credentials.json`
- [ ] Run authentication:
  ```bash
  python agents/utils/gsc_client_oauth.py
  ```
- [ ] Complete browser OAuth flow
- [ ] Verify `secrets/gsc_token.pickle` created

## Step 4: Configuration Review

- [ ] Open `agents/config/gsc_config.py`
- [ ] Verify site URLs are correct:
  - Property: `sc-domain:propertytaxpartners.co.uk`
  - Dentists: `https://www.dentalfinancepartners.co.uk/`
- [ ] Verify content directories exist:
  - `Property/web/src/content/blog`
  - `Dentists/web/src/content/blog`
- [ ] Adjust verdict thresholds if needed (based on current traffic)
- [ ] Validate config:
  ```bash
  python agents/config/gsc_config.py
  ```

## Step 5: Verify Setup

- [ ] Run verification script:
  ```bash
  python agents/verify_gsc_setup.py
  ```
- [ ] All checks should pass:
  - [OK] Files
  - [OK] Credentials
  - [OK] Configuration
  - [OK] GSC API
  - [OK] Supabase
  - [OK] Database Schema
  - [OK] AI APIs

## Step 6: Initial Data Fetch

- [ ] Fetch Property site data:
  ```bash
  python agents/utils/gsc_fetcher.py property
  ```
- [ ] Should see: "Inserted N new records into Supabase"
- [ ] Fetch Dentists site data:
  ```bash
  python agents/utils/gsc_fetcher.py dentists
  ```
- [ ] Verify data in Supabase:
  ```sql
  SELECT niche, COUNT(*) FROM gsc_page_performance GROUP BY niche;
  ```

## Step 7: First Analysis Run

- [ ] Run optimization cycle:
  ```bash
  python agents/run_gsc_optimization_cycle.py
  ```
- [ ] Should complete all 5 steps without errors
- [ ] Note number of opportunities found

## Step 8: Review Opportunities

- [ ] Run review CLI:
  ```bash
  python agents/review_gsc_opportunities.py
  ```
- [ ] Review pending opportunities
- [ ] Approve 1 opportunity for testing
- [ ] Note the optimization ID

## Step 9: Implement First Optimization

- [ ] Run content expander:
  ```bash
  python agents/utils/content_expander.py <niche> <optimization_id>
  ```
- [ ] Verify git commits created:
  ```bash
  git log --oneline -5
  ```
- [ ] Should see:
  - `[OPTIMIZATION] <id> - Section expansion`
  - `[BACKUP] Before optimization <id>`
- [ ] Verify git tags created:
  ```bash
  git tag | grep optimization
  ```

## Step 10: Verify Tracking

- [ ] Wait 7 days
- [ ] Run daily cycle:
  ```bash
  python agents/run_gsc_optimization_cycle.py
  ```
- [ ] Should automatically track week 1 impact
- [ ] Review results:
  ```bash
  python agents/review_gsc_opportunities.py
  ```
- [ ] Check "Currently Measuring" section

## Step 11: Schedule Automation (Optional)

### Option A: Windows Task Scheduler

- [ ] Open Task Scheduler
- [ ] Create new task: "GSC Optimization Cycle"
- [ ] Trigger: Daily at 9:00 AM
- [ ] Action: Run `run_gsc_cycle.bat`

### Option B: GitHub Actions

- [ ] Create `.github/workflows/gsc_optimization.yml`
- [ ] Add workflow (see README for template)
- [ ] Add secrets to GitHub:
  - `SUPABASE_URL`
  - `SUPABASE_KEY`
  - `ANTHROPIC_API_KEY`
  - `OPENAI_API_KEY`
- [ ] Test workflow manually

## Post-Setup Verification

- [ ] System runs without errors
- [ ] Opportunities are identified
- [ ] Baseline is captured on approval
- [ ] Content is generated and committed
- [ ] Performance is tracked weekly
- [ ] Verdicts are calculated correctly
- [ ] Rollback works (test on negative verdict)

## Troubleshooting

### If Step 5 Fails (Verification)

**Files check fails**:
- Re-run implementation (all files should be created)

**GSC API fails**:
- Re-run OAuth: `python agents/utils/gsc_client_oauth.py`
- Check credentials file exists
- Verify you're a verified owner in GSC

**Supabase fails**:
- Check `.env` credentials
- Test connection in browser: `https://your-project.supabase.co`

**Database Schema fails**:
- Re-run migration in Supabase SQL Editor
- Check for SQL errors in migration output

**AI APIs fail**:
- Check API keys in `.env`
- Verify keys are active (not expired)
- Test manually:
  ```bash
  python agents/utils/deepseek_client.py
  ```

### If Step 6 Fails (Data Fetch)

**"No data returned from GSC"**:
- Site too new (wait 3-7 days)
- Check site is verified in GSC web UI
- Check property type matches config

**"Permission denied"**:
- Re-run OAuth with correct scopes
- Verify you're owner (not just user) in GSC

### If Step 9 Fails (Implementation)

**"Blog file not found"**:
- Check content directory path in config
- Verify slug matches filename
- Check file exists: `dir Property\web\src\content\blog`

**"Git backup failed"**:
- Check git is initialized: `git status`
- Check you're in correct directory
- Verify no uncommitted changes

## Daily Routine (After Setup)

### Morning (5 minutes)

1. Run cycle (or let automation run it):
   ```bash
   run_gsc_cycle.bat
   ```

2. Check for rollback candidates:
   ```bash
   review_gsc.bat --rollbacks
   ```

3. Review new opportunities:
   ```bash
   review_gsc.bat
   ```

### Weekly (15 minutes)

1. Review performance reports
2. Check success rate
3. Adjust thresholds if needed
4. Review indexing issues

### Monthly (30 minutes)

1. Analyze overall performance
2. Refine DeepSeek prompts
3. Update documentation
4. Plan improvements

## Success Indicators

After 1 week:
- [ ] At least 1 opportunity identified
- [ ] At least 1 optimization approved and implemented
- [ ] Week 1 tracking completed
- [ ] Verdict calculated

After 1 month:
- [ ] Multiple optimizations completed
- [ ] At least 1 positive verdict
- [ ] Rollback tested (if negative verdict)
- [ ] System running smoothly

## Support Resources

- **Quick Start**: `agents/GSC_QUICK_START.md`
- **Full README**: `agents/GSC_OPTIMIZATION_README.md`
- **Admin Docs**: `Admin/GSC_OPTIMIZATION_SYSTEM.md`
- **Configuration**: `agents/config/gsc_config.py`
- **Plan Document**: `.cursor/plans/gsc_smart_content_optimizer_*.plan.md`

## Completion Status

- [x] All components implemented
- [x] Documentation complete
- [x] Helper scripts created
- [ ] Database migration run (USER ACTION REQUIRED)
- [ ] Initial data fetched (USER ACTION REQUIRED)
- [ ] First optimization tested (USER ACTION REQUIRED)

## Next Steps

1. **Run database migration** in Supabase SQL Editor
2. **Test GSC connection**: `python agents/utils/gsc_client_oauth.py`
3. **Verify setup**: `python agents/verify_gsc_setup.py`
4. **Run first cycle**: `run_gsc_cycle.bat`
5. **Review opportunities**: `review_gsc.bat`

---

**Date**: 2026-03-31  
**Version**: 1.0.0  
**Status**: Ready for deployment
