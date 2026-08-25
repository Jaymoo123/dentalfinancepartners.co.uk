# C3: Demand, rebuilt from raw and deduplicated

Date 2026-08-25. Leg C3 of the definitive niche map.

**Zero paid API calls were made building this.** Every number below comes from
DataForSEO responses already on disk and already paid for, plus two genuinely free
signals (Google Autocomplete's public suggest endpoint, and our own GSC and Bing
Webmaster query data). `DATAFORSEO_ABORT_AT` was not read, set or raised.

`R2D_VOLUMES.md` is untouched. It remains the historical record of the 2026-07-11 pull.

---

## 1. Method: close-variant detection, so the figures are re-derivable

Google Ads reports **one volume for a whole close-variant group**. Every phrasing in
the group carries that same number. Summing the phrasings therefore multiplies demand
that only exists once. `R2D_VOLUMES.md` built its "Cluster vol" column by summing 3 to 5
phrasings per niche, so it inherited that multiplication.

**Detection rule, exact:**

> Two keywords belong to the same close-variant group **iff their 12-month
> `monthly_searches` arrays are byte-identical**, compared as the ordered list of
> `(year, month, search_volume)` triples, **and** `search_volume` is non-null and
> greater than zero.
>
> Keywords with `search_volume` null or zero are **never grouped**. They carry no
> signal, and grouping them would merge unrelated dead terms into one fake group.
>
> A group contributes its volume **once** to the cluster total.

Why byte-identical rather than a fuzzy string key: it needs no judgment, no stopword
list and no stemmer, so anyone can re-run it and get the same answer. It is also the
**conservative** choice. It only fires when Google has demonstrably served the same
underlying number, so it under-collapses rather than over-collapses. Measured against
the looser token-set method used on today's crypto family, byte-identical finds 1.54x
where token-set finds 2.32x. Treat byte-identical as the **floor** of the true inflation
and token-set as the ceiling.

**Re-derivation inputs**

| What | Path |
|---|---|
| R2D raw responses | `expansion_research/r2d_raw_full.json` (299 kw), `r2d_raw_probe.json` (10 kw) |
| R2D niche mapping | `expansion_research/r2d_volumes.json` (309 rows, keyword to niche_id) |
| Deeper head pulls | `expansion_research/tier{1,2}_*/raw/dfs_head_volumes_raw.json` (8 niches) |
| Deeper Labs corpora | `expansion_research/tier1_*/raw/dfs_suggest_raw.json` (7 niches, 82 to 621 kw each) |
| Today's crypto pull | session scratchpad `crypto_research/raw/` (2,939 kw, keyword_ideas + suggestions) |
| Autocomplete, free | `expansion_research/r1_autocomplete_sweep.py` method, re-probed live 2026-08-25 |
| Own estate signal, free | GSC searchanalytics + Bing GetQueryStats, 15 sites, 90d to 2026-08-25 |

309 of 309 R2D keywords were located in the raw. Nothing was inferred.

---

## 2. The inflation picture

| Measure | Value |
|---|---|
| Published cluster-sum total, all 77 R2D niches | **23,170/mo** |
| Deduplicated total | **15,650/mo** |
| Inflation factor | **1.481x** |
| Close-variant pairs collapsed | **50** |
| Niches affected | **32 of 77** |
| Published total, the 76 niches in the R2D table | 22,520/mo |
| Deduplicated, those 76 | 15,000/mo |

The 77th row is the probe canary (landlords, an excluded niche, 2 keywords, 650/mo).
It is in the raw and in the total, but not in the published table.

The factor is not spread evenly. 45 niches are clean at 1.00x. The damage concentrates
in the head, which is exactly where it changes decisions:

| Niche | Published | Dedup | Factor |
|---|---|---|---|
| Charities / non-profits | 2,570 | 800 | 3.21x |
| Musicians | 200 | 50 | 4.00x |
| Churches | 30 | 10 | 3.00x |
| Architects | 120 | 40 | 3.00x |
| Electricians | 220 | 80 | 2.75x |
| Hospitality (family) | 1,240 | 460 | 2.70x |
| Pubs & bars | 450 | 170 | 2.65x |
| Startups | 2,330 | 890 | 2.62x |
| Photographers | 130 | 50 | 2.60x |
| Restaurants | 470 | 200 | 2.35x |

### 2b. A second, independent overstatement layer: the September 2025 spike

Separate from close variants and worth stating because it is the same class of error.
`search_volume` is a 12-month **average**. Across the 202 volume-bearing R2D keywords,
**110 peak in September 2025 at three times or more their own median month**. One shared
peak month across half the corpus is an artefact, not 110 independent seasonal niches.

- September 2025 carries a **median 22.6%** of each keyword's 12-month total. A flat year
  would be 8.3%.
- Sum of reported 12-month averages: 23,170. Sum of median months: **17,600**. Ratio **1.32x**.
- Deduplicated on a median-month basis, the 77 niches are worth **12,190/mo**, not 15,650.

**Use 15,650 as the deduplicated headline** (it is like-for-like with the published
figure, both being 12-month averages). Keep 12,190 as the "typical month" read, and use
it if anyone is sizing a monthly lead flow rather than comparing niches.

### 2c. Reliability caveat: the same keyword moved 5.7x in four days

"farm accountant" returned **30/mo on 2026-07-11** (R2D) and **170/mo on 2026-07-15**
(tier2_farmers), same location, same language, same 12-month window ending June 2026,
and with completely different monthly arrays (10/30/20 versus 70/70/70 for the three
most recent months). Google re-cut the close-variant group between the two pulls and
every member's number moved with it. Singular and plural pairs stayed byte-identical
across both pulls, so the *grouping* is stable; the *group's value* is not.

Consequence: trust the **rank order** and the **best single term**, not the absolute
cluster figure, on anything under a few hundred a month.

---

## 3. The rebuilt demand table, re-ranked

`dR` deduplicated rank, `pR` published rank, `mv` movement (positive means it rose).
`Best term` is unaffected by the close-variant trap and is the anchor. `null/kw` is how
many of the niche's seed keywords returned null. `Seeds` records whether a deeper pull
exists for that niche (`deep`) or whether it is still on R2D's 3 to 5 phrasings (`3-5`).

| dR | pR | mv | # | Niche | Dedup vol | Published | Inflation | Groups collapsed | Best term | Best vol | null/kw | Seeds |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 3 | +2 | 43 | Film & TV production | 1,710 | 1,710 | 1.00x | 0 | film accountant | 1600 | 0/4 | 3-5 |
| 2 | 5 | +3 | 39 | Crypto traders / investors | 1,360 | 1,360 | 1.00x | 0 | crypto tax uk | 880 | 0/5 | deep |
| 3 | 7 | +4 | 49 | Recruitment agencies | 1,150 | 1,150 | 1.00x | 0 | recruitment agency accountant | 880 | 1/4 | 3-5 |
| 4 | 4 | = | 35 | Ecommerce sellers | 980 | 1,700 | 1.73x | 1 | accountant for ecommerce | 720 | 0/5 | deep |
| 5 | 2 | -3 | 33 | Startups | 890 | 2,330 | 2.62x | 2 | accountant for startups | 720 | 0/4 | deep |
| 6 | 1 | -5 | 74 | Charities / non-profits | 800 | 2,570 | 3.21x | 3 | accountant for charities | 590 | 0/5 | 3-5 |
| 7 | 10 | +3 | 34 | Tech / SaaS companies | 530 | 530 | 1.00x | 0 | tech accountant | 320 | 3/5 | 3-5 |
| 8 | 6 | -2 | 57 | Hospitality (family) | 460 | 1,240 | 2.70x | 2 | hospitality accountant | 390 | 0/4 | deep |
| 9 | 13 | +4 | 85 | Energy & renewables | 440 | 440 | 1.00x | 0 | energy accountant | 390 | 1/4 | 3-5 |
| 10 | 14 | +4 | 87 | Maritime / seafarers | 440 | 440 | 1.00x | 0 | seafarers earnings deduction | 260 | 2/5 | 3-5 |
| 11 | 8 | -3 | 32 | Management consultants | 360 | 680 | 1.89x | 1 | consultant accountant | 320 | 0/4 | 3-5 |
| 12 | 16 | +4 | 68 | Farmers / agriculture | 350 | 410 | 1.17x | 2 | agricultural accountant | 320 | 1/5 | deep |
| 13 | 18 | +5 | 37 | Content creators / influencers | 310 | 310 | 1.00x | 0 | accountant for influencers | 170 | 0/5 | 3-5 |
| 14 | 15 | +1 | 64 | Taxi & private-hire drivers | 310 | 420 | 1.35x | 1 | taxi accountant | 140 | 0/5 | 3-5 |
| 15 | 9 | -6 | 19 | Pharmacies | 300 | 600 | 2.00x | 2 | pharmacy accountant | 210 | 0/4 | deep |
| 16 | 19 | +3 | 36 | Amazon FBA sellers | 300 | 300 | 1.00x | 0 | amazon seller accountant | 110 | 0/4 | 3-5 |
| 17 | 22 | +5 | 73 | Manufacturing | 260 | 260 | 1.00x | 0 | manufacturing accountant | 170 | 1/3 | deep |
| 18 | 23 | +5 | 69 | Retail / independent shops | 250 | 250 | 1.00x | 0 | retail accountant | 210 | 1/4 | deep |
| 19 | 21 | +2 | 44 | Artists / creatives | 220 | 260 | 1.18x | 1 | accountants for creatives | 140 | 0/4 | 3-5 |
| 20 | 24 | +4 | 80 | Expats / non-residents | 210 | 230 | 1.10x | 1 | uk expat tax | 170 | 1/5 | deep |
| 21 | 17 | -4 | 42 | Actors / entertainment industry | 200 | 380 | 1.90x | 2 | entertainment accountant | 110 | 0/4 | 3-5 |
| 22 | 11 | -11 | 53 | Restaurants | 200 | 470 | 2.35x | 3 | restaurant tax | 110 | 0/5 | 3-5 |
| 23 | 30 | +7 | 52 | Financial advisers / FCA firms | 170 | 170 | 1.00x | 0 | ifa accountant | 170 | 3/4 | deep |
| 24 | 12 | -12 | 55 | Pubs & bars | 170 | 450 | 2.65x | 2 | accountant for pubs | 140 | 0/4 | 3-5 |
| 25 | 20 | -5 | 82 | Franchisees | 160 | 300 | 1.88x | 1 | franchise accountant | 140 | 0/3 | 3-5 |
| 26 | 26 | = | 4 | Property developers | 160 | 210 | 1.31x | 1 | property development accountant | 90 | 0/4 | 3-5 |
| 27 | 31 | +4 | 38 | OnlyFans creators | 160 | 160 | 1.00x | 0 | onlyfans accountant | 70 | 0/4 | 3-5 |
| 28 | 34 | +6 | 66 | Hauliers / trucking | 140 | 140 | 1.00x | 0 | transport accountant | 90 | 2/5 | 3-5 |
| 29 | 37 | +8 | 40 | Day / forex traders | 130 | 130 | 1.00x | 0 | accountants for traders | 90 | 1/5 | 3-5 |
| 30 | 40 | +10 | 21 | Vets | 120 | 120 | 1.00x | 0 | veterinary accountant | 110 | 2/4 | 3-5 |
| 31 | 42 | +11 | 56 | Hotels & guesthouses | 110 | 110 | 1.00x | 0 | hotel accountant | 110 | 3/4 | 3-5 |
| 32 | 27 | -5 | 26 | Childminders / nurseries | 110 | 200 | 1.82x | 1 | accountant for childminders | 90 | 2/5 | 3-5 |
| 33 | 29 | -4 | 24 | Care homes | 100 | 190 | 1.90x | 1 | accountants for care homes | 90 | 1/4 | deep |
| 34 | 44 | +10 | 75 | CICs / social enterprises | 90 | 90 | 1.00x | 0 | cic accountant | 90 | 3/4 | 3-5 |
| 35 | 36 | +1 | 14 | Tradespeople (family) | 90 | 130 | 1.44x | 1 | trade accountant | 50 | 2/5 | 3-5 |
| 36 | 35 | -1 | 81 | High-net-worth individuals | 90 | 140 | 1.56x | 1 | accountant for high net worth individuals | 50 | 0/4 | 3-5 |
| 37 | 25 | -12 | 11 | Electricians | 80 | 220 | 2.75x | 2 | accountant for electricians | 70 | 0/4 | 3-5 |
| 38 | 39 | +1 | 51 | Engineers / engineering consultants | 80 | 130 | 1.62x | 1 | engineer accountant | 50 | 1/4 | 3-5 |
| 39 | 45 | +6 | 70 | Used car dealers / automotive | 80 | 80 | 1.00x | 0 | car dealer accountant | 40 | 2/4 | 3-5 |
| 40 | 32 | -8 | 6 | Estate & letting agents | 70 | 140 | 2.00x | 1 | accountants for estate agents | 70 | 2/4 | 3-5 |
| 41 | 33 | -8 | 27 | Foster carers | 70 | 140 | 2.00x | 1 | foster carer tax | 70 | 2/4 | 3-5 |
| 42 | 48 | +6 | 79 | Driving instructors | 60 | 60 | 1.00x | 0 | driving instructor accountant | 50 | 1/3 | 3-5 |
| 43 | 28 | -15 | 41 | Musicians | 50 | 200 | 4.00x | 3 | accountant for musicians | 50 | 0/4 | 3-5 |
| 44 | 51 | +7 | 63 | Footballers / sports professionals | 50 | 50 | 1.00x | 0 | sports accountant | 50 | 3/4 | 3-5 |
| 45 | 38 | -7 | 46 | Photographers | 50 | 130 | 2.60x | 2 | accountant for photographers | 40 | 0/4 | 3-5 |
| 46 | 49 | +3 | 7 | Landed estates / rural estates | 50 | 50 | 1.00x | 0 | rural accountant | 30 | 1/4 | 3-5 |
| 47 | 43 | -4 | 20 | Opticians / optometrists | 50 | 90 | 1.80x | 2 | optometrist accountant | 30 | 0/4 | 3-5 |
| 48 | 50 | +2 | 22 | Therapists & allied health | 50 | 50 | 1.00x | 0 | accountant for therapists | 20 | 1/5 | 3-5 |
| 49 | 41 | -8 | 50 | Architects | 40 | 120 | 3.00x | 2 | accountant for architects | 40 | 1/4 | 3-5 |
| 50 | 46 | -4 | 23 | Nurses / healthcare professionals | 40 | 60 | 1.50x | 2 | accountants for healthcare professionals | 30 | 0/4 | 3-5 |
| 51 | 53 | +2 | 47 | Interior designers | 40 | 40 | 1.00x | 0 | accountant for interior designers | 30 | 1/3 | 3-5 |
| 52 | 55 | +3 | 84 | Neurodivergent business owners | 40 | 40 | 1.00x | 0 | adhd accountant | 30 | 2/4 | 3-5 |
| 53 | 47 | -6 | 60 | Hairdressers / barbers / beauty | 40 | 60 | 1.50x | 1 | accountant for hairdressers | 20 | 1/5 | 3-5 |
| 54 | 52 | -2 | 77 | Schools & academies | 30 | 50 | 1.67x | 1 | academy accountant | 20 | 1/4 | 3-5 |
| 55 | 54 | -1 | 61 | Gyms / fitness / personal trainers | 30 | 40 | 1.33x | 1 | accountant for personal trainers | 10 | 0/4 | 3-5 |
| 56 | 57 | +1 | 5 | Property management companies | 20 | 20 | 1.00x | 0 | property management accountant | 20 | 2/3 | 3-5 |
| 57 | 58 | +1 | 45 | Authors / writers | 20 | 20 | 1.00x | 0 | accountant for writers | 20 | 3/4 | 3-5 |
| 58 | 59 | +1 | 65 | Couriers / delivery drivers | 20 | 20 | 1.00x | 0 | courier accountant | 10 | 2/4 | 3-5 |
| 59 | 60 | +1 | 83 | Virtual assistants | 20 | 20 | 1.00x | 0 | virtual assistant accountant | 10 | 1/3 | 3-5 |
| 60 | 61 | +1 | 10 | Plumbers / heating engineers | 10 | 10 | 1.00x | 0 | plumber tax | 10 | 4/5 | 3-5 |
| 61 | 62 | +1 | 18 | Locum pharmacists | 10 | 10 | 1.00x | 0 | locum pharmacist tax | 10 | 2/3 | 3-5 |
| 62 | 63 | +1 | 54 | Takeaways | 10 | 10 | 1.00x | 0 | takeaway tax | 10 | 3/4 | 3-5 |
| 63 | 64 | +1 | 58 | Event caterers | 10 | 10 | 1.00x | 0 | catering accountant | 10 | 2/3 | 3-5 |
| 64 | 65 | +1 | 67 | Pilots / aviation | 10 | 10 | 1.00x | 0 | aviation accountant | 10 | 3/4 | 3-5 |
| 65 | 56 | -9 | 76 | Churches / religious organisations | 10 | 30 | 3.00x | 2 | accountant for churches | 10 | 0/3 | 3-5 |
| 66 | 66 | = | 78 | Tutors / private teachers | 10 | 10 | 1.00x | 0 | private tutor tax | 10 | 2/3 | 3-5 |
| 67 | 67 | = | 86 | Life sciences / pharma | 10 | 10 | 1.00x | 0 | biotech accountant | 10 | 3/4 | 3-5 |
| 68 | 68 | = | 89 | Cleaning businesses | 10 | 10 | 1.00x | 0 | cleaner tax | 10 | 3/4 | 3-5 |
| 69 | 69 | = | 12 | Painters & decorators | null | null | n/a | 0 | accountant for painters and decorators | null | 4/4 | 3-5 |
| 70 | 70 | = | 13 | Landscapers / gardeners | null | null | n/a | 0 | accountant for landscapers | null | 4/4 | 3-5 |
| 71 | 71 | = | 25 | Domiciliary care agencies | null | null | n/a | 0 | accountant for care agencies | null | 3/3 | 3-5 |
| 72 | 72 | = | 59 | Travel agents / tour operators | 10* | null | n/a | 0 | travel agency accountant* | 10* | 4/4 | deep |
| 73 | 73 | = | 62 | Sports clubs | null | null | n/a | 0 | accountant for sports clubs | null | 3/3 | 3-5 |
| 74 | 74 | = | 71 | Jewellers | null | null | n/a | 0 | accountant for jewellers | null | 3/3 | 3-5 |
| 75 | 75 | = | 72 | Cake makers / food producers | null | null | n/a | 0 | accountant for food business | null | 4/4 | 3-5 |
| 76 | 76 | = | 88 | Security firms | null | null | n/a | 0 | accountant for security companies | null | 3/3 | 3-5 |
\* #59 Travel agents: R2D's four phrasings all returned null. The tier2_travel pull four days later measured the group "travel agency accountant" = "travel agent accountants" = "accountants for travel agents" at **10/mo**. That is a measurement, not an inference. See section 5.


---

## 4. The ranking change: the headline

**Charities falls from 1st to 6th. Startups falls from 2nd to 5th. Film, crypto and
recruitment take the top three, and all three are already suspect on intent.**

Biggest fallers, and what they were:

| Niche | pR | dR | Move | Published | Dedup | Why |
|---|---|---|---|---|---|---|
| Musicians | 28 | 43 | -15 | 200 | 50 | four phrasings, one group |
| Pubs & bars | 12 | 24 | -12 | 450 | 170 | three phrasings, one group |
| Electricians | 25 | 37 | -12 | 220 | 80 | three phrasings, one group |
| Restaurants | 11 | 22 | -11 | 470 | 200 | four phrasings, one group |
| Churches | 56 | 65 | -9 | 30 | 10 | three phrasings, one group |
| Estate & letting agents | 32 | 40 | -8 | 140 | 70 | two phrasings, one group |
| Foster carers | 33 | 41 | -8 | 140 | 70 | two phrasings, one group |
| Architects | 41 | 49 | -8 | 120 | 40 | three phrasings, one group |
| Photographers | 38 | 45 | -7 | 130 | 50 | three phrasings, one group |
| Pharmacies | 9 | 15 | -6 | 600 | 300 | two groups of two |
| Charities | **1** | **6** | -5 | 2,570 | 800 | **four phrasings, one group** |
| Hospitality | 6 | 8 | -2 | 1,240 | 460 | three phrasings, one group |
| Startups | **2** | **5** | -3 | 2,330 | 890 | **three phrasings, one group** |

Biggest risers, all of them clean 1.00x niches that were simply out-summed by inflated
neighbours:

| Niche | pR | dR | Move | Dedup |
|---|---|---|---|---|
| Hotels & guesthouses | 42 | 31 | +11 | 110 |
| Vets | 40 | 30 | +10 | 120 |
| CICs / social enterprises | 44 | 34 | +10 | 90 |
| Day / forex traders | 37 | 29 | +8 | 130 |
| Financial advisers / FCA firms | 30 | 23 | +7 | 170 |
| Footballers / sports professionals | 51 | 44 | +7 | 50 |
| Hauliers / trucking | 34 | 28 | +6 | 140 |
| Used car dealers | 45 | 39 | +6 | 80 |
| Driving instructors | 48 | 42 | +6 | 60 |

**What did not move:** the top of the list is still the top of the list in kind. No niche
outside the published top 10 entered the deduplicated top 6. The trap re-ordered the
head, it did not reveal a hidden winner. The practical damage is that Charities and
Startups were carrying a 3.2x and 2.6x overstatement into a build decision.

### The 50 collapsed groups, in full

Every group below is one Google Ads close-variant group. Each contributed its volume
once, not once per phrasing.

| # | Niche | Group (all members share one volume) |
|---|---|---|
| 74 | Charities / non-profits | accountant for charities = accountants for charities = charity accountant = charity accountants |
| 33 | Startups | accountant for startups = accountants for startups = startup accountant |
| 35 | Ecommerce sellers | accountant for ecommerce = ecommerce accountant |
| 57 | Hospitality (family) | hospitality accountant = accountants for hospitality = hospitality accounting |
| 32 | Management consultants | consultant accountant = consultancy accountant |
| 19 | Pharmacies | accountant for pharmacists = accountants for pharmacies |
| 19 | Pharmacies | pharmacy accountant = pharmacist accountant |
| 53 | Restaurants | accountant for restaurants = accountants for restaurants = restaurant accountant = restaurant accountants |
| 55 | Pubs & bars | accountant for pubs = accountants for pubs = pub accountant |
| 64 | Taxi & private-hire drivers | accountant for taxi drivers = taxi driver accountant |
| 68 | Farmers / agriculture | accountants for farmers = farm accountant = farm accountants |
| 42 | Actors / entertainment | accountant for actors = accountants for actors = actor accountant |
| 82 | Franchisees | franchise accountant = accountants for franchises |
| 44 | Artists / creatives | accountant for artists = artist accountant |
| 80 | Expats / non-residents | accountant for expats = expat accountant |
| 11 | Electricians | accountant for electricians = accountants for electricians = electrician accountant |
| 4 | Property developers | accountants for property developers = property developer accountant |
| 26 | Childminders / nurseries | accountant for childminders = childminder accountant |
| 41 | Musicians | accountant for musicians = accountants for musicians = musician accountant = music accountant |
| 24 | Care homes | accountants for care homes = care home accountant |
| 6 | Estate & letting agents | accountants for estate agents = estate agent accountant |
| 27 | Foster carers | foster carer tax = foster care tax |
| 81 | High-net-worth individuals | accountant for high net worth individuals = high net worth accountant |
| 14 | Tradespeople (family) | accountant for tradesmen = tradesman accountant |
| 46 | Photographers | accountant for photographers = accountants for photographers = photographer accountant |
| 51 | Engineers | engineer accountant = engineering accountant |
| 50 | Architects | accountant for architects = accountants for architects = architect accountant |
| 20 | Opticians / optometrists | accountant for opticians = accountants for opticians = optician accountant |
| 23 | Nurses / healthcare | accountant for nurses = accountants for nurses = nurse accountant |
| 60 | Hairdressers / barbers | accountant for hairdressers = hairdresser accountant |
| 77 | Schools & academies | academy accountant = accountants for academies |
| 61 | Gyms / personal trainers | accountant for personal trainers = personal trainer accountant |
| 76 | Churches | accountant for churches = accountants for churches = church accountant |

33 groups, 50 collapsed members (a four-member group collapses three).

---

## 5. Nulls and zeros, resolved honestly

**First correction: R2D has no zeros at all.** The published table's "Zero-vol terms"
column and the anomaly note that says "107 keywords came back with volume=null … treated
as 0 in cluster sums" describe the same 107 keywords. Checked against the raw:
**107 null, 0 genuine zero.** Every "zero" in `R2D_VOLUMES.md` is a null being displayed
as a zero, including all eight "zero cluster volume" niches. (For contrast, the tier2
farmers pull does contain one genuine measured zero, "farm tax adviser" with a
twelve-month array of all zeros, so the endpoint does distinguish the two.)

Google Ads returns null or zero below its reporting threshold, which sits at roughly
10 searches a month. A null means "below about 10", never "none".

### Resolution rule

Each null keyword was cross-checked against two free signals:

1. **Google Autocomplete**, live-probed 2026-08-25 via the public suggest endpoint
   (`hl=en-GB`, `gl=uk`), the same method as `r1_autocomplete_sweep.py`. 124 terms
   probed, no API key, no cost.
2. **Our own estate demand**, fresh GSC searchanalytics plus Bing `GetQueryStats`
   across all 15 live sites, 90 days to 2026-08-25.

- **BELOW-THRESHOLD**, null volume, but the term autocompletes, or the niche's token
  draws real impressions in our own estate. Real demand, just under Google's floor.
- **GENUINELY-ABSENT**, null volume, no autocomplete on that phrasing, no estate signal.
- **NOT-PULLED**, never sent to the volume endpoint.

### Counts

| Status | Keywords |
|---|---|
| BELOW-THRESHOLD | **99** |
| GENUINELY-ABSENT | **8** |
| Genuine measured zero | **0** |
| NOT-PULLED (13 excluded niches, no keywords sent) | **13 niches** |

The 8 genuinely absent are **dead phrasings, not dead niches**:

| # | Niche | Phrasing with no signal at all |
|---|---|---|
| 7 | Landed estates / rural estates | rural estate accountant |
| 14 | Tradespeople (family) | accountants for tradespeople |
| 56 | Hotels & guesthouses | bed and breakfast accountant |
| 66 | Hauliers / trucking | accountant for hauliers |
| 72 | Cake makers / food producers | accountants for food producers |
| 84 | Neurodivergent business owners | accountants for neurodivergent business owners |
| 88 | Security firms | security company accountant |
| 88 | Security firms | security business accountant |

### The eight "zero" niches are all wrong in R2D

`R2D_VOLUMES.md` states: *"All 5 spot-checked against Google Autocomplete (gl=gb): NO
autocomplete presence for their 'accountant for X' forms, zeros look genuine."*

That check only tested the `accountant for X` form, which is the phrasing that
autocompletes **least**. Re-probed across all phrasings, **every one of the eight has
autocomplete presence on at least one form**, and six of the eight also draw real
impressions in our own estate:

| # | Niche | Autocomplete hits | Estate impressions, 90d | Verdict |
|---|---|---|---|---|
| 12 | Painters & decorators | decorator accountant (2) | 22 ("painter") | BELOW-THRESHOLD |
| 13 | Landscapers / gardeners | landscaper accountant (3), landscaping business accountant (3) | 44 | BELOW-THRESHOLD |
| 25 | Domiciliary care agencies | domiciliary care accountant (4) | **655**, 36 distinct queries | BELOW-THRESHOLD, strongest of the eight |
| 59 | Travel agents / tour operators | travel agent accountant (10), accountant for travel agents (7), tour operator accountant (5) | 20 | **MEASURED 10/mo elsewhere**, see below |
| 62 | Sports clubs | football club accountant (10), sports club accountant (6) | 0 | BELOW-THRESHOLD |
| 71 | Jewellers | jeweller accountant (10), jewellery business accountant (4) | 2 | BELOW-THRESHOLD |
| 72 | Cake makers / food producers | food and drink accountant (9), food manufacturer accountant (8) | 0 | BELOW-THRESHOLD |
| 88 | Security firms | accountant for security companies (5) | 0 | BELOW-THRESHOLD |

**#59 Travel agents is a hard correction, not an inference.** R2D scores it 0. The
tier2_travel pull four days later measured "travel agency accountant" at 10,
"travel agent accountants" at 10 and "accountants for travel agents" at 10, one
byte-identical close-variant group worth **10/mo**, not zero. R2D's phrasings simply
missed the group. The niche was correctly killed for other reasons (consumer intent on
the visible volume, ARA registration wall), but its demand figure was wrong.

**Bottom line: 0 of the 76 R2D niches are genuinely absent.** Eight are unmeasurable at
Google Ads resolution, which is a different and much weaker statement than "no demand".

Two estate tokens were checked and discarded as contaminated: "author" (268 impressions,
almost all "Welsh Revenue **Author**ity" and "Solicitors Regulation **Author**ity") and
"tutor" (138 impressions, almost all "sta**tutor**y accounts"). Both are substring
artefacts. Neither was allowed to upgrade a niche.

---

## 6. Reverse-intent audit: ranked suspicion list for the paid SERP leg

The estate has already killed three niches on this: "film accountant" 1,600 is people
wanting a job in film, "recruitment agency accountant" is job seekers, "abta protected"
is consumers checking their holiday is bonded.

This **cannot be settled without a SERP** and that is a later paid leg. What follows is a
ranked list of what to check, with the free evidence for each. It is not a verdict.

**Free discriminator used:** `competition_index` measures how many advertisers bid on the
term. A term with big volume and a near-zero competition index is one that nobody is
paying to reach, which is the signature of a job seeker or a consumer lookup. The known
kill "film accountant" has 1,600/mo at competition index **1**. Compare
"accountant for startups", 720/mo at index 36 with a £39.81 CPC, which is a market of
firms fighting for a buyer. The tell is real but not conclusive on its own, which is why
this is a suspicion list.

### Ranked, highest suspicion first

| Rank | Term | Vol | CPC | Comp idx | Niche | Suspected true intent | Volume at risk |
|---|---|---|---|---|---|---|---|
| 1 | drug tariff | 14,800 | none | 0 | 19 Pharmacies | NHS monthly price list, looked up by pharmacy staff. Zero hire intent. | 14,800 |
| 2 | farm inheritance tax | 2,900 | £4.93 | 9 | 68 Farmers | News-driven informational on APR reform; gov.uk / NFU / press own it | 2,900 |
| 3 | pharmacy for sale | 2,400 | £0.75 | 34 | 19 Pharmacies | Business-transfer marketplaces and brokers, not accountancy | 2,400 |
| 4 | p85 form | 2,400 | £1.79 | 2 | 80 Expats | DIY form download | 2,400 |
| 5 | statutory residence test | 1,600 | £11.06 | 0 | 80 Expats | DIY informational; index 0 at 1,600/mo is the film fingerprint | 1,600 |
| 6 | **film accountant** | **1,600** | £8.84 | **1** | 43 Film & TV | **ALREADY KILLED, job seekers. Reference case.** | 1,600 |
| 7 | agricultural property relief | 1,000 | £6.30 | 13 | 68 Farmers | Informational, IHT reform news cycle | 1,000 |
| 8 | **abta protected** | **1,000** | £3.78 | 14 | 59 Travel | **ALREADY KILLED, consumers checking a holiday. Reference case.** | 1,000 |
| 9 | **recruitment agency accountant** | **880** | £9.54 | 32 | 49 Recruitment | **ALREADY KILLED, job seekers. Note index 32, so a healthy index does NOT clear a term.** | 880 |
| 10 | non resident landlord scheme | 880 | £0.40 | 1 | 80 Expats | DIY / letting-agent compliance; £0.40 CPC says nobody is buying a client here | 880 |
| 11 | icara | 590 | none | 1 | 52 FCA firms | Regulatory acronym looked up by in-house compliance staff | 590 |
| 12 | atol certificate | 480 | £2.64 | 25 | 59 Travel | Consumer protection check, same family as abta protected | 480 |
| 13 | split year treatment | 480 | none | 0 | 80 Expats | DIY informational | 480 |
| 14 | **energy accountant** | **390** | **none** | **1** | 85 Energy | **Highest-priority NEW suspicion. 390/mo, zero advertisers, zero CPC. Structurally identical to "film accountant". Plausibly a job title, or "energy accounting" meaning carbon and utility metering rather than tax.** | 440 (whole niche) |
| 15 | non dom tax uk | 390 | none | 5 | 80 Expats | News-driven informational | 390 |
| 16 | cass 15 | 390 | £22.61 | 18 | 52 FCA firms | Regulatory lookup; the CPC is compliance consultancies, not accountants | 390 |
| 17 | **consultant accountant** | **320** | £19.51 | 42 | 32 Consultants | **Job title ambiguity: "accountant working as a consultant" versus "I am a consultant and need an accountant". Same trap shape as film. Whole niche rests on it.** | 360 (whole niche) |
| 18 | crypto accountant | 320 | none | 2 | 39 Crypto | Zero CPC at 320/mo in a niche whose sibling terms carry £10 CPCs. Odd. **Pilot niche, so check first.** |, |
| 19 | cass audit | 320 | £13.03 | 15 | 52 FCA firms | Regulatory service lookup; the buyer needs a registered auditor, which we are not | 320 |
| 20 | **tech accountant** | **320** | £25.09 | 23 | 34 Tech / SaaS | Job-title suspicion ("tech accountant" as a role). CPC is healthy, so mixed. | 530 (whole niche) |
| 21 | seafarers earnings deduction | 260 | £2.20 | 24 | 87 Maritime | A relief people claim themselves on a return. Informational, not hire. Whole niche head. | 440 (whole niche) |
| 22 | toms vat | 260 | none | 0 | 59 Travel | Informational | 260 |
| 23 | ifpr | 210 | none | 0 | 52 FCA firms | Regulatory acronym | 210 |
| 24 | tour operators margin scheme | 210 | none | 1 | 59 Travel | Informational | 210 |
| 25 | manufacturing accountant | 170 | none | 5 | 73 Manufacturing | Job title ("management accountant, manufacturing"). Below the 200 line but it is the niche's whole anchor. | 260 (whole niche) |
| 26 | retail accountant | 210 | £25.22 | 8 | 69 Retail | Job-title reading possible, but a £25 CPC is a real buyer market. Lowest suspicion on the list. | 250 |

**The four new suspicions that would change a decision, in priority order for the SERP leg:**

1. **energy accountant (#85 Energy & renewables, dR 9)**, 390/mo, no CPC, competition
   index 1. If reverse, the niche drops from rank 9 to nothing.
2. **consultant accountant (#32 Management consultants, dR 11)**, the niche is 360/mo
   and 320 of it is this one ambiguous term.
3. **seafarers earnings deduction (#87 Maritime, dR 10)**, 440/mo niche whose head is a
   self-claimed relief, so the searcher is doing it themselves.
4. **tech accountant (#34 Tech / SaaS, dR 7)**, 530/mo niche, 320 on a term that reads
   as a job title.

**Cleared without needing a SERP** (strong advertiser markets, high CPC, high competition
index, all pointing at firms bidding to win a client): accountant for startups (£39.81,
index 36), accountant for ecommerce (£35.53, index 39), hospitality accountant (£24.02,
index 41), charity accountant (£11.56, index 54), entertainment accountant (£43.31, index
51), amazon seller accountant, taxi driver accountant (index 57). These read as genuine
hire demand.

**Method warning for the SERP leg:** "recruitment agency accountant" has a competition
index of 32 and was still a job-seeker term. Recruitment agencies bid on job-title
keywords. A healthy competition index therefore rules a term **in** as commercial but does
not rule out **reverse** intent, only the SERP does. Rank 9 is on the list as a
calibration case, not because it needs re-deciding.

---

## 7. The three contradictions, resolved

All three are **definitional, not transcription errors.** The raw confirms it in each case.

### 7a. Manufacturing, 390 versus 260: merged candidates, and the 390 was itself inflated

`tier1_manufacturing/DOSSIER.md` and `LAUNCH_CORE.md` cite "~390/mo head demand".
`R2D_VOLUMES.md` gives #73 Manufacturing 260. `tier1_manufacturing/CHECKER_REPORT.md`
already caught the discrepancy and called for a correction.

From the raw: **390 = 260 (#73 Manufacturing) + 130 (#51 Engineers)**, exact. The dossier
merged two separate R1 candidates. But both components were themselves cluster sums, and
#51 contains a collapsed pair ("engineer accountant" = "engineering accountant", both 50).

| Definition | Figure |
|---|---|
| Manufacturing alone, R2D 3 seeds, deduplicated | **260/mo** |
| Engineers alone, R2D 4 seeds, deduplicated | 80/mo (published 130, 1.62x) |
| Manufacturing + engineering merged, deduplicated | **340/mo** (published 390, so still 1.15x inflated) |
| Manufacturing + engineering, **best available**: 46 hire-intent terms from the already-paid Labs corpus, deduplicated, 1.00x | **590/mo** |

**Use 590/mo**, defined as *"UK hire-intent demand for manufacturing and engineering
accountancy, 46 deduplicated terms from the tier1_manufacturing Labs keyword_suggestions
corpus (333 keywords), close variants collapsed, inflation 1.00x."* Anchor term
"manufacturing accountant" 170/mo. Never cite 390.

### 7b. Retail, 740 versus 250: a separate, wider pull that is not retail hire demand

740 is the **raw sum of all 20 keywords in the tier2_retail deeper pull**. It is not a
retail hire-intent figure at all. It contains:

- **A different niche.** "franchise accountant" 140 and "accountants for franchisees" 140
 , one byte-identical close-variant group worth 140, and it belongs to **#82 Franchisees**,
  not retail. That alone is 280 of the 740, and 140 of it is double-counted.
- **Informational VAT terms.** retail vat scheme 140, till reconciliation 40, vat
  apportionment scheme 20.
- **Business-transfer intent.** buying a convenience store 40.

Retail hire-intent terms in that pull, in full: retail accountant 210, shop accountant 10,
and seven nulls (retail accountants uk, accountant for retail business, accountant for
shop, accountants for independent shops, convenience store accountant, newsagent
accountant, off licence accountant).

| Definition | Figure |
|---|---|
| Whole tier2_retail pull, raw sum (the published 740) | 740/mo |
| Whole tier2_retail pull, deduplicated | 600/mo (1.23x) |
| **Retail hire intent only, deduplicated** | **220/mo** |
| R2D #69 on 4 retail seeds, deduplicated | 250/mo |

**Use 220/mo**, defined as *"UK retail-accountancy hire-intent demand: 'retail accountant'
210 plus 'shop accountant' 10, from the tier2_retail 20-keyword pull, close variants
collapsed, franchise and informational-VAT terms excluded."* Anchor "retail accountant"
210/mo at £25.22 CPC. The 250 in R2D is close and not wrong, it just uses a slightly
different four-seed set. **Never cite 740 as retail demand**, `TIER2_VERDICTS.md` line
"740/mo total" is describing the whole pull, and the word "total" is doing a lot of work.

### 7c. Farmers, 660 versus 410: a hand-filtered hire subset, summed across close variants

`TIER2_VERDICTS.md` cites "~660/mo (farm/agri accountant heads)". From the raw, 660 is
exactly three keywords summed: farm accountant 170 + agricultural accountants 320 +
accountants for farmers 170. **"farm accountant" and "accountants for farmers" are
byte-identical.** One group, 170, counted twice.

| Definition | Figure |
|---|---|
| The three heads the verdict named, summed (the published 660) | 660/mo |
| **The same three heads, deduplicated** | **490/mo** (1.35x) |
| All 8 farm/agri hire-intent terms in the tier2 pull, deduplicated | 560/mo (published 730, 1.30x) |
| R2D #68 on 5 seeds, deduplicated | 350/mo (published 410, 1.17x) |

**Use 490/mo** as the direct like-for-like correction to 660, defined as *"UK farm and
agricultural accountancy hire-intent heads, deduplicated: 'agricultural accountants' 320
plus the 'farm accountant' / 'accountants for farmers' close-variant group 170."** Use
**560/mo** if the definition is widened to all hire-intent terms in the 17-keyword pull.
Anchor term "agricultural accountants" 320/mo at £15.19 CPC.

Two caveats that do not change the figure but bound it:
- Section 2c: "farm accountant" was 30/mo on 2026-07-11 and 170/mo on 2026-07-15. If the
  earlier grouping is the true one, 490 falls to 350.
- `TIER2_VERDICTS.md` is right that the visible 3,900/mo around this niche (farm
  inheritance tax 2,900 + agricultural property relief 1,000) is IHT-reform informational
  owned by gov.uk, NFU and press. It is not hire demand and does not belong in any of the
  figures above. Suspicion ranks 2 and 7 in section 6.

**Pattern across all three: every disputed pair is one team summing close variants and
another using a narrower definition. Neither figure was ever wrong arithmetic. Fixing the
definition and deduplicating resolves all three.**

---

## 8. What still needs a paid pull: the shopping list

### 8a. Pricing, so the arithmetic is checkable

`keywords_data/google_ads/search_volume/live` is billed **per task, not per keyword**, and
one task carries **up to 1,000 keywords**. Verified from the saved responses: the R2D probe
(10 keywords) and the R2D full call (299 keywords) each returned `"cost": 0.09`. Every
`dfs_head_volumes_raw.json` in the tier directories also shows `"cost": 0.09` for
7 to 26 keywords.

**So the whole shopping list below is one or two tasks. Keyword count is nearly free;
task count is what costs.**

### 8b. Priority A: never volume-pulled at all (13 niches)

These are the 13 R2C EXCLUDE niches. R2D deliberately skipped them as own-estate overlap,
so **we have never measured their demand**. They must be marked NOT-PULLED, never zero.
For a definitive map they are the largest hole, and several are the estate's own core
business, so their true head demand is strategically important.

| # | Niche | Own-estate overlap | Suggested seeds |
|---|---|---|---|
| 1 | Landlords (buy-to-let) | property (direct) | 20 |
| 2 | Property investors | property (direct) | 18 |
| 3 | Airbnb / holiday-let hosts | property (strong) | 18 |
| 8 | Construction / CIS subcontractors | construction-cis (direct) | 20 |
| 9 | Builders | construction-cis (direct) | 18 |
| 15 | Dentists | dentists (direct) | 20 |
| 16 | Doctors / GPs | medical (direct) | 22 |
| 17 | Locum doctors | medical (direct) | 18 |
| 28 | Solicitors / law firms | solicitors (direct) | 20 |
| 29 | Barristers | solicitors (strong) | 18 |
| 30 | IT contractors | contractors-ir35 (direct) | 20 |
| 31 | Freelancers | contractors-ir35 + generalist | 20 |
| 48 | Marketing agencies | agency (direct) | 18 |

**13 niches, 250 keywords.** Partial exception: #1 Landlords has two probe-canary keywords
already measured (landlord accountant 390, accountant for landlords 260, deduplicated 650),
which is a useful calibration anchor but not a niche pull.

### 8c. Priority B: seed set too narrow to trust (22 niches)

R2D used **3 to 5 keywords per niche**. The tier-2 pulls used **17 to 22 broad concept
terms** and came back at only **1.00x to 1.23x inflation**, a wider seed set both finds
the real head and dilutes the close-variant trap.

Narrow seeds do not only overstate. Measured against the already-paid deeper Labs corpora,
they **understate badly** where R2D's phrasings missed the head:

| Niche | R2D dedup, 3-5 seeds | Deeper hire-intent dedup | Understatement |
|---|---|---|---|
| Hospitality | 460 | **1,620** (116 terms) | 3.5x |
| Ecommerce | 980 | **2,430** (47 terms) | 2.5x |
| Manufacturing | 260 | **590** (46 terms) | 2.3x |
| Startups | 890 | **1,850** (34 terms) | 2.1x |
| Crypto | 1,360 | 1,650 (93 terms) | 1.2x |
| Pharmacies | 300 | 240 (9 terms) | 0.8x |
| Care homes | 100 | 90 (4 terms) | 0.9x |

(Deeper figures are from `tier1_*/raw/dfs_suggest_raw.json`, already paid, deduplicated by
the same byte-identical rule. They carry some cross-niche bleed because the hire-intent
filter is a regex over the suggestion corpus, so treat them as an upper bound.)

**12 niches already have a deep pull and are OFF the list:** ecommerce (186 kw), hospitality
(169), startups-tech (446), care (242), crypto (589 + today's 2,939), manufacturing (333),
pharmacies (82), expats (18), farmers (17), FCA (22), retail (20), travel (19).

**On the list, deduplicated demand at or above 100/mo, still on 3 to 5 seeds:**

| # | Niche | Dedup | Best term | Best vol | Seeds now | Seeds needed |
|---|---|---|---|---|---|---|
| 43 | Film & TV production | 1,710 | film accountant | 1,600 | 4 | 18 |
| 49 | Recruitment agencies | 1,150 | recruitment agency accountant | 880 | 4 | 18 |
| 74 | Charities / non-profits | 800 | accountant for charities | 590 | 5 | 20 |
| 34 | Tech / SaaS companies | 530 | tech accountant | 320 | 5 | 20 |
| 85 | Energy & renewables | 440 | energy accountant | 390 | 4 | 20 |
| 87 | Maritime / seafarers | 440 | seafarers earnings deduction | 260 | 5 | 18 |
| 32 | Management consultants | 360 | consultant accountant | 320 | 4 | 20 |
| 37 | Content creators / influencers | 310 | accountant for influencers | 170 | 5 | 18 |
| 64 | Taxi & private-hire drivers | 310 | taxi accountant | 140 | 5 | 18 |
| 36 | Amazon FBA sellers | 300 | amazon seller accountant | 110 | 4 | 18 |
| 44 | Artists / creatives | 220 | accountants for creatives | 140 | 4 | 18 |
| 42 | Actors / entertainment | 200 | entertainment accountant | 110 | 4 | 18 |
| 53 | Restaurants | 200 | restaurant tax | 110 | 5 | 18 |
| 55 | Pubs & bars | 170 | accountant for pubs | 140 | 4 | 18 |
| 4 | Property developers | 160 | property development accountant | 90 | 4 | 18 |
| 38 | OnlyFans creators | 160 | onlyfans accountant | 70 | 4 | 16 |
| 82 | Franchisees | 160 | franchise accountant | 140 | 3 | 18 |
| 66 | Hauliers / trucking | 140 | transport accountant | 90 | 5 | 18 |
| 40 | Day / forex traders | 130 | accountants for traders | 90 | 5 | 18 |
| 21 | Vets | 120 | veterinary accountant | 110 | 4 | 18 |
| 26 | Childminders / nurseries | 110 | accountant for childminders | 90 | 5 | 18 |
| 56 | Hotels & guesthouses | 110 | hotel accountant | 110 | 4 | 18 |

**22 niches, 396 keywords.** Four of these (#85, #32, #87, #34) are also the top reverse-
intent suspicions, so their pull should carry deliberate control pairs, a hire phrasing
against a job-title phrasing, the way the travel pull settled abta with a control pair.

### 8d. Priority C: the seed set probably missed the head (24 niches)

Half or more of the seeds returned null, which means the phrasing set, not the niche, may
be the problem. This is the cheap tranche that decides whether eight "zeros" and sixteen
sub-100 niches are really dead. Every one of the 24 has autocomplete presence on some
phrasing (section 5), so there is a real term to find.

Includes all 8 of the false-zero niches: #12 Painters, #13 Landscapers, #25 Domiciliary
care, #59 Travel agents, #62 Sports clubs, #71 Jewellers, #72 Cake makers, #88 Security.
Plus: #75 CICs, #70 Used car dealers, #6 Estate agents, #27 Foster carers, #63 Footballers,
#84 Neurodivergent, #5 Property management, #45 Authors, #65 Couriers, #10 Plumbers,
#18 Locum pharmacists, #54 Takeaways, #58 Event caterers, #67 Pilots, #78 Tutors,
#86 Life sciences, #89 Cleaning.

**24 niches, 12 keywords each = 288 keywords.** Seed them from the autocomplete
suggestions already captured in the session scratchpad, which cost nothing and are the
phrasings Google itself proposes.

**#25 Domiciliary care is the one to look at first in this tranche**, 655 impressions
across 36 distinct queries in our own estate over 90 days, including "how to start a
domiciliary care agency", against a published cluster volume of zero.

### 8e. Deferred, deliberately (18 niches)

Narrow seeds, deduplicated demand under 100/mo, and fewer than half the seeds null, so the
phrasing worked and the answer is simply "small". The best-term anchor is unaffected by the
close-variant trap and already settles these. Buying more keywords will not change the call.

#14 Tradespeople (90), #81 HNW (90), #11 Electricians (80), #51 Engineers (80),
#79 Driving instructors (60), #7 Landed estates (50), #20 Opticians (50), #22 Therapists
(50), #41 Musicians (50), #46 Photographers (50), #23 Nurses (40), #47 Interior designers
(40), #50 Architects (40), #60 Hairdressers (40), #61 Gyms (30), #77 Schools (30),
#83 Virtual assistants (20), #76 Churches (10).

### 8f. Total cost

| Tranche | Niches | Keywords |
|---|---|---|
| A, never pulled | 13 | 250 |
| B, too narrow, 100/mo or more | 22 | 396 |
| C, seed set missed the head | 24 | 288 |
| **Total** | **59** | **934** |

934 keywords fits inside a single 1,000-keyword task.

- **Minimum: 1 `search_volume` task = $0.09.**
- **Recommended: 2 tasks = $0.18**, split A+B (646 kw) from C (288 kw), leaving headroom
  for control pairs and a canary, and letting tranche C be dropped if the balance runs out.
  This is the same shape as the R2D run, which cost $0.18 for the same reason.

Optional add-on if the map wants difficulty alongside volume:
`dataforseo_labs/google/bulk_keyword_difficulty/live` billed **$0.01404** for 17 keywords
in the tier2_farmers call. For 934 keywords budget roughly **$0.10 to $0.80** depending on
whether it prices per task or per row. **Price it with a small probe before committing**:
the saved responses only evidence a 17-keyword call, so the scaling is not known.

**Recommended spend for C3's outstanding needs: $0.18.**

---

## 9. What to carry into the rest of the map

1. **Never sum close variants again.** Cluster figures are only meaningful deduplicated, and
   the best single term is the anchor that the trap cannot touch.
2. **The published top two were the most inflated rows in the table.** Charities 3.21x,
   Startups 2.62x. Any decision that used the published ranking used a broken head.
3. **Narrow seeds cut both ways.** They overstate through close variants and understate by
   missing the head. Hospitality is 3.5x bigger than R2D said; Charities is 3.2x smaller.
   Seed width, not the trap alone, is what makes a cluster figure trustworthy.
4. **Nothing in this corpus is genuinely absent.** 99 of 107 nulls are below-threshold
   demand; the 8 remaining are dead phrasings inside live niches.
5. **The top three deduplicated niches are all on the reverse-intent suspicion list.** Film
   and recruitment are already killed. Crypto is the pilot. The SERP leg should start there.
