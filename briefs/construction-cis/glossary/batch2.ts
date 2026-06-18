// Glossary batch 2 - Returns and compliance cluster (17 entries)
// Site: construction-cis (Trade Tax Specialists)
// Written: 2026-06-12
// All figures from house_positions.md (HP-LOCKED 2026-06-12).
// Body = raw HTML only: <p>, <ul>, <strong>. No headings, no tables, no markdown.
// Blog links use /blog/<category-slug>/<post-slug> per getCategorySlug() (slugifyCategory).
//   "CIS Compliance" -> cis-compliance
//   "CIS Basics"     -> cis-basics
//   "Limited Company"-> limited-company

import type { GlossaryEntry } from "../../../construction-cis/web/src/app/glossary/[slug]/data";

export const batch2Entries: GlossaryEntry[] = [
  {
    slug: "cis300",
    term: "CIS300 Monthly Return",
    category: "Returns and compliance",
    primary_kw: "CIS300 monthly return deadline",
    body: `<p>The <strong>CIS300</strong> is the monthly return a contractor must submit to HMRC showing every payment made to subcontractors in the preceding tax month, together with the CIS deductions withheld from those payments.</p>
<p>Tax months run from the 6th to the 5th of the following calendar month. The CIS300 for each tax month must be <strong>filed by the 19th of the following month</strong>: payments made in the month ending 5 May are due to HMRC by 19 May. Payment of the deducted CIS must reach HMRC by the <strong>22nd electronically</strong> (or the 19th if paying by cheque). Missing the deadline by even one day triggers an automatic <strong>£100 penalty</strong>, rising to £200 at two months, then to £300 or 5% of the CIS liability (whichever is higher) at six months, and £300 or 100% of the CIS liability at twelve months.</p>
<p>Every contractor registered under the Construction Industry Scheme must file a CIS300 even if they make no payments to subcontractors in a particular month. From <strong>6 April 2026</strong> that nil-return obligation was reinstated (it had been removed in 2015): a contractor with no subcontractor activity must still file, or pre-notify HMRC of inactivity. Payments to local authorities and public sector bodies are excluded from the return under the new <strong>Regulation 24ZA</strong> exemption, also in force from 6 April 2026.</p>
<p>The CIS300 is also the point at which a contractor confirms the deduction rates it has applied. Before including a subcontractor on the return, the contractor must have <strong>verified</strong> that subcontractor with HMRC to establish whether they hold Gross Payment Status (0%), are registered (20%) or are unregistered (30%). From April 2026, re-verifying each subcontractor before payment is one of three mandatory due-diligence steps a contractor must document to meet the &ldquo;knew or should have known&rdquo; standard under Finance Act 2026.</p>
<ul>
<li><strong>Filing deadline:</strong> 19th of the month following the relevant tax month.</li>
<li><strong>Payment deadline:</strong> 22nd electronically, 19th by cheque.</li>
<li><strong>Penalty for one day late:</strong> £100 per return.</li>
<li><strong>Nil months:</strong> a return must still be filed (or inactivity pre-notified) from April 2026.</li>
</ul>
<p>For a full walkthrough of contractor obligations around the CIS300, including worked examples and the complete penalty ladder, see <a href="/blog/cis-compliance/cis-monthly-return-guide">CIS monthly returns: deadlines, nil returns and penalties</a>. The April 2026 rule changes that affect what must appear on the return are covered in <a href="/blog/cis-compliance/cis-april-2026-rule-changes">CIS April 2026 rule changes explained</a>.</p>`,
  },
  {
    slug: "nil-return",
    term: "Nil Return",
    category: "Returns and compliance",
    primary_kw: "CIS nil return obligation",
    body: `<p>A <strong>CIS nil return</strong> is a CIS300 monthly return filed by a contractor for a tax month in which no payments were made to any subcontractor, confirming to HMRC that the contractor was active but paid nobody under CIS.</p>
<p>The nil-return obligation was <strong>removed in 2015</strong> and <strong>reinstated from 6 April 2026</strong>. From that date, every contractor registered for the Construction Industry Scheme must either file a CIS300 nil return for each month with no subcontractor activity or <strong>pre-notify HMRC of inactivity</strong> for a period of up to six months in advance. Many contractors are unaware the obligation has returned, making it one of the most common sources of automatic penalties since April 2026.</p>
<p>The penalty ladder for a late nil return is identical to that for a substantive return: <strong>£100 for one day late</strong>, <strong>£200 at two months</strong>, <strong>£300 or 5% of the CIS liability (whichever is higher) at six months</strong>, and <strong>£300 or 100% of the CIS liability at twelve months</strong>. Because a nil return carries no CIS liability, the 5% and 100% floors do not apply, so the effective penalty for a nil return that is persistently missed escalates through £100, £200 and then two further charges of £300 each.</p>
<p>Filing a nil return typically takes a few minutes online through the HMRC CIS service. If a contractor knows they will have no subcontractor payments for an extended period, they can avoid repeated monthly filings by contacting HMRC to record a period of inactivity, which suspends the obligation for up to six months.</p>
<ul>
<li><strong>Obligation:</strong> in force from 6 April 2026 (reinstated after eleven years).</li>
<li><strong>Alternative:</strong> pre-notify HMRC of inactivity for up to six months at a time.</li>
<li><strong>Penalty trigger:</strong> one day after the 19th of the following tax month.</li>
<li><strong>Base penalty:</strong> £100 per missed nil return.</li>
</ul>
<p>For a full explanation of what triggers the obligation and how to avoid the penalties, see <a href="/blog/cis-compliance/cis-nil-return-explained">CIS nil return explained: the April 2026 rule every contractor must know</a>. The wider penalty regime is covered in <a href="/blog/cis-compliance/cis-penalties-and-appeals">CIS penalties and appeals: the complete guide</a>.</p>`,
  },
  {
    slug: "pre-notification-of-inactivity",
    term: "Pre-notification of Inactivity",
    category: "Returns and compliance",
    primary_kw: "CIS inactivity period HMRC",
    body: `<p><strong>Pre-notification of inactivity</strong> is the mechanism that allows a contractor registered under the Construction Industry Scheme to tell HMRC in advance that they expect to make no payments to subcontractors for a defined future period, suspending the monthly CIS300 filing obligation for that window.</p>
<p>From <strong>6 April 2026</strong>, when the nil-return obligation was reinstated, the alternative of pre-notifying inactivity became more commercially important. Without it, a contractor who knows their project pipeline is empty for three or four months must still file a CIS300 nil return by the 19th of each following tax month, or face an automatic £100 penalty per missed return.</p>
<p>A contractor notifies HMRC of inactivity by contacting the <strong>HMRC CIS helpline (0300 200 3210, Monday to Friday 8am to 6pm)</strong> or through their contractor record online. The period can cover up to <strong>six months</strong> at a time. If subcontractor payments resume before the end of the declared inactive period, the contractor must notify HMRC and file returns for those active months. Failing to do so leaves a gap in the return record that HMRC may treat as non-compliance.</p>
<p>Pre-notification does not relieve a contractor of other CIS obligations. Verification of any new subcontractor, record-keeping, and payment and deduction statement requirements all continue. It is the <strong>monthly filing obligation only</strong> that is suspended for the inactive period.</p>
<ul>
<li><strong>Maximum advance period:</strong> six months per notification.</li>
<li><strong>Method:</strong> HMRC CIS helpline or online contractor account.</li>
<li><strong>Effect:</strong> suspends CIS300 filing obligation for the notified period.</li>
<li><strong>Important:</strong> if payments resume early, inform HMRC and file for the active months.</li>
</ul>
<p>The nil-return rule that makes this option relevant is explained in detail at <a href="/blog/cis-compliance/cis-nil-return-explained">CIS nil return explained</a>. The full contractor monthly checklist, including when to use inactivity notification, is at <a href="/blog/cis-compliance/cis-for-contractors-monthly-responsibilities">CIS for contractors: your monthly responsibilities checklist</a>.</p>`,
  },
  {
    slug: "regulation-24za",
    term: "Regulation 24ZA (Public Sector Exemption)",
    category: "Returns and compliance",
    primary_kw: "Regulation 24ZA CIS public sector exemption",
    body: `<p><strong>Regulation 24ZA</strong> is a new statutory exemption, in force from <strong>6 April 2026</strong>, that removes payments made to <strong>local authorities and public sector bodies</strong> from the scope of the Construction Industry Scheme entirely: no CIS deduction is applied to those payments and they are not included in the contractor's CIS300 monthly return.</p>
<p>Before April 2026, contractors working on public sector projects had to apply CIS deductions and report those payments on their monthly return in the same way as any other subcontractor payment. Regulation 24ZA ended that obligation for qualifying public-body payees. The rationale is that public sector bodies settle their own tax obligations through different mechanisms and have no practical need for the CIS withholding regime.</p>
<p>The exemption is relevant primarily to the <strong>contractor audience</strong>: a building firm engaged on a contract for a local council, NHS trust, or other central government body no longer deducts 20% or 30% from payments to that public body and no longer reports those payments on the CIS300. For subcontractors working for a contractor who is in turn engaged by a public body, the normal CIS rules continue to apply to the contractor-to-subcontractor payment leg.</p>
<p>Contractors should review any payment records from before April 2026 that covered public sector counterparties to confirm that returns filed after that date correctly exclude those payments. Including exempt public-body payments in the CIS300 is not itself a penalty risk, but it creates unnecessary complexity and may affect the apparent CIS liability figure used to calculate late-filing penalty multipliers.</p>
<ul>
<li><strong>In force:</strong> 6 April 2026.</li>
<li><strong>Scope:</strong> local authorities and qualifying public sector bodies.</li>
<li><strong>Effect:</strong> no CIS deduction on payments to those bodies; those payments excluded from CIS300.</li>
<li><strong>Who it affects:</strong> contractors (persona C); subcontractor-to-contractor rules unchanged.</li>
</ul>
<p>The April 2026 changes to CIS, including this exemption, are covered in full at <a href="/blog/cis-compliance/cis-april-2026-rule-changes">CIS April 2026 rule changes explained</a>. CIS300 filing obligations are set out at <a href="/blog/cis-compliance/cis-monthly-return-guide">CIS monthly returns: deadlines, nil returns and penalties</a>.</p>`,
  },
  {
    slug: "late-filing-penalties-cis",
    term: "Late Filing Penalties (CIS)",
    category: "Returns and compliance",
    primary_kw: "CIS late filing penalty",
    body: `<p><strong>Late filing penalties</strong> under the Construction Industry Scheme are automatic charges that HMRC issues when a contractor's CIS300 monthly return is not received by the 19th of the month following each tax month.</p>
<p>The penalty ladder escalates with the length of the delay:</p>
<ul>
<li><strong>1 day late:</strong> £100 per return, charged automatically by HMRC.</li>
<li><strong>2 months late:</strong> a further £200 penalty on top of the £100.</li>
<li><strong>6 months late:</strong> an additional £300 <em>or</em> 5% of the CIS liability shown on the return, whichever is higher.</li>
<li><strong>12 months late:</strong> a further £300 <em>or</em> 100% of the CIS liability, whichever is higher.</li>
</ul>
<p>Each monthly return is treated as a separate return for penalty purposes, so a contractor who misses three consecutive months immediately faces three separate £100 charges. The <strong>reinstatement of nil returns from 6 April 2026</strong> (they were removed in 2015) means contractors who assumed they had no obligation to file in quiet months are now accumulating penalties without realising it. Nil returns carry the same penalty ladder, though the 5% and 100% floors do not bite on a return with no underlying CIS liability.</p>
<p>A penalty can be cancelled if the contractor can demonstrate a <strong>reasonable excuse</strong>, such as a serious illness, bereavement or an HMRC system failure. Appeals must be made within <strong>30 days</strong> of the penalty notice, either online or using form SA370. HMRC does not accept &ldquo;I did not know I had to file&rdquo; as a reasonable excuse.</p>
<p>Late payment of the deducted CIS (due by the 22nd electronically) attracts <strong>interest</strong> on top of the late-filing penalty, which is calculated separately. The CIS300 penalty ladder is distinct from the Self Assessment penalty ladder: never merge the two figures when advising a subcontractor who is also late with a Self Assessment return.</p>
<p>For the complete CIS penalty framework and appeal process, see <a href="/blog/cis-compliance/cis-penalties-and-appeals">CIS penalties and appeals: the complete guide</a>. The nil-return obligation that reopened this penalty risk from April 2026 is explained at <a href="/blog/cis-compliance/cis-nil-return-explained">CIS nil return explained</a>.</p>`,
  },
  {
    slug: "compliance-test",
    term: "Compliance Test",
    category: "Returns and compliance",
    primary_kw: "CIS compliance test gross payment status",
    body: `<p>The <strong>compliance test</strong> is one of the three conditions a subcontractor must meet to qualify for, and retain, <strong>Gross Payment Status (GPS)</strong> under the Construction Industry Scheme. It requires that all of the applicant's tax obligations have been met <strong>on time in the preceding 12 months</strong>, with no late Self Assessment returns, no overdue income tax or Corporation Tax payments, and no PAYE defaults.</p>
<p>HMRC assesses the compliance test at the point of application and at each annual GPS review. The 12-month window is a rolling period, so a subcontractor who settled a debt late two years ago is not automatically barred, but one who missed a payment or return within the past year will fail the test and cannot obtain or keep GPS until the 12-month clean record is re-established.</p>
<p>Obligations caught by the compliance test include:</p>
<ul>
<li><strong>Self Assessment returns</strong> (filed on time, even if the balance was then paid late).</li>
<li><strong>Income tax and Class 4 NIC payments on account</strong> and the balancing payment.</li>
<li><strong>Corporation Tax returns and payments</strong> for limited companies.</li>
<li><strong>PAYE and employer NIC</strong> for any employees the business has.</li>
<li><strong>VAT returns and payments</strong> if the business is VAT-registered.</li>
</ul>
<p>Because GPS delivers a <strong>0% deduction rate</strong> rather than the standard 20%, losing it due to a compliance failure has an immediate cash-flow cost: roughly <strong>£100,000 a year in withheld cash</strong> for a business turning over £500,000. The <strong>Finance Act 2026 five-year reapplication ban</strong> applies only to GPS removed on fraud grounds, not to loss through a compliance failure, but the commercial disruption of losing GPS in any circumstance underlines why keeping all tax obligations current is essential for construction businesses.</p>
<p>The three GPS qualifying tests, including the compliance test, are explained in full at <a href="/blog/cis-compliance/cis-gross-payment-status-guide">CIS gross payment status: how to qualify, apply and keep it</a>. The April 2026 changes that affect GPS holders are at <a href="/blog/cis-compliance/cis-april-2026-rule-changes">CIS April 2026 rule changes explained</a>.</p>`,
  },
  {
    slug: "turnover-test",
    term: "Turnover Test",
    category: "Returns and compliance",
    primary_kw: "CIS GPS turnover test threshold",
    body: `<p>The <strong>turnover test</strong> is the second of three conditions a subcontractor must satisfy to hold <strong>Gross Payment Status (GPS)</strong> under the Construction Industry Scheme. It requires that the applicant's net annual CIS turnover from construction work meets a minimum threshold, measured over the preceding 12 months.</p>
<p>The thresholds for <strong>2026/27</strong> are:</p>
<ul>
<li><strong>Sole trader:</strong> £30,000 net annual CIS turnover.</li>
<li><strong>Partnership:</strong> £30,000 per partner, or £100,000 total turnover (whichever is the lower hurdle to cross).</li>
<li><strong>Limited company:</strong> £30,000 per director, or £100,000 total turnover.</li>
<li><strong>Closely controlled company (5 or fewer controllers):</strong> £30,000 per controller.</li>
</ul>
<p><strong>&ldquo;Net&rdquo; turnover</strong> for the turnover test excludes both VAT and the cost of materials the subcontractor purchased for jobs. This definition mirrors the CIS deduction base (which applies to the labour element only), so the qualifying turnover is the labour and construction-services element of the subcontractor's CIS receipts over the 12-month measurement window.</p>
<p>A subcontractor who has only recently started construction work may not yet have 12 months of CIS receipts. In that case HMRC uses an annualised projection based on the period of trading available, though the projection must still reach the relevant threshold. HMRC verifies turnover at the point of GPS application and at each annual renewal review; a drop below the threshold in a review year results in GPS being removed.</p>
<p>The turnover test must be passed together with the <strong>business test</strong> and the <strong>compliance test</strong>: all three must be satisfied simultaneously. From <strong>6 April 2026</strong>, passing all three tests is no longer the end of the story: Finance Act 2026 added an ongoing due-diligence duty that GPS holders must meet to avoid immediate revocation on fraud-related grounds.</p>
<p>Full details of all three GPS qualifying tests are at <a href="/blog/cis-compliance/cis-gross-payment-status-guide">CIS gross payment status: how to qualify, apply and keep it</a>. The impact of the April 2026 changes on GPS holders is covered at <a href="/blog/cis-compliance/cis-april-2026-rule-changes">CIS April 2026 rule changes explained</a>.</p>`,
  },
  {
    slug: "business-test",
    term: "Business Test",
    category: "Returns and compliance",
    primary_kw: "CIS GPS business test",
    body: `<p>The <strong>business test</strong> is the first of three conditions a subcontractor must meet to qualify for <strong>Gross Payment Status (GPS)</strong> under the Construction Industry Scheme. It requires that the applicant carries out construction work (or provides labour for construction work) <strong>in the UK</strong> and operates the business <strong>through a bank account</strong>.</p>
<p>The test has two elements, both of which must be satisfied:</p>
<ul>
<li><strong>Construction activity in the UK.</strong> The business must be engaged in construction operations as defined by the CIS legislation. Businesses providing only design, professional or purely managerial services that fall outside the statutory definition of construction operations will fail this element.</li>
<li><strong>Bank account.</strong> The business must run its finances through a business bank account. A sole trader using a personal account may still satisfy this requirement if HMRC is satisfied the account is used for business purposes, but a dedicated business account removes any ambiguity.</li>
</ul>
<p>The business test is the threshold-level requirement: it establishes that the applicant is within the scope of the CIS scheme and has the basic business infrastructure in place. Most subcontractors working in construction will satisfy it without difficulty. The more demanding GPS hurdles are the <strong>turnover test</strong> (minimum net annual CIS receipts by entity type) and the <strong>compliance test</strong> (clean 12-month tax record).</p>
<p>All three tests must be passed simultaneously. A business that clears the turnover and compliance tests but carries out work that falls outside the statutory construction-operations definition will still be refused GPS. Equally, a business with a genuine construction trade that does not operate a bank account will fail at the first hurdle, regardless of its turnover or compliance record.</p>
<p>For the full GPS qualification framework, see <a href="/blog/cis-compliance/cis-gross-payment-status-guide">CIS gross payment status: how to qualify, apply and keep it</a>. The cash-flow value of GPS (avoiding the 20% deduction) is explained in the <a href="/blog/cis-compliance/gross-payment-status-cash-flow-guide">GPS cash-flow guide</a>.</p>`,
  },
  {
    slug: "due-diligence-april-2026",
    term: "Due Diligence (April 2026)",
    category: "Returns and compliance",
    primary_kw: "CIS due diligence April 2026 Finance Act",
    body: `<p><strong>CIS due diligence</strong>, as tightened by <strong>Finance Act 2026 (Royal Assent 18 March 2026)</strong>, is the set of checks a contractor must carry out before paying each subcontractor to protect its Gross Payment Status and avoid the knowledge-based penalties introduced by FA 2004 ss.62A and 62B (inserted by Finance Act 2026, in force 6 April 2026).</p>
<p>Under the pre-2026 regime, due diligence was a best practice rather than an enforceable standard. Finance Act 2026 changed that. HMRC can now revoke GPS <strong>immediately and without advance notice</strong> where a contractor &ldquo;knew or should have known&rdquo; about fraudulent activity in the supply chain. Crucially, <strong>failure to carry out due diligence is itself sufficient</strong> to meet the &ldquo;should have known&rdquo; standard: HMRC does not have to prove that the contractor was aware of the fraud, only that a competent contractor acting reasonably would have identified the risk.</p>
<p>HMRC expects contractors to complete <strong>three core steps before each payment</strong>:</p>
<ul>
<li><strong>Re-verify CIS status.</strong> Verify (or re-verify) each subcontractor through HMRC before payment and record the verification reference number and the date.</li>
<li><strong>Companies House legitimacy check.</strong> Confirm that a limited-company subcontractor is registered at Companies House, that the company details match those on the invoice, and that the company is not dissolved or in compulsory strike-off.</li>
<li><strong>Bank account name verification.</strong> Confirm that the payee name on the bank account matches the contracted party. Payments redirected to a mismatched account are a primary vector for supply-chain fraud.</li>
</ul>
<p>Documentary evidence of each check should be retained. GPS holders who cannot show a contemporaneous due-diligence record are exposed to revocation and the 5-year reapplication ban, as well as a penalty of <strong>20% of the relevant payment</strong> under FA 2004 s.62A.</p>
<p>The full April 2026 supply-chain compliance framework is at <a href="/blog/cis-compliance/cis-supply-chain-compliance-due-diligence">CIS supply chain compliance and due diligence</a>. The GPS consequences of failing the standard are at <a href="/blog/cis-compliance/cis-gross-payment-status-guide">CIS gross payment status: how to qualify, apply and keep it</a>.</p>`,
  },
  {
    slug: "knew-or-should-have-known",
    term: "Knew or Should Have Known Standard",
    category: "Returns and compliance",
    primary_kw: "knew or should have known CIS GPS",
    body: `<p>The <strong>&ldquo;knew or should have known&rdquo; standard</strong> is the knowledge test introduced by <strong>Finance Act 2026 (Royal Assent 18 March 2026, in force 6 April 2026)</strong> that determines when HMRC can revoke a contractor's Gross Payment Status or impose a knowledge-based penalty under FA 2004 ss.62A or 62B.</p>
<p>Before April 2026, HMRC had to demonstrate that a contractor <strong>actually knew</strong> about fraud or deliberate non-compliance in its supply chain before penalising it. Finance Act 2026 lowered the bar: a contractor who did not know but <strong>should have known</strong> (because a reasonably diligent contractor carrying out proper checks would have identified the risk) is now equally exposed. The distinction matters enormously in practice:</p>
<ul>
<li><strong>&ldquo;Knew&rdquo;:</strong> the contractor had direct knowledge that a connected party was deliberately failing to comply with CIS. HMRC must evidence this.</li>
<li><strong>&ldquo;Should have known&rdquo;:</strong> the contractor failed to carry out reasonable due diligence (re-verification, Companies House check, bank name verification) before making a payment. That failure is <em>itself</em> enough for HMRC to act, with no need to prove intent or direct knowledge.</li>
</ul>
<p>The practical consequence is that <strong>the absence of a due-diligence record is a liability risk</strong>. A contractor who pays a subcontractor without verifying their CIS status, checking their Companies House entry or confirming the bank account name cannot argue &ldquo;I did not know there was a problem&rdquo;: they should have known because they failed to look.</p>
<p>If HMRC determines the standard is met, the consequences include <strong>immediate GPS revocation with no advance notice</strong>, a <strong>five-year reapplication ban</strong>, and a penalty of <strong>20% of the relevant payment</strong> (FA 2004 s.62A) or <strong>20% of the sums treated as paid on a return</strong> (FA 2004 s.62B). For a contractor paying £200,000 a year in labour, the s.62A penalty exposure alone is up to £40,000.</p>
<p>The due-diligence checklist that satisfies the standard is explained at <a href="/blog/cis-compliance/cis-supply-chain-compliance-due-diligence">CIS supply chain compliance and due diligence</a>. The broader April 2026 rule changes are at <a href="/blog/cis-compliance/cis-april-2026-rule-changes">CIS April 2026 rule changes explained</a>.</p>`,
  },
  {
    slug: "section-62a-penalty",
    term: "Section 62A Penalty",
    category: "Returns and compliance",
    primary_kw: "FA 2004 section 62A CIS penalty",
    body: `<p>A <strong>section 62A penalty</strong> is a financial penalty imposed on a person who <strong>makes a payment under a construction contract</strong> knowing, or having reason to know, that a connected party has deliberately failed to comply with Construction Industry Scheme obligations. The penalty is set at <strong>20% of the payment</strong> and the liability falls on the <strong>payer</strong>.</p>
<p>FA 2004 section 62A was <strong>inserted by Finance Act 2026 (Royal Assent 18 March 2026)</strong> and came into force on <strong>6 April 2026</strong>. It is one of two new knowledge-based penalty provisions in the Finance Act 2026 CIS package; section 62B applies to returns rather than payments (see the separate entry). Together they give HMRC a direct penalty route against contractors who process payments despite awareness (or constructive awareness) of supply-chain non-compliance.</p>
<p>The key elements of a section 62A charge:</p>
<ul>
<li><strong>Trigger:</strong> making a payment under a construction contract while knowing (or having reason to know) of deliberate CIS non-compliance by a connected party.</li>
<li><strong>Rate:</strong> 20% of the payment made (not 30%, not a percentage of any tax lost by HMRC).</li>
<li><strong>Who is liable:</strong> the <strong>payer</strong> (the person who made the payment). This may be a company or an individual.</li>
<li><strong>Standard:</strong> &ldquo;knew or should have known&rdquo;: a failure to carry out reasonable due diligence satisfies the &ldquo;should have known&rdquo; limb without any need to show intent.</li>
</ul>
<p>Where a company is the payer and the company's own deliberate behaviour contributed to the non-compliance, HMRC can also pursue officers personally under existing officer-liability provisions, though those provisions operate separately from s.62A and do not attach a fixed percentage to director-level exposure.</p>
<p>For a worked example of the s.62A penalty and the due-diligence steps that prevent it, see <a href="/blog/cis-compliance/cis-april-2026-rule-changes">CIS April 2026 rule changes explained</a>. The supply-chain checks that protect against this liability are covered at <a href="/blog/cis-compliance/cis-supply-chain-compliance-due-diligence">CIS supply chain compliance and due diligence</a>.</p>`,
  },
  {
    slug: "section-62b-penalty",
    term: "Section 62B Penalty",
    category: "Returns and compliance",
    primary_kw: "FA 2004 section 62B CIS penalty",
    body: `<p>A <strong>section 62B penalty</strong> is a financial penalty imposed on a person who <strong>makes a CIS return</strong> treating certain sums as paid, while knowing, or having reason to know, that a connected party has deliberately failed to comply with Construction Industry Scheme obligations. The penalty is set at <strong>20% of the sums the return treats as paid</strong> and the liability falls on the <strong>return-maker</strong>.</p>
<p>FA 2004 section 62B was <strong>inserted by Finance Act 2026 (Royal Assent 18 March 2026)</strong> and came into force on <strong>6 April 2026</strong>. It is the companion provision to section 62A: s.62A targets the payment act; s.62B targets the return act. In a typical CIS arrangement, the same contractor will both make the payment (s.62A exposure) and file the monthly CIS300 reporting those payments (s.62B exposure), so both penalties can arise from the same transaction if the &ldquo;knew or should have known&rdquo; standard is met.</p>
<p>The key elements of a section 62B charge:</p>
<ul>
<li><strong>Trigger:</strong> making a CIS300 return that includes sums treated as paid, while knowing (or having reason to know) of deliberate CIS non-compliance by a connected party.</li>
<li><strong>Rate:</strong> 20% of the sums the return treats as paid (not a percentage of any tax HMRC considers lost).</li>
<li><strong>Who is liable:</strong> the <strong>return-maker</strong> (the contractor who filed the CIS300). This may be a company or an individual.</li>
<li><strong>Standard:</strong> &ldquo;knew or should have known&rdquo;: identical to the s.62A standard; constructive knowledge through failure to carry out due diligence is sufficient.</li>
</ul>
<p>Because s.62B attaches to the return rather than each individual payment, the penalty base is the total sums reported as paid on the return. A contractor who includes £150,000 of payments on a monthly CIS300 while meeting the knowledge standard faces a potential s.62B charge of <strong>£30,000 for that single return</strong>.</p>
<p>For the full context of both ss.62A and 62B within the April 2026 reforms, see <a href="/blog/cis-compliance/cis-april-2026-rule-changes">CIS April 2026 rule changes explained</a>. The due-diligence framework that prevents these charges is at <a href="/blog/cis-compliance/cis-supply-chain-compliance-due-diligence">CIS supply chain compliance and due diligence</a>.</p>`,
  },
  {
    slug: "five-year-reapplication-ban",
    term: "Five-Year Reapplication Ban",
    category: "Returns and compliance",
    primary_kw: "CIS GPS five-year reapplication ban",
    body: `<p>The <strong>five-year reapplication ban</strong> is the period during which a subcontractor whose Gross Payment Status has been revoked on fraud-related grounds is prohibited from reapplying for GPS. It was introduced by <strong>Finance Act 2026 (Royal Assent 18 March 2026, in force 6 April 2026)</strong>, replacing the previous one-year ban.</p>
<p>Before April 2026, a contractor who lost GPS because HMRC determined it had connections to supply-chain fraud was barred from reapplying for GPS for <strong>one year</strong>. Finance Act 2026 extended that to <strong>five years</strong>, a fivefold increase in the effective penalty period. The change was designed to make GPS fraud a genuinely unattractive risk, given that losing GPS has immediate and severe cash-flow consequences.</p>
<p>The cash-flow arithmetic is significant. A construction business with <strong>£500,000 a year in labour receipts</strong> that loses GPS moves from a 0% CIS deduction to a 20% deduction on every payment. That means <strong>£100,000 a year withheld by contractors</strong> as advance tax, rather than arriving in the business's bank account. Over a five-year ban, the cumulative cash withheld reaches approximately <strong>£500,000</strong>. That money is recoverable via Self Assessment or Corporation Tax, but only with a significant lag.</p>
<p>The five-year ban applies where GPS is revoked on <strong>fraud grounds</strong> (that is, where the &ldquo;knew or should have known&rdquo; standard is met). GPS lost through an ordinary compliance failure (a late Self Assessment return, for example) does not trigger the five-year ban; the subcontractor can reapply once a clean 12-month compliance record is re-established.</p>
<ul>
<li><strong>Old rule (pre-April 2026):</strong> 1-year reapplication ban on fraud-grounds revocation.</li>
<li><strong>New rule (from 6 April 2026):</strong> 5-year reapplication ban.</li>
<li><strong>Annual cash-flow cost example:</strong> approx. £100,000 for £500,000 turnover.</li>
<li><strong>Does not apply to:</strong> GPS loss through a compliance failure (only fraud-grounds revocation).</li>
</ul>
<p>The full GPS anti-fraud regime introduced by Finance Act 2026 is explained at <a href="/blog/cis-compliance/cis-april-2026-rule-changes">CIS April 2026 rule changes explained</a>. The GPS qualifying conditions are at <a href="/blog/cis-compliance/cis-gross-payment-status-guide">CIS gross payment status: how to qualify, apply and keep it</a>.</p>`,
  },
  {
    slug: "verification",
    term: "Verification (Subcontractor)",
    category: "Returns and compliance",
    primary_kw: "CIS subcontractor verification HMRC",
    body: `<p><strong>Subcontractor verification</strong> under the Construction Industry Scheme is the process by which a contractor confirms a subcontractor's CIS registration status with HMRC before making a payment, which determines the deduction rate to apply: <strong>0% for Gross Payment Status, 20% for a registered subcontractor, or 30% for an unregistered subcontractor</strong>.</p>
<p>Verification is a <strong>legal obligation</strong>, not an optional check. A contractor who pays a subcontractor without verifying cannot rely on applying a 20% rate if HMRC later establishes the subcontractor was unregistered: the contractor remains liable for the difference between the 20% applied and the 30% that should have been deducted. Applying the wrong rate because of missing verification is treated as a contractor error, with the contractor responsible for making good the shortfall to HMRC.</p>
<p>From <strong>6 April 2026</strong>, verification took on a second role as the <strong>foundation of the due-diligence duty</strong> introduced by Finance Act 2026. Re-verifying each subcontractor before each payment is one of three core steps a contractor must take to meet the &ldquo;knew or should have known&rdquo; standard that determines whether GPS can be revoked or a penalty under FA 2004 s.62A or s.62B applies. Contractors should <strong>log the verification reference number and the date</strong> of each verification check as contemporaneous evidence.</p>
<p>Once verified, the contractor receives confirmation of the subcontractor's status from HMRC: the verification reference number, the subcontractor's name and Unique Taxpayer Reference, and the applicable deduction rate. The contractor must then apply that rate to the labour element of each subsequent payment to that subcontractor. CIS deductions never apply to the materials element of an invoice.</p>
<ul>
<li><strong>HMRC CIS helpline:</strong> 0300 200 3210 (Monday to Friday, 8am to 6pm).</li>
<li><strong>Deduction rates:</strong> 0% (GPS), 20% (registered), 30% (unregistered).</li>
<li><strong>From April 2026:</strong> re-verification before each payment is a mandatory due-diligence step.</li>
<li><strong>Record:</strong> retain the verification reference number and date for each check.</li>
</ul>
<p>The verification process is explained in detail at <a href="/blog/cis-compliance/cis-subcontractor-verification">how to verify subcontractors under CIS and why it matters</a>. The deduction rates that verification determines are covered at <a href="/blog/cis-basics/cis-deduction-rates-explained">CIS deduction rates: 20%, 30% and gross payment status explained</a>.</p>`,
  },
  {
    slug: "employment-status",
    term: "Employment Status",
    category: "Returns and compliance",
    primary_kw: "CIS employment status self-employed test",
    body: `<p><strong>Employment status</strong> in the Construction Industry Scheme context is the determination of whether a worker on a construction site is genuinely <strong>self-employed</strong> (and therefore within CIS) or is actually an <strong>employee</strong> of the contractor (and therefore subject to PAYE and employer National Insurance instead).</p>
<p>Registration under CIS does not automatically make a worker self-employed. HMRC applies a separate, multi-factor employment status test that looks at the true nature of the working arrangement. The three primary factors are:</p>
<ul>
<li><strong>Control.</strong> Does the contractor direct how, when and where the worker carries out the work, or does the worker control their own methods? The greater the contractor's control, the stronger the argument for employment.</li>
<li><strong>Personal service.</strong> Is the worker required to do the work personally, or can they send a substitute? A genuine right of substitution (one that is exercised in practice) points towards self-employment.</li>
<li><strong>Mutuality of obligation.</strong> Is the contractor obliged to offer work and the worker obliged to accept it? Ongoing mutuality, particularly between jobs, is a strong indicator of employment.</li>
</ul>
<p>Getting employment status wrong is costly. A contractor who treats an employed worker as a self-employed CIS subcontractor becomes liable for <strong>backdated employer NIC at 15% on earnings above £5,000 a year</strong> (the rate from April 2025, carried into 2026/27), plus PAYE income tax and employee NIC, for every year the arrangement ran. HMRC's <strong>CEST tool</strong> (Check Employment Status for Tax) provides a starting-point assessment but is not binding, and its result can be challenged if the underlying facts are not accurately entered.</p>
<p>The risk is heightened in construction because labour-only subcontractors on long-running sites often work under arrangements that look, in substance, like employment even if they are structured as self-employment. HMRC construction-sector taskforces specifically target this.</p>
<p>A full explanation of how HMRC applies the three-part test in the construction context is at <a href="/blog/cis-basics/cis-employment-status-self-employed-test">CIS employment status: how HMRC tests whether you are self-employed or employed</a>. The comparison of CIS and PAYE treatment is at <a href="/blog/cis-basics/cis-vs-paye">CIS vs PAYE: the key differences for construction workers</a>.</p>`,
  },
  {
    slug: "retention-payments",
    term: "Retention Payments",
    category: "Returns and compliance",
    primary_kw: "CIS retention payments deduction",
    body: `<p><strong>Retention payments</strong> in the CIS context are sums withheld by a main contractor from the amounts due to a subcontractor until a defects period or a practical completion milestone has passed. The question of <strong>when CIS deductions apply</strong> to a retention is one of the most commonly misunderstood aspects of the scheme for subcontractors and contractors managing long-running construction projects.</p>
<p>HMRC's position is that a CIS deduction is triggered when a <strong>payment is actually made</strong>, not when the entitlement to be paid arises under the contract. This means that the deduction on a retention sum does not arise when the main contract reaches practical completion (when the subcontractor becomes contractually entitled to the retention). It arises when the contractor <strong>actually releases the retention and makes the payment</strong>. At that point, the contractor must apply the subcontractor's verified deduction rate (0%, 20% or 30%) to the labour element of the retention in the same way as any other CIS payment.</p>
<p>Practical implications for subcontractors:</p>
<ul>
<li>A retention released in tax year 2026/27 is subject to 2026/27 deduction rates, even if the original contract ran in an earlier year.</li>
<li>The CIS deduction on the retention is an advance against the subcontractor's Self Assessment or Corporation Tax liability for the year in which the retention is received, which may differ from the year in which the bulk of the contract payments were received.</li>
<li>Subcontractors should ensure that any CIS deduction statement they receive from the contractor covers retention payments separately, so that the deductions can be reconciled correctly with their annual tax position.</li>
</ul>
<p>For limited-company subcontractors, CIS deductions on retentions (like all CIS deductions) can be offset against PAYE and NIC liabilities in real time through the Employer Payment Summary, rather than waiting for a Corporation Tax repayment. Sole-trader subcontractors reclaim overpaid CIS, including deductions on retentions, through their Self Assessment return after the tax year.</p>
<p>The EPS real-time reclaim route for limited companies is explained at <a href="/blog/limited-company/cis-for-limited-companies-eps-reclaim">CIS for limited companies: how the EPS reclaim works</a>. The CIS deduction base (labour only, never materials) is set out at <a href="/blog/cis-basics/cis-deduction-rates-explained">CIS deduction rates explained</a>.</p>`,
  },
  {
    slug: "eps",
    term: "EPS (Employer Payment Summary)",
    category: "Returns and compliance",
    primary_kw: "EPS CIS reclaim limited company",
    body: `<p>An <strong>Employer Payment Summary (EPS)</strong> is a submission made by an employer through RTI (Real Time Information) payroll software to HMRC each month, reporting any adjustments to the PAYE and NIC liabilities that appear on the Full Payment Submission. For <strong>limited companies operating under CIS</strong>, the EPS is the mechanism through which the company offsets CIS deductions it has suffered against its monthly PAYE bill, creating a real-time recovery cycle rather than waiting until the tax year end.</p>
<p>The process works as follows: each month, the company calculates its PAYE and employer NIC liability for its employees. If the company has also suffered CIS deductions on payments it received from contractors during the month, it reports those deductions on the EPS. HMRC sets the CIS deductions suffered against the PAYE due. If CIS deductions exceed the PAYE liability, the surplus carries forward to the following month automatically. Any credit still unabsorbed at 5 April can be repaid by HMRC or set against the Corporation Tax bill, with HMRC targeting repayment within <strong>25 working days</strong>.</p>
<p>The EPS route is one of the most significant practical advantages of operating through a limited company for CIS subcontractors. A sole-trader subcontractor must wait until after the tax year to claim overpaid CIS through Self Assessment, a wait that can be 12 to 18 months. A limited company using the EPS can recover the same cash <strong>month by month</strong>, improving working capital materially.</p>
<ul>
<li><strong>Who can use it:</strong> limited companies that have suffered CIS deductions and operate a PAYE scheme.</li>
<li><strong>Offset mechanism:</strong> CIS deductions suffered reduce the PAYE and employer NIC due that month.</li>
<li><strong>Surplus:</strong> carries forward automatically if CIS exceeds PAYE.</li>
<li><strong>Repayment target:</strong> 25 working days for EPS-based CIS refunds.</li>
<li><strong>Year-end:</strong> any unabsorbed credit can be set against Corporation Tax or repaid.</li>
</ul>
<p>A full worked example of the monthly EPS reclaim cycle, including what happens when deductions exceed PAYE for several consecutive months, is at <a href="/blog/limited-company/cis-for-limited-companies-eps-reclaim">CIS for limited companies: how the EPS reclaim works and why timing matters</a>. If your company is owed a CIS refund and you are unsure whether the EPS route applies, see <a href="/cis-refund">our CIS refund service</a>.</p>`,
  },
];
