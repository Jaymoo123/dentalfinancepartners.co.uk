# Bing experiments dossier: property, 2026-08-18

Three isolated single-variable experiments per REWRITE_PROGRAM.md §9.12 (a lever drives
batch work only after two independent corroborations OR an isolated monitored experiment).
Selection frozen 2026-08-18 from same-day pulls (Bing GetPageQueryStats weekly rows summed;
GSC 28d dataState=all; monitored_pages; web_sessions lead attribution).

## Selection rules (frozen)
- Blog posts only, with live Bing data.
- EXCLUDED: 452 active monitored_pages slugs (one-change-per-window), 57 lead-generating
  entry pages since 2026-05-20 (money-page protection), pages with >=5 Google clicks/28d.
- Treatment/control assigned alternately by Bing impression rank (matched pairs).
- Measurement: weekly Bing page-query rows at 14d and 28d, Google at 28/90d, against
  each arm's own baseline. Register in monitored_pages + blog_optimizations AT DEPLOY.

## Experiment 1: CTR repair, meta only, 1 page
Page: /calculators/lbtt-calculator-scotland (registry: src/lib/calculators/tools/lbtt-calculator.ts)
Baseline: Bing 2,571 impr / 21 clicks / wpos 7.5 (90d floor); band CTR 1.5%; page CTR 0.82%.
Google 28d: 38 impr / 0 clicks. Leads: 0. NOT a Google money page; Google blast radius nil.
Change: metaTitle + metaDescription only. Must retain tokens: LBTT, calculator, Scotland, ADS.
Success: 28d Bing CTR >= 1.5% at unchanged position. Failure trigger: wpos > 9.5 at 28d = revert.

## Experiment 2: one comparison table, 5 treatment + 5 control
Hypothesis: tables improve Bing position (rho -0.30 property 2026-08-18, second derivation of
the 2026-08-16 direction; correlational, hence this experiment).
Expectation written before work: treatment mean wpos improves vs control at 28d; movement
under 1 position or matched by control = null. n=5/arm detects only large effects; stated.
Failure trigger per page: Bing clicks < 50% of own 90d baseline rate over the 28d window = revert.

| Arm | Slug | Bing impr/clk @wpos | Google 28d | Leads |
|---|---|---|---|---|
| T | a-complete-guide-on-community-infrastructure-levy-cil | 1105/21 @6.39 | 313i/4c | 0 |
| T | cgt-annual-exempt-amount-3000-allowance-2026-27 | 366/4 @6.07 | 39i/0c | 0 |
| T | directors-loan-accountsdla-uk-guide | 228/14 @6.48 | 0i/0c | 0 |
| T | how-owning-property-abroad-leads-higher-stamp-duty-rates | 78/8 @4.23 | 299i/4c | 0 |
| T | a-complete-guide-to-identity-verification-in-uk | 47/0 @7.43 | 54i/0c | 0 |
| C | single-person-council-tax-discount | 560/9 @7.52 | 168i/0c | 0 |
| C | corporation-tax-marginal-relief-uk-guide | 342/8 @6.12 | 199i/0c | 0 |
| C | substantial-shareholding-exemption-sse | 106/0 @7.37 | 189i/0c | 0 |
| C | applicable-sdlt-rates-for-first-time-buyers | 67/1 @6.58 | 11i/0c | 0 |
| C | renters-rights-act-rent-increase-section-13-tribunal-route | 31/1 @5.77 | 0i/0c | 0 |

## Experiment 3: conversational coverage, 14 treatment + 14 control
Hypothesis: answering a page's own Bing-only question queries in a dedicated H2/FAQ block
acquires new conversational queries (the layer carrying 95%+ of Bing impressions).
Expectation: treatment pages acquire more NEW Bing queries (not in baseline set) and more
impressions on the targeted questions than control at 28d. Success threshold: >=1 targeted
question gains an impression on >=7 of 14 treatment pages.
Failure trigger per page: same click-halving rule as experiment 2.

| Arm | Slug | Bing impr/clk @wpos | Google 28d | Leads |
|---|---|---|---|---|
| T | spv-property-investment-special-purpose-vehicle-guide | 423/24 @5.96 | 57i/2c | 0 |
| T | section-24-self-assessment-tax-return | 220/25 @4.45 | 19i/1c | 0 |
| T | furnished-holiday-let-tax-rules-exemptions | 232/12 @6.29 | 496i/4c | 0 |
| T | writing-down-allowance-cars | 276/17 @5.65 | 81i/1c | 0 |
| T | income-tax-rates-landlords-2026-27-complete-guide | 123/18 @3.95 | 7i/0c | 0 |
| T | property-investment-benchmarks-uk-2026-good-yield | 72/5 @5.21 | 14i/0c | 0 |
| T | capital-allowances-examples | 32/2 @6.22 | 0i/0c | 0 |
| T | rent-a-room-relief-uk-landlords-lodgers-guide | 18/0 @7.61 | 138i/0c | 0 |
| T | rental-yield-calculator-guide-uk-landlords | 16/1 @8.0 | 0i/0c | 0 |
| T | a-complete-guide-to-periodic-tenancy | 15/0 @6.0 | 0i/0c | 0 |
| T | residential-property-developer-tax-uk | 8/0 @5.25 | 16i/0c | 0 |
| T | anti-avoidance-rules-share-exchanges-and-reorganisations | 7/0 @4.71 | 0i/0c | 0 |
| T | schedule-24-fa-2007-careless-deliberate-penalty-mitigation-landlords | 29/0 @8.17 | 51i/0c | 0 |
| T | multiple-dwellings-relief | 14/0 @6.14 | 7i/0c | 0 |
| C | cgt-rates-property-2026-27-current-rates-explained | 655/29 @6.23 | 0i/0c | 0 |
| C | landlord-tax-return-complete-guide-2026 | 719/9 @6.85 | 3i/0c | 0 |
| C | booking-com-a-complete-guide-for-the-hosts | 165/17 @4.95 | 152i/1c | 0 |
| C | writing-down-allowance-rates | 238/14 @5.92 | 37i/1c | 0 |
| C | types-of-property-company-structure-uk-guide | 79/6 @4.61 | 0i/0c | 0 |
| C | how-to-calculate-net-rental-income-after-all-costs-uk-guide | 33/0 @4.55 | 87i/2c | 0 |
| C | government-to-end-council-tax-on-hmo-rooms | 24/1 @5.83 | 35i/1c | 0 |
| C | btl-mortgage | 14/4 @3.71 | 0i/0c | 0 |
| C | ated-rates | 56/0 @5.82 | 16i/1c | 0 |
| C | abolition-of-furnished-holiday-lettings-fhl-what-individual-owners-needs-to-know | 22/3 @7.23 | 0i/0c | 0 |
| C | annual-investment-allowance-uk | 25/0 @5.68 | 17i/0c | 0 |
| C | how-much-tax-rental-income-uk-complete-guide | 23/0 @6.35 | 86i/0c | 0 |
| C | badges-of-trade-marson-morton-property-flipping-investment-distinction-landlords | 11/3 @4.36 | 22i/0c | 0 |
| C | vat-on-furnished-holiday-lettings-fhl | 5/0 @6.0 | 24i/0c | 0 |

## Money-page statement (asked 2026-08-18)
No treatment page is a Google money page: every one has <5 Google clicks/28d and 0 attributed
leads/90d. The actual money pages (homepage 38 leads, how-to-transfer-property-into-limited-
company-uk 10, about 9, contact 7, capital-gains-tax-property-complete-guide-uk 3) are all
excluded, most doubly so as active monitored pages.

## Status
- DEPLOYED 2026-08-18 (owner-triggered), dpl_4c5BJeZLCA1DFWpDJjonTKmnAiQ7, live verified.
- All 20 treatment pages armed in monitored_pages (11 inserted, 9 re-baselined in place),
  watch to 2026-11-16. 20 URLs to IndexNow (HTTP 200). Reads: Bing 14d ~09-01, 28d ~09-15.
- Control pages are never edited.
## QA record (2026-08-18)

Two Opus tracks ran over the treatment diffs. Factual: 4 must-fix + 6 minor defects,
all inside inserted blocks, all corrected in a single fix pass before commit.
Editorial: correctness clean; batch sameness (heading template, count-announcement
scaffold, FAQ duplication) corrected in the same pass. Deterministic gates green:
link audit 0/0, tsc, vitest 1166 (goldens 72/72), prod build, dependency closure,
insert-only equity proof (numstat 0 deletions vs HEAD per content file).

## Delta list: legacy defects FOUND during QA, deliberately NOT fixed in this batch
(each sits in protected pre-existing prose or on an actively monitored page; fix in a
separate corrective pass so experiment attribution stays clean)

1. rent-a-room-relief-uk-landlords-lodgers-guide.md: page-wide HMRC Method A/Method B
   inversion (lines ~26, 122-134, 151) and inverted default/election framing. The new
   section avoids the labels; the old prose still has them backwards vs HS223.
2. furnished-holiday-let-tax-rules-exemptions.md: metaDescription/summary/FAQ cite
   "Finance (No. 2) Act 2024" for FHL abolition; house_positions §25.7/§25.8 says FA 2025
   Sch 5. Back-patch needed.
3. residential-property-developer-tax-uk.md line ~121: "zero-rating recovers roughly
   £30,000" on £250,000 of construction cost deserves a re-derivation check.
4. multiple-dwellings-relief-abolition-fa-2024-transitional-rules-landlords.md line ~34:
   "Scotland has never had a Multiple Dwellings Relief equivalent" contradicts house
   §23.6 (MDR retained in Scotland, LBTT(S)A 2013 Sch 5). PAGE IS ACTIVELY MONITORED
   (confirmed in monitored_pages, watch to 2026-11-03) so schedule the fix with its
   watch in mind.
5. income-tax-rates-landlords-2026-27-complete-guide.md lines ~113-116: Scottish band
   table omits the Advanced rate band; shows 47 top rate.
6. schedule-24 page: FAQ line ~21 vs body line ~87 disagree on para 14(6) trigger
   (further para 1 penalty vs further careless); body is the narrow one.
## Post-deploy note (2026-08-18, CI)

The content push turned the CI Content Quality Check red: two treatment posts
(a-complete-guide-to-periodic-tenancy, furnished-holiday-let-tax-rules-exemptions)
carried pre-existing 62-char metaTitles that the validator waives only for
unchanged files; touching their bodies promoted the warnings to errors. Fixed by
trimming both metaTitles to 58/57 chars in the repo. NOT redeployed for this alone:
production still serves the old titles, so the live experiment snippet is unchanged;
the trims ride the next deploy, at which point those 2 of 14 exp3 pages carry a
minor meta covariate. Treat accordingly at the 28d read. One red CI run
(32151136828) emailed the owner; the rerun after the fix should be green.
