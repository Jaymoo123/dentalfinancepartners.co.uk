export interface CareService {
  slug: string; title: string; headline: string; metaTitle: string; metaDescription: string;
  intro: string; stats: Array<{ value: string; label: string }>;
  challenges: Array<{ title: string; body: string }>;
  howWeHelp: Array<{ title: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

export const careServices: CareService[] = [
  {
    slug: "cqc-financial-viability-statement",
    title: "CQC Financial Viability Statement",
    headline: "CQC financial viability statement, prepared and signed",
    metaTitle: "CQC Financial Viability Statement for Care Providers",
    metaDescription: "Accountant-prepared CQC financial viability statements for new care providers. We build the cash-flow model and sign the statement on CQC's own template.",
    intro: `Every new care provider must submit a financial viability statement to the Care Quality Commission on <a href="https://www.cqc.org.uk/guidance-regulation/providers/registration/supporting-documents-provider/document/financial-viability-template">CQC's own template</a> before registration is approved. CQC uses it to judge whether your business is financially capable of delivering regulated care without failing. We prepare or validate the statement together with the underlying cash-flow and funding model, so you arrive at the registration gateway with defensible numbers rather than an optimistic spreadsheet. The service sits alongside opening accounts, VAT position and payroll setup, so registration and go-live run as one workstream rather than a series of last-minute panics.`,
    stats: [
      {
        value: "CQC template",
        label: `Financial viability statements are submitted on <a href="https://www.cqc.org.uk/guidance-regulation/providers/registration/supporting-documents-provider/document/financial-viability-template">CQC's own form</a>, normally prepared or signed by an accountant`,
      },
      {
        value: "Criminal offence",
        label: `<a href="https://www.cqc.org.uk/guidance-providers/registration">Trading before CQC registration</a> is a criminal offence under the Health and Social Care Act 2008; the financial viability statement is part of the mandatory application`,
      },
      {
        value: "Market oversight",
        label: `Large providers face additional <a href="https://www.cqc.org.uk/guidance-providers/market-oversight-corporate-providers/market-oversight-adult-social-care">CQC financial-distress monitoring</a> under the Care Act 2014, reflecting the sector-wide risk CQC is assessing in every FVS`,
      },
    ],
    challenges: [
      {
        title: "Projections that are optimistic or internally inconsistent",
        body: "CQC reviewers look for a cash-flow model where the assumptions stack up: occupancy ramp, staffing ratios and cost lines must be consistent with each other and with the stated funding position. A statement that projects 95% occupancy from month one alongside a minimal wage bill will be challenged.",
      },
      {
        title: "Confusing the FVS with a full business plan",
        body: `The <a href="https://www.cqc.org.uk/guidance-regulation/providers/registration/supporting-documents-provider/document/financial-viability-template">CQC financial viability template</a> is not a pitch deck. It asks for a specific set of financial evidences, including projected cash flows, funding sources and opening capital. Submitting a narrative business plan instead of the required financial model delays registration.`,
      },
      {
        title: "Funding evidence not aligned to the cash-flow model",
        body: "If the model shows a £200,000 working-capital requirement but the funding evidence covers only the property deposit, CQC will spot the gap. Every source of capital, whether a director loan, a bank facility or third-party investment, must be evidenced and mapped into the model.",
      },
      {
        title: "Leaving the FVS to the last minute",
        body: "The financial viability statement is not the last step in CQC registration; it is a gating document. Submitting it late means the whole application waits. Preparing it early also surfaces financial weaknesses before they become a problem at the registration interview.",
      },
    ],
    howWeHelp: [
      {
        title: "Prepare or validate the statement on CQC's template with defensible projections",
        body: `We prepare the financial viability statement on <a href="https://www.cqc.org.uk/guidance-regulation/providers/registration/supporting-documents-provider/document/financial-viability-template">CQC's template</a> with realistic occupancy assumptions, a staffing cost line that reflects actual NMW rates and employer NIC, and a cash-flow model that holds together under scrutiny. If you have an existing draft, we validate it and close the gaps before submission.`,
      },
      {
        title: "Build the underlying cash-flow and funding model, not just the summary page",
        body: "The template summary is only as strong as the model behind it. We build the monthly cash-flow projection, map in all funding sources and stress-test the ramp period so the numbers on the template are backed by a document you can share with CQC, your bank or an investor.",
      },
      {
        title: "Join it to opening accounts, VAT and payroll so registration and go-live align",
        body: `We treat the FVS as the financial foundation for the whole start-up, not a standalone document. It connects to your opening accounts structure, your <a href="/services/care-vat-review">VAT position from day one</a> and your <a href="/services/care-payroll">payroll setup</a>, so the numbers you give CQC are the numbers your business actually operates on.`,
      },
    ],
    faqs: [
      {
        question: "What is a CQC financial viability statement?",
        answer: `A CQC financial viability statement is a document required by the Care Quality Commission as part of the application to register as a new care provider. It is submitted on <a href="https://www.cqc.org.uk/guidance-regulation/providers/registration/supporting-documents-provider/document/financial-viability-template">CQC's own template</a> and sets out your projected cash flows, funding position and opening capital to demonstrate that the business is financially capable of delivering regulated care. CQC uses it to assess whether the provider can sustain operations without financial failure.`,
      },
      {
        question: "Does the financial viability statement have to be prepared by an accountant?",
        answer: `There is no statutory requirement that an accountant prepares or signs the statement, but CQC's own guidance describes it as normally prepared or signed by an accountant. In practice, reviewers expect the cash-flow projections to be professionally prepared and internally consistent. A statement built by someone without financial modelling experience is more likely to attract questions or delays.`,
      },
      {
        question: "What does CQC's financial viability template ask for?",
        answer: `The template asks for projected cash flows, details of funding sources (including any director loans, bank facilities or third-party capital), opening balance-sheet information and evidence that the business can sustain operations through the start-up period. The specific fields are set out on <a href="https://www.cqc.org.uk/guidance-regulation/providers/registration/supporting-documents-provider/document/financial-viability-template">CQC's template page</a>. The projections must be consistent with your stated occupancy ramp, staffing model and cost base.`,
      },
      {
        question: "When in the registration process do I need the financial viability statement?",
        answer: `The financial viability statement is submitted as part of the provider registration application, before CQC approves the registration. It is not a post-approval step. Leaving it to the final stage of the application means the whole process waits while it is prepared. We recommend starting it as soon as your occupancy projections and funding position are clear.`,
      },
      {
        question: "What happens if CQC is not satisfied with our financial viability?",
        answer: `If CQC concludes that the financial viability statement does not demonstrate sufficient financial capacity, it can delay or refuse registration. This means you cannot legally begin providing regulated care until the position is resolved. For large providers already registered, CQC operates a separate <a href="https://www.cqc.org.uk/guidance-providers/market-oversight-corporate-providers/market-oversight-adult-social-care">market oversight regime</a> that monitors financial distress on an ongoing basis.`,
      },
      {
        question: "Is a financial viability statement the same as a business plan?",
        answer: `No. A business plan is a narrative document covering strategy, market position and operational plans. The CQC financial viability statement is a specific financial document submitted on CQC's own template, focused on cash flows, funding sources and capital adequacy. A business plan may support your application, but it does not substitute for the financial viability statement. Submitting one instead of the other is a common cause of application delays.`,
      },
    ],
  },
  {
    slug: "care-payroll",
    title: "Care Payroll",
    headline: "Payroll built for care rotas, not generic bureaus",
    metaTitle: "Care Home and Care Agency Payroll UK",
    metaDescription: "Payroll for UK care providers that gets sleep-ins, inter-call travel time and employer NIC right. Compliance-first, not commodity processing.",
    intro: `Care payroll is not standard payroll. The sector has three compliance risks that a generic bureau routinely misses: sleep-in shifts and the National Minimum Wage test set by the Supreme Court in <em>Mencap v Tomlinson-Blake</em>, inter-call travel time that must be paid as working time, and holiday pay reference periods that must include average travel and overtime payments. Add the <a href="https://www.gov.uk/national-minimum-wage-rates">National Living Wage of £12.71 for workers aged 21 and over from 1 April 2026</a>, employer NIC at <a href="https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026">15% above the £5,000 secondary threshold</a> and the true cost-per-head of sponsored overseas staff, and the wage bill is the single area where a processing error becomes an HMRC compliance event. We run payroll that handles all of it, and we model the cost base so your fee rates and budgets reflect reality.`,
    stats: [
      {
        value: "Awake and working",
        label: `Sleep-in workers are paid <a href="https://www.gov.uk/guidance/calculating-the-minimum-wage/working-hours-for-which-the-minimum-wage-must-be-paid">NMW only for time awake and working</a>, not the sleeping period; the Supreme Court settled this in <em>Royal Mencap Society v Tomlinson-Blake</em> [2021]`,
      },
      {
        value: "£12.71",
        label: `<a href="https://www.gov.uk/national-minimum-wage-rates">National Living Wage from 1 April 2026</a> for workers aged 21 and over; the dominant care-sector cost line before employer NIC and holiday pay`,
      },
      {
        value: "£10,500",
        label: `<a href="https://www.gov.uk/claim-employment-allowance">Employment Allowance</a> offsets employer NIC for eligible care operators; combined with the 15% rate above the <a href="https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026">£5,000 secondary threshold</a>, per-head NIC modelling is more accurate than a blanket percentage`,
      },
    ],
    challenges: [
      {
        title: "Paying only face-to-face time and ignoring inter-call travel",
        body: `<a href="https://www.gov.uk/guidance/calculating-the-minimum-wage/working-hours-for-which-the-minimum-wage-must-be-paid">Travel between client visits is working time for NMW purposes</a>. Rota systems that pay only for contact time and nothing for inter-call journeys create unlawful pay shortfalls. This is the single most common source of NMW underpayment in domiciliary care and a specific HMRC audit focus.`,
      },
      {
        title: "Holiday-pay reference periods that omit travel and overtime",
        body: `Holiday pay for irregular-hours care staff must be calculated on <a href="https://www.gov.uk/holiday-entitlement-rights">average hours worked in the reference period</a>, including travel payments and average overtime. Omitting those elements from the reference period understates entitlement and creates Employment Tribunal exposure.`,
      },
      {
        title: "Labelling rota carers as self-employed when they are workers in substance",
        body: `Workers on rotas who cannot send substitutes, who are told when and where to work and who are subject to the provider's direction are <a href="https://www.gov.uk/employment-status/employee">employees for PAYE purposes</a> regardless of the label on their contract. HMRC care-sector audits focus precisely on this pattern. Back-dated PAYE, NIC and NMW liability can reach years into the past.`,
      },
      {
        title: "Underestimating sponsored-worker cost per head in fee models",
        body: `Sponsoring overseas care staff through the <a href="https://www.gov.uk/health-care-worker-visa/eligibility">Health and Care Worker visa</a> requires an approved <a href="https://www.gov.uk/uk-visa-sponsorship-employers">sponsor licence</a> with ongoing HR record-keeping duties, and each sponsored worker triggers the immigration skills charge. Providers who do not model this cost per head into their fee rates routinely find the true wage bill is higher than budgeted.`,
      },
    ],
    howWeHelp: [
      {
        title: "Run payroll that treats sleep-ins, travel time and irregular-hours holiday accrual correctly",
        body: `We apply the <a href="https://www.gov.uk/guidance/calculating-the-minimum-wage/working-hours-for-which-the-minimum-wage-must-be-paid">awake-for-work test</a> to sleep-in shifts, include inter-call travel as working time and calculate holiday pay on the correct reference period including average travel and overtime payments. The result is a payroll run that reflects what the law requires, not what is easiest to process.`,
      },
      {
        title: "Model employer NIC and Employment Allowance per head so budgets are accurate",
        body: `We model <a href="https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026">employer NIC at 15%</a> above the £5,000 secondary threshold per worker, apply the <a href="https://www.gov.uk/claim-employment-allowance">£10,500 Employment Allowance</a> where you are eligible and produce a per-head cost figure you can use in fee-rate calculations. A blanket payroll percentage understates the cost for part-time-heavy rotas.`,
      },
      {
        title: "Build sponsored-staff and misclassification risk into your cost base before HMRC does",
        body: `We factor the sponsor licence obligations and per-head immigration skills charge into your cost model and review worker classification across your rota before HMRC does. Finding a misclassification risk on your terms, with time to correct it, is materially cheaper than finding it during an audit.`,
      },
    ],
    faqs: [
      {
        question: "Do we have to pay National Minimum Wage for sleep-in shifts?",
        answer: `Not for the sleeping period. The Supreme Court ruled in <em>Royal Mencap Society v Tomlinson-Blake</em> [2021] that workers on sleep-in shifts who are permitted to sleep are entitled to <a href="https://www.gov.uk/guidance/calculating-the-minimum-wage/working-hours-for-which-the-minimum-wage-must-be-paid">NMW only for time they are actually awake and working</a>. If sleeping facilities are not provided, or the worker must remain active throughout, the position changes. The analysis is fact-specific to the shift arrangement.`,
      },
      {
        question: "Do we have to pay care workers for travel time between visits?",
        answer: `Yes. <a href="https://www.gov.uk/guidance/calculating-the-minimum-wage/working-hours-for-which-the-minimum-wage-must-be-paid">Travel between one client's home and the next is working time for NMW purposes</a> and must be paid at or above the applicable rate. Commuting from home to the first visit or from the last visit home is excluded. Rota systems that pay only for face-to-face contact time create unlawful shortfalls on inter-call legs.`,
      },
      {
        question: "How is holiday pay calculated for zero-hours care staff?",
        answer: `Workers on irregular hours <a href="https://www.gov.uk/holiday-entitlement-rights">accrue holiday at 12.07% of hours worked in each pay period</a>. The holiday pay itself must be based on average earnings in the 52-week reference period and must include average travel-time payments and regular overtime. Calculating holiday pay on basic rate only, without those elements, understates entitlement.`,
      },
      {
        question: "Can we treat our carers as self-employed?",
        answer: `Only if they genuinely are. Workers on rotas who cannot send substitutes, who are told when and where to work and who operate under the provider's direction are <a href="https://www.gov.uk/employment-status/employee">employees in substance</a> regardless of what the contract says. HMRC focus care-sector audit activity on this pattern precisely because the label "self-employed" is routinely applied to workers who do not meet the test. The consequence is back-dated PAYE, NIC and NMW.`,
      },
      {
        question: "How much does employer NIC cost per care worker?",
        answer: `<a href="https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026">Employer NIC is 15%</a> on earnings above the secondary threshold of £5,000 per year (£96 per week / £417 per month). For a worker earning the <a href="https://www.gov.uk/national-minimum-wage-rates">National Living Wage of £12.71 per hour</a> on a 25-hour week, the weekly earnings are above the weekly threshold and employer NIC accrues on the excess. Modelling this per head, rather than applying a blanket percentage of total payroll, is more accurate for rosters with many part-time workers.`,
      },
      {
        question: "Can our care agency claim the Employment Allowance?",
        answer: `Most care operators are eligible. The <a href="https://www.gov.uk/claim-employment-allowance">Employment Allowance of £10,500 per tax year</a> offsets employer NIC and eliminates the bill entirely for smaller operators whose total liability is below that level. Larger groups may have the allowance restricted if the NIC liability spans associated entities. We confirm eligibility as part of the payroll setup.`,
      },
    ],
  },
  {
    slug: "care-vat-review",
    title: "Care VAT Review",
    headline: "Care VAT health-check: what you cannot recover and where you can",
    metaTitle: "VAT Review for Care Homes and Care Agencies UK",
    metaDescription: "VAT review for UK care providers. Welfare exemption, partial exemption, the £90,000 taxable-turnover threshold and HMRC's RCB 2/2025 challenge.",
    intro: `The care sector VAT position is counter-intuitive and widely misunderstood. Welfare services provided by a <a href="https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012">CQC-registered provider are VAT-exempt under Group 7 of Schedule 9 to the Value Added Tax Act 1994</a>. That sounds like a benefit. It is not: exemption means you cannot recover the VAT you pay on purchases, so every VAT charge on consumables, equipment, building works and professional fees is a permanent overhead. The review we run maps your supplies, quantifies the irrecoverable cost honestly, identifies where partial exemption or mixed activity creates legitimate recovery, and stress-tests any VAT-grouping structure against <a href="https://www.gov.uk/government/publications/revenue-and-customs-brief-2-2025-the-use-of-vat-grouping-within-the-care-industry/use-of-vat-grouping-within-the-care-industry">HMRC's Revenue and Customs Brief 2/2025</a> before HMRC does it for you.`,
    stats: [
      {
        value: "VAT-exempt",
        label: `Welfare services by a CQC-registered provider are exempt under <a href="https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012">Group 7, Schedule 9, VATA 1994</a>; input VAT on related purchases is irrecoverable, a permanent overhead not a perk`,
      },
      {
        value: "£90,000",
        label: `<a href="https://www.gov.uk/vat-registration/when-to-register">VAT registration is compulsory only once taxable turnover exceeds £90,000</a>; exempt care fees do not count toward the threshold, so a provider with multi-million-pound income may have zero registration obligation`,
      },
      {
        value: "£625/month",
        label: `Partial-exemption <a href="https://www.gov.uk/guidance/partial-exemption-vat-notice-706">de minimis allows full input-VAT recovery only if exempt input tax averages no more than £625 per month</a> and is under half of total input tax; most care providers will not pass this test`,
      },
    ],
    challenges: [
      {
        title: "Treating VAT exemption as a tax advantage",
        body: `The welfare <a href="https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012">VAT exemption</a> removes the obligation to charge VAT on care fees, but it simultaneously removes the right to recover VAT on purchases. For a care home with significant consumable, equipment and maintenance spend, the irrecoverable input VAT is a material cost that must be built into fee rates and budgets, not treated as a saving.`,
      },
      {
        title: "Mixed providers not running partial-exemption calculations",
        body: `If you make both exempt and taxable supplies (for example a day-centre selling goods or non-exempt courses alongside exempt care), you must apportion input VAT and apply <a href="https://www.gov.uk/guidance/partial-exemption-vat-notice-706">partial-exemption rules</a>. Failing to do so means either overclaiming VAT you were not entitled to, or leaving legitimately recoverable VAT on the table.`,
      },
      {
        title: "Relying on a pre-2025 VAT-grouping structure now under active HMRC challenge",
        body: `<a href="https://www.gov.uk/government/publications/revenue-and-customs-brief-2-2025-the-use-of-vat-grouping-within-the-care-industry/use-of-vat-grouping-within-the-care-industry">Revenue and Customs Brief 2/2025</a> sets out HMRC's position that VAT-group arrangements designed to convert exempt care supplies into taxable ones constitute tax avoidance. HMRC is refusing new registrations using these structures and exercising powers to remove parties from existing groups. Pre-2025 scheme marketing cannot be relied on.`,
      },
      {
        title: "Assuming a large-turnover care provider must register for VAT",
        body: `A provider whose entire income is from <a href="https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012">state-regulated welfare services</a> may have total income of several million pounds but zero taxable turnover. The <a href="https://www.gov.uk/vat-registration/when-to-register">£90,000 registration threshold</a> applies to taxable supplies only. Mixed providers must monitor their taxable supplies separately; a single non-exempt revenue stream can trigger registration obligations the rest of the business did not expect.`,
      },
    ],
    howWeHelp: [
      {
        title: "Map your supplies to the welfare exemption and quantify the irrecoverable-VAT cost",
        body: `We identify which of your supplies fall within the <a href="https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012">Group 7 welfare exemption</a>, which sit outside it, and what the irrecoverable input VAT amounts to across your real cost lines. That figure belongs in your fee model, not as a surprise in the accounts.`,
      },
      {
        title: "Run partial-exemption calculations for mixed activity",
        body: `For providers with taxable supplies alongside exempt care, we apply the <a href="https://www.gov.uk/guidance/partial-exemption-vat-notice-706">partial-exemption standard method</a> (or assess whether a special method is warranted) and run the de minimis test to establish what input VAT is legitimately recoverable. If the de minimis threshold is not met, we document why so the position is defensible.`,
      },
      {
        title: "Stress-test any VAT-grouping structure against RCB 2/2025",
        body: `If your structure includes a VAT group, we review it against <a href="https://www.gov.uk/government/publications/revenue-and-customs-brief-2-2025-the-use-of-vat-grouping-within-the-care-industry/use-of-vat-grouping-within-the-care-industry">HMRC's RCB 2/2025 position</a> before HMRC reviews it for you. Where a structure carries risk, we advise on remediation options. Where it is clean, we document why so there is a clear position to defend.`,
      },
    ],
    faqs: [
      {
        question: "Are care home fees VAT-exempt?",
        answer: `Yes, for CQC-registered providers. Welfare services supplied by a state-regulated provider are <a href="https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012">VAT-exempt under Group 7 of Schedule 9 to the Value Added Tax Act 1994</a>. CQC registration as a state-regulated provider qualifies the business. The exemption applies from the date CQC registration is approved, not during the application period.`,
      },
      {
        question: "Can a care home claim VAT back?",
        answer: `Generally no, on costs related to exempt care supplies. Because the care fees are VAT-exempt, <a href="https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012">input VAT on purchases used to make those exempt supplies is irrecoverable</a>. Mixed providers who also make taxable supplies may recover a proportion through <a href="https://www.gov.uk/guidance/partial-exemption-vat-notice-706">partial-exemption calculations</a>, but most care-only providers will not pass the de minimis test.`,
      },
      {
        question: "Do we have to register for VAT if our income is over £90,000?",
        answer: `Only if your <em>taxable</em> turnover exceeds <a href="https://www.gov.uk/vat-registration/when-to-register">£90,000 in the rolling 12-month period</a>. Exempt care fees do not count toward the threshold. A provider whose entire income is from regulated welfare services may have multi-million-pound revenue with zero taxable turnover and no registration obligation. A separate revenue stream (goods sales, non-exempt training) can change this.`,
      },
      {
        question: "What is partial exemption and does it apply to us?",
        answer: `<a href="https://www.gov.uk/guidance/partial-exemption-vat-notice-706">Partial exemption</a> applies when a business makes both VAT-exempt and taxable supplies. Input VAT must be attributed between them, and only the taxable-supply proportion is recoverable. A de minimis test allows full recovery if exempt input tax averages no more than £625 per month and is less than half of total input tax. Most care-only providers do not pass this test, but mixed providers (day centres, goods sellers) should run the calculation.`,
      },
      {
        question: "Is our VAT-grouping structure still safe after RCB 2/2025?",
        answer: `It depends on the structure. <a href="https://www.gov.uk/government/publications/revenue-and-customs-brief-2-2025-the-use-of-vat-grouping-within-the-care-industry/use-of-vat-grouping-within-the-care-industry">Revenue and Customs Brief 2/2025</a> targets VAT-group arrangements that incorporate unregulated entities to convert exempt care supplies into taxable ones, allowing input VAT recovery. HMRC is refusing new group registrations using these structures and removing parties from existing groups. If your structure was set up with that purpose, it needs review now.`,
      },
      {
        question: "Does VAT exemption start when we apply to CQC or when we are registered?",
        answer: `When you are registered. <a href="https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012">HMRC's VAT Notice 701/2 confirms that the exemption applies from the date CQC registration is approved</a>, not during the application period. Supplies made before registration approval are not exempt and must be treated as taxable (assuming the registration threshold is met). This timing matters for providers with a gap between trading and formal registration.`,
      },
    ],
  },
  {
    slug: "buying-a-care-home",
    title: "Buying a Care Home",
    headline: "The financial due diligence and tax you need when buying a care home",
    metaTitle: "Buying a Care Home: Financial Due Diligence and Tax",
    metaDescription: "Financial due diligence, capital allowances and acquisition-structure advice for buying a care home. FA 2026 rates, propco/opco and FNC fee-mix analysis.",
    intro: `Buying a care home is one of the more complex acquisitions in the UK market: a regulated business, a property with capital-allowances value embedded in the fit-out, a fee mix that looks different once you separate local-authority, self-funder and <a href="https://www.gov.uk/government/news/better-community-care-thanks-to-nursing-funding-boost">NHS-funded nursing care income</a>, and a structure decision (asset vs share, propco/opco) that determines corporation tax, capital allowances eligibility and <a href="https://www.gov.uk/corporation-tax-rates">the rate at which the group hits 25% CT</a>. Brokers and M&A advisers own valuation and deal-sourcing; we own the accountant's slice: due diligence on the real financial position, the capital-allowances value in the building and fit-out, and the structure that minimises tax on acquisition and ongoing operations. We work alongside your broker and solicitor, not instead of them.`,
    stats: [
      {
        value: "£1,000,000",
        label: `<a href="https://www.gov.uk/capital-allowances/annual-investment-allowance">Annual Investment Allowance</a> gives a 100% first-year deduction on qualifying plant and machinery (hoists, beds, specialist fit-out) up to £1m per year, frequently absorbing the entire year-one plant spend on a care home acquisition`,
      },
      {
        value: "40% FYA",
        label: `From April 2026, a new <a href="https://www.legislation.gov.uk/ukpga/2026/11/section/29">40% first-year allowance under Finance Act 2026 s.29</a> applies to qualifying new main-pool additions, with the main-rate <a href="https://www.legislation.gov.uk/ukpga/2026/11/section/28">writing-down allowance at 14%</a> on the remaining pool`,
      },
      {
        value: "3% SBA",
        label: `<a href="https://www.gov.uk/guidance/claiming-capital-allowances-for-structures-and-buildings">Structures and Buildings Allowance</a> gives 3% per year straight-line on qualifying construction: on a £4m new build, that is £120,000 of annual allowances over 33 and one-third years`,
      },
    ],
    challenges: [
      {
        title: "Buying at a fee mix that looks fine until you separate the income streams",
        body: `LA-funded residents, self-funders and residents receiving <a href="https://www.gov.uk/government/news/better-community-care-thanks-to-nursing-funding-boost">NHS-funded nursing care (FNC at £267.68 standard / £368.24 higher rate from 1 April 2026)</a> generate materially different income security and margin profiles. A blended average occupancy figure in a sales pack masks this; due diligence must disaggregate the fee mix.`,
      },
      {
        title: "Missing the capital-allowances value embedded in the property and fit-out",
        body: `The care home building and its specialist fit-out contain capital-allowances value that reduces the effective acquisition cost. Failing to quantify it before agreeing a price means that value either stays with the seller or is never claimed. The sequencing matters: <a href="https://www.gov.uk/capital-allowances/annual-investment-allowance">AIA</a> first, then the <a href="https://www.legislation.gov.uk/ukpga/2026/11/section/29">40% FYA</a> on residual new main-pool additions, then the <a href="https://www.legislation.gov.uk/ukpga/2026/11/section/28">14% WDA</a> on the remaining pool, then <a href="https://www.gov.uk/guidance/claiming-capital-allowances-for-structures-and-buildings">3% SBA</a> on qualifying construction.`,
      },
      {
        title: "Propco/opco structures triggering the associated-company CT trap",
        body: `A structure where one company owns the property and another operates the care business is common in the sector. <a href="https://www.gov.uk/corporation-tax-rates">Associated-company rules reduce the CT thresholds proportionately</a>, so two associated companies each reach the 25% main rate at £125,000 of profits rather than £250,000. A group structured before understanding this may pay 25% CT sooner than it expected.`,
      },
      {
        title: "Treating VAT exemption as neutral when it is a permanent cost",
        body: `The acquired operation's <a href="https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012">welfare VAT exemption</a> means input VAT on consumables, equipment, building works and professional fees is irrecoverable from day one. This is a permanent overhead that belongs in the acquisition financial model, not something to discover in the first set of accounts after completion.`,
      },
    ],
    howWeHelp: [
      {
        title: "Run financial due diligence that stress-tests the real fee mix and cost base",
        body: `We analyse the target's income by stream (LA, self-funder, <a href="https://www.gov.uk/government/news/better-community-care-thanks-to-nursing-funding-boost">FNC</a>), review staffing ratios and occupancy trends, and model the cost base including employer NIC, care-specific payroll risks and the irrecoverable VAT overhead. The result is a financial position you can underwrite, not the blended figure in the sales pack.`,
      },
      {
        title: "Quantify the capital-allowances position so the price reflects the tax value",
        body: `We establish the capital-allowances pool in the property and fit-out, apply the correct post-April 2026 sequencing (<a href="https://www.gov.uk/capital-allowances/annual-investment-allowance">AIA</a> then <a href="https://www.legislation.gov.uk/ukpga/2026/11/section/29">40% FYA</a> then <a href="https://www.legislation.gov.uk/ukpga/2026/11/section/28">14% WDA</a> then <a href="https://www.gov.uk/guidance/claiming-capital-allowances-for-structures-and-buildings">3% SBA</a>) and present the tax value so it can be factored into the price negotiation and the post-acquisition cash forecast.`,
      },
      {
        title: "Advise on acquisition structure with the CT and BADR consequences modelled",
        body: `We model asset vs share purchase, propco/opco arrangements and the associated-company <a href="https://www.gov.uk/corporation-tax-rates">CT threshold</a> effects. If you plan to sell eventually, we also consider whether the structure preserves <a href="/services/selling-a-care-home">Business Asset Disposal Relief eligibility</a> from day one.`,
      },
    ],
    faqs: [
      {
        question: "What financial due diligence should I do before buying a care home?",
        answer: `The key areas are: income disaggregated by LA-funded, self-funder and <a href="https://www.gov.uk/government/news/better-community-care-thanks-to-nursing-funding-boost">FNC streams</a>; historical occupancy and the staffing cost as a percentage of fee income; the capital-allowances value in the building and fit-out; the irrecoverable <a href="https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012">VAT overhead</a>; and any CQC compliance history that affects the regulatory risk. A broker will provide a trading pack, but independent financial due diligence goes behind the blended numbers.`,
      },
      {
        question: "What capital allowances can I claim when I buy a care home?",
        answer: `Specialist care equipment, hoists, beds and fit-out items are qualifying plant and machinery. The <a href="https://www.gov.uk/capital-allowances/annual-investment-allowance">Annual Investment Allowance</a> gives a 100% deduction on up to £1m per year. Beyond AIA, a <a href="https://www.legislation.gov.uk/ukpga/2026/11/section/29">new 40% first-year allowance (FA 2026 s.29)</a> applies to qualifying new main-pool additions, with <a href="https://www.legislation.gov.uk/ukpga/2026/11/section/28">14% writing-down allowance</a> on the remaining pool. New or extended buildings qualify for <a href="https://www.gov.uk/guidance/claiming-capital-allowances-for-structures-and-buildings">Structures and Buildings Allowance at 3% per year</a>.`,
      },
      {
        question: "Should I buy the shares or the assets of a care home business?",
        answer: `The tax and commercial consequences differ significantly. An asset purchase lets the buyer set a new capital-allowances base on the acquired assets and avoids inheriting historic liabilities. A share purchase transfers the company with its full history, which can include CQC registration continuity benefits but also unknown liabilities. The right answer depends on the specific target, your funding structure and your appetite for inherited risk.`,
      },
      {
        question: "What is a propco/opco structure and is it right for a care home purchase?",
        answer: `A propco/opco structure separates property ownership (the property company) from care operations (the operating company). It is common in the sector as a way to protect the property from operating risk. The main tax consequence to model is the <a href="https://www.gov.uk/corporation-tax-rates">associated-company rule</a>: two associated companies each reach the 25% CT main rate at half the standard threshold. The structure must also be reviewed for its effect on Business Asset Disposal Relief eligibility on eventual sale.`,
      },
      {
        question: "Do I pay VAT when buying a care home?",
        answer: `The purchase of a going-concern care business is typically structured as a Transfer of a Going Concern (TOGC), which can be treated as outside the scope of VAT if the conditions are met. The property element may also be subject to VAT depending on whether the seller has opted to tax. The exact VAT position on the deal depends on the transaction structure and should be confirmed before exchange. On an ongoing basis, the operation's <a href="https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012">welfare exemption</a> means input VAT on purchases is irrecoverable.`,
      },
      {
        question: "How do associated-company rules affect my corporation tax after acquisition?",
        answer: `Where two or more companies are associated (broadly, under common control), <a href="https://www.gov.uk/corporation-tax-rates">the CT profit thresholds are divided between them</a>. In a propco/opco structure with two associated companies, the small profits rate (19%) applies only up to £25,000 per company and the 25% main rate applies above £125,000 per company, rather than the £50,000/£250,000 thresholds that apply to a standalone entity. Groups with more associated companies divide the thresholds further.`,
      },
    ],
  },
  {
    slug: "selling-a-care-home",
    title: "Selling a Care Home",
    headline: "Selling a care home: keeping more of the proceeds",
    metaTitle: "Selling a Care Home: CGT, BADR and Tax Planning",
    metaDescription: "CGT and Business Asset Disposal Relief when selling a care home. BADR at 18% from 6 April 2026, propco/opco traps and pre-sale structuring.",
    intro: `When you sell a care home, the tax on the gain is the most controllable variable in the proceeds calculation. <a href="https://www.gov.uk/business-asset-disposal-relief">Business Asset Disposal Relief</a> reduces the capital gains tax rate on qualifying disposals to <a href="https://www.gov.uk/capital-gains-tax/rates">18% from 6 April 2026</a> (not the 10% rate that applied before April 2025), compared with the standard higher-rate CGT of 24%. The difference is worth planning for, but the eligibility conditions can be broken by the structure of the business, and a propco/opco arrangement that made sense at acquisition can eliminate BADR at exit. The time to review the structure is well before the disposal, because the qualifying period for BADR runs backwards from the date of sale. We model the tax position, review ownership structure for BADR eligibility and prepare the financial information a buyer's due diligence will demand, so the exit is planned rather than reactive.`,
    stats: [
      {
        value: "18%",
        label: `<a href="https://www.gov.uk/business-asset-disposal-relief">Business Asset Disposal Relief</a> rate for qualifying care business disposals <a href="https://www.gov.uk/capital-gains-tax/rates">from 6 April 2026</a>; applies on up to £1m of lifetime qualifying gains`,
      },
      {
        value: "6 percentage points",
        label: `BADR saves 6 percentage points versus the <a href="https://www.gov.uk/capital-gains-tax/rates">standard higher-rate CGT of 24% from 6 April 2026</a>; on a £500,000 gain within the lifetime limit, that is a £30,000 difference`,
      },
      {
        value: "2 years",
        label: `<a href="https://www.gov.uk/business-asset-disposal-relief">BADR requires 2 years of qualifying trading ownership</a> before the disposal date; a structure set up too close to sale can miss the window entirely`,
      },
    ],
    challenges: [
      {
        title: "Assuming BADR is still 10% when the rate is 18% from 6 April 2026",
        body: `The <a href="https://www.gov.uk/business-asset-disposal-relief">BADR rate</a> was 10% for disposals on or before 5 April 2025, 14% between 6 April 2025 and 5 April 2026, and is <a href="https://www.gov.uk/capital-gains-tax/rates">18% for disposals from 6 April 2026</a>. Any exit tax modelling based on the historic 10% rate overstates the BADR benefit and understates the tax bill. This is the most common stale-figure error in care-home exit planning.`,
      },
      {
        title: "A propco/opco structure that unintentionally breaks BADR eligibility",
        body: `<a href="https://www.gov.uk/business-asset-disposal-relief">BADR conditions</a> require the disposal to be of a qualifying trading business (or shares in a qualifying trading company). A structure where one company holds the property and another operates the care business can result in the property company being treated as an investment company rather than a trading company, breaking the eligibility condition. The structure must be reviewed before the exit window, not during the sale process.`,
      },
      {
        title: "Not meeting the 2-year qualifying period because the structure changed too recently",
        body: `<a href="https://www.gov.uk/business-asset-disposal-relief">BADR requires 2 years of trading ownership</a> immediately before the disposal. A restructure, share issue or change in ownership that takes place within 2 years of a planned exit can reset the clock. Reviewing and fixing the structure must happen early enough for the qualifying period to run.`,
      },
      {
        title: "Treating an asset sale and a share sale as tax-equivalent for the seller",
        body: `In a share sale, the seller disposes of the shares in the operating company and may be eligible for BADR on that disposal. In an asset sale, the company disposes of its assets and the proceeds sit in the company before being extracted, typically as a dividend or liquidation distribution. The tax treatment and the rate that applies differ between the two routes. The structure of the deal should be modelled for the seller's tax position before heads of terms are agreed.`,
      },
    ],
    howWeHelp: [
      {
        title: "Model the CGT and BADR position on your disposal at the current 18% rate",
        body: `We calculate the expected gain on disposal, apply <a href="https://www.gov.uk/business-asset-disposal-relief">BADR at 18%</a> where conditions are met and model the after-tax proceeds under both asset-sale and share-sale structures. The output is a number you can plan around, built on the current rates rather than the historic 10% figure that circulates in the sector.`,
      },
      {
        title: "Review propco/opco and ownership structure well before exit so BADR is not lost",
        body: `We review the legal and ownership structure against the <a href="https://www.gov.uk/business-asset-disposal-relief">BADR qualifying conditions</a> with enough time to make changes and allow the 2-year window to run. Where a structure is at risk of breaking eligibility, we advise on remediation options. Where it is clean, we document the position so there is no dispute at the point of disposal.`,
      },
      {
        title: "Prepare the financial information a buyer's due diligence will demand",
        body: `The information a buyer needs mirrors what we would review on <a href="/services/buying-a-care-home">the buy side</a>: disaggregated fee income, occupancy history, staffing cost analysis and capital-allowances history. Having this prepared and organised before going to market shortens the due-diligence period and reduces the risk of price chipping after an offer is agreed.`,
      },
    ],
    faqs: [
      {
        question: "How much capital gains tax will I pay when I sell my care home?",
        answer: `It depends on the gain, your other income and whether BADR applies. The <a href="https://www.gov.uk/capital-gains-tax/rates">standard higher-rate CGT rate is 24% from 6 April 2026</a>. If <a href="https://www.gov.uk/business-asset-disposal-relief">Business Asset Disposal Relief</a> applies, the rate is 18% on up to £1m of lifetime qualifying gains. The gap is 6 percentage points. Modelling the position before going to market lets you structure the disposal to maximise BADR eligibility.`,
      },
      {
        question: "Can I claim Business Asset Disposal Relief on the sale of my care home?",
        answer: `BADR is available on the disposal of a qualifying trading business or shares in a qualifying trading company, subject to a <a href="https://www.gov.uk/business-asset-disposal-relief">2-year ownership and trading condition</a>. Care operations generally qualify as a trading activity. The most common disqualifying factor in the care sector is a propco/opco structure where the property company is treated as an investment company rather than a trading company. The structure must be reviewed against the eligibility conditions before the disposal.`,
      },
      {
        question: "What is the BADR rate now?",
        answer: `<a href="https://www.gov.uk/business-asset-disposal-relief">Business Asset Disposal Relief</a> is <a href="https://www.gov.uk/capital-gains-tax/rates">18% for qualifying disposals from 6 April 2026</a>. The rate was 10% for disposals on or before 5 April 2025 and 14% between 6 April 2025 and 5 April 2026. The lifetime limit on gains eligible for BADR is £1m across all qualifying disposals.`,
      },
      {
        question: "Will my propco/opco structure affect the tax on sale?",
        answer: `Potentially yes, and significantly. <a href="https://www.gov.uk/business-asset-disposal-relief">BADR eligibility</a> requires the disposal to be of a trading business or trading company shares. In a propco/opco structure, the property company may be treated as holding investment property rather than carrying on a trade. If so, BADR on the property company shares may not be available. The analysis depends on the specific structure and the nature of activities in each entity.`,
      },
      {
        question: "Should I sell the shares or the assets of my care business?",
        answer: `A share sale transfers the company to the buyer; the seller disposes of the shares and any CGT (including BADR eligibility) is assessed at that level. An asset sale has the company dispose of its assets; the proceeds are then in the company and must be extracted, typically via liquidation or dividend, each with their own tax treatment. Buyers often prefer asset purchases because they acquire a clean entity; sellers often prefer share sales for the CGT treatment. Heads of terms should not be agreed before modelling both routes for the seller.`,
      },
      {
        question: "How far in advance should I plan the tax on selling my care home?",
        answer: `At minimum two years before the planned disposal, because <a href="https://www.gov.uk/business-asset-disposal-relief">BADR requires a 2-year qualifying period</a> running up to the date of sale. Any structural changes needed to secure BADR eligibility must be in place with enough time for the window to run. In practice, reviewing the ownership and corporate structure three to five years before a planned exit gives the most options and the lowest tax cost.`,
      },
    ],
  },
  {
    slug: "start-a-domiciliary-care-agency",
    title: "Start a Domiciliary Care Agency",
    headline: "Starting a domiciliary care agency: the financial setup done right",
    metaTitle: "Start a Domiciliary Care Agency: Accounts and Finance",
    metaDescription: "Accounts, projections and CQC financial paperwork for starting a domiciliary care agency. FVS, VAT position, payroll and NMW cost base from day one.",
    intro: `Starting a domiciliary care agency involves two sets of paperwork: the compliance documents CQC consultants help with, and the financial documents that accountants build. We own the second set. <a href="https://www.cqc.org.uk/guidance-providers/registration">CQC registration is mandatory before you provide any regulated activity</a>, and the application includes a <a href="https://www.cqc.org.uk/guidance-regulation/providers/registration/supporting-documents-provider/document/financial-viability-template">financial viability statement on CQC's own template</a>, which we prepare. Alongside it, we set up the right legal structure, build financial projections that reflect the real wage bill (including <a href="https://www.gov.uk/guidance/calculating-the-minimum-wage/working-hours-for-which-the-minimum-wage-must-be-paid">inter-call travel time as paid working time</a> and <a href="https://www.gov.uk/national-minimum-wage-rates">NLW at £12.71 from 1 April 2026</a>), establish the VAT position from day one and stand up payroll correctly before you take on your first client. The financial foundation and the CQC financial paperwork go up together, not one after the other.`,
    stats: [
      {
        value: "Pre-registration",
        label: `<a href="https://www.cqc.org.uk/guidance-providers/registration">CQC registration is mandatory before providing regulated activities</a>; new providers must submit a <a href="https://www.cqc.org.uk/guidance-regulation/providers/registration/supporting-documents-provider/document/financial-viability-template">financial viability statement on CQC's template</a> as part of the application`,
      },
      {
        value: "VAT-exempt",
        label: `Welfare supplies are <a href="https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012">VAT-exempt from CQC registration</a>, so input VAT is irrecoverable from day one; <a href="https://www.gov.uk/vat-registration/when-to-register">VAT registration only bites once taxable turnover exceeds £90,000</a>`,
      },
      {
        value: "£12.71",
        label: `<a href="https://www.gov.uk/national-minimum-wage-rates">NLW from 1 April 2026</a> for workers aged 21 and over; the dominant cost line before <a href="https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026">employer NIC at 15% above £5,000</a> and paid inter-call travel time`,
      },
    ],
    challenges: [
      {
        title: "Projections that ignore inter-call travel time and understate the real wage bill",
        body: `<a href="https://www.gov.uk/guidance/calculating-the-minimum-wage/working-hours-for-which-the-minimum-wage-must-be-paid">Travel between client visits is working time for NMW purposes</a> and must be paid at or above the applicable rate. A projection built on contact-time hours only understates the wage bill by the travel burden across all carers. For a new agency this error can make the business look viable when the real hourly economics do not work.`,
      },
      {
        title: "Leaving the CQC financial viability statement to the last minute",
        body: `The <a href="https://www.cqc.org.uk/guidance-regulation/providers/registration/supporting-documents-provider/document/financial-viability-template">financial viability statement</a> is a gating document in the CQC application, not a final step. Building it requires the same financial projections that underpin the business; doing them once, for both purposes, avoids two rounds of work and ensures the numbers you give CQC match the numbers you run the business on.`,
      },
      {
        title: "Assuming VAT registration or recovery when supplies are exempt",
        body: `A domiciliary care agency providing regulated personal care is a <a href="https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012">VAT-exempt supplier from the date CQC registration is approved</a>. This means the business does not charge VAT on care fees and cannot recover VAT on purchases. Founders who assume they will register for VAT and reclaim input VAT on set-up costs, vehicles or equipment need to understand this position before they spend.`,
      },
      {
        title: "An owner-manager pay structure not modelled from the start",
        body: `Owner-directors of a limited company typically draw a salary to the personal allowance and take the remainder as dividends. <a href="https://www.gov.uk/tax-on-dividends">Dividend tax rates from 6 April 2026 are 10.75% (basic rate), 35.75% (higher rate) and 39.35% (additional rate)</a> above the £500 annual dividend allowance. If you trade personally as a sole trader and your income exceeds £50,000, <a href="https://www.gov.uk/guidance/check-if-youre-eligible-for-making-tax-digital-for-income-tax">Making Tax Digital for Income Tax applies from 6 April 2026</a>. Both scenarios need modelling before you choose a structure.`,
      },
    ],
    howWeHelp: [
      {
        title: "Set up the right structure and opening accounts, MTD-IT ready if you trade personally",
        body: `We advise on limited company versus sole trader based on your income level, risk appetite and growth plans. If you incorporate, we set up the opening accounts and establish the owner-director pay structure. If you trade personally, we confirm whether <a href="https://www.gov.uk/guidance/check-if-youre-eligible-for-making-tax-digital-for-income-tax">MTD-IT applies</a> from the outset and set up compatible record-keeping before HMRC requires it.`,
      },
      {
        title: "Build projections and the CQC financial viability statement together",
        body: `We build the financial projections with the real cost base (NLW, inter-call travel time, employer NIC per head, irrecoverable VAT) and use the same model to prepare the <a href="https://www.cqc.org.uk/guidance-regulation/providers/registration/supporting-documents-provider/document/financial-viability-template">CQC financial viability statement</a>. One set of numbers, two outputs: the statement CQC requires and the projections your bank or investor expects. See also our dedicated <a href="/services/cqc-financial-viability-statement">CQC financial viability statement service</a>.`,
      },
      {
        title: "Stand up payroll, VAT and sponsored-staff cost base before you take on your first client",
        body: `We set up payroll to handle irregular-hours holiday accrual at <a href="https://www.gov.uk/holiday-entitlement-rights">12.07%</a>, inter-call travel time and <a href="https://www.gov.uk/guidance/calculating-the-minimum-wage/working-hours-for-which-the-minimum-wage-must-be-paid">sleep-in NMW correctly</a>. If you plan to sponsor overseas carers through the <a href="https://www.gov.uk/health-care-worker-visa/eligibility">Health and Care Worker visa</a>, we build the <a href="https://www.gov.uk/uk-visa-sponsorship-employers">sponsor licence</a> obligations and immigration skills charge into your per-head cost model from the start.`,
      },
    ],
    faqs: [
      {
        question: "What financial paperwork does CQC need to register a domiciliary care agency?",
        answer: `The CQC registration application for a new provider includes a requirement to submit a <a href="https://www.cqc.org.uk/guidance-regulation/providers/registration/supporting-documents-provider/document/financial-viability-template">financial viability statement on CQC's own template</a>. This sets out projected cash flows, funding sources and opening capital to demonstrate that the business is financially capable of delivering regulated care. <a href="https://www.cqc.org.uk/guidance-providers/registration">Trading before CQC registration is a criminal offence</a> under the Health and Social Care Act 2008, so the application must be completed before you take on your first client.`,
      },
      {
        question: "Do I need an accountant to start a domiciliary care agency?",
        answer: `Not legally, but the financial requirements make professional input worthwhile at the start rather than retrospectively. The CQC financial viability statement is normally prepared or signed by an accountant. Beyond that, the NMW compliance position on inter-call travel time, the employer NIC modelling per head and the VAT position from day one all require judgments that are easier (and cheaper) to get right at setup than to fix after HMRC or CQC has asked the question.`,
      },
      {
        question: "Should I set up as a sole trader or a limited company?",
        answer: `Both are viable. A limited company separates personal and business liability and allows the owner-director pay structure (salary plus dividends), with <a href="https://www.gov.uk/tax-on-dividends">dividend tax at 10.75% (basic), 35.75% (higher) or 39.35% (additional) above the £500 allowance from 6 April 2026</a>. A sole trader is simpler to set up but personal liability is unlimited, and if income exceeds £50,000 from 6 April 2026, <a href="https://www.gov.uk/guidance/check-if-youre-eligible-for-making-tax-digital-for-income-tax">Making Tax Digital for Income Tax applies</a>. The right answer depends on projected income, growth plans and risk appetite.`,
      },
      {
        question: "Do I need to register for VAT to run a care agency?",
        answer: `Only if your taxable turnover exceeds <a href="https://www.gov.uk/vat-registration/when-to-register">£90,000 in the rolling 12-month period</a>. The regulated personal care services you provide as a CQC-registered domiciliary agency are <a href="https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012">VAT-exempt welfare supplies</a>, which do not count toward the threshold. A care-only agency can have significant turnover with zero taxable supplies and no registration obligation. If you offer any non-exempt services alongside care, those supplies must be monitored separately.`,
      },
      {
        question: "What will my staff really cost once I add travel time and employer NIC?",
        answer: `At <a href="https://www.gov.uk/national-minimum-wage-rates">£12.71 NLW from 1 April 2026</a>, employer NIC at <a href="https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026">15% above the £5,000 secondary threshold</a>, <a href="https://www.gov.uk/holiday-entitlement-rights">holiday accrual at 12.07%</a> of hours worked and inter-call travel time paid at the NLW rate, the true cost per care hour is materially above the headline wage rate. <a href="/calculators/true-cost-care-hour-calculator">Use our true cost of a care hour calculator</a> to model the full per-hour cost against your proposed fee rate before you take on your first contract.`,
      },
      {
        question: "Does Making Tax Digital apply to me as a care-agency owner?",
        answer: `If you operate as a sole trader and your combined self-employment and property income exceeds £50,000, <a href="https://www.gov.uk/guidance/check-if-youre-eligible-for-making-tax-digital-for-income-tax">MTD for Income Tax applies from 6 April 2026</a>. The threshold drops to £30,000 from 6 April 2027 and £20,000 from 6 April 2028. MTD requires quarterly updates to HMRC using compatible software. If you incorporate, the company files corporation tax returns under standard CT rules and MTD-IT does not apply to the company itself.`,
      },
    ],
  },
];

export function getService(slug: string): CareService | undefined {
  return careServices.find((s) => s.slug === slug);
}
