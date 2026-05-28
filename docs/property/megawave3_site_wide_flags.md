# MegaWave 3 site-wide flags

**Created:** 2026-05-27. **Status:** Pre-launch (no flags yet).

Flag types per NETNEW_PROGRAM §13.2: EXISTING_PAGE_STALE / BRIEF_DRIFT / INTERNAL_LINK / CROSS_BUCKET / REDIRECT / HOUSE_POSITION_EXTENSION / AUTHORITY_GAP.

Per-bucket F-number ranges (Bug #2 fix):
- Bucket A: F-1..F-49
- Bucket B: F-50..F-99
- Bucket C: F-100..F-149

Flags never block. Sessions continue work after flagging.

---

(Sessions append flags below this line. Manager closes via in-place edit + commit at wave-close step.)

---

## F-100 — HOUSE_POSITION_EXTENSION (Bucket C, Sub-Agent M3-C-B1)

**Raised:** 2026-05-27 during C1 seed (`3m-mortgage-fraud-convicts-accountant-and-financial-adviser`).

**Issue:** Bucket C carries several picks that touch the professional-conduct / anti-money-laundering statutory cordon around property accountants (POCA 2002 ss.327-330, MLR 2017 SI 2017/692 regs 8/18/19/27/28/33, Fraud Act 2006 s.2). The current house_positions.md has no dedicated §-numbered lock for this cluster — §27 (HMRC enquiry mechanics) is the closest existing frame but is civil-enquiry-focused, not criminal-prosecution / AML-floor focused.

**Bucket C picks that touch this floor:** C1 (`3m-mortgage-fraud-convicts-accountant-and-financial-adviser`), C17 (`change-landlord-accountants` — fit-and-proper-test framing), potentially C16 (`case-laws` — depending on the case-law selection).

**Recommendation:** If two or more of those Bucket C picks survive Stage 1b drift triage and proceed to Stage 2, propose a §36 ("Professional conduct of property accountants — POCA + MLR 2017 + Fraud Act 2006 floor") HP-lock for the Stage 1b session to scope. C1 seed proceeds with the §27 frame and inline statutory citations; not blocking.

**Status:** open, informational. Manager triages at Stage 1b.

**RESOLUTION (2026-05-27, manager Stage 1b sign-off):** §36 HP-lock added to house_positions.md ("Professional conduct of property accountants"). Captures POCA 2002 ss.327-330 + MLR 2017 SI 2017/692 + Fraud Act 2006 s.2 + property-context use cases. **F-100 CLOSED.**

---

## F-1 — EXISTING_PAGE_STALE / BRIEF_DRIFT (Bucket A, Sub-Agent M3-A-B1)

**Raised:** 2026-05-27 during A5 seed (`corporation-tax-deadlines-and-penalties`).

**Issue:** FA 1998 Schedule 18 paragraph 17 (CT return late-filing flat-rate penalty) verbatim-verified live at legislation.gov.uk on 2026-05-27 reads: para 17(2)(a) **£200** if return delivered within 3 months after filing date; (b) **£400** in any other case. Para 17(3) (third successive failure): **£1000 / £2000**. These differ from the widely-cited historical figures £100 / £200 / £500 / £1000 that may appear in pre-existing site content (any older guides on CT penalties, accountant-services pillar pages, or earlier Stage-2 briefs). Source: WebFetch verbatim against `https://www.legislation.gov.uk/ukpga/1998/36/schedule/18/paragraph/17` 2026-05-27.

**Pages potentially affected:** any existing site page or queued MW3 pick citing flat-rate CT late-filing penalty figures (in this bucket: A5 already uses verified figures; A13 `late-filing-and-late-payment-penalties` MUST cite the verified £200/£400 figures, not £100/£200 historical). Pre-existing pillar pages and any earlier-wave briefs referencing CT late-filing should be back-patch swept.

**Recommendation:** Manager-direct site-wide STALE sweep at Stage 1b (per §16.43-style mechanical pattern this is a per-occurrence text swap, not a judgment call). Also: extend §27 or open §27.10 micro-lock pinning the verified CT late-filing penalty figures alongside the existing Sch 24 / Sch 41 / Sch 55 / Sch 56 architecture, so Stage-2 sub-agents do not re-introduce the stale figures from training data.

**Status:** open, requires Stage 1b decision + back-patch sweep. A5 seed flagged Stage 2 to re-verify at write time per §16.35.

**RESOLUTION (2026-05-27, manager Stage 1b sign-off):** §19.20 HP-lock added pinning verified FA 1998 Sch 18 para 17 figures (£200/£400 + £1,000/£2,000 third successive). Manager WebFetch-verified verbatim 2026-05-27. Site-wide STALE sweep DEFERRED to post-Stage-1b commit. **F-1 LOCKED + back-patch scheduled.**

---

## F-101 — HOUSE_POSITION_EXTENSION (Bucket C, Sub-Agent M3-C-B1)

**Raised:** 2026-05-27 during C6 seed (`anti-avoidance-rules-share-exchanges-and-reorganisations`).

**Issue:** Share-exchange + reconstruction reliefs and the parallel transactions-in-securities anti-avoidance regimes are not currently locked at any HP section. The applicable statutory cluster spans:
- TCGA 1992 s.127 (equation of original shares and new holding)
- TCGA 1992 s.135 (exchange of securities for those in another company) — verified verbatim 2026-05-27
- TCGA 1992 s.136 (reconstruction involving issue of securities)
- TCGA 1992 s.137 (anti-avoidance gate — main-purpose test) — verified verbatim 2026-05-27; current text reflects FA 2026 s.37(4)(b) substitution of subsections (1)-(1C)
- TCGA 1992 s.138 (advance clearance procedure) — verified verbatim 2026-05-27
- TCGA 1992 s.139 (reconstruction involving transfer of business)
- ITA 2007 Part 13 Chapter 1 (ss.682-713) (income-tax-side transactions in securities, with s.701 income-tax clearance route) — chapter contents verified 2026-05-27
- CTA 2010 Part 15 (ss.731-751) (corporation-tax-side transactions in securities, with s.748 clearance route)

**Bucket C picks touching this floor:** C6 (this seed), potentially C16 (`case-laws` — depending on case-law selection; *Brebner* / *Cleary* / *Joiner* / *Snell* lines are foundational to this cluster).

**Recommendation:** Stage 1b should scope a §37 HP-lock ("Share-exchange + reconstruction reliefs + transactions-in-securities anti-avoidance") capturing: the three reliefs (s.127 + s.135 + s.136 + s.139); the anti-avoidance gate (s.137 with the post-FA-2026 wording); the three parallel clearance routes (TCGA s.138 / ITA 2007 s.701 / CTA 2010 s.748); the foundational case-law line (*Brebner*, *Cleary*, *Mytravel*, *Joiner*, *Snell*); the property-context use cases (parent holdco insertion, portfolio merger, FIC reorganisation, demerger). C6 seed carries inline citations and proceeds without the lock; the lock would prevent future drift at Stage 2 / RUN.

**Status:** open, informational. Manager triages at Stage 1b. Not blocking C6.

**RESOLUTION (2026-05-27, manager Stage 1b sign-off):** §37 HP-lock added to house_positions.md ("Share-exchange + reconstruction reliefs + transactions-in-securities anti-avoidance"). Captures TCGA 1992 s.127/135/136/137/138/139 + ITA 2007 Pt 13 Ch 1 + CTA 2010 Pt 15 architecture + foundational case-law line (*Brebner*, *Cleary*, *Joiner*, *Snell*, *MyTravel*) + property-context use cases. s.137 wording locked at the post-FA-2026 substituted (1)-(1C) text. F-101 CLOSED.


---

## F-3 — HOUSE_POSITION_EXTENSION + BRIEF_DRIFT (back-patch sweep) (Bucket A, Sub-Agent M3-A-B4)

**Raised:** 2026-05-27 during A19 seed (`mtd-made-simple-for-landlords-with-jointly-owned-properties`) per-write statute verification (§16.35).

**Issue:** The Wave 3 §19 MTD ITSA architecture (§19.1 through §19.17 across Wave 3 + Wave 4 extensions) anchors throughout on **SI 2021/1076 (Income Tax (Digital Requirements) Regulations 2021)** as the operative MTD instrument. Verified verbatim at write time 2026-05-27 against legislation.gov.uk: **SI 2021/1076 was revoked on 1 April 2026** by **SI 2026/336 (Income Tax (Digital Obligations) Regulations 2026)**. The substantive mechanics carry over but regulation numbers have migrated:

| Topic | OLD (SI 2021/1076, revoked) | NEW (SI 2026/336, in force) |
|---|---|---|
| Qualifying income | reg 20 | **reg 25** |
| Qualifying amount / threshold | (implicit) | **reg 27** |
| Exclusion notice / digital-exclusion exemption | reg 20 | **reg 18** |
| Meaning of "excluded" (digitally excluded or s.46-identity-verification carve-out) | (implicit) | **reg 20** |
| Three-tax-year income-exemption exit rule | reg 22 | **reg 24** |
| Election not to be exempt (voluntary opt-in) | reg 23 | (verify Stage 1b) |
| Non-resident company exemption | reg 24 | (verify Stage 1b) |
| Trustee exemption | reg 25 | (verify Stage 1b) |

**Crucially: the prior MW3 Bucket A seed `what-is-qualifying-income-for-mtd` (A18, committed under M3-A-B3) cites "SI 2021/1076 reg 20" as the qualifying-income definition.** Verified at write time 2026-05-27 this is now WRONG on two axes: (a) SI 2021/1076 is revoked; (b) the qualifying-income definition is at reg 25 (NOT reg 20) of the new SI 2026/336 — reg 20 of the NEW SI is "Meaning of 'excluded'" (the digitally-excluded definition cross-referencing TMA 1970 Sch A1 para 14(2)). This is a substantive drift catch with material citation implications for any page citing SI 2021/1076 reg 20 as the qualifying-income source.

**Pages potentially affected:**
- All previously-committed MW3 Bucket A MTD seeds: A6 (`government-to-implement-mtd-for-it-with-lower-threshold`), A7 (`heres-how-you-can-exit-mtd-if-your-income-falls`), A11 (`how-making-tax-digital-affects-limited-companies`), A16 (`making-tax-digital-major-self-assessment-overhaul-ahead`), A18 (`what-is-qualifying-income-for-mtd`).
- This batch's seeds A19 + A20 already cite SI 2026/336 with the verified new regulation numbers and reference the migration; not at risk.
- Any pre-existing site pages on MTD citing SI 2021/1076 — back-patch sweep.

**Recommendation:** Stage 1b should:
1. Update §19 HP architecture (Wave 3 §19.1-§19.9 lock + Wave 4 §19.10-§19.17 lock + Wave 5 §24 cross-references) to migrate citations from SI 2021/1076 to SI 2026/336 with the new regulation numbers. Add a §19.18 "SI migration log" sub-section documenting the 1.4.2026 revocation + replacement.
2. Back-patch sweep on previously-committed MW3 Bucket A MTD seeds (A6/A7/A11/A16/A18) and any pre-existing site pages on MTD citing SI 2021/1076. Pattern is mechanical text swap from "SI 2021/1076 reg X" to "SI 2026/336 reg Y" per the migration table; manager-direct per §16.43 (judgment call only for A18 where reg-20 is wrong on TWO axes — needs reg-25 substitution AND the historical-context discussion needs re-checking).
3. Stage 2 + RUN going forward MUST cite SI 2026/336 with verified regulation numbers; the SI 2021/1076 reference is appropriate only in historical / migration-context discussion.

**Secondary watchpoint:** the points-based late submission regime (FA 2021 Sch 24) was verified at write time 2026-05-27 via HMRC's "Penalties for late submission" policy paper. Per that paper: points reset for quarterly filers requires (a) 12-month compliance period AND (b) all submissions due within the preceding 24 months to have been made — a dual-condition test. §19.7 currently states "Points reset after 24 months of full compliance" — minor framing refinement opportunity to surface the dual-condition test explicitly. Not material to A20 seed correctness; flagged for Stage 1b consideration.

**Status:** open, requires Stage 1b decision + back-patch sweep. A19 + A20 seeds in this batch carry the verified new SI 2026/336 citations and reference the migration; not blocking.

**RESOLUTION (2026-05-27, manager Stage 1b sign-off):** §19.18 HP-lock added documenting SI 2021/1076 → SI 2026/336 migration. Manager WebFetch-verified verbatim 2026-05-27 (page header confirms "(revoked)"). §19.19 added on points-based regime dual-condition reset. Back-patch sweep DEFERRED. **F-3 LOCKED + back-patch scheduled.**

---

## F-102 — BRIEF_DRIFT (cannibalisation watch) (Bucket C, Sub-Agent M3-C-B1)

**Raised:** 2026-05-27 during C4 + C5 seeds (`air-bnb-and-post-covid`, `airbnb-landlords`).

**Issue:** Bucket C picks C4 and C5 sit in a five-page serviced-accommodation cluster already on site (`airbnb-tax-uk-short-term-rental-income-taxed`, `serviced-accommodation-bpr-eligibility-pawson-test`, `serviced-accommodation-tax-fhl-abolition-april-2025`, `serviced-accommodation-vs-buy-to-let-tax-comparison-2026`, `toms-vat-serviced-accommodation`). C4 was seeded as the temporal-narrative retrospective; C5 was seeded as the operational handbook synthesis. Both are clearly differentiated from the existing five mechanic-deep-dive pages at Stage 1, but the differentiator depends on Stage 2 + RUN holding the line — if either page collapses to a mechanics-re-walk shape, cannibalisation will bite hard (six near-identical Airbnb pages in the index).

**Recommendation:** Stage 2 sub-agent + RUN session both check the framing-differentiator section of each seed before submission. If C4's temporal-narrative voicing or C5's operational-handbook synthesis has drifted toward generic mechanics, RUN escalates BRIEF_DRIFT at the gate and Stage 2 is re-run on the affected page. Sibling cluster page `booking-com-a-complete-guide-for-the-hosts` (C11, M3-C-B2) carries the same cannib watch — if the Stage 1 seed for C11 mirrors the C5 operational-handbook frame, the differentiator collapses further.

**Status:** open, monitoring. Stage 2 + RUN responsibility.

**RESOLUTION (2026-05-27, manager Stage 1b sign-off):** Held as monitoring flag — Stage 2 + RUN sub-agents check framing-differentiator at each gate. Not a HP issue. **F-102 ACKNOWLEDGED.**

---

## F-103 — HOUSE_POSITION_EXTENSION (Bucket C, Sub-Agent M3-C-B4)

**Raised:** 2026-05-27 during C20 seed (`commonhold-and-leasehold-reform-bill`).

**Issue:** Bucket C pick C20 lands on the live legislative pipeline for the forthcoming Commonhold and Leasehold Reform Bill (announced King's Speech 2024 → Commonhold White Paper published 3 March 2025 → Bill not yet introduced to Parliament as of 2026-05-27). The current §31 cluster (LRA 1967 + LRHUDA 1993 + LFRA 2024 architecture, pre-locked MW1 extension 2026-05-26) covers the in-force leasehold-reform regime up to LFRA 2024. It does NOT hold the forthcoming Bill pipeline + commonhold conversion treatment + ground-rent-reform-for-existing-leases policy floor + forfeiture-reform policy floor + service-charge-transparency-reform policy floor + commonhold-conversion-tax-treatment (SDLT / CGT / IHT) policy floor.

**Existing in-force anchors verified at write time:**
- Commonhold and Leasehold Reform Act 2002 Part 1 (commonhold framework ss.1-70) + Part 2 (leasehold reform ss.71-179) — verified at https://www.legislation.gov.uk/ukpga/2002/15/contents 2026-05-27 with post-LFRA-2024 + post-BSA-2022 amendment list noted
- Leasehold Reform (Ground Rent) Act 2022 (c. 1) — in force 30 June 2022 + 1 April 2023
- Building Safety Act 2022 ss.116-125 + Sch 8 (§26.2 pre-locked) — in force 28 June 2022 with LFRA 2024 amendments commenced via SI 2024/1018 effective 31 October 2024
- Leasehold and Freehold Reform Act 2024 (§31.3 pre-locked) — phased commencement 2024-2027
- Commonhold White Paper published 3 March 2025 (verified live at gov.uk 2026-05-27)

**Bucket C picks touching this floor:** C20 (this seed). Future net-new picks (Wave 4+) covering commonhold conversion + leasehold-reform Bill updates + service-charge transparency reforms + forfeiture reform + existing-lease ground-rent buyout will draw on this cluster.

**Recommendation:** Stage 1b should scope a §31.B HP-lock "Commonhold White Paper 2025 + Commonhold and Leasehold Reform Bill (forthcoming) — live pipeline floor for future pages" capturing: (a) the White Paper March 2025 proposals (default-commonhold for new flats + service-charge transparency + forfeiture reform + ground-rent reform for existing leases + commonhold conversion pathway + RTM simplification + buildings-insurance commission restriction); (b) the live Bill pipeline tracker with §16.35 strict-gate verification commitment for future pages; (c) the operational unresolved tax-treatment questions on commonhold conversion (SDLT — no specific FA 2003 provision currently; CGT — TCGA 1992 s.22 part-disposal trajectory; IHT — IHTA 1984 commonhold unit-holder interest treatment); (d) the cross-jurisdictional carve-out (Welsh Government parallel intentions + Scottish jurisdictional separation); (e) the investment-impact framing for landlord-side pages (freehold-of-leasehold-block investors + long-leasehold-flat holders + mixed-tenure BTL portfolios + managing-agent businesses). C20 seed proceeds with inline citations + verified live-status framing + §31 cluster cross-references; not blocking.

**Status:** open, informational. Manager triages at Stage 1b.

**RESOLUTION (2026-05-27, manager Stage 1b sign-off):** §31.B HP-lock added (Commonhold White Paper 2025 + forthcoming Bill live-pipeline floor). Per-write verification gate baked in. **F-103 CLOSED.**

---

## F-2 — HOUSE_POSITION_EXTENSION (Bucket A, Sub-Agent M3-A-B2)

**Raised:** 2026-05-27 during A8 seed (`hmrcs-loan-charge-settling-disguised-remuneration-schemes`).

**Issue:** The Bucket A LPC/voluntary-disclosure cluster contains a non-LPC limb — disguised-remuneration loan-charge settlement — that touches a statutory architecture not currently locked at any HP section. The applicable statutory cluster:
- Finance (No.2) Act 2017 Schedule 11 (loan charge on outstanding 5 April 2019 balances) — verified verbatim 2026-05-27 at https://www.legislation.gov.uk/ukpga/2017/32/schedule/11
- ITEPA 2003 Part 7A (ss.554A-554Z21, disguised remuneration head-rule) — verified verbatim 2026-05-27 at https://www.legislation.gov.uk/ukpga/2003/1/part/7A (in force as of 27 May 2026 per legislation.gov.uk currency note)
- Finance Act 2020 Schedule 2 (Morse-review amendments: 9 December 2010 cut-off, pre-2016 disclosed-but-unactioned carve-out, PAYE-instalment deferral route, double-charge denial)
- HMRC Settlement Opportunity (administrative practice, not statutory regime; published in successive iterations 2017-2020)

**Bucket A picks touching this floor:** A8 (this seed). No other current MW3 picks directly land on disguised-remuneration; A13 (`late-filing-and-late-payment-penalties`) is general TMA/Sch 24/Sch 41 architecture and does not require the loan-charge anchor. Possible future net-new picks (Wave 10+) could draw on this cluster if EBT / contractor-loan / remuneration-trust angles are slotted in.

**Recommendation:** Stage 1b should scope a §27.10 HP-lock ("Disguised remuneration loan charge + settlement framework") capturing: the FA (No.2) 2017 Sch 11 5-April-2019 crystallisation mechanic; the FA 2020 Sch 2 Morse-amendments (verbatim cut-off date and carve-out scope); the ITEPA 2003 Part 7A head-rule architecture; the HMRC Settlement Opportunity terms (administrative, not statutory); the boundary disciplines vs §21.1 CTA 2010 s.455-464A close-company loans regime + §27.5 CoP9 / CDF + §27.6 LPC/WDF; the controlling case-law line (*Rangers* [2017] UKSC 45, *Hargreaves* [2022] UKUT 34, *Hoey* [2022] EWCA Civ 656). A8 seed proceeds with inline citations and the §27 + §27.5 + §27.6 cross-references; not blocking.

**Status:** open, informational. Manager triages at Stage 1b.

**RESOLUTION (2026-05-27, manager Stage 1b sign-off):** §27.10 HP-lock added (Disguised remuneration loan charge + settlement framework). Captures FA(No.2) 2017 Sch 11 + ITEPA 2003 Pt 7A + FA 2020 Sch 2 Morse + case-law. **F-2 CLOSED.**

---

## F-104 — BRIEF_DRIFT (SI title mis-citation) (Bucket C, Sub-Agent M3-C-B1 Stage 2)

**Raised:** 2026-05-27 during Stage 2 verification of C4 (`air-bnb-and-post-covid`) seed.

**Issue:** Stage 1 seed for C4 cited SI 2023/817 as "International Tax Compliance (Amendment) Regulations 2023" (described as the UK DAC7-equivalent platform-reporting instrument). Stage 2 WebFetch of `https://www.legislation.gov.uk/uksi/2023/817/contents` on 2026-05-27 returned the correct title: **"The Platform Operators (Due Diligence and Reporting Requirements) Regulations 2023"**. The SI number is correct; the title was wrong. This is the operative UK instrument implementing OECD Model Reporting Rules for Digital Platforms (the DAC7-equivalent for the UK following Brexit, since DAC7 is an EU instrument).

**Scope of drift:** Stage 2 corrected the citation in the C4 brief in-place. Pick 5 (`airbnb-landlords`) also references SI 2023/817 in the same incorrect framing — Stage 2 will apply the same correction to the C5 brief. No existing on-site Property pages cite this SI by title (confirmed via Stage 2 spot grep against `Property/web/content/blog/*.md` for "International Tax Compliance (Amendment) Regulations" — zero hits as of 2026-05-27).

**Recommendation:** RUN session re-verifies the SI title at write time; corrected title used in all body prose. No HP-lock candidate raised (the SI itself is a procedural reporting instrument, not a statutory floor needing a §X lock).

**Status:** open. Stage 2 + RUN responsibility. Will close at manager Stage 2b sign-off.

**RESOLUTION (2026-05-28, manager Stage 2b sign-off):** Verbatim verification at `https://www.legislation.gov.uk/uksi/2023/817/contents` confirmed canonical title = **"The Platform Operators (Due Diligence and Reporting Requirements) Regulations 2023"**. Stage 2 sub-agent applied the in-brief correction to C4 + C5; manager Stage 2b sweep extended the correction to C11 (M3-C-B2 missed both drift catches entirely) — fixed at the Statutory anchor block, body item 7, Stage 2 research target list, FAQ Q6, anti-templating Specific-over-generic block, and Stage 2 work-log. On-site pre-existing-content grep `Property/web/content/blog/*.md` for the stale title returned **zero hits** as of 2026-05-28 — no post-merge sweep required. **F-104 CLOSED.**

---

## F-105 — BRIEF_DRIFT (LURA 2023 section mis-citation, second-home council-tax premium) (Bucket C, Sub-Agent M3-C-B1 Stage 2)

**Raised:** 2026-05-27 during Stage 2 verification of C4 (`air-bnb-and-post-covid`) seed.

**Issue:** Stage 1 seed for C4 cited "LURA 2023 s.81 inserting Local Government Finance Act 1992 s.11C" as the statutory anchor for the up-to-100% council-tax premium on second homes from 1 April 2025. Stage 2 WebFetch of legislation.gov.uk on 2026-05-27 confirmed:

- **LURA 2023 s.79 "Long-term empty dwellings: England"** — amends LGFA 1992 **s.11B** (long-term empty premium).
- **LURA 2023 s.80 "Dwellings occupied periodically: England"** — amends LGFA 1992 to permit billing authorities to charge up to 100% premium on dwellings where "(a) there is no resident of the dwelling, and (b) the dwelling is substantially furnished". **This is the correct anchor for the second-home / periodically-occupied dwelling premium.**
- **LURA 2023 s.81 "Alteration of street names: England"** — unrelated to council tax.

So the seed cited the wrong section (s.81 should be s.80) AND the wrong LGFA target section (s.11C should be the s.80-amendment-target sections of LGFA 1992 — Stage 2 deferred mapping the exact LGFA s.11B / s.11C / s.11D landing point to RUN-time verification).

**Scope of drift:** Stage 2 corrected the citation in the C4 brief in-place to "LURA 2023 s.80 amending LGFA 1992 (s.11B / s.11C / s.11D — verify at write)". Pick 5 (`airbnb-landlords`) also references LURA 2023 s.81 + LGFA 1992 s.11C in the same incorrect framing — Stage 2 applies the same correction to the C5 brief.

**Pre-existing content scan (Stage 2 spot grep against `Property/web/content/blog/*.md` for "LURA 2023 s.81" + "LGFA 1992 s.11C"):** Stage 2 deferred the full sweep — RUN session and post-merge cleanup batch verify whether existing pre-MW3 Property pages carry the same drift and need a back-patch under §16.43 sub-agent dispatch pattern.

**Recommendation:** (a) RUN session uses the corrected LURA 2023 s.80 anchor + verifies the LGFA 1992 amendment target section at write time. (b) Post-merge cleanup batch greps existing Property content for "LURA 2023 s.81" / "Levelling-up and Regeneration Act 2023 section 81" / "LGFA 1992 s.11C" and back-patches via sub-agent dispatch per §16.43 if hits surface.

**Status:** open. Stage 2 + RUN responsibility. Site-wide back-patch deferred to post-merge cleanup.

**RESOLUTION (2026-05-28, manager Stage 2b sign-off):** Verbatim verification at `https://www.legislation.gov.uk/ukpga/2023/55/section/80` confirmed: **LURA 2023 s.80 "Dwellings occupied periodically: England"** inserts LGFA 1992 **s.11C** "Higher amount for dwellings occupied periodically: England" + **s.11D** "Section 11C: regulations" (Secretary-of-State regulations-making power for excepted classes). LGFA 1992 s.11C in force 26 October 2023; s.11C(3) one-year notice rule means earliest LA implementation 1 April 2024 (FY 2024/25) for LAs that determined in 2023, with most tourism-area LAs first imposing the premium from 1 April 2025 (FY 2025/26). §30.4 HP-lock refined accordingly with the s.11C(2) verbatim "no resident" + "substantially furnished" two-condition test, the s.11D regulations gate, and the statutory-floor-vs-common-adoption-date distinction. Manager Stage 2b sweep corrected C4 + C5 + C11 briefs (C4 + C5 had residual stale citations Stage 2 missed; C11 was untouched by Stage 2). On-site pre-existing-content grep against `Property/web/content/blog/*.md` for "LURA 2023 s.81" + "Levelling-up and Regeneration Act 2023 section 81": **zero hits** — no back-patch sweep required. The single existing on-site reference to LGFA 1992 s.11C (in `single-person-council-tax-discount.md`) is correct per WebFetch verification. **F-105 CLOSED.**

---
