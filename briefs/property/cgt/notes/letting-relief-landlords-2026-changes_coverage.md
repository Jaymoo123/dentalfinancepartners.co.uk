# Coverage note: /blog/capital-gains-tax/letting-relief-landlords-2026-changes

EXTEND-GOOGLE, additive only. Executed 2026-08-20 against
`packs/PACK_blog_capital-gains-tax_letting-relief-landlords-2026-changes.md`.

metaTitle, H1, all 12 existing H2s and their order, all existing body prose and all 14
existing FAQ entries are byte-identical (verified by direct comparison against `HEAD` after
both passes). Frontmatter: `dateModified: "2026-08-20"` added after `date:` (the field did
not previously exist on this page; placement follows the estate convention).

Three passes: (1) added the plain-language layer, (2) trimmed it to clear the deterministic
voice gate, (3) applied both QA tracks' must_fix findings (see "QA round" below). Final gate
readings: `voice_scan.py` **34.7 / MINOR**; `sdlt_equity_gate.py --cluster cgt --baseline
HEAD` **passes**; 19/19 section-3 keywords covered by the gate's own matcher; zero
em-dashes and zero en-dashes.

## What was added

Eight new question-form H2 sections inserted as one plain-language block between the intro
prose and the first existing H2 ("The post-2020 framework"). The dossier §6 matched pair
says the register gap is order, not facts: the protected opening is statute-first, so the
plain layer goes above the depth rather than replacing it. Existing H2 relative order is
unchanged.

1. What is lettings relief?
2. Who qualifies for lettings relief in 2026/27?
3. Who no longer qualifies after April 2020?
4. How is lettings relief calculated?
5. Worked example: how much lettings relief would you get on a 2026/27 sale?
6. How do private residence relief and lettings relief fit together?
7. Is there still a 36-month rule for capital gains tax in the UK?
8. What will you pay in 2026/27 if lettings relief does not cover your gain?

Six new FAQ entries appended to `faqs:`.

A ninth section, "How do you work out the gain attributable to letting?", was drafted and
then merged into section 4 as its third numbered step during the voice-gate pass below. The
phrasing "work out the gain attributable to letting" survives verbatim as the step label, so
the cruseburke heading theme and the Bing query behind it are still carried; only the
duplicate H2 went.

## Measured against the §6 language spec

| Measure | Spec target | New sections |
|---|---|---|
| Question-form headings | raise (winners 31.5%) | 8 of 8 = 100% |
| "you/your" per 1,000 words | 25+ | 48.5 |
| Statute refs in section openings | near zero | 0 (asserted by check) |
| Em-dashes | none | 0 in file |
| Current tax year | one only | 2026/27 |

New body block: **1,319 words** across 8 sections, plus six FAQ entries. Drafted at 1,955,
trimmed to 1,351 for the voice gate, then rebuilt through the QA round to 1,319. Total page
body 3,969 words.

## Section-3 keywords: placed

All 19 §3 rows carry a single best-peer domain in the pack, so the ">= 2 domains" half of
the acceptance test is not evaluable from the pack data (see "Caveat" below). Every row with
vol >= 50 is therefore placed or declined on its own merits; nothing was skipped on the
domain-count test.

| keyword | vol | placed |
|---|---|---|
| cgt letting relief | 320 | H2 1 body ("CGT letting relief"); FAQ "Is residential lettings relief the same as CGT letting relief?" (question + answer) |
| capital gains tax letting relief | 320 | H2 1 body, sentence 2 |
| letting relief on capital gains tax | 320 | H2 1 opening sentence ("capital gains tax relief worth up to £40,000... on the part of your property gain") + FAQ 4 answer |
| letting relief cgt | 320 | H2 1 body ("letting relief, CGT letting relief"); FAQ 4 answer lists the variant explicitly |
| lettings relief capital gains | 320 | H2 1 opening + H2 4 body |
| lettings relief on capital gains tax | 320 | H2 1 opening; FAQ 4 answer |
| letting relief capital gains tax | 320 | H2 1 body sentence 2 (also the highest-volume Bing register phrase, protected) |
| cgt lettings relief | 320 | FAQ "Is residential lettings relief the same as CGT letting relief?" question + answer |
| lettings relief capital gains tax | 320 | H2 1 opening + FAQ 4 |
| capital gains letting relief | 320 | H2 1 body |
| lettings relief for cgt | 320 | H2 1 body ("lettings relief for CGT") |
| cgt private residence relief | 260 | H2 6 body ("searches for CGT private residence relief and PPR CGT"); FAQ "What is PPR for CGT, and is it the same as PRR?" |
| capital gains tax private residence relief | 260 | H2 6 (heading + naming paragraph); same FAQ's answer |
| ppr cgt | 90 | H2 6 naming paragraph; FAQ "What is PPR for CGT" question |
| cgt relief on property | 140 | FAQ "What capital gains tax reliefs on property can you claim if lettings relief is closed to you?" (answer: "the realistic CGT reliefs on property") |
| capital gains tax reliefs on property | 140 | same FAQ, question verbatim |
| capital gains tax relief property | 140 | same FAQ, question/answer |
| 36 month rule capital gains tax uk | 90 | H2 7 heading + answer sentence ("a 36-month rule for capital gains tax in the UK") |
| 36-month rule capital gains tax uk | 90 | H2 7 (hyphenated form in heading and body) |

Placed: 19 of 19. Declined: 0.

## Bing equity register: preserved and extended

Every §2 Bing query still matches. The new block additionally places phrasings that had
impressions but no matching copy:

- "what is letting reflief" / "what is letting relief on capital gains tax" / "what is
  lettings relief from cgt" -> H2 1 (exact question form).
- "lettings relief abolished" / "freehold lettings relief abolished april 2026" -> FAQ "Has
  lettings relief been abolished?" and H2 3. Answered as "no, but closed to most landlords",
  which is the house position, not the competitor framing.
- "when does lettings releif apply" / "hmrc letting relief when can this be claimed?" -> H2 2.
- "how do we work out the gain attributable to letting" (cruseburke heading, and the Bing
  query "examples of lettings relief with full ppr in a capital gains computation") -> H2 4
  step 3, whose label is "Work out the gain attributable to letting", plus the worked example.
- "can you claim both letting relief and annual exempt amount on capital gains tax" -> FAQ
  "Can you claim both lettings relief and the annual exempt amount?".
- "tax return sas we need a computation for letting relief" -> FAQ "Do you have to show the
  lettings relief computation on your tax return?".
- "residential lettings relief cgt" -> FAQ 4.
- "prr rules 2026" -> H2 7.
- "rent a room relief interaction private residence relief from cgt" -> already covered by
  the protected Rent-a-Room H2; FAQ 4 adds the "do not confuse it with Rent-a-Room" line.

Statute-shaped queries ("tcga 1992", "s223b post 6 april 2020 letting relief", "article 223
b 6") stay served by the protected depth sections, which is why the plain layer was added
above them rather than in place of them.

## Competitor heading themes (pack §4): every one decided

| theme | source | decision |
|---|---|---|
| What is Lettings Relief? | cruseburke H1/H2, taxd title | ADDED as H2 1 |
| Criteria for Eligibility | cruseburke | ADDED as H2 2 |
| The Co-Occupancy Qualification Threshold / Strict Co-Occupancy Rules | taxd x2 | ADDED in plain form as H2 2; specialist depth already in the protected shared-occupation H2 (KEEP) |
| How Lettings Relief Is Formally Calculated / The Way to Calculating | taxd, cruseburke | ADDED as H2 4 |
| The Three Calculation Caps | taxd PRR | ADDED as H2 4 step list ("lowest of three") |
| How do We Work out the Gain Attributable to Letting? | cruseburke | ADDED as H2 4 step 3 (was its own H2 until the voice-gate merge) |
| Common Examples | cruseburke | ADDED as H2 5 (worked example, 2026/27 figures, cap biting) |
| Interaction with Private Residence Relief / What if my let property has been my private residence? | taxd, uklandlordtax | ADDED as H2 6 |
| The Pro-Rata Month Counting Formula | taxd PRR | PARTIAL by design. The apportionment mechanic is stated in H2 4 step 3 and the full time-apportionment formula stays owned by the PRR page, which is linked. Duplicating it here would cannibalise our own PRR page. |
| The Final 9-Month Buffer Exemption | taxd PRR | ADDED as H2 7, framed against the "36-month rule" query rather than as a buffer explainer, because that is where the volume is |
| Settling Your Final Bill: 2026/27 CGT Rates / The Strict 60-Day Compliance Window | taxd x3 | ADDED as H2 8 (rates + ordering + 60-day summary, linking to the two owning pages). The protected "Reporting and records" H2 keeps the records depth. |
| Multiple Homes and the 2-Year Nomination Window | taxd PRR | DECLINED. Owned by `/blog/capital-gains-tax/cgt-main-residence-election-two-properties`; linked from H2 6 instead of restated. |
| Key Points to Remember / The Bottom Line | taxd x2, cruseburke | DECLINED. Summary padding; the page already leads each section with its answer, so a recap adds words without adding a phrasing we do not hold. |
| Looking for something else? | taxd x2 | DECLINED. Site navigation, not content. |
| How Can I Benefit From Lettings Relief? | cruseburke | DECLINED as a separate heading; folded into H2 2, which answers the same intent without a second eligibility section. |
| Do you have a question for our landlord tax experts? | uklandlordtax | DECLINED. The page already carries two conversion asides; §6 flags booking-CTA padding as a do-not-copy. |
| Calculator embed | taxd x2, uklandlordtax | DECLINED. Out of scope for an additive content pass, and no calculator component exists on this template. Logged, not built. |
| Stale-year figures left on page (cruseburke still quotes £11,100 AEA) | cruseburke | DECLINED explicitly per §6 do-not-copy. New sections use £3,000 and 2026/27 only. |

## Facts checked against house_positions.md §5

- £40,000 cap, per owner, shared-occupation gateway from 6 April 2020: consistent with §5
  "Letting Relief: restricted from 6 April 2020 - only available where the owner shared
  occupation with the tenant during the let period".
- Rates 18% / 24% residential, AEA £3,000, final period 9 months: §5 verbatim.
- 60-day return required only where CGT is due for UK residents, and on every UK land
  disposal for non-residents: §5 verbatim. H2 9 states both halves.
- 36-month final period retained for disabled owners and those moving into care: TCGA 1992
  s.225E; consistent with CG64985, which the page already cites in Sources.
- Do-not-write list respected: no "28%", no "letting relief is available for all rental
  periods", no "60-day applies to all UK residents' disposals regardless of tax due".

**No conflict found** between the existing page and house positions. Nothing protected
needed flagging.

## New worked example (rewritten after factual QA B1)

**The first draft was wrong and QA caught it.** It gave Dana, a live-in landlord with lodgers
sharing her kitchen, bathroom and living room, a £10,876.80 CGT bill by restricting her PRR
on floor area. That is the opposite of the estate's settled position: a household lodger does
not restrict private residence relief. The protected Priya example (100% PRR, nil), the
sibling PRR page ("you still get full PRR on the eventual sale", citing CG64702) and
gov.uk `/tax-sell-home` (letting part of your home "does not include having a lodger") all
agree. The draft contradicted all three and the bridge sentence it used to reconcile them
("no room set aside") was false on the face of Priya's own facts, since Priya let a bedroom too.

Rebuilt as two cases on one set of purchase and sale figures (route (a) of the QA's two
options, the smallest change):

| | Case 1: lodgers in the household | Case 2: top floor on its own tenancy |
|---|---|---|
| Gain | £368,000 | £368,000 |
| Let-attributable | none | £368,000 × 25% × 12/15 = £73,600 |
| PRR | £368,000 (all of it) | £294,400 |
| Lowest of three | n/a | min(£294,400; £40,000; £73,600) = **£40,000** |
| Chargeable | nil | £73,600 − £40,000 = £33,600 |
| After £3,000 AEA | nil | £30,600 |
| CGT at 24% | **nil** | **£7,344.00** |

Every figure re-derived to the penny by assertion (`£294,400 + £73,600 = £368,000` closes).
Case 2 still shows the £40,000 cap biting, which is the pedagogical point the first draft was
built for, but it now does so on facts where the relief genuinely operates: shared occupation
preserved (kitchen and hallway shared, so the s.223B gateway holds) while a distinct part is
exclusively let (so PRR is restricted and a residual gain exists).

Case 1 now agrees with Priya, the sibling page and gov.uk, and says so explicitly ("it matches
the second worked example further down this page"). The false bridge sentence is deleted.

**Honest boundary statement, as the coordinator required.** The closing paragraph states that
the line between the two cases is fact-specific, that HMRC treats an ordinary household lodger
as not restricting PRR at all so most arrangements land in case 1, and that pushing the facts
far enough to restrict PRR risks failing the shared-occupation test as well, leaving no relief
at all. The qualifying window is narrow and the copy now says so.

Two upstream paragraphs carried the same wrong claim and were corrected with it: the
calculation section's PRR step (was "restricted for any part given over to your tenant's
exclusive use", now "where a distinct part was let on its own terms rather than shared with
you as one household") and the apportionment paragraph that has since been deleted as
duplicative.

**Flagged, not decided (per house positions §14).** The underlying question the QA raises is
where exactly the estate draws the CG64702 line between a household lodger and a
separately-occupied part. §5 carries no lodger/PRR-restriction depth, so this cannot be
resolved from house positions. The new copy sits on the conservative side (lodger = full PRR)
because that is what three existing surfaces already say. A deeper methodological clash the
editorial track spotted is **not** fixed and is not fixable from this side: Priya's protected
example restricts PRR by time only, the new example restricts by floor area as well. Both are
defensible on their own facts, but if the estate wants one method, that is a protected-copy
change and an owner decision.

## Voice gate (second pass, same day)

The first draft took `voice_scan.py` from 33.1 (MINOR) to 36.1 (ROBOTIC), failing the deploy
gate. Final state: **34.8, band MINOR**. Equity gate re-run clean.

Where the 36.1 actually came from, measured per signal:

| signal | contribution | whose copy |
|---|---|---|
| S2 meta-commentary (2 hits, "This guide sets out...") | 16.67 of the score | protected baseline, untouchable |
| S1 abstract nouns (27 hits) | 9.43 | 26 of 27 protected ("the owner" x25, "the individual"); exactly 1 was mine |
| S6 length (4,605 body words vs 2,200 ideal, saturated) | 10.00 | mine to fix |

So only S6 and one S1 hit were in scope. Actions taken, new block only:

1. Trimmed the block 1,955 -> 1,351 body words (604 words, 31%), all of it cross-section
   repetition: merged the two calculation sections, cut the duplicated shared-occupation
   restatements between "who qualifies" and "who no longer qualifies", removed the ordered
   list in the rates section that repeated the calculation steps verbatim, and collapsed the
   worked example from five labelled steps to four.
2. Fixed the single S1 hit that was mine: "the realistic CGT reliefs on property for a
   landlord who cannot use lettings relief" -> "...if lettings relief is closed to you".

Nothing protected was touched, and all 13 keyword carrier strings were re-verified present
after the trim.

**Structural ceiling, flagged rather than buried.** This page cannot get much below ~34
without gutting the new plain layer. Protected copy alone contributes about 26.5 points
(16.67 from the two S2 hits, ~9.9 from the 26 protected S1 hits), and because S1 is a
density signal, every further word trimmed raises S1 per-1k and gives back roughly a third
of what the length cut wins. The marginal rate is about -0.003 points per body word removed.
Getting to a comfortable 33 would mean deleting most of the layer the pack asked for. The
0.2 margin at 34.8 is real and worth knowing about: any later addition to this page of more
than ~60 body words re-breaks the gate unless the protected S2 lines are dealt with first.

Rejected on the way: converting the worked-example step lists into a `<table>` would have
dropped ~110 words from the S6 count for free, since the scanner strips table cells. That is
gaming the counter rather than improving the page, and it would break parallelism with the
protected Priya example directly below, which uses the same `<p><strong>Step N</strong></p>`
plus `<ul>` idiom. Not done.

## QA round (both tracks must_fix, all findings actioned)

Factual: 2 BLOCKER + 7 ADVISORY. Editorial: 3 BLOCKER + 7 ADVISORY. All closed.

| Finding | Action |
|---|---|
| FACTUAL B1 (Dana taxed on a lodger case) | Rewritten as two cases, see above |
| FACTUAL B2 (loss ordering backwards, body + FAQ) | Split the two limbs in both places: this year's losses before the £3,000 and used in full even where that wastes it; brought-forward losses after it and only down to £3,000. **No statute section cited** (the QA could not verify the post-FA 2019 rewrite number, so the rule is stated bare, which is accurate) |
| FACTUAL A1 (24% with no income stated) | Added "She is a higher-rate taxpayer with no basic-rate band left" |
| FACTUAL A2 (completion vs exchange) | "for capital gains tax you sell on exchange of contracts rather than completion. Exchange on or after 6 April 2020..." The 60-day paragraph keeps "60 days from completion", which is the correct test for that clock |
| FACTUAL A3 (s.225E second limb) | Added: long-term disabled / permanent care-home move, "provided neither you nor your spouse or civil partner has another property that is your main residence" |
| FACTUAL A4 (worksheet-with-return backwards) | Claim dropped. Now "Provide your computation with the return, as the SA108 notes ask, and keep the working papers behind it" |
| FACTUAL A5 (nil-gain disposal still on SA) | Deleted from both new instances (FAQ sentence and body clause). The protected "Reporting and records" section still says it; that is protected copy and out of scope, flagged not edited |
| FACTUAL A6 (flat "annexe" contradicts protected) | "annexe" dropped from the absolutist list; the protected fact-specific annexe treatment now stands alone |
| FACTUAL A7 (£80,000 stated bare) | "...if you both own the property and you both lived there alongside the tenant" |
| EDITORIAL B1 (false cross-reference) | Sentence deleted; superseded by the B1 rewrite |
| EDITORIAL B2a/b/c (three keyword lists as prose) | Search framing removed from all three. "If you have been searching for..." → "Letting relief, lettings relief and CGT letting relief are the same thing"; the "PPR CGT" clause deleted; "the common spelling in search" and "still the more common search term" cut to the usage fact |
| EDITORIAL B3 (60-day stated three times) | Final sentence of the new FAQ deleted; the body instance kept as the plain-language surface |
| EDITORIAL A3 (36-month phrase stuffed) | "quoting a 36-month rule for capital gains tax in the UK" → "quoting a 36-month rule" (the H2 above still carries the full phrase) |
| EDITORIAL A4 (FAQ restates its own question) | Sentence deleted |
| EDITORIAL A5 (FAQ duplicates body) | HMRC-usage sentence dropped from the FAQ; the body owns it |
| EDITORIAL A6 (antithesis at machine density) | "a ceiling rather than a starting point ... per owner rather than per property" → "a ceiling, not a starting point, and it goes per owner"; the "expensive thing to believe" flourish cut; the duplicated "for lettings relief to catch/work on" metaphor removed |
| EDITORIAL A7 (quotes, bullet parallelism) | Double quotes → single; bullets 3-4 recast into second person |
| EDITORIAL A1, A2 (seam duplication, £80k four times) | Accepted as advised, no fourth surface added |

**Word budget.** The QA's ledger predicted −137 words, but FACTUAL B1's two-case rewrite is
additive, so the net after both tracks was +143 body words and the voice gate went back to
35.3 ROBOTIC. Recovered by deleting duplication the B1 rewrite had newly created (the
apportionment paragraph and the cap paragraph in the calculation section, both now shown by
the worked example) plus four smaller restatements. Net across the QA round: **4,001 → 3,969
body words (−32)**, gate 34.8 → **34.7**.

## Caveat recorded, not hidden

The acceptance criterion is "vol >= 50 and >= 2 domains". The pack's §3 table records one
best-peer domain per keyword, and §7 of the dossier notes that ukpropertyaccountants (the
best-peer domain on 16 of the 19 rows) serves a captcha stub, so its ranking is a
keyword-database snapshot with no teardown behind it. The two-domain test could not be run
from the pack. The conservative call was to place every row rather than decline any on an
unverifiable count, which costs nothing here because the 19 rows collapse into four intent
groups (lettings relief, private residence relief, property CGT reliefs, 36-month rule) and
all four had a genuine content gap.

Also unrun: the §3 "vol/mo" figures sum close variants (dossier §7), so the 320/mo repeated
across 11 letting-relief rows is one demand pool, not eleven.

## Failure trigger (from pack §8, restated for the 28d read)

Bing baseline: 15 impressions, 1 click, position 7. At 28 days, if Bing position is worse
than 9 or Bing clicks are 0, revert the single commit touching this page.
