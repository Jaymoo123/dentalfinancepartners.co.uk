# Track A factual QA: registering-a-charity-late (charities, wave 1)

Date: 2026-09-27. Reviewer: Track A (Opus). Tie-breaker: `docs/charities/house_positions.md`; primary law where silent.
Service-page position checked for contradiction: `docs/charities/_wave1/charity-registration.json`.

## Verdict: PASS

Edits made: 0. Figures removed: 0. Body word count: 1,113 (in the 800 to 1,200 band).

## Assertion table

| # | Assertion | Source | Grade |
|---|---|---|---|
| 1 | Duty to register with the Charity Commission arises once annual income exceeds £5,000 (England and Wales) | house position 1 | CORRECT |
| 2 | A CIO must register whatever its income, because it only exists once registered | house position 1; gov.uk CC21b | CORRECT |
| 3 | Charities Act 2011 s.35 puts the duty on trustees of an unregistered charity to apply and supply the required documents and information, including the trusts or, where not in any extant document, particulars of them | legislation.gov.uk s.35(1) and s.35(2), checked at source 2026-09-27 | CORRECT (wording tracks the statute) |
| 4 | Proof of income over £5,000 may be latest annual accounts, a recent bank statement or a formal offer of funding from a recognised funding body; not required of a CIO | gov.uk CC21b, checked at source | CORRECT |
| 5 | The application asks for main bank or building society details | gov.uk CC21b | CORRECT |
| 6 | Gift Aid claim must be made within four years of the end of the financial period the donation was received in | gov.uk "Claiming Gift Aid": "within 4 years of the end of the financial period you received it in", checked at source | CORRECT |
| 7 | That period is the tax year for a charitable trust, the accounting period for a CIO, charitable company or CASC | same source, quoted verbatim there | CORRECT |
| 8 | A declaration can cover past donations as well as present and future ones | gov.uk Gift Aid declarations (declaration must state whether it covers past, present or future donations); HMRC detailed guidance ch.3 ("at any time after their donation subject to the normal time limit within which tax can be reclaimed") | CORRECT |
| 9 | Declaration content: charity name, donor full name and home address, what it covers, donor wants Gift Aid to apply, tax-paid explanation | house position 15 | CORRECT |
| 10 | Donor must have paid at least as much UK income tax or capital gains tax that year as all their charities will reclaim | house position 14 | CORRECT |
| 11 | Gift Aid is worth 25p for every £1 donated | house position 14 | CORRECT |
| 12 | Declaration records kept six years from the end of the accounting period; enduring declarations permanently | house position 15 | CORRECT |
| 13 | The small donations scheme is separate and carries a two-year claim deadline | house position 17 | CORRECT |
| 14 | HMRC recognition is a separate application from Commission registration; registration does not deliver Gift Aid | house position 10 | CORRECT |
| 15 | Annual return due within ten months of the financial year end | house position 2 | CORRECT |
| 16 | Return tiering: under £10,000 income and spending only; £10,000 to £25,000 the return questions; over £25,000 trustee annual report and accounts attached | house position 2 | CORRECT |
| 17 | External scrutiny (independent examination or audit) once gross income exceeds £25,000, rising to £40,000 for accounting years ending on or after 30 September 2026 | house position 3 | CORRECT, and the ENDING framing is used, so the position 26 beginning-vs-ending trap is not tripped |
| 18 | Below the gate the Charities Act requires none, though a governing document or grant condition can | house position 3 | CORRECT |
| 19 | Scotland: OSCR registers, and every Scottish charity needs external scrutiny with no minimum income | house position 26 (flag 3 closed 2026-09-13, may be stated as fact) | CORRECT |
| 20 | Restricted funds must be tracked separately from the start | standard charity accounting framing, no figure asserted | CORRECT |

No WRONG, STALE or UNSOURCED assertions. No figure was stated that house positions does not carry, other than the four-year window and the CC21b proof list, both verified at primary source as instructed.

## Service-page consistency

No contradiction with `charity-registration.json`. The post repeats the £5,000 gate, the CIO carve-out, the ten-month return, the tiering, the £25,000 to £40,000 scrutiny gate, the 25p per £1 and the separate HMRC recognition step in the same terms. The service page says a donor can "backdate four years"; the post frames the same rule as the four-year claim window plus a declaration that can cover past gifts, which is the more precise statement of the same position and does not conflict. The post goes deeper on the late case as the row requires: reconstructing the income record, dating the crossing of £5,000, and the sequence Commission then HMRC then backdated claim.

## Internal links (all five verified on disk)

- `/blog/gift-aid/gift-aid-declaration-wording` -> `charities/web/content/blog/gift-aid-declaration-wording.md`, category "Gift Aid" -> gift-aid. OK.
- `/blog/trustee-compliance/hmrc-recognition-vs-charity-registration` -> `charities/web/content/blog/hmrc-recognition-vs-charity-registration.md`, category "Trustee Compliance". OK.
- `/blog/trustee-compliance/annual-report-vs-annual-return` -> `charities/web/content/blog/annual-report-vs-annual-return.md`, category "Trustee Compliance". OK.
- `/calculators/independent-examination-vs-audit-checker` -> `charities/web/src/lib/calculators/tools/independent-examination-audit-checker.ts`, slug field is `independent-examination-vs-audit-checker`. OK.
- `/services/charity-registration` -> `charities/web/src/data/charity-services.ts` line 302, slug `charity-registration`. OK.

Five links is the maximum allowed, not over.

## Frontmatter

YAML parses. All required keys present: slug, title, date, dateModified, updatedDate (all 2026-09-27), category "Trustee Compliance" (verbatim from the brief list), metaTitle 59 chars, metaDescription 151 chars, h1, summary 57 words, author "Trustee Tax Editorial Team", canonical `https://www.trusteetax.co.uk/blog/trustee-compliance/registering-a-charity-late` (matches the category slug), generator "claude-opus", 6 faqs, 5 keyTakeaways. No em-dashes anywhere in the file.

## Notes for Track B

- Nothing factual is at risk from an editorial trim, but the four-year window, the ENDING framing on the £40,000 uplift, and the Scotland universal-scrutiny sentence are load-bearing and must not be reworded into a beginning rule or a blanket statement.
- Body is 1,113 words, near the top of the band, so any addition needs a matching cut.
- The FAQ answers restate the body closely on the four-year window, the ten-month return and the scrutiny gate. That is a near-verbatim overlap to look at, though it sits within the post rather than across siblings.
- Sibling `cic-donations-accounting-and-gift-aid.md` also covers Gift Aid eligibility; check for shared sentences.
