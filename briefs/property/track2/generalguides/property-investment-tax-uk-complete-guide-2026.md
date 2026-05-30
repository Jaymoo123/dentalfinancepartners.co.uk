# Track 2 brief: property-investment-tax-uk-complete-guide-2026

**Site:** property
**Brief type:** Legacy rewrite — gold-reference data-complete brief (portfolio-lifecycle umbrella hub repositioning)
**Source markdown path:** `Property/web/content/blog/property-investment-tax-uk-complete-guide-2026.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/property-investment-tax-uk-complete-guide-2026
**Stage 1 priority:** **H** — wired-in internal hub (37 inbound internal links from 36 distinct content pages + middleware category mapping `landlord-tax-essentials`); INVISIBLE on search (0 GSC / 0 Bing impressions) but structurally load-bearing, and currently carrying a meta/body intent mismatch plus STALE_FACTS that make it both unrankable and (post-April-2027) wrong.
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30 (source markdown + frontmatter read; link targets resolved against the live corpus; house positions §1/§3/§4/§5/§7/§9/§21/§22/§38 verified against `house_positions.md`; competitor URLs carried for execution-time liveness check per §16.31)
**Cannibalisation status:** **REWRITE** (reposition as the portfolio-lifecycle umbrella hub; NOT a collapse candidate — see §"Cannibalisation universe check" for the equity ruling)

> This brief follows the gold-reference depth of `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md` and the city-rewrite template discipline of `briefs/property/track2/trial/birmingham-property-accountant.md` (F-1 pricing-leak fix pattern applied here to the line-104 soft-sell). It is a HUB rewrite: each lifecycle section is a 2-3 paragraph overview that forward-links to the specialist sibling that owns the deep intent, resolving cannibalisation by altitude rather than by collapse.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `property-investment-tax-uk-complete-guide-2026`. The slug is the umbrella-intent anchor and is referenced by the middleware category mapping; changing it would orphan 37 inbound internal links and break the `landlord-tax-essentials` category route. No redirect.
- **Category:** `landlord-tax-essentials` (kept — this is the hub of that category).
- **Gap-mode tag:** `INVISIBLE` (primary — 0 GSC / 0 Bing impressions despite 36-page inbound link equity) + `THIN_DEPTH` (850 words vs ~3,400 target) + `STALE_FACTS` (April 2027 22/42/47 rates entirely absent; only 2025/26 20/40/45 stated) + `STRUCTURE` (4 FAQs vs 12-14 target; 0 worked examples; 0 outbound authority citations) + `CTR_FAIL` (frontmatter metaTitle was mis-pivoted to a narrow single-S24-worked-example title that contradicts the umbrella body).
- **"Why this rewrite" angle:** This page is an internal *hub* with zero search visibility and a body that reads like a thin generic explainer rather than the umbrella it is wired to be. The dominant fix is **repositioning** it as the explicit **portfolio-lifecycle umbrella**: tax when you BUY (SDLT 5% surcharge), HOLD/LET (income tax + Section 24), SELL (CGT), PASS ON (IHT), plus the structural buy-personal-vs-company decision and the MTD compliance layer. Each section becomes a routing overview (2-3 paragraphs + one worked example where it earns its place) that forward-links to the specialist sibling owning the deep intent. This makes the page the spoke-hub (overview + routing) so it competes head-on with NO single specialist sibling, while finally giving it enough depth, freshness, and authority citation to be indexable in its own right. Secondary load-bearing fix: reset the mis-pivoted metaTitle/metaDescription back to a portfolio-lifecycle umbrella framing, and bring the body to current law (the April 2027 step-up is the single biggest factual gap).

---

## Current page snapshot (Stage 2 — read from filesystem + frontmatter)

**Filesystem source read (2026-05-30):**
- **Body word count:** ~850 (matches diagnosis).
- **H2 outline (7 H2 + 3 H3):**
  1. (intro, no H2) — "Property investment tax UK rules continue to evolve..."
  2. `Income Tax on Property Investment` (+ H3 `Section 24 Mortgage Interest Restriction`)
  3. `Allowable Property Investment Expenses`
  4. `Making Tax Digital (MTD) Requirements`
  5. `Corporation Tax vs Income Tax for Property Investment` (+ H3 `Limited Company Benefits`, H3 `Company Disadvantages`)
  6. `Tax Planning and Timing Strategies`
  7. `Record Keeping Requirements`
  8. `Professional Support`
  9. `Related Reading` (1 link only)
- **metaTitle (CURRENT — WRONG):** "Section 24 mortgage interest: worked example 2025/26" (mis-pivoted; narrow single-topic; contradicts umbrella body).
- **metaDescription (CURRENT — WRONG):** "See how Section 24 affects your tax bill with a clear worked example. Higher-rate landlord loses £2,000 on £10,000 interest. Plan your strategy now."
- **metaTitle_prev:** "Property Investment Tax UK: Complete Guide 2026" (the umbrella title that should be restored, refined).
- **metaDescription_prev:** "UK property investors face income tax up to 45%, CGT at 18-24%, plus Section 24 and MTD from April 2026. Key rates and planning strategies." (umbrella framing but now STALE — omits April 2027).
- **h1 / title:** "Property Investment Tax UK: Complete Guide 2026" (keep, umbrella-aligned).
- **FAQ count (frontmatter `faqs:`):** 4 (target 12-14).
- **Outbound authority links:** 0 (no gov.uk / legislation.gov.uk / HMRC).
- **Internal links in body:** 4 — Section 24 guide (`/blog/section-24-and-tax-relief/section-24-tax-relief-complete-guide`), CGT pillar (`/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk`), `/incorporation` (TSX route, not a blog sibling), and one Related-Reading link to `making-tax-digital-landlords-april-2026-deadline`.
- **Schema:** FAQPage auto-emitted from frontmatter `faqs:` (4 entries).
- **Last meaningful edit:** frontmatter `date` 2026-04-01.

**Specific issues confirmed against source lines:**
- **Line 34:** states only "For 2025/26, basic rate taxpayers pay 20%, higher rate 40%, additional rate 45%." **No mention of April 2027 22/42/47.** This is the STALE_FACTS hazard (see §"House-position conflict flag").
- **Line 42:** Section 24 figure ("higher-rate £10,000 interest: was £4,000 relief, now £2,000 credit, +£2,000 burden") is **correct for 2026/27 per §4** — preserve, but date-stamp it "2026/27" and note the reducer rises to 22% from 2027/28.
- **Line 80:** corporation tax band figures (19% to £50k, 25% over £250k, marginal relief between) are **correct per §21.4** — preserve.
- **Lines 23/64:** MTD threshold schedule (£50k Apr 2026 / £30k Apr 2027 / £20k Apr 2028) is **correct per §3** — preserve.
- **Line 104 (SOFT-SELL):** "The cost of professional advice typically pays for itself through tax savings and avoided penalties." This is the Decision-E pricing-leak/soft-sell pattern (the birmingham F-1 analogue). **Soften to neutral framing** (e.g., "A specialist property accountant can help you sequence these decisions across the portfolio lifecycle" — no payback/value claim).
- **Line 44:** `/incorporation` is a TSX route link, not a blog sibling. Replace with the incorporation BLOG sibling forward-link (`/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk`) and keep the TSX route only if it adds a distinct conversion path.
- **Em-dashes:** none found in body (confirmed). Keep it that way.

---

## GSC angle (last 90 days) — INVISIBLE baseline

**Search-data state:** **0 GSC impressions / 0 clicks / 0 Bing impressions** in the 90-day window. The page is effectively invisible to organic search despite being a wired-in hub.

**Internal-link equity (the reason this is NOT a collapse candidate):** **37 inbound internal links from 36 distinct content pages**, plus a middleware category mapping to `landlord-tax-essentials`. This is the strongest internal-hub signal in the residual pool; the page is the umbrella that dozens of specialist pages link up to.

**Why INVISIBLE, not CTR_FAIL:** Unlike the gold-reference cgt-rates page (which had 895 impressions / 1 click = a click-through problem), this page has no impressions at all — Google is not surfacing it for any query. Diagnosis is therefore **indexability + intent-clarity**, not snippet-loss. Root causes: (a) thin (850 words) so it competes weakly against ~3,500-word competitor umbrella guides; (b) the mis-pivoted metaTitle tells Google the page is a narrow Section-24-worked-example page, which fights the umbrella body and the umbrella inbound-link anchor text; (c) no authority citations, so no E-E-A-T signal for a "complete guide" intent.

**Realistic post-rewrite target (tempered, INVISIBLE baseline per §16.42 / F-11):** this is a long-horizon indexability play, not a quick CTR lift. Monitor on the **180-day window** (not 90) per the F-11 INVISIBLE-baseline rule. Success = the page begins accruing impressions on umbrella queries ("property investment tax uk", "landlord tax guide uk", "property tax for landlords complete guide") and acts as a clean internal-link distributor to the specialist siblings. Do NOT set a click target; set an "impressions > 0 and growing" target.

**GA4 engagement signal:** not separately pulled at brief time (INVISIBLE page; negligible sessions expected). Execution session pulls `ga4_page_data` to confirm; do not block on it.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined Stage 2)

**Primary: INVISIBLE.** 0 impressions despite 36-page inbound link equity. The page is structurally a hub but is not earning its own search surface. The load-bearing fix is **repositioning + depth + freshness + authority** so Google can classify it as a credible umbrella guide, combined with metaTitle/metaDescription reset so the page's declared intent matches its umbrella body and its inbound anchor text.

**Secondary: THIN_DEPTH.** 850 words against a ~3,400-word target and a ~3,500-4,000-word competitor ceiling (ukpropertyaccountants lifecycle guide). 0 worked examples; 4 FAQs. For an umbrella hub the depth job is breadth-with-routing, not deep-dive: cover all six lifecycle stages competently, give 2-3 illustrative worked examples (one full income-tax + Section-24 calc; one CGT-on-disposal calc; one buy-personal-vs-company comparison), and forward-link the deep intent to the specialist that owns it.

**Tertiary: STALE_FACTS (HIGH consequence).** The body states only 2025/26 income tax rates (20/40/45) and never mentions the April 2027 step-up to **22% basic / 42% higher / 47% additional** for property income (England, Wales and NI; Scotland excluded). Per §7 [LOCKED 2026-05-30] and the `property_2027_rates_ground_truth` memory, this is **enacted law** (FA 2026 c.11, ss.6-7, Royal Assent 18 March 2026), not a proposal. The rewrite MUST state the April 2027 rates as current enacted law, MUST state the Section 24 reducer **RISES to 22%** (not frozen at 20%, and NO new basic-rate wedge opens) per §4 + §7, and MUST re-verify FA 2026 Royal Assent at write time per the F-37 Bill-vs-enacted pattern. This is the highest-consequence single fix on the page.

**Quaternary: STRUCTURE.** 4 FAQs → 12-14; 0 worked examples → 3; 0 authority links → 5-7; add an at-a-glance lifecycle-stage routing table near the top (snippet-bait + the hub's "map" of where to go deeper).

**Quinary: CTR_FAIL (latent).** Once the page is indexable, the mis-pivoted metaTitle would still suppress click-through. Reset to an umbrella-lifecycle title/description (candidates in §"metaTitle / metaDescription / h1 plan").

**Load-bearing fix sequence (ordered by ROI):**

1. **Reposition to the portfolio-lifecycle umbrella** with an explicit BUY / HOLD-LET / SELL / PASS-ON spine + the structure decision + the MTD layer; each section a 2-3 paragraph overview that forward-links the deep intent to its specialist sibling.
2. **Reset metaTitle + metaDescription** from the narrow Section-24 pivot back to an umbrella-lifecycle framing (restore the intent of `metaTitle_prev`, refreshed for current law).
3. **Add the April 2027 income tax rates (22/42/47) as enacted law** and the Section-24-reducer-rises-to-22% framing per §4 + §7. Date-stamp every rate ("2026/27" vs "2027/28 onwards"). Re-verify FA 2026 RA at write time.
4. **Body lift to ~3,400 words** across the six lifecycle stages + structure + MTD + record-keeping, with 3 worked examples.
5. **FAQ 4 → 12-14**, each targeting an umbrella-intent question verbatim (the four existing FAQs are reusable with freshness edits; add 8-10).
6. **Authority links 0 → 5-7** verified gov.uk / legislation.gov.uk / HMRC at write time.
7. **Soften the line-104 soft-sell** to neutral framing (Decision-E discipline); fix the `/incorporation` TSX link to the incorporation blog sibling.

---

## Competitor URLs (Stage 2 — carried for execution-time liveness verification per §16.31)

> Per §16.31, every URL below MUST be re-fetched + 200-status-checked + date-stamped at execution. Reject non-200 and replace. WebFetch permission denials are carried-forward-verifiable per F-36; if denied, the manager re-checks a sample.

| URL | Diagnosis status | Reported depth | Coverage signals | Borrow / differentiate |
|---|---|---|---|---|
| https://www.ukpropertyaccountants.co.uk/a-complete-property-tax-guide-for-landlords-and-property-investors/ | live 200 (per diagnosis) | ~3,500-4,000 words | Lifecycle SPV/HMO/rent-to-rent angle; **no FAQs, no worked examples, no April-2027 mention** | Borrow: lifecycle breadth + the SPV/HMO framing. Differentiate: we ADD worked examples, 12-14 FAQs, the enacted April-2027 22/42/47 rates, and authority citations. This is our depth ceiling to beat. |
| https://www.provestor.co.uk/guides/property-tax | live 200 (per diagnosis) | ~700 words | Full lifecycle buy/let/sell/IHT + ltd-vs-personal but **thin/promotional, no worked examples** | Borrow: the clean buy/let/sell/pass-on segmentation. Differentiate: depth + neutrality (no promotional framing) + current law. |
| https://www.ukpropertyaccountants.co.uk/6-surprising-uk-tax-changes-every-landlord-investor-needs-to-know/ | live 200 (per diagnosis) | changes-led | Includes **April 2027 22/42/47** + HVCTS + NRLS rate-rise framing | Borrow: confirmation that April-2027 rates are now mainstream competitor content (reinforces our STALE_FACTS fix). Differentiate: we frame within the lifecycle hub, not as a listicle. |

**Competitor depth ceiling for this umbrella class:** ~3,500-4,000 words, 0 FAQs, 0 worked examples, 0 statute citations. Our ~3,400-word target with 12-14 FAQs + 3 worked examples + 5-7 verified statute/authority citations + the enacted April-2027 rates puts us decisively best-in-class on an umbrella query, not catch-up. (Note: we deliberately stay near the gold-ref ~2,800-3,400 band rather than padding to the 4,000 ceiling — the hub's job is routing, so depth beyond ~3,400 belongs on the specialist siblings, not here.)

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (cite the batch-start snapshot timestamp at execution).

**Equity check ruling out collapse (the §16.T2 deterministic-floor question, applied):** This page has **0 GSC + 0 Bing impressions** but **37 inbound internal links from 36 distinct content pages** plus the middleware `landlord-tax-essentials` category mapping. It is a wired-in internal hub. Every candidate it could "collapse into" is **weaker or only marginally stronger** on search:

| Candidate canonical | Search equity (per diagnosis) | Collapse verdict |
|---|---|---|
| how-much-tax-rental-income-uk-complete-guide | 89 impr / pos 80 / 64 queries / 0 clk | Weaker (page 8); not a credible umbrella canonical |
| landlord-tax-deductions-uk-2026-complete-list | 84 impr / pos 51 | Weaker; deductions-specific, not lifecycle umbrella |
| tax-efficient-property-investment-structure-guide | 19 impr / pos 55 | Weaker; structure-specific |
| income-tax-rates-landlords-2026-27-complete-guide | 4 impr / pos 2.8 | Strong position but tiny volume + income-tax-only scope, not umbrella |
| landlord-tax-changes-2026-complete-guide | 0 GSC | No equity; changes-led, not lifecycle umbrella |

**Conclusion: REWRITE, not collapse.** Collapsing a 36-inbound-link hub into any of these would **destroy internal link equity** and surrender the umbrella position; per §16.T2 the collapse guard would not reverse-reject a rewrite (weaker→stronger only, and none of the targets is a stronger umbrella canonical). No sibling is a stronger canonical for the "complete property investment tax guide / portfolio-lifecycle hub" intent.

**Distinctness on rewrite (resolution by altitude):** reposition explicitly as the PORTFOLIO-LIFECYCLE umbrella. Each section is a 2-3 paragraph overview that forward-links the deep intent to the specialist sibling that owns it:

| Lifecycle stage / topic | Deep-intent owner (forward-link target) |
|---|---|
| Hold/let — rental-income tax | `how-much-tax-rental-income-uk-complete-guide` + `income-tax-rates-landlords-2026-27-complete-guide` |
| Section 24 finance-cost restriction | `section-24-tax-relief-complete-guide` + `claim-mortgage-interest-rental-property-uk-section-24` |
| Sell — CGT | `capital-gains-tax-property-complete-guide-uk` + `cgt-rates-property-2026-27-current-rates-explained` |
| Buy — SDLT + 5% surcharge | `sdlt-buy-to-let-rates-surcharge-guide-2025` |
| Structure — incorporation | `buy-to-let-limited-company-complete-guide-uk` + `tax-efficient-property-investment-structure-guide` |
| Pass on — IHT | `inheritance-tax-rental-property-uk-guide` |
| Compliance — MTD | `making-tax-digital-property-income-2026-complete-guide` |
| Deductions detail | `landlord-tax-deductions-uk-2026-complete-list` |
| Future-rate detail | `2027-property-income-tax-rates-landlords-uk` |

This makes it the spoke-hub (overview + routing) rather than competing head-on with any single specialist page, resolving cannibalisation by altitude rather than by collapse. **No REDIRECT-PROPOSED. No FLAG-MANAGER.** (Soft-sell line-104 handled inline per Decision E, not as a manager flag.)

**Wave heartbeat:** re-read `wave*_*` + NETNEW §3 + `house_positions.md` at execution. No CGT/SDLT/IHT umbrella collisions expected (the specialist siblings already own their deep intents post-2026-05-21 rewrites).

---

## Closest existing pages (Stage 2) — internal-link targets within the live corpus

This page is a HUB, so it links OUT to the specialist siblings (and they already link IN — preserve the 37 inbound links). Forward-link targets, with verified live-corpus canonical paths:

- **Rental-income tax:** `/blog/landlord-tax-essentials/how-much-tax-rental-income-uk-complete-guide`
- **Income tax rates 2026/27:** `/blog/landlord-tax-essentials/income-tax-rates-landlords-2026-27-complete-guide`
- **Section 24 pillar:** `/blog/section-24-and-tax-relief/section-24-tax-relief-complete-guide`
- **Section 24 applied:** `/blog/section-24-and-tax-relief/claim-mortgage-interest-rental-property-uk-section-24`
- **Landlord deductions:** `/blog/section-24-and-tax-relief/landlord-tax-deductions-uk-2026-complete-list`
- **CGT pillar:** `/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk`
- **CGT rates explainer:** `/blog/capital-gains-tax/cgt-rates-property-2026-27-current-rates-explained`
- **CGT 60-day deadlines:** `/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026`
- **SDLT BTL surcharge:** `/blog/landlord-tax-essentials/sdlt-buy-to-let-rates-surcharge-guide-2025`
- **Incorporation pillar:** `/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk`
- **Tax-efficient structure:** `/blog/incorporation-and-company-structures/tax-efficient-property-investment-structure-guide`
- **IHT on rental property:** `/blog/landlord-tax-essentials/inheritance-tax-rental-property-uk-guide`
- **MTD for property income:** `/blog/making-tax-digital-mtd/making-tax-digital-property-income-2026-complete-guide`
- **2027 income tax rates:** `/blog/landlord-tax-essentials/2027-property-income-tax-rates-landlords-uk`

**Link discipline:** internal links must resolve to live `/blog/<category>/<slug>` paths above (verified 2026-05-30). Replace the body's bare `/incorporation` TSX link with the incorporation blog sibling. Distribute forward-links so each lifecycle section routes to its owner once (no link-stuffing); aim for 10-14 internal forward-links total across the hub. Per `optimisation_engine/blog_generator/slug_resolver.py` discipline (§16.T1), do NOT guess a category prefix — every href above is the verified live canonical path.

---

## House-position references (Stage 1) — the statute spine to verify at write time

Every section number below is cited to `house_positions.md`. Re-verify each cited Act section against legislation.gov.uk at write time, including the FA 2026 Royal Assent date (F-37 pattern). Never invent a section number.

- **§1 SDLT — rates and 5% surcharge (2026/27)** [LOCKED]: 5% additional-dwellings surcharge from 31 Oct 2024 (Finance (No.2) Act 2024); residential bands from 1 April 2025; 2% non-resident surcharge; MDR abolished 1 June 2024; first-time-buyer relief (£300k/£500k). Statute: **FA 2003** (Sch 4ZA additional-dwellings surcharge; s.55 / Sch 5 rates; Sch 6ZA first-time-buyer relief; s.116 residential definition). Scottish LBTT/ADS 8% + Welsh LTT per §23 — name as devolved, do not give SDLT figures for them.
- **§3 MTD for ITSA** [LOCKED]: thresholds £50k (6 Apr 2026) / £30k (6 Apr 2027) / £20k (6 Apr 2028); companies outside MTD ITSA; joint owners test their share of gross income. Statute: **F(No.2)A 2017** + the MTD ITSA regulations (SI 2021/1076, migrated to SI 2026/336 per §19.18 — cite the current SI at write time, do not hard-code).
- **§4 Section 24 finance-cost restriction** [LOCKED]: 20% basic-rate tax credit for 2026/27; three-part cap (lower of 20% of finance costs / 20% of residential rental profit / 20% of taxable income above PA); carry-forward of restricted credit; applies to individuals/partnerships/trusts, NOT companies. **From 2027/28 the reducer RISES to 22%** (FA 2026 Sch 1 amends ITTOIA 2005 ss.274AA/274C + ITA 2007 s.399B); NO new basic-rate wedge. Statute: **ITTOIA 2005 ss.272A, 274A-274C**; **ITA 2007 s.399B**; **FA 2026 Sch 1**.
- **§5 CGT on UK residential property (2026/27)** [LOCKED]: **18% basic / 24% higher** (from 30 Oct 2024); **£3,000 AEA**; trustees/PRs 24%; 60-day UK-property reporting where tax due; PRR final 9 months; spouse no-gain-no-loss; s.162 incorporation relief; BADR does NOT apply to investment property (and BADR rate 14% from 6 Apr 2025, 18% from 6 Apr 2026). Statute: **TCGA 1992** — rates at **s.1H** (post-FA-2019 rewrite; do NOT cite the old s.4, substituted out — F-8 canonical case); AEA **s.1K / s.3**; PRR **ss.222-226**; spouse transfer **s.58**; incorporation relief **s.162**; 60-day reporting **Sch 2 FA 2019** (verify exact NRCGT/UK-property-return anchor at write time).
- **§7 April 2027 property income tax rates** [LOCKED 2026-05-30 — VERIFY FA 2026 RA at write time per F-37]: **22% basic / 42% higher / 47% additional** for property income in **England, Wales and NI** for 2027/28 onwards (Scotland excluded; the Wales/Scotland self-setting power is a future FA 2026 s.8/Sch 2 enabling power NOT in force for 2027/28). Announced Autumn Budget 2025 (26 Nov 2025); **enacted by Finance Act 2026 (c.11), ss.6-7, Royal Assent 18 March 2026.** State as enacted law, not proposal. Statute: **FA 2026 (c.11) ss.6-7** (and Sch 1 for the s.24 reducer rise).
- **§9 / §15 / §22 IHT** [LOCKED]: NRB **£325,000** frozen to 5 Apr 2031; RNRB **£175,000** frozen to 5 Apr 2031 (taper £1:£2 above £2m estate); IHT rate **40%** (36% where 10%+ to charity); standard BTL does NOT qualify for BPR (**Pawson v HMRC [2013] UKUT 050 (TCC)**); unused DC pensions enter the IHT estate from **6 April 2027**; £2.5m combined BPR+APR cap from 6 Apr 2026 (rarely affects pure BTL). Statute: **IHTA 1984** — rate **s.7 + Sch 1**; NRB Sch 1; RNRB **ss.8D-8M**; spouse exemption **s.18**; BPR **ss.103-114** (s.105(3) investment exclusion); s.124D £2.5m cap (FA 2026 Sch 12).
- **§21 Ltd Co + CT** [LOCKED]: CT 2026/27 **19% small profits rate (≤£50k), 25% main rate (≥£250k), marginal relief 26.5% effective in the £50k-£250k band**; companies deduct mortgage interest in full (no s.24); profit-extraction tax on dividends/salary; CIHC status cite **CTA 2010 s.18N** (never s.34); most BTL SPVs are NOT CIHCs. Dividend rates 2026/27 **10.75% / 35.75% / 39.35%** (raised 6 Apr 2026). Statute: **CTA 2010** (CT rates; s.18N CIHC); **ITTOIA 2005 s.272** (property income); **ITA 2007 s.8(2)** (dividend upper rate, by-reference).
- **§38 Capital allowances (FA 2026 reform floor)** [LOCKED 2026-05-30]: main-pool **WDA 14%** (down from 18%, FA 2026 s.28; hybrid time-apportioned for straddling periods); special-rate pool **6% UNCHANGED**; new **40% FYA** (FA 2026 s.29, new/unused main-rate plant, from 1 Jan 2026, excludes cars + second-hand + overseas-leasing, available to **unincorporated** landlords); AIA **£1,000,000 permanent**; s.35 dwelling-house bar (no P&M allowances inside a let dwelling; common parts + integral features in non-dwelling areas can qualify). Statute: **CAA 2001** (s.56 WDA 14% as substituted by FA 2026 s.28; s.104D special rate; s.51A AIA; s.33A integral features; s.35 dwelling-house bar); **FA 2026 ss.28-29**. (Capital allowances are a HOLD-stage footnote on this hub — keep brief; the bar means most residential BTL gets little here. Forward-link the detail rather than deep-diving.)

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflict — STALE_FACTS (HIGH).** Source line 34 states only the 2025/26 income tax rates (20/40/45) and the body **never mentions the April 2027 step-up** to 22% basic / 42% higher / 47% additional for property income. Per §7 [LOCKED 2026-05-30] this is ENACTED law (FA 2026 c.11 ss.6-7, Royal Assent 18 March 2026), not a proposal. The page is therefore both incomplete now and will be wrong from 6 April 2027.

The rewrite MUST:
- State the April 2027 rates (22/42/47) as **current enacted law** for England, Wales and NI (Scotland excluded), with the FA 2026 citation — NOT hedged as "proposed" / "draft" / "awaiting Royal Assent" (that hedge would itself be the inverse F-37 error now that the Act is enacted).
- State that the Section 24 reducer **RISES to 22% from 2027/28** (not frozen at 20%), and that **NO new basic-rate wedge** opens, per §4 + §7. Do not write "the reducer stays at 20%" or "a new basic-rate wedge opens".
- **Re-verify FA 2026 Royal Assent (18 March 2026) against legislation.gov.uk at write time** (F-37 verify-on-dispatch discipline). The manager-prompt asserts RA 18 Mar 2026 and §7/§38 lock it; the execution session confirms before asserting.
- Date-stamp every income-tax-rate statement ("2026/27: 20/40/45" vs "2027/28 onwards: 22/42/47").

**No conflict on preserved figures:** Section 24 £2,000-credit example (line 42), CT bands (line 80), MTD schedule (lines 23/64) are all correct per §4/§21/§3 — preserve with date-stamps.

**Soft-sell (Decision E, not a house-position conflict but a hard-rule fix):** line 104 "the cost of professional advice typically pays for itself" is a value/payback claim that drifts toward the lead-gen pricing-leak line. Soften to neutral framing per the agency lead-gen handoff model. No pricing, no fee comparisons, no "pays for itself" payback claims, anonymised social proof only.

Flag to `track2_site_wide_flags.md` at execution as a STALE_FACTS entry (April 2027 rates absent from an umbrella hub) + a Decision-E soft-sell entry; both are inline-fixable by the execution session (mechanical, not a manager-decision per `feedback_factual_backpatch_manager_direct` — the per-citation judgment here is unambiguous given §7 is locked).

---

## Authority links worth considering (Stage 2 — verify all at write time per §16.31)

Execution session selects 5-7 to actually cite in body; re-fetch each for 200 + content match before citing. Never cite a section whose operative wording has been substituted out (F-8: TCGA 1992 s.4 is the canonical dead-cite — use s.1H for CGT rates).

| URL | Use case | Verify-at-write note |
|---|---|---|
| https://www.gov.uk/income-tax-rates | Income tax rates (HOLD stage) | Confirm 2026/27 20/40/45; check whether the page yet shows 2027/28 property rates |
| https://www.legislation.gov.uk/ukpga/2026/11/contents | FA 2026 — the April 2027 property rates (ss.6-7) + s.24 reducer (Sch 1) + capital allowances (ss.28-29) | **Verify Royal Assent date = 18 March 2026** (F-37). Confirm c.11. |
| https://www.gov.uk/capital-gains-tax/rates | CGT rates (SELL stage) | Confirms 18%/24% + £3k AEA 2026/27; does NOT mention April 2027 income rates |
| https://www.legislation.gov.uk/ukpga/1992/12/section/1H | CGT rates statute (post-FA-2019 rewrite) | Use s.1H, NOT s.4 (substituted out per F-8) |
| https://www.gov.uk/stamp-duty-land-tax/residential-property-rates | SDLT + 5% surcharge (BUY stage) | Confirm 5% additional-dwellings surcharge + bands from 1 Apr 2025 |
| https://www.gov.uk/guidance/check-if-you-need-to-sign-up-for-making-tax-digital-for-income-tax | MTD thresholds (COMPLIANCE layer) | Confirm £50k/£30k/£20k schedule |
| https://www.gov.uk/inheritance-tax | IHT (PASS-ON stage) | Confirm NRB £325k / RNRB £175k / 40% |
| https://www.gov.uk/hmrc-internal-manuals/property-income-manual | HMRC PIM (allowable expenses / rental profit) | PIM main page; verify exact sub-page if citing a specific manual number (no hallucinated PIM numbers per F-7) |

---

## Universal rules — inherited from parent program (do not restate)

Per TRACK2_PROGRAM §4 section 13, this brief inherits the parent program's voice rules, lead-gen architecture, CSS-in-markdown rule, FAQs-and-schema rule, anti-templating discipline, six-check quality bar, statute-citation discipline (F-8), and all §16 lessons. **Critical for THIS brief:** NO em-dashes (use commas, parentheses, full stops, middle dots); NO pricing or fee comparisons (Decision E — even soft "pays for itself" payback claims are out); NO real client names (anonymised social proof only, e.g. "a higher-rate landlord with a four-property portfolio"); LeadForm auto-injected by `BlogPostRenderer.tsx` (never duplicate); FAQ schema auto-emitted from frontmatter `faqs:` (never hand-add FAQPage JSON in body); HTML body not markdown (`<p>`, `<h2>`, `<ul>` — per `blog_page_rendering_html_in_frontmatter` memory). §7 April-2027 enacted-law framing MANDATORY.

---

## Section-by-section content plan (~3,400 words)

Hub discipline: each lifecycle section is a 2-3 paragraph overview + one forward-link to the specialist owner. Three worked examples carry the depth. Word budget in brackets.

1. **Intro / lifecycle map (H2-less lead, ~180 words).** Frame the page as the portfolio-lifecycle map: every property runs through four tax moments (buy, hold/let, sell, pass on), wrapped by two cross-cutting decisions (how to hold it, and MTD compliance). One sentence per stage with the headline figure, each forward-linking its specialist sibling. Set reader expectation: this is the overview; deep mechanics live on the linked guides.

2. **At-a-glance: the property tax lifecycle (H2, ~220 words + table).** A snippet-bait routing table: Stage | Main tax | Headline rate/threshold (2026/27) | What changes | Deep guide. Rows: BUY (SDLT, 5% surcharge on additional dwellings) ; HOLD/LET (income tax 20/40/45 in 2026/27, **22/42/47 from 2027/28** in England/Wales/NI) ; SELL (CGT 18%/24%, £3,000 AEA) ; PASS ON (IHT 40%, NRB £325k) ; STRUCTURE (CT 19-25%) ; COMPLY (MTD £50k from Apr 2026). Each "deep guide" cell links the specialist sibling.

3. **Buy: SDLT and the 5% surcharge (H2, ~340 words).** Overview of SDLT on a BTL purchase: standard residential bands (from 1 Apr 2025) PLUS the **5% additional-dwellings surcharge** (from 31 Oct 2024, Finance (No.2) Act 2024) on second/investment properties; 2% non-resident surcharge; note MDR abolished (1 Jun 2024) and the 6-dwellings non-residential route exists for genuine bulk acquisitions. One-paragraph note that Scotland (LBTT, ADS 8%) and Wales (LTT) are separate devolved regimes (name only, no figures). Forward-link `sdlt-buy-to-let-rates-surcharge-guide-2025`. Cite FA 2003 + gov.uk SDLT rates. (§1, §23.)

4. **Hold and let: income tax on rental profit (H2, ~420 words + Worked Example 1).** Rental profit = rental income minus allowable expenses, taxed at marginal income tax rates. **State both rate sets with date-stamps:** 2026/27 = 20/40/45; **2027/28 onwards = 22/42/47 for property income in England, Wales and NI (Scotland excluded), enacted by Finance Act 2026 ss.6-7 (Royal Assent 18 March 2026).** Worked Example 1: higher-rate landlord, £18,000 rental income, £4,000 allowable expenses, show taxable profit and the tax at 2026/27 (40%) vs 2027/28 (42%) to make the step-up concrete. Note the £100k personal-allowance taper interaction (60% effective band) briefly. Forward-link `how-much-tax-rental-income-uk-complete-guide` + `income-tax-rates-landlords-2026-27-complete-guide` + `2027-property-income-tax-rates-landlords-uk`. (§4, §7.)

5. **Section 24: the finance-cost restriction (H2/H3, ~360 words + Worked Example 2).** Mortgage interest is NOT a deductible expense for individual landlords; instead a basic-rate **tax credit** (20% for 2026/27). Preserve the existing £10,000-interest example (higher-rate: was £4,000 relief, now £2,000 credit, +£2,000 burden) date-stamped 2026/27. **State the reducer RISES to 22% from 2027/28** (FA 2026 Sch 1) and that NO new basic-rate wedge opens (reducer tracks the 22% property basic rate; higher/additional-rate landlords' relief rises 20%→22% but stays well below their 42%/47% rate). Does not apply to companies (link to structure section). Forward-link `section-24-tax-relief-complete-guide` + `claim-mortgage-interest-rental-property-uk-section-24`. (§4, §7.)

6. **Allowable expenses and capital allowances (H2, ~300 words).** Revenue deductions (management fees, repairs-not-improvements, insurance, professional fees, utilities between tenancies, advertising, travel) vs capital improvements (not deductible against income; add to CGT base cost). One-paragraph capital-allowances footnote: the s.35 dwelling-house bar means residential BTL gets little plant-and-machinery relief; common parts + integral features in non-dwelling areas can qualify; main-pool WDA is now **14%** (FA 2026 s.28, from Apr 2026), and a new **40% FYA** (FA 2026 s.29, from 1 Jan 2026) is available to unincorporated landlords on qualifying new plant. Keep brief; forward-link `landlord-tax-deductions-uk-2026-complete-list`. (§4 boundary, §38.)

7. **Structure: personal vs limited company (H2/H3, ~420 words + Worked Example 3).** The buy-personal-vs-company decision: companies escape Section 24 (full interest deduction) and pay CT (19% small profits ≤£50k / 25% main ≥£250k / 26.5% marginal in between) but face a second tax layer on profit extraction (dividends 10.75/35.75/39.35% in 2026/27) plus SDLT/CGT on transferring an existing portfolio in. Worked Example 3: a leveraged higher-rate landlord, compare personal (Section 24 credit) vs company (full interest deduction + CT + dividend extraction) at a single profit level to show the trade-off is reader-specific, not a universal "incorporate" answer. NO recommendation. Forward-link `buy-to-let-limited-company-complete-guide-uk` + `tax-efficient-property-investment-structure-guide`; fix the bare `/incorporation` TSX link. (§21.)

8. **Sell: capital gains tax (H2, ~340 words).** CGT on disposal: **18% basic / 24% higher** (from 30 Oct 2024), **£3,000 AEA** (2026/27); 60-day UK-property reporting where tax is due; PRR final 9 months; spouse no-gain-no-loss (s.58) lets couples use both AEAs and split the gain across rate bands; BADR does NOT apply to investment property. Brief routing only; deep mechanics on the siblings. Forward-link `capital-gains-tax-property-complete-guide-uk` + `cgt-rates-property-2026-27-current-rates-explained` + `cgt-payment-deadlines-property-sales-2026`. Cite TCGA 1992 s.1H (NOT s.4) + gov.uk CGT rates. (§5.)

9. **Pass on: inheritance tax (H2, ~320 words).** IHT at death: 40% above the NRB (£325,000, frozen to 5 Apr 2031) + RNRB (£175,000, frozen, tapered above £2m estate); standard BTL does NOT qualify for BPR (Pawson investment line); unused DC pensions enter the estate from 6 April 2027 (relevant to landlord-pension-rich estates); spouse exemption + transferable allowances. Brief overview; forward-link `inheritance-tax-rental-property-uk-guide`. Cite IHTA 1984 s.7/Sch 1 + gov.uk IHT. (§9, §15, §22.)

10. **Comply: Making Tax Digital (H2, ~300 words).** MTD for ITSA: mandatory for landlords with qualifying income above **£50,000 from 6 April 2026**, **£30,000 from 6 April 2027**, **£20,000 from 6 April 2028**; quarterly updates + end-of-period statement + final declaration; digital records via compatible software; companies are outside MTD ITSA; joint owners test their share of gross income. Preserve the existing accurate schedule. Forward-link `making-tax-digital-property-income-2026-complete-guide`. Cite the current MTD ITSA SI at write time (do not hard-code SI 2021/1076 — migrated per §19.18). (§3.)

11. **Planning across the lifecycle (H2, ~240 words).** Tie the stages together: timing disposals across tax years to use multiple AEAs; spousal ownership splitting to use both rate bands and both AEAs (note Form 17 for unequal beneficial splits — forward-link if a live sibling exists); sequencing incorporation against SDLT/CGT entry costs; pension-and-IHT interaction from 2027. Neutral framing only; no pricing, no payback claims. (§5, §21, §22.)

12. **Getting specialist support (H2, ~160 words).** Replace the line-104 soft-sell with neutral framing: a specialist property accountant can help sequence these decisions across the portfolio lifecycle and keep the portfolio compliant as the rules change (April 2027 rates, MTD rollout). NO "pays for itself", NO fee figures, NO client names. LeadForm auto-injected below.

13. **FAQs (frontmatter, 12-14).** Reuse + freshen the 4 existing; add 8-10. Each targets an umbrella-intent question. Candidates:
    - How much tax do I pay on UK property investment income? (freshen: add 2027/28 22/42/47)
    - What expenses can I claim against rental income? (freshen)
    - Do I need to comply with Making Tax Digital? (keep — already accurate)
    - Should I use a limited company for property investment? (freshen: neutral, no recommendation)
    - What taxes do I pay when I BUY an investment property? (SDLT + 5% surcharge)
    - How are property investment rates changing in April 2027? (22/42/47, enacted FA 2026, England/Wales/NI)
    - Does Section 24 still apply, and is it changing? (yes; reducer rises to 22% in 2027/28, no new wedge)
    - How much CGT will I pay when I sell? (18%/24% + £3k AEA + 60-day rule)
    - Do I pay inheritance tax on a rental portfolio? (yes; NRB/RNRB; no BPR for BTL)
    - Can I split rental income with my spouse to save tax? (s.58 + ownership-split overview)
    - Are mortgage interest costs deductible for limited companies? (yes, no s.24 for companies)
    - When does MTD for Income Tax apply to me? (£50k Apr 2026 schedule)
    - What is the difference between an allowable expense and a capital improvement? (revenue vs capital)
    - Is Scotland or Wales taxed differently? (devolved SDLT/LBTT/LTT; Scotland excluded from the 2027/28 property income rates)

**Structure deltas vs source:** H2 7 → ~11; FAQs 4 → 12-14; worked examples 0 → 3; authority links 0 → 5-7; internal forward-links 4 → 10-14; routing table 0 → 1; body ~850 → ~3,400 words.

---

## metaTitle / metaDescription / h1 plan

**Reset the mis-pivoted meta back to umbrella-lifecycle framing (the current narrow Section-24 title is the CTR_FAIL/intent-mismatch fault).**

- **metaTitle (≤ 62 chars) — candidates, pick at execution:**
  - "Property Investment Tax UK 2026/27: Complete Lifecycle Guide" (59)
  - "UK Property Investment Tax Guide 2026/27 | Buy, Let, Sell, Pass On" (trim to ≤62)
  - "Property Investment Tax UK: SDLT, Income, CGT, IHT Guide 2026" (60)
- **metaDescription (≤ 158 chars):**
  - "The complete UK property investment tax guide for 2026/27: SDLT on buying, income tax and Section 24 on letting, CGT on selling, and IHT when you pass on." (153)
  - (Must mention the lifecycle span; may flag the April-2027 rate change; NO pricing, NO payback claim.)
- **h1 / title:** keep "Property Investment Tax UK: Complete Guide 2026" (umbrella-aligned; matches inbound anchor text). Optionally refresh to "Property Investment Tax UK: Complete Guide 2026/27" for year-currency.
- **Preserve** `metaTitle_prev` / `metaDescription_prev` frontmatter fields (audit trail of the prior pivot). Update `dateModified` to write date.

---

## 19-step workflow (legacy-rewrite adaptation) — inherited from parent program with Track 2 deltas

Inherits the full 19-step workflow per TRACK2_PROGRAM §4 section 14. Track 2 deltas + this-page specifics:

1. Read `house_positions.md` §1, §3, §4, §5, §7, §9, §21, §22, §38 in full at session start.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting / execution status).
3. Read this brief end-to-end.
4. **Verify FA 2026 Royal Assent (18 March 2026) + ss.6-7 (April 2027 rates) + Sch 1 (s.24 reducer rise) against legislation.gov.uk.** This is the load-bearing pre-rewrite verification (F-37). Assert as enacted law; do NOT hedge as proposed.
5. Re-fetch the 3 competitor URLs (httpx + proper UA); 200-check; replace any non-200 (§16.31). Re-check the 5-7 authority URLs; reject substituted-out sections (use TCGA s.1H not s.4 per F-8).
6. Read the current source `property-investment-tax-uk-complete-guide-2026.md` in full.
7. Skim the specialist sibling pages this hub forward-links to, to align framing + confirm each owns its deep intent (no head-on competition).
8. Plan rewrite: ~11 H2s, ~3,400 body words, 12-14 FAQs, 1 routing table, 3 worked examples.
9. **Rewrite markdown at existing path** (NOT a new file). Preserve frontmatter slug + canonical + `date`; update `dateModified`. **Reset metaTitle + metaDescription** to umbrella-lifecycle framing; keep `metaTitle_prev`/`metaDescription_prev`. HTML body (`<p>`/`<h2>`/`<ul>`), no markdown syntax.
10. Run site build: `cd Property/web && npm run build`. Must pass.
11. Run six checks: FAQ schema count = frontmatter `faqs:` length; em-dash count = 0 (`grep` for the em-dash char); Tailwind class count = 0; meta title ≤ 62; meta description ≤ 158; all internal links resolve to live `/blog/<category>/<slug>` paths. PLUS: pricing-leak check (no `£[0-9]` fee/payback lines; the £-figures present must be tax-rate/threshold figures only, not fees).
12. Confirm no redirect needed (none — slug kept; hub repositioned in place; 37 inbound links preserved).
13. Update `monitored_pages` Supabase row (insert if not yet tracked; INVISIBLE baseline → **180-day window** per F-11, not 90).
14. Commit on `main`: "Track 2A: rewrite property-investment-tax-uk-complete-guide-2026 (INVISIBLE hub reposition + April-2027 STALE_FACTS fix + meta reset)". Tracker edits via absolute paths only.
15. Update `track2_page_tracker.md`: mark ✅ executed.
16. Update `track2_site_wide_flags.md`: STALE_FACTS (April 2027 absent from umbrella hub) + Decision-E soft-sell fix.
17. Update `TRACK2_PROGRAM.md` §3 heartbeat.
18. Log discoveries for inter-batch awareness.
19. Next page in batch (or end batch).

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §1 SDLT 5% surcharge: __
- §3 MTD schedule (£50k/£30k/£20k): __
- §4 Section 24 (20% credit 2026/27; rises to 22% 2027/28; no new wedge): __
- §5 CGT (18%/24% + £3k AEA; s.1H not s.4): __
- §7 April 2027 (22/42/47, England/Wales/NI, FA 2026 ss.6-7) — RA verified at write: __ enacted (assert) / __ (if unexpectedly not enacted: STOP + flag manager)
- §9/§15/§22 IHT (NRB £325k, no BPR for BTL, pensions-in-estate 2027): __
- §21 CT (19/25/26.5%; CIHC = s.18N not s.34): __
- §38 capital allowances (WDA 14%, 40% FYA, s.35 bar): __

### Comparison: before vs after
- Word count: 850 → __
- H2 count: 7 (+3 H3) → __
- FAQ count: 4 → __
- Authority links: 0 → __
- Internal forward-links: 4 → __
- Worked examples: 0 → __
- Routing table: 0 → __ (1 expected)
- metaTitle: "Section 24 mortgage interest: worked example 2025/26" → __
- metaDescription reset: __
- Soft-sell line-104 removed/neutralised: __ (Y/N)
- `/incorporation` TSX link fixed to incorporation blog sibling: __ (Y/N)

### Indexability hypothesis test (INVISIBLE baseline)
- Pre-rewrite GSC: 0 impressions / 0 clicks (90d)
- Post-rewrite target: impressions > 0 and growing on umbrella queries (no click target)
- Verify at +60 / +120 / +180 days via monitored_pages detector (180-day window per F-11)

### Flags raised
- STALE_FACTS (April 2027 rates absent) — resolved with FA 2026 RA-verified assertion: __
- Decision-E soft-sell (line 104) — neutralised: __
- Any new flags: __

### 2-3 sentence summary
- (populated at execution time)
