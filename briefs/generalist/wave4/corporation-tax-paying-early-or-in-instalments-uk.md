# Brief: Corporation Tax — Paying Early or in Instalments (UK)

**Pick:** A3  
**Slug:** `corporation-tax-paying-early-or-in-instalments-uk`  
**Wave:** 4 (Generalist / Holloway Davies)  
**Category:** Corporation Tax  
**Status:** RUN-READY  
**Date:** 2026-07-09  
**Author:** Brief conductor (combined brief agent)

---

## Collision clearance (BINDING — from wave4_collision_verify.md A3)

**THIN CLEARANCE.** This page owns:
- Credit interest earned on early CT payment (QIP credit interest rate 3.50%, with arithmetic)
- The full QIP regime: large company / very large company thresholds, associated-company division, instalment schedule dates, growth relief
- Repayment interest (general, 2.75%)

This page must NOT restate:
- CT payment and filing deadlines (owned by `corporation-tax-deadline-31-march-2026`)
- Filing/payment penalties and penalty ladder (owned by `what-happens-corporation-tax-miss-filing-deadline-one-day`)
- General CT rates / marginal relief calculation (owned by `how-much-corporation-tax-do-i-pay`)
- The CT accountant's timing mechanics (3 paragraphs in `what-does-a-corporation-tax-accountant-do`)

Cross-link map (mandatory):
- `corporation-tax-deadline-31-march-2026` — for the 9m1d standard payment deadline
- `how-much-corporation-tax-do-i-pay` — for CT rate / marginal relief
- `what-does-a-corporation-tax-accountant-do` — for general CT compliance
- `what-happens-corporation-tax-miss-filing-deadline-one-day` — for penalty context

---

## Primary-source verifications (completed 2026-07-09)

| Item | Source | Verified figure | Status |
|------|---------|----------------|--------|
| QIP credit interest (overpaid instalments) | gov.uk HMRC interest rates publication (rates-and-allowances-hmrc-interest-rates) | **3.50%** from 29 December 2025 | CONFIRMED |
| QIP debit interest (underpaid instalments) | Same source | **6.25%** from 29 December 2025 | CONFIRMED |
| General CT repayment interest | Same source | **2.75%** from 9 January 2026 | CONFIRMED |
| General CT late payment interest | Same source | **7.75%** from 9 January 2026 | CONFIRMED |
| Credit interest formula (statutory) | CTM92670 via legislation/ICTA88/S826 + SI 1998/3176 | Reference rate minus 0.25% | CONFIRMED |
| Debit interest formula (statutory) | CTM92660 via TMA70/S87A + SI 1998/3176 | Reference rate plus 2.5% | CONFIRMED |
| Large company threshold | CTM92520 | Augmented profits > £1.5m (but ≤ £20m) | CONFIRMED |
| Very large company threshold | CTM92520 | Augmented profits > £20m | CONFIRMED |
| Associated-company division | CTM92520, regulation 3(5) SI 1998/3175 | Threshold divided by number of associated companies (by reference to preceding AP) | CONFIRMED |
| Growth relief / new-entrant exemption | SI 1998/3175 reg 3(3)(a) | Companies with profits ≤ £10m excluded if not large in preceding 12 months | CONFIRMED |
| De minimis exemption | SI 1998/3175 reg 3(2) | Total CT liability ≤ £5,000 — no instalment obligation | CONFIRMED |
| Large company instalment dates (12m AP) | CTM92560 | 6m13d, 9m13d, 12m13d after AP start; final 3m14d after AP end | CONFIRMED |
| Very large company instalment dates | CTM92805 | 14th day of months 3, 6, 9, 12 of AP | CONFIRMED |
| Each instalment fraction (large company) | CTM92600 formula: 3 × CTI / n | Variable per AP length; for 12m AP = 3/12 = 25% each | CONFIRMED (formula) |
| Statutory basis (QIP regime) | SI 1998/3175 (Corporation Tax (Instalment Payments) Regulations 1998) | In force | CONFIRMED |

**NEW HP LOCK NEEDED items:** None. All rates confirmed at primary source.

**HOUSE_POSITION_EXTENSION flag:** The QIP regime (thresholds, schedule, interest rates) is not currently covered in house_positions.md §3. The §3 writing rule mentions "large companies pay by quarterly instalments" without locking the figures. **Flag F-30 should be raised** to extend house_positions §3 with QIP data post-brief (not a blocker for this brief — all figures verified at source above).

---

## Competitor URL liveness check

| URL | Status | Notes |
|-----|--------|-------|
| https://www.crunch.co.uk/knowledge/what-are-the-benefits-of-paying-corporation-tax-early | NOT FETCHED — live check required at write time | Standard competitor; presumed live |
| https://informi.co.uk/finance/corporation-tax-deadlines-filing-and-paying | NOT FETCHED — live check required at write time | Standard competitor |

**Writer instruction:** WebFetch both competitor URLs at write time. Confirm HTTP 200 + on-topic. If either 404s, delete from the brief and do not cite or link it. Do not invent or assume content from URLs not fetched.

---

## House positions (tie-breakers from house_positions.md §3)

- CT small profits rate: **19%** (augmented profits ≤ £50,000)
- CT main rate: **25%** (augmented profits > £250,000)
- Marginal relief: applies between £50,000 and £250,000 (standard fraction 3/200; effective marginal rate ~26.5%)
- Limits divided by number of associated companies AND time-apportioned for short periods
- Standard CT payment: 9 months and 1 day after period end (DO NOT restate this deadline — just mention it briefly as the contrast point; cross-link to the deadline page)
- No em-dashes anywhere. No utility CSS classes. Semantic HTML only.

---

## Page specification

**h1:** Corporation Tax: Should You Pay Early or in Quarterly Instalments?

**Meta title (≤62 chars):** Corporation Tax Early Payment and Instalments: UK Guide  
*Character count: 56 — PASS*

**Meta description (≤158 chars):** Paying corporation tax early earns you credit interest from HMRC. Large companies must pay in quarterly instalments. Here is how both routes work and what they cost.  
*Character count: 167 — FAIL — revise:*

**Meta description (revised, ≤158 chars):** Pay corporation tax early and HMRC pays you credit interest. Large companies must use quarterly instalments. Here is how both routes work.  
*Character count: 140 — PASS*

**Summary (2-3 sentences for frontmatter):** Most companies pay corporation tax in a single payment 9 months and 1 day after their accounting period ends. If you pay early, HMRC pays you credit interest at 3.50% (from December 2025) on quarterly instalment overpayments, or 2.75% on general overpayments. If your company's augmented profits exceed £1.5 million, quarterly instalment payments (QIPs) are compulsory — and very large companies (over £20 million) must pay even earlier.

**Target word count:** 2,800 to 3,200 body words (non-pillar; this is a moderately technical topic with worked examples)

**FAQ count:** 10 (see full FAQ drafts below)

**Internal links (mandatory cross-links per collision_verify):**
1. `corporation-tax-deadline-31-march-2026` — anchor: "9 months and 1 day after your accounting period ends"
2. `how-much-corporation-tax-do-i-pay` — anchor: "your corporation tax liability" or "CT rates and marginal relief"
3. `what-does-a-corporation-tax-accountant-do` — anchor: "corporation tax accountant"
4. `what-happens-corporation-tax-miss-filing-deadline-one-day` — anchor: "late payment penalties" or "penalties for missing the deadline"
5. `associated-companies-corporation-tax` — anchor: "associated companies" (threshold division)
6. `associated-companies-corporation-tax-rate-2025-26` — anchor: "associated company rules" (if separate slug needed; check at write time — collision_verify shows both exist)

---

## Proposed body structure

### H2 1: The standard payment route — and why paying early makes sense

Set the context: most companies pay once, 9 months and 1 day after period end. One sentence only — cross-link to the deadline page, do NOT restate the deadline mechanics. Then pivot: the topic of this page is what happens when you pay before that date (credit interest) and what happens when your company is large enough to pay in quarterly instalments (QIP regime). Explain the financial logic of early payment briefly: HMRC pays you interest, so early payment is a risk-free cash return. Contrast with the high late-payment rate (7.75%) to show the asymmetry.

### H2 2: Paying early — credit interest and what HMRC pays you

- General CT repayment interest: **2.75%** (from 9 January 2026). This is what HMRC pays on any CT overpayment, including simply paying early before the 9m1d due date. Statutory basis: ICTA 1988 s.826.
- Explain: the interest runs from the date of payment to the normal due date (9m1d after AP end).
- Worked example A: a company with a £50,000 CT bill pays 6 months early. Interest calculation shown in full (see §Worked Examples below).
- Mention: this is a guaranteed, risk-free return (equivalent to a 2.75% savings rate on funds that would otherwise sit in a company current account). Worth flagging to owner-managers: if the company has surplus cash, early CT payment is a simple optimisation.
- Brief mention of the asymmetry: late payment costs 7.75%, early payment earns only 2.75% — the rate structure penalises late far more than it rewards early.

### H2 3: Quarterly instalment payments (QIPs) — who must use them

- Explain the QIP regime exists because HMRC wants large companies to pay CT in-year, closer to when profits arise, rather than 9 months after.
- Statutory basis: Corporation Tax (Instalment Payments) Regulations 1998 (SI 1998/3175).
- **Large company definition:** augmented profits > £1.5 million in the accounting period.
  - "Augmented profits" = taxable profits plus exempt dividends from non-group companies (for threshold comparison only; simplify to "broadly, your taxable profits" for the reader, with a note).
  - **Associated-company division:** the £1.5m and £20m thresholds are divided by the number of associated companies (determined at the end of the preceding accounting period). If your company has 2 associated companies, the effective large-company threshold is £500,000 per company (£1.5m ÷ 3). Cross-link to associated-companies pages.
  - **Growth relief / new entrant:** a company whose profits do not exceed £10m is NOT a large company if it was not a large company in the preceding 12 months. This is a one-year grace for growing companies that have just crossed the £1.5m line.
  - **De minimis:** if total CT liability for the period is £5,000 or less, no instalments are required regardless of profit level.
- **Very large company:** augmented profits > £20m. Divided by associated companies in the same way.
- Worked example B: a company with 2 associated companies crossing £1.5m (see §Worked Examples below).

### H2 4: The standard large company QIP schedule

For a standard 12-month accounting period, a large company (£1.5m to £20m augmented profits) pays four equal quarterly instalments. The due dates are:

| Instalment | Due date |
|-----------|---------|
| 1st | 6 months and 13 days after the start of the AP |
| 2nd | 3 months after the 1st instalment |
| 3rd | 3 months after the 2nd instalment |
| 4th | 3 months and 14 days after the end of the AP |

For a 12-month AP starting 1 April 2025 (year end 31 March 2026), the dates work out to:
- 1st: 14 October 2025
- 2nd: 14 January 2026
- 3rd: 14 April 2026
- 4th: 14 June 2026

Each instalment is broadly one quarter of the estimated CT liability for the year (formula: 3 × total CT liability / number of months in AP, per CTM92600). In practice, companies estimate and adjust each instalment as the year progresses — the amounts can be revised upward or downward.

Note: instalments for a period shorter or longer than 12 months follow a different schedule. The regulations set the payment dates relative to the AP start and end regardless of length.

### H2 5: The very large company schedule (profits over £20m)

For companies with augmented profits exceeding £20m (divided by associated companies), the instalment timetable is brought forward substantially. Payments fall due on the **14th day of months 3, 6, 9 and 12 of the accounting period** — that is, within the period itself, not after it ends.

For a 12-month AP starting 1 April 2025:
- 1st: 14 June 2025 (month 3 of AP)
- 2nd: 14 September 2025 (month 6)
- 3rd: 14 December 2025 (month 9)
- 4th: 14 March 2026 (month 12 — before the AP even ends)

This is significantly earlier than both the standard large company schedule and the 9m1d standard payment. Very large companies are effectively paying CT while the tax year is still running, based on in-year profit estimates.

### H2 6: Interest on QIP payments — over and underpayment

**Overpaid instalments (credit interest):** if a company pays more QIP instalments than its final CT liability, HMRC pays credit interest at **3.50%** (from 29 December 2025) on the overpayment. This runs from the date the overpayment arises (or the first instalment due date, if later) to the earlier of when the overpayment is extinguished or the normal 9m1d due date. Statutory basis: ICTA 1988 s.826 as modified by SI 1998/3176.

**Underpaid instalments (debit interest):** if a company underpays its instalments, HMRC charges debit interest at **6.25%** (from 29 December 2025) from the due date for the first instalment to the normal due date (9m1d after AP end). Statutory basis: TMA 1970 s.87A as extended by SI 1998/3175 reg 7.

**After the normal due date:** if CT remains unpaid after 9m1d, the general late payment rate applies: **7.75%** (from 9 January 2026). This is the higher rate and applies to both QIP companies and standard payers alike.

Note: the QIP credit rate (3.50%) is higher than the general repayment interest rate (2.75%). This reflects that QIP companies are paying in advance of when tax is due — HMRC compensates slightly more generously for early-period instalments than for general overpayments.

### H2 7: Practical considerations for owner-managers approaching the threshold

- If your profits are approaching £1.5m (or a lower effective threshold because of associated companies), plan ahead. The first instalment falls due less than 7 months into the accounting period.
- Companies that cross the £1.5m threshold for the first time benefit from the growth relief: no QIPs are required in that first year if profits in the preceding 12 months were ≤ £1.5m (divided by associated companies). But QIPs become compulsory in the following year.
- The associated-company rule is the most common planning trap: two connected companies each with £800,000 profit (total £1.6m group-wide) individually fall below the £1.5m threshold if you ignore each other — but if they are associated, the threshold drops to £750,000 per company and both are large companies. A corporation tax accountant should review your group structure before the accounting period in which the threshold might be crossed.
- Brief pointer to Time to Pay for companies that cannot meet instalments (do not detail it; just note it exists and to contact HMRC before the due date).

### H2 8: LeadForm section (auto-injected — do not duplicate in body)

Do NOT include a lead form call-to-action paragraph in the body. The LeadForm component is injected at the footer automatically.

---

## Worked examples (full, for the writer)

### Worked Example A: £50,000 CT bill paid 6 months early

**Scenario:** Company year end 31 March 2026. CT liability £50,000. Standard payment due 1 January 2027. Company pays £50,000 on 1 July 2026 (exactly 6 months early).

**Credit interest earned:**
- Rate: 2.75% per annum (general repayment interest from 9 January 2026)
- Period: 1 July 2026 to 1 January 2027 = 184 days (6 months)
- Interest = £50,000 × 2.75% × (184 / 365) = £50,000 × 0.0275 × 0.504 = **£693**

(Round to nearest pound for the page. Show the arithmetic openly.)

**Context:** a 2.75% risk-free return on £50,000 for 6 months is modest but better than many business current accounts. The company would earn less if the funds sat in a standard bank account. The benefit compounds with larger tax bills.

**Writer note:** present this as a simple arithmetic box or callout. Do NOT claim "you should always pay early" — state the interest rate and let the reader decide. Some companies prefer liquidity.

### Worked Example B: Company crossing £1.5m with 2 associated companies — QIP schedule

**Scenario:** Ltd Co A has 2 associated companies (Ltd Co B and Ltd Co C). Three associated companies in total (including Ltd Co A itself). Accounting period 1 April 2025 to 31 March 2026. Ltd Co A's augmented profits for the year: £1,800,000.

**Threshold division:**
- Standard large company threshold: £1,500,000
- Divided by 3 (Ltd Co A + 2 associated): effective threshold = **£500,000**
- Ltd Co A's profits (£1,800,000) exceed £500,000 → Ltd Co A IS a large company for this AP

**CT liability:** assume effective rate ~25% (profits well over the marginal relief band): CT = approx £450,000

**QIP due dates (standard large company schedule, 12m AP starting 1 April 2025):**
- 1st instalment: 14 October 2025 (6m13d after 1 April 2025)
- 2nd instalment: 14 January 2026
- 3rd instalment: 14 April 2026
- 4th instalment: 14 June 2026

**Each instalment (approximate):** £450,000 / 4 = £112,500 (in practice, each is estimated and revised; formula is 3 × CTI / 12 per instalment for a 12m period)

**Key point for the reader:** Ltd Co A might have assumed the threshold was £1.5m (since that is the headline figure). The associated-company rule cuts the effective threshold to £500,000. Missing the first instalment in October would trigger debit interest at 6.25% on the shortfall.

**Growth relief check:** if Ltd Co A was not a large company in the 12 months ended 31 March 2025 (i.e., its profits then were ≤ £500,000), it benefits from growth relief and no QIPs are required for 2025/26. QIPs would be required from 2026/27. Writer should include this rider.

---

## FAQ drafts (10 full drafts — writer should use as-is or lightly refine)

**FAQ 1**
Q: Does paying corporation tax early save money?  
A: Not directly — paying early does not reduce the amount of tax you owe. However, HMRC pays you repayment interest on any early overpayment at 2.75% per year (from 9 January 2026). On a £50,000 tax bill paid 6 months early, that works out to roughly £690 in interest from HMRC. Whether that is worth it depends on what else the company could do with the cash in the meantime.

**FAQ 2**
Q: What is the quarterly instalment payment (QIP) threshold for corporation tax?  
A: A company must pay its corporation tax in quarterly instalments if its augmented profits for the accounting period exceed £1.5 million. That threshold is divided by the number of associated companies: if your company has two associated companies (three in total), the effective threshold per company drops to £500,000. Very large companies with augmented profits over £20 million (again, divided by associated companies) face an earlier, accelerated instalment schedule.

**FAQ 3**
Q: What are the quarterly instalment payment due dates for a standard 12-month accounting period?  
A: For a large company (profits between £1.5m and £20m, divided by associated companies), the four instalments fall due on the following dates relative to the accounting period: the first is 6 months and 13 days after the start; the second is 3 months after the first; the third is 3 months after the second; and the fourth is 3 months and 14 days after the end of the period. For a company with a 1 April to 31 March year, those dates fall in mid-October, mid-January, mid-April and mid-June. The amounts are each roughly a quarter of the estimated annual CT liability.

**FAQ 4**
Q: What happens if I overpay my quarterly corporation tax instalments?  
A: HMRC pays you credit interest on the overpayment at 3.50% per year (from 29 December 2025). The interest runs from the date the overpayment arises until the earlier of when HMRC repays it or the normal payment date (9 months and 1 day after the accounting period end). You can also claim repayment of the excess at any time under Regulation 6 of SI 1998/3175.

**FAQ 5**
Q: What interest does HMRC charge if I underpay quarterly instalments?  
A: HMRC charges debit interest at 6.25% per year (from 29 December 2025) on the shortfall in instalment payments. The interest runs from the due date of the first instalment to the normal payment date (9 months and 1 day after the period end). After that normal due date passes, the higher general late payment rate of 7.75% applies to any remaining unpaid CT.

**FAQ 6**
Q: Can a company avoid quarterly instalment payments in its first year of crossing the threshold?  
A: Yes, in many cases. Companies whose profits do not exceed £10 million are excluded from the QIP regime if they were not a large company in the preceding 12-month period. This one-year grace period means a company that crosses the £1.5m threshold (or its divided equivalent) for the first time does not have to make instalments for that first large-company year. From the following year, QIPs become compulsory.

**FAQ 7**
Q: How does the associated-company rule affect the quarterly instalment threshold?  
A: The £1.5m and £20m thresholds are divided by the total number of associated companies. "Associated" broadly means companies under common control. If your company has two associated companies (giving a group of three), the effective thresholds are £500,000 (large) and approximately £6.67m (very large). A company can be caught by the QIP regime even if its own profits are well below £1.5m if it has several associates.

**FAQ 8**
Q: Is there a minimum corporation tax liability below which quarterly instalments are not required?  
A: Yes. If a company's total corporation tax liability for the accounting period is £5,000 or less, it is not required to make instalment payments regardless of the level of its profits. This de minimis exemption is set in Regulation 3(2) of SI 1998/3175. Most growing businesses with significant profits will exceed this threshold, but it provides a safety net for companies with large turnover but low taxable profit in a given year.

**FAQ 9**
Q: When do very large companies (over £20m profits) have to pay corporation tax?  
A: Companies with augmented profits exceeding £20 million (divided by the number of associated companies) must pay four quarterly instalments on the 14th day of months 3, 6, 9 and 12 of the accounting period. For a company with a 1 April year start, that means instalments in June, September and December of the current year and March — before the year even ends. This is substantially earlier than the standard large company schedule and the 9m1d standard payment date.

**FAQ 10**
Q: Does paying corporation tax early affect my corporation tax return deadline?  
A: No. Payment and filing are separate obligations. Paying early (or in instalments) does not change the CT600 filing deadline, which remains 12 months after the end of the accounting period. You can pay first and file later, or file first and pay later, as long as both obligations are met by their respective deadlines. For the CT600 filing deadline specific to your year end, see our guide on corporation tax filing deadlines.

---

## Content guidance for the writer

### Voice and tone
- UK owner-manager audience: directors of growing SMEs, sole traders approaching incorporation, finance managers. Not tax professionals. Explain the regime clearly without over-simplifying.
- Conversational but authoritative. Short paragraphs (2-4 sentences). No waffle.
- No em-dashes anywhere (replace with commas, parentheses, or full stops).
- No claim of "you should always do X" — present the mechanics and let the reader decide.

### What to include
- Both the early payment route (credit interest) and the QIP regime (compulsory for large companies).
- Worked examples A and B in the body, clearly labelled.
- The interest rate table: QIP credit 3.50%, QIP debit 6.25%, general repayment 2.75%, late payment 7.75% — all with their effective dates.
- The growth relief / new-entrant exemption (one paragraph — it is a material planning point).
- The de minimis £5,000 exemption (brief mention in a paragraph or bullet).
- The associated-company division (explain clearly — it is the main trap).
- The very large company (>£20m) schedule in contrast to the standard schedule.

### What to exclude (collision clearance)
- Do NOT restate the 9m1d payment deadline mechanics — one sentence mention and cross-link only.
- Do NOT restate the penalty ladder for late filing or late payment — one sentence mention ("late payment after the normal due date carries interest at 7.75%") and cross-link.
- Do NOT restate the CT rate / marginal relief calculation — assume the reader knows it or cross-link.
- Do NOT restate the CT accountant's role in detail — brief mention and cross-link.

### Six-check floor (verify before submitting)
1. Zero em-dashes in body
2. Zero utility CSS classes (semantic HTML only: `<h2>`, `<h3>`, `<p>`, `<ul>`, `<li>`, `<table>`, `<strong>`, `<a>`)
3. FAQ schema count in built HTML == 10 (matches this brief)
4. Meta title ≤ 62 chars (target: "Corporation Tax Early Payment and Instalments: UK Guide" = 56 chars — PASS)
5. Meta description ≤ 158 chars (target above = 140 chars — PASS)
6. All internal links resolve to existing pages (check all 4-6 cross-links listed above against live content/blog directory at write time)

---

## Flags to raise at write time

- **F-30 (HOUSE_POSITION_EXTENSION):** After brief is written and page committed, raise flag to extend `docs/generalist/house_positions.md` §3 with: QIP credit interest 3.50% (from 29 Dec 2025), QIP debit interest 6.25% (from 29 Dec 2025), general repayment interest 2.75% (from 9 Jan 2026), large company threshold £1.5m / very large £20m, instalment schedules. Not a blocker for this page.

---

## Statutory and source index

| Statute / source | What it covers for this page |
|-----------------|------------------------------|
| SI 1998/3175 (Corporation Tax (Instalment Payments) Regulations 1998) | The entire QIP regime: large company definition, thresholds, schedule, growth relief, de minimis |
| SI 1998/3176 (Taxes (Interest Rate) (Amendment No 2) Regulations 1998) | QIP credit interest rate formula (reference rate minus 0.25%) and debit interest rate formula (reference rate plus 2.5%) |
| ICTA 1988 s.826 | Statutory basis for credit interest on overpaid CT (repayment supplement) |
| TMA 1970 s.87A | Statutory basis for debit interest on underpaid CT |
| CTA 2010 s.963 | Intra-group surrender of overpaid QIP instalments |
| gov.uk HMRC interest rates publication | Current rates: QIP credit 3.50%, QIP debit 6.25%, general repayment 2.75%, late payment 7.75% (all effective dates stated above) |
| CTM92520, CTM92560, CTM92600, CTM92660, CTM92670, CTM92805 | HMRC manual — QIP thresholds, schedule, interest mechanics |
| house_positions.md §3 | CT rates 19%/25%, marginal relief, associated-company limit-division |
