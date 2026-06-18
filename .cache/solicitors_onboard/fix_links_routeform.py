"""Re-canonicalise internal /blog links to the SOLICITORS ROUTE form.

The shared slug_resolver slugifies categories with '&'->'and'; the solicitors
route (Solicitors/web/src/lib/blog.ts) uses '&'->''. So the resolver produced
broken '-and-' category links. This rebuilds the slug->category map using the
route's EXACT slugify and rewrites links via the engine's own normalise_links
(reused unchanged), so every internal /blog link matches what the route serves.

Usage: python fix_links_routeform.py [apply] <file.md> [...]   (no files = whole corpus, dry unless 'apply')
"""
import re
import sys
import pathlib

ROOT = pathlib.Path(r"C:\Users\user\Documents\Accounting")
sys.path.insert(0, str(ROOT))
from optimisation_engine.blog_generator.slug_resolver import normalise_links, load_redirects

BLOG = ROOT / "Solicitors" / "web" / "content" / "blog"
MW = ROOT / "Solicitors" / "web" / "src" / "middleware.ts"


def route_slugify(category: str) -> str:
    """Exact mirror of Solicitors/web/src/lib/blog.ts slugifyCategory."""
    c = category.lower()
    c = c.replace("&", "")
    c = re.sub(r"\s+", "-", c)
    c = re.sub(r"[^a-z0-9-]", "", c)
    c = re.sub(r"-+", "-", c)
    return c.strip("-")


def build_route_slug_map():
    mapping = {}
    for f in sorted(BLOG.glob("*.md")):
        head = f.read_text(encoding="utf-8").split("---", 2)
        if len(head) < 3:
            continue
        fm = head[1]
        sm = re.search(r'(?m)^slug:\s*["\']?([^"\'\n]+?)["\']?\s*$', fm)
        cm = re.search(r'(?m)^category:\s*["\']?([^"\'\n]+?)["\']?\s*$', fm)
        if sm and cm:
            mapping[sm.group(1).strip()] = route_slugify(cm.group(1).strip())
    return mapping


apply = len(sys.argv) > 1 and sys.argv[1] == "apply"
args = sys.argv[2:] if apply else sys.argv[1:]
files = [a for a in args if a.endswith(".md")] or [str(p) for p in sorted(BLOG.glob("*.md"))]

slug_map = build_route_slug_map()
valid_categories = set(slug_map.values())
slug_to_cat, dup = load_redirects(MW)

changed = 0
unresolved_all = []
for path in files:
    p = pathlib.Path(path)
    txt = p.read_text(encoding="utf-8")
    new, unresolved = normalise_links(txt, slug_map, valid_categories=valid_categories,
                                      slug_to_cat=slug_to_cat, dup=dup)
    if new != txt:
        changed += 1
        if apply:
            p.write_text(new, encoding="utf-8")
    for u in unresolved:
        unresolved_all.append((p.stem, u))

print(f"route-form canonicalise: {'applied' if apply else 'DRY'} {changed}/{len(files)} file(s) changed; "
      f"{len(unresolved_all)} unresolved")
for stem, u in unresolved_all[:30]:
    print(f"  UNRESOLVED: [{stem}] {u}")
print(f"valid route categories: {sorted(valid_categories)}")
