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
  5. Query coverage        - OPT-IN, off by default. WARNING under --coverage,
     HARD under --coverage-strict. Confirms each rewritten page covers the
     target query set per scripts/track2_query_coverage.py. Manifest-first
     (reads optimisation_engine/.cache/coverage_<batch>.json and, exactly like
     the QA gate, re-verifies each slug's sha256 against the live file so a page
     edited after coverage cannot ride out on a stale pass); falls back to
     running the per-slug coverage script under --coverage-run.

Exit 0 = no HARD failures (safe to deploy). Exit 1 = a HARD gate failed.
Pass --strict to also hard-fail on em-dashes and pricing (use once swept).
Pass --qa-batch <name> to enforce strict QA coverage for a deploy batch.
Pass --coverage (warn) or --coverage-strict (hard) to enable the query-coverage
gate; --coverage-batch <name> selects the coverage manifest and --coverage-run
runs the per-slug coverage script as a fallback.
"""
import hashlib
import json
import re
import subprocess
import sys
import pathlib

ROOT = pathlib.Path(".")


def _arg_site() -> str:
    """--site <key> selects the site corpus (default property for back-compat)."""
    if "--site" in sys.argv:
        i = sys.argv.index("--site")
        if i + 1 < len(sys.argv):
            return sys.argv[i + 1]
    return "property"


SITE = _arg_site()


def _blog_dir(site: str) -> pathlib.Path:
    p = ROOT / "sites" / f"{site}.json"
    if p.exists():
        cfg = json.loads(p.read_text(encoding="utf-8"))
        return ROOT / cfg["paths"]["blogContentDir"]
    return ROOT / "Property/web/content/blog"


BLOG = _blog_dir(SITE)
CACHE = ROOT / "optimisation_engine/.cache"
STRICT = "--strict" in sys.argv

# Query-coverage gate is OPT-IN. --coverage = WARNING mode, --coverage-strict =
# HARD. If neither is set, check_query_coverage() is a silent no-op so existing
# callers (no flags / --strict / --qa-batch) are completely unaffected.
COVERAGE = "--coverage" in sys.argv
COVERAGE_STRICT = "--coverage-strict" in sys.argv
COVERAGE_RUN = "--coverage-run" in sys.argv


def _qa_batch_arg():
    """--qa-batch <name>: enforce strict QA coverage for that batch."""
    if "--qa-batch" in sys.argv:
        i = sys.argv.index("--qa-batch")
        if i + 1 < len(sys.argv):
            return sys.argv[i + 1]
    return None


def _coverage_batch_arg():
    """--coverage-batch <name>: select the coverage manifest for that batch."""
    if "--coverage-batch" in sys.argv:
        i = sys.argv.index("--coverage-batch")
        if i + 1 < len(sys.argv):
            return sys.argv[i + 1]
    return None


QA_BATCH = _qa_batch_arg()
COVERAGE_BATCH = _coverage_batch_arg()

# Word-count gate is OPT-IN (--word-count flag).  Without it the gate is a
# silent no-op so existing per-site gates are completely unaffected.
WORD_COUNT = "--word-count" in sys.argv

failures = []   # HARD - block deploy
warnings = []   # surfaced, non-blocking unless --strict


def check_links():
    res = subprocess.run(
        [sys.executable, "scripts/track2_link_audit.py", "--site", SITE],
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


def check_frontmatter():
    """HARD GATE: every blog page's YAML frontmatter must parse. The Track 2
    writer emits unquoted free-text values; a colon-space (e.g. "2026/27: main
    pool") makes YAML read a nested mapping and the Next.js build dies. The QA
    'frontmatter intact' check never parsed the YAML, so this slipped to build.
    Deterministic, so it belongs in the gate."""
    res = subprocess.run(
        [sys.executable, "scripts/frontmatter_lint.py", "--check", "--site", SITE],
        capture_output=True, text=True,
    )
    if res.returncode == 0:
        print("[ok]   frontmatter: all blog YAML valid")
    else:
        failures.append("Frontmatter: invalid YAML in one or more blog pages "
                        "(unquoted colon-space breaks the build). Fix with "
                        f"`python scripts/frontmatter_lint.py --fix --site {SITE}`.")
        print("[FAIL] frontmatter: invalid YAML")
        for ln in res.stdout.splitlines():
            if ln.startswith(("FRONTMATTER", "  ")):
                print("         " + ln.strip())


def check_word_count():
    """Word-count floor gate (OPT-IN via --word-count).  HARD GATE: every post
    must meet the minimum word count for its kind (cluster 1200, pillar 2000).
    Gated behind --word-count so existing site gates are not affected until
    opted in.  Exit non-zero from word_count_gate.py (without --report) = FAIL.
    """
    if not WORD_COUNT:
        return  # silent no-op; existing callers unaffected
    res = subprocess.run(
        [sys.executable, "scripts/word_count_gate.py", "--site", SITE],
        capture_output=True, text=True,
    )
    if res.returncode == 0:
        # Count PASS lines to give a useful summary
        n = sum(1 for ln in res.stdout.splitlines() if ln.startswith("PASS"))
        print(f"[ok]   word count: {n} post(s) meet floor")
    else:
        m = re.search(r"(\d+) FAIL", res.stdout)
        n_fail = int(m.group(1)) if m else "?"
        failures.append(
            f"Word count: {n_fail} post(s) below minimum floor - run "
            "`python scripts/word_count_gate.py --site {SITE} --report` for details."
        )
        print(f"[FAIL] word count: {n_fail} post(s) below floor")
        for ln in res.stdout.splitlines():
            if ln.startswith("FAIL"):
                print("         " + ln.strip())


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
    """sha256 of slug's .md under the current SITE's BLOG dir. Searches
    recursively so category-subdir corpora (e.g. solicitors) are handled."""
    matches = list(BLOG.rglob(f"{slug}.md"))
    if not matches:
        return None
    return hashlib.sha256(matches[0].read_bytes()).hexdigest()


def _parse_pending_key(key: str) -> tuple[str, str]:
    """Parse a pending_qa.json key into (site, slug).

    Keys written by qa_verdict.py:
      - bare slug  (e.g. "capital-allowances-on-vans")  -> property entry (back-compat)
      - "site:slug" (e.g. "generalist:capital-allowances-on-vans") -> non-property entry
    """
    if ":" in key:
        site_part, slug_part = key.split(":", 1)
        return site_part, slug_part
    return "property", key


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

    Key format in pending_qa.json: bare slug = property (back-compat), else
    "site:slug". The gate only enforces entries that belong to the current --site
    so that a generalist pending entry cannot block a property deploy and vice versa.
    """
    # Pending-QA blocks regardless of flags or verdict-cache presence.
    pend_file = CACHE / "pending_qa.json"
    if pend_file.exists():
        try:
            pend = json.loads(pend_file.read_text(encoding="utf-8"))
        except Exception:
            pend = {}
        still = []
        for key, info in pend.items():
            entry_site, slug = _parse_pending_key(key)
            # Only enforce entries that belong to the current --site deploy.
            if entry_site != SITE:
                continue
            h = _sha(slug)
            if h is not None and h == info.get("sha256"):
                still.append(f"{slug} (batch {info.get('batch')})")
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


def check_query_coverage():
    """Query-coverage gate (OPT-IN). No-op unless --coverage/--coverage-strict.

    Confirms each rewritten page covers its target query set. Conservative:
    WARNING under --coverage, HARD under --coverage-strict (bucket chosen the
    same way check_em_dashes/check_pricing pick failures vs warnings).

    Manifest-first: with --coverage-batch <name>, reads
    optimisation_engine/.cache/coverage_<name>.json
    ({batch, ts, slugs:{<slug>:{sha256, passed, coverage_score, missing}}}) and,
    exactly like the QA gate, re-verifies each slug's sha256 against the live
    file (a page edited after coverage needs re-coverage) plus passed===true.

    Fallback: with --coverage-run, runs
    `python scripts/track2_query_coverage.py --slug <s> --json` per slug in the
    batch manifest (subprocess exit 2 => passed=false). With no manifest there
    is no authoritative slug list, so it prints a note and skips rather than
    invent one.
    """
    if not (COVERAGE or COVERAGE_STRICT):
        return  # silent no-op; existing callers unaffected

    bucket = failures if COVERAGE_STRICT else warnings
    label = "FAIL" if COVERAGE_STRICT else "warn"

    if not COVERAGE_BATCH:
        print("[ok]   query coverage: no coverage batch specified "
              "(pass --coverage-batch <name>); nothing to enforce")
        return

    manifest = CACHE / f"coverage_{COVERAGE_BATCH}.json"
    slugs = None
    if manifest.exists():
        try:
            slugs = json.loads(manifest.read_text(encoding="utf-8")).get("slugs", {})
        except Exception:
            slugs = None
    if slugs is None and not COVERAGE_RUN:
        bucket.append(f"Query coverage (batch '{COVERAGE_BATCH}'): no/unreadable "
                      f"manifest ({manifest}) - run coverage then re-deploy, or "
                      "pass --coverage-run.")
        print(f"[{label}] query coverage: batch '{COVERAGE_BATCH}' manifest missing")
        return
    if slugs is None and COVERAGE_RUN:
        print(f"[ok]   query coverage: no manifest for batch '{COVERAGE_BATCH}' "
              "and no slug list to run - skipped (provide a manifest to enforce)")
        return

    problems = []
    if COVERAGE_RUN:
        # Fallback: run the per-slug coverage script for each manifest slug.
        for slug in slugs:
            res = subprocess.run(
                [sys.executable, "scripts/track2_query_coverage.py",
                 "--slug", slug, "--json"],
                capture_output=True, text=True,
            )
            passed = res.returncode != 2
            try:
                out = json.loads(res.stdout)
                passed = bool(out.get("passed", passed))
            except Exception:
                pass
            if res.returncode == 2:
                passed = False
            if not passed:
                problems.append(f"{slug}: coverage gate-fail (live run)")
    else:
        # Manifest-first: sha256-match each slug, then require passed===true.
        for slug, rec in slugs.items():
            cur = _sha(slug)
            if cur is None:
                problems.append(f"{slug}: .md missing")
            elif cur != rec.get("sha256"):
                problems.append(f"{slug}: changed since coverage (re-coverage needed)")
            elif rec.get("passed") is not True:
                problems.append(f"{slug}: not passed "
                                f"(missing {len(rec.get('missing') or [])} query(ies))")

    if problems:
        bucket.append(f"Query coverage (batch '{COVERAGE_BATCH}'): {len(problems)} "
                      "slug(s) not coverage-clean.")
        print(f"[{label}] query coverage: batch '{COVERAGE_BATCH}': "
              f"{len(problems)} slug(s) not clean")
        for p in problems[:20]:
            print("         " + p)
    else:
        print(f"[ok]   query coverage: batch '{COVERAGE_BATCH}': all {len(slugs)} "
              "slug(s) covered with matching hashes")


def main():
    print("=" * 60)
    print(f"PRE-DEPLOY GATE ({SITE})" + ("  [--strict]" if STRICT else "")
          + (f"  [--qa-batch {QA_BATCH}]" if QA_BATCH else "")
          + ("  [--coverage]" if COVERAGE and not COVERAGE_STRICT else "")
          + ("  [--coverage-strict]" if COVERAGE_STRICT else "")
          + (f"  [--coverage-batch {COVERAGE_BATCH}]" if COVERAGE_BATCH else "")
          + ("  [--word-count]" if WORD_COUNT else ""))
    print("=" * 60)
    check_links()
    check_frontmatter()
    check_word_count()
    check_em_dashes()
    check_pricing()
    check_qa()
    check_query_coverage()
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
