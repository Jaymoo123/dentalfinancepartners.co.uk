"""Post-write link fixer for the finance/tax expansion wave.

For each generated .md file, rewrite internal /blog/<cat>/<slug> links so the
category prefix matches the target file's REAL category (from the site slug map),
and report any href whose slug does not exist (invented -> would 404).

Reuses optimisation_engine.blog_generator.slug_resolver. Non-/blog/ links
(e.g. /fundamentals/<slug>, /for-associates) pass through untouched.

Usage:
    python fix_links.py <site> <file.md> [<file.md> ...]
    python fix_links.py property Property/web/content/blog/land-remediation-relief-guide.md
site in {property, generalist, dentists}. Paths are repo-root-relative or absolute.
"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.blog_generator.slug_resolver import (
    build_slug_map, load_redirects, normalise_links,
)

SITES = {
    "property":   ("Property/web/content/blog",   "Property/web/src/middleware.ts"),
    "generalist": ("generalist/web/content/blog", "generalist/web/src/middleware.ts"),
    "dentists":   ("Dentists/web/content/blog",   "Dentists/web/src/middleware.ts"),
}


def main():
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    site = sys.argv[1]
    if site not in SITES:
        sys.exit(f"unknown site {site!r}; pick {list(SITES)}")
    blog_dir, mw = SITES[site]
    slug_map = build_slug_map(ROOT / blog_dir)
    mw_path = ROOT / mw
    slug_to_cat, dup = load_redirects(mw_path) if mw_path.exists() else ({}, {})
    print(f"[{site}] slug_map={len(slug_map)} redirects={len(slug_to_cat)}")

    total_unresolved = 0
    for f in sys.argv[2:]:
        p = Path(f)
        if not p.is_absolute():
            p = ROOT / f
        if not p.exists():
            print(f"  MISSING FILE: {f}")
            continue
        text = p.read_text(encoding="utf-8")
        new, unresolved = normalise_links(text, slug_map, slug_to_cat=slug_to_cat, dup=dup)
        if new != text:
            p.write_text(new, encoding="utf-8")
        status = "fixed" if new != text else "clean"
        print(f"  [{status}] {p.name}")
        for u in sorted(set(unresolved)):
            print(f"      UNRESOLVED (invalid slug -> 404 risk): {u}")
        total_unresolved += len(set(unresolved))
    print(f"\nDone. {total_unresolved} unresolved href(s) across {len(sys.argv) - 2} file(s).")


if __name__ == "__main__":
    main()
