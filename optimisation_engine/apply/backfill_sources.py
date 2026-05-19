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
    _extract_existing_sources,
    strip_orphan_citation_markers,
)
from optimisation_engine.apply.base import stamp_trust_signals
from optimisation_engine.apply.frontmatter_utils import read, write
from optimisation_engine.apply.git_helper import build_commit_message, stage_and_commit
from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL, get_sites

CITE_MARKER_RENDERED_RX = re.compile(r'<sup><a href="#ref-(\d+)"')
CITE_MARKER_RAW_RX = re.compile(r"(?<![\w/])\[(\d+)\](?![\w/])")  # raw [n] not inside a slug


def _all_citation_indices(text: str) -> list[int]:
    """Return every citation marker index in text, both rendered and raw."""
    out: list[int] = []
    out.extend(int(m.group(1)) for m in CITE_MARKER_RENDERED_RX.finditer(text))
    out.extend(int(m.group(1)) for m in CITE_MARKER_RAW_RX.finditer(text))
    return out


# Back-compat alias for any callers still importing the old name
CITE_MARKER_RX = CITE_MARKER_RENDERED_RX


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


def find_pages_needing_backfill(site_key: str) -> list[dict]:
    """Return pages needing attention. Each entry:
      {path, issue: 'no_sources_block' | 'orphan_markers' | 'both'}
    """
    site = next((s for s in get_sites(active_only=True) if s["site_key"] == site_key), None)
    if not site:
        return []
    blog_dir = ROOT / site["content_dir"]
    if not blog_dir.exists():
        return []
    out: list[dict] = []
    for md in blog_dir.glob("*.md"):
        try:
            text = md.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue
        # Split frontmatter off so [n]-like substrings in YAML can't confuse us
        if text.startswith("---"):
            _, _, body_only = text.partition("---")
            _, _, body_only = body_only.partition("---")
        else:
            body_only = text
        all_indices = _all_citation_indices(body_only)
        if not all_indices:
            continue
        has_refs = bool(_REFS_BLOCK_RX.search(text))
        used_indices = sorted(set(all_indices))
        max_idx = max(used_indices) if used_indices else 0
        # Count sources in Sources block
        n_sources = len(_extract_existing_sources(text)) if has_refs else 0

        if not has_refs:
            out.append({"path": md, "issue": "no_sources_block", "max_marker": max_idx, "n_sources": 0})
        elif max_idx > n_sources:
            out.append({"path": md, "issue": "orphan_markers", "max_marker": max_idx, "n_sources": n_sources})
    return out


def backfill_one_page(site_key: str, entry: dict, *, dry_run: bool) -> dict:
    page_path: Path = entry["path"]
    issue = entry.get("issue", "no_sources_block")
    rel_path = str(page_path.relative_to(ROOT))
    fm, body = read(page_path)

    # Determine which [n] indices appear in the body (rendered + raw)
    used_indices = sorted(set(_all_citation_indices(body)))
    n_used = len(used_indices)
    max_idx = max(used_indices) if used_indices else 0

    if issue == "orphan_markers":
        # Strip orphan markers (indices > existing source count)
        existing = _extract_existing_sources(body)
        new_body, stripped = strip_orphan_citation_markers(body, max_valid_index=len(existing))
        if not stripped:
            return {"path": rel_path, "skipped": True, "reason": "no orphans found on second pass"}

        if dry_run:
            return {
                "path": rel_path,
                "issue": "orphan_markers",
                "n_stripped": len(stripped),
                "stripped_indices": stripped,
                "n_existing_sources": len(existing),
                "applied": False,
                "dry_run": True,
            }

        write(page_path, fm, new_body)
        msg = build_commit_message(
            site_key=site_key,
            change_type="other",
            summary=f"Strip {len(stripped)} orphan citation markers on {page_path.stem}",
            brief_excerpt=f"Body had [n] markers with n>{len(existing)} (Sources block has {len(existing)} items). Stripped orphan markers: {sorted(set(stripped))}",
        )
        try:
            commit = stage_and_commit(files=[rel_path], message=msg)
        except Exception as exc:
            return {"path": rel_path, "skipped": True, "reason": f"git commit failed: {exc}"}
        return {
            "path": rel_path,
            "issue": "orphan_markers",
            "n_stripped": len(stripped),
            "stripped_indices": sorted(set(stripped)),
            "applied": True,
            "commit": commit[:10],
        }

    # ---- issue == 'no_sources_block' (original behaviour) ----
    target_url = fm.get("canonical") or ""
    if not target_url:
        return {"path": rel_path, "skipped": True, "reason": "no canonical in frontmatter"}

    opp = lookup_opportunity_for_page(site_key, target_url)
    primary_q = (opp or {}).get("primary_query") if opp else None
    if not primary_q:
        primary_q = fm.get("h1") or fm.get("title")
    if not primary_q:
        return {"path": rel_path, "skipped": True, "reason": "could not derive primary_query"}

    topic_key = _normalise_topic(primary_q)
    cache = lookup_research_cache(topic_key)
    if not cache:
        # No cache — strip orphan markers as the safe fallback
        new_body, stripped = strip_orphan_citation_markers(body, max_valid_index=0)
        if not stripped:
            return {"path": rel_path, "skipped": True, "reason": "no research_cache and no markers to strip"}
        if dry_run:
            return {"path": rel_path, "issue": "no_sources_block_fallback_strip", "n_stripped": len(stripped), "applied": False, "dry_run": True}
        write(page_path, fm, new_body)
        msg = build_commit_message(
            site_key=site_key,
            change_type="other",
            summary=f"Strip {len(stripped)} unsupported citation markers on {page_path.stem}",
            brief_excerpt="Page had inline [n] markers but no Sources block AND no cached research to source from. Stripped markers as safe fallback.",
        )
        try:
            commit = stage_and_commit(files=[rel_path], message=msg)
        except Exception as exc:
            return {"path": rel_path, "skipped": True, "reason": f"git commit failed: {exc}"}
        return {"path": rel_path, "issue": "no_sources_block_fallback_strip", "n_stripped": len(stripped), "applied": True, "commit": commit[:10]}

    # Build sources list (cap at max used index)
    sources = []
    for r in cache[: max_idx if max_idx else 10]:
        sources.append({
            "domain": r.get("source_domain", ""),
            "url": r.get("source_url", ""),
            "title": r.get("source_title") or r.get("source_domain", ""),
            "tier": r.get("source_tier", ""),
        })
    if not sources:
        return {"path": rel_path, "skipped": True, "reason": "cache yielded no usable sources"}

    # If max_idx > len(sources), strip the orphans too
    new_body = body
    stripped: list[int] = []
    if max_idx > len(sources):
        new_body, stripped = strip_orphan_citation_markers(body, max_valid_index=len(sources))

    refs_block = _build_merged_refs_html(sources)
    new_body = new_body.rstrip() + "\n\n" + refs_block + "\n"

    if dry_run:
        return {
            "path": rel_path,
            "issue": "no_sources_block",
            "n_cite_markers": n_used,
            "max_marker_index": max_idx,
            "n_sources_in_cache": len(cache),
            "n_sources_in_block": len(sources),
            "n_stripped_orphans": len(stripped),
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
        entries = find_pages_needing_backfill(site_key)
        n_orphan = sum(1 for e in entries if e["issue"] == "orphan_markers")
        n_missing = sum(1 for e in entries if e["issue"] == "no_sources_block")
        print(f"\n=== {site_key}: {len(entries)} page(s)  (missing_block={n_missing}, orphan_markers={n_orphan}) ===")
        for entry in entries:
            res = backfill_one_page(site_key, entry, dry_run=dry_run)
            slug = entry["path"].stem[:50]
            issue = entry["issue"]
            if res.get("applied"):
                if res.get("n_stripped") is not None:
                    print(f"  APPLIED  {slug:52s} [{issue}]  stripped {res['n_stripped']} orphan markers  commit={res.get('commit')}")
                else:
                    print(f"  APPLIED  {slug:52s} [{issue}]  {res['n_cite_markers']} markers, {res['n_sources_in_block']} sources  commit={res.get('commit')}")
            elif res.get("dry_run"):
                if res.get("n_stripped") is not None:
                    print(f"  WOULD APPLY  {slug:52s} [{issue}]  strip {res['n_stripped']} orphan markers (indices: {res.get('stripped_indices')})")
                else:
                    print(f"  WOULD APPLY  {slug:52s} [{issue}]  {res['n_cite_markers']} markers, {res['n_sources_in_block']} sources")
            else:
                print(f"  SKIPPED  {slug:52s} [{issue}]  reason: {res.get('reason')}")
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
