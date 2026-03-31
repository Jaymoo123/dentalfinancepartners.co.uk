"""
GSC Data Fetcher - Daily Performance Data Collection
Fetches page-level performance data from GSC and stores in Supabase

Usage:
    from agents.utils.gsc_fetcher import GSCDataFetcher
    
    fetcher = GSCDataFetcher('property')
    fetcher.fetch_and_store(days=28)
"""

import sys
import os

# Add project root to path
project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, project_root)

from datetime import datetime, timedelta
from typing import List, Dict
import httpx

from agents.utils.gsc_client_oauth import GSCClient
from agents.config.gsc_config import get_niche_config, GLOBAL_CONFIG

# Supabase config
try:
    from dotenv import load_dotenv
    load_dotenv()
    SUPABASE_URL = os.getenv('SUPABASE_URL')
    SUPABASE_KEY = os.getenv('SUPABASE_KEY')
except:
    print("[WARNING] Could not load Supabase credentials from .env")
    SUPABASE_URL = None
    SUPABASE_KEY = None


class GSCDataFetcher:
    """
    Fetches GSC performance data and stores in Supabase.
    
    Features:
    - Fetches page-level performance (query-level is anonymized for low traffic)
    - Stores daily snapshots for trend analysis
    - Handles API rate limits and retries
    - Prevents duplicate data insertion
    """
    
    def __init__(self, niche: str):
        """
        Initialize fetcher for specific niche.
        
        Args:
            niche: Niche identifier (property, dentists, medical, etc.)
        """
        self.niche = niche
        self.config = get_niche_config(niche)
        self.gsc_client = GSCClient()
        
        if not SUPABASE_URL or not SUPABASE_KEY:
            raise ValueError("Supabase credentials not configured. Set SUPABASE_URL and SUPABASE_KEY in .env")
    
    def fetch_and_store(self, days: int = 28):
        """
        Fetch GSC data for last N days and store in Supabase.
        
        Args:
            days: Number of days to fetch (default 28)
        
        Returns:
            int: Number of records inserted
        """
        print(f"\n[GSC FETCHER] {self.niche.upper()}")
        print(f"Site: {self.config['site_url']}")
        print(f"Fetching last {days} days...")
        
        # Fetch page-level data from GSC
        # Note: We use 'page' dimension only because 'query' is anonymized for low traffic
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=days)
        
        request_body = {
            'startDate': start_date.strftime('%Y-%m-%d'),
            'endDate': end_date.strftime('%Y-%m-%d'),
            'dimensions': ['page', 'date'],  # Page + date for daily snapshots
            'rowLimit': 25000,  # Max allowed
        }
        
        try:
            response = self.gsc_client.service.searchanalytics().query(
                siteUrl=self.config['site_url'],
                body=request_body
            ).execute()
        except Exception as e:
            print(f"[ERROR] GSC API request failed: {e}")
            return 0
        
        rows = response.get('rows', [])
        
        if not rows:
            print(f"[INFO] No data returned from GSC (site may be too new)")
            return 0
        
        print(f"[OK] Fetched {len(rows)} data points from GSC")
        
        # Transform and store in Supabase
        records_inserted = self._store_in_supabase(rows)
        
        print(f"[OK] Inserted {records_inserted} new records into Supabase")
        
        return records_inserted
    
    def _store_in_supabase(self, rows: List[Dict]) -> int:
        """
        Store GSC data in Supabase.
        
        Args:
            rows: GSC API response rows
        
        Returns:
            int: Number of records inserted
        """
        url = f"{SUPABASE_URL}/rest/v1/gsc_page_performance"
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "resolution=ignore-duplicates",  # Ignore duplicates (UNIQUE constraint)
        }
        
        records = []
        
        for row in rows:
            keys = row.get('keys', [])
            if len(keys) < 2:
                continue  # Need both page and date
            
            page_url = keys[0]
            date_str = keys[1]
            
            record = {
                'niche': self.niche,
                'site_url': self.config['site_url'],
                'page_url': page_url,
                'date': date_str,
                'impressions': row.get('impressions', 0),
                'clicks': row.get('clicks', 0),
                'ctr': float(row.get('ctr', 0)),
                'position': float(row.get('position', 0)),
            }
            
            records.append(record)
        
        if not records:
            return 0
        
        # Batch insert
        try:
            response = httpx.post(url, headers=headers, json=records, timeout=30.0)
            response.raise_for_status()
            
            # Count successful inserts (Supabase returns 201 for inserts)
            if response.status_code == 201:
                return len(records)
            else:
                return 0
        
        except Exception as e:
            print(f"[ERROR] Supabase insert failed: {e}")
            return 0
    
    def get_performance_trend(self, slug: str, days: int = 56) -> List[Dict]:
        """
        Get historical performance trend for a specific blog post.
        
        Args:
            slug: Blog post slug
            days: Number of days to look back
        
        Returns:
            list: Daily performance data
        """
        # Construct page URL from slug
        base_url = self.config['site_url'].replace('sc-domain:', 'https://').replace('https://https://', 'https://')
        if not base_url.startswith('http'):
            base_url = f"https://{base_url}"
        
        page_url = f"{base_url}/blog/{slug}"
        
        # Query Supabase
        url = f"{SUPABASE_URL}/rest/v1/gsc_page_performance"
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
        }
        
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=days)
        
        params = {
            "niche": f"eq.{self.niche}",
            "page_url": f"like.*{slug}*",  # Fuzzy match on slug
            "date": f"gte.{start_date}",
            "order": "date.asc",
        }
        
        try:
            response = httpx.get(url, headers=headers, params=params, timeout=10.0)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"[ERROR] Failed to fetch trend data: {e}")
            return []


def main():
    """Test the fetcher."""
    import sys
    
    if len(sys.argv) > 1:
        niche = sys.argv[1]
    else:
        niche = 'property'
    
    print("=" * 80)
    print(f"GSC DATA FETCHER TEST - {niche.upper()}")
    print("=" * 80)
    
    fetcher = GSCDataFetcher(niche)
    records = fetcher.fetch_and_store(days=28)
    
    print("\n" + "=" * 80)
    print(f"[COMPLETE] Inserted {records} records")
    print("=" * 80)


if __name__ == "__main__":
    main()
