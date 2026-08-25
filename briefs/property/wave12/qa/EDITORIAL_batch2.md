# Wave 12 editorial QA, batch 2 (five surfaces, five writers)

Judged against `briefs/property/wave12/_language_spec.md` (14 hard rules, §3 per-page-type bands)
and the standing editorial track. Read-only pass: nothing in `Property/web/content/blog/` was edited.

Page-type mapping used for banding: A2 `cheapest-estate-agent-fees-uk` and A7
`average-london-estate-agent-fees` on the **fee** row; A4 `can-you-sell-a-house-without-an-estate-agent`
and A11 `modern-method-of-auction-explained` on the **route** row; A13 `selling-a-probate-property`
on the **total-cost** row.

## Verdicts

| Surface | Verdict | Blockers | Advisories |
|---|---|---|---|
| `cheapest-estate-agent-fees-uk` | **must_fix** | 2 | 4 |
| `can-you-sell-a-house-without-an-estate-agent` | **must_fix** | 1 | 3 |
| `average-london-estate-agent-fees` | **must_fix** | 2 | 3 |
| `modern-method-of-auction-explained` | **must_fix** | 0 | 4 |
| `selling-a-probate-property` | **must_fix** | 1 | 4 |

No surface is all_clear. Four of the five are must_fix on their own page-level findings; all five are
must_fix on the cross-batch sameness section below, which is where the real damage is.

## The mechanical table

All five measured on body prose only, tables excluded from word/sentence/readability stats,
frontmatter excluded. Same Flesch formula as the spec (206.835 - 1.015(W/S) - 84.6(Syl/W)).

| Surface | Row | Words | Band | Mean sent. | Band | Flesch | Band | "you"/1k | Band | Q-H2 | Band | Em-dash |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| cheapest | fee | 2,048 | 1,200-2,000 **OVER** | 17.4 | 15-18 ok | 74.7 | 62+ ok | 49.3 | 45-60 ok | 7/9 78% | 40%+ ok | **0** |
| can-you-sell | route | 2,348 | 1,600-3,400 ok | 15.6 | 13-17 ok | 79.3 | 68+ ok | 48.6 | 28-50 ok | 6/8 75% | 40%+ ok | **0** |
| london | fee | 1,931 | 1,200-2,000 ok | 17.0 | 15-18 ok | 71.9 | 62+ ok | 49.7 | 45-60 ok | 9/9 100% | 40%+ ok | **0** |
| mmoa | route | 2,282 | 1,600-3,400 ok | 15.1 | 13-17 ok | 78.5 | 68+ ok | 33.3 | 28-50 ok | 9/10 90% | 40%+ ok | **0** |
| probate | total-cost | 2,731 | 1,800-2,600 **OVER** | 15.7 | 15-18 ok | 70.7 | 62+ ok | 50.5 | 45-60 ok | 9/9 100% | 30%+ ok | **0** |

**Em-dashes: zero across all five, body and frontmatter, counted directly (U+2014 and U+2013).** The
`" - "` hits in each file are YAML list markers on the `faqs:` block, not dash substitutes. This is
the cleanest em-dash result of any Property batch and needs no action.

**Hard statutory references in prose: effectively zero.** No section numbers, no SI numbers, no Act
names, no `legislation.gov.uk` in any sentence on any of the five. The Estate Agents Act fee-disclosure
duty, the prescribed sole-selling-rights wording and the April 2025 price rules are all carried in
plain words on `cheapest` and `london`, exactly as rule 4 asks. One near-miss on `mmoa` (below).
Given our shipped `epc-certificate-cost-uk` runs 5.5 hard refs per 1,000 words, this is the single
biggest improvement the spec has bought and it held across all five writers.

**UK English: clean.** No `-ize`/`-yze`, no `color`/`center`/`program`, `licence` used correctly as a
noun on `cheapest`, `cheque` on `mmoa`.

**No our-pricing, no named personas.** Neither rule is breached on any of the five. `cheapest`'s
"Your neighbour's daughter buys your house" and `probate`'s "A son who has been left the family home"
are unnamed and generic, which is inside the rule.

---

# Per-surface findings

## 1. `cheapest-estate-agent-fees-uk` — must_fix

### BLOCKER 1.1 — a research note is printed to the reader inside a table cell

> `<td>No separate price found; the only deferred structure we checked was the pay-on-completion package above</td>`

**Why.** This is the writer's own coverage note about the state of their research, rendered in the
"Deferred or pay-later fixed fee" row of the four-model comparison table. "No separate price found"
and "the only deferred structure we checked" tell a seller nothing about their sale and tell them a
great deal about our pipeline. It is also the only self-referential "we" on the page that is not a
link, which puts it in the W5 do-not-copy class ("first-person brand performance in place of an
answer"). A comparison table that admits a gap in its own comparison undermines the other three rows.

**Drop-in fix.** Replace the cell with:

> `<td>Priced case by case, so ask for the amount in pounds and the date it falls due before you sign</td>`

### BLOCKER 1.2 — build-day date stamp in prose

> "The fixed-fee prices are Purplebricks' own published package prices **as at 21 August 2026**, and the percentage is the HomeOwners Alliance average."

**Why.** 21 August 2026 is the day this page was written. Stamping the body with the build date is
pipeline leakage in the strict sense: it dates the page to its own production run, and it rots
visibly from week two. The source-currency stamps elsewhere on the page ("updated 1 July 2026",
"updated 8 June 2026") are the publisher's own update dates and are defensible; this one is ours.

**Drop-in fix.**

> "The fixed-fee prices are Purplebricks' own published package prices, and the percentage is the HomeOwners Alliance average."

### ADVISORY 1.3 — 48 words over the fee-page ceiling

2,048 against a band of 1,200 to 2,000. Rule 14 says do not chase word count, and the winner set runs
962 to 9,801, so this is not a ranking risk. It is a band breach and the cheapest 48 words to lose are
the duplicated extras list at 1.5 below.

### ADVISORY 1.4 — the same six-item extras list runs twice on the page, as prose both times

Body: "Photography, premium portal listings, a for-sale board, an energy certificate if yours has
expired, accompanied viewings and withdrawal charges all appear in some packages."
FAQ: "ask about photography and floorplans, premium portal listings, a for-sale board, an energy
certificate if yours has expired, and any requirement to use the agent's own conveyancing partner."

**Why.** Two problems in one. It is a keyword list run as prose (six nouns, no verb doing any work),
and it is the W13 duplicated-sentence anti-pattern the spec explicitly names in §4. The FAQ block is
schema and can legitimately restate a body answer, but not in near-identical word order.

**Drop-in fix (body).** Give the list a shape the reader can act on rather than a shape they can scan:

> "Three of these bite hardest. A for-sale board and premium portal placement are usually optional, so decline them and see whether the quote moves. An energy certificate is not optional if yours has expired. Accompanied viewings and a withdrawal charge are the two that only surface when you need them, so get both amounts in writing now."

### ADVISORY 1.5 — bare percentage with no pound conversion (rule 5)

> "**Percentage range:** 0.75% to 3% plus VAT, driven by whether you sign with one agent or several, and by how hard you push back."

and

> "aim for 1.2% including VAT on sole agency"

**Why.** Rule 5 is absolute: every percentage gets a pound conversion in the same sentence or the next.
The at-a-glance box is the worst place to break it, because it is the block the SERP quotes. The same
bare `0.75% to 3% plus VAT` also appears unconverted on `can-you-sell` (see 2.4), so this is a
cross-writer miss, not a one-off.

**Drop-in fix (box line).**

> "**Percentage range:** 0.75% to 3% plus VAT, or £2,700 to £10,800 on a £300,000 sale, driven by whether you sign with one agent or several and by how hard you push back."

**Drop-in fix (negotiation line).**

> "aim for 1.2% including VAT on sole agency, which is £3,600 on a £300,000 sale"

### ADVISORY 1.6 — "sourced figures" as a phrase, twice

> "Both crossovers are **calculated from the sourced figures**, and no comparison site prints the formula."
> "Those columns are **calculated from the sourced figures above**, and the pattern is one the comparison sites never print."

**Why.** "Sourced figures" is our word for our evidence trail, not the reader's word for anything. It
appears twice here, twice on `can-you-sell` and three times in table cells on `sell-house-without-estate-agent`.
See cross-batch finding X4.

---

## 2. `can-you-sell-a-house-without-an-estate-agent` — must_fix

### BLOCKER 2.1 — the EPC figure contradicts our own EPC page, twice, inside a table

> `<tr><td>Energy performance certificate</td><td>£50 to £120</td><td>£50 to £120</td></tr>`

**Why.** Our shipped `epc-certificate-cost-uk` states £35 to £120 in its H1, meta title, meta
description, summary and FAQ. `cost-of-moving-house-uk` in this same batch correctly carries £35 to
£120. `selling-a-probate-property` carries a third figure, £60 to £120. So this cluster ships three
different EPC ranges for the same item and two of them contradict the page we rank with on that exact
query. £50 is not attributable to any source in the pack: it is neither our figure nor the
HomeOwners Alliance's. It also feeds the table's "Total in cash" row, so the totals move with it.

**Drop-in fix.** Both cells to `£35 to £120`, and correct the two total cells that depend on them
(`£5,110 to £5,880` becomes `£5,095 to £5,880`; `£850 to £2,020` becomes `£835 to £2,020`). If the
writer prefers HOA's £60 to £120 for consistency with `probate`, that is a defensible alternative but
it must then be applied to all three surfaces and to the EPC page, and it needs the HOA attribution
the probate page gives it.

### ADVISORY 2.2 — the "March exchange, May completion" sentence, twice on this page and four more times across the batch

Body: "Note the two dates as well: the tax year is fixed by when you exchange, but the 60 days run from completion."
FAQ: "so a March exchange with a May completion sits in the earlier tax year."

See cross-batch finding X1. This surface should keep the body sentence and lose the FAQ restatement,
because the FAQ answer already carries the rule without the illustration.

### ADVISORY 2.3 — bare percentage, no pound conversion (rule 5)

> "MoneySavingExpert quotes a spread of **0.75% to 3% plus VAT**, which is the honest picture: there is no cap on what an agent may charge, so what you avoid depends on what you were quoted."

**Drop-in fix.**

> "MoneySavingExpert quotes a spread of 0.75% to 3% plus VAT, which on your £300,000 sale is anywhere from £2,700 to £10,800. There is no cap on what an agent may charge, so what you avoid depends on what you were quoted."

### ADVISORY 2.4 — "This page answers can you, then should you" plus "This page is the decision"

Two contents-list signposts in one page, on top of a `summary:` frontmatter field that already runs
the full contents list. See cross-batch finding X2. "This page is the decision. That one is the
method." is the better of the two and earns its place because it disambiguates two sibling URLs; the
earlier "This page answers can you, then should you" is redundant with it and should go.

---

## 3. `average-london-estate-agent-fees` — must_fix

### BLOCKER 3.1 — the FAQ block switches to first person while every other surface in the batch stays in second

Seven `I`/`me`/`my` tokens across the FAQ block, against zero on `cheapest`, `can-you-sell`, `probate`
and `how-much-do-estate-agents-charge-to-sell-a-house`:

> "What must an agent tell **me** about fees before **I** sign, and what if they do not?"
> "How much can **I** realistically negotiate off a London quote?"
> "Is multi-agency worth it in London, and can **I** end up paying twice?"
> "Do **I** have to file a 60-day return if **I** sell **my** only home?"

**Why.** The register prescription in §3 is one register for the whole cluster and the body of this
page is solidly second person at 49.7 per 1,000. The FAQ block flips person mid-page, and it flips
against the direct sibling: `cheapest` asks "What must any agent tell **you** about fees before **you**
sign?" of the same rule. Two pages one click apart, same question, different grammatical person. This
is the clearest single artefact of five writers working in parallel. It also renders into FAQ schema,
so it is the version that surfaces in a rich result.

**Drop-in fix.** Convert all seven to second person:

> "What must an agent tell you about fees before you sign, and what if they do not?"
> "How much can you realistically negotiate off a London quote?"
> "Is multi-agency worth it in London, and can you end up paying twice?"
> "Do you have to file a 60-day return if you sell your only home?"

and the corresponding `me`/`my` inside the answer bodies. Note `mmoa` (5), `estate-agent-contract-tie-in-periods`
(11), `estate-agent-fees-for-renting` (9), `part-exchange-house-uk` (7) and `selling-a-house-at-auction-uk`
(8) have the same problem; see cross-batch finding X5.

### BLOCKER 3.2 — four separate methodology caveats, including two "our arithmetic" and one editorial aside about our own evidence quality

> "Two honest caveats, because the pages you are comparing rarely give you any."
> "The pound figures are **our arithmetic** on that percentage and on the published London average price."
> "Nobody publishes verified London completion averages you can check, so treat any borough-level "average" you read, **including ours**, as a guide rather than as data."
> "The borough row is **the softest evidence on this page, and we would rather say so than dress it up**."

**Why.** Rule 4's second half is "put the citation in the pack, not the prose", and the same logic
governs confidence annotation: the reader wants the number, the pack wants the caveat. Four passages
on a 1,931-word page is roughly one in every eight sentences spent grading our own evidence. The last
one is the worst: "we would rather say so than dress it up" is a first-person claim about our editorial
virtue, which is the W5 pattern §4 tells writers not to copy. It also reads as an apology on a page
whose job is to give a London seller a number to negotiate with.

**Drop-in fix.** Keep one caveat, in the reader's interest rather than ours, and delete the other three.
Replace all four with a single sentence after the price-band table:

> "One thing to hold in mind. That 1.8% is a published guide figure for London sole agency, not a record of what London sellers actually paid, because nobody publishes verified completion averages. Treat any borough-level average you read as a starting point for your own three quotes."

Then delete "The borough row is the softest evidence on this page, and we would rather say so than
dress it up." entirely, and cut "including ours" and "Two honest caveats, because the pages you are
comparing rarely give you any."

### ADVISORY 3.3 — "get three quotes" three times on one page, and near-verbatim from the winner

> "why getting three of them is the only real control you have" (FAQ)
> "**Get three written quotes**, tell each agent you have a cheaper one" (FAQ)
> "**Get three written quotes, from a mix of local independents and larger chains.** Tell each agent plainly that you have a cheaper quote, and name the number. **Ask for a sliding scale that pays more for beating a target price**" (body)
> "**Get three written quotes**, with the fee stated including VAT and as a pound figure." (closer)

**Why.** Four instances on 1,931 words is repetition the reader will feel. Worse, the body version is
a close paraphrase of W9's measured line, which the spec quotes in P5: "Get at least three quotes to
compare. Talk to a mix of local independents and bigger chains. Ask about sliding-scale fees that
reward a higher sale price." Three clauses, same order, same content. §3 is explicit that we copy the
shape, not the words. And the tip appears on six of thirteen batch surfaces; see X3.

**Drop-in fix (body, keep this one, it is the substantive version).**

> "Four things work, in the order you should use them. Ask three agents to value and quote, and make one of them an independent who only covers your postcode. Put the cheapest number to the other two and say it out loud. Ask for a sliding scale that pays the agent more for beating a target price, which puts them on your side of the table rather than on the side of a fast sale. If the rate will not move, take the tie-in and notice periods instead, because those cost the agent something real and cost you nothing."

Then cut the closer's "Get three written quotes, with the fee stated including VAT and as a pound
figure" down to "Ask for every quote including VAT and as a pound figure at the price you expect to
achieve", and drop the two FAQ restatements to one.

### ADVISORY 3.4 — the only cost table in the batch with no total row (rule 8)

The three-column price-band table ("Your sale price | Typical London sole agency fee | Commission you
pay") carries no total row, and neither does the driver table or the tax table. Rule 8 says the total
row is not optional when a table exists.

**Judgement: partially excused.** None of the three is an Item/Cost cost-breakdown table, and a fee
page is not required by §3 to state an all-in selling total. But the page never puts a single number
in front of a London seller for the whole sale, which is what the reader is actually budgeting, and
the calculator CTA at the foot then promises exactly that. Adding one row closes the gap.

**Drop-in fix.** Add to the price-band table, bolded, after the £553,870 row:

> `<tr><td><strong>Plus conveyancing, EPC and removals</strong></td><td><strong>about £1,500 to £3,000 on top</strong></td><td><strong>a London sale at the average lands near £12,000 all in</strong></td></tr>`

### ADVISORY 3.5 — capitalisation diverges from the other four surfaces on every tax term

`london` writes "Capital Gains Tax" (3) and "Private Residence Relief" (4) capitalised throughout and
never lowercase. `cheapest`, `can-you-sell` and `mmoa` run lowercase five to one against. `probate`
runs lowercase ten to one on capital gains tax but capitalises "Inheritance Tax" three times against
nine lowercase, so it is inconsistent with itself as well.

**Why.** It is house style, not a spec rule, so it is an advisory. But it is a visible five-writer tell
across four surfaces the reader can move between in one click, and it is the cheapest thing on this
list to fix.

**Drop-in fix.** Lowercase throughout on `london` ("capital gains tax", "private residence relief"),
which is the majority style in the batch and the register the winner set uses. On `probate`, lowercase
"inheritance tax" in the three capitalised instances including the H2 ("How do you pay the inheritance
tax when the money is in the house?").

---

## 4. `modern-method-of-auction-explained` — must_fix

The strongest surface in the batch on its own terms. All five band metrics in range, the verdict lands
inside 120 words, the route cost is priced as a pound haircut exactly as rule 11 asks (£8,250 fee,
£4,125 gap against the agent route), the stamp-duty section is genuinely the best writing in the batch
because it says HMRC has published nothing and then reasons from the indicators rather than guessing.
Everything below is advisory, and it is must_fix only on the cross-batch findings.

### ADVISORY 4.1 — the page announces its own device

> "So here is **the verdict up front**."

**Why.** The reader does not need to be told a verdict is arriving, and "up front" is the spec's
vocabulary for the requirement, not the reader's. W11, the p1 page this section is modelled on, simply
states the judgement: "The modern method of auction rarely delivers what it promises sellers." No
label. `can-you-sell` does the same thing at "**The verdict:** sell it yourself if the price is
obvious", so two of the five surfaces label the device rather than perform it.

**Drop-in fix.**

> "So take the route at face value. It is faster than a normal sale and far less certain than a real auction."

**Drop-in fix for `can-you-sell` 's matching instance.**

> "So: sell it yourself if the price is obvious, your diary is flexible, and no agent has a claim on the sale already."

### ADVISORY 4.2 — "the 2008 regulations", twice, is the batch's only near-miss on rule 4

> "The older **2008 regulations** that many guides still quote were revoked on the very same day, so a page citing them is citing law that no longer exists." (body)
> "**The 2008 regulations** that older guides still quote were revoked on the same date." (FAQ)

**Why.** It names no Act and no SI number, so it clears the letter of rule 4 on a page banded at zero
hard references. It fails the spirit twice over. It is a dated reference to a piece of legislation in
consumer prose, and it is meta-commentary about what other websites cite, which is a conversation
between us and our competitors that the reader is not part of. The seller wants to know what the
listing must show them.

**Drop-in fix (body).**

> "The rules that governed this before April 2025 were withdrawn on the very same day, so guidance written earlier than that is describing a regime that no longer exists."

**Drop-in fix (FAQ).**

> "The rules that older guides quote were withdrawn on the same date."

### ADVISORY 4.3 — "any page that gives you one is guessing" / "treat any page that gives you one as guesswork"

Two instances of the batch's dominant tic on one page, plus "the part that most coverage has not caught
up with". See cross-batch finding X6, where `mmoa` is the heaviest contributor at four.

### ADVISORY 4.4 — a research-quality annotation ahead of the worked example

> "Here is that in numbers. **The figures are illustrative. The agent fee is an assumption rather than a published average**, so treat it as an example and check the sourced ranges in how much estate agents charge."

**Why.** Same class as `probate`'s four "(illustrative)" table cells and `london`'s "our arithmetic":
the writer grading their own evidence in the reader's copy. This one is the mildest of the three
because it does route the reader somewhere useful, but "an assumption rather than a published average"
is our vocabulary.

**Drop-in fix.**

> "Here is that in numbers, on a 1.5% agent fee. Your own quote will differ, so check the ranges in how much estate agents charge and rerun it."

---

## 5. `selling-a-probate-property` — must_fix

### BLOCKER 5.1 — a third EPC figure, contradicting both our EPC page and `cost-of-moving-house-uk`

> `<tr><td>Energy performance certificate</td><td>£60 to £120</td><td>Yes</td></tr>`

and downstream in the worked example: "£90 for the certificate".

**Why.** £60 to £120 is defensibly the HomeOwners Alliance figure quoted in the spec's P4, so this
writer sourced it properly. It still contradicts `epc-certificate-cost-uk` (£35 to £120) and
`cost-of-moving-house-uk` (£35 to £120) and `can-you-sell` (£50 to £120). Three ranges in one cluster
is an internal contradiction a reader hits by following our own internal links, and the £90 midpoint
then feeds the "£8,002 of allowable cost against an £8,000 uplift" arithmetic, which is the page's
sharpest moment and is currently balanced on the loosest number in it.

**Drop-in fix.** Align to £35 to £120 across the batch, and change "£90 for the certificate" to "£80
for the certificate", which is the midpoint `cost-of-moving-house-uk` already uses. The worked total
becomes £7,992 against an £8,000 uplift, so the sentence becomes:

> "That is £7,992 of allowable cost against an £8,000 uplift. Eight pounds of gain, nothing to pay, and no 60 day return for the estate."

which is a better line than the current one.

### ADVISORY 5.2 — "(illustrative)" printed in four table cells

> `£250 to £600 (illustrative)`, `£300 to £1,200 (illustrative)`, `£150 to £400 (illustrative)`
> "The ranges marked illustrative are typical rather than sourced, so plan with them, then get quotes."

**Why.** "Illustrative" and "typical rather than sourced" are QA-trail vocabulary. An executor reading
a cost table does not know what our sourcing standard is and does not benefit from being told which
rows met it. The honest thing the reader actually needs is already in the sentence: get quotes.

**Drop-in fix.** Delete "(illustrative)" from all four cells and replace the trailing sentence with:

> "House clearance, the valuation and the empty-house insurance vary more than anything else here, because they turn on what is in the house and how long it stands empty. Get quotes for those three."

### ADVISORY 5.3 — register slips off the personal representative in the opening paragraph

> "Selling a probate house worth £290,000 costs **the estate** roughly £8,400 to £10,300. An ordinary sale of the same house costs **you** about £5,000."

**Why.** The page's register is the personal representative acting for the estate, and it holds that
line well for most of its length ("your grant", "your buyer", "your proceeds"). Sentence two attaches
the cost of an ordinary sale to "you" personally, which is the one thing a PR is not: they do not bear
the cost, the estate does, and the whole page turns on that distinction. Two sentences, two different
payers, no signal that the subject changed.

**Drop-in fix.**

> "Selling a probate house worth £290,000 costs the estate roughly £8,400 to £10,300. Selling the same house in an ordinary sale would cost about £5,000."

### ADVISORY 5.4 — "the long pole" is project-management jargon in consumer copy

> "**Stage 4 is the long pole**, and you will find the timings on our guide to how long probate takes in the UK."

**Why.** Register fit. The reader is a bereaved executor, not a programme manager. Nothing else on the
page reaches for that vocabulary.

**Drop-in fix.**

> "Stage 4 is the one that takes the longest by a distance, and you will find the timings on our guide to how long probate takes in the UK."

### ADVISORY 5.5 — 131 words over the total-cost ceiling

2,731 against a band of 1,800 to 2,600. Rule 14 applies, so this is not a ranking concern. The
"Agent, auction or cash buyer" section carries a 110-word stamp-duty-relief digression about what a
cash-buying company can claim, which is genuinely interesting but is the furthest thing on the page
from what an executor is trying to decide, and it already has two internal links doing that job.
Cutting it to two sentences lands the page inside the band.

**Note, not a finding.** Pound figures in prose = 25, at the floor of the 25 to 45 band but inside it.
Opening sentence carries a total in pounds against a stated property value, per rule 6. Item/Cost
table has a total row, per rule 8. The HMRC scale table is a reference table and correctly has none.
"HMRC's Statement of Practice 2 (2004)" is a soft authority reference under the spec's own split, not
a hard statutory one, and it is load-bearing for the £2,900 figure, so it stays.

---

# Cross-batch sameness

Skimmed the other eight surfaces' H2 lists, openers, closers and CTA blocks alongside the five.
Adjudication convention below: **mandated** = the spec requires the device, so its presence on every
page is compliance and only the wording is a finding; **converged** = nothing required it and five
writers reached for it anyway, which is the finding itself.

## X1 — "a March exchange with a May completion", six times across four surfaces — BLOCKER, converged

Not mandated anywhere. Rule 13 caps the CGT block at "one block, plain words, one pound figure, one
link out" and says nothing about the exchange/completion date split, which belongs to the armed cgt1
batch.

| Surface | Instance |
|---|---|
| `london` body | "A March exchange with a May completion puts your gain in the earlier tax year and starts the clock in the later one." |
| `london` FAQ | "so a March exchange with a May completion involves two different dates doing two different jobs" |
| `probate` body | "so a March exchange with a May completion lands in the earlier year while the 60 day clock still starts at completion" |
| `probate` FAQ | "so a March exchange with a May completion falls in the earlier year" |
| `can-you-sell` FAQ | "so a March exchange with a May completion sits in the earlier tax year" |
| `sell-house-without-estate-agent` | one further instance |

**Why it is a blocker.** Same two months, same two verbs, six times. A reader moving from the London
fee page to the probate page to the sell-privately page meets the identical illustration three times,
which reads as templated copy, and the four instances that sit in FAQ blocks render into schema where
the duplication is machine-visible across four URLs on one domain.

**Drop-in fixes.** Keep `london`'s body instance as written, it is the clearest. Then:

- `probate` body: "so a sale that exchanges in one tax year and completes in the next is taxed in the first while the 60 day clock starts in the second."
- `can-you-sell` FAQ: "so a sale exchanged just before 5 April is taxed in the year that is ending, however long completion takes."
- `london` FAQ: cut the illustration entirely, the rule is already stated in the sentence before it.
- `probate` FAQ: cut the illustration, same reason.
- `sell-house-without-estate-agent`: "so the exchange date decides the tax year and the completion date starts the clock, and they are often not in the same one."

## X2 — the "This page gives you / sets out / answers" contents paragraph, eleven of thirteen surfaces — BLOCKER, converged

Nothing in the spec asks for it. §3 prescribes shape, not a table of contents. W2, the p1 page on the
pillar's own head term, has no such paragraph: it opens on an at-a-glance box and goes straight into
the first cost.

Within the five: `can-you-sell` twice, `london` once, `mmoa` once, `probate` once. Every one of the
five `summary:` frontmatter fields also ends with the same contents list, so the reader who gets a
summary snippet and then lands on the page reads the contents twice before reaching a number.

Examples, all second paragraph, all the same grammatical frame:

> "**This page gives you** the London price bands in pounds, the drivers behind the spread, a target number to negotiate towards..."
> "**This page sets out** what the fee buys and what the 56 days tie you to. It then covers who really pays..."
> "**This page gives you** the sequence, tells you where it stalls, prices each stage, and shows you which of your costs come off the estate's gain."

**Why it is a blocker.** Eleven of thirteen surfaces open on the same sentence frame. It is padding
under the standing track (the H2s already are the contents), it delays the first substantive number by
40 to 60 words on pages whose whole thesis is answer-first, and it is the most mechanically detectable
templating signal in the batch.

**Drop-in fixes.** Delete the frame and let the second paragraph do work. Keep the `summary:` contents
list, which is doing a real job in the snippet.

- `london`: "In London the pound figure is the one that hurts, so what follows is in pounds. Your borough is quoted differently from the next one for a reason, there is a number worth negotiating towards, and there is a question no fee comparison answers: whether any of your commission comes back through the tax system."
- `mmoa`: "If you are the seller, that someone is bidding against your price. So start with what the fee buys and what the 56 days tie you to, then who really pays, then what the route does to your tax bill if the house is not your only home."
- `probate`: "Cost is rarely what stops your sale, though. The order of operations is. You cannot complete without the grant, you may not be able to sign on your own, and the inheritance tax normally falls due before the grant that would release the house to pay it. Take those in order and the rest follows."
- `can-you-sell`: delete "This page answers can you, then should you." and keep "This page is the decision. That one is the method." at the foot, which disambiguates two sibling URLs and earns its place.

## X3 — "get three quotes", ten instances across six surfaces — ADVISORY, mandated device, converged wording

Rule 10 mandates that negotiation advice gives a target number or a script, and P5 quotes W9's
three-quote line as one valid script. So the device is mandated and its presence is compliance.

**What is not compliance** is that six surfaces reach for the same one of the four scripts P5 offers,
and `london` uses it four times on one page, and `london`'s version is a close paraphrase of W9's
actual sentence. P5 lists three other scripts nobody used: "aim for a fee of 1.2% (this is 1% + VAT)",
"if one agent has quoted you a lower fee but you'd prefer to use another firm, mention that you've
found a cheaper deal", and W7's tie-in/notice lever.

**Adjudication: mandated device, converged wording.** Findings are on the wording, and the fix is to
distribute the four scripts rather than to cut the device.

**Drop-in fixes.**
- `london`: the sliding-scale version at 3.3 above, once, and cut the other three.
- `cheapest`: already carries the 1.2% target, which is the strongest script in P5. Cut "Get three quotes, say plainly that you hold a cheaper written one" to "Say plainly that you hold a cheaper written one", so the two pages do not run the same tip.
- `cost-of-moving-house-uk` (three instances): keep one, and make it the tie-in lever, which no page in the batch currently leads with: "If the rate will not move, ask for a shorter tie-in instead. It costs the agent something real and costs you nothing."
- `estate-agent-fees-for-renting`, `how-much-do-estate-agents-charge-to-sell-a-house`, `sell-house-without-estate-agent`: one instance each, leave as is.

## X4 — the sourcing-caveat tic: "our arithmetic", "sourced figures", "(illustrative)", "we checked" — BLOCKER, converged

Present on all five of this batch plus `sell-house-without-estate-agent` and `cost-of-moving-house-uk`.

| Surface | Instances |
|---|---|
| `london` | "our arithmetic" ×2, "including ours", "the softest evidence on this page" |
| `probate` | "(illustrative)" ×4 in table cells, "typical rather than sourced" |
| `cheapest` | "the only deferred structure we checked", "calculated from the sourced figures" ×2 |
| `can-you-sell` | "calculated from those sourced figures", "calculated from the sourced figures above" |
| `mmoa` | "The figures are illustrative. The agent fee is an assumption rather than a published average" |
| `sell-house-without-estate-agent` | "Calculated from the sourced figures" in three table cells |
| `cost-of-moving-house-uk` | "The EPC range is our own and the total takes £80 as its mid point" |

**Why it is a blocker and not just a tic.** Rule 4's second clause is the governing principle: the
statutory anchors "are for the writer's accuracy and for the fact-check trail, not for the page". The
same holds for evidence grading. Five writers independently decided the reader wanted to know which
of our numbers were sourced and which were assumed, which means the pack taught all five to think of
the reader as a fact-checker. No winner page does this: §4 records that W13's sixteen soft-authority
name-drops are "citation theatre" and it ranks p7.

It also reads as hedging on exactly the pages whose value proposition is a firm number. `london` says
"you are most likely to be quoted 1.5% plus VAT" and then spends four passages explaining why we are
not sure.

**Drop-in fix, general rule to apply across all seven surfaces.** Delete every phrase that grades our
own evidence. Where a number genuinely varies, say what makes it vary and tell the reader to get a
quote, which is information they can act on. Specific replacements are at 1.1, 3.2, 4.4 and 5.2 above;
for `sell-house-without-estate-agent`'s three "Calculated from the sourced figures" cells, replace the
column with the driver: "At the 1.42% average" / "At the top of the package range" / "At the mid point
of the conveyancing range".

## X5 — first-person FAQ blocks on six of thirteen surfaces, second person on seven — ADVISORY, converged divergence

`london` 7, `estate-agent-contract-tie-in-periods` 11, `estate-agent-fees-for-renting` 9,
`selling-a-house-at-auction-uk` 8, `part-exchange-house-uk` 7, `mmoa` 5, `cost-of-moving-house-uk` 1.
Zero on `cheapest`, `can-you-sell`, `probate`, `how-much-do-estate-agents-charge-to-sell-a-house`,
`online-estate-agents-uk`, `sell-house-without-estate-agent`.

This is the batch split almost exactly down the middle, and it is the clearest evidence of parallel
writers with no shared FAQ convention. It renders into schema on every page. §3 sets one register for
the cluster and rule 3 measures second person as the register lever, so the second-person half is
correct and the first-person half should convert. Fix per 3.1.

## X6 — the "nobody else tells you this" tic, ten of thirteen surfaces, all five of this batch — BLOCKER, converged

| Surface | Instances |
|---|---|
| `mmoa` | "any page that gives you one is guessing", "treat any page that gives you one as guesswork", "the part that most coverage has not caught up with", "Nearly every complaint you will read about this route" |
| `london` | "the part no fee comparison covers" ×2, "the pages you are comparing rarely give you any", "the part the fee comparisons leave out, and in London it is worth thousands" |
| `cheapest` | "no comparison site prints the formula", "the pattern is one the comparison sites never print" |
| `probate` | "the rule almost nobody publishes", "The line nobody else gives you is the fifth one" |
| `can-you-sell` | "the part no consumer guide builds in", "Every guide on this subject says yes and then teaches you the method. Almost none of them tell you when the answer is effectively no." |
| `estate-agent-fees-for-renting` | "nobody else prints", "nobody publishes is what the fee costs you after tax" |
| `estate-agent-contract-tie-in-periods` | "no consumer guide works through" |
| `online-estate-agents-uk` | "no comparison site draws it for you" |
| `sell-house-without-estate-agent` | "Nobody publishes a reliable figure" |

Nineteen instances. Not mandated by anything in the spec. §2's P9 does say our differentiator is
"correctness plus arithmetic, delivered in W4's register", and the intent behind this tic is right: the
CGT hook genuinely is unoccupied, per §1 finding 4. But the spec's instruction is to deliver the
differentiator, not to announce it.

**Why it is a blocker.** Nineteen instances across ten pages of one cluster on one domain is a verbal
signature. On `mmoa` and `london` it fires four times each, so within a single page it stops being a
claim and becomes a mannerism. And it points the reader at our competitors, twice per page, on pages
where the reader is trying to get a number and leave.

**Drop-in fixes.** Allow at most one per page, only in the CGT block where the claim is factually
defensible, and never as a claim about what other websites do. Show the thing instead of naming its
absence.

- `cheapest`, delete "and no comparison site prints the formula" from "Both crossovers are calculated from the sourced figures, and no comparison site prints the formula." The formula is on the page; that is the whole point.
- `cheapest`, replace "and the pattern is one the comparison sites never print: on a taxable sale, tax relief quietly shrinks every fee saving by about a quarter" with "On a taxable sale, tax relief shrinks every fee saving by about a quarter."
- `london`, replace "This is the part the fee comparisons leave out, and in London it is worth thousands." with "In London this is worth thousands, so it is worth two minutes."
- `london`, cut "the part no fee comparison covers" from both the summary and the opener; the sentence works without the preamble.
- `mmoa`, replace "There is no published list of lenders who refuse these purchases, so treat any page that gives you one as guesswork." with "No lender publishes a policy on this, so ask a broker about your lender, on your lot, before you bid." Then delete the FAQ's near-duplicate.
- `probate`, replace "The line nobody else gives you is the fifth one." with "The fifth line is the one an ordinary seller never meets."
- `can-you-sell`, replace "Every guide on this subject says yes and then teaches you the method. Almost none of them tell you when the answer is effectively no." with "The answer is yes far more often than it is useful. These five are the reasons a private sale falls over, and four of them are settled before you list anything."

## X7 — the closing-H2 convergence the brief flagged — ADVISORY, converged, and smaller than feared

Two near-identical pairs across the thirteen:

- "**What should you do next?**" (`london`) and "**What to do next**" (`part-exchange-house-uk`)
- "**What should you keep, and for how long?**" (`cost-of-moving-house-uk`) and "**What to keep, and for how long**" (`estate-agent-contract-tie-in-periods`)

The other nine closing H2s are substantive and distinct: "Which model is genuinely cheapest after
tax?", "Does tax change the answer?", "Who does the model suit, and who should avoid it?", "Step ten:
the tax return nobody reminds you about", "Capital gains tax on an auction sale: what comes off, and
which tax year", "Do the executors pay capital gains tax, and who reports it?". So the risk was real
but it landed on four surfaces, not thirteen, and only `london` is in this batch.

**Why it matters for `london` specifically.** Every other fee page in the batch closes on a
substantive H2 and puts the calculator CTA in its last paragraph. `london` spends a whole H2 on
"What should you do next?" whose body is three sentences of advice already given verbatim earlier on
the page ("Get three written quotes", "check the tie-in") followed by the CTA. That is a section
whose only content is the CTA, which is the "What to do next"-class closer at its weakest.

**Drop-in fix for `london`.** Delete the H2 and fold its content into the preceding 60-day section's
closing paragraph, so the page ends on substance with the CTA attached, matching `cheapest`, `probate`
and `mmoa`. If a final H2 is wanted, make it earn its place: "**What is your London fee actually worth
after tax?**" and give it the £1,660 negotiation saving set against the £2,393 tax relief, which is
arithmetic the page currently has in two separate places and never combines.

**Drop-in fix for `part-exchange-house-uk`.** "**Is part exchange the right trade for you?**"

## X8 — the calculator CTA — ADVISORY, mandated device, mostly well varied

Rule 12 mandates it and all thirteen surfaces carry it, named, with what it returns and how long it
takes. Credit where due: the opening verbs are genuinely varied ("drop them into", "put your figures
through", "run it through", "put your own numbers through") and the time promise splits across "under
60 seconds" (4), "in under a minute" (6) and "about a minute" (2), which is the right kind of variation.

Two residual findings.

**Identical clause on two surfaces.** `cheapest` ends "our cost of selling a property guide **sets out
every line**" and `can-you-sell` ends "The cost of selling a property guide **sets out every line** in
it." Fix: `can-you-sell` to "The cost of selling a property guide takes them one at a time."

**Same verb frame on five.** "put your [numbers/figures] [into/through] the cost of selling
calculator" on `london`, `probate`, `online-estate-agents-uk`, `how-much-do-estate-agents-charge-to-sell-a-house`
and `selling-a-house-at-auction-uk`. Fix: vary two of the five. `probate` to "Before you accept an
offer, price the whole exit. The cost of selling calculator gives you the total selling cost and what
is actually left for the beneficiaries, in under 60 seconds." `online-estate-agents-uk` to "Once you
have a fee shape in mind, price it. The cost of selling calculator..."

## X9 — the at-a-glance box, labelling diverges — ADVISORY, mandated device

Rule 7 requires the box on fee, cost and pillar pages only, so `can-you-sell`, `mmoa` and the other
route pages are correct to omit it. All five required pages in the batch carry one and all are five to
seven lines of label, figure and condition, which is full compliance with the hardest formatting rule
in the spec.

The labelling diverges: `how-much-do-estate-agents-charge-to-sell-a-house` uses "**At a glance**",
`probate` uses "**Selling a probate property, at a glance**", `cost-of-moving-house-uk` uses "at a
glance", and `cheapest` ("Here is what you are choosing between.") and `london` (no label at all)
have none.

**Adjudication: mandated device, divergent execution, and this one is fine.** The spec asks for the
box, not for the words "at a glance", and the estate already runs "at a glance" on roughly 75 legacy
Property posts, so a fee page that labels its box differently reads as editorial rather than templated.
The only fix worth making is `london`, whose box floats with no introduction at all after a
contents-list paragraph, which leaves the reader unsure whether they are reading a summary or the
first section.

**Drop-in fix for `london`.** Insert before the list: `<p><strong>Your London fee, at a glance</strong></p>`

---

# What this adds up to

Ranked by damage, worst first:

1. **X6**, the "nobody else tells you this" tic, nineteen instances across ten surfaces. Verbal signature.
2. **X4**, the sourcing-caveat tic on seven surfaces. Turns firm numbers into hedged ones and puts the fact-check trail on the page.
3. **X2**, the "This page gives you" contents paragraph on eleven surfaces. Padding, delays the first number, most detectable templating signal in the batch.
4. **X1**, "a March exchange with a May completion", six instances across four surfaces, four of them in schema.
5. **Three EPC ranges** across four surfaces (£35, £50, £60 floors) contradicting our own EPC page. Findings 2.1 and 5.1.
6. **X5**, first-person FAQ blocks on six surfaces against second person on seven. Register split down the middle of the batch.
7. **X3**, "get three quotes" ten times across six surfaces, one of four available scripts used almost exclusively.
8. **3.1 / 3.2**, `london` carries the heaviest single-page load in the batch: first-person FAQs, four methodology caveats, four "three quotes", and a CTA-only closing H2.
9. **X7**, closing-H2 convergence, real but confined to four surfaces.
10. **X8**, calculator CTA wording, two identical clauses and one over-used verb frame.

**What held.** Zero em-dashes across all five including frontmatter. Zero hard statutory references in
prose, on a wave whose precedent page ran 5.5 per 1,000 words. UK English clean. No our-pricing, no
named personas. Every band metric in range on three of five, with the two breaches being word count
overruns of 48 and 131 words that rule 14 makes non-urgent. Every page opens on the reader's cost
question with the CGT block near the end, so rule 5's "never in the opening" held five for five. Route
pages priced their route as a pound haircut. Question-heading share ran 75% to 100% against a floor of
30% to 40%. Second-person rates landed 33.3 to 50.5 against a shipped precedent of 10.7.

The spec worked. What it did not do is stop five writers converging on the same four mannerisms, and
those are what this pass is for.
