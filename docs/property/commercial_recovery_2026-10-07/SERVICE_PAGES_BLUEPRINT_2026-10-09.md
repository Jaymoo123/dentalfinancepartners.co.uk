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
| R14 | Tax-advice page: title carries both "property tax advice" and "specialist" ("Property Tax Advice \| Specialist Property Tax Advisers UK \| Property Tax Partners" or the Bing-clean variant); H1 is "Property tax advice". The URL phrase and the ChatGPT citation stay intact. | owner 2026-10-09, assignment Q1 |
| R15 | "Landlord tax advice" and "tax advice for landlords" (351 impressions, currently on `/landlord-tax` at 74 to 89) belong to `/services/property-tax-advice`. Advice intent goes to the advice page; the guide keeps the explainer queries. | owner 2026-10-09, Q2 |
| R16 | City districts (Headingley, Horsforth, Erdington, Westminster, Camden, EC1, Farringdon, Tower Hamlets, Hornchurch, Wallington) belong to the parent city page's coverage, not to WP4. | owner 2026-10-09, Q3 |
| R17 | West Midlands is named in the Birmingham page's coverage sentence; Cannock is not named anywhere. Neither goes to WP4. | owner 2026-10-09, Q4 |
| R18 | When a city form and an audience form collide ("capital gains tax accountant london", "accountant for letting agents leicester"), the city page wins. The one exception is the non-resident landlord, whose client is abroad: those forms go to `/services/non-resident-landlord`. | owner 2026-10-09, Q5 |
| R19 | Generic cost queries with no property word ("how much do accountants charge", 2,480 a month) are excluded. They are not this niche. | owner 2026-10-09, Q6 |
| R20 | Generic "accountant in <city>" queries are city forms. Cities with no page go to the WP4 list ranked by Search Console impressions, not by volume (Luton's 720 a month is generic accountancy demand, not ours). | owner 2026-10-09, Q7 |
| R21 | Commercial property and development accountancy get one sentence in the property-accountant body, and only if `house_positions.md` or the firm's services list says the firm does that work. Logged as a page gap in §11, not built. | owner 2026-10-09, Q8 |
| R22 | "Property incorporation tax advice" belongs to `/for/moving-property-into-a-limited-company`, not to the `/incorporation` guide. Hire intent goes to the audience page. | owner 2026-10-09, Q9 |
| R23 | "What does a specialist property accountant do?" is a FAQ on the property-accountant page (it is a People Also Ask entry) even though the 7 Oct universe tagged it career. | owner 2026-10-09, Q10 |
| R24 | "Property tax accounting" and "property accounting" forms live in body copy only, never in a heading. | owner 2026-10-09, Q11 |
| R25 | The hire-intent filter includes "tax advice", "accountancy" and "tax expert". | owner 2026-10-09, Q12 |
| R26 | The homepage title is brand plus what the firm is, with no query target: "Property Tax Partners \| Specialist Accountants and Tax Advisers for UK Landlords and Property Investors" (shortened to fit 60 characters in the title tag, full form in the H1 or opening). The homepage keeps brand queries only. | owner 2026-10-09, Q13 |

## 2. What the data established (the facts the build rests on)

- Demand: 9,110 / 3,820 / 1,150 monthly UK searches belong to the three pages' phrase families (QRY_C, verified 2026-10-08 from the universe file).
- Visibility today, 90 days to 7 Oct: `/services/property-accountant` 1 impression, `/services/landlord-accountant` 151 (best position 56 for "landlord accountant"), `/services/property-tax-advice` 209 (position 71 for "property tax advice"). 0 clicks between them. All three indexed, canonical correct, last crawled 5 to 6 Aug. (`INV_A_report.md` addendum, URL Inspection.)
- Who takes the demand instead: city location pages 4,381 impressions and 7 clicks; city and hub posts 3,665 and 4; homepage 259 and 0; audience pages 61 and 0. For "property accountant", the typical result over the last 14 days is `/locations/bristol` at position 13; the noindexed career post still draws 601 impressions on the stale copy; the live SERP on 9 Oct showed the explainer post `/blog/property-accountant-services/what-does-a-property-accountant-do` at #4 in two of three pulls (an earlier note that named `/landlord-tax` was wrong; the SERP CSV row is the record), which Search Console does not corroborate as the usual placement.
- Live SERPs, 9 Oct, three pulls over 70 minutes (`TEARDOWN_2026-10-09.md`): the top 10 rotates; on 9 of 12 terms at least one pair of pulls shares one URL or none, so a single SERP read is a sample, not a standing. We hold `#4` and `#8` for "property accountant" (the explainer post and the Belfast post, two pulls of three) and `#5` and `#7` for "property tax accountant" (Belfast post and `/locations/manchester`, stable in all three pulls); none of the three service pages is in any top 10 in any pull. 9 of 12 SERPs carry a local pack, 11 carry People Also Ask, 10 carried an AI overview in at least one pull.
- What the winners have that we do not (39 top-3 pages, teardown §b): a visible phone number on 36, a review widget or count on 21, a professional body named on 17, a fee figure on 4. Our three pages have none of the four. We already exceed them on FAQ (12 each with schema, against 13 of 39 having 3 or more) and on length (2,689 to 3,232 words against a median of 1,144). The gap is trust and contact signals, which are the deferred facts (R7); the on-page work in this blueprint is what is available without them, hence R13's top-5 target.
- AI overviews cite one answer-first definition sentence then bold-label bullets, no tables, no numbered lists; four of eight carry a "typical costs" block drawn from pages that publish fees. We are cited once (the Manchester page and the explainer post), never a service page. Ten domains recur: ukpropertyaccountants.co.uk, djh.co.uk, hwfisher.co.uk, andrewpasser.com, bhp.co.uk, mccaccountants.co.uk, nrla.org.uk (RITA4Rent), perrysaccountants.co.uk, fhpaccounting.co.uk, thepropertyaccountant.co.uk.
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
| `/landlord-tax` guide | "landlord tax advice", "tax advice for landlords" (351 impressions, R15) | its explainer queries ("landlord tax", "what tax do landlords pay") | body link to `/services/property-tax-advice` with an advice anchor and to `/services/landlord-accountant` with a hire anchor; title untouched |
| explainer post `/blog/property-accountant-services/what-does-a-property-accountant-do` | nothing in title (it is a "what does ... do" explainer); it held #4 for "property accountant" in two of three pulls on 9 Oct | its explainer intent | body link to `/services/property-accountant` in its "getting help" paragraph with the family anchor; title untouched; never retitled toward the hire phrase |
| `/for/landlord-retirement-and-succession` | "property tax accountant" | its audience phrase | body link to `/services/property-accountant` |
| `/for/selling-a-buy-to-let` | "buy to let accountant" | "cgt accountant" | body link to `/services/landlord-accountant` |
| career post `how-to-become-property-accountant` | nothing to do: noindexed, Google read the tag on 3 Sep; the stale copy clears on its own | | none |

## 5. Links in (the 30-plus per page, placed naturally)

Owner, 2026-10-09: "We also need to think about the other pages that are going to be linking to these pages (naturally)." The link is only worth having if a reader would follow it, so every link is a sentence that belongs in its source page, not a module bolted on. The per-source list (file, indexed or not, the paragraph it sits in, the proposed sentence, the anchor, the owner page) is in `AUDIT_IMPL_2026-10-09.md` §2 and is the working truth; this section is the rules it was built under.

### 5.1 Rules

1. **Body copy only.** A link in a sidebar, footer, "related" module, breadcrumb or the header does not count toward the 30. Those exist or will exist (header, WP1.1) and are what gets the page fetched; the body links are what tell Google what the page is for.
2. **One link per source page per owner page.** A guide may link to all three service pages if it naturally touches all three subjects, once each. A city page links to all three (its service list) and nothing more.
3. **The link sits where the subject comes up.** The sentence it lives in must already be about hiring help, fees, what an accountant does, or the service in question. If the source has no such sentence, write one that answers a question the page's reader has at that point ("if you would rather hand this to someone, ...") and place it after the section that raises the need, never in the opening paragraph and never as the last line of the page.
4. **Anchor text varies.** At most one third of the links to an owner page carry the exact family phrase ("property accountant", "landlord accountant", "property tax advice"). The rest are natural variants from the assignment table's `body` rows ("accountants for landlords", "specialist property accountants") or descriptive phrases ("our landlord accountancy service", "a fixed-fee review of your position"). No two source pages of the same type use the same sentence.
5. **The anchor matches the destination's intent.** Hire intent anchors go to a service page; "what is Section 24" style anchors go to the guide. A city page's "property accountant in Leeds" anchor stays on the city page (R4) and must not point to the national page.
6. **Never from a page that gives up a phrase in its title before R6's condition.** The body link is added at step 8 of §6 (it is the mechanism that hands the phrase over); the title change waits for the day-14 read.
7. **Posts are edited individually.** Each post is its own content file; there is no template edit that counts as a body link. A shared post component that could add a link to all 800 posts in one edit is the opposite of natural and is not used for this (the audit names the component so nobody reaches for it).
8. **Indexed first.** Order of effort: the five `/locations/<city>` pages, the seven pillar guides, the `/for/*` pages, the services index, the homepage services section, then indexed posts in the family's category in descending Search Console impressions. Unindexed posts are linked when the editor is already in the file, and are not counted.
9. **The owner reads the sentences.** The 30-plus sentences per page are listed in the audit with before and after text; the human read at step 10 of §6 covers them, not just the three pages.

### 5.2 What "natural" looks like, by source type

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

### 5.3 The count

Target 30 body links per owner page from indexed sources. The audit §2 states how many sources exist per owner once the rules above are applied; if fewer than 30 indexed sources exist for an owner (likely for `/services/property-tax-advice`, whose family is smaller), the shortfall is recorded, not padded with forced links. Thirty is a target, not a floor that licenses an unnatural sentence.

## 6. The order of work, with gates

Each step names what must be true before the next starts. One branch for the whole package: `claude/wp1-service-pages` from `main` after the `claude/website-estate-access-gdk8ei` branch has merged or been rebased in (it carries the hero-CTA restore, the widget delay, the GSC service-account support and this folder).

1. **Confirm inputs are current.** If more than 14 days have passed since 2026-10-09, re-pull Search Console (`agents/utils/gsc_client_oauth.py` with `GSC_SERVICE_ACCOUNT_JSON` in the environment) and re-run the 12 SERPs. Record the date in this document's header.
2. **Freeze the assignment table.** The owner has approved the families (R2); the per-query CSV is the working truth. Any new query found at step 1 is added with an owner and a placement before writing starts.
3. **Bing veto.** Run `scripts/_bing_veto_audit_2026_08_05.py` (usage in the audit §5) over every proposed title and H1 for the three pages and the give-up pages. A veto blocks the string; choose the next natural variant.
4. **Language pass, once for the cluster** (REWRITE_PROGRAM §9.11, §12.1 below): measure the teardown's top-10 pages and our owner-approved copy, write `ANSWER_PATTERN_SPEC_services_2026-10.md`. Nothing is written until this exists; it is what the editorial checks are run against.
5. **Research pack per page** (REWRITE_PROGRAM §9.5): the assignment rows for the page, the PAA questions, the teardown rows for the page's term, `house_positions.md`, the current page's rendered copy, the answer-pattern spec, the chatGPT-cited sentences for the tax-advice page, the §5 link sentences that will point at the page (so the page answers what the anchors promise).
6. **Write** (R9): one Opus or Fable agent per page, in parallel, batch size 1. Output is the full route file, copy and schema, preserving everything the audit §6 lists. No em-dashes in copy. Every number cites a `house_positions.md` section.
7. **Verify, the §12 harness, looped.** Deterministic layer (§12.2) on the built HTML, then the contextual reviews (§12.3), then the deterministic layer again after fixes. Maximum three loops per page; anything still open goes to the owner as a question in the review pack (§12.5), never accepted silently. The coverage floor (R5: against the assignment table's `placement` column, not literal presence) and the equity-preservation check are part of the deterministic layer.
8. **Site wiring:** header links server-rendered (WP1.1), the give-up pages' body links (§4, links only at this step, no title changes yet per R6), the 30-plus links in (§5), `llms.txt` and `llms-full.txt` lines (audit §4), the services index page's cards if their copy references the old titles.
9. **Build gates, in this order, all green before a human read** (the §12.2 harness report is the first of them): `npx tsc --noEmit -p Property/web/tsconfig.json`; `cd Property/web && npx vitest run`; `npm run build` in `Property/web`; the no-JS render check (`curl -s <page> | grep` for the H1, every FAQ question, the services list and the header links); the JSON-LD parse check (the audit names the script); `python scripts/check_dependency_closure.py`; `python scripts/predeploy_gate.py` (the audit names its flags); the link audit script. Every command and its expected output is listed in the audit §5.
10. **Human read:** the owner receives the review pack (§12.5) per page: the sixteen lines, the section diffs, the open reviewer disagreements, the link sentences, and screenshots (desktop 1280, phone 390). Build nothing further until he approves.
11. **Deploy** (R10): the owner deploys once from the laptop. Then, in this order, the same day: request indexing for the three service pages and the homepage via Search Console (manual, or `agents/utils/gsc_client_oauth.py` has the Indexing scope); IndexNow drain for the changed URLs; the `site_flags` and `monitored_pages` SQL the 7 Oct plan's DONE_E lists (owner-run); record the deploy SHA and time in `docs/property/STATE.md`.
12. **Wait.** No further Property deploys for 14 days unless something is broken. The September crawl trough followed 31 deploys in ten days.
13. **Day 14 read** (§9). If the three pages have been fetched and appear for the family phrases, execute §4's title changes on the Belfast and Manchester posts and the city pages (R6), one deploy, then wait again.
14. **Week 4 read** (§9). Decide WP2 (hub), WP3 (city pages) and WP4 (cities with no page) from the numbers.

## 7. Bing and AI protection

- Bing veto on every title and H1 before build (step 3). Slugs and URLs never change.
- The tax-advice page keeps the sentences ChatGPT cites (`BING_G_chatgpt_entries.csv`); the editorial QA has that list and fails the page if a cited fact is gone.
- Every page is fully readable with JavaScript off: header links, services list, FAQ answers and the opening paragraph in the server HTML; stable `id` attributes on every H2 so a section can be cited by anchor.
- `llms.txt` and `llms-full.txt` describe the pages with the new opening sentence, in lockstep with the deploy.
- The opening paragraph and each "What we do" item are written in the shape the AI overviews lift (teardown §d): one definition sentence first, then short labelled lines. The FAQ answers the cost questions honestly without a figure (how fees are set, what drives them, that a quote comes before any work); the "typical costs" blocks in the overviews are drawn from pages that publish figures, and that citation is out of reach until F3.
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
| Fee queries move to a page with no fee figure | Without F3 the fees section says how fees are set and that a figure is given before work starts, with no number. "Landlord accountant fees" and its family (150 impressions) may stay on the cost blog post, which keeps its informational copy. Expected, not a failure; the week-4 read records it. The fee queries move when F3 arrives. |
| Blog posts published during the 14-day window are deploys | Each laptop publish is a deploy of the whole branch. Either batch the posts before the launch deploy or accept the deploys and list them in the day-14 read so the crawl pattern can be read against them. Owner's call at step 11. |
| The winners' trust signals (phone 36 of 39, reviews 21, professional body 17) are exactly the deferred facts | Known and accepted: R7 and R13. The pages are built with the slots; the day-14 and week-4 reads say what on-page work alone achieved, and the facts remain the lever above top 5. Nothing is invented to fill the gap. |
| Reviewer taste replaces the spec | §12: every editorial judgement is made against the written answer-pattern spec with quotes, by two reviewers who do not see each other, and only their disagreements reach the owner. |

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
| Commercial property and development accountancy: no page, 220 searches a month (R21) | owner | whether a page is wanted later; one body sentence now if the firm does the work |
| Register targets for hire-intent service pages (Appendix F measured the SDLT guide cluster, not this one) | step 4 language pass | the numbers in §12.1 |
| People Also Ask "What is Rachel Reeves' plan for property tax?" and "How much is the mansion tax going to be?" (property tax advice, property tax specialist) | writer, from `house_positions.md` §7 for the 2027/28 property income rates (22/42/47, enacted FA 2026); no house position exists on a "mansion tax" or council tax surcharge, so that question is not answered until one is written and locked | one FAQ on the tax-advice page, cited to §7; the mansion-tax question stays out |
| `niche.config.json` carries `contact.phone` "+44 20 3026 1111" (not rendered anywhere in `Property/web/src`) and a `packages` CTA variant with £29/£59/£99 monthly plans (inactive; `cta.variant` is `leadgen`). Neither is used by this build. | owner, when F1 and F3 are decided | whether that phone and those plans are the facts to publish, or stale config to delete |

## 12. Verification harness (how we know the writing is right, not just present)

Owner, 2026-10-09: "a valid, potentially dynamic way that we can verify that the work that has been done is accurate and it's what we want whilst taking the wider context of the page / portion of it... writing style, language etc." The engine's existing floors (REWRITE_PROGRAM §4, §9.9) check facts, links, arithmetic and phrase coverage on `.md` posts. They do not check whether a sentence belongs where it sits, whether the page sounds like the firm, or whether a section earns its place. And the three service pages are `.tsx` route files, not `.md`, so none of the existing scripts read them. This section closes both gaps. Four layers, in this order, each one re-runnable on every draft (that is the "dynamic"): a written spec of what we want, a deterministic script on the rendered page, two independent contextual reviews against the spec, and a review pack that makes the owner's read cheap.

### 12.1 The spec: what "what we want" means, written down first

`ANSWER_PATTERN_SPEC_services_2026-10.md`, one page, produced at step 4 of §6 by the language pass (REWRITE_PROGRAM §9.11), before any page is written. It has four parts.

1. **Measured targets.** The probe in §12.2 (check 14) is run over the teardown's top-10 pages for the 12 head terms (strip nav, header, footer) and over our own pages that the owner has signed off (homepage, `/about`, the three current service pages, the two frozen pages S1 and S2). It reports words, mean sentence length, Flesch reading ease, share of question-form headings, "you/your" per 1,000 words, "we/our" per 1,000 words, statute references per 1,000 words, jargon nouns per 1,000 words, numbers per 1,000 words, paragraphs over 80 words. The spec records the winners' median and our current number side by side and sets the target as a range, not a point. Interim targets until measured, from Appendix F of `STRUCTURE_VS_COMPETITORS_2026-08-17.md` (the SDLT guide cluster, so a floor not a fit): 1,300 to 2,000 words, "you/your" at or above 25 per 1,000, "we/our" 8 to 12 per 1,000, statute references at or below 2 per 1,000 on a service page (the guides carry the depth), question headings 20 to 35 percent.
2. **Answer patterns with examples.** For each of: opening a section (answer first or context first), turning a question into a heading, where the number goes, handling "it depends", handing off to the call, what the winners leave out. One real winner sentence, one of ours on the same point, and the rewrite rule. Quoted, never paraphrased.
3. **Owner-voice examples.** Twelve sentences from copy the owner wrote or approved in the 23 Aug review passes (STATE.md 0.22a to 0.22c name the files) and from `/about`. These define "sounds like us". The reviewer in §12.3 compares against these, not against taste.
4. **Do-not-copy list.** Winner habits we reject by ruling: aggregate ratings we cannot back, "24-hour response" style guarantees, "every client gets a named partner" claims, fee figures (R7), local-pack bait, any sentence that only exists for a query (R5).

### 12.2 Deterministic layer: `scripts/service_page_verify.py` (to build, stdlib only)

Input is the rendered page, not the source: `Property/web/.next/server/app/services/<slug>.html` after `npm run build` (the file Google and a no-JS reader get), with `--url http://localhost:3000/services/<slug>` as the alternative. It extracts the same fields dict `track2_query_coverage.load_page_fields` produces (title, description, h1, h2s, h3s, faq questions and answers, body text, internal hrefs, JSON-LD) so the existing matcher and `qa_verdict.py` can be reused with the extracted text passed in. Output: `VERIFY_<slug>_<timestamp>.md` with one row per check, PASS / WARN / BLOCK, and for every WARN or BLOCK the offending sentence quoted with the heading it sits under. BLOCK stops the loop; WARN goes to the review pack. The checks, numbered so a reviewer can cite them:

| # | Check | Rule | Verdict |
|---|---|---|---|
| 1 | Title | 50 to 60 characters, family head phrase present, brand last, passes the Bing veto list from step 3 | BLOCK |
| 2 | H1 | exactly one, no pipe, equals the assignment table's `h1` phrase in natural form | BLOCK |
| 3 | Heading hierarchy | H2 then H3, no skipped levels, every H2 has an `id`, the ids match the anchors in `llms.txt` lines | BLOCK |
| 4 | FAQ parity | visible questions and answers are byte-identical to the `FAQPage` schema strings; 8 to 12 items; each answer 40 to 90 words | BLOCK |
| 5 | Offer parity | each "What we do" H3 is byte-identical to a `hasOfferCatalog` offer name; same count; no `price` field | BLOCK |
| 6 | Coverage floor (R5) | every assignment row with placement `title`, `h1`, `h2`, `faq`, `fees_section` matches in that field (existing matcher, numbers literal); `body` rows match anywhere; `coverage_statement` rows pass on the coverage sentence; `exclude` and `city_page` rows for other pages are absent as strings | BLOCK |
| 7 | Equity preservation (§9.9 check 5) | every query the page had any impression for in `GSC_FRESH_2026-10-09_hire_intent_90d.csv` still matches somewhere; names each one that stopped | BLOCK |
| 8 | Deferred facts (R7) | regex over the page's own copy (the sections between the H1 and the `LeadCTAPanel`, excluding the shared `StatsBar`, `MarketingSections`, `TestimonialsSection` and the panel's proof strip, which are pre-existing firm claims outside this build) for phone-number shapes, `£` followed by digits, "open", "Mon", "9am" style hours, "guarantee", "within 24 hours", "24-hour", "every client", "ICAEW"/"ACCA"/"CIOT" membership claims, a person's name; the excluded components are listed in the report so the owner sees what the page still claims | BLOCK |
| 9 | Stuffing | no family phrase or its variants above 6 occurrences per 1,000 words; no phrase from the assignment table more than twice in one paragraph; "near me", "uk" appearing more than once outside the title | BLOCK |
| 10 | AI tells and house style | em-dash (U+2014) anywhere; the lexicon ("delve", "navigate the complexities", "in today's", "it's important to note", "whether you're ... or ...", "look no further", "seamless", "tailored solutions", "unlock", "elevate", "robust", "leverage", rule-of-three triplets ending a paragraph, a paragraph that opens with a rhetorical question and answers it with "The answer is"); count and quote | BLOCK on em-dash, WARN otherwise |
| 11 | Cross-page sameness | shared 8-word sequences between the three service pages, and between each service page and the five city pages and the services index; list each shared sequence; more than 3 shared sequences between any pair is a BLOCK | BLOCK |
| 12 | Cross-surface consistency | the service names in the "What we do" H3s, the services index cards, the homepage services section, the header labels, the city pages' service lists and `llms.txt` agree (the H3 is the canonical string; the others may be shorter but must be a prefix or the same words) | WARN |
| 13 | Links | every internal href resolves (`track2_link_audit.py` logic); every `#anchor` exists; the two sibling service pages and the five city pages are linked once each; at least 4 pillar-guide links; no link in the opening paragraph | BLOCK |
| 14 | Register probe | the measures in §12.1 part 1 for this page against the spec's ranges; outside the range is WARN, not BLOCK (a spec is a target; the reviewer decides) | WARN |
| 15 | Section weight | words per H2 section; any section under 60 or over 350 words of body; any paragraph over 80 words; a section whose first sentence does not contain a verb from its heading's subject (crude "answers its heading" test) | WARN |
| 16 | No-JS render | H1, opening paragraph, every FAQ question, every H3 and the header's three service links present in the static HTML with no script execution (grep on the file, not a browser) | BLOCK |
| 17 | JSON-LD | parses; one graph; `Service.@id` and `provider.@id` resolve to nodes that exist (`/#organization` on the homepage build); no `LocalBusiness`, no `aggregateRating`; `BreadcrumbList` unchanged from the snapshot | BLOCK |
| 18 | Cited sentences (tax-advice page only) | each sentence in `BING_G_chatgpt_entries.csv`'s cited set is present verbatim, or its fact is present in the same section (a listed fact map, one row per sentence, approved at step 4) | BLOCK |
| 19 | Length | body words excluding FAQ between 1,600 and 2,400 (§3.1) | WARN |
| 20 | Diff against snapshot | the list of facts (numbers, named services, named audiences, linked guides) present in `snapshots_2026-10-09/<slug>.html.gz` and absent from the new page, so nothing is lost silently; the writer must mark each as dropped-on-purpose with a reason or restore it | WARN, BLOCK if unmarked |

Self-test: the script carries a `--selftest` that runs every check against the 9 Oct snapshots and must report the known state (for example, check 16 passes today for the FAQ but fails for the header links, which is the WP1.1 reason). A check that cannot tell the old page from the new one is not a check.

### 12.3 Contextual layer: section-in-page review, two readers, fixed questions, quotes not scores

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

### 12.4 Verdict persistence (so an edit after the review cannot ship unreviewed)

`qa_verdict.py` keys a verdict to the reviewed file's sha256 and `predeploy_gate.py` blocks a deploy when the file has changed since. The same mechanism is used here with the route file (`Property/web/src/app/services/<slug>/page.tsx`) as the keyed file. Batch name `WP1-services`. The gate's `--qa-batch WP1-services` flag then makes any post-review edit, including a one-word change by hand, re-run the loop. If `qa_verdict.py` rejects a non-`.md` path, the audit §5 names the one-line change (the path check) and it is made under `scripts/`, not worked around.

### 12.5 The review pack: making the owner's read cheap and complete

Per page, `REVIEW_<slug>_<date>.md`, in this order, written so it can be read on a phone:

1. **The sixteen lines**: title, H1, opening paragraph, the coverage sentence, each H2 with its first sentence, the FAQ questions, the call-to-action lines. If these are right the page is mostly right.
2. **Old versus new by section**: for each H2, the old section's first and last sentence and the new section's, plus the §12.2 check 20 list of facts dropped and the reason for each.
3. **What the harness flagged and was left** (every WARN from the last run, with the quote and why it stands).
4. **Reviewer disagreements** (the NOTE items from §12.3), each with the two positions and the quoted sentence.
5. **The link sentences** pointing at this page from §5, before and after text, grouped by source type.
6. **Screenshots**, 390 and 1280, full page.
7. **The questions**, if any: numbered, one line each, with the recommended answer first, so the owner can reply with numbers.

The owner's approval is per page, in writing, against a named SHA of the route file. A later edit invalidates it (§12.4).

### 12.6 What this costs and what it does not need

The script is a day's work and runs in seconds; the two reviews are two Opus calls per page per loop, at most six per page; the language pass is one Opus call over about 20 fetched pages plus the probe. It needs no new service, no monitor, no email (R11). It does not replace the owner's read; it makes the read a list of decisions rather than a proofread.

