"""Ground-truth internal-link check for new Solicitors pages.

Production truth = the set of prerendered (categorySlug, slug) pairs under
Solicitors/web/.next/server/app/blog/<cat>/<slug>.html (built with
dynamicParams=false, so this IS exactly what resolves). Bypasses the
track2_link_audit.py slugify bug (& -> 'and' vs the route's & -> '').

Usage: python .cache/sol_linkcheck.py <slug> [<slug> ...]
Reports each /blog/<cat>/<slug> link in the given page files as OK / WRONG-CAT
(with the correct category) / NO-FILE.
"""
import re, sys, pathlib

ROOT = pathlib.Path(r"C:\Users\user\Documents\Accounting\Solicitors\web")
NEXT_BLOG = ROOT / ".next/server/app/blog"
CONTENT = ROOT / "content/blog"

# Build production truth: slug -> set(categorySlug) and the valid pair set.
slug_to_cats = {}
valid_pairs = set()
valid_cats = set()
for html in NEXT_BLOG.glob("*/*.html"):
    cat = html.parent.name
    slug = html.stem
    if cat == "[category]":
        continue
    valid_cats.add(cat)
    valid_pairs.add((cat, slug))
    slug_to_cats.setdefault(slug, set()).add(cat)

LINK_RE = re.compile(r'href="(/blog/[^"#?]+)"')

bad_total = 0
for arg in sys.argv[1:]:
    f = CONTENT / f"{arg}.md"
    txt = f.read_text(encoding="utf-8")
    print(f"\n=== {arg} ===")
    seen = set()
    for m in LINK_RE.finditer(txt):
        link = m.group(1).rstrip("/")
        if link in seen:
            continue
        seen.add(link)
        parts = [p for p in link.strip("/").split("/") if p]
        if len(parts) == 2:  # /blog/<cat>  (category index)
            cat = parts[1]
            status = "OK(cat-index)" if cat in valid_cats else "BAD(cat-index)"
            print(f"  {status:16} {link}")
            if "BAD" in status:
                bad_total += 1
            continue
        if len(parts) != 3:
            print(f"  SKIP(shape)      {link}")
            continue
        cat, slug = parts[1], parts[2]
        if (cat, slug) in valid_pairs:
            print(f"  OK               {link}")
        elif slug in slug_to_cats:
            print(f"  WRONG-CAT -> {sorted(slug_to_cats[slug])}  {link}")
            bad_total += 1
        else:
            print(f"  NO-FILE          {link}")
            bad_total += 1

print(f"\nTOTAL bad links in given pages: {bad_total}")
