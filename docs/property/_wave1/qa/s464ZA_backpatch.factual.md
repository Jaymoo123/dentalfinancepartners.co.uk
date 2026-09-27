# Adversarial factual check: s.464ZA back-patch

Date: 2026-09-27. Scope: the 34-edit back-patch moving ss.464C/464D to s.464ZA.
Primary target: `Property/web/content/blog/directors-loan-repayment-bed-and-breakfast-trap-s464c-s464d.md`.
Verified against legislation.gov.uk at write time, plus `docs/property/house_positions.md` and `docs/contractors-ir35/house_positions.md` §14.

## Verdict

**Back-patched position CONFIRMED CORRECT.** Ten defects found in the target post, all fixed in place. The other patched posts carry the s.464ZA position correctly.

## 1. The position, verified verbatim

legislation.gov.uk/ukpga/2010/4/section/464ZA, annotation: *"inserted (30.10.2024) by Finance Act 2025 (c. 8), s. 81(3)(a)(4)"*. FA 2025 s.81(3)(b) omits Chapter 3B of Part 10 CTA 2010 (the ss.464C/464D chapter); s.81(4) treats the s.81(3) amendments as coming into force on 30 October 2024. Every element of the stated position checks out:

| Claim | Status |
|---|---|
| ss.464C/464D omitted from 30 Oct 2024 by FA 2025 s.81(3)(b),(4) | CORRECT |
| Re-enacted as s.464ZA by s.81(3)(a) | CORRECT |
| s.464ZA(1): repayment £5,000+ within 30 days of new chargeable payments £5,000+, in a later accounting period | CORRECT |
| s.464ZA(3): £15,000+ outstanding immediately before repayment plus arrangements at the time for replacement borrowing £5,000+ | CORRECT |
| s.464ZA(7) Treasury order power over the s.(1)/(3) sums | CORRECT |
| s.464A still in force | CORRECT (verified; inserted FA 2013 Sch 30 para 5, charge tracks ITA 2007 s.8(2)) |

Two things the posts did not carry, now added to the target:
- **s.464ZB** ("Section 464ZA: supplementary") was inserted by the same s.81(3)(a). Naming only s.464ZA is incomplete.
- **s.464ZA(6)** disapplies the whole section where the repayment itself gives rise to an income tax charge on the participator. This is load-bearing: it is why the dividend-clearance pattern is outside both limbs.

Mechanic nuance: s.464ZA does not "disregard" a repayment. It **re-matches** it against the later chargeable payment, leaving the original advance outstanding. Same outcome, but the post's gloss was reworded so the scenario arithmetic follows from the statute.

## 2. Defects found and fixed in the target post

| # | Grade | Defect | Fix |
|---|---|---|---|
| 1 | **WRONG (rate band)** | Scenario A charged £80,000 × 35.75% = £28,600 on a loan drawn **1 February 2026**, i.e. before 6 April 2026. | Recomputed at 33.75% = **£27,000**, with the 35.75% figure retained as the contrast case. |
| 2 | **WRONG (logic)** | Scenario A said s.464ZA(1) caught the redraw. The premise is that the cheque never cleared, so there was **no repayment** for s.464ZA(1) to operate on. | Paragraph rewritten: assignment/novation is the route; the 30-day limb is framed as the counterfactual had the cheque cleared. |
| 3 | **WRONG (arithmetic)** | Scenario B: "approximately £62,000 of s.455 across the three cycles", and it attributed 33.75% to "the cycles falling before 6 April 2026" when only the first advance predates the change. | Recomputed: £20,250 (1 Mar 2026 @ 33.75%) + £21,450 + £21,450 (Nov 2027, Nov 2028 @ 35.75%) = **£63,150**. |
| 4 | **WRONG (internal inconsistency)** | Scenario B drew **£55,000** on the redraw but charged s.455 "on the original £60,000 for each cycle". | Redraw set to £60,000, making it a clean three-cycle £60,000 pattern. |
| 5 | **WRONG (dates)** | "two months before the 9-month s.455 trigger": 1 Sep 2027 to the 1 Oct 2027 trigger is **one month**. | Corrected to one month; accounting-period chain spelled out. |
| 6 | **WRONG (dates)** | "ten weeks after the repayment": 1 Sep to 1 Nov is 61 days, about **nine weeks**. | Corrected to about nine weeks (3 places). |
| 7 | **WRONG (citation)** | Loan write-off cited as **CTA 2010 s.415**. The participator charge on release/write-off is **ITTOIA 2005 s.415**. | Citation and link corrected; charge correctly placed on the participator. |
| 8 | **WRONG (citation)** | Credit-DLA interest said deductible "under CTA 2009 s.54". s.54 is a **disallowance** provision (expenses not wholly and exclusively for trade). | Replaced with the non-trading loan relationship debit under CTA 2009 Part 5. |
| 9 | **STALE (incomplete)** | s.458 relief described as simply "refundable", in three places, with no mention of the deferral. **s.458(5)** bars relief before 9 months from the end of the accounting period of the repayment. Contractors house position §14 requires this to be stated. | Deferral added in the body, the FAQ and Pattern 3; s.458(3) four-year claim window added. |
| 10 | **STALE (threshold)** | Material interest given as "5% or more". **CTA 2010 s.457** is "**more than** 5%". | Corrected, with the s.457 citation and link added. |

Scenario B's repeat pattern ("Across the next three years the same pattern repeats") implied four cycles against a three-cycle total; reworded to "repeats twice more". The anachronistic "Before 30 October 2024 the same cycles were caught by s.464D" (the cycles run 2027-2030) was reframed as a counterfactual.

## 3. Assertions checked and passed

- 9 months and one day after the accounting period end as the s.455 trigger: correct throughout. 31 March year-end giving a 1 January trigger: arithmetically correct.
- s.455 rate by reference to ITA 2007 s.8(2), substituted to 35.75% by FA 2026 s.4(1)(b): matches `house_positions.md` line 1185/1207 and contractors §14.
- Dividend rates 10.75% / 35.75% / 39.35% from 6 April 2026: matches house position line 1206.
- s.464A charge computed at the dividend upper rate on the value of the benefit, inserted FA 2013 Sch 30, effective 20 March 2013, not omitted by FA 2025: correct.
- s.456(2) £15,000 small-loan exception conditions (amount, full-time work, no material interest): correct.
- CTM61605 (assignment/novation) and CTM61500 anchors: correct.
- metaTitle / metaDescription rate framing: consistent with the corrected body.
- No em-dashes. YAML valid, 13 FAQs. `dateModified` held at 2026-09-27.

## 4. The other patched posts, s.464ZA sentences only

Fourteen files carry the patch. All graded **CORRECT** on the s.464ZA position: the omission of ss.464C/464D from 30 October 2024, the re-enactment at s.464ZA, and the two limbs with their £5,000 / £15,000 / £5,000 thresholds and the absence of a 30-day window on the second limb.

Three carry an **incomplete but not wrong** statement of the 30-day limb, omitting the s.464ZA(1)(b) condition that the new chargeable payments fall in a **later accounting period**. Left as-is (summary-level mentions, outside the brief to edit):

- `generalist/web/content/blog/directors-loan-account-explained.md` lines 32, 39, 85
- `generalist/web/content/blog/uk-tax-brackets.md` line 304
- `generalist/web/content/blog/what-is-a-balance-sheet-uk-sme.md` line 257

Two further notes:

- `Property/web/content/blog/limited-companies-and-btl-properties.md` line 28 glosses s.464A as "(extraction-via-LLP-arrangement)". s.464A is a general arrangements charge, not LLP-specific. Over-narrow, not false in its context.
- `generalist/web/content/blog/accounting-for-service-charges-uk-guide-2025-26.md` contains no s.464 sentence; nothing to grade.
- `Property/web/content/blog/employee-ownership-trust-eot-property-spv-exit-mechanics-tcga-1992-s236.md` uses the omission correctly as supporting detail for the separate ss.464M-Q correction. Consistent with house position line 1951.

No commit made.
