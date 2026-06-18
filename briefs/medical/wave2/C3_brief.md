# Brief: gp-practice-income-pcse-statement-reconciliation

**Site:** medical (UK doctors / GPs / consultants)
**Wave/Cluster:** Wave 2, Cluster C (Other NHS and practice income), pick C3
**Source file (to be created):** `Medical/web/content/blog/gp-practice-income-pcse-statement-reconciliation.md`
**Live URL (when indexed):** https://www.medicalaccounts.co.uk/blog/gp-practice-income-pcse-statement-reconciliation
**Generated:** 2026-06-03
**Anchored to:** house_positions.md §3 (NHS GP contracts and practice income; core funding via the Global Sum weighted by Carr-Hill, plus QOF, enhanced services and PCN/ARRS; the GMS Statement of Financial Entitlements governs GMS; no single national per-patient value, figures uplift annually; partner income is profit share), with cross-refs to §1 (partner taxed on profit share) and a light §4 cross-ref for premises/notional-rent payments appearing on the statement.

---

## 1. Slug, category, H1, title

- **Target slug:** `gp-practice-income-pcse-statement-reconciliation`
- **Category:** GP Practice Management
- **Working H1:** Are You Actually Being Paid What You Are Owed? Reading and Reconciling Your PCSE Statements
- **Working title (frontmatter `title`):** Checking Your GP Practice Income: PCSE Statements and Reconciliation

## 2. Meta

- **metaTitle (target <=62 chars):** `Reading and Reconciling Your GP Practice PCSE Statements` = 55 characters. OK. (No em-dashes.)
  - Alternate: `GP Practice PCSE Statements: Reconciling What You Are Owed` = 57 characters. OK.
- **metaDescription (target <=158 chars):** `How to read your PCSE Online payment statements, reconcile them against the Statement of Financial Entitlements, and spot and recover practice underpayments.` = 155 characters. OK. (No em-dashes.)

## 3. Angle (2 to 3 sentences) + differentiation

**Angle.** A GP practice is paid for its NHS work through a monthly payment statement from PCSE (Primary Care Support England), and the amounts are set by the GMS Statement of Financial Entitlements and the practice's own contract, but the payments are not always right: Global Sum can be wrong if the list size or the Carr-Hill weighting is out of date, QOF and enhanced-services achievement can be paid late or short, and premises payments can drift. This page explains how to read the PCSE Online statement, how to reconcile it against what the practice should be owed under the Statement of Financial Entitlements, and how to spot, query and recover an underpayment. It stays at the reconciliation altitude: it does not re-explain how each funding stream is calculated (the Cluster A and B pages do that), it explains how to check the stream was actually paid.

**How this differs from existing pages and the two sibling picks.**
- Differs from `how-gms-funding-works-global-sum-carr-hill-explained` (Cluster A): that page explains how the Global Sum and Carr-Hill weighting are CALCULATED. This page assumes the reader knows roughly what they should be paid and shows them how to CHECK they were actually paid it, linking back to Cluster A for the calculation detail.
- Differs from `qof-income-gp-practice-accounting-explained` and `enhanced-services-gp-practice-income-tax` (Cluster A): those explain how QOF and enhanced-services income work and are accounted for. This page covers finding and verifying the QOF and enhanced-services lines on the statement.
- Differs from sibling C1 (`dispensing-practice-income-accounts-tax`): C1 explains dispensing income. This page covers reconciling the dispensing/reimbursement line on the statement (one of several lines to check), linking C1 for what the line should contain.
- Differs from sibling C2 (`gp-practice-private-non-nhs-income-streams`): C2 is private income, which does NOT come through PCSE at all. This page is explicitly about the NHS payments that DO come through PCSE. State that contrast (private income is not on the statement, so it needs its own controls).
- Differs from `gp-accounting-guide` / `gp-bookkeeping-guide-uk`: those are practice bookkeeping in general. This page is the specific discipline of reconciling NHS income to source, linking out for the bookkeeping.

## 4. Section-by-section outline (target 2,800 to 3,500 words)

- **H1: Are You Actually Being Paid What You Are Owed? Reading and Reconciling Your PCSE Statements**
- **H2: Where GP practice income comes from, and who pays it**
  - Set the scene: NHS GP income is paid centrally, not by patients. In England the payment statement is produced through PCSE Online (PCSE is Primary Care Support England, the organisation that administers primary care payments and services on behalf of NHS England), with the underlying entitlements set by the GMS Statement of Financial Entitlements (and the practice's PMS/APMS agreement where relevant) and the contract value set by the commissioner (the Integrated Care Board, ICB).
  - State the §3 framing: the practice's core funding is the Global Sum (weighted by Carr-Hill), plus QOF, enhanced services and PCN/Network Contract DES funding, plus premises payments; each appears on, or feeds, the statement. Link Cluster A/B for how each is calculated.
  - Make the contrast that defines the page: private and non-NHS income (C2) is collected by the practice directly and is NOT on the PCSE statement; this page is only about the NHS money that flows through PCSE.
- **H2: How to read your PCSE Online payment statement**
  - H3: Getting access. Statements are viewed on PCSE Online by users with the "GPP - Statements" role, assigned by the practice's PCSE Online user administrator. State the access route plainly so a partner or manager knows how to get sight of it.
  - H3: The format. Statements can be exported as PDF or CSV, and as an "expanded" (detailed, line-by-line) or "collapsed" (summary) statement. Recommend the expanded CSV for reconciliation because it can be opened in a spreadsheet and matched against expected amounts.
  - H3: The main lines to expect. Walk through the typical lines: the GMS/PMS/APMS contract value (which carries the Global Sum / capitation), QOF (aspiration and achievement), enhanced services and locally commissioned services, premises payments (notional/cost rent, link §4), seniority (where still relevant), dispensing reimbursement and fees (link C1), locum and parental-leave reimbursements, PCN-related payments where the practice is the nominated payee (link the PCN page), and any adjustments. Note that some lines (for example QOF) are processed as CQRS adjustments and appear on the PCSE statement even though they originate elsewhere.
  - H3: Reading the adjustments. Explain that the statement carries deductions and adjustments as well as payments (pension contributions, levies, contract variations, clawbacks), and that a "lower than expected" statement is often an adjustment, not an underpayment, so the adjustments must be read before concluding money is missing.
- **H2: Reconciling the statement against what you are owed**
  - H3: The principle. Reconciliation is matching each line on the statement against the amount the practice should receive under the Statement of Financial Entitlements and the practice's own contract and activity. Frame it as a routine monthly/quarterly discipline, not a one-off.
  - H3: Global Sum. Check the list size and the weighted (Carr-Hill) population used are current, because the Global Sum follows the registered and weighted list; a list that has grown but not been updated, or a stale weighting, understates the payment. Link `how-gms-funding-works-global-sum-carr-hill-explained` for the calculation.
  - H3: QOF. Check aspiration payments through the year and the achievement payment at year-end against the points the practice actually earned; QOF underpayments and late achievement payments are a common issue. Link `qof-income-gp-practice-accounting-explained`.
  - H3: Enhanced and locally commissioned services. Check that every service the practice signed up to and delivered has been claimed and paid; locally commissioned services are easy to under-claim because they are agreed with the ICB outside the core contract. Link `enhanced-services-gp-practice-income-tax`.
  - H3: Premises. Check notional rent (and cost rent / improvement grants where relevant) against the current District Valuer assessment; notional rent should be reviewed periodically and can lag a rent review, so the figure on the statement may be out of date. Keep it light and link `gp-surgery-notional-rent-vs-cost-rent-explained`; do NOT lock any rent figure (§4: property-specific, District-Valuer-assessed).
  - H3: Dispensing. For a dispensing practice, reconcile the reimbursement and dispensing-fee line against what was actually dispensed; link C1.
  - H3: PCN payments. Where the practice is the PCN's nominated payee, reconcile the PCN/Network Contract DES money received and distributed; link the PCN page.
  - Throughout: every expected amount depends on annually uplifted figures, so reconcile against the current Statement of Financial Entitlements, not last year's numbers (§3 hedging).
- **H2: Spotting and recovering an underpayment**
  - H3: How underpayments arise. List the common causes neutrally: a list-size or weighting update not flowing through, an enhanced service delivered but not claimed, a QOF achievement paid late or short, a contract variation not actioned by the commissioner, a premises figure not updated after a review, a seniority/reimbursement claim missed.
  - H3: The query process. Explain that payment queries are raised through PCSE: the practice submits a query via PCSE Online (or the GP Payments enquiries route), selecting the relevant payments query type, and can submit a follow-up enquiry on an existing case. Note PCSE publishes a payment-query guide for GP practices. State that some corrections require a contract variation actioned by the ICB/commissioner (PCSE administers; the ICB sets the contract value and variations), so the practice may need to push both.
  - H3: Underpayments and overpayments mechanics. Note that where a correction is agreed, an arrears/underpayment is typically picked up in a later contractual statement, and that overpayments are similarly recovered through later statements, so a correction shows up as an adjustment in a future month rather than a separate cheque. Frame neutrally and factually.
  - H3: Time and persistence. Make the practical point that recovery often takes follow-up and that keeping a clear record of expected vs received amounts (the reconciliation itself) is what makes a query land. Do not over-promise outcomes.
- **H2: Building reconciliation into the practice's routine**
  - Recommend a simple monthly/quarterly reconciliation owned by the practice manager or accountant: export the expanded statement, match each line to expected income, list variances, and chase them. Tie to the accounts: clean reconciliation feeds accurate trading profit, which feeds the partners' profit share (§1) and the year-end accounts (link `gp-accounting-guide`, `gp-bookkeeping-guide-uk`).
  - Note that this is also a year-end and partnership-fairness point: an unrecovered underpayment understates profit and therefore every partner's share.
- **H2: How we help practices reconcile NHS income** (light, non-salesy, anonymised; LeadForm auto-injects at the footer, do NOT add a form or CTA button here)
- **FAQ section** (frontmatter `faqs:`, see list below)

## 5. Exact HP positions, dates and verified anchors

**HP positions to use (anchor §3 unless noted):**
- Core GP funding is the Global Sum (weighted by Carr-Hill) plus QOF, enhanced services, PCN/Network Contract DES funding and premises; the GMS Statement of Financial Entitlements governs GMS entitlements (§3).
- There is no single national fixed per-patient value; figures are uplifted annually, reconcile against the current Statement of Financial Entitlements (§3 VERIFY framing).
- Partner income is profit share; an unrecovered underpayment understates profit and every partner's share (§3, §1).
- Premises payments (notional/cost rent) are property-specific and District-Valuer-assessed; do not lock a figure (§4, light cross-ref).
- Private/non-NHS income (C2) does not come through PCSE and needs its own controls (§3 boundary).

**DO NOT ASSERT FIXED FIGURES.** Do NOT state a Global Sum per-weighted-patient value, a QOF point value, an enhanced-service rate, a notional-rent figure or a seniority figure as a permanent fact. Frame all as "set in the current Statement of Financial Entitlements / agreed with the ICB and uplifted annually, confirm at source". Do NOT assert how much practices are typically underpaid.

**Statutory / authority anchors (verified URLs, 2026-06-03):**
- **PCSE (NHS England), Statements (GP payments)**, https://pcse.england.nhs.uk/help/gp-payments/statements
  - *Verified 2026-06-03 (fetched + search-confirmed):* confirmed monthly practice statements are viewed on PCSE Online by users with the "GPP - Statements" role; statements export as PDF or CSV in "expanded" (detailed) or "collapsed" (summary) form; the GMS/PMS/APMS contract value section carries the capitation/Global Sum; QOF adjustments are processed as CQRS adjustments and still appear on the PCSE Online statement. Primary anchor for the read-the-statement section.
- **PCSE (NHS England), Access your practice statements**, https://pcse.england.nhs.uk/gp-practices/managing-payments/access-your-practice-statements
  - *Verified 2026-06-03 (search-confirmed):* corroborates the access route and that statements are the single place to manage and view practice payments. Use for the access sub-section.
- **PCSE (NHS England), GP Payments enquiries (and the payment-query guide for GP practices)**, https://pcse.england.nhs.uk/contact-us/gp-payments-enquiries
  - *Verified 2026-06-03 (search-confirmed):* confirmed practices raise payment queries via PCSE Online by selecting the relevant payments query type and can use a Follow Up Enquiry Form for an existing case; PCSE publishes a "Contacting PCSE for Payment Queries: A Guide for GP Practices" PDF (https://pcse.england.nhs.uk/sites/default/files/2023-09/payment-query-guide-for-gp-practices-v1.pdf). Primary anchor for the query/recover section.
- **PCSE (NHS England), GP contract variations and adjustments**, https://pcse.england.nhs.uk/commissioners/managing-gp-payments/gp-contract-variations-and-adjustments
  - *Verified 2026-06-03 (search-confirmed):* confirmed adjustments to payment schedules are made via a contract variation uploaded to PCSE Online by the commissioner (ICB), included in the next payment run; cut-off timing applies. Use for the "some corrections need an ICB contract variation" point and the "adjustments appear in a later statement" mechanic.
- **PCSE (NHS England), GP Payments / Overpayments and underpayments**, https://pcse.england.nhs.uk/help/end-year-pensions/eoy-over-payments-under-payments
  - *Verified 2026-06-03 (search-confirmed):* confirmed underpayment arrears and overpayments are picked up through a later contractual statement rather than separately. Use for the recovery-mechanic line. **VERIFY:** writer should confirm the most current PCSE underpayment/overpayment help page at draft (PCSE reorganises these pages by end-year cycle).
- **GMS Statement of Financial Entitlements (Directions) + NHS England, Implementing the GP Contract**, https://www.england.nhs.uk/long-read/implementing-the-2025-26-gp-contract/
  - *Verified 2026-06-03 (HP §3, fetched at sibling brief):* the Statement of Financial Entitlements is the source-of-truth for GMS entitlements; the annual GP contract implementation long-read confirms the streams and their annual uplift. Use to anchor "reconcile against the current Statement of Financial Entitlements"; **VERIFY:** writer links the current-year SFE/contract document at draft and hedges all figures.

## 6. FAQ questions (writer drafts answers; target 12 to 14)

1. What is PCSE? (Answer: Primary Care Support England, which administers primary-care payments and services on behalf of NHS England.)
2. What is a PCSE payment statement? (Answer: the monthly statement of the practice's NHS payments, viewed on PCSE Online.)
3. How do I access my practice's PCSE statements? (Answer: PCSE Online, with the GPP - Statements role assigned by your user administrator.)
4. What income appears on the PCSE statement? (Answer: Global Sum/contract value, QOF, enhanced services, premises, dispensing, reimbursements, PCN payments where you are the payee, and adjustments.)
5. Does my private income appear on the PCSE statement? (Answer: no, private/non-NHS income is collected directly by the practice; link C2.)
6. What is the Statement of Financial Entitlements? (Answer: the directions that set GMS entitlements; the benchmark you reconcile against.)
7. How do I reconcile my Global Sum? (Answer: check the list size and Carr-Hill weighting are current; link Cluster A.)
8. Why might my QOF payment be wrong? (Answer: late or short achievement payments; check against the points actually earned; link Cluster A.)
9. How would I know if I have been underpaid? (Answer: by reconciling each statement line against expected income; common causes listed.)
10. How do I query an underpayment with PCSE? (Answer: raise a payments query via PCSE Online selecting the query type, with follow-up enquiries; some corrections need an ICB contract variation.)
11. How is an underpayment paid back? (Answer: arrears are usually picked up in a later contractual statement as an adjustment, not separately.)
12. How often should we reconcile the PCSE statement? (Answer: routinely, monthly or quarterly; it feeds accurate profit and every partner's share.)
13. Why does an underpayment matter for the partners? (Answer: it understates trading profit and therefore each partner's profit share.)
14. Where do I check what we should be paid? (Answer: the current Statement of Financial Entitlements and the practice's contract/ICB agreements; figures uplift annually.)

## 7. Internal links to propose (FLAT format `/blog/<slug>` only; all verified to exist or to be Cluster C siblings)

- `/blog/how-gms-funding-works-global-sum-carr-hill-explained` (Cluster A; how the Global Sum and Carr-Hill weighting are calculated)
- `/blog/qof-income-gp-practice-accounting-explained` (Cluster A; how QOF income works and is accounted for)
- `/blog/enhanced-services-gp-practice-income-tax` (Cluster A; enhanced and locally commissioned services)
- `/blog/dispensing-practice-income-accounts-tax` (sibling C1; the dispensing/reimbursement line on the statement)
- `/blog/gp-practice-private-non-nhs-income-streams` (sibling C2; private income is NOT on the PCSE statement)
- `/blog/pcn-funding-network-contract-des-explained` (Cluster B; PCN payments where the practice is the nominated payee)
- `/blog/gp-surgery-notional-rent-vs-cost-rent-explained` (premises payments on the statement)
- `/blog/gp-partnership-tax-complete-guide` (how the reconciled profit is taxed; profit share not drawings)
- `/blog/gp-accounting-guide` (where the NHS income lines sit in the accounts)
- `/blog/gp-bookkeeping-guide-uk` (recording NHS income and the reconciliation)
- Category index: `/blog/gp-practice-management`
- Static routes: `/for-gps`, `/contact`

(No invented slugs. Do NOT link Cluster D, E or F.)

## 8. Competitor-scope note

PCSE statement reconciliation and underpayment recovery are a recognised specialist-medical-accountant service (for example ramsaybrown.com, sandison-easson.co.uk, bw-medical.co.uk, larking-gowen.co.uk) and a frequent LMC/practice-manager topic. Match their grasp of the statement and the query route, then differentiate by giving a concrete line-by-line reconciliation method (export expanded CSV, match each line to the Statement of Financial Entitlements, list variances, chase via PCSE/ICB), by drawing the clean boundary that private income (C2) is not on the statement, and by tying recovered underpayments back to trading profit and the partners' profit share.

---

## Constraints reminder for the writer
No em-dashes (commas, parentheses, full stops, middle dots only). No pricing, no in-body CTA/form (LeadForm auto-injects at the footer). Anonymised proof only, no fabricated client names or statistics (do NOT claim a typical underpayment amount or recovery rate). Hedge every funding figure (Global Sum, QOF point value, enhanced-service rates, notional rent are set in the current Statement of Financial Entitlements / agreed with the ICB and uplifted annually, confirm at source); do NOT lock a notional-rent figure. Keep the calculation of each stream to one-line signposts and link Cluster A/B and C1 for the detail. Flat `/blog/<slug>` links only.
