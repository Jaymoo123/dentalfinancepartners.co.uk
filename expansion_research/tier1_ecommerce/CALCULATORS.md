# Calculator candidates — Ecommerce / Amazon sellers (R3)

Date: 2026-07-12. Pattern: property calculator fleet (config-driven, 1 file + 1 import per
tool). **RE-SCORED WITH MEASURED VOLUMES/KD/CPC 2026-07-12** (paid pulls, $0.3677) —
launch-tier membership unchanged, evidence and ordering updated below. All cited rates
verified live via `s6_citation_check.py` (32/32 pass).

## Measured calculator demand (DFS 2026-07-12)

52 calculator keywords returned. The measured surface: "ebay price calculator" 5,400
KD 19 CPC £4.19; "ebay uk fee(s) calculator" 2,900 + 2,900 + 720 + "ebay calculator uk"
1,600; "ltd company tax calculator" / "calculate limited company tax" 1,600 KD 0 CPC £4.53;
"etsy fee calculator" 720 KD 0; "amazon fee calculator" 390 KD 21. marginwise.co.uk's
entire ranked surface is 78 UK keywords (13 top-10, 4 top-3: etsy fee calculator uk
320/260-vol variants at #3, "ebay price calculator" 5,400 at #10, plus vinted/depop fee
calcs at 110/70) — a single-tool standalone reaches top-3 on mid-volume fee-calc terms,
which both (a) confirms fee-calc SERPs are winnable by small sites and (b) shows the fee-only
layer's ceiling: 78 keywords total. The joined fee+tax wedge inherits the winnability
without the ceiling. Ordering consequence: eBay/Etsy variants of the take-home calculator
carry more measured demand (5,400/2,900-vol fee families) than the Amazon variant (390) —
build tool 1 platform-parameterised, Amazon-first for lead value (CPC £37.56 on
"amazon fba accountant") but eBay/Etsy skins in the same config file.

## Rival tool precedent (verified this run — and it is heavy, unlike care)

This niche is the OPPOSITE of care's tool vacuum. Verified live this run:

- **ecomcalctools.com** — 1,375-URL programmatic, multi-language fee/profit calculator site
  (Amazon/Etsy/Shopify) (fetched 200). Pure-fee calculators are saturated.
- **marginwise.co.uk** — "UK Marketplace Fee Calculator 2026" standalone tool site (fetched 200).
- **ukcalculator.com** — generic UK calculator site already shipping an Amazon seller fee
  calculator page (fetched 200).
- **goecom.co.uk** — UK SaaS with free landed-cost + import-duty calculators feeding a paid
  Shopify app (fetched 200).
- **sellerbookkeeping.com** (US) — break-even, ROI, self-employment-tax calculators as lead
  magnets (fetched 200).
- **socialcommerceaccountants.com** — dedicated-tier UK firm with a "Free Tools" nav section
  (fetched 200): the accountancy incumbents have already started on tools.
- Amazon itself ships an FBA revenue calculator inside Seller Central (directory-dropped).

**Consequence:** fee-only calculators are a lost battle. The wedge is calculators that join
marketplace fees to UK TAX — which none of the tool sites do (they stop at fees) and the
firms don't do interactively (they stop at prose).

## Launch tier (build with the site) — gap-scored + volume re-scored 2026-07-12

Per-tool measured lines: (1) take-home/true-margin — no direct "take home"/"margin"
calculator queries returned; demand proxied by the fee-calc families above (eBay 5,400 head)
+ HIRE CPCs; gap-play, not query-play. (2) VAT threshold tracker — "i didn't realise i went
over the vat threshold" 210 KD 0 CPC £3.36 + "ltd company vat threshold" 210-vol variants ×3;
exact-error-intent confirmed. (3) ST-vs-Ltd for sellers — "ltd company tax calculator" 1,600
KD 0 CPC £4.53: the strongest measured tool term in the set; generic term though, so the
adjacency wall with the generalist site applies at metadata level too.

1. **Seller take-home / true-margin calculator (Amazon UK)** — revenue → referral fee +
   FBA fee inputs → VAT treatment (registered vs not; reverse-charge on fees per Notice
   741A) → sole trader IT/NIC vs Ltd CT+dividend (2026/27 rates 10.75%/35.75%/39.35%,
   FA 2026 s.4) → per-unit and monthly take-home. Nothing verified this run joins fees to
   tax; this is the flagship.
2. **VAT registration threshold tracker for marketplace sellers** — rolling-12-month
   taxable-turnover calculator that correctly uses GROSS sales (not payouts) + reverse-
   charge services, with the overseas-establishment/deemed-supplier branch (positions 1-2,
   6). The most common real-world error we found in the query families ("amazon seller vat
   uk", autocomplete "do i need to pay vat amazon seller").
3. **Sole trader vs limited company for online sellers** — crossover calculator on 2026/27
   figures (CT marginal relief £50k-£250k; new dividend rates; £1,000 trading allowance
   handling at the bottom end). Adjacency note: the generalist site covers the generic
   version in prose; this is the seller-specific interactive version with COGS/inventory
   and platform-fee lines — police the wall by keeping seller-specific inputs mandatory.

## Queue (post-launch, re-score with volumes first)

4. **Import cost per unit (landed cost + the £135 rule)** — duty + import VAT (postponed
   accounting toggle) + freight per unit; the ≤£135 direct-sale branch for dropshippers.
   Rival precedent exists (goecom) but not tax-joined.
5. **IOSS vs DDP vs DDU decision tool for selling into the EU** — consignment value +
   volume → scheme recommendation with intermediary-cost line. The VAT agencies own the
   prose; no interactive tool verified.
6. **COGS / inventory profit reconciler** — "why is my taxable profit higher than my bank
   balance": opening/closing stock, lower-of-cost-and-NRV (BIM33115), cash-vs-accruals
   toggle.
7. **Trading allowance / side-hustle threshold checker** — £1,000 allowance vs actual
   expenses, plus the platform-reporting (30 sales/€2,000) NOT-a-tax-threshold explainer
   (positions 12-14). High consumer volume family; watch lead quality.
8. **Employer cost of first hire (packer/VA)** — NIC 15%/£5,000 + Employment Allowance
   £10,500; reuses the estate's employer-cost engine.
9. **MTD ITSA readiness checker for sellers** — £50k/£30k thresholds, April 2026/27 dates.

## Rejected

- Pure marketplace fee calculators (Amazon referral/FBA fee lookup) — saturated
  (ecomcalctools' 1,375 URLs), fee schedules are scrape-maintenance debt, and Amazon's own
  calculator is canonical.
- Currency-conversion / repricing tools — SaaS land (shopkeeper, repricerexpress), not
  accountancy-adjacent.
- US sales-tax nexus calculator — wrong jurisdiction for a UK site.
