# hospitality: phase 0A claims and ground-truth ledger

Produced 2026-09-29. Ground truth: `docs/hospitality/house_positions.md` (28 positions, A to F),
`docs/hospitality/rates_ledger.json` (30 keys). Shape follows
`docs/startups-tech/_port/P0A_CLAIMS_LEDGER.md` (same columns, verdict vocabulary, severity tiers
and summary block).

Scope swept by rule, not by list: `hospitality/web/src/**` (app, components, config, data, lib,
tests, types), `hospitality/web/content/blog/*.md` (23 posts, frontmatter included: `metaTitle`,
`metaDescription`, `summary`, `keyTakeaways`, `faqs`, `schema`), `hospitality/niche.config.json`
(site root), `hospitality/web/public/llms.txt`, `hospitality/web/src/app/llms-full.txt/route.ts`,
the three calculators in `src/lib/calculators/tools/` and all three of their test files,
`src/app/terms/`, `privacy-policy/`, `cookie-policy/`, and the three research pages and the three
research JSON files they render.

No server was started. No `next build` or `next dev` was run. No git command was run. No file
outside this ledger was written. Verification is source inspection plus figure-by-figure
reconciliation against the data files, so "rendered presence" rows below are proved by reading the
component that renders the string, not by curl.

Estate ruling 2026-09-29 (owner gate on startups-tech) applied as precedent: composite/illustrative
testimonial standfirsts, the data-retention sentence versus the dormant purge job, the cookie policy
versus consented GA4/AdSense, 24-hour reply promises, and the lead rubric are all listed but carry
the verdict **OWNER RULING 09-29: LEFT AS IS**. Owner ruling 2026-09-28 applied: existing prose is
not rewritten for style or positioning; only a claim that is false, regulated or financial is
corrected, and minimally.

---

## RULE A. Superlative or "leading" claim about the firm

Patterns searched over `web/src web/content web/public niche.config.json`: `UK's`, `the UK's`,
`leading`, `best `, `only firm`, `award`, `accredited`, `approved by`, `HMRC.approved`,
`registered with`, `market.leading`, `number one`, `#1`.

**Zero rows.** Every hit was either CSS (`a{color:#1a56db}`), the word "best" inside ordinary prose
("the category that best describes the item", "the best and worst performing business type"),
"HMRC-approved" describing an *alcohol wholesaler* under AWRS, or "registered with Companies
House". `entity.firm` in `niche.config.json:3` opens "Hospitality Tax is a UK accountancy practice
for hospitality businesses", which is the corrected A1 shape startups-tech had to be moved to; this
site already ships it. Nothing to correct.

---

## RULE B. Invented client, testimonial, case study or client count

Patterns searched: `testimonial`, `case study`, `in our experience`, `we have helped`, `we helped`,
`we advised`, `we acted for`, `our client`, `one of our clients`, `client base`, `[0-9]+\+ clients`,
`clients trust`, `trusted by`, `hundreds of`, `dozens of`, `years of experience`, `our team of`,
`we have worked with`, `composite`. Two files hit: `src/app/page.tsx` and (as an unrelated VAT term)
`content/blog/vat-rates-soft-drinks-and-food.md:217` "single composite supply", excluded by
inspection. `src/config/lead-nurture.ts` produced no outcome claim (startups-tech's B4 has no
counterpart here).

| # | file:line | claim as published | rule breached | deriving command | verdict | severity |
|---|---|---|---|---|---|---|
| B1 | `web/src/app/page.tsx:216-234` (rendered at `page.tsx:716-746`, section `aria-labelledby="testimonials-heading"`, heading "What operators say", eyebrow "Real outcomes") | Three first-person quotes in `<blockquote>` with `<figcaption>` attributions: "Owner, independent restaurant group, three sites, Midlands"; "Director, fast-casual takeaway, South East England"; "Operations manager, pub and bar group, four sites, Yorkshire". | Testimonials presented typographically as real quotations from real clients while the section's own standfirst calls them composites. Either the quotes are real (then the standfirst is false) or they are written (then the quote marks, figcaptions and the "Real outcomes" eyebrow are). | `grep -n "const testimonials" web/src/app/page.tsx` gives 1 hit at :216; rendered by the `.map` at `page.tsx:729` inside the only `testimonials-heading` section, so per-page presence is 1 of 1 (homepage only) | **OWNER RULING 09-29: LEFT AS IS** | **serious** |
| B2 | `web/src/app/page.tsx:724-725` | "Composite accounts based on patterns across **our hospitality clients**. Names and specific figures anonymised. **The compliance situations described are real.**" | Client-base and client-behaviour assertion; unverifiable and unsourced. | `grep -rn "Composite accounts" web/src web/content` gives 1 file, 1 line | **OWNER RULING 09-29: LEFT AS IS** | **serious** |
| B3 | `web/src/app/page.tsx:219` | "...our employer NIC on tips dropped to zero. **The savings in the first year covered the accountancy fee several times over.**" | A financial outcome claim about our own fee and a client's return on it, inside a block the page itself labels composite. No source anywhere; the site publishes no fee, so the multiple is underivable. | `grep -n "covered the accountancy fee" web/src/app/page.tsx` gives 1 hit | **OWNER DECISION** | **serious** |
| B4 | `web/src/app/page.tsx:229-230` | "**Within a week of contacting the team** we had a written tips policy, a compliant allocation record and an updated payroll process." | A turnaround promise phrased as an observed client outcome, inside the composite block. Nothing on the site or in house_positions supports a one-week delivery window for tips-policy work. | `grep -n "Within a week" web/src/app/page.tsx` gives 1 hit | **OWNER DECISION** | minor |
| B5 | `web/src/app/page.tsx:653-655` | "Tronc independence, food VAT five-test analysis, AWRS due diligence, TOMS margin accounting, draught duty rates, BIM61405 licensing costs: a generalist encounters these infrequently. **We deal with them every week across our hospitality client base.**" | Client-base and practice-volume assertion ("every week"), published as fact outside the composite framing that covers B1/B2, and therefore not reached by the 09-29 ruling. Unsourced and unmeasurable from anything on file. | `grep -rn "hospitality client base" web/src web/content` gives 1 file, 1 line | **OWNER DECISION** | **serious** |
| B6 | `web/src/app/page.tsx:762` | Proof point: "**Hospitality specialists only**" / sub: "**We do not take general commercial clients**" | A claim about the composition of our client book, stated as fact. Nothing on file evidences a refusal policy. | `grep -n "general commercial clients" web/src/app/page.tsx` gives 1 hit | **OWNER DECISION** | minor |

**B3 exact correction (if the owner rules to fix rather than keep).** Delete the sentence "The
savings in the first year covered the accountancy fee several times over." The quote stands without
it and still carries its compliance point (tronc independence restored, employer NIC on tips at
zero). Nothing replaces it, so no house_positions line is needed.

---

## RULE C. Turnaround promise

Patterns searched: `within 24`, `within 48`, `24.hour`, `48.hour`, `same.day`, `same working day`,
`turnaround`, `within (one|1|two|a) (working day|business day|hour|day)`, `guarantee`, `no win`,
`no-win`, `money.?back`. Non-page hits excluded by inspection: `/admin` dashboards, cron comments
(`lead-reconcile/route.ts:6`, `booking-viewed/route.ts:6`), nurture health thresholds
(`nurture-health.ts:104,141`), send-window internals, the privacy policy's 48-hour re-offer window
(an internal process disclosure, not a promise to the visitor), and the ~20 blog uses of
"turnaround" meaning a business rescue and "same day" meaning a trading day.

| # | file:line | claim as published | rule breached | deriving command | verdict | severity |
|---|---|---|---|---|---|---|
| C1 | `hospitality/niche.config.json:12` (`entity.next`) | "**We reply within 24 hours** and one of our accountants comes back to you directly." | Turnaround promise (locked content rule). Estate-central: Property publishes "24-hour response" on its contact and calculator pages. | `grep -n "within 24 hours" hospitality/niche.config.json` gives lines 12, 131 (`cta.sticky_secondary`), 136 (`blog.cta_body`) | **OWNER RULING 09-29: LEFT AS IS** | minor |
| C2 | 7 site files | "Tell us about your hospitality business and **we will reply within 24 hours**" / "We respond within 24 hours" / "Thanks. We'll be in touch within 24 hours." | Turnaround promise, rendered on about, contact, `/for`, `/for/[slug]`, `/services`, `/services/[slug]`, every blog post and every lead form. | `grep -rl "within 24 hours" web/src \| grep -v admin \| grep -v "api/"` gives `app/about/page.tsx:50`, `app/blog/[category]/[slug]/page.tsx:154`, `app/contact/page.tsx:7,16`, `app/for/[slug]/page.tsx:163`, `app/services/page.tsx:83`, `app/services/[slug]/page.tsx:160`, `components/forms/LeadForm.tsx:417,444` | **OWNER RULING 09-29: LEFT AS IS** | minor |
| C3 | `web/public/llms.txt:68`, `web/src/app/llms-full.txt/route.ts:11,98` | "**Free, no-obligation reply within 24 hours** for UK hospitality businesses." | The same promise published to AI retrievers as a machine-readable fact about the firm. | `grep -n "within 24 hours" web/public/llms.txt web/src/app/llms-full.txt/route.ts` gives 3 hits | **OWNER RULING 09-29: LEFT AS IS** | minor |
| C4 | `web/src/app/page.tsx:764` | Proof point: "**24-hour response**" / sub: "**Usually the same working day**" | Turnaround promise plus an implied observed-behaviour claim ("usually"). Byte-identical to the Property string. | `grep -n "Usually the same working day" web/src/app/page.tsx` gives 1 hit | **OWNER RULING 09-29: LEFT AS IS** | minor |

---

## RULE D. The same quantity carrying different values in different places

| # | file:line | claim as published | rule breached | deriving command | verdict | severity |
|---|---|---|---|---|---|---|
| D1 | `web/src/app/about/page.tsx:35`, `web/src/components/calculators/CalcResultCta.tsx:12`, `web/src/components/calculators/MiniCapture.tsx:20` vs the 11 locations in C1-C3 vs `web/src/app/page.tsx:764` | Three different values for one quantity (our response time): "We reply **within one working day**" (3 files) / "we will reply **within 24 hours**" (11 locations) / "**24-hour response** ... usually the same working day" (homepage). | Same quantity, different published values. One working day and 24 hours are not the same interval for an enquiry at 17:00 on a Friday. | `grep -rl "within one working day" web/src` gives 3 files; `grep -rl "within 24 hours" web/src web/public ../niche.config.json \| grep -v admin \| grep -v "api/"` gives 11 locations across 10 files | **OWNER DECISION** (the wording to standardise on is the owner's, because the underlying promise is itself under the 09-29 ruling; house_positions is silent on service promises, so there is no line to derive a correction from) | minor |

---

## RULE E. Machine-readable output disagreeing with the page, or with itself

| # | file:line | claim as published | rule breached | deriving command | verdict | severity |
|---|---|---|---|---|---|---|
| E1 | `web/src/app/blog/[category]/[slug]/page.tsx:91-103` | Every blog post emits a `FAQPage` node built from its `faqs` frontmatter. The template **never renders those FAQs**: the page body is `keyTakeaways` (line 129), the split article HTML (lines 138-147) and the lead form (lines 151-161). Nothing reads `post.faqs` except the JSON-LD block. | Q and A published to search engines that a reader cannot see on the page. 23 of 23 posts carry `faqs`; **210 of 214 question strings do not appear anywhere in the post body**. | `grep -n "faqs" "web/src/app/blog/[category]/[slug]/page.tsx"` gives exactly two hits, both inside the `<script type="application/ld+json">` block. Per-post reconciliation of every `- question:` string against the body HTML: 23 posts, 214 questions, 210 absent from the body (only `is-there-vat-on-dog-food.md` 1 of 14 and `vat-on-takeaway-food.md` 2 of 14 appear, incidentally) | **CORRECT IN PLACE** | **serious** |
| E2 | `web/src/app/llms-full.txt/route.ts:91` | "Auto-generated per page: ... **BlogPosting on individual posts**" | Machine-readable output describing schema the site does not emit. The blog template calls `buildArticleJsonLd` (`page.tsx:83`), and `web/src/lib/schema.ts:119` sets `"@type": "Article"`. No file in the site emits `BlogPosting`. | `grep -rn "BlogPosting" web/src` gives 1 hit, the llms-full sentence itself; `grep -n '"@type": "Article"' web/src/lib/schema.ts` gives :119 | **CORRECT IN PLACE** | minor |
| E3 | `web/src/app/llms-full.txt/route.ts:91` | "Auto-generated per page: **Organization on the homepage**" | Understates and mis-locates what ships: the Organization node is emitted in `web/src/app/layout.tsx:25,78-81`, i.e. in `<head>` on **every** page, not on the homepage. | `grep -n "organizationJsonLd" web/src/app/layout.tsx` gives :25 and :80, inside `RootLayout` | **CORRECT IN PLACE** | minor |
| E4 | `web/src/lib/schema.ts:37` | `priceRange: "££"` on the Organization node | A fee band for our own services, published machine-readably on every page, with no source in house_positions or the rates ledger. The site publishes no fee anywhere else (see V8). | `grep -n priceRange web/src/lib/schema.ts` gives 1 hit, inside `siteSchemaOpts()`, which `buildOrganizationJsonLd()` (line 58) feeds and `layout.tsx:25` emits site-wide | **UNSOURCED, REMOVE** | minor |
| E5 | `web/src/app/page.tsx:235,236,237` and `web/src/data/hospitality-services.ts:224` | The homepage's "Free calculators" list and one service page publish four links to calculator pages that **do not exist**: `/calculators/tronc-tips-paye-nic`, `/calculators/food-drink-vat-checker` (twice), `/calculators/staff-cost-rota-margin`. | Published navigation disagreeing with the site: the registered slugs are `tronc-tips-paye-nic-calculator` (`tools/tronc.ts:71`), `food-drink-vat-rate-checker` (`tools/vat-checker.ts:100`) and `staff-cost-rota-margin-calculator` (`tools/staff-cost.ts:67`). `/calculators/[slug]` resolves through `getGenericTool`, so an unregistered slug is a 404. | `grep -rhoE "/calculators/[a-z0-9-]+" web/src web/content web/public \| sort \| uniq -c` gives 17 `food-drink-vat-rate-checker`, 7 `staff-cost-rota-margin-calculator`, 5 `tronc-tips-paye-nic-calculator` (correct) against 2 `food-drink-vat-checker`, 1 `tronc-tips-paye-nic`, 1 `staff-cost-rota-margin` (dead); `grep -n "slug:" web/src/lib/calculators/tools/*.ts` gives the three registered slugs | **CORRECT IN PLACE** | minor |

**E1 exact correction.** Render the FAQs. Add an `<section>` after the article block in
`web/src/app/blog/[category]/[slug]/page.tsx` that maps `post.faqs` to visible `<h3>`/`<p>` pairs
(or `<details>/<summary>`, the pattern the service pages already use), so the FAQPage node and the
page agree. Removing the JSON-LD instead also closes the row but throws away the site's only blog
rich-result surface; the render is the smaller loss. No house_positions line applies (no figure).

**E2 exact correction.** Change "BlogPosting on individual posts" to "Article on individual posts"
in the "Schema and discovery" block of the route header.

**E3 exact correction.** Change "Organization on the homepage" to "Organization on every page".

**E4 exact correction.** Delete the `priceRange: "££"` line from `siteSchemaOpts()`. Nothing else
reads it.

**E5 exact correction.** Rewrite the four hrefs to the registered slugs. `page.tsx:235` to
`/calculators/tronc-tips-paye-nic-calculator`, `page.tsx:236` and `hospitality-services.ts:224` to
`/calculators/food-drink-vat-rate-checker`, `page.tsx:237` to
`/calculators/staff-cost-rota-margin-calculator`.

---

## RULE F. Compliance sentence describing code that does not run, or contradicted by the page

| # | file:line | claim as published | rule breached | deriving command | verdict | severity |
|---|---|---|---|---|---|---|
| F1 | `web/src/app/privacy-policy/page.tsx:181` | "We keep enquiry data for **24 months** from the date of your enquiry, **after which it is deleted**." | Compliance sentence describing code that does not run. The purge ships dormant: `web/src/lib/leads/retention.ts:15-16` says "SHIPS DORMANT: the cron route is DRY-RUN by default. Nothing is mutated until LEAD_RETENTION_PURGE_ENABLED=1 is set in the environment", and `web/src/app/api/cron/lead-retention/route.ts:51-53` gates `dryRun` on exactly that variable. The cron IS scheduled (`web/vercel.json`, `30 3 * * *`), so it runs nightly and deletes nothing unless the variable is armed in production. Production environment not readable from here, so the claim is unproven rather than proven false. | `grep -n "SHIPS DORMANT" web/src/lib/leads/retention.ts`; `grep -n "LEAD_RETENTION_PURGE_ENABLED" web/src/app/api/cron/lead-retention/route.ts`; `grep -n "enquiry_retention_months" ../niche.config.json` gives 24 | **OWNER RULING 09-29: LEFT AS IS** | **serious** |
| F2 | `web/src/app/cookie-policy/page.tsx:66` (and `:39-41`) | "We do **not** use cookies for **advertising, remarketing**, or selling your data to third parties." and "We do not currently use any strictly necessary cookies." | Contradicted by the code that ships. `web/src/app/layout.tsx:101` passes `adsenseClientId="ca-pub-3756285576371279"` to `ConsentedScripts`, which loads AdSense for every visitor who has not opted out; the same id is server-rendered as the `google-adsense-account` meta at `layout.tsx:54`, and `web/public/ads.txt` authorises Google as a seller. AdSense is an advertising tag that sets third-party cookies. | `grep -n "adsenseClientId" web/src/app/layout.tsx` gives :101; `grep -n "google-adsense-account" web/src/app/layout.tsx` gives :54; `cat web/public/ads.txt` | **OWNER RULING 09-29: LEFT AS IS** (and **do not** fix by adding a disclosure: locked rule `clarity_removed_pecr_decision`) | **serious** |
| F3 | `web/src/app/privacy-policy/page.tsx:126-127` | "the grade we give it under our **published grading rubric**" | Calls the rubric published; it is not published anywhere on this site. | `grep -rln "rubric" web/src web/content` gives 1 file, the privacy policy itself | **OWNER RULING 09-29: LEFT AS IS** | minor |

Note on F2 and the estate ruling's wording: the ruling names "the cookie policy versus consented
GA4/AdSense". On this site GA4 is **not** loaded (`niche.config.json:97` `google_analytics_id` is
`""`, and `ConsentedScripts` renders nothing when empty), so the only live contradiction is AdSense.
This site also carries none of startups-tech's cookie-policy self-contradictions: there is no
"Google Analytics opt-out" block and no duplicated "First-party analytics" section
(`grep -c "First-party analytics" web/src/app/cookie-policy/page.tsx` gives 1).

---

## RULE G. Published figure or framing with no source in house_positions or the rates ledger

| # | file:line | claim as published | rule breached | deriving command | verdict | severity |
|---|---|---|---|---|---|---|
| G1 | `web/public/llms.txt:40` and `web/content/blog/casual-staff-employment-status.md:108` | "Tips Act 2023 ... **in force from 1 October 2024**" and "Since the Employment (Allocation of Tips) Act 2023 **came into force on 1 October 2024**" | False as written, and against an explicit house_positions writers' rule. house_positions "Consistency rules for writers", position 8: the MAIN DUTIES (ss.1-8, 10-12) commenced 1 October 2024 by SI 2024/829 reg 3, but **s.9 commenced 31 July 2023**; the rule is: say "the main duties have applied since 1 October 2024", not "the Act came into force on 1 October 2024". The site's own `content/blog/tips-act-2023-compliance.md:49` and `content/blog/tronc-scheme.md:175` state the correct split, so this is also a self-contradiction. | `grep -rn "came into force on 1 October 2024\|in force from 1 October 2024" web/src web/content web/public` gives exactly these 2 hits; `grep -rn "1 October 2024" web/src web/content web/public \| wc -l` gives 19 total, the other 17 using the softer "in force since", which is not the literal defect | **CORRECT IN PLACE** | **serious** |
| G2 | `web/src/lib/calculators/tools/vat-checker.ts:64` | "Hot food and hot drinks sold for takeaway or delivery are standard-rated at 20%. **HMRC defines hot as food heated above ambient temperature for consumption hot.**" | False statement of a VAT test, in the tool that gives a visitor a VAT rate. house_positions position 1 locks the **five tests** (intentionally heated for consumption, heated to order, kept hot after cooking, heat-retentive packaging, advertised or marketed as hot), and the writers' rules say the hot/cold distinction must never be reduced. "Above ambient temperature" is the pre-2012 test. The site's own `content/blog/vat-on-takeaway-food.md` and `data/hospitality-services.ts:224` both use the five-test framing, so the checker contradicts the rest of the site. | `grep -n "above ambient temperature" web/src/lib/calculators/tools/vat-checker.ts` gives 1 hit; `grep -rln "five" web/content/blog/vat-on-takeaway-food.md web/src/data/hospitality-services.ts` confirms the five-test framing elsewhere | **CORRECT IN PLACE** | **serious** |
| G3 | `web/src/lib/calculators/tools/staff-cost.ts:71,76,145,160,168,179,205` | "the **30% hospitality benchmark**", "Above **35%** is a warning level for most venue types", "fine dining, hotels often run at **28-32%**", "high-service restaurants closer to **34-36%**", "a bar with automated ordering can run at **20%**" | Financial benchmark figures with no source in house_positions or the rates ledger, and no external citation in the file. Mitigating: lines 179 and 205 label it "a widely used rule of thumb" and "the industry benchmark", and the result line at :145 compares against it rather than asserting a target; the site's blog is disciplined about the same class of figure (`content/blog/gross-profit-menu-pricing.md:49` "illustrative planning tools, not official figures"). | `grep -n "30%" web/src/lib/calculators/tools/staff-cost.ts` gives 7 hits in 1 file; `grep -rn "30% benchmark" web/content` gives 0, so this is calculator-local | **OWNER DECISION** (either cite a source or carry the blog's own hedge into the result line) | minor |
| G4 | `web/src/lib/calculators/tools/staff-cost.ts:10,11,12` | `PENSION_RATE = 0.03`, `PENSION_LOWER_LIMIT = 6240`, `PENSION_UPPER_LIMIT = 50270`, surfaced to the visitor as "Employer pension (3%)" (line 152) and "auto-enrolment pension (3%)" (line 74) | Three published financial figures with no entry in the rates ledger and no position in house_positions. They are externally correct (auto-enrolment employer minimum 3% of qualifying earnings, 2026/27 band £6,240 to £50,270), so this is a ledger gap rather than a false figure. | `grep -n "PENSION_\|6240\|50270" web/src/lib/calculators/tools/staff-cost.ts`; `grep -c pension docs/hospitality/rates_ledger.json` gives 0 | **OWNER DECISION** (add three keys to `rates_ledger.json`; no copy change) | minor |
| G5 | `web/src/app/research/hospitality-openings-closures-index/page.tsx:100,123,134,259` (data at `web/src/data/uk-hospitality-openings-closures-index.json`) | The same page publishes "Updated **2026-07-12**" and "Pull date: **2026-07-12**" (from `meta.pull_date`) alongside "As at **2026-07-15**, the Companies House register shows 191,895 active companies..." (from `headline.restaurant_count_proxy.as_of`), while the pub proxy immediately above it says "As at 2026-07-12". | Same quantity (the register snapshot date) carrying two values on one page, one of them three days after the stated pull date. | `python -c "import json;d=json.load(open('web/src/data/uk-hospitality-openings-closures-index.json'));print(d['meta']['pull_date'], d['headline']['pub_count_proxy']['as_of'], d['headline']['restaurant_count_proxy']['as_of'])"` gives `2026-07-12 2026-07-12 2026-07-15` | **OWNER DECISION** (the data producer has to say which date the 191,895 pull actually happened on; it cannot be derived from the file) | minor |
| G6 | `web/content/blog/hospitality-hardest-sector-insolvency-survival.md:2,9` (`title` and `h1`) | "**Why Hospitality Is the Hardest UK Sector to Keep a Company Alive**" | The article's own body falsifies the headline on the survival measure: line 53 gives 38.1% five-year survival for the 2019 hospitality cohort against 38.4% all-industry, line 55 concludes "Hospitality is not an outlier on survival", and line 92 says "It does not show that hospitality companies are unusually likely to fail in their first few years". The defensible claim the body does support is the volume one ("among the highest-insolvency sectors"). | `grep -n "not an outlier on survival\|does not show that hospitality" web/content/blog/hospitality-hardest-sector-insolvency-survival.md`; the H1 renders at `app/blog/[category]/[slug]/page.tsx:118` from `post.h1` | **OWNER DECISION** (owner ruling 09-28 says prose is not rewritten for positioning; a headline the body contradicts is arguably a factual row, so it is put to the owner rather than changed) | minor |

---

## VERIFIED: positives checked, no defect found

| # | subject | what was checked and how | verdict |
|---|---|---|---|
| V1 | The firm's entity description against `niche.config.json` `entity` | Every surface agrees and matches the estate position (Ashfield Trading Ltd, 16358723, brands are trading names): `niche.config.json:3,16,23`, `web/src/config/site.ts:37-40` (`legalDisclosure`), rendered in the global footer (`SiteFooter.tsx:67`), `app/about/page.tsx:38`, `app/terms/page.tsx:39`, `app/llms-full.txt/route.ts:17`, and machine-readably at `lib/schema.ts:24,50-54` (`legalName`, `sameAs` to the Companies House record, `parentOrganization`). No surface describes the firm any other way. | **VERIFIED** |
| V2 | Claims to a qualification, a regulator, PI insurance or performing regulated work | Per-file presence on published surfaces: `chartered` 3 files (all the Aswatax referral disclosure, a real Chartered Tax Adviser firm, and all post-submit: `LeadForm.tsx:420` sits inside the success branch that opens at :417, `thank-you/page.tsx:75,86`), `ACCA` 0, `ICAEW` 1 (a JSDoc example in `src/types/blog.ts:40`; no post sets a reviewer field), `AAT` 0, `CIOT` 0, `professional indemnity` 0, `regulated by` 0, `qualified accountant` 0, `HMRC approved` 0 about us (every hit is an AWRS-approved *wholesaler*). Nothing contradicts `app/terms/page.tsx:46-54` ("does not constitute accounting, tax, financial, or legal advice ... No accountant-client relationship is created"). | **VERIFIED** |
| V3 | All three calculators against house_positions and the rates ledger | `staff-cost.ts`: NLW £12.71, employer NIC 15%, secondary threshold £5,000, £96/week, Employment Allowance £10,500, and the 18-20 (£10.85) and under-18/apprentice (£8.00) rates in the FAQ (HP11, HP12, HP13; ledger `nlw_rate_21_plus`, `employer_nic_rate`, `employer_nic_secondary_threshold_annual`/`_weekly`, `employment_allowance`). `tronc.ts`: employer NIC 15%, employee NIC 8%, basic rate 20%, tronc NIC-free both sides with PAYE still due, cited to NIM02922, and the file's own comment carries the independence condition (HP7, ledger `tronc_nic_exempt`). `vat-checker.ts`: 20 / 0 only, alcohol always standard-rated, eat-in always catering, confectionery, crisps, ice cream and soft drinks as excepted items, cold non-excepted takeaway zero-rated (HP1, HP2, HP3) - the single defect is G2's hot-food definition, not a rate. Every constant matches. | **VERIFIED** |
| V4 | The three calculator test files, for stale pinned values (the Medical incident) | `staff-cost.test.ts`, `tronc.test.ts` and `vat-checker.test.ts` were read for asserted golden figures. No test pins a superseded rate: nothing asserts 13.8%, £9,100, £11.44, £12.21 or an 8.75/33.75 dividend rate. `npx vitest run` was NOT executed (the brief forbids a build, and no test change was made). | **VERIFIED (by inspection, not by run)** |
| V5 | Stale 2025/26-and-earlier rates, site-wide | Per-file presence, zero hits for each: `8.75%` 0, `33.75%` 0, `£85,000` 0, `£88,000` 0, `45p` 0, `£12.21` 0, `£11.44` 0. `13.8%` and `£9,100` appear in exactly one file, `tools/staff-cost.ts:176,190`, and both are correctly labelled as superseded history ("raised the employer NIC rate from 13.8% to 15% and cut the secondary threshold from £9,100 to £5,000, both effective from April 2025"), matching HP12. The 18% WDA appears only as pre-April-2026 history against the current 14% (HP22). | **VERIFIED** |
| V6 | Every figure in `web/public/llms.txt` "Key facts" (15 bullets) | Checked line by line against house_positions and the rates ledger: NLW £12.71 / £10.85 / £8.00 (HP11); employer NIC 15% above £5,000, £96/week (HP12); EA £10,500 (HP13); VAT registration £90,000 (HP4); FRS 12.5 / 6.5 / 10.5 with the 16.5% limited-cost override (HP5); draught £19.45, still cider £8.95, packaged beer £22.58 (HP16); CT 19 / 25 at £50,000 / £250,000 (HP23); AIA £1,000,000, WDA 14%, FYA 40% with the FA 2026 s.28/s.29 citations (HP22); RHL ended for new claims with multipliers 38.2p / 43p against national 43.2p / 48p (HP19); SBRR 100% to £12,000 tapering to £15,000 (HP20); MTD ITSA £50,000 from 6 April 2026 (HP24); tronc NIC treatment (HP7); tips cannot count toward NMW/NLW (HP10); food business registration 28 days (HP26). All 15 match. The only defect in the file is G1's Tips Act commencement framing. | **VERIFIED** |
| V7 | Research figures against their own data files (the construction-cis six-values incident) | `content/blog/hospitality-hardest-sector-insolvency-survival.md` vs `src/data/hospitality-insolvency-index.json`: TTM 3,523; 1,678 (2016) to 3,652 (2025) = +117.6%; peak 408 in August 2023; latest settled month 252 of which 209 CVL; 2019 cohort 5-year survival 38.1% against all-industry 38.4%; 1/2/3/4-year 94.2-94.6, 76.8-74.7, 60.7-55.9, 47.9-45.0. All identical to the file, and the derived figures recompute: 209/252 = 82.9% ("83%"), 1,678/12 = 139.8 ("around 140"). `content/blog/uk-food-hygiene-ratings-by-region-and-business-type.md` vs `src/data/hospitality-fsa-hygiene-index.json`: 375,015 establishments, 363 local authorities, 77.0% top rating, Scotland 91.6% pass, takeaways 61.0%, other catering 89.0%, mobile caterers 88.3%, best LA 97.5% (Bassetlaw), worst 42.7% (Blaenau Gwent). The two derived spreads recompute: 89.0 - 61.0 = 28.0 ("a 28-point spread by business type") and 97.5 - 42.7 = 54.8 ("over 50 points"). `content/blog/kitchen-fit-out-capital-allowances.md:144` recomputed by hand: £1,000,000 AIA + 40% FYA on £400,000 = £160,000 + 14% WDA on £240,000 = £33,600, total £1,193,600 on £1,400,000 = 85.3% ("85%"). Correct. | **VERIFIED** |
| V8 | A published fee for our own services, and contingent-fee offers | No amount for our services anywhere: `our fees` 0, `per month`/`pcm`/`a month` with a figure about us 0, `day rate` 0, `no win` 0, `no-win` 0, `money.?back` 0. `app/about/page.tsx:35` "We work on a fixed-fee basis" and `niche.config.json:9` "a fixed fee in writing before any work starts" carry no number and match the Property wording. The only `price` in machine-readable output is the free calculators' `Offer: { price: "0", priceCurrency: "GBP" }` (`lib/calculators/schema.ts:22`), which is accurate. The two fee-adjacent defects are E4 (`priceRange`) and B3 (the testimonial's fee-multiple claim). | **VERIFIED** |
| V9 | The cookie policy's first-party analytics disclosure, and the "Do not track me" link it promises | The tracker IS mounted: `app/layout.tsx:92-98` renders `AnalyticsProvider` from `@accounting-network/web-shared` with `storagePrefix="hfp"`, `posture="opt-out"` and `noTrackPrefixes={["/admin"]}`. The opt-out control the policy points at is real and global: `SiteFooter.tsx:5,78` mounts `ConsentToggle`, whose label is literally "Do not track me" (`components/analytics/ConsentToggle.tsx:23`), inside the footer that closes every page. Not a dead disclosure. | **VERIFIED** |
| V10 | The placeholder telephone number in config | `niche.config.json:118` carries `"phone": "+44 20 0000 0000"`. It is never rendered and never reaches schema: `grep -rn "siteConfig.contact\|contact.phone\|0000 0000" web/src` returns no rendering site, and `lib/schema.ts` builds no `telephone` property. A fake phone number is not published. Flagged here only so a later phase does not switch on a contact block that would publish it. | **VERIFIED** |
| V11 | Blog `schema:` frontmatter (JSON-LD strings) | All 23 posts set `schema: ""`, so the `post.schema` `<script>` at `app/blog/[category]/[slug]/page.tsx:111-113` never renders. There is no hand-written JSON-LD in content to grade. | **VERIFIED** |

---

## Counts

| verdict | rows |
|---|---|
| VERIFIED | 11 |
| CORRECT IN PLACE | 6 |
| UNSOURCED, REMOVE | 1 |
| OWNER DECISION | 9 |
| OWNER RULING 09-29: LEFT AS IS | 7 |
| **total rows** | **34** |

**Serious tier: 9** - B1, B2 (the homepage testimonial block: quotes typeset as real against a
standfirst that calls them composite, plus the client-base assertion; both under the 09-29 ruling),
B3 (a fee-return claim inside that block), B5 ("we deal with them every week across our hospitality
client base", outside the composite framing and so outside the ruling), E1 (every blog post
publishes FAQ rich-result markup for questions the reader cannot see: 210 of 214), F1 (retention
promise against a dormant purge), F2 (cookie policy against AdSense), G1 (a false statement of when
the Tips Act came into force, contradicted by two of this site's own posts), G2 (a false HMRC
hot-food test inside the VAT rate checker).

Of the 9 serious rows, **4 are already ruled and need no work**: B1, B2, F1, F2. **2 are
estate-wide in origin** (F1 and F2 are byte-identical mechanisms across the estate). The **3 that
are this site's own, unruled and fixable inside phase 0 are E1, G1 and G2** - and G1 and G2 are the
two that are outright false, regulated and rate-bearing, so they are the ones to fix first. B3, B5
and B6 need the owner because they are claims about the practice, not figures with a source to
correct against.

---

## False premises in this brief

1. **"calculator source under `hospitality/web/src/components/calculators/` and `app/calculators/`
   AND their tests"** - wrong location for the thing that carries claims. `src/components/calculators/`
   holds three UI shells (`CalculatorClient.tsx`, `CalcResultCta.tsx`, `MiniCapture.tsx`) and
   `app/calculators/` holds two route files; neither contains a rate, a figure or a test. The three
   calculators, every constant in them and all three test files live in
   `hospitality/web/src/lib/calculators/tools/`. A sweep of the two directories the brief names
   would have missed G2, G3, G4 and V3 entirely.
2. **`niche.config.json` is not under `web/`** - it is at `hospitality/niche.config.json`, the site
   root. Several of the brief's rule patterns imply grepping `hospitality/web`, which misses the
   `entity` block, the three 24-hour strings and the placeholder phone number.
3. **"`public/llms.txt`"** - correct, but incomplete as the machine-readable surface.
   `llms-full.txt` is a route, `hospitality/web/src/app/llms-full.txt/route.ts`, and its prose lives
   in a template string in the route header. That is where E2 and E3 are fixed; there is no
   `public/llms-full.txt`.
4. **"markdown frontmatter ... `schema:` JSON-LD strings"** - there are none to grade. All 23 posts
   set `schema: ""` (V11). The JSON-LD that actually ships on a blog post is built in the template,
   not in frontmatter, which is where E1 and E2 were found.
5. **"a claim that contradicts this site's own terms page is a defect whichever one is wrong"** -
   sound as a rule, but no such contradiction exists here (V2). The contradictions this sweep found
   are with the **cookie policy** (F2), the **privacy policy** (F1, F3), the **article's own body**
   (G6), the **site's own other pages** (G1, G2) and the **site's own routes** (E5). None with
   terms.
6. **"the cookie policy versus consented GA4/AdSense" (the 09-29 ruling as quoted)** - on this site
   GA4 is not loaded at all. `niche.config.json:97` `google_analytics_id` is `""` and
   `ConsentedScripts` renders nothing when empty, so the only live contradiction is AdSense (F2).
   Nothing needs to be left as is on the GA4 half, because nothing is there.
7. **"data files under `hospitality/web/src/data/` if present"** - present, and they matter more
   than the phrasing suggests: two TypeScript copy files (`hospitality-services.ts`,
   `hospitality-hubs.ts`) that carry rate-bearing prose rendered on every `/services/*` and `/for/*`
   page, plus the three research JSON files that back the three research pages. E5 and G5 were found
   there. There is no CSV.
8. **`docs/hospitality/_port/` did not exist.** The brief says to write into it; the directory was
   created by this pass (and is the only filesystem change made outside this ledger).
9. **Not a premise of this brief, but a false claim in the programme record, so it is handed back:**
   `docs/hospitality/PHASE0_2026-09-28.md` states that `web/src/components/layout/SiteFooter.tsx:74`
   had "Editorial content only." replaced with "Free first call, then a fixed fee in writing." At
   HEAD, line 74 still reads "Specialist hospitality accountants. Editorial content only. Contact us
   for advice specific to your business." Either the 09-28 wording reversal undid it or the report
   overstated; either way the report and the code disagree and the next agent should not trust that
   line of the report.

## Not in scope, observed and handed on

- **E5 is the one row here that a visitor hits, not a machine.** Three of the homepage's four
  "Free calculators" links 404. It is filed as a claims row because published navigation that
  disagrees with the site is the same class of defect, but it is really a routing bug and it is the
  cheapest serious-feeling fix in this package.
- `web/src/app/page.tsx` and others emit `class="section-label"`. Whether a rule defines it is the
  CSS and token auditor's row, not a claims row; noted only because five sites have shipped it
  undefined.
- `src/config/site.ts:12` `leadConsentText` ("a firm from our specialist partner network") is the
  shared estate string and is exempt from the 09-28 positioning sweep by standing rule. Listed here
  so nobody reads it as a Rule-A survivor.
- No `next build`, `next dev`, server, or git command was run. `npx vitest run` and `npx tsc
  --noEmit` were not run because this package changed no TypeScript.
