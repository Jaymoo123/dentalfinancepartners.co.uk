"""
Risk Manager Agent - Central health monitoring and risk prevention.
Runs every 6 hours to check system health and prevent issues.
"""
import os
import sys
import asyncio
import argparse
from datetime import datetime

# Add parent directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from agents.config.agent_config import NICHE_CONFIG, ACTIVE_NICHES
from agents.config.cost_limits import BUDGET_LIMITS
from agents.utils.supabase_client import SupabaseClient
from agents.utils.anomaly_detector import AnomalyDetector
from agents.utils.topic_monitor import TopicInventoryMonitor
from agents.utils.heartbeat_monitor import HeartbeatMonitor
from agents.utils.cost_tracker import CostTracker
from agents.utils.alerting import send_alert
from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY

class RiskManagerAgent:
    def __init__(self):
        # Initialize utilities
        self.supabase = SupabaseClient(SUPABASE_URL, SUPABASE_KEY)
        self.anomaly_detector = AnomalyDetector(self.supabase)
        self.topic_monitor = TopicInventoryMonitor(self.supabase)
        self.heartbeat_monitor = HeartbeatMonitor(self.supabase)
        self.cost_tracker = CostTracker(self.supabase)
        
        self.execution_id = None
        self.risks_detected = []
    
    async def run_health_check(self):
        """
        Run comprehensive system health check.
        Checks for all potential risks and takes action.
        """
        print("=" * 80)
        print("RISK MANAGER AGENT - System Health Check")
        print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 80)
        print()
        
        try:
            # Create execution record
            self.execution_id = await self._start_execution()
            
            # Run all health checks
            await self._check_budget_status()
            await self._check_topic_inventory()
            await self._check_anomalies()
            await self._check_heartbeat()
            await self._check_deployment_health()
            await self._check_database_health()
            
            # Generate summary
            await self._generate_summary()
            
            # Complete execution
            await self._complete_execution("completed", {
                "risks_detected": len(self.risks_detected),
                "risk_types": [r["type"] for r in self.risks_detected]
            })
            
            print()
            print("=" * 80)
            if self.risks_detected:
                print(f"⚠️  {len(self.risks_detected)} risk(s) detected - see alerts")
            else:
                print("✅ All systems healthy")
            print("=" * 80)
            
        except Exception as e:
            print(f"❌ Risk manager failed: {e}")
            await send_alert(
                f"❌ Risk Manager Agent failed: {e}",
                priority="high"
            )
    
    async def _check_budget_status(self):
        """Check budget and spending."""
        print("1. Checking budget status...")
        
        monthly_spend = await self.cost_tracker.get_monthly_spend()
        daily_spend = await self.cost_tracker.get_daily_spend()
        
        monthly_limit = BUDGET_LIMITS["monthly_budget_usd"]
        daily_limit = BUDGET_LIMITS["daily_budget_usd"]
        
        monthly_pct = (monthly_spend / monthly_limit) if monthly_limit > 0 else 0
        daily_pct = (daily_spend / daily_limit) if daily_limit > 0 else 0
        
        print(f"   Monthly: ${monthly_spend:.2f} / ${monthly_limit:.2f} ({monthly_pct*100:.0f}%)")
        print(f"   Daily: ${daily_spend:.2f} / ${daily_limit:.2f} ({daily_pct*100:.0f}%)")
        
        # Check thresholds
        if monthly_pct >= 1.0:
            self.risks_detected.append({
                "type": "budget_exceeded_monthly",
                "severity": "critical",
                "message": f"Monthly budget exceeded: ${monthly_spend:.2f} / ${monthly_limit:.2f}"
            })
        elif monthly_pct >= 0.90:
            self.risks_detected.append({
                "type": "budget_warning_monthly",
                "severity": "high",
                "message": f"Monthly budget at {monthly_pct*100:.0f}%: ${monthly_spend:.2f} / ${monthly_limit:.2f}"
            })
        
        if daily_pct >= 1.0:
            self.risks_detected.append({
                "type": "budget_exceeded_daily",
                "severity": "high",
                "message": f"Daily budget exceeded: ${daily_spend:.2f} / ${daily_limit:.2f}"
            })
        
        if not self.risks_detected:
            print("   ✅ Budget healthy")
        print()
    
    async def _check_topic_inventory(self):
        """Check topic inventory for all niches."""
        print("2. Checking topic inventory...")
        
        for niche in ACTIVE_NICHES:
            if not NICHE_CONFIG[niche]["enabled"]:
                continue
            
            inventory = await self.topic_monitor.check_inventory(
                niche,
                NICHE_CONFIG[niche]["blog_topics_table"]
            )
            
            print(f"   {niche}: {inventory['unused_count']} topics ({inventory['status']})")
            
            if inventory["status"] == "critical":
                self.risks_detected.append({
                    "type": "topic_shortage_critical",
                    "severity": "critical",
                    "message": f"{niche} has only {inventory['unused_count']} topics",
                    "niche": niche
                })
            elif inventory["status"] == "warning":
                self.risks_detected.append({
                    "type": "topic_shortage_warning",
                    "severity": "medium",
                    "message": f"{niche} has {inventory['unused_count']} topics (~{inventory['days_remaining']:.0f} days)",
                    "niche": niche
                })
        
        if not any(r["type"].startswith("topic_shortage") for r in self.risks_detected):
            print("   ✅ Topic inventory healthy")
        print()
    
    async def _check_anomalies(self):
        """Check for anomalous behavior."""
        print("3. Checking for anomalies...")
        
        anomalies = await self.anomaly_detector.check_for_anomalies()
        
        if anomalies:
            print(f"   ⚠️  {len(anomalies)} anomaly(ies) detected")
            for anomaly in anomalies:
                print(f"      - {anomaly['type']}: {anomaly['message']}")
                self.risks_detected.append(anomaly)
        else:
            print("   ✅ No anomalies detected")
        print()
    
    async def _check_heartbeat(self):
        """Check system execution heartbeat."""
        print("4. Checking system heartbeat...")
        
        heartbeat = await self.heartbeat_monitor.check_heartbeat()
        
        print(f"   Status: {heartbeat['status']}")
        if heartbeat['hours_since_last']:
            print(f"   Last execution: {heartbeat['hours_since_last']:.1f} hours ago")
        
        if heartbeat["status"] == "stalled":
            self.risks_detected.append({
                "type": "system_stalled",
                "severity": "critical",
                "message": f"No execution for {heartbeat['hours_since_last']:.0f} hours"
            })
        elif heartbeat["status"] == "delayed":
            self.risks_detected.append({
                "type": "system_delayed",
                "severity": "medium",
                "message": f"Execution delayed: {heartbeat['hours_since_last']:.0f} hours since last run"
            })
        elif heartbeat["status"] == "never_started":
            self.risks_detected.append({
                "type": "system_never_started",
                "severity": "critical",
                "message": "System has never executed"
            })
        else:
            print("   ✅ Heartbeat healthy")
        print()
    
    async def _check_deployment_health(self):
        """Check deployment success rate."""
        print("5. Checking deployment health...")
        
        # Get recent blog generation executions
        from datetime import timedelta
        week_ago = datetime.utcnow() - timedelta(days=7)
        
        executions = await self.supabase.select(
            "agent_executions",
            filters={
                "agent_type": "blog_generation",
                "started_at": f"gte.{week_ago.isoformat()}"
            }
        )
        
        if not executions:
            print("   ℹ️  No recent blog generations")
            print()
            return
        
        completed = sum(1 for e in executions if e.get("status") == "completed")
        success_rate = completed / len(executions)
        
        print(f"   Success rate: {success_rate*100:.0f}% ({completed}/{len(executions)})")
        
        if success_rate < 0.50:
            self.risks_detected.append({
                "type": "low_deployment_success",
                "severity": "high",
                "message": f"Low deployment success rate: {success_rate*100:.0f}%"
            })
        elif success_rate < 0.70:
            self.risks_detected.append({
                "type": "deployment_issues",
                "severity": "medium",
                "message": f"Deployment success rate below target: {success_rate*100:.0f}%"
            })
        else:
            print("   ✅ Deployment health good")
        print()
    
    async def _check_database_health(self):
        """Check database connectivity and performance."""
        print("6. Checking database health...")
        
        try:
            import time
            start = time.time()
            
            # Test query
            await self.supabase.select("agent_executions", limit=1)
            
            latency = (time.time() - start) * 1000  # ms
            
            print(f"   Latency: {latency:.0f}ms")
            
            if latency > 2000:
                self.risks_detected.append({
                    "type": "database_slow",
                    "severity": "medium",
                    "message": f"Database latency high: {latency:.0f}ms"
                })
            else:
                print("   ✅ Database healthy")
        except Exception as e:
            print(f"   ❌ Database error: {e}")
            self.risks_detected.append({
                "type": "database_error",
                "severity": "critical",
                "message": f"Database connection failed: {e}"
            })
        print()
    
    async def _generate_summary(self):
        """Generate and send risk summary."""
        if not self.risks_detected:
            return
        
        # Group by severity
        critical = [r for r in self.risks_detected if r["severity"] == "critical"]
        high = [r for r in self.risks_detected if r["severity"] == "high"]
        medium = [r for r in self.risks_detected if r["severity"] == "medium"]
        
        summary = "🏥 RISK MANAGER REPORT\n\n"
        
        if critical:
            summary += f"🚨 CRITICAL ({len(critical)}):\n"
            for risk in critical:
                summary += f"  - {risk['message']}\n"
            summary += "\n"
        
        if high:
            summary += f"⚠️ HIGH ({len(high)}):\n"
            for risk in high:
                summary += f"  - {risk['message']}\n"
            summary += "\n"
        
        if medium:
            summary += f"ℹ️ MEDIUM ({len(medium)}):\n"
            for risk in medium:
                summary += f"  - {risk['message']}\n"
            summary += "\n"
        
        summary += f"Total risks: {len(self.risks_detected)}"
        
        # Determine priority
        if critical:
            priority = "high"
        elif high:
            priority = "high"
        else:
            priority = "medium"
        
        await send_alert(summary, priority=priority)
    
    async def _start_execution(self) -> str:
        """Start execution record."""
        result = await self.supabase.insert("agent_executions", {
            "agent_type": "risk_manager",
            "niche": "system",
            "status": "running",
            "started_at": datetime.utcnow().isoformat()
        })
        return result["id"]
    
    async def _complete_execution(self, status: str, metrics: dict = None):
        """Complete execution record."""
        if not self.execution_id:
            return
        
        await self.supabase.update(
            "agent_executions",
            filters={"id": self.execution_id},
            data={
                "status": status,
                "completed_at": datetime.utcnow().isoformat(),
                "metrics": metrics or {}
            }
        )

async def main():
    parser = argparse.ArgumentParser(description="Risk Manager Agent")
    args = parser.parse_args()
    
    agent = RiskManagerAgent()
    await agent.run_health_check()

if __name__ == "__main__":
    asyncio.run(main())
