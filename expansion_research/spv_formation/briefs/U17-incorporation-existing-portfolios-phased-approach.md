# U17 — incorporation-existing-portfolios-phased-approach

## 1. Unit facts

- Verdict: **EXTEND — FULL REWRITE**
- Slug: `incorporation-existing-portfolios-phased-approach`
- Category: keep current (**Incorporation & Company Structures**)
- Priority: **P1**
- Hub: transfer-in (Hub 3)

## 2. Dominant query + variant skeleton

**Dominant query (owns the H1): "landlord portfolio incorporation uk"** — action form.

Every variant below must land as an H2 or FAQ entry, in the user's own words.

| Variant | Type | Our data |
|---|---|---|
| landlord portfolio incorporation uk | action (dominant, owns H1) | GSC, pos **52.6**, 213 impr, 0 clicks |
| incorporating a property portfolio uk | action | GSC, pos **46.6**, 181 impr, 0 clicks |
| portfolio incorporation guidance | conversational | GSC, pos 37.4, 25 impr, 0 clicks; also Bing pos 1.5, 12 impr, 0 clicks |
| property portfolio incorporation services | action | GSC, pos 41.8, 5 impr, 0 clicks |
| incorporating a property portfolio into a business | action | Bing, pos 2.0, 12 impr, 3 clicks |
| how do i move my whole portfolio into a company | question | page_map variant, no isolated volume row found |
| phased incorporation of a rental portfolio | action | page_map variant — this is the dominant-intent phrasing the page must own outright |
| can i incorporate some properties and not others | question | page_map variant — partial-portfolio angle, core to this page |
| portfolio incorporation cost uk | cost | page_map variant |
| should i incorporate my portfolio all at once | conversational | page_map variant — direct answer: no, sequence it |
| cheapest way to incorporate "property" | cost | Bing, pos 1.0, 7 impr, 0 clicks — currently landing on **U19** (incorporating-property-portfolio-uk-2026); this page should also carry a cost-framing H2 since it owns the phased/cheaper-over-time argument |

FAQ block (10-14 entries) must include the question-form and conversational-form variants above verbatim or near-verbatim as questions, plus: "how long should a phased incorporation take", "do I need to incorporate everything at once", "can I incorporate one property first and see how it goes".

## 3. Our-data baseline

- `landlord portfolio incorporation uk` — GSC pos **52.6**, 213 impressions, 0 clicks.
- `incorporating a property portfolio uk` — GSC pos **46.6**, 181 impressions, 0 clicks.
- `portfolio incorporation guidance` — GSC pos 37.4 (25 impr) / Bing pos 1.5 (12 impr, 0 clicks).
- `property portfolio incorporation services` — GSC pos 41.8, 5 impr, 0 clicks.
- `incorporating a property portfolio into a business` — Bing pos 2.0, 12 impr, **3 clicks** (already converting on Bing — protect this).
- Zero clicks on every head query despite hundreds of impressions: the page exists but does not compete. This is the rewrite's entire justification.

## 4. Competitor coverage floor

- mfbrokers.co.uk — `resources/case-studies/incorporation-of-2-8-million-portfolio` (phased/large-portfolio case study angle)
- mfbrokers.co.uk — `resources/news-and-insights/10-most-asked-questions-about-incorporating-a-buy-to-let-portfolio`
- mfbrokers.co.uk — `resources/blogs/the-costs-and-risks-of-incorporation`
- mfbrokers.co.uk — `resources/blogs/is-incorporation-the-right-move`
- mfbrokers.co.uk — `resources/blogs/6-top-tips-for-your-incorporation-process`
- propertyspv.co.uk — `dont-get-left-behind-use-multiple-spvs-to-dominate-your-property-portfolio`

## 5. Seam warnings — MUST-NOT rules

**U17 vs U19 (`incorporating-property-portfolio-uk-2026`) — the core seam for this page.**

A Wave 0 read-the-page check on the live U19 page has been completed and found the two portfolio pages currently **collide on ~70% of their sections** — both cover s.162 mechanics, the SDLT surcharge, the six-dwellings rule, the Schedule 15 partnership route, refinancing/personal guarantees, MTD, DLA/extraction, and the April 2027 rate change. This is the live cannibalisation the rewrite must fix.

Binding de-conflict for this rewrite:

- **U17 OWNS:** why and when to spread disposals across tax years; the multi-year CGT-spreading worked example (using more than one annual CGT exempt amount, sequencing gains against income); running a mixed personal-and-company structure for an extended period (some properties in, some still personal); planning the eventual exit *before* incorporating anything.
- **U17 MUST NOT** restate the linear Step 1-8 how-to-incorporate checklist or a `howToSteps` schema block — that belongs to U19. Where the mechanical steps are needed, link to `incorporating-property-portfolio-uk-2026` rather than repeating them.
- **U17 MUST NOT** carry the full s.162 statutory test, the full SDLT/Schedule 15 mechanics, or the full six-dwellings rule as standalone deep sections. Compress each of these to a short summary (2-4 sentences) plus a link out to the page that owns the depth: s.162 detail → `section-162-incorporation-relief-property-landlords`; SDLT mechanics → `sdlt-incorporation-stamp-duty-twice` (this brief's sibling, U18); Schedule 15 partnership detail → `sdlt-incorporation-stamp-duty-twice` or `partnership-sdlt-relief-schedule-15-fa-2003-incorporation-sum-lower-proportions` (VERIFIED PRESENT on disk 2026-09-01).
- U19's own de-conflict (its Wave 2 rewrite) is the mirror image — it keeps the deep technical blocks until then. Do not pre-empt U19's rewrite by stripping content from it; this brief only governs U17.
- **Never merge or redirect U17 and U19.** House rule, stated in PAGE_MAP.md §9.2.

**Never compete with the two PROTECTED transfer pages** (`sdlt-transfer-property-company-cost`, `how-to-transfer-property-into-limited-company-uk`, both ranking 1.5-3.9). Any mention of "how much SDLT will I pay" or the connected-party charge mechanics must be a short pointer, never a restated answer.

## 6. Facts pack (verify each against `docs/property/house_positions.md`; flag any conflict)

- **Property income tax reducer rises to the property basic rate of 22% from 6 April 2027** (FA 2026 Sch 1, amends ITTOIA 2005 ss.274AA/274C and ITA 2007 s.399B; FA 2026 enacted 18 March 2026). For 2026/27 the reducer is still 20%. A basic-rate landlord sees no new wedge in 2027/28; a higher/additional-rate landlord's relief rises 20%→22% but the wedge versus their 42%/47% rate does not widen. — confirmed at house_positions.md line ~197, ~253-257.
- **s.162 TCGA 1992 incorporation relief requires a positive claim for transfers on or after 6 April 2026** (the prior s.162A disapplication-election mechanic is gone; do not write "automatic" for post-6-April-2026 transfers). — confirmed line ~228.
- **SDLT company/additional-dwellings surcharge is 5%**, in force since 31 October 2024, stacked on top of standard bands. — confirmed §1 of house_positions.md.
- **Connected-party transfers are charged SDLT on market value** — s.53 FA 2003 deems the transfer to happen at market value where buyer and seller are connected (a wholly-owned NewCo is connected to its owner). — confirmed (used verbatim in the U18 sibling page's existing FAQ; cross-check against house_positions.md §1).
- **CGT residential rates: 18% basic rate, 24% higher rate**, in force from 30 October 2024 (Autumn Budget 2024). Do not write 28% — that rate ended 30 October 2024. — confirmed house_positions.md line ~209 and the "Do not write" block at ~228.
- **Dividend rates 2026/27: 10.75% basic, 35.75% higher, 39.35% additional** (£500 dividend allowance), rates raised 2pp on basic/higher from 6 April 2026; additional unchanged. — confirmed house_positions.md line ~1206.
- **Corporation tax: 19% small profits rate (≤£50k profits), 25% main rate (≥£250k profits), marginal relief tapered 26.5% effective in the £50k-£250k band.** Unchanged from 2025/26 for 2026/27. — confirmed house_positions.md line ~1204.
- **Multiple Dwellings Relief was abolished 1 June 2024** (Finance (No.2) Act 2024) — if the current live page cites MDR as available, that is stale and must be corrected in the rewrite (the sibling U18 page already carries this correction).
- **Six-dwellings rule (s.116(7) FA 2003):** six or more dwellings in a single transaction are automatically treated as non-residential for SDLT (0%/2%/5% bands, no 5% surcharge) — a statutory deeming, not an election. Relevant to phasing decisions at volume; summarise only, link to U18/U19 for depth.

No conflicts found between the above and house_positions.md at review time. If the writer finds a conflict during drafting, flag it rather than guess.

## 7. Interlink spec

**Existing slugs — verified present on disk in `Property/web/content/blog/`:**

- `incorporating-property-portfolio-uk-2026` (U19 — linear step-by-step; de-conflict target, see §5)
- `sdlt-incorporation-stamp-duty-twice` (U18 — SDLT double-charge/relief page, sibling brief in this batch)
- `incorporate-rental-property-without-cgt` (U20 — s.162 outcome page, sibling brief in this batch)
- `section-162-incorporation-relief-property-landlords` (statutory-test depth page)
- `how-to-transfer-property-into-limited-company-uk` (PROTECTED — link only, never restate)
- `sdlt-transfer-property-company-cost` (PROTECTED — link only, never restate)

**Wave-1 siblings that will exist (link forward once live; note as TBD if not yet published):**

- `/spv-company` (pillar)
- `spv-company-formation-cost-uk`
- `limited-company-buy-to-let-allowable-expenses`
- `how-to-close-a-property-limited-company`

## 8. Current-file outline: what changes vs. stays

Current H2s (from live file, `Property/web/content/blog/incorporation-existing-portfolios-phased-approach.md`):

| Current H2 | Verdict | Why |
|---|---|---|
| Why a Phased Approach Makes Sense | **KEEP, expand** | Core framing; strengthen with the "should I incorporate all at once" conversational answer |
| The CGT Position on Transfer | **REWRITE** | Compress to summary; the deep multi-year CGT-spreading worked example (this page's unique value per §5) replaces the generic CGT explainer |
| Section 162 Incorporation Relief: The Key Question | **REWRITE → compress** | Cut to a short gate-check summary plus link to `incorporate-rental-property-without-cgt` / `section-162-incorporation-relief-property-landlords`; do not restate the statutory test |
| Stamp Duty Land Tax on Each Transfer | **REWRITE → compress** | Cut to a short summary plus link to `sdlt-incorporation-stamp-duty-twice`; do not restate Schedule 15 mechanics |
| The Income Tax Picture During the Transition | **KEEP** | Directly supports "mixed personal and company structure" ownership per §5 |
| Refinancing: The Practical Constraint | **KEEP, tighten** | Core to phasing logic; avoid drifting into full mortgage-product detail (Track B territory) |
| Running a Mixed Personal and Company Structure | **KEEP, expand** | This is a page-defining section per §5 — landlord runs both structures for years; deepen with a worked timeline |
| Planning the Eventual Exit Before You Incorporate | **KEEP, expand** | Page-defining section per §5 |
| How a Phased Incorporation Typically Sequences | **REWRITE** | Replace with the true H1 intent: multi-year cost/CGT-spreading table + timeline, NOT a numbered how-to-incorporate checklist (that's U19's `howToSteps`) |
| Where Professional Support Matters Most | **KEEP** | Standard CTA section |
| Related Reading | **REWRITE** | Update per §7 interlink spec |
| **ADD** | comparison table: incorporate-all-at-once vs. phased (cost, CGT exposure, admin, refinancing risk) | Required by full-overhaul rule |
| **ADD** | worked example with real 2026/27 figures: 4-6 property portfolio spread over 2-3 tax years using multiple CGT exempt amounts | Required by full-overhaul rule; this is the page's unique depth |
| **ADD** | FAQ 10-14 entries per §2 | Required |
| **DROP** | any numbered "Step 1... Step 8" linear incorporation checklist if present, and any `howToSteps` schema | Belongs to U19 only, per §5 |

**Full overhaul rule:** dominant-query intent ("landlord portfolio incorporation uk" / phased strategy) owns the H1. Comparison table, worked examples with real figures, FAQ 10-14, depth = full.
