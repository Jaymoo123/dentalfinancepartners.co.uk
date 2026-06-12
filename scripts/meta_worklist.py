"""
meta_worklist.py — SERP meta-optimisation program: worklist generator.

CLI:
    python scripts/meta_worklist.py --site <key> [--days 90] [--cap 40] [--min-impressions 5]

For the given site:
  1. Pull per-page query demand from gsc_query_data + bing_query_data, merge per
     (page_url, query). Sum impressions + clicks across engines; keep best (lowest)
     position; record which engines contributed.
  2. Pull gsc_page_performance page-level totals (unthresholded, last N days).
  3. Resolve each page_url to a repo markdown file by matching the slug (last URL
     segment) against filename or frontmatter `slug` field, searching all relevant
     content dirs recursively.
  4. Score each resolved page by CTR opportunity: expected_ctr(position) - actual_ctr,
     weighted by total impressions.
  5. Write:
       .cache/meta_program/<site>/worklist.json
       docs/<site-docs-dir>/opportunity_register_meta_<YYYY-MM-DD>.md

Read-only against Supabase. Writes only to .cache/ and docs/.
No git commits.
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
from collections import defaultdict
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.competitor._db import _sql  # noqa: E402 — Management API helper
from optimisation_engine.config import get_site  # noqa: E402

# ---------------------------------------------------------------------------
# Site config: content dirs + docs dir + prod domain
# ---------------------------------------------------------------------------

def _site_config(site_key: str) -> dict:
    """Return {content_dirs, docs_dir, prod_domain} for a site.

    content_dirs is a list of absolute Path objects — all dirs that can hold
    blog/guide .md files with metaTitle frontmatter. Searched recursively.
    docs_dir is repo-relative (str).
    """
    row = get_site(site_key)

    prod_domain = ("https://" + row["domain"].lstrip("https://").lstrip("http://")).rstrip("/")

    # Primary content dir from the Supabase sites table.
    # NOTE: the 'agency' row has 'Digital Agency/web/content/blog' in Supabase
    # but the actual on-disk path is 'digital-agency/web/content/blog'.
    # We normalise via _resolve_content_dir() below.
    primary_raw = row.get("content_dir") or ""

    # Per-site secondary content dirs (guides etc.) that share the same
    # frontmatter shape (metaTitle / metaDescription / slug).
    secondary_map: dict[str, list[str]] = {
        "dentists":   ["Dentists/web/content/dental-guides"],
        "solicitors": ["Solicitors/web/content/solicitor-guides"],
        "generalist": ["generalist/web/content/fundamentals"],
        "agency":     ["digital-agency/web/content/fundamentals"],
        "medical":    [],
        "property":   [],
    }

    # Per-site docs directory (repo-relative, used for opportunity_register output).
    docs_map: dict[str, str] = {
        "property":   "docs/property",
        "dentists":   "docs/dentists",
        "solicitors": "docs/solicitors",
        "medical":    "docs/medical",
        "generalist": "docs/generalist",
        "agency":     "docs/agency",
    }

    content_dirs: list[Path] = []
    for raw in [primary_raw] + secondary_map.get(site_key, []):
        p = _resolve_content_dir(raw)
        if p and p.exists():
            content_dirs.append(p)
        else:
            print(f"  [WARN] content dir does not exist, skipping: {raw} -> {p}", file=sys.stderr)

    docs_dir = docs_map.get(site_key, f"docs/{site_key}")

    return {
        "content_dirs": content_dirs,
        "docs_dir": docs_dir,
        "prod_domain": prod_domain,
    }


def _resolve_content_dir(raw: str) -> Path | None:
    """Resolve a content dir path to an absolute Path.

    Handles the known discrepancy where Supabase stores 'Digital Agency/...'
    but the on-disk path is 'digital-agency/...'.
    """
    if not raw:
        return None
    # Try as-is first
    p = ROOT / raw
    if p.exists():
        return p
    # Lowercase + hyphenate the first segment
    parts = Path(raw).parts
    if parts:
        lowered = parts[0].lower().replace(" ", "-")
        alt = ROOT / lowered / Path(*parts[1:]) if len(parts) > 1 else ROOT / lowered
        if alt.exists():
            return alt
    return p  # Return non-existent path — caller logs the warning


# ---------------------------------------------------------------------------
# CTR expectation curve
# ---------------------------------------------------------------------------

def _expected_ctr(position: float | None) -> float:
    """Simple position -> expected CTR curve (gross averages, UK organic)."""
    if position is None:
        return 0.005
    if position <= 1:
        return 0.28
    if position <= 2:
        return 0.15
    if position <= 3:
        return 0.10
    if position <= 4:
        return 0.07
    if position <= 5:
        return 0.05
    if position <= 10:
        return 0.03
    if position <= 20:
        return 0.012
    return 0.005


# ---------------------------------------------------------------------------
# Supabase pulls
# ---------------------------------------------------------------------------

def _pull_gsc_queries(site: str, days: int) -> list[dict]:
    """Pull all GSC query rows for the site in the last `days` days."""
    return _sql(f"""
        SELECT page_url, query,
               SUM(impressions) AS impressions,
               SUM(clicks) AS clicks,
               ROUND(AVG(position)::numeric, 2) AS avg_position
        FROM gsc_query_data
        WHERE site_key = '{site}'
          AND date > now() - interval '{days} days'
        GROUP BY page_url, query
        ORDER BY page_url, impressions DESC;
    """)


def _pull_bing_queries(site: str) -> list[dict]:
    """Pull Bing query rows for the site (latest snapshot only)."""
    return _sql(f"""
        SELECT page_url, query,
               SUM(impressions) AS impressions,
               SUM(clicks) AS clicks,
               ROUND(AVG(position)::numeric, 1) AS avg_position
        FROM bing_query_data
        WHERE site_key = '{site}'
          AND date = (SELECT MAX(date) FROM bing_query_data WHERE site_key = '{site}')
        GROUP BY page_url, query
        ORDER BY page_url, impressions DESC;
    """)


def _pull_page_perf(site: str, days: int) -> list[dict]:
    """Pull gsc_page_performance page-level totals for the site.

    gsc_page_performance uses 'niche' (not site_key) and has rows per date.
    We sum over the last N days.
    """
    # Determine the niche value: same as site_key for all current sites.
    return _sql(f"""
        SELECT page_url,
               SUM(impressions) AS total_impressions,
               SUM(clicks) AS total_clicks,
               ROUND(AVG(position)::numeric, 2) AS avg_position
        FROM gsc_page_performance
        WHERE niche = '{site}'
          AND date > now() - interval '{days} days'
        GROUP BY page_url
        ORDER BY total_impressions DESC;
    """)


# ---------------------------------------------------------------------------
# Merge GSC + Bing per (page_url, query)
# ---------------------------------------------------------------------------

def _merge_queries(gsc_rows: list[dict], bing_rows: list[dict]) -> dict[str, dict[str, dict]]:
    """Merge GSC and Bing query rows.

    Returns: {page_url: {query_lower: {query, impressions, clicks, best_position, engines}}}
    """
    merged: dict[str, dict[str, dict]] = defaultdict(dict)

    def _ingest(rows: list[dict], src: str) -> None:
        for r in rows:
            page = (r.get("page_url") or "").strip()
            q = (r.get("query") or "").strip()
            if not page or not q:
                continue
            key = q.lower()
            impr = int(r.get("impressions") or 0)
            clk = int(r.get("clicks") or 0)
            pos_raw = r.get("avg_position")
            pos = float(pos_raw) if pos_raw is not None else None

            page_d = merged[page]
            if key not in page_d:
                page_d[key] = {
                    "query": q,
                    "impressions": impr,
                    "clicks": clk,
                    "best_position": pos,
                    "engines": [src],
                }
            else:
                m = page_d[key]
                m["impressions"] += impr
                m["clicks"] += clk
                if pos is not None and (m["best_position"] is None or pos < m["best_position"]):
                    m["best_position"] = pos
                if src not in m["engines"]:
                    m["engines"].append(src)

    _ingest(gsc_rows, "gsc")
    _ingest(bing_rows, "bing")
    return merged


# ---------------------------------------------------------------------------
# Slug extraction + file resolver
# ---------------------------------------------------------------------------

def _slug_from_url(url: str) -> str:
    """Extract the last non-empty path segment as the slug."""
    parts = [p for p in url.rstrip("/").split("/") if p]
    return parts[-1] if parts else ""


def _build_slug_index(content_dirs: list[Path]) -> dict[str, Path]:
    """Build {slug_key -> absolute_path} index over all content dirs.

    slug_key is lowercased. Matching priority:
      1. Frontmatter `slug` field (exact match).
      2. Filename stem (file.stem.lower()).

    Files in all content dirs are indexed; the index is built once and reused.
    Files whose frontmatter does NOT contain metaTitle are skipped (Property
    resources, etc.).
    """
    index: dict[str, Path] = {}
    for cdir in content_dirs:
        for fpath in cdir.rglob("*.md"):
            try:
                text = fpath.read_text(encoding="utf-8")
            except OSError:
                continue
            # Require metaTitle in frontmatter (cheap check before full parse).
            if "metaTitle" not in text:
                continue
            # Try frontmatter slug field.
            fm_slug_match = re.search(r"^slug:\s*['\"]?([^'\"\n]+)['\"]?\s*$", text, re.MULTILINE)
            if fm_slug_match:
                key = fm_slug_match.group(1).strip().lower()
                if key and key not in index:
                    index[key] = fpath
            # Also index by filename stem (may be the same, or a fallback).
            stem_key = fpath.stem.lower()
            if stem_key not in index:
                index[stem_key] = fpath

    return index


def _resolve_page_url(url: str, slug_index: dict[str, Path]) -> Path | None:
    """Attempt to resolve a page_url to a repo .md file."""
    slug = _slug_from_url(url)
    if not slug:
        return None
    return slug_index.get(slug.lower())


# ---------------------------------------------------------------------------
# Intent mismatch check (light stdlib token check, no ML)
# ---------------------------------------------------------------------------

_STOP_WORDS = {
    "a", "an", "the", "for", "to", "of", "in", "on", "at", "by", "up", "uk",
    "and", "or", "with", "vs", "your", "my", "how", "what", "is", "are", "do",
    "can", "i", "it", "be", "as", "if", "you", "we", "he", "she", "they",
    "from", "this", "that", "get", "has", "have", "was", "were",
}


def _content_tokens(text: str) -> set[str]:
    """Extract significant lowercased tokens from a string (no stopwords, >=3 chars)."""
    words = re.findall(r"[a-z]{3,}", text.lower())
    return {w for w in words if w not in _STOP_WORDS}


def _query_covered_by_title(query: str, title: str) -> bool:
    """True if at least one significant token from query appears in title."""
    q_tokens = _content_tokens(query)
    t_tokens = _content_tokens(title)
    return bool(q_tokens & t_tokens)


# ---------------------------------------------------------------------------
# Main worklist builder
# ---------------------------------------------------------------------------

def build_worklist(
    site: str,
    days: int = 90,
    cap: int = 40,
    min_impressions: int = 5,
) -> tuple[list[dict], list[dict]]:
    """Build the CTR-opportunity worklist and unresolved opportunity list.

    Returns: (worklist_entries, opportunity_register_entries)
    """
    cfg = _site_config(site)
    content_dirs = cfg["content_dirs"]

    print(f"[meta_worklist] site={site} days={days} cap={cap} min_impressions={min_impressions}")
    print(f"  content_dirs: {[str(d) for d in content_dirs]}")

    # --- Pull data -----------------------------------------------------------
    print("  Pulling GSC query data ...")
    gsc_rows: list[dict] = []
    try:
        gsc_rows = _pull_gsc_queries(site, days)
        print(f"  -> {len(gsc_rows)} GSC query rows")
    except Exception as exc:
        print(f"  [WARN] GSC pull failed: {exc}", file=sys.stderr)

    print("  Pulling Bing query data ...")
    bing_rows: list[dict] = []
    try:
        bing_rows = _pull_bing_queries(site)
        print(f"  -> {len(bing_rows)} Bing query rows")
    except Exception as exc:
        print(f"  [WARN] Bing pull failed: {exc}", file=sys.stderr)

    print("  Pulling page performance data ...")
    perf_rows: list[dict] = []
    try:
        perf_rows = _pull_page_perf(site, days)
        print(f"  -> {len(perf_rows)} page-perf rows")
    except Exception as exc:
        print(f"  [WARN] Page-perf pull failed: {exc}", file=sys.stderr)

    # --- Page-perf index: page_url -> {total_impressions, total_clicks, avg_position} ---
    perf_index: dict[str, dict] = {}
    for r in perf_rows:
        pu = (r.get("page_url") or "").strip()
        if pu:
            perf_index[pu] = {
                "total_impressions": int(r.get("total_impressions") or 0),
                "total_clicks": int(r.get("total_clicks") or 0),
                "avg_position": float(r["avg_position"]) if r.get("avg_position") is not None else None,
            }

    # --- Merge queries per page ----------------------------------------------
    merged_by_page = _merge_queries(gsc_rows, bing_rows)

    # Build a unified page set from both query data and page-perf data.
    all_page_urls: set[str] = set(merged_by_page.keys()) | set(perf_index.keys())

    # --- Build slug index ----------------------------------------------------
    print("  Indexing content files ...")
    slug_index = _build_slug_index(content_dirs)
    print(f"  -> {len(slug_index)} slug -> file mappings")

    # --- Score pages ---------------------------------------------------------
    worklist_raw: list[dict] = []
    opportunity_register: list[dict] = []

    for page_url in all_page_urls:
        # Merge page-level stats from gsc_page_performance + query-level rollup.
        perf = perf_index.get(page_url, {})
        query_map = merged_by_page.get(page_url, {})

        # Compute page-level totals from query-level data (as a fallback / complement).
        q_impr = sum(q["impressions"] for q in query_map.values())
        q_clk = sum(q["clicks"] for q in query_map.values())

        # Use perf-table totals when available (more complete), otherwise fall
        # back to query-level sum.
        total_impressions = perf.get("total_impressions") or q_impr
        total_clicks = perf.get("total_clicks") or q_clk

        # Best position from query-level data (minimum observed position).
        best_position: float | None = None
        for q in query_map.values():
            bp = q.get("best_position")
            if bp is not None and (best_position is None or bp < best_position):
                best_position = bp
        if best_position is None:
            best_position = perf.get("avg_position")

        actual_ctr = (total_clicks / total_impressions) if total_impressions > 0 else 0.0
        expected_ctr = _expected_ctr(best_position)
        score = total_impressions * max(0.0, expected_ctr - actual_ctr)

        # Include pages with no clicks at all if impressions >= min_impressions.
        if total_impressions < min_impressions and total_clicks > 0:
            continue

        # Sorted queries for this page.
        top_queries = sorted(
            [
                {
                    "query": v["query"],
                    "impressions": v["impressions"],
                    "clicks": v["clicks"],
                    "best_position": v["best_position"],
                    "engines": v["engines"],
                }
                for v in query_map.values()
            ],
            key=lambda x: x["impressions"],
            reverse=True,
        )[:15]

        dominant_query = top_queries[0]["query"] if top_queries else ""

        # Try to resolve to a .md file.
        md_path = _resolve_page_url(page_url, slug_index)
        slug = _slug_from_url(page_url)

        if md_path is None:
            # Unresolved (TSX-routed, homepage, /for-*, calculators, etc.)
            opportunity_register.append({
                "page_url": page_url,
                "slug": slug,
                "reason": "no_md_file",
                "total_impressions": total_impressions,
                "total_clicks": total_clicks,
                "best_position": best_position,
                "dominant_query": dominant_query,
                "top_queries": top_queries[:5],
            })
            continue

        # Read current meta from frontmatter.
        current_metaTitle = ""
        current_metaDescription = ""
        try:
            text = md_path.read_text(encoding="utf-8")
            mt = re.search(r"^metaTitle:\s*['\"]?(.+?)['\"]?\s*$", text, re.MULTILINE)
            md = re.search(r"^metaDescription:\s*['\"]?(.+?)['\"]?\s*$", text, re.MULTILINE)
            if mt:
                current_metaTitle = mt.group(1).strip()
            if md:
                current_metaDescription = md.group(1).strip()
        except OSError:
            pass

        # Check high-impression queries whose content tokens don't appear in the title.
        for tq in top_queries:
            if tq["impressions"] >= 20 and dominant_query == tq["query"]:
                if current_metaTitle and not _query_covered_by_title(tq["query"], current_metaTitle):
                    opportunity_register.append({
                        "page_url": page_url,
                        "slug": slug,
                        "reason": "query_not_in_title",
                        "query": tq["query"],
                        "impressions": tq["impressions"],
                        "current_metaTitle": current_metaTitle,
                    })

        repo_rel = str(md_path.relative_to(ROOT)).replace("\\", "/")

        worklist_raw.append({
            "slug": slug,
            "file": repo_rel,
            "page_url": page_url,
            "current_metaTitle": current_metaTitle,
            "current_metaDescription": current_metaDescription,
            "total_impressions": total_impressions,
            "total_clicks": total_clicks,
            "best_position": best_position,
            "actual_ctr": round(actual_ctr, 5),
            "expected_ctr": round(expected_ctr, 5),
            "score": round(score, 2),
            "dominant_query": dominant_query,
            "top_queries": top_queries,
        })

    # Sort by score desc, cap.
    worklist = sorted(worklist_raw, key=lambda x: x["score"], reverse=True)[:cap]

    return worklist, opportunity_register


# ---------------------------------------------------------------------------
# Output writers
# ---------------------------------------------------------------------------

def _write_worklist_json(site: str, worklist: list[dict]) -> Path:
    out_dir = ROOT / ".cache" / "meta_program" / site
    out_dir.mkdir(parents=True, exist_ok=True)
    out = out_dir / "worklist.json"
    out.write_text(json.dumps(worklist, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"  Written: {out.relative_to(ROOT)}")
    return out


def _write_opportunity_register(
    site: str,
    docs_dir: str,
    worklist: list[dict],
    register_entries: list[dict],
) -> Path:
    today = date.today().isoformat()
    out_dir = ROOT / docs_dir
    out_dir.mkdir(parents=True, exist_ok=True)
    out = out_dir / f"opportunity_register_meta_{today}.md"

    # High-impression query -> title mismatch from worklist (dominant query not in title).
    intent_mismatches = [
        e for e in register_entries if e.get("reason") == "query_not_in_title"
    ]
    unresolved = [e for e in register_entries if e.get("reason") == "no_md_file"]

    lines = [
        f"# Meta Opportunity Register — {site} — {today}",
        "",
        "> **REGISTER ONLY — no action taken.** This file is auto-generated by",
        "> `scripts/meta_worklist.py`. It identifies pages and queries requiring",
        "> human review. No files have been modified.",
        "",
        "---",
        "",
    ]

    # Section 1: Unresolved pages (TSX/core, no .md file)
    lines += [
        "## 1. Unresolved pages (TSX-routed / no markdown file)",
        "",
        "These pages have GSC/Bing query demand but do not resolve to a blog .md file.",
        "They include the homepage, /for-* service pages, calculators, and other",
        "TSX-routed routes. Meta changes for these pages require direct TSX/JSX edits.",
        "",
    ]
    if unresolved:
        lines += ["| Page URL | Impressions | Clicks | Dominant query |",
                  "|---|---|---|---|"]
        for e in sorted(unresolved, key=lambda x: x.get("total_impressions", 0), reverse=True)[:40]:
            dq = (e.get("dominant_query") or "").replace("|", "/")
            lines.append(
                f"| `{e['page_url']}` | {e.get('total_impressions',0)} "
                f"| {e.get('total_clicks',0)} | {dq} |"
            )
    else:
        lines.append("_No unresolved pages with sufficient demand._")
    lines.append("")

    # Section 2: Queries with >=20 impressions where title has no content token match
    lines += [
        "## 2. High-impression queries not reflected in page title",
        "",
        "Queries with >= 20 combined impressions where the landing page metaTitle",
        "contains none of the query's content tokens (light token check).",
        "",
    ]
    if intent_mismatches:
        lines += ["| Page | Query | Impressions | Current metaTitle |",
                  "|---|---|---|---|"]
        for e in sorted(intent_mismatches, key=lambda x: x.get("impressions", 0), reverse=True)[:30]:
            q = (e.get("query") or "").replace("|", "/")
            mt = (e.get("current_metaTitle") or "").replace("|", "/")
            lines.append(f"| `{e.get('slug','')}` | {q} | {e.get('impressions',0)} | {mt} |")
    else:
        lines.append("_No high-impression token mismatches found._")
    lines.append("")

    # Section 3: Intent mismatches — top worklist pages where dominant query
    # seems misaligned with title (dominant query tokens not in title).
    intent_mismatch_worklist = [
        w for w in worklist
        if w.get("dominant_query")
        and w.get("current_metaTitle")
        and not _query_covered_by_title(w["dominant_query"], w["current_metaTitle"])
    ]
    lines += [
        "## 3. Worklist pages with apparent intent mismatch",
        "",
        "Pages in the worklist where the dominant search query shares no content",
        "tokens with the current metaTitle. These are strong candidates for rewrite.",
        "",
    ]
    if intent_mismatch_worklist:
        lines += ["| Slug | Score | Dominant query | Current metaTitle |",
                  "|---|---|---|---|"]
        for w in intent_mismatch_worklist[:20]:
            dq = (w.get("dominant_query") or "").replace("|", "/")
            mt = (w.get("current_metaTitle") or "").replace("|", "/")
            lines.append(f"| `{w['slug']}` | {w['score']:.1f} | {dq} | {mt} |")
    else:
        lines.append("_No clear intent mismatches in the worklist._")
    lines.append("")

    lines += [
        "---",
        "",
        f"_Generated by `scripts/meta_worklist.py --site {site}` on {today}._",
        "_See `.cache/meta_program/{site}/worklist.json` for the scored worklist._",
    ]

    out.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"  Written: {out.relative_to(ROOT)}")
    return out


# ---------------------------------------------------------------------------
# CLI entry point
# ---------------------------------------------------------------------------

def main() -> int:
    parser = argparse.ArgumentParser(
        description=(
            "SERP meta-optimisation: generate a CTR-opportunity worklist for a site. "
            "Reads Supabase + repo files. Writes to .cache/meta_program/<site>/ and docs/. "
            "No Supabase writes, no git commits."
        )
    )
    parser.add_argument(
        "--site", required=True,
        help="site_key (dentists|property|medical|solicitors|generalist|agency)",
    )
    parser.add_argument(
        "--days", type=int, default=90,
        help="GSC lookback window in days (default 90)",
    )
    parser.add_argument(
        "--cap", type=int, default=40,
        help="Maximum entries in the worklist (default 40)",
    )
    parser.add_argument(
        "--min-impressions", type=int, default=5,
        help="Minimum total impressions to include a page (default 5)",
    )
    args = parser.parse_args()

    cfg = _site_config(args.site)

    worklist, register = build_worklist(
        site=args.site,
        days=args.days,
        cap=args.cap,
        min_impressions=args.min_impressions,
    )

    print(f"\n  Worklist: {len(worklist)} pages scored")
    print(f"  Opportunity register: {len(register)} entries")

    _write_worklist_json(args.site, worklist)
    _write_opportunity_register(args.site, cfg["docs_dir"], worklist, register)

    return 0


if __name__ == "__main__":
    sys.exit(main())
