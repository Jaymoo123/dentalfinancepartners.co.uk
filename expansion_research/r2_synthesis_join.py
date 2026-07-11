"""Join R2a/R2b/R2c/R2d + R1 SIC counts into one merged scoring table (CSV + JSON).
Deterministic join only; ranking judgment happens in R2_NICHE_SCORES_DRAFT.md.
"""
import json
import re
import csv

# R2d volumes (niche key observed as stringified id)
vol = {}
for r in json.load(open("expansion_research/r2d_volumes.json", encoding="utf-8")):
    nid = str(r.get("niche_id") or r.get("niche"))
    e = vol.setdefault(nid, {"sum": 0, "best": 0, "best_kw": "", "cpc": []})
    v = r.get("volume") or 0
    e["sum"] += v
    if v > e["best"]:
        e["best"], e["best_kw"] = v, r.get("keyword", "")
    if r.get("cpc"):
        e["cpc"].append(r["cpc"])

# R2a verdicts
serp = {str(r["id"]): r for r in json.load(open("expansion_research/r2a_verdicts.json", encoding="utf-8"))}

# R2c overlap
overlap = {str(c["id"]): c for c in json.load(open("expansion_research/r2_overlap.json", encoding="utf-8"))["candidates"]}

# R2b lead value (parse per-niche md table: | # | Niche | ... | Conf | Score | Rationale |)
lead = {}
for l in open("expansion_research/R2B_LEAD_VALUE.md", encoding="utf-8"):
    m = re.match(r"\|\s*(\d+)\s*\|", l)
    if m:
        cells = [c.strip() for c in l.strip().strip("|").split("|")]
        if len(cells) >= 8:
            score = re.search(r"\d", cells[6])
            lead[cells[0]] = {"fee": cells[2][:80], "conf": cells[5], "score": int(score.group()) if score else None,
                              "rationale": cells[7][:100]}

# R1 SIC counts + names
sic = {}
try:
    for r in json.load(open("expansion_research/r1_sic_counts.json", encoding="utf-8")):
        sic[r.get("sector", "").lower()] = r.get("company_count") or r.get("count")
except Exception:
    pass

rows = []
for nid in sorted(overlap, key=int):
    o = overlap[nid]
    s = serp.get(nid, {})
    v = vol.get(nid, {})
    lv = lead.get(nid, {})
    cpcs = v.get("cpc", [])
    rows.append({
        "id": int(nid),
        "niche": o["name"],
        "overlap_verdict": o["verdict"],
        "overlap_site": o["max_overlap_site"] if o["verdict"] != "CLEAR" else "",
        "serp_verdict": s.get("verdict", ""),
        "avg_specialists": s.get("avg_specialists_top10", ""),
        "vol_sum": v.get("sum", ""),
        "vol_best": v.get("best", ""),
        "best_kw": v.get("best_kw", ""),
        "cpc_max": round(max(cpcs), 2) if cpcs else "",
        "lead_value_score": lv.get("score", ""),
        "lead_conf": lv.get("conf", ""),
        "fee_band": lv.get("fee", ""),
        "sic_magnitude": sic.get(o["name"].lower(), ""),
    })

json.dump(rows, open("expansion_research/r2_synthesis.json", "w", encoding="utf-8"), indent=1)
with open("expansion_research/r2_synthesis.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=rows[0].keys())
    w.writeheader()
    w.writerows(rows)

miss_v = [r["id"] for r in rows if r["overlap_verdict"] != "EXCLUDE" and r["vol_sum"] == ""]
miss_l = [r["id"] for r in rows if r["lead_value_score"] == ""]
print("rows:", len(rows), "| missing volume (non-excluded):", miss_v, "| missing lead score:", miss_l)
