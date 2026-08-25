# Lead-buyer scrape list (2026-08-13)

Business types to scrape for outreach. Each line is a niche to search, plus which of our lead
sources that niche buys from. UK only, England and Wales unless noted.

## Phase 1: scrape these 10 only

Property is the live lane, so start here. Every niche below buys landlord and property tax leads
today. Ranked by value and volume of match.

| # | Niche to scrape | Why they want property leads | Best directory / source |
|---|---|---|---|
| 1 | Buy-to-let mortgage brokers | Landlord, SPV, portfolio, incorporation transfers. Biggest value and volume match | FCA Register (home finance mediation), Unbiased, AMI |
| 2 | Conveyancing solicitors | Sales, purchases, incorporation transfers, SDLT | Law Society Find a Solicitor (by area + city), SRA register |
| 3 | SDLT reclaim specialists | Advisory-tier leads: MDR, mixed use, uninhabitable claims | CIOT Find a CTA, Google Maps |
| 4 | Chartered surveyors (RICS) | CGT base valuations, portfolio valuations, surveys | RICS Find a Surveyor |
| 5 | Bridging loan brokers | Auction purchases, refurb, chain breaks. High case value | NACFB, ASTL |
| 6 | Letting agents | Landlord leads mentioning self-management pain. Two-way, they refer back | Propertymark ARLA |
| 7 | Capital allowances consultants | High value per claim, and we already rank page 1 on the head terms | RICS, CIOT, Google Maps |
| 8 | Estate agents | "Planning to sell" and CGT-on-disposal leads | Propertymark NAEA, Google Maps |
| 9 | Landlord insurance brokers | Highest raw volume, lowest value per lead | BIBA Find Insurance, FCA Register |
| 10 | Company formation / SPV formation agents | Incorporation leads. Also upstream referral partners | Companies House filing agents, Google Maps |

Bench if any of the above stall: development finance brokers, property and block management
companies, party wall surveyors.

## Full list (later phases)

Everything below activates as the other sites go live. Wills-probate, divorce-finances, leasehold
and settlement-agreements rows are not live yet, so do not scrape for them in phase 1.

| # | Niche to scrape | Buys leads from | Best directory / source |
|---|---|---|---|
| 1 | Conveyancing solicitors | property | Law Society Find a Solicitor (by area + city), SRA register |
| 2 | Probate solicitors | wills-probate | Law Society, STEP directory |
| 3 | Family law solicitors | divorce-finances | Law Society, Resolution members |
| 4 | Divorce mediators | divorce-finances | Family Mediation Council register |
| 5 | Employment law solicitors | settlement-agreements | Law Society by practice area |
| 6 | Leasehold / enfranchisement solicitors | leasehold | ALEP members, Law Society |
| 7 | Chartered surveyors (RICS) | property, wills-probate, leasehold | RICS Find a Surveyor |
| 8 | Party wall surveyors | property, leasehold | Faculty of Party Wall Surveyors, RICS |
| 9 | Probate valuers | wills-probate | RICS, NAVA Propertymark |
| 10 | Commercial finance brokers | generalist, construction-cis, hospitality, ecommerce | NACFB member directory, FIBA |
| 11 | Buy-to-let mortgage brokers | property | FCA Register (home finance mediation), Unbiased, AMI |
| 12 | Bridging loan brokers | property | NACFB, ASTL |
| 13 | Development finance brokers | property, construction-cis | NACFB, FIBA |
| 14 | Asset and equipment finance brokers | construction-cis, generalist | NACFB, FLA members |
| 15 | Invoice finance / factoring brokers | generalist, ecommerce, construction-cis | NACFB, UK Finance members |
| 16 | Contractor mortgage brokers | contractors-ir35 | FCA Register, Unbiased |
| 17 | R&D tax credit consultants | startups-tech, generalist | CIOT Find a CTA, Google Maps |
| 18 | Capital allowances consultants | property, hospitality, care | RICS, CIOT, Google Maps |
| 19 | SDLT reclaim specialists | property | CIOT, Google Maps |
| 20 | Bookkeepers | generalist (plus low-complexity leads from all sites) | ICB, AAT licensed members |
| 21 | Payroll bureaus | construction-cis, hospitality, care | CIPP, AAT |
| 22 | Insolvency practitioners | generalist, hospitality, ecommerce | R3 directory, Insolvency Service register |
| 23 | IFAs / wealth managers | wills-probate, divorce-finances, dentists, medical, pharmacies | FCA Register, Unbiased, VouchedFor, PFS directory |
| 24 | Estate planning and IHT advisers | wills-probate | STEP, SWW (Society of Will Writers) |
| 25 | Landlord insurance brokers | property | BIBA Find Insurance, FCA Register |
| 26 | Professional indemnity insurance brokers | solicitors, contractors-ir35, agency | BIBA, FCA Register |
| 27 | Letting agents | property | Propertymark ARLA |
| 28 | Block management companies | leasehold | Propertymark ARMA, IRPM |
| 29 | Property management companies | property, leasehold | Propertymark, Google Maps |
| 30 | Estate agents (incl. probate desks) | property, wills-probate | Propertymark NAEA, Google Maps |
| 31 | Company formation agents | startups-tech, property | Companies House filing agents, Google Maps |
| 32 | Umbrella companies | contractors-ir35, construction-cis | FCSA accredited members, Professional Passport |
| 33 | Dental practice sales agents / brokers | dentists | Google Maps, dental trade press |
| 34 | Pharmacy sales agents / brokers | pharmacies | Google Maps, pharmacy trade press |
| 35 | Care home brokers and consultants | care | Google Maps, Christie & Co style agents |
| 36 | GP practice / healthcare business consultants | medical | Google Maps, trade press |
| 37 | Business transfer agents (SME M&A brokers) | generalist | Google Maps, BTA members |
| 38 | Trademark attorneys | startups-tech, ecommerce | CITMA register, IPReg |
| 39 | Charity / fundraising consultants | charities | CIOF members, Google Maps |

## Capture fields (one row per firm)

`Company Name, Category, Website`

Outreach runs through website contact forms, not email, so the website URL is the deliverable.
Full rules for the scraper are in `BUYER_SCRAPE_SPEC_2026-08-13.md`: firm's own site only,
resolve shorteners, strip utm parameters, deduplicate by domain, clean the GBP keyword stuffing
out of company names, independents over national chains.

## Do not scrape

- Quick-sale / below-market-value property investors.
- Debt advice and claims management firms.
- Accountancy lead resellers and lead marketplaces.
