"""Quote unquoted YAML frontmatter scalars containing ': ' (build-breaking).

Mechanical, frontmatter-only; bodies untouched.
"""
from __future__ import annotations

import re
from pathlib import Path

import yaml

BLOG = Path(r"C:\Users\user\Documents\Accounting\contractors-ir35\web\content\blog")

KV = re.compile(r"^(\s*)([A-Za-z][A-Za-z0-9_]*):\s(.+)$")
ITEM_KV = re.compile(r"^(\s*-\s+)(question|answer):\s(.+)$")
ITEM = re.compile(r"^(\s*-\s)(.+)$")


def needs_quote(value: str) -> bool:
    v = value.strip()
    if not v or v[0] in "\"'[{" or v in ("|", ">", "|-", ">-"):
        return False
    return ": " in v or v.endswith(":")


def quote(v: str) -> str:
    return '"' + v.strip().replace("\\", "\\\\").replace('"', '\\"') + '"'


changed_total = 0
for p in sorted(BLOG.glob("*.md")):
    raw = p.read_text(encoding="utf-8")
    m = re.match(r"^---\n(.*?)\n---\n", raw, re.DOTALL)
    if not m:
        print(f"SKIP {p.name}: no frontmatter block")
        continue
    fm_text = m.group(1)
    try:
        yaml.safe_load(fm_text)
        continue  # already valid
    except yaml.YAMLError:
        pass
    lines = fm_text.split("\n")
    fixed = []
    n = 0
    for line in lines:
        item_kv = ITEM_KV.match(line)
        kv = KV.match(line)
        if item_kv:
            if needs_quote(item_kv.group(3)):
                line = f"{item_kv.group(1)}{item_kv.group(2)}: {quote(item_kv.group(3))}"
                n += 1
        elif kv:
            if needs_quote(kv.group(3)):
                line = f"{kv.group(1)}{kv.group(2)}: {quote(kv.group(3))}"
                n += 1
        else:
            item = ITEM.match(line)
            if item and needs_quote(item.group(2)):
                line = f"{item.group(1)}{quote(item.group(2))}"
                n += 1
        fixed.append(line)
    new_fm = "\n".join(fixed)
    try:
        yaml.safe_load(new_fm)
    except yaml.YAMLError as e:
        print(f"STILL BROKEN {p.name}: {e}")
        continue
    p.write_text(raw.replace(m.group(1), new_fm, 1), encoding="utf-8")
    print(f"FIXED {p.name}: {n} lines quoted")
    changed_total += 1

print(f"\n{changed_total} files repaired")
