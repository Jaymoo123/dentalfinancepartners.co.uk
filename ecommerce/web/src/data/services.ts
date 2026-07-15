export interface EcommerceService {
  slug: string; title: string; headline: string; metaTitle: string; metaDescription: string;
  intro: string; stats: Array<{ value: string; label: string }>;
  challenges: Array<{ title: string; body: string }>;
  howWeHelp: Array<{ title: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

export const ecommerceServices: EcommerceService[] = [
  {
    slug: "ecommerce-vat-compliance",
    title: "Ecommerce VAT Compliance",
    headline: "VAT compliance for UK online sellers: registration, schemes and marketplace obligations",
    metaTitle: "Ecommerce VAT Compliance UK | Online Seller VAT",
    metaDescription: "VAT compliance for UK ecommerce and marketplace sellers. Registration, the £90,000 threshold on gross sales, flat-rate scheme pitfalls and cross-border obligations.",
    intro: "VAT for online sellers has specific rules that differ from standard retail VAT. The registration threshold applies to taxable turnover, which for most sellers means gross selling price before platform fees, not net payout. Platform-collected VAT on overseas seller sales changes the analysis for marketplaces. The flat-rate scheme is typically disadvantageous for goods sellers. We handle VAT registration, returns and compliance for UK online sellers.",
    stats: [
      { value: "£90,000", label: "UK VAT registration threshold on taxable turnover (gross sales, not net payout) in any rolling 12-month period" },
      { value: "Gross sales", label: "VAT registration threshold is measured on gross selling price; platform fees deducted by the marketplace do not reduce the taxable turnover figure" },
      { value: "16.5%", label: "Flat-rate scheme limited cost business rate; the usual outcome for goods sellers and one reason FRS is typically the wrong scheme for them" },
    ],
    challenges: [
      {
        title: "The threshold is on gross sales, not what you receive",
        body: "Amazon, eBay and Etsy deduct fees and settle a net payout. For VAT purposes, <a href=\"https://www.gov.uk/vat-registration\">taxable turnover is the gross selling price</a> before the platform takes its cut. Sellers who monitor their bank balance or settlement payouts against the £90,000 threshold will breach it without realising, because the threshold is on gross sales.",
      },
      {
        title: "Flat-rate scheme is usually wrong for goods sellers",
        body: "The flat-rate scheme (FRS) allows VAT-registered businesses to pay a fixed percentage of gross turnover to HMRC instead of accounting for input and output VAT separately. For goods sellers, the <a href=\"https://www.gov.uk/vat-flat-rate-scheme/how-much-you-pay\">limited-cost trader rate of 16.5%</a> applies where relevant goods spend is below 2% of turnover or below £1,000 a year. FRS forfeits input VAT recovery on stock purchases, making it a poor fit for most product sellers.",
      },
      {
        title: "Cross-border VAT after marketplace rules changed",
        body: "Non-UK-established sellers have no VAT registration threshold; the marketplace accounts for UK VAT on their sales. UK sellers selling into the EU face destination-country VAT obligations or must use EU OSS/IOSS schemes. These rules changed in 2021 and many sellers are still operating under pre-change assumptions.",
      },
      {
        title: "VAT on platform fees and advertising",
        body: "Where marketplace, advertising or software services are bought from an overseas supplier, <a href=\"https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a\">the reverse charge under Notice 741A</a> means the buyer self-accounts for UK VAT. Crucially, the value of those reverse-charge services counts toward the £90,000 registration threshold, which catches sellers buying large volumes of overseas ad or platform services. Both the reverse-charge output and the input recovery go on the VAT return.",
      },
    ],
    howWeHelp: [
      {
        title: "VAT registration at the right time with the right scheme",
        body: "We assess your taxable turnover correctly (gross sales, not net payout), advise on registration timing and select the appropriate VAT scheme for your selling model. We register you with HMRC and set up your VAT return process.",
      },
      {
        title: "Ongoing VAT returns and compliance",
        body: "We prepare and submit your VAT returns, account for platform fees and advertising through the reverse charge where applicable, and keep your VAT position compliant as your sales grow.",
      },
      {
        title: "Cross-border and marketplace VAT advice",
        body: "We advise on EU VAT obligations, OSS and IOSS registration for eligible sellers, and the UK £135 import rule for sellers fulfilling direct from overseas suppliers.",
      },
    ],
    faqs: [
      {
        question: "Is my Amazon payout the same as my taxable turnover for VAT purposes?",
        answer: "No. Amazon settles a net payout after deducting its fees. For UK VAT purposes, taxable turnover is the gross selling price before Amazon takes its cut. The £90,000 VAT registration threshold is measured on gross sales. Monitoring your bank balance or settlement payouts against the threshold will cause you to breach it without realising.",
      },
      {
        question: "Should I use the flat-rate scheme for my online selling?",
        answer: "For most goods sellers, no. The flat-rate scheme at the limited-cost trader rate of 16.5% means paying HMRC 16.5% of gross VAT-inclusive turnover. For sellers with significant stock costs, standard VAT accounting (claiming input VAT on purchases and paying output VAT on sales) is usually more favourable. The flat-rate scheme suits service businesses with low input VAT, not product sellers.",
      },
      {
        question: "Do I need a separate VAT number for EU sales?",
        answer: "UK VAT registration only covers UK sales. EU sales to consumers may require EU OSS registration or individual country registrations depending on your volumes and fulfilment model. If you store goods in an EU country, you have a registration obligation there regardless of OSS. We assess the correct approach for your specific sales geography.",
      },
    ],
  },
  {
    slug: "settlement-payout-reconciliation",
    title: "Settlement and Payout Reconciliation",
    headline: "Amazon settlement and Shopify payout reconciliation for accurate accounts",
    metaTitle: "Amazon Settlement Reconciliation UK | Shopify Payout Accounts",
    metaDescription: "Amazon settlement report reconciliation and Shopify payout bookkeeping for UK sellers. Accurate accounts that separate fees, COGS and true trading revenue.",
    intro: "Platform settlement reports and gateway payouts are not accounting documents. Amazon settlement reports combine sales proceeds, FBA fees, advertising costs, reimbursements and loan repayments in a single net figure. Shopify payouts mix multiple gateways, each settling on different cycles. Bookkeeping built from these documents produces inaccurate accounts and unreliable VAT returns. We reconcile settlement data back to gross trading figures for accurate accounts.",
    stats: [
      { value: "Net payout", label: "Amazon and Shopify settle net of fees; bookkeeping from bank statements alone misstates gross revenue and VAT" },
      { value: "Every 2 weeks", label: "Typical Amazon settlement cycle; each settlement mixes sales, fees, reimbursements and adjustments into one net deposit" },
      { value: "Software neutral", label: "Settlement reconciliation works with or without accounting software integrations like A2X or Link My Books" },
    ],
    challenges: [
      {
        title: "Settlement reports mix revenue and expense categories",
        body: "An Amazon settlement report is a single document combining gross sales (revenue), FBA fulfilment fees (expense), referral fees (expense), advertising costs (expense), reimbursements (revenue adjustment) and any loan repayments (financing). Treating the net figure as revenue, or treating fee categories as a single line, produces inaccurate accounts and a VAT return that does not reconcile to actual sales.",
      },
      {
        title: "Multiple settlement cycles do not align with accounting periods",
        body: "Amazon settles approximately every two weeks; Shopify Payments, PayPal and Stripe each have different settlement schedules. Monthly accounts need to accrue revenue and costs to the correct period regardless of when funds arrive in the bank. Settlement-based bookkeeping that matches bank deposits to accounting periods produces timing mismatches.",
      },
      {
        title: "Returns and refunds in settlement data",
        body: "Returns processed through Amazon or Shopify appear as negative adjustments in subsequent settlement periods. Correctly matching returns to the original sale period, and accounting for FBA return fees, is necessary for accurate revenue recognition and VAT returns.",
      },
      {
        title: "COGS recognition for inventory-based businesses",
        body: "Product sellers need to recognise cost of goods sold in the period the goods are sold, not when stock is purchased. Settlement-based bookkeeping that records stock purchases as expenses when bought overstates costs in stock-building periods and understates them in draw-down periods.",
      },
    ],
    howWeHelp: [
      {
        title: "Monthly reconciliation of settlement reports to gross trading figures",
        body: "We reconcile Amazon settlement reports and Shopify payout data back to gross sales, categorise fees correctly as expenses, and produce monthly management accounts showing true trading revenue and margin.",
      },
      {
        title: "VAT return preparation from reconciled data",
        body: "Our reconciled accounts provide the gross sales figures needed for an accurate VAT return, with platform fees and advertising costs correctly treated for input VAT recovery.",
      },
      {
        title: "COGS and inventory tracking",
        body: "We set up or review your COGS recognition methodology so that stock costs are matched to sales in the correct period, giving a reliable profit figure for tax planning and business decisions.",
      },
    ],
    faqs: [
      {
        question: "Can I just use my bank statement for my Amazon accounts?",
        answer: "No. Your bank statement shows net settlement payouts, not gross sales. For VAT purposes, taxable turnover is gross sales before Amazon's fees. For income tax, gross revenue and fee expenses need to be shown separately. Bookkeeping from bank statements understates revenue, understates expenses and produces a VAT return that cannot be reconciled to actual sales.",
      },
      {
        question: "Do I need A2X or Link My Books to reconcile Amazon settlements?",
        answer: "These tools automate the reconciliation process and are widely used, but they are not the only approach. We can reconcile Amazon settlement data with or without these integrations, using exported settlement reports. If you already use A2X or Link My Books, we work with that data.",
      },
    ],
  },
  {
    slug: "selling-into-the-eu",
    title: "Selling into the EU",
    headline: "EU VAT, IOSS and OSS for UK sellers shipping to European customers",
    metaTitle: "Selling into the EU from UK | IOSS OSS VAT Compliance",
    metaDescription: "EU VAT compliance for UK online sellers. IOSS registration, OSS for NI sellers, destination-country VAT obligations and selling into the EU after Brexit.",
    intro: "UK sellers shipping goods to EU consumers face destination-country VAT obligations that changed significantly in 2021. IOSS (Import One Stop Shop) covers B2C consignments into the EU worth up to <a href=\"https://vat-one-stop-shop.ec.europa.eu/one-stop-shop_en\">€150</a> through a single registration; the scheme is explained in full at <a href=\"/vat/ioss-vs-oss\">/vat/ioss-vs-oss</a>. OSS covers distance selling from Northern Ireland. Outside these schemes, country-by-country obligations apply. Most UK sellers dealing with EU customers after Brexit need a clear picture of what they owe and where.",
    stats: [
      { value: "Post-Brexit", label: "UK sellers are treated as third-country sellers for EU VAT purposes; the previous EU distance-selling thresholds no longer apply to GB sellers" },
      { value: "€150", label: "IOSS consignment ceiling set in EU law; above it, destination-country import VAT applies at the border" },
      { value: "Intermediary required", label: "GB-based sellers registering for EU IOSS must use an EU-established intermediary; HMRC does not operate an IOSS scheme for GB sellers" },
    ],
    challenges: [
      {
        title: "UK sellers are treated as third-country sellers for EU VAT",
        body: "Since 1 January 2021, Great Britain is outside the EU's VAT area. UK sellers are treated as non-EU sellers for EU VAT purposes. The old EU distance-selling threshold model, where you charged UK VAT until you hit a country threshold, no longer applies to GB sellers. Each EU sale to a consumer potentially requires destination-country VAT to be accounted for from the first sale.",
      },
      {
        title: "IOSS for small consignments requires an EU intermediary",
        body: "EU IOSS allows sellers to register once and account for destination-country VAT on B2C consignments into the EU of an intrinsic value up to <a href=\"https://vat-one-stop-shop.ec.europa.eu/one-stop-shop_en\">€150</a> (see <a href=\"/vat/ioss-vs-oss\">/vat/ioss-vs-oss</a> for detail). GB sellers cannot register directly; they must use an EU-established fiscal intermediary. The intermediary takes on joint and several liability for the VAT. This is an additional cost and compliance layer that most GB sellers underestimate.",
      },
      {
        title: "Above the €150 IOSS ceiling, country-by-country obligations apply",
        body: "Consignments above the €150 IOSS ceiling do not qualify for the scheme. Each EU country has its own import VAT rules for those consignments. Without IOSS or a country-specific registration, the buyer pays import VAT at the border, which affects conversion rates and customer experience for EU sales.",
      },
      {
        title: "Northern Ireland has different rules under the Windsor Framework",
        body: "Northern Ireland remains in the EU VAT area for goods. NI sellers can use EU OSS for distance sales to EU consumers above <a href=\"https://www.gov.uk/guidance/check-how-to-report-and-pay-vat-on-distance-sales-of-goods-from-northern-ireland-to-the-eu\">£8,818 (€10,000) a year</a>. NI sellers and GB sellers with NI operations need to understand which rules apply to which sales.",
      },
    ],
    howWeHelp: [
      {
        title: "EU VAT obligation assessment for your specific selling pattern",
        body: "We assess your EU customer volumes, consignment values and fulfilment model to identify the correct EU VAT approach: IOSS via an intermediary, OSS for NI sellers, country-by-country registration or a hybrid approach.",
      },
      {
        title: "IOSS intermediary coordination and registration",
        body: "We coordinate IOSS registration with an EU-established intermediary for GB sellers with eligible consignment volumes, and advise on the ongoing compliance and reporting obligations.",
      },
      {
        title: "Ongoing EU VAT compliance support",
        body: "We support ongoing EU VAT compliance including IOSS return data, advice on country-specific threshold changes and the VAT implications of changes to your EU fulfilment model.",
      },
    ],
    faqs: [
      {
        question: "Do I need to register for VAT in EU countries to sell to EU customers?",
        answer: "It depends on your consignment values and fulfilment model. For low-value B2C consignments shipped from outside the EU to EU consumers, IOSS registration (via an EU intermediary for GB sellers) allows you to account for destination-country VAT in a single monthly return. IOSS covers consignments up to €150 in intrinsic value; see <a href=\"/vat/ioss-vs-oss\">/vat/ioss-vs-oss</a> for the detail. Above that ceiling, country-specific obligations apply. If you store goods in an EU country, you have a registration obligation there regardless.",
      },
      {
        question: "What is IOSS and do I need it?",
        answer: "IOSS (Import One Stop Shop) is an EU scheme allowing sellers to account for destination-country VAT on eligible low-value B2C consignments through a single EU registration and monthly return, for consignments up to €150 in intrinsic value; <a href=\"/vat/ioss-vs-oss\">/vat/ioss-vs-oss</a> covers the detail. GB sellers must use an EU-established fiscal intermediary to register. IOSS is optional but simplifies EU compliance for sellers with significant low-value EU customer volumes. Without IOSS, each sale may require separate country treatment.",
      },
    ],
  },
  {
    slug: "hmrc-letter-online-sales",
    title: "HMRC Letter About Online Sales",
    headline: "Help responding to an HMRC letter about your online selling income",
    metaTitle: "HMRC Letter About Online Sales UK | Platform Reporting Response",
    metaDescription: "Specialist help responding to HMRC letters about eBay, Vinted, Amazon and Etsy sales. Platform reporting rules, trading status assessment and voluntary disclosure.",
    intro: "<a href=\"https://www.gov.uk/guidance/reporting-rules-for-digital-platforms\">From 1 January 2024, digital platforms are required to report seller data directly to HMRC</a> under the OECD model reporting rules, with first reports submitted in January 2025. HMRC uses this data to check against self-assessment records and issue nudge letters or formal compliance checks to sellers whose reported income does not match the platform data. If you have received a letter, we can help you understand what it means, assess your actual tax position and respond in a way that resolves the matter.",
    stats: [
      { value: "From Jan 2024", label: "Platform reporting rules took effect; platforms report seller data to HMRC covering the 2024 period, with annual reports due each 31 January" },
      { value: "Not a tax threshold", label: "The platform-reporting exclusion (below 30 sales and approx £1,700) determines whether the platform reports you, not whether you owe tax" },
      { value: "5 October", label: "Self Assessment registration deadline following the end of the tax year in which taxable selling income first arose" },
    ],
    challenges: [
      {
        title: "Understanding what the HMRC letter is actually saying",
        body: "HMRC's platform-reporting letters come in several forms: nudge letters suggesting you check your self-assessment return, letters asking you to explain discrepancies, and formal compliance checks. The right response depends on which type you have received. Most are nudge letters that can be resolved by submitting or amending a return. Ignoring them or responding incorrectly escalates the matter. <a href=\"https://www.gov.uk/guidance/reporting-rules-for-digital-platforms\">Platform reporting has applied from 1 January 2024</a>, with the first reports covering 2024 submitted in January 2025.",
      },
      {
        title: "Establishing whether your selling is trading income",
        body: "Not all online selling is taxable trading income. Occasional sales of personal possessions are generally not trading. Regular buying and reselling, or volume casual selling, typically is. The boundary is a badges-of-trade question (profit-seeking motive, frequency of transactions, nature of the asset, how goods were acquired), not a sales-count question. <a href=\"https://www.gov.uk/guidance/reporting-rules-for-digital-platforms\">The platform-reporting exclusion</a> (fewer than 30 sales and approximately £1,700 in the period) determines whether the platform reports you, not whether you owe tax. HMRC's letter may require you to confirm your trading status.",
      },
      {
        title: "Calculating unreported income for prior years",
        body: "If you have trading income from marketplace selling that has not been reported on self-assessment returns, voluntary disclosure allows you to correct this before HMRC opens a formal enquiry. The penalty regime for unprompted disclosure is more favourable than for prompted disclosure after an enquiry opens. <a href=\"https://www.gov.uk/guidance/tax-free-allowances-on-property-and-trading-income\">The £1,000 trading allowance</a> can reduce the taxable amount where gross trading income is above the allowance, or mean no tax where income is £1,000 or below.",
      },
      {
        title: "Records to support your response",
        body: "A credible response to an HMRC letter requires records: platform sales data, costs including stock purchases and selling fees, and evidence of the nature of items sold. Platforms generally provide order histories and payout summaries; we help you structure these into a response that HMRC can follow.",
      },
    ],
    howWeHelp: [
      {
        title: "Assess your actual tax position before responding",
        body: "We review your platform sales history, assess whether your activity constitutes trading, calculate the correct income and expenses, and identify any gap between what HMRC holds and what you have reported.",
      },
      {
        title: "Prepare and submit your response or voluntary disclosure",
        body: "We draft your response to the HMRC letter, amend your self-assessment return where needed, or prepare a voluntary disclosure to correct historic gaps in a way that minimises penalties.",
      },
      {
        title: "Set up ongoing tax compliance for your selling",
        body: "Once the immediate matter is resolved, we set up self-assessment registration, bookkeeping and annual returns so your online selling is properly reported going forward. The <a href=\"https://www.gov.uk/register-for-self-assessment\">self-assessment registration deadline is 5 October</a> following the end of the tax year in which the income arose; missing it can trigger a failure-to-notify penalty.",
      },
    ],
    faqs: [
      {
        question: "I received a letter from HMRC about my eBay or Vinted sales. Do I owe tax?",
        answer: "Not necessarily, but you need to check. HMRC's letter is generated from platform data and does not mean HMRC has concluded you owe tax. It is asking you to confirm that your self-assessment returns correctly reflect your online selling income. If your selling is occasional personal sales of possessions, that is generally not taxable. If it is a trading activity, income above the trading allowance and applicable tax thresholds is taxable.",
      },
      {
        question: "What is the platform-reporting exclusion and does it mean I am tax-free?",
        answer: "The platform-reporting exclusion (fewer than 30 sales and under approximately £1,700 in the reporting period) determines whether the platform reports your data to HMRC, not whether you owe tax. Sellers below the exclusion threshold who have taxable trading income still owe that tax. The exclusion is a data-reporting rule, not a tax exemption.",
      },
      {
        question: "Should I respond to an HMRC nudge letter?",
        answer: "Yes. Ignoring HMRC nudge letters does not make them go away. The next step after a nudge is typically a formal compliance check, which carries higher potential penalties. If your returns are correct, the response is a confirmation. If there are gaps, voluntary disclosure before a formal check is opened attracts lower penalties than disclosure during an enquiry.",
      },
    ],
  },
];

export function getService(slug: string): EcommerceService | undefined {
  return ecommerceServices.find((s) => s.slug === slug);
}
