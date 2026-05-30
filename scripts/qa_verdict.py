#!/usr/bin/env python3
"""Track 2 WS-D D4: persist the independent-QA verdict cache the pre-deploy
gate enforces.

The independent-QA workflow (scripts/track2_independent_qa.wf.js) recomputes
every worked example and content-verifies every statute, returning a per-slug
verdict with `all_clear`. Plausibility review alone is what shipped the
backwards-2027 arithmetic and the Bill-vs-enacted framing; this records the
verdict KEYED TO THE EXACT BYTES that were reviewed (sha256 of the .md), so the
gate can prove a page was QA'd-clean in the form that is about to ship - not in
some earlier form that was later edited.

Usage
-----
1. Right after a rewrite batch, mark its pages pending (the gate then blocks any
   deploy until each passes QA - closes the "rewrite ships without QA" gap):

    python scripts/qa_verdict.py pending --batch <name> --slugs <slug> [<slug> ...]

2. Run the independent-QA workflow, save its return value to a JSON file, then:

    python scripts/qa_verdict.py record --batch <name> --verdicts <return.json>

`<return.json>` may be the workflow's whole return ({"summary":..,"pages":[..]})
or just the list of per-slug verdicts. all_clear is DERIVED from each verdict's
arithmetic_recomputed / statute_checks / links_resolve / blocking issues (not
trusted from the agent's self-reported boolean - D4 review fix), then recorded
keyed to the file sha256. A passing (all_clear) record clears the page's pending
mark. Writes optimisation_engine/.cache/qa_verdict_<name>.json.

The gate (scripts/predeploy_gate.py check_qa) enforces all of this; this script
only records/marks. See `check_qa()` in the gate for the enforcement rules.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import pathlib
import re
import time

ROOT = pathlib.Path(".")
BLOG = ROOT / "Property/web/content/blog"
CACHE = ROOT / "optimisation_engine/.cache"
PENDING = CACHE / "pending_qa.json"


def sha256_of(slug: str) -> str | None:
    p = BLOG / f"{slug}.md"
    return hashlib.sha256(p.read_bytes()).hexdigest() if p.exists() else None


_STATUTE_RE = re.compile(
    r"Finance\s*\(No\.?\s*2\)\s*Act\s*20\d\d|Finance\s+Act\s+20\d\d|\bFA\s*20\d\d|"
    r"CAA\s*2001|TCGA\s*1992|ITTOIA\s*2005|ITA\s*2007|CTA\s*20\d\d|IHTA\s*1984|"
    r"TMA\s*1970|VATA\s*1994|\bs\.?\s?\d+[A-Z]{0,3}\b|\bsection\s+\d+", re.I)


def _md_statute_citations(slug: str) -> int:
    """How many statute/section references the live .md actually makes."""
    p = BLOG / f"{slug}.md"
    if not p.exists():
        return 0
    return len(_STATUTE_RE.findall(p.read_text(encoding="utf-8")))


def _derive_all_clear(v) -> bool:
    """all_clear DERIVED from the supporting data - NOT trusted from the agent's
    self-reported boolean.

    The D4 review found that trusting the agent's all_clear lets a buggy QA
    agent wave through a page whose arithmetic or statute checks actually
    failed - the exact "trust the LLM judgement" weakness D4 exists to remove.
    So we recompute from the structured fields and AND it with the reported
    flag: a deploy is blocked if EITHER the derivation OR the agent says
    not-clear. Empty dimension arrays (e.g. a page with no calculations) pass
    that dimension. links_resolve / royal_assent_ok default True when absent
    (the QA schema always supplies them; minimal synthetic inputs do not)."""
    no_blocking = not any(
        isinstance(i, dict) and i.get("severity") == "blocking"
        for i in (v.get("issues") or []))
    arithmetic_ok = all(a.get("agrees", False)
                        for a in (v.get("arithmetic_recomputed") or []))
    statutes_ok = all(
        s.get("exists") and s.get("content_supports_claim")
        and s.get("royal_assent_ok", True)
        for s in (v.get("statute_checks") or []))
    links_ok = bool(v.get("links_resolve", True))
    # Ranking-grade dimensions. Defaults PASS when absent so existing
    # batch1/batch4 caches (recorded before coverage/meta existed) do not
    # retro-fail. eeat_present / schema_valid are quality-only and stay OUT.
    qc = v.get("query_coverage") or {}
    coverage_ok = not (qc.get("uncovered_high_demand") or [])
    meta = v.get("meta_quality") or {}
    meta_ok = meta.get("ok", True)
    derived = (no_blocking and arithmetic_ok and statutes_ok and links_ok
               and coverage_ok and meta_ok)
    reported = bool(v.get("all_clear", derived))  # absent -> use the derivation
    return derived and reported


def _rows(data):
    """Accept the workflow's whole return or a bare list of verdicts."""
    if isinstance(data, dict) and "pages" in data:
        data = data["pages"]
    if not isinstance(data, list):
        raise SystemExit("verdicts JSON must be a list of {slug, all_clear} "
                         "objects (or the workflow return with a `pages` list).")
    rows = []
    for v in data:
        if not isinstance(v, dict) or "slug" not in v:
            continue
        blocking = [i for i in (v.get("issues") or [])
                    if isinstance(i, dict) and i.get("severity") == "blocking"]
        ac = _derive_all_clear(v)
        # Anti-vacuous (red-team D4 follow-up): an empty statute_checks[] passes
        # the statute dimension by default. A page that visibly cites statutes
        # but came back with NO statute_checks was not actually verified - it
        # cannot be all_clear. Threshold 3 to ignore an incidental "s.1" mention.
        n_checks = len(v.get("statute_checks") or [])
        if ac and n_checks == 0 and _md_statute_citations(v["slug"]) >= 3:
            ac = False
            blocking = blocking + [{
                "severity": "blocking", "type": "statute",
                "detail": "QA returned no statute_checks but the page cites statutes "
                          "- statutes were not content-verified (vacuous all_clear blocked)."}]
        # Ranking-grade synthesis (mirrors the anti-vacuous-statute block):
        # uncovered high-demand queries and meta overflow are blocking.
        uncovered = (v.get("query_coverage") or {}).get("uncovered_high_demand") or []
        if uncovered:
            blocking = blocking + [{
                "severity": "blocking", "type": "coverage",
                "detail": "uncovered high-demand queries: " + ", ".join(map(str, uncovered))}]
        meta = v.get("meta_quality") or {}
        if "ok" in meta and not meta.get("ok"):
            blocking = blocking + [{
                "severity": "blocking", "type": "meta",
                "detail": "meta overflow: title_len={} desc_len={} (limits 60/155)".format(
                    meta.get("title_len"), meta.get("desc_len"))}]
        rows.append({
            "slug": v["slug"],
            "all_clear": ac,
            "reported_all_clear": bool(v.get("all_clear", False)),
            "blocking": blocking or v.get("blocking") or [],
        })
    return rows


def _load_pending() -> dict:
    if PENDING.exists():
        try:
            return json.loads(PENDING.read_text(encoding="utf-8"))
        except Exception:
            return {}
    return {}


def _save_pending(d: dict) -> None:
    CACHE.mkdir(parents=True, exist_ok=True)
    PENDING.write_text(json.dumps(d, indent=2), encoding="utf-8")


def _clear_pending(clean: dict) -> int:
    """Drop slugs that are now QA'd-clean (all_clear) with a matching hash from
    the pending-QA list. `clean` is {slug: {sha256, ...}}."""
    pend = _load_pending()
    cleared = 0
    for slug in list(pend):
        if slug in clean and clean[slug]["sha256"] == sha256_of(slug):
            del pend[slug]
            cleared += 1
    _save_pending(pend)
    return cleared


def pending(batch: str, slugs) -> None:
    """Mark freshly-rewritten slugs as awaiting independent QA, keyed to their
    current hash. The gate BLOCKS while any pending slug is still live unchanged
    - so a rewrite cannot deploy without the deterministic QA that clears it
    (D4 review should-fix: 'freshly-rewritten pages can deploy without QA').
    Run this right after a rewrite batch, with the slugs the writer returned."""
    pend = _load_pending()
    marked = []
    for slug in slugs:
        h = sha256_of(slug)
        if h is None:
            print(f"  WARNING: no .md for '{slug}' - not marked pending")
            continue
        pend[slug] = {"batch": batch, "sha256": h}
        marked.append(slug)
    _save_pending(pend)
    print(f"qa_verdict: marked {len(marked)} slug(s) pending-QA for batch '{batch}'")
    print("  the pre-deploy gate will BLOCK until each passes independent QA "
          "and is cleared by `qa_verdict.py record`.")


def record(batch: str, verdicts_path: str) -> None:
    data = json.loads(pathlib.Path(verdicts_path).read_text(encoding="utf-8"))
    rows = _rows(data)
    if not rows:
        raise SystemExit("No verdicts found in the JSON.")
    slugs, missing, overridden = {}, [], []
    for r in rows:
        h = sha256_of(r["slug"])
        if h is None:
            missing.append(r["slug"])
            continue
        slugs[r["slug"]] = {"sha256": h, "all_clear": r["all_clear"],
                            "blocking": r["blocking"]}
        if r["reported_all_clear"] and not r["all_clear"]:
            overridden.append(r["slug"])
    CACHE.mkdir(parents=True, exist_ok=True)
    out = CACHE / f"qa_verdict_{batch}.json"
    out.write_text(json.dumps(
        {"batch": batch, "ts": time.time(), "slugs": slugs}, indent=2),
        encoding="utf-8")
    print(f"qa_verdict: recorded {len(slugs)} slug(s) for batch '{batch}' -> {out}")
    if overridden:
        print(f"  NOTE: {len(overridden)} slug(s) self-reported all_clear but the "
              "deterministic derivation OVERRODE to not-clear (failing "
              f"arithmetic/statute/link/blocking): {', '.join(overridden)}")
    if missing:
        print(f"  WARNING: {len(missing)} slug(s) had no .md file (skipped): "
              f"{', '.join(missing)}")
    cleared = _clear_pending({s: v for s, v in slugs.items() if v["all_clear"]})
    if cleared:
        print(f"  cleared {cleared} slug(s) from the pending-QA list")
    not_clear = [s for s, v in slugs.items() if not v["all_clear"]]
    if not_clear:
        print(f"  {len(not_clear)} slug(s) NOT all_clear - the gate will BLOCK "
              f"until they are fixed and re-QA'd: {', '.join(not_clear)}")
    else:
        print("  all recorded slugs are all_clear")


def coverage(batch: str, slugs) -> None:
    """Run the deterministic query-coverage check per slug and write a coverage
    manifest keyed to each .md's sha256. Exit code 2 from the coverage script is
    a real gate-fail RESULT (not an error): passed=False is recorded."""
    import subprocess
    out_slugs: dict = {}
    for slug in slugs:
        h = sha256_of(slug)
        if h is None:
            print(f"  WARNING: no .md for '{slug}' - skipped")
            continue
        proc = subprocess.run(
            ["python", "scripts/track2_query_coverage.py", "--slug", slug, "--json"],
            capture_output=True, text=True)
        # exit 0 = pass/invisible, exit 2 = gate-fail; both emit JSON on stdout.
        if proc.returncode not in (0, 2):
            print(f"  WARNING: coverage script errored for '{slug}' "
                  f"(exit {proc.returncode}): {proc.stderr.strip()[:200]}")
            continue
        try:
            res = json.loads(proc.stdout)
        except Exception as e:
            print(f"  WARNING: could not parse coverage JSON for '{slug}': {e}")
            continue
        missing = [m.get("query") if isinstance(m, dict) else m
                   for m in (res.get("missing_queries") or [])]
        out_slugs[slug] = {
            "sha256": h,
            "passed": bool(res.get("passed", False)),
            "coverage_score": float(res.get("coverage_score", 0) or 0),
            "missing": missing,
        }
    CACHE.mkdir(parents=True, exist_ok=True)
    out = CACHE / f"coverage_{batch}.json"
    out.write_text(json.dumps(
        {"batch": batch, "ts": time.time(), "slugs": out_slugs}, indent=2),
        encoding="utf-8")
    passed = sum(1 for v in out_slugs.values() if v["passed"])
    print(f"qa_verdict coverage: {passed}/{len(out_slugs)} slug(s) passed -> {out}")
    failed = [s for s, v in out_slugs.items() if not v["passed"]]
    if failed:
        print(f"  NOT passed (uncovered high-demand): {', '.join(failed)}")


def main() -> None:
    ap = argparse.ArgumentParser(description="Record + track independent-QA verdicts for the pre-deploy gate.")
    sub = ap.add_subparsers(dest="cmd", required=True)
    r = sub.add_parser("record", help="write a verdict cache file from a QA-workflow return")
    r.add_argument("--batch", required=True, help="batch name (used in the cache filename)")
    r.add_argument("--verdicts", required=True, help="path to the QA workflow return JSON")
    p = sub.add_parser("pending", help="mark freshly-rewritten slugs as awaiting QA (gate blocks until cleared)")
    p.add_argument("--batch", required=True, help="batch name")
    p.add_argument("--slugs", required=True, nargs="+", help="slugs just rewritten")
    cov = sub.add_parser("coverage", help="run the deterministic query-coverage check per slug and write a coverage manifest")
    cov.add_argument("--batch", required=True, help="batch name (used in the manifest filename)")
    cov.add_argument("--slugs", required=True, nargs="+", help="slugs to check coverage for")
    a = ap.parse_args()
    if a.cmd == "record":
        record(a.batch, a.verdicts)
    elif a.cmd == "pending":
        pending(a.batch, a.slugs)
    elif a.cmd == "coverage":
        coverage(a.batch, a.slugs)


if __name__ == "__main__":
    main()
