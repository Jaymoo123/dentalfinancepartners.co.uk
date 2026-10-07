# Property commercial recovery plan, 2026-10-07

Scope: Property only (www.propertytaxpartners.co.uk, `Property/web`, Property's own Vercel project). No edits to `packages/web-shared` (the port system on the other sites is running against it). Nothing in this plan is built or deployed until the owner says go. Evidence for every claim is in `docs/property/commercial_recovery_2026-10-07/` (seven agent reports plus data) and in the 2026-10-07 entry of `docs/property/STATE.md`.

## 0. Summary

The commercial demand this site can win on Google is national, not local. Of about 15,600 monthly UK searches for hiring a property or landlord accountant, 14,100 (90 percent) belong to three pages: `/services/property-accountant`, `/services/landlord-accountant` and `/services/property-tax-advice`. Those three pages took 8, 27 and 187 impressions in the last 56 days and Google has not fetched them since 5 to 6 August. The city pages, which got all the attention in August, address under 700 searches a month between them.

The three service pages are invisible to Google for structural reasons, not content reasons: the header links to them are rendered client-side so no page on the site carries a crawlable link to them except the footer; they have 4 to 9 in-content links each; the commercial hub that should sit above the whole cluster is still recorded by Google as a redirect from May; and the live build is behind the repo so Google's copy carries retired wording. Meanwhile a blog post about Slough ranks sixth nationally for "landlord accountant" because it is linked and fetched.

The plan therefore: (1) ship what is already fixed and clear every stale artefact, (2) make the three service pages the structural owners of national demand, (3) resurrect the commercial hub and wire the 40 city posts under it, (4) give the pages the contactability signals every winner has, truthfully, (5) protect ChatGPT and Bing while doing it, (6) read at 4 and 8 weeks against recorded baselines. Six owner facts and five owner decisions are needed before build; they are listed in section 6 in plain language.

## 1. Where the commercial demand is

In-niche commercial queries (someone looking to hire; career, generic-accountancy and noise excluded), UK monthly volume from DataForSEO, owning page as mapped by the query agent.

| Owning page | Queries | Monthly volume | Our 56-day Google impressions | Google last fetch |
|---|---|---|---|---|
| /services/property-accountant | 50 | 9,110 | 8 | 2026-08-06 |
| /services/landlord-accountant | 41 | 3,820 | 27 | 2026-08-05 |
| /services/property-tax-advice | 20 | 1,150 | 187 | 2026-08-06 |
| /for/selling-a-buy-to-let (CGT accountant) | 8 | 480 | 16 | 2026-09-29 |
| /locations/london | 25 | 150 | 547 | 2026-10-02 |
| /for/property-spv-set-up | 1 | 90 | 24 | 2026-09-29 |
| /for/rental-income-disclosure | 3 | 80 | 16 | 2026-09-29 |
| /locations/birmingham, bristol, manchester, leeds | 13 | 90 | 4,322 | Aug 30 to Sep 28 |
| No page: property developer accountant | 3 | 180 | 0 | |
| No page: cities without a page (Edinburgh, Glasgow, Surrey, Derby, Kent, Nottingham, Oxford, Cardiff, Sheffield, Brighton, others) | 60 | 450 total | 1,100 total | mostly blog posts, 30 of 40 unindexed |
| No page: fees and pricing | 8 | 40 | | |
| No page: why us and comparison | 9 | 30 | | |

Read: the city pages already get impressions far above their demand (Google shows them for national queries at positions 20 to 40). The service pages get almost none for queries that are theirs. The head term "property accountant" (720) is a mixed SERP with job boards; its plurals and variants ("accountants for property", "property accountants", "accountant for property investors", "uk property accountants") are the winnable national set and all map to one page.

Query-level SERP intent for the top in-niche queries is in section 8: 26 of 28 are clean commercial SERPs, and Google already ranks us in the top 10 for four of them with a Belfast post, a Slough post and an audience page, not with a service page.

## 2. What is broken, by surface

Pointers only; detail in the named reports.

| Surface | State | Report |
|---|---|---|
| /services/* (4) | Not fetched since 5 to 6 Aug; 8 to 187 impressions; no crawlable header link (dropdown links are client-rendered, `SiteHeader.tsx:128,144`); 4 to 9 in-content inlinks; Service schema missing `@id` on three pages, nameless inline provider on two, `areaServed` "GB" vs "United Kingdom"; live copy still says "fixed fee in writing" (repo is clean, deploy lag) | INV_A, SCHEMA_F, DONE_E |
| /blog/property-accountant-services hub | Google holds it as a redirect to one post, last fetched 29 May; 301-shadowed Apr to 22 Aug; zero editorial inlinks; 45 of its 63 posts not indexed; 12 off-topic posts (VAT, payroll, CIS) sit in it | INV_B |
| /locations/* (5) + /locations | Rank 17 to 41 for city queries after the 5 Aug swap; title lost exact match; city schema node has no `@id`; /locations index unknown to Google, H1 is the word "Locations"; six pages near-identical so Google rotates one representative | A1 (STATE entry), INV_A, SCHEMA_F |
| 40 city blog posts | 30 not indexed, 31 with zero inlinks; where indexed they rank top 15 (Oxford 8.5, Leicester 6.7, Glasgow 9.7); eight cities fell to zero impressions in September | INV_B |
| /for/* (15) | Indexed but reachable only from the sitemap; 230 impressions total; outranked by blog posts on their own phrases | INV_A |
| llms.txt | Hand-kept; lists four deleted city posts as live; does not list /spv-company; points 4 of 5 city answers at blog URLs | DONE_E, BING_G |
| feed.xml, llms-full.txt | Publish the three noindexed career posts | DONE_E |
| middleware | 7 legacy slugs 301 into noindexed career pages; two blog links resolve via a 301 hop; link-audit docstring describes the pre-August redirect direction | DONE_E |
| monitored_pages (prod) | 19 stale rows (wrong targets, URLs that now 301, the hub typed as a redirect) | DONE_E |
| site_flags (prod) | `calc_pdf_offer.enabled` still true; offer retired 28 Sep | DONE_E |
| Repo leftovers | `DeepScrollModal` still mounted in layout; "free first call" in three assistant openers; homepage comment calling the brand a referral network; frozen list guards a PdfOffer that no longer exists | SCHEMA_F, DONE_E |
| Claims | "24-hour response guarantee" on /services; "Every client is a landlord, investor or developer" on four pages with no client record; "60 percent property-only" live vs "100 percent" at HEAD | SCHEMA_F |
| Contactability | No phone number, no email, no hours, no price band anywhere on the site. 18 of 19 winning competitor pages publish a phone; three outrank us on weaker domains and all three publish one | COMP_D |
| Crawl | Google fetches 16 to 72 of our URLs a week; 31 deploys in ten days preceded the trough | STATE entry |

## 3. What the plan does not do

- Does not rewrite the 350 unindexed informational posts (owner ruling 2026-10-07).
- Does not reverse the city 301s again. Two of five are processed; a second flip costs another month of Google reprocessing.
- Does not create per-city addresses, hours, people, reviews or ratings. The firm has no city offices and no review corpus. City LocalBusiness rich results are therefore off the table permanently; the city pages carry a Service node with `areaServed` instead.
- Does not touch `packages/web-shared`. Where a fix would naturally live in the kit (the llms-full noindex filter) it is done in Property's own route.
- Does not edit the frozen pages (home, /contact, /book, calculators) without a sign-off line per page. Two homepage items need one and are listed in section 6.
- Does not deploy, submit IndexNow, request indexing or register monitors. Those are owner-triggered steps in section 5.

## 4. Work packages

Each package lists the change, the dependent artefacts from the definition of done (DONE_E part 1b), the channel guardrail (BING_G risk register), and the check.

### WP0. Ship what is already fixed, clear every stale artefact

Mechanical, no judgment, no owner facts needed.

1. Deploy Property HEAD (owner-triggered). Removes "fixed fee in writing" from /services and /services/property-accountant, brings the stat block to its derived 200+ / 24hr / 280+ / 100 percent figures. Note: HEAD also carries the Phase 0 GEO changes for Property (firm voice, entity schema), which were held undeployed by design; deploying Property ships them. Decision D1.
2. `Property/web/public/llms.txt`: repoint the London, Manchester, Birmingham and Bristol entries to `/locations/<city>`; add `/spv-company`; add the three service pages' descriptions check; move "Facts current as at" to the deploy date. Keep every `utm_source=chatgpt&utm_medium=llms` suffix.
3. `Property/web/src/app/feed.xml/route.ts`: filter `noindex` posts (mirror `sitemap.ts`). `Property/web/src/app/llms-full.txt/route.ts`: post-filter the three noindexed slugs out of the built text in the Property route (no kit change).
4. `Property/web/src/middleware.ts`: repoint the 7 legacy career slugs that 301 into noindexed pages at `/blog/property-accountant-services` (the hub); fix the `track2_link_audit.py` docstring; fix the two blog links that resolve via a 301 hop.
5. `Property/web/src/lib/assistant/opener.ts`: "free first call" to "free consultation" (3 lines). `Property/web/src/app/layout.tsx`: remove the `DeepScrollModal` mount (disabled 26 Sep). `Property/web/src/app/page.tsx:149-151`: delete the "referral network" comment.
6. `docs/_engines/property_frozen_pages.md`: remove the PdfOffer component entry; the routes 404.
7. Prod (owner-triggered SQL): `site_flags.calc_pdf_offer.enabled = false`; reconcile the 19 `monitored_pages` rows (DONE_E V8 lists each) via `scripts/register_monitored_batch.py`, never a bare insert.
8. `/research/landlord-tax-index` double brand suffix; `/section-24` FAQPage schema 10 vs 16 visible questions.
9. Remove AdSense from Property before the first deploy (owner ruling 2026-10-07: AdSense is not being pursued on any site): the `google-adsense-account` meta and the `adsenseClientId` prop in `Property/web/src/app/layout.tsx` (added by `bc88aa78d`), and `Property/web/public/ads.txt`. Property's security headers are built without the ads flag, so as committed the script would be blocked on every page while ads.txt declared the site runs ads. Other sites carry the same lines; they belong to the port work and are not touched here.

Dependent artefacts: sitemap unchanged (verify by diff), llms.txt (2), feed and llms-full (3), middleware chains (4, verify no chain, Googlebot parity), frozen list (6), monitored_pages (7). Guardrail: none of this touches a page Bing ranks or ChatGPT cites except llms.txt, where the four city entries move from 301 sources to live pages. Check: DONE_E verification kit steps 1 to 8 before deploy, 9 after.

### WP1. Make the three service pages the owners of national demand

Pages: `/services/property-accountant`, `/services/landlord-accountant`, `/services/property-tax-advice` (and `/services/non-resident-landlord`, same template, lower demand). None is frozen. Do-not-touch until the week-4 read (they hold our only top-10 national placements today, see section 8): the Belfast and Slough city posts, `/for/landlord-retirement-and-succession`, `/locations/bristol`. No service page title may duplicate theirs. ChatGPT converts on these at 25 to 46 percent, so the rule is additive: openers, H2s and the 12 FAQ questions stay; nothing is cut.

1. Crawlable links. `Property/web/src/components/layout/SiteHeader.tsx` (Property's own component): render the dropdown panel links in the server HTML and toggle visibility with CSS, instead of the `{open ? ...}` gate. This puts a header link to every service page, the hubs and `/locations` on every page. Render check: anchors present in `curl` output of the homepage with no JavaScript.
2. Titles and H1s carry the exact phrases the demand uses, per the universe mapping: property-accountant page owns "property accountant(s)", "accountant(s) for property", "property investment accountant", "specialist property accountant", "uk property accountants", "property accountant(s) near me"; landlord-accountant page owns "landlord accountant(s)", "accountant(s) for landlords", "buy to let accountant(s)", "accountant for rental property"; property-tax-advice page owns "property tax specialist(s)", "property tax adviser", "property tax advice", "property tax accountant(s)" (shared with the first; the FAQ decides). Written by an Opus or Fable agent reading each page and the query data; no templated edits.
3. Schema wiring (SCHEMA_F section 6a, no new facts): `@id` on the three Service nodes; `provider` as the `#organization` reference on all four; `areaServed` "United Kingdom" on all four; `hasOfferCatalog` on the three pages with a visible services list, labels equal to the visible headings; `name` on the homepage Service node (homepage is frozen, sign-off S1).
4. Contactability block on each service page: phone, answered hours, registered office line, "fixed fees quoted upfront, you approve the fee before work starts" (verified wording), booking link to `/book`. Needs facts F1 to F3 and decision D2. Add `Organization.telephone` and `openingHoursSpecification` once F1 and F2 exist; firm-level only.
5. Claims: "24-hour response guarantee" becomes "we aim to respond within 24 hours" (D3); "Every client is a landlord, investor or developer" becomes the specialism statement from `entity.firm` (D3).
6. Internal links in: from the commercial hub (WP2), from every city page and city post (a "national service" link in the body), from the three topic hubs that match (`/landlord-tax` to landlord-accountant, `/incorporation` and `/spv-company` to property-accountant, `/property-tax-rates` to property-tax-advice). Target: 30+ in-content inlinks each, from indexed pages.
7. llms.txt descriptions updated to match any changed sentence (BING_G risk 5).

Dependent artefacts: Organization `knowsAbout` unchanged; llms.txt (7); OG image regenerates from title; schema parse check; `monitored_pages` rewrite rows (owner-triggered). Guardrail: FAQ count stays 12 per page; ChatGPT sessions and leads on `/services/property-tax-advice` baseline 15 sessions, 4 leads per 28 days. Check: kit steps 1, 3, 7, 8 pre-deploy; 9 post-deploy; request indexing for the four URLs (owner, Search Console).

### WP2. Resurrect the commercial hub and wire the city estate under it

1. `/blog/property-accountant-services` becomes a real commercial landing page: an introduction in firm voice, the three national service links, a city grid linking all 5 location pages and the 40 city posts (ranked by the city demand list), the 8 selection guides ("how much does a property accountant cost" etc.), FAQ with FAQPage schema. The existing `HubArticleList` keeps every post card in server HTML; the grid is additive. Child URLs do not change (BING_G risk 4: `can-you-claim-aia-on-second-hand-assets` holds Bing position 1 to 2).
2. Links into the hub from indexed pages: header (WP1.1), the three service pages, `/locations`, the homepage services section (frozen, sign-off S2).
3. The 12 off-topic posts in the hub (VAT calculators, payroll, CIS, loan charge, mortgage fraud, dormant accounts, AIA): decision D4. Moving them changes their URL (category segment) with a middleware 301 and a `SLUG_TO_CATEGORY_MAP` update, which the nested handler supports. Not moving them leaves a commercial hub diluted by tool pages. Recommendation: move all except `can-you-claim-aia-on-second-hand-assets`, which carries Bing traffic and stays until a later read.
4. The 40 city posts: add a body link from each to the hub and to the matching national service page; add the hub link from `/locations`. No rewrites in this package. The eight cities that fell to zero impressions (Nottingham, Preston, Northampton, Milton Keynes, Peterborough, Bournemouth, Derby, Slough) are re-read at week 8; if still zero and the post is still unindexed, they become candidates for the city package (WP4), not for deletion.
5. After deploy, request indexing of the hub URL and the two still-indexed old city post URLs (London, Bristol) so Google fetches the 301s (owner, Search Console).

Dependent artefacts: sitemap (hub already listed, lastmod = newest post, derived); llms.txt (hub entry description); `CATEGORY_HUB_SLUGS` unchanged; middleware for D4 moves with the no-chain check; monitored_pages for moved URLs. Guardrail: no child URL changes except D4; the four city blog URLs named in llms.txt are repointed in WP0.2 so ChatGPT's city answers land on live pages.

### WP3. City pages: restore the signal, stop the rotation

1. Title to exact match: "Property Accountant Manchester | Landlord Tax Specialists" (H1 already "Property accountant Manchester"). Meta description carries the phone once F1 exists.
2. Schema: replace the second `AccountingService` node (no `@id`, no address, ineligible) with a `Service` node, `@id` `/locations/<city>#service`, `provider` `#organization`, `areaServed` City in UK, `hasOfferCatalog` from the visible service list. Truthful and consistent with the service pages.
3. Contactability block as WP1.4, firm-level, no city address.
4. `/locations` index: H1 to "Property accountants across the UK", a short firm-voice intro, links to the five pages and to the top city posts by demand (Oxford, Leicester, Glasgow, Belfast, Cardiff, Edinburgh, Liverpool, Nottingham), link to the hub. Request indexing after deploy; it is unknown to Google today.
5. Differentiation (second pass, after the week-4 read): each page gets a city data block from sources we already hold or can cite (council licensing schemes, Article 4 areas, local rents and yields from ONS or VOA, council tax bands), so the six pages stop reading as one template to Google. Content by Opus or Fable, reasoning-first.

Guardrail: FAQ count stays 11 or more per page; ChatGPT entries to `/locations/*` baseline 8 since 13 Jul. Bing has no footprint on these pages, so no Bing risk.

### WP4. City coverage where demand exists and no page does

Deferred until WP1 to WP3 have had their week-4 read. Candidates from the universe and INV_B: Edinburgh (50 a month), Glasgow (50, post exists and ranks 9.7), Surrey (50), Derby (30), Kent (30), Nottingham (20, 245 impressions before it fell), Oxford (20, post ranks 8.5), Cardiff (20), Sheffield (20), Brighton (20). Rule: strengthen and link the existing post first; create a `/locations` page only where no post exists and demand is 30 or more a month. Never 301 a ranking post into a new page.

### WP5. Crawl discipline, verification, reads

1. Property production deploys batched to at most two a week, recorded with date and SHA in STATE.md. The crawl trough followed 31 deploys in ten days.
2. Pre-deploy: DONE_E verification kit steps 1 to 8 in order, including the hand grep that covers the link auditor's blind spot (`src/**/*.tsx`, `llms.txt`, `niche.config.json`).
3. Post-deploy (owner-triggered): IndexNow drain for touched URLs; Search Console request indexing for the four service pages, the hub, `/locations`, the two old city URLs; `monitored_pages` registration for every touched page.
4. Re-sweep at day 14: URL Inspection on every touched URL plus every URL that 301s into one. Expect service pages fetched with a post-deploy date, hub "Submitted and indexed", London and Bristol old posts "Page with redirect".
5. Reads at week 4 and week 8 against the baselines in section 7. The commercial query table from the A1 report (20 queries, weekly position and impressions) is the Google read; `BING_G_baseline.csv` is the Bing and ChatGPT read.

## 5. Sequence and owner-triggered steps

| Step | Who | What |
|---|---|---|
| 1 | owner | Answer section 6 (facts F1 to F6, decisions D1 to D5, sign-offs S1, S2) |
| 2 | build | WP0 and WP1 together, one branch, local build green, kit steps 1 to 8 |
| 3 | owner | Walk the four service pages and the header locally; approve |
| 4 | owner | Deploy (one deploy), then IndexNow drain, request indexing for 8 URLs, site_flags SQL, monitored_pages batch |
| 5 | build | WP2 and WP3.1 to 3.4 on the next branch; same gates |
| 6 | owner | Second deploy no sooner than three days after the first |
| 7 | read | Day 14 re-sweep; week 4 read; then WP3.5 and WP4 decisions |

Blast radius: Property only, roughly 15 files plus llms.txt and middleware; one git revert per branch undoes it. Nothing shared.

## 6. Owner facts and decisions, in plain language

Facts (one each; if the answer is "none", we publish nothing and the plan still works):

- F1. A phone number we can publish, and who answers it. Every competitor page that beats us on a weaker domain has one.
- F2. The hours someone answers that number or the inbox.
- F3. A fee band or "from" figure you will stand behind, or "no published prices".
- F4. Any professional body the firm or a named person belongs to, or "none".
- F5. The response time we can truthfully promise (today the site says 24 hours and one page says "guarantee").
- F6. Whether the Shipley registered office should appear in the page body as the firm address, not only in footer small print.

Decisions:

- D1. Deploy Property at HEAD now, knowing it also ships the Phase 0 entity and firm-voice changes for Property that were held back for an estate-wide round. Recommended: yes, Property alone, so the retired copy leaves production.
- D2. Publish contact details on the pages (depends on F1 to F3). Recommended: yes, phone and hours at minimum.
- D3. Approve two wording changes: "24-hour response guarantee" to "we aim to respond within 24 hours"; "Every client is a landlord, investor or developer" to "We work only on property tax" (the verified specialism statement).
- D4. Move the 12 off-topic posts out of the commercial hub (URL change with a 301 each). Recommended: move 11, keep the AIA post until the week-8 read.
- D5. The request-indexing split test on 20 May posts: run it in parallel (free, ten minutes in Search Console) or drop it. Recommended: run it, it tells us whether the long tail is recoverable without rewrites; it changes nothing on the site.

Sign-offs needed because the pages are frozen:

- S1. Homepage: add `name` to its Service schema node; render header dropdown links server-side (affects every page's header, including the homepage).
- S2. Homepage: add a link to the commercial hub in the services section.

## 7. Baselines for the reads

Recorded 2026-10-07 unless stated.

| Metric | Baseline | Source |
|---|---|---|
| Property leads per week | 16 (mean since 13 Jul) | leads table |
| Google impressions, three service pages, 56 days | 8 / 27 / 187 | INV_A |
| Google position, "property accountant manchester" | 21.6 (location page) | INV_A |
| Google position, "rental accountant leeds" | 16.3 to 22.0 | A1 |
| Google position, "landlord accountant" | 6 via Slough blog post | COMP_D SERP |
| Pages with Google impressions per week | 390 (w/c 28 Sep) | STATE entry |
| Google fetches of our URLs per week | 33 to 72 (Sep 28 to Oct 5) | STATE entry |
| Indexed sitemap URLs | 387 of 888 | STATE entry |
| Hub /blog/property-accountant-services | "Page with redirect", last fetch 29 May | INV_B |
| Bing site 28 days to 4 Oct | 79,352 impressions, 2,067 clicks | BING_G |
| ChatGPT 28 days | 78 sessions, 16 leads | BING_G |
| ChatGPT on /services/property-tax-advice, 28 days | 15 sessions, 4 leads | BING_G |
| FAQPage questions per service page | 12 | SCHEMA_F |
| Referring domains | 54 | COMP_D |

Success at week 8: the three service pages fetched and appearing for their owning queries at positions under 20; the hub indexed; London and Bristol old URLs processed; no drop in Bing 28-day impressions below 68,190 (the prior period); ChatGPT leads per 28 days at or above 16; Property leads per week above 16.

## 9. What the first deploy ships (verified 2026-10-07 by local build of HEAD and a rendered diff against live)

Live production is `bb8d6bb5`: the 30 Sep wording revert on top of `815ae7de`. HEAD carries 23 commits above that base which touch Property or the kit Property consumes (net 47 Property files, 140 lines added, 108 removed). `npm run build` at HEAD passes (949 pages). `check_dependency_closure.py` passes. 27 pages were fetched from the local build and from live and their visible text, titles, meta tags and script tags compared.

What changes on the live site:

| Change | Where | Source commit |
|---|---|---|
| "fixed fee in writing" leaves every surface; "a clear quote" or "the fee" replaces it | /about, /services, /services/landlord-accountant, niche.config CTAs, llms.txt, nurture emails, assistant openers, widget | `535843985`, `6bc25f606` |
| "free first call" becomes "free call" or "free consultation"; nurture SMS and email copy returns to the pre-phase-0 wording ("a specialist will call you") | lead-nurture config, concierge, FAQ, widget | `3c269094f`, `535843985` |
| Tagline em-dash removed: "rarely see, and that we handle every week" | /, /contact, /blog | `52740564d` |
| Homepage intro sentence reworded into firm voice | / | `52740564d` |
| FAQ answer "from our partner team" becomes "one of our property tax specialists" | FAQ data | `52740564d` |
| Help widget no longer auto-opens or peeks under 768px | SpecialistWidget | `6bc25f606` |
| llms.txt: "fixed fee in writing" line and the word "Faceless" removed (4 lines) | public/llms.txt | `6bc25f606`, `3c269094f` |
| About 30 blog posts: small factual and wording edits from the pre-live gate | content/blog | `6bc25f606`, `52740564d` |
| Keyboard focus rings on shared form fields and calculator inputs; Calculator heading-level prop with the same default; verdict pill colour token with the brand colour as fallback | kit Field, MiniCapture, Calculator | `65fa23034`, `538977c00`, `1437cb9ea`, `b576fd8a3` |
| Lead routing: wills-probate and divorce-finances leads get no partner CC and no Lead Tracker row (owner instruction 5 Oct) | /api/leads/sync, lead-routing | `110643de7` |
| AdSense publisher meta, Auto ads script and ads.txt | layout, public | `bc88aa78d`. **To be removed before deploy (WP0.9, owner ruling 7 Oct)**; as committed the script is blocked by Property's security policy anyway |

What does not change: `/locations/*`, `/for/*`, `/book`, titles and meta descriptions on every page checked, the two-step lead forms (the local build showed single-step forms only because the local environment lacked `NEXT_PUBLIC_MINIFORMS_MULTISTEP`, which Vercel has), the stat block text in server HTML, the sitemap URL set.

Two hazards for the deploy itself, neither in HEAD:

1. **Four untracked Saudi draft posts** sit in `Property/web/content/blog` (buying property in Makkah and Madinah, Saudi process, 2026 ownership law, UK tax on Saudi rental income). They are not committed. A deploy from the working tree would ship them (local sitemap 892 URLs vs live 888, and they appear in the homepage latest-posts block). A deploy from a clean worktree at a pushed SHA does not. The owner's ruling on the Gulf lanes was no; these drafts should stay out.
2. **HEAD is not pushed** and the working tree carries another session's uncommitted pharmacies changes. The standing rule applies: push first, deploy from `C:/dep` at the pushed SHA, never from this working tree.

## 8. SERP intent for the top in-niche queries (live pull, 2026-10-07, UK)

28 queries, DataForSEO Google organic top 10, UK location. "Clean" = no job boards and at most two directory or social results in the top 10. Our 56-day Search Console figure is shown where we had impressions. Cost $0.06.

| Query | Monthly volume | SERP type | Our best 56-day position (page) | In top 10 today |
|---|---|---|---|---|
| accountant for property | 720 | clean | 24 (/locations/bristol) | no |
| accountant property | 720 | clean | 20 (/locations/bristol) | no |
| accountants for property | 720 | clean | 11 (Belfast post) | no |
| accountants property | 720 | clean | 11 (Belfast post) | no |
| property accountant | 720 | clean on this pull; job boards appeared in a morning pull | 24 (noindexed careers post, still surfacing) | 8, Belfast post |
| property accountants | 720 | clean | 52 (/locations/birmingham) | no |
| uk property accountants | 480 | mixed (4 directories) | 40 (/) | no |
| landlord accountant | 390 | clean | 23 (/locations/manchester) | 5, Slough post |
| landlord accountants | 390 | clean | 25 (Belfast post) | no |
| landlords accountant | 390 | clean | 42 (Belfast post) | no |
| accountant for property investors | 320 | clean | 6 (/for/property-spv-set-up) | no |
| accountant property investment | 320 | clean | none | no |
| accountants for property investors | 320 | clean | none | no |
| property investment accountant | 320 | clean | 19 (/for/property-spv-set-up) | no |
| property investment accountants | 320 | clean | none | no |
| accountant for landlord | 260 | clean | none | 7, Slough post |
| accountant for landlords | 260 | clean | 69 (/locations/manchester) | no |
| accountant landlord | 260 | clean | 82 (/locations/birmingham) | no on the second pull (4 on the first) |
| accountant landlords | 260 | clean | 25 (Belfast post) | no |
| accountants for landlord | 260 | clean | 18 (Belfast post) | no |
| accountants for landlords | 260 | clean | 30 (Belfast post) | no |
| capital gains tax accountant | 210 | clean | none | no |
| property tax accountant | 210 | clean | 48 (/locations/manchester) | 1, /for/landlord-retirement-and-succession |
| property tax accountants | 210 | clean | 88 (/locations/manchester) | no |
| property tax specialist | 210 | clean | 43 (Manchester post, now 301) | no |
| property tax specialists | 210 | clean | 46 (/locations/bristol) | no |
| tax accountant property | 210 | clean | 14 (/locations/bristol) | no |
| accountant property specialist | 170 | clean | 21 (/locations/bristol) | no |

Three things this table settles.

1. **The national SERPs are winnable.** 26 of 28 are clean commercial SERPs with firm service pages in the top 10, not job boards. The head term wobbles between clean and career-mixed from pull to pull, so it is not the target; its variants are.
2. **Google is already ranking us for these queries, with the wrong pages.** Today's top-10 placements are a Belfast city post (position 8, "property accountant"), the Slough city post (5 and 7, "landlord accountant", "accountant for landlord") and the retirement-and-succession audience page (position 1, "property tax accountant", 210 a month). None is a service page. Every one of those pages is linked from almost nowhere; they rank on content alone. Guardrail added to WP1 and WP2: these four URLs (Belfast, Slough, retirement-and-succession, and the Bristol location page which carries five of the queries above) are not edited before the week-4 read, and no service page title may duplicate theirs. The service pages must earn the slot through links and fetch, not by removing the pages Google currently prefers.
3. **The two biggest gaps have no page at all.** "accountant(s) for property investors" and "property investment accountant(s)" (1,280 a month across the four forms) land on the SPV audience page at positions 6 to 19 by accident. "capital gains tax accountant" (210) has no ranking page. Both belong on the property-accountant service page's phrase list in WP1.2, with the SPV audience page linking to it.

Caveat: live SERPs vary by pull and by location setting; the morning pull for "property accountant" showed Reed and Glassdoor in the top 10, the afternoon pull did not. Treat the "in top 10 today" column as a snapshot, and the Search Console 56-day column as the measure.
