# Research pack: `/services/landlord-accountant` (WP1-services, 2026-10-09)

This pack is the writer's whole world (REWRITE_PROGRAM §9.9 "On the writer"). Scope, constraints, phrases, questions, the competitor read, the current copy and the acceptance checks are all here or named here. Anything the writer believes is missing goes back as a delta in the hand-back, not into the page. Regenerate with `python scripts/wp1_build_packs.py` after a build.

## 0. Non-negotiables

- Blueprint: `docs/property/commercial_recovery_2026-10-07/SERVICE_PAGES_BLUEPRINT_2026-10-09.md`. Rulings R1 to R29 bind. R5 (intent-led, no "near me" strings), R7 (no fee figure, no hours, no professional body, no named person, no response-time claim in copy), R27 (the only contact facts: `umair@propertytaxpartners.co.uk`, `+44 7723 568557`, rendered by `LeadCTAPanel`; do not repeat them in copy), R24 ("property tax accounting" forms in body only), R21 (commercial property yes, development no).
- Register and voice: `docs/property/commercial_recovery_2026-10-07/ANSWER_PATTERN_SPEC_services_2026-10.md` (read it first; the editorial review is run against it, not against taste). Measured: the winners say "we/our" 24 times per 1,000 words against our 12.6, cite statute 0 times against our 4.1, and run 1,250 words against our 2,700. Write in the first person about the firm, link to the guide instead of citing the section, and cut.
- Facts: every tax number cites `docs/property/house_positions.md` by section (`§N.M`) in a code comment next to it; no number without one. House positions §13 is the do-not-write list.
- No em-dashes (U+2014) anywhere in copy. No "every client", no "landlords only", no "fixed annual fee in writing", no "developers" as a client group (the only fee wording is: fixed fees quoted upfront, you approve the fee before work starts).
- Schema: `Service.@id` is `<page-url>#service`; `provider` is `{ "@id": "<site-url>#organization" }` with NO slash before the hash (that is the form `lib/schema.ts` emits for the Organization node); `areaServed` is `{ "@type": "Country", "name": "United Kingdom" }`; `hasOfferCatalog` is built from the same array that renders the "What we do" H3s, as `Offer` items carrying `name` (or `itemOffered` with a nested `Service`; both pass).
- Output: the full route file `Property/web/src/app/services/landlord-accountant/page.tsx`, copy and schema, preserving every element in §8 below. The conductor builds once and runs `python scripts/service_page_verify.py --slug landlord-accountant`; you receive the report and fix every BLOCK in a second pass.

## 1. The page specification (blueprint §3.3)

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

##### 3.3 `/services/landlord-accountant`

Sources: assignment rows (58 queries, 3,860 a month, 1,632 impressions), teardown §a rows for "landlord accountant", "accountants for landlords", "buy to let accountant", audit §1 (`Property/web/src/app/services/landlord-accountant/page.tsx`).

| Field | Specification |
|---|---|
| Title (page part) | `Landlord Accountant for UK Rental Income and Buy to Let` (55). Today's title already leads with "Landlord Accountant"; this keeps that and adds the buy-to-let family. Fallback if vetoed: `Landlord Accountant | Accountants for Landlords and Buy to Let` (today's string, 60). |
| Meta description | 140 to 155 characters: "Landlord accountants for UK rental income: Self Assessment, Section 24 workings, MTD quarterly filing, buy-to-let and portfolio accounts, company accounts. Free first call." |
| H1 | `Landlord accountants for UK rental income` |
| Opening | Who: anyone with rental income in the UK, from one flat to a portfolio, personally or through a company. What: the return, the Section 24 working, the quarterly MTD filing, the company accounts, and the advice that stops the bill being a surprise. Where and call as 3.2. 60 to 90 words. |
| Coverage statement | "Landlords across the UK use us without ever visiting an office: everything runs by video call, phone and the portal, and our pages for London, Manchester, Birmingham, Leeds and Bristol say how we work locally in each." Serves the 18 `coverage_statement` rows ("buy to let accountants near me" 139 impressions, "landlord accountant near me", inverted forms, "landlord accounting services uk"). |
| H2 set | 1 `What a landlord accountant does for you` · 2 `Landlord tax accountant: the Section 24 and MTD side` (h2 row "landlord tax accountant", 150 impressions) · 3 `Accountants for landlords with one property or a portfolio` (h2 row "accountants for landlords") · 4 `Buy to let accountant: personally held and company held` (h2 row "buy to let accountant") · 5 `Rental property accountant for investors and agents` (h2 row "rental property accountant"; the letting-agent material from today's "Letting agents and managing agents" section folds in here in short form, linking `/for-letting-agents`) · 6 `Who we work with` · 7 `How it works` · 8 `How our fees work` (the six `fees_section` rows: "landlord accountant fees", "buy to let accountant fees", "accountant fees for rental property", cost forms; no figure until F3) · 9 `Questions landlords ask` · 10 `Related guides and services` · 11 `Where we work`. Today's `Section24Wedge`, `PortfolioPooling`, `AgencyBooks`, `ComparisonTable` and `LocationMap` blocks are kept only where they sit under one of these H2s without a heading of their own; the `LocationMap` becomes H2 11's content. `CalculatorTabs` stays with at least one per-tool `/calculators/<slug>` link (test rule, three today at :392, :505, :605; keep all three). |
| "What we do" H3s | `Self Assessment for rental income` · `Section 24 finance-cost workings` · `Making Tax Digital quarterly updates` · `Buy-to-let company accounts and Corporation Tax` · `Portfolio accounts and pooling` · `Undeclared rental income disclosures` (links `/for/rental-income-disclosure`). Six items, names identical in `hasOfferCatalog` (to be added; none today). |
| Body phrases | the 26 `body` rows: "buy to let accountants", "accountants for buy-to-let landlords", "buy to let property accountants", "accountant for landlords", "rental property tax accountant", "buy to let tax accountants", "landlord's accountant", "accountant for rental property", "landlord tax accountants", "rental income accountant", "uk landlord accountants", "BTL accounting" (once, as the abbreviation a reader uses), "landlord accountancy services", "rental accountant", "landlord tax return accountant". Once each, where the sentence is about that thing. |
| FAQ (12) | Keep: `What does a landlord accountant do?` · `Do I need an accountant for one rental property?` (serves the faq row "do i need an accountant for my rental property" and the PAA "Do landlords need an accountant?") · `How much does a landlord accountant cost?` (how fees are set, no figure; the `fees_section` rows are served by H2 8 and this answer) · `What is the difference between a landlord tax accountant and a general accountant?` · `Can you help if I have not declared rental income?` · `Should I own property personally or through a limited company?` · `Do I have to file quarterly under Making Tax Digital?` · `Is there a bad time of year to switch accountants?` · `Do you act for letting agents and managing agents?` · `What paperwork do I need to hand over?`. Add: `Which accounting services does a buy-to-let investor need for tax returns and compliance?` (faq row, in natural form) · `What tax deductions can UK landlords claim?` (PAA, answer cites `house_positions.md` §4 for finance costs and the repairs/capital line). Drop: `Do you work with landlords outside your local area?` (coverage statement) · `Do you advise on inheritance tax for a portfolio?` (moves to the tax-advice page's FAQ as the IHT question). |
| Links out | siblings; the five city pages; `/landlord-tax`, `/section-24`, `/making-tax-digital-landlords`, `/incorporation`; `/for/selling-a-buy-to-let`, `/for/rental-income-disclosure`, `/for/moving-property-into-a-limited-company`, `/for-letting-agents`; the cost post and the explainer post as related guides; the LPC card href at :127-128 stays. |
| Links in (target 30, achievable 35 / 33) | the city pages; `/landlord-tax` (hire anchor), `/section-24`, `/making-tax-digital-landlords`; `/for/selling-a-buy-to-let`, `/for/rental-income-disclosure`; indexed posts in the landlord and buy-to-let categories by impressions (audit §2c); the cost post (frozen; needs sign-off, counted outside the 33); the services index card; homepage services section after S2. |
| Gives up to this page | `/locations/birmingham` ("buy to let accountants (near me)", "accountants for buy-to-let landlords", "buy to let property accountants": 573); `/locations/manchester` ("landlord accountant", "landlord tax accountant", "accountant for landlords": 396); the Belfast post ("landlord accountants", "accountants for landlords", "buy to let accountant": 308); the cost post ("landlord accountant fees", "buy to let accountant fees", "accountant fees for rental property": 150, expected to move only when F3 exists); `/services` hub ("rental property tax accountant": 45); the Nottingham post (22); `/locations/leeds` (17); `/for/rental-income-disclosure` ("accountant for rental property": 13). |
| Preserve | `PAGE_PATH`, `PAGE_URL`, metadata shape, the inline JSON-LD array at :283-318 (add `@id` `<url>#service`, `hasOfferCatalog`, `areaServed` United Kingdom), `<Breadcrumb>`, anchors `#free-tools` `#book` `#faqs`, data-cta ids hero_book, hero_calculators, section24_book, agents_book, comparison_book, hero primary to `/contact`, `LeadCTAPanel`, the CardCarousel `href` and its comment at :405-414, owner comments :37-47. |
| Claims the rewrite removes | "fixed annual fee in writing" at :146, :229 and :339 (the 30 Sep revert missed this variant; the only fee wording allowed is §3.1 item 7's); "we act for landlords only / entire practice" (:191, :651, :667) unless `entity.firm` says it, and it does not (the firm names investors, commercial owners and SPVs); "Every client..." forms. |

## 2. The phrases (assignment table, this page's rows only)

Placement means where the matcher must find it: `title` in the title tag, `h1`, `h2` in some H2, `faq` in a FAQ question or answer, `fees_section` in the section whose H2 names fees or cost, `coverage_statement` served by the one coverage sentence (never as a literal string), `body` anywhere once where natural.

| placement | query | impressions 90d | monthly volume | current best page (pos) | rationale |
|---|---|---|---|---|---|
| title | landlord accountant | 167 | 390 | /locations/manchester (22.8) | head phrase: joint-top volume 390, most GSC impressions, current live title |
| h1 | landlord accountants | 122 | 390 | /blog/property-accountant-services/belfast-property-accountant-specialist-tax-services (24.6) | head phrase twin (plural) |
| h2 | landlord tax accountant | 150 | 50 | /locations/manchester (61.9) | natural high-volume variant |
| h2 | accountants for landlords | 86 | 260 | /blog/property-accountant-services/belfast-property-accountant-specialist-tax-services (30.3) | natural high-volume variant |
| h2 | buy to let accountant | 65 | 110 | /blog/property-accountant-services/belfast-property-accountant-specialist-tax-services (24.2) | natural high-volume variant |
| h2 | rental property accountant | 13 | 110 | /locations/bristol (8.4) | natural high-volume variant |
| faq | which specialist accounting services should a buy-to-let property investor use to handle tax returns and compliance? | 5 |  | /blog/property-accountant-services/what-services-buy-to-let-accountant (8.0) | question form |
| faq | do i need an accountant for my rental property | 1 | 10 | /blog/property-accountant-services/how-much-does-a-property-accountant-cost (2.0) | question form |
| fees_section | landlord accountant fees | 78 | 10 | /blog/property-accountant-services/how-much-does-a-property-accountant-cost (9.4) | cost/fee query |
| fees_section | buy to let accountant fees | 30 | 10 | /blog/property-accountant-services/how-much-does-a-property-accountant-cost (14.9) | cost/fee query |
| fees_section | accountant fees for rental property | 27 | 10 | /blog/property-accountant-services/how-much-does-a-property-accountant-cost (8.1) | cost/fee query |
| fees_section | cost of accountant for rental property | 5 |  | /blog/property-accountant-services/how-much-does-a-property-accountant-cost (1.0) | cost/fee query |
| fees_section | accountant rental property cost | 4 |  | /blog/property-accountant-services/how-much-does-a-property-accountant-cost (3.0) | cost/fee query |
| fees_section | buy to let limited company accountant cost | 1 |  | /blog/property-accountant-services/how-much-does-a-property-accountant-cost (7.0) | cost/fee query |
| coverage_statement | buy to let accountants near me | 139 | 20 | /locations/birmingham (18.8) | not written literally (near me / word order / stacked uk) |
| coverage_statement | accountants for landlord | 14 | 260 | /blog/property-accountant-services/property-accountant-nottingham-landlords (57.8) | not written literally (near me / word order / stacked uk) |
| coverage_statement | landlord accountant near me | 10 | 70 | /locations/leeds (32.0) | not written literally (near me / word order / stacked uk) |
| coverage_statement | accountant landlords | 8 | 260 | /blog/property-accountant-services/property-accountant-nottingham-landlords (29.4) | not written literally (near me / word order / stacked uk) |
| coverage_statement | accountant for landlord | 7 | 260 | /services/landlord-accountant (64.6) | not written literally (near me / word order / stacked uk) |
| coverage_statement | accountant landlord | 7 | 260 | /services/landlord-accountant (73.8) | not written literally (near me / word order / stacked uk) |
| coverage_statement | rental income tax near me | 7 |  | /locations/birmingham (41.7) | not written literally (near me / word order / stacked uk) |
| coverage_statement | accountant rental property | 5 | 110 | /locations/bristol (24.2) | not written literally (near me / word order / stacked uk) |
| coverage_statement | landlord accounting services uk | 4 |  | /services/landlord-accountant (68.0) | not written literally (near me / word order / stacked uk) |
| coverage_statement | rental property accountant near me | 3 | 10 | /locations/leeds (7.0) | not written literally (near me / word order / stacked uk) |
| coverage_statement | landlord tax accountant near me | 3 |  | /locations/leeds (8.0) | not written literally (near me / word order / stacked uk) |
| coverage_statement | rental property tax accountant near me | 2 | 10 | /blog/property-accountant-services/belfast-property-accountant-specialist-tax-services (6.0) | not written literally (near me / word order / stacked uk) |
| coverage_statement | landlord accountants near me | 1 | 40 | /locations/birmingham (7.0) | not written literally (near me / word order / stacked uk) |
| coverage_statement | buy to let accountant near me | 1 | 30 | /locations/manchester (5.0) | not written literally (near me / word order / stacked uk) |
| coverage_statement | accountants for landlord and property accountants | 1 | 10 | /blog/property-accountant-services/accountant-accounting-services (89.0) | not written literally (near me / word order / stacked uk) |
| coverage_statement | accountant rental property near me | 1 |  | /locations/leeds (6.0) | not written literally (near me / word order / stacked uk) |
| coverage_statement | accountants for landlords near me | 1 |  | /locations/birmingham (4.0) | not written literally (near me / word order / stacked uk) |
| coverage_statement | landlord tax accountant uk |  | 10 |  () | not written literally (near me / word order / stacked uk) |
| body | buy to let accountants | 127 | 110 | /locations/birmingham (31.8) | natural variant, weave once |
| body | accountants for buy-to-let landlords | 115 | 40 | /locations/birmingham (44.2) | natural variant, weave once |
| body | buy to let property accountants | 91 | 10 | /locations/birmingham (30.3) | natural variant, weave once |
| body | buy-to-let property accountants | 91 | 10 | /locations/birmingham (31.0) | natural variant, weave once |
| body | accountant for landlords | 78 | 260 | /locations/manchester (69.0) | natural variant, weave once |
| body | rental property tax accountant | 45 | 10 | /services (96.7) | natural variant, weave once |
| body | buy to let tax accountants | 19 | 20 | /blog/property-accountant-services/belfast-property-accountant-specialist-tax-services (21.4) | natural variant, weave once |
| body | landlords accountant | 18 | 390 | /services/landlord-accountant (77.6) | natural as "your landlord's accountant", weave once |
| body | accountant for rental property | 13 | 110 | /for/rental-income-disclosure (5.4) | natural variant, weave once |
| body | accountants for buy to let landlords | 11 | 40 | /services/landlord-accountant (63.1) | natural variant, weave once |
| body | landlord tax accountants | 8 | 50 | /services/landlord-accountant (73.0) | natural variant, weave once |
| body | rental property accounting | 8 |  | /blog/portfolio-management/how-to-value-rental-property-portfolio-tax-purposes (28.8) | natural variant, weave once |
| body | rental income accountant | 7 | 40 | /services/landlord-accountant (70.6) | natural variant, weave once |
| body | uk landlord accountants | 7 |  | /blog/property-accountant-services/belfast-property-accountant-specialist-tax-services (25.3) | natural variant, weave once |
| body | btl accounting | 6 |  | /blog/property-accountant-services/london-property-accountant (6.5) | natural variant, weave once |
| body | buy to let property accountant | 4 | 10 | /blog/property-accountant-services/belfast-property-accountant-specialist-tax-services (17.3) | natural variant, weave once |
| body | landlord accounting service | 3 |  | /blog/property-accountant-services/belfast-property-accountant-specialist-tax-services (20.3) | natural variant, weave once |
| body | accountant for buy to let | 2 | 10 | /blog/property-accountant-services/how-much-does-a-property-accountant-cost (3.0) | natural variant, weave once |
| body | buy to let specialist accountant | 2 | 10 | /for/selling-a-buy-to-let (4.5) | natural variant, weave once |
| body | landlord accountancy services | 2 |  | /services/landlord-accountant (71.5) | natural variant, weave once |
| body | landlord accounting | 2 |  | /services/landlord-accountant (71.5) | natural variant, weave once |
| body | rental accountant | 1 | 20 | /blog/property-accountant-services/how-much-does-a-property-accountant-cost (1.0) | natural variant, weave once |
| body | landlord tax return accountant | 1 | 10 | /services/landlord-accountant (70.0) | natural variant, weave once |
| body | tax accountant for rental properties | 1 | 10 | /locations/birmingham (84.0) | natural variant, weave once |
| body | accounting for landlords | 1 |  | /blog/property-accountant-services/how-much-does-a-property-accountant-cost (3.0) | natural variant, weave once |
| body | tax accounting for rental property | 1 |  | /blog/portfolio-management/how-to-value-rental-property-portfolio-tax-purposes (2.0) | natural variant, weave once |

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

##### Owned by /services/landlord-accountant

| Term | Top 3 (pull:rank) | What the top 3 share | Lacking on /services/landlord-accountant |
|---|---|---|---|
| landlord accountant | A1/B1 thp.co.uk/accountants-for-landlords/ (382 words, AccountingService schema with telephone, address, priceRange); A2/B2 pearsonmay.co.uk/resources/blog/why-landlords-should-have-an-accountant/ (blocked); A3/B3 ross-brooke.co.uk/why-use-specialist-accountant-for-landlords/ (11 FAQs, ICAEW) | Phone 2/2; credential 2/2; telephone in schema 2/2 | Phone, credential, telephone in schema |
| accountants for landlords | A1/C1 wisaccountancy.co.uk/who-we-help/landlord-accountants/ (14,713 words, "Google Rating 5.0 Based on 279 reviews"); A2 augustapp.com/blog/best-accountants-for-landlords (listicle, fees from £149.50, aggregateRating 4.5/53); A3 thobaniaccountants.co.uk/landlord-tax/ (405 words, priceRange in schema); B1 uklandlordtax.co.uk/; B2 pkb.co.uk/clients/landlords-property-owners/; B3 nrla.org.uk/services/tax/rita4rent; C2 fhpaccounting.co.uk/landlord-accountants-explained-...; C3 dnsassociates.co.uk/property-tax-accountants-in-newcastle | Reviews 6/8; phone 6/8; median 1,254 words | Reviews, phone |
| buy to let accountant | A1/B1 gorillaaccounting.com/accountants-for-buy-to-let-landlords/; A2/B2 perrysaccountants.co.uk/property-and-landlord-accountants; A3/B3 buytolettaxaccountants.co.uk/ (exact-match domain homepage); C1 wisaccountancy.co.uk; C2 teessideaccountants.co.uk/landlords-property/ (265 words); C3 LinkedIn post | Phone 5/5; reviews 3/5; median 3 H2 | Phone, reviews, fee figure (Gorilla's grid is the one priced page) |

The trust elements the winners show (phone, reviews, professional body, fee figure) are the deferred facts; do not invent them. The AI overviews lift one definition sentence then short labelled lines; write the opening and each "What we do" item in that shape.

## 5. The current page, rendered (what Google holds today; the §12.2 check 20 baseline)

**Title:** Landlord Accountant | Accountants for Landlords & Buy to Let | Property Tax Partners
**Meta description:** Landlord accountant for UK rental income: Section 24, MTD quarterly filing, rental portfolios, property investors and letting agents. Book a consultation.

### Landlord accountant for UK rental income  (no id)
Whether you own one flat or a portfolio split across your own name and a company, a free consultation shows you what Section 24 and quarterly reporting are costing you, and quotes a fixed annual fee in writing. Book a consultation Try the free calculators 120 + Landlord enquiries 14 hr Response time 168 + Properties enquired about 60 % Property-only focus The service

#### What a landlord accountant covers  (no id)
H3s: Rental accounts and Self Assessment · Section 24 planning · Making Tax Digital · Capital allowances and repairs · Company accounts and corporation tax · Disposals and inheritance planning
Rental income is taxed under rules that have moved almost every year since 2015, and most of the money is won or lost before the return is filed. The mortgage interest you pay is no longer a deduction, the refurbishment you treated as a repair may not be one, and the quarterly filing regime lands on a gross income threshold rather than profit. Every item below is part of the standard service, not an extra. For the mechanics behind the finance cost restriction, see our guide to Section 24 and the longer write-up on finance costs and Section 24 , and the Section 24 calculator if you want a figure before you speak to anyone. Broader reading sits on our landlord tax guide . Rental accounts and Self Assessment Property-by-property income and expense schedules, the property pages of your tax return, and the finance cost restriction applied correctly rather than deducted as if it were still 2016. Section 24 planning The basic rate reducer is 20% of finance costs now and rises to 22% from April 2027, when property income also moves to its own rates of 22%, 42% and 47%, so higher-rate landlords pay more overall rather than less. Where that pushes you into a higher band, we model the alternatives before you commit to any of them. Making Tax Digital Quarterly updates start from April 2026 if your combined self-employment and property income is over £50,000, from April 2027 over £30,000, and from April 2028 over £20,000. We check which year catches you, get the software feeding cleanly, and file the quarterly updates. Capital allowances and repairs Splitting capital from revenue on refurbishments, claiming plant and machinery where it genuinely qualifies, and using the writing down allowance at 14% and the 40% first year allowance where they apply. Residential lets are restricted, so the answer is often the repairs deduction, not an allowance. Company accounts and corporation tax Statutory accounts, corporation tax returns, director loan accounts and profit extraction for property companies, including how salary and dividends interact now dividend rates are 10.75%, 35.75% and 39.35%. Disposals and inheritance planning Capital gains calculations and the 60 day reporting deadline on residential disposals, plus how a portfolio sits inside an estate while the inheritance tax thresholds stay frozen to 5 April 2031. Our clients

#### Who we work with  (no id)
H3s: One flat, first tax return · Four to ten properties, mixed ownership · Rapid acquisition phase · Undeclared rental income · Living abroad, letting in the UK
One flat, first tax return You let out a property you used to live in, income is modest, and you want the return filed correctly with the reliefs you are entitled to. This is a small job and it should be priced like one. Four to ten properties, mixed ownership Some held personally, some jointly with a spouse, one in a company. The work is keeping the ownership splits, the finance costs and the company filings straight so nothing gets taxed twice or missed. Rapid acquisition phase You are buying two or three a year, refinancing, and the structure decision matters more than the return itself. Advice comes before the purchase, not after completion. Undeclared rental income You did not realise the income was reportable, or you stopped filing. The Let Property Campaign is a route back with far lower penalties than waiting for HMRC to open an enquiry. Read how a disclosure works before you contact HMRC directly. How a Let Property Campaign disclosure works Living abroad, letting in the UK Rent from a UK property stays UK taxable wherever you live. The non-resident landlord scheme decides whether your agent or tenant deducts tax at source before you see it. Buy to let

#### Buy to let landlords  (no id)
On a geared buy to let you can hand over more tax than you kept in rent. The mortgage interest leaves your account, the tax return adds it straight back on, and you are taxed on a profit you never saw. The credit comes back at 20%; if you pay 40% on that slice, half the relief never arrives. April 2027 changes nothing, because the credit and the rates rise together. The inflated profit is also the figure every threshold test reads, so it can push you past the higher rate band, the child benefit charge or the personal allowance taper while your bank balance sits exactly where it was. Beyond the return, we check whether your income is taxed at a rate you could legitimately avoid by holding the property differently, document the ownership split between spouses before the income arises rather than after, and keep repairs apart from improvements, where the wrong call either loses a deduction now or inflates a gain later. Where a company looks attractive, the arithmetic has to include the exit: transferring property is a disposal for capital gains tax and a purchase for stamp duty on the same day. Our buy to let limited company guide covers the structure, and the incorporation analysis puts numbers against your own portfolio. One landlord, one year £50,000 of rent, £8,000 of running costs, £18,000 of mortgage interest. Profit you actually bank £24,000 Profit HMRC taxes you on £42,000 £18,000 of interest you paid, added back £3,600 A year, on identical cash flows. Taxed at 40% on that slice, relieved at 20%. From April 2027 the rates become 42% and 22%, so the wedge is unchanged. * Note: Example figures displayed Want to know what Section 24 is costing you? Book a consultation Portfolios

#### Rental portfolios and multiple properties  (no id)
Past a handful of properties the hard problem stops being the tax return and becomes the record. UK residential lets pool into a single property business, so profits and losses net off before tax. Helpful for the bill, quietly dangerous for the portfolio: one figure goes on the return, and a property that lost money all year leaves no mark on it. Without property level figures nothing tells you which properties are earning and which are being funded by the others, so the answer arrives years late, usually when you sell. Furnished holiday lets no longer sit in their own regime, and overseas property is a separate business again, which matters for losses and for quarterly reporting. We produce property by property profit and loss alongside the tax figures, track refinancing and the interest that follows the money rather than the security, and flag the year a disposal should happen rather than the year it happened to. It is also what makes quarterly filing survivable: four submissions against a live ledger beats four against a shoebox of receipts. The portfolio profitability calculator gives you a per property view in a few minutes. Useful background: capital versus revenue expenditure , jointly owned property and portfolio landlord mortgages . Five properties, one property business Profit or loss per property for the year. Two-bed flat, city centre £9,400 Terrace, let to sharers £7,100 Semi, single family let £5,200 One-bed flat, high service charge £1,300 Recently refinanced house −£4,800 £18,200 The single figure the return declares. It nets the five together, so the property losing £4,800 a year never appears, and nothing tells you to look. * Note: Example figures displayed Investors

#### Property investors  (no id)
H3s: Trading or investment · Structure and joint ventures · Allowances and stamp duty · Planned disposals
Investing is a different job from letting. If you are buying to add value and sell, refurbishing and refinancing, or mixing residential with commercial, the first question is whether HMRC would treat your activity as trading rather than investment. That single distinction changes the rate, the reliefs and whether the property is stock or a capital asset. Buying with the intention to sell at a profit looks like a trade regardless of what you call it. As an accountant for property investors, four things carry most of the risk. Stamp duty analysis on acquisition is where the largest single number usually sits, including the mixed use and multiple dwellings positions, which are far easier to get right at the outset than to reclaim afterwards. See our walkthrough on calculating capital gains tax on a sale and, for anything strategic, our property tax advice service . Trading or investment The distinction that sets the rate, the reliefs, and whether a property is stock or a capital asset. Structure and joint ventures Multiple vehicles, profit shares and group companies where separate projects need ring fencing. Allowances and stamp duty Commercial holdings at the 14% writing down allowance, plus the 40% first year allowance and SDLT on acquisition. Planned disposals Timing across tax years against the annual exempt amount and the 60 day residential deadline. Agents

#### Letting agents and managing agents  (no id)
An agency has two sets of books: its own, and other people's money. Client money handling carries reconciliation and reporting obligations that do not apply to an ordinary trading company, and nearly everything an agent gets wrong sits on one side of that line or the other. Accounting for property management covers the client account alongside the agency accounts, commission and management fees recognised in the period they are earned rather than when the rent clears, VAT on fees including where a fee is disbursed on behalf of a landlord, payroll for negotiators and property managers including commission and the employer National Insurance position at 15% above the £5,000 secondary threshold, and the non-resident landlord scheme where you hold the obligation to deduct and report on overseas landlords you act for. Quarterly reporting also raises a question agents get asked constantly, which is who files what when a portfolio is managed. Our Making Tax Digital guide sets out the regime, our guide on agent managed portfolios and quarterly filing sets out the split of responsibility, and registering for MTD covers the sign up itself. The MTD checker tells a landlord which year catches them. The agency's own books Your money Commission and management fees Recognised when earned, not when the rent clears. VAT on fees Including fees disbursed on behalf of a landlord. Payroll for negotiators Commission, and employer NI at 15% above £5,000. The client account Other people's money Client account reconciliations A regulatory problem before it is a tax one. Rent held for landlords Passes through without ever being agency income. Non-resident landlord scheme You deduct and report for overseas landlords. Recognise your own situation in any of the above? Book a consultation The difference

#### Why a landlord tax accountant rather than a general practice  (no id)
Most high street firms are perfectly competent and see rental income a few times a year. The problem is volume of change. Since 2015 the sector has absorbed the finance cost restriction phasing in and now increasing, the additional dwellings surcharge, now 5%, the replacement of domestic items relief, the 60 day capital gains reporting window, the end of the furnished holiday lettings regime, and quarterly reporting arriving in two waves. Each one has a trap in it, and the exposure sits with you rather than with whoever filed the return. We act for landlords only. That is the entire practice, which means the questions you would have to explain elsewhere are the ones we answer daily. If you are weighing up a move, our note on changing landlord accountants covers the process, and choosing a buy to let accountant covers what to ask before you sign anything. A general practice compared with Property Tax Partners Area A general practice Most high street firms Most recommended Property Tax Partners A landlord-only practice like us How often they see rental cases A few times a year, alongside every other sector Every day. It is the entire practice When advice arrives After completion, when the return is prepared Before the transaction, while the structure can still be changed How expenditure is classified Reconstructed later from a bank statement Classified when the invoice comes in The limited company question A rule of thumb about higher rate taxpayers A model with your own figures, including the cost of the exit Section 24, 60 day CGT, MTD Tracked among the changes for every other sector Core competence, not a sideline Book a consultation No charge, and no obligation to go further. Most recommended Property Tax Partners A landlord-only practice like us How often they see rental cases A general practice : A few times a year, alongside every other sector Us: Every day. It is the entire practice When advice arrives A general practice : After completion, when the return is prepared Us: Before the transaction, while the structure can still be changed How expenditure is classified A general practice : Reconstructed later from a bank statement Us: Classified when the invoice comes in The limited company question A general practice : A rule of thumb about higher rate taxpayers Us: A model with your own figures, including the cost of the exit Section 24, 60 day CGT, MTD A general practice : Tracked among the changes for every other sector Us: Core competence, not a sideline Book a consultation No charge, and no obligation to go further. Getting started

#### From first call to first filing  (no id)
H3s: Consultation · Scope and fixed quote · Handover and setup · The year, not just the deadline
01 Consultation A conversation about what you own, how it is held, where the income sits and what you are planning. No charge, and no obligation to go further. 02 Scope and fixed quote You get a written scope with a fixed annual fee covering the compliance work and any one off advisory piece separately. What the work costs depends on the number of properties, how they are held and how tidy the records are, which is why we quote after the consultation rather than before it. 03 Handover and setup We handle the professional clearance letter to your current accountant, HMRC agent authorisation, and getting your bookkeeping into a form that survives quarterly reporting. 04 The year, not just the deadline Quarterly updates where MTD applies, a tax position you can see before January rather than after it, and a real answer when you ring about a property you are about to buy. Testimonials

#### What landlords say  (no id)
Anonymised feedback from landlords and portfolio investors we act for. “ They modelled our Section 24 position properly for the first time and showed us exactly where incorporation did and did not make sense. No hard sell, just the numbers. ” HL Higher-rate landlord 7-property portfolio, London “ We were weeks from missing the 60-day capital gains deadline on a sale. They turned the computation around and filed on time. Worth the fee on that alone. ” BI Buy-to-let investor Manchester “ Getting ready for Making Tax Digital felt overwhelming. They set up the software, mapped every property, and now the quarterly filing just happens. ” IL Individual landlord 2 properties, Leeds Location

#### Looking for a landlord accountant near you  (no id)
Property tax is national. The rules that decide your bill are the same in Manchester as in London, and nothing about a rental return needs a meeting in a room. Searching locally usually surfaces whoever is closest rather than whoever knows the sector, which is a poor trade when the specialism is what saves the money. Scotland and Wales differ on the transaction tax on purchase, and we handle those where they apply. We act for landlords throughout the UK, and for landlords living abroad who let property here. Records come in electronically, questions get answered on a call booked when it suits you, and you deal with people who have seen your situation before. See our locations for where our clients are. Across the UK 1 Leeds 2 Manchester 3 Birmingham 4 London 5 Bristol All locations → We act for landlords across the UK, not only in these cities. Free tools

#### Put numbers on it before you call  (no id)
Free, and the figures are yours to take to any adviser. Section 24 Calculator Your extra tax bill Incorporation Calculator Worth moving to a company? MTD Checker Are you in scope? Portfolio Calculator Property-by-property profit Free consultation

#### Speak to an accountant who only works with landlords  (no id)
H3s: Book your free consultation
Tell us what you own and how it is held. We will look at what it is costing you, then quote a clear fee. Landlord specialists only Rental income, Section 24 and MTD every day Fixed fees, quoted upfront No hourly billing, no surprise invoices 24-hour response Usually the same working day No obligation and no hard sell. If you are better off where you are, we will say so. Book your free consultation I am a... Select... Individual landlord (1-3 properties) Portfolio owner (4-10 properties) Large portfolio (10+ properties) Property developer Something else Full name Email Phone Your situation A couple of sentences helps us prepare properly for your call. What's prompted this now? What do you want from the call? To answer your enquiry, your details may be shared with a firm from our specialist partner network who will contact you. If that firm is unable to help, your details may be passed to another firm in the network for the same purpose. By submitting this enquiry you confirm you understand this. See our Privacy Policy . Request callback We respond within 24 hours and store your details securely. You'll get a text and email from us straight away. A quick reply confirms your callback. FAQ

#### Landlord accountant questions  (no id)
H3s: What does a landlord accountant do? · Do I need an accountant for one rental property? · How much does a landlord accountant cost? · What is the difference between a landlord tax accountant and a general accountant? · Can you help if I have not declared rental income? · Should I own property personally or through a limited company? · Do I have to file quarterly under Making Tax Digital? · Do you work with landlords outside your local area? · Is there a bad time of year to switch accountants? · Do you act for letting agents and managing agents? · What paperwork do I need to hand over? · Do you advise on inheritance tax for a portfolio?
What does a landlord accountant do? A landlord accountant prepares your rental accounts, files the property pages of your Self Assessment or your company's accounts and corporation tax return, applies the finance cost restriction and the reliefs you qualify for, and advises on the structure you hold property in. The compliance side is the visible part. The part that changes your tax bill is usually the advice about ownership, timing and expenditure. Do I need an accountant for one rental property? Not necessarily. If you own one property, have a mortgage and simple expenses, the return is manageable on your own. It becomes worth paying for when the finance cost restriction starts moving you between tax bands, when you own jointly and the split is not the default, when you sell, or when quarterly reporting under Making Tax Digital applies to you. How much does a landlord accountant cost? It depends on how many properties you own, whether they are held personally, jointly or through a company, and the state of the records. A single property personal return is a different job from a ten property portfolio with a company and quarterly filing. We quote a fixed annual fee in writing after the consultation so you are not agreeing to an open ended hourly rate. What is the difference between a landlord tax accountant and a general accountant? A general practice handles rental income as one line among many. A landlord tax accountant deals with the property specific rules daily: Section 24, the repairs and capital divide on refurbishments, replacement of domestic items, stamp duty surcharges on incorporation, the 60 day capital gains reporting deadline, the non-resident landlord scheme and business property relief on a let portfolio. The risk with a generalist is not incompetence, it is that property rules change constantly and the exposure sits with you. Can you help if I have not declared rental income? Yes. The Let Property Campaign lets you disclose undeclared rental income voluntarily, and the penalty position is significantly better than being found. We work out how many years are in scope, calculate the tax and interest, and make the disclosure. Approaching HMRC before HMRC approaches you is the whole point of the route. Should I own property personally or through a limited company? It depends on your income level, how much mortgage interest you pay, whether you need to draw the profits out, and how long you plan to hold. A company avoids the finance cost restriction but transferring existing property triggers capital gains tax and stamp duty on the same day, and extracting profits is taxed again. Incorporation relief can defer the capital gains charge, but for transfers on or after 6 April 2026 it has to be claimed rather than applying automatically, and the claim is due by the first anniversary of the 31 January following the tax year of the transfer. New purchases are a different question from existing ones. We model both before you decide. Do I have to file quarterly under Making Tax Digital? If your combined self-employment and property income is over £50,000, quarterly updates begin from April 2026. Over £30,000, from April 2027, and over £20,000 from April 2028. The threshold looks at gross income before expenses, not profit, so plenty of landlords who make very little are caught by it. Jointly owned property is split by your share. Do you work with landlords outside your local area? Yes, throughout the UK, including landlords living abroad who let property here. Records, questions and signatures move electronically and calls are booked when they suit you, so nothing about the work depends on where either of us sits. Is there a bad time of year to switch accountants? Only the fortnight before a filing deadline, when a handover competes with the filing itself. Otherwise any point in the year works. Clearance, records, the last filed return and the HMRC authorisation all move across without waiting for a year end, and nothing about changing firm triggers a penalty or restarts anything with HMRC. Do you act for letting agents and managing agents? Yes. Agency work is a different job from landlord work: client money handling and the reconciliations your accounts rules require, commission recognised in the right period, VAT on fees, and the deductions and reporting the non-resident landlord scheme puts on you as the agent. We also cover the agency's own accounts, payroll and corporation tax. What paperwork do I need to hand over? Rental statements or your agent's year end summary, mortgage interest certificates, invoices for repairs and improvements kept separately, purchase and sale completion statements, and any correspondence from HMRC. If you are heading into quarterly reporting, digital records with bank feeds save a great deal of time later. Do you advise on inheritance tax for a portfolio? Yes. A straightforward let portfolio is usually an investment rather than a trading business, so business property relief generally does not apply to it. With the nil rate bands frozen to 5 April 2031 and property values where they are, planning tends to focus on ownership structure, lifetime transfers and how any relief that does apply interacts with the combined £2.5m allowance for the reliefs that survive.

**FAQ (schema, verbatim):**
- **What does a landlord accountant do?** A landlord accountant prepares your rental accounts, files the property pages of your Self Assessment or your company's accounts and corporation tax return, applies the finance cost restriction and the reliefs you qualify for, and advises on the structure you hold property in. The compliance side is the visible part. The part that changes your tax bill is usually the advice about ownership, timing and expenditure.
- **Do I need an accountant for one rental property?** Not necessarily. If you own one property, have a mortgage and simple expenses, the return is manageable on your own. It becomes worth paying for when the finance cost restriction starts moving you between tax bands, when you own jointly and the split is not the default, when you sell, or when quarterly reporting under Making Tax Digital applies to you.
- **How much does a landlord accountant cost?** It depends on how many properties you own, whether they are held personally, jointly or through a company, and the state of the records. A single property personal return is a different job from a ten property portfolio with a company and quarterly filing. We quote a fixed annual fee in writing after the consultation so you are not agreeing to an open ended hourly rate.
- **What is the difference between a landlord tax accountant and a general accountant?** A general practice handles rental income as one line among many. A landlord tax accountant deals with the property specific rules daily: Section 24, the repairs and capital divide on refurbishments, replacement of domestic items, stamp duty surcharges on incorporation, the 60 day capital gains reporting deadline, the non-resident landlord scheme and business property relief on a let portfolio. The risk with a generalist is not incompetence, it is that property rules change constantly and the exposure sits with you.
- **Can you help if I have not declared rental income?** Yes. The Let Property Campaign lets you disclose undeclared rental income voluntarily, and the penalty position is significantly better than being found. We work out how many years are in scope, calculate the tax and interest, and make the disclosure. Approaching HMRC before HMRC approaches you is the whole point of the route.
- **Should I own property personally or through a limited company?** It depends on your income level, how much mortgage interest you pay, whether you need to draw the profits out, and how long you plan to hold. A company avoids the finance cost restriction but transferring existing property triggers capital gains tax and stamp duty on the same day, and extracting profits is taxed again. Incorporation relief can defer the capital gains charge, but for transfers on or after 6 April 2026 it has to be claimed rather than applying automatically, and the claim is due by the first anniversary of the 31 January following the tax year of the transfer. New purchases are a different question from existing ones. We model both before you decide.
- **Do I have to file quarterly under Making Tax Digital?** If your combined self-employment and property income is over £50,000, quarterly updates begin from April 2026. Over £30,000, from April 2027, and over £20,000 from April 2028. The threshold looks at gross income before expenses, not profit, so plenty of landlords who make very little are caught by it. Jointly owned property is split by your share.
- **Do you work with landlords outside your local area?** Yes, throughout the UK, including landlords living abroad who let property here. Records, questions and signatures move electronically and calls are booked when they suit you, so nothing about the work depends on where either of us sits.
- **Is there a bad time of year to switch accountants?** Only the fortnight before a filing deadline, when a handover competes with the filing itself. Otherwise any point in the year works. Clearance, records, the last filed return and the HMRC authorisation all move across without waiting for a year end, and nothing about changing firm triggers a penalty or restarts anything with HMRC.
- **Do you act for letting agents and managing agents?** Yes. Agency work is a different job from landlord work: client money handling and the reconciliations your accounts rules require, commission recognised in the right period, VAT on fees, and the deductions and reporting the non-resident landlord scheme puts on you as the agent. We also cover the agency's own accounts, payroll and corporation tax.
- **What paperwork do I need to hand over?** Rental statements or your agent's year end summary, mortgage interest certificates, invoices for repairs and improvements kept separately, purchase and sale completion statements, and any correspondence from HMRC. If you are heading into quarterly reporting, digital records with bank feeds save a great deal of time later.
- **Do you advise on inheritance tax for a portfolio?** Yes. A straightforward let portfolio is usually an investment rather than a trading business, so business property relief generally does not apply to it. With the nil rate bands frozen to 5 April 2031 and property values where they are, planning tends to focus on ownership structure, lifetime transfers and how any relief that does apply interacts with the combined £2.5m allowance for the reliefs that survive.

**Body links out today:** /, /blog/capital-gains-tax/cgt-calculation-selling-buy-to-let-property-step-by-step, /blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk, /blog/landlord-tax-essentials/capital-vs-revenue-expenditure-landlord-uk, /blog/landlord-tax-essentials/jointly-owned-property, /blog/landlord-tax-essentials/let-property-campaign-disclosure-mechanics-undeclared-rental-income-2026, /blog/making-tax-digital-mtd/how-to-register-mtd-landlord-step-by-step-guide, /blog/making-tax-digital-mtd/mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly, /blog/property-accountant-services/buy-to-let-accountants-near-me-guide, /blog/property-accountant-services/change-landlord-accountants, /blog/property-finance/portfolio-landlord-mortgages-guide, /blog/section-24-and-tax-relief/finance-costs-section-24-complete-guide, /calculators/mtd-checker, /calculators/portfolio-profitability-calculator, /calculators/section-24-calculator, /contact, /incorporation, /landlord-tax, /locations, /locations/birmingham, /locations/bristol, /locations/leeds, /locations/london, /locations/manchester, /making-tax-digital-landlords, /privacy-policy, /section-24, /services, /services/property-tax-advice

## 6. Links that will point at this page, and what their anchors promise (audit §2c; this page is `LA`)

The page must answer what these anchors promise. Rows with Target `LA` are yours. The applied set, with final wording, is `briefs/property/wp1-services/LINKS_APPLIED_2026-10-09.md`.

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

## 8. Preserve through the rewrite (audit §6; column `LA`)

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
