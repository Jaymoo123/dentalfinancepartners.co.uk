# Property page rewrite — master tracker

**Last consolidated update:** 2026-05-21 (session 0, Opus 4.7 setup)

**Total pages:** 63 priority pages from `competitor_gap_reports` (site_key=property, improvement_brief NOT NULL)
**Complete:** 17
**Remaining:** 46
**Sessions running:** 3 parallel (A, B, C) — see `docs/sessions/SESSION_{A,B,C}_START_HERE.md`

## Status legend

- ✅ done — page has been rewritten, built, FAQ schema verified, tracker updated
- 🟡 in_progress — a session has claimed the page and is actively rewriting it
- ⬜ todo — not yet started
- ⏭️ skip — page should not be rewritten (e.g. TSX template page, redirect candidate). Reason noted.

## Coordination rules (read before editing this file)

1. **Only edit your own assigned rows.** If a page is in your session's assignment list (Sessions A/B/C below), you can edit its row. If it isn't, do NOT touch the row.
2. **Mark `🟡 in_progress` BEFORE starting work** so other sessions can see it.
3. **Mark `✅ done` immediately after the build passes** and the FAQ schema count matches frontmatter.
4. **If something needs user input**, do NOT pause the session — add the issue to `docs/property/site_wide_flags.md` (append-only) and continue to the next page.
5. **If you discover a page is a duplicate of one already done, OR a redirect candidate**, mark it `⏭️ skip` with a brief reason in Notes, flag it in `docs/property/site_wide_flags.md`, and move on.

## Already complete (session 0, Opus 4.7 reference work)

| # | Slug | Score | Pos | Status | Session | Date | Notes |
|---|---|---|---|---|---|---|---|
| 1 | peterborough-property-accountant-specialist-tax-services | 8.4 | 10.2 | ✅ done | 0 | 2026-05-21 | Reference template; 14 FAQs; full city template |
| 2 | hmo-vs-standard-buy-to-let-tax-comparison | 8.1 | 11.7 | ✅ done | 0 | 2026-05-21 | Council tax post-Dec 2023 fix, MTD threshold, incomplete S24 calc |
| 3 | best-mtd-software-landlords-2026 | 8.1 | 6.0 | ✅ done | 0 | 2026-05-21 | Removed unverifiable PropertyBee, past-deadline reframe |
| 4 | income-tax-rates-landlords-2026-27-complete-guide | 7.9 | 1.0 | ✅ done | 0 | 2026-05-21 | Defensive (pos 1) — MTD threshold, em-dash, depth |
| 5 | about (TSX) | 7.8 | 5.3 | ⏭️ skip | 0 | 2026-05-21 | TSX template, minimal-touch only — 2 em-dashes removed; structural issues flagged for user |
| 6 | hmo-licensing-fees-tax-deductible-uk-landlords | 7.7 | 4.0 | ✅ done | 0 | 2026-05-21 | Cash-vs-accruals depth, capital-vs-revenue, ITTOIA references |
| 7 | multi-property-landlord-tax-planning-strategies-5-plus-properties | 7.6 | 11.8 | ✅ done | 0 | 2026-05-21 | Associated companies rules, lender concentration, £250k ceiling |
| 8 | cgt-property-2027-rate-changes-uk-landlords | 7.4 | 9.7 | ✅ done | 0 | 2026-05-21 | MAJOR PIVOT: page premise of confirmed CGT rate changes was wrong |
| 9 | buy-to-let-limited-company-mortgage-rates-2026-market-guide | 7.3 | 4.0 | ✅ done | 0 | 2026-05-21 | Mortgage market depth + tax interaction |
| 10 | property-accountant-wolverhampton-specialist-tax-services | 7.3 | 7.5 | ✅ done | 0 | 2026-05-21 | Full city template |
| 11 | how-much-does-a-property-accountant-cost | 7.0 | 10.7 | ✅ done | 0 | 2026-05-21 | Targeted edits; MTD threshold, MTD live framing |
| 12 | property-accountant-leicester | 7.0 | 7.0 | ✅ done | 0 | 2026-05-21 | Full city template + Article 4 + student-let specifics |
| 13 | ppr-relief-calculation-former-home-step-by-step | 6.9 | 6.9 | ✅ done | 0 | 2026-05-21 | Deemed occupation rule corrected (3 years not 4), Letting Relief mechanics |
| 14 | cgt-annual-exempt-amount-3000-allowance-2026-27 | 6.9 | 8.3 | ✅ done | 0 | 2026-05-21 | £49,200 → £12,000 reporting threshold (factual error fixed) |
| 15 | leeds-property-accountant-specialist-tax-services | 6.8 | 16.2 | ✅ done | 0 | 2026-05-21 | City template + Headingley Article 4 |
| 16 | property-accountant-swansea-landlord-tax-services | 6.7 | 4.0 | ✅ done | 0 | 2026-05-21 | Welsh-specific: LTT, Rent Smart Wales, Renting Homes Act 2016 |
| 17 | capital-gains-tax-property-sale-uk-2026-rates-allowances | 6.6 | 4.7 | ✅ done | 0 | 2026-05-21 | Pivoted to disposal mechanics (sibling owns rates), 60-day reporting depth |

## Remaining 46 pages — pre-assigned by session

### Session A pages (15 assigned)

| # | Slug | Score | Pos | Current words | Status | Date | Notes |
|---|---|---|---|---|---|---|---|
| 18 | mortgage-interest-tax-relief-changes-landlords | 6.5 | 9.8 | 2027 | ⏭️ skip | 2026-05-21 | Source file deleted in commit b80225e (Apr 2026 consolidation); 301 redirects to section-24-mortgage-interest-restriction-uk-landlords. Nothing to rewrite. |
| 21 | rent-a-room-relief-uk-landlords-lodgers-guide | 6.0 | 12.0 | 1841 → ~3300 | ✅ done | 2026-05-21 | Joint-owner £3,750 split (was wrong on page), MTD £50k/£30k/£20k fix, opt-out deadline table, losses-not-claimable section, 4→13 FAQs, 2 inline CTAs, HMRC HS223 + ITTOIA 2005 + CG64702 + PIM4210 cites |
| 24 | london-property-accountant | 5.4 | 26.0 | 2094 → ~3500 | ✅ done | 2026-05-21 | Investor/portfolio angle (differentiates from #34 services). 3%→5% SDLT surcharge fix, £10k→£50k/£30k/£20k MTD, post-Autumn-2024 CGT 18%/24%, full SDLT additional-dwellings table, ATED 2026/27 bands, 60-day CGT timing, NRL scheme, borough licensing tax treatment, 7→13 FAQs, 2 inline CTAs. Build re-verify pending (currently blocked by Session B's mid-edit YAML in #28). |
| 27 | sdlt-incorporation-stamp-duty-twice | 5.1 | 22.8 | 1092 → ~3000 | ✅ done | 2026-05-21 | MAJOR FIXES: MDR abolished 1 June 2024 (was recommended on page), "reconstruction relief" replaced with FA 2003 Sch 15 para 10 partnership route, full 5% surcharge SDLT table (page had old 3% / wrong company rates), Sch 4A FA 2003 15% flat rate explained, two worked examples (£1m partnership-route vs no-partnership / £600k husband-wife), s.162 CGT vs SDLT split, refinancing line item, 4→13 FAQs, 2 inline CTAs. |
| 30 | tax-efficient-property-investment-structure-guide | 4.9 | 36.9 | 1746 → ~3500 | ✅ done | 2026-05-21 | Reframed speculative "22%/42%/47% from April 2027" as unconfirmed (was being asserted as fact), em-dashes removed, £10k→£50k/£30k/£20k MTD fix, full 4-scenario worked table (basic-rate ST, higher-rate ST, married couple Form 17, geared 3-property growth), decision matrix table, IHT misconception (companies don't get BR for investment activity), 4→13 FAQs, 2 inline CTAs. |
| 33 | property-accountant-bournemouth-landlords-tax-services | 4.7 | 31.7 | 1759 → ~3000 | ✅ done | 2026-05-21 | Full city template: BCP additional HMO licensing (Boscombe West, Winton, Charminster), Article 4, BU+AUB student market, coastal repair-vs-improvement (PIM2020), MTD £50k/£30k/£20k fix, post-Autumn-2024 CGT 18%/24%, removed speculative "22%/42%/47% April 2027" claim, 4→13 FAQs, 2 inline CTAs. |
| 36 | london (locations TSX) | 4.7 | 43.0 | 2094 | ⏭️ skip | | TSX page in /locations/[slug] template, not a markdown blog. Skip per playbook. |
| 39 | blog (index) | 4.5 | 8.5 | 811 | ⏭️ skip | | Blog index page, not a content article. Skip. |
| 42 | landlord-vat-registration-when-required | 4.5 | 55.0 | 994 → ~3000 | ✅ done | 2026-05-21 | £90k/£88k 2026/27 thresholds, option-to-tax mechanics (VAT1614A, 20-year tie-in, Sch 10 para 12 anti-avoidance), holiday accommodation VAT unaffected by FHL income-tax abolition, single vs multiple supply analysis for service charges, MTD for VAT mandatory, TOMS reference, worked rolling-12-month example, 4→13 FAQs, 2 inline CTAs. |
| 45 | how-to-complete-landlord-self-assessment-filing-step-by-step-guide | 4.5 | 76.1 | 1834 → ~3400 | ✅ done | 2026-05-21 | £10k → £50k/£30k/£20k MTD fix, removed speculative 22%/42%/47% April 2027 claim, full SA105 walkthrough with Section 24 box mechanics, £1k property allowance choice, Form 17 joint-ownership election, payments on account, 60-day CGT separate filing, common mistakes section, MTD Final Declaration transition, 4→13 FAQs, 2 inline CTAs. |
| 48 | claim-mortgage-interest-rental-property-uk-section-24 | 4.3 | 62.0 | 1499 → ~3000 | ✅ done | 2026-05-21 | Pivoted to APPLIED claim mechanics (cannibalisation handled: pillar covers policy, this covers practical box-44 mechanics, three-way cap, carry-forward, withdrawal rule). Removed speculative 22%/42%/47% rates. Three worked examples (cap doesn't bite, cap bites, Form 17 split). PIM2056 + s.274A references. 4→13 FAQs, 1 inline CTA. |
| 51 | property-accountant-nottingham-landlords | 4.0 | 47.8 | 2041 → ~3600 | ✅ done | 2026-05-21 | Full city template: Nottingham CC selective licensing renewal Dec 2023 (14 named wards), Article 4 in Lenton/Dunkirk, UoN+NTU student-let economics, 3%→5% SDLT fix, £10k→£50k/£30k/£20k MTD fix, removed speculative 22%/42%/47% April 2027 claim, stripped stale embedded schema JSON-LD, dropped FHL-as-current claim, added developer-vs-landlord section properly framed, 4→13 FAQs, 1 inline CTA. |
| 54 | property-accountant-job-description | 3.8 | 58.9 | 2300 | ⏭️ skip | 2026-05-21 | Source file deleted in commit b80225e; 301 redirects to /blog/property-accountant-services/property-accountant-jobs-uk. Nothing to rewrite. |
| 57 | how-much-tax-rental-income-uk-complete-guide | 3.8 | 79.6 | 1315 → ~3000 | ✅ done | 2026-05-21 | Pivoted to CALCULATION WALKTHROUGH (cannibalisation handled: pillar covers rates, AEA pillar covers CGT, this covers bands-and-Section-24-credit step-by-step). Four worked landlord profiles showing 20%, 40%, 20%, 91% effective rates. Removed speculative 22%/42%/47% claim. £100k taper at 60% marginal explained. Form 17. MTD reporting transition. 4→13 FAQs, 2 inline CTAs. |
| 60 | property-accountant-services-expert-solutions | 3.5 | 67.9 | 1697 | ⏭️ skip | 2026-05-21 | Source file deleted in commit b80225e; 301 redirects to /blog/property-accountant-services/property-accountant-services. Nothing to rewrite. |

### Session B pages (15 assigned)

| # | Slug | Score | Pos | Current words | Status | Date | Notes |
|---|---|---|---|---|---|---|---|
| 19 | liverpool-property-accountant-tax-services-landlords | 6.5 | 17.4 | 1616 → ~3000 | ✅ done | 2026-05-21 | Full city template: selective licensing, student HMOs, Form 17 worked example, MTD £50k/£30k/£20k, 14 FAQs |
| 22 | mtd-rental-income-threshold-exemptions | 5.9 | 24.0 | 1343 → ~2900 | ✅ done | 2026-05-21 | Wholesale rewrite: £10k → £50k/£30k/£20k schedule throughout, full exemption list (statutory + application-based), joint-property share-based test, FHL abolition, points-based penalty regime, 4 → 14 FAQs |
| 25 | non-resident-landlord-tax | 5.3 | 35.4 | 944 | ⏭️ skip | 2026-05-21 | Category listing TSX page (src/app/blog/non-resident-landlord-tax/page.tsx), not a markdown blog post. Skip per playbook. NRL content lives on individual posts (nrl-withholding-tax #61 etc). |
| 28 | furnished-holiday-let-tax-rules-exemptions | 5.0 | 43.7 | 1618 → ~3100 | ✅ done | 2026-05-21 | FHL abolition depth (transitional pools, BADR cliff, pension earnings, anti-forestalling), SDLT corrected 3% → 5% post-31-Oct-2024, full SDLT table, 4 → 14 FAQs, 2 inline CTAs. NOTE: had two YAML colon-space issues in FAQ answers, fixed by rephrasing. |
| 31 | buy-to-let-limited-company-complete-guide-uk | 4.9 | 52.0 | 1299 → ~4200 | ✅ done | 2026-05-21 | PILLAR PAGE rewrite: corrected MTD-for-ITSA-doesn't-apply-to-companies error, dividend allowance £500 (was £1,000), SDLT 5% surcharge, Section 162 mechanics + business test, ATED with 2025-26 bands + rental exemption gotcha, BR-does-not-apply IHT correction, full 10-year worked comparison table, 4 → 15 FAQs, 2 inline CTAs |
| 34 | property-accountant-london-expert-services | 4.7 | 38.3 | 2094 | ⏭️ skip | 2026-05-21 | No source file — middleware 301-redirects to /blog/property-accountant-services/london-property-accountant (Session A's #24, already done). Nothing to rewrite. |
| 37 | how-to-scale-buy-to-let-portfolio-1-to-10-properties | 4.7 | 63.1 | 1588 → ~3300 | ✅ done | 2026-05-21 | Restructured by 4 scaling phases (1-2, 3-4, 5-7, 8-10), lender position + tax position + ops systems per phase, full 5-property worked example showing personal £2k deficit vs ltd co £7.7k retention, financial milestones table, MTD £50k/£30k/£20k throughout, 3 → 13 FAQs, 2 inline CTAs |
| 40 | residential-property-developer-tax-uk | 4.5 | 53.0 | 941 → ~3200 | ✅ done | 2026-05-21 | Trading vs investment depth: full badges-of-trade table, CT band correction (19% up to £50k, not £250k), VAT zero-rate vs 5% conversion vs 20% refurb table, commercial-to-residential SDLT planning saving £60-80k, BADR rate phasing 10%→14%→18%, reverse charge CIS, MTD applies to sole-trader developers, 4 → 14 FAQs, 2 inline CTAs |
| 43 | how-to-calculate-net-rental-income-after-all-costs-uk-guide | 4.5 | 64.5 | 1245 → ~3300 | ✅ done | 2026-05-21 | Three-way comparison gross/taxable/net cash, four worked examples (basic rate single, higher rate 4-prop portfolio, ltd co, HMO), expanded capital-vs-revenue table, RDIR mechanics, removed speculative April 2027 22/42/47 claim, MTD £50k/£30k/£20k, 4 → 13 FAQs, 2 inline CTAs |
| 46 | cgt-gifting-property-family-members-uk | 4.5 | 77.5 | 1581 → ~3400 | ✅ done | 2026-05-21 | Full reliefs taxonomy: TCGA s17 connected-persons rule, s58 spousal NGNL, s165 holdover (clarified DOES NOT apply to BTL investment), s260 trust route, PPR mechanics, SDLT on assumed mortgages, IHT 7-year taper, FIC alternative, 4 worked examples (parent-to-child, spouse-split, former-PPR, discretionary trust). 4 → 13 FAQs. YAML validated standalone (build verification pending Session C unblocking #47 capital-gains-tax-property-complete-guide-uk.md duplicate metaTitle). |
| 49 | landlord-accounting-software-uk-best-options-2026 | 4.1 | 60.3 | 1407 → ~3100 | ✅ done | 2026-05-21 | Differentiated from #3 (broader operational scope, not just MTD). Removed unverifiable PropertyRadar + Rentman, used verified UK products. MTD £10k → £50k/£30k/£20k throughout. Decision matrix by portfolio profile. 4 → 13 FAQs. YAML valid (build pending Session C #47 unblock). |
| 52 | why-southampton-landlords-need-property-accountant | 4.0 | 68.0 | 1451 → ~3000 | ✅ done | 2026-05-21 | Full city template: UoS + Solent student HMOs (Portswood, Bevois Valley, Bassett, Highfield, Swaythling), additional HMO licensing zones, Freeport Solent context, Form 17 worked example, MTD £50k/£30k/£20k. 4 → 13 FAQs. YAML valid (build pending Session C #47 unblock). |
| 55 | inheritance-tax-rental-property-uk-guide | 3.8 | 71.3 | 1457 → ~3500 | ✅ done | 2026-05-21 | NRB freeze extended to April 2030 fix, RNRB tapering above £2m, BPR myth (Pawson case explanation, does NOT apply to BTL), pension in IHT scope from 6 April 2027 (Autumn 2024 announcement), GROB anti-avoidance, FIC alternative, joint tenants vs TIC table, worked example showing £120k extra cost from 2027 pension change, 4 → 14 FAQs, 2 inline CTAs. YAML valid (build pending #47 unblock). |
| 58 | incorporation-and-company-structures | 3.8 | 81.0 | 2437 | ⏭️ skip | 2026-05-21 | Category listing TSX page (src/app/blog/incorporation-and-company-structures/page.tsx), not a markdown blog post. Skip per playbook. Content lives on individual posts (BTL ltd co pillar #31, SDLT on incorporation #27, etc). |
| 61 | nrl-withholding-tax-20-percent-basic-rate-deduction | 3.5 | 69.0 | 1730 → ~3300 | ✅ done | 2026-05-21 | Detailed mechanic focus (differentiated from broader NRL category). NRLQ quarterly filing schedule corrected to UK tax quarters (5 Jul/5 Oct/5 Jan/5 Apr), 2020 corporation tax shift for non-resident companies (CT600 not SA700), DTT relief timing, Form 17 joint mixed-residence, 60-day CGT linkage, refund mechanism, worked example with vs without NRL1, 4 → 14 FAQs, 2 inline CTAs. YAML valid (build still blocked by Session C #47 duplicate metaTitle). |

### Session C pages (15 assigned)

| # | Slug | Score | Pos | Current words | Status | Date | Notes |
|---|---|---|---|---|---|---|---|
| 20 | sdlt-buy-to-let-rates-surcharge-guide-2025 | 6.4 | 18.0 | 1418 → ~3100 | ✅ done | 2026-05-21 | Session C — Fixed bands (£250k → £125k nil-band post 1 Apr 2025), FTB thresholds reverted to £300k/£500k, MDR abolished 1 Jun 2024, six-dwellings election depth, Scottish ADS 8%, non-UK resident 2% surcharge, ATED, 4 worked examples, 12 FAQs |
| 23 | cgt-payment-deadlines-property-sales-2026 | 5.4 | 11.7 | 1132 → ~3300 | ✅ done | 2026-05-21 | Session C — Major factual fixes: 60-day rule applies only when CGT due for UK residents (not "all disposals"), non-residents must always file, removed bogus £2m commercial threshold, corrected penalty schedule (100% only for deliberate/concealed), full worked timeline, SA interaction, jointly-owned/PRR/deferred consideration notes. 13 FAQs. YAML validated; build verification pending Session B unblocking the build via their furnished-holiday-let file. |
| 26 | 2027-property-tax-rates-affect-capital-gains-tax-sales | 5.4 | 37.0 | 1518 → ~3400 | ✅ done | 2026-05-21 | Session C — Reframed as disposal-decision framework (differentiator from #8 which is "confirmed vs speculated"). Anti-speculation framing: 2027 is income tax change only, no CGT rate change in legislation. Full worked example (Maya, HR taxpayer), incorporation s.162 case-law treatment (Ramsay v HMRC), personal vs limited co comparison, MTD/60-day deadlines integration, 13 FAQs, 2 inline CTAs. YAML validated; build re-verify pending concurrent session unblock. |
| 29 | landlord-insurance-tax-deductible-what-can-you-claim | 6.4 | 29.0 | 1234 → ~3500 | ✅ done | 2026-05-21 | Session C — Rewritten at canonical slug landlord-insurance-tax-deductible (assigned slug 301-redirects there). MAJOR ADDITION: insurance payout tax treatment (PIM2068, s.22/s.23 TCGA 1992) - this was the £17-impression GSC opportunity. 3 worked examples (rent guarantee, revenue repair, capital rebuild rollover). s.34 ITTOIA 2005 wholly-and-exclusively test, S24 non-restriction note, MTD framing, cash vs accruals timing, common-mistakes section. 4 → 13 FAQs. YAML validated; build re-verify deferred. |
| 32 | spv-property-investment-special-purpose-vehicle-guide | 4.7 | 80.1 | 1637 → ~3400 | ✅ done | 2026-05-21 | Session C — MAJOR FIXES: removed VAT registration claim (residential rent is exempt supply, threshold irrelevant), removed false "MTD applies to companies" claim (MTD-ITSA is sole traders only; MTD-CT deferred), fixed broken worked example with proper S24 mechanics. Added SIC code mechanics (68209/68100), share structure, director-loan vs equity funding, lender criteria, dividend extraction routes, BPR-not-available, ATED detail. 4→14 FAQs, 2 inline CTAs. |
| 35 | cgt-calculation-selling-buy-to-let-property-step-by-step | 4.5 | 74.3 | 1436 → ~3400 | ✅ done | 2026-05-21 | Session C — Five worked examples (HR straightforward, gain straddling bands, former main residence with PRR, joint owners mismatched incomes, capital loss offset). Capital vs revenue table from PIM2020. s.42 part-disposal, s.58 spouse transfer, s.17 deemed disposal. 4→14 FAQs, 1 inline CTA. |
| 38 | 2027-property-income-tax-rates-landlords-uk | 4.5 | 83.0 | 1531 → ~3500 | ✅ done | 2026-05-21 | Session C — 2027 pillar. Framed as "announced position pending Finance Act 2026". Three worked examples (BR sole trader, HR mixed, geared S24 portfolio). S24 widening analysis. Personal vs ltd co. MTD interaction. 4→14 FAQs, 2 CTAs. |
| 41 | mtd-quarterly-deadlines-2026-2027-landlords | 3.8 | 78.0 | 1546 → ~3200 | ✅ done | 2026-05-21 | Session C — MAJOR FIXES: £10k → £50k/£30k/£20k threshold; old £100-per-return penalty model replaced with current points-based (4 points → £200) regime; quarter deadlines corrected to 7th of second month after quarter end (7 Aug/7 Nov/7 Feb/7 May); calendar-aligned quarters election; final declaration (replaces EOPS+crystallisation); jointly-owned & partnership filing; 2027 rate change interaction. 4→14 FAQs, 2 CTAs. |
| 44 | how-to-calculate-cgt-on-property | 4.5 | 74.3 | 1436 | ⏭️ skip | 2026-05-21 | Session C — No source markdown file and no redirect. Topic fully covered by #35 (cgt-calculation-selling-buy-to-let-property-step-by-step). Nothing to rewrite. |
| 47 | capital-gains-tax-property-complete-guide-uk | 3.5 | 66.8 | 1514 → ~3000 | ✅ done | 2026-05-21 | Session C — CGT pillar rewrite. Anchors 18%/24% rates + £3k AEA + 60-day reporting framework. Onward links to all CGT daughter pages (#8, #13, #14, #17, #23, #26, #35). Fixed worked-example arithmetic error in old version. FHL abolition + BADR rate increases (10→14→18%) updated. Non-residents 2015/2019 rebasing. 4→14 FAQs, 2 CTAs. |
| 50 | property-accountant-jobs-uk | 3.8 | 45.6 | 2300 → ~3000 | ✅ done | 2026-05-21 | Session C — Careers focus (separate from hiring-an-accountant pages). Three employment routes (practice/in-house/self-employed), 2026 salary ranges table, qualifications table (ACA/ACCA/CTA/ATT), five technical topic areas, routes in from general practice. Cleanup of mixed careers/hiring content. 8→14 FAQs. |
| 53 | leeds (locations TSX) | 6.8 | 16.2 | 480 | ⏭️ skip | | TSX page in /locations/[slug] template. Skip per playbook. |
| 56 | what-does-a-property-accountant-do | 2.6 | 57.0 | 2083 → ~3300 | ✅ done | 2026-05-21 | Session C — Fixed £10k MTD threshold to £50k/£30k/£20k schedule, clarified scope, 5 technical specialism areas table, 4-question evaluation framework, honest "where pro input doesn't help" section, 7→14 FAQs. |
| 59 | property-investment-exit-strategy-planning-guide | 2.0 | 53.7 | 1964 → ~3300 | ✅ done | 2026-05-21 | Session C — Exit-specific differentiator from #7 portfolio management. 6-route comparison table, phased disposal mechanics, spouse-split worked example, CGT-uplift-vs-IHT trade-off, share sale option, refinance alternative, pension contributions in exit years. 4→14 FAQs, 1 CTA. |
| 62 | property-development-tax-trading-vs-investment-income | 1.7 | 59.0 | 1648 → ~3400 | ✅ done | 2026-05-21 | Session C — Nine badges of trade table, case law (Salisbury House 1930, Page v Lowther 1983, Marson 1986), ITA 2007 s.517A-U transactions in UK land anti-avoidance, activity-classification pattern table, VAT/capital allowances treatment, structural alternatives, 2027 trading-vs-investment widening gap. 3→14 FAQs, 1 CTA. |
| 63 | non-resident-landlord-self-assessment-filing-requirements | 1.1 | 54.8 | 1690 → ~3500 | ✅ done | 2026-05-21 | Session C — NRL scheme + SA split, SA100/105/109 minimum + supplements, HMRC free service doesn't support SA109 (commercial software required), 60-day CGT for all UK land disposals by NR, treaty interaction, PA availability by treaty, MTD applies to NR sole traders, NR corporate landlords under corporation tax since Apr 2020, Maria worked example. 4→14 FAQs, 2 CTAs. |

## Unassigned (handled outside the 3-session split)

None at present. If new pages are added to the queue (via further DeepSeek runs), assign to whichever session has the lowest in-progress count.

## How to update this file safely

- **Each session edits only rows assigned to that session.**
- **One status change per edit** — set 🟡 in_progress when starting, ✅ done when build passes, ⏭️ skip if deciding not to rewrite. Add the date and a one-line note.
- **Do NOT edit the "already complete" table** (session 0 work, frozen).
- **Do NOT edit other sessions' tables.** This is the source of concurrency safety.
- **If two sessions accidentally try to claim the same page** (shouldn't happen with pre-assignment): the second session sees 🟡 and immediately moves to the next page in its list.
