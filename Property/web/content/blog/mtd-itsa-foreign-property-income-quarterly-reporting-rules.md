---
title: "MTD ITSA for UK-Resident Landlords with Foreign Rental Property"
slug: "mtd-itsa-foreign-property-income-quarterly-reporting-rules"
canonical: "https://www.propertytaxpartners.co.uk/blog/making-tax-digital-mtd/mtd-itsa-foreign-property-income-quarterly-reporting-rules"
date: "2026-05-23"
author: "Property Tax Partners Editorial Team"
category: "Making Tax Digital (MTD)"
metaTitle: "MTD ITSA Foreign Property Income: Quarterly Reporting"
metaDescription: "Foreign rental income runs through MTD ITSA quarterly cycle. SA106 mapping, FX translation, foreign tax credit at final declaration, NRL interaction."
altText: "Mediterranean-style residential buildings and palm trees, representing UK-resident landlords' overseas rental property"
image: "https://images.pexels.com/photos/30820136/pexels-photo-30820136.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
imageCredit:
  photographer: Marian Florinel Condruz
  photographer_url: https://www.pexels.com/@gottapics
  source: Pexels
  source_url: https://www.pexels.com/photo/mediterranean-residential-architecture-and-palm-trees-30820136/
h1: "MTD ITSA for UK-Resident Landlords with Foreign Rental Property"
summary: "If you are UK-resident and own a foreign rental property, it sits inside the MTD ITSA filing cycle from 6 April 2026 alongside your UK rentals, not in a separate annual return. Your foreign property income aggregates with your UK property income for the qualifying-income threshold, runs through quarterly updates on the foreign-property stream, translates from local currency to sterling on either the spot rate or HMRC's monthly average (pick one and stick), and the foreign tax credit is claimed at the final declaration stage, not at quarterly update. Here is the operational detail: the SA106 mapping into MTD, the FX-translation choice, the foreign tax credit timing, the software-support gap that catches early-cohort landlords, and how the NRL scheme runs parallel to MTD for non-resident landlords on UK property."
schema: ""
faqs:
  - question: "Does foreign property income count toward the £50,000 MTD ITSA threshold?"
    answer: "Yes. The qualifying-income test aggregates UK property gross income, foreign property gross income, and self-employment turnover; foreign rental income counts on the same basis as UK rental. If you are UK-resident with £25,000 of UK rental and £30,000 of Spanish villa rental (sterling-equivalent), you test at £55,000 combined and are in scope for the April 2026 mandate. Foreign rental income is reported on SA106 fields; the figure that feeds the threshold test is gross of foreign tax and gross of any local expenses, in sterling."
  - question: "Which SA106 boxes feed the MTD ITSA quarterly update?"
    answer: "The MTD ITSA quarterly update for foreign property maps to the SA106 foreign-property pages (boxes 14 onwards on the standard SA106 schedule). Each quarterly update reports your gross foreign rental income in sterling, your foreign-property expenses by category (allowable expenses on foreign property follow the same SA106 categorisation as UK property: agent fees, repairs, finance costs subject to Section 24 restriction etc), and any property-specific items the local jurisdiction generates. HMRC's MTD ITSA API has dedicated endpoints for foreign-property quarterly data. The API exists on HMRC's side; the constraint is whether your software calls it."
  - question: "Do I have to use HMRC's published monthly average exchange rates, or can I use spot rates?"
    answer: "Either method is permitted. HMRC's International Manual allows two FX-translation approaches: the spot rate on transaction date (the exchange rate on the day the income or expense arose), or HMRC's published monthly average exchange rates (available on gov.uk). The choice is yours; the constraint is consistency across the year. Switching method mid-year is generally not allowed, so choose one method at the start of the tax year and apply it to every transaction in that year. With one or two foreign properties you will usually find the HMRC monthly average simpler to run; if you have high transaction volume, spot rates from a forex-API feed can be worth the extra effort for accuracy."
  - question: "Can I switch FX translation methods between tax years?"
    answer: "Yes; the consistency rule applies within a tax year, not across years. If you used HMRC's monthly average rate in 2026/27 you can switch to spot rates from 6 April 2027, and vice versa. Document the choice and the reason for switching; HMRC's compliance approach is to look for a reasoned method choice and consistent application, not to mandate one method over the other. Methodology drift mid-year (some transactions on spot, others on monthly average) generates an enquiry risk that switching only between years avoids."
  - question: "When do I claim the foreign tax credit on my MTD ITSA filing?"
    answer: "At the final declaration (or end-of-period statement) stage, not at quarterly update. The quarterly updates report gross foreign rental income before any foreign tax deduction; the foreign tax credit under TIOPA 2010 s.18 is claimed when you reconcile the year at the final declaration. The credit is the lower of (foreign tax actually paid on the foreign rental income) or (UK tax that would have arisen on that foreign rental income); typically the foreign tax paid is the lower figure and forms the credit. The credit is non-refundable, meaning it can reduce your UK tax to zero on the foreign rental income but does not generate a refund of foreign tax."
  - question: "What if my MTD software doesn't support SA106 foreign-property fields?"
    answer: "It is a hard blocker. You cannot file MTD ITSA quarterly updates with foreign-property income on a product that does not support the SA106 foreign-property API endpoints. The fix is to switch to a product that does. Many MTD products in the early-2026 cohort launched without foreign-property support; the situation has improved but is still not universal. Before you commit to a product, check the HMRC compatible-software register and confirm foreign-property support explicitly (software providers do not always advertise it clearly). It is question 2 in the broader product-selection framework covered in our MTD software decision-tree guide."
  - question: "I'm a UK resident with a property in the EU. Does the post-Brexit position change anything for MTD?"
    answer: "Not directly. The UK leaving the EU did not change the UK domestic tax treatment of UK-resident landlords' foreign rental income; UK residents have always been taxed on worldwide rental income on the arising basis. The post-Brexit change that does affect some landlords is the loss of EU-specific reliefs (e.g. capital allowances rules for EEA holiday lets after FHL abolition), but this affects the substantive tax position, not the MTD reporting mechanic. The MTD ITSA reporting flow for an EU property is identical to the MTD flow for a non-EU property: SA106 categorisation, FX translation, FTC at final declaration."
  - question: "Do I report foreign rental in the local currency or in sterling on the quarterly update?"
    answer: "Sterling, always. MTD ITSA reporting is in pounds sterling; the local currency does not appear on the submitted figures. The FX translation (per the spot vs monthly-average choice) converts each transaction at recording time, and the sterling figures flow into the quarterly update. Most software products capture the foreign-currency original amount in a notes field for audit-trail purposes, but the figure reported to HMRC is sterling. Keep digital records of both the original foreign-currency amount AND the sterling-converted amount; under enquiry, HMRC may ask for the source-currency figure and the FX rate used."
  - question: "My foreign letting agent withholds tax at source. How does that flow into my MTD filing?"
    answer: "Report the gross rental income (before the local withholding tax) on the quarterly update; the foreign tax withheld is the foreign tax that feeds the foreign tax credit calculation at final declaration. If the foreign letting agent pays you net of a 10% withholding tax on €1,000 of gross rent, your software entry is €1,000 gross income (in sterling at the chosen FX rate) and €100 of foreign tax paid (recorded separately for the FTC calculation). Do not net the withholding against the gross income on the quarterly update; the gross-vs-net distinction matters both for the threshold test and for the FTC mechanism."
  - question: "How does the NRL scheme interact with MTD if I'm a non-resident with UK property?"
    answer: "Non-resident landlord (NRL) scheme withholding by UK letting agents (basic rate 20% absent NRL1/2/3 approval) continues to apply alongside MTD ITSA from 6 April 2026; the two regimes run in parallel and neither displaces the other. If you are a non-resident landlord with qualifying UK property income above the MTD threshold, you still file MTD quarterly updates (from your overseas address, via UK-recognised software), and the NRL withholding counts as tax already paid against your final UK liability. Your MTD filing duty does NOT end because NRL withholding is in place; it covers the income side, while the substantive NRL regime sits across a wider set of pages."
  - question: "Can I deduct foreign-property expenses in the quarter they were incurred, even if I haven't yet paid them?"
    answer: "Depends on whether you elect cash basis or accruals basis on SA106. Cash basis: deduct when paid; accruals: deduct when incurred. It is the same per-property election as for UK property; you elect once per property and apply it consistently, and you cannot mix bases within one property. If you hold both UK and foreign properties, the election can differ between properties, but each property stays consistent year on year. Cash basis is the default for most small landlords; accruals matters mostly where you have significant timing-difference items (advance rent, deferred maintenance bills)."
  - question: "What if I sell the foreign property mid-tax-year?"
    answer: "The MTD quarterly cycle continues to the point of disposal, then cessation reporting kicks in. The quarter in which you sell the property reports the rental income up to disposal date; the final declaration for the year reconciles the year as a whole. The disposal itself is a capital gains event reported through the UK CGT regime (the foreign-property-disposal CGT 60-day return obligation applies if there is a chargeable gain), separate from the MTD ITSA income filings. If the foreign disposal triggers local-jurisdiction tax (Spanish capital gains, French plus-value etc), the foreign tax credit at final declaration handles the income-tax side, and the CGT side is dealt with separately."
dateModified: "2026-05-23"
reviewedBy: "ICAEW Qualified Senior Reviewer"
reviewerCredentials: "Chartered Accountant (ACA, ICAEW), Property Tax Specialist"
reviewedAt: "2026-05-23"
editorialNote: "Wave 4 net-new (Session B, MTD ITSA operational details). Operational reporting mechanics for foreign rental income inside the MTD ITSA cycle from 6 April 2026. Distinct from the existing Wave 2 foreign-tax-credit page which covers credit-mechanism only; this page covers the MTD reporting flow. Cross-links to the FTC page as the credit-mechanism reference."
---

<p>If you are UK-resident and own a Spanish villa, a French apartment, or a holiday let in Portugal, you do not file your foreign rental income on a separate annual return from April 2026. It runs through the same MTD ITSA quarterly cycle as your UK portfolio, aggregates with your UK rental for the qualifying-income threshold test, and reports against the SA106 foreign-property fields on each quarterly update. The foreign tax credit, the FX translation, and the NRL scheme (for non-resident landlords with UK property) all sit on top of the same MTD architecture, but each carries a specific timing and mechanic that is easy to get wrong.</p>

<p>The substantive foreign-tax-credit mechanism is set out in our <a href="/blog/non-resident-landlord-tax/foreign-tax-credit-uk-property-overseas-landlords">foreign tax credit TIOPA 2010 guide</a>. What follows assumes you know the FTC exists and shows how it, the SA106 mapping, the FX-translation choice, the software-support gap and the NRL scheme all play through the MTD cycle.</p>

<h2>Where foreign property fits in MTD ITSA</h2>

<p>As a UK resident, your foreign rental income is UK-taxable on the arising basis (worldwide rental income, with foreign-tax credit available where the foreign jurisdiction also taxes the rental). From 6 April 2026, that UK reporting moves into the MTD ITSA cycle along with your UK rental income. Two consequences follow.</p>

<p>First, your foreign rental income counts toward the qualifying-income threshold. With £25,000 of UK rental and €35,000 of Spanish rental (sterling equivalent around £30,000), you test at £55,000 combined and are in scope for the April 2026 mandate, even though neither stream on its own crosses the £50,000 line. The aggregation is on the gross side, so the £55,000 figure is before any foreign tax credit, before any allowable expenses, and before any FX-translation method choices that net down individual transactions. Our <a href="/blog/making-tax-digital-mtd/mtd-itsa-qualifying-income-test-gross-vs-net">qualifying income gross-vs-net guide</a> works through the gross-vs-net distinction in the threshold test.</p>

<p>Second, the quarterly reporting stream is the foreign-property stream specifically; foreign-property data does not commingle with UK-property data on the quarterly update. Most MTD software handles this by setting up the foreign property as a separate property entity inside the same MTD enrolment, with its own income-and-expense categorisation. Your submission to HMRC's MTD ITSA API uses the foreign-property endpoints; your UK-property data goes on the UK endpoints. The two streams reconcile at the final declaration into the consolidated SA picture.</p>

<h2>The SA106 mapping into the MTD quarterly stream</h2>

<p>The data points that flow into each foreign-property quarterly update map to the SA106 foreign-property pages from the older annual Self Assessment return. The categorisation discipline is the same; only the timing changes (quarterly rather than annual).</p>

<ul>
<li><strong>Gross foreign rental income</strong> (per property, in sterling at chosen FX rate).</li>
<li><strong>Allowable expenses</strong> by category, following the SA106 line headings: agent fees, repairs and maintenance, finance costs (subject to Section 24 restriction for residential foreign property the same way as for UK property), insurance, local taxes (where deductible per the foreign jurisdiction's rules and the UK SA106 treatment), other allowable.</li>
<li><strong>Foreign tax paid</strong>, recorded separately. This does not reduce the quarterly-update profit; it feeds the foreign tax credit at final declaration.</li>
<li><strong>Income type tagging</strong>: residential vs commercial vs furnished-holiday-letting-legacy (FHL was abolished from April 2025, but transitional cases continue to report under their pre-abolition treatment).</li>
</ul>

<p>The HMRC MTD ITSA API has dedicated endpoints for the foreign-property quarterly data, so the constraint is your software, not HMRC infrastructure. That is where the real risk sits, and it is covered below.</p>

<h2>FX translation: spot rate vs HMRC monthly average (pick one and stick)</h2>

<p>HMRC's <a href="https://www.gov.uk/hmrc-internal-manuals/international-manual">International Manual</a> permits two FX-translation methods for foreign-property income.</p>

<p><strong>Spot rate on transaction date.</strong> Each income or expense item is converted at the exchange rate on the day it arose, sourced from a published forex feed or HMRC's daily rates. It is operationally heavier (every transaction needs a date-specific rate lookup) but more accurate over the year (volatile rates are tracked granularly). It suits you best if you have high transaction volume, or large single transactions where the exact rate matters.</p>

<p><strong>HMRC monthly average exchange rates.</strong> HMRC publishes <a href="https://www.gov.uk/government/collections/exchange-rates-for-customs-and-vat">monthly average exchange rates</a> for major currencies. All transactions in a given calendar month convert at that month's average rate. It is simpler to run (one rate per month per currency) but less granular (intra-month volatility is smoothed away). It suits you best if you have low transaction volume and want the lighter admin.</p>

<p>The choice is yours; the constraint is consistency. Pick one method at the start of the tax year and apply it to every foreign-property transaction in that year. Switching mid-year (some transactions on spot, others on monthly average) is methodology drift, and generates an HMRC enquiry risk if the inconsistency is spotted. You can change method between tax years (spot in 2026/27, monthly average in 2027/28) as long as each year is internally consistent.</p>

<p>Document your choice. Set the FX-translation method as a property-level setting in your software; under enquiry HMRC may ask both for the method used and for the underlying rate-source feed.</p>

<aside>
<p>If you are early in the MTD ITSA setup for a foreign-property portfolio and unsure which FX method to pick, our team will look at your transaction pattern and recommend the lower-friction choice for your case. With one or two foreign properties you will usually land on the HMRC monthly average; high transaction volume usually justifies the spot-rate route.</p>
</aside>

<h2>Foreign tax credit: claimed at final declaration, NOT at quarterly update</h2>

<p>Foreign tax you pay on foreign rental income is reported separately from the quarterly profit-and-loss data. The quarterly updates report gross foreign rental income (in sterling) and gross foreign-property expenses (in sterling); the foreign tax does not net against profit at the quarterly stage. At the end of the year, you claim the foreign tax credit under TIOPA 2010 s.18 at the final declaration (or end-of-period statement) stage, and it reduces your UK tax liability on the foreign rental income, up to a ceiling of the UK tax that would have arisen.</p>

<p>The mechanic: the FTC is the lower of (foreign tax actually paid) or (UK tax on the foreign rental income at your marginal rate). In most cases the foreign tax paid is the lower figure (foreign tax rates on rental income often sit below UK marginal rates if you are a higher-rate taxpayer), so the credit equals the foreign tax paid. Where the foreign tax exceeds the UK tax that would have arisen, the credit caps at the UK tax figure; the excess foreign tax is not refundable and not carried forward.</p>

<p>The point that matters for MTD is the timing: the FTC is a final-declaration item, not a quarterly-update item. For the detailed mechanism, the relevant double-tax-treaty considerations and the worked-through claim, see our <a href="/blog/non-resident-landlord-tax/foreign-tax-credit-uk-property-overseas-landlords">foreign tax credit TIOPA 2010 guide</a>.</p>

<h2>The software-support gap: not every MTD package handles SA106 foreign fields</h2>

<p>The HMRC MTD ITSA API has dedicated endpoints for foreign-property quarterly data, but not every product on the HMRC compatible-software register calls those endpoints. Many products launched in the 2025/26 cohort focused on UK-property and UK self-employment, leaving foreign-property support to later releases. The situation has improved through 2026 but is still not universal; some landlord-specific SaaS products handle foreign property cleanly, others require a paid add-on module, others do not yet support it at all.</p>

<p>If you have any foreign rental income, foreign-property support is a hard requirement, not a nice-to-have. Before you commit to a product, get explicit confirmation from the provider that it handles SA106 foreign-property fields, with the right SA106-to-MTD mapping, and that it can submit the foreign-property quarterly endpoints to HMRC's API. The HMRC compatible-software register lists products that have passed HMRC's general MTD testing; it does not certify per-feature support. Marketing also tends to under-advertise foreign-property capability, so ask for confirmation in writing.</p>

<p>Foreign-property support is one of the six criteria in the broader software-selection framework in our <a href="/blog/making-tax-digital-mtd/mtd-itsa-choosing-software-by-landlord-scenario-decision-tree">MTD software decision-tree guide</a>. If you hold a foreign property, that criterion moves up your priority list.</p>

<h2>Worked example: a Spanish villa generating €30,000 of gross rent</h2>

<p>Say you are UK-resident and own a single villa in Andalusia, let on long-term residential tenancies. Gross rental 2026/27: €30,000. Local agent commission: €3,000. Local maintenance: €2,000. Spanish IRPF (non-resident landlord tax in Spain): 19% on net rental, so roughly €4,750 on net of €25,000. Local management fees: €1,500. You use HMRC's monthly average exchange rates throughout the year; the year-average works out to roughly €1.15/£.</p>

<p>Quarterly mechanics:</p>
<ul>
<li><strong>Each quarterly update reports the period's actual transactions converted at the month's HMRC average rate.</strong> Gross rental approximately £6,500 per quarter (€7,500 at €1.15/£), agent commission £650 per quarter, maintenance and management spread as incurred. Spanish IRPF withheld at source: recorded separately, NOT netted against profit on the quarterly update.</li>
<li><strong>EoPS reconciliation:</strong> annual totals in sterling: gross rental £26,100, expenses (agent £2,600, maintenance £1,750, management £1,300) totalling £5,650, net profit before foreign tax £20,450.</li>
<li><strong>Final declaration:</strong> the £20,450 is taxed at your UK marginal rate (say 40% higher-rate for this example), giving UK liability on the foreign rental of £8,180. Foreign tax paid (Spanish IRPF at €4,750 / €1.15 = £4,130) gives a FTC of £4,130 (lower of foreign tax paid and UK liability). Net UK tax payable on the foreign rental: £8,180 minus £4,130 = £4,050.</li>
</ul>

<p>The same arithmetic applies for a French apartment under French taxe foncière + revenue-fonciers structures, or for a holiday let in Portugal under their non-resident regime; the substantive figures vary by jurisdiction, the MTD mechanic is the same.</p>

<h2>NRL scheme and MTD: how the two run alongside</h2>

<p>A separate but related case is where you are a non-resident landlord with UK property, so the NRL scheme governs UK letting-agent withholding. Both the NRL scheme and MTD ITSA continue to apply from 6 April 2026; neither displaces the other.</p>

<p>The NRL scheme requires UK letting agents to withhold basic rate tax (20%) on UK rental income paid to non-resident landlords, unless you hold NRL1/2/3 approval (which lifts the withholding obligation but does not remove your UK tax liability). The MTD ITSA mandate from 6 April 2026 applies to non-resident landlords with UK property the same way it applies to UK residents: where your qualifying income crosses £50,000 (April 2026 mandate, dropping to £30,000 April 2027, £20,000 April 2028), you are in MTD and must file quarterly updates.</p>

<p>The two regimes interact at the final declaration stage. NRL-withheld tax appears as tax already paid against your year-end UK liability on the rental income, and the MTD ITSA final declaration consolidates the quarterly profit data with the NRL-withheld tax credit. If you hold NRL approval, no withholding has taken place but the MTD filing duty still applies once you meet the qualifying-income test.</p>

<p>The substantive NRL regime (registration, NRL1/2/3 approval, agent obligations, partnership treatment) sits across a wider set of pages; what matters here is the MTD-NRL intersection above.</p>

<h2>Three operational traps with foreign property in MTD</h2>

<p>From early-cohort foreign-property landlords:</p>

<ol>
<li><strong>Assuming foreign income is annual-only and staying out of MTD.</strong> The threshold test aggregates foreign and UK rental income; on £25,000 of UK rental you would otherwise be below the £30,000 line (April 2027 cohort), but you cross it if your foreign rental adds £10,000+. Run the aggregated test before you assume you are out of MTD.</li>
<li><strong>Netting withholding tax against gross income on the quarterly update.</strong> Reporting £24,000 of net-of-Spanish-IRPF rental instead of £30,000 gross understates your qualifying income for the threshold test and distorts the quarterly profit position. Always gross-up; the foreign tax is a separately-tracked figure that feeds the FTC at final declaration.</li>
<li><strong>Finding out at the first quarter-close that your software does not support SA106 fields.</strong> Mid-year software switching is disruptive, and the digital-link rule still applies to migration. Confirm foreign-property support before you commit to a product, not after the first quarterly submission fails.</li>
</ol>

<aside>
<p>Foreign-property MTD ITSA setup is the most software-sensitive sub-case in the early cohort. A product chosen for a UK-only portfolio often does not extend to foreign properties cleanly. We will run a 30-minute scoping call to confirm your chosen software handles foreign-property fields properly before your first quarterly deadline; catching the gap before you submit costs far less than catching it after.</p>
</aside>

<h2>How this fits the rest of the MTD picture</h2>

<p>Foreign property is one sub-case of the wider MTD ITSA cycle. For the headline regime change, see our <a href="/blog/making-tax-digital-mtd/mtd-itsa-overview-six-changes-residential-landlords">six headline changes overview</a>; for the quarterly deadline calendar, <a href="/blog/making-tax-digital-mtd/mtd-quarterly-deadlines-2026-2027-landlords">the quarterly deadlines guide</a>; and for the gross-test that aggregates your foreign rental, the <a href="/blog/making-tax-digital-mtd/mtd-itsa-qualifying-income-test-gross-vs-net">qualifying income gross-vs-net guide</a>.</p>

<p>For the credit mechanism itself (TIOPA 2010 s.18 mechanics, double-tax treaty interactions, the FTC claim form and detail), our <a href="/blog/non-resident-landlord-tax/foreign-tax-credit-uk-property-overseas-landlords">foreign tax credit guide</a> is the place to go, and the six-criteria software-selection framework is in our <a href="/blog/making-tax-digital-mtd/mtd-itsa-choosing-software-by-landlord-scenario-decision-tree">MTD software decision-tree guide</a>. If you own foreign property jointly, you need to combine the joint-ownership mechanics with everything above: our <a href="/blog/making-tax-digital-mtd/mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse">joint-owner quarterly-filing mechanics guide</a> covers the joint cycle, and Form 17 applies to all jointly held property between spouses (UK and foreign).</p>

<h2>The bottom line for foreign-property landlords in MTD</h2>

<p>Your foreign rental income runs through the same MTD ITSA quarterly cycle as your UK rental; it does not get a separate annual return. The threshold aggregates UK and foreign; the SA106 foreign-property fields are the data structure; your FX translation picks spot or monthly average and stays consistent across the year; the foreign tax credit is a final-declaration item, not a quarterly one; and the NRL scheme runs alongside MTD for non-resident landlords with UK property. The single biggest operational risk is software that does not support SA106 foreign-property fields, so confirm yours does before the first quarterly deadline, not after. If you want a second pair of eyes on your software choice or your FX method before the cycle starts, that is exactly the kind of thing we sort out in a short scoping call.</p>
