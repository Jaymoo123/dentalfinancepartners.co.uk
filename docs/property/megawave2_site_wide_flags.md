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

## F-1 — HOUSE_POSITION_EXTENSION — ECCTA 2023 Part 2 + Limited Partnerships Act 1907 reforms

**Raised by:** M2-A-B1 sub-agent (Stage 1, 2026-05-26) via the A3 `companies-house-changes-limited-partnership-requirements` seed. (File back-filled by M2-A-B2 sub-agent 2026-05-26 — M2-A-B1 referenced the flag but did not commit the file; back-fill consolidates flags from this branch.)
**Bucket:** A (Property partnership / LLP — A3 LP-specific compliance changes seed).
**Touched picks:** A3 `companies-house-changes-limited-partnership-requirements` (this seed); likely upstream-relevant for A7 `does-your-business-qualify-as-a-partnership` (taxonomy must distinguish LPA-1907 LP from LLPA-2000 LLP from PA-1890 general partnership, with current ECCTA-Part-2 compliance posture for LPs); A16 `partnership-partnership-agreement-roles-types-benefits` (where partnership-agreement vs LP-articles boundary needs locking); A18 `sole-trader-vs-partnership` (entity-choice page must include LP option with current compliance state).

**Issue.** §11 + §11.A in `house_positions.md` lock ECCTA 2023 **Part 1** (companies-side: ID verification, ACSP framework, registered email, lawful purposes, RoE via ECTEA 2022 cross-amendments). **Part 2** of ECCTA 2023 contains the LP reforms — bringing limited partnerships under LPA 1907 into a CA-2006-style regime (registered office, annual confirmation, GP ID verification, striking-off powers, information disclosure). Part 2 is NOT covered by §11.A. A3 (LP-compliance-changes page) writes against a Part 2 gap; multiple sibling picks touch LP territory and would benefit from a unified Part 2 lock.

**Proposed lock contents (Stage 1b conductor decision).** A new §11.B "ECCTA 2023 Part 2 — Limited Partnership reforms" mini-lock with:
- §11.B.1 ECCTA 2023 Part 2 section range + which Part 2 sections amend which LPA 1907 sections (verbatim section headings via WebFetch at lock time — env-blocked at M2-A-B1 attempt; conductor / Stage 1b reviewer to verify in their session).
- §11.B.2 Commencement chain for Part 2 provisions — which are in force as of writing, which in transition, which pending. (NOTE: Companies House operational rollout for LP reforms is phased and SI-controlled separately from companies-side rollout per §11.A.) Sessions verify at the campaign page per §11.A F-12 (`https://changestoukcompanylaw.campaign.gov.uk/`).
- §11.B.3 RoE interaction (ECTEA 2022) where the LP holds UK property through an overseas-LP — the overseas entity must register under ECTEA RoE regime, and Companies House holds two registrations (RoE on the entity; LP register on the LP itself).
- §11.B.4 GP ID-verification routing through the ACSP framework (§11.A.7 + §11.A.8). New + existing GPs must verify via ACSP per ECCTA Part 1 carryover rules.
- §11.B.5 Tax-side preservation: ECCTA Part 2 changes COMPLIANCE only — tax-transparency of LPs (ITTOIA 2005 Part 9, TCGA 1992 s.59) is unchanged.
- §11.B.6 Do not write: "LPs are still light-touch" (false post-ECCTA Part 2); "LP compliance is the same as LLP" (false; separate Acts, separate sub-regimes); "RoE doesn't apply to LPs" (false where overseas entities are GP/LP holding UK property — RoE applies to the entity).

**How to apply.** Stage 2 writers on A3 + (this batch) A7 / A10 hybrid-LLP thread to §11.B once locked; if not locked by Stage 1b, each writer self-sources ECCTA Part 2 statutory anchors independently with risk of drift.

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
