#!/usr/bin/env python3
"""Keyword placement audit for a site's blog corpus (declared-keyword, no GSC data).

Checks that the primary keyword appears in the five critical on-page slots:
  (a) metaTitle
  (b) h1/title field
  (c) first 200 words of body text (HTML-stripped)
  (d) at least one <h2>
  (e) at least one FAQ question

Usage:
  python scripts/keyword_placement_audit.py --site construction-cis
  python scripts/keyword_placement_audit.py --site construction-cis --csv out.csv

Exit 0 = all posts score >=3/5 (or no posts found).
Exit 1 = at least one post scores <3/5.
"""
from __future__ import annotations

import argparse
import csv
import json
import pathlib
import re
import sys

import yaml

ROOT = pathlib.Path(".")

# ---------------------------------------------------------------------------
# Stop-words & NLP helpers
# ---------------------------------------------------------------------------

STOP_WORDS = {
    "the", "a", "an", "for", "and", "of", "to", "in", "uk", "guide",
    "complete", "explained", "2026", "27", "how", "what", "is", "your",
    # additional: pronouns, question words, and comparison connectors
    "i", "will", "get", "much", "does", "do", "vs", "or", "not",
    "that", "cost", "with",
}

_TAG_RE = re.compile(r"<[^>]+>", re.DOTALL)
_PUNCT_RE = re.compile(r"[^\w\s]")
_WS_RE = re.compile(r"\s+")
_H2_RE = re.compile(r"<h2[^>]*>(.*?)</h2>", re.DOTALL | re.IGNORECASE)
_H1_RE = re.compile(r"<h1[^>]*>(.*?)</h1>", re.DOTALL | re.IGNORECASE)


def _normalise(text: str) -> str:
    """Lowercase, strip HTML tags and punctuation, collapse whitespace."""
    text = _TAG_RE.sub(" ", text)
    text = text.lower()
    text = _PUNCT_RE.sub(" ", text)
    text = _WS_RE.sub(" ", text).strip()
    return text


def _tokenise(text: str) -> list[str]:
    return [t for t in _normalise(text).split() if t]


def _stem(token: str) -> str:
    """Minimal lemma: strip trailing 's' for singular/plural tolerance."""
    if len(token) > 3 and token.endswith("s"):
        return token[:-1]
    return token


def _tokens_no_stop(text: str) -> list[str]:
    return [t for t in _tokenise(text) if t not in STOP_WORDS]


def _kw_in_text(kw_tokens: list[str], text: str) -> bool:
    """True if keyword tokens (stemmed) appear in text.

    Strategy: first try a contiguous phrase match (stop-words in text may
    interrupt), then fall back to all tokens present as individual words.
    This correctly handles cases like slug 'cis-april-2026-rule-changes' where
    '2026' is a stop word stripped from the derived keyword but appears in the
    actual title, creating a gap between 'april' and 'rule'.
    """
    if not kw_tokens:
        return False
    norm_tokens = _tokenise(text)
    stemmed_norm = [_stem(t) for t in norm_tokens]
    stemmed_kw = [_stem(t) for t in kw_tokens]
    klen = len(stemmed_kw)

    # Try contiguous match first (exact phrase, possibly with stop-word gap)
    # Allow gaps of up to 3 tokens between consecutive kw tokens (stop-word tolerance)
    if klen == 1:
        return stemmed_kw[0] in stemmed_norm

    # Contiguous-with-gap: each kw token must appear in order, with up to 3 non-kw
    # tokens allowed between consecutive kw tokens.
    try:
        pos = 0
        for kw_tok in stemmed_kw:
            found_at = None
            for i in range(pos, min(pos + 6, len(stemmed_norm))):
                if stemmed_norm[i] == kw_tok:
                    found_at = i
                    break
            if found_at is None:
                break
            pos = found_at + 1
        else:
            return True  # all tokens found in order with gaps
    except Exception:
        pass

    # All-tokens-present fallback: all kw tokens occur anywhere in the text
    stemmed_norm_set = set(stemmed_norm)
    return all(t in stemmed_norm_set for t in stemmed_kw)


def _kw_any_in_text(kw_tokens: list[str], text: str) -> bool:
    """True if kw tokens appear in text (order-tolerant within reason)."""
    return _kw_in_text(kw_tokens, text)


def _first_200_words(body_html: str) -> str:
    """Strip HTML tags, return first 200 words as a string."""
    plain = _TAG_RE.sub(" ", body_html)
    plain = _WS_RE.sub(" ", plain).strip()
    words = plain.split()
    return " ".join(words[:200])


# ---------------------------------------------------------------------------
# Frontmatter / body parser
# ---------------------------------------------------------------------------

def _split_frontmatter(text: str):
    if not text.startswith("---"):
        return None, text
    end = text.find("\n---", 3)
    if end == -1:
        return None, text
    return text[3:end], text[end + 4:]


def _load_post(path: pathlib.Path) -> dict | None:
    raw = path.read_text(encoding="utf-8")
    fm_text, body = _split_frontmatter(raw)
    if fm_text is None:
        return None
    try:
        fm = yaml.safe_load(fm_text) or {}
    except yaml.YAMLError:
        return None
    return {"fm": fm, "body": body, "slug": path.stem}


# ---------------------------------------------------------------------------
# Primary keyword derivation
# ---------------------------------------------------------------------------

def _derive_primary_keyword(fm: dict, slug: str) -> str:
    """Return the primary keyword string (not yet tokenised)."""
    # Priority 1: explicit frontmatter field
    for key in ("primaryKeyword", "primary_keyword", "primary_query"):
        val = fm.get(key)
        if val and isinstance(val, str) and val.strip():
            return val.strip()

    # Priority 2: longest contiguous slug-token phrase that also appears
    # as tokens in metaTitle (after removing stop words).
    meta_title = fm.get("metaTitle", "") or ""
    slug_tokens = [t for t in re.split(r"[-_]", slug) if t and t not in STOP_WORDS]
    mt_tokens = _tokens_no_stop(meta_title)
    mt_stemmed = [_stem(t) for t in mt_tokens]

    best_phrase = ""
    # Try longest possible contiguous subsequence of slug_tokens
    for length in range(len(slug_tokens), 0, -1):
        for start in range(len(slug_tokens) - length + 1):
            candidate = slug_tokens[start: start + length]
            candidate_stemmed = [_stem(t) for t in candidate]
            # Check that all candidate tokens appear in metaTitle tokens
            if all(cs in mt_stemmed for cs in candidate_stemmed):
                best_phrase = " ".join(candidate)
                break
        if best_phrase:
            break

    if best_phrase:
        return best_phrase

    # Last resort: slug with hyphens replaced by spaces (minus stops)
    fallback = " ".join(t for t in re.split(r"[-_]", slug) if t not in STOP_WORDS)
    return fallback or slug


# ---------------------------------------------------------------------------
# Slot checkers
# ---------------------------------------------------------------------------

def _check_slots(kw_tokens: list[str], fm: dict, body: str) -> dict[str, bool]:
    """Return {slot_name: bool} for the 5 slots."""
    meta_title = fm.get("metaTitle", "") or fm.get("title", "") or ""
    h1_field = fm.get("h1", "") or fm.get("title", "") or ""
    faqs = fm.get("faqs") or []

    # Slot (a): metaTitle
    in_meta_title = _kw_any_in_text(kw_tokens, meta_title)

    # Slot (b): h1 frontmatter field; also check <h1> in body
    in_h1 = _kw_any_in_text(kw_tokens, h1_field)
    if not in_h1:
        h1_matches = _H1_RE.findall(body)
        for h1_text in h1_matches:
            if _kw_any_in_text(kw_tokens, h1_text):
                in_h1 = True
                break

    # Slot (c): first 200 words of body
    intro_text = _first_200_words(body)
    in_intro = _kw_any_in_text(kw_tokens, intro_text)

    # Slot (d): at least one <h2>
    h2_matches = _H2_RE.findall(body)
    in_h2 = any(_kw_any_in_text(kw_tokens, h2_text) for h2_text in h2_matches)

    # Slot (e): at least one FAQ question
    in_faq = False
    if isinstance(faqs, list):
        for faq in faqs:
            if isinstance(faq, dict):
                q = faq.get("question", "") or ""
                if _kw_any_in_text(kw_tokens, q):
                    in_faq = True
                    break

    return {
        "title": in_meta_title,
        "h1": in_h1,
        "intro": in_intro,
        "h2": in_h2,
        "faq": in_faq,
    }


# ---------------------------------------------------------------------------
# Site config loader
# ---------------------------------------------------------------------------

def _load_site_cfg(site: str) -> dict:
    p = ROOT / "sites" / f"{site}.json"
    if not p.exists():
        raise FileNotFoundError(f"Site config not found: {p}")
    return json.loads(p.read_text(encoding="utf-8"))


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> int:
    ap = argparse.ArgumentParser(
        description="Keyword placement audit for a site's blog corpus."
    )
    ap.add_argument("--site", required=True, metavar="KEY",
                    help="Site key (reads sites/<key>.json for blogContentDir).")
    ap.add_argument("--csv", metavar="PATH",
                    help="Write full results table to this CSV file.")
    args = ap.parse_args()

    try:
        cfg = _load_site_cfg(args.site)
    except FileNotFoundError as exc:
        print(f"ERROR: {exc}")
        return 1

    blog_dir = ROOT / cfg["paths"]["blogContentDir"]
    md_files = sorted(blog_dir.glob("*.md"))

    if not md_files:
        print(f"No .md files found in {blog_dir}")
        return 0

    rows: list[dict] = []
    failures: list[str] = []
    skipped: list[str] = []

    for path in md_files:
        post = _load_post(path)
        if post is None:
            print(f"WARN  {path.stem:<55}  skipped (no frontmatter)")
            skipped.append(path.stem)
            continue

        fm = post["fm"]
        body = post["body"]
        slug = post["slug"]

        kw_phrase = _derive_primary_keyword(fm, slug)
        kw_tokens = [t for t in _tokenise(kw_phrase) if t]

        slots = _check_slots(kw_tokens, fm, body)
        score = sum(slots.values())

        yn = {k: "Y" if v else "N" for k, v in slots.items()}
        line = (
            f"{'FAIL' if score < 3 else 'PASS'}  "
            f"{slug:<55}  "
            f"kw={kw_phrase!r:<35}  "
            f"title:{yn['title']} h1:{yn['h1']} intro:{yn['intro']} h2:{yn['h2']} faq:{yn['faq']}  "
            f"score={score}/5"
        )
        print(line)

        row = {
            "slug": slug,
            "primary_keyword": kw_phrase,
            "title": yn["title"],
            "h1": yn["h1"],
            "intro": yn["intro"],
            "h2": yn["h2"],
            "faq": yn["faq"],
            "score": score,
            "verdict": "FAIL" if score < 3 else "PASS",
        }
        rows.append(row)
        if score < 3:
            failures.append(slug)

    # CSV output
    if args.csv and rows:
        csv_path = pathlib.Path(args.csv)
        csv_path.parent.mkdir(parents=True, exist_ok=True)
        with csv_path.open("w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
            writer.writeheader()
            writer.writerows(rows)
        print(f"\nCSV written to {csv_path}")

    # Summary
    n = len(rows)
    n_pass = n - len(failures)
    n_skip = len(skipped)
    print("-" * 90)
    print(
        f"SUMMARY  {n} checked  |  {n_pass} PASS  |  {len(failures)} FAIL  |  {n_skip} skipped"
    )

    if failures:
        print(f"\nFAIL LIST ({len(failures)} posts scoring <3/5):")
        for slug in failures:
            matching_rows = [r for r in rows if r["slug"] == slug]
            if matching_rows:
                r = matching_rows[0]
                print(
                    f"  {slug:<55}  kw={r['primary_keyword']!r}  "
                    f"score={r['score']}/5  "
                    f"missing=[{', '.join(k for k in ('title','h1','intro','h2','faq') if r[k]=='N')}]"
                )

    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
