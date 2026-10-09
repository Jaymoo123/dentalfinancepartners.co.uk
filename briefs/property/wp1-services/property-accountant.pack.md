# Research pack: `/services/property-accountant` (WP1-services, 2026-10-09)

This pack is the writer's whole world (REWRITE_PROGRAM §9.9 "On the writer"). Scope, constraints, phrases, questions, the competitor read, the current copy and the acceptance checks are all here or named here. Anything the writer believes is missing goes back as a delta in the hand-back, not into the page. Regenerate with `python scripts/wp1_build_packs.py` after a build.

## 0. Non-negotiables

- Blueprint: `docs/property/commercial_recovery_2026-10-07/SERVICE_PAGES_BLUEPRINT_2026-10-09.md`. Rulings R1 to R29 bind. R5 (intent-led, no "near me" strings), R7 (no fee figure, no hours, no professional body, no named person, no response-time claim in copy), R27 (the only contact facts: `umair@propertytaxpartners.co.uk`, `+44 7723 568557`, rendered by `LeadCTAPanel`; do not repeat them in copy), R24 ("property tax accounting" forms in body only), R21 (commercial property yes, development no).
- Register and voice: `docs/property/commercial_recovery_2026-10-07/ANSWER_PATTERN_SPEC_services_2026-10.md` (read it first; the editorial review is run against it, not against taste). Measured: the winners say "we/our" 24 times per 1,000 words against our 12.6, cite statute 0 times against our 4.1, and run 1,250 words against our 2,700. Write in the first person about the firm, link to the guide instead of citing the section, and cut.
- Facts: every tax number cites `docs/property/house_positions.md` by section (`§N.M`) in a code comment next to it; no number without one. House positions §13 is the do-not-write list.
- No em-dashes (U+2014) anywhere in copy. No "every client", no "landlords only", no "fixed annual fee in writing", no "developers" as a client group (the only fee wording is: fixed fees quoted upfront, you approve the fee before work starts).
- Schema: `Service.@id` is `<page-url>#service`; `provider` is `{ "@id": "<site-url>#organization" }` with NO slash before the hash (that is the form `lib/schema.ts` emits for the Organization node); `areaServed` is `{ "@type": "Country", "name": "United Kingdom" }`; `hasOfferCatalog` is built from the same array that renders the "What we do" H3s, as `Offer` items carrying `name` (or `itemOffered` with a nested `Service`; both pass).
- Output: the full route file `Property/web/src/app/services/property-accountant/page.tsx`, copy and schema, preserving every element in §8 below. The conductor builds once and runs `python scripts/service_page_verify.py --slug property-accountant`; you receive the report and fix every BLOCK in a second pass.

## 1. The page specification (blueprint §3.2)

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

##### 3.2 `/services/property-accountant`

Sources: assignment rows for this owner (62 queries, 9,310 a month, 3,343 impressions), teardown §a rows for its six terms, audit §1 (file `Property/web/src/app/services/property-accountant/page.tsx`, lines as at HEAD 6c5d6d8e).

| Field | Specification |
|---|---|
| Title (page part) | `Property Accountants for UK Landlords and Investors` (51). Today's title is the singular form; the plural plus "UK" is what the title rows need ("property accountant", "uk property accountants", "property accountants uk" all match on terms). First choice if the Bing veto blocks it: `Property Accountants UK for Landlords and Investors`. |
| Meta description | 140 to 155 characters, opens with "Specialist property accountants for UK landlords, investors and property companies", names three services and "free first call". No phone, no figure. |
| H1 | `Property accountants for UK landlords and investors` |
| Opening (answer-first) | Who: landlords, investors and owners of property companies anywhere in the UK. What: the rental accounts, the returns, the company accounts and the planning that goes with them, from a firm that does only property. Where: UK-wide and remote, registered office in Shipley, West Yorkshire. Call: free first call, fixed fee quoted before any work. 60 to 90 words. |
| Coverage statement (one sentence, in the opening or the first section) | "We work with landlords and investors across the UK by video call, phone and a shared portal, so where you or your properties are makes no difference to the service; our local pages for London, Manchester, Birmingham, Leeds and Bristol describe how that works in each city." This one sentence serves the 18 `coverage_statement` rows ("near me", "property accountant uk", inverted forms). |
| H2 set (in order) | 1 `What a property accountant does for you` (the services list; the "what does property accountant do" FAQ row is served here and in the FAQ) · 2 `Specialist property accountants, not a general practice` (h2 row "specialist property accountant") · 3 `Property tax accountant: the planning side` (h2 row "property tax accountant", 544 impressions, today on `/locations/manchester`; this section explains that the accounts and the tax planning are one engagement) · 4 `Accountants for property investors and portfolios` (h2 rows "accountant for property investors", "property investment accountant", "accountants for property") · 5 `Who we work with` · 6 `How it works` · 7 `How our fees work` · 8 `Questions people ask` · 9 `Related guides and services` · 10 `Where we work` (the five city links). The `TaxYearGap`, `PromptMarquee` and `TestimonialsSection` blocks on the page today are kept if the writer can place them under one of these H2s without a new heading; otherwise they are dropped with a reason in the §12.2 check 20 list. The `CalculatorTabs` block stays under H2 9 as today (test rule: zero links to individual `/calculators/<slug>` pages on this page; `calculator-tabs-crawl-path.test.ts:104-107`). |
| "What we do" H3s (= `hasOfferCatalog` names) | `Rental accounts and Self Assessment` · `Property company and SPV accounts` · `Making Tax Digital quarterly filing` · `Capital gains tax on sales` · `Incorporation and structuring advice` · `Commercial property accounts` (one short item; R21, `entity.firm` names commercial property owners). Six items; property development is not listed (R21). |
| Body phrases (weave once each where natural) | the 31 `body` rows left after R21: "property specialist accountant", "residential property accountant", "accounting services for property owners", "property tax accountants", "commercial property accountant", "property owner accountant", "investment property accountant", "real estate accountant" (one mention, in the sentence that says UK usage is "property accountant"), "property portfolio accountant", "accountants for property company", "property accounting services", "accountants that specialise in property". The literal strings "property tax accounting", "accounting for property tax" and "property accounting" appear in body prose only, never in a heading (R24). |
| FAQ (12, count stays 12 per the audit guardrail) | Keep from today: `What does a property accountant do?` · `Do I need a property accountant for one buy-to-let?` · `What is the difference between a property accountant and a regular accountant?` · `How much does a property accountant cost?` (answer: how fees are set, no figure) · `Can you take over from my current accountant mid-year?` · `Do you handle both personally held property and limited companies?` · `Will you tell me whether to incorporate?` · `How does Making Tax Digital change what you do for me?` · `What records do you need from me?` · `Do you work with non-resident landlords?`. Add: `What does a specialist property accountant do?` (R23, PAA) · `Do landlords need an accountant?` (PAA, 4 terms). Drop: `Do I need a property accountant near me?` (its answer becomes the coverage statement; R5) · `What happens if HMRC opens an enquiry?` (moves to the tax-advice page, which owns enquiry work). Each answer 40 to 90 words, answer first, visible in the HTML (§6 step 0). |
| Links out | sibling line to `/services/landlord-accountant` and `/services/property-tax-advice` (H2 9); the five `/locations/<city>` pages by city name (H2 10); `/incorporation`, `/section-24`, `/making-tax-digital-landlords`, `/landlord-tax` (H2 9 and inline where the subject comes up); `/for/property-spv-set-up`, `/for/moving-property-into-a-limited-company`, `/for/non-resident-landlords` (H2 5); the explainer post and the cost post as "Related guides" by their real titles; `/services/non-resident-landlord` from the non-resident FAQ. No link in the opening paragraph; no per-tool calculator links. |
| Links in (target 30, achievable 38 / 37 without sign-off items; audit §2c and §2d) | the 21 indexed posts that today link "property accountant" / "specialist property accountant" to the explainer post are repointed to this page (audit "R" rows); the five city pages; `/landlord-tax`, `/section-24`, `/incorporation`, `/making-tax-digital-landlords`; `/for/property-spv-set-up`, `/for/moving-property-into-a-limited-company`; the services index card; the homepage services section once S2 is signed off; the explainer post's "getting help" paragraph. |
| Pages that give up to this page | the noindexed career post (nothing to do); `/locations/manchester` ("property tax accountant", "property accountants near me": 795 impressions); `/locations/bristol` ("property specialist accountant", "property tax accountant near me", "specialist property accountant": 415); `/locations/birmingham` ("property accountants": 187); the homepage ("uk property accountants", "property accountants uk": 189, R3); the Glasgow post ("property accountant near me": 95); the Belfast post (71); `/for/property-spv-set-up` ("property investment accountant", "accountant for property investors": 26); the `accounting-services-for-property-owners` post (56). Mechanism per §4: body link now, title re-aim at step 13. |
| Preserve (audit §6) | `PAGE_PATH`, the static `metadata` shape with canonical and hreflang, the `Service` node at :352-383 (already has `@id`, provider `@id`, `hasOfferCatalog` from the visible list; change `areaServed` to `{ "@type": "Country", "name": "United Kingdom" }`), `buildFaqPageJsonLd`, `<Breadcrumb>`, anchors `#included` `#free-tools` `#book`, data-cta ids hero_book, hero_calculators, prompts_book, included_book, difference_book, fees_book, hero primary to `/contact`, `LeadCTAPanel`, even-length `clientPrompts`, `feedingPosts` list, the owner-decision comments at :38-48, :232-235, :636-641, :703-719. |
| Claims the rewrite removes | "Every client..." (:584); any "portfolios of forty" or "handovers inside two weeks" figure; nothing that needs F1 to F6. The 24-hour line stays only in the shared components (§3.1 item 9). |

## 2. The phrases (assignment table, this page's rows only)

Placement means where the matcher must find it: `title` in the title tag, `h1`, `h2` in some H2, `faq` in a FAQ question or answer, `fees_section` in the section whose H2 names fees or cost, `coverage_statement` served by the one coverage sentence (never as a literal string), `body` anywhere once where natural.

| placement | query | impressions 90d | monthly volume | current best page (pos) | rationale |
|---|---|---|---|---|---|
| title | property accountant | 870 | 720 | /blog/property-accountant-services/how-to-become-property-accountant (24.6) | head phrase: joint-top volume 720, most GSC impressions, current live title word |
| title | uk property accountants | 141 | 480 | / (39.9) | UK modifier on the title; owner 2026-10-09 moved "property accountants UK" from homepage |
| title | property accountants uk | 27 | 10 | / (39.3) | UK modifier on the title; owner 2026-10-09 ruling |
| h1 | property accountants | 187 | 720 | /locations/birmingham (57.5) | head phrase twin (plural) |
| h2 | property tax accountant | 544 | 210 | /locations/manchester (48.3) | natural high-volume variant |
| h2 | specialist property accountant | 85 | 170 | /locations/bristol (13.4) | natural high-volume variant |
| h2 | property investment accountant | 22 | 320 | /for/property-spv-set-up (19.9) | natural high-volume variant |
| h2 | accountants for property | 4 | 720 | /blog/property-accountant-services/belfast-property-accountant-specialist-tax-services (10.8) | natural high-volume variant |
| h2 | accountant for property investors | 4 | 320 | /for/property-spv-set-up (9.2) | natural high-volume variant |
| faq | what does a specialist property accountant do? | 45 |  | /blog/property-accountant-services/how-to-become-property-accountant (7.9) | pre-hire question; QRY_C tagged it career, reclassified (see Q) |
| faq | what does property accountant do | 1 |  | /blog/property-accountant-services/how-to-become-property-accountant (1.0) | same question as above; one FAQ covers both |
| coverage_statement | property accountant specialist | 239 | 170 | /blog/property-accountant-services/how-to-become-property-accountant (17.2) | not written literally (near me / word order / stacked uk) |
| coverage_statement | property accountants near me | 217 | 170 | /locations/manchester (31.1) | not written literally (near me / word order / stacked uk) |
| coverage_statement | property tax accountant near me | 106 | 90 | /locations/bristol (10.3) | not written literally (near me / word order / stacked uk) |
| coverage_statement | property accountant near me | 95 | 170 | /blog/property-accountant-services/property-accountant-glasgow (10.8) | not written literally (near me / word order / stacked uk) |
| coverage_statement | accountant property specialist | 33 | 170 | /locations/bristol (20.6) | not written literally (near me / word order / stacked uk) |
| coverage_statement | accountants property | 23 | 720 | /blog/property-accountant-services/belfast-property-accountant-specialist-tax-services (10.6) | not written literally (near me / word order / stacked uk) |
| coverage_statement | property tax accountant uk | 15 | 20 | / (59.8) | not written literally (near me / word order / stacked uk) |
| coverage_statement | accountant property | 11 | 720 | /locations/bristol (20.3) | not written literally (near me / word order / stacked uk) |
| coverage_statement | property accountant uk | 8 | 10 | /blog/property-accountant-services/how-to-become-property-accountant (17.2) | not written literally (near me / word order / stacked uk) |
| coverage_statement | tax accountant property | 5 | 210 | /locations/bristol (14.2) | not written literally (near me / word order / stacked uk) |
| coverage_statement | property specialist accountant near me | 5 | 10 | /blog/property-accountant-services/how-much-does-a-property-accountant-cost (2.0) | not written literally (near me / word order / stacked uk) |
| coverage_statement | accountant in real estate | 3 | 140 | /blog/property-accountant-services/how-to-become-property-accountant (42.3) | not written literally (near me / word order / stacked uk) |
| coverage_statement | property tax accountants near me | 3 | 20 | /blog/property-accountant-services/belfast-property-accountant-specialist-tax-services (8.7) | not written literally (near me / word order / stacked uk) |
| coverage_statement | accountant property investment | 2 | 320 | /blog/property-accountant-services/how-much-does-a-property-accountant-cost (1.0) | not written literally (near me / word order / stacked uk) |
| coverage_statement | accountant specializing in real estate | 1 | 10 | /blog/property-accountant-services/how-much-does-a-property-accountant-cost (3.0) | not written literally (near me / word order / stacked uk) |
| coverage_statement | specialist property accountants near me | 1 |  | /blog/property-accountant-services/manchester-property-accountant (8.0) | not written literally (near me / word order / stacked uk) |
| coverage_statement | property investment accountant near me |  | 10 |  () | not written literally (near me / word order / stacked uk) |
| coverage_statement | accountant specialising in property investment near me |  |  |  () | not written literally (near me / word order / stacked uk) |
| body | property specialist accountant | 160 | 170 | /locations/bristol (18.3) | natural UK phrasing ("property specialist accountants"), weave once |
| body | property tax accounting | 108 |  | /blog/property-accountant-services/how-to-become-property-accountant (16.7) | natural variant, weave once |
| body | accounting for property tax | 62 |  | /blog/property-accountant-services/how-to-become-property-accountant (15.7) | natural variant, weave once |
| body | residential property accountant | 53 | 10 | /blog/property-accountant-services/how-to-become-property-accountant (10.5) | natural variant, weave once |
| body | property accounting | 48 |  | /blog/property-accountant-services/how-to-become-property-accountant (20.1) | natural variant, weave once |
| body | accounting services for property owners | 42 |  | /blog/property-accountant-services/accounting-services-for-property-owners (12.2) | natural variant, weave once |
| body | property tax accountants | 34 | 210 | /locations/manchester (88.4) | natural variant, weave once |
| body | accountants for property tax | 21 |  | /blog/property-accountant-services/belfast-property-accountant-specialist-tax-services (22.1) | natural variant, weave once |
| body | commercial property accountant | 18 | 20 | /blog/property-accountant-services/how-to-become-property-accountant (26.1) | natural variant, weave once |
| body | accountant for property | 15 | 720 | /locations/bristol (23.6) | natural variant, weave once |
| body | property owner accountant | 14 |  | /blog/property-accountant-services/accounting-services-for-property-owners (14.9) | natural variant, weave once |
| body | accounting for property taxes | 13 |  | /blog/property-accountant-services/how-to-become-property-accountant (16.5) | natural variant, weave once |
| body | specialist property accountants | 7 | 170 | /blog/property-accountant-services/belfast-property-accountant-specialist-tax-services (14.2) | natural variant, weave once |
| body | commercial property accountants | 7 | 20 | /blog/property-accountant-services/belfast-property-accountant-specialist-tax-services (12.0) | natural variant, weave once |
| body | investment property accountant | 4 | 30 | /blog/property-accountant-services/what-does-a-property-accountant-do (4.0) | natural variant, weave once |
| body | property specialist accountants | 3 | 170 | /blog/property-accountant-services/belfast-property-accountant-specialist-tax-services (14.0) | natural UK phrasing, weave once |
| body | real estate accountant | 3 | 140 | /blog/property-accountant-services/how-much-does-a-property-accountant-cost (1.0) | natural variant, weave once |
| body | uk property accountant | 3 | 20 | / (56.0) | natural variant, weave once |
| body | uk property tax accountants | 3 | 20 | / (33.5) | natural variant, weave once |
| body | property income accountant | 3 |  | /blog/property-accountant-services/belfast-property-accountant-specialist-tax-services (4.0) | natural variant, weave once |
| body | property portfolio accountant | 3 |  | /blog/property-accountant-services/how-to-become-property-accountant (14.5) | natural variant, weave once |
| body | real estate accountants | 2 | 140 | /blog/property-accountant-services/how-much-does-a-property-accountant-cost (1.0) | natural variant, weave once |
| body | accountants for property company | 2 |  | /blog/property-accountant-services/how-much-does-a-property-accountant-cost (3.0) | natural variant, weave once |
| body | multi-property portfolio accounting | 2 |  | /blog/portfolio-management/property-portfolio-accounting-tracking-profitability (29.0) | natural variant, weave once |
| body | property accounting services | 2 |  | /blog/property-accountant-services/how-much-does-a-property-accountant-cost (2.0) | natural variant, weave once |
| body | accountants for property investors | 1 | 320 | /blog/property-accountant-services/how-much-does-a-property-accountant-cost (1.0) | natural variant, weave once |
| body | property investment accountants | 1 | 320 | /blog/property-accountant-services/how-much-does-a-property-accountant-cost (2.0) | natural variant, weave once |
| body | accountants that specialise in property | 1 | 10 | /blog/property-accountant-services/how-much-does-a-property-accountant-cost (3.0) | natural variant, weave once |
| body | accounting for property companies | 1 |  | /blog/portfolio-management/property-portfolio-accounting-tracking-profitability (74.0) | natural variant, weave once |
| body | property investor accountants | 1 |  | /blog/property-accountant-services/how-much-does-a-property-accountant-cost (1.0) | natural variant, weave once |
| body | property specialist tax accountant |  | 10 |  () | natural variant, weave once |

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

##### Owned by /services/property-accountant

| Term | Top 3 (pull:rank) | What the top 3 share | Lacking on /services/property-accountant |
|---|---|---|---|
| property accountant | A1/C1 bhp.co.uk/office/leeds/property-accountancy/ (Leeds office page, AccountingService schema with telephone, two named Tax Partners); A2/C2 rpgcrouchchapman.co.uk/sectors/property-accountants/ (blocked); A3/C3 cuttsandco.co.uk/property-landlords/ (Manchester title, Elfsight reviews); B1 thepropertyaccountant.co.uk/ (price plans from £200 + VAT); B2 ukpropertyaccountants.co.uk/ (aggregateRating 4.9/380); B3 fhpaccounting.co.uk/property-accountants-what-they-do-... (guide, 7 FAQs) | Phone 5/5; reviews 3/5; credential named 3/5; median 1,162 words, 7 H2 | Phone, reviews, credential, telephone in schema |
| property accountants | A1 ukpropertyaccountants.co.uk/; A2 nrla.org.uk/services/tax/rita4rent; A3 geraldedelman.com/services/property-tax-advisers/ (London, 7 FAQs, FCA); B1/C1 andrewpasser.com/property-tax-accountant-london (FAQPage 6, Google reviews); B2/C2 knowleswarwick.com (blocked); B3/C3 ukpropertyaccountants.co.uk/services/ | Reviews 5/5; credential 4/5; phone 4/5; median 1,289 words | Reviews, credential, phone |
| property tax accountant | A1/B1/C1 djh.co.uk/specialisms/property/ (1,261 words, 14 H2, no FAQ, no reviews); A2/B2/C2 perrigoconsultants.co.uk/property-tax-consultants/ (2,491 words, "Google Rating 5.0 Based on 110 reviews"); A3/B3/C3 taxaccountant.co.uk/landlord-tax/ (8 FAQs, telephone in schema) | All three: service pages, phone, form; median 1,555 words, 5 H2. Only one shows reviews | Phone. This SERP is stable and already holds our Belfast post (#5) and Manchester page (#7) |
| accountant for property investors | A1/B1 ukpropertyaccountants.co.uk/; A2/B2 gorillaaccounting.com/accountants-for-buy-to-let-landlords/ (price grid £62 to £102 + VAT, instant quote, Feefo and Trustpilot); A3/B3 provestor.co.uk/; C1 haroldsharp.co.uk, C2 rpgcrouchchapman.co.uk (both blocked); C3 accountingpreneur.com/post/how-to-find-... | Phone 4/4; 2 of 4 are homepages; median 10.5 H2 | Phone, reviews, fee figure |
| specialist property accountant | A1 thepropertyaccountant.co.uk/; A2 ukpropertyaccountants.co.uk/; A3 perrysaccountants.co.uk/property-and-landlord-accountants (439 words); B1 spotlight-accounting.co.uk (403); B2 ukpropertyaccountants.co.uk/top-10-property-accountants-in-the-uk/ (self-ranking listicle); B3 bsassociate.co.uk/property-accountant-southampton.php (136 words, aggregateRating 4.9/1,225) | Phone 5/5; reviews 3/5; median 2 H2 | Phone, reviews |
| property accountants near me | A1/B1/C1 perrysaccountants.co.uk/property-and-landlord-accountants; A2/B2/C2 gmprofessionalaccountants.co.uk/accounting-services/property-accountants/ (fee benchmark £200 to £450, 10 FAQs, named AAT); A3 knowleswarwick.com (blocked); B3 watsonbuckle.co.uk/sectors/tax-for-landlords/; C3 dnsassociates.co.uk/property-tax-accountants-in-norwich | 3 of 4 are city pages; phone 4/4 | City and phone signals; R4 keeps city forms on city pages, R8 rules out the map pack |

The trust elements the winners show (phone, reviews, professional body, fee figure) are the deferred facts; do not invent them. The AI overviews lift one definition sentence then short labelled lines; write the opening and each "What we do" item in that shape.

## 5. The current page, rendered (what Google holds today; the §12.2 check 20 baseline)

**Title:** Property Accountant for UK Landlords and Investors | Property Tax Partners
**Meta description:** A property accountant for UK landlords and investors: rental accounts, Self Assessment, SPV company accounts, MTD quarterly filing and year-round tax planning.

### A property accountant for UK landlords and investors  (no id)
Whether it is a refurbishment to classify, a sale to time or a portfolio to restructure, a free consultation shows you what your current setup is costing you and gives you a clear quote to fix it. Book a consultation Try the free calculators 120 + Landlord enquiries 14 hr Response time 168 + Properties enquired about 60 % Property-only focus The gap

#### Your tax bill is decided before the return is filed  (no id)
H3s: The refurbishment · The ownership · The finance costs · The disposal
Most landlord tax bills are decided long before the return is filed. They are decided by how a refurbishment was categorised, whose name the property sits in, whether the mortgage interest was put through as a deduction or a tax reducer, and whether anyone modelled the sale before contracts were exchanged. By the time a general practice accountant is typing figures into the property pages in January, most of those decisions have already been made for you. A specialist property accountant closes that gap. The compliance still has to be right, and it will be, but the value sits in the twelve months before it: knowing which costs are deductible when, which structure your next purchase belongs in, and what a disposal actually leaves you with after tax. The twelve months where the bill is decided January, when it is typed up The refurbishment Categorised as a repair or as capital, at the point you spend it. The ownership Whose name it sits in, and whether a Form 17 election matches that. The finance costs Treated as a deduction or as a basic rate tax reducer. The disposal Modelled before contracts are exchanged, not after completion. All four are settled before a general practice accountant opens the property pages in January. Sound familiar

#### Most people arrive here saying one of these  (no id)
None of them is unusual, and none of them is a problem a generalist sees often enough to have a routine for. All of them are ordinary weeks here. Book a consultation My accountant does everything “ He does my brother's restaurant too. I have never been asked about a Form 17. ” I have just bought my third “ The return stopped being something I could do myself somewhere around the second one. ” I refurbished a flat last year “ Nobody told me which of it was a repair and which was capital until the bill arrived. ” Some are personal, some are in a company “ Two SPVs and four in my own name, and nobody is looking at the whole picture. ” MTD is coming at me “ I keep hearing about quarterly filing and I do not know if it applies to me. ” I am thinking about selling one “ An offer is on the table and I have no idea what I actually keep after tax. ” My accountant does everything “ He does my brother's restaurant too. I have never been asked about a Form 17. ” I have just bought my third “ The return stopped being something I could do myself somewhere around the second one. ” I refurbished a flat last year “ Nobody told me which of it was a repair and which was capital until the bill arrived. ” Some are personal, some are in a company “ Two SPVs and four in my own name, and nobody is looking at the whole picture. ” MTD is coming at me “ I keep hearing about quarterly filing and I do not know if it applies to me. ” I am thinking about selling one “ An offer is on the table and I have no idea what I actually keep after tax. ” Fit

#### Who this is for  (no id)
H3s: You bought a flat and the return stopped being simple · You run a portfolio and need numbers you can act on · You hold property through a company · Property is one part of a wider position
If your situation is narrower than the general service, we have work built specifically around it: accounts and returns for landlords , standalone property tax advice where you only need a decision modelled, and the non-resident landlord service if you live outside the UK. 1 to 3 properties You bought a flat and the return stopped being simple The first return you did yourself. Then a remortgage arrangement fee, a boiler replacement that might be capital, a void period and a tenant deposit dispute all landed in the same year, and the finance cost restriction turned a modest profit into a tax bill you did not expect. This is the point where the fee usually pays for itself in claimed expenses alone. 4 to 15 properties You run a portfolio and need numbers you can act on You want to know yield and net profit per property, which mortgage to fix next, and whether the next purchase should sit personally or in a company. You also want the compliance to be a non-event: quarterly MTD updates filed, the return in well before the deadline, no January panic. Limited company and SPV You hold property through a company Statutory accounts, corporation tax, Companies House filing, directors' loan account discipline and a profit extraction plan. Dividend rates rose to 10.75%, 35.75% and 39.35% from 6 April 2026, which changes the salary and dividend mix that used to be automatic. Investor, mixed holdings Property is one part of a wider position Residential, commercial units, a development project, maybe shares and a pension alongside. You need someone who can see the whole tax position, including how a disposal in one part of the portfolio interacts with the annual exempt amount, business asset disposal relief at 18% from 6 April 2026, and the inheritance tax thresholds now frozen to 5 April 2031. What is included

#### What a property accountant covers  (no id)
H3s: Rental accounts and bookkeeping · Self Assessment for rental income · Company accounts for property SPVs · Making Tax Digital · Capital gains and disposals · Structure and planning
Six areas of work. Most clients take all of them, some take one. Rates and thresholds change every year, and several change again in April 2026 and April 2027. The current position across income tax, stamp duty, capital gains and corporation tax is set out on our property tax rates page , and the mechanics of how the tax itself works are covered in our landlord tax guide . Rental accounts and bookkeeping Property-by-property income and expense records, so you can see which flat actually makes money rather than one blended figure for the portfolio. Bank feeds, agent statements and service charge accounts reconciled, with the capital and revenue split done properly at the point of entry rather than guessed at in January. Self Assessment for rental income The property pages of your tax return, prepared with the finance cost restriction applied correctly, allowable expenses claimed in full, and jointly held property split the way your ownership and any Form 17 election actually require. Payments on account checked so you are not overpaying HMRC a year in advance. Company accounts for property SPVs Statutory accounts and CT600 corporation tax returns for buy-to-let limited companies, including directors' loan account tracking, intercompany balances in group structures, and the profit extraction mix that leaves you with the most after tax. Making Tax Digital Quarterly updates under MTD for Income Tax, which applies to qualifying property and self-employment income over £50,000 from April 2026, over £30,000 from April 2027 and over £20,000 from April 2028. Software chosen and set up around how you already record rents, not the other way round. Capital gains and disposals The 60-day CGT return after a residential disposal, base cost reconstructed from purchase and improvement records, private residence and lettings relief where they apply, and disposal timing modelled before you accept an offer rather than after completion. Structure and planning Whether to hold personally or in a company, whether incorporation relief is realistically available and claimed in time, how capital allowances land now that the writing down allowance is 14% with a 40% first year allowance on main pool spend, and what your portfolio does at the point it passes to the next generation. Not sure which of these you actually need? That is what the first call is for. Book a consultation The difference

#### Why a specialist property accountant rather than a general one  (no id)
H3s: The finance cost restriction is a rate change, not a footnote · Capital versus revenue is where the money sits · Property has its own deadlines · Structure decisions compound
Nothing here is exotic. It is simply what you see when property is the only thing on the desk. The finance cost restriction is a rate change, not a footnote Mortgage interest on residential lettings held personally is relieved as a basic rate tax reducer, currently 20%, rising to 22% from April 2027 alongside the new separate property income rates of 22%, 42% and 47%, which leaves higher-rate landlords no better off. A generalist who deducts interest as an ordinary expense produces a return that is wrong on its face. Getting the calculation right also means spotting the years where the reducer is capped by the profit or income limits and carried forward. Capital versus revenue is where the money sits A new kitchen of a similar standard is usually a repair. An extension is not. Replacing single glazing with double glazing follows the current standard rule. Deciding these correctly, and documenting why, is the difference between a deduction now, a deduction on sale, and an enquiry you cannot support. Property has its own deadlines A 60-day CGT return after a residential disposal. ATED returns each April for company-held residential property above the threshold. The non-resident landlord scheme. Quarterly MTD updates from April 2026. These sit outside the ordinary Self Assessment calendar and are easy to miss if property is not what you look at all day. Structure decisions compound Incorporating, adding a spouse to the title, moving to a group, taking money out as a directors' loan repayment rather than a dividend: each one is cheap to plan and expensive to unwind. A specialist tells you the cost of the option you are about to take before you take it. Every client here is a landlord, investor or developer. Nothing else. Book a consultation Testimonials

#### What landlords say  (no id)
Anonymised feedback from landlords and investors across every portfolio size. “ They modelled our Section 24 position properly for the first time and showed us exactly where incorporation did and did not make sense. No hard sell, just the numbers. ” HL Higher-rate landlord 7-property portfolio, London “ We were weeks from missing the 60-day capital gains deadline on a sale. They turned the computation around and filed on time. Worth the fee on that alone. ” BI Buy-to-let investor Manchester “ Getting ready for Making Tax Digital felt overwhelming. They set up the software, mapped every property, and now the quarterly filing just happens. ” IL Individual landlord 2 properties, Leeds Getting started

#### How working together starts  (no id)
H3s: Free consultation · A fixed quote and a scope you can read · Onboarding and clearance · The year runs
01 Free consultation Tell us what you own, how it is held, and what you want to do next. We say plainly whether you need what we do. If your position is a single property and a simple return you can file yourself, we will tell you that. 02 A fixed quote and a scope you can read You get a written engagement letter setting out exactly what is included, what is not, and what it costs for the year. No hourly billing, no surprise invoices for a phone call. 03 Onboarding and clearance Identity checks, HMRC authorisation, and professional clearance from your existing accountant if you have one. We collect prior year returns, computations and capital allowance records so nothing carried forward is lost in the handover. 04 The year runs Records kept current, quarterly filings where MTD applies, questions answered inside 24 hours, and a planning conversation before your year end rather than after it, while the decisions can still change the outcome. Fees

#### What it costs  (no id)
H3s: How many properties you hold · Personally, in a company, or both · Bookkeeping through the year, or a year end return · Whether MTD quarterly filing applies
Fees are fixed and quoted for the year, not billed by the hour, and the figure depends on the shape of the work rather than a tier you pick off a page. We quote after the consultation, in writing, before you commit to anything, and the quote holds for the year. For an honest picture of what firms across the market charge, and what should and should not be included at each level, read our guide to property accountant fees . How many properties you hold The count, and how much movement there is across them in a year. Personally, in a company, or both A mixed structure means two sets of filings and the interaction between them. Bookkeeping through the year, or a year end return Whether we keep the records as you go or pick them up once a year. Whether MTD quarterly filing applies Four submissions a year plus the year end, once you are inside the thresholds. The simple end One property, clean records, an annual return and nothing else moving. The other end Ten properties split across personal ownership and two SPVs, with quarterly filing and monthly management reporting. Want your number? Tell us the shape of the portfolio and we will quote it. Book a consultation Free tools

#### Work out your own numbers first  (no id)
Free, and the figures are yours to take to any adviser. If incorporation is the decision in front of you, our incorporation feasibility analysis models it properly rather than in outline. Section 24 Calculator Your extra tax bill Incorporation Calculator Worth moving to a company? MTD Checker Are you in scope? Portfolio Calculator Property-by-property profit Free consultation

#### Talk to a property accountant about your portfolio  (no id)
H3s: Book your free consultation
A free consultation, a straight answer about whether you need us, and a fixed written quote if you do. Property-only specialists Landlords, investors and developers, nothing else Fixed fees, quoted upfront No hourly billing, no surprise invoices 24-hour response Usually the same working day No obligation and no hard sell. If you do not need us, we will tell you. Book your free consultation I am a... Select... Individual landlord (1-3 properties) Portfolio owner (4-10 properties) Large portfolio (10+ properties) Property developer Something else Full name Email Phone Your situation A couple of sentences helps us prepare properly for your call. What's prompted this now? What do you want from the call? To answer your enquiry, your details may be shared with a firm from our specialist partner network who will contact you. If that firm is unable to help, your details may be passed to another firm in the network for the same purpose. By submitting this enquiry you confirm you understand this. See our Privacy Policy . Request callback We respond within 24 hours and store your details securely. You'll get a text and email from us straight away. A quick reply confirms your callback. FAQ

#### What landlords ask before they engage us  (no id)
H3s: What does a property accountant do? · Do I need a property accountant for one buy-to-let? · What is the difference between a property accountant and a regular accountant? · How much does a property accountant cost? · Do I need a property accountant near me? · Can you take over from my current accountant mid-year? · Do you handle both personally held property and limited companies? · Will you tell me whether to incorporate? · How does Making Tax Digital change what you do for me? · What records do you need from me? · Do you work with non-resident landlords? · What happens if HMRC opens an enquiry?
What does a property accountant do? A property accountant handles the accounting and tax for people who own rental or investment property: rental accounts, the property pages of your Self Assessment return, company accounts and corporation tax for buy-to-let SPVs, quarterly MTD filing, the 60-day capital gains return on residential disposals, and planning around structure, purchases and sales. The core difference from a general accountant is that the property rules are the whole job rather than one client type among fifty. Do I need a property accountant for one buy-to-let? Not necessarily. If you have one property, no mortgage complications and straightforward expenses, the return is manageable on your own. The point at which help usually pays for itself is a residential mortgage in your own name at higher rate tax, a refurbishment where the capital and revenue split is unclear, joint ownership, a sale, or the arrival of MTD quarterly filing. Our free consultation is a fair way to find out which side of that line you are on. What is the difference between a property accountant and a regular accountant? Scope and depth. A regular accountant can prepare a compliant tax return. A property accountant works with the finance cost restriction, private residence and lettings relief, incorporation relief under section 162, capital allowances on commercial and communal areas, ATED, the non-resident landlord scheme, and stamp duty surcharges every week rather than occasionally. Section 162 is a good example of why that matters: for transfers on or after 6 April 2026 the relief is no longer automatic and has to be claimed, by the first anniversary of the 31 January following the tax year of the transfer, and the old election to disapply it has been repealed. Property-specific reliefs are usually missed by volume rather than incompetence: nobody claims what they have not seen before. How much does a property accountant cost? It depends on how many properties you hold, whether they sit personally or in a company, whether you need bookkeeping or only a year end return, and whether MTD quarterly filing applies. We quote a fixed annual fee after the consultation so you know the figure before you commit to anything. Our guide to property accountant fees sets out the ranges you should expect across the market. Do I need a property accountant near me? Location matters much less than it used to. Records arrive digitally, HMRC filing is online, and meetings work as well by video as across a desk. What matters is whether the firm actually works on property. We act for landlords across the UK, from single flats to portfolios of forty, and the tax rules are the same in Leeds as they are in London. If you want a face-to-face meeting, we can arrange one. Can you take over from my current accountant mid-year? Yes. We write for professional clearance, collect your prior year accounts, computations and any carried forward losses or capital allowance pools, and pick up from where they stopped. There is no need to wait for a year end, and switching does not restart anything with HMRC. Most handovers complete inside two weeks. Do you handle both personally held property and limited companies? Yes, and the two together is common. A typical portfolio has older properties held personally and newer purchases in an SPV. We prepare the Self Assessment side and the company accounts and corporation tax side, and treat them as one position when planning, because the decision about where the next purchase goes depends on both. Will you tell me whether to incorporate? We will model it and give you a straight answer. Incorporation triggers capital gains tax and stamp duty on the same day, and those upfront costs need recovering out of annual savings. For a higher rate taxpayer with heavy mortgage interest and a long holding horizon it often works. For a basic rate taxpayer, a low-geared portfolio, or a sale within five years, it usually does not. You can model your own position with our incorporation cost calculator first. How does Making Tax Digital change what you do for me? From April 2026, qualifying property and self-employment income over £50,000 moves to quarterly digital updates, with the threshold dropping to £30,000 from April 2027 and £20,000 from April 2028. In practice that means records have to be kept current through the year rather than reconstructed in December, and four submissions plus a final declaration replace one return. We set the software up, keep the records live, and file the quarters. What records do you need from me? Rent received, agent statements, mortgage interest certificates, insurance, repairs and maintenance invoices, service charge and ground rent demands, professional fees, and completion statements for any purchase or sale. For companies, add the bank statements and anything paid personally on the company's behalf. If your records are currently a folder of photographs, that is workable, and getting them into a usable system is part of onboarding. Do you work with non-resident landlords? Yes. Non-resident landlords have their own scheme for tax deducted at source, their own approval process for receiving rent gross, and a capital gains position that catches disposals of UK property regardless of where you live. It is a distinct piece of work, and our non-resident landlord service covers it in detail. What happens if HMRC opens an enquiry? We handle the correspondence, assemble the supporting records, and deal with HMRC directly on your behalf. Most property enquiries turn on the capital and revenue split, the ownership share used on jointly held property, or undeclared rent from earlier years. Where earlier years are the issue, a disclosure through the Let Property Campaign usually produces a far better penalty outcome than waiting to be found. Related reading

#### More on choosing and working with one  (no id)
H3s: How to choose a property accountant · What a property accountant costs · Changing accountants without losing anything · Finance costs and the interest restriction · MTD for landlords from April 2026 · MTD software compared · Buy-to-let limited companies in full · Filing a landlord Self Assessment return
Article How to choose a property accountant Choosing the right property accountant is one of the more consequential decisions a UK landlord makes. Article What a property accountant costs If you're wondering how much does a property accountant cost, you're not alone. Article Changing accountants without losing anything Changing accountants is not just a relationship decision. Article Finance costs and the interest restriction Section 24 confuses a lot of landlords because of one persistent myth: that it stops you claiming your mortgage interest. Article MTD for landlords from April 2026 Making Tax Digital for Income Tax is no longer a future event. Article MTD software compared Making Tax Digital for Income Tax Self Assessment went live for property income on 6 April 2026 . Article Buy-to-let limited companies in full If you are a higher rate landlord paying tax on rent you never actually keep, a limited company can be the difference between losing half your mortgage interest to Section 24 and deducting all of it. Article Filing a landlord Self Assessment return Filing Self Assessment as a UK landlord involves the SA100 main return, the SA105 UK Property pages, and (if a disposal happened in the year) the SA108 Capital Gains pages.

**FAQ (schema, verbatim):**
- **What does a property accountant do?** A property accountant handles the accounting and tax for people who own rental or investment property: rental accounts, the property pages of your Self Assessment return, company accounts and corporation tax for buy-to-let SPVs, quarterly MTD filing, the 60-day capital gains return on residential disposals, and planning around structure, purchases and sales. The core difference from a general accountant is that the property rules are the whole job rather than one client type among fifty.
- **Do I need a property accountant for one buy-to-let?** Not necessarily. If you have one property, no mortgage complications and straightforward expenses, the return is manageable on your own. The point at which help usually pays for itself is a residential mortgage in your own name at higher rate tax, a refurbishment where the capital and revenue split is unclear, joint ownership, a sale, or the arrival of MTD quarterly filing. Our free consultation is a fair way to find out which side of that line you are on.
- **What is the difference between a property accountant and a regular accountant?** Scope and depth. A regular accountant can prepare a compliant tax return. A property accountant works with the finance cost restriction, private residence and lettings relief, incorporation relief under section 162, capital allowances on commercial and communal areas, ATED, the non-resident landlord scheme, and stamp duty surcharges every week rather than occasionally. Section 162 is a good example of why that matters: for transfers on or after 6 April 2026 the relief is no longer automatic and has to be claimed, by the first anniversary of the 31 January following the tax year of the transfer, and the old election to disapply it has been repealed. Property-specific reliefs are usually missed by volume rather than incompetence: nobody claims what they have not seen before.
- **How much does a property accountant cost?** It depends on how many properties you hold, whether they sit personally or in a company, whether you need bookkeeping or only a year end return, and whether MTD quarterly filing applies. We quote a fixed annual fee after the consultation so you know the figure before you commit to anything. Our guide to property accountant fees sets out the ranges you should expect across the market.
- **Do I need a property accountant near me?** Location matters much less than it used to. Records arrive digitally, HMRC filing is online, and meetings work as well by video as across a desk. What matters is whether the firm actually works on property. We act for landlords across the UK, from single flats to portfolios of forty, and the tax rules are the same in Leeds as they are in London. If you want a face-to-face meeting, we can arrange one.
- **Can you take over from my current accountant mid-year?** Yes. We write for professional clearance, collect your prior year accounts, computations and any carried forward losses or capital allowance pools, and pick up from where they stopped. There is no need to wait for a year end, and switching does not restart anything with HMRC. Most handovers complete inside two weeks.
- **Do you handle both personally held property and limited companies?** Yes, and the two together is common. A typical portfolio has older properties held personally and newer purchases in an SPV. We prepare the Self Assessment side and the company accounts and corporation tax side, and treat them as one position when planning, because the decision about where the next purchase goes depends on both.
- **Will you tell me whether to incorporate?** We will model it and give you a straight answer. Incorporation triggers capital gains tax and stamp duty on the same day, and those upfront costs need recovering out of annual savings. For a higher rate taxpayer with heavy mortgage interest and a long holding horizon it often works. For a basic rate taxpayer, a low-geared portfolio, or a sale within five years, it usually does not. You can model your own position with our incorporation cost calculator first.
- **How does Making Tax Digital change what you do for me?** From April 2026, qualifying property and self-employment income over £50,000 moves to quarterly digital updates, with the threshold dropping to £30,000 from April 2027 and £20,000 from April 2028. In practice that means records have to be kept current through the year rather than reconstructed in December, and four submissions plus a final declaration replace one return. We set the software up, keep the records live, and file the quarters.
- **What records do you need from me?** Rent received, agent statements, mortgage interest certificates, insurance, repairs and maintenance invoices, service charge and ground rent demands, professional fees, and completion statements for any purchase or sale. For companies, add the bank statements and anything paid personally on the company's behalf. If your records are currently a folder of photographs, that is workable, and getting them into a usable system is part of onboarding.
- **Do you work with non-resident landlords?** Yes. Non-resident landlords have their own scheme for tax deducted at source, their own approval process for receiving rent gross, and a capital gains position that catches disposals of UK property regardless of where you live. It is a distinct piece of work, and our non-resident landlord service covers it in detail.
- **What happens if HMRC opens an enquiry?** We handle the correspondence, assemble the supporting records, and deal with HMRC directly on your behalf. Most property enquiries turn on the capital and revenue split, the ownership share used on jointly held property, or undeclared rent from earlier years. Where earlier years are the issue, a disclosure through the Let Property Campaign usually produces a far better penalty outcome than waiting to be found.

**Body links out today:** /, /blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk, /blog/landlord-tax-essentials/how-to-complete-landlord-self-assessment-filing-step-by-step-guide, /blog/making-tax-digital-mtd/best-mtd-software-landlords-2026, /blog/making-tax-digital-mtd/making-tax-digital-landlords-april-2026-deadline, /blog/property-accountant-services/change-landlord-accountants, /blog/property-accountant-services/how-much-does-a-property-accountant-cost, /blog/property-accountant-services/how-to-choose-a-property-accountant, /blog/section-24-and-tax-relief/finance-costs-section-24-complete-guide, /contact, /incorporation, /landlord-tax, /privacy-policy, /property-tax-rates, /services, /services/landlord-accountant, /services/non-resident-landlord, /services/property-tax-advice

## 6. Links that will point at this page, and what their anchors promise (audit §2c; this page is `PA`)

The page must answer what these anchors promise. Rows with Target `PA` are yours. The applied set, with final wording, is `briefs/property/wp1-services/LINKS_APPLIED_2026-10-09.md`.

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

## 8. Preserve through the rewrite (audit §6; column `PA`)

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
