---
slug: sole-trader-vs-ltd-online-sellers
tier: blog
route: /blog/sole-trader-vs-ltd-online-sellers
category: "Business Structure and Tax"
intent: SELLER-PROBLEM / MIXED. Growing sellers deciding whether to incorporate; seller-scoped ST-vs-Ltd with 2026/27 dividend rates. Links to sole-trader-vs-ltd-sellers calculator. Generic incorporation content stays generalist.
---
# Sole Trader or Limited Company for Online Sellers? The 2026/27 Numbers That Actually Decide It

> RAW HTML AT WRITE TIME. Blog body must be raw HTML (`<p>`, `<h2>`, `<ul>`, `<table>`), never markdown syntax. No em-dashes anywhere in user-facing copy.

## Target queries (evidence: LAUNCH_CORE.md / TOPICS.md, DataForSEO UK loc 2826, joined 2026-07-12)

- **Primary:** structure family (TOPICS.md: "'amazon fba limited company', sole trader vs Ltd for sellers, 'ecommerce limited company' accounting"). Seller-scoped ST-vs-Ltd is a named launch blog. No single high-volume measured head; decision/conversion page for the scaling-seller cohort.
- **Secondary:** "amazon fba limited company", "should ecommerce be a limited company", "ltd vs sole trader ecommerce" (pool + autocomplete, no discrete measured volume).
- Generic ST-vs-Ltd / incorporation mechanics are GENERALIST-OWNED (`limited-company-vs-sole-trader-side-hustle`, `incorporation` calc) and LINK OUT; this page is seller-scoped (stock/COGS, marketplace fees, seller decision framing).

## Search-intent class + play

MIXED (SELLER-PROBLEM leaning). Reader is a profitable seller weighing incorporation. Play: BLUF verdict framework ("stay sole trader if..., incorporate if..."), then the seller-specific tax maths at 2026/27 rates, then hand the reader the sole-trader-vs-ltd-sellers calculator for their own numbers. Capture edge: seller at the crossover → ecommerce-vat-compliance / incorporation-adjacent service.

## Competitors to beat (COMPETITORS.md; domains only at seed, live-URL check is Stage 2)

- **Generic accountancy blogs + generalist estate page**: own the generic ST-vs-Ltd head; beat on seller-specific inputs (stock financing, marketplace fees, reinvested-cash-vs-extraction) and CURRENT 2026/27 dividend rates that rival content still gets wrong (many show 8.75%/33.75%).
- **SaaS content**: shallow on structure/tax; beat on the actual decision maths.

## Required structure

- H2 skeleton:
  1. The short answer: the decision rule in one paragraph (profit level, extraction need, stock reinvestment, risk) (BLUF box)
  2. Sole trader vs limited company for a seller: what actually differs
  3. The tax maths at 2026/27 rates (corporation tax bands + dividends at 10.75%/35.75%/39.35%)
  4. The seller wrinkle: cash reinvested into stock vs cash extracted (why extraction need drives the answer)
  5. Worked example at a typical seller profit level (illustrative, then point to the calculator for their figures)
  6. Non-tax factors for sellers (limited liability on stock/supplier debt, marketplace account rules, credibility)
  7. Run your own numbers (embed sole-trader-vs-ltd-sellers calculator)
  8. Generic incorporation mechanics: how to actually incorporate (link OUT to generalist)
  9. Common failure modes (incorporating too early; comparing at old dividend rates; ignoring stock reinvestment)
- FAQ candidates (no answers at seed stage):
  1. Should my Amazon/eBay business be a limited company?
  2. At what profit does incorporating a seller business pay off?
  3. What are the 2026/27 dividend tax rates?
  4. Does reinvesting into stock change the sole-trader-vs-Ltd answer?
  5. Is a limited company better for limited liability as a seller?
  6. Do I pay corporation tax on all my company profit?
- Table/chart opportunities: ST-vs-Ltd comparison table at 2026/27 rates (tax on a given profit under each, with and without full extraction); decision-factor table (profit, extraction need, liability, stock reinvestment).
- Calculator embed: /embed/sole-trader-vs-ltd-sellers (PRIMARY placement after the worked example). The page's conversion surface.
- Internal links within launch core: sole-trader-vs-ltd-sellers (the tool), seller-take-home (true margin/take-home), ecommerce-vat-compliance (service), /for/amazon-sellers and /for/shopify-sellers (hubs). Generic incorporation mechanics + generic ST-vs-Ltd → LINK OUT to generalist (`limited-company-vs-sole-trader-side-hustle`, `/calculators/incorporation`).

## House positions touched

- **HP 20 (dividend rates), copied exactly:** "Owner-directors of incorporated seller businesses on the standard salary-plus-dividends model pay dividend tax at these rates on amounts above the £500 annual dividend allowance, from 6 April 2026 (Finance Act 2026 s.4)." Rates: 10.75% basic, 35.75% higher, 39.35% additional; £500 allowance. VERIFIED against rates_ledger.json (`dividend_rate_basic` 10.75, `dividend_rate_higher` 35.75, `dividend_rate_additional` 39.35, `dividend_allowance` 500, all applies_from 2026-04-06) — MATCH. Citations: https://www.legislation.gov.uk/ukpga/2026/11/section/4 and https://www.gov.uk/tax-on-dividends (both verified 2026-07-15).
- **HP 19 (corporation tax), copied exactly:** "19% small profits rate up to £50,000; 25% main rate above £250,000; marginal relief between." Citation: https://www.gov.uk/corporation-tax-rates (verified 2026-07-15).
- **HP 17 (stock reinvestment / basis context):** the seller-specific reinvestment factor draws on the accruals/stock treatment; reference only, do not re-explain.
- Consistency rule that binds this page: "Dividend rates (position 20): 10.75%/35.75%/39.35% from 6 April 2026; never the old 8.75%/33.75%."

## Hallucination danger zones

- DIVIDEND RATES: 10.75% / 35.75% / 39.35% from 6 April 2026 (HP 20, matches ledger). NEVER 8.75%/33.75%/39.35% (the pre-FA2026 figures still all over rival content). This is the load-bearing fact of the page.
- £500 dividend allowance (not £1,000, not £2,000); locked in HP 20 and ledger.
- Corporation tax bands (£50,000 / £250,000, 19% / 25%, marginal relief) locked in HP 19; associated-company rules reduce thresholds proportionately (mention, do not compute).
- Do NOT re-explain how to incorporate (process, Companies House steps) on-site; LINK OUT to generalist (adjacency rule). This page owns the seller-scoped DECISION only.
- Worked examples are illustrative; always route the reader to the calculator for their own numbers, never present a single example as their answer.
- No em-dashes.

## Stage 2 TODO

- WebFetch https://www.gov.uk/tax-on-dividends and the FA 2026 s.4 legislation page; confirm 10.75%/35.75%/39.35% and £500 allowance live.
- WebFetch gov.uk corporation-tax-rates; confirm 19%/25% and thresholds.
- Confirm sole-trader-vs-ltd-sellers calculator embed slug exists at build; confirm generalist link-out URLs live.
