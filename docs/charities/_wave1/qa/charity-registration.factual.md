# Factual QA (Track A) — charities `/for/charity-registration`

File: `docs/charities/_wave1/charity-registration.json`
Tie-breaker: `docs/charities/house_positions.md` (England and Wales default), then gov.uk / legislation.gov.uk.
Reviewed 2026-09-27. Two edits applied.

## Assertions

| # | Section | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | meta, intro, stat 1, challenge 1, FAQ 1 | Registration with the Charity Commission required once income goes over £5,000 a year (England and Wales) | house position 1, gov.uk CC21b | CORRECT |
| 2 | intro, stat 2, FAQ 1 | A CIO must register whatever its income; a CIO only exists once registered | house position 1; position 25 | CORRECT |
| 3 | intro, challenge 2, howWeHelp 2, FAQ 2 | CIO registers with the Commission only; a charitable company registers with the Commission (if eligible) and Companies House, and follows company accounting rules | house position 25 | CORRECT |
| 4 | challenge 2 | An unincorporated association forms quickly but leaves trustees exposed on contracts and leases | house position 25 (structure comparison), Commission structure guidance | CORRECT |
| 5 | challenge 2 | "The four forms sit side by side" in the structures guide | `charities/web/content/guides/charity-structures-which-to-choose.md` covers CIO, charitable company, unincorporated, CIC | CORRECT |
| 6 | intro, challenge 3, howWeHelp 3, FAQ 3 | HMRC recognition is a separate step from Commission registration; Commission registration alone does not unlock Gift Aid or other charity tax reliefs | house position 10, gov.uk/charities-and-tax | CORRECT |
| 7 | stat 4, FAQ 3 | 25p claimed per £1 of eligible donation | house position 14 | CORRECT |
| 8 | FAQ 3 | Donor must have paid at least as much UK income tax or CGT in the year as all their charities will reclaim | house position 14 | CORRECT |
| 9 | challenge 4 | Declaration content: charity name, donor full name and home address, what it covers, the tax-paid statement | house position 15 | CORRECT |
| 10 | challenge 4 | Declarations kept six years from the end of the accounting period | house position 15 | CORRECT |
| 11 | challenge 4, FAQ 4 | Gift Aid on pre-recognition donations depends on "declarations held at the time of the gift" | gov.uk Gift Aid declarations: a declaration can cover donations made in the previous four years | **WRONG — corrected (edits 1 and 2)** |
| 12 | challenge 4, FAQ 4 | Income received before registration or recognition still belongs in the first accounts | Charities Act 2011 accounting duty; house position 2 | CORRECT |
| 13 | stat 3, challenge 5, howWeHelp 5, FAQ 5 | Annual return due within ten months of the end of the financial year | house position 2 | CORRECT |
| 14 | FAQ 5 | Annual return tiering: under £10,000 income and spending only; £10,000 to £25,000 the return questions; over £25,000 trustee annual report and accounts attached | house position 2 | CORRECT |
| 15 | challenge 5, FAQ 6 | External scrutiny (independent examination or audit) starts once gross income exceeds £25,000, rising to £40,000 for accounting years **ending** on or after 30 September 2026 | house position 3 (S.I. 2026/427) | CORRECT — the ENDING framing is right, the position-26 beginning/ending trap is avoided |
| 16 | FAQ 6 | Below the gate the Charities Act requires no external scrutiny, though a governing document or funder can still require one | house position 3 | CORRECT |
| 17 | howWeHelp 2 | A CIC converting to charity status involves the asset lock | house positions 22, 23 | CORRECT |
| 18 | howWeHelp 4 | Small cash and contactless collections fall under the small donations scheme, which carries its own annual limit | house position 17; no GASDS figure is stated, so neither banned GASDS framing appears | CORRECT |
| 19 | howWeHelp 5 | A trustee annual report is required "where income requires one" | house position 2 (over £25,000) | CORRECT |
| 20 | FAQ 1 | A sub-£5,000 group can operate for charitable purposes and will not appear on the public register | house position 9 | CORRECT |
| 21 | challenge 6 | Banks ask for the registered number, governing document, trustee ID and often a signatory resolution; funds in a founder's personal account create a reconciliation and disclosure job | Operational practice statement; no figure, rule or date asserted | Not a factual claim, no source required |
| 22 | whole page | Late registration: no penalty, deadline or consequence figure is asserted anywhere; the page frames it as reconstructing income and getting the first accounts right | n/a | CORRECT (nothing to falsify) |

No STALE items: every dated rule on the page is on the current (post-S.I. 2026/427) figures and dated correctly.
No UNSOURCED figures: every figure on the page maps to a house position, so nothing was removed.

## Sources array

Covers positions 1, 2, 3, 10, 14, 15, 17, 22/23/25 plus the internal-link verification. One gap: the backdating of Gift Aid declarations (assertion 11), which was unsourced because the page stated it wrongly. A gov.uk line was added as source entry 7 alongside the correction.

## Internal links, all five exist on disk

- `/guides/register-a-charity-step-by-step` to `charities/web/content/guides/register-a-charity-step-by-step.md` OK
- `/guides/charity-structures-which-to-choose` to `charities/web/content/guides/charity-structures-which-to-choose.md` OK
- `/guides/set-up-a-charity-cio` to `charities/web/content/guides/set-up-a-charity-cio.md` OK
- `/blog/trustee-compliance/hmrc-recognition-vs-charity-registration` to `charities/web/content/blog/hmrc-recognition-vs-charity-registration.md`, `category: "Trustee Compliance"` slugifies to `trustee-compliance` OK
- `/calculators/independent-examination-vs-audit-checker` to `charities/web/src/lib/calculators/tools/independent-examination-audit-checker.ts`, exported `slug: "independent-examination-vs-audit-checker"` OK

Note for the record: the guides live in `charities/web/content/guides/`, rendered by `charities/web/src/app/guides/[slug]/page.tsx`, not as one file per guide under `src/app/guides/`.

## Edit log

1. `challenges[3].body` — replaced "Gift Aid on it depends on valid declarations held at the time of the gift." with "Gift Aid on it depends on a valid declaration covering those gifts, which a donor can give later and backdate four years." Reason: WRONG. A Gift Aid declaration may cover donations made in the previous four years, so a declaration held at the moment of the gift is not the test. It also contradicted `howWeHelp[3]`, which already says historic donations can be brought into a claim.
2. `faqs[3].answer` — replaced "Whether Gift Aid can be claimed on those earlier gifts turns on the declarations held at the time." with "Whether Gift Aid can be claimed on those earlier gifts turns on holding a valid declaration that covers them, which a donor can give now and backdate four years." Reason: same defect, same fix.
3. `sources` — inserted the gov.uk Gift Aid declarations line covering the four-year backdating point, noting house positions is silent on it.

Nothing removed. No prose rewritten beyond the two clauses above.

**Word count.** The two corrections add 18 words: 1,268 to 1,286 on the strict count (intro, challenge and howWeHelp titles and bodies, FAQ questions and answers, HTML stripped). The page is now 86 over the 1,200 band. The overage is Track B's trim; the added words are factually load-bearing and should not be the ones cut.

JSON re-validated after the edits: parses.

VERDICT: PASS
