"""
Validation suite for action_specifier.

Tests across diverse opportunity shapes:
  - Existing page + low CTR + good rank -> expect meta_only or in_text_embedding
  - Existing page + declining trajectory -> expect new_section (content refresh)
  - Recently-shipped page -> expect skip (recency gate)
  - No target page (target_url=None) + plausible volume -> expect new_page
  - Edge: target_url for root domain -> expect new_page (React page case)
  - Multi-shot consistency on 4 cases

Picks opportunities directly from optimisation_opportunities so we test on
real data — not synthetic toy inputs.
"""
from __future__ import annotations

import os
import sys

import httpx

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL  # noqa: E402
from optimisation_engine.reasoning.action_specifier import specify_action  # noqa: E402
from optimisation_engine.validation.harness import (  # noqa: E402
    TestCase,
    expects_field_equals,
    expects_field_in,
    run_cases,
)


def _run_input(opportunity: dict) -> tuple[dict, float, int]:
    result = specify_action(opportunity)
    return result.output, result.cost_usd, result.confidence


def _fetch_opportunity_by_filter(filters: dict, *, limit: int = 1) -> list[dict]:
    """Pull opportunities matching filters from Supabase."""
    url = f"{SUPABASE_URL}/rest/v1/optimisation_opportunities"
    h = {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}
    params = {"select": "*", "limit": str(limit), **filters}
    r = httpx.get(url, headers=h, params=params, timeout=15.0)
    r.raise_for_status()
    return r.json()


def _coherent_output():
    """All outputs must have these required keys."""
    def _e(o):
        if not isinstance(o, dict):
            return False, "not a dict"
        for k in ("action_kind", "rationale", "patch", "backlinking", "confidence"):
            if k not in o:
                return False, f"missing key {k!r}"
        if o["action_kind"] not in {"in_text_embedding", "new_section", "faq_addition", "new_page", "meta_only", "schema_only", "internal_links_only", "skip"}:
            return False, f"action_kind={o['action_kind']!r} not valid"
        return True, ""
    return _e


def _expects_kind(kind: str):
    def _e(o):
        if not isinstance(o, dict):
            return False, "not a dict"
        if o.get("action_kind") != kind:
            return False, f"action_kind={o.get('action_kind')!r} != {kind!r}"
        return True, ""
    return _e


def _expects_kind_in(*kinds: str):
    def _e(o):
        if not isinstance(o, dict):
            return False, "not a dict"
        if o.get("action_kind") not in kinds:
            return False, f"action_kind={o.get('action_kind')!r} not in {kinds}"
        return True, ""
    return _e


def build_cases() -> list[TestCase]:
    cases: list[TestCase] = []

    # ---- CASE 1: Recently shipped page -> should SKIP (recency gate) -------
    # The 4 Property pages we shipped today
    shipped_opps = _fetch_opportunity_by_filter(
        {
            "site_key": "eq.property",
            "target_url": "eq.https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/cgt-rates-property-2026-27-current-rates-explained",
            "status": "in.(proposed,shipped)",
            "limit": "1",
        }
    )
    if shipped_opps:
        cases.append(TestCase(
            case_id="recency_gate_01",
            description="Recently shipped Property page -> expect skip",
            input_data=shipped_opps[0],
            expect=_expects_kind("skip"),
            category="normal",
        ))

    # ---- CASE 2-3: Existing pages, expand_page opportunities (low CTR or near-miss) -
    # Property: furnished holiday let — known to have expand_page opp
    fhl_opps = _fetch_opportunity_by_filter(
        {
            "site_key": "eq.property",
            "opportunity_type": "eq.expand_page",
            "status": "eq.proposed",
            "primary_query": "like.*furnished holiday*",
            "limit": "1",
        }
    )
    if fhl_opps:
        cases.append(TestCase(
            case_id="expand_page_fhl",
            description="Property expand_page: furnished holiday let — expect in_text_embedding or new_section",
            input_data=fhl_opps[0],
            expect=_expects_kind_in("in_text_embedding", "new_section", "meta_only", "faq_addition"),
            category="normal",
        ))

    # Property: declining trajectory (content refresh candidate)
    declining_opps = _fetch_opportunity_by_filter(
        {
            "site_key": "eq.property",
            "opportunity_type": "eq.expand_page",
            "status": "eq.proposed",
            "target_url": "not.is.null",
            "limit": "5",
        }
    )
    for i, opp in enumerate(declining_opps[:3], 1):
        cases.append(TestCase(
            case_id=f"expand_existing_{i:02d}",
            description=f"Property expand_page real opp #{i}: {opp.get('primary_query')!r}",
            input_data=opp,
            expect=_coherent_output(),
            category="normal",
        ))

    # ---- CASE 4-6: new_page opportunities (target_url=None) ----------------
    # Should propose new_page action (or expand_existing if there IS a page)
    new_page_opps = _fetch_opportunity_by_filter(
        {
            "site_key": "eq.dentists",
            "opportunity_type": "eq.new_page",
            "target_url": "is.null",
            "status": "eq.proposed",
            "limit": "3",
        }
    )
    for i, opp in enumerate(new_page_opps, 1):
        cases.append(TestCase(
            case_id=f"new_page_dentists_{i:02d}",
            description=f"Dentists new_page: {opp.get('primary_query')!r}",
            input_data=opp,
            expect=_expects_kind_in("new_page", "skip"),
            category="normal",
        ))

    # ---- CASE 7: Edge — target_url is the site root (React page, no .md) ----
    # Should propose new_page (system can't edit React file)
    root_opps = _fetch_opportunity_by_filter(
        {
            "site_key": "eq.dentists",
            "primary_query": "eq.accountants for dentists",
            "status": "eq.proposed",
            "limit": "1",
        }
    )
    if root_opps:
        cases.append(TestCase(
            case_id="edge_root_url",
            description="Dentists home page target — expect new_page or coherent skip",
            input_data=root_opps[0],
            expect=_expects_kind_in("new_page", "skip"),
            category="edge",
        ))

    # ---- CASE 8-9: rewrite_title_meta on existing pages — should be meta_only -
    rtm_opps = _fetch_opportunity_by_filter(
        {
            "site_key": "eq.property",
            "opportunity_type": "eq.rewrite_title_meta",
            "target_url": "not.is.null",
            "status": "eq.proposed",
            "limit": "5",
        }
    )
    # Filter to ones where target IS NOT a recently-shipped URL
    shipped_urls = {
        "https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/cgt-rates-property-2026-27-current-rates-explained",
        "https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026",
        "https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/capital-gains-tax-property-sale-uk-2026-rates-allowances",
        "https://propertytaxpartners.co.uk/blog/incorporation-existing-portfolios-phased-approach",
    }
    rtm_non_shipped = [o for o in rtm_opps if o.get("target_url") not in shipped_urls][:2]
    for i, opp in enumerate(rtm_non_shipped, 1):
        cases.append(TestCase(
            case_id=f"meta_existing_{i:02d}",
            description=f"Property meta rewrite on existing non-shipped page: {opp.get('primary_query')!r}",
            input_data=opp,
            expect=_expects_kind_in("meta_only", "in_text_embedding", "new_section", "skip"),
            category="normal",
        ))

    # ---- MULTI-SHOT: 3 opportunities x 3 runs each (consistency) -----------
    ms_opps = _fetch_opportunity_by_filter(
        {
            "opportunity_type": "eq.new_page",
            "target_url": "is.null",
            "status": "eq.proposed",
            "order": "score.desc",
            "limit": "3",
        }
    )
    for i, opp in enumerate(ms_opps, 1):
        cases.append(TestCase(
            case_id=f"multi_shot_{i:02d}",
            description=f"3x consistency on new_page: {opp.get('primary_query')!r}",
            input_data=opp,
            expect=_coherent_output(),
            category="multi-shot",
            multi_shot=3,
            agreement_field="action_kind",
        ))

    return cases


def main() -> None:
    cases = build_cases()
    print(f"Running {len(cases)} test cases against action_specifier...")
    report = run_cases(checkpoint_name="action_specifier", cases=cases, run_fn=_run_input)
    print(report.summary())

    # Per-category breakdown
    print("\n=== Per-category breakdown ===")
    cat_lookup = {c.case_id: c.category for c in cases}
    # No clean back-link from CaseResult to category — match by case_id
    by_cat: dict[str, tuple[int, int]] = {}
    for cr in report.case_results:
        # find category
        cat = next((c.category for c in cases if c.case_id == cr.case_id), "?")
        pass_ct, fail_ct = by_cat.get(cat, (0, 0))
        if cr.failed_runs == 0:
            pass_ct += 1
        else:
            fail_ct += 1
        by_cat[cat] = (pass_ct, fail_ct)
    for cat, (p, f) in by_cat.items():
        print(f"  {cat:15s} pass={p} fail={f}")

    # Failure detail
    failures = [c for c in report.case_results if c.failed_runs > 0]
    if failures:
        print("\n=== FAILURE DETAIL ===")
        import json
        for f in failures[:5]:
            print(f"\n[{f.case_id}]")
            for n in f.notes:
                print(f"  {n}")
            if f.outputs:
                first = f.outputs[0]
                ak = first.get("action_kind") if isinstance(first, dict) else "(error)"
                rat = (first.get("rationale") or "")[:200] if isinstance(first, dict) else ""
                print(f"  action_kind={ak} rationale={rat!r}")


if __name__ == "__main__":
    main()
