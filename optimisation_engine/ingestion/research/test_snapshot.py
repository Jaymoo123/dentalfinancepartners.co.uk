"""Self-check for multi-segment aggregation + thin-gate logic.

No network, no frameworks. Run with: python optimisation_engine/ingestion/research/test_snapshot.py
"""
from __future__ import annotations

import sys
import os

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from optimisation_engine.ingestion.research.config import NicheConfig, Segment
from optimisation_engine.ingestion.research.snapshot import build_snapshot, _build_segment_block


def _make_incorp(months: list[str], sics: dict[str, int], union_base: int = 0) -> list[dict]:
    """Synthetic incorporation rows."""
    rows = []
    for m in months:
        for sic, cnt in sics.items():
            rows.append({"month": m, "sic_code": sic, "sic_label": sic, "count": cnt, "is_union": False})
        union = union_base or sum(sics.values())
        rows.append({"month": m, "sic_code": "union", "sic_label": "union", "count": union, "is_union": True})
    return rows


def _months(n: int, start_yr: int = 2020, start_mo: int = 1) -> list[str]:
    out = []
    y, m = start_yr, start_mo
    for _ in range(n):
        out.append(f"{y:04d}-{m:02d}")
        m += 1
        if m == 13:
            y, m = y + 1, 1
    return out


def test_multi_segment_aggregation() -> None:
    """Two-segment config: per-segment ttm aggregates all codes in the segment.
    Headline ttm uses primary_sic (first sic_codes[0] of primary segment).
    """
    months = _months(30)
    incorp = _make_incorp(months, {"A001": 100, "A002": 50, "B001": 200})

    cfg = NicheConfig(
        site_key="test",
        slug="test",
        snapshot_path="/tmp/test.json",
        sic_labels={"A001": "A001", "A002": "A002", "B001": "B001"},
        segments=(
            # Primary: single-SIC (A001 only) -- headline uses this SIC
            Segment(key="seg_a_primary", label="Seg A primary", sic_codes=("A001",), is_primary=True),
            # Broader seg_a: both A codes
            Segment(key="seg_a_all", label="Seg A all", sic_codes=("A001", "A002")),
            Segment(key="seg_b", label="Seg B", sic_codes=("B001",)),
        ),
        provisional_months=2,
        thin_segment_min_ttm=1,  # low threshold so not thin
    )
    snap = build_snapshot(cfg, incorp, months[-1])

    segs = {s["key"]: s for s in snap["segments"]}
    assert "seg_a_primary" in segs
    assert "seg_a_all" in segs
    assert "seg_b" in segs

    # seg_a_primary ttm = 100 * 12 = 1200 (settled end = 28 months, last 12 = 12 * 100)
    assert segs["seg_a_primary"]["ttm"] == 1200, f"seg_a_primary ttm wrong: {segs['seg_a_primary']['ttm']}"
    # seg_a_all ttm = (100+50) * 12 = 1800
    assert segs["seg_a_all"]["ttm"] == 1800, f"seg_a_all ttm wrong: {segs['seg_a_all']['ttm']}"
    # seg_b ttm = 200 * 12 = 2400
    assert segs["seg_b"]["ttm"] == 2400, f"seg_b ttm wrong: {segs['seg_b']['ttm']}"

    # Headline uses primary_sic (A001): primary_cos_ttm = 1200
    h = snap["headline"]
    assert h["primary_cos_ttm"] == 1200, f"headline primary_cos_ttm wrong: {h['primary_cos_ttm']}"
    print("  [PASS] multi-segment aggregation")


def test_thin_gate_per_segment() -> None:
    """Thin gate: per-segment thin when ttm < min_ttm."""
    months = _months(30)
    # seg_a gets 5/month (ttm=60 < 120), seg_b gets 200/month (ttm=2400 > 120)
    incorp = _make_incorp(months, {"A001": 5, "B001": 200})

    cfg = NicheConfig(
        site_key="test2",
        slug="test2",
        snapshot_path="/tmp/test2.json",
        sic_labels={"A001": "A001", "B001": "B001"},
        segments=(
            Segment(key="seg_a", label="Seg A", sic_codes=("A001",), is_primary=True),
            Segment(key="seg_b", label="Seg B", sic_codes=("B001",)),
        ),
        provisional_months=2,
        thin_segment_min_ttm=120,
    )
    snap = build_snapshot(cfg, incorp, months[-1])
    segs = {s["key"]: s for s in snap["segments"]}

    assert segs["seg_a"]["thin_segment"] is True, "seg_a should be thin (ttm=60 < 120)"
    assert segs["seg_b"]["thin_segment"] is False, f"seg_b should not be thin (ttm=2400), got thin={segs['seg_b']['thin_segment']}"
    # Niche-level thin: primary (seg_a) is thin
    assert snap["headline"]["thin"] is True, "headline.thin should be True when primary is thin"
    print("  [PASS] per-segment thin gate")


def test_thin_gate_niche_level_not_thin() -> None:
    """Niche thin flag is False when primary segment is healthy."""
    months = _months(30)
    incorp = _make_incorp(months, {"A001": 200, "B001": 5})

    cfg = NicheConfig(
        site_key="test3",
        slug="test3",
        snapshot_path="/tmp/test3.json",
        sic_labels={"A001": "A001", "B001": "B001"},
        segments=(
            Segment(key="seg_a", label="Seg A", sic_codes=("A001",), is_primary=True),
            Segment(key="seg_b", label="Seg B", sic_codes=("B001",)),
        ),
        provisional_months=2,
        thin_segment_min_ttm=120,
    )
    snap = build_snapshot(cfg, incorp, months[-1])
    assert snap["headline"]["thin"] is False, "headline.thin should be False when primary is healthy"
    print("  [PASS] niche-level thin gate (healthy primary)")


def test_provisional_exclusion_per_segment() -> None:
    """Provisional months excluded from settled stats per segment."""
    months = _months(14)
    # Last 2 months have higher count (simulating provisional over-count)
    rows = []
    for m in months[:-2]:
        rows.append({"month": m, "sic_code": "A001", "sic_label": "A001", "count": 100, "is_union": False})
        rows.append({"month": m, "sic_code": "union", "sic_label": "union", "count": 100, "is_union": True})
    for m in months[-2:]:
        rows.append({"month": m, "sic_code": "A001", "sic_label": "A001", "count": 9999, "is_union": False})
        rows.append({"month": m, "sic_code": "union", "sic_label": "union", "count": 9999, "is_union": True})

    cfg = NicheConfig(
        site_key="test4",
        slug="test4",
        snapshot_path="/tmp/test4.json",
        sic_labels={"A001": "A001"},
        segments=(
            Segment(key="seg_a", label="Seg A", sic_codes=("A001",), is_primary=True),
        ),
        provisional_months=2,
        thin_segment_min_ttm=1,
    )
    snap = build_snapshot(cfg, rows, months[-1])
    segs = {s["key"]: s for s in snap["segments"]}

    # settled_value should be 100, not 9999
    assert segs["seg_a"]["settled_value"] == 100, (
        f"provisional months leaked into settled stats: settled_value={segs['seg_a']['settled_value']}"
    )
    print("  [PASS] provisional exclusion per segment")


def test_monotonic_and_no_negatives() -> None:
    """Self-check catches non-monotonic months and negative counts."""
    from optimisation_engine.ingestion.research.engine import _self_check

    # Good snapshot
    good_snap = {
        "meta": {"provisional_months": ["2026-05"]},
        "incorporations": {
            "monthly": [
                {"month": "2026-01", "A001": 10, "union": 15},
                {"month": "2026-02", "A001": 12, "union": 17},
            ]
        },
        "headline": {},
    }
    assert _self_check(good_snap, 1) == [], "good snapshot should pass self-check"

    # Non-monotonic
    bad_order = {
        "meta": {"provisional_months": ["2026-02"]},
        "incorporations": {
            "monthly": [
                {"month": "2026-02", "A001": 12},
                {"month": "2026-01", "A001": 10},
            ]
        },
        "headline": {},
    }
    failures = _self_check(bad_order, 1)
    assert any("monoton" in f for f in failures), f"expected monotonic failure, got: {failures}"

    # Negative count
    bad_neg = {
        "meta": {"provisional_months": ["2026-02"]},
        "incorporations": {
            "monthly": [
                {"month": "2026-01", "A001": -5},
                {"month": "2026-02", "A001": 10},
            ]
        },
        "headline": {},
    }
    failures = _self_check(bad_neg, 1)
    assert any("negative" in f for f in failures), f"expected negative failure, got: {failures}"
    print("  [PASS] self-check structural invariants")


if __name__ == "__main__":
    print("Running research engine self-checks ...")
    try:
        test_multi_segment_aggregation()
        test_thin_gate_per_segment()
        test_thin_gate_niche_level_not_thin()
        test_provisional_exclusion_per_segment()
        test_monotonic_and_no_negatives()
        print("\nAll checks PASSED.")
    except AssertionError as e:
        print(f"\nFAILED: {e}", file=sys.stderr)
        sys.exit(1)
