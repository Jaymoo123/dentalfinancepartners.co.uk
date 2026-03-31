# GSC Smart Content Optimization System

**Automated content optimization driven by Google Search Console data**

## Overview

This system analyzes Google Search Console performance data, identifies content optimization opportunities using DeepSeek AI, and generates section expansions using Claude AI. It features aggressive weekly testing, automatic rollback for failed optimizations, and multi-site support.

## Key Features

- **Multi-Site Support**: Manage Property, Dentists, Medical, and future sites independently
- **Aggressive Testing**: 7-day measurement windows with weekly impact tracking
- **Smart Analysis**: DeepSeek analyzes trends (not snapshots) to identify real opportunities
- **Rollback Support**: Git-based version control allows instant rollback of failed optimizations
- **Indexing Monitoring**: Proactive detection of indexing/schema issues via GSC URL Inspection API
- **Safeguards**: Multiple layers prevent re-analyzing old data and compounding changes

## Architecture

```
GSC API → Data Fetcher → Supabase (gsc_page_performance)
                              ↓
                         Analyzer (DeepSeek)
                              ↓
                    blog_optimizations (pending)
                              ↓
                      Review CLI (manual)
                              ↓
                    Capture Baseline → Implement
                              ↓
                    Performance Tracker (weekly)
                              ↓
                    Verdict (positive/negative/neutral)
                              ↓
              Keep & Build On  OR  Rollback & Try Alternative
```

## Database Schema

### Tables Created

1. **gsc_page_performance**: Daily GSC metrics for all pages
2. **blog_optimizations**: Optimization lifecycle tracking
3. **gsc_indexing_issues**: Indexing/schema issues from URL Inspection API
4. **blog_topics_property** (updated): Added optimization tracking columns
5. **blog_topics** (updated): Added optimization tracking columns

### Migration

Run the migration in Supabase SQL Editor:

```sql
-- File: supabase/migrations/20260331134247_create_gsc_optimization_tables.sql
```

## Configuration

### File: `agents/config/gsc_config.py`

**Current Sites**:
- **property**: `sc-domain:propertytaxpartners.co.uk` (enabled)
- **dentists**: `https://www.dentalfinancepartners.co.uk/` (enabled)
- **medical**: `sc-domain:medicalfinancepartners.co.uk` (disabled)

**Verdict Thresholds** (using daily averages):

| Metric | Week 1 Threshold | Cumulative Threshold |
|--------|------------------|----------------------|
| Impressions/day | ±10 | ±7 |
| Position | ±3 spots | ±2 spots |
| Clicks/day | ±1 | ±0.5 |

**Adding New Sites**:

```python
GSC_CONFIG["legal"] = {
    "site_url": "sc-domain:legalfinancepartners.co.uk",
    "blog_topics_table": "blog_topics_legal",
    "content_dir": "Legal/web/src/content/blog",
    "git_repo_path": "Legal/web",
    "enabled": True,
    ...
}
```

## Components

### 1. GSC Data Fetcher (`agents/utils/gsc_fetcher.py`)

Fetches page-level performance data from GSC API and stores in Supabase.

**Usage**:
```bash
python agents/utils/gsc_fetcher.py property
```

**Features**:
- Fetches last 28 days of data
- Uses page + date dimensions (query is anonymized for low traffic)
- Prevents duplicate data insertion
- Handles API rate limits

### 2. GSC Indexing Monitor (`agents/utils/gsc_indexing_monitor.py`)

Monitors indexing status and schema detection via URL Inspection API.

**Usage**:
```bash
python agents/utils/gsc_indexing_monitor.py property https://www.propertytaxpartners.co.uk/blog/section-24
```

**Detects**:
- Not indexed pages
- Missing schema/structured data
- Canonical mismatches
- Robots.txt blocks
- Noindex directives
- Crawl errors

### 3. Performance Tracker (`agents/utils/performance_tracker.py`)

Tracks optimization impact with weekly measurements.

**Usage**:
```python
from agents.utils.performance_tracker import PerformanceTracker

tracker = PerformanceTracker()
tracker.capture_baseline(optimization_id)  # When approved
tracker.track_impact(optimization_id, week_number=1)  # After 7 days
```

**Verdict Calculation**:
- Uses **daily averages** (not percentages) for robustness
- Week 1: Aggressive thresholds (catch failures fast)
- Cumulative: Conservative thresholds (sustained improvement)

### 4. GSC Opportunity Analyzer (`agents/utils/gsc_analyzer.py`)

Analyzes GSC data with DeepSeek to identify optimization opportunities.

**Usage**:
```bash
python agents/utils/gsc_analyzer.py property
```

**Safeguards**:
1. **Data hashing**: Prevent re-analyzing same data
2. **Measurement windows**: Block pages being measured
3. **Cooldown periods**: Wait 7 days after optimization
4. **Trend analysis**: Use 56 days of data, not snapshots
5. **Previous context**: Learn from optimization history

**DeepSeek Prompting**:
- Explicit, structured instructions
- Decision frameworks spelled out step-by-step
- Negative examples (what NOT to do)
- Output format specified exactly
- Response validation

### 5. Content Expander (`agents/utils/content_expander.py`)

Generates section expansions with Claude and manages git rollback.

**Usage**:
```bash
python agents/utils/content_expander.py property <optimization_id>
```

**Features**:
- Backup content before changes (git commit + tag)
- Generate new sections with Claude
- Insert sections without modifying existing content
- Support rollback to previous version
- Update metadata in Supabase

**Rollback**:
```python
from agents.utils.content_expander import ContentExpander

expander = ContentExpander('property')
expander.rollback_optimization(optimization_id, reason="Negative impact")
```

### 6. Review CLI (`agents/review_gsc_opportunities.py`)

Interactive CLI for reviewing and approving opportunities.

**Usage**:
```bash
# Review all sites
python agents/review_gsc_opportunities.py

# Review specific site
python agents/review_gsc_opportunities.py property

# Review rollback candidates only
python agents/review_gsc_opportunities.py --rollbacks
```

**Sections**:
1. **Rollback Candidates**: Optimizations with negative impact
2. **Pending Opportunities**: New opportunities awaiting approval
3. **Currently Measuring**: Optimizations in measurement window

### 7. Daily Automation (`agents/run_gsc_optimization_cycle.py`)

Main automation script for daily runs.

**Usage**:
```bash
# Run all enabled sites
python agents/run_gsc_optimization_cycle.py

# Run specific site
python agents/run_gsc_optimization_cycle.py property
```

**Schedule with GitHub Actions** (optional):

```yaml
# .github/workflows/gsc_optimization.yml
name: GSC Optimization Cycle

on:
  schedule:
    - cron: '0 9 * * *'  # Daily at 9 AM UTC
  workflow_dispatch:

jobs:
  optimize:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - run: pip install -r requirements.txt
      - run: python agents/run_gsc_optimization_cycle.py
        env:
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_KEY: ${{ secrets.SUPABASE_KEY }}
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

## Workflow

### Day 1: Analysis & Approval

```bash
# 1. Run daily cycle (fetches data, analyzes opportunities)
python agents/run_gsc_optimization_cycle.py property

# 2. Review opportunities
python agents/review_gsc_opportunities.py property

# 3. Approve opportunity (captures baseline)
# Interactive CLI guides you through approval

# 4. Implement optimization
python agents/utils/content_expander.py property <optimization_id>
```

### Day 8: Week 1 Measurement

```bash
# Daily cycle automatically tracks week 1 impact
python agents/run_gsc_optimization_cycle.py property

# If negative impact, review rollback candidates
python agents/review_gsc_opportunities.py --rollbacks
```

### Day 15, 22, 29: Continued Measurement

System automatically tracks weeks 2, 3, 4 and calculates cumulative verdict.

### After Measurement Complete

- **Positive verdict**: 7-day cooldown, then can optimize again
- **Negative verdict**: Rollback, try alternative immediately (no cooldown)
- **Neutral verdict**: 7-day cooldown, monitor longer-term

## Verdict Criteria

### Using Daily Averages (Not Percentages)

**Why**: Daily GSC data is noisy. Percentages amplify noise. Daily averages smooth it out.

**Week 1 Thresholds (Aggressive)**:
- **POSITIVE**: +10 impressions/day OR +3 positions OR +1 click/day
- **NEGATIVE**: -10 impressions/day OR -3 positions OR -1 click/day
- **NEUTRAL**: Everything else

**Cumulative Thresholds (Weeks 2-4)**:
- **POSITIVE**: +7 impressions/day OR +2 positions OR +0.5 clicks/day
- **NEGATIVE**: -7 impressions/day OR -2 positions OR -0.5 clicks/day

**Example** (Property site baseline: 71 impressions/week = 10.1/day):

```
Baseline: 10.1 impressions/day, 0 clicks/day, Position 23.2

Week 1 After Optimization:
- 13.6 impressions/day (+3.5/day)
- 0.29 clicks/day (+0.29/day)
- Position 20.7 (+2.5 spots)

Verdict: NEUTRAL (close to thresholds, continue measuring)

Week 2:
- 14.7 impressions/day (+4.6/day)
- 0.57 clicks/day (+0.57/day)
- Position 19.5 (+3.7 spots)

Verdict: POSITIVE (position improved 3+ spots)
```

## Safeguards

### Layer 1: Data Hashing
- Every analysis creates SHA256 hash of GSC data
- Prevents analyzing same data twice

### Layer 2: Measurement Windows
- Pages in "measuring" status blocked from new analysis
- 28-day measurement period (4 weeks)

### Layer 3: Cooldown Periods
- 7-day cooldown after successful optimization
- 0-day cooldown after rollback (try alternative immediately)

### Layer 4: Trend Analysis
- DeepSeek receives 56 days of trend data (8 weeks)
- Makes decisions based on trajectory, not point-in-time

### Layer 5: Previous Context
- DeepSeek sees what was tried before and the result
- Won't suggest same failed optimization
- Builds on successful optimizations

## Troubleshooting

### No GSC Data Available

**Symptom**: "No data returned from GSC"

**Causes**:
1. Site too new (< 3 days old)
2. Not indexed yet
3. Query-level data anonymized (low traffic)

**Solution**:
- Wait 3-7 days for initial data
- Check indexing status: `python agents/utils/gsc_indexing_monitor.py <niche> <url>`
- System uses page-level data (works for low traffic)

### DeepSeek Not Suggesting Optimizations

**Symptom**: "No new opportunities identified"

**Causes**:
1. Performance improving naturally (good!)
2. Insufficient data (< 20 impressions baseline)
3. Recent optimization in cooldown

**Solution**:
- Check trend data manually
- Lower `min_impressions_baseline` in config for new sites
- Wait for cooldown to expire

### Rollback Failed

**Symptom**: "Git restore failed"

**Causes**:
1. Git commit not found
2. File path changed
3. Merge conflicts

**Solution**:
- Check git log for backup commit
- Manually restore: `git checkout <commit_hash> -- <file_path>`
- Update optimization status manually in Supabase

## Cost Estimates

### Per Site Per Day

**GSC API**: Free (1000 requests/day limit)

**DeepSeek** (analysis):
- ~5 opportunities analyzed/day
- ~2000 tokens per analysis
- Cost: ~$0.01/day

**Claude** (content generation):
- ~2 optimizations implemented/week
- ~3000 tokens per expansion
- Cost: ~$0.20/week

**Total**: ~$1/month per site

### Scaling to 10 Sites

- GSC API: Still free
- DeepSeek: ~$0.10/day = $3/month
- Claude: ~$2/week = $8/month
- **Total**: ~$11/month for 10 sites

## Monitoring & Alerts

### Daily Checks

- Performance tracking (automatic)
- Indexing status (sample of 10 URLs/site)
- New opportunities (automatic analysis)

### Weekly Checks

- Full indexing scan (all blog posts)
- Performance reports
- Success rate analysis

### Alerts

**High Severity**:
- Page not indexed
- Robots.txt blocking
- Noindex detected
- Negative impact after week 1

**Medium Severity**:
- Schema not detected
- Canonical mismatch
- Neutral verdict after 4 weeks

## Success Metrics

Track these to measure system effectiveness:

1. **Opportunity Detection Rate**: % of GSC pages flagged
2. **Approval Rate**: % of opportunities approved
3. **Success Rate**: % of optimizations with positive verdict
4. **Rollback Rate**: % of optimizations rolled back
5. **Performance Improvement**: Average change in impressions/position
6. **Time Saved**: Manual hours saved by automation

## Quick Start

### 1. Run Database Migration

```sql
-- In Supabase SQL Editor, run:
-- supabase/migrations/20260331134247_create_gsc_optimization_tables.sql
```

### 2. Configure Environment

```bash
# .env file
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
ANTHROPIC_API_KEY=your-claude-key
OPENAI_API_KEY=your-deepseek-key
```

### 3. Test GSC Connection

```bash
python agents/utils/gsc_client_oauth.py
```

### 4. Fetch Initial Data

```bash
python agents/utils/gsc_fetcher.py property
```

### 5. Run First Analysis

```bash
python agents/run_gsc_optimization_cycle.py property
```

### 6. Review Opportunities

```bash
python agents/review_gsc_opportunities.py property
```

### 7. Implement Approved Optimization

```bash
python agents/utils/content_expander.py property <optimization_id>
```

### 8. Track Impact (Automatic)

System automatically tracks weekly impact. Check status:

```bash
python agents/review_gsc_opportunities.py property
```

## File Structure

```
agents/
├── config/
│   └── gsc_config.py                    # Multi-site configuration
├── utils/
│   ├── gsc_client_oauth.py              # GSC API client (OAuth)
│   ├── gsc_fetcher.py                   # Data fetcher
│   ├── gsc_indexing_monitor.py          # URL Inspection API
│   ├── gsc_analyzer.py                  # DeepSeek analyzer
│   ├── performance_tracker.py           # Impact measurement
│   ├── content_expander.py              # Claude content generation
│   └── deepseek_client.py               # DeepSeek API client
├── review_gsc_opportunities.py          # Interactive review CLI
├── run_gsc_optimization_cycle.py        # Daily automation
└── GSC_OPTIMIZATION_README.md           # This file

supabase/
└── migrations/
    └── 20260331134247_create_gsc_optimization_tables.sql
```

## Best Practices

### 1. Start Conservative

- Approve 1-2 optimizations per week initially
- Learn what works for your niche
- Refine DeepSeek prompts based on quality

### 2. Monitor Closely

- Check rollback candidates daily (first 2 weeks)
- Review weekly performance reports
- Adjust thresholds if needed

### 3. Document Learnings

- Track what types of optimizations work
- Note which keywords drive traffic
- Identify patterns in successful expansions

### 4. Iterate Quickly

- Don't wait for perfect data
- Test hypotheses aggressively
- Roll back failures fast
- Build on successes

## FAQ

### Q: What if I have very low traffic (< 20 impressions/week)?

**A**: Lower the thresholds in `gsc_config.py`:

```python
"verdict_thresholds": {
    "week1": {
        "impressions_per_day": 3,  # Lower threshold
        "position_improvement": 3,
        "clicks_per_day": 0.3,
    },
}
```

### Q: Can I optimize multiple pages simultaneously?

**A**: Yes! Each page is tracked independently. You can have 5 pages in measurement at once.

### Q: What if an optimization shows neutral after 4 weeks?

**A**: System marks it as completed. You can optimize again after 7-day cooldown. The neutral optimization becomes the new baseline.

### Q: How do I add a new site?

**A**: Three steps:
1. Add to `GSC_CONFIG` in `gsc_config.py`
2. Update database CHECK constraints (add niche to allowed values)
3. Run `python agents/run_gsc_optimization_cycle.py new-site`

### Q: Can I run this for multiple sites in parallel?

**A**: Yes! Run `python agents/run_gsc_optimization_cycle.py` without arguments to process all enabled sites.

## Support

For issues or questions:
1. Check this README
2. Review the plan document: `.cursor/plans/gsc_smart_content_optimizer_*.plan.md`
3. Check logs in terminal output
4. Verify Supabase data: `SELECT * FROM blog_optimizations WHERE niche = 'property'`

## Version

**v1.0.0** - Initial release (2026-03-31)

- Multi-site support
- Weekly tracking with aggressive testing
- Git-based rollback
- DeepSeek + Claude integration
- URL Inspection API monitoring
