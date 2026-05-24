"""Wave 7-specific cannibalisation check: 30 candidate slugs against current main
at 181 net-new pages.

Reuses the tokenisation + jaccard logic from property_cannibalisation_check.py
but scopes input to the 30 Wave 7 picks (not the full competitor corpus).

Output goes to docs/property/wave7_cannibalisation_check.md — does NOT overwrite
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

# 30 Wave 7 candidate slugs (illustrative; final slugs may shift at Stage 1a)
WAVE7_PICKS = [
    # Bucket A — Regulatory / compliance
    ("A1", "renters-rights-act-2026-tax-implications-landlords", "RRA 2026 PART 2 lead-page rewrite (EXISTING SLUG; same-slug rewrite, not cannibal)"),
    ("A2", "renters-rights-act-section-21-abolition-landlord-operational-mechanics", "RRA s.21 abolition mechanics"),
    ("A3", "renters-rights-act-periodic-tenancy-switch-landlord-obligations", "RRA periodic tenancy switch"),
    ("A4", "renters-rights-act-rent-reform-section-13-tribunal-mechanics-landlords", "RRA rent reform + tribunal"),
    ("A5", "renters-rights-act-possession-grounds-reform-section-8-landlords", "RRA possession grounds reform"),
    ("A6", "renters-rights-act-property-redress-scheme-mandatory-enrolment-landlords", "RRA Property Redress mandatory enrolment"),
    ("A7", "decent-homes-standard-private-rented-sector-landlord-compliance", "Decent Homes Standard PRS"),
    ("A8", "epc-c-2030-minimum-energy-efficiency-landlord-spending-cap", "EPC C 2030 + spending cap"),
    ("A9", "epc-improvement-grant-schemes-landlords-eco4-bus-gbis", "EPC grant schemes (ECO4, BUS, GBIS)"),
    ("A10", "building-safety-act-2022-cladding-cost-recovery-leaseholder-protections-landlords", "BSA 2022 cladding cost recovery"),
    # Bucket B — HMRC enquiry + tax compliance ops
    ("B1", "discovery-assessment-time-limits-landlord-tax-enquiries-tma-1970-s29", "Discovery assessment 4/6/20-year limits"),
    ("B2", "hmrc-closure-notice-mechanics-landlord-enquiries-tma-1970-s28a", "Closure notices s.28A"),
    ("B3", "cop9-contractual-disclosure-facility-landlord-tax-fraud-investigation", "CoP9 + CDF"),
    ("B4", "tribunal-appeal-process-landlords-first-tier-tribunal-tax-chamber", "FTT appeal process"),
    ("B5", "hmrc-nudge-letter-response-playbook-landlords-property-income", "HMRC nudge letter response"),
    ("B6", "let-property-campaign-formal-disclosure-route-landlords-undisclosed-rental", "Let Property Campaign disclosure"),
    ("B7", "worldwide-disclosure-facility-offshore-landlord-catch-up-fa-2017-ftc", "WDF + FtC offshore catch-up"),
    ("B8", "schedule-24-fa-2007-penalty-behaviour-categories-landlord-enquiries", "Sch 24 FA 2007 penalty behaviour"),
    ("B9", "reasonable-excuse-case-law-landlord-penalties-perrin-martland", "Reasonable excuse case law"),
    ("B10", "record-retention-discipline-voluntary-disclosure-failure-to-notify-landlords", "Record retention + voluntary disclosure"),
    # Bucket C — Specialist transactional + trust depth
    ("C1", "trust-registration-service-trs-compliance-trust-owned-btl-mlr-2017", "TRS compliance for trust-owned BTL"),
    ("C2", "immediate-post-death-interest-ipdi-rental-property-tax-iht-1984-s49a", "IPDI/QIIP rental property tax"),
    ("C3", "employee-ownership-trust-eot-property-spv-exit-mechanics-tcga-1992-s236", "EOT property-SPV exit"),
    ("C4", "section-198-fixtures-election-commercial-property-purchase-side-depth", "s.198 commercial fixtures depth"),
    ("C5", "sdlt-linked-transactions-fa-2003-section-108-landlord-portfolio-acquisition", "SDLT linked transactions s.108"),
    ("C6", "sdlt-cladding-relief-section-58c-fa-2003-leaseholder-recovery-relief", "SDLT cladding relief s.58C"),
    ("C7", "sdlt-divorce-separation-transfer-relief-schedule-3-paragraph-3-fa-2003", "SDLT divorce/separation transfer"),
    ("C8", "sdlt-bewley-uninhabitable-property-test-non-residential-rates-landlords", "SDLT Bewley uninhabitable test"),
    ("C9", "partnership-sdlt-relief-schedule-15-fa-2003-incorporation-sum-lower-proportions", "Partnership SDLT relief Sch 15"),
    ("C10", "sipp-ssas-commercial-property-purchase-mechanics-landlord-pension-fund", "SIPP/SSAS commercial property purchase"),
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

    lines = ["# Wave 7 cannibalisation re-check (181 net-new on main, 2026-05-24)", ""]
    lines.append(f"Checked: {len(WAVE7_PICKS)} Wave 7 picks against {len(our)} existing pages.")
    lines.append("")
    lines.append("Thresholds: jaccard ≥0.55 = ❌ already covered; 0.30-0.55 = ⚠️ partial overlap; <0.30 = ✅ net-new.")
    lines.append("")
    lines.append("Manager audits ⚠️ partial-overlap rows; ✅ are clear for Stage 1a; ❌ would need pick replacement.")
    lines.append("")
    lines.append("---")
    lines.append("")

    counts = {"✅ net-new": 0, "⚠️ partial overlap": 0, "❌ already covered": 0}
    rows = []
    for pick_id, slug, label in WAVE7_PICKS:
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
    for bucket_label, prefix in [("Bucket A — Regulatory / compliance", "A"),
                                  ("Bucket B — HMRC enquiry + tax compliance ops", "B"),
                                  ("Bucket C — Specialist transactional + trust depth", "C")]:
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

    out = ROOT / "docs/property/wave7_cannibalisation_check.md"
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
