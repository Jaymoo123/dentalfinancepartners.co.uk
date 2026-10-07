# pharmacies (Pharmacy Tax) site state

## PICKUP BLOCK (read this first) - design port

**Where it stands.** PHASE 0 COMPLETE (commit: see tag port-pharmacies-phase0). NEXT: phase 1.
Storage prefix for this site is **pfp** (confirmed in `layout.tsx`, not `phfp`). Local dev server
for this port runs on port **3111**.

| phase | tag | commit |
|---|---|---|
| 0 | `port-pharmacies-phase0` | see tag port-pharmacies-phase0 |

## 2026-10-07 design port, phase 0 (audit, fixes, recheck)

Production SHA `981a604e` (deployed 2026-09-23) vs working tree `110643de7` (7 commits ahead;
production is older than this build). Phase 0 committed and tagged `port-pharmacies-phase0`
(commit: see tag port-pharmacies-phase0). Full detail: `docs/pharmacies/_port/` (P0A-P0G,
PHASE0_PACKAGES.md).

### Agents used: 9 in phase 0 (5 audit, 3 fix, 1 recheck), plus 1 planner for phase 1

### Five audit packages, one line each

- **P0-A (claims and ground-truth ledger).** 9 serious-tier rows found across 6 rule classes
  (testimonials, turnaround promises, llms.txt vs code, a stale refresh promise, three calculator
  method errors, cookie/privacy copy vs AdSense and the dormant retention purge); every core tax
  rate (BADR, CGT, dividends, NIC, FA 2026 allowances) verified against `rates_ledger.json` and
  found correct everywhere it appears.
- **P0-B (rendered-HTML sweep, 67 URLs fetched, 62 full pages).** 4 serious findings: a duplicate
  Organization JSON-LD node sharing one `@id` with conflicting content on every page, a hardcoded
  `priceRange` on every page, `/embed/*` leaking full site chrome into what should be a bare
  iframe, and `BreadcrumbList` schema with no matching visible breadcrumb on 21 pages.
- **P0-C (CSS, token and contrast audit).** 2 serious findings: a `neutral-*` vs `slate-*` grey-ramp
  split (30 files vs 7, public site vs admin) and a hand-rolled `layout-utils.ts` that hardcodes
  `#0f3a4a` instead of a kit token indirection; brand colour contrast verified PASS everywhere it
  is used, including the documented `#88cde7` tint fix on dark grounds.
- **P0-D (instrument baseline: sweep, browser_check, cta_snapshot).** 2 serious, 4 minor live
  defects: 8 SVG NaN render errors and 29 contrast failures, both confined to the two `/research/*`
  pages; baseline otherwise clean (0 overflow, 0 dead links, 0 em-dashes, 0 pipeline artefacts, 0
  grounds breaches on the sampled set, 165 `data-cta` tags in 3 triples).
- **P0-E (structural and disposition inventory).** Nested `<main>` confirmed on 10 of 14 probed
  routes (worse than any prior port), no skip-link anywhere, zero `web-shared/design/**` imports,
  and two brief errors corrected: storage prefix is `pfp` not `phfp`, and the real record counts
  are 8 services / 5 hubs, not the naive grep's 10/7.

### Nine serious ledger rows and disposition

1. Locum calculator charges Class 2 NIC that was abolished 6 Apr 2024 - **fixed** (P0-F1).
2. Purchase-affordability calculator charges SDLT on the whole price including goodwill - **fixed**
   (P0-F1).
3. FP34 cash-flow calculator ignores the payment-lag input in its headline gap - **fixed** (P0-F1).
4. Purchase-affordability calculator quotes an uncited 5%-8% lending-rate range as fact - **fixed**
   (P0-F1).
5. A blog post promises a monthly refresh nothing performs - **fixed** (P0-F1).
6. `llms.txt`/`llms-full.txt` describe the affordability calculator backwards (models an affordable
   price; it actually takes a price and returns a repayment) - **fixed** (P0-F1).
7. Reply-time promise reads "within 24 hours" on 8+ surfaces and "within one working day" on 4,
   including both AI-retriever files - **fixed**, all surfaces now read "within 24 hours" (P0-F1
   fixed the 2 machine files; P0-F2 fixed the remaining 3: `about/page.tsx`, `CalcResultCta.tsx`,
   `MiniCapture.tsx`).
8. Homepage "What clients say" prints three first-person quotes, then a standfirst below them
   calling the same quotes composites - **left as is by owner, same 29 Sep ruling** applied to the
   identical block on hospitality and startups; raised here only because that ruling was per site.
9. Cookie policy says no advertising cookies while the site loads Google AdSense; privacy policy
   says enquiry data is deleted after 24 months while the deletion cron is deliberately disarmed -
   **left as is by owner, same 29 Sep ruling**, both estate-wide and identical on Property.

### Every changed sentence, receipts P0-F1/F2/F3 (owner's record, wording ruling 2026-09-28)

**P0-F1 (`locum-take-home-comparator.ts`):**
- note sentence, before: "Sole trader uses Class 2 NIC at £3.45/week and Class 4 NIC at 6%
  (£12,570-£50,270) / 2% above." After: "Sole trader uses Class 4 NIC at 6% (£12,570-£50,270) / 2%
  above; Class 2 NIC is not charged where profits exceed the Small Profits Threshold."
- doc comment, before: "Sole-trader take-home: income - expenses = profit; income tax + Class 2 +
  Class 4 NIC." After: "Sole-trader take-home: income - expenses = profit; income tax + Class 4
  NIC."
- result row "Class 2 NIC (£3.45/week)" deleted entirely.

**P0-F1 (`pharmacy-purchase-affordability.ts`):**
- row label, before: "Asset deal: SDLT non-residential (est.)". After: "Asset deal: SDLT on the
  premises element (est.)".
- row label, before: "SDLT premium over share duty". After: "SDLT less share duty (difference)".
- note sentence, before: "SDLT applies the non-residential bands (0% to £150,000, 2% from £150,001
  to £250,000, 5% above)." After: "SDLT applies the non-residential bands (0% to £150,000, 2% from
  £150,001 to £250,000, 5% above) to the premises figure you entered only, because goodwill and the
  NHS contract are outside SDLT; on a leasehold deal with no property that figure is nil."
- help text, before: "The rate quoted by the lender. Commercial pharmacy finance rates in 2026 have
  varied between approximately 5% and 8% depending on lender, term and loan-to-value." After: "The
  rate quoted by the lender. The rate you are offered depends on lender, term and loan-to-value."

**P0-F1 (`pharmacy-fp34-cash-flow-estimator.ts`):**
- note sentence, before: "The working-capital gap shown is the portion of monthly claim value not
  covered by the advance while you wait for full settlement." After: "The working-capital gap shown
  is the portion of monthly claim value not covered by the advance, accumulated across the
  ${lag} month(s) you wait for full settlement."

**P0-F1 (`drug-tariff-changes-explained.md`):**
- before: "As at: July 2026. This slot is refreshed monthly. Check the NHSBSA Drug Tariff portal
  for the current edition..." After: "As at: July 2026. Check the NHSBSA Drug Tariff portal for the
  current edition..." (refresh promise removed, date kept).

**P0-F1 (`public/llms.txt`):**
- before: "Models the affordable purchase price for a community pharmacy based on EBITDA, debt
  service, and working capital." After: "Takes an agreed purchase price, deposit and loan terms and
  returns the estimated monthly repayment, the post-tax cash cover ratio, and the stamp duty or SDLT
  cost of a share deal against an asset deal."
- before: "Specialist advice for pharmacy owners and buyers. Reply within one working day." After:
  "Specialist advice for pharmacy owners and buyers. Reply within 24 hours."

**P0-F1 (`src/app/llms-full.txt/route.ts`):**
- before: "(affordable purchase price from EBITDA, debt service, and working capital)". After:
  "(monthly loan repayment, post-tax cash cover ratio, and share-deal against asset-deal acquisition
  tax, from an agreed purchase price)".
- before: "No phone lines or walk-ins; every enquiry gets a specialist reply within one working
  day." After: "No phone lines or walk-ins; every enquiry gets a specialist reply within 24 hours."

**P0-F1 (`pharmacy-dispensing-workload-and-density.md`, not-serious D2, attribution only, no
figure changed):**
- before: "The number of dispensing pharmacies fell from 11,764 to 10,382, a decrease of 11.7%."
  After: "The number of pharmacies actively dispensing in the month fell from 11,764 to 10,382, a
  decrease of 11.7%."
- before: "England as a whole sits at 18.11 pharmacies per 100,000 population, from 10,617
  pharmacies and 58,620,101 people." After: "England as a whole sits at 18.11 pharmacies per 100,000
  population, from the 10,617 registered pharmacy contractors on NHSBSA Contractor Details (a wider
  count than the 10,382 actively dispensing in a single month above) and 58,620,101 people."

**P0-F2 (`about/page.tsx`):** "reply within one working day" -> "reply within 24 hours".

**P0-F2 (`CalcResultCta.tsx`):** "...we reply within one working day." -> "...we reply within 24
hours."

**P0-F2 (`MiniCapture.tsx`):** default success text "within one working day" -> "within 24 hours".

**P0-F2 (`services/page.tsx`):** title "Services | Pharmacy Tax" -> "Services" (layout template
already appends the suffix); meta description trimmed from 168 to 150 chars by deleting the
trailing ", and benchmarking." clause only, no new or reworded copy.

**P0-F2 (`for/page.tsx`):** title "Who We Help | Pharmacy Tax" -> "Who We Help" (same doubled-suffix
fix).

**P0-F3:** no further sentence-level wording changes; its fixes were a NaN data-key mismatch, two
contrast colour-class swaps, a scroll-margin CSS rule, a noindex metadata export and five
`<main>`-to-`<div>` landmark changes (code/markup, not copy).

### Calculator corrections, hand-derived

**Locum take-home, Class 2 NIC removed** (base case £400/day x 4 days x 46 weeks, £3,000 expenses):
profit £70,600; income tax £15,672; Class 4 £2,668.60; Class 2 £0 (was £179.40). Net take-home
£52,259.40 (was £52,080, pinned test value). Delta +£179.

**Purchase affordability, SDLT scoped to the premises element**: leasehold (premises £0), £400,000
price: SDLT £0 (was £9,500). Freehold, premises element £400,000: band 1 0% on £150,000 = £0; band
2 2% on £100,000 = £2,000; band 3 5% on £150,000 = £7,500; SDLT £9,500. Premises element £200,000:
band 2 2% on £50,000 = £1,000.

**FP34 cash-flow, gap now multiplies the monthly shortfall by the payment lag**: 2,000 items x £10
claim £20,000, 50% advance £10,000, shortfall £10,000, lag 2 -> gap £20,000 (was £10,000). 1,000 x
£8 claim £8,000, 40% advance £3,200, shortfall £4,800, gap £9,600 (was £4,800). 500 x £20 claim
£10,000, 0% advance, shortfall £10,000, gap £20,000 (was £10,000). 100% advance case unchanged at
£0 (0 x lag = 0).

### Recheck result (P0-G)

0 blockers. Instruments reproduced the P0D baseline byte-for-byte on everything not targeted by the
fix wave: 55/55 URLs clean, 813 internal links, 165 `data-cta` tags in the same 3 triples
(`header_contact`/`sticky_cta`/`sticky_cta_close`), 0 dead links, 0 em-dashes, 0 pipeline artefacts,
0 link-floor breaches across all 23 URL families. Defects that went to **zero**: contrast failures
29 -> 0, anchor-gap (`scroll-margin-top`) failures 8 -> 0, SVG `<rect>` NaN console errors 8 -> 0.
11/11 curl proofs passed (single Organization JSON-LD node, no `priceRange`, no chrome leak on
`/embed/*`, no nested `<main>` on 18 sampled URLs, no doubled title suffix, self-referential
canonicals on `/book`/`/complete`/`/thank-you`, noindex on the 404 shell, correct llms.txt
calculator description, "within 24 hours" everywhere, 0 "within one working day" hits, chart
captions re-checked in context).

### Residuals for phase 1

Skip-to-content link (none anywhere); breadcrumb UI component (21 pages carry `BreadcrumbList`
schema with no matching visible trail); the `neutral-*`/`slate-*` grey-ramp split (30 files vs 7);
porting `layout-utils.ts` onto the kit version and replacing the hardcoded `#0f3a4a`; the
`btnOnDark = btnSecondary` alias (built for a light ground); the one rendered-DOM
`getComputedStyle(document.body).fontFamily` check for the webfont, per the T-H1 rule, before
calling it closed; 159 hardcoded hex values in `.tsx` (concentrated in `page.tsx` and the two
research/chart pages); the dark-navy CTA band meeting an equally dark footer on 17 routes plus 3
adjacent-same-ground routes, found only because this phase's full 35-route `--grounds` sweep went
wider than P0D's sample; the `SiteFooter.resourcesHref` owner call (no obvious single hub); the
missing `public/brand/logo.png` asset; carrying `storagePrefix=pfp` forward correctly; the
one-line `page.tsx:69` follow-up (`r["47730"] ?? ... .count ?? 0` -> `r.count ?? 0`) once that file
is back in scope; the client-only mobile-drawer CTA (`header_contact_mobile`) that no instrument
can see and must be hand-checked.

### Residuals for the owner

`about/page.tsx`'s "fixed-fee basis" promise (only this site makes it, not an estate string); the
"Most popular" badge on the middle service tier; "Pharmacy clients only" and "we never discuss one
client's position with another" (claims about the client book, unsourced); "the ranges we see most
often" wording on the affordability calculator (implies an observed deal population); "Most lenders
want to see at least 1.25x" debt-service-cover claim (unsourced, twice in one file); corporation tax
computed before deducting loan interest (overstates CT, understates the cover ratio); "pound-sterling
1 million" style currency rendering in `llms.txt`'s key-facts block (11 lines, cosmetic); five locum
income-tax constants with no entry in `rates_ledger.json` (now appended, append-only, 0 deletions).

Last updated 2026-07-15 (HARDENED + PARITY + WAVE-2 BUILT, deploy held). Generated by
`optimisation_engine.ops.spinup_site`. Tranche: **2**.

brand_locked: true

> **DEPLOYED TO PRODUCTION 2026-07-16** at https://www.pharmacytax.co.uk (Vercel CLI, prod). Live battery passed (all key routes 200, apex 308 to www, brand clean). sites.active=true; sitemap submitted to IndexNow. Remaining external: GSC property + Request Indexing, Bing import, GA4 id, real phone, brand logo assets.

> **FINAL BRAND LOCKED 2026-07-16: "Pharmacy Tax" @ pharmacytax.co.uk** (owner-purchased domain; built under working brand "Pharmacy Finance Partners", all references swapped repo-wide 2026-07-16).

> **Working brand, NOT final. Deploy held.** Locked under the working brand
> **Pharmacy Tax** (`www.pharmacytax.co.uk`) so the
> launch core can be built under the medical-trap brand-lock guard. Owner picks
> the FINAL brand + registers the domain at gate G1 (a 3-file config swap:
> `pharmacies/niche.config.json`, `sites/pharmacies.json`, this file). RDAP
> re-verify `pharmacytax.co.uk` before buying. See
> `expansion_research/tier1_pharmacies/BRAND_SHORTLIST.md` (fallback: Pharmacy
> Tax Partners, which sidesteps the lending-adjacent "pharmacy finance" SERP).

## 2026-08-25 — Port-branch merge: nothing pending for this site

`design/property-redesign-port` was merged to main on 2026-08-25 (Property Standard
rollout, decision §8.10). Passenger enumeration for this site: **19 commits** were on
the branch and not in `origin/main`.

**All 19 are already on production, so the merge ships nothing new here.** This site's
live production deployment is SHA `435cc12e`, deployed 2026-08-24 ~20:2x UTC
(Vercel API `GET /v9/projects` -> `targets.production.meta.gitCommitSha`, readyState
READY, read 2026-08-25; this is what the production alias actually points at, which a
`/v6/deployments` listing alone would not prove), and
`git log 435cc12e..design/property-redesign-port --oneline -- 'pharmacies/'` returns 0.
Main was BEHIND production for this site, not ahead of it.

Reproduce the passenger list: `git log 902ea014..435cc12e --oneline -- 'pharmacies/'`.
Everything on it (estate lead-parity port, pool-model disclosure sweep, FA 2026 factual
sweeps, the 2026-08-24 consent-wording revert) is live and was deployed before this merge.

## Identity

- site_key `pharmacies` | display **"Pharmacy Tax"** | intended domain `www.pharmacytax.co.uk`
- Storage prefix **`phfp` FROZEN** (added to the SITE_SPINUP.md registry at scaffold time; never change after first deploy)
- Tranche id: `2`
- Vercel project id: `prj_t2p8zJKl4PgBSpsnTanv0kQ5Whyk` (filled by scripts/vercel_create_site.py)
- Brand: NOT LOCKED. No content generation until this flag reads `brand_locked: true` (owner gate G1).

## Launch state

- [x] S1 brand lock under WORKING brand (final brand = owner gate G1): `brand_locked: true` set 2026-07-14; legal_name fixed to Ashfield Trading Ltd
- [x] S2 scaffold DONE 2026-07-14: spinup_site run (prefix phfp, tranche 2, --skip-db); wiring emitted (workspaces, indexing key, site_config, routing_safety prefix, tranche-2 migration pair, CI matrix, sites/pharmacies.json)
- [x] S3 research pack finalised (R3 dossier + LAUNCH_CORE + HOUSE_POSITIONS_OUTLINE + CALCULATORS + DATA_ASSET, expansion_research/tier1_pharmacies/); blog_topics seeding deferred to deploy (launch core is brief-driven, not generator-loop)
- [x] S4/S5 machinery + niche build DONE 2026-07-14: infra mirrored to crypto/web parity; house_positions.md (28 positions, load-bearing figures re-verified at source: BADR 18% 2026/27, employer NIC 15%/£5,000, Employment Allowance £10,500, dividends 10.75/35.75/39.35, FA2026 WDA 14%+40% FYA) + rates_ledger.json (26 entries); 3 golden-tested calculators (purchase affordability, FP34 cash-flow, locum take-home comparator, vitest 21/21); UK Community Pharmacy Openings & Closures Index (REAL NHSBSA + Companies House SIC 47730 data, zero fabricated figures)
- [x] S6 LAUNCH CORE BUILT 2026-07-14: 27-page core (home + 5 /for hubs + 8 services + 13 blogs) via Opus briefs + Sonnet workers (batch size 1); brand-agnostic corpus; build green (53 static pages, tsc clean); internal-link audit clean; Opus adversarial fact-review passed (0 HP-contradictions / 0 open-flag-figure / 0 fabrication / 0 em-dash / 0 positioning-wall, 2 minor findings fixed manager-direct). DEPLOY HELD.
- [x] S6b hardening + parity + wave-2 DONE 2026-07-15 (see section below); build + vitest GREEN, predeploy_gate --brand-only PASS
- [ ] S7 Vercel project + preview an01 pass + live battery (gates G3/G4)
- [ ] S8 domain-ready close-out: `sites.active=true`, tracker updated

## 2026-07-15 hardening + parity + wave-2 (branch expansion/phase-0, nothing deployed)

- **Phase 0 audit defects fixed:** broken internal links corrected, HP-code artefacts stripped, metaDescriptions trimmed to ≤155, breadcrumbs added.
- **Lead capture end-to-end:** /api/leads/submit route CREATED (was missing); `.env.local.example` added. Tranche-2+3 Supabase migrations APPLIED to prod 2026-07-15 (15 site keys verified live in `sites_site_key_check` + `leads_source_valid`; generator-emitted t2 files hand-fixed to the full key union before applying; new rows `active=false`); **blog_topics seeded: 1,227 rows**; lead-source constraint smoke-tested (insert+rollback). Property /api/leads/notify allowlist addition still pending at tranche G1 deploy.
- **Legal/crawl parity (Property-grade):** privacy-policy + cookie-policy + terms pages; robots.ts 40-bot AI allowlist; static `public/llms.txt` (figures from rates_ledger, verified 2026/27-current); not-found.tsx + error.tsx; NEW SiteFooter component with legal links (site previously had no footer); sitemap additions; embed backlinks verified present.
- **AI/GEO parity-or-greater:** HowTo schema (howToSteps frontmatter) on procedural posts; WebApplication schema on all calculators; Dataset schema on the Openings & Closures Index (exceeds Property); Article dateModified; Organization enrichment (legalName Ashfield Trading Ltd, knowsAbout, sameAs = Companies House 16358723 only); BLUF/FAQ audits patched.
- **Wave-2 content:** 7 blogs (Opus briefs in `briefs/pharmacies/wave2/` + Sonnet workers + 2-track Opus QA).
- **QA gate findings all fixed manager-direct:** locum Class 2 NIC factual error corrected; HP-code artefacts stripped (incl. wave-1 leaks); broken internal links corrected; metaDescriptions rewritten ≤155; em-dashes purged.
- **Admin analytics:** full suite (leads/trends/login/visitor) ported from charities.
- **DONE 2026-07-16:** blog_topics wave-2 head keywords marked used=true (explicit ids, scripts/_wave2_mark_used.py; non-pool-sourced briefs skipped). Deploy held on owner G1.

## Data layer

- Tranche migration pair emitted at scaffold time (see supabase/migrations/); rows insert `active=false`
- Lead notify allowlist: add `pharmacies` to Property /api/leads/notify allowlist in the per-tranche Property deploy (the sole sanctioned live-site touch)

## External steps (HUMAN ONLY, gate the site going live)

- [ ] Buy the domain `pharmacytax.co.uk` and point DNS at Vercel (A/CNAME per Vercel domain UI)
- [ ] **Pre-attach refresh (same day the domain is bought):** run the rates-ledger lint + dated-reference sweep (tax-year mentions) over the corpus and patch stale figures BEFORE DNS attach
- [ ] Google Search Console: add property `sc-domain:pharmacytax.co.uk`, verify (DNS TXT), submit `/sitemap.xml`, Request Indexing on key pages (discovery failure is the number 1 new-site risk)
- [ ] Bing Webmaster Tools: import the site from GSC, add Bing verification code to niche.config.json
- [ ] GA4: create property, copy measurement id into `pharmacies/niche.config.json` -> seo.google_analytics_id, add to `optimisation_engine/clients/ga4_config.py`, redeploy
- [ ] Real phone number into `pharmacies/niche.config.json` -> contact.phone (placeholder ships as +44 20 0000 0000)
- [ ] Brand assets: `public/brand/primary-logo.png` + `public/brand/icon-alt.png` (OG image route depends on them)
- [ ] Resend routing ONLY if a partner firm is signed (partner CC only on partnered sites; otherwise leads route to owner inbox)

## 2026-09-28 phase 0 parity

Built against `docs/_engines/ESTATE_PARITY_PHASE0_BRIEF_2026-09-28.md` and this site's
`PARITY_RESEARCH_2026-09-28.md`. Not deployed; local-only, awaiting the manager's serialised
build + owner deploy word. Full detail: `docs/pharmacies/PHASE0_2026-09-28.md`.

- Positioning: post-submit `/complete` and `/thank-you` copy, and every "a specialist will..."
  lead-nurture/booking string, now speak as the firm ("one of our accountants"). Privacy policy's
  data-sharing disclosure (sections 3-5, 7) and the `leadConsentText`/calculator consent sentence
  are UNCHANGED: this site genuinely operates a multi-firm data-sharing pool on the backend
  (`lib/leads/handoff.ts`, `contactability.ts`, the 3+3=6-recipient compliance cap), so that
  wording is accurate legal disclosure, not marketing caveat, and was left alone per the brief's
  exemption for the data-sharing paragraph and consent sentence.
- Added `entity` key to `niche.config.json` (Property's shape, pharmacy wording).
- `/for/*` and `/services/*` pages: `item.body` and `faq.answer` now render via
  `dangerouslySetInnerHTML` instead of as literal text, fixing the raw `<a href=...>` markup
  visible on all 5 segment pages. `/for/locum-pharmacists` no longer skips the lead form
  (`noLeadForm: true` removed from `pharmacies-hubs.ts`).
- Added `SiteHeader` (CTA visible ≥1280, hidden <1024, nav ≥1024) and `StickyCTA` (no intent
  dependency, generic `niche.config.json` `cta` copy), mounted in root `layout.tsx` for every page.
  Full mega-nav port is NOT done (out of phase-0 scope per the brief: "chat and intent are phase 1").
- Nurture `delayHours` was cumulative totals in a gap field; reset to Property's real gaps
  `0,0,4,20,24,48,72,96`. The separate 4-step `DETAIL_CAPTURE_STEPS` array was left alone
  (different shape, not named in the research finding).
- Fixed the double-full-stop h1 (`pharmacies-services.ts` headline) and the double-brand
  calculator title (`title: tool.metaTitle` -> `{ absolute: tool.metaTitle }`).
- `lib/schema.ts` `buildOrganizationJsonLd` now wraps the shared `packages/web-shared/schema`
  `buildOrganization` builder (Medical's `organization-schema.ts` is the reference); every prior
  field survives (diffed field-by-field), plus `parentOrganization` (Ashfield Trading Ltd) added.
  Added `buildServiceJsonLd` wrapping the shared `buildService`, wired onto all 5 `/for/*` and 8
  `/services/*` pages alongside a `BreadcrumbList`.
- `public/llms.txt`: every internal link now carries `?utm_source=chatgpt&utm_medium=llms`, plus
  the attribution note. Not rewritten to Property's full entity-first structure (not named in
  decision 3's list; UTM was the specific gap flagged).
- Added `pharmacies/pipeline/submit_indexnow.py` (Property's shim, `SITE_KEY = "pharmacies"`;
  central config already had a `pharmacies` entry in `optimisation_engine/indexing/config.py`).
- AdSense wired per the Solicitors pattern: `layout.tsx` metadata `google-adsense-account`,
  `ConsentedScripts adsenseClientId`, `public/ads.txt`, and `next.config.ts` `headers()` via
  `buildSecurityHeaders({ ga: true, supabase: true, ads: true, embedPrefix: "embed" })` — this
  site had NO security-headers block before, so `embedPrefix: "embed"` was added deliberately to
  keep the live `/embed/*` partner-iframe route framable (would otherwise have gone from no CSP
  to frame-ancestors denied-everywhere in the same diff).
- Body font: added `next/font/google` `Plus_Jakarta_Sans` (Property's font), one file, no new
  dependency.
- `sitemap.ts`: removed build-time `lastModified: now` from every static/service/for/tool/category
  route (omitted, Property's pattern); blog post routes already carried a real
  `post.updatedDate || post.date` and are unchanged.
- Segment/service page closers: added a one-sentence, per-page-parameterised closer under the
  form (Sonnet-plain, flagged for the Opus read below).
- `tsc --noEmit` clean, `vitest run` 35/35 passing throughout.

**Needs the shared agent:** the calculator's first input has no visible focus ring
(`outline-style: none`, transparent box-shadow) — this is `packages/site-styles`/shared form-style
territory per brief section 8, not touched here.

**Needs the Opus read:** the 13 segment/service closers written above are plain Sonnet copy, not
audience-bespoke; Aswatax intro wording on `/thank-you` was left as-is (already correct per the
research reader pass); `house_positions.md` (last touched 2026-07-14) was not re-checked against
current ground-truth memory in this pass.

- 2026-10-02 Phase 0 pre-live gate (GEO programme): firm-voice, em-dash, pipeline-leak and engagement-claim sweep plus a rendered read at 1280/390 with fixes; local, committed, not deployed. Detail and open owner items: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 14.
