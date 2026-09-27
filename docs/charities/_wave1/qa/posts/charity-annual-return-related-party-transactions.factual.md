# Track A factual QA: charity-annual-return-related-party-transactions

Date: 2026-09-27. Verdict: **PASS** (after 4 in-place edits).

Sources checked: `docs/charities/house_positions.md` (positions 2, 7); GOV.UK Charity Annual Return 2025 and 2026 question guide; Charity Annual Return 2025 glossary; Charities Act 2011 s.350 on legislation.gov.uk.

## Assertions

| # | Assertion | Grade | Source |
|---|---|---|---|
| 1 | Related parties = people or entities closely connected to the reporting charity or its trustees | CORRECT | AR question guide s.1.4, glossary |
| 2 | Three Commission examples: close family member, partner or dependant; parent, subsidiary or joint venture body; organisation controlled by those people or in which they have a substantial interest or influence | CORRECT, verbatim match | AR question guide s.1.4 |
| 3 | Connected organisation = a business in which a trustee or a trustee's family member has a substantial interest; substantial interest = at least 20% of the shareholding or voting rights | CORRECT, verbatim match | AR 2025 glossary |
| 4 | Charities Act 2011 treats cohabiting couples as spouses and a stepchild as a child | WRONG as written (over-broad) → FIXED | s.350 applies only to ss.118(2), 188, 200, 249, 280B, not to the annual return related party definition |
| 5 | The return asks for the single highest value donation received from a related party during the period | STALE / incomplete → FIXED | Question appears only where gross income is over £100,000 (s.1.4 threshold) |
| 6 | It sits alongside the highest donation from a corporate donor and from an individual | CORRECT | s.1.4 |
| 7 | Commission's reason for collecting it is understanding financial dependency, to make conflicts of interest easier to detect | CORRECT | s.1.4 |
| 8 | Grants reported to individuals, other charities, and non-charitable organisations, with a follow-up asking whether any recipients were related parties | CORRECT | s.2.1 |
| 9 | Excluding out of pocket expenses, the return asks what trustees were paid for, with the five listed options | CORRECT, all five options match | s.2.2 |
| 10 | Separate question on a trustee resigning and taking up employment with the charity | CORRECT | s.2.2 |
| 11 | Related parties is a SORP term combining charity law, company law and FRS 102 requirements | CORRECT, near-verbatim | AR 2025 glossary |
| 12 | New SORP applies to accounting periods beginning on or after 1 January 2026 | CORRECT | house position 7 |
| 13 | Over £25,000 income you attach accounts and the trustees' annual report to the return | CORRECT | house position 2 |
| 14 | Scotland files OSCR's return, not the Charity Commission's; the SORP disclosure duty applies UK-wide | CORRECT | house positions, SORP scope |
| 15 | Trustees are themselves related parties | CORRECT | "closely connected to the reporting charity or its trustees" |

No SORP 2026 tier thresholds are stated, so the position 7 flag is respected.

## Edits made (4)

1. Body, "Which annual return questions ask about related parties?": added the £100,000 gross income gate to the highest-value donation question and a sentence saying the question does not appear below it.
2. Body, "Who is a related party?": narrowed the s.350 claim to its actual scope (a connected-persons test used elsewhere in the Act, at s.350) rather than a general Charities Act rule reaching the annual return.
3. FAQ "Does the annual return ask us to name related parties?": added the £100,000 gate.
4. keyTakeaways item 3: added the £100,000 gate.

## Figures removed

None. No unsourced figures were present.

## Internal links: all 5 verified

All resolve to `charities/web/content/blog/`, and each target's frontmatter category slugifies to the path used:

- `/blog/trustee-compliance/charity-commission-annual-return-guide` — Trustee Compliance
- `/blog/gift-aid/charity-trading-subsidiary-gift-aid` — Gift Aid
- `/blog/charity-accounts-and-sorp/charity-sorp-2026-changes` — Charity Accounts and SORP
- `/blog/trustee-compliance/trustees-annual-report-guide` — Trustee Compliance
- `/blog/trustee-compliance/annual-report-vs-annual-return` — Trustee Compliance

## Frontmatter

All required keys present. `date`, `dateModified` and `updatedDate` all "2026-09-27". Category "Trustee Compliance" is on the list and matches the canonical. metaTitle 54, metaDescription 153, summary 56 words, 6 FAQs, 5 keyTakeaways. YAML re-validated after editing. No em-dashes.

## Notes for Track B

- Body is now 1,142 words, inside 800 to 1,200 but close to the ceiling. Trim padding, not the newly added gate.
- `title` and `h1` are both 59 characters and identical; check house style on whether that is intended.
- The £100,000 gate now appears three times (body, FAQ 4, takeaway 3). That is deliberate for accuracy; if Track B trims for repetition, keep the body instance.
- Links sit at the cap of five.
