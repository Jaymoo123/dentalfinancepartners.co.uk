# GSC Smart Content Optimization System - Admin Documentation

**Date**: 2026-03-31  
**Status**: Implemented  
**Version**: 1.0.0

## Executive Summary

This system automates content optimization based on Google Search Console performance data. It uses AI (DeepSeek for analysis, Claude for content generation) to identify opportunities, implements changes with git-based version control, and aggressively tests results with automatic rollback for failures.

## System Components

### 1. Database Layer (Supabase)

**Migration**: `supabase/migrations/20260331134247_create_gsc_optimization_tables.sql`

**Tables**:
- `gsc_page_performance`: Daily GSC metrics (raw data)
- `blog_optimizations`: Optimization lifecycle tracking
- `gsc_indexing_issues`: Indexing/schema issues
- `blog_topics_property`, `blog_topics`: Updated with optimization tracking

**Key Features**:
- Multi-site support via `niche` column
- Unique constraints prevent duplicate analysis
- RLS policies for security
- Indexes for performance

### 2. Configuration Layer

**File**: `agents/config/gsc_config.py`

**Sites Configured**:
- Property (enabled, domain property)
- Dentists (enabled, URL-prefix property)
- Medical (disabled, not live yet)

**Verdict Thresholds**:
- Week 1 (aggressive): ±10 impressions/day, ±3 positions, ±1 click/day
- Cumulative (conservative): ±7 impressions/day, ±2 positions, ±0.5 clicks/day

**Global Settings**:
- Analysis window: 28 days
- Trend window: 56 days
- Measurement window: 7 days per week (4 weeks total)
- Cooldown: 7 days between optimizations

### 3. Data Collection Layer

**File**: `agents/utils/gsc_fetcher.py`

**Purpose**: Fetch GSC performance data and store in Supabase

**Features**:
- Uses page + date dimensions (query anonymized for low traffic)
- Fetches last 28 days
- Prevents duplicate insertion
- Handles API rate limits

**Run**:
```bash
python agents/utils/gsc_fetcher.py property
```

### 4. Monitoring Layer

**File**: `agents/utils/gsc_indexing_monitor.py`

**Purpose**: Monitor indexing status via URL Inspection API

**Detects**:
- Not indexed pages (high severity)
- Missing schema (medium severity)
- Canonical mismatches (medium severity)
- Robots.txt blocks (high severity)
- Crawl errors (low-medium severity)

**Run**:
```bash
python agents/utils/gsc_indexing_monitor.py property https://www.propertytaxpartners.co.uk/blog/section-24
```

### 5. Analysis Layer

**File**: `agents/utils/gsc_analyzer.py`

**Purpose**: Identify optimization opportunities using DeepSeek

**Safeguards**:
1. Data hashing (prevent re-analysis)
2. Measurement window blocking
3. Cooldown period enforcement
4. Trend analysis (56 days)
5. Previous optimization context

**DeepSeek Prompting Strategy**:
- Explicit decision frameworks
- Trend data (not snapshots)
- Previous optimization history
- Negative examples
- Structured JSON output
- Response validation

**Run**:
```bash
python agents/utils/gsc_analyzer.py property
```

### 6. Performance Tracking Layer

**File**: `agents/utils/performance_tracker.py`

**Purpose**: Measure optimization impact with weekly tracking

**Lifecycle**:
1. Capture baseline (7 days before implementation)
2. Track week 1 (7 days after)
3. Track week 2 (14 days after)
4. Track week 3 (21 days after)
5. Track week 4 (28 days after)
6. Calculate verdict (positive/negative/neutral)

**Verdict Logic**:
- Uses daily averages (not percentages)
- Week 1: Aggressive thresholds (catch failures fast)
- Cumulative: Conservative thresholds (sustained improvement)

### 7. Content Generation Layer

**File**: `agents/utils/content_expander.py`

**Purpose**: Generate section expansions with Claude

**Features**:
- Git backup before changes (commit + tag)
- Claude generates new sections
- Inserts without modifying existing content
- Git commit after changes
- Rollback support (restore from backup commit)

**Run**:
```bash
python agents/utils/content_expander.py property <optimization_id>
```

**Rollback**:
```python
from agents.utils.content_expander import ContentExpander

expander = ContentExpander('property')
expander.rollback_optimization(optimization_id, reason="Negative impact")
```

### 8. Review Interface

**File**: `agents/review_gsc_opportunities.py`

**Purpose**: Interactive CLI for reviewing opportunities

**Sections**:
1. Rollback candidates (negative impact)
2. Pending opportunities (awaiting approval)
3. Currently measuring (in progress)

**Run**:
```bash
python agents/review_gsc_opportunities.py property
python agents/review_gsc_opportunities.py --rollbacks
```

### 9. Automation Layer

**File**: `agents/run_gsc_optimization_cycle.py`

**Purpose**: Daily automation script

**Sequence**:
1. Track existing optimizations
2. Check indexing status
3. Fetch new GSC data
4. Analyze opportunities
5. Generate report

**Run**:
```bash
python agents/run_gsc_optimization_cycle.py              # All sites
python agents/run_gsc_optimization_cycle.py property     # Specific site
```

## Data Flow

```
Day 0: GSC API → gsc_page_performance (daily snapshots)
       ↓
Day 1: Analyzer (DeepSeek) → blog_optimizations (pending)
       ↓
Day 2: Manual Review → Approve → Capture Baseline
       ↓
Day 3: Content Expander (Claude) → Implement → Git Commit
       ↓
Day 10: Performance Tracker → Week 1 Impact → Verdict
       ↓
       If NEGATIVE → Rollback → Try Alternative
       If POSITIVE → Continue Measuring
       ↓
Day 31: Week 4 Complete → Final Verdict
```

## Safeguards

### 1. Data Hashing
- SHA256 hash of GSC data (page_url + date range + metrics)
- Stored in `blog_optimizations.data_hash`
- Unique index prevents duplicate analysis

### 2. Measurement Windows
- Status "measuring" blocks new analysis
- 28-day measurement period (4 weeks)
- Checked in `_is_in_measurement_window()`

### 3. Cooldown Periods
- 7 days after successful optimization
- 0 days after rollback (try alternative immediately)
- Checked in analyzer before suggesting

### 4. Trend Analysis
- DeepSeek receives 56 days of data (8 weeks)
- Grouped by week for clarity
- Identifies improving/declining/flat trends

### 5. Previous Context
- DeepSeek sees last optimization result
- Won't suggest same failed optimization
- Builds on successful optimizations

## Multi-Site Architecture

### Database Isolation
- `niche` column in all tables
- CHECK constraints enforce valid niches
- Queries filtered by niche

### Configuration
- Per-niche settings in `gsc_config.py`
- Site-specific verdict thresholds
- Independent enable/disable

### Execution
- Run per-site or all sites
- Independent tracking
- Isolated git repos

### Adding New Sites

1. **Update config**:
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
ALTER TABLE gsc_page_performance DROP CONSTRAINT IF EXISTS gsc_page_performance_niche_check;
ALTER TABLE gsc_page_performance ADD CONSTRAINT gsc_page_performance_niche_check 
  CHECK (niche IN ('property', 'dentists', 'medical', 'legal'));
```

3. **Run first cycle**:
```bash
python agents/run_gsc_optimization_cycle.py legal
```

## Aggressive Testing Strategy

### Philosophy

Test fast, fail fast, learn fast.

### 7-Day Measurement

- Week 1 verdict after 7 days
- If negative → rollback immediately
- If positive → continue measuring
- If neutral → give more time

### Quick Rollback

- Git-based (instant restore)
- No cooldown after rollback
- Try alternative approach immediately

### Iterative Improvement

- Each optimization is an experiment
- Learn from successes and failures
- Refine prompts based on results

## Verdict Criteria

### Why Daily Averages?

GSC data fluctuates day-to-day. Using percentages amplifies noise. Daily averages smooth it out and provide stable thresholds.

### Week 1 (Aggressive)

**POSITIVE**: Any of:
- +10 impressions/day
- +3 positions
- +1 click/day

**NEGATIVE**: Any of:
- -10 impressions/day
- -3 positions
- -1 click/day

**NEUTRAL**: Everything else

### Cumulative (Weeks 2-4)

**POSITIVE**: Any of:
- +7 impressions/day (sustained)
- +2 positions (sustained)
- +0.5 clicks/day (sustained)

**NEGATIVE**: Any of:
- -7 impressions/day (sustained)
- -2 positions (sustained)
- -0.5 clicks/day (sustained)

### Edge Cases

**Low baseline traffic** (< 20 impressions/week):
- Use lower thresholds (configured per site)
- Require 2 weeks minimum for verdict

**High volatility** (daily swings > 50%):
- Extend measurement to week 2 minimum
- Use cumulative verdict only

**Zero clicks baseline**:
- Focus on impressions and position
- Any clicks = positive signal

## DeepSeek Prompting Best Practices

### 1. Be Explicit

Bad:
```
Analyze this page and suggest improvements.
```

Good:
```
Step 1: Analyze the trend (is it improving/declining/flat?)
Step 2: Identify the specific problem (low CTR/stuck position/declining)
Step 3: Determine if optimization is warranted (YES/NO with criteria)
Step 4: If YES, suggest specific action (what sections to add)
```

### 2. Provide Context

Always include:
- Current snapshot data
- 8-week trend data
- Previous optimization history
- Blog post details

### 3. Use Negative Examples

Tell DeepSeek what NOT to do:
- Don't optimize if performance is improving naturally
- Don't suggest same failed optimization
- Don't optimize with insufficient data

### 4. Specify Output Format

```json
{
  "needs_optimization": true,
  "reasoning": "2-3 sentences",
  "trend_direction": "improving",
  "priority": 75,
  ...
}
```

### 5. Validate Responses

Check that DeepSeek:
- Followed instructions
- Provided all required fields
- Used valid enum values
- Gave actionable recommendations

## Indexing & Schema Monitoring

### URL Inspection API

**Checks**:
- Indexing status (PASS/FAIL)
- Schema detection (Organization, Article, etc.)
- Canonical URLs
- Robots.txt state
- Crawl errors

**Frequency**:
- Daily sample: 10 URLs per site
- Weekly full scan: All blog posts
- On-demand: After deployment

**Alerts**:
- High severity: Not indexed, robots blocked
- Medium severity: Schema missing, canonical mismatch
- Low severity: Crawl errors

### API-Based Fixes

**Request Re-Indexing**:
```python
from agents.utils.gsc_indexing_monitor import GSCIndexingMonitor

monitor = GSCIndexingMonitor('property')
monitor.request_indexing('https://www.propertytaxpartners.co.uk/blog/section-24')
```

**Note**: Re-indexing is rate-limited (200 requests/day per site).

## Rollback Process

### When to Rollback

- Week 1 verdict: NEGATIVE
- Sustained decline (weeks 2-4)
- User decision (manual override)

### How Rollback Works

1. Find backup commit (stored in `content_backup_path`)
2. Restore file from backup: `git checkout <commit> -- <file>`
3. Create rollback commit
4. Update optimization record (rolled_back=true)
5. Decrement optimization count
6. No cooldown (try alternative immediately)

### Manual Rollback

```bash
# Via CLI
python agents/review_gsc_opportunities.py --rollbacks

# Via code
from agents.utils.content_expander import ContentExpander

expander = ContentExpander('property')
expander.rollback_optimization(optimization_id, reason="Negative impact")
```

### Git History

View optimization history:
```bash
git log --grep="OPTIMIZATION"
git log --grep="ROLLBACK"
```

View all optimization tags:
```bash
git tag | grep optimization
```

Restore manually:
```bash
git checkout optimization-abc123-backup -- Property/web/src/content/blog/section-24.md
```

## Cost Analysis

### Current Usage (Property + Dentists)

**GSC API**: Free (1000 requests/day limit)

**DeepSeek** (analysis):
- 5 opportunities/day × 2 sites = 10 analyses/day
- 2000 tokens per analysis = 20k tokens/day
- Cost: ~$0.02/day = $0.60/month

**Claude** (content):
- 2 optimizations/week × 2 sites = 4 implementations/week
- 3000 tokens per expansion = 12k tokens/week
- Cost: ~$0.40/week = $1.60/month

**Total**: ~$2.20/month for 2 sites

### Scaling to 10 Sites

- DeepSeek: ~$3/month
- Claude: ~$8/month
- **Total**: ~$11/month

### Cost Optimization

- DeepSeek is 10x cheaper than Claude for analysis
- Claude only used for final content generation
- Batch operations reduce API calls
- Page-level data (not query-level) reduces API quota usage

## Monitoring & Reporting

### Daily Monitoring

**Automated**:
- Performance tracking (automatic)
- Indexing checks (10 URLs/site)
- New opportunity analysis

**Manual** (5 min/day):
- Review rollback candidates
- Approve/reject new opportunities

### Weekly Reporting

**Metrics to Track**:
1. Opportunities identified
2. Approval rate
3. Success rate (positive verdicts)
4. Rollback rate
5. Average performance improvement
6. Time saved vs manual optimization

**Generate Report**:
```sql
-- In Supabase SQL Editor
SELECT 
  niche,
  COUNT(*) as total_optimizations,
  SUM(CASE WHEN impact_verdict = 'positive' THEN 1 ELSE 0 END) as positive,
  SUM(CASE WHEN impact_verdict = 'negative' THEN 1 ELSE 0 END) as negative,
  SUM(CASE WHEN rolled_back THEN 1 ELSE 0 END) as rolled_back,
  AVG(impact_impressions_week4 - baseline_impressions) as avg_impression_change
FROM blog_optimizations
WHERE status = 'completed'
GROUP BY niche;
```

### Alerts

**High Priority** (check immediately):
- Negative verdict after week 1
- Page not indexed
- Robots.txt blocking

**Medium Priority** (check daily):
- Schema not detected
- Canonical mismatch
- Neutral verdict after 4 weeks

**Low Priority** (check weekly):
- Crawl errors
- Low traffic pages

## Troubleshooting

### Issue: No GSC Data

**Symptoms**: "No data returned from GSC"

**Diagnosis**:
1. Check if site is verified in GSC
2. Check if site has been live for 3+ days
3. Check property type (domain vs URL-prefix)
4. Check API credentials

**Solution**:
```bash
# Test GSC connection
python agents/utils/gsc_client_oauth.py

# Check property type
# Look for "sc-domain:" vs "https://" in GSC web UI
```

### Issue: DeepSeek Not Finding Opportunities

**Symptoms**: "No new opportunities identified"

**Diagnosis**:
1. Check if pages have sufficient impressions (>20)
2. Check if performance is improving naturally
3. Check if pages are in cooldown period

**Solution**:
```python
# Lower thresholds in gsc_config.py
"min_impressions_baseline": 10,  # Lower from 20
```

### Issue: Rollback Failed

**Symptoms**: "Git restore failed"

**Diagnosis**:
1. Check if backup commit exists
2. Check git repo status
3. Check file path

**Solution**:
```bash
# Find backup commit
git log --grep="BACKUP" --grep="<optimization_id>"

# Manual restore
git checkout <commit_hash> -- <file_path>
git commit -m "[ROLLBACK] Manual restore"
```

### Issue: API Rate Limits

**Symptoms**: "429 Too Many Requests"

**Diagnosis**:
1. GSC Search Analytics: 1000 requests/day
2. GSC URL Inspection: 2000 requests/day
3. Indexing API: 200 requests/day

**Solution**:
- Reduce `daily_url_inspection_limit` in config
- Spread requests across day (not all at once)
- Use batch operations where possible

## Security

### Credentials

**Required**:
- `secrets/gsc_credentials.json` (OAuth client)
- `secrets/gsc_token.pickle` (OAuth token)
- `.env` (Supabase + AI API keys)

**Git Ignore**:
```
secrets/
.env
*.pickle
```

### API Scopes

**GSC OAuth**:
- `https://www.googleapis.com/auth/webmasters` (full access)
- `https://www.googleapis.com/auth/indexing` (re-indexing requests)

**Supabase RLS**:
- Read: Public
- Write: Authenticated only

## Maintenance

### Daily

- Check rollback candidates
- Review new opportunities
- Monitor alerts

### Weekly

- Review performance reports
- Adjust thresholds if needed
- Check indexing status

### Monthly

- Analyze success rate
- Refine DeepSeek prompts
- Update documentation

## Future Enhancements

### Phase 2 (Optional)

1. **Query-level analysis** (when traffic increases)
2. **A/B testing** (test multiple approaches)
3. **Automated approval** (for low-risk optimizations)
4. **Slack/email alerts** (for high-severity issues)
5. **Dashboard UI** (visual reporting)

### Phase 3 (Optional)

1. **Competitor analysis** (track competitor rankings)
2. **Keyword clustering** (group related queries)
3. **Content templates** (reusable section patterns)
4. **Multi-language support** (for international sites)

## Related Documentation

- **Quick Start**: `agents/GSC_QUICK_START.md`
- **Full README**: `agents/GSC_OPTIMIZATION_README.md`
- **Plan Document**: `.cursor/plans/gsc_smart_content_optimizer_*.plan.md`
- **GSC API Setup**: `Admin/GSC_OAUTH_SETUP.md`
- **Configuration**: `agents/config/gsc_config.py`

## Change Log

### v1.0.0 (2026-03-31)

- Initial implementation
- Multi-site support (Property, Dentists, Medical)
- Weekly tracking with aggressive testing
- Git-based rollback
- DeepSeek + Claude integration
- URL Inspection API monitoring
- Comprehensive safeguards

## Support

For questions or issues:
1. Check this documentation
2. Review the plan document
3. Check component README files
4. Verify Supabase data
5. Test individual components

## Success Criteria

System is successful if:

1. **Accuracy**: 70%+ of approved optimizations show positive impact
2. **Efficiency**: 80%+ of opportunities are actionable (not rejected)
3. **Safety**: 0 duplicate analyses, 0 compounding changes
4. **Speed**: Verdict within 7 days (week 1)
5. **Reliability**: 95%+ uptime for daily cycle

## Status

- **Database**: ✓ Migration created
- **Configuration**: ✓ Multi-site configured
- **Data Fetcher**: ✓ Implemented
- **Indexing Monitor**: ✓ Implemented
- **Performance Tracker**: ✓ Implemented
- **Analyzer**: ✓ Implemented with safeguards
- **Content Expander**: ✓ Implemented with rollback
- **Review CLI**: ✓ Implemented
- **Automation**: ✓ Implemented
- **Documentation**: ✓ Complete

**Ready for deployment**: Yes

**Next steps**:
1. Run database migration
2. Test GSC connection
3. Run first cycle
4. Review and approve first opportunity
5. Monitor week 1 results
