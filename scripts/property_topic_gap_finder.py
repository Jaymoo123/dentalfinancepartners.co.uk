"""Fetch sitemaps from top property-accountant competitors and produce a
ranked list of topics they cover that we don't.

Steps:
  1. Read top competitor domains (passed in as constants below — picked from
     competitor_pages aggregate analysis).
  2. For each domain: fetch /sitemap.xml (and any nested sitemaps), extract
     content URLs (blog/articles/guides), keep title from URL slug + page
     title where available.
  3. Build a flat list of (domain, url, slug, title).
  4. Load our 285 Property pages.
  5. Output:
       - briefs/property/_competitor_urls.json (raw scrape)
       - docs/property/topic_gaps_first_cut.md (manager-readable diff
         organised by competitor + suggested-new-pages)
  6. Topic clustering is left for the Opus step (a session reads this output
     and proposes the new-page list).
"""
from __future__ import annotations

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

from optimisation_engine.competitor._fetch import can_fetch


COMPETITORS = [
    "ukpropertyaccountants.co.uk",
    "uklandlordtax.co.uk",
    "landlordstax.co.uk",
    "rossmartin.co.uk",
    "dnsassociates.co.uk",
    "taxaccountant.co.uk",
    "alexander-ene.co.uk",
    "gorillaaccounting.com",
    "geraldedelman.com",
    "propertyaccountant.co.uk",
    "mytaxaccountant.co.uk",
    "jamestoddandco.co.uk",
    "thp.co.uk",
    "hich.co.uk",
    "bhp.co.uk",
]

# URLs we discard: nav/service/login/category pages, not content
SKIP_PATH_PATTERNS = [
    re.compile(p, re.IGNORECASE) for p in [
        r"/wp-(admin|login|content)",
        r"/feed/?$",
        r"/contact/?$",
        r"/about/?$",
        r"/privacy", r"/terms", r"/cookies",
        r"/services?/?$",
        r"/team/?$", r"/our-team",
        r"/careers?/?$",
        r"/sitemap", r"/feed",
        r"\.(jpg|jpeg|png|gif|webp|pdf|svg|css|js)$",
        r"/tag/", r"/author/", r"/category/[^/]+/page/",
        r"/login", r"/account",
    ]
]

# Likely-content path markers (boosts inclusion confidence)
CONTENT_HINTS = [
    "/blog/", "/article", "/guide", "/insight", "/news/",
    "/post/", "/resources/", "/knowledge/", "/journal/",
]


def is_content_url(url: str) -> bool:
    path = urlparse(url).path
    if not path or path == "/":
        return False
    for pat in SKIP_PATH_PATTERNS:
        if pat.search(path):
            return False
    return True


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


def fetch_sitemap_for_domain(domain: str) -> list[str]:
    """Return a flat list of URLs from the domain's sitemap (recursing index)."""
    base = f"https://{domain}"
    seen_sitemaps: set[str] = set()
    urls: list[str] = []
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
                if loc is not None and loc.text:
                    urls.append(loc.text.strip())
        time.sleep(0.5)

    return urls


def list_our_pages() -> list[str]:
    return sorted(p.stem for p in (ROOT / "Property/web/content/blog").glob("*.md"))


def slug_from_url(url: str) -> str:
    path = urlparse(url).path.rstrip("/")
    return path.rsplit("/", 1)[-1] if "/" in path else path


def normalise_slug(slug: str) -> str:
    """Lowercase + de-dash for loose matching."""
    return re.sub(r"[^a-z0-9]+", " ", slug.lower()).strip()


def main() -> int:
    out_briefs = ROOT / "briefs/property/_competitor_urls.json"
    out_doc = ROOT / "docs/property/topic_gaps_first_cut.md"
    out_briefs.parent.mkdir(parents=True, exist_ok=True)

    our_slugs = list_our_pages()
    our_normalised = {normalise_slug(s) for s in our_slugs}
    print(f"Our property pages: {len(our_slugs)}")

    all_pages: dict[str, list[dict]] = {}
    for domain in COMPETITORS:
        print(f"\n[{domain}]")
        try:
            urls = fetch_sitemap_for_domain(domain)
        except Exception as exc:
            print(f"  ERROR: {exc}")
            continue
        # Keep content URLs only
        content_urls = [u for u in urls if is_content_url(u) and urlparse(u).hostname and domain in (urlparse(u).hostname or "")]
        # dedup
        content_urls = sorted(set(content_urls))
        print(f"  total sitemap urls: {len(urls)}, content-shaped: {len(content_urls)}")
        all_pages[domain] = [
            {"url": u, "slug": slug_from_url(u), "norm": normalise_slug(slug_from_url(u))}
            for u in content_urls
        ]

    # Write raw scrape
    out_briefs.write_text(json.dumps(all_pages, indent=2), encoding="utf-8")
    print(f"\nWrote raw scrape to {out_briefs}")

    # Quick first-cut diff: which competitor slugs do NOT loose-match any of ours?
    print("\n=== Quick first-cut gap counts (slugs not in our set, loose-match) ===")
    gaps_by_domain: dict[str, list[dict]] = {}
    for domain, pages in all_pages.items():
        gaps = []
        for p in pages:
            # Loose match: are any of our slug tokens covered by this competitor slug?
            if not p["norm"]:
                continue
            comp_tokens = set(p["norm"].split())
            if len(comp_tokens) < 2:
                continue
            # If we have a slug whose token-set overlaps >=70% with this competitor, treat as "covered"
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
    lines = ["# Property — topic gaps from top competitor sitemaps", ""]
    lines.append(f"Generated 2026-05-21. Compared our {len(our_slugs)} Property pages against {len(COMPETITORS)} competitor sitemaps.")
    lines.append("")
    lines.append("**What this is:** every competitor URL whose slug doesn't loose-match any slug in our content directory. Loose-match = at least 70% slug-token overlap (so 'cgt-property' and 'capital-gains-tax-property' count as covered).")
    lines.append("")
    lines.append("**What this is NOT:** topic-clustered (an Opus session needs to do that pass). Many of these URLs will turn out to be the same topic written differently. Use this as the raw input.")
    lines.append("")
    lines.append("---")
    lines.append("")
    for domain in COMPETITORS:
        gaps = gaps_by_domain.get(domain, [])
        if not gaps:
            continue
        lines.append(f"## {domain} ({len(gaps)} gap candidates)")
        lines.append("")
        for p in gaps[:200]:  # cap per domain
            lines.append(f"- `{p['slug']}` — {p['url']}")
        if len(gaps) > 200:
            lines.append(f"- *(+{len(gaps)-200} more)*")
        lines.append("")

    out_doc.write_text("\n".join(lines), encoding="utf-8")
    print(f"\nWrote first-cut gap doc to {out_doc}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
