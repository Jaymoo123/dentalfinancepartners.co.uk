# Track B editorial and claims QA: self-employed-carers-and-personal-assistants

Site: care. Reviewed 2026-09-27. Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` §13 S4a
("QA" and "Writers"). Track A passed first; its three edits are intact and were not reverted.
Sibling voice sample: `docs/care/_wave1/care-franchisees.json` and the live rows in
`care/web/src/data/care-hubs.ts`.

## Findings

**1. Situation answered inside the first 150 words of `intro`. PASS.** The buyer's three live
questions are named in sentence 2 and the registration answer lands at word 60, the VAT
consequence at word 110. Intro is 134 words after edit 2, so the whole intro sits inside the rule.

**2. Word band. PASS.** 1,192 words across intro, challenges, howWeHelp and faqs with titles and
questions included, against a band of 800 to 1,200. Tight at the top. Any later addition to this
row needs a matching trim, which is why edit 1 was budget-neutral by design.

**3. AI tells and sameness. ONE DEFECT, FIXED.** `howWeHelp[0]` opened "A specialist reviews" and
`howWeHelp[1]` opened "Your accountant works out" on consecutive items, the exact stock-opener
pair the spec names. Edit 1 recasts the second so the sentence leads with the work rather than
the actor. The remaining two openers ("Registering as self-employed", "If you incorporate:")
already differ in shape. No "You get A, B and C" closer: the intro ends on a single deferred
question, "Incorporating is settled separately, by your profit and by who pays you." No listicle
rhythm: challenge bodies run 84, 67, 35, 69 and 70 words and the sentence shapes vary. Checked
against the four existing care hubs and `care-franchisees.json` for repeated framing; the overlap
is subject matter only, not phrasing.

**4. Thin or padded sections. NO DEFECT, one item considered and kept.** `challenges[2]`
(employment status) is 35 words against a page average of 65. Kept deliberately: both sentences
carry substance, FAQ 5 covers the same ground at 66 words so padding it would duplicate, and the
short item is what breaks the listicle rhythm in point 3. Every other body sits between 42 and 84.
No FAQ answer restates its question. FAQ answers run 70, 67, 68, 65, 66 and 61 words, all inside
the 40 to 120 band.

**5. Banned claims. PASS.** Case-insensitive sweep of the whole file for chartered, ICAEW, ACCA,
CIOT, "our accountants", "we are accountants", "our team", award, regulated, advice, advise,
personal names, prices and fees, turnaround promises: no hits except "regulated", which appears
only as the statutory phrase "regulated activity" (SI 2014/2936 Schedule 1) and as
"state-regulated provider", the condition wording from VAT Notice 701/2 and Group 7, Schedule 9
VATA 1994. Both are legal terms describing the client's position, not a claim about the firm, so
both stay. No price, fee or turnaround anywhere. No named person. The page never says "we advise";
it describes what a specialist reviews, as the writer spec requires.

**6. Em-dashes, British English, 2026/27. PASS.** No em-dash or en-dash in the file. British
spelling throughout ("towards", "laundering workwear", "recognised" forms absent). Every rate is
the 2026/27 figure and each carries its 6 April 2026 start.

**7. Meta lengths. PASS.** `metaTitle` 49 characters (limit 60). `metaDescription` 155 characters
(limit 160).

**8. Internal links. PASS.** Four, all relative, all `<a href="...">text</a>` anchors, all verified
on disk:
- `/blog/vat-and-welfare-exemption/care-home-vat-exemption-edge-cases` -
  `care/web/content/blog/care-home-vat-exemption-edge-cases.md`, category "VAT and Welfare
  Exemption", served by `care/web/src/app/blog/[category]/[slug]`.
- `/blog/care-home-accounts-and-funding/mtd-it-care-owner-operators` -
  `care/web/content/blog/mtd-it-care-owner-operators.md`, category "Care Home Accounts and Funding".
- `/for/domiciliary-care` - `care/web/src/data/care-hubs.ts:82`.
- `/services/start-a-domiciliary-care-agency` - `care/web/src/data/care-services.ts:411`.

**9. Pipeline leakage. PASS.** No wave, agent, map, QA or house-positions reference in any rendered
field. The `sources` array is the spec's own trailing array that the template does not render.

**Consistency defect found and fixed (edit 3).** FAQ 1 still said registration bites by "running a
small service for several clients", the client-count framing Track A had already falsified and
removed from `challenges[0]`. Left as it was, the page contradicted itself two sections apart.
Reworded to the employing-or-partnership test that Track A verified and sourced. No figure, rate,
date or rule changed; this aligns the FAQ with the rule Track A established.

## Edit log

1. `howWeHelp[1].body`, opening clause. Was: "Your accountant works out which income is taxable
   and which, if any, is genuinely exempt, then tracks the rolling 12-month total against the
   £90,000 threshold so registration never arrives by surprise." Now: "Which of your income is
   taxable, and which, if any, is genuinely exempt, is worked out first, then the rolling 12-month
   total is tracked against the £90,000 threshold so registration never arrives by surprise."
   Reason: consecutive stock openers with `howWeHelp[0]`. +3 words.
2. `intro`, VAT sentence. Removed the trailing clause ", not to unregistered individuals" after
   "state-regulated providers". Reason: restated twice more in `challenges[1]` and FAQ 2, and the
   word budget needed the room. -5 words.
3. `faqs[0].answer`. Was: "for example by employing other carers or running a small service for
   several clients." Now: "for example by employing another carer or working in partnership with
   one." Reason: internal contradiction with Track A's corrected `challenges[0]`; CQC's test is
   working as an individual, not client count. -3 words.

Nothing else rewritten. No figure, rate, date or rule touched.

## Suspected errors noted, not changed

None. Track A's assertion table holds on re-read, and the one wrong item it caught (client count
as the carve-out test) is now consistent across both places it appeared.

## Checks

- JSON parses after all three edits.
- Final word count across intro, challenges, howWeHelp and faqs, titles and questions included:
  **1,192** (band 800 to 1,200).
- `metaTitle` **49** characters. `metaDescription` **155** characters.
- No em-dash anywhere in the file.
- Four internal links, all relative anchors, all resolving on disk.

VERDICT: PASS
