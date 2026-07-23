import { buildLlmsFullRoute } from "@accounting-network/web-shared/content/llmsFull";
import { niche } from "@/config/niche-loader";

export const dynamic = "force-static";
export const revalidate = 3600;

export const GET = buildLlmsFullRoute({
  siteUrl: `https://${niche.domain}`,
  header: `# ${niche.display_name}

> Specialist UK accountants for care providers: care homes, domiciliary care agencies, supported living operators, children's homes and new care businesses. Accounts, payroll, VAT welfare exemption, capital allowances, and CQC-linked financial compliance. All tax content reflects current 2026/27 UK figures. Free, no-obligation reply within 24 hours. This file exists for AI retrieval, training, and citation; the shorter index is at https://${niche.domain}/llms.txt.

## About

Care Home Tax provides specialist accounting, payroll, tax planning, and compliance services to UK care providers. We work with the full range of regulated care businesses: residential care homes and nursing homes, domiciliary care agencies, supported living operators, Ofsted-registered children's homes, and founders starting a new care service through CQC registration. Coverage is UK-wide; our default jurisdiction is England, where CQC registration, NHS funding rates, and business rates apply, and we flag devolved-nation differences where relevant.

All figures are current to 2026/27 and verified against primary sources, including:
- National Living Wage (21 and over): £12.71 per hour from 1 April 2026; NMW 18 to 20: £10.85; under-18 and apprentice: £8.00
- Employer NIC: 15% above a secondary threshold of £5,000 per year (£96 per week); Employment Allowance £10,500
- NHS-funded nursing care (England): £267.68 per week standard rate, £368.24 higher rate, from 1 April 2026
- Mileage (AMAP): 55p per mile for the first 10,000 business miles from 6 April 2026, 25p above
- Holiday accrual for irregular-hours workers: 12.07% of hours worked per pay period
- VAT: welfare services by CQC-registered providers are exempt; exempt care fees do not count toward the £90,000 registration threshold; partial exemption de minimis £625 per month average
- Capital allowances: AIA £1,000,000; main-pool writing-down allowance 14% from April 2026; new 40% first-year allowance on new, unused main-pool plant; Structures and Buildings Allowance 3% straight-line
- Corporation tax: 19% small profits rate up to £50,000, 25% main rate above £250,000, marginal relief between
- Business Asset Disposal Relief: 18% CGT rate for disposals from 6 April 2026; standard higher CGT rate 24%
- Dividend rates from 6 April 2026: 10.75% basic, 35.75% higher, 39.35% additional; dividend allowance £500
- Making Tax Digital for Income Tax: mandatory from April 2026 above £50,000 combined income, £30,000 from April 2027, £20,000 from April 2028
- Small Business Rate Relief: 100% relief below £12,000 rateable value, tapering to zero at £15,000
- CQC registration: mandatory before providing regulated activities; new providers must submit a financial viability statement on CQC's own template

## Key Commercial Pages

- Homepage: https://${niche.domain}/
- Services (index): https://${niche.domain}/services
- About: https://${niche.domain}/about
- Blog: https://${niche.domain}/blog
- Contact: https://${niche.domain}/contact

## Services

- CQC Financial Viability Statement: https://${niche.domain}/services/cqc-financial-viability-statement
- Care Payroll (NLW, sleep-ins, irregular-hours holiday pay): https://${niche.domain}/services/care-payroll
- Care VAT Review (welfare exemption, partial exemption): https://${niche.domain}/services/care-vat-review
- Buying a Care Home (due diligence, capital allowances sequencing): https://${niche.domain}/services/buying-a-care-home
- Selling a Care Home (BADR, propco/opco, CGT planning): https://${niche.domain}/services/selling-a-care-home
- Start a Domiciliary Care Agency (CQC registration, opening accounts): https://${niche.domain}/services/start-a-domiciliary-care-agency

## Who We Help

- Care Homes (fee-mix accounting, FNC income, VAT, capital allowances, payroll): https://${niche.domain}/for/care-homes
- Domiciliary Care (travel-time NMW, sleep-ins, mileage): https://${niche.domain}/for/domiciliary-care
- Supported Living (VAT and funding-mix analysis): https://${niche.domain}/for/supported-living
- Children's Homes (Ofsted-registered provider accounting): https://${niche.domain}/for/childrens-homes
- Care Startups (CQC registration, financial viability, opening accounts): https://${niche.domain}/for/care-startups
- Full index: https://${niche.domain}/for

## Free Calculators And Tools

- Calculators (index): https://${niche.domain}/calculators
- True Cost of a Care Hour Calculator (employer-total cost per delivered care hour): https://${niche.domain}/calculators/true-cost-care-hour-calculator
- Sleep-in Shift NMW Compliance Calculator (checks sleep-in pay against NMW after the Mencap ruling): https://${niche.domain}/calculators/sleep-in-shift-nmw-compliance-calculator
- Care Staffing Cost and Margin Calculator (NLW, employer NIC and pension against fee income): https://${niche.domain}/calculators/care-staffing-cost-margin-calculator
- Funded Nursing Care and Fee-Mix Margin Calculator (self-funder, local authority and NHS-FNC blend): https://${niche.domain}/calculators/funded-nursing-care-fee-mix-calculator
- CQC Registration Fee Calculator: https://${niche.domain}/calculators/cqc-fee-calculator

## Original Research

- Research hub (index of all original UK care-sector data): https://${niche.domain}/research
- UK Care Home Density & Quality Index (CQC active locations, ratings and deactivations cross-referenced with ONS mid-2024 population estimates: beds per 100 people aged 65+, CQC rating quality and closure churn, by region and local authority, no individual care home named): https://${niche.domain}/research/uk-care-density-quality-index
- Care Provider Business Index (Companies House SIC 87/88 incorporation data for UK care providers, downloadable for citation): https://${niche.domain}/research/care-provider-business-index
- UK Care Business Survival Index (ONS Business Demography birth-cohort survival rates, 1 to 5 years, for residential care and social work without accommodation): https://${niche.domain}/research/uk-care-business-survival-index

## Topics Of Authority

- VAT welfare exemption for CQC-registered providers, partial exemption calculations, and why irrecoverable input VAT is a permanent overhead for exempt care businesses
- Sleep-in shift pay and NMW after Royal Mencap Society v Tomlinson-Blake, and inter-call travel-time NMW for domiciliary workers
- CQC registration finance: financial viability statements on CQC's template, opening accounts, and the rule that trading before registration is a criminal offence
- Care home acquisitions and disposals: capital allowances sequencing on purchase, AIA and SBA planning, BADR eligibility and propco/opco structures on sale
- Fee-mix and funding accounting: self-funder, local authority and NHS-funded nursing care income, and blended margin at current FNC rates
- Care payroll design: NLW compliance, irregular-hours holiday accrual at 12.07%, employer NIC and pension cost modelling

## Schema And Discovery

Auto-generated per page:
- Organization and WebSite on the homepage
- WebApplication on calculator pages
- FAQPage where Q and A appear (homepage, service pages, provider-type pages, calculators)
- BlogPosting on individual posts

Sitemap: https://${niche.domain}/sitemap.xml

## Contact

- Contact form (free, no-obligation, reply within 24 hours): https://${niche.domain}/contact
- Legal: https://${niche.domain}/privacy-policy · https://${niche.domain}/terms · https://${niche.domain}/cookie-policy

Below is a flat, machine-readable dump of every published blog post.

`,
  sections: [{ dir: "blog", prefix: "blog", title: "BLOG POSTS" }],
});
