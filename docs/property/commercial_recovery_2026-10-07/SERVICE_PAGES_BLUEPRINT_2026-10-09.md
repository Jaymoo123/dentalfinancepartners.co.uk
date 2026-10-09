# Service pages blueprint, 2026-10-09

The build instructions for making `/services/property-accountant`, `/services/landlord-accountant` and `/services/property-tax-advice` the pages that own the site's commercial demand. This document is the WP1 detail the 7 Oct plan (`../COMMERCIAL_RECOVERY_PLAN_2026-10-07.md`) deferred. It is written for the agent that builds it: every instruction names a file, a command or a number, and every judgment call the owner has already made is recorded as a ruling, not a suggestion. Where a fact is still unknown it is marked UNKNOWN with what resolves it.

Companion files in this folder, all dated 2026-10-09 unless stated:

| File | What it holds |
|---|---|
| `GSC_FRESH_2026-10-09_hire_intent_90d.csv` | Fresh Search Console, unsampled, every hire-intent row and every `/services*` row, 10 Jul to 7 Oct |
| `SERP_LIVE_2026-10-09_head_terms.csv` | Live UK top-10 for the 12 head terms |
| `PAA_2026-10-09.csv`, `TEARDOWN_pages.csv`, `TEARDOWN_2026-10-09.md` | People Also Ask per term, the winning pages' anatomy, the teardown read |
| `QUERY_ASSIGNMENT_2026-10-09.csv` and `.md` | Every query, its owner page and its placement |
| `AUDIT_IMPL_2026-10-09.md` | The three pages as they are today, file:line; inbound links; header; llms.txt; gates |
| `snapshots_2026-10-09/` | Rendered HTML of the six pages as served on 9 Oct (rollback reference) |
| `INV_A_report.md` addendum | The fresh reads: GSC, Bing, SERPs, domain strength, page speed |
| `QRY_C_universe.csv`, `BING_G_*`, `SCHEMA_F_report.md`, `COMP_D_report.md` | 7 Oct inputs, still valid |

## 0. The one-paragraph brief

Google already treats the site as relevant for "property accountant" and its family: it showed our pages for the top 30 hire-intent queries 8,700 times in 90 days. It has no page it considers the answer, so it rotates city pages and city posts at positions 10 to 60 and we got 5 clicks from all of it. The three service pages that should answer have not been fetched since 5 to 6 August and sit at positions 56 to 99 for their own phrases. The job is a consolidation: make each service page the obvious answer for one phrase family, point the site at it, re-aim the pages that currently catch the phrases so they keep their local ones and give up the national ones, get Google to fetch the three pages, and read the result at day 14 and week 4. Nothing is redirected, nothing is deleted, every page keeps its URL.

## 1. Rulings already made (do not re-open)

| # | Ruling | Source |
|---|---|---|
| R1 | The three pages are rewritten in place at their existing URLs. No new URLs, no redirects, no deletions. Rewrite-only is the standing rule for the whole estate. | owner 2026-10-09; `standard_terms` §4, §9 |
| R2 | One owner per phrase family. `/services/property-accountant` owns "property accountant(s)", "accountant(s) for property", "uk property accountants", "specialist property accountant", "property tax accountant", "property investment accountant", "accountant for property investors", and the "near me" forms as coverage intent only. `/services/landlord-accountant` owns "landlord accountant(s)", "accountants for landlords", "buy to let accountant(s)", "landlord tax accountant", "rental accountant". `/services/property-tax-advice` owns "property tax advice", "property tax advisor/adviser", "property tax specialist(s)", "property tax consultant", "property tax planning". The full per-query list is `QUERY_ASSIGNMENT_2026-10-09.csv`. | owner 2026-10-09 |
| R3 | The homepage gives up "property accountants UK". Its title becomes brand-and-umbrella. The homepage is frozen; this is the S1-level sign-off and it has been given. | owner 2026-10-09 |
| R4 | City forms stay with the city pages. A service page never claims "property accountant in Bristol"; the Bristol page never claims "property accountant". Cities with no page (Luton, Glasgow, Belfast, Edinburgh and the rest) are a WP4 decision, not stuffed anywhere now. | owner 2026-10-09 |
| R5 | Query selection is intent-led, not literal. A phrase goes into page copy only where a person would naturally write it. "near me" and stacked "uk" never appear as strings; they are served by a coverage statement. Brand, `site:`, misspellings, competitor brands, career, course, software, salary and listicle ("best", "top 10", "compare") queries are excluded. The coverage check in the engine is run against the assignment table's `placement` column, not against literal presence. | owner 2026-10-09 |
| R6 | Sequence: ship the three service pages first and request indexing; re-aim the Belfast post, the Manchester post and the city pages' titles only after Google has fetched the new owners (URL Inspection shows a crawl date after the deploy) and they appear in Search Console for the family phrases. Never retitle the current top-10 holders on the same day. | owner 2026-10-09 |
| R7 | The six facts (phone, hours, fee band, professional body, response time, office address in body) are deferred. Build nothing that depends on them. Build the pages so a contact block and a fees section slot in without a rewrite. | owner 2026-10-08 |
| R8 | No Google Business Profile, ever. The local map pack is out of scope. | `standard_terms` §9 |
| R9 | Content is written by an Opus or Fable agent, never Sonnet. Two QA tracks, both Opus: factual against `docs/property/house_positions.md`, and editorial. | `standard_terms` §3, §4 |
| R10 | Deploy is owner-triggered, from the laptop, from a clean worktree at a pushed SHA, one deploy for this work package. Nothing is deployed from a cloud session. | `standard_terms` §2, §6 |
| R11 | Nothing new that emails, pings or interrupts the owner. The reads in §9 are run and written to this folder, not mailed. | `standard_terms` §7 |
| R12 | `packages/web-shared` is not edited for this work. Every change is under `Property/`. If a shared component blocks something, wrap or override it in Property. | 7 Oct plan scope line |
| R13 | Honest target: top 5 on the two head terms within a quarter from on-page work. Number 1 depends on the deferred facts and on off-site authority (domain rank 124, 53 referring domains, against 80 to 1,527 for the winners). Do not promise #1 in any doc or read. | fresh read 2026-10-09 |

## 2. What the data established (the facts the build rests on)

- Demand: 9,110 / 3,820 / 1,150 monthly UK searches belong to the three pages' phrase families (QRY_C, verified 2026-10-08 from the universe file).
- Visibility today, 90 days to 7 Oct: `/services/property-accountant` 1 impression, `/services/landlord-accountant` 151 (best position 56 for "landlord accountant"), `/services/property-tax-advice` 209 (position 71 for "property tax advice"). 0 clicks between them. All three indexed, canonical correct, last crawled 5 to 6 Aug. (`INV_A_report.md` addendum, URL Inspection.)
- Who takes the demand instead: city location pages 4,381 impressions and 7 clicks; city and hub posts 3,665 and 4; homepage 259 and 0; audience pages 61 and 0. For "property accountant", the typical result over the last 14 days is `/locations/bristol` at position 13; the noindexed career post still draws 601 impressions on the stale copy; the live SERP on 9 Oct once showed `/landlord-tax` at #4, which Search Console does not corroborate as the usual placement.
- Live SERPs, 9 Oct: we hold `#4` and `#8` for "property accountant" (the guide and the Belfast post) and `#5` and `#7` for "property tax accountant" (Belfast and Manchester posts) in that one fetch; nothing in the top 10 for the other ten terms. 9 of 12 SERPs carry a local pack, 11 carry People Also Ask, 5 carry an AI overview. Ten domains recur: ukpropertyaccountants.co.uk, djh.co.uk, hwfisher.co.uk, andrewpasser.com, bhp.co.uk, mccaccountants.co.uk, nrla.org.uk (RITA4Rent), perrysaccountants.co.uk, fhpaccounting.co.uk, thepropertyaccountant.co.uk.
- Bing: 69 hire-intent impressions and 5 clicks site-wide, none on these pages. Nothing on Bing's search side to protect. The ChatGPT citation of `/services/property-tax-advice` (15 sessions, 4 leads per 28 days, BING_G) is the one Bing-side asset.
- Speed: the service pages load in 0.45 to 1.1s LCP, INP under 130ms. Not a factor.
- The homepage title "Property Accountants UK | Specialist Landlord Tax Advice" currently takes "uk property accountants" (140 impressions). R3 resolves it.
- `/for/landlord-retirement-and-succession` holds position 4 for "property tax accountant" (24 impressions); `/for/selling-a-buy-to-let` position 10 for "buy to let accountant". Both link to the owner page and stop claiming the phrase in their titles (checked in §6).

## 3. Page specification (one block per page)

The shared shape, then the per-page tables. The teardown (`TEARDOWN_2026-10-09.md`) supplies the winning-pattern evidence; the assignment table supplies the phrases; the audit supplies the current state and what to preserve.

### 3.1 Shared shape, in reading order

1. **Title** (≤ 60 characters): the family's head phrase, a specialism qualifier, the brand. Pattern from the winners: "Property Accountants UK | Specialist Landlord Tax | Property Tax Partners". The exact strings are in §3.2 to §3.4 and must pass the Bing veto check (§7) before build.
2. **H1**: the head phrase in natural form, one line, no pipe. One H1 per page.
3. **Answer-first opening** (60 to 90 words, before any heading): who the page is for, what the firm does for them, where (UK-wide, remote, registered office in Shipley), and the free first call. This paragraph is what an AI overview lifts; it must stand alone and contain no claim from the deferred facts.
4. **Coverage statement** (one sentence inside the opening or the first section): the national-and-remote line that serves every "near me" and "uk" query without the literal strings (R5).
5. **What we do** (H2, the services list): 4 to 7 items as H3s, each 60 to 120 words, each item's name identical to its `hasOfferCatalog` entry in the schema. The H3 names are the assignment table's H2/body phrases where natural.
6. **Who we work with** (H2): the audiences, each one sentence, linking to the matching `/for/*` page. This is where the audience phrases live without the service page claiming them.
7. **How it works** (H2): the three-step engagement in plain words. The free first call is step one. "Fixed fees quoted upfront, you approve the fee before work starts" is the verified wording (7 Oct plan WP1.4) and the only fee claim allowed until F3 exists.
8. **How our fees work** (H2): the fees section slot. Until F3: how fees are set, what drives them, that a figure is given before any work starts, no numbers. When F3 arrives: the band or "from" figure goes here and nowhere else.
9. **Why a specialist** (H2): the firm's specialism statement, taken from `entity.firm` wording (D3 ruling: "We work only on property tax"), the Section 24 / MTD / incorporation / CGT competence in one paragraph each with a link to the pillar guide. No "every client is..." claim, no "24-hour guarantee".
10. **Questions people ask** (H2): the FAQ, 8 to 12 items, each question phrased as the People Also Ask entry it answers, each answer 40 to 90 words, answer first. The visible list and the `FAQPage` schema must be identical strings. Questions assigned to this page in `PAA_2026-10-09.csv` and the `faq` rows of the assignment table.
11. **Related guides** (H2): 4 to 6 links to the pillar guides and the strongest posts in the family, by their real titles. These are the page's outbound equity.
12. **Contact block slot**: the `LeadCTAPanel` that already closes the page (id `book`), unchanged. The phone, hours and address lines are added here when F1, F2 and F6 arrive, not before.
13. **Local coverage** (short H2 or a sentence in the opening): links to the five `/locations/<city>` pages by city name. This is the only place a city is named on a service page.

Length: 1,600 to 2,400 words of body copy excluding the FAQ, which is shorter than today's 4,700 to 4,900 words of file content. The winners are not long; they are specific. Cut, do not pad.

Schema per page (one JSON-LD graph, built where the page builds it today, see the audit §1):
- `Service` with `@id` `<page-url>#service`, `name` equal to the H1, `serviceType`, `provider` `{ "@id": "<site>/#organization" }`, `areaServed` `{ "@type": "Country", "name": "United Kingdom" }`, `hasOfferCatalog` with one `Offer` per "What we do" item, names identical to the H3s, no prices until F3.
- `FAQPage` with the visible questions, identical strings.
- `BreadcrumbList` as today.
- `Organization` is referenced, not redefined, on these pages. `telephone` and `openingHoursSpecification` are added to the organization node (homepage) when F1 and F2 arrive.
- No `LocalBusiness` on a service page (that type belongs to the location pages). No `aggregateRating` (no reviews exist to back it).

What must not change (from the audit §6): the route files' metadata export shape, `generateMetadata` if present, the schema builder imports, the analytics ids (`data-cta`), the `id="book"` anchor and the `LeadCTAPanel`, the tests that snapshot these pages (update snapshots only after a human read).

### 3.2 `/services/property-accountant`

PENDING the assignment table and teardown: title string, H1, H2 set, FAQ set, coverage statement, links in, links out, pages that give up phrases. Filled in §3.2 of the final version of this document.

### 3.3 `/services/landlord-accountant`

PENDING, as 3.2.

### 3.4 `/services/property-tax-advice`

PENDING, as 3.2. Additional constraint: the sentences that ChatGPT currently cites (`BING_G_chatgpt_entries.csv`) are kept verbatim or their facts kept in the same section, so the citation survives the rewrite.

## 4. The pages that give up phrases (and what they keep)

Filled from the assignment table's "give up" list. Rule for each: title and H1 re-aimed at the page's own intent (city or guide), one body link added to the owner page with the family phrase as the anchor, nothing else changed, URL untouched, done only after R6's condition is met.

| Page | Phrase it gives up | What it keeps | Change |
|---|---|---|---|
| homepage `/` | "property accountants uk", "uk property accountants" | brand, umbrella | title → brand-and-umbrella (R3), link to the three service pages in the services section (S2) |
| `/locations/bristol` | "property accountant", "property tax accountant near me", "property specialist accountant" | "accountant in bristol", "property accountant bristol" | title "Property Accountant in Bristol | ..." (already), body link to owner |
| `/locations/birmingham` | "property accountants", "buy to let accountants", "accountants for buy-to-let landlords" | "property accountant birmingham", "west midlands" | body link to owner |
| `/locations/manchester`, `/locations/leeds` | national forms | city forms | body link to owner |
| Belfast post | "accountants for landlords", "landlord accountants", "property tax accountant" | Belfast forms | title re-aimed to Belfast, body link, after R6 |
| Manchester post | "property tax specialist", "property accountant manchester" | Manchester forms | it is "Page with redirect" in Google's index (crawled 25 Aug); check its canonical/redirect state before touching it (UNKNOWN: which redirect; the audit resolves it) |
| `/landlord-tax` guide | nothing in title; it holds the #4 live placement | its guide intent | body link to `/services/landlord-accountant` and `/services/property-accountant` with family anchors; title untouched |
| `/for/landlord-retirement-and-succession` | "property tax accountant" | its audience phrase | body link to `/services/property-accountant` |
| `/for/selling-a-buy-to-let` | "buy to let accountant" | "cgt accountant" | body link to `/services/landlord-accountant` |
| career post `how-to-become-property-accountant` | nothing to do: noindexed, Google read the tag on 3 Sep; the stale copy clears on its own | | none |

## 5. Links in (the 30-plus per page)

From the audit §2: the list of candidate source files that are indexed, with the sentence each link sits in. Rules: body text, not a sidebar or footer module; the anchor is the family phrase or a natural variant from the assignment table; one link per source page per owner; the five city pages, the six pillar guides, the `/for/*` pages and the category's indexed posts come first; unindexed posts are not counted toward the 30 (they are linked anyway, cost nothing). Header: WP1.1 renders the dropdown links in the server HTML, which adds a crawlable link on every page; it does not count toward the 30 body links but it is what gets the pages fetched.

## 6. The order of work, with gates

Each step names what must be true before the next starts. One branch for the whole package: `claude/wp1-service-pages` from `main` after the `claude/website-estate-access-gdk8ei` branch has merged or been rebased in (it carries the hero-CTA restore, the widget delay, the GSC service-account support and this folder).

1. **Confirm inputs are current.** If more than 14 days have passed since 2026-10-09, re-pull Search Console (`agents/utils/gsc_client_oauth.py` with `GSC_SERVICE_ACCOUNT_JSON` in the environment) and re-run the 12 SERPs. Record the date in this document's header.
2. **Freeze the assignment table.** The owner has approved the families (R2); the per-query CSV is the working truth. Any new query found at step 1 is added with an owner and a placement before writing starts.
3. **Bing veto.** Run `scripts/_bing_veto_audit_2026_08_05.py` (usage in the audit §5) over every proposed title and H1 for the three pages and the give-up pages. A veto blocks the string; choose the next natural variant.
4. **Research pack per page** (REWRITE_PROGRAM §9.5): the assignment rows for the page, the PAA questions, the teardown rows for the page's term, `house_positions.md`, the current page's rendered copy, the chatGPT-cited sentences for the tax-advice page.
5. **Write** (R9): one Opus or Fable agent per page, in parallel, batch size 1. Output is the full route file, copy and schema, preserving everything the audit §6 lists. No em-dashes in copy. Every number cites a `house_positions.md` section.
6. **QA, two tracks, both Opus, blocking** (REWRITE_PROGRAM §9.9): factual against house positions and against the deferred-facts rule (any phone, hours, price, body or named-person claim fails the page); editorial (no cross-page sameness, no AI tells, no pipeline artefacts, every FAQ question matches its schema string, every H3 matches its offer name).
7. **Coverage floor** (`track2_query_coverage.py`, run against the assignment table's `placement` column, R5). A page fails if any `title`/`h1`/`h2`/`faq` row for it is absent; `coverage_statement` rows pass on the coverage sentence; `exclude` rows must be absent.
8. **Site wiring:** header links server-rendered (WP1.1), the give-up pages' body links (§4, links only at this step, no title changes yet per R6), the 30-plus links in (§5), `llms.txt` and `llms-full.txt` lines (audit §4), the services index page's cards if their copy references the old titles.
9. **Build gates, in this order, all green before a human read:** `npx tsc --noEmit -p Property/web/tsconfig.json`; `cd Property/web && npx vitest run`; `npm run build` in `Property/web`; the no-JS render check (`curl -s <page> | grep` for the H1, every FAQ question, the services list and the header links); the JSON-LD parse check (the audit names the script); `python scripts/check_dependency_closure.py`; `python scripts/predeploy_gate.py` (the audit names its flags); the link audit script. Every command and its expected output is listed in the audit §5.
10. **Human read:** the owner walks the three pages and the header locally or on screenshots (desktop 1280, phone 390). Build nothing further until he approves.
11. **Deploy** (R10): the owner deploys once from the laptop. Then, in this order, the same day: request indexing for the three service pages and the homepage via Search Console (manual, or `agents/utils/gsc_client_oauth.py` has the Indexing scope); IndexNow drain for the changed URLs; the `site_flags` and `monitored_pages` SQL the 7 Oct plan's DONE_E lists (owner-run); record the deploy SHA and time in `docs/property/STATE.md`.
12. **Wait.** No further Property deploys for 14 days unless something is broken. The September crawl trough followed 31 deploys in ten days.
13. **Day 14 read** (§9). If the three pages have been fetched and appear for the family phrases, execute §4's title changes on the Belfast and Manchester posts and the city pages (R6), one deploy, then wait again.
14. **Week 4 read** (§9). Decide WP2 (hub), WP3 (city pages) and WP4 (cities with no page) from the numbers.

## 7. Bing and AI protection

- Bing veto on every title and H1 before build (step 3). Slugs and URLs never change.
- The tax-advice page keeps the sentences ChatGPT cites (`BING_G_chatgpt_entries.csv`); the editorial QA has that list and fails the page if a cited fact is gone.
- Every page is fully readable with JavaScript off: header links, services list, FAQ answers and the opening paragraph in the server HTML; stable `id` attributes on every H2 so a section can be cited by anchor.
- `llms.txt` and `llms-full.txt` describe the pages with the new opening sentence, in lockstep with the deploy.
- Day 14 and week 4 reads include Bing impressions for the three pages (expected near zero, confirm no loss elsewhere) and ChatGPT entries from the referrer data in `web_sessions` (baseline 15 sessions and 4 leads per 28 days on the tax-advice page).

## 8. Risks and the answer to each

| Risk | Answer |
|---|---|
| Google keeps preferring the Bristol page or the Belfast post for the national phrase after the rewrite | R6: the owners ship first; the give-up pages are re-aimed only when the owners are fetched and visible. If after week 4 Google still prefers a city page, the fallback is a stronger body-link anchor from that page and a `rel=canonical` is NOT used (different intents, both pages stay). |
| The Belfast post loses its #5 to #8 placements before the service page gains | Same answer: sequence. Expect a dip on the national phrase for the post; its Belfast phrases are untouched. |
| The rewrite drops the ChatGPT citation on the tax-advice page | The cited sentences are preserved by name; the week-4 read checks referrals. |
| A title fails the Bing veto | Pick the next variant from the assignment table; never ship a vetoed string. |
| The coverage tool forces literal phrases in | R5: it runs against `placement`, not literal presence. If the tool cannot do that, the agent runs the check by hand against the CSV and records it. |
| Thin or templated copy (the A* bar) | Two Opus QA tracks are blocking; the owner's human read is the final gate. |
| Thirty deploys again | One deploy per step 11 and step 13; nothing else for Property in between. |
| Shared component change leaks to other sites | R12: nothing in `packages/web-shared`. |
| The deferred facts never arrive | The pages work without them (top-5 target). The fees section and contact block are built as slots so adding them later is a copy change, not a rewrite. |
| CI noise | One push per milestone; `content-quality-check.yml` runs on every push and emails on failure; run the gates locally first. |

## 9. Reads (what "worked" means, written down before the deploy)

Baselines, 90 days to 7 Oct, from `INV_A_report.md` addendum: service pages 1 / 151 / 209 impressions, 0 clicks, positions 99 / 56 / 71 on head phrases; hire-intent top 30 queries 5 clicks total; Bristol page position 13 for "property accountant"; ChatGPT 15 sessions and 4 leads per 28 days on the tax-advice page; Property UK leads 12.3 a week.

Day 14, written to this folder as `READ_D14_<date>.md`, nothing mailed:
- URL Inspection: all three pages crawled after the deploy date, "Submitted and indexed", canonical self.
- Search Console, 14 days: impressions on each page for its family phrases; position for the head phrase; whether the page appears at all for "property accountant", "landlord accountant", "property tax advice".
- Live SERP for the three head phrases: which of our pages shows.
- Pass: all three crawled, each appears for its head phrase at any position. Then step 13.
- Fail: not crawled after 14 days. Then request indexing again, check the header links are in the HTML, check robots and sitemap, and wait a further 14 days; no copy changes.

Week 4, `READ_W4_<date>.md`:
- Positions on the head phrases versus baseline; impressions and clicks on the three pages; the give-up pages' local phrases unchanged; ChatGPT referrals held; Property leads per week and the contact-form submits from the service pages (`web_events`, `form_id` on these paths).
- Success is the service pages holding positions better than the city pages previously held for the same phrases (Bristol was 13 for "property accountant"); the top-5 target is a quarter's horizon, not four weeks.

## 10. Rollback

Every page is a committed file: `git revert` the deploy commit, redeploy, request indexing. The rendered copies of the six pages as served on 9 Oct are in `snapshots_2026-10-09/` for diffing. The assignment CSV and this document are kept regardless of outcome; they are the record of what was tried.

## 11. Open items (the only ones)

| Item | Who | Resolves |
|---|---|---|
| F1 to F6 (phone, hours, fee band, professional body, response time, office in body) | owner, "100% keeping them in mind for the future" | the contact block and the numbers in the fees section; the ceiling above top 5 |
| D4 and D5 of the 7 Oct plan (move the 12 off-topic posts out of the hub; the request-indexing test) | owner | WP2, not this package |
| Manchester post's redirect state | the audit | whether it is touched in §4 |
| Cities with demand and no page | week-4 read | WP4 |
