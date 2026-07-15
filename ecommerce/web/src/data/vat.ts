export interface VatPage {
  slug: string; title: string; headline: string; metaTitle: string; metaDescription: string;
  intro: string; stats: Array<{ value: string; label: string }>;
  challenges: Array<{ title: string; body: string }>;
  howWeHelp: Array<{ title: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

export const vatPages: VatPage[] = [
  {
    slug: "deemed-supplier-establishment",
    title: "Deemed Supplier and Establishment",
    headline: "Deemed supplier rules and UK establishment status: the VAT question every marketplace seller must answer first",
    metaTitle: "Deemed Supplier VAT Rules UK | Marketplace Establishment",
    metaDescription: "Who accounts for UK VAT on your marketplace sales depends entirely on your establishment status. Understand deemed supplier rules, the UK-shell trap, and the £135 interaction.",
    intro: "Whether the marketplace accounts for UK VAT on your sales, or whether you remain liable yourself, turns on a single fact: are you UK-established or overseas-established? <a href=\"https://www.gov.uk/guidance/vat-and-overseas-goods-sold-to-customers-in-the-uk-using-online-marketplaces\">HMRC's deemed supplier rules</a> transfer the VAT obligation for overseas-established sellers to the platform. UK-established sellers on the same marketplace are entirely outside that mechanism and must account for their own VAT. Getting the answer wrong in either direction creates either a missed registration or an unnecessary compliance burden.",
    stats: [
      {
        value: "No threshold",
        label: "Overseas-established sellers on UK marketplaces have no VAT registration threshold; the marketplace accounts for UK VAT on their sales from the first pound. <a href=\"https://www.gov.uk/guidance/vat-and-overseas-goods-sold-to-customers-in-the-uk-using-online-marketplaces\">Source: HMRC marketplace guidance</a>",
      },
      {
        value: "UK-established",
        label: "UK-established sellers remain liable for their own VAT on marketplace sales; the marketplace is not the deemed supplier for their sales. <a href=\"https://www.gov.uk/guidance/vat-and-overseas-goods-sold-to-customers-in-the-uk-using-online-marketplaces\">Source: HMRC marketplace guidance</a>",
      },
      {
        value: "HMRC-challenged",
        label: "HMRC actively challenges thin UK-establishment claims by overseas businesses. A UK company registration alone is not sufficient; establishment turns on where decisions are made and where resources are located.",
      },
    ],
    challenges: [
      {
        title: "The short answer: who accounts for UK VAT depends entirely on establishment",
        body: "<p>For marketplace sales to UK customers, <a href=\"https://www.gov.uk/guidance/vat-and-overseas-goods-sold-to-customers-in-the-uk-using-online-marketplaces\">HMRC's deemed supplier rules</a> work as follows. If the seller is <strong>overseas-established</strong>, the marketplace is treated as having bought the goods from the seller and resold them to the customer; the marketplace accounts for UK VAT. If the seller is <strong>UK-established</strong>, the deemed supplier mechanism does not apply; the seller accounts for their own UK VAT as normal.</p><p>The same marketplace can have some sellers inside the mechanism and some outside it, depending on each seller's individual establishment status. The marketplace does not decide this for you.</p>",
      },
      {
        title: "What 'established' means in practice: the test that decides everything",
        body: "<p>Establishment is not the same as incorporation. A seller is <strong>UK-established</strong> if they have a business establishment or a fixed establishment in the UK: broadly, a place where business decisions are taken and where human and technical resources are present to carry on the business. Having a UK company number, a UK address on file with Amazon or a UK bank account does not by itself make you UK-established.</p><p>An overseas seller with a UK-registered company but no UK office, no UK staff and no UK decision-making is not UK-established for VAT purposes. An overseas seller who opens a UK fulfilment office and hires UK staff to manage purchasing decisions may acquire UK establishment without realising it. Establishment is a fact-specific analysis, not a bright-line rule, which is why HMRC challenges cases where a UK-incorporated shell is claimed as the business establishment without the substance behind it.</p>",
      },
      {
        title: "If you are UK-established: you remain fully liable; the marketplace does not collect for you",
        body: "<p>UK-established sellers must register for VAT once their taxable turnover reaches the registration threshold (based on <strong>gross marketplace sales</strong>, not the net payout after fees), file their own returns and account for output VAT on every sale. The marketplace does not collect UK VAT on their behalf. The marketplace may well collect VAT on your fees and on its own account, but that is a separate question from the VAT on your sales.</p><p>UK-established sellers on EU marketplaces also fall outside any EU deemed-supplier mechanism that applies to non-EU sellers. <a href=\"/services/selling-into-the-eu\">EU cross-border obligations</a> apply to UK-established sellers in their own right.</p>",
      },
      {
        title: "The 'UK shell' trap: why HMRC challenges thin establishment claims",
        body: "<p><a href=\"https://www.gov.uk/guidance/vat-and-overseas-goods-sold-to-customers-in-the-uk-using-online-marketplaces\">HMRC's guidance confirms it actively challenges</a> establishment claims where an overseas business has incorporated a UK company but lacks the substance of a genuine UK establishment. The practical risk cuts both ways. An overseas seller who incorrectly claims UK establishment loses the deemed-supplier coverage and becomes responsible for VAT the marketplace would otherwise have collected. A UK-established seller who incorrectly treats themselves as overseas-established and expects marketplace collection that is not coming faces undeclared output VAT.</p><p>Sellers whose establishment status is genuinely uncertain, or who have changed their operational setup, should treat this as a question for a tax adviser rather than a decision made on the basis of company registration alone.</p>",
      },
    ],
    howWeHelp: [
      {
        title: "Establishment status assessment",
        body: "We assess your UK and EU establishment status based on where your business decisions are made and where your human and technical resources are located, giving you a defensible answer to the question HMRC asks first.",
      },
      {
        title: "VAT registration and compliance for UK-established sellers",
        body: "We handle registration, returns and <a href=\"/services/ecommerce-vat-compliance\">ongoing VAT compliance</a> for UK-established sellers on UK and EU marketplaces, including the correct treatment of gross marketplace sales as turnover.",
      },
      {
        title: "Marketplace VAT position review",
        body: "We review how your marketplace is treating your sales from a VAT perspective, check whether deemed-supplier coverage applies to you, and identify any discrepancies between the marketplace treatment and your actual obligations. See also: <a href=\"/vat/vat-on-marketplace-fees\">VAT on marketplace fees</a> and <a href=\"/vat/135-import-rule\">the £135 import rule</a>.",
      },
    ],
    faqs: [
      {
        question: "Who pays the VAT when I sell on Amazon or eBay to a UK customer?",
        answer: "It depends on your establishment status. If you are overseas-established (not UK-established), the marketplace is the deemed supplier and accounts for UK VAT on eligible sales. If you are UK-established, the deemed supplier rules do not apply: you account for your own VAT, and the marketplace does not collect it for you. <a href=\"https://www.gov.uk/guidance/vat-and-overseas-goods-sold-to-customers-in-the-uk-using-online-marketplaces\">HMRC confirms this split</a>.",
      },
      {
        question: "Am I UK-established for VAT if my company is registered at Companies House?",
        answer: "Not necessarily. HMRC's establishment test looks at where business decisions are made and where human and technical resources are present, not at the place of incorporation. A UK-registered company without UK operations, UK staff or UK decision-making may not be UK-established for VAT purposes. HMRC actively challenges thin UK-establishment claims, and the consequences of getting this wrong cut in both directions.",
      },
      {
        question: "Does the marketplace collect VAT if I am a UK seller?",
        answer: "No. The deemed supplier mechanism applies to overseas-established sellers only. UK-established sellers are outside the mechanism entirely; they account for their own UK VAT on marketplace sales and must register once their gross taxable turnover reaches the threshold.",
      },
      {
        question: "Do overseas sellers have a UK VAT registration threshold on marketplace sales?",
        answer: "No. For overseas-established sellers whose UK sales go through a marketplace, the marketplace accounts for UK VAT from the first pound of sales. There is no registration threshold for this obligation because the VAT liability sits with the marketplace, not the seller. If an overseas seller also has direct-to-consumer sales outside a marketplace, different rules apply to those sales.",
      },
      {
        question: "Does the deemed-supplier rule apply to sales through my own website?",
        answer: "No. The deemed supplier mechanism is marketplace-only. If you sell direct to UK consumers through your own website (Shopify, WooCommerce), the marketplace deemed-supplier rules do not apply. For low-value consignments of £135 or less fulfilled from overseas, <a href=\"/vat/135-import-rule\">the £135 import rule</a> applies instead.",
      },
      {
        question: "Can HMRC challenge my UK establishment status?",
        answer: "Yes. HMRC actively challenges overseas businesses that claim UK establishment through a UK-incorporated shell without the substance of a genuine UK establishment (real decision-making, real resources in the UK). If your setup has changed or you are uncertain, get an establishment analysis before relying on deemed-supplier coverage or before assuming you are outside it.",
      },
    ],
  },
  {
    slug: "vat-on-marketplace-fees",
    title: "VAT on Marketplace Fees",
    headline: "VAT on Amazon, eBay and platform fees: reverse charge, the sub-threshold trap, and what goes on your return",
    metaTitle: "VAT on Amazon and Marketplace Fees UK | Reverse Charge",
    metaDescription: "UK VAT on Amazon, eBay and platform fees explained. Reverse charge treatment, the 2024 Amazon billing change, and why overseas fee value counts toward your £90,000 threshold.",
    intro: "Marketplace commissions, advertising spend and software subscriptions billed by overseas suppliers are <a href=\"https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a\">reverse-charge services</a>: the UK business receiving them self-accounts for UK VAT. VAT-registered sellers declare the VAT and recover it on the same return, netting to nil on the fees. Sellers not yet registered for VAT face a harder problem: the value of those reverse-charge services counts toward the £90,000 registration threshold. A seller buying significant overseas platform and advertising services can cross the threshold without ever receiving the threshold equivalent in gross sales.",
    stats: [
      {
        value: "Reverse charge",
        label: "Overseas-billed marketplace fees, advertising and software are reverse-charge services. The UK seller self-accounts for UK VAT under <a href=\"https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a\">Notice 741A</a>.",
      },
      {
        value: "Counts toward £90k",
        label: "The value of reverse-charge services counts toward the £90,000 VAT registration threshold. A sub-threshold seller with large overseas fee and ad spend may be required to register. <a href=\"https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a\">Source: Notice 741A</a>.",
      },
      {
        value: "Net nil",
        label: "For VAT-registered sellers on the standard method, the reverse charge on platform fees nets to nil on the return: the same amount is both output tax (box 1) and input tax (box 4). Flat-rate scheme sellers cannot separately recover it.",
      },
    ],
    challenges: [
      {
        title: "The short answer: overseas platform fees are reverse-charge services you self-account for",
        body: "<p>When a UK business buys marketplace, advertising or software services from a supplier established abroad, <a href=\"https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a\">Notice 741A</a> places the supply in the UK and makes the UK customer responsible for accounting for the VAT. The overseas supplier does not charge UK VAT on the invoice; the UK buyer self-accounts for it on their own VAT return.</p><p>For VAT-registered sellers on the standard method, the reverse charge creates matching entries in both box 1 (output tax) and box 4 (input tax), netting to nil where the fee is fully attributable to taxable supplies. The VAT is not a cost but it must appear on the return correctly.</p>",
      },
      {
        title: "The sub-threshold trap: reverse-charge value counts toward your £90,000 threshold",
        body: "<p><a href=\"https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a\">HMRC confirms</a> that the value of reverse-charge services is included when calculating whether a business has exceeded the £90,000 VAT registration threshold. This is the standing trap for a growing seller: their gross sales (note: <strong>gross marketplace sales, not the net payout</strong>) are below the threshold, but their overseas platform fees, advertising spend and software subscriptions push the combined taxable supply value over £90,000.</p><p>Sellers in this position must register, account for VAT on their sales and include the reverse-charge values on their return. The registration point is the moment the combined total crossed the threshold, not the moment the seller noticed. <a href=\"/blog/vat-and-cross-border-selling/vat-threshold-gross-vs-payout\">How gross sales, not payouts, count toward the threshold</a>.</p>",
      },
      {
        title: "UK-billed platform fees: when UK VAT appears on your fee invoices instead",
        body: "<p>The entity a marketplace bills its UK sellers from can and does change, and the VAT treatment follows the billing entity, not the platform's brand. Where a platform bills fees from a UK-established entity, the invoice shows UK VAT on commissions, advertising and other fee lines: for VAT-registered sellers that VAT is reclaimable as input tax on the return in the normal way (not a reverse-charge entry, because the supplier is UK-based). For sellers not registered for VAT, UK VAT on those fees is an irrecoverable cost. Where the fees are still billed from an overseas entity, the <a href=\"https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a\">reverse charge under Notice 741A</a> applies instead. Check the seller-of-record and VAT number on your current fee invoices (in Amazon Seller Central, your tax document library) to confirm which treatment applies to you today.</p>",
      },
      {
        title: "What the reverse charge looks like on your VAT return",
        body: "<p>For services billed from an overseas entity (not the UK-billed fees example above), the return entries are: the net value of the fee in <strong>box 6</strong> (total value of sales and outputs, excluding VAT) and <strong>box 7</strong> (total value of purchases and inputs, excluding VAT); the VAT amount in <strong>box 1</strong> (VAT due on sales and other outputs, including the reverse charge); the same VAT amount in <strong>box 4</strong> (VAT reclaimed on purchases). The result is net nil VAT on those fees. An omission of either box 1 or box 4 understates both output and input VAT simultaneously. See also: <a href=\"/blog/vat-and-cross-border-selling/flat-rate-scheme-wrong-for-sellers\">why the flat-rate scheme is usually wrong for goods sellers</a> (FRS forfeits this input VAT recovery).</p>",
      },
    ],
    howWeHelp: [
      {
        title: "VAT return review covering marketplace fees and advertising",
        body: "We review your VAT returns to confirm that platform fees and advertising spend are treated correctly: reverse-charge entries on both sides of the return where applicable, and correct input VAT recovery on UK-billed fees. Service: <a href=\"/services/ecommerce-vat-compliance\">ecommerce VAT compliance</a>.",
      },
      {
        title: "Sub-threshold registration risk assessment",
        body: "We review your overseas fee and ad spend against your gross sales to identify whether the combined reverse-charge value creates a registration obligation, and advise on the correct registration date if it does. Use <a href=\"/calculators/vat-threshold-tracker\">the VAT threshold tracker</a> as a starting point.",
      },
      {
        title: "FRS vs standard VAT modelling for sellers with significant fee spend",
        body: "We model whether standard VAT accounting gives a better outcome than the flat-rate scheme given your specific mix of gross sales, stock costs and platform fee spend. For most stock-based ecommerce sellers, the FRS is the wrong choice once fee VAT is in the picture.",
      },
    ],
    faqs: [
      {
        question: "Do I pay VAT on my Amazon seller fees?",
        answer: "It depends on how Amazon bills you. Following Amazon's move to UK-based billing, UK-VAT-registered sellers receive Amazon invoices showing UK VAT, which is reclaimable as input tax in the normal way. For other platforms that bill from overseas, the reverse-charge mechanism applies: you self-account for the VAT (both output and input), netting to nil on a standard-method return. Sellers not registered for VAT absorb the cost in both cases.",
      },
      {
        question: "Are eBay and Etsy fees subject to the reverse charge?",
        answer: "Check your invoice. The reverse charge applies when the fee supplier is established abroad. The billing entity for a given platform's fees can change; always check the 'sold to' details and the VAT number on your fee invoice to determine whether UK VAT is already charged (recoverable as input tax) or whether you need to self-account under the reverse charge.",
      },
      {
        question: "Can I reclaim the VAT I self-account for on platform fees?",
        answer: "Yes, if you are VAT-registered on the standard method and the fees relate to your taxable supplies. The reverse-charge input VAT goes in box 4 of your return and offsets the output VAT in box 1, netting to nil. Sellers on the flat-rate scheme cannot separately recover this VAT, which is one reason FRS is usually unsuitable for sellers with significant platform fee and advertising spend.",
      },
      {
        question: "Do platform fees count toward the £90,000 VAT threshold?",
        answer: "Yes. <a href=\"https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a\">Under Notice 741A</a>, the value of reverse-charge services (overseas platform fees, advertising, software subscriptions) counts toward the £90,000 registration threshold. A seller whose gross sales are below the threshold may still be required to register if their overseas fee and ad spend pushes the combined total above £90,000.",
      },
      {
        question: "Is this the same as the construction reverse charge?",
        answer: "No. The construction domestic reverse charge is a completely different mechanism that applies to certain VAT-registered sub-contractors in the construction sector. The reverse charge on overseas platform fees applies because the place of supply of those services is the UK and the supplier is abroad (under Notice 741A). The two mechanisms have different scope, different triggers and different return treatments. They must never be confused.",
      },
      {
        question: "I am under the threshold. Can overseas fees still force me to register?",
        answer: "Yes. If your gross sales are below £90,000 but the value of your overseas platform fees, advertising spend and software subscriptions (all reverse-charge services) pushes the combined taxable supply total above £90,000, you are required to register. Use <a href=\"/calculators/vat-threshold-tracker\">the threshold tracker</a> and include your fee and ad spend values, not just your sales.",
      },
    ],
  },
  {
    slug: "135-import-rule",
    title: "The £135 Import Rule",
    headline: "The £135 consignment rule: who accounts for UK VAT, and when the obligation falls on the seller",
    metaTitle: "£135 Import Rule UK VAT | Dropshipping VAT Explained",
    metaDescription: "The UK £135 import rule explained for online sellers and dropshippers. Supply VAT at point of sale for direct fulfilment, marketplace obligations, and what happens above £135.",
    intro: "For consignments of goods valued at <a href=\"https://www.gov.uk/guidance/vat-and-overseas-goods-sold-directly-to-customers-in-the-uk\">£135 or less sold directly to UK consumers from outside the UK</a>, UK VAT is due at the point of sale, not as import VAT at the border. This rule catches dropshippers shipping low-value goods direct from overseas: they must register for UK VAT and account for supply VAT on each eligible sale from the first pound, with no registration threshold. The fork that changes the answer is whether the sale goes through a marketplace: <a href=\"https://www.gov.uk/guidance/vat-and-overseas-goods-sold-to-customers-in-the-uk-using-online-marketplaces\">where it does, the marketplace accounts for the VAT</a> instead. Getting the direct-vs-marketplace fork wrong is the source of most non-compliance in the dropshipping cohort.",
    stats: [
      {
        value: "£135",
        label: "The consignment value ceiling for the point-of-sale VAT rule. Below this, for direct sales to UK consumers from outside the UK, supply VAT is due at point of sale rather than at the border. <a href=\"https://www.gov.uk/guidance/vat-and-overseas-goods-sold-directly-to-customers-in-the-uk\">Source: HMRC guidance</a>.",
      },
      {
        value: "No threshold",
        label: "Direct overseas sellers of sub-£135 consignments to UK consumers must register for UK VAT from the first pound. There is no registration threshold for this obligation. <a href=\"https://www.gov.uk/guidance/vat-and-overseas-goods-sold-directly-to-customers-in-the-uk\">Source: HMRC guidance</a>.",
      },
      {
        value: "From Jan 2021",
        label: "The £135 rule took effect from 1 January 2021, replacing the previous low-value consignment relief. Sellers who have been fulfilling direct from overseas since then may have an unaddressed historic liability.",
      },
    ],
    challenges: [
      {
        title: "The short answer: direct sale vs marketplace sale is the fork that changes everything",
        body: "<p><a href=\"https://www.gov.uk/guidance/vat-and-overseas-goods-sold-directly-to-customers-in-the-uk\">HMRC's guidance</a> is clear on the two routes:</p><ul><li><strong>Direct sale (your own website, Shopify, WooCommerce):</strong> for consignments of £135 or less outside the UK sold direct to UK consumers, the seller must register for UK VAT and account for supply VAT at the point of sale. No registration threshold applies. The obligation exists from the first sale.</li><li><strong>Marketplace sale (Amazon, eBay, Etsy):</strong> the marketplace is the deemed supplier and accounts for VAT on eligible sales. The seller is not liable for the VAT on those sales.</li></ul><p>The same seller can have both direct and marketplace sales with different VAT treatments applying to each channel simultaneously.</p>",
      },
      {
        title: "What the £135 threshold measures and what it does not",
        body: "<p>The £135 threshold applies to the <strong>value of the consignment</strong> of goods, not the shipping charge or any other ancillary cost. <a href=\"https://www.gov.uk/guidance/vat-and-overseas-goods-sold-directly-to-customers-in-the-uk\">The HMRC guidance</a> describes the consignment value; do not improvise rules on whether shipping and insurance are included or how multi-item orders aggregate beyond what that source states. If your fulfilment model involves mixed consignment values, check the guidance directly or take advice, because the point-of-sale vs border distinction can flip within a single order depending on how goods are shipped.</p>",
      },
      {
        title: "Dropshippers shipping direct from overseas: the rule that catches most",
        body: "<p>A dropshipper who takes orders on their own website and fulfils directly from a Chinese, Indian or other overseas supplier to UK customers is selling direct, not through a marketplace. Every consignment of £135 or less is subject to supply VAT at point of sale, due from the seller, from the first sale. There is no £90,000 threshold that defers this obligation.</p><p>Many dropshippers have been operating since 2021 without accounting for this VAT. The platform reporting rules that took effect from January 2024 mean HMRC now receives data on seller income from the platforms themselves; historic non-compliance is increasingly visible. If this position applies to you, see <a href=\"/services/hmrc-letter-online-sales\">our HMRC letter response service</a> and consider a voluntary disclosure.</p>",
      },
      {
        title: "Above £135: standard import VAT at the border, and postponed VAT accounting",
        body: "<p>Consignments above £135 sent from overseas are outside the point-of-sale rule. Standard UK import VAT applies at the border. For VAT-registered sellers importing stock in consignments above £135, <a href=\"https://www.gov.uk/guidance/check-when-you-can-account-for-import-vat-on-your-vat-return\">postponed VAT accounting</a> is available: instead of paying import VAT at the border and waiting to reclaim it, a VAT-registered importer declares and recovers it on the same VAT return. Full mechanics are on the <a href=\"/vat/postponed-vat-margin-scheme\">postponed VAT and margin scheme page</a>. The below-£135 point-of-sale rule and the above-£135 border-import-VAT rule do not overlap.</p>",
      },
    ],
    howWeHelp: [
      {
        title: "Import VAT obligation assessment for your fulfilment model",
        body: "We assess whether the £135 rule creates UK VAT obligations for your specific fulfilment model: marketplace vs own website, sub-£135 vs above-£135 consignments, and the interaction with any FBA or 3PL stock you hold in the UK. Service: <a href=\"/services/ecommerce-vat-compliance\">ecommerce VAT compliance</a>.",
      },
      {
        title: "VAT registration and returns for direct-fulfilment sellers",
        body: "We register direct-fulfilment sellers with HMRC for the point-of-sale VAT obligation and set up quarterly return processes, including the correct treatment of sub-£135 consignments across your sales channels.",
      },
      {
        title: "Historic compliance review and voluntary disclosure",
        body: "For sellers who have been fulfilling from overseas without accounting for VAT since January 2021, we review the historic position, quantify the liability and coordinate a voluntary disclosure to HMRC. Acting before HMRC contacts you materially improves the outcome. See also: <a href=\"/services/hmrc-letter-online-sales\">HMRC letter response</a>.",
      },
    ],
    faqs: [
      {
        question: "What is the £135 import rule?",
        answer: "For consignments of goods valued at £135 or less that come from outside the UK and are sold directly to UK consumers, UK supply VAT is due at the point of sale rather than as import VAT at the border. The rule applies from 1 January 2021. For direct sellers, VAT registration is required from the first pound of eligible sales. <a href=\"https://www.gov.uk/guidance/vat-and-overseas-goods-sold-directly-to-customers-in-the-uk\">HMRC guidance</a>.",
      },
      {
        question: "Does the £135 rule apply if I sell through Amazon or eBay?",
        answer: "No. Where a sale goes through an online marketplace, the marketplace is the deemed supplier and accounts for VAT on eligible sales. The £135 point-of-sale rule applies to direct sales: goods sold via your own website, fulfilled from overseas direct to a UK consumer. The same seller can have both channel types with different VAT treatments applying to each.",
      },
      {
        question: "I dropship from China direct to UK customers. Do I need to register for UK VAT?",
        answer: "Yes, for consignments of £135 or less. You must account for UK VAT at the point of sale from the first pound of direct sales. There is no registration threshold for this obligation. If you also sell through a marketplace, the marketplace accounts for the VAT on those channel sales separately.",
      },
      {
        question: "What happens above £135?",
        answer: "Consignments above £135 are outside the point-of-sale rule. Standard UK import VAT applies at the UK border. For VAT-registered sellers importing stock in above-£135 consignments, postponed VAT accounting removes the border cash payment; see <a href=\"/vat/postponed-vat-margin-scheme\">the PVA and margin scheme page</a> for details.",
      },
      {
        question: "Is the £135 rule the same as the EU's low-value threshold?",
        answer: "No. The UK £135 rule and the EU IOSS low-value regime are different figures, different directions of trade and different legal frameworks. They do not align. For UK sellers shipping goods to EU consumers, see <a href=\"/vat/ioss-vs-oss\">IOSS vs OSS for UK sellers</a>.",
      },
    ],
  },
  {
    slug: "ioss-vs-oss",
    title: "IOSS vs OSS",
    headline: "IOSS and OSS for UK sellers: which scheme applies, and the GB vs NI split that rival content gets wrong",
    metaTitle: "IOSS vs OSS for UK Sellers | EU VAT After Brexit",
    metaDescription: "IOSS and OSS explained for UK ecommerce sellers. GB sellers cannot use OSS. IOSS needs an EU intermediary. Northern Ireland has its own route. Get the split right.",
    intro: "The EU introduced IOSS and OSS in July 2021 to simplify VAT compliance for cross-border e-commerce into and within the EU. The two schemes are frequently confused in seller content, and the GB-vs-NI split is the most common error: <a href=\"https://www.gov.uk/guidance/register-to-report-and-pay-vat-on-distance-sales-of-goods-from-northern-ireland-to-the-eu\">OSS</a> is a Northern Ireland mechanism for NI-to-EU distance sales; GB sellers do not distance-sell under OSS. <a href=\"https://www.gov.uk/guidance/check-if-you-can-register-for-the-vat-import-one-stop-shop-scheme\">IOSS</a> is the relevant scheme for GB sellers shipping low-value consignments to EU consumers, and GB sellers must use an EU-established fiscal intermediary to register. Getting the wrong scheme, or assuming the other party handles it, creates unaccounted EU VAT obligations.",
    stats: [
      {
        value: "Intermediary required",
        label: "GB-based sellers cannot register for IOSS directly; they must appoint an EU-established fiscal intermediary who acts on their behalf and assumes joint liability for the VAT. <a href=\"https://www.gov.uk/guidance/check-if-you-can-register-for-the-vat-import-one-stop-shop-scheme\">Source: HMRC IOSS guidance</a>.",
      },
      {
        value: "NI only",
        label: "OSS for distance selling covers NI-to-EU sales of goods. GB sellers are outside the EU and their goods move as imports, not as intra-EU distance sales. OSS does not apply to GB sellers' EU sales. <a href=\"https://www.gov.uk/guidance/register-to-report-and-pay-vat-on-distance-sales-of-goods-from-northern-ireland-to-the-eu\">Source: HMRC OSS guidance</a>.",
      },
      {
        value: "€150 ceiling",
        label: "IOSS covers B2C consignments into the EU of an intrinsic value not exceeding €150. Above €150, goods attract EU destination-country import VAT at the border; country-by-country registration or a fiscal representative may be needed instead. <a href=\"https://vat-one-stop-shop.ec.europa.eu/one-stop-shop_en\">Source: EU Commission</a>.",
      },
    ],
    challenges: [
      {
        title: "IOSS in plain English: single registration for low-value EU consignments from outside the EU",
        body: "<p><a href=\"https://www.gov.uk/guidance/check-if-you-can-register-for-the-vat-import-one-stop-shop-scheme\">IOSS (the Import One Stop Shop)</a> lets a business register once to account for import VAT on low-value B2C consignments shipped from outside the EU to EU consumers, rather than registering separately in each member state where a consumer buys. IOSS is optional: without it, EU import VAT is collected from the consumer at the border, typically with a customs clearance fee added. Sellers using IOSS collect the destination country's VAT at checkout and remit it via the single IOSS registration.</p><p>IOSS applies to consignments of an intrinsic value not exceeding <a href=\"https://vat-one-stop-shop.ec.europa.eu/one-stop-shop_en\">€150, the ceiling set by EU law</a>. Do not confuse it with the UK's £135 import rule, which is a different figure in a different jurisdiction: the <a href=\"https://www.gov.uk/guidance/check-if-you-can-register-for-the-vat-import-one-stop-shop-scheme\">gov.uk IOSS page</a> covers the UK and NI side of the picture.</p>",
      },
      {
        title: "Why GB sellers need an EU-established fiscal intermediary for IOSS",
        body: "<p><a href=\"https://www.gov.uk/guidance/check-if-you-can-register-for-the-vat-import-one-stop-shop-scheme\">HMRC confirms</a> that businesses established outside the EU (including in Great Britain) must appoint an EU-established fiscal intermediary to register for IOSS and file on their behalf. The intermediary assumes joint and several liability for the VAT. Intermediary fees add to the cost of IOSS compliance, so whether IOSS is cost-effective depends on your EU B2C volume, average order value relative to the €150 ceiling, and the administrative cost of the alternative (per-country import VAT collected at the border from the consumer).</p>",
      },
      {
        title: "OSS and Northern Ireland: the correct split",
        body: "<p>Northern Ireland's dual EU/UK VAT status under the Windsor Framework means that goods moving from Northern Ireland to EU consumers qualify as intra-EU distance sales for VAT purposes. <a href=\"https://www.gov.uk/guidance/register-to-report-and-pay-vat-on-distance-sales-of-goods-from-northern-ireland-to-the-eu\">HMRC's OSS guidance</a> confirms that NI sellers can use the OSS Union scheme to report and pay VAT on those NI-to-EU distance sales once they exceed <a href=\"https://www.gov.uk/guidance/check-how-to-report-and-pay-vat-on-distance-sales-of-goods-from-northern-ireland-to-the-eu\">the £8,818 (€10,000) a year distance-selling threshold</a>.</p><p>GB sellers are outside the EU. Goods shipped from Great Britain to EU consumers cross an EU external border; they are imports into the EU, not intra-EU distance sales. OSS does not apply to GB sellers' EU sales. This is the most common error in rival content on this topic.</p>",
      },
      {
        title: "EORI numbers: GB for GB movements, XI for NI movements",
        body: "<p><a href=\"https://www.gov.uk/eori\">An EORI (Economic Operators Registration and Identification) number</a> is required to move goods into or out of the UK. A GB EORI (prefix GB) covers movements involving Great Britain. An XI EORI (prefix XI) is needed for movements involving Northern Ireland. Sellers who ship to the EU from both GB and NI warehouses may need both. The XI EORI is also relevant to the OSS/NI position: it identifies the NI goods movement for customs and VAT purposes.</p>",
      },
    ],
    howWeHelp: [
      {
        title: "IOSS vs OSS vs country-by-country assessment",
        body: "We assess your EU sales volumes, consignment values and fulfilment model to identify the correct approach for your EU VAT obligations and whether IOSS, OSS (for NI sellers) or country-by-country registration is the right route. Service: <a href=\"/services/selling-into-the-eu\">selling into the EU</a>.",
      },
      {
        title: "IOSS intermediary coordination for GB sellers",
        body: "We coordinate IOSS registration with an EU-established fiscal intermediary, advise on the monthly IOSS return data requirements and review checkout pricing for VAT-inclusive accuracy across EU destination countries.",
      },
      {
        title: "OSS assessment and compliance for Northern Ireland sellers",
        body: "We assess OSS eligibility and registration for Northern Ireland sellers with NI-to-EU distance sales, including the EORI requirements and the NI-specific VAT accounting position. See also: <a href=\"/vat/deemed-supplier-establishment\">establishment status</a>.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between IOSS and OSS?",
        answer: "IOSS (Import One Stop Shop) is for sellers outside the EU shipping low-value goods to EU consumers: one registration covers import VAT across all EU member states. OSS (One Stop Shop) Union scheme is for intra-EU distance sales: goods that start in one EU country and are sold to consumers in another. GB sellers are outside the EU and ship as imports, so IOSS is their scheme (if they use one); OSS is an NI mechanism for NI-to-EU distance sales.",
      },
      {
        question: "Do I need IOSS as a UK (GB) seller?",
        answer: "It is optional, not mandatory. Without IOSS, EU import VAT on your low-value consignments is collected from the consumer at the EU border, typically with a clearance fee. Using IOSS lets you include EU VAT in the checkout price, which improves conversion for EU buyers. Whether it is cost-effective depends on your EU volume and the intermediary fee. <a href=\"https://www.gov.uk/guidance/check-if-you-can-register-for-the-vat-import-one-stop-shop-scheme\">HMRC IOSS guidance</a>.",
      },
      {
        question: "Do I need an EU intermediary for IOSS?",
        answer: "Yes. GB-established sellers (established outside the EU) cannot register for IOSS directly; they must appoint an EU-established fiscal intermediary who registers and files on their behalf. The intermediary assumes joint liability for the VAT. <a href=\"https://www.gov.uk/guidance/check-if-you-can-register-for-the-vat-import-one-stop-shop-scheme\">Source: HMRC</a>.",
      },
      {
        question: "Can a Great Britain seller use OSS?",
        answer: "No. EU OSS covers intra-EU distance sales: goods moving from one EU country to a consumer in another. GB is outside the EU; goods shipped from Great Britain to EU consumers are imports, not intra-EU distance sales. IOSS is the relevant simplification scheme for GB sellers' low-value EU consignments.",
      },
      {
        question: "Does OSS apply to Northern Ireland sellers?",
        answer: "Yes. NI's dual EU/UK VAT status means NI-to-EU sales of goods qualify as intra-EU distance sales. <a href=\"https://www.gov.uk/guidance/register-to-report-and-pay-vat-on-distance-sales-of-goods-from-northern-ireland-to-the-eu\">HMRC confirms</a> that NI sellers can use OSS to report those sales once they pass <a href=\"https://www.gov.uk/guidance/check-how-to-report-and-pay-vat-on-distance-sales-of-goods-from-northern-ireland-to-the-eu\">£8,818 (€10,000) a year</a> of distance sales to EU consumers.",
      },
      {
        question: "Do I need a GB or XI EORI number?",
        answer: "A GB EORI is needed for GB import and export movements. An XI EORI is needed for movements involving Northern Ireland. Sellers shipping from both GB and NI locations may need both. <a href=\"https://www.gov.uk/eori\">Apply for an EORI number on gov.uk</a>.",
      },
    ],
  },
  {
    slug: "postponed-vat-margin-scheme",
    title: "Postponed VAT and Margin Scheme",
    headline: "Postponed import VAT accounting for stock importers and the VAT margin scheme for second-hand resellers",
    metaTitle: "Postponed VAT Accounting UK | VAT Margin Scheme Resellers",
    metaDescription: "Postponed VAT accounting for ecommerce importers: declare and recover import VAT on the same return. VAT margin scheme for second-hand resellers: VAT on the margin, not the full price.",
    intro: "<a href=\"https://www.gov.uk/guidance/check-when-you-can-account-for-import-vat-on-your-vat-return\">Postponed VAT accounting (PVA)</a> lets VAT-registered importers declare and recover import VAT on their VAT return instead of paying cash at the border and waiting to reclaim it. For an FBA seller importing stock into the UK, PVA is the cash-flow default: it removes a border VAT cash outflow that can run to tens of thousands of pounds per shipment. Separately, sellers of eligible second-hand goods can use the <a href=\"https://www.gov.uk/vat-margin-schemes\">VAT margin scheme</a>, which charges VAT on the margin between purchase price and sale price rather than the full selling price. Both require VAT registration and specific record-keeping; neither is automatic.",
    stats: [
      {
        value: "Same return",
        label: "Postponed VAT accounting: import VAT is declared and recovered on the same VAT return. No border cash payment. Available to all VAT-registered UK importers. <a href=\"https://www.gov.uk/guidance/check-when-you-can-account-for-import-vat-on-your-vat-return\">Source: HMRC PVA guidance</a>.",
      },
      {
        value: "Margin only",
        label: "The VAT margin scheme charges VAT on the difference between what you paid and what you sold the item for, not the full selling price. Strict eligibility and record-keeping conditions apply. <a href=\"https://www.gov.uk/vat-margin-schemes\">Source: HMRC margin schemes guidance</a>.",
      },
      {
        value: "VAT-registered only",
        label: "Both PVA and the margin scheme require VAT registration. Unregistered sellers cannot use either mechanism.",
      },
    ],
    challenges: [
      {
        title: "Postponed VAT accounting: the cash-flow default for FBA and stock importers",
        body: "<p><a href=\"https://www.gov.uk/guidance/check-when-you-can-account-for-import-vat-on-your-vat-return\">PVA</a> works by moving the import VAT obligation from the border to your next VAT return. Instead of paying 20% of the customs value in cash at the port or airport and then waiting for the next return cycle to reclaim it, you declare the same amount in box 1 (output tax) and box 4 (input tax) of your VAT return. The cash difference is significant for a seller shipping large consignments: a £50,000 shipment of goods carries £10,000 of import VAT that PVA keeps in your business rather than in a HMRC float.</p><p>HMRC issues a monthly <strong>postponed import VAT statement</strong> for each UK importer using PVA. This statement must reconcile to the boxes 1 and 4 entries on your return. If the statements are not being downloaded and reconciled each period, the return is unreconciled and a compliance risk. For generic importer PVA mechanics (customs declarations, commodity codes), see the generalist importing guide at <a href=\"https://hollowaydavies.co.uk/vat-accountant-importing-goods-outside-uk\">Holloway Davies</a>.</p>",
      },
      {
        title: "When the £135 rule applies instead of PVA (and why the two do not overlap)",
        body: "<p>PVA applies to import VAT at the border. The <a href=\"/vat/135-import-rule\">£135 import rule</a> applies to supply VAT at point of sale, not at the border. For consignments of £135 or less sold directly to UK consumers from outside the UK, it is supply VAT at point of sale that applies; there is no border import VAT to postpone. PVA is relevant for above-£135 consignments where the seller is importing stock for storage and onward sale (FBA, 3PL), not for the direct-to-consumer sub-£135 route. The two regimes are mutually exclusive on the same consignment.</p>",
      },
      {
        title: "The second-hand margin scheme: VAT on the margin, not the full price",
        body: "<p><a href=\"https://www.gov.uk/vat-margin-schemes\">The VAT margin scheme</a> lets resellers of eligible used, refurbished, antique or vintage goods pay VAT on the difference between their purchase price and their selling price, rather than on the full sale value. The scheme applies item by item, not across the business as a whole.</p><p>The key eligibility condition: you must have bought the goods <strong>without VAT being charged to you</strong>. Goods bought from a private individual, from another margin-scheme dealer, or from a non-VAT-registered seller can go into the scheme. Goods on which VAT was charged to you on purchase (including goods with a VAT invoice from a VAT-registered trader) cannot go into the margin scheme. Importing new goods from Alibaba carries import VAT; those goods do not qualify.</p>",
      },
      {
        title: "Record-keeping conditions for the margin scheme",
        body: "<p><a href=\"https://www.gov.uk/vat-margin-schemes\">HMRC requires</a> a stock book for margin-scheme goods, recording every item bought and sold under the scheme. Each item needs a purchase record (date, supplier, purchase price, description) and a sales record. The margin is calculated per item. If the purchase price exceeds the sale price on a single item, the loss on that item cannot be set off against margin on other items. HMRC can disallow margin-scheme treatment across all items if the stock book is inadequate, turning the tax saving into a liability.</p>",
      },
    ],
    howWeHelp: [
      {
        title: "PVA set-up and monthly statement reconciliation",
        body: "We set up postponed VAT accounting for importing sellers, download and reconcile monthly HMRC PVA statements to VAT returns, and ensure import VAT is correctly treated in the accounts and the return. Service: <a href=\"/services/ecommerce-vat-compliance\">ecommerce VAT compliance</a>.",
      },
      {
        title: "Margin scheme eligibility assessment and stock book set-up",
        body: "We assess whether your goods qualify for the margin scheme based on <a href=\"https://www.gov.uk/vat-margin-schemes\">HMRC's eligibility conditions</a>, review your purchasing records, and set up the stock book and per-item invoicing required for compliant margin scheme operation. See also <a href=\"/blog/bookkeeping-and-inventory/cogs-inventory-basics\">stock accounting basics for resellers</a>.",
      },
      {
        title: "Ongoing VAT compliance for importers and resellers",
        body: "We handle ongoing VAT returns covering both standard VAT goods and margin-scheme goods, with correct PVA reconciliation, per-item margin calculations, and the zero-rated export treatment for stock sold outside the UK. Note: <a href=\"https://www.gov.uk/guidance/vat-on-goods-exported-from-the-uk-notice-703\">exports are zero-rated</a>, not exempt; zero-rating preserves your input VAT recovery while exempt supplies do not.",
      },
    ],
    faqs: [
      {
        question: "What is postponed VAT accounting and should I use it?",
        answer: "PVA lets UK-VAT-registered importers account for import VAT on their next VAT return instead of paying cash at the border. For regular importers of stock (FBA, wholesale), it removes a significant cash float tied up in border VAT payments and simplifies cash-flow management. If you are VAT-registered and import goods, you should be using PVA. <a href=\"https://www.gov.uk/guidance/check-when-you-can-account-for-import-vat-on-your-vat-return\">HMRC PVA guidance</a>.",
      },
      {
        question: "Do I need to be VAT-registered to use postponed VAT accounting?",
        answer: "Yes. PVA is only available to VAT-registered UK importers. Unregistered importers pay import VAT at the border and cannot reclaim it.",
      },
      {
        question: "I import consignments under £135. Does PVA apply?",
        answer: "No. For consignments of £135 or less sold directly to UK consumers from outside the UK, it is supply VAT at point of sale that applies (under the <a href=\"/vat/135-import-rule\">£135 import rule</a>), not import VAT at the border. PVA applies to above-£135 consignments where import VAT is due at the border.",
      },
      {
        question: "Can I use the VAT margin scheme for goods I buy from Alibaba?",
        answer: "No. The margin scheme applies to second-hand goods bought without VAT being charged to you. New goods imported from Alibaba carry import VAT; VAT is charged on importation. Those goods do not qualify for the margin scheme. The scheme is for genuinely used or second-hand goods acquired from a private individual or another margin-scheme dealer where no VAT was charged on the purchase.",
      },
      {
        question: "What is the difference between the margin scheme and normal VAT?",
        answer: "Under normal VAT, you charge VAT on the full sale price. Under the margin scheme, VAT applies only to the difference between your purchase price and sale price for that item. If you bought an item for £100 and sold it for £160, normal VAT is on £160; margin-scheme VAT is on the £60 margin only. The scheme saves VAT where margins are modest, but requires strict per-item record-keeping.",
      },
      {
        question: "Is a zero-rated export the same as VAT-exempt?",
        answer: "No. They are different VAT treatments with different consequences. <a href=\"https://www.gov.uk/guidance/vat-on-goods-exported-from-the-uk-notice-703\">Exports of goods from the UK are zero-rated</a> (with evidence requirements under Notice 703), meaning they count as taxable supplies at 0% and preserve your right to recover input VAT on the costs associated with them. Exempt supplies do not count as taxable turnover and input VAT cannot be recovered on costs directly attributable to them. Never treat zero-rated exports as exempt.",
      },
    ],
  },
];

export function getVatPage(slug: string): VatPage | undefined {
  return vatPages.find((v) => v.slug === slug);
}
