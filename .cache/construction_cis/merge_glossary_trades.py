"""Deterministic merge: glossary fragments -> data.ts, trade fragments -> trade-types.ts."""
import re
from pathlib import Path

ROOT = Path(".")

# ---------------- glossary ----------------
GLO_DIR = ROOT / "briefs/construction-cis/glossary"
GLO_DATA = ROOT / "construction-cis/web/src/app/glossary/[slug]/data.ts"

bodies, slugs = [], []
for i in range(1, 4):
    t = (GLO_DIR / f"batch{i}.ts").read_text(encoding="utf-8")
    start = t.index("[", t.index("= ["))
    end = t.rindex("];")
    body = t[start + 1 : end].strip().rstrip(",")
    bodies.append(f"  // ---- batch{i} ----\n  {body},")
    slugs += re.findall(r'^\s*slug:\s*"([a-z0-9-]+)"', t, re.M)

assert len(slugs) == len(set(slugs)), f"duplicate glossary slugs: {[s for s in slugs if slugs.count(s) > 1]}"
print(f"glossary: {len(slugs)} unique entries")

src = GLO_DATA.read_text(encoding="utf-8")
header = src[: src.index("export const GLOSSARY")]
new = (
    header
    + "const GLOSSARY_LIST: GlossaryEntry[] = [\n"
    + "\n".join(bodies)
    + "\n];\n\n"
    + "export const GLOSSARY: Record<string, GlossaryEntry> = Object.fromEntries(\n"
    + "  GLOSSARY_LIST.map((e) => [e.slug, e]),\n"
    + ");\n"
)
GLO_DATA.write_text(new, encoding="utf-8")
print("glossary data.ts written")

# ---------------- trades ----------------
TR_DIR = ROOT / "briefs/construction-cis/trades"
TR_DATA = ROOT / "construction-cis/web/src/data/trade-types.ts"

frag_files = ["batch1.ts", "batch2.ts", "batch3.ts", "batch4.ts", "business1.ts", "business2.ts"]
tbodies, tslugs = [], []
for f in frag_files:
    t = (TR_DIR / f).read_text(encoding="utf-8")
    t = t.replace(' as const', "")
    start = t.index("[", t.index("= ["))
    end = t.rindex("];")
    body = t[start + 1 : end].strip().rstrip(",")
    tbodies.append(f"  // ---- {f[:-3]} ----\n  {body},")
    tslugs += re.findall(r'^\s*slug:\s*"([a-z0-9-]+)"', t, re.M)

src = TR_DATA.read_text(encoding="utf-8")
existing = re.findall(r'^\s{4}slug:\s*"([a-z0-9-]+)"', src, re.M)
allslugs = existing + tslugs
assert len(allslugs) == len(set(allslugs)), f"slug collision: {[s for s in allslugs if allslugs.count(s) > 1]}"
print(f"trades: {len(existing)} existing + {len(tslugs)} new = {len(allslugs)} unique")

# insert before the closing of the tradeTypes array: the first "\n];" after the array opens
arr_start = src.index("export const tradeTypes")
close = src.index("\n];", arr_start)
new = src[:close] + ",\n\n" + "\n".join(tbodies).rstrip(",") + "\n" + src[close + 1 :]
# the original entries end without trailing comma before ]; — ensure previous entry has comma:
TR_DATA.write_text(new, encoding="utf-8")
print("trade-types.ts written")

# em-dash check on both outputs (content only)
for p in (GLO_DATA, TR_DATA):
    t = p.read_text(encoding="utf-8")
    n = t.count("—") + t.count("–")
    print(f"{p.name}: em/en-dashes = {n}")
