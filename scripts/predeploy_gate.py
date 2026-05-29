#!/usr/bin/env python3
"""Track 2 WS-D: pre-deploy gate for the Property blog corpus.

Blocks a deploy (exit 1) if any of the recurring Track-2 defect classes are
present. Run as Step 0 of any Property production deploy (manual or autopilot):

    python scripts/predeploy_gate.py

Checks:
  1. Internal /blog links  - HARD GATE. Every link must resolve (0 HARD 404).
     Reuses the authoritative auditor (track2_link_audit.py), the route's
     source of truth (dynamicParams=false; a correct slug under the wrong
     category 404s). This is the recurring Track-2 defect class (was 229).
  2. Em-dashes             - WARNING by default, HARD under --strict. House
     style bans em-dashes (U+2014); they read as AI-generated. The legacy
     corpus still carries pre-existing em-dashes, so this is a warning until a
     dedicated sweep clears them, after which run with --strict.
  3. Service pricing       - WARNING by default, HARD under --strict. The niche
     sites are lead-gen handoffs and carry no pricing. Patterns are TIGHT
     (per hour / per page / per listing / % of rent) so they do NOT fire on the
     £-amounts that fill tax worked examples ("£400 a year" of tax, band
     ranges) - but a few legitimate market-rate mentions still surface for
     review.
  4. Independent-QA verdicts - HARD GATE. Reads the verdict cache written by
     scripts/qa_verdict.py (which records the QA workflow's per-slug verdict
     keyed to the reviewed file's sha256). Blocks if any page QA flagged NOT
     all_clear is still live unchanged. With --qa-batch <name>, additionally
     requires that batch fully QA'd-clean with matching hashes. This is the
     deterministic arithmetic + statute backstop (plausibility review alone
     shipped the backwards-2027 and Bill-vs-enacted errors).

Exit 0 = no HARD failures (safe to deploy). Exit 1 = a HARD gate failed.
Pass --strict to also hard-fail on em-dashes and pricing (use once swept).
Pass --qa-batch <name> to enforce strict QA coverage for a deploy batch.
"""
import hashlib
import json
import re
import subprocess
import sys
import pathlib

ROOT = pathlib.Path(".")
BLOG = ROOT / "Property/web/content/blog"
CACHE = ROOT / "optimisation_engine/.cache"
STRICT = "--strict" in sys.argv


def _qa_batch_arg():
    """--qa-batch <name>: enforce strict QA coverage for that batch."""
    if "--qa-batch" in sys.argv:
        i = sys.argv.index("--qa-batch")
        if i + 1 < len(sys.argv):
            return sys.argv[i + 1]
    return None


QA_BATCH = _qa_batch_arg()

failures = []   # HARD - block deploy
warnings = []   # surfaced, non-blocking unless --strict


def check_links():
    res = subprocess.run(
        [sys.executable, "scripts/track2_link_audit.py"],
        capture_output=True, text=True,
    )
    m = re.search(r"HARD 404 ISSUES:\s*(\d+)", res.stdout)
    hard = int(m.group(1)) if m else -1
    if hard == 0:
        print("[ok]   internal links: 0 HARD 404s")
    elif hard < 0:
        failures.append("Internal links: could not parse auditor output.")
        print("[FAIL] internal links: auditor output unparseable")
    else:
        failures.append(f"Internal links: {hard} HARD 404(s) - run "
                        "`python scripts/track2_link_audit.py` for the list.")
        print(f"[FAIL] internal links: {hard} HARD 404s")


def check_em_dashes():
    bucket = failures if STRICT else warnings
    label = "FAIL" if STRICT else "warn"
    hits = []
    for f in sorted(BLOG.glob("*.md")):
        for i, line in enumerate(f.read_text(encoding="utf-8").splitlines(), 1):
            if line.lstrip().startswith("editorialNote:"):
                continue  # internal note, not rendered to users
            if "—" in line:
                hits.append((f.stem, i, line.strip()[:90]))
    if not hits:
        print("[ok]   em-dashes: none")
        return
    bucket.append(f"Em-dashes: {len(hits)} rendered line(s) contain U+2014.")
    print(f"[{label}] em-dashes: {len(hits)} line(s)")
    for s, i, l in hits[:20]:
        print(f"         [{s}:{i}] {l}")


# Tight service-pricing patterns only. NOT "per year/month/week" (tax amounts
# use those) and NOT generic £ ranges (tax band ranges use those).
PRICING = [
    re.compile(r"£\s?\d[\d,]*\s*(?:per|/|a|an)\s+(?:hour|page|word|post|listing|article)", re.I),
    re.compile(r"\b\d{1,2}\s?%\s+of\s+(?:the\s+|your\s+|gross\s+|monthly\s+)*rent\b", re.I),
    re.compile(r"\b(?:our|my)\s+(?:fee|fees|pricing|rate|rates)\s+(?:start|are|is|from)\b", re.I),
]


def check_pricing():
    bucket = failures if STRICT else warnings
    label = "FAIL" if STRICT else "warn"
    hits = []
    for f in sorted(BLOG.glob("*.md")):
        txt = f.read_text(encoding="utf-8")
        for rx in PRICING:
            for m in rx.finditer(txt):
                hits.append((f.stem, m.group(0).strip()))
    if not hits:
        print("[ok]   service pricing: none")
        return
    bucket.append(f"Service pricing: {len(hits)} match(es) - review (lead-gen "
                  "sites carry no firm pricing).")
    print(f"[{label}] service pricing: {len(hits)} match(es)")
    for s, h in hits[:20]:
        print(f"         [{s}] {h!r}")


def _sha(slug):
    p = BLOG / f"{slug}.md"
    return hashlib.sha256(p.read_bytes()).hexdigest() if p.exists() else None


def check_qa():
    """Enforce the independent-QA verdict cache (WS-D D4).

    The QA workflow recomputes arithmetic + content-verifies statutes and
    records a verdict per slug, keyed to the file's sha256 (scripts/qa_verdict.py).

    ALWAYS (no flags): HARD-block if any page that QA marked NOT all_clear is
    still live UNCHANGED (its current sha256 still matches the reviewed bytes).
    A known-bad page must never ship.

    --qa-batch <name>: ALSO require that the named batch is fully deploy-ready -
    every slug present, all_clear, and its current hash matching the QA'd bytes
    (so a page edited after QA cannot ride out on a stale pass).

    PENDING (always): any freshly-rewritten page marked pending by
    `qa_verdict.py pending` and not yet cleared by a passing `record` blocks the
    deploy - so a rewrite cannot ship without the deterministic QA that clears it.
    """
    # Pending-QA blocks regardless of flags or verdict-cache presence.
    pend_file = CACHE / "pending_qa.json"
    if pend_file.exists():
        try:
            pend = json.loads(pend_file.read_text(encoding="utf-8"))
        except Exception:
            pend = {}
        still = [f"{s} (batch {i.get('batch')})" for s, i in pend.items()
                 if _sha(s) is not None and _sha(s) == i.get("sha256")]
        if still:
            failures.append(f"QA gate: {len(still)} rewritten page(s) awaiting "
                            "independent QA - run the QA workflow then "
                            "`python scripts/qa_verdict.py record` before deploy.")
            print(f"[FAIL] QA: {len(still)} page(s) pending independent QA")
            for s in still[:20]:
                print("         " + s)

    cache_files = sorted(CACHE.glob("qa_verdict_*.json")) if CACHE.exists() else []
    if not cache_files:
        if QA_BATCH:
            failures.append(f"QA gate: --qa-batch '{QA_BATCH}' requested but no "
                            "verdict cache exists - run the independent-QA "
                            "workflow then `python scripts/qa_verdict.py record`.")
            print(f"[FAIL] QA: no verdict cache (batch '{QA_BATCH}' required)")
        else:
            print("[ok]   QA verdicts: none recorded (nothing to enforce)")
        return

    # Always: no known-bad page may be live unchanged.
    known_bad = []
    for cf in cache_files:
        data = json.loads(cf.read_text(encoding="utf-8"))
        for slug, rec in data.get("slugs", {}).items():
            cur = _sha(slug)
            if cur is not None and cur == rec.get("sha256") and not rec.get("all_clear"):
                known_bad.append(f"{slug} (batch {data.get('batch')}): "
                                 f"{len(rec.get('blocking') or [])} blocking QA issue(s) unfixed")
    if known_bad:
        failures.append(f"QA gate: {len(known_bad)} live page(s) carry unresolved "
                        "blocking QA issues - fix and re-QA before deploy.")
        print(f"[FAIL] QA: {len(known_bad)} known-bad page(s) still live")
        for k in known_bad[:20]:
            print("         " + k)
    else:
        print("[ok]   QA verdicts: no known-bad live pages")

    # Strict batch coverage.
    if QA_BATCH:
        bf = CACHE / f"qa_verdict_{QA_BATCH}.json"
        if not bf.exists():
            failures.append(f"QA gate: no verdict file for batch '{QA_BATCH}' ({bf}).")
            print(f"[FAIL] QA: batch '{QA_BATCH}' verdict missing")
            return
        slugs = json.loads(bf.read_text(encoding="utf-8")).get("slugs", {})
        problems = []
        for slug, rec in slugs.items():
            cur = _sha(slug)
            if cur is None:
                problems.append(f"{slug}: .md missing")
            elif cur != rec.get("sha256"):
                problems.append(f"{slug}: changed since QA (re-QA needed)")
            elif not rec.get("all_clear"):
                problems.append(f"{slug}: not all_clear")
        if problems:
            failures.append(f"QA gate (batch '{QA_BATCH}'): {len(problems)} "
                            "slug(s) not deploy-ready.")
            print(f"[FAIL] QA batch '{QA_BATCH}': {len(problems)} slug(s) not ready")
            for p in problems[:20]:
                print("         " + p)
        else:
            print(f"[ok]   QA batch '{QA_BATCH}': all {len(slugs)} slug(s) "
                  "QA'd-clean with matching hashes")


def main():
    print("=" * 60)
    print("PRE-DEPLOY GATE (Property)" + ("  [--strict]" if STRICT else "")
          + (f"  [--qa-batch {QA_BATCH}]" if QA_BATCH else ""))
    print("=" * 60)
    check_links()
    check_em_dashes()
    check_pricing()
    check_qa()
    print("-" * 60)
    if warnings and not STRICT:
        print("WARNINGS (non-blocking; pass --strict to enforce once swept):")
        for w in warnings:
            print("  - " + w)
        print("-" * 60)
    if failures:
        print("RESULT: FAIL - deploy blocked")
        for fl in failures:
            print("  - " + fl)
        sys.exit(1)
    print("RESULT: PASS (no HARD gate failures)")
    sys.exit(0)


if __name__ == "__main__":
    main()
