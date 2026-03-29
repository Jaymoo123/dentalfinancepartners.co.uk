"""
Cost tracking and budget monitoring for AI agents.
"""
import asyncio
from datetime import datetime
from typing import Optional
from agents.config.cost_limits import COST_PER_OPERATION, BUDGET_LIMITS
from agents.utils.supabase_client import SupabaseClient
from agents.utils.alerting import send_alert

class CostTracker:
    def __init__(self, supabase: SupabaseClient):
        self.supabase = supabase
    
    async def check_budget(self, operation_type: str) -> bool:
        """
        Check if operation is within budget.
        Returns True if within budget, False otherwise.
        """
        # Get current month's spending
        current_spend = await self.get_monthly_spend()
        
        # Calculate operation cost
        operation_cost = COST_PER_OPERATION.get(operation_type, 0)
        
        # Check monthly budget
        monthly_limit = BUDGET_LIMITS["monthly_budget_usd"]
        if current_spend + operation_cost > monthly_limit:
            await send_alert(
                f"🚨 Monthly budget exceeded!\n"
                f"Current: ${current_spend:.2f}\n"
                f"Limit: ${monthly_limit:.2f}",
                priority="high"
            )
            return False
        
        # Check daily budget
        daily_spend = await self.get_daily_spend()
        daily_limit = BUDGET_LIMITS["daily_budget_usd"]
        if daily_spend + operation_cost > daily_limit:
            await send_alert(
                f"⚠️ Daily budget exceeded!\n"
                f"Current: ${daily_spend:.2f}\n"
                f"Limit: ${daily_limit:.2f}",
                priority="medium"
            )
            return False
        
        # Warn at 80% threshold
        warning_threshold = BUDGET_LIMITS["budget_warning_threshold"]
        if current_spend + operation_cost > monthly_limit * warning_threshold:
            await send_alert(
                f"⚠️ Budget warning: {(current_spend/monthly_limit)*100:.0f}% used\n"
                f"Spent: ${current_spend:.2f} / ${monthly_limit:.2f}",
                priority="low"
            )
        
        return True
    
    async def log_cost(self, operation_type: str, niche: Optional[str] = None, 
                      actual_cost: Optional[float] = None, tokens_used: Optional[int] = None):
        """Log operation cost to Supabase."""
        cost = actual_cost or COST_PER_OPERATION.get(operation_type, 0)
        
        await self.supabase.insert("agent_costs", {
            "operation": operation_type,
            "niche": niche,
            "cost_usd": cost,
            "tokens_used": tokens_used,
            "timestamp": datetime.utcnow().isoformat()
        })
    
    async def get_monthly_spend(self) -> float:
        """Get total spending for current month."""
        now = datetime.utcnow()
        month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        
        costs = await self.supabase.select(
            "agent_costs",
            filters={"timestamp": f"gte.{month_start.isoformat()}"}
        )
        
        return sum(float(cost.get("cost_usd", 0)) for cost in costs)
    
    async def get_daily_spend(self) -> float:
        """Get total spending for today."""
        now = datetime.utcnow()
        day_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
        
        costs = await self.supabase.select(
            "agent_costs",
            filters={"timestamp": f"gte.{day_start.isoformat()}"}
        )
        
        return sum(float(cost.get("cost_usd", 0)) for cost in costs)
