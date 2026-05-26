# MegaWave 2 site-wide flags

**Created:** 2026-05-26. **Status:** Pre-launch (no flags yet).

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

**Raised by:** M2-A-B1 sub-agent (Stage 1, 2026-05-26).
**Bucket:** A (Property partnership / LLP).
**Touched picks:** A3 `companies-house-changes-limited-partnership-requirements` (this seed); likely upstream-relevant for A7 `does-your-business-qualify-as-a-partnership` (taxonomy must distinguish LPA-1907 LP from LLPA-2000 LLP from partnership-1890 general partnership, with current ECCTA-Part-2 compliance posture for LPs); A16 `partnership-partnership-agreement-roles-types-benefits` (where partnership-agreement vs LP-articles boundary needs locking); A18 `sole-trader-vs-partnership` (entity-choice page must include LP option with current compliance state).

**Issue.** §11 + §11.A in `house_positions.md` lock ECCTA 2023 **Part 1** (companies-side: ID verification, ACSP framework, registered email, lawful purposes, RoE via ECTEA 2022 cross-amendments). **Part 2** of ECCTA 2023 contains the LP reforms — bringing limited partnerships under LPA 1907 into a CA-2006-style regime (registered office, annual confirmation, GP ID verification, striking-off powers, information disclosure). Part 2 is NOT covered by §11.A. A3 (LP-compliance-changes page) writes against a Part 2 gap; multiple sibling picks touch LP territory and would benefit from a unified Part 2 lock.

**Proposed lock contents (Stage 1b conductor decision).** A new §11.B "ECCTA 2023 Part 2 — Limited Partnership reforms" mini-lock with:
- §11.B.1 ECCTA 2023 Part 2 section range + which Part 2 sections amend which LPA 1907 sections (verbatim section headings via WebFetch at lock time — env-blocked here; conductor / Stage 1b reviewer to verify in their session).
- §11.B.2 Commencement chain for Part 2 provisions — which are in force as of writing, which in transition, which pending. (NOTE: Companies House operational rollout for LP reforms is phased and SI-controlled separately from companies-side rollout per §11.A.) Sessions verify at the campaign page per §11.A F-12 (`https://changestoukcompanylaw.campaign.gov.uk/`).
- §11.B.3 Operative new obligations for LPs: registered office (with appropriate-address rule mirroring §11 + ECCTA Part 1 s.28-30); annual confirmation (GPs + LPs + nature of business); GP ID verification routing through s.66 ACSP regime; striking-off powers; information-disclosure obligations.
- §11.B.4 Property-LP-specific implications: property-fund LPs (English limited partnership widely used in real-estate fund finance); JV-development LPs; family-investment LPs holding tenanted property. Each faces material new compliance overlay.
- §11.B.5 Cross-reference with §11.A on RoE / ECTEA 2022 for overseas-LP property holdings.
- §11.B.6 Do-not-write: "LP-Act-1907 compliance is light-touch" (post-ECCTA, no longer true); "LP only files on changes" (annual confirmation now required); "LP has no registered office obligation" (it now does).

**How to apply.** Stage 2 writer for A3 will need this lock to write to a coherent statutory anchor. Without it, A3 writes against best-effort gov.uk + Companies House campaign-page sourcing per §16.35 — feasible but with drift risk against future LP-touching pages. Recommend §11.B lock be drafted by Stage 1b reviewer in tandem with reviewing A3 / A7 / A16 / A18 seed framing.

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


