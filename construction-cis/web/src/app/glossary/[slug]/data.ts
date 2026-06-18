// Glossary entries for Trade Tax Specialists CIS glossary.
// Body must be raw HTML (not markdown). Add entries below; each key = slug.
// Categories: "CIS fundamentals" | "Deductions and rates" | "Returns and compliance"
//             | "Refunds and repayments" | "Business structures" | "VAT and MTD"

export type GlossaryEntry = {
  slug: string;
  term: string;
  category: string;
  primary_kw: string;
  body: string;
};

const GLOSSARY_LIST: GlossaryEntry[] = [
  // ---- batch1 ----
  // ── CIS fundamentals ────────────────────────────────────────────────────────

  {
    slug: "cis",
    term: "Construction Industry Scheme (CIS)",
    category: "CIS fundamentals",
    primary_kw: "what is the Construction Industry Scheme",
    body: `<p>The <strong>Construction Industry Scheme (CIS)</strong> is a set of HMRC rules that governs how contractors pay subcontractors for construction work and how tax is collected at source from those payments. Under CIS, a contractor deducts a percentage of the subcontractor's labour element before payment and passes that amount directly to HMRC as an advance against the subcontractor's income tax and National Insurance bill.</p>
<p>CIS was introduced to reduce tax evasion in the construction industry, where short-term, cash-based working arrangements made it easy for income to go unreported. Every UK contractor who pays a subcontractor for construction work must operate CIS, and most subcontractors in the sector fall within it regardless of whether they work as sole traders, partnerships or limited companies.</p>
<p>The scheme applies to a wide range of construction activities: building, demolition, repair, decoration, installation of systems such as heating or plumbing, and civil engineering. It does not apply to purely professional services such as architecture or surveying, or to the supply of materials alone.</p>
<p>For subcontractors, CIS deductions are <strong>not a final tax charge</strong>. They are advance payments that are offset against the subcontractor's actual tax liability at the end of the year through Self Assessment (for sole traders) or through the real-time Employer Payment Summary process (for limited companies). Most registered subcontractors pay more in deductions than their final bill, so a refund is common.</p>
<p>Three deduction rates apply in 2026/27: <strong>0%</strong> for subcontractors holding Gross Payment Status, <strong>20%</strong> for registered subcontractors, and <strong>30%</strong> for those who are unregistered. The deduction applies to the <strong>labour element only</strong>, not to the cost of materials on the same invoice.</p>
<ul>
  <li>Contractors must register for CIS before paying their first subcontractor.</li>
  <li>Subcontractors should register to access the 20% rate rather than the 30% unregistered rate.</li>
  <li>Gross Payment Status (0%) is available to subcontractors who pass three qualifying tests on business, turnover and tax compliance.</li>
</ul>
<p>For a fuller introduction see <a href="/blog/cis-basics/what-is-cis">what is CIS</a> and our guide to <a href="/blog/cis-basics/cis-deduction-rates-explained">CIS deduction rates explained</a>.</p>`,
  },

  {
    slug: "contractor",
    term: "Contractor",
    category: "CIS fundamentals",
    primary_kw: "what is a CIS contractor",
    body: `<p>A <strong>CIS contractor</strong> is a business or individual that pays other businesses or individuals (subcontractors) to carry out construction work, and as a result must operate the Construction Industry Scheme when making those payments.</p>
<p>Most contractors are businesses whose main trade is construction: builders, developers, civil engineering firms and specialist trade contractors such as electricians or plumbers who take on labour. However, the definition is wider than the trade itself suggests. A business whose primary activity is not construction can still become a <strong>deemed contractor</strong> if it spends £3 million or more a year on construction work (see the separate entry on deemed contractors).</p>
<p>Once a business is a contractor under CIS, it must:</p>
<ul>
  <li>Register for CIS with HMRC <strong>before paying the first subcontractor</strong>.</li>
  <li><strong>Verify</strong> each subcontractor's CIS status through the HMRC CIS online service before the first payment, so the correct deduction rate (0%, 20% or 30%) is applied.</li>
  <li>Deduct the correct percentage from the <strong>labour element</strong> of each payment and pass that amount to HMRC.</li>
  <li>File a <strong>CIS300 monthly return</strong> by the 19th of the following tax month, even in months where no payments are made (a nil return obligation reinstated from 6 April 2026).</li>
  <li>Issue a <strong>payment and deduction statement</strong> to each subcontractor for every payment made.</li>
</ul>
<p>Since April 2026, contractors also carry a <strong>due-diligence duty</strong> under Finance Act 2026. If a contractor knew, or should have known, that a subcontractor in their supply chain had deliberately failed to comply with CIS obligations, the contractor can face a penalty of 20% of the payment under FA 2004 s.62A. This means re-verifying subcontractor status, running Companies House checks and confirming bank account details before each payment is no longer optional good practice: it is a legal safeguard.</p>
<p>See <a href="/blog/cis-compliance/cis-for-contractors-monthly-responsibilities">CIS for contractors: your monthly responsibilities</a> and <a href="/blog/cis-compliance/cis-subcontractor-verification">how to verify subcontractors under CIS</a> for practical guidance.</p>`,
  },

  {
    slug: "subcontractor",
    term: "Subcontractor",
    category: "CIS fundamentals",
    primary_kw: "what is a CIS subcontractor",
    body: `<p>A <strong>CIS subcontractor</strong> is a business or individual that is paid by a contractor to carry out construction work, and whose payments are therefore subject to CIS deductions before they arrive in the subcontractor's bank account.</p>
<p>The label "subcontractor" in CIS does not depend on how the person describes themselves or what their contract says. It depends on the <strong>nature of the work and the payment arrangement</strong>. If you are being paid by a contractor to carry out construction operations in the UK, you are a subcontractor for CIS purposes, whether you work as a sole trader, a partner in a firm, or through a limited company.</p>
<p>Subcontractors do not have to register for CIS, but in practice registration is essential:</p>
<ul>
  <li><strong>Unregistered subcontractors</strong> have <strong>30%</strong> deducted from the labour element of every payment.</li>
  <li><strong>Registered subcontractors</strong> have only <strong>20%</strong> deducted.</li>
  <li>Subcontractors with <strong>Gross Payment Status</strong> receive the full payment with <strong>no deduction</strong> (0%).</li>
</ul>
<p>Because CIS deductions are an advance against the subcontractor's annual tax bill, and because they are taken before expenses and personal allowances are considered, most registered subcontractors overpay across the year. The typical annual refund for a sole-trader CIS subcontractor is around £2,000 to £3,000 (illustrative; individual results vary). Sole traders reclaim via Self Assessment after the tax year ends; limited companies can reclaim in real time using the Employer Payment Summary route.</p>
<p>Subcontractors must keep <strong>payment and deduction statements</strong> from every contractor they work for, as these are the primary evidence for any refund claim. See our guide to <a href="/blog/cis-refunds/cis-tax-refund-how-to-claim">how to claim your CIS tax refund</a> and <a href="/blog/cis-basics/how-to-register-for-cis">how to register for CIS</a>.</p>`,
  },

  {
    slug: "deemed-contractor",
    term: "Deemed contractor",
    category: "CIS fundamentals",
    primary_kw: "what is a deemed contractor CIS",
    body: `<p>A <strong>deemed contractor</strong> is a business whose main trade is <em>not</em> construction but which spends enough on construction work that HMRC treats it as a contractor for CIS purposes and requires it to operate the scheme.</p>
<p>The trigger is straightforward: if a non-construction business spends <strong>£3 million or more a year on construction work</strong> in any rolling 12-month period, it becomes a deemed contractor. From that point it must register for CIS, verify any subcontractors it pays, make the correct deductions and file monthly CIS300 returns, exactly as a mainstream construction contractor would.</p>
<p>Typical deemed contractors include:</p>
<ul>
  <li><strong>Property developers and investors</strong> who commission large-scale refurbishments or builds.</li>
  <li><strong>Large retailers and supermarkets</strong> that run continuous store-fit and maintenance programmes.</li>
  <li><strong>Housing associations and local authorities</strong> commissioning repair and maintenance contracts.</li>
  <li><strong>Manufacturers and utilities</strong> with ongoing capital works programmes.</li>
</ul>
<p>The deemed-contractor rule catches businesses that have no CIS expertise and no awareness that the scheme applies to them. The consequence of failing to register and deduct correctly is the same as for any contractor: late-filing penalties on the CIS300, potential penalties for unpaid deductions, and personal liability for directors under HMRC's officer-liability powers.</p>
<p>Once a business qualifies as a deemed contractor, the £3 million test is measured on a rolling 12-month basis. If spend falls below £3 million for a continuous period, HMRC can agree to de-register. In practice many businesses with large property portfolios or capital programmes remain deemed contractors indefinitely.</p>
<p>See <a href="/blog/cis-compliance/deemed-contractors-explained">deemed contractors explained</a> for the full analysis, including worked examples of the £3 million threshold and registration steps.</p>`,
  },

  {
    slug: "construction-operations",
    term: "Construction operations",
    category: "CIS fundamentals",
    primary_kw: "what counts as construction operations for CIS",
    body: `<p><strong>Construction operations</strong> is the term used in the CIS legislation to define which activities fall within the scheme. Only payments for construction operations are subject to CIS deductions: payments for activities outside the definition are not, even if the payer is a registered CIS contractor.</p>
<p>Activities that count as construction operations include:</p>
<ul>
  <li>Construction, alteration, repair, extension, demolition and dismantling of buildings and structures.</li>
  <li>Civil engineering works: roads, runways, railways, bridges, harbours and pipelines.</li>
  <li>Installation of systems within buildings: heating, lighting, air conditioning, water, gas, drainage, telecommunications and similar.</li>
  <li>Internal cleaning of buildings as part of a construction project (not routine commercial cleaning).</li>
  <li>Painting and decorating the internal or external surfaces of buildings.</li>
  <li>Operations preparatory to construction: site clearance, groundworks and excavation.</li>
</ul>
<p>Activities that are <strong>excluded</strong> from construction operations include:</p>
<ul>
  <li>Purely professional services: architecture, surveying, engineering design and project management.</li>
  <li>Manufacture or delivery of materials and components where no installation takes place.</li>
  <li>Carpet fitting in a domestic dwelling (not a "building" for these purposes).</li>
  <li>Plant hire where no operator is supplied.</li>
</ul>
<p>The boundary matters in practice. A structural engineer who only produces drawings is outside CIS; the same engineer who directly supervises a specialist construction operation on site may cross the line. When in doubt, the correct approach is to verify the subcontractor's CIS status through the HMRC CIS online service regardless, because the cost of getting it wrong (making a payment without deduction where one was due) falls on the contractor.</p>
<p>See <a href="/blog/cis-basics/what-construction-work-is-not-cis">what construction work is not CIS</a> for a detailed breakdown of excluded activities.</p>`,
  },

  {
    slug: "cis-registration",
    term: "CIS registration",
    category: "CIS fundamentals",
    primary_kw: "how to register for CIS",
    body: `<p><strong>CIS registration</strong> is the process of telling HMRC that a business is either a contractor that will be paying subcontractors, or a subcontractor that will be receiving CIS payments, or both at the same time.</p>
<p>Registration works differently depending on which role you are registering for:</p>
<ul>
  <li><strong>Contractors</strong> must register <em>before making the first payment to a subcontractor</em>. Registration is mandatory, not optional. A contractor who pays a subcontractor without being registered risks penalties for the unpaid deductions and interest.</li>
  <li><strong>Subcontractors</strong> do not have to register, but without registration they are taxed at <strong>30%</strong> on the labour portion of every payment rather than the <strong>20%</strong> rate that applies to registered subcontractors. In practice, registration is essential for anyone doing regular CIS work.</li>
</ul>
<p>To register, a subcontractor needs a valid <strong>Unique Taxpayer Reference (UTR)</strong> and, if they are a limited company, their company registration number. Sole traders also need their National Insurance number. Registration is done through the HMRC CIS online service or by calling the CIS helpline on <strong>0300 200 3210</strong> (Monday to Friday, 8am to 6pm).</p>
<p>After registration, the next step up for subcontractors is applying for <strong>Gross Payment Status</strong>, which removes CIS deductions altogether (0% rate). GPS requires passing a business test, a turnover test (at least £30,000 net CIS turnover for a sole trader) and a compliance test (all tax obligations met on time for the past 12 months).</p>
<p>Registration does not expire automatically, but HMRC can remove it (and GPS) if a subcontractor's compliance falls short. From April 2026 GPS can also be revoked immediately without advance notice under Finance Act 2026 where fraud is suspected in the supply chain.</p>
<p>See <a href="/blog/cis-basics/how-to-register-for-cis">how to register for CIS</a> and <a href="/gross-payment-status">Gross Payment Status</a> for the next steps after registration.</p>`,
  },

  {
    slug: "utr",
    term: "UTR (Unique Taxpayer Reference)",
    category: "CIS fundamentals",
    primary_kw: "what is a UTR number for CIS",
    body: `<p>A <strong>UTR (Unique Taxpayer Reference)</strong> is a 10-digit number that HMRC assigns to every individual and company registered for Self Assessment or Corporation Tax. In the context of CIS, the UTR is the primary identifier that ties a subcontractor to their HMRC record and determines what deduction rate a contractor must apply.</p>
<p>When a contractor verifies a subcontractor through the HMRC CIS online service, they enter the subcontractor's UTR (along with the subcontractor's name and, for a company, the company registration number). HMRC then returns one of three outcomes: the subcontractor holds Gross Payment Status (deduct at 0%), the subcontractor is registered (deduct at 20%), or the subcontractor is not found (deduct at 30%).</p>
<p>The UTR is therefore the <strong>key document a subcontractor must provide to every new contractor before the first payment</strong>. Without it, the contractor cannot verify and defaults to the 30% unregistered rate.</p>
<p>Key points about UTRs in CIS:</p>
<ul>
  <li>Sole traders have a <strong>personal UTR</strong> (10 digits, usually starting with a number such as 1 or 2). This is the same UTR used for Self Assessment.</li>
  <li>Limited companies have a <strong>company UTR</strong>, separate from the directors' personal UTRs. Both the company UTR and the Companies House registration number are needed for verification.</li>
  <li>Partnerships have a <strong>partnership UTR</strong> as well as individual UTRs for each partner. The partnership UTR is used for CIS verification.</li>
  <li>A UTR is issued when a person first registers for Self Assessment or when a company registers for Corporation Tax. New sole traders working in construction should register for Self Assessment promptly so their UTR arrives before they need to give it to a contractor.</li>
</ul>
<p>If you have lost your UTR, it appears on previous HMRC correspondence, tax returns and the HMRC app. See <a href="/blog/cis-basics/how-to-register-for-cis">how to register for CIS</a> for the full registration process, which covers getting your UTR as the first step.</p>`,
  },

  {
    slug: "hmrc-cis-online-service",
    term: "HMRC CIS online service",
    category: "CIS fundamentals",
    primary_kw: "HMRC CIS online service how to use",
    body: `<p>The <strong>HMRC CIS online service</strong> is the Government Gateway portal through which contractors carry out their core CIS obligations: verifying subcontractors, filing monthly CIS300 returns and viewing their CIS account.</p>
<p>The service is accessed through the HMRC online services portal at gov.uk using a Government Gateway user ID and password. Contractors must be registered for CIS before they can use it. The main functions are:</p>
<ul>
  <li><strong>Subcontractor verification.</strong> Before paying a subcontractor for the first time (or when verification status has lapsed), the contractor enters the subcontractor's UTR and name (and company registration number for limited companies). HMRC returns the correct deduction rate: 0% (Gross Payment Status), 20% (registered) or 30% (unregistered). The service also returns a <strong>verification number</strong>, which the contractor must record and include on the payment and deduction statement.</li>
  <li><strong>CIS300 monthly return filing.</strong> The contractor submits details of every subcontractor paid in the tax month (payments, materials split, deductions made and verification reference). The return must be filed by the <strong>19th of the following tax month</strong>.</li>
  <li><strong>Nil return filing.</strong> If no subcontractors were paid in a month, a nil return must still be filed from April 2026 (reinstated obligation).</li>
  <li><strong>Account view.</strong> Contractors can review previous returns and check payment records.</li>
</ul>
<p>The CIS online service does not handle Gross Payment Status applications directly: those are made by contacting HMRC on the CIS helpline (<strong>0300 200 3210</strong>, Monday to Friday, 8am to 6pm) or in writing. From April 2026 the service feeds directly into HMRC's fraud-detection work: the "should have known" standard in Finance Act 2026 expects contractors to use it as a due-diligence step before every payment, not just on first engagement.</p>
<p>For a full walkthrough of contractor monthly obligations see <a href="/blog/cis-compliance/cis-for-contractors-monthly-responsibilities">CIS for contractors: your monthly responsibilities</a> and <a href="/blog/cis-compliance/cis-subcontractor-verification">how to verify subcontractors under CIS</a>.</p>`,
  },

  // ── Deductions and rates ─────────────────────────────────────────────────────

  {
    slug: "cis-deduction",
    term: "CIS deduction",
    category: "Deductions and rates",
    primary_kw: "what is a CIS deduction",
    body: `<p>A <strong>CIS deduction</strong> is the amount a contractor withholds from a subcontractor's payment and passes directly to HMRC as an advance towards the subcontractor's income tax and National Insurance liability for the year.</p>
<p>The deduction is calculated on the <strong>labour element only</strong>. If a subcontractor's invoice is £1,200, made up of £800 labour and £400 materials, the deduction applies to the £800 figure, not the full £1,200. On a 20% deduction rate, the contractor pays the subcontractor £1,040 (£800 minus £160, plus the full £400 materials) and sends £160 to HMRC.</p>
<p>The deduction rate depends on the subcontractor's registration status in 2026/27:</p>
<ul>
  <li><strong>0%</strong> for a subcontractor holding Gross Payment Status (paid in full, no deduction).</li>
  <li><strong>20%</strong> for a subcontractor who is registered with CIS.</li>
  <li><strong>30%</strong> for a subcontractor who is not registered with CIS.</li>
</ul>
<p>The deduction is not a final tax charge. At the end of the tax year, the subcontractor declares their total income and expenses on a Self Assessment return (sole traders) or through Corporation Tax (limited companies). The CIS deductions already paid are set against the actual tax bill. Because expenses, personal allowances and the basic-rate band typically reduce the real liability below the amount deducted, most registered subcontractors receive a <strong>refund</strong>.</p>
<p>Contractors must record every deduction on a <strong>payment and deduction statement</strong> and include it in their monthly CIS300 return. Subcontractors should keep every statement they receive, as these are the evidence base for any refund claim. See <a href="/blog/cis-basics/cis-deduction-rates-explained">CIS deduction rates explained</a> and our <a href="/calculators/cis-deduction-calculator">CIS deduction calculator</a> to see the arithmetic on your own figures.</p>`,
  },

  {
    slug: "deduction-rates",
    term: "Deduction rates (0%, 20%, 30%)",
    category: "Deductions and rates",
    primary_kw: "CIS deduction rates 2026",
    body: `<p>The <strong>CIS deduction rates</strong> are the three percentages a contractor applies to the labour element of a subcontractor's payment to calculate how much is withheld and paid to HMRC. For 2026/27 the rates are unchanged at <strong>0%, 20% and 30%</strong>.</p>
<p>Which rate applies depends entirely on the subcontractor's registration status when the contractor verifies them through the HMRC CIS online service:</p>
<ul>
  <li><strong>0% (Gross Payment Status).</strong> The subcontractor receives the full payment with nothing withheld. They must have passed all three GPS qualifying tests (business, turnover and compliance) and HMRC must have approved GPS. This is the best outcome for a subcontractor's cash flow.</li>
  <li><strong>20% (registered).</strong> The subcontractor is registered for CIS. The contractor deducts 20p for every £1 of labour and passes it to HMRC. The subcontractor receives 80% of their labour element plus 100% of any verified materials costs.</li>
  <li><strong>30% (unregistered).</strong> HMRC cannot find the subcontractor's UTR on the CIS register, or they have not registered. The contractor deducts 30p for every £1 of labour. The 10-point gap between the 20% and 30% rates is the primary financial reason for subcontractors to register.</li>
</ul>
<p>A worked example on a £1,500 invoice (£1,000 labour, £500 materials):</p>
<ul>
  <li>GPS: subcontractor receives £1,500 (no deduction).</li>
  <li>Registered: subcontractor receives £1,300 (£200 deducted on labour; £500 materials paid in full).</li>
  <li>Unregistered: subcontractor receives £1,200 (£300 deducted on labour; £500 materials paid in full).</li>
</ul>
<p>All three deductions are advances against the subcontractor's eventual tax bill, not a final charge. See <a href="/blog/cis-basics/cis-deduction-rates-explained">CIS deduction rates explained</a> and use the <a href="/calculators/cis-deduction-calculator">CIS deduction calculator</a> for your own invoice breakdown.</p>`,
  },

  {
    slug: "labour-only-deduction-base",
    term: "Labour-only deduction base",
    category: "Deductions and rates",
    primary_kw: "CIS deduction labour only not materials",
    body: `<p>The <strong>labour-only deduction base</strong> is the rule that CIS deductions are calculated only on the part of a subcontractor's payment that represents labour and construction services, never on the cost of materials that the subcontractor has bought for the job.</p>
<p>This is one of the most commonly misunderstood points in CIS. A subcontractor whose invoice totals £2,000 does not simply have 20% (or 30%) applied to the whole figure. The invoice must be split. If £1,200 is labour and £800 is materials, the deduction applies to the £1,200 only. At 20%, the contractor deducts £240, pays the subcontractor £1,760 and sends £240 to HMRC.</p>
<p>The materials element is excluded because the subcontractor has already paid for those materials themselves, usually with their own VAT registered supplier or builder's merchant. Applying a CIS deduction to materials would effectively tax a pass-through cost, which the legislation specifically prevents.</p>
<p>For the exclusion to apply, the materials must genuinely have been <strong>purchased by the subcontractor</strong> for the specific job. Materials that are instead provided by the contractor, or that the subcontractor is merely delivering as a supplier rather than incorporating into the works, do not qualify for the exclusion.</p>
<p>In practice, subcontractors should always present a <strong>clearly split invoice</strong> showing labour and materials separately. An invoice that does not split the figures gives the contractor grounds to treat the entire amount as labour and deduct accordingly. The same labour-only logic underpins the <strong>Gross Payment Status turnover test</strong>: the £30,000 net turnover threshold for a sole trader is measured after excluding materials, mirroring the deduction base.</p>
<ul>
  <li>Always split your invoice into labour and materials with a clear description.</li>
  <li>Keep purchase receipts for materials so you can evidence the materials figure if challenged.</li>
</ul>
<p>See <a href="/blog/cis-basics/cis-invoice-splitting-labour-materials">CIS invoice splitting: how to correctly separate labour and materials</a> for a full guide, and use the <a href="/calculators/cis-invoice-splitter">CIS invoice splitter calculator</a> to check your own figures.</p>`,
  },

  {
    slug: "materials-deduction",
    term: "Materials deduction",
    category: "Deductions and rates",
    primary_kw: "are materials subject to CIS deduction",
    body: `<p>The <strong>materials deduction rule</strong> in CIS means that the cost of materials a subcontractor buys for a job is <strong>excluded from the CIS deduction base</strong>: the contractor does not apply the 20% or 30% rate to that portion of the invoice.</p>
<p>Only the <strong>labour and construction-services element</strong> of a payment is subject to CIS deduction. This is often called the labour-only deduction base. Materials on the same invoice are paid to the subcontractor in full, without any withholding, because the subcontractor has already borne those costs and is simply recovering them.</p>
<p>A worked example:</p>
<ul>
  <li>Invoice total: £3,000 (£1,800 labour, £1,200 materials).</li>
  <li>CIS deduction at 20%: £1,800 multiplied by 20% = £360.</li>
  <li>Contractor pays subcontractor: £2,640 (£3,000 minus £360).</li>
  <li>Contractor pays HMRC: £360.</li>
  <li>Materials (£1,200) are paid in full within the £2,640 received.</li>
</ul>
<p>The exclusion has limits. To qualify, the materials must be:</p>
<ul>
  <li><strong>Purchased by the subcontractor</strong> specifically for the contract (not provided or owned by the contractor).</li>
  <li><strong>Incorporated into the works</strong> (not merely delivered as a separate supply).</li>
  <li>Evidenced by purchase receipts the subcontractor can produce if HMRC asks.</li>
</ul>
<p>Where an invoice does not split labour and materials clearly, the contractor is entitled to treat the whole amount as labour and deduct at the full rate. Subcontractors who want to protect their materials exclusion must present a split invoice with separate line items.</p>
<p>The materials exclusion also links to <strong>Gross Payment Status</strong>. The GPS turnover test measures net CIS income after excluding both VAT and materials costs: a sole trader needs at least £30,000 of net labour-only CIS turnover to qualify. Subcontractors who fail to split their invoices properly risk understating their materials exclusion and, paradoxically, overstating their net CIS turnover, which can affect the GPS compliance calculation.</p>
<p>See <a href="/blog/cis-basics/cis-invoice-splitting-labour-materials">CIS invoice splitting: how to correctly separate labour and materials</a> for detailed guidance on how to structure your invoices correctly.</p>`,
  },

  {
    slug: "verification-number",
    term: "Verification number",
    category: "Deductions and rates",
    primary_kw: "what is a CIS verification number",
    body: `<p>A <strong>CIS verification number</strong> is the reference code that HMRC issues to a contractor when that contractor verifies a subcontractor's status through the HMRC CIS online service (or by phone). It is the proof that the contractor completed the verification step and is applying the correct deduction rate as instructed by HMRC.</p>
<p>When a contractor verifies a subcontractor, HMRC returns one of three deduction rates (0%, 20% or 30%) along with the verification number. The contractor must:</p>
<ul>
  <li>Record the verification number against the subcontractor's record.</li>
  <li>Include it on every <strong>payment and deduction statement</strong> issued to that subcontractor.</li>
  <li>Include it in the relevant monthly <strong>CIS300 return</strong>.</li>
</ul>
<p>A verification number is not a one-off permanent reference. HMRC expects contractors to <strong>re-verify subcontractors</strong> before the first payment in a new tax year, and at any point where there is reason to believe the subcontractor's status may have changed (for example if they appear to have lost GPS). Since April 2026, re-verification before each payment is also one of the three due-diligence steps that protects a contractor against GPS revocation under Finance Act 2026's "knew or should have known" standard.</p>
<p>Practically, verification numbers follow a standard format (for example V followed by digits). They are generated automatically by the HMRC system and the contractor has no control over them. The key discipline is to record them accurately and not to make or continue payments without a current verification on file.</p>
<ul>
  <li>Keep verification records for at least six years (the standard HMRC audit window).</li>
  <li>Re-verify whenever a subcontractor's circumstances appear to have changed.</li>
  <li>Never make a payment at 20% on the basis of a verbal assurance of GPS: verify first and get the number.</li>
</ul>
<p>See <a href="/blog/cis-compliance/cis-subcontractor-verification">how to verify subcontractors under CIS</a> for the step-by-step process.</p>`,
  },

  {
    slug: "payment-and-deduction-statement",
    term: "Payment and deduction statement",
    category: "Deductions and rates",
    primary_kw: "CIS payment and deduction statement what must it show",
    body: `<p>A <strong>payment and deduction statement</strong> is a document a contractor must issue to every subcontractor for each payment made under CIS. It is the subcontractor's official record of how much was paid, how much was deducted and on what basis, and it is essential for the subcontractor's tax return and any refund claim.</p>
<p>HMRC requires the statement to show:</p>
<ul>
  <li>The contractor's name, UTR and, if applicable, employer reference.</li>
  <li>The subcontractor's name and UTR.</li>
  <li>The verification number used for that subcontractor.</li>
  <li>The tax month and tax year to which the payment relates.</li>
  <li>The gross amount of the payment (before deduction).</li>
  <li>The cost of materials included within the payment (the exempt element).</li>
  <li>The amount on which the deduction was calculated (labour element).</li>
  <li>The deduction rate applied (0%, 20% or 30%).</li>
  <li>The amount of deduction made.</li>
  <li>The net amount paid to the subcontractor.</li>
</ul>
<p>Contractors must issue statements within <strong>14 days of the end of the tax month</strong> in which the payment was made. Statements can be issued on paper or electronically (for example by email) provided the subcontractor agrees to electronic delivery.</p>
<p>Subcontractors should collect and retain every statement they receive throughout the year. When completing a Self Assessment return or applying for a CIS refund, the total deductions across all statements form the credit that is set against the tax bill. Missing statements can delay or reduce a refund. If a contractor refuses to issue a statement or issues one with incorrect figures, the subcontractor should report this to HMRC.</p>
<p>See <a href="/blog/cis-compliance/cis-payment-deduction-statements-guide">CIS payment and deduction statements: what they must show</a> for a detailed explanation including a specimen statement layout.</p>`,
  },

  // ── Business structures ──────────────────────────────────────────────────────

  {
    slug: "gross-payment-status",
    term: "Gross Payment Status (GPS)",
    category: "Business structures",
    primary_kw: "what is Gross Payment Status CIS",
    body: `<p><strong>Gross Payment Status (GPS)</strong> is the highest tier of CIS registration. A subcontractor holding GPS is paid the <strong>full invoice amount with no CIS deduction</strong> (0%), settling their own tax through Self Assessment or Corporation Tax at the end of the year rather than through advance withholding.</p>
<p>To qualify for GPS in 2026/27 a subcontractor must pass three tests simultaneously:</p>
<ul>
  <li><strong>Business test.</strong> The applicant carries out construction work in the UK and operates the business through a bank account.</li>
  <li><strong>Turnover test.</strong> Net annual CIS turnover (excluding VAT and the cost of materials) must reach: <strong>£30,000</strong> for sole traders; £30,000 per partner or £100,000 total for partnerships; £30,000 per director or £100,000 total for limited companies; and £30,000 per controller for closely controlled companies with five or fewer controllers. The measurement window is the last 12 months of CIS work.</li>
  <li><strong>Compliance test.</strong> All tax obligations must have been met on time in the past 12 months: no late Self Assessment returns, no overdue tax, no PAYE defaults.</li>
</ul>
<p>The cash-flow benefit of GPS is substantial. A subcontractor earning £500,000 a year who loses GPS reverts to the 20% registered rate: that is roughly £100,000 a year in cash held by HMRC rather than in the business.</p>
<p>Since Finance Act 2026 (enacted, Royal Assent 18 March 2026), GPS can be <strong>revoked immediately without advance notice</strong> where HMRC believes a contractor knew or should have known about fraudulent links in the supply chain. A 5-year reapplication ban (up from 1 year) applies where revocation is on fraud grounds. This means maintaining GPS now requires active due diligence: re-verifying subcontractors, checking Companies House records and confirming bank details before payments.</p>
<p>See <a href="/gross-payment-status">Gross Payment Status</a>, our guide to <a href="/blog/cis-compliance/cis-gross-payment-status-guide">how to qualify, apply and keep GPS in 2026</a>, and the <a href="/calculators/cis-gps-eligibility-checker">GPS eligibility checker calculator</a>.</p>`,
  },

  {
    slug: "sole-trader",
    term: "Sole trader",
    category: "Business structures",
    primary_kw: "CIS sole trader subcontractor tax",
    body: `<p>A <strong>sole trader</strong> in the CIS context is a self-employed individual who works in construction in their own name, without a limited company, and is paid by contractors who apply CIS deductions to the labour element of their invoices.</p>
<p>Sole traders are the largest group of CIS subcontractors (HMRC estimates 1.4 million or more registered CIS subcontractors in total, the majority of whom are unincorporated). They are the primary audience for most CIS content because the compliance burden and the refund opportunity are most acute for individuals trading in their own name.</p>
<p>Key features of the sole-trader CIS position in 2026/27:</p>
<ul>
  <li><strong>Deduction rate.</strong> Registered sole traders have 20% deducted from their labour income before payment; unregistered traders face 30%. Sole traders with GPS receive payment in full at 0%.</li>
  <li><strong>Self Assessment.</strong> A sole trader must file a Self Assessment return each year. CIS deductions suffered are entered as a credit that reduces the income tax and Class 4 NIC bill. The personal allowance (£12,570 in 2026/27) and business expenses (tools, van, fuel, use-of-home) further reduce the taxable profit, which is why most sole traders end up with a refund.</li>
  <li><strong>Class 4 NIC.</strong> Sole traders pay Class 4 NIC at <strong>6%</strong> on profits between £12,570 and £50,270, and 2% above. This is included in the Self Assessment calculation.</li>
  <li><strong>GPS turnover threshold.</strong> A sole trader needs net CIS turnover of at least <strong>£30,000</strong> (excluding VAT and materials) in the last 12 months to qualify for GPS.</li>
  <li><strong>Refund route.</strong> Refunds for sole traders come through Self Assessment, typically 5 to 10 working days after HMRC processes an online return.</li>
  <li><strong>MTD ITSA.</strong> Sole traders with annual gross income above £50,000 must comply with Making Tax Digital for Income Tax from April 2026.</li>
</ul>
<p>See <a href="/blog/cis-basics/cis-sole-trader-vs-limited-company">CIS: sole trader or limited company, which structure works better?</a> and our guide to <a href="/blog/cis-refunds/cis-self-assessment-complete-guide">CIS Self Assessment for subcontractors</a>.</p>`,
  },

  {
    slug: "limited-company-subcontractor",
    term: "Limited company subcontractor",
    category: "Business structures",
    primary_kw: "CIS limited company subcontractor",
    body: `<p>A <strong>limited company subcontractor</strong> is a private limited company (typically a personal service company or small construction firm) that is paid by contractors for construction work, with CIS deductions applied to the company's labour income and paid to HMRC by the contractor.</p>
<p>Operating through a limited company rather than as a sole trader changes several aspects of the CIS position, in ways that are both more advantageous and more administratively demanding:</p>
<ul>
  <li><strong>Real-time reclaim via EPS.</strong> Unlike sole traders (who wait until after the tax year to reclaim via Self Assessment), a limited company can reclaim CIS deductions suffered <strong>in real time</strong> by offsetting them against PAYE and employer NIC liabilities owed on the company's monthly Employer Payment Summary. If deductions suffered exceed PAYE/NIC due, HMRC repays the balance, typically within 25 working days. This is a major cash-flow advantage over the sole-trader route.</li>
  <li><strong>Verification.</strong> When a contractor verifies a limited company, they use the <strong>company's UTR</strong> and its <strong>Companies House registration number</strong>. The director's personal UTR is separate and is not used for CIS verification.</li>
  <li><strong>GPS turnover test.</strong> A limited company needs net CIS turnover of at least <strong>£30,000 per director</strong> or <strong>£100,000 total</strong> (excluding VAT and materials) to qualify for GPS.</li>
  <li><strong>Corporation Tax, not Self Assessment.</strong> The company pays Corporation Tax at <strong>25%</strong> (main rate, profits above £250,000) or <strong>19%</strong> (small profits rate, below £50,000) rather than income tax. Directors extract profit via a mix of salary and dividends: dividend tax rates in 2026/27 are <strong>10.75%</strong> (basic), <strong>35.75%</strong> (higher) and <strong>39.35%</strong> (additional rate).</li>
  <li><strong>Finance Act 2026 liability.</strong> Where a director knowingly makes a payment knowing a connected subcontractor has deliberately failed to comply with CIS, they may face personal exposure under HMRC's officer-liability rules (separate from the company's FA 2004 ss.62A/62B penalties). Active due diligence on every payment is essential.</li>
</ul>
<p>See <a href="/blog/cis-basics/cis-sole-trader-vs-limited-company">CIS: sole trader or limited company?</a> and <a href="/blog/limited-company/cis-for-limited-companies-eps-reclaim">how the EPS reclaim works for limited companies</a> for the full comparison.</p>`,
  },
  // ---- batch2 ----
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
    body: `<p>A <strong>section 62B penalty</strong> is a financial penalty imposed on a person who <strong>makes a CIS return</strong> treating certain sums as paid, while knowing, or having reason to know, that a connected party has deliberately failed to comply with Construction Industry Scheme obligations. The penalty is <strong>an amount equal to the sum the return treats as deducted and paid</strong>, that is <strong>100% of the sums the return treats as paid, with no percentage reduction</strong>, and the liability falls on the <strong>return-maker</strong>.</p>
<p>FA 2004 section 62B was <strong>inserted by Finance Act 2026 (Royal Assent 18 March 2026)</strong> and came into force on <strong>6 April 2026</strong>. It is the companion provision to section 62A: s.62A targets the payment act; s.62B targets the return act. In a typical CIS arrangement, the same contractor will both make the payment (s.62A exposure) and file the monthly CIS300 reporting those payments (s.62B exposure), so both penalties can arise from the same transaction if the &ldquo;knew or should have known&rdquo; standard is met.</p>
<p>The key elements of a section 62B charge:</p>
<ul>
<li><strong>Trigger:</strong> making a CIS300 return that includes sums treated as paid, while knowing (or having reason to know) of deliberate CIS non-compliance by a connected party.</li>
<li><strong>Amount:</strong> an amount equal to the whole sum the return treats as deducted and paid, that is 100% of those sums (not 20%, and not a percentage of any tax HMRC considers lost).</li>
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
  // ---- batch3 ----
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

export const GLOSSARY: Record<string, GlossaryEntry> = Object.fromEntries(
  GLOSSARY_LIST.map((e) => [e.slug, e]),
);
