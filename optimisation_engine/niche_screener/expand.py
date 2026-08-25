"""
Stage 1a: build the query universe for a niche spec.

Sources: pain seeds + delegation probes + generic templates, expanded via
Google Autocomplete (free, throttled 1 req/s) and DataForSEO
keyword_suggestions (3 paid calls max: top 2 pain seeds + first provider probe).
Every query is intent-split (DIY / DELEGATION / OTHER) and cached as
cache/<run_id>/<niche>/universe.json.
"""
from __future__ import annotations

import re
import time

import httpx

from optimisation_engine.clients.dataforseo_client import DataForSEOClient
from optimisation_engine.cost_tracker import IdempotencyHit
from optimisation_engine.niche_screener import common

AUTOCOMPLETE_URL = "http://suggestqueries.google.com/complete/search"
# Generic templates applied to the first 6 pain seeds.
SEED_TEMPLATES = ("{seed} cost", "{seed} calculator", "how {seed}")


_STOPWORDS = {
    "a", "an", "the", "for", "of", "to", "and", "or", "in", "on", "my", "your",
    "how", "what", "when", "why", "which", "can", "do", "i", "is", "it", "uk",
    "cost", "calculator", "checker", "template", "form", "near", "me", "best",
}


def niche_vocab(spec: dict) -> set[str]:
    """Content tokens that mark a query as belonging to THIS niche.
    Built from pain seeds + vertical, minus stopwords and provider terms
    (provider terms alone match every niche using the same professionals)."""
    provider_tokens = {t for term in spec["provider_terms"] for t in term.lower().split()}
    vocab: set[str] = set()
    for phrase in list(spec["pain_seeds"]) + [spec.get("vertical", "")] + list(spec.get("audience_terms") or []):
        for tok in re.findall(r"[a-z0-9]+", phrase.lower()):
            if tok not in _STOPWORDS and tok not in provider_tokens and len(tok) > 2:
                vocab.add(tok)
    if not vocab:
        raise ValueError("niche_vocab is empty; pain_seeds are all stopwords?")
    return vocab


def in_niche(query: str, vocab: set[str]) -> bool:
    return any(tok in vocab for tok in re.findall(r"[a-z0-9]+", query.lower()))


def audience_terms(spec: dict) -> list[str]:
    """Natural nouns for the audience ("dentists", "landlords"). Falls back to
    the vertical phrase, but specs should set audience_terms explicitly:
    "accountant for dentists" is a real query, "accountant for dental practice
    accounting" is not, and dead probes silently zero the delegation signal."""
    terms = spec.get("audience_terms") or [spec.get("vertical", spec["name"].replace("-", " "))]
    return [t.strip().lower() for t in terms if t.strip()]


def build_seed_queries(spec: dict) -> list[str]:
    """Deterministic seed list: pain seeds, delegation probes, templated frames.
    Delegation probes pair provider terms with natural audience nouns so they
    stay niche-anchored without becoming zero-volume phrases."""
    seeds: list[str] = list(spec["pain_seeds"])
    for term in spec["provider_terms"]:
        for aud in audience_terms(spec):
            seeds.append(f"{term} for {aud}")
    for seed in spec["pain_seeds"][:6]:
        for tpl in SEED_TEMPLATES:
            seeds.append(tpl.format(seed=seed))
    # dedupe, preserve nothing fancy: lowercase strip + sort
    return sorted({s.strip().lower() for s in seeds if s.strip()})


def _autocomplete(client: httpx.Client, query: str) -> list[str] | None:
    """One autocomplete call. None on failure (caller counts failures)."""
    try:
        r = client.get(
            AUTOCOMPLETE_URL,
            params={"client": "firefox", "q": query, "hl": "en-GB", "gl": "uk"},
            timeout=10.0,
        )
        if r.status_code != 200:
            return None
        data = r.json()
        if isinstance(data, list) and len(data) > 1 and isinstance(data[1], list):
            return [s for s in data[1] if isinstance(s, str)]
        return []
    except Exception:
        return None


def build_universe(spec: dict, run_id: str, *, site_key: str | None = "niche_screener") -> dict:
    seeds = build_seed_queries(spec)
    # query -> source (first source wins; seed < autocomplete < dfs precedence not needed,
    # first-seen is deterministic given ordered passes below)
    found: dict[str, str] = {s: "seed" for s in seeds}
    failures = 0

    with httpx.Client() as ac:
        for seed in seeds:
            suggs = _autocomplete(ac, seed)
            time.sleep(1.0)
            if suggs is None:
                failures += 1
                continue
            for s in suggs:
                found.setdefault(s.strip().lower(), "autocomplete")
        # a-z suffix sweep on the top 2 pain seeds only
        for seed in spec["pain_seeds"][:2]:
            for ch in "abcdefghijklmnopqrstuvwxyz":
                suggs = _autocomplete(ac, f"{seed.strip().lower()} {ch}")
                time.sleep(1.0)
                if suggs is None:
                    failures += 1
                    continue
                for s in suggs:
                    found.setdefault(s.strip().lower(), "autocomplete")

    # DataForSEO keyword_suggestions: top 2 pain seeds + first provider probe = 3 calls
    dfs = DataForSEOClient()
    dfs_seeds = [s.strip().lower() for s in spec["pain_seeds"][:2]]
    dfs_seeds.append(f"{spec['provider_terms'][0]} for {audience_terms(spec)[0]}")
    for seed in dfs_seeds:
        try:
            # limit 205 not 200: distinct idempotency key from the degraded 2026-07-24 morning runs
            resp = dfs.keyword_suggestions(site_key=site_key, seed_keyword=seed, limit=205)
        except IdempotencyHit:
            print(f"[expand] IdempotencyHit on keyword_suggestions({seed!r}), treating as empty")
            continue
        for task in resp.get("tasks", []) or []:
            for result in task.get("result", []) or []:
                for item in result.get("items", []) or []:
                    kw = (item.get("keyword") or "").strip().lower()
                    if kw:
                        found.setdefault(kw, "dfs_suggestions")

    deleg = common.delegation_pattern(spec["provider_terms"])
    vocab = niche_vocab(spec)
    dropped_off_niche = 0
    queries = []
    for q, src in sorted(found.items()):
        # Relevance filter: without this, delegation probes drag in the generic
        # universe every niche shares and scores become degenerate-identical.
        if not in_niche(q, vocab):
            dropped_off_niche += 1
            continue
        queries.append({"q": q, "intent": common.classify_intent(q, deleg), "source": src})
    counts: dict[str, int] = {"total": len(queries)}
    for row in queries:
        counts[row["intent"]] = counts.get(row["intent"], 0) + 1
        counts[row["source"]] = counts.get(row["source"], 0) + 1

    out = {
        "queries": queries,
        "counts": counts,
        "autocomplete_failures": failures,
        "dropped_off_niche": dropped_off_niche,
        "seeds_used": seeds,
    }
    common.cache_put(run_id, spec["name"], "universe", out)
    return out


if __name__ == "__main__":
    # Pure-logic self-check, no network.
    spec = {
        "name": "wills-probate",
        "provider_terms": ["solicitor", "will writer"],
        "pain_seeds": ["probate cost", "inheritance tax", "diy probate"],
        "regulatory_gate": "none",
    }
    seeds = build_seed_queries(spec)
    assert "probate cost" in seeds
    assert "solicitor for wills probate" in seeds and "will writer for wills probate" in seeds
    assert "probate cost cost" in seeds  # templated (dumb but deterministic)
    assert "how inheritance tax" in seeds
    assert seeds == sorted(set(seeds)), "seeds must be deduped + sorted"
    deleg = common.delegation_pattern(spec["provider_terms"])
    assert common.classify_intent("probate solicitor fees", deleg) == "DELEGATION"
    assert common.classify_intent("how much is probate", deleg) == "DIY"

    vocab = niche_vocab(spec)
    assert "probate" in vocab and "inheritance" in vocab
    assert "solicitor" not in vocab  # provider terms excluded from niche vocab
    assert in_niche("how much does probate cost", vocab)
    assert not in_niche("solicitor for small business", vocab)  # generic pollution dropped
    print("expand.py self-check OK")
