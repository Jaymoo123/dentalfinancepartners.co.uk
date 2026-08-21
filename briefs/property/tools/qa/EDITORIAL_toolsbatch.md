# EDITORIAL QA: Phase B tools batch (T1-T4)

Reviewer: editorial QA, harsh pass. Date 2026-08-21. Read first: `_language_spec.md`, `DOSSIER.md` §6-§8.
No files were edited. All quotes are verbatim from the working-tree versions.

Files under review:
1. `Property/web/src/lib/calculators/tools/buy-to-let-mortgage-calculator.ts` (T1)
2. `Property/web/src/lib/calculators/tools/rental-yield-calculator.ts` (T2)
3. `Property/web/src/lib/calculators/tools/rental-income-tax-calculator.ts` (T3)
4. `Property/web/src/lib/calculators/tools/buy-to-let-cashflow-calculator.ts` (T4)

---

## VERDICTS

- VERDICT buy-to-let-mortgage-calculator.ts: **must_fix**
- VERDICT rental-yield-calculator.ts: **must_fix**
- VERDICT rental-income-tax-calculator.ts: **must_fix**
- VERDICT buy-to-let-cashflow-calculator.ts: **must_fix**

Counts: **11 BLOCKER, 15 ADVISORY.**

None of the four fails on craft. All four are a large improvement on the measured "OURS" rows in
`_language_spec.md` §1. Every must_fix is either a spec rule breached in a countable way, a
keyword phrasing actively deleted by this batch, or four agents landing on the same sentence.

---

## 0. Measured compliance table (my regex, comparable across the four, not the spec author's script)

Body prose = intro + note + explainer + FAQs + workedExamples headings/inputs/steps.
Excludes name/metaTitle/metaDescription/ctaLabel, field `help`, row labels, `related` labels.

| | words | you/1k | we/1k | jargon/1k | Flesch | mean sent (all) | mean sent (ex-steps) | £ figs | em/en dashes |
|---|---|---|---|---|---|---|---|---|---|
| spec floor/ceiling | ≥450 | ≥25 | - | ≤6 | ≥55 | ≤17 | ≤17 | >0 | 0 |
| T1 mortgage | 1,284 | **46.0** | 0.0 | **0.0** | 69.0 | 16.1 | 14.3 | 62 | 0 |
| T2 yield | 1,181 | **47.4** | 0.8 | **0.0** | 76.2 | 18.5 | 17.2 | 45 | 0 |
| T3 income tax | 1,068 | **59.9** | 1.9 | 2.8 | 71.8 | 17.0 | 15.1 | 54 | 0 |
| T4 cashflow | 968 | **48.6** | 2.1 | **0.0** | 68.6 | 17.8 | 15.4 | 65 | 0 |

Spec §4 rules 1-6 all PASS on all four. Word floor cleared by 2-3x. Second person is now above the
best winner (landlordstudio 46.3). Jargon is effectively zero (T3's two hits are "allowance" and
"deduction", both load-bearing). `£` used throughout, no `GBP` literals.

Mean sentence over 17 on T2 (18.5) and T4 (17.8) is an artefact of long `workedExamples` steps
being counted as sentences; strip the steps (they render as list items, not prose) and both sit at
or under 17.2. Not raised as a finding.

**Em-dash / en-dash sweep:** `grep -P '[\x{2014}\x{2013}]'` over all four files returns zero hits.
The only non-ASCII characters present are `£`, `−` (U+2212 minus, in row values) and `→` (in
ctaLabel). Clean.

**Arithmetic audit:** I recomputed every literal figure in all four explainers, FAQs and worked
examples against each file's own `compute()`. All correct. 187,500 × 5.25% = 9,843.75; annuity at
r=0.004375, n=300 = 1,123.59; 1,250 / 1.45 = 862.07; 13,610 / 320,000 = 4.2531% → 4.3%;
320,000 / 13,610 = 23.51; 9,600 − 4,200 − 1,080 = 4,320; 17,400 − 3,960 = 13,440, 13,440 × 0.4 =
5,376, less 8,640 × 0.2 = 1,728 → 3,648; 4,800 / 75,000 = 6.4%, 1,152 / 75,000 = 1.5%. Nothing to
fix. This is the strongest part of the batch.

**Meta lengths (spec/CI 60/155):** T1 58 / 148. T2 49 / 148. T3 49 / **154**. T4 52 / 150. All PASS.
T3 is one character off the CI ceiling; if anything is ever appended it breaks the build.

**Rendered order verified** in `Property/web/src/app/calculators/[slug]/page.tsx`: h1 = `tool.name`
(line 72), then `intro`, calculator, `explainer.heading` as H2, "Worked examples" H2, "Frequently
asked questions" H2, "Related reading" H2, then the sitewide CTA. `openGraph.description` and
`twitter.description` are `tool.oneLiner`, **not** `metaDescription` (lines 32-33). That matters for
findings A10 below. T2's "the rental income tax calculator below" is accurate: Related reading does
render below the explainer. Verified, no finding.

**Register:** UK English throughout (`Annualise`, `instalments`; zero `-ize`/`-ization`). No
PropertyTaxPartners pricing anywhere. All four carry an honest `note`. No keyword-stuffed sentence
found on any of the four - every sentence I checked earns its place; the coverage findings below are
gaps, not stuffing.

---

## 1. BLOCKERS

### Cross-tool sameness (four agents, one voice)

**[BLOCKER] all four: the `intro` is the same two-sentence template.**

> T1: "Enter the price and the deposit you are putting in. **You get** the loan, the LTV and the monthly payment on both interest-only and capital repayment terms, side by side."
> T2: "Put in the price, the rent you charge and what the property costs you to run. **You get** the gross yield and the net yield side by side, plus the years of net income it would take to earn the price back."
> T3: "Enter your rent, your running costs and your mortgage interest. **You get** the tax on the profit, the credit you get back for the interest, and the cash you are left with."
> T4: "Enter the rent, the mortgage payment and the running costs. **You get** the cash the property leaves you each month and each year, before tax."

Why: `[Enter/Put in] the X, the Y and the Z. You get A, B and C.` four times out of four, in the
element that renders directly under the H1 and is the first prose a reader and a crawler see. Four
independently written pages reading as one generated page is exactly the Wave 11 failure mode. It
also only half-hits spec P1: the winner opens on the reader ("Our helpful calculator can help you
estimate..."), ours still opens on an imperative instruction with the reader arriving in sentence two.

Drop-in fix: keep one page on the template and rewrite three. Suggested:
- T2: "A 6% gross yield and a 4.7% net yield can be the same flat. Put in the price, the rent and what the place costs you to run, and this shows you both, plus how long the rent alone would take to pay the price back."
- T3: "Rent of £18,000 with £6,000 of mortgage interest leaves a higher-rate landlord £4,200. This works out your tax on the profit, the credit the interest earns back, and the cash you keep."
- T4: "Most landlords know the rent and the mortgage payment and have never put the two next to the running costs. Do that here and you get the cash the property leaves you each month, each year, and as a return on the money you put in."

---

**[BLOCKER] all four: the "N things" + sentence-fragment list fires seven times.**

> T1 explainer ¶3: "**Four things decide where your own deal lands.** How long you fix for. Your LTV, because lenders price in bands. Whether the arrangement fee is a percentage of the loan or a flat amount. **And** whether you borrow personally or through a company."
> T2 explainer ¶3: "**Two things sit outside the boxes above.** Empty weeks are the first..."
> T2 FAQ: "**Five things move the bar.** Where the property is, because a cheaper entry price lifts the percentage on its own. What type it is, since... **And** whether you want the income now or a bigger figure on the day you sell."
> T3 explainer ¶4: "**Two things this tool keeps simple**, so you know where the answer is soft."
> T3 FAQ: "**It turns on four things**, and you can move three of them. Your top rate of tax, because... **And** who owns the property, because..."
> T4 explainer ¶4: "**Four things move this number** more than anything else you can control. Voids, since one empty month costs you a twelfth of the year's rent... **And** tax, which is not in the figure at all."
> T4 FAQ: "**Four things set your own floor.** What the mortgage costs, because a return below your interest rate is not a return... **And** how much work the property is, because..."

Why: spec rule 10 mandates 3-5 named drivers after every "it depends", so the *content* is right and
the writers were following instructions. But all four reached for the identical surface form -
count + colonless fragment run + a final item starting "And" - and used it twice per page on three
of the four pages. It is also not what the winner does: provestor's five drivers are **labelled H3
blocks** (OCCUPANCY RATES, CAPITAL GAINS, RISKS, HOLDING PERIOD, INVESTMENT STRATEGY), which is
scannable; a fragment run is not. Seven identical constructions in ~4,500 words is the single
loudest templating signal in the batch.

Bonus tell: the construction has already leaked out of this batch. `capital-gains-tax-calculator.ts`
(CGT batch, not in scope) opens a paragraph "**Two things this capital gains tax estimator
deliberately does not model.**" against T3's "**Two things this tool keeps simple.**"

Drop-in fix: keep the count-plus-fragments form on at most two of the four (T1 explainer and T3 FAQ
read best). Convert the rest. For T2's "What counts as a good rental yield?" and T4's "What is a good
ROI on a buy-to-let?", the `GenericTool` FAQ answer is a plain string, so use an inline labelled run
rather than fragments: "Location sets the floor: a cheaper entry price lifts the percentage on its
own. Property type moves it next: a room-by-room let earns more and costs more to run. Then gearing,
then voids, then whether you want income now or a bigger number on the day you sell." Vary the
opener away from the count entirely on T4's explainer ¶4: "Voids do more damage than anything else on
this list. One empty month costs you a twelfth of the year's rent..."

---

**[BLOCKER] T2 + T4: twin FAQ, twin opening clause, same rhetorical move.**

> T2 FAQ "What counts as a good rental yield?": "**There is no single number, and anyone who hands you one has skipped the question of** what you are buying. Five things move the bar."
> T4 FAQ "What is a good ROI on a buy-to-let?": "**There is no single figure, and anyone quoting you one is guessing at** your cost of borrowing. Four things set your own floor."

Why: same question shape, same answer shape, same dismissal-of-the-other-guy opener, same count
follow-through, on two pages that link to each other and will be crawled together. A reader who
lands on both sees the trick.

Drop-in fix: rewrite T4's opener to lead with the number the reader can actually anchor on, since
T4 already has one. "Your own borrowing rate is the floor. A cash-on-cash return below what your
mortgage costs you is not a return, it is a subsidy. Above that, the bar is yours to set: what the
same cash would earn somewhere safer and quieter, whether you are buying for income or growth, and
how much work the property is, because a six-bed HMO returning 9% is a job rather than an investment."

---

**[BLOCKER] T3 + T4: the same sentence about the same thing.**

> T3 explainer ¶1: "**The calculator's own default figures show the whole sum.** Rent of £18,000 less £3,000 of running costs leaves a profit of £15,000."
> T4 explainer ¶1: "**The calculator's own defaults show the sum in full.** Rent of £1,200 a month, less a £600 mortgage payment, less £250 of other costs, leaves £350 a month."

Why: near-identical sentence, identical position (last sentence of the first explainer paragraph,
introducing the spec rule 3 literal arithmetic), identical function. Two writers, one sentence.
The rule-3 arithmetic itself is correct and welcome on both pages; only the hinge sentence is the
problem.

Drop-in fix: delete the hinge on T4 and run straight into the figures - "Take the rent, take off the
mortgage payment, then take off everything else the property costs you to run. £1,200 of rent, less
a £600 mortgage payment, less £250 of other costs, leaves £350 a month." Leave T3's as it stands.

---

### Spec breaches

**[BLOCKER] T1: a headline range with no source, stated twice, verbatim.**

> field `help` (line 85): "**Typical buy-to-let fixed rates through mid-2026 sit somewhere around 4.5% to 6%**, depending on the fix length, the LTV and whether the lender charges a percentage fee or a flat one."
> `note` (line 160): "**Typical buy-to-let fixed rates through mid-2026 sit somewhere around 4.5% to 6%**, so check what is actually on offer and put that number in."

Why: two breaches in one. (a) Spec rule 8: "Every headline percentage or average carries a named
source and a data-through date in the same sentence." "through mid-2026" is a date, but there is no
named source; the winner's comparator is "based on Zoopla's figure of an average buy-to-let property
at £270,045". A market rate range is exactly the figure that needs a name on it, and it is the one
number on the page that is not derived from the reader's own inputs. (b) The same 15-word clause
appears twice in one file - if the range ever moves, one of the two will be updated and the other
will not. Also note the triple hedge ("Typical... somewhere around... 4.5% to 6%") in a batch that is
otherwise disciplined about hedging.

Drop-in fix: name a source in the sentence and keep it in one place. `note`: "The rate is your input,
not a live quote. Buy-to-let two-year fixes averaged around 5.2% in the Bank of England's quoted
household interest rates series, data to June 2026, so check what is on offer at your LTV and put
that number in." Then cut the range from the field `help` down to a pointer: "This one is a knob, not
a quote. Check current deals and enter the rate you have actually been offered." Same treatment
applies to the three other unsourced market claims on the page ("A handful of lenders go to 80%",
"where the sharpest rates sit", "it is now how a large share of new buy-to-let lending is written") -
either source them or soften them out of headline position.

---

**[BLOCKER] T1: "BTL" now appears zero times on the page, and this batch is what removed it.**

> old metaTitle (HEAD): `"BTL Mortgage Calculator | Interest-Only vs Repayment"`
> new metaTitle: `"Buy to Let Mortgage Calculator | Interest-Only & Repayment"`

Why: `grep -c "BTL\|btl"` on the file returns **0**. The T1 pack carries `btl mortgage calculator`
1,900, `btl calculator` 390, `btl mortgage calculator uk` 140, `btl interest only mortgage
calculator` 90, `btl mortgage repayment calculator` 70, `btl calculator uk` 70, plus eight zero-vol
BTL tails - and the page's own equity register shows `btl mortgage calculator` at 21 impressions and
`btl interest only mortgage calculator` at **position 11.0, the single best Google position this
page holds on anything**. Swapping "BTL" out of the title for the unabbreviated head term is
defensible; deleting the abbreviation from the entire page is not. It is the only top-5-by-volume
phrasing in any of the four packs that has been made to disappear by an editorial choice.

Drop-in fix: put it back once, in prose, where it costs nothing. In the FAQ "How much can I borrow
on a buy-to-let mortgage?", open: "The rent decides it far more than your salary does. Lenders call
this the BTL rental cover test, and it works like this: a lender divides the rent by the interest at
its stress rate." Do not touch the metaTitle - the unabbreviated head term is the right call there.

---

**[BLOCKER] T2: the verb "calculate" appears nowhere on the page.**

> explainer heading: "How to **work out** the rental yield on a property"
> FAQ: "How do you **work out** the rental yield on a property?"
> metaDescription: "**Work out** the gross and net rental yield on a UK property..."

Why: `grep -io "calculat[a-z]*"` on the file returns only the noun `calculator` (in name, metaTitle
and `related` labels). The T2 pack's top-five by volume is `yield calculator` 2,900, `calculate rent
yield` **2,400**, `calculate rental yields` **2,400**, `rental yield calculator` 2,400, `how to
calculate rental yield` **1,000**. That is **5,800 of monthly volume on `calculate`-verb phrasings**
- more than the head term itself - with zero phrasing coverage anywhere on the page. The page went
all-in on "work out" (which does cover `how to work out a rental yield` 1,000 and `how to work out
property rental yield` 320) and left the larger synonym family entirely unserved. Peer positions on
the calculate-family are 11-16, i.e. beatable.

Drop-in fix: one FAQ carries it naturally without disturbing the "work out" coverage. Change the FAQ
question from "How do you work out the rental yield on a property?" to "**How do you calculate rental
yield on a property?**" and open the answer "To calculate the gross yield, take the monthly rent,
multiply it by twelve..." Leave the explainer heading on "work out" so both phrasings live on the
page. Optionally add "calculate" to the metaDescription: "Calculate the gross and net rental yield on
a UK property from the price, the monthly rent and your running costs. Free, and the arithmetic is
shown." (150 chars, still under 155.)

---

**[BLOCKER] T3: spec rule 7 breached four ways on one calculator page.**

> `note`: "You get a credit worth 20% of it instead (**rising to 22% from 2027/28**)."
> explainer ¶2: "**Section 24** swapped that for a flat credit worth 20% of the interest, whatever rate you pay."
> FAQ: "change the beneficial shares by deed, then declare them to **HMRC** on **Form 17** within 60 days."

Why: rule 7 is "**At most one statute reference per calculator page**, and only where it changes the
number the reader just calculated. No Act names, no Royal Assent dates, **no tax-year labels**, no
devolved-authority carve-outs on a calculator page. Those belong in the linked blog." §P7 names HMRC
explicitly as something the winners carry zero of across 2,149 words. T3 carries four: Section 24
(the one that is allowed, and it does change the number), a tax-year label `2027/28`, HMRC, and Form
17. Note the batch has already scrubbed one tax-year label from this page - the old metaTitle was
"Landlord Tax Calculator: Rental Income Tax **2026/27**" - so the rule was understood and then not
carried through the body. Facts themselves check out against house ground truth (reducer to 22% from
6 Apr 2027; Form 17 within 60 days of signing), so this is a placement problem, not an accuracy one.

Drop-in fix, three edits, keeps Section 24 as the one permitted reference:
- `note`: "...You get a credit worth 20% of it instead, **and that rises to 22% for rent you earn from April 2027**." (a date, not a tax-year label)
- FAQ "Does owning the property with my spouse cut the tax?": "Moving the split takes two steps: change the beneficial shares by deed, then **declare the new split on Form 17 within 60 days of signing**." (drops HMRC; Form 17 is the reader's next action, not a statute cite, and it is the thing they will search for)
- Leave "Section 24" in explainer ¶2 exactly as it is.

---

**[BLOCKER] T3: the batch deleted the page's joint-highest-volume phrasing.**

> old (HEAD): `name: "Rental Income Tax Calculator"`, `metaTitle: "Landlord Tax Calculator: Rental Income Tax 2026/27"`
> new: `name: "Tax on Rental Income Calculator"`, `metaTitle: "Tax on Rental Income Calculator | UK Landlord Tax"`

Why: the T3 pack's top three are `rent calculator` 1,600 (different intent, correctly not served),
`rental income tax calculator` **1,600**, `tax on rental income calculator` **1,600**, then `rental
income tax calculator uk` **1,000** and `uk rental income tax calculator` **1,000**. The rename
chases the pos-8 peer on `tax on rental income calculator` - a good call, the dossier adjudicates
that term to this page - but "rental income tax calculator" as a phrase now appears **nowhere** on
the page. It was in the H1 and the metaTitle before this batch, and the page's own equity register
shows `rental income tax calculator` at position 59.7 and `rental income tax calculator uk` at 59.0,
its two best positions. Only the slug carries it now. That is 2,600 of volume plus the page's best
existing positions traded for 1,600, when both fit.

Drop-in fix: put it in the metaDescription, which currently carries neither phrasing. Replace with:
"A rental income tax calculator for UK landlords. Enter your rent, costs and mortgage interest to see
the tax bill, the interest credit and your take-home." (150 chars.) Leave name and metaTitle alone.

---

**[BLOCKER] T4: the H1 and the metaTitle disagree about what the page is.**

> `name` (renders as the H1, page.tsx line 72): "Buy-to-Let Cashflow Calculator"
> `metaTitle`: "**Rental Property ROI Calculator** | Buy-to-Let Cashflow"

Why: the T4 pack is 17 keywords and **every single one is an ROI or return-on-investment phrasing** -
`property return on investment calculator` 140, `rental property roi calculator` 90, `rental roi
calculator` 90, `roi calculator for rental property` 90, and so on. The metaTitle now leads on the
head term, correctly. The H1 does not contain "ROI" or "return" at all. A searcher who clicks a
"Rental Property ROI Calculator" result lands on a page titled "Buy-to-Let Cashflow Calculator" -
that is a relevance mismatch on arrival and a title/H1 mismatch for the crawler, on the one page in
this batch whose entire keyword set hangs off a term the H1 omits. (ROI is well carried elsewhere on
the page: explainer H2, two FAQ questions, oneLiner. It is specifically the H1.)

Drop-in fix: `name: "Buy-to-Let Cashflow and ROI Calculator"`. Check the registry/nav rendering,
since `name` is also passed to `CalculatorPageResources` as `pageTitle` and is used in the
`/calculators` index card - four extra words is fine in both.

---

**[BLOCKER] T4: a headline figure presented as a general rule when it is one scenario.**

> FAQ "Is a cashflow-positive rental actually making money?": "**A higher-rate landlord clearing £4,800 a year in cash can hand £3,648 of it straight back.**"

Why: the £3,648 is arithmetically correct, but only for the exact split in workedExamples[1] - rent
£17,400, running costs £3,960, interest £8,640. The FAQ states it with only the £4,800 and the tax
band visible, so it reads as "higher-rate landlord + £4,800 cashflow ⇒ £3,648 of tax", which is
false: change the interest/costs mix and hold £4,800 of cashflow constant and the tax moves a long
way. This is precisely the spec's "headline numbers carrying their basis in the same sentence" test,
and it is the only place in the batch where a number is stranded from its basis. It is also the most
alarming number on the page (76% of the cashflow), so it is the one a reader will quote back.

Drop-in fix: put the basis in the sentence. "**On the second worked example below - £17,400 of rent,
£3,960 of costs and £8,640 of interest - a higher-rate landlord clears £4,800 in cash and hands
£3,648 of it back in tax.**" Or generalise honestly and drop the figure: "A higher-rate landlord with
a large mortgage can pay more tax than the property leaves them in cash, because the tax is worked out
on a profit figure the interest never came off."

---

## 2. ADVISORIES

**[ADVISORY] T1 + T2: "side by side" five times across two pages.**

> T1 oneLiner: "...interest-only and capital repayment **side by side**."
> T1 intro: "...on both interest-only and capital repayment terms, **side by side**."
> T2 oneLiner: "...you get the gross and the net rental yield **side by side**, with the arithmetic shown."
> T2 intro: "You get the gross yield and the net yield **side by side**, plus the years..."
> T2 explainer ¶3: "...be consistent when you hold two properties **side by side**."

Why: a stock phrase used twice per page in the two highest-visibility strings on each (oneLiner is
the OG/Twitter description, intro is the sub-H1 paragraph), then a third time in T2's body. Fix: keep
it in T1's oneLiner and T2's intro; replace elsewhere ("both numbers at once", "the two figures
together", "next to each other").

**[ADVISORY] T1 + T4: "treat it as X rather than Y", twice, both in FAQ answers.**

> T1: "**Treat it as** the shape of the answer **rather than** a quote."
> T4: "...so **treat it as** one of three numbers **rather than** the answer on its own."

Fix: T4 → "It is one of three numbers, and on its own it will mislead you."

**[ADVISORY] all four: the explainer closer is architecturally identical, and three of four route to the same destination.**

> T1: "**Does the deal still work once you have taken that off?** That is the number worth having before you decide whether to buy in your own name or through a company."
> T2: "**Happy with the yield and still unsure what you keep?** ... **Run the same property through the** rental income tax calculator below, and if the answer changes your mind about the deal, talk to us before you make an offer."
> T3: "**Wondering whether the company route would leave you better off?** ... Send us your figures and we will run both sides."
> T4: "**Want to know what the property leaves you after the tax?** **Run the same numbers through the** tax on rental income calculator, then send us both and we will tell you what the deal actually returns."
> T4 `note` (a fourth instance of the instruction): "**Run the same property through the** tax on rental income calculator before you judge the deal."

Why: spec rule 11 mandates "one question plus the next decision, in second person" and all four hit
it, so the pattern is correct and this is not a blocker. But the question-then-instruction rhythm is
identical four times, "Run the same property/numbers through the [tax] calculator" appears three
times, and all four pages pivot to tax as their closing move. A reader working through the cluster
gets the same exit four times.

Fix: vary two of the four openers off the participle/question form. T3 already differs usefully
(it closes on the company question, not tax). Change T4's `note` instruction so the explainer keeps
the only "run the same numbers through" on that page: note → "The tax is heavier than the cashflow
suggests, because your mortgage interest is not taken off before the tax is worked out."

**[ADVISORY] all four: the "X, not Y" antithesis is the batch's default cadence.** 17 "rather than"
constructions across the four files (T1 5, T4 5, T2 4, T3 3), on top of the "not a quote" /
"not a view on" / "not a cost line" family. Representative twins:

> T2: "the yield tells you whether the property can carry itself while you wait, **not** whether it was a good buy."
> T4: "**It tells you** how good the asset is **rather than** how good your deal is."
> T1 `note`: "This is an estimate for comparison, **not** a quote or an offer of finance."
> T3 `note`: "...and this is an estimate **rather than** a filed return."

Why: individually each is fine and several are load-bearing. Collectively it is a recognisable
authorial tic and it is the same tic on all four pages. Fix: cut roughly a third, favouring the
ones in closing position where the rhythm is most audible.

**[ADVISORY] T1: the H1 and the body disagree on hyphenation.**

> `name` (H1): "**Buy to Let** Mortgage Calculator" (changed from "Buy-to-Let Mortgage Calculator" in this batch)
> body prose: "**buy-to-let**" 15 times, "Buy-to-let" 3 times

Why: the unhyphenated H1 is a deliberate exact-match play on the 22,200 head term and I would keep
it, but the reader sees "Buy to Let Mortgage Calculator" as the H1 and "buy-to-let" everywhere below
it, and every other page in the cluster labels this link "Buy-to-let mortgage calculator". Fix: leave
the H1; make the intro's first mention unhyphenated too so the transition is not jarring, or accept
it and note the deliberate split in the file's header comment (which already documents the other
structural calls).

**[ADVISORY] T1: metaTitle separator/ampersand is out of step with the other three.**

> T1: "Buy to Let Mortgage Calculator **|** Interest-Only **&** Repayment"
> T2: "Rental Yield Calculator**:** Gross **and** Net Yield (UK)"

Why: T1 and T3 use `|`, T2 uses `:`, T4 uses `|`; T1 is the only one using `&` where the others spell
"and". Trivial, but it is the sort of drift that makes a cluster look assembled. Fix: "Buy to Let
Mortgage Calculator | Interest-Only and Repayment" (60 chars exactly - check against the CI limit
before committing, or use `:` to save two).

**[ADVISORY] T4: "actually" four times in 968 words, including in an FAQ question.**

> FAQ question: "Is a cashflow-positive rental **actually** making money?"
> explainer ¶2: "the figure you divide by is the cash you **actually** put in"
> explainer ¶4: "we will tell you what the deal **actually** returns"
> FAQ: "Use whatever **actually** leaves your account"

Why: 4.1 per 1,000 words of a filler intensifier the spec's "do not copy" section implicitly targets.
Two are load-bearing (the cash you actually put in; whatever actually leaves your account); two are
not. T1 has three, of which "because those are the two numbers you actually know" is the weakest.
Fix: T4 FAQ question → "Is a cashflow-positive rental making money after tax?" (also better keyword
shape). T4 explainer ¶4 → "we will tell you what the deal returns."

**[ADVISORY] T2: page self-reference, twice, in the same construction.**

> explainer ¶1: "**On the figures this page opens with**: £1,250 x 12 = £15,000 a year."
> FAQ: "**On the figures this page opens with**, gross is 6.0% and net is 4.7%."

Why: mild meta-commentary, repeated verbatim. Fix: second instance → "On a £250,000 flat at £1,250 a
month, gross is 6.0% and net is 4.7%" - which also gives the FAQ answer its own figures instead of
making the reader scroll.

**[ADVISORY] T2: "buy-to-let" appears nowhere in T2's prose surfaces.** It survives only in `related`
link labels (lines 258-263). The previous metaTitle was "Rental Yield Calculator (Gross & Net) | UK
**Buy-to-Let**" and this batch removed it. T2's equity register carries `buy to let yield calculator`
29 imp, `buy to let calculator yield` 13 imp, `buy to let rental yield calculator` 6 imp - 48
impressions, the page's second-largest cluster after the head term. Pack volume on those phrasings
is low (50 vol each), so this is an advisory not a blocker. Fix: one natural mention in the explainer,
e.g. ¶1 "...the only fair way to compare a buy-to-let flat in Leeds with a terrace in Cardiff."

**[ADVISORY] T3 + T4: the `oneLiner` is a noun fragment, not a sentence - and it is the OG description.**

> T3: "How much tax you pay on your rental income, what the mortgage interest credit gives back, and what you keep."
> T4: "The cash a rental leaves you each month and each year, and the return that cash makes on the money you put in."

Why: both are verbless noun-phrase lists. T1's and T2's are full sentences. `page.tsx` lines 32-33
push `oneLiner` into `openGraph.description` and `twitter.description`, so these are what a shared
link renders. Fix: T3 → "See how much tax you pay on your rental income, what the mortgage interest
credit gives back, and what you keep." T4 → "See the cash a rental leaves you each month and each
year, and what that cash returns on the money you put in."

**[ADVISORY] T4: `ctaLabel` is a promise, in a batch whose dossier mandates honest framing.**

> "Make your portfolio more profitable →"

Why: DOSSIER §2, "honest framing mandatory (experiments with stated expectations, not promised wins)"
is about the programme rather than the CTA, but this is the only CTA of the four that promises an
outcome. The other three ask a question or name an action ("Check the tax on the rent", "Reviewing a
property deal? Talk to us", "Want to pay less tax on your rentals?"). Spec P6 wants the CTA to be
"the next question, asked in the reader's voice". Fix: "Not sure the deal works after tax? →". Note
this string predates the batch - it is unchanged from HEAD - so it may be out of scope.

**[ADVISORY] T2: "two landlords" twice in one file.**

> explainer ¶5: "**Two landlords** holding the same 4.7% can end the year with very different amounts, depending on their tax band and how much they borrowed."
> FAQ: "**Two landlords** can own identical flats at the same yield and see very different returns, because one of them tied up a quarter of the capital the other did."

Same subject, same "can ... very different" frame, ~700 words apart. Fix: recast the FAQ one as a
single concrete pair ("Buy a £250,000 flat with £250,000 of your own money and one with a £62,500
deposit, and the yield is identical while the return on your cash is not.").

**[ADVISORY] all four: tool self-reference is dense.** "The calculator's own default figures" (T3),
"The calculator's own defaults" (T4), "Two things this tool keeps simple" (T3), "This calculator
floors the tax at zero" (T3), "the calculator turns the annual number into" (T4), "the calculator
flags it as negative" (T4), "Empty weeks are not a field here" (T2), "the mortgage interest box is
optional" (T2), "Two things sit outside the boxes above" (T2). The winners do some of this
(landlordstudio quotes its own field names), and the honesty framing requires some of it, so this is
not a rule breach. But nine instances across four pages, several of them within two sentences of each
other, reads as the pages talking about themselves. Fix: trim the ones that carry no information
("The calculator's own defaults show the sum in full" - already flagged as a blocker for a different
reason - and "Two things this tool keeps simple, so you know where the answer is soft", which can
become "Two places where the answer here is softer than it looks.").

**[ADVISORY] T3: the "Two things this tool..." construction is now shared with a file outside this batch.**

> T3: "**Two things this tool keeps simple**, so you know where the answer is soft."
> `capital-gains-tax-calculator.ts` (CGT batch): "**Two things this capital gains tax estimator deliberately does not model.**"

Why: the house honest-note template is spreading across clusters, which is how a whole calculator
family ends up sounding generated. Not a Phase B blocker; flagging so the next batch varies it.

**[ADVISORY] template H2s are outside the writers' control.** The rendered page emits four H2s, of
which only `explainer.heading` is writer-controlled; "Worked examples", "Frequently asked questions"
and "Related reading" are hardcoded in `page.tsx`. Spec rule 12 ("Every H2 must be a query or a
claim") therefore cannot be satisfied by copy alone. The resulting question-heading ratio is 1/4 to
2/4 depending on the page, which is inside the winner range (9-50%), so no action is needed - but the
rule should be rewritten as a template rule, not a writer rule, before the next cluster is briefed.

**[ADVISORY] T1 explainer heading is a statement where the query is a question.** "How a buy-to-let
mortgage payment is worked out" vs T3's "How much tax do you pay on rental income?" and T4's "How do
you work out cashflow and ROI on a rental property?". Spec P2 wants the heading to be the query with
the entity in it; T1's has the entity but not the question form, and T1's pack has no "how" queries
of consequence, so this is presentation only. Fix if convenient: "How is a buy-to-let mortgage payment
worked out?"

---

## 3. Explicitly checked and clear

- **Em-dashes / en-dashes:** zero in all four (U+2014 and U+2013 both swept).
- **"genuinely" / "simply":** zero occurrences in all four. The spec's quoted "Gross yield is simply
  the annual rent divided by..." has been removed.
- **Keyword-lists-as-prose / stuffing:** none found. No FAQ or sentence exists only to hold query
  variants. The four metaDescriptions all read as prose. This is the check the batch passes most
  convincingly, and it is the one cruseburke fails ("7 of 7 H2 headings contain 'Property Tax
  Calculator' verbatim").
- **Meta-commentary about competitors:** zero. No "most calculators", "other guides", "unlike other
  tools" anywhere. The only self-reference is to the page's own fields and defaults (advisory above).
- **Spec rule 3 (one line of literal arithmetic per page, in the explainer, on that page's own
  defaults):** PASS on all four, and correct on all four. T1 "£187,500 x 5.25% = £9,844 of interest a
  year, and £9,844 divided by 12 is £820 a month"; T2 "£1,250 x 12 = £15,000 a year. £15,000 /
  £250,000 x 100 = 6.0% gross yield"; T3 "Rent of £18,000 less £3,000 of running costs leaves a profit
  of £15,000"; T4 "Rent of £1,200 a month, less a £600 mortgage payment, less £250 of other costs,
  leaves £350 a month." This was the §P4 gap and it is closed.
- **Spec rule 13 (no FAQ under 25 words, no bare yes/no):** PASS. Shortest answers are T1 80w, T2 76w,
  T3 65w, T4 64w. The two yes/no-shaped questions both answer substantively ("Yes, and it is now how a
  large share of new buy-to-let lending is written..."; "Not as a cost, no. You add the full profit to
  your income first...").
- **Spec rule 14 (one page, one head term):** PASS. T3 correctly declines to serve `rent calculator`
  (1,600) and the pro-rata/weekly-monthly rent-conversion tail, which is a different tool. T1 carries
  "loan to value" and "LTV" as prose without building an LTV-calculator section. No page contains a
  section that would rank for a different calculator.
- **Spec rule 7 on T1, T2, T4:** PASS. T1 carries exactly one statute reference ("It earns a
  basic-rate credit instead under Section 24") and it does change the number just calculated. T2
  carries zero. T4 describes the interest-credit mechanic without naming it. Only T3 breaches.
- **Honest notes:** present on all four, and all four are genuinely honest rather than boilerplate.
  T2's is the best in the batch: "The amber flag means one thing only: your running costs are taking
  more than half the rent. It is not a view on whether the yield is good for the area."
- **PTP pricing:** none.
- **UK English:** clean. `Annualise`, `instalments`; no `-ize`/`-ization` forms.
- **Ground-truth spot checks:** T3's 22% reducer from April 2027 matches house ground truth. T3's
  Form 17 "within 60 days" is correct. T3's property-allowance-vs-interest-credit exclusivity is
  correct. T1's ICR levels (125% company/basic, 145% higher) match the constants in `compute()`.
- **Related-links accuracy:** T2's "the rental income tax calculator **below**" is true - Related
  reading renders below the explainer in `page.tsx`. Verified, not assumed.

---

## 4. Fix-round priority

If only the blockers are worked, do them in this order - the first four are the ones a reader
notices, the last seven are the ones a crawler notices:

1. T1 unsourced 4.5%-6% (twice) - the only unsourced headline number in the batch.
2. The four `intro`s - highest-visibility templating, cheapest fix.
3. T3 statute/tax-year breach - the one hard spec-rule violation.
4. T2/T4 twin "no single number/figure" FAQ + T3/T4 twin "calculator's own defaults" sentence.
5. The seven "N things" constructions - reduce to two.
6. T2 "calculate" coverage (5,800 vol).
7. T3 "rental income tax calculator" coverage (2,600 vol, deleted by this batch).
8. T1 "BTL" coverage (1,900 vol + the page's best position).
9. T4 H1/metaTitle head-term mismatch.
10. T4 £3,648 basis.
