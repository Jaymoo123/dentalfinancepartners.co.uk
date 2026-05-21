"""Redirected-slug overlap report.

For each proposed net-new page from the topic gap analysis, check whether
any of the redirected old slugs in `Property/web/src/middleware.ts`
overlap. If so, flag the redirect target as a candidate to be repointed
at the new page when it launches (or to be considered when sessions
decide the new page's slug).

Two redirect tables in middleware:
  - SLUG_TO_CATEGORY_MAP: old flat `/blog/[slug]` → new nested
    `/blog/[category]/[slug]`. These slugs point at current content.
  - DUPLICATE_REDIRECTS: old duplicate slug → keeper page. These slugs
    consolidated into another page.

A net-new proposal that overlaps with a redirected old slug is a signal
that:
  - we already had a page on that topic (then consolidated), OR
  - we always had a redirect to a broader page (so a new dedicated page
    on the topic might want the redirect repointed).
"""
from __future__ import annotations

import json
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
STOP = {
    "the", "a", "an", "guide", "uk", "complete", "tax", "to", "and",
    "for", "of", "what", "how", "your", "you", "in", "is", "are",
    "step", "by", "2026", "2025", "2024", "2027", "with", "on", "from",
    "do", "does", "as", "be", "or", "if", "at", "this", "that", "it",
    "into", "out", "can", "i", "my", "we", "our", "us", "all", "any",
    "explained", "rules", "vs", "vs.", "complete-guide", "ultimate",
    "comprehensive", "best", "free", "online", "near", "me", "uk-",
}


def tokenise(s: str) -> set[str]:
    s = re.sub(r"[^a-z0-9]+", " ", s.lower())
    return {t for t in s.split() if t and t not in STOP and len(t) >= 2}


def jaccard(a: set, b: set) -> float:
    if not a or not b:
        return 0.0
    return len(a & b) / len(a | b)


def parse_middleware_redirects() -> list[dict]:
    """Return list of {old_slug, redirect_target, source} entries."""
    text = (ROOT / "Property/web/src/middleware.ts").read_text(encoding="utf-8")
    out: list[dict] = []

    # SLUG_TO_CATEGORY_MAP
    m = re.search(r"SLUG_TO_CATEGORY_MAP[^{]*\{([^}]+)\}", text, re.DOTALL)
    if m:
        for line in m.group(1).splitlines():
            mm = re.match(r'\s*"([^"]+)":\s*"([^"]+)"', line)
            if mm:
                slug, cat = mm.group(1), mm.group(2)
                out.append({
                    "old_slug": slug,
                    "redirect_target": f"/blog/{cat}/{slug}",
                    "source": "SLUG_TO_CATEGORY_MAP",
                })

    # DUPLICATE_REDIRECTS
    m = re.search(r"DUPLICATE_REDIRECTS[^{]*\{([^}]+)\}", text, re.DOTALL)
    if m:
        for line in m.group(1).splitlines():
            mm = re.match(r'\s*"([^"]+)":\s*"([^"]+)"', line)
            if mm:
                slug, target = mm.group(1), mm.group(2)
                out.append({
                    "old_slug": slug,
                    "redirect_target": target,
                    "source": "DUPLICATE_REDIRECTS",
                })
    return out


def load_gap_proposals() -> list[dict]:
    """Reconstruct the final net-new gap list from the cannibalisation check output."""
    # We don't dump the final list to JSON, so we re-derive from the same inputs.
    # Cleanest: re-run the classifier function. But to avoid that, parse the markdown.
    md_path = ROOT / "docs/property/topic_gaps_final.md"
    text = md_path.read_text(encoding="utf-8")
    out: list[dict] = []
    current_bucket = None
    in_netnew = False
    for line in text.splitlines():
        m_bucket = re.match(r"^## (?!New buckets)(.+)$", line)
        if m_bucket and not line.startswith("### ") and "## " in line and "✅" not in line and "⚠️" not in line and "❌" not in line:
            current_bucket = m_bucket.group(1).strip()
            in_netnew = False
            continue
        if line.startswith("### ✅"):
            in_netnew = True
            continue
        if line.startswith("### "):
            in_netnew = False
            continue
        if in_netnew and line.startswith("- `"):
            mm = re.match(r"- `([^`]+)` \(([^)]+)\) — (.+)", line)
            if mm:
                out.append({
                    "slug": mm.group(1),
                    "domain": mm.group(2),
                    "url": mm.group(3),
                    "bucket": current_bucket,
                })
    return out


def main() -> int:
    redirects = parse_middleware_redirects()
    gaps = load_gap_proposals()
    print(f"Middleware redirects parsed: {len(redirects)}")
    print(f"Net-new proposals parsed:    {len(gaps)}")

    # Build redirect index with tokens
    redirect_index = []
    for r in redirects:
        redirect_index.append({**r, "tokens": tokenise(r["old_slug"])})

    # For each proposal, find redirect overlap candidates
    out_rows = []
    by_bucket = defaultdict(list)
    for g in gaps:
        gt = tokenise(g["slug"])
        scored = []
        for r in redirect_index:
            s = jaccard(gt, r["tokens"])
            if s >= 0.30:
                scored.append((s, r))
        scored.sort(key=lambda x: -x[0])
        if scored:
            entry = {
                **g,
                "overlap_redirects": [
                    {
                        "old_slug": r["old_slug"],
                        "redirect_target": r["redirect_target"],
                        "source": r["source"],
                        "score": round(s, 2),
                    }
                    for s, r in scored[:5]
                ],
            }
            out_rows.append(entry)
            by_bucket[g["bucket"]].append(entry)

    print(f"\nProposals with at least one redirect overlap (score ≥ 0.30): {len(out_rows)}")

    # Write the report
    out = ROOT / "docs/property/topic_gaps_redirect_overlap.md"
    out.parent.mkdir(parents=True, exist_ok=True)
    lines = ["# Property — proposed net-new pages vs existing redirect map", ""]
    lines.append("For each net-new page in `docs/property/topic_gaps_final.md`, this report flags any redirected old slug (from `Property/web/src/middleware.ts`) that overlaps on tokens (≥ 0.30 Jaccard).")
    lines.append("")
    lines.append("**Why this matters:** when a new page launches, an overlapping redirected old slug may want its redirect target repointed at the new page (so any residual GSC equity on the old slug flows to the new content rather than the broader keeper it's currently aliased to).")
    lines.append("")
    lines.append("**How to read:** under each net-new proposal, the overlap entries show `old_slug → current_redirect_target (source_table, score)`. If the score is high (≥ 0.55) and the new page is a more specific fit than the current redirect target, **repoint the redirect when the page launches**.")
    lines.append("")
    lines.append(f"Proposals reviewed: {len(gaps)} · with overlaps: {len(out_rows)} · without overlaps: {len(gaps) - len(out_rows)}")
    lines.append("")
    lines.append("---")
    lines.append("")
    for bucket in sorted(by_bucket.keys(), key=lambda b: -len(by_bucket[b])):
        items = by_bucket[bucket]
        lines.append(f"## {bucket} ({len(items)} proposals with redirect overlap)")
        lines.append("")
        for it in items:
            lines.append(f"- **`{it['slug']}`** (proposed new page)")
            lines.append(f"  - source: {it['domain']} — {it['url']}")
            for r in it["overlap_redirects"]:
                lines.append(f"  - overlap `{r['old_slug']}` → `{r['redirect_target']}` ({r['source']}, score {r['score']})")
        lines.append("")
    out.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {out}")

    # Also a JSON for downstream tools
    out_json = ROOT / "briefs/property/_redirect_overlap.json"
    out_json.write_text(json.dumps(out_rows, indent=2), encoding="utf-8")
    print(f"Wrote {out_json}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
