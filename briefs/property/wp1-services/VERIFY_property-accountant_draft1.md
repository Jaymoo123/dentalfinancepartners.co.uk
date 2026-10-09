# Verify `/services/property-accountant`

Source: `/home/user/dentalfinancepartners.co.uk/Property/web/.next/server/app/services/property-accountant.html`  
Run: 2026-10-09 10:43 UTC  
Result: **2 BLOCK, 6 WARN** over 20 checks

| # | Check | Verdict | Detail |
|---|---|---|---|
| 1 | Title | PASS | "Property Accountants for UK Landlords and Investors \| Property Tax Partners" (51 chars page part) |
| 2 | H1 | PASS | "Property accountants for UK landlords and investors" |
| 3 | Heading hierarchy | WARN | 12 H2, 39 H3; 2 H2 without an id |
| 4 | FAQ parity (visible == schema) | PASS | 12 items, 0 answers absent from HTML |
| 5 | Offer parity (H3 == hasOfferCatalog) | PASS | 6 offers, 39 H3 |
| 6 | Coverage floor (assignment placements, R5) | PASS | 60/60 rows placed; coverage sentence found; 0 leaks |
| 7 | Equity preservation (pre-rewrite GSC queries still match) | PASS | 1 queries had impressions; 0 lost |
| 8 | Deferred facts (R7) in page copy | PASS | 0 hits; sections excluded as shared components: Work out your own numbers first, Talk to a property accountant about your portfolio |
| 9 | Stuffing | BLOCK | 1 blocks, 0 warnings |
| 10 | AI tells and house style | PASS | 0 em-dashes, 0 lexicon hits |
| 11 | Cross-page sameness (8-grams) | BLOCK | against 9 pages |
| 12 | Cross-surface consistency (offer names) | WARN | 12 mismatches |
| 13 | Links | PASS | 42 body links, 0 unresolved |
| 14 | Register probe | WARN | words 2199; sentence_len 21.1; flesch 56.6; question_headings_pct 23.5; you_per_1k 33.2; we_per_1k 24.1; statute_per_1k 0.0; jargon_per_1k 1.36; numbers_per_1k 19.6 |
| 15 | Section weight | WARN | 3 notes |
| 16 | No-JS render | PASS | 99 header links in HTML |
| 17 | JSON-LD | PASS | AccountingService x1, ImageObject x1, PostalAddress x1, Country x2, Organization x1, PropertyValue x1, Service x1, Audience x1, OfferCatalog x1, Offer x6, FAQPage x1, Question x12, Answer x12, BreadcrumbList x1, ListItem x3 |
| 18 | Cited sentences (ChatGPT) | PASS | not applicable to this page |
| 19 | Length (body words excluding FAQ) | WARN | 2578 words (3501 incl. FAQ) |
| 20 | Diff against snapshot (facts dropped) | WARN | 58 items in the snapshot and not here (no --dropped file: WARN only) |

## Quotes (what to fix, where)

**3. Heading hierarchy (WARN)**
- H2 without id: "Questions people ask"
- H2 without id: "Talk to a property accountant about your portfolio"

**9. Stuffing (BLOCK)**
- "property accountant" appears 22 times (6.3 per 1,000 words)

**11. Cross-page sameness (8-grams) (BLOCK)**
- 5 shared 8-word sequences with /services/property-tax-advice: a sale or a move into a company; report and pay within 60 days of completion; model the capital gains tax and stamp duty
- 4 shared 8-word sequences with /locations/london: is the difference between a property accountant and; the difference between a property accountant and a; we work with landlords and investors across the
- 3 shared 8-word sequences with /locations/birmingham: take over from my current accountant mid year; can you take over from my current accountant; you take over from my current accountant mid
- 3 shared 8-word sequences with /locations/bristol: take over from my current accountant mid year; can you take over from my current accountant; you take over from my current accountant mid
- 1 shared 8-word sequences with /services: what you own and how it is held
- 5 shared 8-word sequences with /: difference between a property accountant and a regular; is the difference between a property accountant and; what is the difference between a property accountant

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
- flesch = 56.6 (target 45 to 55)
- jargon_per_1k = 1.36 (target 0 to 1.0)

**15. Section weight (WARN)**
- section "What a property accountant does for you" has 503 words
- section "Questions people ask" has 925 words
- first sentence shares no term with its heading "Questions people ask": "What does a property accountant do?"

**20. Diff against snapshot (facts dropped) (WARN)**
- number: 04
- number: 10.75%
- number: 120
- number: 14
- number: 14%
- number: 15
- number: 168
- number: 17.
- number: 18%
- number: 2
- number: 20%
- number: 2026,
- number: 2027.
- number: 2028.
- number: 2031.
- number: 35.75%
- number: 39.35%
- number: 47%
- number: 5
- number: 600
- number: 7
- number: £20,000
- number: £50,000
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
- H3: Structure and planning
- H3: Structure decisions compound
- ... 18 more
