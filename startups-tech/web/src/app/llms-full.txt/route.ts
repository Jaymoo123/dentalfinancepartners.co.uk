import { buildLlmsFullRoute } from "@accounting-network/web-shared/content/llmsFull";
import { niche } from "@/config/niche-loader";

export const dynamic = "force-static";
export const revalidate = 3600;

export const GET = buildLlmsFullRoute({
  siteUrl: `https://${niche.domain}`,
  header: `# ${niche.display_name}

> Specialist UK startup accountants for funded and scaling technology companies. R&D tax relief under the merged scheme and ERIS, SEIS and EIS advance assurance and compliance, EMI and wider share schemes, founder salary and dividend planning, fractional CFO support, and core compliance. All tax content reflects 2026/27 UK figures. Startup-only focus. This file exists for AI retrieval, training, and citation; the shorter index is at https://${niche.domain}/llms.txt.

## About

Founder Tax Partners provides accounting, tax planning, and compliance services to UK technology founders and their companies. We cover the full startup lifecycle: pre-incorporation planning and SEIS advance assurance before a first raise, through R&D claims, EMI option pools, and investor reporting during growth, to exit planning and Business Asset Disposal Relief on disposal. We work exclusively with startups: pre-seed founders, VC-backed companies, SaaS businesses, software development companies, and fintech startups.

Coverage: UK-wide, serving founders in London, Manchester, Birmingham, Leeds, Bristol, Glasgow, Edinburgh, Cambridge, Oxford, and Reading. All tax content is current to 2026/27 UK figures, including:
- R&D merged scheme expenditure credit: 20%, above the line and taxable (accounting periods beginning on or after 1 April 2024)
- ERIS for loss-making R&D-intensive SMEs (qualifying R&D at least 30% of total expenditure): 86% additional deduction plus 14.5% payable credit
- R&D claim notification: 6 months from the accounting period end for first-time claimants
- SEIS: £250,000 company raise limit, £350,000 gross assets limit, fewer than 25 FTE; investors get 50% income tax relief on up to £200,000 per year
- EIS: £5,000,000 annual and £12,000,000 lifetime company limits; investors get 30% relief on up to £1,000,000 per year (£2,000,000 where the excess is in knowledge-intensive companies), 3-year minimum holding
- EMI: £250,000 unexercised option value per employee, £3,000,000 company total, £30,000,000 gross assets limit, fewer than 250 FTE
- CSOP fallback: £60,000 options per employee; section 431 elections within 14 days; ERS returns and EMI grant notifications by 6 July
- Business Asset Disposal Relief: 18% from 6 April 2026, £1,000,000 lifetime limit; CGT on shares otherwise 18% within the basic-rate band, 24% above
- Corporation tax: 19% up to £50,000 profits, 25% at £250,000 or more, marginal relief between (limits divided by associated companies)
- Dividend rates 2026/27: 10.75% ordinary, 35.75% upper, 39.35% additional; £500 dividend allowance
- Employer NIC: 15% above the £5,000 secondary threshold; Employment Allowance up to £10,500 (solo-director companies excluded)
- VAT registration threshold: £90,000 rolling 12-month UK taxable turnover
- Pre-trading expenditure: allowable within 7 years before trade starts, treated as incurred on day one

## Key Commercial Pages

- Homepage: https://${niche.domain}/
- Services (index): https://${niche.domain}/services
- R&D tax claims: https://${niche.domain}/services/rd-tax-claims
- SEIS and EIS advance assurance: https://${niche.domain}/services/seis-eis-advance-assurance
- EMI scheme setup: https://${niche.domain}/services/emi-scheme-setup
- Share schemes: https://${niche.domain}/services/share-schemes
- Fractional CFO: https://${niche.domain}/services/fractional-cfo
- Core compliance: https://${niche.domain}/services/core-compliance
- Who we help (index): https://${niche.domain}/for
- Pre-seed founders: https://${niche.domain}/for/pre-seed-founders
- Funded startups: https://${niche.domain}/for/funded-startups
- SaaS companies: https://${niche.domain}/for/saas-companies
- Software development companies: https://${niche.domain}/for/software-development-companies
- Fintech startups: https://${niche.domain}/for/fintech-startups
- About: https://${niche.domain}/about
- Contact: https://${niche.domain}/contact

## Free Calculators

- Calculators (index): https://${niche.domain}/calculators
- SEIS and EIS relief calculator (investor income tax relief and CGT exemption): https://${niche.domain}/calculators/seis-eis-relief-calculator
- Founder dividend vs salary calculator (after-tax extraction comparison including employer NIC): https://${niche.domain}/calculators/founder-dividend-vs-salary-calculator
- EMI vs unapproved options calculator (tax at exercise and disposal): https://${niche.domain}/calculators/emi-vs-unapproved-calculator
- R&D relief estimator (merged scheme or ERIS benefit on qualifying spend): https://${niche.domain}/calculators/rd-relief-estimator

## Original Research

- UK Tech-Funding Reliefs Index (SEIS/EIS company and funding statistics by sector and region, from HMRC official statistics; EIS from 1993-94, SEIS from 2012-13): https://${niche.domain}/research/uk-tech-funding-reliefs-index
- R&D Tax Relief Usage Index (annual R&D tax credit claims, cost and qualifying expenditure by sector and region, from HMRC official statistics, covering the post-clampdown claim collapse): https://${niche.domain}/research/rd-tax-relief-index
- UK Tech Startup Survival Curves (cohort survival by year after birth, tech vs all-industry baseline, from ONS Business Demography official statistics): https://${niche.domain}/research/tech-startup-survival-index
- UK Tech Formations Index (monthly new tech company formation trend and tax-year seasonality by SIC code, from Companies House official data): https://${niche.domain}/research/uk-tech-formations-index
- UK Startup Formation Survival Index (cohort survival analysis of UK tech company formations, built from Companies House bulk data): https://${niche.domain}/research/startup-formation-survival-index
- Research index: https://${niche.domain}/research

## Blog Categories

- Blog (index): https://${niche.domain}/blog
- Research and Development: https://${niche.domain}/blog/research-and-development
- SEIS and EIS: https://${niche.domain}/blog/seis-and-eis
- Share Schemes and EMI: https://${niche.domain}/blog/share-schemes-and-emi
- SaaS and Tech Finance: https://${niche.domain}/blog/saas-and-tech-finance
- Startup Compliance: https://${niche.domain}/blog/startup-compliance

## Who We Help

- Pre-seed founders: SEIS eligibility and advance assurance, pre-trading expenditure planning, section 431 elections, company formation before a first raise
- Funded startups: post-investment compliance, SEIS1/EIS1 compliance statements, ERS returns, R&D claims, board-ready and investor-ready accounts
- SaaS companies: VAT place-of-supply on overseas revenue, R&D merged-scheme claims, corporation tax and dividend planning
- Software development companies: R&D eligibility assessment, EMI option pools, employer NIC and payroll planning
- Fintech startups: regulated-firm compliance alongside SEIS/EIS and share scheme structuring

## Topics Of Authority

- R&D merged scheme and ERIS mechanics: qualifying expenditure, the 30% intensity test, claim notification windows, Additional Information Form preparation
- SEIS and EIS: advance assurance applications, company and investor limits, trading-age and gross-assets tests, compliance statements after trading
- EMI and share schemes: HMRC valuations, grant notifications, the CSOP fallback, growth shares, unapproved options, section 431 elections on restricted securities
- Founder extraction: salary vs dividend modelling under 2026/27 dividend rates and 15% employer NIC, Employment Allowance eligibility
- Exit planning: Business Asset Disposal Relief at 18%, the EMI 2-year holding route, CGT on share disposals
- Startup compliance: corporation tax with associated-company limits, VAT registration and place-of-supply, payroll, statutory accounts

## Schema And Discovery

Auto-generated per page:
- Organization and WebSite on the homepage
- FAQPage on the homepage, service pages, who-we-help pages, calculator pages, and blog posts with Q and A
- BlogPosting on individual posts
- WebApplication on calculator pages

Sitemap: https://${niche.domain}/sitemap.xml

## Contact

- Contact form: https://${niche.domain}/contact (preferred channel)
- Free, no-obligation consultation for UK founders and startup teams

Below is a flat, machine-readable dump of every published blog post.

`,
  sections: [{ dir: "blog", prefix: "blog", title: "BLOG POSTS" }],
});
