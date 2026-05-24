"""Wave 8-specific cannibalisation check: 30 candidate slugs against current main
at 209 net-new pages (W1 31 + W2 30 + W3 30 + W4 30 + W5 30 + W6 30 + W7 28).

Reuses the tokenisation + jaccard logic from property_cannibalisation_check.py
but scopes input to the 30 Wave 8 picks (not the full competitor corpus).

Output goes to docs/property/wave8_cannibalisation_check.md — does NOT overwrite
topic_gaps_final.md (which carries the Track 2B addendum at lines 1295+).
"""
from __future__ import annotations

import re
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

# 30 Wave 8 candidate slugs (illustrative; final slugs may shift at Stage 1a)
WAVE8_PICKS = [
    # Bucket A — FIG regime + non-dom IHT + leaving-UK depth
    ("A1", "fig-regime-qualifying-new-resident-10-year-non-residence-test-landlords", "FIG regime 10-year prior-non-residence eligibility test operational"),
    ("A2", "fig-election-mechanics-per-year-claim-personal-allowance-cgt-aea-cost", "FIG election mechanics + PA + CGT AEA cost calculus"),
    ("A3", "fig-year-5-cliff-post-fig-arising-basis-planning-non-doms-landlords", "FIG year-5 cliff + post-FIG planning"),
    ("A4", "temporary-repatriation-facility-trf-designation-mechanics-12-15-percent-rates", "TRF designation mechanics + 12/12/15 rate ramp"),
    ("A5", "trf-qualifying-overseas-capital-what-can-be-designated-non-doms", "TRF qualifying overseas capital"),
    ("A6", "cgt-rebasing-election-fa-2025-schedule-11-narrow-eligibility-non-doms", "CGT rebasing FA 2025 Sch 11 four-condition gate"),
    ("A7", "iht-long-term-resident-test-section-6a-tail-period-table-landlords", "IHT LTR test s.6A + tail-period table"),
    ("A8", "excluded-property-trust-long-term-resident-settlor-pivot-landlords", "Excluded property trust under LTR regime"),
    ("A9", "iht-spouse-exemption-long-term-resident-section-18-section-267zc-election", "Spouse exemption under LTR + s.267ZC election"),
    ("A10", "returning-to-uk-after-non-residence-section-10a-recapture-fig-eligibility", "Returning to UK + s.10A + FIG on re-arrival"),
    # Bucket B — Transactions in UK land + developer tax
    ("B1", "transactions-in-uk-land-cta-2010-part-8zb-ita-2007-part-9a-four-conditions-test", "Transactions in UK land pillar + four-conditions test"),
    ("B2", "condition-a-acquisition-main-purpose-test-trader-by-stealth-landlord-trap", "Condition A acquisition main-purpose"),
    ("B3", "condition-d-development-main-purpose-convert-and-flip-trap-landlord-developers", "Condition D development main-purpose"),
    ("B4", "condition-c-trading-stock-section-162-incorporation-relief-denial-developers", "Condition C trading stock + s.162 denial"),
    ("B5", "indirect-disposals-property-rich-entities-section-356od-section-517d-slice-action", "Indirect disposals via property-rich entities"),
    ("B6", "anti-fragmentation-rule-section-356oh-section-517h-multi-entity-developer-scheme-defeat", "Anti-fragmentation rule s.356OH / s.517H"),
    ("B7", "badges-of-trade-marson-morton-property-flipping-investment-distinction-landlords", "Badges of trade applied to property"),
    ("B8", "non-resident-developer-uk-tax-scope-fa-2016-offshore-developer-planning-closure", "Non-resident developer scope"),
    ("B9", "land-remediation-relief-cta-2009-part-14-100-50-percent-deduction-polluter-exclusion", "LRR CTA 2009 Part 14 operational"),
    ("B10", "property-partnership-trading-investment-jv-developer-structures-sch-15-sdlt-interaction", "Property partnership trading vs investment — JV developer structures"),
    # Bucket C — VAT operational depth on commercial property (statute-isolated)
    ("C1", "option-to-tax-vata-1994-schedule-10-commercial-property-20-year-lock", "Option to tax pillar + 20-year lock"),
    ("C2", "option-to-tax-revocation-routes-6-month-cooling-off-20-year-exit-landlords", "Option to tax revocation routes"),
    ("C3", "transfer-of-going-concern-togc-commercial-property-option-matching-vat-free", "TOGC commercial property + option matching"),
    ("C4", "capital-goods-scheme-cgs-10-year-adjustment-250k-threshold-commercial-landlords", "Capital goods scheme 10-year + £250k"),
    ("C5", "partial-exemption-mixed-use-landlords-standard-method-special-method-vat", "Partial exemption methods for mixed-use"),
    ("C6", "vat-commercial-to-residential-conversion-5-percent-reduced-rate-developer", "VAT commercial-to-residential conversion 5%"),
    ("C7", "disapplication-option-to-tax-schedule-10-paragraph-12-residential-conversion", "Disapplication of option to tax para 12-13"),
    ("C8", "vat-storage-facility-lettings-schedule-9-group-1-supply-categorisation-landlords", "VAT on storage facility lettings Sch 9 Gr 1"),
    ("C9", "vat-registration-threshold-90k-landlords-april-2024-group-registration", "VAT registration threshold £90k + group reg"),
    ("C10", "landlord-vat-recovery-professional-fees-capital-costs-commercial-property", "Landlord VAT recovery on professional + capital fees"),
]


def tokenise(s: str) -> set[str]:
    s = re.sub(r"[^a-z0-9]+", " ", s.lower())
    tokens = [t for t in s.split() if t and t not in STOP and len(t) >= 2]
    return set(tokens)


def load_our_pages() -> list[dict]:
    out: list[dict] = []
    for md in sorted((ROOT / "Property/web/content/blog").glob("*.md")):
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
        tokens = tokenise(slug + " " + str(fm.get("title", "")) + " "
                          + str(fm.get("metaTitle", "")) + " "
                          + str(fm.get("h1", "")))
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


def best_matches(pick_tokens: set, our_pages: list[dict], top_n: int = 5) -> list[tuple[float, dict]]:
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
    our = load_our_pages()
    print(f"Our property pages: {len(our)}")

    lines = ["# Wave 8 cannibalisation re-check (209 net-new on main, 2026-05-25)", ""]
    lines.append(f"Checked: {len(WAVE8_PICKS)} Wave 8 picks against {len(our)} existing pages.")
    lines.append("")
    lines.append("Thresholds: jaccard ≥0.55 = ❌ already covered; 0.30-0.55 = ⚠️ partial overlap; <0.30 = ✅ net-new.")
    lines.append("")
    lines.append("Manager audits ⚠️ partial-overlap rows; ✅ are clear for Stage 1a; ❌ would need pick replacement.")
    lines.append("")
    lines.append("---")
    lines.append("")

    counts = {"✅ net-new": 0, "⚠️ partial overlap": 0, "❌ already covered": 0}
    rows = []
    for pick_id, slug, label in WAVE8_PICKS:
        gt = tokenise(slug + " " + label)
        top = best_matches(gt, our, top_n=5)
        top_score = top[0][0] if top else 0.0
        cls = classify(top_score)
        counts[cls] += 1
        rows.append((pick_id, slug, label, cls, top_score, top))

    lines.append(f"**Summary:** ✅ net-new {counts['✅ net-new']} · ⚠️ partial {counts['⚠️ partial overlap']} · ❌ covered {counts['❌ already covered']}")
    lines.append("")
    lines.append("---")
    lines.append("")

    # Group by bucket
    for bucket_label, prefix in [("Bucket A — FIG / non-dom IHT / leaving-UK depth", "A"),
                                  ("Bucket B — Transactions in UK land + developer tax", "B"),
                                  ("Bucket C — VAT operational depth on commercial property", "C")]:
        lines.append(f"## {bucket_label}")
        lines.append("")
        for pick_id, slug, label, cls, top_score, top in rows:
            if not pick_id.startswith(prefix):
                continue
            lines.append(f"### {pick_id} — {label}")
            lines.append(f"- Candidate slug: `{slug}`")
            lines.append(f"- Classification: **{cls}** (top score {top_score:.2f})")
            lines.append(f"- Top 5 closest existing pages:")
            for sc, p in top:
                marker = "  - "
                lines.append(f"{marker}{sc:.2f} — `{p['slug']}`")
            lines.append("")

    out = ROOT / "docs/property/wave8_cannibalisation_check.md"
    out.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {out}")

    print(f"\nCounts: ✅ net-new {counts['✅ net-new']} · ⚠️ partial {counts['⚠️ partial overlap']} · ❌ covered {counts['❌ already covered']}")
    print("\nPartial-overlap rows for manager audit:")
    for pick_id, slug, label, cls, top_score, top in rows:
        if cls == "⚠️ partial overlap":
            print(f"  {pick_id} {top_score:.2f}: {label}  ↔  {top[0][1]['slug']}")
    print("\nAlready-covered rows (pick replacement needed):")
    for pick_id, slug, label, cls, top_score, top in rows:
        if cls == "❌ already covered":
            print(f"  {pick_id} {top_score:.2f}: {label}  ↔  {top[0][1]['slug']}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
