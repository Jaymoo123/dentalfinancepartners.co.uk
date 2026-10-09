# Verify `/services/property-tax-advice`

Source: `/home/user/dentalfinancepartners.co.uk/Property/web/.next/server/app/services/property-tax-advice.html`  
Run: 2026-10-09 10:47 UTC  
Result: **0 BLOCK, 5 WARN** over 20 checks

| # | Check | Verdict | Detail |
|---|---|---|---|
| 1 | Title | PASS | "Property Tax Advice from Specialist Advisors \| Property Tax Partners" (44 chars page part) |
| 2 | H1 | PASS | "Property tax advice from specialist advisors" |
| 3 | Heading hierarchy | PASS | 14 H2, 31 H3; 0 H2 without an id |
| 4 | FAQ parity (visible == schema) | PASS | 12 items, 0 answers absent from HTML |
| 5 | Offer parity (H3 == hasOfferCatalog) | PASS | 6 offers, 31 H3 |
| 6 | Coverage floor (assignment placements, R5) | PASS | 34/34 rows placed; coverage sentence found; 0 leaks |
| 7 | Equity preservation (pre-rewrite GSC queries still match) | PASS | 22 queries had impressions; 0 lost |
| 8 | Deferred facts (R7) in page copy | PASS | 0 hits; sections excluded as shared components: Run the numbers yourself first, Get specialist advice from a property tax adviser on the decision in front of you |
| 9 | Stuffing | PASS | 0 blocks, 0 warnings |
| 10 | AI tells and house style | PASS | 0 em-dashes, 0 lexicon hits |
| 11 | Cross-page sameness (8-grams) | PASS | against 9 pages |
| 12 | Cross-surface consistency (offer names) | WARN | 12 mismatches |
| 13 | Links | PASS | 39 body links, 0 unresolved |
| 14 | Register probe | WARN | words 1976; sentence_len 22.5; flesch 55.6; question_headings_pct 28.9; you_per_1k 29.9; we_per_1k 30.4; statute_per_1k 0.0; jargon_per_1k 0.51; numbers_per_1k 26.8 |
| 15 | Section weight | WARN | 2 notes |
| 16 | No-JS render | PASS | 99 header links in HTML |
| 17 | JSON-LD | PASS | AccountingService x1, ImageObject x1, PostalAddress x1, Country x2, Organization x1, PropertyValue x1, Service x1, Audience x1, OfferCatalog x1, Offer x6, FAQPage x1, Question x12, Answer x12, BreadcrumbList x1, ListItem x3 |
| 18 | Cited sentences (ChatGPT) | WARN | no fact map supplied (--cited-facts); BING_G holds entry paths only, the sentence list is written at step 4 |
| 19 | Length (body words excluding FAQ) | PASS | 2393 words (3320 incl. FAQ) |
| 20 | Diff against snapshot (facts dropped) | WARN | 47 items in the snapshot and not here (no --dropped file: WARN only) |

## Quotes (what to fix, where)

**12. Cross-surface consistency (offer names) (WARN)**
- offer "Incorporation and structuring advice" not named on /services
- offer "Incorporation and structuring advice" not named on /
- offer "Capital gains tax planning on a sale or gift" not named on /services
- offer "Capital gains tax planning on a sale or gift" not named on /
- offer "Section 24 and finance-cost planning" not named on /services
- offer "Section 24 and finance-cost planning" not named on /
- offer "Stamp duty land tax on purchases and transfers" not named on /services
- offer "Stamp duty land tax on purchases and transfers" not named on /
- offer "Inheritance tax and succession planning for portfolios" not named on /services
- offer "Inheritance tax and succession planning for portfolios" not named on /
- offer "HMRC enquiries and undeclared income disclosures" not named on /services
- offer "HMRC enquiries and undeclared income disclosures" not named on /

**14. Register probe (WARN)**
- sentence_len = 22.5 (target 17 to 22)
- flesch = 55.6 (target 45 to 55)
- we_per_1k = 30.4 (target 20 to 30)
- numbers_per_1k = 26.8 (target 15 to 25)

**15. Section weight (WARN)**
- section "Questions about a consultation" has 929 words
- first sentence shares no term with its heading "Questions about a consultation": "What does a property tax advisor do?"

**20. Diff against snapshot (facts dropped) (WARN)**
- number: 04
- number: 05
- number: 10.75%
- number: 100%
- number: 11
- number: 120
- number: 14
- number: 14%
- number: 15%
- number: 168
- number: 18
- number: 198
- number: 2
- number: 2016.
- number: 2024
- number: 2026.
- number: 2031,
- number: 30
- number: 35.75%
- number: 39.35%
- number: 6%
- number: 7
- number: £1
- number: £2.5
- number: £30,000
- number: £5,000
- number: £50,000
- H3: Analysis and modelling
- H3: Capital allowances on commercial and mixed property
- H3: Capital gains tax timing and reliefs
- H3: Do you work with landlords outside London?
- H3: Fixed scope and fee
- H3: How quickly can I get advice?
- H3: Implementation, only if you want it
- H3: Inheritance tax and portfolio succession
- H3: Non-resident and cross-border positions
- H3: Scoping call
- H3: Section 24 mitigation
- H3: Structuring and ownership
- H3: What the 2027 rate changes do to Section 24 relief
- ... 7 more
