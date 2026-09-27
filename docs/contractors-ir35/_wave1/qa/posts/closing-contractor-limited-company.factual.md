# Track A factual QA: closing-contractor-limited-company

Site: contractors-ir35. Reviewed 2026-09-27. Draft: `docs/contractors-ir35/_wave1/posts/closing-contractor-limited-company.md` (EXTEND of the live post of the same slug).

**Verdict: PASS after 4 in-place edits.** One WRONG rule (the TAAR applied to a voluntary strike-off), corrected against ITTOIA 2005 s.396B(1) and CTA 2010 s.1030A. All rates, thresholds and dates match `house_positions.md`. No figures removed.

## Assertions

| # | Assertion | Source checked | Grade |
|---|---|---|---|
| 1 | Winding-up TAAR is ITTOIA 2005 s.396B | HP §14, §18; legislation.gov.uk s.396B | CORRECT |
| 2 | Four conditions A to D must all be met | s.396B(1)(a); CTM36305 | CORRECT |
| 3 | Condition A: at least a 5% interest immediately before the winding up | s.396B(2), (9) (5% ordinary share capital and 5% voting rights) | CORRECT |
| 4 | Condition B: close company when wound up, or at any time in the two years ending with the start of the winding up | s.396B(3)(a),(b) | CORRECT |
| 5 | Condition C: same or similar trade or activity within two years beginning with the date of the distribution | s.396B(4) | CORRECT |
| 6 | Condition C reaches the individual, a partnership they belong to, a company they hold at least 5% of, and a connected person | s.396B(4)(a) to (d) | CORRECT (fair paraphrase; (c) requires the individual, or a connected person, to be a participator in that company) |
| 7 | Condition D: reasonable to assume a main purpose of the winding up was avoidance or reduction of a charge to income tax | s.396B(5)(a) | CORRECT |
| 8 | Two year clock runs from the date of each distribution, not dissolution | s.396B(4) "within the period of two years beginning with the date of the distribution" | CORRECT |
| 9 | Dividend rates 2026/27: 10.75% / 35.75% / 39.35%, £500 allowance | HP §5, §9; FA 2026 s.4 | CORRECT |
| 10 | BADR 18% for disposals on or after 6 April 2026, £1m lifetime limit | HP §15 | CORRECT |
| 11 | s.455 at 35.75% on loans made on or after 6 April 2026; s.458 relief deferred | HP §14 | CORRECT |
| 12 | £25,000 ceiling for capital treatment on a voluntary strike-off | CTA 2010 s.1030A Condition B | CORRECT |
| 13 | Exceed £25,000 and the whole amount is a distribution, not just the excess | CTA 2010 s.1030A (relief applies only if the total does not exceed £25,000) | CORRECT |
| 14 | £100,000 of reserves: roughly £18,000 at 18% BADR against roughly £35,750 at the 35.75% dividend upper rate | arithmetic; hedged as "roughly", ignores the annual exempt amount and the £500 allowance | CORRECT |
| 15 | **The winding-up TAAR applies to a voluntary strike-off as well as an MVL** (stated in a key takeaway, the comparison table and an FAQ) | s.396B(1) applies to a distribution "in the winding up of a UK resident company"; a s.1003 CA 2006 voluntary strike-off is a dissolution, not a winding up; CTM36305 scopes the rule to "distributions in a winding-up" | **WRONG, fixed** |
| 16 | HMRC can open an enquiry "within the normal time limits" | no figure asserted | CORRECT (no number, left) |

## Edits made (4)

1. Key takeaway 5: TAAR "applies to both" replaced with the winding-up scope plus the transactions in securities point.
2. Body, "Strike-off or MVL" section: "The TAAR sits on top of both" replaced with the s.396B winding-up scope, an explicit warning that this is not a safe harbour, and ITA 2007 s.684(2)(e) (a repayment of share capital is a transaction in securities).
3. Comparison table: row relabelled "Winding-up TAAR (ITTOIA 2005 s.396B) applies", strike-off cell changed to "No, it is written for a winding up"; new row added for transactions in securities, Yes on both routes.
4. FAQ "Is a strike-off safer than an MVL for the TAAR?": answer rewritten to the same corrected position.

Figures removed: none. No unsourced figures found.

## Frontmatter and links

- YAML re-parses. 20 keys. `date` 2026-06-12 and `category` Limited Company Tax preserved from the live post, as an extend requires; `image`, `altText`, `imageCredit` block preserved verbatim.
- `dateModified` and `updatedDate` both 2026-09-27 (contractors loader reads `updatedDate`).
- `canonical` https://www.contractortaxaccountants.co.uk/blog/limited-company-tax/closing-contractor-limited-company, matches slugifyCategory of the label. The live post carries no canonical; this adds one.
- metaTitle 49 chars, metaDescription 148 chars, summary 55 words, 6 FAQs, 5 key takeaways. Body 1,171 words. No em-dashes.
- Internal links, 4 of a maximum 5:
  - `/blog/ir35-status/inside-ir35-keep-close-or-umbrella` — sibling in `_wave1/posts/`, category IR35 Status, not yet in `content/blog/`. **Manager: this link only resolves once that sibling ships.**
  - `/blog/pension-and-dividends/dividend-tax-rates-contractors-2026` — on disk, category Pension and Dividends.
  - `/blog/limited-company-tax/corporation-tax-contractor-limited-company` — on disk.
  - `/blog/limited-company-tax/director-salary-dividend-split-guide` — on disk.

## Notes for Track B

- Do not soften the corrected strike-off wording; the point is that s.396B does not reach a strike-off but the transactions in securities rules can. It must not read as "strike-off is safe".
- Word count is 1,171 against a 1,200 ceiling. There is 29 words of headroom, so trim rather than add.
- The "£25,000 fork" phrasing appears in metaDescription, a key takeaway and the body; check the sibling posts for the same sentence shapes.

## Note for the manager

`house_positions.md` §14 describes the TAAR only in the MVL context and is silent on strike-off. It is not wrong, but a one-line addition ("s.396B applies to a winding up; a s.1030A strike-off is outside it, transactions in securities is the rule in point") would stop the same error being re-seeded by other writers. HP change is a manager job, not made here.
