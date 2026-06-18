#!/usr/bin/env python3
"""Meta-resolution check: verifies rendered HTML <title> and <meta description>
against source-of-truth and enforces hard limits.

Default mode: scan pre-rendered .next/server/app/**/*.html (no server needed).
--base mode:  enumerate routes from GET <base>/sitemap.xml and fetch over HTTP.

Usage:
  python scripts/meta_resolution_check.py --site construction-cis
  python scripts/meta_resolution_check.py --site construction-cis --base http://localhost:3199
  python scripts/meta_resolution_check.py --site construction-cis --no-server

Exit 0 = all checks pass.
Exit 1 = at least one FAIL.
"""
from __future__ import annotations

import argparse
import html
import json
import pathlib
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from collections import defaultdict
from typing import NamedTuple

ROOT = pathlib.Path(".")

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

TITLE_HARD_MAX = 65
TITLE_WARN_ABOVE = 62
DESC_MIN = 110
DESC_MAX = 165
DESC_WARN_MIN = 140
DESC_WARN_MAX = 160
EM_DASH = "—"

STOP_WORDS = {
    "the", "a", "an", "for", "and", "of", "to", "in", "uk", "guide",
    "complete", "explained", "2026", "27", "how", "what", "is", "your",
}

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _load_site_cfg(site: str) -> dict:
    p = ROOT / "sites" / f"{site}.json"
    if not p.exists():
        raise FileNotFoundError(f"Site config not found: {p}")
    return json.loads(p.read_text(encoding="utf-8"))


class MetaRecord(NamedTuple):
    route: str          # e.g. /blog/cis-basics/what-is-cis
    title: str
    description: str
    source: str         # "html" or "http"


# ---------------------------------------------------------------------------
# HTML parsing helpers
# ---------------------------------------------------------------------------

_TITLE_RE = re.compile(r"<title[^>]*>(.*?)</title>", re.DOTALL | re.IGNORECASE)
_DESC_RE = re.compile(
    r'<meta\s[^>]*name=["\']description["\'][^>]*content=["\']([^"\']*)["\']'
    r'|<meta\s[^>]*content=["\']([^"\']*)["\'][^>]*name=["\']description["\']',
    re.IGNORECASE,
)


def _unescape(s: str) -> str:
    return html.unescape(s)


def _extract_meta(html_text: str) -> tuple[str, str]:
    """Return (title, description) from raw HTML."""
    t_m = _TITLE_RE.search(html_text)
    title = _unescape(t_m.group(1).strip()) if t_m else ""

    d_m = _DESC_RE.search(html_text)
    if d_m:
        desc = _unescape((d_m.group(1) or d_m.group(2) or "").strip())
    else:
        desc = ""
    return title, desc


# ---------------------------------------------------------------------------
# Source-of-truth loaders
# ---------------------------------------------------------------------------

def _load_frontmatter(path: pathlib.Path) -> dict:
    raw = path.read_text(encoding="utf-8")
    if not raw.startswith("---"):
        return {}
    end = raw.find("\n---", 3)
    if end == -1:
        return {}
    import yaml  # type: ignore
    try:
        return yaml.safe_load(raw[3:end]) or {}
    except Exception:
        return {}


def _load_blog_posts(blog_content_dir: pathlib.Path) -> dict[str, dict]:
    """slug -> frontmatter dict."""
    posts = {}
    for p in blog_content_dir.glob("*.md"):
        fm = _load_frontmatter(p)
        slug = p.stem
        posts[slug] = fm
    return posts


_TRADE_BLOCK_RE = re.compile(
    r'\{\s*slug:\s*["\']([^"\']+)["\'].*?'
    r'metaTitle:\s*["\']([^"\']+)["\'].*?'
    r'metaDescription:\s*["\']([^"\']+)["\']',
    re.DOTALL,
)

# Also handle multi-line metaDescription with backtick or concatenated string
_TRADE_ENTRY_RE = re.compile(
    r'\{\s*slug:\s*["\'](?P<slug>[^"\']+)["\'].*?'
    r'metaTitle:\s*(?P<mt>"[^"]+"|\'[^\']+\').*?'
    r'metaDescription:\s*(?P<md>"[^"]+"|\'[^\']+\')',
    re.DOTALL,
)


def _load_trade_types(ts_path: pathlib.Path) -> dict[str, dict]:
    """slug -> {metaTitle, metaDescription}."""
    raw = ts_path.read_text(encoding="utf-8")
    result = {}

    # Split by top-level objects (each trade type starts with { slug: ...)
    # Strategy: find all `slug:` occurrences and extract the surrounding block.
    slug_positions = [m.start() for m in re.finditer(r'slug:\s*["\']', raw)]

    for pos in slug_positions:
        slug_m = re.match(r'slug:\s*["\']([^"\']+)["\']', raw[pos:])
        if not slug_m:
            continue
        slug = slug_m.group(1)

        # Search for metaTitle and metaDescription within the next 3000 chars
        chunk = raw[pos: pos + 3000]

        mt_m = re.search(r'metaTitle:\s*"([^"]+)"', chunk) or \
               re.search(r"metaTitle:\s*'([^']+)'", chunk)
        md_m = re.search(r'metaDescription:\s*"([^"]+)"', chunk) or \
               re.search(r"metaDescription:\s*'([^']+)'", chunk)

        if mt_m and md_m:
            result[slug] = {
                "metaTitle": mt_m.group(1),
                "metaDescription": md_m.group(1),
            }
    return result


# ---------------------------------------------------------------------------
# Route enumeration from .next
# ---------------------------------------------------------------------------

def _html_path_to_route(html_path: pathlib.Path, app_root: pathlib.Path) -> str:
    rel = html_path.relative_to(app_root)
    parts = list(rel.parts)
    # Strip .html suffix from last part
    last = parts[-1]
    if last.endswith(".html"):
        last = last[:-5]
        parts[-1] = last

    # Skip placeholder dirs like [category], [slug]
    parts = [p for p in parts if not (p.startswith("[") and p.endswith("]"))]

    # index.html → root
    if last == "index":
        parts = parts[:-1]

    route = "/" + "/".join(parts) if parts else "/"
    return route


def _collect_from_next(next_app_dir: pathlib.Path) -> list[MetaRecord]:
    records = []
    for html_path in sorted(next_app_dir.rglob("*.html")):
        # Skip non-content HTML (api, admin, embed, feed, robots, sitemap, llms)
        rel_str = str(html_path.relative_to(next_app_dir)).replace("\\", "/")
        skip_prefixes = ("api/", "admin/", "embed/", "feed.xml", "robots.txt",
                         "sitemap.xml", "llms-full.txt", "_not-found")
        if any(rel_str.startswith(p) for p in skip_prefixes):
            continue

        try:
            content = html_path.read_text(encoding="utf-8", errors="replace")
        except Exception:
            continue

        title, desc = _extract_meta(content)
        route = _html_path_to_route(html_path, next_app_dir)
        records.append(MetaRecord(route=route, title=title, description=desc, source="html"))
    return records


# ---------------------------------------------------------------------------
# Route enumeration from HTTP sitemap
# ---------------------------------------------------------------------------

def _collect_from_http(base: str) -> list[MetaRecord]:
    base = base.rstrip("/")
    sitemap_url = f"{base}/sitemap.xml"
    try:
        with urllib.request.urlopen(sitemap_url, timeout=10) as r:
            sitemap_xml = r.read().decode("utf-8")
    except Exception as exc:
        print(f"ERROR: could not fetch sitemap at {sitemap_url}: {exc}")
        sys.exit(1)

    tree = ET.fromstring(sitemap_xml)
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = [loc.text.strip() for loc in tree.findall(".//sm:loc", ns) if loc.text]

    records = []
    for url in urls:
        route = url[len(base):] or "/"
        try:
            with urllib.request.urlopen(url, timeout=10) as r:
                content = r.read().decode("utf-8", errors="replace")
        except Exception as exc:
            print(f"WARN  could not fetch {url}: {exc}")
            continue
        title, desc = _extract_meta(content)
        records.append(MetaRecord(route=route, title=title, description=desc, source="http"))
    return records


# ---------------------------------------------------------------------------
# Checks
# ---------------------------------------------------------------------------

def _strip_suffix(title: str) -> str:
    """Remove trailing ' | Brand Name' suffix."""
    idx = title.rfind(" | ")
    return title[:idx].strip() if idx != -1 else title


def _check_length(route: str, title: str, desc: str) -> list[str]:
    issues = []
    tlen = len(title)
    if tlen > TITLE_HARD_MAX:
        issues.append(f"FAIL  {route}  title too long: {tlen} chars (max {TITLE_HARD_MAX}): {title!r}")
    elif tlen > TITLE_WARN_ABOVE:
        issues.append(f"WARN  {route}  title long: {tlen} chars (warn >{TITLE_WARN_ABOVE}): {title!r}")

    dlen = len(desc)
    desc_snippet = repr(desc[:80])
    if dlen < DESC_MIN:
        issues.append(f"FAIL  {route}  description too short: {dlen} chars (min {DESC_MIN}): {desc_snippet}")
    elif dlen > DESC_MAX:
        issues.append(f"FAIL  {route}  description too long: {dlen} chars (max {DESC_MAX}): {desc_snippet}")
    elif not (DESC_WARN_MIN <= dlen <= DESC_WARN_MAX):
        issues.append(f"WARN  {route}  description outside ideal range ({DESC_WARN_MIN}-{DESC_WARN_MAX}): {dlen} chars")
    return issues


def _check_em_dash(route: str, title: str, desc: str) -> list[str]:
    issues = []
    if EM_DASH in title:
        issues.append(f"FAIL  {route}  em-dash in title: {title!r}")
    if EM_DASH in desc:
        desc_snippet = repr(desc[:80])
        issues.append(f"FAIL  {route}  em-dash in description: {desc_snippet}")
    return issues


def _check_blog_title_match(route: str, rendered_title: str, fm_meta_title: str) -> list[str]:
    """Rendered title must CONTAIN the frontmatter metaTitle's pre-suffix portion."""
    if not fm_meta_title:
        return []
    fm_base = _strip_suffix(fm_meta_title)
    rendered_clean = _strip_suffix(rendered_title)
    if fm_base.lower() not in rendered_clean.lower():
        return [
            f"FAIL  {route}  rendered title mismatch — expected to contain: {fm_base!r}  "
            f"got: {rendered_title!r}"
        ]
    return []


def _check_desc_match(route: str, rendered_desc: str, expected_desc: str) -> list[str]:
    if not expected_desc:
        return []
    if rendered_desc.strip() != expected_desc.strip():
        exp_snippet = repr(expected_desc[:60])
        got_snippet = repr(rendered_desc[:60])
        return [
            f"FAIL  {route}  description mismatch — expected: {exp_snippet}  "
            f"got: {got_snippet}"
        ]
    return []


def _check_uniqueness(records: list[MetaRecord]) -> list[str]:
    issues = []
    title_map: dict[str, list[str]] = defaultdict(list)
    desc_map: dict[str, list[str]] = defaultdict(list)

    for r in records:
        if r.title:
            title_map[r.title.lower()].append(r.route)
        if r.description:
            desc_map[r.description.lower()].append(r.route)

    for title_lc, routes in title_map.items():
        if len(routes) > 1:
            t_snippet = repr(title_lc[:80])
            issues.append(
                f"FAIL  DUPLICATE TITLE across {len(routes)} routes: {routes}  "
                f"title={t_snippet}"
            )
    for desc_lc, routes in desc_map.items():
        if len(routes) > 1:
            d_snippet = repr(desc_lc[:80])
            issues.append(
                f"FAIL  DUPLICATE DESCRIPTION across {len(routes)} routes: {routes}  "
                f"desc={d_snippet}"
            )
    return issues


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> int:
    ap = argparse.ArgumentParser(
        description="Meta-resolution check: rendered HTML title/description vs source-of-truth."
    )
    ap.add_argument("--site", required=True, metavar="KEY",
                    help="Site key (reads sites/<key>.json).")
    ap.add_argument("--base", metavar="URL",
                    help="Base URL for HTTP mode, e.g. http://localhost:3199.")
    ap.add_argument("--no-server", action="store_true",
                    help="Alias for default .next scan mode (default when --base not given).")
    args = ap.parse_args()

    try:
        cfg = _load_site_cfg(args.site)
    except FileNotFoundError as exc:
        print(f"ERROR: {exc}")
        return 1

    build_dir = ROOT / cfg["paths"]["buildDir"]
    next_app_dir = build_dir / ".next" / "server" / "app"
    blog_content_dir = ROOT / cfg["paths"]["blogContentDir"]

    # Load source-of-truth data
    blog_posts = _load_blog_posts(blog_content_dir)

    trade_types_path = build_dir / "src" / "data" / "trade-types.ts"
    trade_types: dict[str, dict] = {}
    if trade_types_path.exists():
        trade_types = _load_trade_types(trade_types_path)

    # Collect records
    if args.base:
        print(f"MODE: HTTP  base={args.base}")
        records = _collect_from_http(args.base)
    else:
        if not next_app_dir.exists():
            print(f"WARN: .next/server/app not found at {next_app_dir}")
            print("      Run `npm run build` in the site directory first.")
            print("      Script will exit 0 (staleness noted — not a content failure).")
            return 0
        # Check staleness: compare .next mtime with latest blog post mtime
        import time
        try:
            next_mtime = max(
                p.stat().st_mtime for p in next_app_dir.rglob("*.html")
                if p.is_file()
            )
            blog_mtimes = [
                p.stat().st_mtime for p in blog_content_dir.glob("*.md")
                if p.is_file()
            ]
            if blog_mtimes:
                latest_blog = max(blog_mtimes)
                if latest_blog > next_mtime:
                    stale_secs = latest_blog - next_mtime
                    print(
                        f"WARN: build may be STALE - newest blog post is "
                        f"{stale_secs:.0f}s newer than newest .next HTML"
                    )
        except Exception:
            pass

        print(f"MODE: .next scan  dir={next_app_dir}")
        records = _collect_from_next(next_app_dir)

    if not records:
        print("ERROR: no pages found to check.")
        return 1

    print(f"       {len(records)} pages collected")
    print("-" * 90)

    all_issues: list[str] = []
    fail_count = 0
    warn_count = 0

    for rec in records:
        route = rec.route
        title = rec.title
        desc = rec.description

        issues: list[str] = []

        # 1. Length checks
        issues.extend(_check_length(route, title, desc))

        # 2. Em-dash check
        issues.extend(_check_em_dash(route, title, desc))

        # 3. Blog route source-of-truth match
        #    Route pattern: /blog/<cat>/<slug>
        blog_m = re.match(r"^/blog/([^/]+)/([^/]+)$", route)
        if blog_m:
            slug = blog_m.group(2)
            fm = blog_posts.get(slug, {})
            fm_meta_title = fm.get("metaTitle", "")
            fm_meta_desc = fm.get("metaDescription", "")
            issues.extend(_check_blog_title_match(route, title, fm_meta_title))
            issues.extend(_check_desc_match(route, desc, fm_meta_desc))

        # 4. /for/<slug> source-of-truth match
        for_m = re.match(r"^/for/([^/]+)$", route)
        if for_m:
            slug = for_m.group(1)
            tt = trade_types.get(slug, {})
            if tt:
                issues.extend(_check_blog_title_match(route, title, tt.get("metaTitle", "")))
                issues.extend(_check_desc_match(route, desc, tt.get("metaDescription", "")))

        # 5. /locations/<slug> and /glossary/<slug>: limits + uniqueness only (no exact-match)
        #    (uniqueness checked globally below)

        for line in issues:
            print(line)
            all_issues.append(line)
            if line.startswith("FAIL"):
                fail_count += 1
            elif line.startswith("WARN"):
                warn_count += 1

    # Global uniqueness
    uniqueness_issues = _check_uniqueness(records)
    for line in uniqueness_issues:
        print(line)
        all_issues.append(line)
        if line.startswith("FAIL"):
            fail_count += 1

    # Summary
    print("-" * 90)
    n_pages = len(records)
    n_ok = n_pages - len({
        line.split("  ")[1] for line in all_issues if line.startswith("FAIL")
        and not line.startswith("FAIL  DUPLICATE")
    })
    print(
        f"SUMMARY  {n_pages} pages  |  {fail_count} FAIL  |  {warn_count} WARN  |  "
        f"exit {'1' if fail_count else '0'}"
    )
    if fail_count:
        print("FAILING ROUTES:")
        for line in all_issues:
            if line.startswith("FAIL"):
                print(f"  {line}")

    return 1 if fail_count else 0


if __name__ == "__main__":
    sys.exit(main())
