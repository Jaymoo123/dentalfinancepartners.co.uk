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

Exit 0 = no HARD failures (safe to deploy). Exit 1 = a HARD gate failed.
Pass --strict to also hard-fail on em-dashes and pricing (use once swept).
"""
import re
import subprocess
import sys
import pathlib

ROOT = pathlib.Path(".")
BLOG = ROOT / "Property/web/content/blog"
STRICT = "--strict" in sys.argv

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


def main():
    print("=" * 60)
    print("PRE-DEPLOY GATE (Property)" + ("  [--strict]" if STRICT else ""))
    print("=" * 60)
    check_links()
    check_em_dashes()
    check_pricing()
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
