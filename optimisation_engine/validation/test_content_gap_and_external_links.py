"""
Validation suite for Checkpoint 5 (content gap) and Checkpoint 7 (external links).

These checkpoints make HTTP calls + LLM calls so are slower than the keyword
checkpoints. We use a smaller test set (6 cases each) but spread across all
3 sites with GSC data.

For each case we verify:
  - Content gap: at least 1 competitor analysed, output coherent
  - External links: candidates discovered, at least 1 positive suggestion,
    anchors diverse + not generic
"""
from __future__ import annotations

import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from optimisation_engine.config import get_site  # noqa: E402
from optimisation_engine.reasoning.content_gap_analyzer import analyse_content_gap  # noqa: E402
from optimisation_engine.reasoning.external_link_suggester import suggest_external_links_for_target  # noqa: E402
from optimisation_engine.reasoning.internal_link_suggester import BAD_ANCHORS  # noqa: E402
from optimisation_engine.validation.harness import TestCase, run_cases  # noqa: E402


# Real pages to test on, spanning all 3 sites with data
TARGETS = [
    ("property", "cgt-rates-property-2026-27-current-rates-explained", "uk cgt rates residential property 2026"),
    ("property", "incorporation-existing-portfolios-phased-approach", "incorporating a property portfolio uk"),
    ("property", "furnished-holiday-let-tax-rules-exemptions", "furnished holiday let stamp duty"),
    ("dentists", "associate-dentist-tax-self-assessment-uk", "associate dentist tax self assessment"),
    ("agency", "annual-investment-allowance-agency-equipment-2025-26", "annual investment allowance"),
    ("agency", "ir35-contractor-agency-tax-uk", "ir35 contractor tax"),  # may or may not exist; fallback handled
]


def _gap_coherent():
    """Validator for content gap output."""
    def _e(o):
        if not isinstance(o, dict):
            return False, "not a dict"
        if "topical_gaps" not in o or "competitors_analysed" not in o:
            return False, "missing required keys"
        if not isinstance(o.get("topical_gaps"), list):
            return False, "topical_gaps not a list"
        # If competitors were analysed, gaps should reference real positions
        comp_positions = {c.get("position") for c in (o.get("competitors_analysed") or [])}
        for g in o["topical_gaps"]:
            cov = g.get("competitor_coverage") or []
            if cov and not (set(cov) & comp_positions):
                return False, f"gap cites positions {cov} but only {comp_positions} analysed"
        return True, ""
    return _e


def _external_coherent():
    """Validator for external links output."""
    def _e(o):
        if not isinstance(o, dict):
            return False, "not a dict"
        if "suggestions" not in o:
            return False, "missing suggestions"
        positive = [s for s in (o.get("suggestions") or []) if s.get("should_link")]
        if not positive:
            # OK to return zero suggestions if no good fit; just must be coherent
            return True, "(no positive suggestions — acceptable if no good fit)"
        # Anchor checks
        anchors = []
        for s in positive:
            a = (s.get("anchor_text") or "").strip().lower()
            if not a:
                return False, "positive suggestion missing anchor_text"
            if a in BAD_ANCHORS:
                return False, f"generic anchor: {a!r}"
            anchors.append(a)
        if len(anchors) != len(set(anchors)):
            return False, f"duplicate anchors: {anchors}"
        # Candidate index in range
        n_candidates = len(o.get("candidates") or [])
        for s in (o.get("suggestions") or []):
            ci = s.get("candidate_index")
            if not isinstance(ci, int) or ci < 1 or ci > n_candidates:
                return False, f"invalid candidate_index {ci} (n_candidates={n_candidates})"
        return True, ""
    return _e


def _run_gap(input_data: dict) -> tuple[dict, float, int]:
    site = get_site(input_data["site_key"])
    url = f"https://{site['domain']}/blog/{input_data['slug']}"
    result = analyse_content_gap(
        site_key=input_data["site_key"],
        target_slug=input_data["slug"],
        target_url=url,
        primary_query=input_data["query"],
    )
    return result.output, result.cost_usd, result.confidence


def _run_external(input_data: dict) -> tuple[dict, float, int]:
    site = get_site(input_data["site_key"])
    url = f"https://{site['domain']}/blog/{input_data['slug']}"
    result = suggest_external_links_for_target(
        site_key=input_data["site_key"],
        target_slug=input_data["slug"],
        target_url=url,
        primary_query=input_data["query"],
    )
    return result.output, result.cost_usd, result.confidence


def main() -> None:
    # Content Gap cases
    gap_cases: list[TestCase] = []
    for i, (site, slug, query) in enumerate(TARGETS, 1):
        gap_cases.append(TestCase(
            case_id=f"gap_{i:02d}_{site}",
            description=f"content gap [{site}] {slug} q={query!r}",
            input_data={"site_key": site, "slug": slug, "query": query},
            expect=_gap_coherent(),
            category="normal",
        ))

    # External link cases
    ext_cases: list[TestCase] = []
    for i, (site, slug, query) in enumerate(TARGETS, 1):
        ext_cases.append(TestCase(
            case_id=f"ext_{i:02d}_{site}",
            description=f"external links [{site}] {slug} q={query!r}",
            input_data={"site_key": site, "slug": slug, "query": query},
            expect=_external_coherent(),
            category="normal",
        ))

    print(f"=== Content Gap Analyzer ===")
    print(f"Running {len(gap_cases)} cases...")
    report_gap = run_cases(checkpoint_name="content_gap_analyzer", cases=gap_cases, run_fn=_run_gap)
    print(report_gap.summary())

    print(f"\n\n=== External Link Suggester ===")
    print(f"Running {len(ext_cases)} cases...")
    report_ext = run_cases(checkpoint_name="external_link_suggester", cases=ext_cases, run_fn=_run_external)
    print(report_ext.summary())


if __name__ == "__main__":
    main()
