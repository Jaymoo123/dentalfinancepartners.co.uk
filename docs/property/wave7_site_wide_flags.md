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
