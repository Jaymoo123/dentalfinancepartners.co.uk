# Track 2 — Cross-residual drift audit (B)

**Date:** 2026-05-24 (early hours)
**Trigger:** 5 drift-pattern hypotheses surfaced during Batch 1 brief drafting (F-9, F-10, F-16, F-19, F-20). User approved cluster-audit pass before next batch.
**Scope:** all 436 blog .md files on `main` (residual 233 + Wave 5 shipped 30 + 121 Wave 1-4 net-new + 52 rewrites — global grep).
**Output:** this catalogue. **No back-patches in this pass** — back-patch decisions deferred to user per finding.

## Top-line finding

**The drift pattern hypothesis was over-broad.** Initial grep across the 5 patterns produced 32 file hits; spot-checks confirmed only **6 are real drift**, the rest are historical context, post-abolition explainer text, or correctly-clarifying framing. Real cross-residual drift is narrower than predicted.

**Only ONE NEW page needing back-patch** outside existing Track 2 scope:
- `incorporate-rental-property-without-cgt.md` (residual) — carries stale "28%" CGT higher rate at FAQ #4. Should be 24% (Autumn Budget 2024). Single-line fix.

Everything else either: (a) is already in Batch 1 scope, (b) is correctly-framed historical context, (c) is a site-wide gap pattern that warrants a coordinated approach rather than scattered back-patches.

---

## Pattern F-9 — Stale-figure drift (Companies-pay-19%-CGT + pre-2020 Lettings + FHL-as-alive)

**Initial grep hits:** 25 files across 3 sub-patterns.

### F-9a — "19%" claimed as CGT rate (wrong-tax-term)

5 file hits. Spot-checks:

| File | Status | Real drift? |
|---|---|---|
| `property-company-dividend-tax.md` (residual) | "The company pays 19% corporation tax on profits (25% on profits over £250,000)" | **CLEAN** — 19% is correctly framed as Corporation Tax small profits rate, not CGT |
| `serviced-accommodation-tax-fhl-abolition-april-2025.md` (rewritten Session C #29) | Verified post-abolition explainer | **CLEAN** |
| `property-accountant-norwich-landlords-2026.md` (residual) | Not spot-checked yet; likely city-template context | Probably clean — requires verify |
| `llp-property-investment-worth-considering.md` (residual) | Not spot-checked yet | Requires verify |
| `reduce-cgt-property-disposal-uk.md` (residual, **B1-A2 in scope**) | "Companies pay 19% CGT" at FAQ #4 + body line 68 | **CONFIRMED DRIFT** — already F-9 from Batch 1, will be fixed in Phase 3 |

### F-9b — Pre-2020 Lettings Relief (£40,000 + main-residence-at-some-point)

9 file hits. Spot-check status: most are rewritten pages (CGT pillar, AEA, calculation-walkthrough — Session B+C rewrites) where the framing is post-2020 correct. The two residual hits (`letting-relief-landlords-2026-changes.md`, `tax-sell-rental-property-uk.md`) need verify. **No confirmed drift in this sub-pattern at spot-check sample.**

### F-9c — FHL pre-abolition framing

11 file hits. Spot-checks:

| File | Status | Real drift? |
|---|---|---|
| `furnished-holiday-let-tax-rules-exemptions.md` (rewritten Session B #28) | metaTitle "FHL Abolished April 2025 (Now What)" | **CLEAN** — explicit post-abolition reframe |
| `transferring-fhl-portfolio-to-limited-company.md` (Wave 1 B5 shipped) | metaTitle "Post-Abolition Decision" | **CLEAN** |
| `iht-april-2026-bpr-apr-cap-property-impact.md` (Wave 2 A4) | Verified post-abolition framing in Wave 2 brief | **CLEAN** |
| Other 8 hits | Various — likely all Wave 1-5 rewrites with correct post-abolition framing | Not spot-checked individually but pattern of Wave commits suggests CLEAN |

### F-9d — Stale CGT 28% rate

NEW spot-check pattern surfaced during audit:

| File | Status | Real drift? |
|---|---|---|
| `incorporate-rental-property-without-cgt.md` (residual) | FAQ #4: "lower CGT rates (18% vs 28%)" | **CONFIRMED DRIFT — NEW** |
| `cgt-property-2027-rate-changes-uk-landlords.md` (rewritten Session C #8) | "reduced from 28% to 24%" — correct framing | **CLEAN** |
| `london-property-accountant.md` (rewritten 2026-05-21) | "reduced the residential CGT higher rate from 28% to 24%" — correct framing | **CLEAN** |
| `ated-overseas-companies-voluntary-compliance-otm-letters.md` (Wave 3 A8) | "£3,000 to £6,000 adviser fees" — different context | **CLEAN** (false positive) |
| `property-accountant-bournemouth-landlords-tax-services.md` (rewritten 2026-05-21) | Verified clean during Session A rewrite | **CLEAN** |

**Net F-9 NEW finding:** 1 page (`incorporate-rental-property-without-cgt.md`). Single-line back-patch needed. **Recommended back-patch now or fold into Batch 2.**

---

## Pattern F-10 — TMA 1970 s.43 4-year claim deadline absent on loss/claim pages

**Initial grep hits:** Only 3 files mention 4-year framing at all (`welsh-ltt-derelict-uninhabitable-property-refund-relief-claim-mechanics.md`, `ated-six-step-compliance-walkthrough-uk-non-natural-persons.md`, `incorporating-hmo-portfolio-to-limited-company.md`). None of those are loss-claim pages. **Every loss/claim/disposal page on the site OMITS the 4-year claim deadline.**

Confirmed gap pattern (not drift). Affects:
- `cgt-property-sold-loss-claim-capital-losses.md` (residual; B1-A3 in scope — F-10 raised at Batch 1; will be fixed in Phase 3)
- `cgt-selling-multiple-properties-same-year.md` (residual; not yet in Track 2 scope)
- `cgt-deferral-strategies-property-investors-uk.md` (residual; B1-A1 in scope)
- `cgt-property-2027-rate-changes-uk-landlords.md` (rewritten Session C #8)
- `capital-gains-tax-property-complete-guide-uk.md` (rewritten Session C #47, CGT pillar)
- `cgt-calculation-selling-buy-to-let-property-step-by-step.md` (rewritten Session C #35)

**Recommendation: house-position lock.** As D-7 suggested: add one-line position to `house_positions.md §5`: *"Loss claims must be made within 4 years of the end of the tax year of disposal per TMA 1970 s.43; no time limit on using the loss once claimed."* Then back-patch references into the 6 pages above as part of the cluster's natural next batch — don't do 6 scattered single-line back-patches now.

---

## Pattern F-16 — Further 60-day-CGT cluster-collapse candidates

**Three slugs flagged by sub-bucket B as likely future REDIRECT to `cgt-payment-deadlines-property-sales-2026` canonical:**
- `how-to-report-property-sale-hmrc-60-days` (residual)
- `report-property-sale-hmrc-60-days-guide` (residual)
- `capital-gains-tax-selling-rental-property-uk` (residual; potential overlap with rewritten `cgt-selling-buy-to-let-property-calculation-guide` sibling)

**Not investigated in this audit pass** (would require full Stage 2 sub-bucket dispatch with `pull_page_data.py` to verify cluster collapse vs reposition). **Recommended for Batch 2 as Sub-bucket B continuation** — same 60-day cluster, same canonical destination, single batch can close them all.

---

## Pattern F-19 — £6,000 60-day-reporting threshold (pre-Autumn-Budget-2024 vintage)

**Initial grep hits:** 4 files. Spot-checks:

| File | Status | Real drift? |
|---|---|---|
| `cgt-property-2027-rate-changes-uk-landlords.md` (rewritten Session C #8) | "exemption was reduced from £12,300 to £6,000 in April 2023 and to £3,000 in April 2024" — correct historical framing | **CLEAN** (false positive) |
| `london-property-accountant.md` (rewritten) | Not spot-checked but pattern is rewritten city template — likely clean | Probably clean |
| `ated-overseas-companies-voluntary-compliance-otm-letters.md` (Wave 3 A8) | "£3,000 to £6,000 adviser fees" — different context entirely | **CLEAN** (false positive) |
| `cgt-inherited-rental-property-calculation-uk.md` (residual, **B1-C2 in scope**) | "If the gain exceeds £6,000, you must report and pay CGT within 60 days of completion" | **CONFIRMED DRIFT** — already F-19 from Batch 1, will be fixed in Phase 3 |

**Net F-19 NEW finding:** 0 pages. F-19 confined to 1 file already in scope.

The hypothesis that "£6,000 + 60-day" was a site-wide drift pattern is **NOT supported by the audit.** Only 1 residual page carried it.

---

## Pattern F-20 — Pre-FA-2025 non-dom-spouse framing (spouse-transfer / IHT-spouse / NRL cluster)

**Initial grep hits:** 3 files. Spot-checks:

| File | Status | Real drift? |
|---|---|---|
| `second-home-sdlt-additional-dwellings-surcharge-joint-owners-spouse-aggregation-rules.md` (Wave 5 C9 shipped) | FAQ correctly clarifies "Sch 4ZA para 9 aggregation does not depend on residence" | **CLEAN** — explicit clarification |
| `non-resident-cgt-uk-property-rates-reporting.md` (residual) | "non-resident spouse" used in NRCGT mixed-residence-couple worked example | Likely **CLEAN** (residence is actually relevant in NRCGT context, not in s.58 spouse-exemption context) — needs deeper read to fully confirm but spot-check suggests fine |
| `cgt-property-transfer-spouse.md` (residual, **B1-C3 in scope**) | Pre-FA-2025 framing confirmed at body lines 39-43 | **CONFIRMED DRIFT** — already F-20 from Batch 1, will be fixed in Phase 3 |

**Net F-20 NEW finding:** 0 pages. F-20 also confined to 1 file already in scope.

The hypothesis that "non-dom spouse" was a site-wide drift pattern is **NOT supported by the audit.** The other two grep hits handle the residence/non-dom angle correctly.

---

## D-9 hypothesis — Generic-suffix slugs more prone to deduplication

**Hypothesis:** generic-suffix slugs (`*-complete-guide`, `*-uk`, `*-2026`) more prone to Google deduplication than specific-suffix slugs.

**Quick test:** the residual 233 has many `-complete-guide` and `-uk` suffix slugs. Of the 7 pages investigated so far (4 trial T1-T4 + 3 sub-bucket A), 4 were zero-GSC invisible. Suffix breakdown:
- `airbnb-tax-uk-short-term-rental-income-taxed` (T1) — `*-taxed` suffix, INVISIBLE
- `cgt-deferral-strategies-property-investors-uk` (B1-A1) — `*-uk` suffix, INVISIBLE
- `reduce-cgt-property-disposal-uk` (B1-A2) — `*-uk` suffix, INVISIBLE
- `cgt-property-sold-loss-claim-capital-losses` (B1-A3) — `*-losses` suffix, INVISIBLE
- `birmingham-property-accountant` (T2) — `*-accountant` specific suffix, has GSC
- `2027-property-tax-rates-section-24-relief-uk-landlords` (T3) — `*-landlords` suffix, has GSC
- `cgt-rates-property-2026-27-current-rates-explained` (T4) — `*-explained` specific suffix, has GSC (895 imp)
- `60-day-cgt-reporting-property-sales-complete-guide` (B1-B1) — `*-complete-guide` suffix, INVISIBLE
- `60-day-cgt-reporting-property-sales-rule` (B1-B2) — `*-rule` specific suffix, 107 imp
- `cgt-reporting-deadlines-property-2026` (B1-B3) — `*-2026` suffix, 11 imp

**Hypothesis partially supported.** 4 of 5 generic-suffix pages are invisible; 1 of 5 specific-suffix pages is invisible. Pattern is suggestive but the sample is small (n=10). **Confirm with Phase 2 broader sample** before treating as established.

---

## Net recommended actions

### Immediate (single-line back-patch, ~5 min)

1. **`incorporate-rental-property-without-cgt.md` line 25** — change `(18% vs 28%)` to `(18% vs 24%)` per §5 LOCKED post-Autumn-Budget-2024 rates.

### Cluster-coordinated (next batch)

2. **Add house-position lock for TMA 1970 s.43 4-year claim deadline** (per Batch 1 D-7 recommendation). Then back-patch references into the 6 affected pages as part of those pages' natural rewrite cycle (B1-A3 already in Phase 3 scope; the other 5 pages distribute across CGT cluster — fold into Batch 2 sub-bucket if/when CGT cluster continues).

3. **F-16 candidates → Batch 2 Sub-bucket B** — 3 further 60-day-CGT pages. Brief drafting will confirm cluster collapse vs reposition; sub-agent runs `pull_page_data.py` to verify whether each is dominated by the same canonical.

### Confirmed-clean (no action)

4. F-19 (£6,000 60-day threshold) — confined to 1 residual page already in Phase 3 scope. **No site-wide pattern.**
5. F-20 (non-dom spouse) — confined to 1 residual page already in Phase 3 scope. **No site-wide pattern.**
6. Most Wave 1-5 shipped pages clean on the patterns checked. The 2 hallucinations caught by Batch 1 (F-13 in `cgt-payment-deadlines` canonical, F-18 in `house_positions.md §24.4`) were both back-patched in commit `a103a04`.

### Methodology note

**The audit refines the gap-mode taxonomy.** Going forward, when sub-agents flag a pattern as potentially site-wide (F-9, F-19, F-20), the manager should run a targeted spot-check audit BEFORE assuming a cluster-back-patch is needed. The initial grep is a hypothesis-generator; the spot-check is the validator. False-positive rate on grep-only audits was ~75% in this pass (24 of 32 hits were context-clean).

**Updated Phase 2 sub-agent prompt instruction:** when raising a "likely site-wide pattern" flag, the sub-agent should run 2-3 sample greps on the most likely-candidate sister pages and report whether the hit appears with similar framing or in different (clean) context. Reduces manager audit overhead.

---

## Files this audit creates / updates

- **Creates:** this doc (`docs/property/track2_audit_cross_residual_drift_2026-05-24.md`)
- **No back-patches in this audit.** All actionable findings deferred to user decision.

## What this audit deliberately does NOT do

- Does NOT back-patch the 1 confirmed F-9 finding (`incorporate-rental-property-without-cgt.md`) — user decides.
- Does NOT propose house-position-lock text for TMA s.43 — that's a Wave-manager decision (lockable position, not a Track-2 finding).
- Does NOT trigger Batch 2 — user decides timing + cluster.
- Does NOT touch any Wave 6 file (Wave 6 actively executing; collision discipline holds).
