#!/usr/bin/env python3
"""
Insert Opus-generated keyTakeaways into blog frontmatter.

Reads every .cache/tk_out_*.json (objects mapping slug -> [bullets]), merges
them, then surgically inserts a `keyTakeaways:` YAML block into each matching
.md (after the `summary:` line, else after `date:`). Idempotent: skips a file
that already has keyTakeaways. Preserves the rest of the frontmatter and body.

Usage:
  python scripts/blog_insert_takeaways.py --blogdir Dentists/web/content/blog --outdir .cache
  python scripts/blog_insert_takeaways.py ... --dry-run
"""
import argparse
import glob
import json
import os
import re


def load_map(outdir):
    merged = {}
    files = sorted(glob.glob(os.path.join(outdir, "tk_out_*.json")))
    for f in files:
        try:
            d = json.load(open(f, encoding="utf-8"))
            for k, v in d.items():
                if isinstance(v, list) and v:
                    merged[k] = v
        except Exception as e:  # noqa
            print(f"  ! bad json {f}: {e}")
    return merged, files


def split_frontmatter(raw: str):
    if not raw.startswith("---"):
        return None, None
    lines = raw.split("\n")
    end = None
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            end = i
            break
    if end is None:
        return None, None
    return lines[1:end], "\n".join(lines[end + 1:])


def yq(val: str) -> str:
    return '"' + str(val).replace('\\', '\\\\').replace('"', '\\"') + '"'


def has_key(fm_lines, key):
    pat = re.compile(rf"^{re.escape(key)}\s*:")
    return any(pat.match(l) for l in fm_lines)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--blogdir", default="Dentists/web/content/blog")
    ap.add_argument("--outdir", default=".cache")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    tmap, files = load_map(a.outdir)
    print(f"loaded {len(tmap)} slugs from {len(files)} tk_out files")

    inserted = skipped = missing = 0
    for slug, bullets in tmap.items():
        path = os.path.join(a.blogdir, f"{slug}.md")
        if not os.path.isfile(path):
            print(f"  MISSING file for slug: {slug}")
            missing += 1
            continue
        raw = open(path, encoding="utf-8").read()
        fm, body = split_frontmatter(raw)
        if fm is None:
            print(f"  no frontmatter: {slug}")
            continue
        if has_key(fm, "keyTakeaways"):
            skipped += 1
            continue

        block = ["keyTakeaways:"] + [f"  - {yq(b)}" for b in bullets]

        out, placed = [], False
        for line in fm:
            out.append(line)
            if not placed and re.match(r"^summary\s*:", line):
                out.extend(block)
                placed = True
        if not placed:  # fallback: after date
            out2 = []
            for line in out:
                out2.append(line)
                if not placed and re.match(r"^date\s*:", line):
                    out2.extend(block)
                    placed = True
            out = out2
        if not placed:  # last resort: end of frontmatter
            out.extend(block)
            placed = True

        new_raw = "---\n" + "\n".join(out) + "\n---\n" + body
        if a.dry_run:
            print(f"  DRY {slug}  +{len(bullets)} takeaways")
        else:
            open(path, "w", encoding="utf-8", newline="\n").write(new_raw)
        inserted += 1

    print(f"\nDONE: inserted {inserted} | already-had {skipped} | missing {missing}")


if __name__ == "__main__":
    main()
