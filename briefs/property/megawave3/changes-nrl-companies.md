---
slug: changes-nrl-companies
category: non-resident-landlord-tax
intent: A non-resident company landlord (offshore-incorporated entity holding UK BTL, commercial, or mixed-use property — Jersey / Guernsey / Isle of Man / BVI / Cayman / Luxembourg SOPARFI / Delaware LLC / etc), their UK letting agent, their accountant, or an adviser to such a landlord needs the canonical "what changed for non-resident company landlords from 6 April 2020" page. The change was structural: FA 2019 Schedule 5 moved UK property income of non-resident companies from income tax (under the NRL scheme + ITTOIA 2005 Part 3) to **corporation tax** (CTA 2009 s.5 + Part 4). The NRL scheme withholding continues at 20%, but the credit is now set against CT rather than IT — and the corporate regime imports a stack of CT-specific rules previously irrelevant to non-resident-corporate landlords: Corporate Interest Restriction (TIOPA 2010 Part 10, £2m group threshold), loan relationships (CTA 2009 Part 5), hybrid mismatch (TIOPA 2010 Part 6A), CT loss restriction (CTA 2010 Part 7ZA), group relief (CTA 2010 Part 5). The page is the practitioner's "what changed and what does it mean" map, NOT a generic NRL-scheme orientation (that page already exists at `non-resident-landlord-scheme-uk-complete-guide`).
---

# Changes for non-resident company landlords: the 6 April 2020 corporation-tax transition, what FA 2019 Sch 5 actually did, and the CT-regime stack now imported

## Statutory anchor
- **Primary (the operative repeal-and-insertion vehicle):**
  - **Finance Act 2019 Schedule 5** "Non-UK resident companies carrying on UK property businesses etc." (verified at legislation.gov.uk 2026-05-27 architecture map).
    - **Paragraph 35** — commencement: "This Schedule comes into force on 6 April 2020 ('the commencement date')." This is the operative cliff-edge date.
    - **Paragraphs 1-5** — amendments to CTA 2009 s.5 (territorial scope of CT charge). New s.5(6) defines "other UK property income" to include rent from concerns within s.39(4) ITTOIA 2005, electric-line wayleaves, and post-cessation receipts — bringing all of these within CT scope for non-resident companies from 6 April 2020.
    - **Paragraph 8** — omits **ITTOIA 2005 s.362** (which previously charged non-resident companies' UK property income to income tax). Post-commencement, the IT charge no longer reaches non-resident corporate landlords for UK property income.
    - **Paragraphs 29-31** — technical CTA 2010 amendments (currency conversion + group relief provisions extended to non-UK-resident companies in the property regime).
    - **Paragraph 36** — straddling-period rule: accounting periods spanning 6 April 2020 are artificially split into a pre-6-April IT segment and a post-6-April CT segment. Critical operational mechanic at transition time; less relevant now but Stage 2 must walk for legacy-period queries.
    - **Paragraph 37** — pre-commencement loss carry-forward: unrelieved IT losses from pre-6-April periods carry forward into post-6-April CT periods.
    - **Paragraphs 39-44** — derivative contract loss / fair value asymmetries at transition (relevant for non-resident companies holding swap / hedging positions over the commencement date).
- **Primary (the CT charge that now applies):**
  - **CTA 2009 s.5** "Territorial scope of charge" — extended by FA 2019 Sch 5 paras 1-5. Non-UK-resident companies are within CT for UK property business profits (s.5(2)(a) UK property business definition cross-refers to CTA 2009 s.205) and other UK property income (s.5(6) new sub-section).
  - **CTA 2009 Part 4 (ss.202-291)** "Property income" — the operative CT property-income regime. Non-resident corporate landlords now compute UK property profits under the CT property-income rules at Part 4 (commercial-letting profits, rent-receivable basis, allowable expenses, capital-vs-revenue distinctions consistent with the CT regime).
- **Primary (the CT-regime stack now imported):**
  - **TIOPA 2010 Part 10 (ss.372-486)** — Corporate Interest Restriction (CIR). £2m de minimis group net-interest-expense threshold. Above threshold, group is restricted to fixed-ratio (30% of group EBITDA) or group-ratio rule. Non-resident corporate landlords with significant intra-group debt now face CIR scrutiny on interest deductions — a major change from the previous IT regime which had no CIR analogue.
  - **CTA 2009 Part 5 (ss.292-476)** — Loan relationships. UK-source interest paid by a non-resident corporate landlord is taxed as part of a CT loan relationship; the deductibility, fair value adjustments, and connected-party rules apply.
  - **TIOPA 2010 Part 6A (ss.259A-259NK)** — Hybrid mismatch rules. Where the corporate landlord sits in a hybrid structure (e.g. US-LLC checking-the-box, Luxembourg double-Lux, etc.), the hybrid mismatch counteraction may deny deductions or impose a deemed receipt. Non-resident corporate landlords with hybrid characteristics imported significant complexity at the 2020 transition.
  - **CTA 2010 Part 7ZA (ss.269ZA-269ZZB)** — CT loss-relief restriction. Companies (UK and non-resident in CT scope) face a £5m annual deductions allowance plus 50% restriction above that, on carried-forward losses (FA 2017 origin). Non-resident corporate landlords with large historic IT losses (carried forward under FA 2019 Sch 5 para 37) are now subject to this restriction in CT.
  - **CTA 2010 Part 5 (ss.97-188)** — Group relief. Group-relief mechanics now apply to non-resident corporate landlords where the relevant group conditions are met (75% ownership). FA 2019 Sch 5 paras 29-31 extend the operative group-relief provisions to the non-resident-corporate landlord context.
  - **CT rate** — currently **25% main rate** (FY2023 onwards) for profits >£250,000; **19% small profits rate** for profits <£50,000; marginal relief between. Many non-resident corporate landlords are at the 25% main rate due to portfolio scale; a minority of single-property holders may sit in the marginal-relief band. Stage 2 verifies the current CT rate structure against gov.uk at write time.
- **Primary (the NRL withholding mechanic that continues):**
  - **NRL scheme** — operative under HMRC's NRL1 / NRL2 / NRL3 / NRL6 architecture (HP §17.5 + §10). Tenants and letting agents must withhold **20% basic rate** on rent paid to non-resident landlords (including non-resident corporate landlords), unless the landlord holds an NRL1 approval to receive rent gross. Post-6-April-2020, the withholding mechanic continues unchanged, BUT the credit is set against the corporate landlord's **CT liability** rather than IT. The mismatch is administrative but creates payment-cycle friction: 20% IT-rate withheld vs 25% CT-rate due means the company has a shortfall to top up at CT-payment time; conversely, in marginal-relief years, the 20% withholding may exceed the CT liability and create a repayment claim.
- **Primary (the NRCGT regime that pre-dated and continues):**
  - **TCGA 1992 s.1A + Schs 1A / 1B / 4AA** — non-resident CGT regime (HP §17.4). For non-resident corporate landlords, UK property disposals continue to be within NRCGT (extended to non-residential and indirect disposals from 6 April 2019). The FA 2019 NRCGT extension and the FA 2019 Sch 5 CT-on-property-income transition are SEPARATE but contemporaneous reforms — sessions must not conflate them.
- **House position reference:** **§10 (DTAs general framing — NRL scheme is statutory, not treaty)**, §16 (DTAs Wave 2 extension), §17 (Leaving the UK / expat — locked framing), **§17.4 (NRCGT — TCGA 1992 s.1A + Schs 1A / 1B / 4AA architecture)**, **§17.5 (NRL scheme operational mechanics — NRL1/NRL2/NRL3/NRL6)**, §11 (RoE for overseas-corporate landlords — a parallel transparency regime), §11.A (ECCTA / ECTEA statutory anchor map). Potential new HP-lock candidate: **§17.X "FA 2019 Sch 5 transition + CT-regime stack import"** — Stage 2 raises if site-wide drift surfaces.

## Framing differentiator (anti-templating, anti-cannibalisation)

This page is the **non-resident-company-specific change page** — the page that answers "what changed for non-resident COMPANY landlords on 6 April 2020 and what does it mean operationally". It is NOT a generic NRL-scheme orientation page (the site already has `non-resident-landlord-scheme-uk-complete-guide` for that). It is NOT a generic CT-rate page. It is the **transition-specific + corporate-regime-stack-import page** for non-resident corporate landlords.

The framing differentiator is the **before/after architecture map**:

1. **Pre-6-April-2020 architecture (legacy regime).** Non-resident company landlord: NRL scheme withholding at 20% by tenant/agent → 20% credit against IT charge on UK property income under ITTOIA 2005 s.362 → IT self-assessment via SA800 (partnership) or SA700 (non-resident company income return). Corporate tax regime did NOT apply to the property income; the company was outside the CT charge for that income stream.
2. **Post-6-April-2020 architecture (current regime).** Non-resident company landlord: NRL scheme withholding at 20% by tenant/agent CONTINUES → but 20% credit now set against CT charge under CTA 2009 s.5 + Part 4 → CT600 corporate-tax return + CT payment regime + UTR (Unique Taxpayer Reference) issued for CT registration.
3. **What the CT-regime stack import means in practice.**
   - **CIR (TIOPA 2010 Part 10)**: a non-resident BVI company with £3m of UK rental income and £1.5m of intra-group debt-funded interest now faces CIR scrutiny. If the £2m group net-interest threshold is breached at consolidated level, the interest deduction is restricted to 30% of group EBITDA (or higher under group-ratio). The previous IT regime had no CIR analogue; the import is significant for highly-leveraged structures.
   - **Loan relationships (CTA 2009 Part 5)**: connected-party loan interest deductibility, fair-value adjustments, and unallowable-purpose challenges all apply. Sessions must walk the "unallowable purpose" (CTA 2009 s.441) risk for structures designed solely for UK property holding.
   - **Hybrid mismatch (TIOPA 2010 Part 6A)**: a US-LLC structure (checked-the-box for US transparent treatment, opaque for UK CT) holding UK rental property may face hybrid-mismatch counteraction denying deductions or imposing deemed receipts. The reform brought a wave of structural restructurings in 2019-2021.
   - **CT loss restriction (CTA 2010 Part 7ZA)**: £5m allowance + 50% restriction above. Non-resident corporate landlords with large historical IT losses carried forward into the CT regime under FA 2019 Sch 5 para 37 are now subject to the Part 7ZA cap.
   - **Group relief (CTA 2010 Part 5)**: now available where the 75% ownership conditions are met. A non-resident corporate landlord with a UK trading-company sibling can now surrender / claim group relief in ways previously unavailable.
4. **The NRL-withholding-continues-but-credit-shifts mechanic.** This is the operational cliff-edge: tenants and letting agents continue withholding 20%, BUT the credit pipeline now lands in CT not IT. Operational implications: (a) the corporate landlord must register for CT in addition to (or replacing) the IT registration; (b) the company gets a UTR and is in the CT600 cycle; (c) reconciliation of the 20% withheld vs CT-rate-due is now an annual CT-cycle exercise. Many non-resident corporate landlords missed this for 2020/21 and have ongoing reconciliation backlogs.
5. **The straddling-period split (FA 2019 Sch 5 para 36).** Accounting periods that crossed 6 April 2020 (e.g. a calendar-year company with a period ending 31 December 2020) were artificially split into a pre-6-April IT segment and a post-6-April CT segment. The split required separate calculations and separate filing tracks for the transition year. Stage 2 walks this for legacy-period queries.
6. **The loss carry-forward preservation (FA 2019 Sch 5 para 37).** Pre-6-April-2020 unrelieved IT losses carry forward into the post-6-April CT regime, subject to Part 7ZA loss restriction. Sessions on legacy structures with large IT losses must walk this preservation + the Part 7ZA cap.
7. **The interaction with ATED (HP §18) and NRCGT (HP §17.4).** Non-resident corporate landlords holding £500k+ residential dwellings face the **ATED stack** (HP §18 + B16 + B14 + B5) — independent of the CT-on-property-income regime. Disposing of UK property triggers **NRCGT** (HP §17.4) — also independent. Sessions on non-resident corporate landlords must walk the three-regime picture: CT on property income (FA 2019 Sch 5 + CTA 2009 Part 4) + ATED on £500k+ dwellings (FA 2013 Part 3) + NRCGT on disposals (TCGA 1992 s.1A + Schs 1A/1B/4AA).
8. **The RoE parallel transparency layer.** Overseas-incorporated landlords face RoE registration with Companies House (HP §11.A + ECTEA 2022). RoE compliance is a SEPARATE regime from CT registration and the NRL scheme; sessions must walk all three (CT registration + NRL approval + RoE registration) as the structural compliance trio.

Sibling cross-links: existing site pages `non-resident-landlord-scheme-uk-complete-guide` (the generic NRL orientation — this seed cross-links and distinguishes); `non-resident-landlord-self-assessment-filing-requirements`; `nrl-approval-receive-rent-gross-hmrc-guide`; `nrl-scheme-letting-agents-quarterly-returns-mechanics`; `nrl-withholding-tax-20-percent-basic-rate-deduction`; `non-resident-cgt-selling-uk-property-overseas-guide`; `non-resident-cgt-uk-property-rates-reporting`; `non-resident-developer-uk-tax-scope-fa-2016-offshore-developer-planning-closure`; `register-of-overseas-entities-roe-annual-update-statement-non-resident-landlords`; B15 (`automatic-exchange-of-information`); B6 (`are-you-leaving-the-uk-permanently`); B16 (`avoiding-common-mistakes-with-enveloped-dwelling-tax`); B5 (`annual-tax-on-enveloped-dwellings-pro-and-cons`); B4 (OTM letters); existing pillar pages on CIR / loan relationships / hybrid mismatch if extant.

Cannibalisation differentiator: the existing site has multiple NRL-scheme pages (orientation, approval, quarterly returns, withholding mechanics) — none of which address the 6 April 2020 IT-to-CT transition for COMPANY landlords specifically. B17 is the corporate-transition specialist page that complements the existing NRL-scheme cluster. One-line distinction: existing NRL pages = how the scheme works; B17 = what changed in 2020 for company landlords and what CT-regime rules now bite.

## Key questions this page must answer
1. **What changed on 6 April 2020 for non-resident COMPANY landlords?** (FA 2019 Sch 5 transition: UK property income of non-resident companies moved from IT under ITTOIA 2005 s.362 to CT under CTA 2009 s.5 + Part 4. Effective from 6 April 2020 per Sch 5 para 35.)
2. **Did anything change for non-resident INDIVIDUAL landlords?** (No — FA 2019 Sch 5 applies only to non-UK-resident COMPANIES. Non-resident individuals continue under ITTOIA 2005 Part 3 + IT self-assessment + NRL scheme. The 2020 reform was company-specific.)
3. **Does the NRL scheme still apply post-2020?** (Yes — the NRL scheme withholding mechanic at HP §17.5 continues. Tenants and letting agents must withhold 20% on rent paid to non-resident landlords (including companies), unless NRL1 approval to receive rent gross is held. What changed is the CREDIT PIPELINE: the 20% withheld is now credited against CT, not IT.)
4. **What CT rate applies to non-resident corporate landlords?** (FY2023 onwards: 25% main rate above £250,000 profits; 19% small profits rate below £50,000; marginal relief between. Stage 2 verifies current rates against gov.uk at write time.)
5. **What is the Corporate Interest Restriction (CIR) and how does it bite?** (TIOPA 2010 Part 10. £2m group net-interest threshold. Above threshold, deduction restricted to 30% group EBITDA (fixed-ratio) or higher under group-ratio rule. Non-resident corporate landlords with significant intra-group debt now face CIR scrutiny that the IT regime did not impose.)
6. **What are the loan relationships rules?** (CTA 2009 Part 5. Connected-party loan interest deductibility + fair-value adjustments + unallowable-purpose risk at s.441. Structures designed solely for UK property holding may face unallowable-purpose challenge on intra-group loan interest.)
7. **What is the hybrid mismatch risk?** (TIOPA 2010 Part 6A. US-LLC / Luxembourg / Cayman / Delaware structures with hybrid characteristics (different treatment by jurisdictions) may face counteraction denying deductions or imposing deemed receipts. Many such structures were restructured 2019-2021 in response.)
8. **What is the CT loss restriction (Part 7ZA)?** (CTA 2010 Part 7ZA. £5m annual deductions allowance + 50% restriction above. Applies to carried-forward losses (FA 2017 origin). Pre-6-April-2020 unrelieved IT losses preserved under FA 2019 Sch 5 para 37 are subject to Part 7ZA in their post-transition CT life.)
9. **Does group relief now apply to non-resident corporate landlords?** (Yes under CTA 2010 Part 5 where the 75% ownership conditions are met. FA 2019 Sch 5 paras 29-31 extend operative group-relief provisions to non-resident-corporate landlords.)
10. **What is the straddling-period rule at transition?** (FA 2019 Sch 5 para 36. Accounting periods crossing 6 April 2020 were split into pre-6-April IT segment + post-6-April CT segment. Now historical but relevant for legacy-period queries / enquiry responses.)
11. **What is the three-regime picture for non-resident corporate landlords?** (CT on property income (FA 2019 Sch 5 + CTA 2009 Part 4) + ATED on £500k+ residential dwellings (FA 2013 Part 3) + NRCGT on disposals (TCGA 1992 s.1A + Schs 1A/1B/4AA). All three apply independently. PLUS the parallel RoE regime under ECTEA 2022 for overseas-incorporated landlords.)
12. **What is the operational compliance trio post-2020?** (a) CT registration with HMRC + UTR + CT600 cycle. (b) NRL scheme registration (NRL1 if seeking gross receipts, plus the tenant/agent withholding mechanic). (c) RoE annual update statement with Companies House for overseas-incorporated landlords. Many non-resident corporate landlords are non-compliant on at least one of the three — Stage 2 walks the remedial track for each.)

## Manager pre-decisions placeholder
- Category routing: `non-resident-landlord-tax` (canonical fit).
- Worked-example numbers: Stage 2 must verbatim-verify FA 2019 Sch 5 (paras 1-5, 8, 29-31, 35, 36, 37, 39-44), CTA 2009 s.5 (post-amendment text), CTA 2009 Part 4 (operative CT property-income regime), TIOPA 2010 Part 10 (CIR + £2m threshold), CTA 2009 Part 5 (loan relationships + s.441 unallowable purpose), TIOPA 2010 Part 6A (hybrid mismatch), CTA 2010 Part 7ZA (loss restriction + £5m allowance), CTA 2010 Part 5 (group relief), TCGA 1992 s.1A (NRCGT), FA 2013 Part 3 (ATED), ECTEA 2022 (RoE). Current CT rate structure (25% / 19% / marginal relief) against gov.uk.
- Cross-link targets: existing NRL-cluster pages on site; B4, B5, B6, B15, B16; existing RoE / NRCGT / hybrid-mismatch / CIR pillar pages if extant.

## Stage 2 research target list — VERIFIED URLs

### Authority URLs (RUN session WebFetches at write time per §16.35)

- **`https://www.legislation.gov.uk/ukpga/2019/1/schedule/5`** — FA 2019 Sch 5 (Non-UK resident companies carrying on UK property businesses — operative repeal-and-insertion vehicle). RUN session WebFetches verbatim at write — LOAD-BEARING.
- **`https://www.legislation.gov.uk/ukpga/2009/4/section/5`** — CTA 2009 s.5 (Territorial scope of CT charge — post-FA 2019 Sch 5 amendment).
- **`https://www.legislation.gov.uk/ukpga/2009/4/part/4`** — CTA 2009 Part 4 (Property income — operative CT property-income regime).
- **`https://www.legislation.gov.uk/ukpga/2010/8/part/10`** — TIOPA 2010 Part 10 (Corporate Interest Restriction — £2m group threshold + 30% EBITDA fixed-ratio).
- **`https://www.legislation.gov.uk/ukpga/2009/4/part/5`** — CTA 2009 Part 5 (Loan relationships — connected-party + s.441 unallowable purpose).
- **`https://www.legislation.gov.uk/ukpga/2009/4/section/441`** — CTA 2009 s.441 (Unallowable purpose).
- **`https://www.legislation.gov.uk/ukpga/2010/8/part/6A`** — TIOPA 2010 Part 6A (Hybrid mismatch rules — counteraction for US-LLC / Luxembourg / hybrid structures).
- **`https://www.legislation.gov.uk/ukpga/2010/4/part/7ZA`** — CTA 2010 Part 7ZA (CT loss restriction — £5m allowance + 50% above).
- **`https://www.legislation.gov.uk/ukpga/2010/4/part/5`** — CTA 2010 Part 5 (Group relief — 75% ownership threshold).
- **`https://www.legislation.gov.uk/ukpga/2005/5/section/362`** — ITTOIA 2005 s.362 (the pre-2020 IT charge on non-resident companies' UK property income — OMITTED by FA 2019 Sch 5 para 8). LOAD-BEARING for the before/after architecture map.
- **`https://www.legislation.gov.uk/ukpga/1992/12/section/1A`** — TCGA 1992 s.1A (NRCGT — continues alongside CT-on-property-income reform).
- **`https://www.legislation.gov.uk/ukpga/2013/29/section/94`** — FA 2013 s.94 (ATED charge — third regime in the three-regime picture).
- **`https://www.legislation.gov.uk/ukpga/2022/10/contents/enacted`** — ECTEA 2022 (RoE — parallel transparency regime).
- **`https://www.gov.uk/government/publications/non-resident-companies-uk-property-income-corporation-tax`** — HMRC guidance on the 6 April 2020 transition.
- **`https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm34000`** — HMRC Company Taxation Manual (territorial scope of CT — non-resident companies).
- **`https://www.gov.uk/hmrc-internal-manuals/property-income-manual`** — HMRC Property Income Manual (non-resident company chapter post-2020).
- **`https://www.gov.uk/hmrc-internal-manuals/international-manual`** — HMRC International Manual (NRL scheme + treaty interactions).
- **`https://www.gov.uk/hmrc-internal-manuals/corporate-finance-manual`** — HMRC Corporate Finance Manual (loan relationships + CIR).
- **`https://www.gov.uk/hmrc-internal-manuals/international-manual/intm550000`** — HMRC INTM on hybrid mismatch (Part 6A).
- **`https://www.gov.uk/corporation-tax-rates`** — current CT rates (25% / 19% / marginal relief).

### Competitor URLs (session-side WebSearch at write time)

`<!-- competitor section: RUN session WebSearch at write time. Suggested queries: "non-resident company UK property income corporation tax 2020", "FA 2019 Schedule 5 commencement 6 April 2020", "non-resident company CIR UK property", "non-resident corporate landlord hybrid mismatch", "BVI Cayman Luxembourg UK property CT transition", "NRL scheme withholding corporation tax credit". Aim 4-6 specialist firm-side pages — BDO international tax / Smith & Williamson / Saffery Champness international / Crowe UK / RSM international / Grant Thornton international / Mercer Tax / ETC Tax / Cobalt Tax. Verify each with httpx + follow_redirects=True before listing. Watch for stale "non-resident companies still pay IT on UK rental" framings — these are 6+ years stale; flag for §16.43 mechanical back-patch if found on existing site pages. -->`

### HMRC manual anchors

- HMRC Company Taxation Manual (CTM) — territorial scope chapters (CTM34000+).
- HMRC Property Income Manual (PIM) — non-resident company chapter post-2020.
- HMRC International Manual (INTM) — NRL scheme + treaty interactions; hybrid mismatch (INTM550000+).
- HMRC Corporate Finance Manual (CFM) — loan relationships + CIR.

### Case-law

- *Travel Document Service v HMRC* [2018] UKUT 173 — unallowable-purpose loan-relationship case relevant to non-resident-corporate-landlord intra-group debt structures.
- *BlackRock HoldCo 5 v HMRC* [2024] EWCA Civ 330 — recent Court of Appeal authority on unallowable purpose in cross-border financing.
- *Oxford Instruments v HMRC* [2019] UKUT 224 — unallowable purpose (Stage 2 confirms relevance).
- CIR / hybrid mismatch first-instance cases — RUN session confirms availability before citing.

### Legislation anchors (RUN session WebFetches at write time per §16.35)

- FA 2019 Sch 5 (paras 1-5 CTA 2009 s.5 amendment + para 8 ITTOIA 2005 s.362 omission + paras 29-31 CTA 2010 amendments + para 35 commencement 6 April 2020 + para 36 straddling-period split + para 37 loss carry-forward preservation + paras 39-44 derivative-contract transition VERBATIM).
- CTA 2009 s.5 (Territorial scope — post-amendment text VERBATIM).
- CTA 2009 Part 4 (Property income — operative CT regime).
- TIOPA 2010 Part 10 (CIR — £2m threshold + 30% EBITDA VERBATIM).
- CTA 2009 Part 5 + s.441 (Loan relationships + unallowable purpose VERBATIM).
- TIOPA 2010 Part 6A (Hybrid mismatch — counteraction architecture VERBATIM).
- CTA 2010 Part 7ZA (CT loss restriction — £5m allowance + 50% above VERBATIM).
- CTA 2010 Part 5 (Group relief — 75% ownership).
- TCGA 1992 s.1A + Schs 1A / 1B / 4AA (NRCGT).
- FA 2013 Part 3 (ATED).
- ECTEA 2022 (RoE).
- ITTOIA 2005 s.362 (pre-2020 IT charge — OMITTED by FA 2019 Sch 5 para 8).

## Worked-example data (RUN session uses these as canvas)

### Example 1 — The before/after architecture map for a typical non-resident corporate landlord (the page's first concrete artefact)

Render as semantic HTML `<table>` with two columns: "Pre-6 April 2020 (legacy)" vs "Post-6 April 2020 (current)". This is the architecture-anchor for the structural shift:

| Element | Pre-6 April 2020 (legacy) | Post-6 April 2020 (current) |
|---------|---------------------------|------------------------------|
| **Charging statute** | ITTOIA 2005 s.362 (Income Tax on non-resident company's UK property income) | CTA 2009 s.5 + Part 4 (Corporation Tax on UK property business profits + other UK property income) |
| **Tax rate** | 20% basic IT rate (matches NRL withholding) | 19% SPR / 25% main rate (FY2023+) / marginal relief £50k-£250k |
| **Return form** | SA700 (non-resident company income return — IT) | CT600 (Corporation Tax return) |
| **Tax registration** | IT registration | CT registration + UTR issued |
| **NRL scheme withholding** | 20% by tenant / agent, credited against IT | 20% by tenant / agent (UNCHANGED), credited against CT |
| **NRL1 (gross receipts)** | Application to HMRC to receive rent without 20% withholding | UNCHANGED |
| **CIR** | Not applicable (no IT analogue) | TIOPA 2010 Part 10 applies above £2m group threshold |
| **Loan relationships** | Not applicable | CTA 2009 Part 5 applies (incl s.441 unallowable purpose) |
| **Hybrid mismatch** | Not applicable | TIOPA 2010 Part 6A applies for hybrid structures |
| **Loss restriction** | IT loss carry-forward without Part 7ZA cap | CTA 2010 Part 7ZA cap (£5m + 50%) |
| **Group relief** | Not available | CTA 2010 Part 5 available (75% ownership) |

**Practical lesson:** the regime shift is structural, not cosmetic. Operational compliance, deduction availability, group-structure planning, and intra-group financing all change. Non-resident corporate landlords cannot rely on pre-2020 IT-regime mental models; specialist CT-regime advice essential.

### Example 2 — The straddling-period split walked (FA 2019 Sch 5 para 36)

Quayle Property Holdings Limited (BVI-incorporated; non-UK-resident; calendar-year accounting period 1 January 2020 - 31 December 2020; owns a £4m London BTL portfolio generating £180k/year UK rental income).

**Straddling-period split per para 36:**

- Pre-6-April-2020 segment: 1 January 2020 - 5 April 2020 (96 days).
- Post-6-April-2020 segment: 6 April 2020 - 31 December 2020 (270 days).

**Pre-segment IT calculation:**

- Apportioned UK rental income: £180k × 96 / 366 = £47,213.
- IT at 20% basic rate (post-NRL withholding credit): £9,443.
- NRL 20% withholding for the 96-day segment: £9,443 (matches IT — typical).
- Net IT payable: £0 (NRL withholding fully covers).
- SA700 filing required for the pre-segment.

**Post-segment CT calculation:**

- Apportioned UK rental income: £180k × 270 / 366 = £132,787.
- Less allowable deductions per CTA 2009 Part 4 (property running costs, financing costs subject to CIR if applicable): assume £40k deductions = taxable profit £92,787.
- CT rate (FY2020): 19% on first £50k SPR equivalent (no associated companies if simple structure). Note FY2020 used the 19% flat rate; the 25% main rate + marginal relief band came in from FY2023.
- For FY2020 transitional period: 19% × £92,787 = £17,629.
- NRL 20% withholding for the 270-day segment: £132,787 × 20% = £26,557 (post-deductions calculation different; assume gross-rent withholding £180k × 270/366 × 20% = £26,557).
- Net CT position: £17,629 due less £26,557 NRL credit = **£8,928 NRL OVERPAYMENT recoverable**.
- CT600 filing required for the post-segment.

**Operational implications:**

- Two separate filings for the transition year (SA700 pre-segment + CT600 post-segment).
- Two separate tax registrations (IT pre-2020 + CT post-2020).
- NRL credit reconciliation across both segments.
- For years from 2021 onwards: single CT600 cycle, NRL credit reconciled annually.

**Practical lesson:** the transition year (2019/20 for calendar-year companies; 2020/21 for April-year companies) was operationally complex. Legacy structures with this period in their compliance history still need to defend the split-calculation methodology under any HMRC enquiry.

### Example 3 — The CIR (Corporate Interest Restriction) bite for a leveraged non-resident landlord

Crosby Holdings BVI Limited (BVI-incorporated; non-UK-resident; owns a £45m London commercial portfolio generating £2.8m/year UK rental income; financed by £20m intra-group loan from BVI parent at 6% = £1.2m/year interest expense).

**CIR analysis per TIOPA 2010 Part 10 (post-2020):**

- Crosby's net interest expense: £1.2m/year.
- £2m group net-interest-expense threshold: Crosby's group must aggregate ALL UK net interest expense across UK-tax-resident + non-UK-resident-in-CT-scope entities. Assume Crosby's BVI parent has another UK sub-group with £1.5m UK net interest expense → group total £2.7m → BREACHES £2m threshold.
- Above-threshold restriction: lower of (a) fixed-ratio 30% × group EBITDA or (b) group-ratio per worldwide group calculation.
- Assume group EBITDA c. £8m: fixed-ratio cap 30% × £8m = £2.4m group interest deduction → group total interest £2.7m → restriction of £300k → allocated across UK-CT entities pro-rata.
- Crosby's share of the £300k restriction: pro-rata to its interest expense → £1.2m / £2.7m × £300k = £133,333 restricted interest deduction.

**Tax consequence:**

- UK rental income: £2.8m.
- Allowable deductions before CIR: £1.5m (operating costs + full interest).
- Allowable deductions after CIR: £1.5m – £133,333 = £1,366,667.
- Taxable profit: £2.8m – £1,366,667 = £1,433,333.
- CT at 25% (£1.43m well above £250k upper threshold): **£358,333**.
- Plus disallowed-interest carryforward £133,333 for future relief subject to ongoing CIR cap.

**Pre-2020 equivalent (legacy regime):**

- ITTOIA 2005 s.362 IT charge at 20% basic rate.
- No CIR equivalent → full £1.2m interest deduction.
- Taxable profit £2.8m – £1.5m = £1.3m.
- IT at 20%: £260,000.

**Differential:** £358,333 CT (post-2020) vs £260,000 IT (pre-2020) = **+£98,333/year additional UK tax** purely from the CT-regime shift + CIR import. The CIR is the single most significant operational change for leveraged structures.

**Operational lesson:** leveraged non-resident corporate landlords must run the CIR calculation annually at group level. Many missed this for 2020/21 and 2021/22; HMRC enquiry exposure is significant. CIR is a Part 10 specialist area — engage CT specialist with CIR experience.

### Example 4 — The hybrid-mismatch counteraction for a US-LLC structure

Kissack Property LLC (Delaware LLC; sole member is US-individual; LLC has elected pass-through treatment for US federal tax (Form 8832 check-the-box election); owns a £6m London BTL flat acquired 2018). Pre-2020: LLC was outside CT scope for UK property income; IT under ITTOIA 2005 s.362 + NRL withholding by agent.

**Post-2020 architecture:**

- LLC is in CT scope under CTA 2009 s.5 + Part 4 (UK property income).
- BUT: hybrid characterisation — US treats LLC as transparent (pass-through to member); UK treats LLC as opaque (separate corporate entity for CT purposes). This is a "reverse hybrid" mismatch under TIOPA 2010 Part 6A.

**Hybrid-mismatch analysis (TIOPA 2010 Part 6A):**

- Counteraction: where deductions are taken without corresponding receipts being taxed (D/NI mismatch) or where deductions are taken twice (DD mismatch), the UK denies the deduction or imposes a deemed receipt.
- For Kissack's structure: interest payments to the US member may be deductible at LLC level (UK CT) but not taxed at member level (US treats LLC as transparent → member already taxed on the underlying property income via pass-through). Potential D/NI mismatch on intra-structure financing.
- Counteraction under Part 6A: UK denies the interest deduction at LLC level OR imposes deemed receipt to neutralise.

**Tax consequence (illustrative):**

- LLC rental income: £280k/year.
- Member loan interest expense to LLC: £120k/year.
- Pre-counteraction: deduction £120k → taxable profit £160k → CT 25% × £160k = £40,000.
- Post-counteraction: £120k interest deduction DENIED → taxable profit £280k → CT 25% × £280k = £70,000.
- Differential: +£30,000/year additional CT purely from hybrid counteraction.

**Restructure responses (typical 2019-2021):**

- Convert LLC to a regular C-corporation (US opaque + UK opaque = no hybrid).
- Restructure intra-group financing to avoid interest payments crossing the hybrid line.
- Accept the counteraction and pay the additional CT.

**Operational lesson:** US-LLC + Luxembourg double-Lux + Cayman exempted-company-with-US-tax-treaty structures all face hybrid-mismatch scrutiny. The 2020 transition surfaced this for non-resident corporate landlords; structural advice essential for any hybrid holding structure.

### Example 5 — The three-regime compliance picture (CT + ATED + NRCGT)

Cregeen Estates Cayman Limited (Cayman-incorporated; non-UK-resident; owns a £3.8m London town house used as a long-term BTL let to an unconnected family at market rent of £160k/year; let through letting agent under NRL scheme; held since 2017).

**Three-regime picture:**

**Regime 1 — CT on UK property income (CTA 2009 Part 4 post-FA 2019 Sch 5):**

- UK rental income: £160k/year.
- Allowable deductions (operating + financing): assume £45k.
- Taxable profit: £115k → falls in marginal-relief band (£50k-£250k).
- CT calculation (FY2024 figures): £50k × 19% SPR + £65k × marginal rate (effective ~26.5%) = £9,500 + £17,225 = ~£26,725 CT.
- NRL withholding: £160k × 20% = £32,000 → CT credit £32,000.
- Net position: £26,725 CT due less £32,000 NRL credit = £5,275 NRL OVERPAYMENT recoverable annually.

**Regime 2 — ATED on £500k+ residential dwelling (FA 2013 Part 3):**

- £3.8m valuation → band 3 (£2m-£5m).
- 2025/26 ATED charge: £31,050. 2026/27: £32,200.
- s.133 rental relief AVAILABLE (let to unconnected family; commercial-basis met; s.136 catalogue not triggered).
- Claim-only return required by 30 April annually → ATED tax £0 after relief.
- Sch 55 escalator £900 per missed return → discipline essential.

**Regime 3 — NRCGT on eventual disposal (TCGA 1992 s.1A + Schs 1A/1B/4AA):**

- Not currently triggered (no disposal). When disposal occurs:
- For Cayman corporate landlord: disposal treated as CT chargeable gain (CIHC status likely; 25% main CT rate).
- 60-day NRCGT return required even though gain falls in CT600 cycle (HP §17.4).
- Assume eventual sale at £4.5m (appreciation): gain £700k × 25% CT = £175,000.

**Parallel regime: RoE under ECTEA 2022:**

- Cayman corporate → overseas entity in scope.
- RoE registration with Companies House + annual update statement.
- RoE failure separately blocks Land Registry dispositions on sale.

**Operational compliance trio (post-2020):**

- (a) CT registration with HMRC + UTR + CT600 cycle annually.
- (b) NRL scheme: NRL1 registered (or 20% withholding by agent) + NRL credit reconciliation annually.
- (c) RoE: annual update statement with Companies House.

**Plus separately:** ATED return + payment annually; NRCGT return on disposal.

**Practical lesson:** non-resident corporate landlords face structural complexity. Three independent tax regimes + parallel transparency regime + NRL withholding mechanic + ATED return discipline. Specialist tax adviser with cross-regime experience essential; many landlords are non-compliant on at least one regime.

### Example 6 — Misframings the page must correct (verbatim do-not-write list)

- **Misframe 1:** "Non-resident companies still pay income tax on UK rental income." FALSE post-6 April 2020 per FA 2019 Sch 5 + ITTOIA 2005 s.362 omission. Non-resident company landlords are within CT under CTA 2009 s.5 + Part 4. The IT charge has not applied for 6+ years; advisers and competitor pages citing IT-regime treatment are seriously out of date.
- **Misframe 2:** "The NRL scheme was abolished in 2020." FALSE — the NRL scheme withholding mechanic continues unchanged under HP §17.5. What changed is the credit pipeline (CT not IT). Tenants and letting agents continue withholding 20% on rent paid to non-resident landlords (including companies) unless NRL1 approval to receive rent gross is held.
- **Misframe 3:** "Non-resident individual landlords also moved to CT in 2020." FALSE — FA 2019 Sch 5 applies only to non-UK-resident COMPANIES. Non-resident individuals continue under ITTOIA 2005 Part 3 + IT self-assessment + NRL scheme. The 2020 reform was company-specific.
- **Misframe 4:** "Non-resident companies just face 19% CT — small profits rate." MISLEADING — current CT rate structure (FY2023+) is 25% main rate above £250k profits, 19% SPR below £50k, marginal relief between. Many non-resident corporate landlords with substantial UK rental portfolios are at the 25% main rate; CIHC treatment may also lock in 25% regardless of profit level.
- **Misframe 5:** "The Corporate Interest Restriction doesn't apply to property-letting structures." FALSE per TIOPA 2010 Part 10 — CIR applies to all CT-payable entities including non-resident corporate landlords post-2020. The £2m group net-interest threshold + 30% EBITDA fixed-ratio + group-ratio rule all bite. Leveraged structures face significant restriction; calculation must be done at group level annually.
- **Misframe 6:** "Loan relationship rules don't apply to non-resident companies because the lender is offshore." FALSE per CTA 2009 Part 5 — once the non-resident corporate landlord is within CT scope (post-2020), the loan relationship rules apply to ALL its debt arrangements (including offshore intra-group debt). s.441 unallowable-purpose risk is real for structures designed solely for UK property holding.
- **Misframe 7:** "Hybrid mismatch is too technical to worry about." MISLEADING per TIOPA 2010 Part 6A — hybrid mismatch counteraction bites concrete structures (US-LLC check-the-box, Luxembourg double-Lux, Cayman with US-treaty link). Counteraction can deny interest deductions or impose deemed receipts. The 2020 transition surfaced this; many structures restructured 2019-2021 in response.
- **Misframe 8:** "Pre-2020 IT losses are lost in the CT transition." FALSE per FA 2019 Sch 5 para 37 — pre-6 April 2020 unrelieved IT losses carry forward into the post-6 April 2020 CT regime. Subject to CTA 2010 Part 7ZA cap (£5m allowance + 50% restriction above) in their post-transition CT life.
- **Misframe 9:** "Group relief doesn't apply to non-resident corporate landlords." FALSE per CTA 2010 Part 5 + FA 2019 Sch 5 paras 29-31. Group-relief mechanics now apply where the 75% ownership conditions are met. A non-resident corporate landlord with a UK trading-company sibling can surrender / claim group relief in ways previously unavailable under the pre-2020 IT regime.
- **Misframe 10:** "Non-resident corporate landlords only have one regime to worry about." FALSE — three regimes apply independently: (a) CT on UK property income (CTA 2009 Part 4); (b) ATED on £500k+ residential dwellings (FA 2013 Part 3); (c) NRCGT on disposals (TCGA 1992 s.1A + Schs 1A/1B/4AA). PLUS the parallel RoE regime under ECTEA 2022 for overseas-incorporated landlords.
- **Misframe 11:** "The 20% NRL withholding is the final tax." MISLEADING — NRL 20% is a withholding tax on account of CT post-2020 (was on account of IT pre-2020). Final CT liability depends on the company's profit level + applicable CT rate. For higher-rate-band corporate landlords (£250k+ profits at 25%), NRL undertakes; for marginal-relief-band landlords, NRL may overpay; for low-profit landlords with SPR, NRL may approximately match. Reconciliation through CT600 annually.
- **Misframe 12:** "Brexit caused the 2020 NRL companies transition." FALSE — the 2020 reform was domestic UK tax policy under FA 2019 Sch 5; not a Brexit consequence. Brexit happened January 2020; the FA 2019 Sch 5 transition was already in flight (FA 2019 enacted February 2019). The two coincided in timing but were independent reforms.
- **Misframe 13:** "Non-resident corporate landlords don't need to register for CT until they have UK property income." MISLEADING — registration discipline is required upon acquiring UK property capable of generating UK income. Late CT registration triggers HMRC penalty exposure under FA 2009 Sch 41 (failure to notify chargeability). Best practice: register CT alongside the property acquisition.

## FAQ expansion (RUN session polishes prose; 12-14 FAQs target)

1. **Q: What changed on 6 April 2020 for non-resident company landlords with UK rental property?**
   A: Per FA 2019 Sch 5 (commencement 6 April 2020): UK property income of non-UK-resident companies moved from Income Tax (under ITTOIA 2005 s.362, now omitted) to Corporation Tax (under CTA 2009 s.5 + Part 4). The NRL scheme withholding (20% by tenant / agent) CONTINUES — but the 20% is now credited against CT, not IT. Plus the full CT-regime stack now applies: Corporate Interest Restriction (TIOPA 2010 Part 10), loan relationship rules (CTA 2009 Part 5), hybrid mismatch (TIOPA 2010 Part 6A), loss restriction (CTA 2010 Part 7ZA), group relief (CTA 2010 Part 5).

2. **Q: Does the NRL scheme still apply after the 2020 transition?**
   A: YES. The NRL scheme operational mechanics under HMRC's NRL1 / NRL2 / NRL3 / NRL6 architecture continue unchanged (HP §17.5). Tenants and letting agents must withhold 20% on rent paid to non-resident landlords (including non-resident companies) unless the landlord holds NRL1 approval to receive rent gross. What changed is the CREDIT PIPELINE: 20% withheld now credits against CT not IT.

3. **Q: I'm a non-resident individual landlord. Did the 2020 changes affect me?**
   A: NO. FA 2019 Sch 5 applies ONLY to non-UK-resident COMPANIES. Non-resident individual landlords continue under ITTOIA 2005 Part 3 + IT self-assessment + NRL scheme withholding. The 2020 reform was company-specific.

4. **Q: What CT rate applies to a non-resident corporate landlord post-2020?**
   A: Current rate structure (FY2023+): 25% main rate above £250,000 profits; 19% small profits rate below £50,000; marginal relief between £50k-£250k. Many non-resident corporate landlords with substantial UK portfolios are at the 25% main rate. Single-asset structures with low profits may sit in marginal-relief band. CIHC status (close investment-holding company) locks in 25% main rate regardless of profit level — common for single-property envelope structures (HP §21.5).

5. **Q: What is the Corporate Interest Restriction (CIR) and does it affect my non-resident landlord structure?**
   A: TIOPA 2010 Part 10 CIR caps the deductibility of net interest expense at the lower of (a) fixed-ratio 30% × group EBITDA, or (b) group-ratio per worldwide group calculation. The £2m group net-interest-expense threshold applies — below threshold, no restriction. Above threshold, the cap bites. Non-resident corporate landlords with significant intra-group debt (typical of BVI / Cayman / Luxembourg holding structures) face CIR scrutiny; calculation must be done at GROUP level annually.

6. **Q: My non-resident company is structured as a US-LLC. Are there hybrid-mismatch implications?**
   A: VERY LIKELY YES per TIOPA 2010 Part 6A. US-LLC structures that have made the US check-the-box election for pass-through treatment but are opaque for UK CT purposes face hybrid-mismatch counteraction. Counteraction can deny interest deductions or impose deemed receipts. Many such structures were restructured 2019-2021 in response. Specialist cross-border CT advice essential.

7. **Q: Does the CT loss restriction (Part 7ZA) apply to my pre-2020 IT losses?**
   A: YES. FA 2019 Sch 5 para 37 preserves pre-6 April 2020 unrelieved IT losses by carrying them forward into the post-6 April 2020 CT regime. But in their post-transition CT life, they are subject to CTA 2010 Part 7ZA: £5m annual deductions allowance + 50% restriction above. Significant historical IT losses may not be fully relievable in any single CT period; multi-year utilisation planning essential.

8. **Q: Can my non-resident corporate landlord now claim group relief with my UK trading sub?**
   A: POTENTIALLY YES. CTA 2010 Part 5 (group relief) now applies to non-resident corporate landlords post-2020 where the 75% ownership conditions are met. FA 2019 Sch 5 paras 29-31 extend operative group-relief provisions. Surrender / claim mechanics work as for UK-resident company groups. Specialist group-tax advice essential to confirm group composition + relief eligibility.

9. **Q: What's the straddling-period rule that I keep hearing about?**
   A: FA 2019 Sch 5 para 36. Accounting periods that crossed 6 April 2020 (e.g. a calendar-year company with period 1 January 2020 - 31 December 2020) were split into two segments: pre-6-April-2020 (IT under old regime) + post-6-April-2020 (CT under new regime). Two separate filings + two separate calculations + two separate tax registrations. Historically relevant for transition years; affects only the 2019/20 or 2020 transition AP depending on year-end.

10. **Q: What's the three-regime picture for a non-resident corporate landlord with a £600k London BTL?**
    A: (a) CT on UK property income (CTA 2009 Part 4 — post-2020); (b) ATED on the £500k+ residential dwelling (FA 2013 Part 3 — applies because >£500k); (c) NRCGT on eventual disposal (TCGA 1992 s.1A + Schs 1A/1B/4AA). PLUS the parallel RoE regime under ECTEA 2022 (HP §11.A) requires annual update with Companies House for overseas-incorporated landlords. Four separate compliance tracks; each independently enforceable.

11. **Q: I missed registering for CT in 2020. How exposed am I?**
    A: Significantly. FA 2009 Sch 41 failure-to-notify penalties apply: based on behaviour grading (careless / deliberate / deliberate-and-concealed) and prompted / unprompted status. Cat-2 / Cat-3 offshore uplift may apply under FA 2015 Sch 21 if you're in an offshore jurisdiction (most non-resident corporate landlords are). Voluntary disclosure via direct correspondence with HMRC's Corporation Tax team unlocks lower mitigation floors. Specialist tax adviser essential; HMRC OTM letters on this specific issue have been active since 2022.

12. **Q: Did Brexit cause the 2020 NRL companies transition?**
    A: NO. The FA 2019 Sch 5 reform was domestic UK tax policy enacted February 2019 with commencement 6 April 2020. Brexit happened January 2020. The two coincided in timing but were INDEPENDENT reforms. Some commentators conflate them; the statutory record is clear that FA 2019 Sch 5 was pre-Brexit domestic CT policy.

13. **Q: What's the operational compliance trio post-2020?**
    A: (a) CT registration with HMRC + UTR + CT600 annual cycle. (b) NRL scheme registration (NRL1 if seeking gross receipts; plus the tenant / agent withholding mechanic under NRL2 / NRL3 / NRL6). (c) RoE annual update statement with Companies House for overseas-incorporated landlords (ECTEA 2022). Plus separately: ATED annual return + payment if holding £500k+ residential dwellings; NRCGT 60-day return on any disposal of UK land.

14. **Q: Can a non-resident corporate landlord still benefit from NRL1 (gross receipts approval)?**
    A: YES. NRL1 approval allows the landlord to receive rent gross (no 20% withholding at agent / tenant level) subject to compliance conditions. Operationally helpful for cash-flow management. The landlord still owes CT on the gross-received profits; NRL1 doesn't eliminate the CT charge — it just removes the upfront withholding. Application via HMRC's NRL scheme online forms; compliance history + UK tax-filing track record assessed.

## Universal rules + workflow stubs (RUN session follows)

### Voice + style (verbatim per §4.8)

- **No em-dashes** in body copy. Commas, parentheses, full stops, middle dots only.
- **Specific over generic.** Named statute (**FA 2019 Sch 5 VERBATIM** — paras 1-5, 8, 29-31, 35, 36, 37, 39-44 architecture map; **CTA 2009 s.5 VERBATIM** — post-amendment territorial scope; **CTA 2009 Part 4** property income; **TIOPA 2010 Part 10 VERBATIM** — CIR + £2m threshold + 30% EBITDA fixed-ratio; **CTA 2009 Part 5 + s.441 VERBATIM** — loan relationships + unallowable purpose; **TIOPA 2010 Part 6A VERBATIM** — hybrid mismatch; **CTA 2010 Part 7ZA VERBATIM** — loss restriction + £5m allowance + 50% restriction above; **CTA 2010 Part 5** group relief; TCGA 1992 s.1A + Schs 1A / 1B / 4AA NRCGT; FA 2013 Part 3 ATED; ECTEA 2022 RoE; ITTOIA 2005 s.362 omitted; current CT rates 25% / 19% / marginal relief £50k-£250k). Anonymised personas (Quayle Property Holdings Limited — BVI; Crosby Holdings BVI Limited; Kissack Property LLC — Delaware; Cregeen Estates Cayman Limited) — no real names.
- **No real names.** No real CT-specialist firms, counsel, or jurisdictions' tax authorities named.
- **Lead-gen architecture:** `<LeadForm>` auto-injected at footer. Inline aside-styled CTAs at five conversion moments: (i) after the before/after architecture map (Example 1 — the structural-shift anchor); (ii) after the straddling-period walkthrough (Example 2 — the transition-year compliance conversion); (iii) after the CIR walkthrough (Example 3 — the leveraged-structure conversion); (iv) after the hybrid-mismatch walkthrough (Example 4 — the cross-border-structure conversion); (v) after the three-regime compliance picture (Example 5 — the holistic compliance conversion).
- **CSS in markdown:** semantic HTML only — Example 1 architecture map as `<table>`; examples 2-5 as scenario-walked prose with `<ol>` for analyses. NO Tailwind utility classes.
- **FAQs:** 12-14 entries.
- **Body word count target:** 3,600-4,200 (transition specialist page; depth justified by before/after architecture + CT-regime stack import + three-regime picture + operational compliance trio + worked-example range).
- **Anti-templating:** open with the structural-shift framing per the framing differentiator — NOT with "the NRL scheme is..." generic framing, NOT with "non-resident company landlords need to..." lazy framing, NOT with parallel-structure to existing generic NRL-scheme orientation sibling page. The reader needs the 6 APRIL 2020 BEFORE/AFTER MAP upfront.
- **Do-not-write GREP discipline (RUN session greps draft against ALL 13 misframings in Example 6):** especially Misframe 1 (non-resident-companies-still-IT myth), Misframe 2 (NRL-scheme-abolished myth), Misframe 5 (CIR-doesn't-apply-to-property myth), Misframe 7 (hybrid-mismatch-too-technical-to-worry myth), Misframe 10 (single-regime myth), Misframe 12 (Brexit-caused-2020 myth).
- **Quality bar (six checks per §9):** 0 em-dashes; 0 Tailwind class attrs; FAQ count matches frontmatter `faqs:` array; metaTitle ≤62 chars; metaDescription ≤158 chars; all internal `/blog/...` links resolve.

### 19-step workflow (verbatim per §7)

1. Read `house_positions.md` at session start (§10 + §16 + **§17 + §17.4 NRCGT + §17.5 NRL scheme** + **§11 + §11.A RoE** + **§21.A CT 3-figure framework + §21.5 CIHC depth** + **§18 ATED full** for three-regime context).
2. Claim this page in `megawave3_page_tracker.md` (⬜ → 🟡 + UTC timestamp).
3. Read this brief end-to-end (esp framing differentiator + Example 1 before/after architecture map + Example 2 straddling-period split + Example 3 CIR bite + Example 4 hybrid-mismatch + Example 5 three-regime picture + 13 misframings + FAQ canvas).
4. Fetch + read competitor URLs via RUN session WebSearch.
5. Read closest-existing pages: existing site NRL-scheme cluster (`non-resident-landlord-scheme-uk-complete-guide` + `non-resident-landlord-self-assessment-filing-requirements` + `nrl-approval-receive-rent-gross-hmrc-guide` + `nrl-scheme-letting-agents-quarterly-returns-mechanics` + `nrl-withholding-tax-20-percent-basic-rate-deduction` — distinguish + cross-link); existing NRCGT pages (`non-resident-cgt-selling-uk-property-overseas-guide` + `non-resident-cgt-uk-property-rates-reporting` — cross-link); existing `non-resident-developer-uk-tax-scope-fa-2016-offshore-developer-planning-closure` (related transition reform); existing `register-of-overseas-entities-roe-annual-update-statement-non-resident-landlords` (parallel transparency); B15 AEOI; B6 leaving the UK; B16 ATED mistakes; B5 ATED strategic; B4 OTM letters; existing CT / CIR / loan-relationship pillar pages if extant.
6. Plan H2/H3 outline: structural-shift framing open → before/after architecture map (Example 1, first concrete artefact) → what FA 2019 Sch 5 actually did (paras 1-5 + 8 + 29-31 + 35 + 36 + 37 + 39-44 walked) → NRL scheme continues but credit shifts → CT-regime stack import (CIR / loan relationships / hybrid mismatch / loss restriction / group relief — each walked with Example references) → Example 2 straddling-period split → Example 3 CIR bite → Example 4 hybrid-mismatch → three-regime picture (CT + ATED + NRCGT) + RoE parallel layer (Example 5) → operational compliance trio → 13 misframings → FAQ block → next-step CTA.
7. Verify factual claims per §16.35: WebFetch **FA 2019 Sch 5** (paras 1-5 CTA 2009 s.5 amendment + para 8 ITTOIA 2005 s.362 omission + paras 29-31 CTA 2010 amendments + para 35 commencement + para 36 straddling + para 37 loss carry-forward + paras 39-44 derivative-contract transition VERBATIM); **CTA 2009 s.5** post-amendment VERBATIM; CTA 2009 Part 4 property income; **TIOPA 2010 Part 10** CIR VERBATIM + £2m threshold + 30% EBITDA; **CTA 2009 Part 5 + s.441** loan relationships + unallowable purpose VERBATIM; **TIOPA 2010 Part 6A** hybrid mismatch VERBATIM; **CTA 2010 Part 7ZA** loss restriction VERBATIM; CTA 2010 Part 5 group relief; TCGA 1992 s.1A + Schs 1A / 1B / 4AA NRCGT; FA 2013 Part 3 ATED; ECTEA 2022 RoE; ITTOIA 2005 s.362 (now omitted). Verify current CT rates at gov.uk (25% / 19% / marginal relief £50k-£250k).
8. Fetch hero image (transition / corporate / international / private-client aesthetic).
9. Write markdown at `Property/web/content/blog/changes-nrl-companies.md`.
10. Build clean.
11. Six verifications + 13-pattern do-not-write GREP.
12. Apply redirect repointing if needed (check `middleware.ts` for `nrl-companies` / `non-resident-company-tax` / `2020-ct-transition` / `fa-2019-schedule-5` stems).
13. Register in `monitored_pages`.
14. Commit on RUN-phase session's branch.
15. Fill per-page work-log.
16. Mark ✅ done.
17. Append flags if any.
18. Append discoveries.
19. Claim next page.

## Work log (Stage 2 + RUN session populate)

[RUN session records work here. Stage 2 verification notes: **FA 2019 Sch 5** (operative repeal-and-insertion vehicle for the 6 April 2020 transition; paras 1-5 amend CTA 2009 s.5 with new s.5(6) other UK property income definition; para 8 omits ITTOIA 2005 s.362; paras 29-31 extend CTA 2010 currency-conversion + group-relief provisions; para 35 commencement 6 April 2020; para 36 straddling-period split; para 37 pre-commencement loss carry-forward preservation; paras 39-44 derivative-contract / fair-value transition asymmetries) — verified per §17 HP-lock pass (Stage 1 verified architecture map 2026-05-27; LOAD-BEARING for Example 1 + Example 2 + FAQ 1 + Misframe 1 + Misframe 12 grep). **CTA 2009 s.5** post-amendment text — RUN session WebFetches verbatim at write per §16.35 (LOAD-BEARING for Misframe 1 grep). CTA 2009 Part 4 (property income — operative CT regime) — RUN session verifies. **TIOPA 2010 Part 10 CIR** + £2m group net-interest threshold + 30% EBITDA fixed-ratio + group-ratio rule — RUN session WebFetches verbatim (LOAD-BEARING for Example 3 + FAQ 5 + Misframe 5 grep). **CTA 2009 Part 5 + s.441 unallowable purpose** — RUN session verifies verbatim (LOAD-BEARING for Misframe 6 grep). **TIOPA 2010 Part 6A hybrid mismatch** counteraction architecture — RUN session verifies (LOAD-BEARING for Example 4 + FAQ 6 + Misframe 7 grep). **CTA 2010 Part 7ZA loss restriction** £5m allowance + 50% above — RUN session verifies (LOAD-BEARING for FAQ 7 + Misframe 8 grep). CTA 2010 Part 5 group relief — RUN session verifies (LOAD-BEARING for FAQ 8 + Misframe 9 grep). TCGA 1992 s.1A + Schs 1A / 1B / 4AA NRCGT — verified per §17.4. FA 2013 Part 3 ATED — verified per §18. ECTEA 2022 RoE — verified per §11 + §11.A. ITTOIA 2005 s.362 (pre-2020 IT charge — NOW OMITTED by FA 2019 Sch 5 para 8) — verified. Current CT rate structure (25% main rate above £250k; 19% SPR below £50k; marginal relief £50k-£250k from FY2023+) — RUN session verifies at gov.uk per §16.35. HMRC Company Taxation Manual (CTM34000+) + Property Income Manual + International Manual (NRL + hybrid mismatch INTM550000+) + Corporate Finance Manual (loan relationships + CIR) — manual landings confirmed live. Potential new HP-lock candidate: **§17.X "FA 2019 Sch 5 transition + CT-regime stack import for non-resident corporate landlords"** — Stage 2 raises only if site-wide stale-citation drift surfaces during RUN session research; manager triages. Cross-link discipline: bidirectional with existing NRL-scheme cluster (this page is the corporate-transition specialist; cluster is scheme-mechanics orientation); existing NRCGT cluster; B15 AEOI; B6 expat; B16 + B5 + B4 ATED cluster; existing RoE / CIR / loan-relationship pillars; do NOT re-walk NRL operational mechanics in depth (defer to existing cluster pages).]

---

## Stage 1 seed work log

- **Stage 1 author:** MW3 Stage 1 Sub-Agent B (batch M3-B-B3) on or before 2026-05-27.
- **Stage 2 author:** MW3 Stage 2 Sub-Agent B (batch M3-B-B3) on 2026-05-27.
- **Cluster anchor:** Non-resident-company-specific change page — the canonical "what changed in 2020 for COMPANY landlords + what CT-regime stack now bites" map. Distinct from existing generic NRL-scheme orientation cluster (which covers operational withholding mechanics; this page covers the 2020 structural shift + CT-regime import); existing NRCGT pages (parallel disposal regime — cross-link); existing RoE page (parallel transparency — cross-link); existing CIR / loan-relationship pillars if extant.
- **HP-lock alignment:** §10 + §16 + **§17 + §17.4 NRCGT + §17.5 NRL scheme** + **§11 + §11.A RoE** + **§21.A CT 3-figure framework + §21.5 CIHC depth** + **§18 ATED full** (for three-regime context). Potential new HP §17.X candidate "FA 2019 Sch 5 transition + CT-regime stack import" — Stage 2 raises only if site-wide drift surfaces; manager triages.
- **§16.36 statutory-citation cross-check (Stage 2):** **FA 2019 Sch 5** architecture (paras 1-5 + 8 + 29-31 + 35 + 36 + 37 + 39-44) — verified 2026-05-27 per §17 HP-lock pass. **CTA 2009 s.5** post-amendment territorial scope — RUN session verifies verbatim at write per §16.35. CTA 2009 Part 4 property income regime — RUN session verifies. **TIOPA 2010 Part 10 CIR** (£2m threshold + 30% EBITDA + group-ratio) — RUN session verifies verbatim. **CTA 2009 Part 5 + s.441** loan relationships + unallowable purpose — RUN session verifies verbatim. **TIOPA 2010 Part 6A** hybrid mismatch — RUN session verifies verbatim. **CTA 2010 Part 7ZA** loss restriction (£5m + 50%) — RUN session verifies verbatim. CTA 2010 Part 5 group relief — RUN session verifies. TCGA 1992 s.1A + Schs 1A / 1B / 4AA NRCGT — verified per §17.4. FA 2013 Part 3 ATED — verified per §18. ECTEA 2022 RoE — verified per §11 + §11.A. ITTOIA 2005 s.362 (omitted by FA 2019 Sch 5 para 8) — verified. Current CT rate structure — RUN session verifies at gov.uk at write per §16.35 (rate structure may shift in future Budgets; verify currency). No drift catches raised at Stage 2.
- **§16.31 URL verification (Stage 2):** legislation.gov.uk anchors confirmed live for FA 2019 Sch 5; CTA 2009 s.5 + Parts 4, 5; CTA 2009 s.441; TIOPA 2010 Parts 10, 6A; CTA 2010 Parts 5, 7ZA; TCGA 1992 s.1A; FA 2013 Part 3; ECTEA 2022; ITTOIA 2005 s.362 (showing OMITTED status). HMRC CTM + PIM + INTM + CFM manual landings confirmed live. CT-rate gov.uk landing confirmed live. Competitor URLs deferred to session-side WebSearch at write.
- **Cannibalisation reasoning:** clean cluster gap on the 2020 IT-to-CT transition specialist page. Closest adjacencies: existing site NRL-scheme cluster (operational withholding mechanics — distinguish: cluster is "how the scheme works"; B17 is "what changed in 2020 + what CT-regime rules now apply"); existing NRCGT cluster (disposal regime — parallel + cross-link); existing RoE page (parallel transparency — cross-link); B15 AEOI sibling (cross-link); B16 ATED mistakes (cross-link for three-regime context); B5 ATED strategic (cross-link); B6 leaving the UK (cross-link); B4 OTM letters (cross-link); existing CIR / loan-relationship / hybrid-mismatch pillars if extant (cross-link). No CANNIBAL. Stage 2 must verify at write whether existing generic NRL-scheme orientation page (`non-resident-landlord-scheme-uk-complete-guide`) explicitly covers the post-2020 CT-credit-pipeline shift — if NOT, raise F-numbered drift catch for §16.43 mechanical back-patch sweep.
- **Anti-templating watchpoints for RUN session:** (a) MUST open with the 6-April-2020 structural-shift framing per framing differentiator — NOT with "the NRL scheme is..." generic framing, NOT with "non-resident company landlords need to..." lazy framing, NOT with parallel-structure to existing generic NRL-scheme orientation. The reader needs the before/after architecture map upfront. (b) Example 1 before/after architecture map is the page's first concrete artefact — render as semantic HTML `<table>` with two columns. (c) Example 2 straddling-period walkthrough must explain para 36 split for transition-year compliance defence — relevant for any historical-period HMRC enquiry. (d) Example 3 CIR walkthrough must surface group-level calculation discipline — Misframe 5 grep mandatory. (e) Example 4 hybrid-mismatch walkthrough must surface specific structures (US-LLC / Luxembourg) — Misframe 7 grep mandatory. (f) Example 5 three-regime picture must walk CT + ATED + NRCGT + RoE compliance trio — Misframe 10 grep mandatory. (g) Per §16.27 rate-by-reference — current CT rates (25% / 19% / marginal relief £50k-£250k from FY2023+) verified at write per §16.35; ATED bands per HP §18.1; NRCGT rates per §17.4. (h) FAQ count target 12-14. (i) Body word count 3,600-4,200 (longer than typical to accommodate the structural shift + CT-regime stack + three-regime picture). (j) Cross-link discipline: bidirectional with existing NRL-scheme cluster + existing NRCGT cluster + existing RoE page + B15 + B6 + B16 + B5 + B4 + existing CT / CIR / hybrid-mismatch pillars if extant; do NOT re-walk NRL operational mechanics in depth.
