# Dedup audit — Ecommerce / marketplace seller launch core (site_key `ecommerce`)

Date: 2026-07-15. MANDATORY pre-brief gate (estate cumulative dupe rate 47%). READ-ONLY.
Method: page-level check of all 14 launch-core pages + 3 tools + 1 asset (LAUNCH_CORE.md)
against the live estate. Swept: `generalist/web/content` (blog + fundamentals + resources),
`startups-tech/web/content`, `crypto/web/content`, `contractors-ir35/web`,
`construction-cis/web`. TOPICS.md hard gate already dropped 12 of 4,163 pool terms; the
meaningful collisions are ALL with the generalist site's **six live "Accountant For
[ecommerce segment]" pages** — this is the one niche with a real cannibalisation block.

## Estate collision surface (what actually exists)

**generalist (Holloway Davies) — THE wall.** Six live ecommerce HIRE-head blog posts (exact
titles/slugs below in the FENCE section) plus adjacent generic content:
- MTD ITSA: large cluster (`making-tax-digital-accountant`, `-checklist-april-2026`,
  `mtd-itsa-april-2026-deadline`, `mtd-software-for-sole-traders`,
  `mtd-itsa-record-keeping-sole-trader`, sole-trader/rental/dividend/partnership variants,
  `fundamentals/making-tax-digital-for-income-tax-guide`, `resources/vat-mtd`). **None
  seller-scoped.**
- VAT: `blog/vat-threshold-2025-26` (£90k head), `resources/vat-mtd` (schemes + MTD),
  `vat-accountant-importing-goods-uk`, `vat-accountant-importing-goods-outside-uk` (the
  latter DOES cover postponed VAT accounting + customs, but generic-importer scope),
  `reverse-charge-vat-construction` (construction domestic reverse charge, NOT marketplace
  fees), `/calculators/vat-scheme-comparator`. **No IOSS/OSS, deemed-supplier/establishment,
  VAT-on-marketplace-fees, £135-import-rule, or margin-scheme depth.**
- Side hustle / structure: `limited-company-vs-sole-trader-side-hustle`,
  `register-as-self-employed-uk-while-keeping-full-time-job` (+ how-to variant),
  `accountant-for-content-creators-uk` (creator-scoped, adjacent to TikTok/marketplace).
  **No platform-reporting / HMRC-online-sales-letter / Vinted-eBay-visibility page.**
- Calculators: `salary-dividend`, `incorporation` (ST-vs-Ltd), `vat-scheme-comparator`.
  **All generic; none seller-scoped (no marketplace-fee / true-margin / seller VAT-tracker).**

**startups-tech / crypto:** ZERO ecommerce/marketplace overlap. (startups-tech only shares
the abstract "ERIS 30% intensity" R&D concept — irrelevant to sellers; crypto: no matches.)

**contractors-ir35:** ZERO true overlap. Its VAT/"reverse charge" hits are umbrella/IR35
domain; goforma-style contractor↔ecommerce bleed noted in LAUNCH_CORE is a rival, not our
estate. 3 IR35-adjacent pool terms already flagged/dropped in s5.

**construction-cis:** ZERO overlap. Its "reverse charge" is CIS domestic reverse charge.

**No estate site** has: deemed supplier / marketplace-facilitator VAT, establishment status,
VAT on Amazon/eBay/Etsy fees (2024 Amazon UK-billing switch, reverse charge), £135 import
rule, IOSS vs OSS for UK/NI sellers, margin scheme for resellers, seller settlement/payout
reconciliation, HMRC online-sales platform-reporting letters, seller true-margin/take-home,
or the online-seller data asset.

## Verdict table (14 pages + 3 tools + 1 asset)

| # | Asset | Verdict | Overlap (estate page/slug) | Required wedge if DIFFERENTIATE | Conf |
|---|---|---|---|---|---|
| **HUBS (5)** | | | | | |
| 1 | / (homepage/head) | FENCE | generalist `accountant-for-ecommerce-business` + `-sellers` (2 of the 6 live pages) | Marketplace/multi-platform seller frame with seller lead-form inputs (platforms, rev band, stock location, fulfilment); generalist pages are generic small-business-ecommerce blog posts. See FENCE section — owner migrate-vs-fence ruling deferred | High |
| 2 | /for/amazon-sellers | FENCE | generalist `accountant-for-amazon-fba-sellers-uk` | FBA/FBM settlement reconciliation + fee VAT + pan-EU depth vs generalist single "how to choose" blog post | High |
| 3 | /for/shopify-sellers | FENCE | generalist `accountant-for-shopify-stores` | DTC payout reconciliation + multi-gateway VAT vs generalist single blog post | High |
| 4 | /for/marketplace-sellers | FENCE | generalist `accountant-for-etsy-sellers-uk` (Etsy only; eBay/TikTok/Vinted uncovered) | eBay/Etsy/TikTok/Vinted-graduate platform-reporting hub vs generalist single Etsy post | High |
| 5 | /for/dropshippers | FENCE | generalist `accountant-for-dropshippers-uk` | £135 rule + supplier-direct imports + ad-spend VAT vs generalist single blog post. (Also LAUNCH_CORE's weakest measured hub — first to fold if core trimmed) | High |
| **MONEY / SERVICE (4)** | | | | | |
| 6 | Ecommerce VAT compliance | DIFFERENTIATE | generalist `vat-threshold-2025-26`, `resources/vat-mtd`, `/calculators/vat-scheme-comparator` | Marketplace VAT layer (deemed supplier, gross-vs-payout threshold, seller schemes); generic £90k registration + scheme content STAYS generalist | High |
| 7 | Settlement / payout reconciliation | UNIQUE | none | — | High |
| 8 | Selling into the EU (IOSS/OSS) | UNIQUE | none (generalist import pages are generic-importer, no IOSS/OSS/intermediary) | — | High |
| 9 | HMRC letter about online sales | DIFFERENTIATE | generalist `limited-company-vs-sole-trader-side-hustle`, `register-as-self-employed-*`, `content-creators-uk` | Platform-reporting-response service (letter received → advisory); generalist side-hustle posts are structure/registration explainers, not a reporting-letter response page | High |
| **/vat/ DEPTH CLUSTER (5)** | | | | | |
| 10 | Deemed supplier & establishment | UNIQUE | none | — | High |
| 11 | VAT on marketplace fees (reverse charge) | UNIQUE | none (generalist reverse-charge page is CONSTRUCTION domestic RC) | — | High |
| 12 | £135 import rule | UNIQUE | none | — | High |
| 13 | IOSS vs OSS (UK/NI sellers) | UNIQUE | none | — | High |
| 14 | Postponed import VAT + margin scheme | DIFFERENTIATE | generalist `vat-accountant-importing-goods-outside-uk` (covers postponed VAT + customs, generic importer) | Seller/reseller framing: postponed VAT for stock imports + margin scheme for second-hand resellers; generic importer PVA content STAYS generalist | Med |
| **TOOLS (3)** | | | | | |
| T1 | Seller take-home / true-margin | DIFFERENTIATE | generalist `salary-dividend`, `incorporation` calcs | Marketplace-fee + COGS + VAT JOINED into true margin (LAUNCH_CORE "verified vacuum"); generic salary/dividend calc stays generalist | High |
| T2 | VAT threshold tracker | DIFFERENTIATE | generalist `/calculators/vat-scheme-comparator` | Gross-vs-payout tracking for marketplace sellers (payout ≠ turnover trap); generic scheme comparator stays generalist | High |
| T3 | ST-vs-Ltd for sellers | DIFFERENTIATE | generalist `incorporation` calc + `limited-company-vs-sole-trader-side-hustle` | Seller-scoped inputs (stock/COGS, marketplace fees, 2026/27 dividend rates) + seller decision framing; generic incorporation calc stays generalist | Med |
| **ASSET (1)** | | | | | |
| A1 | UK Online Seller Business Index | UNIQUE | none | — | High |

## Counts per verdict

- **UNIQUE: 6** (7, 8, 10, 11, 12, 13, A1) → note A1 makes 7 UNIQUE assets; re-listed: #7, #8, #10, #11, #12, #13, #A1 = **7 UNIQUE**
- **DIFFERENTIATE: 6** (#6, #9, #14, T1, T2, T3)
- **FENCE: 5** (#1, #2, #3, #4, #5 — the five HIRE hubs, all colliding with the 6 live generalist pages; owner migrate-vs-fence ruling deferred to deploy gate)
- **DROP: 0**

(7 UNIQUE + 6 DIFFERENTIATE + 5 FENCE = 18 assets. FENCE is the ecommerce-specific verdict:
these are not clean UNIQUE and not cede-DROP — they are held in a differentiated state with
both migrate and fence options open until the deploy-gate owner ruling.)

## FENCE section — the 6 live generalist ecommerce pages (owner ruling DEFERRED)

All six are LIVE blog posts on hollowaydavies.co.uk under `/blog/`. TOPICS.md records these
as the exact HIRE head-term collision block; the migrate-vs-fence decision is an **owner
gate at deploy time** (DOSSIER.md). Until then EVERY corresponding ecommerce-site hub must
FENCE — build differentiated now (marketplace-seller frame + seller lead inputs + platform
depth) so both options stay open. Do NOT 301 or migrate anything at build; that needs GSC
evidence per the data-gated-consolidation rule.

| Generalist page (title) | Slug / URL | Target query family | Ecommerce-site corresponding page | Fence action |
|---|---|---|---|---|
| "What Does an Ecommerce Business Need from an Accountant in 2025/26?" | `/blog/accountant-for-ecommerce-business` | "accountant for ecommerce business", "ecommerce accountant" (880/mo) | / (homepage/head) | Marketplace/multi-platform head + seller lead-form; keep generalist generic-SME frame intact |
| "Why Do Ecommerce Sellers Need a Specialist Accountant?" | `/blog/accountant-for-ecommerce-sellers` | "ecommerce accountant", "accountant for ecommerce sellers" | / (homepage/head) | Same head — differentiate on seller-specialist depth (VAT/reconciliation) |
| "How to Choose an Accountant for Amazon FBA Sellers in the UK" | `/blog/accountant-for-amazon-fba-sellers-uk` | "amazon fba accountant(s)" (110/mo, CPC £37.56) | /for/amazon-sellers | FBA settlement + fee VAT + pan-EU depth vs "how to choose" blog |
| "What Does a Shopify Store Owner Need From an Accountant in 2025/26?" | `/blog/accountant-for-shopify-stores` | "shopify accountant(s)" (210/mo) | /for/shopify-sellers | DTC payout reconciliation + multi-gateway |
| "Why Etsy Sellers Need a Specialist Accountant (and What to Look For)" | `/blog/accountant-for-etsy-sellers-uk` | "etsy accountant" (70/mo); eBay/TikTok/Vinted uncovered | /for/marketplace-sellers | Fold Etsy into wider marketplace hub; eBay-HMRC family (1,400/mo) is net-new |
| "What Dropshipping Businesses Need from an Accountant in 2025/26" | `/blog/accountant-for-dropshippers-uk` | "dropshipping accountant" (0/mo measured) | /for/dropshippers | £135 rule + supplier-direct import VAT; weakest hub, fence lightly |

## Bottom line

- **7 UNIQUE / 6 DIFFERENTIATE / 5 FENCE / 0 DROP** (18 assets: 14 pages + 3 tools + 1 asset).
- The two money clusters — **/vat/ marketplace depth** (deemed supplier, marketplace-fee
  reverse charge, £135 rule, IOSS/OSS) and **settlement reconciliation + online-seller
  index** — are entirely net-new to the estate. This validates LAUNCH_CORE's "narrower and
  deeper, depth on VAT/cross-border" positioning.
- The ONLY real dupe risk is the **generalist 6-page ecommerce wall**, which maps 1:1 onto
  the 5 HIRE hubs. Every one is FENCED, not DROPPED, pending the owner's migrate-vs-fence
  ruling at the deploy gate. Fence = differentiate now (marketplace-seller frame + seller
  lead inputs + platform depth) so 301-migrate stays reversible.
- Generic content that MUST stay generalist-owned and be linked out, not re-explained:
  £90k VAT registration, VAT scheme comparator, MTD ITSA mechanics, generic ST-vs-Ltd/
  incorporation, generic salary-dividend, generic import PVA/customs. Seller-scoped versions
  live here with seller-specific inputs (per LAUNCH_CORE adjacency rule).
- Per gap-discovery lesson (47% cumulative dupe rate) and the two programmatic mega-sitemaps
  in the pool: **page-level verify against the live estate remains mandatory at write time**,
  doubly so on the 5 fenced hubs.
