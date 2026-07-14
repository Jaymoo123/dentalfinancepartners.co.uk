export interface PharmacyHub {
  slug: string; title: string; headline: string; metaTitle: string; metaDescription: string;
  intro: string; stats: Array<{ value: string; label: string }>;
  challenges: Array<{ title: string; body: string }>;
  howWeHelp: Array<{ title: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
  noLeadForm?: boolean;
}

export const pharmacyHubs: PharmacyHub[] = [
  {
    slug: "pharmacy-owners",
    title: "Pharmacy Owners",
    headline: "Specialist accountants for community pharmacy owners who understand how NHS contract economics actually work",
    metaTitle: "Accountants for Pharmacy Owners | NHS Contract Specialists",
    metaDescription: "Specialist accounting for community pharmacy owners: FP34 cash cycle, Category M margin analysis, Pharmacy First income, VAT retail schemes, and payroll. England.",
    intro: "A community pharmacy is not a retail shop with a dispensary bolted on. Your income flows from the NHS under the Community Pharmacy Contractual Framework as reimbursement and remuneration, not till takings, and three things a generalist accountant routinely gets wrong (the FP34 cash lag, retrospective Category M margin adjustment, and your VAT-mixed status) compound into material errors month after month. We work exclusively with pharmacy owners because the contract literacy cannot be faked.",
    stats: [
      { value: "2 months", label: "Typical lag between FP34 prescription submission and NHSBSA payment receipt, driving working-capital planning" },
      { value: "15% / £5k", label: "Employer NIC rate above the £5,000 secondary threshold from 6 April 2025, applied across your dispenser and counter-staff payroll" },
      { value: "Zero-rated + standard", label: "NHS-dispensed drugs are VAT zero-rated; most OTC retail is standard-rated, making pharmacies a VAT-mixed business that typically reclaims more than a plain retailer expects" },
    ],
    challenges: [
      {
        title: "Your income is contract-driven, not till-driven",
        body: "Pharmacy income is reimbursement (Drug Tariff prices) plus remuneration (fees and service payments) under the CPCF. It is not shop takings. A bookkeeper who treats your bank receipts as sales will misstate income, misallocate VAT, and produce management accounts that mislead on profit. Understanding the contract is the prerequisite for everything else.",
      },
      {
        title: "The FP34 cash cycle creates a structural cash-flow gap",
        body: "Prescriptions are submitted monthly to the NHSBSA and payment arrives roughly two months later, with an advance on account in the interim. If your working-capital model does not explicitly map this lag, your cash-flow forecast will be wrong and your relationship with your bank may reflect it. We model the FP34 cycle into your monthly cash management from day one.",
      },
      {
        title: "Category M clawbacks mean your gross margin is a moving target",
        body: "The Drug Tariff sets reimbursement prices centrally, and Category M clawbacks adjust the margin retrospectively. The number on your FP34 statement is not your gross profit. Margin-variance analysis, comparing what you expected against what the Drug Tariff actually paid, is the core monthly accounting job for a pharmacy. Bookkeeping alone does not cover it.",
      },
      {
        title: "VAT retail schemes are a pharmacy-specific technical area",
        body: "NHS-dispensed prescription drugs are zero-rated; most OTC retail sales are standard-rated. Choosing the wrong retail scheme to apportion takings between these rates systematically overpays VAT. Private services and some Pharmacy First-adjacent services may be exempt or standard-rated and must be mapped separately. We apply the correct scheme and check your partial-exemption position where private services exist.",
      },
    ],
    howWeHelp: [
      {
        title: "NHS income reconciliation and FP34 cash-flow modelling",
        body: "We reconcile your NHSBSA payment statements to your books, identify discrepancies, and build a cash-flow model around the FP34 submission and payment cycle. Use our <a href=\"/calculators/pharmacy-fp34-cash-flow-estimator\">FP34 cash-flow estimator</a> for a quick scenario view, then speak to us for a plan built to your contract. See also our <a href=\"/services/nhs-payment-reconciliation-fp34\">NHS payment reconciliation service</a>.",
      },
      {
        title: "VAT retail-scheme selection and ongoing compliance",
        body: "We map your sales mix (zero-rated dispensing, standard-rated OTC, exempt or standard-rated private services), select the retail scheme that minimises your VAT cost, and handle quarterly compliance. Where Pharmacy First income or private services create a mixed position, we check partial exemption rather than assume it away. Full details at <a href=\"/services/pharmacy-vat-retail-schemes\">pharmacy VAT and retail schemes</a>.",
      },
      {
        title: "Payroll, profit extraction, and business structure",
        body: "<a href=\"/services/pharmacy-payroll-workforce\">Pharmacy payroll</a> involves employer NIC at 15% above a £5,000 secondary threshold (from 6 April 2025) across dispensers, technicians, and counter staff, plus the Employment Allowance of £10,500 where your business qualifies. Beyond payroll, we advise on salary and dividend mix for owner-directors, corporation-tax marginal-band planning (most single-store pharmacies sit between the 19% small-profits rate and the 25% main rate), and whether your current structure serves your growth and exit plans. See <a href=\"/services/pharmacy-incorporation-structure\">incorporation and structure</a>. If you own more than one store, read our <a href=\"/for/pharmacy-groups\">pharmacy groups page</a> first.",
      },
    ],
    faqs: [
      {
        question: "Why does my pharmacy income not match my till takings?",
        answer: "Because pharmacy income is not till-driven. It flows from the NHS as reimbursement (Drug Tariff prices for dispensed items) and remuneration (fees and service payments) under the Community Pharmacy Contractual Framework. Your NHSBSA payment statement, not your till, is the primary income record. A generalist accountant working from bank receipts alone will systematically misstate your position.",
      },
      {
        question: "When will I actually get paid for prescriptions I dispense this month?",
        answer: "FP34 prescriptions are submitted monthly to the NHSBSA and payment arrives roughly two months later. An advance on account is paid in the interim, but the full reconciliation follows. The exact timing varies; do not treat the advance as final income. We model this lag into your cash-flow plan so you are not caught short.",
      },
      {
        question: "What is Category M clawback and why does my margin keep moving?",
        answer: "The Drug Tariff sets reimbursement prices for Category M drugs centrally, and those prices are adjusted retrospectively based on actual market prices. A clawback reduces the margin you were initially paid. Your gross margin is therefore not fixed at the point of dispensing and must be tracked against subsequent Drug Tariff adjustments. Monthly margin-variance analysis is how we catch and quantify the movement.",
      },
      {
        question: "Is Pharmacy First income taxed and accounted differently?",
        answer: "Pharmacy First is a separately structured service income line with its own fee schedule and thresholds, distinct from your dispensing reimbursement. It must be accounted for separately from Drug Tariff income. The VAT treatment of any private Pharmacy First-adjacent services also needs individual assessment. We account for it correctly from the outset.",
      },
      {
        question: "Do pharmacies pay VAT on everything?",
        answer: "No. NHS-dispensed prescription drugs are zero-rated for VAT. Most OTC retail sales are standard-rated. This makes a pharmacy a VAT-mixed business: you charge VAT on some sales but not others, and your input VAT recovery is calculated across the mix. Pharmacies typically reclaim more input VAT than a plain retailer expects because of the zero-rated dispensing volume. The correct retail scheme and regular partial-exemption checks are essential.",
      },
      {
        question: "How much employer NIC do I pay on dispenser and counter staff?",
        answer: "From 6 April 2025, employer (Class 1 secondary) NIC is 15% on earnings above a £5,000 secondary threshold per employee per year. The old 13.8% rate above £9,100 is no longer current. The Employment Allowance (£10,500 from 6 April 2025) offsets your employer NIC bill if your pharmacy qualifies, though eligibility conditions apply including a bar on single-director companies with no other employees.",
      },
    ],
  },
  {
    slug: "buying-a-pharmacy",
    title: "Buying a Pharmacy",
    headline: "Accountants for pharmacy buyers: due diligence, deal structure, and the tax decisions no broker will make for you",
    metaTitle: "Buying a Pharmacy Accountant UK | Deal Structure & Due Diligence",
    metaDescription: "Specialist accounting for buying a UK pharmacy. Share vs asset purchase, goodwill, NHS contract due diligence, capital allowances, and lender-ready accounts.",
    intro: "When you buy a community pharmacy you are not buying a shop. You are buying an NHS contract, and market entry is regulated under the NHS (Pharmaceutical and Local Pharmaceutical Services) Regulations 2013. The broker finds the deal; we do the work the broker cannot: financial due diligence on the contract income, the share-versus-asset structuring decision, goodwill tax treatment, and a set of accounts your lender will actually accept. Whether you are an existing owner adding a second store or a first-time buyer, the NHS-contract layer is where most acquirers get caught out.",
    stats: [
      { value: "0.5% vs up to 5%", label: "Stamp duty on a share purchase (0.5% on share value) against SDLT at non-residential rates up to 5% on property in an asset purchase: the structuring decision is a real-money choice" },
      { value: "£1,000,000", label: "Annual Investment Allowance available at 100% on qualifying pharmacy fit-out plant and machinery, including dispensary robots, refrigeration, and shelving" },
      { value: "40% FYA", label: "First-year allowance introduced by FA 2026 for main-rate qualifying expenditure where AIA is exhausted, alongside a writing-down allowance now at 14% (down from 18%)" },
    ],
    challenges: [
      {
        title: "The NHS contract is the asset, not the shop",
        body: "Opening, relocating, or acquiring a pharmacy engages the NHS (Pharmaceutical and Local Pharmaceutical Services) Regulations 2013. The NHS contract, the prescription volume it supports, and the NHSBSA payment history are what you are buying. GPhC-registered premises and the superintendent pharmacist requirements for company owners are the regulatory mechanics we cover on the ownership side. The financial due diligence must validate the contract, not just the till.",
      },
      {
        title: "Share purchase or asset purchase: a structuring decision with tax consequences",
        body: "An asset purchase attracts SDLT on any property at non-residential and mixed-use rates, which rise to 5% at the higher bands. A share purchase attracts 0.5% stamp duty on the shares but means you inherit the selling company's full history, including any historic tax exposures, pending HMRC enquiries, and employment liabilities. The right structure depends on the target's history, the property position, and your own tax position. We model both before you make an offer.",
      },
      {
        title: "Goodwill dominates pharmacy pricing but CT relief is restricted",
        body: "Pharmacy prices are driven by the NHS contract and item volume, and goodwill typically dominates the purchase price. On a company purchase, corporation tax relief on goodwill is restricted and available only in limited cases at fixed rates. That affects your real cost of acquisition and must be factored into affordability. Valuation stays method-level (adjusted EBITDA and pence-per-item approaches are the standard methods), and we never assert a specific multiple. See our <a href=\"/services/pharmacy-valuation-goodwill\">pharmacy valuation and goodwill service</a> for the full picture.",
      },
      {
        title: "Lender-ready accounts require NHS-adjusted maintainable earnings",
        body: "A lender financing a pharmacy acquisition needs to see maintainable earnings adjusted for the FP34 cash-flow lag, Category M margin normalisation, and any one-off items in the historic accounts. Generic accountant-prepared accounts rarely make those adjustments explicitly. We prepare the financial analysis your lender needs and link it to the <a href=\"/calculators/pharmacy-purchase-affordability\">purchase affordability calculator</a> for scenario modelling.",
      },
    ],
    howWeHelp: [
      {
        title: "Financial due diligence on the contract and the accounts",
        body: "We verify FP34 income against NHSBSA payment statements, test Category M margin exposure, check the VAT retail-scheme position, and review payroll and staff costs for TUPE-relevant liabilities. This is the due-diligence layer the broker does not provide. See our <a href=\"/services/pharmacy-purchase-accounting\">pharmacy purchase accounting service</a> for the full scope and use our <a href=\"/calculators/pharmacy-fp34-cash-flow-estimator\">FP34 cash-flow estimator</a> to model the payment lag in the target business.",
      },
      {
        title: "Share vs asset structure and goodwill treatment",
        body: "We model the stamp-duty and SDLT cost of both structures, assess the CT relief position on goodwill for an asset purchase, and identify any history in the target company that makes shares more or less attractive. The output is a clear comparison you can put in front of your solicitor and your lender before heads of terms are agreed.",
      },
      {
        title: "Capital allowances on the fit-out and ongoing accounting setup",
        body: "Pharmacy fit-outs (shelving, dispensary robots, refrigeration, security systems) qualify as plant and machinery. The Annual Investment Allowance gives 100% relief on up to £1,000,000 of qualifying expenditure in the year of spend. Where AIA is exhausted, FA 2026 introduced a 40% first-year allowance for main-rate qualifying expenditure and reduced the writing-down allowance to 14% (from 18%); the special-rate pool stays at 6%. Qualifying works to the building itself attract the Structures and Buildings Allowance at 3% straight line. We claim the right allowances from day one of ownership.",
      },
    ],
    faqs: [
      {
        question: "Am I buying the pharmacy or the NHS contract?",
        answer: "Effectively the NHS contract. The contract, the prescription volume it supports, and the NHSBSA payment stream are what give the business its value. Market entry and ownership changes engage the NHS (Pharmaceutical and Local Pharmaceutical Services) Regulations 2013, and GPhC premises registration must be updated on a change of ownership. The financial due diligence must validate contract income, not just the retail till.",
      },
      {
        question: "Should I buy the shares or the assets?",
        answer: "An asset purchase attracts SDLT on property at non-residential rates up to 5%. A share purchase attracts 0.5% stamp duty on the shares but means you inherit the selling company's history. The right answer depends on the property position, the target company's historic tax exposure, and how goodwill CT relief plays out in each structure. We model both before you commit.",
      },
      {
        question: "Why is so much of the price goodwill, and can I get tax relief on it?",
        answer: "Pharmacy goodwill is driven by the NHS contract and item volume. It typically dominates the purchase price because the contract itself is what generates the income stream. On a company acquisition, CT relief on purchased goodwill is restricted and only available in limited cases. That restricted relief position affects the real after-tax cost of the deal and must be assessed deal-by-deal.",
      },
      {
        question: "What should due diligence on a pharmacy actually check?",
        answer: "At minimum: FP34 NHSBSA payment history versus recorded income, Category M margin exposure and any pending clawbacks, VAT retail-scheme correctness, staff contracts and TUPE position, GPhC registration status, and any outstanding HMRC enquiries or historic tax exposures in the company. We provide pharmacy-specific financial due diligence that covers all of these.",
      },
      {
        question: "Can I claim capital allowances on the fit-out?",
        answer: "Yes. Dispensary equipment, robots, refrigeration, shelving, and security systems are plant and machinery. The Annual Investment Allowance covers up to £1,000,000 at 100% in the year of spend. Where AIA is exhausted, FA 2026 introduced a 40% first-year allowance for main-rate qualifying expenditure, and the main-rate writing-down allowance is now 14% (down from 18%). Works to the building structure itself qualify for the Structures and Buildings Allowance at 3% straight line.",
      },
      {
        question: "I am a locum pharmacist, can I buy my first pharmacy?",
        answer: "Yes, and the transition from locum to owner is a well-travelled route in the sector. The financial profile changes substantially: you move from Self Assessment on day-rate income to managing NHS contract cash flow, FP34 reconciliation, VAT retail schemes, and an employer payroll. Our <a href=\"/for/locum-pharmacists\">locum pharmacists page</a> covers your current tax position, and we can walk you through what owning the contract changes.",
      },
    ],
  },
  {
    slug: "selling-a-pharmacy",
    title: "Selling a Pharmacy",
    headline: "Tax planning for pharmacy owners selling their business: BADR, CGT, and structuring the exit correctly",
    metaTitle: "Selling a Pharmacy Tax UK | BADR and CGT Planning",
    metaDescription: "Specialist advice for pharmacy owners selling their business. BADR at 18% for 2026/27 up to £1m lifetime limit, CGT rates, valuation, and deal structure.",
    intro: "A pharmacy sale is usually a one-time event and the largest financial transaction of an owner's career. The tax on the disposal is the whole game: Business Asset Disposal Relief charges CGT at 18% for 2026/27 on qualifying gains up to the £1 million lifetime limit per person, and standard CGT rates of 18% or 24% apply above it, with the annual exempt amount frozen at £3,000. The rate stepped up from 14% in 2025/26, so timing a sale around BADR rate steps is real money. We provide the exit-tax planning, valuation input, and deal-structuring advice that a pharmacy broker does not.",
    stats: [
      { value: "18%", label: "BADR rate for 2026/27 on qualifying pharmacy disposals up to the £1m lifetime limit per person (was 14% in 2025/26, 10% before that)" },
      { value: "18% / 24%", label: "Standard CGT rates on gains above the BADR band: 18% within the basic-rate band and 24% above, with the annual exempt amount frozen at £3,000" },
      { value: "£1m lifetime", label: "BADR lifetime limit per person: gains above this threshold fall into standard CGT rates, making deal structure and timing critical" },
    ],
    challenges: [
      {
        title: "BADR eligibility must be confirmed before exchange, not after",
        body: "Business Asset Disposal Relief applies to qualifying disposals at 18% for 2026/27 up to the £1 million lifetime limit per person. Eligibility conditions must be met before the disposal: the pharmacy must have been a qualifying trading business and you must have been a qualifying individual for the required period. Losing BADR on a late discovery pushes the gain into standard CGT rates of up to 24%. We check eligibility before heads of terms are agreed, not at the filing stage.",
      },
      {
        title: "Standard CGT beyond BADR is band-split, not flat",
        body: "Gains beyond the BADR band are taxed at 18% on the portion falling within your remaining basic-rate income tax band and 24% on the excess. The annual exempt amount is frozen at £3,000. A pharmacy is a non-residential asset for the rate split. Deal structure (earn-outs, deferred consideration, payment in instalments) changes when the tax falls due, not just how much it is. We model the full CGT position across both bands before you agree heads of terms.",
      },
      {
        title: "Share sale versus asset sale produces different tax outcomes for the seller",
        body: "An asset sale generates CGT on goodwill and individual assets. A share sale disposes of the shares, and BADR may apply to the share gain if conditions are met. The buyer's preference and the relative tax cost to each party determine the structure. Goodwill typically dominates pharmacy pricing, driven by the NHS contract and item volume, and its tax treatment differs under each structure. We model both sides of the deal.",
      },
      {
        title: "Preparing the accounts for a sale takes time",
        body: "A buyer's due diligence and their lender will require clean, finance-ready accounts that correctly reflect FP34 income, Category M margin, VAT retail-scheme treatment, and adjusted earnings. Accounts that were prepared adequately for compliance purposes often need supplementary analysis before they support a sale process. Starting preparation early reduces the risk of deal-stage discoveries that reset the price.",
      },
    ],
    howWeHelp: [
      {
        title: "BADR eligibility review and CGT modelling",
        body: "We verify BADR eligibility against the qualifying conditions, model the full CGT liability split across the BADR rate and standard rates, and identify any pre-sale steps that need to happen before exchange. There is no dedicated sale-tax calculator at launch because individual deal structures vary too much for a meaningful estimate tool; the number comes from us. See our <a href=\"/services/pharmacy-sale-cgt-badr\">pharmacy sale CGT and BADR service</a>.",
      },
      {
        title: "Sale structure advice and deal mechanics",
        body: "We model the tax outcome under an asset sale and a share sale, advise on earn-out and deferred-consideration timing, and flag any pre-sale restructuring that could improve the position if planned well in advance. Restructuring rushed before exchange rarely achieves the intended result. We work with your solicitor throughout the process. See also our <a href=\"/services/pharmacy-valuation-goodwill\">pharmacy valuation and goodwill service</a> and <a href=\"/services/pharmacy-incorporation-structure\">incorporation and structure</a>.",
      },
      {
        title: "Sale-ready accounts and ongoing compliance to exit",
        body: "We prepare or review the accounts that will go into the data room, ensure FP34 income, Category M margin, and VAT treatment are correctly presented, and produce the adjusted-earnings analysis a buyer and their lender need. We continue to handle compliance during the sale period so there are no open filings or HMRC queries at completion. The <a href=\"/research/pharmacy-openings-closures-index\">pharmacy openings and closures index</a> provides market context on transaction volumes.",
      },
    ],
    faqs: [
      {
        question: "How much CGT will I pay when I sell my pharmacy?",
        answer: "It depends on the size of your gain, whether BADR applies, and your income in the tax year of disposal. BADR charges CGT at 18% for 2026/27 on qualifying gains up to the £1 million lifetime limit per person. Gains above that threshold, or where BADR does not apply, are taxed at 18% within the remaining basic-rate band and 24% above it, with the annual exempt amount frozen at £3,000. We model the full liability for your specific position before you commit to a price.",
      },
      {
        question: "What is BADR and has the rate changed?",
        answer: "Business Asset Disposal Relief reduces CGT to a lower rate on qualifying business disposals up to a lifetime limit. The rate for 2026/27 is 18%, up from 14% in 2025/26 and 10% before that. The change took effect from 6 April 2026. The lifetime limit remains £1 million per person. If you used part of your lifetime limit on a previous disposal, only the remainder is available.",
      },
      {
        question: "Is my whole gain taxed at the BADR rate?",
        answer: "Only up to the £1 million lifetime limit per person, and only if all qualifying conditions are met. Gains above the limit, or gains where BADR does not apply, fall into standard CGT rates of 18% or 24% depending on your income band. The annual exempt amount of £3,000 is available to offset any remaining gain. This is why pre-sale tax modelling matters: the marginal cost of a £1 gain above the BADR band can be much higher than the headline 18%.",
      },
      {
        question: "How is a pharmacy valued?",
        answer: "Pharmacy valuation uses adjusted EBITDA multiples and pence-per-item benchmarks as the standard methods, both driven by the NHS contract and prescription volume. We work at the method level and never assert a specific multiple without a cited market source. Our <a href=\"/services/pharmacy-valuation-goodwill\">pharmacy valuation and goodwill service</a> covers the mechanics and how goodwill is treated for tax on each deal structure.",
      },
      {
        question: "Should I sell the shares or the assets?",
        answer: "From the seller's perspective, a share sale disposes of the shares in the company and BADR may apply to the gain on those shares if conditions are met. An asset sale generates CGT on goodwill and other individual assets. The buyer's preference, the tax cost to each party, and the history of the company all influence the right structure. We model both and advise on which gives the better outcome for your circumstances.",
      },
      {
        question: "Can I spread the tax with an earn-out or deferred consideration?",
        answer: "Earn-outs and deferred consideration change when tax falls due, which affects cash flow at completion and in subsequent years. The tax treatment of deferred consideration depends on whether it is fixed or contingent and how the deal documents characterise it. We factor this into the pre-sale modelling so you understand the timing of your tax liability, not just its total amount.",
      },
    ],
  },
  {
    slug: "pharmacy-groups",
    title: "Pharmacy Groups",
    headline: "Accountants for multiple-store pharmacy owners: group structure, associated-companies CT, and the tax traps that only appear at scale",
    metaTitle: "Pharmacy Group Accountants UK | Multi-Store CT and Structure",
    metaDescription: "Specialist accounting for UK pharmacy groups. Associated-companies CT trap, group structure, dividend extraction, multi-site VAT and payroll. England.",
    intro: "Running two or more pharmacies through separate companies creates a corporation-tax exposure that does not exist at single-store level. The £50,000 small-profits rate threshold and the £250,000 main-rate threshold are divided by the number of associated companies, so a multi-store owner with separate entities loses lower-rate headroom and can push the whole group toward the 25% main rate without any increase in profit. Group structure, profit extraction, and multi-site VAT and payroll are the disciplines where a generalist accountant is genuinely outgunned by the combination of NHS-contract depth and group-tax mechanics.",
    stats: [
      { value: "25% / 19%", label: "Corporation tax main rate (profits over £250,000) and small profits rate (profits up to £50,000): thresholds divide by number of associated companies, so a two-company group halves the lower-rate headroom" },
      { value: "10.75% / 35.75% / 39.35%", label: "Dividend tax rates for 2026/27 (basic / higher / additional rate) on distributions from post-corporation-tax profit, with a £500 dividend allowance: profit extraction is a two-layer calculation" },
      { value: "£10,500", label: "Employment Allowance from 6 April 2025, offsetting employer secondary NIC across the group, but subject to connected-company rules that restrict how the allowance is claimed across multiple entities" },
    ],
    challenges: [
      {
        title: "The associated-companies trap: separate companies divide your CT rate band",
        body: "Corporation tax is 25% on profits above £250,000 and 19% on profits up to £50,000, with Marginal Relief between those thresholds. But the £50,000 and £250,000 limits are divided by the number of associated companies. A group owner with four separate pharmacy companies has effective thresholds of £12,500 and £62,500 per entity, not £50,000 and £250,000. Every store then sits in the marginal band or above it from a much lower profit level. Most single-store operators are unaware of this until they open their second store.",
      },
      {
        title: "Group structure choices affect tax, financing, and a future sale",
        body: "A holding company above trading subsidiaries can facilitate tax-efficient profit pooling, protect retained cash, and simplify a future disposal. It also changes how you finance a new acquisition, how intra-group management charges work, and whether a sale of one store triggers a taxable event at the group level. Goodwill and CT relief restrictions apply to intra-group acquisitions just as they do to third-party deals. We advise on structure before you commit to the next acquisition, not after.",
      },
      {
        title: "Multi-site payroll and Employment Allowance carry group-level rules",
        body: "Employer (Class 1 secondary) NIC is 15% above a £5,000 secondary threshold per employee from 6 April 2025. The Employment Allowance is £10,500 from 6 April 2025, but connected-company rules restrict how it is claimed across a group: broadly, only one company in a connected group can claim it. A multi-store operator who claims £10,500 per company is overclaiming. We manage the group payroll correctly and claim the allowance in the right entity.",
      },
      {
        title: "Consolidated NHS-income reporting is the operational anchor",
        body: "Comparing store-level performance requires consistent Category M margin analysis, FP34 cash-cycle normalisation, and Pharmacy First income tracking across every site. A group whose management accounts are prepared to different standards for each store cannot identify which sites are underperforming or why margin is diverging. We produce consolidated reporting that makes store-level comparison meaningful.",
      },
    ],
    howWeHelp: [
      {
        title: "Associated-companies CT review and group structure planning",
        body: "We map your current entity structure, calculate the effective CT threshold per company under the associated-companies rules, and model the tax impact of restructuring options including a holding company above trading subsidiaries. There is no dedicated group CT calculator at launch because the associated-companies arithmetic is entity-specific; the modelling comes from us. See <a href=\"/services/pharmacy-incorporation-structure\">incorporation and structure</a> for the full service scope.",
      },
      {
        title: "Profit extraction across the group",
        body: "Dividends from a pharmacy company are paid from post-corporation-tax profit and then taxed again at dividend rates of 10.75% (basic), 35.75% (higher), or 39.35% (additional) for 2026/27, with a £500 dividend allowance. We optimise the salary and dividend mix across owner-directors to minimise the combined CT and dividend tax burden. For expansion planning, use our <a href=\"/calculators/pharmacy-purchase-affordability\">purchase affordability calculator</a> and <a href=\"/calculators/pharmacy-fp34-cash-flow-estimator\">FP34 cash-flow estimator</a> to stress-test the numbers before committing to a new store.",
      },
      {
        title: "Multi-site VAT, payroll, and consolidated management accounts",
        body: "We apply the correct VAT retail scheme consistently across sites, manage multi-site payroll with Employment Allowance claimed in the right entity, and produce consolidated management accounts that compare FP34 income, Category M margin, and Pharmacy First service revenue store by store. See <a href=\"/services/pharmacy-vat-retail-schemes\">pharmacy VAT and retail schemes</a>, <a href=\"/services/pharmacy-payroll-workforce\">payroll and workforce</a>, and <a href=\"/services/pharmacy-benchmarking-margin\">margin benchmarking</a>. When you are ready to add another store, see <a href=\"/for/buying-a-pharmacy\">buying a pharmacy</a>.",
      },
    ],
    faqs: [
      {
        question: "I own several pharmacies through separate companies. Am I paying more corporation tax than I need to?",
        answer: "Possibly yes. The small-profits rate threshold (£50,000) and the main-rate threshold (£250,000) are divided by the number of associated companies. If you have four separate pharmacy companies, the effective thresholds per entity are £12,500 and £62,500. Every store then sits in the marginal band at a much lower profit level than a single-store operator. Restructuring into a holding company may change the position. We model the current cost before recommending a structure change.",
      },
      {
        question: "What are associated companies and how do they affect my tax rate?",
        answer: "Two companies are associated if one controls the other, or both are controlled by the same person or group. The corporation-tax thresholds (£50,000 and £250,000) are divided by the number of associated companies in the accounting period. So a group owner with three associated pharmacy companies has effective thresholds of roughly £16,667 and £83,333. Marginal Relief applies between those reduced thresholds, and the main 25% rate kicks in above the upper limit.",
      },
      {
        question: "Should I hold my pharmacies under a group or holding company?",
        answer: "A holding company above trading subsidiaries can facilitate profit pooling, protect retained cash from trading risk, and simplify a future sale of one store without triggering a taxable event at the group level. It also affects how acquisitions are financed and how goodwill CT relief restrictions apply. Whether it is right depends on your current structure, the number of stores, your exit timeline, and how you extract profit. We advise on structure before the next acquisition, not after.",
      },
      {
        question: "Can each of my companies claim the Employment Allowance?",
        answer: "No. Connected companies can broadly only claim the Employment Allowance once across the group, in the single entity where it gives the greatest offset. Claiming £10,500 separately in each company in a connected group is an overclaim. The correct approach is to identify the entity with the largest employer NIC liability and claim the allowance there. We manage this across the group payroll.",
      },
      {
        question: "How do I compare margin and cash flow across my stores?",
        answer: "By producing consistent management accounts for each store that separate FP34 dispensing income from Pharmacy First service income, normalise for Category M margin timing, and apply the same VAT retail-scheme treatment across sites. Without that consistency, the numbers are not comparable and poor-performing stores are invisible. Our <a href=\"/services/pharmacy-benchmarking-margin\">margin benchmarking service</a> is built around store-level comparison for multi-site operators.",
      },
    ],
  },
  {
    slug: "locum-pharmacists",
    title: "Locum Pharmacists",
    headline: "Tax, employment status, and self-assessment guidance for locum pharmacists: what HMRC's own manual says about you",
    metaTitle: "Locum Pharmacist Tax UK | Self-Employment Status & MTD Guide",
    metaDescription: "Tax and status guidance for locum pharmacists. HMRC ESM4270, IR35, Making Tax Digital from April 2026, cash basis, and the route from locum to pharmacy owner.",
    intro: "HMRC publishes a locum-pharmacist-specific page in its Employment Status Manual, reference ESM4270, and its position is more restrictive than many locum pharmacists realise. Employment status for a locum pharmacist is decided by the facts of each engagement, not by what the contract says or what everyone else in the sector does. This page covers the tax and status questions that are specific to pharmacist locums, deduplicated from the generic locum guidance on medical and contractor sites. The only conversion on this page is the take-home comparator tool and, for locums thinking about ownership, the route into our buying-a-pharmacy guidance.",
    stats: [
      { value: "ESM4270", label: "HMRC's Employment Status Manual contains a page specific to locum pharmacists: status is fact-based and HMRC's stated position is restrictive, not permissive" },
      { value: "£50,000+", label: "Making Tax Digital for Income Tax applies to sole-trader locums from April 2026 with qualifying income above £50,000, dropping to £30,000 from April 2027" },
      { value: "IR35 via CEST", label: "Where a locum works through their own limited company, off-payroll working rules apply if the client is in scope: CEST is HMRC's check tool of record" },
    ],
    challenges: [
      {
        title: "HMRC's position on locum pharmacist status is restrictive",
        body: "HMRC's Employment Status Manual at ESM4270 is specific to locum pharmacists and sets out HMRC's view of how status tests apply in practice. The position is restrictive: self-employment is not the safe default, and the argument that everyone in the sector operates self-employed is not a defence against a status enquiry. Status is determined by the facts of control, substitution, and financial risk in each engagement, not by the label on the contract.",
      },
      {
        title: "Substitution and GPhC registration are pharmacist-specific status factors",
        body: "The right of substitution is a key indicator of self-employment, but for a GPhC-registered pharmacist filling a dispensary role, genuine substitution is more constrained than in most other professions. The substitute must also be GPhC-registered and acceptable to the client pharmacy. Whether your substitution right is genuine or contractual-only matters for how HMRC assesses the engagement.",
      },
      {
        title: "IR35 adds a layer of complexity for limited-company locums",
        body: "Where a locum pharmacist works through their own limited company (a personal service company), IR35 off-payroll working rules apply if the client pharmacy is in scope and the engagement would be employment but for the company. The client's size determines whether the client or the locum's company makes the status determination. HMRC's Check Employment Status for Tax tool (CEST) is the check tool of record. Running the wrong structure on a restrictive-status engagement carries significant risk.",
      },
      {
        title: "Making Tax Digital applies from April 2026 for higher-income locums",
        body: "From April 2026, sole-trader locums with qualifying income above £50,000 must comply with Making Tax Digital for Income Tax, keeping digital records and submitting quarterly updates to HMRC instead of a single annual return. The threshold drops to £30,000 from April 2027. Cash basis is the default accounting method for unincorporated businesses, which affects how income and expenditure are recognised under MTD.",
      },
    ],
    howWeHelp: [
      {
        title: "Status assessment, IR35 review, and Self Assessment",
        body: "We assess employment status at the engagement level against the control, substitution, and financial-risk tests, with the pharmacist-specific ESM4270 framing applied. Where you work through a limited company, we run a CEST-consistent IR35 review for each client engagement and advise on the correct treatment. For sole traders, we prepare and file your Self Assessment return, including all locum income and allowable business expenses, and set up digital record-keeping for MTD compliance ahead of the April 2026 deadline. Use our <a href=\"/calculators/locum-take-home-comparator\">locum take-home comparator</a> to model sole trader versus limited company versus umbrella at your day-rate level before deciding on structure.",
      },
      {
        title: "MTD for Income Tax setup and ongoing compliance",
        body: "If your qualifying income is above £50,000 you are within the April 2026 MTD mandate. We set up compatible software, migrate your records to digital format, and handle the quarterly submission cycle so that the additional compliance burden falls on us, not on you. Cash basis is the default for unincorporated businesses and simplifies some of the recognition questions for locums who are paid on receipt rather than invoice date.",
      },
      {
        title: "From locum to pharmacy owner: the transition guide",
        body: "Today's locum is frequently tomorrow's buyer. Moving from self-employed locum income to owning an NHS contract changes almost everything in your tax and accounting position: you acquire an FP34 cash-flow cycle, a VAT-mixed business, an employer payroll, and a business whose value sits primarily in the goodwill attached to the contract. If you are at the stage of considering your first purchase, our <a href=\"/for/buying-a-pharmacy\">buying a pharmacy</a> page covers the accounting and tax work involved, and our <a href=\"/for/pharmacy-owners\">pharmacy owners page</a> explains what running the contract looks like from month one.",
      },
    ],
    faqs: [
      {
        question: "Are locum pharmacists self-employed?",
        answer: "Not automatically. HMRC's Employment Status Manual at ESM4270 sets out HMRC's position on locum pharmacists specifically, and it is more restrictive than many in the sector assume. Status is determined by the facts of each engagement: control (who directs how the work is done), substitution (whether you have a genuine right to send someone else), and financial risk (whether you bear the economic consequences of poor work). The argument that everyone in the sector works self-employed is not a defence in a status enquiry.",
      },
      {
        question: "Does IR35 apply to a locum pharmacist with a limited company?",
        answer: "It can. If you work through your own limited company and the engagement would be employment but for the company structure, the off-payroll working rules (IR35) may apply. The client pharmacy's size determines whether the client or your company is responsible for the status determination. HMRC's CEST tool is the check tool of record. We run a CEST-consistent review for each client engagement and advise on the correct structure.",
      },
      {
        question: "Should a locum pharmacist use a limited company, an umbrella, or go sole trader?",
        answer: "The right structure depends on your day-rate level, your engagement patterns, your status risk at each client, and your plans. A limited company gives tax-planning flexibility but carries IR35 risk and administrative overhead. An umbrella processes you through PAYE and avoids status risk but removes the flexibility. Sole trader is straightforward for genuinely self-employed engagements but brings MTD obligations above £50,000 from April 2026. Use our <a href=\"/calculators/locum-take-home-comparator\">take-home comparator</a> to model the numbers at your day rate, and speak to us if the status position is unclear.",
      },
      {
        question: "How does a locum pharmacist pay tax?",
        answer: "A self-employed sole-trader locum registers with HMRC, keeps digital or paper records of income and expenses, and files a Self Assessment return annually. Cash basis is the default accounting method for unincorporated businesses, meaning income is recognised when received and expenses when paid. From April 2026, locums with qualifying income above £50,000 must also follow Making Tax Digital for Income Tax, submitting quarterly updates to HMRC.",
      },
      {
        question: "Do I need to follow Making Tax Digital as a locum pharmacist?",
        answer: "From April 2026, yes, if your qualifying income from self-employment (and/or property) is above £50,000. You will need compatible software, digital records, and quarterly submissions to HMRC rather than a single annual return. The threshold drops to £30,000 from April 2027. We set up the compliance framework so the quarterly cycle does not land on you unexpectedly.",
      },
      {
        question: "Can a locum pharmacist buy their own pharmacy?",
        answer: "Yes. Moving from locum to owner is a well-established route. The financial position changes substantially: you move from Self Assessment on day-rate income to managing an NHS contract, FP34 cash flow, VAT retail schemes, and an employer payroll. See our <a href=\"/for/buying-a-pharmacy\">buying a pharmacy</a> page for the accounting and tax work involved in a pharmacy acquisition.",
      },
    ],
    // ponytail: locum-pharmacists is content-only, no lead capture
    noLeadForm: true,
  },
];

export function getPharmacyHub(slug: string): PharmacyHub | undefined {
  return pharmacyHubs.find(h => h.slug === slug);
}
