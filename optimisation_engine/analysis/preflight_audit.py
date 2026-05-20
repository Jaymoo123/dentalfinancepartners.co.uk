"""Pre-flight cannibalisation + semantic-overlap audit of the optimisation queue.

Run before any apply pass. Reads the in-flight `optimisation_opportunities`
queue and produces a per-site report flagging:

  - rewrite_title_meta opportunities whose proposed primary_query is ALREADY
    being ranked by a DIFFERENT page on the same site (cannibalisation risk
    if we ship the rewrite as-is)
  - new_page opportunities whose proposed slug / title overlaps strongly with
    an existing blog post on the same site (semantic-duplicate risk)

No DB writes by default — output is a printed report and optional
machine-readable JSON. Apply pass should refuse to action any opp listed
here until an operator reviews.

Usage:
  python -m optimisation_engine.analysis.preflight_audit
  python -m optimisation_engine.analysis.preflight_audit --site property
  python -m optimisation_engine.analysis.preflight_audit --json
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
from datetime import date, timedelta
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

import httpx  # noqa: E402

from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL, get_sites  # noqa: E402

# Jaccard threshold for "this new_page opp duplicates an existing post"
NEW_PAGE_TITLE_JACCARD_THRESHOLD = 0.5

# Minimum impressions for an "other-page already ranking" finding to matter
CANNIBAL_MIN_IMPRESSIONS = 10
CANNIBAL_MAX_POSITION = 20

# Tokens to ignore in title overlap (same set as intent-dedup in detectors.py)
_STOPWORDS = {
    "the","a","an","of","for","to","in","and","or","uk","your","my","how","what","when","why","where",
    "do","does","can","should","would","will","vs","versus","it","this","that","near","me","is","are",
    "guide","complete","ultimate","explained","essentials","2025","2026","2026-27",
}


def _headers() -> dict[str, str]:
    return {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}


def _tokens(s: str) -> set[str]:
    s = (s or "").lower()
    return {t for t in re.findall(r"[a-z][a-z0-9-]+", s) if t not in _STOPWORDS and len(t) > 2}


def _jaccard(a: set[str], b: set[str]) -> float:
    if not a or not b:
        return 0.0
    return len(a & b) / len(a | b)


def _fetch_opportunities(site_key: str, opportunity_type: str) -> list[dict]:
    """Pull in-flight opportunities of a given type for a site."""
    r = httpx.get(
        f"{SUPABASE_URL}/rest/v1/optimisation_opportunities",
        headers=_headers(),
        params={
            "select": "id,site_key,opportunity_type,target_url,primary_query,target_query_cluster,score,confidence,action_plan",
            "site_key": f"eq.{site_key}",
            "opportunity_type": f"eq.{opportunity_type}",
            "status": "in.(proposed,queued,approved)",
            "limit": "500",
        },
        timeout=30.0,
    )
    r.raise_for_status()
    return r.json()


def _list_existing_posts(site_key: str) -> list[dict]:
    """List existing blog posts on disk for a site. Returns slug + title + path."""
    from optimisation_engine.config import get_site

    site = get_site(site_key)
    content_dir = site.get("content_dir")
    if not content_dir:
        return []
    full_path = ROOT / content_dir
    if not full_path.exists():
        return []

    out: list[dict] = []
    for path in full_path.rglob("*.md"):
        if path.name.startswith("_"):
            continue
        # Heuristic title extraction: first non-empty frontmatter line with title:
        # or the first H1 in the body. Falls back to slug.
        title = None
        try:
            text = path.read_text(encoding="utf-8", errors="ignore")
            # Frontmatter title
            fm_match = re.search(r"^title:\s*['\"]?(.+?)['\"]?\s*$", text, re.MULTILINE)
            if fm_match:
                title = fm_match.group(1).strip()
            else:
                h1_match = re.search(r"^# (.+)$", text, re.MULTILINE)
                if h1_match:
                    title = h1_match.group(1).strip()
        except Exception:
            pass
        slug = path.stem
        out.append({
            "slug": slug,
            "title": title or slug.replace("-", " "),
            "rel_path": str(path.relative_to(ROOT)),
        })
    return out


# -----------------------------------------------------------------------------
# Audit 1: pre-rewrite cannibalisation
# -----------------------------------------------------------------------------


def audit_rewrite_cannibalisation(site_key: str, days: int = 28) -> list[dict]:
    """For each rewrite_title_meta opportunity, check whether another page on
    the same site is already ranking for the target query.

    Returns a list of warnings, each with:
      - opportunity_id
      - target_url (being rewritten)
      - primary_query (proposed rewrite target)
      - conflicting_pages: list of {page_url, impressions, clicks, avg_position}
    """
    opps = _fetch_opportunities(site_key, "rewrite_title_meta")
    if not opps:
        return []

    cutoff = (date.today() - timedelta(days=days)).isoformat()
    warnings: list[dict] = []

    for opp in opps:
        primary_q = (opp.get("primary_query") or "").strip()
        target_url = opp.get("target_url") or ""
        if not primary_q:
            continue

        # Normalise target URL to just the path for comparison (gsc_query_data
        # stores absolute URLs; we don't know if all rows match exactly so
        # we'll compare on URL-as-stored).
        r = httpx.get(
            f"{SUPABASE_URL}/rest/v1/gsc_query_data",
            headers=_headers(),
            params={
                "select": "page_url,impressions,clicks,position",
                "site_key": f"eq.{site_key}",
                "query": f"eq.{primary_q}",
                "date": f"gte.{cutoff}",
            },
            timeout=20.0,
        )
        if r.status_code >= 400:
            continue
        rows = r.json() or []
        # Aggregate by page_url
        by_page: dict[str, dict[str, Any]] = {}
        for row in rows:
            url = row.get("page_url") or ""
            if url == target_url:
                continue  # this is the page being rewritten — not cannibalisation
            agg = by_page.setdefault(url, {"impressions": 0, "clicks": 0, "positions": []})
            agg["impressions"] += int(row.get("impressions") or 0)
            agg["clicks"] += int(row.get("clicks") or 0)
            pos = row.get("position")
            if pos is not None:
                try:
                    agg["positions"].append(float(pos))
                except (TypeError, ValueError):
                    pass

        conflicts: list[dict] = []
        for url, agg in by_page.items():
            if agg["impressions"] < CANNIBAL_MIN_IMPRESSIONS:
                continue
            avg_pos = sum(agg["positions"]) / len(agg["positions"]) if agg["positions"] else 99
            if avg_pos > CANNIBAL_MAX_POSITION:
                continue
            conflicts.append({
                "page_url": url,
                "impressions": agg["impressions"],
                "clicks": agg["clicks"],
                "avg_position": round(avg_pos, 2),
            })

        if conflicts:
            warnings.append({
                "opportunity_id": opp["id"],
                "target_url": target_url,
                "primary_query": primary_q,
                "conflicting_pages": sorted(conflicts, key=lambda c: -c["impressions"]),
                "severity": "high" if any(c["avg_position"] <= 10 for c in conflicts) else "medium",
            })

    return warnings


# -----------------------------------------------------------------------------
# Audit 2: semantic-overlap of new_page candidates
# -----------------------------------------------------------------------------


def audit_new_page_overlap(site_key: str) -> list[dict]:
    """For each new_page opportunity, compute Jaccard overlap against existing
    blog posts on disk (titles + slugs combined).

    Returns warnings where overlap >= NEW_PAGE_TITLE_JACCARD_THRESHOLD.
    """
    opps = _fetch_opportunities(site_key, "new_page")
    if not opps:
        return []

    posts = _list_existing_posts(site_key)
    if not posts:
        return []

    # Pre-tokenise existing posts
    post_tokens = [
        (p["slug"], p["title"], _tokens(p["title"] + " " + p["slug"]))
        for p in posts
    ]

    warnings: list[dict] = []
    for opp in opps:
        primary_q = opp.get("primary_query") or ""
        plan = opp.get("action_plan") or {}
        patch = plan.get("patch") or {}
        np_patch = patch.get("new_page") or {}
        proposed_slug = np_patch.get("proposed_slug") or ""
        primary_h1 = np_patch.get("primary_h1") or ""

        candidate_tokens = _tokens(primary_q + " " + proposed_slug + " " + primary_h1)
        if not candidate_tokens:
            continue

        matches: list[dict] = []
        for slug, title, tokens in post_tokens:
            j = _jaccard(candidate_tokens, tokens)
            if j >= NEW_PAGE_TITLE_JACCARD_THRESHOLD:
                matches.append({
                    "existing_slug": slug,
                    "existing_title": title,
                    "jaccard": round(j, 3),
                })

        if matches:
            warnings.append({
                "opportunity_id": opp["id"],
                "primary_query": primary_q,
                "proposed_slug": proposed_slug,
                "primary_h1": primary_h1,
                "matches": sorted(matches, key=lambda m: -m["jaccard"])[:5],
                "severity": "high" if any(m["jaccard"] >= 0.7 for m in matches) else "medium",
            })

    return warnings


# -----------------------------------------------------------------------------
# CLI
# -----------------------------------------------------------------------------


def audit_site(site_key: str) -> dict[str, list[dict]]:
    return {
        "site_key": site_key,
        "pre_rewrite_cannibalisation": audit_rewrite_cannibalisation(site_key),
        "new_page_overlap": audit_new_page_overlap(site_key),
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--site", default=None, help="Single site; default = all active")
    parser.add_argument("--json", action="store_true", help="Emit JSON instead of printed report")
    args = parser.parse_args()

    if args.site:
        sites = [args.site]
    else:
        sites = [s["site_key"] for s in get_sites(active_only=True)]

    all_results: list[dict] = []
    for site in sites:
        all_results.append(audit_site(site))

    if args.json:
        print(json.dumps(all_results, indent=2))
        return

    print("=" * 80)
    print("OPTIMISATION QUEUE PRE-FLIGHT AUDIT")
    print("=" * 80)
    total_warnings = 0
    for result in all_results:
        site = result["site_key"]
        cannibals = result["pre_rewrite_cannibalisation"]
        overlaps = result["new_page_overlap"]
        if not cannibals and not overlaps:
            print(f"\n[{site}] clean — no warnings")
            continue
        print(f"\n[{site}] {len(cannibals)} cannibalisation warning(s), {len(overlaps)} new_page overlap warning(s)")

        for w in cannibals:
            total_warnings += 1
            tu = (w['target_url'] or '').replace('https://', '').replace('http://', '')[:60]
            print(f"  CANNIBAL [{w['severity']}]: rewrite {tu}")
            print(f"    target query: {w['primary_query']!r}")
            for c in w["conflicting_pages"][:3]:
                cu = (c['page_url'] or '').replace('https://', '').replace('http://', '')[:55]
                print(f"      conflict: {cu}  imp={c['impressions']:>4} pos={c['avg_position']}")

        for w in overlaps:
            total_warnings += 1
            print(f"  OVERLAP [{w['severity']}]: new_page slug={w['proposed_slug']!r}")
            print(f"    primary_query: {w['primary_query']!r}")
            for m in w["matches"][:3]:
                print(f"      matches existing: {m['existing_slug']}  jaccard={m['jaccard']}")

    print("\n" + "=" * 80)
    print(f"Total warnings: {total_warnings}")
    print("=" * 80)


if __name__ == "__main__":
    main()
