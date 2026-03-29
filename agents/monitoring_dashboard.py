"""
Monitoring Dashboard - View agent performance and costs.
"""
import os
import sys
import asyncio
from datetime import datetime, timedelta
from typing import Dict, List

# Add parent directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from agents.utils.supabase_client import SupabaseClient
from agents.config.cost_limits import BUDGET_LIMITS
from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY

class MonitoringDashboard:
    def __init__(self):
        self.supabase = SupabaseClient(SUPABASE_URL, SUPABASE_KEY)
    
    async def display(self):
        """Display comprehensive monitoring dashboard."""
        print("=" * 80)
        print("AGENT MONITORING DASHBOARD")
        print("=" * 80)
        print(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        
        # 1. Budget Status
        await self._display_budget_status()
        
        # 2. Recent Executions
        await self._display_recent_executions()
        
        # 3. Content Generation Stats
        await self._display_content_stats()
        
        # 4. Quality Metrics
        await self._display_quality_metrics()
        
        # 5. System Health
        await self._display_system_health()
        
        print("=" * 80)
    
    async def _display_budget_status(self):
        """Display budget and cost information."""
        print("💰 BUDGET STATUS")
        print("-" * 80)
        
        # Get monthly spending
        month_start = datetime.utcnow().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        monthly_costs = await self.supabase.select(
            "agent_costs",
            filters={"timestamp": f"gte.{month_start.isoformat()}"}
        )
        monthly_spend = sum(cost.get("cost_usd", 0) for cost in monthly_costs)
        
        # Get daily spending
        day_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
        daily_costs = await self.supabase.select(
            "agent_costs",
            filters={"timestamp": f"gte.{day_start.isoformat()}"}
        )
        daily_spend = sum(cost.get("cost_usd", 0) for cost in daily_costs)
        
        monthly_limit = BUDGET_LIMITS["monthly_budget_usd"]
        daily_limit = BUDGET_LIMITS["daily_budget_usd"]
        
        monthly_pct = (monthly_spend / monthly_limit * 100) if monthly_limit > 0 else 0
        daily_pct = (daily_spend / daily_limit * 100) if daily_limit > 0 else 0
        
        print(f"Monthly: ${monthly_spend:.2f} / ${monthly_limit:.2f} ({monthly_pct:.1f}%)")
        print(f"Daily:   ${daily_spend:.2f} / ${daily_limit:.2f} ({daily_pct:.1f}%)")
        print(f"Remaining: ${monthly_limit - monthly_spend:.2f}\n")
    
    async def _display_recent_executions(self):
        """Display recent agent executions."""
        print("🤖 RECENT EXECUTIONS (Last 24h)")
        print("-" * 80)
        
        yesterday = datetime.utcnow() - timedelta(days=1)
        executions = await self.supabase.select(
            "agent_executions",
            filters={"started_at": f"gte.{yesterday.isoformat()}"},
            order="started_at.desc",
            limit=20
        )
        
        if not executions:
            print("No recent executions\n")
            return
        
        for execution in executions:
            agent_type = execution.get("agent_type", "unknown")
            niche = execution.get("niche", "N/A")
            status = execution.get("status", "unknown")
            started = execution.get("started_at", "")
            
            status_emoji = {
                "completed": "✅",
                "failed": "❌",
                "running": "🔄",
                "skipped_duplicate": "⏭️",
                "quality_failed": "⚠️",
                "budget_exceeded": "💸"
            }.get(status, "❓")
            
            print(f"{status_emoji} {agent_type:20} | {niche:10} | {status:20} | {started[:19]}")
        
        print()
    
    async def _display_content_stats(self):
        """Display content generation statistics."""
        print("📝 CONTENT GENERATION")
        print("-" * 80)
        
        for niche in ["Dentists", "Property"]:
            # Get published content count
            published = await self.supabase.select(
                "published_content",
                filters={"niche": niche.lower()}
            )
            
            # Get unused topics
            table_name = "blog_topics" if niche == "Dentists" else "blog_topics_property"
            unused_topics = await self.supabase.select(
                table_name,
                filters={"used": False}
            )
            
            print(f"{niche:10} | Published: {len(published):3} | Unused topics: {len(unused_topics):3}")
        
        print()
    
    async def _display_quality_metrics(self):
        """Display content quality metrics."""
        print("✨ QUALITY METRICS (Last 7 days)")
        print("-" * 80)
        
        week_ago = datetime.utcnow() - timedelta(days=7)
        executions = await self.supabase.select(
            "agent_executions",
            filters={
                "agent_type": "blog_generation",
                "started_at": f"gte.{week_ago.isoformat()}"
            }
        )
        
        total = len(executions)
        completed = sum(1 for e in executions if e.get("status") == "completed")
        quality_failed = sum(1 for e in executions if e.get("status") == "quality_failed")
        duplicates = sum(1 for e in executions if "duplicate" in e.get("status", ""))
        
        if total > 0:
            success_rate = (completed / total * 100)
            print(f"Total attempts:    {total}")
            print(f"Successful:        {completed} ({success_rate:.1f}%)")
            print(f"Quality failures:  {quality_failed}")
            print(f"Duplicates caught: {duplicates}")
        else:
            print("No blog generation attempts in the last 7 days")
        
        print()
    
    async def _display_system_health(self):
        """Display system health indicators."""
        print("🏥 SYSTEM HEALTH")
        print("-" * 80)
        
        # Check for recent failures
        day_ago = datetime.utcnow() - timedelta(days=1)
        failures = await self.supabase.select(
            "agent_executions",
            filters={
                "status": "failed",
                "started_at": f"gte.{day_ago.isoformat()}"
            }
        )
        
        if failures:
            print(f"⚠️  {len(failures)} failures in last 24h")
            for failure in failures[:3]:
                error = failure.get("error_log", "Unknown error")
                print(f"   - {failure.get('agent_type')}: {error[:60]}...")
        else:
            print("✅ No failures in last 24h")
        
        # Check budget status
        monthly_spend = await self._get_monthly_spend()
        monthly_limit = BUDGET_LIMITS["monthly_budget_usd"]
        
        if monthly_spend > monthly_limit * 0.9:
            print(f"⚠️  Budget at {(monthly_spend/monthly_limit)*100:.0f}% - approaching limit")
        else:
            print(f"✅ Budget healthy: {(monthly_spend/monthly_limit)*100:.0f}% used")
        
        print()
    
    async def _get_monthly_spend(self) -> float:
        """Get current month spending."""
        month_start = datetime.utcnow().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        costs = await self.supabase.select(
            "agent_costs",
            filters={"timestamp": f"gte.{month_start.isoformat()}"}
        )
        return sum(cost.get("cost_usd", 0) for cost in costs)

async def main():
    parser = argparse.ArgumentParser(description="Agent Monitoring Dashboard")
    parser.add_argument(
        "command",
        nargs="?",
        choices=["daily-pipeline", "analytics", "weekly-report", "status"],
        default="status",
        help="Command to run (default: status)"
    )
    args = parser.parse_args()
    
    if args.command == "status":
        # Just show dashboard
        dashboard = MonitoringDashboard()
        await dashboard.display()
    else:
        # Run coordinator command
        from agents.coordinator import AgentCoordinator
        coordinator = AgentCoordinator()
        
        if args.command == "daily-pipeline":
            await coordinator.run_daily_pipeline()
        elif args.command == "analytics":
            await coordinator.run_analytics_optimization()
        elif args.command == "weekly-report":
            await coordinator.run_weekly_report()

if __name__ == "__main__":
    asyncio.run(main())
