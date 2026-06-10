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

TARGET-ESTABLISHMENT (R6): the collapse target must itself be a proven ranking
asset. The source-protection rules above do not stop a collapse INTO a brand-new
or zero-equity page. Redirecting an indexed page into a page search engines have
not yet ranked (no clicks, below the sustained floor, < MIN_WEEKS weeks present)
is the wrong direction - it bins the source's existing index presence on a bet.
So a collapse into an unproven target (when the source is the more-established of
the two) is REVERSED: rewrite the source, or wait until the target ranks.

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
import json
import pathlib
import sys
import time

# Run as a bare script: put repo root on the path so `optimisation_engine` imports.
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent.parent))

from optimisation_engine.competitor._db import _sql

ROOT = pathlib.Path(__file__).resolve().parent.parent


def _arg_site() -> str:
    """--site <key> selects which site's corpus + GSC/monitored rows to read
    (default property for back-compat). Resolved at import time so BLOG/SITE are
    module-level, matching scripts/track2_link_audit.py + scripts/predeploy_gate.py."""
    if "--site" in sys.argv:
        i = sys.argv.index("--site")
        if i + 1 < len(sys.argv):
            return sys.argv[i + 1]
    return "property"


def _blog_dir(site: str) -> pathlib.Path:
    """Resolve the site's blog content dir from sites/<site>.json (default Property)."""
    p = ROOT / "sites" / f"{site}.json"
    if p.exists():
        cfg = json.loads(p.read_text(encoding="utf-8"))
        return ROOT / cfg["paths"]["blogContentDir"]
    return ROOT / "Property/web/content/blog"


SITE = _arg_site()
BLOG = _blog_dir(SITE)
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
        WHERE site_key='{SITE}'
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
        FROM monitored_pages WHERE site_key='{SITE}' AND slug='{slug}' LIMIT 1;
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
    # R5 refinement: a row with rewrite_type='redirect' is the redirect's OWN
    # monitored record - it must not "protect" the slug from being (re)collapsed
    # on the strength of its own redirect entry (self-referential). Only genuine
    # rewrites/keepers earn mid-recovery protection.
    m["monitored_recent"] = bool(mon and mon["days_since"] is not None
                                 and mon["days_since"] <= RECENT_REWRITE_DAYS
                                 and mon.get("rewrite_type") != "redirect")
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
    # R6 - target must be an ESTABLISHED asset. The other rules only check the
    # source is weak enough to give up; none checked that the destination is
    # actually stronger. Collapsing an indexed page into a brand-new / unproven
    # canonical (no clicks, below the sustained floor, present in < MIN_WEEKS
    # weeks) is the wrong direction: you bin the source's existing index presence
    # and bet on a page search engines have not yet ranked. Rewrite the source,
    # or wait until the target proves it ranks, then collapse weaker->proven.
    can_unproven = (can["clk"] == 0 and can["sustained"] < SUSTAIN_FLOOR
                    and can["weeks_present"] < MIN_WEEKS)
    if can_unproven and src["impr"] > can["impr"]:
        reasons.append(f"target is NOT an established ranking asset (clicks 0, sustained "
                       f"{can['sustained']} impr over {can['weeks_present']} weeks) while the source is "
                       f"more established ({src['impr']} vs {can['impr']} impr) - collapsing into an "
                       f"unproven/brand-new page is the wrong direction; rewrite the source or wait "
                       f"until the target ranks")

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
    ap.add_argument("--site", default="property",
                    help="site_key + corpus (resolved at import via sites/<site>.json; default property)")
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
