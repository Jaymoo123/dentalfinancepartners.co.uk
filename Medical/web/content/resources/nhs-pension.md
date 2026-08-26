---
title: "NHS Pension Annual Allowance Spreadsheet: What the Model Calculates, and Where It Stops"
slug: nhs-pension
topic: nhs-pension
resourceLabel: "NHS pension annual allowance taper model"
resourceId: "nhs-pension-model.xlsx"
summary: "Documentation for the downloadable annual allowance workbook: the numbers it asks for, the formula behind every output cell, how it builds adjusted income and applies three years of carry-forward, and the two things it still leaves out."
version: "2026/27"
lastReviewed: "2026-08-26"
date: "2025-09-01"
author: "Medical Accountants UK"
---

<h2 id="what-this-page-is">What this page is</h2>

<p>This is the manual for the spreadsheet, not another explanation of the annual allowance. It tells you what to type into the workbook, what each output cell is doing arithmetically, and the two places where the model still stops short of your real position. If you want the annual allowance on the NHS pension explained from first principles, the <a href="/blog/nhs-pension-annual-allowance-complete-guide">complete guide to the NHS pension annual allowance</a> does that, and the <a href="/calculators/nhs-pension-annual-allowance">annual allowance calculator</a> runs the core arithmetic in the browser if you would rather not download anything.</p>

<p>Both surfaces now take the same inputs, including pension saving outside the NHS scheme and carry-forward, and both carry the same status wording. The reason to use the workbook instead is that it takes carry-forward as a figure per year and shows you which year gets consumed, where the calculator takes a single total. It also lets you change one figure and watch the charge move, and hand the file to someone else with your assumptions visible. That last part is why its limitations matter: a saved file gets reused, and a reused file gets trusted.</p>

<h2 id="three-numbers">Before you open it: the numbers you need</h2>

<p>All the inputs sit on the "Your figures" tab in the tinted cells.</p>

<ul>
<li><strong>Threshold income for the year.</strong> Your net income for the tax year, with any gross personal pension contributions paid with relief at source taken off and any salary sacrifice entered into on or after 9 July 2015 added back. For most doctors this is NHS pay after member contributions, plus private practice or locum profit, plus investment income.</li>
<li><strong>NHS pension input amount.</strong> The growth in the capital value of your NHS benefits over the year, which is the figure the annual allowance is measured against. It is not what you paid in, and for a defined benefit scheme the two are usually nothing like each other. Take it from the pension savings statement NHSBSA issues, rather than estimating it.</li>
<li><strong>Pension input to every other registered scheme.</strong> A SIPP, a personal pension, Money Purchase AVCs, a spouse-employer scheme you are a member of, anything. Gross contributions for a defined contribution pot, or the input amount from that scheme's own savings statement. Leave it at zero only if the NHS scheme really is your only pension.</li>
<li><strong>Your marginal income tax rate,</strong> entered as 0.20, 0.40 or 0.45.</li>
<li><strong>Unused annual allowance for each of the previous three tax years,</strong> one cell per year. These are on your NHSBSA pension savings statements. Leave them at zero if you genuinely have none, but read the carry-forward section below before you do.</li>
</ul>

<p>If you do not have a pension savings statement, the model has nothing reliable to work with. Request one from NHSBSA first. Guessing the input amount is the single most common way to get a confident wrong answer out of this file.</p>

<h2 id="the-tabs">What each tab holds</h2>

<ul>
<li><strong>Start here.</strong> Orientation and the tax rate codes.</li>
<li><strong>Your figures.</strong> The inputs, including the three carry-forward years, the intermediate steps, and a summary panel to the right.</li>
<li><strong>Rates.</strong> The statutory constants, as named ranges the formulas point at. The sheet is protected because editing a constant silently changes every downstream cell.</li>
<li><strong>Notes.</strong> The assumptions, restated inside the file so they travel with it.</li>
</ul>

<p>The Rates tab is labelled 2026/27 and every constant on it was checked on 26 August 2026. The standard annual allowance is £60,000, the tapered minimum is £10,000, the threshold income trigger is £200,000 and the adjusted income trigger is £260,000, all confirmed at <a href="https://www.gov.uk/government/publications/rates-and-allowances-pension-schemes/pension-schemes-rates" rel="nofollow">gov.uk pension schemes rates and allowances</a>, which lists identical values under "2026 to 2027" and "2025 to 2026". Files downloaded before that date carried the same numbers under a 2025/26 label.</p>

<h2 id="how-the-taper-is-calculated">How the taper is calculated inside the model</h2>

<p>The formulas run in this order.</p>

<ol>
<li><strong>Total pension input amount</strong> is your NHS input amount plus the input to every other scheme you entered. The annual allowance is measured across all your registered pension schemes together, so this total is what the rest of the sheet works from.</li>
<li><strong>Adjusted income</strong> is threshold income plus that total pension input amount.</li>
<li><strong>The taper test</strong> is an AND, not an OR. Both threshold income above £200,000 and adjusted income above £260,000 must be true. Fail either and the cell reads "No" and the reduction stays at zero.</li>
<li><strong>The reduction</strong> is half of the adjusted income above £260,000.</li>
<li><strong>Your annual allowance</strong> is £60,000 less that reduction, floored at £10,000.</li>
<li><strong>The excess before carry-forward</strong> is the total pension input amount less your allowance, floored at zero.</li>
<li><strong>Carry-forward</strong> is then applied, taking the earliest of the three prior years first, and what survives is the <strong>chargeable excess</strong>. <strong>The charge</strong> is that chargeable excess multiplied by your marginal rate.</li>
</ol>

<p>There is a check row underneath that should always read OK, and a carry-forward status row that tells you in plain words whether you have entered any. If the check row ever reads ERROR, a formula has been overwritten and the file should be downloaded again.</p>

<h3 id="adjusted-income-construction">Why adjusted income is built that way</h3>

<p>The statutory definition sits in section 228ZA of the Finance Act 2004 and is worked through at <a href="https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm057100" rel="nofollow">HMRC's PTM057100</a>, both read on 26 August 2026. Adjusted income starts from your net income for the year, adds back pension contributions relieved under a net pay arrangement, and adds the total pension input amount less your own contributions. Threshold income, defined in the same section, starts from the same net income and takes off your gross relief at source contributions.</p>

<p>Work that through and the add-backs cancel: starting from threshold income, adjusted income comes to threshold income plus the total pension input amount across every scheme. That is exactly what the model does. The version of this file published before 26 August 2026 added only the NHS input amount, which was fine for a doctor whose only pension is NHS accrual and understated adjusted income for everybody else. A consultant on threshold income of £210,000 with £45,000 of NHS growth and £20,000 into a SIPP was told adjusted income was £255,000 and no taper applied. It is £275,000, the taper does apply, the allowance is £52,500 rather than £60,000, and there is a £12,500 excess. If that was you, download the file again.</p>

<p>One case the model does not get exactly right, in the safe direction: salary sacrifice arrangements entered into on or after 9 July 2015 are added back to threshold income and are also inside the pension input amount, so adjusted income reads high. That can show more taper than applies, never less.</p>

<h3 id="reading-the-output">Reading the output: a full pass through the model</h3>

<p>Take a consultant with threshold income of £210,000, an NHS pension input amount of £70,000, no other scheme, paying tax at the higher rate, and leaving the carry-forward cells at zero.</p>

<ul>
<li>Total pension input amount: £70,000</li>
<li>Adjusted income: £210,000 + £70,000 = £280,000</li>
<li>Taper test: threshold income £210,000 is above £200,000, and adjusted income £280,000 is above £260,000, so the taper applies</li>
<li>Reduction: (£280,000 - £260,000) / 2 = £10,000</li>
<li>Annual allowance: £60,000 - £10,000 = £50,000</li>
<li>Excess before carry-forward: £70,000 - £50,000 = £20,000</li>
<li>Carry-forward used: £0, because the three cells are empty</li>
<li>Chargeable excess: £20,000, and the charge is £20,000 x 40% = £8,000</li>
</ul>

<p>Now fill the carry-forward cells in. Say the savings statements show £8,000 unused three years ago, £7,000 two years ago and £5,000 last year. The model takes the earliest first, uses all £20,000, and the chargeable excess and the charge both fall to nil. Only £5,000 of unused allowance three years back, and nothing else, gives a chargeable excess of £15,000 and a charge of £6,000.</p>

<p>One consequence the model flags but does not act on: this position qualifies for mandatory Scheme Pays where a charge remains, because the charge is above £2,000 and the NHS scheme growth on its own is above the standard £60,000 allowance. That is dealt with below.</p>

<h2 id="the-four-omissions">Carry-forward, and the two things the model still leaves out</h2>

<h3 id="omission-carry-forward">Carry-forward, which is now in the file</h3>

<p>Unused allowance from the previous three tax years can be set against a current-year excess, with the current year's allowance used first and then the earliest of the three, per <a href="https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm055100" rel="nofollow">HMRC's PTM055100</a>, read on 26 August 2026. You must have been a member of a registered pension scheme in each year you carry forward from.</p>

<p>The workbook models this with one input cell per year and shows how much of each year gets consumed. This is the single most frequent reason a doctor sees a charge and owes nothing, so the sheet does two things about it. The chargeable excess row is separate from the excess row, so you can see what carry-forward removed. And a carry-forward status row reads "CARRY-FORWARD NOT ENTERED: any charge above is BEFORE carry-forward and may be extinguished by it" for as long as all three cells sit at zero, inside the file, where you will see it even if this page is long forgotten.</p>

<p>Earlier versions of this workbook had no prior-year cells at all and would show a charge for a doctor who owed nothing.</p>

<h3 id="omission-scheme-pays">1. Scheme Pays, which changes who writes the cheque</h3>

<p>The model tells you the size of a charge, not how it gets settled. Mandatory Scheme Pays is available where the charge exceeds £2,000 and the NHS pension input amount alone exceeds the standard £60,000 allowance, in exchange for a permanent reduction to your benefits at scheme-set factors. The election deadline and the extension that applies when NHSBSA issues a revised statement are both handled on the <a href="/calculators/nhs-pension-scheme-pays">Scheme Pays calculator</a>, and in more depth on <a href="/blog/nhs-pension-scheme-pays-doctors-deadlines">Scheme Pays deadlines for doctors</a>. As a marker while you have the file open: a 2026/27 charge must be elected by 31 July 2028.</p>

<h3 id="omission-non-nhs">2. The money purchase annual allowance</h3>

<p>Inputs to a personal pension, a SIPP or Money Purchase AVCs are now in the file, in the other-schemes cell, and count towards the same allowance. What is not in the file is the money purchase annual allowance: if you have flexibly accessed a defined contribution pot, a separate £10,000 allowance applies to money purchase savings from that point, alongside the main allowance on the rest. The model has one allowance, so it will not catch a money purchase breach. If you have taken flexible drawdown from a DC pot, the file's answer is incomplete and you need advice rather than a spreadsheet.</p>

<h2 id="where-to-go-next">Where the model stops and the rest of the site takes over</h2>

<p>Short version of each, then follow the link.</p>

<ul>
<li><strong>The allowance and the taper explained properly.</strong> Definitions, the interaction with the lump sum allowance that replaced the lifetime allowance, and what to do about a recurring charge: <a href="/blog/nhs-pension-annual-allowance-complete-guide">the complete guide</a>.</li>
<li><strong>Settling a charge through the scheme.</strong> Mandatory against voluntary, the deadline limbs, and the benefit reduction: <a href="/calculators/nhs-pension-scheme-pays">Scheme Pays calculator</a>.</li>
<li><strong>What you actually pay into the scheme.</strong> Member contributions are tiered on pensionable pay and the bands were uplifted on 1 April 2026, which is a separate calculation from anything on this page: <a href="/calculators/nhs-superannuation-tiered-contribution">tiered contribution calculator</a>.</li>
<li><strong>Revised statements for 2015 to 2022.</strong> If NHSBSA has reissued a savings statement for the remedy period, your historic input amounts have moved and so has your carry-forward: <a href="/blog/mccloud-remedy-nhs-pension-doctors-explained">the McCloud remedy explained</a>.</li>
<li><strong>Drawing benefits while still working.</strong> Partial retirement changes both accrual and the input amount from the date it takes effect: <a href="/blog/nhs-pension-partial-retirement-doctors-guide">partial retirement for doctors</a>.</li>
<li><strong>Reducing a charge you cannot carry forward away.</strong> <a href="/blog/nhs-pension-tax-charges-how-to-minimize">Minimising NHS pension tax charges</a>.</li>
</ul>

<h2 id="questions">Questions about the model</h2>

<h3 id="q-contributions">Can I use my contributions instead of the pension input amount?</h3>

<p>No, and it is the error that produces the largest mistakes. In a defined benefit scheme the input amount reflects the capitalised growth in your promised pension, which moves with pay rises and revaluation, not with what left your payslip. A year with a significant pay award can produce an input amount several times your contributions.</p>

<h3 id="q-locum">I am a locum with income from several places. Which figure is the input amount?</h3>

<p>One figure, covering all of your NHS accrual for the year. If you pension freelance locum work through Locum forms A and B, that accrual is inside the same total, which is one more reason a missed submission window matters beyond the accrual itself.</p>

<h3 id="q-two-years">Can I model two years at once?</h3>

<p>Not in one copy. The file models one current year plus the three carry-forward years behind it, as figures you type in. To run a second year, save a copy of the file per year. It has no logic that rolls one year's unused allowance into the next automatically.</p>

<h3 id="q-numbers-change">Which tax year is the file on?</h3>

<p>2026/27. The Rates tab says so and every constant on it was checked against gov.uk on 26 August 2026. Copies downloaded before that date carry the same numbers under a 2025/26 label, which was a stale label rather than a stale figure. Before relying on the file in a later tax year, check the Rates tab against the current gov.uk figures rather than assuming they have carried forward again.</p>

<h3 id="q-charge-real">The model shows a charge. What is the first thing to do?</h3>

<p>Get the pension savings statement if you were working from an estimate, then check the carry-forward cells actually reflect the previous three years. If they are still at zero, the charge on screen is a before-carry-forward figure and the status row in the file will say so. Only once those two are right is the charge worth acting on.</p>
