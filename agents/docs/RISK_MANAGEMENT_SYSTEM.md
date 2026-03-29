## Risk Management System - Complete Guide

**Date:** March 28, 2026  
**Status:** ✅ Implemented

---

## Overview

The Risk Management System provides proactive monitoring and prevention of system failures, cost overruns, and operational issues. It consists of 6 specialized utilities and 1 central Risk Manager Agent.

---

## Components

### 1. Deployment Manager (`agents/utils/deployment_manager.py`)

**Purpose:** Ensures deployments succeed and handles rollback.

**Features:**
- Deploys to Vercel using CLI
- Waits for deployment to propagate (30s)
- Verifies new content is accessible (HTTP 200 check)
- Rolls back Git commit if deployment fails
- Sends alerts on failures

**Usage:**
```python
from agents.utils.deployment_manager import DeploymentManager

manager = DeploymentManager(
    niche="Dentists",
    niche_path="c:/Users/user/Documents/Accounting/Dentists",
    site_url="https://dentalfinancepartners.co.uk"
)

success = await manager.deploy_and_verify(slug="new-blog-post")
if not success:
    await manager.rollback_commit("Add new blog post")
```

**Benefits:**
- No orphaned commits
- Automatic recovery
- Better visibility into deployment issues

---

### 2. Anomaly Detector (`agents/utils/anomaly_detector.py`)

**Purpose:** Detects unusual patterns and prevents cost spirals.

**Checks:**
- **Operation rate:** >20 ops/hour (normal: 2-3/hour)
- **Cost spike:** >$0.50/hour (normal: $0.05/hour)
- **Failure rate:** >40% failures in 6 hours
- **Duplicate operations:** Same operation 5+ times in 10 minutes

**Usage:**
```python
from agents.utils.anomaly_detector import AnomalyDetector

detector = AnomalyDetector(supabase)
anomalies = await detector.check_for_anomalies()

# Check if system should pause
should_pause = await detector.should_pause_operations()
if should_pause:
    # Stop all operations
    pass
```

**Benefits:**
- Prevents runaway costs
- Catches bugs early
- Automatic safety brake

---

### 3. Topic Inventory Monitor (`agents/utils/topic_monitor.py`)

**Purpose:** Ensures we never run out of topics.

**Features:**
- Checks unused topic count per niche
- Calculates usage velocity (topics/day)
- Predicts days until exhaustion
- Auto-triggers research agent if low
- Provides fallback evergreen topics

**Thresholds:**
- **Critical:** <3 topics
- **Warning:** <5 topics
- **Healthy:** ≥10 topics

**Usage:**
```python
from agents.utils.topic_monitor import TopicInventoryMonitor

monitor = TopicInventoryMonitor(supabase)

# Check inventory
inventory = await monitor.check_inventory("Dentists", "blog_topics")

# Auto-trigger research if needed
triggered = await monitor.auto_trigger_research("Dentists", "blog_topics")
```

**Benefits:**
- Never runs dry
- Proactive alerts
- Maintains generation cadence

---

### 4. Rate Limiter (`agents/utils/rate_limiter.py`)

**Purpose:** Prevents API rate limit violations.

**Features:**
- Tracks requests per minute
- Blocks if approaching limit (10 req/min)
- Implements automatic backoff
- Thread-safe with async lock

**Usage:**
```python
from agents.utils.rate_limiter import get_rate_limiter

rate_limiter = get_rate_limiter()

# Before making API call
await rate_limiter.wait_if_needed("anthropic_api")

# Make API call
response = await anthropic.messages.create(...)
```

**Benefits:**
- Prevents API bans
- Graceful degradation
- Automatic throttling

---

### 5. Heartbeat Monitor (`agents/utils/heartbeat_monitor.py`)

**Purpose:** Detects when system stops executing.

**Features:**
- Checks last execution time
- Alerts if no execution for 36 hours
- Calculates execution reliability
- Provides diagnostic information

**Status Levels:**
- **Healthy:** Execution within 24 hours
- **Delayed:** 24-36 hours since last execution
- **Stalled:** >36 hours since last execution
- **Never started:** No executions ever

**Usage:**
```python
from agents.utils.heartbeat_monitor import HeartbeatMonitor

monitor = HeartbeatMonitor(supabase)

# Check heartbeat
status = await monitor.check_heartbeat()

# Get reliability metrics
reliability = await monitor.get_execution_reliability(days=7)
```

**Benefits:**
- Catches silent failures
- Proactive monitoring
- Reduces downtime

---

### 6. Risk Manager Agent (`agents/risk_manager_agent.py`)

**Purpose:** Central health monitoring and risk prevention.

**Runs:** Every 6 hours via GitHub Actions

**Checks:**
1. **Budget status** - Monthly/daily spending vs limits
2. **Topic inventory** - All niches
3. **Anomalies** - Unusual patterns
4. **Heartbeat** - System execution
5. **Deployment health** - Success rate
6. **Database health** - Connectivity and latency

**Risk Levels:**
- **Critical:** Immediate action required, may pause system
- **High:** Urgent attention needed
- **Medium:** Monitor closely

**Usage:**
```bash
# Manual run
python agents/risk_manager_agent.py

# Scheduled via GitHub Actions (every 6 hours)
```

**Output Example:**
```
================================================================================
RISK MANAGER AGENT - System Health Check
Time: 2026-03-28 14:30:00
================================================================================

1. Checking budget status...
   Monthly: $8.50 / $200.00 (4%)
   Daily: $0.25 / $10.00 (3%)
   ✅ Budget healthy

2. Checking topic inventory...
   Dentists: 12 topics (healthy)
   Property: 4 topics (warning)
   ⚠️  Property approaching shortage

3. Checking for anomalies...
   ✅ No anomalies detected

4. Checking system heartbeat...
   Status: healthy
   Last execution: 2.5 hours ago
   ✅ Heartbeat healthy

5. Checking deployment health...
   Success rate: 100% (7/7)
   ✅ Deployment health good

6. Checking database health...
   Latency: 125ms
   ✅ Database healthy

================================================================================
⚠️  1 risk(s) detected - see alerts
================================================================================
```

---

## GitHub Actions Schedule

**Risk Manager Workflow** (`.github/workflows/risk-manager.yml`):
- **Schedule:** Every 6 hours (0:00, 6:00, 12:00, 18:00 UTC)
- **Trigger:** Automatic + manual
- **Duration:** ~30 seconds

**Combined Schedule:**
```
00:00 UTC - Risk Manager
06:00 UTC - Content Pipeline + Risk Manager
08:00 UTC - Analytics Optimization
12:00 UTC - Risk Manager
18:00 UTC - Risk Manager
02:00 UTC Sunday - Data Cleanup
09:00 UTC Monday - Performance Report
```

---

## Alert Examples

### Critical Budget Alert
```
🚨 CRITICAL ANOMALY: Cost spike detected: $1.25/hour (normal: $0.05/hour)

Possible causes:
- Infinite loop in agent code
- API rate limit bypass
- Duplicate operations

Action: Check agent_executions table for repeated operations
```

### Topic Shortage Alert
```
🚨 CRITICAL: Dentists has only 2 topics remaining!

Action required:
1. Run: python agents/content_research_agent.py --niche Dentists
2. Or add topics manually to Supabase
3. System will use fallback topics if available
```

### System Stalled Alert
```
🚨 SYSTEM STALLED: No execution for 48 hours

Last execution: blog_generation (completed)
Expected: Every 24 hours

Possible causes:
1. GitHub Actions workflow disabled
2. Budget exceeded (check monitoring dashboard)
3. Critical error blocking execution
4. Deployment failure

Action required:
1. Check GitHub Actions: https://github.com/[repo]/actions
2. Run: python agents/monitoring_dashboard.py status
3. Check for errors in last execution logs
```

---

## Integration with Existing Agents

### Blog Generation Agent

**Before:**
```python
# Generate blog
result = subprocess.run(["python", "generate_blog_supabase.py"])

# Commit and deploy
subprocess.run(["git", "add", "."])
subprocess.run(["git", "commit", "-m", "Add blog"])
subprocess.run(["git", "push"])
subprocess.run(["vercel", "deploy", "--prod"])
```

**After:**
```python
from agents.utils.deployment_manager import DeploymentManager
from agents.utils.anomaly_detector import AnomalyDetector

# Check for anomalies first
detector = AnomalyDetector(supabase)
if await detector.should_pause_operations():
    print("System paused due to anomaly")
    return False

# Generate blog
result = subprocess.run(["python", "generate_blog_supabase.py"])

# Deploy with verification
manager = DeploymentManager(niche, niche_path, site_url)
success = await manager.deploy_and_verify(slug)

if not success:
    # Rollback on failure
    await manager.rollback_commit(f"Add blog: {slug}")
    return False
```

---

## Monitoring Dashboard Integration

The monitoring dashboard now shows risk metrics:

```bash
python agents/monitoring_dashboard.py status
```

**New sections:**
- **Risk Status:** Current risks detected
- **Topic Inventory:** Per-niche status
- **Anomaly History:** Recent anomalies
- **Heartbeat:** Last execution time
- **Deployment Success:** 7-day success rate

---

## Cost Impact

**Additional costs per month:**

| Component | Cost | Frequency | Monthly |
|-----------|------|-----------|---------|
| Risk Manager | $0.01 | 4x/day | $1.20 |
| Anomaly checks | $0.005 | Automatic | Included |
| Topic monitoring | $0.00 | Free | $0.00 |
| **Total** | | | **$1.20/month** |

**Value:**
- Prevents cost spirals (potential savings: $100+)
- Reduces downtime (value: priceless)
- Proactive issue detection

**Net benefit:** Extremely positive ROI

---

## Configuration

### Anomaly Thresholds

Edit `agents/utils/anomaly_detector.py`:

```python
self.thresholds = {
    "max_operations_per_hour": 20,  # Adjust based on your needs
    "max_cost_per_hour": 0.50,
    "max_failure_rate": 0.40,
    "max_duplicate_operations": 5,
}
```

### Topic Inventory Thresholds

Edit `agents/utils/topic_monitor.py`:

```python
self.thresholds = {
    "critical": 3,  # Adjust based on generation frequency
    "warning": 5,
    "healthy": 10,
}
```

### Heartbeat Timing

Edit `agents/utils/heartbeat_monitor.py`:

```python
self.expected_interval_hours = 24  # Expected execution frequency
self.alert_threshold_hours = 36    # When to alert
```

---

## Testing

### Test Anomaly Detection

```bash
# Simulate high operation rate
for i in {1..25}; do
  python agents/content_research_agent.py --niche Dentists &
done

# Run anomaly detector
python -c "
import asyncio
from agents.utils.supabase_client import SupabaseClient
from agents.utils.anomaly_detector import AnomalyDetector
from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY

async def test():
    supabase = SupabaseClient(SUPABASE_URL, SUPABASE_KEY)
    detector = AnomalyDetector(supabase)
    anomalies = await detector.check_for_anomalies()
    print(f'Detected {len(anomalies)} anomalies')

asyncio.run(test())
"
```

### Test Topic Monitor

```bash
# Check inventory
python -c "
import asyncio
from agents.utils.supabase_client import SupabaseClient
from agents.utils.topic_monitor import TopicInventoryMonitor
from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY

async def test():
    supabase = SupabaseClient(SUPABASE_URL, SUPABASE_KEY)
    monitor = TopicInventoryMonitor(supabase)
    inventory = await monitor.check_inventory('Dentists', 'blog_topics')
    print(f'Status: {inventory[\"status\"]}')
    print(f'Unused: {inventory[\"unused_count\"]}')
    print(f'Days remaining: {inventory[\"days_remaining\"]}')

asyncio.run(test())
"
```

### Test Risk Manager

```bash
# Run full health check
python agents/risk_manager_agent.py
```

---

## Troubleshooting

### False Positive Anomalies

**Issue:** Anomaly detector triggering on normal operations

**Fix:**
1. Review thresholds in `anomaly_detector.py`
2. Adjust based on your actual usage patterns
3. Check `agent_executions` table for patterns

### Topic Monitor Not Triggering

**Issue:** Running out of topics despite monitor

**Fix:**
1. Check monitor thresholds (may be too low)
2. Verify research agent is working
3. Add fallback topics manually

### Risk Manager Not Running

**Issue:** No risk manager executions

**Fix:**
1. Check GitHub Actions enabled
2. Verify workflow file exists
3. Check secrets configured
4. Run manually: `python agents/risk_manager_agent.py`

---

## Summary

**Components implemented:**
1. ✅ Deployment Manager - Verifies deployments
2. ✅ Anomaly Detector - Prevents cost spirals
3. ✅ Topic Monitor - Prevents topic exhaustion
4. ✅ Rate Limiter - Prevents API bans
5. ✅ Heartbeat Monitor - Catches silent failures
6. ✅ Risk Manager Agent - Central monitoring

**Benefits:**
- **Robustness:** System self-monitors and self-heals
- **Cost control:** Prevents runaway spending
- **Uptime:** Catches failures early
- **Peace of mind:** Proactive alerts

**Status:** Ready for deployment
