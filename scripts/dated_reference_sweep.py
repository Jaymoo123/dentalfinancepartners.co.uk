"""Pre-attach dated-reference sweep: flag stale tax-year mentions / superseded figures.

Report-only (a human judges context: 'was 13.8%' with a comparison is fine).
Usage: python scripts/dated_reference_sweep.py --site care [--site ...]
No --site = all expansion sites. Exit 1 if any hits (so it works as a gate).
"""
import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXPANSION_SITES = ["charities", "hospitality", "crypto", "pharmacies", "startups-tech", "care", "ecommerce"]
EXTS = {".ts", ".tsx", ".md", ".mdx", ".json"}

# High-signal stale patterns, each with the current ground truth for the report line.
PATTERNS = [
    (re.compile(r"\b2024[/-]25\b"), "old tax year (current 2026/27)"),
    (re.compile(r"\b2025[/-]26\b"), "prior tax year (current 2026/27); OK only as explicit comparison"),
    (re.compile(r"\b13\.8%"), "employer NIC is 15% from Apr 2025"),
    (re.compile(r"£9,?100\b"), "secondary threshold is £5,000 from Apr 2025"),
    (re.compile(r"\b45p\b"), "AMAP is 55p first 10k miles from 2026/27"),
    (re.compile(r"\b8\.75%"), "basic dividend rate is 10.75% from Apr 2026"),
    (re.compile(r"\b33\.75%"), "higher dividend rate is 35.75% from Apr 2026"),
    (re.compile(r"\bWDA\b.{0,40}\b18%|18%.{0,40}\bwriting[- ]down\b", re.I), "main-rate WDA is 14% (FA 2026 s.28)"),
    (re.compile(r"\bBADR\b.{0,40}\b(10|14)%|\b(10|14)%.{0,40}\bBADR\b", re.I), "BADR is 18% from 6 Apr 2026"),
]


def sweep_site(site: str) -> list[str]:
    hits = []
    base = ROOT / site / "web" / "src"
    if not base.exists():
        return [f"MISSING dir {base.relative_to(ROOT)}"]
    for path in base.rglob("*"):
        if path.suffix not in EXTS or "node_modules" in path.parts:
            continue
        try:
            text = path.read_text(encoding="utf-8")
        except (UnicodeDecodeError, OSError):
            continue
        for lineno, line in enumerate(text.splitlines(), 1):
            for rx, why in PATTERNS:
                if rx.search(line):
                    snippet = line.strip()[:120]
                    hits.append(f"{path.relative_to(ROOT)}:{lineno}: [{why}] {snippet}")
    return hits


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--site", action="append")
    args = ap.parse_args()
    total = 0
    for site in args.site or EXPANSION_SITES:
        hits = sweep_site(site)
        print(f"== {site}: {len(hits)} hit(s)")
        for h in hits:
            print(f"  {h}")
        total += len(hits)
    return 1 if total else 0


if __name__ == "__main__":
    sys.exit(main())
