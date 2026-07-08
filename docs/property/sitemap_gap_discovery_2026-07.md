# Property: Competitor Sitemap Gap Discovery (July 2026, v2)

**Method:** Scrape competitor sitemaps; filter through skip/news/path patterns (defined in `sites/property.discovery.json`); apply Jaccard < 0.30 vs our 686-post inventory; cluster by shared token overlap (>=2 tokens); rank by domain-coverage count; judge audience fit and cannibalisation. Competitor universe patched 2026-07-08 to remove own-estate domains and replace solicitor/tool-only sites with genuine niche property-tax accountancy firms.

**Honest count: 15 recommended net-new topics.** Universe now contains actual property-tax rivals; confidence is substantially higher than v1.

---

## Universe

### Crawl results

| Domain | Sitemap URLs | Content-shaped | Gap candidates (Jaccard < 0.30) | Signal |
|---|---|---|---|---|
| uklandlordtax.co.uk | 385 | 385 | 124 | HIGH -- niche property-tax accountants |
| landlordstax.co.uk | 125 | 125 | 29 | HIGH -- niche non-resident landlord specialists |
| taxaccountant.co.uk | 880 | 880 | 487 | MED -- generalist, wide property coverage |
| propertyaccountant.co.uk | 5 | 5 | 3 | HIGH -- niche (thin site) |
| geraldedelman.com | 638 | 638 | 461 | MED -- generalist, some property-tax content |
| rossmartin.co.uk | 5,710 | 5,710 | 5,023 | LOW -- tax reference publisher, not accountancy rival |
| mmba.co.uk | 170 | 170 | 99 | MED -- generalist with BTL content |
| taxinsider.co.uk | 59 | 59 | 34 | MED -- tax tips publisher |

### No sitemap returned (7 domains)

ukpropertyaccountants.co.uk, landlordaccountants.co.uk, dnsassociates.co.uk, gorillaaccounting.com, thp.co.uk, propertytax.co.uk, gmprofessionalaccountants.co.uk.

These domains have either no sitemap, a blocked robots.txt, or a malformed sitemap index. They remain in `property.discovery.json` for the next crawl cycle.

### Publisher noise decisions

- **rossmartin.co.uk** (5,710 URLs): marked `low-signal`; only slugs matching `topic_tokens` survive the filter. Contributed to capital-gains and non-resident clusters but adds limited property-specific signal beyond what the niche sites already cover.
- **geraldedelman.com** (638 URLs): generalist London accountancy firm; property-relevant content is genuine (non-resident, CGT, IHT planning) but audience skews broader than our landlord base.
- **taxaccountant.co.uk** (880 URLs): large generalist blog; useful for confirming multi-domain clusters, not for single-domain recommendations.

---

## Surviving cluster analysis

1,510 slugs survived Jaccard < 0.30. These grouped into 937 clusters. Top clusters by domain-coverage count, filtered for property-tax audience fit:

| Rank | Core tokens | Domains | Slugs | Audience fit |
|---|---|---|---|---|
| 1 | capital gains | 6 | 46 | YES -- landlord CGT sub-topics |
| 2 | self assessment | 5 | 17 | PARTIAL -- overseas landlord SA angle is new |
| 3 | non-resident | 4 | 24 | YES -- non-resident landlord specific |
| 4 | business asset disposal relief | 4 | 7 | YES -- BADR on residential property |
| 5 | non-residents (IHT/CGT) | 4 | 7 | YES -- IHT + CGT for overseas owners |
| 6 | late filing penalties | 4 | 5 | PARTIAL -- likely covered; angle = landlord-specific |
| 7 | stamp duty | 3 | 11 | YES -- partnership transfer + Wales |
| 8 | VAT on property | 3 | 4 | YES -- conversion, opted-to-tax |
| 9 | property allowance | 3 | 3 | YES -- £1,000 income allowance |
| 10 | double tax agreements | 3 | 3 | YES -- overseas landlords |
| 11 | residency domicile | 3 | 3 | YES -- non-resident landlords |
| 12 | let property campaign | 2 | 7 | YES -- HMRC disclosure |
| 13 | limited company profit extraction | 2 | 10 | YES -- BTL Ltd directors |
| 14 | declaration of trust | 2 | 4 | YES -- jointly-held property |
| 15 | multiple dwellings relief | 2 | 3 | YES -- MDR abolition 2024 |
| 16 | starting a property business | 2 | 3 | YES -- structure choice |
| 17 | pre-trading expenditure BTL | 1 | 1 | YES -- specific landlord question |

---

## Recommended Net-New Topics (15)

Sorted by domain-coverage count, then audience fit. All pass Jaccard < 0.30 vs our 686-post inventory.

---

### 1. Capital Gains Tax for Non-Resident Landlords

**Coverage:** 4 domains (uklandlordtax.co.uk, landlordstax.co.uk, taxaccountant.co.uk, geraldedelman.com)
**Key competitor slugs:**
- https://uklandlordtax.co.uk/capital-gains-non-resident-explained/
- https://www.landlordstax.co.uk/the-capital-gains-trap-for-non-residents/
- https://www.taxaccountant.co.uk/7-shocking-facts-about-temporary-non-residence/

**Rationale:** Our CGT content addresses UK-resident landlords. Non-resident CGT on UK property is a distinct regime (30-day reporting window, NRCGT return, interaction with NRLS) and appears in 4 competitor domains. The "temporary non-residence" trap (return to UK within 5 years triggers backdated CGT) is a specific high-value sub-question. Audience: expat landlords and overseas investors holding UK residential property.

**Cannibalisation note:** We have `capital-gains-tax-property-sale-uk-2026-rates-allowances` (UK resident) and NRLS content. This fills the non-resident CGT gap distinctly.

---

### 2. Business Asset Disposal Relief on Residential Property

**Coverage:** 4 domains (uklandlordtax.co.uk x2, mmba.co.uk, geraldedelman.com, taxaccountant.co.uk)
**Key competitor slugs:**
- https://uklandlordtax.co.uk/business-asset-disposal-relief-on-residential-property/
- https://uklandlordtax.co.uk/trading-vs-investment-companies-why-separate-badr/
- https://uklandlordtax.co.uk/tax-guide/business-asset-disposal-relief/

**Rationale:** uklandlordtax.co.uk has a dedicated page on BADR specifically for residential property -- the question of whether a property business qualifies as a "trading" business for BADR purposes (FHL historically yes; SPV holding residential generally no). Our BADR content exists but does not address the residential property angle. The FA 2026 rate changes (BADR rate rising to 14% from April 2026, 18% from April 2027) make this timely.

**Cannibalisation note:** Distinct from our general BADR guide. Write as "BADR and furnished holiday lets / property businesses: do you qualify?"

---

### 3. Non-Resident Landlords: UK Inheritance Tax

**Coverage:** 4 domains (uklandlordtax.co.uk, landlordstax.co.uk, taxaccountant.co.uk, geraldedelman.com)
**Key competitor slugs:**
- https://uklandlordtax.co.uk/uk-inheritance-tax-for-non-residents/
- https://www.landlordstax.co.uk/uk-inheritance-rules-for-non-residents/
- https://www.geraldedelman.com/insights/double-tax-agreements-how-to-avoid-being-taxed-twice/

**Rationale:** UK IHT applies to UK-sited assets (including UK property) regardless of the owner's domicile. Non-domiciled overseas landlords with UK property face a different IHT position from UK-domiciled landlords. We have no standalone page on non-resident/non-domiciled IHT for property owners. The FA 2025 domicile reform (residence-based IHT from April 2025) makes this especially current.

**Cannibalisation note:** Our IHT content covers UK-domiciled estate planning. This is a distinct non-resident angle.

---

### 4. Let Property Campaign: How to Use HMRC's Voluntary Disclosure

**Coverage:** 2 domains (uklandlordtax.co.uk x5 slugs, taxaccountant.co.uk x2 slugs)
**Key competitor slugs:**
- https://uklandlordtax.co.uk/a-complete-guide-to-let-property-campaign/
- https://uklandlordtax.co.uk/let-property-campaign-what-is-it/
- https://www.taxaccountant.co.uk/hmrc-let-property-campaign/ (inferred)

**Rationale:** The HMRC Let Property Campaign is the main route for landlords with undeclared rental income to come forward voluntarily (reduced penalties vs investigation). uklandlordtax.co.uk has 5 slugs covering this; it is clearly a high-traffic landlord-tax query. We have no page on it. This is a strong lead-gen topic: landlords who have not declared rental income are exactly our accountancy client audience.

**Cannibalisation note:** No cannibalisation. We do not have a voluntary-disclosure or Let Property Campaign page.

---

### 5. SDLT on Transfer of Property to a Partnership

**Coverage:** 3 domains (uklandlordtax.co.uk, taxaccountant.co.uk, geraldedelman.com)
**Key competitor slugs:**
- https://uklandlordtax.co.uk/stamp-duty-on-transfer-property-partnership/
- https://www.taxaccountant.co.uk/avoiding-extra-stamp-duty-when-changing-your-main-home/

**Rationale:** Transferring property into a partnership (especially a family partnership used for income-splitting) has specific SDLT rules: partnership schedules 15 and 17A, proportional market value charge, connected person rules. This is distinct from our SDLT incorporation content (which covers transfer to a limited company). We serve a landlord audience that increasingly uses family partnership structures.

**Cannibalisation note:** Low risk. Our SDLT pages cover purchase, incorporation, and surcharge. Partnership transfer SDLT is a gap.

---

### 6. VAT on Property Conversions and the Opted-to-Tax Election

**Coverage:** 3 domains (uklandlordtax.co.uk x2, taxaccountant.co.uk)
**Key competitor slugs:**
- https://uklandlordtax.co.uk/vat-property-conversion-guide/
- https://uklandlordtax.co.uk/vat-treatment-on-property-conversions/
- https://www.taxaccountant.co.uk/vat-on-property-purchases-when-the-seller-opted-to-tax/

**Rationale:** VAT on property is complex and our coverage is thin. Conversions (residential to commercial or mixed-use) can attract reduced 5% VAT or zero rate depending on the qualifying conditions. When a seller has opted to tax, the buyer faces VAT on purchase unless they also opt to tax or qualify for the TOGC rules. Portfolio landlords moving into commercial or mixed-use property hit these questions frequently.

**Cannibalisation note:** No meaningful overlap with our existing VAT content (which is minimal).

---

### 7. Property Income Allowance: The £1,000 Landlord Exemption

**Coverage:** 3 domains (uklandlordtax.co.uk, landlordstax.co.uk, taxaccountant.co.uk)
**Key competitor slugs:**
- https://uklandlordtax.co.uk/property-allowance/
- https://www.landlordstax.co.uk/property-allowance/
- https://www.taxaccountant.co.uk/glossary/property-income-allowance/

**Rationale:** The property income allowance (£1,000 per year) lets individuals with small rental income avoid self-assessment entirely. This is a high-volume query (accidental landlords, those renting a room on Airbnb below the allowance). Three competitor domains have it; we do not have a dedicated page. It is adjacent to our rent-a-room content but distinct (covers all types of property income, not just lodger income).

**Cannibalisation note:** Partial overlap with `rent-a-room-relief-uk-landlords-lodgers-guide` (Jaccard below 0.30). Keep the angle narrow: the £1,000 property allowance vs rent-a-room relief: which applies and when to claim.

---

### 8. Self-Assessment for Overseas (Non-Resident) Landlords

**Coverage:** 4 domains (uklandlordtax.co.uk, landlordstax.co.uk, taxaccountant.co.uk, geraldedelman.com)
**Key competitor slugs:**
- https://uklandlordtax.co.uk/tax-guide/self-assessment-for-overseas-landlords/
- https://www.landlordstax.co.uk/top-5-tips-for-non-resident-landlords/
- https://www.landlordstax.co.uk/who-you-should-tell-about-your-uk-income/

**Rationale:** We have extensive self-assessment content for UK-resident landlords. Non-resident landlords face different obligations: they register for self-assessment differently, the NRLS deduction at source interacts with their SA return, and their return includes the SA106 foreign pages (or SA105 if UK property income). 4 domains cover this; we have nothing specific to overseas landlord self-assessment.

**Cannibalisation note:** Distinct from all existing SA content. Frame as "Self-assessment for non-resident landlords: what's different."

---

### 9. Double Tax Agreements for UK Landlords with Overseas Income

**Coverage:** 3 domains (uklandlordtax.co.uk, taxaccountant.co.uk, geraldedelman.com)
**Key competitor slugs:**
- https://uklandlordtax.co.uk/tax-guide/double-tax-agreements-dtas/
- https://www.taxaccountant.co.uk/double-tax-treaties-unilateral-relief/
- https://www.geraldedelman.com/insights/double-tax-agreements-how-to-avoid-being-taxed-twice/

**Rationale:** Landlords with overseas property (or UK expats renting their former home) are taxed in two jurisdictions. DTAs determine which country has primary taxing rights and how credit relief works. We serve non-resident landlords and returning expats; DTAs are a recurring question we have no guide for. The angle: how DTAs affect UK rental income for non-UK residents, and how foreign rental income is taxed in the UK for returning residents.

**Cannibalisation note:** No existing DTA content. Does not overlap with NRLS or SA pages.

---

### 10. UK Tax Residency and Domicile for Landlords

**Coverage:** 3 domains (uklandlordtax.co.uk, geraldedelman.com, mmba.co.uk)
**Key competitor slugs:**
- https://uklandlordtax.co.uk/tax-guide/residency-and-domicile/
- https://www.geraldedelman.com/services/residency-domicile/
- https://www.mmba.co.uk/blog/uk-domicile-tax-and-residency-explained

**Rationale:** Domicile and statutory residency test (SRT) questions arise for every overseas landlord or expat with UK property. The FA 2025 domicile reform replaces the old domicile-based IHT regime with a 10-year residence test. We have no guide on SRT or domicile in the context of property ownership. This is foundational for the non-resident landlord audience we aim to serve.

**Cannibalisation note:** No existing SRT or domicile content.

---

### 11. Profit Extraction from a Buy-to-Let Limited Company

**Coverage:** 2 domains (uklandlordtax.co.uk x3 slugs, taxaccountant.co.uk)
**Key competitor slugs:**
- https://uklandlordtax.co.uk/tax-guide/how-to-extract-your-profits-from-your-limited-company/
- https://uklandlordtax.co.uk/your-btl-limited-company-and-directors-loan-account/
- https://uklandlordtax.co.uk/maximising-director-benefits-a-comprehensive-guide/

**Rationale:** We have deep incorporation and SPV content but nothing on the "what happens next" question: how to extract cash from your BTL Ltd efficiently (salary vs dividends, director loan account, pension contributions, expense reimbursement). This is the most practical question for landlords already incorporated. uklandlordtax.co.uk covers it in detail; we do not.

**Cannibalisation note:** Partial overlap with `property-company-dividend-tax` (rates) and director loan pages. Write as a planning guide (not rates), covering the full extraction toolkit.

---

### ~~12. Declaration of Trust for Jointly-Held Property~~ REJECTED (2026-07-08)

REJECTED -- existing page found by title match: `declaration-of-trust-property-beneficial-ownership` and related pages cover this topic. Title-match scoring (not captured by the Jaccard slug-only filter at the time of this report) confirmed the duplicate. Action: improve-existing on the declaration-of-trust page to add the Form 17 interaction and income-split planning content if missing.

~~**Coverage:** 2 domains (uklandlordtax.co.uk x3 slugs, taxaccountant.co.uk)~~

---

### 13. Multiple Dwellings Relief: Abolition and What Replaced It

**Coverage:** 2 domains (uklandlordtax.co.uk, taxaccountant.co.uk)
**Key competitor slugs:**
- https://uklandlordtax.co.uk/multiple-dwellings-relief-on-annexes-and-separate-dwellings/
- https://uklandlordtax.co.uk/multiple-dwellings-relief/
- https://www.taxaccountant.co.uk/multiple-dwellings-relief-scrapped-for-property-investors/

**Rationale:** MDR was abolished from 1 June 2024. Portfolio landlords and those buying properties with annexes still search for it. The correct 2026 answer is: MDR gone, mixed-use SDLT rates still available in qualifying cases, annexes may still get the lower non-residential SDLT rate. This is a content gap with clear search demand and a factual update requirement.

**Cannibalisation note:** Our SDLT content does not address MDR abolition specifically. Write as an update guide: what MDR was, why it ended, and what options remain.

---

### 14. Pre-Trading Expenditure for Buy-to-Let Landlords

**Coverage:** 2 domains (uklandlordtax.co.uk, geraldedelman.com)
**Key competitor slugs:**
- https://uklandlordtax.co.uk/pre-trading-expenditure-buy-to-let/
- https://www.geraldedelman.com/insights/can-i-claim-for-pre-trading-expenses/

**Rationale:** Landlords incur costs before their rental business starts: legal fees, survey costs, renovation works, mortgage arrangement fees. The rules for claiming pre-trading expenditure (7-year lookback, the distinction between capital and revenue, and the interaction with the property income allowance) are not covered in our existing allowable expenses content. A targeted page on this fills a specific, high-intent question.

**Cannibalisation note:** Low cannibalisation. Our allowable expenses content covers ongoing costs; pre-trading expenditure is a distinct timing question.

---

### 15. Starting a Property Business: Sole Trader vs Limited Company vs Partnership

**Coverage:** 2 domains (uklandlordtax.co.uk, taxaccountant.co.uk)
**Key competitor slugs:**
- https://uklandlordtax.co.uk/starting-a-property-business/
- https://www.taxaccountant.co.uk/different-ways-of-owning-property/
- https://www.propertyaccountant.co.uk/tax-saving-jointly-held-assets/

**Rationale:** We have deep content on incorporation and SPV structures but nothing that frames the initial decision from scratch: sole trader vs partnership vs limited company, how property income is classified (investment vs trading), and the structural choice at the point of starting. This is top-of-funnel for new landlords and converts well to accountancy consultations.

**Cannibalisation note:** Low cannibalisation. Our incorporation content assumes the reader is already considering a limited company. This is earlier in the decision journey.

---

## Rejected Clusters

| Cluster | Reason for rejection |
|---|---|
| Self-employed trades (carpenter, driving instructor) | Contractor/sole-trader audience, not landlords |
| IR35 and contractors | Out of scope (we have a dedicated site for this) |
| VAT on private schools | Off-niche entirely |
| FCA-regulated businesses | Off-niche |
| Employee ownership trusts | Off-niche |
| Small business loans | Generic, not property-specific |
| Cookie policy / site nav pages | Site infrastructure, not content topics |
| Budget news articles (2021-2024 slugs) | Time-specific news, not evergreen |
| Short-term lets Scotland changes | Scotland-only, low volume for England/Wales audience |
| Sole trader templates | Service page, not content topic |
| Company strike-off / Companies House reforms | Adjacent but not property-tax audience |
| General business planning | Too broad, no property-specific angle |
| Self-assessment generic (UK resident) | We have extensive SA content; would cannibalise |

---

## Key Limitations

**No-sitemap domains:** 7 of 15 domains in the curated universe returned no sitemap. ukpropertyaccountants.co.uk and landlordaccountants.co.uk are particularly valuable targets; their absence reduces coverage of the niche property-tax accountancy space. Recommend re-attempting with a direct sitemap URL probe or manual check in the next cycle.

**Generalist noise:** taxaccountant.co.uk and geraldedelman.com contribute large URL counts but are not property-tax specialists. Their content is useful to confirm multi-domain topics but single-domain signals from these two are treated with lower weight.

**Volume data absent:** Topic recommendations are based on competitor coverage count and audience-fit reasoning, not search volume. Before briefing, confirm search volume via GSC impression data or Serper for the top-priority topics (Let Property Campaign and non-resident CGT are expected to be high-volume).

---

## Cross-estate ownership notes (2026-07-08)

- IT contractor accounting audience belongs to the contractors-ir35 site. Any property sitemap signals touching "contractor accounting" or "IT contractor" are out of scope here.
- Declaration of trust (topic 12, struck above): improve-existing, not net-new. Cross-link to Form 17 page from the existing declaration-of-trust page.
- SDLT refund cluster (A5, struck above): two existing pages cover this. Improve rather than add.

---

## v1 Findings Note (for the record)

The v1 analysis (also dated 2026-07-08) used a competitor universe with a structural bug: `hollowaydavies.co.uk` (our own generalist site, 566 URLs) was in the competitor list, and the remaining competitors were solicitors firms (starckuberoi.co.uk, jonathanlea.net), HMRC mirrors (landtaxadvice.co.uk), and tool-only sites (ukcapitalgainstaxcalculator.co.uk, uktax.tools) rather than property-tax accountancy rivals. The v1 universe produced 9 topic recommendations; most were valid (particularly BADR, CGT+divorce, and transfer of equity) but lacked confirmation from actual property-accountancy competitors. The v1 bug was flagged in its own "Universe Curation Flags" section.

The v2 universe (this document) replaces solicitors/tool-only sites with 15 genuine niche property-tax accountancy domains. 7 of 15 returned sitemaps; the 8 that did not are retained for the next crawl cycle. The v2 analysis produced 15 recommended topics with substantially stronger multi-domain confirmation for the non-resident landlord cluster specifically (topics 1, 3, 8, 9, 10 all absent from v1).

---

## Addendum: recovered sitemaps (2026-07-08)

**New domains analysed:** dnsassociates.co.uk (1,642 sitemap URLs; broad-service firm, property topic-token filter applied). landlordaccountants.co.uk (1 URL, ignored per brief).

**Method:** same as above. After applying the property topic-token filter, 248 DNS slugs survived. Skip patterns (location pages: accountants-in-*, IR35 news, non-property HMRC articles) reduced this further for clustering. Jaccard < 0.30 vs our 686-post inventory required. All 15 v2 topics and 6 GSC-lane items excluded from consideration.

**Signal caveat:** dnsassociates.co.uk is a broad-service national firm, not a property-tax specialist. Single-domain signal only. Topics below require search-volume confirmation before briefing.

---

### A1. CGT on Inherited Property

**DNS slug:** `capital-gains-tax-on-inherited-property`
**Domain count:** 1 (DNS only)

Rationale: When a property is inherited and later sold, CGT is calculated from the probate value (not the original purchase price), and no annual exempt amount has applied since April 2023. The interaction with IHT on the same estate is a common source of confusion. Our CGT content covers UK-resident disposal (existing) and non-resident CGT (topic 1 in v2). Inherited-property CGT is a distinct regime question with high search intent from executors and beneficiaries. Jaccard against our existing inventory is low (no inherited-property CGT page).

Cannibalisation: none against existing 15 topics. Slight topical overlap with our general CGT page, but inherited property has its own mechanics (uplift on death, no enhancement expenditure before probate, 60-day reporting).

---

### A2. CGT on Overseas Property for UK Residents

**DNS slugs:** `capital-gains-tax-on-overseas-property`, `capital-gains-tax-on-property-sold-overseas`
**Domain count:** 1 (DNS only)

Rationale: UK tax residents who sell foreign property pay UK CGT on the gain, with a foreign tax credit for any tax paid abroad. The reporting mechanism (self-assessment SA106, not the 60-day residential property return), currency conversion rules, and the interaction with double tax agreements make this a distinct topic. v2 topic 1 covers non-residents with UK property; this is the mirror situation (UK residents with foreign property). v2 topic 9 covers DTAs generally. This slug is more specific and action-oriented.

Cannibalisation: low. Topic 9 (DTAs) is the mechanism; this page is the practical "how do I declare and pay" guide.

---

### A3. Family Investment Companies for Property Owners

**DNS slugs:** `guide-to-using-limited-company-to-avoid-inheritance-tax`, `how-a-family-investment-company-can-save-you-inheritance-tax`
**Domain count:** 1 (DNS only)

Rationale: A Family Investment Company (FIC) is a private limited company used to hold investment assets (including property) and pass wealth to the next generation tax-efficiently. It is distinct from an SPV or trading company: the FIC structure is primarily an IHT/estate-planning tool (shares gifted to children, growth outside the parent's estate, discretionary trusts as shareholders). v2 topic 3 covers non-resident IHT; v2 topic 11 covers profit extraction from a BTL Ltd. A FIC page targets UK-domiciled landlords with large portfolios planning intergenerational transfer. DNS has two pages on this theme; the topic is increasingly promoted by accountancy firms as an alternative to trusts post-FA 2006.

Cannibalisation: low. Topic 11 is post-incorporation cash extraction; topic 3 is non-resident IHT. FIC is a pre-transfer planning structure for UK-domiciled families.

---

### A4. Gifting Property and Deed of Gift Tax Implications

**DNS slug:** `gifting-property-transfer-home-ownership-deed-of-gift`
**Domain count:** 1 (DNS only)

Rationale: Transferring property by gift (deed of gift) is treated as a disposal at market value for CGT even if no cash changes hands. SDLT applies if the recipient takes on a mortgage. IHT 7-year rule applies if the donor dies within 7 years. These three tax consequences at the point of gifting are frequently misunderstood. v2 topic 12 covers declaration of trust (income-splitting without change of ownership); this topic covers full transfer of title by gift. Distinct mechanics, different audience (parents gifting to children, transfers between non-spouses).

Cannibalisation: none against existing 15 topics.

---

### ~~A5. SDLT Refund: When and How to Claim~~ REJECTED (2026-07-08)

REJECTED -- existing page found by title match: `a-complete-guide-to-stamp-duty-refund` and `stamp-duty-5-sdlt-surcharge-refund-claims`. These pages were missed by the Jaccard slug-only filter because their slug tokens do not closely match the query tokens. Title-match scoring confirms the duplicate. Action: improve-existing on those two pages to cover the surcharge refund process, SDLT5 filing, and the 12-month window.

~~**DNS slugs:** `stamp-duty-refund`, `stamp-duty-refund-how-to-claim` etc.~~

---

### A6. Buying Commercial Property Through a SIPP

**DNS slug:** `buying-commercial-property-through-your-sipp`
**Domain count:** 1 (DNS only)

Rationale: A Self-Invested Personal Pension (SIPP) can hold commercial property (not residential). This allows rental income and capital growth to accumulate tax-free within the pension. Rules are complex: the property must not be used by the pension member or connected parties, the SIPP must fund the purchase (commercial mortgage inside a SIPP is allowed), and there are VAT and annual allowance interactions. This is a distinct topic with no overlap against existing 15 topics. Audience: landlords with significant pension pots considering diversification into commercial property.

Cannibalisation: none. Not in existing topics or GSC lane items.

---

### Lower-priority / single-signal items (noted, not recommended)

- **CIS compliance for property developers** (`cis-compliance-for-property-developers`): niche sub-audience (developers commissioning construction). One DNS page. Add when construction-cis site content is being cross-linked.
- **Worldwide Disclosure Facility** (`navigating-the-hmrc-worldwide-disclosure-facility`): partial overlap with v2 topic 4 (Let Property Campaign). The WDF covers offshore/non-UK income; LPC covers UK rental income. Distinct, but weak single-domain signal. Consider bundling as a section within a broader "HMRC voluntary disclosure" guide.
- **SDLT reliefs overview** (`sdlt-reliefs-and-exemptions`, `how-to-reduce-your-sdlt-liability-when-buying-property`): partial overlap with v2 topic 13 (MDR abolition). A broader reliefs guide would subsume MDR. Treat as an extension of topic 13 when briefing.

**Honest count: 6 additional topics recommended (A1-A6), all single-domain signal from a broad-service firm. Confirm search volume before briefing. No em-dashes used.**
