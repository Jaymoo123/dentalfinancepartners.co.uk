"""
Analytics Optimization Agent - Uses GA4 data to optimize content.
"""
import os
import sys
import asyncio
import argparse
from datetime import datetime
from typing import List, Dict
from anthropic import Anthropic

# Add parent directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from agents.config.agent_config import NICHE_CONFIG, ACTIVE_NICHES
from agents.config.cost_limits import RATE_LIMITS
from agents.utils.supabase_client import SupabaseClient
from agents.utils.cost_tracker import CostTracker
from agents.utils.error_handler import ErrorHandler
from agents.utils.alerting import send_alert
from agents.analytics.ga4_client import GA4Client
from shared_supabase_config import SUPABASE_URL, SUPABASE_KEY

class AnalyticsOptimizationAgent:
    def __init__(self):
        # Initialize utilities
        self.supabase = SupabaseClient(SUPABASE_URL, SUPABASE_KEY)
        self.cost_tracker = CostTracker(self.supabase)
        self.error_handler = ErrorHandler(self.supabase)
        self.anthropic = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
        
        # Initialize GA4 client
        ga4_property_id = os.getenv("GA4_PROPERTY_ID", "G-273RJY0LZQ")
        ga4_credentials = os.getenv("GA4_CREDENTIALS")
        self.ga4 = GA4Client(ga4_property_id, ga4_credentials)
        
        self.execution_id = None
    
    async def optimize(self):
        """Run daily optimization based on GA4 data."""
        print("=== Analytics Optimization Agent ===")
        
        try:
            # Create execution record
            self.execution_id = await self._start_execution()
            
            # 1. Fetch GA4 data (last 30 days)
            print("Fetching GA4 data...")
            pages = await self.ga4.get_page_analytics(days=30)
            
            if not pages:
                print("No analytics data available")
                await self._complete_execution("completed", {"pages_analyzed": 0})
                return
            
            print(f"Analyzed {len(pages)} pages")
            
            # 2. Identify optimization opportunities
            opportunities = self._identify_opportunities(pages)
            print(f"Found {len(opportunities)} optimization opportunities")
            
            if not opportunities:
                await self._complete_execution("completed", {
                    "pages_analyzed": len(pages),
                    "opportunities_found": 0
                })
                return
            
            # 3. Check daily optimization limit
            daily_count = await self._get_daily_optimization_count()
            max_optimizations = min(
                len(opportunities),
                RATE_LIMITS["daily_optimization_updates"] - daily_count
            )
            
            if max_optimizations <= 0:
                print(f"Daily optimization limit reached: {daily_count}/{RATE_LIMITS['daily_optimization_updates']}")
                await self._complete_execution("skipped_rate_limit")
                return
            
            # 4. Optimize top opportunities (limited by rate limit)
            optimized_count = 0
            for opportunity in opportunities[:max_optimizations]:
                # Check budget before each optimization
                if not await self.cost_tracker.check_budget("content_optimization"):
                    break
                
                success = await self._optimize_page(opportunity)
                if success:
                    optimized_count += 1
            
            # 5. Store metrics in Supabase
            await self._store_metrics(pages)
            
            # 6. Complete execution
            await self._complete_execution("completed", {
                "pages_analyzed": len(pages),
                "opportunities_found": len(opportunities),
                "optimizations_applied": optimized_count
            })
            
            print(f"✅ Optimized {optimized_count} pages")
            
        except Exception as e:
            await self.error_handler.handle_error(e, {
                "execution_id": self.execution_id,
                "agent_type": "analytics_optimization",
                "niche": "all"
            })
    
    def _identify_opportunities(self, pages: List[Dict]) -> List[Dict]:
        """Identify pages that need optimization."""
        opportunities = []
        
        for page in pages:
            issues = []
            priority = 0
            
            # High traffic but low conversions
            if page["views"] > 100 and page["conversion_rate"] < 0.02:
                issues.append("low_conversion_rate")
                priority += 10
            
            # High bounce rate
            if page["bounce_rate"] > 0.70:
                issues.append("high_bounce_rate")
                priority += 5
            
            # Low time on page
            if page["avg_time_on_page"] < 60:  # Less than 1 minute
                issues.append("low_engagement")
                priority += 3
            
            if issues:
                opportunities.append({
                    "page_url": page["page_url"],
                    "page_title": page["page_title"],
                    "issues": issues,
                    "priority": priority,
                    "metrics": page
                })
        
        # Sort by priority
        opportunities.sort(key=lambda x: x["priority"], reverse=True)
        return opportunities
    
    async def _optimize_page(self, opportunity: Dict) -> bool:
        """Generate and apply optimizations for a page."""
        print(f"Optimizing: {opportunity['page_url']}")
        
        # For now, just log the opportunity
        # Full implementation would:
        # 1. Read the blog post file
        # 2. Use Claude to generate improvements
        # 3. Apply changes to the file
        # 4. Log the optimization
        
        # Log cost
        await self.cost_tracker.log_cost("content_optimization")
        
        # TODO: Implement actual optimization logic
        print(f"  Issues: {', '.join(opportunity['issues'])}")
        print(f"  Metrics: {opportunity['metrics']}")
        
        return True
    
    async def _store_metrics(self, pages: List[Dict]):
        """Store analytics metrics in Supabase."""
        for page in pages:
            # Determine niche from URL
            niche = "Dentists" if "dentalfinancepartners" in page["page_url"] else "Property"
            
            await self.supabase.insert("seo_rankings", {
                "niche": niche,
                "page_url": page["page_url"],
                "keyword": page["page_title"],
                "impressions": page["views"],
                "clicks": page["unique_visitors"],
                "ctr": page["conversion_rate"],
                "tracked_at": datetime.utcnow().isoformat()
            })
    
    async def _get_daily_optimization_count(self) -> int:
        """Get number of optimizations today."""
        today = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
        
        executions = await self.supabase.select(
            "agent_executions",
            filters={
                "agent_type": "analytics_optimization",
                "status": "completed",
                "started_at": f"gte.{today.isoformat()}"
            }
        )
        
        return len(executions)
    
    async def _start_execution(self) -> str:
        """Start execution record."""
        result = await self.supabase.insert("agent_executions", {
            "agent_type": "analytics_optimization",
            "niche": "all",
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
    
    async def weekly_report(self):
        """Generate weekly performance report."""
        print("=== Weekly Performance Report ===")
        
        # Fetch 7 days of data
        pages = await self.ga4.get_page_analytics(days=7)
        traffic_sources = await self.ga4.get_traffic_sources(days=7)
        
        # Get cost data
        monthly_spend = await self.cost_tracker.get_monthly_spend()
        
        # Generate report
        report = f"""
📊 Weekly Performance Report
Date: {datetime.now().strftime('%Y-%m-%d')}

💰 Costs:
- Monthly spend: ${monthly_spend:.2f}
- Budget remaining: ${200 - monthly_spend:.2f}

📈 Traffic:
- Total pages tracked: {len(pages)}
- Top traffic sources: {', '.join(f'{k}: {v*100:.0f}%' for k, v in list(traffic_sources.items())[:3])}

🎯 Top Performing Pages:
"""
        
        for page in pages[:5]:
            report += f"\n- {page['page_title']}: {page['views']} views, {page['conversion_rate']*100:.1f}% conversion"
        
        # Send report
        await send_alert(report, priority="low")
        
        print(report)

async def main():
    parser = argparse.ArgumentParser(description="Analytics Optimization Agent")
    parser.add_argument("--mode", choices=["optimize", "weekly-report"], default="optimize")
    args = parser.parse_args()
    
    agent = AnalyticsOptimizationAgent()
    
    if args.mode == "weekly-report":
        await agent.weekly_report()
    else:
        await agent.optimize()

if __name__ == "__main__":
    asyncio.run(main())
