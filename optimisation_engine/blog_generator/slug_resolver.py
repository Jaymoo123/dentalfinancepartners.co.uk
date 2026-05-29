#!/usr/bin/env python3
"""Single source of truth: an internal-blog-link slug -> its canonical
`/blog/<category>/<slug>` URL.

Why this exists (Track 2 WS-D root-cause fix)
---------------------------------------------
An internal link has two parts:
  * WHICH page to cite (the slug)  -> a semantic choice; the model's job.
  * WHERE that page lives (the /blog/<category>/ prefix) -> NOT a choice. The
    route emits exactly one (category, slug) pair per file (dynamicParams =
    false), so a slug maps to exactly ONE category. Choosing it is a lookup.

The pipeline used to let the model write the whole URL, so it GUESSED the
category and ~229 links 404'd. This module mechanises only the lookup: given
the slug the model already chose, it builds the canonical URL. The slug (the
semantic payload) is never changed, so meaning cannot be lost.

Invented slugs (a page that does not exist, and is not even a redirect source)
are the one case a lookup cannot resolve - so this module NEVER guesses them.
It leaves them unchanged and returns them as `unresolved` for a caller to flag
(the pre-deploy gate blocks on them; an LLM-repair pass or a human re-points).

The slugify rule and the redirect maps MUST stay identical to:
  * Property/web/src/lib/blog.ts        -> slugifyCategory()
  * Property/web/src/middleware.ts      -> SLUG_TO_CATEGORY_MAP / DUPLICATE_REDIRECTS
  * scripts/track2_link_audit.py        -> slugify_category() + extract_map_keys()
or the "canonical" URLs this builds would themselves 404. `selftest()` asserts
the resolver agrees with the live corpus (0 invented slugs).
"""
from __future__ import annotations

import re
import pathlib


def slugify_category(category: str) -> str:
    """Mirror of lib/blog.ts slugifyCategory (and track2_link_audit)."""
    c = category.lower()
    c = re.sub(r"[()]", "", c)
    c = c.replace("&", "and")
    c = re.sub(r"\s+", "-", c)
    c = re.sub(r"-{2,}", "-", c)
    return c.strip()


def build_slug_map(blog_dir) -> dict[str, str]:
    """{slug: slugified-category} from the frontmatter of every .md in blog_dir.

    This is the route's source of truth: only these (category, slug) pairs render.
    """
    blog_dir = pathlib.Path(blog_dir)
    mapping: dict[str, str] = {}
    for f in sorted(blog_dir.glob("*.md")):
        head = f.read_text(encoding="utf-8").split("---", 2)
        if len(head) < 3:
            continue
        fm = head[1]
        sm = re.search(r'(?m)^slug:\s*["\']?([^"\'\n]+?)["\']?\s*$', fm)
        cm = re.search(r'(?m)^category:\s*["\']?([^"\'\n]+?)["\']?\s*$', fm)
        if sm and cm:
            mapping[sm.group(1).strip()] = slugify_category(cm.group(1).strip())
    return mapping


def load_redirects(middleware_path):
    """Parse SLUG_TO_CATEGORY_MAP and DUPLICATE_REDIRECTS from a site's
    middleware.ts (the same maps the live route honours). Returns
    (slug_to_cat, dup). Either is {} if the file/map is absent."""
    p = pathlib.Path(middleware_path)
    if not p.exists():
        return {}, {}
    mw = p.read_text(encoding="utf-8")

    def _map(name):
        m = re.search(r"const " + name + r":[^=]*=\s*\{(.*?)\n\};", mw, re.S)
        if not m:
            return {}
        return dict(re.findall(r'"([^"]+)"\s*:\s*"([^"]+)"', m.group(1)))

    return _map("SLUG_TO_CATEGORY_MAP"), _map("DUPLICATE_REDIRECTS")


def canonical_url(slug: str, slug_map: dict[str, str]) -> str | None:
    """Canonical /blog/<cat>/<slug> for a real-page slug, or None if unknown.
    Never guesses a category."""
    cat = slug_map.get(slug)
    return f"/blog/{cat}/{slug}" if cat else None


# Matches the href of an internal blog link only. Leaves external URLs, bare
# anchors (#...), and non-/blog absolute paths (/calculators, /locations) alone.
_HREF = re.compile(r'(href=["\'])(/blog/[^"\'#?]+)([^"\']*)(["\'])')


def _resolve(path, slug_map, valid_categories, slug_to_cat, dup):
    """Resolve an internal /blog path to its canonical destination.

    Returns a replacement path (str), None to leave the link untouched (already
    correct, or a category index), or the sentinel "" for an invented slug that
    cannot be resolved (caller flags it)."""
    parts = [p for p in path.strip("/").split("/") if p]  # ["blog", ...]
    if len(parts) == 2:
        x = parts[1]
        if x in valid_categories:
            return None                         # category index - leave
        if x in slug_map:
            return f"/blog/{slug_map[x]}/{x}"    # flat real slug -> nested
        if x in dup:
            return dup[x]                        # redirect source -> target
        if x in slug_to_cat:
            return f"/blog/{slug_to_cat[x]}/{x}"
        return ""                                # invented
    if len(parts) >= 3:
        slug = parts[-1]
        if slug in slug_map:
            return f"/blog/{slug_map[slug]}/{slug}"   # fix category if wrong
        if slug in dup:
            return dup[slug]                          # redirect source -> target
        if slug in slug_to_cat:
            return f"/blog/{slug_to_cat[slug]}/{slug}"
        return ""                                     # invented
    return None


def normalise_links(html, slug_map, *, valid_categories=None,
                    slug_to_cat=None, dup=None):
    """Rewrite every internal /blog link to its canonical destination for the
    slug the model chose (fixing wrong categories and collapsing known 301
    hops). Preserves any #fragment / ?query.

    Returns (new_html, unresolved) where `unresolved` is the list of hrefs whose
    slug does not exist and is not a redirect source - LEFT UNCHANGED, never
    guessed."""
    if valid_categories is None:
        valid_categories = set(slug_map.values())
    slug_to_cat = slug_to_cat or {}
    dup = dup or {}
    unresolved: list[str] = []

    def _sub(m: re.Match) -> str:
        pre, path, tail, post = m.group(1), m.group(2), m.group(3), m.group(4)
        res = _resolve(path, slug_map, valid_categories, slug_to_cat, dup)
        if res is None:
            return m.group(0)
        if res == "":
            unresolved.append(path)
            return m.group(0)
        return f"{pre}{res}{tail}{post}"

    return _HREF.sub(_sub, html), unresolved


_DEFAULT_BLOG = pathlib.Path("Property/web/content/blog")
_DEFAULT_MW = pathlib.Path("Property/web/src/middleware.ts")


def selftest(blog_dir=_DEFAULT_BLOG, middleware_path=_DEFAULT_MW) -> int:
    """Agreement check against the live corpus: every internal link must resolve
    to a real destination (0 invented slugs). 'Would canonicalise' counts SOFT
    301-hop cleanups, which are improvements, not errors."""
    blog_dir = pathlib.Path(blog_dir)
    # Golden slugify parity: these MUST match lib/blog.ts slugifyCategory. If
    # this fails, the rule has drifted and "canonical" URLs will 404.
    golden = {
        "Capital Gains Tax": "capital-gains-tax",
        "Section 24 & Tax Relief": "section-24-and-tax-relief",
        "Incorporation & Company Structures": "incorporation-and-company-structures",
        "Property Types & Specialist Tax": "property-types-and-specialist-tax",
        "Non-Resident Landlord Tax": "non-resident-landlord-tax",
    }
    parity_ok = all(slugify_category(k) == v for k, v in golden.items())
    print(f"  slugify parity (golden vs lib/blog.ts): {'PASS' if parity_ok else 'FAIL'}")
    slug_map = build_slug_map(blog_dir)
    valid_categories = set(slug_map.values())
    slug_to_cat, dup = load_redirects(middleware_path)
    changed = 0
    all_unresolved: list[tuple[str, str]] = []
    for f in sorted(blog_dir.glob("*.md")):
        txt = f.read_text(encoding="utf-8")
        new, unresolved = normalise_links(
            txt, slug_map, valid_categories=valid_categories,
            slug_to_cat=slug_to_cat, dup=dup)
        if new != txt:
            changed += 1
        for u in unresolved:
            all_unresolved.append((f.stem, u))
    print(f"slug_resolver selftest on {blog_dir}")
    print(f"  slugs mapped: {len(slug_map)} | redirect sources: "
          f"{len(slug_to_cat)} flat + {len(dup)} dup")
    print(f"  files the resolver would canonicalise: {changed} "
          "(SOFT 301-hop cleanups; not errors)")
    print(f"  unresolved (invented) slugs: {len(all_unresolved)} (must be 0)")
    for s, u in all_unresolved[:20]:
        print(f"    [{s}] {u}")
    ok = parity_ok and not all_unresolved
    print("  RESULT:", "PASS" if ok else "FAIL")
    return 0 if ok else 1


if __name__ == "__main__":
    import sys
    sys.exit(selftest())
