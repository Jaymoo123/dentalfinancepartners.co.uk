# Property page rewrite progress log

Session date: 2026-05-21.
Operator: Claude Opus 4.7.

## Summary

17 of 63 property page rewrites complete. All builds passing.

Total cumulative additions:
- ~38,000+ words added across 17 pages
- 140+ FAQs added (most pages 4 → 12-14)
- 50+ external authority links added (HMRC PIM, legislation.gov.uk, gov.uk)
- 13 factual corrections (MTD threshold ×6, council tax mechanics, statute references, calculation errors, etc.)
- 6 systemic site issues flagged for separate audit

## Pages complete

| # | Slug | Words | FAQs | Critical fixes |
|---|---|---|---|---|
| 1 | peterborough-property-accountant-specialist-tax-services | 1,535 → 3,400 | 4 → 14 | Reference template |
| 2 | hmo-vs-standard-buy-to-let-tax-comparison | 1,663 → 3,452 | 4 → 14 | Council tax post-Dec 2023, MTD threshold, incomplete S24 calc |
| 3 | best-mtd-software-landlords-2026 | 1,295 → 2,711 | 4 → 12 | Removed unverifiable PropertyBee, past-deadline reframe, added 9 verified products |
| 4 | income-tax-rates-landlords-2026-27-complete-guide | 1,492 → 2,964 | 4 → 12 | MTD threshold, em-dash, defensive (page is pos 1) |
| 5 | about (TSX) | minimal-touch | n/a | 2 em-dashes only; flagged structural issues for user judgment |
| 6 | hmo-licensing-fees-tax-deductible-uk-landlords | 10.7KB → 2,723w | 4 → 12 | MTD threshold, cash-vs-accruals, capital-vs-revenue, statute refs |
| 7 | multi-property-landlord-tax-planning-strategies-5-plus-properties | ~1,800 → 3,436 | 4 → 12 | MTD threshold ×2, associated companies rules, lender concentration, £250k ceiling |
| 8 | cgt-property-2027-rate-changes-uk-landlords | ~1,800 → 2,901 | 4 → 12 | MAJOR PIVOT: page premise of confirmed CGT rate changes was wrong; reframed |
| 9 | buy-to-let-limited-company-mortgage-rates-2026-market-guide | ~1,400 → 2,608 | 4 → 12 | Mortgage market depth + tax interaction |
| 10 | property-accountant-wolverhampton-specialist-tax-services | ~1,300 → 2,692 | 4 → 12 | MTD threshold, local data, full city template |
| 11 | how-much-does-a-property-accountant-cost | 1,900 → 2,307 | 8 → 12 | Targeted edits (existing was strong); MTD threshold, MTD live framing |
| 12 | property-accountant-leicester | ~1,300 → 3,170 | 3 → 12 | Full city template with student let / Article 4 specifics |
| 13 | ppr-relief-calculation-former-home-step-by-step | 1,506 → 2,310 | 4 → 10 | Deemed occupation rule corrected (3 years not 4), Letting Relief mechanics |
| 14 | cgt-annual-exempt-amount-3000-allowance-2026-27 | ~1,400 → 2,033 | 4 → 11 | £49,200 → £12,000 reporting threshold (factual error fixed) |
| 15 | leeds-property-accountant-specialist-tax-services | ~1,000 → 2,560 | 4 → 12 | City template + Article 4 (Headingley etc.) |
| 16 | property-accountant-swansea-landlord-tax-services | ~1,300 → 3,290 | 4 → 12 | Welsh-specific: LTT, Rent Smart Wales, Renting Homes Act 2016 |
| 17 | capital-gains-tax-property-sale-uk-2026-rates-allowances | ~1,300 → 2,300 | 4 → 12 | Pivoted to disposal mechanics (sibling owns rates), 60-day reporting depth |

## Site-wide issues flagged (require separate audit / decision)

1. **MTD threshold £10k vs £50k**: appears across multiple pages, including `mtd-10000-threshold-when-does-it-apply.md` where the **slug itself is wrong**. Estimated 5-10 more pages still need this fixed.

2. **PropertyBee references**: cannot verify it is a real product. Likely fictional. May appear on other pages beyond `best-mtd-software-landlords-2026.md` (now removed there).

3. **Near-duplicate page pairs** (cannibalisation):
   - `hmo-licensing-fees-tax-deductible-uk-landlords.md` vs `hmo-licensing-costs-tax-deductible.md` — "fees" is the established ranker, "costs" gets zero impressions. Recommend redirect.
   - `landlord-accounting-software-uk-2026.md` vs `landlord-accounting-software-uk-best-options-2026.md` — both rank weakly for same queries.
   - `property-accounting-software-uk.md` vs `property-accounting-software-uk-2026.md` — duplicates.
   - `2027-property-tax-rates-affect-capital-gains-tax-sales.md` vs `2027-property-tax-rates-cgt-capital-gains-changes.md` vs `cgt-property-2027-rate-changes-uk-landlords.md` — three pages on similar topic. Page 8 was reframed to differentiate.

4. **About page** (TSX, /about): contains unverifiable stats ("100+ landlords served", "£2.4M+ tax savings identified"). Positioning treats Property Tax Partners as a firm doing the work directly, but memory indicates these are lead-gen handoff sites to partner firms. Needs business-model clarity from user.

5. **Past-dated "future" content**: many MTD pages were written treating April 2026 as future. The mandate is now live (current date 2026-05-21). Wholesale audit needed.

6. **FAQ schema is being emitted properly** via `buildBlogPostingJsonLd` fallback (confirmed during page 1 work). This was a DeepSeek brief assumption that was wrong on many pages.

## Pages remaining (top 46 by priority score)

| Range | Approximate count | Notes |
|---|---|---|
| Score 6.0-6.5 | ~5 pages | mortgage-interest-tax-relief-changes, liverpool, landlord-insurance, sdlt-buy-to-let, rent-a-room |
| Score 5.0-5.9 | ~10 pages | various CGT/MTD/incorporation pages |
| Score 4.0-4.9 | ~15 pages | mid-priority pages |
| Score 3.0-3.9 | ~10 pages | longer-tail content |
| Score 1.0-2.9 | ~6 pages | low-priority defensive rewrites |

## How to continue in a fresh session

1. **Read this document and the playbook** at `docs/competitor_rewrite_playbook.md`.
2. **Pull the next batch** of briefs by priority order:
   ```bash
   python -m optimisation_engine.competitor.brief_for_opus --site property --top 30
   ```
   (or use the briefs already generated at `briefs/property/`)
3. **Per-page workflow** (from the playbook):
   - Read the brief
   - Read the source markdown file
   - Pull GSC data for cannibalisation context
   - Fetch competitor URLs to verify DeepSeek claims
   - Rewrite the page
   - Run `cd Property/web && npm run build`
   - Verify FAQ schema count matches frontmatter
4. **Apply the universal rules**:
   - No em-dashes (use commas, parentheses, full stops)
   - No Tailwind utility classes in markdown (use semantic HTML)
   - Inline CTA pattern: `<aside><p>Heading</p><p>Body</p></aside>`
   - MTD threshold: £50k from April 2026, £30k from April 2027, £20k from April 2028 (NEVER £10k)
   - Date all rewrites: 2026-05-21 (current date as of this session)
5. **Cannibalisation discipline**: always check sibling pages on the same topic before writing. Stay distinct in scope or link out rather than duplicate.

## Voice rules established (from feedback)

- No em-dashes anywhere
- "Practical advice, no hard sell" brand voice
- Anonymised social proof only
- Specific figures and named legislation, not vague hedges
- Lead form is template-injected at bottom; never duplicate in body
- 1-3 inline CTA asides per page at high-intent moments

## Deploy status

None of these rewrites have been deployed yet. The Property site uses `cd Property && vercel deploy --prod` per memory. GitHub auto-deploy is OFF. The user should deploy when satisfied with the batch.

## Cost ledger

DeepSeek cost (analysis pipeline): $0.11 total for all 93 pages
Claude Opus 4.7 cost (writing): substantial context consumption, hard to quantify per page
