# R1 — UK Accounting Lead-Gen Niche Candidate Universe

Generated 2026-07-11 (branch expansion/phase-0, Workstream B, Task R1).

Sources (3 of 4; union, deduped by judgment):
- **AC** = Google Autocomplete alphabet sweep (`r1_autocomplete_sweep.py` → `r1_autocomplete_raw.json`; 185 queries, 1,414 unique suggestions, 344 distinct "for X" audiences after normalisation). Number = suggestion-variant count.
- **SM** = competitor sector-nav mining (`r1_sector_mining.json`; 17 UK firms mined, 223 sector mentions, 13 domains failed/blocked). Number = firms naming it.
- **SIC** = Companies House advanced-search active-company counts (`r1_sic_counts.py` → `r1_sic_counts.json`). **Companies only — sole-trader-heavy niches (landlords, trades, taxi, locums, foster carers) materially understated.**
- **P9** = prior scored shortlist `docs/phase9_niche_scores.md`.
- **DEFERRED 4th source:** DataForSEO keyword_ideas — account balance negative on 2026-07-11; no calls made. Re-run when topped up and merge volumes into this table (R2 can absorb it).

Overlap-suspect column flags relationships to the existing 8 sites (property, dentists, solicitors, medical, generalist, agency, contractors-ir35, construction-cis). **Nothing excluded yet — R2 does that with data.**

Dedup judgments applied:
- eBay / Etsy / Shopify / dropshippers / resellers folded into **Ecommerce sellers** as aliases; **Amazon FBA sellers** kept distinct (its own query family, marketplace-specific VAT/FBA pain, 10/10 specialist SERP per P9).
- Physio / psychologists / counsellors / massage therapists merged into one **Therapists & allied health** row (same "private practice" buying behaviour); **Doctors/GPs** and **Dentists** stay separate.
- Cafes folded into Restaurants; joiners/roofers folded into Tradespeople (no individual source hit); surveyors folded into Architects; oil & gas contractors aliased under Energy; insurance brokers aliased under Financial advisers.
- Business *structures* (LLC, ltd company, sole trader, partnership, "small business", "self employed") and *service lines* (self assessment, inheritance tax, back taxes, estate planning) excluded — they are query modifiers, not audience niches. US-only noise (1099, 501c3, C-corp, HOA, CalHR, "The Accountant" movie) excluded.

## Candidate table (89 rows)

| # | Canonical niche | Aliases / variants | Provenance | CH active cos (SIC) | Overlap-suspect | Notes |
|---|---|---|---|---|---|---|
| 1 | Landlords (buy-to-let) | property landlords, rental property, rental income | AC(9) SM(4) SIC P9 | 746,450 (68209,68100) | **property (direct)** | Biggest CH magnitude; P9 rank 1 |
| 2 | Property investors | real estate investors, investment property | AC(4) SM(2) | in row 1 | property (direct) | Query family distinct from "landlord" |
| 3 | Airbnb / holiday-let hosts | FHL, furnished holiday letting, holiday parks, serviced accommodation | AC(3) SM(2) SIC | 16,140 (55209,55202) | property (strong) | FHL regime abolition = live topic |
| 4 | Property developers | property & construction, real estate & construction | SM(4) SIC | in 41100 | property + construction-cis | |
| 5 | Property management companies | block management | AC(2) SIC | 129,777 (68320) | property (adjacent) | B2B buyer, distinct from landlord |
| 6 | Estate & letting agents | real estate agents, realtors | AC(4) SM SIC | 40,502 (68310) | property (adjacent) | |
| 7 | Landed estates / rural estates | rural businesses | SM(2) | — | — | Old Mill / Armstrong Watson territory; HNW-adjacent |
| 8 | Construction / CIS subcontractors | construction industry, CIS | AC(4) SM(6) SIC P9 | 221,143 (41202,41100) | **construction-cis (direct)** | |
| 9 | Builders | general contractors, construction & builders | AC(2) SM(2) | in row 8 | construction-cis (direct) | |
| 10 | Plumbers / heating engineers | plumbing business, HVAC | AC(2) SM SIC P9 | 53,467 (43220) | construction-cis (adjacent) | P9 "tradesmen" 17/25 |
| 11 | Electricians | — | SM SIC P9 | 60,549 (43210) | construction-cis (adjacent) | |
| 12 | Painters & decorators | — | AC SIC | 18,369 (43341) | construction-cis (adjacent) | |
| 13 | Landscapers / gardeners | landscaping business, lawn mowing | AC(3) SIC | 24,664 (81300) | — | |
| 14 | Tradespeople (family) | tradies, trade, joiners, roofers | AC(3) P9 SIC | ~120k across 43xxx | construction-cis | Family head; individual trades above |
| 15 | Dentists | dental practices, dental office | AC(5) SM(3) SIC | 20,457 (86230) | **dentists (direct)** | |
| 16 | Doctors / GPs | physicians, medical doctors, GP practices, private practice | AC(12) SM(3) SIC | 98,407 (86210,86220) | **medical (direct)** | Highest AC frequency of any profession |
| 17 | Locum doctors | locums | SM(2) | — | medical (direct) | Sole-trader/PSC heavy |
| 18 | Locum pharmacists | — | SM | — | medical (adjacent) | |
| 19 | Pharmacies | — | AC SIC | 7,992 (47730) | medical (adjacent) | Practice-purchase heavy niche |
| 20 | Opticians / optometrists | optometry | AC SM SIC | 4,031 (47782) | medical (adjacent) | Small but zero-competition feel |
| 21 | Vets | veterinarians, locum vets | AC SM SIC | 5,819 (75000) | medical (weak) | Corporate consolidation trend |
| 22 | Therapists & allied health | physio, psychologists, psychotherapists, counsellors, massage therapists, therapy practice | AC(9) SIC | 108,288 (86900) | medical (partial) | Merged row; private-practice buyers |
| 23 | Nurses / healthcare professionals | healthcare | AC(3) SM(4) | — | medical (partial) | Mostly PAYE; niche = agency/bank nurses |
| 24 | Care homes | healthcare services | SM SIC | 22,353 (87100,87300) | medical (weak) | |
| 25 | Domiciliary care agencies | home care | SIC | 11,574 (88100) | medical (weak) | SIC-only provenance (mapping judgment) — weak |
| 26 | Childminders / nurseries | childcare | AC(2) SIC | 11,189 (88910) | — | Childminders = distinct tax treatment |
| 27 | Foster carers | — | AC SM | — | — | Qualifying care relief; near-zero competition |
| 28 | Solicitors / law firms | lawyers, legal practitioners, legal | AC(7) SM(4) | 22,922 (69102,69109) | **solicitors (direct)** | SRA accounts rules angle |
| 29 | Barristers | — | AC(2) SM SIC | 912 (69101) | solicitors (strong) | ~17k practising barristers, mostly unincorporated |
| 30 | IT contractors | outside IR35, IT professionals, independent contractors | AC(5) SM(4) P9 | 384,752 (62012,62020,62090) | **contractors-ir35 (direct)** | |
| 31 | Freelancers | — | AC(3) SM(5) | — | contractors-ir35 + generalist | Most-named SM sector (5 firms) |
| 32 | Management consultants | consultants, project managers | AC SM(3) SIC | 285,395 (70229) | contractors-ir35 (partial) | Huge SIC count |
| 33 | Startups | start ups, new business owners | AC(5) SM(4) | — | generalist (partial) | Structure-stage niche, not sector |
| 34 | Tech / SaaS companies | AI startups, fintech, tech IT & digital, science & technology | AC(2) SM(6) | in row 30 SIC | — | R&D tax credits angle |
| 35 | Ecommerce sellers | online sellers, eBay, Etsy, Shopify, resellers, dropshipping, online business | AC(12) SM(9) SIC P9 | 215,227 (47910) | — | Family head; strongest un-served signal outside estate |
| 36 | Amazon FBA sellers | amazon sellers | AC SM(2) P9 | in row 35 | — | Kept distinct (marketplace-specific query family) |
| 37 | Content creators / influencers | social media influencers, YouTubers | AC(10) SM(2) | — | — | Very strong AC signal; young, underserved |
| 38 | OnlyFans creators | adult content creators | AC | — | — | Distinct (discretion-driven buying); kept separate from row 37 |
| 39 | Crypto traders / investors | crypto tax | AC SM | — | — | CGT complexity driver |
| 40 | Day / forex traders | traders | AC(9) | — | — | Distinct from crypto (badges of trade Qs) |
| 41 | Musicians | performing artists | AC SM SIC | 92,215 (90010-90030) | — | |
| 42 | Actors / entertainment industry | performers, entertainment | AC(6) SM(2) | in row 41 | — | |
| 43 | Film & TV production | film industry, media & entertainment | AC(4) SM(3) SIC | 50,392 (59111,59112) | — | Creative-industry tax reliefs angle |
| 44 | Artists / creatives | creative industries, media & creative | AC(6) SM(3) | — | — | Family head for 41-43 |
| 45 | Authors / writers | freelance journalists | AC(2) SM | — | — | |
| 46 | Photographers | — | AC(2) SM SIC | 21,161 (74201-74209) | — | |
| 47 | Interior designers | freelance designers | AC(2) SIC | 52,014 (74100) | — | |
| 48 | Marketing agencies | advertising agencies, marketing | AC SM(2) SIC | 55,504 (73110) | **agency (direct)** | |
| 49 | Recruitment agencies | recruiters | AC(3) SM(3) SIC | 73,060 (78109,78200,78300) | agency (adjacent) | |
| 50 | Architects | surveyors and architects | SM(2) SIC | 21,405 (71111) | — | |
| 51 | Engineers / engineering consultants | — | SM(2) SIC | 53,506 (71121,71129) | contractors-ir35 (partial) | |
| 52 | Financial advisers / FCA-regulated firms | IFAs, wealth management, insurance agency/brokers, credit unions, financial services | AC SM(6) SIC | 18,783 (66190,66220) | — | FCA client-money rules angle |
| 53 | Restaurants | restaurant business, cafes | AC(7) SM(4) SIC P9 | 104,737 (56101,56102) | — | P9 13/25 |
| 54 | Takeaways | restaurants and takeaways | SM SIC | 87,323 (56103) | — | Kept distinct: cash-business/VAT query family |
| 55 | Pubs & bars | hotels pubs and restaurants | AC SM(2) SIC | 39,463 (56302) | — | |
| 56 | Hotels & guesthouses | hotels & guesthouses, B&Bs | AC SM(4) SIC | 20,171 (55100) | — | |
| 57 | Hospitality (family) | hospitality & leisure, leisure & tourism, hospitality and food | AC(2) SM(7) | — | — | Family head for 53-56 |
| 58 | Event caterers | events | AC SIC | 31,327 (56210) | — | Weak AC hit; SIC solid |
| 59 | Travel agents / tour operators | travel & tourism | SM(2) SIC | 25,275 (79110,79120) | — | TOMS VAT = genuine specialism |
| 60 | Hairdressers / barbers / beauty | hair stylist, beauty salon, nail technicians, hairdressers beauty & barbers | AC(6) SM SIC | 77,877 (96020) | — | Chair-rental tax angle |
| 61 | Gyms / fitness / personal trainers | fitness instructors | AC SIC | 65,881 (93130,93199,85510) | — | |
| 62 | Sports clubs | sport | SM(3) SIC | 12,135 (93120) | — | CASC status angle |
| 63 | Footballers / sports professionals | athletes | AC SM | — | — | Image rights; HNW-adjacent |
| 64 | Taxi & private-hire drivers | Uber drivers | AC(8) SM(2) SIC | 21,202 (49320) | — | Strong AC; mostly sole traders (SIC understates) |
| 65 | Couriers / delivery drivers | drivers | AC SM(2) SIC | 12,328 (53202) | — | Gig-economy overlap with row 64 but distinct queries |
| 66 | Hauliers / trucking | truck drivers, truckers, transport business, transport & haulage | AC(6) SM(2) SIC | 75,933 (49410) | — | |
| 67 | Pilots / aviation | airlines | AC SM(2) | — | — | Pilot expenses/contractor angle |
| 68 | Farmers / agriculture | farm, rural, agriculture & farming | AC(6) SM(5) SIC | 15,600 (01110,01410,01500) | — | SIC understates (most farms unincorporated); APR/BPR reform = hot |
| 69 | Retail / independent shops | grocery store, liquor store, supermarket, independent retail, retail & wholesale | AC(5) SM(5) | — | — | Broad; probably splits in R2 |
| 70 | Used car dealers / automotive | motor dealerships | AC SM(2) | — | — | Margin-scheme VAT angle |
| 71 | Jewellers | — | SM | — | — | Single-firm hit (Nordens); weak |
| 72 | Cake makers / food producers | food & drink | SM(3) | — | — | Mazuma names cake makers verbatim; food & drink is the real family |
| 73 | Manufacturing | manufacturing & distribution, manufacturing & engineering | SM(6) | — | — | No SIC pulled (fragmented codes); B2B mid-market |
| 74 | Charities / non-profits | not-for-profit, charitable organisations | AC(10) SM(6) SIC | 14,507 (94990, proxy) | — | SORP accounts; CH proxy poor (most are CIO/charity-commission) |
| 75 | CICs / social enterprises | community interest companies | AC(2) | — | — | Distinct filing regime; kept separate from 74 |
| 76 | Churches / religious organisations | — | AC(3) SIC | 6,786 (94910) | — | AC hits partly US-flavoured |
| 77 | Schools & academies | academies and education, education | SM(6) SIC | 112,081 (85590,85600 incl. tutors) | — | Academy trust audit market |
| 78 | Tutors / private teachers | locum teachers | SM(2) | in row 77 | — | Individual side of row 77 |
| 79 | Driving instructors | — | AC(2) SIC | 4,501 (85530) | — | Small, franchise-heavy, zero specialist competition seen |
| 80 | Expats / non-residents | US expats, foreign income, non-resident landlords | AC(9) | — | property (partial: NRL) | Strong AC; cross-border = high fees |
| 81 | High-net-worth individuals | high income earners, HNW | AC(7) SM (wealth) | — | generalist (partial) | Service-line-ish but real query family |
| 82 | Franchisees | franchises, franchising | AC SM | — | — | |
| 83 | Virtual assistants | VA | AC(2) | — | — | Micro-niche, freelancer subset |
| 84 | Neurodivergent business owners | — | AC SM | — | — | Both sources independently (Mazuma markets it) — genuine emerging positioning |
| 85 | Energy & renewables | oil & gas, oil & gas contractors, energy mining & renewables | SM(4) | — | contractors-ir35 (O&G contractors) | |
| 86 | Life sciences / pharma | pharmaceutical | SM(2) | — | — | |
| 87 | Maritime | seafarers | SM | — | — | Seafarers Earnings Deduction is a real micro-specialism |
| 88 | Security firms | — | SIC | 16,570 (80100) | — | SIC-only (mapping judgment) — weak, verify in R2 |
| 89 | Cleaning businesses | cleaners | SIC | 33,263 (81210,81229) | — | SIC-only (mapping judgment) — weak, verify in R2 |

## Weak/parked mentions (below the table on judgment — not padded in)
- Telecoms, banking, private equity, pension schemes, trade associations, livery companies (SM singletons from top-25 firms' sector menus; enterprise-audit markets, not lead-gen niches).
- Pensioners/retirees, international students, veterans/military, women-led (AC hits but US-flavoured or weak commercial intent).
- Gambling/gaming, "elderly", "kids", "beginners/dummies" (AC noise — informational, not buyer audiences).

## Per-source yields
| Source | Yield |
|---|---|
| Autocomplete sweep | 185 queries → 1,414 unique suggestions → 344 distinct audiences → ~70 UK-plausible niches |
| Sector mining | 17 firms, 223 mentions, 160 verbatim sectors (13 domains failed: 403/JS/no page) |
| CH SIC counts | 58 sectors counted; 2 codes 404'd and were re-mapped (81220→81210+81229; 86901 dropped for 32500) |
| DataForSEO keyword_ideas | **DEFERRED — negative balance 2026-07-11; merge in R2** |
