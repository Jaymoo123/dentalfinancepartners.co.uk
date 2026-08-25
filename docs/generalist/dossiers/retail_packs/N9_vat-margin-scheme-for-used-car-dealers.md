# PACK N9: net-new — VAT margin scheme for used car dealers

Derived 2026-08-25 from FROZEN dossier `../retail_product_2026-08-25.md` only. Reads with
`language_spec.md` (lead structure: **worked-arithmetic-led**). Second surface of the motor-trade
spine and, per the dossier, **the operator problem that anchors the niche**.

## 1. Target and permission level

- NET-NEW page. Proposed slug: `vat-margin-scheme-used-cars` (writer may refine).
- Grade NET-NEW. Revert path: delete pre-deploy; post-deploy enters `monitored_pages`.
- **C1 GATE: row 70 C1 CONDITIONAL. The §21.2 motor-finance fence applies in full to this page**
  exactly as it does to N8. See §6.
- Ground truth: **§21.1** (margin schemes in full, and the used-car specifics), **§21.2** (the
  fence), **§7** (VAT registration, rates, MTD for VAT). §21 authored and locked 2026-08-25.
- **Open-question gates at write, both from §21:**
  - **Open question 1 (hard for this page):** the **global accounting £500 item ceiling and the
    current Notice 718 wording were not fetched line by line.** §21 says verify before a page states
    it. This page's global-accounting paragraph is gated on that verification. Until verified, the
    page states that global accounting exists as a sub-scheme for high-volume low-value dealers and
    that **it is not available for vehicles** (which is the point that matters here and is separately
    locked), and does not state the £500 figure.
  - **Open question 2:** re-check the FCA motor-finance redress position at write. Record it.

## 2. Equity register

None (net-new). N8 owns the hire framing; this page owns the arithmetic.

## 3. Market keyword slice (ledger, inside the row-70 family, ~80/mo)

The ledger assigns one motor-trade row (`car dealer accountant`, 40/mo) to the cluster as a whole;
the margin-scheme phrasings were not separately measured because the specialist harvests were
gate-blocked (delta **D1**) and the free expansions for motor trade were not run (delta **D4**).
Target phrasings, unmeasured but named: vat margin scheme used cars; second hand car margin scheme;
how to calculate vat on a used car; margin scheme stock book; do I charge VAT on a used car.

**Coverage over selection: unmeasured is not a reason to shrink the page.** gov.uk owns the exact
head terms and will keep them; the winnable ground is the operator phrasing and the arithmetic
gov.uk does not do on a real vehicle.

## 4. Competitor teardown (fetched 2026-08-25, free; positions unmeasured)

**Both named motor-trade specialists fail on this exact topic, which is the topic that defines their
niche:**

- **themotortradeaccountants.co.uk** (the dedicated specialist, fetched today after the dossier's
  403): the margin scheme is **not mentioned anywhere on the page**. The page's figures are a
  £20,000 client tax recovery and a £15 million client turnover ceiling.
- **maynardjohns.com `/motor-trade-accountants/`** (~480 words): the second-hand car margin scheme
  appears **only as a hyperlink to gov.uk**. No explanation, no mechanics, no stock book, no example,
  no FAQ.

Neither page contains a single margin calculation. gov.uk and VAT Notice 718/1 carry the rules
correctly and are the authority, but they explain the scheme in the abstract and do not run a
vehicle through it with the paperwork attached.

## 5. Whitespace

- **The one-sixth calculation done in full, on a real vehicle, in the first screen.** Purchase price,
  sale price, margin, VAT at one-sixth (16.67%) of the margin, and the resulting net position, every
  line re-derivable. **No competitor page in this niche contains one.**
- **The record-keeping condition stated as the governing rule, not a footnote.** §21's practical
  writing rule for the whole family: margin-scheme copy leads with the record-keeping condition,
  because the scheme is lost through paperwork, not eligibility. Invoices both ways, a stock book
  with per-vehicle stock numbers and purchase and sale entries per Notice 718/1. Eligibility is lost
  item by item where records fail or where the car was bought on a VAT invoice.
- **Each margin stands alone.** Losses on one vehicle cannot net against gains on another and there
  are no negative margins. This is the single most common and most expensive error in the trade and
  it is unpublished by both specialists.
- **Global accounting is not available for vehicles.** Dealers hear about it and try to use it.
- **The bought-on-a-VAT-invoice fork**: a car bought from a VAT-registered business on a VAT invoice
  is outside the scheme for that vehicle, and the whole treatment changes.

## 6. Fences (binding)

- **§21.2 motor-finance fence, in full, identical to N8.** Permitted: margin-scheme VAT, stock
  finance accounting, dealer tax mechanics. **Barred: motor-finance commission or mis-selling claims
  content, any eligibility-check or start-a-claim invitation, any referral of a claimant, any link
  whose purpose is claims traffic.** Regulated claims management activity, RAO art 89G, FSMA s.19
  and s.23. Ceiling: one neutral factual sentence with a gov.uk or FCA link, and omitting it is the
  safer default. Line-by-line adversarial QA.
- **Global accounting £500 ceiling: do not state until §21 open question 1 is verified.** Stating an
  unverified item ceiling on a page whose whole subject is record-keeping precision would be a
  self-defeating error.
- **No scheme-optimisation framing.** The page explains a scheme and its conditions. No "how to
  maximise your margin scheme", no structuring suggestions.
- **No consumer content.** EX-CONSUMER-CAR is excluded intent: no car values, no "how much VAT will
  I pay on a used car" written for a buyer. The reader is a dealer.
- **Assignment split:** the hire framing is N8's; demonstrators, part-exchange and stocking finance
  are N10's; second-hand jewellery and antiques under the same scheme are N11's. One sentence plus a
  link each. **N11 must not repeat this page's worked calculation and this page must not carry a
  jewellery example.**
- No house-position citations in reader copy (report only): cite **VAT Notice 718/1**, VAT Notice 718
  and the gov.uk VAT margin schemes page by name instead. No em-dashes. All rates date-tagged.

## 7. Acceptance criteria (deterministic)

1. Queries answerable as H1, H2 or FAQ: VAT margin scheme for used cars; how to calculate VAT on a
   used car sale; do I charge VAT on a second-hand car; what the stock book must contain; what
   happens if I sell a car at a loss; can I use global accounting for cars; what if I bought the car
   on a VAT invoice.
2. Figures, date-tagged and recomputable: **one-sixth (16.67%) of the margin**; standard rate 20%
   for the contrast case; VAT registration £90,000 and deregistration £88,000; MTD for VAT applying
   to all VAT-registered businesses since April 2022.
3. **At least two worked calculations**: one vehicle under the margin scheme against the same
   vehicle outside it, and one loss-making vehicle demonstrating that the margin cannot go negative
   and cannot be netted. Every line re-derivable. This is the page's entire competitive claim.
4. The record-keeping condition appears **before** the eligibility discussion, per §21's writing rule.
5. **Zero barred-list content**, verified line by line at adversarial QA against §21.2.
6. No £500 global-accounting figure unless open question 1 was verified at write and the verification
   is recorded.
7. Structure follows the worked-arithmetic lead: the calculation is in the first screen. No H2
   phrasing shared with N8, N10 or N11.
8. Links: N8, N10, N11. Resolver-clean, zero invented slugs. §4 floors plus coverage floor pass.
9. FCA redress-position re-check recorded in the delivery report.

## 8. Expectation

Unmeasured phrasings inside an ~80/mo family, against a field where **the dedicated specialist does
not mention the scheme and the other names it only as a hyperlink.** This is the widest substantive
gap in the entire cluster. Realistic: Google impressions on operator phrasings within a quarter and
a credible top-10 on at least one calculation-shaped phrasing, with gov.uk holding the exact heads;
Bing earlier. Maturity caveat: net-new, judge at 28d Bing / 90d Google. Failure trigger: zero
impressions across all named phrasings at 90d post-index. **Standing risk:** if Notice 718/1's
mechanics or the global-accounting terms change, the page needs a dated back-patch, not a rewrite;
the scheme-conditions block is built to be replaceable.

## 9. Cannibalisation notes

| Existing page | Overlap | Resolution |
|---|---|---|
| `vat-flat-rate-scheme-explained.md`, `flat-rate-vat-vs-standard-vat.md` | VAT scheme choice | Different scheme entirely. One clarifying sentence at most (the margin scheme is not an alternative to the flat rate scheme, and a margin-scheme dealer generally should not be on the flat rate scheme). No link required; no shared phrasing. |
| `vat-how-to-calculate.md`, `vat-calculation-calculator.md`, `vat-calculator-uk.md`, `vat-tax-calculator.md` | VAT arithmetic | **Live sameness risk.** These four existing pages already cover generic VAT calculation and overlap each other. N9's calculation is margin-scheme specific throughout and must not read as a generic VAT calculator page. No link, no shared H2s. **The four-page generic VAT calculator overlap is flagged for a separate differentiation review outside this wave.** |
| N11 (this wave) | the same margin scheme, different goods | Split by goods: N9 vehicles (stock book, no global accounting), N11 second-hand jewellery and antiques (precious-metals and loose-stones exclusion, global accounting potentially in point). Neither repeats the other's worked example. |
| N1 (this wave) | retail VAT schemes | Different schemes with a confusable name. One clarifying sentence, no overlap. |
