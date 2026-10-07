# pharmacies: phase 0A claims and ground-truth ledger

Produced 2026-10-07 (package P0-A). Ground truth: `docs/pharmacies/house_positions.md` (28
positions, A to F, locked 2026-07-14) and `docs/pharmacies/rates_ledger.json` (26 keys). Shape
follows `docs/hospitality/_port/P0A_CLAIMS_LEDGER.md`.

Swept by rule, not by list: `pharmacies/web/src/**` (app, components, config, data, lib,
calculators and all three calculator test files, tests), the **22** markdown posts in
`pharmacies/web/content/blog/` (frontmatter `metaTitle`/`metaDescription`/`summary`/
`keyTakeaways`/`faqs` and body HTML), `pharmacies/niche.config.json`,
`pharmacies/web/public/llms.txt`, `pharmacies/web/src/app/llms-full.txt/route.ts`, `terms/`,
`privacy-policy/`, `cookie-policy/`, both research pages and the five research JSON files they
render, `packages/site-styles/prose-standard.css`.

No server started, no build, no git command, no file written but this one. Evidence is source
inspection plus figure-by-figure reconciliation, so "renders" rows are proved by reading the
component, not by curl.

**Counting rule applied.** Every count below is **files containing the claim** (`grep -rl`),
`/admin/*` and `/api/*` excluded. Raw match totals are never quoted. Measured per-file presence
for the load-bearing quantities: `18%` 9 files, `within 24 hours` 8, `15%` 10, `10.75%` 7,
`£90,000` 4, `Class 2` 4.

**Prior programme, not re-reported.** `docs/pharmacies/PHASE0_2026-09-28.md` and
`PHASE0_RECHECK_2026-09-29.md` (a different programme) closed: raw HTML rendering as text on
`/for/*` and `/services/*`, the duplicate calculator form, `.prose table` overflow, the
`delayHours` gap values, the missing `<main>`, sitemap `lastModified`, focus rings, the schema
port, llms.txt UTM tagging, AdSense and security headers. Their one open item,
"house_positions.md never re-checked against ground-truth memory", is closed here: BADR 18%,
dividends 10.75/35.75/39.35, employer NIC 15% above £5,000, EA £10,500, FA 2026 allowances
14%/40%/6%, SBA 3%, CGT 18/24 and AEA £3,000 all agree with the estate ground-truth memories,
and the site agrees with them.

**Owner ruling 2026-09-28 honoured.** The wording reversal stands. Nothing here asks for a prose
rewrite. Only false, regulated or financial statements are put up for correction, minimally.
Estate rulings of 2026-09-29 are applied as precedent where the item is byte-identical to
Property or estate-central.

---

## RULE A. Superlative, qualification, regulator or PI claim about the firm

Patterns over `web/src web/content niche.config.json web/public/llms.txt`: `UK's`, `leading`,
`award`, `accredit`, `approved by`, `chartered`, `ACCA`, `ICAEW`, `qualified accountant`,
`professional indemnity`, `regulated by`, `FCA`, `CIOT`, `ATT`, `our team of`,
`years of experience`.

**Zero defect rows.** Every `professional indemnity` hit is about the *reader's* cover (2 locum
posts), not ours. Every `Chartered` hit is "Aswatax, Chartered Tax Advisers", a real named
partner firm (3 files: `thank-you/page.tsx:75,86`, `LeadForm.tsx:414`), framed as a partner, not
as us. `niche.config.json:2` opens "Pharmacy Tax is a UK accounting practice for community
pharmacy owners", the corrected estate shape. The terms page claims no qualification either: it
disclaims advice and any accountant-client relationship at `terms/page.tsx:56-64`.
`organization_type` is `AccountingService`, which is the positioning the 2026-09-12 ruling
allows.
Deriving command: `grep -rniE "chartered|qualified accountant|professional indemnity|regulated by" pharmacies/web/src/app pharmacies/web/src/components pharmacies/web/content pharmacies/niche.config.json`

---

## RULE B. Invented client, testimonial, case study or client count

| # | where | claim (short) | ground truth + source | verdict | tier | deriving command |
|---|---|---|---|---|---|---|
| B1 | `web/src/app/page.tsx:182-206`, rendered `:737-767` | Three first-person `blockquote` quotes with `figcaption` attributions ("Single-store pharmacy owner, South East England", "First-time pharmacy buyer, Midlands", "Pharmacy group owner, North West England") under the heading "What clients say" and eyebrow "Real outcomes" | Nothing on file evidences clients. The section's own standfirst calls them composites, so either the quotes are real (standfirst false) or written (the quote marks, figcaptions and "Real outcomes" false). No house position supports either | OWNER DECISION (estate precedent 09-29 on the identical hospitality/startups block: LEFT AS IS) | **serious** | `grep -n "const testimonials" web/src/app/page.tsx` = 1 hit, rendered by the single `.map` at `:750`; per-file presence 1 of 1 (homepage only) |
| B2 | `web/src/app/page.tsx:745-746` | "Composite accounts based on patterns across **our client base**. Names, amounts and specific details anonymised. **The situations described are real.**" | Client-base and client-behaviour assertion, unsourced and unverifiable | OWNER DECISION (same precedent: LEFT AS IS) | **serious** | `grep -rn "Composite accounts" web/src web/content` = 1 file, 1 line |
| B3 | `web/src/app/page.tsx:820-821` | Proof point "**Pharmacy clients only**" / "We do not take general commercial, property, or unrelated clients" | A claim about the composition of our client book, stated as fact. Nothing evidences a refusal policy | OWNER DECISION | minor | `grep -n "general commercial, property" web/src/app/page.tsx` = 1 hit |
| B4 | `web/src/app/page.tsx:828-829` | "All conversations are confidential" / "**We never discuss one client's position with another**" | Behavioural claim about a client book; sits beside a real partner-handoff mechanism that does share enquiry details with third-party firms (`lib/leads/handoff.ts`), disclosed only in the privacy policy | OWNER DECISION | minor | `grep -n "never discuss one client" web/src/app/page.tsx` = 1 hit |
| B5 | `web/src/lib/calculators/tools/pharmacy-purchase-affordability.ts:122-128` | Complexity note: features of your deal "sit outside **the ranges we see most often**" (three variants) | Implies an observed deal population. No dataset, no house position | OWNER DECISION | minor | `grep -n "ranges we see most often" web/src/lib/calculators/tools/pharmacy-purchase-affordability.ts` = 3 hits, 1 file |
| B6 | `web/src/app/services/page.tsx:25` | `featuredBadge="Most popular"` on the middle service tier | Popularity claim about our own services, nothing evidences it | OWNER DECISION | minor | `grep -n "Most popular" web/src/app/services/page.tsx` |
| B7 | site-wide | No "X pharmacies helped", no client count, no named individual, no case study | HP presentation rule (the firm is faceless) honoured | **verified** | - | `grep -rniE "we have helped|[0-9]+\+ clients|trusted by|case stud" web/src web/content` = 0 content hits |

---

## RULE C. Turnaround promise and published fee for our own services

| # | where | claim (short) | ground truth + source | verdict | tier | deriving command |
|---|---|---|---|---|---|---|
| C1 | 8 files | "we will reply within 24 hours" / "We respond within 24 hours" / "Thanks. We'll be in touch within 24 hours." | Turnaround promise. **Estate-central**: byte-identical strings live in `Property/web/src/app/{about,contact,page,blog}` | OWNER RULING 09-29 precedent: LEFT AS IS | minor | `grep -rl "within 24 hours" web/src niche.config.json web/public/llms.txt \| grep -v admin \| grep -v "api/"` = 8 files (`about`, `blog/[category]/[slug]`, `contact`, `for/[slug]`, `services`, `services/[slug]`, `LeadForm.tsx`, `niche.config.json`) |
| C2 | `web/src/app/page.tsx:824-825` | Proof point "**24-hour response**" / "**Usually the same working day**" | Promise plus an observed-behaviour claim. Byte-identical to Property's calculator pages | OWNER RULING 09-29 precedent: LEFT AS IS | minor | `grep -rl "Usually the same working day" ../Property/web/src` = 4 files |
| C3 | `web/public/llms.txt:76`, `web/src/app/llms-full.txt/route.ts:86`, `web/src/app/about/page.tsx:26`, `components/calculators/MiniCapture.tsx:20` | "Reply **within one working day**" / "every enquiry gets a specialist reply within one working day" | **The same quantity carries two values**: 24 hours on 8 visible surfaces, one working day on 4 (including both machine-readable files). A Friday enquiry is 24 hours in one place and Monday in the other | **CORRECTION NEEDED** (pick one; "within 24 hours" is the estate string, so align the 4 outliers) | **serious** | `grep -rn "one working day" web/src web/public/llms.txt \| grep -v admin` = 4 files, against the 8 above |
| C4 | `web/src/app/about/page.tsx:26` | "**We work on a fixed-fee basis** and reply within one working day." | A statement about our own commercial terms, not in house positions and **not** an estate string (0 hits in Property). It does not contradict the homepage FAQ "We do not publish standard prices" (`page.tsx:231`), but it is an unsourced promise covering every engagement | OWNER DECISION | minor | `grep -rn "fixed-fee basis" web/src ../Property/web/src` = 1 hit, pharmacies only |
| C5 | `web/src/app/book/page.tsx:14,32`, `BookingPicker.tsx:160,168`, `complete/page.tsx:120`, `config/lead-nurture.ts:343` | "free review call", "free pharmacy finance review", "about 20 minutes, with no charge" | A free-of-charge offer about our own service, restored to base wording by the 09-28 ruling, so it is the owner's own copy | **verified** (left as is) | minor | `grep -rln "free review\|no charge" web/src \| grep -v admin` = 6 files |
| C6 | site-wide | No published price, rate card or "from £X" | HP presentation rule honoured | **verified** | - | `grep -rnE "from £[0-9]\|£[0-9,]+ ?(per month\|a month\|/month\|\+VAT)" web/src web/content` = 0 hits |
| C7 | `web/src/lib/schema.ts:34` | JSON-LD `priceRange: "££"` on every page's Organization node | A machine-readable price signal for a firm that publishes no prices. Shared-builder field, set by this site | minor | minor | `grep -n priceRange web/src/lib/schema.ts` = 1 hit, emitted site-wide via `buildOrganizationJsonLd` |

---

## RULE D. The same quantity carrying different values (including JSON-LD)

| # | where | claim (short) | ground truth + source | verdict | tier | deriving command |
|---|---|---|---|---|---|---|
| D1 | see C3 | reply time: 24 hours against one working day | - | **CORRECTION NEEDED** | **serious** | see C3 |
| D2 | `web/content/blog/pharmacy-dispensing-workload-and-density.md:42` against `:99` | "the number of dispensing pharmacies fell from 11,764 to **10,382**" and, 57 lines later, "England as a whole sits at 18.11, from **10,617 pharmacies**" | Both derive correctly from their own dataset: 10,382 = `pharmacy-dispensing-workload.json` March 2026 distinct dispensing contractor accounts; 10,617 = `pharmacy-density-by-region.json` (NHSBSA Contractor Details, Jun 2026) regional sum. Two different populations, both sourced and footnoted, but the post never says they are different | CORRECTION NEEDED (one clause naming the definition difference; no figure changes) | minor | `python -c "import json;d=json.load(open('web/src/data/pharmacy-density-by-region.json'));print(sum(r['pharmacy_count'] for r in d['regions']), d['england_per_100k'])"` |
| D3 | all core tax rates | BADR 18%, CGT 18/24, AEA £3,000, basic-band ceiling £37,700, employer NIC 15% above £5,000, EA £10,500, CT 19/25 with £50k/£250k, dividends 10.75/35.75/39.35 with £500, AIA £1,000,000, WDA 14%, FYA 40%, special rate 6%, SBA 3%, SDLT top 5%, share duty 0.5%, VAT threshold £90,000, MTD £50,000 then £30,000 | Every one matches `rates_ledger.json` and its house position, in **every** place it appears: the 9 data and page files, the 22 posts, `llms.txt`, `llms-full.txt/route.ts`, both calculators' constants and `service-tiers.ts`. No quantity carries two values. Every `13.8%` and `£9,100` hit (3 files) is explicitly framed as the stale rate | **verified** | - | `grep -rnoE "[0-9]+(\.[0-9]+)?%" web/src/app web/src/data web/src/config web/src/lib/calculators niche.config.json web/public/llms.txt \| grep -v admin \| awk -F: "{print \$NF}" \| sort \| uniq -c`, then read each |
| D4 | `web/content/blog/preparing-a-pharmacy-for-sale.md:130-152` | Illustrative BADR table: £500,000 gain at 14% = £70,000, at 18% = £90,000, difference £20,000 | Arithmetic re-derived and correct; labelled illustrative with a caveat paragraph naming the exclusions | **verified** | - | `python -c "print(500000*0.14, 500000*0.18)"` |
| D5 | research pages | Both research pages render every figure from the JSON data files; no hardcoded number in either page | Checked: `314.1%` (940/227), TTM `802`, YoY `-18.2%`, `36.1%` (9,834.9/7,225.8), `-11.7%` (10,382/11,764), `18.11` (10,617/58,620,101), `20.9` and `14.99` regional, all re-derived from the JSON and correct | **verified** | - | `grep -nE "[0-9]{2},[0-9]{3}" web/src/app/research/*/page.tsx` = 0 hits |

---

## RULE E. Machine-readable output disagreeing with the visible page

| # | where | claim (short) | ground truth + source | verdict | tier | deriving command |
|---|---|---|---|---|---|---|
| E1 | `web/public/llms.txt:41` | The affordability calculator "**Models the affordable purchase price** for a community pharmacy based on EBITDA, debt service, and **working capital**" | The tool does none of that: it *takes* a price as input and returns a monthly repayment, a post-tax cover ratio and a stamp-duty comparison. It computes no affordable price and no working capital. The tool's own FAQ (`pharmacy-purchase-affordability.ts:169`) says it deliberately will not derive a price | **CORRECTION NEEDED** (describe what it does) | **serious** | `grep -n "affordable purchase price" web/public/llms.txt` = 1 hit; compare `compute()` at `web/src/lib/calculators/tools/pharmacy-purchase-affordability.ts:97-146` |
| E2 | `web/public/llms.txt:47-56` | Currency written as "**pound-sterling** 1 million", "pound-sterling 37,700", 11 lines in the key-facts block | Visible pages and `llms-full.txt/route.ts` use the pound sign. Same figures, degraded machine rendering for AI retrievers | CORRECTION NEEDED (cosmetic) | minor | `grep -c "pound-sterling" web/public/llms.txt` = 1 file, 11 lines |
| E3 | `niche.config.json:40` `contact.phone` = "+44 20 0000 0000" | A placeholder phone number in the published config | **Not published**: `buildOrganization` emits `telephone` only when a `phone` option is passed and `web/src/lib/schema.ts` never passes one; no `tel:` link, header, footer or contact page renders it; `llms-full.txt:86` correctly says there are no phone lines | **verified** (config-only, not a defect) | minor | `grep -rn "contact.phone\|tel:\|0000 0000" web/src \| grep -v admin` = 1 hit, `config/site.ts:25`, unused downstream |
| E4 | `web/content/blog/*.md` | No `schema:` frontmatter block on any of the 22 posts | Post JSON-LD is built in `lib/schema.ts` from ordinary frontmatter, so there is no second machine copy of any figure to diverge | **verified** | - | `grep -l "^schema:" web/content/blog/*.md` = 0 files |
| E5 | `niche.config.json:12` `entity.next` | "We reply within 24 hours and one of our accountants comes back to you directly." | Config-only, no renderer (`schema.ts:24` reads `entity.firm` only). Already recorded as a non-defect in `PHASE0_RECHECK_2026-09-29.md` finding 1; not re-reported | **verified** | - | `grep -rn "entity.next\|cta\.next" web/src` = 0 hits |

---

## RULE F. Compliance copy describing code that does not run, or denying code that does

| # | where | claim (short) | ground truth + source | verdict | tier | deriving command |
|---|---|---|---|---|---|---|
| F1 | `web/src/app/cookie-policy/page.tsx:71` (and `:46`) | "We do **not** use cookies for **advertising, remarketing**, or selling your data to third parties" and "We do not currently use any strictly necessary cookies" | `web/src/app/layout.tsx:36` loads Google AdSense (`ca-pub-3756285576371279`) and `public/ads.txt` is published. GA4 is **not** live (`niche.config.json` `google_analytics_id` is empty and `ConsentedScripts` renders nothing when empty), so AdSense is the only live contradiction. Byte-identical sentence and identical AdSense client id on Property and hospitality | OWNER RULING 09-29: LEFT AS IS (estate-central, identical to hospitality F2) | **serious** | `grep -n adsenseClientId web/src/app/layout.tsx ../Property/web/src/app/layout.tsx`; `grep -n "advertising, remarketing" web/src/app/cookie-policy/page.tsx ../Property/web/src/app/cookie-policy/page.tsx` |
| F2 | `web/src/app/privacy-policy/page.tsx:175` | "We keep enquiry data for **24 months** from the date of your enquiry, **after which it is deleted**" | The purge exists (`api/cron/lead-retention`, scheduled daily 03:30 in `vercel.json`) but is **dormant by design**: `dryRun` is true unless `LEAD_RETENTION_PURGE_ENABLED` is set, so nothing has been deleted. Same shape as hospitality's ruled row | OWNER RULING 09-29: LEFT AS IS (arming is an ops action, not a port action) | **serious** | `sed -n '1,20p' web/src/app/api/cron/lead-retention/route.ts`; `cat web/vercel.json` |
| F3 | `web/content/blog/drug-tariff-changes-explained.md:152` | "As at: **July 2026**. This slot is **refreshed monthly**." | No refresh mechanism exists: `pharmacies/pipeline/` holds only `submit_indexnow.py`, `vercel.json` has four crons and none touches content, and no research or content script references this post. The slot has been stale about three months while promising a monthly refresh | **CORRECTION NEEDED** (drop the refresh promise, or restate as "check the current Drug Tariff") | **serious** | `grep -rn "refreshed monthly" web/content web/src` = 1 hit; `ls pharmacies/pipeline`; `cat web/vercel.json` |
| F4 | `web/src/data/pharmacy-openings-closures-index.json:4`, rendered via `research/pharmacy-openings-closures-index/page.tsx:29` | dataset "**updated monthly** on NHSBSA publication" | Last pull 2026-07-23, no automation. Softer than F3 because the page renders an honest "Last updated: 2026-07-23" beside it at `:93` and `:370`, and the sentence describes the source's cadence | CORRECTION NEEDED (minor) | minor | `grep -n "updated monthly" web/src/data/pharmacy-openings-closures-index.json`; `grep -n lastUpdated web/src/app/research/*/page.tsx` |
| F5 | privacy-policy data-sharing disclosure, `LeadForm.tsx:414`, `niche.config.json:17-21` | "regulated firms in our specialist partner network" | Mechanism exists and is estate-central: `lib/leads/handoff.ts`, `contactability.ts`, and the string is byte-identical to Property (`config/site.ts`, `lib/leads/offer-send.ts`). Already ruled exempt in the 09-28 pass | **verified** (do not grade as marketing caveat) | - | `grep -rl "specialist partner network" ../Property/web/src` = 4 files |

---

## RULE G. Calculator outputs, re-derived from house positions (tests included)

All three tools re-derived by hand against `house_positions.md` and `rates_ledger.json`. Every
rate constant in all three files matches the ledger. The defects below are **method and scope**,
not stale rates, and two of them are **pinned by a passing test**.

| # | where | claim (short) | ground truth + source | verdict | tier | deriving command |
|---|---|---|---|---|---|---|
| G1 | `locum-take-home-comparator.ts:38,97-101,264,285` and `locum-take-home-comparator.test.ts:38-42,46-49` | Sole-trader row "**Class 2 NIC (£3.45/week)**" deducting £179 a year, repeated in the result note ("Sole trader uses Class 2 NIC at £3.45/week") | **Class 2 NIC is not payable.** Since 6 April 2024 a self-employed person with profits above the lower profits limit is treated as having paid Class 2 at nil cost; £3.45/week is the *voluntary* rate for those **below** the small profits threshold. The in-code comment has the test inverted ("if profit above Small Profits Threshold £6,845") and then charges it unconditionally at locum day rates. No house position and no ledger key supports a Class 2 charge. Same error class as the 2026-07-15 incident on this site, still live, and the test **pins** both the £179 and the net take-home containing it | **CORRECTION NEEDED** (zero the charge, drop the row and the note sentence, update both tests) | **serious** | `grep -n "CLASS2_WEEKLY\|Class 2" web/src/lib/calculators/tools/locum-take-home-comparator.ts`; the suite passes today, which proves only that the figure has not changed |
| G2 | `pharmacy-purchase-affordability.ts:4-12,116,147` and `pharmacy-purchase-affordability.test.ts:34-47` | "Asset deal: SDLT non-residential (est.)" computed on the **whole purchase price** (£400k default gives £9,500) | The tool's own FAQ at `:160` says SDLT applies to "the **property element** at non-residential rates" and that "the goodwill and non-property assets are **outside SDLT**"; HP 13 says goodwill dominates pharmacy pricing. The headline SDLT row therefore contradicts the page it sits on and overstates SDLT on every leasehold deal, where it should be nil. `test:34-47` **pins** £9,500 | **CORRECTION NEEDED** (add a property-value input, or label the row as SDLT on the property element and default it to zero) | **serious** | `sed -n '4,12p;110,120p;155,165p' web/src/lib/calculators/tools/pharmacy-purchase-affordability.ts`; bands 0/2/5 at £150k/£250k verified against `rates_ledger.json` `sdlt_nonresidential_top_rate` and gov.uk |
| G3 | `pharmacy-fp34-cash-flow-estimator.ts:66-80,99` | Headline "**Working-capital gap to bridge**" = one month's claim value minus the advance | The figure **ignores the payment-lag input entirely**: `lag` only changes a row label. The intro and HP 7 both say settlement arrives roughly two months later, so the real exposure is roughly `lag` times the shortfall. A user entering a 4-month lag gets the same gap as one entering 1 | **CORRECTION NEEDED** (multiply the gap by `lag`, or rename the row "monthly shortfall while you wait") | **serious** | `grep -n "workingCapitalGap\|lag" web/src/lib/calculators/tools/pharmacy-fp34-cash-flow-estimator.ts` |
| G4 | `pharmacy-fp34-cash-flow-estimator.ts:75-78` | Row "Full settlement (arrives month +2)" shows the **full** claim value while the advance row above shows the advance | Cash actually received at settlement is net of the advance (`settlementNet`, used correctly in the timeline rows below). The two rows read as if the claim is paid one and a half times | CORRECTION NEEDED | minor | same file, compare `:70` `settlementNet` with `:75-78` |
| G5 | `pharmacy-purchase-affordability.ts:85` | "Commercial pharmacy finance rates in 2026 have varied between **approximately 5% and 8%**" | A market-rate claim with no source in house positions, no ledger key and no citation. HP 16's rule against asserting a figure without a cited source captured at build time governs | **UNSOURCED, REMOVE** (or cite) | **serious** | `grep -n "5% and 8%" web/src/lib/calculators/tools/pharmacy-purchase-affordability.ts` = 1 hit, 1 file |
| G6 | `pharmacy-purchase-affordability.ts:151,155` | "**Most lenders want to see at least 1.25x**" / "Most commercial lenders require at least 1.25x debt service cover" | Lender-behaviour claim, unsourced, twice in one file | **UNSOURCED, REMOVE** (or cite) | minor | `grep -n "1.25x" web/src/lib/calculators/tools/pharmacy-purchase-affordability.ts` = 2 hits, 1 file |
| G7 | `pharmacy-purchase-affordability.ts:108-114` | Corporation tax computed on projected profit **before** deducting loan interest, then compared with the full annual repayment | Interest is deductible, so CT is overstated and the cover ratio understated. The note discloses the rates and the single-company assumption but not this simplification | CORRECTION NEEDED (disclose, or deduct interest) | minor | same file `:108-114` |
| G8 | all three tools | Income tax 20/40/45 with PA £12,570, PA taper from £100,000, basic limit £37,700, NI PT £12,570 / UEL £50,270 / employee 8% and 2%, employer 15% above £5,000, apprenticeship levy 0.5%, CT marginal fraction 3/200, dividend stacking with the £500 allowance, SDLT bands, 0.5% share duty, annuity repayment formula | Re-derived: marginal CT returns exactly 19% at £50,000 and 25% at £250,000; the £150k PA-taper test at `locum...test.ts:84-98` is right (37,700 at 20% + 87,440 at 40% + 24,860 at 45% = £53,703); every FA 2026 rate matches the ledger; the single-director Employment Allowance bar (HP 26) is correctly applied; all three tools correctly refuse to publish a valuation multiple (HP 16) | **verified** | - | `tsc` and `vitest` were **not** run this pass (read-only package); derivation by hand |
| G9 | `locum-take-home-comparator.ts:13,36-38` | `PERSONAL_ALLOWANCE 12_570`, `BASIC_RATE_LIMIT 37_700`, `ADDITIONAL_RATE_GROSS_THRESHOLD 125_140`, `NI_UPPER_EARNINGS_LIMIT 50_270`, `CLASS2_WEEKLY 3.45` | Correct as published UK figures (bar G1) but **absent from `rates_ledger.json`**, which holds no income tax, personal allowance, NI threshold or Class 2/4 keys. The locum lane is a content audience (HP E) whose arithmetic has no locked source on this site | CORRECTION NEEDED (add the keys to `rates_ledger.json`, or cite in-file) | minor | `python -c "import json;print([k['key'] for k in json.load(open('../docs/pharmacies/rates_ledger.json'))])"` |

---

## RULE H. Classes the site emits that nothing defines

| # | where | claim (short) | ground truth + source | verdict | tier | deriving command |
|---|---|---|---|---|---|---|
| H1 | `web/src/app/blog/[category]/[slug]/page.tsx:124` | `class="prose prose-neutral"` on every blog article body | `.prose` **is** defined: `globals.css:6` imports `packages/site-styles/prose-standard.css`, which carries 31 `.prose` selectors, plus this site's own `.prose table` overflow guard at `globals.css:36`. `@tailwindcss/typography` is still installed nowhere, so **`prose-neutral` has no rule** anywhere in the monorepo: a dead decorative class with no visual effect | **verified** for `.prose`; `prose-neutral` dead but harmless (delete when the file is next touched) | minor | `grep -oE '\.prose[A-Za-z0-9_-]*' packages/site-styles/prose-standard.css \| sort \| uniq -c` gives 31 `.prose`, 1 `.prose-blog`, 0 `.prose-neutral` (selector counted, not substring) |
| H2 | `web/src/app/page.tsx` (10 occurrences) and `calculators/[slug]/page.tsx` | `class="section-label"` | Defined at `packages/site-styles/prose-standard.css:255-264`, and it paints its own ground and ink (brand background, white text), so no contrast trap and no utility-order dependency | **verified** | - | `grep -rl section-label web/src` = 2 files; `sed -n '253,266p' packages/site-styles/prose-standard.css` |
| H3 | site-wide | No other bare class emitted with no rule | - | **verified** | - | `grep -rno 'className="[^"]*"' web/src --include=*.tsx \| grep -oE '\b(prose[a-z-]*\|section-label\|eyebrow\|not-prose)\b' \| sort \| uniq -c` |

---

## Serious tier, for the owner, in plain language

Nine items. Four need a decision from you; five are corrections we should make before any design
work starts.

1. **The locum take-home calculator charges a National Insurance contribution that does not
   exist.** It deducts £179 a year of "Class 2 NIC" from every self-employed locum. That charge
   was abolished for profitable traders in April 2024. A unit test is holding the wrong figure in
   place, so the suite passing told us nothing. This is the same error logged against this site in
   July; it was never fixed.
2. **The pharmacy purchase calculator charges stamp duty on the whole purchase price,** goodwill
   included. Its own question-and-answer section, further down the same page, correctly says
   goodwill is outside stamp duty. Anyone buying a leasehold pharmacy is shown a tax bill of
   several thousand pounds they will not pay. A test pins this one too.
3. **The FP34 cash-flow calculator ignores the payment delay you type in.** The headline working
   capital gap is one month's shortfall whether the NHS pays you in one month or in four. On the
   usual two-month cycle it understates the real cash hole by about half, which is the one number
   a first-time buyer came for.
4. **The calculator publishes a commercial lending rate range as fact** (roughly 5% to 8% in
   2026) with no source. We have a standing rule against quoting market figures we cannot cite.
5. **One blog post promises a monthly refresh that nothing performs.** It says "refreshed monthly"
   and is dated July. Nothing in the repository refreshes it.
6. **We tell AI search engines our calculator does something it does not.** We say it works out
   what you can afford from earnings and working capital. It does the reverse: you give it the
   price and it tells you the repayment.
7. **We promise a reply in 24 hours on eight pages and one working day on four others,** including
   both files we publish for AI search engines. Pick one.
8. **The homepage prints three customer quotes under "What clients say",** then says underneath
   that they are composites drawn from our client base and that the situations are real. Both
   cannot be true. This is the identical block you reviewed on two other sites on 29 September and
   ruled should stay; raised only because that ruling was per site.
9. **Two pieces of legal small print do not match the code.** The cookie policy says we never use
   advertising cookies while the site loads Google AdSense, and the privacy policy says enquiry
   data is deleted after 24 months while the deletion job is deliberately switched off. Both are
   estate-wide, identical on Property, and both were ruled leave as is on 29 September.

Not serious but on the list: a fixed-fee promise only this site makes, three claims about who we
do and do not act for, a "Most popular" badge, a dead `prose-neutral` class, a currency rendering
quirk in the AI file, two pharmacy counts in one post drawn from two datasets without saying so,
and five income-tax constants used by the locum calculator with no entry in the rates ledger.

---

## False premises in this brief

1. **"any `schema:` block" in the 22 posts.** There are none. No pharmacies post carries a
   `schema:` frontmatter key; post JSON-LD is assembled in `web/src/lib/schema.ts` from ordinary
   frontmatter fields, so there is no second machine copy of a figure to diverge.
2. **"`.prose` is imported from `packages/site-styles/prose-standard.css`, check that."** Checked
   and it holds, so the estate-wide dead-`.prose` defect does **not** apply here: `globals.css:6`
   imports it and the file carries 31 `.prose` selectors plus `.section-label`. The only dead class
   left is `prose-neutral`, which has no rule anywhere and does nothing.
3. **"a prior locum Class 2 NIC factual error (2026-07-15)."** True, and the implication that it
   is history is wrong: the error is still in the shipped code and is now additionally pinned by a
   passing unit test (G1).
4. **"turnaround promises and any published fee for our own services."** There is no published
   fee: no price, no rate card, no "from £X" anywhere. The only fee-shaped statements are the
   "fixed-fee basis" line (C4) and the JSON-LD `priceRange: "££"` (C7).
