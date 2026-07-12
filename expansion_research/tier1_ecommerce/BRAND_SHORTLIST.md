# R4 Brand/Domain Shortlist — Ecommerce / marketplace sellers (Tier 1)

Date: 2026-07-12. Checks: `r4_domain_check.py` (Nominet RDAP for .co.uk, rdap.org for .com; sanity: propertytaxpartners.co.uk returned RDAP 200 before trusting 404s). Collision checks via web search same day. **Nothing locked — owner picks and registers (G1 gate).**

## Landscape note (collision context)

- **"Ecommerce Accountants" (ecommerceaccountants.co.uk)** is an established UK incumbent brand (ACCA practice, Xero Platinum Partner) — any name built on "Ecommerce Accountants" is a direct collision; we avoid the "Accountants" noun entirely.
- **"Tax Partners" (taxpartnersuk.com / Tax Partners Limited, co. 06623956)** is a generic London tax firm. Two-word proximity for any `<X> Tax Partners` name, but the estate already runs Property Tax Partners on the same pattern without conflict — the niche qualifier does the distinguishing.
- **"Ecommerce Finance" reads as lending, not accounting**: searches for "Ecommerce Finance Partners" surface a funding/loans category (Clifton Private Finance, eCommerce Funding, iwoca, Capify), not accountancy firms. No firm of that name exists, but the phrase carries category-confusion risk — demoted below the Tax names.
- Established sector firms/brands to stay distinct from (per COMPETITORS.md + these searches): Your Ecommerce Accountant, Elver E-Commerce Accountants, Sterlinx Global, Ecom Accountants, Sync Accountants, 123Financials, E2E Accounting/CoxHinkins, plus the SaaS content arms (Link My Books, A2X) that own the informational SERP.

## Shortlist (ranked)

### 1. Ecommerce Tax Partners — ecommercetaxpartners.co.uk
- **Rationale:** Most niche-legible; mirrors `Property Tax Partners` exactly. "Tax" is the wedge the SaaS arms and generalist bookkeeping incumbents can't own (LAUNCH_CORE: contest the UK-tax layer, not the "ecommerce accountant" head), and it sidesteps the crowded "Ecommerce Accountants" brand namespace.
- **.co.uk RDAP:** 404 (available) @ 2026-07-12T10:28:50Z (recheck 10:29 pass clean). **.com:** 404 (available).
- **Collision check:** search `"Ecommerce Tax Partners" UK accountant` — no firm of that name; results are the incumbent "Ecommerce Accountants" cluster and listicles. Nearest name is generic Tax Partners Limited (London) — distinct with the qualifier.
- **storagePrefix:** `ectp` (free vs ptp/dfp/ma/afl/hd/aff/cfp/bfp/tfp/ctp/cfs/ttp/npf).
- **Colour direction:** warm marigold/amber + charcoal — energetic-but-grounded retail signal, unused by the estate's existing primaries.

### 2. Seller Tax Partners — sellertaxpartners.co.uk
- **Rationale:** Speaks directly to the persona ("seller" is how Amazon/eBay/Etsy people self-describe), shortest domain of the set, house pattern. Slightly less SEO-legible than "ecommerce" for the head term.
- **.co.uk RDAP:** 404 (available) @ 2026-07-12T10:28:50Z. **.com:** 404 (available).
- **Collision check:** search `"Seller Tax Partners" UK accountant` — no firm of that name; only generic Tax Partners Limited and ecommerce-accountant listicles nearby.
- **storagePrefix:** `slr`.
- **Colour direction:** deep teal-ink + warm sand (clear of slate teal reserved by charities).

### 3. Marketplace Tax Partners — marketplacetaxpartners.co.uk
- **Rationale:** Maps onto the site's strongest technical wedge (marketplace-collected VAT, HOUSE_POSITIONS A) and covers eBay/Etsy/TikTok Shop beyond Amazon. Slightly abstract for a first-time searcher.
- **.co.uk RDAP:** 404 (available) @ 2026-07-12T10:28:50Z. **.com:** 404 (available).
- **Collision check:** search `"Marketplace Tax Partners" UK` — no firm of that name; results are marketplace-facilitator-tax explainers (A2X, Dext) and generic Tax Partners UK.
- **storagePrefix:** `mkt`.
- **Colour direction:** deep cobalt + off-white.

### 4. Ecommerce Finance Partners — ecommercefinancepartners.co.uk
- **Rationale:** Exact `Dental Finance Partners` house pattern; broadest service framing. Demoted for category confusion: "ecommerce finance" in UK search means funding/working-capital lenders, not accountants (see landscape note).
- **.co.uk RDAP:** 404 (available) @ 2026-07-12T10:28:50Z. **.com:** 404 (available, recheck pass).
- **Collision check:** search `"Ecommerce Finance Partners" UK` — no firm of that name; results are all lenders/brokers (Clifton, Swoop, iwoca, Capify), which is itself the risk signal.
- **storagePrefix:** `ecfp`.
- **Colour direction:** graphite + citrus yellow accent.

### 5. Ecommerce Tax Specialists — ecommercetaxspecialists.co.uk
- **Rationale:** House `Specialists` pattern, plainly descriptive, avoids "Partners" entirely. Weakest brandability of the set — reads more like a category label than a firm.
- **.co.uk RDAP:** 404 (available) @ 2026-07-12T10:29:06Z. **.com:** 404 (available).
- **Collision check:** covered by the `"Ecommerce Tax Partners" UK accountant` and `"Online Seller Tax Partners" OR "Seller Finance Partners"` searches — no firm of this name surfaced; the namespace risk is the same "Ecommerce Accountants" adjacency as #1.
- **storagePrefix:** `shfp`.
- **Colour direction:** warm taupe + ink.

## Recommendation

**Ecommerce Tax Partners** (fallback: Seller Tax Partners if maximum persona-voice is preferred over head-term legibility, or if distance from the "Ecommerce Accountants" incumbent namespace is wanted).

## Rejected

| Name | Reason |
|---|---|
| Seller Finance Partners | Available, but "seller finance" collides with the seller-financing/lending term of art; searched, no firm found, still dropped for meaning drift |
| Marketplace Finance Partners | Available; same lending-category confusion as #4 with weaker legibility |
| Online Seller Tax Partners / Online Seller Finance Partners | Available but 4-word/25+-char domains; searched (no collisions), dropped for length |
| Online Retail Tax Partners | Available; "online retail" is the incumbents' phrasing (Mollan etc.) and weaker than "ecommerce" for the head term |
| Seller Tax Specialists / Marketplace Tax Specialists | Available but weaker phrasing; kept as reserves in r4 script output |
| Any "Ecommerce Accountants" variant | Direct collision with ecommerceaccountants.co.uk (established ACCA incumbent) — never checked, excluded at generation |

## RDAP notes

- Nominet RDAP rate-limits bursts: first pass had 3 .co.uk failures (WinError 10054 / TLS handshake timeout) and 7 .com 429s from rdap.org; re-run with 4s spacing returned clean 404s for every candidate. `r4_results.json` holds the merged clean results (all 12 candidates: .co.uk 404 + .com 404). Sanity assert (propertytaxpartners.co.uk = 200) passed on the first run.
