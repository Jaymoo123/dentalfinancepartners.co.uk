#!/usr/bin/env python3
"""Flat-routing internal-link auditor (Medical, and any FLAT-routed niche site).

The shared scripts/track2_link_audit.py is the authoritative auditor for the
NESTED blog routing used by Property / Dentists / Solicitors, where a post lives
at /blog/<categorySlug>/<slug> (route sets dynamicParams=false on a
[category]/[slug] pair). The MEDICAL site uses a different, FLAT routing:

  * a blog POST renders at /blog/<slug>      (app/blog/[slug]/page.tsx)
  * a category INDEX renders at /blog/<categorySlug>   (static app/blog/<cat>/page.tsx)
  * there is NO /blog/<category>/<slug> post route, so a 3-part /blog link 404s.

Run on the nested auditor, every correct flat post link (/blog/<slug>) is
mis-reported as a HARD "no-flat-slug" 404. This companion auditor models the
flat routing so the 0-HARD-404 floor is meaningful for a flat-routed site. It is
ADDITIVE (a new file); it does not change the shared nested auditor or any other
site's behaviour.

Ground truth for what resolves (FLAT routing):
  * /blog                      -> blog index            (ok)
  * /blog/<x>  where <x>.md exists in content/blog       -> post     (ok)
  * /blog/<x>  where <x> is a category slug (from a post's category
               or an app/blog/<x>/page.tsx route)        -> category (ok)
  * /blog/<x>  otherwise                                  -> HARD (no such post or category)
  * /blog/<a>/<b> (3 parts)                               -> HARD (no nested post route)
  * /locations/<city> for a city in niche.config locations -> ok, else HARD
  * /<seg> where app/<seg> is a route (has page.tsx) or a known static page -> ok, else HARD
  * external (http...), mailto:, tel:, # anchors          -> skipped

HARD = a 404 (no file / no route). Exit code is always 0 (report-only); parse
"HARD 404 ISSUES: N" the same way predeploy-style callers do. Use --new
<slug,slug,...> to print only the HARD issues whose SOURCE file is one of the
named new pages (so a wave can prove it adds 0 NEW hard 404s on top of any
pre-existing corpus danglers).

Usage:
  python scripts/medical_flat_link_audit.py --site medical
  python scripts/medical_flat_link_audit.py --site medical --new slug-a,slug-b
"""
from __future__ import annotations

import json
import re
import sys
import pathlib

ROOT = pathlib.Path(".")


def _arg(name: str, default=None):
    if name in sys.argv:
        i = sys.argv.index(name)
        if i + 1 < len(sys.argv):
            return sys.argv[i + 1]
    return default


SITE = _arg("--site", "medical")
NEW = {s.strip() for s in (_arg("--new", "") or "").split(",") if s.strip()}


def _cfg(site: str) -> dict:
    p = ROOT / "sites" / f"{site}.json"
    if not p.exists():
        raise FileNotFoundError(f"Site config missing: {p}")
    return json.loads(p.read_text(encoding="utf-8"))


CFG = _cfg(SITE)
BLOG = ROOT / CFG["paths"]["blogContentDir"]
APP = ROOT / CFG["paths"]["buildDir"] / "src" / "app"
NICHE = ROOT / CFG["paths"]["siteConfigJson"]


def slugify_category(c: str) -> str:
    c = c.lower()
    c = re.sub(r"[()]", "", c)
    c = c.replace("&", "and")
    c = re.sub(r"\s+", "-", c)
    c = re.sub(r"-{2,}", "-", c)
    return c.strip()


# Valid blog post slugs (one .md == one /blog/<slug>).
valid_slugs: set[str] = {p.stem for p in BLOG.glob("*.md")}

# Valid category slugs: from each post's frontmatter category AND from the
# static app/blog/<cat>/page.tsx index routes.
valid_categories: set[str] = set()
for f in BLOG.glob("*.md"):
    txt = f.read_text(encoding="utf-8")
    m = re.search(r'(?m)^category:\s*["\']?([^"\'\n]+?)["\']?\s*$', txt)
    if m:
        valid_categories.add(slugify_category(m.group(1).strip()))
blog_routes_dir = APP / "blog"
if blog_routes_dir.exists():
    for d in blog_routes_dir.iterdir():
        if d.is_dir() and not d.name.startswith("[") and (d / "page.tsx").exists():
            valid_categories.add(d.name)

# Valid top-level routes: every app/<seg> dir that has a page.tsx (route group
# and dynamic dirs excluded), plus the implicit root.
valid_top_routes: set[str] = set()
if APP.exists():
    for d in APP.iterdir():
        if d.is_dir() and not d.name.startswith(("[", "(")) and (d / "page.tsx").exists():
            valid_top_routes.add(d.name)

# Valid location slugs from the niche config.
valid_locations: set[str] = set()
try:
    nc = json.loads(NICHE.read_text(encoding="utf-8"))
    valid_locations = {
        str(l.get("slug", "")).strip().lower()
        for l in nc.get("locations", []) if l.get("slug")
    }
except Exception:
    pass


def classify(path: str):
    p = path.split("#")[0].split("?")[0].rstrip("/")
    parts = [x for x in p.strip("/").split("/") if x]
    if not parts:
        return ("ok", "root")
    if parts[0] == "blog":
        if len(parts) == 1:
            return ("ok", "blog-index")
        if len(parts) == 2:
            x = parts[1]
            if x in valid_slugs:
                return ("ok", "post")
            if x in valid_categories:
                return ("ok", "category-index")
            return ("HARD", f"no-post-or-category (/blog/{x})")
        return ("HARD", f"nested-not-routed (/blog/{'/'.join(parts[1:])})")
    if parts[0] == "locations" and len(parts) == 2:
        return ("ok", "location") if parts[1].lower() in valid_locations \
            else ("HARD", f"location-404 (/locations/{parts[1]})")
    seg = parts[0]
    if seg in valid_top_routes:
        return ("ok", f"route (/{seg})")
    return ("HARD", f"no-route (/{seg})")


LINK_RE = re.compile(r'(?:href=["\']|\]\()(/[^"\')\s#?][^"\')\s]*)')

hard: list[tuple[str, str, str]] = []
for f in sorted(BLOG.glob("*.md")):
    src = f.stem
    txt = f.read_text(encoding="utf-8")
    seen: set[str] = set()
    for m in LINK_RE.finditer(txt):
        link = m.group(1)
        if link in seen:
            continue
        seen.add(link)
        verdict, detail = classify(link)
        if verdict == "HARD":
            hard.append((src, link, detail))

if NEW:
    new_hard = [h for h in hard if h[0] in NEW]
    pre_hard = [h for h in hard if h[0] not in NEW]
    print("=" * 70)
    print(f"HARD 404 ISSUES (NEW pages only): {len(new_hard)}")
    print("=" * 70)
    for src, link, detail in new_hard:
        print(f"  [{src}]\n     {link}\n     -> {detail}")
    print()
    print(f"(pre-existing corpus HARD issues, not from the new pages: {len(pre_hard)})")
else:
    print("=" * 70)
    print(f"HARD 404 ISSUES: {len(hard)}")
    print("=" * 70)
    for src, link, detail in hard:
        print(f"  [{src}]\n     {link}\n     -> {detail}")

print()
print(f"[flat-link-audit] site={SITE} posts={len(valid_slugs)} "
      f"categories={len(valid_categories)} top-routes={len(valid_top_routes)} "
      f"locations={len(valid_locations)}")
sys.exit(0)
