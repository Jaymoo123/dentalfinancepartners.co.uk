# System Architecture

## High-Level Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         GitHub Actions (Scheduler)                   │
│                                                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │ Daily 6 AM   │  │ Daily 8 AM   │  │ Weekly       │              │
│  │ Content      │  │ Analytics    │  │ Cleanup +    │              │
│  │ Pipeline     │  │ Optimization │  │ Reports      │              │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘              │
└─────────┼──────────────────┼──────────────────┼────────────────────┘
          │                  │                  │
          └──────────────────┼──────────────────┘
                             ▼
                  ┌──────────────────────┐
                  │  Agent Coordinator   │
                  │  (Sequential Exec)   │
                  └──────────┬───────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
          ▼                  ▼                  ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│   Content       │ │      Blog       │ │   Analytics     │
│   Research      │ │   Generation    │ │  Optimization   │
│   Agent         │ │     Agent       │ │     Agent       │
│                 │ │                 │ │                 │
│ • Claude API    │ │ • Wraps exist-  │ │ • GA4 API       │
│ • Trend analysis│ │   ing scripts   │ │ • Identifies    │
│ • Topic gen     │ │ • Quality check │ │   opportunities │
│                 │ │ • Deduplication │ │ • Optimizes     │
└────────┬────────┘ └────────┬────────┘ └────────┬────────┘
         │                   │                   │
         └───────────────────┼───────────────────┘
                             ▼
              ┌──────────────────────────────┐
              │     Supabase Database        │
              │                              │
              │  • agent_executions          │
              │  • agent_costs               │
              │  • published_content         │
              │  • niche_metrics             │
              │  • seo_rankings              │
              │  • blog_topics (per niche)   │
              │  • leads (shared)            │
              └──────────┬───────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
┌────────────────┐ ┌────────────────┐ ┌────────────────┐
│   Dentists     │ │   Property     │ │   Future       │
│   Website      │ │   Website      │ │   Niches       │
│                │ │                │ │                │
│ Next.js + Blog │ │ Next.js + Blog │ │ Next.js + Blog │
│ Lead Forms     │ │ Lead Forms     │ │ Lead Forms     │
└────────────────┘ └────────────────┘ └────────────────┘
```

## Data Flow

### Daily Content Generation Flow

```
1. Content Research Agent
   ├─ Check unused topic inventory
   ├─ If < 10 topics:
   │  ├─ Check budget
   │  ├─ Use Claude to generate 5 topics
   │  └─ Insert into blog_topics_[niche]
   └─ Log cost

2. Blog Generation Agent (per niche)
   ├─ Check rate limit (1/day)
   ├─ Get next unused topic
   ├─ Check budget
   │
   ├─ PRE-GENERATION CHECKS:
   │  ├─ Semantic similarity check (80% = duplicate)
   │  └─ Recent use check (90 days)
   │
   ├─ GENERATE:
   │  └─ Call generate_blog_supabase.py
   │
   ├─ POST-GENERATION CHECKS:
   │  ├─ Word count (min 1000)
   │  ├─ HTML structure (h2, p, ul)
   │  ├─ FAQ count (min 4)
   │  ├─ Internal links (min 1)
   │  ├─ Keyword density (max 3%)
   │  └─ Valid front matter
   │
   ├─ If quality fails:
   │  ├─ Delete content
   │  ├─ Send alert
   │  └─ Don't retry
   │
   ├─ If quality passes:
   │  ├─ Register in published_content
   │  ├─ Log cost
   │  └─ Mark topic as used
   │
   └─ Git commit + Vercel deploy

3. Analytics Optimization Agent
   ├─ Fetch GA4 data (last 30 days)
   ├─ Identify opportunities:
   │  ├─ High traffic + low conversion
   │  ├─ High bounce rate (>70%)
   │  └─ Low engagement (<60s)
   ├─ Check rate limit (3/day)
   ├─ Apply optimizations
   └─ Store metrics
```

## Cost Control Flow

```
Operation Request
    ↓
Check Monthly Budget
    ├─ If > $200 → STOP + Alert
    └─ If OK → Continue
    ↓
Check Daily Budget
    ├─ If > $10 → STOP + Alert
    └─ If OK → Continue
    ↓
Check Rate Limit
    ├─ If exceeded → STOP + Log
    └─ If OK → Continue
    ↓
Execute Operation
    ↓
Log Cost to agent_costs
    ↓
Update Execution Record
```

## Quality Control Flow

```
Topic Selected
    ↓
PRE-GENERATION
    ├─ Semantic Similarity Check
    │  ├─ Compare with all published content
    │  ├─ Use Claude to calculate similarity
    │  └─ If > 80% → SKIP (duplicate)
    │
    └─ Recent Use Check
       ├─ Check last 90 days
       └─ If used → SKIP (too recent)
    ↓
GENERATION
    └─ Call generate_blog_supabase.py
    ↓
POST-GENERATION
    ├─ Word Count Check (min 1000)
    ├─ HTML Structure Check (h2, p, ul)
    ├─ FAQ Count Check (min 4)
    ├─ Internal Links Check (min 1)
    ├─ Keyword Density Check (max 3%)
    └─ Front Matter Check (required fields)
    ↓
If ANY check fails:
    ├─ Delete generated file
    ├─ Send alert with issues
    ├─ Log to agent_executions (quality_failed)
    └─ DON'T RETRY
    ↓
If ALL checks pass:
    ├─ Calculate content hash
    ├─ Register in published_content
    ├─ Log cost
    └─ Mark topic as used
```

## Error Handling Flow

```
Error Occurs
    ↓
Log to agent_executions
    ├─ Update status to 'failed'
    ├─ Store error_log
    └─ Set completed_at
    ↓
Send Alert
    ├─ Format error message
    ├─ Include context (agent, niche)
    ├─ Set priority (high)
    └─ Send to Slack/Discord/Console
    ↓
DON'T RETRY
    └─ Return False (prevents cost spiral)
```

## Database Schema Relationships

```
agent_executions
    ├─ Tracks all agent runs
    ├─ Links to agent_costs (via timestamp)
    └─ References published_content (via metrics)

agent_costs
    ├─ Tracks API spending
    ├─ Aggregated in monthly_costs view
    └─ Aggregated in daily_costs view

published_content
    ├─ Deduplication registry
    ├─ Links to blog_topics (via topic)
    └─ Used by deduplication_checker

niche_metrics
    ├─ Daily performance per niche
    └─ Populated by analytics agent

seo_rankings
    ├─ SEO tracking from GA4
    └─ Populated by analytics agent

blog_topics (per niche)
    ├─ Topic inventory
    ├─ Marked as used after generation
    └─ Populated by content_research_agent

leads (shared)
    ├─ All lead submissions
    └─ Differentiated by source column
```

## Component Dependencies

```
blog_generation_agent.py
    ├─ Requires: generate_blog_supabase.py (existing script)
    ├─ Uses: supabase_client, cost_tracker, quality_checker, deduplication_checker
    └─ Outputs: Markdown files in {Niche}/web/content/blog/

content_research_agent.py
    ├─ Requires: Anthropic API
    ├─ Uses: supabase_client, cost_tracker
    └─ Outputs: Topics in blog_topics_[niche] table

analytics_optimization_agent.py
    ├─ Requires: GA4 API, service account
    ├─ Uses: ga4_client, supabase_client, cost_tracker
    └─ Outputs: Optimized content files, metrics in Supabase

coordinator.py
    ├─ Orchestrates: All agents
    ├─ Uses: supabase_client, alerting
    └─ Outputs: Console logs, alerts

monitoring_dashboard.py
    ├─ Reads: All Supabase tables
    └─ Outputs: Console dashboard
```

## Deployment Architecture

```
Local Development
    ├─ Run agents manually
    ├─ Test with local .env
    └─ Deploy manually with Vercel CLI
    ↓
GitHub Repository
    ├─ Push code changes
    ├─ Trigger GitHub Actions
    └─ Secrets stored in repo settings
    ↓
GitHub Actions Runner
    ├─ Install Python + dependencies
    ├─ Run agents with secrets
    ├─ Commit generated content
    └─ Deploy to Vercel
    ↓
Vercel Production
    ├─ Dentists site
    ├─ Property site
    └─ Future niche sites
```

## Security Model

```
Environment Variables
    ├─ NEVER commit to Git
    ├─ Store in GitHub Secrets
    └─ Load at runtime

API Keys
    ├─ Anthropic: Content generation
    ├─ Supabase: Database access
    ├─ GA4: Analytics data
    └─ Vercel: Deployment

Access Control
    ├─ Supabase: Service role key (full access)
    ├─ GitHub Actions: GITHUB_TOKEN (auto-provided)
    └─ Vercel: Project-specific tokens
```

## Monitoring & Alerting

```
System Events
    ↓
Alert Priority Classification
    ├─ LOW: Info (pipeline start, reports)
    ├─ MEDIUM: Warnings (budget 80%, quality failures)
    └─ HIGH: Critical (failures, budget exceeded)
    ↓
Alert Channels
    ├─ Console (always)
    ├─ Slack (if configured)
    └─ Discord (if configured)
    ↓
Supabase Logging
    ├─ agent_executions (all runs)
    ├─ agent_costs (all spending)
    └─ Queryable for analysis
```

## Scaling Strategy

```
Current: 2 Niches
    ├─ Dentists
    └─ Property
    ↓
Add New Niche
    ├─ Copy folder structure
    ├─ Update config
    ├─ Create Supabase table
    ├─ Add to agent_config.py
    └─ Update GitHub Actions matrix
    ↓
Future: N Niches
    ├─ Shared infrastructure
    ├─ Independent content
    ├─ Unified lead database
    └─ Centralized monitoring
```

## Technology Stack

**Backend:**
- Python 3.11+
- Anthropic Claude Sonnet 4 (content generation)
- Supabase (PostgreSQL database)
- Google Analytics 4 (analytics)

**Frontend:**
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS

**Infrastructure:**
- GitHub Actions (automation)
- Vercel (hosting)
- Slack/Discord (alerts)

**Libraries:**
- `anthropic` - Claude API
- `httpx` - HTTP client
- `google-analytics-data` - GA4 API
- `google-auth` - GCP authentication

---

This architecture is designed for:
- **Autonomy** - Minimal manual intervention
- **Scalability** - Easy to add new niches
- **Cost efficiency** - Hard budget limits
- **Quality** - Automated validation
- **Reliability** - Alert-only error handling
