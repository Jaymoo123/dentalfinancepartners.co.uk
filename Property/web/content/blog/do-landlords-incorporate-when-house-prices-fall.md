---
title: "Do Landlords Incorporate When House Prices Fall? What the Data Shows"
slug: "do-landlords-incorporate-when-house-prices-fall"
canonical: "https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/do-landlords-incorporate-when-house-prices-fall"
date: "2026-09-02"
author: "Property Tax Partners Editorial Team"
category: "Incorporation & Company Structures"
metaTitle: "Do Landlords Incorporate When Prices Fall?"
metaDescription: "We tested UK property company incorporations against house prices, 2016 to June 2026. Correlation 0.008. Incorporation follows tax events, not prices."
altText: "Two data series compared: monthly UK property company incorporations against the UK House Price Index over a ten year window"
image: ""
h1: "Do Landlords Incorporate When House Prices Fall?"
summary: "We tested our own incorporation series against the UK House Price Index across the 118 months from September 2016 to June 2026 and found essentially nothing: a correlation of 0.008 between the two year-on-year series. During the only sustained price fall in the window, from July 2023 to April 2024, incorporations were not falling with prices but accelerating, reaching more than 50 per cent year-on-year growth in April 2024. The turning points in the incorporation series line up with tax events instead. This piece sets out the method so you can reproduce it, gives the year-by-year table, and explains what actually moves the number."
schema: ''
dateModified: "2026-09-02"
reviewedBy: "Property Tax Partners Editorial Team"
reviewerCredentials: "Derived from the UK SPV Incorporation Index (Companies House Advanced Search API) and the UK House Price Index, HM Land Registry and ONS"
faqs:
  - question: "Do landlords incorporate more when house prices fall?"
    answer: "On our data, no, and there is no reliable relationship in either direction. Comparing year-on-year changes in monthly UK property company incorporations against year-on-year changes in the UK House Price Index across the 118 months from September 2016 to June 2026, the correlation coefficient is 0.008. That is indistinguishable from zero. The only sustained price fall in the window, July 2023 to April 2024, coincided with incorporations rising, not falling."
  - question: "What is the correlation between incorporations and house prices?"
    answer: "0.008 on year-on-year monthly changes over September 2016 to June 2026, using our union series across the four real-estate SIC codes and the UK House Price Index for the United Kingdom. Excluding the pandemic distortion of March 2020 to June 2021, it moves to minus 0.19, which is still weak and points the opposite way from the intuitive story. Neither figure supports using house prices to predict incorporation activity."
  - question: "Is buy to let still profitable in 2026?"
    answer: "Profitability is a per-deal question that no aggregate series can answer, so we will not pretend otherwise. What our data does show is that the flow of new property companies is still running at a high level in absolute terms while coming off its 2025 peak: the first six months of 2026 recorded 44,076 incorporations across the four codes against 48,826 in the same months of 2025, a fall of 9.7 per cent. Landlords are still forming companies in large numbers, just fewer than last year."
  - question: "Are property incorporations falling in 2026?"
    answer: "Yes, from a record base. The last settled month in our data is June 2026, at 4,840 incorporations under the headline 68209 code, down 20.1 per cent on June 2025. Across the wider union of four codes, the first half of 2026 is 9.7 per cent below the first half of 2025. For context, 2025 as a whole was the highest year on record in our series at 95,140 union incorporations, so a single-digit decline in the following half-year is a step down from a peak rather than a collapse."
  - question: "What did incorporations do during the 2023 house price fall?"
    answer: "They rose sharply. UK house prices were falling year-on-year every month from July 2023 to April 2024, bottoming at minus 2.7 per cent in December 2023. Over that same window our incorporation series went from roughly flat to 27.0 per cent year-on-year growth in December 2023 and 51.0 per cent in April 2024. If falling prices deterred incorporation, this is the window where it would have shown, and it did the opposite."
  - question: "Why does incorporation timing not follow house prices?"
    answer: "Because the decision is a tax and financing decision taken about an existing or intended portfolio, not a market-timing decision about entry price. A landlord weighing a company structure is comparing their tax position inside a company against their position outside it, and that comparison barely moves when the index moves a couple of per cent. Prices do matter to one specific mechanical point, the capital gains and stamp duty cost of transferring existing property in, but that is a cost-of-transfer question rather than a reason to incorporate."
  - question: "What does move the incorporation numbers then?"
    answer: "The turning points in our series sit near tax events rather than price events. The step change from 2016 into 2017 coincides with the start of the Section 24 phase-in, which ran across the tax years 2017/18 to 2020/21. The sharp 2024 acceleration and record 2025 sit ahead of the April 2027 property income rate rise. The change to Section 162 incorporation relief from April 2026, which turned the relief into a mandatory positive claim, is another event of the kind that gets landlords to act in a specific window. We are describing timing here, not proving causation from co-movement."
  - question: "Do house prices matter to the incorporation decision at all?"
    answer: "They matter to the cost of getting property into the company, not to whether a company is the right structure. Transferring an existing property into a company is a disposal at market value for capital gains purposes and an acquisition at market value for stamp duty, so a higher index raises both bills. That makes prices a factor in when and how a transfer is executed and in whether reliefs are worth claiming, but it is a transaction-cost input, not the driver of the underlying structural choice."
  - question: "How can I reproduce this analysis myself?"
    answer: "Both inputs are public. Pull monthly counts from the Companies House Advanced Search API filtered on the four real-estate SIC codes with a combined query so companies with more than one code are counted once, and pull the UK House Price Index from HM Land Registry and ONS. Convert both to year-on-year percentage changes, align them by month, and compute a Pearson correlation on the overlapping months. Our full definitions, the dedup rule and the known weaknesses are set out in the UK SPV Incorporation Index methodology."
  - question: "Why use year-on-year changes rather than the raw levels?"
    answer: "Because correlating two rising lines tells you only that both were rising. Incorporations grew from 33,040 in 2016 to 95,140 in 2025 and the house price index rose over the same decade, so the raw levels would show a strong positive correlation that carries no information about behaviour. Differencing year-on-year removes the shared trend and the seasonal pattern in both series, which is what leaves the near-zero result reported here."
  - question: "Is a correlation of 0.008 just a small effect rather than no effect?"
    answer: "It is small enough to be treated as no effect for any practical purpose. It implies the house price series explains effectively none of the variation in the incorporation series across 118 months. We also tested lags of one to twelve months in case incorporations respond to prices with a delay, and the strongest of those was minus 0.29, still weak and still negative. There is no lag at which prices become a usable predictor."
  - question: "What are the limits of this analysis?"
    answer: "Three worth stating. Our incorporation counts are gross, so companies later dissolved remain in the count. The two most recent months are provisional because of Companies House indexing lag and are excluded here, which is why the analysis stops at June 2026. And the UK House Price Index is a national average that hides very different regional paths, so a landlord in one region may have experienced a price move the national line does not show."
---
<p>The intuitive story is that landlords rush into companies when the market turns: prices fall, yields tighten, so people restructure. We tested that against our own numbers and it is not true. Across the 118 months from September 2016 to June 2026, the correlation between the year-on-year change in UK property company incorporations and the year-on-year change in the UK House Price Index is <strong>0.008</strong>. That is not a weak relationship. That is no relationship.</p>
<p>The finding matters because it removes a variable from the decision. If you are waiting for the market to tell you when to incorporate, the market has never told anyone. What the series does track, at least in timing, is tax events. That is a more useful thing to watch, and it is watchable in advance.</p>

<h2>The method, in one paragraph</h2>
<p>Both series are public and both are monthly. The incorporation series is our own: a direct count of companies incorporated at Companies House under the four real-estate SIC codes (68100, 68201, 68209, 68320), taken as a deduplicated union so a company holding two of those codes is counted once. Full definitions, the dedup rule and the known weaknesses are in the <a href="/research/landlord-tax-index">UK SPV Incorporation Index</a> and its published methodology. The price series is the UK House Price Index from HM Land Registry and ONS, United Kingdom average price. We converted both to year-on-year percentage changes, which strips out the shared upward trend and the seasonality that would otherwise manufacture a correlation, aligned them by calendar month, and computed a Pearson correlation across every overlapping month from September 2016 to June 2026. June 2026 is the last settled month in our data; the two most recent months are provisional because of Companies House indexing lag and are excluded. Anyone with a Companies House API key can rebuild the whole thing.</p>
<p>The headline result: r = 0.008 across 118 monthly observations. Stripping out the pandemic distortion of March 2020 to June 2021, when both series behaved abnormally for reasons that had nothing to do with landlord structuring, gives minus 0.19 over the remaining 102 months. Still weak, and pointing the opposite way from the intuitive story rather than supporting it. We also tested lags of one to twelve months, on the theory that incorporations might respond to prices with a delay. The strongest reading was minus 0.29 at a nine-month lag, which is not a signal anyone should trade on.</p>

<h2>The one real test: the 2023 price fall</h2>
<p>A correlation across a decade can hide the case that matters. The window that actually tests the question is the only sustained fall in UK house prices in our data, from July 2023 to April 2024, when the index was negative year-on-year every month and bottomed at minus 2.7 per cent in December 2023.</p>
<p>Incorporations did not fall with it. They accelerated.</p>
<table>
<tr><th>Month</th><th>Union incorporations, year-on-year change</th><th>UK house price index, year-on-year change</th></tr>
<tr><td>2023-07</td><td>-1.2%</td><td>-0.7%</td></tr>
<tr><td>2023-09</td><td>+2.5%</td><td>-1.7%</td></tr>
<tr><td>2023-10</td><td>+25.3%</td><td>-2.1%</td></tr>
<tr><td>2023-12</td><td>+27.0%</td><td>-2.7%</td></tr>
<tr><td>2024-02</td><td>+26.8%</td><td>-1.6%</td></tr>
<tr><td>2024-04</td><td>+51.0%</td><td>-0.04%</td></tr>
</table>
<p>If falling prices deterred landlords from incorporating, this is the window in which it would have shown. Instead the incorporation series recorded some of its strongest growth of the decade while the price index was in its only negative stretch. We are not claiming the fall caused the rise. We are claiming the two are not moving together in the direction the common story assumes, and this window is the cleanest evidence of that available.</p>

<h2>Year by year: the two series side by side</h2>
<p>The annual view makes the independence easier to see. Incorporations are our union count for the calendar year. The price column is the December-on-December change in the UK House Price Index.</p>
<table>
<tr><th>Year</th><th>Union incorporations</th><th>Change on prior year</th><th>UK house prices, Dec on Dec</th><th>Note</th></tr>
<tr><td>2016</td><td>33,040</td><td>-</td><td>+5.2%</td><td>Base year of our annual series</td></tr>
<tr><td>2017</td><td>43,422</td><td>+31.4%</td><td>+4.6%</td><td>Largest annual jump in the series, at the start of the Section 24 phase-in</td></tr>
<tr><td>2018</td><td>46,465</td><td>+7.0%</td><td>+2.0%</td><td>Growth slows sharply while prices also cool</td></tr>
<tr><td>2019</td><td>54,638</td><td>+17.6%</td><td>+0.9%</td><td>Incorporations re-accelerate into the weakest price year of the decade</td></tr>
<tr><td>2020</td><td>66,575</td><td>+21.8%</td><td>+7.0%</td><td>Pandemic year, both series distorted</td></tr>
<tr><td>2021</td><td>70,926</td><td>+6.5%</td><td>+7.3%</td><td>Section 24 phase-in complete; incorporation growth slows as prices run hot</td></tr>
<tr><td>2022</td><td>72,279</td><td>+1.9%</td><td>+7.3%</td><td>Weakest growth in the series, on identical price growth to 2021</td></tr>
<tr><td>2023</td><td>74,639</td><td>+3.3%</td><td>-2.7%</td><td>Prices fall; incorporations still grow</td></tr>
<tr><td>2024</td><td>89,857</td><td>+20.4%</td><td>+3.1%</td><td>Second largest jump in the series, prices only modestly recovering</td></tr>
<tr><td>2025</td><td>95,140</td><td>+5.9%</td><td>+1.9%</td><td>Record year in absolute terms; the peak month is September 2025</td></tr>
</table>
<p>Read down the two change columns. 2022 and 2021 had the same price growth of 7.3 per cent and incorporation growth of 1.9 and 6.5 per cent. 2019 and 2024 had price growth of 0.9 and 3.1 per cent and incorporation growth of 17.6 and 20.4 per cent. The pairs do not sort. That is what a correlation of 0.008 looks like when you lay it out by hand.</p>

<h2>Where 2026 sits</h2>
<p>The leading number is still ours. The last settled month is June 2026, at 4,840 incorporations under the headline 68209 code, down 20.1 per cent on June 2025. Across the union of four codes, the first half of 2026 recorded 44,076 incorporations against 48,826 in the first half of 2025, a fall of 9.7 per cent. Rolling twelve months to June 2026 stands at 66,312 on the headline code and 90,390 across all four.</p>
<p>House prices over the same period were up 2.0 per cent year-on-year in June 2026, to a UK average of £272,188. So: prices modestly positive, incorporations down by a tenth. Once again the two are not telling the same story, and once again the price line is context rather than cause. The honest reading of 2026 so far is that the flow is coming off a record peak rather than reversing, and that the peak itself, September 2025, sits nowhere near a turning point in the price series.</p>

<h2>So what does move the number?</h2>
<p>Timing, in our series, clusters around tax events. The largest annual jump in the whole decade is 2017, at the start of the Section 24 phase-in that ran across the tax years 2017/18 to 2020/21; the pillar on <a href="/section-24">Section 24 and finance cost relief</a> covers what that regime does, and this piece deliberately does not restate it. Growth then slows through 2021 and 2022 as the phase-in completes. The second largest jump is 2024, running into the record 2025, ahead of the April 2027 rise in property income tax rates. The change to Section 162 incorporation relief from April 2026, which made it a mandatory positive claim rather than an automatic one, is the same kind of event: a dated change that gives landlords a reason to act inside a particular window.</p>
<p>We are describing where the turning points sit, not proving that any one measure caused any one move. Several things move at once in a tax year and a monthly count cannot separate them. But the pattern is consistent in a way the price comparison simply is not, and it points at the practical conclusion: the trigger for looking at a company structure is a change in how your rental income will be taxed, and those changes are announced in advance. Our page on <a href="/blog/incorporation-and-company-structures/incorporation-timing-when-to-incorporate-property-portfolio">when to incorporate a property portfolio</a> works through what to do with that lead time, and the <a href="/blog/incorporation-and-company-structures/2027-tax-rates-incorporation-decision-uk-landlords">2027 tax rates and the incorporation decision</a> handles the specific event now in front of most landlords.</p>
<p>Where prices genuinely do enter the decision is narrower than people assume, and it is mechanical. Moving an existing property into a company is a disposal at market value for capital gains purposes and an acquisition at market value for stamp duty. A higher index therefore raises the cost of transferring in, which is a question about how and when a transfer is executed rather than about whether a company is the right structure. The <a href="/blog/incorporation-and-company-structures/incorporation-cost-calculator-cgt-sdlt-implications">incorporation cost calculator guide</a> sets out how those two bills are built, and the <a href="/spv-company">SPV company hub</a> covers the structure itself.</p>

<h2>What we would not claim</h2>
<p>The caveats, stated plainly. Our incorporation counts are gross, so companies later dissolved stay in the count and the series measures formation rather than surviving stock. The UK House Price Index is a national average across regions whose paths differ materially, so an individual landlord's experienced price move may not be the one in the table. And a near-zero correlation is evidence that the aggregates do not move together; it is not evidence about any individual landlord's reasoning, which no monthly count can see.</p>
<p>What it does support is this: if you have been waiting for house prices to give you a signal on incorporation, that signal has never existed in ten years of data. The dates that matter are in the tax calendar.</p>
