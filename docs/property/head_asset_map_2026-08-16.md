# Property head-asset master map (2026-08-16)

Site: Property Tax Partners (propertytaxpartners.co.uk). Scope: every head-term demand cluster in UK property tax and the adjacent landlord space, what asset each deserves, what we have vs what competitors have. No novelty/pillar gating: heads we already cover are graded as upgrade targets, not excluded.

## Method and data sources

- **Keyword universe**: 8x DataForSEO `keyword_ideas/live` (4 seed lanes x relevance-sorted + volume-sorted, limit 700 each) + 6x `keyword_suggestions/live` (niche lane seeds: section 24, rental yield, buy to let limited company, holiday let tax, landlord expenses, incorporation relief) + all prior rows in `dataforseo_keyword_data` (site_key=property). All new pulls persisted to `dataforseo_keyword_data`.
- **Competitor head inventory**: `dataforseo_competitor_data` (site_key=property, search_volume >= 3000), 3,159 rows across 17 domains; per-cluster best = lowest ranked position, asset shape classified from the ranking URL.
- **Our positions**: `gsc_query_data`, last 90 days, aggregated query x page (SUM impressions, AVG position; never summed across the query dimension), 701 queries >= 10 impressions.
- **Our asset inventory**: 18 calculator tools in `Property/web/src/lib/calculators/tools/`, 5 bespoke calculator pages, 6 resource hubs in `content/resources/`, root pillars `/section-24`, `/landlord-tax`, `/incorporation`, `/making-tax-digital-landlords`, `/property-tax-rates`, 4 service pages.

### Floors applied (no silent drops)

- Variant floor: keywords >= 1,000/mo from the ideas universe; the 6 niche-lane suggestion pulls merged at >= 100/mo (their heads sit below 1,000 and would otherwise vanish).
- Cluster floor: every cluster >= 3,000/mo total is in the main table (70 clusters). 5 clusters fell below the floor and are listed separately, none dropped.
- Off-scope exclusions (stated, not silent): vehicle/car tax, car and generic insurance, council tax billing (empty-property and second-home premiums kept), childcare, benefits, wages, VAT, Companies House, credit checks, pensions, national insurance, consumer rental listings ('flats to rent {city}'), generic single-word noise. 964 keywords totalling 47.1M/mo excluded, plus residual unassigned noise of the same character (all verified off-scope by inspection of every unassigned keyword >= 1,500/mo).
- **Volume caveat**: cluster totals sum DataForSEO per-keyword volumes. Google reports close variants ('stamp duty calculator' / 'calculate stamp duty' / 'stamp duty estimator') as separate keywords carrying near-identical volume, so totals overstate unique demand; the representative keyword volume is the honest floor for each cluster.

## Master table (every cluster >= 3,000/mo, descending by total volume)

| Cluster | Lane | Total vol/mo | Representative keyword (vol) | KD range | CPC (max) | Our asset | Our GSC position (90d) | Best competitor | SERP demands | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|
| income-tax-calculator | GENERIC-TAX | 9,649,300 | salary calculator (368,000) | 0-67 | £4.16 | none | no GSC presence | taxfix.com pos 3 (calculator) | calculator | **NOT-OURS** |
| hmrc-login-pta | NAVIGATIONAL | 2,992,000 | hm revenue and customs login (1,220,000) | 10-40 | £3.58 | none | no GSC presence | rossmartin.co.uk pos 8 (guide/page) | nav target | **NOT-OURS** |
| hmrc-contact | NAVIGATIONAL | 2,837,800 | number of hmrc (201,000) | 8-34 | £6.78 | none | no GSC presence | rossmartin.co.uk pos 6 (guide) | reference page | **NOT-OURS** |
| mortgage-rates-generic | MORTGAGE | 2,571,700 | and mortgage rates (135,000) | 0-59 | £7.45 | none | pos 1.2 ('are remortgage fees tax deductible') | dnsassociates.co.uk pos 16 (calculator) | rate tables | **NOT-OURS** |
| mortgage-calculator-generic | MORTGAGE | 2,445,000 | home loan calculator mortgage calculator (550,000) | 10-42 | £1.96 | none | pos 61.2 ('commercial mortgage calculator') | dnsassociates.co.uk pos 27 (calculator) | calculator | **NOT-OURS** |
| sdlt-calculator | SDLT | 1,402,100 | stamp duty calculator (301,000) | 38-60 | £0.58 | /calculators/stamp-duty-calculator | pos 15.0 ('calculate sdlt on lease extension') | uklandlordtax.co.uk pos 10 (calculator) | calculator | **HAVE-NEEDS-UPGRADE** |
| uk-tax-bands | GENERIC-TAX | 1,020,400 | england tax brackets (60,500) | 2-32 | £5.66 | none | no GSC presence | taxfix.com pos 3 (calculator) | rates tables | **NOT-OURS** |
| self-assessment-guide | SELF-ASSESSMENT | 923,400 | hm revenue & customs self assessment (110,000) | 26-40 | £15.78 | none (sa105 blog covers landlord slice) | pos 58.1 ('hmrc self assessment non resident landlord') | rossmartin.co.uk pos 8 (guide) | guide hub | **NOT-OURS** |
| iht-guide | IHT | 838,000 | inheritance estate tax (135,000) | 0-61 | £4.93 | none | pos 61.7 ('inheritance tax planning for landlords') | geraldedelman.com pos 10 (guide/page) | guide hub | **NOT-OURS** |
| self-assessment-login | SELF-ASSESSMENT | 674,600 | log into self assessment (165,000) | n/a | n/a | none | no GSC presence | taxfix.com pos 5 (guide/page) | nav target | **NOT-OURS** |
| tax-refund-rebate | GENERIC-TAX | 666,500 | hm revenue & customs tax refund (40,500) | 0-48 | £9.84 | none | no GSC presence | taxfix.com pos 14 (guide/page) | guide/tool | **NOT-OURS** |
| sdlt-rates-guide | SDLT | 387,000 | stamp duty (74,000) | 0-57 | £2.35 | /resources/stamp-duty hub + blogs | pos 8.0 ('sdlt transfer property to limited company ') | rossmartin.co.uk pos 6 (guide/page) | pillar guide + rates tables | **HAVE-NEEDS-UPGRADE** |
| cgt-guide | CGT | 382,600 | capital gains tax (49,500) | 5-17 | £8.18 | /resources/capital-gains hub | pos 37.3 ('cgt payment dates') | taxfix.com pos 7 (guide/page) | pillar guide | **HAVE-NEEDS-UPGRADE** |
| land-registry | NAVIGATIONAL | 374,900 | registration of land (165,000) | 11-45 | £5.71 | none | no GSC presence | dnsassociates.co.uk pos 11 (core page) | nav target | **NOT-OURS** |
| tax-codes | GENERIC-TAX | 313,400 | tax codes (27,100) | 0-46 | £10.51 | none | no GSC presence | taxfix.com pos 7 (calculator) | reference | **NOT-OURS** |
| tax-return-generic | GENERIC-TAX | 310,500 | self-assessment tax return (74,000) | 1-81 | £18.24 | none | no GSC presence | taxfix.com pos 8 (guide/page) | guide | **NOT-OURS** |
| corporation-tax | COMPANY | 273,000 | corporation tax (22,200) | 0-36 | £29.74 | /calculators/corporation-tax-calculator (tool) | pos 74.7 ('income and corporation tax') | getground.co.uk pos 3 (help centre) | calculator + rates guide | **NOT-OURS** |
| btl-mortgage-rates | MORTGAGE | 233,810 | btl mortgage (33,100) | 0-22 | £10.69 | none | pos 74.1 ('buy to let mortgage rates') | uklandlordtax.co.uk pos 49 (calculator) | rate tables/broker | **NOT-OURS** |
| dividend-tax | COMPANY | 223,000 | dividend tax rate (18,100) | 0-9 | £2.57 | /calculators/dividend-tax-calculator (tool) | no GSC presence | taxfix.com pos 7 (guide/page) | calculator + rates | **NOT-OURS** |
| tenancy-deposit-schemes | LANDLORD-LEGAL | 178,200 | tenancy deposit scheme (49,500) | n/a | n/a | none | no GSC presence | landlordstudio.com pos 16 (guide/page) | nav/reference | **NOT-OURS** |
| btl-mortgage-calculator | MORTGAGE | 155,620 | buy-to let repayment mortgage calculator (22,200) | 0-19 | £5.20 | /calculators/buy-to-let-mortgage-calculator | pos 96.4 ('buy to let calculator') | uklandlordtax.co.uk pos 1 (calculator) | calculator | **HAVE-NEEDS-UPGRADE** |
| cgt-calculator | CGT | 127,100 | property gains tax calculator (14,800) | n/a | n/a | /calculators/capital-gains-tax-calculator | no GSC presence | taxfix.com pos 4 (calculator) | calculator | **HAVE-NEEDS-UPGRADE** |
| non-resident-landlord | NRL | 124,800 | nrls (110,000) | n/a | n/a | /services/non-resident-landlord + NRL blog set | pos 7.2 ('nrl quarterly return') | landlordzone.co.uk pos 23 (guide/page) | guide hub | **HAVE-WINNING** |
| right-to-rent | LANDLORD-LEGAL | 116,100 | right to rent share code (49,500) | 22-24 | £5.17 | none | no GSC presence | landlordstudio.com pos 6 (guide/page) | nav (gov share code) | **NOT-OURS** |
| mtd-landlords | MTD | 114,800 | making tax digital (90,500) | 14-50 | £28.08 | /making-tax-digital-landlords pillar + /calculators/mtd-checker + /resources/mtd hub | pos 26.9 ('mtd compatible landlord software') | rossmartin.co.uk pos 19 (guide/page) | help-centre scale hub + checker tool | **HAVE-NEEDS-UPGRADE** |
| sdlt-first-time-buyer | SDLT | 104,900 | first time buyer stamp duty (18,100) | n/a | n/a | /calculators/first-time-buyer-stamp-duty-calculator | pos 86.4 ('first time buyer stamp duty') | ukpropertyaccountants.co.uk pos 32 (guide/page) | calculator + guide | **HAVE-NEEDS-UPGRADE** |
| cgt-rates-allowance | CGT | 100,700 | capital gains tax rates (14,800) | n/a | n/a | blog (cgt-annual-exempt-amount) | pos 5.6 ('gov.uk capital gains tax annual exempt amo') | rossmartin.co.uk pos 4 (guide/page) | rates/allowance reference | **HAVE-NEEDS-UPGRADE** |
| self-assessment-pay-deadline | SELF-ASSESSMENT | 98,100 | pay self assessment tax (14,800) | 0-26 | £3.14 | none | no GSC presence | rossmartin.co.uk pos 14 (blog post) | guide | **NOT-OURS** |
| sdlt-second-home | SDLT | 90,100 | second home stamp duty (14,800) | 9-9 | £0.68 | stamp-duty-calculator (second-home toggle only) | pos 75.7 ('how to claim back second home stamp duty') | uklandlordtax.co.uk pos 23 (calculator) | dedicated calculator/guide | **MISSING-BUILD** |
| tenancy-agreement | LANDLORD-LEGAL | 76,200 | contract tenancy agreement (14,800) | n/a | n/a | none | no GSC presence | landlordstudio.com pos 22 (guide/page) | template download | **MISSING-BUILD** |
| iht-threshold | IHT | 69,000 | inheritance tax threshold (18,100) | 12-28 | £3.57 | none | pos 40.0 ('inheritance tax mitigation strategies for ') | taxfix.com pos 51 (guide/page) | rates/threshold reference | **NOT-OURS** |
| property-tax-uk-head | LANDLORD-TAX | 67,000 | property tax (8,100) | 0-28 | £2.52 | /property-tax-rates pillar | no GSC presence | geraldedelman.com pos 6 (guide/page) | pillar guide | **HAVE-NEEDS-UPGRADE** |
| renters-rights-bill | LANDLORD-LEGAL | 61,500 | renters right bill (40,500) | n/a | n/a | none | no GSC presence | landlordstudio.com pos 17 (guide/page) | explainer hub | **MISSING-BUILD** |
| self-assessment-register | SELF-ASSESSMENT | 61,500 | register self assessment (18,100) | n/a | n/a | none | no GSC presence | rossmartin.co.uk pos 7 (guide/page) | guide | **NOT-OURS** |
| bridging-loans | FINANCE | 54,300 | bridging lending (18,100) | n/a | n/a | /calculators/bridging-loan-calculator | pos 39.2 ('bridging loan rates') | dnsassociates.co.uk pos 39 (core page) | calculator + guide | **HAVE-NEEDS-UPGRADE** |
| mortgage-affordability | MORTGAGE | 54,300 | how much would i get mortgage (12,100) | n/a | n/a | none | no GSC presence | dnsassociates.co.uk pos 28 (calculator) | calculator | **NOT-OURS** |
| self-assessment-contact | SELF-ASSESSMENT | 53,900 | hmrc tax self assessment contact number (12,100) | n/a | n/a | none | no GSC presence | rossmartin.co.uk pos 7 (guide) | reference | **NOT-OURS** |
| hmo-licensing | HMO | 49,300 | hmo meaning (40,500) | 8-8 | £5.08 | HMO blog content only | pos 9.8 ('hmo accountants') | landlordstudio.com pos 92 (guide/page) | hub + licence-checker angle | **MISSING-BUILD** |
| interest-only-mortgage-calc | MORTGAGE | 48,400 | interest only mortgage calculator (12,100) | n/a | n/a | none | no GSC presence | uklandlordtax.co.uk pos 14 (calculator) | calculator | **MISSING-BUILD** |
| rental-yield-calculator | INVEST | 43,860 | calculator rental yield (2,400) | 3-29 | £6.65 | /calculators/rental-yield-calculator | pos 79.3 ('rental yield calculator') | none in tracked set | calculator + how-to | **HAVE-NEEDS-UPGRADE** |
| rent-guarantor | LANDLORD-LEGAL | 41,800 | guarantor (14,800) | n/a | n/a | none | no GSC presence | landlordzone.co.uk pos 11 (guide/page) | guide | **NOT-OURS** |
| section-21-8-eviction | LANDLORD-LEGAL | 32,100 | section 21a notice (22,200) | n/a | n/a | none | no GSC presence | landlordzone.co.uk pos 60 (guide/page) | legal guides | **NOT-OURS** |
| ltd-co-buy-to-let | COMPANY | 30,410 | limited company buy to let mortgage lenders (2,400) | 0-4 | £14.72 | /incorporation pillar (tax angle only) | pos 59.8 ('create btl limited company uk') | none in tracked set | hub: guide + mortgage-lender angle | **HAVE-NEEDS-UPGRADE** |
| iht-calculator | IHT | 29,700 | calculating iht (9,900) | n/a | n/a | none | no GSC presence | rossmartin.co.uk pos 15 (guide/page) | calculator | **NOT-OURS** |
| lbtt-scotland | SDLT | 26,800 | lbtt calculator (9,900) | 23-23 | £0.30 | /calculators/lbtt-calculator + Scottish LBTT blog set | pos 6.2 ('revenue scotland non-residential lbtt rate') | ukpropertyaccountants.co.uk pos 25 (calculator) | calculator + rates | **HAVE-WINNING** |
| landlord-certificates | LANDLORD-LEGAL | 24,600 | eicr certificate (18,100) | 44-44 | £4.53 | none | no GSC presence | landlordstudio.com pos 38 (guide/page) | compliance hub | **MISSING-BUILD** |
| property-investment | INVEST | 22,000 | business property rental (14,800) | n/a | n/a | none | pos 32.5 ('property investment accountant in london') | dnsassociates.co.uk pos 14 (blog post) | n/a | **NOT-OURS** |
| leasehold-reform | LEASEHOLD | 19,700 | leasehold reform (9,900) | 0-0 | £0.27 | SDLT lease-extension blog only | pos 38.0 ('capital allowances on leasehold property i') | getground.co.uk pos 46 (guide/page) | explainer guide | **MISSING-BUILD** |
| iht400-forms | IHT | 16,900 | iht400 (8,100) | n/a | n/a | none | no GSC presence | ukpropertyaccountants.co.uk pos 32 (guide/page) | form guide | **NOT-OURS** |
| landlord-tenant-act | LANDLORD-LEGAL | 16,600 | landlord and tenant act 1985 (3,600) | 0-31 | £6.09 | none | no GSC presence | landlordstudio.com pos 4 (guide/page) | legal reference | **NOT-OURS** |
| iht-pensions | IHT | 16,300 | inheritance tax on pensions (8,100) | 1-13 | £2.28 | none | no GSC presence | none in tracked set | explainer | **NOT-OURS** |
| capital-allowances | COMPANY | 16,200 | enhanced capital allowances (8,100) | n/a | n/a | /calculators/capital-allowances-calculator | pos 64.6 ('property capital allowance') | rossmartin.co.uk pos 20 (guide/page) | calculator + guide | **HAVE-NEEDS-UPGRADE** |
| landlord-registration-scot | LANDLORD-LEGAL | 15,600 | landlord registration scotland (6,600) | 0-9 | £14.23 | none | no GSC presence | none in tracked set | compliance guide | **MISSING-BUILD** |
| ltt-wales | SDLT | 14,500 | stamp duty wales (4,400) | 14-15 | £1.31 | /calculators/ltt-calculator | pos 2.8 ('stamp duty wales') | uklandlordtax.co.uk pos 14 (calculator) | calculator + rates | **HAVE-WINNING** |
| sdlt-commercial | SDLT | 13,700 | commercial stamp duty calculator (3,600) | 0-0 | £1.61 | none | no GSC presence | uklandlordtax.co.uk pos 25 (calculator) | calculator | **MISSING-BUILD** |
| iht-farmers-apr | IHT | 8,800 | farmers inheritance tax (4,400) | 27-27 | £5.23 | none | no GSC presence | ukpropertyaccountants.co.uk pos 51 (guide/page) | data-led guide | **MISSING-BUILD** |
| pcm-meaning | LANDLORD-LEGAL | 8,000 | pcm meaning rent (4,400) | n/a | n/a | none | no GSC presence | landlordstudio.com pos 49 (guide/page) | definition | **NOT-OURS** |
| rent-to-own-schemes | INVEST | 7,600 | rent to buy shared ownership (4,400) | 3-24 | £2.10 | none | no GSC presence | ukpropertyaccountants.co.uk pos 85 (guide/page) | consumer guides | **NOT-OURS** |
| empty-property-council-tax | LANDLORD-LEGAL | 7,200 | council tax for unoccupied property (3,600) | n/a | n/a | none | no GSC presence | thp.co.uk pos 22 (guide/page) | explainer | **MISSING-BUILD** |
| landlord-tax-guide | LANDLORD-TAX | 7,100 | landlord tax (2,900) | 1-14 | £4.33 | /landlord-tax pillar | pos 10.0 ('landlord tax advice leeds') | none in tracked set | pillar guide | **HAVE-NEEDS-UPGRADE** |
| section-24 | LANDLORD-TAX | 6,640 | section 24 (1,300) | 0-17 | £5.36 | /section-24 pillar + /calculators/section-24-calculator | pos 45.7 ('section 24 mortgage interest relief strate') | none in tracked set | pillar + calculator | **HAVE-NEEDS-UPGRADE** |
| how-to-rent-guide | LANDLORD-LEGAL | 6,600 | how to rent guide (6,600) | n/a | n/a | none | no GSC presence | landlordzone.co.uk pos 17 (guide/page) | nav (gov guide) | **NOT-OURS** |
| landlord-insurance | LANDLORD-LEGAL | 6,600 | direct line landlords insurance (6,600) | n/a | n/a | none | no GSC presence | landlordzone.co.uk pos 22 (guide/page) | broker | **NOT-OURS** |
| cgt-property | CGT | 5,500 | capital gains tax on property (3,600) | 1-1 | £2.52 | CGT blog set | pos 60.7 ('property incorporation capital gains tax') | ukpropertyaccountants.co.uk pos 32 (guide/page) | guide | **HAVE-NEEDS-UPGRADE** |
| landlord-associations | LANDLORD-LEGAL | 5,400 | national landlords association (4,400) | 28-28 | £2.94 | none | no GSC presence | landlordzone.co.uk pos 22 (guide/page) | nav | **NOT-OURS** |
| rent-a-room | LANDLORD-TAX | 5,400 | rent a room scheme (5,400) | n/a | n/a | /calculators/rent-a-room-relief-calculator + blog | pos 7.5 ('rent a room allowance 2026/27') | thp.co.uk pos 13 (guide/page) | calculator + guide | **HAVE-WINNING** |
| declaration-of-trust | LANDLORD-TAX | 5,400 | declaration of trust (5,400) | n/a | n/a | none | no GSC presence | uklandlordtax.co.uk pos 29 (guide/page) | guide (+ form 17) | **MISSING-BUILD** |
| property-management | LANDLORD-LEGAL | 4,400 | property management company (4,400) | 24-24 | £6.67 | none | pos 31.3 ('property management accountants') | none in tracked set | n/a | **NOT-OURS** |
| second-home-tax-premium | LANDLORD-TAX | 4,300 | council tax on second homes (2,400) | 4-8 | £0.26 | none | no GSC presence | none in tracked set | explainer | **MISSING-BUILD** |
| holiday-let-tax | HOLIDAY-LET | 3,400 | holiday tax (2,400) | 0-1 | £15.86 | holiday-let blog content | pos 43.5 ('how much is tax when buying a holiday let') | none in tracked set | guide hub | **HAVE-NEEDS-UPGRADE** |

## Below-floor clusters (< 3,000/mo total, listed for completeness)

| Cluster | Lane | Total vol/mo | Representative keyword (vol) | KD range | CPC (max) | Our asset | Our GSC position (90d) | Best competitor | SERP demands | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|
| landlord-software | LANDLORD-LEGAL | 2,400 | landlord vision (2,400) | 7-7 | £1.09 | none | no GSC presence | none in tracked set | n/a | **NOT-OURS** |
| directors-loan | COMPANY | 1,900 | s455 tax (1,900) | 0-0 | n/a | s455 blog | pos 8.1 ('cta 2010 s455 rate 33.75% 2025') | none in tracked set | guide | **HAVE-WINNING** |
| incorporation | COMPANY | 1,450 | incorporation relief (880) | 0-0 | £10.63 | /incorporation pillar + /calculators/incorporation-cost-calculator + /resources/incorporation hub | pos 27.5 ('landlord portfolio incorporation uk') | none in tracked set | pillar + calculator | **HAVE-NEEDS-UPGRADE** |
| iht-property-guide | IHT | 1,300 | inheritance tax on property (1,300) | 23-23 | £2.50 | none | no GSC presence | none in tracked set | guide | **MISSING-BUILD** |
| landlord-expenses | LANDLORD-TAX | 1,140 | landlord allowable expenses (260) | 0-7 | £3.98 | blog content | pos 24.5 ('landlord expenses spreadsheet') | none in tracked set | guide + downloadable | **HAVE-NEEDS-UPGRADE** |

Notes on below-floor lanes: incorporation and landlord-expenses are long-tail lanes, not head lanes; DataForSEO shows no >= 3k heads for them despite being brand-core. They stay wave-content lanes. rental-income-tax-calculator as a head ('landlord tax calculator', KD 1) reports volume below the floor in every pull despite Landlord Studio and Taxfix both fielding rental income tax calculators; our bespoke tool already exists at /calculators/rental-income-tax-calculator.

## Competitor tool inventory (context for asset-shape verdicts)

- **landlordstudio.com**: ~20 calculators (rental income tax, SDLT, yield) + landlord legal/compliance library; captures tenancy-agreement, right-to-rent, landlord-tenant-act heads with templates and references.
- **provestor.co.uk**: calculators + a full MTD help centre + guide hubs; the model for the MTD upgrade.
- **getground.co.uk**: SDLT and BTL-earnings calculators + AI property analyser; takes 'corporation tax' at pos 3, proof a property brand can hold generalist company-tax heads.
- **taxfix.com**: consumer calculator suite incl a rental income tax calculator; dominates generic income tax/CGT/IHT heads (pos 3-7).
- **uklandlordtax.co.uk**: closest analogue; BTL stamp duty calculator (pos 10 on the 301k head), interest-only BTL mortgage calculator (pos 1 on the 22k head), declaration of trust guide.
- **rossmartin.co.uk**: practitioner guide depth; takes rates/reference heads (CGT rates pos 4, SDLT pos 6, SA registration pos 7).

## Summary

### (a) Verdict counts (main table, 70 clusters)

- HAVE-WINNING: 4
- HAVE-NEEDS-UPGRADE: 17
- MISSING-BUILD: 13
- NOT-OURS: 36
- Below floor: 5 (landlord-software, directors-loan, incorporation, iht-property-guide, landlord-expenses)

### (b) Build list (volume x feasibility)

MISSING-BUILD, in build order (volume x feasibility: tax-core, low-KD, open-SERP builds first; non-tax lead magnets last despite volume):

1. **sdlt-second-home** (90,100/mo, dedicated calculator/guide): 14.8k head x 5 variants, KD 9. GSC pos 76. optimiseaccountants + uklandlordtax hold dedicated second-home SDLT pages; we have no dedicated asset.
2. **hmo-licensing** (49,300/mo, hub + licence-checker angle): 'hmo meaning' 40.5k at KD 8; best competitor position is 92 - effectively unclaimed. GSC pos 9.8 on 'hmo accountants' shows authority. Build the HMO licensing/tax hub.
3. **renters-rights-bill** (61,500/mo, explainer hub): live legislation. Landlord Studio pos 17. Landlord-compliance fit; tax angle via landlord cost impact.
4. **interest-only-mortgage-calc** (48,400/mo, calculator): uklandlordtax pos 14 via its interest-only BTL calculator. Natural extension of our BTL mortgage tool; landlord-relevant.
5. **sdlt-commercial** (13,700/mo, calculator): incl 'commercial stamp duty calculator' 3.6k, KD 0. uklandlordtax pos 25. Natural variant of our SDLT calculator.
6. **landlord-registration-scot** (15,600/mo, compliance guide): KD 0-9, NO competitor in our set ranks. Pairs with our Scottish LBTT strength.
7. **leasehold-reform** (19,700/mo, explainer guide): LFRA 2024 in force; 9.9k 'leasehold reform' at KD 0, GetGround pos 46. We already hold LFRA ground truth from Wave 11 work.
8. **declaration-of-trust** (5,400/mo, guide (+ form 17)): classic landlord income-split planning. uklandlordtax pos 29 = open.
9. **iht-farmers-apr** (8,800/mo, data-led guide): APR GBP2.5m cap Apr 2026 is our verified ground truth. ukpropertyaccountants pos 51 = open SERP. Property-tax fit.
10. **empty-property-council-tax** (7,200/mo, explainer): empty-property premiums hit landlords directly. thp pos 22.
11. **second-home-tax-premium** (4,300/mo, explainer): KD 4-8, no competitor in set ranks. Council-tax premium on second homes; pairs with second-home SDLT asset.
12. **tenancy-agreement** (76,200/mo, template download): Landlord Studio captures with a free AST template. Non-tax lead magnet; high volume but weakest brand fit in the build list, hence late slot.
13. **landlord-certificates** (24,600/mo, compliance hub): eicr certificate 18.1k + gas safety + selective licensing. Landlord Studio pos 38. Compliance-hub fit, low priority vs tax builds.

HAVE-NEEDS-UPGRADE, in upgrade order:

1. **sdlt-calculator** (1,402,100/mo, our: /calculators/stamp-duty-calculator): Bespoke page exists; GSC pos 15 only on a long-tail lease-extension query. uklandlordtax pos 10 on the 301k head with a BTL-angle calculator.
2. **sdlt-rates-guide** (387,000/mo, our: /resources/stamp-duty hub + blogs): GSC pos 8 on an incorporation-SDLT long-tail; the 74k 'stamp duty' head itself uncaptured. rossmartin pos 6.
3. **cgt-guide** (382,600/mo, our: /resources/capital-gains hub): Hub exists; GSC pos 37 on 'cgt payment dates'. Taxfix pos 7 on the 49.5k head.
4. **btl-mortgage-calculator** (155,620/mo, our: /calculators/buy-to-let-mortgage-calculator): uklandlordtax pos 1 with a dedicated interest-only BTL mortgage calculator; our tool sits at GSC pos 96. Highest-value single upgrade in the mortgage-adjacent set.
5. **cgt-calculator** (127,100/mo, our: /calculators/capital-gains-tax-calculator): Tool exists, zero GSC presence on the head. Taxfix pos 4. Needs a property-CGT-specific bespoke page (60-day reporting, PRR, lettings relief).
6. **mtd-landlords** (114,800/mo, our: /making-tax-digital-landlords pillar + /calculators/mtd-checker + /resources/mtd hub): GSC pos 27. Provestor runs a full MTD help centre; rossmartin pos 19. April 2026 mandation makes this the most time-sensitive upgrade.
7. **sdlt-first-time-buyer** (104,900/mo, our: /calculators/first-time-buyer-stamp-duty-calculator): Tool exists, GSC pos 86. ukpropertyaccountants pos 32 - head is winnable.
8. **cgt-rates-allowance** (100,700/mo, our: blog (cgt-annual-exempt-amount)): GSC pos 5.6 on the AEA long-tail; rossmartin pos 4 on the 14.8k rates head. Promote to an evergreen rates asset.
9. **property-tax-uk-head** (67,000/mo, our: /property-tax-rates pillar): Pillar exists, zero GSC on the 8.1k 'property tax' head family. geraldedelman pos 6. This head IS our brand.
10. **bridging-loans** (54,300/mo, our: /calculators/bridging-loan-calculator): Tool exists, GSC pos 39. dnsassociates pos 39 too - head is open.
11. **rental-yield-calculator** (43,860/mo, our: /calculators/rental-yield-calculator): Tool exists, GSC pos 79. Head 2.4k x many variants at KD 13-27; no competitor in our set captures it. Landlord Studio does off-set.
12. **ltd-co-buy-to-let** (30,410/mo, our: /incorporation pillar (tax angle only)): 30.4k across 43 variants, KD 0 on most. Demand splits tax (ours, GSC pos 60) and ltd-co BTL mortgages (GetGround territory). Upgrade the tax-side hub; skip lender content.
13. **capital-allowances** (16,200/mo, our: /calculators/capital-allowances-calculator): GSC pos 64.6 on 'property capital allowance'. FA 2026 changes (WDA 14%, 40% FYA) give a freshness edge. 'enhanced capital allowances' 8.1k.
14. **landlord-tax-guide** (7,100/mo, our: /landlord-tax pillar): The brand head. 'landlord tax' head itself small (2.9k) but pillar should own it; GSC pos 10 only on a Leeds long-tail.
15. **section-24** (6,640/mo, our: /section-24 pillar + /calculators/section-24-calculator): Head 'section 24' 1.3k KD 1 + 24 variants; GSC pos 45.7. No competitor in set ranks. Should be trivially winnable given the dedicated pillar.
16. **cgt-property** (5,500/mo, our: CGT blog set): 'capital gains tax on property' 3.6k KD 1; GSC pos 60.7. Fold into CGT hub upgrade.
17. **holiday-let-tax** (3,400/mo, our: holiday-let blog content): FHL regime abolished Apr 2025; heads small (below floor individually) but lane is brand-core. GSC pos 43.5.

### (c) Addressable head volume

- In-scope clusters (HAVE-* + MISSING-BUILD, main table): **3,605,530/mo** on the variant-summed basis, **940,600/mo** on the representative-keyword basis (the honest floor).
- Of which MISSING-BUILD: 424,800/mo variant-summed.
- Baseline: ~402k/mo currently addressed. The map shows the in-scope head surface is several times that baseline even on conservative counting; the single biggest levers are the SDLT calculator head family and the CGT family, both of which we already have assets for and rank nowhere on.
- Deliberately left on the table (NOT-OURS): 27,192,410/mo variant-summed, dominated by generic income tax calculators, HMRC navigational, consumer mortgages, and wills-probate-sibling IHT heads.

### (d) DataForSEO spend

- 8x keyword_ideas/live at $0.096 actual = $0.768
- 6x keyword_suggestions/live, $0.183 actual total
- **Task total: $0.95 actual** (budget cap for this task: ~$2.50; all other inputs DB-resident and free).
