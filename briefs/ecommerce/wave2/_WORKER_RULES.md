# Ecommerce wave-2 — shared CONTENT-worker rules

Same site, brand and facts as wave 1. You are writing ONE wave-2 asset for the UK ecommerce/
marketplace-seller accountancy site at `ecommerce/web` (repo root `C:\Users\user\Documents\Accounting`).
Working brand **Ecommerce Tax Partners** — do NOT hardcode the brand in body copy; write about "the
site", "we", "your business", "online sellers". Brand + CTA are injected by the template/site config.

## Inputs (read first, in order)
1. This file.
2. **Your brief**: `briefs/ecommerce/wave2/<asset>.md`. Follow it; where it conflicts with THIS file
   on category strings/slugs, THIS file wins.
3. **Facts**: `docs/ecommerce/house_positions.md` (+ `docs/ecommerce/rates_ledger.json`) — the ONLY
   source for figures/thresholds/dates. Every figure must match a numbered HP or ledger key and link
   its gov.uk / legislation.gov.uk URL. If your brief FLAGS an HP gap, do NOT invent a figure: write
   around it qualitatively or omit it.

## WAVE-2 CANONICAL DANGER ZONES (in addition to the wave-1 list, which still binds)

Wave-1's shared danger zones apply verbatim (IOSS €150 handled via the /vat/ioss-vs-oss page and the
EU citation; OSS £8,818 via the gov.uk NI distance-sales page; badges of trade cite BIM20205 onward at
build; Amazon-2024 fee-billing switch is Amazon-docs authority not gov.uk; EU-side rules out of gov.uk
scope; HMRC discovery limits qualitative; establishment principles only; VAT threshold is GROSS not
payout; link OUT to generalist for generic £90k mechanics / MTD ITSA mechanics / generic incorporation).

Wave-2-specific:
- **THREE DISTINCT THRESHOLDS, never conflated:** platform reporting exclusion (fewer than 30 sales
  AND €2,000/approx £1,700, HP 13 — a REPORTING exclusion, not tax-free); the £1,000 trading allowance
  (HP 14 — the tax-free trading figure); the £90,000 VAT threshold (HP 1 — GROSS sales). Any wave-2
  asset that mentions more than one MUST keep them visibly separate. This is the wave's signature.
- **"No new side-hustle tax-free limit":** the 2024 change was platform REPORTING (HP 12), not a tax
  limit. Correct this wherever the side-hustle family appears.
- **Employment-income stacking:** side-hustle profit is taxed ON TOP of a day-job salary, so the
  personal allowance is usually already used — the first pound of side profit is often taxed at the
  marginal rate, not tax-free. Never silently re-apply a full personal allowance to side profit.
- **NO fee calculators, NO hardcoded platform fee schedules** (Etsy/eBay/Amazon). Name fee TYPES; the
  rate is always the seller's own from their statement. ToS-scraping is rejected (CALCULATORS.md).
- **Online Seller Index figures are DATA, not ledger figures.** They are SIC-47910 incorporated
  internet-retail companies (NOT Amazon-only, NOT sole traders). Transcribe exactly from
  `ecommerce/web/src/data/online-seller-index.json`; never fabricate, round-for-effect, or extend a
  curve; compare cohorts only at the same age (survivalByYear), never raw still-active % across years;
  carry the JSON caveats. Cite the index page for these, NOT gov.uk.
- **POD royalty vs trading income:** frame by badges/profit motive; do not assert a universal ruling.

## Global quality rules (locked — same as wave 1)
A* authority bar; BLUF 40-60 words opening each money/guide H2; NO em-dashes anywhere; faceless (no
named experts, no ACA/ICAEW claims, no fabricated clients/testimonials/volumes/stats, NO pricing); no
pipeline artefacts in reader copy (no "verify at build", no "(HP12)" codes, no narrated punts); no
cross-post boilerplate intros (vary voice per asset; link the canonical page rather than restating
sibling definitions); cite official sources inline as `<a href="https://www.gov.uk/...">`; UK scope,
seller-OWNER frame (never consumer-buyer); GB-vs-NI flagged explicitly, never silently mixed; no brand
in metaTitle (≤60, query-focused, template appends brand); metaDescription ≤155.

## Internal links (real slugs only — wave-1 core PLUS wave-2 new slugs)
Wave-1 slugs (unchanged): services `/services/<slug>` (ecommerce-vat-compliance,
settlement-payout-reconciliation, selling-into-the-eu, hmrc-letter-online-sales); hubs `/for/<slug>`
(amazon-sellers, shopify-sellers, marketplace-sellers, dropshippers); VAT `/vat/<slug>`
(deemed-supplier-establishment, vat-on-marketplace-fees, 135-import-rule, ioss-vs-oss,
postponed-vat-margin-scheme); calculators `/calculators/<slug>` (seller-take-home,
vat-threshold-tracker, sole-trader-vs-ltd-sellers); research `/research/online-seller-index`; blogs
`/blog/<category-slug>/<slug>`.

**New wave-2 slugs (link these too):**
- Calculator: `/calculators/side-hustle-tax-checker` (NEW tool — see build note below).
- Blogs: `/blog/platform-reporting-and-hmrc-letters/ebay-tax-rules-uk`,
  `/blog/amazon-and-marketplace-selling/is-it-worth-selling-on-amazon-uk`,
  `/blog/amazon-and-marketplace-selling/etsy-fees-vat-and-tax`,
  `/blog/amazon-and-marketplace-selling/print-on-demand-tax-uk`.
Wave-1 blog slugs already live: platform-reporting-rules, trading-allowance-online-sellers,
vat-threshold-gross-vs-payout, flat-rate-scheme-wrong-for-sellers, cogs-inventory-basics,
cash-vs-accruals-stock, sole-trader-vs-ltd-online-sellers, mtd-itsa-online-sellers.

## BLOG posts → `ecommerce/web/content/blog/<slug>.md`
YAML frontmatter + RAW HTML body (loader uses `dangerouslySetInnerHTML`, NO markdown conversion —
use `<p>`, `<h2>`, `<h3>`, `<ul><li>`, `<ol><li>`, `<table>`, `<strong>`, `<a href>`). Frontmatter
fields exactly as wave 1 (title, slug, date "2026-07-15", author "", category, metaTitle ≤60,
metaDescription ≤155, h1, summary, keyTakeaways 3-5, faqs). The 6 valid category strings and their
slugs are unchanged from wave 1; wave-2 blogs use:
- `ebay-tax-rules-uk` → `Platform Reporting and HMRC Letters`
- `is-it-worth-selling-on-amazon-uk` → `Amazon and Marketplace Selling`
- `etsy-fees-vat-and-tax` → `Amazon and Marketplace Selling`
- `print-on-demand-tax-uk` → `Amazon and Marketplace Selling`

## NEW CALCULATOR (side-hustle-tax-checker) → `ecommerce/web/src/lib/calculators/tools/`
This wave adds ONE new interactive tool. Build it like the three existing tools:
1. `src/lib/calculators/tools/side-hustle-tax-checker.ts` — a `GenericTool` (import types/format from
   `@accounting-network/web-shared`, same as `seller-take-home.ts`). REUSE the band constants already
   in `seller-take-home.ts` (PERSONAL_ALLOWANCE, BASIC_RATE, HIGHER_RATE, CLASS4_* etc.) so the estate
   stays consistent — do not re-declare different literals for the same rates.
2. `src/lib/calculators/tools/side-hustle-tax-checker.test.ts` — vitest with the brief's golden cases
   (the smallest checks that fail if the maths breaks). Non-negotiable: this tool has money logic.
3. Register it in `src/lib/calculators/registry.ts` (add to the GENERIC array; keep helpers unchanged).
4. Run `npx tsc --noEmit` AND the vitest from `ecommerce/web`; fix any error YOU introduced. Verify
   the output yourself before reporting done.
Do NOT touch the existing three engines or the `@accounting-network/web-shared` shared tool code.

## Write ONLY your assigned file(s)
Do not run full site builds, do not edit config or other sites, do not touch another worker's file.
Work synchronously in the foreground. Report the path(s) written and a 1-line summary.
