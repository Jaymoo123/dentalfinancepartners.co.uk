# AI Agent Automation System

Complete documentation for the autonomous content generation and lead optimization system.

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Agents](#agents)
4. [Cost Controls](#cost-controls)
5. [Quality Controls](#quality-controls)
6. [Database Schema](#database-schema)
7. [Deployment](#deployment)
8. [Monitoring](#monitoring)
9. [Troubleshooting](#troubleshooting)

## Overview

This system automates blog content generation, lead management, and SEO optimization across multiple accounting niche websites using AI agents.

**Current Niches:**
- Dentists (dentalfinancepartners.co.uk)
- Property/Landlords (propertyaccountants.co.uk)

**Key Features:**
- Autonomous content generation (1 blog/niche/day)
- Quality controls and deduplication
- Cost monitoring and hard budget limits
- GA4-driven content optimization
- Automated deployment to Vercel
- Alert-only error handling (no retries)
- 90-day data retention

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Actions (Cron)                     │
│  Daily 6AM: Content Pipeline | Daily 8AM: Analytics         │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
            ┌───────────────────────┐
            │   Agent Coordinator   │
            │   (Sequential exec)   │
            └───────────┬───────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   Content    │ │     Blog     │ │  Analytics   │
│   Research   │ │  Generation  │ │ Optimization │
│    Agent     │ │    Agent     │ │    Agent     │
└──────┬───────┘ └──────┬───────┘ └──────┬───────┘
       │                │                │
       ▼                ▼                ▼
┌─────────────────────────────────────────────────┐
│              Supabase Database                   │
│  Topics | Leads | Executions | Costs | Metrics  │
└─────────────────────────────────────────────────┘
       │                │                │
       ▼                ▼                ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   Dentists   │ │   Property   │ │   Future     │
│   Website    │ │   Website    │ │   Niches     │
└──────────────┘ └──────────────┘ └──────────────┘
```

## Agents

### 1. Content Research Agent

**Purpose:** Discover and populate blog topics using AI.

**Triggers:**
- Daily at 6 AM UTC (GitHub Actions)
- Manual: `python agents/content_research_agent.py --niche Dentists`

**Process:**
1. Check unused topic inventory (skip if >= 10)
2. Check budget
3. Use Claude to generate 5 relevant topics
4. Insert into `blog_topics` or `blog_topics_property` table
5. Log cost and execution

**Cost:** ~$0.01 per run

**Configuration:** `agents/config/research_sources.py`

### 2. Blog Generation Agent

**Purpose:** Generate blog posts with quality controls and deduplication.

**Triggers:**
- Daily at 6 AM UTC (after research, GitHub Actions)
- Manual: `python agents/blog_generation_agent.py --niche Dentists --max-posts 1`

**Process:**
1. Check rate limit (1 post/niche/day)
2. Get next unused topic
3. Check budget
4. **PRE-GENERATION CHECKS:**
   - Semantic similarity (80% = duplicate)
   - Recent use check (90 days)
5. Call existing `generate_blog_supabase.py` script
6. **POST-GENERATION CHECKS:**
   - Word count (min 1000)
   - HTML structure (h2, p, ul)
   - FAQ count (min 4)
   - Internal links (min 1)
   - Keyword density (max 3%)
   - Valid front matter
7. If quality fails: delete content, alert, don't retry
8. If quality passes: register content, log cost, complete

**Cost:** ~$0.03 per blog post

**Configuration:** `agents/config/cost_limits.py` (quality thresholds)

### 3. Analytics Optimization Agent

**Purpose:** Use GA4 data to identify and optimize underperforming content.

**Triggers:**
- Daily at 8 AM UTC (GitHub Actions)
- Manual: `python agents/analytics_optimization_agent.py`

**Process:**
1. Fetch GA4 page analytics (last 30 days)
2. Identify optimization opportunities:
   - High traffic + low conversion
   - High bounce rate (>70%)
   - Low engagement (<60s avg time)
3. Check rate limit (3 optimizations/day)
4. Apply optimizations (future: rewrite sections, add CTAs, improve structure)
5. Store metrics in Supabase

**Cost:** ~$0.02 per optimization

**Configuration:** `agents/analytics/ga4_client.py`

### 4. Agent Coordinator

**Purpose:** Orchestrate all agents in correct sequence.

**Commands:**
- `python agents/coordinator.py daily-pipeline` - Run full content pipeline
- `python agents/coordinator.py analytics` - Run analytics optimization
- `python agents/coordinator.py weekly-report` - Generate performance report
- `python agents/coordinator.py status` - Check system status

**Execution Order:**
1. Content Research (all niches)
2. Blog Generation (each niche, sequential)
3. Git commit and Vercel deploy (per niche)

## Cost Controls

### Budget Limits

Defined in `agents/config/cost_limits.py`:

```python
BUDGET_LIMITS = {
    "monthly_budget_usd": 200,
    "daily_budget_usd": 10,
    "budget_warning_threshold": 0.80,
}
```

### Rate Limits

```python
RATE_LIMITS = {
    "daily_blog_posts_per_niche": 1,
    "daily_content_research_calls": 5,
    "daily_optimization_updates": 3,
    "max_parallel_operations": 1,  # Sequential only
}
```

### Cost Tracking

All operations log costs to `agent_costs` table:

| Operation | Cost (USD) |
|-----------|-----------|
| Blog generation | $0.03 |
| Topic research | $0.01 |
| Content optimization | $0.02 |
| Similarity check | $0.005 |

**Monitoring:**
- Real-time tracking in Supabase
- Alert at 80% monthly budget
- Hard stop at daily/monthly limits
- No automatic retries (prevents cost spiral)

## Quality Controls

### Pre-Generation Checks

**1. Semantic Similarity Check**
- Uses Claude to compare new topic with all published content
- Threshold: 80% similarity = duplicate
- Cost: $0.005 per check
- Skips generation if duplicate found

**2. Recent Use Check**
- Prevents reusing topics within 90 days
- Fast database query (no API cost)

### Post-Generation Checks

**1. Word Count**
- Minimum: 1000 words
- Validates substantial content

**2. HTML Structure**
- Requires: `<h2>`, `<p>`, `<ul>` or `<ol>`
- Ensures proper formatting

**3. FAQ Count**
- Minimum: 4 questions
- Validates SEO-friendly structure

**4. Internal Links**
- Minimum: 1 internal link
- Improves site architecture

**5. Keyword Density**
- Maximum: 3%
- Prevents keyword stuffing

**6. Front Matter**
- Validates: title, slug, metaTitle, metaDescription
- Ensures Next.js compatibility

### Quality Failure Handling

If any check fails:
1. Delete generated content
2. Send alert with specific issues
3. Log to `agent_executions` with status `quality_failed`
4. **Don't retry** (prevents cost spiral)

## Database Schema

### Core Tables

**agent_executions**
- Tracks all agent runs
- Fields: agent_type, niche, status, started_at, completed_at, metrics, error_log

**agent_costs**
- Tracks API spending
- Fields: operation, niche, cost_usd, tokens_used, timestamp

**published_content**
- Deduplication tracking
- Fields: niche, slug, title, topic, published_at, word_count, content_hash

**niche_metrics**
- Daily performance per niche
- Fields: niche, date, blog_posts_generated, leads_received, page_views, conversion_rate

**seo_rankings**
- SEO tracking from GA4/GSC
- Fields: niche, page_url, keyword, position, impressions, clicks, ctr

### Helper Functions

**cleanup_old_logs()**
- Deletes records older than 90 days
- Runs weekly via GitHub Actions

**get_monthly_spend()**
- Returns current month spending

**get_daily_spend()**
- Returns today's spending

### Migration

Run in Supabase SQL Editor:
```bash
# Copy SQL from:
supabase/migrations/001_add_agent_tables.sql
```

## Deployment

### GitHub Actions Workflows

**1. Daily Content Pipeline** (`.github/workflows/daily-content-pipeline.yml`)
- Schedule: 6 AM UTC daily
- Jobs:
  1. Research topics
  2. Generate blogs (matrix: Dentists, Property)
  3. Commit to Git
  4. Deploy to Vercel

**2. Daily Analytics Optimization** (`.github/workflows/daily-analytics-optimization.yml`)
- Schedule: 8 AM UTC daily
- Fetches GA4 data and optimizes content

**3. Weekly Cleanup** (`.github/workflows/weekly-cleanup.yml`)
- Schedule: Sunday 2 AM UTC
- Runs `cleanup_old_logs()` function

**4. Weekly Performance Report** (`.github/workflows/weekly-performance-report.yml`)
- Schedule: Monday 9 AM UTC
- Generates and sends performance summary

### Required Secrets

Add these to GitHub repository settings:

```
ANTHROPIC_API_KEY=sk-ant-...
SUPABASE_URL=https://dhlxwmvmkrfnmcgjbntk.supabase.co
SUPABASE_KEY=eyJhbGci...
VERCEL_TOKEN=...
VERCEL_ORG_ID=...
VERCEL_PROJECT_ID=...
GA4_PROPERTY_ID=G-273RJY0LZQ
GA4_CREDENTIALS={"type":"service_account",...}
SLACK_WEBHOOK=https://hooks.slack.com/... (optional)
DISCORD_WEBHOOK=https://discord.com/api/webhooks/... (optional)
```

### Manual Deployment

```bash
# Deploy specific niche
cd Dentists/web
vercel --prod

# Or use Vercel CLI from root
vercel deploy --prod --cwd Dentists/web
```

## Monitoring

### Dashboard

View real-time status:

```bash
python agents/monitoring_dashboard.py status
```

**Output:**
- Budget status (daily/monthly)
- Recent executions (last 24h)
- Content generation stats
- Quality metrics (last 7 days)
- System health indicators

### Alerts

**Slack/Discord notifications for:**
- Pipeline start/completion
- Budget warnings (80% threshold)
- Budget exceeded (daily/monthly)
- Agent failures
- Quality check failures
- Weekly performance reports

**Alert Priorities:**
- Low: Info (pipeline start, reports)
- Medium: Warnings (budget 80%, quality failures)
- High: Critical (failures, budget exceeded)

### Supabase Views

**monthly_costs**
- Monthly spending by niche and operation

**daily_costs**
- Daily spending summary

Query examples:
```sql
-- Current month spending
SELECT * FROM monthly_costs WHERE month = DATE_TRUNC('month', NOW());

-- Today's operations
SELECT * FROM daily_costs WHERE day = DATE_TRUNC('day', NOW());

-- Failed executions
SELECT * FROM agent_executions WHERE status = 'failed' ORDER BY started_at DESC;
```

## Troubleshooting

### Agent Not Running

**Check:**
1. GitHub Actions enabled?
2. Secrets configured?
3. Budget exceeded?
4. Rate limit reached?

**Debug:**
```bash
python agents/coordinator.py status
```

### Quality Check Failures

**Common issues:**
- Content too short: Adjust system prompt in `config_supabase.py`
- Missing FAQs: Check blog generation prompt
- No internal links: Verify `INTERNAL_LINK_SLUGS` in config

**View failures:**
```sql
SELECT * FROM agent_executions 
WHERE status = 'quality_failed' 
ORDER BY started_at DESC 
LIMIT 10;
```

### Budget Exceeded

**Immediate actions:**
1. Check spending: `SELECT * FROM monthly_costs;`
2. Adjust limits in `agents/config/cost_limits.py`
3. Reduce rate limits if needed

**Long-term:**
- Review cost per operation
- Optimize prompts (reduce tokens)
- Adjust generation frequency

### Duplicate Content

**If duplicates slip through:**
1. Check similarity threshold (currently 80%)
2. Review `published_content` table
3. Manually mark topic as used in `blog_topics` table

**Adjust threshold:**
```python
# In agents/config/cost_limits.py
QUALITY_THRESHOLDS = {
    "duplicate_similarity_threshold": 0.85,  # Increase to 85%
}
```

### Deployment Failures

**Vercel deployment issues:**
1. Check Vercel token validity
2. Verify project ID in secrets
3. Check build logs in Vercel dashboard

**Git push failures:**
- GitHub push protection may block secrets
- Use `vercel --prod` to deploy directly
- Or resolve secret detection issue

### GA4 Integration Issues

**Authentication:**
- Verify service account JSON in `GA4_CREDENTIALS`
- Check property ID: G-273RJY0LZQ
- Ensure Analytics API enabled in Google Cloud

**No data:**
- Verify GA4 tracking code on websites
- Check date range (default: last 30 days)
- Confirm property ID matches

## Adding a New Niche

1. **Create folder structure:**
   ```bash
   mkdir NewNiche
   cp -r Dentists/config_supabase.py NewNiche/
   cp -r Dentists/generate_blog_supabase.py NewNiche/
   cp -r Dentists/web NewNiche/
   ```

2. **Update configuration:**
   - Edit `NewNiche/config_supabase.py` (site URL, author, categories, prompts)
   - Add to `agents/config/agent_config.py` NICHE_CONFIG
   - Add source identifier to `shared_supabase_config.py`

3. **Create Supabase table:**
   ```sql
   CREATE TABLE blog_topics_newniche (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     topic TEXT NOT NULL,
     secondary_keyword_1 TEXT,
     secondary_keyword_2 TEXT,
     secondary_keyword_3 TEXT,
     category TEXT,
     priority INTEGER DEFAULT 5,
     used BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

4. **Update GitHub Actions:**
   - Add to matrix in `.github/workflows/daily-content-pipeline.yml`

5. **Deploy:**
   ```bash
   cd NewNiche/web
   vercel --prod
   ```

## Manual Operations

### Generate Content Manually

```bash
# Research topics
python agents/content_research_agent.py --niche Dentists

# Generate blog
python agents/blog_generation_agent.py --niche Dentists --max-posts 1

# Run full pipeline
python agents/coordinator.py daily-pipeline
```

### Check System Status

```bash
# Dashboard
python agents/monitoring_dashboard.py status

# Coordinator status
python agents/coordinator.py status
```

### View Logs

```bash
# Recent executions
ls agents/docs/logs/

# Supabase query
# SELECT * FROM agent_executions ORDER BY started_at DESC LIMIT 20;
```

## Best Practices

1. **Monitor costs weekly** - Check dashboard and adjust limits if needed
2. **Review quality failures** - Improve prompts based on common issues
3. **Update topics regularly** - Add seasonal/trending topics manually
4. **Test locally first** - Run agents locally before deploying
5. **Keep documentation updated** - Document any config changes
6. **Review analytics monthly** - Adjust strategy based on performance

## Support

For issues or questions:
1. Check this documentation
2. Review `.cursorrules` for project context
3. Check Supabase tables for execution logs
4. Review GitHub Actions logs
5. Check Slack/Discord alerts

## Version History

- **v1.0** (2026-03-28): Initial release with 2 niches, cost controls, quality checks
