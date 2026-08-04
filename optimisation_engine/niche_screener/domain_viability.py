"""
Stage 2b: new_domain_viability data - "can a NEW domain win this niche's SERPs?"

Prereg (docs/_engines/NICHE_SCREENER_V2_PREREG.md): a /100 component,
weight 5, "new_domain_viability ships as an honest NULL until bulk_ranks/whois
wiring lands." The prereg does not spell out the formula beyond that hint, so
the reading implemented here (documented again inline at the score.py call
site) is: pull the domain set that already ranks in this run's cached SERPs,
and measure what share of those domains are "beatable" - young (whois/RDAP
registration age) or weak (DataForSEO Backlinks bulk_ranks authority score).
A niche where incumbents are themselves young/weak domains is one a new site
can plausibly break into; a niche walled off by long-established, high-rank
domains is not. This is the simplest reading that satisfies the prereg's two
named inputs (bulk_ranks, whois) without inventing a third metric.

Data sources:
  - whois/age: free RDAP (https://rdap.org bootstrap redirector), no API key,
    no cost_tracker gate needed. Cached forever per-domain (registration date
    doesn't change).
  - bulk_ranks: paid DataForSEO Backlinks `backlinks/bulk_ranks/live`
    (one call handles up to 1000 domains), routed through the same
    DataForSEOClient._post_paid -> CostTracker.guard path as every other
    paid call in this package (DATAFORSEO_ABORT_AT respected automatically).
    Cached forever per-domain too, so a rescore never re-spends.

Reads SERP domains from the existing run cache (serps.json) - never
refetches SERPs. Writes cache/<run_id>/<niche>/domain_viability.json.
"""
from __future__ import annotations

import json
from datetime import datetime, timezone

import httpx

from optimisation_engine.cost_tracker import IdempotencyHit
from optimisation_engine.niche_screener import common

# ponytail: fixed thresholds, not spec-configurable - revisit if backtest
# shows the boundary matters (2yr / DFS rank 200 of 1000 are round-number
# starting guesses, not calibrated).
YOUNG_DOMAIN_DAYS = 730
WEAK_RANK_MAX = 200

# Permanent, cross-run, cross-niche cache: a domain's age and DFS rank don't
# depend on which niche run asked about them, so paying for bulk_ranks once
# per domain (ever) is enough. Mirrors serp_fetch.py's SERP_CACHE_DIR pattern.
DOMAIN_INTEL_CACHE_DIR = common.CACHE_DIR / "domain_intel_cache"


def _domain_cache_path(domain: str):
    return DOMAIN_INTEL_CACHE_DIR / f"{domain}.json"


def _domain_cache_read(domain: str) -> dict:
    p = _domain_cache_path(domain)
    if not p.exists():
        return {}
    return json.loads(p.read_text(encoding="utf-8"))


def _domain_cache_write(domain: str, data: dict) -> None:
    DOMAIN_INTEL_CACHE_DIR.mkdir(parents=True, exist_ok=True)
    _domain_cache_path(domain).write_text(json.dumps(data, default=str), encoding="utf-8")


def _rdap_age_days(domain: str) -> int | None:
    """Free RDAP lookup via the rdap.org bootstrap redirector. No API key."""
    try:
        r = httpx.get(f"https://rdap.org/domain/{domain}", timeout=10.0, follow_redirects=True)
        if r.status_code != 200:
            return None
        data = r.json()
    except Exception:
        return None
    for ev in data.get("events") or []:
        if ev.get("eventAction") == "registration" and ev.get("eventDate"):
            try:
                dt = datetime.fromisoformat(ev["eventDate"].replace("Z", "+00:00"))
            except ValueError:
                continue
            return (datetime.now(timezone.utc) - dt).days
    return None


def parse_bulk_ranks(response: dict) -> dict[str, int | None]:
    out: dict[str, int | None] = {}
    for task in response.get("tasks") or []:
        for result in task.get("result") or []:
            for item in result.get("items") or []:
                target = (item.get("target") or "").lower()
                if target:
                    out[target] = item.get("rank")
    return out


def is_beatable(info: dict, *, young_days: int = YOUNG_DOMAIN_DAYS, weak_rank_max: int = WEAK_RANK_MAX) -> bool:
    age = info.get("age_days")
    rank = info.get("rank")
    return (age is not None and age < young_days) or (rank is not None and rank < weak_rank_max)


def _serp_domains(serps: dict) -> list[str]:
    domains: list[str] = []
    seen: set[str] = set()
    for s in serps.get("serps", {}).values():
        if not s.get("fetched"):
            continue
        for o in s.get("organic", [])[:10]:
            d = o.get("domain")
            if d and d not in seen:
                seen.add(d)
                domains.append(d)
    return domains


def fetch_domain_viability(spec: dict, run_id: str, *, site_key: str | None = "niche_screener") -> dict:
    niche = spec["name"]
    serps = common.cache_get(run_id, niche, "serps")
    if serps is None:
        raise RuntimeError(f"domain_viability: serps cache missing for {run_id}/{niche}; run serps stage first")

    domains = _serp_domains(serps)

    # whois age: free, per-domain cache.
    for d in domains:
        cached = _domain_cache_read(d)
        if "age_days" not in cached:
            cached["age_days"] = _rdap_age_days(d)
            _domain_cache_write(d, cached)

    # bulk_ranks: paid, per-domain cache, only fetch cache misses.
    need_rank = [d for d in domains if "rank" not in _domain_cache_read(d)]
    if need_rank:
        from optimisation_engine.clients.dataforseo_client import DataForSEOClient
        dfs = DataForSEOClient()
        for i in range(0, len(need_rank), 1000):
            batch = need_rank[i : i + 1000]
            try:
                resp = dfs.bulk_ranks(site_key=site_key, targets=batch)
            except IdempotencyHit:
                print(f"[domain_viability] IdempotencyHit on bulk_ranks batch {i}, "
                      f"{len(batch)} domains left unranked for now")
                continue
            parsed = parse_bulk_ranks(resp)
            for d in batch:
                cached = _domain_cache_read(d)
                cached["rank"] = parsed.get(d)
                _domain_cache_write(d, cached)

    domain_data = {d: {"age_days": _domain_cache_read(d).get("age_days"),
                        "rank": _domain_cache_read(d).get("rank")} for d in domains}
    covered = sum(1 for v in domain_data.values() if v["age_days"] is not None or v["rank"] is not None)
    out = {
        "domains": domain_data,
        "total_domains": len(domains),
        "coverage": covered / len(domains) if domains else 0.0,
    }
    common.cache_put(run_id, niche, "domain_viability", out)
    return out


if __name__ == "__main__":
    # Offline self-check: pre-populate the permanent domain cache so
    # fetch_domain_viability makes ZERO network/paid calls, then verify the
    # coverage + beatable-share math end to end.
    import shutil

    rid, niche = "run_selfcheck_dv", "test-niche"
    domains = [f"d{i}.co.uk" for i in range(10)]
    organic = [{"position": i + 1, "domain": d, "title": "", "link": "", "snippet": ""}
               for i, d in enumerate(domains)]
    common.cache_put(rid, niche, "serps", {
        "serps": {"q1": {"organic": organic, "fetched": True, "intent": "DIY"}},
        "fetched_count": 1, "requested": 1, "aio_share_diy": 0.0})

    shutil.rmtree(DOMAIN_INTEL_CACHE_DIR, ignore_errors=True)
    # 4 young, 2 weak-but-old, 2 old-and-strong, 2 fully unknown (no data).
    fixtures = {
        "d0.co.uk": {"age_days": 100, "rank": 900},
        "d1.co.uk": {"age_days": 200, "rank": 900},
        "d2.co.uk": {"age_days": 300, "rank": 900},
        "d3.co.uk": {"age_days": 400, "rank": 900},
        "d4.co.uk": {"age_days": 5000, "rank": 50},
        "d5.co.uk": {"age_days": 5000, "rank": 100},
        "d6.co.uk": {"age_days": 5000, "rank": 900},
        "d7.co.uk": {"age_days": 5000, "rank": 950},
        "d8.co.uk": {"age_days": None, "rank": None},
        "d9.co.uk": {"age_days": None, "rank": None},
    }
    for d, v in fixtures.items():
        _domain_cache_write(d, dict(v))

    out = fetch_domain_viability({"name": niche}, rid)
    assert out["total_domains"] == 10
    assert out["coverage"] == 0.8, out["coverage"]  # 8/10 have at least one signal
    beatable = [d for d, info in out["domains"].items() if is_beatable(info)]
    assert set(beatable) == {"d0.co.uk", "d1.co.uk", "d2.co.uk", "d3.co.uk", "d4.co.uk", "d5.co.uk"}, beatable
    assert out["domains"]["d8.co.uk"] == {"age_days": None, "rank": None}

    # Re-run: cache is fully warm, still zero network calls, same result.
    out2 = fetch_domain_viability({"name": niche}, rid)
    assert out2 == out

    shutil.rmtree(common.CACHE_DIR / rid, ignore_errors=True)
    shutil.rmtree(DOMAIN_INTEL_CACHE_DIR, ignore_errors=True)
    print("domain_viability.py self-check OK")
