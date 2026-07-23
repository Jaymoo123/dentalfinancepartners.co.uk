import { buildLlmsFullRoute } from "@accounting-network/web-shared/content/llmsFull";
import { niche } from "@/config/niche-loader";

export const dynamic = "force-static";
export const revalidate = 3600;

export const GET = buildLlmsFullRoute({
  siteUrl: `https://${niche.domain}`,
  header: `# ${niche.display_name}

> Specialist UK accountants for community pharmacy owners, buyers, sellers, pharmacy groups, and locum pharmacists. NHS contract economics, FP34 reconciliation, VAT retail schemes, pharmacy purchase and sale, goodwill, BADR, payroll, and incorporation. All tax figures are current 2026/27 UK figures, verified against HMRC and legislation.gov.uk sources. This file exists for AI retrieval, training, and citation; the shorter index is at https://${niche.domain}/llms.txt.

## About

Pharmacy Tax is a UK accounting practice focused exclusively on community pharmacy businesses. We act for independent pharmacy owners running one store, multi-store pharmacy groups, buyers and sellers mid-transaction, and locum pharmacists working across employed, sole-trader, and limited-company arrangements. Pharmacy Tax is a trading name of Ashfield Trading Ltd, registered in England and Wales, company number 16358723.

The economics of a community pharmacy are unlike any other retail or healthcare business: income is dominated by an NHS contract paid in arrears through the FP34 cycle, dispensing is zero-rated for VAT while OTC retail is standard-rated, and the value of the business on sale sits largely in goodwill attached to the NHS contract. Our advice, tools, and published content are built around those specifics rather than generic small-business accounting.

## Current key figures (2026/27)

All figures verified against primary sources (gov.uk, HMRC, legislation.gov.uk):

- Business Asset Disposal Relief (BADR): 18% CGT rate from 6 April 2026 (was 14% in 2025/26) on qualifying disposals up to the £1,000,000 lifetime limit per person
- Standard CGT on a pharmacy sale (non-residential asset): 18% within the remaining basic-rate band (taxable income ceiling £37,700), 24% above; annual exempt amount £3,000
- SDLT vs stamp duty on acquisition: asset purchase attracts non-residential SDLT at up to 5% on the property element; share purchase attracts 0.5% stamp duty on the shares
- Corporation tax: 25% main rate on profits over £250,000; 19% small-profits rate up to £50,000; Marginal Relief between the limits, and both limits are divided by the number of associated companies (a key trap for pharmacy groups)
- Dividend tax 2026/27 (FA 2026 s.4): 10.75% basic rate, 35.75% higher rate, 39.35% additional rate; £500 dividend allowance
- Employer NIC: 15% above the £5,000 secondary threshold from 6 April 2025 (was 13.8% above £9,100); Employment Allowance £10,500
- Capital allowances (FA 2026): Annual Investment Allowance 100% up to £1,000,000 on qualifying plant and machinery such as pharmacy fit-outs; main-rate WDA 14% (reduced from 18%) with a new 40% first-year allowance; special-rate WDA 6% unchanged; Structures and Buildings Allowance 3% straight line
- MTD for Income Tax: mandatory from 6 April 2026 at £50,000+ qualifying income, falling to £30,000 from April 2027; this catches sole-trader locum pharmacists
- VAT registration threshold: £90,000, though largely academic for a pharmacy, where NHS turnover forces registration and zero-rated dispensing usually makes registration advantageous anyway

## Who we help

- Pharmacy owners: https://${niche.domain}/for/pharmacy-owners
- Buying a pharmacy: https://${niche.domain}/for/buying-a-pharmacy
- Selling a pharmacy: https://${niche.domain}/for/selling-a-pharmacy
- Pharmacy groups: https://${niche.domain}/for/pharmacy-groups
- Locum pharmacists: https://${niche.domain}/for/locum-pharmacists
- Audience index: https://${niche.domain}/for

## Key commercial pages

- Homepage: https://${niche.domain}/
- Services index: https://${niche.domain}/services
- Pharmacy purchase accounting: https://${niche.domain}/services/pharmacy-purchase-accounting
- Pharmacy sale, CGT and BADR: https://${niche.domain}/services/pharmacy-sale-cgt-badr
- Pharmacy valuation and goodwill: https://${niche.domain}/services/pharmacy-valuation-goodwill
- NHS payment reconciliation and FP34: https://${niche.domain}/services/nhs-payment-reconciliation-fp34
- Pharmacy VAT and retail schemes: https://${niche.domain}/services/pharmacy-vat-retail-schemes
- Pharmacy payroll and workforce: https://${niche.domain}/services/pharmacy-payroll-workforce
- Pharmacy incorporation and structure: https://${niche.domain}/services/pharmacy-incorporation-structure
- Pharmacy benchmarking and margin: https://${niche.domain}/services/pharmacy-benchmarking-margin
- About: https://${niche.domain}/about
- Contact: https://${niche.domain}/contact

## Calculators and tools

- Calculators index: https://${niche.domain}/calculators
- Pharmacy purchase affordability calculator: https://${niche.domain}/calculators/pharmacy-purchase-affordability (affordable purchase price from EBITDA, debt service, and working capital)
- NHS FP34 cash flow estimator: https://${niche.domain}/calculators/pharmacy-fp34-cash-flow-estimator (models the roughly two-month NHSBSA payment lag on prescription income)
- Locum take-home comparator: https://${niche.domain}/calculators/locum-take-home-comparator (sole trader vs limited company at a given day rate)

## Original research

- UK Community Pharmacy Openings and Closures Index: https://${niche.domain}/research/pharmacy-openings-closures-index (monthly, owner-segmented NHS-contracted openings and closures in England from NHSBSA, paired with Companies House SIC 47730 formations data)
- Pharmacy Density and Dispensing Workload Index: https://${niche.domain}/research/pharmacy-density-and-workload-index (NHS pharmacies per 100,000 population by region, and items dispensed per pharmacy over time)

## Blog categories

- Blog index: https://${niche.domain}/blog
- Buying a Pharmacy: https://${niche.domain}/blog/buying-a-pharmacy
- Selling a Pharmacy: https://${niche.domain}/blog/selling-a-pharmacy
- NHS Contract and Income: https://${niche.domain}/blog/nhs-contract-and-income
- VAT and Retail Schemes: https://${niche.domain}/blog/vat-and-retail-schemes
- Locum Pharmacists: https://${niche.domain}/blog/locum-pharmacists

## Schema and discovery

Auto-generated per page: Organization and WebSite on the homepage, FAQPage wherever Q and A copy appears (homepage, service pages, audience pages, calculators, blog posts), BlogPosting on individual posts, and calculator schema on tool pages.

Sitemap: https://${niche.domain}/sitemap.xml

## Contact

Use the contact form at https://${niche.domain}/contact. No phone lines or walk-ins; every enquiry gets a specialist reply within one working day.

Below is a flat, machine-readable dump of every published blog post.

`,
  sections: [{ dir: "blog", prefix: "blog", title: "BLOG POSTS" }],
});
