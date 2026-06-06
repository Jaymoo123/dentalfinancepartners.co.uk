#!/usr/bin/env python3
"""Build the prioritised Humanise worklist (Humanise Engine).

Order = "worst-scored among real-traffic pages". Joins voice_scan robot_score
(the manifest) with GSC impressions (gsc_query_data), drops pages that are clean,
Section 24 (a concurrent agent owns those), already processed (the tracker), or
temp preview copies, and prints/returns the ranked slug list to sweep.

  python scripts/voice_worklist.py [--site property] [--top N] [--json]
       [--min-band robotic|minor] [--days 90]

GSC is read-only (SUPABASE_ACCESS_TOKEN from .env). If GSC is unavailable it
degrades to robot_score-only ordering (every page treated as 0 impressions).
"""
from __future__ import annotations

import argparse
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
CACHE = ROOT / "optimisation_engine" / ".cache"
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

BAND_ORDER = ["clean", "minor", "robotic", "severe"]


def _traffic(site: str, days: int) -> dict[str, dict]:
    """slug -> {gsc, bing, total} impressions. Bing is the DOMINANT source for
    these legacy pages (they rank page-1 Bing while page 4-8 Google), so both are
    summed for the ranking. GSC is a rolling window; Bing is a latest snapshot."""
    out: dict[str, dict] = {}
    try:
        from optimisation_engine.competitor._db import _sql
    except Exception as e:
        print(f"  WARN: DB unavailable ({e}); ordering by robot_score only.", file=sys.stderr)
        return out

    def _add(rows, key):
        for r in rows or []:
            url = (r.get("page_url") or "").rstrip("/")
            if not url:
                continue
            slug = url.rsplit("/", 1)[-1]
            rec = out.setdefault(slug, {"gsc": 0, "bing": 0, "total": 0})
            n = int(r.get("impr") or 0)
            rec[key] += n
            rec["total"] += n

    try:
        _add(_sql("SELECT page_url, SUM(impressions) AS impr FROM gsc_query_data "
                  f"WHERE site_key='{site}' AND date > now() - interval '{days} days' "
                  "GROUP BY page_url;"), "gsc")
    except Exception as e:
        print(f"  WARN: GSC query failed ({e})", file=sys.stderr)
    try:
        _add(_sql("SELECT page_url, SUM(impressions) AS impr FROM bing_query_data "
                  f"WHERE site_key='{site}' AND date=(SELECT MAX(date) FROM bing_query_data "
                  f"WHERE site_key='{site}') GROUP BY page_url;"), "bing")
    except Exception as e:
        print(f"  WARN: Bing query failed ({e})", file=sys.stderr)
    return out


def _tracker_processed(site: str) -> set[str]:
    """Slugs already done/escalate in the tracker (skip them)."""
    p = ROOT / f"docs/{site}/humanise_tracker.md"
    done: set[str] = set()
    if not p.exists():
        return done
    for line in p.read_text(encoding="utf-8").splitlines():
        if not line.startswith("|"):
            continue
        cells = [c.strip() for c in line.split("|")]
        # | slug | status | ... -> cells[1]=slug, cells[2]=status
        if len(cells) > 3 and cells[2] in ("done", "escalate"):
            done.add(cells[1])
    return done


def _is_section24(slug: str) -> bool:
    return bool(re.search(r"section-?24", slug, re.I))


def build(site: str, min_band: str, days: int) -> list[dict]:
    man = CACHE / f"voice_scan_{site}.json"
    if not man.exists():
        sys.exit(f"no manifest {man}; run `voice_scan.py --all --site {site}` first")
    pages = json.loads(man.read_text(encoding="utf-8")).get("pages", [])
    traf = _traffic(site, days)
    processed = _tracker_processed(site)
    minrank = BAND_ORDER.index(min_band)
    rows = []
    for p in pages:
        slug = p["slug"]
        if BAND_ORDER.index(p["band"]) < minrank:
            continue
        if _is_section24(slug) or slug.endswith(("-original", "-orig")) or slug in processed:
            continue
        rec = traf.get(slug) or {}
        rows.append({"slug": slug, "robot_score": p["robot_score"], "band": p["band"],
                     "impressions": rec.get("total", 0),
                     "bing": rec.get("bing", 0), "gsc": rec.get("gsc", 0)})
    # worst-scored among real-traffic: traffic first, then impressions, then score.
    rows.sort(key=lambda r: (r["impressions"] > 0, r["impressions"], r["robot_score"]),
              reverse=True)
    return rows


def main() -> int:
    ap = argparse.ArgumentParser(description="Prioritised Humanise worklist.")
    ap.add_argument("--site", default="property")
    ap.add_argument("--top", type=int, help="only the top N")
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--min-band", default="robotic", choices=BAND_ORDER)
    ap.add_argument("--days", type=int, default=90)
    ap.add_argument("--slugs-only", action="store_true", help="print bare slugs (one per line)")
    a = ap.parse_args()
    rows = build(a.site, a.min_band, a.days)
    if a.top:
        rows = rows[:a.top]
    if a.slugs_only:
        for r in rows:
            print(r["slug"])
        return 0
    if a.json:
        print(json.dumps(rows, indent=2))
        return 0
    with_traffic = sum(1 for r in rows if r["impressions"] > 0)
    print(f"Humanise worklist ({a.site}): {len(rows)} pages "
          f"(min band {a.min_band}; {with_traffic} with traffic Bing+Google; "
          "excl Section 24 + processed)")
    for r in rows:
        print(f"  {r['robot_score']:>5} {r['band']:<7} tot {r['impressions']:>5} "
              f"(B{r.get('bing', 0):>5}/G{r.get('gsc', 0):>4})  {r['slug']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
