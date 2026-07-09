---
slug: late-payment-rules-small-business-uk
category: Bookkeeping and Compliance
intent: informational (statutory rights guide; small-business owners with a late-paying B2B customer who want to know what they can charge and how to escalate)
pick_id: A11
wave: 4
status: brief-ready
---

# Working title

**Late payment rules for UK small businesses: statutory interest, compensation and bad-debt relief**

---

## Framing differentiator

The gap in the corpus (confirmed: zero coverage of this topic) is deliberate statutory knowledge that most SME owners do not have: the Late Payment of Commercial Debts (Interest) Act 1998 gives creditors a statutory right to charge interest and claim fixed compensation on every overdue B2B invoice, regardless of what the contract says, and with no court action required to assert it. Competitors in the pool (countingup.com) lead with email templates; this page leads with the legal rights first (the numbers the owner can actually put in the letter), then the escalation process, then the tax/VAT relief at the end. That sequencing makes it the authoritative resource, not a reminder-template directory.

**Boundary (BINDING per collision_verify A11):** this page covers COMMERCIAL late payment only (business-to-business unpaid invoices). It does NOT cover HMRC late-payment penalties (interest and surcharges on unpaid tax), which is a different topic served by existing penalty/deadline pages in the corpus. Writers must not conflate the two. Do not stray into HMRC's late-payment interest regime.

**Cluster pair:** A1 (cash-flow-management-small-business-uk) is the internal-process pair. Cross-link both ways. This page is the legal remedies half; A1 is the operating-system half.

---

## Statutory anchors (VERIFIED 2026-07-09 at primary source)

### Core Act and rate mechanism

- **Late Payment of Commercial Debts (Interest) Act 1998** (c. 20) -- the primary statute giving a statutory right to interest on qualifying B2B debts. https://www.legislation.gov.uk/ukpga/1998/20/contents

- **Section 6 + SI 2002/1675 (Late Payment of Commercial Debts (Rate of Interest) (No. 3) Order 2002):** the interest rate is **8 percentage points above the Bank of England official dealing rate (base rate)** in force on the reference date. The reference date is determined semi-annually: the **base rate on 30 June** applies for interest that starts to run between 1 July and 31 December; the **base rate on 31 December** applies for interest starting between 1 January and 30 June. Exact wording (Article 4): "8 per cent per annum over the official dealing rate in force on the 30th June (in respect of interest which starts to run between 1st July and 31st December) or the 31st December (in respect of interest which starts to run between 1st January and 30th June) immediately before the day on which statutory interest starts to run."

> **HP LOCK NEEDED -- BoE base rate (current, July 2026):** The BoE website was blocked (403) at brief-write time (2026-07-09). The writer MUST fetch the current Bank Rate from https://www.bankofengland.co.uk/monetary-policy/the-interest-rate-bank-rate before writing the worked example. The applicable reference-date rate for interest starting to run between 1 July 2026 and 31 December 2026 is the BoE base rate in force on 30 June 2026. Insert that confirmed figure -- expressed as a percentage -- into all worked examples. Flag F-21 below records this as an open HP item. Do NOT invent or estimate the rate.

- **Section 5A (compensation, as inserted by SI 2013/395 Late Payment of Commercial Debts Regulations 2013):** fixed sums payable once interest starts to run, per debt:

  | Debt amount | Fixed compensation |
  |---|---|
  | Under £1,000 | £40 |
  | £1,000 to £9,999.99 | £70 |
  | £10,000 or more | £100 |

  Where reasonable recovery costs exceed the fixed sum, the creditor may also claim the difference (s.5A(2A)). Verified at https://www.legislation.gov.uk/ukpga/1998/20/section/5A

- **Section 4 (default payment periods):** statutory interest begins to run from the "relevant day":
  - For **public authorities** (central/local government, NHS, etc.): 30 days after the later of (a) performance of the supplier's obligation, (b) the purchaser receiving notice of the amount (the invoice), or (c) completion of any contractually agreed acceptance/verification procedure.
  - For **business-to-business transactions:** 60 days after those same events, **unless a shorter agreed date applies** (contracted payment terms of, say, 30 days will trigger interest from day 31 if unpaid). The 60-day cap is not a default of 60 days -- it is the maximum that can be agreed without the term being void as grossly unfair. A 30-day agreed term means interest runs from day 31.
  - Where no agreed date exists and the purchaser is not a public authority: interest runs **30 days after the invoice date or delivery (whichever is later)** per the gov.uk guidance. Verified at https://www.gov.uk/late-commercial-payments-interest-debt-recovery
  - The Act applies to B2B contracts for the supply of goods or services; it does not apply to consumer (B2C) debts.

- **Late Payment of Commercial Debts Regulations 2013 (SI 2013/395):** amend the 1998 Act to add s.5A compensation, implement the EU Late Payment Directive 2011/7/EU (retained in UK law post-Brexit). Verified at https://www.legislation.gov.uk/uksi/2013/395/contents

### VAT bad-debt relief

- **VATA 1994 s.36:** a VAT-registered supplier who has already paid output VAT on an invoice may reclaim that VAT as bad-debt relief if:
  1. At least **6 months have elapsed** since the later of the date of supply and the date the payment was due.
  2. The debt (or the unpaid portion) has been **written off in the supplier's accounts** as a bad debt.
  3. The **VAT output account has been adjusted** (the reclaim is made via the VAT return, Box 4).
  4. The supply was at the standard or reduced rate (zero-rated and exempt supplies do not carry VAT to reclaim).
  5. The claim must be made within **4 years** of the later of the date of supply and the original tax point (regulatory time limit under the VAT Regulations 1995, SI 1995/2518).
  - If the customer later pays, the relief must be repaid.
  - Verified at https://www.legislation.gov.uk/ukpga/1994/23/section/36
  - Cross-reference: HMRC VAT Notice 700/18 (the operational guidance, currently at https://www.gov.uk/guidance/vat-notice-70018-relief-from-vat-on-bad-debts -- returned 404 at brief-write time; writer should verify the live URL at write time).

### Income tax / corporation tax bad-debt deduction

- A bad debt (trade debt written off as irrecoverable) is a **deductible trading expense** for income tax (ITTOIA 2005 s.35, trading income deduction for specific bad debts written off) and corporation tax (CTA 2009 s.55). The deduction arises in the period in which the debt is written off. Specific bad-debt provisions (amounts set aside) are also deductible; general provisions are not. The deduction reduces taxable profit at the business's marginal rate (income tax or CT).

---

## Competitor URLs (verified 2026-07-09)

| URL | Status | Notes |
|---|---|---|
| https://countingup.com/resources/late-payment-reminder-templates/ | **LIVE (HTTP 200)** | Title: "Late payment reminder templates". On-topic: B2B late payment, four escalating email templates, references "8% interest or compensation". Useful as a benchmark: this page has templates but thin statutory explanation (no compensation bands, no worked interest calculation, no tax/VAT relief). Our page beats it on depth of legal rights. |
| https://informi.co.uk/finance/late-payment-is-the-problem-getting-better-or-worse-for-uk-smes | **DEAD (HTTP 404)** | Drop from brief. |

Writer: run a fresh check on both URLs at write time. Also search for live on-topic pages from crunch.co.uk, accountingweb.co.uk, businessaccountingbasics.co.uk on "late payment interest UK small business" and fetch up to 2 additional live ones. Add each with a 1-line gap note. Aim for 3 live competitor references total.

---

## Authority links (verified live 2026-07-09)

1. **https://www.gov.uk/late-commercial-payments-interest-debt-recovery** (HTTP 200) -- gov.uk hub: 30/60-day default terms overview.
2. **https://www.gov.uk/late-commercial-payments-interest-debt-recovery/charging-interest-commercial-debt** (HTTP 200) -- confirms "8% plus the Bank of England base rate"; directs to BoE for current rate.
3. **https://www.gov.uk/late-commercial-payments-interest-debt-recovery/claim-debt-recovery-costs** (HTTP 200) -- confirms £40/£70/£100 compensation bands with exact debt-amount table.
4. **https://www.legislation.gov.uk/ukpga/1998/20/section/5A** (HTTP 200) -- s.5A primary text; compensation + excess recovery costs.
5. **https://www.legislation.gov.uk/ukpga/1998/20/section/4** (HTTP 200) -- s.4 primary text; 30-day (public authority) and 60-day (B2B default) payment periods.
6. **https://www.legislation.gov.uk/uksi/2002/1675** (HTTP 200) -- SI 2002/1675 Article 4; exact 8% + reference-date formula.
7. **https://www.legislation.gov.uk/ukpga/1994/23/section/36** (HTTP 200) -- VATA 1994 s.36; bad-debt relief 6-month condition, write-off requirement.

---

## Worked example: £10,000 invoice, 90 days overdue

**Scenario:** Your business (VAT-registered, standard-rated) raised a £10,000 invoice (ex VAT) on 1 April 2026. Agreed payment terms: 30 days (due 1 May 2026). The customer has not paid. Today is 30 July 2026 -- 90 days since the invoice, 60 days since the due date. You want to know what you can now charge.

### Step 1: Has the trigger been hit?

Agreed payment terms are 30 days. The relevant day is 1 May 2026 (30 days after the invoice, assuming the customer received it on the invoice date). Interest starts to run from 2 May 2026.

### Step 2: Which reference-date base rate applies?

Interest starts running between 1 January 2026 and 30 June 2026, so the reference date is the BoE base rate in force on **31 December 2025**.

> **Writer instruction:** Insert the confirmed BoE base rate in force on 31 December 2025 here. Verify at https://www.bankofengland.co.uk/monetary-policy/the-interest-rate-bank-rate. For example, if that rate was X%, the statutory rate is (8 + X)% per annum. Adjust all figures below using the confirmed X.

**Worked calculation (using placeholder rate -- writer to substitute):**

Assume BoE base rate on 31 December 2025 = **[X]%** (writer inserts confirmed figure).

Statutory interest rate = 8% + [X]% = **[8+X]%** per annum.

Daily rate = (8 + X) / 100 / 365.

Interest accrued from 2 May 2026 to 30 July 2026 = 89 days.

Interest = £10,000 x ((8 + X) / 100) x (89 / 365) = **£[result]**

**VERIFIED at gate (conductor 2026-07-09):** BoE base rate = **3.75%** (derived from two independent HMRC statutory definitions verified at gov.uk: late-payment interest 7.75% = base + 4 from 9 Jan 2026; QIP debit 6.25% = base + 2.5 from 29 Dec 2025). Base at the 31 December 2025 reference date = 3.75%, so the statutory late-payment rate for 1 Jan - 30 Jun 2026 = **11.75% per annum**. Worked example: 89 days on £10,000 = £10,000 x 0.1175 x (89/365) = **£286.51** in interest, plus £70 fixed compensation. Date-tag the rate and note it resets each 30 June / 31 December.

### Step 3: Fixed compensation

The debt is £10,000 or more (at invoice value), so the fixed compensation under s.5A is **£100**. This is payable in addition to interest, once.

### Step 4: VAT on the interest and compensation

Statutory interest and fixed compensation under the 1998 Act are **outside the scope of VAT** (they are not consideration for a supply). Do not add VAT to the interest charge or the compensation.

### Step 5: VAT bad-debt relief

VAT on the original invoice = £10,000 x 20% = **£2,000** (already paid to HMRC on the VAT return).

The debt has been overdue since 1 May 2026. Six months will not have elapsed until 1 November 2026. **Bad-debt relief cannot be claimed yet** (as at 30 July 2026).

Action calendar: write off the debt in accounts on or after 1 November 2026, adjust Box 4 on the next VAT return covering that period. Deadline: 4 years from the date of supply (1 April 2030).

### Step 6: Income tax / CT bad-debt deduction

If the debt is written off as irrecoverable in the business's accounts, the £10,000 (ex-VAT) is a deductible trading expense, reducing taxable profit in that period. For a company paying 19% CT, that is up to £1,900 of CT relief. For a higher-rate sole trader, up to £4,000.

### Summary table

| Item | Amount |
|---|---|
| Invoice (ex VAT) | £10,000 |
| Statutory interest (89 days at verified rate -- writer inserts) | £[X] |
| Fixed compensation (s.5A, debt £10,000+) | £100 |
| VAT bad-debt relief (eligible from 1 Nov 2026) | £2,000 VAT reclaim |
| CT/IT bad-debt deduction (on write-off) | Up to £[rate x £10,000] |

---

## Escalation timeline table

The table below models a single B2B invoice with agreed 30-day payment terms. Public-authority invoices: substitute 30-day default; interest begins on day 31.

| Day (from invoice date) | What you can do | Statutory rights available? |
|---|---|---|
| Day 1-30 | Send invoice; payment due by day 30. Friendly reminder at day 25 (optional). | Not yet. |
| Day 31 | Payment term breached. Statutory interest clock starts. Send first formal chaser noting your right to add interest. | Yes: interest accruing from today. |
| Day 31+ (immediately) | Issue compensation notice: £40, £70 or £100 fixed sum (debt-size band). One charge per invoice. | Yes: s.5A compensation. |
| Day 31-60 | Second formal chaser, referencing the Act, stating the daily interest rate, the accrued total and the compensation already added. | Interest accruing daily. |
| Day 61-90 | Final demand by email and recorded post. State the total now due (invoice + interest to date + compensation). Give 7 days before next step. | Same. |
| Day 91+ | Escalation options: (a) statutory demand (for debts over £750 from a company, or £5,000 from an individual), (b) small claims / Money Claim Online (up to £10,000), (c) debt collection agency, (d) solicitor's letter. | Interest continues to accrue throughout. |
| Month 6+ (from supply date or due date, whichever later) | Write off the debt in accounts; claim VAT bad-debt relief on next VAT return (Box 4). | VATA 1994 s.36 VAT reclaim available. |
| Tax year / accounting period end | Deduct the written-off debt as a trading expense (income tax / CT). | ITTOIA 2005 s.35 / CTA 2009 s.55. |

---

## Page structure (H2 sections)

1. **What the law gives you** -- brief intro: the 1998 Act, who it applies to (B2B), that rights are automatic (no contract clause needed).
2. **When does statutory interest start?** -- the 30-day (default, no agreed terms) and 60-day (B2B max) rules, what "relevant day" means, public authority vs private buyer.
3. **How much interest can you charge?** -- the 8% + BoE base rate formula, how to find the reference date rate, the semi-annual reference date mechanic (so the rate does not change mid-period), daily-rate calculation.
4. **Fixed compensation per invoice** -- the £40/£70/£100 table, one claim per invoice, excess costs recoverable.
5. **Worked example: £10,000 invoice 90 days late** -- the arithmetic (with verified BoE rate), summary table. (See worked example above.)
6. **How to chase: escalation timeline** -- the table above, with recommended letter language at each stage (do not template the letters in full; signpost to a template source, e.g. gov.uk or a free solicitor letter generator; keep the focus on the legal basis for each stage).
7. **VAT bad-debt relief: reclaiming the VAT you already paid** -- 6-month rule, write-off requirement, VAT return Box 4, 4-year deadline, what happens if the customer pays later.
8. **Income tax and corporation tax: the bad-debt deduction** -- specific write-off deductible, timing (period of write-off), the general-provision trap.
9. **What cannot be recovered** -- things the Act does not cover: B2C debts, HMRC tax debts, disputed invoices (interest does not run on a genuinely disputed amount), debts under a consumer credit agreement.
10. **When to escalate to a solicitor** -- brief signpost only; not legal advice; thresholds (statutory demand, small claims, County Court judgment).

---

## FAQ drafts (9 questions, full draft)

**1. Does the Late Payment Act apply to every business invoice?**

It applies to contracts for the supply of goods or services where **both parties are acting in the course of a business** (business-to-business). It does not apply to consumer transactions (where the customer is an individual buying for personal use) or to contracts with public authorities that are governed by separate procurement rules. The Act also does not apply to contracts of employment, financial-services contracts regulated by the FCA, or contracts for an interest in land. If your customer is another business and the contract is for goods or services, the Act almost certainly applies. The rights under the Act cannot be contracted out of (any term that attempts to exclude them is void), though the parties can agree payment terms of up to 60 days.

**2. What if my invoice does not state payment terms?**

If you have not agreed a specific payment date with your customer, the default under the Act is that payment is due **30 days after whichever is later**: the day you performed your obligation under the contract (delivered the goods, completed the service) or the day the customer received the invoice. Statutory interest then starts to run from day 31. Public authority customers have the same 30-day default. Agreeing shorter terms (14 days, for example) means interest runs from day 15 if unpaid.

**3. Can I claim both interest and the fixed compensation?**

Yes. They are separate rights under the 1998 Act. Once interest starts to run, you are entitled to the fixed compensation (£40, £70 or £100 depending on the debt size) **and** the daily statutory interest. You charge the compensation once per invoice, not per reminder. If your actual debt-recovery costs (letters, collection agency fees, solicitor costs) exceed the fixed sum, you can also claim the difference under s.5A(2A).

**4. Does adding statutory interest damage my customer relationship?**

Many small businesses worry about this, but the law gives you the right precisely because late payment has a real cost. In practice, most businesses mention the right in their payment terms at the outset rather than as a penalty after the fact. Including a line in your terms and conditions ("We reserve the right to charge statutory interest under the Late Payment of Commercial Debts (Interest) Act 1998 on invoices unpaid after [X] days") signals that you take payment seriously without being aggressive. Whether to actually charge the interest is a commercial judgement; the point of the page is that you have the right.

**5. How do I calculate the statutory interest on a specific invoice?**

Three steps. First, find the applicable reference-date rate: if interest starts to run between 1 January and 30 June, use the BoE base rate on the previous 31 December; if it starts between 1 July and 31 December, use the BoE base rate on the previous 30 June. Add 8 percentage points to that base rate to get the annual statutory rate. Second, divide the annual rate by 365 to get the daily rate. Third, multiply the daily rate by the number of days interest has been running and apply that to the debt amount. The gov.uk page at https://www.gov.uk/late-commercial-payments-interest-debt-recovery/charging-interest-commercial-debt has a simple calculator link.

**6. What is VAT bad-debt relief and how do I claim it?**

If you are VAT-registered and have already paid the output VAT on an invoice to HMRC, but the customer has not paid you, you can reclaim that VAT through your VAT return once the debt is at least **6 months overdue** (measured from the later of the supply date and the due date). You must also have written the debt off in your accounts as irrecoverable. The reclaim goes in Box 4 of your next VAT return. Keep records of the original invoice, the write-off entry and the VAT return period. If the customer later pays, you must repay the relief. The time limit for claiming is 4 years from the later of the supply date and the original tax point. VATA 1994 s.36 is the statutory authority; HMRC VAT Notice 700/18 has the procedural detail.

**7. Can I deduct a bad debt from my taxable profits?**

Yes. When a specific trade debt is written off as irrecoverable in your accounts, that write-off is a deductible trading expense: for income tax, under ITTOIA 2005 s.35; for corporation tax, under CTA 2009 s.55. The deduction falls in the accounting period in which you write the debt off. A general provision (for example, "5% of all debtors might go bad") is not deductible. Only specific debts, identified and written off, qualify.

**8. Does statutory interest keep running while I am going through the courts?**

Yes. Statutory interest under the 1998 Act continues to accrue until the debt is paid. If you obtain a court judgment, the court will typically award the statutory interest that accrued up to the judgment date as part of the judgment sum. Post-judgment interest is then governed by the Judgments Act 1838 (currently 8% per annum on county court judgments). Keep a running total of the accrued interest when you prepare a court claim so the claim amount is accurate.

**9. What counts as a "grossly unfair" payment term that I can challenge?**

The 1998 Act (following the 2013 Regulations) lets you challenge a contractual payment term that is "grossly unfair to the supplier." The Act says a term is presumed grossly unfair if it extends the payment period beyond 60 days for a business-to-business contract, unless the nature of the contract or the circumstances of the parties objectively justify it. In practice, terms beyond 60 days in standard commercial contracts are challengeable. You can apply to court to substitute the statutory interest provision in place of the unfair term. This is most relevant where a large buyer imposes payment terms of 90 or 120 days on smaller suppliers.

---

## Cross-link map

| Link to | Anchor text suggestion | Rationale |
|---|---|---|
| cash-flow-management-small-business-uk (A1) | "cash flow management system" or "13-week cash flow forecast" | Cluster pair; late-payment legal remedies pair with internal cash management practice. |
| what-does-a-management-accounting-service-actually-do | "management accountant" | Mentioned in framing; a management accountant helps build the credit-control system. |
| cash-basis-vs-accruals-sole-trader | "cash basis" | Clarify the accounting-method distinction if mentioned in passing. |
| vat-threshold-2025-26 or flat-rate-vat-vs-standard-vat | "VAT registration" | Context for the VAT bad-debt relief section (reader may not be VAT-registered yet). |
| self-assessment-accountant-2025-26 or allowable-expenses-sole-trader-checklist | "deductible trading expense" | Context for the bad-debt deduction section. |

Writer: verify all slug URLs are live at write time before inserting. Use relative internal links (e.g. `/blog/cash-flow-management-small-business-uk`).

---

## Meta drafts

**Title (target: under 62 characters):**
Late payment rules for small businesses UK | Holloway Davies
(57 characters including pipe and brand name -- fits)

**Meta description (target: under 158 characters):**
Statutory interest, fixed compensation and bad-debt VAT relief explained. Know your rights under the Late Payment of Commercial Debts Act 1998.
(143 characters -- fits)

---

## Voice and quality notes

- No em-dashes. Use commas, parentheses or full stops instead.
- Every statutory rate or figure carries its source reference (section number or SI number) in parentheses on first use.
- The worked example must use the confirmed BoE reference-date base rate (see HP LOCK NEEDED above). Do not publish with a placeholder.
- Tone: authoritative and precise, not intimidating. The reader is a small-business owner who feels awkward chasing late payment; the page should give them confidence ("the law is on your side, here is exactly what you can charge and how").
- Avoid "it is worth noting" and similar hedging openers.
- LeadForm injection at the footer only; do not insert a CTA in the body.
- No pricing on-page; no client names; anonymised social proof only if used.

---

## HP flag item

> **F-21 -- HOUSE_POSITION_EXTENSION (BoE base rate, late payment)** raised 2026-07-09 (A11 brief session). The applicable BoE base rate for interest starting to run in H2 2026 (reference date: 30 June 2026) and for the worked example period (reference date: 31 December 2025) could not be verified at brief-write time (BoE website returned 403). The writer must fetch and confirm both reference-date figures before publishing the worked example. The formula (8% + reference-date BoE base rate, semi-annual) is confirmed at primary source (SI 2002/1675 Article 4). Once the writer confirms the rate, the conductor should add a HP lock entry for the late-payment statutory rate. Flags file: `docs/generalist/wave4_site_wide_flags.md` (append F-21 there).
