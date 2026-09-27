# Track A factual QA: first-contract-outside-ir35-checklist

Post: `docs/contractors-ir35/_wave1/posts/first-contract-outside-ir35-checklist.md`
Type: PARTIAL, extension of the live post `contractors-ir35/web/content/blog/first-contract-outside-ir35-checklist.md`
Spec: LEADS_250_PROGRAMME_2026-09-27 §13 S4b (and the S4a QA paragraph)
Tie-breaker: `docs/contractors-ir35/house_positions.md` §6 to §11, §16, §17; gov.uk where the house file is silent
Reviewed: 2026-09-27

## S4b frontmatter checks

| Check | Result |
|---|---|
| YAML parses, 20 keys | PASS |
| `slug`, `title`, `date`, `category`, `metaDescription` present | PASS |
| `metaTitle` 51 chars (limit 60) | PASS |
| `metaDescription` 152 chars (limit 155) | PASS |
| `h1` present, matches title | PASS |
| `summary` 52 words (band 40 to 60), answers the question | PASS |
| `author` = site editorial-team string | PASS |
| `canonical` nested: `.../blog/contractor-accounting-basics/first-contract-outside-ir35-checklist`, matches `slugifyCategory("Contractor Accounting Basics")` | PASS |
| `category` = "Contractor Accounting Basics", on the contractors list | PASS |
| `dateModified` 2026-09-27, bumped from `date` 2026-06-12 | PASS |
| `date`, `slug`, `category`, `canonical` unchanged from the live post (PARTIAL rule) | PASS |
| `faqs` 6 (band 4 to 6) | PASS |
| `keyTakeaways` 5 (band 3 to 5) | PASS |
| `generator: claude-opus` | PASS |
| Body is raw HTML, no markdown, no shortcodes, no CTA markup | PASS |
| Body length 1,140 words (band 800 to 1,200) | PASS |
| No em-dash anywhere in the file | PASS |

### Internal links (5, limit is 5), each verified on disk with the category from its own frontmatter

| Link | Target file | Its category | Verdict |
|---|---|---|---|
| `/blog/contractor-accounting-basics/set-up-limited-company-contractor` | exists | Contractor Accounting Basics | CORRECT |
| `/blog/mtd-and-compliance/flat-rate-vat-limited-cost-trader` | exists | MTD and Compliance | CORRECT |
| `/blog/mtd-and-compliance/contractor-vat-registration-guide` | exists | MTD and Compliance | CORRECT |
| `/blog/ir35-status/ir35-contract-review-checklist` | exists | IR35 Status | CORRECT |
| `/blog/limited-company-tax/director-salary-dividend-split-guide` | exists | Limited Company Tax | CORRECT |

## Assertions

| # | Assertion | Where | Source | Verdict |
|---|---|---|---|---|
| 1 | Tell HMRC the company is active within 3 months of the start of the accounting period | summary, FAQ 1, body intro, H2 1, step 2 | gov.uk corporation tax "tell HMRC your company is active" within 3 months of starting your tax accounting period; house file silent | CORRECT |
| 2 | Notification is made through the business tax account using the CRN and the date trading began | FAQ 1 | gov.uk | CORRECT |
| 3 | Register as an employer before the first payday | summary, FAQ 2, body intro, H2 1, step 1 | gov.uk PAYE registration | CORRECT |
| 4 | Employer PAYE reference can take up to 15 working days | FAQ 2, body intro | gov.uk ("can take up to 15 working days") | CORRECT |
| 5 | You cannot register more than 2 months before you start paying people | FAQ 2, H2 1 | gov.uk | CORRECT |
| 6 | VAT registration compulsory once VAT taxable turnover exceeds £90,000 in any rolling 12 months, or is expected to in the next 30 days | FAQ 3, H2 1, VAT section | §9 (£90,000 / £88,000, frozen 1 Apr 2024) | CORRECT |
| 7 | £90,000 threshold frozen since 1 April 2024 | VAT section | §9, tagging required by the writing rule | CORRECT |
| 8 | Most contractor services are standard rated at 20% | VAT section | §9 | CORRECT |
| 9 | Voluntary registration common; VAT registered end client recovers the VAT charged; input VAT recoverable | FAQ 3, VAT section | §9 | CORRECT |
| 10 | "A full time day rate reaches £90,000 inside a year" with no rate given | FAQ 3, VAT section | £90,000 over roughly 240 working days is about £375/day; the bare claim was an unsourced generalisation | WRONG as stated, FIXED (see edit 1) |
| 11 | Limited cost trader = spending less than 2% of turnover or less than £1,000 a year on goods; flat rate 16.5% | FRS paragraph | §9 verbatim | CORRECT |
| 12 | The limited cost test is applied every VAT period | FRS paragraph | §9 ("applied each VAT period") | CORRECT |
| 13 | The 16.5% rate removes most of the FRS benefit for a labour only contractor | FRS paragraph | §9 house stance | CORRECT |
| 14 | Corporation tax 19% up to £50,000, 25% above £250,000, marginal relief between at about 26.5% | FAQ 4, extraction section | §7 | CORRECT |
| 15 | Corporation tax due 9 months and 1 day after the year end | closing section | CTA 2010 / gov.uk; small company (non-instalment) case, which is the one in scope | CORRECT |
| 16 | A dividend can only come from distributable profit, after corporation tax and VAT collected are set aside | takeaway 4, FAQ 4, extraction section | CA 2006 Part 23; §7, §8 | CORRECT |
| 17 | Drawing where there is no distributable profit creates a director's loan, not a dividend | extraction section | CA 2006 s.830; §14 direction of travel | CORRECT |
| 18 | Every distribution needs a board minute and a dividend voucher dated before the money moves, "or the payment is a director's loan" | FAQ 4 | Paperwork is required practice, but absence of it does not itself convert a lawful distribution into a loan; the original wording overstated the consequence | WRONG as stated, FIXED (see edit 2) |
| 19 | Employment Allowance is unavailable to a single director company with no other employees | extraction section | §6, §8 | CORRECT |
| 20 | Employer pension contribution is deductible against corporation tax and carries no National Insurance | step 8 | §11 | CORRECT |
| 21 | Self assessment registration by 5 October following the end of the tax year in which the income first arises | summary of H2 1, FAQ 5, step 10 | gov.uk self assessment deadlines | CORRECT |
| 22 | Whether a return is due depends on total income and how it has been taxed; the UTR takes time to arrive | FAQ 5 | gov.uk; correctly hedged | CORRECT |
| 23 | MTD for Income Tax does not apply to the company; thresholds £50,000 from 6 Apr 2026, £30,000 from 6 Apr 2027, £20,000 from 6 Apr 2028; salary and dividends are not qualifying income | FAQ 6 | §16, exact match including the "PSC contractor is outside MTD for IT" line | CORRECT |
| 24 | Keep the status determination statement on file with its reasons; contractor does not issue it | paperwork paragraph, takeaway 5 | §3 (client issues the SDS) | CORRECT on who issues, but INCOMPLETE: it assumed an SDS always exists, which is false where the client is small (Chapter 8, PSC self-assesses, §1 and §1.A). FIXED (see edit 3) |
| 25 | Written terms and working practices must agree; a tribunal looks at both | paperwork paragraph | §17.B, §17.D | CORRECT |
| 26 | A CEST result on its own does not settle the question | paperwork paragraph | §17.A ("never present a CEST outside as a guarantee") | CORRECT |
| 27 | Professional indemnity and public liability normally required; a placement can be pulled without certificates | invoice section, step 4 | Standard agency practice, framed as a requirement of contracts not of law; no brands named | CORRECT |
| 28 | Invoice must carry company name, registered number, registered office, VAT number if registered, unique invoice number, client details, date of supply | invoice section | Companies Act 2006 s.82 / SI 2008/495 for the company details; VAT Notice 700 §16 for the VAT invoice contents | CORRECT |
| 29 | 30 day terms behind a monthly agency cycle can mean an eight week wait | invoice section | Illustrative and hedged with "can"; arithmetic holds | CORRECT |
| 30 | Company income belongs to the company from the moment it arises; no client payment into a personal account | takeaway 3, failure modes | Separate legal personality; retained from the live post | CORRECT |
| 31 | Day 0 to day 30 ordering (10 steps) | ordered list | Sequencing only, no figures beyond those already checked; consistent with rows 1 to 6 and 21 | CORRECT |

### Figures dropped from the live post, cross-referenced not misstated

The extension drops several figures the live post carried. Each was checked to confirm it is absent rather than restated wrongly, and that the reader is pointed somewhere that holds it.

| Dropped figure | Live post value | Handled how | Verdict |
|---|---|---|---|
| Salary targets LEL £6,708 and personal allowance £12,570 | in live FAQ | Not restated; the extension defers to the salary and dividend split guide and keeps the Employment Allowance fork (§8 requires the fork, forbids a single universal figure) | CORRECT |
| Pension annual allowance £60,000, three year carry forward | in live FAQ | Not restated; step 8 keeps only the CT deductibility and no-NIC points, both correct per §11 | CORRECT |
| AMAP 55p / 25p from 6 April 2026 | in live FAQ | Not restated anywhere; no stale 45p reappears | CORRECT |
| 24 month temporary workplace rule | in live FAQ | Not restated; no partial or misstated version present | CORRECT |
| Named challenger banks (Starling, Monzo Business, Tide) | in live FAQ | Removed; the extension says "business bank account" with no brands, per the no-named-provider rule | CORRECT |
| £90,000 VAT threshold | in live post | Retained and correct, see rows 6 and 7 | CORRECT |

No STALE figure found: every rate and threshold carried in the extension is the 2026/27 locked value.
No UNSOURCED figure remained after the edits below, so nothing was removed for want of a source.

## Edit log

| # | Location | Before | After | Reason |
|---|---|---|---|---|
| 1 | FAQ 3 and the VAT section | "a full time day rate reaches that/it inside a year" | "a full time day rate of around £375 reaches that/it inside a year" | The bare claim was an unsourced generalisation, untrue at lower rates. £375 is £90,000 over roughly 240 working days, derived from the §9 threshold. |
| 2 | FAQ 4 | "or the payment is a director's loan rather than a dividend" | "or the payment risks being treated as a director's loan rather than a dividend" | Overstated the consequence of missing paperwork. The body's separate statement about drawing with no distributable profit is unchanged and remains correct. |
| 3 | Paperwork paragraph | "keep the client's status determination statement on file with the reasons it gives, and keep a short note..." | "if the end client is medium or large it must issue a status determination statement, and you keep it on file with the reasons it gives. If the client is small, no statement is issued and the company assesses its own status. Either way, keep a short note..." | §1 and §1.A: Chapter 10 and the SDS only apply where the client is medium or large. The original assumed an SDS always exists. |
| 4 | keyTakeaway 5 | "Keep the status determination statement and a short working practices note on file from day one" | "Keep a short working practices note on file from day one, plus the client's status determination statement where one is issued" | Same §1.A point as edit 3, carried into the takeaway. |
| 5 | Extraction section | "a voucher dated before the payment." | "a voucher dated before the payment is made." | Readability only, no factual change. |

4 factual edits, 1 wording edit. Body 1,105 words before, 1,140 after, still inside the 800 to 1,200 band. YAML re-validated after every edit: parses, 20 keys, metaTitle 51, metaDescription 152, keyTakeaways 5, faqs 6.

VERDICT: PASS
