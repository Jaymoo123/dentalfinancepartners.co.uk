"""
Query triage: classify 28d GSC (+Bing) queries per site into candidate classes.

Classes:
  SERVED_WELL  — dedicated page exists, avg position ≤ POS_WELL → drop
  SERVED_WEAK  — dedicated page, avg position > POS_WELL → improve-lane
  WRONG_PAGE   — serving page is homepage/hub OR query↔slug Jaccard < JACCARD_THRESHOLD → candidate
  UNSERVED     — ≥ MIN_IMP impressions, nothing ranking < POS_UNSERVED_CEIL → candidate
  NOISE        — everything else

Thresholds are module constants (tweak here, not in caller code).

Output: briefs/<site>/discovery_2026-07/triage.json

CLI:
  python -m optimisation_engine.discovery.query_triage --site property
  python -m optimisation_engine.discovery.query_triage --site contractors-ir35 --piggyback
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.competitor._db import _sql  # noqa: E402
from optimisation_engine.config import get_site       # noqa: E402

try:
    from dotenv import load_dotenv
    load_dotenv(ROOT / ".env")
except ImportError:
    pass

# ---------------------------------------------------------------------------
# Thresholds
# ---------------------------------------------------------------------------
POS_WELL = 12.0          # avg position ≤ this → SERVED_WELL
POS_UNSERVED_CEIL = 50.0 # nothing ranking better than this → UNSERVED
JACCARD_THRESHOLD = 0.30 # query↔slug Jaccard below this → WRONG_PAGE
MIN_IMP = 10             # minimum 28d impressions to be considered UNSERVED

# Regex constants for piggyback mode (mine sibling sites for topic seeds)
IR35_RE = re.compile(
    r"ir35|off[-\s]?payroll|cest|deemed\s+employ|chapter\s+8|chapter\s+10|sds\b|ssr\b",
    re.IGNORECASE,
)
CIS_RE = re.compile(
    r"\bcis\b|construction\s+industry\s+scheme|subcontractor|gross\s+payment|cis\s+deduction",
    re.IGNORECASE,
)

# Hub/homepage path indicators → WRONG_PAGE
HUB_PATTERNS = re.compile(r"^(https?://[^/]+/?$|.*/blog/?$|.*/guides/?$|.*/resources/?$)")


# ---------------------------------------------------------------------------
# Tokenise + Jaccard — copied from scripts/property_wave_cannibalisation_check.py
# to avoid sys.path gymnastics; source noted.
# ponytail: copy acceptable — source file has live importers, sys.path trick is worse
# ---------------------------------------------------------------------------

STOP = {
    "the", "a", "an", "guide", "uk", "complete", "tax", "to", "and",
    "for", "of", "what", "how", "your", "you", "in", "is", "are",
    "step", "by", "2026", "2025", "2024", "2027", "with", "on", "from",
    "do", "does", "as", "be", "or", "if", "at", "this", "that", "it",
    "into", "out", "can", "i", "my", "we", "our", "us", "all", "any",
    "explained", "rules", "vs", "vs.", "complete-guide", "ultimate",
    "comprehensive", "best", "free", "online", "near", "me",
}


def _tokenise(s: str) -> set[str]:
    s = re.sub(r"[^a-z0-9]+", " ", s.lower())
    return {t for t in s.split() if t and t not in STOP and len(t) >= 2}


def _jaccard(a: set, b: set) -> float:
    if not a or not b:
        return 0.0
    return len(a & b) / len(a | b)


def _slug_of(url: str) -> str:
    """Extract the last non-empty path segment as a pseudo-slug."""
    path = urlparse(url).path.rstrip("/")
    return path.split("/")[-1] if path else ""


def _is_hub(url: str) -> bool:
    return bool(HUB_PATTERNS.match(url))


# ---------------------------------------------------------------------------
# Data loading
# ---------------------------------------------------------------------------

def _load_gsc(site_key: str) -> list[dict]:
    """Aggregate 28d gsc_query_data: sum impressions/clicks, avg position, top page."""
    rows = _sql(f"""
        SELECT
            query,
            page_url,
            SUM(impressions) AS impressions,
            SUM(clicks)      AS clicks,
            AVG(position)    AS avg_position
        FROM gsc_query_data
        WHERE site_key = '{site_key}'
        GROUP BY query, page_url
    """)
    return rows


def _load_bing(site_key: str) -> list[dict]:
    """Load bing_query_data rows (already aggregated snapshots)."""
    try:
        rows = _sql(f"""
            SELECT
                query,
                page_url,
                SUM(impressions) AS impressions,
                SUM(clicks)      AS clicks,
                AVG(position)    AS avg_position
            FROM bing_query_data
            WHERE site_key = '{site_key}'
            GROUP BY query, page_url
        """)
        return rows
    except Exception as exc:
        print(f"[triage] bing_query_data unavailable for {site_key}: {exc}")
        return []


def _merge_query_rows(gsc_rows: list[dict], bing_rows: list[dict]) -> dict[str, dict]:
    """
    Merge GSC + Bing rows keyed by query. For each query keep the page_url with
    the highest total impressions (the "top serving page").
    Returns {query: {page_url, impressions, clicks, avg_position, sources}}.
    """
    # ponytail: O(n) merge — estate queries are ~10k max, no optimisation needed
    merged: dict[str, dict] = {}

    def _absorb(rows: list[dict], source: str) -> None:
        for r in rows:
            q = (r.get("query") or "").strip().lower()
            if not q:
                continue
            imp = int(r.get("impressions") or 0)
            clk = int(r.get("clicks") or 0)
            pos = float(r.get("avg_position") or 99)
            page = r.get("page_url") or ""
            if q not in merged:
                merged[q] = {"query": q, "page_url": page, "impressions": imp,
                              "clicks": clk, "avg_position": pos, "sources": set()}
            else:
                merged[q]["impressions"] += imp
                merged[q]["clicks"] += clk
                # Keep the page with the best position (lowest)
                if pos < merged[q]["avg_position"]:
                    merged[q]["avg_position"] = pos
                    merged[q]["page_url"] = page
            merged[q]["sources"].add(source)

    _absorb(gsc_rows, "gsc")
    _absorb(bing_rows, "bing")
    # Convert sources set to sorted list for JSON serialisation
    for v in merged.values():
        v["sources"] = sorted(v["sources"])
    return merged


# ---------------------------------------------------------------------------
# Piggyback: mine sibling sites for IR35 / CIS topic seeds
# ---------------------------------------------------------------------------

def _piggyback_queries(target_regex: re.Pattern) -> list[dict]:
    """Pull queries from all sibling gsc_query_data rows matching target_regex."""
    rows = _sql("""
        SELECT query, site_key, SUM(impressions) AS impressions, AVG(position) AS avg_position
        FROM gsc_query_data
        GROUP BY query, site_key
        ORDER BY impressions DESC
    """)
    matched = []
    for r in rows:
        q = (r.get("query") or "").strip().lower()
        if target_regex.search(q):
            matched.append({
                "query": q,
                "page_url": "",
                "impressions": int(r.get("impressions") or 0),
                "clicks": 0,
                "avg_position": float(r.get("avg_position") or 99),
                "sources": [f"piggyback:{r.get('site_key')}"],
            })
    return matched


# ---------------------------------------------------------------------------
# Classification
# ---------------------------------------------------------------------------

def _classify_one(entry: dict) -> str:
    page = entry["page_url"]
    query = entry["query"]
    pos = float(entry["avg_position"] or 99)
    imp = int(entry["impressions"] or 0)

    # Piggyback entries have no serving page → always UNSERVED candidate
    if not page:
        return "UNSERVED"

    if _is_hub(page):
        return "WRONG_PAGE"

    # Dedicated page ranking well serves the query regardless of slug overlap
    # (abbreviation queries like "nrl1"/"ppr" never Jaccard-match their slugs).
    if pos <= POS_WELL:
        return "SERVED_WELL"

    slug = _slug_of(page)
    j = _jaccard(_tokenise(query), _tokenise(slug))

    if j < JACCARD_THRESHOLD and pos <= POS_UNSERVED_CEIL:
        return "WRONG_PAGE"

    if pos <= POS_UNSERVED_CEIL:
        return "SERVED_WEAK"

    # pos > POS_UNSERVED_CEIL — check impressions
    if imp >= MIN_IMP:
        return "UNSERVED"

    return "NOISE"


def _load_autocomplete(site_key: str) -> list[dict]:
    """
    Pull keywords from dataforseo_keyword_data for the site, join against
    gsc_query_data to find which have NO serving page → emit as UNSERVED candidates.
    Keywords that DO appear in GSC are skipped (GSC source covers them already).
    # ponytail: LEFT JOIN in SQL, no app-side set-difference needed
    """
    rows = _sql(f"""
        SELECT
            d.related_keyword AS query,
            0                 AS impressions,
            0                 AS clicks,
            99.0              AS avg_position,
            ''                AS page_url
        FROM dataforseo_keyword_data d
        WHERE d.site_key = '{site_key}'
          AND d.related_keyword IS NOT NULL
          AND NOT EXISTS (
              SELECT 1 FROM gsc_query_data g
              WHERE g.site_key = '{site_key}'
                AND LOWER(g.query) = LOWER(d.related_keyword)
          )
        GROUP BY d.related_keyword
    """)
    for r in rows:
        r["sources"] = ["autocomplete"]
        r["source"] = "autocomplete"
    return rows


def _load_bing_delta(site_key: str) -> list[dict]:
    """
    Bing queries absent from gsc_query_data (28d) → same classification flow.
    Bing provides page_url + position — use them directly.
    # ponytail: 28d filter on GSC absence only; Bing table has no date column to filter
    """
    try:
        rows = _sql(f"""
            SELECT
                b.query,
                b.page_url,
                SUM(b.impressions) AS impressions,
                SUM(b.clicks)      AS clicks,
                AVG(b.position)    AS avg_position
            FROM bing_query_data b
            WHERE b.site_key = '{site_key}'
              AND NOT EXISTS (
                  SELECT 1 FROM gsc_query_data g
                  WHERE g.site_key = '{site_key}'
                    AND g.date >= CURRENT_DATE - INTERVAL '28 days'
                    AND LOWER(g.query) = LOWER(b.query)
              )
            GROUP BY b.query, b.page_url
        """)
        for r in rows:
            r["sources"] = ["bing-delta"]
            r["source"] = "bing-delta"
        return rows
    except Exception as exc:
        print(f"[triage] bing_delta unavailable for {site_key}: {exc}")
        return []


def triage(site_key: str, piggyback: bool = False, source: str = "gsc") -> list[dict]:
    if source == "autocomplete":
        raw = _load_autocomplete(site_key)
        results = []
        for r in raw:
            cls = _classify_one(r)
            results.append({**r, "class": cls})
        results.sort(key=lambda x: -x["impressions"])
        return results

    if source == "bing-delta":
        raw = _load_bing_delta(site_key)
        results = []
        for r in raw:
            cls = _classify_one(r)
            results.append({**r, "class": cls})
        results.sort(key=lambda x: -x["impressions"])
        return results

    # source == "gsc" (default) or "all"
    gsc = _load_gsc(site_key)
    bing = _load_bing(site_key)
    merged = _merge_query_rows(gsc, bing)

    if piggyback:
        regex = IR35_RE if "ir35" in site_key else CIS_RE
        pb = _piggyback_queries(regex)
        for entry in pb:
            q = entry["query"]
            if q not in merged:
                merged[q] = entry
            else:
                merged[q]["impressions"] += entry["impressions"]
                merged[q]["sources"] = sorted(set(merged[q]["sources"] + entry["sources"]))

    gsc_results = []
    for entry in merged.values():
        cls = _classify_one(entry)
        gsc_results.append({**entry, "class": cls, "source": "gsc"})
    gsc_results.sort(key=lambda x: -x["impressions"])

    if source == "gsc":
        return gsc_results

    # source == "all": merge gsc + autocomplete + bing-delta
    # ponytail: dedup by query+source; downstream reads 'class'+'sources'+'impressions' only
    seen_queries: set[str] = {r["query"] for r in gsc_results}

    ac_results = []
    for r in _load_autocomplete(site_key):
        if r["query"] not in seen_queries:
            ac_results.append({**r, "class": _classify_one(r)})

    bd_results = []
    bd_seen: set[str] = seen_queries | {r["query"] for r in ac_results}
    for r in _load_bing_delta(site_key):
        if r["query"] not in bd_seen:
            bd_results.append({**r, "class": _classify_one(r)})

    all_results = gsc_results + ac_results + bd_results
    all_results.sort(key=lambda x: -x["impressions"])
    return all_results


def main() -> None:
    parser = argparse.ArgumentParser(description="Query triage for gap discovery")
    parser.add_argument("--site", required=True, help="site_key e.g. property")
    parser.add_argument("--piggyback", action="store_true",
                        help="Mine sibling gsc_query_data with IR35_RE or CIS_RE")
    parser.add_argument("--source", default="gsc",
                        choices=["gsc", "autocomplete", "bing-delta", "all"],
                        help="Candidate source (default: gsc)")
    args = parser.parse_args()

    site_key = args.site
    get_site(site_key)  # validates site exists, raises if not

    results = triage(site_key, piggyback=args.piggyback, source=args.source)

    out_dir = ROOT / "briefs" / site_key / "discovery_2026-07"
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / "triage.json"
    out_path.write_text(json.dumps(results, indent=2, default=str), encoding="utf-8")

    # Class distribution summary
    from collections import Counter
    counts = Counter(r["class"] for r in results)
    print(f"[triage] {site_key} (source={args.source}): {len(results)} queries -> {dict(counts)}")
    print(f"[triage] written: {out_path}")


if __name__ == "__main__":
    # Self-check
    assert _jaccard({"buy", "let"}, {"buy", "let"}) == 1.0
    assert _jaccard({"buy"}, {"sell"}) == 0.0
    assert _tokenise("Buy-to-let mortgage UK guide 2026") == {"buy", "let", "mortgage"}
    assert _is_hub("https://example.com/")
    assert not _is_hub("https://example.com/blog/landlord-tax-guide")
    # Abbreviation query on a dedicated well-ranking page must be SERVED_WELL, not WRONG_PAGE
    assert _classify_one({"query": "nrl1", "page_url": "https://x.com/blog/nrl-approval-guide",
                          "avg_position": 4.4, "impressions": 540}) == "SERVED_WELL"
    assert _classify_one({"query": "nrl1", "page_url": "https://x.com/blog/unrelated-topic",
                          "avg_position": 20.0, "impressions": 540}) == "WRONG_PAGE"
    assert _classify_one({"query": "nrl1", "page_url": "https://x.com/",
                          "avg_position": 4.0, "impressions": 540}) == "WRONG_PAGE"
    print("self-check OK")
    main()
