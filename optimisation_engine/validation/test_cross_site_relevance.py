"""
Validation suite for cross_site_relevance_v2.

30 test cases spanning:
  - normal: clear-cut accounting queries (should be kept, correct primary_site)
  - normal cross-niche: queries that span multiple sites
  - normal niche-specific: queries that belong to ONE niche only
  - adversarial: noise queries (vehicle tax, brand, US, consumer, etc.)
  - edge: ambiguous queries where the call is judgement-dependent

Multi-shot: 8 representative cases run 3x to test consistency.
"""
from __future__ import annotations

from optimisation_engine.reasoning.cross_site_relevance_v2 import score_batch
from optimisation_engine.validation.harness import (
    HarnessReport,
    TestCase,
    expects_all,
    expects_field_equals,
    expects_field_in,
    run_cases,
)


def _run_one_keyword(kw: str) -> tuple[dict, float, int]:
    """Adapter: wrap score_batch (which takes a list) into single-keyword API."""
    result = score_batch([kw])
    # Output shape: {"results": [{...}], "confidence": N}
    inner = result.output.get("results", [{}])[0] if result.output else {}
    return inner, result.cost_usd, result.confidence


def _expects_kept_for(*expected_sites: str) -> "Callable":
    """Output must have kept=true and relevant_sites containing all expected_sites."""
    def _e(o):
        if not isinstance(o, dict):
            return False, "not a dict"
        if not o.get("kept"):
            return False, f"expected kept=true, got kept={o.get('kept')} reason={o.get('reject_reason')!r}"
        rs = set(o.get("relevant_sites") or [])
        missing = set(expected_sites) - rs
        if missing:
            return False, f"expected sites {expected_sites} missing from relevant_sites; got {sorted(rs)}"
        return True, ""
    return _e


def _expects_rejected(reason_in: set | None = None) -> "Callable":
    def _e(o):
        if not isinstance(o, dict):
            return False, "not a dict"
        if o.get("kept"):
            return False, f"expected kept=false, got kept=true"
        if reason_in and o.get("reject_reason") not in reason_in:
            return False, f"reject_reason={o.get('reject_reason')!r} not in {reason_in}"
        return True, ""
    return _e


def build_cases() -> list[TestCase]:
    cases: list[TestCase] = []

    # ---- NORMAL: clear-cut accounting queries (should be KEPT) -------------
    normal_kept = [
        ("uk corporation tax rates 2026", "all-niches", _expects_kept_for("generalist")),
        ("section 24 mortgage interest restriction", "property-only", expects_all(
            _expects_kept_for("property"),
            expects_field_equals("primary_site", "property"),
        )),
        ("ir35 contractor tax", "agency+generalist", _expects_kept_for("agency")),
        ("nhs dental contract accounting", "dentists-only", expects_all(
            _expects_kept_for("dentists"),
            expects_field_equals("primary_site", "dentists"),
        )),
        ("annual investment allowance", "cross-niche", _expects_kept_for("generalist")),
        ("buying a dental practice", "dentists-only", expects_all(
            _expects_kept_for("dentists"),
            expects_field_equals("primary_site", "dentists"),
        )),
        ("vat registration threshold uk", "generalist-primary", _expects_kept_for("generalist")),
        ("r&d tax credit claim uk", "generalist+agency", _expects_kept_for("generalist")),
        ("holiday let tax rules uk", "property-only", _expects_kept_for("property")),
        ("associate dentist self assessment", "dentists-only", _expects_kept_for("dentists")),
        ("agency exit planning uk", "agency-only", _expects_kept_for("agency")),
        ("how to incorporate a property portfolio", "property-only", _expects_kept_for("property")),
        ("making tax digital for income tax", "generalist", _expects_kept_for("generalist")),
        ("dubai relocation tax uk founders", "agency-only", _expects_kept_for("agency")),
    ]
    for i, (kw, desc, exp) in enumerate(normal_kept, 1):
        cases.append(TestCase(
            case_id=f"normal_kept_{i:02d}",
            description=f"{desc}: {kw}",
            input_data=kw,
            expect=exp,
            category="normal",
        ))

    # ---- ADVERSARIAL: should be REJECTED -----------------------------------
    adversarial = [
        ("tax car checker", _expects_rejected({"consumer_product_or_service"})),
        ("companies house login", _expects_rejected({"navigational_or_branded"})),
        ("barclays plc business banking", _expects_rejected({"navigational_or_branded"})),
        ("professional corporation us", _expects_rejected({"us_specific"})),
        ("401k contribution limits", _expects_rejected({"us_specific"})),
        ("teeth whitening cost london", _expects_rejected({"off_topic", "consumer_product_or_service"})),
        ("car insurance quote", _expects_rejected({"consumer_product_or_service"})),
        ("rightmove flats for sale london", _expects_rejected({"consumer_product_or_service", "off_topic"})),
        ("mortgage calculator monthly payment", _expects_rejected({"consumer_product_or_service"})),
        ("how to make a paper aeroplane", _expects_rejected({"off_topic"})),
        ("tax", _expects_rejected({"low_quality_or_unclear"})),  # too short, ambiguous
    ]
    for i, (kw, exp) in enumerate(adversarial, 1):
        cases.append(TestCase(
            case_id=f"adversarial_{i:02d}",
            description=f"noise: {kw}",
            input_data=kw,
            expect=exp,
            category="adversarial",
        ))

    # ---- EDGE: judgement calls; we want a reasonable answer, not strict -----
    # For these we just check the LLM gives a coherent classification
    def _coherent(o):
        if not isinstance(o, dict):
            return False, "not a dict"
        if not isinstance(o.get("kept"), bool):
            return False, "kept is not bool"
        if o["kept"]:
            if not o.get("relevant_sites"):
                return False, "kept=true but relevant_sites empty"
            if o.get("primary_site") not in {"agency", "property", "dentists", "generalist"}:
                return False, f"primary_site={o.get('primary_site')!r} not valid"
        else:
            if not o.get("reject_reason"):
                return False, "kept=false but reject_reason empty"
        return True, ""
    edge = [
        "self employed tax return uk",  # could be agency or generalist
        "vat calculator uk",             # legitimate tool or off-topic? grey
        "limited company vs sole trader",  # generalist
        "uk income tax bands 2026",      # generalist
        "stamp duty calculator",          # tool, grey
        "self assessment penalty appeal",  # generalist
    ]
    for i, kw in enumerate(edge, 1):
        cases.append(TestCase(
            case_id=f"edge_{i:02d}",
            description=f"edge case: {kw}",
            input_data=kw,
            expect=_coherent,
            category="edge",
        ))

    # ---- MULTI-SHOT: 5 representative cases at multi_shot=3 ----------------
    multi_shot_inputs = [
        ("annual investment allowance", _expects_kept_for("generalist"), "kept"),
        ("tax car checker", _expects_rejected({"consumer_product_or_service"}), "kept"),
        ("section 24 mortgage interest", _expects_kept_for("property"), "primary_site"),
        ("nhs dental contract accounting", _expects_kept_for("dentists"), "primary_site"),
        ("companies house login", _expects_rejected({"navigational_or_branded"}), "kept"),
    ]
    for i, (kw, exp, agree_field) in enumerate(multi_shot_inputs, 1):
        cases.append(TestCase(
            case_id=f"multi_shot_{i:02d}",
            description=f"3x consistency: {kw}",
            input_data=kw,
            expect=exp,
            category="multi-shot",
            multi_shot=3,
            agreement_field=agree_field,
        ))

    return cases


def main() -> None:
    cases = build_cases()
    print(f"Running {len(cases)} test cases against cross_site_relevance_v2...")
    report = run_cases(checkpoint_name="cross_site_relevance_v2", cases=cases, run_fn=_run_one_keyword)
    print(report.summary())


if __name__ == "__main__":
    main()
