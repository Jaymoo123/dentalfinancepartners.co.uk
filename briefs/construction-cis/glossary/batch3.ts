// Glossary batch 3 for Trade Tax Specialists (construction-cis).
// Categories: "CIS fundamentals" | "Deductions and rates" | "Returns and compliance"
//             | "Refunds and repayments" | "Business structures" | "VAT and MTD"
// Body: raw HTML only (<p>, <ul>, <strong>). No markdown, no tables, no headings.
// All figures: 2026/27 (FA 2026-verified). Source: house_positions.md (HP-LOCKED 2026-06-12).
// CITB figures verified against citb.co.uk/levy/what-you-pay-and-why on 2026-06-12.

import type { GlossaryEntry } from "../../construction-cis/web/src/app/glossary/[slug]/data";

export const batch3: GlossaryEntry[] = [

  // ── REFUNDS AND REPAYMENTS ─────────────────────────────────────────────────

  {
    slug: "cis-refund",
    term: "CIS Refund",
    category: "Refunds and repayments",
    primary_kw: "what is a CIS refund",
    body: `<p>A CIS refund is the repayment HMRC makes when a subcontractor has had more money deducted under the Construction Industry Scheme than they actually owe in tax and National Insurance for the year.</p>
<p>Because CIS deductions (20% for registered subcontractors, 30% for unregistered) are taken from the <strong>labour element of each payment before any expenses or personal allowance are considered</strong>, most registered subcontractors overpay across the tax year. The deductions are an advance, not a final tax charge. Once the year-end picture is complete, the excess is refunded.</p>
<p>For a <strong>sole-trader subcontractor</strong>, the refund comes through <strong>Self Assessment</strong>. You file your tax return after 5 April, declare your gross CIS income (before deductions) and all allowable expenses, and HMRC calculates whether you are owed money. The typical refund for a sole-trader subcontractor runs to around <strong>£2,000 to £3,000 a year</strong> (illustrative average; individual results vary). HMRC usually processes online claims within <strong>5 to 10 working days</strong> once the return is filed.</p>
<p>For a <strong>limited-company subcontractor</strong>, there is a faster route. The company can offset CIS deductions suffered against the PAYE and NIC it owes each month via an <strong>Employer Payment Summary (EPS)</strong>, recovering the overpayment in real time rather than waiting up to 18 months for a year-end repayment. Where CIS suffered exceeds the company's PAYE liability, HMRC targets a repayment within <strong>25 working days</strong>.</p>
<p>You can also reclaim overpaid CIS deductions for earlier years. HMRC allows claims going back <strong>four tax years</strong> from the end of the current tax year. Each back year requires either a Self Assessment return (if none was filed) or an amendment to an existing return.</p>
<ul>
<li>The refund is only available to <strong>registered subcontractors</strong>. Unregistered subcontractors suffer the 30% rate and must first register before they can bring their affairs up to date efficiently.</li>
<li>You will need your <strong>CIS payment and deduction statements</strong> for every year you are claiming. Without them, HMRC cannot verify the deductions taken.</li>
</ul>
<p>See our <a href="/cis-refund">CIS refund service page</a> or use the <a href="/calculators/cis-refund-estimator">CIS refund estimator</a> to get a rough idea of what you may be owed before you instruct anyone.</p>`,
  },

  {
    slug: "over-deduction",
    term: "Over-deduction",
    category: "Refunds and repayments",
    primary_kw: "CIS over-deduction",
    body: `<p>An over-deduction occurs when a contractor deducts more CIS tax from a subcontractor's payment than the correct amount under the Construction Industry Scheme rules.</p>
<p>The most common causes are:</p>
<ul>
<li><strong>Applying the deduction to the full invoice value</strong> rather than the labour element only. CIS deductions apply only to the labour portion of a payment; the cost of <strong>materials the subcontractor buys for the job is excluded</strong> from the deduction base. A contractor who applies 20% to a £1,000 invoice when £400 of it is materials should deduct only £120 (20% of £600 labour), not £200.</li>
<li><strong>Using the wrong rate</strong>, for example deducting at 30% (the unregistered rate) when the subcontractor holds registered status at 20%, or deducting at all when the subcontractor holds Gross Payment Status (0%).</li>
<li><strong>Failing to re-verify</strong> after a subcontractor's status changes.</li>
</ul>
<p>If a contractor discovers an over-deduction, they should correct it <strong>within the same tax year</strong> where possible, by reducing a subsequent payment to the subcontractor or issuing a corrected payment and deduction statement. HMRC guidance allows in-year adjustments without penalty provided the contractor acts promptly and keeps a clear audit trail.</p>
<p>Where the over-deduction cannot be corrected in-year, the subcontractor recovers the excess through their <strong>Self Assessment return</strong> (sole trader) or <strong>EPS offset</strong> (limited company). The deduction statements the contractor issues are the evidence HMRC uses to verify the claim, so accurate statements matter throughout.</p>
<p>From the subcontractor's perspective, over-deduction is one of the main reasons CIS refunds arise. If your payment and deduction statements show materials being deducted as though they were labour, that is an over-deduction that increases your refund entitlement. A specialist CIS accountant will check the statements against your invoices as part of the refund process.</p>
<p>For a fuller explanation of how CIS deductions are calculated and what the deduction base covers, see our guide to <a href="/blog/cis-basics/cis-deduction-rates-explained">CIS deduction rates</a>.</p>`,
  },

  {
    slug: "overpayment-relief",
    term: "Overpayment Relief",
    category: "Refunds and repayments",
    primary_kw: "overpayment relief CIS",
    body: `<p>Overpayment relief is the statutory mechanism under the Taxes Management Act 1970 that allows a taxpayer to reclaim tax they have overpaid, including CIS deductions, when the normal amendment window for a Self Assessment return has closed.</p>
<p>The time limit is <strong>four years from the end of the relevant tax year</strong>. Because tax years end on 5 April, the four-year window runs from <strong>5 April in the year the overpayment occurred</strong>. For example, overpayments in 2021/22 (which ended 5 April 2022) can be reclaimed until <strong>5 April 2026</strong>. The deadline is not linked to 31 January (the Self Assessment filing deadline) and is not extendable.</p>
<p>This matters for CIS subcontractors in two situations:</p>
<ul>
<li><strong>No return was ever filed</strong> for a year in which CIS deductions were taken. A late return can still be submitted to recover the overpaid deductions, provided the four-year window has not closed.</li>
<li><strong>A return was filed but expenses were missed or income was reported incorrectly.</strong> An amendment can be made, but once more than 12 months have passed since the filing deadline, the overpayment relief route (rather than a standard amendment) is the correct mechanism.</li>
</ul>
<p>To make a claim, a subcontractor (or their agent) submits a letter or the online form to HMRC setting out the year, the amount of overpaid tax, and the supporting calculations. You will need <strong>CIS payment and deduction statements</strong> for each year, as HMRC will not accept a claim without evidence of the deductions taken.</p>
<p>HMRC processes overpayment relief claims separately from online Self Assessment repayments, so timelines vary. Claims covering multiple back years are handled year by year.</p>
<p>Our guide to <a href="/blog/cis-refunds/cis-back-years-refund-guide">CIS back-years refund claims</a> covers the four-year rule in detail, including what records you need and a worked example of a multi-year claim.</p>`,
  },

  {
    slug: "sa302-tax-calculation",
    term: "SA302 / Tax Calculation",
    category: "Refunds and repayments",
    primary_kw: "SA302 CIS subcontractor",
    body: `<p>An SA302 is HMRC's official summary of your tax calculation for a Self Assessment year, showing your total income, allowable deductions, the tax and National Insurance due, and, for CIS subcontractors, the deductions already made under the scheme.</p>
<p>For a CIS sole-trader subcontractor the SA302 is the document that proves how much tax has been prepaid via CIS deductions and whether a refund is owed or a balance is payable. The calculation works as follows:</p>
<ul>
<li>Your <strong>gross CIS income</strong> (the full amount before any deductions) is the starting figure. Never use your net receipts: HMRC tests MTD ITSA thresholds, refund calculations and your tax liability all against the gross.</li>
<li>Allowable expenses are deducted to arrive at your <strong>taxable profit</strong>.</li>
<li>Income tax (20% / 40% / 45% in 2026/27) and Class 4 National Insurance (<strong>6%</strong> between £12,570 and £50,270, <strong>2%</strong> above) are calculated on that profit, after your <strong>£12,570 personal allowance</strong>.</li>
<li>The total CIS deductions shown on your payment and deduction statements are then <strong>set off against the tax and NIC due</strong>. If the deductions exceed the liability, the difference is your refund.</li>
</ul>
<p>HMRC generates the SA302 automatically once a Self Assessment return is filed. You can download it from your Personal Tax Account or ask HMRC to send a paper copy. Mortgage lenders and landlords often request it as proof of income, making it useful beyond its immediate tax purpose.</p>
<p>If the SA302 shows a larger liability than expected, the usual reasons are missing expenses, incorrect gross income figures, or CIS deductions not matching the statements. A CIS accountant will reconcile the statements against invoices before filing to prevent these discrepancies.</p>
<p>For a step-by-step guide to filing the return that produces the SA302, see <a href="/blog/cis-refunds/cis-self-assessment-complete-guide">CIS Self Assessment: the complete guide for subcontractors</a>.</p>`,
  },

  {
    slug: "corporation-tax-offset-cis",
    term: "Corporation Tax Offset (CIS)",
    category: "Refunds and repayments",
    primary_kw: "CIS corporation tax offset limited company",
    body: `<p>A CIS corporation tax offset is the mechanism by which a limited-company subcontractor sets CIS deductions suffered during the year against the company's Corporation Tax liability, reducing or eliminating the CT bill rather than waiting for a separate cash repayment.</p>
<p>The offset works at year-end through the Corporation Tax return (CT600). The company reports its CIS deductions on supplementary page CT600H. HMRC applies the deductions first against the CT liability for the period. If the CIS deductions exceed the CT due, the surplus is repaid in cash.</p>
<p>This is distinct from the <strong>in-year EPS route</strong>, which offsets CIS deductions against PAYE and NIC liabilities every month. The two mechanisms run in parallel:</p>
<ul>
<li>Month by month: CIS deductions reduce the company's PAYE/NIC payments via the Employer Payment Summary.</li>
<li>Year-end: any remaining unrelieved CIS deductions (where the company has little or no PAYE payroll) are offset against Corporation Tax on the CT600.</li>
</ul>
<p>For 2026/27, Corporation Tax rates are <strong>25%</strong> on profits over £250,000, <strong>19%</strong> on profits under £50,000, with marginal relief between those figures. A company with a CT liability of £8,000 and CIS deductions of £10,000 would have its full CT bill wiped out and receive a £2,000 repayment.</p>
<p>One practical point: if a limited-company director is also drawing a salary and has PAYE obligations, the EPS route will often clear the deductions faster than waiting for the annual CT600 cycle. A CIS specialist will review both routes and choose the combination that minimises the time value of money tied up in HMRC's hands.</p>
<p>See our guide on <a href="/blog/limited-company/cis-for-limited-companies-eps-reclaim">how the EPS reclaim works</a> for the month-by-month mechanics, and our <a href="/cis-refund">CIS refund service page</a> for how we handle both routes for limited-company clients.</p>`,
  },

  {
    slug: "in-year-repayment-eps-route",
    term: "In-Year Repayment (EPS Route)",
    category: "Refunds and repayments",
    primary_kw: "CIS in-year repayment EPS limited company",
    body: `<p>The in-year repayment route (EPS route) allows a CIS limited-company subcontractor to recover overpaid CIS deductions in real time during the tax year, rather than waiting until after the year-end Self Assessment or Corporation Tax return cycle.</p>
<p>The mechanism uses the <strong>Employer Payment Summary (EPS)</strong>, a routine payroll filing submitted to HMRC via payroll software each month. On the EPS, the company reports the total CIS deductions it has suffered in the year to date. HMRC deducts that figure from the company's PAYE and NIC liability for the same period, reducing the payment due on the <strong>22nd of each month</strong> (19th for cheque payers).</p>
<p>How it works in practice:</p>
<ul>
<li>Company suffers £2,000 CIS deductions in a month but owes only £800 in PAYE and employer NIC. The net payment to HMRC is <strong>nil</strong> for that month, with £1,200 carried forward.</li>
<li>If the cumulative CIS deductions exceed cumulative PAYE/NIC liabilities across the year, HMRC repays the surplus. The target turnaround for these in-year repayments is <strong>25 working days</strong> from the EPS filing date.</li>
</ul>
<p>This matters because the alternative, waiting for the CT600 year-end offset, can mean that deductions made in April sit with HMRC for up to 18 months. For a subcontracting company with modest PAYE payroll, the EPS route can save a significant amount of working capital.</p>
<p>Important conditions: the company must operate a PAYE scheme and submit the EPS on time. Late or missing EPS filings mean HMRC charges the full PAYE amount and the offset is not applied automatically. HMRC will not backdate EPS corrections beyond certain limits, so monthly discipline matters.</p>
<p>For a full explanation of the EPS mechanics, deadlines and common errors, see our guide on <a href="/blog/limited-company/cis-for-limited-companies-eps-reclaim">CIS for limited companies: how the EPS reclaim works</a>. Use the <a href="/calculators/cis-refund-estimator">CIS refund estimator</a> to see whether your company is likely to be in a repayment position.</p>`,
  },

  // ── VAT AND MTD ───────────────────────────────────────────────────────────

  {
    slug: "vat-domestic-reverse-charge",
    term: "VAT Domestic Reverse Charge (DRC)",
    category: "VAT and MTD",
    primary_kw: "VAT domestic reverse charge construction",
    body: `<p>The VAT domestic reverse charge (DRC) is a rule that shifts the obligation to account for VAT from the supplier of construction services to the customer, and it has applied to most CIS-standard-rated supplies since <strong>1 March 2021</strong>.</p>
<p>Under normal VAT rules, the supplier charges VAT on the invoice and pays it to HMRC. Under the DRC, the supplier issues the invoice <strong>without charging VAT</strong> (marked "reverse charge applies"), and the customer self-accounts for the VAT both as an output and, subject to their normal recovery position, as an input. The cash never changes hands between supplier and customer for the VAT element.</p>
<p>The DRC applies only when <strong>all five conditions</strong> are met:</p>
<ul>
<li>The supply is a specified CIS construction service.</li>
<li>Both the supplier and the customer are <strong>VAT-registered</strong>.</li>
<li>Both the supplier and the customer are <strong>CIS-registered</strong>.</li>
<li>The customer is <strong>not an end user</strong> (they will on-sell or use the services in further construction, not consume them as an occupier or owner).</li>
<li>The supply is <strong>standard-rated or reduced-rated</strong> (new-build residential work is zero-rated and falls outside the DRC entirely).</li>
</ul>
<p>If any one condition is absent, normal VAT rules apply. There is also a <strong>5% de minimis</strong>: if the reverse-charge element of an invoice is 5% or less of the total invoice value, normal VAT rules apply to the whole invoice.</p>
<p>The DRC does not change a subcontractor's CIS position. A subcontractor still receives a payment and deduction statement in the normal way; the DRC only affects how VAT is handled on the same transaction.</p>
<p>Our detailed guide, <a href="/blog/vat-and-mtd/vat-reverse-charge-construction">VAT domestic reverse charge in construction</a>, includes worked invoice examples and covers the end-user exception in full.</p>`,
  },

  {
    slug: "end-user-drc",
    term: "End User (DRC)",
    category: "VAT and MTD",
    primary_kw: "end user VAT reverse charge construction",
    body: `<p>In the context of the VAT domestic reverse charge for construction, an end user is a customer who will <strong>consume the construction services themselves</strong> rather than on-sell them or incorporate them into further construction supplies, and to whom the reverse charge therefore does <strong>not</strong> apply.</p>
<p>The distinction matters because the DRC only applies where the customer will make an onward supply of the same construction services. When a customer is the final recipient, the normal VAT rules apply: the supplier charges VAT in the usual way, issues a VAT invoice with VAT shown, and accounts for the output tax to HMRC.</p>
<p>Who qualifies as an end user:</p>
<ul>
<li><strong>Property owners</strong> commissioning building or renovation work for their own occupation.</li>
<li><strong>Tenants</strong> having fit-out or repair work carried out on premises they occupy.</li>
<li><strong>Developers building for their own use</strong> (for example, a company constructing its own headquarters rather than building to sell or let).</li>
<li><strong>Landlords</strong> having maintenance or improvement work done on properties they own and let directly to occupiers.</li>
</ul>
<p>Who is <strong>not</strong> an end user:</p>
<ul>
<li>A main contractor who engages a subcontractor and will then supply the completed construction work to a developer or client (the services are on-sold, so the DRC applies between the subcontractor and the main contractor).</li>
<li>A developer who is building to sell or let the finished units.</li>
</ul>
<p>A customer can notify a supplier in writing that they are an end user if there is any ambiguity, which allows the supplier to invoice with VAT charged in the normal way. It is common for large property owners or housing associations to send standing end-user notifications to their regular contractors.</p>
<p>For worked examples of both end-user and reverse-charge scenarios, see our full guide to the <a href="/blog/vat-and-mtd/vat-reverse-charge-construction">VAT domestic reverse charge in construction</a>.</p>`,
  },

  {
    slug: "flat-rate-scheme-and-cis",
    term: "Flat Rate Scheme and CIS",
    category: "VAT and MTD",
    primary_kw: "flat rate scheme CIS subcontractor",
    body: `<p>The VAT Flat Rate Scheme (FRS) is a simplified VAT accounting method for small businesses, but its interaction with CIS subcontractors requires care, and in most cases the DRC removes the FRS benefit for construction supplies.</p>
<p>Under the FRS, a business pays HMRC a fixed percentage of its VAT-inclusive turnover rather than accounting for the difference between output and input VAT. The percentage varies by trade sector. The appeal is lower administration, and sometimes a small cash surplus where the FRS rate is lower than the effective rate implied by the business's input VAT recovery.</p>
<p>The critical interaction with construction: the <strong>VAT domestic reverse charge applies only to standard VAT accounting</strong>. A subcontractor on the FRS is <strong>excluded from the DRC</strong> as a supplier, meaning they still charge VAT on their invoices in the normal way (not at 0% with reverse-charge wording). However, HMRC's guidance makes clear that this creates an anomaly: where a main contractor receives a standard VAT invoice from an FRS subcontractor, the main contractor must apply the reverse charge to that supply if the other conditions are met. In practice, this means the main contractor treats the supply as reverse-charged even though the subcontractor invoiced with VAT.</p>
<p>Key practical points for CIS subcontractors on the FRS:</p>
<ul>
<li>The <strong>1% first-year discount</strong> on FRS rates applies in the first year of VAT registration only.</li>
<li>If most of your work is reverse-charge supplies (to VAT-and-CIS-registered customers who are not end users), you receive <strong>no VAT cash on those invoices</strong> at all, which removes the main FRS benefit.</li>
<li>FRS businesses <strong>cannot reclaim input VAT</strong> on purchases (other than capital goods over £2,000). For CIS subcontractors buying materials and plant, this can make the FRS unfavourable compared to standard accounting.</li>
</ul>
<p>Whether the FRS is worthwhile for a CIS subcontractor depends on the mix of end-user and on-supply work, and on materials spend. A CIS accountant should model both scenarios before you join or remain on the scheme. For related reading see our guide to <a href="/blog/vat-and-mtd/vat-reverse-charge-construction">the VAT domestic reverse charge in construction</a>.</p>`,
  },

  {
    slug: "making-tax-digital-for-income-tax",
    term: "Making Tax Digital for Income Tax (MTD ITSA)",
    category: "VAT and MTD",
    primary_kw: "MTD ITSA CIS subcontractor",
    body: `<p>Making Tax Digital for Income Tax Self Assessment (MTD ITSA) is HMRC's programme that requires sole traders and partnerships to keep digital tax records and submit quarterly updates to HMRC via MTD-compatible software, replacing the single annual Self Assessment return as the primary reporting mechanism.</p>
<p>The rollout is phased by gross income:</p>
<ul>
<li><strong>From April 2026:</strong> sole traders and partnerships with annual gross income over <strong>£50,000</strong> must comply.</li>
<li><strong>From April 2027:</strong> the threshold drops to <strong>£30,000</strong>.</li>
</ul>
<p>The point most CIS guides miss is how the threshold is measured. HMRC tests MTD ITSA eligibility against <strong>gross income before CIS deductions are taken off</strong>, not your net receipts. A subcontractor who receives £40,000 in their bank account after 20% deductions on £50,000 gross is tested on the <strong>£50,000 gross figure</strong> and is in scope from April 2026. The deductions are an advance against your tax bill; they do not reduce your income for MTD purposes.</p>
<p>Once in MTD ITSA, a subcontractor must:</p>
<ul>
<li>Keep records digitally throughout the year, linking income and expenses directly from source data.</li>
<li>Submit <strong>four quarterly updates</strong> to HMRC (deadlines: <strong>7 August, 7 November, 7 February, 7 May</strong>), each summarising income and expenses for that quarter.</li>
<li>File an <strong>end-of-period statement</strong> and a <strong>final declaration</strong> after the tax year ends, which replaces the traditional Self Assessment return and triggers any CIS refund or balancing payment.</li>
</ul>
<p>In the first year (2026/27), HMRC will not issue <strong>penalty points for late quarterly updates</strong>, but late annual returns and late-payment penalties still apply in full.</p>
<p>Our full guide to <a href="/blog/vat-and-mtd/mtd-income-tax-cis">MTD for CIS subcontractors</a> covers the gross-income trap, software options and the quarterly deadlines in detail.</p>`,
  },

  {
    slug: "quarterly-updates-mtd",
    term: "Quarterly Updates (MTD)",
    category: "VAT and MTD",
    primary_kw: "quarterly updates MTD ITSA CIS",
    body: `<p>Quarterly updates are the four digital submissions that sole traders and partnerships within Making Tax Digital for Income Tax (MTD ITSA) must send to HMRC each year, summarising their income and expenses for each three-month period of the tax year.</p>
<p>The four deadline dates are fixed each year:</p>
<ul>
<li>Quarter 1 (6 April to 5 July): due by <strong>7 August</strong></li>
<li>Quarter 2 (6 July to 5 October): due by <strong>7 November</strong></li>
<li>Quarter 3 (6 October to 5 January): due by <strong>7 February</strong></li>
<li>Quarter 4 (6 January to 5 April): due by <strong>7 May</strong></li>
</ul>
<p>The 7th of the month is the submission deadline, not the 5th (which is simply the end of each quarter period). This catches taxpayers out in the first year.</p>
<p>Quarterly updates are <strong>not a tax payment</strong>. They are a digital record of your income and expenditure for the period, submitted via MTD-compatible software. HMRC uses them to give you an in-year tax estimate, but no payment is triggered by filing a quarterly update. The actual tax calculation and any refund or balancing payment still happen after the year-end <strong>final declaration</strong>.</p>
<p>For CIS subcontractors, the quarterly income figure to report is <strong>gross CIS income</strong> (before deductions). Recording the net figure (cash received after 20% deductions) is a common error that understates income and can produce a misleading tax estimate across the year.</p>
<p>In the first year of MTD ITSA (2026/27), HMRC will not issue <strong>penalty points for late quarterly updates</strong>. However, the year-end obligations (end-of-period statement and final declaration) still carry penalties if late, and late tax payments still attract interest and surcharges.</p>
<p>For the full MTD ITSA picture including the gross-income threshold trap, see our guide to <a href="/blog/vat-and-mtd/mtd-income-tax-cis">Making Tax Digital and CIS</a>.</p>`,
  },

  {
    slug: "bridging-software",
    term: "Bridging Software",
    category: "VAT and MTD",
    primary_kw: "bridging software MTD ITSA",
    body: `<p>Bridging software is a category of tool that connects a taxpayer's existing bookkeeping records, typically a spreadsheet or basic accounting package, to HMRC's MTD systems, allowing the required digital submissions to be made without switching to a fully integrated MTD-native platform.</p>
<p>Under Making Tax Digital for Income Tax, submissions must flow digitally from the source record to HMRC with no manual re-keying at any link in the chain. HMRC's rules allow the use of software that "bridges" between a taxpayer's own records and the HMRC API, provided the link between them is digital (a formula-driven connection, not a copy-paste).</p>
<p>For CIS sole-trader subcontractors who already use spreadsheets to track invoices and materials, bridging software can be a lower-cost route into MTD ITSA compliance than replacing their entire bookkeeping system. Typical bridging tools import the quarterly income and expenses totals from the spreadsheet and transmit them to HMRC in the correct MTD format.</p>
<p>Practical considerations:</p>
<ul>
<li><strong>Digital link requirement.</strong> The connection between the spreadsheet and the bridging tool must be digital throughout. Typing figures manually from a spreadsheet into a separate submission tool does not meet the digital-link rule.</li>
<li><strong>Quarterly update deadlines apply regardless of software type.</strong> Bridging software does not extend the 7 August, 7 November, 7 February and 7 May deadlines.</li>
<li><strong>HMRC-recognised software list.</strong> Only software that appears on HMRC's recognised software register can be used for MTD submissions. Check the HMRC website before committing to any tool.</li>
<li><strong>CIS gross-income entries.</strong> Whichever software you use, the income figure entered must be <strong>gross CIS income</strong> before deductions, not the net receipts in your bank account.</li>
</ul>
<p>Whether bridging software or a fully integrated platform is more suitable depends on the volume and complexity of a subcontractor's records. A CIS accountant can advise on the right approach for your situation. For the full MTD ITSA context see our guide on <a href="/blog/vat-and-mtd/mtd-income-tax-cis">Making Tax Digital and CIS</a>.</p>`,
  },

  // ── DEDUCTIONS AND RATES ──────────────────────────────────────────────────

  {
    slug: "allowable-expenses-cis",
    term: "Allowable Expenses (CIS)",
    category: "Deductions and rates",
    primary_kw: "allowable expenses CIS subcontractor",
    body: `<p>Allowable expenses are the costs a CIS subcontractor can deduct from their gross income when calculating the taxable profit on which income tax and National Insurance are charged, and they are the main lever that determines whether a subcontractor is owed a refund at year-end.</p>
<p>Because CIS deductions are taken on gross labour income before any expenses are considered, two subcontractors on identical gross income can have very different tax positions depending on how much they spend on legitimate business costs. Missed expenses mean a higher taxable profit, which means a lower refund or a higher bill.</p>
<p>Common allowable expenses for CIS subcontractors include:</p>
<ul>
<li><strong>Vehicle costs.</strong> Business mileage in your own vehicle at the approved mileage rate (<strong>55p per mile</strong> for the first 10,000 business miles in 2026/27, 25p per mile thereafter). Alternatively, actual running costs (fuel, insurance, servicing, tax) apportioned to business use. Vans used wholly for work can often be claimed in full.</li>
<li><strong>Tools, plant and equipment.</strong> Hand tools, power tools, safety equipment and similar items used on site. Larger plant may qualify for the Annual Investment Allowance (up to <strong>£1,000,000</strong> in 2026/27) or Writing-Down Allowance.</li>
<li><strong>Materials bought for jobs.</strong> Where you supply materials as part of your work, the cost is deductible as an expense. Note that these materials are also <strong>excluded from the CIS deduction base</strong>, so they reduce tax through both routes.</li>
<li><strong>PPE, clothing and workwear.</strong> Safety boots, hard hats, hi-vis and other site-specific clothing. Ordinary clothing is not allowable even if you wear it at work.</li>
<li><strong>Phone and communications.</strong> The business proportion of mobile phone costs.</li>
<li><strong>Insurance.</strong> Public liability, professional indemnity and similar policies taken out for business purposes.</li>
<li><strong>Use of home as office.</strong> A flat rate of <strong>£10/month</strong> (25-50 hours), <strong>£18/month</strong> (51-100 hours) or <strong>£26/month</strong> (over 100 hours) where you carry out administrative work at home, up to a maximum of <strong>£312 a year</strong>.</li>
<li><strong>Accountancy and professional fees.</strong> The cost of having your Self Assessment return prepared and your CIS refund claimed.</li>
</ul>
<p>For a full list and guidance on how to document each category, see our guide to <a href="/blog/expenses/allowable-expenses-cis-subcontractor">expenses CIS subcontractors can claim in 2026/27</a>.</p>`,
  },

  {
    slug: "amap-mileage-rates",
    term: "AMAP Mileage Rates",
    category: "Deductions and rates",
    primary_kw: "AMAP mileage rate CIS subcontractor 2026",
    body: `<p>The Approved Mileage Allowance Payment (AMAP) rates are the HMRC-approved per-mile rates at which a self-employed person can claim tax relief for using their own vehicle for business travel, without having to keep records of actual fuel and running costs.</p>
<p>For <strong>2026/27</strong>, following the change made in Finance Act 2026 effective from <strong>6 April 2026</strong>, the AMAP rates are:</p>
<ul>
<li><strong>Cars and vans: 55p per mile</strong> for the first 10,000 business miles in the tax year. Previously 45p, the rate increased from 6 April 2026.</li>
<li><strong>Cars and vans: 25p per mile</strong> for every business mile above 10,000 in the tax year. This rate is unchanged.</li>
<li><strong>Motorcycles: 24p per mile</strong> (all miles, unchanged).</li>
<li><strong>Bicycles: 20p per mile</strong> (all miles, unchanged).</li>
</ul>
<p>For a CIS subcontractor travelling between their home (or a base) and various temporary sites, these miles are generally allowable business mileage. The legal position is that travel to a temporary workplace, one where you work for under 24 months, qualifies. Regular commuting to a fixed permanent workplace does not.</p>
<p>At the new 55p rate, a subcontractor who drives <strong>15,000 business miles in 2026/27</strong> can claim:</p>
<ul>
<li>10,000 miles at 55p = <strong>£5,500</strong></li>
<li>5,000 miles at 25p = <strong>£1,250</strong></li>
<li>Total mileage claim: <strong>£6,750</strong></li>
</ul>
<p>This claim reduces taxable profit directly. At the 20% basic rate, a £6,750 mileage deduction saves <strong>£1,350 in income tax</strong>, plus Class 4 NIC savings. It is one of the largest single expense claims available to most sole-trader subcontractors and is frequently under-claimed because mileage records have not been kept.</p>
<p>Keep a contemporaneous mileage log (date, destination, purpose, miles) for every business journey. HMRC expects to see this in any compliance check. For a full breakdown of allowable vehicle and travel expenses, see our guide to <a href="/blog/expenses/allowable-expenses-cis-subcontractor">expenses CIS subcontractors can claim</a>.</p>`,
  },

  {
    slug: "class-4-national-insurance",
    term: "Class 4 National Insurance",
    category: "Deductions and rates",
    primary_kw: "Class 4 National Insurance CIS subcontractor 2026",
    body: `<p>Class 4 National Insurance Contributions are the self-employed NIC charge levied on the taxable profits of sole traders, including CIS subcontractors, in addition to income tax.</p>
<p>For <strong>2026/27</strong>, the Class 4 rates are:</p>
<ul>
<li><strong>6%</strong> on profits between <strong>£12,570</strong> and <strong>£50,270</strong>.</li>
<li><strong>2%</strong> on profits above <strong>£50,270</strong>.</li>
</ul>
<p>Class 4 NIC is calculated on the same Self Assessment return as income tax and is payable on <strong>31 January</strong> following the end of the tax year (with a second payment on account on 31 July, where required). Unlike Class 1 NIC (employed), Class 4 is not deducted at source: it is assessed and paid in arrears through Self Assessment.</p>
<p>Class 4 is separate from <strong>Class 2 NIC</strong>. Class 2 (£0 to pay above the <strong>£7,105 small profits threshold</strong> in 2026/27, treated as paid automatically) accrues entitlement to the State Pension and certain benefits. Class 4 provides no benefit entitlement and is purely a revenue charge on profits.</p>
<p>Because CIS deductions are taken on gross labour income and do not include any Class 4 NIC element, a subcontractor who has large CIS deductions but also significant expenses may find that, after allowable expenses bring their taxable profit below £12,570, they owe <strong>no Class 4 NIC at all</strong>, and the CIS deductions represent a straightforward overpayment of income tax.</p>
<p>Worked example at 2026/27 rates: a subcontractor with gross CIS income of £40,000 and allowable expenses of £12,000 has taxable profit of £28,000. After the £12,570 personal allowance, taxable income is £15,430. Income tax: 20% of £15,430 = £3,086. Class 4 NIC: 6% of (£28,000 minus £12,570) = 6% of £15,430 = <strong>£926</strong>. Total liability: £4,012. CIS deductions taken (20% of £40,000 labour): £8,000. Refund due: approximately <strong>£3,988</strong>.</p>
<p>For the full National Insurance picture for CIS workers, see our guide to <a href="/blog/cis-basics/cis-national-insurance-guide">CIS National Insurance: Class 2, Class 4 and employer NIC</a>.</p>`,
  },

  {
    slug: "citb-levy",
    term: "CITB Levy",
    category: "Deductions and rates",
    primary_kw: "CITB levy construction CIS",
    body: `<p>The CITB levy is a statutory charge collected by the Construction Industry Training Board from employers in the construction industry, used to fund training grants and apprenticeships across the sector.</p>
<p>The levy applies to any employer that is <strong>engaged wholly or mainly in construction industry activities</strong>, meaning construction work accounts for more than 50% of its total employees' time (including labour-only subcontractors on contracts for services). Size of turnover is not the trigger: if construction is the majority activity and you have at least one worker, you are in scope.</p>
<p>The levy rates for the 2025 Levy (assessed spring 2026) and the 2026 Levy (assessed spring 2027) are:</p>
<ul>
<li><strong>0.35% on PAYE payroll</strong> (gross wages paid to employees under PAYE).</li>
<li><strong>1.25% on net payments made to CIS subcontractors</strong> (the amount paid after CIS deductions, not the gross invoice value).</li>
<li><strong>No levy on payments to gross-status CIS subcontractors</strong> (those paid at 0%).</li>
<li><strong>No levy on payments to labour agencies</strong>.</li>
</ul>
<p>There are two thresholds that reduce or eliminate the levy:</p>
<ul>
<li><strong>Small Business Exemption:</strong> if your total wage bill (PAYE plus net CIS payments) is <strong>under £150,000 a year</strong>, you pay <strong>no levy at all</strong>.</li>
<li><strong>Small Business Reduction:</strong> if your total wage bill is between <strong>£150,000 and £499,999</strong>, you receive a <strong>50% discount</strong> on the levy owed.</li>
</ul>
<p>The levy is assessed annually by CITB based on your PAYE and CIS returns to HMRC. CITB cross-references its data with HMRC records, so under-declaring wages is not a viable route to avoid the charge.</p>
<p>CITB-registered employers can apply for training grants to offset some or all of the levy paid, covering courses from CSCS cards to apprenticeship top-ups. Employers who pay the levy but do not claim grants are effectively subsidising training across the industry. Claiming grants is not automatic: applications must be made through the CITB portal. Source: citb.co.uk/levy/what-you-pay-and-why (verified 2026-06-12).</p>
<p>For broader CIS expenses and tax deductions available to construction businesses, see our guide to <a href="/blog/expenses/allowable-expenses-cis-subcontractor">allowable expenses for CIS subcontractors</a>.</p>`,
  },

];
