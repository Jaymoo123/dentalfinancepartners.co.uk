# Factual QA (Track A): nhs-pension-partial-retirement-doctors-guide

Reviewer: Opus factual QA, 2026-09-27
File under review: `docs/medical/_wave1/posts/nhs-pension-partial-retirement-doctors-guide.md`
Live post diffed: `Medical/web/content/blog/nhs-pension-partial-retirement-doctors-guide.md` (PARTIAL row, extended in place)
Tie-breakers: `docs/medical/house_positions.md` §2, §2.A, §2.B, §2.D, §2.E; NHSBSA and gov.uk where the house positions are silent.

## Diff summary

Slug, canonical, date and category are unchanged from the live post. `dateModified` bumped to 2026-09-27, `generator` moved to `claude-opus`, and title, metaTitle, metaDescription, h1, altText, summary, keyTakeaways, faqs and body all rewritten to the S4b three-route comparison shape. Nothing factual in the live post is contradicted by the extension. The early-retirement factor detail, the ERRBO facility and the State Pension interaction were dropped as out of scope for the comparison shape, which is a coverage change, not a correctness change.

## Assertions

| # | Where | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | summary, kt1, faq1, intro, table | Partial retirement draws 20 to 100 percent of accrued benefits | HP §2.E ("20% to 100%") | CORRECT |
| 2 | kt1, faq1, table, intro | Up to two drawdown events | HP §2.E ("in up to two events") | CORRECT |
| 3 | kt1, summary, faq1, table, body | Pensionable pay must fall by at least 10 percent and stay down 12 months | HP §2.E ("at least 10% for the first 12 months") | CORRECT |
| 4 | kt1, faq1, table | Accrual continues in the 2015 Scheme during partial retirement | HP §2.E ("re-accrue in the 2015 scheme"); HP §2 (all active members accrue in 2015 from 1 Apr 2022) | CORRECT |
| 5 | intro | Three routes open to a doctor at 55 or over | HP §2.E (minimum pension age 55) | CORRECT |
| 6 | body, 10 percent section | Measured against total pensionable pay in the 12 months before the drawdown date, not the current annual rate | NHS Employers partial-retirement guidance; unchanged in substance from the live post | CORRECT |
| 7 | body, worked example | Consultant on £120,000 over 12 PAs, one PA £10,000, line at £108,000, 10.5 PAs = £105,000, a 12.5 percent cut, £3,000 headroom | Arithmetic: 0.9 x 120,000 = 108,000; 10.5 x 10,000 = 105,000; 15,000/120,000 = 12.5%; 108,000 - 105,000 = 3,000 | CORRECT |
| 8 | kt4, faq3, body, table | Abatement bites where pensionable pay rises above 90 percent of the pre-drawdown figure inside the 12 months | NHS Employers, quoted verbatim in the live post ("more than 90 per cent of their pre-partial retirement pensionable pay") | CORRECT |
| 9 | kt4, faq3, body | Abatement stops the pension in payment | Source says "may be abated (stopped)", so it is conditional | WRONG as an unqualified statement, FIXED (edits 1 to 3) |
| 10 | faq3, body | Annual pay awards and ordinary incremental progression do not count as an increase; extra pensionable PAs or acting up do | NHS Employers guidance, unchanged from the live post | CORRECT |
| 11 | faq3, body | Non-pensionable overtime and opted-out bank work leave the pensionable figure untouched | Follows from the test being pensionable pay; HP §2.C (pensionable pay, not total taxable income) | CORRECT |
| 12 | kt2, summary, faq1, faq2, table, body | Retire and return: employment ends, all benefits claimed, break of at least 24 hours from every NHS post, new contract, no pay reduction condition | NHS Employers retire-and-return guidance; unchanged from the live post | CORRECT |
| 13 | body, route section; kt2 | The 24 hour break is a condition inside retire and return, not a route of its own | Framing, consistent with row 12 | CORRECT |
| 14 | faq2, table, body | The 16 hour rule was permanently removed on 1 April 2023 | NHS Employers / NHSBSA; unchanged from the live post | CORRECT |
| 15 | faq2, table, body | Since 1 April 2023 a member who has taken 1995 Section benefits and returns can join the 2015 Scheme | NHSBSA 2023 scheme change; the body correctly qualifies the table row ("only been possible for 1995 Section retirees since 1 April 2023") | CORRECT |
| 16 | kt3, intro, table | Benefits taken before normal pension age carry a permanent actuarial reduction on NHSBSA and Government Actuary factors | HP §2.E | CORRECT |
| 17 | whole page | No actuarial reduction percentage is quoted anywhere | HP §2.E ("do NOT lock a fixed percentage") | CORRECT (compliant) |
| 18 | faq4, body (twice) | Lump sum allowance £268,275, excess taxed as income at marginal rate | HP §2.B | CORRECT |
| 19 | faq4 | 1995 Section pays an automatic lump sum of three times the annual pension | HP §2 ("1/80th accrual + automatic 3x lump sum") | CORRECT |
| 20 | faq4 | 2008 Section and 2015 Scheme lump sum only by commutation at £12 per £1 of pension given up, capped at 25 percent of capital value | HP silent; NHSBSA commutation rules | CORRECT |
| 21 | faq4, body | The pension is taxable income each year on top of continuing NHS pay | ITEPA 2003 Part 9 | CORRECT |
| 22 | faq5, body | Annual allowance £60,000 for 2026/27 | HP §2.B | CORRECT |
| 23 | faq5, body | Taper £1 for every £2 of adjusted income above £260,000 where threshold income also exceeds £200,000, floor £10,000 | HP §2.B | CORRECT |
| 24 | faq5, body | The DB measure is growth in benefits, not contributions paid | HP §2.B (pension input amount) | CORRECT |
| 25 | kt5, faq6, body, table | FA 2004 s.237B(6) closes the Scheme Pays window once actually entitled to all benefits, so 100 percent drawdown, retire and return and full retirement all shut it | HP §2.D (s.237B(6) verbatim, "Cite s.237B(6) for it") | CORRECT |
| 26 | faq6, body | Ordinary deadline 31 July in the year after the tax year ends, a 2026/27 charge to 31 July 2028 | HP §2.D (the exact worked pairing the house position prescribes) | CORRECT |
| 27 | body, Scheme Pays section | Extension where NHSBSA issues a revised statement on or after 2 May | HP §2.D | CORRECT |
| 28 | body | Normal minimum pension age rises from 55 to 57 on 6 April 2028 | HP verification log, FA 2022 s.10 ("57 on and after 6 April 2028") | CORRECT |
| 29 | body | McCloud choice between legacy and 2015 terms for 1 April 2015 to 31 March 2022 is made when benefits are taken | HP §2.A (remedy period dates; deferred choice at retirement) | CORRECT |
| 30 | body, retire and return section | The DHSC expectation recorded in the November 2025 NHS Employers guidance: re-employ on the same terms, no break longer than 24 hours, an expectation and not an entitlement | Carried in substance from the live post, correctly framed as an expectation | CORRECT |
| 31 | body, 10 percent section | A GP partner's reduction shows on the Type 1 Annual Certificate more than a year later | HP §2.C (Type 1 Annual Certificate, 28 February deadline a year in arrears) | CORRECT |
| 32 | whole page | No pricing, no named people, no firm claims, "a specialist reviews" not "we advise" | S4b shape rules | CORRECT (compliant) |

No UNSOURCED figures found: every number on the page traces to a house position, to primary law, or to the worked example's own arithmetic, so nothing had to be removed. No STALE figures found: every tax-year-tagged figure is 2026/27 and matches the 2026-08-26 currency pass.

## Edit log

1. keyTakeaway 4: "the pension in payment is stopped" to "the pension in payment can be stopped". Reason: the source says "may be abated (stopped)"; abatement is conditional on the facts, not automatic.
2. FAQ "What is abatement and when does it stop my pension?": "Abatement means the pension in payment is stopped" to "can be stopped". Same reason.
3. Body, section "What does the 10 percent pay cut actually cost?": "and the pension in payment stops" to "and the pension in payment can be stopped". Same reason.

Three edits, all one clause. No figure, date or citation required correction.

## Mechanical checks

- Frontmatter: slug, title, date, category, metaDescription (build-required) all present, plus metaTitle, h1, summary, author, canonical, dateModified, faqs, keyTakeaways, generator. PASS.
- metaTitle 50 chars (limit 60). PASS.
- metaDescription 152 chars (limit 155). PASS.
- summary 55 words (band 40 to 60). PASS.
- keyTakeaways 5 (band 3 to 5). PASS. faqs 6 (band 4 to 6). PASS.
- category "NHS Pension Planning" is a verbatim Medical label. PASS.
- canonical is the Medical flat form and matches the live post. PASS.
- generator `claude-opus`. PASS.
- Body is raw HTML, no markdown syntax. PASS.
- Body 1,124 words after the edits (band 800 to 1,200). PASS.
- 5 internal links, all flat `/blog/<slug>`, all five verified present in `Medical/web/content/blog/`. PASS (limit 5).
- No em-dashes in the file. PASS.
- YAML re-parsed after the edits: valid. PASS.

VERDICT: PASS
