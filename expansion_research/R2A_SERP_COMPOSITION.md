# R2A — SERP Composition (DDG UK, top-10 organic)

Generated 2026-07-11 from r2_serp_raw.json (89 niches, 265 queries). Classes: SPECIALIST / GENERALIST / DIRECTORY / INFO / OWN-ESTATE (hard-asserted against own_estate_exclusion.json, never counted as competitor). Full per-query detail: r2_serp_composition.json.

**Quality control:** a 30-row cross-niche sample audit (WebFetch of homepages) found a 48% correction rate — snippet-level classification systematically over-labelled SPECIALIST (multi-sector firms with niche landing pages). Per protocol, ALL 543 unique SPECIALIST domains were then re-audited by homepage fetch (8 parallel agents; verdicts spot-checked 6/6 consistent). 509 rows corrected (SPECIALIST → GENERALIST/INFO; non-UK firms and info platforms → INFO). ~125 domain+niche pairs were UNVERIFIABLE (fetch blocked) and retain their original SPECIALIST class — residual uncertainty is concentrated there. Figures below are post-correction.

Verdict rule: NO_SPECIALISTS <0.5 avg specialists/top-10; WEAK_FIELD <2 and no dominant specialist; STRONG_SPECIALISTS >=4 avg (or >=3 with a dominant specialist); else CONTESTED. Dominant = same specialist domain in >=2 query variants with a top-3 position. SPECIALIST here = whole-brand niche dedication verified from the homepage, not a sector landing page.

| # | Niche | Queries | Spec avg/10 | Dir avg/10 | Verdict | Dominant / notable specialists | Own-estate hits |
|---|-------|---------|-------------|------------|---------|-------------------------------|-----------------|
| 1 | Landlords (buy-to-let) | 3 | 3.0 | 0.0 | STRONG_SPECIALISTS | uklandlordtax.co.uk, gorillaaccounting.com | also: iwnaccountancy.co.uk, buytolettaxaccountants.co.uk | propertytaxpartners.co.uk #9 (buy to let accountant) |
| 2 | Property investors | 3 | 4.3 | 0.0 | STRONG_SPECIALISTS | ukpropertyaccountants.co.uk | also: thepropertyaccountant.co.uk, gnsassociates.co.uk, goldhouseaccounting.co.uk | - |
| 3 | Airbnb / holiday-let hosts | 3 | 1.0 | 0.3 | WEAK_FIELD | - | also: provestor.co.uk, ukpropertyaccountants.co.uk, goldhouseaccounting.co.uk | - |
| 4 | Property developers | 3 | 1.0 | 0.0 | WEAK_FIELD | - | also: goldhouseaccounting.co.uk, ukpropertyaccountants.co.uk, optimiseaccountants.co.u | - |
| 5 | Property management companies | 3 | 1.7 | 0.7 | CONTESTED | ukpropertyaccountants.co.uk | also: thepropertyaccountant.co.uk, qubeaccountants.co.uk | - |
| 6 | Estate & letting agents | 3 | 2.0 | 0.0 | CONTESTED | homeaccountants.co.uk | also: axtpropertyaccountants.co.uk, infinity-accounting.co.uk, ellersaccountants.co.uk | - |
| 7 | Landed estates / rural estates | 3 | 1.7 | 0.0 | CONTESTED | beavismorgan.com | also: brightshire.co.uk, streets.uk | - |
| 8 | Construction / CIS subcontractors | 3 | 0.7 | 0.3 | WEAK_FIELD | - | also: constructionaccountants.co.uk, rsbc.uk | - |
| 9 | Builders | 3 | 2.7 | 1.0 | CONTESTED | accountantforbuilders.co.uk, grahambarnesaccountant.co.uk | also: yorkshireaccountancy.co.uk, rsbc.uk | - |
| 10 | Plumbers / heating engineers | 3 | 0.0 | 0.0 | NO_SPECIALISTS | - | - |
| 11 | Electricians | 3 | 1.0 | 0.0 | WEAK_FIELD | - | also: yorkshireaccountancy.co.uk, accountantsforelectricians.co.uk, sparkyaccounting.c | - |
| 12 | Painters & decorators | 3 | 2.0 | 1.7 | CONTESTED | yorkshireaccountancy.co.uk, decoratoraccountants.com | also: accountantsfordecorators.co.uk | - |
| 13 | Landscapers / gardeners | 3 | 0.0 | 0.3 | NO_SPECIALISTS | - | - |
| 14 | Tradespeople (family) | 3 | 0.7 | 0.3 | WEAK_FIELD | - | also: ascott-blake.com, grahambarnesaccountant.co.uk | - |
| 15 | Dentists | 3 | 4.7 | 0.0 | STRONG_SPECIALISTS | pfmdental.co.uk, dentalaccounting.co.uk | also: dentalaccountant.com, samera.co.uk | - |
| 16 | Doctors / GPs | 3 | 3.0 | 1.7 | STRONG_SPECIALISTS | bw-medical.co.uk | also: draccountant.org, medicaccountants.co.uk, accountants4nhsdoctors.co.uk | - |
| 17 | Locum doctors | 3 | 1.0 | 0.3 | CONTESTED | bw-medical.co.uk | also: oxygenaccounting.co.uk | - |
| 18 | Locum pharmacists | 2 | 4.0 | 0.0 | STRONG_SPECIALISTS | pharmacistaccountants.co.uk | also: gorillaaccounting.com, stetsonaccountants.co.uk, arr.co.uk | - |
| 19 | Pharmacies | 3 | 3.0 | 0.7 | STRONG_SPECIALISTS | pharmatax.co.uk | also: sykes-cpa.com, pharmacyaccountants.co.uk, pharmacistaccountants.co.uk | - |
| 20 | Opticians / optometrists | 3 | 2.3 | 0.0 | CONTESTED | rsbc.uk | also: emaccountancy.co.uk, ibgconsulting.co.uk, accurus.co.uk | - |
| 21 | Vets | 3 | 0.3 | 0.0 | NO_SPECIALISTS | - | also: gorillaaccounting.com | - |
| 22 | Therapists & allied health | 3 | 1.7 | 0.0 | WEAK_FIELD | - | also: redtulips.co.uk, theaccountingstudio.co.uk, shirleysmithaccountancy.co.uk, leona | - |
| 23 | Nurses / healthcare professionals | 3 | 0.3 | 0.3 | NO_SPECIALISTS | - | also: medicalhealthaccountants.uk | - |
| 24 | Care homes | 3 | 1.3 | 0.0 | CONTESTED | franksaccountants.co.uk | also: careaccounts.co.uk, carehomeaccounts.com | - |
| 25 | Domiciliary care agencies | 3 | 1.0 | 0.0 | WEAK_FIELD | - | also: careaccounts.co.uk, carehome-accountants.co.uk | - |
| 26 | Childminders / nurseries | 3 | 2.7 | 0.0 | CONTESTED | caservices.org.uk, samera.co.uk | also: accountancykids.co.uk, bradleysaccountants.co.uk | - |
| 27 | Foster carers | 3 | 1.0 | 0.0 | WEAK_FIELD | - | also: bkplus.co.uk, octopusfostering.co.uk, caservices.org.uk | - |
| 28 | Solicitors / law firms | 3 | 0.3 | 0.3 | NO_SPECIALISTS | - | also: taxlawresearch.com | accountsforlawyers.co.uk #2 (accountant for solicitors) |
| 29 | Barristers | 3 | 2.3 | 0.0 | CONTESTED | chambersaccountants.co.uk, barrister.expert | also: barristeraccountantuk.co.uk | - |
| 30 | IT contractors | 3 | 3.3 | 2.0 | CONTESTED | - | also: no-worries.co.uk, contractor-accountants.org.uk, gorillaaccounting.com, freestyl | - |
| 31 | Freelancers | 3 | 0.7 | 1.0 | CONTESTED | gorillaaccounting.com | - |
| 32 | Management consultants | 3 | 0.0 | 0.0 | NO_SPECIALISTS | - | - |
| 33 | Startups | 3 | 0.7 | 0.7 | WEAK_FIELD | - | also: startupaccountancy.com, barnesandscott.com | - |
| 34 | Tech / SaaS companies | 3 | 1.0 | 0.3 | WEAK_FIELD | - | also: chartaccountancy.com, buttmiller.co.uk, techaccounting.co.uk | - |
| 35 | Ecommerce sellers | 3 | 2.7 | 0.3 | CONTESTED | - | also: ecommerceaccountants.co.uk, yourecommerceaccountant.co.uk, fullyaccountable.com, | - |
| 36 | Amazon FBA sellers | 3 | 2.7 | 1.0 | CONTESTED | - | also: yourecommerceaccountant.co.uk, ibissandco.com, beanninjas.com, audtax.co.uk | - |
| 37 | Content creators / influencers | 3 | 4.0 | 0.0 | STRONG_SPECIALISTS | influencers.accountants | also: jccastleaccounting.com, earegolding.com, smoothaccounting.co.uk | - |
| 38 | OnlyFans creators | 3 | 1.7 | 0.0 | WEAK_FIELD | - | also: oneandonlyaccounts.com, onlytax.co.uk, accounting4creators.com | hollowaydavies.co.uk #1 (onlyfans accountant); hollowaydavies.co.uk #2 (accountant for onlyfans creators); hollowaydavies.co.uk #2 (onlyfans tax uk accountant) |
| 39 | Crypto traders / investors | 3 | 3.0 | 1.0 | CONTESTED | - | also: yourcryptoaccountant.co.uk, cryptoaccountants.live, cryptoaccountants.org.uk, cr | - |
| 40 | Day / forex traders | 3 | 1.0 | 0.3 | CONTESTED | accountantsfortraders.co.uk | - |
| 41 | Musicians | 3 | 5.7 | 0.0 | STRONG_SPECIALISTS | gorillaaccounting.com, performanceaccountancy.co.uk, streetsmedia.co.uk | also: eareband.co.uk | - |
| 42 | Actors / entertainment industry | 3 | 4.7 | 0.0 | STRONG_SPECIALISTS | creativeandnumbers.co.uk, accounting4actors.co.uk, theataccounts.co.uk | also: streetsmedia.co.uk | - |
| 43 | Film & TV production | 3 | 1.7 | 0.0 | WEAK_FIELD | - | also: creativeandnumbers.co.uk, abbeystevens.co.uk, artisan-accounts.co.uk, eam.co.uk | - |
| 44 | Artists / creatives | 3 | 2.0 | 0.3 | CONTESTED | creative.accountants | also: creativeandnumbers.co.uk, accountsstudio.co.uk, alfredwallis.org.uk | - |
| 45 | Authors / writers | 3 | 3.7 | 1.3 | STRONG_SPECIALISTS | riters.tax, creativeandnumbers.co.uk | also: creative.accountants, authortax.co.uk | - |
| 46 | Photographers | 3 | 2.0 | 0.0 | CONTESTED | orendacollective.co.uk, creativeandnumbers.co.uk | also: creative.accountants, alchemyaccountancy.com | - |
| 47 | Interior designers | 3 | 1.3 | 1.0 | CONTESTED | creativeandnumbers.co.uk, creative.accountants | - |
| 48 | Marketing agencies | 3 | 2.7 | 0.0 | CONTESTED | sidekickaccounting.co.uk | also: riseaccounting.co.uk, streetsmedia.co.uk, creativeandnumbers.co.uk | - |
| 49 | Recruitment agencies | 3 | 1.7 | 0.3 | CONTESTED | recruitmentaccountants.com | also: therecruitersaccountant.co.uk, searchaccountancy.com | - |
| 50 | Architects | 3 | 0.3 | 0.7 | NO_SPECIALISTS | - | also: creative.accountants | - |
| 51 | Engineers / engineering consultants | 3 | 1.0 | 0.3 | CONTESTED | gorillaaccounting.com | - |
| 52 | Financial advisers / FCA-regulated firms | 3 | 0.0 | 0.7 | NO_SPECIALISTS | - | - |
| 53 | Restaurants | 3 | 2.0 | 0.3 | CONTESTED | paperchase.ac | also: pie-accountants-brighton.co.uk, illiamsstanley.co, thehospitalityaccountants.com | hollowaydavies.co.uk #4 (hospitality accountant restaurant) |
| 54 | Takeaways | 3 | 0.3 | 0.3 | NO_SPECIALISTS | - | also: aydansmith.com | - |
| 55 | Pubs & bars | 3 | 0.7 | 0.0 | WEAK_FIELD | - | also: paperchase.ac, roslyns.co.uk | - |
| 56 | Hotels & guesthouses | 3 | 0.3 | 0.0 | NO_SPECIALISTS | - | also: paperchase.ac | - |
| 57 | Hospitality (family) | 3 | 0.7 | 0.7 | WEAK_FIELD | - | also: thehospitalityaccountants.com, paperchase.ac | - |
| 58 | Event caterers | 3 | 0.3 | 0.0 | NO_SPECIALISTS | - | also: solutions4caterers.co.uk | - |
| 59 | Travel agents / tour operators | 3 | 1.7 | 0.3 | CONTESTED | las-accounting.co.uk | also: vatnav.com | - |
| 60 | Hairdressers / barbers / beauty | 3 | 4.0 | 0.0 | STRONG_SPECIALISTS | salonexpertaccountants.co.uk | also: pinkbutterflyaccounting.co.uk, thebeautyaccountant.co.uk, abundanceaccountancy.c | - |
| 61 | Gyms / fitness / personal trainers | 3 | 3.0 | 0.3 | STRONG_SPECIALISTS | orendacollective.co.uk, fitnessindustryaccountants.com | also: fitprofinancial.co.uk, strengthinnumbers.co.uk | hollowaydavies.co.uk #2 (accountant for personal trainers) |
| 62 | Sports clubs | 3 | 1.3 | 0.3 | CONTESTED | sportsclubaccounting.co.uk | also: auria.accountants, cubedconsultancy.com | - |
| 63 | Footballers / sports professionals | 3 | 2.3 | 0.0 | CONTESTED | - | also: pricebailey.co.uk, supremesportstax.com, footballaccountant.com, gtn.uk | - |
| 64 | Taxi & private-hire drivers | 3 | 0.3 | 0.0 | NO_SPECIALISTS | - | also: rbstaxiaccountingservices.com | hollowaydavies.co.uk #8 (uber driver tax return uk) |
| 65 | Couriers / delivery drivers | 3 | 1.3 | 0.0 | WEAK_FIELD | - | also: earegolding.com, rsbc.uk, moveoncourier.com, u-deliver.co.uk | - |
| 66 | Hauliers / trucking | 3 | 2.7 | 0.0 | CONTESTED | yorkshireaccountancy.co.uk | also: hawsons.co.uk, rsbc.uk, hitingsllp.co.uk | - |
| 67 | Pilots / aviation | 3 | 0.3 | 0.0 | NO_SPECIALISTS | - | also: brooksonone.co.uk | - |
| 68 | Farmers / agriculture | 3 | 1.0 | 0.7 | WEAK_FIELD | - | also: mitchells-accountants.co.uk, albertgoodman.co.uk, accucloud.co.uk | - |
| 69 | Retail / independent shops | 3 | 0.0 | 1.0 | NO_SPECIALISTS | - | - |
| 70 | Used car dealers / automotive | 3 | 0.7 | 0.3 | WEAK_FIELD | - | also: maynardjohns.com, clayshawbutler.com | - |
| 71 | Jewellers | 2 | 0.0 | 0.5 | NO_SPECIALISTS | - | - |
| 72 | Cake makers / food producers | 3 | 0.7 | 0.0 | WEAK_FIELD | - | also: nsiaccounting.com, pie-accountants-brighton.co.uk | - |
| 73 | Manufacturing | 3 | 0.7 | 0.0 | WEAK_FIELD | - | also: skynetaccounting.co.uk | - |
| 74 | Charities / non-profits | 3 | 2.3 | 0.0 | CONTESTED | accountantsforcharities.org.uk | also: accountantsforcharities.uk, nfpaccountants.co.uk, charityaccountants.co.uk | - |
| 75 | CICs / social enterprises | 3 | 3.0 | 0.0 | STRONG_SPECIALISTS | cicaccountants.co.uk | also: harrisaccountancy.co.uk, accountingforgood.co.uk, socialenterpriseaccountscic.co | - |
| 76 | Churches / religious organisations | 3 | 2.0 | 0.0 | CONTESTED | pryceaccountants.co.uk | also: yattandco.net, faithstar.co.uk, church-accountant.com | - |
| 77 | Schools & academies | 3 | 1.3 | 0.0 | CONTESTED | academyadvisory.com | also: academyaudit.com | hollowaydavies.co.uk #1 (accountant for schools) |
| 78 | Tutors / private teachers | 3 | 0.0 | 0.0 | NO_SPECIALISTS | - | - |
| 79 | Driving instructors | 3 | 2.0 | 0.0 | CONTESTED | vanillaonlineaccountancy.co.uk, uk-ccm.com | also: my-driving-instructor-accountant.co.uk, zelahsolutions.com | - |
| 80 | Expats / non-residents | 3 | 3.7 | 0.0 | STRONG_SPECIALISTS | globaltaxconsulting.co.uk | also: cangafltd.com, baktax.com, lsrpartners.com | - |
| 81 | High-net-worth individuals | 3 | 1.0 | 0.3 | WEAK_FIELD | - | also: iwnaccountancy.co.uk, hnwtax.com, buttmiller.co.uk | - |
| 82 | Franchisees | 3 | 0.3 | 2.0 | NO_SPECIALISTS | - | also: danbrobusiness.co.uk | - |
| 83 | Virtual assistants | 3 | 0.0 | 1.0 | NO_SPECIALISTS | - | - |
| 84 | Neurodivergent business owners | 3 | 2.7 | 0.0 | CONTESTED | balloonaccounting.co.uk | also: heywoodmacdonald.co.uk, atmoreandco.com | - |
| 85 | Energy & renewables | 3 | 0.3 | 0.0 | NO_SPECIALISTS | - | also: brooksonone.co.uk | - |
| 86 | Life sciences / pharma | 3 | 0.7 | 0.0 | WEAK_FIELD | - | also: ilson-partners.co.uk, thesmartaccountants.co.uk | - |
| 87 | Maritime | 3 | 4.3 | 0.0 | STRONG_SPECIALISTS | marineaccounts.com, seatax.ltd.uk, sktax.co.uk | also: marinetax.com | - |
| 88 | Security firms | 3 | 1.7 | 0.0 | CONTESTED | thexln.com, hittakerandco.com | - |
| 89 | Cleaning businesses | 3 | 0.7 | 0.0 | WEAK_FIELD | - | also: accountants4less.com, shmsltd.com | - |

## Distribution

- CONTESTED: 33
- WEAK_FIELD: 22
- NO_SPECIALISTS: 19
- STRONG_SPECIALISTS: 15

## Own-estate hits (flagged, excluded from competitor counts)

- **Landlords (buy-to-let)** (#1): propertytaxpartners.co.uk at position 9 for 'buy to let accountant'
- **Solicitors / law firms** (#28): accountsforlawyers.co.uk at position 2 for 'accountant for solicitors'
- **OnlyFans creators** (#38): hollowaydavies.co.uk at position 1 for 'onlyfans accountant'
- **OnlyFans creators** (#38): hollowaydavies.co.uk at position 2 for 'accountant for onlyfans creators'
- **OnlyFans creators** (#38): hollowaydavies.co.uk at position 2 for 'onlyfans tax uk accountant'
- **Restaurants** (#53): hollowaydavies.co.uk at position 4 for 'hospitality accountant restaurant'
- **Gyms / fitness / personal trainers** (#61): hollowaydavies.co.uk at position 2 for 'accountant for personal trainers'
- **Taxi & private-hire drivers** (#64): hollowaydavies.co.uk at position 8 for 'uber driver tax return uk'
- **Schools & academies** (#77): hollowaydavies.co.uk at position 1 for 'accountant for schools'

## Audit record

- Sample audit: 30 rows (1 per niche across 30 niches, unique domains), 25 verifiable, 12 corrected (48%), 5 unverifiable (403/refused). Sample list: r2_audit_sample.json.
- Correction pattern: SPECIALIST inflation from sector landing pages; also non-UK firms (US CPA, Irish) and info platforms misread as UK specialists; 1 under-classification (pie-accountants-brighton GENERALIST→SPECIALIST for Restaurants).
- Full SPECIALIST-class re-examination: 543 unique domains homepage-fetched (r2_specaudit_*_output.json), 419 domain+niche override pairs, 509 SERP rows reclassified. Verdict shift: STRONG_SPECIALISTS 51→15, CONTESTED 23→33, WEAK_FIELD 12→22, NO_SPECIALISTS 3→19.
- Caveat: UNVERIFIABLE domains (bot-blocked, ~125 pairs) keep SPECIALIST — specialist density is an upper bound in niches relying on them (e.g. paperchase.ac for hospitality, gorillaaccounting.com for contractor niches).
