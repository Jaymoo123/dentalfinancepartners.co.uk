# GSC Smart Content Optimizer - Quick Start Guide

**Get up and running in 10 minutes**

## Prerequisites

- Python 3.11+
- Google Search Console access (verified property owner)
- Supabase account
- Claude API key (Anthropic)
- DeepSeek API key (OpenAI-compatible)

## Step 1: Database Setup (2 minutes)

1. Open Supabase SQL Editor
2. Run migration file:

```sql
-- Copy and paste contents of:
-- supabase/migrations/20260331134247_create_gsc_optimization_tables.sql
```

3. Verify tables created:

```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('gsc_page_performance', 'blog_optimizations', 'gsc_indexing_issues');
```

## Step 2: Environment Setup (2 minutes)

Create `.env` file in project root:

```bash
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key

# AI APIs
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...  # For DeepSeek

# Optional (if not using OAuth)
GOOGLE_APPLICATION_CREDENTIALS=secrets/gsc_service_account.json
```

## Step 3: GSC Authentication (3 minutes)

### Option A: OAuth (Recommended)

1. Download OAuth credentials from Google Cloud Console
2. Save as `secrets/gsc_credentials.json`
3. Run authentication:

```bash
python agents/utils/gsc_client_oauth.py
```

4. Follow browser flow to authorize
5. Token saved to `secrets/gsc_token.pickle`

### Option B: Service Account

1. Create service account in Google Cloud Console
2. Download JSON key to `secrets/gsc_service_account.json`
3. Add service account email to GSC property (Owner role)

## Step 4: Test Connection (1 minute)

```bash
python agents/utils/gsc_fetcher.py property
```

**Expected output**:
```
[GSC FETCHER] PROPERTY
Site: sc-domain:propertytaxpartners.co.uk
Fetching last 28 days...
[OK] Fetched 45 data points from GSC
[OK] Inserted 45 new records into Supabase
```

## Step 5: First Analysis (2 minutes)

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
  Position stuck at 23.2 for 4 weeks with 71 impressions. Add comprehensive examples section.

[5/5] Generating summary report...

OPPORTUNITY SUMMARY - PROPERTY

High Priority (1):
  - section-24 (Priority 75)
    Add comprehensive examples section with real-world scenarios

[COMPLETE] Found 1 opportunities
```

## Step 6: Review & Approve (Interactive)

```bash
python agents/review_gsc_opportunities.py property
```

**Interactive prompts**:
```
[1] Priority 75/100 - Section Expansion
    Slug: section-24
    Performance: 71 impressions, 0 clicks, Pos 23.2
    Trend: Flat

    Recommended Action:
      Add comprehensive examples section with real-world scenarios

    DeepSeek Reasoning:
      Position stuck at page 3 for 4 weeks despite consistent impressions.
      Zero clicks suggest content doesn't match search intent.
      Need practical examples to improve engagement.

    Suggested Sections (2):
      1. Real-World Section 24 Examples
         Case studies showing impact on different property types...
      2. Section 24 Tax Calculation Tools
         Step-by-step calculator and examples...

    [A]pprove  [R]eject  [S]kip  [V]iew full  [Q]uit
    Your choice: a

    [APPROVE] Capturing baseline and preparing for implementation...
    [OK] Approved! Baseline captured.
    [NEXT] Run: python agents/utils/content_expander.py property <optimization_id>
           to implement the optimization
```

## Step 7: Implement Optimization

```bash
python agents/utils/content_expander.py property <optimization_id>
```

**Expected output**:
```
[EXPANDER] Processing optimization abc123...
[OK] Found blog file: Property/web/src/content/blog/section-24.md
[BACKUP] Created at a1b2c3d4 (tag: optimization-abc123-backup)
[CLAUDE] Generating section expansion...
[OK] Generated 2847 characters of new content
[COMMIT] Created at e5f6g7h8 (tag: optimization-abc123)
[OK] Optimization implemented successfully
  Backup: a1b2c3d4
  Commit: e5f6g7h8
```

## Step 8: Wait & Track (Automatic)

System automatically tracks impact after 7, 14, 21, 28 days.

**Check status**:
```bash
python agents/review_gsc_opportunities.py property
```

## Step 9: Handle Results

### If Positive Impact (Week 1)

```
[OK] Week 1 shows positive impact
  Impressions: +12.3/day
  Position: +3.7 spots

Action: Continue measuring. Will auto-complete after week 4.
```

### If Negative Impact (Week 1)

```
[ALERT] Week 1 shows negative impact - ROLLBACK CANDIDATE
  Impressions: -8.2/day
  Position: -2.1 spots

Action: Review rollback candidates
```

```bash
python agents/review_gsc_opportunities.py --rollbacks
```

## Daily Routine

### Automated (GitHub Actions)

```bash
# Runs daily at 9 AM UTC
python agents/run_gsc_optimization_cycle.py
```

### Manual (5 minutes/day)

1. Check for rollback candidates:
   ```bash
   python agents/review_gsc_opportunities.py --rollbacks
   ```

2. Review new opportunities:
   ```bash
   python agents/review_gsc_opportunities.py
   ```

3. Implement approved optimizations:
   ```bash
   python agents/utils/content_expander.py <niche> <optimization_id>
   ```

## Tips

### Start Small

- Approve 1 optimization per week initially
- Learn what works for your niche
- Adjust thresholds based on results

### Be Aggressive

- Don't wait for perfect data
- Test hypotheses quickly
- Roll back failures immediately
- Build on successes

### Monitor Trends

- Check weekly performance reports
- Look for patterns in successful optimizations
- Refine DeepSeek prompts based on quality

### Use Git History

- All changes are version controlled
- View optimization history: `git log --grep="OPTIMIZATION"`
- View backups: `git tag | grep optimization`

## Troubleshooting

### "No data returned from GSC"

**Solution**: Site too new. Wait 3-7 days for initial data.

### "Optimization not found"

**Solution**: Check Supabase for optimization ID:
```sql
SELECT id, existing_slug, status FROM blog_optimizations WHERE niche = 'property';
```

### "Git backup failed"

**Solution**: Ensure git is initialized and working:
```bash
cd Property/web
git status
```

### "DeepSeek analysis failed"

**Solution**: Check API key and quota:
```bash
python agents/utils/deepseek_client.py
```

## Next Steps

1. Run daily cycle for 1 week
2. Review first results
3. Adjust thresholds if needed
4. Enable additional sites
5. Set up GitHub Actions automation

## Support

- Full documentation: `agents/GSC_OPTIMIZATION_README.md`
- Plan document: `.cursor/plans/gsc_smart_content_optimizer_*.plan.md`
- Configuration: `agents/config/gsc_config.py`
