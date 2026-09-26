# ecommerce blog_topics pool integrity sweep, 2026-09-25

Scope: all 2,329 rows in Supabase `blog_topics` where `site_key = 'ecommerce'`. Read-only on the DB. Every row classified into exactly one bucket by rule, with the rule recorded per row. Full row-level output: `docs/ecommerce/pool_classified_2026-09-25.json`.

Method: 10 parallel agents each classified a ~233-row slice against the same fixed rule set (below), then the slices were merged, id-checked against the source table (2,329 in, 2,329 out, all unique, none missing), and spot-checked for obvious misclassifications. One correction was made on spot-check (a "do I need an accountant if I sell on Amazon or Shopify" row had been dropped as junk; moved to KEEP). No other rows were hand-edited.

One data note: the brief says the pool was seeded from DataForSEO AUTOCOMPLETE only. The `notes` column shows a mix: some rows say `sources: autocomplete`, a meaningful minority say `sources: sitemap:<competitor domain>` (e.g. ecomcalctools.com, linkmybooks.com, sterlinxglobal.com, socialcommerceaccountants.com). Both source types are present in every bucket; the sitemap-sourced rows are not systematically better or worse quality than the autocomplete ones.

## Bucket counts

| Bucket | Rows | Share |
|---|---|---|
| KEEP | 1,039 | 44.6% |
| ADJACENT | 800 | 34.3% |
| DROP-GEO | 243 | 10.4% |
| DROP-JUNK | 154 | 6.6% |
| DROP-BRAND | 93 | 4.0% |
| **Total** | **2,329** | **100%** |

Survival rate for KEEP alone is 44.6%, well above the prior programme's ~17% (2,907 to 492). This pool is cleaner than that comparison suggests, but the read is not "quality was fine": a further 34.3% is ADJACENT (real audience, wrong service), and one row in five (21.0%) is dead weight (GEO + JUNK + BRAND). If the working pool is meant to be "things this site can plausibly publish and rank on," it's the 1,039 KEEP rows, not the 1,839 KEEP+ADJACENT rows.

## Rules applied

1. **KEEP** — a query a UK online seller would plausibly type, where a UK accountancy/tax/bookkeeping/company-structure site could legitimately be the best answer. UK tax/VAT/accounting terms count even at low apparent volume (VAT, HMRC, self assessment, MTD, corporation tax, sole trader, limited company, trading allowance, Class 2/4 NIC, payments on account, capital allowances, stock/inventory valuation, COGS, cash vs accruals, OSS/IOSS, import VAT, postponed VAT accounting, EORI, duty, HMRC digital platform reporting, settlement reconciliation, seller fee deductibility, business bank account, dividends, salary/dividend split).
2. **ADJACENT** — on-audience, off-service: ecommerce operations, marketing, logistics, sourcing, platform features. The same seller, a different question. Recorded, not merged into KEEP.
3. **DROP-GEO** — non-UK intent: US tax terms (IRS, 1099-K, sales tax nexus, EIN, Schedule C, GAAP), other-country VAT/tax (Brazil, Poland, Germany, India, Australia, etc.), and foreign-language queries (mostly Polish "vat oss" variants, some German, Hindi, Portuguese, Spanish, Indonesian, Urdu).
4. **DROP-BRAND** — navigational or brand-only queries: platform login/app/feature lookups (Amazon Seller Central, TikTok Seller Central), named competitor tools (A2X, Link My Books, Taxology, Upcounting), named individuals/courses.
5. **DROP-JUNK** — nonsense, truncated fragments, in-file duplicates, generic single words, wrong-audience queries (aimed at accountants/students, not sellers), UI/dev fragments, or no discernible intent.

Platform names were treated as KEEP only when paired with a money/tax/accounting/legal concept ("amazon fba vat" = KEEP; "amazon fba" alone = ADJACENT or JUNK depending on shape). US tax terminology was DROP-GEO even where it looked accounting-shaped. Ties between KEEP/ADJACENT went to ADJACENT; ties between ADJACENT/DROP went to ADJACENT.

## Worked examples (15 per bucket)

### KEEP
- "amazon seller not vat registered" — UK VAT registration status question
- "amazon fba fees vat" — VAT treatment of a specific platform fee
- "side hustle tax limit" — UK side-hustle/trading allowance threshold
- "how to reconcile amazon sales and manage vat, a 5-step advisory checklist for fba sellers uk cross border" — explicit UK VAT + reconciliation
- "crafting oss report with ease" — EU OSS VAT scheme mechanics
- "ecommerce accounting automation" — bookkeeping systems for sellers
- "tax as an ecommerce seller based in the uk" — explicit UK tax question
- "7 mistakes you're making with amazon payouts and how to fix them" — settlement reconciliation
- "amazon fba tax deductions" — allowable expenses for sellers
- "scaling tiktok shop cash flow survival guide" — bookkeeping/cash flow for a seller
- "indirect taxation essential guide for ecommerce sellers" — VAT framing
- "need an amazon accountant, introducing approved partners" — accountant search
- "amazon seller tax invoice" — UK VAT invoicing
- "amazon seller duplicate tax details" — platform tax-settings issue with a UK VAT angle
- "do i need an accountant if i sell on amazon or shopify" — direct service question (moved to KEEP on QA pass; had been misfiled as junk)

### ADJACENT
- "etsy regional eu" — platform feature, not tax
- "amazon seller profit app" — seller tooling
- "shopify payout settings" — ops, not accounting advice
- "etsy sales statistics by category" — marketing stat
- "bold vs a2x" — software comparison
- "amazon grocery gourmet fees" — fee schedule lookup, not tax
- "what is amazon ppc" — advertising
- "amazon retail arbitrage vs wholesale" — sourcing model
- "how the latest inflation reports affect your ecommerce business and what to do now" — macro/ops commentary
- "types of amazon seller accounts" — platform ops
- "ebay computers fees" — marketplace fee schedule
- "inventory accountant hiring" — recruitment, not our service
- "shopify payments vs third party" — payments ops
- "vat oss spain" — EU VAT but not UK-seller-facing enough to be our best answer (kept as ADJACENT rather than GEO since Spain-specific OSS mechanics are a common cross-border question a UK seller could plausibly ask, but it reads as ops-adjacent rather than core service)
- "amazon jewelry fees 2026" — fee schedule lookup

### DROP-GEO
- "vat oss jaki limit" — Polish
- "cost of goods sold gaap definition" — US GAAP standard
- "cogs formula cbse" — Indian school curriculum
- "amazon vs noon fees" — Noon is a Middle East marketplace
- "shopify payments kazakhstan" — non-UK market
- "was ist amazon fba" — German
- "5 common mistakes us amazon sellers make with bookkeeping accounting" — explicit US audience
- "cost of goods sold kya hota hai" — Hindi
- "dropshipping jaki vat" — Polish
- "vat oss czechy" — Polish
- "amazon settlement eligibility" — US Amazon/FTC legal settlement, not UK tax
- "vat oss finlandia" — Polish
- "amazon flex settlement update" — US legal settlement
- "shopify payments kosovo" — non-UK market
- "5 common mistakes us amazon sellers make with bookkeeping accounting" — US audience (duplicate pattern, appears more than once in the pool)

### DROP-BRAND
- "ecommerce masterclass with zain shah" — named individual/course
- "amazon settlement lookup" — brand navigational tool
- "tiktok seller central" — platform login/dashboard
- "is link my books.free" — competitor pricing question
- "upcounting ecommerce accountants photos" — competitor firm navigational
- "a2x shopify pricing" — competitor tool pricing
- "shopify payment button" — platform feature navigational
- "link my books featured with multiple best-of badges in 2024" — competitor PR content
- "link my books support" — competitor support page
- "tiktok shop uk" — platform navigational
- "vat oss taxology" — named competitor tool
- "link my books accountants" — competitor partner directory
- "amazon fba calculator extension" — tool/extension navigational
- "amazon service partners badge" — Amazon programme navigational
- "amazon settlement administrator" — legal-process navigational, not a seller question

### DROP-JUNK
- "how to add tiktok shop link to video" — marketing how-to, unrelated
- "inventory accounting entries in oracle fusion" — enterprise ERP query, off-audience
- "shopify payouts graphql" — dev/API fragment
- "amazon security surveillance fees" — no discernible intent
- "vat oss mf" — fragment
- "inventory accounting specialist" — job-title search
- "ebay furniture fees" — not a real Amazon/eBay fee category, fabricated by autocomplete
- "cogs formula business studies" — student homework query
- "etsy etsy originals" — nonsense/brand fragment
- "inventory abbreviation accounting" — abbreviation lookup, no intent
- "tips for taking on more clients as an ecommerce accountant" — wrong audience (targets accountants, not sellers)
- "side hustles for tax accountants" — wrong audience
- "eu oss vat openai" — incoherent combination
- "shopify dividend payout" — incoherent combination, no real concept
- "dropship tax starcitizen" — video game reference, nonsense

## KEEP subjects and category distribution

707 distinct subject labels were assigned across the 1,039 KEEP rows by the classifying agents (near one-per-row on the long tail, since ten agents worked in parallel without shared subject naming). Normalizing and clustering the obviously-duplicate labels collapses 695 of those rows into 26 clean canonical subjects; the remaining 343 rows are 308 genuinely distinct, mostly singleton subjects (a long tail of specific how-to phrasings, e.g. "amazon product tax code", "shopify vat exclusive pricing"). The `subject` field in the JSON output keeps each agent's original wording, not this normalized version — normalization here is presentation only.

### Canonical KEEP subjects (26 subjects covering 695 of 1,039 KEEP rows)

| Rows | Subject |
|---|---|
| 175 | COGS / cost of goods sold calculation |
| 84 | OSS/IOSS VAT scheme registration and thresholds |
| 51 | Side hustle / hobby seller tax rules |
| 49 | Amazon/eBay/Etsy seller tax obligations |
| 42 | VAT compliance and invoicing for sellers |
| 38 | Inventory valuation and accounting methods |
| 35 | Cross-border / EU VAT compliance for sellers |
| 33 | Reconciling platform payouts/settlements to books |
| 30 | Bookkeeping services for ecommerce sellers |
| 25 | Dropshipping business tax |
| 24 | Ecommerce accountant search / hiring an accountant |
| 21 | HMRC platform data reporting (digital platform rules) |
| 15 | VAT registration threshold and process |
| 13 | General ecommerce accounting practices |
| 12 | Multi-channel/multi-platform seller accounting |
| 10 | Tax deductions for sellers (allowable expenses) |
| 10 | VAT on platform/marketplace fees |
| 5 | Sole trader vs limited company for sellers |
| 4 | VAT number setup on platform |
| 4 | Making Tax Digital for sellers |
| 4 | Self assessment for online sellers |
| 4 | Import VAT / duty / EORI |
| 4 | Business bank account for sellers |
| 1 | Capital allowances for ecommerce assets |
| 1 | Corporation tax for ecommerce businesses |
| 1 | Trading allowance / hobby vs business threshold |

Long tail: 343 rows in 308 distinct low-frequency subjects (mostly 1-3 rows each). Full list is in the JSON's `subject` field; not reproduced here because most are one-offs (e.g. "amazon product tax code", "vat invoicing for sellers", "choosing an ecommerce accountant").

### Category distribution (KEEP rows only, 1,039 total)

| Rows | Category |
|---|---|
| 436 | Bookkeeping and Inventory |
| 305 | VAT and Cross-Border Selling |
| 151 | Business Structure and Tax |
| 76 | Making Tax Digital and Self Assessment |
| 49 | Platform Reporting and HMRC Letters |
| 14 | Amazon and Marketplace Selling |
| 8 | Ecommerce Accounting Services (seventh category, invented — see below) |

**Seventh category**: 8 KEEP rows didn't fit the given six well — queries like "ecommerce accounting service", "amazon seller bookkeeping service", "ecommerce vs traditional accounting" that are about the site's own service positioning rather than a specific tax/bookkeeping mechanic. Labelled "Ecommerce Accounting Services." Small enough to fold into "Bookkeeping and Inventory" if a seventh category is unwanted, but they read more like service/landing-page fodder than a how-to subject.

The pool is heavily lopsided toward "Bookkeeping and Inventory" (42% of all KEEP rows), and within that almost entirely COGS-calculation phrasings (175 rows, the single largest subject in the whole pool by a wide margin). That's an autocomplete artefact, not a genuine demand signal of that magnitude: autocomplete over-generates near-identical "cogs formula" / "cogs calculation" / "cost of goods sold cogs calculation" variants because it's completing a single popular head term in slightly different ways, not because 175 different real questions exist.

## What the pool is missing

Autocomplete seeding chased the phrasings people already type against Amazon/eBay/Etsy/Shopify head terms. It did not surface several subjects a UK ecommerce seller obviously needs and would search for, presumably because they don't share a platform-name stem with the seed terms. None of these appear anywhere in the KEEP set:

- **VAT flat rate scheme (including the limited cost trader test)** — a very common first VAT-scheme choice for a small seller, absent entirely.
- **The £90,000 UK VAT registration threshold stated as a number** — the pool has generic "vat registration" rows but nothing anchored to the actual current threshold figure, which is exactly the kind of query people type when they're close to it.
- **HMRC digital platform reporting deadline mechanics (31 January)** — the pool has general "platform reporting" rows but nothing about the reporting calendar itself, which is the anxiety-driving part of that regime.
- **Xero vs QuickBooks (or similar) for ecommerce bookkeeping** — a real comparison query sellers make when picking software; absent.
- **FX / multi-currency gains and losses** — Amazon/Etsy/eBay international sellers routinely deal with this; not represented.
- **Company formation cost for a seller** ("how much to set up a limited company for my Amazon business") — absent, despite "sole trader vs limited company" being present.
- **Personal allowance and total income from selling** — how selling income stacks against the personal allowance; absent.
- **De minimis / low value consignment relief** — relevant to import VAT for smaller dropship/POD sellers; absent.
- **Selling the business / exit (CGT on disposal of an Amazon/Shopify business)** — a growth-stage question for a maturing seller; absent.
- **Switching accountant mid-year** — a bottom-of-funnel conversion query type common on accountancy sites generally; absent here.
- **R&D tax credits** — noted in the brief as rare for this niche, and indeed absent, but worth a deliberate one-off page rather than leaving it purely absent.

By contrast, things the pool over-represents relative to real diversity: COGS-formula phrasings (175 near-duplicate rows), Polish-language OSS/VAT queries (a meaningful chunk of the 243 DROP-GEO rows), and Amazon "settlement" queries that are actually about the 2023-24 US Amazon/FTC legal settlement, not accounting settlements — a false-friend cluster that autocomplete conflated with the accounting term.

## Files

- `docs/ecommerce/pool_classified_2026-09-25.json` — every row, `{id, keyword, bucket, rule, subject, category}`, 2,329 entries, verified 1:1 against the source table.
- This file.
