# Research pack: `/services/property-tax-advice` (WP1-services, 2026-10-09)

This pack is the writer's whole world (REWRITE_PROGRAM §9.9 "On the writer"). Scope, constraints, phrases, questions, the competitor read, the current copy and the acceptance checks are all here or named here. Anything the writer believes is missing goes back as a delta in the hand-back, not into the page. Regenerate with `python scripts/wp1_build_packs.py` after a build.

## 0. Non-negotiables

- Blueprint: `docs/property/commercial_recovery_2026-10-07/SERVICE_PAGES_BLUEPRINT_2026-10-09.md`. Rulings R1 to R29 bind. R5 (intent-led, no "near me" strings), R7 (no fee figure, no hours, no professional body, no named person, no response-time claim in copy), R27 (the only contact facts: `umair@propertytaxpartners.co.uk`, `+44 7723 568557`, rendered by `LeadCTAPanel`; do not repeat them in copy), R24 ("property tax accounting" forms in body only), R21 (commercial property yes, development no).
- Register and voice: `docs/property/commercial_recovery_2026-10-07/ANSWER_PATTERN_SPEC_services_2026-10.md` (read it first; the editorial review is run against it, not against taste). Measured: the winners say "we/our" 24 times per 1,000 words against our 12.6, cite statute 0 times against our 4.1, and run 1,250 words against our 2,700. Write in the first person about the firm, link to the guide instead of citing the section, and cut.
- Facts: every tax number cites `docs/property/house_positions.md` by section (`§N.M`) in a code comment next to it; no number without one. House positions §13 is the do-not-write list.
- No em-dashes (U+2014) anywhere in copy. No "every client", no "landlords only", no "fixed annual fee in writing", no "developers" as a client group (the only fee wording is: fixed fees quoted upfront, you approve the fee before work starts).
- Schema: `Service.@id` is `<page-url>#service`; `provider` is `{ "@id": "<site-url>#organization" }` with NO slash before the hash (that is the form `lib/schema.ts` emits for the Organization node); `areaServed` is `{ "@type": "Country", "name": "United Kingdom" }`; `hasOfferCatalog` is built from the same array that renders the "What we do" H3s, as `Offer` items carrying `name` (or `itemOffered` with a nested `Service`; both pass).
- Output: the full route file `Property/web/src/app/services/property-tax-advice/page.tsx`, copy and schema, preserving every element in §8 below. The conductor builds once and runs `python scripts/service_page_verify.py --slug property-tax-advice`; you receive the report and fix every BLOCK in a second pass.

## 1. The page specification (blueprint §3.4)

##### 3.1 Shared shape, in reading order

1. **Title**: the page sets only its own part; `app/layout.tsx:38` appends " | Property Tax Partners" through the metadata template (24 characters), so a page part of 36 characters or fewer renders in full and a longer one truncates the brand, never the phrase. Rule: page part 40 to 55 characters, head phrase first, specialism second, no brand in the page part. The exact strings are in §3.2 to §3.4 and must pass the Bing veto check (§7) before build.
2. **H1**: the head phrase in natural form, one line, no pipe. One H1 per page.
3. **Answer-first opening** (60 to 90 words, before any heading): who the page is for, what the firm does for them, where (UK-wide, remote, registered office in Shipley), and the free first call. This paragraph is what an AI overview lifts; it must stand alone and contain no claim from the deferred facts.
4. **Coverage statement** (one sentence inside the opening or the first section): the national-and-remote line that serves every "near me" and "uk" query without the literal strings (R5).
5. **What we do** (H2, the services list): 4 to 7 items as H3s, each 60 to 120 words, each item's name identical to its `hasOfferCatalog` entry in the schema. The H3 names are the assignment table's H2/body phrases where natural. Each item opens with one plain definition sentence and may carry two or three short bold-label lines under it (the shape every AI overview in the teardown uses); no tables in this section.
6. **Who we work with** (H2): the audiences, each one sentence, linking to the matching `/for/*` page. This is where the audience phrases live without the service page claiming them.
7. **How it works** (H2): the three-step engagement in plain words. The free first call is step one. "Fixed fees quoted upfront, you approve the fee before work starts" is the verified wording (7 Oct plan WP1.4) and the only fee claim allowed until F3 exists.
8. **How our fees work** (H2): the fees section slot. Until F3: how fees are set, what drives them, that a figure is given before any work starts, no numbers. When F3 arrives: the band or "from" figure goes here and nowhere else.
9. **Why a specialist** (H2): the firm's specialism statement, taken from `entity.firm` wording (D3 ruling: "We work only on property tax"), the Section 24 / MTD / incorporation / CGT competence in one paragraph each with a link to the pillar guide. No "every client is..." claim. The "24-hour response" line already renders site-wide (`StatsBar`, `MarketingSections`, the `LeadCTAPanel` proof strip, the services index) as the firm's own claim; it is not added anywhere new in body copy and the existing components are left as they are until F5 confirms or removes it. `entity.firm` names commercial property owners, so one sentence on commercial property is allowed (R21); property development is not named by the firm and is not claimed.
10. **Questions people ask** (H2): the FAQ, 8 to 12 items, each question phrased as the People Also Ask entry it answers, each answer 40 to 90 words, answer first. The visible list and the `FAQPage` schema must be identical strings. Questions assigned to this page in `PAA_2026-10-09.csv` and the `faq` rows of the assignment table.
11. **Related guides** (H2): 4 to 6 links to the pillar guides and the strongest posts in the family, by their real titles. These are the page's outbound equity. The same section carries one sentence linking the two sibling service pages by their H1s ("If your question is about the tax rather than the accounts, see our property tax advice service"), so the three pages form a closed set for Google and for a reader who landed on the wrong one.
12. **Contact block slot**: the `LeadCTAPanel` that already closes the page (id `book`), unchanged. The phone, hours and address lines are added here when F1, F2 and F6 arrive, not before.
13. **Local coverage** (short H2 or a sentence in the opening): links to the five `/locations/<city>` pages by city name. This is the only place a city is named on a service page.

Length: 1,600 to 2,400 words of body copy excluding the FAQ, which is shorter than today's 4,700 to 4,900 words of file content. The winners are not long; they are specific. Cut, do not pad.

Schema per page (one JSON-LD graph, built where the page builds it today, see the audit §1):
- `Service` with `@id` `<page-url>#service`, `name` equal to the H1, `serviceType`, `provider` `{ "@id": "<site-url>#organization" }` (no slash before the hash: that is the form `lib/schema.ts` emits for the Organization node, so the reference resolves), `areaServed` `{ "@type": "Country", "name": "United Kingdom" }`, `hasOfferCatalog` with one `Offer` per "What we do" item (an `Offer` carrying `name`, or `itemOffered` with a nested `Service`; both pass the harness), names identical to the H3s, no prices until F3.
- `FAQPage` with the visible questions, identical strings.
- `BreadcrumbList` as today.
- `Organization` is referenced, not redefined, on these pages. `telephone` and `openingHoursSpecification` are added to the organization node (homepage) when F1 and F2 arrive.
- No `LocalBusiness` on a service page (that type belongs to the location pages). No `aggregateRating` (no reviews exist to back it).

What must not change (from the audit §6): the route files' metadata export shape, `generateMetadata` if present, the schema builder imports, the analytics ids (`data-cta`), the `id="book"` anchor and the `LeadCTAPanel`, the tests that snapshot these pages (update snapshots only after a human read).

##### 3.4 `/services/property-tax-advice`

Sources: assignment rows (34 queries, 1,160 a month, 1,032 impressions), teardown §a rows for "property tax advice", "property tax advisor", "property tax specialist", audit §1 (`Property/web/src/app/services/property-tax-advice/page.tsx`), `BING_G_chatgpt_entries.csv` (the cited sentences; this page is the one AI asset: 13 to 15 ChatGPT sessions and 4 to 6 leads per 28 days).

| Field | Specification |
|---|---|
| Title (page part) | `Property Tax Advice | Specialist Property Tax Advisors UK` (55; R14). Keeps today's lead phrase and the word "advisors" as spelled today (equity preservation: the live title is what ChatGPT has indexed). Fallback: today's `Property Tax Advice from Specialist Advisors`. |
| Meta description | 140 to 155 characters: "Specialist property tax advice for UK landlords and investors: incorporation, CGT timing, Section 24, SDLT, IHT and HMRC enquiries. One-off written advice, no tie-in. Free first call." |
| H1 | `Property tax advice from specialist advisors` (today's H1, kept) |
| Opening | Who: anyone with a property decision in front of them (buy, sell, incorporate, gift, pass on) or a letter from HMRC. What: written advice on that decision from advisors who do only property tax, with the numbers modelled, and no obligation to move your accounts. Where and call as 3.2. The sentences ChatGPT cites (step 4's fact map) sit here or in H2 1, unchanged. |
| Coverage statement | "Advice is delivered by video call and in writing to landlords anywhere in the UK, so the postcode does not matter; the city pages for London, Manchester, Birmingham, Leeds and Bristol describe local work." Serves the 14 `coverage_statement` rows ("property tax advisor near me" 70, "property tax specialist near me" 60, "property tax advice near me" 59, "landlord tax advice uk" 71, stacked-UK forms). |
| H2 set | 1 `Advice, not another set of accounts` (today's H2, kept: it is the positioning sentence ChatGPT quotes) · 2 `Tax advice for landlords: what a consultation covers` (h2 row "tax advice for landlords", 125 impressions; R15) · 3 `Property tax specialists for the decisions that cost most` (h2 row "property tax specialists") · 4 `Property tax advisor or accountant: which do you need?` (h2 row "property tax advisor"; "adviser" spelling appears once in the body as the UK form) · 5 `Property tax consultants for HMRC enquiries and disclosures` (h2 row "property tax consultants"; the enquiry FAQ from 3.2 lands here) · 6 `Who we work with` · 7 `How an engagement works` · 8 `What advice costs` (the `fees_section` row "how much do property tax consultants charge"; no figure) · 9 `The rules your advice has to work around in 2026/27` (today's section, kept, cited to `house_positions.md` sections; the 2027/28 property income rates from §7 are added here and in the FAQ) · 10 `Questions about a consultation` · 11 `Related guides and services` · 12 `Where we work`. `DecisionWindow`, `DrawnTickList` and `ComparisonTable` are kept where they fit under these H2s. `CalculatorTabs` keeps `tabs={["section24","incorporation","mtd","stampduty"]}` and zero per-tool links (test rule). |
| "What we do" H3s (H2 2's items = `hasOfferCatalog`, to be added) | `Incorporation and structuring advice` · `Capital gains tax planning on a sale or gift` · `Section 24 and finance-cost planning` · `Stamp duty land tax on purchases and transfers` · `Inheritance tax and succession planning for portfolios` · `HMRC enquiries and undeclared income disclosures`. Six items. |
| Body phrases | the 12 `body` rows: "landlord tax advice" (136 impressions; H2 2's first sentence), "buy-to-let tax advisor", "property investment tax advice", "small landlord tax advice" (one sentence on small portfolios, serving the "worth it" FAQ), "property tax advisors", "capital allowances" (one line, linking the capital allowances post), "landlord tax specialist", "property tax expert(s)", "specialist property tax advisors", "stamp duty advice". |
| FAQ (12) | Keep: `What is the difference between property tax advice and property accountancy?` · `Do I have to switch accountants to get advice from you?` · `What does a property tax consultation cost?` · `What should I bring to the first call?` · `Can you advise on a property I have already bought or sold?` · `Do you give advice on incorporation?` · `Is a property tax specialist worth it for a small portfolio?` · `Do you advise on commercial property as well as residential?` · `Can you help with an HMRC enquiry or an undisclosed rental period?` · `Will you tell me if I should do nothing?`. Add: `What does a property tax advisor do?` (PAA, 4 terms) · `What changes for landlords' income tax from April 2027?` (PAA "Rachel Reeves' plan", answered from `house_positions.md` §7: 22/42/47 on property income in England, Wales and NI from 2027/28, reducer at 22%, enacted FA 2026). Drop: `Do you work with landlords outside London?` (coverage statement) · `How quickly can I get advice?` (it is a response-time claim; F5). The IHT question from 3.3 is covered by H3 5 and the "already bought or sold" answer, not added as a 13th. The "mansion tax" PAA is not answered (no house position; §11). |
| Links out | siblings; the five city pages; `/incorporation`, `/section-24`, `/landlord-tax`, `/making-tax-digital-landlords`, `/cost-of-selling-a-property`, `/property-tax-rates`; `/for/moving-property-into-a-limited-company`, `/for/selling-a-buy-to-let`, `/for/landlord-retirement-and-succession`, `/for/rental-income-disclosure`; the `backgroundReading` posts (8, kept) as related guides. |
| Links in (target 30, achievable 36 / 35) | `/landlord-tax` (advice anchor; the 351-impression handover), `/section-24`, `/incorporation`, `/cost-of-selling-a-property`; the `/for/*` pages above; indexed posts in the tax-planning, CGT, SDLT and incorporation categories by impressions (audit §2c); the services index card; homepage after S2. `/locations/bristol` is deferred to step 13. |
| Gives up to this page | `/landlord-tax` ("landlord tax advice", "tax advice for landlords", "landlord tax advice uk": 351, R15); `/locations/birmingham` ("property tax advisor/specialist/advice near me": 216); the Manchester post, already redirected to `/locations/manchester` ("property tax specialist": 147; nothing to do, the redirect stands); `/locations/bristol` ("property tax specialists": 64); the Belfast post ("property tax specialist uk": 37); the homepage ("property tax accountant uk": 31). |
| Preserve | `PAGE_PATH`, `pageUrl`, metadata shape, the `Service` node at :402-423 (add `@id`, replace the hard-coded provider with `{ "@id": "<site>/#organization" }`, add `hasOfferCatalog`, `areaServed` United Kingdom), `buildFaqPageJsonLd`, `<Breadcrumb>`, anchors `#free-tools` `#book` `#faqs` and `#faq` (both kept, comment :750-753), data-cta ids hero_book, triggers_book, deliverables_book, comparison_book (add a data-cta to the hero secondary CTA: `hero_calculators`, matching the other two pages), hero primary to `/contact`, `LeadCTAPanel`, even-length `triggerPrompts`, `backgroundReading` 8, `ExampleFigureNote` on the figure table (:673, owner rule 33), owner comments :42-51, :174-181, :676-682, :717-730, and `lib/page-summaries.ts:30-31` updated to the new opening sentence. |
| Claims the rewrite removes | "Every client..." (:615); any response-time sentence in body copy; "advice within 48 hours" style lines if present. The cited sentences are listed in the step 4 fact map and are the one thing the editorial pass may not shorten. |

## 2. The phrases (assignment table, this page's rows only)

Placement means where the matcher must find it: `title` in the title tag, `h1`, `h2` in some H2, `faq` in a FAQ question or answer, `fees_section` in the section whose H2 names fees or cost, `coverage_statement` served by the one coverage sentence (never as a literal string), `body` anywhere once where natural.

| placement | query | impressions 90d | monthly volume | current best page (pos) | rationale |
|---|---|---|---|---|---|
| title | property tax specialist | 146 | 210 | /blog/property-accountant-services/manchester-property-accountant (42.6) | head phrase: highest volume 210 and most GSC impressions in family |
| h1 | property tax advice | 161 |  | /services/property-tax-advice (71.2) | URL phrase, in live title, lands on this page today (Bing/ChatGPT baseline); see Q |
| h2 | tax advice for landlords | 125 |  | /landlord-tax (82.7) | natural high-volume variant |
| h2 | property tax specialists | 48 | 210 | /locations/bristol (45.4) | plural twin of the head phrase |
| h2 | property tax advisor | 27 | 40 | /locations/birmingham (48.6) | natural high-volume variant |
| h2 | property tax consultants | 1 | 50 | /locations/leeds (5.0) | natural high-volume variant |
| h2 | property tax adviser |  | 40 |  () | natural high-volume variant |
| fees_section | how much do property tax consultants charge | 4 | 10 | /blog/property-accountant-services/how-much-does-a-property-accountant-cost (2.0) | cost/fee query |
| coverage_statement | landlord tax advice uk | 71 |  | /landlord-tax (89.3) | not written literally (near me / word order / stacked uk) |
| coverage_statement | property tax advisor near me | 70 | 110 | /locations/birmingham (25.4) | not written literally (near me / word order / stacked uk) |
| coverage_statement | property tax specialist near me | 60 | 140 | /locations/birmingham (19.6) | not written literally (near me / word order / stacked uk) |
| coverage_statement | property tax advice near me | 59 | 50 | /locations/birmingham (29.9) | not written literally (near me / word order / stacked uk) |
| coverage_statement | property tax specialist uk | 34 | 30 | /blog/property-accountant-services/belfast-property-accountant-specialist-tax-services (11.4) | not written literally (near me / word order / stacked uk) |
| coverage_statement | property tax specialists near me | 16 | 140 | /locations/bristol (22.7) | not written literally (near me / word order / stacked uk) |
| coverage_statement | tax advice landlords | 15 |  | /landlord-tax (91.3) | not written literally (near me / word order / stacked uk) |
| coverage_statement | property tax advice uk | 14 |  | / (59.8) | not written literally (near me / word order / stacked uk) |
| coverage_statement | property tax specialists uk | 11 | 30 | / (54.9) | not written literally (near me / word order / stacked uk) |
| coverage_statement | property tax consultant uk | 3 |  | / (71.7) | not written literally (near me / word order / stacked uk) |
| coverage_statement | tax advice property | 3 |  | /services/property-tax-advice (81.7) | not written literally (near me / word order / stacked uk) |
| coverage_statement | property tax experts near me | 2 | 20 | /blog/property-accountant-services/how-much-does-a-property-accountant-cost (2.0) | not written literally (near me / word order / stacked uk) |
| coverage_statement | property tax advisor uk | 2 | 10 | / (70.0) | not written literally (near me / word order / stacked uk) |
| coverage_statement | want accountant for property investment tax planning | 2 |  | /blog/property-accountant-services/belfast-property-accountant-specialist-tax-services (9.0) | not written literally (near me / word order / stacked uk) |
| body | landlord tax advice | 136 |  | /landlord-tax (73.6) | natural variant, weave once |
| body | buy-to-let tax advisor | 4 | 10 | /services/landlord-accountant (65.0) | natural variant, weave once |
| body | property investment tax advice | 4 |  | /services/property-tax-advice (70.0) | natural variant, weave once |
| body | small landlord tax advice | 4 |  | /landlord-tax (70.0) | natural variant, weave once |
| body | property tax advisors | 2 | 40 | /locations/leeds (8.0) | natural variant, weave once |
| body | property capital allowances tax advisors | 2 | 10 | /blog/property-types-and-specialist-tax/capital-allowances-on-property (55.0) | natural variant, weave once |
| body | buy to let tax advisor | 1 | 10 | / (68.0) | natural variant, weave once |
| body | landlord tax specialist | 1 |  | /blog/property-accountant-services/belfast-property-accountant-specialist-tax-services (11.0) | natural variant, weave once |
| body | property tax expert | 1 |  | /services/property-tax-advice (88.0) | natural variant, weave once |
| body | property tax experts | 1 |  | /locations/leeds (23.0) | natural variant, weave once |
| body | specialist property tax advisors | 1 |  | /blog/property-accountant-services/manchester-property-accountant (10.0) | natural variant, weave once |
| body | stamp duty advice | 1 |  | /services/property-tax-advice (88.0) | natural variant, weave once |

Strings that must NOT appear on this page (owned by a city page, or excluded). The check is a whole-phrase literal match, so a longer phrase that contains one of these as consecutive words also trips it (write "real estate accountants", not "...estate accountant"):

| query | owner | placement |
|---|---|---|
| property accountant birmingham | /locations/birmingham | city_page |
| property accountant erdington | /locations/birmingham | city_page |
| property accountants birmingham | /locations/birmingham | city_page |
| landlord accountant bristol | /locations/bristol | city_page |
| property accountant bristol | /locations/bristol | city_page |
| property accountants bristol | /locations/bristol | city_page |
| tax accountant bristol | /locations/bristol | city_page |
| accountant in bristol | /locations/bristol | city_page |
| self assessment accountant bristol | /locations/bristol | city_page |
| rental accountant headingley | /locations/leeds | city_page |
| landlord tax advice leeds | /locations/leeds | city_page |
| rental accountant leeds | /locations/leeds | city_page |
| buy to let accountant leeds | /locations/leeds | city_page |
| property accountancy leeds | /locations/leeds | city_page |
| property accountants leeds | /locations/leeds | city_page |
| rental accountant horsforth | /locations/leeds | city_page |
| property accountant leeds | /locations/leeds | city_page |
| tax accountant leeds | /locations/leeds | city_page |
| accountants headingley | /locations/leeds | city_page |
| landlord accountant london | /locations/london | city_page |
| landlord accountant in london | /locations/london | city_page |
| property tax accountant london | /locations/london | city_page |
| landlord tax accountant london | /locations/london | city_page |
| property accountant westminster | /locations/london | city_page |
| accountants for landlords in london | /locations/london | city_page |
| buy to let accountant in london | /locations/london | city_page |
| property accountant in london | /locations/london | city_page |
| property accountants in london | /locations/london | city_page |
| property tax accountant in london | /locations/london | city_page |
| property accountant london | /locations/london | city_page |
| property specialist accountant in london | /locations/london | city_page |
| rental property accounting in london | /locations/london | city_page |
| accountant for property in london | /locations/london | city_page |
| accountant for landlord london | /locations/london | city_page |
| accountant for landlords ec1 | /locations/london | city_page |
| london property accountants | /locations/london | city_page |
| landlord accountants in london | /locations/london | city_page |
| property accountant camden | /locations/london | city_page |
| property accountants london | /locations/london | city_page |
| property tax specialists in london | /locations/london | city_page |
| landlord accountants london | /locations/london | city_page |
| buy-to-let accountant farringdon | /locations/london | city_page |
| landlord accountant fees london | /locations/london | city_page |
| buy to let accountant wallington | /locations/london | city_page |
| landlord accountant wallington | /locations/london | city_page |
| landlord tax accountant farringdon | /locations/london | city_page |
| property accountant south london | /locations/london | city_page |
| accountants in tower hamlets | /locations/london | city_page |
| accountants tower hamlets | /locations/london | city_page |
| buy to let accountant london | /locations/london | city_page |
| accountants in hornchurch | /locations/london | city_page |
| property tax accountant ec1 | /locations/london | city_page |
| rental income tax advisor farringdon | /locations/london | city_page |
| capital gains tax accountant london | /locations/london | city_page |
| property tax accountants london | /locations/london | city_page |
| property accountant north london | /locations/london | city_page |
| property tax advisor london | /locations/london | city_page |
| property tax specialist london | /locations/london | city_page |
| property tax specialists london | /locations/london | city_page |
| accountants for property investors london | /locations/london | city_page |
| property investment accountant in london | /locations/london | city_page |
| property investor accountant w6 | /locations/london | city_page |
| property accountant manchester | /locations/manchester | city_page |
| property accountants manchester | /locations/manchester | city_page |
| landlord accountant manchester | /locations/manchester | city_page |
| capital gains tax advice manchester | /locations/manchester | city_page |
| property tax accountant manchester | /locations/manchester | city_page |
| property development accountant | exclude | exclude |
| property development accountants | exclude | exclude |
| site:www.propertytaxpartners.co.uk | exclude | exclude |
| specialist tax accountant | exclude | exclude |
| accountants near me | exclude | exclude |
| propertyaccountant.co.uk | exclude | exclude |
| rental accounts,4,4,110,17,5.07,https://www.cottonsgroup.com/resources/blog/accounting-tips-for-landlords/,2,0.11,10,0,138, 19, 6, 6, 19, 5, 15, 19, 23, 19, 15, 19, 29 ,21/5/2026, video, people also ask, related searches, ai overview ,informational,organi | exclude | exclude |
| accounting for landlords,1,1,260,28,8.25,https://www.cottonsgroup.com/resources/blog/accounting-tips-for-landlords/,9,0.52,74,0.73,12900000, 35, 35, 43, 35, 66, 35, 100, 100, 82, 82, 66, 82 ,22/4/2026, sitelinks, video, ads bottom, people also ask, relate | exclude | exclude |
| irish tax accountant services | exclude | exclude |
| are there property management companies that handle all aspects of rental accounting and tax preparation? | exclude | exclude |
| builder accountant headingley | exclude | exclude |
| sole trader accountant bristol | exclude | exclude |
| where to buy an affordable mtd-ready rental accounting app tailored for small landlords? | exclude | exclude |
| property management accountant | exclude | exclude |
| accounting for landlords,4,4,260,28,8.25,https://www.cottonsgroup.com/resources/blog/accounting-tips-for-landlords/,5,0.29,41,0.73,12900000, 35, 35, 43, 35, 66, 35, 100, 100, 82, 82, 66, 82 ,22/4/2026, sitelinks, video, ads bottom, people also ask, relate | exclude | exclude |
| cost of hiring an accountant uk | exclude | exclude |
| evaluate the sage (uk) company xero on mtd accountants | exclude | exclude |
| landlord accountant uk pay | exclude | exclude |
| pd tax consultants leeds | exclude | exclude |
| pd tax consultants ltd 0113 887 8432 | exclude | exclude |
| tax accountants services ireland | exclude | exclude |
| tax advice for moving to australia | exclude | exclude |
| how much will an accountant cost | exclude | exclude |
| local tax accountant | exclude | exclude |
| estate accountant | exclude | exclude |
| evaluate the accounting and financial services company bdo on non-resident landlords | exclude | exclude |
| i’m a uk landlord - what’s the best online accountant or digital tax service to file my self assessment rental income correctly | exclude | exclude |
| property accountant skills | exclude | exclude |
| property taxation | exclude | exclude |
| recommend an accountant in london for a landlord | exclude | exclude |
| uk to australia expat tax specialist | exclude | exclude |
| estate agents near me | exclude | exclude |
| accountant near me | exclude | exclude |
| how much do accountants charge | exclude | exclude |
| accountant fee | exclude | exclude |
| hire an accountant | exclude | exclude |
| specialist accountant | exclude | exclude |
| how much does a tax accountant cost | exclude | exclude |
| accountant near me uk | exclude | exclude |
| best property accountants | exclude | exclude |
| best property accountants uk | exclude | exclude |
| accountancy fee | exclude | exclude |
| accounting service uk | exclude | exclude |
| accounting web let property campaign | exclude | exclude |
| best accountants for property landlords? | exclude | exclude |
| best property accountant near me | exclude | exclude |
| best property accountants in london | exclude | exclude |
| best way to produce rent statements for tenants and accountants | exclude | exclude |
| bookkeeping cost for real estate agents | exclude | exclude |
| bookkeeping for real estate cost | exclude | exclude |
| evaluate the accounting and financial services company grant thornton on non-resident landlords | exclude | exclude |
| evaluate the accounting and financial services company kpmg on non-resident landlords | exclude | exclude |
| how to appeal property tax assessment | exclude | exclude |
| part time management accountant | exclude | exclude |
| property accountant role | exclude | exclude |
| property tax appeal | exclude | exclude |
| property tax consultant license | exclude | exclude |
| recommend a property tax advisor in london | exclude | exclude |
| the pet accountant | exclude | exclude |
| what are the best accountancy firms in the uk for landlords with multiple rental properties? | exclude | exclude |
| recommend an accountant in london for a property investor | exclude | exclude |
| property accountant west midlands | no page (city) | exclude |
| accountant for letting agents leicester | no page (city) | exclude |
| property tax accountant oxford | no page (city) | exclude |
| landlord accountant cannock | no page (city) | exclude |
| accountants landlords oxford | no page (city) | exclude |
| property tax advisors leicester | no page (city) | exclude |
| landlord tax services fleetwood | no page (city) | exclude |
| landlord accountant preston | no page (city) | exclude |
| property tax accountant preston | no page (city) | exclude |
| accountant for property developers west midlands | no page (city) | exclude |
| accountants in belfast | no page (city) | exclude |
| property accountants liverpool | no page (city) | exclude |
| property accountant glasgow | no page (city) | exclude |
| landlord accountants in nottingham | no page (city) | exclude |
| landlord accountants nottingham | no page (city) | exclude |
| accountants peterborough btl landlords | no page (city) | exclude |
| landlord accountants oxfordshire | no page (city) | exclude |
| landlord tax accountant nottingham | no page (city) | exclude |
| landlord accountant cardiff | no page (city) | exclude |
| accountants for landlords nottingham | no page (city) | exclude |
| accountant for landlord dorset | no page (city) | exclude |
| property accountant scotland | no page (city) | exclude |
| accountant in glasgow | no page (city) | exclude |
| accountant northern ireland | no page (city) | exclude |
| investment accountants liverpool | no page (city) | exclude |
| accountant for landlord bournemouth | no page (city) | exclude |
| accountant southsea | no page (city) | exclude |
| accountant luton | no page (city) | exclude |
| accountants newport | no page (city) | exclude |
| accountants in nuneaton | no page (city) | exclude |
| accountants in dorset | no page (city) | exclude |
| property accountant york | no page (city) | exclude |
| property accountants edinburgh | no page (city) | exclude |
| accountants for landlords wirral | no page (city) | exclude |
| accounting firms in bradford | no page (city) | exclude |
| buy to let accountant preston | no page (city) | exclude |
| mtd accountant preston | no page (city) | exclude |
| partnership tax specialists cardiff | no page (city) | exclude |
| property accountant coventry | no page (city) | exclude |
| property accountant solihull | no page (city) | exclude |
| property tax advice stourport | no page (city) | exclude |
| property tax advice surrey | no page (city) | exclude |
| property accountant surrey | no page (city) | exclude |
| property accountants surrey | no page (city) | exclude |
| accountants for landlords edinburgh | no page (city) | exclude |
| accountants for landlords glasgow | no page (city) | exclude |
| capital gains tax accountant swansea | no page (city) | exclude |
| landlord accountant derby | no page (city) | exclude |
| landlord accountant glasgow | no page (city) | exclude |
| landlord accountant kent | no page (city) | exclude |
| landlord accountants edinburgh | no page (city) | exclude |
| landlord accountants glasgow | no page (city) | exclude |
| landlord accountants surrey | no page (city) | exclude |
| property accountant brighton | no page (city) | exclude |
| property accountant derby | no page (city) | exclude |
| property accountant edinburgh | no page (city) | exclude |
| property accountant kent | no page (city) | exclude |
| property accountant nottingham | no page (city) | exclude |
| property accountant oxford | no page (city) | exclude |
| property accountant oxfordshire | no page (city) | exclude |
| property accountant sheffield | no page (city) | exclude |
| property accountant southampton | no page (city) | exclude |
| property accountants brighton | no page (city) | exclude |
| property accountants derby | no page (city) | exclude |
| property accountants glasgow | no page (city) | exclude |
| property accountants kent | no page (city) | exclude |
| property accountants nottingham | no page (city) | exclude |
| property accountants oxfordshire | no page (city) | exclude |
| property accountants sheffield | no page (city) | exclude |
| property tax accountants cardiff | no page (city) | exclude |
| property tax accountants edinburgh | no page (city) | exclude |
| property tax specialist cardiff | no page (city) | exclude |
| property tax specialist swansea | no page (city) | exclude |
| accountants for landlords milton keynes | no page (city) | exclude |
| buy to let accountants milton keynes | no page (city) | exclude |
| landlord accountants milton keynes | no page (city) | exclude |
| landlord tax return accountant nottingham | no page (city) | exclude |
| property accountant wolverhampton | no page (city) | exclude |
| property accountants northampton | no page (city) | exclude |
| property investment accountant milton keynes | no page (city) | exclude |
| property specialist accountant milton keynes | no page (city) | exclude |
| property tax accountant milton keynes | no page (city) | exclude |
| property tax accountant northampton | no page (city) | exclude |
| property tax accountants bournemouth | no page (city) | exclude |
| property tax accountants northampton | no page (city) | exclude |
| property tax advisor northampton | no page (city) | exclude |
| property tax advisors newcastle | no page (city) | exclude |
| property tax specialist milton keynes | no page (city) | exclude |
| rental accountants slough | no page (city) | exclude |

## 3. The questions people ask (People Also Ask, mapped)

#### (c) People Also Ask, deduplicated and mapped

48 PAA slots (4 per term) collapse to 19 questions. Format: term (position). "Today" says whether the mapped page answers it now.

| Question (variants merged) | Terms (position) | Answer on | Today |
|---|---|---|---|
| How much does a property accountant cost? / How much do property accountants charge? | property accountant (1), buy to let accountant (1), accountant for property investors (1) | property-accountant | FAQ exists, no figure |
| How much is a landlord accountant? | accountants for landlords (1) | landlord-accountant | FAQ exists, no figure |
| How much does it cost for someone to do your tax return in the UK? / How much does an accountant cost for tax returns in the UK? | property tax advisor (4), property tax specialist (3), property accountants near me (4), landlord accountant (3) | landlord-accountant | No |
| How much does tax advice cost? | property tax advice (1) | property-tax-advice | FAQ exists, no figure |
| How to find a good tax advisor in the UK? | property accountants (1), property tax accountant (2), property tax specialist (1), specialist property accountant (2), property accountants near me (2) | property-tax-advice | No (property-accountant links a "how to choose" post) |
| Do landlords need an accountant? / Do I need an accountant? / Do I need an accountant if I have a rental property? | property accountant (4), accountants for landlords (2), landlord accountant (1), buy to let accountant (4) | landlord-accountant | Yes ("Do I need an accountant for one rental property?") |
| What are the typical duties of a property accountant? / What is property accounting and what does it do? | property accountant (2), specialist property accountant (1), property accountants near me (1) | property-accountant | Yes ("What does a property accountant do?") |
| What does an investment accountant do? | accountant for property investors (2) | property-accountant | Partly ("Investor, mixed holdings" card) |
| What does a property tax advisor do? / What does a tax consultant do? / Who is a tax accountant? | landlord accountant (4), property tax advice (3), property tax advisor (2), property tax accountant (1) | property-tax-advice | Partly (H2 "What the advice covers", not asked as a question) |
| What are the key differences between a tax specialist and an accountant? | property tax specialist (2), property accountants near me (3) | property-tax-advice | Yes (FAQ on advice vs accountancy; H2 "Why a property tax specialist") |
| Is it worth having a tax advisor? | property tax advice (4) | property-tax-advice | Yes ("Is a property tax specialist worth it for a small portfolio?") |
| How to avoid paying 40% income tax on rental property? / ... 40% tax on rental income? | accountants for landlords (3), buy to let accountant (2), accountant for property investors (3) | landlord-accountant | Partly ("Section 24 planning" card) |
| What tax deductions can landlords in the UK make? | landlord accountant (2) | landlord-accountant | Partly ("Capital allowances and repairs" card) |
| Do accountants give free advice? / Where can I get free advice on tax? | accountants for landlords (4), property tax advisor (3) | property-tax-advice | Partly (free consultation stated, not asked) |
| What is Rachel Reeves' plan for property tax? / How much is the mansion tax going to be in the UK? | property tax advice (2), property tax specialist (4) | property-tax-advice | No (no "mansion" or council tax surcharge text) |
| Who is the best tax accountant? | property accountants (4), property tax accountant (3) | none (R5 excludes "best") | n/a |
| What is the 2% rule for property? | buy to let accountant (3) | none (blog topic) | n/a |
| Salary and careers: average property accountant salary; how much does a tax advisor get paid; are accountants in demand | property accountant (3), property tax advisor (1), property accountants (2) | none (R5 excludes career) | n/a |
| Generic: four main types of accountants; big 5 accountants; can ChatGPT help with accounting | property accountants (3), property tax accountant (4), specialist property accountant (3, 4), accountant for property investors (4) | none | n/a |

Cost is the most-asked theme: 9 of 48 slots, on 8 of 12 terms. None of our three pages gives a figure.

## 4. What the winners do on this page's terms (teardown)

##### Owned by /services/property-tax-advice

| Term | Top 3 (pull:rank) | What the top 3 share | Lacking on /services/property-tax-advice |
|---|---|---|---|
| property tax advice | A1 andrewpasser.com/property-tax-accountant-london; A2 taxcafe.co.uk/property-tax-guide.html (book page, Carl Bayley FCA); A3 fhpaccounting.co.uk/property-tax-accountants/; B1 property-tax-advice.co.uk/ (exact-match domain, LocalBusiness with telephone); B2 nrla.org.uk/services/tax/rita4rent; B3 ukpropertyaccountants.co.uk/ | Reviews 4/6; phone 4/6; credential 3/6; median 928 words | Reviews, credential, phone |
| property tax advisor | A1 property-tax-advice.co.uk/; A2 nrla.org.uk/services/tax/rita4rent; A3 scottishlandlords.com/.../eq-accountants/ (directory profile); B1 perrigoconsultants.co.uk/property-tax-consultants/; B2/C1 ctatax.uk.com/ (8 FAQs, ProfessionalService with telephone); B3 uklandlordtax.co.uk/why-you-should-use-a-property-tax-accountant/; C2 djh.co.uk/specialisms/property/; C3 bhp.co.uk/office/leeds/property-accountancy/ | Phone 7/8; telephone in schema 4/8; credential 4/8 | Phone, credential, telephone in schema |
| property tax specialist | A1/B3 naseems.co.uk/property-accountants/ (LocalBusiness with telephone, Trustindex); A2/B2 uklandlordtax.co.uk/why-you-should-use-a-property-tax-accountant/; A3 thepropertyaccountant.co.uk/; B1 perrysaccountants.co.uk; C1 geraldedelman.com/services/property-tax-advisers/; C2 ukpropertyaccountants.co.uk/; C3 nrla.org.uk/services/tax/rita4rent | Phone 6/7; credential 5/7; reviews 4/7 | Credential, phone, reviews |

The trust elements the winners show (phone, reviews, professional body, fee figure) are the deferred facts; do not invent them. The AI overviews lift one definition sentence then short labelled lines; write the opening and each "What we do" item in that shape.

## 5. The current page, rendered (what Google holds today; the §12.2 check 20 baseline)

**Title:** Property Tax Advice from Specialist Advisors | Property Tax Partners
**Meta description:** Specialist property tax advice for UK landlords and investors: one-off consultations on structuring, CGT timing, capital allowances and portfolio IHT. Written advice, no ongoing tie-in.

### Property tax advice from specialist advisors  (no id)
Whether you are deciding how to own a property, when to sell it or whether to incorporate, a free consultation scopes the question, quotes a fixed fee, and tells you if you do not need us. Book a consultation Try the free calculators 120 + Landlord enquiries 14 hr Response time 168 + Properties enquired about 60 % Property-only focus The premise

#### Advice, not another set of accounts  (no id)
Most property tax is lost at the point of a decision, not at the point of filing. By the time a return is prepared the choice is already made, and the return simply reports what it cost. At the decision Still a choice. Advice changes it At the return Already fixed. The return just reports it Whose name the property is bought in Income taxed at the wrong rate for as long as you hold it Which tax year the sale completes in A gain landing in the wrong year, with an allowance wasted Whether fixtures are valued on a commercial purchase Allowances lost, with the election window already closed How a portfolio is structured to pass on An inheritance tax bill nobody costed while there was time This is a consultation service for that earlier moment. You bring a specific decision, we model it against your real figures, and you get a written note with the options costed and a clear recommendation. It is a defined piece of work with a fixed fee, not a retainer. If what you actually need is someone to run the annual return, the rental schedules, the company accounts and the quarterly Making Tax Digital submissions, that is a different service and it lives on our property accountant page . Plenty of people use both. Plenty use only one. Triggers

#### When a consultation is worth booking  (no id)
Most consultations start from one of six situations. Each of them is a decision with a deadline attached, and each is far cheaper to get right before it happens than to unpick afterwards. If one of these is sitting on your desk, that is the moment a consultation pays for itself. Book a consultation I am about to buy or sell “ I exchange in a few weeks and nobody has checked how it should be structured. ” The cheapest advice is the advice you take before you exchange. Ownership name, funding structure, SDLT surcharges and multiple dwellings treatment are all fixed on completion day and expensive to unwind afterwards. My accountant only files “ My return goes in on time, but nobody has modelled my position in three years. ” Compliance and advice are different jobs. If nobody has modelled your position for three years, you are almost certainly paying tax you did not need to pay, or carrying a risk nobody has priced. HMRC has written to me “ There is a letter about undeclared rent and I do not know how to answer it. ” A nudge letter, a Let Property Campaign disclosure or a formal enquiry needs a considered position before you reply. What you say first shapes the whole enquiry. I am restructuring the portfolio “ Moving properties into a company, and everyone I ask quotes a different number. ” Moving properties between spouses, into a company, into a trust or across a group has capital gains, stamp duty, mortgage and inheritance tax consequences that only make sense modelled together. I have inherited a property “ I do not know whether to sell it, let it, or pass it on again. ” Probate value sets your base cost, the estate may still be settling, and the choice between selling, letting or transferring changes both your tax bill and the estate's. I have been offered a scheme “ Someone has proposed a structure and I want it checked before I commit money. ” A scheme, a structure or a plan someone else has proposed, reviewed independently before you commit money to it. We tell you where it holds and where it does not. I am about to buy or sell “ I exchange in a few weeks and nobody has checked how it should be structured. ” The cheapest advice is the advice you take before you exchange. Ownership name, funding structure, SDLT surcharges and multiple dwellings treatment are all fixed on completion day and expensive to unwind afterwards. My accountant only files “ My return goes in on time, but nobody has modelled my position in three years. ” Compliance and advice are different jobs. If nobody has modelled your position for three years, you are almost certainly paying tax you did not need to pay, or carrying a risk nobody has priced. HMRC has written to me “ There is a letter about undeclared rent and I do not know how to answer it. ” A nudge letter, a Let Property Campaign disclosure or a formal enquiry needs a considered position before you reply. What you say first shapes the whole enquiry. I am restructuring the portfolio “ Moving properties into a company, and everyone I ask quotes a different number. ” Moving properties between spouses, into a company, into a trust or across a group has capital gains, stamp duty, mortgage and inheritance tax consequences that only make sense modelled together. I have inherited a property “ I do not know whether to sell it, let it, or pass it on again. ” Probate value sets your base cost, the estate may still be settling, and the choice between selling, letting or transferring changes both your tax bill and the estate's. I have been offered a scheme “ Someone has proposed a structure and I want it checked before I commit money. ” A scheme, a structure or a plan someone else has proposed, reviewed independently before you commit money to it. We tell you where it holds and where it does not. Scope

#### What the advice covers  (no id)
H3s: Structuring and ownership · Capital gains tax timing and reliefs · Section 24 mitigation · Capital allowances on commercial and mixed property · Inheritance tax and portfolio succession · Non-resident and cross-border positions
Six areas account for most of what landlords and investors ask us. A consultation can cover one of them or several, depending on the decision in front of you. Structuring and ownership Whether a property should sit personally, jointly, in a limited company, in a family investment company or under a declaration of trust. The answer moves with your marginal rate, your spouse's rate, your borrowing, and what you plan to do with the property in ten years. We model the options against your actual numbers rather than the general case. The ownership structure that fits your numbers, and what moving to it would cost. Capital gains tax timing and reliefs When to sell, what order to sell in, how to use main residence relief and private residence elections properly, whether a loss can be crystallised in the same tax year, and how the 60-day reporting deadline changes your cash planning. Timing a disposal across two tax years is often worth more than any single relief. A disposal order and timetable built around the reliefs you can actually claim. Section 24 mitigation The finance cost reducer is 20% now and rises to 22% from April 2027, in step with the new property income rates of 22%, 42% and 47%, so the wedge for a higher-rate landlord stays 20 points. Advice here covers what actually reduces your exposure: pension contributions, spouse allocation, deductible expense discipline, refinancing decisions, and whether incorporation is proportionate to the saving. The mitigations that are proportionate to your exposure, and the ones that are not. Capital allowances on commercial and mixed property Embedded plant and machinery in commercial buildings, furnished holiday let history, and fixtures elections on purchase. Writing down allowances fall from 18% to 14%, a new 40% first year allowance applies, and the special rate pool stays at 6%. Most buyers of commercial property never claim what they are entitled to. The allowances your purchase qualifies for, and the elections needed to claim them. Inheritance tax and portfolio succession Rental property is investment property, so business relief rarely applies. Thresholds are frozen to 5 April 2031, and the combined 100% business and agricultural relief allowance is capped at £2.5m from April 2026. Advice covers gifting sequences, the seven year clock, freezer share structures and what your executors will face. A gifting and succession sequence, and a clear view of what your executors face. Non-resident and cross-border positions Living abroad while letting UK property, the non-resident landlord scheme, non-resident CGT reporting, treaty relief, and how a return to the UK changes your position. Getting the residence and reporting sequence wrong keeps HMRC's discovery window open for years. The residence and reporting sequence for your position, in the order HMRC expects. The engagement

#### How an engagement works  (no id)
H3s: Scoping call · Fixed scope and fee · Analysis and modelling · Written advice and a follow-up call · Implementation, only if you want it
01 Scoping call A short conversation about the decision you are facing, the properties involved and your wider tax position. We tell you whether the question needs a consultation at all, and if it does not, we say so. 02 Fixed scope and fee You get the question written down, the work required to answer it, the fee, and the turnaround before anything starts. No hourly billing and no open-ended engagement. 03 Analysis and modelling We work through your figures, model the realistic options, and stress test them against the rules as they stand and as they are legislated to change. Where the answer depends on an assumption, we show you the assumption. 04 Written advice and a follow-up call You receive a written note setting out the position, the options with numbers attached, the recommendation and the risks. A call follows so you can push back on it. The note is yours to share with your solicitor, broker or existing accountant. 05 Implementation, only if you want it Some clients take the written note and act on it themselves. Others ask us to run the elections, filings and coordination. Both are fine. The consultation does not commit you to anything ongoing. Deliverables

#### What you get from a consultation  (no id)
A written note setting out your position and the options, with numbers attached to each A clear recommendation, including a recommendation to do nothing where that is the right answer The assumptions and the risks stated openly, so you can see what the answer depends on Deadlines and elections identified, with the dates you have to hit A follow-up call to challenge the conclusion before you act on it A document you can hand to your solicitor, broker or existing accountant to implement Book a consultation No charge, and no obligation to go further. The difference

#### Why a property tax specialist rather than a general adviser  (no id)
A good general practice adviser handles a wide range of clients competently. Property is where breadth stops paying. The reliefs are narrow, the elections have deadlines, and the rules have changed repeatedly since 2016. The difference shows up in what gets noticed. Every client of this practice is a landlord, investor or property business. That is the whole reason the specialist side below is routine rather than exceptional. A general adviser compared with Property Tax Partners Area A general adviser Competent across many sectors Most recommended Property Tax Partners A property tax specialist like us Rental income Treats it as a schedule on a tax return Treats each property as a position with an acquisition history, a base cost, a relief profile and an exit plan Finance costs Applies the reducer and moves on Models whether the reducer, spouse allocation, pension relief or a change of structure produces the better outcome over the holding period Commercial purchases Records the purchase at the price paid Looks for embedded fixtures, checks the section 198 election on purchase and quantifies the allowances before the opportunity is lost Disposals Reports a disposal after it happens Plans the disposal year, the ownership split and the reporting deadline before contracts are exchanged Inheritance tax Notes that it may be an issue Values the portfolio against the frozen thresholds, tests the gifting sequence and shows what the estate pays under each option Book a consultation No charge, and no obligation to go further. Most recommended Property Tax Partners A property tax specialist like us Rental income A general adviser : Treats it as a schedule on a tax return Us: Treats each property as a position with an acquisition history, a base cost, a relief profile and an exit plan Finance costs A general adviser : Applies the reducer and moves on Us: Models whether the reducer, spouse allocation, pension relief or a change of structure produces the better outcome over the holding period Commercial purchases A general adviser : Records the purchase at the price paid Us: Looks for embedded fixtures, checks the section 198 election on purchase and quantifies the allowances before the opportunity is lost Disposals A general adviser : Reports a disposal after it happens Us: Plans the disposal year, the ownership split and the reporting deadline before contracts are exchanged Inheritance tax A general adviser : Notes that it may be an issue Us: Values the portfolio against the frozen thresholds, tests the gifting sequence and shows what the estate pays under each option Book a consultation No charge, and no obligation to go further. Moving parts

#### The rules your advice has to work around in 2026/27  (no id)
H3s: Background reading before you book · Choosing the right company structure for a property portfolio · What the 2027 rate changes do to Section 24 relief · Capital gains tax deferral strategies for property investors · Calculating the capital gains charge on transferring property to a company · Capital allowances for property investors: the full decision framework · The business and agricultural relief cap and what it means for property · Family investment companies and freezing portfolio value for inheritance tax · Making Tax Digital software for landlords
Several changes legislated in Finance Act 2026 land within the next two years. Advice given against the old position is worse than no advice, because it is confidently wrong. Our property tax rates reference carries the full set of thresholds if you want the detail before a call. Change Position From Rates on property income Separate rates of 22%, 42% and 47% replace 20%, 40% and 45% in England, Wales and Northern Ireland. Scotland is not affected for 2027/28 6 April 2027 Section 24 finance cost reducer Rises from 20% to 22%, tracking the new property basic rate, so the higher-rate wedge stays 20 points April 2027 Making Tax Digital for landlords Qualifying income over £50,000 from April 2026, over £30,000 from April 2027, over £20,000 from April 2028 April 2026 Writing down allowances Main pool falls from 18% to 14%, a new 40% first year allowance applies, special rate pool stays at 6% 2026/27 Dividend rates 10.75%, 35.75% and 39.35% 6 April 2026 Business asset disposal relief Rate of 18% 6 April 2026 Inheritance tax thresholds Frozen, with the combined business and agricultural relief allowance capped at £2.5m To 5 April 2031 Employer national insurance 15% with a £5,000 secondary threshold, relevant to company structures with staff Current * Note: Example figures displayed Background reading before you book These go deeper on the questions that come up most often in consultations. Article Choosing the right company structure for a property portfolio The structure you hold property in is not a paperwork choice, it is the single setting that decides how much of every year's rent you keep. Article What the 2027 rate changes do to Section 24 relief The separate property income tax rates of 22% basic, 42% higher and 47% additional from 6 April 2027 are now enacted in Finance Act 2026 c.11 section 7 (Royal Assent on 18 March 2026), for England and Northern Ireland. Article Capital gains tax deferral strategies for property investors CGT deferral on a UK property disposal pushes the tax point into the future without erasing the gain. Article Calculating the capital gains charge on transferring property to a company Transferring a rental property from your own name into a limited company looks, on paper, like an internal reshuffle. Article Capital allowances for property investors: the full decision framework Most capital-allowances guides start with the wrong question. Article The business and agricultural relief cap and what it means for property Note: the GOV.UK announcement-stage summary page still cites the £1m headline figure announced 30 October 2024; the enacted FA 2026 figure verified against legislation.gov.uk is £2.5 million. Article Family investment companies and freezing portfolio value for inheritance tax The Family Investment Company is one of the most-discussed and most-misunderstood structures in UK landlord IHT planning. Article Making Tax Digital software for landlords Making Tax Digital for Income Tax Self Assessment went live for property income on 6 April 2026 . Testimonials

#### What landlords say  (no id)
Anonymised feedback from landlords and investors we have worked with. “ They modelled our Section 24 position properly for the first time and showed us exactly where incorporation did and did not make sense. No hard sell, just the numbers. ” HL Higher-rate landlord 7-property portfolio, London “ We were weeks from missing the 60-day capital gains deadline on a sale. They turned the computation around and filed on time. Worth the fee on that alone. ” BI Buy-to-let investor Manchester “ Getting ready for Making Tax Digital felt overwhelming. They set up the software, mapped every property, and now the quarterly filing just happens. ” IL Individual landlord 2 properties, Leeds Free tools

#### Run the numbers yourself first  (no id)
Several of the questions people book a consultation for can be sized in a few minutes. If a calculator shows the effect is small, you may not need advice at all, and we would rather you found that out for free. For the incorporation decision specifically, our buy-to-let incorporation analysis sets out the full feasibility assessment, and our landlord tax guide covers the annual position most consultations start from. Section 24 Calculator Your extra tax bill Incorporation Calculator Worth moving to a company? MTD Checker Are you in scope? Stamp Duty Calculator Including the surcharge Free consultation

#### Get specialist property tax advice on the decision in front of you  (no id)
H3s: Book your free consultation
Tell us the decision you are weighing up. We will scope the question, quote a fixed fee, and tell you up front if you do not need us. One-off advice welcome No need to move your accounts to us Fixed fees, quoted upfront You approve the fee before any work starts 24-hour response Usually the same working day No obligation and no hard sell. If the answer is simple, we will just tell you. Book your free consultation I am a... Select... Individual landlord (1-3 properties) Portfolio owner (4-10 properties) Large portfolio (10+ properties) Property developer Something else Full name Email Phone Your situation A couple of sentences helps us prepare properly for your call. What's prompted this now? What do you want from the call? To answer your enquiry, your details may be shared with a firm from our specialist partner network who will contact you. If that firm is unable to help, your details may be passed to another firm in the network for the same purpose. By submitting this enquiry you confirm you understand this. See our Privacy Policy . Request callback We respond within 24 hours and store your details securely. You'll get a text and email from us straight away. A quick reply confirms your callback. FAQ

#### Questions about a consultation  (no id)
H3s: What is the difference between property tax advice and property accountancy? · Do I have to switch accountants to get advice from you? · What does a property tax consultation cost? · What should I bring to the first call? · Can you advise on a property I have already bought or sold? · Do you give advice on incorporation? · Is a property tax specialist worth it for a small portfolio? · Do you advise on commercial property as well as residential? · Can you help with an HMRC enquiry or an undisclosed rental period? · Do you work with landlords outside London? · How quickly can I get advice? · Will you tell me if I should do nothing?
What is the difference between property tax advice and property accountancy? Accountancy is the recurring work: bookkeeping, rental schedules, Self Assessment, company accounts, quarterly MTD submissions. Advice is a decision-shaped engagement with a defined question, a piece of analysis and a written answer. You can buy advice from us without moving your compliance work, and many people do exactly that. If you want the ongoing service, that sits on our property accountant page. Do I have to switch accountants to get advice from you? No. A consultation is a standalone engagement. Plenty of clients keep their existing accountant for the annual return and come to us for the decisions that fall outside their accountant's experience. The written note is prepared so it can be handed straight to them for implementation. What does a property tax consultation cost? It depends entirely on the question. A single disposal timing question is a much smaller piece of work than modelling a twelve property restructure across two spouses and a company. You get a fixed fee for a defined scope before any work begins, so you always know the cost in advance. Book a consultation and we will scope it on the call. What should I bring to the first call? A list of the properties with rough values and outstanding mortgages, how each is owned, your and your spouse's approximate income, and the decision you are trying to make. Purchase dates and prices help if you have them. If you do not have all of it, come anyway; we will tell you what else we need. Can you advise on a property I have already bought or sold? Yes, though the options narrow after completion. Before exchange we can influence ownership, funding and structure. After completion we work with reliefs, elections, allocation and disclosure. If a disposal has already happened and capital gains tax is due, the 60-day reporting deadline usually makes it urgent. Do you give advice on incorporation? Yes, and it is one of the most common questions we are asked. Incorporation is a decision with real upfront cost, so we model the capital gains and stamp duty exposure against the annual saving and the break-even point. Section 162 incorporation relief can defer the capital gains charge where the letting activity amounts to a business, but for transfers on or after 6 April 2026 it must be claimed rather than applying automatically, and the claim runs to the first anniversary of the 31 January following the tax year of the transfer. Our buy-to-let incorporation analysis covers how that assessment works and includes a calculator you can run yourself first. Is a property tax specialist worth it for a small portfolio? Sometimes not, and we will tell you when the answer is no. With one or two low-geared properties and a basic-rate income, there is often nothing meaningful to plan. The value appears when you are a higher-rate taxpayer, when borrowing is significant, when a disposal or purchase is coming, or when a portfolio is heading for an inheritance tax charge. Do you advise on commercial property as well as residential? Yes. Commercial and mixed use property brings its own questions: capital allowances on embedded fixtures, the option to tax for VAT, different capital gains treatment, and stamp duty at non-residential rates. These are areas where a generalist adviser most often leaves money on the table. Can you help with an HMRC enquiry or an undisclosed rental period? Yes. Unreported rental income is usually handled through the Let Property Campaign, where a considered voluntary disclosure produces a materially better outcome than waiting to be found. If you have already had a letter, get advice before you reply to it. Do you work with landlords outside London? We work with landlords and investors across the UK. The work is done by video call, phone and email, with documents exchanged securely, so where you live makes no difference to the service. Property tax rules are UK-wide, with the devolved differences in Scottish and Welsh land transaction tax handled where they apply. How quickly can I get advice? Scoping calls are usually available within a few days. Turnaround on the written note depends on the complexity and how quickly we get the figures from you. If there is a hard deadline, a completion date, a 60-day capital gains report or an HMRC response date, tell us on the first call and we will work to it. Will you tell me if I should do nothing? Yes. A recommendation to leave things as they are is a legitimate outcome, and a common one. Advice that only ever concludes with an expensive restructure is not advice.

**FAQ (schema, verbatim):**
- **What is the difference between property tax advice and property accountancy?** Accountancy is the recurring work: bookkeeping, rental schedules, Self Assessment, company accounts, quarterly MTD submissions. Advice is a decision-shaped engagement with a defined question, a piece of analysis and a written answer. You can buy advice from us without moving your compliance work, and many people do exactly that. If you want the ongoing service, that sits on our property accountant page.
- **Do I have to switch accountants to get advice from you?** No. A consultation is a standalone engagement. Plenty of clients keep their existing accountant for the annual return and come to us for the decisions that fall outside their accountant's experience. The written note is prepared so it can be handed straight to them for implementation.
- **What does a property tax consultation cost?** It depends entirely on the question. A single disposal timing question is a much smaller piece of work than modelling a twelve property restructure across two spouses and a company. You get a fixed fee for a defined scope before any work begins, so you always know the cost in advance. Book a consultation and we will scope it on the call.
- **What should I bring to the first call?** A list of the properties with rough values and outstanding mortgages, how each is owned, your and your spouse's approximate income, and the decision you are trying to make. Purchase dates and prices help if you have them. If you do not have all of it, come anyway; we will tell you what else we need.
- **Can you advise on a property I have already bought or sold?** Yes, though the options narrow after completion. Before exchange we can influence ownership, funding and structure. After completion we work with reliefs, elections, allocation and disclosure. If a disposal has already happened and capital gains tax is due, the 60-day reporting deadline usually makes it urgent.
- **Do you give advice on incorporation?** Yes, and it is one of the most common questions we are asked. Incorporation is a decision with real upfront cost, so we model the capital gains and stamp duty exposure against the annual saving and the break-even point. Section 162 incorporation relief can defer the capital gains charge where the letting activity amounts to a business, but for transfers on or after 6 April 2026 it must be claimed rather than applying automatically, and the claim runs to the first anniversary of the 31 January following the tax year of the transfer. Our buy-to-let incorporation analysis covers how that assessment works and includes a calculator you can run yourself first.
- **Is a property tax specialist worth it for a small portfolio?** Sometimes not, and we will tell you when the answer is no. With one or two low-geared properties and a basic-rate income, there is often nothing meaningful to plan. The value appears when you are a higher-rate taxpayer, when borrowing is significant, when a disposal or purchase is coming, or when a portfolio is heading for an inheritance tax charge.
- **Do you advise on commercial property as well as residential?** Yes. Commercial and mixed use property brings its own questions: capital allowances on embedded fixtures, the option to tax for VAT, different capital gains treatment, and stamp duty at non-residential rates. These are areas where a generalist adviser most often leaves money on the table.
- **Can you help with an HMRC enquiry or an undisclosed rental period?** Yes. Unreported rental income is usually handled through the Let Property Campaign, where a considered voluntary disclosure produces a materially better outcome than waiting to be found. If you have already had a letter, get advice before you reply to it.
- **Do you work with landlords outside London?** We work with landlords and investors across the UK. The work is done by video call, phone and email, with documents exchanged securely, so where you live makes no difference to the service. Property tax rules are UK-wide, with the devolved differences in Scottish and Welsh land transaction tax handled where they apply.
- **How quickly can I get advice?** Scoping calls are usually available within a few days. Turnaround on the written note depends on the complexity and how quickly we get the figures from you. If there is a hard deadline, a completion date, a 60-day capital gains report or an HMRC response date, tell us on the first call and we will work to it.
- **Will you tell me if I should do nothing?** Yes. A recommendation to leave things as they are is a legitimate outcome, and a common one. Advice that only ever concludes with an expensive restructure is not advice.

**Body links out today:** /, /blog/capital-gains-tax/cgt-deferral-strategies-property-investors-uk, /blog/capital-gains-tax/cgt-property-transfer-limited-company-calculate, /blog/incorporation-and-company-structures/how-to-choose-right-property-company-structure-uk-landlords-2026, /blog/landlord-tax-essentials/fic-estate-planning-landlord-portfolio-value-freezing-iht-mechanics, /blog/landlord-tax-essentials/iht-april-2026-bpr-apr-cap-property-impact, /blog/making-tax-digital-mtd/best-mtd-software-landlords-2026, /blog/property-types-and-specialist-tax/capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework, /blog/section-24-and-tax-relief/2027-property-tax-rates-section-24-relief-uk-landlords, /contact, /incorporation, /landlord-tax, /privacy-policy, /property-tax-rates, /services, /services/property-accountant

## 6. Links that will point at this page, and what their anchors promise (audit §2c; this page is `PTA`)

The page must answer what these anchors promise. Rows with Target `PTA` are yours. The applied set, with final wording, is `briefs/property/wp1-services/LINKS_APPLIED_2026-10-09.md`.

##### 2c. Proposed body links, by source type

Anchor class: **E** = exact family phrase (PA: property accountant(s), specialist property accountant, accountant(s) for property / property investors, property tax accountant, capital gains tax accountant; LA: landlord accountant(s), accountant(s) for landlords, buy to let accountant, accountant for rental property; PTA: property tax specialist(s), property tax adviser, (specialist) property tax advice). **V** = family phrase extended or close variant. **D** = descriptive. One link per source per owner page; body prose only. "Idx" = Google indexed. Sentences are proposals for the Opus/Fable writer, not final copy.

**Locations (template sentence `app/locations/[slug]/page.tsx:938-941`, all five Idx per INV_A)**

Existing: "We work with landlords across the UK, and we understand the specific dynamics of the {city} property market. Remote support with local market knowledge."

Proposed: "We work with landlords across the UK, and we understand the specific dynamics of the {city} property market: {city} landlords get the same {link} we run nationally, with local market knowledge on top." Per-city anchor map:

| City | Anchor | Target | Class |
|---|---|---|---|
| london | property accountants who act across the UK | PA | V |
| birmingham | UK-wide property accountancy service | PA | V |
| manchester | landlord accountancy service | LA | V |
| leeds | accountants for landlords | LA | E |
| bristol | property tax specialists | PTA | E, **defer**: plan §8.3 do-not-touch; STATE.md:26 decision 4 sequencing |

**Pillar guides**

| Source:line | Idx | Existing sentence (quoted) | Proposed rewrite (anchor in [ ]) | Target | Class |
|---|---|---|---|---|---|
| landlord-tax/page.tsx:1260-1262 | yes | "The decisions that repay a specialist several times over are the structural ones:" | "The decisions that repay [specialist property tax advice] several times over are the structural ones:" | PTA | E |
| landlord-tax/page.tsx:1277-1281 | yes | "…Those points are worth more than the compliance fee, and they are only visible to someone who looks at rental portfolios every week." | "…they are only visible to [a property accountant who looks at rental portfolios every week]." | PA | V |
| landlord-tax:1286 | yes | already links LA | keep | LA | V |
| section-24/page.tsx:364-366 | yes | "Most landlords felt the bill rise without ever being told why, or whether theirs was even calculated correctly." | "…or whether theirs was even calculated correctly, which is the first thing a [landlord accountant] checks." | LA | E |
| section-24/page.tsx:1046-1047 | yes | "A generalist accountant will file your return correctly. The difference here is that we look at the structure behind the return…" | "A generalist accountant will file your return correctly. The difference with a [specialist property accountant] is that we look at the structure behind the return…" | PA | E |
| section-24:811 | yes | already links PTA | keep | PTA | V |
| incorporation:500, :502 | yes | already links PTA and PA | keep; no natural LA slot | | |
| making-tax-digital-landlords/page.tsx:1240-1241 | yes | "Any competent accountant can file a quarterly update. The value is in what surrounds it, and the five situations below…" | "Any competent accountant can file a quarterly update. The value [a specialist accountant for landlords] adds is in what surrounds it, and the five situations below…" | LA | V |
| making-tax-digital-landlords/page.tsx:1212-1213 | yes | "Most landlords who come to us want the quarterly cycle to stop being their problem. Once you authorise us as your agent, we file for you and you send us data once a quarter." | "…we file for you and you send us data once a quarter, as part of our wider [property accountancy service]." | PA | V |
| leasehold/page.tsx:357-361 | yes | "Costs sit on top of the premium." | "Costs sit on top of the premium, and so does the tax: the stamp duty and base-cost questions a [property tax adviser] settles before you serve notice." (weak fit; prose here is non-tax) | PTA | V |
| landed-estates/page.tsx:418-419 | yes | "We work alongside those advisers rather than replacing them. What we do is the inheritance tax and capital tax position on the land…" | "…What [our advisory work] covers is the inheritance tax and capital tax position on the land…" | PTA | D |
| landlord-compliance:863 | yes | already links LA | keep | LA | V |
| spv-company/page.tsx:294-296 | yes | "…how to move property in without an avoidable tax bill, and how to run and eventually unwind it." | "…and how to run and eventually unwind it, which is the work of an [accountant who runs property companies]." | PA | D |
| property-tax-rates/page.tsx:439-440 | yes | "These figures are a quick reference and not a substitute for advice on your own position." | "These figures are a quick reference and not a substitute for [advice on your own position]." | PTA | D |

**The three pages and NRL, cross-links**

| Source:line | Existing | Proposed | Target | Class |
|---|---|---|---|---|
| LA:546 | "As an accountant for property investors, four things carry most of the risk." | link "[accountant for property investors]" | PA | E |
| PTA:504-508 | "…that is a different service and it lives on our property accountant page." | add: "If you hold property personally and only need the returns, our [landlord accountant service] covers that." | LA | V |
| PA:512-516, PTA:507, LA:554, NRL:492 | existing | keep | | |

**/for pages (`Property/web/src/data/audiences.ts`, intro strings; all 15 Idx per INV_A)**

| Row (intro line) | Existing sentence | Proposed | Target | Class |
|---|---|---|---|---|
| moving-property-into-a-limited-company (:29) | "One of our property tax specialists starts with the market value and debt on each property…" | "One of our [property tax specialists] starts with…" | PTA | E |
| selling-a-buy-to-let (:129) | "The gain computation comes to you line by line, the return is prepared and filed, and the same figures carry into your self assessment." | "…the return is prepared and filed by a [capital gains tax accountant who works only on property], and the same figures…" | PA | V |
| portfolio-landlords-incorporating-a-partnership (:225) | "Everything rests on a prior question: whether a partnership genuinely exists in law, and how long it has run." | "Everything rests on a prior question, the first one our [incorporation advice] answers: whether a partnership genuinely exists in law…" | PTA | D |
| non-resident-landlords (:327) | already links `/services/non-resident-landlord` | none (NRL is the owner) | | |
| property-spv-set-up (:428) | "…and the first-year filing dates are already on a calendar." | "…already on a calendar, with our [accountancy service for property investors] ready to file them." | PA | V |
| gifting-property-to-family (:528) | "Two numbers decide it: the cost of gifting now and the cost of doing nothing." | "Two numbers decide it, and [one-off property tax advice] puts a figure on both: …" | PTA | V |
| couples-splitting-rental-income (:628) | "A specialist starts with the title, not the tax…" | "[An accountant for landlords who co-own] starts with the title, not the tax…" | LA | V |
| landlord-self-assessment-and-mtd (:731) | "One person then holds the start date, the filing calendar…" | "One person on our [landlord accountancy service] then holds…" | LA | V |
| first-time-and-accidental-landlords (:836) | "…ending with a call with one of our accountants." | "…ending with a call with one of our [accountants for landlords]." | LA | E |
| inherited-property (:938) | "A specialist starts with the probate value…" | "A [property tax adviser] starts with the probate value…" | PTA | E |
| property-company-profit-extraction (:1033) | "A specialist looks first at what your director's loan account really stands at…" | "A [property company accountant] looks first at…" | PA | D |
| rental-income-disclosure (:1131) | "Your accountant prepares the notification…" | "Your [landlord tax accountant] prepares the notification…" | LA | V |
| holiday-let-and-serviced-accommodation (:1232) | "A specialist starts with how each property is run…" | "A [specialist property accountant] starts with how each property is run…" | PA | E |
| hmo-and-multi-let-landlords (:1332) | "Those four are written up against your own figures, and our team prepares the returns." | "…and our [team of HMO and multi-let accountants] prepares the returns." | LA | D |
| landlord-retirement-and-succession (:1434) | "The documents your accountant prepares for your solicitor follow from it." | "The documents your [property tax accountant] prepares…" | PA | E, **defer** (ranks #1 for "property tax accountant", plan §8.3; STATE.md:26 decision 4) |

**Services index** `app/services/page.tsx`: each owner page already has one body card link (:412-425). No further link (one per source per owner page).

**Homepage services section** `app/page.tsx:278-280` (frozen; needs a per-page `signoff:` line in `docs/_engines/property_frozen_pages.md:23`; STATE.md:26 sign-off covers the title only):

Existing: "Property-only focus means we understand Section 24, MTD, incorporation, and CGT inside out, at every scale from individual landlords with a single flat to large portfolio owners."

Proposed: "…at every scale, from [individual landlords with a single flat] (LA, D) to [large portfolio owners] (PA, D). If you only need one decision modelled, [one-off property tax advice] (PTA, V) is a separate service." Note `WhatWeCoverSection` (rendered :301) is shared with /contact; editing it would add links to /contact too.

**Indexed posts, by category.** R = repoint an existing head-term link that currently targets `/blog/property-accountant-services/what-does-a-property-accountant-do` (that post keeps 135 body inlinks minus these). N = new link in an unlinked sentence. Idx source: INV_B (2026-10-07) for property-accountant-services rows, otherwise `gsc_url_inspection` 2026-09-26.

*Property Accountant Services*

| File:line | Type | Existing sentence | Proposed | Target | Class |
|---|---|---|---|---|---|
| what-does-a-property-accountant-do.md:63 | R (from `/`) | "see our main <a href="/">property accountants</a> page for UK-wide Section 24, MTD, and incorporation advice." | repoint href to PA, anchor [property accountants] unchanged | PA | E |
| how-to-choose-a-property-accountant.md:52 | R | "A [property accountant] who works predominantly with landlords treats these as everyday questions." | anchor [property accountant who works predominantly with landlords] | PA | V |
| coventry-property-accountant.md:52 | N | "That is the case for joined-up advice from someone who works with property all day rather than as a sideline." | "…joined-up advice from [an accountant who works with property all day] rather than as a sideline." | PA | D |
| portsmouth-property-accountant-landlord-tax-services.md:48 | N | "A property specialist focuses on the issues that recur for landlords…" | "A [property-focused accountant] focuses on…" | PA | D |
| why-luton-landlords-need-specialist-property-accountant-2026.md:39 | N | "For most landlords in 2026 the honest answer leans towards specialist expertise." | "…leans towards [specialist property accountancy]." | PA | V |
| property-accountant-glasgow.md:43 | N | "Getting the interaction right is where specialist advice earns its place." | "…is where [specialist advice] earns its place." | PTA | D |
| property-accountant-leicester.md:45 | N | "…the case for specialist accountancy support strengthens at modest portfolio sizes." | "…the case for [specialist accountancy support for landlords] strengthens…" | LA | D |
| liverpool-property-accountant-tax-services-landlords.md:137 | N | "A property accountant configures the chart of accounts so each property's profit reads cleanly…" | "A [landlord accountant] configures…" | LA | E |
| why-cardiff-landlords-need-specialist-property-accountant-2026.md:39 | N | "…a general accountant who treats Cardiff like any English city will miss the parts that matter." | "…will miss the parts that matter, which is the gap a [specialist landlord accountant] closes." | LA | V |
| vat-calculation-calculator.md:117 | N | "If in doubt, consult a specialist property accountant who deals with VAT on property every day." | anchor [specialist property accountant who deals with VAT] | PA | V (plan D4 may move this post) |
| vat-how-to-calculate.md:148 | N | "…or get in touch for advice tailored to your portfolio." | "…or get in touch for [advice tailored to your portfolio]." | PTA | D (D4 candidate) |
| property-accountant-bournemouth-landlords-tax-services.md:45 | none | only sentence uses the city phrase as a bold head term | needs a read | | |
| belfast-…, slough-… | defer | indexed; plan §8.3 guardrail and decision 4 | after new owners are fetched | | |
| how-much-does-a-property-accountant-cost.md | frozen | `property_frozen_pages.md:15`, signoff none | needs signoff | | |
| can-you-claim-aia-on-second-hand-assets.md | exclude | frozen (:18), Bing position 1 to 2 (BING_G) | none | | |

*Section 24 and tax relief*

| File:line | Type | Existing sentence | Proposed | Target | Class |
|---|---|---|---|---|---|
| how-to-calculate-section-24-tax-credit-step-by-step.md:182 | R | "That modelling is where a [specialist property accountant] earns their keep…" | repoint, anchor unchanged | PA | E |
| section-24-tax-credit-20-percent-basic-rate-relief.md:163 | R | "…that is exactly the kind of work a [property accountant] does." | "…the kind of work [our property accountancy service] does." | PA | V |
| section-24-self-assessment-tax-return.md:180 | R | "A [property accountant] can model those interactions… and check the return ties up before it is filed." | anchor [landlord accountant preparing the return] | LA | V |
| section-24-personal-allowance-60-percent-tax-rate-landlords.md:152 | R | "A [property accountant] can calculate your adjusted net income…" | "A [specialist looking at your whole tax position] can calculate…" | PTA | D |
| tax-relief-mortgage-interest-rented-property-guide.md:117 | R | "[A property accountant] can confirm the relief is being claimed correctly…" | "[An accountant for landlords] can confirm…" | LA | E |
| replacement-domestic-items-relief-uk-landlords-guide.md:279 | R | "…a [specialist property accountant] can review your replacement spend…" | "…a [landlord tax accountant] can review…" | LA | V |
| mortgage-arrangement-fees-deductible-landlord.md:166 | R, **frozen** (:14) | "A [specialist property accountant] earns their place by getting the classification right first time…" | "A [specialist accountant for landlords] earns their place…" | LA | V, needs signoff |
| finance-costs-section-24-complete-guide.md:220 | N | "…that is the point to take advice rather than rely on default software treatment." | "…that is the point to [take specialist advice] rather than…" | PTA | D |
| section-24-interest-only-mortgage-tax-planning.md:272 | N | "A specialist property accountant can model the interest-only and repayment paths against your actual income…" | anchor [model the interest-only and repayment paths] | PA | D |
| section-24-child-benefit-high-income-charge-landlords.md:111 | N | "A property accountant who models adjusted net income alongside your rental profit…" | "[A property tax adviser who models adjusted net income] alongside…" | PTA | V |
| section-24-repeal-future-reversed.md:142 | N | "…our property tax team can talk it through." | "…our [property tax advice team] can talk it through." | PTA | V |
| section-24-vs-incorporation-which-saves-more-tax.md:208 | N | "Model your specific position before committing, or speak to a specialist who can look at the whole picture…" | "…or [speak to a specialist] who can look at the whole picture…" | PTA | D |
| annual-investment-allowance-uk.md:105 | N | "A specialist property accountant can scope the claim before you file." | anchor [scope the claim before you file] | PA | D |
| mortgage-interest-deductible-landlords-uk-2026.md:100 | N | "A specialist review of your last filed return often surfaces a missed credit." | "A review of your last filed return by [a landlord's accountant] often surfaces a missed credit." | LA | D |
| rental-income-tax-uk-complete-guide-landlords.md:263 | N | "…these are the situations where a specialist property accountant routinely finds tax that would otherwise be overpaid:" | "…where an [accountant for rental property] routinely finds…" | LA | E |
| landlord-tax-deductions-uk-2026-complete-list.md:176 | N | "A specialist property accountant can review your spend before you file." | "[An accountant who prepares landlord returns] can review your spend before you file." | LA | D |
| Idx with no natural sentence found by scan (needs a read) | | can-section-24-push-higher-rate-tax, section-24-2027-tax-year-planning-uk-landlords, section-24-higher-rate-taxpayers-2026, section-24-tax-relief-complete-guide; section-24-2027-tax-year-planning-landlords:109 is already linked to how-to-choose | | | |

*Incorporation and company structures*

| File:line | Type | Existing sentence | Proposed | Target | Class |
|---|---|---|---|---|---|
| 2027-tax-rates-incorporation-decision-uk-landlords.md:164 | R | "If incorporation is on your mind, a [specialist property accountant] can run those scenarios for your portfolio." | "…a [property tax adviser] can run those scenarios…" | PTA | E |
| corporation-tax-rates-property-companies-2026-27.md:136 | R | "A [property accountant] can model the specific numbers before you commit to a structure…" | "An [accountant for property companies] can model…" | PA | V |
| corporation-tax-vs-income-tax-landlords-2027.md:201 | R | "A [specialist property accountant] can run those scenarios on your actual figures and tell you which regime…" | "[Specialist property tax advice] runs those scenarios… and tells you which regime…" | PTA | E |
| sdlt-transfer-property-company-cost.md:241 | R | "A specialist [property accountant] can model the SDLT, the CGT, the section 162 and Schedule 15 positions…" | "A specialist [adviser on property incorporations] can model…" | PTA | D |
| section-162-incorporation-relief-property-landlords.md:179 | R | "A [specialist property accountant] can model the total cost over several years…" | "Our [property tax advice service] can model…" | PTA | V |
| when-does-hmrc-accept-rental-property-incorporation-business.md:210 | R | "If you are weighing incorporation, a [property accountant] can assess whether your activity clears the Ramsay threshold…" | "…[an adviser who models incorporations] can assess…" | PTA | D |
| property-investment-company-structure-planning.md:176 | N | "…a structure-choice decision is one worth modelling with a property tax specialist before you incorporate anything." | anchor [worth modelling with a property tax specialist] | PTA | V |
| incorporation-holdover-relief-property.md:196 | N | "…talk to a specialist who can confirm the mechanism for your situation." | "[talk to a specialist] who can confirm…" | PTA | D |
| incorporating-property-portfolio-uk-2026.md:158 | N | "If that is your position, take advice specific to it rather than following this sequence." | "…take [advice specific to it] rather than…" | PTA | D |
| spv-property-investment-special-purpose-vehicle-guide.md:262 | N | "The decisions worth getting professional input on at the SPV setup stage are the share structure…" | "The decisions worth taking to [an accountant who sets up property SPVs] at the setup stage are…" | PA | D |
| buy-to-let-limited-company-complete-guide-uk.md:190 | N | "Take specialist advice before relying on it." | "[Take specialist advice] before relying on it." | PTA | D |
| starting-property-business-sole-trader-vs-ltd-vs-partnership.md:322 | N | "Get specialist advice before relying on incorporation relief for a letting portfolio." | "[Get specialist advice] before relying on…" | PTA | D |
| Idx, needs a read | | alphabet-shares…, extraction-while-incorporating…, incorporate-rental-property-without-cgt, incorporation-existing-portfolios-phased-approach, partnership-sdlt-relief…, pre-sale-extraction…, property-company-group-relief…, property-spv-employer-pension…, sdlt-incorporation-stamp-duty-twice, section-24-impact-on-company-formations-data, time-pressure-extraction… | | | |

*Landlord tax essentials, MTD, CGT, property types, portfolio, finance*

| File:line | Type | Existing sentence | Proposed | Target | Class |
|---|---|---|---|---|---|
| landlord-tax-changes-2026-complete-guide.md:198 | N | "A specialist property accountant can keep you compliant through the MTD transition and model the rate change against your actual numbers." | anchor [specialist property accountant] | PA | E |
| landlord-tax-return-complete-guide-2026.md:218 | N | "A specialist property accountant can make sure the return is right…" | "An [accountant who specialises in landlord returns] can make sure…" | LA | D |
| landlord-tax-calendar-2026-27-key-dates.md:220 | N | "A specialist property accounting team handles the diary, the software, the quarterly filings…" | "A [specialist landlord accounting team] handles…" | LA | V |
| record-keeping-landlords-what-track-how-long-keep.md:257 | R | "A [specialist property accountant] can set up the system…" | "[An accountant who works with landlords] can set up…" | LA | D |
| what-repairs-can-landlords-deduct-from-rental-income.md:169 | N | "A specialist property accountant can review the work, apportion any genuine improvement element…" | "A [buy-to-let accountant] can review the work…" | LA | E |
| inheritance-tax-rental-property-uk-guide.md:205 | N | "Specialist advice is essential before any large-scale lifetime gift." | "[Specialist advice] is essential before…" | PTA | D |
| property-investment-tax-uk-complete-guide-2026.md:253 | N | "A specialist property accountant can help you sequence the buy, hold, sell and pass-on decisions…" | "An [accountant for property investors] can help you sequence…" | PA | E |
| mtd-penalties-landlords-miss-deadline.md:185 | R | "…hand the quarterly cycle and the year-end final declaration to [a property accountant], who manages both together…" | "…to [a landlord accountant], who…" | LA | E |
| mtd-quarterly-reporting-landlords-step-by-step-guide.md:99 | N | "A specialist property accountant can set up your software, agree the category mapping with you once…" | "An [accountant who runs MTD for landlords] can set up…" | LA | D |
| making-tax-digital-property-income-2026-complete-guide.md:95 | N | "If an accountant files for you, the route is the Agent Services Account (ASA)." | "If [an accountant for landlords] files for you…" | LA | E |
| best-mtd-software-landlords-2026.md:152 | N | "The situations where a property accountant typically adds material value alongside the software:" | "…where [an accountant who files for landlords] typically adds…" | LA | D |
| cgt-selling-buy-to-let-property-calculation-guide.md:192 | R | "A [property accountant] works the disposal calculation, the 60-day return and the reliefs together…" | anchor [property accountant handling the sale] | PA | V |
| cgt-selling-multiple-properties-same-year.md:175 | R | "A [specialist property accountant] can build that model, confirm the 60-day obligations on each sale…" | "A [property tax specialist] can build that model…" | PTA | E |
| cgt-payment-deadlines-property-sales-2026.md:84 | N | "If an accountant files for you, ask to see the calculation before it goes in…" | "If a [capital gains tax accountant] files for you…" | PA | E |
| commercial-property-tax-landlords-rates-reliefs-allowances.md:199 | R | "A [specialist property accountant] brings the heads together into one plan." | "An [accountant who works on commercial property every week] brings…" | PA | D |
| section-24-commercial-property-complete-guide.md:92 | R | "A specialist [property accountant] will pin the classification down…" | "A [specialist who works on commercial lettings] will pin…" | PA | D |
| integral-features-capital-allowances.md:171 | N | "A property accountant experienced in capital allowances can identify the qualifying expenditure…" | anchor [property accountant experienced in capital allowances] | PA | V |
| vat-dilapidations-payments-tenant-landlord-vat-treatment-supply-or-damages.md:130 | N | "…a 30-minute call with a VAT-aware property accountant before signing typically pays for itself…" | anchor [VAT-aware property accountant] | PA | V |
| hmo-tax-guide-rental-income-deductions-multi-tenant.md:189 | N | "…a specialist review can confirm your income and expense position…" | "…a review by [an accountant for HMO landlords] can confirm…" | LA | V |
| leasehold-reform-act-2024-what-is-in-force.md:162 | N | "…and speak to a property tax adviser before you commit…" | "…and [speak to a property tax adviser] before you commit…" | PTA | V |
| budgeting-voids-repairs-rental-cash-flow.md:177 | N | "…are where a specialist property accountant earns their place…" | anchor [specialist property accountant] | PA | E |
| refinancing-rental-property-when-does-it-make-financial-sense.md:62 | R | "This is exactly the kind of apportionment a [property accountant] handles routinely…" | repoint, anchor unchanged | PA | E |
| portfolio-landlord-mortgages-guide.md:95 | N | "…a decision on structure that a tax adviser has already sense-checked." | "…that [a tax adviser] has already sense-checked." | PTA | D |
| non-resident-landlords-uk-inheritance-tax-exposure.md:165 | N | "Careful modelling with a tax adviser is essential before proceeding." | "Careful [modelling with a tax adviser] is essential…" | PTA | D |
| Idx, needs a read | | landlord-tax-essentials/tenancy-deposits-landlord-tax-position, portfolio-management/multi-property-landlord-tax-planning-strategies-5-plus-properties, portfolio-landlord-tax-planning-strategy-guide, property-finance/sic-code-for-an-spv-property-company, spv-mortgage-no-income-newly-formed, spv-mortgages-explained | | | |

Other `R` repoint candidates exist in 24 **unindexed** posts (scratch list; e.g. buy-to-let-accountants-near-me-guide:64, section-24-multiple-properties-cumulative-impact:157); they do not count toward the target.

## 7. Give-up pages and the links-in rules (blueprint §4, §5)

#### 4. The pages that give up phrases (and what they keep)

Filled from the assignment table's "give up" list. Rule for each: title and H1 re-aimed at the page's own intent (city or guide), one body link added to the owner page with the family phrase as the anchor, nothing else changed, URL untouched, done only after R6's condition is met.

| Page | Phrase it gives up | What it keeps | Change |
|---|---|---|---|
| homepage `/` | "property accountants uk", "uk property accountants" | brand, umbrella | title → brand-and-umbrella (R3, R26, signed off). The services-section links (`app/page.tsx:278-280`) are a separate edit to a frozen page and need the S2 sign-off, which is not yet recorded (§11). |
| `/locations/bristol` | "property accountant", "property tax accountant near me", "property specialist accountant" | "accountant in bristol", "property accountant bristol" | title "Property Accountant in Bristol | ..." (already), body link to owner |
| `/locations/birmingham` | "property accountants", "buy to let accountants", "accountants for buy-to-let landlords" | "property accountant birmingham", "west midlands" | body link to owner |
| `/locations/manchester`, `/locations/leeds` | national forms | city forms | body link to owner |
| Belfast post | "accountants for landlords", "landlord accountants", "property tax accountant" | Belfast forms | title re-aimed to Belfast, body link, after R6 |
| Manchester post | "property tax specialist" (147) | nothing: it has redirected to `/locations/manchester` since 5 Aug (the city posts for London, Manchester, Birmingham, Leeds and Bristol all 301 to the city pages; Google still lists the old URL as "Page with redirect") | none; the phrase passes to `/services/property-tax-advice` through the city page's body link |
| `/landlord-tax` guide | "landlord tax advice", "tax advice for landlords" (351 impressions, R15) | its explainer queries ("landlord tax", "what tax do landlords pay") | body link to `/services/property-tax-advice` with an advice anchor and to `/services/landlord-accountant` with a hire anchor; title untouched |
| explainer post `/blog/property-accountant-services/what-does-a-property-accountant-do` | nothing in title (it is a "what does ... do" explainer); it held #4 for "property accountant" in two of three pulls on 9 Oct | its explainer intent | body link to `/services/property-accountant` in its "getting help" paragraph with the family anchor; title untouched; never retitled toward the hire phrase |
| `/for/landlord-retirement-and-succession` | "property tax accountant" | its audience phrase | body link to `/services/property-accountant` |
| `/for/selling-a-buy-to-let` | "buy to let accountant" | "cgt accountant" | body link to `/services/landlord-accountant` |
| career post `how-to-become-property-accountant` | nothing to do: noindexed, Google read the tag on 3 Sep; the stale copy clears on its own | | none |

#### 5. Links in (the 30-plus per page, placed naturally)

Owner, 2026-10-09: "We also need to think about the other pages that are going to be linking to these pages (naturally)." The link is only worth having if a reader would follow it, so every link is a sentence that belongs in its source page, not a module bolted on. The per-source list (file, indexed or not, the paragraph it sits in, the proposed sentence, the anchor, the owner page) is in `AUDIT_IMPL_2026-10-09.md` §2 and is the working truth; this section is the rules it was built under.

##### 5.1 Rules

1. **Body copy only.** A link in a sidebar, footer, "related" module, breadcrumb or the header does not count toward the 30. Those exist or will exist (header, WP1.1) and are what gets the page fetched; the body links are what tell Google what the page is for.
2. **One link per source page per owner page.** A guide may link to all three service pages if it naturally touches all three subjects, once each. A city page links to all three (its service list) and nothing more.
3. **The link sits where the subject comes up.** The sentence it lives in must already be about hiring help, fees, what an accountant does, or the service in question. If the source has no such sentence, write one that answers a question the page's reader has at that point ("if you would rather hand this to someone, ...") and place it after the section that raises the need, never in the opening paragraph and never as the last line of the page.
4. **Anchor text varies.** At most one third of the links to an owner page carry the exact family phrase ("property accountant", "landlord accountant", "property tax advice"). The rest are natural variants from the assignment table's `body` rows ("accountants for landlords", "specialist property accountants") or descriptive phrases ("our landlord accountancy service", "a fixed-fee review of your position"). No two source pages of the same type use the same sentence.
5. **The anchor matches the destination's intent.** Hire intent anchors go to a service page; "what is Section 24" style anchors go to the guide. A city page's "property accountant in Leeds" anchor stays on the city page (R4) and must not point to the national page.
6. **Never from a page that gives up a phrase in its title before R6's condition.** The body link is added at step 8 of §6 (it is the mechanism that hands the phrase over); the title change waits for the day-14 read.
7. **Posts are edited individually.** Each post is its own content file; there is no template edit that counts as a body link. A shared post component that could add a link to all 800 posts in one edit is the opposite of natural and is not used for this (the audit names the component so nobody reaches for it).
8. **Indexed first.** Order of effort: the five `/locations/<city>` pages, the seven pillar guides, the `/for/*` pages, the services index, the homepage services section, then indexed posts in the family's category in descending Search Console impressions. Unindexed posts are linked when the editor is already in the file, and are not counted.
9. **The owner reads the sentences.** The 30-plus sentences per page are listed in the audit with before and after text; the human read at step 10 of §6 covers them, not just the three pages.

##### 5.2 What "natural" looks like, by source type

| Source type | Where the link goes | Example sentence shape |
|---|---|---|
| `/locations/<city>` | the services list and the "how we work with <city> landlords" section | "Our [landlord accountants] handle the self assessment, the Section 24 workings and the company accounts; the Leeds page is about how we work with you locally." |
| Pillar guide (`/landlord-tax`, `/section-24`, `/incorporation`, `/making-tax-digital-landlords`, `/leasehold`, `/landed-estates`, `/landlord-compliance`) | the "what to do next" or "getting help" section the guide already has, or the paragraph that first says the calculation is hard | "If the numbers above are close, a [specialist property tax adviser] will model both routes before you decide." |
| `/for/<audience>` | the paragraph that names the service the audience needs | "Most clients in this position use our [fixed-fee landlord accountancy] rather than a general practice." |
| Services index `/services` | the card copy, already linking; no change beyond the card title if the page title changes | n/a |
| Homepage | the services section (S2 sign-off given) | the three cards, titles equal to the new H1s |
| City posts (40) | the paragraph that recommends getting an accountant, which every city post has | "A [property accountant who works UK-wide] will usually be cheaper than a local generalist for a portfolio this size." |
| Topic posts (Section 24, MTD, CGT, incorporation, SDLT) | the "get advice" paragraph | the family phrase that matches the post's subject, to the matching owner |
| Career post | none (noindexed) | n/a |

##### 5.3 The count

Target 30 body links per owner page from indexed sources. The audit §2d found them: 38 / 35 / 36 achievable, 37 / 33 / 35 without the items that need a sign-off (homepage section, two frozen posts) or are deferred to step 13 (Belfast, Slough, Bristol, retirement-and-succession). Exact-match share of the new anchors is 29% / 30% / 19%, inside rule 4. Today the counts are 4 / 5 / 5, all from `.tsx` pages; no blog post links to any of the three. The single largest item is the 45 posts (21 indexed) that already use "property accountant" or "specialist property accountant" as an anchor but point at the explainer post; those anchors are repointed to `/services/property-accountant` (audit §2c "R" rows), which is a one-line edit per post and the most natural link on the site because the sentence already exists. Two mechanics the audit settled: posts are one `.md` file each with an HTML body, so the city posts need one edit per post (rule 7 stands); the `/locations/[slug]` template renders one shared sentence at `app/locations/[slug]/page.tsx:938-941`, so the five city pages' links are one edit with a different anchor and sentence per city, which counts as five body links because each page renders its own sentence in its own body (ruling needed from the owner only if he disagrees; §11). About 20 indexed posts had no natural sentence in the audit's scan and are listed by name there; they are not linked unless a human finds the sentence. Thirty is a target, not a floor that licenses an unnatural sentence.

## 8. Preserve through the rewrite (audit §6; column `PTA`)

#### 6. Non-copy elements to preserve through a rewrite

| Element | PA | LA | PTA |
|---|---|---|---|
| `import type { Metadata }`, `Link`, component imports | :1-34 | :1-32 | :1-37 |
| Path constant | `PAGE_PATH` :36 | `PAGE_PATH`, `PAGE_URL` :34-35 | `PAGE_PATH`, `pageUrl` :39-40 |
| `export const metadata` (static; no `generateMetadata` on any of the three) with canonical, `languages` en-GB + x-default, openGraph type website, twitter summary_large_image | :49-73 | :48-72 | :52-76 |
| Service JSON-LD (add @id, provider @id, areaServed "United Kingdom", hasOfferCatalog per SCHEMA_F §6a) | :352-383, emitted :388-391 | :283-300, emitted :315-318 | :402-423, emitted :428-431 |
| FAQPage builder and parity (12 questions; plan guardrail: count stays 12) | `buildFaqPageJsonLd` :393-395 | inline :301-309 | `buildFaqPageJsonLd` :433-435 |
| `<Breadcrumb>` (emits BreadcrumbList) | :401-407 | :326-332 | :443-449 |
| `hasOfferCatalog` derived from the visible `coverage` array so copy and schema cannot drift | :375-382 | none | none |
| Anchor ids | `#included` :533, `#free-tools` :685, `#book` :724 | `#free-tools` :720, `#book` :733, `#faqs` :746 | `#free-tools` :698, `#book` :737, `#faqs` :754 and `#faq` :755 (both kept on purpose, comment :750-753) |
| `scroll-mt-24` on anchored blocks | yes | yes | yes |
| data-cta ids (section 1e) | hero_book, hero_calculators, prompts_book, included_book, difference_book, fees_book | hero_book, hero_calculators, section24_book, agents_book, comparison_book | hero_book, triggers_book, deliverables_book, comparison_book (hero secondary has none) |
| Hero primary to `/contact`, `#book` panels kept (`845f0d7c`, STATE.md:30) | :418 | :343 | :462 |
| LeadCTAPanel (only page form, `form_id` lead_form) | :725-734 | :734-743 | :738-747 |
| CalculatorTabs and the per-tool link rule (test :104-107, :182-196) | tabs, zero `/calculators/<slug>` links, exempt | tabs plus 3 per-tool links (:392, :505, :605), must keep ≥1 | `tabs={["section24","incorporation","mtd","stampduty"]}` :715, zero links, exempt |
| Even-length `PromptMarquee` arrays (comment: odd count shows a seam) | `clientPrompts` 6, :80-114 | | `triggerPrompts` 6 with `detail`, :126-172 |
| RelatedArticles lists (carve-out 5 comments) | `feedingPosts` 8, :241-281 | | `backgroundReading` 8, :294-333 |
| `ExampleFigureNote` on figure tables (owner rule 33) | | | :673 |
| CardCarousel per-card `href` (LPC link) | | :127-128, comment :405-414 | |
| Owner comments that record decisions | :38-48 (title kept vs designer), :232-235 (24h owner question), :636-641 (DECISION I, no invented fee), :703-719 (OWNER DECISION 2026-08-23 tabs only) | :37-47, :405-414 | :42-51, :174-181, :676-682, :717-730 |
| Shared components a copy edit might be tempted to change | TestimonialsSection (reaches frozen homepage), site-stats (homepage, /about), FaqSection (all Property FAQ pages) | same | same |

No test snapshots or renders these three pages. Tests that read their source: `calculator-tabs-crawl-path.test.ts` (all three) and `nav-active-state.test.ts` (nav config only). `consent-anchor-drift.test.ts` reads niche configs, not page copy.

---

## 9. How the page is reviewed after you hand it back (blueprint §12.3)

##### 12.3 Contextual layer: section-in-page review, two readers, fixed questions, quotes not scores

The thing the owner is asking for, and the thing a checklist cannot do: is this sentence right here, in this page, for this reader. Two Opus or Fable reviewers per page, run in parallel, neither sees the other's output, neither sees the writer's notes. Each gets the whole rendered page, the spec (§12.1), the research pack, the assignment rows, and the 9 Oct snapshot of the old page. Each answers the fixed questions below, section by section, with quotes. A reviewer may not answer with a score or an adjective; every finding is a quoted sentence plus the rule or spec line it breaks plus the proposed replacement sentence. Findings are typed BLOCK (fact, claim, ruling breach), FIX (clear improvement with a replacement) or NOTE (judgement, for the owner).

Per section, in reading order, with the section's heading and its position in the page stated:

1. Does the first sentence answer what the heading promises? Quote the heading and the first sentence. If not, write the sentence that would.
2. Which one sentence in this section could be deleted with no loss to the reader? Name it, or state "none" and why. (Forces the padding question every time.)
3. Does any sentence here repeat a point made elsewhere on the page? Quote both and say which should go.
4. Does any sentence exist for a query rather than a reader? Quote it, name the query from the assignment table, and either rewrite it so it reads as prose or move the phrase to the coverage statement.
5. Does this section contradict the opening paragraph, the FAQ, the schema, `house_positions.md`, or the old page's facts (§12.2 check 20 list)? Quote both sides.
6. Would the firm say this? Compare against the owner-voice examples in the spec: quote the nearest owner sentence and say whether this one matches its register (direct address, plain nouns, one claim per sentence, no hedging stack).
7. What does the reader still not know at the end of the section that the heading implied they would? One line.
8. Is the section in the right place? If a reader who just finished the previous section would not ask this question next, say where it belongs.

Per page, after the sections:

9. The reader walk, three personas, each one paragraph: a first-time landlord with one flat; an eight-property owner deciding on a company; an accidental landlord about to sell. For each: where on the page they would stop reading, what they would click, what they could not find, whether they would book the call.
10. The ten-second read: title, H1, opening paragraph, H2 list, first FAQ. Does a person who reads only those know what the page offers, for whom, and what to do next?
11. Register verdict against the spec's measured targets and the probe output (§12.2 check 14), with the three sentences that most pull the page away from the target quoted.
12. One sentence: the single change that would most improve the page.

Resolution: the two reviewers' outputs are merged by a third agent into one list. Items both raised are applied by the writer. Items one raised and the other did not are the disagreements: BLOCK-typed ones are applied, FIX-typed ones are applied unless the writer objects with a reason, NOTE-typed ones go to the owner in the review pack untouched. A finding is closed only when the deterministic layer re-runs green on the fixed file. This is the §9.9 adversarial pass, made specific to sections and made to produce replacements rather than opinions.
