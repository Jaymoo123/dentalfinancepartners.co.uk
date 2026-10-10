# Link gap list: property, run 2026-10-10

Built by scripts/link_engine/gaps_pack.py from the stage files. Each row is one link we propose to add or fix inside the text of a page (not menus, footers or related-article boxes). Nothing here has been edited on the site. A page's wave says when it is worth doing: wave 1 is pages with real search traffic or leads and the sales and audience pages themselves, wave 2 is the rest, and 'never' is pages we are not allowed to touch without your sign-off.

## 1. Sales pages: links in the text, today and planned

Share of priority is the page's share of commercial search value (the non-resident page is held at a 5% floor by ruling LE-15). Planned counts add the new pages that would link to it; a page already linking is not counted twice.

| Sales page | Share of priority | Links in today | After wave 1 | After wave 2 |
|---|---|---|---|---|
| /services/property-accountant | 40.1% | 38 | 85 | 125 |
| /services/landlord-accountant | 12.7% | 35 | 91 | 109 |
| /services/property-tax-advice | 10.9% | 36 | 174 | 288 |
| /blog/capital-gains-tax/capital-gains-tax-second-home-sale | 6.6% | 4 | 19 | 26 |
| /services/non-resident-landlord | 5.0% | 5 | 23 | 46 |
| /blog/incorporation-and-company-structures/how-to-transfer-property-into-limited-company-uk | 5.0% | 21 | 28 | 33 |
| /for/moving-property-into-a-limited-company | 4.7% | 3 | 36 | 58 |
| /for/gifting-property-to-family | 3.9% | 1 | 10 | 17 |
| /for/property-spv-set-up | 2.9% | 1 | 21 | 37 |
| /for/rental-income-disclosure | 1.5% | 2 | 15 | 21 |
| /locations/london | 1.0% | 3 | 3 | 3 |
| /locations/birmingham | 0.8% | 3 | 3 | 3 |
| /for/landlord-retirement-and-succession | 0.8% | 1 | 15 | 41 |
| /for/selling-a-buy-to-let | 0.5% | 3 | 25 | 34 |
| /locations/manchester | 0.3% | 4 | 4 | 4 |
| /for/holiday-let-and-serviced-accommodation | 0.2% | 0 | 15 | 27 |
| /for/inherited-property | 0.1% | 1 | 9 | 13 |
| /landed-estates | 0.0% | 5 | 6 | 10 |
| /locations/leeds | 0.0% | 4 | 4 | 4 |
| /locations/bristol | 0.0% | 3 | 3 | 3 |
| /for/hmo-and-multi-let-landlords | 0.0% | 0 | 13 | 19 |
| /for-letting-agents | 0.0% | 6 | 7 | 8 |
| /for/landlord-self-assessment-and-mtd | 0.0% | 0 | 28 | 56 |
| /for/portfolio-landlords-incorporating-a-partnership | 0.0% | 0 | 2 | 2 |
| /for/non-resident-landlords | 0.0% | 1 | 10 | 17 |
| /for/couples-splitting-rental-income | 0.0% | 0 | 7 | 16 |
| /for/first-time-and-accidental-landlords | 0.0% | 2 | 7 | 12 |
| /for/property-company-profit-extraction | 0.0% | 1 | 15 | 28 |

## 2. What the gaps are

| Kind | Rows | Wave 1 | Wave 2 | Needs your sign-off | What it means |
|---|---|---|---|---|---|
| missing_primary | 666 | 364 | 291 | 11 | A page has no link in its text to the sales page it should send readers to. We add one sentence. |
| missing_secondary | 177 | 101 | 72 | 4 | A second link to a different sales page, added where a page also fits a second service. Never more than two sales links per page. |
| repoint_hire_anchor | 39 | 18 | 19 | 2 | A page already says something like 'specialist property accountant' but the link goes to a guide. We point the same words at the sales page. This changes an existing sentence, it does not add one. |
| competing_page | 26 | 13 | 0 | 13 | A page that ranks better than our sales page for that sales page's searches. It should link to the sales page, without using the sales page's main search phrase as the link words, and its title is never changed. |
| orphan_needs_inlink | 97 | 60 | 37 | 0 | A page that no other page links to in its text. We suggest the most similar page to link to it. |
| broken | 6 | 6 | 0 | 0 | A link in a page's text that goes nowhere. We give the right page to point it at. |
| Total | 1011 | 562 | 419 | 30 | - |

Wave 1 work: about 538 new sentences and 24 existing sentences to rework.

## 3. Wave 1 in priority order

Ranked by the page's value as a source times the share of priority of the page it links to.

| # | Source page | Sends readers to | Kind | Why this page |
|---|---|---|---|---|
| 1 | Property Accountant Edinburgh / Landlord Tax & LBTT (/blog/property-accountant-services/property-accountant-edinburgh-landlord-tax-services) | /services/property-accountant | missing_primary | 68 impressions, 2 leads (90 days) |
| 2 | Transfer Property Into a Limited Company UK / 2026 Guide (/blog/incorporation-and-company-structures/how-to-transfer-property-into-limited-company-uk) | /services/landlord-accountant | missing_secondary | 2530 impressions, 15 leads (90 days) |
| 3 | Property Accountant Glasgow / LBTT, ADS & Section 24 Help (/blog/property-accountant-services/property-accountant-glasgow) | /services/property-accountant | competing_page | 100 impressions, 1 leads (90 days) |
| 4 | Property Accountant Sunderland / Landlord Tax & MTD Help (/blog/property-accountant-services/sunderland-property-accountant-specialist-tax-services) | /services/property-accountant | missing_primary | 43 impressions, 1 leads (90 days) |
| 5 | Property Accountant Aberdeen / Landlord Tax Services (/blog/property-accountant-services/property-accountant-aberdeen-landlords-tax-services) | /services/property-accountant | repoint_hire_anchor | 8 impressions, 1 leads (90 days) |
| 6 | Property Accountant Leicester / BTL Landlord Tax Help (/blog/property-accountant-services/property-accountant-leicester) | /services/property-accountant | missing_primary | 273 impressions, 1 leads (90 days) |
| 7 | Property Accountant Cardiff / Welsh LTT & Landlord Tax Help (/blog/property-accountant-services/why-cardiff-landlords-need-specialist-property-accountant-2026) | /services/property-accountant | missing_primary | 66 impressions, 1 leads (90 days) |
| 8 | What Records Must Landlords Keep Under MTD? (2026 Guide) (/blog/making-tax-digital-mtd/mtd-record-keeping-landlords-digital-requirements) | /services/property-accountant | repoint_hire_anchor | 6 impressions, 1 leads (90 days) |
| 9 | Tax When You Sell a Rental Property UK: 2026/27 Guide (/blog/capital-gains-tax/tax-sell-rental-property-uk) | /services/property-accountant | repoint_hire_anchor | 0 impressions, 1 leads (90 days) |
| 10 | Director Loan Property Company: UK Tax Rules Explained (/blog/incorporation-and-company-structures/director-loan-property-company) | /services/property-accountant | missing_secondary | 0 impressions, 1 leads (90 days) |
| 11 | Landlord Year-End Tax Checklist: Before 5 April 2026 (/blog/landlord-tax-essentials/end-tax-year-checklist-landlords-april-2026) | /services/property-accountant | repoint_hire_anchor | 0 impressions, 1 leads (90 days) |
| 12 | Buy-to-Let Limited Company UK: Tax, SDLT, S162 Relief, ATED (/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk) | /services/landlord-accountant | missing_secondary | 902 impressions, 2 leads (90 days) |
| 13 | CGT on Overseas Property: UK Residents' Guide (2026/27) (/blog/capital-gains-tax/cgt-overseas-property-uk-residents-foreign-disposals) | /services/property-tax-advice | missing_primary | 4492 impressions, 5 leads (90 days) |
| 14 | CGT on Overseas Property: UK Residents' Guide (2026/27) (/blog/capital-gains-tax/cgt-overseas-property-uk-residents-foreign-disposals) | /blog/capital-gains-tax/capital-gains-tax-second-home-sale | missing_secondary | 4492 impressions, 5 leads (90 days) |
| 15 | Penalties for Not Declaring Rental Income to HMRC (/blog/landlord-tax-essentials/penalties-not-declaring-rental-income-hmrc) | /services/landlord-accountant | missing_secondary | 3431 impressions, 2 leads (90 days) |
| 16 | Transfer Property Into a Limited Company UK / 2026 Guide (/blog/incorporation-and-company-structures/how-to-transfer-property-into-limited-company-uk) | /for/moving-property-into-a-limited-company | missing_primary | 2530 impressions, 15 leads (90 days) |
| 17 | CGT Calculation Selling Buy-to-Let: Step-by-Step (2026/27) (/blog/capital-gains-tax/cgt-calculation-selling-buy-to-let-property-step-by-step) | /services/landlord-accountant | missing_secondary | 98 impressions, 2 leads (90 days) |
| 18 | Landlord Accounting Services: What They Cover in 2026 (/blog/property-accountant-services/accounting-services-for-property-owners) | /services/property-accountant | competing_page | 85 impressions, 0 leads (90 days) |
| 19 | Inheritance Tax on Rental Property UK 2026: Reliefs (/blog/landlord-tax-essentials/inheritance-tax-rental-property-uk-guide) | /services/landlord-accountant | missing_secondary | 2489 impressions, 2 leads (90 days) |
| 20 | Claim Mortgage Interest on UK Rental Property 2025/26 (/blog/section-24-and-tax-relief/claim-mortgage-interest-rental-property-uk-section-24) | /services/landlord-accountant | missing_primary | 144 impressions, 2 leads (90 days) |
| 21 | Business Rates vs Council Tax for Landlords (2026/27) (/blog/landlord-tax-essentials/property-business-rates-council-tax-landlords) | /services/landlord-accountant | missing_secondary | 144 impressions, 2 leads (90 days) |
| 22 | Section 24 Finance Costs: What Counts for Landlords (/blog/section-24-and-tax-relief/finance-costs-section-24-complete-guide) | /services/landlord-accountant | missing_primary | 2 impressions, 2 leads (90 days) |
| 23 | SPV Company Formation Cost UK: Year-One Total (/blog/incorporation-and-company-structures/spv-company-formation-cost-uk) | /services/landlord-accountant | missing_secondary | 0 impressions, 2 leads (90 days) |
| 24 | Property Accountant Near Me / UK Landlord Tax Specialists (/blog/property-accountant-services/property-accountant-near-me) | /services/property-accountant | missing_primary | 33 impressions, 0 leads (90 days) |
| 25 | Corporation Tax Calculator / Property Company (19% / 25%) (/calculators/corporation-tax-calculator) | /services/landlord-accountant | missing_secondary | 231 impressions, 1 leads (90 days) |
| 26 | CGT on Selling a Buy-to-Let: How It Is Calculated (UK) (/blog/capital-gains-tax/cgt-selling-buy-to-let-property-calculation-guide) | /services/landlord-accountant | missing_secondary | 194 impressions, 1 leads (90 days) |
| 27 | Property Accountant Oxford / HMO + Section 24 Specialists (/blog/property-accountant-services/property-accountant-oxford-guide-local-landlords) | /services/property-accountant | missing_secondary | 191 impressions, 0 leads (90 days) |
| 28 | UK Landlord Tax Changes 2026 and 2027: Every Update (/blog/landlord-tax-essentials/landlord-tax-changes-2026-complete-guide) | /services/landlord-accountant | missing_secondary | 33 impressions, 1 leads (90 days) |
| 29 | Buy-to-Let Accountants Near Me: How to Choose (2026) (/blog/property-accountant-services/buy-to-let-accountants-near-me-guide) | /services/property-accountant | repoint_hire_anchor | 23 impressions, 0 leads (90 days) |
| 30 | SDLT on Transferring Property to a Limited Company 2026/27 (/blog/incorporation-and-company-structures/sdlt-transfer-property-company-cost) | /for/moving-property-into-a-limited-company | missing_secondary | 2079 impressions, 3 leads (90 days) |
| 31 | HMRC Nudge Letter Response Playbook for Landlords (/blog/landlord-tax-essentials/hmrc-nudge-letter-response-playbook-landlords-property-income) | /services/landlord-accountant | missing_secondary | 282 impressions, 1 leads (90 days) |
| 32 | Buy-to-Let Limited Company UK: Tax, SDLT, S162 Relief, ATED (/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk) | /for/moving-property-into-a-limited-company | missing_primary | 902 impressions, 2 leads (90 days) |
| 33 | Gift with Reservation of Benefit: Plain-English UK Guide (/blog/landlord-tax-essentials/gift-with-reservation-of-benefit) | /services/landlord-accountant | missing_secondary | 2375 impressions, 1 leads (90 days) |
| 34 | Property Accountants Liverpool / BTL Tax & Section 24 Help (/blog/property-accountant-services/liverpool-property-accountant-tax-services-landlords) | /services/property-accountant | missing_primary | 206 impressions, 0 leads (90 days) |
| 35 | Property Accountant Middlesbrough / Landlord Tax Help (/blog/property-accountant-services/property-accountant-middlesbrough-specialist-tax-services) | /services/property-accountant | missing_primary | 83 impressions, 0 leads (90 days) |
| 36 | Incorporation Cost Calculator: CGT & SDLT for Landlords (/blog/incorporation-and-company-structures/incorporation-cost-calculator-cgt-sdlt-implications) | /services/landlord-accountant | missing_secondary | 1 impressions, 1 leads (90 days) |
| 37 | Landlord Self Assessment 2025/26: SA105 Step-by-Step Guide (/blog/landlord-tax-essentials/how-to-complete-landlord-self-assessment-filing-step-by-step-guide) | /services/landlord-accountant | missing_secondary | 2 impressions, 1 leads (90 days) |
| 38 | BTL Capital Raising: Remortgage to Release Equity (/blog/property-finance/capital-raising-btl-remortgage-equity-release) | /services/property-tax-advice | missing_primary | 46 impressions, 1 leads (90 days) |
| 39 | CGT on Spouse Property Transfers 2026/27: s.58 + SDLT Trap (/blog/capital-gains-tax/cgt-property-transfer-spouse) | /services/property-tax-advice | missing_secondary | 115 impressions, 1 leads (90 days) |
| 40 | 5-Property Incorporation Case Study / Worked Tax Analysis (/blog/incorporation-and-company-structures/incorporation-case-study-5-property-portfolio-analysis) | /services/landlord-accountant | missing_secondary | 0 impressions, 1 leads (90 days) |
| 41 | VAT on Residential Conversions: 5% Rate & OTT Trap (/blog/property-types-and-specialist-tax/vat-property-conversions-residential-reduced-rate-opted-to-tax) | /services/property-tax-advice | missing_primary | 1980 impressions, 1 leads (90 days) |
| 42 | Commercial Property Fixtures s.198 Election: Buyer's Playbook (/blog/property-types-and-specialist-tax/commercial-property-fixtures-claim-s198-election-purchase-mechanics) | /services/property-tax-advice | missing_primary | 1395 impressions, 1 leads (90 days) |
| 43 | Tax Relief on Mortgage Interest for Rented Property (/blog/section-24-and-tax-relief/tax-relief-mortgage-interest-rented-property-guide) | /services/property-tax-advice | missing_primary | 32 impressions, 1 leads (90 days) |
| 44 | Property Accountant Plymouth / Landlord & BTL Tax Help (/blog/property-accountant-services/plymouth-property-accountant-local-landlord-tax-services) | /services/property-accountant | missing_primary | 40 impressions, 0 leads (90 days) |
| 45 | Property Accountant Warrington / Landlord Tax & MTD Help (/blog/property-accountant-services/property-accountant-warrington-landlord-services-2026) | /services/property-accountant | missing_secondary | 87 impressions, 0 leads (90 days) |
| 46 | Property Accountant Coventry / HMO, Article 4 & S24 (/blog/property-accountant-services/coventry-property-accountant) | /services/property-accountant | repoint_hire_anchor | 126 impressions, 0 leads (90 days) |
| 47 | CGT on Divorce Property Transfers 2026/27: s.58 + s.225B (/blog/capital-gains-tax/cgt-divorce-property-transfer-tax-implications) | /services/property-tax-advice | missing_primary | 41 impressions, 1 leads (90 days) |
| 48 | Property Accountant Wolverhampton / BTL & Landlord Experts (/blog/property-accountant-services/property-accountant-wolverhampton-specialist-tax-services) | /services/property-accountant | missing_primary | 77 impressions, 0 leads (90 days) |
| 49 | Cambridge Property Accountant / Landlord Tax Services (/blog/property-accountant-services/cambridge-property-accountant-landlord-tax-services) | /services/property-accountant | missing_primary | 22 impressions, 0 leads (90 days) |
| 50 | Non-Resident Landlord Scheme & NRL1: UK Overseas Tax Guide (/blog/non-resident-landlord-tax/non-resident-landlord-scheme-uk-complete-guide) | /services/non-resident-landlord | missing_primary | 5748 impressions, 1 leads (90 days) |
| 51 | Business Property Relief on Rental Property: Does BPR Apply? (/blog/landlord-tax-essentials/business-property-relief-rental-property-iht) | /services/property-accountant | repoint_hire_anchor | 253 impressions, 0 leads (90 days) |
| 52 | Partnership SDLT Relief Sch 15: SLP + 3-Year Anti-Withdrawal (/blog/incorporation-and-company-structures/partnership-sdlt-relief-schedule-15-fa-2003-incorporation-sum-lower-proportions) | /for/moving-property-into-a-limited-company | missing_secondary | 774 impressions, 2 leads (90 days) |
| 53 | ATED 2026/27 Strategic Overview for Property Companies (/blog/incorporation-and-company-structures/ated-overview-companies-holding-uk-residential-property-2026-27) | /services/property-tax-advice | missing_primary | 0 impressions, 1 leads (90 days) |
| 54 | Landlord Year-End Tax Checklist: Before 5 April 2026 (/blog/landlord-tax-essentials/end-tax-year-checklist-landlords-april-2026) | /services/property-tax-advice | missing_primary | 0 impressions, 1 leads (90 days) |
| 55 | Section 24 Pension Planning for Landlords (2026/27) (/blog/section-24-and-tax-relief/section-24-pension-contributions-tax-planning) | /services/property-tax-advice | missing_primary | 0 impressions, 1 leads (90 days) |
| 56 | Property Accountant Southampton / BTL, Section 24, HMO, MTD (/blog/property-accountant-services/why-southampton-landlords-need-property-accountant) | /services/property-accountant | missing_secondary | 68 impressions, 0 leads (90 days) |
| 57 | Property Accountant Bath / HMO, Section 24 & MTD Help (/blog/property-accountant-services/property-accountant-bath-expert-tax-services-local-landlords) | /services/property-accountant | missing_secondary | 91 impressions, 0 leads (90 days) |
| 58 | Property Accountant Exeter / Student HMO & S24 Specialists (/blog/property-accountant-services/exeter-property-accountant-specialist-tax-services) | /services/property-accountant | missing_primary | 31 impressions, 0 leads (90 days) |
| 59 | Property Accountant Swansea / Welsh BTL & Landlord Tax (/blog/property-accountant-services/property-accountant-swansea-landlord-tax-services) | /services/property-accountant | missing_primary | 116 impressions, 0 leads (90 days) |
| 60 | Incorporating a Property Portfolio UK: 2026 Step-by-Step (/blog/incorporation-and-company-structures/incorporating-property-portfolio-uk-2026) | /for/moving-property-into-a-limited-company | missing_primary | 12 impressions, 2 leads (90 days) |

Plus 502 more wave 1 rows in stages/12_gaps.csv.

## 4. Needs your sign-off

These pages are on the frozen list (top click drivers and conversion pages) or are pages that give up a search phrase and must wait for blueprint rule R6 (the new sales pages must be fetched by Google first). They are listed, never edited.

| Page | Why held | Proposed link to | Kind |
|---|---|---|---|
| /locations/manchester | gives up a phrase (R6) | /services/property-accountant | competing_page |
| /blog/property-accountant-services/how-much-does-a-property-accountant-cost | frozen | /services/property-accountant | repoint_hire_anchor |
| /blog/section-24-and-tax-relief/mortgage-arrangement-fees-deductible-landlord | frozen | /services/property-accountant | repoint_hire_anchor |
| /locations/birmingham | gives up a phrase (R6) | /services/landlord-accountant | competing_page |
| /blog/property-accountant-services/how-much-does-a-property-accountant-cost | frozen | /services/landlord-accountant | competing_page |
| /blog/landlord-tax-essentials/landlord-vat-registration-when-required | frozen | /services/landlord-accountant | missing_secondary |
| /blog/section-24-and-tax-relief/mortgage-arrangement-fees-deductible-landlord | frozen | /services/landlord-accountant | missing_primary |
| /locations/birmingham | gives up a phrase (R6) | /services/property-tax-advice | competing_page |
| /locations/manchester | gives up a phrase (R6) | /services/property-tax-advice | missing_secondary |
| /blog/property-accountant-services/belfast-property-accountant-specialist-tax-services | gives up a phrase (R6) | /services/property-accountant | competing_page |
| /locations/leeds | gives up a phrase (R6) | /services/property-accountant | competing_page |
| /locations/bristol | gives up a phrase (R6) | /services/property-accountant | competing_page |
| /blog/property-accountant-services/belfast-property-accountant-specialist-tax-services | gives up a phrase (R6) | /services/landlord-accountant | competing_page |
| /for/landlord-retirement-and-succession | gives up a phrase (R6) | /services/property-accountant | competing_page |
| /locations/bristol | gives up a phrase (R6) | /services/landlord-accountant | competing_page |
| /blog/landlord-tax-essentials/landlord-accounting-spreadsheet-template-free-excel-guide | frozen | /services/landlord-accountant | missing_primary |
| /calculators/portfolio-profitability-calculator | frozen | /services/property-accountant | missing_primary |
| /blog/property-accountant-services/belfast-property-accountant-specialist-tax-services | gives up a phrase (R6) | /services/property-tax-advice | competing_page |
| /calculators/section-24-calculator | frozen | /services/landlord-accountant | missing_primary |
| /blog/property-accountant-services/can-you-claim-aia-on-second-hand-assets | frozen | /services/property-tax-advice | missing_primary |
| /locations/bristol | gives up a phrase (R6) | /services/property-tax-advice | competing_page |
| /calculators/incorporation-cost-calculator | frozen | /for/moving-property-into-a-limited-company | missing_primary |
| /blog/property-accountant-services/how-much-does-a-property-accountant-cost | frozen | /for/rental-income-disclosure | competing_page |
| /for/landlord-retirement-and-succession | gives up a phrase (R6) | /for/gifting-property-to-family | missing_secondary |
| /calculators/section-24-calculator | frozen | /for/moving-property-into-a-limited-company | missing_secondary |
| /blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk | frozen | /for/selling-a-buy-to-let | missing_primary |
| /blog/property-types-and-specialist-tax/vat-property-conversion-residential-to-commercial-or-commercial-to-residential-zero-rate-reduced-rate | frozen | /services/property-tax-advice | missing_primary |
| /blog/landlord-tax-essentials/landlord-vat-registration-when-required | frozen | /for/holiday-let-and-serviced-accommodation | missing_primary |
| /blog/landlord-tax-essentials/sa105-property-income-form-2026-complete-guide | frozen | /for/landlord-self-assessment-and-mtd | missing_primary |
| /calculators/mtd-checker | frozen | /for/landlord-self-assessment-and-mtd | missing_primary |

## 5. Repoints: hire wording that links to a guide

39 existing links where the words offer hiring help but the link goes to a guide.

| Page | Current link words | Currently points to | Proposed target | Wave |
|---|---|---|---|---|
| /blog/property-accountant-services/property-accountant-aberdeen-landlords-tax-services | specialist property accountant | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | 1 |
| /blog/making-tax-digital-mtd/mtd-record-keeping-landlords-digital-requirements | accountant who handles property tax | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | 1 |
| /blog/capital-gains-tax/tax-sell-rental-property-uk | property accountant | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | 1 |
| /blog/landlord-tax-essentials/end-tax-year-checklist-landlords-april-2026 | property accountant | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | 1 |
| /blog/property-accountant-services/buy-to-let-accountants-near-me-guide | specialist property accountant | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | 1 |
| /blog/property-accountant-services/coventry-property-accountant | property accountant near you | /blog/property-accountant-services/property-accountant-near-me | /services/property-accountant | 1 |
| /blog/landlord-tax-essentials/business-property-relief-rental-property-iht | specialist property accountant | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | 1 |
| /blog/incorporation-and-company-structures/property-company-accounting-requirements-hmrc-expectations | specialist property accountant | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | 1 |
| /blog/property-accountant-services/accounting-services-for-property-owners | finding a buy-to-let accountant near you | /blog/property-accountant-services/buy-to-let-accountants-near-me-guide | /services/landlord-accountant | 1 |
| /blog/property-types-and-specialist-tax/how-much-tax-holiday-let-property-uk | specialist who handles short-term rental income | /blog/property-types-and-specialist-tax/airbnb-tax-uk-short-term-rental-income-taxed | /services/property-accountant | 1 |
| /blog/incorporation-and-company-structures/property-company-running-costs-annual-budget | property-specialist accountant | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | 1 |
| /blog/incorporation-and-company-structures/2027-tax-rates-incorporation-decision-property-landlords | specialist property accountant | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | 1 |
| /blog/capital-gains-tax/cgt-record-keeping-property-sales-what-to-save-how-long | specialist property accountant | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | 1 |
| /blog/capital-gains-tax/ppr-relief-calculation-former-home-step-by-step | Property accountants | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | 1 |
| /blog/property-types-and-specialist-tax/aia-capital-allowances | property accountant | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | 1 |
| /blog/section-24-and-tax-relief/mortgage-interest-deductible-landlords-uk-2026 | See how a property accountant works through this | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | 1 |
| /blog/incorporation-and-company-structures/companies-house-confirmation-statement-changes-2024-onwards-psc-disclosure | Property company corporation tax accountant services | /blog/incorporation-and-company-structures/accountant-corporation-tax-property-companies | /services/property-accountant | 1 |
| /blog/landlord-tax-essentials/hmrc-penalties-late-landlord-tax-returns-2026 | property accountant | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | 1 |
| /blog/section-24-and-tax-relief/section-24-multiple-properties-cumulative-impact | specialist property accountant | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | 2 |
| /blog/incorporation-and-company-structures/how-to-choose-right-property-company-structure-uk-landlords-2026 | specialist property accountant | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | 2 |
| /blog/landlord-tax-essentials/landlord-insurance-guide-types-costs-tax-deductible | property accountant | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | 2 |
| /blog/property-types-and-specialist-tax/serviced-accommodation-tax-fhl-abolition-april-2025 | specialist property accountant | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | 2 |
| /blog/section-24-and-tax-relief/section-24-higher-rate-taxpayers-changes-2027 | See how a specialist property accountant approaches it | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | 2 |
| /blog/property-types-and-specialist-tax/serviced-accommodation-vs-buy-to-let-tax-comparison-2026 | specialist property accountant | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | 2 |
| /blog/incorporation-and-company-structures/accountant-payroll-services | Corporation Tax Accountants for UK Property Companies | /blog/incorporation-and-company-structures/accountant-corporation-tax-property-companies | /services/property-accountant | 2 |
| /blog/incorporation-and-company-structures/llp-property-investment-worth-considering | property accountant | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | 2 |
| /blog/incorporation-and-company-structures/register-for-uk-corporation-tax | Accountant for corporation tax property companies | /blog/incorporation-and-company-structures/accountant-corporation-tax-property-companies | /services/property-accountant | 2 |
| /blog/incorporation-and-company-structures/types-of-property-company-structure-uk-guide | property accountant | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | 2 |
| /blog/landlord-tax-essentials/deposit-buy-to-let-2026-mortgage-requirements | specialist property accountant | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | 2 |
| /blog/landlord-tax-essentials/pre-letting-expenses-landlord-claim-before-first-tenant | property accountant review the classification | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | 2 |
| /blog/portfolio-management/rental-yield-vs-roi-property-investors-uk | specialist property accountant | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | 2 |
| /blog/portfolio-management/what-is-good-gross-yield-buy-to-let-property-2026 | property accountant | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | 2 |
| /blog/property-accountant-services/property-accountant-milton-keynes-landlord-guide | Property accountant near me: finding the right UK property tax specialist | /blog/property-accountant-services/property-accountant-near-me | /services/property-tax-advice | 2 |
| /blog/property-accountant-services/property-accountant-norwich-landlords-2026 | property specialist | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | 2 |
| /blog/property-types-and-specialist-tax/capital-allowances-commercial-property-what-can-claim | specialist property accountant | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | 2 |
| /blog/section-24-and-tax-relief/section-24-employment-income-paye-landlords | A property accountant | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | 2 |
| /blog/section-24-and-tax-relief/section-24-remortgaging-btl-property-tax-implications | specialist property accountant | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | 2 |
| /blog/property-accountant-services/how-much-does-a-property-accountant-cost | Property Accountant Services: Expert Tax and Advisory Solutions for UK Landlords | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | never |
| /blog/section-24-and-tax-relief/mortgage-arrangement-fees-deductible-landlord | specialist property accountant | /blog/property-accountant-services/what-does-a-property-accountant-do | /services/property-accountant | never |

## 6. Broken links

6 links that lead to a page that does not exist (all inside FAQ answers).

| Page | Link words | Broken target | Proposed fix | Note |
|---|---|---|---|---|
| /blog/property-types-and-specialist-tax/vat-partial-exemption-special-method-approval-landlords-standard-method-override-mechanics | VAT partial exemption for mixed residential and commercial portfolios | /blog/property-types-and-specialist-tax/vat-partial-exemption-landlords-mixed-residential-commercial-portfolios-standard-method | /blog/landlord-tax-essentials/vat-partial-exemption-landlords-mixed-residential-commercial-portfolios-standard-method | closest built page by slug tokens (score 1.00); verify before use |
| /blog/capital-gains-tax/cgt-deferral-strategies-property-investors-uk | settlor-interested trust guide | /blog/capital-gains-tax/settlor-interested-trust-iht-s49-1a-cgt-s169b-property-attribution-rules | /blog/incorporation-and-company-structures/settlor-interested-trust-iht-s49-1a-cgt-s169b-property-attribution-rules | closest built page by slug tokens (score 1.00); verify before use |
| /blog/capital-gains-tax/cgt-deferral-strategies-property-investors-uk | FHL grandfathered claims guide | /blog/capital-gains-tax/fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics | /blog/property-types-and-specialist-tax/fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics | closest built page by slug tokens (score 1.00); verify before use |
| /blog/capital-gains-tax/reduce-cgt-property-disposal-uk | FHL grandfathered claims guide | /blog/capital-gains-tax/fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics | /blog/property-types-and-specialist-tax/fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics | closest built page by slug tokens (score 1.00); verify before use |
| /blog/capital-gains-tax/rollover-relief-property-landlords | settlor-interested trust guide | /blog/capital-gains-tax/settlor-interested-trust-iht-s49-1a-cgt-s169b-property-attribution-rules | /blog/incorporation-and-company-structures/settlor-interested-trust-iht-s49-1a-cgt-s169b-property-attribution-rules | closest built page by slug tokens (score 1.00); verify before use |
| /blog/capital-gains-tax/rollover-relief-property-landlords | FHL grandfathered claims guide | /blog/capital-gains-tax/fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics | /blog/property-types-and-specialist-tax/fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics | closest built page by slug tokens (score 1.00); verify before use |

## 7. Competing pages

26 pages that rank better than the sales page for its searches. Each should link to the sales page; none is retitled.

| Page | Should link to | Wave | Note |
|---|---|---|---|
| /blog/property-accountant-services/property-accountant-glasgow | /services/property-accountant | 1 | property accountant: position 13.7 on 73 impressions vs owner not ranking. Must link to the owner; must not use the family head as anchor; never retitle (R6). |
| /blog/property-accountant-services/accounting-services-for-property-owners | /services/property-accountant | 1 | accounting services for property owners: position 12.2 on 24 impressions vs owner not ranking. Must link to the owner; must not use the family head as anchor; never retitle (R6). |
| /blog/incorporation-and-company-structures/section-162-incorporation-relief-property-landlords | /for/moving-property-into-a-limited-company | 1 | incorporation relief for landlords: position 38.9 on 48 impressions vs owner not ranking; incorporation relief property: position 32.0 on 20 impressions vs owner not ranking. Must link to the owner; must not use the family head as anchor; never retitle (R6). |
| /blog/portfolio-management/portfolio-landlord-tax-planning-strategy-guide | /services/property-tax-advice | 1 | portfolio landlord tax planning: position 17.3 on 21 impressions vs owner not ranking. Must link to the owner; must not use the family head as anchor; never retitle (R6). |
| /blog/incorporation-and-company-structures/sdlt-incorporation-stamp-duty-twice | /for/moving-property-into-a-limited-company | 1 | incorporation relief property: position 14.1 on 23 impressions vs owner not ranking. Must link to the owner; must not use the family head as anchor; never retitle (R6). |
| /blog/portfolio-management/multi-property-landlord-tax-planning-strategies-5-plus-properties | /services/property-tax-advice | 1 | portfolio landlord tax planning: position 5.5 on 42 impressions vs owner not ranking. Must link to the owner; must not use the family head as anchor; never retitle (R6). |
| /for/moving-property-into-a-limited-company | /blog/incorporation-and-company-structures/how-to-transfer-property-into-limited-company-uk | 1 | transfer property to limited company: position 3.8 on 25 impressions vs owner 52.4. Must link to the owner; must not use the family head as anchor; never retitle (R6). |
| /blog/incorporation-and-company-structures/incorporation-existing-portfolios-phased-approach | /for/moving-property-into-a-limited-company | 1 | landlord portfolio incorporation uk: position 6.1 on 30 impressions vs owner not ranking. Must link to the owner; must not use the family head as anchor; never retitle (R6). |
| /blog/landlord-tax-essentials/inheritance-tax-rental-property-uk-guide | /for/landlord-retirement-and-succession | 1 | inheritance tax planning for landlords: position 41.2 on 82 impressions vs owner not ranking; inheritance tax mitigation strategies for landlords: position 35.4 on 76 impressions vs owner not ranking. Must link to the owner; must not use the family head as anchor; never retitle (R6). |
| /blog/portfolio-management/when-to-sell-rental-property-key-indicators-landlords | /for/selling-a-buy-to-let | 1 | capital gains tax selling rental property: position 17.8 on 27 impressions vs owner not ranking. Must link to the owner; must not use the family head as anchor; never retitle (R6). |
| /blog/landlord-tax-essentials/inheritance-tax-rental-property-uk-guide | /for/inherited-property | 1 | inherited property landlord advice: position 63.4 on 20 impressions vs owner not ranking. Must link to the owner; must not use the family head as anchor; never retitle (R6). |
| /blog/property-types-and-specialist-tax/hmo-tax-guide-rental-income-deductions-multi-tenant | /for/hmo-and-multi-let-landlords | 1 | hmo landlord tax planning: position 22.9 on 95 impressions vs owner 95.3. Must link to the owner; must not use the family head as anchor; never retitle (R6). |
| /blog/property-types-and-specialist-tax/hmo-vs-standard-buy-to-let-tax-comparison | /for/hmo-and-multi-let-landlords | 1 | hmo landlord tax planning: position 6.9 on 21 impressions vs owner 95.3. Must link to the owner; must not use the family head as anchor; never retitle (R6). |
| /locations/manchester | /services/property-accountant | never | property accountant: position 43.9 on 380 impressions vs owner not ranking. Must link to the owner; must not use the family head as anchor; never retitle (R6). |
| /locations/birmingham | /services/landlord-accountant | never | landlord accountant: position 40.9 on 725 impressions vs owner 68.3. Must link to the owner; must not use the family head as anchor; never retitle (R6). |
| /blog/property-accountant-services/how-much-does-a-property-accountant-cost | /services/landlord-accountant | never | landlord accountant fees: position 9.4 on 76 impressions vs owner not ranking; landlord accountant: position 9.5 on 50 impressions vs owner 68.3; accountant fees for rental property: position 8.2 on 27 impressions vs owner not ranking. Must link to the owner; must not use the family head as anchor; never retitle (R6). |
| /locations/birmingham | /services/property-tax-advice | never | property tax advice: position 26.4 on 180 impressions vs owner 73.6. Must link to the owner; must not use the family head as anchor; never retitle (R6). |
| /blog/property-accountant-services/belfast-property-accountant-specialist-tax-services | /services/property-accountant | never | property accountant: position 26.8 on 281 impressions vs owner not ranking. Must link to the owner; must not use the family head as anchor; never retitle (R6). |
| /locations/leeds | /services/property-accountant | never | property accountant: position 19.0 on 99 impressions vs owner not ranking. Must link to the owner; must not use the family head as anchor; never retitle (R6). |
| /locations/bristol | /services/property-accountant | never | property accountant: position 15.6 on 519 impressions vs owner not ranking. Must link to the owner; must not use the family head as anchor; never retitle (R6). |
| /blog/property-accountant-services/belfast-property-accountant-specialist-tax-services | /services/landlord-accountant | never | landlord accountant: position 25.6 on 229 impressions vs owner 68.3. Must link to the owner; must not use the family head as anchor; never retitle (R6). |
| /for/landlord-retirement-and-succession | /services/property-accountant | never | property accountant: position 4.0 on 24 impressions vs owner not ranking. Must link to the owner; must not use the family head as anchor; never retitle (R6). |
| /locations/bristol | /services/landlord-accountant | never | landlord accountant: position 19.8 on 78 impressions vs owner 68.3. Must link to the owner; must not use the family head as anchor; never retitle (R6). |
| /blog/property-accountant-services/belfast-property-accountant-specialist-tax-services | /services/property-tax-advice | never | property tax advice: position 12.7 on 41 impressions vs owner 73.6. Must link to the owner; must not use the family head as anchor; never retitle (R6). |
| /locations/bristol | /services/property-tax-advice | never | property tax advice: position 36.9 on 36 impressions vs owner 73.6. Must link to the owner; must not use the family head as anchor; never retitle (R6). |
| /blog/property-accountant-services/how-much-does-a-property-accountant-cost | /for/rental-income-disclosure | never | let property campaign accountant cost: position 20.2 on 25 impressions vs owner not ranking. Must link to the owner; must not use the family head as anchor; never retitle (R6). |

## 8. Pages that get no sales link

133 pages were judged to have no natural sales page to point to (for example borrowing, commercial property or generic VAT questions). They get no link and no budget. Ten with the most search impressions:

| Page | Impressions (90 days) | Reason from the judgment |
|---|---|---|
| /blog/landlord-tax-essentials/scottish-lbtt-rates-bands-2026-27-residential-buyers-complete-guide | 14979 | Scottish LBTT rate guide for residential buyers, mostly homebuyers; no natural point at which this reader hires a property tax firm, no Scottish city page |
| /calculators/commercial-mortgage-calculator | 7296 | LE-17: manager adjudication of a reader disagreement; borrowing, commercial, offshore-wealth and generic-VAT pages get no sales link, company-owner and payroll questions go to the company and accountant pages, penalty challenges to the disclosure page. |
| /blog/property-types-and-specialist-tax/single-person-council-tax-discounts-a-complete-guide | 3618 | council tax for a householder; free statutory route, no hire moment (rule 10) |
| /blog/landlord-tax-essentials/essential-guide-for-first-time-homebuyers-in-scotland | 3091 | First-time homebuyer guide to LBTT in Scotland; homeowners, no landlord or investor hire need |
| /blog/property-finance/bridging-loan-rates | 1823 | bridging rates; reader needs a lender |
| /blog/property-types-and-specialist-tax/a-complete-guide-on-community-infrastructure-levy-cil | 1777 | CIL is a planning charge run by the LPA, not a tax we handle; no natural hire moment |
| /blog/property-types-and-specialist-tax/capital-allowances-on-cars-and-vehicles | 1437 | car capital allowances for generic businesses, not a property situation |
| /blog/capital-gains-tax/cheapest-estate-agent-fees-uk | 1341 | homeowner comparing estate agent fees; no natural reason to hire a property tax firm |
| /blog/landlord-tax-essentials/landlord-electrical-safety-certificate | 1318 | EICR compliance duties and penalties for landlords; a safety compliance reader, no tax hire moment |
| /calculators/first-time-buyer-stamp-duty-calculator | 1318 | First-time home buyer checking SDLT relief; no landlord or investor hire need |

## 9. How this was decided

Each of 866 pages was given one sales page to point to. Counts by how it was settled:

| Basis | Pages |
|---|---|
| judgment (medium) | 407 |
| judgment (high) | 288 |
| s2_specific | 98 |
| judgment (low, 2 readers agree) | 32 |
| manager override | 27 |
| s1_strong | 13 |
| forced (LE-14) | 1 |

Automatic checks: 13 pages were settled by their own search queries and 98 by a clear topic match to one specific page. We checked a random sample of 28 of those automatic picks against a blind read by Opus: 26 of 28 matched.

Where two readers disagreed, the manager settled 27 pages (LE-17: 27). The rulings are in scripts/link_engine/sites/property_rulings.md.
