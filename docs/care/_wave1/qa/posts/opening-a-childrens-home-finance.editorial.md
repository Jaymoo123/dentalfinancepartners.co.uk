# Track B, editorial QA: opening-a-childrens-home-finance

Site: care. Reviewed 2026-09-27, after Track A (PASS, 0 edits). Verdict: **PASS** (3 edits).

Read: all 12 sibling drafts in `docs/care/_wave1/posts/`, plus the two newest live posts
`care/web/content/blog/cqc-registration-costs-and-finance-guide.md` and
`cqc-registration-timeline-cash-burn-before-trading.md` for voice.

## Checks run

| Check | Result |
|---|---|
| Body word count | 1,169 (was 1,177), inside 800 to 1,200 |
| metaTitle / metaDescription | 55 / 147, both inside the cap |
| Internal links | 5, at the cap, targets verified by Track A |
| Em-dashes / en-dashes | none |
| Markdown in body | none |
| Pipeline leakage ("verify at build", "(HP", "TODO") | none |
| Banned claims (pricing, named people, chartered, ICAEW, our accountants, we advise, advice) | none; "A specialist reviews" and "Your accountant prepares" used correctly |
| AI tells (delve, landscape, navigate, crucial, robust, leverage, seamless, furthermore, testament, holistic, pivotal) | none |
| H2s question-shaped and answer-first | now 6 of 6 |
| Intro answers with numbers | yes (reg 47, s.11 CSA 2000, £12.71, 15%) |
| Summary / FAQs / takeaways counts | 60 words, 6 FAQs, 5 takeaways |
| Thin or padded sections | none; every H2 carries a distinct decision |
| YAML | re-validated after editing |
| Cross-post sentence overlap (>= 0.6 Jaccard vs 12 siblings and 2 live posts) | 1 hit fixed, rest below threshold |

## Edits made (3)

1. **Near-verbatim National Living Wage sentence.** Hit 0.64 against the live
   `cqc-registration-costs-and-finance-guide`, 0.62 against
   `how-to-start-a-domiciliary-care-agency-money-decisions`, 0.60 against
   `cost-to-set-up-a-care-agency` and 0.57 against `supported-living-contract-forecast`.
   Rewritten from "Model the cost at the statutory floors. The National Living Wage is
   £12.71 an hour for workers aged 21 and over from 1 April 2026, with £10.85 for 18 to
   20 year olds" to "Both wage floors bite from 1 April 2026: £12.71 an hour once a
   worker turns 21, and £10.85 for the 18 to 20 band." Highest remaining overlap on
   that sentence is 0.51. Both figures and the 1 April 2026 date unchanged, gov.uk link
   kept in place.
2. **H2 not question-shaped.** "Where to start" changed to "Where do you start?". The
   section already answered first, so the body was left alone. Deliberately not matched
   to the sibling's "In what order do you work through it?", which would have created a
   new duplicate H2 shape.
3. **Intra-post near-verbatim.** FAQ 2 restated the regulation 47 list in almost the
   same words as the second body paragraph. Compressed to a five-item construction
   ("Five things: certified annual accounts, a bank reference, ...") keeping all five
   items and the continuing-power point. No item dropped.

No figure, rate, date, section number or rule was changed.

## Boundary and overlap with `supported-accommodation-registration-and-tax`

Checked as asked. **The boundary is correct on both sides and there is no near-verbatim
overlap: highest sentence Jaccard between the two posts is 0.47**, on the Making Tax
Digital sentence, and the two constructions differ.

- The sibling draws the line explicitly: supported accommodation is housing plus
  support for a 16 or 17 year old living semi independently, and where the young person
  needs ongoing care and supervision or help with personal care the setting is a
  children's home and registers as one. This post sits entirely on the children's-home
  side of that line and never claims the supported-accommodation regime.
- The shared Ofsted state-regulated VAT point is reached from different directions. The
  sibling uses it to contrast three registration routes (CQC, Ofsted, neither) and
  their three VAT answers. This post uses it once, for the narrower Group 7 children's
  welfare head, and then spends the section on irrecoverable input VAT. Neither is a
  restatement of the other.
- The section 11 Care Standards Act 2000 offence appears in both. Unavoidable, it is the
  same offence, and the two sentences are constructed differently (0.44). Left as is.

**One-way link gap.** The sibling links out to `/for/childrens-homes`; this post does
not link back to the sibling, and both are at the five-link cap. See the manager note
below. Not fixed here because fixing it means dropping an existing link, which is an
interlink-stage decision, not an editorial one.

## Accepted, not a defect

- 0.59 with `how-to-start-a-domiciliary-care-agency-money-decisions` on the corporation
  tax sentence and 0.56 with `care-structure-before-cqc` on the dividend and associated
  company sentences. Below threshold, same statutory figures, different clause order
  and different framing. Rewriting further would force the prose without removing a
  single shared number.
- FAQs 1 and 2 both sit on regulation 47. They answer different questions (is a
  viability statement needed, versus what can be demanded afterwards) and, after edit
  3, no longer share wording. FAQ blocks are schema surface.
- Track A's suggested substitute wording for "accountable for the quality of
  management" was not applied. The existing phrase is a fair paraphrase Track A graded
  CORRECT, and swapping it is a factual call, not an editorial one.

## Notes for the manager

1. **Interlink stage, children's-home cluster.** This post and
   `supported-accommodation-registration-and-tax` are the two halves of the Ofsted
   boundary and only one direction is linked. Suggest swapping this post's
   `/for/childrens-homes` link (the sibling already carries it, and this post's H1 is
   the hub's own topic) for a link to the supported accommodation post. Both are at the
   five-link cap so this is a swap, not an addition.
2. **Word budget.** 1,169 of 1,200. Roughly 30 words of headroom at deepening stage.
3. **No doubts on figures.** Track A's table is complete and nothing in it looked
   fragile from the editorial side.
4. Seconding Track A: `docs/care/house_positions.md` is silent on Ofsted. Two wave 1
   posts have now each derived the Notice 701/2 Ofsted listing from source
   independently. An HP row covering reg 47, CSA 2000 s.11 and the Ofsted listing would
   stop the third from doing it again.
