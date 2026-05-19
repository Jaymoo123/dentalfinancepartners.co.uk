"""
Time-stratified GSC view.

For each (page, query) on a site, computes per-window metrics + trajectory
+ last-shipped-change context. This is what the detectors should consume
instead of a flat 28-day sum.

Windows:
  last_7d:    days 1-7   (this week — the freshest signal)
  prior_21d:  days 8-28  (the baseline for trajectory calc)
  older:      days 29-90 (longer-term context when available)

Trajectory labels (assigned per page-query):
  emerging   - no impressions in prior period, >=5 in last_7d  (NEW signal)
  improving  - last_7d per-day rate > 1.5x prior_21d per-day rate
  stable     - within ±30% of prior rate
  declining  - last_7d per-day rate < 0.7x prior_21d per-day rate
  dormant    - <2 impressions in last_7d AND was >=5/wk historically (was active, now silent)
  trivial    - <2 impressions in both windows (noise floor)

Re-ship filter: pages with optimisation_changes shipped within
RESHIP_GATE_DAYS (default 14) are flagged via last_shipped_change so
detectors can skip them.
"""
from __future__ import annotations

import os
import sys
from collections import defaultdict
from dataclasses import dataclass, field
from datetime import date, datetime, timedelta
from typing import Any

import httpx

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL  # noqa: E402

RESHIP_GATE_DAYS = 14  # user-confirmed 2026-05-19


def _supabase_headers() -> dict[str, str]:
    return {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}


@dataclass
class WindowMetrics:
    impressions: int = 0
    clicks: int = 0
    days_with_data: int = 0
    avg_position: float = 0.0
    _pos_sum: float = 0.0

    @property
    def per_day_impressions(self) -> float:
        return self.impressions / max(1, self.days_with_data)

    @property
    def ctr(self) -> float:
        return self.clicks / self.impressions if self.impressions else 0.0


@dataclass
class StratifiedPQ:
    """Per (page, query) stratified record."""
    page_url: str
    query: str
    last_7d: WindowMetrics = field(default_factory=WindowMetrics)
    prior_21d: WindowMetrics = field(default_factory=WindowMetrics)
    older: WindowMetrics = field(default_factory=WindowMetrics)
    trajectory: str = "trivial"
    delta_pct: float = 0.0
    last_shipped_change: dict | None = None  # row from optimisation_changes if within gate
    days_since_last_change: int | None = None

    @property
    def total_impressions_28d(self) -> int:
        return self.last_7d.impressions + self.prior_21d.impressions

    @property
    def is_recently_optimised(self) -> bool:
        return (
            self.last_shipped_change is not None
            and self.days_since_last_change is not None
            and self.days_since_last_change <= RESHIP_GATE_DAYS
        )


def _classify_trajectory(last_7d: WindowMetrics, prior_21d: WindowMetrics, older: WindowMetrics) -> tuple[str, float]:
    """Return (label, delta_pct)."""
    recent_rate = last_7d.per_day_impressions
    prior_rate = prior_21d.per_day_impressions

    if last_7d.impressions < 2 and prior_21d.impressions < 2 and older.impressions < 2:
        return "trivial", 0.0

    if prior_21d.impressions == 0 and last_7d.impressions >= 5:
        return "emerging", float("inf")

    if last_7d.impressions < 2 and prior_21d.impressions >= 5:
        return "dormant", -1.0

    if prior_rate == 0:
        # Avoid div by zero; if we got here and prior is 0 but last_7d not enough for emerging
        return "emerging" if last_7d.impressions >= 2 else "trivial", float("inf")

    delta = (recent_rate - prior_rate) / prior_rate

    if delta >= 0.5:
        return "improving", delta
    if delta <= -0.3:
        return "declining", delta
    return "stable", delta


def _fetch_gsc_rows(site_key: str, days: int) -> list[dict]:
    """Pull all GSC rows for the site in the window."""
    start = (date.today() - timedelta(days=days)).isoformat()
    url = f"{SUPABASE_URL}/rest/v1/gsc_query_data"
    out: list[dict] = []
    offset = 0
    page_size = 1000
    while True:
        r = httpx.get(
            url,
            headers=_supabase_headers(),
            params={
                "select": "page_url,query,date,impressions,clicks,position",
                "site_key": f"eq.{site_key}",
                "date": f"gte.{start}",
                "limit": str(page_size),
                "offset": str(offset),
            },
            timeout=30.0,
        )
        r.raise_for_status()
        batch = r.json()
        out.extend(batch)
        if len(batch) < page_size:
            break
        offset += page_size
    return out


def _fetch_recent_changes(site_key: str, days: int) -> dict[str, dict]:
    """Pull optimisation_changes for site within the last `days`. Returns dict keyed by target_url."""
    since = (date.today() - timedelta(days=days)).isoformat()
    url = f"{SUPABASE_URL}/rest/v1/optimisation_changes"
    r = httpx.get(
        url,
        headers=_supabase_headers(),
        params={
            "select": "id,target_url,change_type,shipped_at,confidence,outcome_verdict",
            "site_key": f"eq.{site_key}",
            "shipped_at": f"gte.{since}",
            "rolled_back": "eq.false",
            "order": "shipped_at.desc",
        },
        timeout=30.0,
    )
    r.raise_for_status()
    out: dict[str, dict] = {}
    for row in r.json():
        url_key = row["target_url"]
        if url_key not in out:  # keep most recent per page
            out[url_key] = row
    return out


def fetch_stratified(site_key: str, *, older_days: int = 90) -> dict[tuple[str, str], StratifiedPQ]:
    """Build stratified records for every (page, query) on site.

    older_days controls how far back we look. Sites went live in Feb-Mar 2026,
    so 90 days covers approximately the full history.
    """
    today = date.today()
    today_dt = datetime.combine(today, datetime.min.time())

    rows = _fetch_gsc_rows(site_key, days=older_days)

    by_pq: dict[tuple[str, str], StratifiedPQ] = {}

    for r in rows:
        page = r["page_url"]
        q = r["query"]
        d = date.fromisoformat(r["date"])
        impr = int(r.get("impressions") or 0)
        clk = int(r.get("clicks") or 0)
        pos = float(r.get("position") or 0)

        days_ago = (today - d).days

        rec = by_pq.get((page, q))
        if rec is None:
            rec = StratifiedPQ(page_url=page, query=q)
            by_pq[(page, q)] = rec

        if days_ago <= 7:
            w = rec.last_7d
        elif days_ago <= 28:
            w = rec.prior_21d
        elif days_ago <= older_days:
            w = rec.older
        else:
            continue

        w.impressions += impr
        w.clicks += clk
        if impr > 0:
            w.days_with_data += 1
            w._pos_sum += pos

    # Finalise avg_position per window
    for rec in by_pq.values():
        for w in (rec.last_7d, rec.prior_21d, rec.older):
            if w.days_with_data > 0:
                w.avg_position = w._pos_sum / w.days_with_data

    # Classify trajectory
    for rec in by_pq.values():
        rec.trajectory, rec.delta_pct = _classify_trajectory(rec.last_7d, rec.prior_21d, rec.older)

    # Attach recent changes
    recent_changes = _fetch_recent_changes(site_key, days=RESHIP_GATE_DAYS * 2)  # fetch wider, filter in record
    today_end = datetime.combine(today + timedelta(days=1), datetime.min.time())  # end of today
    for (page, q), rec in by_pq.items():
        change = recent_changes.get(page)
        if change:
            shipped_at_str = change.get("shipped_at")
            try:
                shipped_dt = datetime.fromisoformat(shipped_at_str.replace("Z", "+00:00"))
            except Exception:
                continue
            # Clamp at 0 to handle UTC vs local skew on same-day commits
            days_since = max(0, (today_end - shipped_dt.replace(tzinfo=None)).days)
            rec.last_shipped_change = change
            rec.days_since_last_change = days_since

    return by_pq


def aggregate_by_page(stratified: dict[tuple[str, str], StratifiedPQ]) -> dict[str, dict]:
    """Roll up to page level for page-scoped detectors."""
    out: dict[str, dict] = {}
    for (page, q), rec in stratified.items():
        if page not in out:
            out[page] = {
                "queries": [],
                "last_7d_impr": 0,
                "prior_21d_impr": 0,
                "last_7d_clicks": 0,
                "best_position_last_7d": 999.0,
                "best_position_prior_21d": 999.0,
                "last_shipped_change": rec.last_shipped_change,
                "days_since_last_change": rec.days_since_last_change,
                "is_recently_optimised": rec.is_recently_optimised,
            }
        p = out[page]
        p["queries"].append(rec)
        p["last_7d_impr"] += rec.last_7d.impressions
        p["prior_21d_impr"] += rec.prior_21d.impressions
        p["last_7d_clicks"] += rec.last_7d.clicks
        if rec.last_7d.avg_position and rec.last_7d.avg_position < p["best_position_last_7d"]:
            p["best_position_last_7d"] = rec.last_7d.avg_position
        if rec.prior_21d.avg_position and rec.prior_21d.avg_position < p["best_position_prior_21d"]:
            p["best_position_prior_21d"] = rec.prior_21d.avg_position
    return out


def main() -> None:
    """Diagnostic: dump the trajectory distribution for a site."""
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("site_key")
    args = parser.parse_args()

    strat = fetch_stratified(args.site_key)
    if not strat:
        print(f"No GSC data for {args.site_key}")
        return

    print(f"\n{args.site_key}: {len(strat)} (page, query) pairs")

    by_traj: dict[str, int] = defaultdict(int)
    for rec in strat.values():
        by_traj[rec.trajectory] += 1
    print("\nTrajectory distribution:")
    for label in ["emerging", "improving", "stable", "declining", "dormant", "trivial"]:
        print(f"  {label:11s} {by_traj.get(label, 0)}")

    # Recently optimised pages
    recently_opt = {rec.page_url for rec in strat.values() if rec.is_recently_optimised}
    print(f"\nPages with shipped change in last {RESHIP_GATE_DAYS} days: {len(recently_opt)}")
    for p in sorted(recently_opt):
        sample = next(r for r in strat.values() if r.page_url == p)
        print(f"  {p}  shipped_at={sample.last_shipped_change['shipped_at']} type={sample.last_shipped_change['change_type']} days_since={sample.days_since_last_change}")

    # Top emerging
    emerging = [r for r in strat.values() if r.trajectory == "emerging" and r.last_7d.impressions >= 5]
    emerging.sort(key=lambda r: r.last_7d.impressions, reverse=True)
    print(f"\nTop 5 emerging queries (new in last 7 days):")
    for r in emerging[:5]:
        print(f"  query={r.query!r:50s} page=.../{r.page_url.rsplit('/',1)[-1][:30]:32s} 7d_impr={r.last_7d.impressions} pos={r.last_7d.avg_position:.1f}")

    # Top declining
    declining = [r for r in strat.values() if r.trajectory == "declining" and r.prior_21d.impressions >= 10]
    declining.sort(key=lambda r: r.prior_21d.impressions, reverse=True)
    print(f"\nTop 5 declining queries (was getting impressions, slowing):")
    for r in declining[:5]:
        print(f"  query={r.query!r:50s} page=.../{r.page_url.rsplit('/',1)[-1][:30]:32s} prior_21d={r.prior_21d.impressions} last_7d={r.last_7d.impressions} delta={r.delta_pct:+.1%}")


if __name__ == "__main__":
    main()
