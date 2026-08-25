# Property Tax Partners: UK SEO surface architecture map

Built 2026-08-05. Site: propertytaxpartners.co.uk (UK property-tax accountancy lead generation).

**Sourcing.** Every volume and CPC figure in this document is DataForSEO Google Ads, UK (gb), pulled 2026-08-05, from `expansion_research/_prop_audit_2026_08_05/dfs/universe_merged.json` (936 terms). DataForSEO returns one volume per keyword *cluster*, so near-identical phrasings share a single figure; cluster volumes below are therefore the **maximum** of their member terms, never a sum. SERP shape is DataForSEO live UK SERPs for 25 terms (`serp_composition.json`); terms outside that set are marked "not pulled". Our Google positions are the GSC API, last 90 days to 2026-08-05; a tilde marks a contains-match average rather than an exact-query row. Bing notes come from `fresh_facts_2026_08_05.md`.

Machine-readable twin: `out/property_seo_surface_2026-08-05.json`.

## Reading the flags

- **CANNIB**: more than three of our URLs currently take impressions for the cluster. Measured, not asserted.
- **NO-GBP**: the SERP carries a local pack. We have no Google Business Profile and the estate rule is that we never create one, so the pack is unreachable and the organic slots below it are the only prize. Treat the headline volume as discounted.

## Tier 1: head clusters

| # | Cluster | Rep. volume | CPC | Intent | SERP shape | Our Google pos | Bing note | Owning URLs now | Flags | Recommended owner |
|---|---|---|---|---|---|---|---|---|---|---|
| T1-01 | Property accountant family | 720 | GBP 17.55 | commercial | AI overview, LOCAL PACK, PAA | 25.2 (278 impr) | commercial head terms total 45 impr / 0 clicks on Bing; no city or /locations page has any Bing footprint at all (0 of 191 pages) | 14 | CANNIB NO-GBP | /services (NEW dedicated /services/property-accountant hub, consolidating the 11 blog posts now competing) |
| T1-02 | Landlord accountant family | 390 | GBP 22.02 | commercial | LOCAL PACK, PAA | 31.6 (9 impr) | inside the same 45 impr / 0 clicks commercial head-term pool | 0 | NO-GBP | NEW /services/landlord-accountant |
| T1-03 | Property tax advisor / specialist | 210 | GBP 39.02 | commercial | LOCAL PACK, PAA | 34.0 (72 impr) | inside the same 45 impr / 0 clicks commercial head-term pool | 0 | NO-GBP | /services (NEW /services/property-tax-advice landing, absorbing the London blog duplicates) |
| T1-04 | Landlord tax (informational head) | 2,900 | GBP 12.62 | informational | AI overview, PAA | ~31.6 (901 impr) | "landlord tax" = 1,064 impr / 121 clicks (11.4% CTR) on Bing versus 0 impressions on Google. The demand is real and the zero is Google-only | 0 | - | /property-tax-rates (hub) + NEW pillar /landlord-tax linking the calculators |
| T1-05 | Buy-to-let accountant | 110 | GBP 13.72 | commercial | PAA | 57 (15 impr) | inside the same 45 impr / 0 clicks commercial head-term pool | 0 | - | NEW /services/buy-to-let-accountant |
| T1-06 | Property investment accountant | 320 | GBP 9.62 | commercial | AI overview, LOCAL PACK, PAA | 42.6 (26 impr) | inside the same 45 impr / 0 clicks commercial head-term pool | 0 | NO-GBP | NEW /services/property-investment-accountant |
| T1-07 | Property management accountant | 210 | GBP 26.15 | commercial | LOCAL PACK, PAA | 51.7 (3 impr) | no Bing footprint recorded | 0 | NO-GBP | NEW /services/property-management-accounting (letting agents and managing agents; highest CPC in the set) |
| T1-08 | Rental property accountant | 110 | GBP 15.24 | commercial | LOCAL PACK, PAA | 1 (1 impr) | no Bing footprint recorded | 0 | NO-GBP | Fold into /services/landlord-accountant (T1-02) as a section; do not build a separate page |
| T1-09 | Non-resident landlord | 880 | GBP 0.40 | commercial | AI overview, PAA | 55.4 (35 impr) | not separately pulled; site totals 139,458 impr / 3,497 clicks / 2.51% CTR | 0 | - | NEW /services/non-resident-landlord (NRL scheme hub; the NRL form queries already rank 7-9 on blog posts) |
| T1-10 | Incorporation / transfer to limited company | 480 | GBP 5.15 | commercial | AI overview, PAA | ~18.2 (807 impr) | not separately pulled; site totals 139,458 impr / 3,497 clicks / 2.51% CTR | 0 | - | /incorporation (exists; add the SDLT-on-incorporation and connected-party sections that are winning impressions on blog posts) |
| T1-11 | Section 24 specialism | 590 | GBP 5.36 | informational | AI overview, PAA | ~46.3 (3 impr) | not separately pulled; site totals 139,458 impr / 3,497 clicks / 2.51% CTR | 0 | - | /calculators/section-24-calculator (exists; needs an explainer pillar above it) |
| T1-12 | Making Tax Digital for landlords | 1,900 | GBP 11.14 | commercial | AI overview, PAA | 47.5 (2 impr) | not separately pulled; site totals 139,458 impr / 3,497 clicks / 2.51% CTR | 0 | - | /calculators/mtd-checker (exists; promote to a full MTD hub with the deadline, threshold and software sub-answers) |
| T1-13 | Stamp duty calculator family | 246,000 | GBP 0.84 | calculator-tool | AI overview, PAA | 62.7 (48 impr) | not separately pulled; site totals 139,458 impr / 3,497 clicks / 2.51% CTR | 0 | - | /calculators/stamp-duty-calculator (exists; the single largest volume pool on the site and we rank pos 63) |
| T1-14 | CGT on property calculator + rates | 14,800 | GBP 4.74 | calculator-tool | AI overview, PAA | ~21.2 (50 impr) | not separately pulled; site totals 139,458 impr / 3,497 clicks / 2.51% CTR | 0 | - | /calculators/capital-gains-tax-calculator (exists; pair with /property-tax-rates for the rates intent) |
| T1-15 | Landlord / rental income tax calculator | 880 | GBP 4.01 | calculator-tool | plain organic | 51 (1 impr) | not separately pulled; site totals 139,458 impr / 3,497 clicks / 2.51% CTR | 0 | - | /calculators/rental-income-tax-calculator (exists; rename-facing H1 to "landlord tax calculator", which is the demand phrasing) |

**Tier 1 totals.** 15 clusters. Representative monthly UK volume across all 15 heads: 270,500. Excluding the stamp duty calculator family (246,000, a single dominant pool), the rest of the surface totals 24,500. Clusters flagged CANNIB: 1. Clusters flagged NO-GBP: 6.

## Tier 2: sub-terms by head

### T1-01 Property accountant family

Recommended owner: **/services (NEW dedicated /services/property-accountant hub, consolidating the 11 blog posts now competing)**

Currently serving: `/blog/property-accountant-services/how-to-become-property-accountant`, `/blog/property-accountant-services/property-specialist-accountant-london`, `/blog/property-accountant-services/manchester-property-accountant`, `/locations/leeds`, `/locations/birmingham`, `/blog/property-accountant-services/how-much-does-a-property-accountant-cost`, `/blog/property-tax-accountant-manchester`, `/blog/property-accountant-services/property-accountant-northampton-expert-services` plus 6 more

| Sub-term group | Example terms | Volume | CPC | Intent | SERP shape | Our pos | URLs serving |
|---|---|---|---|---|---|---|---|
| bare head | property accountant, property accountants | 720 | GBP 17.55 | commercial | AI overview, LOCAL PACK, PAA | 25.2 (278 impr) | 14 |
| specialist modifier | specialist property accountant, specialist property accountants, property specialist accountant | 170 | GBP 13.59 | commercial | AI overview, LOCAL PACK, PAA | 32.1 (50 impr) | - |
| near me | property accountants near me, property accountant near me | 170 | GBP 7.07 | commercial | AI overview, PAA | 20.9 (27 impr) | 5 |
| city variants | property accountants london, property accountant london, property accountant hounslow | 50 | GBP 16.06 | commercial | not pulled | 19.5 (10 impr) | - |
| fees/cost | property accountant fees, how much does a property accountant cost | - | - | commercial | not pulled |  | - |
| services/what they do | property accounting services, property tax services, what is property accountant | 140 | GBP 3.18 | informational | not pulled | 1 (1 impr) | - |
| jobs (EXCLUDE) | property accountant jobs, property accountants jobs, property accountant london jobs | 90 | GBP 2.54 | careers - not a lead intent | not pulled |  | - |

### T1-02 Landlord accountant family

Recommended owner: **NEW /services/landlord-accountant**

Currently serving: no URL-level data. The GSC page-dimension pull covers the twenty highest-impression head queries only, all in the property-accountant family, so URL counts outside T1-01 are unmeasured rather than zero. Query-level impressions are still shown per row.

| Sub-term group | Example terms | Volume | CPC | Intent | SERP shape | Our pos | URLs serving |
|---|---|---|---|---|---|---|---|
| bare head | landlord accountant, accountant for landlords, accountants for landlords | 390 | GBP 11.87 | commercial | LOCAL PACK, PAA | 31.6 (9 impr) | - |
| tax accountant modifier | landlord tax accountant, landlord tax accountants | 70 | GBP 22.02 | commercial | not pulled | 66 (5 impr) | - |
| near me | landlord accountant near me | 70 | GBP 12.12 | commercial | LOCAL PACK, PAA | 2 (1 impr) | - |
| city variants | landlord accountant london | 30 | GBP 19.88 | commercial | not pulled | 22.6 (5 impr) | - |
| let property campaign | let property campaign accountant, let property campaign accountant near me, let property campaign accountant cost | 40 | GBP 21.71 | commercial | not pulled | 16.4 (19 impr) | - |

### T1-03 Property tax advisor / specialist

Recommended owner: **/services (NEW /services/property-tax-advice landing, absorbing the London blog duplicates)**

Currently serving: no URL-level data. The GSC page-dimension pull covers the twenty highest-impression head queries only, all in the property-accountant family, so URL counts outside T1-01 are unmeasured rather than zero. Query-level impressions are still shown per row.

| Sub-term group | Example terms | Volume | CPC | Intent | SERP shape | Our pos | URLs serving |
|---|---|---|---|---|---|---|---|
| advisor | property tax advisor, property tax advisors, tax advisor property | 210 | GBP 17.44 | commercial | LOCAL PACK, PAA | 24 (7 impr) | - |
| specialist | property tax specialist, property tax specialists uk, uk property tax specialists | 210 | GBP 11.42 | commercial | AI overview, LOCAL PACK, PAA | 38.6 (47 impr) | - |
| tax accountant | property tax accountant, property tax accountants, tax accountant property | 210 | GBP 9.41 | commercial | LOCAL PACK, PAA | 34.0 (72 impr) | - |
| near me | property tax specialist near me, property tax advisor near me, property tax accountant near me | 140 | GBP 17.31 | commercial | not pulled | 18.2 (13 impr) | - |
| city variants | property tax accountant london, property tax accountants london | 40 | GBP 19.00 | commercial | not pulled | 21.9 (13 impr) | - |
| advice/consulting | property tax advice, tax advice property, property tax consultant | 320 | GBP 6.05 | commercial | not pulled | 29.5 (12 impr) | - |

### T1-04 Landlord tax (informational head)

Recommended owner: **/property-tax-rates (hub) + NEW pillar /landlord-tax linking the calculators**

Currently serving: no URL-level data. The GSC page-dimension pull covers the twenty highest-impression head queries only, all in the property-accountant family, so URL counts outside T1-01 are unmeasured rather than zero. Query-level impressions are still shown per row.

| Sub-term group | Example terms | Volume | CPC | Intent | SERP shape | Our pos | URLs serving |
|---|---|---|---|---|---|---|---|
| bare head | landlord tax, tax landlord, uk landlord tax | 2,900 | GBP 3.87 | informational | AI overview, PAA | ~31.6 (901 impr) | - |
| advice | landlord tax advice, landlord tax advice uk, small landlord tax advice | 170 | GBP 12.62 | commercial | AI overview, PAA | 71.3 (3 impr) | - |
| changes/budget | landlord tax changes, landlord tax changes 2026, new landlord tax | 720 | GBP 1.18 | informational | not pulled |  | - |
| how much do I pay | how much tax do i pay as a landlord, how much landlord tax do i pay, how much is landlord tax | 170 | GBP 0.25 | informational | not pulled | 90 (3 impr) | - |
| relief/expenses | landlord tax relief, landlord tax deductions, landlord tax allowances | 110 | GBP 3.87 | informational | not pulled | 69.6 (9 impr) | - |
| tax return | landlord tax return, landlord tax returns, landlords self assessment | 260 | GBP 7.59 | commercial | AI overview, PAA | 80 (1 impr) | - |
| HMRC angle | landlord tax hmrc, hmrc landlord tax, hmrc landlord tax crackdown | 320 | GBP 11.53 | informational | not pulled |  | - |

### T1-05 Buy-to-let accountant

Recommended owner: **NEW /services/buy-to-let-accountant**

Currently serving: no URL-level data. The GSC page-dimension pull covers the twenty highest-impression head queries only, all in the property-accountant family, so URL counts outside T1-01 are unmeasured rather than zero. Query-level impressions are still shown per row.

| Sub-term group | Example terms | Volume | CPC | Intent | SERP shape | Our pos | URLs serving |
|---|---|---|---|---|---|---|---|
| bare head | buy to let accountant, buy-to-let accountant | 110 | GBP 13.72 | commercial | PAA | 57 (15 impr) | - |
| near me | buy to let accountant near me, buy-to let accountant near me | 30 | GBP 10.10 | commercial | not pulled |  | - |
| tax advice | buy to let tax advice | - | - | commercial | AI overview, PAA |  | - |
| limited company BTL | buy to let limited company accountant, accountant for limited company buy to let | 10 | GBP 15.55 | commercial | not pulled | ~7.0 (1 impr) | - |

### T1-06 Property investment accountant

Recommended owner: **NEW /services/property-investment-accountant**

Currently serving: no URL-level data. The GSC page-dimension pull covers the twenty highest-impression head queries only, all in the property-accountant family, so URL counts outside T1-01 are unmeasured rather than zero. Query-level impressions are still shown per row.

| Sub-term group | Example terms | Volume | CPC | Intent | SERP shape | Our pos | URLs serving |
|---|---|---|---|---|---|---|---|
| bare head | property investment accountant, property investment accountants | 320 | GBP 9.62 | commercial | AI overview, LOCAL PACK, PAA | 42.6 (26 impr) | - |
| investors phrasing | accountants for property investors, accountant for property investors, investment property accountants | 50 | - | commercial | not pulled | 1 (1 impr) | - |
| developers | property development accountant, property development accountants, accountants for property developers | 90 | - | commercial | not pulled | 45 (4 impr) | - |
| property trading | property trading, property traders | 260 | GBP 3.00 | informational | not pulled |  | - |

### T1-07 Property management accountant

Recommended owner: **NEW /services/property-management-accounting (letting agents and managing agents; highest CPC in the set)**

Currently serving: no URL-level data. The GSC page-dimension pull covers the twenty highest-impression head queries only, all in the property-accountant family, so URL counts outside T1-01 are unmeasured rather than zero. Query-level impressions are still shown per row.

| Sub-term group | Example terms | Volume | CPC | Intent | SERP shape | Our pos | URLs serving |
|---|---|---|---|---|---|---|---|
| bare head | accountant for property management | 210 | GBP 26.15 | commercial | LOCAL PACK, PAA | 51.7 (3 impr) | - |
| letting agents (GSC-observed) | accountant for letting agents leicester | - | - | commercial | not pulled | 4.9 (91 impr) | - |
| service-charge / block | no DFS-seeded terms | - | - | commercial | not pulled |  | - |

### T1-08 Rental property accountant

Recommended owner: **Fold into /services/landlord-accountant (T1-02) as a section; do not build a separate page**

Currently serving: no URL-level data. The GSC page-dimension pull covers the twenty highest-impression head queries only, all in the property-accountant family, so URL counts outside T1-01 are unmeasured rather than zero. Query-level impressions are still shown per row.

| Sub-term group | Example terms | Volume | CPC | Intent | SERP shape | Our pos | URLs serving |
|---|---|---|---|---|---|---|---|
| bare head | rental property accountant, rental property accountants | 110 | GBP 15.24 | commercial | LOCAL PACK, PAA | ~7.0 (2 impr) | - |
| accountant for rental property | accountant for rental property, accountants for rental property | 110 | GBP 15.24 | commercial | not pulled | 1 (1 impr) | - |

### T1-09 Non-resident landlord

Recommended owner: **NEW /services/non-resident-landlord (NRL scheme hub; the NRL form queries already rank 7-9 on blog posts)**

Currently serving: no URL-level data. The GSC page-dimension pull covers the twenty highest-impression head queries only, all in the property-accountant family, so URL counts outside T1-01 are unmeasured rather than zero. Query-level impressions are still shown per row.

| Sub-term group | Example terms | Volume | CPC | Intent | SERP shape | Our pos | URLs serving |
|---|---|---|---|---|---|---|---|
| NRL scheme | non resident landlord scheme | 880 | GBP 0.40 | informational | not pulled | 60.4 (11 impr) | - |
| NRL tax | non-resident landlord tax, non resident landlord tax, uk tax non resident landlord | 90 | - | informational | AI overview, PAA | 57.6 (25 impr) | - |
| overseas/abroad phrasing | overseas landlord tax, landlord abroad tax, overseas landlord tax exemption uk | 110 | - | informational | not pulled | 55.4 (35 impr) | - |
| NRL returns/forms | non resident landlord tax return, non resident landlord tax form, non-resident landlord tax return | 30 | GBP 3.84 | commercial | not pulled | 62 (6 impr) | - |
| NRL calculator | non resident landlord tax calculator uk | 30 | GBP 8.34 | calculator-tool | not pulled |  | - |

### T1-10 Incorporation / transfer to limited company

Recommended owner: **/incorporation (exists; add the SDLT-on-incorporation and connected-party sections that are winning impressions on blog posts)**

Currently serving: no URL-level data. The GSC page-dimension pull covers the twenty highest-impression head queries only, all in the property-accountant family, so URL counts outside T1-01 are unmeasured rather than zero. Query-level impressions are still shown per row.

| Sub-term group | Example terms | Volume | CPC | Intent | SERP shape | Our pos | URLs serving |
|---|---|---|---|---|---|---|---|
| transfer to ltd co | transfer property to limited company | 480 | GBP 4.48 | commercial | not pulled | ~8.6 (582 impr) | - |
| property incorporation | property incorporation | 480 | GBP 2.72 | commercial | AI overview, PAA | ~42.9 (225 impr) | - |
| incorporation relief | incorporation relief property, property incorporation relief, incorporation relief property rental business | 110 | GBP 5.15 | informational | not pulled |  | - |
| portfolio incorporation (GSC-observed) | landlord portfolio incorporation uk, incorporating a property portfolio uk | - | - | informational | not pulled | 29.9 (215 impr) | - |
| SDLT on incorporation (GSC-observed) | stamp duty on property incorporation uk, sdlt transfer property to limited company connected party 2025 | - | - | informational | not pulled | 8.6 (582 impr) | - |
| cost calculator | incorporation cost calculator | - | - | calculator-tool | not pulled |  | - |

### T1-11 Section 24 specialism

Recommended owner: **/calculators/section-24-calculator (exists; needs an explainer pillar above it)**

Currently serving: no URL-level data. The GSC page-dimension pull covers the twenty highest-impression head queries only, all in the property-accountant family, so URL counts outside T1-01 are unmeasured rather than zero. Query-level impressions are still shown per row.

| Sub-term group | Example terms | Volume | CPC | Intent | SERP shape | Our pos | URLs serving |
|---|---|---|---|---|---|---|---|
| what is section 24 | what is section 24, what is section 24 tax | 320 | GBP 5.36 | informational | not pulled |  | - |
| section 24 tax | section 24 tax, tax section 24, section 24 tax uk | 590 | GBP 2.82 | informational | AI overview, PAA | ~46.3 (3 impr) | - |
| landlord framing | section 24 landlords, section 24 landlord, section 24 landlord tax | 210 | - | informational | not pulled |  | - |
| workarounds | section 24 tax loopholes uk | 70 | - | informational | not pulled |  | - |
| mortgage interest relief | landlord mortgage interest tax relief, landlord tax relief on mortgage interest, mortgage interest relief on rental property | 110 | - | informational | not pulled | 73.3 (17 impr) | - |
| India Income Tax Act s.24 (EXCLUDE) | section 24 of income tax act, section 24 of income tax act 1961 | 140 | - | wrong jurisdiction - suppress | not pulled |  | - |

### T1-12 Making Tax Digital for landlords

Recommended owner: **/calculators/mtd-checker (exists; promote to a full MTD hub with the deadline, threshold and software sub-answers)**

Currently serving: no URL-level data. The GSC page-dimension pull covers the twenty highest-impression head queries only, all in the property-accountant family, so URL counts outside T1-01 are unmeasured rather than zero. Query-level impressions are still shown per row.

| Sub-term group | Example terms | Volume | CPC | Intent | SERP shape | Our pos | URLs serving |
|---|---|---|---|---|---|---|---|
| bare head | making tax digital for landlords, mtd for landlords, making tax digital landlords | 1,900 | GBP 10.89 | commercial | AI overview, PAA | 47.5 (2 impr) | - |
| deadline/start | making tax digital landlords deadline, when does making tax digital start for landlords | 480 | GBP 3.46 | informational | not pulled |  | - |
| threshold | making tax digital for landlords threshold | 50 | GBP 2.40 | informational | not pulled |  | - |
| software | making tax digital software for landlords, best making tax digital software for landlords, making tax digital compatible software landlords | 210 | GBP 37.91 | commercial | not pulled | 58 (2 impr) | - |
| penalties | making tax digital landlord penalties | 110 | GBP 6.69 | informational | not pulled |  | - |
| quarterly returns | landlord quarterly tax returns | 70 | GBP 1.24 | informational | not pulled |  | - |

### T1-13 Stamp duty calculator family

Recommended owner: **/calculators/stamp-duty-calculator (exists; the single largest volume pool on the site and we rank pos 63)**

Currently serving: no URL-level data. The GSC page-dimension pull covers the twenty highest-impression head queries only, all in the property-accountant family, so URL counts outside T1-01 are unmeasured rather than zero. Query-level impressions are still shown per row.

| Sub-term group | Example terms | Volume | CPC | Intent | SERP shape | Our pos | URLs serving |
|---|---|---|---|---|---|---|---|
| bare calculator | stamp duty calculator, stamp duty estimator | 246,000 | GBP 0.37 | calculator-tool | not pulled | ~65.2 (46 impr) | - |
| UK-qualified | stamp duty calculator uk, uk stamp duty calculator, stamp duty tax calculator uk | 60,500 | GBP 0.28 | calculator-tool | not pulled | ~77.0 (1 impr) | - |
| SDLT phrasing | sdlt calculator, stamp duty land tax calculator, calculate sdlt | 40,500 | GBP 0.84 | calculator-tool | not pulled | 62.7 (48 impr) | - |
| first-time buyer | first time buyer stamp duty, stamp duty for first time buyers | 18,100 | GBP 1.00 | informational | not pulled | 86.0 (77 impr) | - |
| second home / additional | stamp duty on second home, second home stamp duty, stamp duty 2nd home | 14,800 | GBP 0.46 | informational | not pulled | 1 (1 impr) | - |
| rates/thresholds | stamp duty rates, stamp duty thresholds, stamp duty land tax | 12,100 | GBP 2.37 | informational | not pulled | 1 (4 impr) | - |
| advice (commercial) | stamp duty advice, stamp duty land tax advice, stamp duty tax advice | 210 | GBP 12.02 | commercial | AI overview, PAA | ~58.0 (3 impr) | - |
| devolved (LBTT/LTT) | stamp duty wales | - | - | calculator-tool | not pulled | 2 (75 impr) | - |

### T1-14 CGT on property calculator + rates

Recommended owner: **/calculators/capital-gains-tax-calculator (exists; pair with /property-tax-rates for the rates intent)**

Currently serving: no URL-level data. The GSC page-dimension pull covers the twenty highest-impression head queries only, all in the property-accountant family, so URL counts outside T1-01 are unmeasured rather than zero. Query-level impressions are still shown per row.

| Sub-term group | Example terms | Volume | CPC | Intent | SERP shape | Our pos | URLs serving |
|---|---|---|---|---|---|---|---|
| property CGT calculator | property gains tax calculator, property capital gains tax calculator, cgt calculator property | 14,800 | GBP 4.74 | calculator-tool | not pulled |  | - |
| UK-qualified calculator | uk property capital gains tax calculator, capital gains tax calculator uk property | 1,600 | GBP 2.15 | calculator-tool | not pulled |  | - |
| CGT on property (rates/rules) | capital gains tax on property, capital gains tax property, uk property capital gains tax | 2,400 | GBP 3.68 | informational | AI overview, PAA | ~21.2 (50 impr) | - |
| sale of property | capital gains tax on sale of property, property sale capital gains tax | 1,000 | GBP 2.99 | informational | not pulled | ~37.0 (1 impr) | - |
| second property | capital gains tax second property, capital gains tax on 2nd property | 880 | GBP 1.20 | informational | not pulled |  | - |
| inherited property | capital gains tax on inherited property, inherited property and capital gains tax | 1,000 | GBP 1.35 | informational | not pulled | ~3.0 (1 impr) | - |
| rental property CGT | capital gains tax on rental property, capital gains tax rental property | 590 | GBP 2.95 | informational | not pulled | 27.8 (5 impr) | - |
| reporting/60-day | report and pay capital gains tax on uk property | 1,000 | GBP 2.66 | informational | not pulled | ~8.5 (6 impr) | - |
| allowance | capital gains tax allowance on property | 590 | - | informational | not pulled | 48 (2 impr) | - |

### T1-15 Landlord / rental income tax calculator

Recommended owner: **/calculators/rental-income-tax-calculator (exists; rename-facing H1 to "landlord tax calculator", which is the demand phrasing)**

Currently serving: no URL-level data. The GSC page-dimension pull covers the twenty highest-impression head queries only, all in the property-accountant family, so URL counts outside T1-01 are unmeasured rather than zero. Query-level impressions are still shown per row.

| Sub-term group | Example terms | Volume | CPC | Intent | SERP shape | Our pos | URLs serving |
|---|---|---|---|---|---|---|---|
| bare head | landlord tax calculator, tax calculator landlord | 880 | GBP 4.01 | calculator-tool | plain organic | 51 (1 impr) | - |
| UK-qualified | landlord tax calculator uk, uk landlord tax calculator | 110 | GBP 2.62 | calculator-tool | not pulled |  | - |
| HMRC framing | hmrc landlord tax calculator | 50 | GBP 2.74 | calculator-tool | not pulled |  | - |
| rental income tax | landlord tax on rental income, landlord income tax, tax on landlord income | 880 | GBP 7.01 | informational | not pulled | ~57.0 (1 impr) | - |

**Tier 2 totals.** 82 sub-term groups across 15 heads. Volume figures are per-group representatives on the same no-summing rule; groups showing "-" have no DataForSEO UK volume in the 936-term universe, which means they were not seeded, not that demand is zero. ATED, LBTT and LTT specialisms were never seeded in the DFS pull and are a known data gap: we hold GSC positions 1-3 on `ated` and `lbtt` with only single-digit impressions, so the demand exists but is unsized.

## Tier 3: long-tail and question layer

Source: `autocomplete_property.json`, 1812 unique UK terms from Google Autocomplete expansion. Two blocks are removed before theming: 26 Indian-law "section 24" terms (Income Tax Act 1961, Hindu Marriage Act, Court Fees Act, the Constitution) which are the wrong jurisdiction entirely, and 36 jobs and salary terms which are careers traffic rather than lead intent. That leaves 1750 themable terms. The table below groups them; it deliberately does not enumerate all 1812.

| Theme | Terms | Exemplars |
|---|---|---|
| How much tax do I pay | 12 | how much do property accountants make; how much is landlord tax uk; how much is landlord tax in ireland |
| Can I claim / deductible | 11 | can i claim landlord insurance on tax; can i deduct property taxes; can i deduct property taxes on a second home |
| What is X (definitional) | 29 | what does a property accountant do; what is property accountant; what does a senior property accountant do |
| Section 24 mechanics (UK) | 232 | landlord tax section 24; section 24; section 24 cpc |
| CGT on property | 232 | buy to let capital gains accountants near pontefract; non resident landlord capital gains tax; non resident landlord cgt |
| Non-resident / overseas landlord | 206 | landlord overseas tax; landlord overseas tax form; how much is overseas landlord tax |
| Calculators and tools | 58 | landlord tax calculator; landlord tax calculator uk; landlord tax calculator scotland |
| MTD and landlord software | 25 | property accountant mri software; property accounting software; landlord accounting software |
| Limited company / incorporation | 25 | landlord tax limited company; buy to let limited company accountant; accountant for limited company buy to let |
| Fees, cost and pricing | 9 | property accountant fees; how much do property accountants make; landlord accountant fees |
| Near me / local | 15 | property accountants near me; property investment accountant near me; property accountant near me |
| Best / comparison / reviews | 13 | property accountant reviews; property accountant vs accountant; best landlord accounting software |
| City-named | 19 | property accountant birmingham; property accountant bristol; property accountant belfast |
| Expenses and deductions | 38 | landlord tax deductions; landlord tax deductible expenses; landlord tax deductions canada |

**Tier 3 totals.** 1812 raw terms, 1750 after excluding 26 Indian-law and 36 careers terms. Themes overlap by design (a term can be both a question form and a CGT term), so the theme counts do not sum to the corpus. The two themes with no owning page at all today are "fees, cost and pricing" and "best / comparison / reviews": we publish neither a pricing page nor any comparison content, and both are bottom-of-funnel.

## QA: flags

### Cannibalisation (more than three of our URLs competing)

- **T1-01 Property accountant family**: 14 URLs. Top offenders: `/blog/property-accountant-services/how-to-become-property-accountant`, `/blog/property-accountant-services/property-specialist-accountant-london`, `/blog/property-accountant-services/manchester-property-accountant`, `/locations/leeds`, `/locations/birmingham`.

URL counts come from the GSC page-dimension pull, which covers the twenty highest-impression head queries (all property-accountant family). Clusters outside T1-01 are therefore unflagged for lack of URL-level data, not because they are clean; the repo count of 50 blog metaTitles containing "property accountant" and 33 containing "landlord tax" says the same pattern almost certainly repeats in T1-02 and T1-04.

The measured worst case sits inside T1-01: the bare query "property accountant" alone (278 impressions, 90 days) is served across 11 different URLs at an average position of 25.2, with zero clicks. No single page is being allowed to rank.

### No-GBP rule bites (local pack present)

- **T1-01 Property accountant family** (via `property accountant`): pack holders UK Property Accountants, Tax Space Ltd, Optimise Accountants Expat & Property Tax Specialists
- **T1-02 Landlord accountant family** (via `landlord accountant`): pack holders UK Property Accountants, Gorilla Accounting, Tax Space Ltd
- **T1-03 Property tax advisor / specialist** (via `property tax advisor`): pack holders UK Property Accountants, Property Tax Advice, PTRC - Capital Allowance Specialists
- **T1-06 Property investment accountant** (via `property investment accountant`): pack holders UK Property Accountants, Optimise Accountants Expat & Property Tax Specialists, Property Tax Advice
- **T1-07 Property management accountant** (via `accountant for property management`): pack holders UK Property Accountants, Naseems Accountants | Accountants in Birmingham, FHP Accounting Services Limited
- **T1-08 Rental property accountant** (via `rental property accountant`): pack holders UK Property Accountants, Tax Space Ltd, Alexander & Co

In each of these the pack occupies the top of the fold and we cannot enter it. The realistic play is the organic block beneath it, which means the recommended owner page has to win on depth and on the AI-overview citation rather than on proximity.

## Closing section: light four-market comparison

Source: DataForSEO Google Ads, pulled 2026-08-05, US / AU / CA volumes and CPC for the same 20 UK heads.

| Head term | US vol | US CPC | AU vol | AU CPC | CA vol | CA CPC |
|---|---|---|---|---|---|---|
| property accountant | 720 | GBP 32.32 | 390 | GBP 2.64 | 210 | GBP 3.21 |
| property accountants | 10 | - | 390 | GBP 2.64 | 210 | GBP 3.21 |
| property tax accountant | 260 | GBP 41.57 | 210 | GBP 6.09 | 20 | GBP 10.98 |
| landlord accountant | 210 | GBP 20.16 | 10 | GBP 20.43 | 10 | - |
| accountant for landlords | 10 | GBP 51.65 | 10 | GBP 3.39 | 10 | - |
| landlord tax | 140 | GBP 0.07 | 50 | - | 20 | - |
| landlord tax advice | 10 | - | 10 | - | 10 | - |
| buy to let accountant | 90 | - | 0 | - | 0 | - |
| rental property accountant | 260 | GBP 87.15 | 40 | GBP 8.84 | 50 | GBP 1.22 |
| property investment accountant | 170 | GBP 31.20 | 210 | GBP 8.16 | 10 | - |
| accountant for property management | 590 | GBP 74.58 | 20 | - | 70 | GBP 16.61 |
| property tax advisor | 90 | - | 20 | GBP 9.97 | 10 | - |
| property tax specialist | 140 | GBP 24.74 | 260 | GBP 4.20 | 10 | - |
| non resident landlord tax | 10 | - | 10 | - | 10 | - |
| property incorporation | 210 | GBP 4.79 | 320 | - | 20 | - |
| section 24 tax | 10 | - | 10 | - | 10 | - |
| making tax digital landlords | 10 | - | 10 | - | 10 | - |
| capital gains tax property | 720 | GBP 3.40 | 880 | GBP 0.07 | 140 | - |
| stamp duty advice | 10 | - | 10 | - | 10 | - |
| landlord tax return | 10 | - | 10 | - | 10 | - |

One paragraph only, as scoped: the US carries the highest commercial prices in the set (property accountant USD 32.32, property tax accountant USD 41.57, accountant for landlords USD 51.65) on volumes that are broadly comparable to or below the UK equivalents, Australia has real volume on the generic "property accountant" family at a tenth of the US cost per click, and Canada is thin across the board. Nothing here is actioned in this document; it is recorded so that any future question about geographic expansion starts from measured figures rather than intuition.
