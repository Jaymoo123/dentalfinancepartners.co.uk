---
title: "Crypto Same-Day and 30-Day Rules: A Worked Example"
slug: "crypto-same-day-30-day-rules-worked-example"
date: "2026-07-14"
author: ""
category: "Crypto CGT & Disposals"
metaTitle: "Crypto Same-Day & 30-Day Rules: Worked Example UK"
metaDescription: "The same-day rule, then the 30-day bed-and-breakfasting rule, then the s104 pool. One numeric worked example carried through all three steps."
h1: "Crypto Same-Day and 30-Day Rules: A Full Worked Example"
summary: "The three-step UK matching order for crypto disposals, with a complete numeric worked example showing same-day, 30-day and s104 pool steps in sequence."
keyTakeaways:
  - "Disposals match same-day acquisitions first, then acquisitions in the next 30 days, then the s104 pool, in that exact order."
  - "The same-day buy never enters the s104 pool; the 30-day buy enters the pool only if not matched."
  - "FIFO, LIFO and specific-identification are wrong for UK individuals; the s104 average-cost pool is the correct method."
  - "No stateless web calculator can apply the same-day and 30-day rules correctly, reconciliation requires the full transaction ledger."
  - "After the annual exempt amount of £3,000, CGT is 18% on gains within your remaining basic-rate band and 24% above it."
faqs:
  - question: "What is the bed and breakfasting rule for crypto?"
    answer: "The 30-day (bed-and-breakfasting) rule means that if you sell a cryptoasset and then buy the same token within the next 30 days, HMRC matches the disposal against that later purchase rather than against your s104 pool. This prevents you from crystallising a loss (or locking in a gain at a higher cost) by selling and quickly rebuying. See HMRC CRYPTO22250."
  - question: "Does the 30-day rule apply to crypto in the UK?"
    answer: "Yes. The same share-matching rules that apply to shares apply to cryptoassets. Disposals match same-day acquisitions first, then acquisitions in the following 30 days, then the s104 pool. Source: HMRC CRYPTO22250."
  - question: "What order do you match crypto disposals in the UK?"
    answer: "Same-day acquisitions first, then acquisitions in the following 30 days (chronological order), then the s104 average-cost pool. This is fixed by statute and cannot be changed by the taxpayer."
  - question: "Why does my Koinly report differ from HMRC rules?"
    answer: "Many crypto-tax software tools default to FIFO or specific-identification matching, which is the US method. UK law requires the same-day rule, then the 30-day rule, then the s104 average-cost pool. Software that does not implement all three steps in the correct order will produce incorrect UK figures."
  - question: "Is FIFO allowed for UK crypto tax?"
    answer: "No. FIFO (first-in, first-out) is not a permitted method for UK individuals calculating crypto CGT. The correct method is the s104 average-cost pool, subject to the same-day and 30-day matching rules taking priority. Source: HMRC CRYPTO22200."
  - question: "What is a section 104 pool?"
    answer: "The s104 pool holds all your acquisitions of a given token in one aggregate. The allowable cost on any disposal is the average cost of the pool at that date. Each token type has its own separate pool. Source: HMRC CRYPTO22200."
  - question: "How does the same-day rule work for crypto?"
    answer: "If you buy and sell the same cryptoasset on the same day, HMRC matches the disposal against the same-day acquisition, using that acquisition's actual cost rather than the pool average. The same-day acquisition does not enter the s104 pool at all."
---
<h2>The short answer: three steps, fixed order</h2>

<p>When you dispose of a cryptoasset, HMRC requires you to match the disposal against acquisitions in a fixed order. Step one: acquisitions made on the same day as the disposal. Step two: acquisitions made in the 30 days immediately following the disposal (the bed-and-breakfasting rule), matched chronologically. Step three: the <a href="https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22200">s104 pool</a> at average cost. You work through the steps in sequence; only unmatched amounts fall through to the next step.</p>

<p>This ordering is set by statute and applies to all UK individuals holding cryptoassets as investments. It is also the single biggest source of DIY-calculation error for active traders, because most crypto-tax software defaults to FIFO or specific-identification matching, which are US methods and are wrong for UK tax purposes. The rules are confirmed at <a href="https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22250">HMRC CRYPTO22250</a>.</p>

<h2>Step 1: the same-day rule</h2>

<p>If you acquire and dispose of the same token on the same date, the disposal is matched against that day's acquisition first, at the actual acquisition cost paid that day. The same-day acquisition is consumed by the match and does not enter the s104 pool at all. If you sell more than you buy on the same day, the surplus falls through to step two.</p>

<p>This rule exists to prevent a simple tax play: buying in the morning, selling at a gain in the afternoon, and claiming the pool average cost (which might be much lower) as the deductible cost. The same-day rule closes that by using the actual same-day cost instead.</p>

<h2>Step 2: the 30-day (bed-and-breakfasting) rule</h2>

<p>Any disposal not matched under the same-day rule is then matched against acquisitions of the same token in the 30 days immediately after the disposal date, in chronological order (earliest acquisition first). This is the bed-and-breakfasting rule, named after the historic share practice of selling before tax year end and rebuying the next morning to crystallise a gain or loss.</p>

<p>The 30-day rule matters most in two scenarios. First, where you sell at a loss and rebuy within 30 days: without the rule, you could crystallise the loss while still holding the position. The rule neutralises this by matching the disposal against the rebuy cost rather than the pool, reducing or eliminating the loss. Second, where you sell at a gain and rebuy at a higher price: the rule prevents you from artificially inflating your pool's average cost by using the cheaper pool cost against the disposal proceeds.</p>

<p>Acquisitions matched under the 30-day rule also do not enter the s104 pool; only unmatched acquisitions go into the pool.</p>

<h2>Step 3: the s104 pool</h2>

<p>Once same-day and 30-day matching are exhausted, any remaining disposal amount is matched against the <a href="https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22200">s104 pool</a>. The pool holds all previous unmatched acquisitions of the token, and the allowable cost is the pool's average cost at the time of disposal. Each token type has one pool; ETH is one pool, BTC is another, and so on.</p>

<p>The average cost updates every time an unmatched acquisition enters the pool: new cost divided by new total quantity. When a disposal draws from the pool, the corresponding cost leaves the pool proportionally, and the average remains unchanged for the remaining balance.</p>

<p>FIFO, LIFO and specific-identification are not permitted for UK individuals. Presenting HMRC with a FIFO calculation is not a minor formatting preference; it is a different calculation that will usually produce a different gain or loss, and HMRC expects the correct UK method.</p>

<h2>Worked example: all three steps in one scenario</h2>

<p>The following example uses a single token (call it ETH for readability) with four transactions across six weeks. The prices are illustrative; the matching logic and arithmetic reflect the actual UK rules. Work through it in date order, applying the matching steps after all transactions are visible.</p>

<h3>Transaction ledger</h3>

<table>
  <thead>
    <tr>
      <th>Date</th>
      <th>Event</th>
      <th>Quantity</th>
      <th>Price per ETH</th>
      <th>Total £</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>15 Jan</td>
      <td>Buy</td>
      <td>10 ETH</td>
      <td>£1,200</td>
      <td>£12,000</td>
    </tr>
    <tr>
      <td>20 Feb</td>
      <td>Buy</td>
      <td>2 ETH</td>
      <td>£1,500</td>
      <td>£3,000</td>
    </tr>
    <tr>
      <td>20 Feb</td>
      <td>Sell</td>
      <td>8 ETH</td>
      <td>£2,000</td>
      <td>£16,000 proceeds</td>
    </tr>
    <tr>
      <td>5 Mar</td>
      <td>Buy</td>
      <td>3 ETH</td>
      <td>£1,800</td>
      <td>£5,400</td>
    </tr>
  </tbody>
</table>

<p>The disposal is the 8 ETH sold on 20 February for £16,000. Apply the three steps.</p>

<h3>Applying the matching rules</h3>

<p><strong>Step 1, Same-day (20 Feb buy of 2 ETH):</strong> The 20 Feb disposal is matched first against the 20 Feb acquisition. 2 ETH are matched at the actual cost of £1,500 each = £3,000. This 2 ETH buy does not enter the pool. That leaves 6 ETH of the disposal unmatched.</p>

<p><strong>Step 2, 30-day (5 Mar buy of 3 ETH):</strong> The 5 Mar buy falls within 30 days after 20 Feb, so 3 ETH are matched against the disposal at the 5 Mar acquisition cost: 3 ETH × £1,800 = £5,400. This 3 ETH buy does not enter the pool. That leaves 3 ETH of the disposal unmatched.</p>

<p><strong>Step 3, s104 pool (remaining 3 ETH):</strong> The pool at the point of disposal holds only the 15 Jan buy (the same-day and 30-day buys were matched out, not pooled). Pool: 10 ETH, total cost £12,000, average cost £1,200. The disposal draws 3 ETH from the pool at £1,200 each = £3,600. Pool balance after: 7 ETH, remaining cost £8,400, average still £1,200.</p>

<h3>Gain on each matched tranche</h3>

<table>
  <thead>
    <tr>
      <th>Matched by</th>
      <th>ETH matched</th>
      <th>Proceeds (@ £2,000)</th>
      <th>Allowable cost</th>
      <th>Gain</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Same-day rule</td>
      <td>2 ETH</td>
      <td>£4,000</td>
      <td>£3,000 (@ £1,500)</td>
      <td>£1,000</td>
    </tr>
    <tr>
      <td>30-day rule</td>
      <td>3 ETH</td>
      <td>£6,000</td>
      <td>£5,400 (@ £1,800)</td>
      <td>£600</td>
    </tr>
    <tr>
      <td>s104 pool</td>
      <td>3 ETH</td>
      <td>£6,000</td>
      <td>£3,600 (@ £1,200 avg)</td>
      <td>£2,400</td>
    </tr>
    <tr>
      <td><strong>Total</strong></td>
      <td><strong>8 ETH</strong></td>
      <td><strong>£16,000</strong></td>
      <td><strong>£12,000</strong></td>
      <td><strong>£4,000</strong></td>
    </tr>
  </tbody>
</table>

<p>Cross-check: total proceeds £16,000 minus total allowable cost (£3,000 + £5,400 + £3,600 = £12,000) = £4,000 gain. Confirmed.</p>

<h3>Pool state summary</h3>

<table>
  <thead>
    <tr>
      <th>After event</th>
      <th>Pool ETH</th>
      <th>Pool cost</th>
      <th>Avg cost/ETH</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>15 Jan buy (enters pool)</td>
      <td>10 ETH</td>
      <td>£12,000</td>
      <td>£1,200</td>
    </tr>
    <tr>
      <td>20 Feb buy (matched same-day, does NOT enter pool)</td>
      <td>10 ETH</td>
      <td>£12,000</td>
      <td>£1,200</td>
    </tr>
    <tr>
      <td>20 Feb disposal (3 ETH drawn from pool)</td>
      <td>7 ETH</td>
      <td>£8,400</td>
      <td>£1,200</td>
    </tr>
    <tr>
      <td>5 Mar buy (matched 30-day, does NOT enter pool)</td>
      <td>7 ETH</td>
      <td>£8,400</td>
      <td>£1,200</td>
    </tr>
  </tbody>
</table>

<h2>Why crypto-tax software often gets this wrong</h2>

<p>Most crypto-tax software is built primarily for the US market, where the IRS allows taxpayers to choose FIFO, LIFO or specific-identification as their cost basis method. That choice is unavailable to UK individuals. HMRC requires the <a href="https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22200">s104 average-cost pool</a>, overridden by the same-day and 30-day rules per <a href="https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22250">CRYPTO22250</a>.</p>

<p>A FIFO calculation on the example above would match the 15 Jan buy (cost £1,200/ETH) against the disposal first, producing a larger gain on those units. A specific-identification approach might let you pick the most expensive lots to minimise the gain. Both produce numbers that HMRC does not accept. The difference between the correct UK figure and a FIFO figure can easily run to thousands of pounds on a moderately active year.</p>

<p>Even software that advertises UK support may implement the 30-day rule with known gaps: applying it only to loss-making disposals, not checking whether a purchase in the 30 days after a profitable disposal triggers the rule, or failing to handle the case where multiple same-day acquisitions and disposals occur in different proportions. These are not obscure edge cases for active traders; they are normal weeks of activity.</p>

<p>The deeper issue is that the same-day and 30-day steps require the software to look forward in time from each disposal, not just backward. A stateless calculation that processes your CSV in date order cannot do this correctly without a full two-pass over the ledger. This is why no web-based calculator, including ours, can implement the matching rules for you: it requires your full transaction history and a calculation that is specific to your ledger.</p>

<h2>Where this leaves your CGT figure</h2>

<p>Once you have the total gain from all disposals in the tax year, the CGT calculation follows a fixed sequence.</p>

<p>First, offset any allowable capital losses from the same year or carried forward from earlier years. Losses must be claimed to be usable; unclaimed loss years are a common source of overpaid tax.</p>

<p>Second, deduct the <a href="https://www.gov.uk/capital-gains-tax/allowances">annual exempt amount of £3,000</a> (frozen, 2026/27). If your net gains after losses are £3,000 or below, there is no CGT to pay, though the disposals may still need to be reported if your total proceeds exceed the reporting threshold.</p>

<p>Third, apply the rate to what remains. Cryptoassets are non-residential assets. A basic-rate taxpayer pays <a href="https://www.gov.uk/capital-gains-tax/rates">18% only on the portion of the taxable gain that fits inside their remaining basic-rate band</a> (the basic-rate band ceiling is £37,700 of taxable income for 2026/27; the remaining room is £37,700 minus your taxable income other than the gain). Any gain above that boundary is taxed at 24%. Higher-rate and additional-rate taxpayers pay 24% on the whole taxable gain.</p>

<p>Continuing the example: total gain is £4,000. Assume no losses and no other disposals in the year. After the £3,000 annual exempt amount, taxable gain is £1,000. If the taxpayer has £30,000 of other taxable income, their remaining basic-rate band is £37,700 minus £30,000 = £7,700. The £1,000 gain fits entirely within that room: CGT at 18% = £180. If the taxpayer is a higher-rate taxpayer with no remaining basic-rate band, CGT at 24% = £240.</p>

<p>Note that this example involves a single disposal. Active traders and anyone who swaps tokens frequently may have dozens or hundreds of CGT events in a year, since <a href="https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-sell-cryptoassets">crypto-to-crypto swaps are themselves disposals</a> at the sterling market value at the moment of the swap. The £3,000 annual exempt amount is exhausted quickly under those conditions.</p>

<h2>Getting your numbers reconciled</h2>

<p>If you have used Koinly, Recap, CoinTracker or a similar tool to generate a tax report, the figures it produces may differ from a correct UK calculation for the reasons described above. The most common gaps are: FIFO used instead of average cost, the 30-day rule applied only to loss-making disposals, same-day matching omitted or incomplete, and DeFi deposit events not treated as disposals.</p>

<p>Our <a href="/services/koinly-recap-reconciliation">crypto-tax software report review and reconciliation service</a> works through your full transaction export against the UK rules and identifies where the software output diverges from what you would owe. The outcome is a corrected CGT figure and, where needed, a corrected Self Assessment return.</p>

<p>For a rough scenario estimate on a straightforward position (pool-only, no same-day or 30-day matching), use our <a href="/calculators/crypto-cgt-estimator">crypto CGT estimator</a>. The tool applies the s104 pool at average cost and states clearly that it does not model the same-day or 30-day rules. Use it for ballpark planning, not as a filing figure.</p>

<p>If you are unsure whether your situation is straightforward or not, the short answer is: if you traded more than once a month, swapped between tokens, used a DeFi protocol, or received staking or mining rewards, it is almost certainly not straightforward. A <a href="/services/crypto-self-assessment">crypto Self Assessment review</a> is the right starting point.</p>
