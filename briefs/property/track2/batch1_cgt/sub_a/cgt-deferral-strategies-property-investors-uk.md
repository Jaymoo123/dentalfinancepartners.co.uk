# Track 2 brief: cgt-deferral-strategies-property-investors-uk

**Site:** property
**Brief type:** Legacy rewrite — Batch 1 Sub-bucket A (CGT reliefs / planning)
**Source markdown path:** `Property/web/content/blog/cgt-deferral-strategies-property-investors-uk.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/cgt-deferral-strategies-property-investors-uk
**Stage 1 priority:** **M** (no GSC signal yet — invisible page, see §"Current page snapshot"; topic has clear differentiation from rewritten siblings and is a defensible deferral-mechanics survey, so rewrite has value as foundational asset even at zero current traffic)
**Stage 1 date:** 2026-05-23
**Stage 2 enrichment date:** 2026-05-23
**Cannibalisation status:** REWRITE — clean. Page owns the deferral-mechanics survey intent (EIS Sch 5B + s.152 rollover + s.165 holdover + timing-as-quasi-deferral + extraction-vehicle deferral). No rewritten sibling covers this; the rewritten gifting page (`cgt-gifting-property-family-members-uk`) is the depth target for one of the four mechanics referenced here but does not cover the deferral framework as a whole.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `cgt-deferral-strategies-property-investors-uk`. Slug already maps to the deferral-mechanics survey intent; no redirect candidate.
- **Category:** `capital-gains-tax` (kept).
- **Gap-mode tag:** `DEPTH` (primary, structure-only but each mechanic thin) + `VOICE-FRESHNESS` (secondary, body asserts BTL "investment activity" and brushes EIS / SEIS at survey level without statutory anchoring). No CTR-FAIL because no impressions to fail with. Sibling page `airbnb-tax-uk-short-term-rental-income-taxed` carries the same "invisible page" finding (§16 trial lesson — pages with 0 GSC + 0 GA4 need foundational rewrite first, traffic later).
- **"Why this rewrite" angle:** the legacy page is the right framing (survey of CGT-deferral mechanics for property investors) but every section is too thin to rank against specialist competitors and contains no statutory anchoring. Six fixes load-bear: (a) add the missing statute spine (TCGA 1992 Sch 5B for EIS, s.152 for rollover, s.165 for holdover, s.58 for spouse, s.162 for incorporation relief); (b) repair the "rollover does not apply to BTL" framing with a clearer trader-vs-investor decision; (c) add the FHL-post-abolition trap (former-FHL property cannot use BADR after 5 April 2025 per §6); (d) lift the EIS deferral mechanic from 2 paragraphs to a worked-example walkthrough with the 12-month-before / 36-month-after window made unambiguous; (e) cover incorporation relief (s.162) as a deferral mechanism in its own right (not just a "company structures" aside); (f) add a strategic-comparison table contrasting the four routes (which mechanic for which fact pattern).

---

## Current page snapshot (Stage 2 — pulled from filesystem; no `page_content_map` row)

**Supabase `page_content_map` row:** **none.** Page has never been parsed (the parser walks pages that have shown GSC impressions, this page has shown none).

**Filesystem source read (`Property/web/content/blog/cgt-deferral-strategies-property-investors-uk.md`, 102 lines):**
- `metaTitle`: "CGT Deferral Strategies Property Investors UK 2026 Guide" (53 chars)
- `metaDescription`: "Learn how UK property investors can legally defer capital gains tax using EIS, SEIS, rollover relief and other CGT deferral strategies. Expert tax guidance." (157 chars — at limit)
- Word count: ~1,750 (estimate from line count + para density)
- 6 H2 sections (What is CGT Deferral / Investment Scheme Deferrals: EIS and SEIS / Business Asset Rollover Relief / Timing and Gifting Strategies / Using Company and Pension Structures / Offshore Structures / Important Considerations / Record Keeping and Professional Advice) + 5 H3 subsections
- 4 FAQs in frontmatter `faqs:` array (EIS deferral / EIS company failure / rollover relief for BTL / spouse transfer)
- 1 worked example (£100k EIS deferral, single-paragraph)
- Internal links: 3 (CGT pillar, BTL Ltd Co pillar, S24 pillar, property accountant services)
- Outbound authority links: 0 (no gov.uk / legislation.gov.uk / HMRC manual citations)
- Last meaningful edit: 2026-04-10 (frontmatter `date`)
- Frontmatter has NO `metaTitle_prev` / `metaDescription_prev` — no prior meta rewrite attempted (contrast: cgt-rates trial page had attempts in commit `271e58f`)

**Drift hazards in current body:**
- Line 81 incorrectly summarises companies as paying "corporation tax rather than CGT, and there are various reliefs available including substantial shareholdings exemption, corporate rollover reliefs". SSE is a trading-shareholding relief largely irrelevant to property investors and shouldn't be flagged as a deferral lever in a property-investor survey. Rewrite either drops it or contextualises it as "rarely relevant for property SPVs".
- Line 83 worked example (£60,000 earnings + £15,000 pension contribution → basic rate CGT) uses figures that no longer match the £50,270 higher-rate threshold cleanly; rewrite recalculates with current bands and adds a second example for clarity.
- Line 86 brushes "offshore structures" with a one-paragraph caveat; either drop entirely or flag the residence-based-IHT shift from 6 April 2025 per §17.6 + §15.6.

---

## GSC angle (last 90 days) — REAL DATA from `gsc_query_data`

**Pulled 2026-05-23 via `python -m optimisation_engine.track2.pull_page_data --slug cgt-deferral-strategies-property-investors-uk --days 90`.**

**Aggregate:** **0 impressions / 0 clicks / 0 distinct queries** in 90-day window. **0 GA4 rows** (no sessions, no users, no engagement signal).

**This is the same INVISIBLE page pattern surfaced by airbnb trial brief T1 + the F-6 INTENT-MISMATCH discussion in the gold-reference brief.** The page has never shown in SERPs at the impression-tracked depth and has never been parsed by the page_content_map walker.

**Strategic conclusion:** with no GSC signal, the rewrite cannot be tuned to specific queries. The right move is to write the foundational best-in-class deferral survey on the basis of (a) statutory anchoring, (b) sibling-routing strength, and (c) the differentiation table against competitor surveys (see §"Competitor URLs"). The page's purpose post-rewrite is to be the obvious specialist destination when a query like "defer cgt on rental property uk" emerges; not to lift current invisible traffic.

**Realistic post-rewrite target:** 100-200 impressions / 90 days within 6-12 months (foundational SEO horizon, not the 5-10× CTR uplift horizon of a CTR-FAIL page).

---

## Gap-mode diagnosis (Stage 1 reasoning, refined Stage 2)

**Primary: DEPTH.** Six surveyed mechanics (EIS, SEIS, rollover, holdover, timing, company structures, offshore, pensions, anti-avoidance) crammed into ~1,750 words means each gets 150-250 words. Competitor surveys at this intent are 1,500-2,800 words with deeper coverage of two or three mechanics. Our right move is to either (a) double the page to 3,000-3,400 words with each mechanic getting a proper walkthrough + example, or (b) cut to four mechanics (EIS Sch 5B / s.152 rollover / s.165 holdover / s.58 spouse + s.162 incorporation) at ~600-700 words each. Recommended: (a), because the survey-of-mechanics framing is the right intent for "deferral strategies" queries and we should be best-in-class against the thin specialist competitors (e.g., `ukpropertyaccountants.co.uk/business-asset-rollover-relief-...` truncated at fetch but estimated ~1,500-2,000 words covering only rollover).

**Secondary: VOICE-FRESHNESS.** The body is generic, light on statute, and treats EIS as a passing aside (2 short paragraphs) despite EIS being the single most useful deferral route available to property investors (since rollover does not apply to BTL investment, holdover does not apply to non-business assets, and incorporation relief is a specific s.162 case). EIS deserves a dedicated H2 with a worked walkthrough.

**Tertiary: STRUCTURE.** No rates table, no decision-tree visual, no statute citations, only 4 FAQs (target 12-14), no comparison table contrasting the four mechanics. The cluster's rewritten siblings (gifting, AEA, rates) have substantially better FAQ density.

**Not present: CTR-FAIL** (no impressions to fail with), not **CANNIBAL** (no rewritten sibling covers the deferral-mechanics survey — the gifting page covers gift mechanics including s.165 holdover-via-gift, but that's a different angle from the deferral framework as a whole).

**Load-bearing fix sequence (ordered by ROI):**

1. **Add statute spine:** TCGA 1992 Sch 5B (EIS), TCGA 1992 s.152 (rollover), TCGA 1992 s.165 (holdover gifts of business assets), TCGA 1992 s.260 (holdover gifts to relevant property trusts), TCGA 1992 s.58 (spouse no-gain-no-loss), TCGA 1992 s.162 (incorporation relief). All verified live + operative 2026-05-23 (see §"Authority links").
2. **Rewrite trader-vs-investor framing for s.152 rollover** with the explicit Ramsay v HMRC [2013] test referenced from house position §5; clarify that pure BTL investment activity does not qualify and serviced-accommodation with substantial services is the live edge case (cross-reference §9 BPR Pawson principle and §6 FHL-post-abolition).
3. **Expand EIS Sch 5B section** with worked walkthrough: 12-month-before / 36-month-after window, £-for-£ matching, the death-uplift quirk that converts deferred-gain-on-EIS-shares into IHT relief at death, the 3-year minimum holding period and qualifying-status risk.
4. **Add incorporation relief (s.162) section** as a deferral mechanism — the most commonly-applicable deferral route for portfolio landlords. Cross-link to `buy-to-let-limited-company-complete-guide-uk` (rewritten) and `cgt-property-transfer-limited-company-calculate` (sibling) for the deeper mechanics.
5. **Add post-FHL trap:** former-FHL property cannot use BADR after 5 April 2025 (§6 LOCKED); the anti-forestalling rules between announcement (6 March 2024) and abolition close the s.162 / BADR pre-abolition disposal route. This is a live drafting trap because the legacy page does not mention FHL abolition at all.
6. **Add decision-table** contrasting the four deferral routes (Mechanic / Statute / Eligible assets / Typical use case / Cash crystallisation moment / Combine-with notes). One-row-per-mechanic comparison.
7. **FAQ count 4 → 12-14** with each FAQ targeting a specific deferral scenario (EIS Sch 5B for retirement-age landlord / rollover for serviced-accommodation operator with substantial services / s.165 holdover-on-business-gift for property-trading parent-to-child / s.162 for portfolio landlord incorporating / spouse-pre-sale-transfer for rate-band-arbitrage / timing-disposal-across-tax-years for AEA-stacking / pension-contribution-to-shift-rate-band for one-off-larger-gain). Each FAQ targets a search-phrasing query verbatim.
8. **Drop offshore-structures section** (line 86) — outdated post-6-April-2025 residence-based regime; replace with a one-sentence pointer to the rewritten BTL Ltd Co pillar + `non-domiciled-uk-tax-residents-property-tax-implications` (residual page) for non-UK-resident landlord scenarios.

---

## Competitor URLs (Stage 2 — verified live 2026-05-23 via WebFetch)

| URL | Status | Coverage signals |
|---|---|---|
| https://www.ukpropertyaccountants.co.uk/business-asset-rollover-relief-a-complete-guide-to-capital-gains-tax-deferral/ | 200 OK (page lives) but **content extraction returned truncated body** on WebFetch — model could not see the operative content. Flag as **URL_LIVE_CONTENT_UNCONFIRMED** — execution session must re-fetch with a stronger user agent / browser path. | Topic is on-point (rollover-as-deferral). Manual cross-check or re-fetch needed before citing as comparator. |
| https://www.ukpropertyaccountants.co.uk/capital-gains-tax-holdover-relief-gift-holdover-relief/ | 200 OK, content confirmed | ~1,800-2,000 words, 0 FAQs, 0 TCGA section citations, does NOT distinguish s.165 vs s.260, 1 worked example (£250k cost / £1m MV / £400k sale-at-undervalue → £600k deferred). Our differentiation: cite both sections, separate the gift-of-business-asset (s.165) from the gift-to-trust (s.260) route, add FAQ density. |
| https://www.geraldedelman.com/insights/a-guide-to-the-enterprise-investment-scheme/ | 200 OK, content confirmed | ~2,100 words, 0 FAQs, dedicated EIS-deferral-relief section confirming 12-month-before / 36-month-after window; no statutory citations; property-investor angle minimal (notes property dev sector excluded from EIS but does not explain that **deferral relief applies to any chargeable gain regardless of source, including a property gain**, which is the actionable point for our readers). Our differentiation: explicit "property-gain → EIS deferral" path with statute. |
| https://uklandlordtax.co.uk/business-asset-rollover-relief-and-air-bnb/ | 200 OK, content confirmed | ~450-500 words, no statute citations, post-FHL-abolition NOT addressed (page is from October 2021 and now stale — flag as comparator-staleness signal). Our differentiation: post-FHL-abolition correctly framed per §6. |
| https://www.legislation.gov.uk/ukpga/1992/12/schedule/5B | 200 OK, **operative wording present** | Authority anchor for EIS deferral relief — verified opening text references 29 November 1994 effective date. |

**Competitor depth ceiling for this query class:** 450-2,100 words, 0 FAQs, 0 statute citations across the four. The third competitor (gerald edelman) is the cleanest survey but is general-investor not property-investor. Our 3,000-3,400 word rewrite with 12-14 FAQs + statute spine + property-investor framing + decision-table puts us decisively best-in-class against this competitive set.

**What to borrow:** the geraldedelman EIS-section structure (definition → eligibility → mechanics → worked example) is the right pattern; copy it for each of our four mechanics. The ukpropertyaccountants holdover-relief page's £250k / £1m / £400k example is a clear pattern; we should match its clarity in our s.165 + s.260 section while crediting nothing visually.

**What to differentiate against:** all four competitors (a) skip TCGA statutory anchoring, (b) skip post-FHL-abolition impact on rollover / BADR eligibility, (c) skip the residence-based IHT regime impact (6 April 2025+, §17.6) on the formerly-popular offshore deferral angle, (d) skip incorporation relief (s.162) as a deferral mechanism, (e) skip the comparison decision-table across mechanics.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (frozen 2026-05-23 PM). Re-read 2026-05-23 at brief drafting; no new collisions surfaced since snapshot.

| Source | Slug | Status | Resolution |
|---|---|---|---|
| Residual (own) | cgt-deferral-strategies-property-investors-uk | REWRITE | self — rewrite in place |
| Excluded (rewritten 2026-05-21) | capital-gains-tax-property-complete-guide-uk (Session C #47) | CGT pillar | No collision — pillar is comprehensive overview; this page is the deferral-mechanics survey. Reciprocal forward-link from pillar's "Deferring CGT" section to this page; reciprocal link back. |
| Excluded (rewritten 2026-05-21) | cgt-gifting-property-family-members-uk (Session B #46) | Gifting + s.165/s.260 holdover | **Adjacent — clean.** Gifting page covers s.165 holdover-on-gift-of-business-asset and s.260 holdover-on-gift-to-trust as gift-specific mechanics. This deferral page references the same statutes BUT under the deferral framework, with the gift route as one of four deferral mechanics. Reciprocal forward-link from this page's "Holdover via Gift" subsection into the gifting page for depth; the gifting page's existing FAQ #2 already cites s.165 + s.260 properly. |
| Excluded (rewritten 2026-05-21) | cgt-annual-exempt-amount-3000-allowance-2026-27 (Session 0 #14) | AEA depth | No collision — AEA is mentioned in the timing-strategies section as one of the levers (AEA-stacking via spouse pre-transfer + cross-tax-year split). Forward-link to AEA page for depth; do not restate AEA mechanics. |
| Excluded (rewritten 2026-05-21) | cgt-property-transfer-limited-company-calculate (Session C #?) | Incorporation calculation | No collision — incorporation page covers the calculation; this deferral page covers s.162 as a deferral framework with single worked walkthrough + forward-link to the calculation page for the £-for-£ working. |
| Excluded (rewritten 2026-05-21) | buy-to-let-limited-company-complete-guide-uk (Session C #?) | BTL LtdCo pillar | No collision — pillar covers the company structure end-to-end; this page references incorporation relief and forward-links. |
| Excluded (rewritten 2026-05-21) | cgt-property-transfer-spouse (Session B/C #?) | Spouse transfer mechanics | No collision — spouse-transfer page covers s.58 in detail; this deferral page references s.58 spouse-as-deferral-proxy as one of the levers, with forward-link for depth. **Note:** B1-C3 in this batch is a Track 2A brief for the same `cgt-property-transfer-spouse` slug — manager flagged cross-bucket awareness; our reference here is to the spouse-transfer concept, not a competing page. |
| Excluded (rewritten 2026-05-21) | cgt-property-2027-rate-changes-uk-landlords (Session ?) | 2027 rate hedge | No direct overlap; cross-reference only if §7 April 2027 surcharge becomes relevant to a deferral-strategy framing (which it does, because deferring across the April 2027 boundary may NOT save tax if surcharge applies to crystallised gains in 2027/28 — drafting note: clarify per §7 lock-status at execution). |
| Wave 5 (shipped 2026-05-23) | cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics | PRR + joint-spouse mechanics | No collision — PRR is a relief not a deferral; the deferral framework references PRR only obliquely. |
| Wave 6 (in-flight) | gifting-property-to-adult-children-decision-tree-cgt-iht-occupancy-mechanics | Gifting-to-adult-child decision tree | **Adjacent in-flight.** Wave 6 is actively executing on feature branches. Bucket B item B18 covers the gifting-to-adult-child decision tree which will overlap with our holdover-on-gift section. Recommend: keep our coverage at survey depth (mechanics + statute), forward-link to the Wave 6 page once shipped. Flag this for the execution session to verify Wave 6 sibling status before publishing. |
| Wave 6 (in-flight) | mvl-members-voluntary-liquidation-property-company-cgt-vs-income-treatment (Bucket A #4, ✅ done on feature branch) | MVL extraction with CGT vs income | No direct collision; cross-reference from our incorporation-relief section to mention the post-incorporation extraction sequence pillars without restating. |
| Residual (intra) | reduce-cgt-property-disposal-uk (B1-A2, this batch in-flight) | Reduce-CGT survey | **Adjacent in-flight.** That page is also a survey but action-oriented ("how to reduce") whereas this page is mechanism-oriented ("how to defer"). Differentiate by framing: reduce-page lists levers (PRR + AEA + spouse + lettings relief + cost capitalisation + timing) and routes to specialist pages; defer-page is the specialist depth for the **deferral** subset. Reciprocal forward-link both ways. |
| Residual (intra) | cgt-property-sold-loss-claim-capital-losses (B1-A3, this batch in-flight) | Capital losses | No collision — losses are computational, not a deferral mechanic. |

**Conclusion:** REWRITE in place. No REDIRECT-PROPOSED. No FLAG-MANAGER. Cluster positioning clean: this page is the dedicated deferral-mechanics survey within the rewritten CGT cluster.

---

## Closest existing pages (Stage 2)

Internal-link partners (to and from this page):

- **CGT pillar:** `capital-gains-tax-property-complete-guide-uk` — back-link target; rewrite must add reciprocal forward-link from "Deferring Capital Gains Tax" pillar section to this page.
- **AEA depth:** `cgt-annual-exempt-amount-3000-allowance-2026-27` — forward-link from §"Timing as Quasi-Deferral" for AEA-stacking depth.
- **Gifting + s.165/s.260 holdover:** `cgt-gifting-property-family-members-uk` — bidirectional. Forward-link from §"Holdover Relief (Gifts of Business Assets)" + the converse forward-link from gifting page's holdover FAQ.
- **Spouse transfer:** `cgt-property-transfer-spouse` — forward-link from §"Spouse Transfer as Pre-Sale Deferral" for s.58 depth.
- **BTL Ltd Co pillar:** `buy-to-let-limited-company-complete-guide-uk` — forward-link from §"Incorporation Relief (s.162)" for the company-side mechanics.
- **Incorporation calc:** `cgt-property-transfer-limited-company-calculate` — forward-link from §"Incorporation Relief" worked example for the calculation depth.
- **CGT rates explainer:** `cgt-rates-property-2026-27-current-rates-explained` (gold-reference trial brief target) — forward-link from §"Why Deferral Matters" intro for the 18%/24% rate context.
- **CGT 2027 hedge:** `cgt-property-2027-rate-changes-uk-landlords` — forward-link from §"April 2027 Hedge in Deferral Decisions" if §7 surcharge applies on crystallisation in 2027/28.
- **2027 income-tax surcharge:** `2027-property-income-tax-rates-landlords-uk` (rewritten pillar) — secondary forward-link in the §7 hedge paragraph.
- **PRR (residual):** `principal-private-residence-relief-landlords` — forward-link from §"Timing as Quasi-Deferral" for the deemed-occupation-period mechanics.
- **Property accountant services:** `what-does-a-property-accountant-do` — anchor link at end of body (one of the inline-CTAs).

---

## House-position references (Stage 1)

- **§5 CGT on UK residential property (2026/27)** [LOCKED 2026-05-23 — verified gov.uk/capital-gains-tax/rates per gold-reference brief]: primary lock. Rates 18%/24% (residential), £3,000 AEA, 60-day reporting cycle. Page must match exactly.
- **§6 FHL — abolition transition** [LOCKED]: load-bearing for the rollover-eligibility section (post-5-April-2025 abolition closes BADR and most s.152 rollover routes for serviced accommodation that doesn't meet the substantial-services Pawson distinguishing test).
- **§7 April 2027 property income tax surcharge** [LOCKED but **VERIFY at execution** per §16.22 + §16.27 + §16.30 + §16.33 + §16.40 + F-2 + F-5 Bill-vs-enacted drift pattern]: deferring a 2026/27 gain into 2027/28 may NOT save tax if surcharge applies to property income (note: surcharge is on income, not on capital gains — but per §7 the 22/42/47 rates are scheduled in draft FA 2026; verify enactment status). **Wave 6 F-9 implies FA 2026 is now enacted** (s.455 rate substituted 33.75% → 35.75% per FA 2026). Execution session must verify §7 lock status freshly against legislation.gov.uk Finance Act 2026 once enacted text is published. If enacted: assert 22/42/47 with citation. If still Bill-form: hedge.
- **§13 Do-not-write list (general)** [LOCKED]: NO pricing (per agency lead-gen model F-1 finding); NO real client names; NO em-dashes; NO emoji in body.
- **§15.3 Gifts with reservation of benefit (GROB) — s.102 FA 1986** [LOCKED]: load-bearing for the "gift as deferral" framing — must flag the GROB trap (parent gifts to child but continues to occupy → still in estate; PET illusory). The legacy page does not currently mention GROB.
- **§17.6 Domicile reform and residence-based regime (April 2025+)** [LOCKED]: load-bearing for dropping the offshore-structures paragraph (line 86 of legacy). The remittance-basis abolition + FIG regime change means most pre-2025 offshore-deferral structures no longer work; the legacy paragraph is outdated.
- **§21 Ltd Co + FIC** [LOCKED, Wave 4 + §21.4 patched 2026-05-23 with F-19 / F-20 NI + dividend corrections]: load-bearing for the incorporation-relief (s.162) section. CIHC citation = CTA 2010 s.18N per §16.3 / §21.7 do-not-write list (NEVER s.34). s.455 rate is now 35.75% (substituted by FA 2026, F-9 Wave 6 catch) — if the incorporation-relief worked example touches s.455 / DLA, use 35.75% not 33.75%.

---

## House-position conflict flag (Stage 2)

**No direct lock-vs-body conflict found, but two staleness drifts in current body to flag:**

**Flag (a) — VOICE-FRESHNESS / STALE_FIGURES** at line 86 ("Offshore Structures and Deferral"): the paragraph references "offshore funds rules, transfer pricing rules, and controlled foreign company legislation" but does NOT mention the **6 April 2025 residence-based IHT regime + remittance basis abolition + FIG regime** (§17.6 + §15.6). Pre-2025 offshore-deferral structures are largely closed; the paragraph implies they may still work with professional advice. Recommended fix at rewrite: drop the section, replace with single sentence routing to non-resident-landlord page + cross-link to §17 expat coverage.

**Flag (b) — STALE_FIGURES / Bill-vs-enacted pattern** (paragraph on "Future Tax Changes", line 94): "The deferred gain could become chargeable at higher rates than apply currently" — fine as a hedge, but should be tightened with the explicit April 2027 surcharge note per §7 + the FA 2026 enactment-status check.

**Recommend:** raise a fresh site-wide flag at brief close if execution session confirms FA 2026 enactment of the April 2027 rates substitutes the existing Bill-form treatment across the rewritten cluster (consistent action across all pages citing 2027 rates). See site-wide flag draft below.

---

## Authority links worth considering (Stage 2 — WebFetch verification status)

| URL | Verification status | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/1992/12/schedule/5B | **200 OK + operative text present + verified 2026-05-23**. Opening line: "This Schedule applies where—(a)there would (apart from paragraph 2(2)(a) below) be a chargeable gain ('the original gain') accruing to an individual ('the investor') at any time ('the accrual time') on or after 29th November 1994" | EIS deferral relief statute anchor — cite verbatim section header in §"EIS Deferral (Sch 5B)". |
| https://www.legislation.gov.uk/ukpga/1992/12/section/152 | **200 OK + operative text present + verified 2026-05-23**. Opening line: "If the consideration which a person carrying on a trade obtains for the disposal of, or of his interest in, assets ('the old assets')..." | Rollover relief on replacement of business assets — cite for the trader-only restriction in §"Business Asset Rollover Relief (s.152)". |
| https://www.legislation.gov.uk/ukpga/1992/12/section/165 | **200 OK + operative text present + verified 2026-05-23**. Opening line: "If—(a)an individual ('the transferor') makes a disposal otherwise than under a bargain at arm's length of an asset within subsection (2) below..." | Holdover gifts of business assets — cite for §"Holdover Relief (Gifts of Business Assets, s.165)". |
| https://www.legislation.gov.uk/ukpga/1992/12/section/260 | **Verify at execution** (not in this brief's fetch budget). | Holdover on gifts to relevant property trusts — cite for §"Holdover via Trust Route (s.260)". |
| https://www.legislation.gov.uk/ukpga/1992/12/section/58 | **Verify at execution** (use referenced via Wave 5 §24.4 lock + gold-reference verification). | Spouse no-gain-no-loss — cite for §"Spouse Transfer as Pre-Sale Deferral". |
| https://www.legislation.gov.uk/ukpga/1992/12/section/162 | **Verify at execution.** | Incorporation relief — cite for §"Incorporation Relief (s.162) as Deferral". |
| https://www.gov.uk/capital-gains-tax/rates | **Verified live 2026-05-23 per gold-reference brief.** | Cross-reference for rate-context intro paragraph. |
| https://www.gov.uk/guidance/venture-capital-schemes-deferred-investments-using-eis-and-seis | **Verify at execution.** | EIS deferral practical guidance — gov.uk publication URL needs liveness check. |
| HMRC CG Manual CG67033 (s.165 holdover relief introduction) | **Verify at execution.** Per F-7 PIM4101 hallucination lesson, never cite a manual section number without WebFetch verification. | s.165 working-practice reference. |
| HMRC CG Manual CG60280-onwards (s.152 rollover relief) | **Verify at execution.** Same discipline. | s.152 working-practice reference. |

**(Execution session selects 5-7 to actually cite in body — target 5 verified statutory + 2 HMRC manual + 1 gov.uk consumer page.)**

---

## Universal rules (do not skip)

Inherits from `TRACK2_PROGRAM.md §4 sections 13 + 14` (which pointer into `NETNEW_PROGRAM.md §4` + `competitor_rewrite_playbook.md §5` + §16 lessons). Critical for this brief:

- **NO em-dashes** (per memory note + §13 do-not-write).
- **NO pricing on-site** (per agency lead-gen handoff model + F-1 finding).
- **Anonymised social proof only** (no real client names).
- **LeadForm auto-injected by `BlogPostRenderer.tsx`** — never manually add a lead form in markdown.
- **1-3 inline `<aside>` CTAs** at conversion moments (after EIS section + after incorporation-relief section + before closing). Use semantic HTML, not Tailwind classes.
- **FAQs schema auto-emitted** by `buildBlogPostingJsonLd` from frontmatter `faqs:` array — never manually add FAQ schema in body.
- **House position §7 hedge MANDATORY** per F-2 + F-5 Bill-vs-enacted discipline.
- **URL liveness re-verification at execution** for any URL cited in body — per §16.31 and F-7.
- **Statute-content verification (not just URL liveness)** for any TCGA section cited — per F-8 (TCGA s.4 substituted by FA 2019, URL live but content gutted).

---

## 19-step workflow (legacy-rewrite adaptation)

Inherits from `NETNEW_PROGRAM.md §7` 19-step workflow with the 3 Track 2 deltas (Step 9 = rewrite-existing-file, Step 12 = no-redirect-needed, Step 13 = update-monitored_pages-existing-row-OR-insert). Brief-specific notes:

- **Step 1 reading:** `docs/property/house_positions.md` §5, §6, §7, §13, §15.3, §17.6, §21 in full before drafting body.
- **Step 4:** verify §7 (April 2027) lock-status against legislation.gov.uk Finance Act 2026 — particularly whether 22/42/47 income-tax-on-property rates are now enacted (per Wave 6 F-9 implication that FA 2026 is enacted). If enacted: assert with citation. If still Bill-form: hedge.
- **Step 5:** re-fetch the 4 competitor URLs (especially the ukpropertyaccountants rollover URL that returned truncated body in this brief's fetch — manual re-fetch needed before citing as comparator).
- **Step 6:** read the current source file in full to confirm no edit since 2026-04-10.
- **Step 7:** read all 9 closest-existing on-site sibling pages listed above (8 are rewritten 2026-05-21 + 1 is residual PRR).
- **Step 8:** plan rewrite outline — 12-14 H2s, 3,000-3,400 body words, 12-14 FAQs, decision-table contrasting four mechanics.
- **Step 9:** rewrite markdown at existing path. Preserve frontmatter `slug` + `canonical` + `date` (update `dateModified` to today). Update `metaTitle` (test 2-3 candidates oriented at "defer cgt property uk" phrasing). Update `metaDescription` with named statute references (Sch 5B / s.152 / s.165 / s.162) for distinctive answer-shape.
- **Step 10:** site build `cd Property/web && npm run build`. Must pass.
- **Step 11:** six checks per `competitor_rewrite_playbook §4.3`.
- **Step 12:** no redirect needed (REWRITE-in-place).
- **Step 13:** insert NEW `monitored_pages` row (page has zero current GSC; this is foundational SEO, not regression-monitoring). Window = 180 days (longer than CTR-FAIL pages because no baseline to regress against).
- **Step 14:** commit on main. Tracker edits via absolute path only.
- **Steps 15-19:** mark ✅ executed; update flags + heartbeat; next page in batch.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §5 CGT 2026/27 (18% / 24% + £3k AEA): __
- §6 FHL post-abolition implications on rollover / BADR: __
- §7 April 2027 — lock status at write: __ Bill-form (hedge) / __ enacted via Finance Act 2026 (assert with citation)
- §13 no-pricing / no-real-client-names: __
- §15.3 GROB note in gift-as-deferral section: __
- §17.6 offshore-structures paragraph dropped: __
- §21 incorporation relief (s.162) + s.455 35.75% (if mentioned): __

### Comparison: before vs after
- Word count: ~1,750 → __
- H2 count: 6 (+ 5 H3) → __
- FAQ count: 4 → __
- Authority links: 0 → __
- Inline CTAs: 0 → __
- Worked examples: 1 → __
- Decision table: 0 → __ (1 expected)

### Foundational SEO hypothesis test
- Pre-rewrite GSC baseline (2026-02-22 to 2026-05-23): 0 impressions / 0 clicks
- Post-rewrite expected: 100-200 impressions / 90 days within 6-12 months (foundational, not lift)
- Verify at +90 / +180 days via monitored_pages detector (extended window because no baseline)

### Flags raised
- Any new flags surfaced: __

### 2-3 sentence summary
- (populated at execution time)
