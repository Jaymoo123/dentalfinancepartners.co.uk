---
title: "EPOS Reconciliation for Hospitality: Matching Till Takings to Bank and Books"
slug: "epos-reconciliation-hospitality"
date: "2026-07-15"
author: ""
category: "Hospitality Accounts"
metaTitle: "EPOS Reconciliation for Hospitality: Till Takings to Bank"
metaDescription: "A step-by-step guide to reconciling daily EPOS takings to your bank, cards, cash and delivery-app payouts, and splitting them correctly for VAT."
h1: "EPOS Reconciliation for Hospitality: Matching Till Takings to Bank and Books"
summary: "How to reconcile daily EPOS takings to card settlements, cash banked and delivery-app payouts, then post the split correctly for VAT and your accounts."
keyTakeaways:
  - "The Z-read gross figure is your starting point; every pound must be traced to a settlement type before you can close the day."
  - "Card settlements typically arrive 1 to 3 working days after the sale; that timing gap is the single most common source of apparent discrepancies."
  - "Delivery-app payouts are net of commission; the gross sale value is your turnover and the commission is a cost, not a reduction of income."
  - "Tips and service charge paid over via an independent tronc are not turnover; employer-controlled tips must go through payroll."
  - "Daily EPOS takings are not a single VAT rate; the Z-read must be split by VAT liability before posting to your accounting software."
faqs:
  - question: "What is EPOS reconciliation?"
    answer: "EPOS reconciliation is the process of matching the gross takings shown on your electronic point-of-sale system's daily Z-read to the amounts that actually reach your bank account: card settlements, cash banked and delivery-app payouts. The reconciled figure is then split by VAT rate and posted to your accounting software."
  - question: "Why do my card takings not match my bank?"
    answer: "Card settlements reach your bank account 1 to 3 working days after the transaction, depending on your card acquirer. The Z-read records the sale on the day it happened; the bank records the receipt on the day funds arrive. These are different days. Match each day's card total to the settlement report from your acquirer, not to the same-day bank statement."
  - question: "How often should I reconcile the till?"
    answer: "Daily, without exception. A variance left unexplained for a week is harder to trace and can compound across multiple trading days. A daily reconciliation catches timing differences, voids and errors while the detail is still fresh."
  - question: "Are delivery-app sales my turnover or just the payout?"
    answer: "Your turnover is the gross sale value shown on the app statement, not the payout you receive. The delivery platform deducts its commission before remitting; that commission is a cost to your business, not a reduction in your income. Posting only the net payout understates turnover and distorts your VAT return."
  - question: "Do tips through the till count as sales?"
    answer: "Tips and service charge paid over via a genuinely independent tronc are not the business's turnover and should be separated from sales. Tips collected and distributed by the employer must go through payroll and are employment income. See <a href='https://www.gov.uk/tips-at-work'>GOV.UK tips guidance</a> and the tronc-specific position below."
  - question: "How do I split daily takings by VAT rate?"
    answer: "Your EPOS should categorise sales at the point of entry (eat-in at 20%, qualifying cold takeaway at 0%, and so on). Export the VAT breakdown from the system and cross-check it against the Z-read total. Where the system does not provide a breakdown, use your sales mix data to apportion. Use the <a href='/calculators/food-drink-vat-rate-checker'>VAT rate checker</a> for borderline items."
  - question: "What is a Z-read?"
    answer: "A Z-read is the end-of-trading report your EPOS system generates when you close the till at the end of a session. It resets the running sales totals to zero and records the cumulative figures for that period: gross takings, payment types, voids, refunds and tip amounts. It is your primary record for reconciliation."
  - question: "Should I reconcile takings under the Flat Rate Scheme?"
    answer: "Yes. Under the <a href='https://www.gov.uk/hmrc-internal-manuals/vat-flat-rate-scheme/frs7300'>Flat Rate Scheme</a>, you apply your sector rate to gross VAT-inclusive turnover, not to the VAT-exclusive figure. The daily reconciliation still needs to identify total gross takings accurately, even though you do not split the VAT rate for return purposes under FRS. The sector rate you use must match your tradescode (catering 12.5%, pubs 6.5%, hotels/accommodation 10.5%), not your own description of the business."
---
<p>EPOS reconciliation means tying each day's till takings (the Z-read gross) to what actually reaches the bank: card settlements, cash banked, and delivery-app payouts net of commission. The reconciled figure is then split by VAT rate and posted to your accounting software. Do it daily. The break points are card-settlement timing, aggregator commission, tips and refunds, and they compound quickly when left.</p>

<h2>Why reconciling takings matters</h2>

<p>An unreconciled till is not a minor administrative inconvenience. It quietly corrupts three numbers that drive every financial decision the business makes.</p>

<p><strong>VAT accuracy.</strong> Your VAT return is calculated from your actual takings, split by rate. If your posted income figure is wrong because you have been booking the net delivery-app payout instead of the gross sale, or absorbing tips into sales, your output VAT is wrong. HMRC's entitlement does not move with your posting errors.</p>

<p><strong>Gross profit.</strong> GP% is revenue minus cost of goods. If revenue is understated by unposted card settlements or overstated by tips incorrectly included in sales, your GP% is fiction. The <a href='/blog/hospitality-accounts/gross-profit-menu-pricing'>menu pricing and GP% guide</a> explains how to use the number once it is clean; that calculation only works if the takings figure underneath it is accurate.</p>

<p><strong>Fraud and theft detection.</strong> A daily reconciliation is the simplest and most effective control against till fraud. A regular small variance that no one investigates is the clearest signal that something is wrong. A business that reconciles once a month discovers the problem a month later.</p>

<p><strong>MTD-ready books.</strong> Sole-trader operators with self-employment and property income over £50,000 must use MTD-compatible software and submit quarterly updates to HMRC from <a href='https://www.gov.uk/guidance/sign-up-your-client-for-making-tax-digital-for-income-tax'>6 April 2026</a>. The £30,000 threshold follows from 6 April 2027 and £20,000 from 6 April 2028. Quarterly reporting is only accurate if the underlying daily postings are correct.</p>

<h2>The building blocks of a daily EPOS reconciliation</h2>

<p>Before running the procedure, you need to know what each component is and where the data comes from.</p>

<p><strong>Z-read gross takings.</strong> The Z-read is your EPOS system's end-of-session report. It resets the running total to zero and records cumulative gross takings, broken down by payment type, plus any voids, refunds and tip amounts. It is your primary source document; every other figure traces back to it.</p>

<p><strong>Payment-type split.</strong> A well-configured EPOS system records every transaction by tender type: card (further split by provider if needed), cash, account/house account, vouchers and redemptions, and delivery-app sales. The totals by type must reconcile to the gross Z-read figure before you do anything else.</p>

<p><strong>Card settlement reports.</strong> Your card acquirer (the payment processing company, not the card network) sends a settlement report for each batch. The settlement lands in your bank account 1 to 3 working days after the transaction date, depending on your acquirer's terms. Check your specific acquirer; do not assume same-day or next-day settlement.</p>

<p><strong>Cash banked.</strong> The cash figure from the Z-read, less the float you carry forward to the next trading day, should equal the amount physically banked. Any shortfall is a till shortage; any excess is an overage. Both need to be investigated and recorded.</p>

<p><strong>Delivery-app payouts.</strong> Platforms such as delivery aggregators deduct their commission before remitting. Your bank receives the net payout. Your accounting records must show the gross sale as turnover and the commission as a cost. Post only the net payout and you misstate both income and expenses.</p>

<p><strong>Tips, service charge and tronc.</strong> Tips collected via the till and paid over through an independently run tronc scheme are not the business's income and must be separated from sales. The troncmaster must genuinely control the allocation; any employer involvement in deciding who receives what destroys the <a href='https://www.gov.uk/hmrc-internal-manuals/national-insurance-manual/nim02922'>NIC exemption</a>. Income tax via PAYE still applies to tronc receipts. Tips collected and distributed by the employer are employment income and must go through payroll. Under the <a href='https://www.legislation.gov.uk/ukpga/2023/13/contents'>Employment (Allocation of Tips) Act 2023</a>, in force since 1 October 2024, 100% of qualifying tips must reach workers, you must have a written tips policy, and you must keep allocation records. Tips of any kind cannot count toward the <a href='https://www.gov.uk/national-minimum-wage-rates'>National Living Wage</a> (£12.71 for workers aged 21 and over from 6 April 2026). See <a href='/services/tronc-scheme-setup'>tronc scheme setup</a> if you are restructuring how tips flow.</p>

<p><strong>Refunds and voids.</strong> Voids are cancelled before the transaction completes; refunds are reversals of completed sales. Both must appear in the Z-read, and both reduce gross takings. They need their own line in the reconciliation so you can confirm the card reversal has also landed correctly.</p>

<h2>The daily reconciliation procedure, step by step</h2>

<ol>
  <li><strong>Print or export the daily Z-read and note gross takings.</strong> This is your control total. Every step below accounts for a slice of this figure. Do not proceed until you have the Z-read in hand.</li>
  <li><strong>Split takings by payment type.</strong> Confirm that the sum of cash + card + delivery-app + vouchers + account sales equals the Z-read gross. If it does not, there is a data-entry error or a system configuration gap to fix before going further.</li>
  <li><strong>Match the card total to your acquirer's settlement report.</strong> Note that the settlement lands in your bank 1 to 3 working days later; match the Z-read card figure to the settlement report for that trading day, not to the same-day bank balance. Keep a running settlement log if you process high volumes.</li>
  <li><strong>Match delivery-app sales to the app statement.</strong> The payout you receive is net of the platform's commission. Confirm the gross sale figure (your turnover) against the app's transaction report and record the commission separately as a cost. Do not state the commission rate as a fixed figure; check your current platform agreement, as rates change.</li>
  <li><strong>Confirm cash banked equals cash takings less float and variances.</strong> Count the till, deduct the next-day float, and confirm the banking slip matches. Record any overage or shortage with a note on the likely cause. A pattern of small shortages needs investigation.</li>
  <li><strong>Separate tips and service charge from sales.</strong> If tips go via an independent tronc, they are not your turnover; strip them out before posting sales. If they go through your payroll, they are employment income and must not be mixed into sales figures. Either way, tips are not VAT-able income of the business and must not be included in your VAT return output.</li>
  <li><strong>Split the sales figure by VAT rate for the return.</strong> Your EPOS VAT report is the starting point. Check the categorisation against the nature of each sale: eat-in food and hot food are standard-rated at 20%; qualifying cold takeaway food is zero-rated; alcohol is always standard-rated; soft drinks, confectionery and savoury snacks are standard-rated. Use the <a href='/calculators/food-drink-vat-rate-checker'>VAT rate checker</a> for borderline items and link the relevant HMRC notice rather than relying on the system default.</li>
  <li><strong>Post the reconciled daily-takings journal to your accounting software.</strong> Post the gross takings split by VAT rate, the commission costs from delivery platforms, and any tips separately. Use a suspense account for card settlements awaiting bank clearance so your accounts remain in balance while timing differences resolve.</li>
  <li><strong>Investigate any variance the same day.</strong> A variance left to the end of the week is harder to trace. Common causes are: card transactions the acquirer has not yet batched, a void processed after the Z-read, cash removed for petty cash without a record, or a delivery-app sale not yet showing on the app statement. Document the reason; do not just adjust the figure without an audit trail.</li>
</ol>

<h2>The five break points and how to fix each</h2>

<p>The same five issues cause most EPOS reconciliation failures. Recognising the pattern is faster than investigating each variance from scratch.</p>

<h3>1. Card settlement timing lag</h3>
<p>The most common source of apparent discrepancies. Your Z-read records the sale on the trading day; your bank records the credit when the acquirer settles, which is typically 1 to 3 working days later depending on your acquirer. Fix: maintain a separate card settlement log keyed to the trading date, not the bank date. Never compare the Z-read card total to the same-day bank statement; compare it to the acquirer's settlement report for that trading day.</p>

<h3>2. Aggregator commission netting</h3>
<p>Delivery platforms pay out net of their commission. Booking only the payout understates turnover and removes an allowable cost. Fix: pull the gross sales figure from the app's own reporting portal and reconcile the commission deducted. Post gross takings to your sales account and the commission to a platform cost account. The gross sale is what happened; the commission is what it cost you to process that sale.</p>

<h3>3. Tips and service charge through the till</h3>
<p>Tips that flow via an independent tronc are not the business's income. If they appear in the Z-read total (because the customer added them to the card payment), they need to be stripped out before you post to sales. If your tronc is not genuinely independent, the NIC exemption does not apply and the amounts must go through payroll. Fix: configure your EPOS to track tips as a separate tender category so they never enter the sales total automatically. Visit <a href='/services/tronc-scheme-setup'>tronc scheme setup</a> if you are not sure whether your current arrangement qualifies.</p>

<h3>4. Refunds and voids</h3>
<p>A void cancels the original transaction before it completes; a refund reverses a completed sale. Both reduce gross takings on the Z-read. A card refund also needs to match a reversal entry from your acquirer. Fix: reconcile voids and refunds as a separate line in your daily reconciliation. Confirm the card reversal will land against the same acquirer batch. An unusually high void rate on a particular shift merits investigation.</p>

<h3>5. Service charge treatment</h3>
<p>A discretionary service charge added to a bill and passed in full to staff (via tronc or tip) is not the business's income. A mandatory service charge retained by the business is income and is subject to VAT at the rate of the supply it relates to. Fix: decide at set-up which model you operate and configure your EPOS and accounting categories to match. Under the Tips Act 2023, all qualifying tips and discretionary service charges must reach workers; a mandatory service charge retained by the business is a separate question.</p>

<h2>Splitting takings by VAT rate</h2>

<p>The gross Z-read figure is not a single VAT rate. A hospitality business selling eat-in meals, cold takeaway items, soft drinks, alcohol and hot food is trading across multiple VAT liabilities simultaneously, and the HMRC VAT return requires each to be accounted for separately.</p>

<p>The key rules are:</p>
<ul>
  <li>Food consumed on the premises is catering and standard-rated at 20%, regardless of whether it is hot or cold.</li>
  <li>Hot food is standard-rated, determined by five tests: intentionally heated for consumption, heated to order, kept hot after cooking, supplied in heat-retentive packaging, or advertised as a hot supply.</li>
  <li>Cold food for takeaway is generally zero-rated, subject to four carve-outs: confectionery, crisps and savoury snacks, soft drinks, and alcohol are all standard-rated. Ice cream is standard-rated.</li>
  <li>Alcohol is always standard-rated at 20%, in every context.</li>
</ul>

<p>Your EPOS system should be configured to assign each product line to the correct VAT category. Export the VAT report at the same time as the Z-read and reconcile the two. For anything borderline, use the <a href='/calculators/food-drink-vat-rate-checker'>VAT rate checker</a> and the relevant HMRC guidance: <a href='https://www.gov.uk/guidance/catering-takeaway-food-and-vat-notice-7091'>Notice 709/1 (catering)</a> and <a href='https://www.gov.uk/guidance/food-products-and-vat-notice-70114'>Notice 701/14 (food products)</a>.</p>

<p><strong>If your business uses the Flat Rate Scheme</strong>: under FRS you apply your sector flat rate to gross VAT-inclusive turnover. Catering businesses use 12.5%, pubs 6.5%, hotels and accommodation 10.5%. The tradescode determines the rate, not the business's own description. Under FRS you do not split output VAT by rate for the return, but you still need an accurate gross takings figure from the reconciliation. If your goods spend is less than 2% of FRS turnover or less than £1,000 a year, the limited-cost-trader rate of 16.5% may apply instead; check via <a href='https://www.gov.uk/vat-flat-rate-scheme/how-much-you-pay'>GOV.UK</a>. For a full explanation see the <a href='/services/hospitality-vat'>hospitality VAT service page</a>.</p>

<h2>Posting to your accounting software</h2>

<p>The reconciliation produces a verified set of figures for the day. What you post depends on your system, but the accounting categories are consistent regardless of which software you use.</p>

<table>
  <thead>
    <tr>
      <th>Line</th>
      <th>Account</th>
      <th>Note</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Eat-in and hot food sales (ex-VAT)</td>
      <td>Food sales (standard-rated)</td>
      <td>20% output VAT</td>
    </tr>
    <tr>
      <td>Zero-rated takeaway food sales</td>
      <td>Food sales (zero-rated)</td>
      <td>No output VAT</td>
    </tr>
    <tr>
      <td>Alcohol and standard-rated drinks</td>
      <td>Drinks sales (standard-rated)</td>
      <td>20% output VAT</td>
    </tr>
    <tr>
      <td>Delivery-app gross sales</td>
      <td>Sales (by VAT type)</td>
      <td>Gross figure, not net payout</td>
    </tr>
    <tr>
      <td>Delivery-app commission</td>
      <td>Platform costs</td>
      <td>Allowable cost; no input VAT if not VAT-registered</td>
    </tr>
    <tr>
      <td>Tips via independent tronc</td>
      <td>Tronc liability / suspense</td>
      <td>Not turnover; not posted to sales</td>
    </tr>
    <tr>
      <td>Card settlements pending</td>
      <td>Card clearing / suspense</td>
      <td>Clears when bank entry lands</td>
    </tr>
    <tr>
      <td>Cash banked</td>
      <td>Bank</td>
      <td>Confirmed against paying-in slip</td>
    </tr>
  </tbody>
</table>

<p>Software categories (accounting packages, cloud bookkeeping systems, EPOS integrations) vary in how they handle the posting. Name your accounts consistently from day one. An account called "Sales" with no VAT rate assignment will cause problems at return time. If you are setting up a chart of accounts for the first time, establish the VAT treatment for each category before you post a single transaction.</p>

<h2>Weekly and month-end checks</h2>

<p>Daily reconciliation catches the variance on the day. Weekly and month-end checks confirm the cumulative position is clean.</p>

<p><strong>Weekly.</strong> Run a total of all daily Z-reads for the week and compare it to the weekly bank movements (card settlements received, cash banked, delivery-app payouts received). Any timing differences from card settlement lag should be clearing within the week for most acquirers. If a settlement has not appeared within 5 working days, contact your acquirer.</p>

<p><strong>Month-end.</strong> Clear your card-settlement suspense and delivery-app suspense accounts to zero. Confirm all app statements for the month have been reconciled and the commission costs have been posted. Reconcile your VAT account: the output VAT figure in your software should match the sum of the daily VAT-rated sales totals. Any uncleared items in suspense at month-end need to be identified and resolved before the VAT return is filed, not after.</p>

<p><strong>Cash float reconciliation.</strong> At month-end, the float in every till should match the float you set at the start of the month, adjusted for any authorised float changes. An unreconciled float drift is a control weakness worth addressing.</p>

<h2>When to hand reconciliation to a bookkeeper</h2>

<p>Many operators do the daily till reconciliation themselves in the early months. As volume grows or sites multiply, the process becomes the first thing that slips when trading is busy, and it is usually the most consequential thing to slip.</p>

<p>The case for handing it over applies when: the daily process is taking more than 20 minutes because the system is not configured correctly; variances are being carried forward rather than investigated; the VAT rate split is not being done consistently; or the operator is running multiple sites with different sales mixes.</p>

<p>A bookkeeper who understands hospitality EPOS systems can configure the software categories correctly once, set up the daily posting template, and clear the reconciliation faster than someone doing it alongside running the kitchen or front of house. The <a href='/blog/hospitality-accounts/bookkeeper-for-restaurant'>bookkeeper for restaurants guide</a> covers what to look for, what to hand over, and what to keep in-house.</p>

<p>The reconciliation itself feeds the VAT return, the GP% calculation and the management accounts. If those downstream outputs are wrong, no amount of analysis will diagnose the right problem. Getting the data right at source is the prerequisite for everything else. See the <a href='/services/hospitality-vat'>hospitality VAT service</a> if VAT accuracy on your return is the immediate concern, or <a href='/for/restaurants'>the restaurants hub</a> and <a href='/for/takeaways'>the takeaways hub</a> for the wider picture on running the numbers in your type of business.</p>
