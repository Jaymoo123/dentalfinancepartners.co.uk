# R2A: SERP composition per candidate niche

Classes assigned per result by Claude (8 batches, merged); verdicts computed deterministically by r2a_verdicts.py.
Verdict distribution: {'STRONG_SPECIALISTS': 42, 'CONTESTED': 35, 'WEAK_FIELD': 12}

Own-estate hits (excluded from competitor counts): 9
- niche 1 (Landlords (buy-to-let)), query 'buy to let accountant': propertytaxpartners.co.uk [OWN-ESTATE]
- niche 28 (Solicitors / law firms), query 'accountant for solicitors': accountsforlawyers.co.uk [OWN-ESTATE]
- niche 38 (OnlyFans creators), query 'onlyfans accountant': hollowaydavies.co.uk [OWN-ESTATE]
- niche 38 (OnlyFans creators), query 'accountant for onlyfans creators': hollowaydavies.co.uk [OWN-ESTATE]
- niche 38 (OnlyFans creators), query 'onlyfans tax uk accountant': hollowaydavies.co.uk [OWN-ESTATE]
- niche 53 (Restaurants), query 'hospitality accountant restaurant': hollowaydavies.co.uk [OWN-ESTATE]
- niche 61 (Gyms / fitness / personal trainers), query 'accountant for personal trainers': hollowaydavies.co.uk [OWN-ESTATE]
- niche 64 (Taxi & private-hire drivers), query 'uber driver tax return uk': hollowaydavies.co.uk [OWN-ESTATE]
- niche 77 (Schools & academies), query 'accountant for schools': hollowaydavies.co.uk [OWN-ESTATE]

## Sample audit (26 results, manager-reviewed)

~80% clean. Two systematic biases found, both conservative (they OVERSTATE competition):
1. Non-UK firms (e.g. pilot.com, US CPA firms) sometimes classed SPECIALIST — inflates specialist counts in globally-flavoured niches (startups, tech/SaaS, crypto, ecommerce). Their STRONG_SPECIALISTS verdicts may be softer than shown.
2. Generalist-firm-with-dedicated-niche-page vs SPECIALIST boundary inconsistent in both directions.
R3 deep research fetch-verifies every surviving competitor with an explicit UK check, which corrects both. Use these verdicts as rank-order signal, not absolute counts.

| # | Niche | Q | Avg specialists/top10 | Dominant specialists | Dir sat | Verdict |
|---|---|---|---|---|---|---|
| 1 | Landlords (buy-to-let) | 3 | 5.33 | gorillaaccounting.com, taxaccountant.co.uk, uklandlordtax.co.uk | 0.0 | STRONG_SPECIALISTS |
| 2 | Property investors | 3 | 6.67 | thepropertyaccountant.co.uk, ukpropertyaccountants.co.uk | 0.0 | STRONG_SPECIALISTS |
| 3 | Airbnb / holiday-let hosts | 3 | 1.67 | - | 0.03 | CONTESTED |
| 4 | Property developers | 3 | 2.33 | fhpaccounting.co.uk, reedaccountants.co.uk | 0.0 | CONTESTED |
| 5 | Property management companies | 3 | 2.67 | fhpaccounting.co.uk, ukpropertyaccountants.co.uk | 0.07 | CONTESTED |
| 6 | Estate & letting agents | 3 | 2.33 | axtpropertyaccountants.co.uk, homeaccountants.co.uk | 0.0 | CONTESTED |
| 7 | Landed estates / rural estates | 3 | 9.0 | beavismorgan.com, brightshire.co.uk, johnstoncarmichael.com, pkf-francisclark.co.uk | 0.0 | STRONG_SPECIALISTS |
| 8 | Construction / CIS subcontractors | 3 | 2.0 | icsuk.com | 0.03 | CONTESTED |
| 9 | Builders | 3 | 4.33 | accountantforbuilders.co.uk, grahambarnesaccountant.co.uk | 0.1 | STRONG_SPECIALISTS |
| 10 | Plumbers / heating engineers | 3 | 2.0 | cobiaaccounting.co.uk, togetherwecount.co.uk | 0.0 | CONTESTED |
| 11 | Electricians | 3 | 2.0 | qaccounting.com | 0.0 | CONTESTED |
| 12 | Painters & decorators | 3 | 2.0 | decoratoraccountants.com, yorkshireaccountancy.co.uk | 0.17 | CONTESTED |
| 13 | Landscapers / gardeners | 3 | 3.33 | accountingforsubs.com, prestigebm.co.uk | 0.03 | CONTESTED |
| 14 | Tradespeople (family) | 3 | 5.33 | manvic.com.au, pulse-accountants.co.uk, taxrelax.co.uk, tradeaccountant.co.uk | 0.03 | STRONG_SPECIALISTS |
| 15 | Dentists | 3 | 6.33 | dentalaccountant.com, dentalaccounting.co.uk, djh.co.uk, pfmdental.co.uk | 0.0 | STRONG_SPECIALISTS |
| 16 | Doctors / GPs | 3 | 4.67 | bw-medical.co.uk, draccountant.org | 0.17 | STRONG_SPECIALISTS |
| 17 | Locum doctors | 3 | 3.33 | bw-medical.co.uk, thedoctorscpa.com | 0.03 | CONTESTED |
| 18 | Locum pharmacists | 2 | 5.0 | goforma.com, gorillaaccounting.com, pharmacistaccountants.co.uk | 0.0 | STRONG_SPECIALISTS |
| 19 | Pharmacies | 3 | 4.67 | pharmatax.co.uk, sykes-cpa.com | 0.07 | STRONG_SPECIALISTS |
| 20 | Opticians / optometrists | 3 | 5.33 | emaccountancy.co.uk, rsbc.uk | 0.0 | STRONG_SPECIALISTS |
| 21 | Vets | 3 | 6.0 | onlyforveterinarians.com, vetcpaco.com, veterinarianaccountant.com | 0.0 | STRONG_SPECIALISTS |
| 22 | Therapists & allied health | 3 | 3.67 | tldraccounting.com | 0.0 | STRONG_SPECIALISTS |
| 23 | Nurses / healthcare professionals | 3 | 2.0 | - | 0.03 | CONTESTED |
| 24 | Care homes | 3 | 3.67 | accountaxzone.com, franksaccountants.co.uk, morriscrocker.co.uk | 0.0 | STRONG_SPECIALISTS |
| 25 | Domiciliary care agencies | 3 | 3.0 | careaccounts.co.uk, elevateaccountancy.co.uk, loyals.uk | 0.0 | CONTESTED |
| 26 | Childminders / nurseries | 3 | 4.0 | accountancykids.co.uk, caservices.org.uk, samera.co.uk | 0.0 | STRONG_SPECIALISTS |
| 27 | Foster carers | 3 | 1.67 | - | 0.0 | CONTESTED |
| 28 | Solicitors / law firms | 3 | 1.33 | nichols.co.uk | 0.03 | WEAK_FIELD |
| 29 | Barristers | 3 | 3.33 | barrister.expert, chambersaccountants.co.uk, theonlineaccountants.uk | 0.0 | CONTESTED |
| 30 | IT contractors | 3 | 6.0 | icsuk.com, no-worries.co.uk | 0.2 | STRONG_SPECIALISTS |
| 31 | Freelancers | 3 | 0.67 | gorillaaccounting.com | 0.1 | WEAK_FIELD |
| 32 | Management consultants | 3 | 1.67 | - | 0.0 | CONTESTED |
| 33 | Startups | 3 | 2.0 | - | 0.07 | CONTESTED |
| 34 | Tech / SaaS companies | 3 | 6.0 | approved-accounting.co.uk | 0.03 | STRONG_SPECIALISTS |
| 35 | Ecommerce sellers | 3 | 6.67 | e-accounts.co.uk, ecommerceaccountants.co.uk | 0.03 | STRONG_SPECIALISTS |
| 36 | Amazon FBA sellers | 3 | 6.67 | a2zaccounting.co.uk, archimediaaccounts.co.uk, e-accounts.co.uk, jpaccountant.info | 0.1 | STRONG_SPECIALISTS |
| 37 | Content creators / influencers | 3 | 5.67 | influencers.accountants, jccastleaccounting.com | 0.0 | STRONG_SPECIALISTS |
| 38 | OnlyFans creators | 3 | 4.0 | finsightaccountants.co.uk, hawkinsaccounting.co.uk, oneandonlyaccounts.com, onlytax.co.uk | 0.0 | STRONG_SPECIALISTS |
| 39 | Crypto traders / investors | 3 | 4.33 | mmba.co.uk | 0.1 | STRONG_SPECIALISTS |
| 40 | Day / forex traders | 3 | 2.0 | accountantsfortraders.co.uk | 0.03 | CONTESTED |
| 41 | Musicians | 3 | 7.67 | creative.accountants, eareband.co.uk, gorillaaccounting.com, performanceaccountancy.co.uk | 0.0 | STRONG_SPECIALISTS |
| 42 | Actors / entertainment industry | 3 | 5.67 | accounting4actors.co.uk, creativeandnumbers.co.uk, srlv.co.uk, streetsmedia.co.uk | 0.0 | STRONG_SPECIALISTS |
| 43 | Film & TV production | 3 | 5.33 | creativeandnumbers.co.uk, mooreks.co.uk | 0.0 | STRONG_SPECIALISTS |
| 44 | Artists / creatives | 3 | 4.0 | creative.accountants, creativeandnumbers.co.uk | 0.03 | STRONG_SPECIALISTS |
| 45 | Authors / writers | 3 | 5.0 | authortax.co.uk, creative.accountants, creativeandnumbers.co.uk, hwfisher.co.uk | 0.13 | STRONG_SPECIALISTS |
| 46 | Photographers | 3 | 3.67 | creativeandnumbers.co.uk, orendacollective.co.uk | 0.0 | STRONG_SPECIALISTS |
| 47 | Interior designers | 3 | 1.67 | creative.accountants, creativeandnumbers.co.uk | 0.1 | CONTESTED |
| 48 | Marketing agencies | 3 | 5.0 | sidekickaccounting.co.uk | 0.0 | STRONG_SPECIALISTS |
| 49 | Recruitment agencies | 3 | 2.0 | recruitmentaccountants.com, therecruitersaccountant.co.uk | 0.03 | CONTESTED |
| 50 | Architects | 3 | 0.67 | - | 0.07 | WEAK_FIELD |
| 51 | Engineers / engineering consultants | 3 | 3.33 | gorillaaccounting.com, icsuk.com, qaccounting.com, strivex.co.uk | 0.03 | CONTESTED |
| 52 | Financial advisers / FCA-regulated firms | 3 | 0.33 | - | 0.07 | WEAK_FIELD |
| 53 | Restaurants | 3 | 3.0 | paperchase.ac | 0.03 | CONTESTED |
| 54 | Takeaways | 3 | 0.67 | - | 0.03 | WEAK_FIELD |
| 55 | Pubs & bars | 3 | 1.33 | - | 0.0 | WEAK_FIELD |
| 56 | Hotels & guesthouses | 3 | 1.0 | - | 0.0 | WEAK_FIELD |
| 57 | Hospitality (family) | 3 | 1.67 | - | 0.07 | CONTESTED |
| 58 | Event caterers | 3 | 1.0 | - | 0.0 | WEAK_FIELD |
| 59 | Travel agents / tour operators | 3 | 2.0 | las-accounting.co.uk | 0.03 | CONTESTED |
| 60 | Hairdressers / barbers / beauty | 3 | 4.0 | pinkbutterflyaccounting.co.uk, salonexpertaccountants.co.uk, thebeautyaccountant.co.uk | 0.0 | STRONG_SPECIALISTS |
| 61 | Gyms / fitness / personal trainers | 3 | 4.67 | account-ease.co.uk, fitnessindustryaccountants.com, orendacollective.co.uk | 0.03 | STRONG_SPECIALISTS |
| 62 | Sports clubs | 3 | 3.67 | livingstonesaccountants.co.uk, sportsclubaccounting.co.uk | 0.03 | STRONG_SPECIALISTS |
| 63 | Footballers / sports professionals | 3 | 7.33 | odiritaxconsultants.com, ross-brooke.co.uk, srlv.co.uk | 0.0 | STRONG_SPECIALISTS |
| 64 | Taxi & private-hire drivers | 3 | 4.67 | gondalaccountancy.co.uk | 0.0 | STRONG_SPECIALISTS |
| 65 | Couriers / delivery drivers | 3 | 4.33 | gondalaccountancy.co.uk | 0.0 | STRONG_SPECIALISTS |
| 66 | Hauliers / trucking | 3 | 6.67 | clarandaccountants.co.uk, hawsons.co.uk, ross-brooke.co.uk, yorkshireaccountancy.co.uk | 0.0 | STRONG_SPECIALISTS |
| 67 | Pilots / aviation | 3 | 2.0 | - | 0.0 | CONTESTED |
| 68 | Farmers / agriculture | 3 | 7.33 | azets.com, hazlewoods.co.uk, lovewell-blake.co.uk, yorkshirecompanyaccountants.co.uk | 0.07 | STRONG_SPECIALISTS |
| 69 | Retail / independent shops | 3 | 0.33 | - | 0.1 | WEAK_FIELD |
| 70 | Used car dealers / automotive | 3 | 5.33 | sunnyaccs.co.uk | 0.03 | STRONG_SPECIALISTS |
| 71 | Jewellers | 2 | 1.5 | - | 0.05 | CONTESTED |
| 72 | Cake makers / food producers | 3 | 5.33 | - | 0.0 | STRONG_SPECIALISTS |
| 73 | Manufacturing | 3 | 0.67 | skynetaccounting.co.uk | 0.0 | WEAK_FIELD |
| 74 | Charities / non-profits | 3 | 2.67 | accountantsforcharities.org.uk | 0.0 | CONTESTED |
| 75 | CICs / social enterprises | 3 | 3.33 | accountingforgood.co.uk, cicaccountants.co.uk, harrisaccountancy.co.uk | 0.0 | CONTESTED |
| 76 | Churches / religious organisations | 3 | 3.0 | pryceaccountants.co.uk, yattandco.net | 0.0 | CONTESTED |
| 77 | Schools & academies | 3 | 2.0 | academyadvisory.com | 0.0 | CONTESTED |
| 78 | Tutors / private teachers | 3 | 1.0 | btbaccountants.co.uk | 0.0 | WEAK_FIELD |
| 79 | Driving instructors | 3 | 3.33 | uk-ccm.com, vanillaonlineaccountancy.co.uk | 0.0 | CONTESTED |
| 80 | Expats / non-residents | 3 | 7.67 | accusolveaccountants.com, globaltaxconsulting.co.uk, petersonsims.com, titanwealthinternational.com | 0.0 | STRONG_SPECIALISTS |
| 81 | High-net-worth individuals | 3 | 3.33 | - | 0.03 | CONTESTED |
| 82 | Franchisees | 3 | 3.0 | mneaccounting.co.uk | 0.2 | CONTESTED |
| 83 | Virtual assistants | 3 | 0.33 | - | 0.1 | WEAK_FIELD |
| 84 | Neurodivergent business owners | 3 | 4.33 | atmoreandco.com, balloonaccounting.co.uk, heywoodmacdonald.co.uk, macleodaccounting.co.uk | 0.0 | STRONG_SPECIALISTS |
| 85 | Energy & renewables | 3 | 4.33 | cuttsandco.co.uk, parsons.co.uk | 0.0 | STRONG_SPECIALISTS |
| 86 | Life sciences / pharma | 3 | 2.67 | plusaccounting.co.uk, richardsons-group.co.uk | 0.0 | CONTESTED |
| 87 | Maritime | 3 | 4.67 | marineaccounts.com, marinetax.com, seatax.ltd.uk, sktax.co.uk | 0.0 | STRONG_SPECIALISTS |
| 88 | Security firms | 3 | 3.0 | apexaccountants.tax, hittakerandco.com, thexln.com | 0.0 | CONTESTED |
| 89 | Cleaning businesses | 3 | 2.0 | sbxaccountants.com | 0.0 | CONTESTED |
