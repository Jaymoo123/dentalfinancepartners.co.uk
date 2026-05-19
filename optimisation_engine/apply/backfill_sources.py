"""
Backfill page-level Sources/References sections on pages that have inline
[n] markers but no References block.

Walks the four sites' blog content, finds pages with <sup><a href="#ref-N">
markers but no <h2>Sources</h2> / <h2>References</h2> section, looks up the
research_cache for that topic, and appends a Sources block.

Usage:
  python -m optimisation_engine.apply.backfill_sources --dry-run
  python -m optimisation_engine.apply.backfill_sources --site property
  python -m optimisation_engine.apply.backfill_sources
"""
from __future__ import annotations

import argparse
import os
import re
import sys
from dataclasses import dataclass
from pathlib import Path

import httpx

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.apply._citation_renderer import (
    _REFS_BLOCK_RX,
    _build_merged_refs_html,
)
from optimisation_engine.apply.base import stamp_trust_signals
from optimisation_engine.apply.frontmatter_utils import read, write
from optimisation_engine.apply.git_helper import build_commit_message, stage_and_commit
from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL, get_sites

CITE_MARKER_RX = re.compile(r'<sup><a href="#ref-(\d+)"')


def _headers() -> dict[str, str]:
    return {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}


def _normalise_topic(query: str) -> str:
    return re.sub(r"\s+", " ", (query or "").lower().strip())


def lookup_research_cache(topic_key: str) -> list[dict]:
    """Pull research_cache rows for a topic."""
    r = httpx.get(
        f"{SUPABASE_URL}/rest/v1/research_cache",
        headers=_headers(),
        params={"select": "*", "topic_key": f"eq.{topic_key}"},
        timeout=15.0,
    )
    return r.json() if r.status_code < 300 else []


def lookup_opportunity_for_page(site_key: str, target_url: str) -> dict | None:
    """Find a shipped optimisation_opportunity for this page (any status)."""
    r = httpx.get(
        f"{SUPABASE_URL}/rest/v1/optimisation_opportunities",
        headers=_headers(),
        params={
            "select": "primary_query,target_query_cluster",
            "site_key": f"eq.{site_key}",
            "target_url": f"eq.{target_url}",
            "limit": "1",
        },
        timeout=15.0,
    )
    rows = r.json() if r.status_code < 300 else []
    return rows[0] if rows else None


def find_pages_needing_backfill(site_key: str) -> list[Path]:
    site = next((s for s in get_sites(active_only=True) if s["site_key"] == site_key), None)
    if not site:
        return []
    blog_dir = ROOT / site["content_dir"]
    if not blog_dir.exists():
        return []
    out = []
    for md in blog_dir.glob("*.md"):
        try:
            text = md.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue
        if not CITE_MARKER_RX.search(text):
            continue
        if _REFS_BLOCK_RX.search(text):
            continue
        out.append(md)
    return out


def backfill_one_page(site_key: str, page_path: Path, *, dry_run: bool) -> dict:
    site = next(s for s in get_sites(active_only=True) if s["site_key"] == site_key)
    rel_path = str(page_path.relative_to(ROOT))
    fm, body = read(page_path)

    # Canonical URL
    target_url = fm.get("canonical") or ""
    if not target_url:
        return {"path": rel_path, "skipped": True, "reason": "no canonical in frontmatter"}

    # Find the opportunity (any status) for this page to get the primary_query
    opp = lookup_opportunity_for_page(site_key, target_url)
    primary_q = (opp or {}).get("primary_query") if opp else None

    # Fallback: try to derive from H1 or title (less reliable)
    if not primary_q:
        primary_q = fm.get("h1") or fm.get("title")

    if not primary_q:
        return {"path": rel_path, "skipped": True, "reason": "could not derive primary_query"}

    # Look up cached research
    topic_key = _normalise_topic(primary_q)
    cache = lookup_research_cache(topic_key)
    if not cache:
        return {"path": rel_path, "skipped": True, "reason": f"no research_cache for topic_key={topic_key!r}"}

    # Determine which [n] indices appear in the body
    used_indices = sorted({int(m.group(1)) for m in CITE_MARKER_RX.finditer(body)})
    n_used = len(used_indices)

    # Build sources list (cap at max used index)
    sources = []
    for r in cache[: max(used_indices) if used_indices else 10]:
        sources.append({
            "domain": r.get("source_domain", ""),
            "url": r.get("source_url", ""),
            "title": r.get("source_title") or r.get("source_domain", ""),
            "tier": r.get("source_tier", ""),
        })

    if not sources:
        return {"path": rel_path, "skipped": True, "reason": "cache yielded no usable sources"}

    refs_block = _build_merged_refs_html(sources)
    new_body = body.rstrip() + "\n\n" + refs_block + "\n"

    if dry_run:
        return {
            "path": rel_path,
            "n_cite_markers": n_used,
            "n_sources_in_cache": len(cache),
            "n_sources_in_block": len(sources),
            "applied": False,
            "dry_run": True,
        }

    # Apply: write file + stamp trust signals + git commit
    sources_used = sorted({s["domain"] for s in sources})
    stamp_trust_signals(
        fm=fm,
        site_key=site_key,
        sources_used=sources_used,
        editorial_note=f"Backfilled Sources block: {len(sources)} authority citations.",
    )
    write(page_path, fm, new_body)

    msg = build_commit_message(
        site_key=site_key,
        change_type="schema_addition",  # closest existing change_type
        summary=f"Backfill Sources/References block on {page_path.stem}",
        brief_excerpt=f"Page had {n_used} inline [n] markers but no Sources block. Added one citing {len(sources)} authority sources.",
    )
    try:
        commit = stage_and_commit(files=[rel_path], message=msg)
    except Exception as exc:
        return {"path": rel_path, "skipped": True, "reason": f"git commit failed: {exc}"}

    return {
        "path": rel_path,
        "n_cite_markers": n_used,
        "n_sources_in_cache": len(cache),
        "n_sources_in_block": len(sources),
        "applied": True,
        "commit": commit[:10],
    }


def run(*, site: str | None = None, dry_run: bool = False) -> None:
    sites_to_scan = [site] if site else [s["site_key"] for s in get_sites(active_only=True)]
    summaries: list[dict] = []
    for site_key in sites_to_scan:
        pages = find_pages_needing_backfill(site_key)
        print(f"\n=== {site_key}: {len(pages)} page(s) need a Sources block ===")
        for p in pages:
            res = backfill_one_page(site_key, p, dry_run=dry_run)
            slug = p.stem[:50]
            if res.get("applied"):
                print(f"  APPLIED  {slug:52s} {res['n_cite_markers']} markers, {res['n_sources_in_block']} sources  commit={res.get('commit')}")
            elif res.get("dry_run"):
                print(f"  WOULD APPLY  {slug:52s} {res['n_cite_markers']} markers, {res['n_sources_in_block']} sources")
            else:
                print(f"  SKIPPED  {slug:52s} reason: {res.get('reason')}")
            summaries.append(res)

    applied = sum(1 for s in summaries if s.get("applied"))
    skipped = sum(1 for s in summaries if s.get("skipped"))
    print(f"\n=== TOTAL: applied={applied} skipped={skipped} {'(DRY-RUN)' if dry_run else ''} ===")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--site", default=None)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    run(site=args.site, dry_run=args.dry_run)


if __name__ == "__main__":
    main()
