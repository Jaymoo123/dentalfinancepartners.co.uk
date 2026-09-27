# Track B editorial QA: how-to-start-a-domiciliary-care-agency-money-decisions

Reviewed 2026-09-27, after the Track A factual pass (PASS, 0 edits). Compared against all 11 siblings in `docs/care/_wave1/posts/` and the two newest live posts, `care/web/content/blog/cqc-registration-costs-and-finance-guide.md` and `care/web/content/blog/cqc-registration-timeline-cash-burn-before-trading.md`.

**Verdict: FAIL, fixed in place.** 13 edits. Body 1,194 words (was 1,195). No figure, rate, date or rule changed.

## What failed

The post is the wave's hub for the "how to start an agency" query, and it was assembled out of recitals that siblings own more fully. Nine of its sentences were verbatim or near-verbatim with another post. That is the defect: not that the facts are repeated, which the format requires, but that the wording is the same, so the hub reads as a digest of its own children rather than as the page that sequences the decisions.

Two recitals in particular recur across the whole care wave:

- **The corporation tax band.** `care-structure-before-cqc` devotes a whole H2 to it and carries it in its summary and key takeaways; `opening-a-childrens-home-finance` and `supported-living-company-structure-before-framework-bid` both recite it too. This post's version of the sentence matched the sibling's key takeaway almost word for word.
- **The HSCA 2008 offence.** Six posts in the wave state it, plus both live posts. `cost-to-set-up-a-care-agency` and the live `cqc-registration-timeline-cash-burn-before-trading` own it with the pre-revenue cash model attached.

## Edits

| # | Where | What |
|---|---|---|
| 1 | D1, para 2 | Corporation tax recital cut to a clause and linked. The band and the dividend rates stay in one sentence; the rate-by-rate breakdown ("basic rate / higher rate / additional rate", the £500 dividend allowance) moves to the link. New link to the sibling `care-structure-before-cqc`. |
| 2 | D2, para 1 | HSCA recital cut to a clause. The offence is still stated; the Act's name drops out, because the sentence now runs into the existing link to `cqc-registration-timeline-cash-burn-before-trading`, which carries the citation and the model. |
| 3 | D2, para 2 | "New providers submit a financial viability statement on CQC's own template" was verbatim with `cqc-registration-domiciliary-care-finance` (twice) and near-verbatim with the live registration-costs post. Reworded. The second link in the paragraph was removed; the walkthrough link stays. |
| 4 | D3, para 1 | The Group 7 sentence was verbatim with `cost-to-set-up-a-care-agency`, `vat-on-domiciliary-care` and `care-personal-assistant-vat-registration`. Reworded around the registration date rather than the statutory formula. |
| 5 | D3, para 2 | "VAT on your office, vehicles, software, equipment and professional fees is a permanent overhead" was near-verbatim with `cost-to-set-up-a-care-agency`; "several million pounds of exempt fee income" was near-verbatim with `vat-on-domiciliary-care`. Both reworded. |
| 6 | D3, para 3 | Track A note 1. The de minimis test read as a single limb. Reworded to "fails the de minimis test, whose first limb is £625 a month", which stops the sentence claiming to state the whole test without changing the figure or adding one. |
| 7 | D4, para 1 | The self-employment paragraph was near-verbatim with the closing paragraph of `cost-to-set-up-a-care-agency` and with this post's own FAQ 4. Rewritten as the fuller treatment, since this is the section that owns the point. |
| 8 | D4, para 2 | The travel time, mileage and holiday accrual sentence was near-verbatim with `cost-to-set-up-a-care-agency`. Resequenced; all four figures and the working-time rule kept intact. |
| 9 | D5 | "assembles those lines" was a verbatim collision with `cost-to-set-up-a-care-agency` on the same calculator link. Reworded. |
| 10 | Closing para | Removed "The full setup is covered on our start a domiciliary care agency page" and its `/services/` link. See the link note below. |
| 11 | FAQ 1 | Corporation tax figures removed from the answer; they now sit once, in D1. |
| 12 | FAQ 2, 3, 4, 5 | Reworded off the sibling wording (FVS template, Group 7 and the £90,000 threshold, self-employed carers, travel and mileage). |
| 13 | Key takeaway 4 | Was near-verbatim with key takeaway 3 of `cost-to-set-up-a-care-agency` and with a takeaway in the live registration-costs post. Rewritten around the loaded hour rather than the wage line. |

## Links

Five before, five after, so still at the cap and not over it.

- Added: `/blog/business-structure-and-acquisition/care-structure-before-cqc`
- Removed: `/services/start-a-domiciliary-care-agency`
- Removed: the second, duplicate `/blog/cqc-and-financial-compliance/cqc-registration-timeline-cash-burn-before-trading` in D2 para 2, since the same target is linked from D2 para 1
- Unchanged: the FVS walkthrough, the sleep-in and travel-time post, the true cost of a care hour calculator

The cap forced a swap. Shortening the corporation tax recital only works if it points somewhere, so one existing link had to go, and the `/services/` link was the weakest: a tack-on sentence after the devolved-nations paragraph, doing no work the rest of the post was not already doing.

## Other checks

Meta title 48, meta description 152, summary 53 words, 6 FAQs, 5 key takeaways, category verbatim, YAML re-validated after editing, `date`, `dateModified` and `updatedDate` all present and unchanged. No em-dashes, no en-dashes, no markdown in the body, no pipeline leakage, no banned claims, no pricing. All six H2s are questions answered in the first sentence; D2 and D4 now open with the answer rather than with a restatement of the question, which they did not before. Intro answers with the numbers. No thin sections; the post was at the ceiling rather than padded, so every rewrite above was paid for in words.

## Manager notes

1. **The new link is to a sibling that is not live yet.** `care-structure-before-cqc` ships in this same wave. If that post is cut or its slug changes, this post has a dead link and drops to four.
2. **Losing the `/services/` link from the wave's highest-intent post is a real cost**, not a clean win. The query behind this post is "how to start a domiciliary care agency", which is the closest thing in the wave to a service enquiry. If the five-link cap can be relaxed for one post, this is the one, and the services link is what should go back.
3. **The corporation tax band and the HSCA offence appear in six and eight posts respectively across this wave.** Fixing them post by post is the slow route. A wave-level decision on which post owns each recital, with the rest reduced to a clause and a link, would be cheaper than repeating this pass twelve times.
4. **The £500 dividend allowance is now absent from this post.** It was correct where it stood; it was removed as part of the recital trim, not because of any doubt, and it remains in `care-structure-before-cqc`.
5. **Track A note 1 was addressed by wording, not by figure.** If the house position on partial exemption should be stated as both limbs in hub posts, that is a spec decision, and HP4 would need to say so.
