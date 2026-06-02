"""
Competitor SERP Analysis Engine.

Entry point: run_competitor_analysis(site_key) runs the full pipeline:
  1. SERP fetch for all pages with GSC impressions
  2. Parse our pages + top competitor pages (text-level extraction)
  3. Compute gap reports (quantitative + LLM content analysis)
  4. Generate improvement briefs

Phase 0 (one-time calibration):
  run_discovery(site_key) -- run manually first to see what top pages do
"""
from __future__ import annotations

from typing import Any


def run_competitor_analysis(
    site_key: str,
    *,
    max_pages: int | None = None,
    skip_serps: bool = False,
    skip_gaps: bool = False,
    skip_briefs: bool = False,
    n_competitors: int = 3,
) -> dict[str, Any]:
    """
    Full competitor analysis pipeline for a site.

    Args:
        site_key: e.g. "property", "dentists", "medical"
        max_pages: limit pages processed (for dev runs)
        skip_serps: if True, skip SERP fetch + page parsing (use existing data)
        skip_gaps: if True, skip gap analysis
        skip_briefs: if True, skip brief generation
        n_competitors: number of competitor pages to analyse per query

    Returns:
        Summary dict with row counts and cost.
    """
    from optimisation_engine.competitor.serp_runner import run_serps
    from optimisation_engine.competitor.gap_analyser import run_gap_analysis
    from optimisation_engine.competitor.brief_generator import run_brief_generation

    report: dict[str, Any] = {"site_key": site_key}

    if not skip_serps:
        report["serps"] = run_serps(
            site_key,
            max_pages=max_pages,
            parse_competitors=True,
            n_competitors=n_competitors,
        )

    if not skip_gaps:
        report["gaps"] = run_gap_analysis(site_key, max_pages=max_pages)

    if not skip_briefs:
        report["briefs"] = run_brief_generation(site_key, max_pages=max_pages)

    return report
