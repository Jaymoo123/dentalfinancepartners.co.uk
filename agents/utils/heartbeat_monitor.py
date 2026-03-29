"""
Heartbeat Monitor - Detects when system stops executing.
"""
from datetime import datetime, timedelta
from typing import Dict, Optional
from agents.utils.supabase_client import SupabaseClient
from agents.utils.alerting import send_alert

class HeartbeatMonitor:
    def __init__(self, supabase: SupabaseClient):
        self.supabase = supabase
        self.expected_interval_hours = 24  # Expect execution every 24 hours
        self.alert_threshold_hours = 36    # Alert if no execution for 36 hours
    
    async def check_heartbeat(self) -> Dict:
        """
        Check if system is executing as expected.
        Returns status and metrics.
        """
        # Get most recent execution
        executions = await self.supabase.select(
            "agent_executions",
            order="started_at.desc",
            limit=1
        )
        
        if not executions:
            # No executions ever - system never started
            await self._handle_no_executions()
            return {
                "status": "never_started",
                "last_execution": None,
                "hours_since_last": None
            }
        
        last_execution = executions[0]
        last_time = datetime.fromisoformat(last_execution["started_at"].replace("Z", "+00:00"))
        now = datetime.utcnow().replace(tzinfo=last_time.tzinfo)
        hours_since = (now - last_time).total_seconds() / 3600
        
        # Check if heartbeat is healthy
        if hours_since > self.alert_threshold_hours:
            await self._handle_stalled(last_execution, hours_since)
            status = "stalled"
        elif hours_since > self.expected_interval_hours * 1.5:
            await self._handle_delayed(last_execution, hours_since)
            status = "delayed"
        else:
            status = "healthy"
        
        return {
            "status": status,
            "last_execution": last_execution,
            "hours_since_last": round(hours_since, 1),
            "expected_interval": self.expected_interval_hours
        }
    
    async def _handle_no_executions(self):
        """Handle case where system has never executed."""
        await send_alert(
            "🚨 SYSTEM NOT STARTED: No agent executions found\n"
            "Possible causes:\n"
            "1. GitHub Actions not enabled\n"
            "2. Workflows not configured\n"
            "3. Database migration not run\n"
            "Action: Check GitHub Actions tab and enable workflows",
            priority="high"
        )
    
    async def _handle_stalled(self, last_execution: Dict, hours: float):
        """Handle stalled system (>36 hours since last execution)."""
        agent_type = last_execution.get("agent_type", "unknown")
        status = last_execution.get("status", "unknown")
        
        await send_alert(
            f"🚨 SYSTEM STALLED: No execution for {hours:.0f} hours\n"
            f"Last execution: {agent_type} ({status})\n"
            f"Expected: Every {self.expected_interval_hours} hours\n\n"
            f"Possible causes:\n"
            f"1. GitHub Actions workflow disabled\n"
            f"2. Budget exceeded (check monitoring dashboard)\n"
            f"3. Critical error blocking execution\n"
            f"4. Deployment failure\n\n"
            f"Action required:\n"
            f"1. Check GitHub Actions: https://github.com/[repo]/actions\n"
            f"2. Run: python agents/monitoring_dashboard.py status\n"
            f"3. Check for errors in last execution logs",
            priority="high"
        )
    
    async def _handle_delayed(self, last_execution: Dict, hours: float):
        """Handle delayed execution (>36 hours but <48 hours)."""
        await send_alert(
            f"⚠️ EXECUTION DELAYED: {hours:.0f} hours since last run\n"
            f"Expected: Every {self.expected_interval_hours} hours\n"
            f"Check GitHub Actions for issues",
            priority="medium"
        )
    
    async def get_execution_reliability(self, days: int = 7) -> Dict:
        """
        Calculate execution reliability over last N days.
        Returns metrics about execution consistency.
        """
        days_ago = datetime.utcnow() - timedelta(days=days)
        
        executions = await self.supabase.select(
            "agent_executions",
            filters={"started_at": f"gte.{days_ago.isoformat()}"}
        )
        
        if not executions:
            return {
                "reliability": 0.0,
                "expected_executions": days,
                "actual_executions": 0,
                "success_rate": 0.0
            }
        
        # Count successful executions
        successful = sum(1 for e in executions if e.get("status") == "completed")
        
        # Calculate reliability (executions per day vs expected)
        expected_executions = days
        actual_execution_days = len(set(
            datetime.fromisoformat(e["started_at"].replace("Z", "")).date()
            for e in executions
        ))
        
        reliability = actual_execution_days / expected_executions
        success_rate = successful / len(executions) if executions else 0
        
        return {
            "reliability": round(reliability, 2),
            "expected_executions": expected_executions,
            "actual_execution_days": actual_execution_days,
            "total_executions": len(executions),
            "successful_executions": successful,
            "success_rate": round(success_rate, 2)
        }
