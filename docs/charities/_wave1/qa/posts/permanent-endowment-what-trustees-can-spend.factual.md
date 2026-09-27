# Track A factual QA: permanent-endowment-what-trustees-can-spend

Reviewed 2026-09-27. Verdict: **PASS** (5 precision edits applied in place).

Tie-breakers used: `docs/charities/house_positions.md` first (silent on permanent endowment), then primary law on legislation.gov.uk and the gov.uk permanent endowment guidance. Cross-checked for contradiction against the reviewed audience page `docs/charities/_wave1/grant-making-trusts-and-foundations.json`: no contradiction (£25,000 gate, ss.281 to 284D, 25% borrowing repayable within 20 years all agree).

## Assertions

| # | Assertion | Grade | Source |
|---|---|---|---|
| 1 | Permanent endowment is property the charity must keep rather than spend | CORRECT | gov.uk permanent endowment guidance |
| 2 | Sections 281 to 284D Charities Act 2011 give a statutory power to release it | CORRECT | CA 2011 ss.281-284D |
| 3 | The gate turns on the market value of the whole fund, not the amount to be spent | CORRECT | s.282(1): applies where market value of the fund exceeds £25,000 |
| 4 | £25,000 or less: trustees resolve under s.281 alone | CORRECT | s.281(2)-(4); s.281 disapplied only where ss.282-284 apply |
| 5 | Above £25,000: s.282, Commission must concur | CORRECT | s.282(1), (4); s.283, s.284 |
| 6 | Commission has 60 days to notify | CORRECT | s.284: 60 days beginning with the date it receives the copy resolution |
| 7 | Period extends on a public notice direction or a request for information | CORRECT | s.284: disregarded until 42 days after public notice given, or until information provided |
| 8 | Commission test: spirit of the gift, donor wishes, changed circumstances, trustee compliance | CORRECT | s.284 |
| 9 | Provisions in current form commenced 14 June 2023 | CORRECT | CA 2022 ss.10, 12(2); SI 2023/643 |
| 10 | s.281 route needs no copy to the Commission and no waiting period | CORRECT | copy requirement sits only in s.282(4) |
| 11 | Effectiveness test is the statutory condition, not need or deficit | CORRECT | s.281(4), s.282(3) |
| 12 | Trustees may resolve to cancel an obligation to repay earlier borrowing | CORRECT | s.281(6A)-(6D); s.282(3A)-(3B) for the larger fund |
| 13 | "Available endowment fund" = whole permanent endowment on the same trusts, or a part on different trusts | CORRECT | s.281(7) |
| 14 | Adjusted market value applies where borrowing is outstanding | CORRECT but INCOMPLETE as written | s.282(1A), (5): reduced by the benefit of the debt owed AND increased by outstanding borrowing. Post said only "adds the outstanding borrowing back in". **Fixed** in body and FAQ, and the ordinary market-value definition (last financial year's accounts, else a valuation) added. |
| 15 | Designated land sits outside the powers | OVERSTATED | gov.uk lists "the permanent endowment is not designated land" as a condition of the routes that need no Commission authority, and notes authority can be needed to dispose of designated land whatever its value. **Fixed**: narrowed to the no-authority routes, in the body bullet and the key takeaway. |
| 16 | The trusts of the fund can exclude or restrict the powers | CORRECT | gov.uk guidance ("your governing document does not say anything that stops you") |
| 17 | s.284A borrowing needs no authority; expedient test; repay within 20 years | CORRECT | s.284A(2) quoted verbatim in the section |
| 18 | Permitted amount is 25% of fund value, less outstanding borrowing | CORRECT | gov.uk guidance states 25%; s.284B formula is V (at resolution date, ignoring the benefit of the debt owed) less B (outstanding borrowing). The percentage itself renders as an image on legislation.gov.uk and is anchored on the gov.uk guidance, matching the reviewed audience page. |
| 19 | £100,000 fund supports £25,000 of borrowing | CORRECT | arithmetic on 18 |
| 20 | Borrowed money cannot repay an earlier borrowing from the same endowment | WRONG (too narrow) | s.284A(4): may not repay any amount previously borrowed **from permanent endowment**, not merely the same fund. **Fixed**. |
| 21 | On repayment trustees may add up to the estimated capital appreciation | CORRECT | s.284A(5), with the maximum defined in s.284C |
| 22 | Repaid amounts return to the fund under the original restrictions | CORRECT | s.281(6A)(b) premise; s.284A scheme |
| 23 | s.104A total return: resolve to invest without maintaining a capital/income balance | CORRECT | s.104A(1)-(4) |
| 24 | Accounts show the trust for investment, the unapplied total return and the allocation | CORRECT | Charities (Total Return) Regulations 2013 regime; matches audience page position |
| 25 | Expendable endowment needs none of this machinery | CORRECT | powers bite on permanent endowment only (s.281(7)) |
| 26 | Endowment is not free reserves | CORRECT | consistent with the site's reserves post; no figure asserted |
| 27 | SORP 2026 reference via the linked post | CORRECT | house position 7 |

No UNSOURCED figures found; nothing removed.

## Edits made (5)

1. Body bullet: "Designated land sits outside these powers" narrowed to "outside the no-authority routes", with the disposal point added.
2. Key takeaway 4: same narrowing.
3. Body, Commission section: ordinary market-value definition added, and the adjusted market value stated in full (both limbs).
4. FAQ 2: same correction to the adjusted market value, plus the ordinary definition.
5. Body, borrowing section: "an earlier borrowing from the same endowment" corrected to "any earlier borrowing from permanent endowment".

## Structural checks

- Frontmatter: valid YAML after editing, 15 keys. `dateModified` and `updatedDate` both set to 2026-09-27. Category "Charity Governance" is on the brief's list. Canonical matches the category slug.
- metaTitle 44 chars, metaDescription 149 chars.
- Internal links: 4, all targets exist on disk. `charity-sorp-2026-changes.md`, `how-much-should-a-charity-hold-in-reserves.md`, `trustees-annual-report-guide.md` in `charities/web/content/blog/` (flat directory; each file's own `category` matches the category segment in the link). `independent-examination-vs-audit-checker` matches the `slug` field in `charities/web/src/lib/calculators/tools/independent-examination-audit-checker.ts` (filename differs from slug; the route reads the slug, so the link is correct).
- Body 997 words, no markdown in the body, no em-dashes.

## Notes for Track B

- The 25% borrowing figure rests on gov.uk guidance, not on quotable statutory text, because s.284B's formula is an image on legislation.gov.uk. Do not weaken or hedge it; it is locked by the audience page.
- The FAQ "Can charity trustees spend permanent endowment?" and the audience page FAQ "Can trustees spend permanent endowment?" cover the same ground. Check for near-verbatim overlap; the figures must not change.
- Edits 3 and 4 added about 55 words; body is 997, so there is little headroom before the 1,200 ceiling.

## For the manager

Nothing to fix elsewhere. The audience page `grant-making-trusts-and-foundations.json` is consistent with the post and does not repeat the partial "adjusted market value" framing, so it needs no change.
