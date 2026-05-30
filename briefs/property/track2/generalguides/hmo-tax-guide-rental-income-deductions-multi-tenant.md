# Track 2 brief: hmo-tax-guide-rental-income-deductions-multi-tenant

**Site:** property
**Brief type:** Legacy rewrite — pillar-hub rewrite (multiple wrong-advice fixes + thin-depth lift + cluster hub repositioning)
**Source markdown path:** `Property/web/content/blog/hmo-tax-guide-rental-income-deductions-multi-tenant.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/hmo-tax-guide-rental-income-deductions-multi-tenant
**Stage 1 priority:** H — broad HMO income/deductions query with a best position of 9.0 already (one rank-jump from page-1 visible) AND two live wrong-advice errors that must be corrected regardless of ranking ROI (consumer-protection priority).
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30
**Cannibalisation status:** REWRITE (this page is the stronger of the income/deductions pair; the deterministic equity guard would REJECT a collapse of this page into its weaker sibling. The weaker `hmo-landlord-accounting-multi-tenant-property-tax` is flagged as a FUTURE inbound-301 candidate INTO this page — do NOT action here.)

> **Gold-reference depth target.** Match the data density and 15-section structure of `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md`. This brief's distinctive feature is that it carries **two confirmed live wrong-advice errors** (abolished 10% wear-and-tear allowance presented as live; £85,000 VAT threshold + misleading "rent triggers VAT" framing) plus two framing-tighten items. Wrong-advice correction is the load-bearing first job, ahead of the depth lift.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `hmo-tax-guide-rental-income-deductions-multi-tenant`. The slug carries the broad income+deductions intent that this page intentionally owns at the centre of a crowded HMO cluster. No redirect away from this page (the equity comparison below proves it is the stronger sibling). Category kept: `Property Types & Specialist Tax`.
- **Gap-mode tags:** `STALE_FACTS` (primary — two live wrong-advice errors) + `THIN_DEPTH` (secondary — 1,166 words against a 3,200 target and a crowded cluster needing a pillar hub) + `CTR_FAIL` + `INVISIBLE` (tertiary — 20 impressions / 0 clicks on Google over the window, zero rows on Bing) + `STRUCTURE` (no rates/threshold reference table, no authority links, only 4 FAQs, no inline CTAs).
- **"Why this rewrite" angle:** This is the broad "how HMO income is calculated and what is deductible" hub at the centre of a 10+ page HMO cluster. It currently (a) **gives wrong advice** that a reader could act on and lose money or get a penalty — it presents the abolished 10% wear-and-tear allowance as a live choice (abolished from April 2016, FA 2016) and states a stale £85,000 VAT threshold with a misleading "HMO landlords exceeding £85,000 must register for VAT" framing that ignores the residential-rent VAT exemption; and (b) **sits thin** at 1,166 words while re-covering topics that dedicated siblings own in depth (capital allowances, licensing fees, vs-standard comparison, incorporation, council-tax policy). The rewrite fixes the wrong advice first, then repositions the page as the **pillar hub** that explains the income/deductions mechanics in depth and **links out** to the narrower siblings rather than restating them. This keeps the cluster distinct and concentrates the broad-query equity on the page that already ranks best (position 9.0 on "hmo tax rules").

---

## Current page snapshot (Stage 2 — filesystem read of source markdown + frontmatter)

**Filesystem source read (2026-05-30):**
- **Body word count:** ~1,166 (matches diagnosis).
- **H2 outline (7 H2 + 5 H3):**
  1. What Qualifies as HMO Rental Income for Tax Purposes? (income-stream list)
  2. Calculating Taxable Income and Allowable Deductions (H3 Room-by-Room; H3 Void Periods; H3 Allowable Deductions)
  3. Business Rates vs Council Tax for HMOs
  4. Section 24 Mortgage Interest Relief and Incorporation
  5. Capital Allowances and VAT Considerations (H3 Capital Allowances; H3 VAT)
  6. Record-Keeping Requirements and Making Tax Digital
  7. Tax Planning, Disposal, and Professional Advice (H3 Planning; H3 Disposal/CGT; H3 Professional Help)
- **metaTitle:** "HMO Tax Guide: Income & Deductions for Landlords" (49 chars — OK length, generic, no differentiator or number hook).
- **metaDescription:** "Complete HMO tax guide covering rental income calculation, allowable deductions, licensing costs, and compliance requirements for multi-tenant properties." (152 chars — at-limit, list-shaped, no specific hook).
- **h1:** "HMO Tax Guide: How to Calculate Rental Income and Claim Deductions on Multi-Tenant Properties" (present in frontmatter `h1:` field).
- **FAQ count (frontmatter `faqs:`):** 4 (income calc / licensing deductible / business rates vs council tax / Section 24). Target 12-14.
- **Inline CTAs:** 0.
- **Worked examples:** 1 partial (£28,920 gross from 5-room build-up) + 1 Section-24 worked example (£30k income / £18k interest / £3,600 credit). No CGT or RDIR worked example.
- **Internal links:** 4 (Section 24 guide, BTL ltd-co incorporation guide, MTD April-2026 deadline, /services). NONE to the narrower HMO siblings (capital allowances, licensing fees, vs-standard, council-tax policy, common-parts s.35, RDIR). This is the core hub-linking gap.
- **Outbound authority links:** 0 (no gov.uk / legislation.gov.uk / HMRC manual citations).
- **Schema present:** Y (FAQPage auto-emitted from frontmatter `faqs:`).
- **Last meaningful edit:** 2026-04-10 (frontmatter `date`).

**Two live wrong-advice errors confirmed in source:**
- **Line 94:** "you can claim either the renewal basis ... or the **wear and tear allowance (10% annual deduction for furnished properties only)**." The 10% wear-and-tear allowance was **abolished from April 2016** (FA 2016) and replaced by Replacement of Domestic Items Relief (ITTOIA 2005 s.311A). This is a reader-actionable error — a landlord could claim a deduction that no longer exists.
- **Line 97:** "HMO landlords with annual rental income exceeding **£85,000 must register for VAT**." The standard VAT registration threshold has been **£90,000 since 1 April 2024** (house_positions §29.8). Worse, the framing is misleading: residential rent is **VAT-exempt** (VATA 1994 Sch 9 Group 1) and does NOT count toward the taxable-turnover registration test, so HMO rent alone almost never triggers registration.

---

## GSC angle (last 90 days) — DATA from diagnosis payload

**Source:** diagnosis payload aggregate (execution session re-pulls fresh from `gsc_query_data` after `python -m optimisation_engine.ingestion.ingest_gsc_queries property --days 90`).

**Aggregate (this slug):** **20 impressions / 0 clicks / 6 distinct queries / best position 9.0** over the window. Primary query: **"hmo tax rules" / "hmo landlord tax"** (rental income and allowable deductions on multi-tenant property).

**Bing:** **zero rows** for this exact slug at latest date. INVISIBLE on Bing — no Bing equity to protect, and no Bing demand signal to lean on. Demand evidence comes from the broad HMO query universe (competitor frequency + the page already touching position 9.0 on Google), not from this page's own thin GSC footprint.

### Pattern analysis

- **Low absolute volume (20 impr) but a near-page-1 anchor.** A best position of 9.0 means a small content+meta lift can push the page onto visible page 1 for the broad income/deductions query, where the cluster siblings do not compete (they own narrower intents).
- **CTR_FAIL is structural, not just meta.** 0 clicks on 20 impressions at best-position 9 is consistent with (a) sitting just below the fold on page 1 and (b) a generic meta title with no differentiator. The fix is body authority + a sharper meta, not a meta-only tweak.
- **INVISIBLE radius.** Because both Google volume and Bing rows are near-zero, the realistic post-rewrite target is tempered: not a position-CTR-benchmark blowout, but moving from 20 impr / 0 clicks to a visible page-1 hub that compounds as the cluster's internal links concentrate equity here. Treat this as a 6-12 month compounding play, not a 30-day CTR test.

**GA4 engagement signal:** execution session pulls `ga4_page_data` for this slug; given the thin GSC footprint, expect near-zero sessions. Do not gate the rewrite on GA4 — the wrong-advice correction is mandatory regardless of engagement data.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: STALE_FACTS (wrong advice — consumer-protection priority).** Two live errors a reader could act on:
1. The abolished **10% wear-and-tear allowance** presented as a current choice (line 94). Abolished from April 2016 by FA 2016; replaced by Replacement of Domestic Items Relief (ITTOIA 2005 s.311A). The site already has the correct dedicated sibling (`replacement-domestic-items-relief-uk-landlords-guide`).
2. The **£85,000 VAT threshold** (line 97), stale since 1 April 2024 (now £90,000, house_positions §29.8), AND the misleading "rent exceeding the threshold triggers VAT registration" framing, which ignores the residential-rent exemption (VATA 1994 Sch 9 Group 1).

These are the load-bearing first job. Fix them before any depth work.

**Secondary: THIN_DEPTH + cluster-hub mispositioning.** At 1,166 words the page is roughly a third of the 3,200 target, and it spends some of that budget re-covering topics owned in depth by dedicated siblings (capital allowances, licensing fees, vs-standard comparison, incorporation, council-tax policy). The fix is not "write more about everything" — it is to go DEEP on the income/deductions mechanics this page uniquely owns (room-by-room income recognition, void/occupancy accounting, expense allocation between communal and dwelling areas, the revenue-vs-capital line, RDIR mechanics) and to **link out** to the narrower siblings for the topics they own. That keeps the cluster distinct (§7 cannibalisation protocol) and turns this page into the genuine pillar hub.

**Tertiary: CTR_FAIL + INVISIBLE + STRUCTURE.** Best position 9.0 with 0 clicks; zero Bing rows; no reference table; no authority links; only 4 FAQs; no inline CTAs. Structural lift (rates/threshold reference table near the top, 12-14 FAQs targeting the broad query universe verbatim, 4-7 verified authority links, 2 inline CTAs) supports both snippet-capture and conversion.

**Load-bearing fix sequence (ordered by ROI + risk):**

1. **Correct the two wrong-advice errors first.** Remove the 10% wear-and-tear option entirely; replace with a proper RDIR explanation (four conditions, like-for-like cap, incidental costs uplift, no initial-purchase deduction, fixtures excluded). Reframe VAT to: most HMO residential rent is exempt (VATA 1994 Sch 9 Group 1) and does NOT count toward the £90,000 taxable-turnover test, so rent alone rarely triggers registration; standard-rated extras (serviced/cleaning/meals where genuinely separate supplies) are the narrow case.
2. **Reposition as the pillar hub.** Add an explicit "where this fits in the HMO cluster" framing and link out to the 6 narrower siblings at the relevant moments instead of re-covering them in depth.
3. **Depth lift to ~3,200 words** on the income/deductions mechanics this page owns (room-by-room income recognition timing, void/occupancy accounting, communal-vs-dwelling expense allocation, the s.35 dwelling-house bar and what still qualifies, RDIR mechanics, Section 24 applied to HMOs, MTD applied to HMOs, CGT on HMO disposal).
4. **Add a reference table near the top** (key HMO tax facts: applicable income tax, RDIR vs capital allowances boundary, Section 24 credit rate, MTD thresholds, VAT exemption position, CGT rates) for snippet-capture and at-a-glance value.
5. **FAQ count 4 -> 12-14**, each targeting a specific broad-query-universe question verbatim (the highest-value being the corrected wear-and-tear and VAT questions).
6. **Authority links: 4-7 verified citations** (legislation.gov.uk for ITTOIA 2005 s.311A, CAA 2001 s.35, VATA 1994 Sch 9 Group 1; gov.uk PIM and VAT threshold page; HMRC PIM for RDIR).
7. **Meta title + description rewrite** with a differentiator (HMO income/deductions hub + the corrected-facts angle) and a free-consultation hook.

---

## Competitor URLs (Stage 2 — VERIFY LIVE at execution via WebFetch per §16.31)

The diagnosis supplied four competitor targets. Execution session MUST re-fetch each (httpx with proper User-Agent), confirm 200 status, capture word count / FAQ count / statute cites / table presence, and replace any non-200. **Do not cite a competitor URL that has not been status-checked at write time.**

| URL | What to borrow | What to differentiate against |
|---|---|---|
| https://www.thefriendlyaccountants.co.uk/tax-treatment-of-hmos-and-multi-lets/ | Income-stream taxonomy + communal-vs-dwelling expense split framing | Likely no RDIR depth, no s.35 dwelling-house bar mechanics, no MTD/CGT 2026/27 figures, no statute hyperlinks |
| https://wearegolding.com/what-uk-landlords-must-know-about-hmo-rentals/ | Plain-English "what landlords must know" structure | Generalist; differentiate with applied worked examples + verified statute spine + the cluster-hub link-outs |
| https://www.moneydonut.co.uk/blog/23/05/key-tax-facts-for-current-and-would-be-hmo-landlords | "Key tax facts" reference-table pattern (snippet-bait) | Almost certainly carries the SAME stale wear-and-tear / VAT-threshold errors (this is the broad-market error pattern); our corrected, dated, statute-cited facts table is the decisive differentiator |
| https://www.iab.org.uk/compliance/property-landlords/key-tax-facts-for-current-and-would-be-hmo-landlords/ | Compliance-checklist framing | Same potential staleness; differentiate on currency (FA 2026 / Autumn Budget 2024 figures) + statute hyperlinks |

**Competitor depth ceiling for this query class:** generalist 800-1,800 word overviews, 0 FAQs, 0 statute citations, frequent STALE facts (the wear-and-tear and £85k-VAT errors are a market-wide pattern). Our 3,200-word target with 12-14 FAQs, 5+ verified statute citations, a corrected facts table, and 6 cluster-hub link-outs puts us decisively best-in-class AND factually correct where the market is wrong — that is the differentiator, not catch-up.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (execution session re-reads the latest in-place refresh at batch start).

| Sibling slug | Category | Equity (per diagnosis) | Intent | Resolution |
|---|---|---|---|---|
| **hmo-tax-guide-rental-income-deductions-multi-tenant** (THIS page) | Property Types & Specialist Tax | 20 impr / 6 queries / best pos 9.0 / 1,166 words / ~9 inbound internal links | Broad income + deductions hub | **REWRITE in place — pillar hub** |
| hmo-landlord-accounting-multi-tenant-property-tax | Landlord Tax Essentials | 10 impr / 2 queries / best pos 21.1 / 783 words / ~1 inbound link | Same broad income/expense/S24/MTD intent (WEAKER) | **Do NOT collapse this page into it.** Equity guard would REJECT (weaker target). **FUTURE inbound-301 candidate: the weaker page should later 301 INTO this one — flag for a future pass, do NOT action here.** |
| hmo-vs-standard-buy-to-let-tax-comparison | Property Types & Specialist Tax | 2,038 words | Comparison intent (distinct) | No collision. Link out from the "how HMOs differ from standard BTL" moment. |
| hmo-capital-allowances-multi-tenant-landlords-claim | Property Types & Specialist Tax | Capital-allowances deep-dive | CA intent (distinct) | No collision. Link out from the capital-allowances paragraph instead of restating. |
| hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property | Property Types & Specialist Tax | s.35 deep-dive | s.35 mechanics (distinct) | No collision. Link out from the s.35 dwelling-house-bar paragraph. |
| hmo-licensing-fees-tax-deductible-uk-landlords | Property Types & Specialist Tax | Single-deduction deep-dive | Licensing-fee deductibility (distinct) | No collision. Link out from the licensing-costs deduction bullet. |
| government-to-end-council-tax-on-hmo-rooms | Property Types & Specialist Tax | Policy / council-tax | Council-tax policy (distinct) | No collision. Link out from the business-rates-vs-council-tax section. |
| incorporating-an-hmo-into-a-limited-company-pros-and-cons | Incorporation & Company Structures | Incorporation | Incorporation intent (distinct) | No collision. Link out from the Section 24 / incorporation moment (alongside the existing BTL ltd-co link). |
| incorporating-hmo-portfolio-to-limited-company | Incorporation & Company Structures | Incorporation (portfolio) | Incorporation intent (distinct) | No collision. Optional secondary link from the incorporation moment. |
| hmo-selective-licensing-compliance-housing-act-2004-... | Property Types & Specialist Tax | Licensing law (Housing Act 2004) | Licensing-law intent (distinct) | No collision. Optional link from the compliance/licensing framing. |

**Conclusion:** **REWRITE in place as the pillar hub.** No REDIRECT-PROPOSED for this page (the deterministic equity guard, §16.T2, would REJECT a collapse of this stronger page into the weaker `hmo-landlord-accounting` sibling). The distinctiveness rule (§7): this page goes DEEP on income/deductions mechanics and LINKS OUT to the narrower siblings rather than re-covering them. **Flag for a future pass:** the weaker `hmo-landlord-accounting-multi-tenant-property-tax` should later 301 INTO this page (10 impr / pos 21.1 -> this page 20 impr / pos 9.0 is a clean weaker->stronger direction the guard would APPROVE) — do NOT action in this rewrite.

---

## Closest existing pages (Stage 2 — verified canonical paths)

Internal-link partners. All paths verified against each sibling's `canonical:` frontmatter on 2026-05-30. Use the path portion after the domain.

**HMO cluster siblings (link OUT to keep cluster distinct):**
- `/blog/property-types-and-specialist-tax/hmo-vs-standard-buy-to-let-tax-comparison` — from "how HMOs differ from standard BTL"
- `/blog/property-types-and-specialist-tax/hmo-capital-allowances-multi-tenant-landlords-claim` — from the capital-allowances paragraph
- `/blog/property-types-and-specialist-tax/hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property` — from the s.35 dwelling-house-bar paragraph
- `/blog/property-types-and-specialist-tax/hmo-licensing-fees-tax-deductible-uk-landlords` — from the licensing-costs deduction bullet
- `/blog/property-types-and-specialist-tax/government-to-end-council-tax-on-hmo-rooms` — from the business-rates-vs-council-tax section
- `/blog/property-types-and-specialist-tax/hmo-selective-licensing-compliance-housing-act-2004-landlord-licensing-mechanics` — optional, from the compliance framing
- `/blog/incorporation-and-company-structures/incorporating-an-hmo-into-a-limited-company-pros-and-cons` — from the Section 24 / incorporation moment

**Cross-cluster (keep existing + add RDIR):**
- `/blog/section-24-and-tax-relief/replacement-domestic-items-relief-uk-landlords-guide` — **NEW, load-bearing** link from the corrected furnishings/RDIR paragraph (replaces the wear-and-tear error)
- `/blog/section-24-and-tax-relief/section-24-tax-relief-complete-guide` — keep (Section 24 section); confirm the live slug at execution (source currently links a `section-24-tax-relief-complete-guide` path — verify it resolves, the canonical Section 24 guide may differ)
- `/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk` — keep (incorporation)
- `/blog/making-tax-digital-mtd/making-tax-digital-landlords-april-2026-deadline` — keep (MTD section)
- `/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk` — keep (CGT-on-disposal section); verify live slug at execution
- `/services` — keep (one CTA target; do not duplicate the auto-injected LeadForm)

---

## House-position references (Stage 1)

- **§5 CGT on UK residential property (2026/27)** [LOCKED 2026-05-23, verified to Autumn Budget 2024]: 18% basic / 24% higher; £3,000 AEA 2026/27; BADR NOT available for residential investment property. CGT-on-disposal section must match. (Source page line 110 is already correct on 18%/24% + £3,000 — RETAIN.)
- **§29.8 VAT registration thresholds (rate-by-reference)** [LOCKED 2026-05-25]: standard registration threshold **£90,000** (up from £85,000 from 1 April 2024); de-registration £88,000. **Verify against gov.uk at write time per §16.27.** This is the fix for the line-97 error.
- **§29.1 / §29.9 residential-rent exemption** [LOCKED]: VATA 1994 **Sch 9 Group 1** — residential lettings are VAT-exempt; exempt supplies do not count toward the taxable-turnover registration test. This is the fix for the misleading "rent triggers VAT" framing.
- **§34 Landlord allowable expenses** [LOCKED 2026-05-27]: ITTOIA 2005 s.272 imports trading deduction rules into the property business GAAP calculation; s.34 wholly-and-exclusively; the revenue-vs-capital line is the gateway. Frames the deductions architecture.
- **§38 Capital allowances (CAA 2001) — FA 2026 reform floor** [LOCKED 2026-05-30, FA 2026 c.11 RA 18 March 2026 ENACTED]: **s.35 dwelling-house bar** (no P&M allowances for plant in a dwelling-house within a property business; **common parts** of a block — communal boiler, lift, lighting — and **integral features** under s.33A in qualifying non-dwelling areas can still qualify). Main-pool WDA **14%** from April 2026 (FA 2026 s.28). This is the fix for the line-93 "fitted kitchen appliances" loose wording. Cross-link the dedicated HMO capital-allowances siblings rather than restating.
- **Replacement of Domestic Items Relief — ITTOIA 2005 s.311A** [statutory hook verified via the live sibling `replacement-domestic-items-relief-uk-landlords-guide`; abolition of 10% wear-and-tear by FA 2016 confirmed]: four conditions, like-for-like cap, incidental-costs uplift, no initial-purchase deduction, fixtures (boilers, fitted kitchens) excluded. This is the fix for the line-94 wear-and-tear error. (Not a numbered top-level HP section; cite the statute s.311A directly and cross-link the dedicated sibling.)
- **§3 MTD for ITSA** [LOCKED]: £50,000 qualifying income from 6 April 2026; £30,000 from 6 April 2027; £20,000 from 6 April 2028. Source line 102 is already correct — RETAIN.
- **§21 Corporation tax rate stack** [LOCKED — VERIFY rate-by-reference at write time per §16.27]: 19% small profits rate to £50,000; 25% main rate above £250,000; marginal relief between. Source line 88 is correct for 2026/27 but MUST be rate-by-reference verified at execution.

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflicts — two live wrong-advice errors (consumer-protection priority).**

1. **STALE_FACTS — abolished wear-and-tear allowance (source line 94).** Page presents the "wear and tear allowance (10% annual deduction for furnished properties)" as a current live option. Abolished from April 2016 (FA 2016); replaced by Replacement of Domestic Items Relief (ITTOIA 2005 s.311A). Conflicts with §34 deductions architecture and the dedicated correct sibling. **Rewrite removes the 10% option entirely and explains RDIR** (like-for-like replacement, no initial-purchase deduction, fixtures excluded), cross-linking the RDIR sibling.

2. **STALE_FACTS — £85,000 VAT threshold + misleading rent-triggers-VAT framing (source line 97).** Threshold stale since 1 April 2024 (now £90,000, §29.8) AND framing ignores the residential-rent exemption (VATA 1994 Sch 9 Group 1, §29.1). **Rewrite corrects the threshold to £90,000 (verify gov.uk at write) and reframes** to make clear most HMO rent is exempt, exempt supplies do not count toward the taxable-turnover test, and rent alone rarely triggers registration; only genuinely separate standard-rated supplies (serviced cleaning/meals as distinct supplies) are the narrow case.

**Framing-tighten (not wrong, but loose):**
3. **Capital allowances "fitted kitchen appliances" wording (source line 93).** Broadly right that communal-area P&M / integral features can qualify, but "fitted kitchen appliances" overstates — fitted kitchens are fixtures (part of the building fabric, excluded from RDIR and barred for P&M inside a dwelling-house per the s.35 bar). Tighten to communal-area plant (communal boiler, lift, lighting) + integral features (s.33A) in qualifying non-dwelling areas; cross-link the s.35 sibling. Note main-pool WDA is now 14% (§38).
4. **Corporation tax bands (source line 88)** correct for 2026/27 but **rate-by-reference verify at write per §16.27**.

**STATUTE-DATE discipline (F-37 pattern):** the current page does NOT cite FA 2026, so there is no existing FA drift to inherit. IF the rewrite touches capital allowances and cites the WDA 18%->14% change, the FA 2026 citation MUST be stated as enacted (FA 2026 c.11, Royal Assent **18 March 2026**, per §38) — verify against legislation.gov.uk at write time. Never write "Finance Bill 2026" / "proposed" / "subject to Royal Assent" for FA 2026 capital-allowances content.

**PRICING-LEAK:** none found in source (no fees, no fee ranges). The rewrite must not introduce any (Decision E: even soft "general-market" fee ranges are a leak). **NO real client names** — any worked example uses anonymised personas only (e.g., "a landlord with a 5-room HMO in a university city").

**Flags to raise at execution** in `track2_site_wide_flags.md`:
- **STALE_FACTS | HIGH | hmo-tax-guide-rental-income-deductions-multi-tenant | abolished 10% wear-and-tear allowance presented as live (line 94). Same broad-market error pattern likely present on other furnished-lettings / furniture-deduction residual pages — cluster-audit candidate.**
- **STALE_FACTS | HIGH | hmo-tax-guide-rental-income-deductions-multi-tenant | stale £85k VAT threshold + misleading rent-triggers-VAT framing (line 97). Threshold-staleness + exemption-framing pattern likely site-wide — cluster-audit candidate.**
- **CANNIBAL (future) | LOW | hmo-landlord-accounting-multi-tenant-property-tax should 301 INTO this page (weaker->stronger). Flagged for a future pass, not actioned in this rewrite.**

---

## Authority links worth considering (Stage 2 — VERIFY all at execution per §16.31)

Execution session selects 4-7 to cite in body; every URL fetched + status-checked + date-stamped at write time. For any Finance Act citation, verify the Royal Assent date on the legislation.gov.uk page (F-37 pattern).

| URL | Use case | Verify-at-write note |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/2005/5/section/311A | Replacement of Domestic Items Relief (ITTOIA 2005 s.311A) — the fix for the wear-and-tear error | Confirm s.311A operative wording present (it was inserted by FA 2016; the section it replaced, s.308A wear-and-tear, was repealed) |
| https://www.legislation.gov.uk/ukpga/2001/2/section/35 | CAA 2001 s.35 dwelling-house bar (no P&M allowances in a dwelling-house) | Confirm operative |
| https://www.legislation.gov.uk/ukpga/2001/2/section/33A | CAA 2001 s.33A integral features (five categories) | Confirm operative |
| https://www.legislation.gov.uk/ukpga/1994/23/schedule/9 | VATA 1994 Sch 9 Group 1 residential-letting exemption | Confirm Group 1 exemption wording |
| https://www.gov.uk/vat-registration/when-to-register | VAT registration threshold (£90,000) cross-reference | Confirm £90,000 current; this is the consumer-facing authority for the threshold fix |
| https://www.gov.uk/hmrc-internal-manuals/property-income-manual | HMRC PIM (property income; RDIR coverage at PIM3210 area) | Verify exact PIM section number — do NOT guess (historic PIM4101 hallucination precedent); cite the manual root if a specific number is unverified |
| https://www.gov.uk/guidance/income-tax-when-you-rent-out-a-property-working-out-your-rental-income | gov.uk rental-income computation cross-reference | Confirm live |
| https://www.legislation.gov.uk/ukpga/2026/11 | Finance Act 2026 (c.11) — ONLY if capital-allowances WDA 14% is cited; verify Royal Assent 18 March 2026 | F-37 discipline; cite s.28 for the WDA substitution |

---

## Universal rules — inherited from parent program (do not restate)

Per TRACK2_PROGRAM.md §4 section 13: voice rules (`NETNEW_PROGRAM.md §4` + `competitor_rewrite_playbook.md §5`); lead-gen architecture (LeadForm auto-injected by `BlogPostRenderer.tsx`, never duplicated; 1-3 inline `<aside>` CTAs at conversion moments); CSS-in-markdown (semantic HTML only, no Tailwind utility classes in body); FAQs and schema (frontmatter `faqs:` array, target 12-14, `buildBlogPostingJsonLd` auto-emits FAQPage, never manually add FAQ schema in body); anti-templating discipline; six-check verification (`§4.3`); statute-citation discipline (statute content can be removed by amendment even when the URL is live — verify operative wording, not just 200 status).

**Critical for THIS brief (HARD RULES):**
- **NO em-dashes** anywhere in user-facing copy (commas, parentheses, full stops, middle dots only).
- **NO pricing / fees / fee ranges** in body or FAQs (Decision E: even soft "general-market" comparisons are a leak).
- **NO real client names**; anonymised personas only.
- **Wrong-advice correction is the load-bearing first job** — remove the abolished wear-and-tear option and fix the VAT framing before any depth work.
- **FA 2026 = enacted** (RA 18 March 2026) if WDA 14% is cited; verify at write.

---

## 19-step workflow — inherited from parent program (Wave 5) with Track 2 deltas

Inherits the full 19-step workflow from `NETNEW_PROGRAM.md §7`. Track 2 deltas (Step 9 = rewrite markdown at existing path; Step 12 = confirm no redirect needed for THIS page; Step 13 = update/insert `monitored_pages` row). Brief-specific ordering:

1. Read `house_positions.md` §5, §21, §29 (esp. §29.1/§29.8/§29.9), §34, §38 in full at session start.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡).
3. Read this brief end-to-end.
4. **Verify the four facts at write time** against legislation.gov.uk / gov.uk: (a) ITTOIA 2005 s.311A RDIR operative; (b) VAT threshold £90,000 (§29.8); (c) corporation tax bands 19%/25%/£250k marginal (§21, rate-by-reference); (d) IF citing capital allowances, FA 2026 c.11 RA 18 March 2026 + WDA 14% (§38, F-37 discipline). This is the load-bearing pre-rewrite step.
5. Re-fetch the 4 competitor URLs (httpx, proper User-Agent); confirm 200; replace any non-200.
6. Read the current source markdown in full + the 7 cluster-sibling pages (to confirm what to link out to vs restate).
7. Plan outline: 9-11 H2s, ~3,200 body words, 12-14 FAQs, a key-facts reference table near the top, 2 inline `<aside>` CTAs, 6 cluster link-outs + RDIR link.
8. **Rewrite markdown at existing path** (NOT a new file). Preserve frontmatter slug + canonical + category; update `dateModified`/`date` to today. Rewrite metaTitle (differentiator + corrected-facts angle, <=62 chars) + metaDescription (named mechanic + free-consultation hook, <=158 chars).
9. **Remove the 10% wear-and-tear option entirely; replace with RDIR.** **Correct the VAT section** (£90,000 + exemption framing). **Tighten the capital-allowances paragraph** (communal/integral-features, s.35 bar, cross-link siblings; WDA 14% if mentioned).
10. Run build: `cd Property/web && npm run build`. Must pass.
11. Six checks: FAQ schema count = frontmatter `faqs:` length; em-dash count = 0; Tailwind class count = 0; meta title <=62; meta description <=158; all internal links resolve. PLUS a pricing-leak grep (`£[0-9]` in fee-discussion context = 0) and a wear-and-tear grep (no live "10%" / "wear and tear allowance" claim remains).
12. Confirm no redirect needed for THIS page (slug kept; pillar hub). Do NOT 301 the weaker sibling here (future pass).
13. Update/insert `monitored_pages` row (180-day window appropriate given INVISIBLE Google + zero Bing baseline, per the INVISIBLE-baseline rule).
14. Commit on `main`.
15. Mark ✅ executed in `track2_page_tracker.md` (absolute paths only).
16. Raise the two STALE_FACTS flags + the future-CANNIBAL flag in `track2_site_wide_flags.md`.
17. Update `TRACK2_PROGRAM.md` §3 heartbeat.
18. Log discoveries (wear-and-tear + VAT-threshold patterns as cluster-audit candidates).
19. Next page in batch.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §5 CGT 2026/27 (18%/24% + £3k AEA, BADR N/A residential): __
- §29.8 VAT threshold £90,000 (verify gov.uk): __
- §29.1/§29.9 residential-rent exemption (VATA Sch 9 Gr 1): __
- §34 allowable-expenses architecture (ITTOIA s.272/s.34): __
- §38 s.35 dwelling-house bar + WDA 14% (FA 2026 c.11, RA 18 Mar 2026 — verify): __
- ITTOIA 2005 s.311A RDIR (verify operative): __
- §3 MTD thresholds (£50k/£30k/£20k): __
- §21 CT bands (verify rate-by-reference): __

### Comparison: before vs after
- Word count: 1,166 -> __
- H2 count: 7 (+5 H3) -> __
- FAQ count: 4 -> __
- Authority links: 0 -> __
- Inline CTAs: 0 -> __
- Worked examples: ~2 -> __
- Key-facts reference table: 0 -> __ (1 expected)
- Cluster link-outs: 0 -> __ (6-7 expected)
- Wear-and-tear error removed: __ (Y/N)
- VAT threshold/framing corrected: __ (Y/N)

### CTR / visibility hypothesis test
- Pre-rewrite GSC baseline: 0 clicks / 20 impr / best pos 9.0; Bing 0 rows.
- Post-rewrite expectation: visible page-1 for the broad income/deductions query as cluster internal-link equity concentrates; 6-12 month compounding play (INVISIBLE-baseline), not a 30-day CTR test.
- Verify at +90 / +180 days via monitored_pages detector.

### Flags raised
- STALE_FACTS wear-and-tear (line 94): __ confirmed removed
- STALE_FACTS VAT threshold/framing (line 97): __ confirmed corrected
- Future-CANNIBAL (weaker sibling 301-in): __ logged, not actioned
- Any new flags: __

### 2-3 sentence summary
- (populated at execution time)

---

## metaTitle / metaDescription / h1 plan

- **metaTitle (target <=62 chars):** test 2-3 candidates leading with the broad query + a differentiator. Candidates:
  - "HMO Tax: Rental Income & Allowable Deductions 2026/27" (53 chars)
  - "HMO Landlord Tax Guide 2026/27 | Income & Deductions" (52 chars)
  - "HMO Tax Rules: How HMO Income & Deductions Work 2026/27" (55 chars)
  Pick the one whose leading tokens best match the primary query "hmo tax rules / hmo landlord tax".
- **metaDescription (target <=158 chars):** specific mechanic + corrected-facts angle + soft hook (no pricing). Candidate: "How HMO rental income is taxed and what you can deduct: room-by-room income, communal-area expenses, Replacement of Domestic Items Relief, Section 24 and MTD." (157 chars). Avoid the old £85k/wear-and-tear framing.
- **h1 (keep intent, can keep current):** "HMO Tax Guide: How to Calculate Rental Income and Claim Deductions on Multi-Tenant Properties" is on-intent and can be retained; optionally shorten the lead. Ensure the H1 differs from the metaTitle (it already does).
