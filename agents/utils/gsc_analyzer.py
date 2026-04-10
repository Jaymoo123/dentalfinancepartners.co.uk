"""
GSC Opportunity Analyzer - DeepSeek Integration
Analyzes GSC data to identify content optimization opportunities

Usage:
    from agents.utils.gsc_analyzer import GSCOpportunityAnalyzer
    
    analyzer = GSCOpportunityAnalyzer('property')
    opportunities = analyzer.analyze_opportunities(days=28)
"""

import sys
import os

# Add project root to path
project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, project_root)

from datetime import datetime, timedelta
from typing import List, Dict, Optional
import httpx
import hashlib
import json

from agents.utils.deepseek_client import DeepSeekClient
from agents.config.gsc_config import get_niche_config, GLOBAL_CONFIG

# Supabase config
try:
    from dotenv import load_dotenv
    load_dotenv()
    SUPABASE_URL = os.getenv('SUPABASE_URL')
    SUPABASE_KEY = os.getenv('SUPABASE_KEY')
except:
    SUPABASE_URL = None
    SUPABASE_KEY = None


class GSCOpportunityAnalyzer:
    """
    Analyze GSC data to identify optimization opportunities.
    
    CRITICAL SAFEGUARDS:
    1. Data hashing - prevent re-analyzing same data
    2. Measurement windows - block pages being measured
    3. Cooldown periods - wait after optimization
    4. Trend analysis - use 56 days, not snapshots
    5. Previous context - learn from history
    """
    
    def __init__(self, niche: str):
        """
        Initialize analyzer for specific niche.
        
        Args:
            niche: Niche identifier (property, dentists, medical, etc.)
        """
        self.niche = niche
        self.config = get_niche_config(niche)
        self.deepseek = DeepSeekClient()
        
        if not SUPABASE_URL or not SUPABASE_KEY:
            raise ValueError("Supabase credentials not configured")
    
    def analyze_opportunities(self, days: int = 28) -> List[Dict]:
        """
        Analyze opportunities from NEW GSC data only.
        
        Args:
            days: Number of days to analyze
        
        Returns:
            list: Optimization opportunities
        """
        print(f"\n[ANALYZER] {self.niche.upper()}")
        print(f"Analyzing last {days} days...")
        
        # 1. Fetch GSC page performance for last N days
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=days)
        pages = self._fetch_gsc_data(start_date, end_date)
        
        if not pages:
            print("[INFO] No GSC data available")
            return []
        
        print(f"[OK] Found {len(pages)} pages with data")
        
        # 2. Load existing blog topics
        existing_topics = self._load_existing_content()
        
        # 3. Load optimization history
        optimization_history = self._load_optimization_history()
        
        # 4. Analyze each page
        opportunities = []
        
        for page in pages:
            # Skip low-traffic pages
            if page['total_impressions'] < GLOBAL_CONFIG['analysis']['min_impressions']:
                continue
            
            # Extract slug from URL
            slug = self._extract_slug(page['page_url'])
            if not slug:
                continue
            
            # Match to existing blog post
            blog_post = self._match_slug_to_topic(slug, existing_topics)
            if not blog_post:
                continue
            
            # CRITICAL CHECK 1: Is this page currently being measured?
            if self._is_in_measurement_window(slug, optimization_history):
                print(f"[SKIP] {slug} - Currently in measurement window")
                continue
            
            # CRITICAL CHECK 2: Have we analyzed this exact data before?
            data_hash = self._compute_data_hash(page, start_date, end_date)
            if self._has_analyzed_this_data(slug, data_hash, optimization_history):
                print(f"[SKIP] {slug} - Already analyzed this data")
                continue
            
            # CRITICAL CHECK 3: Was this page optimized recently? (cooldown)
            last_optimization = self._get_last_optimization(slug, optimization_history)
            if last_optimization:
                days_since = (datetime.now().date() - datetime.fromisoformat(last_optimization['implemented_at'].replace('Z', '+00:00')).date()).days
                min_wait = GLOBAL_CONFIG['optimization']['min_days_between_optimizations']
                
                if days_since < min_wait:
                    if last_optimization['status'] == 'measuring':
                        print(f"[SKIP] {slug} - Still measuring ({days_since}/{min_wait} days)")
                        continue
                    elif last_optimization['status'] == 'completed' and not last_optimization.get('rolled_back'):
                        print(f"[SKIP] {slug} - Cooldown period ({days_since}/{min_wait} days)")
                        continue
                    elif last_optimization.get('rolled_back'):
                        print(f"[ALLOW] {slug} - Previous rolled back, trying alternative")
            
            # CRITICAL CHECK 4: Get trend data (not just snapshot)
            trend_data = self._get_performance_trend(slug, days=56)
            
            # Analyze with DeepSeek
            opportunity = self._analyze_with_deepseek(
                page,
                blog_post,
                trend_data,
                last_optimization,
                start_date,
                end_date,
                data_hash
            )
            
            if opportunity:
                opportunities.append(opportunity)
        
        print(f"\n[RESULT] Identified {len(opportunities)} new opportunities")
        
        # Save to database
        if opportunities:
            self._save_opportunities(opportunities)
        
        return opportunities
    
    def _analyze_with_deepseek(self, page_data: Dict, blog_post: Dict, trend_data: List[Dict], 
                                last_optimization: Optional[Dict], start_date, end_date, data_hash: str) -> Optional[Dict]:
        """
        Use DeepSeek to analyze if optimization is needed.
        
        IMPORTANT: DeepSeek needs EXPLICIT, DETAILED instructions.
        """
        slug = self._extract_slug(page_data['page_url'])
        
        # Format trend data for DeepSeek
        trend_summary = self._format_trend_for_deepseek(trend_data)
        
        # Format previous optimization context
        previous_context = ""
        if last_optimization:
            baseline_imp = last_optimization.get('baseline_impressions', 0)
            impact_imp = last_optimization.get('impact_impressions_week4') or last_optimization.get('impact_impressions_week1', 0)
            
            change = "N/A"
            if baseline_imp > 0 and impact_imp > 0:
                change_val = ((impact_imp - baseline_imp) / baseline_imp) * 100
                change = f"{change_val:+.1f}%"
            
            previous_context = f"""
PREVIOUS OPTIMIZATION HISTORY:
- Last optimization date: {last_optimization.get('implemented_at', 'Unknown')}
- Action taken: {last_optimization.get('recommended_action', 'Unknown')}
- Sections added: {len(last_optimization.get('suggested_sections', []))}
- Impact verdict: {last_optimization.get('impact_verdict', 'pending')}
- Baseline impressions: {baseline_imp}
- Post-optimization impressions: {impact_imp}
- Change: {change}
- Rolled back: {last_optimization.get('rolled_back', False)}

CRITICAL: Do NOT suggest the same optimization again unless the previous one failed and was rolled back.
If previous optimization was positive, suggest something DIFFERENT that builds on it.
If previous optimization was negative and rolled back, suggest an ALTERNATIVE approach.
"""
        
        # Calculate daily averages for current data
        days_in_period = (end_date - start_date).days + 1
        imp_per_day = page_data['total_impressions'] / days_in_period if days_in_period > 0 else 0
        clicks_per_day = page_data['total_clicks'] / days_in_period if days_in_period > 0 else 0
        
        # Build detailed prompt for DeepSeek
        prompt = f"""
You are analyzing blog post performance data to decide if optimization is needed.

CRITICAL INSTRUCTIONS FOR YOU TO FOLLOW:
1. Read ALL the data provided below carefully
2. Look at TRENDS over time, not just current numbers
3. Do NOT suggest optimization if:
   - Performance is improving naturally (upward trend in impressions/position)
   - A recent optimization is still being measured
   - The same optimization was recently tried and failed
   - Data is insufficient (less than 20 impressions total)
4. ONLY suggest optimization if:
   - Performance is declining or completely flat for 4+ weeks
   - There's a clear problem: high impressions but zero clicks (CTR problem)
   - Position is stuck on page 2-3 (positions 11-30) for 4+ weeks
   - Related high-value keywords are missing from content

PAGE PERFORMANCE DATA:
URL: {page_data['page_url']}
Slug: {slug}

CURRENT SNAPSHOT (last {days_in_period} days: {start_date} to {end_date}):
- Total impressions: {page_data['total_impressions']}
- Daily average impressions: {imp_per_day:.1f} per day
- Total clicks: {page_data['total_clicks']}
- Daily average clicks: {clicks_per_day:.1f} per day
- CTR: {page_data['avg_ctr']:.2%}
- Average Position: {page_data['avg_position']:.1f}

PERFORMANCE TREND (last 56 days, grouped by week):
{trend_summary}

BLOG POST DETAILS:
- Title/Topic: {blog_post.get('topic', 'Unknown')}
- Primary keyword: {blog_post.get('primary_keyword', 'N/A')}
- Category: {blog_post.get('category', 'N/A')}
- Last optimized: {blog_post.get('last_optimized_at', 'Never')}
- Optimization count: {blog_post.get('optimization_count', 0)}

{previous_context}

DECISION FRAMEWORK (FOLLOW THESE STEPS):

Step 1: Analyze the trend
- Look at the 8-week trend above
- Is performance improving week-over-week? (more impressions each week)
- Is performance declining week-over-week? (fewer impressions each week)
- Is performance flat? (same impressions each week)

Step 2: Identify the specific problem (if any)
- Low CTR problem: Impressions are good (50+) but clicks are zero → Content doesn't match search intent
- Stuck on page 2: Position 11-30 for multiple weeks → Need more comprehensive content
- Declining impressions: Impressions dropping week-over-week → May need keyword refresh
- No problem: Performance is improving naturally → DO NOT optimize

Step 3: Determine if optimization is warranted
- YES if: Clear problem exists AND data is stable (20+ impressions) AND no recent optimization
- NO if: Performance improving naturally OR recent optimization OR insufficient data OR no clear problem

Step 4: If YES, suggest specific action
- For low CTR: Add sections that directly answer search intent
- For stuck position: Add more comprehensive coverage, examples, tools
- For declining impressions: Refresh content with related keywords

OUTPUT REQUIRED (return valid JSON only):
{{
  "needs_optimization": true or false,
  "reasoning": "Explain your decision in 2-3 clear sentences. Reference specific data points.",
  "trend_direction": "improving" or "declining" or "flat",
  "opportunity_type": "section_expansion" or "keyword_gap" or null,
  "priority": 1-100 (only if needs_optimization=true, higher = more urgent),
  "recommended_action": "Specific, actionable description of what to do" (only if needs_optimization=true),
  "target_keywords": ["keyword1", "keyword2"] (only if needs_optimization=true, leave empty if unknown),
  "suggested_sections": [
    {{
      "heading": "H2 or H3 heading text",
      "outline": "3-4 sentence outline of what this section should cover",
      "rationale": "Why this section will improve performance (reference data)"
    }}
  ] (only if needs_optimization=true, can be empty array if you need more info)
}}

REMEMBER: Be conservative. Only suggest optimization if there's a clear, data-backed reason.
If performance is improving naturally, say needs_optimization=false.
"""
        
        try:
            result = self.deepseek.generate_structured(
                prompt=prompt,
                response_format={
                    "needs_optimization": "boolean",
                    "reasoning": "string",
                    "trend_direction": "string",
                    "opportunity_type": "string or null",
                    "priority": "integer or null",
                    "recommended_action": "string or null",
                    "target_keywords": ["string"],
                    "suggested_sections": [
                        {
                            "heading": "string",
                            "outline": "string",
                            "rationale": "string"
                        }
                    ]
                }
            )
            
            # Validate response
            if not self._validate_deepseek_response(result):
                print(f"[ERROR] Invalid DeepSeek response for {slug}")
                return None
            
            if not result.get('needs_optimization'):
                print(f"[SKIP] {slug} - DeepSeek: {result.get('reasoning', 'No optimization needed')}")
                return None
            
            # Build opportunity object
            opportunity = {
                'niche': self.niche,
                'existing_slug': slug,
                'gsc_page_url': page_data['page_url'],
                'gsc_data_start_date': start_date.isoformat(),
                'gsc_data_end_date': end_date.isoformat(),
                'gsc_impressions': page_data['total_impressions'],
                'gsc_clicks': page_data['total_clicks'],
                'gsc_position': float(page_data['avg_position']),
                'gsc_ctr': float(page_data['avg_ctr']),
                'analysis_date': datetime.now().date().isoformat(),
                'data_hash': data_hash,
                'opportunity_type': result['opportunity_type'] or 'section_expansion',
                'priority': result['priority'] or 50,
                'recommended_action': result['recommended_action'],
                'target_keywords': result.get('target_keywords', []),
                'suggested_sections': result.get('suggested_sections', []),
                'deepseek_reasoning': result['reasoning'],
                'trend_direction': result['trend_direction'],
                'status': 'pending',
            }
            
            print(f"[OPPORTUNITY] {slug} - Priority {opportunity['priority']}")
            print(f"  {result['reasoning']}")
            
            return opportunity
        
        except Exception as e:
            print(f"[ERROR] DeepSeek analysis failed for {slug}: {e}")
            return None
    
    def _validate_deepseek_response(self, response: Dict) -> bool:
        """Validate DeepSeek followed instructions."""
        required_fields = ['needs_optimization', 'reasoning', 'trend_direction']
        
        for field in required_fields:
            if field not in response:
                print(f"[ERROR] DeepSeek response missing: {field}")
                return False
        
        if response['needs_optimization']:
            if not response.get('recommended_action'):
                print("[ERROR] DeepSeek said optimization needed but no action provided")
                return False
        
        valid_trends = ['improving', 'declining', 'flat']
        if response['trend_direction'] not in valid_trends:
            print(f"[ERROR] Invalid trend_direction: {response['trend_direction']}")
            return False
        
        return True
    
    def _compute_data_hash(self, page_data: Dict, start_date, end_date) -> str:
        """Create hash of GSC data to detect duplicate analysis."""
        data_string = (
            f"{page_data['page_url']}|"
            f"{start_date}|{end_date}|"
            f"{page_data['total_impressions']}|"
            f"{page_data['total_clicks']}|"
            f"{page_data['avg_position']:.2f}"
        )
        return hashlib.sha256(data_string.encode()).hexdigest()
    
    def _is_in_measurement_window(self, slug: str, optimization_history: List[Dict]) -> bool:
        """Check if page is currently having its optimization impact measured."""
        recent_optimizations = [
            opt for opt in optimization_history
            if opt['existing_slug'] == slug
            and opt['status'] in ('approved', 'in_progress', 'measuring')
            and opt.get('implemented_at')
        ]
        
        if not recent_optimizations:
            return False
        
        latest = max(recent_optimizations, key=lambda x: x['implemented_at'])
        implementation_date = datetime.fromisoformat(latest['implemented_at'].replace('Z', '+00:00')).date()
        days_since = (datetime.now().date() - implementation_date).days
        
        # Measurement window is 28 days (4 weeks)
        return days_since < 28
    
    def _has_analyzed_this_data(self, slug: str, data_hash: str, optimization_history: List[Dict]) -> bool:
        """Check if we've already analyzed this exact GSC data."""
        return any(
            opt['existing_slug'] == slug
            and opt.get('data_hash') == data_hash
            and opt['status'] not in ('rejected', 'skipped')
            for opt in optimization_history
        )
    
    def _get_last_optimization(self, slug: str, optimization_history: List[Dict]) -> Optional[Dict]:
        """Get most recent optimization for this slug."""
        slug_optimizations = [
            opt for opt in optimization_history
            if opt['existing_slug'] == slug
            and opt.get('implemented_at')
        ]
        
        if not slug_optimizations:
            return None
        
        return max(slug_optimizations, key=lambda x: x['implemented_at'])
    
    def _format_trend_for_deepseek(self, trend_data: List[Dict]) -> str:
        """Format trend data in a way DeepSeek can easily understand."""
        if not trend_data:
            return "No trend data available (site may be too new)"
        
        # Group by week
        weeks = {}
        for data_point in trend_data:
            date = datetime.fromisoformat(data_point['date']).date()
            week_num = (date - min(datetime.fromisoformat(d['date']).date() for d in trend_data)).days // 7
            
            if week_num not in weeks:
                weeks[week_num] = {'impressions': 0, 'clicks': 0, 'positions': [], 'days': 0}
            
            weeks[week_num]['impressions'] += data_point['impressions']
            weeks[week_num]['clicks'] += data_point['clicks']
            weeks[week_num]['positions'].append(data_point['position'])
            weeks[week_num]['days'] += 1
        
        # Format as readable summary
        summary_lines = []
        for week_num in sorted(weeks.keys()):
            week_data = weeks[week_num]
            avg_position = sum(week_data['positions']) / len(week_data['positions']) if week_data['positions'] else 0
            imp_per_day = week_data['impressions'] / week_data['days'] if week_data['days'] > 0 else 0
            
            summary_lines.append(
                f"Week {week_num + 1}: {week_data['impressions']} impressions ({imp_per_day:.1f}/day), "
                f"{week_data['clicks']} clicks, Pos {avg_position:.1f}"
            )
        
        return "\n".join(summary_lines) if summary_lines else "Insufficient trend data"
    
    def _fetch_gsc_data(self, start_date, end_date) -> List[Dict]:
        """Fetch aggregated GSC data from gsc_page_performance table."""
        url = f"{SUPABASE_URL}/rest/v1/rpc/get_gsc_page_aggregates"
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json",
        }
        
        query_url = f"{SUPABASE_URL}/rest/v1/gsc_page_performance"
        params = [
            ("niche", f"eq.{self.niche}"),
            ("date", f"gte.{start_date.isoformat()}"),
            ("date", f"lte.{end_date.isoformat()}"),
            ("select", "page_url,impressions,clicks,ctr,position"),
        ]
        
        try:
            response = httpx.get(query_url, headers=headers, params=params, timeout=10.0)
            response.raise_for_status()
            raw_data = response.json()
            
            # Aggregate by page_url
            pages = {}
            for row in raw_data:
                page_url = row['page_url']
                if page_url not in pages:
                    pages[page_url] = {
                        'page_url': page_url,
                        'total_impressions': 0,
                        'total_clicks': 0,
                        'positions': [],
                        'ctrs': [],
                    }
                
                pages[page_url]['total_impressions'] += row['impressions']
                pages[page_url]['total_clicks'] += row['clicks']
                pages[page_url]['positions'].append(row['position'])
                pages[page_url]['ctrs'].append(row['ctr'])
            
            # Calculate averages
            result = []
            for page_url, data in pages.items():
                result.append({
                    'page_url': page_url,
                    'total_impressions': data['total_impressions'],
                    'total_clicks': data['total_clicks'],
                    'avg_position': sum(data['positions']) / len(data['positions']) if data['positions'] else 0,
                    'avg_ctr': sum(data['ctrs']) / len(data['ctrs']) if data['ctrs'] else 0,
                })
            
            return result
        
        except Exception as e:
            print(f"[ERROR] Failed to fetch GSC data: {e}")
            return []
    
    def _get_performance_trend(self, slug: str, days: int = 56) -> List[Dict]:
        """Get historical performance trend for a slug."""
        url = f"{SUPABASE_URL}/rest/v1/gsc_page_performance"
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
        }
        
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=days)
        
        params = {
            "niche": f"eq.{self.niche}",
            "page_url": f"like.*{slug}*",
            "date": f"gte.{start_date.isoformat()}",
            "order": "date.asc",
        }
        
        try:
            response = httpx.get(url, headers=headers, params=params, timeout=10.0)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"[ERROR] Failed to fetch trend: {e}")
            return []
    
    def _load_existing_content(self) -> List[Dict]:
        """Load existing blog topics from Supabase."""
        table_name = self.config['blog_topics_table']
        url = f"{SUPABASE_URL}/rest/v1/{table_name}"
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
        }
        
        params = {"select": "*"}
        
        try:
            response = httpx.get(url, headers=headers, params=params, timeout=10.0)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"[ERROR] Failed to load blog topics: {e}")
            return []
    
    def _load_optimization_history(self) -> List[Dict]:
        """Load optimization history for this niche."""
        url = f"{SUPABASE_URL}/rest/v1/blog_optimizations"
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
        }
        
        params = {"niche": f"eq.{self.niche}"}
        
        try:
            response = httpx.get(url, headers=headers, params=params, timeout=10.0)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"[ERROR] Failed to load optimization history: {e}")
            return []
    
    def _extract_slug(self, page_url: str) -> Optional[str]:
        """Extract blog post slug from URL.
        
        Handles both flat (/blog/slug) and nested (/blog/category/slug) URL patterns.
        Always returns the final path segment.
        """
        if '/blog/' not in page_url:
            return None
        
        parts = page_url.split('/blog/')
        if len(parts) < 2:
            return None
        
        path = parts[1].rstrip('/')
        if not path:
            return None
        
        segments = path.split('/')
        return segments[-1] if segments[-1] else None
    
    def _match_slug_to_topic(self, slug: str, existing_topics: List[Dict]) -> Optional[Dict]:
        """Match slug to existing blog topic."""
        # Try exact match on slug column
        for topic in existing_topics:
            if topic.get('slug') == slug or topic.get('generated_slug') == slug:
                return topic
        
        # Try fuzzy match on topic text
        slug_normalized = slug.replace('-', ' ').lower()
        for topic in existing_topics:
            topic_normalized = topic.get('topic', '').replace('-', ' ').lower()
            if slug_normalized in topic_normalized or topic_normalized in slug_normalized:
                return topic
        
        return None
    
    def _save_opportunities(self, opportunities: List[Dict]):
        """Save opportunities to Supabase."""
        url = f"{SUPABASE_URL}/rest/v1/blog_optimizations"
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=minimal",
        }
        
        for opp in opportunities:
            # Convert arrays/objects to JSON strings for JSONB columns
            opp_copy = opp.copy()
            opp_copy['suggested_sections'] = json.dumps(opp_copy.get('suggested_sections', []))
            
            try:
                response = httpx.post(url, headers=headers, json=opp_copy, timeout=10.0)
                response.raise_for_status()
                print(f"[SAVED] {opp['existing_slug']}")
            except Exception as e:
                print(f"[ERROR] Failed to save opportunity: {e}")


def main():
    """Test the analyzer."""
    import sys
    
    if len(sys.argv) > 1:
        niche = sys.argv[1]
    else:
        niche = 'property'
    
    print("=" * 80)
    print(f"GSC OPPORTUNITY ANALYZER TEST - {niche.upper()}")
    print("=" * 80)
    
    analyzer = GSCOpportunityAnalyzer(niche)
    opportunities = analyzer.analyze_opportunities(days=28)
    
    print("\n" + "=" * 80)
    print(f"[COMPLETE] Found {len(opportunities)} opportunities")
    print("=" * 80)
    
    for i, opp in enumerate(opportunities, 1):
        print(f"\n{i}. {opp['existing_slug']} (Priority: {opp['priority']})")
        print(f"   {opp['recommended_action']}")


if __name__ == "__main__":
    main()
