# Verify `/services/property-accountant`

Source: `/home/user/dentalfinancepartners.co.uk/Property/web/.next/server/app/services/property-accountant.html`  
Run: 2026-10-09 11:18 UTC  
Result: **0 BLOCK, 6 WARN** over 20 checks

| # | Check | Verdict | Detail |
|---|---|---|---|
| 1 | Title | PASS | "Property Accountants for UK Landlords and Investors \| Property Tax Partners" (51 chars page part) |
| 2 | H1 | PASS | "Property accountants for UK landlords and investors" |
| 3 | Heading hierarchy | PASS | 12 H2, 35 H3; 0 H2 without an id |
| 4 | FAQ parity (visible == schema) | PASS | 12 items, 0 answers absent from HTML |
| 5 | Offer parity (H3 == hasOfferCatalog) | PASS | 6 offers, 35 H3 |
| 6 | Coverage floor (assignment placements, R5) | PASS | 60/60 rows placed; coverage sentence found; 0 leaks |
| 7 | Equity preservation (pre-rewrite GSC queries still match) | PASS | 1 queries had impressions; 0 lost |
| 8 | Deferred facts (R7) in page copy | PASS | 0 hits; sections excluded as shared components: Work out your own numbers first, Talk to us about your portfolio |
| 9 | Stuffing | PASS | 0 blocks, 0 warnings |
| 10 | AI tells and house style | PASS | 0 em-dashes, 0 lexicon hits |
| 11 | Cross-page sameness (8-grams) | WARN | against 9 pages |
| 12 | Cross-surface consistency (offer names) | WARN | 12 mismatches |
| 13 | Links | PASS | 46 body links, 0 unresolved |
| 14 | Register probe | WARN | words 2061; sentence_len 21.2; flesch 57.8; question_headings_pct 25.5; you_per_1k 35.9; we_per_1k 26.2; statute_per_1k 0.0; jargon_per_1k 0.0; numbers_per_1k 17.0 |
| 15 | Section weight | WARN | 4 notes |
| 16 | No-JS render | PASS | 99 header links in HTML |
| 17 | JSON-LD | PASS | AccountingService x1, ImageObject x1, PostalAddress x1, Country x2, Organization x1, PropertyValue x1, Service x1, Audience x1, OfferCatalog x1, Offer x6, FAQPage x1, Question x12, Answer x12, BreadcrumbList x1, ListItem x3 |
| 18 | Cited sentences (ChatGPT) | PASS | not applicable to this page |
| 19 | Length (body words excluding FAQ) | WARN | 2440 words (3350 incl. FAQ) |
| 20 | Diff against snapshot (facts dropped) | WARN | 66 items in the snapshot and not here (no --dropped file: WARN only) |

## Quotes (what to fix, where)

**11. Cross-page sameness (8-grams) (WARN)**
- 1 shared 8-word sequences with /services/property-tax-advice: and we quote it as a fixed fee
- 1 shared 8-word sequences with /locations/london: we work with landlords and investors across the
- 3 shared 8-word sequences with /locations/birmingham: take over from my current accountant mid year; you take over from my current accountant mid; can you take over from my current accountant
- 3 shared 8-word sequences with /locations/bristol: take over from my current accountant mid year; you take over from my current accountant mid; can you take over from my current accountant

**12. Cross-surface consistency (offer names) (WARN)**
- offer "Rental accounts and Self Assessment" not named on /services
- offer "Rental accounts and Self Assessment" not named on /
- offer "Property company and SPV accounts" not named on /services
- offer "Property company and SPV accounts" not named on /
- offer "Making Tax Digital quarterly filing" not named on /services
- offer "Making Tax Digital quarterly filing" not named on /
- offer "Capital gains tax on sales" not named on /services
- offer "Capital gains tax on sales" not named on /
- offer "Incorporation and structuring advice" not named on /services
- offer "Incorporation and structuring advice" not named on /
- offer "Commercial property accounts" not named on /services
- offer "Commercial property accounts" not named on /

**14. Register probe (WARN)**
- flesch = 57.8 (target 45 to 55)

**15. Section weight (WARN)**
- section "What a property accountant does for you" has 515 words
- section "Questions people ask" has 912 words
- first sentence shares no term with its heading "Questions people ask": "What does a property accountant do?"
- section "Where we work" has 31 words

**20. Diff against snapshot (facts dropped) (WARN)**
- number: 04
- number: 10.75%
- number: 100
- number: 105
- number: 108
- number: 120
- number: 14
- number: 14%
- number: 15
- number: 168
- number: 17
- number: 17.
- number: 18%
- number: 2
- number: 20%
- number: 2026.
- number: 2027.
- number: 2028.
- number: 2031.
- number: 35.75%
- number: 39.35%
- number: 47%
- number: 5
- number: 600
- number: 7
- H3: A fixed quote and a scope you can read
- H3: Bookkeeping through the year, or a year end return
- H3: Capital gains and disposals
- H3: Capital versus revenue is where the money sits
- H3: Company accounts for property SPVs
- H3: Do I need a property accountant near me?
- H3: Free consultation
- H3: How many properties you hold
- H3: Making Tax Digital
- H3: Onboarding and clearance
- H3: Personally, in a company, or both
- H3: Property has its own deadlines
- H3: Property is one part of a wider position
- H3: Rental accounts and bookkeeping
- H3: Self Assessment for rental income
- ... 26 more
