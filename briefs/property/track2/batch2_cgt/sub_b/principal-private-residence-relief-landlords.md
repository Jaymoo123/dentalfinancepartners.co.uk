# Track 2 brief: principal-private-residence-relief-landlords

**Site:** property
**Brief type:** Legacy rewrite — Batch 2 Sub-bucket B (CGT reliefs — PRR / Rollover / Lettings)
**Source markdown path:** `Property/web/content/blog/principal-private-residence-relief-landlords.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/principal-private-residence-relief-landlords
**Stage 1 priority:** **M** — 4 imp / 90d (effectively invisible) BUT the slug owns a high-commercial-intent phrasing ("PRR for landlords") that 4 of the 5 top-position competitors at our SERPs are Irish-jurisdiction (revenue.ie / extra.ie / citizensinformation.ie) — Google clearly has a UK-PRR-for-landlords intent shortage that this page is positioned to fill once factual drift is corrected.
**Stage 1 date:** 2026-05-24
**Stage 2 enrichment date:** 2026-05-24 (data pulled from Supabase + WebFetched 4 authority URLs + 4 statute sections + Wave 5 C7 cross-link partner read)
**Cannibalisation status:** REWRITE — clean. Differentiator from Wave 5 C7 (`cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics`) confirmed: C7 is per-owner joint-ownership mechanics + s.222(5) nomination election + s.222(6) one-residence-per-couple rule; this page is general-PRR theory + final-9-months rule + Lettings Relief carve-out + the BTL accidental-landlord scenario. Intra-batch coordination with B2-C2 (`cgt-main-residence-election-two-properties`, s.222(5) election mechanics) — see §"Intra-batch coordination" below.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `principal-private-residence-relief-landlords`. The slug is the formal-name term ("Principal Private Residence Relief") plus the audience qualifier ("landlords") — strong commercial intent and the landlord-specific framing is what differentiates from generic homeowner-only PRR pages.
- **Category:** `capital-gains-tax` (kept).
- **Gap-mode tag:** `DEPTH` (primary — page is 1,635 words covering 8 H2s of the 12-section PRR territory; misses deemed-occupation depth, the spousal s.225B post-separation extension, the half-hectare permitted-area rule, the s.222(6) one-residence-per-couple cross-rule, the mixed-use restriction, and the post-2020 Lettings Relief restriction is misframed) + `STALE_FIGURES` (secondary — the body line 23 + line 61 Lettings Relief paragraph repeats the pre-April-2020 "£40,000 relief if main residence at some point + later let" framing in body, which is the F-9 pattern; the page's "£3,000 for 2025/26" AEA reference is one tax year behind; FAQ #3 says "letting relief (up to £40,000)" without the post-2020 shared-occupation qualifier) + `STRUCTURE` (tertiary — only 3 FAQs, no decision table for the "did I qualify for PRR / did I trigger Lettings Relief" routes, no worked example showing the time-apportionment formula with real numbers, no rates table).
- **"Why this rewrite" angle:** the legacy page is the right framing (PRR for landlords specifically, the accidental-landlord scenario) and the slug + meta line are well-shaped, but the body misframes the post-April-2020 Lettings Relief regime as if the pre-2020 rules still apply for accidental landlords (FAQ #3 + the entire "Letting Relief: Additional Protection" H2). This is the F-9 site-wide pattern caught on B1-A2 (reduce-cgt page) and predicted by the dispatch prompt for this brief. The rewrite must (a) lock to §5 LOCKED post-2020 shared-occupation rule via TCGA 1992 s.223B + HMRC CG64710 verbatim, (b) keep the accidental-landlord framing (which IS the right audience) but reframe the relief picture honestly (most accidental landlords no longer get Lettings Relief; they get final-9-months PRR + the pre-letting-period PRR proportion only), (c) backfill deemed-occupation depth (TCGA 1992 s.223(3) Conditions A and B — pre-letting + post-letting absences treated as occupation), (d) cross-link forward to Wave 5 C7 for joint-ownership angle and to B2-C2 for the s.222(5) election. Body lift to 2,800-3,200 words with 12-14 FAQs + 1 time-apportionment worked example + 1 mixed-use decision table.

---

## Current page snapshot (Stage 2 — pulled from filesystem + `page_content_map`)

**Supabase `page_content_map` row (2026-05-21 parse):**
- `word_count`: 1,635
- `section_count`: 12 (parser counts H2 + H3 as 12, matching the on-page header tree)
- `faq_count`: 0 *(parser bug per `competitor_rewrite_playbook.md` §6 — parser misses frontmatter `faqs:` array)*
- `title_tag`: "PPR Relief Calculation for Landlords (UK 2025/26) | Property Tax Partners"
- `meta_description`: "Cut CGT on a former home with PPR relief. Includes the 9-month final period, the calculation formula, and letting relief examples for the 2025/26 tax year." (158 chars — at limit) — **STALE: "2025/26" should be "2026/27"**
- `h1_text`: (empty — parser noise-stripping removed it per playbook §6; on-page H1 = "Principal Private Residence Relief for Landlords: Complete UK Guide")

**Filesystem source read (128 lines):**
- 8 H2 sections + 4 H3 sub-sections (What is PRR / Eligibility / How PRR is Calculated [+1 H3 Basic Calculation Method] / **Letting Relief: Additional Protection** [BIG STALE BLOCK] / Common Scenarios and Restrictions [+2 H3] / Planning Strategies / Interaction with Other Taxes / Record Keeping [+2 H3] / Related Reading)
- 3 FAQs in frontmatter `faqs:` array (Can I claim PRR on BTL / How long do I need to live / Renting out part of home)
- Has `metaTitle_prev` + `metaDescription_prev` fields — prior meta rewrite attempted (current meta narrows to a "Calculation" angle which is a fine differentiator but the tax year reference is wrong)
- 0 worked examples in body (only "if you owned for 20 years and lived 10 years" prose mention at H2 #1)
- Internal links: 4 (CGT pillar / FHL page / CGT 2026 rates+allowances page / spouse-transfer page) — note the FHL link points to `furnished-holiday-let-tax-rules-exemptions` which post-Wave-6 needs review for post-abolition framing
- Outbound authority links: 0 (no gov.uk / legislation.gov.uk / HMRC manual citations)
- Last meaningful edit: 2026-04-01 (frontmatter `date`)

**Drift hazards in current body (critical, all load-bearing for rewrite):**

- **Line 61-73 — STALE BLOCK on Lettings Relief (the entire "Letting Relief: Additional Protection" H2):** the section presents the pre-April-2020 framework as the current relief test: "To qualify for letting relief, you need: The property must qualify for some PPR relief / You must have let the property as residential accommodation / You were not resident in the property during the letting period". This is the pre-2020 rule under repealed s.223(4)/(5)(b). The post-2020 rule under TCGA 1992 s.223B (inserted by FA 2020) requires the OPPOSITE — the owner MUST be in shared occupation with the tenant during the let period. **This is the canonical F-9 pattern violation and the load-bearing rewrite fix.**
- **FAQ #3 (line 23) — STALE FRAMING:** "If you rent out part of your home while living there, the property can still qualify for principal private residence relief. The rental income part may be subject to capital gains tax on disposal, but this is often covered by letting relief (up to £40,000)." The "rent out part of your home while living there" framing is actually CORRECT for the post-2020 s.223B rule, but the surrounding context elsewhere on the page (the H2 "Letting Relief: Additional Protection") sets up the pre-2020 framework, making FAQ #3 read as if Lettings Relief is broadly available. Rewrite must reframe FAQ #3 to explicitly contrast pre-2020 vs post-2020 + lock to shared-occupation + post-FA-2020 statute citation.
- **Line 57 — STALE TAX YEAR REFERENCE:** "Calculate Taxable Gain: Total Gain − Exempt Amount − Annual Exemption (£3,000 for 2025/26)." Update to 2026/27 (same £3,000 figure per §5 LOCKED).
- **Line 98 — STALE TAX YEAR REFERENCE:** "You still benefit from the annual CGT exemption (£3,000 for 2025/26)." Same update.
- **Line 99 — POTENTIAL FHL LINK STALENESS:** the internal link to `furnished-holiday-let-tax-rules-exemptions` may carry pre-abolition framing (FHL was abolished from 6 April 2025 per §6 LOCKED + FA 2025 Sch 5). At minimum, the link context "furnished holiday lettings can sometimes qualify under specific circumstances" needs a post-abolition reframe — the cross-link should now route to a post-abolition explainer or to W6 C8 `fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics` for the grandfathered BADR picture.
- **Line 111 — UNSPECIFIED 4-year retention claim:** "You need to retain records for at least 4 years after the disposal." This is broadly right (s.12B TMA 1970 records retention) but should be cited correctly — for CGT self-assessment, the 22-month from end of tax year rule plus extension for enquiries applies; the 4-year figure aligns with assessment/discovery rather than retention specifically. Verify at rewrite per §16.31 / F-7 discipline.

**Drift hazards NOT present (good — these are correctly handled):**
- The 24% / 18% residential CGT rates ARE current (line 98) — matches §5 LOCKED.
- The "final 9 months" rule IS current (line 48) — matches TCGA 1992 s.223(1) post-FA 2020 (was 36 months pre-Dec 2003 / 18 months 6 Apr 2014 to 5 Apr 2020 / 9 months from 6 Apr 2020 per HMRC CG64985).
- The "0.5 hectares (approximately 1.2 acres)" permitted area IS current (line 86) — matches TCGA 1992 s.222(2)(b) "half a hectare" with the 1.24-acre conversion.

---

## GSC angle (last 90 days) — REAL DATA from `gsc_query_data`

**Pulled 2026-05-24 PM via `python -m optimisation_engine.track2.pull_page_data --slug principal-private-residence-relief-landlords --days 90`.**

**Aggregate:** **4 impressions / 0 clicks / 3 distinct queries** in 90-day window.

| imp | clk | avg pos | CTR | query |
|---:|---:|---:|---:|---|
| 2 | 0 | 12.00 | 0.00% | rent tax credit ppr meaning |
| 1 | 0 | 48.00 | 0.00% | ppr relief calculation |
| 1 | 0 | 100.00 | 0.00% | private principal residence |

**Pattern:** the page is showing for **the wrong intent on its highest-impression query.** "Rent tax credit PPR meaning" is an Irish-revenue.ie query (Ireland's Rent Tax Credit programme — confirmed by competitor pages at positions 1-5 all being Irish: extra.ie / tolley.co.uk / revenue.ie / revenue.ie / dsburge.co.uk). This is an INTENT-MISMATCH (gold-reference F-6 gap-mode code) — we'd never convert that query.

The "ppr relief calculation" query at position 48 IS the right intent for this page (calculation-focused, UK PRR), but at position 48 we're not in the SERP-eyeball-zone. The current meta title "PPR Relief Calculation for Landlords (UK 2025/26)" is correctly oriented at this query but the page rank is so deep that meta cannot help.

**GA4 engagement signal (real data from `ga4_page_data`):**
- 7 sessions / 7 active users / 0 engaged sessions in 90 days
- Engagement rate: 0.000 / bounce rate: 1.000
- **Average session duration: 1.9 seconds** — bounces immediately
- 0 conversions

**Read:** the few sessions arriving are on the wrong intent (Irish Rent Tax Credit) and bounce instantly. The page is effectively invisible at the right-intent depth. Same pattern as the airbnb trial + B1-A1/A2/A3 invisible-page cohort.

**Strategic conclusion:** as with the invisible-page cohort, the rewrite cannot be tuned to specific queries (no signal). Foundational rewrite for best-in-class depth + statute anchoring + sibling routing, with a 180-day monitored_pages window. Realistic post-rewrite target: 100-300 impressions / 90 days within 6-12 months at the right intent (UK landlord PRR queries), with a meaningful conversion rate vs Irish-jurisdiction impressions which were always going to bounce.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined Stage 2)

**Primary: DEPTH.** Page covers ~60-65% of the PRR depth a landlord-facing specialist page should cover. Missing or thin: TCGA 1992 s.223(3) Conditions A and B (deemed occupation periods — the 3-year "any reason", 4-year "work elsewhere in UK", any-period "work abroad" rules), s.225B post-separation deemed occupation (extended by Finance (No. 2) Act 2023), s.222(6) one-residence-per-couple cross-rule for spouses, s.222(8) job-related accommodation, half-hectare permitted area mechanics, the mixed-use restriction in s.224 (apportionment for business use), the statutory definition of "dwelling-house" (Sansom v Peay [1976] is the leading authority), and the rebasing election routes. The page treats PRR as if it's a single formula (qualifying period / total ownership × gain) when the formula sits on top of substantial statutory machinery.

**Secondary: STALE_FIGURES (acute — F-9 pattern violation).** The entire "Letting Relief: Additional Protection" H2 misframes the post-2020 Lettings Relief regime as the pre-2020 framework. This is the F-9 cluster pattern caught at B1-A2 (reduce-cgt page) and predicted by the dispatch prompt. Combined with two tax-year drift references (£3,000 for 2025/26 → should be 2026/27) and FAQ #3's surrounding context, the page would be a credibility hit at any rank.

**Tertiary: STRUCTURE.** 3 FAQs is well below the 10-14 best-in-class target. No decision table to route the reader (Did I live in the property? Did I share with tenants while letting? Am I within the s.225B post-separation window?). No worked example showing the time-apportionment formula with real numbers (the closest thing is the prose "20 years / 10 years = 50%" mention, which is fine framing but isn't a worked computation). No rates table.

**Not present: CTR-FAIL** (effectively no GSC signal beyond noise + wrong-intent Irish query); **not pure CANNIBAL** (Wave 5 C7 covers joint-ownership PRR cleanly differentiated from this general PRR page); **possible INTENT-MISMATCH** at micro-level (the Irish-jurisdiction query intent) but the page intent itself is correct UK landlord PRR, so the intent-mismatch is on a small minority of impressions, not the page's targeted intent.

**Load-bearing fix sequence (ordered by ROI):**

1. **Reframe the Lettings Relief H2 to the post-2020 framework** per TCGA 1992 s.223B + HMRC CG64710 + gov.uk/tax-sell-home/let-out-part-of-home (all verified live 2026-05-24). Header: "Lettings Relief: Shared-Occupation Only Since April 2020". Body: shared-occupation requirement is the gateway; £40,000 cap remains; relief = lower of {PRR already given, £40,000, chargeable gain on the let portion}; pre-vs-post-April-2020 transition table with dates from CG64985-CG64710 cross-reference; explicit "if you moved out and let your former home, you do NOT get Lettings Relief" sub-section (this is the F-9 violation in current body that misleads accidental landlords). **MANDATORY — load-bearing.**
2. **Fix the FAQ #3 framing** (rent-out-part-of-home) — keep the FAQ but rewrite to lock to s.223B shared-occupation rule + reference HMRC CG64710 + flag the rent-a-room scheme distinction (which IS broadly available and doesn't require shared occupation in the same way).
3. **Update both tax-year references** £3,000 for 2025/26 → £3,000 for 2026/27 (figure unchanged, year-reference updated). Same throughout.
4. **Add statute spine** as inline citations + Sources section: TCGA 1992 s.222 (PRR core + s.222(5) election + s.222(6) one-residence rule + s.222(2) permitted area + s.222(8) job-related accommodation), s.223 (final 9 months + Conditions A/B deemed occupation), s.223B (post-2020 Lettings Relief), s.224 (apportionment for mixed use), s.225B (post-separation extension widened by Finance (No. 2) Act 2023 c.30 s.41), s.58 (no-gain-no-loss inter-spouse). All verified live 2026-05-24 (see §"Authority links").
5. **Backfill deemed-occupation depth** (TCGA 1992 s.223(3) Conditions A and B) — the page currently mentions "Temporary Letting" briefly under Common Scenarios but doesn't explain the statutory deemed-occupation rules. Add a §"Deemed occupation: when absence still qualifies for PRR" H2 covering: any-reason 3-year absence (s.223(3)(a)), 4-year work-elsewhere-in-UK absence (s.223(3)(c)), any-length work-abroad absence (s.223(3)(b)), the bookend requirement (must be main residence before AND after the absence), the no-other-residence-treated-as-main rule. Cite HMRC CG65000+ range.
6. **Add a §"Mixed use and the half-hectare rule" H2** covering the s.222(2) permitted area (0.5 hectares / 1.24 acres + larger areas where "required for the reasonable enjoyment of the dwelling-house" — see Longson v Baker [2001]), and the s.224 apportionment for business use (dedicated office traps).
7. **Add a §"PRR and the one-main-residence rule for couples" H2** as a forward-link gateway to Wave 5 C7 + B2-C2. Body covers s.222(6) ("one main residence between them while living together"), the s.222(5) election as a brief mention, the unmarried-cohabitee carve-out (each can have their own main residence), and routes the reader to W5 C7 + B2-C2 for full depth.
8. **Add a §"PRR and the separating-spouse extension" H2** covering s.225B post-separation deemed occupation, the 3-year extension under s.58(1A)/(1B) added by Finance (No. 2) Act 2023 c.30 s.41(2)(6) in force 6 April 2023, and the cross-link to the rewritten B1-C1 brief (`cgt-divorce-property-transfer-tax-implications`).
9. **Add 1 worked time-apportionment example** with real numbers — anonymised landlord ("Mark and Sarah, accidental landlords in Leeds with 4 properties; their former main residence sold for £450,000 against £200,000 base cost = £250,000 total gain; owned 16 years (192 months); lived in 6 years (72 months); let 10 years (120 months); final 9 months from the 120 already covered by occupation overlap; PRR = (72 + 9)/192 × £250,000 = £105,469; remaining £144,531 taxable at 24%/18% mix less AEA £3,000 each spouse; outcome with worked tax line"). This is the structural piece the page is missing.
10. **Add 1 decision table** mapping "Did I live in the property + Did I share with tenants + Am I separating?" → "Reliefs available". Cleanest snippet-bait + answer-shape.
11. **FAQ count 3 → 12-14** with each FAQ targeting a real PRR landlord-intent question verbatim:
    - "Can I claim PRR on a buy-to-let I never lived in?" (no — needs occupation at some point)
    - "What is the final 9 months PRR rule?" (s.223(1) + CG64985 deemed occupation regardless of actual use)
    - "Did Lettings Relief change in April 2020?" (yes — s.223B inserted by FA 2020; shared-occupation gateway)
    - "Can I claim Lettings Relief if I moved out and let my former home?" (no — pre-2020 framing no longer applies)
    - "What counts as 'deemed occupation' for PRR?" (s.223(3) Conditions A/B — 3-year any-reason / 4-year work-UK / any-length work-abroad)
    - "How is PRR calculated when I lived in a property then let it out?" (time-apportionment formula with worked example)
    - "Can a couple have two main residences for PRR?" (no while living together — s.222(6); s.222(5) nomination election to choose)
    - "Does PRR apply if I separate or divorce?" (yes — s.225B post-separation deemed occupation + Finance (No. 2) Act 2023 3-year window)
    - "Does the half-hectare limit affect PRR?" (s.222(2) — 0.5 hectares default; larger where required for reasonable enjoyment)
    - "What if I use part of my home exclusively for business?" (s.224 apportionment — the dedicated-office trap)
    - "Does PRR cover the garden and outbuildings?" (yes within the permitted area)
    - "How long do I need to live in a property for PRR?" (no statutory minimum; HMRC scrutinises short periods for genuineness; Goodwin v Curtis [1998] is the leading authority on "quality" of occupation)
    - "Can I claim Rent-a-Room relief and PRR together?" (yes — Rent-a-Room sits separate from PRR; doesn't disturb the main residence status)
    - "What CGT rate applies after PRR for residential property?" (18% basic / 24% higher per §5 LOCKED 2026/27)
12. **Update internal links** — fix the FHL link (currently `furnished-holiday-let-tax-rules-exemptions`) to either a post-abolition explainer or route to W6 C8 grandfathered-BADR. Add forward-links to W5 C7 (joint ownership PRR), B2-C2 (s.222(5) election), B1-C1 (CGT-divorce — rewritten brief), the rewritten gold-reference rates page, the rewritten CGT pillar, the rewritten gifting page, and the rewritten payment-deadlines canonical.
13. **Update metaTitle** — current "PPR Relief Calculation for Landlords (UK 2025/26)" — update year reference to 2026/27 or drop year reference for a more durable title. Candidate: "PPR Relief for Landlords UK 2026/27: Final 9-Months + Lettings Carve-out" (63 chars — at limit, may need trim) or "Principal Private Residence Relief for Landlords: 2026/27 UK Guide" (66 chars — slightly over). Test 2-3 candidates oriented at "ppr relief calculation" (our existing right-intent query at pos 48) + "principal private residence relief landlords" + "lettings relief 2026".
14. **Update metaDescription** — current "Cut CGT on a former home with PPR relief. Includes the 9-month final period, the calculation formula, and letting relief examples for the 2025/26 tax year." → update tax year to 2026/27 and add the post-2020 Lettings Relief honesty hook (e.g., "Cut CGT on a former home with PPR. Final 9 months rule, the apportionment formula, and the post-April-2020 Lettings Relief restriction. UK 2026/27 guide for accidental landlords." — 196 chars, needs trim to ≤158).

---

## Competitor URLs (Stage 2 — verified live 2026-05-24 via WebFetch)

| URL | Status | Word count | FAQs | Statute cites | Stale figures | Coverage signals |
|---|---|---|---|---|---|---|
| https://www.gov.uk/tax-sell-home/let-out-part-of-home | **200 OK + content verified 2026-05-24** | ~250 (consumer-summary depth) | 0 | TCGA references implicit (no inline statute cites) | None | Authoritative consumer summary: shared-occupation rule for post-6-April-2020 Lettings Relief ✓, £40,000 cap ✓, 9-months rule ✓ (with the prior-period table — 18 months for 6 Apr 2014 to 6 Apr 2020, 36 months for disabled / long-term care), "Letting Relief does not cover any proportion of the chargeable gain you make while your home is empty" ✓. **This is the page we cross-reference + link to as the consumer-authority anchor.** |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg64200 | **200 OK + content verified 2026-05-24** | ~600 (manual-page depth) | 0 | TCGA 1992 ss.222-226 ✓ | None | HMRC's PRR intro page. Scheme-of-relief + s.222(1)(a) only-or-main-residence + s.222(1)(b) garden-or-grounds-up-to-permitted-area + extends to non-UK residences. **The statute spine for our rewrite — the section we cite as "see HMRC CG64200" for the framework.** |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg64985 | **200 OK + content verified 2026-05-24** | ~400 (manual-page depth) | 0 | TCGA 1992 s.223(1), (2), (5), (6) ✓ | None | HMRC's final-period-exemption page with the prior-period table: 9 months from 6 Apr 2020; 18 months 6 Apr 2014 to 6 Apr 2020; 36 months 10 Dec 2003 to 6 Apr 2014 (with disabled / long-term-care exceptions). **Cite as the manual authority for the 9-months rule.** |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg64710 | **200 OK + content verified 2026-05-24** | ~500 (manual-page depth) | 0 | TCGA 1992 s.223B + s.223(4) ✓ | None | HMRC's Lettings Relief page. Confirms post-6-April-2020 restriction + £40,000 cap + cross-references CG64230/CG64723/CG64721. **The manual authority for the corrected Lettings Relief framing.** |

**Competitor depth ceiling for this query class:** the authoritative pages above are gov.uk/HMRC-internal — they're the source of truth. Adjacent third-party UK competitor pages (ukpropertyaccountants.co.uk variant fetched at 404; tax-insider.co.uk variant blocked; unbiased.co.uk variant blocked — 3 of 5 attempted competitor fetches denied or 404) typically run 1,500-2,500 words with 0-4 FAQs and 0 statute citations. Our 2,800-3,200 word rewrite with 12-14 FAQs + 5-7 verified statute citations + 4 HMRC manual cross-references + worked example + decision table puts us decisively best-in-class vs the third-party competitive set. The gov.uk pages we cross-reference, not compete against — they're the authority anchor.

**What to borrow:** the gov.uk/tax-sell-home page's prior-period table for the 9-months rule (we replicate the same date table, sourced from CG64985, in our own better-formatted version). The CG64710 statute-reference pattern (citing s.223B + s.223(4) together).

**What to differentiate against:** all third-party UK competitors skip statutory anchoring; many still carry pre-2020 Lettings Relief framing (the F-9 pattern surfaced site-wide on our own residual cluster); none cover the s.225B post-separation extension widened by Finance (No. 2) Act 2023; few cover the s.222(6) one-residence-per-couple cross-rule for spouses; few cover the deemed-occupation Conditions A and B in any detail.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (refreshed 2026-05-24 PM for Batch 2 prep).

| Source | Slug | Status | Resolution |
|---|---|---|---|
| Residual (own) | principal-private-residence-relief-landlords | REWRITE | self — rewrite in place as general-PRR-for-landlords specialist depth |
| Excluded (rewritten 2026-05-21) | capital-gains-tax-property-complete-guide-uk (Session C #47) | CGT pillar | No collision — pillar provides comprehensive policy survey + brief PRR mention; this page is the specialist PRR depth that the pillar forward-links to. Reciprocal forward-link both ways. |
| Excluded (rewritten 2026-05-21) | cgt-rates-property-2026-27-current-rates-explained (gold-reference trial T4) | CGT rates explainer | No collision — rates page references PRR briefly under "Reliefs" + forward-links to this page. Reciprocal forward-link from our §"What CGT rate applies after PRR" / FAQ #14. |
| Excluded (rewritten 2026-05-21) | cgt-annual-exempt-amount-3000-allowance-2026-27 (Session 0 #14) | AEA depth | No collision — AEA is one component of the post-PRR computation. Forward-link from our worked example. |
| Excluded (rewritten 2026-05-21) | cgt-payment-deadlines-property-sales-2026 (Session C #23) | 60-day deadlines | No collision — deadlines page covers reporting timing; this page covers relief mechanics. Forward-link from our "Reporting your post-PRR gain" closing reminder. |
| Excluded (rewritten 2026-05-21) | cgt-property-transfer-spouse (Session ?) | Spouse no-gain-no-loss | No collision — that page covers s.58 mechanics; this page references s.58 as one route for shifting base cost before disposal + forward-links. The rewritten B1-C3 brief from Batch 1 sub-bucket C is the executable target for that page. |
| Excluded (rewritten 2026-05-21) | cgt-gifting-property-family-members-uk (Session B #46) | Gifting reliefs | No collision — gifting page covers s.165/s.260 holdover. Brief cross-link from our §"PRR and gifting" if covered (likely covered as a brief mention with forward-link). |
| Excluded (rewritten 2026-05-21) | cgt-calculation-selling-buy-to-let-property-step-by-step (Session C #35) | Calc walkthrough | No collision — calculation page is full-calc-on-BTL; this page covers the PRR adjustment to the gain BEFORE the BTL CGT computation. Forward-link from our worked example. |
| Wave 5 (shipped 2026-05-23) | **cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics (C7)** | **PRR for joint-owned property — per-owner mechanics + s.222(5) election + s.222(6) cross-rule** | **No collision — explicit differentiator confirmed.** C7 is per-owner-on-joint-ownership specialist depth (Hartley + Singh worked example, 13 FAQs all on the joint-ownership mechanic). This page is general-PRR theory + Lettings Relief carve-out + accidental-landlord scenario. Our §"PRR and the one-main-residence rule for couples" H2 is the gateway forward-link to C7. **Mandatory reciprocal forward-link from C7's joint-ownership mechanic back to this page's general PRR theory.** |
| Wave 5 (shipped 2026-05-23) | form-17-declaration-beneficial-interest-property-mechanics-filing-revocation (C1) | Form 17 mechanics | No collision — our FAQ on "Does Form 17 affect PRR?" cross-references C7's identical FAQ + forward-links to C1 for the Form 17 mechanic itself. |
| Wave 6 (shipped 2026-05-24) | fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics (C8) | FHL grandfathered BADR | Cross-link only — our §"PRR and former FHL property" (sub-section under Reliefs interaction) references W6 C8 as the post-abolition FHL CGT/BADR depth. |
| Residual (intra) | letting-relief-landlords-2026-changes (B2-B3, this batch in-flight) | **Lettings Relief post-2020** | **Adjacent — strong forward/back link partner.** B2-B3 owns the Lettings Relief specialist depth; this page references Lettings Relief at the §"Lettings Relief: Shared-Occupation Only Since April 2020" H2 with a hard forward-link route to B2-B3 for the full mechanic. **NOT a cannib — explicit differentiator: B2-B1 = PRR with Lettings Relief as a sub-section; B2-B3 = Lettings Relief specialist page with PRR as a prerequisite.** Reciprocal forward-link mandatory. |
| Residual (intra) | rollover-relief-property-landlords (B2-B2, this batch in-flight) | Rollover relief s.152 | No collision — rollover is a separate relief altogether and the page conclusion is that most landlords don't qualify. Brief cross-link from our §"Other CGT reliefs for landlords" (closing mention only — rollover is not a primary lever for PRR-qualifying properties). |
| Residual (intra) | **cgt-main-residence-election-two-properties (B2-C2, this batch in-flight)** | **s.222(5) election mechanics** | **Adjacent — intra-batch CANNIBAL risk noted in dispatch + Cannib Index §7.** Explicit differentiator (proposed to Sub-bucket C via Q&A): **B2-B1 (this page) = general PRR theory + Lettings Relief carve-out + nominated-residence-by-default + brief s.222(5) mention as a gateway. B2-C2 = full s.222(5) election mechanics + worked landlord-with-2-properties scenario + the 2-year window + the joint-signing requirement for spouses.** B2-B1 forward-links to B2-C2 from our §"PRR and the one-main-residence rule for couples" H2. B2-C2 reciprocally back-links to B2-B1 for the general PRR theory. If B2-C2's sub-agent surfaces thin GSC signal + decides to REDIRECT-PROPOSED into this page, we absorb the s.222(5) election mechanics as a fuller sub-section (manager decides at batch close). |
| Residual (intra) | reduce-cgt-property-disposal-uk (B1-A2 — Batch 1 brief drafted, REWRITE pending execution) | CGT reduction survey | No collision — B1-A2 is survey-as-router with PRR as one lever; brief mention + forward-link to this page from B1-A2's PRR sub-section. Reciprocal forward-link from this page's §"Other CGT planning levers" closing. |
| Residual (intra) | cgt-deferral-strategies-property-investors-uk (B1-A1 — Batch 1 brief drafted) | Deferral mechanics | No collision — deferral pages are mechanism-oriented; PRR is reduction not deferral. Brief cross-link from our closing "PRR vs deferral routes" mention. |

**Conclusion:** REWRITE in place as general-PRR-for-landlords specialist depth. Clean cannibalisation against all shipped + in-flight sources. **Intra-batch CANNIBAL with B2-C2 explicitly resolved** via the differentiator above (already noted in Cannib Index §7 Batch 2 in-flight stub). **Adjacent partnership with B2-B3 explicitly resolved** — Lettings Relief is a sub-section here with forward-link to B2-B3 for full mechanic.

---

## Intra-batch coordination (Sub-bucket C re B2-C2)

Per dispatch instruction + Cannib Index §7 Batch 2 in-flight stub: Sub-bucket C's B2-C2 brief (`cgt-main-residence-election-two-properties`, s.222(5) election mechanics) shares PRR territory with this B2-B1 brief.

**Proactive differentiator (to be answered to Sub-bucket C if they Q via Q&A, OR internalised from start per dispatch suggestion):**

- **B2-B1 (this brief) scope:** general PRR theory (s.222(1) core + s.223 final 9 months + s.223(3) deemed occupation Conditions A/B + s.223B Lettings Relief carve-out + s.222(2) permitted area + s.224 mixed-use apportionment + s.225B post-separation extension + brief s.222(5) MENTION as a gateway forward-link to B2-C2). Audience = the accidental landlord who needs to understand PRR end-to-end + the Lettings Relief reframe.
- **B2-C2 scope (proposed):** the s.222(5) election MECHANICS in depth — the 2-year window from acquisition of the second residence, the joint-signing requirement for spouses (s.222(5)(b)), the variation route (further notice within 2 years), the late-election problem (no late election; reverts to facts-on-the-ground main residence), the interaction with the s.222(6) one-residence-per-couple cross-rule for spouses, the contrast with unmarried cohabitees (each can have own main residence), 1-2 worked landlord-with-2-properties scenarios (e.g., the "London weekday flat + Cotswolds weekend cottage" pattern, the "main home + adjacent BTL with periods of personal use" pattern). Audience = the landlord with 2 residences who needs to actively elect.

**Forward-link structure:**
- B2-B1 → B2-C2: from our §"PRR and the one-main-residence rule for couples" H2 (one-paragraph gateway pointing to B2-C2 for the election mechanics).
- B2-C2 → B2-B1: from B2-C2's PRR-prerequisite section (one-paragraph back-pointer to this page for the general PRR theory).
- Both B2-B1 + B2-C2 → W5 C7: for the joint-ownership PRR mechanics (per-owner relief on joint-ownership).
- W5 C7 → B2-B1 (when shipped): reciprocal forward-link from C7's general PRR mention to this page's specialist depth. Manager flags this as a Wave 5 back-patch opportunity post-Batch-2-execution.

**If B2-C2's sub-agent surfaces thin GSC signal + decides REDIRECT-PROPOSED INTO this page:** we absorb the s.222(5) election mechanics as a fuller §-section here (replacing the brief gateway mention with the full mechanic). Manager decides at batch close. Sub-bucket C is empowered to propose REDIRECT-PROPOSED per their launch prompt; this page's framing is flexible enough to absorb the election depth.

---

## Closest existing pages (Stage 2)

Internal-link partners (to and from this page):

- **CGT pillar:** `capital-gains-tax-property-complete-guide-uk` — back-link target; reciprocal forward-link from our intro paragraph.
- **CGT rates (gold-reference):** `cgt-rates-property-2026-27-current-rates-explained` — forward-link from §"What CGT rate applies after PRR" / FAQ #14.
- **AEA depth:** `cgt-annual-exempt-amount-3000-allowance-2026-27` — forward-link from worked example.
- **60-day deadlines (rewritten canonical):** `cgt-payment-deadlines-property-sales-2026` — forward-link from closing "Reporting your post-PRR gain" reminder.
- **Spouse transfer:** `cgt-property-transfer-spouse` — forward-link from §"Restructuring base cost before disposal" sub-section (s.58 mechanic mention).
- **Gifting:** `cgt-gifting-property-family-members-uk` — brief cross-link from "PRR + gifting" mention if covered.
- **Calculation walkthrough:** `cgt-calculation-selling-buy-to-let-property-step-by-step` — forward-link from worked example.
- **Joint-ownership PRR (Wave 5 C7):** `cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics` — forward-link from §"PRR and the one-main-residence rule for couples" H2. Reciprocal back-link mandatory from C7 (manager: Wave 5 back-patch opportunity post-execution).
- **s.222(5) election mechanics (B2-C2, this batch in-flight):** `cgt-main-residence-election-two-properties` — forward-link from §"PRR and the one-main-residence rule for couples" H2 (gateway paragraph). Reciprocal back-link from B2-C2.
- **Lettings Relief specialist (B2-B3, this batch in-flight):** `letting-relief-landlords-2026-changes` — hard forward-link from §"Lettings Relief: Shared-Occupation Only Since April 2020" H2. Reciprocal back-link from B2-B3.
- **Divorce + CGT (B1-C1, Batch 1 brief drafted):** `cgt-divorce-property-transfer-tax-implications` — forward-link from §"PRR and the separating-spouse extension" H2 for the s.225B + Finance (No. 2) Act 2023 depth.
- **Form 17 (Wave 5 C1):** `form-17-declaration-beneficial-interest-property-mechanics-filing-revocation` — forward-link from FAQ "Does Form 17 affect PRR?" answer.
- **Reduce-CGT survey (B1-A2, Batch 1 brief drafted):** `reduce-cgt-property-disposal-uk` — reciprocal forward-link from §"Other CGT planning levers" closing.
- **FHL grandfathered BADR (Wave 6 C8):** `fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics` — replaces / supplements the current internal link to `furnished-holiday-let-tax-rules-exemptions` for the post-abolition framing.
- **CGT 2026 rates+allowances sibling:** `capital-gains-tax-property-sale-uk-2026-rates-allowances` (rewritten Session C #17) — forward-link from worked example tax computation.
- **What does a property accountant do:** `what-does-a-property-accountant-do` — anchor link at end of body for the closing inline-CTA.

---

## House-position references (Stage 1)

- **§5 CGT on UK residential property (2026/27)** [LOCKED 2026-05-23, re-verified at Batch 2 prep 2026-05-24]: primary lock. 18%/24% residential CGT rates; £3,000 AEA; **post-2020 Lettings Relief restriction (shared-occupation gateway)**. The legacy page's Lettings Relief H2 violates §5 — rewrite must adopt §5 verbatim. Companies-pay-Corporation-Tax-not-CGT position is locked too (not directly relevant to PRR which is individual-only, but if any corporate-route mention appears in our rewrite, the F-9 wording lock applies).
- **§6 FHL — abolition transition** [LOCKED 2026-05-22]: load-bearing for the §"Other reliefs interaction" sub-section. FHL was abolished 6 April 2025; BADR was available only until 5 April 2025; the current internal link to FHL page needs review.
- **§7 April 2027 property income tax surcharge** [LOCKED but VERIFY at execution per Bill-vs-enacted F-5 pattern]: NOT directly relevant to PRR (surcharge is on property INCOME not CGT). If our closing "future rate changes" mention covers April 2027, must explicitly state "CGT rates are not affected by the April 2027 surcharge announced for property income; the 18%/24% CGT rates remain through 2027/28".
- **§13 Do-not-write list (general)** [LOCKED]: NO pricing (per agency lead-gen handoff model + F-1 finding); NO real client names; NO em-dashes; NO emoji in body.
- **§17.4 NRCGT** [LOCKED 2026-05-22]: relevant for closing FAQ "What if I'm non-UK-resident — can I still claim PRR?" — the answer is YES if the property is in the UK and the s.222 conditions are met (PRR is residence-of-property based, not residence-of-owner based per s.222(1)). Cross-link to W2 expat content.
- **§24 Form 17 + joint ownership + spouse-mechanics** [LOCKED 2026-05-23]: load-bearing for the §"PRR and the one-main-residence rule for couples" H2 + the FAQ "Does Form 17 affect PRR?" — must align with W5 C7's framing (PRR follows actual residence not beneficial share; Form 17 has no effect on PRR).

---

## House-position conflict flag (Stage 2)

**Confirmed conflict — F-21 STALE_FIGURES + HOUSE_POSITION_CONFLICT (HIGH — F-9 cluster continuation).**

Three concurrent factual drift issues in current body (load-bearing for rewrite):

**Flag (a) — HOUSE_POSITION_CONFLICT (HIGH, F-9 pattern):** the entire "Letting Relief: Additional Protection" H2 (line 60-73) presents the pre-April-2020 framework as the current relief test. This is the canonical §5 LOCKED violation and the F-9 cluster pattern continuation — third confirmed instance after B1-A2 (reduce-cgt page) and predicted by dispatch prompt.

**Flag (b) — STALE_FIGURES (LOW):** two tax-year references "£3,000 for 2025/26" (lines 57 + 98) — figure unchanged but year-reference one cycle behind. Trivial fix; included for completeness.

**Flag (c) — STALE_INTERNAL_LINK (MEDIUM):** the internal link to `furnished-holiday-let-tax-rules-exemptions` (line 99) likely carries pre-abolition framing per §6 LOCKED. Either re-route to W6 C8 grandfathered-BADR page or to a post-abolition explainer; flag the cross-link as a maintenance item.

**Site-wide flag to raise (append to track2_site_wide_flags.md):**

`F-21 | 2026-05-24 PM | HIGH | principal-private-residence-relief-landlords | HOUSE_POSITION_CONFLICT + STALE_FIGURES | THIRD confirmed instance of F-9 pre-April-2020 Lettings Relief framing pattern (after B1-A2 reduce-cgt-property-disposal-uk + dispatch-predicted for this brief). The entire "Letting Relief: Additional Protection" H2 misframes the post-2020 s.223B regime. F-9 cluster pattern continues: site-wide audit of all residual CGT pages + the gifting + spouse + reduce-CGT clusters now strongly recommended. Predicted next instances: B2-B3 letting-relief-landlords-2026-changes (the page is named "2026 changes" but check if it still carries pre-2020 framing under the surface) + any cgt-* page with a "lettings relief" sub-section.`

---

## Authority links worth considering (Stage 2 — WebFetch verification status)

| URL | Verification status | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/1992/12/section/222 | **200 OK + operative + verified 2026-05-24** (s.222(1) only-or-main-residence; s.222(2) permitted area; s.222(5) election; s.222(5A) extended notification per FA 2020; s.222(6) one-residence-per-couple; s.222(8) job-related accommodation; subsection (3) substituted by FA 1996; civil-partnership wording from 2005) | PRR core statute — cite throughout |
| https://www.legislation.gov.uk/ukpga/1992/12/section/223 | **200 OK + operative + verified 2026-05-24** (final 9 months per s.223(1) post-FA 2020; Conditions A and B s.223(3) deemed-occupation regimes; the 36-month-to-18-month-to-9-month progression confirmed) | Cite for the 9-months final period rule + deemed occupation |
| https://www.legislation.gov.uk/ukpga/1992/12/section/223B | **200 OK + operative + verified 2026-05-24** (Lettings Relief inserted by FA 2020; shared-occupation requirement; £40,000 cap; lower of 3 amounts under subsection (4)) | Cite for the corrected post-2020 Lettings Relief framing |
| https://www.legislation.gov.uk/ukpga/1992/12/section/224 | **200 OK + operative + verified 2026-05-24** (apportionment + restrictions + section 225D — adult-placement-carers reference; subject to anti-avoidance "acquired wholly or partly for the purpose of realising a gain") | Cite for the mixed-use + business-use apportionment |
| https://www.legislation.gov.uk/ukpga/1992/12/section/225B | Verify at execution (used Wave 5 C7 reference + B1-C1 cite). Per Wave 5 C7 the section deems absent-spouse continued occupation where family home transferred under court order / separation agreement; widened by Finance (No. 2) Act 2023 alongside s.58 3-year extension. | Cite for the §"PRR and the separating-spouse extension" H2 |
| https://www.legislation.gov.uk/ukpga/1992/12/section/58 | Verify at execution (used in B1-C3 + W5 C7 references). | Brief mention in §"Restructuring base cost before disposal" |
| https://www.gov.uk/tax-sell-home/let-out-part-of-home | **200 OK + content verified 2026-05-24** | Consumer-authority cross-reference for Lettings Relief shared-occupation rule |
| https://www.gov.uk/government/publications/private-residence-relief-hs283-self-assessment-helpsheet | **200 OK** (landing page only; full HS283 PDF/HTML behind link — verify content at execution) | HMRC HS283 helpsheet — cite as the consumer-facing HMRC explainer |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg64200 | **200 OK + content verified 2026-05-24** (PRR intro; ss.222-226 framework; only-or-main-residence; permitted area) | HMRC PRR intro manual — cite for the framework |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg64985 | **200 OK + content verified 2026-05-24** (final-period table 9 months / 18 months / 36 months by disposal-date band; disabled / long-term-care exceptions) | HMRC final-9-months manual — cite for the rule + the historical table |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg64710 | **200 OK + content verified 2026-05-24** (Lettings Relief; ss.223B + s.223(4); £40,000 cap; post-6-April-2020 restriction) | HMRC Lettings Relief manual — cite for the corrected framing |
| HMRC CG65000+ range (deemed occupation Conditions A/B) | Verify exact section at execution per F-7 PIM4101 hallucination discipline | Authority for deemed-occupation depth |
| HMRC CG65030+ (post-April-2020 Letting Relief restriction detail) | Verify at execution | Supplementary authority |
| Goodwin v Curtis [1998] BTC 176 — leading case on "quality" of occupation | Verify case-law citation at execution | FAQ "How long do I need to live in a property" answer reference |
| Sansom v Peay [1976] 52 TC 1 — dwelling-house definition | Verify at execution | Brief mention if depth-section warrants |
| Longson v Baker [2001] STC 6 — permitted area "reasonable enjoyment" | Verify at execution | §"Mixed use and the half-hectare rule" H2 |

**(Execution session selects 6-8 to actually cite in body — target 5 verified statutory + 2 HMRC manual + 1 gov.uk consumer + 1 case-law authority.)**

---

## Universal rules (do not skip)

Inherits from `TRACK2_PROGRAM.md §4 sections 13 + 14`. Critical for this brief:

- **NO em-dashes** (per memory note + §13).
- **NO pricing on-site** (per agency lead-gen handoff model + F-1).
- **Anonymised social proof only** (the Mark + Sarah Leeds 4-property example pattern).
- **LeadForm auto-injected by `BlogPostRenderer.tsx`.**
- **1-3 inline `<aside>` CTAs** at conversion moments (after worked example + before Lettings Relief reframe + before closing).
- **FAQs schema auto-emitted** from frontmatter (target 12-14 entries).
- **House position §5 Lettings Relief framing MANDATORY** (post-April-2020 s.223B shared-occupation rule, NOT pre-2020 framing).
- **House position §7 hedge** if any April 2027 mention slips in — the surcharge is on property INCOME, NOT on CGT; CGT rates remain 18%/24% through 2027/28.
- **House position §13 Companies-pay-CT-not-CGT lock** if any corporate-route mention appears (PRR is individual-only, so the lock is defensive only).
- **URL liveness + statute-content verification at execution** per §16.31 + F-7 + F-8.
- **TCGA 1992 s.223B is the post-2020 Lettings Relief statute, NOT s.224.** This brief's dispatch prompt cited s.224; that is wrong. The correct cite is s.223B (inserted by FA 2020). Verified live 2026-05-24 via WebFetch of both sections. **Statute-citation-drift catch — flag to manager for future-prompt accuracy.**

---

## 19-step workflow (legacy-rewrite adaptation)

Inherits from `NETNEW_PROGRAM.md §7` with the 3 Track 2 deltas. Brief-specific notes:

- **Step 1 reading:** `docs/property/house_positions.md` §5, §6, §7, §13, §17.4, §24 in full before drafting body. Re-read W5 C7's full brief before drafting (depth + framing reference for the joint-ownership cross-link).
- **Step 4:** verify §7 (April 2027) lock-status against legislation.gov.uk Finance Act 2026. PRR is CGT-side so §7 doesn't directly apply, but the closing "future changes" mention needs the hedge.
- **Step 5:** re-fetch the 4 verified authority URLs at execution (legislation.gov.uk s.222/s.223/s.223B/s.224 + gov.uk consumer + HMRC CG64200/CG64985/CG64710). At Stage 2 brief drafting (2026-05-24) all 4 statute sections + 4 HMRC manual + gov.uk consumer were 200 OK and content-verified.
- **Step 6:** read the current `principal-private-residence-relief-landlords.md` source file in full to confirm no edit since 2026-04-01.
- **Step 7:** read closest-existing sibling pages (16 cross-links named above; aim to read at least Wave 5 C7 + B2-B3 + B2-C2 once drafted + the rewritten CGT pillar + the rewritten 60-day deadlines canonical).
- **Step 8:** plan rewrite outline — 12-14 H2s (general PRR theory + final 9 months + deemed occupation + permitted area + mixed-use + one-residence-per-couple gateway + separating-spouse extension + Lettings Relief reframe + worked example + decision table + Other reliefs interaction + Sources), 2,800-3,200 body words, 12-14 FAQs, 1 worked time-apportionment example, 1 decision table.
- **Step 9:** rewrite at existing path. Preserve frontmatter `slug` + `canonical` + `date` (update `dateModified` to today). Update `metaTitle` (test 2-3 candidates oriented at "ppr relief calculation" + "principal private residence relief landlords"). Update `metaDescription` with the post-2020 Lettings Relief honesty hook + 2026/27 update.
- **Step 10:** site build must pass.
- **Step 11:** six checks per playbook §4.3 + **explicit text-search checks: (a) zero matches for "£40,000 relief if main residence at some point" or any pre-2020 Lettings Relief framing; (b) zero matches for "2025/26" tax-year drift (excluding intentional historical references); (c) at minimum one citation to s.223B (the Lettings Relief statute); (d) the s.222(6) one-residence-per-couple rule MUST be cited in the §"PRR and the one-main-residence rule for couples" H2.**
- **Step 12:** no redirect needed (REWRITE-in-place; clean cannib).
- **Step 13:** insert NEW `monitored_pages` row (zero current right-intent GSC; 180-day foundational window).
- **Step 14:** commit on main. Tracker edits via absolute path only.
- **Steps 15-19:** mark ✅ executed; update flags + heartbeat; next page in batch.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §5 CGT 2026/27 (18% / 24% + £3k AEA + post-2020 Lettings Relief framing): __
- §5 s.223B post-2020 shared-occupation rule cited verbatim: __ MANDATORY
- §6 FHL post-abolition framing (internal link to FHL page resolved): __
- §7 April 2027 — CGT rates unaffected by the property-income surcharge: __
- §13 no-pricing / no-real-client-names / no-em-dashes: __
- §17.4 NRCGT cross-link on closing FAQ if covered: __
- §24 Form 17 / PRR independence cross-link: __

### Comparison: before vs after
- Word count: 1,635 → __
- H2 count: 8 (+ 4 H3) → __
- FAQ count: 3 → __
- Authority links: 0 → __
- Inline CTAs: 0 → __
- Worked examples: 0 → __ (1 expected with the Mark + Sarah Leeds 4-property pattern)
- Decision table: 0 → __ (1 expected — Did I live? Did I share? Am I separating? → Reliefs)
- Rates table: 0 → __ (1 expected — the final-period historical table 9/18/36 months by disposal-date band per CG64985)
- "£40,000 relief if main residence at some point" pre-2020 Lettings framing: 1 (FAQ #3 surround + H2 #4) → __ MUST BE 0
- "2025/26" stale tax-year references: 2 (lines 57 + 98) → __ MUST BE 0 (unless intentional historical)
- s.223B citation count: 0 → __ MUST BE ≥1

### Foundational SEO hypothesis test
- Pre-rewrite GSC baseline (2026-02-24 to 2026-05-24): 4 imp / 0 clicks / 3 queries (2 are wrong-intent Irish-jurisdiction)
- Post-rewrite expected: 100-300 right-intent impressions / 90 days within 6-12 months
- Verify at +90 / +180 days via monitored_pages detector

### Flags raised
- F-21 (carried from this brief): F-9 pattern continuation on Lettings Relief misframing — site-wide audit recommended
- Any new flags surfaced: __

### 2-3 sentence summary
- (populated at execution time)
