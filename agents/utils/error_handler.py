"""
Error handling for agent operations.
Alert only - no automatic retries.
"""
from datetime import datetime
from typing import Optional
from agents.utils.supabase_client import SupabaseClient
from agents.utils.alerting import send_alert

class ErrorHandler:
    def __init__(self, supabase: SupabaseClient):
        self.supabase = supabase
    
    async def handle_error(self, error: Exception, context: dict) -> bool:
        """
        Handle agent error.
        Logs to Supabase and sends alert.
        Returns False (no retry).
        """
        error_message = str(error)
        
        # Log error to Supabase
        try:
            if context.get("execution_id"):
                await self.supabase.update(
                    "agent_executions",
                    filters={"id": context["execution_id"]},
                    data={
                        "status": "failed",
                        "error_log": error_message,
                        "completed_at": datetime.utcnow().isoformat()
                    }
                )
        except Exception as log_error:
            print(f"Failed to log error to Supabase: {log_error}")
        
        # Send alert
        alert_message = (
            f"Agent Failed: {context.get('agent_type', 'unknown')}\n"
            f"Niche: {context.get('niche', 'N/A')}\n"
            f"Error: {error_message}\n"
            f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        )
        
        await send_alert(alert_message, priority="high")
        
        # Don't retry - prevents cost spiral
        return False
    
    async def log_skipped(self, reason: str, context: dict):
        """Log when an operation is skipped (e.g., duplicate, budget)."""
        try:
            await self.supabase.insert("agent_executions", {
                "agent_type": context.get("agent_type"),
                "niche": context.get("niche"),
                "status": f"skipped_{reason}",
                "started_at": datetime.utcnow().isoformat(),
                "completed_at": datetime.utcnow().isoformat(),
                "metrics": context.get("metrics", {})
            })
        except Exception as e:
            print(f"Failed to log skipped operation: {e}")
