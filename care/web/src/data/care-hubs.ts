export interface CareHub {
  slug: string; title: string; headline: string; metaTitle: string; metaDescription: string;
  intro: string; stats: Array<{ value: string; label: string }>;
  challenges: Array<{ title: string; body: string }>;
  howWeHelp: Array<{ title: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

export const careHubs: CareHub[] = [
  {
    slug: "care-homes",
    title: "Care Homes",
    headline: "Accountancy and financial compliance for UK care home operators",
    metaTitle: "Accountants for Care Homes UK | Fee Mix & VAT",
    metaDescription: "Specialist accountants for UK care homes. Fee-mix accounting, VAT exemption, FNC income, capital allowances and payroll for home operators.",
    intro: "A care home P&amp;L is unlike any other business. Fee income flows from self-funders, local authorities, NHS-funded nursing care and NHS continuing healthcare, each accounted separately and each subject to different funding rules. Input VAT on consumables, equipment and building work is a permanent overhead because CQC-registered providers are VAT-exempt. Occupancy, staffing percentage and the building's tax treatment are the three levers that move margin. We work with residential and nursing home operators on all of it.",
    stats: [
      { value: "£267.68", label: "NHS-funded nursing care standard weekly rate from 1 April 2026 (England)" },
      { value: "£1,000,000", label: "Annual Investment Allowance on qualifying plant and equipment in a single year" },
      { value: "3%", label: "Structures and Buildings Allowance per year on qualifying care-home construction costs" },
    ],
    challenges: [
      {
        title: "VAT exemption is a cost, not a benefit",
        body: "<a href=\"https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012\">HMRC Notice 701/2</a> confirms that CQC-registered providers supply VAT-exempt welfare services. That sounds helpful until you realise exemption means you cannot recover input VAT on the consumables, equipment, building works and professional fees used to make those exempt supplies. The VAT on a new clinical-wash machine, a lift refurbishment or an accountant's invoice is a real, unrecoverable cost. Most care homes cannot register for VAT even if they wanted to, because <a href=\"https://www.gov.uk/vat-registration/when-to-register\">the £90,000 registration threshold is measured on <strong>taxable</strong> turnover only</a>, and exempt care fees do not count.",
      },
      {
        title: "Four fee-payers, four accounting treatments",
        body: "Self-funder income, local authority income, <a href=\"https://www.gov.uk/government/news/better-community-care-thanks-to-nursing-funding-boost\">NHS-funded nursing care (FNC)</a> and NHS continuing healthcare (CHC) all land in different ledger buckets. FNC is a direct NHS payment to the nursing home at a standard or higher weekly rate; it is not a top-up to the self-funder fee. CHC funds the full care package and changes who the supply is made to. Mixing these in the accounts creates a garbled P&amp;L and makes fee negotiation with the local authority much harder.",
      },
      {
        title: "Local authority rates and the fair-cost-of-care evidence",
        body: "<a href=\"https://www.gov.uk/government/publications/care-act-statutory-guidance/care-and-support-statutory-guidance\">Care Act statutory guidance</a> places a duty on local authorities to pay a fee that reflects the actual cost of care. The <a href=\"https://www.gov.uk/government/publications/market-sustainability-and-improvement-fund-2024-to-2025\">market sustainability framework</a> gives providers a formal basis for challenging below-cost rates, but only if they can produce a properly costed fee model. Management accounts structured around bed-type, staffing hours and occupancy generate exactly that evidence.",
      },
      {
        title: "Capital allowances on a care-home building are often missed",
        body: "Many operators leave significant tax relief unclaimed on fit-out. The sequencing is: <a href=\"https://www.gov.uk/capital-allowances/annual-investment-allowance\">Annual Investment Allowance up to £1,000,000</a> absorbs qualifying plant and machinery first; any residual main-pool additions then attract the <a href=\"https://www.legislation.gov.uk/ukpga/2026/11/section/29\">40% first-year allowance introduced by Finance Act 2026</a> before the remaining pool writes down at <a href=\"https://www.legislation.gov.uk/ukpga/2026/11/section/28\">14% from April 2026</a>. New-build or extension costs attract <a href=\"https://www.gov.uk/guidance/claiming-capital-allowances-for-structures-and-buildings\">Structures and Buildings Allowance at 3% per year</a> over 33 and a third years.",
      },
    ],
    howWeHelp: [
      {
        title: "Fee-mix accounts and management reporting",
        body: "We structure care-home accounts around the four fee-payer categories so FNC, CHC, LA and self-funder income are separated from the start. Monthly management reports track occupied beds by fee type, staffing cost as a proportion of occupied-bed revenue, and the margin contribution each fee stream produces. That gives operators the evidence base for local authority rate negotiations and for CQC <a href=\"https://www.cqc.org.uk/guidance-providers/market-oversight-corporate-providers/market-oversight-adult-social-care\">market-oversight disclosures</a> where they apply.",
      },
      {
        title: "VAT review and capital-allowances planning",
        body: "We review the full input-VAT position so partial-exemption calculations are correct where a home has any taxable income. For building projects, we walk through the capital-allowances sequencing: AIA on qualifying plant, then the 40% first-year allowance on residual main-pool additions, then WDA at 14% on the pool balance, and SBA at 3% on structural construction costs. See our <a href=\"/services/care-vat-review\">care VAT review</a> and <a href=\"/services/buying-a-care-home\">buying a care home</a> service pages.",
      },
      {
        title: "Payroll, corporation tax and owner extraction",
        body: "Care-home staffing is the dominant cost line. We run payroll with Employment Allowance applied correctly, employer NIC modelled per head rather than as a blanket percentage, and holiday pay calculated on the right reference period for variable-hours workers. For owner-directors, we structure salary and dividends against the <a href=\"https://www.gov.uk/corporation-tax-rates\">19%/25% corporation tax bands</a> and the <a href=\"https://www.gov.uk/tax-on-dividends\">dividend rates from 6 April 2026</a>. See our <a href=\"/services/care-payroll\">care payroll service</a>.",
      },
    ],
    faqs: [
      {
        question: "Are care home fees VAT exempt, and can we reclaim VAT on our costs?",
        answer: "Yes, care home fees supplied by a CQC-registered provider are VAT-exempt under Group 7 of Schedule 9 VATA 1994 (<a href=\"https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012\">HMRC Notice 701/2</a>). VAT exemption means you cannot reclaim input VAT on costs used to make those exempt supplies. The VAT on consumables, equipment and building works is a permanent overhead, not a recoverable amount.",
      },
      {
        question: "How is NHS funded nursing care accounted for separately from LA and self-funder fees?",
        answer: "<a href=\"https://www.gov.uk/government/news/better-community-care-thanks-to-nursing-funding-boost\">FNC</a> is a direct NHS payment to the nursing home at a fixed weekly rate (£267.68 standard, £368.24 higher from 1 April 2026 in England). It is not the resident's money and it is not a component of the self-funder fee. Full NHS continuing healthcare funds the entire package and changes the counterparty to the NHS. These must sit in separate nominal codes from LA and self-funder income.",
      },
      {
        question: "Do care homes pay business rates?",
        answer: "Yes. Residential care homes are rateable properties. <a href=\"https://www.gov.uk/apply-for-business-rate-relief/small-business-rate-relief\">Small Business Rate Relief</a> applies below a rateable value of £15,000 (100% below £12,000), but most care homes are assessed well above that threshold and pay rates in full. Business rates are separate from CQC registration fees.",
      },
      {
        question: "How much corporation tax does a care home company pay?",
        answer: "The <a href=\"https://www.gov.uk/corporation-tax-rates\">small profits rate is 19% up to £50,000 of profit; the main rate is 25% above £250,000</a>, with marginal relief between the two. In a propco/opco structure where one company owns the building and another operates the home, associated-company rules halve both thresholds, meaning the group reaches the 25% rate sooner.",
      },
      {
        question: "Can you help us challenge a below-cost local authority fee rate?",
        answer: "Yes. <a href=\"https://www.gov.uk/government/publications/care-act-statutory-guidance/care-and-support-statutory-guidance\">Care Act statutory guidance</a> requires local authorities to pay fees that reflect the actual cost of care. The <a href=\"https://www.gov.uk/government/publications/market-sustainability-and-improvement-fund-2024-to-2025\">market sustainability framework</a> gives providers a formal basis for negotiation. A properly structured fee model derived from your management accounts is the foundation for that challenge.",
      },
      {
        question: "What capital allowances can a care home claim on a fit-out?",
        answer: "Claim <a href=\"https://www.gov.uk/capital-allowances/annual-investment-allowance\">Annual Investment Allowance first (up to £1,000,000)</a> on qualifying plant and machinery. Residual main-pool additions then attract the <a href=\"https://www.legislation.gov.uk/ukpga/2026/11/section/29\">40% first-year allowance under Finance Act 2026</a>. The pool balance writes down at <a href=\"https://www.legislation.gov.uk/ukpga/2026/11/section/28\">14% WDA from April 2026</a>. Construction costs on new builds or extensions attract <a href=\"https://www.gov.uk/guidance/claiming-capital-allowances-for-structures-and-buildings\">SBA at 3% per year</a>.",
      },
    ],
  },
  {
    slug: "domiciliary-care",
    title: "Domiciliary Care",
    headline: "Accountancy for UK domiciliary care agencies: the real cost of a care hour",
    metaTitle: "Accountants for Domiciliary Care Agencies UK",
    metaDescription: "Specialist accountants for UK domiciliary care agencies. Sleep-in NMW, travel-time pay, true cost per care hour, payroll and VAT for home care providers.",
    intro: "The economics of a domiciliary care agency turn on one number: what a delivered care hour actually costs. The pay floor is the <a href=\"https://www.gov.uk/national-minimum-wage-rates\">National Living Wage of £12.71 per hour</a> for workers aged 21 and over from 1 April 2026, but that is just the start. Add employer NIC at 15% above the £5,000 secondary threshold, 12.07% holiday accrual, mileage at <a href=\"https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027\">55p per mile from 6 April 2026</a>, and the inter-call travel time that must also be paid. The gap between that true cost and the charged or LA-commissioned hour is your margin. We help domiciliary agencies model it honestly.",
    stats: [
      { value: "£12.71", label: "National Living Wage floor for workers aged 21+ from 1 April 2026, the starting point, not the total cost" },
      { value: "55p", label: "AMAP mileage rate per mile for the first 10,000 business miles from 6 April 2026" },
      { value: "£10,500", label: "Employment Allowance reducing employer NIC for eligible care agencies from 2026-27" },
    ],
    challenges: [
      {
        title: "Inter-call travel time is working time for NMW",
        body: "<a href=\"https://www.gov.uk/guidance/calculating-the-minimum-wage/working-hours-for-which-the-minimum-wage-must-be-paid\">HMRC's NMW rules</a> are unambiguous: a domiciliary care worker travelling from one client's home to the next is working during that journey and must be paid at or above the applicable minimum wage rate for every minute of it. Paying only for face-to-face contact time and nothing for inter-call travel is unlawful, and it is the single most common source of NMW underpayment enforcement in the sector. Commuting from home to the first call or from the last call home is excluded, but everything in between is not.",
      },
      {
        title: "Sleep-in shifts: only time actually awake for work attracts NMW",
        body: "The Supreme Court settled this in <em>Royal Mencap Society v Tomlinson-Blake</em> [2021]. Workers on sleep-in shifts who are permitted to sleep are not entitled to NMW for the sleeping period; they are entitled only for time they are awake and working. <a href=\"https://www.gov.uk/hmrc-internal-manuals/national-minimum-wage-manual/nmwm08180\">HMRC manual NMWM08180</a> confirms the salaried-hours treatment. The position changes where sleeping facilities are not provided or where the worker must remain active throughout. Getting this wrong in either direction creates liability: underpaying awake time is a wage offence; overpaying every sleep-in hour inflates cost unnecessarily.",
      },
      {
        title: "Self-employed carers are almost always employees in substance",
        body: "<a href=\"https://www.gov.uk/employment-status/employee\">HMRC's employment-status tests</a> look at how work is performed, not the label on a contract. Care workers on rotas who are told when and where to work, cannot send substitutes, and are subject to the agency's direction are employees for PAYE and NMW purposes regardless of whether they hold a self-employment contract. HMRC's audit activity in care is targeted at exactly this pattern, and back-dated PAYE, NIC and NMW liability can reach years into the past.",
      },
      {
        title: "Holiday pay for irregular-hours workers requires the right accrual method",
        body: "Zero-hours and bank-contract care workers accrue holiday <a href=\"https://www.gov.uk/holiday-entitlement-rights\">at 12.07% of hours already worked</a> in each pay period. The calculation must include average inter-call travel payments and overtime in the reference period, not just basic hourly pay. Errors here are a recurring Employment Tribunal category for domiciliary agencies.",
      },
    ],
    howWeHelp: [
      {
        title: "True-cost-per-hour modelling and payroll",
        body: "We build the full cost-of-a-care-hour from the NLW floor up: employer NIC at 15% above the <a href=\"https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026\">£5,000 secondary threshold</a>, holiday accrual at 12.07%, mileage reimbursement at the AMAP rate, and the NMW-paid travel time between calls. That model feeds the fee negotiation with your local authority commissioner and the staffing decisions that protect margin. We then run payroll with the <a href=\"https://www.gov.uk/claim-employment-allowance\">Employment Allowance</a> correctly claimed and sleep-in and travel-time hours treated lawfully. See our <a href=\"/services/care-payroll\">care payroll service</a>.",
      },
      {
        title: "NMW compliance review and employment-status audit",
        body: "We review rota systems and pay records to identify inter-call travel gaps, sleep-in miscalculations and self-employed arrangements that do not hold up to HMRC scrutiny. For agencies with sponsored staff, we also review <a href=\"https://www.gov.uk/uk-visa-sponsorship-employers\">sponsor-licence compliance costs</a> against the fee model. Compliance is a cost and a risk: we help agencies price it in rather than absorb it silently.",
      },
      {
        title: "Accounts, VAT position and structure",
        body: "Domiciliary agencies supplying personal care to people in their own homes are <a href=\"https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012\">VAT-exempt welfare suppliers</a> once CQC-registered. That means input VAT on equipment, vehicles and professional services is unrecoverable. We review the full VAT position, structure management accounts around cost-per-hour and delivered-hour volume, and set out the owner-extraction options. For agencies setting up, see <a href=\"/for/care-startups\">our start-up hub</a> and the <a href=\"/services/start-a-domiciliary-care-agency\">start a domiciliary care agency service</a>.",
      },
    ],
    faqs: [
      {
        question: "Do we have to pay carers for travel time between clients?",
        answer: "Yes. <a href=\"https://www.gov.uk/guidance/calculating-the-minimum-wage/working-hours-for-which-the-minimum-wage-must-be-paid\">Travel between a client's home and the next client's home is working time for NMW purposes</a>. Every minute of inter-call travel must be paid at or above the applicable NMW/NLW rate. Only the commute to the first call of the day and from the last call home is excluded.",
      },
      {
        question: "Do we pay minimum wage for the whole of a sleep-in shift?",
        answer: "No, following <em>Royal Mencap Society v Tomlinson-Blake</em> [2021] UKSC 8. Workers who are provided with sleeping facilities and are permitted to sleep are not entitled to NMW for the sleeping period. They are entitled only for time they are awake and working. <a href=\"https://www.gov.uk/hmrc-internal-manuals/national-minimum-wage-manual/nmwm08180\">HMRC's NMW manual</a> applies the salaried-hours exclusion to sleeping time. The position is different where sleeping facilities are not provided or the worker must stay active throughout.",
      },
      {
        question: "Can our carers be self-employed?",
        answer: "Rarely, in practice. <a href=\"https://www.gov.uk/employment-status/employee\">HMRC's employment tests</a> look at control, substitution and mutuality of obligation. Care workers on rotas who cannot send substitutes and are subject to the agency's direction are employees for PAYE and NMW purposes, whatever their contract says. Misclassification creates back-dated PAYE, NIC and NMW exposure.",
      },
      {
        question: "How is holiday pay worked out for zero-hours care staff?",
        answer: "Zero-hours and irregular-hours workers accrue holiday at <a href=\"https://www.gov.uk/holiday-entitlement-rights\">12.07% of hours already worked</a> in each pay period. The reference pay must include average inter-call travel payments and overtime, not just the basic hourly rate. Getting the reference period wrong is a common Employment Tribunal category for care agencies.",
      },
      {
        question: "What does one hour of domiciliary care actually cost us to deliver?",
        answer: "Start with the <a href=\"https://www.gov.uk/national-minimum-wage-rates\">NLW of £12.71 per hour</a> (workers aged 21+, from 1 April 2026). Add employer NIC at 15% above the <a href=\"https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026\">£5,000 secondary threshold</a>, holiday accrual at 12.07% of pay, mileage at <a href=\"https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027\">55p per mile</a>, and NMW-paid inter-call travel time. The <a href=\"/calculators/true-cost-care-hour-calculator\">true-cost-per-hour calculator</a> models the full build-up with your own inputs.",
      },
      {
        question: "Does the Employment Allowance cover our employer NIC?",
        answer: "Most domiciliary agencies are eligible for the <a href=\"https://www.gov.uk/claim-employment-allowance\">Employment Allowance of up to £10,500 per year</a>. For a small agency whose total employer NIC liability is below that figure, the allowance eliminates the bill entirely. Larger agencies with associated companies may not receive the full benefit.",
      },
    ],
  },
  {
    slug: "supported-living",
    title: "Supported Living",
    headline: "Accountancy for supported living providers: the rent and care split",
    metaTitle: "Accountants for Supported Living Providers UK",
    metaDescription: "Specialist accountants for UK supported living operators. Rent vs care income, VAT exemption, RCB 2/2025, housing benefit, LA funding and payroll support.",
    intro: "Supported living finance pivots on a single structural fact: rent income and care income are two separate streams, generated under different contracts, funded by different commissioners, and subject to different VAT and accounting treatments. A provider that treats them as one income line will misstate its VAT position, misread its margins and undermine its case for a care-element fee increase. We work with supported living operators on the split, the VAT, the HMRC grouping risk and the staffing economics that tie the two together.",
    stats: [
      { value: "£90,000", label: "Taxable turnover threshold for VAT registration, exempt care fees do not count toward it" },
      { value: "£625/mo", label: "Partial-exemption de minimis average: the limit below which exempt input VAT may be fully recovered" },
      { value: "£10,500", label: "Employment Allowance reducing employer NIC for eligible supported living providers from 2026-27" },
    ],
    challenges: [
      {
        title: "Two income streams that must be accounted separately",
        body: "In a supported living arrangement the rent element (the tenancy or licence fee for accommodation) and the care/support element (personal care or support delivered by the provider and typically funded by a local authority or NHS commissioner) are legally and financially distinct. The rent element may be funded by housing benefit or the housing cost component of Universal Credit; the care element is a separate commissioner contract. Mixing them in one income line obscures the cost recovery analysis for each stream and makes VAT position analysis unreliable.",
      },
      {
        title: "The care element is VAT-exempt, and exemption is a cost",
        body: "<a href=\"https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012\">HMRC Notice 701/2</a> confirms that personal care supplied by a CQC-registered provider is VAT-exempt welfare. That means input VAT on care-delivery costs (equipment, vehicles, professional fees proportionate to the care element) is unrecoverable. <a href=\"https://www.gov.uk/vat-registration/when-to-register\">The £90,000 VAT registration threshold applies to taxable turnover only</a>; exempt care fees do not count. If the rent element generates taxable supplies, a <a href=\"https://www.gov.uk/guidance/partial-exemption-vat-notice-706\">partial exemption calculation</a> is required, and input VAT recovery depends on the de minimis test (exempt input tax must not exceed £625 per month on average).",
      },
      {
        title: "HMRC is actively challenging VAT-grouping structures",
        body: "<a href=\"https://www.gov.uk/government/publications/revenue-and-customs-brief-2-2025-the-use-of-vat-grouping-within-the-care-industry/use-of-vat-grouping-within-the-care-industry\">Revenue and Customs Brief 2/2025</a> sets out HMRC's position that VAT-group arrangements designed to route exempt welfare supplies through an unregulated entity, in order to recover input VAT that would otherwise be irrecoverable, constitute avoidance. HMRC will refuse new VAT group registrations on these structures and will remove existing members where the arrangement is present. Any supported living group contemplating VAT planning must start from this brief; pre-2025 scheme advice cannot be relied on.",
      },
      {
        title: "Evidencing a care-element fee increase with the local authority",
        body: "<a href=\"https://www.gov.uk/government/publications/care-act-statutory-guidance/care-and-support-statutory-guidance\">Care Act statutory guidance</a> places a duty on local authorities to pay a fee that reflects the actual cost of care. The <a href=\"https://www.gov.uk/government/publications/market-sustainability-and-improvement-fund-2024-to-2025\">market sustainability framework</a> is the formal mechanism for providers to challenge below-cost rates. That challenge needs a properly costed support-element cost model built from payroll, NIC, holiday pay and management overhead, expressed per support hour and per tenancy.",
      },
    ],
    howWeHelp: [
      {
        title: "Rent and care stream separation in accounts",
        body: "We structure supported living management accounts so rent income and care income appear in separate nominal codes with matching cost allocations. That clean split is the foundation for the VAT analysis, the commissioner reporting and any fee-rate negotiation. It also satisfies the financial-information requirements of CQC registration for the care element. See <a href=\"/services/care-vat-review\">our care VAT review service</a>.",
      },
      {
        title: "VAT position review and RCB 2/2025 compliance",
        body: "We review the VAT treatment of each income stream, the partial-exemption position where any taxable supplies exist, and the group structure against <a href=\"https://www.gov.uk/government/publications/revenue-and-customs-brief-2-2025-the-use-of-vat-grouping-within-the-care-industry/use-of-vat-grouping-within-the-care-industry\">RCB 2/2025</a>. For groups that have relied on pre-2025 VAT planning advice, we assess exposure and set out restructuring options that do not fall within the avoidance challenge.",
      },
      {
        title: "Payroll, NIC and Employment Allowance",
        body: "Support-worker payroll is the dominant cost in the care element. We run payroll with <a href=\"https://www.gov.uk/claim-employment-allowance\">Employment Allowance up to £10,500</a> correctly applied, employer NIC at 15% above the <a href=\"https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026\">£5,000 secondary threshold</a> modelled per head, and holiday accrual calculated on the correct reference period for irregular-hours workers. See <a href=\"/services/care-payroll\">our care payroll service</a>.",
      },
    ],
    faqs: [
      {
        question: "How is rent income accounted separately from care income in supported living?",
        answer: "The rent element (accommodation, funded by housing benefit or Universal Credit housing cost) and the care/support element (funded by the local authority or NHS under a separate commissioner contract) must sit in different nominal codes. The VAT treatment, funding source and cost allocation differ for each stream; mixing them produces an unreliable P&amp;L and an incorrect VAT position.",
      },
      {
        question: "Is the care element of supported living VAT exempt?",
        answer: "Yes, where the provider is CQC-registered and is supplying personal care. <a href=\"https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012\">HMRC Notice 701/2</a> confirms that CQC-registered providers supply VAT-exempt welfare services. Exemption means input VAT on care-element costs is unrecoverable. The rent element may have a different VAT treatment depending on how it is structured.",
      },
      {
        question: "Can we recover VAT through a group structure?",
        answer: "<a href=\"https://www.gov.uk/government/publications/revenue-and-customs-brief-2-2025-the-use-of-vat-grouping-within-the-care-industry/use-of-vat-grouping-within-the-care-industry\">HMRC's Revenue and Customs Brief 2/2025</a> makes clear that VAT-group arrangements designed to allow input VAT recovery on exempt welfare supplies constitute avoidance. HMRC is refusing new registrations on this basis and removing existing group members. Pre-2025 scheme advice should not be relied on; any group planning must begin from the Brief.",
      },
      {
        question: "Who funds the support element and how do we evidence a fee increase?",
        answer: "Local authority and NHS commissioners fund the support element under individual care and support contracts. <a href=\"https://www.gov.uk/government/publications/care-act-statutory-guidance/care-and-support-statutory-guidance\">Care Act statutory guidance</a> requires LAs to pay a fee reflecting the actual cost of care. A properly costed support-hour model, built from management accounts split between the two income streams, is the foundation for any fee-rate challenge using the <a href=\"https://www.gov.uk/government/publications/market-sustainability-and-improvement-fund-2024-to-2025\">market sustainability framework</a>.",
      },
      {
        question: "Does the Employment Allowance apply to supported living providers?",
        answer: "Most supported living providers are eligible for the <a href=\"https://www.gov.uk/claim-employment-allowance\">Employment Allowance of up to £10,500 per year</a>, which reduces employer NIC. For smaller providers whose total employer NIC bill is below £10,500, the allowance eliminates it entirely. Associated-company rules reduce the benefit for larger groups.",
      },
    ],
  },
  {
    slug: "childrens-homes",
    title: "Children's Homes",
    headline: "Accountancy for UK children's homes: staffing costs, tax and the business finances",
    metaTitle: "Accountants for Children's Homes UK | Tax & Payroll",
    metaDescription: "Specialist accountants for UK children's homes. Staffing costs, employer NIC, capital allowances, corporation tax and owner extraction.",
    intro: "Children's residential care businesses carry a cost profile that is similar in structure to adult care homes but sits under Ofsted registration rather than CQC. The dominant cost line is staffing, the income line is placing-authority fees, and the building carries its own tax treatment. We work with children's home operators and directors on payroll, capital allowances, corporation tax and the owner-extraction structure, without crossing into the clinical or regulatory detail that belongs to Ofsted.",
    stats: [
      { value: "£12.71", label: "National Living Wage floor for workers aged 21+ from 1 April 2026, the staffing cost base" },
      { value: "£1,000,000", label: "Annual Investment Allowance on qualifying plant and equipment in a single year" },
      { value: "19% / 25%", label: "Corporation tax small profits rate / main rate from April 2023, with marginal relief between" },
    ],
    challenges: [
      {
        title: "Staffing costs and employer NIC on high-ratio rotas",
        body: "Children's homes operate high staff-to-child ratios that place significant pressure on the payroll cost line. From 1 April 2026, the <a href=\"https://www.gov.uk/national-minimum-wage-rates\">National Living Wage is £12.71 per hour</a> for workers aged 21 and over. Add employer NIC at 15% on earnings above the <a href=\"https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026\">£5,000 annual secondary threshold</a>, and holiday pay for staff on variable hours, and the true labour cost per shift is substantially higher than the hourly rate alone. The <a href=\"https://www.gov.uk/claim-employment-allowance\">Employment Allowance of up to £10,500 per year</a> reduces employer NIC for eligible operators.",
      },
      {
        title: "Capital allowances on the building and fit-out",
        body: "Children's home properties often require significant adaptation: specialist bedrooms, secure spaces, communal areas and safety equipment. <a href=\"https://www.gov.uk/capital-allowances/annual-investment-allowance\">Annual Investment Allowance of up to £1,000,000</a> covers qualifying plant and machinery. Residual main-pool additions attract the <a href=\"https://www.legislation.gov.uk/ukpga/2026/11/section/29\">40% first-year allowance under Finance Act 2026</a>. The remaining pool writes down at <a href=\"https://www.legislation.gov.uk/ukpga/2026/11/section/28\">14% WDA from April 2026</a>. New builds and qualifying extensions attract <a href=\"https://www.gov.uk/guidance/claiming-capital-allowances-for-structures-and-buildings\">Structures and Buildings Allowance at 3% per year</a>. These reliefs are frequently unclaimed on acquisitions and fit-outs.",
      },
      {
        title: "Corporation tax and owner extraction",
        body: "For owner-managed children's home companies, <a href=\"https://www.gov.uk/corporation-tax-rates\">corporation tax is 19% on profits up to £50,000 and 25% above £250,000</a>, with marginal relief between. Where the operator holds the building and the care business in separate companies, associated-company rules reduce both thresholds, and the group may reach the 25% rate sooner. Owner extraction through salary to the personal allowance and dividends is taxed at <a href=\"https://www.gov.uk/tax-on-dividends\">10.75%, 35.75% or 39.35%</a> above the £500 dividend allowance from 6 April 2026.",
      },
      {
        title: "VAT position: welfare exemption applies where the supply fits",
        body: "<a href=\"https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012\">HMRC Notice 701/2</a> applies the welfare exemption to state-regulated providers supplying welfare services. Whether and how this applies to a specific children's home arrangement depends on the regulatory status of the provider, not the CQC (children's homes are an Ofsted regime). We assess the VAT position carefully and do not apply CQC framing to a children's home; <a href=\"/for/care-startups\">the start-up hub</a> covers CQC registration for adult care providers separately.",
      },
    ],
    howWeHelp: [
      {
        title: "Payroll, Employment Allowance and staffing-cost modelling",
        body: "We run payroll for children's home teams with employer NIC correctly modelled per head at 15% above the <a href=\"https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026\">£5,000 secondary threshold</a>, holiday pay calculated on the correct reference period, and the <a href=\"https://www.gov.uk/claim-employment-allowance\">Employment Allowance</a> applied where eligible. Management reports track staffing cost as a proportion of placing-authority income so operators can see the margin impact of rota changes. See our <a href=\"/services/care-payroll\">care payroll service</a>.",
      },
      {
        title: "Capital allowances review and tax planning on the building",
        body: "We identify unclaimed capital allowances on fit-out and building works, following the sequencing: AIA first, then 40% FYA on residual main-pool additions, then 14% WDA on the pool, then SBA at 3% on structural costs. For operators buying a children's home, we review the historic allowances position as part of due diligence. See our <a href=\"/services/buying-a-care-home\">buying a care home service</a>.",
      },
      {
        title: "Corporation tax, owner extraction and accounts",
        body: "We prepare statutory accounts and corporate tax returns structured around the <a href=\"https://www.gov.uk/corporation-tax-rates\">19%/25% CT rates</a>. Owner-director extraction is planned around salary to the personal allowance and dividends at the rates effective from <a href=\"https://www.gov.uk/tax-on-dividends\">6 April 2026</a>. For operators with property held in a separate entity, we model the associated-company effect on the CT thresholds and compare the extraction routes.",
      },
    ],
    faqs: [
      {
        question: "How is a children's home business taxed?",
        answer: "<a href=\"https://www.gov.uk/corporation-tax-rates\">Corporation tax is 19% on profits up to £50,000 and 25% above £250,000</a>, with marginal relief between. Where the property and operating business sit in separate companies, associated-company rules reduce both thresholds. Owner-directors extract profits as salary to the personal allowance plus dividends, taxed at <a href=\"https://www.gov.uk/tax-on-dividends\">10.75%/35.75%/39.35%</a> above the £500 dividend allowance from 6 April 2026.",
      },
      {
        question: "What are the main employer costs for a children's home?",
        answer: "The pay floor for workers aged 21 and over is the <a href=\"https://www.gov.uk/national-minimum-wage-rates\">National Living Wage of £12.71 per hour from 1 April 2026</a>. Add employer NIC at 15% on earnings above the <a href=\"https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026\">£5,000 annual secondary threshold</a>, and holiday pay for variable-hours staff. The <a href=\"https://www.gov.uk/claim-employment-allowance\">Employment Allowance of up to £10,500</a> reduces the NIC bill for eligible operators.",
      },
      {
        question: "Do children's homes pay VAT on their fees?",
        answer: "Children's homes are regulated by Ofsted, not CQC. The welfare VAT exemption under <a href=\"https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012\">HMRC Notice 701/2</a> applies to state-regulated welfare providers; whether a specific children's home arrangement qualifies depends on the regulatory and contractual structure. We assess the position for each operator rather than applying a blanket rule.",
      },
      {
        question: "Do children's homes pay business rates?",
        answer: "Yes. Children's home properties are rateable. <a href=\"https://www.gov.uk/apply-for-business-rate-relief/small-business-rate-relief\">Small Business Rate Relief</a> provides 100% relief below a rateable value of £12,000, tapering to zero at £15,000. Most purpose-built or adapted children's home premises are assessed above that threshold.",
      },
      {
        question: "How do placing-authority fees work in the accounts?",
        answer: "Placing-authority income is the fee a local authority pays per placement per week. It is recognised as revenue in the period the placement is active. Where a placement ends mid-period, income is accrued to the date of departure. The fee level is a commissioner-set rate; management accounts that track cost-per-occupied-place against that rate give the operator a clear picture of margin by placement type.",
      },
    ],
  },
  {
    slug: "care-startups",
    title: "Care Startups",
    headline: "Accountants for new care businesses: the financial leg of CQC registration",
    metaTitle: "Accountants for Care Startups | CQC Financial Viability",
    metaDescription: "Specialist accountants for new UK care businesses. CQC financial viability statements, projections, start-up accounts, structure and payroll.",
    intro: "CQC registration is the gateway to operating a regulated care business in England. The application includes a financial leg that most new providers underestimate: financial information about the proposed provider, a financial viability statement prepared on <a href=\"https://www.cqc.org.uk/guidance-regulation/providers/registration/supporting-documents-provider/document/financial-viability-template\">CQC's own template</a>, and forward projections that demonstrate the service can be run sustainably. We handle the money paperwork. We do not submit the application or provide compliance consulting; that is the role of a CQC registration consultant. We do the financial half.",
    stats: [
      { value: "£10,500", label: "Maximum Employment Allowance available against employer NIC for eligible care employers in 2026-27" },
      { value: "£50,000", label: "MTD for Income Tax threshold from 6 April 2026 for sole-trader care operators held personally" },
      { value: "£10,500", label: "Employment Allowance available from 2026-27 to offset employer NIC for new care providers" },
    ],
    challenges: [
      {
        title: "The financial leg of CQC registration",
        body: "<a href=\"https://www.cqc.org.uk/guidance-providers/registration\">CQC registration is mandatory before providing regulated activities</a>. Trading before registration is a criminal offence under the Health and Social Care Act 2008. The application requires financial information about the proposed provider, and new providers must submit a financial viability statement using <a href=\"https://www.cqc.org.uk/guidance-regulation/providers/registration/supporting-documents-provider/document/financial-viability-template\">CQC's own template</a>. This is the document that most new providers struggle with, because it requires forward projections, funding assumptions and a demonstration that the business model is financially sound, expressed in a format the regulator specifies.",
      },
      {
        title: "Projections and break-even for the first year",
        body: "A credible financial viability statement needs a model behind it: what the fee income looks like at different occupancy levels, what the staffing cost is at full rota, what the break-even occupancy is, and how the first six months are funded before placements or local authority contracts produce regular income. New domiciliary agencies face the same challenge: the first weeks of trading carry full payroll cost against contracted-care-hour volumes that build gradually. The projections need to be honest and defensible, not optimistic.",
      },
      {
        title: "Choosing the right structure from the outset",
        body: "Operating as a sole trader is simpler at launch but creates personal liability and, above £50,000 of combined self-employment and property income, brings <a href=\"https://www.gov.uk/guidance/check-if-youre-eligible-for-making-tax-digital-for-income-tax\">MTD for Income Tax obligations from 6 April 2026</a> (dropping to £30,000 from 6 April 2027). A limited company separates personal and business liability, allows owner extraction through salary plus dividends at the <a href=\"https://www.gov.uk/tax-on-dividends\">rates from 6 April 2026</a>, and is taxed at the <a href=\"https://www.gov.uk/corporation-tax-rates\">19%/25% corporation tax rates</a>. The right choice depends on the projected profit level, the owner's other income and whether CQC will require the company to be the registered provider.",
      },
      {
        title: "First-year payroll and VAT set-up",
        body: "From the date CQC registration is approved (not the date of application), the provider is a state-regulated welfare supplier and its care fees are <a href=\"https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012\">VAT-exempt</a>. That means input VAT on care-delivery costs is unrecoverable from the start. On the payroll side, employer NIC at 15% above the <a href=\"https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026\">£5,000 secondary threshold</a> begins with the first employee. The <a href=\"https://www.gov.uk/claim-employment-allowance\">Employment Allowance of up to £10,500</a> can offset the bill from day one if correctly claimed.",
      },
    ],
    howWeHelp: [
      {
        title: "CQC financial viability statement and registration finance",
        body: "We prepare the financial viability statement on <a href=\"https://www.cqc.org.uk/guidance-regulation/providers/registration/supporting-documents-provider/document/financial-viability-template\">CQC's template</a>, with the forward projections and funding assumptions behind it. We do not handle the CQC application or compliance documentation; a CQC registration consultant does that work. We produce the financial leg: the FVS, the cash-flow forecast, the break-even model and the first-year accounts structure. See our <a href=\"/services/cqc-financial-viability-statement\">CQC financial viability statement service</a>.",
      },
      {
        title: "Structure, owner extraction and tax planning",
        body: "We compare sole trader and limited company, model the corporation tax and dividend outcome against <a href=\"https://www.gov.uk/corporation-tax-rates\">the 19%/25% CT rates</a> and <a href=\"https://www.gov.uk/tax-on-dividends\">dividend rates from 6 April 2026</a>, and flag the MTD-IT obligations that apply to sole-trader operators above £50,000. For domiciliary agency start-ups, see <a href=\"/for/domiciliary-care\">our domiciliary care hub</a> and <a href=\"/services/start-a-domiciliary-care-agency\">start a domiciliary care agency</a>.",
      },
      {
        title: "First-year set-up: payroll, VAT and bookkeeping",
        body: "We set up payroll with employer NIC correctly modelled, Employment Allowance claimed from day one, and the VAT position documented from the date of CQC registration approval. We also set the bookkeeping structure so the accounts distinguish fee-payer categories (LA, NHS, self-funder) from the outset. Use the <a href=\"/calculators/true-cost-care-hour-calculator\">true-cost-per-hour calculator</a> and <a href=\"/calculators/funded-nursing-care-fee-mix-calculator\">fee-mix calculator</a> to model your plan before launch. See our <a href=\"/services/care-payroll\">care payroll service</a> and <a href=\"/services/care-vat-review\">care VAT review</a>.",
      },
    ],
    faqs: [
      {
        question: "Do I need an accountant to register a care business with the CQC?",
        answer: "Not to submit the application, but the financial leg of the application requires a financial viability statement on <a href=\"https://www.cqc.org.uk/guidance-regulation/providers/registration/supporting-documents-provider/document/financial-viability-template\">CQC's own template</a>, normally prepared or validated by an accountant. The FVS requires forward projections and funding assumptions that go beyond most new providers' accounting experience. We prepare the financial documents; a CQC registration consultant handles the compliance application.",
      },
      {
        question: "What is a CQC financial viability statement and who prepares it?",
        answer: "<a href=\"https://www.cqc.org.uk/guidance-providers/registration\">CQC's registration process</a> requires new providers to demonstrate that the business is financially viable before regulated activities begin. The financial viability statement, prepared on <a href=\"https://www.cqc.org.uk/guidance-regulation/providers/registration/supporting-documents-provider/document/financial-viability-template\">CQC's template</a>, sets out the financial information about the provider, the funding model and the forward projections. It is typically prepared or signed by an accountant acting for the new provider.",
      },
      {
        question: "Should I set up as a sole trader or a limited company?",
        answer: "A limited company separates personal and business liability and allows owner extraction through salary plus dividends at the <a href=\"https://www.gov.uk/tax-on-dividends\">rates from 6 April 2026</a>, taxed at the <a href=\"https://www.gov.uk/corporation-tax-rates\">19%/25% corporation tax rates</a>. A sole trader is simpler at launch but above £50,000 of combined income triggers <a href=\"https://www.gov.uk/guidance/check-if-youre-eligible-for-making-tax-digital-for-income-tax\">MTD for Income Tax from 6 April 2026</a>. The right structure depends on projected profit, other income and the CQC application requirements for the registered provider entity.",
      },
      {
        question: "How much does CQC registration cost?",
        answer: "CQC charges registration fees, but the fee amounts are not fixed in our published figures. Check <a href=\"https://www.cqc.org.uk/guidance-providers/registration\">CQC's registration guidance</a> directly for current fee levels. Note: registration fees are separate from the cost of preparing the financial viability statement and projections.",
      },
      {
        question: "What financial information does the CQC registration application need?",
        answer: "<a href=\"https://www.cqc.org.uk/guidance-providers/registration\">CQC's registration application</a> requires financial information about the proposed provider, including a financial viability statement on <a href=\"https://www.cqc.org.uk/guidance-regulation/providers/registration/supporting-documents-provider/document/financial-viability-template\">CQC's template</a>. This covers the provider's financial position, funding sources, forward projections and evidence that the service can be sustained. We prepare these documents on their own or as part of the wider start-up accounts work.",
      },
      {
        question: "What do I need to start a domiciliary care agency financially?",
        answer: "Before the first client, you need CQC registration (including the financial viability statement), a payroll structure with employer NIC correctly modelled from 1 April 2026 rates, and bookkeeping that will separate care-delivery hours from travel time and sleep-in shifts for NMW compliance. Model the true cost per care hour before setting your charge rates. See our <a href=\"/for/domiciliary-care\">domiciliary care hub</a> and <a href=\"/services/start-a-domiciliary-care-agency\">start a domiciliary care agency service</a>.",
      },
    ],
  },
  // Wave 1 segment pages, source docs/care/_wave1/ (self-employed-carers-and-personal-assistants.json, care-franchisees.json), 2026-09-27, spec LEADS_250_PROGRAMME_2026-09-27.md S4a
  {
    slug: "self-employed-carers-and-personal-assistants",
    title: "Self-Employed Carers and Personal Assistants",
    headline: "Accountants for self-employed carers, personal assistants and support workers",
    metaTitle: "Accountants for Self-Employed Carers and Care PAs",
    metaDescription: "For self-employed carers, personal assistants and support workers: CQC registration, why your fees are rarely VAT exempt, expenses, sole trader or company.",
    intro: "You are paid by the person you support, by their family through a direct payment, or through a platform. Three questions arrive at once: sole trader or limited company, whether you charge VAT, and whether CQC registration applies to you. The registration answer is normally no. A carer engaged directly by the individual or a related third party, with no agency in the middle and working under that person's direction, is carved out of the regulated activity of personal care. That carve-out then costs you on VAT, because the welfare exemption belongs to charities, public bodies and state-regulated providers. Your fees are ordinary taxable turnover counting towards the £90,000 threshold, even though the work looks identical to care an exempt agency supplies. Incorporating is settled separately, by your profit and by who pays you.",
    stats: [
      { value: "£90,000", label: "VAT registration threshold, measured on taxable turnover over any rolling 12 months" },
      { value: "£50,000", label: "Making Tax Digital for Income Tax threshold from 6 April 2026, falling to £30,000 a year later" },
      { value: "55p", label: "Approved mileage rate for the first 10,000 business miles from 6 April 2026" },
      { value: "10.75%", label: "Basic rate dividend tax from 6 April 2026, above the £500 dividend allowance" },
    ],
    challenges: [
      { title: "Sitting outside CQC registration is not automatically the easy option", body: "Schedule 1 to the Health and Social Care Act 2008 (Regulated Activities) Regulations 2014 makes personal care a regulated activity, then carves out a carer engaged by an individual or a related third party, with no employment agency involved, working wholly under that person's direction and control. A solo personal assistant paid from a direct payment normally sits inside it. The carve-out stops holding the moment you send or employ another carer, or set the terms yourself rather than working under the client's direction." },
      { title: "The care VAT exemption is one you probably cannot use", body: "HMRC exempts welfare services only when a charity, a public body or a state-regulated provider supplies them. An unregistered individual is none of those, so your fees are standard-rated and count in full towards the rolling £90,000 threshold. Most personal assistants never approach it; support workers billing several clients a week get closer than they expect. Our note on <a href=\"/blog/vat-and-welfare-exemption/care-home-vat-exemption-edge-cases\">VAT exemption edge cases</a> covers the registered side." },
      { title: "HMRC may see an employee where your contract says self-employed", body: "Status is decided by substance, not by the label on the contract. Engagement through an agency rather than by the individual raises the risk of a challenge, and back-dated PAYE usually lands on the engager." },
      { title: "Expenses are small, frequent and easy to lose", body: "Mileage between clients, DBS renewals, training, PPE, laundering workwear, part of your phone bill and indemnity cover are the recurring items. Mileage is usually the largest: 55p per mile for the first 10,000 business miles from 6 April 2026, 25p after that. Journeys between two clients count; home to the first call does not. Without a log kept as you drive, most of it gets guessed at in January." },
      { title: "A company costs something every year, so the numbers have to justify it", body: "Incorporating brings accounts, a corporation tax return, a confirmation statement, payroll if you take a salary, and a public record of your filings. Profits to £50,000 are taxed at 19%, dividends above the £500 allowance at 10.75% for a basic rate taxpayer from 6 April 2026. Below a certain profit, filing costs eat the saving. Staying a sole trader has its own timetable: the <a href=\"/blog/care-home-accounts-and-funding/mtd-it-care-owner-operators\">Making Tax Digital guide</a> has it." },
    ],
    howWeHelp: [
      { title: "A structure comparison built on your own figures", body: "A specialist reviews last year's income and expenses, or your forecast if you have just started, and models sole trader against limited company on 2026/27 rates: corporation tax at 19% to £50,000, an efficient salary, dividends at 10.75% or 35.75%. The output is the profit at which incorporating pays." },
      { title: "A VAT position stated in writing", body: "Which of your income is taxable, and which, if any, is genuinely exempt, is worked out first, then the rolling 12-month total is tracked against the £90,000 threshold so registration never arrives by surprise. Private clients, direct-payment families and agency shifts are each tested separately." },
      { title: "Registration with HMRC and the records that follow", body: "Registering as self-employed, obtaining a Unique Taxpayer Reference, setting up an expense record that captures mileage as it happens, and preparing the Self Assessment return from it. Where the Making Tax Digital thresholds catch you, compatible software is set up and the quarterly updates are prepared." },
      { title: "Company filings, and the step up to an agency", body: "If you incorporate: the right SIC code, payroll, annual accounts, the corporation tax return and dividend paperwork that stands up later. Take on a second worker and you are closer to a domiciliary service, with registration, travel-time minimum wage and holiday pay in scope: see <a href=\"/for/domiciliary-care\">domiciliary care</a> and <a href=\"/services/start-a-domiciliary-care-agency\">start a domiciliary care agency</a>." },
    ],
    faqs: [
      { question: "Do I need to register with CQC as a self-employed personal assistant?", answer: "Usually not. The regulations exclude a carer engaged by the individual, or by a related third party acting for them, where no employment agency is involved and you work wholly under that person's direction and control. Registration bites once you stop fitting that description, for example by employing another carer or working in partnership with one. Carrying on a regulated activity unregistered is a criminal offence, so confirm the test." },
      { question: "Is my care work VAT exempt?", answer: "Almost certainly not. The welfare exemption covers supplies by charities, public bodies and state-regulated providers such as those registered with CQC. An unregistered individual falls outside all three, so what you invoice is standard-rated turnover counting towards the £90,000 threshold over any rolling 12 months. The exemption most providers experience as a cost, because it blocks VAT recovery on what they buy, is one you cannot claim." },
      { question: "Should I set up a limited company as a care PA?", answer: "It depends on profit, not on how the work feels. A company costs more each year in accounts, filings and payroll, and puts your figures on a public register. It pays once profits are high enough that 19% corporation tax plus dividends beats income tax and Class 4 National Insurance on the whole amount. Check first whether the scheme or platform paying you will contract with a company." },
      { question: "What expenses can I claim as a self-employed carer?", answer: "Costs incurred wholly and exclusively for the work: mileage between clients at 55p per mile for the first 10,000 business miles from 6 April 2026 and 25p after that, DBS checks, training, PPE, laundering workwear, indemnity insurance, the business share of your phone, and accountancy fees. Travel from home to your first call and back from the last is ordinary commuting, not an allowable cost." },
      { question: "Am I really self-employed if I work set shifts for one agency?", answer: "Possibly not. Status turns on the reality of the arrangement: who controls when and where you work, whether you can genuinely send a substitute, who supplies equipment, and whether you carry financial risk. Set rotas, no substitution and working under someone else's direction all point towards employment or worker status. Liability for unpaid PAYE usually sits with the engager, but reclassification changes your own position too." },
      { question: "Does any of this change in Scotland, Wales or Northern Ireland?", answer: "The tax does not. VAT, National Insurance, mileage rates and Making Tax Digital are UK-wide, although Scottish taxpayers pay Scottish income tax rates on earnings. Regulation does change. CQC covers England only; the Care Inspectorate in Scotland, Care Inspectorate Wales and the RQIA in Northern Ireland run their own registration regimes, each treating directly engaged personal assistants in its own way." },
    ],
  },
{
    slug: "care-franchisees",
    title: "Care Franchisees",
    headline: "Accountants for UK home care franchisees: the fee, the structure and the first year",
    metaTitle: "Accountants for Care Franchisees UK | Home Care",
    metaDescription: "Specialist accountants for UK home care franchisees. Franchise fee tax treatment, management service fees, CQC registration, payroll, VAT and cash flow.",
    intro: "Buying a home care franchise puts you in two positions at once. You are a franchisee bound by an agreement, and you are a care provider that <a href=\"https://www.cqc.org.uk/guidance-providers/registration\">must hold its own CQC registration before delivering any regulated activity</a>. The registration sits with your company, not the franchisor, and so does every payroll, tax and compliance duty behind it. The money questions follow from that split. Your initial fee is <a href=\"https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim57620\">usually capital rather than a deductible running cost</a>, with the corporation tax intangible assets regime taking precedence where a company acquires the franchise. The care you deliver is VAT-exempt while the fees you pay the network are not, so that VAT sticks. And carers join the payroll in week one, months before the territory fills.",
    stats: [
      { value: "Capital", label: "HMRC treats the initial fee paid by a franchisee as capital for trade profits purposes; for a company the CTA 2009 Part 8 intangible assets regime takes precedence (BIM57620)" },
      { value: "20%", label: "Standard-rate VAT charged on franchise and management service fees, irrecoverable for a CQC-registered provider whose care income is exempt" },
      { value: "£12.71", label: "National Living Wage floor for workers aged 21 and over from 1 April 2026, the dominant cost line from your first placement" },
      { value: "18%", label: "Business Asset Disposal Relief rate on qualifying disposals from 6 April 2026, relevant when you resell the territory" },
    ],
    challenges: [
      { title: "The initial fee is capital, and the relief route depends on your structure", body: "The lump sum you pay to join a network is <a href=\"https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim57620\">not a deductible trading expense</a>, and it stays capital even when the agreement lets you pay by instalments, as do the related legal fees. Where a company acquires the franchise, the <a href=\"https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird11500\">intangible assets regime in CTA 2009 Part 8</a> takes precedence, so relief can follow the amortisation charged in the accounts instead of being lost. Which route applies turns on the entity and on what the agreement grants, so settle it before the fee is paid." },
      { title: "CQC registration is yours, and so is the liability behind it", body: "A franchisor's brand does not register on your behalf. Your legal entity applies, names its registered manager and provides the financial information the application requires, including a financial viability statement. The sequencing consequence is real: you commit to the fee, the office and often the first staff before any income exists, because delivering personal care before registration is an offence. First-time providers can see that process on the <a href=\"/for/care-startups\">care startups page</a>." },
      { title: "The recurring fee, and the VAT that sticks to it", body: "Recurring management service fees are charged on turnover or on invoiced hours, and the agreement decides which. That matters, because commissioned local authority hours make a very different revenue line from private clients. Exemption bites harder than for an independent: no input VAT is recoverable on the initial fee, the service fee, the marketing levy or the network software, and exempt income does not count toward the £90,000 registration threshold." },
      { title: "Year one is a cash flow problem before it is a profit problem", body: "Carers are paid weekly or fortnightly; local authority invoices are settled in arrears. Employer National Insurance at 15% above the £5,000 secondary threshold, holiday accrual, paid inter-call travel and mileage at 55p per mile all land before the territory is near full, and the fee has already gone out. Model the trough, not the twelfth month, and test it against the <a href=\"/calculators/true-cost-care-hour-calculator\">true cost of a care hour</a>." },
    ],
    howWeHelp: [
      { title: "Reviewing the agreement for its money consequences", body: "Before you sign, a specialist reads the financial clauses: what the initial fee buys and how it will be treated for tax, how the service fee is calculated and on which revenue base, and what renewal and resale terms do to your exit. The output is a schedule of committed costs by month against the hours needed to cover them." },
      { title: "Setting up the entity and the CQC financial paperwork", body: "The projections and the financial viability statement the registration needs are prepared in the form CQC asks for, and the company is registered for corporation tax and PAYE before your first shift. A structure the franchisor specifies is built in at the start. The equivalent for an independent launch sits on the <a href=\"/services/start-a-domiciliary-care-agency\">start a domiciliary care agency page</a>." },
      { title: "Payroll from the first carer", body: "Rotas turn into gross pay, employer NIC, holiday accrual and mileage, and the franchisee carries all of it whatever software the network supplies. A specialist sets it up with the Employment Allowance claimed where you qualify, inter-call travel paid as working time, sleep-in hours treated as the Mencap ruling requires, and holiday accrued on hours worked. See the <a href=\"/services/care-payroll\">care payroll service</a>." },
      { title: "Monthly reporting, and the numbers a resale needs", body: "Reporting is built on delivered hours, cost per hour, margin after the franchisor's fee and runway. The same records make the territory saleable later: clean hour and fee history, a defensible staff cost base, and the ownership record behind any relief claim. Sale mechanics sit on the <a href=\"/services/selling-a-care-home\">selling a care business page</a>." },
    ],
    faqs: [
      { question: "Can I deduct the franchise fee from my profits?", answer: "Not as a running cost. HMRC's position is that the initial fee paid by a franchisee is usually capital, and stays capital even where the agreement spreads it over years; related legal fees go the same way. Where a company acquires the franchise, the intangible assets regime in CTA 2009 Part 8 takes precedence over those trade profits rules, so relief can follow the amortisation charged in the accounts." },
      { question: "Do I need my own CQC registration if the franchisor is already registered?", answer: "Yes. Registration attaches to the legal entity carrying on the regulated activity, and as a franchisee that entity is yours. You apply in your own name, nominate a registered manager and provide the financial information the application requires. Delivering personal care before registration is a criminal offence, so the gap between signing and a first client is a real cash constraint. Wales, Scotland and Northern Ireland have their own regulators." },
      { question: "Is there VAT on the franchise fee, and can I reclaim it?", answer: "The franchisor supplies standard-rated services, so VAT is charged on the initial fee and on the ongoing management service fee, and you will not recover it. Care supplied by a CQC-registered provider is VAT-exempt, and input VAT on costs used to make exempt supplies is irrecoverable. Exempt income does not count toward the £90,000 taxable turnover threshold either, so most franchisees have no registration route into recovery." },
      { question: "What company structure will the franchisor expect?", answer: "Almost every network requires a limited company as the franchisee, often one formed for that territory alone and barred from other trades. That shapes the tax position: profits meet corporation tax at 19% up to £50,000 and 25% above £250,000 with marginal relief between, and extraction becomes the usual salary and dividend question, at dividend rates of 10.75%, 35.75% and 39.35% from 6 April 2026." },
      { question: "How much working capital does the first year actually need?", answer: "Enough to cover the gap between paying carers and being paid. Wages run weekly or fortnightly from a floor of £12.71 an hour for workers aged 21 and over from April 2026, plus employer NIC at 15% above the £5,000 threshold, holiday accrual, paid travel between calls and mileage at 55p per mile. Local authority income arrives in arrears, after the fee and the pre-registration months." },
      { question: "What happens when I sell the territory?", answer: "The initial fee is not refunded. You sell the shares or the trade and assets of your own company, subject to what the agreement says about franchisor consent, a right of first refusal, transfer fees and the remaining term. Business Asset Disposal Relief can apply at 18% on qualifying disposals from 6 April 2026, against 24% for a higher-rate taxpayer on gains that do not qualify, and it needs two years of qualifying trading ownership." },
    ],
  },
];

export function getHub(slug: string): CareHub | undefined {
  return careHubs.find((h) => h.slug === slug);
}
