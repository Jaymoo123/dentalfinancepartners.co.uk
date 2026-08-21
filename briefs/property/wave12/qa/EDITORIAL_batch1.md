# Wave 12 Cluster A — editorial QA, batch 1

**Scope.** Five surfaces by five different writers, judged against
`briefs/property/wave12/_language_spec.md` (14 hard rules + §3 per-page-type bands) and the
standing editorial track. Cross-batch fingerprint skim run over the other ten surfaces
(9 remaining blog files + `src/lib/calculators/tools/cost-of-selling-calculator.ts`).

Page-type IDs below follow `picks.yaml`, not the spec's §3 shorthand. Mapping used:
A1 fee, A3 route, A6 fee, A10 route, pillar.

**Read-only pass. Nothing was edited.**

---

## 1. Verdict table

| Surface | Type | Words | Mean sent. | Flesch | "you"/1k | Q-H2s | Hard statute | Em-dash | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| A1 `how-much-do-estate-agents-charge-to-sell-a-house` | Fee | 1,877 | 16.0 | 68.6 | 52.7 | 8/9 (89%) | 0 | 0 | **must_fix** |
| A3 `sell-house-without-estate-agent` | Route | 2,867 | 16.3 | 69.4 | 29.3 | 8/10 (80%) | 0 | 0 | **must_fix** |
| A6 `estate-agent-fees-for-renting` | Fee | 1,829 | 16.0 | 71.0 | 55.2 | 7/8 (88%) | 0 | 0 | **must_fix** |
| A10 `selling-a-house-at-auction-uk` | Route | 2,429 | 15.8 | 73.1 | 37.5 | 8/10 (80%) | 0 | 0 | **must_fix** |
| Pillar `/cost-of-selling-a-property` | Pillar | 2,351 | 16.9 | 71.1 | 53.6 | 10/10 (100%) | 0 | 0 | **must_fix** |

**Band targets for reference.** Fee 1,200–2,000 w / 15–18 sent / 62+ Flesch / 45–60 you / ≥40% Q.
Route 1,600–3,400 w / 13–17 sent / 68+ Flesch / 28–50 you / ≥40% Q.
Pillar 2,400–3,200 w / 15–18 sent / 62+ Flesch / 45–60 you / ≥30% Q.

**Every measured band is met on four of five surfaces.** The pillar misses its word floor by 49
words (2%). No surface breaches a readability, register or statute rule. The five verdicts are
driven almost entirely by cross-writer sameness, not by the numbers.

### Mechanical checks, all five

- **Em-dashes: zero.** U+2014, U+2013, `&mdash;`, `&ndash;`, `&#8212;`, `&#8211;`, `&#x2013/4;` all
  return 0 on all five files. Clean.
- **Hard statutory references in prose: zero.** No section numbers, no SI numbers, no Act names, no
  `legislation.gov.uk`. Attribution is done in plain words throughout ("the regulations prescribe a
  form of words", "the rules require the published fee list to state each fee inclusive of any
  applicable tax"). This is the wave rule executed correctly and it is the batch's strongest
  compliance result. The only `Section` hits are "Section B" of Land Registry form ID1, which is a
  form section, not a statute section — not a finding.
- **Pipeline leakage: zero.** No `§`, `house position`, `brief`, `spec`, `Stage 2`, `F-1nn`,
  `verify at`, `as of 2026-05`. Every `pack` hit is domain vocabulary (legal pack, leasehold pack,
  management pack). `lock-in` on the pillar is consumer vocabulary for a tie-in, not pipeline. The
  calculator's `TCGA 1992 s.38`, `CG15250` and `house_positions.md §5.B` citations are confined to
  the file header comment, which the comment itself flags — correct.
- **UK English: clean.** The only `-ize`/`-ization` hits are `Organization` in schema.org JSON-LD
  and `center` in Tailwind class names.
- **Named worked-example personas: none.** The `epc-certificate-cost-uk` "Gwen" precedent has not
  been inherited. Every worked example runs off a stated property value.
- **Our-pricing / self-referential fee comparison: none.**
- **`reviewerCredentials` and `summary` (both render).** No leakage. See ADVISORY A3-4 and
  BATCH-11 for register findings in these fields.

---

## 2. Adjudication: mandated structure vs converged phrasing

The spec mandates three devices on every page: the at-a-glance box (rule 7), the CGT hook block
(rule 13, "The CGT hook is mandatory"), and the calculator CTA (rule 12). Presence of all three on
all five surfaces is **correct and not a finding**. The finding is that the writers converged on
the same *sentence* to introduce each one.

The test applied: strip the mandated content, and ask whether what remains — the lead-in clause,
the transition, the framing verb — could be swapped between two surfaces without anyone noticing.
Where the answer is yes, it is a finding.

| Device | Mandated? | Structure across the five | Phrasing across the five | Call |
|---|---|---|---|---|
| At-a-glance box | Yes, rule 7 | **Varies well.** A1 bold "At a glance" heading + 7 labelled `<li>`; A3 7 labelled `<li>` after a lead sentence; A6 6 labelled `<li>`; A10 6 unlabelled `<li>`; pillar a styled `<dl>` with label/figure/condition split into cells. Five genuinely different renderings. | **Converged.** Three of five open with "Here is the…" (A3 "Here is the shape of it before the detail", A10 "Here is the whole deal in six lines", pillar "Here is the whole bill on a £293,000 sale"). A3 and A6 both end their lead-in with the identical tag "before the detail". Five of the box's terminal lines are labelled `Tax:` / `Your tax:`. | **Finding** on phrasing only. Structure passes. |
| CGT hook block | Yes, rule 13 | **Passes on all five.** One block, after the cost answer is complete, before the CTA. Never opens a page, never an H1 or first H2. One pound figure showing the deduction working on each. No rate table, no annual exempt amount, no PRR mechanics, no 60-day walkthrough — the cgt1 freeze is respected. This is executed to spec. | **Openers vary acceptably** (A1 conditional trigger list; A3 "The last two rows are the point of this page"; A6 "When you eventually sell"; A10 "Start with the good news"; pillar "Here is the part that makes the rest of this page worth reading"). But four of five bolt the same boast onto the block, and the "removals, storage, cleaning" negative list is near-verbatim on all five. | **Structure all_clear. Phrasing = finding** (BATCH-2, BATCH-6). |
| Calculator CTA | Yes, rule 12 | **Passes on four of five.** Named tool, what it returns, how long it takes. Pillar fails: its terminal `CTASection` primary is "Book free consultation", with the calculator demoted to secondary. | **Heavily converged.** "personalised breakdown" verbatim on A3, A6, A10. The timing promise appears on 12 of 14 batch surfaces. A6 alone says "under 60 seconds" where the other four say "in under a minute" — an inconsistency in the same promise. | **Finding** (BATCH-4) + BLOCKER PILLAR-1. |

**Summary of the adjudication.** The writers were given three mandated devices and independently
reached for the same handful of sentence frames to introduce them. That is not the brief working;
that is the brief's example sentences being copied. The at-a-glance *rendering* proves the writers
could differentiate when the spec did not hand them a sentence — the box looks different on all
five surfaces. Where the spec quoted a winner line (W12's "personalised breakdown … under 60
seconds"), all five reproduced it. **The fix is not more spec; it is a per-page allocation of the
lead-in frames.**

---

## 3. Per-surface findings

### A1 — `how-much-do-estate-agents-charge-to-sell-a-house.md` — must_fix

All bands met. Two 3-column tables, both carrying a total row. Negotiation advice gives a target
number (1% plus VAT). Findings are sameness and register.

**BLOCKER A1-1 — FAQ question string is byte-identical to A8's.**
> `- question: "What is the difference between sole agency and sole selling rights?"`

Same string, character for character, in `estate-agent-contract-tie-in-periods.md`. Both pages sit
in the `capital-gains-tax` category and both emit `FAQPage` JSON-LD, so this ships two identical
questions to the same schema surface — the cannibalisation the wave freeze exists to prevent.

*Drop-in:* on A1, rewrite to the fee framing this page owns:
`"Which contract type costs you more, sole agency or sole selling rights?"`
Leave A8's string as the definitional one, since A8 is the contract page.

**BLOCKER A1-2 — the "nobody else does this" boast, three times, once in the H1.**
> H1: `How Much Do Estate Agents Charge to Sell a House? The Fee, the VAT and the Cost Nobody Compares`
> Body: `At the end comes the part no fee comparison runs: which of these costs come off a taxable gain, and which do nothing for you.`
> Body: `The VAT question has an answer no fee comparison gives you.`

Three instances of the same self-congratulation, and the phrase "no fee comparison" appears three
times on this page alone. The spec's Do-Not-Copy section names this register directly (W5: "This is
the only guide to estate agency fees (on the internet) written by 'serial' house sellers"). No
measured winner boasts about its own coverage. See BATCH-2 — this is the batch's worst fingerprint
and A1 is its heaviest carrier.

*Drop-in:* H1 → `How Much Do Estate Agents Charge to Sell a House? The Fee, the VAT and What Comes Off Your Tax`. Body sentence one → `At the end, the part that changes the number: which of these costs come off a taxable gain, and which do nothing for you.` Body sentence two → `The VAT has an answer of its own.`

**ADVISORY A1-3 — paragraph two is a promise list.**
> `Below you get the rate by model, the cash at three sale prices, what the agent must tell you before you sign, and the number to negotiate towards.`

Spec §4 on W4: "A promise list is not an answer." Mitigated because paragraph one already delivers
the number, so this is not the W4 failure mode — but it is the shape, and it recurs on 9 of 13 blog
surfaces (BATCH-3).

*Drop-in:* cut to the one thing the reader cannot get elsewhere: `The rate you are quoted is not the rate you pay, and the gap has three causes: the agency model, the VAT, and what sits outside the percentage.`

**ADVISORY A1-4 — closing link-dump paragraph.**
> `Where a gain does arise, the mechanics live in our complete guide to capital gains tax on property, with the detail for a second home sale, a rental property sale and private residence relief for landlords. Run your own numbers with the capital gains tax calculator.`

Five exact-match anchors in two sentences, three of them in a comma list. This is keyword-list-as-prose.
Same defect on A6 (worse) and A10 (milder).

*Drop-in:* keep two links, drop three: `Where a gain does arise, our complete guide to capital gains tax on property has the mechanics, and the capital gains tax calculator will size it.` Move the second-home / rental / PRR links into the `links` rail rather than the sentence.

**ADVISORY A1-5 — the March/May two-dates example is a clone of A3's, and the framing sentence is a clone of A10's.**
> A1: `So a late March exchange with a May completion sits in the earlier tax year, while your 60 day clock runs from the later date.`
> A3: `Say you exchange contracts on 26 March and complete on 12 May.`
> A1: `Two dates do two different jobs, and mixing them up is the classic error on a spring sale.`
> A10 FAQ: `The two dates do different jobs.`

*Drop-in:* A10 already varies the worked dates well (hammer 30 March, completion 27 April). Give A1
a different month pair — `an exchange on 2 April with a June completion` — and change the framing
sentence to `The date you exchange and the date you complete are doing two different jobs here.`

---

### A3 — `sell-house-without-estate-agent.md` — must_fix

All route bands met. "you" at 29.3 is 1.3 above the floor of 28 — the tightest margin on any
surface, and defensible on a route page where the spec says a verdict substitutes for direct
address. Both tables carry total rows. The Rightmove/redress-scheme contradiction argument (lines
95–97) is the strongest original reasoning in the batch and should survive any edit.

**BLOCKER A3-1 — two FAQ question strings byte-identical to A4's, on its direct sibling page.**
> `- question: "Do you need a solicitor to sell a house?"`
> `- question: "Can you do your own conveyancing?"`

Both appear character-for-character in `can-you-sell-a-house-without-an-estate-agent.md`, which is
the page A3 links to in its second paragraph as the decision-stage sibling. Two more are near-identical:
A3 `"Can you list on Rightmove as a private seller?"` vs A4 `"Can you list on Rightmove yourself?"`;
A3 `"What is form ID1 and why do you need it?"` vs A4 `"What is form ID1?"`. Four of fourteen FAQs
duplicated onto the one page most likely to compete with it.

*Drop-in:* A3 is the *process* page, so make its questions procedural:
`"At what point in the process do you have to instruct a conveyancer?"` and
`"Can you prepare the transfer document yourself, and when should you not?"`
Leave A4's as the definitional pair.

**BLOCKER A3-2 — the rendering `summary` is a single 90-word sentence.**
> `summary: "Selling your own home without an agent saves about £3,200 on a £300,000 sale, and rather less once tax is taken into account, because the fee you avoid was also a deduction against any chargeable gain. This page is the process rather than the argument: how to price the house, how the listing services get you on to the big portals and what that route really is in law, the paperwork you need before you market, how to check a buyer with nobody vetting for you, whether you can do your own conveyancing, what you are legally on the hook for when you answer questions about the property, what the whole thing costs against sourced 2026 figures, and the reporting deadline that catches sellers who have removed the one professional who might have mentioned it."`

`summary` renders twice: as the dek under the H1 (`BlogPostRenderer.tsx:215`, at `text-lg`) and as
the card copy on the category index (`line-clamp-3`). The second sentence runs 90 words with eight
comma-separated clauses. Against a page whose body mean sentence is 16.3, the first thing a reader
sees is a sentence five times that length. It is also the promise-list shape (BATCH-3) at maximum
extension, and the `line-clamp-3` truncation will cut it mid-clause on the index.

*Drop-in:* `Selling your own home saves about £3,200 on a £300,000 sale, and less than that after tax, because the fee you avoid was also a deduction against any chargeable gain. This page is the process, not the argument: the ten steps, the portal rule, the paperwork, the buyer checks, and the filing deadline that catches sellers who have removed the one person who might have mentioned it.`

**ADVISORY A3-3 — "told you something useful" used twice on this page and again on A6.**
> A3 FAQ: `one who stalls on every item is telling you something useful.`
> A3 body: `A buyer who stalls on every item has told you something useful`
> A6 body: `An agent who will not put that number in writing has told you something useful.`

An internal duplication *and* a cross-writer one. The spec's Do-Not-Copy row on W13 flags exactly
this ("Duplicated sentences left in the body").

*Drop-in:* A3 body → `A buyer who stalls on every item has answered the question anyway.` Leave the
FAQ. A6 → `An agent who will not put that number in writing has answered you already.`

**ADVISORY A3-4 — "before the detail" shared verbatim with A6.**
> A3: `Here is the shape of it before the detail.`
> A6: `The short version, before the detail:`

Two writers, same three-word tag, both introducing the mandated at-a-glance box.

*Drop-in:* A3 → `The arithmetic, in seven lines.` A6 → `What a letting agent costs you, in six lines.`

**ADVISORY A3-5 — the boast, four times.**
`smaller than the DIY selling sites suggest` / `no fee comparison site runs them` / `Worth naming what you give up, since no DIY guide does` / `Every DIY selling guide stops at completion` / H2 `Step ten: the tax return nobody reminds you about`. See BATCH-2. Keep at most one, and make it the H2, which is the only place it does load-bearing work.

---

### A6 — `estate-agent-fees-for-renting.md` — must_fix

All fee bands met, and this is the highest "you" density in the five (55.2). Register is correctly
pitched at a landlord throughout — "you" is unambiguously the landlord on every occurrence, and the
letting/selling relief split is the sharpest original content in the batch. Two defects are copy
quality rather than sameness.

**BLOCKER A6-1 — ungrammatical sentence.**
> `Our <a href="/for-letting-agents">hub for letting agents</a> is what your agent is being told about the questions their landlords bring.`

The sentence does not parse: "Our hub … is what your agent is being told about the questions" has no
working subject-complement relation. This ships as visible body copy.

*Drop-in:* `Our hub for letting agents is where we set out the same questions from the agent's side.`

Register note on the same link: it points a landlord reader at a surface written for agents, mid-way
through a paragraph about the landlord's own deductions. If the link is kept, it needs the register
break signalled, which the drop-in above does.

**BLOCKER A6-2 — closing link-dump: six exact-match anchors in five sentences.**
> `The gain itself and the reporting deadline are covered in tax when you sell a rental property and capital gains tax payment deadlines on property sales. For what a selling agent charges, see how much estate agents charge to sell a house and the cheapest estate agent fees in the UK. Before you sign with one, read estate agent contract tie in periods. Our cost of selling a property guide adds up the whole bill. The cost of selling calculator gives you a personalised breakdown in under 60 seconds.`

Six anchors, every one an exact-match keyword, in a paragraph whose only content is the links. This
is keyword-lists-as-prose in its purest form and it is the single worst instance in the five.

*Drop-in:* cut to two links and give the paragraph an actual argument: `When you do sell, the commission changes box: our guide to tax when you sell a rental property has the gain, and the cost of selling calculator prices the sale itself in under a minute.` Move the other four into the page's existing related-links rail.

**ADVISORY A6-3 — "personalised breakdown in under 60 seconds" conflicts with the rest of the batch.**
Twelve of fourteen batch surfaces promise the calculator result "in under a minute". A6 alone says
"under 60 seconds". Same promise, two wordings, one calculator. Pick one estate-wide.

*Drop-in:* if the batch standard is "in under a minute", A6 should match — but see BATCH-4, because
the real fix is that three surfaces should not be saying "personalised breakdown" at all.

**ADVISORY A6-4 — the mandated cost table carries three non-cost rows.**
> `Removals, storage, your own time | Not an agency fee at all | No relief at either end`
> `Commission when the same agent sells the property later | Not a letting fee, and not priced here | Off your capital gain, never off your rental income`
> `Renewal, check out, mid term inspection, possession paperwork | No figure published by either source. Ask for it…`

Rule 8 wants `Item | Cost` (or `Item | Typical cost | What moves it`) with a total row. The total row
is present and correct. But three of twelve rows carry no cost, which turns a budgeting table into a
commentary table and pushes it past the winner shape. The "not priced here" row is doing the CGT
hook's job inside the cost table, which also weakens the mandated block further down.

*Drop-in:* move those three rows out as three sentences under the table. The declined-figure row is
good practice and should survive as prose: `Neither source publishes a figure for renewals, check outs, inspections or possession paperwork. Ask for those before you sign.` (The page already says almost exactly this two sections later, so the prose version is a merge, not an addition.)

---

### A10 — `selling-a-house-at-auction-uk.md` — must_fix

Best readability in the five (Flesch 73.1, mean sentence 15.8) and comfortably inside every route
band. The refusal to invent an auction-discount figure is exactly right and should not be edited:
> `You will find plenty of pages telling you the auction discount is 10%, or 20%, or some other round number. None of them shows where the figure came from, and we are not going to add another one.`

Rule 11 asks route pages to price the route "as a pound haircut". A10 declines, with reasons, and
instead prices the route's *fees* in pounds (£6,610 to £9,760 with a total row). That is the correct
call under the spec's own evidence standard and is recorded here as compliant, not as a miss.

**BLOCKER A10-1 — the boast is in the H1 and repeated five times in body and frontmatter.**
> H1 / `title`: `Selling a House at Auction in the UK: What It Costs, How Fast It Is, and the Tax Date Nobody Mentions`
> `metaDescription`: `…and the tax date auction guides never mention.`
> `summary`: `It also covers the point no consumer auction guide makes.`
> Body: `one tax point that no auction guide covers`
> Body: `Now the date, which is the part nobody tells you.`
> Body: `That correction is worth more than it looks, because plenty of guides tell you the opposite.`

Six instances, the highest count in the batch, and the H1 is the loudest placement available. The H1
also breaks the spec's opening rule in spirit: rule 5 of §5 says the page opens on the reader's cost
question, and a third of this H1 is a claim about other publishers rather than about auctions.

*Drop-in:* H1 → `Selling a House at Auction in the UK: What It Costs, How Fast It Is, and When the Tax Falls Due`. `metaDescription` → `…and the tax date that falls before you get the money.` Body → `Now the date, which is where auction differs from every other route.` Keep at most one of the remaining three.

**ADVISORY A10-2 — "Here is the whole deal in six lines" + at-a-glance box without labels.**
The box is the only one of the five with no bold labels, so the same mandated device renders as a
plain bullet list here and as a labelled definition list elsewhere. Rule 7 asks for "a label, a
figure and one condition" per line. The content satisfies it; the markup does not signal it.

*Drop-in:* bold the leading noun phrase on each of the six lines to match the sibling pages
(`<strong>Auctioneer's commission:</strong>` etc.), and change the lead-in to
`Six lines, and they decide whether the route is worth it.`

**ADVISORY A10-3 — "The two dates do different jobs" shared with A1.** See A1-5.

**ADVISORY A10-4 — paragraph two is the promise-list shape.**
> `This page prices the route from your side of the room: the fees, the timetable, what the hammer commits you to, and one tax point that no auction guide covers.`

*Drop-in:* `Auction is the one way of selling where the day you are taxed and the day you get paid reliably fall in different months. Everything below follows from that.` (The next sentence already
says this; promoting it removes the list and loses nothing.)

---

### Pillar — `src/app/cost-of-selling-a-property/page.tsx` — must_fix

Q-headings at 10/10 (100% against a 30% floor) and "you" at 53.6 are the strongest structural
results in the batch. At-a-glance `<dl>` with label/figure/condition per row is the cleanest
execution of rule 7 anywhere in the wave, and every figure carries a named, dated source. No
statute, no em-dash, no persona, no pricing.

**BLOCKER PILLAR-1 — the terminal CTA is a consultation booking, not the calculator.**
> `<CTASection title="Selling something that is not your main home?" primaryLabel="Book free consultation" secondaryHref={CALC} secondaryLabel="Try the cost of selling calculator" />`

Rule 12: "The CTA is the cost-of-selling calculator, named, with what it returns and how long it
takes." The pillar's last CTA demotes the calculator to secondary. Partly mitigated — the hero's
primary button is `Work out your selling costs` → calculator, and the `#your-number` section names
the calculator correctly with both the output and the timing — so the page is not failing the rule
outright, but its final impression is the one shape the spec rules out. The spec is emphatic that
the pillar "should hand off to it in the winners' words".

*Drop-in:* swap primary and secondary — primary `Try the cost of selling calculator` → `CALC`,
secondary `Book free consultation`. Title stays; it qualifies the consultation correctly.

**ADVISORY PILLAR-2 — body prose is 2,351 words against a 2,400 floor.**
Measured on rendered `<p>` content plus the at-a-glance `condition` strings, excluding H2s, the
`links` rails, table cells and the FAQ block — the same convention the spec applies to blog
frontmatter. A 2% miss. Flagged because it is the only band miss in the batch, and *not* escalated
because hard rule 14 says "Do not chase word count" and names 1,005- and 1,477-word p1 pages.

*If it is closed at all,* close it in the `#probate` section, which is the thinnest on the page
(three paragraphs, no figure) and the only section whose child page carries a total this pillar does
not surface.

**ADVISORY PILLAR-3 — "Here is the whole bill on a £293,000 sale" is a near-clone of A13's table intro.**
> Pillar: `Here is the whole bill on a £293,000 sale, with the source and the vintage for every figure.`
> A13 `selling-a-probate-property`: `Here is your whole bill on a £290,000 sale.`

Two writers, same sentence, £3,000 apart. See BATCH-1.

*Drop-in:* pillar → `Every line of the bill on a £293,000 sale, with the source and the vintage for each figure.`

**ADVISORY PILLAR-4 — the negotiation tip runs three times on this page and matches A1 and A6.**
> Section `#at-a-glance`: `Get three quotes, ask for every fee including VAT in writing, and go into the conversation with a target rather than a hope.`
> Section `#negotiating`: `Get three quotes before you start, and mix local independents with the bigger chains. Say plainly that you have a cheaper quote elsewhere.`
> FAQ: `Get three quotes so you have something to push against, and say plainly that you have a cheaper quote elsewhere.`

The second and third are the same advice in the same words on the same page. See BATCH-5.

*Drop-in:* delete the FAQ sentence's second half and point it at the section:
`Get three quotes so you have something to push against. The section above has the target number and the timing.`

**ADVISORY PILLAR-5 — the boast is in the hero, inside the first 60 words.**
> `If the house has not been your own home throughout, there is a seventh line nobody else puts on the list.`
> and later: `That covers most sellers, which is why almost nobody prices this line.`

*Drop-in:* hero → `If the house has not been your own home throughout, there is a seventh line, and it is usually the biggest.`

---

## 4. Cross-batch fingerprints

Skim across all 14 surfaces (13 blog files + pillar), plus the calculator landing copy. Ranked worst
first. Counts are literal matches.

**BATCH-1 — "Here is the / what / your …" as the universal device lead-in. 15 instances across 12 of 14 surfaces.**
> `Here is the sort on a £300,000 sale…` (A1) · `Here is the shape of it before the detail.` (A3) ·
> `Here is the whole deal in six lines.` (A10) · `Here is what the London norm costs…` (A7) ·
> `Here is the same £300,000 sale run both ways…` and `Here is the price gap that cancels it out.` (A4) ·
> `Here is what you are choosing between` (A5) · `Here is the same £300,000 sale after tax relief.` (A2) ·
> `Here is your whole bill at a glance…` (A9) · `Here is how the arithmetic lands` (A8) ·
> `Here is the verdict.` (A11) · `Here is the comparison the builders' pages do not print.` (A12) ·
> `Here is your whole bill on a £290,000 sale.` (A13) · `Here is the whole bill on a £293,000 sale…` and
> `Here is the part that makes the rest of this page worth reading.` (pillar)

Only `can-you-sell-a-house-without-an-estate-agent` and `estate-agent-fees-for-renting` avoid it.
This is the batch's single most mechanical tic: thirteen writers reaching for one two-word frame
every time a table or a box arrives. Two pairs are effectively the same sentence
(pillar/A13 "whole bill on a £29X,000 sale"; A4/A2 "the same £300,000 sale").

*Drop-in — allocate one frame per surface and enforce it, e.g.:*
`Every line of the bill on a £293,000 sale.` (pillar) ·
`The sort, on a £300,000 sale of a former rental.` (A1) ·
`The arithmetic, in seven lines.` (A3) ·
`Six lines, and they decide whether the route is worth it.` (A10) ·
`The same £300,000 sale, run both ways.` (A4) ·
`After tax relief, the ranking holds and the gaps shrink.` (A2) ·
`The estate's bill on a £290,000 sale.` (A13)

**BATCH-2 — the "nobody else does this" boast. 27+ instances across 13 of 15 surfaces, 3 of them in an H1, title or the first 60 words.**
> `the Cost Nobody Compares` (A1 H1) · `the Tax Date Nobody Mentions` (A10 H1) ·
> `a seventh line nobody else puts on the list` (pillar hero) ·
> `the part no fee comparison runs` (A1) · `the part no fee comparison covers` (A7) ·
> `the part no other moving-cost guide does` (A9) · `one tax point that no auction guide covers` (A10) ·
> `The one nobody publishes is what the fee costs you after tax` (A6) ·
> `no fee comparison site runs them` (A3) · `Every DIY selling guide stops at completion` (A3) ·
> `The line nobody else gives you is the fifth one` (A13) · `the tax line nobody prices` (pillar meta) ·
> `Here is the comparison the builders' pages do not print` (A12)

Three surfaces use the near-identical noun phrase "the part no [X] [runs/covers/does]". No page in
the spec's measured winner set boasts about its own coverage; the spec's Do-Not-Copy section names
this register explicitly on W5. It also ages badly — the claim is unverifiable and becomes false the
moment a competitor adds the section.

*Drop-in — replace the boast with the substance it is standing in for. The differentiator is the arithmetic, so state the arithmetic:*
`the part that changes the number` (A1) · `When the tax falls due, and when you get paid` (A10 H1) ·
`there is a seventh line, and it is usually the biggest` (pillar) ·
`what the fee costs you after tax` (A6) · `the deduction the fee earns you` (A7).
Cap the batch at **one** boast total, on the pillar, where a hub claim is at least defensible.

**BATCH-3 — "This page [verb]s X, Y and [tax hook]" as paragraph two. 9 of 13 blog surfaces.**
> `Below you get the rate by model, the cash at three sale prices, what the agent must tell you before you sign, and the number to negotiate towards.` (A1) ·
> `What follows is the London picture in pounds rather than percentages… You get the price bands, the reason your borough is quoted differently…, and a number to negotiate towards.` (A7) ·
> `This page prices the route from your side of the room: the fees, the timetable, what the hammer commits you to, and one tax point…` (A10) ·
> `Then this page does the part no other moving-cost guide does.` (A9) ·
> `This page shows you how the builder gets to its number, what you can move, and what the whole thing does to your tax bill.` (A12) ·
> `This page gives you the sequence, tells you where it stalls, prices each stage, and shows you which of your costs come off the estate's gain.` (A13) ·
> `This page sets out what the fee buys and what the 56 days tie you to. It then covers who really pays, and what the route does to your tax bill…` (A11) ·
> `This page covers what you signed, what you pay to leave, and which of those payments come off your gain…` (A8)

Always three or four items, always terminating on the tax hook. Spec §4 on W4: "A promise list is
not an answer."

*Drop-in — replace the list with the page's sharpest single claim, which every one of these pages already has further down. A10 is the model:* promote the existing next sentence
(`Auction is the one way of selling where the day you are taxed and the day you get paid reliably fall in different months`) and delete the list. The same move works on A1, A11, A12 and A13.

**BATCH-4 — the calculator CTA sentence. "personalised breakdown" verbatim on 3 surfaces; the timing promise on 12 of 14.**
> `gives you a personalised breakdown of what your sale will cost, in under a minute` (A3) ·
> `gives you a personalised breakdown in under 60 seconds` (A6) ·
> `It gives you a personalised breakdown of your fees and what you would keep, in under a minute.` (A10) ·
> `gives you an itemised total in under a minute` / `It returns an itemised total in under a minute` (pillar, twice) ·
> `It gives you your full selling bill, and the share of it that comes off a taxable gain, in under a minute.` (A1) ·
> `you get the full breakdown in under a minute` (calculator intro)

The device is mandated (rule 12) and the timing promise is prescribed, so the *shape* is correct.
The problem is that the spec quoted W12's line and three writers reproduced its noun phrase. Also an
internal inconsistency: A6 says "60 seconds", eleven others say "a minute".

*Drop-in — keep the timing promise everywhere (it is the mandated part) and vary the named output, which is the part each page actually differs on:*
`your fees, and the share of them that comes off a taxable gain` (A1) ·
`what the sale costs on either route` (A3) ·
`the year's letting fees against the sale commission` (A6) ·
`your auction fees and what you would keep` (A10) ·
`an itemised total, commission first` (pillar).
Standardise on "in under a minute" batch-wide, including the calculator's own intro.

**BATCH-5 — the negotiation tip, recycled near-verbatim. 6 surfaces, 9 instances.**
> `Get three quotes, from a mix of local independents and larger chains, so you have something real to quote back. Say you hold a cheaper written quote elsewhere…` (A1) ·
> `Get three quotes and mix local independents with one chain.` (A6) ·
> `Get three quotes before you start, and mix local independents with the bigger chains. Say plainly that you have a cheaper quote elsewhere.` (pillar) ·
> `Get three quotes so you have something to push against, and say plainly that you have a cheaper quote elsewhere.` (pillar FAQ) ·
> plus `get three quotes` on A3, A2 and A9, and twice in the calculator copy.

And the paired follow-on:
> `if the rate will not move, negotiate your tie-in and notice period instead` (A1) ·
> `If the agent will not move on the rate, negotiate the tie-in period instead` (pillar, twice) ·
> `If the agent will not move on the headline rate, move them on the extras.` (A6)

Rule 10 mandates a target number or a script, so the *content* is required. The three-quotes script
being identical across six pages is not.

*Drop-in — give each page a different lever from the spec's own P5 list, so the batch covers the field instead of repeating one line:*
A1 keeps the three-quotes script (it is the fee head term) ·
pillar takes the timing lever it already half-states: `Push at the valuation, before you have said yes to anyone. That is the only moment three agents are competing for the same instruction.` ·
A6 takes the extras lever it already owns: `Ask them to waive the renewal fee and the mid term inspection for the life of the tenancy.` ·
A8 takes the tie-in lever. Delete the pillar FAQ's duplicate half outright.

**BATCH-6 — the "removals, storage, cleaning …" negative list, same items, same order, same mortgage tail. 9 of 14 surfaces.**
> `Not on the list: removals, storage, cleaning, and cosmetic work done to make the house show well. Mortgage redemption fees and early repayment charges are out too` (A1) ·
> `Removals, storage, cleaning, redecorating before the photographs and any early repayment charge on the mortgage are not costs of selling for tax.` (A3) ·
> `Removals, storage, cleaning, redecorating and any early repayment charge on your mortgage are not on that list and never come off the gain.` (A10) ·
> `Removals, storage, cleaning and mortgage exit fees are not allowable against the gain at all.` (A6 FAQ) ·
> `Out come removals, storage, cleaning, new carpets and the money you spent making the place look presentable. Mortgage interest and early repayment charges do not reduce the gain either.` (pillar)

A3 and A10 are nearly word-identical. The correction is the wave's central differentiator so it has
to appear on every page — this is mandated substance. The sentence should still not be a clone.

*Drop-in — vary the entry point, not the list. Lead with the item the page's own reader is most likely to have paid for:*
A10 → `The van, the storage unit and the skip are not on that list, and neither is the early repayment charge. None of them touches the gain.` ·
A3 → `You did the cleaning and the redecorating yourself, and neither counts. Nor does the removal van, the storage, or an early repayment charge.` ·
A6 → `Your exit costs are the exception: removals, storage and any mortgage exit fee get no relief at either end.`

**BATCH-7 — three byte-identical FAQ question strings across page pairs, all four pages in one category, all emitting FAQPage JSON-LD.**
> `"What is the difference between sole agency and sole selling rights?"` — A1 + A8
> `"Do you need a solicitor to sell a house?"` — A3 + A4
> `"Can you do your own conveyancing?"` — A3 + A4

Plus near-identical pairs: `"Can you list on Rightmove as a private seller?"` / `"Can you list on Rightmove yourself?"`
and `"What is form ID1 and why do you need it?"` / `"What is form ID1?"`. See A1-1 and A3-1 for the
per-surface fixes. This is a structured-data problem as well as an editorial one and should be
swept across all 13 before deploy, not just the pairs found here.

**BATCH-8 — the at-a-glance box terminal line labelled `Tax:`. 9 of 13 blog surfaces.**
> `<strong>Tax:</strong>` (A1, A3, A7, A8, A5) · `<strong>Your tax:</strong>` (A6) ·
> `<strong>What it does to your tax:</strong>` (A12) · `<strong>After tax on a taxable sale:</strong>` (A2) ·
> `<strong>The gain:</strong>` (A13)

Five are the identical string. The device is mandated and a tax line in the box is legitimate (it is
a flag, not the CGT block, so rule 13 is not breached). The identical label in the identical
terminal slot is the finding.

*Drop-in — label the line with what the tax does on that page, which differs every time:*
`Comes off the gain:` (A1) · `What the saving is worth after tax:` (A3) ·
`Deducted from rental profit:` (A6) · `Which tax year:` (A10) · `Off the estate's gain:` (A13).

**BATCH-9 — the fee-disclosure FAQ/H2 stem. 6 surfaces, near-identical.**
> `"What must an agent tell you about fees before you sign?"` (A1) ·
> `"What must an agent tell me about fees before I sign, and what if they do not?"` (A7) ·
> `"What must any agent tell you about fees before you sign?"` (A2) ·
> `"What must an agent tell me about fees before I sign?"` (A8) ·
> `"What is a letting agent legally required to tell me about fees before I sign?"` (A6) ·
> H2 `What must the auction house tell you before you sign?` (A10)

Mandated substance (it is the one duty the spec's own winner set cites), six copy-pasted questions.

*Drop-in — let one page own the question and have the others ask a page-specific version:*
A1 keeps the general form. A7 → `"What has to be in a London agent's fee quote before you sign?"` ·
A2 → `"Does a cheap agent have to disclose the same things as a high street one?"` ·
A8 → `"What must the contract say about the tie-in before you sign?"` ·
A6 → `"Where does a letting agent have to publish its fees?"` (which is A6's actual, different duty) ·
A10 → `"What must an auction house put in writing before you enter a lot?"`

**BATCH-10 — the redress-scheme paragraph. 8 surfaces, same three beats.**
Every instance runs: *must belong to an approved redress scheme* → *The Property Ombudsman and Property Redress* → *£1,000 penalty / ask which one*.
> `Every agent selling homes must also belong to an approved redress scheme, either The Property Ombudsman or Property Redress… an agent trading without it faces a £1,000 penalty.` (A1) ·
> `it has to belong to an approved redress scheme. On the sales side there are two: The Property Ombudsman and Property Redress. Ask which one, and check it. A firm operating without membership can be fined £1,000.` (A10) ·
> `two schemes currently operate: The Property Ombudsman and Property Redress. Ask your agent which one it belongs to` (A6)

*Drop-in — one page carries the full explanation and the rest carry one sentence pointing at it. A2 `cheapest-estate-agent-fees-uk` is the natural owner (it already has two dedicated FAQs on it). Everywhere else:* `Check the agent is in an approved redress scheme before you instruct — our guide to cheap agent fees explains why it matters most at the budget end.`

---

## 5. What is working, and should not be edited out

Recorded so the fixes above do not cost the batch its strengths.

1. **The statute rule is executed perfectly.** Zero hard references across five surfaces, with
   attribution done in plain words throughout. Against the `epc-certificate-cost-uk` baseline of 5.5
   per 1,000 words, this is the wave's clearest win.
2. **Question headings.** 80–100% of H2s on all five, against floors of 30–40%. The pillar's 10/10
   is the best result in the corpus.
3. **Sentence length and Flesch.** All five inside band, mean sentences 15.8–16.9 against a house
   precedent of 20.0–24.0. The register brief landed.
4. **Evidence discipline.** A10's refusal to invent an auction discount, A3's "Figure declined" table
   cells, A6's "Neither guide publishes an amount… That is your cue rather than a gap", and the
   pillar's "Both are positions rather than evidence" are all better than anything in the measured
   winner set. Keep every one.
5. **A3's Rightmove/redress contradiction argument** (a listing service cannot both sit outside the
   agency rules and put you on the portal) is genuinely original and is the page's best reason to
   rank.
6. **A6's letting-versus-selling relief split** is the sharpest original tax content in the batch and
   is correctly kept out of the cgt1 batch's territory.
