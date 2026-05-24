# Track 2 brief: cgt-commercial-property-different-residential

**Site:** property
**Brief type:** Legacy rewrite (Track 2A, Batch 2 Sub-bucket C, page B2-C3)
**Source markdown path:** `Property/web/content/blog/cgt-commercial-property-different-residential.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/cgt-commercial-property-different-residential
**Stage 1 priority:** **H — CRITICAL** (the page's ENTIRE CORE FRAMING — "commercial CGT is 10%/20% versus residential 18%/24%" — is OUT OF DATE per §5 LOCKED and per legislation.gov.uk s.1H verified 2026-05-24; the page gives substantively wrong reader-facing tax advice for the post-30-October-2024 regime)
**Stage 1 date:** 2026-05-24
**Stage 2 enrichment date:** 2026-05-24
**Cannibalisation status:** REWRITE (clean against shipped Wave 1-6 net-new + 2026-05-21 rewrites; intra-batch checks logged below)

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `cgt-commercial-property-different-residential`. The slug carries the topical comparison intent (`cgt-commercial-property` + `different-residential`) and matches the dominant query pattern. The intent itself remains valid (readers comparing commercial vs residential CGT treatment); what changes is the answer — post-30-October-2024 the RATE is the same (18%/24% for individuals) and the differentiator is the RELIEFS available + the capital-allowances clawback interaction. Title/meta refresh required to drop the "different rates" implicit framing and shift to "different reliefs + different mechanics".
- **Category:** `capital-gains-tax` (kept).
- **Gap-mode tag:** `STALE_FIGURES` (PRIMARY — page's core framing is wrong post-30-October-2024) + `DEPTH` (secondary — page misses the actual current-regime differentiators: BADR mechanics for genuinely-trading commercial, rollover relief s.152 for trading-asset commercial, holdover s.165 on commercial gifts, the capital-allowances clawback interaction with W6 cluster, the SIPP/SSAS commercial-property exemption from CT-on-disposal angle) + `STRUCTURE` (tertiary — 4 FAQs, 0 statute citations in body, no authority links, missing reviewer frontmatter).
- **"Why this rewrite" angle:** the source page asserts at line 26 + body §"CGT Rates for Commercial vs Residential Property" that "Commercial Property CGT Rates: Basic rate taxpayers 10%; Higher rate taxpayers 20%" as the headline differentiator versus residential 18%/24%. This was correct PRE-30-October-2024 but is WRONG post-Autumn-Budget-2024: the Budget aligned non-residential / commercial chargeable gains for individuals at the same 18%/24% rates as residential (per §5 LOCKED + legislation.gov.uk TCGA 1992 s.1H verified 2026-05-24 — s.1H now applies a unified 18%/24% rate to all chargeable gains for individuals, with no separate non-residential band). Gov.uk/capital-gains-tax/rates verified 2026-05-24 confirms: "you'll pay 24% on your gains from 6 April 2026" applies uniformly without a residential-vs-commercial split. The page's "£4,000 saving" worked example at line 43 ("£100k gain — £20,000 CGT on commercial versus £24,000 on residential") is therefore wrong — the gain is now £24,000 either way. This is the highest-stakes substantive error caught in Track 2 so far: it gives an active mis-advice to a reader making an investment-choice decision between commercial and residential property based on the historic rate differential. The page also asserts BADR at 10% (line 47) — per §5 LOCKED BADR is now 14% (from 6 April 2025) rising to 18% (from 6 April 2026) — third consecutive stale-rate error on a single page. The page asserts "Companies pay Corporation Tax: 19% on gains up to £250,000; 25% on gains above £250,000" (lines 81-84) — same wrong-tax-term-via-small-profits-rate error caught on B1-A2 reduce-cgt page (F-9) and B2-C1 NRCGT page (F-21). Rewrite must (a) excise the wrong rate framing and reframe the page around the actual current differentiator (RELIEFS + mechanics, not RATES), (b) anchor on the post-30-October-2024 s.1H unified rate position, (c) make BADR rate transitions load-bearing (10% pre-6-April-2025 → 14% from 6 April 2025 → 18% from 6 April 2026), (d) correct the company CT framing, (e) add the actual current-regime differentiators: BADR for genuinely-trading commercial (note Pawson v HMRC threshold), rollover s.152 for trading-asset commercial (NOT investment), holdover s.165 on commercial gifts, capital-allowances clawback under TCGA s.41, mixed-use property apportionment, SIPP/SSAS commercial property exemption from CT-on-disposal.

---

## Current page snapshot (Stage 2 — source markdown + frontmatter read)

**Filesystem source read (2026-05-24):**
- Frontmatter `date`: 2026-04-10 — bumped at a meta-rewrite pass without content refresh.
- `dateModified`: absent.
- `reviewedBy` / `reviewerCredentials` / `reviewedAt`: absent.
- `metaTitle`: "CGT Commercial vs Residential Property: Key Differences UK" (60 chars — OK).
- `metaDescription`: "CGT commercial property rules differ from residential. Lower rates, business reliefs, and different allowances for property investors." (137 chars — OK on length but content asserts "lower rates" which is wrong post-30-October-2024 — must be rewritten).
- `faqs`: 4 entries (target 12-14).
- `h1`: "CGT on Commercial Property: How Is It Different from Residential?" (good — the comparison intent is still valid; only the answer changes).
- Body word count: ~1,500 (target 2,800-3,400).
- H2 sections: 8 (CGT Rates for Commercial vs Residential; Business Reliefs for Commercial Property; Annual Exempt Amount + Planning; Ownership Structures + Tax Treatment; Professional Property Business vs Investment Property; Depreciation, Capital Allowances + Mixed-Use; Reporting, Payment + Reinvestment). Plus multiple H3s.
- Internal links: 3 (Section 24 complete guide, BTL ltdco complete guide, property accountant services).
- Outbound authority links: **0** (no gov.uk / legislation.gov.uk / HMRC manual cite in body).
- Worked examples: 1 (£100k gain comparison showing £4,000 saving on commercial — WRONG per §5 LOCKED; the actual saving post-30-October-2024 is £0).
- Statute cites in body: NONE. s.1H TCGA NOT named. s.169H BADR NOT named. s.152 rollover NOT named. s.165 holdover NOT named. s.41 capital-allowances clawback NOT named.
- **Substantive content errors (document and correct at rewrite):**
  - **Error 1 (HIGHEST SEVERITY — line 26 + §"CGT Rates for Commercial vs Residential Property" headline + worked example at line 43):** the page's CORE FRAMING — that commercial property CGT is at 10%/20% versus residential at 18%/24% — is WRONG post-30-October-2024. Per §5 LOCKED: "Non-residential / commercial gains aligned to the same 18%/24% rates from 30 October 2024". Per legislation.gov.uk TCGA 1992 s.1H verified 2026-05-24: "Chargeable gains accruing in a tax year to an individual are charged to capital gains tax at a rate of 18% or 24%" — uniformly, no commercial-vs-residential split. Per gov.uk/capital-gains-tax/rates verified 2026-05-24: unified 18%/24% rates with no commercial-vs-residential differentiation. The page's "£4,000 saving" worked example is also wrong — the gain is now £24,000 either way for the higher-rate taxpayer on a £100k gain. This is the load-bearing rewrite: the page must be REFRAMED from "different rates" to "different reliefs + different mechanics".
  - **Error 2 (line 47, BADR rate):** "This relief reduces CGT to just 10% on qualifying gains up to a lifetime limit of £1 million". The 10% BADR rate is OUT OF DATE per §5 LOCKED — BADR rates have risen: 10% to 14% from 6 April 2025, 14% to 18% from 6 April 2026. The £1 million lifetime limit is correct. The page conflates the historic 10% rate with the current regime.
  - **Error 3 (lines 81-84, "Limited Company Ownership"):** "Companies pay Corporation Tax rather than CGT on property disposals: 19% on gains where total company profits don't exceed £250,000; 25% on gains where total company profits exceed £250,000". This is the same wrong-tax-term-via-small-profits-rate error caught on B1-A2 (F-9) and B2-C1 (F-21). The small profits rate (19%) and marginal-relief mechanism apply to TRADING profits of small companies with augmented profits up to £50k / £250k respectively. Chargeable gains of a property-investment company (the typical reader of this page) are taxed at the main CT rate (25% from 1 April 2023), not at the small profits rate, because (a) most BTL property SPVs are part of associated-company groups (associated companies threshold divided), (b) once the gain is included in augmented profits the company usually exceeds £250k anyway, and (c) the small profits rate has a Close Investment-Holding Company (CIHC) exclusion per CTA 2010 s.18N — many property-investment companies fall within CIHC and are excluded from the small profits rate entirely.
  - **Error 4 (lines 56-61, Rollover Relief framing):** "Rollover Relief allows you to defer CGT by reinvesting commercial property sale proceeds into another qualifying business asset". The framing is too permissive: rollover relief under TCGA s.152 requires that the property is an asset used for the purposes of a TRADE (not investment). The typical commercial-property INVESTOR (who lets the commercial property to a trading tenant) does NOT qualify for rollover relief — the property is investment, not trade. Rollover is available where the commercial property is owner-occupied for the owner's own trade (e.g., owner-occupied office, factory, shop) or where it is FHL-grandfathered pre-6-April-2025 (per W6 C8 grandfathered FHL BADR worked example). The page implies rollover is generally available for commercial landlords, which is wrong.
  - **Error 5 (line 17, FAQ #1 — but consistent with Error 1):** "commercial property typically faces lower CGT rates of 10% (basic rate) or 20% (higher rate) compared to residential property's 18%/24% rates". Same as Error 1 — wrong post-30-October-2024.

---

## GSC angle (last 90 days) — REAL DATA from `gsc_query_data` table

**Pulled 2026-05-24 PM via `python -m optimisation_engine.track2.pull_page_data --slug cgt-commercial-property-different-residential --days 90`.**

**Aggregate:** **ZERO GSC rows** for this slug in the 90-day window. ZERO `competitor_serps` rows; ZERO `page_content_map` rows (never parsed); ZERO `competitor_gap_reports`.

**Pattern read:** the page exists and is indexed but **gets sub-threshold daily traffic** so it never crosses GSC's per-day reporting floor. This is now the 9th invisible page among the first 15 Track 2A residual pages investigated (F-11 cross-residual pattern strongly confirmed).

### GA4 engagement signal (real data from `ga4_page_data`)

- ZERO rows. Page never received enough sessions in the window to register in GA4 aggregation.

**Implication for the brief:** no engagement signal to triangulate. Rewrite proceeds on content-correctness + cluster-positioning + statutory-anchor logic. Post-rewrite, monitor via `monitored_pages` for visibility lift. The commercial-vs-residential comparison query class has moderate volume (typically 50-500 imp / 90 days for well-positioned pages on similar comparator topics); expected post-rewrite lift is 5-15 clicks / 90 days achievable if the page reaches position 5-10 on the comparison query class.

**Strategic conclusion:** the rewrite cannot ground gap-mode diagnosis in query-pattern data. The STALE_FIGURES + DEPTH + STRUCTURE diagnosis above is built from (i) source-page content review (5 verified errors, one of which invalidates the page's core framing), (ii) authority-page verification (gov.uk + legislation.gov.uk s.1H + §5 LOCKED — verified 2026-05-24), (iii) house-position alignment (§5 + §24.5 + §25 + cross-reference Wave 6 capital-allowances bucket).

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 source-page review)

**Primary: STALE_FIGURES — CRITICAL severity.** The page's CORE FRAMING is wrong. The Autumn Budget 2024 (30 October 2024) aligned non-residential / commercial chargeable gains for individuals at 18%/24% — the historic 10%/20% rate is gone for individual disposals. This is not a marginal stale figure; it is the page's entire reason-for-being. A reader making an investment decision between commercial and residential property based on this page's "£4,000 saving on a £100k gain" worked example will materially mis-price their after-tax return projection. The page also carries the stale BADR 10% rate (now 14% post-6-April-2025, 18% post-6-April-2026 per §5 LOCKED) and the wrong company-CT-via-small-profits-rate framing (third occurrence in Track 2 — cross-residual pattern strongly confirmed). The Lettings Relief framing problem from B2-C2 / B1-A2 does NOT apply here (this is a commercial page) but the stale-rate cluster pattern absolutely applies.

**Secondary: DEPTH.** Even after correcting the rate errors, the page misses the actual current-regime differentiators between commercial and residential CGT. Missing or under-developed: BADR mechanics for genuinely-trading commercial property (s.169H+ TCGA; the Pawson v HMRC threshold for whether the activity is "wholly or mainly trading"; the 24-month qualifying period; the £1m lifetime limit + tapered rate transitions); rollover s.152 mechanics + the trading-asset requirement (most commercial investors DON'T qualify because rental is investment not trade); holdover s.165 on commercial gifts (available where the asset is a business asset; relevant for inter-generational commercial-property transfer planning); capital-allowances clawback interaction under TCGA s.41 (when commercial property capital allowances have been claimed, the disposal triggers a balancing adjustment AND a base-cost adjustment for CGT — cross-link cluster to W6 C2 balancing allowance + W6 C3 SBA + W6 C6 fixtures election); mixed-use property apportionment (rate apportionment now MUCH less significant since rates aligned, but the s.169H BADR availability still varies by use); SIPP/SSAS commercial-property exemption from CT-on-disposal (commercial property held in a registered pension scheme is fully exempt from CGT/CT on disposal — a major planning differentiator vs residential which is broadly forbidden in SIPP/SSAS); the FHL-grandfathered angle (FHL was historically the only residential category eligible for BADR; post-6-April-2025 abolition, FHL BADR is only available on disposals where qualifying conditions met pre-abolition — W6 C8 cross-link); the SBA (Structures and Buildings Allowance) 3% deduction interaction (commercial property only — affects base cost and balancing on disposal — W6 C3 cross-link).

**Tertiary: STRUCTURE.** 4 FAQs (target 12-14); 0 outbound authority cites in body; no rates table at top; missing the Wave 2+ reviewer-byline frontmatter; missing `dateModified`; only 1 worked example (target 4-5 covering BADR-eligible commercial disposal + rollover-eligible owner-occupied commercial + holdover-on-gift commercial + capital-allowances-clawback on disposal + mixed-use apportionment); no §"What to do this week" practical action block.

**Load-bearing fix sequence (ordered by reader-impact ROI):**

1. **REFRAME the page** from "different rates" to "different reliefs + different mechanics + same headline rate post-30-October-2024". This is the structural rewrite. Title can keep "How Is CGT on Commercial Property Different from Residential?" (the question is still valid); body must answer the question differently. New H1 framing intro: "From 30 October 2024, the headline CGT rate is the same for commercial and residential property (18%/24% for individuals). The real differentiators are now (a) the reliefs available, (b) the capital-allowances clawback, (c) the pension-scheme planning angle, and (d) the ownership-structure choice." This is the load-bearing fix.
2. **Excise the 5 factual errors** and replace with verified post-30-October-2024 framework: (a) unified 18%/24% rate per §5 LOCKED + s.1H TCGA; (b) BADR rate transitions 10% → 14% → 18% with effective dates; (c) company CT correctly applied at main rate 25% (with CIHC + associated-companies + augmented-profits-threshold context); (d) rollover relief s.152 requires trading-asset use, not investment; (e) FAQ #1 corrected.
3. **Add the BADR mechanics section as a new H2** — for the genuinely-trading commercial property scenario (owner-occupied trading premises; FHL pre-abolition; serviced accommodation with substantial services). Cite s.169H, the Pawson v HMRC threshold, the 24-month qualifying period, the £1m lifetime limit, the rate transitions.
4. **Add the rollover relief s.152 section as a new H2** — explicit on the trading-asset requirement; worked example of an owner-occupied office sold + replaced by an owner-occupied factory (eligible); contrast with a let commercial property sold + replaced by another let commercial property (NOT eligible because investment not trade).
5. **Add the capital-allowances clawback section as a new H2** — cross-link cluster to W6 C2 balancing allowance + W6 C3 SBA + W6 C6 fixtures election. The TCGA s.41 base-cost-adjustment-for-prior-allowances mechanic is the load-bearing point: capital allowances reduce the CGT base cost, increasing the chargeable gain on disposal.
6. **Add the SIPP/SSAS commercial property exemption section as a new H2** — commercial property held in a registered pension scheme is CT-free on disposal (and largely IT-free on rental income within the scheme); residential is broadly prohibited in SIPP/SSAS; this is a major planning differentiator that the current page misses entirely.
7. **Add the mixed-use property apportionment section** — refresh, since the rate alignment makes rate apportionment less significant but the BADR availability + rollover availability + capital-allowances availability still varies by use class.
8. **Body lift to 2,800-3,400 words** with the above 5 new sections + statute anchors + 4-5 worked examples + rate table at top.
9. **FAQ count 4 → 12-14** with each FAQ targeting a specific reader question (does commercial CGT really equal residential now? what about BADR? rollover requirements? capital-allowances clawback? mixed-use treatment? company vs personal? pension scheme? etc).
10. **Authority links: 6-8 verified citations** (legislation.gov.uk s.1H TCGA + s.41 + s.152 + s.165 + s.169H; HMRC CG6XXXX series for BADR + rollover + holdover; gov.uk/capital-gains-tax/rates as cross-reference).
11. **Frontmatter hygiene:** add `dateModified`, `reviewedBy`, `reviewerCredentials`, `reviewedAt`. Trim meta description to drop "lower rates" assertion. Bump `date` to actual write date.
12. **Rates table at top** — but reframed: NOT "commercial vs residential rate differential" but "unified rate + relief availability matrix" (rows: commercial-owner-occupied-trading / commercial-let-to-trading-tenant / residential-BTL / residential-FHL-grandfathered / residential-main-residence-PRR; columns: headline-rate, BADR-eligibility, rollover-eligibility, holdover-eligibility, capital-allowances-clawback).

---

## Competitor URLs (Stage 2 — verified live 2026-05-24 via WebFetch)

| URL | Status | Word count | FAQs | Statute cites | Coverage signals | What to borrow / differentiate |
|---|---|---|---|---|---|---|
| https://www.gov.uk/capital-gains-tax/rates | 200 OK + content verified 2026-05-24 | ~800 | 0 | Implicit s.1H | Confirms unified 18%/24% rate post-30-October-2024 with NO residential-vs-commercial split. BADR 18% from 6 April 2026 verified. Trustees/PRs 24% verified. | **Borrow:** the unified rate framing as the LOAD-BEARING starting point — the rewrite's headline correction. **Differentiate:** add the relief-availability matrix gov.uk doesn't have. |
| https://www.legislation.gov.uk/ukpga/1992/12/section/1H | 200 OK + content verified 2026-05-24 | n/a | n/a | s.1H operative subsection (3): "Chargeable gains accruing in a tax year to an individual are charged to capital gains tax at a rate of 18% or 24%" — uniformly | Statutory anchor for the unified rate | **Borrow:** verbatim citation as the chapter-and-verse of the regime. **Differentiate:** translate the statutory wording into the implication: "there is no longer a commercial-vs-residential rate split for individuals". |
| https://www.legislation.gov.uk/ukpga/1992/12/section/1I | 200 OK + content verified 2026-05-24 | n/a | n/a | s.1I operative subsections — confirms entrepreneur-or-investor-gains allocation mechanism + 24% top rate + 18% basic-rate-band allocation | Statutory anchor for the rate-allocation mechanism | **Borrow:** the s.1I allocation rules for explaining how the £3k AEA + basic-rate-band capacity + higher-rate gains stack. **Differentiate:** translate into worked-example language. |
| (3-5 commercial accountant + tax-firm competitors blocked by WebFetch UA — UK Property Accountants, Crowe, BDO, Saunderson House, Hwfisher, Cooper & Co all returned 403 / 404 / blocked-by-fetch at 2026-05-24 attempts) | 403 / 404 across multiple attempts | Unknown | Unknown | Unknown | Likely high-quality coverage of the post-Autumn-Budget-2024 commercial CGT regime — particularly Crowe / BDO / RSM for the corporate-investor angle, Tax Adviser Magazine for the s.152 + s.169H detailed mechanics, ICAEW for the technical-update angle. Execution session should re-fetch with browser User-Agent. | **Flag at execution:** re-fetch with browser UA per F-12 lesson; specifically target 2-3 firms for depth-comparison on BADR + rollover post-30-October-2024 framing. NOT URL-dead; just fetch-blocked. |
| https://www.legislation.gov.uk/ukpga/1992/12/section/169H | Verify content at execution | n/a | n/a | s.169H BADR statutory base | Statutory anchor for BADR availability | **Borrow:** verbatim citation. **Differentiate:** translate into the qualifying-trade-or-business test for commercial-property scenarios. |

**Competitor depth ceiling for this query class:** gov.uk rates page + legislation.gov.uk s.1H/s.1I are the load-bearing authorities; the rest of the competitor landscape is fragmented across accountancy-firm post-Budget commentaries that we couldn't WebFetch directly. Our 2,800-3,400 word target with 12-14 FAQs + 6-8 statute citations + 4-5 worked examples + relief-availability matrix at top puts us best-in-class on the unified-rate + relief-differentiator framing specifically.

**What to differentiate against:** the source page (this page's prior incarnation) is the canonical example of the OUTDATED commercial-vs-residential framing — competitors that haven't refreshed will look identical. The execution session should expect that 50%+ of accessible competitor URLs still carry the 10%/20% commercial framing as of execution date; cite the post-30-October-2024 unified-rate authoritatively against that background. Our differentiator: the relief-availability matrix + the capital-allowances clawback cross-link cluster (W6 C2/C3/C6) + the SIPP/SSAS commercial-property exemption angle that no accessible competitor covers in this context.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (REFRESHED 2026-05-24 PM, post-Wave-6 close).

| Source | Slug | Status | Resolution |
|---|---|---|---|
| Residual (self) | cgt-commercial-property-different-residential | REWRITE | self — rewrite in place; framing reframed from "different rates" to "different reliefs + different mechanics" |
| Excluded (rewritten 2026-05-21) | capital-gains-tax-property-complete-guide-uk | CGT pillar | No collision — pillar covers comprehensive policy. This page is the commercial-vs-residential comparator. Reciprocal forward-link required. |
| Excluded (rewritten 2026-05-21) | cgt-payment-deadlines-property-sales-2026 | 60-day deadlines canonical (F-13 back-patched 2026-05-24) | No collision in subject matter. Forward-link from this brief's reporting section. |
| Excluded (rewritten 2026-05-21) | cgt-rates-property-2026-27-current-rates-explained | Rates explainer (trial gold reference) | No collision — that page is the unified-rate explainer; this brief is the commercial-vs-residential comparator that EXPLAINS WHY THE UNIFIED RATE HAPPENED. Forward-link reciprocal. |
| Wave 6 Bucket C — CAPITAL ALLOWANCES CLUSTER (SHIPPED 2026-05-24) | balancing-allowance-balancing-charge-on-disposal-property-capital-allowances-mechanics (W6 C2) | Adjacent | **CRITICAL CROSS-LINK** — this brief's new capital-allowances-clawback section must forward-link to W6 C2 for the depth on balancing adjustments. Reciprocal back-link from W6 C2 to this brief for the CGT-side of the clawback. |
| Wave 6 Bucket C (SHIPPED 2026-05-24) | structures-and-buildings-allowance-sba-3-percent-claim-mechanics-fa-2018-onward (W6 C3) | Adjacent | **CRITICAL CROSS-LINK** — SBA reduces base cost for CGT; forward-link from this brief's capital-allowances section. Reciprocal back-link. |
| Wave 6 Bucket C (SHIPPED 2026-05-24) | full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023 (W6 C5) | Adjacent | Forward-link from "commercial property SPV / company ownership" section for the 50% FYA framing. |
| Wave 6 Bucket C (SHIPPED 2026-05-24) | commercial-property-fixtures-claim-s198-election-purchase-mechanics (W6 C6) | Adjacent | **CRITICAL CROSS-LINK** — s.198 fixtures election affects the base cost split on commercial property disposal; forward-link from this brief's capital-allowances-clawback section. |
| Wave 6 Bucket C (SHIPPED 2026-05-24) | fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics (W6 C8) | Adjacent | **CRITICAL CROSS-LINK** — FHL grandfathered BADR is the residential-CGT relief outlier; forward-link from BADR section as the "residential side of the BADR availability question". |
| Wave 6 Bucket A — LtdCo extraction cluster (SHIPPED 2026-05-24) | Various MVL / s.455 / dividend extraction pages | Adjacent (corporate side) | Forward-link from "commercial property held in a company" section for the extraction question (e.g., MVL CGT cross-reference). |
| Wave 6 Bucket B — Trusts (SHIPPED 2026-05-24) | settlor-interested-trust-iht-s49-1a-cgt-s169b-holdover-mechanics-blocking (W6 B4) | Adjacent (holdover blocking) | Forward-link from this brief's holdover s.165 section — note s.169B blocks holdover where settlor-interested-trust applies. |
| Wave 4 Ltd Co + FIC bucket | Various | No collision (Wave 4 covers personal-vs-corporate vehicle choice at top level). Forward-link from "corporate ownership" section. |
| Wave 1 ATED + Wave 3 ATED extension | Various | No collision (ATED is residential-only above £500k; not relevant to commercial). |
| Wave 2 expat | Various | No collision (this is a UK-resident-investor framing). |
| Wave 5 (VAT + Devolved + Form 17) | VAT bucket may overlap on commercial-property VAT angle | Adjacent (VAT side) | Forward-link from "commercial property tax considerations beyond CGT" sidebar to Wave 5 A1 (vat-option-to-tax-commercial-property) for the VAT angle. |
| Residual (intra-batch Sub-bucket C sibling) | B2-C1 non-resident-cgt-uk-property-rates-reporting | Adjacent (different scenario class — non-residents) | No collision; forward-link from "what if commercial property is held by a non-resident?" sidebar to B2-C1. |
| Residual (intra-batch Sub-bucket C sibling) | B2-C2 cgt-main-residence-election-two-properties | Adjacent (different property class — residential main residence) | No collision; forward-link from rates table at top for the cross-property-class framing. |
| Residual (intra-batch Sub-bucket B sibling, in-progress) | B2-B2 rollover-relief-property-landlords | **Adjacent — overlap risk on rollover s.152** | B2-B2 covers rollover relief for landlords generally; B2-C3 (this brief) covers rollover in the commercial-property-comparison context. Boundary: B2-B2 is the relief-mechanic deep-dive; B2-C3 is the commercial-vs-residential comparator that mentions rollover as one of the differentiators. Forward-link required from this brief's rollover section to B2-B2 for the depth. |
| Wave 7 in-prep | RRA + HMRC enquiry + trust depth | No collision | Wave 7 confirmed zero CGT cluster work; no collision risk. |

**Conclusion:** REWRITE in place. No REDIRECT-PROPOSED. No FLAG-MANAGER. Critical cross-link cluster to Wave 6 Bucket C (capital allowances) for the clawback / SBA / fixtures / FHL-grandfathered interactions — 4 forward-links to W6 (C2, C3, C6, C8) + 1 reciprocal expectation that W6 C2/C3/C6/C8 should back-link to this brief for the CGT-side completeness. This is the densest Wave 6 cross-link integration of any Track 2 brief drafted so far, validating the launch-prompt's identification of B2-C3 as the W6-cluster-cross-link partner.

---

## Closest existing pages (Stage 2)

Internal-link partners (to and from this page after rewrite):

- **W6 C2 (CRITICAL adjacency)** `balancing-allowance-balancing-charge-on-disposal-property-capital-allowances-mechanics` — bidirectional (CGT-side + CA-side of the clawback)
- **W6 C3 (CRITICAL adjacency)** `structures-and-buildings-allowance-sba-3-percent-claim-mechanics-fa-2018-onward` — bidirectional (SBA base-cost reduction)
- **W6 C5** `full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023` — forward-link from corporate-ownership section
- **W6 C6 (CRITICAL adjacency)** `commercial-property-fixtures-claim-s198-election-purchase-mechanics` — bidirectional (fixtures election affects CGT base cost)
- **W6 C8 (CRITICAL adjacency)** `fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics` — bidirectional (residential-side BADR outlier)
- **W6 A series (LtdCo extraction)** — forward-link from corporate-ownership section
- **W6 B4** `settlor-interested-trust-iht-s49-1a-cgt-s169b-holdover-mechanics-blocking` — forward-link from holdover s.165 section
- **B2-B2 (intra-batch sibling, in-progress)** `rollover-relief-property-landlords` — bidirectional (rollover-relief deep-dive vs commercial-comparator)
- **B2-C1 (intra-batch sibling, in-progress)** `non-resident-cgt-uk-property-rates-reporting` — forward-link from "non-resident commercial-property owner" sidebar
- **B2-C2 (intra-batch sibling, in-progress)** `cgt-main-residence-election-two-properties` — forward-link from rates table at top
- **CGT pillar (rewritten 2026-05-21)** `capital-gains-tax-property-complete-guide-uk` — back-link target + reciprocal
- **Trial gold reference** `cgt-rates-property-2026-27-current-rates-explained` — bidirectional (the unified rate page)
- **60-day deadlines canonical (rewritten 2026-05-21)** `cgt-payment-deadlines-property-sales-2026` — forward-link from reporting section
- **Wave 5 A1 (VAT option to tax)** `vat-option-to-tax-commercial-property-mechanics-election-revocation` — forward-link from "commercial property tax considerations beyond CGT" sidebar
- **Section 24 pillar (rewritten)** `section-24-tax-relief-complete-guide` — keep existing source-page link with correction (S24 does NOT apply to commercial mortgages — that's correct; this is a true differentiator the source page already covers correctly)
- **BTL Ltd Co complete guide (rewritten)** `buy-to-let-limited-company-complete-guide-uk` — keep existing source-page link

---

## House-position references (Stage 1)

- **§5 CGT on UK residential property (2026/27)** [LOCKED — verified gov.uk + legislation.gov.uk s.1H 2026-05-24]: 18%/24% rates apply uniformly to ALL chargeable gains for individuals; non-residential / commercial gains aligned to same 18%/24% rates from 30 October 2024; £3,000 AEA; BADR rates 10% → 14% (6 April 2025) → 18% (6 April 2026). **PRIMARY SPINE for this brief.** The core rewrite is anchored on the unified-rate position.
- **§13 do-not-write list** [LOCKED]: no em-dashes anywhere; no real client names; no pricing; no specific firm names.
- **§21 LtdCo + FIC mechanics — Wave 4 extension** [LOCKED 2026-05-23]: anchor for the corporate-ownership section. Specifically §21.7 CIHC exclusion from small profits rate (CTA 2010 s.18N) — critical for correcting Error 3.
- **§21.1 s.455 close-company loans-to-participators rate** [LOCKED Wave 6 PM 2026-05-24]: 33.75% → 35.75% per FA 2026 s.4(1)(b) substitution. Tangentially relevant if extraction-from-corporate-commercial-property scenario covered.
- **§22 IHT — Wave 4 extension** [LOCKED]: BPR availability for commercial property — Pawson v HMRC threshold (standard let commercial property does NOT qualify for BPR; "wholly or mainly trading" test). Sidebar mention only — this is a CGT brief, not IHT.
- **§25 Capital allowances for property businesses (CAA 2001)** [LOCKED 2026-05-23 Wave 6]: cross-reference for the capital-allowances-clawback section. Specifically the balancing adjustment mechanism (CAA 2001 s.55-s.62 for plant + machinery; CAA 2001 Part 2A for SBA) interacts with TCGA s.41 to produce the CGT base-cost adjustment.

---

## House-position conflict flag (Stage 2)

**Confirmed conflict — F-25 (NEW) — source page core framing is in direct conflict with §5 LOCKED.**

The source page's entire core framing — "commercial property CGT is 10%/20% versus residential 18%/24%" — is a DIRECT CONTRADICTION of §5 LOCKED ("Non-residential / commercial gains aligned to the same 18%/24% rates from 30 October 2024"). This is not a marginal cite-precision issue (like F-23 on sub-section disambiguation); it is the page's reason-for-being-out-of-date. The rewrite excises the wrong framing and reframes the page around the actual current differentiators.

Flag to `track2_site_wide_flags.md` as **F-29 | 2026-05-24 PM | HIGH | cgt-commercial-property-different-residential | STALE_FIGURES + HOUSE_POSITION_CONFLICT + READER_MISLEADING_FACTUAL | Source page asserts commercial CGT at 10%/20% versus residential at 18%/24% as the core framing. This is in DIRECT CONFLICT with §5 LOCKED (verified legislation.gov.uk TCGA 1992 s.1H 2026-05-24): non-residential / commercial gains aligned to same 18%/24% rates from 30 October 2024. The page's £4,000-saving worked example is therefore wrong (£0 saving post-30-October-2024). Page also asserts BADR at 10% (now 14% from 6 April 2025, 18% from 6 April 2026 per §5 LOCKED) and Companies-pay-CT-at-19%-up-to-£250k via small profits rate (third occurrence of this wrong-tax-term error pattern after F-9 + F-25). This is the highest-stakes substantive error caught in Track 2 so far: gives active mis-advice to readers making investment-choice decisions between commercial and residential. Recommend site-wide audit of any other residual page that may propagate the 10%/20% commercial framing — particularly any commercial-property + investor-decision + commercial-vs-residential comparison pages.**

Also raising **F-30 (HIGH) — cross-residual cluster audit for the 10%/20% commercial framing**. Pattern hypothesis: any residual commercial-property page or investor-comparison page authored pre-30-October-2024 likely carries the same wrong 10%/20% commercial CGT framing. The source page is the third confirmed instance of stale-rate cluster (F-9 + B1-A2 reduce-cgt page on 28% residential + B1-A2 on FHL-BADR-alive; F-25 on B2-C1's 30-day-not-60-day + ATED-related-CGT + conveyancer-withholding; this F-29 on commercial-vs-residential rates). The drift pattern is wider than initially scoped at F-9. Recommend Phase 2 cluster pass across the residual commercial-property + investor-comparison + capital-allowances-adjacent pages to identify and refresh against §5 LOCKED. Likely 5-10 pages on hypothetical audit. **Higher confidence than F-26 or F-28 because this F-29 specifically targets a Budget-2024-change cluster.**

Also raising **F-31 (LOW) — cross-residual cluster audit for the wrong-tax-term-via-small-profits-rate framing**. Third occurrence of the same error pattern (F-9 reduce-cgt; F-25 B2-C1 NRCGT; F-29 this brief). Pattern hypothesis: any residual page covering corporate / limited-company / SPV ownership that authored pre-1-April-2023 (when the main CT rate moved to 25% with marginal relief) likely carries similar small-profits-rate-applied-to-investment-gains framing. Recommend Phase 2 cluster pass across the residual corporate-ownership + LtdCo-incorporation + property-SPV pages to identify and refresh against §21 LOCKED + §21.7 CIHC exclusion. The wave 4 already covered LtdCo + FIC depth so the cluster audit is about back-patching residual pages, not re-doing depth work.

---

## Authority links worth considering (Stage 2 — partial WebFetch verification done)

| URL | Verification status | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/1992/12/section/1H | 200 OK + content verified 2026-05-24 — "Chargeable gains accruing in a tax year to an individual are charged to capital gains tax at a rate of 18% or 24%" uniformly | **LOAD-BEARING** statute citation for the unified-rate reframing — this is the page's new anchor |
| https://www.legislation.gov.uk/ukpga/1992/12/section/1I | 200 OK + content verified 2026-05-24 — rate-allocation mechanism for entrepreneur-or-investor-gains | Statute citation for the basic-rate-band capacity + higher-rate gains stacking |
| https://www.gov.uk/capital-gains-tax/rates | 200 OK + content verified 2026-05-24 — unified 18%/24% rate; BADR 18% from 6 April 2026; trustees/PRs 24% | Consumer-side authority for the unified rate; cross-reference cite |
| https://www.legislation.gov.uk/ukpga/1992/12/section/41 | Verify content at execution per §16.8 discipline | Statute citation for the capital-allowances clawback / base-cost-adjustment mechanic (TCGA s.41 reduces CGT base cost by allowances claimed) |
| https://www.legislation.gov.uk/ukpga/1992/12/section/152 | Verify content at execution | Statute citation for rollover relief — note the trading-asset requirement |
| https://www.legislation.gov.uk/ukpga/1992/12/section/165 | Verify content at execution | Statute citation for holdover relief on commercial-property gifts (note: s.169B blocks holdover where settlor-interested trust — cross-link W6 B4) |
| https://www.legislation.gov.uk/ukpga/1992/12/section/169H | Verify content at execution | Statute citation for BADR availability + £1m lifetime limit + qualifying-disposal definition |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg64000 | Verify at execution — HMRC CG manual BADR series | HMRC manual depth on BADR for commercial property |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg60250 | Verify at execution — HMRC CG manual rollover series | HMRC manual depth on rollover s.152 + trading-asset requirement |
| https://www.gov.uk/government/publications/business-asset-disposal-relief-hs275-self-assessment-helpsheet | Verify at execution | HMRC consumer helpsheet for BADR |

**(Execution session selects 6-8 to actually cite in body. Load-bearing 4: s.1H + s.41 + s.152 + s.169H. Consumer 1: gov.uk/capital-gains-tax/rates. HMRC manual 2: CG64000 BADR + CG60250 rollover. Cross-link 1: HS275 BADR helpsheet.)**

---

## Universal rules — inherited from parent program (do not restate)

Per `TRACK2_PROGRAM.md §4 section 13`: voice rules + lead-gen architecture + CSS-in-markdown + FAQs and schema + anti-templating + quality bar + statute citation discipline + all §16 lessons (especially §16.18 reasoning-first, §16.31 URL liveness, §16.35 per-write rate verification, §16.36 statutory-citation cross-check gate, §16.42 EXISTING_PAGE_STALE density). The execution session reads `NETNEW_PROGRAM.md §4` + `docs/competitor_rewrite_playbook.md §5` once at session start.

**Brief-specific reminders within those universals:**
- The 18%/24% rate (now applied uniformly to commercial AND residential per §5 LOCKED) is the §16.35 type of figure that needs gov.uk + legislation.gov.uk verification at write time (verified live 2026-05-24 but re-verify at execution — particularly check whether any further FA 2025 / FA 2026 amendments have re-introduced a commercial-vs-residential differential since brief date).
- The BADR rate transitions (10% → 14% from 6 April 2025 → 18% from 6 April 2026) need re-verification at write time per §16.35.
- The "small profits rate does not apply to investment company chargeable gains" framing (Error 3) is the §16.40 type of finding that needs independent verification — cite CTA 2010 + the CIHC exclusion (s.18N) specifically.
- The 5 factual errors in the source page are non-negotiable removals; the writer should not accidentally retain them by paraphrase. **Particular attention to the worked example at line 43** — the "£4,000 saving on £100k gain" must be either deleted or refactored to demonstrate the £0 rate saving but the meaningful relief-availability savings (e.g., £100k gain on owner-occupied trading commercial qualifying for BADR at 18% = £18k vs £24k on the same gain on a let commercial = £6k actual saving via BADR, not via rate differential).
- Per §16.42 EXISTING_PAGE_STALE density: this brief is exactly the page-class flagged by §16.42 — a residual page carrying pre-FA-2024 rate carryovers. The cross-residual cluster audit in F-26 captures this expectation.

---

## 19-step workflow — inherited from parent program (Wave 5) with Track 2 deltas

Per `TRACK2_PROGRAM.md §4 section 14`: inherits the full Wave 5 19-step workflow from `NETNEW_PROGRAM.md §7`. Track 2 deltas: step 9 rewrites at existing path; step 12 may propose REDIRECT (this brief proposes REWRITE so step 12 is "no redirect required, slug preserved"); step 13 updates existing `monitored_pages` row OR inserts new if not yet tracked.

**Brief-specific call-outs within those workflow steps:**
- **Step 4 (pre-rewrite verification):** re-WebFetch s.1H + s.1I + s.41 + s.152 + s.165 + s.169H + gov.uk/capital-gains-tax/rates at execution to confirm no statute change between brief date (2026-05-24) and execution date. Re-WebFetch 3-5 fetch-blocked competitor URLs (UK Property Accountants, Crowe, BDO, Saunderson House, ICAEW, Hwfisher) with browser User-Agent before quote-citing. Critical: confirm at execution that no FA 2025 / FA 2026 amendment has re-introduced a commercial-vs-residential rate differential since brief date.
- **Step 9 (rewrite):** preserve frontmatter `slug` + `canonical`. Add `dateModified` + `reviewedBy` + `reviewerCredentials` + `reviewedAt`. Bump `date` to actual write date (substantive rewrite). Update `metaTitle` to drop "Key Differences UK" framing in favour of "Same Rate Now: Reliefs + Mechanics" framing (test 2-3 candidates: "Commercial vs Residential CGT 2026/27 | Same Rate, Different Reliefs" or "Commercial Property CGT vs Residential | Post-Budget-2024 Reliefs Guide"). Update `metaDescription` to drop "lower rates" assertion in favour of "same rates, different reliefs + mechanics + planning angles" framing.
- **Step 11 (six checks):** explicit check for the 5 factual errors — none must survive paraphrase. Also: em-dash count = 0; FAQ schema count = `faqs:` array length; meta description ≤158 chars; all internal links resolve; statute citations cite specific sub-sections; rate table at top correctly shows unified 18%/24% (NOT 10%/20% commercial).
- **Step 13 (monitored_pages):** insert new row with `rewrite_date = today`, `monitoring_window_days = 180` (per F-11 INVISIBLE-page recommendation), `expected_lift = "STALE_FIGURES-fix (core-framing reframe from rates to reliefs) + DEPTH-fix (BADR + rollover + holdover + capital-allowances clawback + SIPP/SSAS + mixed-use new sections) + 5 cross-link integration to W6 Bucket C (capital allowances cluster); modest GSC-floor visibility lift expected (5-15 clicks / 90 days achievable on the post-Budget-2024 commercial-CGT comparison query class); engagement-rate target shift from 0% (no GA4 baseline) to ≥40% if any sessions arrive"`.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §5 CGT 2026/27 (UNIFIED 18%/24% post-30-October-2024 for commercial AND residential individuals; BADR 14% from 6 April 2025, 18% from 6 April 2026): __
- §13 do-not-write (no em-dashes, no pricing, no firm names): __
- §21.7 CIHC exclusion from small profits rate (CTA 2010 s.18N) — used to correct Error 3: __
- §25 Capital allowances cluster (W6) cross-link integration — 5 W6 forward-links land: __

### Comparison: before vs after
- Word count: ~1,500 → __
- H2 count: 8 (+ multiple H3) → __
- FAQ count: 4 → __
- Authority links: 0 → __ (6-8 expected)
- Inline CTAs: 0 → __
- Worked examples: 1 (WRONG £4k saving) → __ (4-5 expected, all reframed against unified rate)
- Rates table at top: 0 (would have been wrong) → __ (1 expected — relief-availability matrix, NOT rate-comparison table)
- Frontmatter `dateModified`: absent → __
- Frontmatter `reviewedBy` / `reviewerCredentials` / `reviewedAt`: absent → __
- Cross-link integration to W6 Bucket C (C2 balancing / C3 SBA / C5 FYA / C6 fixtures / C8 FHL-grandfathered): 0 → __ (5 expected)

### Factual-error removal verification
- Error 1 (commercial CGT 10%/20% vs residential 18%/24% framing, line 26 + §"CGT Rates"): __ REMOVED / NOT FOUND (this is the load-bearing rewrite — must be excised completely; rewrite reframes around relief-availability not rate-differential)
- Error 2 (BADR at 10%, line 47): __ CORRECTED to BADR 14% from 6 April 2025, 18% from 6 April 2026
- Error 3 (Companies CT 19%/25% via small-profits-rate, lines 81-84): __ CORRECTED to main CT 25% rate, with CIHC exclusion + associated-companies context
- Error 4 (Rollover Relief framing as permissive for all commercial landlords, lines 56-61): __ CORRECTED to trading-asset requirement; most rental landlords DON'T qualify
- Error 5 (FAQ #1 "lower CGT rates of 10%/20% commercial"): __ REMOVED / NOT FOUND

### Statute-cite verification at write time (per §16.35 + §16.36)
- s.1H TCGA (unified 18%/24% rate) — verified at write time: __ DATE / source URL
- s.1I TCGA (rate-allocation mechanism) — verified at write time: __ DATE / source URL
- s.41 TCGA (capital-allowances clawback / base-cost adjustment) — verified at write time: __ DATE / source URL
- s.152 TCGA (rollover relief + trading-asset requirement) — verified at write time: __ DATE / source URL
- s.165 TCGA (holdover relief + s.169B blocking) — verified at write time: __ DATE / source URL
- s.169H+ TCGA (BADR + £1m lifetime + qualifying disposal) — verified at write time: __ DATE / source URL
- BADR rate transitions verified gov.uk + HS275 at write time: __ DATE / source URL
- CTA 2010 s.18N (CIHC exclusion from small profits rate) — verified at write time: __ DATE / source URL

### Cross-link verification at write time
- W6 C2 (balancing allowance): forward-link added + reciprocal back-link expectation noted for W6 C2 patch: __
- W6 C3 (SBA): forward-link added + reciprocal: __
- W6 C5 (50% FYA): forward-link added: __
- W6 C6 (fixtures s.198 election): forward-link added + reciprocal: __
- W6 C8 (FHL-grandfathered BADR): forward-link added + reciprocal: __
- W6 A series (LtdCo extraction): forward-link added from corporate-ownership section: __
- W6 B4 (settlor-interested trust holdover blocking): forward-link added from holdover section: __
- B2-B2 (rollover relief for landlords): forward-link added + reciprocal: __
- B2-C1 (NRCGT): forward-link added: __
- B2-C2 (PRR election): forward-link added: __
- CGT pillar: forward-link added + reciprocal: __
- Trial gold reference (rates explainer): forward-link added + reciprocal: __
- 60-day deadlines canonical: forward-link added: __
- Wave 5 A1 (VAT option to tax): forward-link added: __

### Flags raised at execution
- F-29 (carried from brief): wrong commercial-vs-residential rate framing — load-bearing rewrite executed: __ confirmed at write
- F-30 (carried from brief): cross-residual cluster audit for 10%/20% commercial framing — surface to Phase 2 manager: __
- F-31 (carried from brief): cross-residual cluster audit for wrong-tax-term-via-small-profits-rate framing (3rd occurrence) — surface to Phase 2 manager: __
- Any new flags surfaced: __

### 2-3 sentence summary
- (populated at execution time)
