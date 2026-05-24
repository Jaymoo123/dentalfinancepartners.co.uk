# Track 2 brief: letting-relief-landlords-2026-changes

**Site:** property
**Brief type:** Legacy rewrite — Batch 2 Sub-bucket B (CGT reliefs — PRR / Rollover / Lettings)
**Source markdown path:** `Property/web/content/blog/letting-relief-landlords-2026-changes.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/letting-relief-landlords-2026-changes
**Stage 1 priority:** **M-H** — 2 imp / 90d at pos 3 (the page IS holding the right SERP position for "lettings relief" but the topic-volume is thin — Lettings Relief is now a niche relief post-April-2020, so the addressable market is small but the page is well-placed for the queries that DO exist). Defensible REWRITE rather than REDIRECT-PROPOSED: the page holds a slug + framing that B2-B1 (PRR) doesn't replicate, and the post-2020 picture is genuinely worth a specialist page (most landlords need to be told they no longer qualify; that's the answer-shape the slug owns).
**Stage 1 date:** 2026-05-24
**Stage 2 enrichment date:** 2026-05-24 (data pulled from Supabase + WebFetched 4 statute sections + 3 HMRC manual pages; competitor URLs predominantly blocked or 404)
**Cannibalisation status:** REWRITE — clean. Strong adjacent partnership with B2-B1 PRR (Lettings Relief sub-section there forward-links here for full mechanic; this page back-links to B2-B1 for the PRR prerequisite). NOT a REDIRECT-PROPOSED candidate: the slug intentionally owns "lettings relief 2026 changes" framing which is a distinct query intent from general PRR; the page deserves specialist depth on the post-2020 restriction.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `letting-relief-landlords-2026-changes`. The "2026 changes" framing is slightly misleading (the substantive change was April 2020, not 2026 — the page is essentially titled around the year of reading, not the year of change). At rewrite, consider whether to keep the slug for SEO continuity (it's been the URL since at least 2026-04-10 frontmatter date) OR rename to a more durable framing. **Recommendation: KEEP the slug** for the 301-redirect avoidance; reframe the on-page H1 + meta to lead with the post-2020 restriction more accurately. Slug semantics: "lettings-relief-landlords-[current-year]-changes" reads as a reference query that gets refreshed annually — defensible if we explicitly position the page as "what remains in 2026".
- **Category:** `capital-gains-tax` (kept).
- **Gap-mode tag:** `DEPTH` (primary — page is ~1,400 words covering the post-2020 restriction accurately at high level but missing: TCGA 1992 s.223B verbatim statute spine + HMRC CG64710 manual reference, the pre-vs-post-April-2020 transition mechanics for properties straddling the cut-off date in detail, the lower-of-three-amounts computation under s.223B(4), the interaction with the s.222(6) one-residence-per-couple rule, the rent-a-room scheme distinction, the FAQ-volume targeting specific zero-click landlord queries) + `STALE_FIGURES` (secondary — **line 129 contains the F-9 pattern adjacent**: "Property held in a limited company isn't subject to CGT — it pays corporation tax on capital gains instead." The "isn't subject to CGT" phrasing followed immediately by "pays corporation tax on capital gains" is technically correct (companies pay CT on chargeable gains, not CGT) but the wording reads ambiguously. Plus "The corporation tax rate is 19% on profits up to £250,000 and 25% on profits above that." — CT rates verified correct per §21.4 LOCKED. Line 137 has "Remember, capital gains tax on residential property is charged at 18% for basic rate taxpayers and 24% for higher and additional rate taxpayers" — correct per §5 LOCKED, no drift) + `STRUCTURE` (tertiary — 4 FAQs is below 10-14 target; no decision table; one worked example with round numbers but lacks the statute spine + the post-2020 computation specifics; no rates table).
- **"Why this rewrite" angle:** the legacy page got the SUBSTANCE largely right (post-April-2020 shared-occupation restriction correctly framed in 8 of 8 H2s — no F-9 violation on Lettings Relief itself; this is the OPPOSITE of B2-B1 PRR which had the pre-2020 framing). What it lacks is the STATUTE spine + HMRC manual reference + the lower-of-three computation specifics + the wider FAQ coverage. Plus the closing "Consider SPV Structures" sub-section has the F-9-adjacent CGT-vs-CT framing ambiguity that needs an unambiguous fix per §13 LOCKED. The rewrite is depth-add + statute-anchor + structure-lift, not factual-fix. This page is the SHORTER of the 3 Sub-bucket B briefs (target 2,200-2,600 words) because the topic is genuinely narrow post-restriction; the answer-shape is "most landlords no longer qualify, here's exactly when you DO + how to compute it".

---

## Current page snapshot (Stage 2 — pulled from filesystem; no `page_content_map` row)

**Supabase `page_content_map` row:** **none.** Page has never been parsed (parser only walks pages with GSC impressions ≥ N threshold; this page's 2 impressions are below the walker's threshold).

**Filesystem source read (175 lines):**
- `metaTitle`: "Letting Relief 2026: Worked Example for Shared Occupancy" (56 chars)
- `metaDescription`: "Only landlords who shared their home with tenants qualify for letting relief. See a worked example showing how the £40,000 relief is calculated." (147 chars)
- Word count: ~1,400 (estimate from 175-line markdown)
- 9 H2 sections (What Was Letting Relief Before April 2020 / What Changed in April 2020 / When Does Letting Relief Still Apply [+2 H3] / How Letting Relief Works in Practice / Transitional Rules for Pre-April 2020 Lettings / Impact on Different Landlord Types [+2 H3] / Planning Around the Letting Relief Changes [+3 H3] / Calculating Your Position and Record Keeping / What This Means Going Forward)
- 4 FAQs in frontmatter `faqs:` array (Can I still claim £40k in 2026 / What happened April 2020 / Old rules pre-2020 / Convert to flats)
- 1 worked example (10-year ownership / 8-year main residence / 2-year shared letting / £100k gain / PRR £80k / letting relief covers £20k → zero taxable gain). **Critical defect:** the example doesn't show the lower-of-three computation explicitly; it just states "could potentially qualify for letting relief, reducing your taxable gain to zero" without the computation walkthrough.
- Has `metaTitle_prev` + `metaDescription_prev` fields — prior meta rewrite attempted
- Internal links: 5 (CGT pillar / PRR (B2-B1) / LtdCo pillar / property-investment-tax pillar / what-does-a-property-accountant page implied)
- Outbound authority links: 0 (no gov.uk / legislation.gov.uk / HMRC manual citations — F-9 pattern adjacent risk)
- Last meaningful edit: 2026-04-10 (frontmatter `date`)
- **The page CONTAINS THE ONLY EM-DASH in the body at line 119 ("These changes hit 'accidental landlords' hardest — those who moved house...")** — violates §13 LOCKED no-em-dashes rule. Must replace with comma / parenthesis / full stop.

**Drift hazards in current body (critical, all load-bearing for rewrite):**

- **Line 119 — EM-DASH VIOLATION (LOW but visible):** "These changes hit 'accidental landlords' hardest — those who moved house but kept their previous home as a rental property." Replace the em-dash with a comma or full stop per §13 LOCKED.
- **Line 129 — F-9 ADJACENT FRAMING (MEDIUM):** "Property held in a limited company isn't subject to CGT — it pays corporation tax on capital gains instead." This is technically correct (companies pay CT on chargeable gains, not CGT) but the phrasing "isn't subject to CGT" reads as if companies escape capital-gains taxation altogether. Plus the em-dash. Rewrite to: "A limited company's property disposal is taxed under the Corporation Tax framework (CTA 2009 + CTA 2010) on the chargeable gain, not under the Capital Gains Tax (CGT) framework that applies to individuals. The same gain is computed; the rate framework is different. For 2026/27, corporation tax is 19% on profits up to £250,000 and 25% above that threshold, per §21 LOCKED."
- **Line 91 — UNVERIFIED CASE REFERENCE / MISSING STATUTE (HIGH):** "Let's say you own a property that has gained £100,000 in value. You lived there for 8 years as your main home, then shared it with lodgers for 2 years before selling. [...] The PRR would exempt £80,000 of the gain (8/10 × £100,000). The remaining £20,000 gain from the letting period could potentially qualify for letting relief, reducing your taxable gain to zero." The walkthrough is right in outcome but doesn't show the LOWER-OF-THREE computation under TCGA 1992 s.223B(4) (lower of: PRR already given £80k / £40k cap / chargeable gain on let portion £20k = £20k). Rewrite must show the computation explicitly.
- **Line 96-99 (the "Transitional Rules for Pre-April 2020 Lettings" H2):** "If you started letting your property before 6 April 2020, there are transitional arrangements: The old letting relief rules apply to the period up to 5 April 2020. For any letting after 6 April 2020, the new restricted rules apply. This means if you moved out of your home in 2018 and let it until selling in 2026, you could claim letting relief for the period from 2018 to April 2020, but not for the period from April 2020 onwards (unless you moved back in and shared with tenants)." This is broadly correct framing but oversimplifies. Per HMRC CG64710 (verified 2026-05-24): the cut-off applies to the DATE OF DISPOSAL, not to the date of letting. For a disposal on or after 6 April 2020, the post-2020 restricted rules apply to the ENTIRE letting period of that disposal — including any period before April 2020 that the property was let. The 2018-2026 letting example in the legacy body would NOT get any Lettings Relief on disposal in 2026 (the entire letting period falls under post-2020 rules because the disposal date is post-2020), UNLESS the owner is in shared occupation. This is a SUBSTANTIVE factual error in the transitional framing.
- **Line 132 — "Planning" framing on PRR (LOW):** "If you're planning to let out your home, consider whether extending your period of residence might be beneficial before making the switch to rental." Correct general framing; could be tightened to reference the s.223(3) deemed-occupation Conditions A/B + the bookend requirement (must be main residence before AND after the absence).
- **Line 137 — TAX RATES (correct per §5 LOCKED, no fix needed):** "capital gains tax on residential property is charged at 18% for basic rate taxpayers and 24% for higher and additional rate taxpayers." Confirmed current.

**Drift hazards NOT present (correctly handled):**
- The post-April-2020 shared-occupation rule IS correctly framed throughout (8 of 8 H2s correct on this point) — matches §5 LOCKED + TCGA 1992 s.223B + HMRC CG64710. This is the OPPOSITE of B2-B1 PRR's stale framing. **The page name "2026 changes" is misleading but the body substance is right.**
- The £40,000 cap IS correctly framed (line 57) — matches s.223B(4)(b).
- The 18%/24% residential CGT rates ARE current — matches §5 LOCKED.
- The CT rates 19%/25% for 2026/27 ARE correct per §21.4 LOCKED.
- The "shared occupancy with tenants" requirement IS the correct trigger per s.223B — matches §5 LOCKED.

---

## GSC angle (last 90 days) — REAL DATA from `gsc_query_data`

**Pulled 2026-05-24 PM via `python -m optimisation_engine.track2.pull_page_data --slug letting-relief-landlords-2026-changes --days 90`.**

**Aggregate:** **2 impressions / 0 clicks / 1 distinct query / position 3.0** in 90-day window. **0 GA4 rows.** No competitor SERPs stored. No page_content_map row.

| imp | clk | avg pos | CTR | query |
|---:|---:|---:|---:|---|
| 2 | 0 | 3.00 | 0.00% | lettings relief |

**Pattern:** the page IS ranking at position 3 for the bare "lettings relief" query — the right page in the right SERP slot. But the topic-volume is tiny (only 2 impressions in 90 days for the only matching query) which reflects the post-2020 reality: Lettings Relief is now a niche relief for shared-occupation only, and the addressable query volume has collapsed to a fraction of what it was pre-2020.

**Strategic conclusion:** rewrite holds the position-3 slot through depth + freshness + statute spine, but should NOT expect a meaningful CTR-lift from rewrite alone (the impression volume is intrinsically low). Realistic post-rewrite target: 10-30 impressions / 90 days within 6-12 months if the depth + statute anchoring + FAQ widening pulls in adjacent long-tail queries ("can I claim lettings relief in 2026" / "lettings relief shared occupancy worked example" / "letting relief after 2020 restriction" / "letting relief £40000 cap" / "letting relief vs ppr"). Page is defensible as REWRITE because it owns the SERP slot for the bare query + the slug carries calendar-year framing that gets re-queried; not a candidate for REDIRECT.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined Stage 2)

**Primary: DEPTH.** Page covers the post-2020 restriction accurately at high level but lacks: TCGA 1992 s.223B verbatim statute spine (the section was inserted by FA 2020 — verified 2026-05-24 — and the legacy body never cites the section number), HMRC CG64710 manual reference (the authoritative HMRC working position on Lettings Relief — verified 2026-05-24), the lower-of-three-amounts computation under s.223B(4) shown explicitly in the worked example, the substantive transitional-rule correction (the cut-off is the DATE OF DISPOSAL not the date of letting — current line 96-99 oversimplifies), the interaction with the s.222(6) one-residence-per-couple rule for spouses, the rent-a-room scheme distinction (which is a separate relief that DOES NOT require shared occupation in the s.223B sense and has its own £7,500/year exemption).

**Secondary: STRUCTURE.** 4 FAQs is below the 10-14 best-in-class target. No decision table to route the reader (Did I share with tenants? Was the disposal post-April-2020? → Reliefs available). The single worked example needs the lower-of-three computation walkthrough. No rates table.

**Tertiary: STALE_FIGURES (minor — one em-dash + one F-9-adjacent corporate framing ambiguity).** The em-dash at line 119 violates §13 LOCKED (trivial fix). The "isn't subject to CGT" phrasing at line 129 reads as if companies escape capital-gains taxation; rewrite must align with the §13 + §21.4 LOCKED unambiguous framing.

**Not present: CTR-FAIL** (page is at position 3 for the bare query — the SERP positioning is fine, the issue is intrinsic query volume); **not CANNIBAL** (no rewritten or in-flight Lettings Relief sibling — the page owns the slug + intent uniquely); **not INTENT-MISMATCH** (the page intent IS Lettings Relief and the SERP positioning confirms it's matching the right intent — the issue is just that the intent has a small addressable volume post-2020).

**Load-bearing fix sequence (ordered by ROI):**

1. **Fix the substantive transitional-rule framing** at lines 96-99 — the cut-off applies to the DATE OF DISPOSAL, not the date of letting. Per TCGA 1992 s.223B (inserted by FA 2020, in force "with effect in accordance with s. 24(11) of the amending Act" per WebFetch 2026-05-24) + HMRC CG64710 (verified 2026-05-24 — "Different rules for disposals on or after 6 April 2020 versus before that date"): for a disposal on or after 6 April 2020, the post-2020 restricted rules apply to the ENTIRE letting period. The legacy body's "2018-2026 letting could claim relief for 2018-2020 portion" example is WRONG — a disposal in 2026 (post-April-2020) gets the post-2020 rules applied to the whole letting period; no Lettings Relief unless the owner was in shared occupation. **MANDATORY — substantive factual fix.**
2. **Add statute spine** — TCGA 1992 s.223B verbatim citation throughout, plus HMRC CG64710 manual cross-reference, plus gov.uk/tax-sell-home/let-out-part-of-home consumer-authority anchor. All three verified live 2026-05-24.
3. **Show the lower-of-three computation under s.223B(4) in the worked example** — replace the current "could potentially qualify, reducing taxable gain to zero" with: "Letting relief is the lower of: (a) PRR already given = £80,000; (b) £40,000 cap; (c) chargeable gain on the let portion = £20,000. Lowest = £20,000. So the letting relief covers the full £20,000 letting-period gain. Taxable gain after PRR + LR = £0."
4. **Fix the line 119 em-dash** (§13 LOCKED violation).
5. **Fix the line 129 F-9-adjacent corporate framing** — replace "Property held in a limited company isn't subject to CGT — it pays corporation tax on capital gains instead" with the unambiguous §13 + §21.4 framing: "A limited company's property disposal is taxed under the Corporation Tax framework (CTA 2009 + CTA 2010) on the chargeable gain, not under the CGT framework that applies to individuals. For 2026/27, corporation tax is 19% on profits up to £250,000 and 25% above that threshold."
6. **Add a §"How Lettings Relief and PRR interact for spouses" H2** covering the s.222(6) one-residence-per-couple rule + the per-owner application of Lettings Relief on the let portion + the W5 C7 cross-link for the joint-ownership PRR mechanics + the B2-B1 cross-link for general PRR theory.
7. **Add a §"Lettings Relief vs Rent-a-Room scheme" sub-section** — Rent-a-Room is a separate relief at ITTOIA 2005 ss.784-802 with its own £7,500/year exemption; it sits alongside PRR and doesn't disturb main-residence status; it's a different mechanism from Lettings Relief which is the CGT-disposal-time relief under s.223B. Many readers confuse the two. Clarify.
8. **Add 1 decision table** "Do I qualify for Lettings Relief?" routing on: (Was the disposal on or after 6 April 2020? → Y → Did I share occupation with tenants during the let period? → Y → Did the let portion produce a chargeable gain after PRR? → Y → Lettings Relief AVAILABLE (lower of three); N at any node → NOT AVAILABLE). Plus a parallel row for "Did the disposal happen BEFORE 6 April 2020?" → "Apply pre-2020 rules to the whole letting period; cite HMRC CG64710 for pre-2020 framework".
9. **FAQ count 4 → 12-14** with each FAQ targeting a real landlord-intent question:
    - Existing 4 (refresh wording + add statute cites): Can I still claim £40k in 2026 / What happened April 2020 / Old rules pre-2020 / Convert to flats
    - "What is the statutory basis for Lettings Relief?" (TCGA 1992 s.223B inserted by FA 2020; HMRC CG64710)
    - "Does the April 2020 cut-off apply to the date of letting or the date of disposal?" (date of disposal; correction to the legacy framing)
    - "How is Lettings Relief computed under s.223B(4)?" (lower of three: PRR already given / £40,000 cap / chargeable gain on the let portion)
    - "Can I claim Lettings Relief and PRR on the same disposal?" (yes — they are designed to work together; PRR exempts the main-residence period + final 9 months; LR exempts the shared-occupation let portion up to £40k cap)
    - "Does shared occupation mean shared common areas (kitchen, bathroom)?" (yes per HMRC CG64710 working position)
    - "What if I let to family members at a discount — does that count as shared occupation?" (verify HMRC position at execution; likely yes if the family member is a separate household tenant)
    - "How does Lettings Relief interact with the Rent-a-Room scheme?" (separate reliefs; RaR is income-tax exemption; LR is CGT-disposal relief; they can coexist on the same property in the same year)
    - "Can both spouses claim Lettings Relief if the property is jointly owned?" (yes per-owner — each spouse claims their share of Lettings Relief subject to the £40k cap per owner per disposal; cross-link to W5 C7 for joint-ownership PRR mechanics)
    - "What if I'm a non-resident landlord — does Lettings Relief apply to my NRCGT computation?" (verify §17.4 + B2-C1 cross-link; PRR + Lettings Relief mechanics apply to UK-residential-property NRCGT disposals)
    - "How long do I need to share occupation with tenants?" (per HMRC CG64710 — "during the relevant period" of the letting; minimum-duration test verifies at execution)
    - "What records do I need to evidence shared occupation?" (tenancy agreements specifying shared common areas; utility bills showing one address for both owner and tenant; council tax for the whole property in owner's name with HMO licence not required at the shared-occupation scale)
10. **Update internal links** — refresh PRR cross-link (currently `principal-private-residence-relief-landlords` line 89 — already points to B2-B1) + add hard forward-link to B2-B1 from the §"Lettings Relief and PRR interaction" H2 + add W5 C7 cross-link from the §"How Lettings Relief and PRR interact for spouses" H2 + add B2-B2 rollover relief cross-link from the §"Planning Around the Letting Relief Changes" H2 + update the LtdCo pillar reference to align with the corrected F-9-adjacent framing.
11. **Update metaTitle** — current "Letting Relief 2026: Worked Example for Shared Occupancy" is fine; slight improvement: "Lettings Relief 2026/27: Post-2020 Restriction + £40k Cap + Worked Example" (75 chars — too long; trim to "Lettings Relief 2026/27: Post-2020 Rules + £40k Cap" (51 chars)).
12. **Update metaDescription** — current "Only landlords who shared their home with tenants qualify for letting relief. See a worked example showing how the £40,000 relief is calculated." (147 chars) is good; slight improvement adding the statute spine: "Lettings Relief (TCGA 1992 s.223B) post-2020: only shared-occupation landlords qualify. £40k cap, worked example with lower-of-three computation. UK 2026/27." (158 chars — at limit).

---

## Competitor URLs (Stage 2 — verified live 2026-05-24 via WebFetch)

| URL | Status | Word count | FAQs | Statute cites | Stale figures | Coverage signals |
|---|---|---|---|---|---|---|
| https://www.legislation.gov.uk/ukpga/1992/12/section/223B | **200 OK + operative + verified 2026-05-24** | (statute) | n/a | self | none | s.223B inserted by FA 2020; shared-occupation requirement; £40,000 cap; lower of 3 amounts under subsection (4) "(a) the non-chargeable gain under section 223, or (b) £40,000". **The statute spine for our rewrite — cite verbatim.** |
| https://www.legislation.gov.uk/ukpga/1992/12/section/224 | **200 OK + operative + verified 2026-05-24** | (statute) | n/a | self | none | s.224 is NOT Lettings Relief (it's apportionment + restrictions + reference to s.225D). **IMPORTANT: the dispatch prompt for this brief cited s.224 as the Lettings Relief statute. That is wrong. The correct cite is s.223B (inserted by FA 2020) — verified 2026-05-24. Surface to manager via F-23 statute-citation-drift flag.** |
| https://www.gov.uk/tax-sell-home/let-out-part-of-home | **200 OK + content verified 2026-05-24** | ~250 (consumer-summary depth) | 0 | TCGA references implicit | none | gov.uk consumer page: post-6-April-2020 Lettings Relief requires shared occupation; £40,000 cap; lower of 3 amounts; "Letting Relief does not cover any proportion of the chargeable gain you make while your home is empty"; the 9-months rule for PRR (with prior-period table: 9 months from 6 Apr 2020 / 18 months 6 Apr 2014 to 6 Apr 2020 / 36 months for disabled / long-term care). **Cross-reference + link to as the consumer-authority anchor.** |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg64710 | **200 OK + content verified 2026-05-24** | ~500 (manual-page depth) | 0 | TCGA 1992 s.223B + s.223(4) ✓ | none | HMRC Lettings Relief page. Confirms post-6-April-2020 restriction; £40,000 cap; lower-of-three computation; cross-references CG64230/CG64723/CG64721. "Different rules for disposals on or after 6 April 2020 versus before that date" — **the source for the corrected transitional-rule framing.** |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg64200 | **200 OK + content verified 2026-05-24** | ~600 (manual-page depth) | 0 | TCGA 1992 ss.222-226 ✓ | none | HMRC PRR intro page. Useful for the §"How Lettings Relief and PRR interact" H2 cross-reference. |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg64985 | **200 OK + content verified 2026-05-24** | ~400 (manual-page depth) | 0 | TCGA 1992 s.223 ✓ | none | HMRC final-period-exemption page. Cite for the 9-months PRR rule cross-reference. |
| Third-party UK competitor pages | **Predominantly blocked or 404** | (multiple blocked / not-found at brief-drafting time) | n/a | n/a | n/a | Multiple WebFetch attempts on UK competitor pages (ukpropertyaccountants.co.uk / tax-insider.co.uk / unbiased.co.uk variants) returned permission-denied or 404 during this brief's fetch budget. **Implication:** at execution, re-attempt with broader User-Agent rotation per F-12 lesson. The authority spine (statute + HMRC + gov.uk consumer) is sufficient as written. |

**Competitor depth ceiling for this query class:** the gov.uk + HMRC manual pair (CG64710 + gov.uk/tax-sell-home/let-out-part-of-home) is the authority — third-party UK competitor pages typically run 1,000-1,800 words with 0-2 FAQs and 0-1 statute citations. Our 2,200-2,600 word rewrite with 12-14 FAQs + 4-5 verified statute citations + 3 HMRC manual cross-references + lower-of-three worked example + decision table puts us decisively best-in-class.

**What to borrow:** the gov.uk/tax-sell-home page's prior-period table for the 9-months PRR rule (replicate the same date table in our rates-table-at-top format). The CG64710 statute-reference pattern (citing s.223B + s.223(4) together).

**What to differentiate against:** the existing legacy body's biggest weakness vs the authority spine is the missing statute citation + the substantive transitional-rule error (date-of-disposal vs date-of-letting) + the missing lower-of-three computation walkthrough. Fixing these puts us decisively ahead.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (refreshed 2026-05-24 PM for Batch 2 prep).

| Source | Slug | Status | Resolution |
|---|---|---|---|
| Residual (own) | letting-relief-landlords-2026-changes | REWRITE | self — rewrite in place as Lettings Relief specialist depth post-2020 |
| Excluded (rewritten 2026-05-21) | capital-gains-tax-property-complete-guide-uk (Session C #47) | CGT pillar | No collision — pillar's reliefs sub-section briefly mentions Lettings Relief with a forward-link to this page. Reciprocal forward-link from our intro. |
| Excluded (rewritten 2026-05-21) | cgt-rates-property-2026-27-current-rates-explained (gold-reference trial T4) | CGT rates explainer | No collision — rates page references reliefs briefly + forward-links here. Reciprocal forward-link from our worked example tax computation. |
| Excluded (rewritten 2026-05-21) | cgt-annual-exempt-amount-3000-allowance-2026-27 (Session 0 #14) | AEA depth | No collision — AEA applies after PRR + Lettings Relief. Forward-link from our worked example. |
| Excluded (rewritten 2026-05-21) | cgt-payment-deadlines-property-sales-2026 (Session C #23) | 60-day deadlines | No collision — forward-link from closing "Reporting your post-LR CGT" reminder. |
| Excluded (rewritten 2026-05-21) | cgt-gifting-property-family-members-uk (Session B #46) | Gifting reliefs | No collision — brief cross-link from our "Other CGT reliefs" mention. |
| Excluded (rewritten 2026-05-21) | cgt-calculation-selling-buy-to-let-property-step-by-step (Session C #35) | Calc walkthrough | No collision — forward-link from worked example for full BTL-disposal calc context. |
| Excluded (rewritten 2026-05-21) | cgt-property-transfer-spouse (rewritten via B1-C3 in Batch 1) | Spouse no-gain-no-loss | No collision — brief mention in §"How Lettings Relief and PRR interact for spouses" H2 + forward-link. |
| Wave 5 (shipped 2026-05-23) | cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics (C7) | PRR for joint-owned property | No collision — strong cross-link from §"How Lettings Relief and PRR interact for spouses" H2 (W5 C7 covers PRR per-owner mechanics + s.222(6); this page covers Lettings Relief on the let portion). Reciprocal forward-link both ways. |
| Wave 5 (shipped 2026-05-23) | form-17-declaration-beneficial-interest-property-mechanics-filing-revocation (C1) | Form 17 mechanics | No collision — brief mention in §"Per-owner application of Lettings Relief" sub-section if covered (Form 17 doesn't affect Lettings Relief; Lettings Relief follows actual occupation, not beneficial share). |
| Wave 6 (shipped 2026-05-24) | fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics (C8) | FHL grandfathered BADR | Cross-link only — brief mention in §"FHL post-abolition and Lettings Relief" if covered. FHL was never within s.223B (FHL was a separate income/CGT regime); post-abolition FHL falls under standard residential rental rules → still no Lettings Relief unless shared occupation. |
| Residual (intra) | **principal-private-residence-relief-landlords (B2-B1, this batch in-flight)** | **PRR** | **Strong adjacent partnership — explicit cross-link relationship.** B2-B1 covers PRR with Lettings Relief as a sub-section (forward-linking to this page for full mechanic); this page covers Lettings Relief specialist depth with PRR as a prerequisite (back-linking to B2-B1 for full PRR theory). **NOT a cannib — explicit differentiator: B2-B1 = PRR core + Lettings Relief sub-section gateway; B2-B3 = Lettings Relief specialist + PRR prerequisite reference.** Reciprocal forward-link mandatory. |
| Residual (intra) | rollover-relief-property-landlords (B2-B2, this batch in-flight) | Rollover relief s.152 | No collision — rollover is a different relief; brief cross-link from "Other CGT reliefs" mention. B2-B2's §"Alternative CGT Reliefs" forward-links here for Lettings Relief depth. |
| Residual (intra) | reduce-cgt-property-disposal-uk (B1-A2, Batch 1 brief drafted) | CGT reduction survey | No collision — B1-A2 is survey-as-router with Lettings Relief as one lever; brief mention + forward-link to this page from B1-A2's LR sub-section. |
| Residual (intra) | cgt-deferral-strategies-property-investors-uk (B1-A1, Batch 1 brief drafted) | Deferral mechanics | No collision — deferral is mechanism-oriented; LR is exemption-oriented. Brief cross-link only. |

**Conclusion:** REWRITE in place as Lettings Relief specialist depth post-2020. Clean cannibalisation against all sources. Strong adjacent partnership with B2-B1 PRR — explicit reciprocal forward-link mandatory.

---

## Closest existing pages (Stage 2)

Internal-link partners (to and from this page):

- **CGT pillar:** `capital-gains-tax-property-complete-guide-uk` — back-link target; reciprocal forward-link from our intro.
- **CGT rates (gold-reference):** `cgt-rates-property-2026-27-current-rates-explained` — forward-link from worked example tax computation.
- **AEA depth:** `cgt-annual-exempt-amount-3000-allowance-2026-27` — forward-link from worked example.
- **60-day deadlines (rewritten canonical):** `cgt-payment-deadlines-property-sales-2026` — forward-link from "Reporting your post-LR CGT" closing reminder.
- **PRR (B2-B1, this batch in-flight):** `principal-private-residence-relief-landlords` — hard forward-link from §"Lettings Relief and PRR interaction" H2. Reciprocal back-link from B2-B1's Lettings Relief sub-section. **MANDATORY.**
- **Joint-ownership PRR (Wave 5 C7):** `cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics` — forward-link from §"How Lettings Relief and PRR interact for spouses" H2.
- **Form 17 (Wave 5 C1):** `form-17-declaration-beneficial-interest-property-mechanics-filing-revocation` — brief cross-link from "Per-owner application of Lettings Relief" sub-section if covered.
- **Spouse transfer (rewritten via B1-C3):** `cgt-property-transfer-spouse` — brief mention in spouses interaction H2.
- **Rollover relief (B2-B2, this batch in-flight):** `rollover-relief-property-landlords` — brief cross-link from "Other CGT reliefs" mention.
- **Reduce-CGT survey (B1-A2, Batch 1 brief drafted):** `reduce-cgt-property-disposal-uk` — reciprocal forward-link from "Other CGT planning levers" closing.
- **Deferral survey (B1-A1, Batch 1 brief drafted):** `cgt-deferral-strategies-property-investors-uk` — brief cross-link.
- **Calculation walkthrough (rewritten):** `cgt-calculation-selling-buy-to-let-property-step-by-step` — forward-link from worked example.
- **Gifting (rewritten):** `cgt-gifting-property-family-members-uk` — brief cross-link from "Other CGT reliefs" mention.
- **LtdCo pillar (rewritten):** `buy-to-let-limited-company-complete-guide-uk` — forward-link from §"Consider SPV Structures" sub-section (replaces current line 129 framing).
- **Property investment tax pillar (rewritten):** `property-investment-tax-uk-complete-guide-2026` — keep current forward-link.
- **FHL grandfathered BADR (Wave 6 C8):** `fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics` — brief cross-link from §"FHL post-abolition and Lettings Relief" if covered.
- **What does a property accountant do:** `what-does-a-property-accountant-do` — anchor link at end of body for the closing inline-CTA.

---

## House-position references (Stage 1)

- **§5 CGT on UK residential property (2026/27)** [LOCKED 2026-05-23]: primary lock. 18%/24% residential CGT rates; £3,000 AEA; **post-2020 Lettings Relief restriction (shared-occupation gateway)**. The legacy page already aligns with §5 on the substance — the rewrite hardens it with statute spine. Companies-pay-Corporation-Tax-not-CGT position (F-9): apply unambiguously in the §"Consider SPV Structures" sub-section (line 129 fix).
- **§6 FHL — abolition transition** [LOCKED 2026-05-22]: relevant for the §"FHL post-abolition and Lettings Relief" mention. FHL was never within s.223B; post-abolition FHL falls under standard residential rules; no Lettings Relief unless shared occupation.
- **§7 April 2027 property income tax surcharge** [LOCKED]: NOT directly relevant to Lettings Relief (relief is CGT-side; surcharge is property INCOME side). No mention needed unless closing context warrants the §7 hedge for the CGT-rates-remain-18%-24% framing.
- **§13 Do-not-write list (general)** [LOCKED]: NO pricing; NO real client names; **NO em-dashes (line 119 fix mandatory)**; NO emoji in body.
- **§17.4 NRCGT** [LOCKED 2026-05-22]: brief mention in FAQ on "non-resident landlord Lettings Relief" — PRR + Lettings Relief mechanics apply to UK-residential-property NRCGT disposals; cross-link to W2 expat content + B2-C1.
- **§21.4 Salary vs dividends in property SPV 2026/27 + CT rates** [LOCKED 2026-05-23 Wave 4 extension]: load-bearing for the §"Consider SPV Structures" sub-section. CT 19% / 25% per the spine; replace line 129 ambiguity with the unambiguous framing.
- **§24 Form 17 + joint ownership + spouse-mechanics** [LOCKED 2026-05-23]: load-bearing for the §"How Lettings Relief and PRR interact for spouses" H2. Lettings Relief follows actual occupation per s.223B (not beneficial share); Form 17 doesn't affect Lettings Relief.

---

## House-position conflict flag (Stage 2)

**Confirmed conflicts — F-23 + F-24 (HIGH + MEDIUM).**

**Flag (a) — STATUTE_CITATION_DRIFT (HIGH, methodology-level):** the dispatch prompt for this Sub-bucket B sub-agent cited "TCGA 1992 s.224 post-FA-2020 amendment" as the Lettings Relief statute. **That is wrong.** Verified 2026-05-24 via WebFetch:
  - **TCGA 1992 s.223B** (inserted by FA 2020) is the post-2020 Lettings Relief statute — shared-occupation requirement, £40,000 cap, lower-of-three computation.
  - **TCGA 1992 s.224** is "Amount of relief" qualifier — apportionment for mixed use, restrictions, reference to s.225D (adult-placement-carers). NOT Lettings Relief.
  
  The pre-2020 Lettings Relief was under former s.223(4)/(5)(b), not s.224. The substance was substituted into the new s.223B framework by FA 2020. This is a statute-citation-drift catch worth raising to manager for future-prompt accuracy and for cross-residual audit (if other Track 2 briefs were dispatched with the same s.224 cite, they need verification).

**Flag (b) — F-9 ADJACENT FRAMING + EM-DASH VIOLATION (MEDIUM):** line 119 em-dash + line 129 "isn't subject to CGT — pays corporation tax" ambiguity. Both fixed at rewrite per §13 + §21.4 LOCKED. Not a substantive factual error but a presentation issue.

**Flag (c) — SUBSTANTIVE TRANSITIONAL-RULE ERROR (HIGH):** line 96-99 oversimplifies the transitional cut-off. The cut-off is the date of DISPOSAL, not the date of letting. A 2018-2026 letting on a 2026 disposal gets the post-2020 rules applied to the whole letting period (no Lettings Relief unless shared occupation). The legacy framing is wrong. Fixed at rewrite per HMRC CG64710 verified 2026-05-24.

**Site-wide flags to raise (append to track2_site_wide_flags.md):**

`F-23 | 2026-05-24 PM | HIGH | (methodology-level) | STATUTE_CITATION_DRIFT | Dispatch prompt for Sub-bucket B / B2-B3 cited TCGA 1992 s.224 as the Lettings Relief statute. Verified 2026-05-24: s.224 is "Amount of relief" qualifier (apportionment + restrictions + s.225D reference), NOT Lettings Relief. The post-2020 Lettings Relief statute is s.223B (inserted by FA 2020). Pre-2020 Lettings Relief was former s.223(4)/(5)(b). Recommend manager audit any other Track 2 brief dispatched with the s.224-as-Lettings-Relief cite + future-prompt accuracy update. Pattern: F-7 (PIM4101) + F-8 (TCGA s.4 substituted) + F-13 + F-18 statute-citation drift pattern continues — manager-prompt statute-cite verification before dispatch is now a clear pattern requirement.`

`F-24 | 2026-05-24 PM | HIGH | letting-relief-landlords-2026-changes | STALE_FACTUAL | Substantive transitional-rule error in legacy body lines 96-99. Page states the April 2020 cut-off applies to the date of LETTING, allowing a 2018-2020 portion to claim Lettings Relief even on a 2026 disposal. Verified 2026-05-24 via HMRC CG64710: the cut-off applies to the date of DISPOSAL, not the date of letting. For a disposal on or after 6 April 2020, the post-2020 restricted rules apply to the ENTIRE letting period — no Lettings Relief unless shared occupation. This is a substantive factual error that misleads accidental landlords disposing post-April-2020. Rewrite must correct.`

---

## Authority links worth considering (Stage 2 — WebFetch verification status)

| URL | Verification status | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/1992/12/section/223B | **200 OK + operative + verified 2026-05-24** | Cite the post-2020 Lettings Relief statute verbatim |
| https://www.legislation.gov.uk/ukpga/1992/12/section/223 | **200 OK + operative + verified 2026-05-24** | Cite s.223(4) cross-reference + the 9-months PRR rule context |
| https://www.legislation.gov.uk/ukpga/1992/12/section/222 | **200 OK + operative + verified 2026-05-24** | Cite for the PRR prerequisite + s.222(6) one-residence-per-couple cross-rule |
| https://www.gov.uk/tax-sell-home/let-out-part-of-home | **200 OK + content verified 2026-05-24** | Consumer-authority cross-reference for shared-occupation rule + £40,000 cap |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg64710 | **200 OK + content verified 2026-05-24** | HMRC Lettings Relief authority — cite for the corrected transitional-rule framing |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg64200 | **200 OK + content verified 2026-05-24** | HMRC PRR intro — cite for the PRR prerequisite framework |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg64985 | **200 OK + content verified 2026-05-24** | HMRC final-9-months rule — cite for PRR + LR interaction |
| Finance Act 2020 s.24 (insertion of s.223B + amendments to ss.222-225) | Verify exact citation at execution | Cite as the legislative-source for the post-2020 framework |
| ITTOIA 2005 ss.784-802 (Rent-a-Room scheme) | Verify at execution | Cite for the §"Lettings Relief vs Rent-a-Room scheme" sub-section |
| HMRC CG64723 / CG64721 (cross-referenced from CG64710) | Verify at execution | Supplementary HMRC authority for the lower-of-three computation |
| HMRC CG64230 (cross-referenced from CG64710) | Verify at execution | PRR overlap with let portion |

**(Execution session selects 5-7 to actually cite in body — target 3 verified statutory + 3 HMRC manual + 1 gov.uk consumer.)**

---

## Universal rules (do not skip)

Inherits from `TRACK2_PROGRAM.md §4 sections 13 + 14`. Critical for this brief:

- **NO em-dashes** (per memory note + §13). **Line 119 em-dash MUST be replaced.**
- **NO pricing on-site** (per agency lead-gen handoff model + F-1).
- **Anonymised social proof only.**
- **LeadForm auto-injected by `BlogPostRenderer.tsx`.**
- **1-3 inline `<aside>` CTAs** at conversion moments (after lower-of-three worked example + before closing).
- **FAQs schema auto-emitted** from frontmatter (target 12-14 entries).
- **House position §5 + §13 F-9 Companies-pay-CT-not-CGT lock** in §"Consider SPV Structures" sub-section (line 129 fix — unambiguous framing).
- **House position §6 FHL post-abolition framing** if FHL mentioned.
- **TCGA 1992 s.223B is the post-2020 Lettings Relief statute** (verified 2026-05-24) — NOT s.224 (dispatch prompt error caught and flagged as F-23).
- **URL liveness + statute-content verification at execution** per §16.31 + F-7 + F-8.
- **Substantive transitional-rule fix (F-24) MANDATORY** — the cut-off is the date of DISPOSAL, not the date of letting.

---

## 19-step workflow (legacy-rewrite adaptation)

Inherits from `NETNEW_PROGRAM.md §7` with the 3 Track 2 deltas. Brief-specific notes:

- **Step 1 reading:** `docs/property/house_positions.md` §5, §6, §13, §17.4, §21.4, §24 in full before drafting body. Re-read B2-B1 PRR brief (this batch sub-bucket B) for the cross-link partnership.
- **Step 4:** verify TCGA 1992 s.223B against legislation.gov.uk + HMRC CG64710 (both verified 2026-05-24 at this brief drafting). Confirm the substantive transitional-rule fix per CG64710 ("Different rules for disposals on or after 6 April 2020 versus before that date").
- **Step 5:** re-fetch the 4 verified authority URLs at execution + re-attempt the blocked competitor URLs with broader User-Agent per F-12.
- **Step 6:** read the current source file in full to confirm no edit since 2026-04-10.
- **Step 7:** read closest-existing sibling pages (16 cross-links named above; aim to read at least B2-B1 PRR + W5 C7 joint-ownership PRR + the rewritten CGT pillar + the rewritten LtdCo pillar).
- **Step 8:** plan rewrite outline — 9-10 H2s (What Lettings Relief was pre-April-2020 / The post-2020 restriction [§5 + s.223B + CG64710] / When Lettings Relief still applies / Lower-of-three computation worked example / Transitional rules CORRECTED / Lettings Relief vs Rent-a-Room scheme / How Lettings Relief and PRR interact for spouses / Other CGT reliefs / Calculating + record keeping). 2,200-2,600 body words, 12-14 FAQs, 1 worked example with explicit lower-of-three walkthrough, 1 decision table.
- **Step 9:** rewrite at existing path. Preserve frontmatter `slug` + `canonical` + `date` (update `dateModified` to today). Update `metaTitle` (test the "2026/27" + "£40k Cap" + "Post-2020 Rules" angle). Update `metaDescription` with the statute spine reference.
- **Step 10:** site build must pass.
- **Step 11:** six checks per playbook §4.3 + **explicit text-search checks: (a) zero em-dashes (line 119 fix verified); (b) zero ambiguous "isn't subject to CGT" framing in corporate sub-section; (c) at minimum one citation to s.223B verbatim; (d) zero matches for "you could claim letting relief for the period from 2018 to April 2020" or similar legacy oversimplified transitional framing — replaced with date-of-disposal-cut-off framing per CG64710; (e) the lower-of-three computation MUST appear explicitly in the worked example.**
- **Step 12:** no redirect needed (REWRITE-in-place; clean cannib; SERP position-3 holds; slug owns the intent).
- **Step 13:** update existing `monitored_pages` row OR insert new one (page has minimal current GSC at position 3; 180-day monitoring window with the post-rewrite 10-30 imp target).
- **Step 14:** commit on main. Tracker edits via absolute path only.
- **Steps 15-19:** mark ✅ executed; update flags + heartbeat; next page in batch.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §5 CGT 2026/27 (18% / 24% + £3k AEA + post-2020 Lettings Relief framing): __ (substance already correct; statute spine added)
- §5 / §13 F-9 Companies-pay-CT-on-chargeable-gains-not-CGT unambiguous framing at SPV sub-section: __ MANDATORY (line 129 fix)
- §6 FHL post-abolition framing (if mentioned): __
- §7 April 2027 — CGT rates unaffected by the property-income surcharge (if mentioned): __
- §13 no-pricing / no-real-client-names / **no-em-dashes (line 119 fix MANDATORY)**: __
- §17.4 NRCGT cross-link on FAQ: __
- §21.4 CT rates 19% / 25% cited correctly: __
- §24 Form 17 / Lettings Relief independence (LR follows actual occupation, not beneficial share): __

### Comparison: before vs after
- Word count: ~1,400 → __
- H2 count: 9 (+ 5 H3) → __
- FAQ count: 4 → __
- Authority links: 0 → __
- Inline CTAs: 0 → __
- Worked examples: 1 (without lower-of-three walkthrough) → __ (1 worked + explicit lower-of-three computation MANDATORY)
- Decision table: 0 → __ (1 expected — "Do I qualify for Lettings Relief?" routing on date-of-disposal + shared-occupation + post-PRR gain)
- s.223B citation count: 0 → __ MUST BE ≥1
- Em-dash count: 1 (line 119) → __ MUST BE 0
- F-9-adjacent "isn't subject to CGT" framing: 1 (line 129) → __ MUST BE 0 (replaced with unambiguous CT-on-chargeable-gains framing)
- Substantive transitional-rule error (date-of-letting cut-off): 1 (line 96-99) → __ MUST BE 0 (replaced with date-of-disposal cut-off per CG64710)

### Foundational SEO hypothesis test
- Pre-rewrite GSC baseline (2026-02-24 to 2026-05-24): 2 imp / 0 clicks / 1 query at pos 3
- Post-rewrite expected: 10-30 impressions / 90 days within 6-12 months (intrinsically low addressable volume post-restriction)
- Verify at +90 / +180 days via monitored_pages detector

### Flags raised
- F-23 (carried from this brief): STATUTE_CITATION_DRIFT — dispatch prompt s.224 cite wrong; correct is s.223B
- F-24 (carried from this brief): STALE_FACTUAL — substantive transitional-rule error in legacy body (date-of-letting vs date-of-disposal cut-off)
- Any new flags surfaced: __

### 2-3 sentence summary
- (populated at execution time)
