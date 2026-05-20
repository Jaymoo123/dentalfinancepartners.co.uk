"""
Time-aware detectors (v2).

Differences from detectors.py:
  - Consume time_stratified_view records (last_7d / prior_21d / older + trajectory)
  - Skip pages with optimisation_changes shipped within RESHIP_GATE_DAYS (14d)
  - Score by trajectory: emerging/improving boost confidence; declining shifts
    change_type from 'expand_page' to 'content_refresh'
  - Recognise dormant pages as rescue candidates
  - New detector: detect_content_refresh for pages that were strong, now slipping

Compared to v1's flat 28-day sum, v2 surfaces SUSTAINED signal (not one-week
spikes) and AVOIDS re-flagging pages we just shipped changes to.
"""
from __future__ import annotations

import hashlib
import os
import re
import sys
from collections import defaultdict
from typing import Any

import httpx

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from optimisation_engine.analysis.detectors import (  # noqa: E402
    Opportunity,
    _fetch_dataforseo_keywords,
    _fetch_existing_gsc_queries,
    _supabase_headers,
    persist_opportunities,
)
from optimisation_engine.analysis.time_stratified_view import (  # noqa: E402
    RESHIP_GATE_DAYS,
    StratifiedPQ,
    aggregate_by_page,
    fetch_stratified,
)
from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL  # noqa: E402

TRAJECTORY_BOOST = {
    "emerging": +15,
    "improving": +10,
    "stable": 0,
    "declining": -5,
    "dormant": -10,
    "trivial": -30,
}


def _trajectory_label(rec: StratifiedPQ) -> str:
    return rec.trajectory


def _conf_with_trajectory(base_confidence: str, trajectory: str) -> str:
    """Lift or lower confidence based on trajectory."""
    levels = ["low", "medium", "high"]
    idx = levels.index(base_confidence) if base_confidence in levels else 1
    if trajectory in {"emerging", "improving"}:
        idx = min(2, idx + 1)
    elif trajectory in {"declining", "dormant"}:
        idx = max(0, idx - 1)
    return levels[idx]


# ---------------------------------------------------------------------------
# Detectors (page-scoped)
# ---------------------------------------------------------------------------


def detect_ctr_problems_v2(
    site_key: str,
    by_page: dict[str, dict],
    *,
    min_impressions_28d: int = 30,
    max_ctr: float = 0.02,
    min_position: float = 1.0,
    max_position: float = 15.0,
) -> list[Opportunity]:
    """Pages ranking well, low CTR. Now: time-aware + skip recently optimised."""
    out: list[Opportunity] = []
    for page, p in by_page.items():
        if p["is_recently_optimised"]:
            continue
        total_impr = p["last_7d_impr"] + p["prior_21d_impr"]
        if total_impr < min_impressions_28d:
            continue
        total_clicks = p["last_7d_clicks"]  # last 7d clicks; prior clicks not summed
        # Compute page-level CTR from full 28d
        page_clicks_28d = sum(r.last_7d.clicks + r.prior_21d.clicks for r in p["queries"])
        page_ctr = page_clicks_28d / total_impr if total_impr else 0
        if page_ctr > max_ctr:
            continue
        best_pos = min(p["best_position_last_7d"], p["best_position_prior_21d"])
        if not (min_position <= best_pos <= max_position):
            continue

        # Top queries by 28d impressions
        ranked_queries = sorted(p["queries"], key=lambda r: r.last_7d.impressions + r.prior_21d.impressions, reverse=True)
        primary_rec = ranked_queries[0]
        cluster = [r.query for r in ranked_queries[:8]]

        trajectory = primary_rec.trajectory
        base_conf = "high" if best_pos < 10 and total_impr >= 50 else "medium" if best_pos < 15 and total_impr >= 30 else "low"
        conf = _conf_with_trajectory(base_conf, trajectory)
        score = min(100, 50 + int(total_impr / 5) + TRAJECTORY_BOOST.get(trajectory, 0))

        out.append(
            Opportunity(
                site_key=site_key,
                opportunity_type="rewrite_title_meta",
                target_url=page,
                primary_query=primary_rec.query,
                target_query_cluster=cluster,
                recommended_action=(
                    f"Rewrite metaTitle + metaDescription on '{page}' to front-load "
                    f"the primary query '{primary_rec.query}' and adjacent variants. "
                    f"28d: {total_impr} impressions at best position {best_pos:.1f}, "
                    f"CTR {page_ctr:.2%}. Trajectory: {trajectory} ({primary_rec.delta_pct:+.1%})."
                ),
                rationale=(
                    f"{total_impr} impressions across {len(ranked_queries)} queries; "
                    f"best position {best_pos:.1f}; CTR {page_ctr:.2%}; trajectory={trajectory}."
                ),
                score=score,
                confidence=conf,
                supporting_data={
                    "page_impressions_28d": total_impr,
                    "page_clicks_28d": page_clicks_28d,
                    "page_ctr_28d": round(page_ctr, 6),
                    "best_position_28d": round(best_pos, 2),
                    "last_7d_impr": p["last_7d_impr"],
                    "prior_21d_impr": p["prior_21d_impr"],
                    "trajectory": trajectory,
                    "delta_pct": round(primary_rec.delta_pct, 4) if primary_rec.delta_pct not in (float("inf"), float("-inf")) else None,
                    "top_queries": [
                        {
                            "query": r.query,
                            "last_7d_impr": r.last_7d.impressions,
                            "prior_21d_impr": r.prior_21d.impressions,
                            "trajectory": r.trajectory,
                            "position": round(min(r.last_7d.avg_position or 999, r.prior_21d.avg_position or 999), 2),
                        }
                        for r in ranked_queries[:5]
                    ],
                },
            )
        )
    return out


def detect_near_miss_expansion_v2(
    site_key: str,
    by_page: dict[str, dict],
    *,
    min_impressions_28d: int = 30,
    min_position: float = 8.0,
    max_position: float = 20.0,
) -> list[Opportunity]:
    """Pages on edge of page 1 / on page 2. Boost confidence on emerging/improving trajectories."""
    out: list[Opportunity] = []
    for page, p in by_page.items():
        if p["is_recently_optimised"]:
            continue
        total_impr = p["last_7d_impr"] + p["prior_21d_impr"]
        if total_impr < min_impressions_28d:
            continue
        best_pos = min(p["best_position_last_7d"], p["best_position_prior_21d"])
        if not (min_position <= best_pos <= max_position):
            continue

        ranked_queries = sorted(p["queries"], key=lambda r: r.last_7d.impressions + r.prior_21d.impressions, reverse=True)
        primary_rec = ranked_queries[0]
        cluster = [r.query for r in ranked_queries[:8]]
        trajectory = primary_rec.trajectory

        base_conf = "high" if total_impr >= 100 and 10 <= best_pos <= 15 else "medium"
        conf = _conf_with_trajectory(base_conf, trajectory)
        score = min(100, 40 + int(total_impr / 10) + TRAJECTORY_BOOST.get(trajectory, 0))

        out.append(
            Opportunity(
                site_key=site_key,
                opportunity_type="expand_page",
                target_url=page,
                primary_query=primary_rec.query,
                target_query_cluster=cluster,
                recommended_action=(
                    f"Expand content depth on '{page}': add sections that cover the "
                    f"adjacent queries it's already getting impressions for. "
                    f"Trajectory: {trajectory}."
                ),
                rationale=(
                    f"Position {best_pos:.1f} for {total_impr} 28d impressions across "
                    f"{len(ranked_queries)} queries; trajectory={trajectory}."
                ),
                score=score,
                confidence=conf,
                supporting_data={
                    "page_impressions_28d": total_impr,
                    "best_position_28d": round(best_pos, 2),
                    "n_adjacent_queries": len(ranked_queries),
                    "trajectory": trajectory,
                    "top_queries": [
                        {"query": r.query, "impressions": r.last_7d.impressions + r.prior_21d.impressions, "position": round(min(r.last_7d.avg_position or 999, r.prior_21d.avg_position or 999), 2), "trajectory": r.trajectory}
                        for r in ranked_queries[:5]
                    ],
                },
            )
        )
    return out


def detect_content_refresh(
    site_key: str,
    by_page: dict[str, dict],
    *,
    min_prior_impressions: int = 50,
    min_decline_pct: float = -0.3,
) -> list[Opportunity]:
    """NEW: pages that were strong, now declining. A different shape than first-time expansion."""
    out: list[Opportunity] = []
    for page, p in by_page.items():
        if p["is_recently_optimised"]:
            continue
        if p["prior_21d_impr"] < min_prior_impressions:
            continue
        # Compute delta at page level: last_7d_per_day vs prior_21d_per_day
        last_per_day = p["last_7d_impr"] / 7.0
        prior_per_day = p["prior_21d_impr"] / 21.0
        if prior_per_day == 0:
            continue
        delta = (last_per_day - prior_per_day) / prior_per_day
        if delta > min_decline_pct:
            continue  # not declining enough

        ranked_queries = sorted(p["queries"], key=lambda r: r.prior_21d.impressions, reverse=True)
        primary_rec = ranked_queries[0]
        cluster = [r.query for r in ranked_queries[:8]]

        score = min(100, 50 + int(p["prior_21d_impr"] / 5))
        conf = "medium" if p["prior_21d_impr"] >= 100 else "low"

        out.append(
            Opportunity(
                site_key=site_key,
                opportunity_type="expand_page",  # use expand_page; the rationale flags it as refresh
                target_url=page,
                primary_query=primary_rec.query,
                target_query_cluster=cluster,
                recommended_action=(
                    f"Content refresh on '{page}': page is declining ({delta:+.1%}) after "
                    f"earlier strength ({p['prior_21d_impr']} impressions in prior 21d, "
                    f"only {p['last_7d_impr']} in last 7d). Check freshness signals "
                    f"(date, current-year references, statistics) and SERP competition shift."
                ),
                rationale=(
                    f"Decline of {delta:+.1%} vs prior 21 days. Could indicate stale content, "
                    f"competitor improvement, or algorithm-related demotion."
                ),
                score=score,
                confidence=conf,
                supporting_data={
                    "last_7d_impr": p["last_7d_impr"],
                    "prior_21d_impr": p["prior_21d_impr"],
                    "delta_pct": round(delta, 4),
                    "signal_type": "decline",
                    "top_queries": [
                        {"query": r.query, "prior_21d": r.prior_21d.impressions, "last_7d": r.last_7d.impressions, "delta": round(r.delta_pct, 4) if r.delta_pct not in (float("inf"), float("-inf")) else None}
                        for r in ranked_queries[:5]
                    ],
                },
            )
        )
    return out


def detect_cannibalisation_v2(
    site_key: str,
    stratified: dict[tuple[str, str], StratifiedPQ],
    *,
    min_total_impressions_28d: int = 20,
) -> list[Opportunity]:
    """Multiple pages competing for the same query. Time-aware: skip if winner was recently optimised."""
    by_query: dict[str, list[StratifiedPQ]] = defaultdict(list)
    for (page, q), rec in stratified.items():
        total = rec.last_7d.impressions + rec.prior_21d.impressions
        if total >= 3:
            by_query[q].append(rec)

    out: list[Opportunity] = []
    for query, recs in by_query.items():
        if len(recs) < 2:
            continue
        total_impr = sum(r.last_7d.impressions + r.prior_21d.impressions for r in recs)
        if total_impr < min_total_impressions_28d:
            continue
        # Winner = best position across both windows
        recs.sort(key=lambda r: min(r.last_7d.avg_position or 999, r.prior_21d.avg_position or 999))
        winner = recs[0]
        # Skip if winner was recently optimised (we already touched it)
        if winner.is_recently_optimised:
            continue
        best_pos = min(winner.last_7d.avg_position or 999, winner.prior_21d.avg_position or 999)
        score = min(100, 45 + int(total_impr / 5))

        out.append(
            Opportunity(
                site_key=site_key,
                opportunity_type="intent_realignment",
                target_url=winner.page_url,
                primary_query=query,
                target_query_cluster=[query],
                recommended_action=(
                    f"Resolve cannibalisation on '{query}': consolidate or differentiate "
                    f"the {len(recs)} competing pages. Strongest: '{winner.page_url}' at "
                    f"position {best_pos:.1f}. Decide intent split: same intent => merge & "
                    f"redirect; different sub-intents => differentiate H1 + meta."
                ),
                rationale=(
                    f"{len(recs)} pages on the same site receive impressions for '{query}'. "
                    f"Total {total_impr} impressions split across them dilutes ranking signal."
                ),
                score=score,
                confidence="medium",
                supporting_data={
                    "total_impressions_28d": total_impr,
                    "competing_pages": [
                        {
                            "page": r.page_url,
                            "impressions_28d": r.last_7d.impressions + r.prior_21d.impressions,
                            "position": round(min(r.last_7d.avg_position or 999, r.prior_21d.avg_position or 999), 2),
                            "trajectory": r.trajectory,
                            "is_recently_optimised": r.is_recently_optimised,
                        }
                        for r in recs
                    ],
                },
            )
        )
    return out


def detect_dataforseo_keyword_gap_v2(
    site_key: str,
    stratified: dict[tuple[str, str], StratifiedPQ],
    *,
    min_volume: int = 50,
    max_kd: int = 30,
    use_cross_site: bool = True,
) -> list[Opportunity]:
    """DataForSEO keywords we don't yet rank for. Now uses cross-site relevance."""
    url = f"{SUPABASE_URL}/rest/v1/dataforseo_keyword_data"
    h = _supabase_headers()
    # Filter rows: must be relevant to this site (cross-site aware) OR paid by this site
    params = {
        "select": "related_keyword,search_volume,keyword_difficulty,cpc,search_intent,seed_keyword,site_key,primary_site",
        "related_keyword": "not.is.null",
        "search_volume": f"gte.{min_volume}",
        "order": "search_volume.desc",
        "limit": "1000",
    }
    if use_cross_site:
        params["relevant_sites"] = f"cs.{{{site_key}}}"
    else:
        params["site_key"] = f"eq.{site_key}"
    r = httpx.get(url, headers=h, params=params, timeout=30.0)
    r.raise_for_status()
    kw_rows = r.json()

    # Set of queries we already appear for (from stratified GSC view)
    existing = {rec.query.lower() for rec in stratified.values() if rec.last_7d.impressions + rec.prior_21d.impressions >= 1}

    out: list[Opportunity] = []
    seen: set[str] = set()
    for row in kw_rows:
        kw = (row.get("related_keyword") or "").strip().lower()
        if not kw or kw in seen or kw in existing:
            continue
        vol = int(row.get("search_volume") or 0)
        kd_val = row.get("keyword_difficulty")
        kd = int(kd_val) if kd_val is not None else 100
        if vol < min_volume or kd > max_kd:
            continue
        seen.add(kw)

        intent = row.get("search_intent") or "unknown"
        primary_site = row.get("primary_site")
        # Drop navigational/branded noise heuristically — these don't drive lead gen
        if intent == "navigational":
            continue
        # Skip if our site isn't the primary OR a strong secondary
        if primary_site and primary_site != site_key:
            # Still allow it but lower confidence
            base_conf = "low"
        else:
            base_conf = "medium" if vol >= 100 or kd <= 5 else "low"
        if vol >= 200 and kd <= 10 and primary_site == site_key:
            base_conf = "high"

        score = min(100, 30 + int(vol / 10) + (20 if kd <= 10 else 0))

        out.append(
            Opportunity(
                site_key=site_key,
                opportunity_type="new_page",
                target_url=None,
                primary_query=kw,
                target_query_cluster=[kw],
                recommended_action=(
                    f"Consider a dedicated page for '{kw}' (vol {vol}/mo, KD {kd}, "
                    f"intent={intent}). Currently no GSC impressions on this site. "
                    f"Primary-site for this kw: {primary_site or 'unscored'}."
                ),
                rationale=(
                    f"DataForSEO keyword '{kw}' (vol {vol}, KD {kd}). Not in last "
                    f"28 days of GSC data. Cross-site primary={primary_site}, paid_by={row.get('site_key')}."
                ),
                score=score,
                confidence=base_conf,
                supporting_data={
                    "source": "dataforseo_cross_site",
                    "search_volume": vol,
                    "keyword_difficulty": kd,
                    "cpc": row.get("cpc"),
                    "search_intent": intent,
                    "primary_site": primary_site,
                    "paid_by_site": row.get("site_key"),
                    "seed_keyword": row.get("seed_keyword"),
                },
            )
        )
    return out


# ---------------------------------------------------------------------------
# Runner
# ---------------------------------------------------------------------------


def run_all_v2(site_key: str) -> dict[str, Any]:
    print(f"\n=== v2 Detectors for {site_key} ===")
    stratified = fetch_stratified(site_key)
    if not stratified:
        print(f"  no GSC query data for {site_key}; running DataForSEO-only detectors")
        opportunities = detect_dataforseo_keyword_gap_v2(site_key, {})
    else:
        by_page = aggregate_by_page(stratified)
        print(f"  {len(stratified)} (page,query) pairs across {len(by_page)} pages")
        n_recent = sum(1 for p in by_page.values() if p["is_recently_optimised"])
        print(f"  pages with shipped change in last {RESHIP_GATE_DAYS} days (filtered out): {n_recent}")

        opportunities: list[Opportunity] = []
        opportunities += detect_ctr_problems_v2(site_key, by_page)
        opportunities += detect_near_miss_expansion_v2(site_key, by_page)
        opportunities += detect_content_refresh(site_key, by_page)
        opportunities += detect_cannibalisation_v2(site_key, stratified)
        opportunities += detect_dataforseo_keyword_gap_v2(site_key, stratified)

    opportunities.sort(key=lambda o: o.score, reverse=True)

    by_type: dict[str, int] = defaultdict(int)
    by_conf: dict[str, int] = defaultdict(int)
    by_traj: dict[str, int] = defaultdict(int)
    for o in opportunities:
        by_type[o.opportunity_type] += 1
        by_conf[o.confidence] += 1
        traj = (o.supporting_data or {}).get("trajectory") or "n/a"
        by_traj[traj] += 1

    print(f"  detected {len(opportunities)} opportunities:")
    for t, c in sorted(by_type.items()):
        print(f"    {t}: {c}")
    print(f"  confidence: high={by_conf.get('high',0)} medium={by_conf.get('medium',0)} low={by_conf.get('low',0)}")
    print(f"  trajectory mix (where applicable): {dict(by_traj)}")

    print("  top 5 by score:")
    for o in opportunities[:5]:
        url_short = (o.target_url or "(new)").rsplit("/", 1)[-1][:50]
        traj = (o.supporting_data or {}).get("trajectory") or "-"
        print(f"    score={o.score} {o.confidence:6s} {o.opportunity_type:22s} traj={traj:10s} q={o.primary_query!r:50s} pg=.../{url_short}")

    result = persist_opportunities(opportunities)
    print(f"  persisted: inserted={result['inserted']} skipped={result['skipped']} errored={result['errored']} intent_dupes_skipped={result.get('skipped_intent_dupe', 0)}")
    return {"site_key": site_key, "opportunities": len(opportunities), **result}


def main() -> None:
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("sites", nargs="*", default=["agency", "property", "dentists", "generalist"])
    args = parser.parse_args()

    summaries = [run_all_v2(s) for s in args.sites]
    print("\n=== Summary ===")
    for s in summaries:
        print(s)


if __name__ == "__main__":
    main()
