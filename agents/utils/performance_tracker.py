"""
Performance Tracker - Measure Optimization Impact
Tracks baseline, weekly impact, and calculates verdicts

Usage:
    from agents.utils.performance_tracker import PerformanceTracker
    
    tracker = PerformanceTracker()
    tracker.capture_baseline(optimization_id)
    tracker.track_impact(optimization_id, week_number=1)
"""

import sys
import os

# Add project root to path
project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, project_root)

from datetime import datetime, timedelta
from typing import Dict, List, Optional
import httpx

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


class PerformanceTracker:
    """
    Track optimization impact with weekly measurements.
    
    Lifecycle:
    1. capture_baseline() - When optimization approved
    2. track_impact(week=1) - 7 days after implementation
    3. track_impact(week=2) - 14 days after
    4. track_impact(week=3) - 21 days after
    5. track_impact(week=4) - 28 days after (final)
    """
    
    def __init__(self):
        if not SUPABASE_URL or not SUPABASE_KEY:
            raise ValueError("Supabase credentials not configured")
    
    def capture_baseline(self, optimization_id: str):
        """
        Capture 7-day baseline performance BEFORE implementing optimization.
        
        Args:
            optimization_id: UUID of the optimization
        
        Returns:
            dict: Baseline metrics
        """
        print(f"\n[BASELINE] Capturing for optimization {optimization_id}")
        
        # Load optimization
        optimization = self._load_optimization(optimization_id)
        
        if not optimization:
            print(f"[ERROR] Optimization {optimization_id} not found")
            return None
        
        slug = optimization['existing_slug']
        niche = optimization['niche']
        
        # Get last 7 days of performance from gsc_page_performance table
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=7)
        
        baseline_data = self._fetch_performance(niche, slug, start_date, end_date)
        
        if not baseline_data:
            print(f"[WARNING] No baseline data found for {slug}")
            return None
        
        # Calculate totals
        total_impressions = sum(d['impressions'] for d in baseline_data)
        total_clicks = sum(d['clicks'] for d in baseline_data)
        avg_position = sum(d['position'] for d in baseline_data) / len(baseline_data) if baseline_data else 0
        avg_ctr = sum(d['ctr'] for d in baseline_data) / len(baseline_data) if baseline_data else 0
        
        # Update optimization record
        update_data = {
            'baseline_impressions': total_impressions,
            'baseline_clicks': total_clicks,
            'baseline_position': float(avg_position),
            'baseline_ctr': float(avg_ctr),
            'baseline_period_start': start_date.isoformat(),
            'baseline_period_end': end_date.isoformat(),
            'status': 'approved',
            'approved_at': datetime.now().isoformat(),
        }
        
        self._update_optimization(optimization_id, update_data)
        
        print(f"[OK] Baseline captured:")
        print(f"  Impressions: {total_impressions} ({total_impressions/7:.1f}/day)")
        print(f"  Clicks: {total_clicks} ({total_clicks/7:.1f}/day)")
        print(f"  Position: {avg_position:.1f}")
        print(f"  CTR: {avg_ctr:.2%}")
        
        return update_data
    
    def track_impact(self, optimization_id: str, week_number: int):
        """
        Track performance N weeks after optimization implementation.
        
        Args:
            optimization_id: UUID of the optimization
            week_number: Which week to track (1, 2, 3, or 4)
        
        Returns:
            dict: Impact metrics and verdict
        """
        print(f"\n[TRACK] Week {week_number} impact for {optimization_id}")
        
        # Load optimization
        optimization = self._load_optimization(optimization_id)
        
        if not optimization:
            print(f"[ERROR] Optimization {optimization_id} not found")
            return None
        
        if not optimization.get('implemented_at'):
            print(f"[SKIP] Optimization not yet implemented")
            return None
        
        # Check if it's time to track this week
        implementation_date = datetime.fromisoformat(optimization['implemented_at'].replace('Z', '+00:00')).date()
        days_since = (datetime.now().date() - implementation_date).days
        current_week = (days_since // 7) + 1
        
        if current_week < week_number:
            print(f"[SKIP] Only week {current_week}, need week {week_number}")
            return None
        
        # Fetch performance for this specific week AFTER implementation
        week_start = implementation_date + timedelta(days=(week_number - 1) * 7)
        week_end = week_start + timedelta(days=7)
        
        slug = optimization['existing_slug']
        niche = optimization['niche']
        
        impact_data = self._fetch_performance(niche, slug, week_start, week_end)
        
        if not impact_data:
            print(f"[WARNING] No data for week {week_number}")
            return None
        
        # Calculate totals
        total_impressions = sum(d['impressions'] for d in impact_data)
        total_clicks = sum(d['clicks'] for d in impact_data)
        avg_position = sum(d['position'] for d in impact_data) / len(impact_data) if impact_data else 0
        avg_ctr = sum(d['ctr'] for d in impact_data) / len(impact_data) if impact_data else 0
        
        # Update optimization record
        update_data = {
            f'impact_impressions_week{week_number}': total_impressions,
            f'impact_clicks_week{week_number}': total_clicks,
            f'impact_position_week{week_number}': float(avg_position),
            f'impact_ctr_week{week_number}': float(avg_ctr),
        }
        
        # Calculate verdict
        if week_number == 1:
            verdict = self._calculate_verdict_week1(optimization, total_impressions, total_clicks, avg_position)
            update_data['impact_verdict'] = verdict
            
            if verdict == 'negative':
                update_data['status'] = 'completed'
                update_data['impact_notes'] = 'Week 1 shows negative impact - ROLLBACK CANDIDATE'
                print(f"[ALERT] NEGATIVE impact - ROLLBACK CANDIDATE")
            else:
                update_data['status'] = 'measuring'
                print(f"[VERDICT] {verdict.upper()} after week 1")
        
        elif week_number in [2, 3, 4]:
            verdict = self._calculate_verdict_cumulative(optimization, week_number)
            update_data['impact_verdict'] = verdict
            
            if week_number == 4 or verdict == 'negative':
                update_data['status'] = 'completed'
                update_data['measurement_complete_at'] = datetime.now().isoformat()
                print(f"[VERDICT] {verdict.upper()} after week {week_number} - MEASUREMENT COMPLETE")
            else:
                update_data['status'] = 'measuring'
                print(f"[VERDICT] {verdict.upper()} after week {week_number}")
        
        self._update_optimization(optimization_id, update_data)
        
        print(f"[OK] Week {week_number} tracked:")
        print(f"  Impressions: {total_impressions} ({total_impressions/7:.1f}/day)")
        print(f"  Clicks: {total_clicks} ({total_clicks/7:.1f}/day)")
        print(f"  Position: {avg_position:.1f}")
        
        return update_data
    
    def _calculate_verdict_week1(self, optimization: Dict, week1_impressions: int, week1_clicks: int, week1_position: float) -> str:
        """
        Calculate verdict after week 1 using DAILY AVERAGES.
        
        Thresholds (aggressive):
        - POSITIVE: +10 impressions/day OR +3 positions OR +1 click/day
        - NEGATIVE: -10 impressions/day OR -3 positions OR -1 click/day
        """
        niche = optimization['niche']
        config = get_niche_config(niche)
        thresholds = config['verdict_thresholds']['week1']
        
        # Baseline (daily averages)
        baseline_imp_per_day = optimization['baseline_impressions'] / 7
        baseline_clicks_per_day = optimization['baseline_clicks'] / 7
        baseline_position = optimization['baseline_position']
        
        # Week 1 (daily averages)
        week1_imp_per_day = week1_impressions / 7
        week1_clicks_per_day = week1_clicks / 7
        
        # Calculate changes (absolute, not percentage)
        imp_change = week1_imp_per_day - baseline_imp_per_day
        clicks_change = week1_clicks_per_day - baseline_clicks_per_day
        position_change = baseline_position - week1_position  # Positive = improvement
        
        # Apply thresholds
        if (imp_change >= thresholds['impressions_per_day'] or 
            position_change >= thresholds['position_improvement'] or 
            clicks_change >= thresholds['clicks_per_day']):
            return 'positive'
        
        elif (imp_change <= -thresholds['impressions_per_day'] or 
              position_change <= -thresholds['position_improvement'] or 
              (baseline_clicks_per_day > 0 and clicks_change <= -thresholds['clicks_per_day'])):
            return 'negative'
        
        else:
            return 'neutral'
    
    def _calculate_verdict_cumulative(self, optimization: Dict, week_number: int) -> str:
        """
        Calculate cumulative verdict over multiple weeks using DAILY AVERAGES.
        
        Compares average of weeks 1-N vs baseline.
        """
        niche = optimization['niche']
        config = get_niche_config(niche)
        thresholds = config['verdict_thresholds']['cumulative']
        
        # Baseline
        baseline_imp_per_day = optimization['baseline_impressions'] / 7
        baseline_clicks_per_day = optimization['baseline_clicks'] / 7
        baseline_position = optimization['baseline_position']
        
        # Calculate average across all measured weeks
        total_imp = 0
        total_clicks = 0
        total_position = 0
        weeks_measured = 0
        
        for week in range(1, week_number + 1):
            week_imp = optimization.get(f'impact_impressions_week{week}')
            week_clicks = optimization.get(f'impact_clicks_week{week}')
            week_pos = optimization.get(f'impact_position_week{week}')
            
            if week_imp is not None:
                total_imp += week_imp
                total_clicks += week_clicks
                total_position += week_pos
                weeks_measured += 1
        
        if weeks_measured == 0:
            return 'pending'
        
        # Calculate daily averages
        avg_imp_per_day = (total_imp / weeks_measured) / 7
        avg_clicks_per_day = (total_clicks / weeks_measured) / 7
        avg_position = total_position / weeks_measured
        
        # Calculate changes
        imp_change = avg_imp_per_day - baseline_imp_per_day
        clicks_change = avg_clicks_per_day - baseline_clicks_per_day
        position_change = baseline_position - avg_position
        
        # Apply thresholds
        if (imp_change >= thresholds['impressions_per_day'] or 
            position_change >= thresholds['position_improvement'] or 
            clicks_change >= thresholds['clicks_per_day']):
            return 'positive'
        
        elif (imp_change <= -thresholds['impressions_per_day'] or 
              position_change <= -thresholds['position_improvement'] or 
              (baseline_clicks_per_day > 0 and clicks_change <= -thresholds['clicks_per_day'])):
            return 'negative'
        
        else:
            return 'neutral'
    
    def run_daily_tracking(self):
        """
        Daily job to track all in-progress optimizations.
        Checks weekly milestones (weeks 1, 2, 3, 4).
        """
        print("\n[DAILY TRACKING] Checking all in-progress optimizations...")
        
        # Find all optimizations in 'measuring' status
        measuring = self._get_optimizations_by_status('measuring')
        
        if not measuring:
            print("[INFO] No optimizations currently being measured")
            return
        
        print(f"[INFO] Found {len(measuring)} optimizations being measured")
        
        for opt in measuring:
            implementation_date = datetime.fromisoformat(opt['implemented_at'].replace('Z', '+00:00')).date()
            days_since = (datetime.now().date() - implementation_date).days
            current_week = (days_since // 7) + 1
            
            # Check if we've hit a weekly milestone
            if current_week >= 1 and not opt.get('impact_impressions_week1'):
                print(f"  Tracking week 1 for {opt['existing_slug']}")
                self.track_impact(opt['id'], 1)
            
            elif current_week >= 2 and not opt.get('impact_impressions_week2'):
                print(f"  Tracking week 2 for {opt['existing_slug']}")
                self.track_impact(opt['id'], 2)
            
            elif current_week >= 3 and not opt.get('impact_impressions_week3'):
                print(f"  Tracking week 3 for {opt['existing_slug']}")
                self.track_impact(opt['id'], 3)
            
            elif current_week >= 4 and not opt.get('impact_impressions_week4'):
                print(f"  Tracking week 4 for {opt['existing_slug']}")
                self.track_impact(opt['id'], 4)
    
    def _fetch_performance(self, niche: str, slug: str, start_date, end_date) -> List[Dict]:
        """Fetch performance data from gsc_page_performance table."""
        url = f"{SUPABASE_URL}/rest/v1/gsc_page_performance"
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
        }
        
        params = {
            "niche": f"eq.{niche}",
            "page_url": f"like.*{slug}*",
            "date": f"gte.{start_date.isoformat()}",
            "date": f"lte.{end_date.isoformat()}",
            "order": "date.asc",
        }
        
        try:
            response = httpx.get(url, headers=headers, params=params, timeout=10.0)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"[ERROR] Failed to fetch performance: {e}")
            return []
    
    def _load_optimization(self, optimization_id: str) -> Optional[Dict]:
        """Load optimization from Supabase."""
        url = f"{SUPABASE_URL}/rest/v1/blog_optimizations"
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
        }
        
        params = {"id": f"eq.{optimization_id}"}
        
        try:
            response = httpx.get(url, headers=headers, params=params, timeout=10.0)
            response.raise_for_status()
            data = response.json()
            return data[0] if data else None
        except Exception as e:
            print(f"[ERROR] Failed to load optimization: {e}")
            return None
    
    def _update_optimization(self, optimization_id: str, update_data: Dict):
        """Update optimization in Supabase."""
        url = f"{SUPABASE_URL}/rest/v1/blog_optimizations"
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=minimal",
        }
        
        params = {"id": f"eq.{optimization_id}"}
        
        try:
            response = httpx.patch(url, headers=headers, params=params, json=update_data, timeout=10.0)
            response.raise_for_status()
        except Exception as e:
            print(f"[ERROR] Failed to update optimization: {e}")
    
    def _get_optimizations_by_status(self, status: str) -> List[Dict]:
        """Get all optimizations with specific status."""
        url = f"{SUPABASE_URL}/rest/v1/blog_optimizations"
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
        }
        
        params = {"status": f"eq.{status}"}
        
        try:
            response = httpx.get(url, headers=headers, params=params, timeout=10.0)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"[ERROR] Failed to get optimizations: {e}")
            return []


def main():
    """Test the performance tracker."""
    print("=" * 80)
    print("PERFORMANCE TRACKER TEST")
    print("=" * 80)
    
    tracker = PerformanceTracker()
    tracker.run_daily_tracking()
    
    print("\n" + "=" * 80)
    print("[COMPLETE]")
    print("=" * 80)


if __name__ == "__main__":
    main()
