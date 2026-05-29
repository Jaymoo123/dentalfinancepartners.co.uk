#!/usr/bin/env python3
"""Track 2 collapse-direction guard (DETERMINISTIC, spike-robust, monitored-aware).

WHY THIS EXISTS
---------------
The engine DIAGNOSE stage chose redirect-collapse targets by SEMANTIC reasoning
(which slug "sounds like" the canonical) WITHOUT comparing actual ranking equity,
and proposed collapsing a near-page-1 page into a far weaker one - a 301 that
buries ranking equity. This guard is the deterministic floor: a collapse may
only ever point a WEAKER page at a STRONGER one, measured by data.

SPIKE-ROBUST (calibrated): raw 90-day impression SUMS are dominated by one-week
spikes (a single 468-impression week made a dead page look strong). So equity is
measured as `sustained` impressions = 90d total MINUS the single biggest week,
combined with `weeks_present` (distinct weeks with traffic). A page only counts
as a protected ranking asset if it is present in >= MIN_WEEKS weeks with
>= SUSTAIN_FLOOR sustained impressions. Deliberately PERMISSIVE: genuinely weak
or spiky pages still collapse freely, so micro-optimisation is not blocked.

MONITORED-AWARE: a page rewritten in the last RECENT_REWRITE_DAYS days is mid-
recovery (its GSC is artificially low), so it is never collapsed on current
numbers - we don't throw away a page we just invested in.

VERDICT
  ALLOW    - safe to 301 source -> canonical (target >= source, source not protected).
  REVERSED - source is a sustained ranker / recently-rewritten; collapsing loses
             equity. Caller (engine) flips the decision to REWRITE.

Usage:  python scripts/track2_collapse_guard.py --source <slug> --canonical <slug>
Exit 0 = ALLOW, exit 3 = REVERSED, exit 1 = error.
"""
from __future__ import annotations

import argparse
import datetime
import pathlib
import sys
import time

# Run as a bare script: put repo root on the path so `optimisation_engine` imports.
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent.parent))

from optimisation_engine.competitor._db import _sql

BLOG = pathlib.Path("Property/web/content/blog")
SUSTAIN_FLOOR = 50        # spike-discounted impressions below which a page is not a protected asset
                          # (kept permissive so marginal pages still collapse - micro-optimisation)
MIN_WEEKS = 3             # must appear in >= this many distinct weeks to count as a sustained ranker
RECENT_REWRITE_DAYS = 45  # a monitored rewrite newer than this is mid-recovery -> protect it


def _sql_retry(q, tries=4):
    for i in range(tries):
        try:
            return _sql(q)
        except Exception:
            if i == tries - 1:
                raise
            time.sleep(2 * (i + 1))


def gsc(slug: str) -> dict:
    """Weekly GSC over 90d -> total, spike-discounted `sustained`, `weeks_present`,
    clicks, impression-weighted position (exact last-path-segment match)."""
    rows = _sql_retry(f"""
        SELECT page_url, date_trunc('week', date)::date AS wk,
               SUM(impressions) AS impr, SUM(clicks) AS clk, SUM(position*impressions) AS pw
        FROM gsc_query_data
        WHERE site_key='property'
          AND (page_url ILIKE '%/{slug}' OR page_url ILIKE '%/{slug}/')
          AND date > now() - interval '90 days'
        GROUP BY page_url, wk;
    """)
    wk_impr: dict[str, int] = {}
    tot_impr = tot_clk = 0
    pw = 0.0
    for r in rows:
        if (r["page_url"] or "").rstrip("/").split("/")[-1] != slug:
            continue  # ILIKE suffix could catch a longer slug; require exact
        i = int(r["impr"] or 0)
        wk_impr[str(r["wk"])] = wk_impr.get(str(r["wk"]), 0) + i
        tot_impr += i
        tot_clk += int(r["clk"] or 0)
        pw += float(r["pw"] or 0)
    max_week = max(wk_impr.values()) if wk_impr else 0
    return {
        "impr": tot_impr,
        "clk": tot_clk,
        "wpos": round(pw / tot_impr, 1) if tot_impr else None,
        "sustained": tot_impr - max_week,   # drop the single biggest week (spike-discount)
        "weeks_present": sum(1 for v in wk_impr.values() if v > 0),
    }


def inbound_links(slug: str) -> int:
    needle = f"/{slug}"
    return sum(1 for f in BLOG.glob("*.md")
               if f.stem != slug and needle in f.read_text(encoding="utf-8"))


def monitored(slug: str):
    """Active monitored-page status + days since rewrite (None if not monitored)."""
    rows = _sql_retry(f"""
        SELECT rewrite_date, monitor_until, rewrite_type, status
        FROM monitored_pages WHERE site_key='property' AND slug='{slug}' LIMIT 1;
    """)
    if not rows:
        return None
    r = rows[0]
    days = None
    if r.get("rewrite_date"):
        try:
            days = (datetime.date.today() - datetime.date.fromisoformat(str(r["rewrite_date"]))).days
        except Exception:
            pass
    return {"rewrite_date": r.get("rewrite_date"), "rewrite_type": r.get("rewrite_type"),
            "monitor_until": r.get("monitor_until"), "days_since": days}


def enrich(slug: str) -> dict:
    m = gsc(slug)
    m["inbound"] = inbound_links(slug)
    m["exists"] = (BLOG / f"{slug}.md").exists()
    mon = monitored(slug)
    m["monitored"] = mon
    m["monitored_recent"] = bool(mon and mon["days_since"] is not None
                                 and mon["days_since"] <= RECENT_REWRITE_DAYS)
    return m


def evaluate(src: dict, can: dict) -> tuple[str, list[str]]:
    """REVERSED if the source is a sustained ranker (or a freshly-rewritten page
    we are monitoring) that collapsing would damage. Permissive by design."""
    reasons: list[str] = []
    s_pos, c_pos = src["wpos"], can["wpos"]
    s_durable = src["weeks_present"] >= MIN_WEEKS and src["sustained"] >= SUSTAIN_FLOOR

    # R1 - source earns real clicks the target doesn't (clicks are the strongest signal).
    if src["clk"] > can["clk"]:
        reasons.append(f"source has more clicks ({src['clk']} > {can['clk']})")
    # R2 - durable source out-performs target on sustained impressions at equal/better position.
    if s_durable and src["sustained"] > can["sustained"] and (c_pos is None or (s_pos is not None and s_pos <= c_pos)):
        reasons.append(f"source is a sustained ranker (sustained {src['sustained']} impr over "
                       f"{src['weeks_present']} weeks) out-ranking the target (sustained {can['sustained']}; "
                       f"pos {s_pos} vs {c_pos})")
    # R3 - durable source near page 1 vs a much weaker target.
    if s_durable and s_pos is not None and s_pos <= 15 and (c_pos is None or c_pos > s_pos + 10):
        reasons.append(f"source is a sustained near-page-1 ranker (pos {s_pos}, {src['weeks_present']} weeks) "
                       f"vs far-weaker target (pos {c_pos}) - collapsing would bury it")
    # R4 - source is the established internal hub AND a durable ranker.
    if src["inbound"] > can["inbound"] and s_durable and src["sustained"] >= can["sustained"]:
        reasons.append(f"source is the internal hub ({src['inbound']} > {can['inbound']} inbound) "
                       f"and a sustained ranker")
    # R5 - monitored-awareness: never collapse a page rewritten in the last RECENT_REWRITE_DAYS days.
    if src["monitored_recent"]:
        reasons.append(f"source is an ACTIVE monitored rewrite ({src['monitored']['days_since']}d ago) - "
                       f"its GSC is mid-recovery; do not collapse a page we just invested in")

    return ("REVERSED" if reasons else "ALLOW"), reasons


def _fmt(slug, m):
    mon = ""
    if m["monitored"]:
        mon = f" monitored(rewrite {m['monitored']['rewrite_date']}, {m['monitored']['days_since']}d ago)"
    return (f"   impr={m['impr']} sustained={m['sustained']} weeks={m['weeks_present']} "
            f"clk={m['clk']} pos={m['wpos']} inbound={m['inbound']} md={'Y' if m['exists'] else 'N'}{mon}")


def main() -> None:
    ap = argparse.ArgumentParser(description="Block reversed-equity / mid-recovery redirect collapses.")
    ap.add_argument("--source", required=True, help="slug being collapsed away")
    ap.add_argument("--canonical", required=True, help="slug it would 301 into")
    a = ap.parse_args()

    src, can = enrich(a.source), enrich(a.canonical)
    verdict, reasons = evaluate(src, can)

    print(f"source     {a.source}")
    print(_fmt(a.source, src))
    print(f"canonical  {a.canonical}")
    print(_fmt(a.canonical, can))
    print(f"VERDICT: {verdict}")
    for r in reasons:
        print(f"  - {r}")
    if verdict == "ALLOW":
        print(f"  collapse {a.source} -> {a.canonical} is safe (target >= source; source not a protected asset)")
    else:
        print(f"  DO NOT collapse - REWRITE the source instead, or flip the direction "
              f"({a.canonical} -> {a.source}).")
    sys.exit(0 if verdict == "ALLOW" else 3)


if __name__ == "__main__":
    main()
