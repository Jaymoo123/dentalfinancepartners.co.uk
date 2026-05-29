#!/usr/bin/env python3
"""Track 2 collapse-direction guard (DETERMINISTIC).

WHY THIS EXISTS
---------------
The engine DIAGNOSE stage chooses a redirect-collapse target by SEMANTIC
reasoning (which slug "looks like" the broad canonical) WITHOUT comparing the
actual ranking equity of the source vs the proposed canonical. That let it
propose collapsing a near-page-1 page (193 impr, pos 15.5) INTO a far weaker
page-4 page (4 impr, pos 44.5) - a 301 that would have buried the cluster's only
ranking equity. The adversarial verify caught it, but a traffic-DESTROYING
decision must never depend on a probabilistic catch. This guard is the
deterministic floor: a collapse may only ever point a WEAKER page at a STRONGER
one, measured by data, not by what the title sounds like.

VERDICT
  ALLOW    - canonical is clearly >= source on equity; safe to 301 source->canonical.
  REVERSED - source has materially more equity; collapsing it would lose ranking.
             Caller (engine) flips the decision to REWRITE (keep the source).

Equity = GSC 90d (impressions, clicks, impression-weighted position) + internal
inbound-link count. Reads gsc_query_data via the Supabase Management API.

Usage:
  python scripts/track2_collapse_guard.py --source <slug> --canonical <slug>
Exit 0 = ALLOW, exit 3 = REVERSED, exit 1 = error.
"""
from __future__ import annotations

import argparse
import pathlib
import sys

# Allow running as a bare script (python scripts/track2_collapse_guard.py): put
# the repo root on the path so `optimisation_engine` imports.
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent.parent))

from optimisation_engine.competitor._db import _sql

BLOG = pathlib.Path("Property/web/content/blog")


def gsc(slug: str) -> dict:
    """GSC 90d page-level aggregate for a slug (exact last-path-segment match)."""
    rows = _sql(f"""
        SELECT page_url,
               SUM(impressions) AS impr, SUM(clicks) AS clk,
               (SUM(position*impressions)/NULLIF(SUM(impressions),0)) AS wpos
        FROM gsc_query_data
        WHERE site_key='property'
          AND (page_url ILIKE '%/{slug}' OR page_url ILIKE '%/{slug}/')
          AND date > now() - interval '90 days'
        GROUP BY page_url;
    """)
    best = {"impr": 0, "clk": 0, "wpos": None}
    for r in rows:
        seg = (r["page_url"] or "").rstrip("/").split("/")[-1]
        if seg != slug:  # ILIKE suffix could catch a longer slug; require exact
            continue
        impr = int(r["impr"] or 0)
        if impr >= best["impr"]:
            best = {"impr": impr, "clk": int(r["clk"] or 0),
                    "wpos": round(float(r["wpos"]), 1) if r["wpos"] is not None else None}
    return best


def inbound_links(slug: str) -> int:
    """How many other blog .md files link to this slug (internal authority)."""
    needle = f"/{slug}"
    n = 0
    for f in BLOG.glob("*.md"):
        if f.stem == slug:
            continue
        if needle in f.read_text(encoding="utf-8"):
            n += 1
    return n


def evaluate(src: dict, can: dict) -> tuple[str, list[str]]:
    """REVERSED if the source out-ranks the proposed canonical on any axis that
    means real equity would be lost by collapsing it away."""
    reasons: list[str] = []
    s_pos, c_pos = src["wpos"], can["wpos"]

    # 1. Source gets more real traffic (clicks) than the target.
    if src["clk"] > can["clk"]:
        reasons.append(f"source has more clicks ({src['clk']} > {can['clk']})")
    # 2. Source has more demand AND an equal-or-better position.
    if src["impr"] > can["impr"] and (c_pos is None or (s_pos is not None and s_pos <= c_pos)):
        reasons.append(f"source has more impressions ({src['impr']} > {can['impr']}) "
                       f"at equal/better position ({s_pos} vs {c_pos})")
    # 3. Catastrophic: collapsing a near-page-1 source into a much weaker target.
    if s_pos is not None and s_pos <= 20 and (c_pos is None or c_pos > s_pos + 10):
        reasons.append(f"source is near page 1 (pos {s_pos}) and target is far weaker "
                       f"(pos {c_pos}) - collapsing would bury a ranking page")
    # 4. Source is the established internal hub and has at least as much demand.
    if src["inbound"] > can["inbound"] and src["impr"] >= can["impr"]:
        reasons.append(f"source has more internal inbound links "
                       f"({src['inbound']} > {can['inbound']}) and >= demand")

    return ("REVERSED" if reasons else "ALLOW"), reasons


def main() -> None:
    ap = argparse.ArgumentParser(description="Block reversed-equity redirect collapses.")
    ap.add_argument("--source", required=True, help="slug being collapsed away")
    ap.add_argument("--canonical", required=True, help="slug it would 301 into")
    a = ap.parse_args()

    src = gsc(a.source); src["inbound"] = inbound_links(a.source)
    can = gsc(a.canonical); can["inbound"] = inbound_links(a.canonical)
    verdict, reasons = evaluate(src, can)

    print(f"source     {a.source}")
    print(f"           impr={src['impr']} clk={src['clk']} wpos={src['wpos']} inbound={src['inbound']}")
    print(f"canonical  {a.canonical}")
    print(f"           impr={can['impr']} clk={can['clk']} wpos={can['wpos']} inbound={can['inbound']}")
    print(f"VERDICT: {verdict}")
    for r in reasons:
        print(f"  - {r}")
    if verdict == "ALLOW":
        print(f"  collapse {a.source} -> {a.canonical} is safe (target >= source on equity)")
    else:
        print(f"  DO NOT collapse - REWRITE the source instead, or flip the direction "
              f"({a.canonical} -> {a.source}).")
    sys.exit(0 if verdict == "ALLOW" else 3)


if __name__ == "__main__":
    main()
