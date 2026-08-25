# Wave 12 editorial QA, batch 3

Surfaces: A5 `online-estate-agents-uk`, A8 `estate-agent-contract-tie-in-periods`,
A9 `cost-of-moving-house-uk`, A12 `part-exchange-house-uk`, and the calculator landing
copy, FAQs and worked examples in
`Property/web/src/lib/calculators/tools/cost-of-selling-calculator.ts`.

Judged against `briefs/property/wave12/_language_spec.md` (14 hard rules, §3 register
bands) and the standing editorial track. Read-only pass: nothing was edited.

Bands applied per the spec's own §3 assignment: A5 and A12 on the **route** row
(A5 despite its fee-shaped SERP), A8 on the **fee** row, A9 on the **total-cost** row,
the calculator on the **calculator-landing** row.

---

## 0. Verdicts

| Surface | Verdict | Blockers | Advisories |
|---|---|---|---|
| A5 `online-estate-agents-uk` | **must_fix** | 3 | 3 |
| A8 `estate-agent-contract-tie-in-periods` | **must_fix** | 2 | 3 |
| A9 `cost-of-moving-house-uk` | **must_fix** | 2 | 4 |
| A12 `part-exchange-house-uk` | **must_fix** | 1 | 3 |
| calculator `cost-of-selling-calculator.ts` | **must_fix** | 1 | 3 |

Nothing here is a rewrite. Every blocker is a paragraph-level or sentence-level fix
except A9's, which moves one section.

## 1. Mechanical scorecard

Measured on body prose with tables, tags and frontmatter stripped, the spec's own
formula. Calibration: my extractor reproduces the spec's `epc-certificate-cost-uk`
row at 2,890 words / 10.7 "you" exactly, and lands Flesch within ±4 of the spec's
figure on all three baselines. Treat Flesch as ±4; no verdict here turns on it.

| Surface | Band | Words | Mean sent. | Flesch | "you"/1k | Hard statute | Q-H2s | Em-dash |
|---|---|---|---|---|---|---|---|---|
| A5 | route: 1,600-3,400 / 13-17 / 68+ / 28-50 / 0 / 40% | 2,655 ✓ | 15.1 ✓ | 76.4 ✓ | 45.6 ✓ | 0 ✓ | 11/11 ✓ | 0 ✓ |
| A8 | fee: 1,200-2,000 / 15-18 / 62+ / 45-60 / 0 / 40% | 2,008 ~ | 16.6 ✓ | 72.2 ✓ | 58.3 ✓ | 0 statute, **4 case pincites** | 7/9 ✓ | 0 ✓ |
| A9 | cost: 1,800-2,600 / 15-18 / 62+ / 45-60 / 0-1 / 30% | 2,532 ✓ | 16.2 ✓ | 75.7 ✓ | 56.1 ✓ | **1** | 8/10 ✓ | 0 ✓ |
| A12 | route: 1,600-3,400 / 13-17 / 68+ / 28-50 / 0 / 40% | 2,441 ✓ | 15.7 ✓ | 80.4 ✓ | 49.2 ✓ | 0 ✓ | 9/10 ✓ | 0 ✓ |
| calc (above tool) | 250-600 / 12-16 / 68+ / 55+ | **73** ✗ | 12.2 ✓ | 80.9 ✓ | 68.5 ✓ | 0 ✓ | n/a | 0 ✓ |
| calc (intro+explainer) | as above | 414 ✓ | 13.4 ✓ | 80.7 ✓ | 72.5 ✓ | 0 ✓ | n/a | 0 ✓ |

**Em-dashes: zero.** Counted directly (U+2014) across all four bodies, all four
frontmatter blocks and the whole calculator file. Clean.

**UK English:** clean. **Named personas:** none. **Our-pricing / self-referential fee
comparison:** none. **Pipeline leakage in user-facing strings:** none. The `§`,
`briefs/` and `s.38` hits in the calculator are all inside block comments, which the
file's own header states is deliberate and which the spec permits.

The register work is genuinely good. All four pages sit inside every numeric band
except A8's eight-word overshoot on words (rule 14 says do not chase word count, so
that is not a finding) and the calculator's above-the-tool count, discussed below.
Every finding that follows is about citation load, section placement, and sameness.

---

## 2. A5 `online-estate-agents-uk`: must_fix

### BLOCKER A5-1. Citation theatre at the W13 rate.

> "Sources, all as at 21 August 2026." … "The £300 to £1,500 market range and the 10
> to 12 month deferred option come from Which?, updated 8 June 2026."

Body prose carries **15 soft-authority name-drops** (Which? ×7, MoneySavingExpert ×3,
gov.uk ×2, HomeOwners Alliance, Zoopla, The Property Ombudsman) and **9 dated stamps**
("as at 21 August 2026" ×4, "8 June 2026" ×3, "1 July 2026", "February 2018"). Spec §4
condemns exactly this on W13, the weakest measured page in the set: "Sixteen
soft-authority name-drops used as sourcing … which is citation theatre: it names a
body instead of a rule." We are at fifteen. It also date-stamps the page into
obsolescence: a reader in March sees "as at 21 August 2026" four times.

Drop-in: keep one sourcing line under the table and strip the rest to plain
attribution. Replace the whole "Sources, all as at 21 August 2026" paragraph with:

> "The flat-fee prices, the conveyancing condition and the £80 check fee are
> Purplebricks' own published package terms. The £300 to £1,500 market range and the
> deferred option are Which?'s. The 1.42% high street average is the HomeOwners
> Alliance figure. Cash figures at £300,000 are worked from those rates."

Then in the body, cut "updated on 8 June 2026" (line 78), "updated 8 June 2026" (lines
101, 149) and "read on 21 August 2026" (line 84) entirely; the links carry the source.
Keep exactly two dates on the page: "when we checked" on the Strike redirect (line 72),
because that one is a claim about a moment, and "as at 21 August 2026" on the gov.uk
redress list (line 119), because scheme membership genuinely turns over.

### BLOCKER A5-2. The CGT block closes on a five-link farm and restates the filing clock.

> "Where tax is due on a UK residential sale, you have 60 days from completion to
> report it and pay. Our complete guide to capital gains tax on property covers the
> rates and the reliefs. Selling a second home and selling a rental property deal with
> the two most common cases. The payment deadlines page has the filing detail, and the
> capital gains tax calculator gives you the figure."

Rule 13: "one block, plain words, one pound figure, **one link out**. No … 60-day
filing walkthrough." This is five links in 69 words plus the 60-day line, on a page
whose CGT job was done two paragraphs earlier. The cgt1 batch is armed on this
material and the freeze exists to stop this.

Drop-in, replacing the whole paragraph:

> "If the sale is taxable, our complete guide to capital gains tax on property covers
> the rates, the reliefs and the reporting clock."

(one link, `/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk`).

### BLOCKER A5-3. Six of eleven H2s are compound and none is a query anyone types.

> "What is a hybrid agent, and is it really a different thing?"
> "Who does the viewings, and does that change the price you get?"

Rule 9 wants each H2 to be "a complete question **in the reader's words**", and W1's
model set is single-clause: "How much are estate agent fees?", "What do estate agent
fees include?". Six of A5's eleven are two questions welded with a comma, which is a
section summary wearing a question mark. A5 is the second-worst in the batch on this
(see §7).

Drop-in: split the clause off into the first sentence of the section.
- "What is a hybrid agent, and is it really a different thing?" → **"What is a hybrid
  estate agent?"**, then open the section "It is a real thing, and the label matters
  less than the three questions below."
- "Who does the viewings, and does that change the price you get?" → **"Who does the
  viewings with an online estate agent?"**
- "What does an online agent actually do, and what do you do yourself?" → **"What does
  an online estate agent do for the fee?"**
- "Are online estate agents regulated, and who do you complain to?" → **"Are online
  estate agents regulated?"**
- "Who does the model suit, and who should avoid it?" → **"Should you use an online
  estate agent?"**
- Keep "What is an online estate agent, and how is it different from a high street
  agent?" as the one compound; it is the head term and it earns it.

### ADVISORY A5-4. Cost table with no total row.

Rule 8: "the total row is not optional when a table exists." The fee-shape table's
last row is "Add to any online package | £80 identity check fee". The rows are
alternatives so a sum would be wrong, but a closing row is still owed. Drop-in: add
`<tr><td><strong>Cheapest if the sale completes</strong></td><td><strong>£999 plus £80,
so £1,079</strong></td><td><strong>Cheapest headline, biggest loss if it does
not</strong></td></tr>` and move the £80 row above it.

### ADVISORY A5-5. Self-praise, twice.

> "Yes, and this is the most useful thing on this page."
> "This is the question the fee comparison hides."

Spec §4 puts "first-person brand performance in place of an answer" on the do-not-copy
list (W5). Batch-wide fingerprint, see §7. Drop-in: "Yes, and almost no seller is told
so." / "The fee comparison stops before this question."

### ADVISORY A5-6. Rendered standfirst is a 60-word keyword catalogue.

`summary` renders on-page under the H1 at 18px (`BlogPostRenderer.tsx:213`). A5's runs
147 words with a 60-word closing sentence listing four topics. See §7 for the
batch-wide version and the drop-in shape.

---

## 3. A8 `estate-agent-contract-tie-in-periods`: must_fix

### BLOCKER A8-1. Four bare case pincites and a linked HMRC manual quote.

> "The words 'a purchaser introduced by us' mean the person the agent introduced to
> the purchase, not merely to the property (paragraph 36)."
> "…no such requirement needed implying (paragraph 37)."
> "…a term 'very readily' implied in a residential consumer case … (paragraph 20)."
> "More than one fee can be payable, but far more rarely than the agent argued
> (paragraph 24)."

Plus: `<a href="https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg15250">"The
definition is exhaustive"</a>`.

Rule 4 bans hard citations from body prose and says "where a rule must be attributed,
attribute it in plain words … and put the citation in the pack, not the prose". These
are case pincites rather than section numbers, so they escape the letter of the rule's
list, but they are squarely the register it exists to prevent: nothing in 35,385 words
of winner prose pincites a judgment, and A8 stacks four in one bulleted list plus a
link into an HMRC internal manual. This is the `epc-certificate-cost-uk` precedent the
spec says the wave must not inherit. The calculator file in this same batch states the
opposite rule in its own header and follows it.

Drop-in: keep the case name (it is genuinely the leading authority and a seller
googling it will find it), delete every pincite and the manual link.

> - **What it decided.** "A purchaser introduced by us" means the person the agent
>   introduced to the purchase, not merely to the property. The homeowner won and the
>   fee claim failed.
> - **The bit that gets misquoted.** Guides often say the case decided an agent must be
>   the effective cause of the sale. The court said the opposite: no such requirement
>   had to be implied.
> - **Where effective cause lives.** The court treated it as a term readily implied in
>   a residential consumer case, unless your contract or the facts rule it out.
> - **On double fees.** More than one fee can be payable, but far more rarely than the
>   agent in that case argued.

And in the CGT section, replace the linked quote with plain words:

> "Where your sale is taxable, some selling costs come off the gain. What nobody tells
> you is that the list is closed. It is not a general allowance for the costs of
> selling: HMRC's own guidance says so in four words, and the list has not moved."

### BLOCKER A8-2. A naked four-link dump, off-topic, mid-section.

> "Put off agents? Try selling without an estate agent, can you sell without an estate
> agent, selling a house at auction or the modern method of auction."

Four links in 27 words, one link per seven words, the highest density on any of the
fifteen surfaces. Two of the anchors are near-duplicates of each other. It sits inside
the withdrawal-fees section, which is about disclosure, not about routes. This reads
as an SEO artefact rather than editorial.

Drop-in: delete it from that section. If the routes need a hand-off, put one link in
the closing paragraph where it belongs:

> "If the terms are the reason you are hesitating rather than the fee, selling without
> an estate agent removes the contract altogether."

### ADVISORY A8-3. CGT block runs to four paragraphs with practitioner nuance.

> "Where you pay a disputed claim purely to get the sale over the line, there is a
> separate argument that the payment protected your title. Treat it as an argument to
> put with paperwork behind it, not a settled deduction."

Rule 13 wants "one block, plain words, one pound figure, one link out". A8 runs four
paragraphs, two pound figures, two internal links and a title-protection argument that
belongs to an adviser, not to a private seller nought to three months from disposal.
Drop-in: cut the two title-protection sentences entirely; the £4,000 / £600 worked
example already carries the point.

### ADVISORY A8-4. Table is four columns and has no total row.

Rule 8: two or three columns, never five, total row not optional. Four columns sits
between the rule's two clauses. Drop-in: fold "Typical tie-in and notice" and "Risk of
paying two agents" into one "What it commits you to" column, giving
`Contract type | What it commits you to | Where an exit charge lands for tax`.

Separately, this table opens `<table><tr><th>` with no `<thead>`, while A5's uses
`<thead>`/`<tbody>`. Cross-writer inconsistency in the same batch; harmonise on A5's.

### ADVISORY A8-5. Self-praise ×3.

"a right almost no consumer guide works through", "What nobody tells you is that the
list is closed", "Most consumer guides describe it wrongly". See §7.

---

## 4. A9 `cost-of-moving-house-uk`: must_fix

### BLOCKER A9-1. The CGT hook is the page's frame, not a block, and it sits at H2 #2.

The second H2 of ten is "Which moving costs cut your tax bill, and which are just
spent?", and it carries a **13-row three-column tax table** plus three bolded
sub-rules, ~600 words, before the reader has been told what conveyancing costs.

The spec forbids this three ways:
1. §3: "After the reader's cost question is fully answered and before the CTA. One
   block. … **Never in the opening. Never as an H1 or as the first H2.**" It is the
   first H2 after the cost total, which is the position the rule exists to protect.
2. Rule 13: "The CGT block is **one block**." A9 has two, H2 #2 and H2 #9.
3. §3, the pillar paragraph: "**The pillar** carries the three-bucket tax split
   because it is the only page in the wave that sees the whole bill, and it carries it
   as one block near the end." A9 has taken the pillar's designated content and given
   it top billing. That is the cannibalisation the freeze exists to prevent, against a
   pillar that has not shipped yet.

Drop-in, no rewriting needed: **move the whole "Which moving costs cut your tax bill"
section down to sit immediately before "Do you pay Capital Gains Tax when you move
house?", and merge the two.** Keep the 13-row table there. In its old slot at H2 #2,
leave one sentence at the foot of the opening section:

> "Not all of that £13,275 is simply spent. Some of it comes off a tax bill now, some
> is banked against the day you sell the new home, and the rest is gone. Which line
> does what is set out further down."

Then trim the pillar-facing three-bucket framing from the `summary` (see A9-3) so the
pillar can still own it.

### BLOCKER A9-2. Named statutory instrument in body prose.

> "The figures above are the Land Registration Fee Order 2024 as restated by HM Land
> Registry's own fees guidance."

Rule 4: "No section numbers, no SI numbers, **no Act names**, no legislation.gov.uk in
a sentence." A named Order is an Act name for this purpose. The §3 band row for
total-cost pages permits 0-1 hard references, so this is inside the band and outside
the rule; the rule is the tighter of the two and it is the one QA enforces. The page
already says the same thing correctly twice, in plain words, which proves the citation
is not carrying anything.

Drop-in:

> "The figures above come from HM Land Registry's own published fees guidance, which
> restates the fee order that took effect in December 2024."

### ADVISORY A9-3. Self-praise three times, one of it in the rendered standfirst.

> `summary`: "…and then does the part no other moving-cost guide does"
> body ¶2: "Then this page does the part no other moving-cost guide does."
> H2 #2 opener: "Every moving-cost guide lists stamp duty as a cost and stops there,
> which is the wrong place to stop."

The same claim three times inside 700 words, the first two of them 90 words apart on
screen because `summary` renders directly above the body. Spec §4 W5: brand
performance in place of an answer. W13: "Duplicated sentences left in the body."

Drop-in: cut it from the `summary` and from ¶2, keep one version at the (relocated)
tax section, reworded to describe the reader's problem rather than our virtue:

> "Your moving bill is not one number, it is three. Some of what you spend comes off a
> tax bill now, some is worth nothing today and a lot in twenty years, and the rest is
> simply gone."

### ADVISORY A9-4. The negotiation paragraph is the batch's most converged.

> "Aim for 1.2% including VAT on a sole agency deal, and get three quotes before you
> sign. If one agent came in cheaper, say so to the one you actually want."

Three of the five clauses in this paragraph appear near-verbatim on A1, A2, A7 and in
the calculator's own FAQ. The device is mandated (rule 10) and the 1.2% number is
spec-supplied (P5, W2), but this is A9's fourth-best content and it is running someone
else's sentences. It also carries five internal links in 112 words. See §7 for the
adjudication and the drop-in.

### ADVISORY A9-5. Two consecutive H2s drop the question mark for a colon list.

> "What does it cost to sell: the agent, the solicitor and the EPC"
> "What does it cost to buy: stamp duty and the Land Registry fee"

Back to back, same shape, and both start a question stem then abandon it. Rule 9 wants
complete questions. Drop-in: "What does it cost to sell your house?" and "What does it
cost to buy the next one?". The colon lists are already the first sentence of each
section.

### ADVISORY A9-6. First-time-buyer arithmetic changes base without saying so.

> "At £293,262 that means no stamp duty at all, so take the £4,663 off and you are at
> about £3,668 all in."

£3,668 is £8,331 (buying without selling) minus £4,663, not £13,275 minus £4,663. It
is right, and the preceding paragraph does establish £8,331, but the sentence reads as
though it is taking £4,663 off the headline total. Drop-in: "…so from that £8,331 take
the £4,663 off and a first-time buyer is at about £3,668 all in."

---

## 5. A12 `part-exchange-house-uk`: must_fix

The strongest of the four on register. Every band met, best Flesch in the batch (80.4),
zero hard citations, the verdict lands at word 47, the haircut is priced in pounds
twice, and the stamp-duty-relief section is the sharpest piece of writing in the wave.
One hard-rule breach and three sameness items.

### BLOCKER A12-1. The CGT block closes with an anaphoric four-link run.

> "That is as far as this page goes on tax. For the mechanics, read capital gains tax
> on property. For how letting affects the relief, read private residence relief. For
> the reporting clock, read CGT payment deadlines. For a figure now, the capital gains
> tax calculator takes your own numbers."

Rule 13: "one block, plain words, one pound figure, **one link out**." Four links, and
"For X, read Y" four times is a formula the eye stops reading at the second one. The
opening line is also the writer talking about the page rather than to the reader.

Drop-in:

> "That is as far as this page goes on tax, because the mechanics are a subject of
> their own. If your old home was let or was a second property, our complete guide to
> capital gains tax on property has the rates, the reliefs and the deadline."

(one link, the complete guide.)

### ADVISORY A12-2. Closing paragraph is a batch template.

> "Before you answer the builder, price the other route properly. Our cost of selling
> calculator gives you the full cost of an open market sale on your own figures in
> under a minute: agent fee, legal work, and what comes off your gain."

A11 and A13 open their closers the same way ("Before you accept any offer on this
route…", "Before you accept an offer…"), and A11, A12 and A5 all run the same
"[tool] gives you [X] in [time]: [three-item colon list]" shape. The named tool, the
time promise and the stated output are all mandated by rule 12; the "Before you…"
opener and the colon triad are not. See §7.

Drop-in, keeping every mandated element:

> "You do not have to answer the builder today. Put your own figures into our cost of
> selling calculator, which prices an open market sale in under a minute and shows you
> what the agent, the legal work and the tax actually take. If the gap to the builder's
> offer is smaller than you feared, take the certainty. If it is not, go back and ask
> for assisted move."

### ADVISORY A12-3. The rendered standfirst and body ¶2 make the same move.

> `summary`: "This page shows how the valuation is built, what Barratt and Taylor
> Wimpey publish as their conditions, what actually moves the number, how assisted move
> and chain break differ, why the builder pays no stamp duty on your old house, and
> what part exchange does to your capital gains tax position…" (61 words, one sentence)
> body ¶2: "This page shows you how the builder gets to its number, what you can move,
> and what the whole thing does to your tax bill."

Same stem, same catalogue, 60 words apart on screen. Drop-in in §7.

### ADVISORY A12-4. "The short version" duplicates A6's at-a-glance lead-in.

A6 uses "The short version, before the detail:". Rule 7 mandates the box, not the
label. Drop-in: "What the deal actually is" or drop the lead-in and let the list run,
which is what A1 and A13 do with a plain "At a glance".

---

## 6. Calculator `cost-of-selling-calculator.ts`: must_fix

Cleanest surface in the batch on register: 414 words of landing copy at mean sentence
13.4, Flesch 80.7, 72.5 "you" per 1,000, zero em-dashes, zero hard citations in any
user-facing string, zero pipeline leakage. Every statutory reference is in a block
comment, which the file's own header declares and honours. The CGT arithmetic in the
second worked example checks out end to end (£270 of unused basic-rate band, £48.60
rounded to £49, £84,789 at 24% = £20,349, total £20,398, and the £550 error costing
£132 at 24%).

### BLOCKER CALC-1. A published sum that visibly does not add up.

> "Costs that would come off a capital gain = £4,160 + £700 + £80 = £4,941"

£4,160 + £700 + £80 = £4,940. The £4,941 is correct against the unrounded fee
(£293,000 × 1.42% = £4,160.60), but the worked example shows the rounded inputs and
the unrounded output on the same line. A worked example exists so a reader can follow
the arithmetic; this one fails on the fourth step. Every downstream figure (£5,491,
£88,059, £25,889) inherits it.

Drop-in, showing the pence once and rounding at the end:

> "Estate agent fee = £293,000 x 1.42% = £4,160.60"
> "Conveyancing for the sale = £700"
> "Energy performance certificate = £80"
> "Costs that would come off a capital gain = £4,160.60 + £700 + £80 = £4,941"

Also replace the ASCII `x` with `×` in both examples.

### ADVISORY CALC-2. Above-the-tool copy is 73 words against a band of 250-600.

`intro` is the only string that renders above the calculator
(`src/app/calculators/[slug]/page.tsx:73`); `explainer`, worked examples and FAQs all
render below it (lines 86-134). So the calculator-landing band of "250 to 600 above the
tool" is measured on 73 words.

**Recommendation: fix the spec, not the copy.** The band contradicts the spec's own
prescription two lines later ("Promise, time cost, named output. **No explanation of
method above the fold**") and its own model, W12's line, which is about 30 words. The
spec explicitly names W13 as the counter-example: 120 words above the tool, ranking p7
and p10. 250 words above the fold is W13's mistake with a target attached. The `intro`
does everything the row's Shape column asks: promise ("the full breakdown"), time
("under a minute"), named output (agent fee inc VAT, conveyancing, EPC, removal van),
and which situations it covers (let or second home). Flag it in the wave wrap as a
spec correction; leave the copy alone.

### ADVISORY CALC-3. `oneLiner` is a keyword list with a colon.

> "The full cost of selling a house in England: estate agent fee including VAT,
> conveyancing, EPC and removals, split into what comes off a capital gain and what
> does not."

Thirty words, one sentence, Flesch 52, zero second person, and it renders as the card
subtitle on `/calculators`. It is the only string on the surface that reads as written
for a crawler. Drop-in: "Work out what selling your house will cost you, and which of
those costs come off a capital gain if it was let."

### ADVISORY CALC-4. Three CGT FAQs on a tool targeting "estate agent fees calculator uk".

"Do I pay capital gains tax when I sell my house?", "Which selling costs come off a
capital gain?" and "Can I deduct removal costs from my gain?" plus explainer paragraphs
3 and 4 put roughly 40% of the landing copy on CGT. The deductible/non-deductible split
is the tool's whole differentiator and must stay; the standalone "Do I pay capital gains
tax when I sell my house?" FAQ is generic cgt1 material and the armed batch owns that
query. Drop-in: cut that one FAQ and let the `letOrSecond` toggle's help text (which
already says it) carry the point.

---

## 7. Cross-batch sameness, all fifteen surfaces

H2 lists, openers, at-a-glance lead-ins, CGT-block openers and closing paragraphs were
read across all thirteen posts plus the calculator and the tie-in page. Adjudication
below: **mandated** means the spec prescribes the device, so repetition is correct and
only the wording is a finding; **converged** means five independent writers arrived at
the same move with no instruction to.

Two things that came out clean and should be said: **CGT-block openers are genuinely
varied** across all thirteen (thirteen different first sentences, from "Usually not" to
"Skip this if the house has been your only home throughout" to "Two sourced sets of
figures, published a month apart"), and **at-a-glance box lead-ins are varied** apart
from the "Here is…" cluster below. Those were the two most likely failure points and
the writers held them.

### Worst 7, ranked

**S1. "The thing no other guide does", CONVERGED. 22 instances across 11 of 13 pages.**

> A9: "then does the part no other moving-cost guide does" (in the rendered standfirst)
> A8: "a right almost no consumer guide works through"
> A5: "this is the most useful thing on this page"
> A12: "Here is the comparison the builders' pages do not print"
> A4: "Every guide on this subject says yes… Almost none of them tell you when the answer is effectively no"
> A7: "This is the part the fee comparisons leave out"
> A13: "The line nobody else gives you is the fifth one"

Not in the spec anywhere. Spec §4 puts it on the do-not-copy list under W5: "First-person
brand performance in place of an answer". Five writers independently reached for the
same move, which makes it the batch's defining fingerprint: a reader who lands on three
of these pages is told three times that everyone else is worse.

Distinguish two classes. Honest data-gap statements stay. "Nobody publishes verified
London completion averages you can check" (A7) and "Nobody publishes a reliable figure
for what private sales fetch" (A3) are findings about the evidence, not boasts. The
class to cut is any sentence asserting our superiority over an unnamed competitor.

Drop-in rule: replace the comparison with the reader's problem.
- A9 → "Your moving bill is not one number, it is three."
- A8 → "The right exists whether or not anyone told you about it."
- A5 → "Yes, and almost no seller is told so."
- A12 → "Here is the comparison in full."
- A7 → "In London this line is worth thousands."

**S2. The rendered standfirst is a keyword catalogue on 13 of 13, CONVERGED.**

`summary` renders on-page under the H1 at 18px, so it is prose, not metadata. It runs
91 to 158 words with single sentences up to **99 words** (A3), 79 (A8), 69 (A2), 61
(A12), 60 (A5). Five pages use the literal stem "This page/guide sets out…" followed by
a four-to-six item comma catalogue.

> A8: "This guide sets out how the tie-in and the notice stack up, the difference
> between sole agency and sole selling rights in the exact wording your contract has to
> use, when two agents can both charge you for one sale, the 14-day cancellation right
> that applies when you signed at home, what the agent had to tell you about withdrawal
> fees before you signed, and which of those payments actually come off your gain if
> the sale is taxable." (79 words, one sentence)

The spec measures body only and sets no band for frontmatter, so this is outside the
rules and inside the standing editorial track. It breaks every sentence-length target
on the page it introduces, and four pages (A8, A10, A11, A12) then repeat the same
catalogue in body ¶2, which is the W13 duplication habit.

Drop-in shape, three sentences, no catalogue, answer first:
> A8: "Most sole agency tie-ins run 4 or 12 weeks, and the notice period usually sits
> on top rather than inside, so 12 plus 4 means 16 weeks. Sole selling rights can make
> you owe the fee on a buyer you found yourself. If your sale is taxable, the fee on
> the completed sale comes off your gain and a withdrawal fee does not."
> A12: "A builder's part exchange offer is 80% to 90% of open market value, which is
> £30,000 to £60,000 on a £300,000 home against an agent fee of about £4,260. You are
> buying a guaranteed date and paying for it in the price. It suits three sellers, and
> most people are not one of them."

Then delete the duplicated catalogue from body ¶2 on A8, A10, A11 and A12.

**S3. "Get three quotes from a mix of local independents and bigger chains", MANDATED
device, CONVERGED wording. 7 of 13 pages plus the calculator.**

> A1: "Get three quotes, from a mix of local independents and larger chains…"
> A7: "Get three written quotes, from a mix of local independents and larger chains."
> calculator FAQ: "Get three quotes from a mix of local independents and bigger chains."
> A9: "get three quotes before you sign. If one agent came in cheaper, say so…"
> A6: "Get three quotes and mix local independents with one chain."

Rule 10 mandates a target number or a script and names "get three quotes" as an
acceptable one, so the device is correct everywhere it appears. The problem is that the
qualifier is W9's own sentence, "Get at least three quotes to compare. Talk to a mix of
local independents and bigger chains" (spec P5), reproduced almost verbatim on three of
our surfaces. We have copied a winner's phrasing, not its pattern, and then copied it
across ourselves.

Same story for the target number: "Aim for 1.2% including VAT on a sole agency deal"
appears on A2, A9 and the calculator FAQ. The 1.2% is spec-supplied (P5, W2) and must
stay; the sentence should not be identical three times.

Drop-in: keep "three quotes" and "1.2%" everywhere, vary what each page does with them,
which the topic makes easy.
- A9 (moving, budget framing) → "Three quotes is the whole negotiation. On your
  £293,262 sale the difference between 1.8% and 1.2% is £1,758, so an hour of phone
  calls is worth more than every other saving on this page put together."
- A1 (the fee pillar) keeps the full script, it is the page that owns it.
- A7 (London) → keep, but lead on the London number, not the method.
- calculator FAQ → "Yes, and your agent expects you to. Three quotes gives you
  something to quote back. Aim for 1.2% including VAT on sole agency, and negotiate the
  tie-in as hard as the rate."
- A6 (lettings) → drop "three quotes" entirely; the letting-agent lever is the
  management tier, not the count of quotes.

**S4. The closing CTA shape, MANDATED content, CONVERGED frame. 12 of 13.**

Rule 12 mandates the named calculator, what it returns and how long it takes, and P7
records that two winners independently promise about 60 seconds. So the calculator, the
"under a minute" and the stated output are all correct on all thirteen and are not
findings. Three things on top of that are ours:

1. **"Before you [verb]…"** opens the closer on A1, A11, A12 and A13. It is also an
   estate-wide tic: sixteen other Property posts open a paragraph that way.
2. **The colon triad.** A5 "the agent fee, the legal fees and the rest"; A8 "the agent's
   fee, the legal costs and the rest"; A11 "fees, legal costs and what is left once tax
   is paid"; A12 "agent fee, legal work, and what comes off your gain". A5 and A8 are
   the same three items in the same order with the same "and the rest".
3. **The time unit is arbitrary.** Seven say "under a minute", three "under 60 seconds",
   two "about a minute". Same promise, three phrasings, no reason for the split.

Drop-in: pick "in under a minute" everywhere and let each page name a different pair of
outputs, chosen for that page's reader. A5 → "what a flat fee actually saves you at your
price"; A8 → "what you owe if you leave and what you owe if you stay"; A12 → "what an
open market sale would have left you"; A9 → "your own number instead of the England
average". Vary the openers so no two adjacent pages start "Before you".

**S5. "Here is [the/your] X" as the at-a-glance lead-in, CONVERGED. 4 of 13.**

> A2: "Here is what you are choosing between."
> A5: "Here is the verdict."
> A9: "Here is your whole bill at a glance…"
> A10: "Here is the whole deal in six lines."

Rule 7 mandates the box, not the lead-in. A5's is the one to keep, because "Here is the
verdict" is the route-page verdict rule (rule 11) doing real work. Drop-in for the other
three: A2 → "Four ways to pay an agent, and what each one costs you."; A9 → "Your whole
bill, on a high street sale and purchase at the England average."; A10 → "The whole deal
in six lines."

**S6. Compound "X, and Y?" H2s, CONVERGED. 32 of 122 H2s across the batch.**

Worst: A13 7/9, A5 6/11, A9 5/10. Clean: A2, A8, A10 at zero.

Rule 9 asks for "a complete question in the reader's words". W1's set, which holds two
p2 slots on 27 of 50 question headings, is single-clause throughout. A comma-spliced
double question is a section summary, not a query, and it will not match a
People-Also-Ask string. Two of the three worst offenders are in this batch. Drop-ins for
A5 and A9 are in §2 and §4; A13 needs the same pass and is outside this batch.

**S7. The four-to-seven link paragraph, CONVERGED. 11 of 13 pages carry at least one.**

A4 has a 7-link paragraph, A6 a 7, A1 a 5, A5 a 5, A9 a 5, A13 a 5, A8 a 4-in-27-words.
Eight of the eleven sit inside or immediately after the CGT block, where rule 13 says
"one link out". The hub-and-spoke linking for the wave is right in aggregate (12 to 19
links per page is fine); the failure is concentration. Drop-in rule: **one link per
sentence, maximum two per paragraph, and exactly one in the CGT block.** Move the
displaced links into the closing paragraph or into the related-links furniture, where a
list is a list rather than prose pretending to be one.

### Repeats adjudicated as correct, do not touch

- **The PRR carve-out sentence** ("private residence relief normally covers a main
  home") on 12 of 13. §3 mandates it: "the PRR carve-out in one sentence". The wordings
  are already varied.
- **The 1.42% including VAT average and its £ conversion.** Rule 5 mandates a pound
  conversion against a stated property value in the same or next sentence. Every page
  does it, against four different stated values (£293,262, £300,000, London's own,
  £293,000 on the tool). Correct.
- **The at-a-glance box itself**, on every fee, cost and pillar page. Rule 7.
- **The named-calculator CTA with a time promise**, on 12 of 13. Rule 12.
- **`reviewedBy` / `reviewerCredentials` frontmatter being present on all thirteen.**
  Standing house practice, not a wave device. The *wording* is a finding, below.

### One batch-wide item outside the worst 7

**`reviewerCredentials` is the same sentence thirteen times.** It renders on-page
(`BlogPostRenderer.tsx:333`) directly under "Reviewed by / Property Tax Partners
Editorial Team". Eight of thirteen open with the literal word "Checked":

> A8: "Checked against the wording estate agents are required to use…"
> A12: "Checked against the part exchange terms Barratt and Taylor Wimpey publish…"
> A9: "Every cost on this page is traced to a named, dated source…"
> A5: "Prices read from the agents' own published pages on 21 August 2026…"

Two problems. First, 100% shape convergence in an E-E-A-T slot is worse than no slot at
all. Second, the field is a *credential* and these are *method notes*: A9's in
particular is the self-praise of S1 in the reviewer's byline. A5's hard-codes a date
that will read as stale within weeks.

Drop-in: keep the method note (it is honest and the alternative would overclaim), but
vary the opening verb and drop the dates and the boasts. A8 → "Read against the sole
agency and sole selling rights wording contracts must carry, and against the rules on
which selling costs reduce a gain." A9 → "Every cost figure on this page carries a named
published source, and the tax treatment follows HMRC's own guidance." A5 → "Fees taken
from the providers' own published package pages; cancellation and redress rules read
against the current wording." A12 → keep as written, it is the best of the four.

---

## 8. What a reviewer should do with this

Nine blockers across five surfaces. Seven are single-paragraph replacements with the
text supplied above. Two need slightly more:

- **A9-1** moves one H2 section down the page and leaves a two-sentence bridge. No
  rewriting, and it is the one finding that also protects the unshipped pillar.
- **A8-1** rewrites a four-bullet list, supplied in full above.

The sameness work (S1 through S7) is a mechanical sweep and can be batched: S1 is 22
sentence swaps, S2 is thirteen standfirsts, S3 is four paragraphs, S4 is twelve closers,
S5 is three lead-ins, S6 is a heading pass on A5, A9 and A13, S7 is redistributing links
on eleven pages. None of it touches a number or a fact.

Batch 3 QA, 2026-08-21. Read-only: no surface was edited.
