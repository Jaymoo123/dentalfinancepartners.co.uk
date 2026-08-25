"""
Stage 2: sampled SERP fetching via Serper.

Samples the top-volume DIY long-tail queries plus the top 5 delegation
(commercial) queries and records organic top-10, AIO presence and ad counts.
IdempotencyHit (same-day duplicate) marks the query fetched=false so the
scorer can rescore safely from whatever was captured.
"""
from __future__ import annotations

from optimisation_engine.niche_screener.common import cache_get, cache_put, domain_of


def _volume_of(volumes: dict, q: str) -> int:
    v = (volumes.get("volumes", {}).get(q) or {}).get("search_volume")
    return int(v) if v else 0


def _sample(universe: dict, volumes: dict, n_longtail: int) -> tuple[list[str], list[str]]:
    queries = universe["queries"]
    diy = [e for e in queries if e.get("intent") == "DIY"]
    deleg = [e for e in queries if e.get("intent") == "DELEGATION"]
    # Top by volume; zero-volume ties keep universe (autocomplete-sourced) order.
    diy_sorted = sorted(enumerate(diy), key=lambda p: (-_volume_of(volumes, p[1]["q"]), p[0]))
    deleg_sorted = sorted(enumerate(deleg), key=lambda p: (-_volume_of(volumes, p[1]["q"]), p[0]))
    return (
        [e["q"] for _, e in diy_sorted[:n_longtail]],
        [e["q"] for _, e in deleg_sorted[:5]],
    )


def _parse_response(resp: dict) -> dict:
    organic = []
    for item in (resp.get("organic") or [])[:10]:
        organic.append({
            "position": item.get("position"),
            "title": item.get("title"),
            "link": item.get("link"),
            "domain": domain_of(item.get("link") or ""),
            "snippet": item.get("snippet"),
        })
    answer_box = resp.get("answerBox") or {}
    has_aio = "aiOverview" in resp or "ai" in str(answer_box.get("type", "")).lower()
    out = {"organic": organic, "has_aio": has_aio, "fetched": True}
    if "ads" in resp:
        out["ads_count"] = len(resp.get("ads") or [])
    return out


def fetch_serps(spec: dict, run_id: str, *, site_key: str | None = "niche_screener", n_longtail: int = 45) -> dict:
    from optimisation_engine.niche_screener.serp_fetch import fetch_serp

    niche = spec["name"]
    universe = cache_get(run_id, niche, "universe")
    volumes = cache_get(run_id, niche, "volumes")
    if universe is None or volumes is None:
        raise RuntimeError(f"serps: universe/volumes cache missing for {run_id}/{niche}")

    diy_qs, deleg_qs = _sample(universe, volumes, n_longtail)
    serps: dict[str, dict] = {}
    for q, intent in [(q, "DIY") for q in diy_qs] + [(q, "DELEGATION") for q in deleg_qs]:
        entry = None
        for attempt in (1, 2):
            try:
                entry = fetch_serp(q, num=10, site_key=site_key)
                break
            except Exception as e:  # HTTP/network: retry once
                if attempt == 2:
                    entry = {"organic": [], "has_aio": False, "fetched": False, "reason": f"error: {e}"}
        entry["intent"] = intent
        serps[q] = entry

    fetched_diy = [s for q, s in serps.items() if s["intent"] == "DIY" and s["fetched"]]
    aio_share = (sum(1 for s in fetched_diy if s["has_aio"]) / len(fetched_diy)) if fetched_diy else 0.0
    out = {
        "serps": serps,
        "fetched_count": sum(1 for s in serps.values() if s["fetched"]),
        "requested": len(serps),
        "aio_share_diy": aio_share,
    }
    cache_put(run_id, niche, "serps", out)
    return out


if __name__ == "__main__":
    # Offline self-check: sampling + response parsing only, no network.
    import shutil
    from optimisation_engine.niche_screener.common import CACHE_DIR

    rid, niche = "run_selfcheck_serps", "test-niche"
    universe = {"queries": [
        {"q": "how much does probate cost", "intent": "DIY", "source": "seed"},
        {"q": "probate forms guide", "intent": "DIY", "source": "autocomplete"},
        {"q": "probate deadline penalty", "intent": "DIY", "source": "autocomplete"},
        {"q": "probate solicitor near me", "intent": "DELEGATION", "source": "seed"},
        {"q": "best will writer london", "intent": "DELEGATION", "source": "seed"},
    ]}
    volumes = {"volumes": {
        "how much does probate cost": {"search_volume": 100},
        "probate deadline penalty": {"search_volume": 900},
        "probate solicitor near me": {"search_volume": 500},
    }, "coverage": 0.6}
    cache_put(rid, niche, "universe", universe)
    cache_put(rid, niche, "volumes", volumes)

    diy, deleg = _sample(universe, volumes, 2)
    assert diy == ["probate deadline penalty", "how much does probate cost"]
    assert deleg == ["probate solicitor near me", "best will writer london"]
    # zero-volume fallback keeps universe order
    diy3, _ = _sample(universe, {"volumes": {}}, 3)
    assert diy3 == ["how much does probate cost", "probate forms guide", "probate deadline penalty"]

    parsed = _parse_response({
        "organic": [{"position": 1, "title": "T", "link": "https://www.gov.uk/probate", "snippet": "s"}],
        "aiOverview": {"text": "..."},
        "ads": [{}, {}],
    })
    assert parsed["has_aio"] and parsed["ads_count"] == 2
    assert parsed["organic"][0]["domain"] == "gov.uk"
    parsed2 = _parse_response({"organic": [], "answerBox": {"type": "ai_overview"}})
    assert parsed2["has_aio"]
    assert not _parse_response({"organic": []})["has_aio"]

    shutil.rmtree(CACHE_DIR / rid, ignore_errors=True)
    print("serps.py self-check OK")
