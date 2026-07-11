"""R2A: compute per-niche SERP-composition verdicts from classified results.

Deterministic aggregation over r2_serp_composition.json (classes assigned by
Claude batches, merged by r2_merge.py). Own-estate hard assert included.
Outputs R2A_SERP_COMPOSITION.md.
"""
import json
import collections

comp = json.load(open("expansion_research/r2_serp_composition.json", encoding="utf-8"))
own = json.load(open("expansion_research/own_estate_exclusion.json", encoding="utf-8"))
own_domains = set()
for site in own["sites"].values():
    for v in site["domains"]:
        own_domains.add(v.lower().removeprefix("www."))
assert len(own_domains) >= 8, f"own-estate list too small: {own_domains}"

rows = []
own_hits = []
for nid, entry in sorted(comp.items(), key=lambda kv: int(kv[0])):
    per_q_spec = []
    dom_counter = collections.Counter()
    dir_count = tot = 0
    for q, results in entry["queries"].items():
        spec = 0
        for r in results[:10]:
            tot += 1
            d = r["domain"].lower().removeprefix("www.")
            cls = r.get("class", "INFO")
            if d in own_domains:
                own_hits.append((nid, entry["niche"], q, d, cls))
                continue  # never count own estate as competitor
            if cls == "SPECIALIST":
                spec += 1
                dom_counter[d] += 1
            elif cls == "DIRECTORY":
                dir_count += 1
        per_q_spec.append(spec)
    n_q = max(len(per_q_spec), 1)
    avg_spec = sum(per_q_spec) / n_q
    dominant = [d for d, c in dom_counter.items() if c >= 2 and n_q >= 2]
    dir_sat = dir_count / max(tot, 1)
    if avg_spec == 0:
        verdict = "NO_SPECIALISTS"
    elif avg_spec < 1.5:
        verdict = "WEAK_FIELD"
    elif avg_spec <= 3.5:
        verdict = "CONTESTED"
    else:
        verdict = "STRONG_SPECIALISTS"
    rows.append({
        "id": int(nid), "niche": entry["niche"], "n_queries": n_q,
        "avg_specialists_top10": round(avg_spec, 2),
        "dominant_specialists": sorted(dominant)[:4],
        "directory_saturation": round(dir_sat, 2),
        "verdict": verdict,
    })

json.dump(rows, open("expansion_research/r2a_verdicts.json", "w", encoding="utf-8"), indent=1)

dist = collections.Counter(r["verdict"] for r in rows)
with open("expansion_research/R2A_SERP_COMPOSITION.md", "w", encoding="utf-8") as f:
    f.write("# R2A: SERP composition per candidate niche\n\n")
    f.write("Classes assigned per result by Claude (8 batches, merged); verdicts computed deterministically by r2a_verdicts.py.\n")
    f.write(f"Verdict distribution: {dict(dist)}\n\n")
    f.write(f"Own-estate hits (excluded from competitor counts): {len(own_hits)}\n")
    for h in own_hits:
        f.write(f"- niche {h[0]} ({h[1]}), query '{h[2]}': {h[3]} [{h[4]}]\n")
    f.write("\n| # | Niche | Q | Avg specialists/top10 | Dominant specialists | Dir sat | Verdict |\n")
    f.write("|---|---|---|---|---|---|---|\n")
    for r in rows:
        f.write(f"| {r['id']} | {r['niche']} | {r['n_queries']} | {r['avg_specialists_top10']} | "
                f"{', '.join(r['dominant_specialists']) or '-'} | {r['directory_saturation']} | {r['verdict']} |\n")

print("verdicts:", dict(dist))
print("own-estate hits:", len(own_hits))
print("rows:", len(rows))
