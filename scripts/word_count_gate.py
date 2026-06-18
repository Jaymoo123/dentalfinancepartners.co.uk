#!/usr/bin/env python3
"""Deterministic word-count floor checker for a site's blog corpus.

Counts words in the HTML body + FAQ text of each .md file.  Posts whose slug
appears in the site's "pillars" array are held to a higher threshold (default
2000 total words); all other cluster posts use a lower floor (default 1200).

Usage:
  python scripts/word_count_gate.py --site construction-cis
  python scripts/word_count_gate.py --site construction-cis --report
  python scripts/word_count_gate.py --site construction-cis --min-cluster 1000 --min-pillar 1800
  python scripts/word_count_gate.py --site construction-cis --files path/a.md path/b.md

Exit 0 = all files meet their threshold (or --report mode).
Exit 1 = one or more files fall below threshold.
"""
from __future__ import annotations

import argparse
import json
import pathlib
import re
import sys

import yaml

ROOT = pathlib.Path(".")


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _load_site_cfg(site: str) -> dict:
    p = ROOT / "sites" / f"{site}.json"
    if not p.exists():
        raise FileNotFoundError(f"Site config not found: {p}")
    return json.loads(p.read_text(encoding="utf-8"))


def _blog_dir(cfg: dict) -> pathlib.Path:
    return ROOT / cfg["paths"]["blogContentDir"]


def _pillars(cfg: dict) -> set:
    return set(cfg.get("pillars", []))


def split_frontmatter(text: str):
    """Return (fm_text, body_rest).  fm_text is None if no valid frontmatter."""
    if not text.startswith("---"):
        return None, text
    end = text.find("\n---", 3)
    if end == -1:
        return None, text
    return text[3:end], text[end + 4:]  # body starts after the closing ---\n


_TAG_RE = re.compile(r"<[^>]+>")
_WS_RE = re.compile(r"\s+")


def _count_words(text: str) -> int:
    stripped = _TAG_RE.sub(" ", text)
    stripped = _WS_RE.sub(" ", stripped).strip()
    if not stripped:
        return 0
    return len(stripped.split())


def analyse_file(path: pathlib.Path) -> dict | None:
    """Return analysis dict or None if the file should be skipped (no frontmatter).
    Raises on YAML parse error (loud FAIL).
    """
    raw = path.read_text(encoding="utf-8")
    fm_text, body = split_frontmatter(raw)
    if fm_text is None:
        return None  # caller prints warning + skips

    try:
        fm = yaml.safe_load(fm_text) or {}
    except yaml.YAMLError as exc:
        raise yaml.YAMLError(f"YAML parse error in {path}: {exc}") from exc

    body_words = _count_words(body)

    # FAQ words: faqs[].question + faqs[].answer
    faq_words = 0
    faqs = fm.get("faqs") or []
    if isinstance(faqs, list):
        for faq in faqs:
            if not isinstance(faq, dict):
                continue
            faq_words += _count_words(str(faq.get("question") or ""))
            faq_words += _count_words(str(faq.get("answer") or ""))

    total_words = body_words + faq_words
    slug = path.stem
    return {
        "slug": slug,
        "path": path,
        "body_words": body_words,
        "faq_words": faq_words,
        "total_words": total_words,
    }


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> int:
    ap = argparse.ArgumentParser(
        description="Word-count floor gate for a site's blog corpus."
    )
    ap.add_argument("--site", metavar="KEY",
                    help="Site key (reads sites/<key>.json for blogContentDir + pillars).")
    ap.add_argument("--files", nargs="+", metavar="PATH",
                    help="Override: check these specific .md files instead of the full corpus.")
    ap.add_argument("--min-cluster", type=int, default=1200,
                    help="Minimum TOTAL word count for cluster posts (default 1200).")
    ap.add_argument("--min-pillar", type=int, default=2000,
                    help="Minimum TOTAL word count for pillar posts (default 2000).")
    ap.add_argument("--report", action="store_true",
                    help="Report-only mode: always exit 0 (baseline read).")
    args = ap.parse_args()

    if not args.site and not args.files:
        ap.error("Pass --site <key> or --files <paths...>.")

    # Resolve file list + pillars set
    pillar_slugs: set = set()
    if args.site:
        try:
            cfg = _load_site_cfg(args.site)
        except FileNotFoundError as exc:
            print(f"ERROR: {exc}")
            return 1
        blog_dir = _blog_dir(cfg)
        pillar_slugs = _pillars(cfg)
        files: list[pathlib.Path] = sorted(blog_dir.glob("*.md"))
    else:
        files = [pathlib.Path(f) for f in args.files]

    if args.files:
        extra = [pathlib.Path(f) for f in args.files]
        # When --files given alongside --site, use only --files
        files = extra

    if not files:
        print("No .md files found.")
        return 1

    failures: list[str] = []
    skipped: list[str] = []
    results: list[dict] = []

    for path in sorted(files):
        if not path.exists():
            print(f"WARN  missing: {path}")
            skipped.append(str(path))
            continue

        try:
            info = analyse_file(path)
        except yaml.YAMLError as exc:
            # YAML error = hard FAIL
            msg = str(exc)
            print(f"FAIL  {path.stem:<55}  YAML ERROR: {msg}")
            failures.append(path.stem)
            continue

        if info is None:
            print(f"WARN  {path.stem:<55}  skipped (no frontmatter)")
            skipped.append(str(path))
            continue

        slug = info["slug"]
        kind = "pillar" if slug in pillar_slugs else "cluster"
        threshold = args.min_pillar if kind == "pillar" else args.min_cluster
        verdict = "PASS" if info["total_words"] >= threshold else "FAIL"

        line = (
            f"{verdict}  {slug:<55}  {kind:<7}  "
            f"body={info['body_words']}  faq={info['faq_words']}  "
            f"total={info['total_words']}  (floor={threshold})"
        )
        print(line)
        results.append({**info, "kind": kind, "verdict": verdict, "threshold": threshold})
        if verdict == "FAIL":
            failures.append(slug)

    # Summary
    n = len(results)
    n_pass = sum(1 for r in results if r["verdict"] == "PASS")
    n_fail = len(failures)
    n_skip = len(skipped)
    print("-" * 80)
    print(
        f"SUMMARY  {n} checked  |  {n_pass} PASS  |  {n_fail} FAIL  |  {n_skip} skipped"
    )
    if n_fail:
        print(f"FAILING SLUGS: {', '.join(failures)}")

    if args.report:
        return 0  # always pass in report mode
    return 1 if n_fail else 0


if __name__ == "__main__":
    sys.exit(main())
