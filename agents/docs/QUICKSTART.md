# Agent System Quick Start

Get the AI agent system running in 15 minutes.

## Prerequisites

- Python 3.11+
- Git
- GitHub account with Actions enabled
- Supabase account
- Vercel account
- Anthropic API key
- Google Analytics 4 property

## Step 1: Install Dependencies

```bash
cd agents
pip install -r requirements.txt
```

## Step 2: Set Up Environment Variables

Create `.env` file in project root:

```bash
ANTHROPIC_API_KEY=sk-ant-...
SUPABASE_URL=https://dhlxwmvmkrfnmcgjbntk.supabase.co
SUPABASE_KEY=eyJhbGci...
GA4_PROPERTY_ID=G-273RJY0LZQ
GA4_CREDENTIALS={"type":"service_account",...}
VERCEL_TOKEN=...
SLACK_WEBHOOK=https://hooks.slack.com/... (optional)
```

## Step 3: Set Up Database

1. Open Supabase SQL Editor:
   https://supabase.com/dashboard/project/dhlxwmvmkrfnmcgjbntk/sql

2. Copy and run SQL from:
   `supabase/migrations/001_add_agent_tables.sql`

3. Verify tables created:
   ```sql
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name LIKE 'agent_%';
   ```

## Step 4: Test Locally

```bash
# Check system status
python agents/coordinator.py status

# Test content research
python agents/content_research_agent.py --niche Dentists

# Test blog generation
python agents/blog_generation_agent.py --niche Dentists --max-posts 1

# View dashboard
python agents/monitoring_dashboard.py status
```

## Step 5: Configure GitHub Actions

1. Go to repository settings > Secrets and variables > Actions

2. Add all required secrets (see Step 2)

3. Enable GitHub Actions:
   - Go to Actions tab
   - Enable workflows

4. Test workflow manually:
   - Actions > Daily Content Pipeline > Run workflow

## Step 6: Verify Automation

**Check daily pipeline:**
1. Wait for 6 AM UTC or trigger manually
2. Check GitHub Actions logs
3. Verify new blog posts in `{Niche}/web/content/blog/`
4. Check Vercel deployment
5. View monitoring dashboard

**Check analytics optimization:**
1. Wait for 8 AM UTC or trigger manually
2. Verify GA4 data fetched
3. Check optimization logs

## Step 7: Monitor Costs

```bash
# View current spending
python agents/monitoring_dashboard.py status

# Check Supabase
# SELECT * FROM monthly_costs;
# SELECT * FROM daily_costs;
```

**Budget alerts:**
- 80% threshold: Warning notification
- 100% daily: Operations stop
- 100% monthly: Operations stop

## Common Commands

```bash
# Full daily pipeline
python agents/coordinator.py daily-pipeline

# Analytics optimization
python agents/coordinator.py analytics

# Weekly report
python agents/coordinator.py weekly-report

# System status
python agents/coordinator.py status

# Monitoring dashboard
python agents/monitoring_dashboard.py status
```

## Troubleshooting

**"Budget exceeded"**
- Check: `python agents/monitoring_dashboard.py status`
- Adjust limits in `agents/config/cost_limits.py`

**"Quality check failed"**
- View issues in Supabase `agent_executions` table
- Adjust prompts in `{Niche}/config_supabase.py`

**"No topics available"**
- Run: `python agents/content_research_agent.py --niche Dentists`
- Or add manually to Supabase `blog_topics` table

**GitHub Actions failing**
- Check Actions logs for specific error
- Verify all secrets are set
- Test locally first

## Next Steps

1. Monitor first week of automated runs
2. Adjust cost limits based on actual usage
3. Review quality metrics and tune thresholds
4. Add more blog topics manually if needed
5. Set up GA4 service account for analytics
6. Configure Slack/Discord webhooks for alerts

## Support

See full documentation: `agents/docs/README.md`
