export interface SellerHub {
  slug: string; title: string; headline: string; metaTitle: string; metaDescription: string;
  intro: string; stats: Array<{ value: string; label: string }>;
  challenges: Array<{ title: string; body: string }>;
  howWeHelp: Array<{ title: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

export const sellerHubs: SellerHub[] = [
  {
    slug: "amazon-sellers",
    title: "Amazon Sellers",
    headline: "Accounts and tax for UK Amazon FBA and FBM sellers",
    metaTitle: "Amazon FBA Accountants UK | FBA and FBM Tax",
    metaDescription: "Specialist accountants for UK Amazon FBA and FBM sellers. Settlement reconciliation, reverse-charge fee VAT, pan-EU compliance and seller tax returns.",
    intro: `Amazon sellers carry accounting complexity that general accountants rarely encounter: settlement payouts mix gross sales, FBA fees, referral fees, advertising costs and reimbursements into a single net deposit that bears no direct relation to taxable revenue. <a href="/vat/vat-on-marketplace-fees">VAT on Amazon's fees</a> follows reverse-charge rules under <a href="https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a">Notice 741A</a>, and that fee value counts toward the <a href="https://www.gov.uk/vat-registration">£90,000 VAT registration threshold</a>. Pan-EU FBA stock creates multi-jurisdiction registration questions the UK return does not resolve. We work with FBA and FBM sellers on the full picture: settlement reconciliation, <a href="/services/ecommerce-vat-compliance">VAT compliance</a>, <a href="/services/selling-into-the-eu">pan-EU obligations</a> and annual accounts.`,
    stats: [
      { value: "£90,000", label: "VAT registration threshold based on gross sales (not your Amazon payout net of fees). Source: gov.uk/vat-registration" },
      { value: "Reverse charge", label: "Amazon marketplace and advertising fees billed from abroad are reverse-charge services under Notice 741A; the fee value counts toward your £90k threshold" },
      { value: "No UK threshold", label: "Non-UK-established sellers on Amazon have no VAT registration threshold; the marketplace accounts for UK VAT on their behalf as deemed supplier" },
    ],
    challenges: [
      {
        title: "Settlement reports do not equal taxable revenue",
        body: `Amazon settles fortnightly with a net payout that mixes gross sales, FBA fulfilment fees, referral fees, advertising costs, reimbursements and loan repayments. Reconciling this back to the VAT-inclusive gross sales figure your VAT return requires, and the cost-of-goods figure your income tax return requires, is the core bookkeeping challenge for Amazon sellers. See our <a href="/services/settlement-payout-reconciliation">settlement reconciliation service</a> and the <a href="/research/online-seller-index">Online Seller Index</a> for the most common reconciliation gaps we find.`,
      },
      {
        title: "VAT on Amazon fees: the reverse-charge principle",
        body: `Where Amazon's marketplace and advertising fees are billed from an overseas entity, they are reverse-charge services under <a href="https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a">HMRC Notice 741A</a>. You self-account for UK VAT on those fees on your own VAT return. Critically, the value of those reverse-charge services counts toward your <a href="https://www.gov.uk/vat-registration">£90,000 registration threshold</a>, so a seller buying large volumes of Amazon advertising can hit registration obligations before their gross product sales reach £90,000. Details at <a href="/vat/vat-on-marketplace-fees">/vat/vat-on-marketplace-fees</a>.`,
      },
      {
        title: "Pan-EU FBA stock and multi-jurisdiction VAT",
        body: `FBA inventory distributed across Amazon's European fulfilment network creates potential VAT registration obligations in each country where stock is held. The EU OSS scheme does not cover goods already stored in an EU member state. UK sellers using pan-EU distribution need a registration strategy, not an assumption that UK VAT registration covers everything. Route to <a href="/services/selling-into-the-eu">Selling into the EU</a> and <a href="/vat/ioss-vs-oss">/vat/ioss-vs-oss</a> for cross-border scheme options; <a href="/vat/deemed-supplier-establishment">/vat/deemed-supplier-establishment</a> covers how <a href="https://www.gov.uk/guidance/vat-and-overseas-goods-sold-to-customers-in-the-uk-using-online-marketplaces">establishment status</a> changes the VAT picture.`,
      },
      {
        title: "COGS and inventory accounting for accurate profit figures",
        body: `Amazon sellers with significant stock positions frequently find that profit in their accounts does not match their bank balance. The gap is usually unrecognised cost of goods sold, prepaid inventory, or FBA fees netted from payouts rather than recognised as expenses. Under <a href="https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim33115">BIM33115</a>, closing stock is valued at the lower of cost and net realisable value. Accruals-basis accounts with a proper stock valuation give a reliable profit figure for tax planning. You can also use <a href="/vat/postponed-vat-margin-scheme">postponed VAT accounting</a> on stock imports to avoid a border VAT cash outflow. See also <a href="/blog/bookkeeping-and-inventory/cogs-inventory-basics">COGS and inventory basics</a>.`,
      },
    ],
    howWeHelp: [
      {
        title: "Settlement reconciliation and bookkeeping",
        body: `We reconcile Amazon settlement reports back to gross sales, separate fee categories and produce monthly accounts showing true trading profit rather than net payout. This feeds your VAT return, income tax return and management reporting. Details at <a href="/services/settlement-payout-reconciliation">settlement and payout reconciliation</a>.`,
      },
      {
        title: "VAT compliance and pan-EU registration strategy",
        body: `We handle UK VAT returns for Amazon sellers, advise on the reverse-charge treatment for marketplace and advertising fees under <a href="https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a">Notice 741A</a>, and assess pan-EU registration obligations for FBA sellers distributing stock across multiple countries. Route to <a href="/services/ecommerce-vat-compliance">ecommerce VAT compliance</a> and <a href="/services/selling-into-the-eu">selling into the EU</a>.`,
      },
      {
        title: "Annual accounts and tax returns for seller businesses",
        body: `We prepare sole-trader <a href="https://www.gov.uk/register-for-self-assessment">Self Assessment</a> returns and limited company accounts for Amazon selling businesses, with COGS and inventory properly recognised and owner extraction structured against current rates. Use our <a href="/calculators/sole-trader-vs-ltd-sellers">sole trader vs limited company calculator</a> and <a href="/calculators/seller-take-home">seller take-home calculator</a> to model the options. Generic incorporation and salary/dividend mechanics: <a href="https://hollowaydavies.co.uk">hollowaydavies.co.uk</a>.`,
      },
    ],
    faqs: [
      {
        question: "Do I pay VAT on Amazon's FBA and advertising fees?",
        answer: `Where Amazon's fees are billed from an overseas entity, they are reverse-charge services under <a href="https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a">Notice 741A</a>: you self-account for UK VAT on your own VAT return. The value of those fees also counts toward your <a href="https://www.gov.uk/vat-registration">£90,000 registration threshold</a>. Sellers not registered for VAT cannot reclaim the input VAT. See <a href="/vat/vat-on-marketplace-fees">/vat/vat-on-marketplace-fees</a> for the full analysis.`,
      },
      {
        question: "How do I work out my taxable revenue from Amazon settlement reports?",
        answer: `Settlement payouts are net figures after fees, advertising and reimbursements. Taxable revenue for VAT and income tax purposes is the gross selling price before Amazon deducts anything. You need to reconcile each settlement report back to gross sales, then account for fees as separate business expenses. See <a href="/blog/vat-and-cross-border-selling/vat-threshold-gross-vs-payout">VAT threshold: gross vs payout</a> and our <a href="/services/settlement-payout-reconciliation">settlement reconciliation service</a>.`,
      },
      {
        question: "Is my VAT threshold based on gross Amazon sales or my payout?",
        answer: `<a href="https://www.gov.uk/vat-registration">VAT registration</a> is compulsory once taxable turnover exceeds £90,000 in any rolling 12-month period. For Amazon sellers "turnover" is gross sales (the price the customer paid), not the net payout after Amazon deducts its fees. Watching your bank deposits to track your VAT threshold will systematically under-count. Use our <a href="/calculators/vat-threshold-tracker">VAT threshold tracker</a>.`,
      },
      {
        question: "Do I need to register for VAT in EU countries if I use FBA pan-EU?",
        answer: `Potentially yes. If Amazon stores your inventory in an EU country's fulfilment centre, you may have a VAT registration obligation in that country. The EU OSS scheme covers distance sales but not goods already held in EU stock locations. See <a href="/services/selling-into-the-eu">Selling into the EU</a> and <a href="/vat/ioss-vs-oss">/vat/ioss-vs-oss</a>. <a href="https://www.gov.uk/guidance/vat-and-overseas-goods-sold-to-customers-in-the-uk-using-online-marketplaces">Non-UK-established sellers</a> have no UK VAT registration threshold; the marketplace accounts for UK VAT on their behalf.`,
      },
      {
        question: "Can I use postponed VAT accounting on stock I import for FBA?",
        answer: `Yes. <a href="https://www.gov.uk/guidance/check-when-you-can-account-for-import-vat-on-your-vat-return">Postponed VAT accounting</a> lets a VAT-registered importer account for import VAT on the same VAT return rather than paying it at the border and reclaiming later. For FBA sellers importing stock this removes a border VAT cash outflow and is the standard approach. See <a href="/vat/postponed-vat-margin-scheme">/vat/postponed-vat-margin-scheme</a>.`,
      },
      {
        question: "Can HMRC see my Amazon sales?",
        answer: `Yes. <a href="https://www.gov.uk/guidance/reporting-rules-for-digital-platforms">Digital platform reporting rules</a> took effect from 1 January 2024, with first reports covering 2024 due in January 2025. Amazon and other platforms report seller income directly to HMRC. The assumption that marketplace sales are invisible to HMRC is no longer valid. See <a href="/blog/platform-reporting-and-hmrc-letters/platform-reporting-rules">platform reporting explained</a> and our <a href="/services/hmrc-letter-online-sales">HMRC letter response service</a>.`,
      },
    ],
  },
  {
    slug: "shopify-sellers",
    title: "Shopify Sellers",
    headline: "Accounts and tax for UK Shopify store owners",
    metaTitle: "Shopify Accountants UK | DTC Store Tax and VAT",
    metaDescription: "Specialist accountants for UK Shopify store owners. Payout reconciliation, multi-gateway VAT, cross-border compliance and annual accounts for DTC businesses.",
    intro: `Running a Shopify store means receiving payments through Shopify Payments, PayPal, Stripe, Klarna and other gateways, each settling on a different schedule and netting fees differently. Bookkeeping that works from bank deposits rather than gross order values will misstate both revenue and <a href="https://www.gov.uk/vat-registration">VAT turnover</a>. On your own Shopify store you account for your own VAT; unlike sellers on third-party marketplaces, there is no deemed-supplier mechanism shifting that liability to the platform. We work with Shopify sellers on <a href="/services/settlement-payout-reconciliation">payout reconciliation</a>, <a href="/services/ecommerce-vat-compliance">VAT compliance</a> and accounts that reflect the actual trading position.`,
    stats: [
      { value: "£90,000", label: "VAT registration threshold on gross sales (not net gateway payouts). On your own Shopify store, you account for your own VAT. Source: gov.uk/vat-registration" },
      { value: "Reverse charge", label: "Gateway and app fees billed from overseas (Stripe, PayPal, Shopify app developers) are reverse-charge services under Notice 741A; the value counts toward your £90k threshold" },
      { value: "DTC distinction", label: "Unlike marketplace-seller deemed-supply, on a Shopify own-store the seller is always responsible for VAT. See /vat/deemed-supplier-establishment for the contrast" },
    ],
    challenges: [
      {
        title: "Your Shopify payout is not your revenue",
        body: `Shopify Payments, PayPal, Klarna and Stripe each settle net of transaction fees on their own schedule. A single week's orders may arrive as three or four deposits at different times, each after a different fee deduction. Reconciling all gateway payouts back to gross order revenue, with returns and chargebacks matched to the correct period, is the foundation of accurate Shopify bookkeeping. Working from bank statements alone understates gross income and produces an incorrect VAT figure. See our <a href="/services/settlement-payout-reconciliation">settlement and payout reconciliation service</a>.`,
      },
      {
        title: "VAT on gateway and app fees from overseas",
        body: `Stripe, PayPal, Shopify's US-billed app fees and Google/Meta advertising fees are services supplied from overseas. Under <a href="https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a">Notice 741A</a> you self-account for UK VAT on those fees through the reverse charge on your own VAT return, and that fee value counts toward your <a href="https://www.gov.uk/vat-registration">£90,000 registration threshold</a>. A Shopify seller buying significant volumes of overseas-billed services can hit registration obligations earlier than expected. See <a href="/vat/vat-on-marketplace-fees">/vat/vat-on-marketplace-fees</a> for the full gateway-fee VAT analysis.`,
      },
      {
        title: "You account for your own VAT on your Shopify store",
        body: `On a Shopify own-store, you are always the seller responsible for UK VAT. This is the key distinction from selling on Amazon or eBay, where <a href="https://www.gov.uk/guidance/vat-and-overseas-goods-sold-to-customers-in-the-uk-using-online-marketplaces">the marketplace can be the deemed supplier</a> for non-UK-established sellers. On your own store there is no platform to shift VAT liability to; your <a href="https://www.gov.uk/vat-registration">£90,000 threshold</a> is on gross sales, and you submit your own VAT returns. See <a href="/vat/deemed-supplier-establishment">/vat/deemed-supplier-establishment</a> for the full contrast with marketplace-seller treatment.`,
      },
      {
        title: "Inventory, COGS and structure as the business scales",
        body: `Shopify sellers buying stock for resale need accruals-basis accounts with a proper cost-of-goods-sold figure. Under <a href="https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim33115">BIM33115</a>, closing stock is valued at the lower of cost and net realisable value. Cash-basis accounting that expenses stock when purchased, regardless of when sold, produces a misleading profit figure. As revenue grows, many Shopify sellers consider incorporation; the decision affects income tax, National Insurance and owner extraction. For EU cross-border sales, see <a href="/services/selling-into-the-eu">Selling into the EU</a> and <a href="/vat/135-import-rule">/vat/135-import-rule</a> for low-value direct consignments. Generic incorporation mechanics at <a href="https://hollowaydavies.co.uk">hollowaydavies.co.uk</a>.`,
      },
    ],
    howWeHelp: [
      {
        title: "Payout reconciliation and monthly bookkeeping",
        body: `We reconcile Shopify Payments, PayPal, Stripe and other gateway settlements back to gross order values, account for returns and chargebacks in the correct period, and produce monthly accounts that reflect true trading revenue. This feeds your <a href="/services/ecommerce-vat-compliance">VAT return</a> and income tax position. Details at <a href="/services/settlement-payout-reconciliation">settlement and payout reconciliation</a>.`,
      },
      {
        title: "VAT compliance for UK and cross-border sales",
        body: `We handle UK VAT returns for Shopify sellers, advise on the reverse-charge treatment for gateway and overseas app fees under <a href="https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a">Notice 741A</a>, and assess whether IOSS or OSS registration is appropriate for your EU customer volumes. For low-value direct consignments, see <a href="/vat/135-import-rule">/vat/135-import-rule</a> and <a href="/vat/ioss-vs-oss">/vat/ioss-vs-oss</a>.`,
      },
      {
        title: "Annual accounts and tax returns",
        body: `We prepare sole-trader Self Assessment returns and limited company accounts for Shopify businesses, with stock and COGS properly recognised. Use our <a href="/calculators/sole-trader-vs-ltd-sellers">sole trader vs limited company calculator</a> and <a href="/calculators/seller-take-home">seller take-home calculator</a> to model extraction options. See also <a href="/blog/business-structure-and-tax/sole-trader-vs-ltd-online-sellers">sole trader vs limited company for online sellers</a>. Generic salary/dividend and MTD ITSA mechanics at <a href="https://hollowaydavies.co.uk">hollowaydavies.co.uk</a>.`,
      },
    ],
    faqs: [
      {
        question: "Does Shopify account for VAT on my sales, or do I?",
        answer: `On your own Shopify store, you account for your own VAT. Unlike non-UK-established sellers on third-party marketplaces (where the <a href="https://www.gov.uk/guidance/vat-and-overseas-goods-sold-to-customers-in-the-uk-using-online-marketplaces">marketplace can be the deemed supplier</a>), there is no platform to absorb your VAT liability on a DTC own-store. You must register once your taxable turnover (gross sales) exceeds <a href="https://www.gov.uk/vat-registration">£90,000</a> and submit your own returns. See <a href="/vat/deemed-supplier-establishment">/vat/deemed-supplier-establishment</a>.`,
      },
      {
        question: "How do I reconcile Shopify payouts for my accounts?",
        answer: `Shopify Payments and other gateways settle net of fees on their own schedule. For accurate accounts and VAT returns, match each payout back to the gross order values it covers, account for returns and refunds in the period processed, and record gateway fees separately as business expenses. See our <a href="/services/settlement-payout-reconciliation">settlement reconciliation service</a> and <a href="/blog/vat-and-cross-border-selling/vat-threshold-gross-vs-payout">VAT threshold: gross vs payout</a>.`,
      },
      {
        question: "Do I pay VAT on Shopify, PayPal and Stripe fees?",
        answer: `Where those fees are billed from an overseas entity, they are reverse-charge services under <a href="https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a">Notice 741A</a>: you self-account for UK VAT on your own return, and the fee value counts toward your £90,000 registration threshold. See <a href="/vat/vat-on-marketplace-fees">/vat/vat-on-marketplace-fees</a>.`,
      },
      {
        question: "Can HMRC see my Shopify sales?",
        answer: `Where Shopify Payments or other platforms fall under <a href="https://www.gov.uk/guidance/reporting-rules-for-digital-platforms">digital platform reporting rules</a> (in force from 1 January 2024, first reports due January 2025), HMRC may receive data about your seller income. Regardless of whether your specific gateway reports you, your obligation to register for Self Assessment and VAT (where applicable) exists independently of what platforms report. See <a href="/blog/platform-reporting-and-hmrc-letters/platform-reporting-rules">platform reporting explained</a>.`,
      },
    ],
  },
  {
    slug: "marketplace-sellers",
    title: "Marketplace Sellers",
    headline: "Tax and accounts for eBay, Etsy, Vinted and TikTok Shop sellers",
    metaTitle: "eBay Etsy Vinted TikTok Shop Accountants UK",
    metaDescription: "Specialist accountants for UK marketplace sellers on eBay, Etsy, Vinted and TikTok Shop. Platform reporting, HMRC letters, trading status and VAT.",
    intro: `Selling on eBay, Etsy, Vinted or TikTok Shop brings tax questions that occasional personal selling does not. <a href="https://www.gov.uk/guidance/reporting-rules-for-digital-platforms">Platform reporting rules introduced from 1 January 2024</a> mean HMRC now receives data directly from digital marketplaces about seller volumes and payouts. The platform-reporting exclusion (fewer than 30 sales and approximately £1,700 in the period) determines whether the platform reports you; it does not determine whether you owe tax. Sellers who have received an HMRC letter about their online sales, or who are approaching thresholds where obligations change, need a clear picture of trading status, VAT position and what they owe. We cover eBay, Etsy, Vinted and TikTok Shop sellers, including the <a href="/services/hmrc-letter-online-sales">HMRC letter response</a> path and the decluttering-vs-trading question.`,
    stats: [
      { value: "1 Jan 2024", label: "Date platform reporting rules (OECD model) came into force; first reports covering 2024 were due from platforms in January 2025. Source: gov.uk/guidance/reporting-rules-for-digital-platforms" },
      { value: "Fewer than 30 sales AND approx £1,700", label: "Report-exclusion trigger for goods sellers. This is NOT a tax-free allowance; it only determines whether the platform reports you to HMRC" },
      { value: "£1,000", label: "Trading allowance: gross trading income at or below this level needs no Self Assessment return. Above it, the allowance can replace actual expenses (usually the worse swap for sellers with real COGS). Source: gov.uk guidance" },
    ],
    challenges: [
      {
        title: "Platform reporting is not a tax threshold",
        body: `From 1 January 2024, <a href="https://www.gov.uk/guidance/reporting-rules-for-digital-platforms">digital platforms including eBay, Etsy, Vinted and Amazon must report seller income to HMRC</a>, with first reports covering the 2024 period due in January 2025. The reporting exclusion (fewer than 30 sales and approximately £1,700 in the period) determines whether the platform reports you, not whether you owe tax. Tax liability follows trading status and income levels, not the platform-report trigger. Both directions of confusion are common: panic below the trigger, complacency above it. See <a href="/blog/platform-reporting-and-hmrc-letters/platform-reporting-rules">platform reporting rules explained</a> and our <a href="/services/hmrc-letter-online-sales">HMRC letter response service</a>.`,
      },
      {
        title: "Decluttering vs trading: the badges-of-trade question",
        body: `Selling personal possessions you no longer want on Vinted, eBay or Depop is generally not trading; buying or making goods to sell at a profit generally is. The distinction turns on HMRC's badges of trade (profit motive, frequency, nature of the asset, how goods were acquired), not on any sales count or platform-report trigger. This is the question HMRC will ask if your volumes are significant, and the answer is fact-specific. See <a href="/blog/making-tax-digital-and-self-assessment/trading-allowance-online-sellers">the trading allowance and trading status</a> for the full analysis. The <a href="https://www.gov.uk/register-for-self-assessment">Self Assessment notification deadline</a> is 5 October following the end of the tax year in which the income arose.`,
      },
      {
        title: "The £1,000 trading allowance: when it helps and when it hurts",
        body: `<a href="https://www.gov.uk/guidance/tax-free-allowances-on-property-and-trading-income">The £1,000 trading allowance</a> covers gross trading income at or below £1,000 per year (no return required). Above that, you can either deduct the £1,000 allowance instead of actual expenses, or deduct actual expenses, but not both. For sellers with real cost of goods sold, stock purchases, packaging and postage, using the allowance instead of actual costs is almost always the worse choice. Above <a href="https://www.gov.uk/vat-registration">£90,000 gross taxable sales</a> in a rolling 12-month period, VAT registration is compulsory regardless of the trading allowance. See <a href="/calculators/vat-threshold-tracker">VAT threshold tracker</a>.`,
      },
      {
        title: "VAT for marketplace sellers: deemed supplier, gross threshold, fee reverse charge",
        body: `Marketplace sellers whose taxable turnover exceeds <a href="https://www.gov.uk/vat-registration">£90,000</a> in any rolling 12-month period must register for VAT. Turnover is gross selling price, not net payout after fees. For overseas-established sellers, <a href="https://www.gov.uk/guidance/vat-and-overseas-goods-sold-to-customers-in-the-uk-using-online-marketplaces">the marketplace is the deemed supplier</a> and accounts for UK VAT on their behalf; UK-established sellers remain liable themselves. Marketplace and advertising fees billed from abroad are reverse-charge services under <a href="https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a">Notice 741A</a>; that fee value counts toward the threshold. See <a href="/vat/deemed-supplier-establishment">/vat/deemed-supplier-establishment</a> and <a href="/vat/vat-on-marketplace-fees">/vat/vat-on-marketplace-fees</a>.`,
      },
    ],
    howWeHelp: [
      {
        title: "Trading status assessment and tax position",
        body: `We assess whether your marketplace selling constitutes a trading activity, quantify income and expenses correctly under the <a href="https://www.gov.uk/guidance/tax-free-allowances-on-property-and-trading-income">trading allowance</a> rules, and prepare Self Assessment returns or advise on voluntary disclosure where there are historic gaps. The <a href="https://www.gov.uk/register-for-self-assessment">5 October notification deadline</a> applies if you become newly chargeable to tax.`,
      },
      {
        title: "HMRC platform-reporting letter response",
        body: `We help sellers understand what HMRC's letter is actually asking, calculate the correct tax position based on what <a href="https://www.gov.uk/guidance/reporting-rules-for-digital-platforms">platform reporting</a> has disclosed, and respond in a way that closes the matter. See <a href="/services/hmrc-letter-online-sales">HMRC letter response service</a> and <a href="/blog/platform-reporting-and-hmrc-letters/platform-reporting-rules">platform reporting explained</a>.`,
      },
      {
        title: "VAT registration and ongoing compliance",
        body: `We assess <a href="https://www.gov.uk/vat-registration">VAT registration obligations</a> for marketplace sellers (gross sales threshold, not net payout), advise on registration timing, and handle ongoing VAT returns for registered sellers. See <a href="/services/ecommerce-vat-compliance">ecommerce VAT compliance</a>, <a href="/vat/deemed-supplier-establishment">/vat/deemed-supplier-establishment</a> and <a href="/calculators/vat-threshold-tracker">VAT threshold tracker</a>.`,
      },
    ],
    faqs: [
      {
        question: "Can HMRC see my eBay, Etsy, Vinted and TikTok Shop sales?",
        answer: `Yes. <a href="https://www.gov.uk/guidance/reporting-rules-for-digital-platforms">Platform reporting rules</a> took effect from 1 January 2024; digital marketplaces including eBay, Etsy, Vinted and Amazon must report seller income to HMRC, with first reports for the 2024 period due January 2025. The reporting exclusion (fewer than 30 sales and approximately £1,700) determines whether the platform reports you, not whether you owe tax. See <a href="/blog/platform-reporting-and-hmrc-letters/platform-reporting-rules">platform reporting rules explained</a>.`,
      },
      {
        question: "I received a letter from HMRC about my eBay or Vinted sales. What does it mean?",
        answer: `HMRC receives data from digital platforms under <a href="https://www.gov.uk/guidance/reporting-rules-for-digital-platforms">reporting rules in force since January 2024</a>. The letter is typically a nudge to check whether you have correctly reported your marketplace income on your Self Assessment return. If you have unreported trading income, voluntary disclosure is better than waiting for a formal enquiry. See our <a href="/services/hmrc-letter-online-sales">HMRC letter response service</a>.`,
      },
      {
        question: "Is the 30-sales and approximately £1,700 platform-report trigger a tax-free allowance?",
        answer: `No. The reporting exclusion determines whether your platform reports you to HMRC. It has no effect on your tax liability. Tax obligations depend on whether your selling is a trading activity and whether your income exceeds the <a href="https://www.gov.uk/guidance/tax-free-allowances-on-property-and-trading-income">£1,000 trading allowance</a> or <a href="https://www.gov.uk/vat-registration">£90,000 VAT registration threshold</a>. See <a href="/blog/making-tax-digital-and-self-assessment/trading-allowance-online-sellers">trading allowance explained</a>.`,
      },
      {
        question: "Am I trading, or just selling my old things on Vinted?",
        answer: `The distinction is a badges-of-trade question, not a sales count. Selling personal possessions you no longer want is generally not trading; buying goods to sell at a profit generally is. HMRC looks at profit motive, frequency of transactions, the nature of the asset and how the goods were acquired. The answer is fact-specific. See <a href="/blog/making-tax-digital-and-self-assessment/trading-allowance-online-sellers">trading allowance and trading status</a>.`,
      },
      {
        question: "Is my VAT threshold based on gross sales or my marketplace payout?",
        answer: `<a href="https://www.gov.uk/vat-registration">VAT registration</a> is compulsory once taxable turnover exceeds £90,000 in any rolling 12-month period. "Turnover" is gross selling price (the amount your buyer paid), not the net payout after the platform deducts its fees. Use our <a href="/calculators/vat-threshold-tracker">VAT threshold tracker</a> and see <a href="/blog/vat-and-cross-border-selling/vat-threshold-gross-vs-payout">VAT threshold: gross vs payout</a>.`,
      },
    ],
  },
  {
    slug: "dropshippers",
    title: "Dropshippers",
    headline: "Tax and VAT for UK dropshipping businesses",
    metaTitle: "Accountants for Dropshippers UK | £135 Rule and VAT",
    metaDescription: "Specialist accountants for UK dropshippers. The £135 import rule, VAT at point of sale, ad-spend reverse charge and accounts for dropshipping businesses.",
    intro: `Dropshipping to UK customers from overseas suppliers sits under specific VAT rules that catch many sellers who set up before those rules applied. The <a href="https://www.gov.uk/guidance/vat-and-overseas-goods-sold-directly-to-customers-in-the-uk">£135 consignment rule</a> means that for low-value goods shipped direct from an overseas supplier to a UK consumer, VAT is due at the point of sale (not at the border as import VAT), and where you sell through your own website rather than a marketplace, you account for that VAT yourself. Your Facebook, Google and TikTok advertising fees billed from abroad are also <a href="https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a">reverse-charge services</a> whose value counts toward the <a href="https://www.gov.uk/vat-registration">£90,000 VAT registration threshold</a>. We cover <a href="/services/ecommerce-vat-compliance">VAT compliance</a>, import obligations and annual accounts for dropshipping businesses.`,
    stats: [
      { value: "£135", label: "Consignment value threshold: below this, VAT on direct-to-consumer imports is due at the point of sale, not at the border. Source: gov.uk/guidance/vat-and-overseas-goods-sold-directly-to-customers-in-the-uk" },
      { value: "£90,000", label: "VAT registration threshold on gross sales. Overseas ad and platform fees billed from abroad (reverse charge under Notice 741A) count toward this threshold" },
      { value: "Reverse charge", label: "Facebook, Google and TikTok ad fees billed from abroad are reverse-charge services; you self-account for VAT on your return and the fee value counts toward the £90k threshold" },
    ],
    challenges: [
      {
        title: "The £135 rule: who accounts for VAT on your sales",
        body: `For consignments of <a href="https://www.gov.uk/guidance/vat-and-overseas-goods-sold-directly-to-customers-in-the-uk">£135 or less sold direct to UK consumers</a>, VAT is accounted for at the point of sale rather than at the border as import VAT. If you sell through a marketplace, <a href="https://www.gov.uk/guidance/vat-and-overseas-goods-sold-to-customers-in-the-uk-using-online-marketplaces">the marketplace accounts for VAT</a> as deemed supplier. If you sell through your own website and your supplier ships direct from overseas, you are responsible for accounting for VAT on each sale from the first pound of taxable turnover (the standard <a href="https://www.gov.uk/vat-registration">£90,000 threshold</a> does not apply to direct overseas consignments under this rule). See <a href="/vat/135-import-rule">/vat/135-import-rule</a> for the full analysis.`,
      },
      {
        title: "Ad-spend VAT: your Facebook, Google and TikTok fees are reverse charge",
        body: `Advertising services bought from overseas platforms (Facebook/Meta, Google, TikTok) are reverse-charge services under <a href="https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a">Notice 741A</a>: you self-account for UK VAT on those fees on your own VAT return, and the value of those services counts toward your <a href="https://www.gov.uk/vat-registration">£90,000 registration threshold</a>. A dropshipper spending heavily on paid traffic can hit VAT registration obligations before their gross product sales reach £90,000. See <a href="/vat/vat-on-marketplace-fees">/vat/vat-on-marketplace-fees</a> and <a href="/services/ecommerce-vat-compliance">ecommerce VAT compliance</a>.`,
      },
      {
        title: "Supplier-direct imports and who the importer is",
        body: `When your supplier ships goods directly from overseas to your UK customer, the question of who is the importer (and who owes any import VAT on goods over £135) depends on who is named as importer on the customs entry and the contractual terms with your supplier. The <a href="/vat/deemed-supplier-establishment">/vat/deemed-supplier-establishment</a> page covers how establishment status affects the analysis. For consignments over £135, import VAT is due at the border (not at the point of sale); for VAT-registered businesses, <a href="https://www.gov.uk/guidance/check-when-you-can-account-for-import-vat-on-your-vat-return">postponed VAT accounting</a> can defer that cash outflow.`,
      },
      {
        title: "Margin tracking and business structure for high-volume models",
        body: `Dropshipping businesses often operate on thin margins across high order volumes. Bookkeeping that matches supplier costs to customer sales in the correct period is essential for an accurate profit figure. A business generating consistent revenue needs proper HMRC registration, a <a href="https://www.gov.uk/register-for-self-assessment">Self Assessment</a> return (or limited company accounts), and VAT registration once the threshold is approached. See our <a href="/calculators/sole-trader-vs-ltd-sellers">sole trader vs limited company calculator</a> and <a href="/blog/business-structure-and-tax/sole-trader-vs-ltd-online-sellers">sole trader vs limited company for online sellers</a>. Generic incorporation mechanics at <a href="https://hollowaydavies.co.uk">hollowaydavies.co.uk</a>.`,
      },
    ],
    howWeHelp: [
      {
        title: "VAT compliance: £135 rule, reverse charge and registration",
        body: `We assess your VAT obligations under the <a href="https://www.gov.uk/guidance/vat-and-overseas-goods-sold-directly-to-customers-in-the-uk">£135 import rule</a> for direct-to-consumer consignments, the <a href="https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a">reverse-charge treatment for overseas ad fees</a>, and whether those combined values trigger <a href="https://www.gov.uk/vat-registration">VAT registration</a>. We handle registration and ongoing VAT returns once registered. See <a href="/services/ecommerce-vat-compliance">ecommerce VAT compliance</a> and <a href="/calculators/vat-threshold-tracker">VAT threshold tracker</a>.`,
      },
      {
        title: "Bookkeeping and margin tracking",
        body: `We set up bookkeeping for dropshipping businesses that correctly matches supplier costs to customer revenue in the same period, separates ad spend by platform and tax treatment, and gives an accurate margin picture. See <a href="/blog/bookkeeping-and-inventory/cogs-inventory-basics">COGS and inventory basics</a> and <a href="/blog/bookkeeping-and-inventory/cash-vs-accruals-stock">cash vs accruals for stock businesses</a>.`,
      },
      {
        title: "Annual accounts and Self Assessment",
        body: `We prepare annual accounts and tax returns for dropshipping sole traders and limited companies, with advertising spend, supplier costs and any import VAT correctly classified. Use our <a href="/calculators/seller-take-home">seller take-home calculator</a> to model extraction. See <a href="/research/online-seller-index">Online Seller Index</a> for sector benchmarks.`,
      },
    ],
    faqs: [
      {
        question: "Do I have to charge UK VAT if I dropship low-value goods from overseas?",
        answer: `For consignments of <a href="https://www.gov.uk/guidance/vat-and-overseas-goods-sold-directly-to-customers-in-the-uk">£135 or less</a> sold direct to UK consumers from an overseas supplier, VAT is due at the point of sale. If you sell through your own website (not a marketplace), you account for that VAT yourself from the first sale, regardless of the standard <a href="https://www.gov.uk/vat-registration">£90,000 threshold</a>. If you sell through a marketplace, <a href="https://www.gov.uk/guidance/vat-and-overseas-goods-sold-to-customers-in-the-uk-using-online-marketplaces">the marketplace accounts for VAT</a> as deemed supplier. See <a href="/vat/135-import-rule">/vat/135-import-rule</a>.`,
      },
      {
        question: "Do my overseas ad fees count toward the £90,000 VAT threshold?",
        answer: `Yes. Advertising fees paid to Facebook, Google and TikTok (billed from overseas) are reverse-charge services under <a href="https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a">Notice 741A</a>. The value of those services counts toward your <a href="https://www.gov.uk/vat-registration">£90,000 VAT registration threshold</a>. A dropshipper spending heavily on paid traffic can hit registration obligations before gross product sales reach £90,000. See <a href="/vat/vat-on-marketplace-fees">/vat/vat-on-marketplace-fees</a> and <a href="/calculators/vat-threshold-tracker">VAT threshold tracker</a>.`,
      },
      {
        question: "Who is the importer when my supplier ships direct to my customer?",
        answer: `It depends on the contractual terms and who is named as importer on the customs declaration. For consignments of £135 or less, the point-of-sale VAT rule applies and import VAT does not arise separately at the border. For higher-value consignments, import VAT is due at the border; if you are the importer and are VAT-registered, <a href="https://www.gov.uk/guidance/check-when-you-can-account-for-import-vat-on-your-vat-return">postponed VAT accounting</a> can defer that cash outflow. See <a href="/vat/deemed-supplier-establishment">/vat/deemed-supplier-establishment</a>.`,
      },
      {
        question: "Can I deduct advertising costs for my dropshipping business?",
        answer: `Yes. Advertising spend on Google, Meta, TikTok and similar platforms is a deductible business expense. If you are VAT-registered, you self-account for VAT on overseas B2B advertising services through the reverse charge under <a href="https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a">Notice 741A</a>; the gross advertising cost is the deductible amount in your income tax or corporation tax calculation. That fee value also counts toward your <a href="https://www.gov.uk/vat-registration">£90,000 VAT registration threshold</a>.`,
      },
    ],
  },
];

export function getHub(slug: string): SellerHub | undefined {
  return sellerHubs.find((h) => h.slug === slug);
}
