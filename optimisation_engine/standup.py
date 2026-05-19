"""
Standup dashboard — single command for "where do I start today".

Pulls from Supabase only (no LLM cost). Outputs:

  Section 1: SINCE LAST REFRESH
    Per-site GSC delta (last 7d vs prior 7d): impressions, clicks, avg pos
    Top 5 movers (positive) and top 5 movers (negative)

  Section 2: SHIPPED CHANGES MATURING
    Each shipped change crossing 7/14/28-day windows, with trajectory

  Section 3: QUEUE SUMMARY
    Per site x action_kind x confidence breakdown of proposed opps

  Section 4: TACKLE FIRST (top 10 by score+confidence)

  Section 5: RED FLAGS
    Declining-trajectory pages with no in-flight change
    Shipped changes already trending negative
    Pages with action_plan_confidence > 80 in the queue, untouched

Usage:
  python -m optimisation_engine.standup
  python -m optimisation_engine.standup --site property
"""
from __future__ import annotations

import argparse
import os
import sys
from collections import defaultdict
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

import httpx

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL, get_sites  # noqa: E402


def _headers() -> dict[str, str]:
    return {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}


# -----------------------------------------------------------------------------
# Section 1: GSC delta (last 7d vs prior 7d)
# -----------------------------------------------------------------------------

def fetch_gsc_delta(site_key: str) -> dict:
    today = date.today()
    last7_start = today - timedelta(days=7)
    prior_start = today - timedelta(days=14)

    def _agg(date_gte: str, date_lt: str) -> dict:
        url = f"{SUPABASE_URL}/rest/v1/gsc_query_data"
        out = {"impressions": 0, "clicks": 0, "positions": [], "rows": 0}
        offset = 0
        while True:
            r = httpx.get(
                url,
                headers=_headers(),
                params={
                    "select": "impressions,clicks,position",
                    "site_key": f"eq.{site_key}",
                    "date": f"gte.{date_gte}",
                    "date": f"lt.{date_lt}",  # 2nd date param wins; PostgREST handles this differently
                    "limit": "1000",
                    "offset": str(offset),
                },
                timeout=30.0,
            )
            if r.status_code >= 300:
                break
            batch = r.json()
            for row in batch:
                out["impressions"] += int(row.get("impressions") or 0)
                out["clicks"] += int(row.get("clicks") or 0)
                if row.get("position") not in (None, 0):
                    out["positions"].append(float(row["position"]))
                out["rows"] += 1
            if len(batch) < 1000:
                break
            offset += 1000
        if out["positions"]:
            out["avg_position"] = sum(out["positions"]) / len(out["positions"])
        else:
            out["avg_position"] = 0
        return out

    # PostgREST workaround: gte AND lt requires two params with same name; httpx
    # only sends the last. Use 'and' query operator instead.
    def _agg_range(start: date, end: date) -> dict:
        url = f"{SUPABASE_URL}/rest/v1/gsc_query_data"
        out = {"impressions": 0, "clicks": 0, "positions": [], "rows": 0}
        offset = 0
        while True:
            params = {
                "select": "impressions,clicks,position",
                "site_key": f"eq.{site_key}",
                "and": f"(date.gte.{start.isoformat()},date.lt.{end.isoformat()})",
                "limit": "1000",
                "offset": str(offset),
            }
            r = httpx.get(url, headers=_headers(), params=params, timeout=30.0)
            if r.status_code >= 300:
                break
            batch = r.json()
            for row in batch:
                out["impressions"] += int(row.get("impressions") or 0)
                out["clicks"] += int(row.get("clicks") or 0)
                if row.get("position") not in (None, 0):
                    out["positions"].append(float(row["position"]))
                out["rows"] += 1
            if len(batch) < 1000:
                break
            offset += 1000
        out["avg_position"] = (sum(out["positions"]) / len(out["positions"])) if out["positions"] else 0
        return out

    last7 = _agg_range(last7_start, today + timedelta(days=1))
    prior7 = _agg_range(prior_start, last7_start)
    return {
        "last_7d": last7,
        "prior_7d": prior7,
        "impressions_delta": last7["impressions"] - prior7["impressions"],
        "clicks_delta": last7["clicks"] - prior7["clicks"],
        "position_delta": (last7["avg_position"] - prior7["avg_position"]) if last7["avg_position"] and prior7["avg_position"] else 0,
    }


# -----------------------------------------------------------------------------
# Section 2: Shipped changes maturing
# -----------------------------------------------------------------------------

def fetch_maturing_changes(*, site_key: str | None = None, max_age_days: int = 35) -> list[dict]:
    since = (datetime.now(timezone.utc) - timedelta(days=max_age_days)).isoformat()
    url = f"{SUPABASE_URL}/rest/v1/optimisation_changes"
    params = {
        "select": "id,site_key,change_type,target_slug,target_url,shipped_at,confidence,outcome_verdict,rolled_back,gsc_baseline,git_commit_hash,auto_applied",
        "shipped_at": f"gte.{since}",
        "auto_applied": "eq.true",  # exclude queued suggestions that never actually shipped to files
        "order": "shipped_at.desc",
        "limit": "100",
    }
    if site_key:
        params["site_key"] = f"eq.{site_key}"
    r = httpx.get(url, headers=_headers(), params=params, timeout=30.0)
    if r.status_code >= 300:
        return []
    rows = r.json()
    # Compute days-since-shipped
    now = datetime.now(timezone.utc)
    for r2 in rows:
        try:
            shipped = datetime.fromisoformat((r2["shipped_at"] or "").replace("Z", "+00:00"))
            r2["days_since_shipped"] = max(0, (now - shipped).days)
        except Exception:
            r2["days_since_shipped"] = None
    return rows


def fetch_post_ship_performance(site_key: str, target_url: str, shipped_at_iso: str) -> dict:
    """Sum impressions/clicks since shipped_at."""
    try:
        ship_date = datetime.fromisoformat(shipped_at_iso.replace("Z", "+00:00")).date()
    except Exception:
        return {}
    url = f"{SUPABASE_URL}/rest/v1/gsc_query_data"
    out = {"impressions": 0, "clicks": 0, "positions": []}
    offset = 0
    while True:
        params = {
            "select": "impressions,clicks,position",
            "site_key": f"eq.{site_key}",
            "page_url": f"eq.{target_url}",
            "date": f"gte.{ship_date.isoformat()}",
            "limit": "1000",
            "offset": str(offset),
        }
        r = httpx.get(url, headers=_headers(), params=params, timeout=30.0)
        if r.status_code >= 300:
            break
        batch = r.json()
        for row in batch:
            out["impressions"] += int(row.get("impressions") or 0)
            out["clicks"] += int(row.get("clicks") or 0)
            if row.get("position"):
                out["positions"].append(float(row["position"]))
        if len(batch) < 1000:
            break
        offset += 1000
    out["avg_position"] = sum(out["positions"]) / len(out["positions"]) if out["positions"] else 0
    return out


# -----------------------------------------------------------------------------
# Section 3+4: Queue
# -----------------------------------------------------------------------------

def fetch_queue(site_key: str | None = None) -> list[dict]:
    url = f"{SUPABASE_URL}/rest/v1/optimisation_opportunities"
    params = {
        "select": "id,site_key,opportunity_type,action_kind,primary_query,target_url,score,confidence,action_plan_confidence,supporting_data,created_at",
        "status": "eq.proposed",
        "order": "score.desc",
        "limit": "500",
    }
    if site_key:
        params["site_key"] = f"eq.{site_key}"
    r = httpx.get(url, headers=_headers(), params=params, timeout=30.0)
    return r.json() if r.status_code < 300 else []


# -----------------------------------------------------------------------------
# Rendering
# -----------------------------------------------------------------------------

def render(*, site_filter: str | None = None) -> None:
    today_str = date.today().isoformat()
    print()
    print("#" * 80)
    print(f"#  STANDUP DASHBOARD  -  {today_str}")
    if site_filter:
        print(f"#  Site filter:  {site_filter}")
    print("#" * 80)

    sites = [s for s in get_sites(active_only=True) if (not site_filter or s["site_key"] == site_filter)]

    # ===== Section 1: GSC delta =====
    print()
    print("=" * 80)
    print("[1] SINCE LAST 7 DAYS — GSC delta vs prior 7 days")
    print("=" * 80)
    print(f"{'site':12s} {'impr (this 7d / prior 7d / delta)':40s} {'clicks (this/prior/delta)':30s} {'avg pos delta':15s}")
    print("-" * 100)
    for s in sites:
        d = fetch_gsc_delta(s["site_key"])
        last = d["last_7d"]
        prior = d["prior_7d"]
        impr_str = f"{last['impressions']} / {prior['impressions']} / {d['impressions_delta']:+d}"
        clicks_str = f"{last['clicks']} / {prior['clicks']} / {d['clicks_delta']:+d}"
        pos_delta = d["position_delta"]
        pos_str = f"{pos_delta:+.2f}" if pos_delta else "(no data)"
        print(f"{s['site_key']:12s} {impr_str:40s} {clicks_str:30s} {pos_str:15s}")

    # ===== Section 2: Shipped changes maturing =====
    print()
    print("=" * 80)
    print("[2] SHIPPED CHANGES MATURING")
    print("=" * 80)
    changes = fetch_maturing_changes(site_key=site_filter, max_age_days=35)
    if not changes:
        print("  (no shipped changes in last 35 days)")
    else:
        # Highlight ones crossing key windows
        key_windows = [7, 14, 28]
        print(f"  showing {len(changes)} change(s); flagged when crossing 7/14/28-day windows")
        print()
        print(f"{'days':5s} {'site':10s} {'type':22s} {'slug':45s} {'verdict':10s} {'commit':12s}")
        print("-" * 110)
        for c in changes[:25]:
            d = c.get("days_since_shipped")
            marker = ""
            if d in key_windows:
                marker = "*"  # crossing exact window
            slug = (c.get("target_slug") or "")[:43]
            sha = (c.get("git_commit_hash") or "")[:10]
            verdict = c.get("outcome_verdict") or "-"
            flag = "[ROLLBACK]" if c.get("rolled_back") else ""
            print(f"{f'{d}d{marker}':5s} {c['site_key']:10s} {c['change_type']:22s} {slug:45s} {verdict:10s} {sha:12s} {flag}")

    # ===== Section 3: Queue summary =====
    print()
    print("=" * 80)
    print("[3] QUEUE — proposed opportunities by site x action_kind")
    print("=" * 80)
    queue = fetch_queue(site_filter)
    if not queue:
        print("  (queue empty)")
    else:
        # site x action_kind matrix
        matrix: dict[tuple[str, str], dict] = defaultdict(lambda: {"count": 0, "high_conf": 0})
        no_plan_by_site: dict[str, int] = defaultdict(int)
        for opp in queue:
            site = opp["site_key"]
            kind = opp.get("action_kind") or "(no_plan)"
            if not opp.get("action_kind"):
                no_plan_by_site[site] += 1
            matrix[(site, kind)]["count"] += 1
            if (opp.get("action_plan_confidence") or 0) >= 80:
                matrix[(site, kind)]["high_conf"] += 1

        kinds = sorted({k[1] for k in matrix})
        site_keys = sorted({k[0] for k in matrix})
        print(f"  {len(queue)} proposed opportunities total")
        print(f"\n{'kind':22s} " + " ".join(f"{s[:10]:>11s}" for s in site_keys) + "  TOTAL")
        print("-" * 90)
        for kind in kinds:
            row_total = 0
            cells = []
            for site in site_keys:
                m = matrix.get((site, kind), {"count": 0, "high_conf": 0})
                cells.append(f"{m['count']}({m['high_conf']})".rjust(11))
                row_total += m["count"]
            print(f"  {kind:20s} " + " ".join(cells) + f"  {row_total:5d}")
        print()
        print("  (number) = count with action_plan_confidence >= 80")

    # ===== Section 4: Tackle first =====
    print()
    print("=" * 80)
    print("[4] TACKLE FIRST — top 10 by score x action_plan_confidence")
    print("=" * 80)
    with_plan = [
        o for o in queue
        if o.get("action_kind") and o["action_kind"] != "skip"
    ]
    with_plan.sort(
        key=lambda o: ((o.get("action_plan_confidence") or 0) + (o.get("score") or 0)),
        reverse=True,
    )
    if not with_plan:
        print("  (no opportunities have an action_plan yet — run the Action Specifier)")
    else:
        for i, o in enumerate(with_plan[:10], 1):
            slug = (o.get("target_url") or "(new)").rstrip("/").rsplit("/", 1)[-1][:35]
            q = (o.get("primary_query") or "")[:45]
            ac = o.get("action_plan_confidence") or 0
            print(f"  {i:2d}. [{o['site_key']:10s}] {o['action_kind']:22s} score={o['score']:3d} ap_conf={ac:3d} q={q!r} pg=.../{slug}")
            print(f"      id={o['id']}")

    # ===== Section 5: Red flags =====
    print()
    print("=" * 80)
    print("[5] RED FLAGS")
    print("=" * 80)
    # 5a: Shipped changes with negative-trending data
    flagged = 0
    for c in changes:
        if c.get("rolled_back"):
            continue
        d = c.get("days_since_shipped") or 0
        if d < 7:
            continue  # too early to judge
        baseline = c.get("gsc_baseline") or {}
        baseline_imp = baseline.get("impressions_28d") or 0
        post = fetch_post_ship_performance(c["site_key"], c.get("target_url") or "", c["shipped_at"])
        post_imp = post.get("impressions", 0)
        # Normalize: expected per-day from baseline
        expected_per_day = baseline_imp / 28 if baseline_imp else 0
        post_per_day = post_imp / max(1, d)
        # Flag if dropped > 30% per-day
        if expected_per_day >= 1 and post_per_day < expected_per_day * 0.7:
            slug = (c.get("target_slug") or "")[:40]
            print(f"  [-] {c['site_key']:10s} {c['change_type']:22s} {slug:42s} {d}d post-ship: impr/d {post_per_day:.1f} vs baseline {expected_per_day:.1f}  change_id={c['id']}")
            flagged += 1
    if not flagged:
        print("  (no negative-trending shipped changes)")

    # 5b: Pages with high action_plan_confidence still sitting in queue
    high_conf_pending = sorted(
        [o for o in queue if (o.get("action_plan_confidence") or 0) >= 85 and o.get("action_kind") not in {None, "skip"}],
        key=lambda o: -(o.get("action_plan_confidence") or 0),
    )
    if high_conf_pending:
        print()
        print(f"  {len(high_conf_pending)} high-confidence opportunities (ap_conf>=85) still queued:")
        for o in high_conf_pending[:5]:
            q = (o.get("primary_query") or "")[:45]
            print(f"    [{o['site_key']:10s}] {o['action_kind']:22s} ap_conf={o['action_plan_confidence']} q={q!r}")

    # 5c: Opportunities without an action_plan
    if no_plan_by_site:
        print()
        print("  Opportunities without an action_plan (Action Specifier hasn't run):")
        for site, n in no_plan_by_site.items():
            print(f"    {site:10s} {n} opportunities pending action planning")

    print()
    print("=" * 80)
    print("End of standup")
    print("=" * 80)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--site", default=None, help="restrict to one site_key")
    args = parser.parse_args()
    render(site_filter=args.site)


if __name__ == "__main__":
    main()
