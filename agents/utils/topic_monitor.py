"""
Topic Inventory Monitor - Ensures we never run out of topics.
"""
from datetime import datetime, timedelta
from typing import Dict
from agents.utils.supabase_client import SupabaseClient
from agents.utils.alerting import send_alert

class TopicInventoryMonitor:
    def __init__(self, supabase: SupabaseClient):
        self.supabase = supabase
        self.thresholds = {
            "critical": 3,  # < 3 topics = critical
            "warning": 5,   # < 5 topics = warning
            "healthy": 10,  # >= 10 topics = healthy
        }
    
    async def check_inventory(self, niche: str, blog_topics_table: str) -> Dict:
        """
        Check topic inventory for a niche.
        Returns status and metrics.
        """
        # Get unused topic count
        unused_topics = await self.supabase.select(
            blog_topics_table,
            filters={"used": False}
        )
        
        unused_count = len(unused_topics)
        
        # Calculate usage velocity (topics used in last 7 days)
        week_ago = datetime.utcnow() - timedelta(days=7)
        used_topics = await self.supabase.select(
            blog_topics_table,
            filters={
                "used": True,
                "generated_at": f"gte.{week_ago.isoformat()}"
            }
        )
        
        weekly_usage = len(used_topics)
        daily_usage = weekly_usage / 7 if weekly_usage > 0 else 1
        
        # Predict days until exhaustion
        days_remaining = unused_count / daily_usage if daily_usage > 0 else 999
        
        # Determine status
        if unused_count < self.thresholds["critical"]:
            status = "critical"
            await self._handle_critical(niche, unused_count)
        elif unused_count < self.thresholds["warning"]:
            status = "warning"
            await self._handle_warning(niche, unused_count, days_remaining)
        else:
            status = "healthy"
        
        return {
            "niche": niche,
            "status": status,
            "unused_count": unused_count,
            "weekly_usage": weekly_usage,
            "daily_usage": round(daily_usage, 2),
            "days_remaining": round(days_remaining, 1)
        }
    
    async def _handle_critical(self, niche: str, count: int):
        """Handle critical topic shortage."""
        await send_alert(
            f"🚨 CRITICAL: {niche} has only {count} topics remaining!\n"
            f"Action required:\n"
            f"1. Run: python agents/content_research_agent.py --niche {niche}\n"
            f"2. Or add topics manually to Supabase\n"
            f"3. System will use fallback topics if available",
            priority="high"
        )
    
    async def _handle_warning(self, niche: str, count: int, days_remaining: float):
        """Handle warning-level topic shortage."""
        await send_alert(
            f"⚠️ WARNING: {niche} has {count} topics remaining\n"
            f"Estimated {days_remaining:.0f} days until exhaustion\n"
            f"Consider running research agent soon",
            priority="medium"
        )
    
    async def get_fallback_topics(self, niche: str) -> list:
        """
        Get fallback evergreen topics if inventory is empty.
        These are safe, generic topics that can always be written.
        """
        fallback_topics = {
            "Dentists": [
                "Year-end tax planning checklist for dental practices UK",
                "Understanding dental practice expenses and tax deductions",
                "Associate dentist guide to self-assessment tax returns",
                "Dental practice accounting software comparison 2026",
                "How to structure your dental practice for tax efficiency",
            ],
            "Property": [
                "Landlord tax return guide for UK property owners 2026",
                "Buy-to-let tax deductions complete checklist",
                "Capital gains tax on property sales explained",
                "Property portfolio accounting best practices",
                "Landlord expenses you can claim against rental income",
            ]
        }
        
        return fallback_topics.get(niche, [])
    
    async def auto_trigger_research(self, niche: str, blog_topics_table: str) -> bool:
        """
        Automatically trigger research agent if inventory is low.
        Returns True if research was triggered.
        """
        inventory = await self.check_inventory(niche, blog_topics_table)
        
        if inventory["status"] in ["critical", "warning"]:
            print(f"Auto-triggering research for {niche} (inventory: {inventory['status']})")
            
            # Import and run research agent
            try:
                from agents.content_research_agent import ContentResearchAgent
                
                agent = ContentResearchAgent(niche)
                await agent.research_topics()
                
                await send_alert(
                    f"✅ Auto-triggered research for {niche}\n"
                    f"Previous inventory: {inventory['unused_count']} topics",
                    priority="low"
                )
                
                return True
            except Exception as e:
                await send_alert(
                    f"❌ Failed to auto-trigger research for {niche}: {e}",
                    priority="high"
                )
                return False
        
        return False
