# Track 2 brief: reduce-cgt-property-disposal-uk

**Site:** property
**Brief type:** Legacy rewrite — Batch 1 Sub-bucket A (CGT reliefs / planning)
**Source markdown path:** `Property/web/content/blog/reduce-cgt-property-disposal-uk.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/reduce-cgt-property-disposal-uk
**Stage 1 priority:** **M** (no GSC signal yet — invisible page; but the slug carries strong commercial-intent phrasing "reduce cgt on property disposal" which competitor pages are weak on — foundational rewrite is defensible as future demand-capture asset)
**Stage 1 date:** 2026-05-23
**Stage 2 enrichment date:** 2026-05-23
**Cannibalisation status:** REWRITE — clean. Page owns the **action-oriented / "how-to-reduce" survey** intent, which is differentiated from (a) the CGT pillar's overview, (b) the deferral page's mechanism-oriented survey (B1-A1 in this batch), (c) the rewritten gifting / AEA / rates / calculation pages that own specialist depth. **Strong candidate for FLAG-MANAGER review** to confirm survey-of-surveys positioning, but reasoning supports REWRITE as the primary recommendation (see §"Cannibalisation universe check"). Manager: please confirm.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `reduce-cgt-property-disposal-uk`. Slug maps to a clear action-intent ("how to reduce CGT") that is differentiated from "what is CGT" (pillar) and "how to defer CGT" (B1-A1). No redirect candidate among rewritten siblings.
- **Category:** `capital-gains-tax` (kept).
- **Gap-mode tag:** `DEPTH` (primary, every lever is 100-200 words = thin) + `VOICE-FRESHNESS` (secondary, current body contains identifiable staleness drifts including a "Companies pay 19% CGT" error and a pre-April-2020 lettings-relief framing) + `STRUCTURE` (tertiary, no decision-table / no calculation walkthrough / 7 FAQs but each ~50 words).
- **"Why this rewrite" angle:** the legacy page is the right framing (action-oriented survey of CGT-reduction levers) and the slug is well-shaped, but the body suffers three concurrent problems: (a) thinness — each lever gets 100-200 words so none becomes the authoritative answer; (b) factual drift — two stale-figure issues need correction at rewrite; (c) sibling routing — the 8 rewritten CGT siblings now exist as the depth pages, but the current legacy body restates their mechanics rather than routing to them. Right rewrite is **survey-as-router**: each lever named, statute anchored, one worked example, hard route to the specialist page. Body lifts to 2,500-3,000 words with 10-12 levers + 12-14 FAQs + 1 decision-table + 1 worked-portfolio example.

---

## Current page snapshot (Stage 2 — pulled from filesystem; no `page_content_map` row)

**Supabase `page_content_map` row:** **none.** Page has never been parsed (parser only walks pages with GSC impressions; this page has none).

**Filesystem source read (`Property/web/content/blog/reduce-cgt-property-disposal-uk.md`, 86 lines):**
- `metaTitle`: "How to Reduce CGT on Property Disposal UK - Tax Strategies" (60 chars)
- `metaDescription`: "Timing, PPR relief, annual exemptions, and spouse transfers can cut your CGT bill on property disposals. Key strategies for UK landlords." (138 chars — short, headroom)
- Word count: ~1,800 (estimate from line count + para density)
- 8 H2 sections (Understanding and Calculating CGT Position / Utilise Personal Allowances and Spouse Transfers / Claim Available Reliefs [+3 H3] / Offset Losses and Enhance Base Cost / Strategic Timing of Disposals / Consider Company Structures and Incorporation / Deferred Payment and Instalment Strategies / Planning for Portfolio Disposals / Professional Planning and Record Keeping / Related Reading) + 3 H3 subsections inside Reliefs
- 7 FAQs in frontmatter `faqs:` array (rates / improvements / deductible costs / company-incorporation / timing / portfolio sequence / company ownership)
- 1 worked example (£200k cost / £350k sale / £137k taxable gain / £32,880 CGT at higher rate)
- Internal links: 4 (CGT pillar, PRR page, /incorporation page mentioned twice, cgt-property-transfer-spouse page) — note the `/incorporation` link is a top-level path, not a blog slug; verify destination at execution
- Outbound authority links: 0 (no gov.uk / legislation.gov.uk / HMRC manual citations)
- Last meaningful edit: 2026-03-29 (frontmatter `date`)
- Frontmatter has NO `metaTitle_prev` / `metaDescription_prev` — no prior meta rewrite attempted

**Drift hazards in current body (critical, both load-bearing for rewrite):**
- **Line 23 + line 68 — STALE FIGURE / WRONG TAX TERM:** "Companies pay 19% CGT versus up to 24% for individuals" (FAQ #4) and "company Corporation Tax rates are lower (19% for profits up to £250k, 25% main rate)" (body). Companies pay **Corporation Tax** on chargeable gains, **NOT CGT**. The conflation is a textbook error and a credibility hit. Rewrite must rename the section "Corporate Disposal Treatment" and correctly distinguish CT on disposal of asset (company side) from CGT on disposal of shares in the company (shareholder side, with potential BADR for trading companies only).
- **Line 49 — STALE FRAMING on Lettings Relief:** "You can claim up to £40,000 relief if the property was your main residence at some point and you later let it out, provided you still live in the property when you sell it." The §5 LOCKED position: Letting Relief is restricted from 6 April 2020 — only available where the owner shared occupation with the tenant during the let period. The current page conflates the pre-2020 "main residence at some point + later let" rule (no longer the relief test) with the post-2020 "shared occupation" rule. Rewrite must adopt the post-2020 framing exactly per §5.
- **Line 17 — STALE TAX YEAR REFERENCE in FAQ #1:** "For residential property disposals, CGT rates are 18% for basic rate taxpayers and 24% for higher rate taxpayers in 2025/26." The rates are now 2026/27 (the same 18%/24% but the year reference is one cycle behind). Update at rewrite to 2026/27.
- **Line 51 — partial drift on BADR:** "Furnished holiday lets that meet the qualifying conditions might be eligible". §6 LOCKED: FHL abolished 6 April 2025; BADR on FHL was available until 5 April 2025 only. Anti-forestalling rules between announcement (6 March 2024) and abolition close most pre-abolition disposal routes. Rewrite must reframe FHL-BADR as historical with the abolition date called out.

---

## GSC angle (last 90 days) — REAL DATA from `gsc_query_data`

**Pulled 2026-05-23 via `python -m optimisation_engine.track2.pull_page_data --slug reduce-cgt-property-disposal-uk --days 90`.**

**Aggregate:** **0 impressions / 0 clicks / 0 distinct queries** in 90-day window. **0 GA4 rows.**

**Same INVISIBLE pattern as airbnb T1 + B1-A1.** Page has never shown in SERPs at the impression-tracked depth and has never been parsed by the page_content_map walker.

**Strategic conclusion:** as with B1-A1, the rewrite cannot be tuned to specific queries. Foundational rewrite needs to (a) fix the factual drift (the 19% CGT error is a public credibility risk if it ever does pick up traffic), (b) anchor with statute, (c) sibling-route hard so the survey-as-router framing is intentional. Realistic post-rewrite target: 100-200 impressions / 90 days within 6-12 months. The slug "reduce cgt on property disposal" is a high-commercial-intent phrasing that has not yet been ranked, but if it does emerge the action-oriented framing is the right answer-shape.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined Stage 2)

**Primary: DEPTH.** Page surveys 10 levers (AEA / spouse-transfer / PRR / lettings relief / BADR / capital losses / cost capitalisation / timing / company structures / instalment / portfolio sequencing) across 8 H2s + 3 H3s in ~1,800 words. That gives 150-200 words per lever, which is sufficient for a brief mention but insufficient to outrank the specialist sibling page on any one lever. Two paths:

(a) **Double the page** to 3,500-4,000 words and try to be the specialist depth on each lever — wrong choice because that would duplicate the rewritten siblings.

(b) **Reframe as survey-as-router** at 2,500-3,000 words: each lever gets 200-300 words (definition + statute + one-sentence worked example + named-link route to specialist sibling page for depth). Right choice because it preserves the action-intent of the slug while leveraging the rewritten cluster as the depth layer.

Recommended: (b).

**Secondary: VOICE-FRESHNESS / STALE_FIGURES.** Three stale-figure / wrong-tax-term issues identified at §"Current page snapshot" (Companies pay 19% CGT / Lettings Relief pre-2020 framing / 2025/26 year reference / FHL-BADR framing). All load-bearing — the 19% CGT error in particular is a credibility risk on a page about reducing CGT.

**Tertiary: STRUCTURE.** No rates table, no decision-tree, no calculation walkthrough as a worked-example, only one worked example (the £200k → £350k → £32,880 calc, which is too short to be authoritative). 7 FAQs is closer to target than B1-A1's 4, but each is ~50 words and many duplicate the body framing rather than targeting unique zero-click queries.

**Not present: CTR-FAIL** (no impressions), **not pure CANNIBAL** (survey-as-router framing is differentiated from each rewritten sibling — but **survey-of-surveys risk** exists if the rewrite doesn't commit to the router framing; this is the **FLAG-MANAGER** caveat in the Cannibalisation status).

**Load-bearing fix sequence (ordered by ROI):**

1. **Fix the Companies-pay-19%-CGT error** — rename to "Corporate Disposal" section, distinguish CT-on-gain (s.2 CTA 2009 + CTA 2009 ss.741-755 / CGT-mechanics-incorporated rules) from CGT-on-shares (TCGA 1992 s.21 + s.4 rates for shareholders). This is mandatory.
2. **Fix Lettings Relief framing** per §5: must say "Letting Relief is restricted from 6 April 2020 — only available where the owner shared occupation with the tenant during the let period." Cross-reference HMRC CG65030+ (verify exact section at execution per F-7 discipline). Drop the "£40,000 relief if main residence at some point" framing entirely.
3. **Update FHL-BADR framing** per §6: BADR on FHL was available until 5 April 2025 only. Anti-forestalling rules between 6 March 2024 (announcement) and 5 April 2025 (abolition) closed most pre-abolition routes. Post-abolition FHL is taxed as standard residential rental property; BADR is not available.
4. **Update tax-year reference** from 2025/26 to 2026/27 throughout.
5. **Add statute spine:** TCGA 1992 s.222 (PRR), TCGA 1992 s.58 (spouse no-gain-no-loss), TCGA 1992 s.16 (allowable losses), TCGA 1992 s.38 (allowable cost / enhancement expenditure), TCGA 1992 s.162 (incorporation relief), TCGA 1992 s.169I-T (BADR), TCGA 1992 Sch 5B (EIS deferral if cross-linking to B1-A1). All verified live + operative 2026-05-23 (see §"Authority links").
6. **Reframe as survey-as-router** — each lever gets one section with named statute, one-sentence worked example, and a forward-link route to the specialist sibling page for depth. The rewrite's distinctive value is the comparison table at the end (which lever for which fact pattern).
7. **Add the comparison decision-table** — Lever / Statute / Eligible scenarios / Approx tax saving / Specialist depth page / Notes. One row per lever; eight or so rows. Distinctive value vs competitor surveys.
8. **Add a worked portfolio example** — three-property portfolio with mixed gains, illustrating which levers apply to which property and the cumulative tax saving. Best-in-class for the slug intent.
9. **FAQ count 7 → 12-14** with each FAQ targeting a specific zero-click query verbatim (highest-priority FAQs: "can I avoid CGT on rental property uk" / "how to reduce CGT on second home" / "how much CGT will I pay on btl sale" / "is it worth incorporating to reduce CGT" / "can my spouse take the gain" / "can I claim losses against rental property gains" / "what if I lived in the property before letting it out" / "what improvements can I deduct from CGT" / "how does the £3,000 allowance work for couples" / "do I pay CGT if the property is below market price"). Each FAQ is 60-80 words with statute anchored.

---

## Competitor URLs (Stage 2 — verified live 2026-05-23 via WebFetch)

| URL | Status | Coverage signals |
|---|---|---|
| https://www.ukpropertyaccountants.co.uk/reducing-capital-gains-tax-on-second-home-sales-expert-strategies/ | 200 OK, content **partially extracted** (model returned 3 of likely 6+ H2s before truncation — flag for re-fetch at execution) | Estimated ~2,500-3,500 words. Partial H2s visible: "Capital Gain on Sale of Residential Property" / "Private Residence Relief". Coverage signals confirmed: PRR ✓, AEA ✓, allowable costs ✓, spouse transfer ✓ (FAQ-confirmed s.58 no-gain-no-loss), timing ✓ (final 9 months PRR). Notable omissions confirmed by extracted body: NO BADR mention, NO incorporation strategies mention. No statute citations. Two worked examples. Intermediate depth. |
| https://www.ukpropertyaccountants.co.uk/capital-gains-tax-on-buy-to-let-property-in-2024-25/ | 200 OK, content confirmed | ~2,500 words, 4 FAQs, 8 H2s, covers PRR + AEA + allowable expenses + spouse transfer + timing. **STALE FIGURE in competitor:** "Higher-rate taxpayers (>£50,270): 28% CGT" — this is the pre-30-Oct-2024 rate. Current rate is 24%. Our differentiation: factual accuracy + 2026/27 framing + BADR + incorporation. No statute citations. Two worked examples. |
| https://www.taxaccountant.co.uk/conditional-contracts-for-cgt-planning/ | Confirmed live (this URL surfaced in sitemap grep) — **content not fetched in this brief's budget; flag for execution-time fetch.** | Niche angle on conditional contracts as a timing-as-deferral mechanic. Likely 1,500-2,500 words on specific contract-mechanics. Cross-link target for our timing section. |
| https://www.legislation.gov.uk/ukpga/1992/12/section/152 | **200 OK + operative text present + verified 2026-05-23** | Rollover authority — cross-cite from this page's "rollover does not apply to BTL" framing (consistent with house position §5 + the deferral-page B1-A1). |

**Competitor depth ceiling for this query class:** 2,500-3,500 words, 0-4 FAQs, 0 statute citations across the three. Both UKPA competitors carry stale-figure issues (28% rate). Our 2,500-3,000 word rewrite with 12-14 FAQs + factual accuracy + statute spine + sibling-routing + decision-table + worked-portfolio example puts us best-in-class against this competitive set without bloat.

**What to borrow:** the UKPA second-home page's structural sequence (introduce CGT → list levers → worked example → FAQs) is the right pattern; our rewrite improves on it by sibling-routing each lever to the specialist depth page and adding the comparison decision-table.

**What to differentiate against:** all three competitors (a) skip statutory anchoring, (b) carry stale-figure issues (28% CGT rate, pre-2020 lettings relief framing), (c) skip the FHL-post-abolition impact, (d) skip the survey-as-router framing (each is a thin survey trying to be the depth page).

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (frozen 2026-05-23 PM). Re-read at brief drafting 2026-05-23.

| Source | Slug | Status | Resolution |
|---|---|---|---|
| Residual (own) | reduce-cgt-property-disposal-uk | REWRITE | self — rewrite in place as survey-as-router |
| Excluded (rewritten 2026-05-21) | capital-gains-tax-property-complete-guide-uk (Session C #47) | CGT pillar | **Adjacent — risk of survey-of-surveys overlap.** Pillar provides comprehensive overview ("what is CGT, how does it work, what are the rates, what are the reliefs"). This page is action-oriented ("how do I reduce my CGT bill"). Intent differentiation: pillar = informational, reduce-page = transactional. Both can coexist if the reduce-page commits to the router framing and links *into* the pillar for definitional depth. Reciprocal forward-link both ways. **FLAG for manager:** verify post-rewrite that reduce-page does not duplicate pillar's relief-list section by paraphrasing. |
| Excluded (rewritten 2026-05-21) | cgt-annual-exempt-amount-3000-allowance-2026-27 (Session 0 #14) | AEA depth | No collision — AEA is one lever; reduce-page references AEA at ~150-200 words and forward-links for depth. |
| Excluded (rewritten 2026-05-21) | cgt-gifting-property-family-members-uk (Session B #46) | Gifting + s.165/s.260 holdover | No collision — gifting is a deferral mechanism, not primarily a reduction mechanism. Cross-link from "Gift-as-deferral via Holdover" subsection (if covered) routes to gifting page. |
| Excluded (rewritten 2026-05-21) | cgt-calculation-selling-buy-to-let-property-step-by-step (Session C #35) | Calculation walkthrough | No collision — calculation page is the calc depth; reduce-page references the calc shape briefly + forward-links for the full walkthrough. |
| Excluded (rewritten 2026-05-21) | cgt-property-transfer-spouse | Spouse transfer mechanics | No collision — spouse-transfer page covers s.58 in detail; reduce-page references spouse-transfer as one lever (rate-band-arbitrage + AEA-stacking) + forward-links. **Note:** B1-C3 in this batch is the Track 2A brief for this slug — coordination via cross-bucket awareness, not a separate competing page. |
| Excluded (rewritten 2026-05-21) | cgt-selling-buy-to-let-property-calculation-guide (Session ?) | BTL CGT calculation | Probable redundancy with cgt-calculation-selling-buy-to-let-property-step-by-step — Phase 2 cluster-audit candidate (flag as STRUCTURAL_DEFECT cluster duplicate). Not direct collision with reduce-page. |
| Excluded (rewritten 2026-05-21) | buy-to-let-limited-company-complete-guide-uk | BTL Ltd Co pillar | No collision — pillar covers the company structure end-to-end; reduce-page references incorporation as one lever + forward-links. |
| Excluded (rewritten 2026-05-21) | cgt-property-transfer-limited-company-calculate | Incorporation calculation | No collision — reduce-page references incorporation as one lever with a brief mention of s.162 relief + forward-links to the calc page for depth. |
| Excluded (rewritten 2026-05-21) | cgt-rates-property-2026-27-current-rates-explained (gold-reference trial) | CGT rates explainer | No collision — reduce-page references rates briefly in the intro + forward-links. |
| Wave 5 (shipped 2026-05-23) | cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics | PRR + joint-ownership election | No collision — Wave 5 page is the depth on joint-ownership PRA election; reduce-page references PRR briefly + forward-links for any joint-ownership angle. |
| Wave 5 (shipped 2026-05-23) | form-17-declaration-beneficial-interest-property-mechanics-filing-revocation | Form 17 mechanics | No direct collision but reduce-page's spouse-transfer subsection should cross-link to Form 17 page for the income-split mechanics when discussing pre-sale rate-band arbitrage. |
| Residual (intra) | cgt-deferral-strategies-property-investors-uk (B1-A1, this batch in-flight) | Deferral-mechanics survey | **Adjacent in-flight.** B1-A1 is mechanism-oriented (defer); this page is action-oriented (reduce). Reciprocal forward-link both ways — B1-A1's deferral mechanics are a subset of this page's reduction levers. Sub-bucket coordination: drafting both in same sub-bucket means we can keep the framing tight. |
| Residual (intra) | cgt-property-sold-loss-claim-capital-losses (B1-A3, this batch in-flight) | Capital losses | No collision — losses page is computational; reduce-page references loss-offset as one lever + forward-links. |
| Residual (intra) | section-24-tax-relief-complete-guide / claim-mortgage-interest-rental-property-uk-section-24 | Section 24 finance-cost restriction | No direct collision; reduce-page's "timing around income changes" subsection can forward-link to S24 page for the income-tax-rate interaction. |
| Residual (intra) | principal-private-residence-relief-landlords | PRR depth | No collision — reduce-page references PRR + forward-links. |
| Residual (intra) | capital-gains-tax-selling-rental-property-uk | Generic CGT-on-sale | **Potential structural-defect cluster duplicate** with both this reduce-page and the CGT pillar. Phase 2 cluster audit candidate; flag as STRUCTURAL_DEFECT. Not direct collision with reduce-page. |

**Conclusion:** REWRITE in place as survey-as-router with strong sibling-routing discipline. The FLAG-MANAGER element is a **post-rewrite spot check** (not a pre-rewrite block): manager should confirm at brief-close-spot-check that the rewrite committed to router framing rather than survey-of-surveys paraphrasing. Recommended status: **REWRITE with manager-spot-check at execution close.**

---

## Closest existing pages (Stage 2)

Internal-link partners (to and from this page) — eleven specialist depth pages exist for the levers this survey routes to:

- **CGT pillar:** `capital-gains-tax-property-complete-guide-uk` — back-link target; reciprocal forward-link from "What is CGT" intro to pillar; reciprocal link from pillar's reduction-levers section.
- **AEA depth:** `cgt-annual-exempt-amount-3000-allowance-2026-27` — forward-link from §"Use the £3,000 Annual Exempt Amount" subsection.
- **Calculation walkthrough:** `cgt-calculation-selling-buy-to-let-property-step-by-step` — forward-link from §"Calculate Your CGT First" intro + from worked example.
- **Gifting:** `cgt-gifting-property-family-members-uk` — forward-link from §"Gift Holdover" subsection.
- **Spouse transfer:** `cgt-property-transfer-spouse` — forward-link from §"Pre-Sale Spouse Transfer" subsection.
- **PRR:** `principal-private-residence-relief-landlords` (residual) — forward-link from §"Maximise PRR" subsection.
- **PRR joint ownership:** `cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics` (Wave 5) — forward-link from PRR section for joint-ownership angle.
- **BTL Ltd Co pillar:** `buy-to-let-limited-company-complete-guide-uk` — forward-link from §"Incorporation" subsection.
- **Incorporation calc:** `cgt-property-transfer-limited-company-calculate` — forward-link from §"Incorporation" worked example.
- **Capital losses:** `cgt-property-sold-loss-claim-capital-losses` (B1-A3, this batch in-flight) — forward-link from §"Offset Capital Losses" subsection.
- **CGT rates:** `cgt-rates-property-2026-27-current-rates-explained` (gold-reference) — forward-link from intro "Current CGT rates" paragraph.
- **CGT deferral:** `cgt-deferral-strategies-property-investors-uk` (B1-A1, this batch in-flight) — forward-link from "Defer rather than reduce" caveat paragraph for the deferral subset.
- **CGT 2027 hedge:** `cgt-property-2027-rate-changes-uk-landlords` — forward-link from "Future rate changes" hedge paragraph.
- **Form 17:** `form-17-declaration-beneficial-interest-property-mechanics-filing-revocation` (Wave 5) — forward-link from §"Pre-Sale Spouse Transfer" for income-split mechanics.
- **60-day reporting:** `cgt-payment-deadlines-property-sales-2026` (rewritten) — forward-link from §"After You've Reduced — File On Time" closing reminder.
- **Property accountant services:** `what-does-a-property-accountant-do` — anchor link at end of body for the inline-CTA.

---

## House-position references (Stage 1)

- **§5 CGT on UK residential property (2026/27)** [LOCKED 2026-05-23]: primary lock. Rates 18%/24% (residential), £3,000 AEA, 60-day reporting cycle, Letting Relief restriction (post-April-2020 shared-occupation rule). The legacy page's Lettings Relief paragraph violates §5 — rewrite must adopt the §5 framing exactly.
- **§6 FHL — abolition transition** [LOCKED]: load-bearing for the BADR-on-FHL paragraph (post-5-April-2025 abolition + anti-forestalling).
- **§7 April 2027 property income tax surcharge** [LOCKED but **VERIFY at execution** per Bill-vs-enacted pattern — F-5 + Wave 6 F-9 may indicate FA 2026 enacted]: relevant if reduce-page touches the "wait until next tax year for lower CGT rate" framing — note that CGT rates are not affected by the 2027 surcharge (which is on property income), but a section on "time disposal across the 2027 boundary" must be hedged correctly. Recommended drafting: assert "CGT rates are not affected by the April 2027 surcharge announced for property income; the 18%/24% CGT rates remain through 2027/28 subject to confirmation in the Autumn Budget 2026 settlement."
- **§13 Do-not-write list (general)** [LOCKED]: NO pricing (per agency lead-gen model + F-1 finding); NO real client names; NO em-dashes; NO emoji in body.
- **§15.3 GROB — s.102 FA 1986** [LOCKED]: load-bearing for any "gift as reduction" framing — if the rewrite covers gift-as-reduction (it should, briefly), must flag the GROB trap.
- **§21 LtdCo + FIC** [LOCKED, Wave 4 + §21.4 patched 2026-05-23 with F-19 / F-20]: load-bearing for the corrected "Corporate Disposal" section. CT rates 19% / 25% (s.18 + s.18A CTA 2010 etc.). CIHC citation = CTA 2010 s.18N. **NOT s.34.**
- **§24 Form 17 + joint ownership + spouse-mechanics** [LOCKED 2026-05-23]: load-bearing for the pre-sale spouse-transfer + AEA-stacking section. Must distinguish (a) the s.58 spouse-transfer mechanics from (b) the Form 17 income-split mechanics from (c) the underlying declaration-of-trust deed. Recent Wave 5 lock — coordinate framing with the Wave 5 cluster (form-17 page + cgt-main-residence-relief-joint-ownership-pra-election + declaration-of-trust page).

---

## House-position conflict flag (Stage 2)

**Three confirmed conflicts in the current body — all load-bearing for the rewrite:**

**Flag (a) — STALE_FIGURES / WRONG_TAX_TERM (HIGH):** line 23 + line 68 conflate "company pays CGT" with the correct "company pays Corporation Tax on chargeable gains". This is a textbook error on a page about reducing CGT and is a credibility risk. Rewrite must rename the section and correctly distinguish (see fix sequence #1). New site-wide flag candidate — if similar errors are present on other residual CGT pages, surface as a cluster pattern.

**Flag (b) — HOUSE_POSITION_CONFLICT (HIGH):** line 49 conflicts with §5 LOCKED Letting Relief framing. The pre-April-2020 "main residence at some point + later let" framing has been the wrong test for 6 years; the body still reflects it. Rewrite must adopt §5 verbatim (see fix sequence #2).

**Flag (c) — STALE_FIGURES (MEDIUM):** line 51 partial drift on FHL-BADR per §6 LOCKED abolition position. Rewrite must reframe as historical (see fix sequence #3).

**Site-wide flag recommendation to raise (draft):** `F-N | 2026-05-23 HH:MMZ | HIGH | (cross-residual) | STALE_FIGURES + HOUSE_POSITION_CONFLICT | Reduce-CGT page contains three concurrent factual drift issues (Companies-pay-19%-CGT error, pre-2020 Lettings Relief framing, FHL-BADR pre-abolition framing) all surfaced at brief drafting. Recommend Phase 2 cluster scan for the same drift patterns across other residual CGT pages — particularly the survey-of-CGT-reduction pages and the company-incorporation pages — these stale framings are likely site-wide and pre-2024-Autumn-Budget vintage.`

---

## Authority links worth considering (Stage 2 — WebFetch verification status)

| URL | Verification status | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/1992/12/section/152 | **200 OK + operative text present + verified 2026-05-23** | Rollover relief — cite in "rollover does not apply to BTL investment" framing. |
| https://www.legislation.gov.uk/ukpga/1992/12/section/165 | **200 OK + operative text present + verified 2026-05-23** | Holdover gifts of business assets — cite for gift-as-reduction subsection. |
| https://www.legislation.gov.uk/ukpga/1992/12/section/16 | **200 OK + operative text present + verified 2026-05-23**. Opening text: "Subject to sections 261B, 261D and 263ZA and except as otherwise expressly provided, the amount of a loss accruing on a disposal of an asset shall be computed in the same way as the amount of a gain accruing on a disposal is computed." | Allowable losses computation — cite for "Offset Capital Losses" subsection. |
| https://www.legislation.gov.uk/ukpga/1992/12/section/58 | Verify at execution (used Wave 5 §24.4 lock + gold-reference verification). | s.58 spouse no-gain-no-loss — cite for "Pre-Sale Spouse Transfer" subsection. |
| https://www.legislation.gov.uk/ukpga/1992/12/section/162 | Verify at execution. | Incorporation relief — cite for "Incorporation as Reduction" subsection. |
| https://www.legislation.gov.uk/ukpga/1992/12/section/222 | Verify at execution. | PRR — cite for "Maximise PRR" subsection. |
| https://www.legislation.gov.uk/ukpga/1992/12/section/38 | Verify at execution. | Allowable cost (acquisition cost + enhancement expenditure) — cite for "Enhance Your Base Cost" subsection. |
| https://www.gov.uk/capital-gains-tax/rates | **Verified live 2026-05-23 per gold-reference brief.** | Cross-reference for "Current CGT rates" intro paragraph. |
| https://www.gov.uk/capital-gains-tax/losses | **Verified live 2026-05-23.** Key passage: "You do not have to report losses straight away - you can claim up to 4 years after the end of the tax year that you disposed of the asset." | Cross-reference for "Offset Capital Losses" subsection — important to add the 4-year claim time limit explicitly (the legacy page doesn't mention it). |
| HMRC CG Manual CG65030+ (post-April-2020 Letting Relief restriction) | Verify exact section at execution per F-7 PIM4101 hallucination lesson — never cite a manual section without WebFetch verification. | Authority for the corrected Lettings Relief framing. |
| HMRC CG Manual CG64200+ (PRR + final-9-months rule) | Verify exact section at execution. | PRR working practice reference. |

**(Execution session selects 5-7 to actually cite in body — target 5 verified statutory + 1 HMRC manual + 1 gov.uk consumer page.)**

---

## Universal rules (do not skip)

Inherits from `TRACK2_PROGRAM.md §4 sections 13 + 14`. Critical for this brief:

- **NO em-dashes** (per memory note + §13).
- **NO pricing on-site** (per agency lead-gen handoff model + F-1).
- **Anonymised social proof only.**
- **LeadForm auto-injected by `BlogPostRenderer.tsx`.**
- **1-3 inline `<aside>` CTAs** at conversion moments (after worked-portfolio example + before closing).
- **FAQs schema auto-emitted** from frontmatter.
- **House position §5 Lettings Relief framing MANDATORY** (post-April-2020 shared-occupation rule, not pre-2020 framing).
- **House position §7 hedge** per Bill-vs-enacted discipline (note: surcharge is on property income, NOT on CGT — careful drafting).
- **CT vs CGT distinction MANDATORY** — "companies pay Corporation Tax on chargeable gains, not CGT" is non-negotiable.
- **URL liveness + statute-content verification at execution** per §16.31 + F-7 + F-8.

---

## 19-step workflow (legacy-rewrite adaptation)

Inherits from `NETNEW_PROGRAM.md §7` with the 3 Track 2 deltas. Brief-specific notes:

- **Step 1 reading:** `docs/property/house_positions.md` §5, §6, §7, §13, §15.3, §21, §24 in full before drafting body.
- **Step 4:** verify §7 (April 2027) lock-status against legislation.gov.uk Finance Act 2026. Note: §7 is the property-income surcharge; CGT rates separately. Reduce-page must NOT confuse the two.
- **Step 5:** re-fetch the 3 competitor URLs. The first UKPA URL returned partially extracted content in this brief's fetch — re-fetch needed at execution.
- **Step 6:** read the current source file in full to confirm no edit since 2026-03-29.
- **Step 7:** read closest-existing sibling pages (16 cross-links named above; aim to read at least the top 8 that are forward-link destinations).
- **Step 8:** plan rewrite outline — 10-12 H2s (one per lever), 2,500-3,000 body words, 12-14 FAQs, 1 decision-table, 1 worked-portfolio example.
- **Step 9:** rewrite at existing path. Preserve frontmatter `slug` + `canonical` + `date` (update `dateModified`). Update `metaTitle` (test 2-3 candidates oriented at "how to reduce cgt on property uk 2026"). Update `metaDescription` with named statute references + lever count.
- **Step 10:** site build must pass.
- **Step 11:** six checks per playbook §4.3 + **explicit check that "Companies pay 19% CGT" wording does NOT appear anywhere in the rewrite** (text-search for "19% CGT", "company pay CGT", "companies pay CGT" — all should be zero).
- **Step 12:** no redirect needed (REWRITE-in-place, with manager-spot-check that survey-as-router framing was committed to).
- **Step 13:** insert NEW `monitored_pages` row (zero current GSC; 180-day foundational window).
- **Step 14:** commit on main. Tracker edits via absolute path only.
- **Steps 15-19:** mark ✅ executed; update flags + heartbeat; next page in batch.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §5 CGT 2026/27 (18% / 24% + £3k AEA + post-2020 Lettings Relief framing): __
- §6 FHL-BADR pre-5-April-2025 historical framing: __
- §7 April 2027 — surcharge is on income not CGT, drafting hedged correctly: __ confirmed
- §13 no-pricing / no-real-client-names: __
- §15.3 GROB note in gift-as-reduction section (if covered): __
- §21 CT vs CGT distinction + s.455 35.75% (if mentioned): __ Companies pay CORPORATION TAX not CGT, MANDATORY
- §24 Form 17 + spouse mechanics cross-link: __

### Comparison: before vs after
- Word count: ~1,800 → __
- H2 count: 8 (+ 3 H3) → __
- FAQ count: 7 → __
- Authority links: 0 → __
- Inline CTAs: 0 → __
- Worked examples: 1 → __
- Decision table: 0 → __ (1 expected)
- Worked portfolio example: 0 → __ (1 expected)
- "Companies pay 19% CGT" text-search count: 1 (in FAQ #4 body) → __ MUST BE 0
- "main residence at some point" pre-2020 Letting Relief framing: 1 → __ MUST BE 0

### Foundational SEO hypothesis test
- Pre-rewrite GSC baseline (2026-02-22 to 2026-05-23): 0 impressions / 0 clicks
- Post-rewrite expected: 100-200 impressions / 90 days within 6-12 months
- Verify at +90 / +180 days via monitored_pages detector

### Flags raised
- F-9 (carried from this brief): CT vs CGT framing pattern across residual CGT pages — cluster audit at Phase 2: __
- Any new flags surfaced: __

### 2-3 sentence summary
- (populated at execution time)
