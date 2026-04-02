# GSC Smart Content Optimizer - Deployment Guide

**Production deployment checklist and procedures**

## Pre-Deployment Checklist

### Requirements Met

- [x] All code implemented (18 files)
- [x] Documentation complete (5 guides)
- [x] Helper scripts created (batch files)
- [ ] Database migration tested
- [ ] GSC OAuth configured
- [ ] Environment variables set
- [ ] Initial data fetched
- [ ] Integration test passed

### Risk Assessment

**Low Risk**:
- No changes to existing systems
- Read-only GSC access (except re-indexing)
- Git-based rollback available
- Manual approval required

**Medium Risk**:
- New database tables (migration required)
- Content file modifications (git backup)

**High Risk**:
- None

**Overall Risk**: LOW

## Deployment Steps

### Step 1: Database Migration (5 minutes)

1. **Backup existing database** (optional but recommended):
   ```sql
   -- In Supabase SQL Editor
   -- Export blog_topics_property
   COPY (SELECT * FROM blog_topics_property) TO 'blog_topics_property_backup.csv' CSV HEADER;
   
   -- Export blog_topics
   COPY (SELECT * FROM blog_topics) TO 'blog_topics_backup.csv' CSV HEADER;
   ```

2. **Run migration**:
   - Open Supabase SQL Editor
   - Copy contents of `supabase/migrations/20260331134247_create_gsc_optimization_tables.sql`
   - Paste and run
   - Wait for completion (should take 5-10 seconds)

3. **Verify migration**:
   ```sql
   -- Check tables exist
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name IN ('gsc_page_performance', 'blog_optimizations', 'gsc_indexing_issues');
   -- Should return 3 rows
   
   -- Check columns added
   SELECT column_name FROM information_schema.columns 
   WHERE table_name = 'blog_topics_property' 
   AND column_name IN ('last_optimized_at', 'optimization_count', 'gsc_tracked', 'slug');
   -- Should return 4 rows
   ```

4. **Rollback plan** (if migration fails):
   ```sql
   -- Drop new tables
   DROP TABLE IF EXISTS gsc_page_performance CASCADE;
   DROP TABLE IF EXISTS blog_optimizations CASCADE;
   DROP TABLE IF EXISTS gsc_indexing_issues CASCADE;
   
   -- Remove added columns
   ALTER TABLE blog_topics_property DROP COLUMN IF EXISTS last_optimized_at;
   ALTER TABLE blog_topics_property DROP COLUMN IF EXISTS optimization_count;
   ALTER TABLE blog_topics_property DROP COLUMN IF EXISTS gsc_tracked;
   ALTER TABLE blog_topics_property DROP COLUMN IF EXISTS slug;
   
   -- Same for blog_topics
   ```

### Step 2: Environment Configuration (3 minutes)

1. **Create `.env` file**:
   ```bash
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your-anon-key
   ANTHROPIC_API_KEY=sk-ant-...
   OPENAI_API_KEY=sk-...
   ```

2. **Verify `.env` in `.gitignore`**:
   ```bash
   cat .gitignore | grep .env
   ```

3. **Test environment loading**:
   ```bash
   python -c "from dotenv import load_dotenv; import os; load_dotenv(); print('OK' if os.getenv('SUPABASE_URL') else 'FAIL')"
   ```

### Step 3: GSC OAuth Setup (5 minutes)

1. **Download OAuth credentials**:
   - Go to Google Cloud Console
   - APIs & Services → Credentials
   - Create OAuth 2.0 Client ID (Desktop app)
   - Download JSON

2. **Save credentials**:
   ```bash
   mkdir secrets
   # Save downloaded JSON as secrets/gsc_credentials.json
   ```

3. **Run OAuth flow**:
   ```bash
   python agents/utils/gsc_client_oauth.py
   ```

4. **Verify token created**:
   ```bash
   dir secrets\gsc_token.pickle
   ```

### Step 4: Verification (2 minutes)

```bash
python agents/verify_gsc_setup.py
```

**Expected output**:
```
[OK] Files
[OK] Credentials
[OK] Configuration
[OK] GSC API
[OK] Supabase
[OK] Database Schema
[OK] AI APIs

[SUCCESS] All checks passed!
```

**If any check fails**:
- Review error message
- Fix issue
- Re-run verification

### Step 5: Initial Data Fetch (2 minutes)

```bash
# Fetch Property site data
python agents/utils/gsc_fetcher.py property

# Fetch Dentists site data
python agents/utils/gsc_fetcher.py dentists
```

**Expected output**:
```
[GSC FETCHER] PROPERTY
Site: sc-domain:propertytaxpartners.co.uk
Fetching last 28 days...
[OK] Fetched 45 data points from GSC
[OK] Inserted 45 new records into Supabase
```

**Verify in Supabase**:
```sql
SELECT niche, COUNT(*) as records, MIN(date) as earliest, MAX(date) as latest
FROM gsc_page_performance
GROUP BY niche;
```

### Step 6: Integration Test (3 minutes)

```bash
python agents/test_gsc_integration.py property
```

**Expected output**:
```
[PASS] Config
[PASS] GSC
[PASS] Fetcher
[PASS] Analyzer
[PASS] Tracker
[PASS] Database

[SUCCESS] All integration tests passed!
```

### Step 7: First Cycle (Dry Run) (5 minutes)

```bash
python agents/run_gsc_optimization_cycle.py property
```

**Expected output**:
```
[1/5] Tracking performance of existing optimizations...
[INFO] No optimizations currently being measured

[2/5] Checking indexing status...
[INFO] No issues detected

[3/5] Fetching GSC data...
[OK] Fetched 45 data points from GSC

[4/5] Analyzing optimization opportunities...
[OPPORTUNITY] section-24 - Priority 75
  Position stuck at 23.2 for 4 weeks with 71 impressions...

[5/5] Generating summary report...

[COMPLETE] Found 1 opportunities
```

### Step 8: First Review (5 minutes)

```bash
python agents/review_gsc_opportunities.py property
```

**Review carefully**:
- Does the opportunity make sense?
- Is the recommended action appropriate?
- Are the suggested sections relevant?

**For first deployment**:
- Approve 1 opportunity only
- This is a test run
- Monitor closely

### Step 9: First Implementation (5 minutes)

After approving in review CLI:

```bash
python agents/utils/content_expander.py property <optimization_id>
```

**Verify**:
1. Git commits created:
   ```bash
   git log --oneline -3
   ```

2. Git tags created:
   ```bash
   git tag | grep optimization
   ```

3. Content file updated:
   ```bash
   git diff HEAD~1 HEAD Property/web/src/content/blog/<slug>.md
   ```

4. Database updated:
   ```sql
   SELECT status, implemented_at FROM blog_optimizations WHERE id = '<optimization_id>';
   -- Should show: status = 'measuring', implemented_at = current timestamp
   ```

### Step 10: Deploy Content (5 minutes)

**If using Vercel**:
```bash
cd Property/web
git push origin main
# Vercel auto-deploys
```

**If using manual deploy**:
```bash
cd Property/web
npm run build
# Deploy build/ directory
```

### Step 11: Monitor Week 1 (7 days)

**Day 1-6**: No action required

**Day 7**: Run cycle to track week 1 impact
```bash
python agents/run_gsc_optimization_cycle.py property
```

**Check verdict**:
```bash
python agents/review_gsc_opportunities.py property
```

**If negative**:
```bash
python agents/review_gsc_opportunities.py --rollbacks
# Follow prompts to rollback
```

### Step 12: Schedule Automation (10 minutes)

#### Option A: Windows Task Scheduler

1. Open Task Scheduler
2. Create Basic Task
   - Name: "GSC Optimization Cycle"
   - Trigger: Daily at 9:00 AM
   - Action: Start a program
   - Program: `C:\Users\user\Documents\Accounting\run_gsc_cycle.bat`
3. Test: Run task manually

#### Option B: GitHub Actions

1. Rename template:
   ```bash
   mv .github/workflows/gsc_optimization.yml.template .github/workflows/gsc_optimization.yml
   ```

2. Add secrets to GitHub:
   - Settings → Secrets → Actions
   - Add: `SUPABASE_URL`, `SUPABASE_KEY`, `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`

3. Enable workflow:
   - Actions tab → Enable workflow

4. Test manually:
   - Actions tab → GSC Optimization Cycle → Run workflow

**Note**: GitHub Actions can only analyze (not implement). Manual approval still required.

## Post-Deployment Monitoring

### Day 1

- [ ] Verify cycle ran successfully
- [ ] Check for errors in logs
- [ ] Review any opportunities identified
- [ ] Monitor API usage

### Week 1

- [ ] Check week 1 verdicts
- [ ] Handle any rollbacks
- [ ] Review success rate
- [ ] Adjust thresholds if needed

### Month 1

- [ ] Analyze overall performance
- [ ] Calculate ROI (time saved)
- [ ] Refine DeepSeek prompts
- [ ] Document learnings

## Rollback Procedures

### Rollback Single Optimization

**Via CLI**:
```bash
python agents/review_gsc_opportunities.py --rollbacks
# Follow prompts
```

**Via Code**:
```python
from agents.utils.content_expander import ContentExpander

expander = ContentExpander('property')
expander.rollback_optimization('<optimization_id>', reason="Negative impact")
```

**Manual**:
```bash
# Find backup commit
git log --grep="BACKUP" --grep="<optimization_id>"

# Restore file
git checkout <backup_commit> -- Property/web/src/content/blog/<slug>.md

# Commit
git commit -m "[ROLLBACK] Manual restore"

# Update database
# Set rolled_back=true, status='completed' in blog_optimizations
```

### Rollback Entire System

**If system causes issues**:

1. **Stop automation**:
   - Disable Task Scheduler task
   - Disable GitHub Actions workflow

2. **Rollback all optimizations**:
   ```bash
   # Find all optimization commits
   git log --grep="OPTIMIZATION" --oneline
   
   # Revert each (newest first)
   git revert <commit_hash>
   ```

3. **Rollback database** (optional):
   ```sql
   -- Mark all as rolled back
   UPDATE blog_optimizations SET rolled_back = true, status = 'completed';
   
   -- Or drop tables entirely
   DROP TABLE gsc_page_performance CASCADE;
   DROP TABLE blog_optimizations CASCADE;
   DROP TABLE gsc_indexing_issues CASCADE;
   ```

4. **Restore content** (if needed):
   ```bash
   # Find date before first optimization
   git log --before="2026-03-31" --oneline
   
   # Restore content directory
   git checkout <commit_before_optimizations> -- Property/web/src/content/blog
   ```

### Recovery Time

- **Single optimization rollback**: 2 minutes
- **Disable automation**: 1 minute
- **Full system rollback**: 15 minutes
- **Content restore**: 5 minutes

## Success Criteria

### Week 1 Success

- [ ] At least 1 opportunity identified
- [ ] At least 1 optimization approved
- [ ] Implementation successful (git commits created)
- [ ] Week 1 tracking completed
- [ ] Verdict calculated (positive/negative/neutral)

### Month 1 Success

- [ ] 5+ optimizations completed
- [ ] 70%+ positive verdicts
- [ ] < 20% rollback rate
- [ ] No system errors
- [ ] Time saved vs manual optimization

### Quarter 1 Success

- [ ] 20+ optimizations completed
- [ ] Average +5 impressions/day improvement
- [ ] System running autonomously
- [ ] Expanded to all sites
- [ ] ROI positive (time saved > cost)

## Troubleshooting

### Deployment Fails at Step 1 (Migration)

**Error**: "Table already exists"

**Solution**: Tables were created in a previous attempt. Verify they're correct:
```sql
SELECT column_name FROM information_schema.columns WHERE table_name = 'blog_optimizations';
```

### Deployment Fails at Step 3 (OAuth)

**Error**: "Invalid credentials"

**Solution**: 
1. Verify credentials file is valid JSON
2. Check OAuth client type is "Desktop app"
3. Re-download credentials from Google Cloud Console

### Deployment Fails at Step 5 (Data Fetch)

**Error**: "No data returned from GSC"

**Solution**:
1. Site too new (wait 3-7 days)
2. Check site is verified in GSC web UI
3. Check property type matches config

### Deployment Fails at Step 7 (First Cycle)

**Error**: "DeepSeek analysis failed"

**Solution**:
1. Check API key is valid
2. Check API quota
3. Test DeepSeek connection: `python agents/utils/deepseek_client.py`

## Monitoring Post-Deployment

### Daily Checks (Automated)

**GitHub Actions** (if enabled):
- Check workflow status
- Review logs for errors
- Check for rollback candidates (alerts)

**Local** (if using Task Scheduler):
- Check task history
- Review console output
- Check for errors

### Weekly Checks (Manual)

```sql
-- Performance summary
SELECT 
  niche,
  COUNT(*) as total,
  SUM(CASE WHEN impact_verdict = 'positive' THEN 1 ELSE 0 END) as positive,
  SUM(CASE WHEN impact_verdict = 'negative' THEN 1 ELSE 0 END) as negative,
  SUM(CASE WHEN rolled_back THEN 1 ELSE 0 END) as rolled_back
FROM blog_optimizations
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY niche;
```

### Monthly Checks (Manual)

```sql
-- Success rate
SELECT 
  niche,
  COUNT(*) as total_completed,
  ROUND(100.0 * SUM(CASE WHEN impact_verdict = 'positive' THEN 1 ELSE 0 END) / COUNT(*), 1) as success_rate,
  ROUND(100.0 * SUM(CASE WHEN rolled_back THEN 1 ELSE 0 END) / COUNT(*), 1) as rollback_rate,
  AVG(impact_impressions_week4 - baseline_impressions) as avg_impression_change
FROM blog_optimizations
WHERE status = 'completed'
AND created_at > NOW() - INTERVAL '30 days'
GROUP BY niche;
```

## Scaling Plan

### Adding New Sites

**When**: After 1 month of successful operation on Property + Dentists

**Steps**:

1. **Update configuration**:
   ```python
   # agents/config/gsc_config.py
   GSC_CONFIG["legal"] = {
       "site_url": "sc-domain:legalfinancepartners.co.uk",
       "blog_topics_table": "blog_topics_legal",
       "content_dir": "Legal/web/src/content/blog",
       "git_repo_path": "Legal/web",
       "enabled": True,
       "start_date": "2026-05-01",
       "verdict_thresholds": {...},
   }
   ```

2. **Update database constraints**:
   ```sql
   -- Add 'legal' to CHECK constraints
   ALTER TABLE gsc_page_performance DROP CONSTRAINT gsc_page_performance_niche_check;
   ALTER TABLE gsc_page_performance ADD CONSTRAINT gsc_page_performance_niche_check 
     CHECK (niche IN ('property', 'dentists', 'medical', 'legal'));
   
   -- Repeat for other tables
   ```

3. **Run first cycle**:
   ```bash
   python agents/run_gsc_optimization_cycle.py legal
   ```

### Increasing Frequency

**Current**: Daily analysis

**Future**: Multiple times per day (if traffic increases)

**Steps**:
1. Reduce cooldown period (7 days → 3 days)
2. Reduce measurement window (28 days → 14 days)
3. Increase API call frequency
4. Monitor API quota usage

### Automated Approval

**Current**: Manual approval required

**Future**: Auto-approve low-risk optimizations

**Criteria for auto-approval**:
- Priority < 50 (low priority)
- Trend: improving or flat (not declining)
- No previous rollbacks
- Sufficient data (50+ impressions)

**Implementation**:
```python
# In gsc_analyzer.py
if should_auto_approve(opportunity):
    tracker.capture_baseline(opportunity['id'])
    expander.expand_section(opportunity['id'])
```

## Maintenance Schedule

### Daily (Automated)

- Run optimization cycle
- Track performance
- Check indexing status
- Analyze opportunities

### Daily (Manual - 5 minutes)

- Review rollback candidates
- Approve/reject opportunities
- Implement approved optimizations

### Weekly (Manual - 15 minutes)

- Review performance reports
- Check success rate
- Adjust thresholds if needed
- Review indexing issues

### Monthly (Manual - 30 minutes)

- Analyze overall performance
- Calculate ROI
- Refine DeepSeek prompts
- Update documentation
- Plan improvements

### Quarterly (Manual - 2 hours)

- Deep performance analysis
- System optimization
- Feature planning
- Cost analysis
- Security review

## Support & Escalation

### Level 1: Self-Service

**Resources**:
- Quick Start: `agents/GSC_QUICK_START.md`
- README: `agents/GSC_OPTIMIZATION_README.md`
- This guide: `Admin/GSC_DEPLOYMENT_GUIDE.md`

**Common Issues**:
- Check verification script
- Review troubleshooting sections
- Check Supabase data

### Level 2: Debugging

**Tools**:
- Integration test: `python agents/test_gsc_integration.py`
- Component tests: `python agents/utils/<component>.py`
- Database queries: Check Supabase directly

**Logs**:
- Console output (captured in terminal)
- Git history (for content changes)
- Supabase logs (for database operations)

### Level 3: Code Review

**If system not working as expected**:
1. Review plan document: `.cursor/plans/gsc_smart_content_optimizer_*.plan.md`
2. Check implementation against plan
3. Review code comments
4. Test individual components

## Performance Benchmarks

### Expected Performance

**Data Fetching**:
- 28 days of data: 2-5 seconds
- 100 data points: < 1 second to store

**Analysis**:
- DeepSeek analysis: 5-10 seconds per page
- 5 pages: 30-60 seconds total

**Content Generation**:
- Claude generation: 30-60 seconds per expansion
- Git operations: < 1 second

**Full Cycle**:
- Single site: 2-3 minutes
- All sites: 5-10 minutes

### Performance Issues

**If cycle takes > 10 minutes**:
- Check API response times
- Check database query performance
- Check network connectivity

**If analysis is slow**:
- Reduce pages analyzed (increase min_impressions)
- Batch DeepSeek calls
- Use faster model

## Security Checklist

### Pre-Deployment

- [ ] All credentials in `.env` or `secrets/`
- [ ] `.env` in `.gitignore`
- [ ] `secrets/` in `.gitignore`
- [ ] No API keys in code
- [ ] No hardcoded URLs
- [ ] RLS policies enabled in Supabase

### Post-Deployment

- [ ] OAuth token working
- [ ] API keys valid
- [ ] No credentials in git history
- [ ] Supabase access restricted
- [ ] GitHub secrets configured (if using Actions)

### Ongoing

- [ ] Rotate API keys quarterly
- [ ] Review OAuth token expiry (6 months)
- [ ] Monitor API usage
- [ ] Review access logs

## Cost Monitoring

### Current Costs

**GSC API**: $0/month (free)
**DeepSeek**: $0.60/month
**Claude**: $1.60/month
**Supabase**: $0/month (free tier)
**Total**: $2.20/month

### Cost Alerts

**Set up alerts for**:
- DeepSeek usage > $5/month
- Claude usage > $10/month
- Supabase storage > 500 MB

### Cost Optimization

**If costs increase**:
1. Reduce analysis frequency
2. Increase min_impressions threshold
3. Use DeepSeek for more tasks (cheaper)
4. Batch operations

## Deployment Completion

### Final Verification

- [ ] Database migration successful
- [ ] All verification checks pass
- [ ] Integration test passes
- [ ] First cycle completes successfully
- [ ] First opportunity reviewed
- [ ] First optimization implemented
- [ ] Git commits created correctly
- [ ] Content deployed
- [ ] Automation scheduled

### Sign-Off

**Deployed by**: _________________  
**Date**: _________________  
**Version**: 1.0.0  
**Status**: Production

**Notes**:
- All tests passed
- First optimization deployed
- Monitoring in place
- Documentation complete

## Next Steps After Deployment

### Week 1

1. Monitor first optimization closely
2. Check for any errors
3. Review rollback candidates daily
4. Approve 1-2 more optimizations

### Month 1

1. Review success rate
2. Adjust thresholds based on results
3. Refine DeepSeek prompts
4. Enable additional sites

### Quarter 1

1. Analyze ROI
2. Plan Phase 2 features
3. Optimize costs
4. Scale to more sites

---

**Document version**: 1.0.0  
**Last updated**: 2026-03-31  
**Status**: Ready for production deployment
