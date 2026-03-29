"""
Agent Coordinator - Orchestrates all AI agents.
"""
import os
import sys
import asyncio
import argparse
from datetime import datetime

# Add parent directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from agents.config.agent_config import ACTIVE_NICHES, NICHE_CONFIG
from agents.content_research_agent import ContentResearchAgent
from agents.blog_generation_agent import BlogGenerationAgent
from agents.analytics_optimization_agent import AnalyticsOptimizationAgent
from agents.utils.supabase_client import SupabaseClient
from agents.utils.alerting import send_alert
from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY

class AgentCoordinator:
    def __init__(self):
        self.supabase = SupabaseClient(SUPABASE_URL, SUPABASE_KEY)
    
    async def run_daily_pipeline(self):
        """
        Run daily content pipeline:
        1. Research topics (all niches)
        2. Generate blogs (each niche, sequential)
        3. Deploy to Vercel (handled by blog agent)
        """
        print("=== Daily Content Pipeline ===")
        print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
        await send_alert(
            "🚀 Daily content pipeline started",
            priority="low"
        )
        
        try:
            # Phase 1: Research topics for all niches
            print("\n[Phase 1] Researching topics...")
            for niche in ACTIVE_NICHES:
                if NICHE_CONFIG[niche]["enabled"]:
                    agent = ContentResearchAgent(niche)
                    await agent.research_topics()
            
            # Phase 2: Generate blogs for each niche (sequential)
            print("\n[Phase 2] Generating blogs...")
            for niche in ACTIVE_NICHES:
                if NICHE_CONFIG[niche]["enabled"]:
                    agent = BlogGenerationAgent(niche)
                    await agent.generate(max_posts=1)
            
            # Phase 3: Summary
            print("\n[Phase 3] Pipeline complete")
            
            await send_alert(
                "✅ Daily content pipeline completed",
                priority="low"
            )
            
        except Exception as e:
            await send_alert(
                f"❌ Daily pipeline failed: {str(e)}",
                priority="high"
            )
            raise
    
    async def run_analytics_optimization(self):
        """Run analytics-driven optimization."""
        print("=== Analytics Optimization ===")
        
        await send_alert(
            "📊 Analytics optimization started",
            priority="low"
        )
        
        try:
            agent = AnalyticsOptimizationAgent()
            await agent.optimize()
            
            await send_alert(
                "✅ Analytics optimization completed",
                priority="low"
            )
            
        except Exception as e:
            await send_alert(
                f"❌ Analytics optimization failed: {str(e)}",
                priority="high"
            )
            raise
    
    async def run_weekly_report(self):
        """Generate weekly performance report."""
        print("=== Weekly Report ===")
        
        agent = AnalyticsOptimizationAgent()
        await agent.weekly_report()
    
    async def status_check(self):
        """Check system status and recent activity."""
        print("=== System Status ===")
        
        # Get today's executions
        today = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
        executions = await self.supabase.select(
            "agent_executions",
            filters={"started_at": f"gte.{today.isoformat()}"}
        )
        
        # Get today's costs
        costs = await self.supabase.select(
            "agent_costs",
            filters={"timestamp": f"gte.{today.isoformat()}"}
        )
        
        total_cost = sum(cost.get("cost_usd", 0) for cost in costs)
        
        # Get unused topic counts
        for niche in ACTIVE_NICHES:
            topics = await self.supabase.select(
                NICHE_CONFIG[niche]["blog_topics_table"],
                filters={"used": False}
            )
            print(f"{niche} unused topics: {len(topics)}")
        
        print(f"\nToday's executions: {len(executions)}")
        print(f"Today's cost: ${total_cost:.2f}")
        
        # Show execution breakdown
        status_counts = {}
        for execution in executions:
            status = execution.get("status", "unknown")
            status_counts[status] = status_counts.get(status, 0) + 1
        
        print("\nExecution breakdown:")
        for status, count in status_counts.items():
            print(f"  {status}: {count}")

async def main():
    parser = argparse.ArgumentParser(description="Agent Coordinator")
    parser.add_argument(
        "command",
        choices=["daily-pipeline", "analytics", "weekly-report", "status"],
        help="Command to run"
    )
    args = parser.parse_args()
    
    coordinator = AgentCoordinator()
    
    if args.command == "daily-pipeline":
        await coordinator.run_daily_pipeline()
    elif args.command == "analytics":
        await coordinator.run_analytics_optimization()
    elif args.command == "weekly-report":
        await coordinator.run_weekly_report()
    elif args.command == "status":
        await coordinator.status_check()

if __name__ == "__main__":
    asyncio.run(main())
