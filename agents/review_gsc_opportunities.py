#!/usr/bin/env python3
"""
GSC Optimization Review CLI - Interactive Review Tool
Review and approve/reject optimization opportunities and manage rollbacks

Usage:
    python agents/review_gsc_opportunities.py              # Review all sites
    python agents/review_gsc_opportunities.py property     # Review specific site
    python agents/review_gsc_opportunities.py --rollbacks  # Review rollback candidates only
"""

import sys
import os

# Add project root to path
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)

from datetime import datetime
from typing import List, Dict, Optional
import httpx
import json

from agents.config.gsc_config import get_enabled_niches, get_niche_config
from agents.utils.performance_tracker import PerformanceTracker
from agents.utils.content_expander import ContentExpander

# Supabase config
try:
    from dotenv import load_dotenv
    load_dotenv()
    SUPABASE_URL = os.getenv('SUPABASE_URL')
    SUPABASE_KEY = os.getenv('SUPABASE_KEY')
except:
    SUPABASE_URL = None
    SUPABASE_KEY = None


class OpportunityReviewer:
    """
    Interactive CLI for reviewing optimization opportunities.
    
    Features:
    - Review pending opportunities
    - Approve/reject/skip
    - View rollback candidates
    - Trigger rollbacks
    - Batch operations
    """
    
    def __init__(self, niche: Optional[str] = None):
        """
        Initialize reviewer.
        
        Args:
            niche: Specific niche to review, or None for all
        """
        self.niche = niche
        self.tracker = PerformanceTracker()
        
        if not SUPABASE_URL or not SUPABASE_KEY:
            raise ValueError("Supabase credentials not configured")
    
    def run(self, rollbacks_only: bool = False):
        """
        Run interactive review session.
        
        Args:
            rollbacks_only: If True, only show rollback candidates
        """
        if rollbacks_only:
            self._review_rollbacks()
        else:
            self._review_all()
    
    def _review_all(self):
        """Review all sections: rollbacks, pending, measuring."""
        niches = [self.niche] if self.niche else get_enabled_niches()
        
        print("=" * 80)
        print("GSC OPTIMIZATION REVIEW")
        print("=" * 80)
        print(f"Sites: {', '.join(niches)}")
        print()
        
        for niche in niches:
            print("\n" + "=" * 80)
            print(f"{niche.upper()} SITE")
            print("=" * 80)
            
            # Section 1: Rollback candidates
            rollback_candidates = self._get_rollback_candidates(niche)
            if rollback_candidates:
                print(f"\nSECTION 1: ROLLBACK CANDIDATES ({len(rollback_candidates)})")
                print("-" * 80)
                self._display_rollback_candidates(rollback_candidates, niche)
            
            # Section 2: Pending opportunities
            pending = self._get_pending_opportunities(niche)
            if pending:
                print(f"\nSECTION 2: PENDING OPPORTUNITIES ({len(pending)})")
                print("-" * 80)
                self._display_pending_opportunities(pending, niche)
            
            # Section 3: Currently measuring
            measuring = self._get_measuring_optimizations(niche)
            if measuring:
                print(f"\nSECTION 3: CURRENTLY MEASURING ({len(measuring)})")
                print("-" * 80)
                self._display_measuring(measuring)
            
            if not rollback_candidates and not pending and not measuring:
                print("\n[INFO] No items to review for this site")
    
    def _display_rollback_candidates(self, candidates: List[Dict], niche: str):
        """Display rollback candidates and handle user input."""
        for i, opt in enumerate(candidates, 1):
            print(f"\n[{i}] NEGATIVE IMPACT - Rollback Recommended")
            print(f"    Slug: {opt['existing_slug']}")
            print(f"    Implemented: {self._days_ago(opt['implemented_at'])} days ago")
            
            # Baseline
            baseline_imp_per_day = opt['baseline_impressions'] / 7 if opt.get('baseline_impressions') else 0
            baseline_clicks_per_day = opt['baseline_clicks'] / 7 if opt.get('baseline_clicks') else 0
            
            print(f"\n    Baseline (7 days before):")
            print(f"      Impressions: {opt.get('baseline_impressions', 0)} ({baseline_imp_per_day:.1f}/day)")
            print(f"      Clicks: {opt.get('baseline_clicks', 0)} ({baseline_clicks_per_day:.1f}/day)")
            print(f"      Position: {opt.get('baseline_position', 0):.1f}")
            
            # Week 1 impact
            week1_imp = opt.get('impact_impressions_week1', 0)
            week1_clicks = opt.get('impact_clicks_week1', 0)
            week1_pos = opt.get('impact_position_week1', 0)
            
            week1_imp_per_day = week1_imp / 7
            week1_clicks_per_day = week1_clicks / 7
            
            imp_change = week1_imp_per_day - baseline_imp_per_day
            clicks_change = week1_clicks_per_day - baseline_clicks_per_day
            pos_change = opt.get('baseline_position', 0) - week1_pos
            
            print(f"\n    Week 1 Impact:")
            print(f"      Impressions: {week1_imp} ({week1_imp_per_day:.1f}/day) [{imp_change:+.1f}/day]")
            print(f"      Clicks: {week1_clicks} ({week1_clicks_per_day:.1f}/day) [{clicks_change:+.1f}/day]")
            print(f"      Position: {week1_pos:.1f} [{pos_change:+.1f} spots]")
            
            print(f"\n    Verdict: {opt.get('impact_verdict', 'UNKNOWN').upper()}")
            print(f"    Reason: {opt.get('impact_notes', 'N/A')}")
            
            # User input
            print(f"\n    [R]ollback  [K]eep (give more time)  [V]iew details  [S]kip  [Q]uit")
            choice = input("    Your choice: ").strip().lower()
            
            if choice == 'r':
                self._handle_rollback(opt, niche)
            elif choice == 'k':
                print("    [OK] Keeping optimization, will continue measuring")
            elif choice == 'v':
                self._view_optimization_details(opt)
            elif choice == 'q':
                return
    
    def _display_pending_opportunities(self, opportunities: List[Dict], niche: str):
        """Display pending opportunities and handle user input."""
        for i, opp in enumerate(opportunities, 1):
            print(f"\n[{i}] Priority {opp['priority']}/100 - {opp['opportunity_type'].replace('_', ' ').title()}")
            print(f"    Slug: {opp['existing_slug']}")
            print(f"    Performance: {opp['gsc_impressions']} impressions, {opp['gsc_clicks']} clicks, Pos {opp['gsc_position']:.1f}")
            print(f"    Trend: {opp.get('trend_direction', 'unknown').title()}")
            
            print(f"\n    Recommended Action:")
            print(f"      {opp['recommended_action']}")
            
            print(f"\n    DeepSeek Reasoning:")
            print(f"      {opp.get('deepseek_reasoning', 'N/A')}")
            
            # Show suggested sections
            suggested_sections = opp.get('suggested_sections')
            if isinstance(suggested_sections, str):
                suggested_sections = json.loads(suggested_sections)
            
            if suggested_sections:
                print(f"\n    Suggested Sections ({len(suggested_sections)}):")
                for j, section in enumerate(suggested_sections, 1):
                    print(f"      {j}. {section.get('heading', 'Untitled')}")
                    print(f"         {section.get('outline', 'No outline')[:100]}...")
            
            # User input
            print(f"\n    [A]pprove  [R]eject  [S]kip  [V]iew full  [Q]uit")
            choice = input("    Your choice: ").strip().lower()
            
            if choice == 'a':
                self._handle_approve(opp, niche)
            elif choice == 'r':
                reason = input("    Rejection reason: ").strip()
                self._handle_reject(opp, reason)
            elif choice == 'v':
                self._view_optimization_details(opp)
            elif choice == 'q':
                return
    
    def _display_measuring(self, measuring: List[Dict]):
        """Display optimizations currently being measured."""
        for i, opt in enumerate(measuring, 1):
            days_since = self._days_ago(opt['implemented_at'])
            current_week = (days_since // 7) + 1
            
            print(f"\n[{i}] Week {current_week} in progress")
            print(f"    Slug: {opt['existing_slug']}")
            print(f"    Implemented: {days_since} days ago")
            
            # Show available week data
            for week in range(1, 5):
                week_imp = opt.get(f'impact_impressions_week{week}')
                if week_imp is not None:
                    week_clicks = opt.get(f'impact_clicks_week{week}', 0)
                    week_pos = opt.get(f'impact_position_week{week}', 0)
                    
                    baseline_imp_per_day = opt['baseline_impressions'] / 7 if opt.get('baseline_impressions') else 0
                    week_imp_per_day = week_imp / 7
                    change = week_imp_per_day - baseline_imp_per_day
                    
                    print(f"      Week {week}: {week_imp} imp ({week_imp_per_day:.1f}/day, {change:+.1f}/day), {week_clicks} clicks, Pos {week_pos:.1f}")
    
    def _handle_approve(self, opportunity: Dict, niche: str):
        """Handle approval of opportunity."""
        print(f"\n    [APPROVE] Capturing baseline and preparing for implementation...")
        
        # Capture baseline
        self.tracker.capture_baseline(opportunity['id'])
        
        print(f"    [OK] Approved! Baseline captured.")
        print(f"    [NEXT] Run: python agents/utils/content_expander.py {niche} {opportunity['id']}")
        print(f"           to implement the optimization")
    
    def _handle_reject(self, opportunity: Dict, reason: str):
        """Handle rejection of opportunity."""
        self._update_optimization(opportunity['id'], {
            'status': 'rejected',
            'reviewed_at': datetime.now().isoformat(),
            'reviewed_by': 'manual_review',
            'implementation_notes': f'Rejected: {reason}',
        })
        
        print(f"    [OK] Rejected")
    
    def _handle_rollback(self, optimization: Dict, niche: str):
        """Handle rollback of failed optimization."""
        reason = input("    Rollback reason: ").strip()
        if not reason:
            reason = "Negative impact after week 1"
        
        expander = ContentExpander(niche)
        success = expander.rollback_optimization(optimization['id'], reason)
        
        if success:
            print(f"    [OK] Rolled back successfully")
        else:
            print(f"    [ERROR] Rollback failed")
    
    def _view_optimization_details(self, optimization: Dict):
        """Display full optimization details."""
        print("\n" + "=" * 80)
        print("OPTIMIZATION DETAILS")
        print("=" * 80)
        print(json.dumps(optimization, indent=2, default=str))
        print("=" * 80)
        input("\nPress Enter to continue...")
    
    def _get_rollback_candidates(self, niche: str) -> List[Dict]:
        """Get optimizations with negative impact."""
        url = f"{SUPABASE_URL}/rest/v1/blog_optimizations"
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
        }
        
        params = {
            "niche": f"eq.{niche}",
            "impact_verdict": "eq.negative",
            "rolled_back": "eq.false",
            "order": "created_at.desc",
        }
        
        try:
            response = httpx.get(url, headers=headers, params=params, timeout=10.0)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"[ERROR] Failed to fetch rollback candidates: {e}")
            return []
    
    def _get_pending_opportunities(self, niche: str) -> List[Dict]:
        """Get pending opportunities."""
        url = f"{SUPABASE_URL}/rest/v1/blog_optimizations"
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
        }
        
        params = {
            "niche": f"eq.{niche}",
            "status": "eq.pending",
            "order": "priority.desc,created_at.desc",
        }
        
        try:
            response = httpx.get(url, headers=headers, params=params, timeout=10.0)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"[ERROR] Failed to fetch pending opportunities: {e}")
            return []
    
    def _get_measuring_optimizations(self, niche: str) -> List[Dict]:
        """Get optimizations currently being measured."""
        url = f"{SUPABASE_URL}/rest/v1/blog_optimizations"
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
        }
        
        params = {
            "niche": f"eq.{niche}",
            "status": "eq.measuring",
            "order": "implemented_at.desc",
        }
        
        try:
            response = httpx.get(url, headers=headers, params=params, timeout=10.0)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"[ERROR] Failed to fetch measuring optimizations: {e}")
            return []
    
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
    
    def _days_ago(self, timestamp_str: str) -> int:
        """Calculate days ago from timestamp."""
        try:
            timestamp = datetime.fromisoformat(timestamp_str.replace('Z', '+00:00'))
            return (datetime.now() - timestamp).days
        except:
            return 0
    
    def _review_rollbacks(self):
        """Review only rollback candidates."""
        niches = [self.niche] if self.niche else get_enabled_niches()
        
        print("=" * 80)
        print("ROLLBACK CANDIDATES REVIEW")
        print("=" * 80)
        
        all_candidates = []
        for niche in niches:
            candidates = self._get_rollback_candidates(niche)
            for candidate in candidates:
                candidate['niche'] = niche
            all_candidates.extend(candidates)
        
        if not all_candidates:
            print("\n[INFO] No rollback candidates found")
            return
        
        print(f"\nFound {len(all_candidates)} rollback candidates across all sites\n")
        
        self._display_rollback_candidates(all_candidates, None)


def main():
    """Main entry point."""
    niche = None
    rollbacks_only = False
    
    # Parse arguments
    if len(sys.argv) > 1:
        arg = sys.argv[1]
        if arg == '--rollbacks' or arg == '--rollbacks-only':
            rollbacks_only = True
        elif arg in ['property', 'dentists', 'medical']:
            niche = arg
        else:
            print(f"Unknown argument: {arg}")
            print("\nUsage:")
            print("  python review_gsc_opportunities.py              # Review all sites")
            print("  python review_gsc_opportunities.py property     # Review specific site")
            print("  python review_gsc_opportunities.py --rollbacks  # Review rollback candidates only")
            return
    
    reviewer = OpportunityReviewer(niche)
    reviewer.run(rollbacks_only=rollbacks_only)


if __name__ == "__main__":
    main()
