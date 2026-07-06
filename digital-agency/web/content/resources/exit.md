---
title: "Agency Exit and Capital Gains Tax: Business Asset Disposal Relief Guide"
summary: "How Business Asset Disposal Relief (BADR) reduces CGT on a UK agency sale, what has changed for 2026/27, and how to model your net proceeds using the exit CGT tool."
publishedAt: "2026-07-06"
updatedAt: "2026-07-06"
topic: "exit"
version: "2026/27"
lastReviewed: "July 2026"
noindex: true
---

<p>Selling a digital agency is typically a once-in-a-career transaction. The capital gains tax (CGT) position, and specifically whether Business Asset Disposal Relief (BADR) applies, can make a difference of tens or hundreds of thousands of pounds on the net proceeds. This guide explains the 2026/27 CGT rules, the BADR qualification conditions, and how to use the exit CGT model to compare scenarios.</p>

<h2 id="cgt-on-a-share-sale">CGT on a share sale</h2>

<p>When an agency founder sells shares in their company, the gain is the difference between the disposal proceeds and the original cost base (usually the amount paid for the shares, which is often nominal for a founder). Gains above the annual CGT exempt amount are taxable.</p>

<p>The standard CGT rate for higher and additional rate taxpayers on qualifying business assets is 24 per cent for disposals in 2026/27. Without BADR, an agency sale producing a gain of £700,000 would carry a tax liability of approximately £168,000.</p>

<h2 id="badr-rates-2026-27">BADR rates for 2026/27</h2>

<p>Business Asset Disposal Relief reduces the CGT rate on qualifying gains. The rate has changed in recent years:</p>

<ul>
  <li>2025/26 disposals: 14 per cent BADR rate (reduced from 10 per cent)</li>
  <li>2026/27 disposals onwards: 18 per cent BADR rate</li>
</ul>

<p>On the same £700,000 gain, BADR at 18 per cent produces a tax liability of £126,000, a saving of £42,000 compared to the standard rate. For a £1,000,000 gain the saving is £60,000.</p>

<p>The rate change from 10 per cent (for disposals to 5 April 2025) to 14 per cent (2025/26) and then 18 per cent (2026/27 onwards) reflects a narrowing of the BADR advantage. Even at 18 per cent, BADR remains materially better than the standard 24 per cent rate for qualifying disposals.</p>

<h2 id="qualifying-conditions">BADR qualification conditions</h2>

<p>To qualify for BADR on a share disposal, the following conditions must all be met throughout the period ending on the date of disposal (typically the 24 months ending on the sale date):</p>

<ul>
  <li>The company must be a trading company (not an investment company).</li>
  <li>The shareholder must be an officer or employee of the company.</li>
  <li>The shareholder must hold at least 5 per cent of the ordinary share capital and voting rights.</li>
  <li>The shareholder must be entitled to at least 5 per cent of the distributable profits and net assets on a winding up.</li>
</ul>

<p>For most UK digital agency founders who have been operating and employed by their own company for at least two years, these conditions are typically met. The conditions are assessed on the facts at the time of disposal, so a founder who recently reduced their shareholding below 5 per cent or ceased to be an officer or employee may lose eligibility.</p>

<h2 id="lifetime-limit">Lifetime limit</h2>

<p>BADR applies to a lifetime maximum of £1,000,000 of qualifying gains per individual. If you have previously claimed BADR on an earlier disposal, the remaining limit is reduced accordingly.</p>

<p>Once the limit is used up, any additional qualifying gain is taxed at the standard CGT rate. The Excel model includes an input for previous BADR claims so you can model the correct split between the reduced-rate slice and the standard-rate overflow.</p>

<h2 id="worked-example">Worked example</h2>

<p>Agency with proceeds of £750,000, founder's cost base £50,000, no previous BADR claims, disposal in 2026/27:</p>

<ul>
  <li>Gain: £700,000</li>
  <li>With BADR (18 per cent): tax £126,000, net proceeds £624,000</li>
  <li>Without BADR (24 per cent): tax £168,000, net proceeds £582,000</li>
  <li>BADR saving: £42,000</li>
</ul>

<p>If the founder had previously used £300,000 of their BADR lifetime limit, only £700,000 of the new gain is eligible (the full gain in this case is £700,000, which is within the remaining £700,000 of limit). The full gain still qualifies at 18 per cent.</p>

<h2 id="timing">Timing the disposal</h2>

<p>In 2025/26, the BADR rate was 14 per cent. From 2026/27 it rose to 18 per cent. There is no announced further increase beyond 2026/27 at the time of writing, but future Budgets can change rates. The Excel model allows you to select the tax year so you can compare the tax impact of a 2025/26 versus 2026/27 disposal.</p>

<p>If a sale is in negotiation that may straddle a tax year end, the timing of completion and the date of disposal for CGT purposes matters. The disposal date for a share sale is typically the date of exchange of contracts (not completion), so a deal that completes in April 2027 but exchanges in March 2027 would be a 2026/27 disposal.</p>

<h2 id="earn-outs">Earn-outs and deferred consideration</h2>

<p>Many agency sales include an earn-out: a portion of the price is contingent on future performance and paid after completion. The CGT treatment of earn-outs is complex. The initial payment and the earn-out may be treated as separate disposals in different tax years. BADR eligibility is assessed on the initial disposal, but the earn-out payments will be assessed in the year they are received or crystallised.</p>

<p>If your deal includes a significant earn-out, the interaction with the BADR lifetime limit and the CGT rates at the time of each earn-out payment is material. This guide and the model cover the straightforward upfront payment scenario; earn-out structures require specific advice.</p>

<h2 id="using-the-model">Using the Excel model</h2>

<p>The agency exit CGT model allows you to enter proceeds, cost base, previous BADR claims and tax year. It calculates the gain, the BADR-eligible slice and overflow, tax due under both BADR and standard CGT, and net proceeds in both scenarios.</p>

<p>The model uses the correct banded approach: if previous BADR claimed exceeds the £1,000,000 limit, the eligible slice is zero and all gain is at the standard rate. If the gain plus previous claims exceeds the limit, the eligible slice is capped and the overflow is taxed at 24 per cent. All formulas are transparent and compatible with LibreOffice Calc.</p>

<h2 id="limitations">Limitations and when to take advice</h2>

<p>The model does not account for the annual CGT exempt amount (currently £3,000 per year), which would reduce the taxable gain in practice. It also does not model earn-out structures, EMI option exercises, or the entrepreneurs relief interactions that may apply to share options. Nor does it cover investors relief, which applies a reduced rate for external investors rather than founders.</p>

<p>If your exit involves earn-outs, EMI options, multiple sellers, or cross-border elements (for example, if you or your acquirer are based outside the UK), take specialist advice before proceeding. The CGT position in a cross-border transaction can differ significantly from the domestic model.</p>
