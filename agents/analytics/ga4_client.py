"""
Google Analytics 4 API client.
"""
import os
import json
from datetime import datetime, timedelta
from typing import List, Dict, Optional
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    RunReportRequest,
    Dimension,
    Metric,
    DateRange,
)
from google.oauth2 import service_account

class GA4Client:
    def __init__(self, property_id: str, credentials_json: Optional[str] = None):
        """
        Initialize GA4 client.
        
        Args:
            property_id: GA4 property ID (e.g., 'G-273RJY0LZQ' or numeric property ID)
            credentials_json: Service account JSON string (from env var)
        """
        self.property_id = property_id
        
        # Parse credentials
        if credentials_json:
            credentials_dict = json.loads(credentials_json)
            credentials = service_account.Credentials.from_service_account_info(
                credentials_dict,
                scopes=["https://www.googleapis.com/auth/analytics.readonly"]
            )
            self.client = BetaAnalyticsDataClient(credentials=credentials)
        else:
            # Use default credentials (for local development)
            self.client = BetaAnalyticsDataClient()
    
    async def get_page_analytics(self, days: int = 30) -> List[Dict]:
        """
        Get page-level analytics for the last N days.
        
        Returns list of pages with metrics:
        - page_url
        - views
        - unique_visitors
        - avg_time_on_page
        - bounce_rate
        - conversions (lead form submissions)
        """
        end_date = datetime.now()
        start_date = end_date - timedelta(days=days)
        
        request = RunReportRequest(
            property=f"properties/{self.property_id}",
            dimensions=[
                Dimension(name="pagePath"),
                Dimension(name="pageTitle"),
            ],
            metrics=[
                Metric(name="screenPageViews"),
                Metric(name="activeUsers"),
                Metric(name="averageSessionDuration"),
                Metric(name="bounceRate"),
                Metric(name="conversions"),  # Lead form submissions
            ],
            date_ranges=[DateRange(
                start_date=start_date.strftime("%Y-%m-%d"),
                end_date=end_date.strftime("%Y-%m-%d")
            )],
            limit=100,
            order_bys=[{"metric": {"metric_name": "screenPageViews"}, "desc": True}]
        )
        
        response = self.client.run_report(request)
        
        pages = []
        for row in response.rows:
            page_url = row.dimension_values[0].value
            page_title = row.dimension_values[1].value
            
            # Only include blog posts
            if "/blog/" not in page_url:
                continue
            
            views = int(row.metric_values[0].value)
            unique_visitors = int(row.metric_values[1].value)
            avg_time = float(row.metric_values[2].value)
            bounce_rate = float(row.metric_values[3].value)
            conversions = int(row.metric_values[4].value)
            
            conversion_rate = conversions / views if views > 0 else 0
            
            pages.append({
                "page_url": page_url,
                "page_title": page_title,
                "views": views,
                "unique_visitors": unique_visitors,
                "avg_time_on_page": avg_time,
                "bounce_rate": bounce_rate,
                "conversions": conversions,
                "conversion_rate": conversion_rate
            })
        
        return pages
    
    async def get_traffic_sources(self, days: int = 30) -> Dict:
        """Get traffic source breakdown."""
        end_date = datetime.now()
        start_date = end_date - timedelta(days=days)
        
        request = RunReportRequest(
            property=f"properties/{self.property_id}",
            dimensions=[Dimension(name="sessionSource")],
            metrics=[Metric(name="sessions")],
            date_ranges=[DateRange(
                start_date=start_date.strftime("%Y-%m-%d"),
                end_date=end_date.strftime("%Y-%m-%d")
            )]
        )
        
        response = self.client.run_report(request)
        
        sources = {}
        total_sessions = 0
        
        for row in response.rows:
            source = row.dimension_values[0].value
            sessions = int(row.metric_values[0].value)
            sources[source] = sessions
            total_sessions += sessions
        
        # Calculate percentages
        source_percentages = {
            source: count / total_sessions if total_sessions > 0 else 0
            for source, count in sources.items()
        }
        
        return source_percentages
