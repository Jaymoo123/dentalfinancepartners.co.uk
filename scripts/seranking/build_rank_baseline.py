"""
Deliverable 4 (part A) — Rank baseline + movers.

Two sources:
  * Tier-2 daily series: raw/project_positions_*.json (one per day, Days 1-7).
    When >=2 days exist, computes movers (>3 positions) over the window.
  * Fallback starting line: our raw/domain_keywords_propertytaxpartners*.json
    (a one-time SE Ranking position snapshot), cross-validated against live GSC.

The 7-day daily series needs tier2-poll run each day; until then this emits the
one-shot snapshot + GSC cross-check as the starting line.

Out: rank_baseline_<date>.csv
Run: python -m scripts.seranking.build_rank_baseline
"""
from __future__ import annotations

from datetime import date

from scripts.seranking._common import (
    raw_files, load, records, pick, to_num, norm, gsc_property_positions, write_csv,
)

OWN = "propertytaxpartners"


def _extract(rec: dict) -> dict:
    return {
        "keyword": pick(rec, "keyword", "kw", "query", "phrase"),
        "pos": to_num(pick(rec, "position", "pos", "rank", "rank_absolute")),
        "sv": to_num(pick(rec, "volume", "search_volume", "sv")),
        "url": pick(rec, "url", "landing_page", "link"),
    }


def main() -> int:
    series = raw_files("project_positions")
    own_kw = [p for p in raw_files("domain_keywords") if OWN in p.name]

    if not series and not own_kw:
        print("No rank data yet. Run tier2-poll (daily) or tier1 (own domain_keywords) first.")
        return 1

    gsc = gsc_property_positions()
    rows = []

    if len(series) >= 2:
        # daily series -> movers
        first = {norm(_extract(r)["keyword"]): _extract(r)["pos"]
                 for r in records(load(series[0])) if _extract(r)["keyword"]}
        last_path = series[-1]
        for rec in records(load(last_path)):
            e = _extract(rec)
            k = norm(e["keyword"])
            if not k or e["pos"] is None:
                continue
            start = first.get(k)
            move = (start - e["pos"]) if (start is not None and e["pos"] is not None) else None
            rows.append({
                "keyword": e["keyword"], "se_position": e["pos"], "start_position": start,
                "move": move, "search_volume": e["sv"],
                "gsc_position": (gsc.get(k) or {}).get("pos"), "url": e["url"],
                "mover": move is not None and abs(move) > 3,
            })
        rows.sort(key=lambda r: -(abs(r["move"]) if r["move"] is not None else -1))
        label = f"7-day series ({len(series)} days)"
    else:
        # one-shot snapshot + GSC cross-check
        for path in own_kw:
            for rec in records(load(path)):
                e = _extract(rec)
                k = norm(e["keyword"])
                if not k or e["pos"] is None:
                    continue
                rows.append({
                    "keyword": e["keyword"], "se_position": e["pos"], "start_position": None,
                    "move": None, "search_volume": e["sv"],
                    "gsc_position": (gsc.get(k) or {}).get("pos"), "url": e["url"], "mover": False,
                })
        rows.sort(key=lambda r: (r["se_position"] if r["se_position"] is not None else 999))
        label = "one-shot snapshot (tier2 daily series pending)"

    out = write_csv(f"rank_baseline_{date.today().isoformat()}.csv", rows, fieldnames=[
        "keyword", "se_position", "start_position", "move", "search_volume",
        "gsc_position", "url", "mover"])
    print(f"Wrote {out}  ({len(rows)} keywords; {label})")
    movers = [r for r in rows if r["mover"]]
    if movers:
        print(f"  movers (>3 pos): {len(movers)}")
        for r in movers[:10]:
            print(f"    {r['move']:+d}  {r['keyword']!r}  (now #{r['se_position']})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
