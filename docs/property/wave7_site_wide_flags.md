# Wave 7 site-wide flags

**Created:** 2026-05-24 PM. Sessions append to this file in main via absolute path `C:/Users/user/Documents/Accounting/docs/property/wave7_site_wide_flags.md` (NOT to worktree-branch copies, per §16.15 / §16.37).

Flag format (one block per flag):
```
## F-N {FLAG_TYPE} — {one-line headline}
**Session:** A / B / C
**Page:** {slug}
**Surfaced at:** {timestamp + which step of 19-step workflow}
**Detail:** {what is wrong / what needs attention}
**Action proposed:** {session-proposed fix, if any}
**Manager status:** [open / acknowledged / resolved at commit X / deferred to inter-wave queue]
```

Flag types per NETNEW_PROGRAM §13.2:
- HOUSE_POSITION_CONFLICT — competitor evidence contradicts house position
- CANNIBAL — two sibling pages overlap
- INTERNAL_LINK — existing page should link to new page
- SCHEMA — non-default schema type might help SERP
- REDIRECT — redirect action taken or not taken
- POSITIONING — brand / lead-gen positioning question
- BUILD_BLOCKER — build breaking from non-own-page cause
- CALCULATOR_IDEA, COMPONENT_IDEA, CROSS_NICHE_LINK, FACTUAL — also valid
- EXISTING_PAGE_STALE — existing page with stale figures/framing (logs to discovery too)
- BRIEF_DRIFT — Stage 1a / Stage 2 brief contains a statutory or factual error caught at write time per §16.35 / §16.36

Flags never block. Sessions continue work after flagging.

---

---

## [TRACK 2 POST-BATCH-2 INPUT — F-31 wrong-CT-£250k-threshold cluster pattern house-position lock recommendation]

**Source:** Track 2 manager (cross-track), 2026-05-24.
**Origin flag:** `track2_site_wide_flags.md` F-31 (raised 2026-05-24 during Batch 2 Sub-bucket C drafting); confirmed at scale via §16.43 STALE-sweep sub-agent dispatch (commit `195e895`, 2026-05-24).
**Severity:** HIGH (site-wide; affected 65+ legacy pages before back-patch).

**The pattern.** A residual cohort of pre-FA-2021 + early-DeepSeek-template-vintage pages on corporate / SPV / LtdCo ownership conflated three distinct post-FA-2021 corporation tax figures:
- 25% main rate (profits > £250,000)
- 19% small profits rate (profits ≤ £50,000)
- Marginal relief tapering between £50,000 and £250,000

Common drift manifestations:
- "Companies pay 19% on the first £250,000" (WRONG — 19% applies up to £50k)
- "Small profits rate of 19% for profits under £250,000" (WRONG — £250k is the marginal relief upper bound)
- "Companies pay 25% on profits over £50,000" (WRONG — main rate is 25% on profits over £250k)
- "Companies pay 19% CGT" (WRONG — companies don't pay CGT; they pay CT on chargeable gains, per F-9)

**Scale at audit (commit `195e895`):** 65 pages back-patched + 0 false positives. Pattern affected the corporation-tax-rates pillar page ITSELF (summary + FAQ + body small-profits-section + body main-rate-section, 4 separate patches needed), plus 64 other pages including all 22 Section 24 pages, all city accountant pages, FIC pages, incorporation pages, and tangentially-CT-touching pages (per D-10 contagion expansion).

**Recommended action (Wave 7+ house-position lock):**
- Add new sub-section to `house_positions.md` §21 (LtdCo + FIC) — proposed **§21.X "Corporation tax three-figure framework (FA 2021 architecture, post-1-April-2023)"** — locking the verbatim £50k SPR threshold / £250k main rate threshold / 26.5% effective marginal rate framing with reference to the relevant FA 2021 + FA 2022 source sections.
- Companion CI / pre-commit hook recommendation: ban the regex `19%.*£250` outside marginal-relief contexts (`marginal relief.*£250,000.*£50,000` should remain allowed) — would catch any regression of the pattern in future generation passes or human edits.
- Optional: add a "Companies pay Corporation Tax (NOT CGT) on chargeable gains" note to §5 LOCKED CGT section as cross-reference, since the F-9 sub-pattern conflates CGT with CT.

**Why this is Wave-manager-level, not a Track 2 patch:**
Track 2 does NOT lock house positions (per `TRACK2_PROGRAM.md §6` deference rule + `TRACK2_MANAGER_PICKUP.md §1` exception list — citation fixes are Track-2 manager-callable; new position-shape locks are Wave-manager-callable). The 65-page site-wide back-patch was within Track 2's scope (it's content cleanup, not house-position lock); the new house position to PREVENT future regression is Wave-manager-level.

**Verification anchors for the locking manager:**
- legislation.gov.uk FA 2021 Sch 1 Part 1: https://www.legislation.gov.uk/ukpga/2021/26/schedule/1 (small profits rate framework)
- legislation.gov.uk CTA 2010 s.18A-N (small profits rate + associated companies): https://www.legislation.gov.uk/ukpga/2010/4/section/18A
- gov.uk consumer guidance: https://www.gov.uk/government/publications/rates-and-allowances-corporation-tax/rates-and-allowances-corporation-tax

**Status:** open. Awaiting Wave 7+ manager pickup OR a fresh house-position-extension session.

---

## [TRACK 2 POST-BATCH-2 INPUT — 2 minor follow-ups for next-session triage]

**Source:** Track 2 manager (cross-track), 2026-05-24. Surfaced by §16.43 STALE-sweep sub-agent.

**Item 1: `claim-mortgage-interest-rental-property-uk-section-24.md` — ambiguous F-35 year-stamp call.**
Page covers the IN-FLIGHT 2025/26 SA filing cycle (returns for tax year 2025/26 are filed by January 2027 — that window is open right now). Page title + body reference "2025/26" throughout. Sub-agent left unpatched per ambiguity: legitimate for current filing cycle but may benefit from a forward-looking note covering the 2026/27 position too. Needs manager judgement on whether to add the forward-note or rewrite the page as a multi-year piece.

**Item 2: `how-to-complete-landlord-self-assessment-filing-step-by-step-guide.md` — "2024-25 form box 44" references.**
Page is in 2026-05-21 rewrite cohort but references "2024-25 form box 44" for the SA105 finance costs box. Currently-being-filed cycle is 2025/26 (SA105 for tax year 2025/26 should be the relevant reference). Multiple inline "2024-25 form" / "2024-25" references in the body. Sub-agent flagged but left unpatched (out of STALE-sweep target scope; box number accuracy requires SA105 form verification before unilateral patch). Recommend next manager session: verify the current SA105 box number for finance costs against the 2025-26 form + apply a targeted back-patch.

**Status:** both items open. Non-blocking. Bank at next manager-attention pass OR fold into a future STALE-sweep dispatch.

---

## F-1 BRIEF_DRIFT — HA 2004 s.249A civil penalty uplifted £30k → £40k (1 May 2026, SI 2026/319)
**Session:** A
**Page:** `hmo-selective-licensing-compliance-housing-act-2004-landlord-licensing-mechanics` (A4)
**Surfaced at:** 2026-05-24, step 7 (per-write verification)
**Detail:** The A4 brief and house position §26.9 both anchor the civil penalty in HA 2004 s.249A at "up to £30,000 per offence". The brief explicitly directed re-verification ("verify civil penalty £30k under s.249A has NOT been uplifted in FA 2025/2026"). Verified live against https://www.legislation.gov.uk/ukpga/2004/34/section/249A on 2026-05-24: the figure has been uplifted to **£40,000** by **The Financial Penalties (Housing Offences and Breach of Banning Orders) Regulations 2026 (SI 2026/319) reg.2**, in force **1 May 2026**. Quoted text of s.249A(4): "The amount of a financial penalty imposed under this section is to be determined by the local housing authority, but must not be more than £40,000." Note: this uplift sits alongside the parallel £40k cap already locked at §20.10 for RRA 2025 enforcement offences — the entire civil-penalty regime under HA 2004 + RRA 2025 has converged at £40k. The 14th Wave 7 drift catch (cf. §16.45's 13).
**Action proposed:**
1. A4 written using £40,000 figure verbatim (per-write fix; landed in this commit).
2. Back-patch §26.9 mini-lock to substitute £40,000 for £30,000 + add SI 2026/319 commencement note (manager-callable; the existing six-line block at lines 2109-2129 of `house_positions.md` carries three £30,000 references — bullets "Statutory hooks", "Civil penalty alternative", "Do not write" 4th bullet — all need symmetric back-patch).
3. Back-patch §26.7 / §20.10 cross-references if any £30k figure appears (none located in spot-check; full grep recommended at close).
4. Pre-launch cannibal cross-check existing `hmo-licensing-fees-tax-deductible-uk-landlords` page (no explicit £30k figure; safe).
5. Recommend grep of all wave7 briefs + site-wide existing pages for the literal string "£30,000" in HMO / selective-licensing / s.249A contexts before Wave 7 close; figures may appear on `hmo-tax-guide-rental-income-deductions-multi-tenant`, RRO-related pages, or city-accountant pages.
**Manager status:** **CLOSED 2026-05-24 PM** by fresh manager pickup session.

**Manager closure log (2026-05-24 PM):**
- Action 2 (§26.9 back-patch): DONE. Patched **four** references in `house_positions.md` §26.9 (lines 2109 "Statutory hooks" + 2116 "Civil penalty alternative" + 2127 "Do not write" + 2129 "Practical writing rule" — Session A's original note caught three; I patched all four including the shorthand "civil £30k" on line 2129). Added SI 2026/319 commencement note + closure stamp to the §26.9 practical writing rule.
- Action 3 (§26.7 / §20.10 cross-references): VERIFIED clean — no £30k figures in those sections (grep confirmed).
- Action 4 (cannibal cross-check of `hmo-licensing-fees-tax-deductible-uk-landlords`): VERIFIED clean per Session A's spot-check (no £30k figure on that page).
- Action 5 (wider grep): Wave 7 briefs patched in this commit:
  - `STAGE1A_BRIEF_SEEDS.md` — 4 references patched.
  - `hmo-selective-licensing-compliance-housing-act-2004-landlord-licensing-mechanics.md` (A4 brief) — 6 references patched (framing differentiator + fetch instruction + statutory anchor + per-write verification + drift watchpoints + workflow step 7).
  - `WAVE7_SESSION_A_START_HERE.md` — 1 reference patched.
- **Wider grep also found** 7 existing Property blog pages with `£30,000` references in HMO/s.249A/RRA contexts (`why-southampton-landlords-need-property-accountant`, `rra-2025-landlord-enforcement-civil-penalties-banning-orders-defence`, `prs-database-landlord-ombudsman-registration-requirements`, `decent-homes-standard-prs-landlord-compliance-checklist`, `landlords-considering-selling-portfolio-rra-2025-tax-implications`, `incorporating-hmo-portfolio-to-limited-company`, `property-accountant-nottingham-landlords`) + 1 Wave 6 brief (`hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property`). Per manager-user decision (2026-05-24 PM): existing-page back-patches **deferred to Track 2 STALE sweep** (not launch-blocking; Track 2 sweep already proven at site-wide scale per §16.43). New F-2 recommendation logged below.
- Action 1 (A4 written with £40,000): SESSION A — when you next read the A4 brief, the £40,000 figure is now baked in verbatim (no more "verify" instruction). If you have already drafted the body with £30,000, please grep your draft and substitute £40,000 + add SI 2026/319 / 1 May 2026 commencement clause before commit.
- **Drift catch count:** Wave 7 §16.45 now stands at 14 catches (was 13 at HP-lock close; F-1 added the SI 2026/319 commencement uplift not visible at HP-lock time).

---

## F-2 STALE_SWEEP_RECOMMENDATION — back-patch existing Property pages for £30,000 → £40,000 s.249A uplift
**Source:** Manager closure of F-1, 2026-05-24 PM.
**Severity:** MEDIUM (site-wide; affects 7 legacy pages + 1 Wave 6 brief; all references obsolete from 1 May 2026).
**Affected files (from grep at F-1 closure):**
- `Property/web/content/blog/why-southampton-landlords-need-property-accountant.md`
- `Property/web/content/blog/rra-2025-landlord-enforcement-civil-penalties-banning-orders-defence.md`
- `Property/web/content/blog/prs-database-landlord-ombudsman-registration-requirements.md`
- `Property/web/content/blog/decent-homes-standard-prs-landlord-compliance-checklist.md`
- `Property/web/content/blog/landlords-considering-selling-portfolio-rra-2025-tax-implications.md`
- `Property/web/content/blog/incorporating-hmo-portfolio-to-limited-company.md`
- `Property/web/content/blog/property-accountant-nottingham-landlords.md`
- `briefs/property/wave6/hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property.md` (Wave 6 brief — already deployed page; back-patch in next STALE sweep or as part of monitored_pages regression check).
**Recommended action:** Bundle into next Track 2 STALE sweep with literal-string regex `£30,000` AND s.249A context (or HMO + licensing + penalty co-occurrence). Replacement template: `£40,000 per offence under HA 2004 s.249A from 1 May 2026 per SI 2026/319 reg.2 (was £30,000 under HPA 2016)`.
**Status:** open. Non-blocking for Wave 7 launch (these are existing pages with stale figures; new Wave 7 pages will use correct figure).
