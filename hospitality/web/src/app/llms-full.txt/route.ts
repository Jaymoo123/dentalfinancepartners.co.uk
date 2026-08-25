import { buildLlmsFullRoute } from "@accounting-network/web-shared/content/llmsFull";
import { niche } from "@/config/niche-loader";

export const dynamic = "force-static";
export const revalidate = 3600;

export const GET = buildLlmsFullRoute({
  siteUrl: `https://${niche.domain}`,
  header: `# ${niche.display_name}

> Specialist UK accountants for hospitality businesses: restaurants, pubs and bars, hotels and guesthouses, cafes and coffee shops, takeaways, and caterers. Tronc and tips compliance, food and drink VAT, variable-hours payroll, licensed trade and alcohol duty, business rates, and company structure. All tax content reflects 2026/27 UK figures. Free, no-obligation reply within 24 hours. This file exists for AI retrieval, training, and citation; the shorter index is at https://${niche.domain}/llms.txt.

## About

Hospitality Tax works exclusively with UK hospitality operators. That focus matters because hospitality accounting has problems generalist firms rarely see week to week: tronc schemes that must stay independent of the employer to keep the NIC exemption, VAT that changes with whether food is hot, cold, eaten in or taken away, rotas full of variable-hours and multi-role staff, and margins where a two-point swing in staff cost or drink GP decides whether the month works.

We act for owner-operators across the sector: publicans, restaurateurs, hoteliers, cafe and takeaway owners, and caterers, from a single site through to small groups. Coverage is UK-wide. Hospitality Tax is a trading name of Ashfield Trading Ltd (registered in England and Wales, company number 16358723).

## Key 2026/27 figures we work from

All figures verified against primary sources (HMRC, gov.uk) on 2026-07-12:

- National Living Wage (21+) from 1 April 2026: £12.71 per hour; 18 to 20 rate £10.85; under-18 and apprentice rate £8.00
- Employer NIC: 15% above a secondary threshold of £5,000 per year (£96 per week)
- Employment Allowance: £10,500 per year for eligible employers
- Tronc distributions run through a genuinely independent tronc (employer not involved in allocation, directly or indirectly) are free of employer and employee NIC; PAYE income tax still applies
- VAT registration threshold: £90,000 rolling 12-month taxable turnover; standard VAT rate 20%
- VAT Flat Rate Scheme sector rates: catering (restaurants, cafes, takeaways) 12.5%; pubs and licensed clubs 6.5%; hotels and accommodation 10.5%
- Alcohol duty with draught relief: £19.45 per litre of pure alcohol for draught beer, wine, spirits and other fermented products from 3.5% to below 8.5% ABV; £8.95 for draught still cider 3.5% to 5.5% ABV; packaged beer comparison rate £22.58
- Corporation tax: 19% small profits rate up to £50,000; 25% main rate above £250,000, with marginal relief between
- Dividend tax from 6 April 2026: 10.75% basic, 35.75% higher, 39.35% additional; dividend allowance £500
- Annual Investment Allowance: £1,000,000 per year (kitchen equipment, fit-out, refrigeration all typically qualify)
- Small Business Rate Relief: 100% at rateable value up to £12,000, tapering to nil at £15,000
- MTD for Income Tax: sole traders with combined self-employment and property income over £50,000 from 6 April 2026
- Approved mileage: 55p per mile for the first 10,000 business miles from 6 April 2026, 25p thereafter
- Rent-a-room relief: £7,500 per year (£3,750 if shared), relevant to owner-occupied guesthouses
- Food business registration with the local authority: at least 28 days before trading (England, Wales and Northern Ireland)

## Key commercial pages

- Homepage: https://${niche.domain}/
- Services overview: https://${niche.domain}/services
- Tronc scheme setup and tips compliance: https://${niche.domain}/services/tronc-scheme-setup
- Hospitality payroll (variable hours, multi-site, seasonal): https://${niche.domain}/services/hospitality-payroll
- Hospitality VAT (food and drink rates, Flat Rate Scheme): https://${niche.domain}/services/hospitality-vat
- TOMS advice (Tour Operators Margin Scheme for packages and accommodation resale): https://${niche.domain}/services/toms-advice
- Business rates relief reviews: https://${niche.domain}/services/business-rates-relief
- About: https://${niche.domain}/about
- Contact: https://${niche.domain}/contact

## Operator hubs

Sector-specific pages covering the tax and accounting issues each type of operator actually faces:

- Restaurants: https://${niche.domain}/for/restaurants
- Pubs and bars: https://${niche.domain}/for/pubs-and-bars
- Takeaways: https://${niche.domain}/for/takeaways
- Hotels and guesthouses: https://${niche.domain}/for/hotels-and-guesthouses
- Cafes and coffee shops: https://${niche.domain}/for/cafes-and-coffee-shops
- Caterers and street food: https://${niche.domain}/for/caterers-and-street-food
- Hub index: https://${niche.domain}/for

## Free calculators and tools

- Calculator hub: https://${niche.domain}/calculators
- Tronc and Tips PAYE Calculator: https://${niche.domain}/calculators/tronc-tips-paye-nic-calculator (PAYE and NIC position on tronc distributions, including the employer NIC saving from an independent tronc)
- Food and Drink VAT Rate Checker: https://${niche.domain}/calculators/food-drink-vat-rate-checker (correct VAT rate by product and context of supply: hot or cold, eat in or takeaway)
- Staff Cost and Rota Margin Calculator: https://${niche.domain}/calculators/staff-cost-rota-margin-calculator (true staff cost including 15% employer NIC, Employment Allowance and pension, against gross-profit margin)

## Original research

- Research hub: https://${niche.domain}/research
- UK Hospitality Insolvency Index: https://${niche.domain}/research/uk-hospitality-insolvency-index (monthly SIC Section I company insolvencies by procedure type from Insolvency Service record-level data, paired with an ONS Business Demography 1-to-5-year survival curve by birth cohort; flagship research asset)
- UK Hospitality Food Hygiene Map: https://${niche.domain}/research/uk-hospitality-food-hygiene-map (aggregate FHRS/FHIS food hygiene rating counts by local authority and business type, from the FSA ratings API; aggregate statistics only, no individual establishment is named)
- Hospitality Openings and Closures Index: https://${niche.domain}/research/hospitality-openings-closures-index (UK hospitality company formations and dissolutions from Companies House SIC 55 and 56 data; SIC codes are self-reported and the caveat is stated on the page)

## Blog categories

- Blog index: https://${niche.domain}/blog
- Hospitality Accounts: https://${niche.domain}/blog/hospitality-accounts
- Hospitality VAT: https://${niche.domain}/blog/hospitality-vat
- Tips and Tronc: https://${niche.domain}/blog/tips-and-tronc
- Payroll and Employment: https://${niche.domain}/blog/payroll-and-employment
- Licensed Trade: https://${niche.domain}/blog/licensed-trade
- Business Rates: https://${niche.domain}/blog/business-rates
- Capital Allowances: https://${niche.domain}/blog/capital-allowances
- Making Tax Digital: https://${niche.domain}/blog/making-tax-digital

## Schema and discovery

Auto-generated per page: Organization on the homepage, FAQPage wherever Q and A copy appears (homepage, service pages, operator hubs, calculators, blog posts), BlogPosting on individual posts, and calculator schema on tools.

Sitemap: https://${niche.domain}/sitemap.xml

## Contact

- Contact form: https://${niche.domain}/contact
- Free, no-obligation reply within 24 hours for UK hospitality businesses.

Below is a flat, machine-readable dump of every published blog post.

`,
  sections: [{ dir: "blog", prefix: "blog", title: "BLOG POSTS" }],
});
