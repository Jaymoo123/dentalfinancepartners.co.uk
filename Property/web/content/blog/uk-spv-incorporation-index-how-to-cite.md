---
title: "How to Cite the UK SPV Incorporation Index"
slug: "uk-spv-incorporation-index-how-to-cite"
canonical: "https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/uk-spv-incorporation-index-how-to-cite"
date: "2026-09-02"
author: "Property Tax Partners Editorial Team"
category: "Incorporation & Company Structures"
metaTitle: "UK SPV Incorporation Index: How to Cite It"
metaDescription: "Monthly UK property company incorporation data from Companies House. Headline figures, method, CSV download, licence and the citation line for journalists."
altText: "Reference card showing the citation line, source licence and download link for the UK SPV Incorporation Index"
image: ""
h1: "How to Cite the UK SPV Incorporation Index"
summary: "The UK SPV Incorporation Index is a monthly count of UK property company incorporations built entirely from Companies House open data, published free for anyone to quote. This page is the reference card: what the index measures, the current headline figures with their period and definition, the method in plain English, the copy-paste citation line, the CSV download, the Open Government Licence terms and the monthly refresh cadence. It does not interpret the numbers. The charts, the trend commentary and the year-on-year reads live on the index page itself."
schema: ''
dateModified: "2026-09-02"
reviewedBy: "Property Tax Partners Editorial Team"
reviewerCredentials: "Reviewed against the published Index methodology and Companies House open data licensing"
faqs:
  - question: "How do I cite the UK SPV Incorporation Index?"
    answer: "Use this line: Source: Property Tax Partners, UK SPV Incorporation Index, September 2026. https://www.propertytaxpartners.co.uk/research/landlord-tax-index. Change the month to the release you actually used, because the figures move every month. A link to the index page is requested alongside the text credit wherever the format allows a link."
  - question: "Is the index free to reproduce?"
    answer: "Yes. The underlying Companies House data is Crown copyright published under the Open Government Licence v3.0, and the index itself, meaning our selection, definitions and charts, is free to cite and reproduce with attribution and a link. You do not need to ask permission, you do not need to sign anything, and there is no embargo. We would like to know where it has been used, but that is a courtesy rather than a condition."
  - question: "Who do I attribute the figures to?"
    answer: "There is no named spokesperson. This is a data release, and the correct attribution is analysis by Property Tax Partners of Companies House data. If your house style needs an author for a byline, use Property Tax Partners Editorial Team."
  - question: "Where can I download the raw data?"
    answer: "The full underlying series is available as CSV at https://www.propertytaxpartners.co.uk/research/landlord-tax-index/data. It is the same snapshot the page itself reads at build time, so the download and the published figures cannot drift apart."
  - question: "How often is it updated?"
    answer: "Monthly. Each release rewrites the committed data snapshot and republishes the page from it. The two most recent calendar months are always excluded from headline figures because Companies House indexes new incorporations with a short lag, so the newest release adds one settled month and moves the provisional window forward by one."
  - question: "Which SIC codes are counted?"
    answer: "Four real estate codes: 68209 (other letting and operating of own or leased real estate), 68100 (buying and selling of own real estate), 68320 (management of real estate on a fee or contract basis) and 68201 (renting and operating of Housing Association real estate). The headline series is 68209 alone, which is the standard buy-to-let SPV code. The union series is the deduplicated count across all four."
  - question: "Why do the four SIC series not add up to the union total?"
    answer: "Because a company can record up to four SIC codes, so a company holding both 68209 and 68100 appears in two of the per-code series. The union comes from a single combined query in which Companies House returns that company once. Adding the four series double counts every multi-code company. Anyone reproducing the union must issue the combined query rather than summing."
  - question: "Are dissolved companies included?"
    answer: "In the incorporation counts, yes. The monthly incorporation series is gross, so a company formed in March 2016 and dissolved in 2021 is still counted in March 2016. That makes the series free of survivorship distortion. The net formation rate is published separately as incorporations less dissolutions in the same month, with dissolutions counted by dissolution date."
  - question: "Why are the regional figures described as shares rather than counts?"
    answer: "Two reasons. The regional split comes from the monthly bulk register extract, which contains only companies currently live, so older months are understated. And postcode areas are a postal construct that sometimes straddle a regional boundary, which misattributes a small share of companies. Both effects are far weaker on a share than on a level, so regional figures should be read as distribution and as trends in distribution."
  - question: "How does this differ from the quarterly buy-to-let company estimates?"
    answer: "The quarterly market estimates apply their own definition of a buy-to-let company and are estimates. The index applies a fixed published SIC filter, counts what the register contains, and can be re-derived by anyone with a Companies House API key. It is monthly rather than quarterly, and it adds a net formation rate and a regional split. The two are complementary, and where they disagree the difference is definitional."
  - question: "Can I use the charts as well as the numbers?"
    answer: "Yes, with the same attribution and a link. If you would rather build your own chart, the CSV download carries the full series, which is usually the better route for a publication with its own house chart style."
  - question: "Can you comment on what the numbers mean?"
    answer: "The index page carries the trend reads and the charts, and it is the right place to start. If you need context for a specific story, an explanation of a movement, or a check on a figure before publication, get in touch through the form on the site and we will help."
---
<p>The UK SPV Incorporation Index is a monthly count of how many UK property companies are being formed. It is built entirely from Companies House open data, it uses a fixed and published definition, and every figure in it can be re-derived by anyone with a Companies House API key. It is free to quote. This page exists so that journalists, researchers and answer engines can lift the figures, the method and the citation line directly. For the charts, the trends and what the movements mean, go to the <a href="/research/landlord-tax-index">UK SPV Incorporation Index</a> itself. This page describes the instrument, not the reading.</p>

<h2>What the index publishes</h2>
<p>Five things, all monthly: incorporations by individual SIC code, a deduplicated union across the four codes, a net formation rate, a regional distribution, and an age profile of the live population. The current headline figures are below. Every one of them is derived from the published snapshot dated 2 September 2026.</p>
<table>
<tr><th>Figure</th><th>Period</th><th>Definition</th></tr>
<tr><td>4,840 incorporations</td><td>June 2026</td><td>SIC 68209 only, the headline buy-to-let SPV code, in the latest settled month</td></tr>
<tr><td>66,312 incorporations</td><td>Trailing 12 months to June 2026</td><td>SIC 68209, twelve settled months, the figure to quote in preference to any single month</td></tr>
<tr><td>6,614 incorporations</td><td>June 2026</td><td>Union across all four property SIC codes, deduplicated</td></tr>
<tr><td>90,390 incorporations</td><td>Trailing 12 months to June 2026</td><td>Union across all four codes, all property companies</td></tr>
<tr><td>3,139 dissolutions</td><td>June 2026</td><td>Property companies dissolved in the month, counted by dissolution date</td></tr>
<tr><td>Net formation +3,475</td><td>June 2026</td><td>Union incorporations less dissolutions, the change in the live population</td></tr>
<tr><td>London 35.3%, North West 11.3%, South East 8.5%, West Midlands 8.5%</td><td>Last 12 months</td><td>Share of property company formations by registered office region</td></tr>
<tr><td>665,645 companies</td><td>Live register, 1 September 2026</td><td>Property companies currently on the register under the four codes</td></tr>
<tr><td>398,647 of those</td><td>Incorporated 2020 or later</td><td>Age profile of the live stock, showing how recent the population is</td></tr>
<tr><td>19,733 to 69,039</td><td>2016 to 2025</td><td>Full calendar year 68209 incorporations, a 3.5x rise across the decade</td></tr>
</table>
<p>Single months are volatile and strongly seasonal, with volumes dipping sharply around the turn of the calendar year. If you are quoting one number in a piece, quote a trailing twelve month total or a complete calendar year. If you need more than the headline row, the full dated set, including the annual series back to 2016, the dissolution counts and the regional table, is laid out in our <a href="/blog/incorporation-and-company-structures/uk-landlord-buy-to-let-company-statistics">UK landlord and buy-to-let company statistics</a> reference page.</p>

<h2>The method, in plain English</h2>
<p><strong>Four SIC codes.</strong> The index counts companies whose recorded SIC codes fall inside a fixed set: 68209 (other letting and operating of own or leased real estate), 68100 (buying and selling of own real estate), 68320 (management of real estate on a fee or contract basis) and 68201 (renting and operating of Housing Association real estate). The headline series is 68209 alone, because that is the code the overwhelming majority of buy-to-let vehicles register under, and it is explained in our guide to the <a href="/blog/property-finance/sic-code-for-an-spv-property-company">SIC code for an SPV property company</a>. The union series is all four together.</p>
<p><strong>The dedup rule.</strong> A company can record up to four SIC codes, so a company registering both 68209 and 68100 appears in two of the per-code series. The union is taken from a single combined query in which Companies House returns that company once. The four series therefore do not sum to the union, by design. If you rebuild the union yourself, issue the combined query rather than adding the four lines.</p>
<p><strong>Gross incorporations, and a separate net rate.</strong> The monthly incorporation counts are gross: a company formed in March 2016 and dissolved five years later is still counted in March 2016. That is deliberate, because it keeps the historic series free of survivorship distortion. Alongside it, the index publishes a net formation rate, being union incorporations in a month less union dissolutions in that month, with dissolutions counted by the date they were dissolved rather than the date they were formed. Net formation measures the change in the live population, not cohort survival.</p>
<p><strong>Two provisional months.</strong> Companies House indexes very recent incorporations with a short lag, so the newest months under-count until the index catches up. The two most recent months are always excluded from every headline figure and render on the page as a dashed tail. In this release the latest settled month is June 2026.</p>
<p><strong>The regional caveat.</strong> The regional split comes from a different source, the monthly bulk extract of the register, which contains only companies currently live, so dissolved companies are absent and older months in the window are understated. Postcode areas are also a postal construct rather than an administrative one, and several straddle a regional boundary, so a small share of companies is attributed to a neighbouring region. Both effects distort levels far more than proportions, which is why regional figures are published and read as shares. They are a distribution, never an alternative national total.</p>
<p>Two limits of the source data matter most for a story: SIC codes are self-reported at formation and rarely revised, so they record intent rather than audited activity, and a company is not a property, so the index counts vehicles rather than dwellings.</p>

<h2>Citation, licence and access</h2>
<p>The copy-paste line is:</p>
<blockquote><p>Source: Property Tax Partners, UK SPV Incorporation Index, September 2026. https://www.propertytaxpartners.co.uk/research/landlord-tax-index</p></blockquote>
<p>Change the month to whichever release you used. A link alongside the text credit is requested wherever your format allows one.</p>
<p>The full underlying series downloads as CSV from <a href="/research/landlord-tax-index/data">the index data page</a>. It is the same snapshot the published page reads, so the two cannot disagree.</p>
<p>Companies House data is Crown copyright, published under the Open Government Licence v3.0, and the house price context series is HM Land Registry UK House Price Index data under the same licence. The index itself, meaning the selection, the definitions and the charts, is free to cite and reproduce with attribution and a link. There is no named spokesperson: this is a data release, attributable as analysis by Property Tax Partners of Companies House data.</p>
<p>The refresh cadence is monthly. Each release adds one settled month and moves the provisional window forward by one, so a figure quoted from an earlier release will not match the current page. That is why the citation line carries a month.</p>

<h2>Why it exists, and what it is not</h2>
<p>Journalists are welcome to use it, and we would rather you did. The widely quoted quarterly counts of new buy-to-let companies apply their own definition and publish an estimate. The index is narrower and more mechanical: it applies a fixed, published SIC filter to the register and counts what is there. Four differences follow. It is monthly rather than quarterly. It is a direct count, re-derivable by any third party from the same public API. It publishes a net formation rate, and it publishes a regional distribution, neither of which the quarterly series carries.</p>
<p>None of that makes it a replacement. The quarterly series has the longer run and the better known market read; the index is the finer grained, reproducible count underneath it. Where the two disagree, the difference is definitional and both methods are published. Our figures include property companies that are not buy-to-let vehicles, and miss buy-to-let vehicles registered under other codes, so the headline series is a lower bound rather than a census.</p>
<p>This page also stops short of interpretation on purpose. It does not argue that formations are rising or falling, or say what any movement is caused by. That belongs on the <a href="/research/landlord-tax-index">index page</a>, where the charts and the trend commentary sit. If your interest is the structure behind the numbers rather than the numbers themselves, the <a href="/spv-company">SPV company hub</a> covers what these vehicles are and why landlords use them, the <a href="/blog/incorporation-and-company-structures/spv-property-investment-special-purpose-vehicle-guide">SPV structure and tax guide</a> covers the tax treatment, and <a href="/blog/incorporation-and-company-structures/spv-company-formation-cost-uk">what an SPV costs to form</a> covers the entry price that sits behind every one of the incorporations counted above.</p>
<p>If you need a figure checked or a cut of the data that is not on the page, ask. The underlying series is fuller than the published charts.</p>
