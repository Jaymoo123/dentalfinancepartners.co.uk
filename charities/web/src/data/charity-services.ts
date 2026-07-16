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
      "Independent examination of charity accounts required by the Charities Act. Fixed fee, Charity Commission compliant, completed within agreed timescales.",
    intro:
      "Charities with gross income between £25,000 and £1 million (in England and Wales) must have their accounts independently examined rather than audited. The examination provides trustees and the Charity Commission with assurance that the accounts are presented fairly and comply with the Charities SORP.",
    stats: [
      { value: "£25k", label: "Gross income threshold triggering examination" },
      { value: "10 months", label: "Filing deadline after year end (Charity Commission)" },
      { value: "SORP", label: "Accounting standard all charity accounts must follow" },
    ],
    challenges: [
      {
        title: "Finding a suitably qualified examiner",
        body: "The Charity Commission requires examiners to be independent of the charity and to have the relevant knowledge and experience. For charities with income over £250,000, the examiner must hold a specific professional qualification. Many trustees do not know where to start.",
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
        title: "Conduct the independent examination",
        body: "We carry out the independent examination of your charity's accounts, confirm compliance with the Charities SORP and provide the signed examiner's report required for Charity Commission filing.",
      },
      {
        title: "Accounts preparation support",
        body: "Where accounts need correction or restructuring before examination, we advise trustees on what is needed and, if required, assist with preparation.",
      },
      {
        title: "Charity Commission filing",
        body: "We assist with the full annual return submission to the Charity Commission, including the trustees annual report, accounts and the online return questions.",
      },
    ],
    faqs: [
      {
        question: "Does my charity need an independent examination or a full audit?",
        answer: "In England and Wales, charities with gross income below £25,000 need neither. Between £25,000 and £1 million an independent examination is required unless income also exceeds £250,000 and gross assets exceed £3.26 million, or its governing document requires an audit. Above £1 million a full audit is required. Scottish and Northern Irish charities have different thresholds.",
      },
      {
        question: "Who can carry out an independent examination?",
        answer: "For charities with income under £250,000, the examiner must be independent and have the relevant knowledge and experience but does not need a specific qualification. For income over £250,000, the examiner must hold a qualification from a list specified by the Charity Commission, which includes members of ICAEW, ACCA, CIPFA and certain other bodies.",
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
      { value: "25p", label: "Reclaimed per pound donated via Gift Aid (HP14)" },
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
        body: "GASDS is available only to charities that also claim Gift Aid on the same donations in the same tax year (except in the first year). The scheme covers up to £8,000 of qualifying donations per tax year, producing a maximum top-up of £2,000; separately, GASDS donations claimed cannot exceed ten times the Gift Aid claimed in the same year. Many charities are unaware of these limits and conditions.",
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
        answer: "It depends on what the member receives in return. If membership provides only the right to receive the charity's publications or attend certain events and the total benefit value does not exceed the applicable donor benefit limits (25% of the donation for amounts up to £100; £25 plus 5% of the excess for amounts over £100; capped at £2,500 in aggregate per year), Gift Aid may still be claimable on the subscription. We review the specific membership structure and advise accordingly.",
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
];

export function getCharityService(slug: string): CharityService | undefined {
  return charityServices.find((s) => s.slug === slug);
}
