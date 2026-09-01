# U19 — incorporating-property-portfolio-uk-2026

## 1. Unit facts

- Verdict: **EXTEND — FULL DE-CONFLICT REWRITE**
- Slug: `incorporating-property-portfolio-uk-2026`
- Category: keep current (**Incorporation & Company Structures**)
- Priority: **P1** (promoted from P2 — moved into Wave 1 alongside U17 so both sides of the collision are rewritten in the same wave; leaving U19 untouched for a wave would briefly worsen the overlap once U17 gives up its deep blocks)
- Hub: transfer-in (Hub 3)

## 2. Dominant query + variant skeleton

**Dominant query (owns the H1): "incorporating a property portfolio step by step"** — action form.

| Variant | Type | Our data |
|---|---|---|
| incorporating a property portfolio step by step | action (dominant, owns H1) | page_map dominant query — no isolated GSC/Bing row found under this exact string; treat as the anchor phrase for the H1/title, supported by the variants below |
| step by step portfolio incorporation 2026 | action | page_map variant |
| what order do i incorporate properties in | question | page_map variant — directly answered by the 8-step sequence this page owns |
| incorporation process timeline uk landlord | conversational | page_map variant |
| cheapest way to incorporate "property" | cost | Bing, pos **1.0**, 7 impr, 0 clicks, already landing here — protect |
| how to incorporate my property portfolio | action | mined from questions_corpus.csv near-duplicate cluster ("transfer property to limited company" family uses "how to" phrasing extensively); treat as a direct FAQ synonym of the dominant query |
| steps to transfer portfolio to limited company | action | mined variant, no isolated volume row; FAQ-level coverage |
| how do i move my whole portfolio into a company | question | page_map variant shared with U17 — U19 answers with the linear sequence; U17 answers with the phased alternative (cross-link both directions) |
| how to transfer properties in own name into a limited company without paying stamp duty and capital gains tax | question | Bing, pos 2.0, 28 impr, 0 clicks — this page's Step 3/Step 4 (the two charges + SDLT route) directly answers this |
| what is the stamp duty if i set up a company to buy an investment property | question | Bing, pos 5.0, 24 impr, 0 clicks — supports Step 4 |
| stamp duty land tax incorporating a partnership uk | action | Bing, pos 10.0, 16 impr, 0 clicks — supports the Sch 15 depth this page keeps (see §5) |
| transferring properties from a partnership to a company how to avoid stamp duty | action | Bing, pos 10.0, 16 impr, 0 clicks — same |
| yes (demerger illustrative example: incorporate two subsidiaries, allocate properties) | AI/conversational | Bing, pos 1.0, 7 impr, 0 clicks, landing here under `tax rates in company` bucket — a multi-owner demerger tangent, not core; a one-paragraph acknowledgement plus link to a dedicated demerger page is enough, do not build this page around it |

FAQ block (10-14) must include: "what order do I incorporate properties in", "how long does it take to incorporate a property portfolio", "how much does it cost to incorporate a property portfolio in 2026" (CH fee figures, §6), "do I need a solicitor and an accountant or can I do this myself", "what happens to my mortgages when I incorporate", "do I pay stamp duty twice on incorporation" (short answer + link to U18 for the full treatment).

## 3. Our-data baseline

- No isolated GSC row was found for the exact dominant phrase "incorporating a property portfolio step by step" — the page currently earns its traffic through adjacent Bing long-tail queries (below), not a single head term at a measured position. Treat the on-page optimisation as anchored on-page/title work rather than a position to chase.
- `cheapest way to incorporate "property"` — Bing pos **1.0**, 7 impr, 0 clicks — already ranking #1, correctly landing on this page. Protect this; do not let the cost-framing intent drift onto U03 (`spv-company-formation-cost-uk`, the year-one setup cost page) or `property-company-running-costs-annual-budget` (annual run rate) — this page's cost mention should stay scoped to portfolio-incorporation cost specifically (CH fees, professional fees, SDLT/CGT), not become a general cost explainer.
- `how to transfer properties in own name into a limited company without paying stamp duty and capital gains tax` — Bing pos 2.0, 28 impr, 0 clicks.
- `what is the stamp duty if i set up a company to buy an investment property` — Bing pos 5.0, 24 impr, 0 clicks.
- `stamp duty land tax incorporating a partnership uk` / `transferring properties from a partnership to a company how to avoid stamp duty` — Bing pos 10.0, 16 impr each, 0 clicks.
- The illustrative multi-owner demerger example (long verbatim Bing query, "yes. below is a simplified example...") — pos 1.0, 7 impr, 0 clicks, tagged `tax rates in company`, currently landing here. Low-priority signal; acknowledge briefly, do not build a section around it (out of scope — single-portfolio incorporation, not a demerger).

## 4. Competitor coverage floor

- mfbrokers.co.uk — `resources/blogs/6-top-tips-for-your-incorporation-process`
- mfbrokers.co.uk — `resources/case-studies/incorporation-of-2-8-million-portfolio`
- mfbrokers.co.uk — `resources/blogs/btl-incorporation-and-landlord-tax-qa`
- propertyspv.co.uk — `a-complete-guide-on-incorporating-a-new-company-in-uk/`
- provestor.co.uk — `propertytaxshow/llps-partnerships-incorporation`
- uklandlordtax.co.uk — `tax-guide/project-blue-and-incorporating-a-partnership-to-save-stamp-duty-land-tax-sdlt/`

## 5. Seam warnings — MUST-NOT rules

**U19 vs U17 (`incorporation-existing-portfolios-phased-approach`) — the core seam for this page, mirror of U17's brief.**

Confirmed by the completed read-the-page check: the two portfolio pages currently collide on ~70% of their sections (s.162 mechanics, SDLT surcharge, six-dwellings rule, Schedule 15 partnership route, refinancing/personal guarantees, MTD, DLA/extraction, April 2027 rate change). Both pages are rewritten in this same wave specifically so neither side is left holding stale overlap.

Binding de-conflict for this rewrite:

- **U19 OWNS the single-portfolio linear execution sequence**, unchanged in structure from the current 8-step build but rewritten for depth and 2026/27 currency: map the portfolio and the latent tax → test the s.162 business threshold → understand the two charges (CGT + SDLT) → model the SDLT route and choose it → arrange finance/lender consents → form the company and set up the DLA → transfer the properties and file → switch onto company compliance. Keep the `howToSteps` schema block and the worked example (currently a 3-flats example) — expand the worked example with current 2026/27 figures if it needs refreshing, but the linear single-portfolio walkthrough with real numbers is this page's unique, page-defining asset.
- **U19 MUST NOT build out**: phasing rationale (why spread disposals over 2-4 tax years), long-term mixed personal-and-company structure management, or exit planning before incorporating. Those are U17's owned content. Where the linear sequence naturally raises "should I do this all at once or spread it," give a **one-line caveat** ("landlords with larger or higher-gain portfolios often spread this over multiple tax years — see our phased incorporation guide") **plus a link** to `incorporation-existing-portfolios-phased-approach`. Do not expand this into its own section.
- **U19 KEEPS the deep technical blocks** that U17 compressed to summary-plus-link in its own rewrite: the full s.162 business-test detail, the full SDLT market-value/connected-party mechanics, and the full Schedule 15 partnership/SLP mechanics belong here at full depth (Step 2, Step 3, Step 4 respectively). U17 now only summarises these and links back to this page — so this page's depth is load-bearing for the whole cluster, not optional.
- **Never merge or redirect U19 and U17.** House rule, PAGE_MAP.md §9.2.

**Also respect the wider hub protections, same as U17/U18/U20:**

- Never compete with the two PROTECTED transfer pages: `sdlt-transfer-property-company-cost`, `how-to-transfer-property-into-limited-company-uk` (both ranking 1.5-3.9). Where this page's Step 3/Step 4 need the base SDLT rate tables, link to `sdlt-transfer-property-company-cost` for the definitive rate walkthrough rather than maintaining a second copy of the bands — this page's job is the *sequence and decision*, not being the canonical rate-table source.
- U18 (`sdlt-incorporation-stamp-duty-twice`) owns the double-charge/relief *framing* as a standalone question; U19's Step 3/Step 4 can and should carry the full mechanics (that's the point of U19 keeping the deep blocks per above) but should frame it inside the step sequence, not as a "do I pay stamp duty twice" FAQ-style treatment — link to U18 for that specific framing.
- U20 (`incorporate-rental-property-without-cgt`) owns the CGT-relief *outcome* framing ("can I avoid CGT"); U19's Step 2/Step 3 carry the s.162 mechanics inside the sequence (consistent with U19 keeping the deep block), but should not try to independently answer "should I / does it apply to me" as a decision page — that's U20's job, link to it for the decision-framing content.

## 6. Facts pack (verify each against `docs/property/house_positions.md`; flag any conflict)

Same base facts pack as U17, plus the additions below.

- **Property income tax reducer rises to the property basic rate of 22% from 6 April 2027** (FA 2026 Sch 1, amends ITTOIA 2005 ss.274AA/274C and ITA 2007 s.399B; FA 2026 enacted 18 March 2026). 20% applies for 2026/27 and earlier. — confirmed house_positions.md lines ~197, ~253-257. Relevant to this page's existing "What April 2027 does to the incorporation case" section.
- **s.162 TCGA 1992 incorporation relief must be positively claimed for transfers on or after 6 April 2026** (the s.162A disapplication-election mechanic was repealed). — confirmed line ~228.
- **SDLT company/additional-dwellings surcharge is 5%**, since 31 October 2024, stacked on standard bands. — confirmed §1 house_positions.md.
- **Connected-party transfers are charged SDLT on market value — s.53 FA 2003.** — confirmed §1.
- **CGT residential rates: 18% basic, 24% higher**, from 30 October 2024. Do not write 28%. — confirmed line ~209, ~228.
- **Dividend rates 2026/27: 10.75% basic, 35.75% higher, 39.35% additional**, £500 allowance. — confirmed line ~1206.
- **Corporation tax: 19% small profits (≤£50k), 25% main (≥£250k), marginal relief taper to ~26.5% effective (£50k-£250k).** Unchanged from 2025/26 for 2026/27. — confirmed line ~1204.
- **Multiple Dwellings Relief was abolished 1 June 2024** (Finance (No.2) Act 2024) — must not be cited as available.
- **Genuine partnership incorporation route — FA 2003 Sch 15 para 18**: chargeable consideration = market value × (1 − SLP%); 100% SLP = zero SDLT. Requires a real, pre-existing letting partnership; scrutinised under s.75A Ramsay if contrived. HMRC manual anchor SDLTM33500+, not SDLTM09050+ (that's the general Ramsay anti-avoidance manual). — confirmed house_positions.md §1.A.
- **Six-dwellings rule (s.116(7) FA 2003):** six or more dwellings in a single transaction are automatically non-residential for SDLT (0%/2%/5% bands, no surcharge), a statutory deeming, no election. Relevant to Step 4 for larger portfolios.
- **Companies House incorporation fees (verified gov.uk 2026-09-01): GBP 100 online / GBP 124 paper.** Confirmation statement fee: **GBP 50**. Use these for Step 6 ("Form the company") and any cost-summary/FAQ entry on "how much does it cost to incorporate." If the current live file cites older or different figures, correct them.
- **Strike-off / closure ground truth now lives in `docs/property/house_positions.md` §29** ("Closing a property company — strike-off / distributions / MVL boundary," added 2026-09-01): informal strike-off distribution cap under **CTA 2010 s.1030A**; voluntary strike-off (form DS01) fee **GBP 13 online / GBP 18 paper**. This page's Step 8 ("Switch onto company compliance") should not cover closure in depth — if closure is mentioned at all (e.g., "what if I later want to unwind this"), it must be a one-line pointer to `how-to-close-a-property-limited-company`, sourced from §29, not a restated closure mechanic. Do not confuse this with the earlier, unrelated §29 VAT-cluster heading elsewhere in the same file — the closure lock is the one dated 2026-09-01.

No conflicts found between the above and house_positions.md at review time. Flag rather than guess if the writer finds a discrepancy, particularly on the CH fee figures which are dated to 2026-09-01 and may move.

## 7. Interlink spec

**Existing slugs — verified present on disk in `Property/web/content/blog/`:**

- `incorporation-existing-portfolios-phased-approach` (U17 — phasing/mixed-structure/exit angle; sibling brief, both in Wave 1)
- `sdlt-incorporation-stamp-duty-twice` (U18 — double-charge/relief framing; sibling brief)
- `incorporate-rental-property-without-cgt` (U20 — CGT-relief outcome/decision framing; sibling brief)
- `section-162-incorporation-relief-property-landlords` (statutory-test cross-reference; this page carries mechanics inline but can still link for the canonical statutory writeup)
- `sdlt-transfer-property-company-cost` (PROTECTED — link for the definitive SDLT rate table, never duplicate)
- `how-to-transfer-property-into-limited-company-uk` (PROTECTED — link only, never restate)
- `how-to-close-a-property-limited-company` — **verify this slug exists on disk before citing it**; if not yet published, note as Wave-1 sibling (see below) and link once live.

**Wave-1 siblings that will exist (link forward once live; note as TBD if not yet published):**

- `/spv-company` (pillar)
- `spv-company-formation-cost-uk`
- `limited-company-buy-to-let-allowable-expenses`
- `how-to-close-a-property-limited-company`

## 8. Current-file outline: what changes vs. stays

Current H2s / `howToSteps` (from live file, `Property/web/content/blog/incorporating-property-portfolio-uk-2026.md`):

| Current H2 | Verdict | Why |
|---|---|---|
| Incorporating a property portfolio in the UK: what this guide assumes | **KEEP, tighten** | Good scoping intro; add one sentence distinguishing this page (linear, single-run) from the phased guide, with the link per §5 |
| Step 1: Map the portfolio and the latent tax | **KEEP** | Core to the owned linear sequence |
| Step 2: Test whether HMRC will treat your lettings as a business | **KEEP, expand to full depth** | Now the canonical s.162 business-test depth for the cluster since U17 compressed its version — expand with the case-law/worked detail U17 dropped |
| Step 3: Understand the two charges incorporation triggers | **KEEP, expand to full depth** | Now the canonical CGT+SDLT dual-charge mechanics for the cluster — expand with market-value/s.53 detail U17 dropped |
| Step 4: Model the SDLT and choose the transfer route | **KEEP, expand to full depth** | Now the canonical Schedule 15/SLP partnership-route mechanics for the cluster — expand with the SLP formula and worked numbers U17 dropped; also directly answers the two 16-impression partnership Bing variants in §2 |
| Step 5: Arrange company finance before you move anything | **KEEP** | Core sequence step; keep concise, link to Track B (spv-mortgages-explained etc.) for mortgage-product depth rather than expanding here |
| Step 6: Form the company and set up the director's loan account | **KEEP, correct fees** | Update Companies House incorporation fee to **GBP 100 online / GBP 124 paper** and confirmation statement to **GBP 50** per §6 if the current figures differ |
| Step 7: Transfer the properties and file | **KEEP** | Core sequence step |
| Step 8: Switch onto company compliance | **KEEP, trim any closure content** | If it currently touches winding-up/closure, trim to a one-line pointer to `how-to-close-a-property-limited-company` sourced from house_positions.md §29, per §6 — do not add closure depth here |
| What April 2027 does to the incorporation case | **KEEP, verify rates current** | Confirm 22% reducer figure is stated correctly per §6 |
| Common mistakes when incorporating a portfolio | **KEEP, expand** | Good FAQ-adjacent content; expand with mistakes specific to the SDLT-route choice and CH filing (fee errors, missed confirmation statement) |
| Where to get the numbers right | **KEEP** | Standard CTA section |
| **ADD** | Explicit one-line phasing caveat + link to U17 near Step 1 or in the intro, per §5 | Required — this is the mechanism that prevents the page from silently re-absorbing U17's territory |
| **ADD** | FAQ 10-14 per §2, including the CH-fee cost question and the "do I pay stamp duty twice" short-answer-plus-link | Required |
| **ADD/REFRESH** | Worked example (currently 3 flats) — confirm figures are 2026/27-current (CGT 18/24%, SDLT 5% surcharge, dividend rates if extraction is shown) | Required by full-overhaul rule |
| **KEEP** | `howToSteps` schema | This is U19's alone in the cluster — U17 must not carry a competing `howToSteps` block |
| **DROP** | Any standalone treatment of the multi-owner demerger scenario (the long illustrative Bing query in §2) | Out of scope for single-portfolio incorporation; one-paragraph acknowledgement plus link if a demerger page exists is sufficient |

**Full overhaul rule:** dominant-query intent (linear step-by-step single-portfolio incorporation) owns the H1. Comparison/decision table is not this page's job (U17 owns strategy comparison) — instead: a clear numbered sequence, worked example with real 2026/27 figures, FAQ 10-14, depth = full, with the s.162/SDLT/Schedule 15 technical blocks now carried here at full depth per §5.
