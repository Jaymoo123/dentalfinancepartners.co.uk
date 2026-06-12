"""
rewrite_worklist.py — ranking-grade full rewrite prioritisation program.

CLI:
    python scripts/rewrite_worklist.py --site <key>
    python scripts/rewrite_worklist.py --all          # runs all 5 sites

For each site:
  1. Load provenance inventory (.cache/provenance/<site>/inventory.json).
  2. Pull 90-day GSC query data + latest Bing snapshot from Supabase.
  3. Compute per-page trajectory from time-stratified GSC windows.
  4. Score pages for full content rewrite (distinct from CTR/meta scoring).
  5. Assign tiers A/B/C/watch and deterministic topical batches.
  6. Write .cache/rewrite_program/<site>/worklist.json
     and docs/<site-docs-dir>/rewrite_worklist_2026-06-12.md.

Excluded eras: track2-rewritten, opus-wave (already ranking-grade).
Scored eras:   deepseek (1.5x), ambiguous (1.2x), claude-supabase (1.0x).

Read-only against Supabase. No git commits.
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
from collections import defaultdict
from datetime import date, datetime, timedelta
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.competitor._db import _sql  # noqa: E402

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

SITES = ["dentists", "medical", "solicitors", "generalist", "agency"]

EXCLUDED_ERAS = {"track2-rewritten", "opus-wave"}

ERA_FACTOR: dict[str, float] = {
    "deepseek": 1.5,
    "ambiguous": 1.2,
    "claude-supabase": 1.0,
}

TRAJECTORY_FACTOR: dict[str, float] = {
    "declining": 1.5,
    "dormant": 1.3,
    "stable": 1.0,
    "trivial": 1.0,
    "improving": 0.6,
    "emerging": 0.5,
}

# Batch sizing
BATCH_MIN = 10
BATCH_MAX = 13

META_COOLDOWN_UNTIL = "2026-06-26"

# Output date for filenames
OUTPUT_DATE = "2026-06-12"

# ---------------------------------------------------------------------------
# Site config (mirrors meta_worklist.py; content dirs + docs dir + domain)
# ---------------------------------------------------------------------------

_SITE_CONTENT_DIRS: dict[str, list[str]] = {
    # (relative to ROOT)
    "dentists": [
        "Dentists/web/content/blog",
        "Dentists/web/content/dental-guides",
    ],
    "medical": [
        "Medical/web/content/blog",
    ],
    "solicitors": [
        "Solicitors/web/content/blog",
        "Solicitors/web/content/solicitor-guides",
    ],
    "generalist": [
        "generalist/web/content/blog",
        "generalist/web/content/fundamentals",
    ],
    "agency": [
        "digital-agency/web/content/blog",
        "digital-agency/web/content/fundamentals",
    ],
}

_SITE_DOCS_DIR: dict[str, str] = {
    "dentists": "docs/dentists",
    "medical": "docs/medical",
    "solicitors": "docs/solicitors",
    "generalist": "docs/generalist",
    "agency": "docs/agency",
}

_SITE_DOMAIN: dict[str, str] = {
    "dentists": "https://www.dentalfinancepartners.co.uk",
    "medical": "https://www.medicalaccounts.co.uk",
    "solicitors": "https://www.accountsforlawyers.co.uk",
    "generalist": "https://www.hollowaydavies.co.uk",
    "agency": "https://www.agencyfounderfinance.co.uk",
}

# ---------------------------------------------------------------------------
# Stopwords for topical clustering
# ---------------------------------------------------------------------------

_STOP_WORDS = {
    "a", "an", "the", "for", "to", "of", "in", "on", "at", "by", "up", "uk",
    "and", "or", "with", "vs", "your", "my", "how", "what", "is", "are", "do",
    "can", "i", "it", "be", "as", "if", "you", "we", "he", "she", "they",
    "from", "this", "that", "get", "has", "have", "was", "were", "tax", "guide",
}


def _slug_tokens(slug: str) -> set[str]:
    """Extract significant tokens from a slug for topical clustering."""
    words = re.findall(r"[a-z]{3,}", slug.lower())
    return {w for w in words if w not in _STOP_WORDS}


# ---------------------------------------------------------------------------
# Provenance inventory loader
# ---------------------------------------------------------------------------

def _load_inventory(site: str) -> list[dict]:
    path = ROOT / ".cache" / "provenance" / site / "inventory.json"
    if not path.exists():
        print(f"  [WARN] No provenance inventory at {path}", file=sys.stderr)
        return []
    return json.loads(path.read_text(encoding="utf-8"))


# ---------------------------------------------------------------------------
# Meta-cooldown loader
# ---------------------------------------------------------------------------

def _load_meta_cooldown_urls(site: str) -> set[str]:
    """Return set of page_urls that received a meta change in the June batch."""
    p = ROOT / ".cache" / "meta_program" / site / "changed_urls.txt"
    if not p.exists():
        return set()
    lines = p.read_text(encoding="utf-8").strip().splitlines()
    return {ln.strip() for ln in lines if ln.strip()}


# ---------------------------------------------------------------------------
# Supabase pulls (reusing exact query pattern from meta_worklist.py)
# ---------------------------------------------------------------------------

def _pull_gsc_queries(site: str, days: int = 90) -> list[dict]:
    return _sql(f"""
        SELECT page_url, query,
               SUM(impressions) AS impressions,
               SUM(clicks)      AS clicks,
               ROUND(AVG(position)::numeric, 2) AS avg_position,
               MIN(date) AS first_date,
               MAX(date) AS last_date
        FROM gsc_query_data
        WHERE site_key = '{site}'
          AND date > now() - interval '{days} days'
        GROUP BY page_url, query
        ORDER BY page_url, impressions DESC;
    """)


def _pull_bing_queries(site: str) -> list[dict]:
    return _sql(f"""
        SELECT page_url, query,
               SUM(impressions) AS impressions,
               SUM(clicks)      AS clicks,
               ROUND(AVG(position)::numeric, 1) AS avg_position
        FROM bing_query_data
        WHERE site_key = '{site}'
          AND date = (SELECT MAX(date) FROM bing_query_data WHERE site_key = '{site}')
        GROUP BY page_url, query
        ORDER BY page_url, impressions DESC;
    """)


def _pull_gsc_daily(site: str, days: int = 90) -> list[dict]:
    """Pull daily per-page impression totals for trajectory computation."""
    return _sql(f"""
        SELECT page_url, date, SUM(impressions) AS impressions, SUM(clicks) AS clicks
        FROM gsc_query_data
        WHERE site_key = '{site}'
          AND date > now() - interval '{days} days'
        GROUP BY page_url, date
        ORDER BY page_url, date;
    """)


# ---------------------------------------------------------------------------
# Trajectory computation (replicating time_stratified_view.py logic faithfully)
# ---------------------------------------------------------------------------

def _classify_trajectory(
    last_7d_impr: int,
    prior_21d_impr: int,
    older_impr: int,
    last_7d_days: int,
    prior_21d_days: int,
) -> str:
    """Replicate _classify_trajectory from time_stratified_view.py.

    Windows:
      last_7d:   days 1-7
      prior_21d: days 8-28
      older:     days 29-90
    """
    if last_7d_impr < 2 and prior_21d_impr < 2 and older_impr < 2:
        return "trivial"

    if prior_21d_impr == 0 and last_7d_impr >= 5:
        return "emerging"

    if last_7d_impr < 2 and prior_21d_impr >= 5:
        return "dormant"

    recent_rate = last_7d_impr / max(1, last_7d_days)
    prior_rate = prior_21d_impr / max(1, prior_21d_days)

    if prior_rate == 0:
        return "emerging" if last_7d_impr >= 2 else "trivial"

    delta = (recent_rate - prior_rate) / prior_rate

    if delta >= 0.5:
        return "improving"
    if delta <= -0.3:
        return "declining"
    return "stable"


def _build_trajectory_map(daily_rows: list[dict]) -> dict[str, str]:
    """Build page_url -> trajectory dict from daily GSC rows."""
    today = date.today()

    # Accumulate per-page window stats
    by_page: dict[str, dict] = defaultdict(lambda: {
        "last_7d_impr": 0, "prior_21d_impr": 0, "older_impr": 0,
        "last_7d_days": 0, "prior_21d_days": 0,
    })

    for row in daily_rows:
        page = (row.get("page_url") or "").strip()
        if not page:
            continue
        try:
            d = date.fromisoformat(str(row["date"]))
        except Exception:
            continue
        days_ago = (today - d).days
        impr = int(row.get("impressions") or 0)
        p = by_page[page]

        if days_ago <= 7:
            p["last_7d_impr"] += impr
            if impr > 0:
                p["last_7d_days"] += 1
        elif days_ago <= 28:
            p["prior_21d_impr"] += impr
            if impr > 0:
                p["prior_21d_days"] += 1
        elif days_ago <= 90:
            p["older_impr"] += impr

    result: dict[str, str] = {}
    for page, p in by_page.items():
        result[page] = _classify_trajectory(
            p["last_7d_impr"], p["prior_21d_impr"], p["older_impr"],
            p["last_7d_days"], p["prior_21d_days"],
        )
    return result


# ---------------------------------------------------------------------------
# Merge GSC + Bing per (page_url, query) — same pattern as meta_worklist.py
# ---------------------------------------------------------------------------

def _merge_queries(gsc_rows: list[dict], bing_rows: list[dict]) -> dict[str, dict[str, dict]]:
    """Returns {page_url: {query_lower: {query, impressions, clicks, best_position, engines}}}"""
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
# Slug / URL helpers
# ---------------------------------------------------------------------------

def _slug_from_url(url: str) -> str:
    """Extract the last non-empty path segment from a URL."""
    parts = [p for p in url.rstrip("/").split("/") if p]
    return parts[-1] if parts else ""


# ---------------------------------------------------------------------------
# Slug index builder
# ---------------------------------------------------------------------------

def _build_slug_index(content_dirs: list[Path]) -> dict[str, Path]:
    """Build {slug_key: absolute_path} over all content dirs.

    Priority: frontmatter slug field > filename stem.
    Only indexes .md files.
    """
    index: dict[str, Path] = {}
    for cdir in content_dirs:
        if not cdir.exists():
            continue
        for fpath in sorted(cdir.rglob("*.md")):
            try:
                text = fpath.read_text(encoding="utf-8", errors="replace")
            except OSError:
                continue
            fm_slug_match = re.search(r"^slug:\s*['\"]?([^'\"\n]+)['\"]?\s*$", text, re.MULTILINE)
            if fm_slug_match:
                key = fm_slug_match.group(1).strip().lower()
                if key and key not in index:
                    index[key] = fpath
            stem_key = fpath.stem.lower()
            if stem_key not in index:
                index[stem_key] = fpath

    return index


# ---------------------------------------------------------------------------
# Scoring helpers
# ---------------------------------------------------------------------------

def _position_factor(position: float | None) -> float:
    """Convert dominant-query position to rewrite urgency weight.

    pos <2    -> 0.3  (don't disrupt winners)
    pos 2-5   -> 0.6  (competitive, needs quality boost)
    pos 5-25  -> 1.0  (prime rewrite zone — page 1-2)
    pos 25-50 -> 0.5  (ranking but deep)
    pos >50   -> 0.2  (barely visible)
    None      -> 0.2
    """
    if position is None:
        return 0.2
    if position < 2:
        return 0.3
    if position <= 5:
        return 0.6
    if position <= 25:
        return 1.0
    if position <= 50:
        return 0.5
    return 0.2


def _rewrite_score(
    impressions_90d: int,
    dominant_position: float | None,
    trajectory: str,
    era: str,
) -> float:
    pf = _position_factor(dominant_position)
    tf = TRAJECTORY_FACTOR.get(trajectory, 1.0)
    ef = ERA_FACTOR.get(era, 1.0)
    return round(impressions_90d * pf * tf * ef, 3)


# ---------------------------------------------------------------------------
# Deterministic topical batch clustering
# ---------------------------------------------------------------------------

def _build_batches(
    tier_a: list[dict],
    tier_b: list[dict],
    site_prefix: str,
) -> list[dict]:
    """Assign pages from Tiers A+B into batches of 10-13.

    Algorithm:
    1. Sort: cooldown=False first, then by score desc. Cooldown pages go last.
    2. Greedy topical clustering: for each unassigned page (in sorted order),
       find the first open batch where adding it maximises token overlap with
       existing batch members. If no open batch fits (all full), start a new one.
    3. Batch IDs: <SITE>-R1, -R2... in order of creation.
    """
    all_pages = tier_a + tier_b
    if not all_pages:
        return []

    # Split cooldown vs non-cooldown pages
    normal = [p for p in all_pages if not p.get("meta_cooldown_until")]
    cooldown = [p for p in all_pages if p.get("meta_cooldown_until")]

    # Sort each group by score desc
    normal.sort(key=lambda p: p["score"], reverse=True)
    cooldown.sort(key=lambda p: p["score"], reverse=True)

    ordered = normal + cooldown

    batches: list[dict] = []  # each = {id, slugs, tokens_set, total_score}
    assigned: set[str] = set()

    def _tokens(page: dict) -> set[str]:
        return _slug_tokens(page["slug"])

    for page in ordered:
        slug = page["slug"]
        if slug in assigned:
            continue
        ptokens = _tokens(page)

        # Find best open batch (not yet full, max token overlap)
        best_idx = -1
        best_overlap = -1
        for i, b in enumerate(batches):
            if len(b["slugs"]) >= BATCH_MAX:
                continue
            overlap = len(ptokens & b["_tokens"])
            if overlap > best_overlap:
                best_overlap = overlap
                best_idx = i

        if best_idx == -1 or (best_overlap == 0 and batches and len(batches[-1]["slugs"]) >= BATCH_MIN):
            # Start new batch
            batch_id = f"{site_prefix.upper()}-R{len(batches)+1}"
            batches.append({
                "id": batch_id,
                "slugs": [slug],
                "_tokens": ptokens.copy(),
                "total_score": page["score"],
            })
        else:
            if best_idx == -1:
                # All full, start new
                batch_id = f"{site_prefix.upper()}-R{len(batches)+1}"
                batches.append({
                    "id": batch_id,
                    "slugs": [slug],
                    "_tokens": ptokens.copy(),
                    "total_score": page["score"],
                })
            else:
                b = batches[best_idx]
                b["slugs"].append(slug)
                b["_tokens"] |= ptokens
                b["total_score"] = round(b["total_score"] + page["score"], 3)

        assigned.add(slug)

    # Clean output: remove internal _tokens key
    result = []
    for b in batches:
        result.append({
            "id": b["id"],
            "slugs": b["slugs"],
            "total_score": round(b["total_score"], 3),
        })
    return result


# ---------------------------------------------------------------------------
# URL normalisation for cooldown matching
# The page_url may have nested category segment (e.g. /blog/nhs-contracts/uda-value)
# while changed_urls.txt stores the actual production URL.
# We match by last path segment (slug) OR full URL match.
# ---------------------------------------------------------------------------

def _url_in_cooldown(page_url: str, cooldown_urls: set[str]) -> bool:
    """True if page_url (or its slug) appears in the cooldown set."""
    if page_url in cooldown_urls:
        return True
    slug = _slug_from_url(page_url)
    for cu in cooldown_urls:
        if _slug_from_url(cu) == slug:
            return True
    return False


# ---------------------------------------------------------------------------
# Main per-site builder
# ---------------------------------------------------------------------------

def build_rewrite_worklist(site: str) -> dict:
    """Build the full rewrite worklist for one site.

    Returns a dict suitable for the JSON output.
    """
    print(f"\n{'='*60}")
    print(f"[rewrite_worklist] site={site}")
    print(f"{'='*60}")

    # --- Load provenance inventory -------------------------------------------
    inventory = _load_inventory(site)
    print(f"  Provenance: {len(inventory)} records")

    # Index by slug
    inv_by_slug: dict[str, dict] = {}
    for item in inventory:
        s = (item.get("slug") or "").strip().lower()
        if s:
            inv_by_slug[s] = item

    # --- Load meta cooldown set ----------------------------------------------
    cooldown_urls = _load_meta_cooldown_urls(site)
    print(f"  Meta cooldown URLs: {len(cooldown_urls)}")

    # --- Pull GSC data -------------------------------------------------------
    print("  Pulling GSC query rows (90d) ...")
    gsc_rows: list[dict] = []
    try:
        gsc_rows = _pull_gsc_queries(site, days=90)
        print(f"    -> {len(gsc_rows)} query rows")
    except Exception as exc:
        print(f"  [WARN] GSC pull failed: {exc}", file=sys.stderr)

    print("  Pulling GSC daily rows for trajectory ...")
    gsc_daily: list[dict] = []
    try:
        gsc_daily = _pull_gsc_daily(site, days=90)
        print(f"    -> {len(gsc_daily)} daily page rows")
    except Exception as exc:
        print(f"  [WARN] GSC daily pull failed: {exc}", file=sys.stderr)

    print("  Pulling Bing query rows ...")
    bing_rows: list[dict] = []
    try:
        bing_rows = _pull_bing_queries(site)
        print(f"    -> {len(bing_rows)} Bing query rows")
    except Exception as exc:
        print(f"  [WARN] Bing pull failed: {exc}", file=sys.stderr)

    # --- Build trajectory map ------------------------------------------------
    trajectory_map = _build_trajectory_map(gsc_daily)
    print(f"  Trajectory map: {len(trajectory_map)} pages")

    # --- Merge queries per page ----------------------------------------------
    merged_by_page = _merge_queries(gsc_rows, bing_rows)
    print(f"  Merged pages with query data: {len(merged_by_page)}")

    # --- Build slug index for file resolution --------------------------------
    content_dirs = [ROOT / d for d in _SITE_CONTENT_DIRS.get(site, [])]
    slug_index = _build_slug_index(content_dirs)
    print(f"  Slug index: {len(slug_index)} entries")

    # --- Build unified page set: search data pages + inventory slugs ---------
    # Key by SLUG (not page_url) to deduplicate nested vs flat URL variants
    # (e.g. /blog/category/slug and /blog/slug both resolve to the same .md).
    # Metrics are summed across URL variants; trajectory from the URL with most impressions.

    # slug_lower -> {impressions_90d, clicks_90d, dominant_query, dominant_position,
    #                trajectory, top_queries, relpath, era, confidence}
    page_data: dict[str, dict] = {}

    # Count TSX pages (no .md file); deduplicate by slug too
    skipped_tsx = 0
    skipped_tsx_slugs: set[str] = set()

    # --- Process pages with search data -------------------------------------
    for page_url, query_map in merged_by_page.items():
        slug = _slug_from_url(page_url)
        if not slug:
            continue
        slug_lower = slug.lower()

        # Attempt file resolution
        md_path = slug_index.get(slug_lower)
        if md_path is None:
            if slug_lower not in skipped_tsx_slugs:
                skipped_tsx += 1
                skipped_tsx_slugs.add(slug_lower)
            continue

        # Page-level metrics from query rollup
        impr_90d = sum(q["impressions"] for q in query_map.values())
        clicks_90d = sum(q["clicks"] for q in query_map.values())

        # Dominant query = highest impressions for this URL variant
        sorted_queries = sorted(query_map.values(), key=lambda q: q["impressions"], reverse=True)
        dominant = sorted_queries[0] if sorted_queries else None
        dominant_query = dominant["query"] if dominant else ""
        dominant_position = dominant["best_position"] if dominant else None

        trajectory = trajectory_map.get(page_url, "trivial")

        # Try inventory lookup
        inv = inv_by_slug.get(slug_lower)
        era = inv["era"] if inv else "ambiguous"
        confidence = inv["confidence"] if inv else "low"
        relpath = inv["relpath"] if inv else str(md_path.relative_to(ROOT)).replace("\\", "/")

        if slug_lower not in page_data:
            # First time we see this slug
            top_queries = [
                {
                    "query": q["query"],
                    "impressions": q["impressions"],
                    "clicks": q["clicks"],
                    "position": q["best_position"],
                    "engines": q["engines"],
                }
                for q in sorted_queries[:8]
            ]
            page_data[slug_lower] = {
                "slug": slug,
                "relpath": relpath,
                "era": era,
                "confidence": confidence,
                "impressions_90d": impr_90d,
                "clicks_90d": clicks_90d,
                "dominant_query": dominant_query,
                "dominant_position": dominant_position,
                "trajectory": trajectory,
                "top_queries": top_queries,
                "_all_page_urls": [page_url],
            }
        else:
            # Merge into existing slug record (sum metrics; keep dominant from
            # whichever URL variant has more impressions)
            existing = page_data[slug_lower]
            existing["impressions_90d"] += impr_90d
            existing["clicks_90d"] += clicks_90d
            existing["_all_page_urls"].append(page_url)
            # Keep dominant query/position from the URL with more impressions
            if impr_90d > sum(
                q["impressions"] for q in existing["top_queries"]
            ):
                existing["dominant_query"] = dominant_query
                existing["dominant_position"] = dominant_position
                existing["trajectory"] = trajectory
                new_top = [
                    {
                        "query": q["query"],
                        "impressions": q["impressions"],
                        "clicks": q["clicks"],
                        "position": q["best_position"],
                        "engines": q["engines"],
                    }
                    for q in sorted_queries[:8]
                ]
                existing["top_queries"] = new_top

    # --- Add inventory pages with no search rows (zero metrics) -------------
    # page_data is now keyed by slug_lower; just check if key exists
    for slug_lower, inv in inv_by_slug.items():
        if inv["era"] in EXCLUDED_ERAS:
            continue
        if slug_lower in page_data:
            continue  # already has search data
        # Create zero-metric record (keyed by slug_lower, matching the rest of page_data)
        relpath = inv.get("relpath", "")
        era = inv["era"]
        confidence = inv["confidence"]
        domain = _SITE_DOMAIN.get(site, "")
        synthetic_url = f"{domain}/blog/{slug_lower}"

        page_data[slug_lower] = {
            "slug": slug_lower,
            "relpath": relpath,
            "era": era,
            "confidence": confidence,
            "impressions_90d": 0,
            "clicks_90d": 0,
            "dominant_query": "",
            "dominant_position": None,
            "trajectory": "trivial",
            "top_queries": [],
            "_all_page_urls": [synthetic_url],
        }

    print(f"  Total page records: {len(page_data)} (skipped_tsx={skipped_tsx})")

    # --- Score and tier ------------------------------------------------------
    tier_a: list[dict] = []
    tier_b: list[dict] = []
    tier_c: list[dict] = []
    tier_watch: list[dict] = []

    excluded_count = 0

    for _slug_key, pd in page_data.items():
        era = pd["era"]
        slug = pd["slug"]
        impr = pd["impressions_90d"]
        clicks = pd["clicks_90d"]
        trajectory = pd["trajectory"]
        dominant_pos = pd["dominant_position"]

        # Exclude high-quality eras from all tiers
        if era in EXCLUDED_ERAS:
            excluded_count += 1
            continue

        score = _rewrite_score(impr, dominant_pos, trajectory, era)

        # Cooldown annotation: check any of the associated page_urls
        cooldown_until = None
        for purl in pd.get("_all_page_urls", []):
            if _url_in_cooldown(purl, cooldown_urls):
                cooldown_until = META_COOLDOWN_UNTIL
                break
        # Also check by slug directly (cooldown_urls may store canonical slugs)
        if cooldown_until is None and any(_slug_from_url(cu) == slug.lower() for cu in cooldown_urls):
            cooldown_until = META_COOLDOWN_UNTIL

        entry = {
            "slug": slug,
            "relpath": pd["relpath"],
            "era": era,
            "confidence": pd["confidence"],
            "score": score,
            "impressions_90d": impr,
            "clicks_90d": clicks,
            "dominant_query": pd["dominant_query"],
            "dominant_position": dominant_pos,
            "trajectory": trajectory,
            "top_queries": pd["top_queries"],
        }
        if cooldown_until:
            entry["meta_cooldown_until"] = cooldown_until

        # Tier C: deepseek, <10 impressions, 0 clicks (deferred prune decision)
        if era == "deepseek" and impr < 10 and clicks == 0:
            entry["coverage_exempt"] = True
            tier_c.append(entry)
            continue

        # Tier A: impressions_90d >= 100
        if impr >= 100:
            tier_a.append(entry)
            continue

        # Tier B: 20 <= impressions < 100 OR (declining/dormant with impr >= 10)
        if impr >= 20:
            tier_b.append(entry)
            continue
        if trajectory in ("declining", "dormant") and impr >= 10:
            tier_b.append(entry)
            continue

        # Everything else -> watch
        tier_watch.append(entry)

    # Sort tiers by score desc
    tier_a.sort(key=lambda p: p["score"], reverse=True)
    tier_b.sort(key=lambda p: p["score"], reverse=True)
    tier_c.sort(key=lambda p: p["score"], reverse=True)
    tier_watch.sort(key=lambda p: p["score"], reverse=True)

    # --- Batch assignment for Tiers A+B -------------------------------------
    site_prefix = site[:3].upper() if site != "generalist" else "GEN"
    if site == "agency":
        site_prefix = "AGN"
    elif site == "dentists":
        site_prefix = "DEN"
    elif site == "medical":
        site_prefix = "MED"
    elif site == "solicitors":
        site_prefix = "SOL"
    elif site == "generalist":
        site_prefix = "GEN"

    batches = _build_batches(tier_a, tier_b, site_prefix)

    result = {
        "generated": OUTPUT_DATE,
        "site": site,
        "tiers": {
            "A": tier_a,
            "B": tier_b,
            "C": tier_c,
            "watch": tier_watch,
        },
        "batches": batches,
        "skipped_tsx_pages": skipped_tsx,
        "excluded_era_count": excluded_count,
    }

    print(f"  Tiers: A={len(tier_a)} B={len(tier_b)} C={len(tier_c)} watch={len(tier_watch)}")
    print(f"  Batches: {len(batches)}")
    print(f"  Excluded (opus-wave/track2): {excluded_count}")

    return result


# ---------------------------------------------------------------------------
# Output writers
# ---------------------------------------------------------------------------

def _write_json(site: str, data: dict) -> Path:
    out_dir = ROOT / ".cache" / "rewrite_program" / site
    out_dir.mkdir(parents=True, exist_ok=True)
    out = out_dir / "worklist.json"
    out.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"  Written JSON: {out.relative_to(ROOT)}")
    return out


def _write_md(site: str, data: dict) -> Path:
    docs_dir = _SITE_DOCS_DIR.get(site, f"docs/{site}")
    out_dir = ROOT / docs_dir
    out_dir.mkdir(parents=True, exist_ok=True)
    out = out_dir / f"rewrite_worklist_{OUTPUT_DATE}.md"

    tiers = data["tiers"]
    batches = data["batches"]

    def _fmt_pos(pos) -> str:
        if pos is None:
            return "n/a"
        return f"{pos:.1f}"

    def _fmt_score(s) -> str:
        return f"{s:.1f}"

    def _cooldown_flag(entry: dict) -> str:
        return " *cooldown*" if entry.get("meta_cooldown_until") else ""

    lines: list[str] = [
        f"# Rewrite Worklist — {site} — {OUTPUT_DATE}",
        "",
        "> Auto-generated by `scripts/rewrite_worklist.py`. Identifies blog posts",
        "> for full ranking-grade rewrites (content overhaul), distinct from the",
        "> SERP meta program (title/description only). No files modified.",
        "",
        "---",
        "",
        "## Summary",
        "",
        f"| Tier | Count |",
        f"|------|-------|",
        f"| A (>=100 impressions) | {len(tiers['A'])} |",
        f"| B (20-99 impr / declining-dormant >=10) | {len(tiers['B'])} |",
        f"| C (deepseek, <10 impr, 0 clicks — deferred) | {len(tiers['C'])} |",
        f"| Watch (low-traction, no action) | {len(tiers['watch'])} |",
        f"| **A+B batches** | **{len(batches)}** |",
        f"| Skipped (TSX routes) | {data['skipped_tsx_pages']} |",
        f"| Excluded (opus-wave / track2-rewritten) | {data['excluded_era_count']} |",
        "",
        "---",
        "",
    ]

    # Build slug->batch mapping (needed for both Tier A and Tier B tables)
    slug_to_batch: dict[str, str] = {}
    for b in batches:
        for s in b["slugs"]:
            slug_to_batch[s] = b["id"]

    # Tier A
    lines += [
        "## Tier A — Brief-Worthy (>=100 impressions)",
        "",
        "Full depth rewrite. Prioritise by score.",
        "",
    ]
    if tiers["A"]:
        lines += [
            "| Slug | Era | Score | Impr | Clicks | Dominant query | Pos | Trajectory | Batch |",
            "|------|-----|-------|------|--------|----------------|-----|------------|-------|",
        ]

        for entry in tiers["A"]:
            slug = entry["slug"]
            dq = (entry.get("dominant_query") or "").replace("|", "/")[:50]
            batch_id = slug_to_batch.get(slug, "")
            cd = _cooldown_flag(entry)
            lines.append(
                f"| `{slug}` | {entry['era']} | {_fmt_score(entry['score'])} | "
                f"{entry['impressions_90d']} | {entry['clicks_90d']} | "
                f"{dq} | {_fmt_pos(entry['dominant_position'])} | "
                f"{entry['trajectory']} | {batch_id}{cd} |"
            )
    else:
        lines.append("_No Tier A pages._")
    lines.append("")

    # Tier B
    lines += [
        "## Tier B — Full Rewrite (20-99 impr or declining/dormant >=10 impr)",
        "",
        "Full depth rewrite. Lower urgency than Tier A.",
        "",
    ]
    if tiers["B"]:
        lines += [
            "| Slug | Era | Score | Impr | Clicks | Dominant query | Pos | Trajectory | Batch |",
            "|------|-----|-------|------|--------|----------------|-----|------------|-------|",
        ]
        for entry in tiers["B"]:
            slug = entry["slug"]
            dq = (entry.get("dominant_query") or "").replace("|", "/")[:50]
            batch_id = slug_to_batch.get(slug, "")
            cd = _cooldown_flag(entry)
            lines.append(
                f"| `{slug}` | {entry['era']} | {_fmt_score(entry['score'])} | "
                f"{entry['impressions_90d']} | {entry['clicks_90d']} | "
                f"{dq} | {_fmt_pos(entry['dominant_position'])} | "
                f"{entry['trajectory']} | {batch_id}{cd} |"
            )
    else:
        lines.append("_No Tier B pages._")
    lines.append("")

    # Batch listing
    lines += [
        "## Batch Assignments (Tiers A+B)",
        "",
        "Groups of 10-13, topically clustered. Cooldown pages pushed to later batches.",
        "",
    ]
    if batches:
        for b in batches:
            lines += [
                f"### {b['id']} (total score: {b['total_score']:.1f}, {len(b['slugs'])} pages)",
                "",
            ]
            for s in b["slugs"]:
                # Find entry for score annotation
                entry = next(
                    (e for e in tiers["A"] + tiers["B"] if e["slug"] == s),
                    None,
                )
                score_str = f" — score {_fmt_score(entry['score'])}" if entry else ""
                cd_str = " *(cooldown)*" if (entry and entry.get("meta_cooldown_until")) else ""
                lines.append(f"- `{s}`{score_str}{cd_str}")
            lines.append("")
    else:
        lines.append("_No batches (no Tier A or B pages)._")
        lines.append("")

    # Tier C
    lines += [
        "## Tier C — Deferred (deepseek, <10 impr, 0 clicks)",
        "",
        "Coverage-exempt. No batch assignment. Prune/consolidate decision deferred.",
        "",
    ]
    if tiers["C"]:
        lines += [
            "| Slug | Era | Confidence | Word count note |",
            "|------|-----|------------|-----------------|",
        ]
        for entry in tiers["C"][:60]:
            lines.append(
                f"| `{entry['slug']}` | {entry['era']} | {entry['confidence']} | "
                f"0 impr / 0 clicks |"
            )
        if len(tiers["C"]) > 60:
            lines.append(f"_...and {len(tiers['C'])-60} more. See worklist.json for full list._")
    else:
        lines.append("_No Tier C pages._")
    lines.append("")

    # Watch
    lines += [
        "## Watch List (no action)",
        "",
        f"Low-traction non-deepseek pages. {len(tiers['watch'])} pages.",
        "No batch assignment. Monitor for trajectory changes.",
        "",
    ]
    if tiers["watch"][:30]:
        lines += [
            "| Slug | Era | Score | Impr | Trajectory |",
            "|------|-----|-------|------|------------|",
        ]
        for entry in tiers["watch"][:30]:
            lines.append(
                f"| `{entry['slug']}` | {entry['era']} | "
                f"{_fmt_score(entry['score'])} | {entry['impressions_90d']} | "
                f"{entry['trajectory']} |"
            )
        if len(tiers["watch"]) > 30:
            lines.append(f"_...and {len(tiers['watch'])-30} more in worklist.json._")
    lines.append("")

    lines += [
        "---",
        "",
        f"_Generated by `scripts/rewrite_worklist.py --site {site}` on {OUTPUT_DATE}._",
        f"_Machine-readable: `.cache/rewrite_program/{site}/worklist.json`_",
    ]

    out.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"  Written MD:   {out.relative_to(ROOT)}")
    return out


# ---------------------------------------------------------------------------
# Self-verification
# ---------------------------------------------------------------------------

def verify_worklist(site: str, data: dict) -> list[str]:
    """Run self-verification checks. Returns list of finding strings."""
    findings: list[str] = []
    tiers = data["tiers"]
    all_tiered = tiers["A"] + tiers["B"] + tiers["C"] + tiers["watch"]

    # 1. No excluded-era slugs in any tier
    bad_era = [
        f"{e['slug']}({e['era']})"
        for e in all_tiered
        if e["era"] in EXCLUDED_ERAS
    ]
    if bad_era:
        findings.append(f"  FAIL: excluded-era pages in tiers: {bad_era[:5]}")
    else:
        findings.append(f"  PASS: zero track2-rewritten/opus-wave slugs in tiers")

    # 2. Every relpath exists on disk; agency paths under digital-agency/
    missing: list[str] = []
    wrong_path: list[str] = []
    for e in all_tiered:
        rp = e.get("relpath", "")
        if not rp:
            continue
        full = ROOT / rp
        if not full.exists():
            missing.append(f"{e['slug']}: {rp}")
        if site == "agency" and not rp.startswith("digital-agency/"):
            wrong_path.append(f"{e['slug']}: {rp}")

    if missing:
        findings.append(f"  WARN: {len(missing)} missing relpath(s) on disk: {missing[:3]}")
    else:
        findings.append(f"  PASS: all relpaths exist on disk ({len(all_tiered)} checked)")

    if wrong_path:
        findings.append(f"  FAIL: agency pages not under digital-agency/: {wrong_path[:3]}")
    elif site == "agency":
        findings.append(f"  PASS: all agency relpaths under digital-agency/")

    # 3. Medical page_urls: check no category segment in URLs
    if site == "medical":
        bad_urls: list[str] = []
        # Re-check the gsc data to confirm medical slugs are flat
        sample_a_slugs = [e["slug"] for e in tiers["A"][:5]]
        findings.append(f"  INFO: medical Tier A sample slugs: {sample_a_slugs}")
        # Medical provenance relpaths should be Medical/web/content/blog/<slug>.md (no category)
        for e in all_tiered[:5]:
            rp = e.get("relpath", "")
            parts = rp.replace("\\", "/").split("/")
            # Expected: Medical/web/content/blog/<slug>.md (4 parts + filename)
            if len(parts) > 5:
                bad_urls.append(rp)
        if bad_urls:
            findings.append(f"  WARN: medical pages with deep paths (possible nested): {bad_urls[:3]}")
        else:
            findings.append(f"  PASS: medical pages appear flat-routed")

    # 4. Tier counts
    findings.append(
        f"  COUNTS: A={len(tiers['A'])} B={len(tiers['B'])} C={len(tiers['C'])} "
        f"watch={len(tiers['watch'])} batches={len(data['batches'])}"
    )

    return findings


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main() -> int:
    parser = argparse.ArgumentParser(
        description=(
            "Rewrite worklist: rank blog posts for full ranking-grade content rewrites. "
            "Joins provenance inventory with GSC+Bing data. "
            "Writes to .cache/rewrite_program/<site>/ and docs/<site>/. "
            "No Supabase writes, no git commits."
        )
    )
    parser.add_argument(
        "--site",
        choices=SITES,
        help="Site key. Required unless --all is set.",
    )
    parser.add_argument(
        "--all",
        action="store_true",
        help="Run all 5 sites sequentially.",
    )
    args = parser.parse_args()

    if not args.site and not args.all:
        parser.error("Provide --site <key> or --all")

    sites_to_run = SITES if args.all else [args.site]

    all_results: dict[str, dict] = {}
    all_verify: dict[str, list[str]] = {}

    for site in sites_to_run:
        data = build_rewrite_worklist(site)
        _write_json(site, data)
        _write_md(site, data)
        verify_findings = verify_worklist(site, data)
        all_verify[site] = verify_findings
        all_results[site] = data

        print(f"\n  Verification — {site}:")
        for f in verify_findings:
            print(f)

    # Summary across all sites
    if args.all:
        print("\n" + "="*60)
        print("ESTATE SUMMARY")
        print("="*60)
        for site, data in all_results.items():
            tiers = data["tiers"]
            print(
                f"  {site:12s}: A={len(tiers['A']):3d} B={len(tiers['B']):3d} "
                f"C={len(tiers['C']):3d} watch={len(tiers['watch']):3d} "
                f"batches={len(data['batches']):2d}"
            )
        print("="*60)

    return 0


if __name__ == "__main__":
    sys.exit(main())
