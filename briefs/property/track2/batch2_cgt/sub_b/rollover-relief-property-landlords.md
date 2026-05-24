# Track 2 brief: rollover-relief-property-landlords

**Site:** property
**Brief type:** Legacy rewrite — Batch 2 Sub-bucket B (CGT reliefs — PRR / Rollover / Lettings)
**Source markdown path:** `Property/web/content/blog/rollover-relief-property-landlords.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/rollover-relief-property-landlords
**Stage 1 priority:** **M** — 0 GSC + 0 GA4 (invisible page, B1-A1 cohort). The slug owns a high-commercial-intent phrasing ("rollover relief property landlords") that competitor pages either skip entirely (most BTL pages don't mention rollover at all because most landlords don't qualify) or treat in two sentences. Foundational rewrite defensible as future demand-capture: when the right-intent query emerges, our specialist answer is "no for most landlords, here's why + here's what's actually available" rather than the false-hope framing that dominates the niche.
**Stage 1 date:** 2026-05-24
**Stage 2 enrichment date:** 2026-05-24 (data pulled from Supabase + WebFetched 4 statute sections + 3 HMRC manual pages; competitor URLs predominantly blocked or 404 — 4 of 5 attempted)
**Cannibalisation status:** REWRITE — clean. No rewritten CGT sibling covers rollover relief specifically. B2-B1 (PRR) and B2-B3 (Lettings Relief) are different reliefs with no overlap. W6 B4 (`settlor-interested-trust-iht-s49-1a-cgt-s169b...`) addresses s.169B holdover BLOCK for settlor-interested trusts — NOT a cannibalisation (s.169B blocks HOLDOVER, not rollover; different statute, different fact pattern). W6 C8 (`fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics`) is the grandfathered-BADR FHL angle, adjacent topic worth cross-linking from our §"Former FHL property and rollover relief" sub-section.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `rollover-relief-property-landlords`. The slug owns a precise commercial-intent phrasing — "can I roll over my BTL gain" is a specific landlord question that needs a specialist answer. Reframing the slug would lose the precise-intent positioning.
- **Category:** `capital-gains-tax` (kept).
- **Gap-mode tag:** `DEPTH` (primary — the central question "does my rental property qualify as 'used for the purposes of the trade' under s.152?" gets one paragraph and a brief mention; needs full statutory unpacking with the badges-of-trade test, the case-law spine (Salisbury House Estates v Fry, Griffiths v Jackson, Iswera v IRC), and the FHL post-abolition impact in depth; needs the Class 1 Head A "land or building occupied AND used only for the purposes of the trade" requirement explicitly cited per s.155) + `VOICE-FRESHNESS` (secondary — the body mentions "Lettings relief was largely abolished in April 2020, now only applying to shared occupancy situations" which is correct framing but minimal; the FHL pre-abolition mention is correctly hedged "Before its abolition in April 2025" but lacks the anti-forestalling depth) + `STALE_FIGURES` (tertiary — **line 96 contains the F-2/F-5 Bill-vs-enacted hazard pattern**: "From April 2027, property income will face separate tax rates (22% basic, 42% higher, 47% additional rate)" asserted as fact without the §7 hedge; **line 96 also contains "The increased SDLT surcharge on additional properties (5% from October 2024)"** which needs verification against §1 LOCKED for the current 2026/27 figure).
- **"Why this rewrite" angle:** the legacy page is the right framing (rollover relief for property — niche but real demand) and the answer is right ("no for most landlords") but the body underbuilds the statutory reasoning AND carries the F-2/F-5 unhedged April 2027 rate assertion (which has nothing to do with rollover relief but appears in the closing). The rewrite needs to (a) deepen the trade-vs-investment statutory analysis with case-law citations + the badges-of-trade framework, (b) tighten the qualifying-circumstances list with statute spine (s.152 + s.153 + s.155 + the partial-reinvestment computation), (c) properly cover the FHL post-abolition picture with the §6 anti-forestalling rules + W6 C8 grandfathered-BADR cross-link, (d) fix the unhedged April 2027 assertion per §7 LOCKED, (e) verify the "5% from October 2024" SDLT surcharge against §1 LOCKED. Body lift to 2,400-2,800 words (rollover for landlords is a narrower topic than PRR; doesn't need 3,000+ words) with 12-14 FAQs + 1 worked qualifying-business example + 1 worked failed-qualification example + 1 decision table.

---

## Current page snapshot (Stage 2 — pulled from filesystem; no `page_content_map` row)

**Supabase `page_content_map` row:** **none.** Page has never been parsed (parser only walks pages with GSC impressions; this page has zero).

**Filesystem source read (98 lines):**
- `metaTitle`: "Rollover Relief Property: Can UK Landlords Claim It?" (51 chars)
- `metaDescription`: "Rollover relief property rules for UK landlords. When business asset rollover applies to rental properties, eligibility and reinvestment." (138 chars — short, headroom)
- Word count: ~1,600 (estimate from 98-line markdown with substantial paragraph density)
- 5 H2 sections (What Is Rollover Relief / Conditions, Time Limits and How It Works / Alternative CGT Reliefs for Property / Record Keeping and Making Tax Digital / The Importance of Professional Advice / Future Changes and Summary) — count is 6 H2s with 3 H3 sub-sections
- 4 FAQs in frontmatter `faqs:` array (Can I claim rollover when selling one BTL to buy another / Difference between rollover and reinvestment relief / How long to reinvest / Can property companies claim)
- 1 worked example (£500k disposal / £200k gain / £600k reinvest commercial premises — fine illustrative example but not a landlord-specific scenario)
- Internal links: 5 (CGT pillar / Section 24 page / LtdCo pillar / MTD page / property-accountant page)
- Outbound authority links: 0 (no gov.uk / legislation.gov.uk / HMRC manual citations — F-9 pattern adjacent risk on a statute-heavy topic like rollover)
- Last meaningful edit: 2026-04-10 (frontmatter `date`)
- Frontmatter has NO `metaTitle_prev` / `metaDescription_prev` — no prior meta rewrite attempted

**Drift hazards in current body (critical, all load-bearing for rewrite):**

- **Line 96 — STALE FIGURE / UNHEDGED BILL-VS-ENACTED (HIGH, F-2/F-5 pattern):** "From April 2027, property income will face separate tax rates (22% basic, 42% higher, 47% additional rate), but this doesn't affect CGT rollover property business rules directly. CGT rates remain at 18% and 24% for property disposals." The 22/42/47 assertion is presented as fact without the §7 LOCKED Bill-form hedge — this is the canonical F-2/F-5 pattern that has now hit FIVE TIMES in the program (F-2 trial brief #3 + F-5 gold-reference cgt-rates + 3 prior Waves 1-4 instances per F-5 commentary). Even though the §7 surcharge does NOT affect CGT (correctly noted in line 96), the unhedged assertion still violates §7 LOCKED. Rewrite must hedge with "announced in Autumn Budget 2024, scheduled for April 2027 subject to Finance Act 2026 receiving Royal Assent" per §7 framing.
- **Line 96 — POTENTIAL STALE SDLT FIGURE:** "The increased SDLT surcharge on additional properties (5% from October 2024)". Per §1 LOCKED (need to verify exact wording — §1 SDLT was not in the targeted Read sample but is the SDLT framework): the additional-dwellings SDLT surcharge changed at 30 October 2024 (Autumn Budget). The 5% figure may be correct for the surcharge percentage; needs verification at rewrite per §16.31 + §16.36 statutory-citation gate.
- **Line 48 — CT-vs-CGT FRAMING (LOW, not the F-9 pattern but adjacent):** "Corporation tax rates for 2026/27 are 19% on profits up to £250,000 and 25% above that threshold, but rollover relief operates separately from these rate considerations." The CT rates ARE correct per §21 LOCKED. The framing is OK (it correctly distinguishes CT from CGT in the company context, the OPPOSITE of the F-9 error). Not a violation, but the surrounding context where "Limited companies face the same restrictions" appears does not explicitly call out the corporation-tax-on-chargeable-gains-not-CGT distinction. Rewrite should add a one-sentence anchor.
- **Line 88 — MTD threshold complexity (factually correct per §3 LOCKED):** "Making Tax Digital for Income Tax becoming mandatory from April 2026 for landlords with gross qualifying income above £50,000 (the MTD-for-ITSA threshold from 6 April 2026, falling to £30,000 from 6 April 2027 and £20,000 from 6 April 2028)". The cascade is correct per §3 LOCKED. Tangential to the rollover topic; could be trimmed at rewrite. Not a violation.
- **Line 32-36 — STATUTORY GAP (HIGH):** the central trade-vs-investment analysis sits across two paragraphs ("HMRC's position is clear: simply letting residential property doesn't constitute a trade. The income is investment income, and disposals are capital transactions subject to normal capital gains tax rules.") without ANY statute citation. The right answer requires citing TCGA 1992 s.152(1) verbatim ("used, and used only, for the purposes of the trade throughout the period of ownership") + s.155 Class 1 Head A ("any building or part of a building...occupied (as well as used) only for the purposes of the trade") + the badges-of-trade case-law spine (Salisbury House Estates v Fry [1930] for the "lettings = investment" anchor; Griffiths v Jackson [1983] for the active-management threshold; Marson v Morton [1986] for the badges-of-trade list). This is the load-bearing depth gap.

**Drift hazards NOT present (correctly handled):**
- The 18% / 24% residential CGT rates ARE current (line 34, line 96) — matches §5 LOCKED.
- The £3,000 AEA IS current for 2026/27 (line 81) — matches §5 LOCKED.
- The FHL pre-abolition framing IS correctly hedged "Before its abolition in April 2025" (line 43) — matches §6 LOCKED. But the post-abolition follow-through could be deeper.
- The 12-months-before / 36-months-after time window IS correct (line 21 + line 55) — matches s.152(3) per WebFetch verification 2026-05-24.

---

## GSC angle (last 90 days) — REAL DATA from `gsc_query_data`

**Pulled 2026-05-24 PM via `python -m optimisation_engine.track2.pull_page_data --slug rollover-relief-property-landlords --days 90`.**

**Aggregate:** **0 impressions / 0 clicks / 0 distinct queries** in 90-day window. **0 GA4 rows.** No competitor SERPs stored. No page_content_map row.

**Same INVISIBLE pattern as airbnb T1 + B1-A1/A2/A3 cohort.** Page has never shown in SERPs at the impression-tracked depth.

**Strategic conclusion:** as with the invisible-page cohort, the rewrite cannot be tuned to specific queries. Foundational rewrite needs to (a) deepen the trade-vs-investment statutory analysis to be the authoritative UK landlord-facing answer when the right-intent queries emerge, (b) anchor with statute + case-law spine, (c) sibling-route the alternatives (PRR / spouse-transfer / incorporation) hard so the page is honest about what landlords actually CAN do. Realistic post-rewrite target: 50-150 impressions / 90 days within 6-12 months (rollover for property landlords is a narrower topic than PRR or general CGT — fewer queries even at full demand).

---

## Gap-mode diagnosis (Stage 1 reasoning, refined Stage 2)

**Primary: DEPTH.** The central question of the page ("does my rental property qualify as 'used for the purposes of the trade' under s.152?") is the heart of UK landlord rollover-relief inquiry. Current treatment is ~3 paragraphs + 1 H3 ("When Property Might Qualify"). Right treatment is a substantial H2 with statute spine (s.152(1) + s.155 Class 1 Head A verbatim quotes) + case-law spine (Salisbury House Estates v Fry [1930] anchor + Griffiths v Jackson [1983] active-management threshold + Marson v Morton [1986] badges-of-trade list + Iswera v IRC [1965] subjective-purpose test) + HMRC working position (BIM60020 / BIM60030 trade-vs-investment manuals) + the specific landlord scenarios that DO qualify (commercial property occupied by the owner's own trade; trading-status property dealers) + the specific landlord scenarios that look like they should qualify but don't (very large BTL portfolios; intensive HMO management; serviced accommodation pre-April-2025; furnished holiday lets pre-April-2025).

**Secondary: STALE_FIGURES (F-2/F-5 pattern at body line 96).** The unhedged April 2027 rate assertion is the SIXTH consecutive instance of §7 Bill-vs-enacted drift pattern across the program. Plus the "5% from October 2024" SDLT surcharge mention needs §1 verification.

**Tertiary: STRUCTURE.** 4 FAQs is below the 10-14 best-in-class target. No decision tree for "does my disposal qualify for rollover?" → "what should I do instead?". No worked example showing a FAILED qualification (the BTL landlord scenario — most readers' actual scenario). One worked example exists (commercial premises £500k) but it's not landlord-applied; needs a parallel "would-be" landlord scenario showing the s.152 disqualification.

**Quaternary: VOICE-FRESHNESS.** The post-FHL-abolition framing is correctly hedged but thin. §6 LOCKED has the anti-forestalling depth (6 March 2024 announcement to 5 April 2025 abolition; W6 C8 has the grandfathered-BADR worked example). Rewrite should add a 3-paragraph sub-section under "When Property Might Qualify" titled "Former FHL property and rollover relief — the anti-forestalling window closed" with the W6 C8 cross-link.

**Not present: CTR-FAIL** (no impressions); **not CANNIBAL** (no rollover sibling on-site); **not pure INTENT-MISMATCH** (rollover-relief-property-landlords is a precise UK-landlord intent the page IS positioned for).

**Load-bearing fix sequence (ordered by ROI):**

1. **Fix the F-2/F-5 unhedged April 2027 rate assertion** at line 96 — replace with §7 LOCKED hedge: "Property income tax rates announced in Autumn Budget 2024 are scheduled to rise from April 2027 to 22% basic / 42% higher / 47% additional, subject to Finance Act 2026 receiving Royal Assent. These changes affect property income tax, not CGT — the 18% / 24% CGT rates on residential property remain through 2027/28 per the Autumn Budget 2024 settlement." Even though the existing line CORRECTLY notes the surcharge doesn't affect CGT, the unhedged "WILL face" verb is the F-2/F-5 violation. **MANDATORY — load-bearing.**
2. **Deepen the trade-vs-investment statutory analysis** with statute spine: TCGA 1992 s.152(1) verbatim quote of the "used, and used only, for the purposes of the trade throughout the period of ownership" wording (confirmed 2026-05-24 WebFetch); TCGA 1992 s.155 Class 1 Head A verbatim quote of the "any building or part of a building...occupied (as well as used) only for the purposes of the trade" requirement (confirmed 2026-05-24 WebFetch); the qualifier "occupied and used only for trade purposes" (excludes investment property and residential let property — confirmed 2026-05-24 WebFetch). Add HMRC CG60250 + CG60280 + CG60290 cross-references (all 200 OK + content verified 2026-05-24).
3. **Add badges-of-trade case-law spine** per Marson v Morton [1986]: profit-seeking motive / number of transactions / nature of asset / similarity to other trades / changes / way of sale / source of finance / time between purchase and sale / method of acquisition / level of activity. Apply each to the "is letting a trade?" question with the answer for typical landlord scenarios.
4. **Verify and fix the SDLT surcharge figure** at line 96 — "5% from October 2024" needs verification against §1 LOCKED. The Autumn Budget 2024 changes to the additional-dwellings surcharge at 30 October 2024 raised the rate from 3% to 5%. Confirm exact figure + cite legislation.gov.uk FA 2024 No.2 if relevant + cross-link to Wave 1 SDLT pillar if exists.
5. **Add §6 LOCKED FHL anti-forestalling depth** in a new sub-section "Former FHL property and rollover relief: the anti-forestalling window closed". Cover: pre-6-March-2024 (rollover available for genuine FHL businesses); 6 March 2024 announcement to 5 April 2025 abolition (anti-forestalling rules close artificial pre-abolition disposals); post-6-April-2025 (no FHL category at all; standard residential rental treatment; no rollover available for the let-residential portion). Cross-link to W6 C8 grandfathered-BADR worked example.
6. **Add the Companies-pay-CT-on-chargeable-gains-not-CGT lock** per §13 in the §"Property Companies and Rollover Relief" H3 (line 47-48). Current text "Corporation tax rates for 2026/27 are 19% on profits up to £250,000 and 25% above that threshold" is correct but doesn't explicitly say "companies pay Corporation Tax on chargeable gains, NOT CGT, when computing the rollover-disqualified disposal" — add this one-sentence anchor to align with the F-9 lock.
7. **Add 1 worked qualifying-business example** with real numbers — anonymised owner-occupier ("Anjali, sole-trader chartered surveyor in Bristol; sells her freehold office for £400,000 (£200,000 base cost = £200,000 chargeable gain); reinvests £450,000 in a larger freehold office for the same trade; full rollover relief; new asset base cost reduced to £250,000 (£450,000 – £200,000); CGT deferred until future disposal of the new office or future failed-qualification event").
8. **Add 1 worked failed-qualification example** with real numbers — anonymised BTL landlord ("Marcus, BTL landlord in Manchester with 8 residential properties; sells one for £280,000 (£120,000 base cost = £160,000 chargeable gain); reinvests £290,000 in another residential BTL; **no rollover available** because the disposed property was never 'occupied and used only for the purposes of the trade' under s.155 Class 1 Head A; the gain is fully chargeable for the year of disposal at 18%/24% mix per §5; AEA £3,000 covers a slice; final CGT = £37,680 if all higher-rate, £28,260 if all basic-rate"). This is the load-bearing worked example because it's the actual scenario most readers face.
9. **Add 1 decision table** "Does my disposal qualify for rollover relief?" routing on: (Was the asset occupied + used only for trade purposes? → Y → Is the new asset also a qualifying Class 1-8 asset? → Y → Is the reinvestment within 12 months before / 36 months after? → Y → ROLLOVER AVAILABLE; N at any node → NOT AVAILABLE → "See B2-B1 PRR / spouse transfer / B1-A2 reduce-cgt survey"). Cleanest snippet-bait + routing for readers who don't qualify.
10. **FAQ count 4 → 12-14** with each FAQ targeting a real landlord-intent question:
    - Existing 4 (refresh wording + add statute cites): can I claim when selling one BTL to buy another / rollover vs reinvestment relief / how long to reinvest / can property companies claim
    - "Why doesn't standard BTL qualify as a trade for rollover?" (Salisbury House Estates v Fry [1930] anchor + s.155 Class 1 Head A "occupied AND used" requirement)
    - "What is the 'badges of trade' test?" (Marson v Morton [1986] list applied to letting)
    - "Can a property developer claim rollover relief?" (yes — trading status established; cite BIM60020 framework)
    - "Can a commercial-property owner-occupier claim rollover relief?" (yes — Anjali example pattern)
    - "What about former FHL property — can I roll over a 2024 or 2025 disposal?" (the anti-forestalling window; W6 C8 cross-link)
    - "Can I claim partial rollover if I reinvest less than the full proceeds?" (s.153 — partial relief mechanics)
    - "What other CGT reliefs ARE available for residential landlords?" (PRR / spouse transfer / AEA stacking / B1-A2 survey)
    - "Does the s.169B holdover block affect rollover relief?" (no — s.169B is a holdover BLOCK for settlor-interested trusts; rollover is separate; cross-link to W6 B4 for the trust angle)
    - "Are there any case-law authorities on the trade-vs-investment line?" (Salisbury / Griffiths / Marson / Iswera — case-law spine)
    - "How is CGT computed on a failed-rollover BTL disposal?" (cross-link to rewritten calculation walkthrough)
11. **Update internal links** — refresh the "Lettings relief was largely abolished in April 2020" mention (line 83) to cross-link to B2-B3 (this batch sub-bucket B in-flight); refresh the FHL framing to cross-link to W6 C8; add forward-links to B2-B1 PRR + rewritten CGT pillar + rewritten 60-day deadlines canonical + B1-A2 reduce-cgt survey + W6 B4 (s.169B holdover for settlor-interested trusts).
12. **Update metaTitle** — current "Rollover Relief Property: Can UK Landlords Claim It?" (51 chars) is fine; slight improvement: "Rollover Relief on Property: Can UK Landlords Claim? (2026/27)" (60 chars).
13. **Update metaDescription** — current is OK; slight improvement adding the statute spine + outcome: "Rollover relief (TCGA 1992 s.152) for UK landlords: why standard BTL doesn't qualify, what does, time limits, worked examples + alternatives 2026/27." (158 chars — at limit).

---

## Competitor URLs (Stage 2 — verified live 2026-05-24 via WebFetch)

| URL | Status | Word count | FAQs | Statute cites | Stale figures | Coverage signals |
|---|---|---|---|---|---|---|
| https://www.legislation.gov.uk/ukpga/1992/12/section/152 | **200 OK + operative + verified 2026-05-24** | (statute) | n/a | self | none | s.152(1) "used, and used only, for the purposes of the trade throughout the period of ownership" verbatim; s.152(3) "acquisition...takes place...in the period beginning 12 months before and ending 3 years after the disposal"; subsection (5) anti-avoidance "new assets must be acquired genuinely for trade use, not primarily for resale gain". **Statute spine for our rewrite.** |
| https://www.legislation.gov.uk/ukpga/1992/12/section/153 | **200 OK + operative + verified 2026-05-24** | (statute) | n/a | self | none | s.153 partial reinvestment relief: relief on a reduced basis when only part of consideration is reinvested; gain reduced to uninvested consideration. **Cite for FAQ on partial relief.** |
| https://www.legislation.gov.uk/ukpga/1992/12/section/155 | **200 OK + operative + verified 2026-05-24** | (statute) | n/a | self | none | Class 1 Head A "any building or part of a building...occupied (as well as used) only for the purposes of the trade"; Head B fixed plant or machinery; 7 other classes (ships, aircraft, hovercraft, satellites, goodwill, agricultural quotas, EU subsidies, fish quotas, Lloyd's member rights). **The "occupied AND used" requirement is the load-bearing exclusion of investment property — cite verbatim.** |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg60250 | **200 OK + content verified 2026-05-24** | ~400 (manual-page depth) | 0 | TCGA92/S152 ✓ | none | HMRC rollover relief intro: TCGA92/S152 deferment of CGT on disposals of certain assets when proceeds reinvested in qualifying replacements; allows traders to modernize / expand / relocate without immediate tax. 2002 changes restrict rollover availability for companies on intangible fixed assets post-April-2002. **Cite as the HMRC working-position framework.** |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg60280 | **200 OK + content verified 2026-05-24** | ~400 (manual-page depth) | 0 | TCGA92/S152(1) ✓ | none | HMRC qualifying-assets page: trade-vs-investment distinction; restriction on acquisition purpose ("relief is not available where the new asset was acquired wholly or partly for the purpose of realising a gain on its onward sale"); farmer-buying-excess-land example; "occupied and used for the purposes of the trade" requirement reinforced; passive/investment-oriented holdings do not qualify. **The decisive HMRC working-position cite for the BTL-doesn't-qualify framing.** |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg60290 | **200 OK + content verified 2026-05-24** | ~400 (manual-page depth) | 0 | TCGA92/S152 ✓ | none | HMRC computation-of-relief basic principle: gain on original sale is "not taxed when realised. Instead, it is deducted from the cost of acquisition of the new assets". Freehold shop example: bought £100k, sold £180k (£80k gain), reinvest £250k; new base cost £170k (£250k less £80k rolled-over gain). **Cite as the computation-mechanic authority for our Anjali worked example.** |
| https://www.gov.uk/business-asset-rollover-relief | (not fetched in this brief's WebFetch budget — flag for execution-time verification) | (consumer-summary depth) | n/a | implicit | unknown | The gov.uk consumer-facing landing page for Business Asset Rollover Relief. Verify content + live status at execution. Likely cite as the consumer-authority anchor (counterpart to gov.uk/tax-sell-home for PRR). |
| Third-party UK competitor pages | **Predominantly blocked or 404** | (4 of 5 attempts blocked / not-found at brief-drafting time) | n/a | n/a | n/a | Multiple WebFetch attempts on UK competitor pages (ukpropertyaccountants.co.uk / tax-insider.co.uk / unbiased.co.uk / lawhive.co.uk / hamilton-pratt.co.uk / ross-brooke.co.uk variants) returned permission-denied or 404 during this brief's fetch budget. **Implication:** at execution, re-attempt with broader User-Agent rotation per F-12 lesson. The authority spine (gov.uk + HMRC + legislation.gov.uk) is more than sufficient as written; competitor benchmarking can be done at execution with fresh fetches. |

**Competitor depth ceiling for this query class:** the gov.uk + HMRC manual triple (CG60250 + CG60280 + CG60290) is the authority — third-party UK competitor pages typically run 1,200-2,000 words with 0-2 FAQs and 0-1 statute citations. Our 2,400-2,800 word rewrite with 12-14 FAQs + 5-6 verified statute citations + 3 HMRC manual cross-references + 2 worked examples + decision table puts us decisively best-in-class.

**What to borrow:** the CG60280 "farmer-buying-excess-land" anti-avoidance framing (we use the parallel "BTL landlord buying replacement BTL" framing for our failed-qualification example). The CG60290 computation example (we use the parallel Anjali commercial-premises example).

**What to differentiate against:** the existing legacy body's biggest weakness vs the authority spine is the missing case-law citations + the missing badges-of-trade analysis + the missing FHL anti-forestalling depth. Adding these puts us decisively ahead of any third-party UK competitor.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (refreshed 2026-05-24 PM for Batch 2 prep).

| Source | Slug | Status | Resolution |
|---|---|---|---|
| Residual (own) | rollover-relief-property-landlords | REWRITE | self — rewrite in place as specialist rollover-for-landlords answer |
| Excluded (rewritten 2026-05-21) | capital-gains-tax-property-complete-guide-uk (Session C #47) | CGT pillar | No collision — pillar's reliefs sub-section briefly mentions rollover with a forward-link to this page. Reciprocal forward-link from our intro. |
| Excluded (rewritten 2026-05-21) | cgt-rates-property-2026-27-current-rates-explained (gold-reference trial T4) | CGT rates explainer | No collision — rates page references reliefs briefly + forward-links here. Reciprocal forward-link from our failed-qualification worked example tax computation. |
| Excluded (rewritten 2026-05-21) | cgt-gifting-property-family-members-uk (Session B #46) | Gifting + s.165/s.260 holdover | No collision — gifting/holdover is a DIFFERENT relief (s.165 trading-asset holdover or s.260 chargeable-transfer holdover), not rollover. Brief cross-link from our FAQ on "Does s.169B holdover block affect rollover?" answer. |
| Wave 6 (shipped 2026-05-24) | **settlor-interested-trust-iht-s49-1a-cgt-s169b-property-attribution-rules (W6 B4)** | s.169B holdover BLOCK for settlor-interested trusts | **NOT a cannibalisation — different statute, different fact pattern.** s.169B blocks HOLDOVER (s.260 or s.165), NOT rollover (s.152). The dispatch prompt correctly flagged this as a cross-link only opportunity. Brief cross-link from our FAQ on "Does s.169B affect rollover?" with the explicit "no — s.169B is a holdover block, not a rollover block" anchor. |
| Wave 6 (shipped 2026-05-24) | **fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics (W6 C8)** | FHL grandfathered BADR + capital allowances | Adjacent — strong cross-link partner for the §"Former FHL property and rollover relief: the anti-forestalling window closed" sub-section. W6 C8 covers the post-abolition BADR grandfathered-claims angle; we cover the rollover availability angle (largely closed post-6-April-2025). Reciprocal forward-link both ways. |
| Wave 6 (shipped 2026-05-24) | mvl-members-voluntary-liquidation-property-company-cgt-vs-income-treatment (W6 A4) | MVL CGT-vs-income on final distribution | No collision — MVL is a different statute (CTA 2010 + CTA 2009 chargeable gains) and a different fact pattern (winding up a property company). Brief cross-link possible from FAQ on "Can a property company claim rollover" answer for the corporate-exit alternative. |
| Wave 6 (shipped 2026-05-24) | extracting-cash-from-property-spv-extraction-sequence-pillar-2026-27 (W6 A1) | LtdCo extraction sequence pillar | No collision — extraction is a different exit route. Brief cross-link possible from FAQ on "Can a property company claim rollover" answer for the corporate-extraction alternative. |
| Residual (intra) | principal-private-residence-relief-landlords (B2-B1, this batch in-flight) | PRR | No collision — PRR is a different relief; brief cross-link from our "Alternative CGT Reliefs for Property" H2 with a hard forward-link to B2-B1 for the PRR full depth. |
| Residual (intra) | letting-relief-landlords-2026-changes (B2-B3, this batch in-flight) | Lettings Relief post-2020 | No collision — Lettings Relief is a different relief; brief cross-link from "Alternative CGT Reliefs" H2 + the existing line 83 reference. Update to hard-link to B2-B3. |
| Residual (intra) | cgt-deferral-strategies-property-investors-uk (B1-A1, Batch 1 brief drafted) | Deferral mechanics survey | **Adjacent — strong cross-link partner.** B1-A1 covers deferral strategies generally (rollover, holdover, EIS, gifting timing); this page is the rollover specialist depth. Reciprocal forward-link: B1-A1's rollover sub-section forward-links to this page; this page's "Alternative deferral routes" sub-section forward-links to B1-A1 for EIS + holdover + gifting timing. |
| Residual (intra) | reduce-cgt-property-disposal-uk (B1-A2, Batch 1 brief drafted) | CGT reduction survey | No collision — B1-A2 is reduction-oriented; this page is deferral-oriented. Brief cross-link from "Alternative CGT Reliefs" to B1-A2 for the reduction-route survey. |
| Residual (intra) | cgt-property-sold-loss-claim-capital-losses (B1-A3, Batch 1 brief drafted) | Capital losses | No collision — losses are a separate computation. Brief cross-link from FAQ on "How is CGT computed on a failed-rollover disposal" answer to B1-A3 for the loss-offset mechanic if applicable. |
| Residual (intra) | non-resident-cgt-uk-property-rates-reporting (B2-C1, this batch in-flight) | NRCGT mechanics | No collision — NRCGT is the non-resident chargeable mechanism, not a rollover question. Brief cross-link from FAQ on "Can a non-resident landlord claim rollover" answer (likely answer = no for the trade-investment reason, with NRCGT applying instead). |
| Residual (intra) | incorporate-rental-property-without-cgt (back-patched 2026-05-24 commit `5316bea`) | s.162 incorporation relief | No collision — s.162 is a different relief; brief cross-link from "Alternative CGT Reliefs" H2. |

**Conclusion:** REWRITE in place as specialist rollover-for-landlords answer. Clean cannibalisation against all sources. Strong adjacent partnership with B1-A1 (deferral survey) — reciprocal forward-link.

---

## Closest existing pages (Stage 2)

Internal-link partners (to and from this page):

- **CGT pillar:** `capital-gains-tax-property-complete-guide-uk` — back-link target; reciprocal forward-link from our intro.
- **CGT rates (gold-reference):** `cgt-rates-property-2026-27-current-rates-explained` — forward-link from failed-qualification worked example tax computation.
- **PRR (B2-B1, this batch in-flight):** `principal-private-residence-relief-landlords` — forward-link from "Alternative CGT Reliefs" H2.
- **Lettings Relief (B2-B3, this batch in-flight):** `letting-relief-landlords-2026-changes` — forward-link from "Alternative CGT Reliefs" H2 + replace line 83 reference.
- **AEA depth:** `cgt-annual-exempt-amount-3000-allowance-2026-27` — forward-link from worked example tax computation.
- **60-day deadlines (rewritten canonical):** `cgt-payment-deadlines-property-sales-2026` — forward-link from "Reporting your post-disqualification CGT" closing reminder.
- **Calculation walkthrough (rewritten):** `cgt-calculation-selling-buy-to-let-property-step-by-step` — forward-link from failed-qualification worked example.
- **Incorporation pillar (rewritten):** `buy-to-let-limited-company-complete-guide-uk` — forward-link from §"Property Companies and Rollover Relief" H3 (replaces existing line reference).
- **Section 24 page (rewritten):** `claim-mortgage-interest-rental-property-uk-section-24` — forward-link from §"Letting as investment, not trade" sub-section (S24 is the legislative-treatment evidence).
- **MTD landing (rewritten):** `mtd-quarterly-deadlines-2026-2027-landlords` — replace line 88 reference to `making-tax-digital-landlords-april-2026-deadline` with the rewritten canonical.
- **FHL grandfathered BADR (Wave 6 C8):** `fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics` — forward-link from §"Former FHL property and rollover relief" sub-section.
- **s.169B holdover trust (Wave 6 B4):** `settlor-interested-trust-iht-s49-1a-cgt-s169b-property-attribution-rules` — forward-link from FAQ "Does s.169B affect rollover?" answer.
- **MVL CGT (Wave 6 A4):** `mvl-members-voluntary-liquidation-property-company-cgt-vs-income-treatment` — brief cross-link from FAQ "Can a property company claim rollover" for the corporate-exit alternative.
- **Reduce-CGT survey (B1-A2, Batch 1 brief drafted):** `reduce-cgt-property-disposal-uk` — forward-link from "Alternative CGT Reliefs" H2.
- **Deferral survey (B1-A1, Batch 1 brief drafted):** `cgt-deferral-strategies-property-investors-uk` — forward-link from "Alternative deferral routes" sub-section.
- **Capital losses (B1-A3, Batch 1 brief drafted):** `cgt-property-sold-loss-claim-capital-losses` — forward-link from FAQ on "How is CGT computed on failed-rollover" answer.
- **What does a property accountant do:** `what-does-a-property-accountant-do` — anchor link at end of body for the closing inline-CTA (replace existing line reference).

---

## House-position references (Stage 1)

- **§5 CGT on UK residential property (2026/27)** [LOCKED 2026-05-23]: primary lock. 18%/24% residential CGT rates; £3,000 AEA — both correctly applied in current body. **Companies-pay-Corporation-Tax-on-chargeable-gains-not-CGT** position from F-9 — apply in §"Property Companies and Rollover Relief" H3 with a one-sentence anchor.
- **§6 FHL — abolition transition** [LOCKED 2026-05-22]: load-bearing for the §"Former FHL property and rollover relief: the anti-forestalling window closed" sub-section. FA 2025 Sch 5 abolished FHL from 6 April 2025; anti-forestalling rules between 6 March 2024 and 5 April 2025 close artificial pre-abolition disposals.
- **§7 April 2027 property income tax surcharge** [LOCKED but VERIFY at execution per Bill-vs-enacted F-5 pattern]: load-bearing for the line 96 hedge. The Wave 6 F-9 catch (s.455 substitution 33.75% → 35.75% per FA 2026) means FA 2026 IS enacted for the s.455 change, but does NOT necessarily mean the April 2027 income-tax surcharge is enacted (per Cannib Index §0 2026-05-24 PM note: "Wave 6 F-9 was about s.455 (corporation-tax dividend rate), NOT the April 2027 income-tax/CGT surcharge on property"). Sub-bucket A briefs touching April 2027 territory must hedge per §7 LOCKED. Apply the same hedge in our line 96 fix.
- **§13 Do-not-write list (general)** [LOCKED]: NO pricing; NO real client names; NO em-dashes; NO emoji in body. Apply the F-9 Companies-pay-CT-not-CGT lock defensively in our corporate sub-section.
- **§17.4 NRCGT** [LOCKED 2026-05-22]: brief mention in FAQ on "Can a non-resident landlord claim rollover" answer (likely no for trade-investment reason; NRCGT applies instead — cross-link to W2 expat content + B2-C1 brief).
- **§21 LtdCo + FIC mechanics** [LOCKED 2026-05-23 + extended at Wave 6 close per §21.1 s.455 35.75% lock]: relevant for the §"Property Companies and Rollover Relief" H3. CT rates 19% / 25% per §21.4 — already correct in current body.
- **§1 SDLT — rates and surcharges (2026/27)** [LOCKED]: relevant for the line 96 "5% from October 2024" SDLT surcharge verification.

---

## House-position conflict flag (Stage 2)

**Confirmed conflict — F-22 STALE_FIGURES (HIGH — F-2/F-5 pattern continuation).**

**Flag (a) — STALE_FIGURES + BILL-VS-ENACTED (HIGH, F-2/F-5 pattern, SIXTH consecutive instance):** line 96 asserts "From April 2027, property income will face separate tax rates (22% basic, 42% higher, 47% additional rate)" without the §7 LOCKED hedge. The §7 framework requires "announced 30 October 2024, scheduled for April 2027 subject to Finance Act 2026 receiving Royal Assent" — the current "WILL face" verb is the unhedged Bill-form assertion that has now hit 6 times in the program. Rewrite must hedge per §7.

**Flag (b) — STALE_FIGURE_VERIFICATION (MEDIUM):** line 96 "5% from October 2024" SDLT surcharge figure needs §1 verification. The Autumn Budget 2024 changes at 30 October 2024 raised the additional-dwellings surcharge from 3% to 5%. Confirm exact rate + cite source at rewrite.

**Site-wide flag to raise (append to track2_site_wide_flags.md):**

`F-22 | 2026-05-24 PM | HIGH | rollover-relief-property-landlords | STALE_FIGURES + BILL-VS-ENACTED | SIXTH consecutive instance of §7 Bill-vs-enacted pattern at body line 96. Page is otherwise statute-correct (18%/24% CGT rates + 19%/25% CT rates per §21.4) but the closing "future changes" paragraph asserts 22/42/47 April 2027 income-tax rates without the §7 LOCKED hedge. Same fix as F-5: "announced 30 October 2024, scheduled for April 2027 subject to Finance Act 2026 receiving Royal Assent". Also flag the "5% from October 2024" SDLT surcharge figure for §1 LOCKED verification.`

---

## Authority links worth considering (Stage 2 — WebFetch verification status)

| URL | Verification status | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/1992/12/section/152 | **200 OK + operative + verified 2026-05-24** | Cite s.152(1) "used, and used only, for the purposes of the trade" verbatim |
| https://www.legislation.gov.uk/ukpga/1992/12/section/153 | **200 OK + operative + verified 2026-05-24** | Cite for FAQ on partial reinvestment relief |
| https://www.legislation.gov.uk/ukpga/1992/12/section/155 | **200 OK + operative + verified 2026-05-24** | Cite Class 1 Head A "occupied (as well as used) only for the purposes of the trade" verbatim |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg60250 | **200 OK + content verified 2026-05-24** | HMRC rollover intro — framework cite |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg60280 | **200 OK + content verified 2026-05-24** | HMRC qualifying-assets — trade-vs-investment cite (decisive for BTL doesn't qualify) |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg60290 | **200 OK + content verified 2026-05-24** | HMRC computation-of-relief — cite for Anjali worked example mechanic |
| https://www.gov.uk/business-asset-rollover-relief | Verify at execution (not fetched this brief) | Consumer-authority anchor |
| Salisbury House Estates Ltd v Fry [1930] HL — letting = investment leading authority | Verify case-law cite at execution | Anchor for the "letting is investment" position |
| Griffiths v Jackson [1983] STC 184 — active-management threshold | Verify at execution | Cite for the active-management exception discussion |
| Marson v Morton [1986] STC 463 — badges-of-trade list | Verify at execution | Cite for the badges-of-trade framework |
| Iswera v IRC [1965] 1 WLR 663 — subjective-purpose test | Verify at execution | Brief mention in badges-of-trade context |
| HMRC BIM60020 / BIM60030 — trade-vs-investment manuals | Verify exact paths at execution per F-7 PIM4101 hallucination discipline | Supplementary HMRC authority |
| HMRC CG60260 (or thereabouts) — interaction with other CGT reliefs | Verify at execution | Supplementary authority for "alternative reliefs" sub-section |

**(Execution session selects 6-8 to actually cite in body — target 5 verified statutory + 3 HMRC manual + 1 gov.uk consumer + 1-2 case-law authorities.)**

---

## Universal rules (do not skip)

Inherits from `TRACK2_PROGRAM.md §4 sections 13 + 14`. Critical for this brief:

- **NO em-dashes** (per memory note + §13).
- **NO pricing on-site** (per agency lead-gen handoff model + F-1).
- **Anonymised social proof only** (the Anjali Bristol chartered-surveyor pattern + the Marcus Manchester 8-BTL pattern).
- **LeadForm auto-injected by `BlogPostRenderer.tsx`.**
- **1-3 inline `<aside>` CTAs** at conversion moments (after the failed-qualification worked example + after the decision table + before closing).
- **FAQs schema auto-emitted** from frontmatter (target 12-14 entries).
- **House position §5 + §13 F-9 Companies-pay-CT-not-CGT lock** in the §"Property Companies and Rollover Relief" H3 — one-sentence anchor.
- **House position §6 FHL post-abolition framing** in the §"Former FHL property and rollover relief" sub-section + W6 C8 cross-link.
- **House position §7 hedge MANDATORY at line 96** — replace unhedged "WILL face" verb with §7 LOCKED hedge.
- **URL liveness + statute-content verification at execution** per §16.31 + F-7 + F-8.
- **TCGA 1992 s.152 IS the operative rollover relief statute** (verified 2026-05-24); s.153 is partial reinvestment; s.155 is qualifying asset classes. **Distinct from s.169B (holdover block) and from s.165/s.260 (holdover)** — easy confusion but distinct mechanics.

---

## 19-step workflow (legacy-rewrite adaptation)

Inherits from `NETNEW_PROGRAM.md §7` with the 3 Track 2 deltas. Brief-specific notes:

- **Step 1 reading:** `docs/property/house_positions.md` §1, §5, §6, §7, §13, §17.4, §21 in full before drafting body.
- **Step 4:** verify §7 (April 2027) lock-status against legislation.gov.uk Finance Act 2026. If still Bill-form, hedge per §7 LOCKED. If now enacted, assert with citation. Also verify §1 SDLT surcharge figure (5% from 30 October 2024).
- **Step 5:** re-fetch the 4 verified authority URLs at execution + re-attempt the blocked competitor URLs with broader User-Agent per F-12. At Stage 2 brief drafting (2026-05-24) the statute spine + HMRC manual triple are all 200 OK and content-verified.
- **Step 6:** read the current source file in full to confirm no edit since 2026-04-10.
- **Step 7:** read closest-existing sibling pages (16 cross-links named above; aim to read at least B1-A1 deferral survey + W6 B4 s.169B trust + W6 C8 FHL grandfathered + the rewritten CGT pillar).
- **Step 8:** plan rewrite outline — 9-10 H2s (What is rollover / Trade vs investment test [+statute + case-law spine] / Qualifying assets [s.155] / Reinvestment + time limits [s.152(3) + s.153] / Property Companies and Rollover Relief / Former FHL property and rollover relief [§6] / Alternative CGT Reliefs for Property / Failed-qualification worked example / Future Changes — hedged / Sources). 2,400-2,800 body words, 12-14 FAQs, 1 qualifying + 1 failed-qualification worked example, 1 decision table.
- **Step 9:** rewrite at existing path. Preserve frontmatter `slug` + `canonical` + `date` (update `dateModified` to today). Update `metaTitle` (test "(2026/27)" year addition). Update `metaDescription` with the statute spine reference.
- **Step 10:** site build must pass.
- **Step 11:** six checks per playbook §4.3 + **explicit text-search checks: (a) zero matches for unhedged "will face" / "will be taxed at" April 2027 assertions without the §7 LOCKED hedge wording (specifically the phrase "subject to Finance Act 2026 receiving Royal Assent" must appear if the April 2027 figures are mentioned); (b) at minimum one citation to s.152(1) verbatim + one citation to s.155 Class 1 Head A verbatim; (c) the Companies-pay-CT-on-chargeable-gains-not-CGT anchor must appear in §"Property Companies and Rollover Relief"; (d) zero matches for "1.5%" or "3%" SDLT surcharge (should be 5% per current verified position).**
- **Step 12:** no redirect needed (REWRITE-in-place; clean cannib).
- **Step 13:** insert NEW `monitored_pages` row (zero current GSC; 180-day foundational window).
- **Step 14:** commit on main. Tracker edits via absolute path only.
- **Steps 15-19:** mark ✅ executed; update flags + heartbeat; next page in batch.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §5 CGT 2026/27 (18% / 24% + £3k AEA): __ (correctly applied)
- §5 / §13 F-9 Companies-pay-CT-on-chargeable-gains-not-CGT anchor in corporate sub-section: __ MANDATORY
- §6 FHL post-abolition framing + anti-forestalling depth + W6 C8 cross-link: __
- §7 April 2027 — line 96 hedge applied per §7 LOCKED (verify lock-status at execution): __ MANDATORY
- §1 SDLT surcharge figure verification (current 5% per Autumn Budget 2024): __
- §13 no-pricing / no-real-client-names / no-em-dashes: __
- §17.4 NRCGT cross-link on closing FAQ if covered: __
- §21.4 CT rates 19% / 25% cited correctly in corporate sub-section: __

### Comparison: before vs after
- Word count: ~1,600 → __
- H2 count: 6 (+ 3 H3) → __
- FAQ count: 4 → __
- Authority links: 0 → __
- Inline CTAs: 0 → __
- Worked examples: 1 (commercial, not landlord-applied) → __ (2 expected — Anjali qualifying + Marcus failed-qualification)
- Decision table: 0 → __ (1 expected — "Does my disposal qualify for rollover?" routing)
- s.152 citation count: 0 → __ MUST BE ≥1
- s.155 Class 1 Head A citation count: 0 → __ MUST BE ≥1
- Unhedged April 2027 "will face" assertion: 1 (line 96) → __ MUST BE 0 (replaced with §7 LOCKED hedge)
- "5% from October 2024" SDLT surcharge verification: 1 (line 96) → __ MUST BE verified

### Foundational SEO hypothesis test
- Pre-rewrite GSC baseline (2026-02-24 to 2026-05-24): 0 imp / 0 clicks / 0 queries (invisible page)
- Post-rewrite expected: 50-150 impressions / 90 days within 6-12 months
- Verify at +90 / +180 days via monitored_pages detector

### Flags raised
- F-22 (carried from this brief): F-2/F-5 sixth instance — unhedged April 2027 rate assertion at line 96
- Any new flags surfaced: __

### 2-3 sentence summary
- (populated at execution time)
