# Factual QA (Track A): care-franchisees

File: `docs/care/_wave1/care-franchisees.json`
Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13, S4a ("QA")
Tie-breaker: `docs/care/house_positions.md`; primary law where house positions is silent.
Reviewed 2026-09-27.

## Assertions

| # | Where | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | intro, challenge 2, faq 2 | CQC registration must be held before any regulated activity, in the franchisee's own legal entity | HP21; cqc.org.uk/guidance-providers/registration | CORRECT |
| 2 | intro, challenge 2, faq 2 | Delivering personal care before registration is a criminal offence (HSCA 2008) | HP21 | CORRECT |
| 3 | intro, stat 1, challenge 1, faq 1 | Initial franchise fee paid by a franchisee is usually capital, not a deductible running cost; stays capital where paid by instalments; related legal fees follow | BIM57620 | CORRECT |
| 4 | stat 1, challenge 1, faq 1 | For a company, the CTA 2009 Part 8 intangible fixed assets regime takes precedence over the trade profits capital rule, so relief can follow accounts amortisation | BIM57620; CIRD11500 | CORRECT |
| 5 | challenge 3, faq 3 | Recurring management service fees are a revenue cost, charged on turnover or invoiced hours per the agreement | Trade profits general principle; not contradicted by house positions | CORRECT |
| 6 | intro, stat 2, challenge 3, faq 3 | Care by a CQC-registered provider is VAT-exempt; input VAT on costs used for exempt supplies is irrecoverable, so VAT on franchisor fees sticks | HP1 | CORRECT |
| 7 | stat 2, faq 3 | Franchisor's supply of services is standard-rated at 20% | gov.uk/vat-rates | CORRECT |
| 8 | challenge 3, faq 3 | Exempt income does not count toward the £90,000 VAT registration threshold; the test is taxable turnover only | HP3 | CORRECT |
| 9 | stat 3, faq 5 | NLW £12.71 for workers aged 21 and over from 1 April 2026 | HP7 | CORRECT |
| 10 | challenge 4, faq 5 | Employer NIC 15% above the £5,000 secondary threshold | HP11 | CORRECT |
| 11 | howWeHelp 3 | Employment Allowance claimed where the employer qualifies (no figure asserted) | HP12 | CORRECT |
| 12 | challenge 4, faq 5 | Mileage at 55p per mile | HP8 (AMAP 55p, first 10,000 miles, from 6 April 2026) | CORRECT |
| 13 | howWeHelp 3 | Inter-call travel is working time for NMW | HP6 | CORRECT |
| 14 | howWeHelp 3 | Sleep-in hours treated as the Mencap ruling requires | HP5 | CORRECT |
| 15 | howWeHelp 3, challenge 4 | Holiday accrued on hours worked | HP10 | CORRECT |
| 16 | challenge 2, howWeHelp 2 | CQC application requires financial information including a financial viability statement, on CQC's template | HP21, HP22 | CORRECT |
| 17 | faq 4 | Corporation tax 19% up to £50,000, 25% above £250,000, marginal relief between | HP18 | CORRECT |
| 18 | faq 4 | Dividend rates 10.75%, 35.75%, 39.35% from 6 April 2026 | HP28 | CORRECT |
| 19 | stat 4, faq 6 | BADR 18% on qualifying disposals from 6 April 2026 | HP19 | CORRECT |
| 20 | faq 6 | 24% CGT for a higher-rate taxpayer on non-qualifying gains | HP19 | CORRECT |
| 21 | faq 6 | BADR needs two years of qualifying trading ownership | HP19 | CORRECT |
| 22 | faq 2 | Wales, Scotland and Northern Ireland have their own regulators | HP default-jurisdiction note (England = CQC) | CORRECT |
| 23 | challenge 4 | Local authority invoices settled in arrears, carers paid weekly or fortnightly | Sector practice, no figure asserted, not a rate claim | CORRECT (non-numeric) |

No WRONG, no STALE, no UNSOURCED figures found.

## Sources array

Covers every numeric and statutory claim on the page: BIM57620, CIRD11500, CQC registration, HP1/HP3, HP5/HP6/HP10, HP7, HP8, HP11/HP12, HP18, HP19, HP21/HP22, HP28, and gov.uk/vat-rates for the 20% standard rate. No claim on the page is unsourced; no source in the array is unused.

## Internal links (all present on disk)

| Link | Backing |
|---|---|
| `/for/care-startups` | `care/web/src/data/care-hubs.ts` (slug `care-startups`) |
| `/services/start-a-domiciliary-care-agency` | `care/web/src/data/care-services.ts` |
| `/services/care-payroll` | `care/web/src/data/care-services.ts` |
| `/services/selling-a-care-home` | `care/web/src/data/care-services.ts` |
| `/calculators/true-cost-care-hour-calculator` | `care/web/src/lib/calculators/tools/true-cost-care-hour.ts` (slug), registered in `registry.ts` |

## Template checks

- Word count (intro, challenges, howWeHelp, faqs, titles and questions included, tags stripped): 1,200. Inside the 800 to 1,200 band, at the ceiling.
- `metaTitle` 47 chars (limit 60). `metaDescription` 152 chars (limit 160).
- No em-dash, no en-dash.
- JSON parses.

## Edit log

No edits. 0 changes to `docs/care/_wave1/care-franchisees.json`.

VERDICT: PASS
