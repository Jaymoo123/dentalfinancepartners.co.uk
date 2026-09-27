export interface CharityService {
  slug: string;
  title: string;
  headline: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  stats: Array<{ value: string; label: string }>;
  challenges: Array<{ title: string; body: string }>;
  howWeHelp: Array<{ title: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

export const charityServices: CharityService[] = [
  {
    slug: "independent-examination",
    title: "Independent Examination",
    headline: "Independent examination for charities below the audit threshold",
    metaTitle: "Independent Examination for Charities | Trustee Tax",
    metaDescription:
      "Independent examination of charity accounts required by the Charities Act. Charity Commission compliant accounts, prepared with the examination in mind.",
    intro:
      "In England and Wales, charities with gross income between £25,000 and £1 million normally have their accounts independently examined rather than audited. There is a second audit trigger to check: an audit is also mandatory once gross income exceeds £250,000 and gross assets exceed £3.26 million, so a charity inside that income band can still need an audit. For financial years ending on or after 30 September 2026 the same structure applies on higher figures: £40,000 and £1.5 million, with the combined trigger at £500,000 of income and £5 million of gross assets. The examination provides trustees and the Charity Commission with assurance that the accounts are presented fairly and comply with the Charities SORP.",
    stats: [
      { value: "£25k", label: "Examination threshold (£40k for years ending on or after 30 Sep 2026)" },
      { value: "10 months", label: "Filing deadline after year end (Charity Commission)" },
      { value: "SORP", label: "Accounting standard all charity accounts must follow" },
    ],
    challenges: [
      {
        title: "Finding a suitably qualified examiner",
        body: "The Charity Commission requires examiners to be independent of the charity and to have the relevant knowledge and experience. For charities with income over £250,000 (£500,000 for financial years ending on or after 30 September 2026), the examiner must hold a specific professional qualification. Many trustees do not know where to start.",
      },
      {
        title: "Accounts prepared to the right standard",
        body: "The examiner reviews accounts that must already comply with the Charities SORP. Accounts prepared on a simple receipts-and-payments basis may be acceptable for smaller charities but need to be correctly structured. Fund accounting, restricted funds and designated funds all need correct treatment.",
      },
      {
        title: "Timing and trustee availability",
        body: "Trustee boards often have limited accounting knowledge and volunteer time. Coordinating the accounts preparation, the examination and the Charity Commission filing within the 10-month deadline requires planning that many small charities find difficult.",
      },
      {
        title: "Charity Commission reporting requirements",
        body: "The annual return, trustees annual report and accounts must all be filed correctly. Errors in the return or missing information can trigger follow-up from the Commission. We ensure the filing is complete and accurate.",
      },
    ],
    howWeHelp: [
      {
        title: "Prepare for the independent examination",
        body: "We prepare your charity's accounts with the examination in mind, check they comply with the Charities SORP, and connect you with an independent examiner who can produce the examiner's report required for Charity Commission filing.",
      },
      {
        title: "Accounts preparation support",
        body: "Where accounts need correction or restructuring before examination, we set out for trustees what is needed and, if required, assist with preparation.",
      },
      {
        title: "Charity Commission filing",
        body: "We assist with the full annual return submission to the Charity Commission, including the trustees annual report, accounts and the online return questions.",
      },
    ],
    faqs: [
      {
        question: "Does my charity need an independent examination or a full audit?",
        answer: "In England and Wales, for financial years ending before 30 September 2026: charities with gross income below £25,000 need neither. Between £25,000 and £1 million an independent examination is required unless income also exceeds £250,000 and gross assets exceed £3.26 million, or its governing document requires an audit. Above £1 million a full audit is required. For financial years ending on or after 30 September 2026 those gates rise to £40,000, £1.5 million, and £500,000 with £5 million of gross assets. Scottish and Northern Irish charities have different thresholds.",
      },
      {
        question: "Who can carry out an independent examination?",
        answer: "For charities with income under the qualified-examiner threshold (£250,000, rising to £500,000 for financial years ending on or after 30 September 2026), the examiner must be independent and have the relevant knowledge and experience but does not need a specific qualification. Above that threshold, the examiner must hold a qualification from a list specified by the Charity Commission, which includes members of ICAEW, ACCA, CIPFA and certain other bodies.",
      },
    ],
  },
  {
    slug: "charity-accounts",
    title: "Charity Accounts",
    headline: "Annual charity accounts prepared to the Charities SORP",
    metaTitle: "Charity Accounts Preparation | Trustee Tax",
    metaDescription:
      "Charity annual accounts prepared under the Charities SORP. Fund accounting, restricted funds, trustees annual report. Filed with the Charity Commission.",
    intro:
      "Charity accounts must be prepared in accordance with the Charities Statement of Recommended Practice (SORP). The SORP requires specific presentation of restricted and unrestricted funds, a trustees annual report and a statement of financial activities. Getting this right matters: the Charity Commission publishes your accounts and they are publicly searchable.",
    stats: [
      { value: "2", label: "Main fund types: restricted and unrestricted" },
      { value: "SORP FRS102", label: "Accounting standard for most registered charities" },
      { value: "10 months", label: "Filing deadline after financial year end" },
    ],
    challenges: [
      {
        title: "Fund accounting complexity",
        body: "Charities must separately account for restricted funds (money given for a specific purpose), unrestricted funds and designated funds. Misclassifying a grant from a restricted to an unrestricted fund, or failing to track restricted fund expenditure, is a common error that examiners and the Commission look for.",
      },
      {
        title: "Grant reporting obligations",
        body: "Many funders require accounts prepared to the Charities SORP as a condition of grant reports. Accounts that do not clearly show how restricted funds were used can jeopardise future funding.",
      },
      {
        title: "Trustees annual report",
        body: "Larger charities must include a detailed trustees annual report covering activities, achievements, financial performance and future plans. Smaller charities still need a compliant report even if shorter. Trustees often underestimate what this requires.",
      },
      {
        title: "Keeping up with SORP updates",
        body: "The Charities SORP is updated periodically. Changes to accounting policies, disclosure requirements and reporting thresholds can catch trustees off guard if they are not monitored.",
      },
    ],
    howWeHelp: [
      {
        title: "Prepare SORP-compliant accounts",
        body: "We prepare your full charity accounts including the statement of financial activities, balance sheet, notes and cash flow statement (where required), structured correctly under the applicable SORP.",
      },
      {
        title: "Fund reconciliation",
        body: "We reconcile restricted, unrestricted and designated fund balances, track restricted fund income and expenditure, and ensure the accounts clearly show fund movements.",
      },
      {
        title: "Trustees annual report",
        body: "We assist trustees in drafting the annual report covering public benefit, activities, achievements and financial review, tailored to the charity's income band and Commission requirements.",
      },
    ],
    faqs: [
      {
        question: "What is the Charities SORP and why does it matter?",
        answer: "The Charities Statement of Recommended Practice (SORP) is the accounting standard that applies to charities in the UK. It specifies how income and expenditure should be classified, how funds should be tracked and what the trustees annual report must include. Accounts that do not follow the SORP will fail independent examination and Charity Commission scrutiny.",
      },
      {
        question: "What is a statement of financial activities?",
        answer: "The statement of financial activities (SOFA) replaces the income and expenditure account in charity accounts. It shows all incoming resources, resources expended and transfers between funds, split between restricted and unrestricted funds. It gives a complete picture of how the charity's resources moved during the year.",
      },
    ],
  },
  {
    slug: "charity-bookkeeping",
    title: "Charity Bookkeeping",
    headline: "Monthly bookkeeping designed for charity fund accounting",
    metaTitle: "Charity Bookkeeping Services | Trustee Tax",
    metaDescription:
      "Monthly charity bookkeeping with fund tracking, restricted grant reconciliation and management accounts for trustees. Compliant with the Charities SORP.",
    intro:
      "Charity bookkeeping is not the same as commercial bookkeeping. Restricted funds must be tracked separately, grants allocated correctly and management accounts presented in a format trustees can actually use. Getting the underlying records right makes accounts preparation, independent examination and funder reporting straightforward.",
    stats: [
      { value: "Monthly", label: "Management accounts for trustees" },
      { value: "Real-time", label: "Restricted fund balance tracking" },
      { value: "6 years", label: "Minimum declaration record retention after accounting period end" },
    ],
    challenges: [
      {
        title: "Restricted fund tracking",
        body: "Every restricted grant must be tracked from receipt to expenditure. If a grant is spent on something outside the permitted purpose, or the balance is not correctly reported to the funder, it can trigger clawback. Manual tracking in spreadsheets across multiple grants is error-prone.",
      },
      {
        title: "Volunteer treasurer bandwidth",
        body: "Many smaller charities rely on volunteer treasurers with limited time and accounting knowledge. Month-end reconciliation, bank statement coding and payroll journal entries accumulate quickly and can fall behind, creating problems at year end.",
      },
      {
        title: "Management accounts for trustees",
        body: "Trustees need regular financial information to fulfil their governance duties. Management accounts that are simply a spreadsheet download are difficult for non-finance trustees to interpret. Charity-specific presentation helps boards make better decisions.",
      },
      {
        title: "Payroll and pension journals",
        body: "Charities with employees need payroll journals coded to the correct fund (where staff costs are grant-funded) and pension contribution tracking. These need to flow correctly into the management accounts and ultimately the SOFA.",
      },
    ],
    howWeHelp: [
      {
        title: "Monthly fund bookkeeping",
        body: "We reconcile bank accounts, code transactions to the correct fund and cost centre, and maintain a running balance for each restricted and designated fund.",
      },
      {
        title: "Trustee management accounts",
        body: "Monthly or quarterly management accounts in a charity-appropriate format, showing income and expenditure by fund and against budget, ready for trustee board meetings.",
      },
      {
        title: "Grant reconciliation reports",
        body: "Fund-level reports tracking each grant from receipt to expenditure, ready for funder reporting and annual accounts preparation.",
      },
    ],
    faqs: [
      {
        question: "Does a charity need to use specialist charity accounting software?",
        answer: "No. Standard cloud accounting software (Xero, QuickBooks, Sage) can be configured for charity fund accounting with the right chart of accounts structure. The important thing is that restricted and unrestricted funds are tracked separately. We can work with your existing software or help you choose an appropriate package.",
      },
      {
        question: "How often should a charity treasurer review the accounts?",
        answer: "Trustees have a legal duty to ensure the charity's finances are properly managed. The Charity Commission expects trustees to receive regular financial reports, typically monthly or quarterly depending on the charity's size. Waiting until year end to look at the accounts is a governance risk.",
      },
    ],
  },
  {
    slug: "gift-aid",
    title: "Gift Aid",
    headline: "Gift Aid registration, claims and GASDS management",
    metaTitle: "Gift Aid Claims and GASDS for Charities | Trustee Tax",
    metaDescription:
      "Gift Aid registration, optimised claims and GASDS (Gift Aid Small Donations Scheme) for UK charities. Maximise the 25% tax reclaim on eligible donations.",
    intro:
      "Gift Aid allows charities to reclaim 25p for every pound donated by UK taxpayers, at no cost to the donor. The Gift Aid Small Donations Scheme (GASDS) extends similar benefits to small cash and contactless donations where no declaration is held. Together they are among the most valuable sources of additional income for eligible charities, yet many claim less than they are entitled to.",
    stats: [
      { value: "25p", label: "Reclaimed per pound donated via Gift Aid" },
      { value: "£8,000", label: "Maximum eligible GASDS donations per connected charity per tax year" },
      { value: "2 years", label: "GASDS claim deadline after end of tax year" },
    ],
    challenges: [
      {
        title: "Declaration management",
        body: "Gift Aid requires a valid declaration from each donor. Declarations must be obtained, stored and linked to each donation. Donor address changes, lapsed declarations and missing records are common issues that reduce recoverable Gift Aid.",
      },
      {
        title: "Eligibility errors",
        body: "Not every donation is Gift Aid eligible. Donations from non-taxpayers, corporate donors, or those where the donor receives a benefit over certain limits are excluded. Claiming Gift Aid on ineligible donations exposes the charity to HMRC repayment demands and penalties.",
      },
      {
        title: "GASDS conditions",
        body: "GASDS applies to small cash and contactless donations of £30 or less on which Gift Aid is not claimed and for which no declaration is held. It is never claimed on the same donation as Gift Aid. What links the two is the matching rule: for every £10 of donations claimed under GASDS the charity must claim Gift Aid on at least £1 of other donations received in the same tax year, so GASDS donations cannot exceed ten times the Gift Aid donations claimed. There is no first-year exemption from the matching rule; what changed on 6 April 2017 was the separate two-year track record needed to be eligible at all. The scheme covers up to £8,000 of qualifying donations per tax year, producing a maximum top-up of £2,000. Many charities are unaware of these limits and conditions.",
      },
      {
        title: "Claim frequency",
        body: "Many charities claim Gift Aid only at year end, leaving cash tied up unnecessarily. HMRC allows claims as frequently as every four weeks. Regular claiming improves cash flow and reduces the risk of large retrospective errors.",
      },
    ],
    howWeHelp: [
      {
        title: "Gift Aid registration and claims",
        body: "We register your charity for Gift Aid with HMRC (if not already registered), review your donation records for eligible amounts and submit optimised claims on the correct schedule.",
      },
      {
        title: "GASDS optimisation",
        body: "We calculate your maximum GASDS entitlement based on your Gift Aid claims, check the qualifying conditions and include GASDS in every relevant claim submission.",
      },
      {
        title: "Declaration audit",
        body: "We review your declaration records to identify gaps, lapsed declarations and potential ineligibility issues before they become HMRC problems.",
      },
    ],
    faqs: [
      {
        question: "Can we claim Gift Aid on membership subscriptions?",
        answer: "It depends on what the member receives in return. If membership provides only the right to receive the charity's publications or attend certain events and the total benefit value does not exceed the applicable donor benefit limits (25% of the donation for amounts up to £100; £25 plus 5% of the excess for amounts over £100; capped at £2,500 in aggregate per year), Gift Aid may still be claimable on the subscription. We review the specific membership structure and confirm where it lands.",
      },
      {
        question: "What is the Gift Aid Small Donations Scheme?",
        answer: "GASDS allows charities to claim a Gift Aid-equivalent top-up payment on small cash and contactless card donations of up to £30 each, without needing a Gift Aid declaration from the donor. The scheme covers up to £8,000 of donations per connected charity per tax year, producing a maximum top-up of £2,000. The charity must also be registered for Gift Aid and making standard Gift Aid claims in the same tax year. Claims must be made within 2 years of the end of the tax year.",
      },
    ],
  },
  {
    slug: "charity-vat",
    title: "Charity VAT",
    headline: "VAT compliance and reliefs specific to charities",
    metaTitle: "Charity VAT Advice and Compliance | Trustee Tax",
    metaDescription:
      "VAT advice for UK charities: zero-rating reliefs, partial exemption, VAT registration threshold and VAT treatment of trading subsidiaries.",
    intro:
      "Charity VAT is genuinely complex. Charities can access zero-rating on certain goods and services, but partial exemption rules apply where they have both taxable and exempt activities. Many charities pay more VAT than they need to, or fail to reclaim what they are entitled to, because the rules require specific analysis of their income mix.",
    stats: [
      { value: "Zero-rated", label: "Many goods and services supplied to charities" },
      { value: "Partial exemption", label: "Applies when charities have mixed activities" },
      { value: "£90k", label: "VAT registration threshold (taxable turnover)" },
    ],
    challenges: [
      {
        title: "Partial exemption",
        body: "Charities that have both taxable and VAT-exempt activities (for example, providing services for a charge alongside free charitable activities) must apply partial exemption. This limits the amount of input VAT they can recover. Getting the partial exemption calculation wrong results in either over- or under-recovery.",
      },
      {
        title: "Zero-rating conditions",
        body: "Many goods and services are zero-rated when supplied to charities, but only if the right declaration is in place. Advertising, certain equipment, construction of new buildings and aids for disabled people are examples. Without the correct eligibility declaration the zero rate cannot be applied.",
      },
      {
        title: "Trading subsidiary structure",
        body: "Where a charity has a trading subsidiary (for example, to carry out non-primary purpose trading), the VAT position of the subsidiary and the charity must be considered separately. Gift aid payments from the subsidiary to the charity are outside the scope of VAT but the trading activity itself may be fully taxable.",
      },
      {
        title: "VAT registration decision",
        body: "Charities below the VAT registration threshold may benefit from voluntary registration if they have significant zero-rated income and incur VAT on their costs. We model the registration position to determine whether it is beneficial.",
      },
    ],
    howWeHelp: [
      {
        title: "VAT health check",
        body: "We review your charity's VAT position: registration status, income mix, partial exemption position and zero-rating reliefs being claimed, and identify any over- or under-recovery.",
      },
      {
        title: "Partial exemption calculation",
        body: "We calculate and apply the correct partial exemption method, prepare the annual adjustment and ensure input VAT recovery is optimised within the rules.",
      },
      {
        title: "VAT returns",
        body: "Preparation and submission of quarterly VAT returns, including Making Tax Digital-compliant digital records and submissions.",
      },
    ],
    faqs: [
      {
        question: "Do charities have to register for VAT?",
        answer: "Only if taxable turnover exceeds the registration threshold (currently £90,000). Charitable activities that are exempt from VAT or outside the scope do not count towards the threshold. Many charities are below the threshold and not registered. However, voluntary registration may be beneficial where there is significant zero-rated income and recoverable input VAT.",
      },
      {
        question: "What does zero-rating mean for a charity?",
        answer: "Zero-rating means the supplier charges VAT at 0% rather than the standard 20%. The charity pays no VAT on the purchase but the supplier can still recover input VAT on their costs. It is different from VAT exemption, where no VAT is charged but the supplier cannot recover input VAT either. Qualifying zero-rated purchases for charities include advertising, certain medical and veterinary equipment, and construction of new charitable buildings.",
      },
    ],
  },
  // Wave 1 append, docs/charities/_wave1/charity-registration.json, 2026-09-27, LEADS_250_PROGRAMME S4a
  {
    slug: "charity-registration",
    title: "Charity Registration and Set-Up",
    headline: "Registration and first-year support for new and late-registering charities",
    metaTitle: "Charity Registration Accountant | Trustee Tax",
    metaDescription: "Support for founders registering a charity in England and Wales: the £5,000 gate, CIO or company, HMRC recognition for Gift Aid, and the first year end.",
    intro: "Money came in for a cause first, and the paperwork has caught up since. In England and Wales a charity must register with the Charity Commission once its income goes over £5,000 a year, and a charitable incorporated organisation must register whatever its income. First there is a structure to settle: a CIO, a charitable company, or an unincorporated association. Then a second and separate step, because the tax reliefs, Gift Aid included, depend on recognition by HMRC and not on the Commission. After that come the practical jobs: a bank account in the charity's name, a year end, the first annual return, and accounts that match the money raised. Groups often reach us late, with donations banked and a year to reconstruct, which is a normal starting point. The guide <a href=\"/guides/register-a-charity-step-by-step\">register a charity step by step</a> covers the mechanics; this page is the numbers behind it.",
    stats: [
      {
        value: "£5,000",
        label: "Income above which a charity in England and Wales must register with the Charity Commission",
      },
      {
        value: "Any income",
        label: "A CIO must register with the Commission whatever its income",
      },
      {
        value: "10 months",
        label: "Deadline for the annual return after the end of the financial year",
      },
      {
        value: "25p per £1",
        label: "Gift Aid claimed on eligible donations once HMRC recognises the charity",
      },
    ],
    challenges: [
      {
        title: "Working out when the £5,000 gate was crossed",
        body: "The threshold bites on annual income, and a group running raffles, collections and a grant in the same twelve months crosses it without noticing. The date matters, because the Commission asks for financial information with the application, so where the records are a bank statement and a spreadsheet the income must be rebuilt before anyone can date the duty.",
      },
      {
        title: "Choosing a structure you will not have to unwind",
        body: "An unincorporated association forms in an afternoon but leaves trustees personally exposed on contracts and leases, while a CIO or a charitable company carries its own legal identity and its own filing burden. The four forms sit side by side in <a href=\"/guides/charity-structures-which-to-choose\">the structures guide</a>, and changing later means transferring assets.",
      },
      {
        title: "Assuming registration brings Gift Aid with it",
        body: "It does not. Recognition by HM Revenue and Customs is a separate application, naming the trustees, the governing document and the bank account. Groups that spend months on the Commission form and none on HMRC leave donations unclaimed. Both steps are set out in <a href=\"/blog/trustee-compliance/hmrc-recognition-vs-charity-registration\">HMRC recognition versus Commission registration</a>.",
      },
      {
        title: "Donations already taken before any of this existed",
        body: "Money raised before recognition still belongs in the first accounts, and Gift Aid on it depends on a valid declaration covering those gifts, which a donor can give later and backdate four years. A declaration needs the charity's name, the donor's full name and home address, what it covers, and the statement that the donor must have paid enough tax. Declarations are kept for six years from the end of the accounting period.",
      },
      {
        title: "A first year end nobody has planned",
        body: "The year end chosen on the application sets every deadline that follows, starting with the first annual return. What that return must contain is tiered by income, and so is whether the accounts need outside scrutiny at all. The <a href=\"/calculators/independent-examination-vs-audit-checker\">examination and audit checker</a> shows which side of the gate a year lands.",
      },
      {
        title: "Banking evidence trustees cannot produce on the day",
        body: "Banks want the registered number, the governing document, identification for every trustee and often a resolution appointing signatories. Funds sitting in a founder's personal account create a reconciliation job and an awkward disclosure later. Assembling the paperwork in order shortens the wait and keeps the opening balances clean.",
      },
    ],
    howWeHelp: [
      {
        title: "Getting the income picture straight first",
        body: "Before any form is filed, the bank records, collection sheets and grant letters are worked through to establish what came in, from where, and when the £5,000 point was passed. That gives the figures the application asks for and the opening position for the accounts.",
      },
      {
        title: "Comparing the structures against your plans",
        body: "Liability, property, employment and funder requirements are set against the CIO, charitable company and unincorporated routes. Where the group is already a community interest company, what conversion involves is set out, including the asset lock. Longer reading sits in <a href=\"/guides/set-up-a-charity-cio\">the CIO set-up guide</a>.",
      },
      {
        title: "Preparing the registration and recognition submissions",
        body: "The financial sections of the Charity Commission application and the HMRC recognition submission are drafted together, so trustee details, governing document and bank account agree across both. Run in sequence, Gift Aid becomes claimable as soon as HMRC responds.",
      },
      {
        title: "Putting Gift Aid on a footing that survives a check",
        body: "Declaration wording, the record of what each one covers, the retention period and the claim process are set up, including where historic donations can be brought into a claim. Small cash and contactless collections are checked against the small donations scheme, which carries its own annual limit.",
      },
      {
        title: "Carrying you through the first year end",
        body: "The first accounts, the trustee annual report where income requires one, and the annual return are prepared to the ten-month deadline, with the scrutiny thresholds checked against the actual year so no examination requirement surfaces in month nine.",
      },
    ],
    faqs: [
      {
        question: "Do we have to register if we have only raised a few thousand pounds?",
        answer: "In England and Wales the duty to register arises once annual income goes over £5,000. Below that a group can still operate for charitable purposes without joining the public register of charities. The exception is a charitable incorporated organisation, which must register whatever its income, because a CIO only exists once the Commission has registered it.",
      },
      {
        question: "What is the difference between a CIO and a charitable company?",
        answer: "Both give the organisation its own legal identity, so property is held and contracts signed in the organisation's name. The practical split is the regulator. A CIO registers with the Charity Commission alone. A charitable company must register with the Commission, if eligible, and with Companies House, which brings company filings and company accounting rules alongside the charity ones.",
      },
      {
        question: "Does registering with the Charity Commission give us Gift Aid?",
        answer: "No. Gift Aid and the other charity tax reliefs depend on recognition by HM Revenue and Customs, a separate application. Once recognition is in place the charity claims 25p for every £1 of eligible donation, provided a valid declaration is held and the donor has paid at least as much UK income tax or capital gains tax in the year as all their charities will reclaim.",
      },
      {
        question: "We have been taking donations for a year already. Is that a problem?",
        answer: "It is common and it is workable. The priority is reconstructing what was received and separating restricted funds from unrestricted ones. Whether Gift Aid can be claimed on those earlier gifts turns on holding a valid declaration that covers them, which a donor can give now and backdate four years. Being straightforward about when income passed £5,000 beats a tidy but inaccurate history.",
      },
      {
        question: "When is our first annual return due?",
        answer: "Within ten months of the end of the financial year, and what you file depends on income. Under £10,000 a registered charity reports income and spending only. Between £10,000 and £25,000 it answers the annual return questions. Over £25,000 the trustee annual report and the accounts are attached as well.",
      },
      {
        question: "Will our accounts need examining or auditing in the first year?",
        answer: "Only if income takes you over the gate. External scrutiny, meaning an independent examination or an audit, starts once gross income exceeds £25,000, rising to £40,000 for accounting years ending on or after 30 September 2026. Below it the Charities Act requires none, though a governing document or a funder can still call for one, so the trust deed and grant conditions are read first.",
      },
    ],
  },
  // Wave 1 append, docs/charities/_wave1/charity-payroll-and-pensions.json, 2026-09-27, LEADS_250_PROGRAMME S4a
  {
    slug: "charity-payroll-and-pensions",
    title: "Charity Payroll and Pensions",
    headline: "Payroll, employer NIC and workplace pensions for charities taking on staff",
    metaTitle: "Charity Payroll Services | Trustee Tax",
    metaDescription: "Charity payroll services for your first paid employee: PAYE registration, employer NIC, the Employment Allowance, auto-enrolment and volunteer expenses.",
    intro: "Moving from volunteers to paid staff turns a charity into an employer, and the obligations start before the first payslip. You register as an employer with HMRC and run PAYE, you account for employer Class 1 National Insurance at 15% on earnings above the £5,000 secondary threshold for 2026/27, and you check whether the charity can claim the Employment Allowance of up to £10,500, which charities and community amateur sports clubs are eligible for. Automatic enrolment duties start on day one: a workplace pension scheme, assessment of every worker, and a declaration of compliance to The Pensions Regulator. Paying a trustee is a different question again and is usually not permitted without express authority. What a first hire triggers, and what it costs, follows.",
    stats: [
      {
        value: "15%",
        label: "Employer Class 1 National Insurance on earnings above the secondary threshold, 2026/27",
      },
      {
        value: "£5,000",
        label: "Secondary threshold a year (£417 a month) before employer NIC starts, 2026/27",
      },
      {
        value: "£10,500",
        label: "Employment Allowance charities and CASCs can claim against employer NIC",
      },
      {
        value: "£10,000",
        label: "Annual earnings trigger for automatic enrolment of a worker aged 22 to State Pension age",
      },
    ],
    challenges: [
      {
        title: "Registering as an employer before the first payday",
        body: "PAYE registration is not instant, and HMRC expects the scheme to be open before the first payment of wages. Boards that agree a start date two weeks out often cannot file a Full Payment Submission on time, and late filing penalties apply to charities exactly as they do to commercial employers.",
      },
      {
        title: "Costing a hire, not just a salary",
        body: "A £24,000 post is not a £24,000 budget line. Employer NIC at 15% above the £5,000 threshold, an employer pension contribution of at least 3% of qualifying earnings, holiday cover and any agreed pay rise sit on top. Where the Employment Allowance is available it absorbs up to £10,500 of employer NIC a year, which for one modest post can remove the charge.",
      },
      {
        title: "Automatic enrolment duties land immediately",
        body: "Duties begin on the day the first member of staff starts. A worker aged between 22 and State Pension age earning at least £10,000 a year goes into a qualifying scheme, on a minimum total contribution of 8% of qualifying earnings, at least 3% from the employer. Even if nobody meets the trigger, you still write to staff and file a declaration.",
      },
      {
        title: "Paying trustees, and what it triggers if you do",
        body: "Trustees generally serve unpaid. Payment for acting as a trustee needs authority in the governing document, from the Charity Commission or under statute, and paying without it creates a recoverable benefit and a reportable issue. Authorised payments are usually taxable income, so PAYE or self-employment reporting follows.",
      },
      {
        title: "Volunteer expenses drifting into taxable pay",
        body: "Reimbursing a volunteer for what they actually spent is not pay. A round-sum allowance, an honorarium or a mileage rate above the approved amount can be, and once it is, PAYE and NIC apply and the volunteer's benefits position can change. The fix is a written expenses policy plus receipts, applied from now on.",
      },
      {
        title: "A CIC or trading subsidiary payrolls on different terms",
        body: "A <a href=\"/for/cics\">community interest company</a> is not a charity, but it is an employer in exactly the same way. Where a charity and a trading subsidiary share staff, the cost is recharged on a defensible basis, or the charity subsidises taxable trade. Groups also share one apprenticeship levy allowance once a combined pay bill approaches £3 million.",
      },
    ],
    howWeHelp: [
      {
        title: "Employer set-up and the first payroll run",
        body: "The PAYE scheme is registered against your intended start date, and the first payslips and Full Payment Submissions go out on time. Employment status for anyone engaged as a freelancer is checked before the first payment, not after it.",
      },
      {
        title: "Employer NIC and the Employment Allowance",
        body: "The employer NIC position for 2026/27 runs at 15% above the £5,000 secondary threshold, and eligibility for the £10,500 Employment Allowance is checked, including the connected-organisation rules where the charity has a subsidiary. The claim runs through the payroll, so the monthly cash figure reflects it.",
      },
      {
        title: "Auto-enrolment, assessment and the declaration",
        body: "Each worker is assessed against the age and earnings tests every pay period, postponement is applied where you want it, and the letters go out. Scheme choice is tested against your payroll software, and the declaration is filed.",
      },
      {
        title: "Trustee payments, volunteers and expenses policy",
        body: "Where a payment to a trustee or volunteer is proposed, a specialist reviews the authority relied on, the tax treatment, and the disclosure in the <a href=\"/services/charity-accounts\">annual accounts</a>. The output is a short written expenses and honoraria position the board can adopt.",
      },
      {
        title: "Year-end reporting and the staff-cost note",
        body: "P60s, reporting for any benefits in kind, and the staff-cost disclosures are prepared from the same payroll records as the monthly runs. Where <a href=\"/services/charity-bookkeeping\">bookkeeping</a> and payroll run together, restricted-fund salary apportionment comes out of the ledger, not a spreadsheet rebuilt each year.",
      },
    ],
    faqs: [
      {
        question: "Can a charity claim the Employment Allowance?",
        answer: "Yes. Charities, including community amateur sports clubs, are eligible for the Employment Allowance, worth up to £10,500 against employer Class 1 National Insurance. It is claimed through the payroll and reduces the NIC bill until it is used up or the year ends. Connected charities and companies share one allowance, so a charity with a trading subsidiary cannot claim it twice. Check eligibility each tax year rather than assuming it carries forward.",
      },
      {
        question: "How much employer National Insurance will our first hire cost?",
        answer: "For 2026/27 employer Class 1 National Insurance is 15% of earnings above the secondary threshold of £5,000 a year, which is £417 a month. On a salary of £24,000 that is 15% of £19,000. If the charity is eligible for the Employment Allowance, up to £10,500 of that liability is covered, which for a post of this size generally removes the charge. Pension contributions sit outside it.",
      },
      {
        question: "Do we have to set up a pension for one part-time employee?",
        answer: "You have automatic enrolment duties from the first day you employ anyone, whatever the hours. Whether that person must be enrolled depends on age and earnings: enrolment is mandatory for a worker aged 22 to State Pension age earning at least £10,000 a year. Someone below the trigger can still ask to join, and you may have to contribute. Either way you write to staff and file a declaration with The Pensions Regulator.",
      },
      {
        question: "Can we pay a trustee for doing work for the charity?",
        answer: "Usually not without authority. Payment simply for being a trustee needs an express power in the governing document, Commission consent or a statutory route, and it is rare. Payment for a separate service, such as building work, is permitted more often but carries conditions and the trustee withdraws from the decision. Authorised payments are taxable in the trustee's hands, so reporting follows and the accounts disclose them.",
      },
      {
        question: "Are volunteer expenses taxable?",
        answer: "Reimbursing a volunteer for costs they actually incurred, with receipts, is not taxable pay. Problems start with round-sum allowances, honoraria, gift vouchers and mileage above the approved rate, which can all be earnings and bring PAYE and National Insurance with them. Payments can also affect a volunteer's own benefit entitlement. A policy that reimburses evidenced actual cost is easy to explain at an independent examination.",
      },
      {
        question: "Does the apprenticeship levy apply to charities?",
        answer: "Only to larger ones. The levy is charged at 0.5% of an annual pay bill above £3 million, and every employer has a £15,000 annual allowance to set against it. Most charities are nowhere near it. It matters where a charity and its connected companies have a combined pay bill near the threshold, because they share one £15,000 allowance and decide how it is used.",
      },
    ],
  },
];

export function getCharityService(slug: string): CharityService | undefined {
  return charityServices.find((s) => s.slug === slug);
}
