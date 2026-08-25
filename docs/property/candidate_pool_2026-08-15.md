# Candidate Pool — property

Generated: 2026-08-15  
Mode: dry-run (free sources only)  
Merged candidates: 6002  
Pillar-overlap rejected: 372  
**Survivors (scored): 5630**

---

## Per-source raw counts (pre-merge, pre-reject)

| Source | Raw candidates |
|---|---:|
| sitemap | 15023 |
| dfs_ranked | 8021 |
| dfs_intersection | 0 |
| gsc | 600 |
| autocomplete | 0 |
| bing_kw | 292 |

## Caps / drops applied

- autocomplete: source CSV not found for this site, skipped
- gsc: 74 candidates excluded (serving page < 60d old)
- sitemap: 1357 URLs dropped (<3 slug tokens)
- dfs_intersection: paid-only, 0 in dry-run (no distinguishable persisted rows)
- bing_kw: 200 candidates dropped (lane gate, no topical token match) — e.g. companies house; capital gains tax account login; sa108 notes; hmrc cgt login; sa108; sprift property login; intellectual property; property finder; zoopla property search; intellectual property office
- dfs_ranked: 4363 candidates dropped (lane gate, no topical token match) — e.g. letting hub; lettings hub; contact hmrc phone number; hmrc call number; hmrc helpline number; hmrc number contact; hmrc phone numbers; hmrc telephone number; calculate take home salary; take home pay calculator
- sitemap: 11014 candidates dropped (lane gate, no topical token match) — e.g. 122 consultation cchtest; 2024 autumn budget summary for landlords; 2024 spring budget landlords; 5 changes to property taxes in 2020 21; a complete guide to let property campaign; a guide for directors of limited companies know your boundaries before you act; a landlords guide to the trading property allowances; abolition furnished holiday lettings tax; meet the team; smoke and carbon monoxide alarms
- SERP winnability verified for top 40 of 5630 by provisional score (N=40); rest use neutral placeholder 0.75
- report truncated to top 150 of 5630 survivors

## Per-source ingest detail

- **sitemap**: {'file_found': True, 'raw_urls': 16380, 'kept': 15023, 'dropped_short_tokens': 1357}
- **dfs_ranked**: {'paid_calls': 0, 'errors': 0, 'persisted_rows': 8021}
- **dfs_intersection**: {'paid_calls': 0, 'errors': 0}
- **gsc**: {'immature_excluded': 74, 'age_unknown': 153}
- **bing_kw**: {'seeds': 10, 'errors': 0}

---

## Top 150 candidates by score

| # | Candidate | Lane | Source | Sources | Vol | KD | CPC | Intent | Win | Novelty | Score |
|---|---|---|---|---|---:|---:|---:|---|---:|---:|---:|
| 1 | stamp duty calculator | sdlt | sitemap | sitemap,dfs_ranked | 246000 | - | 0.37 | transactional | 1.0 | 0.5 | 184500.0 |
| 2 | stamp duty estimator | sdlt | dfs_ranked | dfs_ranked | 246000 | - | 0.37 | informational | 1.0 | 0.5 | 123000.0 |
| 3 | nrls | non_resident | dfs_ranked | dfs_ranked | 110000 | - | 5.95 | informational | 1.0 | 1.0 | 110000.0 |
| 4 | mortgage loan repayment calculator | finance_mortgages | dfs_ranked | dfs_ranked | 90500 | - | 0.86 | transactional | 1.0 | 0.8 | 108600.0 |
| 5 | mortgage repayment calculator | finance_mortgages | dfs_ranked | dfs_ranked | 90500 | - | 0.86 | transactional | 1.0 | 0.75 | 101812.5 |
| 6 | calculate stamp duty | sdlt | dfs_ranked | dfs_ranked | 246000 | - | 0.37 | informational | 0.5 | 0.5 | 61500.0 |
| 7 | h m r c self assessment | landlord_ops | dfs_ranked | dfs_ranked | 110000 | - | 4.28 | informational | 1.0 | 0.5 | 55000.0 |
| 8 | self assessment | landlord_ops | dfs_ranked | dfs_ranked | 90500 | - | 5.99 | informational | 1.0 | 0.5 | 45250.0 |
| 9 | sdlt calculator | sdlt | dfs_ranked | dfs_ranked,gsc | 40500 | - | 0.84 | transactional | 1.0 | 0.667 | 40520.25 |
| 10 | inheritance tax | iht_estate | dfs_ranked | dfs_ranked | 110000 | - | 1.59 | informational | 0.5 | 0.667 | 36685.0 |
| 11 | stamp duty calculator england | sdlt | dfs_ranked | dfs_ranked | 60500 | - | 0.28 | transactional | 0.5 | 0.6 | 27225.0 |
| 12 | england stamp duty calculator | sdlt | dfs_ranked | dfs_ranked | 60500 | - | 0.28 | transactional | 0.5 | 0.6 | 27225.0 |
| 13 | calculate sdlt | sdlt | dfs_ranked | dfs_ranked | 40500 | - | 0.84 | informational | 1.0 | 0.667 | 27013.5 |
| 14 | isa accounts | landlord_ops | dfs_ranked | dfs_ranked | 40500 | - | 8.65 | informational | 1.0 | 0.667 | 27013.5 |
| 15 | find vat number | vat_commercial | dfs_ranked | dfs_ranked | 33100 | - | 6.74 | informational | 1.0 | 0.75 | 24825.0 |
| 16 | check vat id | vat_commercial | dfs_ranked | dfs_ranked | 33100 | - | 6.74 | informational | 1.0 | 0.75 | 24825.0 |
| 17 | ltd | incorporation_structures | dfs_ranked | dfs_ranked | 33100 | - | 15.31 | informational | 1.0 | 0.75 | 24825.0 |
| 18 | validating vat numbers | vat_commercial | dfs_ranked | dfs_ranked | 33100 | - | 6.74 | informational | 1.0 | 0.75 | 24825.0 |
| 19 | stamp duty calculator uk | sdlt | dfs_ranked | dfs_ranked | 60500 | - | 0.28 | transactional | 0.5 | 0.5 | 22687.5 |
| 20 | uk stamp duty calculator | sdlt | dfs_ranked | dfs_ranked | 60500 | - | 0.28 | transactional | 0.5 | 0.5 | 22687.5 |
| 21 | vat number checker | vat_commercial | dfs_ranked | dfs_ranked | 33100 | - | 6.74 | informational | 0.75 | 0.75 | 18618.75 |
| 22 | vat number lookup | vat_commercial | dfs_ranked | dfs_ranked | 33100 | - | 6.74 | informational | 0.75 | 0.75 | 18618.75 |
| 23 | vat number verification | vat_commercial | dfs_ranked | dfs_ranked | 33100 | - | 6.74 | informational | 0.75 | 0.75 | 18618.75 |
| 24 | verify vat number | vat_commercial | dfs_ranked | dfs_ranked | 33100 | - | 6.74 | informational | 0.75 | 0.75 | 18618.75 |
| 25 | tenancy deposit scheme | compliance_licensing | sitemap | sitemap,dfs_ranked | 49500 | - | 1.76 | informational | 0.5 | 0.75 | 18562.5 |
| 26 | file self assessment tax return | landlord_ops | dfs_ranked | dfs_ranked | 74000 | - | 7.35 | informational | 0.5 | 0.5 | 18500.0 |
| 27 | stamp duty | sdlt | dfs_ranked | dfs_ranked | 74000 | - | 0.34 | informational | 0.75 | 0.333 | 18481.5 |
| 28 | stamp duty land tax calculator | sdlt | dfs_ranked | dfs_ranked | 40500 | - | 0.84 | transactional | 0.5 | 0.6 | 18225.0 |
| 29 | check vat registration number | vat_commercial | dfs_ranked | dfs_ranked | 33100 | - | 6.74 | informational | 0.75 | 0.714 | 17725.05 |
| 30 | vat registration number check | vat_commercial | dfs_ranked | dfs_ranked | 33100 | - | 6.74 | informational | 0.75 | 0.714 | 17725.05 |
| 31 | mortgage pay calculator | finance_mortgages | dfs_ranked | dfs_ranked | 18100 | - | 1.41 | transactional | 0.75 | 0.75 | 15271.875 |
| 32 | paying mortgage calculator | finance_mortgages | dfs_ranked | dfs_ranked | 18100 | - | 1.41 | transactional | 0.75 | 0.75 | 15271.875 |
| 33 | repayment calculator mortgage uk | finance_mortgages | dfs_ranked | dfs_ranked | 18100 | - | 1.38 | transactional | 0.75 | 0.75 | 15271.875 |
| 34 | licensing | compliance_licensing | dfs_ranked | dfs_ranked | 40500 | - | 3.98 | informational | 0.75 | 0.5 | 15187.5 |
| 35 | calculate stamp duty uk | sdlt | dfs_ranked | dfs_ranked | 60500 | - | 0.28 | informational | 0.5 | 0.5 | 15125.0 |
| 36 | tax return | landlord_ops | dfs_ranked | dfs_ranked,bing_kw | 60500 | - | 4.85 | informational | 0.5 | 0.5 | 15125.0 |
| 37 | self assessment tax returns | landlord_ops | sitemap | sitemap,dfs_ranked | 74000 | - | 7.35 | informational | 0.5 | 0.4 | 14800.0 |
| 38 | self assessment return | landlord_ops | dfs_ranked | dfs_ranked | 74000 | - | 7.35 | informational | 0.5 | 0.4 | 14800.0 |
| 39 | self assessment returns | landlord_ops | dfs_ranked | dfs_ranked | 74000 | - | 7.35 | informational | 0.5 | 0.4 | 14800.0 |
| 40 | tax return and self assessment | landlord_ops | dfs_ranked | dfs_ranked | 74000 | - | 7.35 | informational | 0.5 | 0.4 | 14800.0 |
| 41 | self assessment tax return | landlord_ops | dfs_ranked | dfs_ranked | 74000 | - | 7.35 | informational | 0.5 | 0.4 | 14800.0 |
| 42 | self-assessment tax return | landlord_ops | dfs_ranked | dfs_ranked | 74000 | - | 7.35 | informational | 0.5 | 0.4 | 14800.0 |
| 43 | tax return self assessment | landlord_ops | dfs_ranked | dfs_ranked | 74000 | - | 7.35 | informational | 0.5 | 0.4 | 14800.0 |
| 44 | vat check | vat_commercial | dfs_ranked | dfs_ranked | 27100 | - | 6.39 | informational | 0.75 | 0.667 | 13556.775 |
| 45 | vat checker | vat_commercial | dfs_ranked | dfs_ranked | 27100 | - | 6.39 | informational | 0.75 | 0.667 | 13556.775 |
| 46 | vat checks | vat_commercial | dfs_ranked | dfs_ranked | 27100 | - | 6.39 | informational | 0.75 | 0.667 | 13556.775 |
| 47 | cgt uk | cgt_disposal | dfs_ranked | dfs_ranked | 22200 | - | 2.40 | informational | 0.75 | 0.75 | 12487.5 |
| 48 | find a vat number | vat_commercial | dfs_ranked | dfs_ranked | 33100 | - | 6.74 | informational | 0.5 | 0.75 | 12412.5 |
| 49 | finding vat number | vat_commercial | dfs_ranked | dfs_ranked | 33100 | - | 6.74 | informational | 0.5 | 0.75 | 12412.5 |
| 50 | check a vat number | vat_commercial | dfs_ranked | dfs_ranked | 33100 | - | 6.74 | informational | 0.5 | 0.75 | 12412.5 |
| 51 | check vat number | vat_commercial | dfs_ranked | dfs_ranked | 33100 | - | 6.74 | informational | 0.5 | 0.75 | 12412.5 |
| 52 | search vat number | vat_commercial | dfs_ranked | dfs_ranked | 33100 | - | 6.74 | informational | 0.5 | 0.75 | 12412.5 |
| 53 | validate a vat number | vat_commercial | dfs_ranked | dfs_ranked | 33100 | - | 6.74 | informational | 0.5 | 0.75 | 12412.5 |
| 54 | vat no checker | vat_commercial | dfs_ranked | dfs_ranked | 33100 | - | 6.74 | informational | 0.5 | 0.75 | 12412.5 |
| 55 | vat number check | vat_commercial | dfs_ranked | dfs_ranked | 33100 | - | 6.74 | informational | 0.5 | 0.75 | 12412.5 |
| 56 | register for vat | vat_commercial | dfs_ranked | dfs_ranked | 22200 | - | 9.25 | informational | 0.75 | 0.667 | 11105.55 |
| 57 | register vat | vat_commercial | dfs_ranked | dfs_ranked | 22200 | - | 9.25 | informational | 0.75 | 0.667 | 11105.55 |
| 58 | registering vat | vat_commercial | dfs_ranked | dfs_ranked | 22200 | - | 9.25 | informational | 0.75 | 0.667 | 11105.55 |
| 59 | vat register | vat_commercial | dfs_ranked | dfs_ranked | 22200 | - | 9.25 | informational | 0.75 | 0.667 | 11105.55 |
| 60 | vat registered | vat_commercial | dfs_ranked | dfs_ranked | 22200 | - | 9.25 | informational | 0.75 | 0.667 | 11105.55 |
| 61 | hsbc mortgage payment calculator | finance_mortgages | dfs_ranked | dfs_ranked | 12100 | - | 2.92 | transactional | 0.75 | 0.8 | 10890.0 |
| 62 | setting up a ltd company | incorporation_structures | dfs_ranked | dfs_ranked | 14800 | - | 51.42 | commercial | 0.75 | 0.714 | 10303.02 |
| 63 | dividend tax rate | incorporation_structures | dfs_ranked | dfs_ranked | 18100 | - | 3.23 | informational | 0.75 | 0.75 | 10181.25 |
| 64 | vat | vat_commercial | dfs_ranked | dfs_ranked | 27100 | - | 9.06 | informational | 0.75 | 0.5 | 10162.5 |
| 65 | buy to let mortgage calculator | - | sitemap | sitemap,dfs_ranked,gsc | 22200 | - | 1.96 | transactional | 0.75 | 0.4 | 9990.0 |
| 66 | buy let mortgage calculator | finance_mortgages | dfs_ranked | dfs_ranked | 22200 | - | 1.96 | transactional | 0.75 | 0.4 | 9990.0 |
| 67 | registration of vat | vat_commercial | dfs_ranked | dfs_ranked | 22200 | - | 9.25 | informational | 0.75 | 0.6 | 9990.0 |
| 68 | vat registration | vat_commercial | dfs_ranked | dfs_ranked | 22200 | - | 9.25 | informational | 0.75 | 0.6 | 9990.0 |
| 69 | ltd company | incorporation_structures | dfs_ranked | dfs_ranked | 14800 | - | 21.38 | commercial | 0.75 | 0.667 | 9624.81 |
| 70 | setting up a limited company | incorporation_structures | dfs_ranked | dfs_ranked | 14800 | - | 51.42 | commercial | 0.75 | 0.667 | 9624.81 |
| 71 | setting up as a limited company | incorporation_structures | dfs_ranked | dfs_ranked | 14800 | - | 51.42 | commercial | 0.75 | 0.667 | 9624.81 |
| 72 | dividend tax rates | incorporation_structures | sitemap | sitemap,dfs_ranked | 18100 | - | 3.23 | informational | 0.75 | 0.667 | 9054.525 |
| 73 | mortgage calculator for interest only loan | finance_mortgages | dfs_ranked | dfs_ranked | 12100 | - | 2.10 | transactional | 0.75 | 0.625 | 8507.812 |
| 74 | interest only loans mortgage calculator | finance_mortgages | dfs_ranked | dfs_ranked | 12100 | - | 2.10 | transactional | 0.75 | 0.625 | 8507.812 |
| 75 | stamp duty first time buyers | sdlt | sitemap | sitemap,dfs_ranked | 18100 | - | 1.00 | informational | 0.75 | 0.625 | 8484.375 |
| 76 | first time buyers and stamp duty | sdlt | dfs_ranked | dfs_ranked | 18100 | - | 1.00 | informational | 0.75 | 0.625 | 8484.375 |
| 77 | stamp duty for first time buyers | sdlt | dfs_ranked | dfs_ranked | 18100 | - | 1.00 | informational | 0.75 | 0.625 | 8484.375 |
| 78 | dividend taxability | incorporation_structures | dfs_ranked | dfs_ranked | 14800 | - | 3.14 | informational | 0.75 | 0.75 | 8325.0 |
| 79 | dividend taxation | incorporation_structures | dfs_ranked | dfs_ranked | 14800 | - | 3.14 | informational | 0.75 | 0.75 | 8325.0 |
| 80 | scotland tax bands | sdlt | dfs_ranked | dfs_ranked | 14800 | - | 5.66 | informational | 0.75 | 0.75 | 8325.0 |
| 81 | tax band scotland | sdlt | dfs_ranked | dfs_ranked | 14800 | - | 5.66 | informational | 0.75 | 0.75 | 8325.0 |
| 82 | tax bands scotland | sdlt | dfs_ranked | dfs_ranked | 14800 | - | 5.66 | informational | 0.75 | 0.75 | 8325.0 |
| 83 | child tax credit | section24 | dfs_ranked | dfs_ranked | 14800 | - | 0.02 | informational | 0.75 | 0.75 | 8325.0 |
| 84 | register for self assessment | landlord_ops | sitemap | sitemap,dfs_ranked | 18100 | - | 6.84 | informational | 0.75 | 0.6 | 8145.0 |
| 85 | enroll for self assessment | landlord_ops | dfs_ranked | dfs_ranked | 18100 | - | 6.84 | informational | 0.75 | 0.6 | 8145.0 |
| 86 | register self assessment | landlord_ops | dfs_ranked | dfs_ranked | 18100 | - | 6.84 | informational | 0.75 | 0.6 | 8145.0 |
| 87 | contract tenancy agreement | compliance_licensing | dfs_ranked | dfs_ranked | 14800 | - | 5.61 | informational | 0.75 | 0.714 | 7925.4 |
| 88 | interest only mortgage calculator | finance_mortgages | sitemap | sitemap,dfs_ranked | 12100 | - | 2.10 | transactional | 0.75 | 0.571 | 7772.737 |
| 89 | first time buyer stamp duty | sdlt | dfs_ranked | dfs_ranked,gsc | 18100 | - | 1.00 | informational | 0.75 | 0.571 | 7751.325 |
| 90 | stamp duty first time buyer | sdlt | dfs_ranked | dfs_ranked,gsc | 18100 | - | 1.00 | informational | 0.75 | 0.571 | 7751.325 |
| 91 | cgt calculator uk | cgt_disposal | dfs_ranked | dfs_ranked | 9900 | - | 2.19 | transactional | 0.75 | 0.667 | 7428.713 |
| 92 | iht calculator | iht_estate | dfs_ranked | dfs_ranked | 9900 | - | 1.62 | transactional | 0.75 | 0.667 | 7428.713 |
| 93 | lbtt calculator | sdlt | dfs_ranked | dfs_ranked | 9900 | - | 0.43 | transactional | 0.75 | 0.667 | 7428.713 |
| 94 | tenancy agreement | compliance_licensing | dfs_ranked | dfs_ranked | 14800 | - | 5.61 | informational | 0.75 | 0.667 | 7403.7 |
| 95 | dividend and tax | incorporation_structures | dfs_ranked | dfs_ranked | 14800 | - | 3.14 | informational | 0.75 | 0.667 | 7403.7 |
| 96 | dividend tax | incorporation_structures | dfs_ranked | dfs_ranked | 14800 | - | 3.14 | informational | 0.75 | 0.667 | 7403.7 |
| 97 | tax on dividend | incorporation_structures | dfs_ranked | dfs_ranked | 14800 | - | 3.14 | informational | 0.75 | 0.667 | 7403.7 |
| 98 | how much is vat in uk | vat_commercial | dfs_ranked | dfs_ranked | 14800 | - | 1.65 | informational | 0.75 | 0.667 | 7403.7 |
| 99 | how much vat in uk | vat_commercial | dfs_ranked | dfs_ranked | 14800 | - | 1.65 | informational | 0.75 | 0.667 | 7403.7 |
| 100 | set up company ltd | incorporation_structures | dfs_ranked | dfs_ranked | 14800 | - | 51.42 | commercial | 0.75 | 0.5 | 7215.0 |
| 101 | set up as a limited company | incorporation_structures | dfs_ranked | dfs_ranked | 14800 | - | 51.42 | commercial | 0.75 | 0.5 | 7215.0 |
| 102 | how much would i get mortgage | finance_mortgages | dfs_ranked | dfs_ranked | 12100 | - | 2.14 | informational | 0.75 | 0.778 | 7060.35 |
| 103 | sdlt | sdlt | dfs_ranked | dfs_ranked | 12100 | - | 2.37 | informational | 0.75 | 0.75 | 6806.25 |
| 104 | eicr certificate | compliance_licensing | dfs_ranked | dfs_ranked | 18100 | - | 5.84 | informational | 0.75 | 0.5 | 6787.5 |
| 105 | second home stamp duty | sdlt | dfs_ranked | dfs_ranked | 14800 | - | 0.46 | informational | 0.75 | 0.6 | 6660.0 |
| 106 | second house stamp duty | sdlt | dfs_ranked | dfs_ranked | 14800 | - | 0.46 | informational | 0.75 | 0.6 | 6660.0 |
| 107 | stamp duty 2nd home | sdlt | dfs_ranked | dfs_ranked | 14800 | - | 0.46 | informational | 0.75 | 0.6 | 6660.0 |
| 108 | stamp duty on a second house | sdlt | dfs_ranked | dfs_ranked | 14800 | - | 0.46 | informational | 0.75 | 0.6 | 6660.0 |
| 109 | stamp duty on second home | sdlt | dfs_ranked | dfs_ranked | 14800 | - | 0.46 | informational | 0.75 | 0.6 | 6660.0 |
| 110 | pay self assessment tax | landlord_ops | dfs_ranked | dfs_ranked | 14800 | - | 3.14 | informational | 0.75 | 0.6 | 6660.0 |
| 111 | self assessment tax pay | landlord_ops | dfs_ranked | dfs_ranked | 14800 | - | 4.08 | informational | 0.75 | 0.6 | 6660.0 |
| 112 | hmrc self assessment tax contact number | landlord_ops | dfs_ranked | dfs_ranked | 12100 | - | 8.71 | informational | 0.75 | 0.714 | 6479.55 |
| 113 | hmrc tax self assessment contact number | landlord_ops | dfs_ranked | dfs_ranked | 12100 | - | 8.71 | informational | 0.75 | 0.714 | 6479.55 |
| 114 | calculating iht | iht_estate | dfs_ranked | dfs_ranked | 9900 | - | 1.62 | informational | 0.75 | 0.833 | 6185.025 |
| 115 | tax return log in | landlord_ops | dfs_ranked | dfs_ranked | 12100 | - | 2.38 | informational | 0.75 | 0.667 | 6053.025 |
| 116 | vat threshold | vat_commercial | dfs_ranked | dfs_ranked | 12100 | - | 2.69 | informational | 0.75 | 0.667 | 6053.025 |
| 117 | vat charge uk | vat_commercial | dfs_ranked | dfs_ranked | 12100 | - | 2.30 | informational | 0.75 | 0.667 | 6053.025 |
| 118 | vat in england | vat_commercial | dfs_ranked | dfs_ranked | 12100 | - | 4.47 | informational | 0.75 | 0.667 | 6053.025 |
| 119 | how much is vat | vat_commercial | dfs_ranked | dfs_ranked | 12100 | - | 1.43 | informational | 0.75 | 0.667 | 6053.025 |
| 120 | uk vat rate | vat_commercial | dfs_ranked | dfs_ranked | 12100 | - | 2.30 | informational | 0.75 | 0.667 | 6053.025 |
| 121 | uk vat tax rates | vat_commercial | dfs_ranked | dfs_ranked | 12100 | - | 2.30 | informational | 0.75 | 0.667 | 6053.025 |
| 122 | vat how much | vat_commercial | dfs_ranked | dfs_ranked | 12100 | - | 1.43 | informational | 0.75 | 0.667 | 6053.025 |
| 123 | vat percentage in uk | vat_commercial | dfs_ranked | dfs_ranked | 12100 | - | 2.30 | informational | 0.75 | 0.667 | 6053.025 |
| 124 | vat percentage uk | vat_commercial | dfs_ranked | dfs_ranked | 12100 | - | 2.30 | informational | 0.75 | 0.667 | 6053.025 |
| 125 | vat rate uk | vat_commercial | dfs_ranked | dfs_ranked | 12100 | - | 2.30 | informational | 0.75 | 0.667 | 6053.025 |
| 126 | vat tax rate uk | vat_commercial | dfs_ranked | dfs_ranked | 12100 | - | 2.30 | informational | 0.75 | 0.667 | 6053.025 |
| 127 | mortgage rate payment calculator | finance_mortgages | dfs_ranked | dfs_ranked | 6600 | - | 1.78 | transactional | 0.75 | 0.8 | 5940.0 |
| 128 | ltd company registration | incorporation_structures | dfs_ranked | dfs_ranked | 8100 | - | 54.73 | commercial | 0.75 | 0.75 | 5923.125 |
| 129 | company ltd registration | incorporation_structures | dfs_ranked | dfs_ranked | 8100 | - | 54.73 | commercial | 0.75 | 0.75 | 5923.125 |
| 130 | register a ltd company | incorporation_structures | dfs_ranked | dfs_ranked | 8100 | - | 54.73 | commercial | 0.75 | 0.75 | 5923.125 |
| 131 | register ltd company | incorporation_structures | dfs_ranked | dfs_ranked | 8100 | - | 54.73 | commercial | 0.75 | 0.75 | 5923.125 |
| 132 | stamp duty cost | sdlt | dfs_ranked | dfs_ranked | 9900 | - | 0.46 | transactional | 0.75 | 0.5 | 5568.75 |
| 133 | stamp duty fees | sdlt | dfs_ranked | dfs_ranked | 9900 | - | 0.46 | transactional | 0.75 | 0.5 | 5568.75 |
| 134 | how much inheritance tax | iht_estate | dfs_ranked | dfs_ranked | 9900 | - | 1.45 | informational | 0.75 | 0.75 | 5568.75 |
| 135 | how much is inheritance tax | iht_estate | dfs_ranked | dfs_ranked | 9900 | - | 1.45 | informational | 0.75 | 0.75 | 5568.75 |
| 136 | check uk vat number | vat_commercial | dfs_ranked | dfs_ranked | 9900 | - | 4.06 | informational | 0.75 | 0.75 | 5568.75 |
| 137 | check vat number uk | vat_commercial | dfs_ranked | dfs_ranked | 9900 | - | 4.06 | informational | 0.75 | 0.75 | 5568.75 |
| 138 | find vat number uk | vat_commercial | dfs_ranked | dfs_ranked | 9900 | - | 4.06 | informational | 0.75 | 0.75 | 5568.75 |
| 139 | search vat number uk | vat_commercial | dfs_ranked | dfs_ranked | 9900 | - | 4.06 | informational | 0.75 | 0.75 | 5568.75 |
| 140 | uk search vat number | vat_commercial | dfs_ranked | dfs_ranked | 9900 | - | 4.06 | informational | 0.75 | 0.75 | 5568.75 |
| 141 | uk vat number checker | vat_commercial | dfs_ranked | dfs_ranked | 9900 | - | 4.06 | informational | 0.75 | 0.75 | 5568.75 |
| 142 | uk vat number validation | vat_commercial | dfs_ranked | dfs_ranked | 9900 | - | 4.06 | informational | 0.75 | 0.75 | 5568.75 |
| 143 | vat number check uk | vat_commercial | dfs_ranked | dfs_ranked | 9900 | - | 4.06 | informational | 0.75 | 0.75 | 5568.75 |
| 144 | vat number validation uk | vat_commercial | dfs_ranked | dfs_ranked | 9900 | - | 4.06 | informational | 0.75 | 0.75 | 5568.75 |
| 145 | verify uk vat number | vat_commercial | dfs_ranked | dfs_ranked | 9900 | - | 4.06 | informational | 0.75 | 0.75 | 5568.75 |
| 146 | verify vat number uk | vat_commercial | dfs_ranked | dfs_ranked | 9900 | - | 4.06 | informational | 0.75 | 0.75 | 5568.75 |
| 147 | hmrc contact address self assessment | landlord_ops | dfs_ranked | dfs_ranked | 9900 | - | 6.99 | informational | 0.75 | 0.714 | 5301.45 |
| 148 | check vat registration number uk | vat_commercial | dfs_ranked | dfs_ranked | 9900 | - | 4.06 | informational | 0.75 | 0.714 | 5301.45 |
| 149 | interest only mortgage formula | finance_mortgages | dfs_ranked | dfs_ranked | 12100 | - | 2.10 | informational | 0.75 | 0.571 | 5181.825 |
| 150 | hmrc self assessment number | landlord_ops | dfs_ranked | dfs_ranked | 9900 | - | 6.99 | informational | 0.75 | 0.667 | 4952.475 |

---

## Pillar-overlap rejected (372)

Jaccard >= 0.3 against a pillar/core page — hard reject.

| Candidate | Nearest pillar | Overlap |
|---|---|---:|
| capital gains tax cgt | capital-gains-tax-property-complete-guid | 0.75 |
| capital gains tax on property | capital-gains-tax-property-complete-guid | 0.75 |
| capital gains on property | capital-gains-tax-property-complete-guid | 0.75 |
| property and capital gains tax | capital-gains-tax-property-complete-guid | 0.75 |
| property capital gains tax | capital-gains-tax-property-complete-guid | 0.75 |
| capital gains tax uk property | capital-gains-tax-property-complete-guid | 0.75 |
| capital gains tax and property | capital-gains-tax-property-complete-guid | 0.75 |
| making tax digital mtd for landlords | making-tax-digital-landlords-april-2026- | 0.667 |
| section 24 | section-24-tax-relief-complete-guide | 0.667 |
| section 24 tax | section-24-tax-relief-complete-guide | 0.667 |
| making tax digital landlords deadline | making-tax-digital-landlords-april-2026- | 0.667 |
| cgt capital gains tax calculator | capital-gains-tax-property-complete-guid | 0.6 |
| section 24 mortgage interest tax relief | section-24-tax-relief-complete-guide | 0.6 |
| capital gains tax residential property | capital-gains-tax-property-complete-guid | 0.6 |
| capital gains tax reporting uk property | capital-gains-tax-property-complete-guid | 0.6 |
| what can you deduct from capital gains tax on property | capital-gains-tax-property-complete-guid | 0.6 |
| capital gains tax on gifted property | capital-gains-tax-property-complete-guid | 0.6 |
| capital gains tax on foreign property | capital-gains-tax-property-complete-guid | 0.6 |
| capital gains tax on inherited property | capital-gains-tax-property-complete-guid | 0.6 |
| capital gains tax on overseas property | capital-gains-tax-property-complete-guid | 0.6 |
| capital gains tax on investment property | capital-gains-tax-property-complete-guid | 0.6 |
| capital gains allowance on property | capital-gains-tax-property-complete-guid | 0.6 |
| capital gains allowance property | capital-gains-tax-property-complete-guid | 0.6 |
| capital gains allowances property | capital-gains-tax-property-complete-guid | 0.6 |
| capital gains on rental property | capital-gains-tax-property-complete-guid | 0.6 |
| capital gains tax allowance on property | capital-gains-tax-property-complete-guid | 0.6 |
| capital gains tax allowances property | capital-gains-tax-property-complete-guid | 0.6 |
| capital gains tax and rental property | capital-gains-tax-property-complete-guid | 0.6 |
| capital gains tax on rental property | capital-gains-tax-property-complete-guid | 0.6 |
| capital gains property sale | capital-gains-tax-property-complete-guid | 0.6 |
| capital gains calculator property | capital-gains-tax-property-complete-guid | 0.6 |
| capital gains on property calculator | capital-gains-tax-property-complete-guid | 0.6 |
| capital gains tax calculator on property | capital-gains-tax-property-complete-guid | 0.6 |
| property capital gains tax calculator | capital-gains-tax-property-complete-guid | 0.6 |
| capital gains tax on property calculator uk | capital-gains-tax-property-complete-guid | 0.6 |
| capital gains tax uk property calculator | capital-gains-tax-property-complete-guid | 0.6 |
| how to calculate capital gains on property | capital-gains-tax-property-complete-guid | 0.6 |
| buy a limited company | buy-to-let-limited-company-complete-guid | 0.6 |
| how much is capital gains on property | capital-gains-tax-property-complete-guid | 0.6 |
| how much is capital gains tax property | capital-gains-tax-property-complete-guid | 0.6 |
| capital gains on inherited property | capital-gains-tax-property-complete-guid | 0.6 |
| capital gains tax and inheritance tax on property | capital-gains-tax-property-complete-guid | 0.6 |
| inherited property and capital gains tax | capital-gains-tax-property-complete-guid | 0.6 |
| inherited property capital gains | capital-gains-tax-property-complete-guid | 0.6 |
| capital gains on second property | capital-gains-tax-property-complete-guid | 0.6 |
| capital gains tax second property | capital-gains-tax-property-complete-guid | 0.6 |
| capital gains gifted property | capital-gains-tax-property-complete-guid | 0.6 |
| capital gains tax gifted property | capital-gains-tax-property-complete-guid | 0.6 |
| capital gains tax gifting property | capital-gains-tax-property-complete-guid | 0.6 |
| capital gains tax on gifts of property | capital-gains-tax-property-complete-guid | 0.6 |
| *(+322 more, not listed)* | | |