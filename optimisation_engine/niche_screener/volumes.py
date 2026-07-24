"""
Stage 1b: fetch Google Ads search volumes for the selected query subset.

Selection budget is 300 queries: every DELEGATION query, then DIY queries
(autocomplete-sourced first, then alphabetical), plus a fixed tool-frame set
built from pain seeds. Google Ads search_volume response items are FLAT dicts:
keyword, search_volume, cpc, competition, monthly_searches [{year,month,search_volume}].
Cached as cache/<run_id>/<niche>/volumes.json.
"""
from __future__ import annotations

import re

from optimisation_engine.clients.dataforseo_client import DataForSEOClient
from optimisation_engine.cost_tracker import IdempotencyHit
from optimisation_engine.niche_screener import common

MAX_QUERIES = 300
TOOL_TEMPLATES = ("{seed} calculator", "{seed} checker", "{seed} template", "{seed} form")


def select_queries(universe: dict, spec: dict, limit: int = MAX_QUERIES) -> list[str]:
    """Deterministic selection: ALL delegation, tool frames, then ranked DIY."""
    rows = universe["queries"]
    delegation = [r["q"] for r in rows if r["intent"] == "DELEGATION"]
    tools = sorted(
        {tpl.format(seed=s.strip().lower()) for s in spec["pain_seeds"] for tpl in TOOL_TEMPLATES}
    )
    diy = sorted(
        (r for r in rows if r["intent"] == "DIY"),
        key=lambda r: (0 if r["source"] == "autocomplete" else 1, r["q"]),
    )
    selected: list[str] = []
    seen: set[str] = set()
    for q in delegation + tools + [r["q"] for r in diy]:
        if q in seen:
            continue
        seen.add(q)
        selected.append(q)
        if len(selected) >= limit:
            break
    return selected


_ADS_KEYWORD_RE = re.compile(r"[^a-z0-9 ']")


def sanitise_for_google_ads(query: str) -> str | None:
    """Google Ads search_volume rejects the whole TASK if any keyword carries
    disallowed symbols, is >80 chars or >10 words. Returns None if unusable."""
    q = _ADS_KEYWORD_RE.sub(" ", query.lower())
    q = " ".join(q.split())
    if not q or len(q) > 80 or len(q.split()) > 10:
        return None
    return q


def parse_search_volume(response: dict) -> dict[str, dict]:
    """tasks -> result items (flat Google Ads shape) -> per-keyword dict.
    A task-level error must never degrade to silent nulls."""
    out: dict[str, dict] = {}
    for task in response.get("tasks", []) or []:
        if task.get("status_code") != 20000:
            raise RuntimeError(
                f"search_volume task error {task.get('status_code')}: {task.get('status_message')}")
        for item in task.get("result", []) or []:
            kw = (item.get("keyword") or "").strip().lower()
            if not kw:
                continue
            out[kw] = {
                "search_volume": item.get("search_volume"),
                "cpc": item.get("cpc"),
                "competition": item.get("competition"),
                "monthly_searches": item.get("monthly_searches") or [],
            }
    return out


def fetch_volumes(spec: dict, run_id: str, *, site_key: str | None = None) -> dict:
    # ponytail: site_key None until sites row exists (migration 20260724000001, owner-applied)
    universe = common.cache_get(run_id, spec["name"], "universe")
    if universe is None:
        raise RuntimeError(f"universe cache missing for run {run_id} / {spec['name']}; run expand first")

    queries = select_queries(universe, spec)
    # Map sanitised keyword -> original queries (Google Ads returns the sanitised form).
    sent_map: dict[str, list[str]] = {}
    dropped: list[str] = []
    for q in queries:
        s = sanitise_for_google_ads(q)
        if s is None:
            dropped.append(q)
        else:
            sent_map.setdefault(s, []).append(q)
    sent = sorted(sent_map)

    dfs = DataForSEOClient()
    volumes: dict[str, dict] = {}
    for i in range(0, len(sent), 500):
        batch = sent[i : i + 500]
        try:
            resp = dfs.search_volume(site_key=site_key, keywords=batch)
        except IdempotencyHit:
            print(f"[volumes] IdempotencyHit on search_volume batch {i}, skipping")
            continue
        common.cache_put(run_id, spec["name"], f"volumes_raw_{i}", resp)
        for kw, data in parse_search_volume(resp).items():
            for orig in sent_map.get(kw, [kw]):
                volumes[orig] = data

    # Queries with no returned row are recorded as nulls, never dropped silently.
    for q in queries:
        volumes.setdefault(q, {"search_volume": None, "cpc": None, "competition": None, "monthly_searches": []})

    nonnull = sum(1 for v in volumes.values() if v["search_volume"] is not None)
    out = {
        "volumes": volumes,
        "coverage": nonnull / len(queries) if queries else 0.0,
        "dropped_unsendable": dropped,
    }
    common.cache_put(run_id, spec["name"], "volumes", out)
    return out


if __name__ == "__main__":
    # Pure-logic self-check, no network.
    spec = {"name": "t", "pain_seeds": ["probate cost"], "provider_terms": ["solicitor"]}
    universe = {
        "queries": [
            {"q": "probate solicitor near me", "intent": "DELEGATION", "source": "seed"},
            {"q": "zz diy alphabetical", "intent": "DIY", "source": "seed"},
            {"q": "aa diy autocomplete", "intent": "DIY", "source": "autocomplete"},
            {"q": "probate registry", "intent": "OTHER", "source": "seed"},
        ]
    }
    sel = select_queries(universe, spec)
    assert sel[0] == "probate solicitor near me"  # delegation first
    assert "probate cost calculator" in sel  # tool frame injected
    assert sel.index("aa diy autocomplete") < sel.index("zz diy alphabetical")  # autocomplete-sourced DIY first
    assert "probate registry" not in sel  # OTHER excluded
    assert len(sel) == len(set(sel))

    fake = {
        "tasks": [
            {"status_code": 20000, "result": [
                {"keyword": "Probate Cost Calculator", "search_volume": 120, "cpc": 1.5,
                 "competition": 0.3, "monthly_searches": [{"year": 2026, "month": 1, "search_volume": 200}]},
                {"keyword": "no volume kw", "search_volume": None, "cpc": None, "competition": None},
            ]}
        ]
    }
    parsed = parse_search_volume(fake)
    assert parsed["probate cost calculator"]["search_volume"] == 120
    assert parsed["probate cost calculator"]["monthly_searches"][0]["search_volume"] == 200
    assert parsed["no volume kw"]["monthly_searches"] == []
    print("volumes.py self-check OK")
