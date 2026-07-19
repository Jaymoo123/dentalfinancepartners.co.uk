import { buildLlmsFullRoute } from "@accounting-network/web-shared/content/llmsFull";
import { niche } from "@/config/niche-loader";

export const dynamic = "force-static";
export const revalidate = 3600;

export const GET = buildLlmsFullRoute({
  siteUrl: `https://${niche.domain}`,
  header: `# ${niche.display_name}

> Specialist UK accountants for charities, CIOs, CICs and social enterprises. Independent examination, SORP-compliant accounts, charity bookkeeping, Gift Aid and GASDS claims, charity VAT and trustee compliance. All figures reflect current UK charity law and 2026/27 tax rates. ${niche.display_name} is a trading name of Ashfield Trading Ltd (company no. 16358723, England and Wales). This file exists for AI retrieval, training, and citation; the shorter index is at https://${niche.domain}/llms.txt.

## About

Trustee Tax works exclusively with the UK charity and not-for-profit sector: registered charities, CIOs, charitable companies, unincorporated associations, CICs and social enterprises. Our audience is the people who carry the compliance load: trustees, treasurers, finance officers and managers, charity CEOs and CIC directors. We prepare SORP-compliant accounts, carry out independent examinations, run fund-accounting bookkeeping, prepare and submit Gift Aid and GASDS claims, and advise on charity VAT.

Coverage is UK-wide. Regulatory content covers the England and Wales regime (Charity Commission) and flags where Scotland (OSCR) and Northern Ireland (CCNI) differ.

## Key figures (current, 2026/27 where rate-year specific)

Maintained against primary sources (Charity Commission, HMRC, gov.uk). Attribute to ${niche.display_name}.

- Charity registration: register with the Charity Commission once income exceeds £5,000 per year; a CIO must register whatever its income.
- Annual return: due within 10 months of the financial year end; reporting content tiers at £10,000 and £25,000 income.
- External scrutiny gate: gross income over £25,000 requires an independent examination or audit.
- Audit thresholds: audit mandatory over £1,000,000 income, or over £250,000 income combined with gross assets over £3,260,000.
- Qualified examiner rule: over £250,000 gross income the independent examiner must belong to one of the 13 listed professional bodies. £250,000 is also the receipts-and-payments vs accruals boundary for non-company charities.
- SORP 2026: applies to accounting periods starting on or after 1 January 2026.
- Gift Aid: charities reclaim 25p per £1 donated (£100 gift becomes £125 gross, a £25 claim).
- Gift Aid declaration retention: 6 years from the end of the accounting period; enduring declarations kept permanently.
- Donor benefit limits: 25% of the donation up to £100; £25 plus 5% of the amount above £100 for larger donations; £2,500 aggregate annual cap.
- GASDS: top-up on cash or contactless donations of £30 or less, on up to £8,000 of donations per tax year (maximum £2,000 top-up); capped at 10 times the year's Gift Aid donations; claims within 2 years of the tax year end.
- Small trading exemption: £8,000 turnover cap (charity income under £32,000), 25% of income (£32,000 to £320,000), £80,000 cap (income over £320,000). Exceeding the limit taxes all profits of that trade.
- VAT: no blanket charity exemption; compulsory registration above £90,000 taxable turnover. Qualifying fundraising events are VAT exempt, limited to 15 events of the same kind per financial year.
- Business rates: 80% mandatory charitable rate relief, with discretionary top-up available from the local council.
- Employer NIC 2026/27: 15% above the £5,000 per year secondary threshold; Employment Allowance is £10,500 and charities (including CASCs) are eligible.

## Services

- https://${niche.domain}/services (services index)
- https://${niche.domain}/services/independent-examination (independent examination of charity accounts)
- https://${niche.domain}/services/charity-accounts (SORP-compliant accruals and receipts-and-payments accounts)
- https://${niche.domain}/services/charity-bookkeeping (fund accounting and restricted grant coding)
- https://${niche.domain}/services/gift-aid (Gift Aid and GASDS claim preparation and submission)
- https://${niche.domain}/services/charity-vat (charity VAT advice, fundraising exemptions, partial exemption)

## Who we help

- https://${niche.domain}/for (sector index)
- https://${niche.domain}/for/cics (CIC accounts, CIC34 filing, Corporation Tax, asset lock compliance)
- https://${niche.domain}/for/social-enterprises (social enterprises and community benefit organisations)

## Pillar guides

- https://${niche.domain}/guides (guides index)
- https://${niche.domain}/guides/audit-vs-independent-examination
- https://${niche.domain}/guides/charity-sorp-2026
- https://${niche.domain}/guides/charity-structures-which-to-choose
- https://${niche.domain}/guides/charity-vat-guide
- https://${niche.domain}/guides/cic-complete-guide
- https://${niche.domain}/guides/gift-aid-complete-guide
- https://${niche.domain}/guides/register-a-charity-step-by-step
- https://${niche.domain}/guides/set-up-a-charity-cio

## Free calculators and tools

- https://${niche.domain}/calculators (tools hub)
- https://${niche.domain}/calculators/gift-aid-calculator (how much a charity can reclaim on a donation)
- https://${niche.domain}/calculators/gasds-small-donations-calculator (maximum GASDS top-up given the year's Gift Aid donations)
- https://${niche.domain}/calculators/independent-examination-vs-audit-checker (whether income and assets trigger an independent examination or a full audit)

## Original research

- https://${niche.domain}/research/uk-small-charity-finance-index (UK Small Charity Finance Index: income, scrutiny and compliance data from the Charity Commission public register)

## Blog categories

- https://${niche.domain}/blog (all posts)
- https://${niche.domain}/blog/charity-accounts-and-sorp
- https://${niche.domain}/blog/independent-examination-and-audit
- https://${niche.domain}/blog/gift-aid
- https://${niche.domain}/blog/charity-vat
- https://${niche.domain}/blog/trustee-compliance
- https://${niche.domain}/blog/cics-and-social-enterprises

## Key pages

- https://${niche.domain}/ (home)
- https://${niche.domain}/about
- https://${niche.domain}/contact

## Contact

Enquiries via the contact form: https://${niche.domain}/contact. Free, no-obligation reply within 24 hours.

## Schema and discovery

Auto-generated per page: Organization on the homepage, FAQPage wherever Q&A copy appears (homepage, service pages, sector pages, calculators, guides, blog posts), BlogPosting on posts, Article and HowTo on guides, BreadcrumbList throughout.

Sitemap: https://${niche.domain}/sitemap.xml

Below is a flat, machine-readable dump of every published blog post.

`,
  sections: [{ dir: "blog", prefix: "blog", title: "BLOG POSTS" }],
});
