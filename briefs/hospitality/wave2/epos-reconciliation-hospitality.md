---
slug: epos-reconciliation-hospitality
tier: blog
category: "Hospitality Accounts"
route: /blog/hospitality-accounts/epos-reconciliation-hospitality
intent: OPERATOR-PROBLEM / bookkeeping-workflow. Operator reconciling till/EPOS takings to bank, cards, cash and accounting software. Owns the daily-Z-to-bank workflow no estate page holds. Feeds bookkeeping and VAT service.
---
# Blog: EPOS reconciliation for hospitality, matching till takings to bank and books

> Wave-2 asset. Body references "the business" / "operators". CTA/brand from config. No em-dashes. Faceless. Raw-HTML body.

## Target queries (evidence: LAUNCH_CORE.md restaurants ~560/mo EPOS/reconciliation family; Google Ads UK + Labs 2026-07-11)

- Primary: "epos reconciliation" / "till reconciliation" / "pos reconciliation restaurant" / "reconcile takings" family (~560/mo combined workflow intent)
- Secondary: "how to reconcile till to bank", "z read accounting", "epos to xero", "restaurant daily reconciliation", "card takings not matching bank", "cash up procedure accounting"
- Intent: OPERATOR-PROBLEM (bookkeeping workflow). The operator (or their bookkeeper) is trying to tie daily EPOS Z-reads to card settlements, cash banked, deposits/deliveroo/just-eat payouts, and the figure that lands in Xero/QuickBooks/Sage. Capture point: the recurring pain of takings not matching, and the VAT/GP consequences of getting it wrong, route into the bookkeeping + VAT service.

## Asset type + play

Procedural, answer-first workflow post with a numbered daily/weekly procedure (howToSteps). The wedge: this is the single most-searched hospitality bookkeeping mechanic and NO estate page owns the EPOS-to-bank reconciliation workflow. Own it with a genuinely useful step-by-step (Z-read → gross takings → payment-type split → card settlement timing → aggregator payouts net of commission → cash banked → software posting → VAT split), the common break points (card settlement lag, aggregator commission netting, tips through the till, refunds and voids, service charge), and why unreconciled takings poison the VAT return and the GP%. Faceless, tool-agnostic (name the common software categories, never endorse one). Ends by routing the operator who does not want to do this monthly to the bookkeeping/VAT service.

## Dedup evidence (MANDATORY)

- **Generalist site**: 5 hospitality posts, all "why hire a specialist accountant" pitches. NONE covers EPOS/till reconciliation as a workflow. The restaurant post mentions payroll software and "Xero and FreeAgent handle tips" in passing but has no reconciliation procedure. WEDGE: this is a how-to workflow (the daily Z-to-bank mechanic), a different intent entirely. No collision.
- **Own site (24 pages)**: no page owns bookkeeping reconciliation. `gross-profit-menu-pricing` covers GP% (a downstream number that depends on clean takings, so LINK it), the VAT service covers rate classification. This post is the upstream data-hygiene workflow they all depend on. Distinct; it also differentiates from asset 5 (bookkeeper-for-restaurant) which is the HIRE/scope page — this is the METHOD page (see asset 5 wedge note).

## Required structure (H2 skeleton)

Open with a 40-60w BLUF: EPOS reconciliation means tying each day's till takings (the Z-read gross) to what actually reaches the bank · card settlements, cash banked, and delivery-app payouts net of commission · then posting the reconciled figure, split by VAT rate, into your accounting software. Do it daily; the break points are card-settlement timing, aggregator commission, tips and refunds.

1. The 40-60 word answer (BLUF)
2. Why reconciling takings matters (VAT accuracy, GP%, fraud/theft detection, MTD-ready books) · link `gross-profit-menu-pricing`
3. The building blocks (Z-read gross takings, payment-type split, card settlement, cash, aggregator payouts, tips, refunds/voids, service charge)
4. The daily reconciliation procedure, step by step (howToSteps — numbered list)
5. The five break points and how to fix each (card settlement lag; aggregator commission netting; tips/tronc through the till; refunds and voids; service charge treatment) · link `/services/tronc-scheme-setup` for tips-through-till
6. Splitting takings by VAT rate (gross Z-read is not one VAT rate: standard vs zero elements) · link `/services/hospitality-vat` and the VAT checker
7. Posting to your software (the reconciled daily-takings journal; tool-agnostic)
8. Weekly and month-end checks (unbanked cash, timing differences, suspense clear-down)
9. When to hand reconciliation to a bookkeeper (process; fees from config) · link asset 5 bookkeeper page
10. FAQ
11. Next step CTA

howToSteps (procedure): (1) print/export the daily Z-read, note gross takings; (2) split takings by payment type (cash, card, account, voucher, delivery app); (3) match card total to the card-machine/settlement report, noting settlement lands 1-3 working days later; (4) match delivery-app sales to the app statement, remembering the payout is net of commission and the gross sale is your turnover; (5) confirm cash banked equals cash takings less float and any till shortage; (6) separate tips and service charge from sales (they are not turnover if paid over via tronc); (7) split the sales figure by VAT rate for the return; (8) post the reconciled daily-takings journal to your accounting software; (9) investigate any variance the same day.

## Figures mapped to HP / ledger

- FRS category note (HP 5) only if FRS reconciliation is mentioned: under FRS you apply the flat rate to gross VAT-inclusive turnover, not the rate-split. Note the difference. https://www.gov.uk/hmrc-internal-manuals/vat-flat-rate-scheme/frs7300
- VAT rate split references HP 1-3 (standard vs zero elements of takings) + Notice 701/14 / 709/1 URLs; link the VAT checker rather than restating.
- Tronc/tips-through-till: HP 7 (NIC exemption needs troncmaster independence), HP 9 (employer-controlled tips go through payroll), HP 8 (Tips Act 2023, records). Tips/service charge are NOT turnover when paid over. https://www.gov.uk/hmrc-internal-manuals/national-insurance-manual/nim02922 ; https://www.gov.uk/tips-at-work
- MTD-IT over £50k from 6 Apr 2026 (HP 24) in the "why it matters / MTD-ready" line. https://www.gov.uk/guidance/sign-up-your-client-for-making-tax-digital-for-income-tax

**HP GAPS (do NOT invent — flag/omit):**
- Specific delivery-app commission rates (Deliveroo/Just Eat/Uber Eats %) are NOT house positions and change constantly. Describe "payout is net of a commission the app deducts"; do NOT state a commission percentage.
- Card-settlement timing "1-3 working days" is a general operational norm, not an HP — present as typical, not guaranteed; tell the reader to check their acquirer.
- Software names (Xero/QuickBooks/Sage/Lightspeed/Square) may be named as examples of categories, but no endorsement, no pricing, no feature claim presented as fact.
- GP% / labour% benchmarks illustrative only (as per shared danger zones).

## Internal links (all BUILT)

`/blog/hospitality-accounts/gross-profit-menu-pricing` (downstream GP%), `/services/hospitality-vat` + `/calculators/food-drink-vat-rate-checker` (rate split), `/services/tronc-scheme-setup` (tips through till), `/blog/hospitality-accounts/bookkeeper-for-restaurant` (asset 5, the hire path), `/for/restaurants`, `/for/takeaways` (aggregator-heavy).

## FAQ candidates (questions only)

- What is EPOS reconciliation?
- Why do my card takings not match my bank?
- How often should I reconcile the till?
- Are delivery-app sales my turnover or just the payout? (answer: gross sale is turnover; commission is a cost)
- Do tips through the till count as sales? (answer: no if paid over via tronc; HP 7/9)
- How do I split daily takings by VAT rate?
- What is a Z-read? (define plainly)
- Should I reconcile takings under the Flat Rate Scheme? (yes; but the flat rate applies to gross VAT-inclusive turnover)

## Meta

- metaTitle (<=60): `EPOS Reconciliation for Hospitality: Till Takings to Bank`
- metaDescription (<=155): `A step-by-step guide to reconciling daily EPOS takings to your bank, cards, cash and delivery-app payouts, and splitting them correctly for VAT.`

## Hallucination danger zones

- Do NOT state a delivery-app commission % or a guaranteed card-settlement window (HP GAPS).
- Delivery-app gross sale is turnover; the commission is a cost, not a reduction of turnover.
- Tips/service charge paid over via tronc are not turnover; tronc NIC exemption is not automatic (HP 7).
- No software endorsement, no pricing, no fee figures.
- VAT rate split references the checker/Notices; do not assert a borderline product rate from memory.
