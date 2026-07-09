---
slug: cash-flow-management-small-business-uk
category: Bookkeeping and Compliance
intent: informational (management-accounting practice guide; owner-managers who know they have a cash flow problem and want a systematic fix)
pick_id: A1
wave: 4
status: brief-ready
---

# Working title

**Cash flow management for small UK businesses: the practical guide (forecasting, lock-up and credit control)**

---

## Framing differentiator

Most UK accountancy content on "cash flow" conflates three different things: (1) the HMRC cash-basis accounting election (a tax method), (2) generic "chase your invoices" advice, and (3) vague mentions of a spreadsheet. This page owns the management-accounting angle: a systematic, quantified cash management practice for an SME owner. The differentiator is **number-first rigour**: a real 13-week forecast skeleton, debtor-days arithmetic the owner can run on their own figures, and a credit-control operating rhythm. That is what a management accountant delivers in practice. The page clusters with A11 (late-payment statutory interest rules), which handles the legal remedies. This page handles the internal operating system.

**Boundary (BINDING per collision_verify A1):** cash MANAGEMENT practice only. No HMRC cash-basis accounting method content (existing pages own that). Not a service pitch. Cross-link to A11 for statutory late-payment interest.

---

## Statutory anchor (light — cash management is practice, not statute)

- **Late Payment of Commercial Debts (Interest) Act 1998** -- statutory interest at **8% above the Bank of England base rate** on overdue B2B invoices (payment terms defaulting to 30 days for business-to-business, 60 days maximum without both parties agreeing otherwise, per the Late Payment of Commercial Debts Regulations 2002 as amended). Verified live: https://www.gov.uk/late-commercial-payments-interest-debt-recovery/charging-interest-commercial-debt (HTTP 200 confirmed 2026-07-09).
- **VAT bad-debt relief (VATA 1994 s.36 / VAT Notice 700/18):** output VAT already paid on an invoice can be reclaimed if the debt is more than **6 months overdue** (from the later of supply date and payment due date) and has been written off. Anchor cross-links to A11 for the full statutory treatment.
- No other primary statutory references required for the management-practice content.

---

## Key questions (6-10)

1. What is a 13-week cash flow forecast, how is it built, and why 13 weeks rather than annual?
2. How do you calculate debtor days (DSO) and what does the number tell you about lock-up?
3. What is cash conversion and why does profitable-but-cash-poor happen so often in SMEs?
4. What is the practical difference between cash accounting and accrual accounting as it affects day-to-day cash visibility (without re-explaining the HMRC cash-basis election)?
5. What credit-control operating rhythm works for a business with 20-50 debtors?
6. How does stock/WIP lock-up affect the cash cycle, and how do you measure it?
7. When does a business need a formal overdraft or revolving credit facility versus better internal cash management?
8. What are the most common causes of a cash flow crisis in a small business, and how do you spot them early?
9. How does the timing of VAT payments and corporation tax payments interact with cash planning?
10. What should a cash flow forecast include that a P&L does not?

---

## Competitor URLs

<!-- competitor section: session-side WebSearch at write time, no Stage 2 hits -->
<!-- VERIFIED 2026-07-09: both picks.yaml competitor URLs returned HTTP 404 -->
<!-- https://www.crunch.co.uk/knowledge/improve-your-cash-flow — 404 -->
<!-- https://informi.co.uk/finance/how-to-improve-cash-flow-with-an-effective-forecasting-strategy — 404 -->
<!-- No live on-topic guide-not-funnel competitors confirmed at brief-write time. -->
<!-- Writer: run a fresh WebSearch at write time for live cash-flow-management guides from crunch.co.uk, informi.co.uk, countingup.com, xero.com/uk, businessaccountingbasics.co.uk. Fetch each candidate (HTTP 200 + guide not funnel), then add up to 3 with a 1-line takeaway each. If fewer than 2 survive, retain this stub. -->

---

## Authority links (verified live 2026-07-09)

1. **https://www.gov.uk/late-commercial-payments-interest-debt-recovery** (HTTP 200) -- gov.uk late commercial payments hub; confirm 30/60-day default terms and statutory interest formula (8% above BoE base rate). Use as the authoritative anchor for the statutory interest section and the A11 cross-link.
2. **https://www.gov.uk/late-commercial-payments-interest-debt-recovery/charging-interest-commercial-debt** (HTTP 200) -- the sub-page confirming the 8% above base rate formula with the worked example.

Writer note: also check https://www.gov.uk/vat-returns/deadlines for VAT payment timing (to anchor the CT/VAT cash-planning section), and https://www.gov.uk/pay-corporation-tax for CT payment deadline (9 months and 1 day), both to be verified at write time.

---

## Worked-example data

### A. 13-week cash flow forecast skeleton

The 13-week (rolling quarterly) horizon is standard in management accounting because it is long enough to see a tax or payroll cliff but short enough to maintain weekly-level accuracy. Annual forecasts lose precision; daily rolling forecasts are operationally expensive.

**Structure (one row per week, three column blocks):**

| Week | Opening balance | Receipts | Payments | Closing balance |
|------|----------------|----------|----------|-----------------|
| 1    | £X             | £Y       | £Z       | £X + Y - Z     |
| ...  | (carried forward) | ... | ... | ... |
| 13   | ...            | ...      | ...      | ...             |

**Receipts block (weekly):**
- Customer receipts (from invoices due that week, based on credit-term lag, not the invoice date)
- Any grants, loan drawdowns, or asset disposal proceeds

**Payments block (weekly):**
- Supplier payments (when they fall due, not when invoiced)
- Payroll (net pay + PAYE/NIC to HMRC: payroll run date vs HMRC Accounts Office deadline 19th/22nd)
- VAT quarter-end: VAT liability due 1 month + 7 days after quarter end (or 1 month + 10 days with MTD direct debit)
- Corporation tax: 9 months and 1 day after period end (house position §3)
- Rent, direct debits, loan repayments (fixed, easy to forecast)
- Director drawings (salary transfer + dividend declaration date)

**Worked numbers (illustrative -- writer to use, not vary):**

Opening balance week 1: **£18,400**

Receipts: the business has 3 regular customers invoiced on 30-day net terms. Last month invoiced:
- Customer A: £9,500 (due week 2)
- Customer B: £5,200 (due week 3)
- Customer C: £11,000 (due week 5 -- this one pays late on average 12 days)

Payments week 1-3:
- Payroll (weekly): £3,200/week net; PAYE/NIC £1,100 due 19th (week 3 in the example)
- Supplier A: £2,800 (due week 2)
- Rent DD: £1,450 (week 1)

Week 1 closing: £18,400 - £1,450 (rent) - £3,200 (payroll) = **£13,750**
Week 2 closing: £13,750 + £9,500 (Customer A receipt) - £3,200 (payroll) - £2,800 (supplier) = **£17,250**
Week 3 closing: £17,250 + £5,200 (Customer B) - £3,200 (payroll) - £1,100 (PAYE/NIC) = **£18,150**

Key observation the writer should draw out: the business looks healthy but Customer C's £11,000 is not arriving until week 5. If a £7,500 supplier invoice also falls due in week 4, the closing balance in week 4 would be **£18,150 - £3,200 (payroll) - £7,500 (supplier) = £7,450** -- a visible trough the forecast reveals 4 weeks in advance, leaving time to negotiate payment terms or use the overdraft.

---

### B. Debtor-days (DSO) worked example

**Formula:** Debtor days = (Trade debtors / Annual revenue) x 365

**Numbers:**
- Annual revenue: **£480,000**
- Trade debtors (from balance sheet / aged-debtor listing): **£79,500**
- Debtor days: (£79,500 / £480,000) x 365 = **60.5 days**

Credit terms offered: 30 days. Actual collection: 60.5 days. Lock-up excess: **30.5 days** of revenue is sitting uncollected.

**Revenue locked up by excess debtor days:**
£480,000 / 365 x 30.5 days = **£40,000** of avoidable working-capital tied up.

If the business can bring debtor days down from 60.5 to 35 (a realistic improvement with consistent credit control), it releases: £480,000 / 365 x 25.5 days = **£33,500 cash** -- without any revenue growth.

---

### C. Cash conversion cycle (for product/mixed businesses)

**Formula:** Cash conversion cycle (CCC) = Debtor days + Inventory days - Creditor days

**Numbers:**
- Debtor days: 60.5 (above)
- Inventory / WIP days: (£32,000 WIP / £200,000 COGS) x 365 = **58.4 days**
- Creditor days: (£28,000 trade creditors / £200,000 COGS) x 365 = **51.1 days**
- CCC: 60.5 + 58.4 - 51.1 = **67.8 days**

The business must fund 68 days of its cost base from cash before it is paid. Every day CCC is reduced releases working capital.

---

## FAQ (8-12 with full draft answers)

### 1. What is cash flow management and why is it different from bookkeeping?

Cash flow management is the active practice of knowing when money will arrive and leave your bank account, and adjusting timing where you can to avoid running short. Bookkeeping records what has happened; cash flow management looks ahead. A business can be profitable on paper (its income statement shows a surplus) while running out of cash -- if customers pay late, stock builds up, or a large tax bill falls due in the same week as payroll. That gap between profit and cash is why cash flow management is a separate discipline.

### 2. What is a 13-week cash flow forecast and how do I build one?

A 13-week forecast maps out every week of the next quarter: opening balance, expected customer receipts (lagged by your actual credit terms), and all known outflows (payroll, PAYE/NIC, VAT, rent, suppliers, loan repayments, corporation tax). It is 13 weeks rather than an annual plan because accuracy collapses beyond three months for most SMEs -- annual plans give false comfort, weekly rolling forecasts are operationally burdensome. The forecast is updated weekly: the oldest week drops off and a new week 13 is added. The key discipline is using **actual receipt dates** (when customers historically pay), not invoice dates.

### 3. How do I calculate debtor days and what should mine be?

Debtor days (also called Days Sales Outstanding or DSO) = (trade debtors / annual revenue) x 365. It tells you how many days of revenue you have tied up waiting to be collected. If you offer 30-day terms and your debtor days are 60, you are effectively providing your customers 30 days of free working-capital finance. The target is to get debtor days close to your stated terms. A realistic improvement from 60 to 35 days for a business with £480,000 revenue releases roughly £33,500 in cash (see the worked example above) -- without winning a single new customer.

### 4. What causes a profitable business to run out of cash?

Four main causes: (1) **slow collections** -- customers pay late, so cash lags behind profit; (2) **rapid growth** -- more orders require more stock, more staff, more supplier payments before the revenue arrives, a pattern called overtrading; (3) **lumpy outflows** -- VAT quarters, corporation tax, payroll, and a supplier invoice can fall in the same week; (4) **stock/WIP build-up** -- money is tied up in goods or work-in-progress not yet invoiced. The 13-week forecast is the tool that makes all four visible in advance.

### 5. What is the credit-control rhythm I should run every week?

A practical rhythm for a business with 20 to 50 debtors: (a) every Monday, pull an aged-debtor report from your accounting software; (b) any invoice 5 or more days overdue gets a polite reminder by email the same day; (c) any invoice 14 or more days overdue gets a phone call, not another email; (d) any invoice 30 or more days overdue is escalated -- a formal letter before action citing your right to statutory interest under the Late Payment of Commercial Debts (Interest) Act 1998; (e) at 60 days overdue, refer to a debt-collection service or solicitor, or issue a county court claim for smaller amounts (under £10,000 -- the small claims track). Consistency matters more than aggression. Customers who know you chase systematically pay faster than those who think a reminder is optional.

### 6. How does VAT and corporation tax timing interact with my cash plan?

VAT is collected from customers as part of their invoice but does not belong to the business -- it must be paid to HMRC each quarter (typically one month and seven days after the quarter end, or one month and ten days if paying by Direct Debit under MTD). A business on standard VAT accrual accounting is holding VAT for up to three months; a cash flow crisis can tempt an owner to use that money for other things, which creates a VAT arrears problem. The VAT cash-accounting scheme (available up to £1.35m taxable turnover, house position §7) aligns VAT payment with when customers actually pay, which helps. Corporation tax is due nine months and one day after the accounting period end -- for a December year-end company that is 1 October the following year. Build both dates explicitly into the 13-week forecast and the annual horizon view so neither comes as a surprise.

### 7. When does a business need an overdraft or revolving credit rather than better cash management?

Better cash management comes first: tightening debtor days and aligning payment runs to receipts is free. An overdraft or revolving credit facility makes sense when: (a) the business has a structurally seasonal pattern (retail, construction, hospitality) where peak cash needs exceed what debtor recovery can bridge; (b) rapid growth is outpacing collections even with tight credit control; (c) a single large contract requires significant upfront cost before invoicing. A revolving credit facility is typically cheaper than an overdraft for planned use. Neither product fixes a broken credit-control process -- the facility will be permanently at its limit if the underlying debtor problem is not addressed first.

### 8. What is the difference between cash flow and profit, and why does it matter?

Profit is the difference between income earned and costs incurred in an accounting period, measured on an accruals basis (revenue when the sale is made, cost when the obligation arises). Cash flow is actual money in versus actual money out of the bank. The gap arises from timing: you can earn revenue in March and not collect it until May; you can incur a cost in January and not pay it until March. Fixed-asset purchases appear in the cash flow (you pay for the asset) but are not an immediate hit to profit (depreciation/capital allowances spread the cost). Loan repayments reduce cash but not profit (only the interest element is a cost). The cash flow forecast shows you what the bank account will look like; the profit-and-loss shows whether the business is earning more than it spends over time.

### 9. How should I handle a customer who repeatedly pays late?

Step 1: confirm your payment terms are in writing (in the contract, on the invoice, and on your website terms of business) and that you have issued a compliant invoice (date, your VAT number if registered, a description, the payment due date). Step 2: add statutory interest to the overdue invoice -- under the Late Payment of Commercial Debts (Interest) Act 1998 you are entitled to 8% above the Bank of England base rate automatically (no need to have it in the contract). Step 3: review whether the customer is worth the credit risk -- a customer who reliably pays 45 days late is effectively forcing you to fund 45 days of receivables. If they are margin-positive, consider requiring a 50% deposit upfront for future orders. If not, the relationship may be costing you more than it earns when working-capital cost is factored in.

### 10. What should a cash flow forecast include that a profit-and-loss forecast does not?

A P&L forecast excludes: VAT movements (VAT in receipts, VAT out on payments -- the net is a separate HMRC liability not a cost); loan principal repayments (principal is not a cost, only interest is); capital expenditure (the cash outflow happens immediately; the tax relief comes later via capital allowances over several years); and the timing lag between earning and collecting or incurring and paying. The cash flow forecast includes all of these as real cash movements. Running a P&L forecast without a cash forecast gives a misleading picture of what the bank account will look like.

### 11. How does bad-debt VAT relief work if a customer never pays?

If a customer fails to pay a VAT-inclusive invoice and the debt is more than six months overdue (measured from the later of the supply date and the due date for payment), and you have written it off in your accounts, you can reclaim the output VAT already paid to HMRC. This is VAT bad-debt relief under VATA 1994 s.36. You claim it on your next VAT return using Box 4 (input tax). Keep evidence: a copy of the invoice, proof it has been over six months, and evidence you have written it off. Note that if the customer later pays, you must pay the VAT back. For the income-tax or corporation-tax deduction on the bad debt itself, the debt must be formally written off in the accounts for the deduction to arise in that period.

### 12. What is the cash conversion cycle and why should a product business track it?

The cash conversion cycle (CCC) measures how long it takes for a business to convert its investment in stock and receivables into cash collected from customers, net of the time suppliers give you to pay. CCC = debtor days + inventory days - creditor days. A CCC of 70 days means the business must fund 70 days of its cost base from its own cash or borrowings before it recovers it from customers. Every day you can reduce the CCC (faster collections, leaner stock, longer supplier terms within relationship constraints) is a day less of cash tied up. A service business has near-zero inventory days and a simpler CCC; for a manufacturer or wholesaler, inventory days can dominate and WIP management becomes the primary cash lever.

---

## Cross-link map (per collision_verify A1)

| Link target slug | Reason | Position in page |
|---|---|---|
| `what-does-a-management-accounting-service-actually-do` | Management accounting framing -- this is what a management accountant does operationally | Introduction / framing |
| `cash-basis-vs-accruals-sole-trader` | Explicitly differentiate from HMRC cash-basis method (binding A1 boundary) | Early in page, 1-line distinction |
| `when-to-register-for-vat-seasonal-business` | VAT timing interacts with cash cycle; seasonal businesses especially affected | VAT/CT timing section |
| `late-payment-rules-small-business-uk` (A11) | Statutory interest, formal debt-recovery process -- the legal remedies are on A11 | Credit control section + FAQ 9 |

---

## Meta copy

**metaTitle (56 chars):** Cash Flow Management for Small Businesses UK Guide

**metaDescription (152 chars):** Learn to forecast cash, reduce debtor lock-up and run credit control systematically. Practical 13-week forecast, debtor-days arithmetic and worked examples.

---

## HP-lock notes for writer

- No HP positions are directly at stake in this page (it is management practice, not a tax-rate page).
- Where VAT payment timing is mentioned: use cash-accounting scheme join threshold £1.35m (HP §7, verified).
- Where corporation tax payment timing is mentioned: 9 months and 1 day after period end (HP §3).
- Where statutory interest on late payment is mentioned: 8% above BoE base rate (gov.uk verified 2026-07-09). Do NOT invent a specific combined rate (BoE base rate moves).
- No em-dashes anywhere in body copy (house rule, engine constraint).
- Body word target: 2,800-3,500 (non-pillar). This topic can reach the upper end given the worked examples.
- FAQs: 12 drafted above. Writer should use all 12 unless one substantially duplicates another section.

---

## Flags raised

None required at brief stage. No HP statutory drift. No cross-bucket collision. A11 cluster link is noted.
