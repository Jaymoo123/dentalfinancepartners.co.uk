# U35 — selling-a-property-spv-share-sale-vs-asset-sale

## 1. Unit facts

- Type: NEW blog post
- Category: Incorporation & Company Structures
- Slug: `selling-a-property-spv-share-sale-vs-asset-sale`
- Hub: HUB 5, selling-closing (child of the `/spv-company` pillar, alongside U34
  `how-to-close-a-property-limited-company`)
- Priority: P2
- Verdict rationale (`page_map.csv` U35): "Gap at the decision level.
  substantial-shareholding-exemption and pre-sale-extraction own technical slices; nothing
  owns the seller share-vs-asset choice (0.5% stamp taxes vs 5% SDLT, latent-gain discount, an
  honest SSE reality check for an investment company)."

## 2. Dominant query + full variant list

**Dominant query (owns the H1):** selling an spv — `page_map.csv` U35. No standalone volume
figure measured on the exact phrasing; this is a decision-level page built on the gap
identified in `page_map.csv`, sized by the surrounding "sell property company" / "sell house
owned by limited company" query family below rather than a single head-term number.

| Tag | Phrasing | Volume/source |
|---|---|---|
| dominant | selling an spv | page_map.csv U35 |
| dominant-variant | sale of spv | page_map.csv U35 |
| dominant-variant | selling an spv (questions_corpus.csv "how to start an spv" family) | questions_corpus.csv, tagged `sell spv` |
| technical | property spv for sale | page_map.csv U35 |
| conversational | sell the company or sell the property | page_map.csv U35 (retagged at gate review from "decision" to "conversational" so the four standard formulation types are used consistently across the wave; this is the plain-language framing of the whole page and should drive the H1's supporting line and the first H2) |
| technical | share sale vs asset sale property company | page_map.csv U35 |
| technical | sale of property rich company | page_map.csv U35 |
| question | what discount will a buyer want for latent cgt | page_map.csv U35 |
| technical | spv sale stamp duty | page_map.csv U35 |
| adjacent | selling a property limited company / selling property limited company / selling property in company / selling property owned by limited company | `questions_corpus.csv`, tagged `sell property company` / `property limited company`, misc |
| adjacent | do property developers set up company and then sell & claim sse | 28 impressions, 7 clicks, Bing, pos 2.5, `our_queries.csv`, landing on `substantial-shareholding-exemption-property-companies` — direct SSE-reality-check signal this unit must address honestly |
| adjacent | selling private property into a limited company / selling a house within a limited company tax implications / selling a primary residence to own ltd company | multiple Bing rows, `our_queries.csv`, all landing on `how-to-transfer-property-into-limited-company-uk` — these are transfer-IN intent wearing a sale verb (the U36 trap family per `PAGE_MAP.md` §9.9), NOT this unit's intent; do not build content around them |
| action | how do i sell my property company / do i need a solicitor for a share sale | page_map.csv U35 FAQ list + the "do I need a solicitor" follow-on; no measured corpus row, editorial framing, keep as FAQ entries and the process aside in H2 9, do not build an H2 around it |
| adjacent | selling an spv in proprty [sic] | 12 impressions, Bing, pos 4.0, `our_queries.csv`, landing on `spv-property-investment-special-purpose-vehicle-guide` — general SPV guide, not this decision page; confirms "selling an SPV" intent exists but is currently unserved by a dedicated seller-decision page |

**Trap (do not build FAQ content on this):** the large cluster of "can I sell my house to my
own limited company", "if i sell my property to my own ltd company what stamp duty" rows in
`our_queries.csv` (see U24/U29 briefs' our-data sections and `PAGE_MAP.md` §9.9, U36) are
transfer-IN intent wearing a sale verb. This unit is about an EXISTING SPV's shareholders
exiting the business (selling the company or its properties to a third-party buyer), not an
individual selling their house to their own company. Keep the two firmly separated in the
outline and FAQ.

## 3. Our-data baseline

Strongest signal: "do property developers set up company and then sell & claim sse" — 28
impressions, 7 clicks, Bing, position 2.5, landing on `substantial-shareholding-exemption-property-companies`.
That page already ranks reasonably (pos 2.5) and gets clicks on the general SSE query, but it
is a technical-mechanics page (per its own seam ownership, confirmed below) rather than a
seller decision-comparison page — this unit is built to sit above it and route sellers to the
right depth of content depending on whether they need the decision framework or the SSE
mechanics.

Every other query in `our_queries.csv` matching "sell*" + "spv"/"property"/"company" strings
resolves to the U36 trap family (transfer-IN wearing a sale verb) landing on the transfer-IN
tax how-to page, not to this unit's genuine exit-decision intent. This confirms the page_map.csv
"gap at the decision level" framing: real search volume around "selling" a property company
exists in the data, but almost all of it is currently the transfer-in trap, and the small
residual (the SSE row) is technical-mechanics traffic with nowhere to route from a decision-
level page. Build this page to capture the decision-level intent and correctly triage both the
trap traffic (with an explicit FAQ disambiguation) and the SSE-curious traffic (link to the
mechanics page rather than compete with it).

## 4. Competitor coverage floor

`competitor_urls.csv` returns one tangential row (needingadvice.co.uk "buy to sell mortgages",
a bridging/flip finance product page, not a share-vs-asset exit-decision page). No competitor
in the corpus owns the seller's share-sale-vs-asset-sale comparison for a property SPV. Genuine
whitespace, consistent with the page_map.csv gap verdict.

## 5. Seam MUST-NOTs

This page owns the SELLER'S COMPARISON when exiting: share sale (CGT on the shares, BADR
rarely available for a rental SPV, buyer inherits latent gains + gets the SDLT saving of 0.5%
stamp duty on shares vs SDLT on the property) vs asset sale (company pays Corporation Tax on
the gain, then an extraction layer to get proceeds to the shareholders).

**It must NEVER:**
- Restate the technical mechanics of `substantial-shareholding-exemption-property-companies`
  or `substantial-shareholding-exemption-sse` (BOTH CONFIRMED ON DISK). Those pages own the
  detailed SSE eligibility test (trading-company requirement, 10% minimum shareholding,
  12-month holding period). Summarise in 2-4 sentences ("SSE can exempt a company's gain on
  selling shares in a trading subsidiary — but a pure buy-to-let rental SPV is an investment
  company, not a trading company, so SSE essentially never applies to a straightforward rental
  portfolio SPV sale; see the dedicated SSE pages for the full test and the narrow cases where
  it might apply") and link out. **Note:** `house_positions.md` line 3843 flags an internal
  cannibalisation-risk / possible-redirect decision between these two SSE pages that was
  deferred to a later Stage 2 dispatch — this unit must link to WHICHEVER of the two slugs is
  live at write time (verify both are still separate pages, not one redirected to the other,
  immediately before publishing) rather than assuming both remain live.
- Restate the mechanics of `pre-sale-extraction-strip-cash-before-spv-share-sale-vs-buyer-discount`
  (CONFIRMED ON DISK). That page owns HOW to strip cash out before a share sale to reduce the
  buyer's latent-gain discount. This page covers the DECISION (share vs asset sale) and may
  mention pre-sale extraction as a lever in 2-4 sentences, then link out — do not reproduce its
  mechanics or worked numbers.
- Restate the final-distribution tax analysis owned by
  `mvl-members-voluntary-liquidation-property-company-cgt-vs-income-treatment` (CONFIRMED ON
  DISK) — an asset sale followed by winding up the (now cash-only) company is a different
  journey from a share sale, and the post-sale extraction/closing step belongs to the MVL page
  and `how-to-close-a-property-limited-company` (CONFIRMED ON DISK), not to this page. Link to
  both for readers whose asset-sale path continues into winding up the company.
- State BADR applies to a rental SPV's share sale as a default outcome — house_positions.md §5
  is explicit that BADR does NOT apply to investment property disposals, and a pure buy-to-let
  SPV is very unlikely to meet the trading-company test that BADR (and SSE) both require. Frame
  BADR as "rarely available, only where the company can genuinely evidence trading activity
  beyond passive letting" rather than as a standard planning lever.

## 6. Facts pack (dated 2026-09-01, verified vs `docs/property/house_positions.md`)

- **Share sale — CGT on the shares.** The selling shareholder(s) pay CGT on the gain on their
  shares (proceeds minus base cost/subscription price), not on the underlying property. 2026/27
  CGT rates on residential-property-adjacent gains are **18% basic, 24% higher**
  (`house_positions.md` §5, from 30 October 2024) — but note shares in a company are not
  themselves "residential property" for CGT rate purposes; **verify at write time** whether
  gains on shares in a property-investment company are taxed at the general (non-residential-
  property) CGT rates, which were ALSO aligned to 18%/24% from 30 October 2024 per
  `house_positions.md` §5 ("non-residential/commercial gains aligned to the same 18%/24% rates
  from 30 October 2024") — so for 2026/27 the practical rate outcome is the same 18%/24% either
  way, but the writer should state the mechanism correctly (share-gain CGT, general rates) not
  imply property-rate CGT applies directly to the shares.
- **BADR on a share sale — rarely available.** BADR requires the company to meet the trading-
  company test broadly (s.165A-style test referenced in `house_positions.md` line 4042-4044 in
  the context of MVLs); a pure buy-to-let rental SPV is very unlikely to qualify as it is an
  investment company, not a trading company. Where it does apply (genuine trading activity,
  correctly structured), the rate is **18% from 6 April 2026** (was 14% from 6 April 2025, 10%
  before) per `house_positions.md` BADR ground truth. State this as the rare exception, not the
  norm — do not imply a standard rental SPV seller gets BADR.
- **Buyer inherits latent gains.** On a share sale, the buyer acquires the company with its
  existing (lower) base cost in the property — if the buyer later sells the property (or the
  company does), Corporation Tax is due on the full gain from the ORIGINAL base cost, not from
  the price the buyer just paid for the shares. Buyers price this in by discounting their offer
  for the "latent" (built-in but not yet crystallised) CGT/CT liability they are inheriting —
  this is the seller's central negotiating friction on a share sale and the reason
  `pre-sale-extraction-strip-cash-before-spv-share-sale-vs-buyer-discount` exists as a
  dedicated mechanics page (link out, do not repeat its numbers).
- **Stamp duty on shares — 0.5%. VERIFIED AT SOURCE 2026-09-01** against gov.uk
  https://www.gov.uk/tax-buy-shares. The rate is **0.5% of the consideration paid** on most
  share transactions, charged as Stamp Duty Reserve Tax (SDRT) on electronic transfers and as
  Stamp Duty on paper Stock Transfer Forms. Two details the writer must get right and most
  competitor content gets wrong:
  - On **paper stock transfer forms**, Stamp Duty applies only where the consideration
    **exceeds £1,000**; transfers at or below £1,000 on a stock transfer form are not charged.
    Irrelevant to a real SPV share sale (consideration will be far above £1,000) but state it
    correctly if the FAQ touches small transfers.
  - The 1.5% rate exists but applies only to transfers into depositary receipt schemes or
    clearance services — **not** to a private SPV share sale. Do not mention it except to rule
    it out if a reader asks.

  This is materially cheaper for the buyer than SDLT on a direct property purchase (which, for
  a company buyer, attracts the residential SDLT bands plus the 5% additional-dwellings
  surcharge, and the 17% flat rate above £500,000 for a non-natural person absent a qualifying
  relief, per `house_positions.md` §1). `house_positions.md` still carries no locked row on the
  0.5% share rate, so cite it as verified at source on 2026-09-01 rather than as a house
  position; the gate review has done the verification, the writer does not need to repeat it.
- **Asset sale — company pays Corporation Tax on the gain, then an extraction layer.** If
  instead the company sells the PROPERTY itself (rather than the shareholders selling their
  shares), the company pays Corporation Tax on its gain (19% small-profits rate / 25% main rate
  with marginal relief between £50,000 and £250,000 profits — the standard CT rate structure
  used elsewhere in the SPV programme, e.g. U27's facts pack). The company then holds cash,
  which the shareholders must extract (dividend, MVL, or continued trading) — a SECOND layer of
  tax (dividend tax at 2026/27 rates of 10.75%/35.75%/39.35% above the £500 dividend allowance,
  or capital treatment on winding up) sits on top of the company-level CT. Get the strike-off
  cap right, it is newly locked ground truth: under **CTA 2010 s.1030A**, distributions made in
  anticipation of dissolution are treated as CAPITAL only if total distributions do not exceed
  **£25,000**; under **s.1030B**, if that £25,000 cap is exceeded the WHOLE amount becomes an
  income distribution, all-or-nothing, not just the excess. Above £25,000 of reserves, capital
  treatment needs a formal MVL with a licensed insolvency practitioner. `house_positions.md` §42
  (added 2026-09-01, verified legislation.gov.uk + gov.uk). **Never cite s.1013** for this — §42
  records that exact miscite reaching brief stage once already. State the cap in one or two
  sentences and link to the MVL and closing pages; do not build the CGT-vs-income analysis here
  (§5 MUST-NOT). This two-layer cost is the
  central reason share sales are usually preferred by sellers where a buyer will accept the
  latent-gain risk; state this trade-off plainly rather than presenting asset sale as a neutral
  alternative.
- **Buyer's-side incentive asymmetry (context, not the seller's tax position, but needed for
  the "why does the discount happen" explanation).** A buyer on an asset-sale route gets a
  stepped-up (current market value) base cost in the property going forward and avoids
  inheriting latent gains or any historical company liabilities/warranties risk — which is why
  buyers often prefer asset sales even though sellers prefer share sales, and why the price
  gap between the two routes reflects both the latent-gain discount AND this base-cost/risk
  asymmetry, not latent gain alone.

## 7. Interlink spec

Verify slugs on disk before linking (all confirmed present at brief-writing time; SSE pair
carries a live redirect-risk flag, re-verify both at publish time — see §5):
- `substantial-shareholding-exemption-property-companies` — CONFIRMED ON DISK.
- `substantial-shareholding-exemption-sse` — CONFIRMED ON DISK, but flagged in
  `house_positions.md` line 3843 as carrying a deferred redirect-vs-proceed decision; re-verify
  both slugs are still live and distinct immediately before publishing this page.
- `pre-sale-extraction-strip-cash-before-spv-share-sale-vs-buyer-discount` — CONFIRMED ON DISK.
  Owns the cash-stripping mechanics; link, do not repeat.
- `mvl-members-voluntary-liquidation-property-company-cgt-vs-income-treatment` — CONFIRMED ON
  DISK. Owns the final-distribution tax analysis for the asset-sale-then-wind-up path.
- `how-to-close-a-property-limited-company` — CONFIRMED ON DISK. Owns closing-route mechanics
  for the same path.
- **Up-link (required):** `/spv-company` (U01 pillar; route VERIFIED ON DISK 2026-09-01 at `Property/web/src/app/spv-company/page.tsx`, so the path is `/spv-company` at the site root, NOT under `/services/` — the link target is safe to write now, the U01 rewrite does not move it) — hub navigation, HUB 5
  selling-closing, alongside `how-to-close-a-property-limited-company` (U34).
- **Sibling cross-link:** U34's own brief already reserves a cross-link back to this page once
  it ships (see `U34-how-to-close-a-property-limited-company.md` §7) — this page should link
  back to U34 for readers whose share/asset-sale decision resolves into "actually I just want
  to close the company", completing the pair.

## 8. Editorial conventions (hard rules)

£nnn always (never "£nnn.00", never a bare number for currency); "per cent" in prose, % only in
tables; hyphenated compounds (share-sale route, asset-sale route, latent-gain discount,
property-rich company, base-cost step-up); sentence-case H2s; no em-dashes anywhere in the copy;
no templated second paragraph (do not open with a rephrased restatement of the H1, the pattern
Wave 1 QA flagged across multiple posts); every FAQ answer distinct in substance, not a
rephrasing of a body section; no build or pipeline narration in the copy ("verify at build",
inline "(HP42)" codes, "as covered above in section 5"); every citation either verified against
`house_positions.md` or explicitly flagged for the factual QA pass.

## 9. Fresh outline

**H1:** Selling a property SPV: share sale vs asset sale

**H2 skeleton (from the variant list):**
1. Sell the company or sell the property? The decision in one table (verdict-up-top)
2. Share sale: CGT on the shares, not the property (mechanics, 2026/27 rates)
3. Why BADR rarely helps here (the trading-company test, honest reality check, link to MVL/BADR
   detail where relevant)
4. The buyer's problem: inheriting latent gains, and the discount they'll ask for (2-4 sentence
   summary, link to the pre-sale-extraction page for the mechanics)
5. Stamp duty on shares: 0.5% vs SDLT on a direct property purchase (the buyer-side saving that
   funds part of the negotiation room)
6. Asset sale: Corporation Tax on the company's gain, then extraction (dividend or MVL) as a
   second layer
7. An honest SSE reality check: when substantial shareholding exemption could apply (rare for a
   rental SPV) — 2-4 sentences, link out
8. Why buyers often prefer asset sales and sellers often prefer share sales (the base-cost and
   risk asymmetry)
9. Comparison table: share sale vs asset sale (who pays what tax, at what rate, buyer's
   inherited risk, typical price adjustment, complexity/legal cost)
10. Worked example: a single-property SPV bought for £250,000 five years ago, now worth
    £400,000, sold via (a) share sale with a latent-gain discount negotiated into the price and
    (b) asset sale with company CT then a dividend extraction, showing the net-to-seller figure
    under each route
11. FAQ (10-14 entries): selling an spv, sale of spv, property spv for sale, sell the company or
    sell the property, share sale vs asset sale property company, sale of property rich
    company, what discount will a buyer want for latent cgt, spv sale stamp duty, do property
    developers set up a company and then sell and claim sse, is this the same as selling my
    house to my own limited company (explicit disambiguation from the U36 trap family), what
    happens to an existing company mortgage on a share sale, do I need a solicitor for a share
    sale, how long does an spv share sale take, can I sell just some of the shares.
