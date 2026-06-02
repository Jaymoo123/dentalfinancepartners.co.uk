"""Head-keyword GSC pull + cannibalisation map for the core-page engine.

Read-only: every function here only SELECTs from gsc_query_data via the shared
Management-API helper. No DeepSeek, no writes.

The cannibalisation map is the core diagnosis: for each head-family query, which
of OUR pages currently catches it (the "catcher"), and a verdict telling the
brief what to do (let the core page claim it, keep it local, or consolidate a
thin blog page).
"""
from __future__ import annotations

from urllib.parse import urlparse

from optimisation_engine.competitor._db import _esc, _sql


# ---------------------------------------------------------------------------
# URL helpers
# ---------------------------------------------------------------------------

def _path_of(url: str) -> str:
    """Return the lower-cased path with a single trailing slash stripped."""
    try:
        p = urlparse(url).path or "/"
    except Exception:
        return "/"
    p = p.rstrip("/")
    return p.lower()


def classify_page(url: str) -> str:
    """homepage | blog | location | core_other for one of OUR page URLs."""
    path = _path_of(url)
    if path == "":
        return "homepage"
    if path.startswith("/blog"):
        return "blog"
    if path.startswith("/locations"):
        return "location"
    return "core_other"


def is_geo_query(query: str, cfg: dict) -> bool:
    """True if the query carries a configured geo modifier (local intent)."""
    q = (query or "").lower()
    return any(g in q for g in cfg.get("geo_modifiers", []))


def is_national_head(query: str, cfg: dict) -> bool:
    """True if the query is one of the curated national head terms (loose match)."""
    q = (query or "").lower().strip()
    return any(t in q for t in cfg.get("head_terms", [])) and not is_geo_query(query, cfg)


# ---------------------------------------------------------------------------
# GSC pull
# ---------------------------------------------------------------------------

def pull_head_gsc(cfg: dict, *, days: int = 90) -> list[dict]:
    """Pull head-family rows (query x page_url) from gsc_query_data.

    Returns rows: {query, page_url, imp, clk, pos, days, page_type}.
    """
    site = cfg["site_key"]
    likes = cfg.get("head_match_like", ["%accountant%"])
    like_clause = " OR ".join(f"query ILIKE {_esc(p)}" for p in likes)
    sql = (
        "SELECT query, page_url, "
        "SUM(impressions) AS imp, SUM(clicks) AS clk, "
        "ROUND(AVG(position)::numeric, 1) AS pos, "
        "COUNT(DISTINCT date) AS days "
        "FROM gsc_query_data "
        f"WHERE site_key = {_esc(site)} AND ({like_clause}) "
        f"AND date >= (CURRENT_DATE - INTERVAL '{int(days)} days') "
        "GROUP BY query, page_url "
        "ORDER BY imp DESC"
    )
    rows = _sql(sql)
    for r in rows:
        r["imp"] = int(r.get("imp") or 0)
        r["clk"] = int(r.get("clk") or 0)
        r["pos"] = float(r.get("pos") or 0)
        r["page_type"] = classify_page(r.get("page_url") or "")
    return rows


# ---------------------------------------------------------------------------
# Cannibalisation map
# ---------------------------------------------------------------------------

def _verdict(query: str, catcher_type: str, cfg: dict) -> str:
    geo = is_geo_query(query, cfg)
    if catcher_type == "homepage":
        return "homepage_already_owns"
    if geo:
        if catcher_type == "location":
            return "geo_keep_local"
        return "geo_caught_by_blog"  # consider folding into a /locations page
    # National / commercial head term not on the homepage:
    if catcher_type == "blog":
        return "caught_by_blog_consolidate"
    if catcher_type == "location":
        return "national_caught_by_location_reassign"
    return "caught_by_core_other"


def build_cannibalisation_map(rows: list[dict], cfg: dict) -> list[dict]:
    """Per head query: the top catcher page, homepage position (if any), verdict.

    Sorted by total query impressions (biggest opportunities first).
    """
    by_query: dict[str, list[dict]] = {}
    for r in rows:
        by_query.setdefault(r["query"], []).append(r)

    out: list[dict] = []
    for query, cands in by_query.items():
        cands_sorted = sorted(cands, key=lambda c: c["imp"], reverse=True)
        catcher = cands_sorted[0]
        homepage = next((c for c in cands if c["page_type"] == "homepage"), None)
        total_imp = sum(c["imp"] for c in cands)
        out.append({
            "query": query,
            "total_imp": total_imp,
            "national": is_national_head(query, cfg),
            "geo": is_geo_query(query, cfg),
            "catcher_url": catcher["page_url"],
            "catcher_type": catcher["page_type"],
            "catcher_imp": catcher["imp"],
            "catcher_pos": catcher["pos"],
            "homepage_pos": homepage["pos"] if homepage else None,
            "n_pages": len(cands),
            "verdict": _verdict(query, catcher["page_type"], cfg),
        })

    out.sort(key=lambda d: d["total_imp"], reverse=True)
    return out


def summarise_cannibalisation(cmap: list[dict], cfg: dict) -> dict:
    """High-level rollups for the brief: top catchers, homepage presence, etc."""
    catcher_tally: dict[str, dict] = {}
    homepage_owns = 0
    national_queries = 0
    national_imp_not_on_homepage = 0
    for row in cmap:
        c = catcher_tally.setdefault(
            row["catcher_url"],
            {"url": row["catcher_url"], "type": row["catcher_type"], "queries": 0, "imp": 0},
        )
        c["queries"] += 1
        c["imp"] += row["catcher_imp"]
        if row["verdict"] == "homepage_already_owns":
            homepage_owns += 1
        if row["national"]:
            national_queries += 1
            if row["catcher_type"] != "homepage":
                national_imp_not_on_homepage += row["total_imp"]

    top_catchers = sorted(catcher_tally.values(), key=lambda d: d["imp"], reverse=True)[:15]
    return {
        "total_head_queries": len(cmap),
        "total_head_impressions": sum(r["total_imp"] for r in cmap),
        "homepage_owns_count": homepage_owns,
        "national_head_queries": national_queries,
        "national_impressions_not_on_homepage": national_imp_not_on_homepage,
        "top_catchers": top_catchers,
    }
