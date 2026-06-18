"""Deterministic rebrand sweep: Contractor Finance Partners -> Contractor Tax Accountants.

Two literal global replaces across the contractors-ir35 shipped surfaces + engine maps + CI:
  A: "Contractor Finance Partners" -> "Contractor Tax Accountants"
  B: "contractor-finance-partners" -> "contractortaxaccountants"   (domain/email/gsc/bing/indexnow)

Excludes: supabase/migrations (applied, kept as historical record), .cache, node_modules,
.next, .vercel, .git. Pure string swaps; site_key / storage-prefix / leads source untouched
(those strings do not contain either pattern).
"""
from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

REPL = [
    ("Contractor Finance Partners", "Contractor Tax Accountants"),
    ("contractor-finance-partners", "contractortaxaccountants"),
]

EXCLUDE_DIRS = {"node_modules", ".next", ".vercel", ".git", ".cache", "migrations"}
TEXT_EXT = {".json", ".md", ".ts", ".tsx", ".css", ".py", ".yml", ".yaml", ".txt", ".example", ".mjs"}

# Explicit target roots/files (scoped so we never walk build artifacts or node_modules).
TARGETS: list[Path] = []
TARGETS += sorted((ROOT / "contractors-ir35" / "web" / "content" / "blog").glob("*.md"))
TARGETS += [
    ROOT / "contractors-ir35" / "niche.config.json",
    ROOT / "contractors-ir35" / "web" / ".env.local.example",
    ROOT / "contractors-ir35" / "web" / "src" / "app" / "globals.css",
    ROOT / "contractors-ir35" / "web" / "src" / "app" / "admin" / "analytics" / "page.tsx",
    ROOT / "optimisation_engine" / "clients" / "gsc_page_client.py",
    ROOT / "optimisation_engine" / "clients" / "bing_query_client.py",
    ROOT / "optimisation_engine" / "indexing" / "config.py",
    ROOT / "optimisation_engine" / "blog_generator" / "site_configs" / "contractors_ir35.py",
    ROOT / ".github" / "workflows" / "ci-build-test.yml",
]
TARGETS += sorted((ROOT / "docs" / "contractors-ir35").glob("*.md"))


def main() -> int:
    apply = "--apply" in sys.argv
    total_files = 0
    total_hits = 0
    for path in TARGETS:
        if not path.exists():
            print(f"  SKIP (missing): {path.relative_to(ROOT)}")
            continue
        if any(part in EXCLUDE_DIRS for part in path.parts):
            continue
        if path.suffix not in TEXT_EXT and path.name != ".env.local.example":
            continue
        text = path.read_text(encoding="utf-8")
        new = text
        hits = 0
        for old, repl in REPL:
            hits += new.count(old)
            new = new.replace(old, repl)
        if hits:
            total_files += 1
            total_hits += hits
            print(f"  {'WROTE' if apply else 'WOULD'} {hits:>2} -> {path.relative_to(ROOT)}")
            if apply and new != text:
                path.write_text(new, encoding="utf-8")
    print(f"\n{'APPLIED' if apply else 'DRY-RUN'}: {total_hits} replacements across {total_files} files.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
