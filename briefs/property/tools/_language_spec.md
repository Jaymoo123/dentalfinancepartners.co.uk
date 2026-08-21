# Property tools cluster: answer-pattern spec

Measured 2026-08-21 from live HTML. Winner set = top-10 density in the tools harvest,
not brand impression. Prose only: nav, header, footer, cookie banner, sitewide promo rail
and the calculator widget's own field labels are excluded. Sentence and readability stats
exclude table cells and lines under 5 words.

## 1. The measured table

| Page | Words | Mean sent. | Flesch | Q-headings | "you"/1k | "we"/1k | Statute cites/1k | Jargon nouns/1k | Numbers/1k | £ figures/1k | Tables | FAQs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **WINNER** uklandlordtax BTL mortgage calc (pos 1-4) | 473 | 18.2 | 56.6 | 2/4 (50%) | **38.1** | 10.6 | **0.0** | 4.2 | 14.8 | 2.1 | 0 | 3 |
| **WINNER** landlordstudio rental yield calc (pos 9) | 713 | 14.0 | 56.4 | 2/22 (9%) | **46.3** | 2.8 | **0.0** | 2.8 | 26.6 | 14.0 | 0 | 0 |
| **WINNER** provestor yield hotspots (pos 5-10) | 963 | 14.2 | **67.5** | 3/9 (33%) | 33.2 | 1.0 | **0.0** | 3.1 | 27.0 | 5.2 | 2 | 0 |
| OURS buy-to-let-mortgage-calculator.ts | 331 | 20.7 | 47.6 | 3/5 (60%) | **9.1** | 0.0 | **12.1** | 12.1 | 12.1 | **0.0** | 0 | 3 |
| OURS rental-yield-calculator.ts | 285 | 17.8 | 51.3 | 2/4 (50%) | **7.0** | 0.0 | 3.5 | 7.0 | 10.5 | **0.0** | 0 | 2 |
| OURS blog good-yield benchmarks | 3,426 | 19.0 | 50.8 | 19/29 (66%) | **6.1** | 3.2 | **12.8** | 16.1 | 54.3 | **0.0** | 4 | 13 |
| *contrast* cruseburke property tax calc | 266 | 10.6 | 29.1 | 6/16 (38%) | 11.3 | 0.0 | 7.5 | 7.5 | **0.0** | 0.0 | 0 | 4 |
| *contrast* taxd CGT calculator | 1,254 | 16.9 | 63.1 | 3/16 (19%) | **62.2** | 4.8 | 0.8 | **19.9** | 19.1 | 8.0 | 0 | 4 |

Jargon-noun list (my call, stated for repeatability): allowance(s), apportionment, chargeable,
compliance, deduction(s)/deductible, disposal(s), exemption, expenditure, gearing, incorporation,
jurisdiction, leasehold, legislation, liability/liabilities, licensing, obligation(s), provision(s),
reducer, relief(s), restructuring, statute/statutory, surcharge, supplement, threshold(s), taxation,
treatment, valuation, allowable, consideration, accrual(s), levy, remuneration, deferral, regulation(s).

Gaps that matter: we are **4-6x lighter on second person**, carry **statute citations the winners
carry none of**, run **8-11 Flesch points harder**, use **2-4x the jargon nouns**, and our two
calculator pages are **30-60% shorter than the thinnest winner**. Our blog writes `GBP18,000`
where every winner writes `£18,000` (33 GBP-figures, 0 £-figures; only 13 of 763 Property blog
files do this, so it is an outlier, not a house convention).

## 2. Answer patterns

**P1. A calculator page opens on what the reader gets, not on what the tool does.**
Them: "Our helpful calculator can help you estimate your monthly mortgage payment and how much you can borrow."
Us: "Estimate the monthly payment on a buy-to-let mortgage, on interest-only or capital repayment terms."
Theirs has a subject, a reader and two outcomes in 18 words. Ours is an imperative with no reader in it.
Blog pages open differently: provestor opens on the reader's decision moment ("If you're weighing up a
buy-to-let purchase, the rental yield tells you whether the numbers stack up before you commit"), then a
one-line scope statement. Answer-first is a *section* rule here, not a page rule.

**P2. The heading is the query, entity included.**
Them: "What happens at the end of an interest-only buy-to-let mortgage?"
Us: "Why is interest-only cheaper each month than repayment?"
Winners never pronoun the head entity out of a heading. Note the direction of the gap: we already run
*more* question headings than the winners (60-66% vs 9-50%), so the fix is not more questions, it is
putting the noun back in the ones we have.

**P3. The number goes in the first eight words, and its source rides in the same sentence.**
Them: "The UK average gross yield currently sits at around 5.8%, based on Zoopla's figure of an average
buy-to-let property at £270,045 and average rent of £1,301 a month."
Us: "The table below sets indicative gross yield bands for well-chosen stock." (then a table of 7%-9%
bands with no source and no data-through date).
Provestor puts "Source: Zoopla, data to September 2025." under both tables. Our four tables cite nothing.

**P4. A calculator page shows the arithmetic in literal figures.**
Them: "You take the 'Annual rental income' and divide by the 'Property value'. Then multiply this number
by 100 to get a percentage value. Example: Property value $600,000. Expected rent $3,000 a month.
$3,000 x 12 = $36,000. ($36,000 / $600,000) x 100 = 6% gross rental yield."
Us: "Gross yield is simply the annual rent divided by the property value or purchase price."
Landlordstudio does this twice, once for gross and once for net. Neither of our calculator pages contains
a single worked line. Our worked example lives on the blog, which is backwards for this family.

**P5. "It depends" is always followed by named drivers as separate labelled blocks.**
Them: "There's no universal answer to this question... In an ideal world you'd aim for 7%-8%, however...
this may not be realistic in certain locations" then five labelled H3s: OCCUPANCY RATES, CAPITAL GAINS,
RISKS, HOLDING PERIOD, INVESTMENT STRATEGY.
Us: "It varies widely by area and property type, but many investors look for a gross yield around 5% to
8%, with higher figures in lower-value regions and lower figures in expensive areas where growth is more
about capital value."
Same content, one 45-word sentence versus a range plus five scannable drivers.

**P6. The CTA is the next question, asked in the reader's voice.**
Them: "Found a region that works? The next question is how to hold it. Most investors weigh up buying
personally against using a limited company before they make an offer."
Them: "You can discuss this in more detail with one of our specialist property accountants if you would
like to find out what options are available to you." (placed at the end of a substantive answer, not in a box)
Us: "A specialist property accountant builds these models routinely, and our overview of what a property
accountant does shows where that analysis adds the most value."
Ours is third-person and hands off to another blog post. Our `ctaLabel` strings ("Reviewing a property
deal? Talk to us") already follow the pattern; the body prose does not.

**P7. What they leave out: statute, entirely.**
Across 2,149 words of winner prose there are **zero** references to Section 24, any Finance Act, HMRC,
Royal Assent, a named devolved tax authority, or a tax year. Our BTL calculator note carries three
Section 24 references in 331 words, in a sentence that is also a comma splice: "For a personal landlord,
Section 24 restricts mortgage interest relief to a basic-rate tax credit rather than a full deduction,
use the Section 24 calculator to see the tax impact."
Winners also leave out: jurisdiction carve-outs, effective-date qualifiers, and audience lists.

**P8. Calculator prose and blog prose split the job.**
Calculator pages teach the arithmetic and speak to one person (you/1k = 38-46, we/1k = 2.8-10.6, zero
tables, zero regional data). The blog page supplies the data and steps back (you/1k = 33, we/1k = 1.0,
two sourced tables, city and region names as the substance, highest Flesch of the three at 67.5).
We invert it: our calculator prose is abstract tax commentary and our blog carries the worked example.

## 3. Do not copy (habits of the two badly-ranking domains in our harvest)

**cruseburke** (property tax calculator, /calculators/property-tax-calculator/)
- Head keyword as the subject of the page: **7 of 7 H2 headings contain "Property Tax Calculator" verbatim**.
- **Zero numbers in 266 words** on a tax calculator page. No rate, no threshold, no worked figure.
- H2s are list frames, not questions a searcher types: "What Property Tax Calculator Helps You Do",
  "Who Should Use Property Tax Calculator?", "Key Features of...", "Why Use...".
- Audience-list padding: "Homebuyers / Property investors / Buy-to-let landlords / First-time buyers /
  Property developers / Overseas investors". Six bullets, no information.
- FAQs answered in under 12 words with a bare yes/no: "Is this calculator free to use?" / "Yes, ...
  completely free."
- Flesch 29.1 on a mean sentence length of only 10.6 words, because the sentences are short but stuffed
  with the same polysyllabic keyword phrase. Short sentences do not rescue keyword-stuffed nouns.

**taxd** (CGT calculator, /capital-gains-tax-calculator)
- Stale and self-contradicting in the same page: "2023/2024 tax year", CGT at "10%/20%", "28% in the case
  of residential property", an allowance stated as **£3000 in one section and £12,300 in another**, and a
  "30-day deadline" that no longer exists.
- Hard factual error stated as guidance: "In the UK, it is illegal to avoid paying the Capital Gains Tax."
- Topic drift: roughly a third of a CGT *calculator* page is employee share schemes (SIP, SAYE, CSOP, EMI).
- Filler transitions: "Let's break it down further:", "Here's an overview of how to figure out your final bill."
- Highest jargon load measured (19.9/1k) and **the highest second-person rate of any page measured
  (62.2/1k) while ranking badly**. Second person is a necessary condition here, not the mechanism.
  Pair it with current figures and on-topic scope or it buys nothing.

## 4. Hard rules for writers in this cluster

Standing (all clusters): zero em-dashes; UK English; no PropertyTaxPartners pricing on page.
All five competitors measured use zero em-dashes, so this one is table stakes rather than an edge.

Cluster-specific, from the measurements above:

1. **£, never GBP, in prose and tables.** Fix the 33 GBP-figures in the good-yield blog.
2. **Calculator prose floor: 450 words** (thinnest winner = 473; ours are 285-331).
3. **One line of literal arithmetic per calculator page**, using that calculator's own default inputs,
   in the explainer. Not a formula in words.
4. **Second person at or above 25 per 1,000 words** on calculator prose (winners 33-46; ours 7-9).
5. **Flesch 55 or higher; mean sentence 17 words or fewer** (winners 56-68 / 14-18; ours 48-51 / 18-21).
6. **Jargon nouns at or below 6 per 1,000** (winners 2.8-4.2; ours 7-16).
7. **At most one statute reference per calculator page**, and only where it changes the number the reader
   just calculated. No Act names, no Royal Assent dates, no tax-year labels, no devolved-authority
   carve-outs on a calculator page. Those belong in the linked blog.
8. **Every headline percentage or average carries a named source and a data-through date in the same
   sentence**, and every table gets a "Source: X, data to <month year>" line.
9. **Question headings keep the head entity.** "…for a buy-to-let mortgage", not "…than repayment".
10. **Every "it depends" is followed by 3 to 5 named drivers as separate labelled items**, never as a
    trailing clause list.
11. **In-body CTA is one question plus the next decision**, placed at the end of a substantive answer,
    in second person. No third-person "a specialist accountant would…". No blog-to-blog handoff as the
    page's final move.
12. **No audience lists, no "key features", no "why use this calculator" headings.** Every H2 must be a
    query or a claim.
13. **No FAQ shorter than 25 words and no bare yes/no answer.**
14. **One page, one head term.** No section that would rank for a different calculator.

## 5. Calls recorded

- Winner-set trimming: uklandlordtax's six promo cards (allowable expenses, stamp duty top 30, ltd co vs
  personal, deed of trust, FIC, Let Property Campaign) were excluded as sitewide boilerplate. Verified by
  fetching /calculators/buy-to-let-stamp-duty-calculator/ and finding the same three blocks present.
- uklandlordtax's `-interest-only` variant 301s to the base calculator URL, so positions 1-4 across the
  variant family are one page, not four. Counted once.
- The landlordstudio page that ranks in the UK is the **.com** page, priced in dollars, not the /uk/ one.
  Its examples use $600,000 and $3,000. It still takes position 9 on UK queries, which says the arithmetic
  matters more than the currency.
- Provestor's two in-body "Free Pro Masterclass" blocks were kept in the prose count: they are
  page-specific body CTAs, not sitewide furniture. They lift its second-person rate slightly.
- Table cells and lines under 5 words were dropped before sentence and readability stats on every page,
  so provestor's and our own data tables do not distort mean sentence length.
- Flesch computed with the standard 206.835 - 1.015(W/S) - 84.6(Syl/W) formula and a regex syllable
  heuristic. Comparable across rows; not a substitute for an absolute grade level.
