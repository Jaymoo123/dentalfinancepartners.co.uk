# Track 2 brief (gold-reference): property-investment-company-structure-planning

**Site:** property
**Brief type:** Legacy rewrite, gold-reference data-complete brief (cluster-canonical repositioning)
**Source markdown path:** `Property/web/content/blog/property-investment-company-structure-planning.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/property-investment-company-structure-planning
**Stage 1 priority:** H, strongest page in a four-page near-duplicate structure-choice cluster; only member with GSC equity (89 impr / 14 queries / 90 days); the rewrite makes it the cluster canonical and unblocks three later 301 collapses.
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30 (data from diagnosis GSC pull + house_positions cross-check + source markdown read; competitor URLs named, liveness to confirm at execution)
**Cannibalisation status:** REWRITE (cluster-canonical; collapse-direction rule confirms this is the strongest of the four, MUST NOT be collapsed). Recommendation logged for the program: 301 the three zero-equity siblings into this page once rewritten (NOT this brief's action).

> **This is a gold-reference brief.** It carries real GSC data, the verified house-position spine, and the section-by-section plan at the depth a Phase 2 / execution sub-agent must match. It mirrors the structure of `cgt-rates-property-2026-27-current-rates-explained.md` (depth target) and the city-page fix discipline of `birmingham-property-accountant.md` (pricing-leak strip).

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `property-investment-company-structure-planning`. It is the strongest-equity slug in the cluster and the natural canonical for the decision-framework / structure-comparison intent. No redirect proposed FOR this page; the redirects flow INTO it later.
- **Category:** `incorporation-and-company-structures` (kept; matches all five cluster siblings and the forward-link targets).
- **Gap-mode tag:** `INVISIBLE` (primary, avg pos 44.4, page 4-8, zero Bing equity) + `THIN_DEPTH` (1,135 body words vs ~3,400 target) + `STALE_FACTS` (CT framing, BADR, BPR, MTD all wrong/stale) + `PRICING_LEAK` (Decision E / F-1) + `STRUCTURE` (no comparison table, no decision tree, no worked numbers, 4 FAQs) + `CTR_FAIL` (secondary, only relevant once positions climb out of page 4-8).
- **"Why this rewrite" angle:** This is NOT a CTR-only meta tweak. The page is INVISIBLE (avg pos 44.4 across 14 queries, zero clicks, zero Bing equity), so the load-bearing lever is **depth + structure + accuracy to climb positions**, with CTR optimisation a downstream second-order win. The rewrite repositions the page from a generic "here are the entity types" explainer into the **canonical structure-decision hub**: SPV vs holding vs group vs trading vs LLP, with a comparison table, a decision tree, and worked numbers, forward-linking to the deep-dive siblings rather than re-explaining each. Critically, the current page carries four material wrong-advice errors (see Gap-mode diagnosis + House-position conflict flag) that an accuracy-led rewrite must fix; correcting these is as load-bearing as the depth lift because they are reader-misleading on a structure-choice page where readers make irreversible incorporation decisions.

---

## Current page snapshot (Stage 2, source markdown read 2026-05-30)

**Filesystem source read (`property-investment-company-structure-planning.md`):**
- **Body word count:** ~1,135 (diagnosis) / ~1,449 by raw awk word-count incl. list markup; treat as ~1,135-1,200 prose. Well below the cluster-canonical floor.
- **H2 outline (8 H2s + 7 H3s):**
  1. Why Your Property Investment Company Structure Matters (carries the £8,000 Section 24 hook)
  2. Main Company Structure Options (H3s: SPV / Holding & Group / Trading Company / Partnership/LLP)
  3. Key Planning Considerations (H3s: Current vs Future / Extraction Strategy / Portfolio Size)
  4. How to Set Up a Property Investment Company (H3s: Formation / Bank Accounts / Tax Registrations / Accounting & Compliance)
  5. Timing and Incorporation
  6. Common Planning Mistakes
  7. Getting Professional Advice
  8. Related Reading (2 links only)
- **metaTitle:** "Property Company Structures: SPV, Holding & Group Guide" (53 chars; has `metaTitle_prev`, a prior meta rewrite already happened and did not move the page; INVISIBLE diagnosis says title is NOT the lever).
- **metaDescription:** "Compare SPVs, holding companies and group structures for UK property investment. See how Section 24 can add £8,000 tax and plan your structure." (141 chars; also has `metaDescription_prev`).
- **h1:** "Property Investment Company Structure Planning: A Complete Guide for UK Landlords".
- **FAQ count (frontmatter `faqs:`):** 4 (target 12-14). **Two FAQs carry pricing leaks** (see below).
- **Worked numerical examples:** 0 (one narrative £100k-income / £40k-interest / £8,000 Section 24 illustration in body; no full worked structure-comparison numbers).
- **Comparison table:** 0. **Decision tree:** 0.
- **Internal links:** 8 (Section 24 pillar x2, limited-company-vs-personal, director-loan, MTD-landlords-April-2026, cgt-property-transfer-limited-company-calculate, landlord-incorporation-step-by-step, buy-to-let-limited-company-complete-guide, property-company-dividend-tax).
- **Outbound authority links (gov.uk / legislation.gov.uk / HMRC):** 0.
- **Schema:** Y (FAQPage auto-emitted from frontmatter).
- **Last meaningful edit:** 2026-04-01 (frontmatter `date`).

**Wrong/stale content located at source (verbatim line refs):**
- Frontmatter FAQ #3: *"Budget £1,500-£3,000 annually for professional compliance support."*, PRICING LEAK.
- Frontmatter FAQ #4: *"Each additional company adds compliance costs of around £1,000-£2,000 annually."*, PRICING LEAK.
- Body §"SPV Limited Company": *"19% corporation tax on profits (rising to 25% for profits over £250,000)"*, oversimplified; omits the associated-companies divisor and CIHC trap.
- Body §"Extraction Strategy": *"retaining profits in a company at 19% corporation tax is highly efficient"*, assumes the £50k SPR band is always available; false for multi-SPV portfolios and CIHCs.
- Body §"Property Trading Company": *"claim Business Asset Disposal Relief... reducing capital gains tax to 10% on the first £1 million"*, STALE rate + wrong for investment companies.
- Body §"Extraction Strategy": *"Company shares may qualify for Business Relief after two years... potentially reducing inheritance tax liability to 0%"*, WRONG for property investment companies (Pawson).
- Body §"Setting Up Accounting": *"From April 2026, property companies will need to comply with Making Tax Digital for Income Tax"*, WRONG; MTD ITSA does not apply to companies.

---

## GSC angle (last 90 days), REAL DATA from diagnosis pull

**Aggregate (this page):** **89 impressions / 0 clicks / avg position 44.4 / 14 distinct queries** in the 90-day window. **Zero Bing equity captured** (no `bing_query_data` rows). The three near-duplicate siblings (#2 `how-to-choose-right-property-company-structure-uk-landlords-2026`, #3 `types-of-property-company-structure-uk-guide`, #4 `when-does-property-holding-company-structure-make-sense-uk-landlords`) are **GSC-INVISIBLE, zero rows, zero inbound equity.**

### Representative queries (from diagnosis)

| query | avg pos |
|---|---|
| types of property company structure | 21.2 |
| best structure for property investment | 44.7 |
| smart property company structure | 52.0 |
| property group structure | 64.7 |
| property holding company structure | 78.5 |
| (primary, framed) property investment company structure (SPV vs holding vs group) | ~44.4 agg |

### Pattern analysis

- **No CTR pathology to fix yet.** At avg pos 44.4 the page is on Google page 4-8; clicks are essentially impossible regardless of title. **A meta rewrite cannot help here** (and one has already been tried per `metaTitle_prev`). The constraint is *ranking*, not click-through. This is the inverse of the `cgt-rates` gold-reference (which ranked pos 5.4 and needed CTR work).
- **Best signal is the head term "types of property company structure" at pos 21.2** (page 2-3), closest to breaking through. The rewrite's comparison-table-and-decision-tree structure directly targets this query class (it is a list/compare intent).
- **The cluster is cannibalising itself.** Four pages, all dated 2026-04-01/04-10, all written to the same SPV-vs-holding-vs-trading-vs-LLP intent. Google has no signal about which to rank, so it ranks none well. Consolidating equity into one canonical (this page) + 301-ing the three dead siblings later is the structural fix the program will execute after this rewrite.

**Strategic conclusion:** depth, structure (comparison table + decision tree + worked numbers), accuracy, and authority citations are the levers to move pos 44 toward pos 10-20. CTR work is deferred until positions improve (per diagnosis: CTR_FAIL is secondary). **Realistic target: climb the head/compare queries from pos 44/21 toward page 1-2 over the 90-180 day monitored window; clicks follow positions.**

### GA4 engagement signal

Not separately pulled at brief time (page is INVISIBLE; negligible sessions expected). Defer to execution-time `ga4_page_data` check. Do not gate the rewrite on GA4, the page has effectively no traffic to engage.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: INVISIBLE.** Avg position 44.4 across 14 queries, zero clicks, zero Bing equity. The page is not in contention. The dominant lever is everything that moves rankings: topical depth, on-page structure Google can parse as a comparison resource, factual accuracy (E-E-A-T), and authority citations. This is a build-up rewrite, not a polish.

**Secondary: THIN_DEPTH.** ~1,135 body words against a ~3,400 target. The page names five structures in a paragraph each and never compares them in a table, never walks a decision, and never shows a number. Competitors (see below) sit at 1,200-2,200 words; the cluster-canonical target of ~3,400 with a comparison table + decision tree + 3-4 worked examples puts this decisively best-in-class, not catch-up.

**Tertiary: STALE_FACTS (four reader-misleading errors, the accuracy spine of the rewrite).** Each verified against `house_positions.md` and current statute; all to RE-VERIFY against legislation.gov.uk at write time per the F-37 Bill-vs-enacted discipline:
1. **Corporation tax oversimplified.** "19% (rising to 25% over £250,000)" omits (a) the **associated-companies divisor** (CTA 2010 s.18D + s.18E): a 5-SPV portfolio under common control has its £50k SPR band and £250k upper limit each divided by 5, so each SPV gets a £10k SPR band and £50k upper limit, most of the "19%" benefit evaporates (house §21.A line 2716); and (b) the **close investment-holding company trap** (CTA 2010 s.18N): an SPV letting to a connected/family tenant is a CIHC, taxed at **25% main rate flat with no SPR** (house §21.A line 2720-2723, §21.5 line 1202). The page's claim that "retaining profits at 19% is highly efficient" is unsafe without these caveats. The marginal-relief band £50k-£250k carries an **effective 26.5% rate** (house §21.A line 2707), not a smooth glide from 19% to 25%.
2. **BADR claim stale + wrong-vehicle.** "reducing CGT to 10% on the first £1 million", the 10% rate is STALE (BADR rose to **14% from 6 April 2025 and 18% from 6 April 2026**, house §5 line 224); and BADR **does not apply to property investment company disposals at all** because letting is not trading (house §22.18 line 1951-1952, CG65700+; Pawson). The page presents BADR as a live reason to choose a trading company for rental, misleading.
3. **BPR/IHT overstated.** "Business Relief after two years... reducing IHT to 0%", Business Property Relief **does not apply to property investment/letting companies** (wholly-or-mainly-investment exclusion; Pawson v HMRC [2013], house §9 line 284, §15.4 line 516, §21.5 line 1204). Even where BPR genuinely applies (trading businesses), the FA 2026 reform caps combined BPR+APR 100% relief at **£2.5m from 6 April 2026** with 50% relief above (house §15.4 line 506). The "0% IHT" promise on a property-investment-company page is wrong advice.
4. **MTD wrong.** "property companies will need to comply with Making Tax Digital for Income Tax from April 2026", **MTD ITSA applies to individuals/unincorporated landlords, NOT companies** (companies file CT600s; limited companies are outside MTD ITSA entirely, house §3 line 171, §19.3 line 828). Strike and replace with the correct company filing obligations (annual accounts, CT600, confirmation statement) and note MTD ITSA is the *personal*-ownership comparator.

**PRICING_LEAK (Decision E / F-1, MUST STRIP).** Two FAQs quote explicit fees ("£1,500-£3,000 annually", "£1,000-£2,000 annually per additional company"). This violates the lead-gen no-pricing handoff model. Per Decision E even soft fee comparisons are a leak. Strip all figures; reframe qualitatively ("ongoing compliance is heavier than personal ownership, annual accounts, a CT600, a confirmation statement, and dividend paperwork; each additional company multiplies that admin") and point to a discovery call rather than a number.

**STRUCTURE.** No comparison table, no decision tree, no worked numbers, 4 FAQs, 0 authority links. The rewrite adds all of these, they are both ranking signals (parseable comparison content for the "types of..." query) and the differentiators competitors lack.

**Load-bearing fix sequence (ordered by ROI for an INVISIBLE page):**
1. **Reposition as the cluster-canonical decision hub.** Add the SPV-vs-holding-vs-group-vs-trading-vs-LLP **comparison table** + a **decision tree** ("Are you reinvesting or extracting? Higher-rate or basic-rate? One property type or several? Family succession in scope?"). This is the unique resource the cluster lacks and the "types of property company structure" (pos 21.2) query wants.
2. **Fix the four wrong-advice errors** (CT divisor+CIHC, BADR, BPR, MTD). Accuracy is a ranking and trust lever; on a structure-choice page these errors are reader-harmful.
3. **Body lift to ~3,400 words** with 3-4 worked numerical examples (single-SPV CT at modest profit; 5-SPV associated-companies divisor; family-tenant CIHC at 25% flat; incorporation CGT + SDLT cost vs annual saving).
4. **Strip the two pricing FAQs**; expand FAQ count to 12-14, each targeting a real cluster query verbatim ("best structure for property investment", "property group structure", "property holding company structure", "do I need separate companies for each property", "is a trading company better for property").
5. **Authority links: 5-7 verified citations** (legislation.gov.uk for CTA 2010 ss.18A/18D/18E/18N, TCGA 1992 s.162, IHTA 1984 s.105/s.124D; gov.uk CT rates + marginal relief pages; HMRC manuals as interpretive overlay).
6. **Forward-link, don't re-explain.** Link out to the SPV deep-dive, the holding/group-relief depth pages, the CIHC page, the marginal-relief page, the incorporation step-by-step, and the s.162/CGT-on-transfer page, positioning THIS page as the hub.
7. **Meta:** secondary lever only. A planning/decision-led metaTitle ("Property Company Structure: SPV vs Holding vs Group (2026)") + a comparison-and-decision-tree-promise metaDescription. Do not expect meta alone to move an INVISIBLE page.

---

## Competitor URLs (Stage 2, named from diagnosis; CONFIRM liveness at execution via WebFetch with proper User-Agent)

| URL | Expected angle | What to borrow | What to differentiate |
|---|---|---|---|
| https://heightsaccountancy.co.uk/2025/10/10/property-spv-holding-company-uk/ | SPV + holding company structure for UK property | Clear SPV-vs-holding framing for a lay reader; SIC-code + lender-preference detail | No comparison table, no decision tree, no associated-companies divisor, no CIHC trap, no worked numbers, all our differentiators |
| https://www.stampdutylandtaxexperts.co.uk/blog/holding-companies-and-spvs/ | Holding companies + SPVs, SDLT-led | SDLT-on-restructure angle (group relief Sch 7 FA 2003; the SDLT cost of moving property between group companies) | Likely thin on CT mechanics + IHT; we add the full CT framework + the SDLT-not-relieved-by-s.162 point |
| https://www.needingadvice.co.uk/spv-with-holding-company/ | SPV-with-holding-company combination | Practical "when does a holding company earn its keep" reasoning | We add the dividend-conduit + group-relief loss-surrender mechanics with worked numbers and forward-links to depth pages |

**Competitor depth ceiling for this query class:** ~1,200-2,200 words, 0-light tables, 0 statute citations, 0-1 worked examples, no decision tree. **Our ~3,400 words + comparison table + decision tree + 3-4 worked examples + 5-7 verified citations + 12-14 FAQs is best-in-class, not catch-up.** The structure-decision-hub framing (with forward-links to deep-dives) is structurally distinct from every competitor, who each cover one or two structures rather than the full decision.

**§16.31 / F-36 note:** if any competitor URL returns non-200 or a WebFetch permission denial at execution, substitute a catalogued v2-sitemap competitor or carry forward a prior-batch verification, and log the substitution. Do not cite an unverified URL.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (current frozen index; re-read at execution per §7).

| Source | Slug | Status | Resolution |
|---|---|---|---|
| Residual (own) | property-investment-company-structure-planning | REWRITE, cluster-canonical | Self. Rewrite in place as the decision hub. Strongest equity in cluster (collapse-direction rule: MUST NOT be collapsed). |
| Cluster sibling (INVISIBLE) | how-to-choose-right-property-company-structure-uk-landlords-2026 | Zero equity | **Recommend 301 INTO this page** after rewrite (program action, not this brief). Same SPV-vs-holding-vs-trading-vs-LLP intent. |
| Cluster sibling (INVISIBLE) | types-of-property-company-structure-uk-guide | Zero equity | **Recommend 301 INTO this page** after rewrite. The "types of..." head term (pos 21.2 on THIS page) belongs to the canonical. |
| Cluster sibling (INVISIBLE) | when-does-property-holding-company-structure-make-sense-uk-landlords | Zero equity | **Recommend 301 INTO this page** after rewrite. Holding-company sub-intent folds into the hub's holding/group section. |
| Distinct sibling, STAYS SEPARATE | spv-property-investment-special-purpose-vehicle-guide | 75 impr / pos 78.4 / 30 queries | Owns the narrow "special purpose vehicle / spv uk" definitional intent. **Forward-link** from the SPV row of the comparison table; do NOT re-explain SPV mechanics here. |
| Distinct sibling, STAYS SEPARATE | tax-efficient-property-investment-structure-guide | 19 impr / pos 55.2 | Owns "tax-efficient property investment" angle. Ranks WORSE than this page on the shared "tax-efficient property investment structure" query (pos 43.2 vs 33.0 here). Stays separate but THIS page outranks it on the shared term, keep this page's tax-efficiency section tight and forward-link to the sibling for the deeper treatment. |
| Depth sibling (CT) | corporation-tax-marginal-relief-property-companies | Live | Forward-link from the CT worked-example section (the £50k-£250k effective 26.5% band detail lives there). |
| Depth sibling (CT) | close-investment-holding-company-property | Live | Forward-link from the CIHC-trap callout. The full s.18N carve-out detail lives there. |
| Depth sibling (group) | property-company-group-relief-corporation-tax / eligible-groups-for-group-relief-under-uk-corporation-tax / multi-company-group-extraction-spv-holding-co-dividend-conduit-mechanics | Live | Forward-link from the holding/group section (loss surrender + dividend conduit mechanics). |
| Depth sibling (SDLT) | sdlt-group-relief-for-corporate-landlord-portfolios | Live | Forward-link from the incorporation-cost section (SDLT on moving property into/between companies; s.162 does NOT relieve SDLT). |
| Wave / MW in-flight | No CT/structure-cluster collision flagged in current heartbeat |, | Re-confirm at execution; the rolling-architecture state (MW3 closed) shows no structure-cluster wave overlap. |

**Conclusion:** REWRITE in place as the cluster canonical. No REDIRECT-PROPOSED for THIS page. The three zero-equity siblings are the redirect SOURCES (program-level recommendation, executed after this rewrite is live and re-indexed). The two distinct siblings (SPV deep-dive, tax-efficient guide) stay separate and become forward-link targets.

---

## Closest existing pages (Stage 2), internal-link plan

All targets confirmed present on disk 2026-05-30 (category path `incorporation-and-company-structures` unless noted). Forward-link, do not re-explain:

- **SPV deep-dive:** `/blog/incorporation-and-company-structures/spv-property-investment-special-purpose-vehicle-guide`, from the SPV row of the comparison table.
- **BTL Ltd Co pillar:** `/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk`, from the SPV section + intro.
- **CIHC trap:** `/blog/incorporation-and-company-structures/close-investment-holding-company-property`, from the family-tenant CIHC worked example.
- **CT marginal relief:** `/blog/incorporation-and-company-structures/corporation-tax-marginal-relief-property-companies`, from the CT worked-example section.
- **Group relief (CT):** `/blog/incorporation-and-company-structures/property-company-group-relief-corporation-tax` and `/blog/incorporation-and-company-structures/eligible-groups-for-group-relief-under-uk-corporation-tax`, from the holding/group section.
- **Group dividend conduit:** `/blog/incorporation-and-company-structures/multi-company-group-extraction-spv-holding-co-dividend-conduit-mechanics`, from the holding-company profit-extraction point.
- **SDLT group relief:** `/blog/incorporation-and-company-structures/sdlt-group-relief-for-corporate-landlord-portfolios`, from the incorporation-cost section.
- **Incorporation step-by-step:** `/blog/incorporation-and-company-structures/landlord-incorporation-step-by-step-guide-uk`, from the "how to set up" section (replace the bulk of the formation walkthrough with this forward-link).
- **CGT on transfer-in / s.162:** `/blog/incorporation-and-company-structures/incorporate-rental-property-without-cgt` and `/blog/capital-gains-tax/cgt-property-transfer-limited-company-calculate`, from the timing/incorporation section.
- **Personal vs company comparator:** `/blog/incorporation-and-company-structures/limited-company-vs-personal-ownership-tax-comparison-2026`, from the "current vs future tax position" section.
- **Dividend tax:** `/blog/incorporation-and-company-structures/property-company-dividend-tax`, from the extraction-strategy section.
- **Director's loan:** `/blog/incorporation-and-company-structures/director-loan-property-company`, from the reinvestment/extraction section.
- **Section 24 pillar:** `/blog/section-24-and-tax-relief/section-24-mortgage-interest-restriction-uk-landlords`, from the "why structure matters" hook (keep the £8,000 illustration but verify the figure and frame it as illustrative, not a fee).
- **Tax-efficient structure sibling:** `/blog/incorporation-and-company-structures/tax-efficient-property-investment-structure-guide`, from the tax-efficiency section (forward-link for the deeper treatment).
- **MTD comparator (personal ownership):** `/blog/making-tax-digital-mtd/making-tax-digital-landlords-april-2026-deadline`, from the corrected MTD paragraph, framed as the *personal*-ownership obligation companies do NOT have.

---

## House-position references (Stage 1), the statute + framing spine

Every `§N.M` resolves to a real section of `house_positions.md` (verified 2026-05-30). Cite the section number, never paraphrase the lock.

- **§21.A Corporation tax three-figure framework** [LOCKED 2026-05-25, Wave 8 mini-lock]: 19% SPR (≤£50k) / 26.5% effective marginal (£50k-£250k) / 25% main (≥£250k); associated-companies divisor CTA 2010 s.18D + s.18E (5-SPV → £10k SPR band each); augmented profits CTA 2010 s.18L. The architectural headline the rewrite's CT section must thread. Do-not-write list at §21.A.2.
- **§21.5 FIC mechanics + CIHC** [LOCKED 2026-05-23, Wave 4]: CIHC under CTA 2010 s.18N (and ss.18N-Q) → 25% flat, no SPR; s.18N qualifying-purpose carve-out means most BTL SPVs are NOT CIHCs (unconnected commercial letting), but family/connected-tenant SPVs ARE. CIHC cite is s.18N, NEVER s.34 (§21.7 do-not-write). No s.165 holdover for investment-FIC share gifts.
- **§5 CGT + s.162 incorporation relief + BADR** [LOCKED]: s.162 automatic CGT relief on incorporation of a *business* (Ramsay v HMRC [2013] threshold, multi-property active management); BADR does NOT apply to investment property; BADR rate 14% (6 Apr 2025) → 18% (6 Apr 2026), NOT 10%.
- **§1 + §1.A SDLT on incorporation** [LOCKED; §1.A Wave 7]: incorporation triggers SDLT on market value of the property transferred; **s.162 relieves CGT only, NOT SDLT**; the SDLT route is FA 2003 Sch 15 partnership SLP relief (genuine pre-existing letting partnership, substance bar, 3-year para 17A anti-withdrawal) or group relief Sch 7 FA 2003. MDR is gone (post-1-June-2024).
- **§9 + §15.4 IHT / BPR-APR** [LOCKED; §15.4 re-verified 2026-05-27 F-102]: standard BTL does NOT qualify for BPR (Pawson v HMRC [2013] UKUT 050); FA 2026 combined BPR+APR £2.5m cap from 6 April 2026 (IHTA 1984 s.124D inserted by FA 2026 Sch 12 para 4), 50% relief above; do NOT cite the stale gov.uk £1m summary.
- **§3 + §19.3 MTD ITSA applicability** [LOCKED]: limited companies are OUTSIDE MTD ITSA entirely (file CT600s); MTD ITSA is the individual/unincorporated-landlord obligation. Do-not-write: "MTD applies to limited companies" (§3 line 179).
- **§38 Capital allowances FA 2026** [LOCKED 2026-05-30, Track 2 batch 4]: relevant only if the rewrite touches plant/fixtures (commercial property in a company), WDA 14% (FA 2026 s.28), new 40% FYA (FA 2026 s.29, unincorporated route), full expensing 100% companies-only (s.45S), special rate pool 6% unchanged. Keep light; forward-link rather than expand.
- **§13 Do-not-write list** [LOCKED]: NO pricing/fees; NO real client names; anonymised social proof only.
- **§7 April 2027 property income rates** [LOCKED 2026-05-30; ENACTED]: only relevant if the rewrite compares personal vs company income-tax exposure, note FA 2026 (RA 18 March 2026) enacted 22/42/47 property income rates from 6 April 2027 (England, Wales, NI; Scotland carved out); the Section 24 reducer rises to 22%. State as enacted law, NOT a proposal. Verify at write time per F-37.

---

## House-position conflict flag (Stage 2), FOUR confirmed conflicts (the accuracy spine)

The current published page **contradicts four locked house positions**. Fixing these is the rewrite's FIRST job, ahead of the depth lift.

1. **CT framing vs §21.A / §21.5.** "19% (rising to 25% over £250,000)" + "retaining profits at 19% is highly efficient" omit the associated-companies divisor (s.18D/s.18E) and the CIHC trap (s.18N). Violates §21.A.2 do-not-write ("Companies pay 19% on the first £250,000"-class drift) and §21.5. **Fix:** full three-figure framework + divisor worked example + CIHC family-tenant callout.
2. **BADR vs §5 / §22.18.** "reducing CGT to 10% on the first £1 million" is stale (now 14%/18%) and wrong-vehicle (no BADR for investment property). **Fix:** correct the rate, state BADR does not apply to property investment, distinguish genuine property *development* trading.
3. **BPR vs §9 / §15.4 / §21.5.** "Business Relief... reducing IHT to 0%" is wrong for property investment companies (Pawson) and ignores the FA 2026 £2.5m cap. **Fix:** strike the 0%-IHT promise; explain BPR does not apply to investment lettings; cover the FIC value-freeze-by-PET route as the actual IHT lever, with the £2.5m cap noted for genuine trading cases.
4. **MTD vs §3 / §19.3.** "property companies will need to comply with Making Tax Digital for Income Tax from April 2026" is wrong. **Fix:** strike; state companies file CT600 + annual accounts + confirmation statement and are outside MTD ITSA; note MTD ITSA is the *personal*-ownership comparator.

**PRICING LEAK (Decision E / F-1, separate from the above):** FAQ #3 and FAQ #4 quote fees. Strip per §13.

**Flags to `track2_site_wide_flags.md` at execution** (next free F-number):
- `<F-n> | 2026-05-30 | HIGH | property-investment-company-structure-planning | STALE_FACTS | CT "19% rising to 25% over £250k" omits associated-companies divisor (s.18D/E) + CIHC trap (s.18N). Likely cluster-wide across the four structure-choice siblings + tax-efficient/SPV depth pages. Recommend §16.43 CT-divisor/CIHC cluster sweep.`
- `<F-n+1> | 2026-05-30 | HIGH | property-investment-company-structure-planning | STALE_FACTS | BADR 10%/£1m stale (now 14%→18%) + applied to property investment (no BADR for letting). 4th+ instance of the BADR-rate stale pattern; reinforces existing cluster-audit recommendation.`
- `<F-n+2> | 2026-05-30 | HIGH | property-investment-company-structure-planning | WRONG_ADVICE | "Business Relief reducing IHT to 0%" on a property-investment-company page (Pawson; no BPR for investment lettings). Reader-harmful. Check cluster.`
- `<F-n+3> | 2026-05-30 | HIGH | property-investment-company-structure-planning | WRONG_ADVICE | "MTD ITSA for property companies from April 2026" (companies outside MTD ITSA, file CT600). Check whether other incorporation pages carry the same MTD-for-companies error.`
- `<F-n+4> | 2026-05-30 | HIGH | property-investment-company-structure-planning | PRICING_LEAK | FAQ #3 (£1,500-£3,000) + FAQ #4 (£1,000-£2,000). Decision E. Strip.`

---

## Authority links worth considering (Stage 2, VERIFY all at execution per F-37)

Select 5-7 to cite in body; verify each resolves AND that the operative wording is current (the TCGA 1992 s.4 / FA 2019-substitution lesson: a live URL can have had its content amended out).

| URL | Use case | Verify |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/2010/8/section/18A | CTA 2010 s.18A small profits rate charge | section live + 19% framework current |
| https://www.legislation.gov.uk/ukpga/2010/8/section/18D | CTA 2010 s.18D marginal relief formula + associated-companies divisor | image-bound table per §16.44; cite gov.uk for 3/200 |
| https://www.legislation.gov.uk/ukpga/2010/8/section/18E | CTA 2010 s.18E associated-company definition | live |
| https://www.legislation.gov.uk/ukpga/2010/8/section/18N | CTA 2010 s.18N CIHC + qualifying-purpose carve-out | live; confirm s.18N(2)(b)+(3) wording |
| https://www.legislation.gov.uk/ukpga/1992/12/section/162 | TCGA 1992 s.162 incorporation relief | live |
| https://www.legislation.gov.uk/ukpga/1984/51/section/105 | IHTA 1984 s.105 BPR (relevant business property) | live; confirm wholly-or-mainly-investment exclusion |
| https://www.legislation.gov.uk/ukpga/1984/51/section/124D | IHTA 1984 s.124D BPR+APR £2.5m cap (FA 2026 Sch 12 para 4) | live; £2.5m NOT £1m (do NOT use stale gov.uk summary) |
| https://www.gov.uk/corporation-tax-rates | gov.uk CT rates + marginal relief (consumer cross-reference) | confirm £50k/£250k limits + 26.5% effective |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg65700 | CG65700+ trading-vs-investment line (BADR/EOT) | confirm path |

---

## Universal rules, inherited from parent program (do not restate)

Per TRACK2_PROGRAM §4 section 13: NETNEW voice block + competitor_rewrite_playbook §5 (NO em-dashes anywhere; lead-gen architecture; CSS-in-markdown, semantic HTML body, no Tailwind utility classes; FAQs target 12-14 in frontmatter `faqs:`, FAQPage schema auto-emitted, never hand-add FAQ schema in body; anti-templating; six-check verification; statute-citation discipline incl. F-8 amended-content + F-37 Bill-vs-enacted). **Brief-critical:** NO pricing/fees in body or FAQs (strip the two leaks); NO real client names (anonymised case-study only, e.g. "a higher-rate landlord with five single-property SPVs"); raw HTML body (`<p>`, `<h2>`, `<table>`); LeadForm auto-injected by `BlogPostRenderer.tsx`, do not duplicate; 1-3 inline `<aside>` CTAs at conversion moments only.

---

## 19-step workflow, inherited (Wave 5) with Track 2 deltas

Inherits the full 19-step workflow from NETNEW_PROGRAM §7 with the Track 2 deltas (Step 9 rewrite-in-place at existing path; Step 12 redirect-disposition; Step 13 monitored_pages). Per-page specifics:

1. Read `house_positions.md` §21.A, §21.5, §5, §1/§1.A, §9/§15.4, §3/§19.3, §38, §13, §7 in full at session start.
2. Claim this brief in `track2_page_tracker.md` (🟡 stage2_drafting / execution claim).
3. Read this brief end-to-end.
4. **Verify the four wrong-advice fixes against legislation.gov.uk + gov.uk** (CTA 2010 ss.18A/18D/18E/18N; TCGA 1992 s.162; BADR rate; IHTA 1984 s.105/s.124D; MTD-company exclusion). This is the load-bearing pre-rewrite step. Also verify §7 April-2027 enacted status if the income-tax comparator is used.
5. Re-fetch the 3 competitor URLs (confirm 200; substitute + log if dead).
6. Read the current source `property-investment-company-structure-planning.md` in full.
7. Read the SPV deep-dive, CIHC, CT marginal-relief, and group-relief siblings (forward-link targets) so the hub forward-links rather than duplicates.
8. Plan outline: 11-13 H2s, ~3,400 body words, 12-14 FAQs, comparison table, decision tree, 3-4 worked examples.
9. **Rewrite markdown at existing path** (preserve slug + canonical; update `dateModified` to today). Strip both pricing FAQs. Fix the four wrong-advice errors. Add table + decision tree + worked examples + authority links. Optional metaTitle/metaDescription refresh (secondary lever).
10. `cd Property/web && npm run build`, must pass.
11. Six checks: FAQ schema count = frontmatter `faqs:` length; em-dash count = 0; Tailwind class count = 0; metaTitle ≤ 62 chars; metaDescription ≤ 158 chars; all internal links resolve; **pricing check: no `£[0-9]` fee-discussion lines in body/FAQs** (the £8,000 Section 24 illustration and worked CT/CGT numbers are tax-figures, not fees, keep, but confirm none read as a quoted service fee).
12. No redirect for THIS page (it is the canonical). Note the three sibling 301s for the program (separate redirect operation after this is live + re-indexed).
13. `monitored_pages`: insert/update row; **180-day window** (INVISIBLE baseline per F-11, needs longer to show position movement), `rewrite_type = 'rewrite'`.
14. Commit on `main`.
15. Mark ✅ executed in tracker.
16. Append discoveries/flags to `track2_site_wide_flags.md` (the five F-flags above).
17. Update TRACK2_PROGRAM §3 heartbeat.
18. Log discoveries for inter-batch awareness (CT-divisor/CIHC cluster sweep candidate; MTD-for-companies cluster check).
19. Next page / end batch.

---

## Section-by-section content plan (~3,400 words)

Target: 11-13 H2s, comparison table, decision tree, 3-4 worked examples, 12-14 FAQs, 2-3 inline CTAs, 5-7 authority links.

1. **H2, Why your property company structure decision matters (≈250 w).** Keep the Section 24 hook (£8,000 illustration, framed as illustrative not a fee; verify figure). Frame the page as the decision hub: this guide compares the five structures and walks the decision; the deep-dives are linked. Forward-link Section 24 pillar + limited-company-vs-personal.
2. **H2, The five structures at a glance (comparison table) (≈350 w + table).** A `<table>` with columns: Structure | Best for | CT treatment | Section 24 | IHT/succession | Compliance load | When it fits. Rows: SPV | Holding company | Group | Trading company | LLP/partnership. This table is the snippet-bait + the "types of property company structure" (pos 21.2) target. Each row forward-links to its deep-dive.
3. **H2, SPV limited company (≈300 w).** The default for most BTL. Limited liability, full mortgage-interest deductibility (no Section 24), SIC 68209, lender preference. **Correct CT framing:** 19% SPR up to £50k, marginal 26.5% £50k-£250k, 25% above, and the caveats in section 7. Forward-link SPV deep-dive + BTL pillar.
4. **H2, Holding companies and group structures (≈350 w).** Holding-co owns subsidiary SPVs; risk segregation; loss surrender (group relief); dividends up the group as franked/exempt distributions (dividend conduit). When the extra compliance earns its keep (multiple property types, JV partners, development + rental ring-fencing). Forward-link group-relief + dividend-conduit pages. Inline CTA after this section.
5. **H2, Property trading vs property investment companies (≈300 w).** The trading/investment line (CG65700+). **Corrected BADR:** investment-letting companies do NOT get BADR; BADR is 14% (2025/26) → 18% (2026/27), not 10%; genuine property *development* can be trading. Why "rental income in a trading company" framing is risky.
6. **H2, LLPs and partnership structures (≈250 w).** When an LLP fits (JV, mixed tax-bracket partners, maintaining personal ownership); LLPs do NOT escape Section 24; mixed-membership rules dismantle founder-LtdCo income-splitting (cross-link). Forward-link.
7. **H2, The corporation tax reality for multi-SPV portfolios (≈450 w + 2 worked examples).** The associated-companies divisor (s.18D/s.18E): 5 SPVs under common control → £10k SPR band + £50k upper limit each. **Worked example A:** single SPV, £30k profit → 19% throughout. **Worked example B:** 5 associated SPVs, £30k profit each → each loses most SPR, lands in marginal band. The CIHC trap (s.18N): family/connected-tenant SPV taxed at 25% flat, no SPR. **Worked example C:** SPV letting to the owner's adult child → CIHC → 25% on all profit. Forward-link CT marginal-relief + CIHC pages.
8. **H2, Extracting profit from a property company (≈300 w).** Director's loan repayment (tax-free while balance lasts; s.162 credit balance), dividends (2026/27 rates 10.75%/35.75%/39.35%, £500 allowance, verify at write time), salary (PA + employer NI 15% over £5k), pension. No single optimum; reader-specific. Forward-link dividend-tax + director-loan pages. Inline CTA.
9. **H2, Inheritance tax and succession (≈300 w).** **Corrected BPR:** property investment companies do NOT qualify for BPR (Pawson); strike the "0% IHT" claim. The real lever is the FIC value-freeze: growth shares to the next generation, founder retains frozen-value preference shares, 7-year PET on the share gift (no s.165 holdover for investment companies). Note the FA 2026 £2.5m BPR+APR cap for genuine trading cases. Forward-link the FIC/IHT depth.
10. **H2, The cost of incorporating an existing portfolio (≈350 w + worked example).** Transferring personally held property to a company is a CGT disposal at market value. **s.162 incorporation relief** can defer the CGT where a genuine *business* is transferred (Ramsay v HMRC [2013]: multiple properties, active management). **Critical: s.162 relieves CGT only, NOT SDLT**, SDLT is charged on the market value moved in unless the FA 2003 Sch 15 partnership SLP route applies (genuine pre-existing letting partnership; substance bar; 3-year anti-withdrawal). **Worked example D:** incorporation CGT + SDLT cost vs annual CT/Section 24 saving, break-even framing. Forward-link incorporate-without-cgt + cgt-property-transfer + SDLT-group-relief pages.
11. **H2, Setting up and running the company (≈250 w).** Formation (Companies House / agent, SIC 68209, directors/shareholders, articles), business bank account, CT registration within 3 months, PAYE if salaried, VAT only if turnover > £90k. **Corrected compliance:** companies file annual accounts + CT600 + confirmation statement; **companies are OUTSIDE MTD ITSA** (that is the personal-ownership obligation). Forward-link incorporation step-by-step. NO pricing.
12. **H2, A decision framework (decision tree) (≈300 w).** A short decision tree: reinvesting vs extracting? higher-rate vs basic-rate now and in future? one property type or several? family succession in scope? development activity? Each branch points to the structure(s) that fit and the relevant deep-dive. This is the unique resource the cluster lacks.
13. **H2, Common mistakes + getting it right (≈200 w).** Choosing on today's circumstances only; ignoring the divisor/CIHC; over-engineering with a group before it earns its keep; underestimating extraction planning. Closing CTA to discovery call (no fee).

**FAQ plan (12-14, each targeting a real cluster query verbatim; NO pricing):** When should I incorporate my property portfolio? / What is the best structure for property investment? / SPV vs holding company, which do I need? / Do I need a separate company for each property? / What is a property group structure and when does it help? / Is a trading company better than an SPV for property? / Can an LLP avoid Section 24? / Will my property company get the 19% small profits rate? (divisor + CIHC answer) / Do property companies pay Making Tax Digital? (no, CT600) / Does Business Relief make company shares IHT-free? (no, Pawson) / Can I move my existing properties into a company without tax? (CGT s.162 + SDLT reality) / What are the ongoing obligations for a property company? (qualitative, no fees) / Does a holding company let me extract profit tax-free? (group dividends nuance) / What SIC code does a property SPV use? (68209).

---

## metaTitle / metaDescription / h1 plan

Secondary lever (INVISIBLE page, ranking, not CTR, is the constraint). Refresh anyway for relevance + the eventual position climb.

- **metaTitle (≤ 62 chars):** `Property Company Structure: SPV vs Holding vs Group 2026` (55 chars), leads with the compare intent that the head term "types of property company structure" (pos 21.2) wants. Alt: `Property Investment Company Structure: SPV, Holding, Group` (57).
- **metaDescription (≤ 158 chars):** `Compare SPV, holding, group, trading and LLP structures for UK property investment. Comparison table, decision tree and worked corporation tax examples.` (151 chars), promises the table + decision tree + numbers that differentiate the page. NO fee, NO em-dash.
- **h1:** `Property Investment Company Structure: SPV vs Holding vs Group`, aligns h1 with the compare/decision framing (current h1 is the generic "...Complete Guide for UK Landlords"; tighten to the decision-hub angle).

---

## Per-page work-log (for execution session)

(Empty template, populated at execution time.)

### House-position alignment
- §21.A CT three-figure framework + s.18D/E divisor: __
- §21.5 / s.18N CIHC (cite s.18N, never s.34): __
- §5 / §22.18 BADR (14%→18%, no BADR for investment): __
- §9 / §15.4 BPR (Pawson; no 0% IHT; £2.5m cap): __
- §3 / §19.3 MTD (companies outside MTD ITSA): __
- §1 / §1.A s.162 relieves CGT not SDLT: __
- §13 pricing leak stripped (Y/N): __

### Comparison: before vs after
- Word count: ~1,135 → __
- H2 count: 8 → __
- FAQ count: 4 → __ (2 pricing FAQs removed)
- Comparison table: 0 → __ (1 expected)
- Decision tree: 0 → __ (1 expected)
- Worked examples: 0 → __ (3-4 expected)
- Authority links: 0 → __ (5-7 expected)
- Inline CTAs: 0 → __ (2-3 expected)

### Position-lift hypothesis test
- Pre-rewrite GSC baseline (90d): 89 impr / 0 clk / pos 44.4 / 14 queries; 0 Bing equity
- Post-rewrite target: climb head/compare queries (pos 21-44) toward page 1-2; clicks follow positions
- Verify at +30 / +90 / +180 days via monitored_pages (180-day window for INVISIBLE baseline)

### Flags raised
- F-flags carried from brief (CT divisor/CIHC, BADR, BPR, MTD, pricing): __ confirmed applied
- Three sibling 301s recommended to program: __ logged
- Any new flags: __

### 2-3 sentence summary
- (populated at execution time)
