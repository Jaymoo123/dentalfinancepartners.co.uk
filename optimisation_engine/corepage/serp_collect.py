"""SERP collection for the core-page engine.

Fetches the page-1 organic results for the head-keyword family (DuckDuckGo,
free, primary; Serper/Google as a paid fallback only when NOT dry-run), drops
our own domain, dedupes by domain, and classifies each competitor URL by path
depth so the brief compares like-with-like (homepage/landing pages vs blogs).
"""
from __future__ import annotations

import os
from urllib.parse import urlparse

from optimisation_engine.clients.ddg_serp_client import fetch_organic_results


# Keep total live calls modest (DDG bot-detection / rate-limit safety).
MAX_DDG_TERMS = 8
SERP_NUM = 10
MAX_SERPER_FALLBACKS = 6


def _domain_of(url: str) -> str:
    if not url:
        return ""
    host = (urlparse(url).hostname or "").lower()
    return host[4:] if host.startswith("www.") else host


def classify_competitor_path(url: str) -> str:
    """homepage | landing | blog — by path shape, for like-with-like compare."""
    path = (urlparse(url).path or "/").rstrip("/").lower()
    if path == "":
        return "homepage"
    if any(seg in path for seg in ("/blog", "/news", "/insights", "/articles", "/guides")):
        return "blog"
    # Shallow path (one segment) => a service/landing page.
    if path.count("/") <= 1:
        return "landing"
    return "deep"


def _probe_terms(cfg: dict) -> list[str]:
    """The head terms to actually query (national family, capped)."""
    terms = list(cfg.get("head_terms", []))[:MAX_DDG_TERMS]
    return terms


def collect_head_serps(cfg: dict, *, dry_run: bool = False) -> dict:
    """Return {competitors: [...], probed_terms: [...], notes: [...]}.

    competitors: deduped by domain, each
        {domain, url, best_position, page_type, terms[], title, snippet}
    """
    own = cfg.get("domain", "")
    notes: list[str] = []
    by_domain: dict[str, dict] = {}
    probed: list[str] = []
    serper_used = 0

    for term in _probe_terms(cfg):
        probed.append(term)
        results = fetch_organic_results(term, num=SERP_NUM, region="uk-en", site_key=cfg["site_key"])

        if not results and not dry_run and os.getenv("SERPER_API_KEY") and serper_used < MAX_SERPER_FALLBACKS:
            try:
                from optimisation_engine.clients.serper_client import fetch_top_organic_urls
                results = fetch_top_organic_urls(term, num=SERP_NUM, site_key=cfg["site_key"])
                serper_used += 1
                notes.append(f"Serper fallback used for {term!r} (DDG returned nothing).")
            except Exception as exc:  # noqa: BLE001
                notes.append(f"Serper fallback failed for {term!r}: {exc}")

        if not results:
            notes.append(f"No SERP results for {term!r}.")
            continue

        for r in results:
            dom = r.get("domain") or _domain_of(r.get("link") or "")
            url = r.get("link") or ""
            if not dom or not url:
                continue
            if own and (dom == own or dom.endswith("." + own)):
                continue  # our own page
            pos = r.get("position") or 99
            entry = by_domain.get(dom)
            if entry is None:
                by_domain[dom] = {
                    "domain": dom,
                    "url": url,
                    "best_position": pos,
                    "page_type": classify_competitor_path(url),
                    "terms": [term],
                    "title": r.get("title") or "",
                    "snippet": r.get("snippet") or "",
                }
            else:
                entry["terms"].append(term)
                if pos < entry["best_position"]:
                    entry["best_position"] = pos
                    entry["url"] = url
                    entry["page_type"] = classify_competitor_path(url)
                    entry["title"] = r.get("title") or entry["title"]

    # Rank by how many head terms a domain ranks for, then by best position.
    competitors = sorted(
        by_domain.values(),
        key=lambda d: (-len(d["terms"]), d["best_position"]),
    )
    if not competitors:
        notes.append("No competitor SERP data collected (DDG empty/unavailable). "
                     "Check the `ddgs` package is installed, or run without --dry-run for the Serper fallback.")
    return {"competitors": competitors, "probed_terms": probed, "notes": notes}
