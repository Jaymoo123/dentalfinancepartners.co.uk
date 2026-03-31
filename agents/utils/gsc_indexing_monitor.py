"""
GSC Indexing Monitor - URL Inspection API Integration
Detects indexing issues, schema problems, and canonical mismatches

Usage:
    from agents.utils.gsc_indexing_monitor import GSCIndexingMonitor
    
    monitor = GSCIndexingMonitor('property')
    issues = monitor.check_url('https://www.propertytaxpartners.co.uk/blog/section-24')
"""

import sys
import os

# Add project root to path
project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, project_root)

from datetime import datetime
from typing import List, Dict, Optional
import httpx
import json

from agents.utils.gsc_client_oauth import GSCClient
from agents.config.gsc_config import get_niche_config, GLOBAL_CONFIG

# Supabase config
try:
    from dotenv import load_dotenv
    load_dotenv()
    SUPABASE_URL = os.getenv('SUPABASE_URL')
    SUPABASE_KEY = os.getenv('SUPABASE_KEY')
except:
    print("[WARNING] Could not load Supabase credentials")
    SUPABASE_URL = None
    SUPABASE_KEY = None


class GSCIndexingMonitor:
    """
    Monitor indexing status and schema detection via GSC URL Inspection API.
    
    Features:
    - Check if pages are indexed
    - Detect schema/structured data
    - Identify canonical issues
    - Flag robots.txt/noindex problems
    - Store issues in Supabase for tracking
    """
    
    def __init__(self, niche: str):
        """
        Initialize monitor for specific niche.
        
        Args:
            niche: Niche identifier (property, dentists, medical, etc.)
        """
        self.niche = niche
        self.config = get_niche_config(niche)
        self.gsc_client = GSCClient()
        
        # Build indexing service (separate from search console service)
        self.indexing_service = None
        try:
            from googleapiclient.discovery import build
            # Note: Indexing API uses same credentials
            self.indexing_service = build('indexing', 'v3', credentials=self.gsc_client.service._http.credentials)
        except Exception as e:
            print(f"[WARNING] Could not initialize Indexing API: {e}")
    
    def inspect_url(self, page_url: str) -> Dict:
        """
        Inspect a URL using GSC URL Inspection API.
        
        Args:
            page_url: Full URL to inspect
        
        Returns:
            dict: Inspection results with issues detected
        """
        print(f"[INSPECT] {page_url}")
        
        request_body = {
            'inspectionUrl': page_url,
            'siteUrl': self.config['site_url'],
        }
        
        try:
            response = self.gsc_client.service.urlInspection().index().inspect(
                body=request_body
            ).execute()
        except Exception as e:
            print(f"[ERROR] URL Inspection failed: {e}")
            return {'error': str(e), 'issues': []}
        
        # Parse response
        inspection_result = response.get('inspectionResult', {})
        index_status = inspection_result.get('indexStatusResult', {})
        rich_results = inspection_result.get('richResultsResult', {})
        mobile_usability = inspection_result.get('mobileUsabilityResult', {})
        
        # Detect issues
        issues = self._detect_issues(index_status, rich_results, mobile_usability)
        
        # Store in Supabase
        self._store_issues(page_url, index_status, rich_results, issues)
        
        return {
            'page_url': page_url,
            'index_status': index_status,
            'rich_results': rich_results,
            'issues': issues,
        }
    
    def _detect_issues(self, index_status: Dict, rich_results: Dict, mobile_usability: Dict) -> List[Dict]:
        """
        Detect issues from URL Inspection response.
        
        Returns:
            list: Issues detected with severity and type
        """
        issues = []
        
        # Issue 1: Not indexed
        verdict = index_status.get('verdict')
        if verdict != 'PASS':
            issues.append({
                'type': 'indexing',
                'severity': 'high',
                'message': f"Page not indexed: {index_status.get('coverageState', 'UNKNOWN')}",
                'details': {
                    'verdict': verdict,
                    'coverage_state': index_status.get('coverageState'),
                    'page_fetch_state': index_status.get('pageFetchState'),
                }
            })
        
        # Issue 2: Schema not detected
        detected_items = rich_results.get('detectedItems', [])
        if not detected_items:
            issues.append({
                'type': 'schema',
                'severity': 'medium',
                'message': 'No structured data detected',
                'details': rich_results
            })
        
        # Issue 3: Canonical mismatch
        google_canonical = index_status.get('googleCanonical')
        user_canonical = index_status.get('userCanonical')
        
        if google_canonical and user_canonical:
            # Normalize URLs for comparison
            google_norm = google_canonical.rstrip('/')
            user_norm = user_canonical.rstrip('/')
            
            if google_norm != user_norm:
                issues.append({
                    'type': 'canonical',
                    'severity': 'medium',
                    'message': f'Canonical mismatch',
                    'details': {
                        'google_canonical': google_canonical,
                        'user_canonical': user_canonical,
                    }
                })
        
        # Issue 4: Robots.txt blocked
        robots_state = index_status.get('robotsTxtState')
        if robots_state == 'BLOCKED':
            issues.append({
                'type': 'robots',
                'severity': 'high',
                'message': 'Page blocked by robots.txt',
                'details': {'robots_state': robots_state}
            })
        
        # Issue 5: Noindex detected
        indexing_state = index_status.get('indexingState')
        if indexing_state == 'INDEXING_DISALLOWED':
            issues.append({
                'type': 'noindex',
                'severity': 'high',
                'message': 'Page has noindex directive',
                'details': {'indexing_state': indexing_state}
            })
        
        # Issue 6: Crawl errors
        page_fetch_state = index_status.get('pageFetchState')
        if page_fetch_state and page_fetch_state not in ['SUCCESSFUL', '']:
            issues.append({
                'type': 'crawl_error',
                'severity': 'low' if page_fetch_state == 'SOFT_404' else 'medium',
                'message': f'Crawl error: {page_fetch_state}',
                'details': {'page_fetch_state': page_fetch_state}
            })
        
        return issues
    
    def _store_issues(self, page_url: str, index_status: Dict, rich_results: Dict, issues: List[Dict]):
        """
        Store detected issues in Supabase.
        
        Args:
            page_url: URL that was inspected
            index_status: Index status from API
            rich_results: Rich results from API
            issues: Detected issues
        """
        if not issues:
            return  # No issues to store
        
        url = f"{SUPABASE_URL}/rest/v1/gsc_indexing_issues"
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json",
        }
        
        # Parse last crawl time
        last_crawl_str = index_status.get('lastCrawlTime')
        last_crawl_time = None
        if last_crawl_str:
            try:
                last_crawl_time = datetime.fromisoformat(last_crawl_str.replace('Z', '+00:00')).isoformat()
            except:
                pass
        
        # Store each issue
        for issue in issues:
            record = {
                'niche': self.niche,
                'page_url': page_url,
                'coverage_state': index_status.get('coverageState'),
                'indexing_verdict': index_status.get('verdict'),
                'page_fetch_state': index_status.get('pageFetchState'),
                'last_crawl_time': last_crawl_time,
                'crawler_agent': index_status.get('crawlerUserAgent'),
                'google_canonical': index_status.get('googleCanonical'),
                'user_declared_canonical': index_status.get('userCanonical'),
                'canonical_mismatch': issue['type'] == 'canonical',
                'robots_txt_blocked': issue['type'] == 'robots',
                'noindex_detected': issue['type'] == 'noindex',
                'rich_results_detected': json.dumps(rich_results.get('detectedItems', [])),
                'schema_issues': json.dumps(rich_results.get('issues', [])),
                'issue_type': issue['type'],
                'severity': issue['severity'],
                'issue_message': issue['message'],
                'issue_details': json.dumps(issue['details']),
            }
            
            try:
                response = httpx.post(url, headers=headers, json=record, timeout=10.0)
                response.raise_for_status()
            except Exception as e:
                print(f"[ERROR] Failed to store issue: {e}")
    
    def request_indexing(self, page_url: str) -> bool:
        """
        Request Google to index/re-index a URL.
        
        Args:
            page_url: Full URL to request indexing for
        
        Returns:
            bool: True if request successful
        """
        if not self.indexing_service:
            print("[ERROR] Indexing API not available")
            return False
        
        request_body = {
            'url': page_url,
            'type': 'URL_UPDATED'
        }
        
        try:
            response = self.indexing_service.urlNotifications().publish(
                body=request_body
            ).execute()
            
            print(f"[OK] Requested indexing for {page_url}")
            return True
        
        except Exception as e:
            print(f"[ERROR] Indexing request failed: {e}")
            return False
    
    def check_daily_sample(self, sample_size: int = None) -> List[Dict]:
        """
        Check a daily sample of URLs for issues.
        
        Args:
            sample_size: Number of URLs to check (default from config)
        
        Returns:
            list: Issues detected
        """
        if sample_size is None:
            sample_size = GLOBAL_CONFIG['monitoring']['daily_url_inspection_limit']
        
        print(f"\n[DAILY SAMPLE] Checking {sample_size} URLs for {self.niche}")
        
        # Get recent blog posts to check
        # TODO: Query blog posts from content directory or database
        
        # For now, return empty (will be implemented with full system)
        return []


def main():
    """Test the indexing monitor."""
    import sys
    
    if len(sys.argv) > 2:
        niche = sys.argv[1]
        page_url = sys.argv[2]
    else:
        print("Usage: python gsc_indexing_monitor.py <niche> <page_url>")
        print("Example: python gsc_indexing_monitor.py property https://www.propertytaxpartners.co.uk/blog/section-24")
        return
    
    print("=" * 80)
    print(f"GSC INDEXING MONITOR TEST - {niche.upper()}")
    print("=" * 80)
    
    monitor = GSCIndexingMonitor(niche)
    result = monitor.inspect_url(page_url)
    
    print("\n[RESULT]")
    print(f"  Indexing verdict: {result['index_status'].get('verdict', 'UNKNOWN')}")
    print(f"  Coverage state: {result['index_status'].get('coverageState', 'UNKNOWN')}")
    print(f"  Issues detected: {len(result['issues'])}")
    
    for issue in result['issues']:
        print(f"\n  [{issue['severity'].upper()}] {issue['type']}")
        print(f"    {issue['message']}")
    
    print("\n" + "=" * 80)
    print("[COMPLETE]")
    print("=" * 80)


if __name__ == "__main__":
    main()
