# Charities — house positions (locked figures and framings)

Locked at S5 build (2026-07-11), expanded from `expansion_research/pilot_charities/HOUSE_POSITIONS_OUTLINE.md`. Every position below was re-verified figure-by-figure against its live source on **2026-07-11** during the S5 pass (second verification; the outline's checks were 2026-07-11 R3). Positions that could NOT be fully re-verified are flagged inline rather than asserted.

These are the positions every page, calculator and blog on the charities site must be internally consistent on. The calculator engines in `charities/web/src/lib/calculators/charity-rules.ts` hard-code positions 3, 4, 5, 14 and 17; do not change a figure in either place without changing both.

**Default jurisdiction: England & Wales (Charity Commission).** Scotland/NI are different regimes (position 26) and are flagged explicitly, never silently mixed.

If a page hits a factual conflict with a competitor source, flag it for the orchestrator; do not unilaterally re-frame.

---

## A. Registration, reporting and scrutiny (Charity Commission)

**1. Registration threshold — £5,000; CIOs always register.**
A charity based in England or Wales must register with the Charity Commission once its income exceeds £5,000 per year. A charitable incorporated organisation (CIO) must register whatever its income.
— https://www.gov.uk/guidance/how-to-register-your-charity-cc21b (verified 2026-07-11: "over £5,000 income per year"; "a CIO... must register whatever its income")

**2. Annual return — all registered charities, tiered content; due within 10 months.**
All registered charities must submit an annual return, with tiered content: under £10,000 income they report income and spending only; £10,000 to £25,000 they answer the annual return questions; over £25,000 they must also attach the trustee annual report and accounts. Deadline: within 10 months of financial year end. (The outline's shorthand "required over £10,000" undersold this: everyone files something; the £10,000 gate changes what is filed.)
— https://www.gov.uk/guidance/prepare-a-charity-annual-return (verified 2026-07-11: tiering + "within 10 months of the end of your financial year")

**3. Independent examination gate — gross income over £25,000.**
Once gross income exceeds £25,000, trustees must arrange external scrutiny: an independent examination or an audit. At or below £25,000 the Charities Act requires no external scrutiny (governing document can still impose one).
— https://www.gov.uk/government/publications/independent-examination-of-charity-accounts-trustees-cc31 and the full guidance at .../independent-examination-of-charity-accounts-trustees (verified 2026-07-11: "Where a charity's annual income is over £25,000...")

**4. Audit thresholds — income over £1m, OR income over £250,000 AND gross assets over £3.26m.**
A statutory audit is mandatory above these gates; independent examination is not permitted (save exceptional Commission-approved cases). Governing-document or funder audit clauses can force an audit below the statutory thresholds.
— CC31 full guidance (verified 2026-07-11: "Over £1 million OR over £250,000 with gross assets exceeding £3.26 million: audit is mandatory") and https://www.gov.uk/government/publications/charity-reporting-and-accounting-the-essentials-november-2016-cc15d (landing page live 2026-07-11; the CC15d HTML body itself was not reachable this pass — figures anchored via CC31, which states them in full)

**5. Qualified examiner rule — income over £250,000.**
Where gross income exceeds £250,000, the independent examiner must be a member of a body listed in the Charities Act: ICAEW, ICAS, ICAI, ACCA, AAPA, AAT, AIA, CIMA, the Chartered Governance Institute, CIPFA, ACIE, IFA, CPAA. At or below £250,000, any independent person with the requisite ability and practical experience may examine.
— CC31 full guidance (verified 2026-07-11; full list of 13 bodies confirmed). CC32 (examiners' guidance) is PDF-only and was not re-parsed this pass: https://www.gov.uk/government/publications/independent-examination-of-charity-accounts-examiners-cc32 (page live 2026-07-11)

**6. Receipts & payments vs accruals — £250,000; companies always accruals.**
Non-company charities with gross income of £250,000 or less may prepare receipts and payments accounts. Charitable companies, and all charities over £250,000, must prepare accruals accounts.
— CC15d (landing live 2026-07-11) and CC31 full guidance (verified 2026-07-11 in the qualified-examiner/accruals context). Standard framing confirmed; treat the company-accruals rule as settled law (Companies Act 2006 requirement).

**7. SORP — new SORP applies to periods beginning on or after 1 January 2026.**
Accruals accounts must follow the Charities SORP (FRS 102). SORP 2026 applies to accounting periods starting on or after 1 January 2026, so the site launches INTO the transition: date every SORP statement to the accounting period, never "the new rules".
— https://www.charitysorp.org/ (verified 2026-07-11: "The Charities SORP and SORP 2026 will apply to accounting periods starting on or after 1 January 2026"). **FLAG: the "tiered reporting" structure of SORP 2026 (Tier 1/2/3 income thresholds) could not be re-verified on charitysorp.org this pass — verify tier thresholds in the SORP document itself before any page states them.**

**8. Charities Act 2022 — staged commencement, now substantially in force.**
Permanent endowment, charity land disposal and charity name provisions commenced 14 June 2023; further land provisions and governing-document amendment provisions 7 March 2024; ex gratia payment provisions 27 November 2025 (with exclusions for certain statutory museums/galleries). Cite the implementation plan for what is in force at the date of writing; do not describe the Act as fully in force without checking.
— https://www.gov.uk/guidance/charities-act-2022-implementation-plan (verified 2026-07-11 with the commencement dates above)

**9. Public register — searchable and downloadable.**
Charity details (name, address, trustees, work, finances) are publicly searchable; charities under £5,000 income, excepted and exempt charities are not on the register. The full register is downloadable as daily extracts (OGL v3.0) — this powers the site's UK Small Charity Finance Index.
— https://www.gov.uk/find-charity-information (verified 2026-07-11) and https://register-of-charities.charitycommission.gov.uk/en/register/full-register-download (verified 2026-07-11; extract URLs confirmed and used by `charities/pipeline/build_finance_index.py`)

## B. Charity taxation (HMRC)

**10. HMRC recognition is separate from Commission registration.**
Charity tax reliefs require recognition by HMRC ("To benefit you must be recognised by HM Revenue and Customs"). Registration with the Commission alone does not deliver Gift Aid or other reliefs.
— https://www.gov.uk/charities-and-tax (verified 2026-07-11)

**11. No tax on most charitable income; returns only when asked or when non-exempt income arises.**
Charities do not pay tax on most types of income as long as the money is used for charitable purposes. A return is needed if the charity has received income that does not qualify for relief or has spent income on non-charitable purposes (or HMRC issues a notice).
— https://www.gov.uk/charities-and-tax (verified 2026-07-11)

**12. Small trading exemption — £8,000 / 25% of income / £80,000 cap, with the £32,000 and £320,000 tier boundaries.**
Primary-purpose trading is tax-exempt without limit. Non-primary-purpose trading is exempt only within the small trading limits: charity gross annual income under £32,000 → max £8,000 trading turnover; £32,000 to £320,000 → max 25% of total income; over £320,000 → max £80,000. Exceed the limit and tax is due on ALL profits of that trade, not just the excess.
— https://www.gov.uk/guidance/charities-and-trading (verified 2026-07-11: full three-tier table quoted, including the £32,000/£320,000 boundaries the outline omitted, and "you'll have to pay tax on all of your profits from that trade")

**13. Trading subsidiary — profits donated to the parent escape corporation tax.**
Taxable trading is routed through a subsidiary company; when the subsidiary donates its profits to the parent charity there is no corporation tax due on those payments (corporate Gift Aid; the company donates without deducting tax).
— https://www.gov.uk/guidance/charities-and-trading (verified 2026-07-11: "there is no Corporation Tax due on these payments")

## C. Gift Aid family

**14. Gift Aid basic mechanics — 25p per £1.**
A charity or CASC claims 25p for every £1 donated. Mechanically: the gross donation is the gift divided by (1 − 20% basic rate), and the claim is basic-rate tax on that gross (£100 gift → £125 gross → £25 claim). Requires a valid declaration, and the donor must have paid at least as much UK income tax or capital gains tax that year as all charities will reclaim on their donations.
— https://www.gov.uk/claim-gift-aid (verified 2026-07-11: "claim back 25p every time an individual donates £1"; donor tax-paid condition confirmed)

**15. Declarations — required content and retention.**
A declaration must include the charity's name, the donor's full name and home address, what donations it covers, a statement that the donor wants Gift Aid to apply, and the explanation that the donor must pay at least as much income/capital gains tax as will be claimed. Keep declaration records 6 years from the end of the accounting period; enduring declarations permanently. Claiming without a declaration means repaying the tax.
— https://www.gov.uk/guidance/gift-aid-declarations-claiming-tax-back-on-donations (verified 2026-07-11)

**16. Donor benefit limits — 25% up to £100; £25 + 5% above £100; £2,500 aggregate annual cap.**
Benefits to a donor (or connected person) must pass the relevant value test: max 25% of the donation for donations up to £100; for donations over £100, £25 plus 5% of the amount above £100. Aggregate benefits from one charity in a tax year are capped at £2,500. Value = what the recipient would pay, not the charity's cost. Breach and the donation loses Gift Aid.
— https://www.gov.uk/guidance/gift-aid-what-donations-charities-and-cascs-can-claim-on (verified 2026-07-11) and HMRC detailed guidance ch. 3.18-3.24 (verified 2026-07-11 via position 18's chapter 3 page). This resolves the outline's second-pass item on benefit bands.

**17. GASDS — £30 per donation, £8,000 per year, 10x matching rule, 2-year claim deadline.**
Top-up (at the Gift Aid-equivalent 25%, max £2,000 top-up per year) on small cash/contactless donations of £30 or less, on up to £8,000 of donations per tax year, no declarations needed. Matching rule: GASDS donations claimed cannot exceed 10 times the donations on which Gift Aid is claimed in the same year (£100 Gift Aid donations → £1,000 GASDS). Claims within 2 years of the end of the tax year. No Gift Aid track record needed for donations collected after 6 April 2017. Community-buildings rules (6+ events of 10+ people) can give connected charities/buildings their own £8,000 allowances — always flag, never improvise: point to the HMRC guidance.
— https://www.gov.uk/claim-gift-aid/small-donations-scheme and https://www.gov.uk/guidance/claiming-a-top-up-payment-on-small-charitable-donations (both verified 2026-07-11 incl. the 10x worked example and the 2-year deadline). This resolves the outline's second-pass item on community-buildings sub-rules to the extent the site needs (we describe, we do not compute them).

**18. Retail Gift Aid — agency arrangement for charity shops.**
Charity shops can operate the retail Gift Aid scheme: the shop sells donated goods as the donor's agent and the sale proceeds become a Gift Aid donation, under the standard and simplified operating methods in HMRC detailed guidance chapter 3 (3.42).
— https://www.gov.uk/government/publications/charities-detailed-guidance-notes/chapter-3-gift-aid (verified 2026-07-11: retail Gift Aid on donated goods confirmed at 3.42 with agency/methods framing)

**19. Donor-side relief — higher/additional-rate donors reclaim the difference on the gross.**
Donors paying above basic rate reclaim the difference between their rate and basic rate on the gross donation, via Self Assessment or a tax-code adjustment. Worked example: £100 gift → charity claims to £125; a 40% taxpayer personally recovers £25 (net cost £75); a 45% taxpayer recovers £31.25 (net cost £68.75). Scottish income tax rates differ for the donor-side calculation only; the charity's 25p per £1 claim is UK-wide.
— https://www.gov.uk/donating-to-charity/gift-aid (verified 2026-07-11 incl. the £100/£125/£25 worked example)

## D. VAT and rates

**20. No blanket VAT exemption; specific reliefs; fundraising events exempt.**
Charities follow normal VAT registration rules (registration compulsory above the £90,000 taxable turnover threshold). Reliefs exist on specific purchases: zero-rated advertising supplied to a charity, 5% reduced rate on fuel and power for non-business/residential use, and others on eligibility declaration. One-off qualifying fundraising events are exempt, limited to 15 events of the same kind per financial year (Notice 701/1). Business/non-business apportionment and partial exemption are the recurring pain points; never imply a charity "doesn't pay VAT".
— https://www.gov.uk/vat-charities and https://www.gov.uk/guidance/how-vat-affects-charities-notice-7011 (both verified 2026-07-11 incl. the 15-event limit and £90,000 threshold)

**21. Business rates — 80% mandatory relief, discretionary top-up to 100%.**
Charitable rate relief gives up to 80% off the business rates bill on property used wholly or mainly for charitable purposes; the local council may top up the rest as discretionary relief. Cannot be combined with small business rate relief.
— https://www.gov.uk/apply-for-business-rate-relief/charitable-rate-relief (verified 2026-07-11: "up to 80% off" + discretionary top-up)

## E. CICs and structures

**22. A CIC is not a charity.**
CICs get no charity tax reliefs (no Gift Aid on income, no charity rate relief) and pay corporation tax normally. They are regulated by the Office of the Regulator of Community Interest Companies (based at Companies House), not the Charity Commission.
— https://www.gov.uk/government/organisations/office-of-the-regulator-of-community-interest-companies (verified 2026-07-11)

**23. CIC asset lock and dividend caps.**
CICs have a statutory asset lock; CICs limited by shares face dividend/performance caps. The CIC guidance pack chapters ("Asset Locked Body", "Shares & Dividend Cap") are the citation anchor.
— https://www.gov.uk/government/publications/community-interest-companies-how-to-form-a-cic (verified 2026-07-11: asset lock + dividend cap chapters confirmed)

**24. CIC filing — CIC34 community interest report with the accounts.**
Every CIC files a CIC34 community interest company report alongside its accounts at Companies House (online or by post), with a filing fee. **FLAG: the current fee amount (historically £15) could NOT be re-verified on the gov.uk CIC guidance pages this pass — do not state a fee figure on-site until confirmed against the live Companies House fees page.**
— https://www.gov.uk/government/publications/community-interest-companies-business-activities (verified 2026-07-11 that the CIC34 report + online/post filing exists; fee not shown)

**25. Structure choice — charity/CIO vs charitable company vs CIC vs unincorporated.**
The Commission's structure guidance is the canonical comparison. A CIO registers only with the Charity Commission (no Companies House), which is its headline advantage over a charitable company, which must register with both.
— https://www.gov.uk/guidance/charity-types-how-to-choose-a-structure (verified 2026-07-11: "You must register your charitable company with both the commission (if eligible) and Companies House"; CIO registers with the commission only)

## F. Jurisdiction and payroll

**26. Scotland is a different regime — E&W default, explicit Scotland call-outs.**
Scottish charities are regulated by OSCR (confirmed live: "the independent regulator and registrar for... charities in Scotland"). ALL Scottish charities require external scrutiny of their accounts regardless of size, and thresholds differ from England & Wales. **FLAG: the "all Scottish charities need external scrutiny" rule is long-standing OSCR guidance but was NOT re-verifiable from the OSCR homepage this pass (guidance deep-links 404'd); re-confirm on OSCR's accounts guidance before any page states it as a figure.** Site behaviour regardless: E&W default, Scotland flagged, never silently mixed — the IE-vs-audit checker refuses to answer for Scotland and points to OSCR.
— https://www.oscr.org.uk/ (verified 2026-07-11)

**27. Charity payroll — employer NIC 15% above £5,000; Employment Allowance £10,500, charities eligible.**
Employer Class 1 NIC for 2026/27 is 15% above the secondary threshold of £5,000/year (£96/week, £417/month). Charities (including CASCs) are eligible for the Employment Allowance of up to £10,500.
— https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027 (verified 2026-07-11: "15%", "£5,000 per year") and https://www.gov.uk/claim-employment-allowance + /eligibility (verified 2026-07-11: "£10,500"; "You can also claim Employment Allowance if you're a charity (including community amateur sports clubs)")

---

## Consistency rules for writers

- Thresholds in positions 1-6 are the single source of truth; every page quoting a scrutiny/audit figure links one of those gov.uk pages. The calculators already do.
- SORP-2026 transition (position 7) must be dated per accounting period, never "the new rules". Do not state SORP tier thresholds until the position-7 flag is cleared.
- Never imply a CIC can claim Gift Aid or charity rate relief (positions 22-23 vs 14/21).
- The small trading exemption is three-tiered with £32,000/£320,000 income boundaries (position 12); "£8k or 25% capped at £80k" without the boundaries is wrong at the edges.
- Exceeding the small trading limit taxes ALL the trade's profits, not the excess (position 12).
- GASDS community buildings and connected-charity rules: describe and link, never compute (position 17).
- Churches/parishes: content-only audience (R2 decision); excepted-church registration nuances get flagged to Commission guidance, not advised on.
- E&W default + Scotland flag (position 26) applies estate-wide on this site.
- No em-dashes in user-facing copy (estate rule).

## Open flags (do not assert on-site until cleared)

1. **SORP 2026 tier thresholds** (position 7) — application date verified; tier structure not re-verified.
2. **CIC34 filing fee** (position 24) — report requirement verified; current fee amount not found on the fetched pages.
3. **OSCR universal-scrutiny rule detail** (position 26) — regulator verified; the all-sizes scrutiny statement and Scottish thresholds need re-confirmation from OSCR accounts guidance (deep links 404'd this pass).
4. **CC15d body text** (positions 4/6) — landing page live but the HTML guidance body was unreachable; all figures were instead verified in CC31's full guidance, which states them completely.
