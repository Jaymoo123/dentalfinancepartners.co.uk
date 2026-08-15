"""
Dual-source SERP provider: DataForSEO (paid, structured) + DuckDuckGo (free,
corroboration). DDG is today's default and must keep working if DataForSEO
is down, over budget, or wrong — this module never lets a paid-provider
failure take down a caller that only needed organic URLs.

Modes (env SERP_PROVIDER_MODE, default "dual"):
  dual      - call both providers. DFS is authoritative for organic/paa/features;
              DDG results are folded in as `ddg_organic` for divergence checking.
              DFS failure -> silently fall back to DDG-only (provider_used="ddg_fallback").
              DDG failure -> ignored, corroboration only (provider_used stays "dual").
  ddg_only  - DDG passthrough only. Today's behaviour, instant rollback switch.
  dfs_only  - DataForSEO only. Raises if the paid call fails (no silent fallback
              — if you asked for DFS you want to know it broke).

Result shape: {organic, paa, features, ddg_organic, divergence, provider_used}
  organic       - list[{position, title, link, snippet, domain}], same 5 keys as
                   ddg_serp_client.fetch_organic_results so call sites are drop-in
                   compatible regardless of which provider filled it.
  paa           - list[{question, answer, source_url}] (empty outside dual/dfs_only,
                   DDG has no People Also Ask data).
  features      - list of non-organic SERP item types present (featured_snippet,
                   ai_overview, local_pack, ...); empty outside dual/dfs_only.
  ddg_organic   - DDG's own organic list (dual mode only; [] otherwise).
  divergence    - 1 - |domain intersection| / min(|A|, |B|) over top-10 domain sets.
                   None when only one provider ran (ddg_only, dfs_only, or a dual-mode
                   fallback). Simple overlap ratio, not union-based — documented here
                   because there's more than one reasonable definition.
  provider_used - "ddg" | "dfs" | "dual" | "ddg_fallback"
"""
from __future__ import annotations

import logging
import os
from urllib.parse import urlparse

from optimisation_engine.clients.dataforseo_client import DataForSEOClient
from optimisation_engine.clients.ddg_serp_client import fetch_organic_results

logger = logging.getLogger(__name__)

VALID_MODES = {"dual", "ddg_only", "dfs_only"}


def _domain_of(url: str) -> str:
    if not url:
        return ""
    netloc = urlparse(url).netloc.lower()
    return netloc.lstrip("www.").split(":")[0]


# ---------------------------------------------------------------------------
# DataForSEO advanced-response parsing
# ---------------------------------------------------------------------------

def parse_serp_advanced(response: dict) -> dict:
    """Flatten a serp/google/organic/live/advanced response.

    Organic results come out in the SAME 5-key shape as
    ddg_serp_client.fetch_organic_results: {position, title, link, snippet, domain}.

    Also returns:
      paa      - people_also_ask questions: {question, answer, source_url}
      features - non-organic item types present (featured_snippet, ai_overview,
                 local_pack, knowledge_graph, ...), de-duped, first-seen order.
    """
    organic: list[dict] = []
    paa: list[dict] = []
    features: list[str] = []

    tasks = response.get("tasks", []) or []
    for task in tasks:
        for result in task.get("result", []) or []:
            for item in result.get("items", []) or []:
                item_type = item.get("type") or ""
                if item_type == "organic":
                    link = item.get("url") or ""
                    organic.append({
                        "position": item.get("rank_absolute") or item.get("rank_group"),
                        "title": item.get("title") or "",
                        "link": link,
                        "snippet": item.get("description") or "",
                        "domain": item.get("domain") or _domain_of(link),
                    })
                elif item_type == "people_also_ask":
                    for sub in item.get("items", []) or []:
                        expanded = (sub.get("expanded_element") or [{}])[0] or {}
                        paa.append({
                            "question": sub.get("title") or "",
                            "answer": expanded.get("description") or expanded.get("featured_title") or "",
                            "source_url": expanded.get("url") or "",
                        })
                    features.append(item_type)
                elif item_type:
                    features.append(item_type)

    seen: set[str] = set()
    features_out: list[str] = []
    for f in features:
        if f not in seen:
            seen.add(f)
            features_out.append(f)

    return {"organic": organic, "paa": paa, "features": features_out}


def _fetch_dfs(query: str, *, num: int, site_key: str) -> dict | None:
    """Returns parsed DFS result, or None if the call failed for any reason
    (budget gate, idempotency hit on a re-run, network error, ...). Never raises
    — the caller decides whether that's fatal (dfs_only) or a fallback (dual)."""
    try:
        client = DataForSEOClient()
        response = client.serp_organic(site_key=site_key, query=query, depth=num)
    except Exception as exc:
        logger.warning("DataForSEO SERP call failed for query=%r: %s: %s", query, type(exc).__name__, exc)
        return None
    return parse_serp_advanced(response)


def _domain_set(results: list[dict], limit: int = 10) -> set[str]:
    return {r["domain"] for r in results[:limit] if r.get("domain")}


def _compute_divergence(dfs_organic: list[dict], ddg_organic: list[dict]) -> float | None:
    """1 - |intersection| / min(|A|, |B|) over top-10 domain sets.

    Simple overlap ratio (not union-based Jaccard): a thin SERP where DDG only
    returns 3 results shouldn't be scored as "highly diverged" just because it
    has fewer domains to compare against DFS's 10. None if either side is empty.
    """
    dfs_domains = _domain_set(dfs_organic)
    ddg_domains = _domain_set(ddg_organic)
    if not dfs_domains or not ddg_domains:
        return None
    overlap = len(dfs_domains & ddg_domains) / min(len(dfs_domains), len(ddg_domains))
    return round(1.0 - overlap, 4)


# ---------------------------------------------------------------------------
# Public interface
# ---------------------------------------------------------------------------

def fetch_serp(query: str, *, num: int = 10, site_key: str, mode: str | None = None) -> dict:
    """Fetch a SERP via DataForSEO + DuckDuckGo per `mode` (see module docstring).

    Args:
        query:    Search query.
        num:      Organic results depth (both providers).
        site_key: Cost-tracking / logging context (required — DFS calls are billed
                  per site_key in api_cost_log).
        mode:     "dual" | "ddg_only" | "dfs_only". Defaults to env
                  SERP_PROVIDER_MODE, then "dual".
    """
    mode = mode if mode is not None else os.environ.get("SERP_PROVIDER_MODE", "dual")
    if mode not in VALID_MODES:
        raise ValueError(f"Unknown SERP_PROVIDER_MODE: {mode!r}. Must be one of {sorted(VALID_MODES)}.")

    if mode == "ddg_only":
        ddg_organic = fetch_organic_results(query, num=num, site_key=site_key)
        return {
            "organic": ddg_organic,
            "paa": [],
            "features": [],
            "ddg_organic": [],
            "divergence": None,
            "provider_used": "ddg",
        }

    if mode == "dfs_only":
        dfs_parsed = _fetch_dfs(query, num=num, site_key=site_key)
        if dfs_parsed is None:
            raise RuntimeError(f"DataForSEO SERP call failed for query={query!r} in dfs_only mode.")
        return {
            **dfs_parsed,
            "ddg_organic": [],
            "divergence": None,
            "provider_used": "dfs",
        }

    # dual: DFS is authoritative, DDG is corroboration-only and must never fail the call.
    dfs_parsed = _fetch_dfs(query, num=num, site_key=site_key)
    try:
        ddg_organic = fetch_organic_results(query, num=num, site_key=site_key)
    except Exception as exc:
        logger.warning("ddg_serp_client failed for query=%r: %s: %s", query, type(exc).__name__, exc)
        ddg_organic = []

    if dfs_parsed is None:
        logger.warning("DataForSEO unavailable for query=%r; falling back to DDG-only.", query)
        return {
            "organic": ddg_organic,
            "paa": [],
            "features": [],
            "ddg_organic": ddg_organic,
            "divergence": None,
            "provider_used": "ddg_fallback",
        }

    return {
        **dfs_parsed,
        "ddg_organic": ddg_organic,
        "divergence": _compute_divergence(dfs_parsed["organic"], ddg_organic),
        "provider_used": "dual",
    }


if __name__ == "__main__":
    # Live self-check — costs one DataForSEO call (~$0.002) in dual/dfs_only mode.
    # NOT run automatically by anything; invoke directly only when you intend to spend.
    # The DFS client's own idempotency key (query+site_key+day) blocks accidental
    # double-billing if this is re-run today, so calling fetch_serp() exactly once
    # here is enough — no extra guard needed on top.
    # site_key must exist in the sites registry (api_cost_log FK) — use a real one.
    result = fetch_serp("landlord tax uk", site_key="property")
    assert result["organic"], "expected non-empty organic results"
    assert result["divergence"] is None or 0.0 <= result["divergence"] <= 1.0, (
        f"divergence out of [0,1]: {result['divergence']}"
    )
    print(f"provider_used={result['provider_used']} organic={len(result['organic'])} "
          f"paa={len(result['paa'])} divergence={result['divergence']}")
