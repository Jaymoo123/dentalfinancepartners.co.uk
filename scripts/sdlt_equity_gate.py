"""Cluster equity gate (REWRITE_PROGRAM.md section 9.9, floors 5, 6 and 7).

Deterministic pre-commit gate, per research pack. Supports both cluster batches:
  --cluster sdlt (default): briefs/property/sdlt/, pack equity lines "- N impr, ..."
  --cluster cgt:            briefs/property/cgt/,  pack equity tables (section 2),
                            plus floor 6: every section-3 keyword with volume >= 50
                            is placed in the page or listed in the page's coverage
                            note under briefs/property/cgt/notes/.

  1. Equity preservation: every section-2 equity query the baseline covered still
     matches the edited page (token coverage).
  2. Protected elements (EXTEND grades): metaTitle and H1 byte-identical to the
     baseline commit, and the baseline H2 sequence preserved in order (additions
     allowed).  REFRAME grades skip this check.
  3. Ledger balance: ledger.csv row count equals the declared universe.

Usage:
    python scripts/sdlt_equity_gate.py [--cluster sdlt|cgt] [--baseline <sha>]

Exit 0 = all gates pass. Exit 1 = any failure, listed on stdout.
Per-execution cost: none (local files + git only).
"""

from __future__ import annotations

import argparse
import csv
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BLOG_DIR = "Property/web/content/blog"

CLUSTERS = {
    "sdlt": {"dir": ROOT / "briefs" / "property" / "sdlt", "universe": 2448},
    "cgt": {"dir": ROOT / "briefs" / "property" / "cgt", "universe": 3869},
    "rental": {"dir": ROOT / "briefs" / "property" / "rental", "universe": 867},
    "landed": {"dir": ROOT / "briefs" / "property" / "rural-estates", "universe": 242},
    "agents": {"dir": ROOT / "briefs" / "property" / "agents", "universe": 39},
}

# generic calculator tools live in the registry, bespoke ones in app routes
GENERIC_TOOL_SLUGS = {
    "first-time-buyer-stamp-duty-calculator",
    "capital-gains-tax-calculator",
}

# pack page path -> repo file path
def repo_path(page: str) -> str:
    if page.startswith("Property/") and page.endswith((".md", ".ts", ".tsx")):
        return page  # rural-estates packs carry the repo path directly
    if page.startswith("/blog/"):
        slug = page.rstrip("/").split("/")[-1]
        return f"{BLOG_DIR}/{slug}.md"
    if page.startswith("/calculators/"):
        slug = page.rstrip("/").split("/")[-1]
        if slug in GENERIC_TOOL_SLUGS:
            return f"Property/web/src/lib/calculators/tools/{slug}.ts"
        return f"Property/web/src/app/calculators/{slug}/page.tsx"
    raise ValueError(f"unmapped page path: {page}")


STOPWORDS = set(
    "a an the and or of on in to for with is are do does did you your i my we our it its if when how what "
    "much many be been am can could would should will shall may might have has had this that these those "
    "not no than then there here from into out up down over under again more most".split()
)

def tokens(text: str) -> set[str]:
    return {t for t in re.findall(r"[a-z0-9]+", text.lower()) if t not in STOPWORDS and len(t) > 1}


def query_covered(query: str, page_tokens: set[str]) -> bool:
    q = tokens(query)
    if not q:
        return True
    # allow trivial plural/singular drift: a query token matches if it or a
    # +/-'s' variant is present
    for t in q:
        if t in page_tokens or t + "s" in page_tokens or t.rstrip("s") in page_tokens:
            continue
        return False
    return True


def git_show(baseline: str, path: str) -> str:
    # decode explicitly: text=True would use the Windows locale codepage and
    # mangle non-ASCII (e.g. GBP signs), breaking byte-identity comparisons
    r = subprocess.run(
        ["git", "show", f"{baseline}:{path}"],
        capture_output=True, cwd=ROOT,
    )
    return r.stdout.decode("utf-8") if r.returncode == 0 else ""


def frontmatter_field(text: str, field: str) -> str:
    # matches YAML ("metaTitle: x") and TS object literals ("  metaTitle: 'x',")
    m = re.search(rf"^\s*{field}:\s*(.+?),?\s*$", text, re.MULTILINE)
    return m.group(1).strip().strip("\"'") if m else ""


def h2_sequence(text: str) -> list[str]:
    return [re.sub(r"<[^>]+>", "", h).strip() for h in re.findall(r"<h2[^>]*>(.*?)</h2>", text, re.DOTALL | re.IGNORECASE)]


def is_subsequence(needle: list[str], haystack: list[str]) -> bool:
    it = iter(haystack)
    return all(any(n == h for h in it) for n in needle)


def parse_pack(path: Path, cluster: str) -> dict:
    text = path.read_text(encoding="utf-8")
    # rural-estates packs bold the labels ("- **Page:** `...`", "- **Grade: X**")
    # and net-new packs carry "- **Page:** NET-NEW, slug **`slug`**"; accept all
    page_line = re.search(r"^- \*{0,2}Page:\*{0,2}.*$", text, re.MULTILINE).group(0)
    if "NET-NEW" in page_line:
        slug = re.search(r"`([^`]+)`", page_line).group(1)
        page = f"{BLOG_DIR}/{slug}.md"
    else:
        page = re.search(r"`([^`]+)`", page_line).group(1)
    grade = re.search(r"^- \*{0,2}Grade[:* ]+([A-Z][A-Z-]*)", text, re.MULTILINE).group(1)
    if cluster == "sdlt":
        queries = re.findall(r"^- \d+ impr, \d+ clicks?, pos [\d.]+ :: `([^`]+)`", text, re.MULTILINE)
        market = []
    else:
        # cgt packs: section 2 equity tables "| query | impressions | clicks | position |"
        # and section 3 market table "| keyword | vol/mo | best peer pos | domain | in our copy |"
        sec2 = text.split("## 2.", 1)[-1].split("## 3.", 1)[0]
        queries = [m.group(1).strip() for m in
                   re.finditer(r"^\| ([^|]+) \| \d+ \| \d+ \| [\d.]+ \|", sec2, re.MULTILINE)
                   if not m.group(1).strip().startswith("...")]
        sec3 = text.split("## 3.", 1)[-1].split("## 4.", 1)[0]
        market = [(m.group(1).strip(), int(m.group(2))) for m in
                  re.finditer(r"^\| ([^|]+) \| (\d+) \| [^|]+ \| [^|]+ \| [^|]+ \|", sec3, re.MULTILINE)
                  if m.group(1).strip() != "keyword"]
    # pack-declared exceptions to the protected-element freeze, e.g. a statute
    # correction: "Approved protected-element change ...: H2 `old` -> `new`."
    approved = dict(re.findall(
        r"Approved protected-element change[^`]*`([^`]+)`\s*->\s*`([^`]+)`", text, re.DOTALL))
    return {"pack": path.name, "page": page, "grade": grade, "queries": queries,
            "market": market, "approved_changes": approved}


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--baseline", default="HEAD", help="git ref of the pre-edit state")
    ap.add_argument("--cluster", default="sdlt", choices=sorted(CLUSTERS))
    args = ap.parse_args()

    cfg = CLUSTERS[args.cluster]
    pack_dir = cfg["dir"] / "packs"
    notes_dir = cfg["dir"] / "notes"
    universe = cfg["universe"]

    failures: list[str] = []

    # gate 7: ledger balance
    with open(cfg["dir"] / "ledger.csv", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    if len(rows) != universe:
        failures.append(f"LEDGER: {len(rows)} rows, expected {universe}")

    for pack_file in sorted(pack_dir.glob("PACK_*.md")):
        pack = parse_pack(pack_file, args.cluster)
        rel = repo_path(pack["page"])
        fpath = ROOT / rel
        if not fpath.exists():
            failures.append(f"{pack['pack']}: target missing {rel}")
            continue
        new = fpath.read_text(encoding="utf-8")
        page_tokens = tokens(new)
        old = git_show(args.baseline, rel)
        old_tokens = tokens(old) if old else set()

        # gate 5a: equity regression. Bing/GSC query strings include junk and
        # misspellings that never matched the page literally; equity means not
        # LOSING coverage, so only queries the baseline covered must stay covered.
        for q in pack["queries"]:
            if old and query_covered(q, old_tokens) and not query_covered(q, page_tokens):
                failures.append(f"{pack['pack']}: equity query lost: {q!r}")

        # gate 5b: protected elements on EXTEND grades
        if pack["grade"].startswith("EXTEND"):
            if not old:
                failures.append(f"{pack['pack']}: baseline {args.baseline} has no {rel}")
                continue
            for field in ("metaTitle", "h1", "title"):
                ov, nv = frontmatter_field(old, field), frontmatter_field(new, field)
                if ov and ov != nv:
                    failures.append(f"{pack['pack']}: protected {field} changed: {ov!r} -> {nv!r}")
            if rel.endswith(".md"):
                old_h2 = [pack["approved_changes"].get(h, h) for h in h2_sequence(old)]
                new_h2 = h2_sequence(new)
                if not is_subsequence(old_h2, new_h2):
                    failures.append(f"{pack['pack']}: baseline H2 sequence not preserved")

        # gate 6 (cgt): cluster coverage. Every section-3 keyword with volume >= 50
        # is placed in the page, or named in the page's coverage note (a written
        # decline). The gate enforces that a decision exists; judgement made it.
        if pack["market"]:
            slug = pack["page"].rstrip("/").split("/")[-1]
            note_file = notes_dir / f"{slug}_coverage.md"
            note_text = note_file.read_text(encoding="utf-8").lower() if note_file.exists() else ""
            if not note_file.exists():
                failures.append(f"{pack['pack']}: coverage note missing ({note_file.name})")
            for kw, vol in pack["market"]:
                if vol < 50:
                    continue
                if query_covered(kw, page_tokens):
                    continue
                if kw.lower() in note_text:
                    continue
                failures.append(f"{pack['pack']}: keyword neither placed nor declined: {kw!r} (vol {vol})")

    if failures:
        print(f"EQUITY GATE: {len(failures)} failure(s)")
        for f in failures:
            print(f"  FAIL {f}")
        return 1
    print("EQUITY GATE: all packs pass (equity coverage, protected elements, ledger balance)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
