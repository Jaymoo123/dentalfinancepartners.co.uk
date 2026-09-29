# hospitality (Hospitality Tax) site state

## 2026-09-29 DESIGN PORT + UPLIFT COMPLETE (not pushed, not deployed)

Tags: `port-hospitality-phase0` = `36d2b4fe`, `-phase1` = `56c3f468`, `-phase2` to `-phase6`
all on `577e22e2`, **`port-hospitality-complete` = `port-hospitality-uplift` = `ac897ad1`**
(check out the `-complete` tag, never a phase tag). Full record in `docs/hospitality/_port/`
(P0A to P0G, PHASE0_PACKAGES, PHASE1_PACKAGES, R1, PHASE2-6_PACKAGES, V1, R2, R3, R4,
R4B_FINAL_CHECK). Owner go for the whole programme, 2026-09-29: "yeah let's go for
everything, we're not deploying but we do everything".

### What shipped, per phase

**Phase 0 (`36d2b4fe`), claims audit and serious-tier fixes.** Five audit packages first
(claims ledger 34 rows, rendered sweep of 62 pages, CSS and token audit, instrument
baseline, structural inventory), then three fix packages on disjoint files. Fixed: two
client-outcome clauses deleted from the homepage, Tips Act commencement wording corrected in
two places, the VAT checker's hot-food test replaced with the five tests in VAT Notice 709/1,
four dead calculator links, an FAQ answer that printed its own markup as text, blog FAQs now
rendered from the same frontmatter their FAQPage schema already asserted (210 of 214 answers
were invisible to readers), BlogPosting and BreadcrumbList schema on posts, `priceRange`
removed from the Organization node, `areaServed` typed Country, a duplicate Organization
block removed, nested `<main>` on nine routes, og:image added on category hubs, calculator
pages, three research pages and the three legal pages, a research canonical off a placeholder
host, a doubled brand suffix in research titles, a missing form on the openings index, and
the admin login focus ring. Seven owner-ruled ledger rows (the composite testimonial framing,
the retention sentence, the cookie policy against AdSense, the 24-hour promises, the lead
rubric) were left exactly as they are under the 09-29 ruling.

**Phase 1 (`56c3f468`), tokens and chrome on the kit, with the uplift foundations.** The
primary ramp, the radius, the four glow channels, the motion layer, the kit footer, the kit
header CTA behaviour, landmarks and a skip link. Its independent review (R1) came back FAIL on
one thing the phase had not measured: the site was rendering in the visitor's system font,
because the webfont variable was bound on `<body>` while the token was declared on `<html>`.
Plus Jakarta Sans had **never** actually applied on this site, at any point, despite source
and gate greps saying it was loaded. Fixed inside the phase.

**Phases 2 to 6 (`577e22e2`), one wave of six disjoint packages with the uplift built in.**
Every route template rebuilt on the kit: heroes, breadcrumbs, stats bands, coverage cards,
numbered reasons, notice cards, the blog reading surface (progress bar, table of contents,
related articles, sidebar CTA), the calculator shell and the lead kit. Eight additive kit
props came out of this wave (`1437cb9e`), three more after review (`f17702ff`, `0b08df0a`),
every default byte-identical.

**The help widget (`a6cb6630`, kit `70047cb6` and `20f48e9d`).** The floating "Ask an
accountant" widget was lifted into the kit as one shared implementation first; this site is
its second consumer. Everything site-specific (topics, route rules, opener copy, labels, lead
source, button colours, focus ring) arrives through one config file.

**Gap-fix rounds (`a045e4a3`, `95ce72a4`, `ac897ad1`).** Closed what R2, R3, V1, R4 and R4b
raised.

### The numbers, all measured on the running build at `localhost:3202`

| what | before | after |
|---|---|---|
| contrast failures (`browser_check.mjs`) | 235 | 219 after phase 0, 0 after phase 1, 26 at wave close, **0** after the gap-fixes |
| four-marker design row | 0 / 0 / 0 / 0 | **2 / 3 / 5 / 23** (Property 1/2/3/4, generalist 1/2/3/4, startups-tech 1/3/3/4) |
| playbook gate 9.1 | not run | **all eight rows pass**, kit adopted 10 distinct primitives across 64 call sites |
| webfont | never applied, on any page, ever | applied |
| widget reachable by keyboard | never (dead stop inside 420 Tab presses) | **83 presses on the home page, 43 on a calculator** |
| tests | 43 | **138** |
| dead internal links | 3 | 0 |
| routes swept clean | 59 of 59 | 59 of 59 |
| internal links total | 667 | 978, and not one route below its baseline |
| tagged CTAs | 59 on one pattern | 183 across 12 patterns |
| JSON-LD blocks parsing | not measured | 202 of 202 |
| em-dashes anywhere on the site | 0 | 0 |

Two review blockers were **rejected on evidence, not fixed**: R3's "a published FAQ sentence
was rewritten" (the sentence at HEAD is byte-identical to the pre-phase-0 original; phase 0
was the thing that changed it, and the wave put it back), and R2's "nested scroll containers
on 23 blog posts" (the second container is on the mobile mount, which is `display:none` at
the width the reviewer measured).

### Owner-visible changes, in plain English

1. **A footer sentence is gone.** "Specialist hospitality accountants. Editorial content only.
   Contact us for advice specific to your business." no longer appears, because the shared
   footer has no slot for it. The footer brand column also lost its heading and its "Contact
   us" link in the same swap.
2. **The footer is now dark.** It used to be a light cream panel. It now matches every other
   ported site.
3. **The stats strip on the front page is now on white** rather than the brand brown. The
   three-figure strips on the sector and service pages sit on a dark slate band. Both are
   legible (17.9 and 14.6 against a floor of 4.5), but the two no longer match each other.
4. **Four new labels appear on the blog and on three how-to posts**: "Topics", "The library",
   "Keep exploring", and "Step by step".
5. **Two new source labels on the research pages**: "Source: Companies House" (twice, on the
   openings and closures index) and "Source: Food Standards Agency Ratings API" (on the
   hygiene map).
6. **The breadcrumb on the sector hub reads "For"**, which is the route name rather than a
   word.
7. **The data-sharing notice now appears at step 2 of the main form** rather than step 1.
8. **A new floating "Ask an accountant" widget** on every public page. Its lines are listed in
   full below.

### Phase 0 sentence changes, old and new, every one

The ledger behind these is `docs/hospitality/_port/P0A_CLAIMS_LEDGER.md`; the old and new text
is taken from the diff of `36d2b4fe`.

1. **Homepage testimonial (`src/app/page.tsx:219`).** Old: "...our employer NIC on tips
   dropped to zero. **The savings in the first year covered the accountancy fee several times
   over.**" New: the second sentence is deleted; the quote ends at "...dropped to zero."
2. **Homepage "why a specialist" paragraph (`src/app/page.tsx:651`).** Old: "...a generalist
   encounters these infrequently. **We deal with them every week across our hospitality client
   base.**" New: the second sentence is deleted.
3. **Tips Act, blog post `casual-staff-employment-status.md`.** Old: "Since the Employment
   (Allocation of Tips) Act 2023 **came into force on** 1 October 2024..." New: "Since **the
   main duties of** the Employment (Allocation of Tips) Act 2023 **have applied from** 1
   October 2024..."
4. **Tips Act, `public/llms.txt`.** Old: "Tips Act 2023 (Employment (Allocation of Tips) Act
   2023) **in force from** 1 October 2024: 100% of qualifying tips must reach workers without
   deductions." New: "Tips Act 2023 (Employment (Allocation of Tips) Act 2023): **the main
   duties have applied since** 1 October 2024, requiring 100% of qualifying tips to reach
   workers without deductions."
5. **VAT checker result text (`lib/calculators/tools/vat-checker.ts:63`).** Old: "...HMRC
   defines hot as food heated above ambient temperature for consumption hot." New: 'Food is
   "hot" for VAT purposes if it is above ambient air temperature and meets any one of the five
   tests in VAT Notice 709/1: intentionally heated for consumption, heated to order, kept hot
   after cooking, supplied in heat-retentive packaging, or advertised or marketed as hot.'
6. **VAT checker explainer (same file, :169).** Old: "Hot food (heated above ambient
   temperature for consumption hot) is always standard-rated on takeaway." New: "Hot food,
   meeting any one of the five hot-food tests in VAT Notice 709/1 (intentionally heated for
   consumption, heated to order, kept hot after cooking, heat-retentive packaging, or
   advertised or marketed as hot), is always standard-rated on takeaway."
7. **Three homepage calculator links and one service-page link** repointed from slugs that
   404ed (`/calculators/tronc-tips-paye-nic`, `/calculators/food-drink-vat-checker`,
   `/calculators/staff-cost-rota-margin`) to the real ones
   (`tronc-tips-paye-nic-calculator`, `food-drink-vat-rate-checker`,
   `staff-cost-rota-margin-calculator`). No sentence changed.
8. **The tronc FAQ answer (`data/hospitality-services.ts:77`)** temporarily lost its inline
   link to the payroll service in phase 0 ("See also **our hospitality payroll service** for
   how..."), and the design wave **put the original link back**. The published wording at HEAD
   is what it was before any of this started.

Note for anyone reading `PHASE0_PACKAGES.md`: it refers to a 14-item "F1 receipt". No such
file was written. The list above is the receipt, derived from the commit.

### Every authored line in the help widget

All of it is ours. None came from the shared kit. No price, no "free call", no promise beyond
this site's own "we reply within 24 hours", no claim to be chartered, qualified or regulated.
The copy lives in `hospitality/web/src/lib/assistant/opener.ts` (the openers) and
`hospitality/web/src/lib/intent/widget-config.ts` (the panel labels and messages). Every
opener line was shortened to a single sentence in the final gap-fix.

**The opening line, by what the visitor was reading.** Three versions per topic: a light one
early in the visit, a more helpful one mid-visit, a direct one once they look ready.

Tronc and tips:
- "Want me to pull up the tool that runs the PAYE and NIC on tronc and tips?"
- "Want a hand checking your tronc is independent enough for the NIC treatment?"
- "Speak to a hospitality accountant about your tronc scheme, shall I point you to the form?"

Food and drink VAT:
- "Want me to open the rate checker for the food and drink VAT on your menu?"
- "Happy to help with the hot food tests or an eat-in line if you want a hand."
- "Speak to a hospitality accountant about your VAT, shall I point you to the form?"

Staff costs and payroll:
- "Want me to open the rota margin tool for staff cost against covers?"
- "Want a hand working out what the April cost rises do to your rotas?"
- "Speak to a hospitality accountant about your payroll, want me to set that up?"

Business rates:
- "Checking your business rates, shall I show you which reliefs venues most often miss?"
- "Want a hand seeing whether Small Business Rate Relief applies to your site?"
- "Speak to a hospitality accountant about your rates bill, shall I point you to the form?"

Licensed trade:
- "Running a licensed site, shall I point you to the wet and dry margin pages?"
- "Happy to help with alcohol duty, licensing costs or Machine Games Duty if you want a hand."
- "Speak to a hospitality accountant about your licensed trade, want me to set that up?"

Accounts, deadlines and compliance:
- "Anything I can help you find on your accounts or your filing deadlines?"
- "Happy to help you keep on top of your deadlines and Making Tax Digital."
- "Speak to a hospitality accountant about your compliance, shall I point you to the form?"

Tronc and payroll together:
- "Tronc and payroll nearly always land together, so shall I line both up?"
- "Running a tronc alongside your pay run takes care to separate, want me to show you?"
- "Speak to a hospitality accountant about both together, want me to set that up?"

After they have used a calculator:
- "You have already run the numbers, so want a second pair of eyes on them?"
- "A calculator gives a picture, and an accountant confirms it fits your venue, want a check?"
- "Ready to sanity-check those results with an accountant who goes further than any
  calculator?"

When we cannot tell what they came for:
- "Not sure what you are looking for, shall I point you to the right tool?"
- "Happy to help you find what you need, so what is the main thing on your mind?"
- "Speak to a hospitality accountant and get a straight answer, want me to set that up?"

**If a form on the page errors:** "Send a question about [your tronc and tips / your food and
drink VAT / your staff costs and payroll / your business rates / your licensed trade numbers /
your accounts and deadlines] here instead, we reply within 24 hours." With no topic known:
"Send a question here instead, we reply within 24 hours."

**If they look like they are leaving:** "Before you go, send a question about [the same topic
phrase] and we will reply within 24 hours." With no topic known: "Before you go, send a
question and we will reply within 24 hours."

**The panel's own labels and messages:** launcher and ask button "Ask an accountant"; header
title "Hospitality Tax"; header line "We reply within 24 hours"; close button "Close"; the
calculator chip "See your numbers"; the contact chip uses the site's own sticky CTA wording;
submit button "Send to an accountant" and "Sending..."; placeholder "Your question for an
accountant"; field labels "Your email" and "Your question"; errors "Enter a valid email
address.", "Add a short message so the accountant knows how to help." and "Something went
wrong. Please try again."; success "Thanks, we have your message. One of our accountants will
reply by email within 24 hours. Please keep an eye on your inbox, and your spam or junk
folder, so the reply is not missed."; and the estate's shared consent sentence, unchanged.

**Written but shown to nobody:** six tool and specialist offer lines for a personalisation
engine that has no mounted surface on this site. Kept so a later yes does not need the copy
re-derived.

### Questions for the owner

1. **The faint line under the big headings on the coloured pages.** White at 80 strength on
   the brand brown measures 3.87 where the standard is 4.5, on 13 routes. Legible but soft.
   Brighten it to full white, or keep the softer look?
2. **The small orange highlights on the sector and service cards.** They are a stock orange
   rather than a shade of the brand brown, and they are the one place the colours look
   borrowed. Pull them onto the brand, or leave them?
3. **The dark closing panel meets the dark footer with no visible join** on 17 pages, so the
   bottom of the page reads as one long slab. A hairline has been added, but at 1.23 to 1 it
   is a hint rather than a rule. Every kit site has the same shape. Do you want a real,
   visible divide?
4. **The help widget also shows on the "page not found" screen.** That comes from the shared
   component and needs a small change there. Fix it, or leave it?
5. **Google AdSense is being blocked on every page of the estate.** Our security header does
   not list the AdSense frame address, which throws 164 browser errors per page load. The fix
   is one address in one shared file
   (`packages/web-shared/lib/security-headers.ts`), it affects all 17 sites, and because it is
   a security setting it is your call.
6. **The widget's lines, above.** Keep, change, or cut any of them?

Also recorded and unchanged, each a wording call only you can make: the dropped footer
sentence, the footer brand column's lost heading and "Contact us" link, the four new blog and
how-to labels, the breadcrumb on the sector hub reading "For", and the data-sharing notice
sitting at step 2 of the form rather than step 1.

### Agents, and where this sits

About 40 agents on hospitality (9 in phase 0, then phase 1, the six-package wave, a
verification executor, four reviews, three gap-fix rounds and the widget work). **Deploy
parked. Nothing pushed, nothing deployed, no CI run.** Local `main` is about 120 commits ahead
of `origin`. Next step is the owner's walk on `next start -p 3202`, then a deploy from
`port-hospitality-complete`. See `docs/_engines/ESTATE_PARITY_HANDOFF_2026-09-29.md` section 5.



> **2026-09-28 phase 0 parity (estate parity plan, per-site builder pass).** Corrects the
> stale "deploy held" line further down this file (from the 2026-07-15 entry): the site has
> been live in production since 2026-07-16 and remains ahead on every deploy since, per
> `docs/hospitality/PARITY_RESEARCH_2026-09-28.md`. Changed in this pass, not yet deployed:
> `entity` key added to `niche.config.json`; "specialist firm from our partner network" /
> "a specialist will" swept to firm voice on `/complete`, `/thank-you`, SMS/email nurture
> copy and the homepage (privacy policy and the consent sentence are the estate-wide
> exemptions, left untouched); footer "Editorial content only" line replaced; nurture
> `delayHours` fixed from a cumulative 0,0,4,24,48,96,168,264 (25-day actual runtime) to
> Property's gap values 0,0,4,20,24,48,72,96; 24-hour promise sentence added to the T0 email;
> `LeadCTAPanel` + `LeadForm` added to `/about`, all 6 `/for/*` and all 5 `/services/*` (were
> rendering zero forms); header CTA added (site had none at any width) via a client wrapper
> around the shared kit `SiteHeader`; Organization JSON-LD ported from a hand-rolled
> duplicate (one in `layout.tsx`, one in `lib/schema.ts`) to the single shared
> `packages/web-shared/schema` builder, now carrying `parentOrganization`; `Service` +
> `BreadcrumbList` JSON-LD added to `/for/[slug]` and `/services/[slug]` (FAQPage already
> present); raw HTML anchors that rendered as visible `<a href=...>` text on `/services`,
> `/services/[slug]` and `/for/[slug]` now render as real links; blog post `<table>` overflow
> at 390px (scrollWidth 436, cause: three unwrapped tables in
> `content/blog/vat-on-takeaway-food.md`) fixed with a scoped CSS rule; sitemap
> `lastModified` build-time `new Date()` removed (omitted, Property's pattern) except real
> per-post dates; estate font (Plus Jakarta Sans) loaded, was the bare system stack;
> `public/llms.txt` links tagged `utm_source=chatgpt&utm_medium=llms`; `pipeline/submit_indexnow.py`
> added (config for this site already existed in `optimisation_engine/indexing/config.py`);
> AdSense wired (`layout.tsx` metadata + `ConsentedScripts adsenseClientId`, `public/ads.txt`,
> `next.config.ts` `ads: true`); GA4 CSP (`region1.google-analytics.com` etc.) now turns on
> automatically once `google_analytics_id` is set, instead of a hardcoded `ga: false`. The
> `/for` and `/services` hub canonical fix (`bb297ab2`) was already at HEAD; not re-touched.
> Not done in this pass (see `docs/hospitality/PHASE0_2026-09-28.md`): GA4 id / GSC config
> entry (plumbing agent), full design-port header/nav (D1) [DONE 2026-09-29, see the top block], segment-page
> closer copy variation (Opus read), "free review" wording pass (section 2 policy, lower
> priority than the zero-form blockers), `/book` "free review" phrasing.

> **DEPLOYED to production 2026-09-16 from `90fbea9c`.** (high-street mechanic wave 1
> below, plus everything else committed by that date.)

> **2026-09-11 - HIGH-STREET MECHANIC WAVE 1 BUILT, DEPLOYED 2026-09-16 (`90fbea9c`)**
> (commit `4d84b1ee`).
> 6 assets, 11,720 searches/month: 4 new pages (`alcohol-duty` 4,160, `tronc-scheme` 240,
> `is-there-vat-on-dog-food` 220, `retail-hospitality-and-leisure-relief-scheme` 70) and
> 2 extensions of live pages (`vat-on-takeaway-food` 2,210 to 4,320 body words, now owning
> the "vat on food" head term at 6,640/mo; `machine-games-duty` 1,364 to 4,049 with the
> verified rates the live page had deliberately withheld). One pick dropped as a conflict.
> Verified against built output: build exit 0 (77 pages), all 6 routes render, FAQ JSON-LD
> count equals frontmatter on all 6, frontmatter lint clean. All 6 registered in
> `monitored_pages`, monitor_until 2026-12-10.
>
> **House positions corrected in the same wave.** HP 19 carried NO multiplier figures while
> pages asserted five of them from a worker-rules summary; all five now verified at the
> gov.uk effects publication Table 2.A and locked (RHL 38.2p / 43p, non-RHL 43.2p / 48p,
> high-value 50.8p). `rates_ledger.json` alcohol dates moved from 2023-08-01 to the correct
> 2026-02-01. HP 16 gains the dispense-system condition, HP 7 its statutory anchor, HP 8 the
> s.9 commencement nuance. Live `tips-act-2023-compliance.md` back-patched: it said "the Act
> came into force on 1 October 2024", but s.9 commenced 31 July 2023.
>
> **Baseline worth knowing before reading any result:** this site took 9 clicks and 2,005
> impressions across 35 URLs in the 90 days to 2026-09-11 on Google. Bing is materially
> stronger: `vat-on-takeaway-food` alone baselined at 9 Bing clicks, 150 impressions,
> position 5.4. Read this wave on Bing first, not Google.
> Programme doc: `docs/_engines/HIGHSTREET_MECHANIC_PROGRAM.md` section 13.

Last updated 2026-07-15 (HARDENED + PARITY + WAVE-2 BUILT, deploy held). Generated by
`optimisation_engine.ops.spinup_site`. Tranche: **1**.

brand_locked: true

> **DEPLOYED TO PRODUCTION 2026-07-16** at https://www.hospitalitytax.co.uk (Vercel CLI, prod). Live battery passed (all key routes 200, apex 308 to www, brand clean). sites.active=true; sitemap submitted to IndexNow. Remaining external: GSC property + Request Indexing, Bing import, GA4 id, real phone, brand logo assets.

> **FINAL BRAND LOCKED 2026-07-16: "Hospitality Tax" @ hospitalitytax.co.uk** (owner-purchased domain; built under working brand "Hospitality Finance Partners", all references swapped repo-wide 2026-07-16).

> **Working brand, not final.** Per the owner decision of 2026-07-14 (depth-first build under
> a working-brand placeholder, deploy held), the site is built locally under the R4 recommended
> name **Hospitality Tax** (`www.hospitalitytax.co.uk`). Final brand +
> domain remain the owner's to confirm and register at the deploy gate (G1). A later swap is a
> 3-file config edit (`niche.config.json`, `sites/hospitality.json`, this file); content carries
> no brand literals (rendered via `getSiteUrl()`). **DEPLOY IS HELD.**

## 2026-08-25 — Port-branch merge: nothing pending for this site

`design/property-redesign-port` was merged to main on 2026-08-25 (Property Standard
rollout, decision §8.10). Passenger enumeration for this site: **17 commits** were on
the branch and not in `origin/main`.

**All 17 are already on production, so the merge ships nothing new here.** This site's
live production deployment is SHA `435cc12e`, deployed 2026-08-24 ~20:2x UTC
(Vercel API `GET /v9/projects` -> `targets.production.meta.gitCommitSha`, readyState
READY, read 2026-08-25; this is what the production alias actually points at, which a
`/v6/deployments` listing alone would not prove), and
`git log 435cc12e..design/property-redesign-port --oneline -- 'hospitality/'` returns 0.
Main was BEHIND production for this site, not ahead of it.

Reproduce the passenger list: `git log 902ea014..435cc12e --oneline -- 'hospitality/'`.
Everything on it (estate lead-parity port, pool-model disclosure sweep, FA 2026 factual
sweeps, the 2026-08-24 consent-wording revert) is live and was deployed before this merge.

## Identity

- site_key `hospitality` | display **"Hospitality Tax"** | working domain `www.hospitalitytax.co.uk`
- Storage prefix **`hfp` FROZEN** (added to the SITE_SPINUP.md registry at scaffold time; never change after first deploy)
- Tranche id: `1`
- Vercel project id: `prj_sQNit8s3hKwuFaHdkBQORKsHq3Vb` (filled by scripts/vercel_create_site.py)
- Brand: WORKING-BRAND LOCKED (Hospitality Tax). Final brand pending owner confirmation at G1; deploy held.

## Launch state

- [x] S1 brand lock (WORKING brand, 2026-07-14): `brand_locked: true`; working brand Hospitality Tax / www.hospitalitytax.co.uk. Final brand still owner's at G1 (deploy gate); swap = 3-file config edit.
- [x] S2 scaffold DONE 2026-07-12: spinup_site run, spinup_site_check 1+8 PASS (content_strategy filled; checker's CI-matrix parse updated for the SITES list format), npm build green. R4 shortlist: `expansion_research/tier1_hospitality/BRAND_SHORTLIST.md` (rec: Hospitality Tax). Tranche-1 migration pair emitted (covers hospitality+care+startups-tech; 'charities' added to both constraint arrays after the generator omitted it — NOT YET APPLIED, apply once per tranche after re-reading live defs)
- [x] S3 DONE 2026-07-12: t1 migration pair APPLIED live (live constraints re-read first — generator had omitted 'charities' AND live 'test' source, both fixed pre-apply; sites rows for hospitality/care/startups-tech inserted active=false). Pool finalised via s5b_finalise.py (judged borderline restores: B&B tax, TOMS VAT, tronc; generalist-overlap dupes stay fenced) → 1,257 blog_topics seeded (111 with volume, priority deciles) via scripts/_seed_expansion_topics.py (generic, reusable for the other 5 sites)
- [x] S4 DONE 2026-07-12: analytics SDK (ConsentProvider/AnalyticsProvider, prefix hfp), API/admin routes, security headers, blog apparatus (feed.xml, llms-full.txt; 1 do-not-publish placeholder md satisfies check 06), vitest harness, GSC/Bing engine maps (charities backfilled too), full seo_persona in site_configs/hospitality.py. spinup_site_check 11 PASS (only 09-vercel-link GAP + 11-ga4 INFO remain, expected pre-launch); build + tests green, manager-verified independently
- [x] S5 DONE 2026-07-12: 3 launch calculators (tronc/tips PAYE+NIC, food & drink VAT checker, staff cost & rota margin) golden-tested, 30/30 vitest green; UK Hospitality Openings & Closures Index pipeline RUN FOR REAL (442 CH API pulls in pipeline/raw/, 22 quarters, pub-count headline 42,280, /research page + embed live in build); house_positions.md 28 positions + rates_ledger.json 32 entries, producer + Haiku-checker second-pass verified (checker corrected licence-fee deductibility per BIM61405 and stale dividend rates; tronc NIC citation re-anchored NIM02935→NIM02922 across doc and calculators)
- [x] S6 launch-core content generated (2026-07-14): 24 pages (home + 6 /for sub-trade hubs + 5 service pages + 12 blogs) atop the S5 base + 3 tools + Openings/Closures Index; infra built to charities parity (blog/for/services/contact/about/thank-you/embed routes, LeadForm, schema, sitemap); build green (48 static pages), vitest 30/30; brand-agnostic corpus (renders via getSiteUrl/siteConfig), zero brand literals; internal-link audit + adversarial fact-review pass done. 24 wave-1 briefs written (Opus) + committed under briefs/hospitality/wave1/. predeploy_gate --brand-only to run at deploy prep.
- [x] S6b hardening + parity + wave-2 DONE 2026-07-15 (see section below); build + vitest GREEN, predeploy_gate --brand-only PASS
- [ ] S7 Vercel project + preview an01 pass + live battery (gates G3/G4) — HELD pending owner domain-register (G1)
- [ ] S8 domain-ready close-out: `sites.active=true`, tracker updated

## 2026-07-15 hardening + parity + wave-2 (branch expansion/phase-0, nothing deployed)

- **Phase 0 audit defects fixed:** broken internal links corrected, HP-code artefacts stripped, metaDescriptions trimmed to ≤155, breadcrumbs added.
- **Lead capture end-to-end:** /api/leads/submit route CREATED (was missing); `.env.local.example` added. Tranche-2+3 Supabase migrations APPLIED to prod 2026-07-15 (15 site keys verified live in `sites_site_key_check` + `leads_source_valid`); lead-source constraint smoke-tested for all 7 new keys (insert+rollback). Property /api/leads/notify allowlist addition still pending at tranche G1 deploy.
- **Legal/crawl parity (Property-grade):** privacy-policy + cookie-policy + terms pages; robots.ts 40-bot AI allowlist; static `public/llms.txt` (figures from rates_ledger, verified 2026/27-current); not-found.tsx + error.tsx; NEW SiteFooter component with legal links (site previously had no footer); sitemap additions; embed backlinks verified present.
- **AI/GEO parity-or-greater:** HowTo schema (howToSteps frontmatter) on procedural posts; WebApplication schema on all calculators; Dataset schema on the Openings & Closures Index (exceeds Property); Article dateModified; Organization enrichment (legalName Ashfield Trading Ltd, knowsAbout, sameAs = Companies House 16358723 only); BLUF/FAQ audits patched.
- **Wave-2 content:** 5 blogs + restaurant-count section on the Openings & Closures Index (REAL CH pull, SIC 56101/56102/56103, 191,895 active restaurants; re-run via `scripts/_hospitality_restaurant_count_pull.py`). Opus briefs in `briefs/hospitality/wave2/` + Sonnet workers + 2-track Opus QA.
- **QA gate findings all fixed manager-direct:** machine-games-duty howToSteps YAML corruption repaired; HP-code artefacts stripped; broken internal links corrected; metaDescriptions rewritten ≤155; em-dashes purged.
- **Admin analytics:** full suite (leads/trends/login/visitor) ported from charities.
- **DONE 2026-07-16:** blog_topics wave-2 head keywords marked used=true (explicit ids, scripts/_wave2_mark_used.py; non-pool-sourced briefs skipped). Deploy held on owner G1.

## Data layer

- Tranche migration pair emitted at scaffold time (see supabase/migrations/); rows insert `active=false`
- Lead notify allowlist: add `hospitality` to Property /api/leads/notify allowlist in the per-tranche Property deploy (the sole sanctioned live-site touch)

## External steps (HUMAN ONLY, gate the site going live)

- [ ] Buy the domain `brand-tbd-hospitality.invalid` and point DNS at Vercel (A/CNAME per Vercel domain UI)
- [ ] **Pre-attach refresh (same day the domain is bought):** run the rates-ledger lint + dated-reference sweep (tax-year mentions) over the corpus and patch stale figures BEFORE DNS attach
- [ ] Google Search Console: add property `sc-domain:brand-tbd-hospitality.invalid`, verify (DNS TXT), submit `/sitemap.xml`, Request Indexing on key pages (discovery failure is the number 1 new-site risk)
- [ ] Bing Webmaster Tools: import the site from GSC, add Bing verification code to niche.config.json
- [ ] GA4: create property, copy measurement id into `hospitality/niche.config.json` -> seo.google_analytics_id, add to `optimisation_engine/clients/ga4_config.py`, redeploy
- [ ] Real phone number into `hospitality/niche.config.json` -> contact.phone (placeholder ships as +44 20 0000 0000)
- [ ] Brand assets: `public/brand/primary-logo.png` + `public/brand/icon-alt.png` (OG image route depends on them)
- [ ] Resend routing ONLY if a partner firm is signed (partner CC only on partnered sites; otherwise leads route to owner inbox)
