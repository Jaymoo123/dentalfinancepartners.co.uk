# Coverage note: /blog/capital-gains-tax/cgt-calculation-selling-buy-to-let-property-step-by-step

Worked 2026-08-20. Pack: `packs/PACK_blog_capital-gains-tax_cgt-calculation-selling-buy-to-let-property-step-by-step.md`.
Grade EXTEND-BING, additive only. Diff is 67 insertions, 0 deletions, 0 modified lines
(`git diff --numstat`), so metaTitle, H1, every existing H2, all existing body prose and all
14 existing FAQ entries are byte-identical. Existing H2 relative order unchanged; new H2s are
interleaved around them.

QA round 2 applied 2026-08-20 (see "QA fixes" at the foot of this note): 2 factual BLOCKERs,
3 editorial BLOCKERs, 3 advisories. All edits were confined to lines this pass added.

## What was added

Body: 5 new H2 sections, ~1,290 words.

| # | New H2 | Position |
|---|---|---|
| 1 | Do you pay capital gains tax when you sell a rental property? | above "The five-step calculation" |
| 2 | What can you deduct when you sell a rental property? | above "The five-step calculation" |
| 3 | Do you have to tell HMRC when you sell a buy-to-let? | above "Reporting and payment" (cut to a direct answer plus a pointer at QA) |
| 4 | What if you sell one buy-to-let and buy another? | above "Reporting and payment" |
| 5 | Can you avoid capital gains tax on a rental property? | above "Records and documentation" |

FAQs: 6 new entries appended after the existing 14 (total 20).

1. How much is capital gains tax on a rental property in 2026/27?
2. Do you pay capital gains tax on your primary residence?
3. Can you claim letting relief on capital gains tax when you sell?
4. Does moving back into a rental property avoid capital gains tax?
5. How do joint owners report a buy-to-let sale to HMRC?
6. Can you use a buy-to-let loss in a CGT return?

Frontmatter: `reviewedAt: "2026-08-20"` and `dateModified: "2026-08-20"` added (both fields were
absent; placed after `summary:` and before `schema:` per house convention). Nothing else in
frontmatter touched.

Total words added including FAQ text: ~1,930 (1,232 body).

## Language spec compliance (DOSSIER §6)

- All 5 new H2s are question-form in the searcher's words (page question-heading share rises from 0/12 to 5/17).
- Direct answer with the number in the first sentence of every new section ("18% ... 24% ... £3,000 ... 60 days", "four things ... you cannot deduct anything you paid on the mortgage", "Yes, if there is CGT to pay ... within 60 days", "You still pay the CGT", "You cannot avoid it on a taxable gain, but you can usually reduce it").
- "you/your" in new body sections: 61 in 1,232 words = 50 per 1,000 (target 25+).
- Statute refs in new sections: 1 ("the Section 24 restriction"), and not in an opening sentence. 0.8 per 1,000 (target near zero).
- Counted-preamble openers ("[number] [plural noun] [verb]", cross-page tic X.1): 1 on this page after QA ("Three things set the bill…"). The other two were rewritten.
- No em-dashes anywhere in the added text (verified by grep on the diff).
- Current year throughout: 2026/27, 18%/24%, AEA £3,000, 60-day reporting. Verified against `docs/property/house_positions.md` §5.

## Placed keywords (section 3)

| keyword | vol | where placed |
|---|---|---|
| capital gains on rental property | 590 | H2 1 opening sentence, verbatim |
| selling rental property capital gains tax | 210 | H2 1 body: "if you are selling rental property out of a portfolio you run the same five steps for every disposal" (reworded at QA advisory 2.4; the phrase survives, the keyword-as-subject construction does not) |
| capital gains selling rental property | 210 | same sentence as above (both phrasings served by one near-verbatim placement) |
| letting relief on capital gains tax | 320 | FAQ 3 question, verbatim ("Can you claim letting relief on capital gains tax when you sell?"), with link to `letting-relief-landlords-2026-changes`. The welded second copy of the phrase in the answer was cut at QA advisory 2.5 |
| how to avoid capital gains tax on property | 170 | H2 5 opening paragraph: "the honest list of ways to avoid capital gains tax on property is short enough to fit in five bullets". Carries "avoid capital gains tax on property" verbatim; the "how to" prefix was dropped when the searcher-plumbing opener was cut at QA blocker 2.3. The H2 itself ("Can you avoid capital gains tax on a rental property?") carries the question intent |
| how to avoid cgt on property | 170 | H2 5 (heading + body carry "avoid capital gains tax on a rental property"; same section, same answer) |
| avoid cgt on property | 50 | H2 5 |
| avoid capital gains tax on property | 50 | H2 5 |
| avoiding capital gains on property | 50 | H2 5 |
| how to avoid capital gains tax uk property | 140 | H2 5 |
| how to reduce capital gains tax on property uk | 70 | H2 5 bullet list (five reduction levers) + link to `reduce-cgt-property-disposal-uk` |
| do you pay capital gains on primary residence | 110 | FAQ 2 |
| do you pay capital gains tax on your primary residence | 90 | FAQ 2, verbatim question |
| move back into rental property to avoid capital gains uk | 90 | FAQ 4 + closing paragraph of H2 5 ("moving back into a rental property to clear the gain"). The two were rewritten at QA blocker 2.2 so they no longer share a sentence shape: the body carries the apportionment arithmetic and the final-nine-months correction, the FAQ carries the quality-of-occupation test |

14 of 22 placed. Every keyword at or above 50/mo is either placed above or declined below.

## Declined, with reasons

| keyword(s) | vol | reason |
|---|---|---|
| how to avoid property capital gains tax; how to avoid capital gains on property; how can i avoid capital gains tax on property; how to avoid capital gain tax on property; how to avoid capital gains tax on a property; how do i avoid capital gains tax on property; how to avoid tax on capital gains from property | 170 each | Same intent and same answer as the placed "how to avoid capital gains tax on property". Repeating seven rewordings would be keyword stuffing on a page whose grade is EXTEND, not a rewrite; one honest section answers all of them. |
| flipping houses avoid capital gains tax uk | 170 | Declined on subject. The honest answer is that a flip is usually taxed as trading income under the badges of trade, not as a capital gain, so it is a different tax entirely and cannot be answered inside a CGT computation page without misleading the reader. Belongs on a trading-vs-investment page, which we do not currently have. |

## Cannibalisation calls recorded

- The "avoid / reduce CGT" family is the subject of `/blog/capital-gains-tax/reduce-cgt-property-disposal-uk`. H2 5 gives the direct answer and the five levers that are already worked in this page's own examples, then hands off with a link rather than restating that page's ten-lever survey (incorporation, s.162 deferral, BADR, portfolio timing all stay there).
- `letting relief on capital gains tax` (320/mo) is placed as an FAQ only, not a new H2. DOSSIER §4c.8 assigns the cgt letting relief cluster to `letting-relief-landlords-2026-changes` (peer-winnable 4,270). A short FAQ carries the phrase without building a competing section.
- `primary residence` phrasings are placed as one FAQ with a link to `principal-private-residence-relief-landlords`, which DOSSIER §4c.4 owns for main-residence intent.
- Sibling `cgt-selling-buy-to-let-property-calculation-guide` runs the same five steps as a plain walkthrough. Differentiated by pointing to it once at the end of H2 1 as the walkthrough version; this page keeps the worked-example role. Nothing from the sibling restated.
- Main guide `capital-gains-tax-property-complete-guide-uk` is linked in the existing intro and again at the close of H2 5.

## Bing equity reinforced (pack §2)

New sections deliberately answer live Bing queries that had no matching heading before:

- "cheaper to pay off buy to let mortgage or pay capital gains tax" and "can you offset the capital gains by the amount of interest paid" -> H2 2, both answered explicitly as bullets.
- "declaring cgt on sale of let property", "i sold a btl property, do i need to let hmrc know", "when do you have to complete a tax form when you sell a buy to let", "report a gain on a buy to let property" -> H2 3.
- "if i sell a buy to let and buy an other do i pay cgt", "if i sell my buy to let flat to buy another one do i have to pay capital gains" -> H2 4.
- "if owned a buy to let property jointly how do you report this sale on each individual cgt account?" -> FAQ 5 only (the duplicate body sentence was cut at QA advisory 2.7).
- "can i use a buy to let loss in a cgt return", "loss from sale of btl property" -> FAQ 6.
- "is there relife on buy to let cgt if you ever lived in th property yourself", "capital gains tax rules on buy to let if the owner lives in the property" -> FAQ 2 and FAQ 4 (worked example 3 already carried the mechanics).
- "mitigate cgt on btl sale" -> H2 5.

No existing wording that matched a section 2 query was altered, so the equity register is intact by construction.

## Competitor themes (pack §4) adjudicated

landlordstudio `how-to-avoid-capital-gains-tax-uk-on-rental-property` is the only teardown-able competitor (ukpropertyaccountants serves a captcha stub).

| Theme | Call |
|---|---|
| "You have 60 days to report and pay CGT after completion" (question-form deadline H2) | ADOPTED as H2 3 in our own words. |
| "What costs can you deduct from a capital gain?" | ADOPTED as H2 2, extended with the two mortgage questions they do not answer. |
| "How to Avoid Capital Gains Tax (UK)" + the three numbered levers | ADOPTED in compressed form as H2 5, with the handoff link. |
| "Worked example: CGT on a rental property sale in 2026/27" | ALREADY OURS, five worked examples versus their one. No change. |
| "Lettings Relief: why most landlords no longer qualify" | DECLINED as a section, placed as FAQ 3. Cluster is owned by `letting-relief-landlords-2026-changes`. |
| "The Importance of Expert Advice", "About Landlord Studio", "Create your FREE account", login/signup furniture, "You Might Also Like", "Costly MTD Mistakes" | DECLINED. Chrome and CTA padding, explicitly on the DOSSIER §6 do-not-copy list. |

Zero undecided heading themes remain.

## Specialist layer kept (pack §6)

KEEP, untouched: worked examples 1, 2, 2a, 3, 4, 5; capital vs revenue table; part-disposal
and deemed-disposal mechanics; the 2027 income tax interaction; records and documentation.
No competitor has an equivalent to any of these.

## QA fixes (round 2, 2026-08-20)

Sources: `qa/FACTUAL_reliefs-family.md` (page 3, verdict must_fix) and `qa/EDITORIAL_batch3.md`
(target 2, verdict must_fix). All fixes confined to lines added by this pass; the diff is still
0 deletions and 0 modified pre-existing lines.

### Factual blockers

**BLOCKER 1, brought-forward loss ordering.** The "Losses, including old ones" bullet said a
carried-forward loss "comes off before your annual exempt amount is applied". That is backwards
under TCGA 1992 ss.1I and 1K, and it contradicted this page's own Worked Example 5. Rewritten to:
in-year losses come off before the annual exempt amount, brought-forward losses only after it and
only down to the allowance, which is what stops the old loss being wasted. The new FAQ 6
("Can you use a buy-to-let loss in a CGT return?") carried the same defect implicitly and now
states the brought-forward rule the same way. Page is now internally consistent with Example 5.

**BLOCKER 2, exchange versus completion.** The "Timing" bullet advised that "completing on 6 April
rather than 5 April moves the gain into the next tax year". False: the disposal date for CGT is
the contract date (TCGA 1992 s.28(1)); only the 60-day clock runs from completion. Rewritten as
"Timing, measured from exchange", with the two secondary defects QA flagged also fixed: the fresh
allowance and band are now stated conditionally ("can hand you an unused…"), and the false claim
that it defers the payment date is replaced by the correct position (where CGT is due, payment
still runs 60 days from completion). One consequential knock-on found while fixing it: H2 1 said
the rate turns on the band free "in the tax year you complete", now "the tax year the sale falls
into".

### Editorial blockers

**2.1, reporting seam.** The new "Do you have to tell HMRC when you sell a buy-to-let?" section ran
the same three facts as the protected "Reporting and payment" H2 sixteen lines below it. Cut from
three paragraphs to two: the direct answer (yes where tax is due, 60 days, nothing to file where
the gain is covered), the loss point the protected section does not carry, and an explicit pointer
down to the reporting section for the non-resident rule, penalties and the Self Assessment
sequence. Nothing is now answered twice. The heading is kept because it is the carrier for the
Bing "do i need to let hmrc know" family.

**2.2, moving-back pair.** The FAQ and the body paragraph were the same two sentences with the
numerals swapped. The body keeps the apportionment arithmetic and gains the factual advisory-3
correction (the final nine months already qualified, so moving back does not buy them twice); the
FAQ drops the arithmetic entirely and carries the quality-and-permanence test instead. No shared
sentence shape remains.

**2.3, searcher plumbing.** "Searches for how to avoid capital gains tax on property nearly always
end at the same short list" removed. Replaced with a sentence addressed to the reader that still
carries the keyword. Keyword-carriage consequence recorded in the placed-keywords table above.

### Advisories taken

- 2.4 keyword-as-subject ("The capital gains tax on selling rental property is worked out…") rewritten to second person; phrase retained.
- 2.5 "letting relief on capital gains tax" weld cut from the FAQ answer; the phrase survives in the FAQ question, where it is natural.
- 2.7 joint-owner reporting now appears once (FAQ 5), not twice.
- Factual advisory 1: "comes off the gain at your marginal rate" corrected to "comes off the gain itself, so it saves you 24p or 18p in the pound".
- Factual advisory 2: the joint-owner FAQ's Self Assessment sentence is now conditional on being in Self Assessment and on the gains/£50,000 proceeds thresholds.
- X.1 counted-preamble openers cut from three to one.
- Two voice_scan hits of my own making were also cleared: an abstract-noun "a landlord selling rental property" and a meta-commentary "on this page shows the split".

### Advisories not taken, with reasons

- **2.6 (the new H2 1 delivers rates, while the protected intro says the page focuses on the computation).** The DOSSIER §6 spec requires the direct answer with the number in the first sentence of a new section, and the pack requires this page to carry "capital gains on rental property". Reordering to satisfy the signpost would break the spec. The rate sentence is one sentence and hands straight back to the computation. Logged, not actioned.
- **Factual advisory 3 on the FAQ side** is moot: the FAQ no longer carries the final-nine-months clause at all after the 2.2 rewrite.

## Verification done

- YAML frontmatter parses; 20 FAQ entries; reviewedAt and dateModified both "2026-08-20".
- `git diff --numstat` = 67/0, no modified pre-existing lines.
- `python scripts/sdlt_equity_gate.py --cluster cgt --baseline HEAD` -> "EQUITY GATE: all packs pass (equity coverage, protected elements, ledger balance)", exit 0. Re-run after the QA fixes.
- `python scripts/voice_scan.py --slug cgt-calculation-selling-buy-to-let-property-step-by-step --site property` -> robot_score 24.8, band **MINOR** (was 34.5 before the QA fixes). S4 em-dashes 0, S3 0, S5 0, S7 0. The 4 remaining S1 hits and both S2 hits are in protected pre-existing copy (the summary and intro "This guide walks through…", and the existing letting-relief and PRR FAQ wording); none are in the added copy. S6 flags 3,594 body words against a 2,200 ideal, which is the expected consequence of an EXTEND on an already-long page and is not a defect this pass can fix without deleting protected copy.
- Zero em-dashes in every added line (grep on the diff).
- Arithmetic re-derived on everything touched: the £100 penalty and £50,000 SA proceeds threshold survive unchanged; the improvement-relief value was restated as 24p or 18p in the pound, which is just the 24%/18% rates expressed per pound; the moving-back example is unchanged at one year in fifteen (1/15 = 6.7% of the gain relieved) and the FAQ's competing "two twentieths" version was deleted rather than re-derived. No worked example was touched, so examples 1 to 5 are byte-identical and their arithmetic is untouched.
- No claim made that could not be verified: the flipping keyword was declined for exactly that reason.

Not committed, not deployed.
