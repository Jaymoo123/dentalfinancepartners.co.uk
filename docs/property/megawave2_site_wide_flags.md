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
