# Property coverage map, September 2026

Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13 S3, scoped by section 4
Workstream C. Selection rules: `docs/_engines/NETNEW_PROGRAM.md` section 8. Ground truth:
`docs/property/house_positions.md`. Machine copy: `coverage_map_2026-09.json`.

Scope: decision-stage and service or segment needs. Rule explainers are out of scope, so a
subject that is only a rule lookup is not a cell here even where the pool holds rows for it.

Research only. No content written, nothing deployed, no claim made about the firm.

---

## One page

**18 buyer situations. 98 cells: 48 covered, 22 partial, 28 missing. The missing layer is
almost entirely the segment page, the page that answers "recommend an accountant for
this".** The blog corpus already answers the decisions. What does not exist is a page that
says we do this work for this person.

**What the numbers say**

- 806 posts cover the decision subjects well. Of 68 decision, question, number and proof
  cells, 43 are covered, 14 partial and 11 missing.
- Of 30 segment page cells, 17 are missing, 8 are partial and only 5 are covered. The 5
  covered are the London, Manchester, Birmingham, Leeds and Bristol location routes.
- The site has 4 services pages. Not one of them names a buyer situation. The 63
  "property accountant services" posts are 36 city posts plus career, payroll and VAT
  filler, none of which is a segment page.
- Peer check, live Google UK top 20, 10 segment queries, pulled 2026-09-27: a specialist
  firm holds a slot on all 10. We hold none.
- Search Console 90 days to 2026-09-24: we already earn impressions on service terms
  (2,816 on "property accountant" variants) and take 5 clicks. Bing, 6 months: 36
  impressions across 6 accountant queries. On Bing we are effectively absent.
- Google Ads volume, pulled 2026-09-27: most segment queries have no measurable volume.
  "landlord accountant" 390, "accountant for landlords" 260, "property tax accountant"
  210, "property accountant near me" 170, "specialist property accountant" 170,
  "buy to let accountant" 110, "spv accountant" 90. Everything situation-shaped
  ("accountant to transfer property into limited company", "cgt accountant property
  sale", "non resident landlord accountant") returns nothing.

**Disagreement flagged, per the spec's instruction.** NETNEW section 8.2 rule 3 asks for
100 to 5,000 searches a month. Most segment pages fail it. They are kept because
LEADS_250 section 2 A3 selects segment pages on buyer-situation match for assistant
retrieval, not on head-term volume, and the same section records that the site was named
by ChatGPT without ranking anywhere. Every such cell carries the failed rule in the JSON.
If the owner wants rule 3 enforced strictly, 17 of the 28 missing cells drop out and the
programme loses its A3 layer.

**Top 10 missing cells by demand.** Demand here is lead volume, because search volume does
not exist for these. Counts are approximate clusters read from 198 Property lead messages
since 1 July.

| # | Missing cell | Type | Lead signal | Peer top 20 |
|---|---|---|---|---|
| 1 | Accountants for landlords moving property into a limited company | segment page | about 83 of 198 messages, the single largest cluster | yes |
| 2 | Accountants for portfolio landlords incorporating a lettings partnership | segment page | about 14, and the highest value enquiries (15 to 39 properties) | yes |
| 3 | Accountants for landlords selling a buy-to-let | segment page | about 20; ChatGPT does not name us for this | yes |
| 4 | Accountants for landlords setting up a property SPV | segment page | about 12; 90 searches a month | yes |
| 5 | Accountants for non-resident and overseas landlords | segment page (partial) | about 14; a services page exists but names no situation | yes |
| 6 | Accountants for owners gifting property to family | segment page | about 10 | yes |
| 7 | Accountants for couples splitting rental income between them | segment page | about 9 | yes |
| 8 | Accountants filing landlord self assessment and MTD quarterly updates | segment page | about 8 | yes |
| 9 | Accountants for first-time and accidental landlords | segment page | about 8 | yes |
| 10 | Accountants for executors and beneficiaries of an inherited property | segment page | about 7 | yes |

**Segment pages proposed: 18.** One per buyer situation, plus the location set. Twelve
location cells are in the map: 5 are live routes (London, Manchester, Birmingham, Leeds,
Bristol), 7 exist only as blog posts and should become routes. The pool holds 54 location
rows, so the location layer can extend well past 12; it is deliberately not in Wave 1
because local Google sits at position 11 to 22 and the segment layer is the untested one.

**Wave 1, 15 rows, all segment pages, ordered by lead cluster size**

| # | Page | Situation |
|---|---|---|
| 1 | Accountants for landlords moving property into a limited company | incorporation decision |
| 2 | Accountants for landlords selling a buy-to-let | selling |
| 3 | Accountants for portfolio landlords incorporating a lettings partnership | partnership incorporation |
| 4 | Accountants for non-resident and overseas landlords | non-resident |
| 5 | Accountants for landlords setting up a property SPV | SPV set-up |
| 6 | Accountants for owners gifting property to family | gifting |
| 7 | Accountants for couples splitting rental income between them | joint ownership |
| 8 | Accountants filing landlord self assessment and MTD quarterly updates | filing |
| 9 | Accountants for first-time and accidental landlords | first-time landlord |
| 10 | Accountants for executors and beneficiaries of an inherited property | inherited property |
| 11 | Accountants for property company directors taking money out | profit extraction |
| 12 | Accountants for landlords making an HMRC rental income disclosure | disclosure |
| 13 | Accountants for holiday let and serviced accommodation operators | holiday let |
| 14 | Accountants for HMO and multi-let landlords | HMO |
| 15 | Accountants for landlords planning retirement and succession | succession |

Each at 800 to 1,200 words per NETNEW 8.3, the buyer's situation answered in the first 150
words, the shared entity block (A1), the relevant calculator linked in the body (C2), and
no claim about the firm beyond what `ESTATE_CLAIMS_INTEGRITY` allows.

**One decision for the owner.** Wave 1 is 15 segment pages rather than 15 blog posts. That
is a different shape of work from the last 115 posts: fewer words, more page-template and
schema work, and the payoff is measured on assistant naming and Bing, not on Google
position. Approve that shape, or say you want Wave 1 to stay blog posts and the segment
pages to follow.

---

## How the map was built

- **Buyer situations** from 198 Property lead messages since 1 July 2026 (test rows
  excluded), read for meaning and clustered. No names, addresses, emails or phone numbers
  are recorded anywhere in this map or its JSON, and no message is quoted.
- **Inventory** from all 806 files in `Property/web/content/blog`, the app routes under
  `Property/web/src/app` (4 services pages, 9 topic hubs, 5 location routes, 5 calculator
  routes plus 22 shared tools and 6 premium tools, 8 resource topics, 1 research index),
  and all 514 rows of `blog_topics` where `site_key = 'property'`.
- **Subject match, not slug tokens.** Every page asserted in the JSON was checked to exist;
  19 of my first-pass slug guesses were wrong and were corrected against the file index.
  One cell ("Does MTD apply to an overseas landlord") was downgraded from covered to
  missing when no post turned out to be the subject.
- **Search data.** Search Console 90 days to 2026-09-24 via the API, 8,652 queries. Bing
  Webmaster query stats via `bing_query_client`, 1,900 queries. Live Google UK top 20 and
  Google Ads volume via DataForSEO on 2026-09-27.
- **Ground truth.** `hp_anchors` point at section numbers in
  `docs/property/house_positions.md`. No figure is asserted in this map that is not
  already locked there.

### Cost

DataForSEO, 2026-09-27: $0.09 volume batch 1, $0.09 volume batch 2, $0.035 for 10 live
top-20 SERPs. **Total $0.215**, against a $2 budget. Search Console and Bing pulls are free.

### Traffic context, UK humans, entry page, since 1 July 2026

| Entry page | Sessions | Leads |
|---|---:|---:|
| `/blog/capital-gains-tax/cgt-gifting-property-family-members-uk` | 840 | 4 |
| `/blog/landlord-tax-essentials/sa105-property-income-form-2026-complete-guide` | 631 | 1 |
| `/blog/incorporation-and-company-structures/how-to-transfer-property-into-limited-company-uk` | 550 | 14 |
| `/blog/section-24-and-tax-relief/mortgage-arrangement-fees-deductible-landlord` | 486 | 0 |
| `/` (homepage) | 299 | 47 |

The pattern the programme already records holds in this pull: the decision page converts,
the rule lookup does not, and the homepage converts best of all. That is the case for the
segment layer.

---

## The full map

Status is COVERED when a page is the subject, PARTIAL when a page touches it and should be
extended, MISSING when no page is the subject. `wave` is `1` for Wave 1, `later` for the
rest of the manifest, `not_eligible` where the correct action is EXTEND rather than a new
page. Cells that fail a NETNEW 8.2 rule are kept here with the reason recorded in the JSON,
never dropped.

### Landlord moving personally held buy-to-lets into a limited company

Covered 3, partial 1, missing 4.

| Need | Type | Status | Existing page | Target query | Demand/mo | Peer top 20 | Calculator | House positions | Wave |
|---|---|---|---|---|---:|---|---|---|---|
| Accountants for landlords moving property into a limited company | segment_page | MISSING | `none` | accountant to transfer property into limited company |  | yes |  | s1 s1.A s21 s21.A | 1 |
| Should I transfer my buy-to-lets into a limited company in 2026/27 | decision | PARTIAL | `/blog/incorporation-and-company-structures/should-i-incorporate-buy-to-let-portfolio-2026` | should i incorporate my buy to let portfolio |  | yes | incorporation-cost-calculator | s21 s21.A s4 s5 | later |
| How to transfer property into a limited company, step by step | decision | COVERED | `/blog/incorporation-and-company-structures/how-to-transfer-property-into-limited-company-uk` | how to transfer property into a limited company | 480 | yes | incorporation-cost-calculator | s1 s5 s21 | not_eligible |
| What transferring a portfolio actually costs: SDLT plus CGT | number | COVERED | `/blog/incorporation-and-company-structures/sdlt-transfer-property-company-cost` | cost of transferring property to limited company | 30 | yes | incorporation-cost-calculator | s1 s1.A s5 | not_eligible |
| Does section 162 incorporation relief apply to my lettings | question | COVERED | `/blog/incorporation-and-company-structures/section-162-incorporation-relief-property-landlords` | section 162 incorporation relief | 170 | yes |  | s5 s21 | not_eligible |
| Transferring a buy-to-let in negative equity into a company | question | MISSING | `none` | transfer negative equity property to limited company |  | yes |  | s1 s5 s21.1 | later |
| Selling your own property to your own company: the connected-party rules | question | MISSING | `none` | sell property to my own limited company |  | yes |  | s1 s5 s21.1 | later |
| Modelled incorporation cost by portfolio size: SDLT and CGT across ten shapes | proof | MISSING | `none` | incorporation case study property portfolio |  | yes | incorporation-cost-calculator | s1 s5 s21.A | later |

### Portfolio landlord incorporating an established lettings partnership

Covered 3, partial 1, missing 1.

| Need | Type | Status | Existing page | Target query | Demand/mo | Peer top 20 | Calculator | House positions | Wave |
|---|---|---|---|---|---:|---|---|---|---|
| Accountants for portfolio landlords incorporating a lettings partnership | segment_page | MISSING | `none` | property partnership incorporation advice |  | yes |  | s1.A s11.C s5 | 1 |
| Incorporating a property partnership: does Schedule 15 remove the SDLT | decision | COVERED | `/blog/incorporation-and-company-structures/partnership-sdlt-relief-schedule-15-fa-2003-incorporation-sum-lower-proportions` | partnership sdlt relief schedule 15 |  | yes |  | s1.A s11.C | not_eligible |
| Does my lettings business actually count as a partnership | question | COVERED | `/blog/incorporation-and-company-structures/does-your-business-qualify-as-a-partnership` | is my property business a partnership |  | yes |  | s1.A s11.C | not_eligible |
| Unpicking a hybrid LLP structure before incorporating | question | PARTIAL | `/blog/incorporation-and-company-structures/hybrid-limited-liability-partnership` | hybrid llp property unwind |  | yes |  | s11.C.Y s1.A | later |
| Phased incorporation: moving a portfolio across in stages | decision | COVERED | `/blog/incorporation-and-company-structures/incorporation-existing-portfolios-phased-approach` | phased property incorporation |  | yes |  | s1.A s5 s21 | not_eligible |

### Investor setting up an SPV to buy a first or next property

Covered 3, partial 1, missing 2.

| Need | Type | Status | Existing page | Target query | Demand/mo | Peer top 20 | Calculator | House positions | Wave |
|---|---|---|---|---|---:|---|---|---|---|
| Accountants for landlords setting up a property SPV | segment_page | MISSING | `none` | spv accountant | 90 | yes |  | s21 s21.4 s21.A | 1 |
| SPV or personal name for a first buy-to-let purchase | decision | PARTIAL | `/blog/incorporation-and-company-structures/limited-company-vs-personal-ownership-tax-comparison-2026` | buy to let limited company or personal name |  | yes | rental-income-tax-calculator | s21 s21.4 s4 | later |
| How to set up a property investment company, step by step | decision | COVERED | `/blog/incorporation-and-company-structures/how-to-set-up-property-investment-company-uk-guide` | how to set up a property investment company | 40 | yes |  | s11 s21 | not_eligible |
| What an SPV costs to run in year one | number | COVERED | `/blog/incorporation-and-company-structures/property-company-running-costs-annual-budget` | property company running costs |  | yes | corporation-tax-calculator | s21.A | not_eligible |
| One SPV or several: structuring a growing portfolio | question | COVERED | `/blog/incorporation-and-company-structures/property-investment-company-structure-planning` | spv structure one company or multiple |  | yes |  | s21 s21.8 | not_eligible |
| Bringing an overseas co-director into a UK property SPV | question | MISSING | `none` | non resident director uk property company |  | yes |  | s11 s17 s21.1 | later |

### Landlord selling a buy-to-let or a former home

Covered 3, partial 3, missing 1.

| Need | Type | Status | Existing page | Target query | Demand/mo | Peer top 20 | Calculator | House positions | Wave |
|---|---|---|---|---|---:|---|---|---|---|
| Accountants for landlords selling a buy-to-let | segment_page | MISSING | `none` | cgt accountant property sale |  | yes | capital-gains-tax-calculator | s5 s5.B s39 | 1 |
| Sell now or keep: the CGT and income comparison for 2026/27 | decision | PARTIAL | `/blog/portfolio-management/when-to-sell-rental-property-key-indicators-landlords` | should i sell my buy to let | 40 | yes | cost-of-selling-calculator | s5 s4 s7 | later |
| Working out the CGT on a buy-to-let sale | number | COVERED | `/blog/capital-gains-tax/cgt-calculation-selling-buy-to-let-property-step-by-step` | capital gains tax on selling a rental property | 210 | yes | capital-gains-tax-calculator | s5 s5.B | not_eligible |
| Reporting and paying within 60 days of completion | question | COVERED | `/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026` | 60 day cgt return | 210 | yes |  | s5 | not_eligible |
| Private Residence Relief on a home you later let out | question | COVERED | `/blog/capital-gains-tax/ppr-relief-calculation-former-home-step-by-step` | private residence relief letting | 720 | yes |  | s5 | not_eligible |
| Selling in stages across tax years to use two annual exemptions | decision | PARTIAL | `/blog/capital-gains-tax/cgt-selling-multiple-properties-same-year` | selling multiple properties same tax year |  | yes | capital-gains-tax-calculator | s5 | later |
| What it costs to sell a rental property in 2026: fees, tax and net proceeds | proof | PARTIAL | `/cost-of-selling-a-property` | cost of selling a rental property |  | yes | cost-of-selling-calculator | s5 s5.B | later |

### Owner gifting property or a share of it to family

Covered 3, partial 1, missing 2.

| Need | Type | Status | Existing page | Target query | Demand/mo | Peer top 20 | Calculator | House positions | Wave |
|---|---|---|---|---|---:|---|---|---|---|
| Accountants for owners gifting property to family | segment_page | MISSING | `none` | gifting property to children tax advice |  | yes |  | s15 s15.3 s22.11 | 1 |
| Gifting a property to an adult child: the five routes compared | decision | COVERED | `/blog/capital-gains-tax/gifting-property-to-adult-children-decision-tree-cgt-iht-occupancy-mechanics` | gifting property to children tax |  | yes |  | s5 s15.2 s15.3 | not_eligible |
| Does the recipient pay SDLT on a gifted property with a mortgage | question | COVERED | `/blog/incorporation-and-company-structures/gifting-property-and-deed-of-gift-tax-implications` | sdlt on gifted property with mortgage |  | yes | stamp-duty-calculator | s1.P s1 | not_eligible |
| Gifting a share but keeping the rent: the s.102B(3) carve-out | question | COVERED | `/blog/capital-gains-tax/gift-with-reservation-of-benefit` | gift with reservation of benefit property |  | yes |  | s15.3 s22.11 | not_eligible |
| Assigning rental income to a partner by deed: does it work | question | MISSING | `none` | deed of assignment rental income partner |  | yes |  | s24 s24.6 s22.9 | later |
| Seven-year clock: what a gift of property costs if the donor dies early | number | PARTIAL | `/blog/landlord-tax-essentials/deed-of-variation-property-estate-redirecting-inheritance-iht-saving` | 7 year rule gifting property |  | yes |  | s15.1 s15.2 | later |

### Beneficiary or executor with an inherited property

Covered 2, partial 0, missing 3.

| Need | Type | Status | Existing page | Target query | Demand/mo | Peer top 20 | Calculator | House positions | Wave |
|---|---|---|---|---|---:|---|---|---|---|
| Accountants for executors and beneficiaries of an inherited property | segment_page | MISSING | `none` | probate property tax advice |  | yes |  | s39 s39.A s15 | 1 |
| Keep, let or sell an inherited property: the tax fork | decision | MISSING | `none` | inherited a rental property what to do |  | yes | capital-gains-tax-calculator | s39 s5 s15 | later |
| CGT on an inherited property: probate base cost and the 60-day clock | number | COVERED | `/blog/capital-gains-tax/cgt-on-inherited-property-uk-probate-base-cost` | capital gains tax on inherited property |  | yes | capital-gains-tax-calculator | s39 s5 | not_eligible |
| Inheriting an HMO or a portfolio: structuring the ownership | question | MISSING | `none` | inherited hmo tax structure |  | yes |  | s39 s15.4 s21 | later |
| SDLT when you already own an inherited share | question | COVERED | `/blog/property-types-and-specialist-tax/a-complete-guide-to-stamp-duty-relief-for-probate-properties` | sdlt inherited property share surcharge |  | yes | stamp-duty-calculator | s1.I s1 | not_eligible |

### Non-resident landlord letting or selling UK property from abroad

Covered 4, partial 1, missing 1.

| Need | Type | Status | Existing page | Target query | Demand/mo | Peer top 20 | Calculator | House positions | Wave |
|---|---|---|---|---|---:|---|---|---|---|
| Accountants for non-resident and overseas landlords | segment_page | PARTIAL | `/services/non-resident-landlord` | non resident landlord accountant |  | yes |  | s17 s17.4 s17.5 | 1 |
| Living abroad and letting a UK property: what you must file | decision | COVERED | `/blog/non-resident-landlord-tax/non-resident-landlord-scheme-uk-complete-guide` | non resident landlord scheme | 880 | yes |  | s17.5 s16.6 | not_eligible |
| Getting rent paid gross: the NRL approval application | number | COVERED | `/blog/non-resident-landlord-tax/nrl-approval-receive-rent-gross-hmrc-guide` | nrl approval receive rent gross |  | yes |  | s17.5 | not_eligible |
| Selling UK property while non-resident: NRCGT and the 60-day return | question | COVERED | `/blog/non-resident-landlord-tax/non-resident-cgt-selling-uk-property-overseas-guide` | selling uk property as a non resident | 10 | yes | capital-gains-tax-calculator | s17.4 s16.3 | not_eligible |
| Buying more UK property from overseas: the stacked surcharges | question | COVERED | `/blog/non-resident-landlord-tax/sdlt-non-resident-2-percent-surcharge` | non resident sdlt surcharge |  | yes | stamp-duty-calculator | s1.O s1.O.4 | not_eligible |
| Does MTD apply to an overseas landlord | question | MISSING | `none` | non resident landlord mtd |  | yes | mtd-checker | s19 s19.11 | later |

### First-time or accidental landlord letting a former home

Covered 2, partial 1, missing 2.

| Need | Type | Status | Existing page | Target query | Demand/mo | Peer top 20 | Calculator | House positions | Wave |
|---|---|---|---|---|---:|---|---|---|---|
| Accountants for first-time and accidental landlords | segment_page | MISSING | `none` | accountant for first time landlord |  | yes |  | s4 s5 s19 | 1 |
| Let your old home or sell it: the two-year comparison | decision | PARTIAL | `/blog/landlord-tax-essentials/accidental-landlord-taxes-a-complete-guide` | renting out my house instead of selling |  | yes | rental-income-tax-calculator | s4 s5 s1 | later |
| Let to buy: how the two-loan move is taxed | question | COVERED | `/blog/property-finance/let-to-buy-mortgages` | let to buy | 720 | yes | stamp-duty-calculator | s1 s4 | not_eligible |
| Consent to let and the tax that follows | question | MISSING | `none` | consent to let tax implications |  | yes |  | s4 s5 | later |
| Your first self assessment as a landlord: what you will owe | number | COVERED | `/blog/landlord-tax-essentials/first-time-landlord-tax-guide-everything-you-need-to-know` | first time landlord tax |  | yes | rental-income-tax-calculator | s4 s41 | not_eligible |

### Couple restructuring how a jointly owned property is taxed

Covered 3, partial 1, missing 1.

| Need | Type | Status | Existing page | Target query | Demand/mo | Peer top 20 | Calculator | House positions | Wave |
|---|---|---|---|---|---:|---|---|---|---|
| Accountants for couples splitting rental income between them | segment_page | MISSING | `none` | form 17 declaration of trust accountant |  | yes |  | s24 s24.2 s24.3 | 1 |
| Shifting rental income to the lower earner: Form 17 and a declaration of trust | decision | COVERED | `/blog/landlord-tax-essentials/form-17-declaration-beneficial-interest-property-mechanics-filing-revocation` | form 17 hmrc | 1300 | yes |  | s24.1 s24.2 s24.3 | not_eligible |
| Adding a spouse to the deeds: CGT and the SDLT trap | question | COVERED | `/blog/capital-gains-tax/cgt-property-transfer-spouse` | adding spouse to property deeds tax |  | yes | stamp-duty-calculator | s24.4 s1 | not_eligible |
| Splitting income between unmarried co-owners | question | COVERED | `/blog/landlord-tax-essentials/unmarried-co-owners-property-tax-rental-income-split-actual-beneficial-share` | unmarried couple rental income split |  | yes |  | s24.6 | not_eligible |
| Putting shares or property in a child's name: the settlements rules | question | PARTIAL | `/blog/incorporation-and-company-structures/gifting-property-to-minor-children-bare-trust-mechanics-tax-traps` | property in child name settlements legislation |  | yes |  | s24.7 s22.9 s22.10 | later |

### Landlord with undeclared rental income facing HMRC

Covered 2, partial 1, missing 1.

| Need | Type | Status | Existing page | Target query | Demand/mo | Peer top 20 | Calculator | House positions | Wave |
|---|---|---|---|---|---:|---|---|---|---|
| Accountants for landlords making an HMRC rental income disclosure | segment_page | MISSING | `none` | let property campaign accountant | 30 | yes |  | s27 s27.6 s27.2 | 1 |
| Let Property Campaign or wait for the letter | decision | COVERED | `/blog/landlord-tax-essentials/benefits-of-participating-in-the-let-property-campaign` | let property campaign | 1900 | yes |  | s27.6 s27.2 | not_eligible |
| What a disclosure costs: tax, interest and the penalty bands | number | PARTIAL | `/blog/landlord-tax-essentials/let-property-campaign-disclosure-mechanics-undeclared-rental-income-2026` | let property campaign penalties |  | yes |  | s27.2 s27.3 | later |
| How many years back HMRC can go | question | COVERED | `/blog/landlord-tax-essentials/hmrc-discovery-assessment-tma-1970-section-29-time-limits-landlords` | how far back can hmrc go rental income |  | yes |  | s27.1 | not_eligible |

### Landlord who needs someone to file: MTD and self assessment

Covered 3, partial 1, missing 1.

| Need | Type | Status | Existing page | Target query | Demand/mo | Peer top 20 | Calculator | House positions | Wave |
|---|---|---|---|---|---:|---|---|---|---|
| Accountants filing landlord self assessment and MTD quarterly updates | segment_page | MISSING | `none` | landlord self assessment service |  | yes | mtd-checker | s19 s19.1 s3 | 1 |
| Do I have to join MTD, and when | decision | COVERED | `/blog/making-tax-digital-mtd/making-tax-digital-property-income-2026-complete-guide` | making tax digital for landlords | 2400 | yes | mtd-checker | s3 s19.1 s19.2 | not_eligible |
| What MTD will cost a landlord in software and time | number | PARTIAL | `/blog/making-tax-digital-mtd/best-mtd-software-landlords-2026` | mtd software for landlords cost |  | yes |  | s19.6 | later |
| Can I keep using a spreadsheet under MTD | question | COVERED | `/blog/making-tax-digital-mtd/mtd-itsa-spreadsheets-with-bridging-software-allowed-mechanics` | mtd spreadsheet bridging software |  | yes |  | s19.14 | not_eligible |
| Jointly owned property under MTD | question | COVERED | `/blog/making-tax-digital-mtd/mtd-made-simple-for-landlords-with-jointly-owned-properties` | mtd jointly owned property |  | yes |  | s19.4 | not_eligible |

### Owner extracting profit from an existing property company

Covered 4, partial 0, missing 1.

| Need | Type | Status | Existing page | Target query | Demand/mo | Peer top 20 | Calculator | House positions | Wave |
|---|---|---|---|---|---:|---|---|---|---|
| Accountants for property company directors taking money out | segment_page | MISSING | `none` | property company accountant profit extraction |  | yes | property-company-extraction-calculator | s21.1 s21.4 s21.9 | 1 |
| Salary, dividend or director's loan: the extraction order for 2026/27 | decision | COVERED | `/blog/incorporation-and-company-structures/extracting-cash-from-property-spv-extraction-sequence-pillar-2026-27` | property company profit extraction |  | yes | property-company-extraction-calculator | s21.1 s21.4 s21.9 | not_eligible |
| Dividend tax on property company profits at the 2026/27 rates | number | COVERED | `/blog/incorporation-and-company-structures/property-company-dividend-tax` | property company dividend tax |  | yes | dividend-tax-calculator | s21.9 s21.4 | not_eligible |
| Repaying a director's loan without a s.455 charge | question | COVERED | `/blog/incorporation-and-company-structures/btl-spv-directors-loan-repayment-strategy-tax-efficient-extraction` | director loan account property company |  | yes |  | s21.1 | not_eligible |
| Closing a property company: strike-off, distribution or MVL | decision | COVERED | `/blog/incorporation-and-company-structures/how-to-close-a-property-limited-company` | closing a property company tax |  | yes |  | s42 s21.A | not_eligible |

### Holiday let, Airbnb and serviced accommodation operator

Covered 2, partial 1, missing 2.

| Need | Type | Status | Existing page | Target query | Demand/mo | Peer top 20 | Calculator | House positions | Wave |
|---|---|---|---|---|---:|---|---|---|---|
| Accountants for holiday let and serviced accommodation operators | segment_page | MISSING | `none` | holiday let accountant | 10 | yes |  | s6 s5.A s29 | 1 |
| Life after the FHL rules: how a holiday let is taxed now | decision | COVERED | `/blog/property-types-and-specialist-tax/abolition-of-furnished-holiday-lettings-fhl-what-individual-owners-needs-to-know` | holiday let tax rules | 90 | yes |  | s6 s5.A | not_eligible |
| When a holiday let business must register for VAT | question | PARTIAL | `/blog/property-types-and-specialist-tax/vat-on-furnished-holiday-lettings-fhl` | holiday let vat threshold |  | yes |  | s29.8 s29.2 | later |
| Rent to serviced accommodation: how the R2SA model is taxed | question | MISSING | `none` | rent to serviced accommodation tax |  | yes |  | s28 s29.2 s6 | later |
| Airbnb income: what you will actually pay | number | COVERED | `/blog/property-types-and-specialist-tax/airbnb-tax-uk-short-term-rental-income-taxed` | airbnb tax uk | 140 | yes | rental-income-tax-calculator | s6 s41 | not_eligible |

### HMO, student and commercial landlord

Covered 3, partial 0, missing 2.

| Need | Type | Status | Existing page | Target query | Demand/mo | Peer top 20 | Calculator | House positions | Wave |
|---|---|---|---|---|---:|---|---|---|---|
| Accountants for HMO and multi-let landlords | segment_page | MISSING | `none` | hmo accountant |  | yes |  | s26.9 s25 s30.5 | 1 |
| Council tax or business rates on an HMO | question | COVERED | `/blog/landlord-tax-essentials/property-business-rates-council-tax-landlords` | hmo council tax or business rates |  | yes |  | s30.4 s30.5 | not_eligible |
| Capital allowances in HMO common parts | number | COVERED | `/blog/property-types-and-specialist-tax/hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property` | hmo capital allowances |  | yes | capital-allowances-calculator | s25.2 s38 | not_eligible |
| Accountants for commercial property investors | segment_page | MISSING | `none` | commercial property accountant uk |  | yes |  | s25.11 s29.3 s1 | later |
| Buying a commercial property: the s.198 fixtures election | question | COVERED | `/blog/property-types-and-specialist-tax/commercial-property-fixtures-claim-s198-election-purchase-mechanics` | section 198 election fixtures |  | yes |  | s25.11 | not_eligible |

### Developer or flipper structuring a project

Covered 1, partial 1, missing 1.

| Need | Type | Status | Existing page | Target query | Demand/mo | Peer top 20 | Calculator | House positions | Wave |
|---|---|---|---|---|---:|---|---|---|---|
| Accountants for property developers and flippers | segment_page | MISSING | `none` | property developer accountant |  | yes |  | s28 s28.2 s28.7 | later |
| Investor or developer: the line that decides your tax | decision | COVERED | `/blog/property-types-and-specialist-tax/are-you-a-property-investor-or-developer` | property flipping tax | 10 | yes | corporation-tax-calculator | s28.5 s28.6 | not_eligible |
| Converting a house into flats: SDLT, VAT and CGT | question | PARTIAL | `/blog/property-types-and-specialist-tax/vat-commercial-to-residential-conversion-5-percent-reduced-rate-developer-recovery-mechanics` | converting house into flats tax |  | yes |  | s29.7 s29.13 s1.J | later |

### Separating couple dividing property

Covered 1, partial 0, missing 1.

| Need | Type | Status | Existing page | Target query | Demand/mo | Peer top 20 | Calculator | House positions | Wave |
|---|---|---|---|---|---:|---|---|---|---|
| Accountants for separating couples with rental property | segment_page | MISSING | `none` | divorce property tax advice |  | yes |  | s1.D s5 | later |
| Dividing rental property on divorce: the statutory window | decision | COVERED | `/blog/capital-gains-tax/cgt-divorce-property-transfer-tax-implications` | divorce and buy to let property | 10 | yes |  | s1.D s5 | not_eligible |

### Older landlord planning retirement or succession

Covered 1, partial 1, missing 2.

| Need | Type | Status | Existing page | Target query | Demand/mo | Peer top 20 | Calculator | House positions | Wave |
|---|---|---|---|---|---:|---|---|---|---|
| Accountants for landlords planning retirement and succession | segment_page | MISSING | `none` | landlord succession planning accountant |  | yes |  | s22 s22.6 s15.4 | 1 |
| Winding down a portfolio in retirement: sell, gift or hold to death | decision | MISSING | `none` | property portfolio exit strategy retirement |  | yes | capital-gains-tax-calculator | s5 s15.2 s39 | later |
| A family investment company for the next generation | question | COVERED | `/blog/incorporation-and-company-structures/family-investment-company-property-worth-it` | family investment company property |  | yes |  | s21.5 s22.6 s22.13 | not_eligible |
| Inheritance tax on a rental portfolio after the April 2026 cap | number | PARTIAL | `/blog/landlord-tax-essentials/business-property-relief-rental-property-iht` | inheritance tax on rental property | 20 | yes | bpr-apr-allowance-calculator | s15.1 s15.4 s22.1 | later |

### Landlord searching for an accountant in their own city

Covered 5, partial 7, missing 0.

| Need | Type | Status | Existing page | Target query | Demand/mo | Peer top 20 | Calculator | House positions | Wave |
|---|---|---|---|---|---:|---|---|---|---|
| Property accountant in London | segment_page | COVERED | `/locations/london` | property accountant london | 50 | yes |  | s1 s4 s5 | later |
| Property accountant in Manchester | segment_page | COVERED | `/locations/manchester` | property accountant manchester | 30 | yes |  | s1 s4 s5 | later |
| Property accountant in Birmingham | segment_page | COVERED | `/locations/birmingham` | property accountant birmingham | 20 | yes |  | s1 s4 s5 | later |
| Property accountant in Leeds | segment_page | COVERED | `/locations/leeds` | property accountant leeds |  | yes |  | s1 s4 s5 | later |
| Property accountant in Bristol | segment_page | COVERED | `/locations/bristol` | property accountant bristol | 10 | yes |  | s1 s4 s5 | later |
| Property accountant in Nottingham | segment_page | PARTIAL | `/blog/property-accountant-services/property-accountant-nottingham-landlords` | property accountant nottingham | 10 | yes |  | s1 s4 s5 | later |
| Property accountant in Glasgow | segment_page | PARTIAL | `/blog/property-accountant-services/property-accountant-glasgow` | property accountant glasgow | 10 | yes |  | s1 s4 s5 | later |
| Property accountant in Edinburgh | segment_page | PARTIAL | `/blog/property-accountant-services/property-accountant-edinburgh-landlord-tax-services` | property accountant edinburgh | 10 | yes |  | s1 s4 s5 | later |
| Property accountant in Sheffield | segment_page | PARTIAL | `/blog/property-accountant-services/why-sheffield-landlords-need-property-accountant` | property accountant sheffield | 10 | yes |  | s1 s4 s5 | later |
| Property accountant in Liverpool | segment_page | PARTIAL | `/blog/property-accountant-services/liverpool-property-accountant-tax-services-landlords` | property accountant liverpool |  | yes |  | s1 s4 s5 | later |
| Property accountant in Newcastle | segment_page | PARTIAL | `/blog/property-accountant-services/newcastle-property-accountant-landlord-tax-services` | property accountant newcastle |  | yes |  | s1 s4 s5 | later |
| Property accountant in Cardiff | segment_page | PARTIAL | `/blog/property-accountant-services/why-cardiff-landlords-need-specialist-property-accountant-2026` | property accountant cardiff |  | yes |  | s1 s4 s5 | later |

