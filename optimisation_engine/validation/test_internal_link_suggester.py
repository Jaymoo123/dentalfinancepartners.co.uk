"""
Validation suite for internal_link_suggester.

Tests across diverse target pages spanning Property + Dentists + Agency.
For each target, the harness sees what links the suggester proposes and
verifies:
  - All from_slugs exist in the site's content directory
  - Anchor texts are diverse (the v2 validator)
  - Anchors contain a significant cluster token
  - Generic anchors are absent
  - Multi-shot consistency on 3 cases

Constraint: each test case triggers a full LLM call per shot. We cap to 10
distinct targets to keep cost reasonable (~$0.05 total).
"""
from __future__ import annotations

import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.config import get_site  # noqa: E402
from optimisation_engine.reasoning.internal_link_suggester import (  # noqa: E402
    BAD_ANCHORS,
    _significant_tokens,
    _tokens_overlap_stemmed,
    suggest_links_for_target,
)
from optimisation_engine.validation.harness import TestCase, run_cases  # noqa: E402


def _run_input(input_data: dict) -> tuple[dict, float, int]:
    result = suggest_links_for_target(
        site_key=input_data["site_key"],
        target_slug=input_data["target_slug"],
        target_url=input_data["target_url"],
        primary_query=input_data["primary_query"],
    )
    return result.output, result.cost_usd, result.confidence


def _slug_exists(site_key: str, slug: str) -> bool:
    site = get_site(site_key)
    p = ROOT / site["content_dir"] / f"{slug}.md"
    if p.exists():
        return True
    # fuzzy
    return bool(list((ROOT / site["content_dir"]).glob(f"{slug}*.md")))


def _expects_coherent(site_key: str, primary_query: str):
    """All suggestions reference real slugs, anchors are diverse + not generic."""
    cluster_tokens = _significant_tokens(primary_query)

    def _e(o):
        if not isinstance(o, dict):
            return False, "not a dict"
        if not isinstance(o.get("suggestions"), list):
            return False, "suggestions not a list"
        positive = [s for s in o["suggestions"] if s.get("should_link")]
        # Slug existence
        for s in o["suggestions"]:
            slug = s.get("from_slug")
            if slug and not _slug_exists(site_key, slug):
                return False, f"from_slug {slug!r} does not exist on filesystem"
        # Anchor diversity (case-insensitive)
        anchors = [s["anchor_text"].strip().lower() for s in positive if s.get("anchor_text")]
        if len(anchors) != len(set(anchors)):
            return False, f"duplicate anchors detected: {anchors}"
        # No bad anchors
        for s in positive:
            a = (s.get("anchor_text") or "").strip().lower()
            if a in BAD_ANCHORS:
                return False, f"generic anchor used: {a!r}"
        # Anchor contains cluster token (with stemming)
        for s in positive:
            a_tokens = _significant_tokens(s.get("anchor_text") or "")
            if not _tokens_overlap_stemmed(a_tokens, cluster_tokens):
                return False, f"anchor {s.get('anchor_text')!r} contains no cluster token (cluster={sorted(cluster_tokens)})"
        return True, ""
    return _e


# Real shipped Property changes + a Dentists + Agency target
TARGETS = [
    # Property — shipped today
    ("property", "cgt-rates-property-2026-27-current-rates-explained", "https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/cgt-rates-property-2026-27-current-rates-explained", "uk cgt rates residential property 2026"),
    ("property", "cgt-payment-deadlines-property-sales-2026", "https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026", "hmrc cgt reporting deadlines 2026"),
    ("property", "incorporation-existing-portfolios-phased-approach", "https://propertytaxpartners.co.uk/blog/incorporation-existing-portfolios-phased-approach", "incorporating a property portfolio uk"),
    # Property — other strong topics
    ("property", "furnished-holiday-let-tax-rules-exemptions", "https://www.propertytaxpartners.co.uk/blog/property-types-specialist-tax/furnished-holiday-let-tax-rules-exemptions", "stamp duty furnished holiday lettings"),
    # Dentists
    ("dentists", "associate-dentist-tax-self-assessment-uk", "https://www.dentalfinancepartners.co.uk/blog/associate-tax/associate-dentist-tax-self-assessment-uk", "associate dentist tax"),
    # Agency
    ("agency", "annual-investment-allowance-agency-equipment-2025-26", "https://www.agencyfounderfinance.co.uk/blog/tax-and-compliance/annual-investment-allowance-agency-equipment-2025-26", "annual investment allowance"),
]


def build_cases() -> list[TestCase]:
    cases: list[TestCase] = []
    for i, (site, slug, url, q) in enumerate(TARGETS, 1):
        cases.append(TestCase(
            case_id=f"link_{i:02d}_{site}_{slug[:25]}",
            description=f"[{site}] target={slug} query={q!r}",
            input_data={"site_key": site, "target_slug": slug, "target_url": url, "primary_query": q},
            expect=_expects_coherent(site, q),
            category="normal",
        ))

    # Multi-shot: 2 cases x 3 runs for consistency
    for i, (site, slug, url, q) in enumerate(TARGETS[:2], 1):
        cases.append(TestCase(
            case_id=f"link_ms_{i:02d}_{site}",
            description=f"3x consistency [{site}] {slug}",
            input_data={"site_key": site, "target_slug": slug, "target_url": url, "primary_query": q},
            expect=_expects_coherent(site, q),
            category="multi-shot",
            multi_shot=3,
            agreement_field=None,  # checking output structure consistency rather than a single field
        ))
    return cases


def main() -> None:
    cases = build_cases()
    print(f"Running {len(cases)} cases against internal_link_suggester...")
    report = run_cases(checkpoint_name="internal_link_suggester", cases=cases, run_fn=_run_input)
    print(report.summary())

    failures = [c for c in report.case_results if c.failed_runs > 0]
    if failures:
        print("\n=== FAILURE DETAIL ===")
        for f in failures[:5]:
            print(f"\n[{f.case_id}]")
            for n in f.notes:
                print(f"  {n}")


if __name__ == "__main__":
    main()
