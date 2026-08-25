# PACK R1: accountant-for-retail-shops-uk — REFRAME (retail pillar)

Derived 2026-08-25 from FROZEN dossier `../retail_product_2026-08-25.md` only. Reads with
`language_spec.md` (lead structure: **symptom-audit-led**). Cluster hub for niche-map row 69.

## 1. Target and permission level

- Seed: `generalist/web/content/blog/accountant-for-retail-shops-uk.md`.
- Grade **REFRAME** (dossier §5): Bing 0/0, Google 0 clicks / 1 impression / pos 10.0. No equity to
  protect, so metaTitle, H1, H2 order and body are all writable. Full overhaul, `depth=full`, never
  a de-stale.
- Frozen-ground check before edit: slug not in an armed `monitored_pages` window on the registers on
  file; verify against the live table at write time (standing rule).
- Revert path: `git revert` on the single file; `monitored_pages` baseline captured at deploy.
- C1 gate: row 69 retail carries no C1 restriction. CLEAR.
- Ground truth: `house_positions.md` **§21.4** (retail schemes, the £1m / £130m gates), **§7** (VAT
  registration, MTD for VAT, flat rate and the limited-cost-trader rule), **§2** and **§2.B**
  (sole-trader profit, self assessment), **§3** (corporation tax), **§8** (capital allowances,
  shopfit), **§9** (payroll, employer cost). §21 is authored and locked as at 2026-08-25.

## 2. Equity register

None. One Google impression at pos 10.0 is noise, not a ranking. Nothing on this page is protected,
which is why it is a REFRAME rather than an EXTEND.

**Do-not-lose, cluster-level:** the live local queries `retail accountants croydon` (44 impressions),
`accountant for retail shops putney`, `accountant for retail shops sutton`, `retail accountants near
me`. Dossier §5 and delta **D5** record that these are almost certainly landing on location pages,
not on this blog seed, because the stage0 GSC pull is single-dimension. **Run the page+query join
before this page is written**, and if any of them do land here, they become named equity and the
grade is re-argued as EXTEND. Do not touch any location page from this pack.

## 3. Market keyword slice (ledger, retail pillar, ~250/mo deduplicated)

The ledger records the variant family summed per variant (8 rows at 210 each). The honest demand
line is the C3 deduplicated figure, **~250/mo**, not 1,680.

| Keyword | Vol/mo | Best peer |
|---|---|---|
| retail accountants | 210 (variant-summed family) | lanop p23 |
| accounting for retail | 210 | lanop p29 |
| accounting for retailing | 210 | lanop p31 |
| accounting in retail | 210 | lanop p31 |
| accounting for retailers | 210 | lanop p32 |
| retail accounting | 210 | lanop p36 |
| retail accountant | 210 | lanop p57 |
| accountant retail | 210 | lanop p58 |
| retail business accounting | 50 | lanop p9 |
| accounting in retail business | 50 | lanop p10 |
| shop accountant | 10 | — |
| retail accountants uk / accountant for retail business / accountant for shop / accountants for independent shops | null volume | — |

Peer-winnable ~250. **No specialist firm holds a top-10 position on any head variant.** The dossier
records 0 dedicated UK retail-accountancy specialists against 22 section firms, the weakest
competitor field of any niche researched in this programme.

## 4. Competitor teardown (fetched 2026-08-25, free)

- **lanop.co.uk `/retail-business/`** — the field's best ranker (p9-10 on the two "retail business
  accounting" phrasings, p23-58 on the heads). ~2,100 words. H1 "Accounting Solutions for Retail
  Businesses". Opener: "Utilizing the best accounting technology, we offer detailed accounting
  services for retail businesses." **Zero tax figures. Zero FAQs. No retail VAT scheme named
  anywhere.** H2s are benefit nouns ("Better Inventory Management", "Informed Decision Making",
  "Enhanced Retail Profitability") plus an Americanised "Sales Tax Compliance". CTA "Book Your FREE
  Consultation".
- **livingstonesaccountants.co.uk `/shop-accountants/`** — service page, ~2,100 words. Opener:
  "we specialise in offering bespoke accountancy services tailored to the unique needs of businesses
  across the UK". Has an "Inventory Accounting Support" H3 and a "Got questions? We've got answers"
  block. **No figures. No retail VAT scheme named.**
- Neither page carries a worked example. Between them they occupy the entire visible field and
  neither states a single number a shopkeeper could act on.

## 5. Whitespace

- **The retail VAT scheme choice, named.** Neither ranking page names point of sale, apportionment
  or direct calculation. This page names all three, states the £1 million (Scheme 1) and
  £130 million (Scheme 2) gates and the mandatory bespoke line above £130 million, and hands the
  arithmetic to N1. That alone puts the page ahead of the field on substance.
- **A recomputable 2026/27 worked example**, which no page in the field has: a small shop's year
  taken from takings to taxable profit, showing stock movement, shopfit capital allowances at the
  dated rates and the employer cost of one part-time assistant.
- **The three symptoms framing** (unreadable gross margin, unreliable year-end stock, unexamined VAT
  scheme) is a diagnosis the field replaces with benefit nouns.

## 6. Fences (binding)

- **Assignment split, never collapse:** this page is the **pillar**. The scheme arithmetic belongs to
  N1, the convenience-store sub-trade and the buy/sell fork belong to N2. One paragraph plus a link
  each, no more. N1 and N2 must not restate the pillar's service framing.
- **Estate wall:** online selling, Shopify, Amazon and marketplace VAT belong to the ecommerce site.
  No H2, FAQ or example on this page addresses online-only sellers. See §9 cannibalisation.
- **Flat Rate Scheme belongs to the existing `vat-flat-rate-scheme-explained` page.** One sentence
  and a link, never a section, and never a restatement of the 16.5% limited-cost-trader rule.
- No house-position citations in reader copy (report only). No em-dashes. Rates date-tagged; Class 4
  6% and the £12,570 / £50,270 bands carry the "2025/26 figures, still current when checked August
  2026" hedge.
- No "unique financial challenges", no "maximise profits and minimise liabilities", no benefit-noun
  H2s (all three are lifted straight from the two incumbents).
- Anonymised social proof only; no client-saving figure as a heading.
- Coverage over selection: ~250/mo is the honest demand line and it is not a gate.

## 7. Acceptance criteria (deterministic)

1. Queries answerable from metaTitle, H1, H2s or FAQ: retail accountant / retail accountants /
   retail accounting / accounting for retail / accounting for retailers / retail business
   accounting / accountant for retail business / accountants for independent shops / shop
   accountant. Every ledger row assigned "retail seed reframe" must be matchable.
2. Figures carried, recomputable and date-tagged: VAT £90,000 registration and £88,000
   deregistration; retail scheme gates £1m and £130m and the bespoke line above £130m; main-rate
   WDA 18% to 14% from 1 April 2026 (corporation tax) / 6 April 2026 (income tax) and the 40%
   first-year allowance from 1 January 2026 for shopfit plant; Annual Investment Allowance £1m;
   employer NIC 15% and the £5,000 secondary threshold for the staff example; income tax bands and
   Class 4 with the 2025/26 hedge.
3. One full worked example, every line re-derivable from figures printed on the page.
4. At least one FAQ block with question-form headings (neither incumbent has one).
5. Links: N1, N2, the existing flat-rate VAT page, the existing MTD page. Resolver-clean, zero
   invented slugs. §4 floors plus the coverage floor pass.
6. Structure follows the assigned symptom-audit lead for the opening 40%; no H2 phrasing shared with
   N1 or N2.
7. Page+query join (D5) run and its result recorded in the delivery report before the file is edited.

## 8. Expectation

~250/mo with **no specialist in the top 10 and the best incumbent at p9-10 on a 50/mo phrasing
only**. This is the weakest field in the programme. Realistic: Google top-10 on two or more head
variants within a quarter of indexing, Bing earlier. Maturity caveat: a reframed page is new
surface, judge at 28d Bing / 90d Google. Failure trigger, written before the edit: zero impressions
across all head variants at 90d post-index, or loss of any local query confirmed by the D5 join to
be landing here.

## 9. Cannibalisation notes (never-collapse rule)

| Existing page | Overlap | Resolution |
|---|---|---|
| `accountant-for-amazon-fba-sellers-uk.md` | H2s "Stock Accounting and Valuation", "VAT Registration and Compliance for Amazon FBA" | **Differentiate, do not collapse.** FBA page keeps marketplace-specific stock and VAT ground and stays untouched by this wave. R1 addresses physical premises only: till takings, shopfloor stock, retail schemes. R1 uses no Amazon, marketplace or online-selling phrasing. Known cannibalisation-watch item, recorded. |
| `accountant-for-shopify-stores.md` | ecommerce wall, conflict-check only | Untouched. No link from R1. |
| `vat-flat-rate-scheme-explained.md` | flat rate scheme | R1 links, never restates. |
| N1, N2 (this wave) | retail schemes, sub-trade | Assignment split above, enforced in §6. |
