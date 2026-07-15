---
slug: etsy-fees-vat-and-tax
tier: blog
route: /blog/amazon-and-marketplace-selling/etsy-fees-vat-and-tax
category: "Amazon and Marketplace Selling"
intent: DIY-INFORMATIONAL / SELLER-PROBLEM. Two adjacent families JOINED: "etsy fees" (~720/mo) + "etsy vat" / "etsy tax uk" (~720/mo). NEVER a pure fee calculator (fee-calc field is saturated: etsy fee calculator 720/KD 0, and DEDUP_AUDIT/CALCULATORS.md reject ToS-scraped fee schedules). The wedge is the JOIN: what Etsy actually deducts, how VAT interacts with those fees, and how the tax falls out. Faceless.
---
# Etsy Fees, VAT and Tax UK: How the Deductions Actually Join Up

> RAW HTML AT WRITE TIME. Blog body must be raw HTML. No em-dashes. Faceless. NO live fee schedule
> is hardcoded and this is NOT a fee calculator.

## The wedge (JOINED angle — explicitly NOT a fee calculator)

The "etsy fee calculator" SERP is saturated and low-value (KD 0, ToS-scraping maintenance debt, which
CALCULATORS.md and DEDUP_AUDIT reject). Fee-only content stops at "here is what Etsy takes". VAT-only
content stops at "Etsy charges VAT on fees". Nobody joins the three: **Etsy's fee stack → how VAT
interacts with those fees (including reverse charge on fees billed from abroad) → how the whole thing
lands as taxable profit.** That join is the post. It links OUT to the seller take-home calculator for
the interactive maths; it does not rebuild a fee calculator.

## Target queries (evidence: LAUNCH_CORE.md / TOPICS.md, DataForSEO UK loc 2826, joined 2026-07-12)

- **Family A (fees):** "etsy fees" / "etsy fees uk" / "etsy seller fees" ~720/mo (and the "etsy fee
  calculator" 720/KD 0 head we deliberately do NOT chase with a calculator).
- **Family B (VAT/tax):** "etsy vat" / "etsy tax uk" / "do you pay tax on etsy uk" ~720/mo.
- Joining A+B is the differentiator; each alone is either saturated (fees) or thin (tax). Say the
  volumes are family estimates, do not overclaim precision.

## Search-intent class + play

DIY-INFORMATIONAL. The searcher wants to understand what Etsy actually costs them all-in, and whether
they owe VAT/tax on top. Play: explain the fee stack qualitatively (transaction, listing, payment
processing, offsite-ads — NAMED but NEVER with a hardcoded rate; the rate is the seller's own from
their Etsy statement), then the VAT interaction (Etsy fees billed from abroad are reverse-charge
services, HP 6; and Etsy as a marketplace may account for VAT on certain sales, HP 2 — establishment
is the pivot), then the income-tax fall-out (trading allowance, £90k gross threshold). Capture edge:
"my Etsy payout is not my profit and VAT was never modelled" → take-home calc + VAT compliance service.

## Competitors to beat

- **Etsy fee calculators (etsy's own + ecomcalctools et al.):** own the fee head; do not fight them
  on fee arithmetic, beat by carrying it through VAT and tax which they never do.
- **Generic "do you pay tax on Etsy" articles:** thin; beat with the fee-VAT-tax join and worked
  numbers, and the gross-vs-payout VAT correction.
- Generalist owns `accountant-for-etsy-sellers-uk` (a HIRE "how to choose" post, FENCE hub #4 maps to
  `/for/marketplace-sellers`). This post is DIY-informational, not a HIRE page — no collision; link
  the marketplace hub, do not restate it.

## Required structure

- H2 skeleton:
  1. **BLUF (40-60 words):** "Etsy deducts several fees before you are paid, and those fees can carry
     VAT of their own. What lands in your Etsy payout is already net of fees and is not your taxable
     profit or your VAT turnover. You are taxed on your gross sales less allowable costs, and VAT
     registration is tested on gross sales, not the payout." (52 words.)
  2. What Etsy actually deducts (the fee types NAMED, rates from the seller's own statement, no
     hardcoded schedule; one line each).
  3. VAT on your Etsy fees (HP 6 — fees billed from abroad are reverse-charge services, Notice 741A;
     the seller self-accounts if VAT-registered and the value counts toward the £90,000 threshold).
  4. VAT on your Etsy sales: who accounts for it (HP 2 — establishment is the pivot; a UK-established
     seller accounts for their own VAT, the marketplace accounts for it for non-UK-established sellers;
     do NOT blur the two).
  5. Your income tax on Etsy profit (HP 14 trading allowance; HP 1 gross-not-payout; link the
     side-hustle checker and the gross-vs-payout blog).
  6. Worked example: an Etsy seller's gross sale → fees → VAT interaction → taxable profit (numbers
     regenerated from the take-home calc so copy never diverges; fee % is the example seller's own).
  7. Where to see your real numbers (link the take-home calculator and VAT threshold tracker).
- FAQ candidates:
  1. What fees does Etsy charge UK sellers?
  2. Does Etsy charge VAT on its fees?
  3. Do I pay VAT on my Etsy sales?
  4. Is my Etsy payout my taxable income?
  5. How much can I earn on Etsy before paying tax?
  6. When do Etsy sellers have to register for VAT?
- Table: "fee → does it carry VAT → does it count toward my £90k" mapping (qualitative, no rates).
- Calculator embed: link `/calculators/seller-take-home` (the join, interactive) and
  `/calculators/vat-threshold-tracker`. Do NOT build or iframe a fee calculator.

## House positions touched

- HP 6 (`vat_registration_threshold` + Notice 741A): Etsy fees from abroad are reverse-charge
  services; self-account; value counts toward £90,000. Citation:
  https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a
- HP 2 (`overseas_seller_registration_threshold`; deemed supplier / establishment): who accounts for
  VAT on the SALE turns on establishment. Citation:
  https://www.gov.uk/guidance/vat-and-overseas-goods-sold-to-customers-in-the-uk-using-online-marketplaces
- HP 1 (`vat_registration_threshold` £90,000, GROSS not the Etsy payout). Citation:
  https://www.gov.uk/vat-registration
- HP 14 (`trading_allowance` £1,000): the income-tax fall-out. Citation:
  https://www.gov.uk/guidance/tax-free-allowances-on-property-and-trading-income

## Internal links (real slugs only)

- `/calculators/seller-take-home` (the interactive join — primary).
- `/calculators/vat-threshold-tracker` and `/blog/vat-threshold-gross-vs-payout`.
- `/calculators/side-hustle-tax-checker` (do I owe tax on Etsy income).
- `/vat/vat-on-marketplace-fees` (the reverse-charge depth).
- `/vat/deemed-supplier-establishment` (who accounts for VAT on the sale).
- `/for/marketplace-sellers` (the Etsy hub).
- `/services/ecommerce-vat-compliance` (capture).
- Link OUT to generalist for generic £90k registration mechanics.

## Meta

- metaTitle (≤60): "Etsy Fees, VAT and Tax UK: How the Deductions Join Up"
- metaDescription (≤155): "Etsy fees, VAT on those fees, and the tax on your profit, explained as one
  join. Why your Etsy payout is not your taxable income or VAT turnover. UK 2026."

## Hallucination / danger zones

- NEVER hardcode Etsy fee rates or percentages; name the fee types, the rate is the seller's own from
  their statement (ToS-scraping is rejected, CALCULATORS.md). This is NOT a fee calculator.
- NEVER state the Etsy payout as turnover or taxable profit (HP 1 consistency rule).
- Establishment (HP 2): never blur UK-established vs overseas; who accounts for the sale VAT hinges on
  it. Principles only, no day/staff/premises thresholds (danger-zone list).
- Trading allowance vs reporting exclusion vs £90k threshold: three distinct numbers, keep separate.
- No em-dashes. Faceless.

## Stage 2 TODO

- Confirm the current Etsy fee TYPES to name (not rates) from Etsy's own help page at write time; do
  not transcribe rates.
- WebFetch gov.uk Notice 741A + VAT-registration + marketplace-VAT pages to confirm citations.
- Regenerate the worked example from the take-home calc engine.
- All BLUF/answer blocks 40-60 words.
