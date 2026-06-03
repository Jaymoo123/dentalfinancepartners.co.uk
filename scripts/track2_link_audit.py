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
import json
import re
import pathlib
import sys

ROOT = pathlib.Path(".")


def _arg_site() -> str:
    """--site <key> selects which site's corpus + routes to audit (default property)."""
    if "--site" in sys.argv:
        i = sys.argv.index("--site")
        if i + 1 < len(sys.argv):
            return sys.argv[i + 1]
    return "property"


SITE = _arg_site()


def _load_site_cfg(site: str) -> dict:
    p = ROOT / "sites" / f"{site}.json"
    if p.exists():
        return json.loads(p.read_text(encoding="utf-8"))
    if site == "property":
        return {"paths": {"blogContentDir": "Property/web/content/blog",
                          "buildDir": "Property/web",
                          "siteConfigJson": "Property/niche.config.json"}}
    raise FileNotFoundError(f"Site config missing: {p}")


_CFG = _load_site_cfg(SITE)
BLOG = ROOT / _CFG["paths"]["blogContentDir"]
_MW_PATH = ROOT / _CFG["paths"]["buildDir"] / "src" / "middleware.ts"
MW = _MW_PATH.read_text(encoding="utf-8") if _MW_PATH.exists() else ""


def _valid_locations(cfg: dict) -> set:
    """Location slugs that render = the site's niche.config locations[].slug."""
    try:
        nc = json.loads((ROOT / cfg["paths"]["siteConfigJson"]).read_text(encoding="utf-8"))
        locs = {str(l.get("slug", "")).strip().lower() for l in nc.get("locations", []) if l.get("slug")}
        if locs:
            return locs
    except Exception:
        pass
    return {"london", "manchester", "birmingham", "leeds", "bristol"}


VALID_LOCATIONS = _valid_locations(_CFG)


def slugify_category(c: str) -> str:
    # Mirror the Next route's slugifyCategory (web/src/lib/blog.ts): lowercase,
    # REMOVE "&" (not -> "and"), spaces -> hyphens, strip any non-alphanumeric/
    # hyphen char (commas, parens, slashes), collapse repeats, trim. Previously
    # this did `&` -> "and", which disagreed with the route for every category
    # containing "&" (e.g. "VAT & Compliance"), giving false 404s on solicitors/
    # dentists. Now matches the route exactly.
    c = c.lower()
    c = c.replace("&", "")
    c = re.sub(r"\s+", "-", c)
    c = re.sub(r"[^a-z0-9-]", "", c)
    c = re.sub(r"-{2,}", "-", c)
    return c.strip("-")


def extract_map_keys(name: str):
    m = re.search(r"const " + name + r":[^=]*=\s*\{(.*?)\n\};", MW, re.S)
    if not m:
        return {}  # site has no such redirect map (e.g. newer site / no middleware)
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


# --fix-wrong-category: deterministically repoint WRONG-CATEGORY links to the
# target slug's real frontmatter category (proven 404->200). Dry-run unless
# --apply. NO-FILE / no-flat-slug / location-404 links are NOT auto-fixed; they
# are reported for hand-adjudication. Bounded replace (delimiter lookahead) so a
# slug that is a prefix of a longer slug is never partially rewritten.
if "--fix-wrong-category" in sys.argv:
    apply = "--apply" in sys.argv
    changed_files = 0
    total_fixes = 0
    nofile = []
    other_hard = []
    for f in sorted(BLOG.glob("*.md")):
        src = f.stem
        txt = f.read_text(encoding="utf-8")
        fixes = {}
        for m in LINK_RE.finditer(txt):
            link = m.group(1)
            verdict, detail = classify(link, src)
            if verdict != "HARD":
                continue
            if "WRONG-CATEGORY" in detail:
                p = link.split("#")[0].split("?")[0].rstrip("/")
                parts = [x for x in p.strip("/").split("/") if x]
                cat, slug = parts[1], parts[2]
                fixes[f"/blog/{cat}/{slug}"] = f"/blog/{slug_to_filecat[slug]}/{slug}"
            elif "NO-FILE" in detail or "no-flat-slug" in detail:
                nofile.append((src, link, detail))
            else:
                other_hard.append((src, link, detail))
        if fixes:
            new = txt
            file_n = 0
            for wrong, right in fixes.items():
                new, n = re.subn(re.escape(wrong) + r'(?=["\'\)\s#?/]|$)', right, new)
                file_n += n
            if file_n:
                total_fixes += file_n
                changed_files += 1
                if apply:
                    f.write_text(new, encoding="utf-8")
                else:
                    for wrong, right in fixes.items():
                        print(f"  [{src}] {wrong} -> {right}")
    print(f"\n{'APPLIED' if apply else 'DRY-RUN (pass --apply to write)'}: "
          f"{total_fixes} wrong-category link fixes across {changed_files} files")
    print(f"\nNOT auto-fixed (hand-adjudicate): {len(nofile)} no-file / no-flat-slug links")
    for src, link, detail in nofile:
        print(f"  [{src}] {link} -> {detail}")
    if other_hard:
        print(f"\nOther HARD (hand-adjudicate): {len(other_hard)}")
        for src, link, detail in other_hard:
            print(f"  [{src}] {link} -> {detail}")
    sys.exit(0)


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
