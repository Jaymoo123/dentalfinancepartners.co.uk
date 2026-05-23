# Wave 5 §20.12 Citation Tightening (Inter-Wave Queue Item 7)

**Date:** 2026-05-23
**Scope:** `Property/web/content/blog/*.md`
**Standard (house_positions.md §20.12):** "Renters' Rights Act 2025 (commencement 1 May 2026 per SI 2026/421)" for substantive in-force claims.

## Method

Grep-driven sweep for three loose-citation patterns across the live blog directory:

1. `Renters'? Rights Act` (with or without apostrophe)
2. `from May 2026`
3. `RRA 2025` followed by claims without SI 2026/421 / commencement reference

Briefs directory (`briefs/property/`) was excluded per the brief.

## Scan Statistics

| Metric | Count |
|---|---|
| Files scanned containing target patterns | 30 |
| NEEDS-TIGHTEN occurrences (patched) | 17 |
| ALREADY-PRECISE files (left alone) | 13 |
| SKIP files (general / contextual / dedicated RRA pages) | 13 |
| Patches applied this pass | 17 |

## Per-File Edit Count (NEEDS-TIGHTEN patches applied)

| File | Edits |
|---|---|
| `landlord-insurance-guide-types-costs-tax-deductible.md` | 2 |
| `when-to-sell-rental-property-key-indicators-landlords.md` | 2 |
| `accounting-services-for-property-owners.md` | 1 |
| `brighton-property-accountant-specialist-tax-services.md` | 1 |
| `cheltenham-property-accountant-landlord-tax-services.md` | 1 |
| `derby-property-accountant-specialist-tax-services-local-landlords.md` | 1 |
| `exeter-property-accountant-specialist-tax-services.md` | 1 |
| `how-to-choose-right-property-company-structure-uk-landlords-2026.md` | 1 |
| `ipswich-property-accountant-tax-services-local-landlords.md` | 1 |
| `landlord-tax-changes-2026-complete-guide.md` | 1 |
| `liverpool-property-accountant-tax-services-landlords.md` | 1 |
| `property-accountant-milton-keynes-landlord-guide.md` | 1 |
| `property-investment-benchmarks-uk-2026-good-yield.md` | 1 |
| `property-portfolio-review-checklist-landlords-2026.md` | 1 |
| `what-is-good-gross-yield-buy-to-let-property-2026.md` | 1 |
| `why-southampton-landlords-need-property-accountant.md` | 1 |

**Top-3 files by edit count:**

1. `landlord-insurance-guide-types-costs-tax-deductible.md` (2 edits)
2. `when-to-sell-rental-property-key-indicators-landlords.md` (2 edits)
3. Tied across the 14 single-edit files

## ALREADY-PRECISE (left alone)

- `ated-rental-property-relief-mechanics.md` — "Renters' Rights Act 2025 regime"
- `inheriting-uk-rental-property-executors-step-by-step.md` — cites Royal Assent 27 October 2025 + Act number
- `london-property-accountant.md` — full SI + section ref already in line 207
- `property-accountant-bournemouth-landlords-tax-services.md` — "RRA 2025 s.98 in force 1 May 2026"
- `mtd-itsa-digital-records-receipts-bank-feeds-what-counts-evidence.md` — RRA 2025 referenced in registration / paperwork context (general mention, not substantive in-force claim)
- `how-to-scale-buy-to-let-portfolio-1-to-10-properties.md` — full section refs
- 7 dedicated RRA explainer pages (titled around RRA 2025): bidding-wars-asking-rent-cap, decent-homes-standard-prs, landlords-considering-selling-portfolio-rra-2025, periodic-tenancy-default-ast-conversion, pet-rights-tenancy-landlord-refusal, prs-database-landlord-ombudsman, renters-rights-act-rent-increase-section-13, renters-rights-act-2026-tax-implications, rra-2025-landlord-enforcement-civil-penalties, section-21-abolition-uk-landlord-possession, tenancy-agreement-template-rra-2025

## SKIP (conservative-posture)

Dedicated RRA explainer pages reference the Act repeatedly in contextual (not substantive-in-force-claim) positions. The Act's name + year is established at the page level (title / h1 / metaTitle); subsequent in-page mentions are contextual recurrence, not loose citations needing per-mention SI tightening. Per the brief's conservative-posture instruction, left alone.

## Patch Pattern Applied

| Before | After |
|---|---|
| `Renters' Rights Act (Section 21 abolished from May 2026)` | `Renters' Rights Act 2025 (commencement 1 May 2026 per SI 2026/421, abolishing Section 21)` |
| `Renters' Rights Act: Section 21 abolition from May 2026` | `Renters' Rights Act 2025: Section 21 abolition on commencement 1 May 2026 (per SI 2026/421)` |
| `The Renters' Rights Act, eliminating Section 21 evictions from May 2026` | `The Renters' Rights Act 2025, eliminating Section 21 evictions from commencement 1 May 2026 (per SI 2026/421)` |
| `Section 21 no-fault evictions will be abolished from May 2026` | `Section 21 no-fault evictions are abolished under the Renters' Rights Act 2025 (commencement 1 May 2026 per SI 2026/421)` |
| `Renters' Rights Act from May 2026` | `Renters' Rights Act 2025 (commencement 1 May 2026 per SI 2026/421)` |

Sentence flow preserved; parenthetical lifted to leading position where it sat at the end of a bare clause, kept inline where the sentence already had a structural anchor.

## Unexpected Findings

1. **F-1 already covered the dedicated RRA explainer pages thoroughly** — they carry section-level (s.13, s.16B, s.56, s.98) and Royal-Assent references, so no per-mention tightening was justified.
2. **Two location pages already precise** — `london-property-accountant.md` and `property-accountant-bournemouth-landlords-tax-services.md` were rewritten during prior waves with the SI reference baked in. F-1 missed these only because they weren't loose.
3. **`inheriting-uk-rental-property-executors-step-by-step.md`** uses Royal-Assent date (27 October 2025) instead of SI commencement — equally precise on a different precision axis. Left alone.
4. **No `RRA 2025`-without-SI loose claims found** — every `RRA 2025` occurrence appeared either inside a dedicated explainer page (with section references nearby) or alongside SI 2026/421 reference. F-1 sweep was thorough on that pattern.

## Status

Patches uncommitted. Manager reviews + commits per inter-wave queue protocol.
