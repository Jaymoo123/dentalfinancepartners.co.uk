# Guide consolidation + gap-fill — decision summary (2026-06-02)

Data: GSC refreshed to 2026-05-31 (90d), Bing to 2026-06-02 (43 pages only). Reasoning by Opus 4.8 over the per-cluster/gap decision packs in this folder. Collapse guard = `scripts/track2_collapse_guard.py` (advisory pre-check here), Bing veto layered on top.

## Headline: collapse is DATA-BLOCKED right now — and that is the correct answer

**Every page in every fragmented cluster is a fresh monitored rewrite (0-12 days old).** The guard REVERSES every proposed collapse (rule R5: never collapse a page mid-recovery — its GSC is artificially suppressed). We deployed all these rewrites on 2026-06-02; collapsing them now would bin pages we just invested in, on no ranking data. This is exactly the implication the user asked us to surface before acting.

→ **Action now: KEEP + cross-link every cluster (no collapse). Re-run this audit after the recovery window (~45 days → mid-July 2026)** when the pages have stabilised and there is real post-recovery ranking data to decide collapse on.

## Per-cluster verdicts

| Cluster | Survivor (data) | Verdict now | Why |
|---|---|---|---|
| Landlord tax (broad, 5) | `how-much-tax-rental-income-uk-complete-guide` | KEEP + cross-link; re-audit Jul | all 5 mid-recovery; satellites own ~0 distinct queries yet |
| SA105 / return (2) | `landlord-tax-return-complete-guide-2026` | **KEEP (distinct intent)** | the SA105 page owns the "sa105 form" long-tail (6 distinct queries) — genuinely separate intent, not a collapse target even post-recovery |
| MTD (2) | `making-tax-digital-landlords-april-2026-deadline` | KEEP + cross-link; **resolve canonical** | the *deadline* page is the established internal hub (**133 inbound** vs complete-guide's 24); my earlier essential-guides switch to the complete-guide is questionable |
| Section 24 (3) | `section-24-tax-relief-complete-guide` | **KEEP (distinct scopes)** | commercial + finance-costs are separate scopes (as predicted); cross-link to the main hub |
| ATED (2) | `ated-complete-guide-2026-27` | KEEP (intentional duo) | operational vs relief-edge-case |
| FIC (2) | `fic-complete-guide-property-wealth-transfer` | KEEP (intentional duo) | reference vs entry-level |

## Per-gap verdicts

| Gap topic | GSC demand | Current hub status | Verdict |
|---|---|---|---|
| Property accountant **services** | **608 impr** | no blog hub; caught by the blog cluster + location pages | Already addressed by the **homepage + /services + /locations** work this session; no new blog hub needed now |
| SDLT | 231 impr | `sdlt-buy-to-let-rates-surcharge-guide-2025` ranks #5 (pos 9.4, 23 inbound, sustained 6) but demand is scattered across narrow refund/relief pages | **ELEVATE** the current_best into the definitive BTL-SDLT hub (post-recovery); reasonable hub already exists |
| VAT on property | 126 impr | essential-guides points at `landlord-vat-registration-when-required` (#4), but `vat-on-rental-income-residential-vs-commercial...decision-framework` (#2, 14 queries) is a better hub | **Re-point** the VAT hub to the decision-framework page; ELEVATE later |
| Capital allowances | 93 impr | `capital-allowances-on-property` ranks **#1** (3,745 words, 14 inbound) | Already the hub and ranks best — fine as-is (AIA sub-fragmentation is a separate later item) |
| Inheritance tax | 12 impr | `inheritance-tax-rental-property-uk-guide` ranks #1 (28 inbound) | Fine as-is; low demand → low priority |
| Let Property Campaign | **1 impr** | — | ~Zero Google demand → defer (don't build a hub for 1 impression) |

## Recommended actions

**Now (safe, no collapse, rule-compliant):**
1. Resolve two essential-guides canonical picks from the new data: **MTD** → consider pointing at the deadline page (133 inbound, established hub) rather than the complete-guide; **VAT** → point at the `vat-on-rental-income...decision-framework` page (better hub than the registration page). Both are one-line edits to `src/lib/essential-guides.ts`, no page changes.
2. (Optional) in-page cross-link pass: add an explicit "see the main guide" up-link inside the KEEP satellites pointing to their survivor. Modest incremental value over the essential-guides surfacing already shipped.

**Deferred to ~mid-July 2026 (post-recovery), gated by re-running `guide_audit`:**
3. Re-evaluate collapse for landlord-tax-broad + MTD once pages exit the recovery window and show real ranking data.
4. ELEVATE the SDLT and VAT hubs (rewrite-engine) once recovery data confirms the canonical.

**Not recommended:** any collapse now; a new Let Property Campaign hub; a new property-accountant-services blog hub (homepage covers it).
