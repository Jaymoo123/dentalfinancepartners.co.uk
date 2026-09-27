# Factual QA (Track A): medical-practice-incorporation-step-by-step

File: `docs/medical/_wave1/posts/medical-practice-incorporation-step-by-step.md`
Extends live post: `Medical/web/content/blog/medical-practice-incorporation-step-by-step.md`
Reviewed 2026-09-27. Tie-breaker: `docs/medical/house_positions.md`; primary law where silent.

## Assertions

| # | Where | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | summary, kt1, faq1, body intro, table | Corporation tax 19% to £50,000, 25% above £250,000, marginal relief between | HP §5 (gov.uk CT rates, re-verified 2026-08-26) | CORRECT |
| 2 | summary, kt1, faq1, body intro, table | Dividend tax 10.75% / 35.75% / 39.35% for 2026/27 | HP §5 (gov.uk, FA 2026 s.4) | CORRECT |
| 3 | faq1, intro, table | Dividend allowance £500 | HP §5 | CORRECT |
| 4 | kt1, faq1, intro, table | Dividend rise took effect 6 April 2026, written as already happened | HP §5 ("live now, not an upcoming change") | CORRECT |
| 5 | kt1, faq1, intro, table | Income tax 20% / 40% / 45%, additional rate above £125,140 | HP §5 (gov.uk income-tax rates) | CORRECT |
| 6 | kt1, faq1, table | Class 4 NIC 6% to £50,270, then 2% | HP §5 | CORRECT |
| 7 | table | Employer NIC 15% above the £5,000 secondary threshold; no NIC on dividends | HP §5 | CORRECT |
| 8 | summary, kt2, faq1, closing | "Modest saving at 2026/27 rates"; company wins on retained profit, genuine share split, income outside pensionable pay | HP §5 headline point (do not present incorporation as a clear tax win) | CORRECT |
| 9 | faq3, body H2.2 | 2015-section accrual 1/54th, revalued CPI + 1.5% while active | HP §2 | CORRECT |
| 10 | kt4, body H2.2 | £1,000 of pensionable income forgone = £18.52 a year of pension | Arithmetic 1000/54 = 18.5185 | CORRECT |
| 11 | faq3, body H2.2 | £30,000 = £555.56 a year | Arithmetic 30000/54 = 555.555 | CORRECT |
| 12 | kt3, faq3, faq4, body H2.2 | Income routed through a company is not NHS-pensionable | HP §2.C (pension limb unaffected by the s.86 correction) | CORRECT |
| 13 | kt3, faq4, body H2.3 | GMS contract can be held by a company limited by shares only where at least one share is legally and beneficially owned by a medical practitioner and every other shareholder qualifies under NHS Act 2006 s.86(3); a PSC does not meet it | HP §2.C correction 2026-08-26 | CORRECT (uses the required non-absolute form) |
| 14 | faq4, body H2.3 | PMS agreements made under a separate provision, detail left to regulations | HP §2.C (s.92 / s.94; no PMS shareholder test asserted) | CORRECT (correctly unpinned) |
| 15 | body H2.2 | Consultant private work was never pensionable; GP solo/locum/practice income pensioned via practitioner routes | HP §1, §2.C | CORRECT |
| 16 | body H2.2 | Annual allowance £60,000 for 2026/27, taper | HP §2.B | CORRECT |
| 17 | kt5, faq5, body H2.4 | Inside IR35: public body / NHS trust and medium or large private hirers determine status, fee-payer deducts PAYE and NIC; only small private clients leave it with the PSC | HP §1.A | CORRECT |
| 18 | faq6, body | CT payable 9 months and 1 day after period end; CT600 due 12 months after period end | HP §20 | CORRECT (after edit 1) |
| 19 | faq6 | First late-filing penalty £200, "not the £100 Self Assessment figure" | HP §20 plus the 2026-09-01 ruling permitting the contrast clause | CORRECT |
| 20 | step 2, body step 2 | Companies House online registration £100; usually registered within 24 hours | gov.uk Companies House fees table, fetched 2026-09-27: Incorporation online £100, paper £124 | CORRECT |
| 21 | step 2, body step 2 | Every director and PSC must verify identity; produces a Companies House personal code needed to file | gov.uk "Verifying your identity for Companies House", fetched 2026-09-27 (legal requirement; personal code required when you incorporate) | CORRECT |
| 22 | body step 2 | "NHS" is a sensitive expression in the company-name rules | Companies House sensitive words and expressions guidance | CORRECT |
| 23 | step 3, body step 3 | For a transfer on or after 6 April 2026, s.162 incorporation relief must be claimed, no longer automatic | HP §4 / §5 (FA 2026 s.39, verified at the HP-lock gate) | CORRECT |
| 24 | step 3, body step 3 | A GP cannot transfer NHS goodwill | HP §4 (SI 2019/251) | CORRECT |
| 25 | step 6, body step 6 | Tell HMRC the company is active within three months of the start of its tax accounting period | CTA 2009 s.55 / gov.uk corporation tax registration | CORRECT |
| 26 | step 7, body step 7 | VAT registration turns on standard-rated turnover; cosmetic, medico-legal and some occupational health are standard-rated, genuine medical care exempt | HP §6 (VATA 1994 Sch 9 Gp 7; VATHLT2010 principal-purpose test) | CORRECT |
| 27 | body H2.3 | GMC registration, licence to practise and the Performers List are personal and do not transfer | HP §10 (SI 2013/335) | CORRECT |
| 28 | step 4, body step 4 | Defence-organisation cover, novation of privileges, leases and equipment finance | HP §10 (indemnity for private work sits with MDU/MPS/MDDUS) | CORRECT (no figure asserted) |

No unsourced figures were found; nothing removed.

## Edit log

1. FAQ 6 ("What extra obligations does the company bring?"): "while the return itself is not due until 12 months after **that date**" changed to "12 months after **the end of that same period**". The pronoun could be read as 12 months after the 9-months-and-1-day payment date, which would make the filing deadline 21 months. HP §20 requires both deadlines run from the end of the accounting period. One-clause fix, no figure changed.

Total edits: 1. Frontmatter re-parsed as YAML after the edit: valid, 19 keys.

## Frontmatter validation (S4b)

- Required keys all present: slug, title, date, category, metaDescription, metaTitle, h1, summary, author, canonical, dateModified, faqs, keyTakeaways, generator. PASS
- metaTitle 49 chars (≤ 60). PASS
- metaDescription 144 chars (≤ 155). PASS
- canonical `https://www.medicalaccounts.co.uk/blog/medical-practice-incorporation-step-by-step`, Medical flat form. PASS
- author "Medical Accountants UK Editorial Team". PASS
- dateModified 2026-09-27 bumped against date 2026-04-01 (PARTIAL extension, slug/canonical/date/category unchanged from the live post). PASS
- category "Incorporation & Company Structures", on the Medical list. PASS
- generator `claude-opus`. PASS
- summary 55 words (band 40 to 60). PASS
- faqs 6 (band 4 to 6), keyTakeaways 5 (band 3 to 5). PASS

## Body validation

- Raw HTML throughout, no markdown syntax, no em-dashes. PASS
- Internal links, 5 total, all flat `/blog/<slug>` or `/calculators/<slug>`, each verified on disk: gp-limited-company-tax-benefits-drawbacks, private-practice-tax-nhs-and-private-income, incorporation-relief-private-medical-practice-s162, salary-vs-dividend-medical-limited-company-2026, and `/calculators/private-practice-incorporation` (`Medical/web/src/lib/tools/configs/incorporation-calculator.ts`). PASS
- Body word count **1,272**, above the 800 to 1,200 band. Noted for Track B, out of scope here.

VERDICT: PASS
