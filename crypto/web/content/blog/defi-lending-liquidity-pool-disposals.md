---
title: "DeFi Lending and Liquidity Pools: The Disposal Most UK Returns Get Wrong"
slug: "defi-lending-liquidity-pool-disposals"
date: "2026-07-14"
author: ""
category: "DeFi & Complex Transactions"
metaTitle: "DeFi Tax UK: Are LP Deposits a Disposal? HMRC's View"
metaDescription: "Under HMRC's current view many DeFi deposits and LP entries are CGT disposals. The rules are not settled law. Here is what that means for your return."
h1: "DeFi Lending and Liquidity Pools: The Disposal Most UK Returns Get Wrong"
summary: "Under HMRC's current view, depositing tokens into a DeFi lending protocol or liquidity pool can trigger a taxable CGT disposal even if you never converted to pounds. The rules are not settled law, and most tax software defaults to treating these as non-events."
keyTakeaways:
  - "Under HMRC's current view, depositing tokens into a DeFi protocol or liquidity pool may constitute a taxable CGT disposal at the moment of deposit."
  - "The key test is whether beneficial ownership of the tokens transfers when you deposit; this depends on protocol mechanics, not on whether you received a receipt token."
  - "The 2023 HMRC DeFi consultation proposed a legislative fix but it has not been enacted. There is no clean settled rule."
  - "Most crypto tax software treats DeFi deposits as non-events by default, which means returns prepared from software output alone are likely to under-report."
  - "A defensible position requires consistent treatment across every similar protocol interaction, contemporaneous documentation of protocol mechanics, and professional judgment."
faqs:
  - question: "Is depositing crypto into a liquidity pool a taxable disposal?"
    answer: "Under HMRC's current view, as set out in the Cryptoassets Manual at CRYPTO61000, it can be. Whether beneficial ownership of the deposited tokens transfers to the protocol is the deciding question. If it does, HMRC's current analysis treats that as a disposal for CGT purposes. This is not settled law, and the outcome depends on the specific protocol mechanics."
  - question: "Do I pay tax on DeFi if I never sold to pounds?"
    answer: "Potentially yes. Under HMRC's current view a disposal occurs when beneficial ownership transfers, not when you convert to sterling. Depositing into a lending protocol or liquidity pool, receiving an LP or receipt token in exchange, and later withdrawing are each potentially taxable events. 'I never cashed out' is not a defence for these interactions any more than it is for crypto-to-crypto swaps."
  - question: "Is DeFi lending taxed as income or capital gains?"
    answer: "The returns earned (interest, fees distributed to LP token holders) are assessed under HMRC's current guidance as either miscellaneous income or trading income on receipt, valued in sterling at the date of receipt. The deposit and withdrawal of the principal tokens raise a separate CGT question. These are two distinct tax events. The precise treatment depends on the protocol mechanics and the nature of the return."
  - question: "Are the DeFi tax rules settled in the UK?"
    answer: "No. HMRC's Cryptoassets Manual at CRYPTO61000 sets out HMRC's current analysis, but this is manual guidance, not legislation. Parliament was consulted in 2023 on a proposal to create a specific DeFi lending and staking tax framework, but that consultation was not enacted. The manual-only position is the operative framework until legislation is passed."
  - question: "Why did my crypto tax software miss my DeFi transactions?"
    answer: "Most software treats the deposit of tokens into a protocol as a transfer rather than a disposal, because classifying it as a disposal requires a judgment about beneficial ownership that the software cannot make automatically. The software is not wrong to flag uncertainty; it is wrong to default to 'no disposal' without flagging it. Returns based on software output alone often under-report DeFi activity."
  - question: "What is the beneficial-ownership test?"
    answer: "When you deposit tokens into a DeFi protocol, the question is whether you retain the legal and economic ownership of those specific tokens or whether that ownership passes to the protocol or its smart contract. If ownership passes, HMRC's current analysis treats the deposit as a disposal of the original tokens and an acquisition of whatever you receive in return (an LP token, a receipt token, or a claim). The answer depends on the protocol's legal structure and smart-contract mechanics."
  - question: "Did the 2023 DeFi consultation change the law?"
    answer: "No. The 2023 consultation set out a proposed legislative framework that would have given DeFi transactions more favourable treatment, deferring any disposal until the point of final withdrawal. That proposal was not enacted. HMRC's current manual guidance, which can result in a disposal at the point of deposit, remains the operative position."
---
<p>This post states HMRC's current published analysis of DeFi lending and liquidity pool transactions. That analysis is not settled law. Every claim below is framed as HMRC's current view under <a href="https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto61000">CRYPTO61000</a> and carries that qualification throughout.</p>

<h2>The short answer: under HMRC's current view many DeFi deposits and LP entries are disposals, and the rules are not settled</h2>

<p>Under HMRC's current analysis, set out in the <a href="https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto61000">Cryptoassets Manual at CRYPTO61000</a>, depositing tokens into a DeFi lending protocol or a liquidity pool can be a taxable disposal for Capital Gains Tax at the moment of deposit. Not at the moment you withdraw. Not at the moment you convert to sterling. At the moment you deposit.</p>

<p>This is HMRC's current view, not settled law. Parliament consulted in 2023 on a proposal to change this, but that consultation was not enacted. The manual-only position is what applies now.</p>

<p>The result is that DeFi deposits, liquidity pool entries, and the associated withdrawals are almost certainly the most under-reported event class in self-filed UK crypto returns. Most crypto tax software treats these interactions as non-events by default. Most DIY guides skip them or soft-pedal them. And most holders using DeFi protocols do not know this is HMRC's current position.</p>

<p>This post explains why HMRC takes that view, where the uncertainty sits, and what a defensible return position looks like. It does not give personal advice; what the analysis means for your specific transactions depends on the mechanics of the protocols you used and requires professional judgment.</p>

<h2>What HMRC actually says: the Cryptoassets Manual is manual-only, not legislation</h2>

<p>HMRC's position on DeFi is published in the <a href="https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto61000">Cryptoassets Manual at CRYPTO61000</a>. It is important to understand what that document is and what it is not.</p>

<p>The Cryptoassets Manual is HMRC's internal guidance to its own inspectors. It sets out how HMRC currently interprets existing tax law as applied to cryptoassets. It is not legislation. Parliament has not passed a statute that specifically addresses DeFi lending, liquidity pools, or liquid staking. The manual applies general CGT principles (principally the law on disposals and beneficial ownership) to the DeFi context, and HMRC's inspectors are expected to follow it. But it can be challenged, and courts have not tested many of its positions.</p>

<p>In 2023, HMRC and HM Treasury published a consultation on introducing a specific legislative framework for DeFi lending and staking. That consultation proposed treating DeFi transactions more favourably, broadly deferring any disposal until the point of final withdrawal. That proposal was not enacted. No legislation followed. The manual guidance, with all its uncertainty, remains the operative framework.</p>

<p>This is the factual backdrop every DeFi return in the UK is filed against. A position taken on a DeFi transaction is a position taken under manual guidance that has not been tested in legislation or case law.</p>

<h2>Why depositing tokens can be a disposal: the beneficial-ownership question</h2>

<p>Under general CGT principles, a disposal occurs when you part with an asset or when beneficial ownership of an asset transfers to someone else. You do not need to receive cash. You do not need to convert to sterling. The question is whether the economic and legal ownership of the tokens has moved.</p>

<p>When you deposit tokens into a DeFi protocol, two things happen immediately. The tokens leave your wallet. In return, you typically receive something else: an LP token representing your pool share, a receipt token (such as a cToken on Compound or an aToken on Aave), or a claim in the protocol's accounting. What HMRC's current analysis asks is: did beneficial ownership of the original deposited tokens pass to the protocol when you made that deposit?</p>

<p>Under <a href="https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto61000">CRYPTO61000</a>, HMRC's current view is that in many cases the answer is yes. When tokens are pooled with other users' assets, used by the protocol for lending or liquidity provision, and are no longer individually traceable to your wallet, the beneficial ownership of those specific tokens has typically transferred. Under that analysis, the deposit is a disposal of the original tokens (at sterling market value at the date of deposit) and a simultaneous acquisition of the LP or receipt token you received in exchange.</p>

<p>This is HMRC's current view, not settled law. The outcome is fact-specific and depends on the legal structure of the protocol, the mechanics of the smart contract, and whether the tokens remain individually identifiable or are pooled. A protocol that holds tokens in a dedicated escrow that you can recall at any time presents a different analysis from one that pools all depositors' assets into a shared liquidity reserve.</p>

<p>The point is that you cannot read the disposal answer off the surface of the transaction. You cannot assume the deposit is a non-event because you received something back. The beneficial-ownership question requires analysis of the specific protocol, and that analysis is not something a piece of software can perform automatically.</p>

<h2>Liquidity pools: entering, LP tokens, and the disposal that DIY returns miss</h2>

<p>Liquidity pools are the clearest example of the disposal risk under HMRC's current analysis. When you deposit a token pair into a decentralised exchange liquidity pool (such as Uniswap, Curve, or Balancer), you receive LP tokens representing your share of the pool. Those LP tokens are a different asset from the tokens you deposited.</p>

<p>Under HMRC's current analysis, this sequence of events involves two disposal questions, not one.</p>

<p>First, on entry: the deposit of the original tokens is potentially a disposal of those tokens at their sterling value at the date of deposit (if beneficial ownership transfers to the pool). You simultaneously acquire LP tokens at their acquisition value, which in practice equals the sterling value of what you put in.</p>

<p>Second, on exit: when you withdraw your position, you return the LP tokens to the protocol and receive your proportion of the pool (in whatever mix the pool holds at that point). Under HMRC's current view, this is a disposal of the LP tokens. The gain or loss on the LP tokens is the difference between what you receive on exit (valued in sterling) and your acquisition cost of the LP tokens (effectively what you put in at entry).</p>

<p>In addition to those two CGT questions, the trading fees and rewards earned while your tokens are in the pool are a separate income question. Under HMRC's current analysis, fees accrued and distributed to LP token holders may be income on receipt, valued in sterling.</p>

<p>Most DIY crypto tax returns miss all of this. The software records the withdrawal and the final conversion, but not the entry disposal. The result is a return that recognises only the final asset sale and omits every disposal that occurred inside the DeFi interaction. This is HMRC's current view of the correct treatment, not a settled legislative requirement, but it is the view that an HMRC enquiry would apply.</p>

<h2>Lending and liquid staking: the return as income or capital, and the deposit question again</h2>

<p>DeFi lending protocols (where you deposit tokens to earn yield) and liquid-staking platforms (where you deposit a proof-of-stake token and receive a liquid staking token in return) present the same beneficial-ownership question on deposit, plus a separate question about how the yield is taxed.</p>

<p><strong>The deposit question:</strong> the same analysis as liquidity pools applies. Whether depositing your tokens into a lending protocol or a liquid-staking platform is itself a disposal depends on whether beneficial ownership of the original tokens transfers. Under HMRC's current view the answer will often be yes, particularly where the protocol pools assets or where the liquid staking token you receive is a materially different asset from the underlying staked token.</p>

<p><strong>The yield question:</strong> interest earned on a DeFi lending position and staking rewards earned on a liquid-staking platform are most likely taxable as miscellaneous income (or potentially trading income in exceptional circumstances) on receipt, valued in sterling at the date of receipt. Under the two-step that applies to all crypto income receipts (consistent with <a href="https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto21200">CRYPTO21200</a>), that receipt value becomes your CGT base cost for the tokens received as yield, so the income and CGT questions interact.</p>

<p>The £1,000 miscellaneous income allowance can shelter small yield receipts from income tax, but it does not remove any CGT liability on the later disposal of those tokens.</p>

<p>The treatment of liquid staking specifically sits at the most unsettled end of an unsettled area. The asset you receive (a liquid staking token such as stETH or rETH) may accrue value as staking rewards accumulate, or it may be a rebasing token. Each protocol structure produces a different analysis of when income arises, how it is valued, and what the CGT base cost is. This is not a judgment that can be automated.</p>

<h2>Why this is the most under-reported event class in DIY returns</h2>

<p>Three factors combine to make DeFi disposals the most under-reported event class in self-filed UK crypto returns.</p>

<p><strong>The "I never sold" misconception:</strong> most crypto holders treat a taxable event as something that happens when they convert to pounds. They know crypto-to-crypto swaps are technically taxable but may not track them carefully. DeFi deposits feel even further from "selling" than swaps do. The mental model is wrong in both cases, but DeFi is where the gap between mental model and HMRC's current position is widest.</p>

<p><strong>Software defaults:</strong> the major crypto tax software platforms cannot determine whether beneficial ownership transfers on a given DeFi deposit without knowing the protocol's legal structure and smart-contract mechanics. Rather than flag every DeFi interaction as a potential disposal requiring review, most platforms default to treating the deposit as a transfer and the withdrawal as the disposal event. This is a conservative product decision, not a tax ruling. The software output should be treated as a starting point, not a completed return.</p>

<p><strong>No visible "sale":</strong> when you swap one token for another on a centralised exchange, there is a clear trade ticket. DeFi interactions produce a transaction hash, an LP token in your wallet, and no explicit "sell" record. The disposal is embedded in the protocol interaction, not visible as a sale. Without a deliberate review of every DeFi transaction against HMRC's current analysis, these disposals are invisible in the raw data.</p>

<p>The combined effect is that a holder who has been active in DeFi protocols for one or more years may have accumulated a significant CGT exposure that does not appear in their software-generated tax report. Under HMRC's current view, that exposure exists from the date of each deposit, not from the date of any subsequent conversion.</p>

<h2>The honest part: this is HMRC's current view, not settled law</h2>

<p>Every position stated in this post is HMRC's current view as published in <a href="https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto61000">CRYPTO61000</a>. That framing is not a disclaimer bolted on for caution. It is an accurate description of where the law actually sits.</p>

<p>The key uncertainties are genuine.</p>

<p>The beneficial-ownership test has not been tested in court for DeFi specifically. The outcome of an enquiry into a DeFi disposal would depend on how a tribunal analysed the protocol mechanics under general property law principles. Different protocols may produce different outcomes. The manual does not settle those individual questions.</p>

<p>The 2023 consultation outcome matters here. The consultation proposed treating DeFi transactions as neither a disposal on entry nor an income event during the lending or staking period, deferring everything to the point of final withdrawal. If that framework had been enacted, the entire analysis above would look very different. It was not enacted. But it was published as a serious legislative proposal, which tells you that HMRC recognised the current position creates difficulties. The consultation remains on the public record as evidence that the current manual guidance may not reflect the intended long-term outcome.</p>

<p>The honest commercial position is this: the disposal risk under HMRC's current view is real, not minimal, and the uncertainty is about the law, not about the size of the exposure. A DeFi-active holder who has treated deposits as non-events is exposed under the operative manual guidance, even though that guidance is not legislation. The right response is not to assume the risk away. It is to take a defensible position based on consistent application of HMRC's current analysis, with documentation to support it.</p>

<h2>What a defensible position looks like</h2>

<p>A defensible DeFi tax position has three components.</p>

<p><strong>Consistent treatment:</strong> pick a treatment for each type of protocol interaction (LP deposit, lending deposit, liquid staking deposit) and apply it consistently across every similar interaction in the year. Inconsistent treatment, where similar deposits are treated differently without a principled reason, is the most exposed position in an enquiry.</p>

<p><strong>Protocol-level documentation:</strong> record, at the time of each interaction, the protocol name, the protocol's documentation or whitepaper describing how deposits are held and whether they are pooled, the transaction hash, the sterling value of the deposited tokens, and the sterling value and quantity of the receipt or LP tokens received. This documentation is what supports the judgment call if HMRC asks about it.</p>

<p><strong>Professional judgment on the beneficial-ownership question:</strong> for material positions, the beneficial-ownership call should be made by a tax professional who has reviewed the protocol mechanics, not defaulted to the software output. Where the position adopted is that a deposit is not a disposal (because the analysis of the specific protocol supports that conclusion), that judgment needs to be documented and defensible. Where the position is that the deposit is a disposal, the CGT calculation needs to be correct (base cost, acquisition date, and in the context of the wider <a href="https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22200">s104 pool</a> for the token).</p>

<p>A table summarising the main DeFi interaction types and HMRC's current view on each is set out below. Every row in this table carries the same qualification: this is HMRC's current view under manual guidance, not settled law. The outcome for a specific protocol interaction may differ.</p>

<table>
  <thead>
    <tr>
      <th>DeFi action</th>
      <th>HMRC's current view (CRYPTO61000)</th>
      <th>Income question</th>
      <th>Settled law?</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Deposit tokens into a lending protocol (e.g. Aave, Compound)</td>
      <td>Potentially a disposal of the deposited tokens if beneficial ownership transfers to the protocol. Receipt token acquired at same value.</td>
      <td>Interest earned is likely miscellaneous income on receipt, valued in sterling.</td>
      <td>No. Manual guidance only. 2023 consultation not enacted.</td>
    </tr>
    <tr>
      <td>Deposit token pair into an AMM liquidity pool (e.g. Uniswap, Curve)</td>
      <td>Potentially a disposal of both deposited tokens if beneficial ownership transfers. LP token acquired at same value.</td>
      <td>Fees distributed to LP token holders are likely miscellaneous income on receipt or on distribution.</td>
      <td>No. Manual guidance only. 2023 consultation not enacted.</td>
    </tr>
    <tr>
      <td>Withdraw from lending protocol (return receipt token, receive underlying)</td>
      <td>Potentially a disposal of the receipt token. Gain or loss versus acquisition cost of receipt token.</td>
      <td>No additional income event on withdrawal (income already assessed on receipt of interest).</td>
      <td>No. Manual guidance only. 2023 consultation not enacted.</td>
    </tr>
    <tr>
      <td>Withdraw from liquidity pool (return LP token, receive pool share)</td>
      <td>Potentially a disposal of the LP token. Gain or loss versus acquisition cost of LP token.</td>
      <td>No additional income event on withdrawal (fees already assessed on distribution).</td>
      <td>No. Manual guidance only. 2023 consultation not enacted.</td>
    </tr>
    <tr>
      <td>Deposit to liquid staking platform (e.g. Lido, Rocket Pool)</td>
      <td>Potentially a disposal of the staked token if beneficial ownership transfers. Liquid staking token acquired at same value.</td>
      <td>Staking rewards earned are likely miscellaneous income on receipt, valued in sterling.</td>
      <td>No. Among the most unsettled positions in the manual. 2023 consultation not enacted.</td>
    </tr>
  </tbody>
</table>

<h2>Getting a defensible DeFi position</h2>

<p>If you have been active in DeFi protocols during any tax year since 2018, the most useful thing you can do now is establish what interactions you have had and whether they have been correctly treated in any returns you have filed.</p>

<p>The practical steps are: export your full on-chain transaction history for each wallet and protocol; identify every deposit, withdrawal, and yield receipt; and assess whether the software or returns you have used have treated deposits as disposals or as transfers. Where deposits have been treated as transfers, there is a potential under-reporting exposure under HMRC's current view.</p>

<p>For holders who have not filed for years in which DeFi activity occurred, or who know their filed returns missed these events, HMRC operates a <a href="https://www.gov.uk/guidance/tell-hmrc-about-unpaid-tax-on-cryptoassets">voluntary disclosure service</a> for cryptoasset tax. An unprompted disclosure typically secures lower penalties than a prompted one. How many years are in scope depends on behaviour: four years for reasonable care, six for carelessness, twenty for deliberate understatement. Getting professional advice before making any disclosure is strongly advisable.</p>

<p>For holders who are currently active in DeFi and planning future transactions, the question is how to set up consistent, documented treatment going forward so that each year's return is defensible under HMRC's current view. That means protocol-level analysis at the time of each material deposit, not retrospective reconstruction from blockchain data.</p>

<p>Given that the rules are not settled, the honest position is that a specialist with current knowledge of the manual guidance, the 2023 consultation record, and the mechanics of the specific protocols you use is better placed to make these judgments than a generalised software tool. If you use DeFi protocols and want to know where you stand, the <a href="/for/defi-and-staking">DeFi and staking service</a> is the right starting point.</p>

<p>For context on the CGT mechanics that apply once a disposal is identified (s104 pooling, same-day and 30-day rules, rates, and the annual exempt amount), the <a href="/for/investors">investors guide</a> covers the baseline. The beneficial-ownership and income questions specific to DeFi are layered on top of those fundamentals.</p>
