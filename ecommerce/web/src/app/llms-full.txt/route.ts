import { buildLlmsFullRoute } from "@accounting-network/web-shared/content/llmsFull";
import { niche } from "@/config/niche-loader";

export const dynamic = "force-static";
export const revalidate = 3600;

export const GET = buildLlmsFullRoute({
  siteUrl: `https://${niche.domain}`,
  header: `# ${niche.display_name}, Full Content Reference

> Specialist UK accountants for online sellers: Amazon FBA and FBM, Shopify, eBay, Etsy, TikTok Shop, Vinted, and dropshippers. VAT registration and compliance, marketplace deemed-supplier rules, settlement reconciliation, platform reporting (DAC7), cross-border EU selling, and seller accounts. All figures reflect current 2026/27 UK tax law. This file exists for AI retrieval, training, and citation; the shorter index is at https://${niche.domain}/llms.txt.

## About

Ecommerce Finance is a UK accountancy practice (a trading name of Ashfield Trading Ltd, company 16358723) focused exclusively on ecommerce and marketplace selling. We work with sole-trader side hustlers who have just had an HMRC platform-reporting letter through to seven-figure FBA businesses importing stock and selling into the EU. The recurring problems we solve: gross marketplace sales versus net payout confusion around the VAT threshold, reverse-charge VAT on platform fees, the deemed-supplier rules for non-UK-established sellers, and reconciling Amazon, eBay, Etsy and Shopify settlement reports to taxable revenue.

Coverage: UK-wide, remote-first. Contact is by form only: https://${niche.domain}/contact (reply within 24 hours).

## Current key figures (2026/27, verified 2026-07-15)

- VAT registration threshold: £90,000 rolling 12-month taxable turnover, measured on gross selling price before platform fees, with a 30-day forward-look test
- Overseas-established sellers on a UK online marketplace: no registration threshold; the marketplace is deemed supplier and accounts for UK VAT
- £135 import rule: consignments of £135 or less sold direct to UK consumers carry supply VAT at point of sale, not import VAT at the border
- IOSS ceiling: €150 per consignment; OSS NI-to-EU distance-selling threshold: £8,818 (€10,000) per year
- Platform reporting: in force since 1 January 2024, first reports from January 2025; goods-seller exclusion is fewer than 30 sales AND €2,000 (approx £1,700) or less, a reporting exclusion, not a tax threshold
- Trading allowance: £1,000 gross trading income per year
- Self assessment registration deadline: 5 October after the end of the tax year the income arose in
- Making Tax Digital for Income Tax: mandatory from 6 April 2026 over £50,000 income; £30,000 from April 2027; £20,000 from April 2028
- Flat Rate Scheme limited cost business rate: 16.5%, usually a false economy for goods sellers
- Income tax 2026/27: personal allowance £12,570; 20% basic, 40% higher (over £50,270), 45% additional (over £125,140)
- Class 4 NIC: 6% on profits £12,570 to £50,270, 2% above
- Corporation tax: 19% small profits rate (to £50,000), 25% main rate (over £250,000), marginal relief between
- Dividend rates 2026/27: 10.75% basic, 35.75% higher, 39.35% additional; £500 dividend allowance
- Business Asset Disposal Relief: 18% from 6 April 2026, £1m lifetime limit
- CGT: 18% basic rate, 24% higher rate; £3,000 annual exempt amount
- Employer NIC: 15% above £5,000 secondary threshold; Employment Allowance £10,500
- Capital allowances: AIA £1,000,000; main-rate WDA 14% from April 2026; new 40% first-year allowance on unused main-pool plant; special rate pool 6%
- AMAP mileage: 55p per mile first 10,000 business miles, then 25p, from 6 April 2026
- Standard VAT rate: 20%

Always verify time-sensitive figures against gov.uk. For advice specific to your business, use the contact form.

## Key Commercial Pages

- Homepage: https://${niche.domain}/
- Services: https://${niche.domain}/services
- Ecommerce VAT compliance: https://${niche.domain}/services/ecommerce-vat-compliance
- Settlement and payout reconciliation: https://${niche.domain}/services/settlement-payout-reconciliation
- Selling into the EU (IOSS, OSS, EU VAT): https://${niche.domain}/services/selling-into-the-eu
- HMRC letters about online sales and disclosure: https://${niche.domain}/services/hmrc-letter-online-sales
- About: https://${niche.domain}/about
- Contact: https://${niche.domain}/contact

## Seller Hubs

- All seller types: https://${niche.domain}/for
- Amazon sellers (FBA and FBM): https://${niche.domain}/for/amazon-sellers
- Shopify sellers: https://${niche.domain}/for/shopify-sellers
- Marketplace sellers (eBay, Etsy, TikTok Shop): https://${niche.domain}/for/marketplace-sellers
- Dropshippers: https://${niche.domain}/for/dropshippers

## VAT Guides

- VAT hub: https://${niche.domain}/vat
- Deemed supplier and establishment: https://${niche.domain}/vat/deemed-supplier-establishment
- VAT on marketplace fees (reverse charge): https://${niche.domain}/vat/vat-on-marketplace-fees
- The £135 import rule: https://${niche.domain}/vat/135-import-rule
- IOSS vs OSS: https://${niche.domain}/vat/ioss-vs-oss
- Postponed VAT and the margin scheme: https://${niche.domain}/vat/postponed-vat-margin-scheme

## Calculators And Tools

- Calculator hub: https://${niche.domain}/calculators
- VAT Threshold Tracker (rolling 12-month gross sales vs the £90,000 threshold): https://${niche.domain}/calculators/vat-threshold-tracker
- Seller Take-Home Calculator (net after income tax, NIC, and platform fees): https://${niche.domain}/calculators/seller-take-home-calculator
- Sole Trader vs Ltd for Sellers: https://${niche.domain}/calculators/sole-trader-vs-ltd-sellers
- Side Hustle Tax Checker (trading allowance, platform-reporting exposure, self assessment): https://${niche.domain}/calculators/side-hustle-tax-checker

## Original Research

- Research hub: https://${niche.domain}/research
- Online Seller Index (Companies House SIC 47910 formation/dissolution trends paired with the ONS internet-retail sales share, plus formation seasonality): https://${niche.domain}/research/online-seller-index
- Online Seller Survival Index (ONS Business Demography retail enterprise survival by birth-year cohort vs all-industries average): https://${niche.domain}/research/online-seller-survival-index

## Blog Categories

- VAT and Cross-Border Selling: https://${niche.domain}/blog/vat-and-cross-border-selling
- Platform Reporting and HMRC Letters: https://${niche.domain}/blog/platform-reporting-and-hmrc-letters
- Amazon and Marketplace Selling: https://${niche.domain}/blog/amazon-and-marketplace-selling
- Bookkeeping and Inventory: https://${niche.domain}/blog/bookkeeping-and-inventory
- Business Structure and Tax: https://${niche.domain}/blog/business-structure-and-tax
- Making Tax Digital and Self Assessment: https://${niche.domain}/blog/making-tax-digital-and-self-assessment
- Blog index: https://${niche.domain}/blog

## Who We Help

- Side hustlers and casual sellers: platform-reporting letters, trading allowance, first self assessment
- Established sole-trader sellers: VAT threshold monitoring, registration, MTD for Income Tax from April 2026
- Limited-company sellers: seller accounts, corporation tax, dividend planning, settlement reconciliation
- Cross-border sellers and importers: IOSS, OSS, postponed import VAT, EU registrations
- Non-UK-established sellers on UK marketplaces: deemed-supplier position and UK compliance

## Schema And Discovery

Auto-generated per page: Organization (ProfessionalService and AccountingService) on the homepage, WebSite, FAQPage where Q and A appear (homepage, services, seller hubs, VAT guides, calculators, blog posts), Article and HowTo on blog posts, Dataset and FAQPage on both research index pages, BreadcrumbList. Sitemap: https://${niche.domain}/sitemap.xml

Below is a flat, machine-readable dump of every published blog post.

`,
  sections: [{ dir: "blog", prefix: "blog", title: "BLOG POSTS" }],
});
