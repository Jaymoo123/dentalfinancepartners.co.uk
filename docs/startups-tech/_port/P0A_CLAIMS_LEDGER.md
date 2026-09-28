# startups-tech: phase 0A claims and ground-truth ledger

Produced 2026-09-29. Ground truth: `docs/startups-tech/house_positions.md` (35 positions),
`docs/startups-tech/rates_ledger.json` (41 keys). Method: DESIGN_PORT_PLAYBOOK.md section 2.1,
including "How to COUNT" (rendered claims reported as per-page presence with `grep -ql`, never raw
match totals, because the RSC flight payload serialises the DOM text twice) and "Before calling a
site's copy false, check Property".

Scope swept by rule, not by list: `startups-tech/web/src/**` (app, components, data, lib, config),
`startups-tech/web/content/blog/*.md` (32 posts, frontmatter included: `metaTitle`,
`metaDescription`, `summary`, `keyTakeaways`, `faqs`), `startups-tech/niche.config.json` (site root,
`entity` block included), `startups-tech/web/public/llms.txt`,
`startups-tech/web/src/app/llms-full.txt/route.ts`, the four calculators in
`src/lib/calculators/tools/` and all five of their test files, `src/app/terms/`, `privacy-policy`,
`cookie-policy`, and the rendered pages at `http://localhost:3201`.

Rendered verification used a read-only curl against the already-running `next start` on 3201.
No file outside this ledger was edited. No git command was run.

Positioning ruling 2026-09-12 applied: the first-person "we do the work" voice STAYS; what goes is
a claim to a qualification, a regulator, PI insurance, or regulated work. Estate ruling 2026-09-28
applied: the brand IS the firm on every surface, so "we are specialist accountants" and "a UK
accountancy practice" are NOT defects. Owner ruling 2026-09-28 applied: no row below is a voice or
tone row; every row is a factual defect.

---

## RULE A. Superlative about the firm presented as fact

Patterns searched: `UK's`, `the UK's`, `leading`, `best `, `only firm`, `expert`, `accredited`,
`approved by`, `HMRC.approved`, `registered with`, `specialis[ts]? (firm|accountancy)` over
`src content public ../niche.config.json`. One file hit.

| # | file:line | claim as published | rule breached | deriving command | verdict | severity |
|---|---|---|---|---|---|---|
| A1 | `startups-tech/niche.config.json:3` (`entity.firm`) | "Founder Tax Partners is **the UK's specialist accountancy firm** for funded and scaling technology companies." | Superlative about the firm published as fact; no source in house_positions or anywhere else. Surfaces as the `description` of the canonical Organization JSON-LD node on EVERY page (`src/lib/organization-schema.ts:36` reads `niche.entity.firm`; `src/app/layout.tsx:26` emits it in `<head>`). | `grep -n "UK's specialist accountancy firm" startups-tech/niche.config.json` gives 1 hit. Rendered presence, 14 of 14 pages sampled: `for u in / /about /services /for /calculators /blog /contact /terms /privacy-policy /research /services/rd-tax-claims /for/saas-companies /calculators/rd-relief-estimator /blog/share-schemes-and-emi/what-is-an-emi-scheme; do curl -s http://localhost:3201$u \| grep -ql "UK's specialist accountancy firm" && echo hit; done` gives 14 | **CORRECT IN PLACE** | **serious** |

**A1 exact correction.** Replace the first sentence of `entity.firm` with:
"Founder Tax Partners is a UK accountancy practice for funded and scaling technology companies."
Leave the rest of the sentence-block (services list, trading-name and company-number disclosure)
byte-identical. Source for the scoping half: house_positions.md, "Regulated-advice and scope
boundary" paragraph, "This site scopes to product and technology companies (SIC 62/63 core)".
There is no source anywhere for "the UK's", which is why it goes rather than being re-cited.

---

## RULE B. Invented client, testimonial, case study or client count

Patterns searched: `testimonial`, `case study`, `in our experience`, `we have helped`, `we helped`,
`we advised`, `we acted for`, `our client`, `one of our clients`, `client base`, `[0-9]+\+ clients`,
`clients trust`, `trusted by`, `hundreds of`, `dozens of`, `years of experience`, `our team of`.
Two files hit: `src/app/page.tsx` and `src/config/lead-nurture.ts`. Content directory: zero hits.

| # | file:line | claim as published | rule breached | deriving command | verdict | severity |
|---|---|---|---|---|---|---|
| B1 | `src/app/page.tsx:326-343` (rendered at `page.tsx:677-707`, section `aria-labelledby="testimonials-heading"`, heading "What founders say", eyebrow "Real outcomes") | Three first-person quotes in `<blockquote>` with `<figcaption>` attributions: "SaaS founder, Series A, London, R&D merged scheme"; "Pre-seed founder, fintech, South East, SEIS advance assurance"; "CTO, software development company, Midlands, EMI scheme and ERS returns". | Testimonials presented typographically as real quotations from real clients, while the page's own standfirst calls them composites. Either the quotes are real (then the standfirst is false) or they are written (then the quote marks, figcaptions and the "Real outcomes" eyebrow are). | `grep -n "const testimonials" src/app/page.tsx`; rendered presence 1 of 1 page: `curl -s http://localhost:3201/ \| grep -ql "testimonials-heading"` | **OWNER DECISION** | **serious** |
| B2 | `src/app/page.tsx:684-686` | "Composite accounts based on patterns across **our client base**. Names, amounts and specific details anonymised. **The compliance situations described are real.**" | Client-base and client-behaviour assertion; unverifiable and unsourced. | `grep -rniE "client base" src content` gives 1 file, 1 line | **OWNER DECISION** | **serious** |
| B3 | `src/app/page.tsx:334` | "**The process took eight weeks** and meant every investor conversation started with confirmation rather than a risk." | Published figure (8 weeks to advance assurance) with no source in house_positions, and directly contradicted by this site's own copy: `content/blog/how-to-apply-for-seis-eis-advance-assurance.md:27` states "HMRC does not publish a guaranteed processing time", and `content/blog/eis3-certificate-explained.md:137` states "HMRC does not publish a fixed turnaround time". | `grep -n "eight weeks" src/app/page.tsx`; `grep -rn "does not publish a guaranteed processing time" content/blog/` | **UNSOURCED, REMOVE** | **serious** |
| B4 | `src/config/lead-nurture.ts:403` | Outbound SMS body: "Founder Tax Partners here. **Most founders who ask what you asked get it settled in one short call.** Reply YES and we will ring you." | Client-behaviour and outcome assertion about a cohort of our own enquirers; no source, not measurable from anything on file. NOT a Property string: the mechanism is not estate-central copy, it is local to this site. | `grep -rn "get it settled in one short call" Property/web/src startups-tech/web/src` gives 1 hit, startups-tech only | **UNSOURCED, REMOVE** | **serious** |

**B4 exact correction.** Drop the sentence; the surrounding SMS ("Founder Tax Partners here. Reply
YES and we will ring you. `${c.optOutText}`") stands unchanged and still works. No house_positions
line is needed because nothing replaces the claim.

**Property check for B1/B2.** Property ships the same *section*:
`Property/web/src/components/property/TestimonialsSection.tsx:8` holds three quotes with
`who`/`detail` attributions and the standfirst "Anonymised feedback from landlords and investors we
have worked with", reused on 11 pages. So a testimonial band is the estate pattern and its removal
is not a port decision. What is local to startups-tech is the "Composite accounts ... The compliance
situations described are real" framing (B2), which Property does not carry:
`grep -rn "Composite" Property/web/src` gives 0 hits. That is why B1 and B2 are owner decisions
rather than unilateral removals.

---

## RULE C. Turnaround promise

Patterns searched: `within 24`, `within 48`, `24.hour`, `48.hour`, `same.day`, `same working day`,
`turnaround`, `within (one|1|two|a) (working day|business day|hour|day)`, `call you (today|within)`,
`by (tomorrow|the end of)`, `guarantee`, `no win`, `no-win`, `money.?back`. Non-page hits (admin
dashboard headings, cron comments, nurture health thresholds) excluded by inspection.

| # | file:line | claim as published | rule breached | deriving command | verdict | severity |
|---|---|---|---|---|---|---|
| C1 | `startups-tech/niche.config.json:9` (`entity.next`) | "**We reply within 24 hours** and one of our accountants comes back to you directly." | Turnaround promise (locked content rule). Estate-central: Property publishes "24-hour response" in `Property/web/src/app/contact/page.tsx:21,25,32` and on 7 calculator pages. | `grep -n "within 24 hours" startups-tech/niche.config.json` | **OWNER DECISION** (estate-wide, not a startups-tech port fix) | minor |
| C2 | 7 site files | "Tell us about your situation and **we will reply within 24 hours**" / "you will hear back within 24 hours" | Turnaround promise. Same estate-central status as C1. | `grep -rl "within 24 hours" src \| grep -v admin \| grep -v "api/"` gives `src/app/about/page.tsx`, `src/app/contact/page.tsx`, `src/app/for/page.tsx`, `src/app/for/[slug]/page.tsx`, `src/app/services/page.tsx`, `src/app/services/[slug]/page.tsx`, `src/components/forms/LeadForm.tsx` (7 files) | **OWNER DECISION** | minor |
| C3 | `src/app/page.tsx:759` | Proof point: "**24-hour response**" / sub: "**Usually the same working day**" | Turnaround promise plus an implied observed-behaviour claim ("usually"). Byte-identical to Property: `{ title: "24-hour response", detail: "Usually the same working day" }` appears in 7 Property files. | `grep -rn "Usually the same working day" Property/web/src \| wc -l` gives 7; `grep -n "24-hour response" src/app/page.tsx` | **OWNER DECISION** | minor |

---

## RULE D. The same quantity carrying different values in different places

| # | file:line | claim as published | rule breached | deriving command | verdict | severity |
|---|---|---|---|---|---|---|
| D1 | `src/app/about/page.tsx:26`, `src/components/calculators/CalcResultCta.tsx:12`, `src/components/calculators/MiniCapture.tsx:20` vs the 8 locations in C1/C2 vs `src/app/page.tsx:759` | Three different values for one quantity (our response time): "you hear back **within one working day**" (3 files) / "we will reply **within 24 hours**" (8 locations) / "**24-hour response** ... usually the same working day" (homepage). | Same quantity, different published values. One working day and 24 hours are not the same interval (an enquiry at 17:00 on a Friday). | `grep -rl "within one working day" src` gives 3 files; `grep -rl "within 24 hours" src ../niche.config.json \| grep -v admin \| grep -v "api/"` gives 8 | **OWNER DECISION** (the wording to standardise on is the owner's, because the whole claim is under review in C1-C3; house_positions is silent on service promises, so there is no line to derive a correction from) | minor |

---

## RULE E. Machine-readable output disagreeing with the page, or with itself

| # | file:line | claim as published | rule breached | deriving command | verdict | severity |
|---|---|---|---|---|---|---|
| E1 | `src/app/layout.tsx:26` (via `src/lib/organization-schema.ts:26`) AND `src/app/page.tsx:9` (via `src/lib/schema.ts:11`) | The homepage emits **two Organization nodes under the same `@id`** `https://www.foundertaxpartners.co.uk#organization`: one `"@type":"AccountingService"` described as "the UK's specialist accountancy firm...", one `"@type":["ProfessionalService","AccountingService"]` described as "Specialist accountants for funded and scaling UK startups...". Two different descriptions of the firm published under one identifier. | JSON-LD contradicting itself; a consumer resolving `#organization` gets whichever it reads last. | Extract and parse every `application/ld+json` block on `/`: 4 blocks, two of them Organization nodes with the same `@id` and different `@type` and `description`. `grep -o '"@id":"[^"]*#organization"' home.html \| wc -l` gives 3 raw (RSC-inflated); the real count of 2 comes from the parsed blocks, not the substring | **CORRECT IN PLACE** | minor |
| E2 | `src/lib/schema.ts:35` | `priceRange: "££"` on the homepage Organization node | A fee band for our own services, published machine-readably, with no source. | `grep -n priceRange src/lib/schema.ts`; the parsed homepage Organization node carries `priceRange` | **CORRECT IN PLACE** | minor |
| E3 | `src/app/llms-full.txt/route.ts`, "Schema And Discovery" block | "Auto-generated per page: ... **BlogPosting on individual posts**" | Machine-readable output describing schema the site does not emit. No blog post emits BlogPosting or Article. | `for u in /blog/research-and-development/rd-claim-collapse-hmrc-clampdown /blog/share-schemes-and-emi/what-is-an-emi-scheme /blog/seis-and-eis/seis-vs-eis-explained; do curl -s http://localhost:3201$u \| grep -o '"@type":"BlogPosting"' \| wc -l; done` gives 0, 0, 0 (per-page presence 0 of 3). The same block's claims for FAQPage, Organization and WebApplication DO verify (WebApplication present on `/calculators/rd-relief-estimator`) | **CORRECT IN PLACE** | minor |

**E1 exact correction.** Remove the Organization node from `src/app/page.tsx`: drop
`buildOrganizationJsonLd` from the import on line 9 and delete the `<script>` tag that renders it,
keeping only the canonical node emitted in `src/app/layout.tsx:26`. The layout node is the one to
keep: it is the one with `sameAs`, `parentOrganization` and `knowsAbout`, and it renders on every
page. Source: no house_positions line applies (this is an identifier collision, not a figure); the
description that survives must be the corrected A1 text. Applying E1 also closes E2, because
`priceRange` exists only on the node being deleted. **Sequence A1 before E1** so the surviving node
never carries the superlative.

**E3 exact correction.** Delete the line "- BlogPosting on individual posts" from the
"Schema And Discovery" list in the route header. (Adding BlogPosting schema instead is a build
decision for a later phase, not a claims correction.)

---

## RULE F. Compliance sentence describing code that does not run, or contradicted by the page

| # | file:line | claim as published | rule breached | deriving command | verdict | severity |
|---|---|---|---|---|---|---|
| F1 | `src/app/privacy-policy/page.tsx` section 6, "How long we keep your information" | "We keep enquiry data for **24 months** from the date of your enquiry, **after which it is deleted**." | Compliance sentence describing code that does not run. The purge ships dormant: `src/lib/leads/retention.ts:15-17` says "SHIPS DORMANT: the cron route is DRY-RUN by default. Nothing is mutated until LEAD_RETENTION_PURGE_ENABLED=1 is set in the environment", and `src/app/api/cron/lead-retention/route.ts:51-53` gates `dryRun` on exactly that variable. The cron IS scheduled (`vercel.json`, `30 3 * * *`), so it runs nightly and deletes nothing unless the variable is armed in production. I cannot read the production environment from here, so the claim is unproven rather than proven false. | `grep -n "SHIPS DORMANT" src/lib/leads/retention.ts`; `grep -n "LEAD_RETENTION_PURGE_ENABLED" src/app/api/cron/lead-retention/route.ts`; `grep -n "enquiry_retention_months" ../niche.config.json` gives 24 | **OWNER DECISION** (arm the variable, or the sentence is false. Estate-wide and identical in Property: `grep -n "SHIPS DORMANT" Property/web/src/lib/leads/retention.ts` gives the same lines, so this is a manager escalation, not a port fix) | **serious** |
| F2 | `src/app/cookie-policy/page.tsx:62-64` and `:75` | "This Site **does not use Google Analytics or any other third-party analytics cookies**. The only analytics data collected is through our own first-party system." and "We do **not** use cookies for **advertising, remarketing**, or selling your data to third parties." | Contradicted by the code that ships. `src/app/layout.tsx:30` passes `adsenseClientId="ca-pub-3756285576371279"` to `ConsentedScripts`, which (`packages/web-shared/analytics/react/ConsentedScripts.tsx:27-33`) loads AdSense on mount for every visitor who has not opted out; the publisher id is present in the rendered homepage, `public/ads.txt` authorises Google as a seller, and the same id sits in the `google-adsense-account` meta at `src/app/layout.tsx:19`. AdSense is an advertising tag that sets third-party cookies. | `grep -n "adsenseClientId" src/app/layout.tsx`; `curl -s http://localhost:3201/ \| grep -o "ca-pub-3756285576371279"` is present; `cat public/ads.txt`; estate scope `grep -rn "ca-pub-3756285576371279" --include=*.tsx . \| grep -v node_modules` spans 17 sites | **OWNER DECISION** (two lawful fixes: stop passing `adsenseClientId` on this site, or the owner accepts a copy change. **Do not fix this by adding a disclosure** - locked rule `clarity_removed_pecr_decision`: never add disclosures to sites lacking them. Estate-wide: Property's cookie policy carries the identical sentence at `Property/web/src/app/cookie-policy/page.tsx:83` while loading the same tag) | **serious** |
| F3 | `src/app/cookie-policy/page.tsx:128-137` | A "**Google Analytics opt-out**" heading and a link to the Google Analytics Opt-out Browser Add-on | The same page, 66 lines earlier, states the site does not use Google Analytics, and `niche.config.json:92` `google_analytics_id` is `""` so `GoogleAnalytics` renders nothing. Self-contradiction. | `grep -n "Google Analytics" src/app/cookie-policy/page.tsx`; `grep -n google_analytics_id ../niche.config.json` gives `""`; rendered `curl -s http://localhost:3201/cookie-policy \| grep -o "Google Analytics Opt-out Browser Add-on" \| wc -l` gives 2 raw = 1 real block (RSC doubles DOM text) | **CORRECT IN PLACE** | minor |
| F4 | `src/app/cookie-policy/page.tsx:40-46` and `:47-58` | The entire "**First-party analytics**" subsection (heading plus both paragraphs) is published **twice, verbatim** | Duplicated disclosure block; the page tells the visitor the same thing twice under the same heading. | `grep -c "First-party analytics" src/app/cookie-policy/page.tsx` gives 2 headings in source; rendered `curl -s http://localhost:3201/cookie-policy \| grep -o "First-party analytics" \| wc -l` gives 4 raw = 2 real | **CORRECT IN PLACE** | minor |
| F5 | `src/app/privacy-policy/page.tsx` section 5 | "the grade we give it under our **published grading rubric**" | Calls the rubric published; it is not published anywhere on this site. The only occurrence of "rubric" in the whole site is this sentence. | `grep -rln "rubric" src content` gives 1 file, the privacy policy itself. Estate-central: `grep -rln "grading rubric" Property/web/src` gives its privacy policy only, same wording | **OWNER DECISION** (publish a rubric page, or drop the word "published"; estate-wide wording, so a manager call) | minor |

**F3 exact correction.** Delete the `<h3>Google Analytics opt-out</h3>` heading and the paragraph
containing the opt-out add-on link (`src/app/cookie-policy/page.tsx:128-137`). This is the removal of
a disclosure describing a tag the site does not load, not the addition of one, so it sits inside the
locked rule rather than against it. No house_positions line applies (no figure).

**F4 exact correction.** Delete the SECOND copy, `src/app/cookie-policy/page.tsx:47-58` (heading plus
two paragraphs), keeping lines 40-46. The two copies are identical apart from line wrapping, so
nothing is lost.

---

## VERIFIED: positives checked, no defect found

The playbook requires the ledger's positives to be verified too, counts having been found overstated
as well as understated.

| # | subject | what was checked and how | verdict |
|---|---|---|---|
| V1 | Privacy policy's lead-sharing mechanism: 3 firms in the profession plus 3 in related professions, at most 6; the 48-hour re-offer; the 7-day single-firm batch | The pool is estate-central, DB-driven and source-agnostic (`Property/web/src/lib/leads/offer-send.ts`; startups-tech has no local `offer-send.ts`, by design). startups-tech reaches it through the contactability bridge, exercised by `src/tests/lead-contactability-bridge.test.ts` (7 tests, all passing). Per playbook, copy describing an estate-central mechanism is not a local defect. | **VERIFIED** |
| V2 | Cookie policy's first-party analytics disclosure (two random identifiers, anonymous interaction events, no IP stored) | The tracker IS mounted: `src/app/layout.tsx:29` renders `AnalyticsProvider` from `@accounting-network/web-shared` with `storagePrefix="ffp"` and `posture="opt-out"`. A source-only grep of startups-tech for `localStorage` or `api/track` returns nothing, which would read as a dead disclosure; the mechanism lives in the shared package. Not a defect. | **VERIFIED** |
| V3 | All four calculators against house_positions and rates_ledger | `rd-relief-estimator.ts` 20% / 86% / 14.5% / 30% / CT 25 and 19 (HP1, HP2, HP21); `seis-eis-relief-calculator.ts` SEIS 50% on £200,000, EIS 30% on £1,000,000, £2m KIC as a note (HP8, HP10); `emi-vs-unapproved-calculator.ts` BADR 18%, CGT 18/24, employer NIC 15%, employee NIC 8/2 at £12,570 and £50,270 (HP18, HP19, HP23, HP31); `founder-dividend-vs-salary-calculator.ts` CT 19/25 at £50,000 and £250,000, dividends 10.75/35.75/39.35 with a £500 allowance, employer NIC 15% above £5,000, EA £10,500, PA £12,570, bands £50,270 and £125,140, LEL £6,708 (HP21, HP22, HP23, HP30, HP31, HP32). Every constant matches. Arithmetic re-derived by hand: merged-scheme net 20%x(1-0.25)=15% and 20%x(1-0.19)=16.2%; ERIS £100,000x1.86x0.145=£26,970; marginal relief `mrf = 3/200` returns exactly 19% at £50,000 profit (12,500 minus 3,000 = 9,500). | **VERIFIED** |
| V4 | The five calculator test files, for stale pinned values (the Medical incident) | `npx vitest run` gives 8 files, **75 tests, all passing**. Every asserted golden figure is a CURRENT figure: £15,000 / £16,200 / £26,970 / £186,000 (R&D), £5,000 / £2,750 / £2,250 / £100,000 (SEIS-EIS), £18,000 at BADR 18%, £24,000 at CGT 24% and £15,000 employer NIC at 15% (EMI), £1,050 employer NIC and £2,096 dividend tax at 10.75% (founder). No test pins a superseded rate. | **VERIFIED** |
| V5 | Stale 2025/26-and-earlier rates, site-wide | Per-file presence, zero hits for each: `8\.75%` 0 files, `33\.75%` 0, `13\.8%` 0, `£9,100` 0, `£8,840` 0, `£85,000` 0, `45p` 0, `130%` as a live rate 0. BADR 14% and 10% appear once, correctly labelled as dated history (`content/blog/growth-shares-explained.md:193`: "the current rate from 6 April 2026; it was 14% for 2025/26 and 10% before that"), matching HP18. The SME super-deduction is referenced only as the thing the merged scheme replaced. | **VERIFIED** |
| V6 | Every figure in `public/llms.txt` "Key facts" (18 bullets) | Checked line by line against house_positions: R&D 20%; ERIS 86% plus 14.5% at 30% intensity; 6-month notification; SEIS £250,000, £350,000, 25 FTE, 50% on £200,000; EIS £5m, £12m, 30% on £1m (£2m KIC), 3 years; EMI £250,000, £3m, £30m, 250 FTE; ERS 6 July; CSOP £60,000; s.431 14 days; BADR 18% from 6 April 2026 on £1m; CGT 18 and 24; CT 19 and 25 at £50,000 and £250,000; dividends 10.75, 35.75, 39.35 with £500; employer NIC 15% above £5,000 with EA £10,500; VAT £90,000; pre-trading 7 years. All 18 match. The file's self-dating ("verified against primary sources as of 2026-07-14") matches the house_positions producer pass date. | **VERIFIED** |
| V7 | Research figures against their own data files (the construction-cis six-values incident) | `content/blog/rd-claim-collapse-hmrc-clampdown.md` vs `src/data/rd-tax-relief-index.json` `headline`: 46,950 / -26.4% / £7,555m / £46,070m / 12,305 / 26.2% / £1,565m / 20.7% / 71.0%, all identical, and the prior-year £7,690m and 63,780 reconcile against `costSeries` and `claimsSeries`. `content/blog/uk-tech-company-formation-boom.md` vs `uk-tech-formations-index.json`: 293.9% / 76.8% / 85.2% / 6,961 / 27,417 / 33,042 / 68,512, identical. `content/blog/where-uk-startup-equity-money-goes.md` vs `uk-tech-funding-reliefs-index.json`: EIS £1,575m across 3,735 companies, 34.9%; SEIS £276m across 2,430, 41.5%; London plus South East EIS £711m + £237m = £948m = 60.2% of £1,575m, and SEIS £143m + £38m = £181m = 65.6% of £276m. All recomputed and correct. | **VERIFIED** |
| V8 | FAQ JSON-LD against the visible page | `/blog/share-schemes-and-emi/what-is-an-emi-scheme`: the FAQPage carries 8 questions and all 8 question strings were matched in the tag-stripped rendered page (8 of 8 visible). `/services/rd-tax-claims`: FAQPage carries 4 and the page renders 5 `<summary>` elements (the extra is the page's own toggle, not a missing FAQ). No Q-and-A published to search engines that a reader cannot see. | **VERIFIED** |
| V9 | Claims to a qualification, a regulator, PI insurance or regulated work | Per-file presence on published surfaces: `chartered` 0, `ACCA` 0, `ACA ` 0, `ICAEW` 0 (the single hit is a JSDoc example in `src/types/blog.ts:40`, and no post sets a reviewer field), `AAT` 0, `CIOT` 0, `ATT` 0 real (the 76-file count was the substring "att" inside ordinary words), `professional indemnity` 0, `regulated by` 0, `qualified accountant` 0, `HMRC approved` 0. The one "qualified tax adviser" string (`src/lib/calculators/tools/seis-eis-relief-calculator.ts:184`) refers the user OUT to one. `src/data/startups-hubs.ts:321` correctly disclaims: "For FCA authorisation or regulatory permissions, you need a regulatory specialist, not a tax accountant." Nothing contradicts `src/app/terms/page.tsx` section 2 ("does not constitute accounting, tax, financial, or legal advice ... No accountant-client relationship"). | **VERIFIED** |
| V10 | A published fee for our own services, and contingent-fee offers | No amount for our services anywhere: `£[0-9]+ *(per month\|/month\|pcm\|a month)` 0 files, `fixed fee` with a figure 0, `our fees` 0, `no win` 0, `no-win` 0, `money.?back` 0. `src/app/about/page.tsx:26` "fixed-fee basis" and `niche.config.json` "a fixed fee in writing" carry no number and match Property ("then a fixed fee in writing", `Property/web/src/app/contact/page.tsx:25`). `content/blog/startup-cfo-pay-and-fractional-cfo-cost.md` is explicitly disciplined about it: "We do not publish a day rate here" and "no reliable public UK startup benchmark is cited here". The only `price` in machine-readable output is the free calculators' `Offer: {price: "0", priceCurrency: "GBP"}`, which is accurate. | **VERIFIED** |

---

## Counts

| verdict | rows |
|---|---|
| VERIFIED | 10 |
| CORRECT IN PLACE | 6 |
| UNSOURCED, REMOVE | 2 |
| OWNER DECISION | 9 |
| **total rows** | **27** |

**Serious tier: 7** - A1 (superlative on every page), B1, B2, B3 (the homepage testimonial block:
fabricated-or-real quotes, the client-base assertion, and the unsourced eight-week figure that
contradicts two of our own blog posts), B4 (outcome claim in an outbound SMS), F1 (retention promise
against a dormant purge), F2 (cookie policy against AdSense).

Of the 7 serious rows, **3 are estate-wide rather than startups-tech-local**: F1 and F2 are
byte-identical mechanisms across the estate (F2 spans 17 sites), and B1's testimonial *section* is
the Property pattern. Those are manager escalations. The 4 that are this site's own and fixable
inside phase 0 are A1, B2, B3 and B4.

---

## False premises in this brief

1. **"`web/public/llms.txt` and `llms-full.txt`"** - only `llms.txt` is a static public file.
   `llms-full.txt` is a route, `startups-tech/web/src/app/llms-full.txt/route.ts`, and its prose
   lives in the `header` template string passed to `buildLlmsFullRoute`. That template is where E3
   is fixed; there is no `public/llms-full.txt` to edit.
2. **"`niche.config.json` ... (including the `entity` block that feeds schema and llms.txt)"** - the
   `entity` block feeds the Organization JSON-LD `description` only
   (`src/lib/organization-schema.ts:36`). It does NOT feed `public/llms.txt`, which is hand-written
   and does not contain the superlative: `grep -c "UK's specialist" public/llms.txt` gives 0. A1's
   blast radius is the schema node on every page, not the llms files.
3. **`niche.config.json` is not under `web/`** - it is at `startups-tech/niche.config.json`, the site
   root. Grepping `startups-tech/web` alone, which several of the brief's rule patterns imply, misses
   the single most serious row in this ledger.
4. **"calculator source AND its tests"** - correct location, but there are **five** test files for
   four calculators, and `rd-relief-estimator` has **two**:
   `src/lib/calculators/tools/rd-relief-estimator.test.ts` (2 tests) and
   `src/lib/calculators/tools/__tests__/rd-relief-estimator.test.ts` (5 tests). Both assert current
   values, so this is not a defect, but any later instruction to "update the estimator test" must
   touch both or it half-lands.
5. **"check against ... AMAP 55p, FA 2026 enacted 18 Mar 2026"** - neither claim exists on this site
   to grade: `grep -rl "55p\|45p" src content public` gives 0 files, and `grep -rl "18 March 2026\|18 Mar 2026"`
   gives 0. There is no mileage content and no FA-enactment-date claim. Nothing to verify or correct.
6. **"data files under `web/src/data/` (`startups-services.ts`, `startups-hubs.ts` and siblings)"** -
   the siblings are five research JSON files plus one CSV, i.e. data assets, not prose. They were
   swept and reconcile against the posts that cite them (V7). The two TypeScript files were swept and
   produced no row: their only near-hits ("Advance assurance ... is not a guarantee") are correct
   hedges, not promises.
7. **"a claim that contradicts this site's own terms page is a defect whichever one is wrong"** -
   sound as a rule, but no such contradiction exists here (V9). The contradictions this sweep found
   are with the **cookie policy** (F2, F3, F4) and the **privacy policy** (F1, F5), not with terms.

## Not in scope, observed and handed on

- `src/app/page.tsx:684` and elsewhere emit `class="section-label"`. Whether a rule defines it is the
  CSS and token auditor's row, not a claims row; noted here only because the playbook's dead-class
  sweep sits in the same section 2.1 and five sites have already shipped it undefined.
- No `next build` or `next dev` was run. Verification was `npx vitest run` (75 passing), source
  inspection, and read-only curl against the existing server on 3201. `npx tsc --noEmit` was not run
  because this work package modified no TypeScript.
