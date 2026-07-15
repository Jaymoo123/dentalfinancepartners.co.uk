---
title: "Crypto-Backed Loans and Collateral: When Borrowing Triggers a Disposal"
slug: "crypto-backed-loans-collateral-disposals"
date: "2026-07-15"
author: ""
category: "DeFi & Complex Transactions"
metaTitle: "Crypto-Backed Loans Tax UK: Does Collateral Trigger CGT?"
metaDescription: "Borrowing against crypto may or may not be a disposal. It turns on beneficial ownership, and HMRC's view is not settled law. What that means."
h1: "Crypto-Backed Loans and Collateral: When Borrowing Triggers a Disposal"
summary: "Posting crypto as collateral for a loan may be a taxable CGT disposal under HMRC's current view, depending on whether beneficial ownership of your tokens transfers to the lender. Liquidation of collateral is a disposal with no ambiguity. Both events are under-reported."
keyTakeaways:
  - "Whether posting crypto as collateral is a CGT disposal depends on whether beneficial ownership of your tokens passes to the lender. This is HMRC's current view, not settled law."
  - "CeFi lenders who can rehypothecate (re-use) your collateral are more likely to trigger a disposal under HMRC's analysis than a smart contract holding collateral in escrow."
  - "Liquidation of collateral is a disposal at market value at the point of the forced sale. This part is firm, not uncertain."
  - "Interest you pay in crypto and tokens you receive as part of a loan arrangement each have their own tax treatment."
  - "Crypto loan histories are regularly misclassified by tax software. Reconciliation requires professional judgment."
faqs:
  - question: "Is a crypto-backed loan taxable in the UK?"
    answer: "Receiving the loan itself is not a taxable event; you are borrowing money and must repay it. The taxable question is what happens to the collateral you post. Under HMRC's current view, if posting the collateral transfers beneficial ownership of your tokens to the lender, that is a CGT disposal. This is not settled law, and the outcome depends on the lender's structure and contract terms."
  - question: "Do I pay tax if I borrow against my Bitcoin?"
    answer: "Not on the loan itself. But if posting your Bitcoin as collateral transfers beneficial ownership, HMRC's current analysis can treat that as a disposal for CGT purposes. Liquidation of your collateral is unambiguously a disposal. The loan receipt is not income or a capital event."
  - question: "Is posting crypto as collateral a disposal?"
    answer: "It depends on whether beneficial ownership passes. Under HMRC's current view, as set out in the Cryptoassets Manual at CRYPTO61000, if the lender acquires beneficial ownership of your tokens (for example, because they can rehypothecate them), a disposal may have occurred. If your tokens remain in a smart contract to which you retain the economic claim, the analysis may differ. This is HMRC's current view, not settled law."
  - question: "What happens tax-wise if my crypto collateral is liquidated?"
    answer: "Liquidation is a CGT disposal at the market value of your collateral at the point of the forced sale. Your allowable cost is the average cost from your section 104 pool. Any gain is subject to CGT at 18% within your remaining basic-rate band and 24% above that. This part of the analysis is firm, not uncertain."
  - question: "Is DeFi borrowing taxed differently from a CeFi loan?"
    answer: "Potentially yes, but this is HMRC's current view, not settled law. A CeFi lender with the contractual right to rehypothecate your collateral is more likely to have acquired beneficial ownership. A DeFi smart contract holding your collateral in escrow with no ability to use those tokens independently may produce a different analysis. The protocol mechanics and the legal characterisation of the smart contract matter."
  - question: "Do I pay tax on the crypto I receive as the loan?"
    answer: "No. Receiving a loan (whether in fiat or in stablecoins or in other crypto) is not a taxable receipt. You have a liability to repay it. You do not receive income."
  - question: "Is interest paid in crypto deductible or taxable?"
    answer: "Interest you pay in crypto is a disposal of those tokens at their market value at the point of payment, which is a CGT event if they have appreciated. Whether the interest cost is deductible against your gains depends on the nature of the loan and the underlying transaction, and requires professional analysis rather than a general rule."
---
<p>This post states HMRC's current published analysis of crypto-backed loans and collateral. Where the position is not settled law, that qualification is stated explicitly and is not softened. The post covers the borrower side of crypto lending: posting collateral to take a loan. The lender side (supplying tokens to a DeFi protocol) is covered in the companion post on <a href="/blog/defi-and-complex-transactions/defi-lending-liquidity-pool-disposals">DeFi lending and liquidity pool disposals</a>.</p>

<h2>The short answer: a crypto-backed loan may or may not trigger a taxable disposal, and the answer turns on beneficial ownership</h2>

<p>Under HMRC's current analysis, set out in the <a href="https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto61000">Cryptoassets Manual at CRYPTO61000</a>, whether posting crypto as collateral for a loan is a taxable CGT disposal depends on a single question: does beneficial ownership of your tokens pass to the lender when you post them?</p>

<p>If it does, HMRC's current view is that a disposal has occurred at that point, valued at the market value of the tokens in sterling at the time of posting. If beneficial ownership stays with you and the tokens are merely locked as security, the analysis may be different.</p>

<p>This is HMRC's current view, not settled law. The Cryptoassets Manual is internal HMRC guidance, not legislation, and the specific question of loan collateral has no dedicated manual chapter. The answer is applied from general CGT principles and the manual's DeFi beneficial-ownership analysis, transaction by transaction. The honest starting position is "it depends, and here is the test", not a blanket "loans are tax-free" and not a blanket "all crypto collateral is taxable".</p>

<p>Liquidation is different. If your collateral is sold to cover the loan because your loan-to-value ratio breached a threshold, that forced sale is a CGT disposal at market value. That part is firm.</p>

<h2>The test that decides it: does posting collateral transfer beneficial ownership?</h2>

<p>Under general CGT principles, a disposal occurs when you part with beneficial ownership of an asset. You do not need to receive cash. You do not need to convert to pounds. The question is whether the economic and legal ownership of the tokens has moved from you to someone else.</p>

<p>When you post crypto as collateral for a loan, you typically send the tokens to a custodian (in CeFi) or lock them in a smart contract (in DeFi). The critical question is what happens to those tokens next.</p>

<ul>
  <li><strong>If the lender can use, lend, sell, or rehypothecate your tokens</strong> during the loan period, they have, under HMRC's current analysis, acquired beneficial ownership. A disposal may have occurred at the point you posted the collateral.</li>
  <li><strong>If your tokens are held in escrow</strong>, locked such that they cannot be used by the lender and are returned to you (or liquidated to repay the loan) without ever being the lender's asset to deal with, the analysis may be that beneficial ownership did not pass.</li>
</ul>

<p>The answer comes from the lender's contract and the protocol mechanics, not from the label "loan" or "collateral". Two loan products with the same name can produce different outcomes. This is why the position is transaction-specific and why software cannot resolve it automatically.</p>

<h2>CeFi loans: where the lender can use your coins</h2>

<p>Centralised finance (CeFi) crypto lenders (platforms that accept custody of your tokens and lend you fiat or stablecoins against them) typically hold your collateral in pooled custody and retain the contractual right to rehypothecate it. This means they can lend your tokens to other counterparties, use them to earn yield, or otherwise deploy them during the period your loan is open.</p>

<p>Under HMRC's current analysis, where a lender has acquired this ability to deal with your tokens as its own, beneficial ownership of those tokens has transferred. That transfer is a disposal for CGT purposes at the market value of the tokens at the point you posted them.</p>

<p>The consequences cascade from that disposal date:</p>

<ul>
  <li>Your allowable cost is the average cost of your <a href="https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22200">section 104 pool</a> for those tokens at the disposal date.</li>
  <li>Any gain is subject to CGT: <a href="https://www.gov.uk/capital-gains-tax/rates">18% within your remaining basic-rate band, 24% above</a> (basic-rate band ceiling £37,700 taxable income for 2026/27).</li>
  <li>When the loan ends and your tokens (or equivalent tokens) are returned, HMRC's current analysis treats that as a reacquisition at market value at the date of return. Those tokens enter your pool at that new cost.</li>
</ul>

<p>This is HMRC's current view, not settled law. The platform's terms and conditions determine whether rehypothecation is permitted, and those terms vary. Many CeFi lenders bury the rehypothecation right in their terms. If you have used a CeFi crypto loan and never reviewed the terms for this right, you may have an unreported disposal.</p>

<h2>DeFi loans: smart-contract collateral</h2>

<p>Decentralised finance (DeFi) lending protocols (such as Aave and Compound) operate differently. You post collateral tokens into a smart contract, which locks them and issues you a loan in a different token, typically a stablecoin. The smart contract cannot deal with your collateral independently. It holds the tokens and, if your loan-to-value ratio breaches the liquidation threshold, automatically sells enough collateral to repay the debt.</p>

<p>Under HMRC's current analysis, the key question is the same: has beneficial ownership of the collateral tokens passed? The smart contract's inability to rehypothecate is a factor that may weigh against a disposal at the point of posting. But the analysis is transaction-specific and the position is HMRC's current view, not settled law. The Cryptoassets Manual does not contain a dedicated chapter on DeFi loan collateral, and no legislation has been enacted to resolve this.</p>

<p>The <a href="https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto61000">CRYPTO61000 manual guidance</a> makes clear that these transactions must be assessed on their own facts, applying general CGT and beneficial-ownership principles. A position taken on a DeFi loan is a position taken under manual guidance that has not been tested in case law.</p>

<table>
  <thead>
    <tr>
      <th>Loan type</th>
      <th>Does beneficial ownership typically pass?</th>
      <th>HMRC's current view on collateral posting</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>CeFi (rehypothecation right in terms)</td>
      <td>More likely yes</td>
      <td>Possible disposal at market value on posting (HMRC's current view, not settled law)</td>
    </tr>
    <tr>
      <td>CeFi (no rehypothecation right)</td>
      <td>Less likely, but fact-specific</td>
      <td>Transaction-specific (HMRC's current view, not settled law)</td>
    </tr>
    <tr>
      <td>DeFi smart contract (escrow only)</td>
      <td>Arguable that it does not</td>
      <td>Transaction-specific (HMRC's current view, not settled law)</td>
    </tr>
  </tbody>
</table>

<p>The "not settled law" qualifier applies to every row of this table. It is not a disclaimer tacked on to soften a clear answer; it accurately describes the state of the law. Any source that gives you a clean "no tax on crypto collateral" or a clean "all crypto collateral is taxable" is either wrong or omitting the uncertainty.</p>

<h2>Liquidation is a disposal: no uncertainty here</h2>

<p>Whatever the analysis of the original collateral posting, one event in a crypto-backed loan is unambiguously a CGT disposal: liquidation.</p>

<p>If your loan-to-value ratio breaches the lender's liquidation threshold and the lender (or smart contract) sells your collateral to repay the debt, that forced sale is a <a href="https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-sell-cryptoassets">disposal for CGT purposes</a> at the market value of the tokens at the point of the sale. The fact that you did not initiate or consent to the sale does not change the analysis. You owned an asset and it was sold.</p>

<p>Here is a worked illustration to show how the numbers flow. These are illustrative figures only.</p>

<table>
  <thead>
    <tr>
      <th>Step</th>
      <th>Illustrative figure</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Collateral tokens: 1 ETH posted as collateral</td>
      <td></td>
    </tr>
    <tr>
      <td>Market value at liquidation (sterling)</td>
      <td>£3,200</td>
    </tr>
    <tr>
      <td>Allowable cost (average s104 pool cost per ETH)</td>
      <td>£800</td>
    </tr>
    <tr>
      <td>Gross gain before reliefs</td>
      <td>£2,400</td>
    </tr>
    <tr>
      <td>Annual exempt amount (2026/27, if unused)</td>
      <td>£3,000</td>
    </tr>
    <tr>
      <td>Taxable gain (if AEA covers in full)</td>
      <td>£0</td>
    </tr>
    <tr>
      <td>Taxable gain (if AEA already used, basic-rate taxpayer with £10,000 remaining band)</td>
      <td>£2,400 · £10,000 at 18% = £1,800 · £1,400 at 24% = £336 · total CGT = £2,136 approx.</td>
    </tr>
  </tbody>
</table>

<p>The base cost comes from the <a href="https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22200">section 104 pool</a> at average cost. If the collateral posting was itself treated as a disposal (because beneficial ownership passed), the tokens you "reacquired" at posting may have a different pool cost. The layering here is why professional reconciliation matters for any loan with a liquidation event.</p>

<p>If you have been liquidated and never reported it, the <a href="/calculators/crypto-cgt-estimator">CGT estimator</a> can give you a rough scenario figure. It simplifies the same-day and 30-day matching rules, which a professional return must apply correctly.</p>

<h2>Interest and rewards: the tokens you pay and the tokens you receive</h2>

<p>Two further events in a crypto-backed loan arrangement have their own tax treatment, separate from the collateral disposal question.</p>

<h3>Interest you pay in crypto</h3>

<p>Some DeFi protocols deduct interest by reducing your collateral balance or by requiring you to pay in tokens. If you pay interest in a cryptoasset (rather than fiat or stablecoin), that payment is a disposal of those tokens at their market value in sterling at the point of payment. If those tokens have appreciated since you acquired them, there is a gain. Whether the interest cost is deductible against your CGT or against income depends on the nature of the underlying transaction and the purpose of the loan. This is fact-specific and requires professional analysis.</p>

<h3>Tokens you receive</h3>

<p>Receiving the loan itself (fiat, stablecoins, or other crypto) is not income and is not a CGT disposal. You have borrowed an amount and have a liability to repay it. If you receive any tokens in addition to or instead of a loan (for example, a yield token or a reward), that receipt may be taxable as miscellaneous income under the principles at <a href="https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto21200">CRYPTO21200</a>. The token's sterling value at the date of receipt is the taxable amount, and that value becomes your CGT base cost for the later disposal of those tokens.</p>

<h2>Why crypto loan histories are under-reported and how reconciliation works</h2>

<p>Crypto tax software regularly misclassifies loan transactions. The most common errors are:</p>

<ul>
  <li><strong>Treating the collateral deposit as an internal transfer</strong> rather than a potential disposal, because the tokens move from your wallet to a platform address and the software assumes it is a wallet-to-wallet move.</li>
  <li><strong>Missing the liquidation event entirely</strong>, particularly in DeFi where the liquidation is executed by a third-party bot and does not appear as a transaction you initiated.</li>
  <li><strong>Mis-labelling stablecoin loan receipts as income</strong>, inflating your income tax liability.</li>
  <li><strong>Failing to update the s104 pool cost</strong> after a collateral posting that may have been a disposal and a reacquisition at a higher or lower value.</li>
</ul>

<p>Reconciling a loan history requires pulling on-chain transaction data, cross-referencing it against platform statements (where available for CeFi), identifying each collateral event and its market value at the time, and making a documented position on whether beneficial ownership passed. This is the same process the <a href="/services/koinly-recap-reconciliation">Koinly and Recap reconciliation service</a> uses, but with an additional beneficial-ownership judgment layer that software cannot make automatically.</p>

<p>If you have crypto loan transactions that you have not reported, or you are not certain how your software has classified them, <a href="/services/hmrc-disclosure">the disclosure service</a> and the HMRC <a href="https://www.gov.uk/guidance/tell-hmrc-about-unpaid-tax-on-cryptoassets">cryptoasset disclosure route</a> are the correct starting points. HMRC can assess up to 4 years of unpaid tax where care was taken, 6 years where there was carelessness, and 20 years where the omission was deliberate. Voluntary, unprompted disclosure secures the lowest penalty range. Doing nothing is the most expensive option.</p>

<p>If you want to understand the broader CARF reporting changes that affect how much data HMRC will have on crypto activity from 2026 onwards, the <a href="/blog/hmrc-disclosure-and-compliance/carf-crypto-reporting-2026-explained">CARF explainer</a> covers the timeline and what platforms are required to report.</p>

<p>For a full assessment of your loan history, <a href="/for/defi-and-staking">the DeFi and staking service page</a> sets out how we approach these transactions and what we need from you to build a defensible position.</p>
