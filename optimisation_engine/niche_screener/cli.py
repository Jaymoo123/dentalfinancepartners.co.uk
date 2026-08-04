"""
Niche screener CLI.

  python -m optimisation_engine.niche_screener.cli screen specs/<niche>.json [--run-id X] [--stage2]
  python -m optimisation_engine.niche_screener.cli viability --run-id X --spec specs/<niche>.json
  python -m optimisation_engine.niche_screener.cli rescore --run-id X --spec specs/<niche>.json
  python -m optimisation_engine.niche_screener.cli report  --run-id X --spec specs/<niche>.json

Stage-1 modules (expand/volumes/gates) are imported lazily: a missing module
means that stage is not built yet and screen fails with a clear error.
"""
from __future__ import annotations

import argparse
import importlib
import json
import sys
from datetime import datetime, timezone

from optimisation_engine.niche_screener.common import (
    OUT_DIR,
    cache_get,
    load_spec,
    new_run_id,
    write_manifest,
)


def _call_stage(module_name: str, candidates: list[str], spec: dict, run_id: str):
    """Lazy-import a stage-1 module and call its entry function."""
    try:
        mod = importlib.import_module(f"optimisation_engine.niche_screener.{module_name}")
    except ImportError as e:
        raise SystemExit(
            f"stage module {module_name!r} not available (built in parallel, not yet landed): {e}")
    for name in candidates:
        fn = getattr(mod, name, None)
        if callable(fn):
            return fn(spec, run_id)
    raise SystemExit(
        f"stage module {module_name!r} has none of the expected entry points {candidates}")


def cmd_screen(args) -> None:
    spec = load_spec(args.spec)
    run_id = args.run_id or new_run_id()
    niche = spec["name"]
    print(f"[screen] niche={niche} run_id={run_id}")

    # Stage 0: regulatory gate first, before spending anything.
    if spec["regulatory_gate"] == "banned":
        print(f"[screen] G0 regulatory gate = banned. Aborting.")
        write_manifest(run_id, niche, {"aborted": "G0 regulatory banned"})
        return

    _call_stage("expand", ["expand", "build_universe", "run"], spec, run_id)
    _call_stage("volumes", ["fetch_volumes", "volumes", "run"], spec, run_id)
    gates_result = _call_stage("gates", ["run_gates", "evaluate_gates", "gates", "run"], spec, run_id)
    gates_result = gates_result or cache_get(run_id, niche, "gates") or {}
    overall = str(gates_result.get("overall", "")).upper()
    print(f"[screen] gates overall = {overall or 'unknown'}")

    summaries = {"gates": gates_result}
    if args.stage2 and overall == "PASS":
        from optimisation_engine.niche_screener.serps import fetch_serps
        from optimisation_engine.niche_screener.classify import classify_domains
        from optimisation_engine.niche_screener.domain_viability import fetch_domain_viability
        from optimisation_engine.niche_screener.score import score_niche
        from optimisation_engine.niche_screener import tripwires

        serps = fetch_serps(spec, run_id)
        print(f"[screen] serps fetched {serps['fetched_count']}/{serps['requested']}")
        domains, context = [], {}
        for s in serps["serps"].values():
            for o in s.get("organic", []):
                domains.append(o["domain"])
                context.setdefault(o["domain"], {"title": o.get("title"), "snippet": o.get("snippet")})
        cls = classify_domains(domains, spec, run_id, context=context)
        print(f"[screen] classified {len(cls['classes'])} domains, unknown_rate={cls['unknown_rate']:.2f}")
        dv = fetch_domain_viability(spec, run_id)
        print(f"[screen] domain_viability coverage={dv['coverage']:.2f} ({dv['total_domains']} domains)")
        score = score_niche(spec, run_id)
        trips = tripwires.evaluate(run_id, niche)
        print(f"[screen] total={score['total']} range=[{score['total_min']},{score['total_max']}] "
              f"verdict={trips['verdict']}")
        summaries.update({
            "serps": {k: serps[k] for k in ("fetched_count", "requested", "aio_share_diy")},
            "classify": {"unknown_rate": cls["unknown_rate"], "llm_share": cls["llm_share"]},
            "score": {k: score[k] for k in ("total", "total_min", "total_max", "complete")},
            "tripwires": trips,
        })
    elif args.stage2:
        print(f"[screen] gates did not PASS; stage 2 skipped")

    write_manifest(run_id, niche, {"stages": summaries})
    print(f"[screen] manifest written")


def cmd_viability(args) -> None:
    """Standalone paid fetch of new_domain_viability data (whois + bulk_ranks)
    over an existing run's cached serps.json, for runs that predate this
    component. Not called by `rescore` (which must stay network-free)."""
    from optimisation_engine.niche_screener.domain_viability import fetch_domain_viability

    spec = load_spec(args.spec)
    niche = spec["name"]
    if cache_get(args.run_id, niche, "serps") is None:
        raise SystemExit(f"no cached serps for {args.run_id}/{niche}; run screen --stage2 first")
    dv = fetch_domain_viability(spec, args.run_id)
    print(f"[viability] coverage={dv['coverage']:.2f} domains={dv['total_domains']}")


def cmd_rescore(args) -> None:
    from optimisation_engine.niche_screener.score import score_niche
    from optimisation_engine.niche_screener import tripwires
    import socket

    spec = load_spec(args.spec)
    niche = spec["name"]
    if cache_get(args.run_id, niche, "universe") is None:
        raise SystemExit(f"no cached universe for {args.run_id}/{niche}")

    # Rescore must be pure: hard-block any accidental network use.
    real_socket = socket.socket

    def _blocked(*a, **k):
        raise AssertionError("rescore attempted a network call - score must be pure")

    socket.socket = _blocked
    try:
        score = score_niche(spec, args.run_id)
        trips = tripwires.evaluate(args.run_id, niche)
    finally:
        socket.socket = real_socket
    print(json.dumps({"score": score, "tripwires": trips}, indent=2))


def cmd_report(args) -> None:
    spec = load_spec(args.spec)
    niche = spec["name"]
    run_id = args.run_id
    gates = cache_get(run_id, niche, "gates") or {}
    score = cache_get(run_id, niche, "score")
    serps = cache_get(run_id, niche, "serps") or {"serps": {}}
    classify = cache_get(run_id, niche, "classify") or {"classes": {}}
    if score is None:
        raise SystemExit(f"no cached score for {run_id}/{niche}; run screen --stage2 or rescore first")
    from optimisation_engine.niche_screener import tripwires
    trips = tripwires.evaluate(run_id, niche)

    lines = [
        f"# Niche dossier: {niche}",
        "",
        f"Run: `{run_id}` at {datetime.now(timezone.utc).isoformat()}",
        f"Total: **{score['total']}** (range [{score['total_min']}, {score['total_max']}], "
        f"complete: {score['complete']})",
        "",
        "## Gates",
        "",
        "| Gate | Result |",
        "|---|---|",
    ]
    for g in ("G0", "G1", "G2", "G3", "G4", "overall"):
        val = gates.get(g)
        if isinstance(val, dict):
            val = val.get("status", val.get("result", json.dumps(val)[:80]))
        lines.append(f"| {g} | {val} |")
    lines += ["", "## Components", "", "| Component | Raw | Normalised | Weighted | Note |", "|---|---|---|---|---|"]
    for name, c in score["components"].items():
        if c["is_null"]:
            lines.append(f"| {name} | NULL | NULL | NULL | {c['note']} |")
        else:
            lines.append(f"| {name} | {json.dumps(c['raw'])} | {c['normalised']} | {c['weighted']} | {c['note']} |")
    lines += ["", "## Tripwires", "", f"Verdict: **{trips['verdict']}**", ""]
    for f in trips["hard_fails"]:
        lines.append(f"- HARD: {f}")
    for f in trips["soft_flags"]:
        lines.append(f"- soft: {f}")

    # Top winnable queries: fetched DIY SERPs ranked by thinness (fewest specialists).
    classes = classify["classes"]
    rows = []
    for q, s in serps["serps"].items():
        if s.get("intent") != "DIY" or not s.get("fetched") or not s.get("organic"):
            continue
        cls = [classes.get(o["domain"], {}).get("class", "UNKNOWN") for o in s["organic"][:10]]
        rows.append((q, cls.count("SPECIALIST"), sum(1 for c in cls if c in ("UGC", "INFO"))))
    rows.sort(key=lambda r: (r[1], -r[2]))
    lines += ["", "## Top winnable queries", "", "| Query | Specialists in top 10 | UGC+INFO slots |", "|---|---|---|"]
    for q, sp, weak in rows[:15]:
        lines.append(f"| {q} | {sp} | {weak} |")
    lines.append("")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out_path = OUT_DIR / f"{niche}_{run_id}.md"
    out_path.write_text("\n".join(lines), encoding="utf-8")
    print(f"[report] wrote {out_path}")


def main(argv=None) -> None:
    p = argparse.ArgumentParser(prog="niche_screener")
    sub = p.add_subparsers(dest="cmd", required=True)

    s = sub.add_parser("screen", help="run the screening pipeline for a spec")
    s.add_argument("spec")
    s.add_argument("--run-id", default=None)
    s.add_argument("--stage2", action="store_true")
    s.set_defaults(fn=cmd_screen)

    v = sub.add_parser("viability", help="paid: fetch new_domain_viability data (whois+bulk_ranks) for a run")
    v.add_argument("--run-id", required=True)
    v.add_argument("--spec", required=True)
    v.set_defaults(fn=cmd_viability)

    r = sub.add_parser("rescore", help="pure rescore from cache, no network")
    r.add_argument("--run-id", required=True)
    r.add_argument("--spec", required=True)
    r.set_defaults(fn=cmd_rescore)

    rp = sub.add_parser("report", help="write out/<niche>_<run_id>.md dossier")
    rp.add_argument("--run-id", required=True)
    rp.add_argument("--spec", required=True)
    rp.set_defaults(fn=cmd_report)

    args = p.parse_args(argv)
    args.fn(args)


if __name__ == "__main__":
    if len(sys.argv) > 1:
        main()
        sys.exit(0)

    # Self-check: rescore + report over synthetic caches, no network.
    import shutil
    import tempfile
    from pathlib import Path
    from optimisation_engine.niche_screener.common import CACHE_DIR, cache_put

    rid, niche = "run_selfcheck_cli", "test-niche"
    spec = {"name": niche, "provider_terms": ["solicitor"], "pain_seeds": ["probate cost"],
            "regulatory_gate": "none"}
    spec_path = Path(tempfile.gettempdir()) / "niche_screener_selfcheck_spec.json"
    spec_path.write_text(json.dumps(spec), encoding="utf-8")

    diy_qs = [f"probate question {i}" for i in range(30)]
    cache_put(rid, niche, "universe", {"queries": [{"q": q, "intent": "DIY", "source": "seed"} for q in diy_qs]})
    cache_put(rid, niche, "volumes", {"volumes": {q: {"search_volume": 100} for q in diy_qs}, "coverage": 0.9})
    organic = [{"position": i + 1, "domain": f"d{i}.co.uk", "title": "", "link": "", "snippet": ""} for i in range(10)]
    cache_put(rid, niche, "serps", {
        "serps": {q: {"organic": organic, "has_aio": False, "fetched": True, "intent": "DIY"} for q in diy_qs},
        "fetched_count": 30, "requested": 30, "aio_share_diy": 0.0})
    cache_put(rid, niche, "classify", {
        "classes": {f"d{i}.co.uk": {"class": "GENERALIST", "tier": 3, "confidence": "med"} for i in range(10)},
        "unknown_rate": 0.0, "llm_share": 0.0})
    cache_put(rid, niche, "gates", {"G0": "PASS", "G1": {"status": "PASS", "evidence": {"broker_count": 2}},
                                    "G2": "PASS", "G3": "PASS", "G4": "PASS", "overall": "PASS"})

    main(["rescore", "--run-id", rid, "--spec", str(spec_path)])
    assert cache_get(rid, niche, "score") is not None
    main(["report", "--run-id", rid, "--spec", str(spec_path)])
    out_path = OUT_DIR / f"{niche}_{rid}.md"
    text = out_path.read_text(encoding="utf-8")
    assert "## Gates" in text and "## Components" in text and "## Top winnable queries" in text

    out_path.unlink()
    spec_path.unlink()
    shutil.rmtree(CACHE_DIR / rid, ignore_errors=True)
    print("cli.py self-check OK")
