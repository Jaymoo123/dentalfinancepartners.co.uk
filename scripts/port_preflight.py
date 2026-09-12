#!/usr/bin/env python3
"""Fail before a design port starts if the workspace is not in a fit state to port from.

Why this exists (2026-09-12): five sites were ported to the Property design
standard. Every failure below was ALREADY a written rule in the 919-line
DESIGN_PORT_PLAYBOOK, and every one still happened, several more than once. A
rule in a document has now failed five times; a check that exits non-zero has
not. This is not redundant with the playbook: the playbook says what to do, this
says whether it was done. Do not delete it as duplication.

The four recorded failures it pins:

1. Nineteen orphaned `next start` processes from an earlier session were still
   listening days later, serving seven copies of one site and five of another.
   Three separate incidents had an instrument crawl the WRONG SITE and write a
   baseline from it.
2. Three STATE.md pickup blocks contradicted git. One said "phase 1 complete,
   next phase 2" when all six phases were built and tagged. A fresh agent
   reading it redoes finished work.
3. Dentists' build plans for the three phases that shipped last sat untracked on
   disk, so the specification for the most recent work existed nowhere in git.
4. `browser_check.mjs --grounds` was repaired four times because it had no test.
   The second repair introduced the bug the third fixed.

NEVER SCHEDULE THIS. Never wire it to CI, never point it at production. It is a
manual gate an agent runs by hand before starting port work. A scheduled probe
is a notification, and notifications need the owner's explicit yes first
(standard terms, rollout trap 9).

Usage:  python scripts/port_preflight.py [--site <key>] [--allow-port N ...]
                                         [--skip-slow] [--selftest]
Exit 0 = nothing failed; 1 = at least one check failed.
"""
import argparse
import pathlib
import re
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
PORT_LO, PORT_HI = 3000, 3999

# The pickup block is the only part of a STATE.md that claims CURRENT state.
# The rest of the file is dated history, and history legitimately says things
# like "phases 0-4 built", which would read as a contradiction if scanned.
PICKUP_MARKER = re.compile(r"PICKUP|PORT STATUS|PORT COMPLETE|Where it stands", re.I)
PICKUP_LINES = 40  # how far a marked block runs; head fallback when unmarked
HEAD_LINES = 60

WORDNUM = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7}

# Positive claims: the highest phase the doc says is built.
BUILT_PATTERNS = [
    re.compile(r"ALL\s+(one|two|three|four|five|six|seven)\s+PHASES\b[^.\n]{0,60}\bBUILT", re.I),
    re.compile(r"PHASES?\s+\d+\s*(?:TO|-|–)\s*(\d+)\b[^.\n]{0,60}?\b(?:BUILT|COMPLETE|DONE|COMMITTED|TAGGED)", re.I),
    re.compile(r"PHASE\s+(\d+)\s+(?:IS\s+)?(?:COMPLETE|BUILT|DONE)", re.I),
]
# Negative claims: the doc says phase N is not built. A tag for N contradicts it.
NOT_BUILT_PATTERNS = [
    re.compile(r"PHASES?\s+(\d+)(?:\s+and\s+(\d+))?\b[^.\n|]{0,80}?\bNOT\s+(?:YET\s+)?(?:BUILT|TAGGED|COMMITTED|STARTED)", re.I),
    re.compile(r"PHASES?\s+(\d+)(?:\s+and\s+(\d+))?\b[^.\n|]{0,80}?\bPLANNED\b[^.\n|]{0,40}\bNOT\s+BUILT", re.I),
    re.compile(r"^\|\s*(\d+)\s*\|\s*not\s+(?:yet\s+)?(?:tagged|built|committed)", re.I | re.M),
]


def pickup_block(text: str) -> str:
    lines = text.splitlines()
    for i, line in enumerate(lines):
        if PICKUP_MARKER.search(line):
            return "\n".join(lines[i:i + PICKUP_LINES])
    return "\n".join(lines[:HEAD_LINES])


def phase_claims(block: str) -> tuple[int | None, set[int]]:
    """(highest phase the block says is built, phases it says are NOT built)."""
    built: list[int] = []
    for pat in BUILT_PATTERNS:
        for m in pat.finditer(block):
            g = m.group(1)
            built.append(WORDNUM[g.lower()] if g.lower() in WORDNUM else int(g))
    not_built: set[int] = set()
    for pat in NOT_BUILT_PATTERNS:
        for m in pat.finditer(block):
            for g in m.groups():
                if g:
                    not_built.add(int(g))
    return (max(built) if built else None), not_built


# --------------------------------------------------------------------------- git

def git(*args: str) -> str:
    return subprocess.run(("git", *args), cwd=ROOT, capture_output=True, text=True).stdout


def phase_tags() -> dict[str, set[int]]:
    """{site key: {phase numbers tagged}} from `git tag -l port-*-phase*`."""
    out: dict[str, set[int]] = {}
    for tag in git("tag", "-l", "port-*-phase*").split():
        m = re.fullmatch(r"port-(.+)-phase(\d+)", tag)
        if m:
            out.setdefault(m.group(1), set()).add(int(m.group(2)))
    return out


def site_map() -> dict[str, str | None]:
    """{docs dir name: code dir name or None}. docs/solicitors -> Solicitors/web."""
    code = {p.parent.name.lower(): p.parent.name for p in ROOT.glob("*/web")}
    return {p.parent.name: code.get(p.parent.name.lower())
            for p in ROOT.glob("docs/*/STATE.md")}


# ------------------------------------------------------------------------ checks

def check_ports(allowed: set[int]) -> tuple[str, list[str]]:
    """Anything listening on 3000-3999 that the agent did not declare."""
    try:
        raw = subprocess.run(["netstat", "-ano"], capture_output=True, text=True, timeout=30).stdout
    except (OSError, subprocess.SubprocessError) as e:
        return "SKIPPED", [f"netstat unavailable ({e}); cannot see stray dev servers on this host"]
    found: dict[int, int] = {}
    for line in raw.splitlines():
        f = line.split()
        if len(f) < 5 or f[0] != "TCP" or f[-2] != "LISTENING":
            continue
        try:
            port = int(f[1].rsplit(":", 1)[1])
        except (ValueError, IndexError):
            continue
        if PORT_LO <= port <= PORT_HI and port not in allowed:
            found[port] = int(f[-1])
    if not found:
        return "PASS", [f"nothing listening on {PORT_LO}-{PORT_HI}"
                        + (f" (allowed: {sorted(allowed)})" if allowed else "")]
    cmds = process_details(set(found.values()))
    msg = []
    for port in sorted(found):
        pid = found[port]
        msg.append(f"port {port}  PID {pid}  {cmds.get(pid, '(command line not resolved)')}")
    msg.append("DO: for each leftover, `taskkill /PID <pid> /F`. Keep one you started "
               "deliberately by re-running with --allow-port <n>.")
    return "FAIL", msg


def process_details(pids: set[int]) -> dict[int, str]:
    """PID -> command line, best effort. Windows only; empty dict elsewhere."""
    if not pids:
        return {}
    flt = " or ".join(f"ProcessId={p}" for p in sorted(pids))
    ps = (f'Get-CimInstance Win32_Process -Filter "{flt}" | '
          'ForEach-Object { "$($_.ProcessId)`t$($_.Name)`t$($_.CommandLine)" }')
    try:
        out = subprocess.run(["powershell", "-NoProfile", "-Command", ps],
                             capture_output=True, text=True, timeout=60).stdout
    except (OSError, subprocess.SubprocessError):
        return {}
    d: dict[int, str] = {}
    for line in out.splitlines():
        parts = line.split("\t")
        if len(parts) >= 2 and parts[0].strip().isdigit():
            d[int(parts[0])] = " ".join(p.strip() for p in parts[1:] if p.strip())[:200]
    return d


def contradictions(block: str, site_tags: set[int]) -> list[str]:
    """Reasons this pickup block disagrees with these tags. Empty = it agrees.

    The comparison lives here rather than inline so --selftest exercises the
    SAME code the check runs, not a retyped copy of it.
    """
    highest_built, not_built = phase_claims(block)
    top_tag = max(site_tags)
    out: list[str] = []
    if highest_built is not None and highest_built < top_tag:
        out.append(f"claims phase {highest_built} is the highest built, "
                   f"but git has tags to phase {top_tag}")
    contradicted = sorted(not_built & site_tags)
    if contradicted:
        out.append(f"says phase(s) {contradicted} are not built/tagged/committed, "
                   "but those tags exist")
    return out


def check_state_docs() -> tuple[str, list[str]]:
    tags = phase_tags()
    sites = site_map()
    problems: list[str] = []
    notes: list[str] = []
    checked = 0
    for docs_name, code_name in sorted(sites.items()):
        site_tags = tags.get(docs_name)
        if not site_tags:
            continue  # never ported; nothing to contradict
        checked += 1
        if code_name is None:
            problems.append(f"{docs_name}: has {len(site_tags)} port tags but no matching "
                            f"<dir>/web code directory. Resolve the mapping by hand.")
            continue
        block = pickup_block((ROOT / "docs" / docs_name / "STATE.md").read_text(
            encoding="utf-8", errors="ignore"))
        top_tag = max(site_tags)
        taglist = ", ".join(f"port-{docs_name}-phase{n}" for n in sorted(site_tags))
        if phase_claims(block) == (None, set()):
            notes.append(f"{docs_name}: pickup block makes no explicit phase claim "
                         f"(tags exist to phase {top_tag}); nothing to compare")
            continue
        for reason in contradictions(block, site_tags):
            problems.append(
                f"{docs_name}: pickup block {reason}.\n         tags: {taglist}\n"
                f"         DO: correct docs/{docs_name}/STATE.md before touching {code_name}/web.")
    if problems:
        return "FAIL", problems + notes
    return "PASS", [f"{checked} ported site(s) agree with their tags"] + notes


def check_port_artefacts() -> tuple[str, list[str]]:
    out = git("status", "--porcelain", "--", "docs/*/_port/").strip()
    if not out:
        return "PASS", ["no untracked or modified files under docs/*/_port/"]
    lines = [f"{l.strip()}" for l in out.splitlines()]
    return "FAIL", lines + ["DO: commit these. The spec for the work must exist in git, "
                            "not only on this disk."]


def check_fixture_test() -> tuple[str, list[str]]:
    script = ROOT / "docs" / "_engines" / "instruments" / "grounds_fixture_test.mjs"
    if not script.exists():
        return "SKIPPED", [f"{script.relative_to(ROOT)} not found"]
    try:
        r = subprocess.run(["node", str(script)], cwd=ROOT, capture_output=True,
                           text=True, timeout=600)
    except FileNotFoundError:
        return "SKIPPED", ["node not on PATH"]
    except subprocess.TimeoutExpired:
        return "FAIL", ["grounds_fixture_test.mjs did not finish in 10 minutes"]
    if r.returncode == 0:
        return "PASS", ["grounds_fixture_test.mjs exit 0"]
    tail = (r.stdout + r.stderr).strip().splitlines()[-12:]
    blob = " ".join(tail).lower()
    if "puppeteer" in blob or "edge" in blob or "cannot find module" in blob:
        return "SKIPPED", ["needs puppeteer-core and the installed Edge; unavailable here"] + tail
    return "FAIL", ["grounds logic has regressed. DO: fix browser_check.mjs before any "
                    "grounds figure is quoted."] + tail


def report_site(key: str) -> list[str]:
    sites = site_map()
    code = sites.get(key) or sites.get(key.lower())
    if code is None and key.lower() not in {k.lower() for k in sites}:
        return [f"no docs/{key}/STATE.md; known keys: {', '.join(sorted(sites))}"]
    docs_name = key if key in sites else key.lower()
    code = code or docs_name
    dirty = git("status", "--porcelain", "--", f"{code}/").strip()
    tags = sorted(phase_tags().get(docs_name, set()))
    out = [f"tree {code}/: {'CLEAN' if not dirty else str(len(dirty.splitlines())) + ' changed file(s)'}",
           f"tags: {', '.join(f'port-{docs_name}-phase{n}' for n in tags) or 'none'}"]
    log = git("log", "-5", "--format=%h %ad %s", "--date=short", "--", f"{code}/").strip()
    out += ["last 5 commits:"] + [f"  {l}" for l in log.splitlines()]
    return out


# ----------------------------------------------------------------------- selftest

AGREES = """## PICKUP BLOCK (read this first) - design port
**Where it stands.** ALL SIX PHASES BUILT, REVIEWED AND TAGGED. Nothing deployed.
| phase | tag | commit |
| 6 | `port-x-phase6` | `abc1234` |
"""

CONTRADICTS = """## PICKUP BLOCK (read this first) - design port
**Where it stands.** Phase 1 is complete. NEXT: phase 2.
Phases 5 and 6 are PLANNED but NOT BUILT.
"""

HISTORY_ONLY = """# Site state
## 2026-09-09 SESSION 2 CLOSE - PORT PHASES 0-4 BUILT
Phases 5 and 6 are PLANNED but NOT BUILT. This was true then; it is history now,
and reading it as a current claim invents a contradiction that does not exist.

## PICKUP: START HERE
**Where it stands.** ALL SIX PHASES ARE BUILT, REVIEWED AND TAGGED.
"""


def _selftest() -> None:
    tags = {0, 1, 2, 3, 4, 5, 6}

    assert phase_claims(pickup_block(AGREES)) == (6, set())
    assert contradictions(pickup_block(AGREES), tags) == [], "doc agreeing with 6 tags must pass"

    built, not_built = phase_claims(pickup_block(CONTRADICTS))
    assert built == 1, built
    assert not_built == {5, 6}, not_built
    reasons = contradictions(pickup_block(CONTRADICTS), tags)
    assert len(reasons) == 2, reasons
    assert "highest built" in reasons[0] and "phase 6" in reasons[0], reasons[0]
    assert "[5, 6]" in reasons[1], reasons[1]

    # History above the pickup block must not be mistaken for a current claim.
    assert contradictions(pickup_block(HISTORY_ONLY), tags) == [], \
        "pickup-block scoping broke: stale history read as a current phase claim"
    print("selftest OK: 3 fixtures, parser and comparison agree")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--site", help="report tree/tags/log for one site (informational)")
    ap.add_argument("--allow-port", type=int, action="append", default=[],
                    help="a 3000-3999 port you started deliberately; repeatable")
    ap.add_argument("--skip-slow", action="store_true", help="omit the browser fixture test")
    ap.add_argument("--selftest", action="store_true", help="exercise the STATE.md parser and exit")
    args = ap.parse_args()

    if args.selftest:
        _selftest()
        return 0

    checks = [
        ("stray dev servers", lambda: check_ports(set(args.allow_port))),
        ("STATE.md vs git tags", check_state_docs),
        ("uncommitted port artefacts", check_port_artefacts),
        ("grounds fixture test",
         (lambda: ("SKIPPED", ["--skip-slow"])) if args.skip_slow else check_fixture_test),
    ]

    failed, skipped = 0, 0
    for name, fn in checks:
        verdict, detail = fn()
        failed += verdict == "FAIL"
        skipped += verdict == "SKIPPED"
        print(f"{verdict:8} {name}")
        for line in detail:
            print(f"         {line}")

    if args.site:
        print(f"\n-- {args.site} (informational) --")
        for line in report_site(args.site):
            print(f"   {line}")

    print()
    if failed:
        print(f"PREFLIGHT FAILED: {failed} check(s) failed"
              + (f", {skipped} skipped" if skipped else "")
              + ". Fix them before starting port work.")
        return 1
    print("preflight OK" + (f", but {skipped} check(s) SKIPPED and proved nothing" if skipped else ""))
    return 0


if __name__ == "__main__":
    sys.exit(main())
