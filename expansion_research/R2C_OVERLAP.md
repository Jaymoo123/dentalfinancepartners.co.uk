# R2c — Own-estate overlap scoring (89 candidates)

Generated 2026-07-11 by `r2_overlap.py`. Containment = fraction of the candidate's
term pool (head variants + attributable autocomplete suggestions) whose content
tokens are a (near-)subset of a single query in the site's 28d GSC+Bing corpus.
Thresholds (calibrated, see script): EXCLUDE >= 0.45, CAUTION >= 0.2.
Jaccard is secondary only — calibration showed it does not separate overlap from
clean pairs (large corpora dilute it).

| # | Candidate | Max-overlap site | Contain | Jaccard | Verdict | Rationale |
|---|---|---|---|---|---|---|
| 1 | Landlords (buy-to-let) | property | 0.94 | 0.002 | EXCLUDE | 94% of its term pool already lives in the property corpus; this is property-site expansion, not a new niche |
| 2 | Property investors | property | 0.57 | 0.002 | EXCLUDE | 57% of its term pool already lives in the property corpus; this is property-site expansion, not a new niche |
| 3 | Airbnb / holiday-let hosts | property | 0.59 | 0.003 | EXCLUDE | 59% of its term pool already lives in the property corpus; this is property-site expansion, not a new niche |
| 4 | Property developers | generalist | 0.33 | 0.003 | CAUTION | partial overlap with generalist (33% containment); viable only with positioning distinct from generalist |
| 5 | Property management companies | property | 0.50 | 0.001 | CAUTION | downgraded: only 1 distinct matching site query/queries; partial overlap with property (50% containment); viable only with positioning distinct from property |
| 6 | Estate & letting agents | property | 0.35 | 0.001 | CAUTION | partial overlap with property (35% containment); viable only with positioning distinct from property |
| 7 | Landed estates / rural estates | construction-cis | 0.00 | 0.006 | CLEAR | max containment 0% (construction-cis); no material own-estate overlap |
| 8 | Construction / CIS subcontractors | generalist | 1.00 | 0.003 | EXCLUDE | JUDGMENT: this is construction-cis's exact audience (corpus: 'accountants for roofers', CIS queries); generalist cap masked it |
| 9 | Builders | generalist | 0.68 | 0.002 | EXCLUDE | JUDGMENT: builders = construction-cis's core audience; same-site expansion |
| 10 | Plumbers / heating engineers | generalist | 0.23 | 0.003 | CAUTION | partial overlap with generalist (23% containment); viable only with positioning distinct from generalist |
| 11 | Electricians | property | 0.00 | 0.000 | CLEAR | max containment 0% (property); no material own-estate overlap |
| 12 | Painters & decorators | property | 0.00 | 0.000 | CLEAR | max containment 0% (property); no material own-estate overlap |
| 13 | Landscapers / gardeners | contractors-ir35 | 0.00 | 0.009 | CLEAR | max containment 0% (contractors-ir35); no material own-estate overlap |
| 14 | Tradespeople (family) | construction-cis | 0.39 | 0.019 | CAUTION | partial overlap with construction-cis (39% containment); viable only with positioning distinct from construction-cis |
| 15 | Dentists | dentists | 0.67 | 0.006 | EXCLUDE | 67% of its term pool already lives in the dentists corpus; this is dentists-site expansion, not a new niche |
| 16 | Doctors / GPs | medical | 0.61 | 0.009 | EXCLUDE | 61% of its term pool already lives in the medical corpus; this is medical-site expansion, not a new niche |
| 17 | Locum doctors | medical | 1.00 | 0.003 | EXCLUDE | 100% of its term pool already lives in the medical corpus; this is medical-site expansion, not a new niche |
| 18 | Locum pharmacists | dentists | 0.00 | 0.002 | CLEAR | max containment 0% (dentists); no material own-estate overlap |
| 19 | Pharmacies | generalist | 1.00 | 0.001 | CAUTION | downgraded: only 2 distinct matching site query/queries; partial overlap with generalist (100% containment); viable only with positioning distinct from generalist |
| 20 | Opticians / optometrists | medical | 0.32 | 0.001 | CAUTION | partial overlap with medical (32% containment); viable only with positioning distinct from medical |
| 21 | Vets | dentists | 0.00 | 0.002 | CLEAR | max containment 0% (dentists); no material own-estate overlap |
| 22 | Therapists & allied health | medical | 0.13 | 0.004 | CLEAR | max containment 13% (medical); no material own-estate overlap |
| 23 | Nurses / healthcare professionals | medical | 0.35 | 0.003 | CAUTION | partial overlap with medical (35% containment); viable only with positioning distinct from medical |
| 24 | Care homes | medical | 0.53 | 0.005 | CAUTION | downgraded: only 2 distinct matching site query/queries; partial overlap with medical (53% containment); viable only with positioning distinct from medical |
| 25 | Domiciliary care agencies | contractors-ir35 | 0.00 | 0.010 | CLEAR | max containment 0% (contractors-ir35); no material own-estate overlap |
| 26 | Childminders / nurseries | agency | 0.00 | 0.003 | CLEAR | max containment 0% (agency); no material own-estate overlap |
| 27 | Foster carers | property | 0.00 | 0.000 | CLEAR | max containment 0% (property); no material own-estate overlap |
| 28 | Solicitors / law firms | solicitors | 0.81 | 0.003 | EXCLUDE | 81% of its term pool already lives in the solicitors corpus; this is solicitors-site expansion, not a new niche |
| 29 | Barristers | solicitors | 1.00 | 0.001 | EXCLUDE | 100% of its term pool already lives in the solicitors corpus; this is solicitors-site expansion, not a new niche |
| 30 | IT contractors | generalist | 0.56 | 0.003 | EXCLUDE | JUDGMENT: contractors-ir35 direct (containment 0.48/support 5 on its own small 115-query corpus); generalist cap masked it |
| 31 | Freelancers | generalist | 1.00 | 0.001 | EXCLUDE | JUDGMENT: 'accountants for freelancers' collides head-on with the contractors-ir35 brand (Contractor Tax Accountants) + generalist; a standalone freelancer site is same-audience expansion |
| 32 | Management consultants | contractors-ir35 | 0.46 | 0.027 | CAUTION | downgraded: only 1 distinct matching site query/queries; partial overlap with contractors-ir35 (46% containment); viable only with positioning distinct from contractors-ir35 |
| 33 | Startups | generalist | 0.36 | 0.003 | CAUTION | partial overlap with generalist (36% containment); viable only with positioning distinct from generalist |
| 34 | Tech / SaaS companies | generalist | 0.16 | 0.004 | CLEAR | max containment 16% (generalist); no material own-estate overlap |
| 35 | Ecommerce sellers | generalist | 0.42 | 0.015 | CAUTION | partial overlap with generalist (42% containment); viable only with positioning distinct from generalist |
| 36 | Amazon FBA sellers | generalist | 0.00 | 0.001 | CLEAR | max containment 0% (generalist); no material own-estate overlap |
| 37 | Content creators / influencers | construction-cis | 0.00 | 0.006 | CLEAR | max containment 0% (construction-cis); no material own-estate overlap |
| 38 | OnlyFans creators | dentists | 0.00 | 0.002 | CLEAR | max containment 0% (dentists); no material own-estate overlap |
| 39 | Crypto traders / investors | property | 0.30 | 0.002 | CAUTION | partial overlap with property (30% containment); viable only with positioning distinct from property |
| 40 | Day / forex traders | generalist | 0.43 | 0.002 | CAUTION | partial overlap with generalist (43% containment); viable only with positioning distinct from generalist |
| 41 | Musicians | property | 0.00 | 0.000 | CLEAR | max containment 0% (property); no material own-estate overlap |
| 42 | Actors / entertainment industry | agency | 0.22 | 0.003 | CAUTION | partial overlap with agency (22% containment); viable only with positioning distinct from agency |
| 43 | Film & TV production | construction-cis | 0.00 | 0.006 | CLEAR | max containment 0% (construction-cis); no material own-estate overlap |
| 44 | Artists / creatives | generalist | 0.48 | 0.002 | CAUTION | downgraded: only 1 distinct matching site query/queries; partial overlap with generalist (48% containment); viable only with positioning distinct from generalist |
| 45 | Authors / writers | solicitors | 0.00 | 0.001 | CLEAR | max containment 0% (solicitors); no material own-estate overlap |
| 46 | Photographers | property | 0.00 | 0.000 | CLEAR | max containment 0% (property); no material own-estate overlap |
| 47 | Interior designers | solicitors | 0.00 | 0.001 | CLEAR | max containment 0% (solicitors); no material own-estate overlap |
| 48 | Marketing agencies | construction-cis | 0.00 | 0.006 | EXCLUDE | JUDGMENT: agency site's scope is accountants-for-agencies incl. marketing/advertising; corpus just has no impressions for that phrasing yet |
| 49 | Recruitment agencies | construction-cis | 0.00 | 0.006 | CLEAR | max containment 0% (construction-cis); no material own-estate overlap |
| 50 | Architects | generalist | 1.00 | 0.001 | CAUTION | capped: overlap is with the generalist site (cannibalisation risk, not niche-site expansion); partial overlap with generalist (100% containment); viable only with positioning distinct from generalist |
| 51 | Engineers / engineering consultants | generalist | 0.50 | 0.002 | CAUTION | downgraded: only 1 distinct matching site query/queries; partial overlap with generalist (50% containment); viable only with positioning distinct from generalist |
| 52 | Financial advisers / FCA-regulated firms | property | 0.23 | 0.003 | CAUTION | partial overlap with property (23% containment); viable only with positioning distinct from property |
| 53 | Restaurants | generalist | 0.41 | 0.001 | CAUTION | partial overlap with generalist (41% containment); viable only with positioning distinct from generalist |
| 54 | Takeaways | generalist | 0.00 | 0.001 | CLEAR | max containment 0% (generalist); no material own-estate overlap |
| 55 | Pubs & bars | medical | 0.00 | 0.001 | CLEAR | max containment 0% (medical); no material own-estate overlap |
| 56 | Hotels & guesthouses | medical | 0.00 | 0.003 | CLEAR | max containment 0% (medical); no material own-estate overlap |
| 57 | Hospitality (family) | generalist | 0.31 | 0.001 | CAUTION | partial overlap with generalist (31% containment); viable only with positioning distinct from generalist |
| 58 | Event caterers | agency | 0.54 | 0.003 | CLEAR | JUDGMENT: sole match is one stray Bing VAT query on the agency corpus ('mix of clients and staff at an event...'); no real overlap |
| 59 | Travel agents / tour operators | agency | 0.00 | 0.003 | CLEAR | max containment 0% (agency); no material own-estate overlap |
| 60 | Hairdressers / barbers / beauty | generalist | 0.13 | 0.001 | CLEAR | max containment 13% (generalist); no material own-estate overlap |
| 61 | Gyms / fitness / personal trainers | generalist | 0.24 | 0.001 | CAUTION | partial overlap with generalist (24% containment); viable only with positioning distinct from generalist |
| 62 | Sports clubs | property | 0.00 | 0.000 | CLEAR | max containment 0% (property); no material own-estate overlap |
| 63 | Footballers / sports professionals | medical | 0.00 | 0.001 | CLEAR | max containment 0% (medical); no material own-estate overlap |
| 64 | Taxi & private-hire drivers | generalist | 0.62 | 0.002 | CAUTION | capped: overlap is with the generalist site (cannibalisation risk, not niche-site expansion); partial overlap with generalist (62% containment); viable only with positioning distinct from generalist |
| 65 | Couriers / delivery drivers | generalist | 0.41 | 0.003 | CAUTION | partial overlap with generalist (41% containment); viable only with positioning distinct from generalist |
| 66 | Hauliers / trucking | contractors-ir35 | 0.00 | 0.018 | CLEAR | max containment 0% (contractors-ir35); no material own-estate overlap |
| 67 | Pilots / aviation | contractors-ir35 | 0.00 | 0.009 | CLEAR | max containment 0% (contractors-ir35); no material own-estate overlap |
| 68 | Farmers / agriculture | generalist | 0.35 | 0.002 | CAUTION | partial overlap with generalist (35% containment); viable only with positioning distinct from generalist |
| 69 | Retail / independent shops | generalist | 0.13 | 0.003 | CLEAR | max containment 13% (generalist); no material own-estate overlap |
| 70 | Used car dealers / automotive | agency | 0.00 | 0.003 | CLEAR | max containment 0% (agency); no material own-estate overlap |
| 71 | Jewellers | property | 0.00 | 0.000 | CLEAR | max containment 0% (property); no material own-estate overlap |
| 72 | Cake makers / food producers | generalist | 0.00 | 0.001 | CLEAR | max containment 0% (generalist); no material own-estate overlap |
| 73 | Manufacturing | generalist | 0.32 | 0.002 | CAUTION | partial overlap with generalist (32% containment); viable only with positioning distinct from generalist |
| 74 | Charities / non-profits | agency | 0.00 | 0.008 | CLEAR | max containment 0% (agency); no material own-estate overlap |
| 75 | CICs / social enterprises | contractors-ir35 | 0.00 | 0.009 | CLEAR | max containment 0% (contractors-ir35); no material own-estate overlap |
| 76 | Churches / religious organisations | medical | 0.00 | 0.001 | CLEAR | max containment 0% (medical); no material own-estate overlap |
| 77 | Schools & academies | generalist | 0.95 | 0.002 | CAUTION | capped: overlap is with the generalist site (cannibalisation risk, not niche-site expansion); partial overlap with generalist (95% containment); viable only with positioning distinct from generalist |
| 78 | Tutors / private teachers | contractors-ir35 | 0.00 | 0.010 | CLEAR | max containment 0% (contractors-ir35); no material own-estate overlap |
| 79 | Driving instructors | generalist | 0.00 | 0.001 | CLEAR | max containment 0% (generalist); no material own-estate overlap |
| 80 | Expats / non-residents | property | 0.25 | 0.003 | CAUTION | partial overlap with property (25% containment); viable only with positioning distinct from property |
| 81 | High-net-worth individuals | generalist | 0.38 | 0.004 | CAUTION | partial overlap with generalist (38% containment); viable only with positioning distinct from generalist |
| 82 | Franchisees | agency | 0.00 | 0.003 | CLEAR | max containment 0% (agency); no material own-estate overlap |
| 83 | Virtual assistants | property | 0.00 | 0.000 | CLEAR | max containment 0% (property); no material own-estate overlap |
| 84 | Neurodivergent business owners | contractors-ir35 | 0.00 | 0.010 | CLEAR | max containment 0% (contractors-ir35); no material own-estate overlap |
| 85 | Energy & renewables | contractors-ir35 | 0.00 | 0.009 | CLEAR | max containment 0% (contractors-ir35); no material own-estate overlap |
| 86 | Life sciences / pharma | generalist | 0.00 | 0.001 | CLEAR | max containment 0% (generalist); no material own-estate overlap |
| 87 | Maritime | property | 0.00 | 0.000 | CLEAR | max containment 0% (property); no material own-estate overlap |
| 88 | Security firms | solicitors | 0.00 | 0.001 | CLEAR | max containment 0% (solicitors); no material own-estate overlap |
| 89 | Cleaning businesses | property | 0.50 | 0.001 | CLEAR | JUDGMENT: sole match is one stray property query ('how to calculate vat for a cleaners business'); no real overlap |
