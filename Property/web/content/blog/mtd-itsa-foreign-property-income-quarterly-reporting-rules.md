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
summary: "Foreign rental property held by a UK-resident landlord sits inside the MTD ITSA filing cycle from 6 April 2026 alongside UK rentals, not in a separate annual return. Foreign property income aggregates with UK property income for the qualifying-income threshold, runs through quarterly updates on the foreign-property stream, translates from local currency to sterling on either the spot rate or HMRC's monthly average (pick one and stick), and the foreign tax credit is claimed at the final declaration stage, not at quarterly update. This page covers the operational mechanics: the SA106 mapping into MTD, the FX-translation choice, the foreign tax credit timing, the software-support gap that catches early-cohort landlords, and the NRL-scheme interaction that runs parallel to MTD for non-resident landlords on UK property."
schema: ""
faqs:
  - question: "Does foreign property income count toward the £50,000 MTD ITSA threshold?"
    answer: "Yes. The qualifying-income test aggregates UK property gross income, foreign property gross income, and self-employment turnover; foreign rental income is included on the same basis as UK rental. A UK-resident landlord with £25,000 of UK rental and £30,000 of Spanish villa rental (sterling-equivalent) tests at £55,000 combined and is in scope for the April 2026 mandate. Foreign rental income is reported on SA106 fields; the figure that feeds the threshold test is gross of foreign tax and gross of any local expenses, in sterling."
  - question: "Which SA106 boxes feed the MTD ITSA quarterly update?"
    answer: "The MTD ITSA quarterly update for foreign property maps to the SA106 foreign-property pages (boxes 14 onwards on the standard SA106 schedule). Each quarterly update reports gross foreign rental income in sterling, foreign-property expenses by category (allowable expenses on foreign property follow the same SA106 categorisation as for UK property: agent fees, repairs, finance costs subject to Section 24 restriction etc), and any property-specific items that the local jurisdiction generates. HMRC's MTD ITSA API has dedicated endpoints for foreign-property quarterly data; the API exists on HMRC's side, the constraint is whether your software calls it."
  - question: "Do I have to use HMRC's published monthly average exchange rates, or can I use spot rates?"
    answer: "Either method is permitted. HMRC's International Manual allows two FX-translation approaches: the spot rate on transaction date (the exchange rate on the day the income or expense arose), or HMRC's published monthly average exchange rates (available on gov.uk). The choice is yours; the constraint is consistency across the year. Switching method mid-year is generally not allowed; choose one method at the start of the tax year and apply it to every transaction in that year. Most UK-resident landlords with one or two foreign properties find the HMRC monthly average simpler operationally; landlords with high transaction volume sometimes prefer spot rates from a forex-API feed for accuracy."
  - question: "Can I switch FX translation methods between tax years?"
    answer: "Yes; the consistency rule applies within a tax year, not across years. A landlord who used HMRC's monthly average rate in 2026/27 can switch to spot rates from 6 April 2027 if they prefer, and vice versa. Document the choice and the reason for switching; HMRC's compliance approach is to look for a reasoned method choice and consistent application, not to mandate one method over the other. Methodology drift mid-year (some transactions on spot, others on monthly average) generates an enquiry risk that the method-switch-between-years approach avoids."
  - question: "When do I claim the foreign tax credit on my MTD ITSA filing?"
    answer: "At the final declaration (or end-of-period statement) stage, not at quarterly update. The quarterly updates report gross foreign rental income before any foreign tax deduction; the foreign tax credit under TIOPA 2010 s.18 is claimed when you reconcile the year at the final declaration. The credit is the lower of (foreign tax actually paid on the foreign rental income) or (UK tax that would have arisen on that foreign rental income); typically the foreign tax paid is the lower figure and forms the credit. The credit is non-refundable, meaning it can reduce your UK tax to zero on the foreign rental income but does not generate a refund of foreign tax."
  - question: "What if my MTD software doesn't support SA106 foreign-property fields?"
    answer: "It is a hard blocker. You cannot file MTD ITSA quarterly updates with foreign-property income on a product that does not support the SA106 foreign-property API endpoints. The fix is to switch to a product that does. Many MTD products in the early-2026 cohort launched without foreign-property support; the situation has improved but is still not universal. Before committing to a product, check the HMRC compatible-software register and verify foreign-property support explicitly (vendors do not always advertise this clearly). The software decision-tree page covers the broader product-selection framework; foreign-property support is question 2 in that framework."
  - question: "I'm a UK resident with a property in the EU. Does the post-Brexit position change anything for MTD?"
    answer: "Not directly. The UK leaving the EU did not change the UK domestic tax treatment of UK-resident landlords' foreign rental income; UK residents have always been taxed on worldwide rental income on the arising basis. The post-Brexit change that does affect some landlords is the loss of EU-specific reliefs (e.g. capital allowances rules for EEA holiday lets after FHL abolition), but this affects the substantive tax position, not the MTD reporting mechanic. The MTD ITSA reporting flow for an EU property is identical to the MTD flow for a non-EU property: SA106 categorisation, FX translation, FTC at final declaration."
  - question: "Do I report foreign rental in the local currency or in sterling on the quarterly update?"
    answer: "Sterling, always. MTD ITSA reporting is in pounds sterling; the local currency does not appear on the submitted figures. The FX translation (per the spot vs monthly-average choice) converts each transaction at recording time, and the sterling figures flow into the quarterly update. Most software products capture the foreign-currency original amount in a notes field for audit-trail purposes, but the figure reported to HMRC is sterling. Keep digital records of both the original foreign-currency amount AND the sterling-converted amount; under enquiry, HMRC may ask for the source-currency figure and the FX rate used."
  - question: "My foreign letting agent withholds tax at source. How does that flow into my MTD filing?"
    answer: "Report the gross rental income (before the local withholding tax) on the quarterly update; the foreign tax withheld is the foreign tax that feeds the foreign tax credit calculation at final declaration. If the foreign letting agent pays you net of a 10% withholding tax on €1,000 of gross rent, your software entry is €1,000 gross income (in sterling at the chosen FX rate) and €100 of foreign tax paid (recorded separately for the FTC calculation). Do not net the withholding against the gross income on the quarterly update; the gross-vs-net distinction matters both for the threshold test and for the FTC mechanism."
  - question: "How does the NRL scheme interact with MTD if I'm a non-resident with UK property?"
    answer: "Non-resident landlord (NRL) scheme withholding by UK letting agents (basic rate 20% absent NRL1/2/3 approval) continues to apply alongside MTD ITSA from 6 April 2026; the two regimes run in parallel and neither displaces the other. The non-resident landlord with qualifying UK property income above the MTD threshold still files MTD quarterly updates (from their overseas address, via UK-recognised software), and the NRL withholding is treated as tax already paid against the final UK liability. The MTD filing duty does NOT end because NRL withholding is in place. For the detail of NRL scheme operational mechanics see house position §17.5; this page covers only the MTD intersection."
  - question: "Can I deduct foreign-property expenses in the quarter they were incurred, even if I haven't yet paid them?"
    answer: "Depends on whether you elect cash basis or accruals basis on SA106. Cash basis: deduct when paid; accruals: deduct when incurred. The election is the same per-property election as for UK property; you elect once per property and apply it consistently. Foreign property has the same election as the equivalent UK property; you cannot mix bases within one property. For multi-property landlords with both UK and foreign properties, the election can differ between properties, but each property is consistent year on year. Cash basis is the default for most small landlords; accruals matters mostly for landlords with significant timing-difference items (advance rent, deferred maintenance bills)."
  - question: "What if I sell the foreign property mid-tax-year?"
    answer: "The MTD quarterly cycle continues to the point of disposal, then cessation reporting kicks in. The quarter in which the property is sold reports the rental income up to disposal date; the final declaration for the year reconciles the year as a whole. The disposal itself is a capital gains event reported through the UK CGT regime (the foreign-property-disposal CGT 60-day return obligation applies if there is a chargeable gain), separate from the MTD ITSA income filings. If the foreign disposal triggers local-jurisdiction tax (Spanish capital gains, French plus-value etc), the foreign tax credit at final declaration handles the income-tax side; the CGT side handles separately. We cover the mid-year cessation mechanic for property generally in our forthcoming cessation page."
dateModified: "2026-05-23"
reviewedBy: "ICAEW Qualified Senior Reviewer"
reviewerCredentials: "Chartered Accountant (ACA, ICAEW), Property Tax Specialist"
reviewedAt: "2026-05-23"
editorialNote: "Wave 4 net-new (Session B, MTD ITSA operational details). Operational reporting mechanics for foreign rental income inside the MTD ITSA cycle from 6 April 2026. Distinct from the existing Wave 2 foreign-tax-credit page which covers credit-mechanism only; this page covers the MTD reporting flow. Cross-links to the FTC page as the credit-mechanism reference."
---

<p>A UK-resident landlord with a Spanish villa, a French apartment, or a holiday let in Portugal does not file foreign rental income on a separate annual return from April 2026. Foreign property income runs through the same MTD ITSA quarterly cycle as the landlord's UK portfolio, aggregates with UK rental for the qualifying-income threshold test, and reports against the SA106 foreign-property fields on each quarterly update. The foreign tax credit, the FX translation, and the NRL-scheme interaction (for non-resident landlords with UK property) all sit on top of the same MTD architecture, but they each have a specific timing and mechanic that competitor coverage tends to gloss over.</p>

<p>This page covers the operational layer: where foreign property fits in the qualifying-income test, the SA106 mapping into the MTD quarterly stream, the FX-translation choice (spot vs monthly average), the foreign tax credit timing (final declaration, not quarterly), the software-support gap that catches early-cohort landlords, the NRL-scheme interaction, and the operational traps. For the substantive foreign-tax-credit mechanism, our <a href="/blog/non-resident-landlord-tax/foreign-tax-credit-uk-property-overseas-landlords">foreign tax credit TIOPA 2010 page</a> is the dedicated reference; this page assumes you understand the FTC exists and covers how it plays through the MTD cycle.</p>

<h2>Where foreign property fits in MTD ITSA</h2>

<p>Foreign rental income for a UK-resident landlord is UK-taxable on the arising basis (worldwide rental income, with foreign-tax credit available where the foreign jurisdiction also taxes the rental). From 6 April 2026, that UK reporting moves into the MTD ITSA cycle along with the landlord's UK rental income. Two consequences follow.</p>

<p>First, foreign rental income counts toward the qualifying-income threshold. A landlord with £25,000 of UK rental and €35,000 of Spanish rental (sterling equivalent around £30,000) tests at £55,000 combined and is in scope for the April 2026 mandate, even though neither stream individually crosses the £50,000 line. The aggregation is on the gross side, so the £55,000 figure is before any foreign tax credit, before any allowable expenses, and before any FX-translation method choices that net down individual transactions. See our <a href="/blog/making-tax-digital-mtd/mtd-itsa-qualifying-income-test-gross-vs-net">qualifying income gross-vs-net page</a> for the threshold-test mechanic on the gross-vs-net distinction.</p>

<p>Second, the quarterly reporting stream is the foreign-property stream specifically; foreign-property data does not commingle with UK-property data on the quarterly update. Most MTD software products handle this by setting up the foreign property as a separate property entity inside the same MTD enrolment, with its own income-and-expense categorisation. The submission to HMRC's MTD ITSA API uses the foreign-property endpoints; the UK-property data is on UK endpoints. The two streams reconcile at the final declaration into the consolidated SA picture.</p>

<h2>The SA106 mapping into the MTD quarterly stream</h2>

<p>The data points that flow into each foreign-property quarterly update map to the SA106 foreign-property pages from the older annual self-assessment return. The categorisation discipline is the same; the timing is different (quarterly rather than annual).</p>

<ul>
<li><strong>Gross foreign rental income</strong> (per property, in sterling at chosen FX rate).</li>
<li><strong>Allowable expenses</strong> by category, following the SA106 line headings: agent fees, repairs and maintenance, finance costs (subject to Section 24 restriction for residential foreign property the same way as for UK property), insurance, local taxes (where deductible per the foreign jurisdiction's rules and the UK SA106 treatment), other allowable.</li>
<li><strong>Foreign tax paid</strong>, recorded separately. This does not reduce the quarterly-update profit; it feeds the foreign tax credit at final declaration.</li>
<li><strong>Income type tagging</strong>: residential vs commercial vs furnished-holiday-letting-legacy (FHL was abolished from April 2025, but transitional cases continue to report under their pre-abolition treatment).</li>
</ul>

<p>The HMRC MTD ITSA API has dedicated endpoints for the foreign-property quarterly data; the constraint is software, not HMRC infrastructure. Section "the software-support gap" below covers the practical implication.</p>

<h2>FX translation: spot rate vs HMRC monthly average (pick one and stick)</h2>

<p>HMRC's <a href="https://www.gov.uk/hmrc-internal-manuals/international-manual">International Manual</a> permits two FX-translation methods for foreign-property income.</p>

<p><strong>Spot rate on transaction date.</strong> Each income or expense item is converted at the exchange rate on the day it arose, sourced from a published forex feed or HMRC's daily rates. Operationally heavier (every transaction needs a date-specific rate lookup), more accurate over the year (volatile rates are tracked granularly). Best suited to landlords with high transaction volume or with large single transactions where the exact rate matters.</p>

<p><strong>HMRC monthly average exchange rates.</strong> HMRC publishes <a href="https://www.gov.uk/government/collections/exchange-rates-for-customs-and-vat">monthly average exchange rates</a> for major currencies. All transactions in a given calendar month convert at that month's average rate. Operationally simpler (one rate per month per currency), less granular (intra-month volatility is smoothed away). Best suited to landlords with low transaction volume and a preference for administrative simplicity.</p>

<p>The choice is yours; the constraint is consistency. Pick one method at the start of the tax year and apply it to every foreign-property transaction in that year. Switching mid-year (some transactions on spot, others on monthly average) is methodology drift, which generates an HMRC enquiry risk if the inconsistency is spotted. You can change method between tax years (spot in 2026/27, monthly average in 2027/28) as long as each year is internally consistent.</p>

<p>Document the choice. Software setup should record the FX-translation method as a property-level setting; under enquiry HMRC may ask both for the method used and for the underlying rate-source feed.</p>

<aside>
<p>If you are early in the MTD ITSA setup for a foreign-property portfolio and uncertain which FX method to pick, our team will look at your transaction pattern and recommend the lower-friction choice for your case. Most landlords with one or two foreign properties end up on the HMRC monthly average; high-transaction landlords usually justify the spot-rate route.</p>
</aside>

<h2>Foreign tax credit: claimed at final declaration, NOT at quarterly update</h2>

<p>Foreign tax paid on foreign rental income is reported separately from the quarterly profit-and-loss data. The quarterly updates report gross foreign rental income (in sterling) and gross foreign-property expenses (in sterling); the foreign tax does not net against profit at the quarterly stage. At the end of the year, the foreign tax credit under TIOPA 2010 s.18 is claimed at the final declaration (or end-of-period statement) stage; the credit reduces the UK tax liability on the foreign rental income, up to a ceiling of the UK tax that would have arisen.</p>

<p>The mechanic: the FTC is the lower of (foreign tax actually paid) or (UK tax on the foreign rental income at your marginal rate). In most cases the foreign tax paid is the lower figure (foreign tax rates on rental income often sit below UK marginal rates for higher-rate landlords), so the credit equals the foreign tax paid. Where the foreign tax exceeds the UK tax that would have arisen, the credit caps at the UK tax figure; the excess foreign tax is not refundable and not carried forward.</p>

<p>For the detailed FTC mechanism, the relevant double-tax-treaty considerations, and the worked-through claim mechanics, our <a href="/blog/non-resident-landlord-tax/foreign-tax-credit-uk-property-overseas-landlords">foreign tax credit TIOPA 2010 page</a> is the dedicated reference. This page covers only the MTD-timing implication: the FTC is a final-declaration item, not a quarterly-update item.</p>

<h2>The software-support gap: not every MTD package handles SA106 foreign fields</h2>

<p>The HMRC MTD ITSA API has dedicated endpoints for foreign-property quarterly data, but not every product on the HMRC compatible-software register calls those endpoints. Many products launched in the 2025/26 cohort focused on UK-property and UK self-employment, leaving foreign-property support to later releases. The situation has improved through 2026 but is still not universal; some landlord-specific SaaS products handle foreign property cleanly, others require a paid add-on module, others do not yet support it at all.</p>

<p>For a landlord with any foreign rental income, foreign-property support is a hard requirement, not a nice-to-have. Before committing to a product, verify explicitly with the vendor that the product handles SA106 foreign-property fields, with the right SA106-to-MTD mapping, and that the product can submit the foreign-property quarterly endpoints to HMRC's API. The HMRC compatible-software register lists products that have passed HMRC's general MTD testing; it does not certify per-feature support. Vendor marketing also tends to under-advertise foreign-property capability; ask for explicit confirmation in writing.</p>

<p>The broader software-selection framework is in our <a href="/blog/making-tax-digital-mtd/mtd-itsa-choosing-software-by-landlord-scenario-decision-tree">MTD software decision-tree page</a>; foreign-property support is one of the six evaluation criteria in that framework. For a foreign-property landlord, that criterion moves up the priority list.</p>

<h2>Worked example: a Spanish villa generating €30,000 of gross rent</h2>

<p>A UK-resident landlord owns a single villa in Andalusia, let on long-term residential tenancies. Gross rental 2026/27: €30,000. Local agent commission: €3,000. Local maintenance: €2,000. Spanish IRPF (non-resident landlord tax in Spain): 19% on net rental, so roughly €4,750 on net of €25,000. Local management fees: €1,500. The landlord uses HMRC's monthly average exchange rates throughout the year; the year-average works out to roughly €1.15/£.</p>

<p>Quarterly mechanics:</p>
<ul>
<li><strong>Each quarterly update reports the period's actual transactions converted at the month's HMRC average rate.</strong> Gross rental approximately £6,500 per quarter (€7,500 at €1.15/£), agent commission £650 per quarter, maintenance and management spread as incurred. Spanish IRPF withheld at source: recorded separately, NOT netted against profit on the quarterly update.</li>
<li><strong>EoPS reconciliation:</strong> annual totals in sterling: gross rental £26,100, expenses (agent £2,600, maintenance £1,750, management £1,300) totalling £5,650, net profit before foreign tax £20,450.</li>
<li><strong>Final declaration:</strong> the £20,450 is taxed at the landlord's UK marginal rate (let's say 40% higher-rate for this example), UK liability on the foreign rental £8,180. Foreign tax paid (Spanish IRPF at €4,750 / €1.15 = £4,130) gives a FTC of £4,130 (lower of foreign tax paid and UK liability). Net UK tax payable on the foreign rental: £8,180 minus £4,130 = £4,050.</li>
</ul>

<p>The same arithmetic applies for a French apartment under French taxe foncière + revenue-fonciers structures, or for a holiday let in Portugal under their non-resident regime; the substantive figures vary by jurisdiction, the MTD mechanic is the same.</p>

<h2>NRL scheme and MTD: how the two run alongside</h2>

<p>A separate but related case: a non-resident landlord with UK property, where the NRL scheme governs UK letting-agent withholding. Both the NRL scheme and MTD ITSA continue to apply from 6 April 2026; neither displaces the other.</p>

<p>The NRL scheme requires UK letting agents to withhold basic rate tax (20%) on UK rental income paid to non-resident landlords, unless the landlord holds NRL1/2/3 approval (which lifts the withholding obligation but does not remove the landlord's UK tax liability). The MTD ITSA mandate from 6 April 2026 applies to non-resident landlords with UK property the same way it applies to UK residents: where qualifying income crosses £50,000 (April 2026 mandate, dropping to £30,000 April 2027, £20,000 April 2028), the landlord is in MTD and must file quarterly updates.</p>

<p>The two regimes interact at the final declaration stage. NRL-withheld tax appears as tax already paid against the year-end UK liability on the rental income; the MTD ITSA final declaration consolidates the quarterly profit data with the NRL-withheld tax credit. Where the landlord has NRL approval, no withholding has taken place but the MTD filing duty still applies on the qualifying-income test.</p>

<p>For the NRL scheme operational mechanics in detail (registration, NRL1/2/3 approval, agent obligations, partnership treatment), house position §17.5 is the internal tie-breaker. This page covers only the MTD-NRL intersection; the substantive NRL regime sits across a wider set of pages.</p>

<h2>Three operational traps with foreign property in MTD</h2>

<p>From early-cohort foreign-property landlords:</p>

<ol>
<li><strong>The landlord assumes foreign income is annual-only and does not enter MTD.</strong> The threshold test aggregates foreign and UK rental income; a landlord on £25,000 UK rental who would otherwise be below the £30,000 line (April 2027 cohort) crosses if their foreign rental adds £10,000+. Run the aggregated test before assuming you are out of MTD.</li>
<li><strong>The landlord nets withholding tax against gross income on the quarterly update.</strong> Reporting £24,000 of net-of-Spanish-IRPF rental instead of £30,000 gross understates qualifying income for threshold test purposes and distorts the quarterly profit position. Always gross-up; the foreign tax is a separately-tracked figure that feeds the FTC at final declaration.</li>
<li><strong>The software does not support SA106 fields and the landlord discovers this at the first quarter-close.</strong> Mid-year software switching is disruptive; the digital-link rule still applies to migration. Verify foreign-property support before committing to a product, not after the first quarterly submission fails.</li>
</ol>

<aside>
<p>Foreign-property MTD ITSA setup is the most software-sensitive sub-case in the early cohort. The product picks landlords made for UK-only portfolios often don't extend to foreign properties cleanly. We will run a 30-minute scoping call to confirm your chosen software handles foreign-property fields properly before your first quarterly deadline; the cost of catching the gap pre-submission is materially lower than catching it post-submission.</p>
</aside>

<h2>Where this page sits</h2>

<p>The foreign-property MTD mechanic is one operational sub-case of the broader MTD ITSA cycle. The headline regime change is covered in our <a href="/blog/making-tax-digital-mtd/mtd-itsa-overview-six-changes-residential-landlords">six headline changes overview</a>; the quarterly deadline calendar is in <a href="/blog/making-tax-digital-mtd/mtd-quarterly-deadlines-2026-2027-landlords">the quarterly deadlines page</a>; the qualifying-income test (the threshold gross-test that aggregates foreign rental) is in the <a href="/blog/making-tax-digital-mtd/mtd-itsa-qualifying-income-test-gross-vs-net">qualifying income gross-vs-net page</a>.</p>

<p>The substantive foreign tax credit mechanism (TIOPA 2010 s.18 mechanics, double-tax treaty interactions, the FTC claim form and detail) is in our <a href="/blog/non-resident-landlord-tax/foreign-tax-credit-uk-property-overseas-landlords">foreign tax credit page</a>; that is the dedicated reference for the credit mechanism itself. The software-selection framework is in the <a href="/blog/making-tax-digital-mtd/mtd-itsa-choosing-software-by-landlord-scenario-decision-tree">MTD software decision-tree page</a>; foreign-property support is one of the six evaluation criteria. Joint-owner couples with foreign property need to combine the joint-ownership mechanics with the foreign-property mechanics; the <a href="/blog/making-tax-digital-mtd/mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse">joint-owner quarterly-filing mechanics page</a> covers the joint-cycle architecture and Form 17 applies to all jointly held property between spouses (UK and foreign).</p>

<h2>The bottom line for foreign-property landlords in MTD</h2>

<p>Foreign rental income runs through the same MTD ITSA quarterly cycle as your UK rental; it does not get a separate annual return. The threshold aggregates UK and foreign; the SA106 foreign-property fields are the data structure; FX translation picks spot or monthly average and stays consistent across the year; the foreign tax credit is a final-declaration item, not a quarterly item; the NRL scheme runs alongside MTD for non-resident landlords with UK property. The single biggest operational risk is software that does not support SA106 foreign-property fields; verify before the first quarterly deadline, not after.</p>
