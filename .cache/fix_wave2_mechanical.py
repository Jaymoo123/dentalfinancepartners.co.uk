"""Wave-2 mechanical fixes: stray </faqs> tags, slug-style categories, wrong link paths."""
from __future__ import annotations

import re
from pathlib import Path

import yaml

BLOG = Path(r"C:\Users\user\Documents\Accounting\contractors-ir35\web\content\blog")

CAT_FIX = {
    "ir35-status": "IR35 Status",
    "limited-company-tax": "Limited Company Tax",
    "umbrella-vs-limited-company": "Umbrella vs Limited Company",
    "expenses-and-deductions": "Expenses and Deductions",
    "pension-and-dividends": "Pension and Dividends",
    "mtd-and-compliance": "MTD and Compliance",
    "contractor-accounting-basics": "Contractor Accounting Basics",
}

changed = []
for p in sorted(BLOG.glob("*.md")):
    raw = p.read_text(encoding="utf-8")
    orig = raw
    m = re.match(r"^---\n(.*?)\n---\n", raw, re.DOTALL)
    if not m:
        continue
    fm_text = m.group(1)
    new_fm = re.sub(r"^</?faqs>\s*$\n?", "", fm_text, flags=re.M)
    for slug_cat, disp in CAT_FIX.items():
        new_fm = re.sub(rf"^category:\s*['\"]?{slug_cat}['\"]?\s*$",
                        f"category: {disp}", new_fm, flags=re.M)
    if new_fm != fm_text:
        raw = raw.replace(fm_text, new_fm, 1)
    if raw != orig:
        try:
            yaml.safe_load(re.match(r"^---\n(.*?)\n---\n", raw, re.DOTALL).group(1))
        except yaml.YAMLError as e:
            print(f"ABORT {p.name}: post-fix YAML still broken: {str(e).splitlines()[0]}")
            continue
        p.write_text(raw, encoding="utf-8")
        changed.append(p.name)

# dividend-tax wrong link paths
p = BLOG / "dividend-tax-rates-contractors-2026.md"
raw = p.read_text(encoding="utf-8")
orig = raw
raw = raw.replace("/blog/ir35-status/psc-limited-company-contractor-tax",
                  "/blog/limited-company-tax/psc-limited-company-contractor-tax")
raw = raw.replace("/blog/pension-and-dividends/director-salary-dividend-split-guide",
                  "/blog/limited-company-tax/director-salary-dividend-split-guide")
if raw != orig:
    p.write_text(raw, encoding="utf-8")
    changed.append(p.name + " (link paths)")

print("CHANGED:")
for c in changed:
    print(" ", c)
