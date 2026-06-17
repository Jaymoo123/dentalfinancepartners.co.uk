// Glossary entries for Contractor Tax Accountants IR35 / contractor glossary.
// Body must be raw HTML (not markdown). Add entries below; each key = slug.
// Categories (canonical order):
//   "IR35 fundamentals" | "Status tests" | "Off-payroll mechanics"
//   | "Limited company tax" | "Umbrella and employment" | "Expenses, VAT and compliance"
// All figures verified for 2026/27 against the locked house positions.

export type GlossaryEntry = {
  slug: string;
  term: string;
  category: string;
  primary_kw: string;
  body: string;
};

const GLOSSARY_LIST: GlossaryEntry[] = [
  // ── IR35 fundamentals ────────────────────────────────────────────────────────

  {
    slug: "ir35",
    term: "IR35",
    category: "IR35 fundamentals",
    primary_kw: "what is IR35",
    body: `<p><strong>IR35</strong> is the common name for the UK tax rules that decide whether a contractor working through their own limited company is, for tax purposes, genuinely in business on their own account or is effectively a disguised employee of the client they work for. Where the rules bite, the income from that engagement is taxed broadly like employment income rather than as company profit drawn through salary and dividends.</p>
<p>The label "IR35" is used loosely to cover the whole topic, but it actually spans two separate sets of rules in Part 2 of the Income Tax (Earnings and Pensions) Act 2003. The original <strong>intermediaries legislation</strong> sits in <a href="/glossary/chapter-8">Chapter 8</a> (in force since 6 April 2000), under which the contractor's own <a href="/glossary/personal-service-company">personal service company (PSC)</a> assesses status and accounts for any tax due. The newer <strong>off-payroll working rules</strong> sit in <a href="/glossary/chapter-10">Chapter 10</a>, under which the <a href="/glossary/end-client">end client</a> determines status and the <a href="/glossary/fee-payer">fee-payer</a> deducts tax before paying the PSC.</p>
<p>Which chapter applies turns on the size of the end client. If the client is <strong>small</strong> (or wholly overseas with no UK connection), Chapter 10 does not apply and the PSC stays responsible under Chapter 8. If the client is medium or large, Chapter 10 applies and responsibility shifts to the client and fee-payer. See the <a href="/glossary/small-company-exemption">small company exemption</a> for the thresholds.</p>
<p>An engagement is either <a href="/glossary/inside-ir35">inside IR35</a> (taxed as employment) or <a href="/glossary/outside-ir35">outside IR35</a> (the PSC retains its profit-extraction freedom). Status is decided by the multi-factorial case-law test covering <a href="/glossary/control">control</a>, <a href="/glossary/substitution">substitution</a> and <a href="/glossary/mutuality-of-obligation">mutuality of obligation</a>, with the whole picture governing. For a fuller introduction see our <a href="/blog/ir35-basics">IR35 basics</a> guides.</p>`,
  },

  {
    slug: "chapter-8",
    term: "Chapter 8 (intermediaries legislation)",
    category: "IR35 fundamentals",
    primary_kw: "what is IR35 Chapter 8",
    body: `<p><strong>Chapter 8</strong> of Part 2 of the Income Tax (Earnings and Pensions) Act 2003 is the original <strong>intermediaries legislation</strong>, in force since 6 April 2000. It is the part of <a href="/glossary/ir35">IR35</a> under which the contractor's own <a href="/glossary/personal-service-company">personal service company (PSC)</a> assesses its own status and, where an engagement is inside IR35, calculates and operates a <a href="/glossary/deemed-employment-payment">deemed employment payment</a> on its own account.</p>
<p>Chapter 8 applies where the <a href="/glossary/end-client">end client</a> is <strong>small</strong> under the <a href="/glossary/small-company-exemption">small company exemption</a>, or where the client is wholly overseas with no UK connection. In those cases the off-payroll rules in <a href="/glossary/chapter-10">Chapter 10</a> do not apply, so the responsibility for getting status right (and paying any tax) sits squarely with the PSC, not the client.</p>
<p>The key practical feature that distinguishes Chapter 8 from Chapter 10 is the <strong>5% expenses allowance</strong>. When computing the deemed employment payment under Chapter 8, the PSC deducts a flat 5% of the relevant engagement income as an administrative allowance. That allowance is <strong>retained under Chapter 8 but abolished under Chapter 10</strong>. The statutory anchors are ITEPA 2003 ss.48 to 61, with the deemed payment computed under s.54 and s.58.</p>`,
  },

  {
    slug: "chapter-10",
    term: "Chapter 10 (off-payroll working)",
    category: "IR35 fundamentals",
    primary_kw: "what is off-payroll working Chapter 10",
    body: `<p><strong>Chapter 10</strong> of Part 2 of the Income Tax (Earnings and Pensions) Act 2003 contains the <strong>off-payroll working rules</strong>. These applied to public sector clients from 6 April 2017 and were extended to medium and large private-sector clients from 6 April 2021. Chapter 10 is the part of <a href="/glossary/ir35">IR35</a> under which the <strong>end client decides status</strong>, not the contractor.</p>
<p>Under Chapter 10 the <a href="/glossary/end-client">end client</a> must issue a <a href="/glossary/status-determination-statement">Status Determination Statement (SDS)</a> for each engagement, and the <a href="/glossary/fee-payer">fee-payer</a> (usually the agency closest to the PSC) operates PAYE and employee National Insurance, and pays employer National Insurance at 15% on top, before paying the net amount to the <a href="/glossary/personal-service-company">PSC</a>. There is <strong>no 5% expenses allowance</strong> under Chapter 10, unlike <a href="/glossary/chapter-8">Chapter 8</a>.</p>
<p>Chapter 10 applies only where the end client is medium or large. If the client is <strong>small</strong> under the <a href="/glossary/small-company-exemption">small company exemption</a>, responsibility falls back to the PSC under Chapter 8. The statutory hooks are ITEPA 2003 ss.61K to 61X, with the deemed direct payment in s.61N. For the practical mechanics of how inside-IR35 income is taxed under each regime, see <a href="/glossary/deemed-employment-payment">deemed employment payment</a>.</p>`,
  },

  {
    slug: "personal-service-company",
    term: "Personal service company (PSC)",
    category: "IR35 fundamentals",
    primary_kw: "what is a personal service company PSC",
    body: `<p>A <strong>personal service company (PSC)</strong> is a limited company through which an individual contractor provides their services to clients, typically as the sole director and shareholder. It is the standard trading structure for UK contractors and is the "intermediary" that the <a href="/glossary/ir35">IR35</a> rules are designed to look through.</p>
<p>Operating through a PSC has real advantages for an <a href="/glossary/outside-ir35">outside-IR35</a> contractor: profit can be extracted as a tax-efficient mix of salary and <a href="/glossary/dividend">dividends</a>, retained earnings can be left in the company, and an <strong>employer pension contribution</strong> is available as the single biggest tax-efficient extraction lever. The company pays <a href="/glossary/corporation-tax-marginal-relief">corporation tax</a> at 19% on small profits and 25% at the main rate, with marginal relief in between.</p>
<p>The trade-off is responsibility. A single-director PSC cannot claim the <a href="/glossary/employment-allowance">Employment Allowance</a>, which shapes the optimal salary level, and the company is a <strong>close company</strong>, so overdrawn director's loans trigger a <a href="/glossary/directors-loan-s455">s.455 charge</a>. Where an engagement is <a href="/glossary/inside-ir35">inside IR35</a>, much of the tax efficiency of the PSC is lost on that income, which is when an <a href="/glossary/umbrella-company">umbrella company</a> often becomes the simpler route.</p>`,
  },

  {
    slug: "inside-ir35",
    term: "Inside IR35",
    category: "IR35 fundamentals",
    primary_kw: "what does inside IR35 mean",
    body: `<p>An engagement is <strong>inside IR35</strong> when, after applying the status tests, the contractor is treated for tax purposes as if they were an employee of the <a href="/glossary/end-client">end client</a> rather than genuinely in business on their own account. The income from that engagement is then taxed broadly like employment income, with PAYE and National Insurance applied.</p>
<p>The practical consequence depends on which regime applies. Under <a href="/glossary/chapter-10">Chapter 10</a> (medium or large client), the <a href="/glossary/fee-payer">fee-payer</a> operates PAYE and employee NIC on the payment, and pays employer NIC at 15% plus the <a href="/glossary/apprenticeship-levy">Apprenticeship Levy</a>, before the net reaches the <a href="/glossary/personal-service-company">PSC</a>. Under <a href="/glossary/chapter-8">Chapter 8</a> (small or overseas client), the PSC self-assesses and operates a <a href="/glossary/deemed-employment-payment">deemed employment payment</a>, but keeps the 5% expenses allowance.</p>
<p>For a genuinely inside-IR35 engagement, the tax-efficient salary and <a href="/glossary/dividend">dividend</a> split normally available through a PSC is largely lost, so an <a href="/glossary/umbrella-company">umbrella company</a> is often the simpler and more economic route (no PSC running costs, no double layer of PAYE admin). Whether to keep the PSC depends on whether the contractor also holds <a href="/glossary/outside-ir35">outside-IR35</a> work. Note that inside-IR35 home-to-client travel is generally not deductible, because each engagement is treated as a separate employment.</p>`,
  },

  {
    slug: "outside-ir35",
    term: "Outside IR35",
    category: "IR35 fundamentals",
    primary_kw: "what does outside IR35 mean",
    body: `<p>An engagement is <strong>outside IR35</strong> when, after applying the status tests, the contractor is genuinely in business on their own account rather than a disguised employee of the <a href="/glossary/end-client">end client</a>. The income can then be retained in the <a href="/glossary/personal-service-company">PSC</a> and extracted as a tax-efficient mix of salary and <a href="/glossary/dividend">dividends</a>, and the contractor keeps the full range of allowable business expenses and pension planning.</p>
<p>Status is not a matter of what the contract says it is. It is decided by the multi-factorial case-law test covering <a href="/glossary/control">control</a>, <a href="/glossary/substitution">substitution</a> and <a href="/glossary/mutuality-of-obligation">mutuality of obligation</a>, with the tribunal standing back to ask, on the whole picture, whether the hypothetical contract is one of employment. Genuine professional autonomy, a real right of substitution and being in business on your own account all point outside.</p>
<p>A <strong>CEST result, a contract review, or both</strong> can support an outside determination, but none of them is a guarantee on its own. HMRC and tribunals look at the <strong>actual working practices</strong>, so a clean contract paired with employee-like working practices will not hold. Under <a href="/glossary/chapter-10">Chapter 10</a> it is the client, not the contractor, who issues the <a href="/glossary/status-determination-statement">SDS</a> that records an outside conclusion. See <a href="/glossary/cest">CEST</a> for the limits of HMRC's status tool.</p>`,
  },

  // ── Status tests ─────────────────────────────────────────────────────────────

  {
    slug: "cest",
    term: "CEST",
    category: "Status tests",
    primary_kw: "what is CEST IR35 tool",
    body: `<p><strong>CEST</strong> (Check Employment Status for Tax) is HMRC's online tool for working out whether an engagement is <a href="/glossary/inside-ir35">inside</a> or <a href="/glossary/outside-ir35">outside IR35</a>. It asks a series of questions about <a href="/glossary/substitution">substitution</a>, <a href="/glossary/control">control</a> and financial risk, and was updated on 30 April 2025 to add a dedicated <a href="/glossary/mutuality-of-obligation">mutuality of obligation</a> question and an upfront "is there a contract" gate.</p>
<p>HMRC says it will <strong>stand behind a CEST result</strong> where the inputs are accurate, consistent with the actual working practices, in line with the guidance, and there is no avoidance. That makes CEST a useful first screen and a valuable audit-trail document for an engagement.</p>
<p>The promise has real limits, however. CEST does <strong>not bind a tribunal</strong>; it is only as good as the answers, so a determination that does not match the real working practices is worthless; and its treatment of mutuality of obligation is narrower than the case law, so it can return "outside" or refuse to decide on facts a tribunal might view differently. <strong>Never treat a CEST "outside" result as a guarantee.</strong> It should always be backed by a contract review and a working-practices assessment. See our <a href="/glossary/status-determination-statement">SDS</a> entry for how a client records its conclusion under Chapter 10.</p>`,
  },

  {
    slug: "status-determination-statement",
    term: "Status Determination Statement (SDS)",
    category: "Status tests",
    primary_kw: "what is a Status Determination Statement SDS",
    body: `<p>A <strong>Status Determination Statement (SDS)</strong> is the document a medium or large <a href="/glossary/end-client">end client</a> must issue under <a href="/glossary/chapter-10">Chapter 10</a> for each engagement, stating its conclusion on whether the contractor is <a href="/glossary/inside-ir35">inside</a> or <a href="/glossary/outside-ir35">outside IR35</a>, together with the <strong>reasons for that conclusion</strong>. The conclusion must be reached with <a href="/glossary/reasonable-care">reasonable care</a>.</p>
<p>The client must pass the SDS to both the <strong>worker</strong> and the <strong>next party in the chain</strong> (the agency or <a href="/glossary/fee-payer">fee-payer</a>). Two consequences flow from getting this wrong. If the client does not take reasonable care, the SDS is invalid and the client itself becomes the deemed employer liable for the PAYE and NIC. If the client fails to pass the SDS down the chain, the liability sits with the client until it does.</p>
<p>A worker who disagrees can use the <a href="/glossary/client-led-disagreement-process">client-led disagreement process</a>: the client must consider the representations and respond within 45 days, either confirming the SDS with reasons or issuing a new one. A client that issues a <a href="/glossary/blanket-determination">blanket determination</a> across a whole category of roles without individual assessment is very likely failing the reasonable-care requirement. The statutory hook is ITEPA 2003 s.61NA.</p>`,
  },

  {
    slug: "mutuality-of-obligation",
    term: "Mutuality of obligation",
    category: "Status tests",
    primary_kw: "what is mutuality of obligation IR35",
    body: `<p><strong>Mutuality of obligation (MOO)</strong> is one of the three core elements of the employment status test. In broad terms it is the obligation on the engager to offer and pay for work, and on the worker to accept and personally perform it. It is part of the irreducible minimum from <em>Ready Mixed Concrete v Minister of Pensions</em> [1968] 2 QB 497, alongside <a href="/glossary/control">control</a> and personal service.</p>
<p>The modern position, confirmed by the Supreme Court in <em>Professional Game Match Officials Ltd v HMRC</em> [2024] UKSC 29, is that MOO can exist <strong>within a single engagement</strong>: once an appointment is accepted there are obligations on both sides. So the absence of any obligation to offer further work between assignments does not, by itself, put a contractor <a href="/glossary/outside-ir35">outside IR35</a>.</p>
<p>The key point for contractors is that MOO is <strong>necessary but not sufficient</strong>. Even where MOO and control are both present, the tribunal must still stand back and ask, on the whole picture, whether the hypothetical contract is one of employment, including whether the worker is genuinely in business on their own account. HMRC's <a href="/glossary/cest">CEST</a> tool treats MOO more narrowly than the case law, which is one reason a CEST result is not the last word.</p>`,
  },

  {
    slug: "control",
    term: "Control",
    category: "Status tests",
    primary_kw: "what is control IR35 status test",
    body: `<p><strong>Control</strong> is one of the three core elements of the employment status test for <a href="/glossary/ir35">IR35</a>. It asks how much the <a href="/glossary/end-client">end client</a> directs <strong>what</strong> the contractor does, and <strong>how, when and where</strong> they do it. The more the client controls these things, the more employment-like the engagement looks.</p>
<p>A contractor who is told precisely how to carry out the work, who is line-managed, who must keep set hours and who has no autonomy over method is exhibiting strong employment pointers. By contrast, genuine professional autonomy over how the work is done, the ability to organise your own time, and freedom from day-to-day supervision all point towards self-employment and an <a href="/glossary/outside-ir35">outside-IR35</a> position.</p>
<p>Control sits alongside <a href="/glossary/substitution">substitution</a> and <a href="/glossary/mutuality-of-obligation">mutuality of obligation</a> as part of the irreducible minimum from <em>Ready Mixed Concrete</em> [1968] 2 QB 497. Modern authority (<em>PGMOL</em> [2024] UKSC 29) confirms that control is a necessary precondition but is not, on its own, decisive: the whole picture governs. As always, the firm's line is that the <strong>actual working practices</strong> matter more than the contract wording.</p>`,
  },

  {
    slug: "substitution",
    term: "Substitution",
    category: "Status tests",
    primary_kw: "what is right of substitution IR35",
    body: `<p><strong>Substitution</strong> in an <a href="/glossary/ir35">IR35</a> context is the question of whether the contractor must perform the work <strong>personally</strong>, or whether they have a genuine right to send someone else (a substitute) to do it in their place. Personal service is part of the irreducible minimum employment test, so a real right of substitution points away from employment.</p>
<p>For a substitution clause to carry weight it must be <strong>genuine and largely unfettered</strong>: the contractor pays the substitute themselves, and the client cannot unreasonably refuse a suitably qualified replacement. A clause that exists only on paper, that has never been used, or that the client can veto at will, is treated as a "sham" and carries little weight. As with the rest of the status test, the working practices override the wording.</p>
<p>A genuine right of substitution is one of the strongest <a href="/glossary/outside-ir35">outside-IR35</a> pointers available, but it is <strong>not a guarantee on its own</strong>. Even with a real substitution clause, the tribunal still weighs <a href="/glossary/control">control</a>, <a href="/glossary/mutuality-of-obligation">mutuality of obligation</a> and the whole picture. Contractors should not rely on a substitution clause alone to claim outside status. See <a href="/glossary/cest">CEST</a>, which tests substitution as one of its questions.</p>`,
  },

  {
    slug: "reasonable-care",
    term: "Reasonable care",
    category: "Status tests",
    primary_kw: "what is reasonable care IR35 SDS",
    body: `<p><strong>Reasonable care</strong> is the standard a medium or large <a href="/glossary/end-client">end client</a> must meet when reaching the conclusion in a <a href="/glossary/status-determination-statement">Status Determination Statement (SDS)</a> under <a href="/glossary/chapter-10">Chapter 10</a>. The client must genuinely assess the individual engagement and form a properly reasoned view, rather than applying a label without thought.</p>
<p>The consequence of failing to take reasonable care is significant: the SDS is <strong>invalid</strong>, and the client itself becomes the deemed employer liable for the PAYE and NIC, even where there is an agency or <a href="/glossary/fee-payer">fee-payer</a> below it in the chain. Reasonable care is therefore not a box-ticking formality; it is the gateway to the client passing the tax liability down the chain.</p>
<p>The clearest example of a failure of reasonable care is a <a href="/glossary/blanket-determination">blanket determination</a>: a client applying "inside IR35" to a whole category of contractors without assessing each engagement individually. The firm's stance is that blanket determinations are bad practice and legally risky for the client, and a contractor faced with one can use the <a href="/glossary/client-led-disagreement-process">client-led disagreement process</a> to seek an individual assessment. The statutory hook is ITEPA 2003 s.61NA, with HMRC guidance at ESM10014.</p>`,
  },

  {
    slug: "client-led-disagreement-process",
    term: "Client-led disagreement process",
    category: "Status tests",
    primary_kw: "IR35 client-led disagreement process 45 days",
    body: `<p>The <strong>client-led disagreement process</strong> is the statutory route under <a href="/glossary/chapter-10">Chapter 10</a> by which a worker (or the <a href="/glossary/fee-payer">fee-payer</a>) can challenge a <a href="/glossary/status-determination-statement">Status Determination Statement (SDS)</a> they believe is wrong. It applies where a medium or large <a href="/glossary/end-client">end client</a> has determined an engagement to be <a href="/glossary/inside-ir35">inside</a> or <a href="/glossary/outside-ir35">outside IR35</a> and the worker disagrees.</p>
<p>The worker makes representations to the client setting out why they think the determination is wrong. The client must then <strong>consider those representations and respond within 45 days</strong>, either confirming the original SDS with reasons or issuing a new SDS reaching a different conclusion. The process is "client-led" because the client makes the final decision, but it is obliged to respond and to give reasons.</p>
<p>The disagreement process is the contractor's main formal tool against a <a href="/glossary/blanket-determination">blanket determination</a>, where a client has applied an "inside" label across a category of roles without individual assessment. Such a determination is likely to be a failure of <a href="/glossary/reasonable-care">reasonable care</a>, and the disagreement process gives the contractor a route to demand an individual assessment. The statutory hook is ITEPA 2003 s.61T, with HMRC guidance at ESM10015.</p>`,
  },

  {
    slug: "blanket-determination",
    term: "Blanket determination",
    category: "Status tests",
    primary_kw: "what is a blanket IR35 determination",
    body: `<p>A <strong>blanket determination</strong> is where a medium or large <a href="/glossary/end-client">end client</a> applies a single status conclusion, almost always "<a href="/glossary/inside-ir35">inside IR35</a>", to a whole category of contractors or roles <strong>without assessing each engagement individually</strong>. It became common around the April 2021 extension of the <a href="/glossary/chapter-10">off-payroll rules</a> to the private sector, as risk-averse clients sought to avoid the cost of getting determinations wrong.</p>
<p>The firm's stance is that a genuine blanket determination is <strong>bad practice and legally risky for the client</strong>. A <a href="/glossary/status-determination-statement">Status Determination Statement</a> must be reached with <a href="/glossary/reasonable-care">reasonable care</a> on the facts of the individual engagement. A determination issued across a category of roles without that individual assessment is very likely to be a failure of reasonable care, which can invalidate the SDS and move the deemed-employer liability to the client.</p>
<p>A contractor faced with a blanket determination is not without recourse. They can use the <a href="/glossary/client-led-disagreement-process">client-led disagreement process</a> to make representations and require an individual assessment, with the client obliged to respond within 45 days. The careful distinction is between a true blanket policy (risky) and a client that has assessed genuinely similar roles consistently after proper consideration (defensible).</p>`,
  },

  // ── Off-payroll mechanics ────────────────────────────────────────────────────

  {
    slug: "deemed-employment-payment",
    term: "Deemed employment payment",
    category: "Off-payroll mechanics",
    primary_kw: "what is a deemed employment payment IR35",
    body: `<p>A <strong>deemed employment payment</strong> is the mechanism by which inside-<a href="/glossary/ir35">IR35</a> income is converted into something taxed broadly like employment income. What actually happens depends on which regime applies to the engagement.</p>
<p>Under <a href="/glossary/chapter-10">Chapter 10</a> (medium or large client), the <a href="/glossary/fee-payer">fee-payer</a> treats the payment to the <a href="/glossary/personal-service-company">PSC</a>, after deducting any VAT and the direct cost of materials, as a <strong>deemed direct payment</strong>. It operates PAYE and employee Class 1 NIC on it, and pays employer Class 1 NIC at <strong>15%</strong> plus the <a href="/glossary/apprenticeship-levy">Apprenticeship Levy</a> on top, before paying the net to the PSC. There is <strong>no 5% expenses allowance</strong> under Chapter 10.</p>
<p>Under <a href="/glossary/chapter-8">Chapter 8</a> (small or overseas client), the PSC self-assesses and computes a deemed employment payment at year-end. It takes the total relevant engagement income, deducts a flat <strong>5% of that income</strong> as an administrative allowance (retained under Chapter 8), then actual allowable expenses, employer pension contributions and any salary already paid, grosses down for employer NIC, and treats the balance as deemed salary subject to PAYE and NIC. The 5% allowance is the key difference between the two regimes. The statutory hooks are ITEPA 2003 s.61N (Chapter 10) and ss.54/58 (Chapter 8).</p>`,
  },

  {
    slug: "fee-payer",
    term: "Fee-payer",
    category: "Off-payroll mechanics",
    primary_kw: "what is the fee-payer IR35 off-payroll",
    body: `<p>The <strong>fee-payer</strong> is the party in an <a href="/glossary/chapter-10">off-payroll (Chapter 10)</a> chain that is responsible for operating PAYE and National Insurance on an <a href="/glossary/inside-ir35">inside-IR35</a> engagement. It is usually the <strong>agency closest to the contractor's <a href="/glossary/personal-service-company">PSC</a></strong>, the party that actually pays the PSC. Where there is no agency, the <a href="/glossary/end-client">end client</a> is the fee-payer.</p>
<p>Once the end client has issued a <a href="/glossary/status-determination-statement">Status Determination Statement</a> concluding that an engagement is inside IR35, the fee-payer must, before paying the PSC, deduct any VAT and the direct cost of materials, operate PAYE and employee Class 1 NIC on the remainder, and pay employer Class 1 NIC at 15% and the <a href="/glossary/apprenticeship-levy">Apprenticeship Levy</a> on top. The net amount then reaches the PSC having already been taxed.</p>
<p>The fee-payer's obligations are not unlimited. If the end client fails to pass down a valid SDS, or fails to take <a href="/glossary/reasonable-care">reasonable care</a>, the liability can move <strong>up the chain to the client</strong> rather than resting with the fee-payer. HMRC's debt-transfer provisions also allow it to recover an unpaid PAYE debt from another party in the chain (ultimately the client) where a party fails to meet its obligations or cannot pay. See <a href="/glossary/deemed-employment-payment">deemed employment payment</a> for the calculation mechanics.</p>`,
  },

  {
    slug: "end-client",
    term: "End client",
    category: "Off-payroll mechanics",
    primary_kw: "who is the end client IR35",
    body: `<p>The <strong>end client</strong> is the organisation that ultimately receives the contractor's services, the business the work is actually done for. In an <a href="/glossary/chapter-10">off-payroll (Chapter 10)</a> chain it is the party at the top, above any agency, and its size and conduct determine how <a href="/glossary/ir35">IR35</a> operates for the engagement.</p>
<p>The end client's size decides which regime applies. If the client is <strong>small</strong> under the <a href="/glossary/small-company-exemption">small company exemption</a> (or wholly overseas with no UK connection), Chapter 10 does not apply and the <a href="/glossary/personal-service-company">PSC</a> remains responsible under <a href="/glossary/chapter-8">Chapter 8</a>. If the client is medium or large, Chapter 10 applies and the client takes on the determination duty.</p>
<p>Under Chapter 10 the end client must issue a <a href="/glossary/status-determination-statement">Status Determination Statement</a> with <a href="/glossary/reasonable-care">reasonable care</a> and pass it down the chain. If it fails on either count, the deemed-employer liability falls on the client rather than the <a href="/glossary/fee-payer">fee-payer</a>. The client also operates the <a href="/glossary/client-led-disagreement-process">client-led disagreement process</a> where a worker challenges a determination. So while the contractor does the work, under Chapter 10 it is the end client, not the contractor, who is in the driving seat on status.</p>`,
  },

  {
    slug: "small-company-exemption",
    term: "Small company exemption",
    category: "Off-payroll mechanics",
    primary_kw: "IR35 small company exemption thresholds",
    body: `<p>The <strong>small company exemption</strong> is the rule that takes a medium-size contractor engagement out of the <a href="/glossary/chapter-10">off-payroll (Chapter 10)</a> rules where the <a href="/glossary/end-client">end client</a> is <strong>small</strong>. In that case Chapter 10 does not apply and the <a href="/glossary/personal-service-company">PSC</a> stays responsible for its own status under <a href="/glossary/chapter-8">Chapter 8</a>.</p>
<p>"Small" is defined by reference to the Companies Act 2006 s.382 conditions, imported into the off-payroll rules by ITEPA 2003 s.60A. A company is small for a financial year if it meets <strong>two or more</strong> of three conditions. For financial years beginning on or after 6 April 2025 the thresholds are: <strong>turnover not more than £15m</strong> (raised from £10.2m), <strong>balance sheet total not more than £7.5m</strong> (raised from £5.1m), and <strong>not more than 50 employees</strong> (unchanged). A company usually has to meet, or cease to meet, the conditions in two consecutive financial years before its status changes.</p>
<p>The timing matters and is easy to get wrong. Because a client's obligation for a tax year is set by reference to its last financial year ending before that tax year, plus the two-consecutive-years rule, the <strong>earliest</strong> a previously medium client can drop out of scope on the back of the raised thresholds is <strong>6 April 2027</strong> (and for many year-ends 6 April 2028). So for 2026/27, most contractors should assume their medium or large clients are <strong>still in scope</strong> unless the client has confirmed otherwise.</p>`,
  },

  {
    slug: "off-payroll-set-off",
    term: "Off-payroll set-off (offset)",
    category: "Off-payroll mechanics",
    primary_kw: "off-payroll set-off offset rules IR35",
    body: `<p>The <strong>off-payroll set-off</strong> (or offset) is a statutory rule, in force from <strong>6 April 2024</strong>, that prevents the double taxation that used to arise when HMRC found a client or <a href="/glossary/fee-payer">fee-payer</a> had wrongly treated an engagement as <a href="/glossary/outside-ir35">outside IR35</a>.</p>
<p>Before April 2024, HMRC assessed the <strong>full PAYE and NIC</strong> on the deemed employer without any credit for the tax the worker and <a href="/glossary/personal-service-company">PSC</a> had already paid on the same income (corporation tax on PSC profits, income tax and employee NIC on salary, and income tax on <a href="/glossary/dividend">dividends</a>). The same income was effectively taxed twice. From 6 April 2024, the set-off lets HMRC reduce the deemed employer's PAYE liability by an estimate of those taxes already paid.</p>
<p>Two points are important. First, the offset <strong>reduces but does not eliminate</strong> the deemed employer's exposure: it credits worker and PSC taxes already paid, but not the employer NIC, which was never paid in the first place. Second, it is an <strong>HMRC-operated estimate on a trigger event</strong> (typically a Reg 80 determination), not an automatic netting the contractor or client can rely on. It applies to errors arising from 6 April 2017 (public sector) or 6 April 2021 (private sector), with the offset itself available from 6 April 2024.</p>`,
  },

  // ── Limited company tax ──────────────────────────────────────────────────────

  {
    slug: "dividend",
    term: "Dividend",
    category: "Limited company tax",
    primary_kw: "contractor dividend tax rates 2026/27",
    body: `<p>A <strong>dividend</strong> is a distribution of a company's post-corporation-tax profit to its shareholders. For a contractor running a <a href="/glossary/personal-service-company">PSC</a>, dividends are the main way profit is extracted alongside a modest salary, because they carry <strong>no National Insurance</strong> and are taxed at lower rates than salary.</p>
<p>For 2026/27 the dividend tax rates are <strong>10.75% (ordinary)</strong>, <strong>35.75% (upper)</strong> and <strong>39.35% (additional)</strong>. The ordinary and upper rates rose on 6 April 2026 (from 8.75% and 33.75%) under Finance Act 2026 s.4; the additional rate is unchanged. The first <strong>£500</strong> of dividends each year is covered by the dividend allowance and taxed at 0%. Dividends sit on top of other income and are taxed in their own bands after non-savings and savings income.</p>
<p>Dividends can only be paid from genuine distributable profits, and the company should document each one with a board minute and a dividend voucher. Drawings taken ahead of declared profit create an overdrawn director's loan account, which can trigger a <a href="/glossary/directors-loan-s455">s.455 charge</a>. The dividend-rate rise on 6 April 2026 narrowed the incorporation advantage somewhat, so the optimal salary and dividend split should be modelled rather than assumed. See <a href="/glossary/corporation-tax-marginal-relief">corporation tax</a> for the company-side charge that comes first.</p>`,
  },

  {
    slug: "corporation-tax-marginal-relief",
    term: "Corporation tax marginal relief",
    category: "Limited company tax",
    primary_kw: "corporation tax marginal relief 2026/27",
    body: `<p><strong>Corporation tax</strong> is the tax a <a href="/glossary/personal-service-company">PSC</a> pays on its profits before any profit is extracted as salary or <a href="/glossary/dividend">dividends</a>. For 2026/27 the <strong>small profits rate is 19%</strong> where augmented profits do not exceed £50,000, and the <strong>main rate is 25%</strong> where they exceed £250,000. Finance Act 2026 made no change to these rates.</p>
<p>Between £50,000 and £250,000, the main rate applies but is reduced by <strong>marginal relief</strong>, using a standard fraction of <strong>3/200</strong>. The effect is an <strong>effective marginal rate of about 26.5%</strong> on profits in that band, which is higher than both the small profits rate and the main rate. Many contractor PSCs fall squarely in this marginal band, so it is the rate that matters most for planning.</p>
<p>The £50,000 and £250,000 limits are <strong>divided by the number of associated companies</strong>. Two companies are associated where one controls the other or both are under common control, so a contractor with several companies, or a connected spouse who also runs a PSC, can see each company's bands shrink. This should always be flagged and checked, not assumed away. The statutory hooks are CTA 2010 Part 3, ss.18 to 18N. See <a href="/glossary/dividend">dividend</a> for how the after-tax profit is then extracted.</p>`,
  },

  {
    slug: "directors-loan-s455",
    term: "Director's loan / s.455",
    category: "Limited company tax",
    primary_kw: "director's loan s.455 charge rate 2026/27",
    body: `<p>A <strong>director's loan</strong> arises when a director takes money out of their <a href="/glossary/personal-service-company">PSC</a> that is not salary, a <a href="/glossary/dividend">dividend</a>, or a repayment of money they had previously lent the company. A PSC is a <strong>close company</strong>, so an overdrawn director's loan account (drawings taken ahead of declared profit) triggers a <strong>section 455 charge</strong>.</p>
<p>The company pays corporation tax at the dividend upper rate on the loan still outstanding <strong>9 months and 1 day after the period-end</strong>. That rate is <strong>33.75% on loans made before 6 April 2026</strong> and <strong>35.75% on loans made on or after 6 April 2026</strong>, tracking the Finance Act 2026 s.4 dividend upper rate. The charge is <strong>temporary</strong>: s.458 relief repays it once the loan is repaid, released or written off, but the relief is deferred to 9 months and 1 day after the end of the accounting period in which repayment occurs. Section 455 is therefore not a permanent tax, but it is a real cash-flow cost.</p>
<p>A separate issue arises where the loan exceeds <strong>£10,000</strong> at any point in the year: that creates a <strong>beneficial-loan benefit in kind</strong> unless interest is paid at HMRC's official rate. The statutory hooks are CTA 2010 s.455 (charge), s.458 (relief) and s.464A onward. When the time comes to extract retained reserves and close the company, see <a href="/glossary/members-voluntary-liquidation">MVL</a> and the <a href="/glossary/taar">TAAR</a>.</p>`,
  },

  {
    slug: "business-asset-disposal-relief",
    term: "Business Asset Disposal Relief (BADR)",
    category: "Limited company tax",
    primary_kw: "Business Asset Disposal Relief BADR rate 2026/27",
    body: `<p><strong>Business Asset Disposal Relief (BADR)</strong> reduces the Capital Gains Tax rate on qualifying business disposals, up to a <strong>£1m lifetime limit per individual</strong>. For a contractor it most commonly applies when winding up a <a href="/glossary/personal-service-company">PSC</a> through a <a href="/glossary/members-voluntary-liquidation">Members' Voluntary Liquidation</a> and distributing the reserves as capital.</p>
<p>The BADR rate has been rising. It was 14% for disposals from 6 April 2025 to 5 April 2026, and is <strong>18% for disposals on or after 6 April 2026</strong>, so the <strong>2026/27 rate is 18%</strong>. The £1m lifetime limit is unchanged. To qualify, conditions must be met throughout the <strong>2-year period to disposal</strong>: the company is the individual's personal company (at least 5% of ordinary share capital and voting rights, plus a 5% economic entitlement), the individual is an officer or employee, and the company is trading.</p>
<p>Whether BADR is worth pursuing depends on the size of the reserves, the £1m limit, the 18% rate (now the same as the standard CGT rate for many disposals), and crucially the <a href="/glossary/taar">winding-up TAAR</a>. If the contractor intends to keep working in the same field within two years of the distribution, the TAAR can re-characterise the capital distribution as an income <a href="/glossary/dividend">dividend</a>, in which case BADR is irrelevant. Always check the TAAR first and model the income alternative. The statutory hook is TCGA 1992 ss.169H to 169S.</p>`,
  },

  {
    slug: "members-voluntary-liquidation",
    term: "Members Voluntary Liquidation (MVL)",
    category: "Limited company tax",
    primary_kw: "Members Voluntary Liquidation MVL contractor company",
    body: `<p>A <strong>Members' Voluntary Liquidation (MVL)</strong> is the formal, solvent way of closing a limited company and distributing its remaining reserves to the shareholders. For a contractor closing a <a href="/glossary/personal-service-company">PSC</a> with retained profit, an MVL allows those reserves to be distributed as <strong>capital</strong> rather than as an income <a href="/glossary/dividend">dividend</a>, potentially within <a href="/glossary/business-asset-disposal-relief">Business Asset Disposal Relief</a>.</p>
<p>The attraction is the tax rate. Where it applies, BADR taxes the capital distribution at <strong>18% (2026/27)</strong> up to the £1m lifetime limit, which can be lower than the income <a href="/glossary/dividend">dividend</a> rate (up to 39.35%) on the same reserves. An MVL is carried out by a licensed insolvency practitioner and is only available where the company is solvent and can pay its debts in full.</p>
<p>The major trap is the <a href="/glossary/taar">winding-up TAAR</a> (ITTOIA 2005 s.396B). If the contractor carries on the same or a similar trade within two years of the distribution and a main purpose of the winding up was to reduce income tax, the capital distribution is re-characterised as an income dividend and BADR falls away. This is the classic "phoenix" pattern (liquidate, take capital, restart the same contracting business). An MVL should therefore never be presented as a clean capital exit for a contractor who intends to keep working in the same field within two years.</p>`,
  },

  {
    slug: "taar",
    term: "TAAR (winding-up / phoenix)",
    category: "Limited company tax",
    primary_kw: "winding up TAAR phoenix company contractor",
    body: `<p>The <strong>winding-up TAAR</strong> (Targeted Anti-Avoidance Rule, ITTOIA 2005 s.396B) is the rule that can turn a capital distribution from a <a href="/glossary/members-voluntary-liquidation">Members' Voluntary Liquidation</a> back into a taxable income <a href="/glossary/dividend">dividend</a>. It exists to stop the "phoenix" pattern, where a contractor liquidates a <a href="/glossary/personal-service-company">PSC</a> to take the reserves as capital (at <a href="/glossary/business-asset-disposal-relief">BADR</a> rates) and then restarts essentially the same business.</p>
<p>The TAAR applies only where <strong>all four conditions</strong> are met:</p>
<ul>
<li><strong>Condition A:</strong> the individual held at least <strong>5%</strong> of the company immediately before the winding up.</li>
<li><strong>Condition B:</strong> the company was a <strong>close company</strong> at some point in the 2 years to the winding up.</li>
<li><strong>Condition C:</strong> within <strong>2 years</strong> of the distribution the individual continues, or is involved in, the <strong>same or a similar trade or activity</strong>.</li>
<li><strong>Condition D:</strong> it is reasonable to assume a <strong>main purpose</strong> of the winding up was to avoid or reduce income tax.</li>
</ul>
<p>Condition C, combined with the main-purpose test in Condition D, is the one that catches contractors who liquidate and then keep contracting in the same field. Where the TAAR bites, the distribution is taxed as an income dividend (up to 39.35% in 2026/27) and BADR is irrelevant. The TAAR should always be checked before recommending an MVL for a contractor who intends to keep working in the field. HMRC guidance is at CTM36305.</p>`,
  },

  // ── Umbrella and employment ──────────────────────────────────────────────────

  {
    slug: "umbrella-company",
    term: "Umbrella company",
    category: "Umbrella and employment",
    primary_kw: "what is an umbrella company contractor",
    body: `<p>An <strong>umbrella company</strong> employs a contractor under an <strong>overarching contract of employment</strong>, operates PAYE and National Insurance on the assignment income, and pays the worker a salary. It is the standard route for <a href="/glossary/inside-ir35">inside-IR35</a> or low-margin assignments where running a <a href="/glossary/personal-service-company">PSC</a> is not worthwhile.</p>
<p>The contractor's take-home is the <a href="/glossary/assignment-rate">assignment rate</a> less the umbrella's deductions, which legitimately include <strong>employer NIC (15%)</strong>, the <a href="/glossary/apprenticeship-levy">Apprenticeship Levy</a> and the umbrella's margin. These are funded from the assignment rate, not from the worker's gross salary, and a compliant umbrella sets this out transparently. Umbrella workers are entitled to <strong>holiday pay</strong> (which must be paid, not unlawfully retained) and must receive a <a href="/glossary/key-information-document">Key Information Document</a> before starting.</p>
<p>From 6 April 2026 a new <a href="/glossary/umbrella-jsl">joint and several liability</a> regime makes the recruitment agency (or the end client where there is no agency) jointly liable for PAYE that the umbrella fails to remit, while the umbrella remains the legal employer. The firm's stance is to use a <strong>compliant umbrella</strong> (transparent KID, no inflated "expenses" or skimming schemes) and to avoid any umbrella promising take-home rates that imply tax is not being properly deducted, which is a marker of a disguised-remuneration scheme. For a genuinely inside-IR35 engagement, an umbrella is usually the simpler and often the more economic choice over a PSC.</p>`,
  },

  {
    slug: "assignment-rate",
    term: "Assignment rate",
    category: "Umbrella and employment",
    primary_kw: "umbrella assignment rate vs take home",
    body: `<p>The <strong>assignment rate</strong> is the total amount an agency or <a href="/glossary/end-client">end client</a> pays an <a href="/glossary/umbrella-company">umbrella company</a> for a contractor's work. It is critically <strong>not the same as the contractor's gross salary</strong>, and confusing the two is one of the most common sources of disappointment for new umbrella workers.</p>
<p>Out of the assignment rate, the umbrella must fund the <strong>employment costs that an employer would normally bear</strong>: employer National Insurance at <strong>15%</strong>, the <a href="/glossary/apprenticeship-levy">Apprenticeship Levy</a>, the umbrella's own margin, and holiday pay. Only after these are deducted is the contractor's gross salary arrived at, from which PAYE and employee National Insurance are then taken to give take-home pay.</p>
<p>This is why an umbrella "day rate" cannot be compared directly with a <a href="/glossary/personal-service-company">PSC</a> day rate: the umbrella figure has more employment costs to absorb. A compliant umbrella sets out the full breakdown, from assignment rate down to take-home, in the <a href="/glossary/key-information-document">Key Information Document</a> the worker must receive before starting. Any umbrella whose figures imply these statutory costs are not being properly deducted should be treated as a warning sign.</p>`,
  },

  {
    slug: "apprenticeship-levy",
    term: "Apprenticeship Levy",
    category: "Umbrella and employment",
    primary_kw: "Apprenticeship Levy umbrella contractor",
    body: `<p>The <strong>Apprenticeship Levy</strong> is a 0.5% charge on an employer's pay bill, introduced in April 2017 to fund apprenticeship training. For most contractors it is relevant not as a charge on their own <a href="/glossary/personal-service-company">PSC</a> (which is far below the £3m pay-bill allowance) but as one of the employment costs that comes out of an <a href="/glossary/umbrella-company">umbrella</a> assignment rate.</p>
<p>When a contractor works through an umbrella company, the umbrella is the employer and its pay bill is large enough that the levy applies. The levy is therefore funded from the <a href="/glossary/assignment-rate">assignment rate</a>, alongside employer National Insurance at 15% and the umbrella's margin, before the contractor's gross salary is arrived at. A compliant umbrella will show it as a separate line in the <a href="/glossary/key-information-document">Key Information Document</a>.</p>
<p>The levy is also charged on the <a href="/glossary/fee-payer">fee-payer</a> for an <a href="/glossary/inside-ir35">inside-IR35</a> engagement under <a href="/glossary/chapter-10">Chapter 10</a>, on top of employer NIC, when calculating the <a href="/glossary/deemed-employment-payment">deemed direct payment</a>. So whether a contractor is inside IR35 through their PSC or working through an umbrella, the Apprenticeship Levy is one of the costs that reduces the effective rate compared with an outside-IR35 PSC engagement.</p>`,
  },

  {
    slug: "key-information-document",
    term: "Key Information Document (KID)",
    category: "Umbrella and employment",
    primary_kw: "what is a Key Information Document KID umbrella",
    body: `<p>A <strong>Key Information Document (KID)</strong> is a document that an agency or <a href="/glossary/umbrella-company">umbrella company</a> must give a contractor <strong>before they agree to take an assignment</strong>. It is a transparency requirement under the Conduct of Employment Agencies and Employment Businesses Regulations 2003, designed to make sure the worker understands exactly what they will be paid and what will be deducted.</p>
<p>The KID must set out the <a href="/glossary/assignment-rate">assignment rate</a>, the deductions that will be taken (including employer National Insurance at 15%, the <a href="/glossary/apprenticeship-levy">Apprenticeship Levy</a> and the umbrella's margin), how holiday pay is handled, and the <strong>expected take-home pay</strong>. In effect it is the audit trail that shows the worker how the headline rate becomes the figure that lands in their bank account.</p>
<p>The KID is one of the firm's practical markers of a compliant umbrella. A clear, honest KID that reconciles the assignment rate down to take-home is a good sign. An umbrella that is vague about deductions, or whose figures imply that statutory costs are not being properly accounted for, should be avoided as a likely <strong>disguised-remuneration or skimming scheme</strong>. From 6 April 2026 the new <a href="/glossary/umbrella-jsl">umbrella JSL</a> regime gives agencies and end clients a strong incentive to insist on compliant umbrellas, so contractors should expect tighter checks.</p>`,
  },

  {
    slug: "umbrella-jsl",
    term: "Umbrella JSL (April 2026)",
    category: "Umbrella and employment",
    primary_kw: "umbrella joint and several liability April 2026",
    body: `<p><strong>Umbrella JSL</strong> is the joint and several liability regime for <a href="/glossary/umbrella-company">umbrella company</a> PAYE that takes effect from <strong>6 April 2026</strong>. Under it, where a worker is supplied through an umbrella, the <strong>recruitment agency that contracts with the end client</strong> (or the <a href="/glossary/end-client">end client</a> itself where there is no agency) becomes jointly and severally liable with the umbrella for any PAYE and NIC the umbrella fails to remit.</p>
<p>It is important to state the change precisely. The <strong>umbrella remains the legal employer</strong>; the employment relationship does not move. What changes is that <strong>HMRC can pursue the agency or end client</strong> for unpaid umbrella PAYE. This is a tax-compliance measure aimed at the non-compliant umbrella market (estimated at around £1bn of avoidance), not full umbrella regulation, which is expected separately and later.</p>
<p>The reform was enacted by Finance Act 2026 s.24, inserting a new Chapter 11 (ss.61Y to 61Z2) into Part 2 of ITEPA 2003, with parallel NIC powers. The practical effect is that agencies and end clients will be far more careful which umbrellas they use, so contractors should expect tighter preferred-supplier-list controls and should themselves use a compliant umbrella with a transparent <a href="/glossary/key-information-document">Key Information Document</a>. From April 2026, umbrella compliance, rather than choice of structure, is the bigger watch-item for an inside-IR35 contractor.</p>`,
  },

  {
    slug: "managed-service-company",
    term: "Managed Service Company (MSC)",
    category: "Umbrella and employment",
    primary_kw: "what is a Managed Service Company MSC",
    body: `<p>A <strong>Managed Service Company (MSC)</strong> is caught by separate legislation (Chapter 9, Part 2 of ITEPA 2003, in force since 6 April 2007) that is <strong>distinct from <a href="/glossary/ir35">IR35</a></strong> and can be more dangerous, because it does not depend on a status test. Where a company is an MSC, <strong>all</strong> payments to the worker are treated as employment income subject to PAYE and NIC, with no "outside" finding available to win.</p>
<p>A company is broadly an MSC where: its business is wholly or mainly providing the services of an individual; payments to the worker make up most of the company's income; those payments exceed what PAYE would give; and an <strong>"MSC provider" is involved</strong> with the company (a person who promotes or facilitates the use of companies to provide individuals' services and is involved in running them). The biggest danger is that unpaid PAYE can be <strong>transferred as a personal debt</strong> to the worker, the directors, the MSC provider and certain others.</p>
<p>The key point for choosing an accountant is the carve-out in ITEPA s.61B(3): a person is <strong>not</strong> an MSC provider merely by providing accountancy or legal services in a professional capacity. The danger zone is where an "accountant" goes beyond advice into controlling the company's finances or selling a packaged, standardised "company run for you" product. HMRC has pursued the firms Churchill Knight and Boox, but those test cases are <strong>listed for First-tier Tribunal hearings in June 2026 and November 2026 and are not yet decided</strong>. The firm's stance is risk management: use an accountant who clearly advises (you make the decisions and could leave freely), and we do not assert any named model is or is not caught.</p>`,
  },

  {
    slug: "employment-allowance",
    term: "Employment Allowance",
    category: "Umbrella and employment",
    primary_kw: "Employment Allowance contractor PSC 2026/27",
    body: `<p>The <strong>Employment Allowance</strong> is a relief that lets an eligible employer reduce its secondary (employer) Class 1 National Insurance bill by up to <strong>£10,500</strong> in 2026/27. It is set against the employer NIC charged at 15% on salaries above the £5,000 secondary threshold.</p>
<p>The crucial point for contractors is the <strong>single-director restriction</strong>: a company whose <strong>only employee is a single director cannot claim the Employment Allowance</strong>. This is exactly the position of the typical one-person <a href="/glossary/personal-service-company">PSC</a>, which is why so many contractor PSCs cannot use it. A PSC that genuinely employs a second person (for example a spouse doing real work on the payroll) may be able to claim.</p>
<p>This restriction directly shapes the optimal salary. A single-director PSC that cannot claim the allowance typically sets salary between the <strong>£5,000 secondary threshold</strong> and the <strong>£6,708 lower earnings limit</strong>, often at £6,708 to secure a qualifying National Insurance year while accepting a small slice of employer NIC. A company that can claim the allowance can usually pay up to <strong>£12,570</strong> with the extra employer NIC relieved. There is no single universally optimal salary; it depends on Employment Allowance eligibility, other income and the corporation tax marginal rate, so it should be modelled. The statutory hook is the National Insurance Contributions Act 2014.</p>`,
  },

  // ── Expenses, VAT and compliance ─────────────────────────────────────────────

  {
    slug: "24-month-rule",
    term: "24-month rule",
    category: "Expenses, VAT and compliance",
    primary_kw: "contractor 24-month rule temporary workplace travel",
    body: `<p>The <strong>24-month rule</strong> determines when a contractor can deduct the cost of travel to a client site. Travel to a <strong>temporary workplace</strong> is allowable, but a workplace stops being temporary (and becomes a <strong>permanent workplace</strong>, so travel there is non-deductible ordinary commuting) once the contractor has spent, or <strong>expects to spend, more than 40% of their working time there over a period exceeding 24 months</strong>.</p>
<p>The rule is about <strong>expectation</strong>, not just elapsed time. As soon as it becomes known that an engagement will exceed 24 months at one site, travel to it ceases to be allowable <strong>from that point</strong>, not from month 24. So a contractor who signs an 18-month contract that is then extended to 30 months loses the deduction from the moment the extension is agreed, because the expectation has crossed the threshold. This is the single most-misclaimed contractor expense.</p>
<p>The rule interacts with <a href="/glossary/ir35">IR35</a> status. For an <a href="/glossary/inside-ir35">inside-IR35</a> engagement, home-to-client travel is generally <strong>not deductible at all</strong>, because each separate engagement is treated as a separate employment and the client site is a permanent workplace for it. <a href="/glossary/outside-ir35">Outside-IR35</a> contractors keep the temporary-workplace relief, subject to the 24-month rule. The statutory hooks are ITEPA 2003 ss.337 to 339, with HMRC guidance at EIM32000 onward.</p>`,
  },

  {
    slug: "amap-mileage",
    term: "AMAP mileage",
    category: "Expenses, VAT and compliance",
    primary_kw: "AMAP mileage rate 55p 2026/27 contractor",
    body: `<p><strong>AMAP</strong> (Approved Mileage Allowance Payments) are the tax-free rates a contractor can claim for business motoring in their own car or van, instead of claiming the actual running costs. They give a simple, HMRC-approved figure per business mile.</p>
<p>From <strong>6 April 2026</strong> the AMAP rate for cars and vans is <strong>55p per mile for the first 10,000 business miles</strong> in the tax year, and <strong>25p per mile thereafter</strong>. The first-10,000 rate rose from 45p on that date; the 25p rate above 10,000 miles is unchanged. A contractor doing 12,000 business miles in 2026/27 would claim 10,000 at 55p plus 2,000 at 25p.</p>
<p>Only genuine <strong>business travel</strong> qualifies. Ordinary commuting, meaning home to a permanent workplace, does not, which ties directly into the <a href="/glossary/24-month-rule">24-month rule</a> on temporary versus permanent workplaces. For an <a href="/glossary/inside-ir35">inside-IR35</a> engagement, home-to-client travel is generally not deductible at all, so AMAP claims there will usually be limited. The statutory hook is ITEPA 2003 ss.229 to 236, with HMRC guidance at EIM31200 onward.</p>`,
  },

  {
    slug: "flat-rate-scheme",
    term: "Flat Rate Scheme",
    category: "Expenses, VAT and compliance",
    primary_kw: "VAT Flat Rate Scheme contractor",
    body: `<p>The <strong>VAT Flat Rate Scheme (FRS)</strong> is a simplified way of accounting for VAT, available where a business expects taxable turnover of <strong>£150,000 or less (excluding VAT)</strong>. Instead of tracking input VAT on every purchase, the business pays a fixed percentage of its <strong>VAT-inclusive</strong> turnover and keeps the difference.</p>
<p>For contractors, the FRS is much less attractive than it once was because of the <a href="/glossary/limited-cost-trader">limited cost trader</a> rule. A business that spends less than 2% of its turnover (or less than £1,000 a year) on <strong>goods</strong> must use the <strong>16.5% flat rate</strong>, which for a typical labour-only contractor wipes out almost all of the FRS benefit. The limited-cost test is applied each VAT period, so a contractor can move in and out of the 16.5% rate.</p>
<p>The firm's stance is that, since the 16.5% rate was introduced in April 2017, the FRS is <strong>rarely worthwhile for a labour-only contractor</strong>. It can still suit a contractor with genuine, regular goods spend above the test, or one who values administrative simplicity, but standard VAT accounting should always be modelled against the applicable FRS percentage before choosing the scheme. The compulsory VAT registration threshold is <a href="/glossary/vat-registration-threshold">£90,000</a>. See VAT Notice 733 for the scheme rules.</p>`,
  },

  {
    slug: "limited-cost-trader",
    term: "Limited cost trader",
    category: "Expenses, VAT and compliance",
    primary_kw: "limited cost trader VAT flat rate 16.5%",
    body: `<p>A <strong>limited cost trader</strong> is a business on the VAT <a href="/glossary/flat-rate-scheme">Flat Rate Scheme</a> that spends very little on goods, and is therefore required to use the highest flat rate of <strong>16.5%</strong>. The category was introduced in April 2017 specifically to remove the cash advantage that labour-only businesses, including most contractors, used to gain from the scheme.</p>
<p>A business is a limited cost trader in a VAT period if its spend on <strong>goods</strong> is either <strong>less than 2% of its VAT-inclusive turnover</strong>, or more than 2% but <strong>less than £1,000 a year</strong> (pro-rated for the period). Crucially, "goods" excludes services, capital expenditure, food and drink, vehicles and fuel (with limited exceptions), so the things a contractor typically spends on do not count towards the test.</p>
<p>The practical effect is that a labour-only contractor will almost always fall into the limited cost trader category and pay 16.5% on VAT-inclusive turnover, which is close to the full 20% standard rate and leaves little or no benefit from the FRS. The test is applied <strong>every VAT period</strong>, so it must be checked each quarter. For most contractors this is the reason the firm rarely recommends the Flat Rate Scheme. See VAT Notice 733 for the detailed rules.</p>`,
  },

  {
    slug: "vat-registration-threshold",
    term: "VAT registration threshold",
    category: "Expenses, VAT and compliance",
    primary_kw: "VAT registration threshold 90000 contractor",
    body: `<p>The <strong>VAT registration threshold</strong> is the level of VAT-taxable turnover at which a business must register for VAT. It is <strong>£90,000</strong> and has been frozen since 1 April 2024. Registration becomes compulsory once turnover exceeds £90,000 in any rolling 12-month period, or where it is expected to exceed that figure in the next 30 days.</p>
<p>Most contractor services are <strong>standard-rated at 20%</strong>. Many contractors register <strong>voluntarily</strong> below the threshold, because they can then reclaim the VAT on their own business costs, and because their end clients are usually VAT-registered themselves and can recover the VAT charged, so charging VAT costs the client nothing in net terms.</p>
<p>The <strong>deregistration threshold</strong> is £88,000: a business can apply to deregister if its taxable turnover falls below that figure. A contractor weighing up registration should also consider the <a href="/glossary/flat-rate-scheme">Flat Rate Scheme</a>, though for most labour-only contractors the <a href="/glossary/limited-cost-trader">limited cost trader</a> 16.5% rate makes standard VAT accounting the better choice. The statutory hook is VATA 1994 Schedule 1.</p>`,
  },

  {
    slug: "day-rate",
    term: "Day rate",
    category: "Expenses, VAT and compliance",
    primary_kw: "contractor day rate vs take home",
    body: `<p>A <strong>day rate</strong> is the headline figure a contractor charges for a day's work. It is the most common way contractor pay is quoted, but on its own it says little about take-home pay, because what reaches the contractor depends heavily on <a href="/glossary/ir35">IR35</a> status and the trading structure used.</p>
<p>Through an <a href="/glossary/outside-ir35">outside-IR35</a> <a href="/glossary/personal-service-company">PSC</a>, the day rate flows into the company, which pays <a href="/glossary/corporation-tax-marginal-relief">corporation tax</a> on its profit, and the contractor then extracts the rest as a tax-efficient mix of salary and <a href="/glossary/dividend">dividends</a>, retaining good control over timing and pension contributions. Through an <a href="/glossary/inside-ir35">inside-IR35</a> engagement or an <a href="/glossary/umbrella-company">umbrella company</a>, the same day rate has PAYE, employee NIC and employer costs taken from it before take-home.</p>
<p>This is why an umbrella or inside-IR35 <a href="/glossary/assignment-rate">assignment rate</a> cannot be compared like-for-like with an outside-IR35 PSC day rate: the inside or umbrella figure has to absorb employer National Insurance at 15%, the <a href="/glossary/apprenticeship-levy">Apprenticeship Levy</a> and any umbrella margin before the worker is paid. When comparing offers, contractors should always convert the day rate into an expected take-home figure under the actual status and structure, rather than comparing headline rates.</p>`,
  },
];

export const GLOSSARY: Record<string, GlossaryEntry> = Object.fromEntries(
  GLOSSARY_LIST.map((entry) => [entry.slug, entry]),
);
