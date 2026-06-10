"""Generic, --site-driven filter+cluster for net-new topic-gap discovery.

A faithful generalisation of scripts/property_topic_gap_filter.py. Reads the
raw competitor scrape from briefs/<site>/_competitor_urls.json, applies
exclude/news/evergreen/covered filters (data-driven from
sites/<site>.discovery.json), buckets by topic, ranks by cross-competitor
frequency (keeping the [xN] consensus markers), and writes the filtered,
bucketed pool to docs/<site>/topic_gaps_first_cut.md.

All site-specific DATA (news_patterns, evergreen_hints, topic_buckets, the
primary competitor set) lives in sites/<site>.discovery.json; mechanics are
reused verbatim from the property filter.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


# URL path patterns that mean "not content" — staff profiles, service pages, etc.
# These are site-neutral (generic web nav/legal), so kept here verbatim.
URL_PATH_EXCLUDES = [
    re.compile(p, re.IGNORECASE) for p in [
        r"/our-people/", r"/our-team/", r"/team/", r"/staff-profile",
        r"/author/", r"/category/", r"/tag/", r"/services/", r"/sectors/",
        r"/contact", r"/about", r"/cookie", r"/privacy", r"/terms",
        r"/thank-you", r"/login", r"/signup", r"/feed", r"/sitemap",
        r"/page/\d+", r"/our-firm", r"/case-studies?$",
    ]
]


def is_url_excluded(url: str) -> bool:
    for pat in URL_PATH_EXCLUDES:
        if pat.search(url):
            return True
    return False


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
    cfg_path = ROOT / "sites" / f"{site}.discovery.json"
    if not cfg_path.exists():
        raise FileNotFoundError(f"Discovery config missing: {cfg_path}")
    return json.loads(cfg_path.read_text(encoding="utf-8"))


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

    # Compile site-specific pattern data
    news_re = [re.compile(p, re.IGNORECASE) for p in disc.get("news_patterns", [])]
    evergreen_re = [re.compile(p, re.IGNORECASE) for p in disc.get("evergreen_hints", [])]
    topic_buckets = [(name, markers) for name, markers in disc.get("topic_buckets", [])]

    def is_news_like(slug: str) -> bool:
        for pat in news_re:
            if pat.search(slug):
                return True
        return False

    def is_evergreen(slug: str) -> bool:
        for pat in evergreen_re:
            if pat.search(slug):
                return True
        # Slug-shape heuristic: short, no verbs, no specific figures
        tokens = slug.split("-")
        if 2 <= len(tokens) <= 8 and not any(t.isdigit() for t in tokens):
            return True
        return False

    def assign_bucket(slug: str) -> str:
        s = slug.lower()
        for name, markers in topic_buckets:
            for m in markers:
                if m in s:
                    return name
        return "Other / uncategorised"

    # On-topic gate. When the competitor universe mixes generalist firms with
    # specialists (as for dentists, where djh/ac-accounts/a-wise also cover
    # vets, pharmacists, generic business topics), the evergreen slug-shape
    # heuristic admits a lot of off-niche noise. If the discovery config lists
    # topic_tokens, require a slug (or its URL path) to either hit a named
    # bucket marker or contain a niche topic token. No tokens configured =>
    # gate is a no-op (preserves property back-compat).
    topic_tokens = [t.lower() for t in disc.get("topic_tokens", [])]

    def is_on_topic(slug: str, url: str) -> bool:
        if not topic_tokens:
            return True
        if assign_bucket(slug) != "Other / uncategorised":
            return True
        hay = (slug + " " + url).lower()
        return any(t in hay for t in topic_tokens)

    raw_path = briefs_dir / "_competitor_urls.json"
    raw = json.loads(raw_path.read_text(encoding="utf-8"))

    # Primary competitors: use ALL competitors from the discovery config unless a
    # "primary_competitors" override is present.
    primary = disc.get("primary_competitors") or disc.get("competitors", [])
    if not primary:
        # Fall back to whatever domains the scrape contains
        primary = list(raw.keys())

    # Load our slug set for the "covered" check (loose match, same as the finder)
    our_slugs = [p.stem for p in blog_dir.glob("*.md")]
    our_norm = {re.sub(r"[^a-z0-9]+", " ", s.lower()).strip() for s in our_slugs}

    def is_covered(slug: str) -> bool:
        norm = re.sub(r"[^a-z0-9]+", " ", slug.lower()).strip()
        if not norm:
            return False
        tokens = set(norm.split())
        for our in our_norm:
            our_tokens = set(our.split())
            if not our_tokens:
                continue
            overlap = tokens & our_tokens
            if len(overlap) >= max(2, int(0.7 * min(len(tokens), len(our_tokens)))):
                return True
        return False

    # Build (bucket, slug, [(domain, url), ...]) — keyed by canonical slug
    by_slug: dict[str, dict] = defaultdict(lambda: {"sources": [], "bucket": ""})
    for domain in primary:
        for p in raw.get(domain, []):
            slug = p["slug"]
            url = p["url"]
            if is_url_excluded(url):
                continue
            if is_news_like(slug):
                continue
            if not is_evergreen(slug):
                continue
            if not is_on_topic(slug, url):
                continue
            if is_covered(slug):
                continue
            entry = by_slug[slug]
            entry["sources"].append((domain, url))
            entry["bucket"] = assign_bucket(slug)

    # Rank: more competitors covering = higher demand signal
    ranked = sorted(by_slug.items(), key=lambda kv: (-len(kv[1]["sources"]), kv[1]["bucket"], kv[0]))

    # Group by bucket for the output
    by_bucket: dict[str, list[tuple[str, list]]] = defaultdict(list)
    for slug, info in ranked:
        by_bucket[info["bucket"]].append((slug, info["sources"]))

    # Sort buckets by total competitor-page coverage
    bucket_score = {b: sum(len(srcs) for _, srcs in items) for b, items in by_bucket.items()}
    bucket_order = sorted(by_bucket.keys(), key=lambda b: -bucket_score[b])

    disp = cfg.get("displayName", site)
    lines = [f"# {disp} — filtered competitor topic gaps", ""]
    lines.append(f"Filtered from raw competitor sitemap scrape (`{raw_path.relative_to(ROOT).as_posix()}`) using news-pattern exclusion + evergreen-pattern inclusion + loose-match exclusion against our {len(our_slugs)} pages.")
    lines.append("")
    lines.append(f"Primary competitors considered: {', '.join(primary)}")
    lines.append("")
    lines.append("**How to read this:**")
    lines.append("- Topics are bucketed by theme.")
    lines.append("- Within each bucket, slugs are ordered by the number of competitor sites that cover them (higher = stronger demand signal).")
    lines.append("- A slug listed here means at least one direct competitor has an evergreen guide on it, and we don't (loose slug match).")
    lines.append("- The slug itself is a starting hypothesis for the gap topic, not a final spec — Opus should look at the underlying competitor URL to confirm scope before we commit to writing.")
    lines.append("")
    lines.append("---")
    lines.append("")
    for bucket in bucket_order:
        items = by_bucket[bucket]
        if not items:
            continue
        lines.append(f"## {bucket} ({len(items)} gap topics, {bucket_score[bucket]} competitor pages)")
        lines.append("")
        for slug, sources in items[:40]:
            n = len(sources)
            indicator = f"**[x{n}]**" if n >= 2 else f"[x{n}]"
            lines.append(f"- {indicator} `{slug}`")
            for domain, url in sources:
                lines.append(f"  - {domain}: {url}")
        if len(items) > 40:
            lines.append(f"- *(+{len(items)-40} more in this bucket)*")
        lines.append("")

    out = docs_dir / "topic_gaps_first_cut.md"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {out}")
    print(f"Total filtered gap topics: {sum(len(items) for items in by_bucket.values())}")
    print(f"Buckets: {len(by_bucket)}")
    print()
    print("Top buckets by competitor coverage:")
    for b in bucket_order[:15]:
        print(f"  {bucket_score[b]:4d} pages | {len(by_bucket[b]):3d} topics | {b}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
