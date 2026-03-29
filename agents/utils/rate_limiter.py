"""
Rate Limiter - Prevents API rate limit violations.
"""
import asyncio
from datetime import datetime, timedelta
from collections import deque
from typing import Optional

class RateLimiter:
    def __init__(self, max_requests_per_minute: int = 10):
        self.max_requests_per_minute = max_requests_per_minute
        self.request_times = deque()
        self.lock = asyncio.Lock()
    
    async def acquire(self, operation: str = "api_call") -> bool:
        """
        Acquire permission to make an API call.
        Blocks if rate limit would be exceeded.
        Returns True when safe to proceed.
        """
        async with self.lock:
            now = datetime.utcnow()
            
            # Remove requests older than 1 minute
            cutoff = now - timedelta(minutes=1)
            while self.request_times and self.request_times[0] < cutoff:
                self.request_times.popleft()
            
            # Check if we're at the limit
            if len(self.request_times) >= self.max_requests_per_minute:
                # Calculate wait time
                oldest_request = self.request_times[0]
                wait_until = oldest_request + timedelta(minutes=1)
                wait_seconds = (wait_until - now).total_seconds()
                
                if wait_seconds > 0:
                    print(f"Rate limit approaching. Waiting {wait_seconds:.1f}s...")
                    await asyncio.sleep(wait_seconds + 0.1)  # Add small buffer
                    
                    # Retry after waiting
                    return await self.acquire(operation)
            
            # Record this request
            self.request_times.append(now)
            return True
    
    async def wait_if_needed(self, operation: str = "api_call"):
        """
        Wait if necessary to avoid rate limits.
        Use before making API calls.
        """
        await self.acquire(operation)
    
    def get_current_rate(self) -> int:
        """Get current requests per minute."""
        now = datetime.utcnow()
        cutoff = now - timedelta(minutes=1)
        
        # Count requests in last minute
        recent_requests = [t for t in self.request_times if t >= cutoff]
        return len(recent_requests)
    
    def get_time_until_next_slot(self) -> float:
        """
        Get seconds until next request slot is available.
        Returns 0 if slot is available now.
        """
        now = datetime.utcnow()
        cutoff = now - timedelta(minutes=1)
        
        # Remove old requests
        recent_requests = [t for t in self.request_times if t >= cutoff]
        
        if len(recent_requests) < self.max_requests_per_minute:
            return 0.0
        
        # Calculate when oldest request will expire
        oldest = recent_requests[0]
        wait_until = oldest + timedelta(minutes=1)
        return max(0, (wait_until - now).total_seconds())


# Global rate limiter instance
_global_rate_limiter: Optional[RateLimiter] = None

def get_rate_limiter() -> RateLimiter:
    """Get global rate limiter instance."""
    global _global_rate_limiter
    if _global_rate_limiter is None:
        _global_rate_limiter = RateLimiter(max_requests_per_minute=10)
    return _global_rate_limiter
