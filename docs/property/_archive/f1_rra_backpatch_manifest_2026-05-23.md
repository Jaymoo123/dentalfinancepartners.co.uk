# F-1 RRA-2026 site-wide back-patch manifest (2026-05-23)

Audit trail for mechanical citation correction sweep across the Property blog
inventory. Captures every file + line + stale phrase **before** edits land.
Source-of-truth: `docs/property/house_positions.md` §20 (locked 2026-05-22, with
F-11 §20.7 correction logged 2026-05-23).

## Scan scope

- `Property/web/content/blog/*.md` (376 files; 346 blog posts plus PRD shells)
- Pattern set (case-insensitive):
  - `Renters Rights Act 2026` / `Renters' Rights Act 2026` / `Renter's Rights Act 2026`
  - `RRA 2026`
  - `Renters Rights Bill` / `Renters' Rights Bill` / `Renter's Rights Bill`
  - `Renters Reform Bill` / `Renters Reform Act`
  - `in passage` / `pending Royal Assent` / `expected Royal Assent` / `once enacted` (only where
    within ~3 lines of an RRA / Renters' Rights reference)

## Summary

- Files scanned: 376
- Files containing the keyword `Renters` at all: 28
- Files with stale RRA citations or pre-enactment framings: **3**
- Files edited mechanically: **3**
- Files flagged for manual review: **0**
- Files containing `Renters' Rights Act 2025` (Wave 3 era, correct, untouched): 11

## Wave 3 files left untouched (already correct)

These 11 files were written or back-patched during Wave 3 against §20 and cite
`RRA 2025` / `Renters' Rights Act 2025`. They are out of scope:

- `rra-2025-landlord-enforcement-civil-penalties-banning-orders-defence.md`
- `tenancy-agreement-template-rra-2025-compliant-clauses.md`
- `section-21-abolition-uk-landlord-possession-guide-2026.md`
- `prs-database-landlord-ombudsman-registration-requirements.md`
- `renters-rights-act-rent-increase-section-13-tribunal-route.md`
- `periodic-tenancy-default-ast-conversion-mechanics.md`
- `pet-rights-tenancy-landlord-refusal-reasonable-grounds.md`
- `decent-homes-standard-prs-landlord-compliance-checklist.md`
- `landlords-considering-selling-portfolio-rra-2025-tax-implications.md`
- `bidding-wars-asking-rent-cap-landlord-marketing-compliance.md`
- `landlord-tax-changes-2026-complete-guide.md` (uses `Renters' Rights Act` no year, "from May 2026", factually correct per §20.12)

## Files NOT stale despite mentioning Renters' Rights

Reviewed and confirmed in-bounds (no year, or correctly-cited 2025 form):

- `how-to-scale-buy-to-let-portfolio-1-to-10-properties.md` (uses `Renters' Rights Act 2025`).
- `why-southampton-landlords-need-property-accountant.md` (uses `Renters' Rights Act 2025`).
- `liverpool-property-accountant-tax-services-landlords.md` (uses `Renters' Rights Act`, no year).
- `exeter-property-accountant-specialist-tax-services.md` (uses `Renters' Rights Act changes... from May 2026`).
- `property-accountant-milton-keynes-landlord-guide.md` (uses `Renters' Rights Act: Section 21 abolition from May 2026`).
- `landlord-insurance-guide-types-costs-tax-deductible.md` (uses `Renters' Rights Act`, no year).
- `ipswich-property-accountant-tax-services-local-landlords.md` (uses `Renters' Rights Act from May 2026`).
- `how-to-choose-right-property-company-structure-uk-landlords-2026.md` (uses `Renters' Rights Act`, no year).
- `cheltenham-property-accountant-landlord-tax-services.md` (uses `Renters' Rights Act`, no year).
- `brighton-property-accountant-specialist-tax-services.md` (uses `Renters' Rights Act`, no year).
- `accounting-services-for-property-owners.md` (uses `Renters' Rights Act (Section 21 abolished from May 2026)`).

These pages cite the Act without committing to a wrong year. The "May 2026"
commencement they refer to is the SI 2026/421 appointed day (1 May 2026), which
is factually accurate per §20.12. Adding the `2025` citation would tighten
precision but is NOT in scope for a mechanical-only back-patch (would risk
treating non-stale text as stale).

Note: `btl-mortgage.md`, `how-to-value-rental-property-portfolio-tax-purposes.md`,
`section-24-repeal-future-reversed.md` all matched the broad keyword scan because
they mention "renters" as a demographic group (private renters) or "reform" in
unrelated context (Section 24 reform); none reference the Act.

---

## Files with stale citations (edited mechanically)

### 1. `Property/web/content/blog/renters-rights-act-2026-tax-implications-landlords.md`

Lead page for this domain. Citation back-patch only; full content rewrite handled
by the separate manual session per the F-1 rewrite brief
(`docs/property/f1_rra_lead_page_rewrite_brief.md`).

Stale references found (pre-edit):

| Line | Stale phrase | Correction |
|---|---|---|
| 2 | `Renters' Rights Act 2026` (title) | `Renters' Rights Act 2025` |
| 8 | `Renters' Rights Act 2026` (metaTitle) | `Renters' Rights Act 2025` |
| 9 | `Renters' Rights Act 2026` (metaDescription) | `Renters' Rights Act 2025` |
| 10 | `Renters' Rights Act 2026` (altText) | `Renters' Rights Act 2025` |
| 12 | `Renters' Rights Act 2026` (h1) | `Renters' Rights Act 2025` |
| 13 | `Renters' Rights Act 2026` (summary) | `Renters' Rights Act 2025` |
| 16 | `Renters' Rights Act 2026` (FAQ Q1) | `Renters' Rights Act 2025` |
| 17 | `Renters' Rights Act 2026` (FAQ A1) | `Renters' Rights Act 2025` |
| 26 | `Renters' Rights Act 2026 tax implications for landlords` (body) | `Renters' Rights Act 2025 tax implications for landlords` |
| 43 | `Renters' Rights Act 2026` (body) | `Renters' Rights Act 2025` |
| 49 | `renters reform bill landlord` (body bold keyword) | `Renters' Rights Act 2025` |
| 55 | `Renters' Rights Act 2026` (body) | `Renters' Rights Act 2025` |
| 64 | `Renters' Rights Act 2026` (body) | `Renters' Rights Act 2025` |
| 68 | `Renters' Rights Act 2026` (body) | `Renters' Rights Act 2025` |
| 78 | `renters rights act 2026 tax implications landlords` (body bold keyword) | `Renters' Rights Act 2025 tax implications for landlords` |
| 79 | `Renters' Rights Act 2026` (body) | `Renters' Rights Act 2025` |

Slug `renters-rights-act-2026-tax-implications-landlords` left in place per F-1
PART 1 scope discipline (no slug change without redirect mapping; manual session
decision).

### 2. `Property/web/content/blog/inheriting-uk-rental-property-executors-step-by-step.md`

Single body reference; written by Wave 2 (IHT) session 5cbd2ac, pre-dates the
§20 lock so still uses Bill-era framing.

| Line | Stale phrase | Correction |
|---|---|---|
| 115 | `the Renters' Rights Act 2026 is in passage and re-shapes the section 21 framework` | `the Renters' Rights Act 2025 (2025 c. 26, Royal Assent 27 October 2025) has now re-shaped the section 21 framework` |

### 3. `Property/web/content/blog/ated-rental-property-relief-mechanics.md`

Single body reference; written by Track 1 (ATED) session 1a79c63, pre-dates the
§20 lock so still uses "once enacted" framing.

| Line | Stale phrase | Correction |
|---|---|---|
| 112 | `a periodic tenancy under the Renters' Rights regime once enacted` | `a periodic tenancy under the Renters' Rights Act 2025 regime` |

---

## Manual-review queue (none)

No files were flagged for manual review during this sweep. The lead RRA page
(`renters-rights-act-2026-tax-implications-landlords.md`) carries Bill-era
factual assumptions beyond mechanical citation drift (e.g., "may lead to longer
void periods" framings that should now reflect actual post-1-May-2026 in-force
state). That is a content rewrite scoped to PART 2 (rewrite brief), not a
mechanical back-patch issue.

## Build verification

`cd Property/web; npm run build` to be run once after all edits land.

## Commit

Single commit on main, post-merge style consistent with F-7B / F-9 / F-7C.
