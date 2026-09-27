# Track A factual QA: contractor-pension-carry-forward

Site: contractors-ir35. Reviewed 2026-09-27 against `docs/contractors-ir35/house_positions.md`
(HP §5, §7, §8, §9, §11), FA 2004 Part 4 and FA 2026 (c. 11). Row type: PARTIAL / extend of the
live post `contractors-ir35/web/content/blog/contractor-pension-carry-forward.md`.

**Verdict: PASS** (1 edit). Body 933 words. No web fetch needed: every assertion is covered by a
locked house position.

## Assertions

| # | Assertion | Where | Grade | Source |
|---|---|---|---|---|
| 1 | Annual allowance £60,000 for 2026/27 | summary, takeaway 1, intro, table, H2 4 | CORRECT | HP §11; FA 2004 s.228 |
| 2 | Unused allowance carries forward from the previous three tax years | throughout | CORRECT | HP §11; FA 2004 s.228A |
| 3 | For 2026/27 the carry forward years are 2023/24, 2024/25, 2025/26 | intro, FAQ 1 | CORRECT | derived from #2 |
| 4 | Maximum £240,000 in one year on four clear years | summary, intro, FAQ 1 | CORRECT | 4 x £60,000; AA was £60,000 from 2023/24 |
| 5 | Order of use: current year first, then earliest carry forward year first | H2 1, takeaway 1 | CORRECT | FA 2004 s.228A(3); PTM055100 |
| 6 | The allowance is measured across all schemes, employer and personal combined | intro, FAQ 1 | CORRECT | HP §11 |
| 7 | Taper: threshold income > £200,000 AND adjusted income > £260,000, £1 for £2, £10,000 floor | takeaway 3, FAQ 4, H2 4 | CORRECT | HP §11; FA 2004 s.228ZA |
| 8 | Both taper tests must be met | FAQ 4, H2 4 | CORRECT | HP §11 |
| 9 | Employer contributions are added back into adjusted income | FAQ 4, H2 4 | CORRECT | FA 2004 s.228ZA(4) |
| 10 | Carry forward from a tapered year is the tapered amount, not £60,000 | FAQ 4, H2 5 | CORRECT | FA 2004 s.228A(2)(b) |
| 11 | MPAA £10,000, unused MPAA cannot be carried forward | takeaway 4, FAQ 5, H2 4 | CORRECT | HP §11; FA 2004 s.227B |
| 12 | Flexi-access drawdown income and UFPLS trigger the MPAA; tax-free lump sum alone plus undrawn drawdown does not | FAQ 5, H2 4 | CORRECT | FA 2004 s.227G; PTM056500 |
| 13 | MPAA applies from the trigger date onward | FAQ 5 | CORRECT | FA 2004 s.227B |
| 14 | Carry forward needs scheme membership in the year, not contributions | takeaway 4, FAQ 3, H2 5 | CORRECT | FA 2004 s.228A(2) |
| 15 | Personal contribution relief capped at 100% of relevant UK earnings; dividends are not relevant earnings | takeaway 2, FAQ 2, H2 2 | CORRECT | HP §11; FA 2004 s.190 |
| 16 | Employer contribution has no earnings cap, only AA, carry forward and wholly and exclusively | takeaway 2, FAQ 2, H2 2, H2 6 | CORRECT | HP §11 |
| 17 | Director salary £6,708 as the low-salary illustration | FAQ 2, H2 2 | CORRECT | HP §7, §9 (LEL £6,708) |
| 18 | Employer contribution deductible on a paid basis, no employer or employee NIC, no income tax on the director | H2 3, FAQ 6 | CORRECT | HP §11; FA 2004 s.196 |
| 19 | Deduction and tax year both follow the date paid, not accrual | FAQ 6, H2 6 | CORRECT | HP §11; FA 2004 s.196(2) |
| 20 | 2023/24 carry forward lapses if unused by 5 April 2027 | H2 1, FAQ 6 | CORRECT | three-year window |
| 21 | Small profits limit £50,000; marginal band effective rate 26.5% | H2 3 | CORRECT | HP §8 (19% / 25% / 3/200) |
| 22 | CT saved on a £90,000 contribution out of £150,000 profit = £23,850 | H2 3 | CORRECT | £90,000 x 26.5%; both £150,000 and £60,000 sit inside the marginal band |
| 23 | Dividend rates 10.75% / 35.75% | H2 3 | CORRECT | HP §5; FA 2026 s.4 |
| 24 | Worked table: £50,000 + £40,000 + £30,000 unused, £180,000 total, £90,000 paid leaves £20,000 of 2023/24 to lapse | H2 1 | CORRECT | arithmetic checked; flagged as illustrative in the body |

WRONG: none. STALE: none. UNSOURCED: none. No figures removed.

## Internal links (5, the cap)

All five targets exist on disk, all in `contractors-ir35/web/content/blog/`, and each link's
category path segment matches the target's own `category`:

| Link | Target | Category match |
|---|---|---|
| /blog/pension-and-dividends/contractor-pension-employer-contributions | `contractor-pension-employer-contributions.md` | Pension and Dividends |
| /blog/pension-and-dividends/contractor-pension-tax-relief | `contractor-pension-tax-relief.md` | Pension and Dividends |
| /blog/pension-and-dividends/dividend-tax-rates-contractors-2026 | `dividend-tax-rates-contractors-2026.md` | Pension and Dividends |
| /blog/limited-company-tax/director-salary-dividend-split-guide | `director-salary-dividend-split-guide.md` | Limited Company Tax |
| /blog/pension-and-dividends/contractor-pension-schemes-sipp | `contractor-pension-schemes-sipp.md` | Pension and Dividends |

## Frontmatter (S4b spec)

Required fields all present. `category: Pension and Dividends` is a valid contractors label.
`canonical` uses the category slug form and matches the live post's slug. As a PARTIAL row the
`date` correctly stays at the live post's '2026-06-12'. metaTitle 56 chars, metaDescription 153
chars, summary 50 words, keyTakeaways 4, faqs 6, body raw HTML, no markdown, no em-dashes.
YAML re-parsed clean after editing.

## Edits made (1)

1. `updatedDate: '2026-06-12'` to `'2026-09-27'`. The contractors loader reads `updatedDate`, and
   on an extended post it must be bumped; `dateModified` was already 2026-09-27, so the two
   disagreed and the site would have shown the June date. Also normalised the `dateModified`
   quoting to single quotes to match its siblings (no value change).

## Notes for Track B

- `primaryKeyword: "contractor pension calculator"` is in the frontmatter. No sibling wave 1 post
  carries that field, the live post does not, and it is not in the S4b spec. It reads as pipeline
  residue, and the keyword itself points at a calculator the post does not link to. Track B or the
  manager should decide whether to drop the field.
- FAQ 2 and the H2 2 paragraph make the same salary-cap point in close to the same words, and FAQ 5
  overlaps H2 4's MPAA paragraph. Both are within-post repeats rather than sibling duplication, but
  they are the thinnest parts of the piece.
- Body is 933 words, so there is headroom if Track B needs to expand anything it trims.
- Nothing in the post needs a figure changed. Every number is locked by HP §5, §7, §8, §9 or §11.

## For the manager

- The live post `contractors-ir35/web/content/blog/contractor-pension-carry-forward.md` has no
  `dateModified` and no `canonical`. The extend adds both, so the integrator's move fixes it.
- Sibling draft `contractor-accountant-fees-cost.md` has the same stale-`updatedDate` defect this
  post had ('2026-06-12' against `dateModified` '2026-09-27'). Out of scope here, worth a sweep
  across the wave before integration.
