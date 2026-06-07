"""Diff the non-circular property-tax taxonomy against the FULL live inventory.
Read-only. Writes _taxonomy_tocheck.json (candidates needing adjudication)."""
import sys, re, json
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from _taxonomy import TAXONOMY

ROOT = Path(__file__).resolve().parents[3]
live = [p.stem for p in (ROOT / "Property/web/content/blog").glob("*.md")]
hubs = ["capital-gains-tax","incorporation-and-company-structures","landlord-tax-essentials","making-tax-digital-mtd",
        "non-resident-landlord-tax","portfolio-management","property-accountant-services","property-types-and-specialist-tax","section-24-and-tax-relief"]
locs = ["london","manchester","birmingham","leeds","bristol"]
names = live + hubs + ["property-accountant-" + l for l in locs]
toks = [set(s.split("-")) for s in names]

def best(q):
    qt = set(re.split(r"[^a-z0-9]+", q.lower())) - {""}
    b = (0.0, "")
    for s, st in zip(names, toks):
        u = qt | st
        j = len(qt & st) / len(u) if u else 0
        if j > b[0]:
            b = (round(j, 2), s)
    return b

total = sum(len(v) for v in TAXONOMY.values())
covered = borderline = gap = 0
out = {}
for cl, topics in TAXONOMY.items():
    g = []
    for t in topics:
        sc, m = best(t)
        if sc >= 0.5:
            covered += 1
        elif sc >= 0.3:
            borderline += 1
            g.append({"topic": t, "score": sc, "closest": m, "bucket": "borderline"})
        else:
            gap += 1
            g.append({"topic": t, "score": sc, "closest": m, "bucket": "gap"})
    if g:
        out[cl] = g

print(f"TAXONOMY topics: {total} | likely-covered(>=0.5): {covered} | borderline(0.3-0.5): {borderline} | likely-gap(<0.3): {gap}")
print()
for cl, g in out.items():
    print(f"### {cl}: {len(g)} to-check (of {len(TAXONOMY[cl])})")
    for e in sorted(g, key=lambda x: x["score"]):
        print(f"   [{e['bucket']:9}] {e['score']:.2f}  {e['topic']!r}   ~closest: {e['closest']}")
    print()
json.dump(out, open(Path(__file__).parent / "_taxonomy_tocheck.json", "w"), indent=2)
