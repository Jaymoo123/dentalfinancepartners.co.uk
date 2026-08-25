"""
Triage: merge discovery-generator candidates into a screening batch.

- build_batch(): load candidates/, dedup (slug + seed-query Jaccard>0.4),
  drop banned, enforce accounting quota, write out/TRIAGE_BATCH_<date>.md.
- to_spec(): candidate -> screener spec skeleton (needs human review).

Self-check (no network):
  python -m optimisation_engine.niche_screener.generators.triage --selfcheck
"""
from __future__ import annotations

import json
from datetime import date

from optimisation_engine.niche_screener import common


def _slug(cand: dict) -> str:
    return cand["candidate_id"].rsplit("-", 3)[0]  # strip -leadmkt-YYYY-MM style suffix


def _jaccard(a: list[str], b: list[str]) -> float:
    sa, sb = set(a), set(b)
    if not sa or not sb:
        return 0.0
    return len(sa & sb) / len(sa | sb)


def _merge(base: dict, other: dict) -> None:
    seen = {e.get("url") for e in base["evidence"]}
    base["evidence"].extend(e for e in other["evidence"] if e.get("url") not in seen)
    base["seed_queries"] = sorted(set(base["seed_queries"]) | set(other["seed_queries"]))
    gens = set(base.get("generators", [base["generator"]])) | {other["generator"]}
    base["generators"] = sorted(gens)
    base["fast_track"] = len(gens) >= 2


def build_batch(max_accounting_share: float = 0.25, *, candidates: list[dict] | None = None) -> list[dict]:
    if candidates is None:
        candidates = [
            json.loads(p.read_text(encoding="utf-8"))
            for p in sorted(common.CANDIDATES_DIR.glob("*.json"))
        ]

    merged: list[dict] = []
    for cand in candidates:
        cand = dict(cand)
        cand.setdefault("generators", [cand["generator"]])
        cand.setdefault("fast_track", False)
        hit = next(
            (m for m in merged
             if _slug(m) == _slug(cand) or _jaccard(m["seed_queries"], cand["seed_queries"]) > 0.4),
            None,
        )
        if hit:
            _merge(hit, cand)
        else:
            merged.append(cand)

    batch = [c for c in merged if c["regulatory_gate"] != "banned"]
    batch.sort(key=lambda c: -len(c["evidence"]))

    # accounting quota: keep at most max_accounting_share of the batch
    max_acc = int(len(batch) * max_accounting_share)
    acc = [c for c in batch if c.get("accounting_adjacent")]
    if len(acc) > max_acc:
        drop = set(id(c) for c in acc[max_acc:])  # weakest accounting candidates (list is sorted)
        batch = [c for c in batch if id(c) not in drop]

    _write_batch_md(batch)
    return batch


def _write_batch_md(batch: list[dict]) -> None:
    common.OUT_DIR.mkdir(parents=True, exist_ok=True)
    p = common.OUT_DIR / f"TRIAGE_BATCH_{date.today().isoformat()}.md"
    lines = [
        f"# Triage batch {date.today().isoformat()}",
        "",
        "| Candidate | Evidence | Generators | Fast-track | Gate | Acc-adj |",
        "|---|---|---|---|---|---|",
    ]
    for c in batch:
        lines.append(
            f"| {c['candidate_id']} | {len(c['evidence'])} | {', '.join(c['generators'])} "
            f"| {'yes' if c.get('fast_track') else 'no'} | {c['regulatory_gate']} "
            f"| {'yes' if c.get('accounting_adjacent') else 'no'} |"
        )
    p.write_text("\n".join(lines) + "\n", encoding="utf-8")


def to_spec(candidate: dict, *, write: bool = False) -> dict:
    name = _slug(candidate)
    who = candidate.get("buyer_hypothesis", {}).get("who", "")
    provider_terms = [w for w in who.lower().split() if len(w) > 3][:6] or [name]
    spec = {
        "name": name,
        "vertical": candidate.get("vertical", name),
        "provider_terms": provider_terms,
        "provider_terms_needs_review": True,
        "pain_seeds": candidate.get("seed_queries", [])[:12],
        "regulatory_gate": candidate.get("regulatory_gate", "unknown"),
        "accounting_adjacent": candidate.get("accounting_adjacent", False),
        "seed_evidence": [e.get("url", "") for e in candidate.get("evidence", []) if e.get("url")],
    }
    if write:
        common.SPECS_DIR.mkdir(parents=True, exist_ok=True)
        (common.SPECS_DIR / f"{name}.json").write_text(
            json.dumps(spec, indent=2, ensure_ascii=False), encoding="utf-8"
        )
    return spec


def _mk(slug: str, seeds: list[str], *, gen: str = "lead-market", gate: str = "unknown",
        acc: bool = False, n_ev: int = 1) -> dict:
    return {
        "candidate_id": f"{slug}-leadmkt-2026-07",
        "vertical": slug,
        "generator": gen,
        "evidence": [{"type": "serp", "url": f"https://x{i}.com/{slug}", "excerpt": "", "metric": {}}
                     for i in range(n_ev)],
        "seed_queries": seeds,
        "buyer_hypothesis": {"who": f"UK {slug} providers", "proof": "2 domains selling per-lead"},
        "regulatory_gate": gate,
        "accounting_adjacent": acc,
    }


def _selfcheck() -> None:
    assert _jaccard(["a", "b", "c"], ["b", "c", "d"]) == 0.5
    assert _jaccard([], ["a"]) == 0.0

    cands = [
        _mk("probate", ["probate leads", "buy probate leads uk"], n_ev=2),
        _mk("probate", ["probate leads", "probate lead prices"], gen="high-cpc"),  # same slug -> merge
        _mk("solar", ["solar leads uk"], n_ev=3),
        _mk("injury", ["injury leads"], gate="banned"),
        _mk("bookkeeping", ["bookkeeping leads"], acc=True),
    ]
    batch = build_batch(candidates=cands)
    ids = [c["candidate_id"] for c in batch]
    assert "injury-leadmkt-2026-07" not in ids, "banned must be dropped"
    assert ids.count("probate-leadmkt-2026-07") == 1, "slug dedup must merge"
    probate = next(c for c in batch if _slug(c) == "probate")
    assert probate["fast_track"] and set(probate["generators"]) == {"lead-market", "high-cpc"}
    assert len(probate["evidence"]) == 2, "merged evidence union, deduped by url (x0 shared)"
    # quota: 3 non-banned after merge, 25% -> 0 accounting slots
    assert not any(c["accounting_adjacent"] for c in batch)
    assert len(batch[0]["evidence"]) >= len(batch[-1]["evidence"]), "sorted by evidence desc"

    # jaccard dedup across different slugs
    a = _mk("boiler-replacement", ["boiler leads uk", "buy boiler leads", "boiler lead gen"])
    b = _mk("boiler-quotes", ["boiler leads uk", "buy boiler leads", "boiler prices"])
    batch2 = build_batch(candidates=[a, b], max_accounting_share=1.0)
    assert len(batch2) == 1, "jaccard>0.4 must merge"

    spec = to_spec(probate)
    assert spec["name"] == "probate" and spec["provider_terms_needs_review"] is True
    assert spec["pain_seeds"] and len(spec["pain_seeds"]) <= 12
    assert spec["seed_evidence"] and all(u.startswith("https://") for u in spec["seed_evidence"])
    print("triage self-check OK")


if __name__ == "__main__":
    import sys
    if "--selfcheck" in sys.argv:
        _selfcheck()
    else:
        batch = build_batch()
        print(f"{len(batch)} candidates in batch")
