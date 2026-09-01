# U20 — incorporate-rental-property-without-cgt

## 1. Unit facts

- Verdict: **EXTEND — FULL REWRITE**
- Slug: `incorporate-rental-property-without-cgt`
- Category: keep current (**Incorporation & Company Structures**)
- Priority: **P1**
- Hub: transfer-in (Hub 3)

## 2. Dominant query + variant skeleton

**Dominant query (owns the H1): "property incorporation capital gains tax"** — action/conversational form. This query is **currently mis-landing on the transfer page** (`how-to-transfer-property-into-limited-company-uk`) at position 70.3; this rewrite must claim it here.

| Variant | Type | Our data |
|---|---|---|
| property incorporation capital gains tax | action (dominant, owns H1) | GSC, pos **70.3**, 140 impr, 0 clicks — currently mis-assigned to the transfer page |
| cgt on transfer of property to limited company | question | page_map variant |
| transferring property to limited company cgt | action | page_map variant; Bing "transferring property to limited company cgt" not directly present, but "how to transfer properties in own name into a lmited company without paying stamp duty and capital gains tax" Bing pos 2.0, 28 impr |
| how to avoid capital gains tax transferring to a company | question/action | page_map variant — near-duplicate of the H1 intent, must be an explicit FAQ |
| does incorporation relief apply to landlords | question | page_map variant; also "hmrc incorporation relief landlord rules" GSC pos 10.5, 24 impr — this page owns that already |
| section 162 relief property business test | action | page_map variant — the STATUTORY TEST itself belongs to `section-162-incorporation-relief-property-landlords`, not here (see §5); this page only needs to gesture at "is my letting a business" as a gate, then link out |
| incorporation relief property business | conversational | Bing, pos 5.8, 68 impr, 0 clicks |
| incorporation relief for property business | conversational | Bing, pos 4.0, 51 impr, 0 clicks |
| incorporation relief commercial building to a ltd | action | Bing, pos 3.0, 72 impr, 0 clicks |
| can incorporation relief be used to transfer property | question | Bing, pos 7.0, 36 impr, 0 clicks |
| transfer property into limited company without triggering double capital gains incorporation relief uk | question | Bing, pos 8.0, 34 impr, 0 clicks |
| can you get incorporation relief on properties going into an existing company | question | Bing, pos 6.0, 34 impr, 0 clicks — important: answer this (existing company vs newco) explicitly |
| how to use incorporation relief for property transfer to limited company | action | Bing, pos 7.0, 18 impr, 0 clicks |
| incorporation relief on transfer of property portfolio to limited company | action | Bing, pos 3.0, 14 impr, 14 clicks (already converting) |
| do you pay capital gains tax on sale of home through ltd company | conversational | Bing, pos 7.0, 3 impr, 3 clicks |
| s162 incorporation relief leeds / bradford / dewsbury / horsforth | local-conversational | GSC, pos 40.9 / 43.0 / 47.5 / 49.0 — low volume (1-7 impr each) but recurring local-intent pattern; one FAQ or line acknowledging "wherever in the UK you're based" suffices, no need for location pages |

FAQ block (10-14) must include: "does incorporation relief apply to landlords", "can I use incorporation relief on properties going into an existing company (not just a new one)", "how do I avoid CGT when transferring rental property to a company", "is my rental portfolio a 'business' for incorporation relief purposes", "do I still pay CGT eventually if I use incorporation relief", "does incorporation relief cover stamp duty too" (answer: no, cross-link U18).

## 3. Our-data baseline

- `property incorporation capital gains tax` — GSC pos **70.3**, 140 impressions, 0 clicks, **currently landing on the transfer page** (`how-to-transfer-property-into-limited-company-uk`). Claiming this query onto the correct page is this rewrite's central job.
- `hmrc incorporation relief landlord rules` — GSC pos 10.5, 24 impr, 0 clicks, already correctly landing on this page.
- `s162 incorporation relief leeds/bradford/dewsbury/horsforth` — GSC pos 40.9-49.0, 1-7 impr each; mixed landing (some on this page, some on `section-162-incorporation-relief-property-landlords`, one on `buy-to-let-limited-company-complete-guide-uk`) — low priority, do not chase.
- `incorporation relief on transfer of property portfolio to limited company` — Bing pos 3.0, 14 impr, **14 clicks** — fully converting; protect this framing (portfolio-scale incorporation relief).
- `incorporation relief property business` / `incorporation relief for property business` — Bing pos 4.0-5.8, 51-68 impr, 0 clicks — high-impression, unconverted; strong candidates for explicit H2/FAQ coverage.
- `incorporation relief commercial building to a ltd` — Bing pos 3.0, 72 impr, 0 clicks — highest-impression variant; the page should make clear incorporation relief applies to commercial as well as residential lettings where the business test is met.

## 4. Competitor coverage floor

- mfbrokers.co.uk — `resources/blogs/introduction-to-ltd-incorporation-relief`
- taxqube.co.uk — `can-i-avoid-paying-capital-gains-tax-on-my-investment-property/`
- provestor.co.uk — `help/property-taxes/capital-gains-tax-residential-property`
- taxd.co.uk — `blog/how-to-avoid-capital-gains-tax-uk/`
- taxd.co.uk — `taxdpedia/category/capital-gains-tax-cgt`

## 5. Seam warnings — MUST-NOT rules

**U20 vs `section-162-incorporation-relief-property-landlords` — the core seam for this page.**

- **U20 owns the OUTCOME**: can I avoid/defer CGT when incorporating, does it apply to me, what does and doesn't it cover, the practical worked picture. This is the query-facing, decision-facing page.
- `section-162-incorporation-relief-property-landlords` **owns the statutory test**: the detailed legal conditions (business test case law, share-consideration mechanics, apportionment rules). **Never restate the statutory test in depth on this page — link it.**
- Where the business test needs to appear here (it does — "the business test: the hurdle most landlords trip on" is a page-defining current H2), keep it at the level of "here's the test and why most landlords fail it" with a worked example, not a clause-by-clause legal breakdown. The clause-by-clause depth is the other page's job.

**Also respect:**

- **Incorporation relief is a CGT relief only — it does not touch SDLT.** This page must state that clearly and link to `sdlt-incorporation-stamp-duty-twice` (U18, sibling brief) for the SDLT side. Never let this page imply incorporation relief reduces or removes the SDLT charge.
- The phased/partial-portfolio strategy angle belongs to `incorporation-existing-portfolios-phased-approach` (U17, sibling brief) — mention timing only where it affects the CGT relief claim itself (e.g., claiming per-transfer), not as a general phasing strategy discussion.
- The linear step-by-step incorporation checklist belongs to `incorporating-property-portfolio-uk-2026` (U19) — do not duplicate it.
- **Never touch or compete with the two PROTECTED transfer pages**: `sdlt-transfer-property-company-cost`, `how-to-transfer-property-into-limited-company-uk`. In particular, the query this page is claiming (`property incorporation capital gains tax`) is *currently* landing on `how-to-transfer-property-into-limited-company-uk` — the fix is to strengthen U20's own on-page relevance for that query, not to edit the transfer page.

## 6. Facts pack (verify each against `docs/property/house_positions.md`; flag any conflict)

- **s.162 TCGA 1992 incorporation relief must be positively claimed for transfers on or after 6 April 2026.** The prior s.162A disapplication-election mechanic is gone; for pre-6-April-2026 transfers the relief applied automatically absent an election out. This is the single most important dated fact on this page — the live file's summary already states it correctly ("From 6 April 2026 the relief must be claimed"); keep and foreground it. — confirmed house_positions.md line ~228: "Section 162 incorporation relief is automatic / you do not claim it" is explicitly flagged as false since FA 2026.
- **CGT residential rates: 18% basic rate, 24% higher rate**, from 30 October 2024 (Autumn Budget 2024). Relevant for the "what happens if incorporation relief doesn't fully apply" worked example. Do not write 28%. — confirmed line ~209, ~228.
- **SDLT company/additional-dwellings surcharge is 5%**, since 31 October 2024 — mention once as the separate charge incorporation relief does not touch, then link to U18. — confirmed §1 house_positions.md.
- **Connected-party transfers are charged SDLT on market value (s.53 FA 2003)** — same one-line context as above, not a section in its own right on this page.
- **Property income tax reducer rises to 22% from 6 April 2027** (FA 2026 Sch 1, enacted 18 March 2026) — background only, relevant if the page frames "why incorporate at all" motivation, not central.
- **Dividend rates 2026/27: 10.75% basic, 35.75% higher, 39.35% additional** — relevant only if the worked example extends to post-incorporation extraction; keep brief if used.
- **Corporation tax: 19% small profits (≤£50k profits) / 25% main (≥£250k profits) / marginal relief taper to ~26.5% effective (£50k-£250k band)** — background only.
- **The gain is rolled into the base cost of the shares received, not erased.** Incorporation relief defers CGT; it does not eliminate it — the live file's summary states this correctly ("The gain is rolled into the base cost of the shares, not erased"). Keep this framing prominent — it is the most commonly misunderstood point in the competitor set (several competitor titles use "avoid" language that overstates the relief).

No conflicts found between the above and house_positions.md at review time. If the writer finds a discrepancy during drafting, flag it rather than guess.

## 7. Interlink spec

**Existing slugs — verified present on disk:**

- `section-162-incorporation-relief-property-landlords` (statutory-test depth page — link, never restate per §5)
- `sdlt-incorporation-stamp-duty-twice` (U18 — sibling brief; link for the SDLT side, which this relief does not cover)
- `incorporation-existing-portfolios-phased-approach` (U17 — sibling brief; link for phasing strategy)
- `incorporating-property-portfolio-uk-2026` (U19 — link for the step-by-step checklist)
- `how-to-transfer-property-into-limited-company-uk` (PROTECTED — link only, never restate; this is the page the target query is currently mis-landing on)
- `sdlt-transfer-property-company-cost` (PROTECTED — link only)

**Wave-1 siblings that will exist (link forward once live; note as TBD if not yet published):**

- `/spv-company` (pillar)
- `spv-company-formation-cost-uk`
- `limited-company-buy-to-let-allowable-expenses`
- `how-to-close-a-property-limited-company`

## 8. Current-file outline: what changes vs. stays

Current H2s (from live file, `Property/web/content/blog/incorporate-rental-property-without-cgt.md`):

| Current H2 | Verdict | Why |
|---|---|---|
| What is incorporation relief for landlords? | **KEEP, tighten as H1-supporting intro** | Good opening framing; sharpen to explicitly use the dominant-query phrasing "property incorporation capital gains tax" in the first 100 words |
| The business test: the hurdle most landlords trip on | **KEEP, but cap depth** | Page-defining per §5 — keep at "what the test is and why people fail it" level with a worked example; do not turn into the full statutory breakdown (that's the other page's job) |
| The conditions for the relief to apply | **REWRITE → compress, link out** | Summarise conditions as a checklist, link `section-162-incorporation-relief-property-landlords` for full statutory depth |
| The change that catches people out: you now have to claim it | **KEEP, foreground** | This is the single most important dated fact (6 April 2026 claim requirement) — keep prominent, possibly move earlier in the page |
| Incorporation relief is a CGT relief only: do not forget SDLT | **KEEP, expand link** | Directly supports the MUST-NOT rule in §5 — strengthen the link to `sdlt-incorporation-stamp-duty-twice` |
| What incorporation relief does and does not cover | **KEEP** | Supports the "defers, doesn't erase" framing |
| If your portfolio is not a business: the alternatives | **KEEP** | Answers "does incorporation relief apply to landlords" for the no case |
| A worked CGT picture | **REWRITE → expand with 2026/27 figures** | Must use current CGT rates (18%/24%) and reflect the claim requirement; add a second worked example covering an existing-company transfer (answers the "can you get incorporation relief on properties going into an existing company" variant, Bing 34 impr) |
| Practical steps to incorporate without a CGT charge | **KEEP, tighten** | Avoid drifting into U19's full step-by-step checklist — keep to the CGT-specific steps (claim timing, share structuring, valuation evidence) |
| Common mistakes that cost landlords the relief | **KEEP, expand** | Strong FAQ/practical-value section; expand with commercial-property applicability (answers the 72-impression "incorporation relief commercial building to a ltd" variant) |
| Is incorporating right for your portfolio? | **KEEP** | Decision-framing, valuable |
| Getting it right | **KEEP** | Standard CTA section |
| Related reading | **REWRITE** | Update per §7 interlink spec |
| **ADD** | Explicit H1/opening claim of "property incorporation capital gains tax" as the owned query, since it is currently mis-landing elsewhere | Required — this is the entire point of the rewrite per §2/§3 |
| **ADD** | Comparison table: incorporation relief available vs not available (business test pass/fail) with the CGT consequence in each case | Required by full-overhaul rule |
| **ADD** | FAQ 10-14 per §2, including the existing-company and commercial-property variants | Required |

**Full overhaul rule:** dominant-query intent ("property incorporation capital gains tax" — the outcome question) owns the H1. Comparison table, worked examples with real 2026/27 figures, FAQ 10-14, depth = full.
