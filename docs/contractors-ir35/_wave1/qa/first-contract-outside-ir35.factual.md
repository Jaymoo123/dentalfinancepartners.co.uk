# Track A factual QA: first-contract-outside-ir35

Reviewed 2026-09-27 against `docs/contractors-ir35/house_positions.md` (locked 2026-06-12) and, where house positions is silent, primary law on legislation.gov.uk / gov.uk. Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13, S4a, "QA".

## Assertions

| # | Section | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | stats | VAT registration threshold £90,000, frozen since 1 April 2024 | HP §9 (VATA 1994 Sch 1) | CORRECT |
| 2 | stats | Basic rate dividend tax 10.75% from 6 April 2026, up from 8.75% | HP §5 (ITA 2007 s.8 as amended by FA 2026 s.4) | CORRECT |
| 3 | stats | Corporation tax 19% to 25%, 2026/27 | HP §7 (CTA 2010 Part 3) | CORRECT |
| 4 | stats | £6,708 lower earnings limit, common single director salary target 2026/27 | HP §6 and §8 | CORRECT |
| 5 | intro | Incorporation, bank, VAT, PAYE and first dividend each run on their own clock | Process statement, no figure | CORRECT (non-numeric) |
| 6 | challenge 1 | VAT number arrives weeks after applying, PAYE references take time | Process statement, no figure | UNSOURCED (process, no figure, retained) |
| 7 | challenge 2 | Registration compulsory once VAT taxable turnover passes £90,000 in a rolling 12 months | HP §9 | CORRECT |
| 8 | challenge 2 | Or is expected to pass it in the next 30 days | HP §9 (VATA 1994 Sch 1 para 1(1)(b)) | CORRECT |
| 9 | challenge 2 | VAT registered end client recovers the VAT charged, so the invoice costs no more | HP §9 (voluntary registration rationale) | CORRECT |
| 10 | challenge 2 | Limited cost trader: goods spend under 2% of turnover gives a 16.5% flat rate | HP §9 (VAT Notice 733) | CORRECT (the alternative £1,000-a-year limb is omitted, not misstated) |
| 11 | challenge 2 | 16.5% wipes out most of the benefit for a labour only contractor | HP §9 house stance | CORRECT |
| 12 | challenge 3 | Corporation tax 19% on profits up to £50,000, 25% above £250,000 | HP §7 | CORRECT |
| 13 | challenge 3 | Marginal relief in between, effective rate about 26.5% | HP §7 (standard fraction 3/200) | CORRECT |
| 14 | challenge 3 | Dividends only from profit after corporation tax | HP §8; CA 2006 Part 23 | CORRECT |
| 15 | challenge 3 | Corporation tax due nine months after the year end | CTA 2010 / TMA, nine months and one day; page says "nine months later", a rounding in prose not a stated due date | CORRECT |
| 16 | challenge 4 | A client determination or CEST result is a useful first screen, binds no tribunal | HP §17.A | CORRECT |
| 17 | challenge 4 | Wording does not survive contrary working practices; check at start and each renewal | HP §17.B, §17.D | CORRECT |
| 18 | howWeHelp 1 | Formation, corporation tax registration, PAYE scheme, VAT application as separate registrations | gov.uk company registration / PAYE registration | CORRECT |
| 19 | howWeHelp 2 | Status factors: control, substitution, part and parcel | HP §2 | CORRECT |
| 20 | howWeHelp 3 | RTI submissions from the first pay run | HP §6 context; ITEPA PAYE RTI regulations | CORRECT |
| 21 | howWeHelp 4 | Distributable profit, board minute and dividend voucher needed before payment | CA 2006 Part 23 (s.830, s.836); HP §14 by implication | CORRECT |
| 22 | howWeHelp 4 | Dividend rates for 2026/27 are 10.75% and 35.75% after the £500 allowance | HP §5, §8 | CORRECT |
| 23 | faq 1 | Incorporation usually same day; bank, PAYE references and VAT number run longer | Companies House online incorporation is normally within 24 hours (gov.uk) | UNSOURCED (process claim, within gov.uk's stated norm, retained) |
| 24 | faq 2 | Employment Allowance £10,500 not available to a single director company with no other employees | HP §6 (NICA 2014) | CORRECT |
| 25 | faq 2 | Usual salary range between the £5,000 secondary threshold and the £6,708 LEL | HP §8 | CORRECT |
| 26 | faq 2 | LEL protects a qualifying National Insurance year | HP §6, §8 | CORRECT |
| 27 | faq 2 | Where the allowance is claimable, salary up to £12,570 is often better; model it | HP §8, including the "no single optimal salary" stance | CORRECT |
| 28 | faq 3 | Dividend only from distributable profit, after corporation tax and provisions | CA 2006 s.830; HP §8 | CORRECT |
| 29 | faq 3 | Dividend taxed in the tax year the payment is made | ITTOIA 2005 Part 4 | CORRECT |
| 30 | faq 3 | Drawing with no distributable profit creates a director loan | HP §14 (s.455 CTA 2010) | CORRECT |
| 31 | faq 4 | Small end client: Chapter 10 does not apply, status stays with the PSC under Chapter 8 | HP §1, §1.A (ITEPA 2003 ss.48 to 61, ss.61K to 61X, s.60A) | CORRECT |
| 32 | faq 4 | Small thresholds rose for financial years beginning on or after 6 April 2025 to £15m turnover and £7.5m balance sheet, 50 employees unchanged | HP §1.A (CA 2006 s.382) | CORRECT |
| 33 | faq 4 | Two consecutive years rule plus filing lag means earliest exit 6 April 2027; assume in scope for 2026/27 | HP §1.A | CORRECT |
| 34 | faq 5 | Outside IR35 travel to a temporary workplace generally allowable | HP §10 (ITEPA 2003 ss.337 to 339) | CORRECT |
| 35 | faq 5 | Workplace stops being temporary at more than 40% of working time over a period exceeding 24 months | HP §10 (s.339(5)/(6)) | CORRECT |
| 36 | faq 5 | The test turns on expectation, so relief stops when the expectation forms, not at month 24 | HP §10 | CORRECT |
| 37 | faq 5 | Mileage 55p a mile for the first 10,000 business miles from 6 April 2026 | HP §10 (AMAP, ITEPA ss.229 to 236) | CORRECT |

No WRONG, no STALE. Every rate and threshold carries its 2026/27 or effective-date tag; none of the superseded figures (8.75%/33.75% dividends, 13.8%/£9,100 employer NIC, £85,000 VAT, 45p AMAP, £10.2m/£5.1m small-company limits, £40,000 annual allowance) appear.

## Sources array

Covers every numeric assertion on the page. Two observations, neither a factual defect:

- §11 (pensions, £60,000 annual allowance, three year carry forward) is cited but the page carries no pension content. Unused entry.
- The distributable profit, board minute, dividend voucher and director loan assertions (rows 21, 28, 30) rest on CA 2006 Part 23 and HP §14, neither of which is in the array.

## Internal links

| Link | On disk | Result |
|---|---|---|
| `/blog/contractor-accounting-basics/first-contract-outside-ir35-checklist` | `contractors-ir35/web/content/blog/first-contract-outside-ir35-checklist.md`, `category: Contractor Accounting Basics` | OK |
| `/blog/contractor-accounting-basics/set-up-limited-company-contractor` | `contractors-ir35/web/content/blog/set-up-limited-company-contractor.md`, `category: Contractor Accounting Basics` | OK |
| `/calculators/outside-ir35-take-home-calculator` | `contractors-ir35/web/src/lib/calculators/tools/outside-ir35-take-home-calculator.ts` | OK |
| `/calculators/contractor-salary-dividend-calculator` | `contractors-ir35/web/src/lib/calculators/tools/contractor-salary-dividend-calculator.ts` | OK |

## Edit log

No edits. The JSON is unchanged and parses.

## Referred to Track B (not factual, not edited here)

- Word count across intro, challenges, howWeHelp and faqs including section titles and questions is **1,202**, two words over the 800 to 1,200 band. Trim belongs with the editorial reviewer.
- `metaTitle` 42 characters, `metaDescription` 157 characters, both inside the spec limits.

VERDICT: PASS
