# Query assignment, commercial pages (2026-10-09)

**Bottom line.** 394 hire-intent queries, one owner each. The three service pages own 14,330 searches a month (volume index) and 6,007 GSC impressions (90 days), almost none landing on them today. 27 other pages give up phrases to them; biggest givers are the noindexed career post (1,471 impressions), the Manchester, Birmingham and Bristol location pages, and the Belfast post. 13 questions at the end gate the writer brief.

Data: GSC API, unsampled, 10 Jul to 7 Oct 2026 (12,036 page+query rows); QRY_C universe of 7 Oct (350 data rows). Table: `QUERY_ASSIGNMENT_2026-10-09.csv`, sorted by owner page then impressions.

## How the table was built

- **Sources:** QRY_C commercial rows, fresh GSC rows passing the hire-intent filter, and the 598-row `GSC_FRESH` subset (matches the full pull row for row).
- **Impressions and clicks** are summed across every page shown for a query. **Current best page** is the page with the most impressions; its position is impression-weighted. 67 QRY_C rows are absent from the 90-day pull: left blank, not zero (GSC drops anonymised queries).
- **Volume double-counts** singular, plural and word-order twins that share one results page. Use the sums to compare pages, not as search counts.
- **Filter widened** with "tax advice", "accountancy" and "tax expert"; otherwise the tax-advice page's own phrase (161 impressions) drops out (Q12).
- City blog posts have redirected to `/locations/*` since 5 Aug but still appear in this window.

## Demand per owner page

| owner page | queries | volume/mo | GSC impr 90d | clicks |
|---|---:|---:|---:|---:|
| /services/property-accountant | 62 | 9,310 | 3,343 | 5 |
| /services/landlord-accountant | 58 | 3,860 | 1,632 | 2 |
| /services/property-tax-advice | 34 | 1,160 | 1,032 | 0 |
| /services/non-resident-landlord | 3 | 0 | 17 | 0 |
| /locations/leeds | 10 | 80 | 1,214 | 2 |
| /locations/london | 43 | 410 | 697 | 0 |
| /locations/manchester | 5 | 20 | 555 | 0 |
| /locations/birmingham | 3 | 40 | 179 | 2 |
| /locations/bristol | 6 | 1,400 | 155 | 0 |
| /for/* and other audience pages (9 pages) | 21 | 640 | 198 | 0 |
| / (brand only) | 1 | 0 | 198 | 44 |
| no page (city), held for WP4 | 89 | 2,530 | 642 | 0 |
| excluded | 59 | 76,850 | 1,410 | 0 |

Reconciles to STATE's 9,110 / 3,820 / 1,150: property-accountant gains commercial and development phrases (+220) and loses "property management accountant" (-20); the other two gain fees and pre-hire rows.

## /services/property-accountant

- **Title phrase: "property accountant" plus UK** ("uk property accountants" 480/mo, "property accountants uk"). Joint-top volume (720), most impressions in the set (870, now on the career post at position 25), already leads the live title (Bing-safe). UK modifier per owner ruling of 9 Oct.
- **H1:** "property accountants".
- **H2 set:** property tax accountant (544 impressions, on `/locations/manchester` today), specialist property accountant, property investment accountant, accountants for property, accountant for property investors.
- **Body (33):** real estate, residential, portfolio, owner and company forms, property tax accounting, commercial property and development (Q8).
- **FAQ:** "What does a specialist property accountant do?" (45 impressions, Q10).
- **Coverage statement (18):** all "near me" forms, property (tax) accountant uk, and inverted forms: accountant property, accountants property, tax accountant property, property accountant specialist (239 impressions), accountant property specialist, accountant property investment, accountant in real estate, accountant specializing in real estate.

## /services/landlord-accountant

- **Title phrase: "landlord accountant".** Joint-top volume (390), most impressions (167), current live title.
- **H1:** "landlord accountants".
- **H2 set:** landlord tax accountant (150 impressions, on `/locations/manchester` at position 62 today), accountants for landlords, buy to let accountant, rental property accountant.
- **Body (26):** landlord's accountant, buy to let accountants, accountants for buy-to-let landlords, rental income accountant, BTL accounting, rental property accounting.
- **FAQ:** "Do I need an accountant for my rental property?"; "Which accounting services does a buy-to-let investor need?" (paraphrased)
- **Fees section (6):** landlord accountant fees (78 impressions), buy to let accountant fees, accountant fees for rental property, cost of accountant for rental property, accountant rental property cost, buy to let limited company accountant cost.
- **Coverage statement (18):** all "near me" forms, landlord tax accountant uk, landlord accounting services uk, and inverted forms accountant landlord(s), accountant for landlord, accountants for landlord, accountant rental property, and the keyword list "accountants for landlord and property accountants".

## /services/property-tax-advice

- **Title phrase: "property tax specialist".** Highest family volume (210) and impressions (146).
- **H1: "property tax advice".** URL phrase, in the live title, 161 impressions already land here, ChatGPT baseline page (Q1).
- **H2 set:** property tax specialists, property tax advisor, property tax adviser, property tax consultants, tax advice for landlords (125 impressions, Q2).
- **Body (12):** landlord tax advice (136), buy-to-let tax advisor, property investment tax advice, landlord tax specialist, capital allowances advisors, property tax expert(s) and stamp duty advice.
- **FAQ:** none in the data; source from People Also Ask.
- **Fees section:** how much do property tax consultants charge.
- **Coverage statement (14):** all "near me" forms, stacked-UK forms (specialist(s), advice, advisor, consultant, landlord tax advice + uk), tax advice property, tax advice landlords, "want accountant for property investment tax planning".

## /services/non-resident-landlord

Three body phrases: non resident landlord tax services, non-resident landlord tax advice (from `/for/non-resident-landlords`), non-resident landlord accountant London (Q5). Title unchanged.

## Pages that must give up a phrase

| giving page | impr given | to | main phrases | what it keeps |
|---|---:|---|---|---|
| blog/how-to-become-property-accountant (noindexed) | 1,471 | PA | property accountant 870, property accountant specialist 239, property tax accounting 108, accounting for property tax 62, residential property accountant 53, property accounting 48 | career queries only (become, salary, skills, job description) |
| /locations/manchester | 795 / 396 | PA / LA | property tax accountant 544, property accountants near me 217; landlord accountant 167, landlord tax accountant 150, accountant for landlords 78 | Manchester city forms (555) |
| /locations/birmingham | 187 / 573 / 216 | PA / LA / TA | property accountants 187; buy to let accountants (near me) 266, accountants for buy-to-let landlords 115, buy to let property accountants 182; property tax advisor/specialist/advice near me 189 | Birmingham and Erdington forms (179) |
| /locations/bristol | 415 / 18 / 64 | PA / LA / TA | property specialist accountant 160, property tax accountant near me 106, specialist property accountant 85; property tax specialists 48 | Bristol forms incl. "accountant in bristol" (155) |
| blog/belfast-property-accountant | 71 / 308 / 37 | PA / LA / TA | landlord accountants 122, accountants for landlords 86, buy to let accountant 65; property tax specialist uk 34 | Belfast and Northern Ireland forms (no page, WP4) |
| /landlord-tax | 351 | TA | landlord tax advice 136, tax advice for landlords 125, landlord tax advice uk 71 | informational "landlord tax" explainer queries |
| / (homepage) | 189 / 31 | PA / TA | uk property accountants 141, property accountants uk 27, property tax accountant uk 15 | brand (198, 44 clicks) and the umbrella phrase |
| blog/how-much-does-a-property-accountant-cost | 150 / 23 / 6 | LA / PA / TA | landlord accountant fees 78, buy to let accountant fees 30, accountant fees for rental property 27 | informational cost questions ("how much does a property accountant cost") |
| blog/manchester-property-accountant (redirected) | 147 | TA | property tax specialist 146 | folds into /locations/manchester |
| blog/property-accountant-glasgow | 95 | PA | property accountant near me 95 | Glasgow forms (no page, WP4) |
| blog/accounting-services-for-property-owners | 56 | PA | accounting services for property owners 42, property owner accountant 14 | its how-to body |
| /services (hub) | 45 | LA | rental property tax accountant 45 | hub links only |
| /for/property-spv-set-up | 26 | PA | property investment accountant 22, accountant for property investors 4 | spv accountant(s) |
| blog/property-accountant-nottingham | 22 | LA | accountants for landlord 14, accountant landlords 8 | Nottingham forms (no page, WP4) |
| /locations/leeds | 17 / 4 | LA / TA | landlord accountant near me 10, small "near me" forms | Leeds, Headingley, Horsforth (1,214) |
| /for/rental-income-disclosure | 13 | LA | accountant for rental property 13 | let property campaign phrases |
| others (11 pages) | 53 | various | 1 to 11 impressions each | see CSV |

Redirected city posts still hold city forms such as "property accountant manchester" (253); these fold into the location pages without action.

## City queries with no page (WP4 input)

| city | queries | volume/mo | impr 90d |
|---|---:|---:|---:|
| West Midlands (region) | 2 | 0 | 156 |
| Oxford | 3 | 20 | 134 |
| Leicester | 2 | 0 | 120 |
| Cannock | 1 | 0 | 55 |
| Preston | 4 | 0 | 40 |
| Nottingham | 7 | 20 | 25 |
| Fleetwood | 1 | 0 | 25 |
| Liverpool | 2 | 20 | 16 |
| Glasgow | 6 | 370 | 15 |
| Belfast | 1 | 590 | 14 |
| Oxfordshire | 3 | 20 | 6 |
| Cardiff | 4 | 20 | 6 |
| Peterborough | 1 | 0 | 6 |
| Dorset | 2 | 90 | 4 |
| Scotland / Northern Ireland | 2 | 70 | 5 |
| Bournemouth, Southsea | 3 | 0 | 4 |
| Luton, Newport, Nuneaton | 3 | 1,070 | 3 |
| Edinburgh | 5 | 50 | 1 |
| Surrey | 4 | 50 | 1 |
| York, Wirral, Bradford, Coventry, Solihull, Stourport | 6 | 10 | 6 |
| Derby, Kent, Swansea, Brighton, Sheffield, Southampton | 13 | 130 | 0 |
| Milton Keynes, Northampton, Wolverhampton, Newcastle, Slough | 14 | 0 | 0 |

Luton, Newport, Nuneaton and Belfast volume is generic "accountant in X" (Q7).

## Excluded (59 queries)

| reason | queries | impressions |
|---|---:|---:|
| site: operator query | 1 | 1,270 |
| generic accountant (near me, cost, hire, specialist) | 15 | 41 |
| competitor or publication brand (propertyaccountant.co.uk, PD Tax, AccountingWEB, BDO, KPMG, Grant Thornton, Xero) | 8 | 23 |
| malformed pasted CSV rows | 3 | 16 |
| out of jurisdiction (Ireland, Australia) | 4 | 13 |
| best/top/recommend listicle | 10 | 11 |
| other trade, career, software, US-style appeals, management company, topic-only, how-to | 18 | 36 |

Brand ("property tax partners") stays with the homepage, outside the coverage floor.

## Questions for the owner

1. **Tax-advice lead phrase.** Volume says "property tax specialist"; page name, live title and ChatGPT traffic say "property tax advice". I set specialist = title, advice = H1. Recommend both words in the title (as now), which keeps the Bing check clean.
2. **"Landlord tax advice" (351 impressions, on `/landlord-tax` at 74 to 89).** Given to tax-advice; alternative is landlord-accountant.
3. **City districts** (Headingley 223, Horsforth, Erdington, Westminster, Camden, EC1, Farringdon, Tower Hamlets, Hornchurch, Wallington) went to the parent city page. Or move to WP4?
4. **West Midlands and Cannock (211)**: Birmingham serves them today but they are outside the city; marked no page. Confirm.
5. **City vs audience clashes**: CGT London, CGT advice Manchester, letting agents Leicester (90), self assessment Bristol followed the city rule; non-resident landlord London followed the non-resident rule (client is abroad). Confirm both.
6. **Generic cost queries (2,480/mo)** ("how much do accountants charge", "how much will an accountant cost", "accountant fee") excluded as not property. Alternative: property-accountant fees section.
7. **Generic "accountant in [city]"** treated as city forms per the Bristol example, putting Luton (720), Belfast (590), Newport, Nuneaton on WP4. Confirm.
8. **Commercial property (40/mo) and development (180/mo)**: no own page; placed in property-accountant body. Or log as page gaps?
9. **"Property incorporation tax advice" (77)**: given to `/for/moving-property-into-a-limited-company`; alternative `/incorporation`.
10. **"What does a specialist property accountant do?"**: used as FAQ though QRY_C tagged it career. Confirm.
11. **"Property tax accounting" / "property accounting" (156)**: firm search or how-to; placed in body, not headings.
12. **Filter widening** ("tax advice", "accountancy", "tax expert"). Confirm.
13. **Homepage umbrella**: no query matches it, so the homepage holds brand only. Which phrase is the umbrella?
