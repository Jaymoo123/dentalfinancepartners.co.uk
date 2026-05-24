# Track 2 brief: non-resident-cgt-uk-property-rates-reporting

**Site:** property
**Brief type:** Legacy rewrite (Track 2A, Batch 2 Sub-bucket C, page B2-C1)
**Source markdown path:** `Property/web/content/blog/non-resident-cgt-uk-property-rates-reporting.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/non-resident-landlord-tax/non-resident-cgt-uk-property-rates-reporting
**Stage 1 priority:** **H** (page asserts a SUBSTANTIALLY FALSE conveyancer-withholding regime, conflates the post-FA-2019 NRCGT architecture with pre-2019 framing, and misstates the 60-day rule for non-residents — content is unsafe to read in 2026)
**Stage 1 date:** 2026-05-24
**Stage 2 enrichment date:** 2026-05-24
**Cannibalisation status:** REWRITE (clean against shipped Wave 1-6 net-new + 2026-05-21 rewrites; intra-batch checks logged below)

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `non-resident-cgt-uk-property-rates-reporting`. The slug carries the topical intent (`non-resident-cgt` + `uk-property` + `rates-reporting`) and matches the dominant query pattern in the NRCGT niche. No redirect proposed; residual sibling `non-resident-cgt-selling-uk-property-overseas-guide` covers a distinct "selling from overseas" angle (kept for a future batch).
- **Category:** `non-resident-landlord-tax` (kept — this page sits in the NRL hub alongside Wave 2 expat content; promoting to `capital-gains-tax` would orphan the page from its sibling pool).
- **Gap-mode tag:** `DEPTH` (primary — page misses the post-FA-2019 indirect-disposals regime, the every-disposal-reporting rule, the dual rebasing dates, and the non-resident-company-gains-in-CT architecture) + `STALE_FIGURES` (secondary — at least 3 substantive factual errors documented below) + `STRUCTURE` (tertiary — 4 FAQs, no statute cites in body, no authority links, missing `reviewedBy` / `dateModified` frontmatter).
- **"Why this rewrite" angle:** the source page reads as 2018-vintage NRCGT content that was lightly meta-updated to "2026" without substantive content refresh. It misses every load-bearing change since: the FA 2019 rewrite of the NRCGT regime into TCGA 1992 s.1A + Schs 1A/1B/4AA (the page never names the new architecture); the 6 April 2019 extension to non-residential UK land and indirect disposals of property-rich entities (the page never mentions indirect disposals at all); the 27 October 2021 extension of the residents' 30-day reporting window to 60 days (the page implies the 60-day rule is non-resident-specific); the 30 October 2024 alignment of all chargeable gain rates at 18%/24%; the 6 April 2025 abolition of ATED-related CGT being already historic (the page implies ATED creates "higher CGT rates" for >£500k properties, which has been wrong since 2019); and the FA 2019 unification of non-resident company gains into corporation tax at the main rate of 25% (the page asserts 19%/25% split via "small profits rate", which does not apply to non-trading chargeable gains in the way the page implies). The page also propagates a FALSE conveyancer-withholding-from-sale-proceeds claim — the UK has no FIRPTA-style mandatory conveyancer-withholding regime for non-resident CGT; the only withholding equivalent is the 60-day return obligation itself, which the seller (not the conveyancer) is responsible for. Rewrite must (a) anchor on the post-FA-2019 statutory architecture, (b) excise the false withholding claim, (c) make the every-disposal-regardless-of-tax-due rule load-bearing per §17.4 LOCKED, (d) add indirect disposals + rebasing-by-asset-class + non-resident-company-CT architecture as new sections, (e) cross-link to Wave 2 expat content (§17 cluster) and Wave 1 SDLT non-resident surcharge page.

---

## Current page snapshot (Stage 2 — source markdown + frontmatter read)

**Filesystem source read (2026-05-24):**
- Frontmatter `date`: 2026-04-10 — bumped at a meta-rewrite pass without content refresh.
- `dateModified`: absent (missing the Wave 2+ reviewer-byline pattern).
- `reviewedBy` / `reviewerCredentials` / `reviewedAt`: absent.
- `metaTitle`: "Non-Resident CGT UK Property: Rates & Reporting Guide 2026" (57 chars — OK).
- `metaDescription`: "Complete guide to non-resident CGT on UK property sales. Tax rates, 60-day reporting rules, and compliance requirements for overseas landlords." (147 chars — OK).
- `faqs`: 4 entries (target 12-14).
- `h1`: "Non-Resident CGT on UK Property: What Are the Rates and Reporting Requirements?" (good).
- Body word count: ~1,500 (target 3,000-3,400 — this is a high-complexity statutory page with 4 distinct mechanisms to thread).
- H2 sections: 9 (Who Counts as Non-Resident; CGT Rates + Calculation; 60-Day Reporting + Payment; Withholding Tax + Conveyancer; Non-Resident Company Disposals + Structures; Double Taxation Relief; Joint Ownership + Complex; Record Keeping + Pitfalls; Planning + Advice; Looking Ahead). Plus H3 sub-sections.
- Internal links: 2 (buy-to-let limited company complete guide, what does a property accountant do).
- Outbound authority links: **0** (no gov.uk / legislation.gov.uk / HMRC manual cite in body).
- Worked examples: 2 (Manchester BTL £200k → £280k = £70k gain band-stacked; pre-2015 property £150k → £220k April-2015 → £300k 2026 with rebasing).
- Statute cites in body: NONE. s.1A TCGA NOT named. Schs 1A/1B/4AA NOT named. FA 2019 not named. ATED not named (one mention in passing without statutory cite).
- **Substantive content errors (document and correct at rewrite):**
  - **Error 1 (lines 22-23, FAQ #4 + body lines 77-81):** "the conveyancer may need to withhold CGT from the sale proceeds and pay it directly to HMRC ... unless the seller obtains clearance or provides sufficient security. The withholding rate is typically the higher rate of CGT (24% for residential property)." This is FALSE for the UK regime. The UK has NO mandatory conveyancer / solicitor withholding from sale proceeds for non-resident CGT. (This is a US FIRPTA-style mechanism the source page appears to have imported in error.) The only "withholding" equivalent is the seller's own obligation to file the 60-day NRCGT return and pay tax directly. Conveyancers may CHOOSE to retain funds from the proceeds as a commercial / professional-risk decision (especially where the seller has not engaged a tax adviser), but there is no statutory withholding obligation, no statutory "certificate of non-liability" route, no statutory rate. The FAQ #4 must be re-written to (a) clarify there is no statutory withholding, (b) explain the practical-discretion commercial withholding that some conveyancers operate, and (c) explain the actual seller obligation under TMA 1970 Sch 2 / FA 2019 Sch 2.
  - **Error 2 (body lines 65-75, "The 60-Day Reporting and Payment Rule"):** the page presents the 60-day rule as if its non-resident-specific application is "report and pay within 60 days where tax is due" — same as the UK-resident rule. The correct rule per §17.4 LOCKED + gov.uk verification 2026-05-24 is that non-residents must file the 60-day return for **EVERY** UK land disposal, regardless of whether tax is due, including disposals at a loss and disposals fully covered by reliefs. (Gov.uk verbatim 2026-05-24: "If you're not a resident in the UK, you must report disposals of UK property or land even if you: have no tax to pay on the disposal; have made a loss on the disposal.") The page glosses this critical asymmetry between residents and non-residents.
  - **Error 3 (body lines 83-87, "Non-Resident Company Disposals"):** "The company pays corporation tax on property disposals at 19% (for gains up to £250,000) or 25% (above £250,000)". This conflates the small profits rate / marginal relief mechanism (which applies to TRADING profits of small companies with augmented profits under £50k/£250k) with chargeable gains of a non-resident company holding investment property. Non-resident company chargeable gains on UK property fall within the corporation tax charge by virtue of CTA 2009 s.2(2A) (inserted by FA 2019 Sch 1) and are taxed at the main CT rate (25% from 1 April 2023) — the small profits rate is not a "rate for gains up to £250k", and most non-resident property-investment SPVs do not qualify for small profits rate because they are part of associated-company groups or because their augmented profits exceed the small profits threshold once the gain is included. The page also asserts ATED creates "higher CGT rates" for >£500k properties — ATED-related CGT was repealed from April 2019 (gain on >£500k ATED property now falls within ordinary CT non-resident company gains regime at the same 25% rate).

---

## GSC angle (last 90 days) — REAL DATA from `gsc_query_data` table

**Pulled 2026-05-24 PM via `python -m optimisation_engine.track2.pull_page_data --slug non-resident-cgt-uk-property-rates-reporting --days 90`.**

**Aggregate:** **ZERO GSC rows** for this slug in the 90-day window. ZERO `competitor_serps` rows; ZERO `page_content_map` rows (never parsed); ZERO `competitor_gap_reports`.

**Pattern read:** the page exists on the site and is indexed but **gets sub-threshold daily traffic** so it never crosses GSC's per-day reporting floor. INVISIBLE case — same pattern as Batch 1 Sub-bucket A (B1-A1/B1-A2/B1-A3) and Batch 1 Sub-bucket C (B1-C1/B1-C2/B1-C3) (per F-11 cross-residual pattern). This is the 7th invisible page among the first 13 Track 2A residual pages investigated — F-11 hypothesis (substantial sub-cohort of pages never ranked) holds.

### GA4 engagement signal (real data from `ga4_page_data`)

- **4 sessions / 2 active users / 0 engaged sessions** in 90 days
- **Engagement rate 0% / bounce rate 100%** — every arriving session bounced
- **Average session duration: 0 seconds** (page never actively read on arrival)
- 0 conversions

**Implication for the brief:** 4 bounced sessions in 90 days is the worst engagement signal of any Sub-bucket C page in Batch 1 + Batch 2 so far (Batch 1 Sub-bucket C all had ZERO GA4 rows; this page has 4 sessions ALL bounced). Pattern hypothesis: arriving readers see the false withholding claim (a high-stakes assertion for a non-resident planning a UK sale) early in the page and bounce to look elsewhere — the source page's factual problems are themselves driving bounce. Rewrite proceeds on content-correctness + cluster-positioning logic; post-rewrite, monitor via `monitored_pages` for whether the content fix lifts the page across the GSC reporting floor AND lifts engagement-rate from 0% to a sensible baseline.

**Strategic conclusion:** the rewrite cannot ground gap-mode diagnosis in query-pattern data. The DEPTH + STALE_FIGURES + STRUCTURE diagnosis above is built from (i) source-page content review (3 verified factual errors), (ii) authority-page verification (gov.uk + legislation.gov.uk + HMRC CG73700 — see Authority Links below), (iii) house-position alignment (§5 + §17.4 + §17.5 + §17.6), (iv) competitor coverage signals (below).

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 source-page review)

**Primary: DEPTH.** The page covers ~40% of the actual NRCGT regime's surface area. Missing or under-developed: the post-FA-2019 statutory architecture (s.1A TCGA + Schs 1A/1B/4AA — never named); the 6 April 2019 extension to non-residential UK land (mentioned in passing in body but not as a separate mechanism); indirect disposals of shares in property-rich entities (≥75% UK land + ≥25% holding — never mentioned); the dual rebasing dates (5 April 2015 for residential, 5 April 2019 for non-residential / indirect — page only covers April 2015); the three rebasing options (rebasing default, straight-line apportionment, or full historic gain election — page covers only rebasing default); the non-resident-company-gains-in-CT architecture (page incorrectly applies the small-profits-rate mechanism); the SRT cascade for residence determination (page does the 16-day automatic-overseas test in isolation, never names SRT or Sch 45 FA 2013); the NRL scheme interaction (page omits entirely); the temporary non-residence trap under TCGA s.10A (page omits — relevant where a UK resident emigrates, sells UK property as non-resident, then returns within 5 years); the post-FA-2025 long-term-resident regime (page omits — relevant for the non-resident-spouse exposure question).

**Secondary: STALE_FIGURES.** Three identified factual errors above (the false conveyancer-withholding claim, the 60-day rule presented as same-as-residents, the non-resident-company-rates mis-application). These are not stylistic drift — they are wrong content that gives reader-facing tax advice that fails post-FA-2019 statutory reform AND propagates a US-style withholding myth that does not exist in UK law. The conveyancer-withholding error in particular is high-stakes: a non-resident reader planning a UK property sale who relies on this page will incorrectly assume their solicitor will handle the tax mechanically and may not engage a tax adviser, leading to penalty exposure on the 60-day return.

**Tertiary: STRUCTURE.** 4 FAQs (target 12-14); 0 outbound authority cites in body; no rates table at top; missing the Wave 2+ reviewer-byline frontmatter (`reviewedBy`, `reviewerCredentials`, `reviewedAt`); missing `dateModified`; no statute citations anywhere in body; no §"What to do this week" practical action block; no cross-link to Wave 2 expat / SRT content despite being the NRCGT-specific sibling.

**Load-bearing fix sequence (ordered by reader-impact ROI):**

1. **Excise the 3 factual errors** and replace with verified post-FA-2019 statutory framework: (a) no statutory conveyancer-withholding; explain commercial-discretion practice + statutory seller obligation; (b) every-disposal-regardless-of-tax-due rule cited verbatim from gov.uk; (c) non-resident company gains at 25% main CT rate under CTA 2009 s.2(2A), without the small-profits-rate mechanism. This is the load-bearing fix — without it the page is misleading on three high-stakes points.
2. **Add the post-FA-2019 architecture as the spine.** New H2 explaining s.1A TCGA + Schs 1A/1B/4AA + the FA 2019 rewrite of the old ss.14B-14H regime. Cite legislation.gov.uk verbatim. This anchors every other section.
3. **Add the every-disposal reporting rule with the highest-stakes framing.** New H2 (or restructured existing 60-day H2) leading with "non-residents file for EVERY UK land disposal — including losses, including PRR-relieved gains, including disposals fully covered by AEA". Mark this as the asymmetry with UK residents.
4. **Add indirect disposals section.** New H2 covering the ≥75% UK land + ≥25% holding test for shares in property-rich entities, with worked example (e.g., a non-resident selling 30% stake in a Jersey SPV holding £20m UK property portfolio).
5. **Add dual rebasing section.** New H2 covering the three rebasing options + the asset-class default dates (5 April 2015 residential; 5 April 2019 non-residential / indirect).
6. **Add SRT + s.10A temporary-non-residence content.** New H2 cross-linking to Wave 2 §17.1 SRT + §17.3 s.10A 5-year-recapture trap.
7. **Add NRL scheme interaction.** Brief section: NRL is about rental income (basic-rate withholding on rents), NOT about CGT on disposal; explain the boundary so readers don't conflate the two. Cross-link to Wave 2 §17.5 NRL operational page (if it exists; verify at execution).
8. **Add non-resident-company CT section properly.** New H2 explaining the FA 2019 unification of non-resident company gains into the CT charge under CTA 2009 s.2(2A), 25% main rate, ATED-related CGT abolished from April 2019 (cross-reference §2 LOCKED + §18 LOCKED).
9. **Body lift to 3,000-3,400 words** with the above 7 new sections + statute anchors + worked examples.
10. **FAQ count 4 → 12-14** with each FAQ targeting a specific reader question (every-disposal rule, indirect disposals, rebasing options, SRT change mid-year, etc).
11. **Authority links: 6-8 verified citations** (legislation.gov.uk s.1A TCGA; legislation.gov.uk FA 2019 Sch 1; gov.uk/capital-gains-tax-for-non-residents-uk-residential-property; gov.uk/guidance/capital-gains-tax-for-non-residents-uk-residential-property; HMRC CG73700 + CG73920 + CG73925; CTA 2009 s.2(2A); FA 2013 Sch 45 SRT).
12. **Frontmatter hygiene:** add `dateModified`, `reviewedBy`, `reviewerCredentials`, `reviewedAt`. Trim meta description as needed. Bump `date` to actual write date if substantive rewrite (it is).
13. **Rates table at top** (snippet-bait optimisation): the 18% / 24% rates + AEA £3,000 + 60-day-every-disposal rule for non-residents + 25% CT rate for non-resident companies in a 4-row table.

---

## Competitor URLs (Stage 2 — verified live 2026-05-24 via WebFetch)

| URL | Status | Word count | FAQs | Statute cites | Coverage signals | What to borrow / differentiate |
|---|---|---|---|---|---|---|
| https://www.gov.uk/guidance/capital-gains-tax-for-non-residents-uk-residential-property | 200 OK; content verified 2026-05-24 | ~1,800 | 0 | s.1A architecture implicit; uses HMRC plain-English | Every-disposal rule verified verbatim: "you must report disposals of UK property or land even if you: have no tax to pay on the disposal; have made a loss on the disposal" | **Borrow:** verbatim every-disposal rule (cite gov.uk as authority). **Differentiate:** add the statutory architecture (s.1A TCGA + Schs 1A/1B/4AA), the BTL-landlord worked examples, the indirect-disposals + dual-rebasing depth gov.uk doesn't cover. |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg73700 | 200 OK; content verified 2026-05-24 (CG73700 introduces the NRCGT FA 2015 regime; cross-refs CG73920 for the post-FA-2019 expansion) | ~600 (intro) | 0 | FA 2015 / FA 2019 | HMRC's own historical-to-current narrative — useful for explaining "where the regime came from" without writing as if pre-2019 rules still apply | **Borrow:** the temporal framing ("FA 2015 introduced the residential regime; FA 2019 extended to non-residential + indirect disposals"). **Differentiate:** translate into BTL-landlord language with worked examples HMRC doesn't have. |
| https://www.gov.uk/capital-gains-tax/rates | 200 OK; content verified 2026-05-24 | ~800 | 0 | Implicit s.1H | Confirms 18%/24% rates apply uniformly to residential AND non-residential (no separate non-residential rate band post-30-October-2024) | **Borrow:** the unified rate framing (eliminates the historic residential-vs-commercial split). **Differentiate:** the non-resident specific rate-band-availability issue (non-resident individuals without UK income use the full basic-rate band against the gain — a subtle point gov.uk doesn't make). |
| https://www.legislation.gov.uk/ukpga/1992/12/section/1A | 200 OK; verify content at execution (not in this fetch budget) | n/a | n/a | s.1A operative wording for non-resident CGT charge | Statutory anchor for the post-FA-2019 regime | **Borrow:** verbatim citation as the chapter-and-verse of the regime. **Differentiate:** translate the statutory wording into reader-friendly explanation. |
| https://www.legislation.gov.uk/ukpga/2019/1/schedule/2 | 200 OK; content verified 2026-05-24 (per F-13 prior verification in Batch 1 sub-bucket B): "60-day return for UK land disposals — paragraph 3 sets the reporting and payment obligation, extended from 30 to 60 days by FA 2022" | n/a | n/a | FA 2019 Sch 2 + FA 2022 amendment | Statutory anchor for the 60-day return | **Borrow:** verbatim citation. **Differentiate:** explain the every-disposal-for-non-residents asymmetry that the statute creates (TMA 1970 Sch 2 para 3(1) creates the obligation; the differential treatment between residents and non-residents flows from gov.uk guidance + HMRC's own published position). |
| (3-5 commercial-accountant competitors blocked by WebFetch UA — flag at execution) | 403 across multiple attempts | Unknown | Unknown | Unknown | Cooper & Co, Crowe, BDO, RSM, Tax Insider all blocked the WebFetch User-Agent at 2026-05-24 fetch. | **Flag at execution:** re-fetch with a browser User-Agent for at least 2 of these. Likely high-quality NRCGT coverage that we want to scan for depth-comparison. NOT a URL-dead case (these sites are live and have NRCGT content); just a fetch-blocked case that needs human verification before quote-cite. |

**Competitor depth ceiling for this query class:** gov.uk + CG73700 + s.1A are the load-bearing authorities; the rest of the competitor landscape sits at 1,500-2,500 words with mixed statutory rigour. Our 3,000-3,400 word target with 12-14 FAQs + 6-8 statute citations + worked examples on each of (a) residential disposal + 60-day, (b) non-residential disposal + 60-day + rebasing, (c) indirect disposal of property-rich entity, (d) non-resident company sale, (e) returning resident triggering s.10A recapture would put us best-in-class for the BTL-landlord audience.

**What to differentiate against:** every accessible competitor (gov.uk, HMRC manual) is plain-English regulatory framing; none has a worked example for the 25%-CT non-resident company case, the indirect-disposal property-rich entity case, or the s.10A recapture trap. These are our differentiators. The fetch-blocked competitor accountancy firms likely cover some of this — execution session re-verifies depth-ceiling at re-fetch.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (REFRESHED 2026-05-24 PM, post-Wave-6 close).

| Source | Slug | Status | Resolution |
|---|---|---|---|
| Residual (self) | non-resident-cgt-uk-property-rates-reporting | REWRITE | self — rewrite in place |
| Residual (intra-cluster sibling) | non-resident-cgt-selling-uk-property-overseas-guide | Adjacent — kept for future batch | Distinct angle: this brief covers RATES + 60-DAY + REGIME MECHANICS; the sibling covers SELLING-FROM-OVERSEAS practical-process (cross-border conveyancing, currency conversion, repatriation timing). Future-batch boundary: this page is the "regime" page; sibling is the "selling-from-overseas-as-a-process" page. Forward-link reciprocal at execution. |
| Wave 1 SDLT | non-resident-2-percent-sdlt-surcharge (or similar Wave 1 NR-SDLT slug — verify at execution) | Adjacent (SDLT side) | No collision (different tax). Forward-link from the "what other UK taxes apply to a non-resident landlord" sidebar. |
| Wave 2 expat (entire bucket — 10 slugs on SRT / s.10A / domicile reform / FIG regime / etc) | Various | Adjacent | No collision (Wave 2 covers expat-landlord context comprehensively). Forward-links from this brief's new SRT + s.10A sections to the specific Wave 2 pillar pages on each mechanism. Reciprocal back-link from Wave 2 SRT page to this brief's NRCGT-specific application. |
| Excluded (rewritten 2026-05-21) | capital-gains-tax-property-complete-guide-uk | CGT pillar (Session C #47) | No collision — pillar covers comprehensive policy. This brief references the pillar and forward-links. |
| Excluded (rewritten 2026-05-21) | cgt-payment-deadlines-property-sales-2026 | 60-day deadlines canonical (Session C #23; **F-13 back-patched 2026-05-24**) | No collision in subject matter (canonical covers UK-resident 60-day; this brief covers non-resident 60-day with the every-disposal asymmetry). Forward-link from this brief's 60-day section. Reciprocal back-link from canonical to this brief for the non-resident asymmetry. |
| Excluded (rewritten 2026-05-21) | cgt-rates-property-2026-27-current-rates-explained | Rates explainer (trial gold reference) | No collision — that page is the rates-explainer for UK residents; this brief is the rates-explainer for non-residents (with the additional every-disposal-reporting overlay + non-resident-company section). Forward-link from rates table at top. |
| Wave 4 (LtdCo + FIC bucket) | Various | No collision | Forward-link from non-resident-company-gains section to any LtdCo / corporate-structures Wave 4 page that explains UK-resident company gains, for contrast. |
| Wave 6 (LtdCo extraction + Trusts + CAA — SHIPPED 2026-05-24) | None directly relevant | No collision | Wave 6 buckets are LtdCo extraction sequence, Trusts/GROB, CAA 2001. None overlaps NRCGT. |
| Batch 1 Sub-bucket B canonical | cgt-payment-deadlines-property-sales-2026 | Cluster-collapse target for 60-day cluster | This brief is a near-neighbour to the cluster-collapse target; differentiation rule: this brief covers the NON-RESIDENT 60-day asymmetry. The canonical covers the UK-resident 60-day rule. Cross-link required at execution. |
| Batch 1 Sub-bucket C (B1-C1 / B1-C2 / B1-C3) | All REWRITE | No collision | Sub-bucket C of Batch 1 was scenarios (divorce, inherited, spouse). This brief is a scenario-adjacent applied-mechanic page (non-resident landlord). Forward-link from "spouse who is non-resident" sidebar in B1-C3 to this brief; reciprocal back-link. |
| Batch 2 Sub-bucket A (B2-A1 / B2-A2 / B2-A3) | All REDIRECT-PROPOSED to 60-day canonical | No collision | Sub-bucket A continues cluster collapse to canonical; this brief is the non-resident parallel which the canonical itself should forward-link to. |
| Batch 2 Sub-bucket B (B2-B1 / B2-B2 / B2-B3) | All REWRITE (PRR / Rollover / Lettings) | No collision (reliefs cluster) | B2-B1 PRR rewrite should forward-link to this brief for "what happens to PRR for non-resident landlord disposing of UK home post-emigration" — likely a 1-paragraph mention in B2-B1 that defers to this brief for depth. |
| Batch 2 Sub-bucket C intra (B2-C2 + B2-C3) | REWRITE | No collision | B2-C2 (PRR election single-owner-2-properties) and B2-C3 (commercial vs residential CGT) are subject-distinct. B2-C3 has rate-table overlap (18%/24% applies to both residential AND non-residential per §5 LOCKED) — cross-link from this brief's rate-table to B2-C3 for the residential-vs-commercial rate framing. |
| Wave 7 in-prep | RRA + HMRC enquiry + trust depth | No collision | Wave 7 bucket-mix is RRA-compliance + HMRC enquiry ops + trust-depth continuation; ZERO NRCGT collision risk. Wave 7 manager confirmed no CGT cluster work in pre-flight. |

**Conclusion:** REWRITE in place. No REDIRECT-PROPOSED. No FLAG-MANAGER. Clean cluster positioning — the page is the only on-site source for the NRCGT regime mechanics; the rewrite makes it the authoritative reference rather than the (currently misleading) 2018-vintage explainer it has been.

---

## Closest existing pages (Stage 2)

Internal-link partners (to and from this page after rewrite):

- **Residual sibling** `non-resident-cgt-selling-uk-property-overseas-guide` — bidirectional with explicit boundary line (this brief = regime mechanics; sibling = selling-from-overseas practical process)
- **Trial gold reference** `cgt-rates-property-2026-27-current-rates-explained` — forward-link from rates table at top (the UK-resident rate explainer; the rate is the same 18%/24%, the asymmetry is the every-disposal-reporting rule)
- **CGT pillar (rewritten 2026-05-21)** `capital-gains-tax-property-complete-guide-uk` — back-link target; reciprocal forward-link
- **60-day deadlines canonical (rewritten 2026-05-21)** `cgt-payment-deadlines-property-sales-2026` — forward-link from this brief's 60-day section; reciprocal back-link from canonical to this brief for the non-resident asymmetry
- **B2-C3 (Batch 2 sibling, in-progress)** `cgt-commercial-property-different-residential` — forward-link from rate-table for the residential-vs-commercial framing
- **B2-B1 (Batch 2 sibling, in-progress)** `principal-private-residence-relief-landlords` — forward-link from "PRR for non-resident landlord disposing of former UK main residence" sidebar
- **Wave 2 SRT pillar** (verify exact slug at execution from `wave2_page_tracker.md`) — forward-link from new SRT section; reciprocal back-link
- **Wave 2 s.10A temporary non-residence page** (verify exact slug at execution) — forward-link from new s.10A trap section; reciprocal back-link
- **Wave 2 FIG regime / domicile reform page** (verify exact slug at execution) — forward-link from non-resident-spouse / long-term-resident sidebar
- **Wave 2 NRL scheme page** (verify exact slug at execution) — forward-link from NRL-boundary explanation
- **Wave 1 SDLT non-resident surcharge page** (verify exact slug at execution from `track1_page_tracker.md`) — forward-link from "what other UK taxes apply to a non-resident landlord" sidebar
- **Wave 4 LtdCo / FIC pages** — forward-link from non-resident-company section for the UK-resident-company contrast
- **Wave 2 / Wave 4 ATED pages** — forward-link from non-resident-company section explaining ATED-related CGT was repealed April 2019

---

## House-position references (Stage 1)

- **§5 CGT on UK residential property (2026/27)** [LOCKED — verified gov.uk + legislation.gov.uk s.1H 2026-05-24]: 18% basic / 24% higher; £3,000 AEA; trustees/PRs 24% throughout. Non-residential / commercial gains aligned to same 18%/24% from 30 October 2024 (critical for the rate-table — there is no longer a separate "non-residential rate" band).
- **§7 April 2027 property income tax surcharge** [LOCKED — but **the surcharge is on property INCOME, not on CGT**. Does NOT affect this brief.] Confirm at execution that no part of the rewrite drifts into an unhedged 22/42/47 assertion (none expected — this is a CGT page).
- **§13 do-not-write list** [LOCKED]: no em-dashes anywhere; no real client names; no pricing; no specific firm names.
- **§17 Leaving the UK / expat (Wave 2 extension)** [LOCKED 2026-05-22]: full anchor for this brief. Specifically:
  - **§17.1 SRT** — anchor for the residence-determination section
  - **§17.2 Split-year treatment** — relevant for mid-year emigrant disposals
  - **§17.3 s.10A temporary non-residence** — new section in this brief; cite verbatim
  - **§17.4 NRCGT** — the PRIMARY anchor for this brief. Every claim about the post-FA-2019 regime + the 60-day every-disposal rule + the 18%/24% rates flows from §17.4 LOCKED.
  - **§17.5 NRL scheme** — brief boundary section
  - **§17.6 Domicile reform + FIG regime (April 2025+)** — sidebar mention; non-resident spouse exposure
  - **§17.7 Section 21 expat compliance** — adjacent (rental-income side; this brief is the CGT-side)
- **§18 ATED (Wave 3 extension)** [LOCKED 2026-05-22]: ATED-related CGT abolished from April 2019; the non-resident-company section must explicitly correct the source page's "ATED creates higher CGT rates" framing.
- **§2 ATED headline** [LOCKED]: anchor for the >£500k non-natural-person dwelling threshold.

---

## House-position conflict flag (Stage 2)

**Confirmed conflict — F-21 (NEW) — multiple source-page substantive errors against §17.4 + §18 + §5.**

The source page contains three substantive house-position contradictions:
1. **§17.4 LOCKED**: source page asserts "non-residents must report ... where tax is due" via the 60-day rule — §17.4 LOCKED says non-residents file for EVERY UK land disposal regardless of tax due (rebasing applied at 5 April 2015 residential / 5 April 2019 non-residential).
2. **§18 LOCKED + §2 LOCKED**: source page asserts ATED-related higher CGT rates for >£500k non-resident-company properties — §18 LOCKED says ATED-related CGT was repealed from April 2019; all non-resident company gains now fall within ordinary CT non-resident company gains regime (via CTA 2009 s.2(2A) inserted by FA 2019 Sch 1).
3. **NEW DRIFT (not in any existing flag)**: source page asserts UK has conveyancer-withholding-from-sale-proceeds for non-resident CGT. There is no such UK statutory withholding regime. The page appears to have imported a US FIRPTA-style mechanism in error. This is a high-stakes reader-misleading claim (reader may not file the 60-day return believing solicitor will handle it) — flag for site-wide audit of any other page that may carry similar false withholding claims.

Flag to `track2_site_wide_flags.md` as **F-25 | 2026-05-24 PM | HIGH | non-resident-cgt-uk-property-rates-reporting | STALE_FIGURES + HOUSE_POSITION_CONFLICT + READER_MISLEADING_FACTUAL | Source page contains: (a) wrong 60-day framing presented as same-as-residents (§17.4 LOCKED contradiction — non-residents file for every disposal regardless of tax due); (b) wrong ATED-related higher CGT rates for non-resident companies (§18 LOCKED contradiction — ATED-related CGT repealed April 2019); (c) FALSE conveyancer-withholding-from-sale-proceeds claim (UK has no FIRPTA-style mandatory withholding regime; the only obligation is the seller's own 60-day return). The conveyancer-withholding claim is high-stakes reader-misleading: reader may not file the 60-day return believing solicitor handles it. Recommend site-wide audit of any other residual page that may propagate similar false withholding claims — particularly any page covering "non-resident landlord sale process" or "what does a conveyancer do".**

Also raising **F-26 (LOW) — cross-residual cluster audit recommendation**. Pattern hypothesis: any residual NRCGT-adjacent page authored pre-2019 likely carries similar 30-day-not-60-day framing AND/OR similar pre-FA-2019 statutory architecture references (s.14B-14H). Recommend Phase 2 cluster pass over residual NRCGT cluster (the sibling `non-resident-cgt-selling-uk-property-overseas-guide` + any other non-resident-landlord pages) to catch and correct site-wide.

---

## Authority links worth considering (Stage 2 — partial WebFetch verification done)

| URL | Verification status | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/1992/12/section/1A | Verify content at execution (not in this fetch budget but per F-8 discipline — URL liveness ≠ content correctness; verify substituted-section wording per §16.36 statutory-citation cross-check gate) | Statutory anchor for the post-FA-2019 non-resident CGT charge |
| https://www.legislation.gov.uk/ukpga/2019/1/schedule/2 | 200 OK + content verified 2026-05-23 by Batch 1 Sub-bucket B (F-13 verification — para 3 sets 60-day reporting and payment, extended from 30 to 60 days by FA 2022) | Statutory anchor for the 60-day return obligation |
| https://www.legislation.gov.uk/ukpga/1992/12/section/1H | 200 OK + content verified 2026-05-24 — confirms 18%/24% rates apply uniformly to all chargeable gains for individuals (no separate non-residential rate) | Rate statute anchor |
| https://www.gov.uk/guidance/capital-gains-tax-for-non-residents-uk-residential-property | 200 OK + content verified 2026-05-24 — verbatim every-disposal rule: "you must report disposals of UK property or land even if you: have no tax to pay on the disposal; have made a loss on the disposal" | Consumer-side authority for the every-disposal asymmetry; load-bearing cite for the rewrite |
| https://www.gov.uk/capital-gains-tax/rates | 200 OK + content verified 2026-05-24 — unified 18%/24% rate (no residential-vs-commercial split) | Rate authority |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg73700 | 200 OK + content verified 2026-05-24 — intro page for FA 2015 NRCGT regime; cross-refs CG73920 for post-FA-2019 expansion | HMRC manual anchor for the regime's temporal narrative |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg73920 | Verify at execution — referenced by CG73700 as the post-FA-2019 expansion page | HMRC manual anchor for post-FA-2019 indirect disposals + non-residential extension |
| https://www.legislation.gov.uk/ukpga/2019/1/schedule/1 | Verify at execution (likely landing on Schedule 1 to FA 2019) | The FA 2019 schedule that inserted the new NRCGT architecture into TCGA 1992 (rewriting the old ss.14B-14H regime); load-bearing for the "architecture rewrite" framing |
| CTA 2009 s.2(2A) — `https://www.legislation.gov.uk/ukpga/2009/4/section/2` | Verify at execution | Statutory anchor for the non-resident-company gains charge under CT (replacing pre-FA-2019 ATED-related CGT) |
| FA 2013 Sch 45 (SRT) — `https://www.legislation.gov.uk/ukpga/2013/29/schedule/45` | Verify at execution | SRT cascade anchor — cross-references Wave 2 §17.1 |
| TCGA 1992 s.10A — `https://www.legislation.gov.uk/ukpga/1992/12/section/10A` | Verify at execution | Temporary non-residence 5-year recapture trap; cross-references Wave 2 §17.3 |

**(Execution session selects 6-8 to actually cite in body. Load-bearing 4: s.1A TCGA + FA 2019 Sch 2 + gov.uk consumer guide + s.1H TCGA. Architecture 2: FA 2019 Sch 1 + CG73700+CG73920. Cross-link 2: CTA 2009 s.2(2A) + FA 2013 Sch 45.)**

---

## Universal rules — inherited from parent program (do not restate)

Per `TRACK2_PROGRAM.md §4 section 13`: voice rules + lead-gen architecture + CSS-in-markdown + FAQs and schema + anti-templating + quality bar + statute citation discipline (F-8 lesson) + all §16 lessons (especially §16.18 reasoning-first, §16.31 URL liveness, §16.35 per-write rate verification, §16.36 + §16.40 statutory cross-check, §16.42 EXISTING_PAGE_STALE density). The execution session reads `NETNEW_PROGRAM.md §4` + `docs/competitor_rewrite_playbook.md §5` once at session start.

**Brief-specific reminders within those universals:**
- The 18%/24% rate is the §16.35 type of figure that needs gov.uk verification at write time (verified live 2026-05-24 but re-verify at execution).
- The "FA 2019 rewrote ss.14B-14H into s.1A + Schs 1A/1B/4AA" finding is the §16.40 type of finding that the brief surfaces but the writer also independently verifies — the substituted-section wording must be checked, not just URL liveness.
- The 3 factual errors in the source page (conveyancer-withholding, 60-day-same-as-residents, ATED-related-higher-CGT-rates) are non-negotiable removals; the writer should not accidentally retain them by paraphrase.
- Per §16.42 EXISTING_PAGE_STALE density: this is exactly the page-class flagged in launch prompt — NRCGT page surfacing site-wide pre-FA-2024 28% rate carryovers on adjacent non-resident pages. The cross-residual cluster audit in F-22 captures this expectation.

---

## 19-step workflow — inherited from parent program (Wave 5) with Track 2 deltas

Per `TRACK2_PROGRAM.md §4 section 14`: inherits the full Wave 5 19-step workflow from `NETNEW_PROGRAM.md §7`. Track 2 deltas: step 9 rewrites at existing path; step 12 may propose REDIRECT (this brief proposes REWRITE so step 12 is "no redirect required, slug preserved"); step 13 updates existing `monitored_pages` row OR inserts new if not yet tracked.

**Brief-specific call-outs within those workflow steps:**
- **Step 4 (pre-rewrite verification):** re-WebFetch s.1A TCGA + FA 2019 Sch 2 + gov.uk consumer guide + s.1H TCGA at execution to confirm no statute change between brief date (2026-05-24) and execution date. Re-WebFetch the 3-5 fetch-blocked competitor URLs with a browser User-Agent (per F-12 lesson) before quote-citing.
- **Step 9 (rewrite):** preserve frontmatter `slug` + `canonical`. Add `dateModified` + `reviewedBy` + `reviewerCredentials` + `reviewedAt`. Bump `date` to actual write date (substantive rewrite).
- **Step 11 (six checks):** explicit check for the 3 factual errors — none must survive paraphrase. Also: em-dash count = 0; FAQ schema count = `faqs:` array length; meta description ≤158 chars; all internal links resolve.
- **Step 13 (monitored_pages):** this slug is likely NOT yet in `monitored_pages` (the table seeds from the 2026-05-21 rewrite pass + Wave-N net-new). Insert new row with `rewrite_date = today`, `monitoring_window_days = 180` (longer than standard 90-day given INVISIBLE-page start per F-11 recommendation), `expected_lift = "DEPTH-fix + stale-figures correction + reader-misleading-error excision; expect first 90-180-day GSC visibility lift from current sub-threshold position; engagement-rate target shift from 0% to ≥30%"`.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §5 CGT 2026/27 (18%/24% + £3k AEA, trustees/PRs 24%, non-residential aligned to same 18%/24% from 30 Oct 2024): __
- §13 do-not-write (no em-dashes, no pricing, no firm names): __
- §17.1 SRT cascade — verified at write time: __
- §17.3 s.10A temporary non-residence 5-year recapture: __
- §17.4 NRCGT post-FA-2019 architecture (s.1A + Schs 1A/1B/4AA): __
- §17.4 every-disposal-regardless-of-tax-due rule cited verbatim from gov.uk: __
- §17.5 NRL scheme boundary explanation: __
- §17.6 long-term-resident regime sidebar (April 2025+): __
- §18 ATED-related CGT repealed April 2019 — corrected in non-resident-company section: __

### Comparison: before vs after
- Word count: ~1,500 → __
- H2 count: 9 (+ multiple H3) → __
- FAQ count: 4 → __
- Authority links: 0 → __ (6-8 expected)
- Inline CTAs: 0 → __
- Worked examples: 2 → __ (5 expected)
- Rates table at top: 0 → __ (1 expected — 4-row table covering residential + non-residential + non-resident-company + 60-day-every-disposal)
- Frontmatter `dateModified`: absent → __
- Frontmatter `reviewedBy` / `reviewerCredentials` / `reviewedAt`: absent → __

### Factual-error removal verification
- Error 1 (conveyancer-withholding-from-sale-proceeds, FAQ #4 + body lines 77-81): __ REMOVED / NOT FOUND
- Error 2 (60-day rule presented as same-as-residents, body lines 65-75): __ REMOVED / NOT FOUND
- Error 3 (non-resident-company 19%/25% split via small-profits-rate, body lines 83-87): __ REMOVED / NOT FOUND
- Error 4 (ATED creates "higher CGT rates" for >£500k properties, body line 86): __ REMOVED / NOT FOUND

### Statute-cite verification at write time (per §16.35 + §16.36)
- s.1A TCGA + Schs 1A/1B/4AA architecture — verified at write time: __ DATE / source URL
- FA 2019 Sch 1 (the rewriting Schedule) — verified at write time: __ DATE / source URL
- FA 2019 Sch 2 para 3 (60-day return obligation, extended from 30 to 60 by FA 2022) — verified at write time: __ DATE / source URL
- s.1H TCGA (18%/24% unified rate) — verified at write time: __ DATE / source URL
- CTA 2009 s.2(2A) (non-resident company chargeable gains in CT) — verified at write time: __ DATE / source URL
- gov.uk every-disposal verbatim quote — verified at write time: __ DATE / source URL

### Cross-link verification at write time
- Wave 2 SRT pillar: forward-link added + reciprocal back-link: __
- Wave 2 s.10A page: forward-link added + reciprocal: __
- Wave 2 NRL scheme page: forward-link added + reciprocal: __
- Wave 1 SDLT non-resident page: forward-link added: __
- CGT pillar: forward-link added + reciprocal: __
- 60-day deadlines canonical: forward-link added + reciprocal: __
- Residual sibling `non-resident-cgt-selling-uk-property-overseas-guide`: forward-link added with explicit boundary line: __
- Trial gold reference `cgt-rates-property-2026-27-current-rates-explained`: forward-link added: __
- B2-C3 commercial-vs-residential: forward-link added: __
- B2-B1 PRR for landlords: forward-link added + reciprocal: __

### Flags raised at execution
- F-25 (carried from brief): conveyancer-withholding-from-sale-proceeds FALSE claim removed: __ confirmed at write
- F-26 (carried from brief): cross-residual cluster audit recommendation — surface to Phase 2 manager: __
- Any new flags surfaced: __

### 2-3 sentence summary
- (populated at execution time)
