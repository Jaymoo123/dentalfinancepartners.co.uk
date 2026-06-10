"""Generic, --site-driven sitemap crawler for net-new topic-gap discovery.

A faithful generalisation of scripts/property_topic_gap_finder.py. The
property-specific DATA (competitor list, content/skip patterns, topic tokens)
is externalised to sites/<site>.discovery.json; the paths come from
sites/<site>.json. The sitemap-fetch mechanics (robots.txt + index recursion)
are reused verbatim from the property finder.

Steps:
  1. Load competitors + patterns from sites/<site>.discovery.json.
  2. For each competitor: fetch /sitemap.xml (and nested sitemaps), extract
     content URLs (blog/articles/guides), keep slug + lastmod.
  3. Build a per-domain list of {url, slug, norm, lastmod}.
  4. Load our existing pages from the site's blogContentDir.
  5. Output:
       - briefs/<site>/_competitor_urls.json          (raw content scrape)
       - briefs/<site>/_competitor_architecture.json  (tools/hub/landing harvest)
       - docs/<site>/topic_gaps_first_cut.md          (loose-match first cut)

ENRICHMENT A (lastmod): each <url> entry captures the sitemaps-schema
  {ns}lastmod child and stores it per URL in the raw JSON.

ENRICHMENT B (architecture/tools harvest): URLs the content filter DROPS but
  which look like calculators / tools / fees / services / hubs / shallow
  landing pages are collected into a separate inventory so they can seed
  CALCULATOR_IDEA / COMPONENT_IDEA / core-page-gap discovery later. This does
  NOT change which URLs go into the content gap pool.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
import time
from pathlib import Path
from urllib.parse import urlparse
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

import httpx
import urllib.robotparser

# Browser-grade UA shared by every fetch in this finder.
_FETCH_UA = "Mozilla/5.0 (compatible; competitor-research/1.0)"

# Robots cache for the process lifetime.
_robots_cache: dict[str, urllib.robotparser.RobotFileParser | None] = {}


def can_fetch(url: str) -> bool:
    """Robots.txt check using the same browser UA + httpx fetch the finder uses.

    The shared optimisation_engine.competitor._fetch.can_fetch relies on the
    stdlib robotparser, whose internal urllib opener is frequently 403'd by
    WordPress/WAF bot-protection on these accountancy sites. The parser then
    sets disallow_all=True and blocks the whole domain even though robots.txt
    actually permits crawling. Fetching robots.txt ourselves with a real UA
    avoids that false-negative while still honouring genuine Disallow rules.
    Fails open (returns True) if robots.txt is unreachable or unparseable.
    """
    parsed = urlparse(url)
    base = f"{parsed.scheme}://{parsed.netloc}"
    if base not in _robots_cache:
        rp: urllib.robotparser.RobotFileParser | None = None
        try:
            with httpx.Client(
                follow_redirects=True, timeout=20.0,
                headers={"User-Agent": _FETCH_UA},
            ) as c:
                r = c.get(base + "/robots.txt")
            if r.status_code == 200 and r.text:
                rp = urllib.robotparser.RobotFileParser()
                rp.parse(r.text.splitlines())
            # Any non-200 (403/404/etc) -> treat as no robots rules (fail open)
        except Exception:
            rp = None
        _robots_cache[base] = rp
    rp = _robots_cache[base]
    if rp is None:
        return True
    try:
        return rp.can_fetch(_FETCH_UA, url)
    except Exception:
        return True


# ---------------------------------------------------------------------------
# Config loading (mirrors property_wave_cannibalisation_check._load_site_config)
# ---------------------------------------------------------------------------

def _load_site_config(site: str) -> dict:
    """Load sites/<site>.json — mirrors scripts/_lib/site-config.ps1 logic."""
    cfg_path = ROOT / "sites" / f"{site}.json"
    if not cfg_path.exists():
        if site == "property":
            return {
                "paths": {
                    "briefsDir": "briefs/property",
                    "blogContentDir": "Property/web/content/blog",
                    "docsDir": "docs/property",
                },
            }
        raise FileNotFoundError(f"Site config missing: {cfg_path}")
    return json.loads(cfg_path.read_text(encoding="utf-8"))


def _load_discovery_config(site: str) -> dict:
    """Load sites/<site>.discovery.json (competitors + patterns + tokens)."""
    cfg_path = ROOT / "sites" / f"{site}.discovery.json"
    if not cfg_path.exists():
        raise FileNotFoundError(f"Discovery config missing: {cfg_path}")
    return json.loads(cfg_path.read_text(encoding="utf-8"))


# ---------------------------------------------------------------------------
# Content / architecture classification (data-driven from discovery config)
# ---------------------------------------------------------------------------

# Architecture/tools markers — path tokens that mark a valuable non-content
# landing page (calculators, fee tables, service hubs, guide indexes).
ARCH_PATH_TOKENS = [
    "calculator", "calculators", "tool", "tools", "fee", "fees",
    "pricing", "price", "service", "services", "hub", "guide-index",
    "guides", "resources", "resource", "knowledge-base", "knowledgebase",
]

# Pure nav/legal — never treat as architecture, even if shallow.
ARCH_EXCLUDE_TOKENS = [
    "privacy", "terms", "cookie", "cookies", "contact", "about",
    "login", "account", "sitemap", "feed", "careers", "career",
    "team", "thank-you", "thankyou", "complaints", "accessibility",
    "disclaimer", "gdpr", "vacancies",
]


def _compile(patterns: list[str]) -> list[re.Pattern]:
    return [re.compile(p, re.IGNORECASE) for p in patterns]


def slug_from_url(url: str) -> str:
    path = urlparse(url).path.rstrip("/")
    return path.rsplit("/", 1)[-1] if "/" in path else path


def normalise_slug(slug: str) -> str:
    """Lowercase + de-dash for loose matching."""
    return re.sub(r"[^a-z0-9]+", " ", slug.lower()).strip()


def is_content_url(url: str, skip_res: list[re.Pattern]) -> bool:
    path = urlparse(url).path
    if not path or path == "/":
        return False
    for pat in skip_res:
        if pat.search(path):
            return False
    return True


def is_architecture_url(url: str) -> bool:
    """Return True if a DROPPED url looks like a valuable tool/hub/landing page.

    Captures: paths containing a calculator/tool/fee/service/pricing/hub/
    guide-index token, OR shallow (single path segment) landing pages.
    Excludes pure nav/legal pages.
    """
    path = urlparse(url).path.strip("/")
    if not path:
        return False
    lower = path.lower()
    segments = [s for s in lower.split("/") if s]
    # Hyphen-bounded words across the whole path, so "account" matches a literal
    # /account page but NOT "accountants-in-bristol" or "accounting-software".
    words = set(re.split(r"[^a-z0-9]+", lower))

    # Never harvest pure nav/legal. Match whole segments and hyphen-bounded
    # words (catches "privacy-policy", "terms-and-conditions", "our-team",
    # "privacy-notice-gdpr") without nuking "accountancy-*" / "accountants-*".
    for tok in ARCH_EXCLUDE_TOKENS:
        if tok in segments or tok in words:
            return False

    # Architecture markers: whole-segment OR hyphen-bounded word (catches
    # "services", "fees", "tax-calculators", "fee-structure", "guide-index").
    for tok in ARCH_PATH_TOKENS:
        if tok in segments or tok in words:
            return True

    # Shallow landing page (single path segment) that survived exclusion
    if len(segments) == 1:
        # ignore media files
        if re.search(r"\.(jpg|jpeg|png|gif|webp|pdf|svg|css|js|xml)$", lower):
            return False
        return True

    return False


# ---------------------------------------------------------------------------
# HTTP + sitemap fetch (reused verbatim from property finder)
# ---------------------------------------------------------------------------

def http_get(url: str, timeout: float = 30.0) -> tuple[int, str]:
    try:
        with httpx.Client(
            follow_redirects=True, timeout=timeout,
            headers={"User-Agent": "Mozilla/5.0 (compatible; competitor-research/1.0)"}
        ) as c:
            r = c.get(url)
            return r.status_code, r.text
    except Exception as exc:
        return 0, f"error: {exc}"


SITEMAP_PATHS = [
    "/sitemap.xml",
    "/sitemap_index.xml",
    "/sitemap-index.xml",
    "/wp-sitemap.xml",
    "/sitemaps.xml",
]


def fetch_sitemap_for_domain(domain: str) -> list[dict]:
    """Return a flat list of {url, lastmod} from the domain's sitemap.

    Same mechanics as the property finder (robots.txt + index recursion);
    additionally captures the sitemaps-schema {ns}lastmod child (Enrichment A).
    """
    base = f"https://{domain}"
    seen_sitemaps: set[str] = set()
    entries: list[dict] = []
    queue: list[str] = []

    # Try common sitemap locations
    for path in SITEMAP_PATHS:
        u = base + path
        if not can_fetch(u):
            continue
        status, body = http_get(u)
        if status == 200 and ("<urlset" in body or "<sitemapindex" in body):
            queue.append(u)
            break

    if not queue:
        # Try /robots.txt for sitemap declaration
        if can_fetch(base + "/robots.txt"):
            status, body = http_get(base + "/robots.txt")
            if status == 200:
                for line in body.splitlines():
                    if line.lower().startswith("sitemap:"):
                        sm = line.split(":", 1)[1].strip()
                        queue.append(sm)
                        break

    while queue:
        sm_url = queue.pop()
        if sm_url in seen_sitemaps:
            continue
        seen_sitemaps.add(sm_url)
        status, body = http_get(sm_url)
        if status != 200:
            continue
        try:
            root = ET.fromstring(body)
        except ET.ParseError:
            continue
        # Strip namespace
        ns = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
        if root.tag.endswith("sitemapindex"):
            for sm in root.findall(f"{ns}sitemap"):
                loc = sm.find(f"{ns}loc")
                if loc is not None and loc.text:
                    queue.append(loc.text.strip())
        else:
            for u in root.findall(f"{ns}url"):
                loc = u.find(f"{ns}loc")
                if loc is None or not loc.text:
                    continue
                lastmod_el = u.find(f"{ns}lastmod")
                lastmod = lastmod_el.text.strip() if (lastmod_el is not None and lastmod_el.text) else None
                entries.append({"url": loc.text.strip(), "lastmod": lastmod})
        time.sleep(0.5)

    return entries


# ---------------------------------------------------------------------------
# Our pages
# ---------------------------------------------------------------------------

def list_our_pages(blog_dir: Path) -> list[str]:
    return sorted(p.stem for p in blog_dir.glob("*.md"))


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--site", type=str, default="property", help="Site key (default: property)")
    args = ap.parse_args()
    site = args.site

    cfg = _load_site_config(site)
    disc = _load_discovery_config(site)
    paths = cfg.get("paths", cfg)

    briefs_dir = ROOT / paths["briefsDir"]
    docs_dir = ROOT / paths["docsDir"]
    blog_dir = ROOT / paths["blogContentDir"]

    competitors = disc.get("competitors", [])
    skip_res = _compile(disc.get("skip_path_patterns", []))

    if not competitors:
        print(f"WARNING: no competitors configured in sites/{site}.discovery.json. "
              f"Run scripts/derive_competitor_universe.py --site {site} first.")

    out_content = briefs_dir / "_competitor_urls.json"
    out_arch = briefs_dir / "_competitor_architecture.json"
    out_doc = docs_dir / "topic_gaps_first_cut.md"
    out_content.parent.mkdir(parents=True, exist_ok=True)
    out_doc.parent.mkdir(parents=True, exist_ok=True)

    our_slugs = list_our_pages(blog_dir)
    our_normalised = {normalise_slug(s) for s in our_slugs}
    print(f"Our {site} pages: {len(our_slugs)} (from {blog_dir})")

    all_pages: dict[str, list[dict]] = {}
    architecture: dict[str, list[dict]] = {}
    failed: list[str] = []

    for domain in competitors:
        print(f"\n[{domain}]")
        try:
            entries = fetch_sitemap_for_domain(domain)
        except Exception as exc:
            print(f"  ERROR: {exc}")
            failed.append(domain)
            continue
        if not entries:
            print("  (no sitemap urls fetched)")
            failed.append(domain)
            continue

        # Keep only URLs on this domain
        on_domain = [
            e for e in entries
            if urlparse(e["url"]).hostname and domain in (urlparse(e["url"]).hostname or "")
        ]

        # Content URLs (the gap pool)
        content_entries: dict[str, dict] = {}
        arch_entries: dict[str, dict] = {}
        for e in on_domain:
            u = e["url"]
            if is_content_url(u, skip_res):
                content_entries[u] = e
            else:
                # Enrichment B: harvest valuable dropped URLs
                if is_architecture_url(u):
                    arch_entries[u] = e

        content_sorted = sorted(content_entries.values(), key=lambda e: e["url"])
        arch_sorted = sorted(arch_entries.values(), key=lambda e: e["url"])

        print(f"  total sitemap urls: {len(entries)}, content-shaped: {len(content_sorted)}, "
              f"architecture/tools: {len(arch_sorted)}")

        all_pages[domain] = [
            {
                "url": e["url"],
                "slug": slug_from_url(e["url"]),
                "norm": normalise_slug(slug_from_url(e["url"])),
                "lastmod": e.get("lastmod"),
            }
            for e in content_sorted
        ]
        if arch_sorted:
            architecture[domain] = [
                {"url": e["url"], "slug": slug_from_url(e["url"])}
                for e in arch_sorted
            ]

    # Write raw content scrape
    out_content.write_text(json.dumps(all_pages, indent=2), encoding="utf-8")
    print(f"\nWrote raw content scrape to {out_content}")

    # Write architecture/tools inventory (Enrichment B)
    out_arch.write_text(json.dumps(architecture, indent=2), encoding="utf-8")
    total_arch = sum(len(v) for v in architecture.values())
    print(f"Wrote architecture/tools inventory ({total_arch} urls) to {out_arch}")

    # Quick first-cut diff: which competitor slugs do NOT loose-match any of ours?
    print("\n=== Quick first-cut gap counts (slugs not in our set, loose-match) ===")
    gaps_by_domain: dict[str, list[dict]] = {}
    for domain, pages in all_pages.items():
        gaps = []
        for p in pages:
            if not p["norm"]:
                continue
            comp_tokens = set(p["norm"].split())
            if len(comp_tokens) < 2:
                continue
            covered = False
            for our in our_normalised:
                our_tokens = set(our.split())
                if not our_tokens:
                    continue
                overlap = comp_tokens & our_tokens
                if len(overlap) >= max(2, int(0.7 * min(len(comp_tokens), len(our_tokens)))):
                    covered = True
                    break
            if not covered:
                gaps.append(p)
        gaps_by_domain[domain] = gaps
        print(f"  {domain}: {len(gaps)} potential gaps (of {len(pages)} content URLs)")

    # Output markdown doc
    disp = cfg.get("displayName", site)
    lines = [f"# {disp} — topic gaps from top competitor sitemaps", ""]
    lines.append(f"Compared our {len(our_slugs)} {site} pages against {len(competitors)} competitor sitemaps.")
    lines.append("")
    lines.append("**What this is:** every competitor URL whose slug doesn't loose-match any slug in our content directory. Loose-match = at least 70% slug-token overlap.")
    lines.append("")
    lines.append("**What this is NOT:** topic-clustered (the filter step plus an Opus pass do that). Many of these URLs will turn out to be the same topic written differently. Use this as the raw input.")
    lines.append("")
    lines.append("---")
    lines.append("")
    for domain in competitors:
        gaps = gaps_by_domain.get(domain, [])
        if not gaps:
            continue
        lines.append(f"## {domain} ({len(gaps)} gap candidates)")
        lines.append("")
        for p in gaps[:200]:
            lines.append(f"- `{p['slug']}` — {p['url']}")
        if len(gaps) > 200:
            lines.append(f"- *(+{len(gaps)-200} more)*")
        lines.append("")

    out_doc.write_text("\n".join(lines), encoding="utf-8")
    print(f"\nWrote first-cut gap doc to {out_doc}")

    if failed:
        print(f"\nSitemap FAILED for: {', '.join(failed)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
