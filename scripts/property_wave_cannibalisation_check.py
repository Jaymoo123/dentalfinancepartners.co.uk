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
import json
import re
import sys
from datetime import datetime, timezone
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


_LLM_VERDICT_TO_CLASS = {
    "covered": "❌ already covered",
    "partial": "⚠️ partial overlap",
    "netnew": "✅ net-new",
}

LLM_TRIAGE_INSTRUCTIONS = (
    "For each pair below, a NEW candidate page is being considered against an "
    "EXISTING live page on the same site. Judge search-intent overlap only: would "
    "a single page satisfy both queries, or are they different search intents that "
    "both deserve their own page? For each pick_id, return a verdict of "
    '"covered" (same intent; the existing page already serves the new one; do not '
    'build), "partial" (real overlap but a distinct enough angle to justify both, '
    'IF differentiated), or "netnew" (different intent; no meaningful overlap), '
    "plus a one-line reason focused on search-intent overlap. Write the answers to "
    "_llm_triage_verdicts.json in the same directory as this file, as a JSON object "
    'keyed by pick_id: {"pick_id": {"verdict": "covered|partial|netnew", "reason": '
    '"one-line reason"}}.'
)


def _write_pending_pack(pending_path: Path, site: str, wave: int, candidates: list[dict]) -> None:
    """Hand off Jaccard-borderline pairs to a Claude Code subagent via a JSON file."""
    pairs = [
        {
            "pick_id": c["pick_id"],
            "pick_label": c["label"],
            "pick_slug": c["slug"],
            "existing_title": c["existing_title"],
            "existing_slug": c["existing_slug"],
            "jaccard": round(c["top_score"], 4),
            "jaccard_band": classify(c["top_score"]).split(" ", 1)[1],
        }
        for c in candidates
    ]
    pack = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "site": site,
        "wave": wave,
        "pairs": pairs,
        "instructions": LLM_TRIAGE_INSTRUCTIONS,
    }
    pending_path.write_text(json.dumps(pack, indent=2), encoding="utf-8")


def _verdicts_are_fresh(verdicts_path: Path, pending_path: Path) -> bool:
    """A verdicts file is usable if it postdates the pending pack, or its
    pick_ids match the pending pack's pair set exactly (subagent may have
    written it before this run's pending pack, e.g. re-run with no changes)."""
    if not pending_path.exists():
        return True
    try:
        pending_ids = {
            p["pick_id"] for p in json.loads(pending_path.read_text(encoding="utf-8")).get("pairs", [])
        }
        verdict_ids = set(json.loads(verdicts_path.read_text(encoding="utf-8")).keys())
    except (json.JSONDecodeError, OSError, AttributeError, TypeError):
        return False
    return verdicts_path.stat().st_mtime >= pending_path.stat().st_mtime or verdict_ids == pending_ids


def _apply_verdicts(candidates: list[dict], verdicts_path: Path) -> tuple[dict[str, dict], list[str]]:
    """Read a subagent/hand-written verdicts file and map it to classifications.

    Never raises: malformed JSON, missing pick_ids, or invalid verdict values
    are recorded as warnings and those picks simply get no entry (caller
    falls back to Jaccard for them).
    """
    try:
        verdicts_raw = json.loads(verdicts_path.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError) as exc:
        return {}, [f"LLM triage: could not read {verdicts_path.name} ({exc}); falling back to Jaccard for all picks."]
    if not isinstance(verdicts_raw, dict):
        return {}, [f"LLM triage: {verdicts_path.name} is not a JSON object; falling back to Jaccard for all picks."]

    results: dict[str, dict] = {}
    warnings: list[str] = []
    for c in candidates:
        entry = verdicts_raw.get(c["pick_id"])
        if not isinstance(entry, dict):
            warnings.append(f"LLM triage: no verdict for {c['pick_id']} in {verdicts_path.name}; falling back to Jaccard.")
            continue
        verdict = str(entry.get("verdict", "")).strip().lower()
        cls = _LLM_VERDICT_TO_CLASS.get(verdict)
        if not cls:
            warnings.append(
                f"LLM triage: unrecognised verdict {verdict!r} for {c['pick_id']}; falling back to Jaccard."
            )
            continue
        results[c["pick_id"]] = {"cls": cls, "reason": str(entry.get("reason", "")).strip()}
    return results, warnings


def _load_site_config(site: str) -> dict:
    """Load sites/<site>.json — mirrors scripts/_lib/site-config.ps1 logic."""
    cfg_path = ROOT / "sites" / f"{site}.json"
    if not cfg_path.exists():
        # Backward-compat fallback: pre-Round-1 hardcoded paths for Property
        if site == "property":
            return {
                "paths": {
                    "briefsDir": "briefs/property",
                    "blogContentDir": "Property/web/content/blog",
                    "docsDir": "docs/property",
                },
                "naming": {
                    "briefSubdir": "wave{wave}",
                    "cannibCheckFile": "wave{wave}_cannibalisation_check.md",
                },
            }
        raise FileNotFoundError(f"Site config missing: {cfg_path}")
    return json.loads(cfg_path.read_text(encoding="utf-8"))


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--wave", type=int, required=True, help="Wave number (e.g. 9)")
    ap.add_argument("--site", type=str, default="property", help="Site key (default: property)")
    ap.add_argument("--picks-yaml", type=str, default=None,
                    help="Path to picks.yaml (default: briefs/<site>/wave{N}/picks.yaml)")
    ap.add_argument("--blog-dir", type=str, default=None,
                    help="Existing-pages directory (default: from site config blogContentDir)")
    ap.add_argument("--output", type=str, default=None,
                    help="Output report path (default: docs/<site>/wave{N}_cannibalisation_check.md)")
    ap.add_argument("--llm-triage", action="store_true",
                    help="Reasoning triage pass for Jaccard partial/borderline pairs, via a "
                         "file handshake with a Claude Code subagent (no direct API call). "
                         "First run writes _llm_triage_pending.json and falls back to Jaccard; "
                         "re-run after a subagent writes _llm_triage_verdicts.json to apply it. "
                         "Default OFF so existing invocations are unchanged.")
    args = ap.parse_args()

    cfg = _load_site_config(args.site)
    wave = args.wave
    brief_subdir = cfg["naming"]["briefSubdir"].replace("{wave}", str(wave))
    cannib_file = cfg["naming"]["cannibCheckFile"].replace("{wave}", str(wave))

    picks_path = Path(args.picks_yaml) if args.picks_yaml else (
        ROOT / cfg["paths"]["briefsDir"] / brief_subdir / "picks.yaml"
    )
    blog_dir = ROOT / (args.blog_dir if args.blog_dir else cfg["paths"]["blogContentDir"])
    output_path = Path(args.output) if args.output else (
        ROOT / cfg["paths"]["docsDir"] / cannib_file
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

    rows = []
    for bucket_letter, bucket_label, pick_id, slug, label in all_picks:
        gt = tokenise(slug + " " + label)
        top = best_matches(gt, our, top_n=5)
        top_score = top[0][0] if top else 0.0
        cls = classify(top_score)
        rows.append((bucket_letter, bucket_label, pick_id, slug, label, cls, top_score, top))

    # Reasoning triage pass (opt-in): partial band (0.30-0.55) always, plus
    # net-new pairs that still share a distinctive token with their closest
    # existing page (top_score > 0 — jaccard() returns exactly 0.0 when the
    # token sets are disjoint, so >0 already encodes "shares a token").
    # Already-covered (>=0.55) is left alone: Jaccard is reliable there.
    llm_results: dict[str, dict] = {}
    llm_warnings: list[str] = []
    candidates: list[dict] = []
    llm_pending_written = False
    pending_path = verdicts_path = None
    if args.llm_triage:
        candidates = [
            {
                "pick_id": pick_id, "label": label, "slug": slug,
                "existing_slug": top[0][1]["slug"], "existing_title": top[0][1]["title"],
                "top_score": top_score,
            }
            for _, _, pick_id, slug, label, cls, top_score, top in rows
            if 0.0 < top_score < 0.55
        ]
        wave_dir = picks_path.parent
        pending_path = wave_dir / "_llm_triage_pending.json"
        verdicts_path = wave_dir / "_llm_triage_verdicts.json"
        if candidates:
            if verdicts_path.exists() and _verdicts_are_fresh(verdicts_path, pending_path):
                llm_results, llm_warnings = _apply_verdicts(candidates, verdicts_path)
            else:
                _write_pending_pack(pending_path, args.site, wave, candidates)
                llm_pending_written = True
                print(f"\nLLM triage pending pack written: {pending_path}")
                print(
                    "Run a Claude Code subagent to triage these pairs and write "
                    f"{verdicts_path.name} in {wave_dir}, then re-run this script "
                    "with --llm-triage. This run's report falls back to Jaccard verdicts."
                )
            for w in llm_warnings:
                print(f"WARN: {w}", file=sys.stderr)

    counts = {"✅ net-new": 0, "⚠️ partial overlap": 0, "❌ already covered": 0}
    overrides = []  # (pick_id, label, jaccard_cls, llm_cls, reason, top_score)
    for _, _, pick_id, slug, label, cls, top_score, top in rows:
        llm = llm_results.get(pick_id)
        final_cls = llm["cls"] if llm else cls
        counts[final_cls] += 1
        if llm and llm["cls"] != cls:
            overrides.append((pick_id, label, cls, llm["cls"], llm["reason"], top_score))

    lines.append(
        f"**Summary:** ✅ net-new {counts['✅ net-new']} · "
        f"⚠️ partial {counts['⚠️ partial overlap']} · "
        f"❌ covered {counts['❌ already covered']}"
    )
    lines.append("")
    if args.llm_triage:
        if llm_pending_written:
            lines.append(
                f"**LLM triage:** pending — {len(candidates)} pair(s) written to "
                f"`{pending_path.name}` for subagent triage. This report uses Jaccard "
                f"verdicts; re-run --llm-triage after `{verdicts_path.name}` is written."
            )
        elif candidates:
            lines.append(
                f"**LLM triage:** applied — {len(candidates)} pair(s) checked against "
                f"`{verdicts_path.name}`. {len(overrides)} override(s) applied to the summary counts above."
            )
        else:
            lines.append("**LLM triage:** ON — no Jaccard-borderline pairs to triage.")
        for w in llm_warnings:
            lines.append(f"- WARNING: {w}")
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
            llm = llm_results.get(pick_id)
            lines.append(f"### {pick_id} — {label}")
            lines.append(f"- Candidate slug: `{slug}`")
            if llm:
                lines.append(
                    f"- Classification: **{llm['cls']}** (LLM triage; Jaccard band was "
                    f"**{cls}**, top score {top_score:.2f})"
                )
                lines.append(f"- LLM reasoning: {llm['reason']}")
            else:
                lines.append(f"- Classification: **{cls}** (top score {top_score:.2f})")
            lines.append(f"- Top 5 closest existing pages:")
            for sc, p in top:
                lines.append(f"  - {sc:.2f} — `{p['slug']}`")
            lines.append("")

    if args.llm_triage and not llm_pending_written and candidates:
        lines.append("---")
        lines.append("")
        lines.append("## LLM overrides (manager audit trail)")
        lines.append("")
        if overrides:
            lines.append("LLM verdict changed the band placement used in the summary counts above:")
            lines.append("")
            for pick_id, label, jaccard_cls, llm_cls, reason, top_score in overrides:
                lines.append(f"- **{pick_id}** — {label}")
                lines.append(f"  - Jaccard: {jaccard_cls} (top score {top_score:.2f}) → LLM: **{llm_cls}**")
                lines.append(f"  - Reason: {reason}")
            lines.append("")
        else:
            lines.append("No overrides — LLM triage agreed with every Jaccard band placement it reviewed.")
            lines.append("")

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {output_path}")

    # Stdout summary uses ASCII-only markers (Windows cp1252 console cannot
    # encode emoji; report file is UTF-8 and renders correctly elsewhere)
    print(
        f"\nCounts: [net-new {counts['✅ net-new']}] "
        f"[partial {counts['⚠️ partial overlap']}] "
        f"[covered {counts['❌ already covered']}]"
    )

    print("\nPartial-overlap rows for manager audit:")
    for _, _, pick_id, _, label, cls, top_score, top in rows:
        llm = llm_results.get(pick_id)
        final_cls = llm["cls"] if llm else cls
        if final_cls == "⚠️ partial overlap":
            print(f"  {pick_id} {top_score:.2f}: {label[:60]}  -->  {top[0][1]['slug']}")
    print("\nAlready-covered rows (pick replacement needed):")
    for _, _, pick_id, _, label, cls, top_score, top in rows:
        llm = llm_results.get(pick_id)
        final_cls = llm["cls"] if llm else cls
        if final_cls == "❌ already covered":
            print(f"  {pick_id} {top_score:.2f}: {label[:60]}  -->  {top[0][1]['slug']}")
    if args.llm_triage:
        if llm_pending_written:
            print(f"\nLLM triage: pending pack written for {len(candidates)} pair(s); re-run after writing {verdicts_path.name}.")
        elif candidates:
            print(f"\nLLM triage: {len(candidates)} pair(s) checked, {len(overrides)} override(s) applied.")

    # Non-zero exit if any "already covered" so PS wrapper can fail-fast
    return 1 if counts["❌ already covered"] > 0 else 0


if __name__ == "__main__":
    raise SystemExit(main())
