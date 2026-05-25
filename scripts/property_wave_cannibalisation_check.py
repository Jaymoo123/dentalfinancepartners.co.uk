"""Generalised property-wave cannibalisation check.

Replaces the per-wave property_wave{N}_cannibalisation_check.py pattern.
Reads picks from briefs/property/wave{N}/picks.yaml; computes Jaccard
overlap against the live blog inventory; writes a per-wave report.

Picks YAML format:

    wave: 9
    buckets:
      A:
        label: "Bucket A — <theme>"
        picks:
          - { id: A1, slug: "candidate-slug-1", label: "one-line label" }
          - { id: A2, slug: "candidate-slug-2", label: "..." }
      B:
        label: "..."
        picks: [...]
      C:
        label: "..."
        picks: [...]

Output: docs/property/wave{N}_cannibalisation_check.md

Usage:
    python scripts/property_wave_cannibalisation_check.py --wave 9
    python scripts/property_wave_cannibalisation_check.py --wave 9 --picks-yaml custom/path.yaml
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

import yaml

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
    tokens = [t for t in s.split() if t and t not in STOP and len(t) >= 2]
    return set(tokens)


def load_our_pages(blog_dir: Path) -> list[dict]:
    out: list[dict] = []
    for md in sorted(blog_dir.glob("*.md")):
        text = md.read_text(encoding="utf-8")
        if not text.startswith("---"):
            continue
        end = text.find("---", 3)
        if end == -1:
            continue
        try:
            fm = yaml.safe_load(text[3:end]) or {}
        except yaml.YAMLError:
            fm = {}
        slug = md.stem
        tokens = tokenise(
            slug + " " + str(fm.get("title", "")) + " "
            + str(fm.get("metaTitle", "")) + " "
            + str(fm.get("h1", ""))
        )
        out.append({
            "slug": slug,
            "title": fm.get("title", ""),
            "tokens": tokens,
        })
    return out


def jaccard(a: set, b: set) -> float:
    if not a or not b:
        return 0.0
    return len(a & b) / len(a | b)


def best_matches(pick_tokens: set, our_pages: list[dict], top_n: int = 5):
    scored = [(jaccard(pick_tokens, p["tokens"]), p) for p in our_pages]
    scored.sort(key=lambda x: -x[0])
    return scored[:top_n]


def classify(top_score: float) -> str:
    if top_score >= 0.55:
        return "❌ already covered"
    if top_score >= 0.30:
        return "⚠️ partial overlap"
    return "✅ net-new"


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--wave", type=int, required=True, help="Wave number (e.g. 9)")
    ap.add_argument("--picks-yaml", type=str, default=None,
                    help="Path to picks.yaml (default: briefs/property/wave{N}/picks.yaml)")
    ap.add_argument("--blog-dir", type=str, default="Property/web/content/blog",
                    help="Existing-pages directory (default: Property/web/content/blog)")
    ap.add_argument("--output", type=str, default=None,
                    help="Output report path (default: docs/property/wave{N}_cannibalisation_check.md)")
    args = ap.parse_args()

    wave = args.wave
    picks_path = Path(args.picks_yaml) if args.picks_yaml else (
        ROOT / f"briefs/property/wave{wave}/picks.yaml"
    )
    blog_dir = ROOT / args.blog_dir
    output_path = Path(args.output) if args.output else (
        ROOT / f"docs/property/wave{wave}_cannibalisation_check.md"
    )

    if not picks_path.exists():
        print(f"ERROR: picks file missing: {picks_path}", file=sys.stderr)
        print(f"       Create it via scaffold-wave + manager pick decisions", file=sys.stderr)
        return 1
    if not blog_dir.exists():
        print(f"ERROR: blog dir missing: {blog_dir}", file=sys.stderr)
        return 1

    picks_yaml = yaml.safe_load(picks_path.read_text(encoding="utf-8"))
    if picks_yaml.get("wave") != wave:
        print(f"WARN: picks.yaml wave={picks_yaml.get('wave')} != --wave {wave}", file=sys.stderr)

    our = load_our_pages(blog_dir)
    print(f"Existing property pages: {len(our)}")

    # Flatten picks per bucket
    buckets_data = picks_yaml.get("buckets", {})
    if not buckets_data:
        print("ERROR: picks.yaml has no 'buckets' key", file=sys.stderr)
        return 1

    all_picks = []  # (bucket_letter, bucket_label, pick_id, slug, label)
    for bucket_letter in sorted(buckets_data.keys()):
        b = buckets_data[bucket_letter]
        bucket_label = b.get("label", f"Bucket {bucket_letter}")
        for pick in b.get("picks", []):
            all_picks.append((
                bucket_letter,
                bucket_label,
                pick["id"],
                pick["slug"],
                pick.get("label", pick["slug"]),
            ))

    if not all_picks:
        print("ERROR: no picks found in picks.yaml buckets", file=sys.stderr)
        return 1

    lines = [
        f"# Wave {wave} cannibalisation check ({len(our)} existing pages)",
        "",
        f"Checked: {len(all_picks)} Wave {wave} picks against {len(our)} existing pages.",
        "",
        "Thresholds: jaccard ≥0.55 = ❌ already covered; 0.30-0.55 = ⚠️ partial overlap; <0.30 = ✅ net-new.",
        "",
        "Manager audits ⚠️ partial-overlap rows; ✅ are clear for Stage 1a; ❌ would need pick replacement.",
        "",
        "---",
        "",
    ]

    counts = {"✅ net-new": 0, "⚠️ partial overlap": 0, "❌ already covered": 0}
    rows = []
    for bucket_letter, bucket_label, pick_id, slug, label in all_picks:
        gt = tokenise(slug + " " + label)
        top = best_matches(gt, our, top_n=5)
        top_score = top[0][0] if top else 0.0
        cls = classify(top_score)
        counts[cls] += 1
        rows.append((bucket_letter, bucket_label, pick_id, slug, label, cls, top_score, top))

    lines.append(
        f"**Summary:** ✅ net-new {counts['✅ net-new']} · "
        f"⚠️ partial {counts['⚠️ partial overlap']} · "
        f"❌ covered {counts['❌ already covered']}"
    )
    lines.append("")
    lines.append("---")
    lines.append("")

    # Group by bucket (preserve bucket order from YAML keys)
    seen_buckets = []
    for bucket_letter, bucket_label, *_ in rows:
        if bucket_letter not in seen_buckets:
            seen_buckets.append(bucket_letter)

    for bucket_letter in seen_buckets:
        bucket_label = next(
            (bl for bl_letter, bl, *_ in rows if bl_letter == bucket_letter), bucket_letter
        )
        lines.append(f"## {bucket_label}")
        lines.append("")
        for bl_letter, _, pick_id, slug, label, cls, top_score, top in rows:
            if bl_letter != bucket_letter:
                continue
            lines.append(f"### {pick_id} — {label}")
            lines.append(f"- Candidate slug: `{slug}`")
            lines.append(f"- Classification: **{cls}** (top score {top_score:.2f})")
            lines.append(f"- Top 5 closest existing pages:")
            for sc, p in top:
                lines.append(f"  - {sc:.2f} — `{p['slug']}`")
            lines.append("")

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {output_path}")

    print(
        f"\nCounts: ✅ net-new {counts['✅ net-new']} · "
        f"⚠️ partial {counts['⚠️ partial overlap']} · "
        f"❌ covered {counts['❌ already covered']}"
    )

    print("\nPartial-overlap rows for manager audit:")
    for _, _, pick_id, _, label, cls, top_score, top in rows:
        if cls == "⚠️ partial overlap":
            print(f"  {pick_id} {top_score:.2f}: {label}  ↔  {top[0][1]['slug']}")
    print("\nAlready-covered rows (pick replacement needed):")
    for _, _, pick_id, _, label, cls, top_score, top in rows:
        if cls == "❌ already covered":
            print(f"  {pick_id} {top_score:.2f}: {label}  ↔  {top[0][1]['slug']}")

    # Non-zero exit if any "already covered" so PS wrapper can fail-fast
    return 1 if counts["❌ already covered"] > 0 else 0


if __name__ == "__main__":
    raise SystemExit(main())
