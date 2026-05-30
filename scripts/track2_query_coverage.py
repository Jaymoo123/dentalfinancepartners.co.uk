"""Deterministic query-coverage checker for Track 2 blog rewrites.

WHAT THIS IS
------------
A gateable PLACEMENT FLOOR. For a given legacy property-tax page it answers one
deterministic question: are the queries the page already gets impressions for
(GSC + Bing) actually *placed* somewhere on the page - ideally in a structural
slot (metaTitle / h1 / an H2 / an FAQ), with the body as backstop?

WHAT THIS IS NOT
----------------
This is NOT a keyword-density target and NOT a naturalness judge.
  - Per-field overlap is CAPPED at 1.0 - repetition gains a query nothing.
  - It never rewards stuffing; covering a query once, well-placed, scores full.
  - Whether the prose reads naturally is judged elsewhere (writer + verifier).
The gate only guarantees that proven demand is not silently dropped on rewrite.

MATCHING (stdlib only - no nltk, no embeddings)
-----------------------------------------------
Normalise: lowercase, NFKC, strip punctuation (keep digits), collapse
whitespace, map '£' and 'gbp' to one token. Drop a fixed UK stopword set. Light
suffix-stem (s/es/ing/ed only). NUMBERS MATCH EXACTLY: "section 24" never
matches "section 23" because the number token is a literal that must be present.

A query is covered if best single-field overlap >= 0.80, OR (body overlap
>= 0.67 AND it also appears structurally in metaTitle/h1/an H2/an FAQ); partial
if 0.50 <= best < 0.80; missing if < 0.50. A 1-term query must match that term
exactly.

GATE
----
high_demand = GSC/Bing queries with impr >= --gate-impr. Exit code 2 only if the
page has >=1 high_demand query AND the impression-weighted covered fraction of
high_demand queries < --gate-bar. Otherwise exit 0. INVISIBLE pages (no GSC and
no Bing rows) never gate; coverage is computed against the adjacent set purely
for information.

CLI
---
  python scripts/track2_query_coverage.py --slug <slug> [--json] [--data <pull.json>]
      [--gate-impr 50] [--gate-bar 0.80] [--adjacent] [--selftest]

--data <pull.json>  read target_queries (+ adjacent) from a pull_page_data JSON
                    dump instead of hitting Supabase (offline / reproducible).
--adjacent          also pull/consider the adjacent keyword set (weight 0).
--selftest          run hand-built classifier fixtures, print PASS/FAIL, no DB.
"""
from __future__ import annotations

import argparse
import json
import pathlib
import re
import sys
import unicodedata

import yaml

ROOT = pathlib.Path(__file__).resolve().parents[1]
BLOG_DIR = ROOT / "Property" / "web" / "content" / "blog"

# Allow `python scripts/track2_query_coverage.py ...` to import the engine
# package (the repo root is not on sys.path when run as a standalone script).
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

# Coverage thresholds (placement floor, not density).
COVERED_BAR = 0.80          # best single-field overlap at/above this -> covered
BODY_BACKSTOP_BAR = 0.67    # body overlap that, with structural presence, covers
PARTIAL_BAR = 0.50          # at/above this (but below covered) -> partial
PARTIAL_WEIGHT = 0.5        # a partial query counts half in the weighted score

STRUCTURAL_FIELDS = ("metaTitle", "h1", "h2s", "faqs")

# Fixed UK stopword set (matches the spec exactly).
STOPWORDS = {
    "the", "a", "an", "for", "to", "of", "in", "on", "uk", "my", "your", "how",
    "what", "can", "i", "do", "is", "are", "and", "or", "with", "vs",
}


# --------------------------------------------------------------------------- #
# Normalisation + tokenisation                                                 #
# --------------------------------------------------------------------------- #
def _normalise(text: str) -> str:
    """Lowercase, NFKC, map currency, strip punctuation (keep digits), collapse ws."""
    if not text:
        return ""
    t = unicodedata.normalize("NFKC", text).lower()
    # Map currency markers to a single token so '£' and 'gbp' are equivalent.
    t = t.replace("£", " gbp ")
    # Keep word chars (incl. digits + underscore) and whitespace; drop the rest.
    t = re.sub(r"[^\w\s]", " ", t)
    t = re.sub(r"\s+", " ", t).strip()
    return t


def _is_number_token(tok: str) -> bool:
    """A token that contains a digit is treated as a literal (exact-match)."""
    return any(ch.isdigit() for ch in tok)


def _stem(tok: str) -> str:
    """Very light suffix stem: strip s/es/ing/ed only. Number tokens untouched.

    Plurals are reduced to a single canonical stem so singular and plural unify
    (e.g. 'allowance' and 'allowances' both -> 'allowance', 'rate'/'rates' ->
    'rate'). To achieve that, a trailing 's' is stripped as just 's' (NOT 'es')
    whenever the result still has length >= 3; 'es' is only stripped where 's'
    alone is not enough (e.g. a stem ending in s/x/z). 'ing'/'ed' first.
    """
    if _is_number_token(tok):
        return tok
    for suf in ("ing", "ed"):
        if tok.endswith(suf) and len(tok) - len(suf) >= 3:
            return tok[: -len(suf)]
    if tok.endswith("s") and len(tok) - 1 >= 3:
        stem = tok[:-1]
        # 'boxes' -> strip 'es'; otherwise strip just the trailing 's'.
        if stem.endswith("e") and stem[:-1] and stem[:-1][-1] in "sxz":
            return stem[:-1]
        return stem
    return tok


def content_terms(text: str) -> list[str]:
    """Normalised, stopword-dropped, lightly stemmed content tokens (order kept)."""
    out: list[str] = []
    for tok in _normalise(text).split():
        if _is_number_token(tok):
            out.append(tok)  # literal: must be present exactly, no stemming/stopping
            continue
        if tok in STOPWORDS:
            continue
        out.append(_stem(tok))
    return out


def _term_set(text: str) -> set[str]:
    return set(content_terms(text))


def _query_terms(query: str) -> list[str]:
    """Ordered, de-duplicated content terms for a query."""
    seen: set[str] = set()
    out: list[str] = []
    for t in content_terms(query):
        if t not in seen:
            seen.add(t)
            out.append(t)
    return out


# --------------------------------------------------------------------------- #
# Per-query coverage                                                           #
# --------------------------------------------------------------------------- #
def _field_overlap(q_terms: list[str], field_terms: set[str]) -> float:
    """|matched ∩ query_terms| / |query_terms|, capped at 1.0 (no repetition gain).

    Number tokens (e.g. '24', '2026') are LITERALS that must be present: if any
    number token in the query is absent from the field, the field cannot reach
    the covered/structural bar, so its overlap is hard-capped just below it. This
    is what keeps 'section 24' from matching a 'section 23' page even though all
    the other (more numerous) word tokens overlap.
    """
    if not q_terms:
        return 0.0
    matched = sum(1 for t in q_terms if t in field_terms)
    score = min(matched / len(q_terms), 1.0)
    # Enforce number literals.
    missing_number = any(_is_number_token(t) and t not in field_terms for t in q_terms)
    if missing_number:
        score = min(score, PARTIAL_BAR - 0.01)  # cannot be 'covered' or structural
    return score


def classify_query(query: str, fields: dict[str, str]) -> dict:
    """Classify one query against the page fields.

    Returns {"status": "covered"|"partial"|"missing", "score": float,
             "where": [field names with full presence]}.
    """
    q_terms = _query_terms(query)
    field_terms = {name: _term_set(val) for name, val in fields.items()}

    # 1-term query must match that term exactly in at least one field.
    if len(q_terms) == 1:
        term = q_terms[0]
        where = [name for name, ts in field_terms.items() if term in ts]
        if where:
            return {"status": "covered", "score": 1.0, "where": where}
        return {"status": "missing", "score": 0.0, "where": []}

    overlaps = {name: _field_overlap(q_terms, ts) for name, ts in field_terms.items()}
    best = max(overlaps.values()) if overlaps else 0.0
    # Fields where the query is structurally "present" (full overlap).
    where = [name for name, ov in overlaps.items() if ov >= 0.999]

    body_ov = overlaps.get("body", 0.0)
    structural_hit = any(overlaps.get(f, 0.0) >= 0.999 for f in STRUCTURAL_FIELDS)

    if best >= COVERED_BAR:
        status = "covered"
    elif body_ov >= BODY_BACKSTOP_BAR and structural_hit:
        status = "covered"
    elif best >= PARTIAL_BAR:
        status = "partial"
    else:
        status = "missing"

    return {"status": status, "score": round(best, 3), "where": where}


# --------------------------------------------------------------------------- #
# Page parsing                                                                 #
# --------------------------------------------------------------------------- #
def _split_frontmatter(text: str):
    """Return (fm_text, body). Mirrors scripts/frontmatter_lint.py."""
    if not text.startswith("---"):
        return None, text
    end = text.find("\n---", 3)
    if end == -1:
        return None, text
    fm = text[3:end]
    rest = text[end:]
    # Body begins after the closing '---' line.
    nl = rest.find("\n", 1)
    body = rest[nl + 1:] if nl != -1 else ""
    return fm, body


def _html_to_text(html: str) -> str:
    """Strip tags to plain text (drop script/style content)."""
    html = re.sub(r"<(script|style)\b[^>]*>.*?</\1>", " ", html, flags=re.I | re.S)
    text = re.sub(r"<[^>]+>", " ", html)
    text = (text.replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">")
            .replace("&nbsp;", " ").replace("&pound;", "£").replace("&#163;", "£"))
    return re.sub(r"\s+", " ", text).strip()


def _extract_h2s(body: str) -> list[str]:
    return [_html_to_text(m) for m in re.findall(r"<h2\b[^>]*>(.*?)</h2>", body, flags=re.I | re.S)]


def load_page_fields(slug: str) -> dict[str, str]:
    """Parse Property/web/content/blog/<slug>.md into the matching fields dict.

    fields = {metaTitle, metaDescription, h1, h2s (joined), faqs (q+a joined), body}.
    """
    path = BLOG_DIR / f"{slug}.md"
    if not path.exists():
        raise FileNotFoundError(f"blog page not found: {path}")
    raw = path.read_text(encoding="utf-8")
    fm_text, body = _split_frontmatter(raw)
    fm = yaml.safe_load(fm_text) if fm_text else {}
    if not isinstance(fm, dict):
        fm = {}

    faqs = fm.get("faqs") or []
    faq_parts: list[str] = []
    if isinstance(faqs, list):
        for f in faqs:
            if isinstance(f, dict):
                faq_parts.append(f"{f.get('question', '')} {f.get('answer', '')}")

    h2s = _extract_h2s(body)

    return {
        "metaTitle": str(fm.get("metaTitle") or ""),
        "metaDescription": str(fm.get("metaDescription") or ""),
        "h1": str(fm.get("h1") or ""),
        "h2s": " \n ".join(h2s),
        "faqs": " \n ".join(faq_parts),
        "body": _html_to_text(body),
    }


# --------------------------------------------------------------------------- #
# Target / adjacent set acquisition                                            #
# --------------------------------------------------------------------------- #
def _load_from_data(data_path: str) -> tuple[list[dict], list[dict]]:
    """Read target_queries + adjacent from a pull_page_data --json dump."""
    payload = json.loads(pathlib.Path(data_path).read_text(encoding="utf-8"))
    return payload.get("target_queries") or [], payload.get("adjacent") or []


def _load_from_db(slug: str, want_adjacent: bool) -> tuple[list[dict], list[dict]]:
    from optimisation_engine.track2.pull_page_data import build_target_queries
    targets = build_target_queries(slug)
    adjacent: list[dict] = []
    if want_adjacent:
        from optimisation_engine.track2.pull_page_data import (
            build_adjacent,
            _seed_terms_for_adjacent,
        )
        # Seed from top target query (gsc preferred), else slug words.
        seeds = [targets[0]["query"]] if targets else [slug.replace("-", " ")]
        adjacent = build_adjacent(slug, seeds)
        _ = _seed_terms_for_adjacent  # imported for parity; seeds derived above
    return targets, adjacent


# --------------------------------------------------------------------------- #
# Core evaluation                                                              #
# --------------------------------------------------------------------------- #
def evaluate(
    slug: str,
    targets: list[dict],
    adjacent: list[dict],
    fields: dict[str, str],
    gate_impr: int,
    gate_bar: float,
) -> dict:
    """Run coverage over the target set and build the result payload."""
    by_query: list[dict] = []
    covered = partial = missing = 0
    missing_queries: list[dict] = []
    partial_queries: list[dict] = []

    # Impression-weighted coverage over ALL target queries.
    weighted_num = 0.0
    weighted_den = 0.0
    # High-demand subset (impr >= gate_impr).
    hd_num = 0.0
    hd_den = 0.0
    high_demand_count = 0

    for t in targets:
        q = t.get("query", "")
        impr = int(t.get("impr") or 0)
        res = classify_query(q, fields)
        status = res["status"]
        if status == "covered":
            covered += 1
            cov_val = 1.0
        elif status == "partial":
            partial += 1
            cov_val = PARTIAL_WEIGHT
        else:
            missing += 1
            cov_val = 0.0

        rec = {
            "query": q,
            "source": t.get("source"),
            "impr": impr,
            "pos": t.get("pos"),
        }
        if status == "missing":
            missing_queries.append(rec)
        elif status == "partial":
            partial_queries.append(rec)

        by_query.append({
            "query": q,
            "status": status,
            "where": res["where"],
            "score": res["score"],
        })

        w = impr if impr > 0 else 1  # un-impressioned target still counts (weight 1)
        weighted_num += cov_val * w
        weighted_den += w
        if impr >= gate_impr:
            high_demand_count += 1
            hd_num += cov_val * w
            hd_den += w

    coverage_score = round(weighted_num / weighted_den, 4) if weighted_den else 0.0
    high_demand_covered_pct = round(hd_num / hd_den, 4) if hd_den else 0.0

    invisible = len(targets) == 0
    gated = (not invisible) and high_demand_count >= 1
    if invisible:
        passed = True
        reason = "invisible"
    elif gated:
        passed = high_demand_covered_pct >= gate_bar
        reason = "high_demand_gate"
    else:
        passed = True
        reason = "no_high_demand_query"

    # Adjacent set: informational, weight 0, never gates.
    adj_total = len(adjacent)
    adj_covered = 0
    adj_missing: list[str] = []
    for a in adjacent:
        term = a.get("term", "")
        res = classify_query(term, fields)
        if res["status"] == "covered":
            adj_covered += 1
        else:
            adj_missing.append(term)
    adj_pct = round(adj_covered / adj_total, 4) if adj_total else 0.0

    return {
        "slug": slug,
        "gated": gated,
        "passed": passed,
        "reason": reason,
        "coverage_score": coverage_score,
        "high_demand_covered_pct": high_demand_covered_pct,
        "targets_total": len(targets),
        "covered": covered,
        "partial": partial,
        "missing": missing,
        "missing_queries": missing_queries,
        "partial_queries": partial_queries,
        "adjacent": {"covered_pct": adj_pct, "missing": adj_missing},
        "by_query": by_query,
    }


# --------------------------------------------------------------------------- #
# Output                                                                       #
# --------------------------------------------------------------------------- #
def _print_human(res: dict, gate_impr: int, gate_bar: float) -> None:
    print(f"\nQuery coverage: {res['slug']}")
    print("=" * 70)
    if res["reason"] == "invisible":
        print("INVISIBLE page (no GSC and no Bing rows) - never gates.")
        print("Coverage shown is against the adjacent set, informational only.")
    print(f"  targets_total           : {res['targets_total']}")
    print(f"  covered / partial / miss: {res['covered']} / {res['partial']} / {res['missing']}")
    print(f"  coverage_score (weighted): {res['coverage_score']}")
    print(f"  high_demand_covered_pct : {res['high_demand_covered_pct']} "
          f"(threshold impr>={gate_impr}, bar={gate_bar})")
    print(f"  gated                   : {res['gated']}  ({res['reason']})")
    print(f"  PASSED                  : {res['passed']}")

    if res["missing_queries"]:
        print("\n  MISSING (impr-sorted):")
        for m in sorted(res["missing_queries"], key=lambda r: -(r.get("impr") or 0)):
            print(f"    {(m.get('impr') or 0):>5} imp | {m['query']}")
    if res["partial_queries"]:
        print("\n  PARTIAL:")
        for m in sorted(res["partial_queries"], key=lambda r: -(r.get("impr") or 0)):
            print(f"    {(m.get('impr') or 0):>5} imp | {m['query']}")
    adj = res["adjacent"]
    if adj["missing"]:
        print(f"\n  Adjacent covered_pct={adj['covered_pct']}; "
              f"{len(adj['missing'])} adjacent term(s) not yet covered (informational).")


# --------------------------------------------------------------------------- #
# Self-test                                                                    #
# --------------------------------------------------------------------------- #
def _selftest() -> int:
    """Hand-built classifier fixtures - no DB. Print PASS/FAIL, exit 0/1."""
    fixtures = [
        # (label, query, fields, expected_status)
        (
            "section-number literal: 'section 24' must NOT match a page about section 23",
            "section 24 mortgage interest relief",
            {
                "metaTitle": "Section 23 relief explained",
                "metaDescription": "Everything about section 23 mortgage interest relief.",
                "h1": "Section 23 mortgage interest relief",
                "h2s": "What is section 23 relief",
                "faqs": "How does section 23 mortgage interest relief work? It restricts relief.",
                "body": "Section 23 governs mortgage interest relief for landlords in detail.",
            },
            "missing",
        ),
        (
            "section-number literal: matching 'section 24' page IS covered",
            "section 24 mortgage interest relief",
            {
                "metaTitle": "Section 24 mortgage interest relief for landlords",
                "metaDescription": "Section 24 mortgage interest relief explained.",
                "h1": "Section 24 mortgage interest relief",
                "h2s": "What is section 24",
                "faqs": "How does section 24 mortgage interest relief work?",
                "body": "Section 24 restricts mortgage interest relief to the basic rate.",
            },
            "covered",
        ),
        (
            "synonym / phrasing + light stem: 'writing down allowances rates' covered",
            "writing down allowances rates",
            {
                "metaTitle": "Writing Down Allowance Rates 2026/27",
                "metaDescription": "The writing down allowance rate is 14% from April 2026.",
                "h1": "Writing down allowance rates for property investors",
                "h2s": "The main pool rate",
                "faqs": "What are the writing down allowance rates? 14% main, 6% special.",
                "body": "Writing down allowances reduce taxable profit each year at the set rate.",
            },
            "covered",
        ),
        (
            "clearly missing: query about an unrelated topic",
            "stamp duty surcharge second home",
            {
                "metaTitle": "Writing Down Allowance Rates 2026/27",
                "metaDescription": "Capital allowances and writing down allowance rates.",
                "h1": "Writing down allowance rates",
                "h2s": "The main pool rate",
                "faqs": "What are the writing down allowance rates?",
                "body": "Writing down allowances reduce taxable rental profit at 14% per year.",
            },
            "missing",
        ),
    ]

    all_ok = True
    for label, query, fields, expected in fixtures:
        res = classify_query(query, fields)
        ok = res["status"] == expected
        all_ok = all_ok and ok
        flag = "PASS" if ok else "FAIL"
        print(f"  [{flag}] {label}")
        print(f"         query={query!r} -> got {res['status']!r} "
              f"(score={res['score']}, where={res['where']}); expected {expected!r}")
    print("\nSELFTEST:", "PASS" if all_ok else "FAIL")
    return 0 if all_ok else 1


# --------------------------------------------------------------------------- #
# CLI                                                                          #
# --------------------------------------------------------------------------- #
def main() -> int:
    ap = argparse.ArgumentParser(
        description="Deterministic query-coverage floor for Track 2 blog rewrites."
    )
    ap.add_argument("--slug", help="Page slug (filename without .md)")
    ap.add_argument("--json", action="store_true", help="Emit JSON result only.")
    ap.add_argument("--data", help="Read target_queries/adjacent from a pull_page_data JSON dump.")
    ap.add_argument("--gate-impr", type=int, default=50,
                    help="Impressions threshold for 'high demand' (default 50).")
    ap.add_argument("--gate-bar", type=float, default=0.80,
                    help="Min impression-weighted covered fraction of high-demand queries (default 0.80).")
    ap.add_argument("--adjacent", action="store_true",
                    help="Also pull/consider the adjacent keyword set (weight 0).")
    ap.add_argument("--selftest", action="store_true",
                    help="Run hand-built classifier fixtures (no DB) and exit.")
    args = ap.parse_args()

    if args.selftest:
        return _selftest()

    if not args.slug:
        ap.error("--slug is required (unless --selftest)")

    # Acquire target + adjacent sets.
    if args.data:
        targets, adjacent = _load_from_data(args.data)
        if not args.adjacent:
            adjacent = []  # do not consider adjacent unless asked
    else:
        targets, adjacent = _load_from_db(args.slug, args.adjacent)

    fields = load_page_fields(args.slug)
    res = evaluate(args.slug, targets, adjacent, fields, args.gate_impr, args.gate_bar)

    if args.json:
        # Drop the internal 'reason' from the strict shape but keep it informative
        # by only emitting the contract keys.
        out = {
            "slug": res["slug"],
            "gated": res["gated"],
            "passed": res["passed"],
            "coverage_score": res["coverage_score"],
            "high_demand_covered_pct": res["high_demand_covered_pct"],
            "targets_total": res["targets_total"],
            "covered": res["covered"],
            "partial": res["partial"],
            "missing": res["missing"],
            "missing_queries": res["missing_queries"],
            "partial_queries": res["partial_queries"],
            "adjacent": res["adjacent"],
            "by_query": res["by_query"],
        }
        if res["reason"] == "invisible":
            out["reason"] = "invisible"
        print(json.dumps(out, indent=2))
    else:
        _print_human(res, args.gate_impr, args.gate_bar)

    # Exit code 2 if the gate fires and the page fails it.
    if res["gated"] and not res["passed"]:
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())
