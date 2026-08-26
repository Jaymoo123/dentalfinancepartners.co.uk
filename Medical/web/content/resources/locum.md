---
title: "Doctor Take-Home Pay Spreadsheet: What the Model Calculates, and Where It Stops"
slug: locum
topic: locum
resourceLabel: "locum doctor take-home pay model"
resourceId: "doctor-take-home-model.xlsx"
summary: "Documentation for the downloadable take-home workbook: the four inputs, the formula behind each deduction, the one place the income tax line is still a simplification, and what a locum doctor's real self-assessment adds on top."
version: "2026/27"
lastReviewed: "2026-08-26"
date: "2025-09-01"
author: "Medical Accountants UK"
---

<h2 id="what-this-page-is">What this page is</h2>

<p>This is the manual for the spreadsheet. It covers what the four input cells expect, what each deduction formula is doing, and the places where the file is simpler than your tax return. It is not a guide to locum doctor tax; <a href="/blog/locum-doctor-tax-complete-guide">the complete guide for locum doctors</a> is, and the <a href="/calculators/locum-tax-calculator">locum tax calculator</a> runs the same arithmetic in the browser.</p>

<p>The workbook earns its keep when you are comparing scenarios: an extra day a week, a big equipment purchase, a pension contribution you are undecided about. Change one cell and everything downstream moves. That is also the risk, because a file you keep is a file you stop questioning.</p>

<h2 id="four-inputs">The four inputs</h2>

<p>All four sit in the tinted cells on the "Your figures" tab.</p>

<ul>
<li><strong>Gross fees for the year.</strong> Everything invoiced or received from self-employed work, before any deduction. If you also hold a substantive PAYE post, its salary does not belong in this cell (see the limitations below).</li>
<li><strong>Allowable business expenses.</strong> A single total. Everything you claim has to be wholly and exclusively for the work, so anything with a private element is either apportioned or left out.</li>
<li><strong>Personal pension contributions.</strong> Contributions to a personal pension or SIPP, gross, not NHS scheme contributions. This cell moves your income tax. It deliberately does not touch your Class 4 National Insurance, for the reason set out below.</li>
<li><strong>Student loan plan,</strong> as a code: 0 for none, 1, 2 or 4 for the corresponding plan.</li>
</ul>

<p>Expenses being a single cell is the model's biggest usability compromise. Building that total is most of the work of a locum's return, and the <a href="/calculators/doctor-expenses-tax-relief">doctor expenses calculator</a> exists to produce it. Two figures to have in mind while you do: business mileage between sites runs at 55p a mile for the first 10,000 business miles in 2026/27 and 25p after that, and the journey from home to your first site of the day is commuting rather than business travel. Your GMC retention fee, medical indemnity, relevant Royal College fees and BMA subscription are all deductible, and <a href="/blog/locum-doctor-expenses-what-you-can-claim">what a locum doctor can claim</a> works through the rest.</p>

<h2 id="the-tabs">What each tab holds</h2>

<ul>
<li><strong>Start here.</strong> Orientation and the student loan plan codes.</li>
<li><strong>Your figures.</strong> Inputs, the deduction stack, and a summary panel to the right.</li>
<li><strong>Rates.</strong> The bands and thresholds as named ranges. Protected, because a change here moves every result silently.</li>
<li><strong>Notes.</strong> The assumptions, restated inside the file.</li>
</ul>

<p>The Rates tab is labelled 2026/27 and every constant on it was checked against primary source on 26 August 2026. Personal allowance £12,570, basic rate to £50,270, higher rate to £125,140, additional rate above, and Class 4 National Insurance at 6% between £12,570 and £50,270 then 2% above, all verified at <a href="https://www.gov.uk/income-tax-rates" rel="nofollow">gov.uk income tax rates</a> and <a href="https://www.gov.uk/self-employed-national-insurance-rates" rel="nofollow">gov.uk self-employed National Insurance rates</a>, which is now headed "Tax year 2026 to 2027". None of those figures moved on 6 April 2026.</p>

<p>The student loan thresholds did move, and the file now carries the 2026/27 figures: Plan 1 £26,900, Plan 2 £29,385, Plan 4 £33,795, all repaid at 9% above the threshold. Verified the same day at <a href="https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027" rel="nofollow">gov.uk rates and thresholds for employers 2026 to 2027</a>. Earlier downloads of this file held the 2025/26 thresholds, which understated the repayment line by roughly £75 to £95 a year on a typical locum profit. These thresholds are re-set every April, so check them against gov.uk before relying on the file in a later tax year. Plan 5 is not in the model.</p>

<h2 id="the-deduction-stack">How the deductions are calculated</h2>

<p>The model works down in this order.</p>

<ol>
<li><strong>Trading profit</strong> is gross fees less expenses, floored at zero. This is the Class 4 base and it sits on its own row, deliberately above the net income row, because it is the larger of the two whenever you have made a pension contribution.</li>
<li><strong>Net income</strong> is that profit less your pension contributions, floored at zero.</li>
<li><strong>Taxable income</strong> is net income less the £12,570 personal allowance, floored at zero.</li>
<li><strong>Income tax</strong> is that taxable income run through the 20%, 40% and 45% bands in sequence.</li>
<li><strong>Class 4 National Insurance</strong> is 6% of <em>profit</em> between £12,570 and £50,270 plus 2% of profit above £50,270. The pension cell does not appear anywhere in this formula.</li>
<li><strong>Student loan</strong> is 9% of net income above the threshold for the plan code you entered, or zero for code 0.</li>
<li><strong>Take-home</strong> is net income less the three deductions, and a check row confirms those two sides reconcile.</li>
</ol>

<p>Steps 1 and 5 are the part that changed on 26 August 2026. The file used to charge Class 4 on net income, after the pension had been taken off, which understated it. Class 4 is charged on the profits of the trade, and a personal pension contribution is not a trading expense: <a href="https://www.legislation.gov.uk/ukpga/1992/4/section/15" rel="nofollow">section 15 of the Social Security Contributions and Benefits Act 1992</a>, read on 26 August 2026, charges Class 4 on "profits chargeable to income tax under Chapter 2 of Part 2 of the Income Tax (Trading and Other Income) Act 2005", and <a href="https://www.gov.uk/hmrc-internal-manuals/national-insurance-manual/nim24001" rel="nofollow">HMRC's NIM24001</a> says the same. Pension relief arrives by a different route entirely, described below.</p>

<h3 id="reading-the-output">Reading the output: a full pass through the model</h3>

<p>Take a locum GP with £80,000 of gross fees, £5,000 of expenses, a £10,000 personal pension contribution and no student loan.</p>

<ul>
<li>Trading profit: £80,000 - £5,000 = £75,000</li>
<li>Net income: £75,000 - £10,000 = £65,000</li>
<li>Taxable income: £65,000 - £12,570 = £52,430</li>
<li>Income tax: £37,700 at 20% = £7,540, plus £14,730 at 40% = £5,892, giving £13,432</li>
<li>Class 4, on the £75,000 profit: (£50,270 - £12,570) at 6% = £2,262, plus £24,730 at 2% = £494.60, giving £2,756.60</li>
<li>Take-home: £65,000 - £13,432 - £2,756.60 = £48,811.40, an effective deduction rate of 24.9%</li>
</ul>

<p>If you downloaded this file before 26 August 2026, its Class 4 line on those inputs read £2,556.60 and its take-home read £49,011.40. Both were wrong, by £200, because Class 4 was being charged on the £65,000 rather than the £75,000. Download it again.</p>

<h2 id="the-pension-simplification">Where the pension cell is still a simplification</h2>

<p>The Class 4 line is now right. The income tax line is close but not mechanically identical to your return.</p>

<p>The model calculates income tax on your net income after the pension contribution. A real return does it the other way around: under relief at source, the provider adds basic rate relief straight into your pension, and any higher or additional rate relief comes back through your return by extending your basic rate band, not by shrinking your taxable income. That is the mechanism described at <a href="https://www.gov.uk/tax-on-your-private-pension/pension-tax-relief" rel="nofollow">gov.uk pension tax relief</a>, read on 26 August 2026.</p>

<p>For a straightforward higher-rate case the two routes land in the same place, which is why the file uses the simpler one. They come apart in two situations, both of which a locum with a good year can hit: where the £100,000 personal allowance taper is in play, because band extension and income reduction restore the allowance differently, and where the additional rate is in play. If either applies to you, the income tax figure is indicative and your accountant's will be better.</p>

<p>Two practical notes on what to type. Enter the <em>gross</em> contribution, meaning what actually lands in the pension including the basic rate relief the provider adds, so if £8,000 left your bank account the figure for this cell is £10,000. And read the take-home row knowing that it treats that whole gross figure as cash you no longer have, when in a relief at source arrangement only 80% of it left your account. The tax lines are the point of the file; the take-home row is a rough guide alongside them.</p>

<h2 id="what-the-model-omits">What the model leaves out</h2>

<ul>
<li><strong>Any PAYE income.</strong> The file assumes all your income is self-employed. If you hold a substantive post alongside sessional work, the PAYE salary uses up your personal allowance and your basic rate band first, so the same locum profit is taxed higher than the file shows. It does not attract Class 4.</li>
<li><strong>Payments on account.</strong> Where your bill exceeds £1,000 and less than 80% was collected at source, two interim payments fall due on 31 January and 31 July, each half of the previous year's liability. Your first January as a locum therefore asks for roughly one and a half years of tax at once. The model shows an annual liability, not a payment schedule, and this is what catches people out. <a href="/blog/locum-doctor-self-assessment-filing-guide">Filing your self-assessment as a locum</a> covers the timetable.</li>
<li><strong>Operating through a company.</strong> Nothing in this file applies to a personal service company, which pays corporation tax and extracts by salary and dividend instead. Whether the company route earns its overhead is worked through on <a href="/medical-guides/locum-limited-company-vs-umbrella">limited company against umbrella against sole trader</a>, and if you are already inside a company the status question sits on <a href="/medical-guides/ir35-for-locums">IR35 for locum doctors</a>.</li>
<li><strong>NHS pension accrual.</strong> Pensioning freelance locum work runs through GP Locum forms A and B on a much shorter clock than the rest of the tax year, and work that ended more than 10 weeks ago cannot be pensioned at all. That is lost accrual rather than a late-filing penalty. <a href="/blog/nhs-pension-for-locums-form-a-form-b">Forms A and B for locum GPs</a> has the mechanics.</li>
<li><strong>Class 2 National Insurance,</strong> correctly, because it stopped being a required payment from 6 April 2024 for the self-employed at or above the small profits threshold, who keep their state pension entitlement without it.</li>
</ul>

<p>One more thing that is not a modelling gap but changes what you do with the answer: Making Tax Digital for Income Tax became mandatory from 6 April 2026 for qualifying income above £50,000, tested on the 2024/25 return, so most full-time locums are already in scope and are keeping digital records and filing quarterly updates.</p>

<h2 id="questions">Questions about the model</h2>

<h3 id="q-nhs-pension">Do NHS pension contributions go in the pension cell?</h3>

<p>No. That cell is for personal pension or SIPP contributions. NHS scheme contributions are tiered on pensionable pay and are deducted through a different route entirely, which the <a href="/calculators/nhs-superannuation-tiered-contribution">tiered contribution calculator</a> handles.</p>

<h3 id="q-set-aside">How much should I set aside from each payment?</h3>

<p>The effective deduction rate cell gives you a percentage for the year, but applying it from month one understates what you need in your first January, because of payments on account. Until you have a full year behind you, plan against the annual liability plus half of it again.</p>

<h3 id="q-vat">Should VAT be in here anywhere?</h3>

<p>Not for clinical locum work, which is exempt as medical care by a registered practitioner. It becomes a live question if you take on medico-legal reports, expert witness work or purely cosmetic procedures, which are standard rated and can build towards registration.</p>

<h3 id="q-check-error">The check row says ERROR. What happened?</h3>

<p>A formula has been overwritten. Download the file again rather than repairing the cell, because the named ranges make it easy to fix the visible symptom and leave a broken reference behind it.</p>
