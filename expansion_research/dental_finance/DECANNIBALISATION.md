# De-cannibalisation report — full mapped program

130 mapped pages checked vs 15-site estate GSC corpus + against each other.

## (A) EXTEND (estate already ranks — do NOT mint a new URL)
- **buy-to-let-mortgage-calculator** (SPV/BTL mortgage, 22200/mo) -> EXTEND **propertytaxpartners** which ranks 'buy to let calculator' (41 impr across 8q, best pos 18.8)
- **capital-allowances-guide** (specialist_tax, 2900/mo) -> EXTEND **propertytaxpartners** which ranks 'van capital allowances' (54 impr across 16q, best pos 23.3)
- **limited-company-buy-to-let-mortgages-guide** (SPV/BTL mortgage, 2400/mo) -> EXTEND **propertytaxpartners** which ranks 'uk limited company buy to let mortgage rates 2026' (12 impr across 6q, best pos 5)
- **let-to-buy-mortgages** (SPV/BTL mortgage, 1900/mo) -> EXTEND **propertytaxpartners** which ranks 'calculate buy to let mortgage' (29 impr across 5q, best pos 1)
- **EXTEND: selling-a-dental-practice** (Dental practice finance, 90/mo) -> EXTEND **dentalfinancepartners** which ranks 'selling a dental practice taxes' (377 impr across 9q, best pos 14.9)
- **EXTEND: specialist-dental-finance (hub)** (Dental practice finance, 40/mo) -> EXTEND **dentalfinancepartners** which ranks 'dental practice finance uk' (7 impr across 4q, best pos 20.3)
- **EXTEND: dental-practice-valuation** (Dental practice finance, 40/mo) -> EXTEND **dentalfinancepartners** which ranks 'dental practice valuation uk' (153 impr across 11q, best pos 19.7)
- **annual-investment-allowance-aia** (specialist_tax, 0/mo) -> EXTEND **propertytaxpartners** which ranks 'what is annual investment allowance' (61 impr across 12q, best pos 3)
- **corporation-tax-loans** (business_finance, 0/mo) -> EXTEND **propertytaxpartners** which ranks 'corporation tax uk' (9 impr across 3q, best pos 3)
- **how-to-sell-a-dental-practice-business** (exit_eot, 0/mo) -> EXTEND **dentalfinancepartners** which ranks 'dental practice business insurance' (10 impr across 2q, best pos 11)
- **EXTEND: goodwill-funding-practice-purchase** (Dental practice finance, 0/mo) -> EXTEND **dentalfinancepartners** which ranks 'dental practice goodwill values' (25 impr across 2q, best pos 11.6)
- **squat-dental-practice-funding** (Dental practice finance, 0/mo) -> EXTEND **dentalfinancepartners** which ranks 'dental practice finance uk' (7 impr across 4q, best pos 20.3)
- **second-dental-practice-expansion-finance** (Dental practice finance, 0/mo) -> EXTEND **dentalfinancepartners** which ranks 'dental practice finance uk' (7 impr across 4q, best pos 20.3)
- **100-percent-dental-practice-finance** (Dental practice finance, 0/mo) -> EXTEND **dentalfinancepartners** which ranks 'dental practice finance uk' (7 impr across 4q, best pos 20.3)

_14 of 130 pages should EXTEND an existing estate page._

## (B) INTERNAL collisions (same intent mapped twice — pick ONE canonical)

_0 internal collision groups._

---

## Curated decisions (after filtering fuzzy false-positives)

**TRUE EXTEND — build on the existing ranking page, do NOT mint a new URL:**
- `capital-allowances-guide` + `annual-investment-allowance-aia` → **property** (already ranks 16q / p3, pos-1 cluster per estate sweep). Broaden existing pages + add specialist-buyer routing.
- `rd-tax-credits-guide` → **property + generalist** (both pos-1 for R&D). **CONSOLIDATE, do not add a 4th competing page** — property/generalist/founder already cannibalise each other internally on R&D; pick ONE canonical host, others cross-link/canonical.
- `limited-company-buy-to-let-mortgages-guide`, `buy-to-let-mortgage-calculator`, `let-to-buy-mortgages` → **host on property** (already ranks; property is the natural BTL host). One calculator, not duplicates.
- All `EXTEND: *` dental pages → **dentalfinancepartners** (already in the dental map).
- `capital-allowances-for-care-homes` segment → cross-link/host with **carehometax** (ranks it p49).

**CROSS-LINK ONLY — build NEW, but link to the ranking page (different intent, not a dupe):**
- `corporation-tax-loans` — property ranks "corporation tax" *info*, not the *loan product*. Build NEW, cross-link.
- `squat-` / `second-` / `100-percent-dental-practice-finance` — all relate to the dental-finance *hub* (p20); build NEW as spokes UNDER the hub, link up, don't duplicate hub copy.

**INTENTIONAL hierarchies (not collisions) — set canonical + cross-link:**
- `equipment-and-machinery-finance` (business finance pillar) ⊃ `dental-equipment-and-chair-finance` (dental segment) — pillar + sector spoke.
- `bridging-finance-for-buy-to-let` (bridging use-case) vs SPV-BTL mortgage cluster — different products (short-term vs term), cross-link.
- `capital-allowances-for-dental-practices` (specialist-tax segment) vs dental finance cluster — different service (tax reclaim vs finance), cross-link.

**Net:** ~10 pages convert NEW→EXTEND (mostly capital allowances / R&D / BTL / dental, hosted on sites that already rank); R&D needs internal consolidation across property/generalist/founder; 0 true internal duplicates remain in the new maps. Everything else is genuinely net-new (greenfield confirmed by the estate sweep: commercial mortgage, invoice/factoring, business loans, EOT, MBO all unranked estate-wide).
