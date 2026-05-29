#!/usr/bin/env python3
"""Track 2 remediation §3: audit every internal link in the Property blog corpus
and flag links that 404.

Ground truth for what resolves:
  * Blog post URLs are /blog/<categorySlug>/<slug>. The route sets
    `dynamicParams = false` and generateStaticParams emits exactly
    {category: slugifyCategory(frontmatter.category), slug: frontmatter.slug}
    for every .md. So a (category, slug) pair renders (200) ONLY if it is that
    exact pair. A correct slug under the WRONG category 404s.
  * BEFORE the page, middleware.ts redirects (301): a flat /blog/<slug> or a
    nested /blog/<cat>/<slug> whose <slug> is a key in DUPLICATE_REDIRECTS, and a
    flat /blog/<slug> whose <slug> is in SLUG_TO_CATEGORY_MAP (-> nested).
  * Category index pages /blog/<categorySlug> exist for every category slug.
  * /locations/<city> renders for cities in the niche config; the 4 in
    LOCATION_TO_BLOG additionally 301 to their blog page.

HARD = 404 (no file, or wrong category, or unknown flat slug, or unknown city).
SOFT = resolves via a 301 hop (works, but a direct link is cleaner; a 301 that
       points back to the SAME page is a self-loop worth removing).
"""
import re
import pathlib
import sys

ROOT = pathlib.Path(".")
BLOG = ROOT / "Property/web/content/blog"
MW = (ROOT / "Property/web/src/middleware.ts").read_text(encoding="utf-8")

VALID_LOCATIONS = {"london", "manchester", "birmingham", "leeds", "bristol"}


def slugify_category(c: str) -> str:
    c = c.lower()
    c = re.sub(r"[()]", "", c)
    c = c.replace("&", "and")
    c = re.sub(r"\s+", "-", c)
    c = re.sub(r"-{2,}", "-", c)
    return c.strip()


def extract_map_keys(name: str):
    m = re.search(r"const " + name + r":[^=]*=\s*\{(.*?)\n\};", MW, re.S)
    body = m.group(1)
    return dict(re.findall(r'"([^"]+)"\s*:\s*"([^"]+)"', body))


SLUG_TO_CAT = extract_map_keys("SLUG_TO_CATEGORY_MAP")
DUP = extract_map_keys("DUPLICATE_REDIRECTS")

# Build valid post pairs from frontmatter (the route's source of truth).
valid_pairs = set()
valid_slugs = set()
valid_categories = set()
slug_to_filecat = {}
for f in BLOG.glob("*.md"):
    txt = f.read_text(encoding="utf-8")
    fm = txt.split("---", 2)
    if len(fm) < 3:
        continue
    head = fm[1]
    sm = re.search(r'(?m)^slug:\s*["\']?([^"\'\n]+?)["\']?\s*$', head)
    cm = re.search(r'(?m)^category:\s*["\']?([^"\'\n]+?)["\']?\s*$', head)
    if not sm or not cm:
        continue
    slug = sm.group(1).strip()
    cat = slugify_category(cm.group(1).strip())
    valid_pairs.add((cat, slug))
    valid_slugs.add(slug)
    valid_categories.add(cat)
    slug_to_filecat[slug] = cat


def classify(path: str, source_slug: str):
    p = path.split("#")[0].split("?")[0].rstrip("/")
    parts = [x for x in p.strip("/").split("/") if x]
    if not parts:
        return ("ok", "root")
    if parts[0] == "locations" and len(parts) == 2:
        city = parts[1]
        if city in VALID_LOCATIONS:
            return ("ok", "location")
        return ("HARD", f"location-404 (/locations/{city})")
    if parts[0] == "blog":
        if len(parts) == 1:
            return ("ok", "blog-index")
        if len(parts) == 2:
            x = parts[1]
            if x in valid_categories:
                return ("ok", "category-index")
            if x in DUP or x in SLUG_TO_CAT:
                return ("SOFT", f"flat-301 (/blog/{x})")
            return ("HARD", f"no-flat-slug (/blog/{x})")
        if len(parts) == 3:
            cat, slug = parts[1], parts[2]
            if slug in DUP:
                tgt = DUP[slug]
                if tgt.rstrip("/").endswith("/" + source_slug):
                    return ("SOFT", f"SELF-LOOP-301 -> {tgt} (slug {slug})")
                return ("SOFT", f"301-hop -> {tgt} (slug {slug})")
            if (cat, slug) in valid_pairs:
                return ("ok", "post")
            if slug in valid_slugs:
                return ("HARD", f"WRONG-CATEGORY (/{cat}/{slug}); file cat={slug_to_filecat[slug]}")
            return ("HARD", f"NO-FILE (/blog/{cat}/{slug})")
    return ("other", path)


LINK_RE = re.compile(r'(?:href=["\']|\]\()(/[^"\')\s#?][^"\')\s]*)')

hard = []
soft = []
for f in sorted(BLOG.glob("*.md")):
    src = f.stem
    txt = f.read_text(encoding="utf-8")
    seen = set()
    for m in LINK_RE.finditer(txt):
        link = m.group(1)
        if link in seen:
            continue
        seen.add(link)
        verdict, detail = classify(link, src)
        if verdict == "HARD":
            hard.append((src, link, detail))
        elif verdict == "SOFT":
            soft.append((src, link, detail))

print("=" * 70)
print(f"HARD 404 ISSUES: {len(hard)}")
print("=" * 70)
for src, link, detail in hard:
    print(f"  [{src}]\n     {link}\n     -> {detail}")
print()
print("=" * 70)
print(f"SOFT (301-hop / self-loop) ISSUES: {len(soft)}")
print("=" * 70)
selfloops = [s for s in soft if "SELF-LOOP" in s[2]]
print(f"  self-loops: {len(selfloops)}")
for src, link, detail in selfloops:
    print(f"  [{src}] {link} -> {detail}")
# also show non-selfloop 301 hops grouped count
hops = [s for s in soft if "SELF-LOOP" not in s[2]]
print(f"  other 301-hops: {len(hops)} (links pointing at a redirect source)")
