# Verify `/services/landlord-accountant`

Source: `/home/user/dentalfinancepartners.co.uk/Property/web/.next/server/app/services/landlord-accountant.html`  
Run: 2026-10-09 10:47 UTC  
Result: **0 BLOCK, 4 WARN** over 20 checks

| # | Check | Verdict | Detail |
|---|---|---|---|
| 1 | Title | PASS | "Landlord Accountant for UK Rental Income and Buy to Let \| Property Tax Partners" (55 chars page part) |
| 2 | H1 | PASS | "Landlord accountants for UK rental income" |
| 3 | Heading hierarchy | PASS | 12 H2, 27 H3; 0 H2 without an id |
| 4 | FAQ parity (visible == schema) | PASS | 12 items, 0 answers absent from HTML |
| 5 | Offer parity (H3 == hasOfferCatalog) | PASS | 6 offers, 27 H3 |
| 6 | Coverage floor (assignment placements, R5) | PASS | 58/58 rows placed; coverage sentence found; 0 leaks |
| 7 | Equity preservation (pre-rewrite GSC queries still match) | PASS | 26 queries had impressions; 0 lost |
| 8 | Deferred facts (R7) in page copy | PASS | 0 hits; sections excluded as shared components: Speak to an accountant about your rental income |
| 9 | Stuffing | PASS | 0 blocks, 0 warnings |
| 10 | AI tells and house style | PASS | 0 em-dashes, 0 lexicon hits |
| 11 | Cross-page sameness (8-grams) | PASS | against 9 pages |
| 12 | Cross-surface consistency (offer names) | WARN | 12 mismatches |
| 13 | Links | PASS | 43 body links, 0 unresolved |
| 14 | Register probe | WARN | words 2028; sentence_len 21.3; flesch 60.0; question_headings_pct 30.8; you_per_1k 38.0; we_per_1k 26.1; statute_per_1k 0.0; jargon_per_1k 0.0; numbers_per_1k 28.6 |
| 15 | Section weight | WARN | 1 notes |
| 16 | No-JS render | PASS | 99 header links in HTML |
| 17 | JSON-LD | PASS | AccountingService x1, ImageObject x1, PostalAddress x1, Country x2, Organization x1, PropertyValue x1, Service x1, Audience x1, OfferCatalog x1, Offer x6, FAQPage x1, Question x12, Answer x12, BreadcrumbList x1, ListItem x3 |
| 18 | Cited sentences (ChatGPT) | PASS | not applicable to this page |
| 19 | Length (body words excluding FAQ) | PASS | 2378 words (3340 incl. FAQ) |
| 20 | Diff against snapshot (facts dropped) | WARN | 61 items in the snapshot and not here (no --dropped file: WARN only) |

## Quotes (what to fix, where)

**12. Cross-surface consistency (offer names) (WARN)**
- offer "Self Assessment for rental income" not named on /services
- offer "Self Assessment for rental income" not named on /
- offer "Section 24 finance-cost workings" not named on /services
- offer "Section 24 finance-cost workings" not named on /
- offer "Making Tax Digital quarterly updates" not named on /services
- offer "Making Tax Digital quarterly updates" not named on /
- offer "Buy-to-let company accounts and Corporation Tax" not named on /services
- offer "Buy-to-let company accounts and Corporation Tax" not named on /
- offer "Portfolio accounts and pooling" not named on /services
- offer "Portfolio accounts and pooling" not named on /
- offer "Undeclared rental income disclosures" not named on /services
- offer "Undeclared rental income disclosures" not named on /

**14. Register probe (WARN)**
- flesch = 60.0 (target 45 to 55)
- numbers_per_1k = 28.6 (target 15 to 25)

**15. Section weight (WARN)**
- section "Questions landlords ask" has 964 words

**20. Diff against snapshot (facts dropped) (WARN)**
- number: 04
- number: 10.75%
- number: 120
- number: 14
- number: 14%
- number: 15%
- number: 168
- number: 2015
- number: 2015,
- number: 2016.
- number: 2028
- number: 2031.
- number: 24,
- number: 35.75%
- number: 39.35%
- number: 47%
- number: 5%
- number: 7
- number: £20,000.
- number: £30,000,
- number: £5,000
- number: £5,000.
- H3: Allowances and stamp duty
- H3: Capital allowances and repairs
- H3: Company accounts and corporation tax
- H3: Consultation
- H3: Disposals and inheritance planning
- H3: Do you advise on inheritance tax for a portfolio?
- H3: Do you work with landlords outside your local area?
- H3: Four to ten properties, mixed ownership
- H3: Handover and setup
- H3: Living abroad, letting in the UK
- H3: Making Tax Digital
- H3: One flat, first tax return
- H3: Planned disposals
- H3: Rapid acquisition phase
- H3: Rental accounts and Self Assessment
- H3: Scope and fixed quote
- H3: Section 24 planning
- H3: Structure and joint ventures
- ... 21 more
