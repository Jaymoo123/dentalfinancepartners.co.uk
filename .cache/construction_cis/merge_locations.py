"""Deterministic merge of location fragments into locations data.ts.

Reads briefs/construction-cis/locations/batch1-5.ts (each exporting a
CityData[] array), concatenates the array bodies, and rewrites
construction-cis/web/src/app/locations/[slug]/data.ts so CITIES derives
from the concatenated list. Pure text transformation; tsc verifies after.
"""
import json
import re
from pathlib import Path

ROOT = Path(".")
FRAG_DIR = ROOT / "briefs/construction-cis/locations"
DATA = ROOT / "construction-cis/web/src/app/locations/[slug]/data.ts"
NICHE = ROOT / "construction-cis/niche.config.json"

bodies = []
slugs = []
for i in range(1, 6):
    t = (FRAG_DIR / f"batch{i}.ts").read_text(encoding="utf-8")
    start = t.index("[", t.index("= ["))  # first array opener after assignment
    # find matching closing bracket: last `];` in file
    end = t.rindex("];")
    body = t[start + 1 : end].strip().rstrip(",")
    bodies.append(f"  // ---- batch{i} ----\n  {body},")
    slugs += re.findall(r'^\s*slug:\s*"([a-z-]+)"', t, re.M)

assert len(slugs) == 25, f"expected 25 slugs, found {len(slugs)}: {slugs}"
assert len(set(slugs)) == 25, "duplicate slugs across batches"

src = DATA.read_text(encoding="utf-8")
header = src[: src.index("export const CITIES")]
new = (
    header
    + "const CITY_LIST: CityData[] = [\n"
    + "\n".join(bodies)
    + "\n];\n\n"
    + "export const CITIES: Record<string, CityData> = Object.fromEntries(\n"
    + "  CITY_LIST.map((c) => [c.slug, c]),\n"
    + ");\n"
)
DATA.write_text(new, encoding="utf-8")
print(f"data.ts written: {len(slugs)} cities: {', '.join(slugs)}")

# niche.config locations -> 25 objects
cfg = json.loads(NICHE.read_text(encoding="utf-8"))
names = dict(re.findall(r'slug:\s*"([a-z-]+)",\s*\n\s*name:\s*"([^"]+)"', "\n".join((FRAG_DIR / f"batch{i}.ts").read_text(encoding="utf-8") for i in range(1, 6))))
order10 = ["london", "manchester", "birmingham", "leeds", "bristol", "glasgow", "edinburgh", "sheffield", "liverpool", "newcastle"]
rest = sorted(s for s in slugs if s not in order10)
cfg["locations"] = [{"slug": s, "title": names.get(s, s.replace("-", " ").title())} for s in order10 + rest]
NICHE.write_text(json.dumps(cfg, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print(f"niche.config locations: {len(cfg['locations'])}")
