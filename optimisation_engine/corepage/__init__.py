"""Core-page SEO optimisation engine.

Two-phase, no-DeepSeek architecture:
  Phase 1 (this module): Python gathers + structures signals into an analysis
    pack (GSC head-family + cannibalisation map + SERP + deep-extract + gaps).
  Phase 2 (conductor-driven): an Opus 4.8 subagent reads the pack scaffold and
    writes the implementation brief (`index.md`). Python cannot spawn Claude
    subagents, so the conductor invokes that step after `run_corepage_analysis`.

CLI: python -m optimisation_engine.corepage --site property --page homepage [--dry-run]
"""
from __future__ import annotations

import json
from pathlib import Path

from .config import get_core_page
from .head_keywords import (
    build_cannibalisation_map,
    pull_head_gsc,
    summarise_cannibalisation,
)
from .serp_collect import collect_head_serps
from .signal_extract import extract_competitors, extract_our_page
from .gap_compute import build_analysis_pack, compute_gaps
from .brief_corepage import build_scaffold

ROOT = Path(__file__).resolve().parents[2]


def output_dir(cfg: dict) -> Path:
    d = ROOT / "briefs" / cfg["site_key"] / cfg["page_key"]
    d.mkdir(parents=True, exist_ok=True)
    return d


def run_corepage_analysis(
    site_key: str,
    page_key: str,
    *,
    dry_run: bool = False,
    skip_serps: bool = False,
    refresh_gsc: bool = False,
) -> dict:
    """Run Phase 1 (data-gather) and write the analysis pack + brief scaffold.

    Returns a small summary dict with output paths + headline stats.
    """
    cfg = get_core_page(site_key, page_key)
    out = output_dir(cfg)
    print(f"[corepage] {site_key}/{page_key}  dry_run={dry_run} skip_serps={skip_serps}")

    # Optional GSC refresh (never in dry-run — it writes to Supabase).
    if refresh_gsc and not dry_run:
        from optimisation_engine.clients.gsc_query_client import GSCQueryFetcher
        print("[corepage] refreshing GSC query data (60d)...")
        GSCQueryFetcher(site_key).fetch_and_store(days=60)

    # A) head-family GSC + B) cannibalisation map
    print("[corepage] pulling head-family GSC rows...")
    head_rows = pull_head_gsc(cfg, days=90)
    cmap = build_cannibalisation_map(head_rows, cfg)
    csummary = summarise_cannibalisation(cmap, cfg)
    print(f"  {len(head_rows)} rows, {csummary['total_head_queries']} head queries, "
          f"core-page owns {csummary['homepage_owns_count']}.")

    # C) SERP -> competitors
    if skip_serps:
        serp = {"competitors": [], "probed_terms": [], "notes": ["--skip-serps set."]}
    else:
        print("[corepage] collecting head-term SERPs (DuckDuckGo)...")
        serp = collect_head_serps(cfg, dry_run=dry_run)
    print(f"  {len(serp['competitors'])} competitor domains.")

    # D) deep-extract our page + competitors
    print("[corepage] extracting our page signals...")
    our_signals = extract_our_page(cfg)
    print("[corepage] extracting competitor signals...")
    comp_signals = extract_competitors(serp["competitors"])
    print(f"  extracted {len(comp_signals['extracted'])}/{comp_signals['attempted']} competitor pages.")

    # E) quantitative gaps
    gaps = compute_gaps(our_signals, comp_signals["extracted"], cfg)

    # F) assemble pack
    pack = build_analysis_pack(
        cfg,
        head_rows=head_rows,
        cannibalisation=cmap,
        cannib_summary=csummary,
        serp=serp,
        our_signals=our_signals,
        competitor_signals=comp_signals,
        gaps=gaps,
    )

    pack_json = out / "_analysis_pack.json"
    pack_md = out / "_analysis_pack.md"
    scaffold_md = out / "_brief_scaffold.md"
    pack_json.write_text(json.dumps(pack, indent=2, default=str), encoding="utf-8")
    pack_md.write_text(pack["readable_md"], encoding="utf-8")
    scaffold_md.write_text(build_scaffold(cfg, pack), encoding="utf-8")

    print(f"[corepage] wrote:\n  {pack_json}\n  {pack_md}\n  {scaffold_md}")
    return {
        "site_key": site_key,
        "page_key": page_key,
        "analysis_pack_json": str(pack_json),
        "analysis_pack_md": str(pack_md),
        "brief_scaffold_md": str(scaffold_md),
        "head_queries": csummary["total_head_queries"],
        "head_impressions": csummary["total_head_impressions"],
        "core_page_owns": csummary["homepage_owns_count"],
        "national_impr_not_on_core": csummary["national_impressions_not_on_homepage"],
        "competitors_extracted": len(comp_signals["extracted"]),
        "our_extracted_ok": gaps["our_extracted_ok"],
        "h1_is_keywordless": gaps["headline_keyword"]["h1_is_keywordless"],
    }
