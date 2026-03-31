"""
Google Search Console Client - OAuth Authentication
Uses OAuth flow instead of service account (more secure, no key file needed)
"""
import os
import pickle
from datetime import datetime, timedelta
from typing import List, Dict, Optional
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

SCOPES = [
    'https://www.googleapis.com/auth/webmasters',  # Full access for URL Inspection API
    'https://www.googleapis.com/auth/indexing',    # For requesting re-indexing
]
TOKEN_FILE = 'secrets/gsc_token.pickle'
CREDENTIALS_FILE = 'secrets/gsc_credentials.json'


class GSCClient:
    """
    Google Search Console API client using OAuth.
    
    First run: Opens browser for authentication
    Subsequent runs: Uses saved token
    """
    
    def __init__(self):
        self.service = None
        self._authenticate()
    
    def _authenticate(self):
        """Authenticate using OAuth flow."""
        
        creds = None
        
        # Load existing token if available
        if os.path.exists(TOKEN_FILE):
            with open(TOKEN_FILE, 'rb') as token:
                creds = pickle.load(token)
        
        # If no valid credentials, authenticate
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                # Refresh expired token
                creds.refresh(Request())
            else:
                # New authentication flow
                if not os.path.exists(CREDENTIALS_FILE):
                    raise FileNotFoundError(
                        f"OAuth credentials file not found: {CREDENTIALS_FILE}\n"
                        "Please download OAuth client credentials from Google Cloud Console"
                    )
                
                flow = InstalledAppFlow.from_client_secrets_file(
                    CREDENTIALS_FILE, SCOPES)
                creds = flow.run_local_server(port=0)
            
            # Save token for future use
            with open(TOKEN_FILE, 'wb') as token:
                pickle.dump(creds, token)
        
        # Build service
        self.service = build('searchconsole', 'v1', credentials=creds)
    
    def get_search_analytics(self, 
                            site_url: str, 
                            days: int = 28,
                            dimensions: List[str] = None,
                            row_limit: int = 1000) -> List[Dict]:
        """
        Fetch search analytics data from GSC.
        
        Args:
            site_url: Full site URL (e.g., 'https://www.propertytaxpartners.co.uk')
            days: Number of days to look back (default 28 for stable data)
            dimensions: List of dimensions (default: ['query', 'page'])
            row_limit: Max rows to return (default 1000)
        
        Returns:
            List of dicts with query, page, clicks, impressions, ctr, position
        """
        
        if dimensions is None:
            dimensions = ['query', 'page']
        
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=days)
        
        request = {
            'startDate': str(start_date),
            'endDate': str(end_date),
            'dimensions': dimensions,
            'rowLimit': row_limit
        }
        
        try:
            response = self.service.searchanalytics().query(
                siteUrl=site_url,
                body=request
            ).execute()
            
            rows = response.get('rows', [])
            
            # Parse into structured format
            results = []
            for row in rows:
                keys = row.get('keys', [])
                
                result = {
                    'clicks': row.get('clicks', 0),
                    'impressions': row.get('impressions', 0),
                    'ctr': row.get('ctr', 0),
                    'position': row.get('position', 0)
                }
                
                # Map dimensions to keys
                for i, dim in enumerate(dimensions):
                    if i < len(keys):
                        result[dim] = keys[i]
                
                results.append(result)
            
            return results
        
        except Exception as e:
            print(f"Error fetching GSC data: {e}")
            return []
    
    def get_top_opportunities(self, 
                             site_url: str, 
                             days: int = 28,
                             min_impressions: int = 10) -> List[Dict]:
        """
        Get top opportunity queries (high impressions, low CTR, position 5-20).
        These are queries where you're visible but not getting clicks.
        """
        
        data = self.get_search_analytics(
            site_url=site_url,
            days=days,
            dimensions=['query', 'page']
        )
        
        opportunities = []
        
        for row in data:
            impressions = row['impressions']
            ctr = row['ctr']
            position = row['position']
            
            # Opportunity criteria:
            # - Min impressions threshold
            # - Low CTR (< 5%)
            # - Position 5-20 (visible but not top)
            if impressions >= min_impressions and ctr < 0.05 and 5 <= position <= 20:
                opportunities.append({
                    'query': row.get('query', ''),
                    'page': row.get('page', ''),
                    'impressions': impressions,
                    'clicks': row['clicks'],
                    'ctr': ctr,
                    'position': position,
                    'opportunity_score': impressions * (1 - ctr)
                })
        
        # Sort by opportunity score
        opportunities.sort(key=lambda x: x['opportunity_score'], reverse=True)
        
        return opportunities
    
    def get_site_summary(self, site_url: str, days: int = 7) -> Dict:
        """Get summary statistics for a site."""
        
        data = self.get_search_analytics(
            site_url=site_url,
            days=days,
            dimensions=['query']
        )
        
        total_clicks = sum(row['clicks'] for row in data)
        total_impressions = sum(row['impressions'] for row in data)
        avg_ctr = total_clicks / total_impressions if total_impressions > 0 else 0
        avg_position = sum(row['position'] for row in data) / len(data) if data else 0
        
        return {
            'total_queries': len(data),
            'total_clicks': total_clicks,
            'total_impressions': total_impressions,
            'avg_ctr': avg_ctr,
            'avg_position': avg_position,
            'date_range_days': days
        }


def main():
    """Test GSC OAuth client."""
    
    print("=" * 80)
    print("GSC OAUTH CLIENT TEST")
    print("=" * 80)
    
    try:
        client = GSCClient()
        print("\n[OK] Authentication successful!")
        
        # First, list available sites
        print("\nChecking available sites...")
        try:
            sites_list = client.service.sites().list().execute()
            site_entries = sites_list.get('siteEntry', [])
            
            if site_entries:
                print(f"\n[OK] Found {len(site_entries)} accessible sites:")
                for site in site_entries:
                    print(f"  - {site.get('siteUrl')}")
            else:
                print("\n[WARNING] No sites found. Make sure you have access to GSC properties.")
                return
        except Exception as e:
            print(f"\n[ERROR] Could not list sites: {e}")
            return
        
        # Test Property site (using domain property)
        site_url = 'sc-domain:propertytaxpartners.co.uk'
        
        if site_url not in [s.get('siteUrl') for s in site_entries]:
            print(f"\n[WARNING] {site_url} not in accessible sites list.")
            print("Make sure you signed in with the correct Google account that has GSC access.")
            return
        
        print(f"\nFetching data for: {site_url}")
        
        summary = client.get_site_summary(site_url, days=7)
        print(f"\n[SUMMARY] Last 7 days:")
        print(f"  Total queries: {summary['total_queries']}")
        print(f"  Total impressions: {summary['total_impressions']}")
        print(f"  Total clicks: {summary['total_clicks']}")
        print(f"  Avg CTR: {summary['avg_ctr']:.2%}")
        print(f"  Avg position: {summary['avg_position']:.1f}")
        
        # Get top opportunities
        opportunities = client.get_top_opportunities(site_url, days=28, min_impressions=10)
        print(f"\n[OPPORTUNITIES] Top 5:")
        for i, opp in enumerate(opportunities[:5], 1):
            print(f"  {i}. '{opp['query']}'")
            print(f"     Position: {opp['position']:.1f}, Impressions: {opp['impressions']}, CTR: {opp['ctr']:.2%}")
            print(f"     Page: {opp['page']}")
        
        print("\n[SUCCESS] GSC client is working.")
        
    except FileNotFoundError as e:
        print(f"\n[ERROR] {e}")
        print("\nPlease follow the OAuth setup guide.")
    
    except Exception as e:
        print(f"\n[ERROR] {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    main()
