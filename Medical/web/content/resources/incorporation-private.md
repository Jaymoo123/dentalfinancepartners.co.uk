---
title: "Private Practice Incorporation Spreadsheet: What the Model Compares, and Where It Stops"
slug: incorporation-private
topic: incorporation-private
resourceLabel: "private practice incorporation comparison model"
resourceId: "incorporation-model.xlsx"
summary: "Documentation for the downloadable incorporation comparison: the four inputs, how the two columns are built, two named simplifications that pull the answer in opposite directions, and the one factor the model omits that can outweigh everything it shows."
version: "2026/27"
lastReviewed: "2026-08-26"
date: "2025-09-01"
author: "Medical Accountants UK"
---

<h2 id="what-this-page-is">What this page is</h2>

<p>This is the manual for the spreadsheet. It sets out how the two columns are constructed, quantifies the two places the model simplifies, and names the factor it leaves out entirely that can be worth more than the whole comparison. If you want the incorporation decision explained rather than the file documented, <a href="/blog/private-practice-incorporation-complete-guide">the complete guide to incorporating a private practice</a> does that, and the <a href="/calculators/private-practice-incorporation">incorporation calculator</a> runs the comparison in the browser.</p>

<p>Use the workbook when you want to sweep a range: run it at several private income levels and watch where the two columns cross. A single run at today's income tells you much less than the shape of the curve around it.</p>

<h2 id="four-inputs">The four inputs</h2>

<ul>
<li><strong>Private practice income for the year.</strong> Gross private billings only. NHS contract income cannot go through a company at all, so it does not belong here.</li>
<li><strong>Practice expenses.</strong> Costs of the private work, deducted before either column is calculated.</li>
<li><strong>Your NHS PAYE income.</strong> This is not decoration. It sits underneath the private income in both columns and determines which tax band the private profit or the dividends fall into, which is usually what decides the answer.</li>
<li><strong>Director salary from the company.</strong> Affects the company column only. The default is the £12,570 personal allowance.</li>
</ul>

<h2 id="the-two-columns">How the two columns are built</h2>

<p>The sole trader column takes private income less expenses to a profit, adds the NHS salary to reach total taxable income, runs that through the income tax bands, and adds Class 4 National Insurance at 6% between £12,570 and £50,270 then 2% above.</p>

<p>The limited company column takes the same profit, deducts the director salary, charges corporation tax on what is left, treats the whole post-tax balance as available dividends, applies the £500 dividend allowance, and taxes the remainder at the dividend rates stacked on top of the NHS salary and the director salary. The 2026/27 dividend rates in the file are 10.75% ordinary, 35.75% upper and 39.35% additional, which took effect on 6 April 2026 and are confirmed at <a href="https://www.gov.uk/tax-on-dividends" rel="nofollow">gov.uk tax on dividends</a>, read on 26 August 2026. Income tax on the NHS salary is added to that total.</p>

<p>The difference between the two totals is the saving, shown per year and per month, and a negative figure means incorporating costs more. A check row confirms the saving equals the difference between the two columns.</p>

<h2 id="two-simplifications">Two simplifications, pulling in opposite directions</h2>

<p>Both are worth quantifying, because together they set the width of the error bar around the saving figure.</p>

<h3 id="ct-flat-rate">Corporation tax is charged at a flat 25%</h3>

<p>The real structure since 1 April 2023 is 19% on profits up to £50,000, 25% above £250,000, and marginal relief in between, with a standard fraction of 3/200 that is unchanged for the financial year beginning 1 April 2026. The effective marginal rate inside that band is about 26.5%, but the average rate is well below 25%.</p>

<p>For a company with £80,000 of profit, no associated companies and a twelve-month accounting period, corporation tax is £80,000 at 25%, which is £20,000, less marginal relief of 3/200 of (£250,000 - £80,000), which is £2,550. That is £17,450, an effective rate of 21.8%. The model charges the full £20,000, so it overstates the company's cost by £2,550 and understates the saving by the same amount.</p>

<h3 id="employer-nic">Employer National Insurance on the director salary is not charged</h3>

<p>This runs the other way. The company pays secondary Class 1 National Insurance at 15% on salary above a £5,000 secondary threshold. On the default £12,570 salary that is 15% of £7,570, or £1,135.50 a year, and the Employment Allowance does not relieve it because a company whose only employee is a single director cannot claim it. The cost is deductible for corporation tax but real, so the model overstates the saving by roughly this amount.</p>

<p>Net effect on the worked figures above: the two omissions leave the company column about £1,400 better off than the file shows, before anything else is considered. That is a correction, not a rounding error, and it is small relative to what comes next.</p>

<h2 id="the-pension-omission">The factor the model does not price at all</h2>

<p>Dividends are not NHS pensionable, and a limited company cannot hold a GMS or PMS contract. For a hospital consultant, only the NHS employment is ever pensionable and private work never is, whatever structure it sits in. For a GP, routing income through a company takes it out of pensionable earnings for good.</p>

<p>The workbook compares tax against tax. It has no cell for the pension accrual that the company column gives up, and that accrual is a defined benefit promise, index linked, accruing at 1/54th of pensionable earnings a year in the 2015 section. Whether it outweighs the tax saving depends on your section, your years to retirement and how much of the income was pensionable in the first place, which is precisely why the file cannot put a number on it and neither will this page. What it does mean is that a positive saving in the workbook is not on its own a reason to incorporate. Set it against <a href="/blog/gp-pension-contributions-tax-relief">how pension contributions and tax relief work for a doctor</a> before you act on it.</p>

<p>The one case where the pension point argues the other way is a doctor already over the annual allowance. If private income is pushing your pension input amount past the allowance and generating a charge, moving that income outside pensionable pay reduces both. That interaction is not in the workbook either, and it needs the <a href="/calculators/nhs-pension-annual-allowance">annual allowance calculator</a> alongside this one.</p>

<h2 id="other-omissions">The rest of what is not modelled</h2>

<ul>
<li><strong>Associated companies.</strong> The £50,000 and £250,000 corporation tax limits are divided by the number of associated companies. A group of doctors incorporating a joint private clinic while each keeping their own company can find every company in the 25% band at profits that would otherwise sit at 19%. The model assumes one company with no associates.</li>
<li><strong>Money taken out informally.</strong> A medical company is a close company, so a director's loan left overdrawn 9 months and 1 day after the period end triggers a section 455 charge, currently 35.75% on loans made on or after 6 April 2026 and 33.75% on loans made in 2025/26 or earlier. It is refundable under section 458 once the loan is cleared, but the relief is deferred rather than immediate. <a href="/blog/consultant-directors-loan-account-s455-medical-company">Director's loan accounts and section 455</a> covers it.</li>
<li><strong>Any extraction route other than salary plus dividend.</strong> Employer pension contributions from the company are deductible for corporation tax on a paid basis, carry no National Insurance and are not dividend taxed, subject to the annual allowance. The model has no cell for them. <a href="/blog/salary-vs-dividend-medical-limited-company-2026">Salary against dividend in a medical company</a> compares the routes.</li>
<li><strong>Profit left in the company.</strong> The model distributes the entire post-tax balance every year. Retaining profit changes the answer materially, and <a href="/blog/surplus-cash-medical-limited-company-options">what to do with surplus cash</a> takes it from there.</li>
<li><strong>Getting there and running it.</strong> One-off incorporation costs, the transfer of an existing practice and any incorporation relief claim on goodwill are outside the file; <a href="/blog/incorporation-relief-private-medical-practice-s162">incorporation relief under section 162</a> and <a href="/blog/medical-practice-incorporation-step-by-step">the step-by-step process</a> deal with those. Ongoing company filing and accounting costs are also not modelled, and they are a genuine annual drag on the saving.</li>
</ul>

<h2 id="questions">Questions about the model</h2>

<h3 id="q-nhs-income">Can I put my NHS income through the company to increase the saving?</h3>

<p>No. A limited company cannot hold an NHS primary care contract, and NHS employment income is employment income. The NHS figure in the model is there to set your tax bands, not to be incorporated.</p>

<h3 id="q-saving-negative">The saving is negative. Is the model broken?</h3>

<p>Very likely not. At typical private income levels on 2026/27 rates the pure tax saving from incorporating is modest, and the dividend rate rise that took effect on 6 April 2026 narrowed it further. A negative result is a normal output, and it is one of the more useful ones.</p>

<h3 id="q-salary-level">What should I put in the director salary cell?</h3>

<p>Run it at both £5,000 and £12,570 and compare. The lower figure removes the employer National Insurance the model does not charge you anyway, so the two runs bracket the real answer rather than settling it. The trade-off between them also involves National Insurance credit for state pension purposes, which the file does not track.</p>

<h3 id="q-llp">Is a limited liability partnership covered?</h3>

<p>No. The file compares sole trader against limited company only. An LLP gives limited liability with members taxed personally, so on tax it behaves much closer to the sole trader column than the company one.</p>
