# Track A factual QA: charity-income-from-charitable-activities-vs-donations

Date: 2026-09-27. Reviewer: Track A (Opus). Tie-breaker: `docs/charities/house_positions.md`.

**Verdict: PASS** (1 edit, precision fix; no wrong figures, none removed).

## Assertions

| # | Assertion | Location | Source | Grade |
|---|---|---|---|---|
| 1 | Donations and legacies = giver receives nothing back; charitable activities = charity delivers something as part of its purposes | summary, intro, H2s 1-2, FAQ 1 | Charities SORP income analysis; HP silent on the categorisation test, no HP conflict | CORRECT |
| 2 | A general purpose grant sits under donations; a performance related grant with enforceable delivery sits under charitable activities | H2 3, FAQ 2, takeaway 2 | SORP substance-over-label; no HP conflict | CORRECT |
| 3 | Restricted vs unrestricted is a fund question, not an income category question | H2 4, FAQ 3, takeaway 3 | SORP SoFA structure | CORRECT |
| 4 | Gift Aid claim is 25p per £1 donated | H2 2 | HP14 | CORRECT |
| 5 | Non primary purpose trading exempt only within small trading limits | H2 5, FAQ 5 | HP12 | CORRECT |
| 6 | Limit tiers: max £8,000 turnover where gross income under £32,000; 25% of total income where £32,000 to £320,000; £80,000 where over £320,000 | H2 5, FAQ 5 | HP12 (all three tiers plus both boundaries present) | CORRECT |
| 7 | Breaching the limit taxes all profits of that trade, not just the excess | H2 5, FAQ 5 | HP12 | CORRECT |
| 8 | Trading subsidiary is the usual answer where the trade outgrows the limits | H2 5 | HP13 | CORRECT |
| 9 | Every registered charity files an annual return | H2 6, FAQ 6 | HP2 (all registered charities file; content is tiered) | CORRECT |
| 10 | Annual return due within 10 months of financial year end | H2 6, FAQ 6 | HP2 | CORRECT |
| 11 | Charities with gross income over £25,000 must also attach the trustees annual report and accounts | H2 6, FAQ 6 | HP2 | CORRECT |
| 12 | SORP 2026 applies to accounting periods starting on or after 1 January 2026 | H2 6, takeaway 5 | HP7 | CORRECT (takeaway reworded, see edits) |
| 13 | Non company charities with gross income of £250,000 or less may prepare receipts and payments accounts, rising to £500,000 for financial years ending on or after 30 September 2026 | H2 6 | HP6 (ENDING rule) | CORRECT |
| 14 | Charitable companies must always prepare accruals accounts | H2 6 | HP6 | CORRECT |
| 15 | Scottish charities report to OSCR and all need external scrutiny whatever their income, no lower limit | H2 Scotland | HP26, open flag 3 CLOSED 2026-09-13, may be stated as fact | CORRECT |

SORP tier thresholds (open flag 1) are **not** asserted anywhere in the post. Confirmed by search: no Tier 1/2/3 language, no tier income figures. CIC34 fee (open flag 2) not in scope here.

## Edits made (1)

- keyTakeaway 5: "Accruals accounts follow the Charities SORP for accounting periods starting on or after 1 January 2026" conflated the standing accruals-follows-SORP rule with the SORP 2026 commencement date, implying the SORP itself only starts in 2026. Reworded to "Accruals accounts follow the Charities SORP, with SORP 2026 applying to accounting periods starting on or after 1 January 2026". The body already had the HP7 framing correct; only the takeaway was loose.

## Figures removed

None. No unsourced figure appears in the post.

## Internal links (5 of 5 allowed, all verified on disk)

| Link | Target | Category slugifies to path |
|---|---|---|
| /blog/trustee-compliance/charity-commission-annual-return-guide | `charities/web/content/blog/charity-commission-annual-return-guide.md` | Trustee Compliance, yes |
| /blog/gift-aid/charity-trading-subsidiary-gift-aid | `charities/web/content/blog/charity-trading-subsidiary-gift-aid.md` | Gift Aid, yes |
| /blog/trustee-compliance/annual-report-vs-annual-return | `charities/web/content/blog/annual-report-vs-annual-return.md` | Trustee Compliance, yes |
| /blog/trustee-compliance/trustees-annual-report-guide | `charities/web/content/blog/trustees-annual-report-guide.md` | Trustee Compliance, yes |
| /blog/charity-accounts-and-sorp/charity-sorp-2026-changes | `charities/web/content/blog/charity-sorp-2026-changes.md` | Charity Accounts and SORP, yes |

## Frontmatter

All required keys present. `date`, `dateModified` and `updatedDate` all "2026-09-27". Category "Charity Accounts and SORP" is verbatim from the brief list and matches the canonical path. metaTitle 59 chars, metaDescription 151 chars, summary 50 words, 6 FAQs, 5 keyTakeaways, author and generator correct. YAML re-parsed clean after the edit.

## Counts after edit

Body 1,061 words. No em-dashes in frontmatter or body.

## Notes for Track B

- Three of the five links point at Trustee Compliance posts; check for overlap with `charity-annual-return-related-party-transactions` in this wave, which covers the same return.
- The small trading tiers appear twice, in H2 5 and FAQ 5, in near-identical wording. Figures are locked by HP12 and must not change, but the prose can be varied.
- FAQ 1 and H2s 1-2 restate the same test three times; check whether that reads as padding against the 800 to 1,200 band.
- "A specialist reviews the classification" phrasing is present as required; no banned claims found.
