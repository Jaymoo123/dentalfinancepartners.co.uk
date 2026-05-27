# MegaWave 2 site-wide flags

**Created:** 2026-05-26. **Status:** Pre-launch, live drafting.

Flag types per NETNEW_PROGRAM §13.2: EXISTING_PAGE_STALE / BRIEF_DRIFT / INTERNAL_LINK / CROSS_BUCKET / REDIRECT / HOUSE_POSITION_EXTENSION / AUTHORITY_GAP.

Per-bucket F-number ranges (Bug #2 fix):
- Bucket A: F-1..F-49
- Bucket B: F-50..F-99
- Bucket C: F-100..F-149

Flags never block. Sessions continue work after flagging.

---

(Sessions append flags below this line. Manager closes via in-place edit + commit at wave-close step.)

---

## F-100 — HOUSE_POSITION_EXTENSION — Payroll cluster for property-business employers

**Raised by:** M2-C-B1 sub-agent (Stage 1, 2026-05-26).
**Bucket:** C (Payroll for property companies + Bookkeeping & accounting practices).
**Touched picks:** C1 `a-complete-guide-to-uk-payroll-taxes-and-deductions-for-employers`, C5 `ensuring-compliance-with-uk-payroll-reporting-regulations`, C7 `essential-guidelines-for-running-payroll-effectively` (pending later batch).

**Issue.** Payroll mechanics are not currently a locked house-position cluster. §3 covers MTD for ITSA only; §11.A covers Companies House ECCTA; §21 covers Ltd Co + FIC operational tax (CT, dividends, ER allowance edges, alphabet shares) but does NOT walk through PAYE / NIC / Apprenticeship Levy / auto-enrolment as employer duties; §27 covers HMRC enquiry mechanics generally. The Payroll-for-property-companies MW2 cluster has 3 picks (C1, C5, C7 — Payroll-cluster-tagged) that will write to no locked HP anchor without an extension.

**Proposed lock contents (Stage 1b conductor decision).** A new §33 "Payroll mechanics for property-business employers" cluster with:
- §33.1 Statutory architecture: ITEPA 2003 (Parts 2, 3, 4, 11) + SI 2003/2682 (PAYE Regulations, key regs 21, 67B, 67E, 67G, 73) + SSCBA 1992 Part 1 (NIC primary + secondary Class 1, Class 1A on BIK, Class 1B on PSAs) + FA 2016 ss.99-121 (Apprenticeship Levy) + Pensions Act 2008 (auto-enrolment).
- §33.2 Operative 2026/27 rate stack (PT, ST, UEL, EA £10,500, Apprenticeship Levy £15k allowance, AE 8% total). Rates by-reference per §16.27 discipline — sessions verify at write time against current HMRC publications, not against this lock.
- §33.3 Property-business specifics: (a) Employment Allowance single-director bar (LtdCo BTL with sole director-shareholder doesn't qualify); (b) Apprenticeship Levy connected-employer aggregation under FA 2016 s.101 for portfolio operators with multiple SPVs (the £3m + £15k allowance is shared across associated employers); (c) BIK touchpoints for landlord-employers (employer-provided live-in accommodation for property managers per ITEPA 2003 ss.97-113; pool-vehicle vs employer-provided-car for refurb foremen); (d) employment-vs-self-employment Ready Mixed Concrete line for on-call refurb labour and HMO property managers; (e) corporation-tax interaction (salary + employer NIC + AL are CT-deductible per CTA 2009 Part 3).
- §33.4 Do-not-write: "all LtdCos get the Employment Allowance" (single-director bar); "Apprenticeship Levy starts at £3m for each company" (connected-employer aggregation); "PAYE registration is automatic" (must be applied for before first payday); "RTI annual P35 is required" (P35 framework superseded by RTI from 2013/14).

**How to apply.** Stage 2 writers on C1 / C5 / C7 either thread to the locked §33 (if Stage 1b approves) OR self-source each statute citation per §16.35 (no locked HP fallback). HP-side cost of declining the lock: each of 3 payroll-cluster writers re-verifies the same 8-10 statutes independently with risk of drift between them. Recommend lock approval.

---

## F-101 — BRIEF_DRIFT (low priority, tracking only) — Wave 2 A10 brief s.117 erratum

**Raised by:** M2-C-B1 sub-agent (Stage 1, 2026-05-26).
**Bucket:** C (IHT and estate planning).
**Touched picks:** C2 `agricultural-relief-for-inheritance-tax-key-benefits` (this batch, cross-reference); Wave 2 A10 `agricultural-property-relief-mixed-estate-1m-cap` (already shipped — corrected at write time).

**Issue.** While drafting C2's statutory anchor, sub-agent WebFetched IHTA 1984 s.117 directly and confirmed the let-property minimum occupation period is **7 years**, not 5. The Wave 2 A10 brief (committed pre-Wave-2) stated the let period as 5 years; the A10 work log already records that the writer corrected the statute citation to 7 years at write time (D-18 in A10 work log). No action required; logging here for completeness so Stage 1b conductor can see the upstream brief-drift was self-corrected and the existing shipped page is correct.

**How to apply.** Stage 2 writers on C2 (and any future APR pick) can rely on the verified s.117 7-year-let / 2-year-owner-occupied figure. No HP-lock change required (HP §15.4 doesn't restate the occupation periods; §22.X.7 covers the Sch A1 extension only).

---

## F-1 — HOUSE_POSITION_EXTENSION — ECCTA 2023 Part 2 + Limited Partnerships Act 1907 reforms

**Raised by:** M2-A-B1 sub-agent (Stage 1, 2026-05-26) via the A3 `companies-house-changes-limited-partnership-requirements` seed. (File back-filled by M2-A-B2 sub-agent 2026-05-26 — M2-A-B1 referenced the flag but did not commit the file; back-fill consolidates flags from this branch.)
**Bucket:** A (Property partnership / LLP — A3 LP-specific compliance changes seed).
**Touched picks:** A3 `companies-house-changes-limited-partnership-requirements` (this seed); likely upstream-relevant for A7 `does-your-business-qualify-as-a-partnership` (taxonomy must distinguish LPA-1907 LP from LLPA-2000 LLP from PA-1890 general partnership, with current ECCTA-Part-2 compliance posture for LPs); A16 `partnership-partnership-agreement-roles-types-benefits` (where partnership-agreement vs LP-articles boundary needs locking); A18 `sole-trader-vs-partnership` (entity-choice page must include LP option with current compliance state).

**Issue.** §11 + §11.A in `house_positions.md` lock ECCTA 2023 **Part 1** (companies-side: ID verification, ACSP framework, registered email, lawful purposes, RoE via ECTEA 2022 cross-amendments). **Part 2** of ECCTA 2023 contains the LP reforms — bringing limited partnerships under LPA 1907 into a CA-2006-style regime (registered office, annual confirmation, GP ID verification, striking-off powers, information disclosure). Part 2 is NOT covered by §11.A. A3 (LP-compliance-changes page) writes against a Part 2 gap; multiple sibling picks touch LP territory and would benefit from a unified Part 2 lock.

**Proposed lock contents (Stage 1b conductor decision).** A new §11.B "ECCTA 2023 Part 2 — Limited Partnership reforms" mini-lock with:
- §11.B.1 ECCTA 2023 Part 2 section range + which Part 2 sections amend which LPA 1907 sections (verbatim section headings via WebFetch at lock time — env-blocked at M2-A-B1 attempt; conductor / Stage 1b reviewer to verify in their session).
- §11.B.2 Commencement chain for Part 2 provisions — which are in force as of writing, which in transition, which pending. (NOTE: Companies House operational rollout for LP reforms is phased and SI-controlled separately from companies-side rollout per §11.A.) Sessions verify at the campaign page per §11.A F-12 (`https://changestoukcompanylaw.campaign.gov.uk/`).
- §11.B.3 Operative new obligations for LPs: registered office (with appropriate-address rule mirroring §11 + ECCTA Part 1 s.28-30); annual confirmation (GPs + LPs + nature of business); GP ID verification routing through s.66 ACSP regime; striking-off powers; information-disclosure obligations.
- §11.B.4 GP ID-verification routing through the ACSP framework (§11.A.7 + §11.A.8). New + existing GPs must verify via ACSP per ECCTA Part 1 carryover rules.
- §11.B.5 RoE interaction (ECTEA 2022) where the LP holds UK property through an overseas-LP — the overseas entity must register under ECTEA RoE regime, and Companies House holds two registrations (RoE on the entity; LP register on the LP itself). Cross-reference §11.A on RoE / ECTEA 2022 for overseas-LP property holdings.
- §11.B.6 Property-LP-specific implications: property-fund LPs (English limited partnership widely used in real-estate fund finance); JV-development LPs; family-investment LPs holding tenanted property. Each faces material new compliance overlay.
- §11.B.7 Tax-side preservation: ECCTA Part 2 changes COMPLIANCE only — tax-transparency of LPs (ITTOIA 2005 Part 9, TCGA 1992 s.59) is unchanged.
- §11.B.8 Do-not-write: "LP-Act-1907 compliance is light-touch" (post-ECCTA, no longer true); "LP only files on changes" (annual confirmation now required); "LP has no registered office obligation" (it now does); "LP compliance is the same as LLP" (false; separate Acts, separate sub-regimes); "RoE doesn't apply to LPs" (false where overseas entities are GP/LP holding UK property — RoE applies to the entity).

**How to apply.** Stage 2 writers on A3 + (M2-A-B2) A7 / A10 hybrid-LLP thread to §11.B once locked. Without it, each writer self-sources ECCTA Part 2 statutory anchors independently with risk of drift. Recommend §11.B lock be drafted by Stage 1b reviewer in tandem with reviewing A3 / A7 / A16 / A18 seed framing.

---

## F-2 — HOUSE_POSITION_EXTENSION — Partnership statutory architecture (PA 1890 + ITTOIA 2005 Part 9 + TCGA 1992 s.59 + FA 2003 Sch 15)

**Raised by:** M2-A-B2 sub-agent (Stage 1, 2026-05-26) via the A7 `does-your-business-qualify-as-a-partnership` seed.
**Bucket:** A (Property partnership / LLP — partnership taxonomy / definitional layer).
**Touched picks:** A7 `does-your-business-qualify-as-a-partnership` (this seed); A3 `companies-house-changes-limited-partnership-requirements` (M2-A-B1 — LP-side overlap on partnership definition vs LP statute); A10 `hybrid-limited-liability-partnership` (this batch — LLP-with-corporate-member structure stands on the partnership taxonomy framework); A16 `partnership-partnership-agreement-roles-types-benefits` (later batch — agreement layer depends on PA 1890 defaults); A18 `sole-trader-vs-partnership` (later batch — entity-choice page); future MW2 Bucket A LLP picks (`llp-accounts`, `llp-and-taxation-benefits`).

**Issue.** The PA 1890 / ITTOIA 2005 Part 9 / TCGA 1992 s.59 / FA 2003 Sch 15 statutory architecture for partnerships is NOT currently locked in `house_positions.md`. §11 + §11.A cover Companies House ECCTA reforms (companies-side); F-1 above requests §11.B for ECCTA Part 2 LP reforms; §3 covers incorporation mechanics but not the prior question of partnership existence; §21 covers Ltd Co + FIC operational tax. **The base statute (PA 1890 s.1 + s.2 + s.14 + s.24), the tax-transparency framework (ITTOIA 2005 Part 9 ss.846-863), the CGT framework (TCGA 1992 s.59 + HMRC SP D12), and the SDLT-side architecture (FA 2003 Sch 15) all stand on no locked HP.** Five+ Bucket A picks will write against this gap.

**Proposed lock contents (Stage 1b conductor decision).** A new §11.C OR new §3.X "Partnership statutory architecture" mini-lock with:
- §11.C.1 PA 1890 s.1 four cumulative tests (two-plus persons + business + in common + with a view of profit).
- §11.C.2 PA 1890 s.2 negative tests — particularly s.2(1) joint property / co-ownership negative (LOAD-BEARING for property audiences; one of the most common landlord misframings).
- §11.C.3 PA 1890 s.2(3) profit-share prima-facie rule + six rebuttal heads.
- §11.C.4 HMRC operative guidance map: BIM72005-72165 (partnership identification), BIM72015 specifically (joint ownership of property), PIM1030 (jointly owned property), SDLTM33000+ (SDLT partnership Sch 15 mechanics), SP D12 (CGT statement of practice).
- §11.C.5 SA800 partnership return obligation under TMA 1970 s.12AA — the operative trigger.
- §11.C.6 ITTOIA 2005 Part 9 ss.846-863 partnership tax-transparency framework + ITA 2007 s.852 notional trade.
- §11.C.7 TCGA 1992 s.59 fractional interest framework + SP D12 introduction/withdrawal/share-rebasing/dissolution treatment.
- §11.C.8 FA 2003 Sch 15 partnership-SDLT regime — para 1 "business" definitional gate, para 10 incorporation relief sum-of-lower-proportions (SLP) mechanics. (Note: existing pages cover Sch 15 mechanics; lock holds the gating definitional layer + the operative reliefs.)
- §11.C.9 Distinguishing PA 1890 general partnership / LPA 1907 LP / LLPA 2000 LLP / CTA 2010 + CA 2006 limited company — entity-choice forks for property audiences.
- §11.C.10 Do-not-write: "joint ownership = partnership" (s.2(1) PA 1890 negative); "sharing gross returns = partnership" (s.2(2) negative); "SA800 is optional" (s.12AA mandates where partnership exists); "all partnerships get Sch 15 reliefs on incorporation" (para 1 business gate required); "civil partnership = business partnership" (CPA 2004 vs PA 1890 conflation — different concepts).

**How to apply.** Stage 2 writers on A7 (this seed) + future A16 / A18 / A10 hybrid-LLP / A14 / A15 LLP picks thread to §11.C once locked. If not locked by Stage 1b, each writer self-sources the same 8-10 PA/ITTOIA/TCGA/FA-2003-Sch-15 statutes + HMRC guidance independently — high drift risk across 5+ pages.

---

## F-3 — HOUSE_POSITION_EXTENSION — Multi-company group operation (CT group relief + SDLT group relief + dividend conduit + change-of-ownership loss restriction)

**Raised by:** M2-A-B2 sub-agent (Stage 1, 2026-05-26) via the A8 `eligible-groups-for-group-relief-under-uk-corporation-tax` seed.
**Bucket:** A (Limited company / BTL company operation — multi-company group operation extension).
**Touched picks:** A8 `eligible-groups-for-group-relief-under-uk-corporation-tax` (this seed); future MW2 Bucket A picks touching multi-SPV / portfolio-LtdCo territory (likely including A6 `corporation-tax-marginal-relief-uk-guide` — associated-company gating overlap with group operation though distinct legal test); existing pages covering CT group relief mechanics, SDLT group relief mechanics, group extraction mechanics, and change-of-ownership loss restrictions — currently spread across 4+ pages with no unifying HP anchor.

**Issue.** §21 currently locks single-SPV operation only (§21.1 DLA mechanics, §21.2 share-class architecture, §21.3 rent-charging, §21.4 salary-vs-dividends, §21.5 FIC mechanics — all single-entity). Multi-company group operation is unlocked despite multiple existing pages covering slices of it:
- CT group relief mechanics: existing `property-company-group-relief-corporation-tax` page.
- SDLT group relief: existing `sdlt-group-relief-for-corporate-landlord-portfolios` + `sdlt-group-relief-schedule-7-fa-2003-claw-back-connected-party-recovery-depth` (2 pages).
- Group extraction via dividend conduit: existing `multi-company-group-extraction-spv-holding-co-dividend-conduit-mechanics`.
- Change-of-ownership loss restriction: not currently a dedicated page; covered piecemeal.

The MW2 A8 seed (this batch) covers CT group-relief eligibility (the prior question to the mechanics page). Future MW2 picks may extend into associated-company territory (CTA 2010 s.18D-J for marginal relief gating — structurally similar but legally distinct from the 75% group test).

**Proposed lock contents (Stage 1b conductor decision).** A new §21.8 "Multi-company group operation" mini-lock with:
- §21.8.1 CT group relief 75% test (CTA 2010 s.131 + s.1154 + Sch 18 equity-holder overlay + s.156 worldwide-group); consortium relief (s.143+) limited to TRADING consortium-companies (property-investment JV LtdCos do NOT qualify; developer JVs may).
- §21.8.2 SDLT group relief 75% test (FA 2003 Sch 7 para 1) — STRUCTURALLY SIMILAR but legally distinct from CT 75% test; 3-year intra-group claw-back at Sch 7 para 3 (covered in existing depth page).
- §21.8.3 Dividend conduit through HoldCo: CTA 2009 Part 9A intra-group dividend exemption (s.931A+) — small-company exemption limited; large-company exemption broader; conditions for class-of-distribution exemption.
- §21.8.4 Associated-company gating for marginal relief (CTA 2010 s.18D-J post-FA 2021) — counts all associated companies (broader than 75% group; control test under s.450+) when allocating the £50k/£250k marginal relief thresholds. **Critical interaction:** group structuring decisions optimising group relief may dilute marginal relief thresholds across associated companies.
- §21.8.5 Change-of-ownership loss restriction (CTA 2010 Part 14 — s.673 + s.674 + s.676): operative when buying loss-making target SPVs. Pre-acquisition losses sterilised by s.673; post-acquisition losses restricted where major change in nature/conduct of trade per s.673 + s.674 + s.676.
- §21.8.6 Property-investment-vs-trading line for group purposes: UK property businesses are typically investment (CTA 2009 Part 4). Consortium relief unavailable to investment JVs. Trading-investment line at CTA 2010 s.1124-1126 + ITTOIA 2005 s.5 + extensive case-law (cross-link to existing pages).
- §21.8.7 Do not write: "100% ordinary share capital = automatic CT group relief" (Sch 18 overlay can disqualify); "CT and SDLT 75% tests are the same" (different regimes, different tests, different claw-back); "associated companies = 75% group" (associated-company test under s.450+ control test is broader); "consortium relief works for investment JVs" (trading-only); "intra-group dividends are always tax-free" (CTA 2009 s.931A+ class exemptions are conditional).

**How to apply.** Stage 2 writers on A8 (this seed) + future associated-company / group-structure pages thread to §21.8 once locked. If not locked by Stage 1b, each writer self-sources CTA 2010 Part 5 + Sch 18 + FA 2003 Sch 7 + CTA 2009 Part 9A + CTA 2010 s.18D-J + CTA 2010 Part 14 independently — high drift risk across 4-6+ pages, especially around the CT/SDLT 75%-test distinction and the consortium-relief trading-only gate.

---

## F-4 — HOUSE_POSITION_EXTENSION — Salaried member rules + post-BlueCrest HMRC PM276000+ guidance (LLP sub-regime)

**Raised by:** M2-A-B2 sub-agent (Stage 1, 2026-05-26) via the A11 `hmrcs-new-guidelines-for-llps-raise-concerns` seed.
**Bucket:** A (Property partnership / LLP — LLP policy-update sub-regime).
**Touched picks:** A11 `hmrcs-new-guidelines-for-llps-raise-concerns` (this seed); A10 `hybrid-limited-liability-partnership` (this batch — salaried-member rules apply to individual members of hybrid-LLPs but not corporate members); future MW2 Bucket A LLP picks (`llp-accounts`, `llp-and-taxation-benefits`); also relevant cross-pick to existing `llp-property-investment-worth-considering` (general LLP intro page that pre-dates BlueCrest — possible backpatch candidate).

**Issue.** The salaried-member rules (ITA 2007 s.863A-G) are not currently locked in `house_positions.md`. Post-BlueCrest narrowed Condition B reading + HMRC's 2025 PM276000+ guidance update raise the practical risk profile for property LLPs. Multiple Bucket A picks touch LLP territory and would benefit from a unified policy lock. Suggest the proposed §11.C partnership architecture mini-lock (under F-2) extend to include this sub-section, rather than create a separate top-level §11.D — the salaried-member regime is sub-architecture of the broader LLP framework.

**Proposed lock contents (Stage 1b conductor decision).** A §11.C.X "Salaried member rules + post-BlueCrest HMRC guidance" sub-section of the §11.C partnership architecture mini-lock (per F-2):
- §11.C.X.1 ITA 2007 s.863A-G regime architecture — three conjunctive Conditions (A: 80% disguised salary; B: lack of significant influence; C: capital < 25% of disguised salary).
- §11.C.X.2 BlueCrest Supreme Court [2024] UKSC 33 decision summary — Condition B "significant influence over the affairs of the partnership" does NOT require whole-LLP influence; influence over a significant part can be enough (against the FTT/UT reading; narrows safe harbour).
- §11.C.X.3 HMRC PM276000+ updated 2025 guidance — operative current text (Stage 2 verifies at write time). Narrower view of significant influence; matrix-silo'd member roles may not count.
- §11.C.X.4 Operative practical safe harbour: Condition C capital-contribution route (≥25% capital takes member OUT of regime). Easier to demonstrate than Condition B significant influence.
- §11.C.X.5 s.863G anti-avoidance overlay catches contrived Condition C arrangements (round-trip loans; sham contributions; capital at no real economic risk).
- §11.C.X.6 Operative consequence of reclassification: PAYE + secondary Class 1 NIC at LLP level (15% from 6 April 2026 per FA 2026 — verify rate) + Apprenticeship Levy (0.5% above £15k allowance) + late-payment-penalty regime + interest, all backdated.
- §11.C.X.7 Do not write: "Condition C requires 25% capital" (inverted — <25% IN, ≥25% OUT); "BlueCrest narrowed Condition B for everyone" (only narrowed the influence-over-the-whole-vs-part dimension); "salaried-member rules don't apply to property LLPs" (false — apply to all LLP business types regardless of trading/investment status); "BlueCrest was bad for taxpayers" (mixed — narrowed Condition B on one point; affirmed safe-harbour structure overall).

**How to apply.** Stage 2 writers on A11 (this seed) + A10 hybrid-LLP + future LLP picks thread to §11.C.X once locked. The current-events nature of the topic means periodic refresh likely required (per existing optimisation_engine cadence).

---

## F-5 — HOUSE_POSITION_EXTENSION — Mixed membership partnership rules + hybrid LLP architecture (ITA 2007 ss.850C-E)

**Raised by:** M2-A-B2 sub-agent (Stage 1, 2026-05-26) via the A10 `hybrid-limited-liability-partnership` seed.
**Bucket:** A (Property partnership / LLP — hybrid-LLP / corporate-member sub-regime).
**Touched picks:** A10 `hybrid-limited-liability-partnership` (this seed); A11 `hmrcs-new-guidelines-for-llps-raise-concerns` (this batch — salaried-member regime is sibling regime, distinct mechanics, can fire simultaneously on same LLP); A4 `corporate-tax-planning-strategies-for-uk-clients` (M2-A-B1 — pillar lever-map; hybrid LLP is one lever, mixed-membership trap must surface in lever discussion); future MW2 Bucket A LLP picks; possible cross-pick to existing `llp-property-investment-worth-considering` (general LLP intro — possible backpatch candidate).

**Issue.** The mixed-membership partnership rules at ITA 2007 ss.850C, 850D, 850E (FA 2014 origin) are not currently locked in `house_positions.md`. The rules systematically dismantle the income-splitting / profit-retention attraction of hybrid-LLP structures (corporate-member-with-individual-member setups). Multiple Bucket A picks touch hybrid-LLP territory and would benefit from a unified policy lock. Suggest the proposed §11.C partnership-architecture mini-lock (under F-2) extend to include this sub-section alongside the §11.C.X salaried-member sub-section (under F-4) — the two FA 2014 regimes (salaried-member targets individuals; mixed-membership targets corporates) are best locked together as the post-FA-2014 LLP anti-avoidance framework.

**Proposed lock contents (Stage 1b conductor decision).** A §11.C.Y "Mixed membership partnership rules + hybrid LLP architecture" sub-section of the §11.C partnership architecture mini-lock (per F-2):
- §11.C.Y.1 Hybrid LLP structure baseline: LLPA 2000 imposes no restriction on member type; corporates can be members; Companies House operates no separate hybrid classification.
- §11.C.Y.2 ITA 2007 s.850C-E mixed-membership regime architecture — three operative steps: (i) corporate member allocated profit share; (ii) "excess" test (corporate's share > arms-length commercial entitlement); (iii) "power to enjoy" test (individual member directly or indirectly able to benefit from corporate's allocated profits). All three steps required for reallocation.
- §11.C.Y.3 Reallocation mechanism: excess profits + power to enjoy → reattributed to individual member taxed at marginal rate, with double-tax credit for corporate's CT paid.
- §11.C.Y.4 HMRC PM236500-PM238000 operative guidance (Stage 2 verifies current at write time).
- §11.C.Y.5 Interaction with salaried-member rules (§11.C.X) — distinct regimes; mixed-membership targets corporate member; salaried-member targets individual member; both can fire on same LLP simultaneously.
- §11.C.Y.6 Residual legitimate hybrid-LLP uses surviving the regime: asset protection (where corporate's commercial entitlement is real); succession planning via FIC corporate member (cross-reference §21.5 + §22.6); external-investor inclusion (institutional/PE corporate member with no individual power-to-enjoy link).
- §11.C.Y.7 Do not write: "hybrid LLPs are illegal" (lawful under LLPA 2000); "mixed-membership rules apply to all hybrid LLPs" (only where excess + power to enjoy both met); "Section 24 is solved by a hybrid LLP" (mixed-membership rules systematically dismantle the income-splitting attraction for typical founder-LtdCo setups); "mixed-membership rules and salaried-member rules are the same thing" (different regimes, different targets); "double-tax credit makes reallocation neutral" (only partially — operational outcome is generally worse than the original structure intended).

**How to apply.** Stage 2 writers on A10 (this seed) + A4 pillar + future LLP picks thread to §11.C.Y once locked. The hybrid-LLP topic is heavily advisor-promoted in popular commentary and frequently misrepresented (income-splitting attraction is dominant frame; mixed-membership trap is under-surfaced). Locked HP holds the correct framing across all sub-agent / RUN sessions writing in this area.

---

## F-6 — HOUSE_POSITION_EXTENSION — LLP accounts + SORP + designated member framework (SI 2008/1911 + LLP SORP + FRS 102 Section 22 substance test)

**Raised by:** M2-A-B3 sub-agent (Stage 1, 2026-05-26) via the `llp-accounts` seed.
**Bucket:** A (Property partnership / LLP — LLP accounts-and-filing operational layer).
**Touched picks:** `llp-accounts` (this seed); `llp-and-taxation-benefits` (this batch — accounts-vs-tax demarcation; tax-side sibling references accounts-side classification of members' interests but does not restate); A10 `hybrid-limited-liability-partnership` (M2-A-B2 — accounts-side equity-vs-liability classification of hybrid-LLP members' interests has cascade implications for the mixed-membership analysis); A11 `hmrcs-new-guidelines-for-llps-raise-concerns` (M2-A-B2 — accounts-side classification interacts with salaried-member capital-contribution Condition C analysis); any future Bucket A LLP picks; possible cross-pick to existing `llp-property-investment-worth-considering` (general LLP entity-overview page — accounts-side architecture is the operational layer beneath it).

**Issue.** §11 + §11.A in `house_positions.md` lock companies-side ECCTA reforms (companies-side rollout). F-1 above requests §11.B for LP reforms (ECCTA Part 2). F-2 above requests §11.C for the broader partnership architecture (PA 1890 + ITTOIA 2005 Part 9 + TCGA 1992 s.59 + FA 2003 Sch 15). F-4 requests §11.C.X salaried-member sub-section. F-5 requests §11.C.Y mixed-membership sub-section. **The LLP accounts-side architecture (LLPA 2000 + SI 2008/1911 + LLP SORP + FRS 102 Section 22 substance test + designated member statutory responsibility) is the operational-accounts spine that sits parallel to the tax-side architecture and is also unlocked.** Multiple Bucket A picks touch the accounts-side dimension (equity-vs-liability classification of members' interests; SORP treatment of remuneration as expense vs appropriation; designated member responsibility framework) and would benefit from a unified lock.

**Proposed lock contents (Stage 1b conductor decision).** A §11.C.Z "LLP accounts + SORP + designated member framework" sub-section of the proposed §11.C partnership architecture mini-lock (per F-2), OR (if conductor prefers separate top-level mini-lock) §11.D "LLP accounts-and-filing operational architecture" mini-lock:
- §11.C.Z.1 LLPA 2000 + SI 2008/1911 statutory architecture — SI applies CA 2006 Part 15 + Part 16 to LLPs with modifications (Sch 1 + Sch 2 modifications); members' interests instead of share capital; designated members carry director-equivalent responsibility.
- §11.C.Z.2 LLP SORP — CCAB-published; 2025 revision current (Stage 2 verifies); operative GAAP overlay for LLP-specific accounting treatments.
- §11.C.Z.3 FRS 102 Section 22 (Liabilities and Equity) + LLP SORP application — equity-vs-liability substance test for members' interests; commonly liability where puttable on retirement or where contractual obligation to repay exists; cascade implications for balance-sheet presentation + members' remuneration treatment.
- §11.C.Z.4 Members' remuneration accounts split — expense vs appropriation; automatic-allocation per LLP agreement triggers expense; discretionary-allocation post-profit triggers appropriation; SORP-driven; independent of tax-side allocation per ITTOIA 2005 + s.863.
- §11.C.Z.5 "Loans and other debts due to members" — specific LLP balance-sheet line under SI 2008/1911 + LLP SORP.
- §11.C.Z.6 Designated members responsibility (LLPA 2000 ss.6-9 applied CA 2006 ss.451-453) — minimum 2 required; carry statutory accounts + filing responsibility with criminal + civil exposure for default.
- §11.C.Z.7 Audit exemption thresholds — small-LLP exemption per applied CA 2006 s.477 + s.479 (turnover ≤ £10.2m, balance sheet ≤ £5.1m, ≤ 50 employees in 2 of 3 — Stage 2 verifies post-uplift wording at write time per recent threshold-uplift policy); exemption denied where members holding ≥10% require audit per applied s.476; group consolidation trigger; regulated-sector LLPs ineligible.
- §11.C.Z.8 Filing windows — applied CA 2006 s.441 (9 months from end of accounting reference period; first accounts 21 months from incorporation); abridged accounts per applied s.444; filleted accounts per applied s.444A omitting P&L from public filing.
- §11.C.Z.9 Property-investment LLP fair-value-model accounts treatment — FRS 102 Section 16 commonly elected; NO LLP-level deferred tax (LLP tax-transparent); cleaner accounts presentation vs LtdCo Section 29 deferred-tax overhead.
- §11.C.Z.10 Post-ECCTA LLP-side operational overlay (cross-reference §11.B per F-1) — registered email + appropriate registered office + ID verification + ACSP framework for designated members; phased rollout separate from companies-side per LLP-side SI implementation.
- §11.C.Z.11 Do not write: "LLP accounts are the same as company accounts" (false — SI 2008/1911 modifications); "all members' interests are equity" (false — Section 22 substance test); "members' remuneration is always appropriation" (false — automatic allocation triggers expense); "audit exemption is automatic for small LLPs" (false — ≥10% members can require audit); "LLPs must use IFRS" (false — FRS 105 / FRS 102 commonly used); "FRS 102 fair-value gains trigger LLP-level deferred tax" (false — LLP tax-transparent); "designated members are honorific" (false — director-equivalent statutory responsibility).

**How to apply.** Stage 2 writers on this seed + A10 hybrid-LLP + A11 salaried-member + future LLP picks thread to §11.C.Z once locked. The LLP accounts architecture is statutorily distinct from companies-side and has SORP overlays that are easy to miss when accountants default to company templates. Locked HP holds the LLP-specificity across all sub-agent / RUN sessions writing in this area.

---

## F-50 — HOUSE_POSITION_EXTENSION — VAT artificial separation (Sch 1 para 2 directions) property-context floor

**Raised by:** M2-B-B1 sub-agent (Stage 1, 2026-05-26).
**Bucket:** B (slug clustered under FICs by slicer affinity, but topic actually crosses into property VAT territory — slicer-affinity artifact).
**Touched picks:** B3 `artificial-separation-and-vat-key-insights-from-cases` (this seed). Possibly upstream-relevant for any future FHL / serviced-accommodation / multi-SPV VAT page where the registration-threshold-management pattern recurs.

**Issue.** `house_positions.md` does NOT yet contain locked positions on VAT anti-disaggregation. The site carries several VAT-adjacent pages (`landlord-vat-registration-when-required`, `option-to-tax-vata-1994-schedule-10-commercial-property-20-year-lock`, `togc-vat-property-letting-business`, `landlord-vat-recovery-professional-fees-capital-costs-commercial-property`, `domestic-reverse-charge-construction-vat-landlords`, `diy-housebuilders-vat-refund-scheme`) but none addresses VATA 1994 Sch 1 paras 1A + 2 (single-taxable-person directions) or the artificial-separation pattern. B3 is a case-law-led entrant on the topic. Without an HP-lock for the property-context floor, Stage 2 writer self-sources every case + every property-business application angle, with drift risk against any future VAT-disaggregation sibling page.

**Proposed lock contents (Stage 1b conductor decision).** A new §29 (next free section number — confirm against current HP file) "VAT artificial separation — Sch 1 para 2 directions in property contexts" mini-lock with:
- §29.1 Statutory architecture: VATA 1994 Sch 1 para 1A (purpose) + Sch 1 para 2 (direction power); Sch 1 para 1(1) registration threshold (rate-by-reference per §16.27, currently £90,000 from 1 April 2024 per Spring Budget 2024); s.4 (taxable supply); s.94 (business); Sch 9 Group 1 (exempt residential lettings boundary); Sch 10 (option to tax).
- §29.2 Three-link test (financial / economic / organisational) — operational standard from successive FTT decisions + HMRC VAT Notice 700/1 + VBNB / V1-28 internal guidance. Substance-over-form discipline.
- §29.3 Property-business application: (a) FHL / short-stay accommodation post-FHL-income-tax-abolition (8 December 2023 Budget retained 20% rating for short-stay accommodation; VAT registration threshold continues to bite where aggregated FHL turnover crosses); (b) serviced accommodation; (c) multi-SPV portfolio operators with parallel management LLPs; (d) the residential-letting carve-out — pure exempt income outside Sch 1 para 2 reach; mixed standard-rated services pull part of the business back in.
- §29.4 Effective-date discipline: Sch 1 para 2 directions are prospective ONLY (cannot retro-impose registration on past supplies). Appeal under VATA 1994 s.83 does not stay the direction unless tribunal orders.
- §29.5 Leading-case map (WebFetched + verbatim-verified, Stage 1b reviewer-supplied — sub-agent flagged candidate names in B3 brief with strict-verification gate per §16.35 + §16.36; conductor populates the verified case list at Stage 1b sign-off).
- §29.6 Do-not-write: "HMRC can retro-tax past supplies under Sch 1 para 2" (false, prospective only); "residential lettings can never trigger Sch 1 para 2" (false where mixed standard-rated services are charged); "spouse co-ownership alone shows artificial separation" (false, financial+economic+organisational links collectively required); "HMRC gives clearance on separated structures" (no formal route).

**How to apply.** Stage 2 writer for B3 either threads to the locked §29 (if Stage 1b approves) OR self-sources each statute citation + each case-law verification per §16.35 + §16.36 strict gate (no locked HP fallback). HP-side cost of declining the lock: a topic with active case-law churn and a high case-citation count gets no shared verification floor; future VAT-disaggregation pages (if commissioned) duplicate the verification work.

---

## F-51 — HOUSE_POSITION_EXTENSION — Construction Industry Scheme (CIS) property-context floor

**Raised by:** M2-B-B1 sub-agent (Stage 1, 2026-05-26).
**Bucket:** B (slug clustered under FICs by slicer affinity, but topic is property-business CIS compliance — slicer-affinity artifact).
**Touched picks:** B4 `beginners-guide-to-cis-verification-in-the-uk` (this seed). Possibly upstream-relevant for any future property-developer-compliance page, REIT-capex page, BTL-refurb-cost page, or HMO-capex-management page where the deemed-contractor threshold or verification mechanic touches.

**Issue.** `house_positions.md` does NOT yet contain locked positions on the Construction Industry Scheme (FA 2004 Part 3). The site carries one CIS-adjacent page only — `domestic-reverse-charge-construction-vat-landlords` (the parallel VAT-side reverse-charge regime, distinct from CIS income-tax withholding). No locked HP on CIS architecture, deemed-contractor threshold, verification process, withholding rates, residential-landlord-individual carve-out, or property-developer/property-investment-company in-scope position. B4 is a beginner-tier entrant. Without an HP-lock for the property-context floor, Stage 2 writer self-sources every statute + every threshold + every property-business application angle; future CIS-touching pages would re-do the verification work.

**Proposed lock contents (Stage 1b conductor decision).** A new §30 (next free section number — confirm against current HP file) "Construction Industry Scheme (FA 2004 Part 3) — property-business context floor" mini-lock with:
- §30.1 Statutory architecture: FA 2004 Part 3 (ss.57-77), with operative anchors at s.62 (deduction obligation), s.63 (registration for gross payment or for payment under deduction), s.64 (gross-payment registration tests — turnover / compliance / business), s.66 (cancellation of registration), s.69 (verification of subcontractor registration status), s.70 + ss.71-72 (returns + records). SI 2005/2045 (Income Tax (Construction Industry Scheme) Regulations 2005) as the operational implementation.
- §30.2 In-scope categorisation for property businesses: (a) **property developers** — mainstream contractor under FA 2004 s.59(1)(k), always in scope when paying subcontractors for construction operations; (b) **property-investment companies + large landlord groups** — **deemed contractors** under FA 2004 s.59(1)(l) + Sch 11A once average annual construction-related spend crosses the **deemed-contractor £3 million rolling-12-month threshold** under FA 2021 reforms in force 6 April 2021 (rate-by-reference per §16.27; verify against current SI at write); (c) **REITs / property funds / HMO operators with capex programmes** — same deemed-contractor logic; (d) **pure-residential individual landlords (not businesses)** — OUT of scope as contractors. Stage 2 sub-agent verifies the precise individual-vs-business boundary at HMRC CIS Manual + Sch 11A wording at write per §16.35.
- §30.3 Verification process (FA 2004 s.69 + SI 2005/2045): contractor obtains subcontractor identifiers; HMRC system returns one of three statuses (gross-payment / registered-for-deduction / unregistered); HMRC issues verification reference (typically valid 2 tax years for that contractor-subcontractor relationship); contractor applies correct withholding rate.
- §30.4 Withholding rates (FA 2004 s.62 + s.61(2) + SI 2005/2045 reg 6): gross-payment = 0%; registered-for-deduction = 20% of labour element; unregistered = 30% of labour element. Materials portion excluded from deduction base.
- §30.5 Returns + penalties (FA 2004 s.70 + SI 2005/2045 + FA 2009 Sch 55/56): monthly CIS300 return required even if no payments (nil-return rule); late-filing penalty exposure on nil-returns is a common operational trap; under-deduction penalty exposure where contractor pays without verifying.
- §30.6 Interaction with VAT domestic reverse charge for construction (sibling page `domestic-reverse-charge-construction-vat-landlords`): CIS = income-tax withholding on subcontractor labour. Reverse charge = VAT-side regime where customer accounts for VAT. Both trigger simultaneously on the same payment but operate on different bases.
- §30.7 Do-not-write: "all landlords need to register for CIS" (false — pure-residential individual landlords are not contractors); "CIS only applies to property developers" (false — deemed-contractor threshold pulls in property-investment companies with high capex); "verification is a one-off step per subcontractor" (false — typically valid 2 tax years; re-verify when window expires or relationship lapses then resumes); "you don't need to file CIS returns in months with no payments" (false — monthly nil-return required); "CIS deduction is on the full payment" (false — labour element only, materials excluded under s.61(2) + SI reg 6).

**How to apply.** Stage 2 writer for B4 either threads to the locked §30 (if Stage 1b approves) OR self-sources statute + SI + HMRC CIS Manual verifications per §16.35 (no locked HP fallback). Recommend lock approval given the high likelihood of future CIS-touching pages and the operational sensitivity of the £3m threshold + verification process (Stage 2 drift catches across writers would be expensive to back-patch).

---

## F-52 — HOUSE_POSITION_EXTENSION — Landlord allowable expenses + home office CGT-trap operational floor

**Raised by:** M2-B-B1 sub-agent (Stage 1, 2026-05-26).
**Bucket:** B (slug clustered under FICs by slicer affinity, but topic is individual-landlord income-tax mechanics — slicer-affinity artifact).
**Touched picks:** B5 `claim-home-office-deduction-landlords` (this seed). Upstream-relevant for the existing `landlord-expenses-allowable-uk-2026` pillar page (briefly covers home office at simplified-flat-rate £10/month example only, does not surface the CGT trap) and for any future expense-deep-dive page (motor expenses for landlords, training costs, professional fees, capital-vs-revenue boundary).

**Issue.** `house_positions.md` covers §4 (Section 24 finance-cost restriction) and §3 (MTD for ITSA) but does NOT contain a locked position on landlord-allowable-expenses generally — neither the deduction architecture (ITTOIA 2005 s.272 import path of trading rules into property businesses) nor specific expense types (home office; motor; training; professional fees; capital-vs-revenue). The site has one shipped pillar page on allowable expenses but no HP-lock floor.

The B5 home-office deep-dive surfaces a **specific cross-tax trap** (TCGA 1992 s.224(1) PPR business-use restriction triggered by claiming actual-cost apportionment with exclusive-business-use room characterisation) that is NOT covered on the existing pillar page and that is a material drift risk: a Stage 2 writer or a future expense-deep-dive writer could quietly recommend the actual-cost route to a reader who would then lose 14% of their PPR exemption on home sale, costing tens of thousands.

**Proposed lock contents (Stage 1b conductor decision).** A new §31 (next free section number — confirm against current HP file) "Landlord allowable expenses operational floor (with home-office cross-tax trap)" mini-lock with:
- §31.1 Statutory architecture: ITTOIA 2005 s.271 (property business charge); s.271E (GAAP calculation); **s.272 (Application of trading income rules: GAAP — the operative import gateway)**; s.34 (wholly-and-exclusively, imported); s.94H (simplified expenses, imported). HMRC PIM section anchors (Property Income Manual).
- §31.2 Home-office two-route choice + CGT-trap: (a) ITTOIA s.94H simplified flat-rate (hours-based, no exclusive-use requirement, no CGT downside); (b) ITTOIA s.34 actual-cost apportionment (potentially higher deduction but exclusive-business-use characterisation triggers TCGA 1992 s.224(1) PPR restriction on disposal); decision-tree framing for which to choose by portfolio size + home-business-use intensity; documented mixed-use as the avoidance route.
- §31.3 Cross-tax discipline: where an income-tax claim characterises a fact (e.g. "this room is used exclusively for the property business"), the same characterisation flows through to CGT, IHT, and HMRC enquiry. Writers must surface cross-tax consequences before recommending route choices.
- §31.4 Ltd Co-landlord home-office mechanic: ITEPA 2003 ss.316A-317 (employer-provided home-working allowance £6/week / £312/year) vs formal home-office rental between director and company (CTA 2009 s.54 + ITTOIA s.272 + director's individual-side ITTOIA s.272/s.94H/s.34 + TCGA s.224(1) on director's PPR).
- §31.5 Do-not-write: "the simplified £10/month always wins" (false — actual-cost can be higher; depends on home-business-use intensity); "actual-cost apportionment doesn't affect PPR" (false — exclusive-business-use room characterisation triggers s.224(1)); "Ltd Co director can claim home-office on the corporation tax side directly without involving the director's personal tax" (false — must route through ITEPA s.316A-317 allowance OR formal rental — both have personal-side mechanics).

**How to apply.** Stage 2 writer for B5 either threads to the locked §31 (if Stage 1b approves) OR self-sources statute + HMRC PIM + TCGA s.224(1) verifications per §16.35 (no locked HP fallback). HP-side cost of declining the lock: cross-tax-trap exposure on a high-traffic landlord topic with material consumer-protection consequences (lost PPR on home sale); future expense-deep-dive writers re-source the same architecture each time.

---
