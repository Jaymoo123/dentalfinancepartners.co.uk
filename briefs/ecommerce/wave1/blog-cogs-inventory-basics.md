---
slug: cogs-inventory-basics
tier: blog
route: /blog/cogs-inventory-basics
category: "Bookkeeping and Inventory"
intent: SELLER-PROBLEM. Growing sellers whose taxable profit is higher than their bank balance because cash is tied up in stock. COGS and inventory basics.
---
# Cost of Goods Sold and Inventory for Online Sellers: Why Your Profit Is Higher Than Your Bank Balance

> RAW HTML AT WRITE TIME. Blog body must be raw HTML (`<p>`, `<h2>`, `<ul>`, `<table>`), never markdown syntax. No em-dashes anywhere in user-facing copy.

## Target queries (evidence: LAUNCH_CORE.md / TOPICS.md, DataForSEO UK loc 2826, joined 2026-07-12)

- **Primary:** COGS/inventory family (TOPICS.md: "'cost of goods sold' formula/meaning family (very large)"); "profit higher than bank balance" is the named SELLER-PROBLEM in LAUNCH_CORE intent class 2. Cluster is large but SaaS/US-heavy at the head, so the UK-tax-position angle is the wedge, not the generic definition.
- **Secondary:** "cost of goods sold formula", "how to calculate cogs", "inventory accounting ecommerce", "closing stock valuation" (pool + autocomplete; UK-tax framing under-served).
- Note: generic "what is COGS" definition SERPs are SaaS-owned (LAUNCH_CORE "do NOT contest generic bookkeeping-how-to"); we contest the UK-seller decision points (stock valuation for tax, the cash-vs-profit gap), not the dictionary head.

## Search-intent class + play

SELLER-PROBLEM (assist + capture). The reader is a growing seller alarmed that HMRC wants tax on profit they cannot see in the bank (cash reinvested into stock). Play: BLUF explains the gap in one paragraph, then teaches COGS and closing-stock valuation as the mechanism, then reassures/advises. Capture edge: seller who realises their bookkeeping does not track stock properly → settlement-payout-reconciliation service or ecommerce-vat-compliance.

## Competitors to beat (COMPETITORS.md; domains only at seed, live-URL check is Stage 2)

- **SaaS content arms (A2X / Link My Books / Shopify blog)**: own the generic "what is COGS" head; beat on the UK-tax consequence (closing stock at lower of cost and NRV, the taxable-profit-vs-cash gap) they treat as software output, not a tax position.
- **Generic accounting blogs**: beat on the seller-specific worked example (reinvesting cash into inventory inflates taxable profit above cash held).

## Required structure

- H2 skeleton:
  1. The short answer: taxable profit counts sold stock as cost, not bought stock, so cash tied up in inventory does not reduce your profit (BLUF box)
  2. What COGS is, in seller terms (opening stock + purchases - closing stock)
  3. The worked example: why buying more stock does NOT cut your tax bill this year
  4. Valuing closing stock: lower of cost and net realisable value
  5. What counts in cost (landed cost: purchase + import duty + inbound shipping; describe, keep principled)
  6. The cash-vs-profit gap and what to do about it (set aside tax, plan stock buys)
  7. Where basis choice comes in (cash vs accruals; link the cash-vs-accruals blog, do not duplicate)
  8. Common failure modes (expensing all stock when bought; ignoring closing stock; confusing cash out with tax deduction)
- FAQ candidates (no answers at seed stage):
  1. Why is my taxable profit higher than my bank balance?
  2. What is cost of goods sold for an online seller?
  3. Does buying stock reduce my tax bill?
  4. How do I value my closing stock?
  5. What is net realisable value?
  6. Do import duty and shipping count in my stock cost?
  7. How do I calculate COGS?
- Table/chart opportunities: COGS worked-example table (opening stock, purchases, closing stock → COGS → gross profit); cash-vs-taxable-profit table showing the gap when cash is reinvested into inventory.
- Calculator embed: /embed/seller-take-home only if the page reaches a margin/take-home conclusion; otherwise no embed. Not the primary purpose of this page.
- Internal links within launch core: /blog/cash-vs-accruals-stock (the basis choice), settlement-payout-reconciliation (getting the numbers right from platform reports), seller-take-home (true margin tool), /for/amazon-sellers and /for/shopify-sellers (hubs).

## House positions touched

- **HP 18 (stock valuation), copied exactly:** "Under accruals accounting, closing stock is valued at the lower of cost and net realisable value. This is the cost of goods sold and inventory position that underpins every 'why is my taxable profit higher than my bank balance' page for a growing seller reinvesting cash into stock." Citation: https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim33115 (verified 2026-07-15, BIM33115).
- **HP 17 (cash vs accruals context), copied exactly for the basis pointer:** "Cash basis is the default for unincorporated businesses; accruals must be actively elected. For a stock-based ecommerce seller, accruals accounting with proper inventory tracking generally gives better decision data and smoother taxable profits." Citation: https://www.gov.uk/simpler-income-tax-cash-basis (verified 2026-07-15). Full basis treatment is owned by cash-vs-accruals-stock; only reference here.
- Consistency rule that binds this page: closing stock at lower of cost and NRV (position 18); the cash-vs-profit gap is the accruals stock mechanism.

## Hallucination danger zones

- "Lower of cost and net realisable value" is the locked rule (HP 18); do not state FIFO/average-cost as REQUIRED (they are cost-flow methods, allowable but not mandated; keep principled, do not prescribe one).
- The "buying stock does not reduce this year's tax" point is TRUE UNDER ACCRUALS; under cash basis the treatment differs. Flag the basis dependency and link cash-vs-accruals-stock, do not overclaim it as universal.
- Landed-cost components (duty, inbound shipping) are principled inclusions; do not assert a rigid rule on every cost category without the BIM anchor. Keep to lower-of-cost-and-NRV and the principle.
- No em-dashes.

## Stage 2 TODO

- WebFetch gov.uk BIM33115; confirm lower-of-cost-and-NRV wording still present.
- Confirm cash-vs-accruals-stock blog slug exists before linking (paired brief).
- Decide whether to answer the FIFO FAQ with a method-neutral answer or defer to the cash-vs-accruals blog.
