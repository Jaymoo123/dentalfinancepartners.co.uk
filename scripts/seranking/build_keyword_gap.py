"""
Deliverable 1 — Competitor keyword-gap report.

Reads raw/domain_keywords_*.json (our domain + each competitor) pulled by
run_extraction tier1, unions our footprint with live GSC, and emits the gap set:
keywords a competitor ranks top-10 for where Property is absent or ranks >=11,
scored by sqrt(volume) * intent_weight / max(KD,5) with a GSC demand boost.

Out: briefs/property/seranking/keyword_gap_<date>.csv

Run:  python -m scripts.seranking.build_keyword_gap
"""
from __future__ import annotations

from datetime import date

from scripts.seranking._common import (
    raw_files, load, records, pick, to_num, to_int, norm, kw_score,
    gsc_property_positions, write_csv,
)

OWN = "propertytaxpartners"


def _extract(rec: dict) -> dict:
    return {
        "keyword": pick(rec, "keyword", "kw", "query", "phrase", "name"),
        "pos": to_num(pick(rec, "position", "pos", "rank", "rank_absolute", "serp_position")),
        "sv": to_int(pick(rec, "volume", "search_volume", "sv", "searches")),
        "kd": to_num(pick(rec, "difficulty", "keyword_difficulty", "kd")),
        "intent": pick(rec, "intent", "search_intent", "intents"),
        "url": pick(rec, "url", "landing_page", "link", "page"),
    }


def main() -> int:
    own_pos: dict[str, dict] = {}
    comp_top: dict[str, dict] = {}
    files = raw_files("domain_keywords")
    if not files:
        print("No raw/domain_keywords_*.json yet. Run tier1 first.")
        return 1

    extracted = 0
    for path in files:
        is_own = OWN in path.name
        for rec in records(load(path)):
            e = _extract(rec)
            k = norm(e["keyword"])
            if not k or e["pos"] is None:
                continue
            extracted += 1
            if is_own:
                cur = own_pos.get(k)
                if cur is None or e["pos"] < cur["pos"]:
                    own_pos[k] = e
            else:
                if e["pos"] <= 10:
                    cur = comp_top.get(k)
                    if cur is None or e["pos"] < cur["pos"]:
                        e["competitor"] = path.name.split("domain_keywords_")[-1].split("_2")[0]
                        comp_top[k] = e
    print(f"  extracted {extracted} keyword records; {len(own_pos)} ours, {len(comp_top)} competitor top-10")

    gsc = gsc_property_positions()
    # Union GSC into our footprint (prefer better position)
    for k, g in gsc.items():
        if g["pos"] is None:
            continue
        cur = own_pos.get(k)
        if cur is None or g["pos"] < cur["pos"]:
            own_pos[k] = {"keyword": k, "pos": g["pos"], "sv": None, "kd": None, "intent": None, "url": "(gsc)"}

    rows = []
    for k, c in comp_top.items():
        ours = own_pos.get(k)
        our_pos = ours["pos"] if ours else None
        if our_pos is not None and our_pos <= 10:
            continue  # we already hold top-10; not a gap
        action = "net-new" if our_pos is None else ("rewrite" if our_pos <= 30 else "rewrite-deep")
        s = kw_score(c["sv"], c["kd"], c["intent"])
        in_gsc = k in gsc and (gsc[k].get("impressions") or 0) > 0
        if s is not None and in_gsc:
            s = round(s * 1.15, 3)  # demand corroboration boost
        rows.append({
            "keyword": c["keyword"], "volume": c["sv"], "KD": c["kd"], "intent": c["intent"],
            "score": s, "best_competitor": c.get("competitor"), "their_pos": c["pos"],
            "our_pos": our_pos, "action": action, "gsc_demand": in_gsc,
            "competitor_url": c["url"],
        })
    rows.sort(key=lambda r: -(r["score"] or 0))
    out = write_csv(f"keyword_gap_{date.today().isoformat()}.csv", rows, fieldnames=[
        "keyword", "volume", "KD", "intent", "score", "best_competitor",
        "their_pos", "our_pos", "action", "gsc_demand", "competitor_url"])
    print(f"Wrote {out}  ({len(rows)} gap keywords)")
    for r in rows[:15]:
        print(f"  score={r['score']}  v={r['volume']}  {r['action']:11s}  {r['keyword']!r} "
              f"(they #{r['their_pos']} via {r['best_competitor']})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
