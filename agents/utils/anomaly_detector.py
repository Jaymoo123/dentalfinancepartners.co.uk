"""
Anomaly Detector - Detects unusual patterns and prevents cost spirals.
"""
from datetime import datetime, timedelta
from typing import Dict, List
from agents.utils.supabase_client import SupabaseClient
from agents.utils.alerting import send_alert

class AnomalyDetector:
    def __init__(self, supabase: SupabaseClient):
        self.supabase = supabase
        self.thresholds = {
            "max_operations_per_hour": 20,  # Normal: ~2-3/hour
            "max_cost_per_hour": 0.50,  # Normal: ~$0.05/hour
            "max_failure_rate": 0.40,  # 40% failure rate
            "max_duplicate_operations": 5,  # Same operation 5+ times in 10 min
        }
    
    async def check_for_anomalies(self) -> List[Dict]:
        """
        Check for anomalous behavior patterns.
        Returns list of detected anomalies.
        """
        anomalies = []
        
        # 1. Check operation rate (last hour)
        ops_anomaly = await self._check_operation_rate()
        if ops_anomaly:
            anomalies.append(ops_anomaly)
        
        # 2. Check cost spike (last hour)
        cost_anomaly = await self._check_cost_spike()
        if cost_anomaly:
            anomalies.append(cost_anomaly)
        
        # 3. Check failure rate (last 6 hours)
        failure_anomaly = await self._check_failure_rate()
        if failure_anomaly:
            anomalies.append(failure_anomaly)
        
        # 4. Check for duplicate operations (last 10 minutes)
        duplicate_anomaly = await self._check_duplicate_operations()
        if duplicate_anomaly:
            anomalies.append(duplicate_anomaly)
        
        # Alert on anomalies
        for anomaly in anomalies:
            await self._handle_anomaly(anomaly)
        
        return anomalies
    
    async def _check_operation_rate(self) -> Dict:
        """Check if operation rate is unusually high."""
        hour_ago = datetime.utcnow() - timedelta(hours=1)
        
        executions = await self.supabase.select(
            "agent_executions",
            filters={"started_at": f"gte.{hour_ago.isoformat()}"}
        )
        
        operation_count = len(executions)
        
        if operation_count > self.thresholds["max_operations_per_hour"]:
            return {
                "type": "high_operation_rate",
                "severity": "high",
                "message": f"Unusually high operation rate: {operation_count} ops/hour (normal: 2-3)",
                "data": {"count": operation_count, "threshold": self.thresholds["max_operations_per_hour"]}
            }
        
        return None
    
    async def _check_cost_spike(self) -> Dict:
        """Check if costs are spiking."""
        hour_ago = datetime.utcnow() - timedelta(hours=1)
        
        costs = await self.supabase.select(
            "agent_costs",
            filters={"timestamp": f"gte.{hour_ago.isoformat()}"}
        )
        
        total_cost = sum(cost.get("cost_usd", 0) for cost in costs)
        
        if total_cost > self.thresholds["max_cost_per_hour"]:
            return {
                "type": "cost_spike",
                "severity": "critical",
                "message": f"Cost spike detected: ${total_cost:.2f}/hour (normal: $0.05/hour)",
                "data": {"cost": total_cost, "threshold": self.thresholds["max_cost_per_hour"]}
            }
        
        return None
    
    async def _check_failure_rate(self) -> Dict:
        """Check if failure rate is too high."""
        six_hours_ago = datetime.utcnow() - timedelta(hours=6)
        
        executions = await self.supabase.select(
            "agent_executions",
            filters={"started_at": f"gte.{six_hours_ago.isoformat()}"}
        )
        
        if not executions:
            return None
        
        failed = sum(1 for e in executions if e.get("status") == "failed")
        failure_rate = failed / len(executions)
        
        if failure_rate > self.thresholds["max_failure_rate"]:
            return {
                "type": "high_failure_rate",
                "severity": "high",
                "message": f"High failure rate: {failure_rate*100:.0f}% ({failed}/{len(executions)})",
                "data": {"rate": failure_rate, "failed": failed, "total": len(executions)}
            }
        
        return None
    
    async def _check_duplicate_operations(self) -> Dict:
        """Check for same operation repeating rapidly."""
        ten_min_ago = datetime.utcnow() - timedelta(minutes=10)
        
        executions = await self.supabase.select(
            "agent_executions",
            filters={"started_at": f"gte.{ten_min_ago.isoformat()}"}
        )
        
        # Count operations by type and niche
        operation_counts = {}
        for execution in executions:
            key = f"{execution.get('agent_type')}_{execution.get('niche')}"
            operation_counts[key] = operation_counts.get(key, 0) + 1
        
        # Check for duplicates
        for key, count in operation_counts.items():
            if count >= self.thresholds["max_duplicate_operations"]:
                return {
                    "type": "duplicate_operations",
                    "severity": "high",
                    "message": f"Operation repeating rapidly: {key} ({count} times in 10 min)",
                    "data": {"operation": key, "count": count}
                }
        
        return None
    
    async def _handle_anomaly(self, anomaly: Dict):
        """Handle detected anomaly."""
        severity = anomaly["severity"]
        message = anomaly["message"]
        
        # Send alert
        if severity == "critical":
            await send_alert(f"🚨 CRITICAL ANOMALY: {message}", priority="high")
        elif severity == "high":
            await send_alert(f"⚠️ ANOMALY DETECTED: {message}", priority="high")
        else:
            await send_alert(f"ℹ️ Anomaly: {message}", priority="medium")
        
        # Log to database
        try:
            await self.supabase.insert("agent_executions", {
                "agent_type": "anomaly_detector",
                "niche": "system",
                "status": f"anomaly_{anomaly['type']}",
                "started_at": datetime.utcnow().isoformat(),
                "completed_at": datetime.utcnow().isoformat(),
                "metrics": anomaly
            })
        except Exception as e:
            print(f"Failed to log anomaly: {e}")
    
    async def should_pause_operations(self) -> bool:
        """
        Determine if operations should be paused due to anomalies.
        Returns True if system should pause.
        """
        anomalies = await self.check_for_anomalies()
        
        # Pause if any critical anomaly
        critical_anomalies = [a for a in anomalies if a["severity"] == "critical"]
        
        if critical_anomalies:
            await send_alert(
                "🛑 SYSTEM PAUSED: Critical anomaly detected. Manual intervention required.",
                priority="high"
            )
            return True
        
        return False
