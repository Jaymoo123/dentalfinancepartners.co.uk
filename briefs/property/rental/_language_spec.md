# Property rental-income cluster: answer-pattern spec

Measured 2026-08-21 from live HTML. Winner set = top-10 density in the rental harvest
(`briefs/property/_competitor_rental_keywords_2026-08-21.json`), not brand impression.
Prose only: nav, header, footer, cookie banner, countdown timer, related-post loops,
sitewide CTA blocks and global lead-magnet blocks are excluded. Table cells are excluded from
word, sentence and readability stats on every row, so tables are counted separately.

**This is a blog cluster. The `briefs/property/tools/_language_spec.md` targets do NOT transfer.**
Three of its rules are actively wrong here and are killed by measurement below.

## 1. The measured table

| Page | Words | Mean sent. | Flesch | Q-headings | "you"/1k | "we"/1k | Statute/1k | Jargon/1k | £/1k prose | £ in tables | Tables | FAQs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **W1** uklandlordtax `/tax-on-rental-income/` (pos 3 on 1,300; pos 8 on 1,300; pos 2-6 rate family) | 814 | 24.6 | **61.6** | 1/5 | **43.0** | 2.5 | **1.2** | 7.4 | 22.1 | 55 | **7** | 1 |
| **W2** uklandlordtax `/allowable-expenses-against-rental-income/` (pos 2 on 320; 12 top-10 kws) | 1,092 | 21.0 | 43.6 | 1/18 | 24.7 | 6.4 | **0.9** | **35.7** | 0.0 | 0 | 0 | 1 |
| **W3** landlordstudio `/uk-blog/a-landlords-guide-to-tax-on-rental-income` (pos 5-9, how-much family) | **4,084** | 18.8 | 55.6 | 22/36 | **47.0** | 1.2 | 3.9 | 17.4 | 16.4 | 22 | 4 | **22** |
| **W4** ukpropertyaccountants NI post (pos 9 on `national insurance on rental income` 1,300) | 1,710 | 25.7 | 41.1 | 3/8 | **9.4** | 0.6 | 3.5 | 7.6 | 7.6 | 5 | 1 | 5 |
| **Winner median** | 1,401 | 22.8 | 49.6 | 29% | 33.9 | 1.9 | **2.4** | 12.5 | 12.0 | 14 | 2.5 | 3 |
| OURS `rental-income-tax-uk-complete-guide-landlords` (Bing 2-10 on family) | 2,027 | 25.6 | 47.2 | 3/12 | 23.2 | 5.4 | **9.9** | 22.2 | 19.7 | 22 | 4 | 12 |
| OURS `landlord-tax-deductions-uk-2026-complete-list` | 2,833 | 25.3 | **39.0** | **0/20** | 21.9 | 3.5 | **10.9** | 30.4 | 16.2 | 0 | 1 | 14 |
| OURS `how-much-tax-rental-income-uk-complete-guide` (invisible) | 1,663 | 18.7 | 54.9 | 8/15 | 36.7 | 2.4 | **11.4** | 19.8 | 38.5 | 68 | 6 | 13 |
| *contrast* cruseburke `/how-to-avoid-paying-tax-on-rental-income/` (pos 78-93, same queries) | 587 | 16.9 | 58.8 | 3/8 | **59.6** | 8.5 | 0.0 | 13.6 | 1.7 | 0 | 0 | 3 |

Secondary counts (same extraction):

| Page | Scotland / devolved | Act names | "Royal Assent" | HMRC manual refs | Source lines under tables | Em-dashes | Named worked examples |
|---|---|---|---|---|---|---|---|
| W1 | 0 | 0 | 0 | 0 | 0 | 0 | 4 |
| W2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| W3 | 0 | 0 | 0 | 0 | 1 | 5 | 0 |
| W4 | 0 | 2 | 0 | 2 | 1 | 0 | 0 |
| OURS head | **5** | **7** | 1 | 0 | **0** | 0 | 0 |
| OURS deductions | 2 | **6** | 1 | 2 | **0** | 0 | 0 |
| OURS invisible | 0 | **5** | 1 | 1 | **0** | 0 | 4 |

Jargon-noun list (same list as the tools spec, restated for repeatability): allowance(s),
apportionment, chargeable, compliance, deduction(s)/deductible, disposal(s), exemption,
expenditure, gearing, incorporation, jurisdiction, leasehold, legislation, liability/liabilities,
licensing, obligation(s), provision(s), reducer, relief(s), restructuring, statute/statutory,
surcharge, supplement, threshold(s), taxation, treatment, valuation, allowable, consideration,
accrual(s), levy, remuneration, deferral, regulation(s).

**The one gap that is consistent across all three of our pages: statute density, 9.9 to 11.4
against a winner median of 2.4 and a winner maximum of 3.9.** Nothing else separates us on all
three. Everything else in the table is a per-page problem, listed in section 4.

**Three tools-cluster rules that measurement kills here. Do not carry them in.**
1. *"Jargon nouns at or below 6 per 1,000."* W2 runs **35.7**, the highest of any page measured,
   and owns 12 top-10 keywords including position 2 on the head term. Jargon is not a lever in
   this cluster. Write plainly because it reads better, not because it ranks.
2. *"Second person at or above 25 per 1,000."* The **worst** page measured (cruseburke, positions
   78-93) has the **highest** second-person rate of anything in the set at 59.6, and W4 ranks
   position 9 on a 1,300-volume term at 9.4. Necessary condition at best, never the mechanism.
3. *"Word-count floor."* W1 wins the head term on 814 words of prose; W3 wins the question family
   on 4,084. A 5x spread inside the winner set means depth is not the variable.

**Sufficiency caveat, stated so nobody over-claims.** Our invisible page is the closest match in
the set to W3's register (Flesch 54.9 vs 55.6, sentence 18.7 vs 18.8, 53% question headings, four
named worked examples, 68 pound-figures in tables) and it is still invisible. Language is a floor,
not the cause of the ranking gap. Fixing register on a page with a positioning or coverage problem
will not move it.

## 2. Answer patterns

**P1. The first sentence restates the query and answers it in one word.**
Them (W3): "Do landlords pay tax on rent? The simple answer is yes."
Them (W1, sentence two): "The actual tax on rental income will be either nothing, 20%, 40% or 45%
of the taxable profit depending on the amount from your other sources of income."
Them (W4, under its first H2 "Do Landlords Presently Pay National Insurance on Rental Income?"):
"No." Full stop, then the reason.
Us (head page): "Rental income tax is straightforward in principle and awkward in practice."
Us (invisible page): "If you let property and pay higher-rate tax with a mortgage on it, the rate
you actually pay on the cash you keep is almost certainly not the 40% you would guess."
Both of ours open on a thesis about the topic. The second one withholds the number deliberately as
a tease. W1 gives the four possible answers in its second sentence and then spends the rest of the
page proving them. First pound-figure lands at word 53 on W3 against words 138-211 on ours.

**P2. A worked example is a named person with an age, a salary and two tables.**
Them (W1): "Mr Palin is aged 35 and is employed with a salary of £30,000 per annum. He has one
rental property on which the rental income and expenses are as follows:" then a table of rent and
overheads, then "His tax would be worked out as follows:-" and a second table running PAYE income,
rental income, personal allowance, tax at 20%, tax already paid at source, the mortgage-interest
credit and net tax payable. Four of these on one page: Miss Jones, Mr Palin, Mr Short, Mr Edwards,
one per band. Then the payoff sentence in plain money: "In the above case, his tax bill has
increased by £1,600."
Us (head page): one worked example, presented as a comparison table of "Old rules (pre-2017)"
against "Section 24 (now)" with no person attached to it.
Us (invisible page) already does this correctly with Anna, Ben, Carla and David. Port that shape to
the head page, not the other way round.

**P3. The band structure becomes the heading, with the number in it.**
Them (W1): "20% Tax if your total income is less than £50,270", "40% Tax if your income is between
£50,270 to £150,000", "45% Tax if your income is more than £150,000", "0% tax if you have no other
income". The heading is the answer, so the H2 list alone answers "what rate do I pay".
Us (head page): "How is rental income taxed in the UK?" then a rates table underneath.
Us (deductions page): "Professional Fees, Advertising and Management", "Finance Costs and
Section 24". Noun labels, zero question headings out of twenty, no figure in any of them.
W1 holds positions 2 to 6 on the entire `what is the tax rate for rental income` family with five
headings. Our deductions page holds none of that family with twenty.

**P4. Rate tables carry a tax-year label in the heading and a source line underneath.**
Them (W3): heading "Rental Income Tax Rates 2024/25", table, then "Source: Gov.uk Income Tax Rates".
Them (W4): a two-column before-and-after table (Before 6 April 2027 / From 6 April 2027) with four
rows and a single-figure payoff: "In other words, you pay £600 more tax each year because of the new
property income tax rates."
Us: eleven tables across the three pages, **zero source lines and zero data-through dates**.

**P5. Statute is a decision aid, cited once, inside a sentence about what to do.**
Them (W4, the only winner that cites an Act at all): "The partnership incorporation route under
FA 2003 s.65 can mitigate the SDLT charge where a genuine partnership exists first, but it is
fact-specific and HMRC scrutinises it closely."
Us (head page): "the finance-cost tax reducer rises in step from 20% to 22% (FA 2026 Sch 1,
amending ITTOIA 2005 ss.274AA and 274C and ITA 2007 s.399B)."
Us (head page again): "the unified rates under TCGA 1992 s.1H, as substituted by Finance Act 2024".
Theirs names one provision and then tells you what it does to your decision. Ours are parenthetical
citation chains that no landlord will follow and that push statute density to 4x the winner median.

**P6. The FAQ block is a second, denser page and every answer carries a figure.**
Them (W3): 22 FAQ headings, each answered in 35 to 55 words, each with a number in it.
"How do I calculate rental income tax? Calculate gross rental income (all rent and payments
received), subtract allowable expenses to get net profit, add this to other income, then apply your
tax band. Example: £18,000 rent - £6,000 expenses = £12,000 profit. At 20% rate = £2,400 tax owed."
That block is what holds positions 5 to 9 across `how much tax do i pay on rental income`,
`how much tax will i pay on rental income`, `do landlords pay tax on rent` and six more.
Them (W2) uses the same accordion mechanism with **noun-label titles instead of questions**:
"Finance costs (restricted for most residential properties)", "Replacement of Furniture and White
Goods", ten in a row, one per expense. That page owns `allowable expenses rental income` at
position 2. Both shapes work. What both have is one entity per item and an answer that stands alone.
Ours: 12 to 14 FAQs per page, comparable count, so this is a quality check rather than a volume gap.

**P7. Second person carries the mechanics, and the winner does it at twice our rate on the same
query family.**
Them (W1, 43.0 per 1k): "If you have other income from either employment, self-employment or
savings and investments but which together with the taxable income from letting a property comes to
less than £50,270 you will pay tax at 20% on the taxable income from the property."
Us (head page, 23.2 per 1k, same point): "That profit is added to your salary, pension, dividends
and any other income, and the combined figure is taxed through the bands. So the rate on your rental
profit depends on your total income, not on the rent in isolation. A retiree with a small pension
and one let pays basic rate on most of it; the same rent in the hands of a higher earner is taxed at
40% or 45%."
Theirs keeps the reader as the grammatical subject for the whole sentence. Ours switches to a third
person ("a retiree", "a higher earner") exactly where the number lands.

**P8. The CTA is a question heading, one named service, and the reason it beats guessing.**
Them (W4): heading "Is It Time to Explore Property Incorporation?" then "At UK Property Accountants,
our property incorporation review models the full tax impact of holding your portfolio personally
versus through a company, so you can decide with figures, not headlines."
Them (W1): "If you don't have a tax adviser yet who handles all of your landlord-related tax queries
then please feel free to get in touch on 0800 907 8633, via tax@fixedfeetr.com or via our online
contact form." Phone and email in the body prose, at the end of the last worked example.
Them (W1) then hands off to reading in a question: "If you found this article informative, then why
not read all about property income allowance or how to avoid inheritance tax on a property next?"
Us (head page): heading "When professional advice pays for itself", a five-bullet qualifier list,
then "You can read more on our services page or get in touch through the form below."
Ours names no service, asks no question, and defers to a form the reader has to scroll to find.

**P9. What the winners leave out, counted.**
Across 7,700 words of winner prose there are **zero** mentions of Scotland, Wales, Northern Ireland
or any devolved rate, **zero** uses of "Royal Assent", and **zero** effective-date qualifiers
attached to a rate. W1 does not name a single Act. W3 does not name a single Act across 4,084 words.
Our head page carries five devolved-nation carve-outs and seven Act names in 2,027 words.
They also leave out: audience lists, "this guide will cover" scaffolding (W3 is the exception and it
is the weakest paragraph on the page), and pipeline hedging of the "rules change often, check before
you file" kind that closes our deductions page.

## 3. Do not copy

**cruseburke** `/how-to-avoid-paying-tax-on-rental-income/`, positions 78 to 93 on the same
query family as W1 and W3.
- Opens by talking about itself, not the query: "Many of our customers (especially landlords) often
  ask this question."
- Not UK tax. "You can claim up to 30% as a Standard Deduction without considering its renovation
  and maintenance" and "Do indexation to decrease capital gains" are Indian rules; indexation has
  not applied to individuals since 2008. "Your property size is less than 5000 square meters" is not
  a UK CGT test.
- "You can benefit from the lower tax slab if your wife is a working woman." Wrong register, wrong
  vocabulary ("tax slab"), and it is the only sentence in the set that assumes a reader's household.
- One pound-figure in 587 words on a tax page, and it is wrong in presentation: "£ 1,000".
- Headings are the query with a question mark bolted on, then numbered labels with trailing colons:
  "1. Own a property Jointly:", "2. Municipal Taxes:", "4. Furnished Property:".
- Highest second-person rate measured anywhere (59.6/1k) at the worst position measured anywhere.
- Closes on a disclaimer and a hedge: "This is not financial advice you should rush for."

**Also do not copy, from the winners themselves.**
- **W1's staleness.** It still says "(2022-23)", still uses a £150,000 additional-rate threshold
  abolished in April 2023, and still writes "worse off than before 2021". It ranks 3 on a
  1,300-volume term anyway. Staleness is evidently survivable for them and is still a factual defect
  we do not ship. Take its structure, never its figures.
- **W3's contradictions.** It carries two overlapping rate tables (a "2024/25" heading over a table
  of 2023-24 and 2024-25 columns, then a separate 2025/26 table) and states CGT at "18% ... or 28%"
  in the body while its own FAQ says "18% ... 24%". One current-year table per page, one figure per
  fact.
- **W3's five em-dashes and its product promo mid-answer** ("using a digital system like Landlord
  Studio will not only allow you to..."). Standing house rule wins.
- **W2's typos** ("Any building servey costs"). Their bar is not ours.

## 4. Hard rules for writers in this cluster

Standing (all clusters): zero em-dashes; UK English; no PropertyTaxPartners pricing on page. Three
of the four winners use zero em-dashes, so this is table stakes rather than an edge.

Cluster-specific, from the measurements above:

1. **Statute density at or below 4 references per 1,000 words** (winner max 3.9; ours 9.9-11.4).
   Count Act names, section numbers, HMRC manual codes and "Royal Assent" together.
2. **At most one Act citation per page**, inside a sentence that tells the reader what to do about
   it. No parenthetical amendment chains. Never "(FA 2026 Sch 1, amending ITTOIA 2005 ss.274AA and
   274C and ITA 2007 s.399B)".
3. **No "Royal Assent", no enactment dates, no "this is enacted law, not a proposal".** State the
   rule and the date it starts applying.
4. **No devolved-nation carve-out unless the page is about Scotland or Wales.** Zero winners carry
   one. If the carve-out genuinely changes the reader's number, it is a linked page, not a clause.
5. **The first sentence restates the query and answers it.** One-word or one-figure answer, then the
   qualification. First pound-figure or percentage inside the first 60 words.
6. **Every rate or band table carries the tax year in its heading and a "Source: X, data to
   <month year>" line underneath.** Currently 0 of our 11 tables do.
7. **At least one named worked example per page** with a person, an income, a rent, an expense
   figure, a computation table and a one-sentence payoff in plain money ("that is £600 more tax each
   year"). The invisible page is the model; the head page is not.
8. **Mean sentence at or below 22 words, Flesch 45 or higher** (winner medians 22.8 and 49.6). The
   deductions page at 25.3 and 39.0 is outside the winner range on both.
9. **Every H2 either asks the reader's question or states the answer with its number in it.** Zero
   bare noun-label H2s. The deductions page currently has twenty.
10. **Second person is the grammatical subject wherever a number lands.** No switching to "a
    retiree" or "a higher earner" at the point of the figure.
11. **Every FAQ answer 25 words or more and contains a figure.** No bare yes/no.
12. **The in-body CTA is a question heading plus one named service plus the reason it beats
    guessing.** No "when professional advice pays for itself", no qualifier bullet lists, no
    "get in touch through the form below" as the page's last move.
13. **No closing hedge.** No "rules change often, so check before you file", no disclaimer
    paragraph.
14. **Do not chase word count, jargon reduction or question-heading share as levers.** Measured
    non-levers in this cluster. Write to the shortest length that carries the worked example.

## 5. Calls recorded

- Winner set taken from top-10 density in the 2026-08-21 rental harvest. W1 and W2 are both
  uklandlordtax because that domain holds 23 of the cluster's top-10 slots across two URLs; they are
  measured separately because they behave differently (W1 is table-and-example heavy at 7 tables,
  W2 is an accordion list with zero tables and zero pound-figures).
- uklandlordtax sitewide furniture excluded and verified by fetching three further pages from the
  same domain: the "Related blog posts" loop, "Got a question for our landlord tax experts?",
  "Our landlord tax experts can help", "Get your landlord tax return sorted", "Explore Our Services",
  the "Download our FREE guide" global block, the category list, the registered-office block and the
  countdown timer all recur off-page. Removing them cut W1 from 1,110 to 814 prose words.
- ukpropertyaccountants.co.uk blocks direct crawling (HTTP 202, empty body, sgcaptcha redirect;
  WebFetch also blocked). W4 was read through a reader proxy, so its markup-derived counts (tables,
  FAQ count) are lower-confidence than the other rows. Its five FAQ answers are present but the FAQ
  *questions* live in an accordion the proxy dropped, so FAQ count is asserted at 5 from the answer
  count, and its heading total of 8 understates the true figure.
- W2's ten expense entries are an accordion whose titles sit in `span.bde-faq__title`, not in the
  `h3` wrapper. They are counted as headings. An extractor that strips `button` elements loses them
  entirely and reports 7 headings instead of 18.
- W3's table-of-contents block, "Related Articles" list and "You Might Also Like" loop were excluded;
  its in-body Landlord Studio product paragraphs were **kept**, as page-specific body CTA rather than
  sitewide furniture, consistent with the provestor call in the tools spec. They lift its
  second-person rate slightly.
- Table cells were removed before word, sentence and readability stats on every row, so W1's seven
  computation tables and our invisible page's six do not distort mean sentence length. Pound-figures
  are reported separately for prose and tables for the same reason.
- Flesch computed with the standard 206.835 - 1.015(W/S) - 84.6(Syl/W) formula and a regex syllable
  heuristic, on sentences of 5 words or more. Comparable across rows; not an absolute grade level.
- Positions are from the 2026-08-21 harvest, not re-pulled live for this pass.
