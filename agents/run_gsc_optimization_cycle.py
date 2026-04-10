#!/usr/bin/env python3
"""
GSC Optimization Cycle - Daily Automation Script
Multi-site support with proper sequencing and safeguards

Usage:
    python agents/run_gsc_optimization_cycle.py              # All enabled sites
    python agents/run_gsc_optimization_cycle.py property     # Property site only
    python agents/run_gsc_optimization_cycle.py dentists     # Dentists site only

Schedule:
    Run daily via cron or GitHub Actions
"""

import sys
import os

# Add project root to path
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)

from datetime import datetime
from typing import List, Dict

from agents.config.gsc_config import get_enabled_niches, get_niche_config
from agents.utils.performance_tracker import PerformanceTracker
from agents.utils.gsc_fetcher import GSCDataFetcher
from agents.utils.gsc_analyzer import GSCOpportunityAnalyzer
from agents.utils.gsc_indexing_monitor import GSCIndexingMonitor


def run_daily_cycle(niche: str):
    """
    Daily GSC optimization cycle for a specific niche.
    
    CRITICAL ORDER:
    1. Track existing optimizations (measurement window)
    2. Check indexing status (proactive monitoring)
    3. Fetch NEW GSC data
    4. Analyze opportunities (with safeguards)
    5. Report findings
    
    Args:
        niche: Niche identifier (property, dentists, medical, etc.)
    """
    
    # Load niche config
    config = get_niche_config(niche)
    
    if not config.get('enabled', False):
        print(f"[SKIP] {niche} is not enabled")
        return {
            'niche': niche,
            'status': 'skipped',
            'reason': 'not enabled'
        }
    
    print("=" * 80)
    print(f"GSC OPTIMIZATION CYCLE - {niche.upper()}")
    print(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Site: {config['site_url']}")
    print("=" * 80)
    
    results = {
        'niche': niche,
        'status': 'success',
        'opportunities_found': 0,
        'indexing_issues': 0,
        'optimizations_tracked': 0,
    }
    
    try:
        # STEP 1: Track performance of in-progress optimizations
        print("\n[1/5] Tracking performance of existing optimizations...")
        tracker = PerformanceTracker()
        tracker.run_daily_tracking()
        
        # STEP 2: Check indexing status (sample of pages)
        print("\n[2/5] Checking indexing status...")
        try:
            indexing_monitor = GSCIndexingMonitor(niche)
            indexing_issues = indexing_monitor.check_daily_sample()
            results['indexing_issues'] = len(indexing_issues) if indexing_issues else 0
            
            if indexing_issues:
                print(f"[ALERT] Found {len(indexing_issues)} indexing issues")
        except Exception as e:
            print(f"[WARNING] Indexing check failed: {e}")
            results['indexing_issues'] = 0
        
        # STEP 3: Fetch latest GSC data
        print("\n[3/5] Fetching GSC data...")
        fetcher = GSCDataFetcher(niche)
        records_fetched = fetcher.fetch_and_store(days=28)
        
        if records_fetched == 0:
            print("[INFO] No new GSC data available (site may be too new)")
            results['status'] = 'no_data'
            return results
        
        # STEP 4: Analyze opportunities (with safeguards)
        print("\n[4/5] Analyzing optimization opportunities...")
        analyzer = GSCOpportunityAnalyzer(niche)
        opportunities = analyzer.analyze_opportunities(days=28)
        
        results['opportunities_found'] = len(opportunities) if opportunities else 0
        
        if not opportunities:
            print("[INFO] No new opportunities identified")
        else:
            print(f"[OK] Found {len(opportunities)} new opportunities")
        
        # STEP 5: Generate summary report
        print("\n[5/5] Generating summary report...")
        report = generate_opportunity_report(niche, opportunities, results)
        print(report)
        
        print("\n" + "=" * 80)
        print(f"CYCLE COMPLETE - {niche.upper()}")
        print(f"  Opportunities: {results['opportunities_found']}")
        print(f"  Indexing issues: {results['indexing_issues']}")
        
        if results['opportunities_found'] > 0:
            print(f"\n  [ACTION REQUIRED]")
            print(f"  Run: python agents/review_gsc_opportunities.py {niche}")
        
        print("=" * 80)
        
        return results
    
    except Exception as e:
        print(f"\n[ERROR] Cycle failed for {niche}: {e}")
        import traceback
        traceback.print_exc()
        
        results['status'] = 'failed'
        results['error'] = str(e)
        return results


def run_all_sites():
    """Run optimization cycle for all enabled sites."""
    
    enabled_niches = get_enabled_niches()
    
    print("=" * 80)
    print("MULTI-SITE GSC OPTIMIZATION CYCLE")
    print(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Enabled sites: {', '.join(enabled_niches)}")
    print("=" * 80)
    
    results = {}
    
    for niche in enabled_niches:
        result = run_daily_cycle(niche)
        results[niche] = result
        print("\n")  # Spacing between sites
    
    # Multi-site summary
    print("\n" + "=" * 80)
    print("MULTI-SITE CYCLE COMPLETE")
    print("=" * 80)
    
    total_opportunities = sum(r.get('opportunities_found', 0) for r in results.values())
    total_issues = sum(r.get('indexing_issues', 0) for r in results.values())
    
    for niche, result in results.items():
        status_icon = {
            'success': '[OK]',
            'no_data': '[WAIT]',
            'skipped': '[SKIP]',
            'failed': '[ERROR]'
        }.get(result['status'], '[?]')
        
        print(f"  {status_icon} {niche}: {result.get('opportunities_found', 0)} opportunities, {result.get('indexing_issues', 0)} issues")
    
    print(f"\n  TOTAL: {total_opportunities} opportunities, {total_issues} issues")
    
    if total_opportunities > 0:
        print(f"\n  [ACTION REQUIRED]")
        print(f"  Run: python agents/review_gsc_opportunities.py")
    
    print("=" * 80)
    
    return results


def generate_opportunity_report(niche: str, opportunities: List[Dict], cycle_results: Dict) -> str:
    """Generate summary report for this cycle."""
    
    if not opportunities:
        return "[INFO] No opportunities to report"
    
    # Group by priority
    high_priority = [o for o in opportunities if o['priority'] >= 70]
    medium_priority = [o for o in opportunities if 40 <= o['priority'] < 70]
    low_priority = [o for o in opportunities if o['priority'] < 40]
    
    report = f"""
OPPORTUNITY SUMMARY - {niche.upper()}

High Priority ({len(high_priority)}):
"""
    
    for opp in high_priority[:3]:  # Show top 3
        report += f"  - {opp['existing_slug']} (Priority {opp['priority']})\n"
        report += f"    {opp['recommended_action']}\n"
    
    if medium_priority:
        report += f"\nMedium Priority ({len(medium_priority)})\n"
    
    if low_priority:
        report += f"\nLow Priority ({len(low_priority)})\n"
    
    return report


def main():
    """Main entry point."""
    
    if len(sys.argv) > 1:
        # Run for specific niche
        niche = sys.argv[1]
        
        if niche not in ['property', 'dentists', 'medical', 'solicitors']:
            print(f"[ERROR] Unknown niche: {niche}")
            print("\nAvailable niches: property, dentists, medical, solicitors")
            return
        
        run_daily_cycle(niche)
    else:
        # Run for all enabled sites
        run_all_sites()


if __name__ == "__main__":
    main()
