---
slug: vat-on-second-hand-cars
tier: blog
category: "VAT and Making Tax Digital"
route: /blog/vat-and-making-tax-digital/vat-on-second-hand-cars
intent: DIY-INFORMATIONAL head term (1,550/mo). Buyer-side and dealer-side "is there VAT on this car". Pillar for "VAT on vehicles and the motor trade".
---
# Brief: VAT on second hand cars

> Wave-5 high-street mechanic asset. PILLAR of the motor cluster. **Motor-finance fence applies (HP 21.2), mandatory.** Body references "the dealer" / "the buyer". No em-dashes. Faceless. Raw-HTML body. First prose block must be a plain sentence of 30+ characters.

## Target queries (REQUIRED PHRASINGS, NOT SUGGESTIONS)

These three phrasings are binding. Each must appear naturally in a heading, in body prose, or in an FAQ question, in the words people typed. Google returns substantially the same results for them, so **you may not split any of them into another page.** Flag in the Q&A file if you disagree and keep writing.

```
vat on second hand cars
vat on cars
vat on new cars
```

`covers_note` in the picks data: **"reclaiming vat on cars" was reassigned to `vat-on-company-cars`** at the Stage 1b conflict adjudication. It is not on this page's list and this page must not compete for it.

## CONFLICT FENCE (binding, put this in the writer's head before the H1)

`vat-on-company-cars` owns **all** reclaim and input-tax-block phrasings, including "reclaiming vat on cars" and "vat reclaim on company cars". This page owns **the margin scheme and the new-versus-used purchase angle**. Where a reader arrives here asking whether they can reclaim, answer in one sentence (a margin-scheme purchase has no VAT to reclaim) and link across. Do not build a reclaim section, a reclaim table, or reclaim FAQs.

## Asset type + play

Answer-first pillar built on the thing that makes used-car VAT confusing: **the same car can be sold three different ways** and the invoice looks different each time. A margin-scheme car shows no VAT at all. A qualifying car sold VAT-qualifying shows 20% on the full price. A new car always shows 20%. The page that lays those three out side by side answers "vat on cars", "vat on new cars" and "vat on second hand cars" in one table.

Second wedge: the one-sixth arithmetic is trivial but almost nobody explains that **each margin stands alone**, so a loss on one car cannot be netted against a gain on another, and that the **stock book is constitutive**, so the scheme is lost through paperwork rather than eligibility.

## Dedup evidence

- Cannibalisation verdict: **LINK**.
- `vat-margin-scheme-used-cars.md` is the dealer-side calculation page (the one-sixth mechanic, loss-making cars, exclusions, stock book detail). This page is the **head-term buyer-and-dealer question**: is there VAT on this car at all, and why does the invoice look like that. Do the one-sixth calculation once, briefly, with one worked example, then link across for the full calculation treatment. Documented wedge = "is there VAT" against "how is the VAT worked out".
- `car-dealership-accounting-uk.md` and `accountant-for-car-dealers-uk.md` are trade pages. Link both ways; do not re-run dealership accounting.
- `vat-on-company-cars`, `vat-on-electric-cars`, `vat-on-leased-cars` are this wave's siblings under the same pillar. This page is the parent and links down to all three.

## Required structure (H2 skeleton)

1. **First 60 words, the answer.** Whether there is VAT on a car depends on how the seller bought it. A new car always carries 20% VAT. A used car bought by a dealer from a private seller is usually sold under the second-hand margin scheme, where VAT is one-sixth of the dealer's margin and no VAT is shown on the invoice. A VAT-qualifying used car carries 20% on the full price.
2. New cars: 20%, always, on the full price.
3. Used cars: the three ways the same car can be sold.
4. The margin scheme: one-sixth of the margin, and what the invoice may not say.
5. **Boundary table** (see below).
6. The stock book, and why the scheme is lost on paperwork rather than eligibility.
7. Each margin stands alone: no netting, no negative margins.
8. What a private buyer actually pays, and why they cannot reclaim anything.
9. Worked examples (two, below).
10. What people get wrong.
11. The motor-finance fence sentence (see below).
12. FAQ (10 to 14).
13. Links out.

No calculator.

## BOUNDARY TABLE (mandatory, exact columns)

Columns: **"No input tax recoverable (margin-scheme or blocked)"** against **"Input tax recoverable"**. Four trade-anchored row pairs minimum:

| No input tax recoverable | Input tax recoverable |
|---|---|
| A used-car dealer buys a 2019 hatchback from a private seller: no VAT on the purchase invoice, so nothing to reclaim, and the resale runs the margin scheme | The same dealer buys an ex-fleet car on an invoice showing VAT separately: VAT-qualifying, recoverable, and the resale carries 20% on the full price |
| A driving school buys a car on a margin-scheme invoice: no VAT shown, nothing to recover, even though driving instruction is a qualifying use | A driving school buys the same car VAT-qualifying: art. 7(2E) driving-instruction use lifts the block, so the VAT is recoverable |
| A taxi operator buys a car from a private seller under the margin scheme | A taxi operator buys a VAT-qualifying car for hire with a driver carrying passengers: block lifted |
| A garage buys a courtesy car available for the owner's weekend use: blocked, availability for private use defeats the exclusive-business test (art. 7(2G)) | The same garage buys a diagnostic rig or a van with a payload of one tonne or more: not a car for VAT, ordinary recovery |
| A dealer's demonstrator sold on under the margin scheme: the buyer gets no VAT to reclaim | Unused stock in trade of a dealer: art. 7(2) exception, recoverable |

Reclaim mechanics belong to `vat-on-company-cars`. This table exists to explain **why an invoice has no VAT on it**, and every row must be written toward that question. Link across at the foot of the table.

## Worked examples (two, real figures)

1. A dealer buys a car for £6,000 and sells it for £7,800. Margin £1,800, VAT one-sixth = £300, which the dealer accounts for and does not show on the invoice.
2. The same dealer sells a second car at a loss, bought at £5,000 and sold at £4,600. No VAT, no negative margin, and it cannot be set against the £300 on the first car. Make the no-netting point explicit; it is the point of the example.

## Figures mapped to HP

| Figure | Source |
|---|---|
| Margin scheme, **one-sixth (16.67%) of the margin**, no negative margins, margin lost item by item on records | HP **§21.1**, Stage 1B B §4.2 |
| Stock book constitutive; purchase and sales invoices both ways; scheme unavailable where the purchase invoice shows VAT separately; VAT must not be shown separately on a margin-scheme sales invoice | Stage 1B B §4.2. https://www.gov.uk/guidance/using-the-vat-margin-scheme-for-second-hand-vehicles and https://www.gov.uk/guidance/buying-second-hand-vehicles-using-a-vat-margin-scheme |
| Standard rate 20% | HP §7 |
| The art. 7 input tax block, its exceptions (stock in trade, letting on hire, taxi, self-drive hire, driving instruction) and the **availability trap** at art. 7(2G) | HP **§21.2** cluster and Stage 1B B §4.1, https://www.legislation.gov.uk/uksi/1992/3222/article/7 |
| What is a "car" for VAT; the **one-tonne payload** line | Stage 1B B §4.1, VAT Notice 700/64 https://www.gov.uk/guidance/vat-on-motoring-expenses-notice-70064 |
| **Global accounting is not available for vehicles** | HP §21.1 |

**VAT Notices 718 and 718/1 are WITHDRAWN.** Do not cite either, anywhere, including in a "further reading" list. Cite the three live second-hand vehicle margin scheme guidance pages.

## MOTOR-FINANCE FENCE (HP 21.2, mandatory on this page)

No motor-finance commission or mis-selling claims content. No eligibility checker or "check if you are owed" framing. No referral to a claims management company or a law firm, and no link whose purpose is claims traffic. Managing such claims is regulated activity (RAO art 89G, FSMA s.19/s.23) and the estate holds no permission. **Ceiling: one neutral factual sentence** that motor-finance redress litigation exists, with a gov.uk or FCA link, and nothing more. HP §21.1 open question (2) applies: the status of any redress scheme moves fast, so re-check the FCA position at write time or omit the sentence.

## HP GAPS (do NOT invent, omit or link gov.uk)

1. **The global accounting £500 item ceiling** is an HP §21.1 open question and is in any case not available for vehicles. Mention global accounting only to say it does not apply to cars.
2. **VAT on a car bought from another EU or third-country seller**, and the post-Brexit import position, are not locked anywhere. Out of scope; do not touch.
3. **Double-cab pickup benefit-in-kind classification** is explicitly out of scope (Stage 1B B §4.1 note). The one-tonne payload rule you may state is the **VAT** definition only. Never present it as the benefit-in-kind test.
4. **Whether a specific named vehicle model is a car for VAT.** Give the test, not a verdict on a model.
5. No fee figures, no named experts.

## Internal links (verified to exist)

**Out:** `/blog/vat-and-making-tax-digital/vat-margin-scheme-used-cars` (the full calculation), `/blog/bookkeeping-and-compliance/car-dealership-accounting-uk`, `/blog/bookkeeping-and-compliance/accountant-for-car-dealers-uk` (both are category "Bookkeeping and Compliance", checked).
**Siblings in this wave:** `vat-on-company-cars` (reclaim, per the fence), `vat-on-electric-cars`, `vat-on-leased-cars`.
**In:** `vat-margin-scheme-used-cars.md` gains a link up to this page at WRAP.

## Body length

PILLAR: **3,500 to 4,500 body words.** FAQ 10 to 14.
