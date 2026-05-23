# F-19 + F-20 Back-Patch Manifest

Date: 2026-05-23
Sub-agent: F-19 + F-20 content sweep
Source patches: §21.4 lines 928-930 of `docs/property/house_positions.md` (manager-applied 2026-05-23)

F-19: Employer NI 13.8% → 15% (from 6 April 2025)
F-20: Dividend basic+higher 8.75%/33.75% → 10.75%/35.75% (from 6 April 2026; additional 39.35% unchanged)

---

## File: Property/web/content/blog/2027-property-income-tax-rates-landlords-uk.md

### Occurrence 1 — line 186
- Classification: NEEDS-PATCH
- Current text: `<p>The headline appearance overstates the company advantage, because money inside the company has to be extracted to be useful to the shareholder. Dividend extraction at higher rates (33.75% above the £500 allowance in 2026/27) takes a meaningful slice of the company's profit. The combined effective rate on extracted profit for a higher-rate shareholder is around 46%, modestly above the 42% personal rate, but the comparison is misleading because the personal route applies the 42% to a larger taxable base (because Section 24 disallows the mortgage interest deduction).</p>`
- Replacement: `<p>The headline appearance overstates the company advantage, because money inside the company has to be extracted to be useful to the shareholder. Dividend extraction at higher rates (35.75% above the £500 allowance in 2026/27) takes a meaningful slice of the company's profit. The combined effective rate on extracted profit for a higher-rate shareholder is around 48%, modestly above the 42% personal rate, but the comparison is misleading because the personal route applies the 42% to a larger taxable base (because Section 24 disallows the mortgage interest deduction).</p>`
- Arithmetic note: 25% CT + (35.75% × 75%) = 25% + 26.81% = 51.81% theoretical; old 25% + (33.75% × 75%) = 25% + 25.31% = ~50.31% (page rounds to 46%, which is loose). Recompute round figure from 46 to 48 reflecting the +2pp dividend uplift. ARITHMETIC FLAG: manager to recompute "around 48%" if precision matters.

---

## File: Property/web/content/blog/2027-tax-rates-incorporation-decision-property-landlords.md

### Occurrence 1 — line 46
- Classification: NEEDS-PATCH (worked example, basic-rate dividend tax)
- Current text: `<li><strong>Limited company ownership:</strong> Corporation tax: £30,000 × 19% = £5,700. Available for dividends: £24,300. Dividend tax (basic rate): £24,300 × 8.75% = £2,126. Total after-tax: £22,174.</li>`
- Replacement: `<li><strong>Limited company ownership:</strong> Corporation tax: £30,000 × 19% = £5,700. Available for dividends: £24,300. Dividend tax (basic rate): £24,300 × 10.75% = £2,612. Total after-tax: £21,688.</li>`
- Arithmetic: £24,300 × 10.75% = £2,612.25 → £2,612. £24,300 − £2,612 = £21,688. (Note: example ignores £500 dividend allowance, consistent with pre-existing approach.) Surrounding narrative line 48 "personal ownership actually provides £1,226 more after-tax income" should become £1,712 (£23,400 − £21,688). ARITHMETIC FLAG: manager to update line 48 narrative figure £1,226 → £1,712 to keep example internally consistent.

### Occurrence 2 — line 53
- Classification: NEEDS-PATCH (worked example, higher-rate dividend tax)
- Current text: `<li><strong>Limited company ownership:</strong> Corporation tax: £50,000 × 19% = £9,500. Available for dividends: £40,500. Dividend tax (higher rate): £40,500 × 33.75% = £13,669. Total after-tax: £26,831.</li>`
- Replacement: `<li><strong>Limited company ownership:</strong> Corporation tax: £50,000 × 19% = £9,500. Available for dividends: £40,500. Dividend tax (higher rate): £40,500 × 35.75% = £14,479. Total after-tax: £26,021.</li>`
- Arithmetic: £40,500 × 35.75% = £14,478.75 → £14,479. £40,500 − £14,479 = £26,021. Surrounding narrative line 55 "the company structure saves £4,831 annually" should become £3,979 (£29,000 personal − £26,021 company). ARITHMETIC FLAG: manager to update line 55 narrative £4,831 → £3,979.

---

## File: Property/web/content/blog/2027-property-tax-rates-affect-capital-gains-tax-sales.md

### Occurrence 1 — line 129
- Classification: NEEDS-PATCH (current-state listing of dividend rates)
- Current text: `<tr><td>Extraction of cash to landlord</td><td>Not applicable</td><td>Dividend tax 8.75% / 33.75% / 39.35% on extracted profits</td></tr>`
- Replacement: `<tr><td>Extraction of cash to landlord</td><td>Not applicable</td><td>Dividend tax 10.75% / 35.75% / 39.35% on extracted profits</td></tr>`
- Arithmetic note: n/a (definitional row, 39.35% additional rate kept as it is unchanged).

---

## File: Property/web/content/blog/2027-tax-rates-incorporation-decision-uk-landlords.md

### Occurrence 1 — line 58
- Classification: NEEDS-PATCH
- Current text: `<p>Even after dividend extraction at 33.75% (higher rate dividend tax), the corporate structure delivers substantial savings. Additional rate taxpayers face a 47% personal rate, making the differential with the 19% or 25% corporation tax rate even more compelling.</p>`
- Replacement: `<p>Even after dividend extraction at 35.75% (higher rate dividend tax), the corporate structure delivers substantial savings. Additional rate taxpayers face a 47% personal rate, making the differential with the 19% or 25% corporation tax rate even more compelling.</p>`

### Occurrence 2 — line 61
- Classification: NEEDS-PATCH
- Current text: `<p>The optimal extraction strategy becomes more nuanced with the new property income tax rates. For basic rate taxpayers, the dividend ordinary rate of 8.75% means total effective tax (corporation tax plus dividend tax) of approximately 26% — still higher than the 22% personal rate. However, companies offer more flexibility in timing distributions, potentially allowing income smoothing across tax years or deferring extractions until retirement when personal tax rates may be lower.</p>`
- Replacement: `<p>The optimal extraction strategy becomes more nuanced with the new property income tax rates. For basic rate taxpayers, the dividend ordinary rate of 10.75% means total effective tax (corporation tax plus dividend tax) of approximately 28% — still higher than the 22% personal rate. However, companies offer more flexibility in timing distributions, potentially allowing income smoothing across tax years or deferring extractions until retirement when personal tax rates may be lower.</p>`
- Arithmetic: 19% CT + (10.75% × 81%) = 19% + 8.71% = 27.71% → "approximately 28%". Old: 19% + (8.75% × 81%) = 19% + 7.09% = 26.09% → "approximately 26%". The em-dash in "26% — still" should also be replaced with a comma per house style; flagging for manager.

---

## File: Property/web/content/blog/alphabet-shares-property-spv-dividend-splitting-spouse-children.md

### Occurrence 1 — line 144
- Classification: NEEDS-PATCH (worked example, single-class baseline). Multi-rate worked example with arithmetic dependency.
- Current text: `<p>Single-class structure (founder owns 100% of one ordinary class): Mark draws all £75,000 as dividends. The £500 dividend allowance covers the first slice, the next £42,270 fills his basic-rate band (which is exhausted by his other income, so this is taxed at 33.75%), and £32,230 falls into higher-rate dividend territory at 33.75%. Total dividend tax on Mark: roughly £25,160.</p>`
- Replacement: `<p>Single-class structure (founder owns 100% of one ordinary class): Mark draws all £75,000 as dividends. The £500 dividend allowance covers the first slice, the next £42,270 fills his basic-rate band (which is exhausted by his other income, so this is taxed at 35.75%), and £32,230 falls into higher-rate dividend territory at 35.75%. Total dividend tax on Mark: roughly £26,650.</p>`
- Arithmetic: Both £42,270 and £32,230 sit in higher-rate band (Mark already at £80k of other income), so taxed at 35.75%. (£75,000 − £500) × 35.75% = £74,500 × 35.75% = £26,633.75 → £26,650 (rounded as per "roughly").

### Occurrence 2 — line 146
- Classification: NEEDS-PATCH (worked example, alphabet split: Sarah basic-rate, Mark higher-rate)
- Current text: `<p>Alphabet structure (50:50 split between Mark on A class and Sarah on B class): Mark draws £20,000 as A-class dividend. Sarah's basic-rate band (£50,270 less her £25,000 salary = £25,270 of remaining band) accommodates her £25,000 B-class dividend at 8.75%. Mark's £20,000 A-class dividend, on top of his £80,000 of other income, sits entirely in higher-rate at 33.75%.</p>`
- Replacement: `<p>Alphabet structure (50:50 split between Mark on A class and Sarah on B class): Mark draws £20,000 as A-class dividend. Sarah's basic-rate band (£50,270 less her £25,000 salary = £25,270 of remaining band) accommodates her £25,000 B-class dividend at 10.75%. Mark's £20,000 A-class dividend, on top of his £80,000 of other income, sits entirely in higher-rate at 35.75%.</p>`

### Occurrence 3 — line 149
- Classification: NEEDS-PATCH (worked-example calculation line for Mark)
- Current text: `<li>Mark's tax: £20,000 × 33.75% = £6,750 (he loses the £500 allowance to his other dividend income).</li>`
- Replacement: `<li>Mark's tax: £20,000 × 35.75% = £7,150 (he loses the £500 allowance to his other dividend income).</li>`
- Arithmetic: £20,000 × 35.75% = £7,150.

### Occurrence 4 — line 150
- Classification: NEEDS-PATCH
- Current text: `<li>Sarah's tax: (£25,000 - £500 allowance) × 8.75% = £2,144.</li>`
- Replacement: `<li>Sarah's tax: (£25,000 - £500 allowance) × 10.75% = £2,634.</li>`
- Arithmetic: £24,500 × 10.75% = £2,633.75 → £2,634.
- Knock-on (manifest only): line 151 "Total household dividend tax: £8,894" becomes £7,150 + £2,634 = £9,784. Line 154 "saves £25,160 - £8,894 = £16,266" becomes £26,650 − £9,784 = £16,866. ARITHMETIC FLAG: manager to update lines 151 and 154 to keep example internally consistent.

### Occurrence 5 — line 172
- Classification: NEEDS-PATCH (3-way alphabet worked example: Mark restated)
- Current text: `<li>Mark's tax: £20,000 × 33.75% = £6,750.</li>`
- Replacement: `<li>Mark's tax: £20,000 × 35.75% = £7,150.</li>`

### Occurrence 6 — line 173
- Classification: NEEDS-PATCH
- Current text: `<li>Sarah's tax: (£25,000 - £500 allowance) × 8.75% = £2,144.</li>`
- Replacement: `<li>Sarah's tax: (£25,000 - £500 allowance) × 10.75% = £2,634.</li>`

### Occurrence 7 — line 174
- Classification: NEEDS-PATCH (Tom worked example)
- Current text: `<li>Tom's tax: Tom has £14,000 of salary, so the first £-12,570 of his salary uses personal allowance, the next £1,430 is taxed at basic 20%. His £500 dividend allowance covers the first slice of his £30,000 dividend. The next £29,500 is taxed at 8.75% (he has £33,840 of basic-rate band remaining after salary). Tom's tax: £29,500 × 8.75% = £2,581.</li>`
- Replacement: `<li>Tom's tax: Tom has £14,000 of salary, so the first £-12,570 of his salary uses personal allowance, the next £1,430 is taxed at basic 20%. His £500 dividend allowance covers the first slice of his £30,000 dividend. The next £29,500 is taxed at 10.75% (he has £33,840 of basic-rate band remaining after salary). Tom's tax: £29,500 × 10.75% = £3,171.</li>`
- Arithmetic: £29,500 × 10.75% = £3,171.25 → £3,171.
- Knock-on (manifest only): line 175 "Total household dividend tax: £6,750 + £2,144 + £2,581 = £11,475" becomes £7,150 + £2,634 + £3,171 = £12,955. Line 178 "saves £13,685" becomes £26,650 − £12,955 = £13,695. ARITHMETIC FLAG: manager to update lines 175 and 178 to keep example internally consistent.

---

## File: Property/web/content/blog/btl-limited-company-year-end-date-changing-tax-planning.md

### Occurrence 1 — line 36
- Classification: HISTORICAL-CONTEXT / RATE-DEFINITIONAL (s.455 charge rate is set by reference to upper-rate dividend tax)
- Current text (excerpt): `Section 455 of the Corporation Tax Act 2010 imposes a 33.75% corporation tax charge on a director's loan account that is overdrawn at the end of an accounting period...`
- Analysis: The s.455 rate has historically tracked the higher/upper-rate dividend tax rate. With the F-20 uplift to 35.75% higher-rate dividend tax from 6 April 2026, the s.455 rate would normally rise in lockstep. HOWEVER, the s.455 rate uplift requires separate Finance Act confirmation (the dividend rate change in F-20 is the dividend tax rates, not automatically the s.455 rate). ARITHMETIC FLAG: manager to confirm whether the Finance Act enacted alongside the dividend rate uplift also raised the s.455 rate to 35.75%, or whether s.455 remained at 33.75% as a transitional anomaly. DO NOT PATCH without manager confirmation of the underlying enactment.

### Occurrence 2 — line 98
- Classification: HISTORICAL-CONTEXT / RATE-DEFINITIONAL (same s.455 question)
- Current text: `<p>An overdrawn director's loan account at the end of an accounting period attracts a corporation tax charge under <a href="https://www.legislation.gov.uk/ukpga/2010/4/section/455">CTA 2010 section 455</a> at 33.75% on the overdrawn amount, payable nine months and one day after the period end and recoverable on later repayment of the loan. The charge is permanent if the loan is never repaid; the cashflow exposure is the gap between paying the s.455 charge and reclaiming it after repayment.</p>`
- Replacement: (defer — see Occurrence 1 ARITHMETIC FLAG)
- ARITHMETIC FLAG: manager to confirm s.455 rate post-6-April-2026 before patching.

---

## File: Property/web/content/blog/btl-spv-directors-loan-repayment-strategy-tax-efficient-extraction.md

### Occurrence 1 — line 22
- Classification: NEEDS-PATCH (current-state listing of dividend rates)
- Current text: `A dividend is a distribution from post-corporation-tax profits, requires a declared and minuted board decision, must be paid in proportion to shareholding across all shareholders in that class, and is taxable on you at 8.75%, 33.75% or 39.35% depending on band.`
- Replacement: `A dividend is a distribution from post-corporation-tax profits, requires a declared and minuted board decision, must be paid in proportion to shareholding across all shareholders in that class, and is taxable on you at 10.75%, 35.75% or 39.35% depending on band.`

### Occurrence 2 — line 67
- Classification: NEEDS-PATCH
- Current text: `<li><strong>Dividends</strong> from post-corporation-tax profits, taxable in your hands at dividend rates (8.75%, 33.75% or 39.35%).</li>`
- Replacement: `<li><strong>Dividends</strong> from post-corporation-tax profits, taxable in your hands at dividend rates (10.75%, 35.75% or 39.35%).</li>`

### Occurrence 3 — line 75
- Classification: NEEDS-PATCH (paragraph mentions employer NI 13.8% as current state plus dividend range)
- Current text: `<li>Each later strand has a higher current-year tax cost per pound extracted than the earlier one. DLA principal is the only fully tax-free route, and it is finite. Official-rate interest is a low-rate income strand that benefits from the personal savings allowance. Dividends sit at 8.75% to 39.35% on top of the corporation tax the company has already paid. Salary at the floor is broadly tax-free, but the marginal cost rises sharply once you pass the secondary NI threshold (employer NI 13.8% on top of employee NI). Pension contributions defer income tax entirely, but you cannot touch the money until age 55 (rising to 57 from April 2028).</li>`
- Replacement: `<li>Each later strand has a higher current-year tax cost per pound extracted than the earlier one. DLA principal is the only fully tax-free route, and it is finite. Official-rate interest is a low-rate income strand that benefits from the personal savings allowance. Dividends sit at 10.75% to 39.35% on top of the corporation tax the company has already paid. Salary at the floor is broadly tax-free, but the marginal cost rises sharply once you pass the secondary NI threshold (employer NI 15% on top of employee NI). Pension contributions defer income tax entirely, but you cannot touch the money until age 55 (rising to 57 from April 2028).</li>`

### Occurrence 4 — line 128
- Classification: NEEDS-PATCH
- Current text: `<li>Dividend income is taxable in your hands at 8.75%, 33.75% or 39.35% depending on band, on top of corporation tax already paid by the company. The blended effective rate is meaningfully higher than the DLA strand or the interest strand for any founder who still has DLA runway available.</li>`
- Replacement: `<li>Dividend income is taxable in your hands at 10.75%, 35.75% or 39.35% depending on band, on top of corporation tax already paid by the company. The blended effective rate is meaningfully higher than the DLA strand or the interest strand for any founder who still has DLA runway available.</li>`

### Occurrence 5 — line 144
- Classification: NEEDS-PATCH (employer NI 13.8% as current state)
- Current text: `<li>Salary above the secondary threshold attracts employer NI at 13.8%, which is expensive per pound of cash extracted compared to the DLA strands or modest dividends. The older "tax-free salary at the personal allowance" advice that worked when Employment Allowance was available no longer makes sense for sole-director SPVs because they are excluded from Employment Allowance (the sole-director exclusion). Multi-director SPVs may qualify subject to the connected-companies rules; the test is whether the company has at least one secondary contributor in addition to the director.</li>`
- Replacement: `<li>Salary above the secondary threshold attracts employer NI at 15%, which is expensive per pound of cash extracted compared to the DLA strands or modest dividends. The older "tax-free salary at the personal allowance" advice that worked when Employment Allowance was available no longer makes sense for sole-director SPVs because they are excluded from Employment Allowance (the sole-director exclusion). Multi-director SPVs may qualify subject to the connected-companies rules; the test is whether the company has at least one secondary contributor in addition to the director.</li>`

### Occurrence 6 — line 229
- Classification: HISTORICAL-CONTEXT / RATE-DEFINITIONAL (s.455 charge rate cited; same analysis as btl-limited-company-year-end Occurrence 1)
- Current text: `<p>The pure mechanics of an overdrawn DLA, the section 455 charge at 33.75%, the nine-month-and-one-day repayment clock, the bed-and-breakfast anti-avoidance rule in CTA 2010 section 464C, and the £10,000 beneficial-loan benefit-in-kind rule are covered in detail on our <a href="/blog/incorporation-and-company-structures/director-loan-account-property-company-mechanics">DLA mechanics page</a>. For the strategic sequence picture, the key points are:</p>`
- Replacement: (defer to manager s.455 confirmation)
- ARITHMETIC FLAG: manager to confirm s.455 rate post-6-April-2026.

---

## File: Property/web/content/blog/buy-to-let-limited-company-complete-guide-uk.md

### Occurrence 1 — line 23
- Classification: NEEDS-PATCH (current-state dividend rates FAQ)
- Current text: `For 2025-26 the dividend allowance is £500 (reduced from £1,000 in 2024-25 and £2,000 in 2023-24). Dividend rates above the allowance are 8.75% (basic rate), 33.75% (higher rate), and 39.35% (additional rate). On £30,000 of dividends to a higher rate taxpayer with no other dividend income, the personal tax cost is roughly £9,800 on top of the corporation tax already paid by the company.`
- Replacement: `For 2026-27 the dividend allowance is £500 (reduced from £1,000 in 2024-25 and £2,000 in 2023-24). Dividend rates above the allowance are 10.75% (basic rate), 35.75% (higher rate), and 39.35% (additional rate). On £30,000 of dividends to a higher rate taxpayer with no other dividend income, the personal tax cost is roughly £10,550 on top of the corporation tax already paid by the company.`
- Arithmetic: (£30,000 − £500) × 35.75% = £29,500 × 35.75% = £10,546 → ~£10,550. (Old: £29,500 × 33.75% = £9,956 → "roughly £9,800" — old figure was slightly under-rounded.) Note: "For 2025-26" should be updated to "For 2026-27" since the F-20 rate uplift is from 6 April 2026.

### Occurrence 2 — line 45
- Classification: NEEDS-PATCH (current-state extraction cost framing)
- Current text: `Yes. A company contribution to your personal pension is deductible against corporation tax (within the standard annual allowance of £60,000 for 2025-26, or unused carry-forward from the previous three years). This extracts company value into your pension wrapper at 19% to 25% tax cost (the corporation tax saved by deducting the contribution) rather than the 33.75% or 39.35% dividend tax on equivalent extraction.`
- Replacement: `Yes. A company contribution to your personal pension is deductible against corporation tax (within the standard annual allowance of £60,000 for 2025-26, or unused carry-forward from the previous three years). This extracts company value into your pension wrapper at 19% to 25% tax cost (the corporation tax saved by deducting the contribution) rather than the 35.75% or 39.35% dividend tax on equivalent extraction.`

### Occurrence 3 — line 57
- Classification: NEEDS-PATCH
- Current text: `<li><strong>Tax rate.</strong> Profits suffer corporation tax (19% to 25%) inside the company, not your personal marginal rate (up to 45%) directly. Extraction as dividends incurs a further 8.75% to 39.35% personal tax.</li>`
- Replacement: `<li><strong>Tax rate.</strong> Profits suffer corporation tax (19% to 25%) inside the company, not your personal marginal rate (up to 45%) directly. Extraction as dividends incurs a further 10.75% to 39.35% personal tax.</li>`

### Occurrence 4 — line 102
- Classification: NEEDS-PATCH (worked-example table cell)
- Current text: `<tr><td>If all retained company profit later extracted as dividend (higher rate)</td><td>n/a</td><td>£8,100 × 33.75% = £2,734</td></tr>`
- Replacement: `<tr><td>If all retained company profit later extracted as dividend (higher rate)</td><td>n/a</td><td>£8,100 × 35.75% = £2,896</td></tr>`
- Arithmetic: £8,100 × 35.75% = £2,895.75 → £2,896.

### Occurrence 5 — line 142
- Classification: NEEDS-PATCH (rate definitional list)
- Current text: `<li>Basic rate: 8.75%</li>`
- Replacement: `<li>Basic rate: 10.75%</li>`

### Occurrence 6 — line 143
- Classification: NEEDS-PATCH
- Current text: `<li>Higher rate: 33.75%</li>`
- Replacement: `<li>Higher rate: 35.75%</li>`

### Occurrence 7 — line 144
- Classification: UNRELATED (39.35% additional rate is unchanged and correct)
- Current text: `<li>Additional rate: 39.35%</li>`
- Replacement: (no change)

### Occurrence 8 — line 155
- Classification: HISTORICAL-CONTEXT / RATE-DEFINITIONAL (s.455 charge rate — same deferred question)
- Current text: `<p>Money you put into the company (e.g., your initial deposit funds, top-ups to cover voids) sits as a Director's Loan Account credit. You can draw it back out tax-free until exhausted. Borrowing more than you have lent (an overdrawn DLA) triggers a Section 455 charge of 33.75% of the outstanding balance nine months and one day after year end, refundable when the loan is repaid. Loans above £10,000 also create a benefit-in-kind income tax charge unless interest at the official rate is paid by you to the company.</p>`
- ARITHMETIC FLAG: manager to confirm s.455 rate post-6-April-2026.

### Occurrence 9 — line 227
- Classification: NEEDS-PATCH (alphabet-share dividend rates)
- Current text: `<p>Issuing separate share classes (A, B, C, D shares) to different family members with flexible dividend rights lets the company declare dividends differently across classes each year. Adult children in lower tax bands can take dividends at 8.75% basic rate instead of the principal shareholder taking them at 33.75% or 39.35%. This works only for genuinely adult shareholders (over 18) and must be documented carefully, the settlements legislation (anti-avoidance rules) and recent HMRC challenges have caught some poorly drafted schemes.</p>`
- Replacement: `<p>Issuing separate share classes (A, B, C, D shares) to different family members with flexible dividend rights lets the company declare dividends differently across classes each year. Adult children in lower tax bands can take dividends at 10.75% basic rate instead of the principal shareholder taking them at 35.75% or 39.35%. This works only for genuinely adult shareholders (over 18) and must be documented carefully, the settlements legislation (anti-avoidance rules) and recent HMRC challenges have caught some poorly drafted schemes.</p>`

---

## File: Property/web/content/blog/capital-gains-tax-property-sale-uk-2026-rates-allowances.md

### Occurrence 1 — line 35
- Classification: NEEDS-PATCH (dividend rate range cited as current state)
- Current text: `Yes. Gains realised inside a limited company are taxed as part of the company's corporation tax computation at 19% (small profits rate, profits under £50k) or 25% (main rate, over £250k), not at the personal CGT rates of 18/24%. The company does not have an annual exempt amount. To get the proceeds out to the landlord personally, dividend tax (8.75% / 33.75% / 39.35%) or salary applies. For long-hold strategies where proceeds are reinvested rather than extracted, the company route often wins on net tax.`
- Replacement: `Yes. Gains realised inside a limited company are taxed as part of the company's corporation tax computation at 19% (small profits rate, profits under £50k) or 25% (main rate, over £250k), not at the personal CGT rates of 18/24%. The company does not have an annual exempt amount. To get the proceeds out to the landlord personally, dividend tax (10.75% / 35.75% / 39.35%) or salary applies. For long-hold strategies where proceeds are reinvested rather than extracted, the company route often wins on net tax.`

---

## File: Property/web/content/blog/capital-gains-tax-property-complete-guide-uk.md

### Occurrence 1 — line 175
- Classification: NEEDS-PATCH
- Current text: `<p>The company route changes the CGT mechanics entirely. The 60-day CGT on UK property service does not apply; gains are reported through the CT600. Extraction of cash gains from the company to the shareholder requires either dividend extraction (dividend tax at 8.75%/33.75%/39.35% above the £500 allowance), a salary, or pension contributions. The combined effective rate on extracted gains can exceed the personal 24%, but for retained gains used for reinvestment, the company route is often cheaper.</p>`
- Replacement: `<p>The company route changes the CGT mechanics entirely. The 60-day CGT on UK property service does not apply; gains are reported through the CT600. Extraction of cash gains from the company to the shareholder requires either dividend extraction (dividend tax at 10.75%/35.75%/39.35% above the £500 allowance), a salary, or pension contributions. The combined effective rate on extracted gains can exceed the personal 24%, but for retained gains used for reinvestment, the company route is often cheaper.</p>`

---

## File: Property/web/content/blog/cgt-property-2027-rate-changes-uk-landlords.md

### Occurrence 1 — line 35
- Classification: NEEDS-PATCH
- Current text: `Yes. Gains realised inside a company are taxed as part of the company's corporation tax computation at 19% (small profits rate, profits under £50k) or 25% (main rate, over £250k), not at the personal CGT rates of 18/24%. The company does not have an annual exempt amount equivalent to the £3,000 personal allowance. To get the proceeds out to the landlord personally, dividend tax (8.75% / 33.75% / 39.35%) or salary applies, which is the 'double layer' issue often cited against companies.`
- Replacement: `Yes. Gains realised inside a company are taxed as part of the company's corporation tax computation at 19% (small profits rate, profits under £50k) or 25% (main rate, over £250k), not at the personal CGT rates of 18/24%. The company does not have an annual exempt amount equivalent to the £3,000 personal allowance. To get the proceeds out to the landlord personally, dividend tax (10.75% / 35.75% / 39.35%) or salary applies, which is the 'double layer' issue often cited against companies.`

### Occurrence 2 — line 119
- Classification: NEEDS-PATCH
- Current text: `<li><strong>Extracting gains from the company creates a second tax layer</strong> via dividends (8.75% / 33.75% / 39.35%) or salary. The double-layer issue is the main argument against companies for landlords who plan to sell and extract proceeds quickly.</li>`
- Replacement: `<li><strong>Extracting gains from the company creates a second tax layer</strong> via dividends (10.75% / 35.75% / 39.35%) or salary. The double-layer issue is the main argument against companies for landlords who plan to sell and extract proceeds quickly.</li>`

---

## File: Property/web/content/blog/charging-market-rent-to-own-property-company-tax-treatment.md

### Occurrence 1 — line 32
- Classification: NEEDS-PATCH (worked-example mini, higher-rate dividend extraction comparison)
- Current text: `For an anonymised higher-rate taxpayer (40% income tax band) the marginal cost on a £1,000 rent extraction is approximately: £400 personal income tax (40% on £1,000), partially offset by 19% to 25% corporation tax saving in the SPV (£190 to £250). Net cost: roughly £150 to £210 per £1,000 extracted. For comparison, £1,000 of dividend extracted at the higher-rate dividend band of 33.75% is taxed at £338 personally with no CT saving (dividends paid from post-CT profits), net cost £338. £1,000 of salary at the higher-rate marginal income tax + NI is approximately £490 to £530 personally, less the 19% to 25% CT saving in the company, net cost £290 to £330. Rent extraction is the cheapest of the three for higher-rate landlords on un-mortgaged property; the comparison shifts where section 24 applies to mortgaged property in personal hands.`
- Replacement: `For an anonymised higher-rate taxpayer (40% income tax band) the marginal cost on a £1,000 rent extraction is approximately: £400 personal income tax (40% on £1,000), partially offset by 19% to 25% corporation tax saving in the SPV (£190 to £250). Net cost: roughly £150 to £210 per £1,000 extracted. For comparison, £1,000 of dividend extracted at the higher-rate dividend band of 35.75% is taxed at £358 personally with no CT saving (dividends paid from post-CT profits), net cost £358. £1,000 of salary at the higher-rate marginal income tax + NI is approximately £490 to £530 personally, less the 19% to 25% CT saving in the company, net cost £290 to £330. Rent extraction is the cheapest of the three for higher-rate landlords on un-mortgaged property; the comparison shifts where section 24 applies to mortgaged property in personal hands.`
- Arithmetic: £1,000 × 35.75% = £358 (was £337.50 → £338).

### Occurrence 2 — line 152
- Classification: NEEDS-PATCH (worked example, employer NI as current rate)
- Current text: `<li>Employer NI at 13.8% on the portion above the secondary threshold (£5,000 per Hunt November 2022 reform): roughly £4,830 paid by SPV.</li>`
- Replacement: `<li>Employer NI at 15% on the portion above the secondary threshold (£5,000 per Hunt November 2022 reform): roughly £5,250 paid by SPV.</li>`
- Arithmetic: salary £40,000 less secondary threshold £5,000 = £35,000 in NIC base. £35,000 × 15% = £5,250 (was £35,000 × 13.8% = £4,830).
- Knock-on (manifest only): line 156 references the £44,830 salary + employer NI figure: should become £40,000 + £5,250 = £45,250. Effective tax rate "roughly 35%" may shift fractionally; ARITHMETIC FLAG: manager to recompute line 156 totals and the "roughly 35%" round figure.

### Occurrence 3 — line 163
- Classification: NEEDS-PATCH (worked example, higher-rate dividend)
- Current text: `<li>Higher-rate dividend tax at 33.75% on £40,000 less the £500 allowance: roughly £13,331.</li>`
- Replacement: `<li>Higher-rate dividend tax at 35.75% on £40,000 less the £500 allowance: roughly £14,124.</li>`
- Arithmetic: £39,500 × 35.75% = £14,121.25 → £14,124 (slight rounding). Or precise: £39,500 × 35.75% = £14,121.25 → "roughly £14,121". Manager to choose. Using same loose rounding as old.
- Knock-on (manifest only): line 165 "Net household cost per £40,000 net extracted: £40,000 - £13,331 = £26,669 in hand" becomes £40,000 − £14,124 = £25,876. Effective tax rate at small-profits "roughly 46%" tilts slightly. ARITHMETIC FLAG: manager to update line 165 and the "roughly 46%" rounded figure.

### Occurrence 4 — line 179
- Classification: NEEDS-PATCH (comparison narrative, basic-rate dividend rate cited as current)
- Current text: `<p>For a higher-rate taxpayer with an un-mortgaged personally-held property the SPV uses, rent extraction is the cheapest of the three routes by 3 to 14 percentage points of effective tax rate. The advantage narrows where the property is mortgaged (section 24 erodes the personal-side tax efficiency), where the SPV is at the main 25% CT rate (the CT saving is bigger, which helps), or where the founder is a basic-rate taxpayer (the dividend rate at 8.75% becomes competitive with rent at 20%).</p>`
- Replacement: `<p>For a higher-rate taxpayer with an un-mortgaged personally-held property the SPV uses, rent extraction is the cheapest of the three routes by 3 to 14 percentage points of effective tax rate. The advantage narrows where the property is mortgaged (section 24 erodes the personal-side tax efficiency), where the SPV is at the main 25% CT rate (the CT saving is bigger, which helps), or where the founder is a basic-rate taxpayer (the dividend rate at 10.75% becomes competitive with rent at 20%).</p>`

---

## File: Property/web/content/blog/close-investment-holding-company-property.md

### Occurrence 1 — line 38
- Classification: HISTORICAL-CONTEXT / RATE-DEFINITIONAL (s.455 charge rate)
- Current text: `No. The section 455 charge on overdrawn director's loan accounts applies to all close companies regardless of CIHC status. The rate is 33.75% on the year-end overdrawn balance not repaid within nine months and one day. The CIHC question and the section 455 question are independent. A company can be a non-CIHC (qualifying for small profits rate) but still face section 455 on an overdrawn DLA; a CIHC has the same section 455 exposure on top of paying 25% on all profits.`
- ARITHMETIC FLAG: manager to confirm s.455 rate post-6-April-2026.

### Occurrence 2 — line 137
- Classification: HISTORICAL-CONTEXT / RATE-DEFINITIONAL (s.455 charge rate)
- Current text: `<li><strong>Loans to participators (section 455).</strong> The 33.75% charge on overdrawn director's loan account balances applies to all close companies, not just CIHCs. CIHC status is irrelevant to the section 455 question.</li>`
- ARITHMETIC FLAG: manager to confirm s.455 rate post-6-April-2026.

---

## File: Property/web/content/blog/corporation-tax-rates-property-companies-2026-27.md

### Occurrence 1 — line 23
- Classification: NEEDS-PATCH (current-state dividend rate listing)
- Current text: `Retained profits in property companies face only corporation tax (19% or 25%) with no immediate personal tax charge. However, if profits are later distributed as dividends, shareholders pay dividend tax at 8.75%, 33.75%, or 39.35% depending on their income level.`
- Replacement: `Retained profits in property companies face only corporation tax (19% or 25%) with no immediate personal tax charge. However, if profits are later distributed as dividends, shareholders pay dividend tax at 10.75%, 35.75%, or 39.35% depending on their income level.`

### Occurrence 2 — line 56
- Classification: NEEDS-PATCH (worked example)
- Current text: `<p>For 2026/27, dividends face tax at 8.75% (basic rate), 33.75% (higher rate), or 39.35% (additional rate) after a £500 annual dividend allowance. This creates a combined tax cost when added to corporation tax. £50,000 company profit generates £40,500 after corporation tax (19%). If distributed as dividends to a higher-rate taxpayer, this creates additional tax of £13,669 (33.75% of £40,500), resulting in net income of £26,831.</p>`
- Replacement: `<p>For 2026/27, dividends face tax at 10.75% (basic rate), 35.75% (higher rate), or 39.35% (additional rate) after a £500 annual dividend allowance. This creates a combined tax cost when added to corporation tax. £50,000 company profit generates £40,500 after corporation tax (19%). If distributed as dividends to a higher-rate taxpayer, this creates additional tax of £14,479 (35.75% of £40,500), resulting in net income of £26,021.</p>`
- Arithmetic: £40,500 × 35.75% = £14,478.75 → £14,479. £40,500 − £14,479 = £26,021.

---

## File: Property/web/content/blog/corporation-tax-vs-income-tax-landlords-2027.md

### Occurrence 1 — line 82
- Classification: NEEDS-PATCH (rate definitional list)
- Current text: `<li><strong>Basic rate:</strong> 8.75%</li>`
- Replacement: `<li><strong>Basic rate:</strong> 10.75%</li>`

### Occurrence 2 — line 83
- Classification: NEEDS-PATCH
- Current text: `<li><strong>Higher rate:</strong> 33.75%</li>`
- Replacement: `<li><strong>Higher rate:</strong> 35.75%</li>`

### Occurrence 3 — line 84
- Classification: UNRELATED (39.35% additional rate is unchanged)
- Current text: `<li><strong>Additional rate:</strong> 39.35%</li>`
- Replacement: (no change)

### Occurrence 4 — line 88
- Classification: NEEDS-PATCH (combined effective rate computation)
- Current text: `<li><strong>Basic rate taxpayer:</strong> 19% corporation tax + 8.75% dividend tax = 26.1% total</li>`
- Replacement: `<li><strong>Basic rate taxpayer:</strong> 19% corporation tax + 10.75% dividend tax = 27.7% total</li>`
- Arithmetic: 19% + (10.75% × 81%) = 19% + 8.7075% = 27.71% → 27.7%. (Old: 19% + (8.75% × 81%) = 19% + 7.0875% = 26.09% → 26.1%.)

### Occurrence 5 — line 89
- Classification: NEEDS-PATCH
- Current text: `<li><strong>Higher rate taxpayer:</strong> 19% corporation tax + 33.75% dividend tax = 46.4% total</li>`
- Replacement: `<li><strong>Higher rate taxpayer:</strong> 19% corporation tax + 35.75% dividend tax = 48.0% total</li>`
- Arithmetic: 19% + (35.75% × 81%) = 19% + 28.9575% = 47.96% → 48.0%. (Old: 19% + (33.75% × 81%) = 19% + 27.3375% = 46.34% → 46.4%.)

---

## File: Property/web/content/blog/director-loan-account-property-company-mechanics.md

### Occurrences 1-7 (lines 32, 36, 96, 102, 104, 108, 152) — all relate to the section 455 charge rate or the upper-rate dividend tax rate that s.455 tracks.
- Classification: HISTORICAL-CONTEXT / RATE-DEFINITIONAL (entire page is the canonical s.455 mechanics page; rate appears repeatedly, including line 104 which explicitly tracks the historical sequence "from 32.5% to 33.75% from 6 April 2022 alongside the headline dividend tax increase, and has held at 33.75% since")
- ARITHMETIC FLAG: manager to confirm whether the Finance Act enacting the F-20 dividend rate uplift also raised the s.455 rate to 35.75%, or whether it remained at 33.75%. THIS PAGE IS THE CANONICAL REFERENCE for s.455 and needs an authoritative decision before patching. If s.455 has risen in lockstep:
  - Line 32 (FAQ): "...the company pays 33.75% of £40,000 (£13,500) as section 455 corporation tax" → "35.75%" with arithmetic £40,000 × 35.75% = £14,300.
  - Line 36 (FAQ): "...write-off itself is treated as a distribution... taxable as a dividend at the relevant rate (8.75%, 33.75% or 39.35% depending on band)" → "10.75%, 35.75% or 39.35%" (the dividend element is F-20; needs patching regardless of s.455 outcome).
  - Line 96: "(taxable at 33.75% in the higher-rate dividend band, after the first £500 dividend allowance)" → "35.75%" (this is the higher-rate dividend tax, not s.455 — NEEDS-PATCH regardless).
  - Line 102: "...corporation tax of 33.75% of the outstanding amount" → "35.75%" if s.455 tracks F-20.
  - Line 104: "The 33.75% rate matches the upper-rate dividend tax rate. ... The rate rose from 32.5% to 33.75% from 6 April 2022 alongside the headline dividend tax increase, and has held at 33.75% since." → Complex rewrite required. The historical narrative "from 32.5% to 33.75% from 6 April 2022" is HISTORICAL-CONTEXT and should be preserved. The "has held at 33.75% since" needs updating to "has held at 33.75% through the 2025/26 tax year, rising to 35.75% from 6 April 2026 in lockstep with the higher-rate dividend tax uplift" — IF s.455 tracks.
  - Line 108: "...the company must pay £13,500 (£40,000 × 33.75%) as section 455 corporation tax" → £40,000 × 35.75% = £14,300 if s.455 tracks.
  - Line 152: "On a £40,000 overdrawn balance for a higher-rate-taxpayer director, the personal tax on the write-off is £40,000 × 33.75% = £13,500, identical to the section 455 charge being refunded" → £40,000 × 35.75% = £14,300, and the "identical" symmetry holds only IF s.455 also rises to 35.75%.

### Specific: Occurrence at line 96 (independent NEEDS-PATCH)
- Classification: NEEDS-PATCH (higher-rate dividend tax, not s.455)
- Current text (excerpt from line 96): `(taxable at 33.75% in the higher-rate dividend band, after the first £500 dividend allowance), the saving over the six years is broadly in the order of £50,000 to £60,000 of personal income tax, depending on her other income each year.`
- Replacement (excerpt): `(taxable at 35.75% in the higher-rate dividend band, after the first £500 dividend allowance), the saving over the six years is broadly in the order of £53,000 to £64,000 of personal income tax, depending on her other income each year.`
- Arithmetic: Old £30,000/yr × 33.75% × 6 years ≈ £60,750 (top of "£50,000 to £60,000" range). New £30,000/yr × 35.75% × 6 = £64,350. Linear scaling: range becomes roughly £53,000 to £64,000. ARITHMETIC FLAG: manager to confirm whether to widen the range or keep loose rounding.

---

## File: Property/web/content/blog/director-loan-property-company.md

### Occurrences 1-3 (lines 17, 19, 49) — all relate to section 455 charge rate
- Classification: HISTORICAL-CONTEXT / RATE-DEFINITIONAL (s.455 rate)
- ARITHMETIC FLAG: manager to confirm s.455 rate post-6-April-2026 before patching. If s.455 has risen to 35.75% in lockstep with F-20, all three occurrences become NEEDS-PATCH with `33.75%` → `35.75%` substitution. If s.455 remained at 33.75%, no change required on this page.

---

## File: Property/web/content/blog/extracting-money-from-property-limited-company.md

### Occurrence 1 — line 22
- Classification: NEEDS-PATCH (current-state cite of employer NIC rate change AND dividend rate listing)
- Current text: `From 6 April 2025 the employer secondary national insurance threshold dropped from £9,100 to £5,000 and the employer NIC rate rose from 13.8% to 15%. A £12,570 salary now triggers employer NIC of £1,135.50 (£12,570 minus £5,000 at 15%). Property investment companies are generally not eligible for the Employment Allowance because of the single-director restriction.`
- Replacement: (NO CHANGE — this is a HISTORICAL-CONTEXT/before-after framing of the F-19 change itself. The phrase "the employer NIC rate rose from 13.8% to 15%" is the explicit pre-and-post comparison, exactly the class of HISTORICAL-CONTEXT noted as DO NOT PATCH.)
- Classification REVISED: HISTORICAL-CONTEXT (explicit before/after comparison) — leave intact.

### Occurrence 2 — line 24
- Classification: NEEDS-PATCH (dividend rates listed as current state)
- Current text: `A dividend is paid from post-corporation-tax profits, so the company has already paid 25% (or 19%, or marginal-relief blend) on the profit before any dividend can be declared. Dividend tax rates of 8.75%, 33.75% and 39.35% then apply at the shareholder level. A salary attracts employer NIC of 15% (post-April-2025), employee NIC of 8% in the basic-rate band, and income tax at marginal rate, but is corporation-tax-deductible by the company. For a basic-rate director extracting modest amounts, the dividend route is usually more efficient; for higher-rate directors at the margin, the maths is closer than headline rates suggest.`
- Replacement: `A dividend is paid from post-corporation-tax profits, so the company has already paid 25% (or 19%, or marginal-relief blend) on the profit before any dividend can be declared. Dividend tax rates of 10.75%, 35.75% and 39.35% then apply at the shareholder level. A salary attracts employer NIC of 15% (post-April-2025), employee NIC of 8% in the basic-rate band, and income tax at marginal rate, but is corporation-tax-deductible by the company. For a basic-rate director extracting modest amounts, the dividend route is usually more efficient; for higher-rate directors at the margin, the maths is closer than headline rates suggest.`

### Occurrence 3 — line 32
- Classification: NEEDS-PATCH (rate definitional)
- Current text: `No, the personal tax treatment is identical. A dividend is a dividend regardless of the underlying activity that generated the company's profit. The shareholder uses the dividend allowance (£500 in 2026/27) and then pays at 8.75% / 33.75% / 39.35% depending on their income band.`
- Replacement: `No, the personal tax treatment is identical. A dividend is a dividend regardless of the underlying activity that generated the company's profit. The shareholder uses the dividend allowance (£500 in 2026/27) and then pays at 10.75% / 35.75% / 39.35% depending on their income band.`

### Occurrence 4 — line 36
- Classification: NEEDS-PATCH (share buyback / MVL distribution rate)
- Current text: `The default tax treatment for the seller is as a distribution (taxed as a dividend at 8.75% / 33.75% / 39.35%).`
- Replacement: `The default tax treatment for the seller is as a distribution (taxed as a dividend at 10.75% / 35.75% / 39.35%).`

### Occurrence 5 — line 62
- Classification: HISTORICAL-CONTEXT (explicit before/after comparison — F-19 change framing)
- Current text: `<li>The employer NIC rate rose from 13.8% to 15%.</li>`
- Replacement: (no change — historical context describing the rate change)

### Occurrence 6 — line 65
- Classification: HISTORICAL-CONTEXT (explicit before/after comparison)
- Current text: `<p>A salary of £12,570 (the personal allowance) used to be the standard answer because it covered the personal allowance without triggering income tax, sat just above the £9,100 secondary threshold creating a small employer NIC charge (£478 at 13.8%), and gave the director a year of National Insurance record. Post-April-2025, the same £12,570 salary triggers employer NIC of £1,135.50 (£7,570 × 15%). The arithmetic is no longer obviously favourable.</p>`
- Replacement: (no change — explicit "used to be / Post-April-2025" before-after framing. The 13.8% reference is the historical pre-change figure paired with the new 15% figure.)

### Occurrence 7 — line 78
- Classification: NEEDS-PATCH (dividend rates listed as current state-of-play for 2026/27)
- Current text: `<p>Dividends are paid from post-corporation-tax profits and are taxed in the shareholder's hands after the dividend allowance (£500 in 2026/27, down from £1,000 in 2023/24, and from £2,000 before that). Tax rates are 8.75% in the basic-rate band, 33.75% in the higher-rate band, and 39.35% in the additional-rate band.</p>`
- Replacement: `<p>Dividends are paid from post-corporation-tax profits and are taxed in the shareholder's hands after the dividend allowance (£500 in 2026/27, down from £1,000 in 2023/24, and from £2,000 before that). Tax rates are 10.75% in the basic-rate band, 35.75% in the higher-rate band, and 39.35% in the additional-rate band.</p>`

### Occurrence 8 — line 80
- Classification: NEEDS-PATCH (effective rate computation)
- Current text: `<p>The mechanical efficiency of dividends comes from the combination of corporation tax already paid (typically 19% to 25% depending on profits and associated-company position) and the personal-side dividend rates being lower than equivalent income tax rates. A higher-rate-tax shareholder paying 33.75% on a dividend has a combined company-plus-personal tax rate of roughly 39% (25% × 1 minus the dividend portion taxed at 33.75%). The equivalent salary path runs to 47% or more once employer NIC, employee NIC and income tax are stacked.</p>`
- Replacement: `<p>The mechanical efficiency of dividends comes from the combination of corporation tax already paid (typically 19% to 25% depending on profits and associated-company position) and the personal-side dividend rates being lower than equivalent income tax rates. A higher-rate-tax shareholder paying 35.75% on a dividend has a combined company-plus-personal tax rate of roughly 52% (25% × 1 minus the dividend portion taxed at 35.75%). The equivalent salary path runs to 47% or more once employer NIC, employee NIC and income tax are stacked.</p>`
- Arithmetic: 25% + (35.75% × 75%) = 25% + 26.81% = 51.81% → ~52%. Old "roughly 39%" was incorrect arithmetic in the original page (25% + (33.75% × 75%) = 25% + 25.31% = 50.31%); the original "39%" looks like an editing slip — but the manager should review whether to take the opportunity to correct the underlying arithmetic at the same time as the F-20 update. ARITHMETIC FLAG: manager to recompute and pick the round-figure description.

### Occurrence 9 — line 119
- Classification: NEEDS-PATCH (worked example, basic-rate dividend tax in £150k extraction example)
- Current text: `<li>Director's personal tax: £12,570 personal allowance covers part of the dividend, £500 dividend allowance covers another £500, leaving £26,930 in basic-rate dividend band at 8.75% equals £2,356.</li>`
- Replacement: `<li>Director's personal tax: £12,570 personal allowance covers part of the dividend, £500 dividend allowance covers another £500, leaving £26,930 in basic-rate dividend band at 10.75% equals £2,895.</li>`
- Arithmetic: £26,930 × 10.75% = £2,895.0 → £2,895. (Was £26,930 × 8.75% = £2,356.4 → £2,356.)
- Knock-on (manifest only): line 120 "Total tax: £36,000 plus £2,356 equals £38,356" becomes £36,000 + £2,895 = £38,895. Line 121 "Effective tax on the £40,000 extracted: 5.9% personal-side" — personal tax £2,895 ÷ £40,000 = 7.2%. ARITHMETIC FLAG: manager to update lines 120 and 121 to keep example internally consistent.

### Occurrence 10 — line 131
- Classification: NEEDS-PATCH (Option B worked example, basic-rate dividend)
- Current text: `<li>Personal tax: £12,570 PA already partly used by salary; £6,070 of PA remaining absorbs first £6,070 of dividend; £500 dividend allowance; remaining £26,930 in basic-rate band at 8.75% equals £2,356.</li>`
- Replacement: `<li>Personal tax: £12,570 PA already partly used by salary; £6,070 of PA remaining absorbs first £6,070 of dividend; £500 dividend allowance; remaining £26,930 in basic-rate band at 10.75% equals £2,895.</li>`
- Arithmetic: £26,930 × 10.75% = £2,895.
- Knock-on (manifest only): line 132 "Total tax: £34,278 plus £2,356 equals £36,634" becomes £34,278 + £2,895 = £37,173. Line 133 "Saving versus Option A: £1,722 per year" — recomputed: £38,895 − £37,173 = £1,722. Saving figure unchanged because both totals shift by the same £539. (Note: the rounding makes Option B saving identical at £1,722.) ARITHMETIC FLAG: manager to update line 132 to £37,173 and keep line 133 saving at £1,722.

---

## File: Property/web/content/blog/fic-complete-guide-property-wealth-transfer.md

### Occurrence 1 — line 32
- Classification: NEEDS-PATCH (dividend rate listing)
- Current text: `Dividends declared by the FIC are taxed in the shareholders' hands at 8.75% (basic rate), 33.75% (higher rate), or 39.35% (additional rate), with the £500 annual dividend allowance for each shareholder.`
- Replacement: `Dividends declared by the FIC are taxed in the shareholders' hands at 10.75% (basic rate), 35.75% (higher rate), or 39.35% (additional rate), with the £500 annual dividend allowance for each shareholder.`

### Occurrence 2 — line 166
- Classification: NEEDS-PATCH
- Current text: `<p>Dividends declared by the FIC are taxed at 8.75% / 33.75% / 39.35% in the shareholders' hands. The £500 annual dividend allowance applies per shareholder.`
- Replacement: `<p>Dividends declared by the FIC are taxed at 10.75% / 35.75% / 39.35% in the shareholders' hands. The £500 annual dividend allowance applies per shareholder.`

---

## File: Property/web/content/blog/fic-estate-planning-landlord-portfolio-value-freezing-iht-mechanics.md

### Occurrence 1 — line 40
- Classification: NEEDS-PATCH (dividend rate listing cited as "from 6 April 2025" current state)
- Current text: `Two: the coupon is paid as a dividend, taxed in the founder's hands at the dividend tax rates (8.75% / 33.75% / 39.35% from 6 April 2025) above the £500 dividend allowance, with the founder receiving the net-of-tax amount as retirement income.`
- Replacement: `Two: the coupon is paid as a dividend, taxed in the founder's hands at the dividend tax rates (10.75% / 35.75% / 39.35% from 6 April 2026) above the £500 dividend allowance, with the founder receiving the net-of-tax amount as retirement income.`
- Note: "from 6 April 2025" updated to "from 6 April 2026" to reflect the F-20 in-force date (the old "from 6 April 2025" was misdated even pre-F-20; the pre-F-20 rates have applied since 6 April 2022).

---

## File: Property/web/content/blog/fic-property-retirement-decumulation-mechanics-uk.md

### Occurrence 1 — line 18
- Classification: NEEDS-PATCH (summary text, dividend cliff descriptions; current-state-of-play)
- Current text: `The 8.75 to 33.75 percent dividend cliff at £50,270, the 33.75 to 39.35 percent cliff at £125,140, and the personal allowance taper above £100,000 all shape the sequencing.`
- Replacement: `The 10.75 to 35.75 percent dividend cliff at £50,270, the 35.75 to 39.35 percent cliff at £125,140, and the personal allowance taper above £100,000 all shape the sequencing.`

### Occurrence 2 — line 22
- Classification: NEEDS-PATCH (FAQ, dividend rate listing as current state)
- Current text: `Second, the preference share coupon (typically a fixed 4% to 7% cumulative dividend on the paid-up preference value) produces a predictable dividend stream taxed in the founder's hands at dividend rates (8.75%, 33.75%, or 39.35% depending on marginal band).`
- Replacement: `Second, the preference share coupon (typically a fixed 4% to 7% cumulative dividend on the paid-up preference value) produces a predictable dividend stream taxed in the founder's hands at dividend rates (10.75%, 35.75%, or 39.35% depending on marginal band).`

### Occurrence 3 — line 34
- Classification: NEEDS-PATCH (FAQ, basic-to-higher dividend cliff)
- Current text: `The basic-rate dividend rate (8.75%) applies up to total income of £50,270 in 2026/27; the higher-rate dividend rate (33.75%) applies from £50,271 upwards. A property founder with combined state pension, FIC dividend coupon, and any other taxable income approaching £50,270 faces a marginal effective dividend rate jumping from 8.75% to 33.75% on the next pound. ... The 33.75 to 39.35% cliff at £125,140 has similar avoidance logic, with the personal allowance taper between £100,000 and £125,140 (£1 of allowance lost for every £2 of income above £100,000) producing an effective marginal rate around 60% on income in that band.`
- Replacement: `The basic-rate dividend rate (10.75%) applies up to total income of £50,270 in 2026/27; the higher-rate dividend rate (35.75%) applies from £50,271 upwards. A property founder with combined state pension, FIC dividend coupon, and any other taxable income approaching £50,270 faces a marginal effective dividend rate jumping from 10.75% to 35.75% on the next pound. ... The 35.75 to 39.35% cliff at £125,140 has similar avoidance logic, with the personal allowance taper between £100,000 and £125,140 (£1 of allowance lost for every £2 of income above £100,000) producing an effective marginal rate around 60% on income in that band.`
- Note: all four 8.75% / 33.75% references on this line are current-state and need patching.

### Occurrence 4 — line 36
- Classification: NEEDS-PATCH (dividend rate listing)
- Current text: `Extracted profits hit dividend tax at the founder's marginal rate (8.75%, 33.75%, or 39.35%).`
- Replacement: `Extracted profits hit dividend tax at the founder's marginal rate (10.75%, 35.75%, or 39.35%).`

### Occurrence 5 — line 44
- Classification: NEEDS-PATCH (basic-rate dividend rate at state pension layer)
- Current text: `For a founder also drawing FIC dividends, the state pension uses the personal allowance first (covering it entirely), the dividend allowance £500 covers the next slice, and then the basic-rate dividend rate of 8.75% applies up to £50,270 of total taxable income.`
- Replacement: `For a founder also drawing FIC dividends, the state pension uses the personal allowance first (covering it entirely), the dividend allowance £500 covers the next slice, and then the basic-rate dividend rate of 10.75% applies up to £50,270 of total taxable income.`

### Occurrence 6 — line 74
- Classification: NEEDS-PATCH (worked example dividend tax bands)
- Current text: `After the £500 dividend allowance (2026/27), the first slice falls in the basic-rate dividend band at 8.75% up to total income of £50,270, the next slice at 33.75% up to £125,140, and the remainder at 39.35%. A founder with no other income drawing the £50,000 preference coupon described above pays approximately £3,260 in dividend tax (using personal allowance and dividend allowance against the lower slices).`
- Replacement: `After the £500 dividend allowance (2026/27), the first slice falls in the basic-rate dividend band at 10.75% up to total income of £50,270, the next slice at 35.75% up to £125,140, and the remainder at 39.35%. A founder with no other income drawing the £50,000 preference coupon described above pays approximately £4,000 in dividend tax (using personal allowance and dividend allowance against the lower slices).`
- Arithmetic: £50,000 coupon less £12,570 PA less £500 dividend allowance = £36,930 in basic-rate band. £36,930 × 10.75% = £3,970 → £4,000 (rounded). (Old: £36,930 × 8.75% = £3,231 → "approximately £3,260" — original page rounded loose.) ARITHMETIC FLAG: manager to confirm round figure.

### Occurrence 7 — line 101
- Classification: NEEDS-PATCH (dividend cliff narrative)
- Current text: `<p><strong>The £50,270 basic-to-higher-rate cliff.</strong> Below this total income level the dividend tax is 8.75%; above it, 33.75%. The 25 percentage point jump is the largest cliff in the decumulation calendar.`
- Replacement: `<p><strong>The £50,270 basic-to-higher-rate cliff.</strong> Below this total income level the dividend tax is 10.75%; above it, 35.75%. The 25 percentage point jump is the largest cliff in the decumulation calendar.`
- Note: "25 percentage point jump" stays correct (35.75% − 10.75% = 25 percentage points).

### Occurrence 8 — line 105
- Classification: NEEDS-PATCH (39.35% in context of upper cliff narrative; 5.6pp jump description)
- Current text: `<p><strong>The £125,140 higher-to-additional-rate cliff.</strong> Above this total income level the dividend tax is 39.35%; the 5.6 percentage point jump is smaller than the basic-to-higher cliff but still material across a £25,000 or £50,000 incremental draw.`
- Replacement: `<p><strong>The £125,140 higher-to-additional-rate cliff.</strong> Above this total income level the dividend tax is 39.35%; the 3.6 percentage point jump is smaller than the basic-to-higher cliff but still material across a £25,000 or £50,000 incremental draw.`
- Arithmetic: 39.35% − 35.75% = 3.6 percentage points (was 39.35% − 33.75% = 5.6 percentage points). 39.35% itself is unchanged; only the gap-arithmetic descriptive figure changes.

---

## File: Property/web/content/blog/fic-vs-discretionary-trust-property-comparison.md

### Occurrence 1 — line 28
- Classification: HISTORICAL-CONTEXT / RATE-DEFINITIONAL (this is the trust's tax rate on dividend income, NOT a personal dividend tax rate — trust dividend rates are separately set under ITTOIA 2005 and historically tracked the basic dividend rate)
- Current text: `A discretionary trust pays income tax at 45% on most rental income above the £500 standard rate band, plus the trust rate of 8.75% on dividend income above the standard rate.`
- ARITHMETIC FLAG: manager to confirm whether the F-20 dividend rate uplift also raised the trust dividend rate from 8.75%. If yes, → "10.75%". If trust rates moved differently (e.g., separately legislated), no patch or different number. (This is plausibly a separate dependent figure that the manager should verify against gov.uk's trust income tax rate table for 2026/27.)

### Occurrence 2 — line 115
- Classification: HISTORICAL-CONTEXT / RATE-DEFINITIONAL (trust dividend rate)
- Current text: `<tr><td>Dividend income (above £500 standard band)</td><td>39.35% trust rate</td><td>Generally not relevant for property FICs (FIC receives no dividend income)</td></tr>`
- ARITHMETIC FLAG: manager to confirm whether trust rate on dividend income (39.35% on this line — appears to be the trust upper-rate dividend tax matching the historical personal additional rate) remained at 39.35% or shifted. 39.35% is the personal additional rate (unchanged in F-20). If the trust dividend rate tracks the upper-rate dividend tax, the figure stays at 39.35%. UNRELATED if it does — but worth manager check.

### Occurrence 3 — line 127
- Classification: NEEDS-PATCH (range citing personal dividend rates as current state)
- Current text: `The £26,000 headline gap is the principal income-tax argument for the FIC. The complication is what happens on extraction: trust distributions to beneficiaries carry through the trust's tax credits to the beneficiary, who is taxed at their own marginal rate; FIC dividends are taxed at 8.75% to 39.35% on the recipient, without further credit for the corporation tax already paid.`
- Replacement: `The £26,000 headline gap is the principal income-tax argument for the FIC. The complication is what happens on extraction: trust distributions to beneficiaries carry through the trust's tax credits to the beneficiary, who is taxed at their own marginal rate; FIC dividends are taxed at 10.75% to 39.35% on the recipient, without further credit for the corporation tax already paid.`

### Occurrence 4 — line 129
- Classification: NEEDS-PATCH (combined effective rate computation, higher-rate dividend)
- Current text: `<p>The combined effective rate (corporate plus dividend extraction) on the FIC route for a higher-rate-taxpayer recipient is roughly: 19% corp tax + (33.75% dividend tax on the 81% post-corp-tax amount) = 46.3% effective. The trust route's beneficiary-rate flow-through for a basic-rate beneficiary is 40%; for a higher-rate beneficiary 45% (matching the trust rate). The combined-rate comparison favours the FIC where extraction is to basic-rate or non-taxpayer recipients (children at university with no other income), and the trust where extraction is to higher-rate recipients.</p>`
- Replacement: `<p>The combined effective rate (corporate plus dividend extraction) on the FIC route for a higher-rate-taxpayer recipient is roughly: 19% corp tax + (35.75% dividend tax on the 81% post-corp-tax amount) = 48.0% effective. The trust route's beneficiary-rate flow-through for a basic-rate beneficiary is 40%; for a higher-rate beneficiary 45% (matching the trust rate). The combined-rate comparison favours the FIC where extraction is to basic-rate or non-taxpayer recipients (children at university with no other income), and the trust where extraction is to higher-rate recipients.</p>`
- Arithmetic: 19% + (35.75% × 81%) = 19% + 28.96% = 47.96% → 48.0%. (Old: 19% + (33.75% × 81%) = 19% + 27.34% = 46.34% → 46.3%.)

---

## File: Property/web/content/blog/extracting-money-from-property-limited-company.md (already covered above — see entries for that file)

---

## File: Property/web/content/blog/director-loan-account-property-company-mechanics.md (already covered above — see entries for that file)

---

## File: Property/web/content/blog/close-investment-holding-company-property.md (already covered above)

---

## File: Property/web/content/blog/peterborough-property-accountant-specialist-tax-services.md

### Occurrence 1 — line 113
- Classification: NEEDS-PATCH (dividend rate listing as current state)
- Current text: `<tr><td><strong>Profit extraction</strong></td><td>Already personal income, no second step</td><td>Salary, dividends (8.75% / 33.75% / 39.35%), or director's loan repayment</td></tr>`
- Replacement: `<tr><td><strong>Profit extraction</strong></td><td>Already personal income, no second step</td><td>Salary, dividends (10.75% / 35.75% / 39.35%), or director's loan repayment</td></tr>`

---

## File: Property/web/content/blog/incorporating-property-portfolio-uk-2026.md

### Occurrence 1 — line 103
- Classification: NEEDS-PATCH (dividend rate listing as current state)
- Current text: `<li><strong>Not modelling dividend tax:</strong> Extracting profits from the company via dividends incurs income tax at 8.75% (basic), 33.75% (higher), or 39.35% (additional) on dividends above the £2,000 dividend allowance. This reduces the net benefit of incorporation.</li>`
- Replacement: `<li><strong>Not modelling dividend tax:</strong> Extracting profits from the company via dividends incurs income tax at 10.75% (basic), 35.75% (higher), or 39.35% (additional) on dividends above the £2,000 dividend allowance. This reduces the net benefit of incorporation.</li>`
- Note: "£2,000 dividend allowance" is also stale (£500 from 2024/25); ARITHMETIC FLAG: manager to consider also updating to "£500 dividend allowance" while back-patching.

---

## File: Property/web/content/blog/how-to-choose-right-property-company-structure-uk-landlords-2026.md

### Occurrence 1 — line 65
- Classification: NEEDS-PATCH (dividend rate listing as current state)
- Current text: `<li>Dividend tax at 8.75%, 33.75%, or 39.35% when distributed</li>`
- Replacement: `<li>Dividend tax at 10.75%, 35.75%, or 39.35% when distributed</li>`

### Occurrence 2 — line 100
- Classification: NEEDS-PATCH (worked example dividend tax higher rate)
- Current text: `<li>Dividend tax on full distribution: £5,468 (33.75%)</li>`
- Replacement: `<li>Dividend tax on full distribution: £5,792 (35.75%)</li>`
- Arithmetic: Need to find the dividend base. Inverse: £5,468 ÷ 33.75% = £16,201. Apply new rate: £16,201 × 35.75% = £5,791.86 → £5,792. ARITHMETIC FLAG: manager to verify the dividend base on this worked example (£16,201?) matches the figure used in surrounding narrative.

### Occurrence 3 — line 118
- Classification: NEEDS-PATCH (worked example dividend tax higher rate)
- Current text: `<li>Dividend tax on full distribution: £15,036 (33.75%)</li>`
- Replacement: `<li>Dividend tax on full distribution: £15,927 (35.75%)</li>`
- Arithmetic: £15,036 ÷ 33.75% = £44,551 base. £44,551 × 35.75% = £15,927. ARITHMETIC FLAG: manager to verify dividend base matches surrounding narrative on the £125k example.

---

## File: Property/web/content/blog/2027-tax-rates-incorporation-decision-uk-landlords.md (already covered above)

---

## File: Property/web/content/blog/how-much-tax-rental-income-uk-complete-guide.md

### Occurrence 1 — line 33
- Classification: NEEDS-PATCH (dividend rate listing)
- Current text: `Profits taxed inside a limited company at 19-25% corporation tax are then subject to dividend tax on extraction at 8.75% basic, 33.75% higher, or 39.35% additional rate (above the £500 dividend allowance). The combined effective rate on extracted profit (corporation tax plus dividend tax) is typically 26%-44% depending on the landlord's personal band, which can be higher or lower than personal income tax on rental profit depending on leverage.`
- Replacement: `Profits taxed inside a limited company at 19-25% corporation tax are then subject to dividend tax on extraction at 10.75% basic, 35.75% higher, or 39.35% additional rate (above the £500 dividend allowance). The combined effective rate on extracted profit (corporation tax plus dividend tax) is typically 28%-48% depending on the landlord's personal band, which can be higher or lower than personal income tax on rental profit depending on leverage.`
- Arithmetic: Range update. Lower end: 19% + (10.75% × 81%) = 27.71% → 28%. Upper end (additional rate, unchanged 39.35%): 25% + (39.35% × 75%) = 25% + 29.51% = 54.51% — old text says 44% which doesn't match either old or new arithmetic precisely (likely a loose figure). For higher-rate at 25%: 25% + (35.75% × 75%) = 25% + 26.81% = 51.81%. ARITHMETIC FLAG: manager to recompute the range; old "26%-44%" appears to have been a loose bracket; new range "28%-48%" is illustrative but should be verified.

---

## File: Property/web/content/blog/tax-efficient-property-investment-structure-guide.md

### Occurrence 1 — line 17
- Classification: NEEDS-PATCH (dividend rate listing)
- Current text: `It does not work for basic-rate landlords, for low-leverage portfolios, or for landlords who draw every pound of profit as dividends (which adds 8.75%, 33.75%, or 39.35% dividend tax to the corporation tax already paid).`
- Replacement: `It does not work for basic-rate landlords, for low-leverage portfolios, or for landlords who draw every pound of profit as dividends (which adds 10.75%, 35.75%, or 39.35% dividend tax to the corporation tax already paid).`

### Occurrence 2 — line 25
- Classification: NEEDS-PATCH (dividend rate listing)
- Current text: `Second, the cost of getting money out: profits face corporation tax (19-25%) plus dividend tax on extraction (8.75% basic, 33.75% higher, 39.35% additional), which can leave headline-rate higher-rate landlords with little net saving if every pound is drawn.`
- Replacement: `Second, the cost of getting money out: profits face corporation tax (19-25%) plus dividend tax on extraction (10.75% basic, 35.75% higher, 39.35% additional), which can leave headline-rate higher-rate landlords with little net saving if every pound is drawn.`

### Occurrence 3 — line 186
- Classification: NEEDS-PATCH (worked example table cell, basic-rate dividend)
- Current text: `<tr><td>Personal income tax on profit</td><td>£8,800 (20%)</td><td>n/a</td><td>£2,580 (8.75% dividend)</td></tr>`
- Replacement: `<tr><td>Personal income tax on profit</td><td>£8,800 (20%)</td><td>n/a</td><td>£3,170 (10.75% dividend)</td></tr>`
- Arithmetic: Original £2,580 ÷ 8.75% = £29,486 base; this looks oddly off. Recompute: surrounding row line 184 "Taxable rental profit £24,000" for the limited co extract column. Dividend = £24,000 − CT £4,560 = £19,440. £19,440 × 8.75% = £1,701 (not £2,580). The original arithmetic in the page is inconsistent. ARITHMETIC FLAG: manager to verify the original example's arithmetic before applying any patch. If applying loose substitution: £2,580 × (10.75/8.75) = £3,170. (Note: line 188 "Net tax" downstream of this cell would change from £7,140 to £7,730 with patch.) ARITHMETIC FLAG raised.

### Occurrence 4 — line 203
- Classification: NEEDS-PATCH (worked example table cell, higher-rate dividend)
- Current text: `<tr><td>Personal income tax on profit</td><td>£17,600 (40%)</td><td>n/a</td><td>£6,548 (33.75% dividend)</td></tr>`
- Replacement: `<tr><td>Personal income tax on profit</td><td>£17,600 (40%)</td><td>n/a</td><td>£6,936 (35.75% dividend)</td></tr>`
- Arithmetic: £6,548 ÷ 33.75% = £19,400 base. £19,400 × 35.75% = £6,936. (Surrounding rows: line 201 "Taxable rental profit £24,000", line 202 "CT £4,560" → distributable £19,440; minor inconsistency between original £19,400 and £19,440 implied — original page also slightly inconsistent.) ARITHMETIC FLAG: manager to verify and update downstream line 205 "Net tax" (£11,108 → likely £11,496) and line 206 saving figure (£2,492 → £2,104).

---

## File: Property/web/content/blog/how-to-calculate-net-rental-income-after-all-costs-uk-guide.md

### Occurrence 1 — line 33
- Classification: NEEDS-PATCH (dividend rate listing as current state)
- Current text: `Companies are not subject to Section 24. Mortgage interest is fully deductible against company profit. There is no add-back, no separate tax reducer. Corporation tax (19% to 25%) applies to the net profit figure. If profit is later extracted as a dividend, the shareholder pays a further 8.75%, 33.75%, or 39.35% personal tax. Net cash to the shareholder after both taxes is often similar to personal ownership after Section 24, the company route mainly helps if you retain profits inside the company for portfolio growth rather than extracting everything.`
- Replacement: `Companies are not subject to Section 24. Mortgage interest is fully deductible against company profit. There is no add-back, no separate tax reducer. Corporation tax (19% to 25%) applies to the net profit figure. If profit is later extracted as a dividend, the shareholder pays a further 10.75%, 35.75%, or 39.35% personal tax. Net cash to the shareholder after both taxes is often similar to personal ownership after Section 24, the company route mainly helps if you retain profits inside the company for portfolio growth rather than extracting everything.`

### Occurrence 2 — line 214
- Classification: NEEDS-PATCH (worked example table cell, higher-rate dividend)
- Current text: `<tr><td>If subsequently extracted as dividend (higher rate £17,496 × 33.75%)</td><td>£5,905</td></tr>`
- Replacement: `<tr><td>If subsequently extracted as dividend (higher rate £17,496 × 35.75%)</td><td>£6,255</td></tr>`
- Arithmetic: £17,496 × 35.75% = £6,255.78 → £6,255 (round to nearest pound, consistent with how £5,905 was rounded from £5,905.95).

---

## File: Property/web/content/blog/2027-property-income-tax-rates-landlords-uk.md (already covered above)

---

## File: Property/web/content/blog/residential-property-developer-tax-uk.md

### Occurrence 1 — line 19
- Classification: NEEDS-PATCH (dividend rate listing as current state)
- Current text: `Personally-held developer profit is taxed as trading income at marginal income tax rates (20%, 40%, or 45%) plus Class 4 National Insurance contributions (6% from 6 April 2024 between £12,570 and £50,270, 2% above). Combined effective rate for a higher rate developer is around 47%. Through a limited company, the profit is taxed at corporation tax rates (19% on first £50,000, marginal relief between £50,000 and £250,000, 25% above). Extraction as dividends adds 8.75%, 33.75%, or 39.35% personal tax. The company route typically saves tax for higher rate developers retaining profits for further developments.`
- Replacement: `Personally-held developer profit is taxed as trading income at marginal income tax rates (20%, 40%, or 45%) plus Class 4 National Insurance contributions (6% from 6 April 2024 between £12,570 and £50,270, 2% above). Combined effective rate for a higher rate developer is around 47%. Through a limited company, the profit is taxed at corporation tax rates (19% on first £50,000, marginal relief between £50,000 and £250,000, 25% above). Extraction as dividends adds 10.75%, 35.75%, or 39.35% personal tax. The company route typically saves tax for higher rate developers retaining profits for further developments.`

### Occurrence 2 — line 98
- Classification: NEEDS-PATCH (dividend rate listing as current state)
- Current text: `<p>Profit extraction works the same as a BTL company: small director salary up to the NI threshold, dividends from post-CT profits (8.75% basic, 33.75% higher, 39.35% additional), pension contributions paid by the company (deductible against CT, no personal tax going in), and reinvested retained earnings for the next project.</p>`
- Replacement: `<p>Profit extraction works the same as a BTL company: small director salary up to the NI threshold, dividends from post-CT profits (10.75% basic, 35.75% higher, 39.35% additional), pension contributions paid by the company (deductible against CT, no personal tax going in), and reinvested retained earnings for the next project.</p>`

---

## File: Property/web/content/blog/how-to-scale-buy-to-let-portfolio-1-to-10-properties.md

### Occurrence 1 — line 109
- Classification: NEEDS-PATCH (current-state higher-rate dividend tax)
- Current text: `<p>If you have incorporated, the next concern is dividend extraction strategy. Drawing all profit as dividends each year mostly negates the corporation tax saving (33.75% higher rate dividend tax on top of corporation tax). Effective strategies use a small director salary (up to the NI threshold), modest dividends to fill the basic rate band, pension contributions paid by the company (deductible against corporation tax, no personal tax in), and retained profit for portfolio growth.</p>`
- Replacement: `<p>If you have incorporated, the next concern is dividend extraction strategy. Drawing all profit as dividends each year mostly negates the corporation tax saving (35.75% higher rate dividend tax on top of corporation tax). Effective strategies use a small director salary (up to the NI threshold), modest dividends to fill the basic rate band, pension contributions paid by the company (deductible against corporation tax, no personal tax in), and retained profit for portfolio growth.</p>`

---

## File: Property/web/content/blog/spv-property-investment-special-purpose-vehicle-guide.md

### Occurrence 1 — line 25
- Classification: NEEDS-PATCH (dividend rate listing as current state)
- Current text: `Dividends from a UK SPV fall under the standard dividend tax regime for the shareholder. The dividend allowance is £500 for 2026/27 (down from £1,000 in 2024/25). Above the allowance, dividend rates for 2026/27 are 8.75% (basic), 33.75% (higher) and 39.35% (additional rate).`
- Replacement: `Dividends from a UK SPV fall under the standard dividend tax regime for the shareholder. The dividend allowance is £500 for 2026/27 (down from £1,000 in 2024/25). Above the allowance, dividend rates for 2026/27 are 10.75% (basic), 35.75% (higher) and 39.35% (additional rate).`

### Occurrence 2 — line 37
- Classification: HISTORICAL-CONTEXT / RATE-DEFINITIONAL (s.455 charge rate cited)
- Current text: `Drawing more out of the company than the DLA balance plus available dividends creates an overdrawn DLA, which can trigger benefit-in-kind charges and a section 455 corporation tax charge at 33.75%.`
- ARITHMETIC FLAG: manager to confirm s.455 rate post-6-April-2026.

### Occurrence 3 — line 136
- Classification: NEEDS-PATCH (dividend rate listing as current state)
- Current text: `<p>The most common route for property SPV shareholders. The dividend allowance is £500 for 2026/27. Above the allowance, dividend rates for 2026/27 are 8.75% (basic), 33.75% (higher) and 39.35% (additional rate). The company gets no deduction for dividends paid.</p>`
- Replacement: `<p>The most common route for property SPV shareholders. The dividend allowance is £500 for 2026/27. Above the allowance, dividend rates for 2026/27 are 10.75% (basic), 35.75% (higher) and 39.35% (additional rate). The company gets no deduction for dividends paid.</p>`

### Occurrence 4 — line 142
- Classification: NEEDS-PATCH (worked example, higher-rate dividend on £81)
- Current text: `<li>Dividend tax at 33.75% on £81 = £27.34</li>`
- Replacement: `<li>Dividend tax at 35.75% on £81 = £28.96</li>`
- Arithmetic: £81 × 35.75% = £28.9575 → £28.96.
- Knock-on (manifest only): line 143 "Total tax: £19 + £27.34 = £46.34, or 46.34% effective rate" becomes £19 + £28.96 = £47.96, or 47.96% effective rate. ARITHMETIC FLAG: manager to update line 143.

### Occurrence 5 — line 199
- Classification: NEEDS-PATCH (worked example, higher-rate dividend on £2,025)
- Current text: `<li>If extracted as dividend by higher-rate shareholder (33.75% above £500 allowance): roughly £683 dividend tax</li>`
- Replacement: `<li>If extracted as dividend by higher-rate shareholder (35.75% above £500 allowance): roughly £724 dividend tax</li>`
- Arithmetic: (£2,025 − £500) × 35.75% = £1,525 × 35.75% = £545.19 → roughly £545. WAIT, original calc: £2,025 × 33.75% = £683.44, this means they did NOT subtract the £500 allowance in the original. Using same convention: £2,025 × 35.75% = £723.94 → roughly £724. Sticking with original convention.
- Knock-on (manifest only): line 200 "Net cashflow to shareholder if fully extracted: £2,025 − £683 = £1,342" becomes £2,025 − £724 = £1,301. Line 204 "SPV advantage on this property exceeds £2,800 a year against extraction" — recomputed: personal loss £1,520 vs SPV extract £1,301 = £2,821, so "exceeds £2,800" remains correct. ARITHMETIC FLAG: manager to update line 200.

### Occurrence 6 — line 227
- Classification: NEEDS-PATCH (basic-rate dividend rate in narrative, 33.75% higher-rate)
- Current text: `<li><strong>Low leverage.</strong> Section 24 is the engine driving most of the SPV advantage. For a landlord with no mortgage or very modest mortgage interest, the personal route at 22 to 42% income tax often beats the SPV route at 19% corporation tax plus 33.75% dividend tax.</li>`
- Replacement: `<li><strong>Low leverage.</strong> Section 24 is the engine driving most of the SPV advantage. For a landlord with no mortgage or very modest mortgage interest, the personal route at 22 to 42% income tax often beats the SPV route at 19% corporation tax plus 35.75% dividend tax.</li>`

### Occurrence 7 — line 228
- Classification: NEEDS-PATCH (basic-rate dividend rate, combined effective figure)
- Current text: `<li><strong>Basic-rate taxpayer with full extraction.</strong> A basic-rate taxpayer is not affected by Section 24 in the same way, and the combined corporation tax + dividend tax cost (19% + 8.75% = 26.65% effective on extracted profit) is barely below the headline 22% basic-rate property income tax. Add compliance costs and the SPV often loses.</li>`
- Replacement: `<li><strong>Basic-rate taxpayer with full extraction.</strong> A basic-rate taxpayer is not affected by Section 24 in the same way, and the combined corporation tax + dividend tax cost (19% + 10.75% = 28.71% effective on extracted profit) is above the headline 22% basic-rate property income tax. Add compliance costs and the SPV often loses.</li>`
- Arithmetic: Old "19% + 8.75% = 26.65% effective" — note the original page arithmetic was using a shorthand (19% + (8.75% × 81%) = 19% + 7.09% = 26.09% should be the correct combined effective; the "26.65%" in the original looks like a slight rounding error, but I'm preserving the shorthand approach for consistency). New shorthand: 19% + (10.75% × 81%) = 19% + 8.71% = 27.71%. The text says "= 26.65%" which is the original shorthand; updated to "= 28.71%" using consistent recalculation. ALSO: "barely below the headline 22%" is incorrect against the new 28.71% number (it's well ABOVE 22%); changed "barely below" → "above" for arithmetic accuracy. ARITHMETIC FLAG: manager to verify wording change and round figure.

---

## File: Property/web/content/blog/2027-property-tax-rates-affect-capital-gains-tax-sales.md (already covered above)

---

## File: Property/web/content/blog/capital-gains-tax-property-sale-uk-2026-rates-allowances.md (already covered above)

---

## File: Property/web/content/blog/cgt-property-2027-rate-changes-uk-landlords.md (already covered above)

---

## File: Property/web/content/blog/property-investment-vs-stocks-shares-tax-comparison.md

### Occurrence 1 — line 44
- Classification: NEEDS-PATCH (dividend rate listing as current state-of-play for the 2025/26 tax year — but text says 2025/26; if the page is meant to reflect 2026/27 onwards the year needs updating too)
- Current text: `<p>Income from stocks and shares typically comes in two forms: dividends and interest. Dividends are taxed at 8.75% (basic), 33.75% (higher), and 39.35% (additional) for the 2025/26 tax year, with a £500 dividend allowance <sup><a href="#ref-1" id="cite-1">[1]</a></sup>. Interest from bonds or savings accounts is taxed at your marginal income tax rate, but the personal savings allowance (£1,000 for basic rate, £500 for higher rate) can reduce the tax bill.</p>`
- Replacement: `<p>Income from stocks and shares typically comes in two forms: dividends and interest. Dividends are taxed at 10.75% (basic), 35.75% (higher), and 39.35% (additional) for the 2026/27 tax year, with a £500 dividend allowance <sup><a href="#ref-1" id="cite-1">[1]</a></sup>. Interest from bonds or savings accounts is taxed at your marginal income tax rate, but the personal savings allowance (£1,000 for basic rate, £500 for higher rate) can reduce the tax bill.</p>`
- Note: also updating "2025/26 tax year" → "2026/27 tax year" since the F-20 effective date is 6 April 2026.

### Occurrence 2 — line 75
- Classification: NEEDS-PATCH (worked example, higher-rate dividend on £19,500)
- Current text: `<p>Now consider an investor with £20,000 in dividends from shares. With the £500 dividend allowance, taxable dividends are £19,500. At the higher rate (33.75%), the tax is approximately £6,581. However, if those shares are held in an ISA, the tax is £0. The ISA advantage is clear.</p>`
- Replacement: `<p>Now consider an investor with £20,000 in dividends from shares. With the £500 dividend allowance, taxable dividends are £19,500. At the higher rate (35.75%), the tax is approximately £6,971. However, if those shares are held in an ISA, the tax is £0. The ISA advantage is clear.</p>`
- Arithmetic: £19,500 × 35.75% = £6,971.25 → £6,971.

### Occurrence 3 — line 84
- Classification: NEEDS-PATCH (dividend rate range cited as current state)
- Current text: `<li>Dividend income is taxed at lower rates (8.75%/33.75%/39.35%) and benefits from a £500 allowance.</li>`
- Replacement: `<li>Dividend income is taxed at lower rates (10.75%/35.75%/39.35%) and benefits from a £500 allowance.</li>`

---

## File: Property/web/content/blog/property-company-dividend-tax.md

### Occurrence 1 — line 9
- Classification: NEEDS-PATCH (metaDescription, dividend rate range)
- Current text: `metaDescription: "Dividend tax rates range from 8.75% (basic) to 39.35% (additional) for 2026/27. Calculate your property company dividend liability."`
- Replacement: `metaDescription: "Dividend tax rates range from 10.75% (basic) to 39.35% (additional) for 2026/27. Calculate your property company dividend liability."`

### Occurrence 2 — line 13
- Classification: UNRELATED (39.35% additional rate — unchanged. The summary range "0% to 39.35%" still spans correctly because 0% (allowance) and 39.35% (additional) are unchanged.)
- Current text: `summary: "Property company dividends are taxed differently from salary, with rates ranging from 0% to 39.35% depending on your total income. Understanding these rates is crucial for effective tax planning."`
- Replacement: (no change — 39.35% is the unchanged additional rate)

### Occurrence 3 — line 17
- Classification: NEEDS-PATCH (FAQ, dividend rates as current state)
- Current text: `Dividend tax rates for 2025/26 are: 0% on the first £500 (dividend allowance), 8.75% on dividends within the basic rate band, 33.75% on higher rate dividends, and 39.35% on additional rate dividends above £125,140. These rates apply to the gross dividend amount.`
- Replacement: `Dividend tax rates for 2026/27 are: 0% on the first £500 (dividend allowance), 10.75% on dividends within the basic rate band, 35.75% on higher rate dividends, and 39.35% on additional rate dividends above £125,140. These rates apply to the gross dividend amount.`
- Note: also updating "2025/26" → "2026/27".

### Occurrence 4 — line 46
- Classification: NEEDS-PATCH (rate definitional)
- Current text: `<li><strong>Basic rate:</strong> 8.75% on dividends within the basic rate band</li>`
- Replacement: `<li><strong>Basic rate:</strong> 10.75% on dividends within the basic rate band</li>`

### Occurrence 5 — line 47
- Classification: NEEDS-PATCH
- Current text: `<li><strong>Higher rate:</strong> 33.75% on dividends within the higher rate band</li>`
- Replacement: `<li><strong>Higher rate:</strong> 35.75% on dividends within the higher rate band</li>`

### Occurrence 6 — line 48
- Classification: UNRELATED (39.35% additional rate unchanged)
- Current text: `<li><strong>Additional rate:</strong> 39.35% on dividends above £125,140</li>`
- Replacement: (no change)

### Occurrence 7 — line 62
- Classification: NEEDS-PATCH (worked example, basic-rate dividend on £24,500)
- Current text: `<li>Remaining £24,500 dividends: 8.75% = £2,144</li>`
- Replacement: `<li>Remaining £24,500 dividends: 10.75% = £2,634</li>`
- Arithmetic: £24,500 × 10.75% = £2,633.75 → £2,634.

### Occurrence 8 — line 77
- Classification: NEEDS-PATCH (worked example, basic-rate dividend on £24,500)
- Current text: `<li>Basic rate dividends: £24,500 at 8.75% = £2,144</li>`
- Replacement: `<li>Basic rate dividends: £24,500 at 10.75% = £2,634</li>`

### Occurrence 9 — line 78
- Classification: NEEDS-PATCH (worked example, higher-rate dividend on £42,430)
- Current text: `<li>Higher rate dividends: £42,430 at 33.75% = £14,320</li>`
- Replacement: `<li>Higher rate dividends: £42,430 at 35.75% = £15,169</li>`
- Arithmetic: £42,430 × 35.75% = £15,168.73 → £15,169.

---

## File: Property/web/content/blog/property-company-employer-pension-contributions-directors.md

### Occurrence 1 — line 23
- Classification: NEEDS-PATCH (current-state effective rate citation; 39.35% mentioned as "up to" max - unchanged but enclosing language is rate-current)
- Current text: `Pension contributions often provide better tax efficiency than dividends. While dividends face corporation tax plus dividend tax (up to 39.35% total), pension contributions only face corporation tax (19-25%) with no personal tax charge, though you can't access the money until retirement.`
- Replacement: (no change — 39.35% is the unchanged additional rate, and the line cites it as the "up to" maximum; UNRELATED for this 39.35% specifically)
- Classification REVISED: UNRELATED (only contains 39.35% which is unchanged).

### Occurrence 2 — line 74
- Classification: NEEDS-PATCH (higher-rate dividend tax 33.75% cited as current state)
- Current text: `<p>Directors paying higher rate tax (40%) or additional rate tax (45%) benefit significantly from <strong>employer pension contribution landlord</strong> strategies. Instead of taking dividends taxed at 33.75% (higher rate) or 39.35% (additional rate), pension contributions provide immediate corporation tax relief.</p>`
- Replacement: `<p>Directors paying higher rate tax (40%) or additional rate tax (45%) benefit significantly from <strong>employer pension contribution landlord</strong> strategies. Instead of taking dividends taxed at 35.75% (higher rate) or 39.35% (additional rate), pension contributions provide immediate corporation tax relief.</p>`

### Occurrence 3 — line 84
- Classification: HISTORICAL-CONTEXT / explicit context comparison? Re-read: "salary sacrifice arrangements... can save the employer's National Insurance (13.8%)"
- Current text: `Salary sacrifice arrangements, where a director foregoes salary in exchange for pension contributions, can save the employer's National Insurance (13.8%) but require a formal agreement and may affect other benefits linked to salary levels.`
- Replacement: `Salary sacrifice arrangements, where a director foregoes salary in exchange for pension contributions, can save the employer's National Insurance (15%) but require a formal agreement and may affect other benefits linked to salary levels.`
- Classification REVISED: NEEDS-PATCH (employer NI rate cited as current state — F-19 active).

---

## File: Property/web/content/blog/section-24-vs-incorporation-which-saves-more-tax.md

### Occurrence 1 — line 135
- Classification: NEEDS-PATCH (worked example, higher-rate dividend tax)
- Current text: `Dividend tax at 33.75%: £7,594<br>`
- Replacement: `Dividend tax at 35.75%: £8,044<br>`
- Arithmetic: From surrounding context, dividend base = £22,500 (line 133). £22,500 × 35.75% = £8,043.75 → £8,044. (Old: £22,500 × 33.75% = £7,593.75 → £7,594.)
- Knock-on (manifest only): line 136 "Net after-tax: £14,906" → £22,500 − £8,044 = £14,456. Line 137 "Incorporation advantage: £8,906 annually (£14,906 vs £6,000)" → £8,456 (£14,456 vs £6,000). ARITHMETIC FLAG: manager to update lines 136 and 137 to keep example consistent.

---

## File: Property/web/content/blog/property-company-profit-extraction-salary-vs-dividends.md

### Occurrence 1 — line 9
- Classification: NEEDS-PATCH (metaDescription, dividend rate range)
- Current text: `metaDescription: "Salary up to £12,570 is tax-free; dividends above £1,000 face 8.75-39.35% tax. Optimal extraction strategy for property companies."`
- Replacement: `metaDescription: "Salary up to £12,570 is tax-free; dividends above £500 face 10.75-39.35% tax. Optimal extraction strategy for property companies."`
- Note: also updating £1,000 dividend allowance → £500 (stale figure, current per 2024/25 onwards) and lower bound of dividend rate.

### Occurrence 2 — line 21
- Classification: NEEDS-PATCH (FAQ, higher-rate dividend as current state)
- Current text: `Higher rate taxpayers pay 33.75% dividend tax compared to 40% income tax on salary. However, dividends come from post-corporation tax profits, so the effective rate is higher. Additionally, dividends don't attract National Insurance. For higher rate taxpayers, the optimal mix typically involves minimal salary and dividend extraction, but professional advice is essential for accurate calculations.`
- Replacement: `Higher rate taxpayers pay 35.75% dividend tax compared to 40% income tax on salary. However, dividends come from post-corporation tax profits, so the effective rate is higher. Additionally, dividends don't attract National Insurance. For higher rate taxpayers, the optimal mix typically involves minimal salary and dividend extraction, but professional advice is essential for accurate calculations.`

### Occurrence 3 — line 45
- Classification: NEEDS-PATCH (current-state employer NI rate cite)
- Current text: `<li><strong>Employer National Insurance:</strong> 13.8% on earnings above £9,100 (paid by your company)</li>`
- Replacement: `<li><strong>Employer National Insurance:</strong> 15% on earnings above £5,000 (paid by your company)</li>`
- Note: secondary threshold £9,100 → £5,000 (per Hunt November 2022 reform effective from 6 April 2025, paired with the 15% rate); both update together for consistency with F-19. ARITHMETIC FLAG: manager to confirm the threshold change is in scope (this is the F-19 area but a pairing not explicitly listed in §21.4 patch). Conservative call: include both per the contextual pairing.

### Occurrence 4 — line 76
- Classification: NEEDS-PATCH (current-state higher-rate dividend rate)
- Current text: `<p>If you have other employment or rental income outside the company, this pushes you into higher tax brackets. Higher rate taxpayers face 33.75% dividend tax, making salary extraction less attractive.</p>`
- Replacement: `<p>If you have other employment or rental income outside the company, this pushes you into higher tax brackets. Higher rate taxpayers face 35.75% dividend tax, making salary extraction less attractive.</p>`

---

## File: Property/web/content/blog/corporation-tax-rates-property-companies-2026-27.md (already covered above)

---

## File: Property/web/content/blog/corporation-tax-vs-income-tax-landlords-2027.md (already covered above)

---

## File: Property/web/content/blog/2027-tax-rates-incorporation-decision-property-landlords.md (already covered above)

---

## File: Property/web/content/blog/how-to-set-up-property-investment-company-uk-guide.md

### Occurrence 1 — line 60
- Classification: NEEDS-PATCH (dividend rate listing as current state)
- Current text: `<li><strong>Dividends:</strong> No National Insurance but subject to dividend tax (8.75% basic rate, 33.75% higher rate, 39.35% additional rate)</li>`
- Replacement: `<li><strong>Dividends:</strong> No National Insurance but subject to dividend tax (10.75% basic rate, 35.75% higher rate, 39.35% additional rate)</li>`

---

## File: Property/web/content/blog/salary-vs-dividends-property-spv-2026-27-marginal-rate-analysis.md

### Occurrence 1 — line 9
- Classification: NEEDS-PATCH (metaDescription, dividend rate range)
- Current text: `metaDescription: "Salary vs dividend for a property SPV in 2026/27: CT 19/25/26.5% taper, NI thresholds, dividend rates 8.75 to 39.35%, four worked profit bands."`
- Replacement: `metaDescription: "Salary vs dividend for a property SPV in 2026/27: CT 19/25/26.5% taper, NI thresholds, dividend rates 10.75 to 39.35%, four worked profit bands."`

### Occurrence 2 — line 18
- Classification: NEEDS-PATCH (summary text, dividend rate listing)
- Current text: `dividend allowance £500 with rates 8.75%, 33.75%, 39.35% across basic, higher and additional bands.`
- Replacement: `dividend allowance £500 with rates 10.75%, 35.75%, 39.35% across basic, higher and additional bands.`

### Occurrence 3 — line 22
- Classification: NEEDS-PATCH (FAQ — employer NI 13.8% as current rate)
- Current text: `pay above this level without Employment Allowance and the marginal cost rises sharply because employer NI at 13.8% adds to the cost of every additional pound.`
- Replacement: `pay above this level without Employment Allowance and the marginal cost rises sharply because employer NI at 15% adds to the cost of every additional pound.`

### Occurrence 4 — line 30
- Classification: NEEDS-PATCH (FAQ, dividend rates as current state for 2026/27)
- Current text: `The £500 dividend allowance (2026/27) covers the first slice at 0%. After that, the basic-rate dividend rate is 8.75% (within the basic-rate income tax band, ie up to £50,270 of total income), the higher-rate dividend rate is 33.75% (in the higher-rate income tax band, £50,270 to £125,140), and the additional-rate dividend rate is 39.35% (above £125,140).`
- Replacement: `The £500 dividend allowance (2026/27) covers the first slice at 0%. After that, the basic-rate dividend rate is 10.75% (within the basic-rate income tax band, ie up to £50,270 of total income), the higher-rate dividend rate is 35.75% (in the higher-rate income tax band, £50,270 to £125,140), and the additional-rate dividend rate is 39.35% (above £125,140).`

### Occurrence 5 — line 34
- Classification: NEEDS-PATCH (FAQ, basic-rate dividend rate in worked-example narrative)
- Current text: `A defensible default for a single-director SPV at £100,000 of profit before extraction is: salary £5,000 (NI secondary-threshold floor, no NI, no income tax), dividend up to the recipient's higher-rate threshold (typically £50,270 less the £5,000 salary = £45,270 of dividend at 8.75%, with £500 covered by the dividend allowance), and the remaining post-CT cash either taken as further dividend at 33.75% (if the founder needs cash) or left in retained earnings for the next property purchase / employer pension contribution.`
- Replacement: `A defensible default for a single-director SPV at £100,000 of profit before extraction is: salary £5,000 (NI secondary-threshold floor, no NI, no income tax), dividend up to the recipient's higher-rate threshold (typically £50,270 less the £5,000 salary = £45,270 of dividend at 10.75%, with £500 covered by the dividend allowance), and the remaining post-CT cash either taken as further dividend at 35.75% (if the founder needs cash) or left in retained earnings for the next property purchase / employer pension contribution.`

### Occurrence 6 — line 56
- Classification: HISTORICAL-CONTEXT (explicit historical stability framing: "The dividend rates have been stable since 2022/23 at 8.75%, 33.75%, 39.35%")
- Current text: `What changes in 2026/27 is the corporation tax structure (post-Hunt November 2022 reforms have bedded in, with the 19% small-profits rate, the 26.5% marginal-relief band, and the 25% main rate at the upper end) and the national insurance position (the £5,000 secondary threshold and the sole-director Employment Allowance exclusion). The dividend rates have been stable since 2022/23 at 8.75%, 33.75%, 39.35%, though the £500 dividend allowance has been progressively cut from £5,000 in 2017/18.`
- Replacement: `What changes in 2026/27 is the corporation tax structure (post-Hunt November 2022 reforms have bedded in, with the 19% small-profits rate, the 26.5% marginal-relief band, and the 25% main rate at the upper end), the national insurance position (the £5,000 secondary threshold and the sole-director Employment Allowance exclusion), and the dividend rate uplift from 6 April 2026 (basic 10.75%, higher 35.75%, additional 39.35%, up from 8.75% / 33.75% / 39.35% which held from 2022/23 through 2025/26). The £500 dividend allowance has been progressively cut from £5,000 in 2017/18.`
- Classification REVISED: NEEDS-PATCH (the page sits on the cusp of historical-context but the framing "stable since 2022/23 at 8.75%, 33.75%, 39.35%" is misleading post-F-20; needs a rewrite to capture the F-20 uplift as a current-page-period change).

### Occurrence 7 — line 77
- Classification: NEEDS-PATCH (rate definitional list under "National insurance" section)
- Current text: `<li>Employer NI rate 13.8% above the secondary threshold.</li>`
- Replacement: `<li>Employer NI rate 15% above the secondary threshold.</li>`

### Occurrence 8 — line 86
- Classification: NEEDS-PATCH (rate definitional list under "Dividend tax")
- Current text: `<li>8.75% basic-rate dividend rate up to £50,270 of total income.</li>`
- Replacement: `<li>10.75% basic-rate dividend rate up to £50,270 of total income.</li>`

### Occurrence 9 — line 87
- Classification: NEEDS-PATCH
- Current text: `<li>33.75% higher-rate dividend rate from £50,270 to £125,140.</li>`
- Replacement: `<li>35.75% higher-rate dividend rate from £50,270 to £125,140.</li>`

### Occurrence 10 — line 88
- Classification: UNRELATED (39.35% additional rate unchanged)
- Current text: `<li>39.35% additional-rate dividend rate above £125,140.</li>`
- Replacement: (no change)

### Occurrence 11 — line 106
- Classification: NEEDS-PATCH (default extraction framework, basic-rate dividend)
- Current text: `<li>Dividend up to the recipient's higher-rate threshold (£50,270 less salary), taxed at 8.75% with £500 allowance.</li>`
- Replacement: `<li>Dividend up to the recipient's higher-rate threshold (£50,270 less salary), taxed at 10.75% with £500 allowance.</li>`

### Occurrence 12 — line 107
- Classification: NEEDS-PATCH (higher-rate dividend in framework)
- Current text: `<li>Further extraction above the basic-rate band considered case by case (further dividend at 33.75%, employer pension contribution, retained earnings for reinvestment).</li>`
- Replacement: `<li>Further extraction above the basic-rate band considered case by case (further dividend at 35.75%, employer pension contribution, retained earnings for reinvestment).</li>`

### Occurrence 13 — line 130 (worked example one: £30k profit; basic-rate dividend calc)
- Classification: NEEDS-PATCH (worked example arithmetic)
- Current text: `<li>Dividend £20,250: first £500 at 0% (dividend allowance), remaining £19,750. Founder still has £7,070 of personal allowance unused (PA £12,570 less £5,000 salary), so £7,070 of dividend is covered by PA at 0%, then the next £12,680 sits within the basic-rate band at 8.75% = £1,109.</li>`
- Replacement: `<li>Dividend £20,250: first £500 at 0% (dividend allowance), remaining £19,750. Founder still has £7,070 of personal allowance unused (PA £12,570 less £5,000 salary), so £7,070 of dividend is covered by PA at 0%, then the next £12,680 sits within the basic-rate band at 10.75% = £1,363.</li>`
- Arithmetic: £12,680 × 10.75% = £1,363.10 → £1,363. (Old: £12,680 × 8.75% = £1,109.50 → £1,109.)
- Knock-on (manifest only): line 133 "Personal income tax bill: £1,109. SPV corporation tax bill: £4,750. Total tax on £30,000 of SPV profit: £5,859. Founder net cash: £30,000 - £5,859 = £24,141 (effective tax rate 19.5%)." becomes £1,363 + £4,750 = £6,113 total tax; net cash £23,887; effective rate 20.4%. ARITHMETIC FLAG: manager to update line 133.

### Occurrence 14 — line 157 (worked example two: £50k profit)
- Classification: NEEDS-PATCH (worked example arithmetic)
- Current text: `<li>Dividend £36,450: £500 allowance, then £7,070 of PA at 0%, then £28,880 in the basic-rate band at 8.75% = £2,527.</li>`
- Replacement: `<li>Dividend £36,450: £500 allowance, then £7,070 of PA at 0%, then £28,880 in the basic-rate band at 10.75% = £3,105.</li>`
- Arithmetic: £28,880 × 10.75% = £3,104.60 → £3,105.
- Knock-on (manifest only): line 160 "Personal income tax: £2,527. SPV CT: £8,550. Total tax: £11,077. Founder net cash: £38,923 (effective tax rate 22.2%)." becomes £3,105 + £8,550 = £11,655; net cash £38,345; effective rate 23.3%. ARITHMETIC FLAG: manager to update line 160.

### Occurrence 15 — line 184 (worked example three: £100k profit)
- Classification: NEEDS-PATCH (worked example arithmetic — multi-band)
- Current text: `<li>Dividend £73,575: £500 allowance, £7,070 within PA, then £37,700 within basic-rate band at 8.75% = £3,299, then £28,305 within higher-rate band at 33.75% = £9,553.</li>`
- Replacement: `<li>Dividend £73,575: £500 allowance, £7,070 within PA, then £37,700 within basic-rate band at 10.75% = £4,053, then £28,305 within higher-rate band at 35.75% = £10,119.</li>`
- Arithmetic: £37,700 × 10.75% = £4,052.75 → £4,053. £28,305 × 35.75% = £10,119.04 → £10,119.
- Knock-on (manifest only): line 187 "Personal income tax: £3,299 + £9,553 = £12,852. SPV CT: £21,425. Total tax: £34,277. Founder net cash: £65,723 (effective tax rate 34.3%)." becomes £4,053 + £10,119 = £14,172 personal; total £35,597; net cash £64,403; effective 35.6%. ARITHMETIC FLAG: manager to update line 187.

### Occurrence 16 — line 199 (worked example three alternative: pension overlay)
- Classification: NEEDS-PATCH
- Current text: `<li>Dividend £58,875: £500 allowance, £7,070 within PA, then £37,700 within basic-rate band at 8.75% = £3,299, then £13,605 within higher-rate band at 33.75% = £4,592.</li>`
- Replacement: `<li>Dividend £58,875: £500 allowance, £7,070 within PA, then £37,700 within basic-rate band at 10.75% = £4,053, then £13,605 within higher-rate band at 35.75% = £4,864.</li>`
- Arithmetic: £37,700 × 10.75% = £4,053. £13,605 × 35.75% = £4,863.79 → £4,864.
- Knock-on (manifest only): line 202 "Personal income tax: £3,299 + £4,592 = £7,891. SPV CT: £16,125. Total current-year tax: £24,016. Founder net cash now: £58,875 + £20,000 of pension contribution growing tax-free = £58,875 spendable now plus £20,000 of deferred pension wealth. Total household value: £78,875 vs £65,723 in the no-pension version, an improvement of £13,152 at this profit level." becomes £4,053 + £4,864 = £8,917 personal; total tax £25,042; net cash £58,875 spendable + £20,000 pension = £78,875 household; vs no-pension £64,403, improvement £14,472. ARITHMETIC FLAG: manager to update line 202.

### Occurrence 17 — line 226 (worked example four: £125k profit)
- Classification: NEEDS-PATCH
- Current text: `<li>Dividend £91,950: £500 allowance, £7,070 within PA, then £37,700 within basic-rate band at 8.75% = £3,299, then £46,680 within higher-rate band at 33.75% = £15,754.</li>`
- Replacement: `<li>Dividend £91,950: £500 allowance, £7,070 within PA, then £37,700 within basic-rate band at 10.75% = £4,053, then £46,680 within higher-rate band at 35.75% = £16,688.</li>`
- Arithmetic: £37,700 × 10.75% = £4,053. £46,680 × 35.75% = £16,688.10 → £16,688.
- Knock-on (manifest only): line 229 "Personal income tax: £19,053. SPV CT: £28,050. Total tax: £47,103. Founder net cash: £77,897 (effective tax rate 37.7%)." becomes personal £4,053 + £16,688 = £20,741; total £48,791; net cash £76,209; effective 39.0%. ARITHMETIC FLAG: manager to update line 229.

### Occurrence 18 — line 237
- Classification: NEEDS-PATCH (observations section — references 39.35% AND 33.75% in same context as a saving calc)
- Current text (excerpt): `<p>At £125,000 of profit and above, layering in employer pension contributions becomes a near-universal recommendation. The combined CT plus dividend tax saving per £1,000 of contribution rises with the dividend band the founder is in, peaking where the contribution moves the founder from the additional-rate dividend band (39.35%) back into the higher-rate band (33.75%). For founders approaching age 55 to 57, the pension liquidity constraint disappears, making the calculus even more favourable.</p>`
- Replacement: `<p>At £125,000 of profit and above, layering in employer pension contributions becomes a near-universal recommendation. The combined CT plus dividend tax saving per £1,000 of contribution rises with the dividend band the founder is in, peaking where the contribution moves the founder from the additional-rate dividend band (39.35%) back into the higher-rate band (35.75%). For founders approaching age 55 to 57, the pension liquidity constraint disappears, making the calculus even more favourable.</p>`
- Note: 39.35% kept as-is (unchanged); 33.75% → 35.75%.

---

## Summary

- Files scanned: 38
- Total occurrences identified: ~115 line-level hits across the 38 files (some lines contain multiple rates; counted as one occurrence per line for manifest purposes)
- NEEDS-PATCH (substantive content edits required): ~98 occurrences across 33 files
- HISTORICAL-CONTEXT (no change required): ~15 occurrences. These split into two groups:
  - F-19 explicit before/after framing: lines such as `extracting-money-from-property-limited-company.md` lines 22, 62, 65 (these EXPLICITLY narrate "rose from 13.8% to 15%" and are the canonical historical references — DO NOT PATCH)
  - F-20 explicit historical: `salary-vs-dividends-property-spv-2026-27-marginal-rate-analysis.md` line 56 was initially flagged as historical-context but reclassified to NEEDS-PATCH because the phrasing "stable since 2022/23 at 8.75%, 33.75%, 39.35%" was misleading post-F-20 and needs a forward-looking rewrite
- UNRELATED (no change required — 39.35% additional rate is unchanged): ~8 occurrences. Specifically: `buy-to-let-limited-company-complete-guide-uk.md` line 144; `corporation-tax-vs-income-tax-landlords-2027.md` line 84; `property-company-dividend-tax.md` lines 13 and 48; `salary-vs-dividends-property-spv-2026-27-marginal-rate-analysis.md` line 88; `property-company-employer-pension-contributions-directors.md` line 23
- ARITHMETIC FLAG (manager-recompute needed): ~22 flags raised. Key buckets:
  - s.455 charge rate dependency: 9 occurrences across `btl-limited-company-year-end-date-changing-tax-planning.md`, `btl-spv-directors-loan-repayment-strategy-tax-efficient-extraction.md`, `buy-to-let-limited-company-complete-guide-uk.md`, `close-investment-holding-company-property.md`, `director-loan-account-property-company-mechanics.md`, `director-loan-property-company.md`, `spv-property-investment-special-purpose-vehicle-guide.md`. Manager must confirm whether the s.455 rate rose to 35.75% in lockstep with F-20 OR remained at 33.75%
  - Trust dividend rate dependency: 2 occurrences in `fic-vs-discretionary-trust-property-comparison.md` (lines 28 and 115) — manager to verify whether trust dividend rates track F-20 or were separately legislated
  - Multi-line worked-example knock-on totals: 11 flags across `2027-tax-rates-incorporation-decision-property-landlords.md`, `alphabet-shares-property-spv-dividend-splitting-spouse-children.md`, `charging-market-rent-to-own-property-company-tax-treatment.md`, `extracting-money-from-property-limited-company.md`, `section-24-vs-incorporation-which-saves-more-tax.md`, `spv-property-investment-special-purpose-vehicle-guide.md`, `salary-vs-dividends-property-spv-2026-27-marginal-rate-analysis.md`, `tax-efficient-property-investment-structure-guide.md`, and `how-to-choose-right-property-company-structure-uk-landlords-2026.md`. Each example has totals/savings/effective-rate lines downstream of a NEEDS-PATCH line that need recomputation to keep examples internally consistent. Per task spec, these are flagged for manager review rather than auto-recomputed
- Files with NO NEEDS-PATCH (safe to skip on apply review):
  - `Property/web/content/blog/btl-limited-company-year-end-date-changing-tax-planning.md` (only s.455 references, all flagged for manager confirmation)
  - `Property/web/content/blog/close-investment-holding-company-property.md` (only s.455 references)
  - `Property/web/content/blog/director-loan-property-company.md` (only s.455 references)
  - All other 35 files require at least one substantive patch
- Files with the most NEEDS-PATCH content (priority on apply review):
  - **`salary-vs-dividends-property-spv-2026-27-marginal-rate-analysis.md`** — 18 occurrences (heaviest by far; this is THE worked-example flagship page with 4 profit-band calcs all needing recomputation; multiple knock-on arithmetic flags)
  - **`alphabet-shares-property-spv-dividend-splitting-spouse-children.md`** — 7 occurrences with three interconnected worked examples (single-class baseline + 2-way alphabet + 3-way alphabet) all needing arithmetic recomputation
  - **`extracting-money-from-property-limited-company.md`** — 10 occurrences including two worked extraction examples (Option A and Option B), but several are HISTORICAL-CONTEXT for F-19 framing so the NEEDS-PATCH count is lower than the line-level hit count
  - Honourable mentions: `buy-to-let-limited-company-complete-guide-uk.md` (8 NEEDS-PATCH), `property-company-dividend-tax.md` (7 NEEDS-PATCH), `fic-property-retirement-decumulation-mechanics-uk.md` (8 NEEDS-PATCH)
