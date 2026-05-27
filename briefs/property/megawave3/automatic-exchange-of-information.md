---
slug: automatic-exchange-of-information
category: non-resident-landlord-tax
intent: An expat landlord (UK national living overseas with retained UK BTL property), a non-resident landlord (overseas-resident individual or company holding UK property), or a UK landlord with offshore bank accounts / overseas property income needs the orientation page on Automatic Exchange of Information (AEOI). AEOI is the cross-border tax-data-sharing architecture that makes hiding offshore income or assets from HMRC effectively impossible: foreign banks report UK-resident account holders to HMRC under the OECD Common Reporting Standard (CRS); UK banks report non-UK-resident account holders to the home jurisdiction; FATCA covers the US-bilateral leg; the EU DAC2 directive (still operative for legacy reporting cycles) and DAC6 / DAC7 cover cross-border arrangements + digital platform reporting. The page is the "what is AEOI and why does it matter for landlords" canonical orientation, not a CRS-due-diligence-mechanics page for banks. Page must walk the landlord-specific exposures: undeclared overseas rental income; undeclared UK NRCGT gains; the FA 2017 Sch 18 RTC/FTC offshore-penalty escalator; the HMRC Worldwide Disclosure Facility (WDF) as the standard correction route; the Sch 24 Cat-2 / Cat-3 penalty uplift for offshore matters.
---

# Automatic Exchange of Information for landlords: what CRS / FATCA / DAC2 actually means when your bank reports your UK rental income to HMRC (or HMRC reports your UK bank balance to your country of residence)

## Statutory anchor
- **Primary (the UK implementation instrument for CRS + FATCA + DAC2):**
  - **International Tax Compliance Regulations 2015 (SI 2015/878)** (verified at legislation.gov.uk 2026-05-27). The regulations implement the OECD Common Reporting Standard (CRS), the EU Directive on Administrative Cooperation 2 (DAC2 / Directive 2014/107/EU), and the US Foreign Account Tax Compliance Act (FATCA) within UK law. Structure: 25 regulations across four parts — Introductory, Obligations in Relation to Financial Accounts, Penalties for Breach of Obligations, Supplementary — plus two schedules.
    - **Reg 3** — due-diligence requirements (reporting financial institutions must identify reportable accounts).
    - **Reg 4** — defines CRS + DAC + FATCA reporting frameworks.
    - **Reg 5, 8, 9, 16** — FATCA-specific provisions (the US bilateral leg).
    - **Reg 6** — annual reporting obligation to HMRC.
    - **Reg 7** — electronic return system.
    - **Reg 10** — notification to individual reportable persons (the bank tells the customer their data is being reported).
    - **Reg 13** — penalties for non-compliance.
    - **Reg 14 + Reg 21** — daily default + enhanced daily default penalties.
    - **Reg 15** — penalties for inaccurate information.
- **Primary (the OECD framework that CRS implements):**
  - **OECD Standard for Automatic Exchange of Financial Account Information in Tax Matters** (the Common Reporting Standard, published 21 July 2014; revised 2023). Multilateral participants ~110+ jurisdictions exchange account-level financial data annually. UK is a CRS first-mover (2017 first-exchange cycle; reciprocal exchange annually thereafter). Sessions writing on AEOI must distinguish CRS (multilateral) from FATCA (US bilateral) from DAC2 (EU directive layer, post-Brexit operative for legacy reporting cycles and where EU jurisdictions exchange with the UK under MCAA bilateral memoranda).
- **Primary (the EU directive layer):**
  - **Directive 2014/107/EU (DAC2)** — amended the original Directive 2011/16/EU (DAC) to incorporate CRS reporting between EU Member States. Post-Brexit, the UK no longer participates in DAC as a Member State, but the underlying CRS exchange continues through the OECD MCAA. **DAC6 (Directive 2018/822/EU)** — mandatory disclosure of cross-border arrangements; UK adoption rolled back post-Brexit, replaced by **Mandatory Disclosure Rules (MDR)** under SI 2023/38 (the International Tax Enforcement (Disclosable Arrangements) Regulations 2023). **DAC7 (Directive 2021/514/EU)** — digital platform reporting obligation, implemented in the UK by the **OECD Model Rules on Digital Platform Reporting** via the **Platform Operators (Due Diligence and Reporting Requirements) Regulations 2023 (SI 2023/817)** — affects landlords using OTA platforms (Airbnb, Booking.com, Vrbo); the platform reports rental income to HMRC and to the host's country of residence.
- **Primary (the offshore-penalty escalator architecture):**
  - **FA 2017 Schedule 18** "Requirement to Correct" (RTC) / "Failure to Correct" (FTC) regime (verified verbatim at legislation.gov.uk 2026-05-27). Base penalty for offshore non-compliance uncorrected by **30 September 2018**: **200% of the offshore potential lost revenue (PLR)**. Mitigation floor: **100% of offshore PLR** for full disclosure. Coverage: income tax, CGT, IHT offshore irregularities. The RTC window has CLOSED (deadline passed) but the FTC regime continues to apply to historical offshore matters discovered after 30 September 2018 — the 200%-with-100%-floor pricing is now permanent for FTC matters.
  - **FA 2015 Schedule 21** "Penalties in connection with offshore matters and offshore transfers" — Category 2 / Category 3 penalty uplift. Cat-1 (UK matters or Category-1 territories): standard Sch 24 percentages. Cat-2 (Category-2 territories — moderately co-operative): **1.5x** Sch 24 percentages. Cat-3 (Category-3 territories — non-co-operative): **2x** Sch 24 percentages. The Cat-2 / Cat-3 uplift sits on top of the standard Sch 24 inaccuracy regime AND can stack with FTC penalties in extreme cases. Stage 2 verifies the Cat-2 / Cat-3 territory schedule against current gov.uk listing at write time.
  - **FA 2007 Schedule 24** "Penalties for errors" (the underlying inaccuracy regime): careless 0-30% unprompted / 15-30% prompted; deliberate 20-70% / 35-70%; deliberate-and-concealed 30-100% / 50-100% (HP §16.43-43A references).
- **Primary (HMRC's correction route):**
  - HMRC's **Worldwide Disclosure Facility (WDF)** — launched September 2016, runs indefinitely. Used for offshore non-compliance disclosure outside the formal RTC window. WDF disclosures are made via HMRC's Digital Disclosure Service (DDS). Sessions writing on AEOI must walk the WDF as the operational route for landlords with historical undeclared offshore matters.
- **Primary (the HMRC Connect data warehouse):**
  - HMRC's Connect system aggregates AEOI inbound data (CRS / FATCA / DAC2 legacy / MDR / DAC7-equivalent), Land Registry data, Companies House data, DVLA, banking records, NRL scheme returns, NRCGT 60-day returns, self-assessment, and third-party data (Airbnb / Booking.com / lettings agents). The Connect risk-rating algorithm flags discrepancies between AEOI-reported overseas-bank-account balances and declared income on self-assessment — non-resident landlords with UK rental income who fail to file UK SA are routinely surfaced through Connect's AEOI cross-match. Sessions should describe Connect in factual terms (data-aggregation infrastructure, not "an HMRC algorithm that catches you") consistent with HMRC's published Connect overview.
- **House position reference:** §10 (DTAs general framing — AEOI sits adjacent to but distinct from DTAs; DTAs determine taxing rights, AEOI determines information flow), §16 (DTAs Wave 2 extension — Article-by-Article OECD model), §17 (Leaving the UK / expat — locked framing for expat-landlord context), **§17.4 (NRCGT — 60-day reporting; AEOI is one of HMRC's discovery routes for non-compliant NRCGT)**, §17.5 (NRL scheme operational mechanics), §17.6 (Domicile reform 2025+ — FIG / TRF / LTR regime; AEOI under CRS continues during the FIG window), §11 (RoE for overseas-held UK property — a parallel transparency regime; AEOI runs alongside RoE not in place of it).

## Framing differentiator (anti-templating, anti-cannibalisation)

This page is the **landlord-orientation page** on AEOI, NOT a CRS-due-diligence-mechanics page for banks. The page answers four core questions a landlord asks:

1. **What gets reported about me, by whom, to whom?** (Foreign banks report UK-resident account holders' balances and income to HMRC; UK banks report non-UK-resident account holders to the home tax authority. Platforms (Airbnb, Booking.com, Vrbo) report rental income paid to hosts to HMRC and the host's country of residence under SI 2023/817. The reporting is annual, automatic, no taxpayer action required.)
2. **What is the practical consequence for an expat landlord with retained UK BTL?** (HMRC has the data flow before the landlord files self-assessment. The "I'm offshore so HMRC won't notice" mental model is dead. The Connect data warehouse cross-matches AEOI-inbound bank data with NRL scheme returns and NRCGT 60-day returns; discrepancies trigger compliance letters.)
3. **What is the penalty exposure for historical undeclared offshore matters?** (FA 2017 Sch 18 FTC: 200% of PLR base, 100% floor with full disclosure. FA 2015 Sch 21 Cat-2 / Cat-3 uplift: 1.5x or 2x on standard Sch 24 percentages. Cat-3 territory + deliberate behaviour + prompted disclosure = 100% × 2 = 200% — economic-write-off territory.)
4. **What is the correction route?** (HMRC Worldwide Disclosure Facility (WDF) via Digital Disclosure Service (DDS). Voluntary, unprompted disclosure unlocks the Sch 24 mitigation floor (0% careless / 20% deliberate). Sessions tax-tips copy walks the disclose-before-letter-arrives playbook.)

The framing differentiator is the **landlord-specific exposure map**:

1. **Expat landlords retaining UK rental property.** Most common scenario: UK national emigrates, keeps a BTL portfolio, lets through letting agent under NRL scheme. AEOI dimension: the landlord's UK bank account (where rent net of NRL withholding lands) is reported by the UK bank to the host country under CRS. The host country sees the UK-source income whether or not it's declared locally. Sessions must walk: this is the host country's tax authority seeing the data, not necessarily a UK enforcement event — but the host country's response may include sharing back with HMRC under DTA Article 26 (exchange of information).
2. **Non-resident landlords with offshore banking.** A landlord resident overseas who pools UK rental income in an offshore account: HMRC sees the offshore balance via inbound CRS reporting from the offshore-bank jurisdiction. If the landlord has not registered under NRL scheme + filed UK SA, the discrepancy between AEOI-reported balance and zero UK declared income is the Connect flag that triggers HMRC contact.
3. **UK landlords with overseas property income.** Foreign property income is UK-taxable on UK residents (subject to DTA relief under Article 6 + foreign tax credit). The overseas property income flows into a foreign bank account → CRS-reported to HMRC. UK landlord with non-declaration of overseas rents is a classic FTC scenario; the 200%-with-100%-floor penalties bite.
4. **Platform-reported short-term let income.** SI 2023/817 (DAC7-equivalent) requires Airbnb / Booking.com / Vrbo / others to report host income to HMRC annually. UK serviced-accommodation hosts cannot rely on under-declaration: the platform reports the gross to HMRC; the SA tax-return must reconcile. Sessions on AEOI must include the platform-reporting layer explicitly.
5. **The FATCA + US-citizen-landlord overlay.** US citizens (including dual UK/US nationals) face the FATCA reporting layer on top of CRS — US banks report to IRS, foreign banks report US-person accounts to IRS via the foreign jurisdiction's FATCA IGA. UK-resident US-citizen landlords with UK rental property have full triple-reporting exposure: UK SA, IRS Form 1040 + FBAR, AEOI cross-reporting between HMRC and IRS.
6. **The Connect cross-match architecture.** AEOI is one input; Land Registry (UK property ownership), Companies House (corporate ownership of UK property), NRL scheme returns, NRCGT 60-day returns, and self-assessment are others. Connect's algorithmic risk-rating surfaces discrepancies; sessions describe this in factual terms not as a deterrent fiction.
7. **The Worldwide Disclosure Facility as the operational correction route.** WDF via DDS unlocks Sch 24 mitigation. Sessions tax-tips copy walks the unprompted-disclosure timing playbook (disclose before the OTM-equivalent letter arrives) and the document discipline (contemporaneous explanation; behaviour-category framing; reasonable-care evidence where relevant).

Sibling cross-links: existing site pages on NRL scheme (`non-resident-landlord-scheme-uk-complete-guide`, `nrl-approval-receive-rent-gross-hmrc-guide`, `nrl-withholding-tax-20-percent-basic-rate-deduction`, `nrl-scheme-letting-agents-quarterly-returns-mechanics`); `non-resident-landlord-self-assessment-filing-requirements`; existing NRCGT pages (`non-resident-cgt-selling-uk-property-overseas-guide`, `non-resident-cgt-uk-property-rates-reporting`); `register-of-overseas-entities-roe-annual-update-statement-non-resident-landlords` (parallel transparency regime); `iht-non-resident-uk-property-april-2025-residence-test`; `trf-qualifying-overseas-capital-what-can-be-designated-non-doms`; B6 (`are-you-leaving-the-uk-permanently`) — for departure mechanics; B7 (`arriving-in-the-uk`); B17 (`changes-nrl-companies`) — for the 2020 CT shift for non-resident companies; B19 (`do-i-have-to-pay-uk-tax`); B20 (`dont-pay-twice-an-introduction-to-tax-treaties`); existing pillar pages on HMRC Connect / disclosure facilities; existing LPC-cluster pages from Bucket A.

Cannibalisation differentiator: no direct sibling exists on the site. The closest adjacencies are RoE (parallel transparency regime — sessions cross-link and distinguish), NRCGT 60-day reporting (a UK domestic discovery route — AEOI is the international counterpart), and the Bucket A LPC voluntary-disclosure pages (LPC is for UK-source rental non-compliance; AEOI sits one layer up as the international information-flow architecture that feeds HMRC's awareness in the first place).

## Key questions this page must answer
1. **What is Automatic Exchange of Information (AEOI) and what frameworks does it cover?** (CRS — OECD multilateral, ~110+ jurisdictions; FATCA — US bilateral; DAC2 — EU legacy; DAC7-equivalent (SI 2023/817) — digital platform reporting; MDR (SI 2023/38) — cross-border arrangement disclosure. UK implementation via SI 2015/878 for CRS/FATCA/DAC2.)
2. **What information gets reported under CRS?** (Account holder name, address, jurisdiction(s) of tax residence, TIN, account number, account balance at year-end, gross interest / dividends / proceeds from sale or redemption of financial assets credited during the year. Custody accounts, depository accounts, equity / debt interests in investment entities are all in scope.)
3. **Who is reported about — what defines "reportable person"?** (Account holders who are tax-resident in a CRS-participating jurisdiction OTHER than the jurisdiction of the bank. UK bank's UK-resident customer is NOT reported to anyone — they're already in the UK system. UK bank's overseas-resident customer IS reported to the overseas jurisdiction. Bank applies due-diligence rules at SI 2015/878 Reg 3 + CRS Schedule.)
4. **How does AEOI interact with the NRL scheme?** (NRL is the UK-domestic statutory withholding regime for non-resident landlords' UK rental income (HP §17.5 + §10). AEOI is the international information-flow layer that operates independently. A non-resident landlord with UK BTL income has BOTH: NRL withholding by tenant / agent, AND AEOI reporting from UK bank to home jurisdiction on the post-tax rent that lands in the bank account.)
5. **How does AEOI interact with NRCGT 60-day reporting?** (NRCGT (HP §17.4) is the UK-domestic disposal-reporting obligation. AEOI sees the proceeds landing in the bank account. HMRC's Connect cross-matches: where AEOI-inbound data shows a large lump sum into the offshore account of a UK property-owning non-resident, and no NRCGT 60-day return has been filed against the corresponding Land Registry-recorded disposal, the discrepancy is the Connect flag.)
6. **What is the FA 2017 Sch 18 RTC/FTC regime?** (RTC = Requirement to Correct, window 6 April 2017 - 30 September 2018, now CLOSED. FTC = Failure to Correct, applies indefinitely to historical offshore non-compliance not corrected by 30 Sept 2018. Penalty: 200% of offshore PLR base, 100% floor with full disclosure. Covers income tax, CGT, IHT offshore irregularities.)
7. **What is the FA 2015 Sch 21 Cat-2 / Cat-3 uplift?** (Sch 24 inaccuracy percentages multiplied by 1.5x (Cat-2 territories — moderately co-operative) or 2x (Cat-3 territories — non-co-operative). The Cat-2 / Cat-3 schedule is published by HMRC and updated periodically; Stage 2 verifies the current list. The uplift sits ON TOP of standard Sch 24; the maximum effective penalty is 100% × 2 = 200% (Cat-3 + deliberate + concealed + prompted).)
8. **What is the Worldwide Disclosure Facility (WDF)?** (HMRC's standing voluntary-disclosure track for offshore matters, launched September 2016. Submitted via the Digital Disclosure Service (DDS). Unprompted disclosure unlocks the Sch 24 mitigation floor (0% careless / 20% deliberate). The WDF is the operational correction route for landlords with historical undeclared offshore matters.)
9. **What is the DAC7-equivalent platform reporting under SI 2023/817?** (Digital platform operators (Airbnb, Booking.com, Vrbo, others) must annually report seller / host income data to HMRC and to the host's country of residence under the OECD Model Rules. First reporting cycle 2024 calendar year (reported in 2025). Reportable data: host identity, address, TIN, gross consideration, number of activities. Sessions on serviced accommodation must walk this layer.)
10. **What does AEOI mean for UK-resident US-citizen landlords?** (FATCA adds a parallel reporting layer: foreign banks report US-person accounts to IRS via the foreign jurisdiction's FATCA IGA. UK-resident US citizens with UK property have UK SA + IRS Form 1040 + FBAR (Treasury Form 114) + AEOI cross-reporting. The dual-citizen layer is uniquely complex.)
11. **Can AEOI data be used by HMRC as the basis for an assessment?** (Yes. AEOI data is HMRC discovery information for Sch 33 para 21 (ATED) / TMA 1970 s.29 (income tax / CGT) discovery purposes. Time limits: 4 years (no fault) / 6 years (careless) / 12 years (offshore — extended time limit under FA 2019 amending TMA 1970 s.36A) / 20 years (deliberate). The 12-year offshore time limit is a Wave 2 extension lock — sessions must reference both the underlying TMA 1970 s.36 architecture and the FA 2019 s.36A offshore-matters extension.)
12. **What is HMRC Connect and how does it use AEOI data?** (HMRC's data-warehouse and risk-rating system. Aggregates AEOI inbound, Land Registry, Companies House, banking records, NRL / NRCGT / SA returns, DVLA, third-party data. Algorithmic discrepancy-detection surfaces non-disclosure cases. Sessions describe Connect factually per HMRC's published Connect overview — not as a deterrent fiction.)

## Manager pre-decisions placeholder
- Category routing: `non-resident-landlord-tax` (canonical fit — AEOI affects expat / non-resident / offshore-banking landlords). Alternative: `property-types-and-specialist-tax` if manager prefers the cross-cluster placement. Manager confirms.
- Worked-example numbers: Stage 2 must verbatim-verify SI 2015/878 (regs 3, 4, 6, 7, 10, 13, 14, 15, 21 + CRS / FATCA / DAC2 references), SI 2023/817 (platform operator reporting), SI 2023/38 (MDR — cross-border arrangements), FA 2017 Sch 18 (RTC/FTC — 200% base + 100% floor + 30 Sept 2018 deadline), FA 2015 Sch 21 (Cat-2 1.5x + Cat-3 2x territory uplift), FA 2007 Sch 24 (underlying inaccuracy percentages), TMA 1970 s.36A FA 2019 (12-year offshore time limit). Cat-2 / Cat-3 territory schedule against current gov.uk list.
- Cross-link targets: existing NRL scheme cluster (HP §17.5); NRCGT pages (HP §17.4); RoE page; Worldwide Disclosure Facility / DDS pages; B6 / B7 / B17 / B19 / B20; Bucket A LPC voluntary-disclosure pages; existing pillar pages on Connect / discovery time-limits.

## Stage 2 research target list — VERIFIED URLs

### Authority URLs (RUN session WebFetches at write time per §16.35)

- **`https://www.legislation.gov.uk/uksi/2015/878/contents/made`** — SI 2015/878 International Tax Compliance Regulations 2015 (CRS + FATCA + DAC2 UK implementation). RUN session WebFetches verbatim at write — LOAD-BEARING.
- **`https://www.legislation.gov.uk/uksi/2023/817`** — SI 2023/817 Platform Operators (Due Diligence and Reporting Requirements) Regulations 2023 (DAC7-equivalent digital platform reporting). RUN session WebFetches verbatim at write.
- **`https://www.legislation.gov.uk/uksi/2023/38`** — SI 2023/38 International Tax Enforcement (Disclosable Arrangements) Regulations 2023 (MDR — cross-border arrangements).
- **`https://www.legislation.gov.uk/ukpga/2017/32/schedule/18`** — FA 2017 Sch 18 (RTC/FTC offshore-penalty escalator — 200% PLR base + 100% disclosure floor + 30 September 2018 RTC deadline). RUN session WebFetches verbatim at write — LOAD-BEARING.
- **`https://www.legislation.gov.uk/ukpga/2015/11/schedule/21`** — FA 2015 Sch 21 (Cat-2 / Cat-3 offshore territorial uplift). RUN session WebFetches verbatim at write.
- **`https://www.legislation.gov.uk/ukpga/2007/11/schedule/24`** — FA 2007 Sch 24 (Inaccuracy penalty regime — behaviour percentages + mitigation matrix).
- **`https://www.legislation.gov.uk/ukpga/1970/9/section/36A`** — TMA 1970 s.36A (12-year offshore time limit — FA 2019 amendment).
- **`https://www.legislation.gov.uk/ukpga/1970/9/section/29`** — TMA 1970 s.29 (discovery assessment for income tax / CGT).
- **`https://www.legislation.gov.uk/ukpga/1970/9/section/36`** — TMA 1970 s.36 (4 / 6 year discovery time limits architecture).
- **`https://www.gov.uk/government/publications/worldwide-disclosure-facility-make-a-disclosure`** — HMRC Worldwide Disclosure Facility (WDF) guidance.
- **`https://www.gov.uk/guidance/digital-disclosure-service`** — HMRC Digital Disclosure Service (DDS) guidance.
- **`https://www.gov.uk/government/publications/automatic-exchange-of-information-introduction`** — HMRC AEOI introduction.
- **`https://www.gov.uk/hmrc-internal-manuals/international-exchange-of-information`** — HMRC International Exchange of Information Manual (IEIM).
- **`https://www.gov.uk/hmrc-internal-manuals/compliance-handbook/ch80000`** — HMRC Compliance Handbook on Sch 24 inaccuracy penalties.
- **`https://www.gov.uk/hmrc-internal-manuals/compliance-handbook/ch51000`** — HMRC Compliance Handbook on Sch 21 offshore Cat-2 / Cat-3 (incl current territory schedule).
- **`https://www.gov.uk/hmrc-internal-manuals/compliance-handbook/ch123000`** — HMRC Compliance Handbook on Sch 18 RTC/FTC.
- **`https://www.oecd.org/tax/automatic-exchange/common-reporting-standard/`** — OECD CRS portal.

### Competitor URLs (session-side WebSearch at write time)

`<!-- competitor section: RUN session WebSearch at write time. Suggested queries: "AEOI Common Reporting Standard UK landlord", "CRS reporting non-resident landlord UK", "FATCA UK citizen landlord US tax", "DAC7 Airbnb platform reporting landlord", "Worldwide Disclosure Facility offshore property", "FA 2017 Sch 18 failure to correct offshore landlord", "HMRC offshore Category 2 Category 3 penalty". Aim 4-6 specialist firm-side pages — BDO international tax / Smith & Williamson / Saffery Champness international / Crowe UK / Buzzacott / RSM international / Grant Thornton international. Verify each with httpx + follow_redirects=True before listing. Watch for stale "AEOI is voluntary information sharing" framings (wrong — it's an SI 2015/878 statutory obligation); flag for §16.43 mechanical back-patch if found. -->`

### HMRC manual anchors

- HMRC International Exchange of Information Manual (IEIM) — the operative HMRC manual on CRS / FATCA / DAC2 / DAC7-equivalent / MDR architecture.
- HMRC Compliance Handbook CH80000+ (Sch 24 inaccuracy — behaviour grading + prompted/unprompted matrix).
- HMRC Compliance Handbook CH51000+ (Sch 21 offshore Cat-2 / Cat-3 — current territory schedule).
- HMRC Compliance Handbook CH123000+ (Sch 18 RTC/FTC).
- HMRC Enquiry Manual on Connect data sources.
- HMRC Worldwide Disclosure Facility published guidance.

### Case-law

- *HMRC v Tooth* [2021] UKSC 17 — Supreme Court deliberate-inaccuracy standard. Relevant for offshore-matter penalty grading where the original non-disclosure is characterised as deliberate vs careless.
- *Perrin v HMRC* [2018] UKUT 156 (TCC) — Upper Tribunal four-stage reasonable-excuse framework. Relevant to offshore non-disclosure narratives where landlord asserts no awareness of UK reporting obligation.
- *Hicks v HMRC* [2018] UKFTT — FTT on offshore reasonable-excuse standard for non-domiciled remittance-basis users (older but illustrative).
- Tribunal cases on Cat-3 territory classification challenges — RUN session confirms availability before citing.

### Legislation anchors (RUN session WebFetches at write time per §16.35)

- SI 2015/878 (CRS + FATCA + DAC2 UK implementation — Regs 3 / 4 / 5 / 6 / 7 / 8 / 9 / 10 / 13 / 14 / 15 / 16 / 21 VERBATIM).
- SI 2023/817 (Platform operator reporting — DAC7-equivalent VERBATIM).
- SI 2023/38 (MDR cross-border arrangements VERBATIM).
- FA 2017 Sch 18 (RTC/FTC — 200% PLR base + 100% disclosure floor + 30 September 2018 deadline VERBATIM).
- FA 2015 Sch 21 (Cat-2 1.5x + Cat-3 2x territorial uplift VERBATIM + current territory schedule at gov.uk).
- FA 2007 Sch 24 (Inaccuracy penalty regime — behaviour percentages VERBATIM).
- TMA 1970 s.36A FA 2019 (12-year offshore time limit VERBATIM).
- TMA 1970 s.29 (discovery assessment).
- TMA 1970 s.36 (4 / 6 year time limits).
- TIOPA 2010 Part 2 Chapter 2 (DTA exchange of information — Article 26 architecture).

## Worked-example data (RUN session uses these as canvas)

### Example 1 — The AEOI information-flow map for a typical expat landlord (the page's first concrete artefact)

Render as semantic HTML `<ol>` or `<table>`. This is the architecture-anchor that resolves the "I'm offshore so HMRC won't notice" myth:

1. **UK rent collected by letting agent.** £30,000 gross rent paid by tenant to letting agent on UK BTL.
2. **NRL scheme withholding by agent (HP §17.5).** Agent withholds 20% basic-rate IT (£6,000) unless landlord holds NRL1 approval to receive rent gross. Net rent £24,000 (or £30,000 if NRL1 approved).
3. **Net rent transferred to landlord's UK bank account.** Standard practice — landlord has a UK retained bank account to receive rents.
4. **UK bank's AEOI reporting (under SI 2015/878 + CRS).** UK bank applies CRS due-diligence (Reg 3): identifies landlord as tax-resident in (say) Dubai. Reports annually to HMRC: account holder name, Dubai TIN, account balance at year-end, gross interest credited.
5. **HMRC reports onward to UAE tax authority (under MCAA).** UK bank's account data flows from HMRC to UAE under reciprocal CRS exchange. UAE tax authority sees the landlord's UK bank balance + activity.
6. **Reverse leg — landlord's UAE bank reports to HMRC.** UAE bank (under UAE's CRS implementation) reports landlord's UAE account to HMRC because landlord may also have UK tax residence or because landlord is "reportable" under UK's perspective. HMRC sees the UAE balance.
7. **HMRC Connect cross-match.** Connect aggregates: AEOI inbound from UAE; NRL withholding receipts from UK agent; SA filings if any. Discrepancies flagged for review.
8. **Compliance letter triggered if discrepancy.** Where AEOI-reported activity > declared income on SA, HMRC issues compliance letter (OTM letter or formal enquiry under TMA 1970 s.29).

**Practical lesson:** the data flows whether or not the landlord files anything. The "offshore = invisible" mental model is dead. Compliance discipline (NRL registration + SA filing or NRL1 + voluntary disclosure of any historical non-compliance) is the only defensive posture.

### Example 2 — The expat-landlord historical non-disclosure scenario + WDF correction

Mr Khoury (Lebanese national; UK-resident 2010-2018; relocated to Dubai 2018 retaining a UK BTL portfolio of 3 flats acquired between 2012-2017). Mr Khoury's letting agent has been operating NRL withholding properly since 2018 (£12,000/year withheld at 20%); Mr Khoury never registered NRL1 for gross receipt; never filed UK SA since 2018; pooled net rents into a UAE bank account.

**AEOI exposure analysis (current as at 2026):**

- UK bank account where rents land: AEOI-reported to UAE since 2018 (Mr Khoury's UAE tax-resident status). UAE tax authority has c. 8 years of UK account data.
- UAE bank where rents pooled: AEOI-reported to HMRC since 2018 (Mr Khoury's UK historical residence + ongoing UK property ownership may make him "reportable" for UK purposes; specific facts vary).
- HMRC Connect cross-match: Mr Khoury's NRL withholding receipts (~£96,000 cumulative across 8 years × £12,000/year) vs zero SA filings vs AEOI-reported UAE balance growth = clear discrepancy.
- Likely Connect flag triggered; OTM-equivalent letter probably imminent.

**Historical UK tax position (the under-declared amount):**

- Mr Khoury's UK rental profits (after allowable deductions) per year: assume £35,000 gross rent + £8,000 deductible expenses = £27,000 net taxable profit per year (cumulative £216,000 over 8 years).
- IT due at landlord's marginal rate: assume basic-rate band exhausted post-NRL withholding → higher-rate 40% on the surplus. £216,000 × 40% = £86,400 IT before NRL credit.
- NRL withholding already paid: £96,000.
- Net IT position: NRL withholding broadly covered the IT liability — POSSIBLY no significant under-declared tax IF Mr Khoury's only UK-source income was the rent and no balancing payment was due.
- BUT: failure to file SA itself is a compliance breach; Sch 55 daily-penalty escalator applies. AND: any year where rental profits exceeded the NRL-covered amount creates a balancing IT liability under-declared.

**WDF correction route:**

- Mr Khoury's adviser submits WDF disclosure via DDS covering 2018/19 through 2025/26.
- Disclosure: 8 years of NRL-scheme compliance + rental-profit calculations + SA late-filing acknowledgement + any balancing IT liability paid in full + interest under FA 2009 s.101.
- Behaviour grading: CARELESS (Mr Khoury was unaware of SA filing obligation; reasonable-care evidence — typical expat-landlord scenario; not deliberate). Cat-2 offshore uplift likely (UAE assessment per gov.uk schedule at write time — Stage 2 verifies).
- Sch 24 unprompted-disclosure mitigation: careless unprompted 0% floor (per F-5 §27.2 — no 12-month qualifier on the floor); Cat-2 1.5x uplift on 0% = 0%. If Cat-1 territory: 0% on the Sch 24 careless-unprompted disclosure floor.
- Sch 55 late-filing penalty: separate from Sch 24; capped at the offshore-uplift if applicable.
- Total penalty exposure: minimal where unprompted disclosure timing held (BEFORE any HMRC contact / OTM letter).

**Alternative scenario — HMRC contact precedes disclosure:**

- Cat-2 prompted floor: 15% × 1.5 = 22.5%. On £86,400 (gross IT before NRL credit, or whatever the unpaid amount is): £19,440 penalty.
- Sch 55 late-filing: separately assessed.
- Timing matters: WDF before OTM letter is significantly cheaper than WDF after OTM letter.

**Operational lesson:** AEOI makes "wait and see" untenable for non-disclosed UK property income. Voluntary WDF disclosure is the cleanest route AND timing-before-HMRC-contact unlocks the lowest mitigation floors.

### Example 3 — The non-resident-landlord offshore-banking scenario

Mrs Olsson (Swedish national; never UK-resident; inherited a £900k London flat from a UK uncle in 2017; lets it via letting agent under NRL scheme; NRL withholding applied throughout; pools UK rents into a Swedish bank account). Mrs Olsson believes she has no UK filing obligation because "the agent handles everything".

**AEOI exposure analysis:**

- UK bank used by letting agent to remit net rents to Mrs Olsson: not directly AEOI-relevant if rents go straight to Sweden via SWIFT — no UK bank account in Mrs Olsson's name.
- Swedish bank account: AEOI-reports to HMRC because Mrs Olsson is "reportable" from a UK-perspective IF she has any UK tax-residence trigger (she has none — never UK-resident). BUT Swedish bank's CRS reporting to HMRC may still occur if the bank's due-diligence categorises her based on UK address-on-file (the flat) or UK source income credited.
- Practical position: limited direct AEOI exposure for Mrs Olsson because she's fully Swedish-resident with all banking in Sweden. The exception: if rents are remitted via a UK bank account in Mrs Olsson's name, that account is AEOI-reported to Sweden (which she already knows about).

**UK tax position:**

- NRL scheme is the operative UK regime: agent withholds 20%; Mrs Olsson can (i) register for NRL1 to receive rent gross + file UK SA annually; (ii) leave NRL withholding in place + optionally file SA to claim allowances + offset deductible expenses.
- Mrs Olsson has chosen route (ii) without SA filing — relying on NRL withholding as the final-tax position.
- This is broadly compliant for Mrs Olsson's situation IF the NRL-withheld amount approximates her actual UK IT liability. For a higher-rate-band non-resident, the 20% NRL is incomplete; for a basic-rate-band non-resident with deductible expenses, the 20% NRL may even overpay.

**WDF relevance — limited:**

- WDF is for offshore non-compliance disclosure to HMRC. Mrs Olsson's scenario has no offshore non-compliance from HMRC's perspective (NRL withholding handled; UK SA not strictly required if NRL is sufficient).
- The risk: if Mrs Olsson sells the flat without filing NRCGT 60-day return (HP §17.4), Connect cross-matches AEOI / Land Registry / NRL data and flags. Stage 2 / RUN session must emphasise the NRCGT 60-day discipline as the most-likely AEOI-driven enforcement vector for non-resident landlords.

**Practical lesson:** non-resident landlords with offshore banking + UK BTL income + NRL withholding may have limited AEOI exposure on the rental side BUT must file NRCGT 60-day returns on disposal to avoid the AEOI / Land Registry / NRL Connect cross-match flagging on sale proceeds landing.

### Example 4 — The DAC7-equivalent platform reporting scenario (Airbnb host)

Mr Hayek (UK-resident individual; lets a London flat on Airbnb generating c. £25,000/year gross). For 2024 calendar year (first DAC7-equivalent reporting cycle), Airbnb reports Mr Hayek's host activity to HMRC under SI 2023/817.

**Reported data (per SI 2023/817):**

- Host identity (name, address, TIN).
- UK property address.
- Gross consideration (£25,000).
- Number of activities (let nights).
- VAT registration status (if applicable).

**HMRC Connect implications:**

- Connect cross-matches Airbnb-reported £25,000 against Mr Hayek's SA filing for 2024/25.
- If Mr Hayek's SA shows £25,000 rental income or higher: clean match; no flag.
- If Mr Hayek's SA shows £15,000 (under-declared): discrepancy flagged; OTM letter likely.
- If Mr Hayek's SA shows no rental income at all: clear non-disclosure flag; formal enquiry under TMA 1970 s.29 likely.

**Penalty exposure for under-declared scenario:**

- Sch 24 inaccuracy on £10,000 under-declared income. Behaviour: careless at minimum (Mr Hayek should have known Airbnb reports; SI 2023/817 widely-publicised). Possibly deliberate-not-concealed if Mr Hayek understood the reporting and deliberately omitted.
- IT due on £10,000 at marginal rate (assume 40% higher-rate band): £4,000 IT.
- Sch 24 careless prompted (HMRC contact via OTM letter): 15-30% × £4,000 = £600-£1,200 penalty.
- Sch 24 deliberate not concealed prompted: 35-70% × £4,000 = £1,400-£2,800 penalty.
- NIC potentially applicable on FHL income (HP §17.4 / FHL-specific rules).

**Practical lesson:** Airbnb / Booking.com / Vrbo hosts cannot rely on under-declaration post-2024 calendar year (first DAC7-equivalent reporting cycle). The platform reports gross; the SA must reconcile. Honesty is operationally the only viable path; WDF / unprompted-correction disclosure remains available for historical (pre-2024) under-declaration.

### Example 5 — The UK-resident US-citizen-landlord triple-reporting scenario

Mrs Henderson (US citizen; UK-resident since 2010; holds a £1.2m London flat personally as primary residence + a £800k London BTL for income). Triple reporting:

- **UK SA:** Mrs Henderson files UK SA each year declaring her UK BTL rental income, foreign earnings (her US employer salary), and any worldwide income subject to UK arising-basis taxation (or remittance basis pre-2025 / FIG regime post-2025 per HP §17.6 / §17.8).
- **IRS Form 1040 + FBAR:** As a US citizen, Mrs Henderson files US tax returns on worldwide income REGARDLESS of US residency. She owes US IT on UK rental income, UK salary, UK investment income — subject to Foreign Tax Credit for UK tax paid. She also files FBAR (FinCEN Form 114) for any non-US financial account > USD $10,000 aggregate at any point during the year.
- **AEOI cross-reporting:** Mrs Henderson's UK bank accounts are FATCA-reported by the UK bank to IRS (via HMRC under the UK-US FATCA IGA). Her US bank accounts are CRS-reported to HMRC under the US-UK reciprocal exchange (limited — US does not participate in CRS but exchanges under FATCA reciprocity and bilateral arrangements).

**Compliance triangle:**

- UK-side: ensure UK SA correctly captures worldwide income (under arising basis or FIG election); FA 2017 Sch 18 FTC exposure for any historical offshore non-compliance.
- US-side: ensure US 1040 + FBAR correctly captures UK income + accounts; IRS Foreign Tax Credit claim for UK tax to avoid double-taxation.
- Cross-reporting: UK and US tax authorities can each see the other's data; discrepancy is detectable on either side; double-non-disclosure is operationally impossible.

**Penalty exposure for non-compliance:**

- UK Sch 24 + Cat-2 offshore uplift (US is generally Cat-1 — friendly co-operative jurisdiction — but Cat-2 / Cat-3 may apply for specific account-jurisdictions). 
- US IRS penalties: substantial — including FBAR penalties up to USD $10,000 per non-willful violation + USD $100,000+ per willful violation; IRS Streamlined Procedures for non-willful historical non-compliance.
- The compliance discipline: engage dual-qualified UK + US tax adviser; ensure both filings consistent; use UK FTC for US tax + US FTC for UK tax to avoid economic double-taxation.

**Practical lesson:** US-citizen UK-resident landlords have uniquely complex compliance + uniquely high AEOI visibility. Both UK SA and US 1040 must be correctly filed; cross-reporting makes single-side non-disclosure ineffective.

### Example 6 — Misframings the page must correct (verbatim do-not-write list)

- **Misframe 1:** "AEOI is voluntary information sharing." FALSE — SI 2015/878 imposes a STATUTORY obligation on UK financial institutions to identify reportable accounts (Reg 3) and report annually to HMRC (Reg 6). Penalties at Reg 13 / 14 / 21 for non-compliance. AEOI is a mandatory regulatory regime.
- **Misframe 2:** "Only US citizens are affected by FATCA." MISLEADING — FATCA imposes obligations on FOREIGN financial institutions to identify and report US-PERSON accounts. UK landlords who are NOT US citizens but who have US-bank accounts (e.g. for US investment property) face FATCA from the US-bank side. UK landlords who are US citizens face FATCA on all their non-US accounts.
- **Misframe 3:** "CRS doesn't apply to property income." MISLEADING — CRS reports financial-account data (bank balances, interest, dividends, proceeds from sale of financial assets). Property income flows INTO bank accounts and the resulting account activity is CRS-reportable. Indirect but operationally complete coverage.
- **Misframe 4:** "If I never lived in the UK, AEOI doesn't affect me." FALSE for non-resident UK landlords — UK banks (including those used by letting agents) AEOI-report non-UK-resident account holders to the home jurisdiction. The non-resident landlord's home tax authority sees the UK-source data.
- **Misframe 5:** "The Worldwide Disclosure Facility is only for tax avoidance schemes." FALSE — WDF is for any offshore non-compliance disclosure to HMRC: undeclared overseas property income; missed NRCGT filings; un-declared offshore-account interest; historical non-disclosure of any offshore matter. It is a standard correction route, not a tax-avoidance-scheme track.
- **Misframe 6:** "The FA 2017 RTC window is still open." FALSE per FA 2017 Sch 18 — the RTC (Requirement to Correct) window closed 30 September 2018. Post-RTC, the FTC (Failure to Correct) regime applies indefinitely to historical offshore non-compliance; 200% PLR base + 100% disclosure floor pricing.
- **Misframe 7:** "Sch 21 Cat-2 / Cat-3 uplift only applies to deliberate behaviour." FALSE per FA 2015 Sch 21 — the uplift applies across all Sch 24 behaviour categories (careless, deliberate, deliberate-and-concealed). Cat-2 = 1.5x; Cat-3 = 2x. So Cat-3 careless prompted = 30% × 2 = 60% maximum.
- **Misframe 8:** "Airbnb hosts can avoid DAC7 reporting by using cash bookings." FALSE — SI 2023/817 captures ANY consideration paid through the platform regardless of payment method. The platform's reporting obligation attaches to the platform-facilitated transaction, not the payment mechanism.
- **Misframe 9:** "HMRC Connect is an algorithm that finds tax evaders." MISLEADING — Connect is a data warehouse and risk-rating system. It aggregates AEOI inbound, Land Registry, Companies House, banking data, returns. Risk-rating algorithms surface discrepancies for HUMAN review. Describe factually per HMRC's published Connect overview; avoid deterrent-fiction framing.
- **Misframe 10:** "Non-disclosure of offshore matters older than 4 years is time-barred." FALSE per TMA 1970 s.36A FA 2019 — the offshore-matters time limit is 12 years (vs 4 years for UK matters, 6 years for careless, 20 years for deliberate). Offshore historical non-compliance is reachable for 12 years.
- **Misframe 11:** "WDF unprompted disclosure means no penalty." MISLEADING — unprompted disclosure unlocks the LOWEST mitigation FLOOR (0% careless / 20% deliberate). Disclosure does not guarantee zero penalty; HMRC retains discretion to assess at higher percentages where behaviour grading is deliberate or facts are aggravating. The disclosure-timing benefit is significant but not absolute.
- **Misframe 12:** "Brexit ended DAC2 / AEOI between UK and EU." FALSE — DAC2 (the EU directive) no longer applies to the UK as a Member State, but the underlying CRS exchange continues through the OECD Multilateral Competent Authority Agreement (MCAA). UK exchanges with all EU CRS participants under MCAA. The directive-vs-MCAA distinction is technical; the operational reality of EU-UK AEOI continues unchanged.
- **Misframe 13:** "I can avoid AEOI by holding property in an offshore company." FALSE — corporate-holding structures don't escape AEOI: the company's bank account is reportable under CRS in the company's tax-residence jurisdiction; the UK property remains visible via Land Registry; ATED applies to non-natural-person owners of £500k+ dwellings (HP §18); RoE applies to overseas-incorporated entities holding UK property (HP §11). The corporate veil is operationally transparent for tax-information purposes.

## FAQ expansion (RUN session polishes prose; 12-14 FAQs target)

1. **Q: What is Automatic Exchange of Information (AEOI)?**
   A: AEOI is the cross-border tax-data-sharing architecture under which banks and other financial institutions automatically report account-holder data to their domestic tax authority, which onward-shares to the account holder's tax-residence jurisdiction(s). The UK implements three main strands: CRS (OECD multilateral, ~110+ jurisdictions); FATCA (US bilateral); DAC2 (EU legacy + DAC7-equivalent platform reporting via SI 2023/817 + MDR under SI 2023/38). UK implementation primarily under SI 2015/878.

2. **Q: As a UK national living in Dubai with a UK BTL, am I affected by AEOI?**
   A: YES. Your UK bank account where rents land is AEOI-reported to the UAE tax authority annually under CRS. Your UAE bank account (if any) is AEOI-reported back to HMRC. HMRC's Connect data warehouse cross-matches your NRL scheme withholding receipts (filed by your UK letting agent) against your declared UK SA position (if any); discrepancies trigger compliance letters. "Offshore = invisible" is no longer the operational reality.

3. **Q: What data gets reported under CRS?**
   A: Per OECD CRS standard + SI 2015/878 implementation: account holder name, address, jurisdiction(s) of tax residence, TIN, account number, account balance at year-end, gross interest / dividends / proceeds from sale or redemption of financial assets credited during the year. Custody accounts, depository accounts, equity / debt interests in investment entities are all in scope.

4. **Q: I'm an Airbnb host — does Airbnb report me to HMRC?**
   A: YES from 2024 calendar year onwards under SI 2023/817 (the DAC7-equivalent UK Platform Operators Reporting Regulations). Airbnb annually reports host identity, property address, gross consideration, number of let-nights, VAT registration status. HMRC's Connect cross-matches against your SA filing; under-declaration is detectable. Same applies to Booking.com, Vrbo, and other digital platforms.

5. **Q: What is the FA 2017 Sch 18 RTC / FTC regime?**
   A: RTC (Requirement to Correct): a 6 April 2017 - 30 September 2018 window to disclose historical offshore non-compliance under softer penalties. NOW CLOSED. FTC (Failure to Correct): applies indefinitely to offshore non-compliance NOT corrected by 30 September 2018. Penalty: 200% of offshore Potential Lost Revenue (PLR) base; mitigation floor 100% PLR with full disclosure. Covers income tax, CGT, IHT offshore irregularities. The FTC regime is permanent for historical matters.

6. **Q: What is the FA 2015 Sch 21 Cat-2 / Cat-3 territorial uplift?**
   A: Sch 24 inaccuracy penalty percentages are MULTIPLIED by 1.5x (Cat-2 territories — moderately co-operative) or 2x (Cat-3 territories — non-co-operative) where the inaccuracy concerns an offshore matter or offshore transfer. The Cat-2 / Cat-3 schedule is published by HMRC at gov.uk and updated periodically. So Cat-3 deliberate-and-concealed prompted = 100% (Sch 24 max) × 2 = 200% maximum penalty. Most landlord-relevant offshore jurisdictions sit in Cat-1 or Cat-2; very few Cat-3 cases.

7. **Q: What is the Worldwide Disclosure Facility (WDF)?**
   A: HMRC's standing voluntary-disclosure track for offshore non-compliance, launched September 2016. Submitted via HMRC's Digital Disclosure Service (DDS). Unprompted disclosure (BEFORE HMRC contact / OTM letter) unlocks the lowest Sch 24 mitigation floors (0% careless / 20% deliberate). The WDF is the operational correction route for landlords with historical undeclared offshore matters. Standard process: registration → 90 days to compute liability → submission of disclosure + payment of tax + interest + agreed penalty.

8. **Q: Does AEOI affect non-resident landlords with offshore banking + UK BTL?**
   A: PARTLY. Direct AEOI exposure depends on which banks are involved. The bigger risk is HMRC's Connect cross-match on DISPOSAL — when the UK property is sold, AEOI-reported sale-proceed inflows + Land Registry-recorded UK disposal + missing NRCGT 60-day return (HP §17.4) = clear Connect flag. The NRCGT 60-day discipline is critical for non-resident landlords; AEOI is the discovery vector.

9. **Q: As a UK-resident US citizen landlord, what's my exposure?**
   A: Triple. (a) UK SA on UK-source + worldwide income; (b) US Form 1040 + FBAR on worldwide income (US citizens taxed on worldwide income regardless of residence); (c) AEOI cross-reporting between HMRC and IRS under the UK-US FATCA IGA + bilateral arrangements. Both authorities see your accounts; double-non-disclosure is operationally impossible. Engage dual-qualified UK + US tax adviser; use Foreign Tax Credit on both sides to avoid economic double-taxation.

10. **Q: Can HMRC use AEOI data as the basis for an assessment?**
    A: YES. AEOI data is HMRC discovery information for TMA 1970 s.29 (income tax / CGT) / Sch 33 para 21 (ATED) purposes. Time limits: 4 years (no fault); 6 years (careless); 12 years offshore matters per TMA 1970 s.36A (FA 2019 amendment); 20 years (deliberate). The 12-year offshore time limit means historical undeclared offshore matters are reachable for over a decade.

11. **Q: My adviser says Brexit ended UK-EU AEOI. Is that right?**
    A: NO. Post-Brexit, the EU Directive on Administrative Cooperation 2 (DAC2) no longer applies to the UK as an EU Member State. BUT the underlying CRS exchange continues through the OECD Multilateral Competent Authority Agreement (MCAA). UK exchanges CRS data with all EU CRS participants under the MCAA. The directive-vs-MCAA distinction is technical; the operational AEOI flow between UK and EU is unchanged.

12. **Q: I have historical undeclared UK rental income for 8 years and want to come clean. What's the route?**
    A: Worldwide Disclosure Facility (WDF) via Digital Disclosure Service (DDS) if offshore matters are involved; or Let Property Campaign (LPC) if purely UK-source rental non-compliance (Bucket A cluster). WDF + LPC are HMRC's preferred voluntary-disclosure tracks. Voluntary disclosure BEFORE any HMRC contact unlocks the lowest mitigation floors. Engage specialist tax adviser to scope the disclosure correctly and minimise penalty exposure.

13. **Q: HMRC Connect — should I be worried?**
    A: Describe HMRC Connect factually: a data warehouse + risk-rating system aggregating AEOI inbound, Land Registry, Companies House, banking data, NRL / NRCGT / SA returns, DVLA, third-party data including Airbnb / Booking.com. Algorithmic discrepancy-detection surfaces non-disclosure cases for human review. Connect doesn't "find" non-compliance autonomously — it surfaces probabilities for HMRC officers to investigate. Realistic posture: file correctly; disclose any historical gaps voluntarily; Connect's surfacing rate is meaningful but not omniscient.

14. **Q: Does holding UK property in an offshore company avoid AEOI?**
    A: NO. The company's bank account is AEOI-reported in the company's tax-residence jurisdiction; the UK property remains visible via Land Registry; ATED applies to non-natural-person owners of £500k+ dwellings (HP §18); RoE (Register of Overseas Entities — ECTEA 2022, HP §11) requires beneficial-ownership disclosure to Companies House. Corporate-holding structures don't escape AEOI / property-tax visibility; they add compliance layers without reducing transparency.

## Universal rules + workflow stubs (RUN session follows)

### Voice + style (verbatim per §4.8)

- **No em-dashes** in body copy. Commas, parentheses, full stops, middle dots only.
- **Specific over generic.** Named statute (**SI 2015/878 VERBATIM** — Regs 3 / 6 / 10 / 13 / 14 / 21 + CRS / FATCA / DAC2 references; **SI 2023/817 VERBATIM** — DAC7-equivalent platform reporting; SI 2023/38 MDR; **FA 2017 Sch 18 VERBATIM** — RTC / FTC + 200% PLR base + 100% disclosure floor + 30 September 2018 deadline; **FA 2015 Sch 21 VERBATIM** — Cat-2 1.5x + Cat-3 2x territorial uplift; FA 2007 Sch 24 inaccuracy percentages; TMA 1970 s.29 + s.36 + **s.36A FA 2019 12-year offshore** time limits; TIOPA 2010 Part 2 Chapter 2 — DTA Article 26 exchange). Anonymised personas (Mr Khoury — Lebanese UAE; Mrs Olsson — Swedish; Mr Hayek — UK Airbnb host; Mrs Henderson — UK-resident US citizen) — no real names.
- **No real names.** No real ATED-specialist firms, banks, or counsel named.
- **Lead-gen architecture:** `<LeadForm>` auto-injected at footer. Inline aside-styled CTAs at four conversion moments: (i) after the AEOI information-flow map (Example 1 — the architecture-anchor); (ii) after the expat-landlord WDF walkthrough (Example 2 — the historical-non-disclosure conversion); (iii) after the DAC7-equivalent Airbnb walk (Example 4 — the platform-reporting conversion); (iv) after the US-citizen triple-reporting walk (Example 5 — the dual-citizen conversion).
- **CSS in markdown:** semantic HTML only — Example 1 information-flow map as `<ol>` or `<table>`; examples 2-5 as scenario-walked prose with `<ol>` for analyses. NO Tailwind utility classes.
- **FAQs:** 12-14 entries.
- **Body word count target:** 3,200-3,800 (landlord-orientation page; depth justified by multi-framework architecture (CRS + FATCA + DAC2 + DAC7-equivalent + MDR) + four landlord-specific exposure maps + WDF correction route + penalty stack).
- **Anti-templating:** open with the AEOI-makes-offshore-invisible-untenable framing per the framing differentiator — NOT with "automatic exchange of information is..." generic framing, NOT with "CRS is a global standard" lazy framing, NOT with parallel-structure to existing NRL / NRCGT pages. The reader needs the LANDLORD-SPECIFIC EXPOSURE MAP upfront.
- **Do-not-write GREP discipline (RUN session greps draft against ALL 13 misframings in Example 6):** especially Misframe 1 (AEOI voluntary myth), Misframe 5 (WDF only for avoidance schemes myth), Misframe 6 (RTC still open myth), Misframe 8 (Airbnb cash bookings escape myth), Misframe 10 (4-year time-bar offshore myth), Misframe 12 (Brexit ended EU AEOI myth), Misframe 13 (offshore-company-escapes-AEOI myth).
- **Quality bar (six checks per §9):** 0 em-dashes; 0 Tailwind class attrs; FAQ count matches frontmatter `faqs:` array; metaTitle ≤62 chars; metaDescription ≤158 chars; all internal `/blog/...` links resolve.

### 19-step workflow (verbatim per §7)

1. Read `house_positions.md` at session start (§10 + §16 + **§17 leaving the UK / expat + §17.4 NRCGT + §17.5 NRL scheme + §17.6 domicile reform** + **§11 RoE parallel transparency**).
2. Claim this page in `megawave3_page_tracker.md` (⬜ → 🟡 + UTC timestamp).
3. Read this brief end-to-end (esp framing differentiator + Example 1 information-flow map + Example 2 expat WDF + Example 3 non-resident offshore-banking + Example 4 DAC7 Airbnb + Example 5 US-citizen triple-reporting + 13 misframings + FAQ canvas).
4. Fetch + read competitor URLs via RUN session WebSearch.
5. Read closest-existing pages: existing NRL scheme cluster (`non-resident-landlord-scheme-uk-complete-guide` + sister pages); existing NRCGT cluster (`non-resident-cgt-selling-uk-property-overseas-guide` + sister); existing RoE page (`register-of-overseas-entities-roe-annual-update-statement-non-resident-landlords`); B6 `are-you-leaving-the-uk-permanently` + B7 `arriving-in-the-uk` (sibling cluster — cross-link); B17 `changes-nrl-companies` (2020 CT shift for non-resident companies — cross-link); B19 `do-i-have-to-pay-uk-tax` + B20 `dont-pay-twice-an-introduction-to-tax-treaties` (cross-link); Bucket A LPC voluntary-disclosure pages (cross-link). Existing pillars on HMRC Connect / disclosure facilities if any.
6. Plan H2/H3 outline: AEOI-offshore-invisible-untenable framing open → AEOI information-flow map (Example 1, first concrete artefact) → the three AEOI strands explained (CRS multilateral / FATCA US bilateral / DAC2 EU legacy + DAC7-equivalent platform reporting + MDR) → the four landlord-specific exposure maps (expat / non-resident offshore-banking / UK landlord with overseas property income / Airbnb host) → Example 2 expat WDF walkthrough → Example 3 non-resident offshore-banking → Example 4 DAC7 Airbnb → Example 5 US-citizen triple-reporting → FA 2017 Sch 18 FTC penalty escalator → FA 2015 Sch 21 Cat-2 / Cat-3 territorial uplift → WDF correction route via DDS → HMRC Connect cross-match factual description → 13 misframings → FAQ block → next-step CTA.
7. Verify factual claims per §16.35: WebFetch **SI 2015/878** (CRS + FATCA + DAC2 — Regs 3 / 6 / 10 / 13 / 14 / 21); **SI 2023/817** (DAC7-equivalent VERBATIM); SI 2023/38 (MDR); **FA 2017 Sch 18 VERBATIM** (RTC / FTC — 200% PLR base + 100% floor + 30 September 2018 deadline); **FA 2015 Sch 21 VERBATIM** (Cat-2 1.5x + Cat-3 2x — verify current territory schedule at gov.uk); FA 2007 Sch 24 (inaccuracy percentages); **TMA 1970 s.36A FA 2019** (12-year offshore time limit VERBATIM); TMA 1970 s.29 + s.36; TIOPA 2010 Part 2 Chapter 2 (DTA Article 26 exchange architecture). Verify HMRC IEIM + WDF + DDS + Connect-overview manual landings live.
8. Fetch hero image (international / data-flow / banking / expat-landlord aesthetic).
9. Write markdown at `Property/web/content/blog/automatic-exchange-of-information.md`.
10. Build clean.
11. Six verifications + 13-pattern do-not-write GREP.
12. Apply redirect repointing if needed (check `middleware.ts` for `aeoi` / `crs` / `automatic-exchange` / `wdf` stems).
13. Register in `monitored_pages`.
14. Commit on RUN-phase session's branch.
15. Fill per-page work-log.
16. Mark ✅ done.
17. Append flags if any.
18. Append discoveries.
19. Claim next page.

## Work log (Stage 2 + RUN session populate)

[RUN session records work here. Stage 2 verification notes: **SI 2015/878** (International Tax Compliance Regulations 2015 — CRS + FATCA + DAC2 implementation; 25 regs across 4 parts + 2 schedules; Reg 3 due diligence; Reg 4 framework definitions; Reg 6 annual reporting to HMRC; Reg 7 electronic return; Reg 10 customer notification; Reg 13 / 14 / 21 penalties) — verified per §17 HP-lock pass (Stage 1 verified 2026-05-27; LOAD-BEARING for Misframe 1 grep). **SI 2023/817** (Platform Operators Reporting — DAC7-equivalent; first reporting cycle 2024 calendar year reported in 2025; covers Airbnb / Booking.com / Vrbo / similar; reportable data: host identity / address / TIN / gross consideration / activities count) — RUN session WebFetches verbatim at write (LOAD-BEARING for Example 4 + FAQ 4 + Misframe 8 grep). SI 2023/38 (MDR — cross-border arrangements) — RUN session verifies architecture. **FA 2017 Sch 18 VERBATIM** (RTC 6 April 2017 - 30 September 2018 window CLOSED; FTC indefinitely thereafter; 200% offshore PLR base + 100% disclosure floor; covers IT/CGT/IHT offshore matters) — verified per §17 HP lock (LOAD-BEARING for FAQ 5 + Misframe 6 grep). **FA 2015 Sch 21 VERBATIM** (Cat-2 1.5x + Cat-3 2x territorial uplift; current territory schedule at gov.uk — RUN session verifies at write per §16.35) — verified per §17 HP lock (LOAD-BEARING for Example 2 + Example 5 + FAQ 6 + Misframe 7 grep). FA 2007 Sch 24 (inaccuracy regime — behaviour percentages: careless 0-30% unprompted / 15-30% prompted; deliberate 20-70% / 35-70%; deliberate-and-concealed 30-100% / 50-100%) — verified per §27. F-5 lock per §27.2 (Sch 24 para 10 careless-unprompted 0% floor has NO 12-month qualifier; the qualifier exists in Sch 41 para 13 only) — carries through Example 2 mitigation analysis. **TMA 1970 s.36A FA 2019 12-year offshore time limit VERBATIM** — verified per §17 (LOAD-BEARING for FAQ 10 + Misframe 10 grep). TMA 1970 s.29 (discovery) + s.36 (4 / 6 year time limits) — verified. TIOPA 2010 Part 2 Chapter 2 (DTA Article 26 exchange-of-information architecture) — verified per §10 + §16 + §20 HP framework. NRL scheme operational mechanics per §17.5 — verified. NRCGT 60-day reporting per §17.4 — verified. HMRC IEIM + WDF + DDS + Connect overview manual landings confirmed live. No new HP-lock candidate at Stage 2; potential HP §17.X candidate "AEOI / CRS / FATCA / DAC7-equivalent architecture for expat landlords" if site-wide stale-citation drift surfaces during RUN session research. Cross-link discipline: bidirectional with existing NRL + NRCGT clusters; RoE parallel transparency (distinguish); B6 / B7 / B17 / B19 / B20 sibling cluster; Bucket A LPC voluntary-disclosure pages (distinguish — LPC = UK-source rental; WDF = offshore matters); do NOT re-walk DTA Article 26 detail in depth (cross-link to B20).]

---

## Stage 1 seed work log

- **Stage 1 author:** MW3 Stage 1 Sub-Agent B (batch M3-B-B3) on or before 2026-05-27.
- **Stage 2 author:** MW3 Stage 2 Sub-Agent B (batch M3-B-B3) on 2026-05-27.
- **Cluster anchor:** Landlord-orientation page on AEOI (CRS + FATCA + DAC2 + DAC7-equivalent + MDR) with the four landlord-specific exposure maps (expat retaining UK BTL; non-resident with offshore banking; UK landlord with overseas property income; Airbnb / platform-let host) + FA 2017 Sch 18 FTC penalty escalator + FA 2015 Sch 21 Cat-2 / Cat-3 uplift + WDF correction route via DDS + HMRC Connect cross-match. Distinct from existing NRL + NRCGT pages (which are domestic-regime focused); RoE (parallel transparency — distinguish); Bucket A LPC pages (UK-source rental — distinguish); B6 / B7 sibling expat cluster; B17 non-resident-company corporate-tax shift; B20 DTA introduction.
- **HP-lock alignment:** §10 + §16 + **§17 + §17.4 NRCGT + §17.5 NRL scheme + §17.6 domicile reform** + **§11 RoE parallel transparency**. Potential new HP §17.X candidate "AEOI / CRS / FATCA / DAC7-equivalent architecture for expat landlords" — Stage 2 raises only if site-wide drift surfaces during RUN session research; manager triages.
- **§16.36 statutory-citation cross-check (Stage 2):** **SI 2015/878** (CRS + FATCA + DAC2 implementation — operative regs verified) — verified 2026-05-27 per §17 HP-lock pass. SI 2023/817 (DAC7-equivalent platform reporting) — RUN session verifies verbatim at write per §16.35. SI 2023/38 (MDR) — RUN session verifies. **FA 2017 Sch 18 verbatim** (RTC/FTC) — verified 2026-05-27. **FA 2015 Sch 21 verbatim** (Cat-2 / Cat-3 uplift + current territory schedule at gov.uk) — RUN session re-verifies at write per §16.35 (territory schedule is published and updated periodically). FA 2007 Sch 24 (inaccuracy percentages) — verified per §27. **TMA 1970 s.36A FA 2019 verbatim** (12-year offshore time limit) — verified per §17. TMA 1970 s.29 + s.36 — verified. TIOPA 2010 Part 2 Chapter 2 (DTA Article 26 exchange) — verified per §10 + §16 + §20. No drift catches raised at Stage 2.
- **§16.31 URL verification (Stage 2):** legislation.gov.uk anchors confirmed live for SI 2015/878; SI 2023/817; SI 2023/38; FA 2017 Sch 18; FA 2015 Sch 21; FA 2007 Sch 24; TMA 1970 s.29 + s.36 + s.36A; TIOPA 2010. HMRC IEIM + WDF + DDS + Connect-overview manual landings confirmed live. OECD CRS portal at oecd.org confirmed live. Competitor URLs deferred to session-side WebSearch at write.
- **Cannibalisation reasoning:** clean cluster gap on AEOI as a landlord-orientation page. Closest adjacencies: existing NRL scheme cluster (operational withholding mechanic — distinguish; NRL = UK domestic withholding statute; AEOI = international information-flow); existing NRCGT cluster (UK domestic disposal reporting — distinguish; AEOI is the international counterpart for discovery on disposal); RoE (parallel transparency regime — distinguish; RoE = corporate-ownership disclosure to Companies House; AEOI = financial-account / income reporting between tax authorities); Bucket A LPC voluntary-disclosure pages (UK-source rental — distinguish; AEOI = international information-flow architecture that feeds HMRC awareness in the first place); B6 / B7 / B17 / B19 / B20 sibling cluster (cross-link forward). No CANNIBAL. Stage 2 confirms differentiation framing holds against any concurrently-shipped sibling.
- **Anti-templating watchpoints for RUN session:** (a) MUST open with the AEOI-offshore-invisible-untenable framing per framing differentiator — NOT with "automatic exchange of information is..." generic framing, NOT with "CRS is a global tax-information standard" lazy framing, NOT with parallel-structure to existing NRL / NRCGT / RoE pages. The reader needs the landlord-specific exposure map upfront. (b) Example 1 information-flow map is the page's first concrete artefact — render as semantic HTML `<ol>` or `<table>` showing data flow from rent collection → NRL withholding → UK bank → AEOI to home jurisdiction → reverse leg → HMRC Connect cross-match. (c) Example 2 expat-WDF walkthrough must surface F-5 lock per §27.2 (Sch 24 para 10 careless-unprompted 0% floor with no 12-month qualifier) — Misframe 11 grep mandatory. (d) Example 4 DAC7-equivalent Airbnb walk must surface SI 2023/817 first-reporting-cycle 2024 + platform-reported data — Misframe 8 grep mandatory. (e) Example 5 US-citizen triple-reporting must distinguish FATCA from CRS architecturally — Misframe 2 grep mandatory. (f) Per §16.27 rate-by-reference — FA 2007 Sch 24 percentages + FA 2015 Sch 21 multipliers + FA 2017 Sch 18 200%/100% + TMA 1970 s.36A 12-year — all verified at write per §16.35. (g) Connect described factually per HMRC published overview — Misframe 9 grep mandatory (avoid deterrent-fiction framing). (h) FAQ count target 12-14. (i) Body word count 3,200-3,800. (j) Cross-link discipline: bidirectional with existing NRL + NRCGT clusters + RoE + B6 + B7 + B17 + B19 + B20 + Bucket A LPC pages; do NOT re-walk DTA Article 26 detail (cross-link to B20).
