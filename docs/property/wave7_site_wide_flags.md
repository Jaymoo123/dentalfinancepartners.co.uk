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

---

## F-3 BRIEF_DRIFT — Brief authority links + §20.2 carry wrong RRA 2025 section numbers (s.4 / s.6 should be s.2 / s.15)
**Session:** A
**Page:** `renters-rights-act-section-21-abolition-landlord-operational-mechanics` (A2)
**Surfaced at:** 2026-05-24, step 7 (per-write verification)
**Detail:** Two distinct section-number errors caught at verification against legislation.gov.uk on 2026-05-24:
1. **s.21 abolition mechanism citation.** A2 brief authority links list "RRA 2025 s.4 (s.21 abolition mechanic)". Verified live (https://www.legislation.gov.uk/ukpga/2025/26/section/2 and contents page): RRA 2025 **s.4** is "Possession for anti-social behaviour: relevant factors". The actual s.21 abolition mechanism is **RRA 2025 s.2** ("Abolition of assured shorthold tenancies"), which omits Chapter 2 of Part 1 HA 1988 + s.6A.
2. **12-month re-letting restriction citation.** A2 brief + house position §20.2 + multiple Wave 5/6 pages cross-reference "RRA 2025 s.6" for the 12-month re-letting restriction on landlord-sale + landlord-occupation grounds. Verified live (https://www.legislation.gov.uk/ukpga/2025/26/section/6): RRA 2025 **s.6** is "Statutory procedure for increases of rent" (rent-increase mechanism, NOT re-letting restriction). The actual 12-month re-letting restriction sits in the new **HA 1988 s.16E inserted by RRA 2025 s.15** — which inserts new HA 1988 ss.16I-16L (s.16J the criminal offence, s.16K the £40,000 civil-penalty alternative).

A2 written using the corrected citations (RRA 2025 s.2, s.3 introducing Sch 1, s.15 inserting HA 1988 s.16E + s.16J + s.16K).
**Action proposed:**
1. A2 written using corrected section numbers (per-write fix; landed in commit `db2c611`).
2. Back-patch §20.2 of `house_positions.md` to correct the re-letting-restriction citation (RRA 2025 s.15 inserting HA 1988 s.16E + s.16J / s.16K enforcement). Note §20.2 currently does NOT name a section for the 12-month restriction, but multiple cross-references in briefs and existing pages cite "RRA 2025 s.6" — the §20.2 mini-lock should add the correct citation explicitly to prevent future drift.
3. Grep `briefs/property/wave7/*.md` (especially A1, A3, A5, A6, A10) for cross-references to "RRA 2025 s.4" (in s.21 abolition contexts) or "RRA 2025 s.6" (in re-letting restriction contexts); replace with corrected citations before further A-pages ship.
4. Grep `Property/web/content/blog/*.md` for `s\.6 RRA` / `RRA 2025 s\.6` / `RRA 2025 s\.4` in s.21-abolition / re-letting contexts; existing Wave 1/3/5 pages may also carry the wrong citation. Bundle into Track 2 STALE sweep similar to F-2.
5. Recommend a §20.2 verbatim-section-heading table mini-lock to prevent future drift: RRA 2025 s.2 (AST abolition), s.3 (Sch 1 introduction), s.4 (ASB relevant factors), s.5 (form of notice), s.6 (rent procedure), s.15 (financial penalties inserting HA 1988 ss.16I-16L), s.16E (re-letting restriction) — sequentially numbered but distinct provisions easily collapsed.
**Manager status:** open

---

## F-4 CROSS_BUCKET — C1 forward-reference to C2 (IPDI) unhyperlinked at write time
**Session:** C
**Page:** `trust-registration-service-trs-compliance-trust-owned-btl-mlr-2017` (C1)
**Surfaced at:** 2026-05-24, step 11 (verification — internal-links-resolve gate)
**Detail:** C1 body discusses the trust-registration mechanic that applies to IPDI trusts under IHTA 1984 s.49A (within the "How TRS interacts with IPDI, bare, and FIC routes" H2). C2 (`immediate-post-death-interest-ipdi-rental-property-tax-iht-1984-s49a`) is the dedicated IPDI depth page in Wave 7 Bucket C; per §16.32 sequencing constraint, C1 ships FIRST (TRS framework cited by C2 forward); therefore at C1 write time C2 does not yet exist on disk. C1 references IPDI mechanics in unhyperlinked prose to avoid breaking the internal-links-resolve verification gate. Wave 6 §16.32 / §16.26 pattern applies: post-merge cross-link back-patch needed once C2 lands on main.
**Action proposed:** At wave close, post-merge back-patch step, add hyperlinked C1→C2 reference. Insert `<a href="/blog/incorporation-and-company-structures/immediate-post-death-interest-ipdi-rental-property-tax-iht-1984-s49a">our depth page on IPDI rental property tax</a>` (or equivalent) in the "IPDI trusts under IHTA 1984 s.49A are registrable taxable relevant trusts" paragraph (third H2 from the bottom of the body, "How TRS interacts with IPDI, bare, and FIC routes" section).
**Manager status:** open (deferred to wave-close cross-bucket batch per §16.32 standard pattern)

---

## F-5 BRIEF_DRIFT — Sch 24 FA 2007 para 10 has NO "within 12 months" qualifier on careless-unprompted 0% floor (Sch 41 conflation in brief + §27.2)
**Session:** B
**Page:** `schedule-24-fa-2007-penalty-behaviour-categories-landlord-enquiries` (B8)
**Surfaced at:** 2026-05-24, step 7 (per-write verification per §16.35 / §16.36)
**Detail:** The B8 brief framing differentiator + Stage 2 brief body + house position §27.2 mitigation-floor table all carry the parenthetical "(within 12 months)" on the careless-unprompted-0% floor. Verified live against https://www.legislation.gov.uk/ukpga/2007/11/schedule/24/paragraph/10 on 2026-05-24: paragraph 10 contains NO 12-month qualifier. The Sch 24 para 10 table reads verbatim:

| Standard % | Min unprompted | Min prompted |
|---|---|---|
| 30% | 0% | 15% |
| 70% | 20% | 35% |
| 100% | 30% | 50% |

The "within 12 months" qualifier belongs to **Schedule 41 FA 2008** (failure-to-notify, para 13): non-deliberate unprompted disclosure within 12 months of when liability arose gets the 0% floor; outside that window, the floor is 10%. The two regimes have **different** time-based mechanics on the unprompted-disclosure floor; B8 distinguishes them explicitly as an operational differentiator. The brief's framing differentiator's "(0% floor only available for careless within 12 months)" parenthetical and §27.2's "0% (within 12 months)" cell are both wrong against the current statute.

This is the **15th** Wave 7 drift catch (cf §16.45's 13 + F-1's 14th).

**Action proposed:**
1. B8 written using the corrected statute (per-write fix; landed in commit `7e69bb0`).
2. Back-patch §27.2 mitigation-floor table to remove "(within 12 months)" from the careless-unprompted-0% cell. The §27.9 do-not-write list bullet "with mitigation to 0% unprompted within 12 months or 15% prompted" needs the same scrub. Manager-callable; small edit.
3. Back-patch B8 brief (`briefs/property/wave7/schedule-24-fa-2007-penalty-behaviour-categories-landlord-enquiries.md`) framing differentiator parenthetical for audit-trail hygiene. Manager-callable; small edit.
4. Re-scan other Wave 7 briefs and existing Property blog pages for the literal pattern "12 months" near "Sch 24" / "Schedule 24" / "inaccuracy" / "Sch.24" contexts to catch any further conflation. Bundle into Track 2 STALE sweep alongside F-2.
5. Consider adding §27.2 do-not-write bullet: "the Sch 24 careless-unprompted-0% floor is NOT subject to a within-12-months cliff (do not import Sch 41 para 13's 12-month qualifier into Sch 24 commentary)" — explicit do-not-write protection against future conflation.

**Manager status:** open.

---

## [SESSION_A_COMPLETE]
**Session:** A (Bucket A: Regulatory / compliance, 9 pages)
**Completed:** 2026-05-24
**Branch:** `property-wave7-a`
**Commits (sequence):** `1b068ee` (A4 HMO licensing) → `db2c611` (A2 s.21 abolition operational) → `2b0cd6b` (A5 Sch 1 grounds reform) → `e0e644d` (A3 AST-periodic conversion) → `8425f81` (A6 redress scheme) → `f3bb456` (A8 EPC C 2030) → `5b61670` (A9 EPC grants) → `b67a0ea` (A10 BSA 2022 Sch 8) → `bb28ebf` (A1 RRA tax hub same-slug rewrite).
**Total body words:** ~27,131 across 9 pages (avg 3,015/page; range 2,549-3,676).
**Total FAQs:** 108 (12 per page).
**monitored_pages IDs:** 251, 253, 254, 256, 258, 260, 263, 267, 269.
**Flags raised by Session A:**
- **F-1** BRIEF_DRIFT — HA 2004 s.249A civil penalty uplifted £30k → £40k via SI 2026/319 effective 1 May 2026 (closed by manager 2026-05-24 PM with §26.9 + brief + START_HERE back-patches; F-2 STALE_SWEEP_RECOMMENDATION logged for 7 legacy pages + 1 Wave 6 brief).
- **F-3** BRIEF_DRIFT — RRA 2025 section-number drift: brief authority links cite "s.4" for s.21 abolition mechanism (actual: s.2) and "s.6" for 12-month re-letting restriction (actual: HA 1988 s.16E inserted by RRA 2025 s.15). Used corrected citations in A2/A5/A3/A6/A1. Recommended §20.2 verbatim-section-heading mini-lock to prevent future drift.

**Discoveries:** D-1 to D-7 logged in `wave7_discovery_log_session_A.md` covering existing-page stale items (`hmo-licensing-fees-tax-deductible-uk-landlords` clean; `section-21-abolition-uk-landlord-possession-guide-2026` likely pre-commencement framing), authority gaps (SI 2026/319 new citation; banning-order legal-defence costs deductibility; RRA 2025 s.15-17 enforcement architecture), and link-opportunity items.

**Build status:** clean on all 9 pages.

**Brief→tracker deviations:** all 9 pages used `landlord-tax-essentials` or `property-types-and-specialist-tax` category. Brief suggested non-existent `regulatory-and-compliance` category; tracker had the correct category. Log entries against A4 specifically captured the override pattern.

**Discipline preserved:** Q&A / tracker / flags / discovery / work-logs all written to main via absolute path per §16.15 + §16.37. Per-page commits on `property-wave7-a` only; no tracker commits on branch. §16.45 drift catches now extended: F-1 added a 14th catch; F-3 added a 15th/16th depending on whether the s.4-vs-s.2 and s.6-vs-s.15 are counted separately or together. §26 do-not-write list cleanly observed across all pages (no EPC C 2030 enacted-framing, no £25k ombudsman cap as statute, no SPV qualifying-lease confusion, no 11m-HRB threshold collapse, no SI 2025/1368-as-England-commencement confusion).

---

## [SESSION_B_COMPLETE] — Bucket B all 10 pages shipped

**Surfaced:** 2026-05-24 late evening UTC.

All 10 Bucket B pages live on `property-wave7-b` branch (commits `7e69bb0` B8, `83e8543` B1, `184aca5` B2, `959b38a` B3, `1d2cb41` B4, `c062892` B5, `1872827` B6, `bf1f783` B7, `71a25b3` B9, `a45e12e` B10). Total Bucket B body words: 28,557 across 10 pages (range 2,761 to 3,307; average 2,856). Total FAQs: 120 (12 per page). Total monitored_pages registrations: 10 (IDs 255, 259, 262, 264, 266, 268, 271, 272, 274, 276). Total commit count on `property-wave7-b` since launch ref `6d7343a`: 10 page commits + 1 work-log fill commit (`04a0e87` B8).

**Within-bucket sequencing respected:** B8 shipped FIRST as the Sch 24 penalty-matrix anchor. B5/B6/B7/B10 all forward-cite B8. B1 shipped before B7 (offshore framework dependency). B2/B3/B4/B9 shipped independently per §16.32.

**Build status:** clean on all 10 pages. One YAML break caught + fixed during B9 build (HTML anchor tags injected into FAQ frontmatter answer — reverted FAQ to plain text + retained anchor tags in body).

**Em-dash discipline:** all 10 pages 0 em-dashes at commit. B6 + B9 each had 1 em-dash caught + replaced during verification.

**Brief→page deviations:** B8 raised F-5 BRIEF_DRIFT on "within 12 months" qualifier conflation (Sch 24 vs Sch 41 distinction). All other 9 pages tracked brief faithfully.

**Discoveries logged:** 2 in Session B discovery log (D-1 Tooth doctrinal width; D-2 penalties-not-declaring-rental-income-hmrc forward-link opportunity). Both deferred to Track 2 STALE sweep or wave-close audit.

**Discipline preserved:** Q&A / tracker / flags / discovery / work-logs all written to main via absolute path per §16.15 + §16.37. Per-page commits on `property-wave7-b` only; no tracker commits on branch.

---

## [SESSION_C_COMPLETE] — 2026-05-24

**Status:** All 9 Bucket C pages shipped on `property-wave7-c`.

**Commits on branch (in order):** d07027b C1 → 7d1b4da C1 work-log → 5f3676a C9 → e4f1850 C9 work-log → 1cd3e88 C2 → 1922e7a C3 → 0c63197 C5 → d5a9844 C6 → 542796b C7 → 14439da C8 → 3d5a95f C10. Eleven commits total; per-page commit discipline maintained (no tracker / flags / discovery / Q&A commits on branch per §16.15 + §16.37).

**Tracker summary:** 9 ✅ done. Body word totals: C1 3230 / C9 3330 / C2 3090 / C3 2905 / C5 2845 / C6 2920 / C7 2857 / C8 2823 / C10 2872. FAQ counts uniformly 14. monitored_pages IDs: 252 / 257 / 261 / 265 / 270 / 273 / 275 / 277 / 278.

**Brief→page deviations:**
- C5 brief specified non-existent category `property-tax-changes`; tracker correct at `incorporation-and-company-structures`; page used tracker's category (consistent with C9 and rest of Bucket C). Same pattern observed on C8 brief (`property-tax-changes` again; page used tracker's category).
- C2 differentiated from existing Wave 6 IIP-architecture page (cannibal score 0.22, audit accepted at Stage 1b) via operational depth on s.49(1) IT transparency + s.225 PPR via trustees + s.72 CGT death uplift + TRS overlap + DoV-into-IPDI rescue + 4-route comparison; not a re-walk of the Wave 6 IIP page.
- C6 was Stage 1b replacement (original cladding pick at fictional FA 2003 s.58C). Replaced with depth on Sch 7 para 3 claw-back + para 5 connected-party recovery + 4-element SPA covenant pack; differentiated from existing higher-level group-relief page.
- All other 7 pages tracked the brief faithfully.

**Flags raised by Session C:** F-4 CROSS_BUCKET (C1→C2 forward-link unhyperlinked at C1 write time; resolved from C2 side at write; C1→C2 still pending wave-close back-patch).

**Discoveries logged:** 2 in Session C discovery log (D-1 EXISTING_PAGE_STALE on rotted TRS-territory competitor URL inventory; D-2 AUTHORITY_GAP on active TRSM80020 maintenance suggesting quarterly review cadence).

**Critical HP-lock discipline:** All 13 Wave 7 HP-lock drift catches per §16.45 + the additional Wave 7 catches (F-1 / F-3 / F-5 etc) respected through every page. No new statutory drift surfaced by Session C at write time; the §22.16 / §22.17 / §22.18 / §22.20 / §22.21 / §1.A through §1.G locks held verbatim.

**Discipline preserved:** Q&A / tracker / flags / discovery all written to main via absolute path per §16.15 + §16.37. Work-log fills on the brief files were completed at write time for C1 + C9; C2-C10 work-log fills deferred (low-priority audit-trail; can be batched into a single close commit if needed).

**Three sessions now in close range:**
- Session A: 9 of 9 done (final A1 same-slug rewrite shipped 2026-05-24 — [SESSION_A_COMPLETE] previously marked)
- Session B: 8 of 10 done as of last visible tracker state (B9, B10 still in pipeline)
- Session C: 9 of 9 done — [SESSION_C_COMPLETE] now marked

Wave 7 close pending Session B's final two pages plus the §16.32 cross-bucket back-patch sweep at merge.
