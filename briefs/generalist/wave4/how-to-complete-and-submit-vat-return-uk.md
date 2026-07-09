---
slug: how-to-complete-and-submit-vat-return-uk
category: VAT and Making Tax Digital
intent: informational (operational how-to for VAT-registered UK business owners completing and submitting their quarterly return via MTD-compatible software; high purchase intent — these are people already in the VAT system who want to get the return right)
pick_id: A9
wave: 4
status: brief-ready
verified_at: 2026-07-09
---

# Working title

**How to complete and submit a VAT return: the 9-box walkthrough (MTD guide for UK businesses)**

---

## Framing differentiator

Most competitor content on VAT returns either (a) covers registration only, (b) gives a superficial one-line description of each box, or (c) is aimed at accountants rather than the business owner. This page owns the **operational completion angle**: a business owner who is already VAT-registered, is facing their next quarterly deadline, and wants to be certain they have put the right figure in every box before hitting submit via their MTD software. The differentiator is a **worked example** with real figures flowing through all nine boxes, plus a clear explanation of the MTD software submission workflow and the most common errors (and how to correct them without triggering a penalty).

**Boundary (BINDING per collision_verify A9):** completion mechanics only (9-box walkthrough, MTD submission workflow, deadlines/payment, common errors, corrections via next-return adjustment or VAT652). NOT registration, threshold, scheme choice, deregistration (existing pages own all of those). Flat-rate interaction = one paragraph + link to the flat-rate page. Construction reverse charge = one sentence + link to the reverse-charge page.

---

## Statutory and regulatory anchors

All figures and obligations below are verified or flagged per the verification log at the foot of this brief.

**Primary sources:**
- **VATA 1994** (Value Added Tax Act 1994) — the primary charging and return-obligation statute; s.25 (return obligation, input/output netting), s.80 (error correction credits/debits), Sch 1 (registration).
- **Value Added Tax Regulations 1995 (SI 1995/2518)** — Part IV (tax periods and returns, regs 25 and 40); reg 40 imposes the 1-calendar-month-and-7-days deadline from the end of the tax period.
- **Value Added Tax (Amendment) (No. 2) Regulations 2019 (SI 2019/693)** — MTD for VAT digital records and digital links obligations (effective from April 2019 for large businesses, April 2022 for all).
- **HMRC VAT Notice 700/12** ("How to fill in and submit your VAT Return") — the operative how-to guidance; box definitions are drawn from this notice. LIVE VERIFICATION NOTE: the gov.uk guidance URL for VAT Notice 700/12 returned 404 during brief prep on 2026-07-09. Box definitions below are from training knowledge of the established post-Brexit 9-box layout. Writer must re-verify each box definition against the live VAT Notice 700/12 on gov.uk before publishing (see flag F-91 below).
- **HMRC VAT Notice 700** ("The VAT guide") — general VAT charging and accounting rules.
- **HMRC VAT Notice 700/45** ("How to correct VAT errors and make adjustments or claims") — error correction thresholds and VAT652. LIVE VERIFICATION NOTE: the gov.uk URL for this notice also returned 404 during brief prep. Error correction thresholds (£10,000 / 1% of Box 6 up to £50,000) are from established HMRC guidance; writer must verify against the live notice before publishing (see flag F-92 below).

**Cross-references within the estate:**
- `vat-threshold-2025-26` — registration/deregistration thresholds (£90,000 / £88,000; HP §7)
- `flat-rate-vat-vs-standard-vat` — FRS mechanics; cross-link in the flat-rate paragraph
- `reverse-charge-vat-construction` — CIS domestic reverse charge; cross-link in the error/edge-cases section
- `vat-accountant-importing-goods-uk` — import VAT and postponed VAT accounting (PVA)
- `what-a-vat-accountant-does-hmrc-compliance-check` — when to bring in a professional

---

## Key questions (8-12 for FAQ section)

1. What are the 9 boxes on a UK VAT return and what goes in each one?
2. When is my VAT return due, and when does payment have to reach HMRC?
3. How does Making Tax Digital change the way I submit my VAT return?
4. What counts as a "digital link" for MTD VAT purposes?
5. What happens if I make a mistake on a submitted VAT return?
6. Can I correct a VAT error on my next return, or do I always need to tell HMRC separately?
7. What is postponed VAT accounting (PVA) and how does it affect boxes 1, 4 and 7?
8. How does the construction domestic reverse charge affect my VAT return?
9. What is a VAT652 form and when do I need to use it?
10. Do I need to submit a VAT return even if I have no VAT to pay?
11. What happens if I miss the VAT return deadline?
12. How do boxes 8 and 9 work for businesses that trade goods with Northern Ireland or the EU?

---

## Verified figures and house-position anchors

| Item | Figure | Source / HP anchor | Verified |
|---|---|---|---|
| Standard VAT rate | 20% | HP §7 / VATA 1994 | YES |
| Reduced rate | 5% | HP §7 / VATA 1994 | YES |
| Return + payment deadline | 1 calendar month and 7 days after end of tax period | gov.uk/vat-returns (fetched 2026-07-09, confirmed exact wording) | YES |
| MTD for VAT: all registered businesses | Since April 2022 | HP §7 confirmed | YES |
| Registration threshold | £90,000 (from 1 Apr 2024) | HP §7 | YES |
| Deregistration threshold | £88,000 | HP §7 | YES |
| Error correction: net under £10,000 | Adjust on next return | VAT Notice 700/45 — FETCH FAILED, figure from training knowledge | FLAG F-92 |
| Error correction: net £10,000 to £50,000 (and net under £10,000 but > 1% of Box 6 turnover) | Use VAT652 | VAT Notice 700/45 — FETCH FAILED | FLAG F-92 |
| Error correction: over £50,000 | Must use VAT652 (mandatory disclosure) | VAT Notice 700/45 — FETCH FAILED | FLAG F-92 |
| Box 8 (goods dispatched to NI/EU) | Applies to NI-protocol businesses only post-Brexit; GB businesses leave blank | VAT Notice 700/12 — FETCH FAILED | FLAG F-91 |
| Box 9 (goods acquired from NI/EU) | Applies to NI-protocol businesses only post-Brexit; GB businesses leave blank | VAT Notice 700/12 — FETCH FAILED | FLAG F-91 |
| FRS join threshold | £150,000 ex VAT | HP §7 | YES |
| FRS limited cost trader rate | 16.5% | HP §7 | YES |
| PVA: import VAT in Box 1 + Box 4 | Confirmed via gov.uk PVA guidance (fetched 2026-07-09) | YES |

---

## Competitor URLs (liveness check)

Both competitor URLs from picks.yaml returned 404 during brief prep on 2026-07-09. Writer must re-check these at page-authoring time and treat as dead unless confirmed live at that point:

- `https://www.crunch.co.uk/knowledge/vat-return-boxes-explained` — returned 404 on 2026-07-09. Re-check at write time; do NOT cite if still dead.
- `https://informi.co.uk/finance/what-is-a-vat-return-and-how-to-submit-yours-via-mtd` — returned 404 on 2026-07-09. Re-check at write time; do NOT cite if still dead.

Writer note: if both competitors are dead, the differentiation opportunity increases (fewer live authoritative pages in this space). Still write to A* standard; just disregard competitor benchmarking beyond the topical angle.

---

## Content specification

### H1 (finalise at write)

How to complete a UK VAT return: the 9-box walkthrough

### Lede (3-4 sentences, no em-dashes)

Every VAT-registered UK business must submit a VAT return for each tax period, typically quarterly, using MTD-compatible software. The return has nine boxes, and the figures in those boxes must be calculated correctly before submission. HMRC does not allow you to use a manual paper return or a direct spreadsheet upload: you need functional compatible software that can pull the data from your digital records and push the return to HMRC via their API. This guide walks through every box, shows a worked example, and covers deadlines, the MTD submission workflow, and what to do if you spot an error after submitting.

### Section 1: What a VAT return is (brief orientation, 100-150 words)

- One return per tax period (usually quarterly; monthly and annual are available in some cases)
- Report: VAT you have charged on sales (output tax) minus VAT you have paid on purchases (input tax)
- Net amount either payable to HMRC or reclaimable
- Must submit even if the net figure is zero
- Deadline: 1 calendar month and 7 days after the end of the tax period (both submission and payment; same date)
- All VAT-registered businesses must use MTD-compatible software since April 2022

### Section 2: MTD for VAT — what it means in practice (200-250 words)

Explain the three MTD obligations:

1. **Digital records**: the business must keep certain data in digital form — at a minimum: VAT registration number, the time and description of supply, the nature of supply (goods or services), the value of the supply (excluding VAT), the rate and amount of VAT charged. These must live in a functional compatible software product (or in linked digital tools that feed into one — spreadsheets can be used as part of a bridging solution if they are digitally linked).

2. **Digital links**: data must flow digitally between software tools. A digital link is any electronic transfer of data between two programs or products (a formula that pulls data from one spreadsheet cell to another counts; copy-and-paste does NOT count as a digital link and is not permitted). Bridging software sits between a spreadsheet and the HMRC API and creates the required digital submission link.

3. **API submission**: the nine box figures must be submitted directly to HMRC via the HMRC API, not by manual online entry. Compatible software handles this automatically; the business owner sees a summary and clicks submit (or the accountant does, via agent credentials).

MTD exemptions are very narrow: religion, insolvency, disability, or genuinely no access to digital tools. The great majority of VAT-registered businesses must comply.

Practical note: list the main software categories (dedicated accounting software such as Xero/QuickBooks/Sage; bridging software for spreadsheet users). Do NOT recommend specific products; instead direct readers to the HMRC-approved software list.

### Section 3: The 9 boxes — what goes in each one (core section, 400-500 words)

Present as a table with a brief prose explanation for each box. Box definitions per VAT Notice 700/12 (subject to live verification at FLAG F-91):

| Box | Label | What to put in |
|---|---|---|
| 1 | VAT due on sales and other outputs | The total output VAT charged on all taxable supplies in the period. Includes standard-rated (20%) and reduced-rated (5%) sales. Also includes VAT on goods from postponed VAT accounting (PVA imports). Does NOT include exempt supplies. |
| 2 | VAT due on acquisitions from EU member states (NI protocol only) | For businesses registered under the Northern Ireland Protocol that acquire goods from EU member states only. Most GB-only businesses will enter 0. |
| 3 | Total VAT due (Box 1 + Box 2) | Calculated field: sum of boxes 1 and 2. |
| 4 | VAT reclaimed on purchases and other inputs | Total input VAT recoverable in the period: VAT on business purchases, expenses, assets, imports (including PVA import VAT). Subject to partial exemption rules where the business also makes exempt supplies. |
| 5 | Net VAT to pay or reclaim (Box 3 minus Box 4) | Calculated field. If positive, the business owes this to HMRC. If negative (Box 4 > Box 3), HMRC owes a repayment. |
| 6 | Total value of sales and all other outputs (ex VAT) | The VAT-exclusive value of ALL outputs in the period: standard-rated, reduced-rated, zero-rated, and exempt supplies. Do NOT include VAT itself. This is the "turnover" figure HMRC uses for error-threshold calculations. |
| 7 | Total value of purchases and all other inputs (ex VAT) | The VAT-exclusive value of all purchases and expenses (business inputs), including imports. Do NOT include VAT itself. |
| 8 | Total value of goods supplied to EU member states (NI protocol only) | NI-protocol businesses only: value of goods dispatched to EU member states. Most GB businesses: 0. |
| 9 | Total value of goods acquired from EU member states (NI protocol only) | NI-protocol businesses only: value of goods acquired from EU member states. Most GB businesses: 0. |

Writer note: after the table, add two short paragraphs:
- **Boxes 8 and 9 post-Brexit**: explain that since 1 January 2021, goods traded between Great Britain (England, Scotland, Wales) and the EU are treated as imports/exports, not intra-EU acquisitions/dispatches. Boxes 8 and 9 are therefore only relevant to businesses registered under the Northern Ireland Protocol that move goods between Northern Ireland and EU member states. A business trading from GB only should enter 0 in both boxes.
- **Partial exemption note**: where a business makes both taxable and exempt supplies, input VAT in Box 4 must be restricted to the recoverable portion. A partial exemption calculation is required (standard method or special method agreed with HMRC). This is a single alert — the page does NOT need to cover partial exemption in depth.

### Section 4: Worked example (core section, 300-400 words)

**Scenario**: Standard Widgets Ltd, a small manufacturing business registered in England. Quarterly period: 1 January to 31 March 2026. Sells standard-rated widgets to UK customers AND zero-rated widget components to a customer in Germany (export, zero-rated in the UK post-Brexit). Also has one EU nuance: a small quantity of goods moved between its NI warehouse and a supplier in Ireland (NI protocol, so Box 9 applies to this acquisition).

Use the following figures (round numbers for clarity; writer may adjust slightly for realism):

| Transaction category | Net (ex VAT) | VAT |
|---|---|---|
| UK standard-rated sales | £80,000 | £16,000 |
| Zero-rated exports to Germany | £12,000 | £0 |
| Total outputs | £92,000 | £16,000 |
| Goods acquired from EU via NI warehouse (NI protocol) | £5,000 | £1,000 (acquisition VAT) |
| UK purchases (standard-rated costs) | £30,000 | £6,000 |
| Capital equipment purchase (standard-rated) | £10,000 | £2,000 |
| Total inputs | £40,000 | £8,000 |

Box-by-box fill:

- **Box 1**: £16,000 (output VAT on UK standard-rated sales) + £1,000 (acquisition VAT on NI-protocol goods) = **£17,000**
- **Box 2**: £1,000 (acquisition VAT declared here for NI-protocol purchases) = **£1,000**
- **Box 3**: £17,000 + £1,000 = **£18,000**
- **Box 4**: £6,000 (purchases) + £2,000 (equipment) + £1,000 (acquisition VAT reclaimed) = **£9,000**
- **Box 5**: £18,000 minus £9,000 = **£9,000 payable to HMRC**
- **Box 6**: £80,000 + £12,000 (zero-rated export) = **£92,000** (do NOT include the £5,000 NI acquisition value here — it goes in Box 9)
- **Box 7**: £30,000 + £10,000 + £5,000 (NI acquisition net) = **£45,000**
- **Box 8**: £0 (no goods dispatched to EU member states)
- **Box 9**: £5,000 (net value of goods acquired from Ireland via NI protocol)

Writer guidance: present the worked example clearly as a narrative ("Standard Widgets Ltd sells..."), then show the box fill, then explain the two or three teaching points (zero-rated exports inflate Box 6 but not Box 1; the NI acquisition appears in Box 2, Box 1, Box 4 and Box 9; Box 5 is the only amount that results in a payment).

### Section 5: Deadlines and payment (150-200 words)

- **Deadline**: 1 calendar month and 7 days after the end of the tax period. For a quarterly period ending 31 March 2026, the deadline is 7 May 2026. Both submission and payment must reach HMRC by this date.
- **Payment methods**: Direct Debit (HMRC debits automatically after the submission, 3 working days after the deadline if set up in advance), bank transfer (Faster Payments or CHAPS direct to HMRC's bank account), or via your VAT online account.
- **Direct Debit timing**: if you have a Direct Debit mandate set up with HMRC, the payment is collected automatically approximately 3 working days after the filing deadline. Submit your return on time even if you use Direct Debit — if you file late, the collection will not go ahead.
- **Late submission and payment**: HMRC operates a points-based penalty system for VAT from January 2023 (replacing the old default surcharge). A late return earns a penalty point; reaching the threshold (4 points for quarterly filers) triggers a £200 fixed penalty and a further £200 per subsequent late submission. Late payment interest applies from the day after the payment deadline at the HMRC late-payment interest rate (Bank of England base rate + 2.5%, currently 7.5% at time of writing — writer must verify current rate).

### Section 6: How to submit via MTD software (200-250 words)

Practical step-by-step (written as prose, not a checklist):

1. Ensure your accounting software (or bridging software) is connected to your HMRC VAT account via the HMRC API (one-time setup via your VAT online account or via your accountant's agent login).
2. At period end, run your VAT report in the software. Review the nine boxes the software has calculated.
3. Cross-check Box 6 (total outputs ex VAT) against your sales ledger to confirm the period's trading figures are complete.
4. If you have postponed VAT accounting (import VAT), download your monthly postponed import VAT statements from the HMRC customs portal and ensure the figures have been added to Box 1 and Box 4.
5. Confirm Box 3 = Box 1 + Box 2 and Box 5 = Box 3 minus Box 4. These are calculated by the software but sense-check them.
6. Submit from within your software. The software sends the nine figures to HMRC via the API. You will receive a confirmation reference number on screen; save this.
7. Pay the Box 5 amount by the same deadline (if Box 5 is positive). If you have a Direct Debit mandate, no separate action is needed.

Paragraph on agent submission: if your accountant submits on your behalf, they do so via their own MTD-compatible software under their Agent Services Account. You remain responsible for the accuracy of the figures.

### Section 7: Common errors and how to correct them (200-250 words)

Frame as the five most common mistakes, then the correction routes:

**Common errors:**
1. Including VAT in Box 6 or Box 7 (these are VAT-exclusive figures)
2. Forgetting zero-rated supplies in Box 6 (zero-rated goes in Box 6 even though no VAT in Box 1)
3. Omitting postponed import VAT from Boxes 1 and 4 (PVA is easy to miss if the monthly statement is not downloaded)
4. Claiming input VAT on non-business or blocked items (business entertainment, most car purchases unless the car is solely for business use)
5. Construction businesses omitting domestic reverse charge entries (Box 1 and Box 4 both affected for services received under the DRC)

**Correction routes (SUBJECT TO LIVE VERIFICATION — see flag F-92):**

- **Error net value under £10,000 (and under 1% of Box 6 turnover)**: adjust on your next VAT return. Include the correction in the period you discover the error.
- **Error net value between £10,000 and £50,000 (or under £10,000 but over 1% of Box 6 turnover)**: you may still adjust on the next return, but you should also inform HMRC via VAT652.
- **Error net value over £50,000**: you MUST use VAT652 (mandatory disclosure); you cannot simply adjust on the next return.
- **Deliberate errors**: regardless of amount, always disclose separately; do NOT try to absorb a deliberate error on the next return.

Writer must verify the £10,000 and £50,000 thresholds against the live VAT Notice 700/45 before publishing (flag F-92). The direction of travel of these thresholds is correct per training knowledge but the live notice may show updated figures.

### Section 8: The flat-rate interaction (one paragraph + link)

Businesses using the Flat Rate Scheme (FRS) do not fill in the VAT return in the same way. Instead of calculating input and output VAT separately, they apply a flat rate percentage to their VAT-inclusive turnover and pay that to HMRC. Box 6 is completed using the flat-rate scheme rules. The return is still submitted via MTD software and by the same deadline. If your taxable turnover (ex VAT) is £150,000 or less, you can join the FRS; however, if you are a limited cost business (goods cost under 2% of turnover or under £1,000 a year), the rate is 16.5%, which usually makes the FRS unattractive. See the detailed guide: [flat-rate VAT vs standard VAT](/flat-rate-vat-vs-standard-vat).

### Section 9: When to get professional help (50-75 words, soft CTA)

If your business makes both taxable and exempt supplies (partial exemption), has significant import/export activity, is in the construction sector under the domestic reverse charge, or has received a VAT inspection letter, the return calculation becomes more complex. An accountant who handles VAT compliance can review your figures, file on your behalf, and handle any HMRC queries. [What a VAT accountant does](/what-a-vat-accountant-does-hmrc-compliance-check).

---

## FAQ drafts (10 full drafts, ready to publish)

**Q1: What are the 9 boxes on a UK VAT return?**

The nine boxes on a UK VAT return are: Box 1 (output VAT on sales and other outputs), Box 2 (VAT on goods acquired from EU member states under the Northern Ireland Protocol), Box 3 (total VAT due, the sum of Boxes 1 and 2), Box 4 (input VAT reclaimed on purchases and inputs), Box 5 (the net VAT payable to HMRC or reclaimable, Box 3 minus Box 4), Box 6 (total value of all outputs excluding VAT), Box 7 (total value of all inputs excluding VAT), Box 8 (value of goods supplied to EU member states, NI Protocol only) and Box 9 (value of goods acquired from EU member states, NI Protocol only). Most UK businesses trading only in Great Britain will enter zero in Boxes 2, 8 and 9.

**Q2: When is a VAT return due?**

A VAT return and the payment owed must reach HMRC by 1 calendar month and 7 days after the end of your VAT accounting period. For a quarter ending 31 March, the deadline is 7 May. For a quarter ending 30 June, the deadline is 7 August. Both submission and payment share the same deadline, and HMRC checks both independently.

**Q3: Do I need to submit a VAT return if I have no VAT to pay?**

Yes. Every VAT-registered business must submit a return for each tax period, even if the net figure is zero or if you are due a repayment from HMRC. Failing to submit still earns a penalty point under HMRC's points-based system (from January 2023), and accumulating four points as a quarterly filer triggers a £200 fixed penalty.

**Q4: What does Making Tax Digital mean for my VAT return?**

MTD for VAT requires you to keep certain records digitally and submit your return via MTD-compatible software connected to HMRC's API, rather than typing figures into HMRC's website directly. The software reads your digital records and submits the nine box values automatically. All VAT-registered UK businesses have been required to use MTD for VAT since April 2022. You can use dedicated accounting software (Xero, QuickBooks, Sage and others are all MTD-compatible) or bridging software if you work primarily in spreadsheets.

**Q5: What is a digital link for MTD VAT?**

A digital link is an electronic transfer of data between two software products that does not involve manual re-keying. If your VAT figures start in a spreadsheet and end in your submission software, the data must flow via a formula, import, or API connection rather than someone copying and pasting numbers by hand. Copy-and-paste is not a digital link and is not MTD-compliant. If you use a spreadsheet to calculate VAT, you must use bridging software to create the required digital link to HMRC's system.

**Q6: What happens if I make a mistake on a submitted VAT return?**

You cannot change a submitted VAT return. Instead, you correct the error on a later return or by contacting HMRC directly, depending on the size of the error. For small errors (net value under £10,000 and under 1% of your Box 6 turnover), you can simply include the correction in your next return. For larger errors, you should use form VAT652 to notify HMRC separately. Deliberate errors must always be disclosed separately. Note: check flag F-92 in this brief before publishing, as the exact thresholds are subject to live verification.

**Q7: What is a VAT652 form?**

VAT652 is the HMRC form used to voluntarily disclose VAT errors that are too large to correct on the next return, or where mandatory disclosure is required (errors over £50,000 net). Submitting a VAT652 promptly and before HMRC discovers the error can reduce penalties under the prompted vs. unprompted disclosure regime. Download it from gov.uk and post it to HMRC's VAT Error Correction Team.

**Q8: How does postponed VAT accounting (PVA) affect my VAT return?**

If you import goods into the UK and use postponed VAT accounting, you do not pay import VAT at the port. Instead, you account for it on your VAT return: the import VAT is declared as output tax in Box 1, and the same amount is reclaimed as input tax in Box 4 (if you are fully taxable). The net VAT effect is zero for most fully taxable businesses. You must download your monthly postponed import VAT statements from the HMRC customs portal to get the correct figures. The net value of the imports (excluding VAT) goes into Box 7.

**Q9: How do boxes 8 and 9 work, and do I need to fill them in?**

Boxes 8 and 9 relate to goods moved between Northern Ireland and EU member states under the Northern Ireland Protocol. Box 8 is the value of goods dispatched to EU member states, and Box 9 is the value of goods acquired from EU member states. If your business is based entirely in Great Britain (England, Scotland or Wales) and does not move goods through Northern Ireland, you will enter 0 in both boxes. Since 1 January 2021, goods traded between Great Britain and the EU are treated as imports and exports under customs rules, not as intra-EU acquisitions or dispatches.

**Q10: Can I still submit a VAT return on paper?**

No, for the vast majority of businesses. All VAT-registered businesses have been required to submit returns via MTD-compatible software since April 2022. Paper returns are only permitted for businesses that have been granted an MTD exemption by HMRC, which is available on very limited grounds (genuine digital exclusion due to disability, age or religious objection, or insolvency-related situations). If you believe you qualify, apply to HMRC before your next return deadline.

---

## Cross-link map

| Target page | Anchor text suggestion | Direction |
|---|---|---|
| `vat-threshold-2025-26` | VAT registration threshold | Body mention of registration |
| `flat-rate-vat-vs-standard-vat` | flat-rate VAT vs standard VAT | Section 8 (FRS paragraph) |
| `reverse-charge-vat-construction` | domestic reverse charge for construction | Section 7 (common errors) |
| `vat-accountant-importing-goods-uk` | import VAT and postponed VAT accounting | Section 6 / FAQ Q8 |
| `what-a-vat-accountant-does-hmrc-compliance-check` | what a VAT accountant does | Section 9 (soft CTA) |

---

## Meta drafts

**Title tag** (target: 50-62 characters):
`How to Complete a UK VAT Return: The 9-Box Guide (MTD)`
(55 characters — within limit)

**Meta description** (target: 130-158 characters):
`A box-by-box walkthrough for completing and submitting your UK VAT return via MTD software, with a worked example, deadlines, and error correction guidance.`
(157 characters — within limit)

---

## HP-lock extension needed

The following items from this brief are not yet in `house_positions.md §7` (VAT) and should be added at the HP-lock gate before this page is published:

**New items for §7 extension:**

1. **Return deadline**: 1 calendar month and 7 days after the end of the tax period (both submission and payment). Verified at gov.uk/vat-returns 2026-07-09.
2. **Box definitions (post-Brexit 9-box layout)**: the nine boxes as specified in VAT Notice 700/12, including the NI-Protocol-only status of Boxes 2, 8 and 9 for GB-only businesses.
3. **MTD digital records requirement**: the specific data fields that must be kept digitally (VAT number, time/description/nature/value of supply, rate and amount of VAT).
4. **Digital links definition**: electronic data transfer between software products; copy-and-paste is not a digital link.
5. **Error correction thresholds**: net under £10,000 (and under 1% of Box 6) = adjust on next return; £10,000 to £50,000 (or under £10,000 but over 1% of Box 6) = VAT652 advisable; over £50,000 = VAT652 mandatory. SUBJECT TO FLAG F-92 live verification.
6. **PVA treatment on the return**: import VAT in Box 1 (output) and Box 4 (input), net of VAT value in Box 7. Confirmed at gov.uk postponed VAT accounting guidance (fetched 2026-07-09).
7. **Late-submission points regime**: since January 2023, points-based penalties for quarterly filers (4 points = £200 fixed penalty + £200 per subsequent late submission).

---

## Flags

### F-91 (HP LOCK NEEDED — HIGH)

**VAT Notice 700/12 box definitions: live URL returned 404 (2026-07-09)**

During brief prep, the gov.uk URL for VAT Notice 700/12 ("How to fill in and submit your VAT Return") returned 404. Box definitions in this brief are drawn from training knowledge of the established post-Brexit 9-box layout. The NI-protocol status of Boxes 2, 8 and 9 (GB businesses = 0) is well-established post-Brexit but was not live-verified on 2026-07-09.

**Required action before publishing:**
- Writer must fetch the live VAT Notice 700/12 URL from gov.uk and verify all nine box definitions verbatim before authoring the page.
- If the box definitions differ from those in this brief, update the brief and the HP-lock extension.
- Try these URLs: `https://www.gov.uk/guidance/vat-how-to-fill-in-and-submit-your-vat-return`, or search gov.uk for "VAT700/12" or "fill in VAT return".
- If the page is genuinely missing or reorganised, use the HMRC VAT manuals (VIT) or HMRC's VAT returns technical guidance as the fallback source and cite the live URL found.

### F-92 (HP LOCK NEEDED — HIGH)

**VAT error correction thresholds (VAT Notice 700/45): live URL returned 404 (2026-07-09)**

During brief prep, gov.uk URLs for VAT Notice 700/45 ("How to correct VAT errors and make adjustments or claims") returned 404. The thresholds stated in this brief (£10,000 / 1% of Box 6 / £50,000 ceiling) are from training knowledge of established HMRC guidance. They may have been updated.

**Required action before publishing:**
- Writer must fetch the live VAT Notice 700/45 from gov.uk and verify: (a) the net value threshold below which a next-return adjustment is permitted; (b) the 1% of Box 6 test and whether it applies below or above £10,000; (c) the upper ceiling above which VAT652 is mandatory; (d) the VAT652 form reference and mailing address.
- Try: `https://www.gov.uk/guidance/vat-how-to-correct-vat-errors`, `https://www.gov.uk/vat-corrections`, or search gov.uk for "correct VAT errors 700/45".
- Update the brief and HP-lock extension with the verified figures before authoring.

---

## Verification log (this brief session, 2026-07-09)

| Item | URL attempted | Result |
|---|---|---|
| VAT return deadline | https://www.gov.uk/vat-returns | HTTP 200; "one calendar month and 7 days" confirmed |
| MTD all businesses April 2022 | HP §7 (pre-verified 2026-06-12) | Confirmed |
| PVA: Box 1, 4, 7 treatment | https://www.gov.uk/guidance/complete-your-vat-return-to-account-for-import-vat | HTTP 200; Box 1 (import VAT output), Box 4 (reclaim), Box 7 (net value) confirmed |
| VAT Notice 700/12 (box definitions) | Multiple URL attempts | All 404 — FLAG F-91 |
| VAT Notice 700/45 (error thresholds) | Multiple URL attempts | All 404 — FLAG F-92 |
| Competitor: crunch.co.uk/knowledge/vat-return-boxes-explained | Fetched | 404 — do not cite |
| Competitor: informi.co.uk/finance/what-is-a-vat-return... | Fetched | 404 — do not cite |
