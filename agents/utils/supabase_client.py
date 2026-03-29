"""
Supabase client wrapper for agent operations.
"""
import httpx
from datetime import datetime
from typing import Dict, List, Optional, Any

class SupabaseClient:
    def __init__(self, url: str, key: str):
        self.url = url
        self.key = key
        self.headers = {
            "apikey": key,
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
        }
    
    async def insert(self, table: str, data: Dict) -> Dict:
        """Insert a row into a table."""
        url = f"{self.url}/rest/v1/{table}"
        headers = {**self.headers, "Prefer": "return=representation"}
        
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers, json=data)
            response.raise_for_status()
            return response.json()[0] if response.json() else {}
    
    async def select(self, table: str, filters: Optional[Dict] = None, 
                    order: Optional[str] = None, limit: Optional[int] = None) -> List[Dict]:
        """Select rows from a table."""
        url = f"{self.url}/rest/v1/{table}"
        params = {}
        
        if filters:
            for key, value in filters.items():
                # If value already contains an operator (gte., lt., etc), use as-is
                if isinstance(value, str) and any(op in value for op in ['gte.', 'lte.', 'gt.', 'lt.', 'neq.', 'like.', 'ilike.']):
                    params[key] = value
                # Handle boolean values - PostgREST expects lowercase 'true'/'false'
                elif isinstance(value, bool):
                    params[key] = f"eq.{str(value).lower()}"
                else:
                    params[key] = f"eq.{value}"
        
        if order:
            params["order"] = order
        
        if limit:
            params["limit"] = str(limit)
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=self.headers, params=params)
            response.raise_for_status()
            return response.json()
    
    async def update(self, table: str, filters: Dict, data: Dict) -> Dict:
        """Update rows in a table."""
        url = f"{self.url}/rest/v1/{table}"
        # Handle boolean values properly in filters
        params = {}
        for k, v in filters.items():
            if isinstance(v, bool):
                params[k] = f"eq.{str(v).lower()}"
            else:
                params[k] = f"eq.{v}"
        headers = {**self.headers, "Prefer": "return=representation"}
        
        async with httpx.AsyncClient() as client:
            response = await client.patch(url, headers=headers, params=params, json=data)
            response.raise_for_status()
            return response.json()[0] if response.json() else {}
    
    async def delete(self, table: str, filters: Dict) -> None:
        """Delete rows from a table."""
        url = f"{self.url}/rest/v1/{table}"
        # Handle boolean values properly in filters
        params = {}
        for k, v in filters.items():
            if isinstance(v, bool):
                params[k] = f"eq.{str(v).lower()}"
            else:
                params[k] = f"eq.{v}"
        
        async with httpx.AsyncClient() as client:
            response = await client.delete(url, headers=self.headers, params=params)
            response.raise_for_status()
    
    async def rpc(self, function_name: str, params: Optional[Dict] = None) -> Any:
        """Call a Supabase function."""
        url = f"{self.url}/rest/v1/rpc/{function_name}"
        
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=self.headers, json=params or {})
            response.raise_for_status()
            return response.json()
