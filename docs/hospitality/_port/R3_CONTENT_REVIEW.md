# R3: independent adversarial review, CONTENT AND CLAIMS, hospitality phases 2 to 6

Reviewer: R3 (content and claims track). Date 2026-09-29. Read-only: nothing edited, committed,
tagged, built, started or stopped, no subagents. Scratch scripts were written to the session
scratchpad and deleted.

BEFORE = source at `port-hospitality-phase0` (`36d2b4fe`), plus `hospitality/web/content/blog/*.md`
(byte-unchanged in this wave: `git diff --stat port-hospitality-phase0..577e22e2 -- hospitality/web/content`
is empty). AFTER = the served HTML on `http://localhost:3202` (`next start`, built from `577e22e2`),
and the source at `577e22e2`.

Server identity asserted first:
`curl -s localhost:3202 | grep -o '<title>[^<]*</title>'` returned
`<title>Specialist Hospitality Accountants UK</title>`. Kit at `1437cb9e`.

62 URLs fetched: the 59 in `/sitemap.xml` plus `/book`, `/thank-you`, `/complete`. All 200.
65 unique internal hrefs across those pages resolved: all 200, no `href="#"`.

---

## A) VERDICT

**FAIL.** Blockers 1. Gaps 5. Nits 3.

Sentence counts over `git diff port-hospitality-phase0..577e22e2 -- hospitality/web/src hospitality/web/content hospitality/niche.config.json`:

| class | count | notes |
|---|---|---|
| MOVED (byte-identical, same string added elsewhere or into a prop) | 16 | every label prop the wave feeds the kit |
| REMOVED | 2 | `"All sectors"`, `"All services"` - exactly the two back-link words the breadcrumb replaced, as expected |
| ADDED | 6 authored + 2 kit-default leaks | 4 of the 6 are on the permitted list; 2 are not |
| **CHANGED** | **1** | **the blocker below** |

The wave is disciplined: 290 of 290 FAQ questions and all 290 answers are visible outside the
script, no body link was lost on any route, every figure on the homepage stats band and the
six-row key-figures table is byte-identical with its original source link, the three testimonials
and their attributions are byte-identical with phase 0, no em-dash and no pipeline artefact appears
on any of the 62 URLs, and all seven nav labels are `niche.config.json` verbatim in its order.

One published sentence was nonetheless rewritten. Check 1 makes that a FAIL on its own terms, so
the verdict is FAIL rather than PASS-WITH-GAPS, and the fix is two words.

---

## B) GAPS, most severe first

### BLOCKER 1. A published FAQ answer was rewritten: two words dropped from the tronc answer

- `hospitality/web/src/data/hospitality-services.ts:77`. Renders on
  `http://localhost:3202/services/tronc-scheme-setup` (the first FAQ item) and in that page's
  `FAQPage` JSON-LD.
- Rule: check 1, "existing prose is never rewritten ... CHANGED (any sentence whose wording differs
  by a character: FAIL)".
- Before (`git show port-hospitality-phase0:hospitality/web/src/data/hospitality-services.ts | sed -n 77p`):
  `... See also our hospitality payroll service for how tronc payments sit inside your overall pay run.`
- After (`git show 577e22e2:...:77`):
  `... See also <a href="/services/hospitality-payroll">hospitality payroll</a> for how tronc payments sit inside your overall pay run.`
- The words `our` and `service` are gone. The link itself is correct and welcome (it is the
  restored anchor the brief names, and it renders as a real `<a>` inside the accordion answer:
  `curl -s localhost:3202/services/tronc-scheme-setup | grep -o 'See also <a href="/services/hospitality-payroll">hospitality payroll</a>'` returns one hit). The defect is that the link was
  installed by editing the sentence instead of wrapping it.
- Severity: blocker. It is the only rule-1 breach in the wave, and the file's own convention two
  entries above (`:70`, unchanged since phase 0) shows the non-destructive form:
  `<a href="/services/hospitality-payroll">hospitality payroll service</a>`.
- Minimal fix, one line, restores the original wording exactly:
  `... See also our <a href="/services/hospitality-payroll">hospitality payroll service</a> for how tronc payments sit inside your overall pay run.`

### GAP 2. A kit default sentence leaked onto 23 blog posts: "Free, no obligation. The form is just below."

- URL: all 23 `/blog/<category>/<slug>` pages. Source:
  `packages/web-shared/design/blog/BlogSidebarCta.tsx:67`, hardcoded with no prop to suppress it,
  mounted by `hospitality/web/src/app/blog/[category]/[slug]/page.tsx`.
- Rule: check 7 names `BlogSidebarCta` "Free, no obligation" as the risk; the permitted-new-strings
  list does not include it.
- Before: the string is absent from the whole hospitality tree at phase 0
  (`git grep -c -F "Free, no obligation" port-hospitality-phase0 -- hospitality/` = 0).
- After: 23 pages. `grep -l -F "Free, no obligation" *.html | wc -l` = 23.
- The builder's own comment at the mount site justifies it as introducing no new claim, and on the
  substance that is right, but it cites the wrong evidence (see NIT 7). The real precedent is
  `niche.config.json:131` `cta.sticky_secondary` = "Free, no-obligation reply within 24 hours",
  which is ledger row **C3, OWNER RULING 09-29: LEFT AS IS**. So "Free, no obligation" is a claim
  the owner has already ruled on, and only the second clause, "The form is just below.", is new
  wording. That clause is true here: `id="enquiry-form"` is present once on every post and the
  sidebar link targets it.
- Severity: gap, not a blocker. No new claim, but 23 published pages now carry a sentence nobody
  authored for this site, and a kit-default leak is exactly what check 7 exists to surface.
- Minimal fix: this is a kit gap, not a site one. Either add a prop to
  `BlogSidebarCta` to suppress or supply that footnote, or accept it and record it as a
  known-and-accepted string. Do not paraphrase it on this site.

### GAP 3. Two new "Source: ..." labels were authored on the research pages

- `hospitality/web/src/app/research/hospitality-openings-closures-index/page.tsx` (2 mounts,
  `ExampleFigureNote label="Source: Companies House"`) and
  `hospitality/web/src/app/research/uk-hospitality-insolvency-index/page.tsx:345,389`
  (`ExampleFigureNote label="Source: ONS Business Demography"`).
- Rule: the permitted new strings are the config labels, the listed breadcrumb labels and
  "Common questions". These are neither.
- Before: `git grep -F "Source: Companies House" port-hospitality-phase0 -- hospitality/` = 0 hits;
  same for "Source: ONS Business Demography". The other two labels the wave uses,
  "Source: Food Standards Agency Ratings API" and
  "Source: Insolvency Service, Company Insolvency Statistics", DO exist at phase 0 and are reuse.
- After: four figure notes across two research pages carry the two new labels.
- Not a re-sourcing and not a mis-sourcing: I traced every mount. On the insolvency page the two
  Insolvency Service labels sit under `AnnualInsolvencyChart` and `MonthlyInsolvencyChart` and the
  two ONS labels sit under `SurvivalCurveChart` and the cohort survival table, which is exactly the
  split the page's own unchanged methodology sentence at `:257-259` states. Both new labels are
  substring-faithful to words already on their own page ("drawn from Companies House SIC 55/56 data"
  on the openings page; "and ONS Business Demography" on the insolvency page). Nothing was
  reformatted, rounded or re-attributed.
- Severity: gap. Two authored strings outside the permitted list, on published pages.
- Minimal fix: owner call. Either widen the permitted list to cover source attributions derived
  verbatim from the page's own methodology sentence, or drop the `label` on those four mounts and
  let them fall back to the kit default.

### GAP 4. The `ExampleFigureNote` kit default renders on all three calculator pages

- URLs `/calculators/food-drink-vat-rate-checker`, `/calculators/staff-cost-rota-margin-calculator`,
  `/calculators/tronc-tips-paye-nic-calculator`. Source:
  `hospitality/web/src/app/calculators/[slug]/page.tsx:112`, `<ExampleFigureNote className="mt-4" />`
  with no `label`, so it prints `packages/web-shared/design/primitives/ExampleFigureNote.tsx:24`'s
  default, "Example figures displayed".
- Before: absent from the hospitality tree at phase 0 (0 hits).
- After: 3 pages.
- Severity: gap. It is a hedge rather than a claim, and the builder's comment argues correctly that
  the calculator output IS a worked example off the reader's own figures. But it is a new string on
  three published pages and it was not authored for this site.
- Minimal fix: none needed on truth grounds. Record it as accepted, or feed a `label` drawn from the
  tools' own strings if the owner wants site wording. Note the same comment records that no
  `NoticeCard` was mounted because no "estimates / check your own figures" sentence exists to feed
  one: I re-ran that check, `grep -rn 'estimate\|check your own' hospitality/web/src/lib/calculators/tools`
  = 0. The comment is true.

### GAP 5. `HowTo` JSON-LD publishes 17 steps that no reader can see, on 3 posts

- URLs `/blog/business-rates/small-business-rates-relief-cafes` (5 steps),
  `/blog/licensed-trade/machine-games-duty` (6), `/blog/licensed-trade/awrs-checks` (6).
  Source: `hospitality/web/src/app/blog/[category]/[slug]/page.tsx:189-192`.
- Measured on machine-games-duty: all 6 `step.name` and all 6 `step.text` strings are absent from
  the visible text of the page.
- Pre-existing, not wave-introduced: the same `buildHowToJsonLd` block with the same guard sits at
  `port-hospitality-phase0:.../[slug]/page.tsx:121-124`. But it is the exact sibling of ledger row
  **E1** ("Q and A published to search engines that a reader cannot see on the page",
  **CORRECT IN PLACE**), and this wave corrected the FAQ half properly - all 290 FAQ questions and
  answers now render, server-side, including inside closed accordions (`forceMount`) - while
  leaving the HowTo half untouched. E1's rule catches HowTo too; the ledger row only named FAQs.
- Severity: gap. Newly worth naming because the wave has just demonstrated the fix pattern.
- Minimal fix: render `post.howToSteps` on those three posts through a kit list, fed the existing
  frontmatter strings, the same way the FAQs are now fed. Author nothing.

### GAP 6. `leadConsentText` is not in the server HTML on 30 of the 56 pages that carry a form

- 30 pages: `/`, `/about`, `/contact`, `/for` and its 6 children, `/services` and its 5 children,
  `/calculators`, `/research` and its 3 children, `/blog` and its 8 category hubs.
- Rule: "the shared `leadConsentText` on every form".
- Measured: `snip = "specialist partner network who will contact you"` (from
  `hospitality/web/src/config/site.ts:12`); of the 56 served pages containing `<form`, 26 carry it
  and 30 do not.
- Cause, and it is pre-existing: `LeadForm` is a two-step client form and the consent notice sits in
  the step-2 branch (`hospitality/web/src/components/forms/LeadForm.tsx:399-406`). The 26 that do
  carry it use `MiniCapture`, which prints it unconditionally (`MiniCapture.tsx:159`). The wave's
  diff on `LeadForm.tsx` is `neutral-*` to `slate-*` plus the `focusRing` import and nothing else,
  so the step gating is identical to phase 0.
- Severity: gap (pre-existing, carried forward). The text IS wired on every form and IS shown before
  submission; it is simply not in the first paint, so no crawl or static sweep can see it.
- Minimal fix: none required by this wave's rules. If the owner wants it provable from the HTML,
  render the notice in step 1 as well as step 2. That is a placement change, not a wording change.

### NIT 7. The builder comment justifying the `BlogSidebarCta` footnote cites the wrong evidence

- `hospitality/web/src/app/blog/[category]/[slug]/page.tsx`, the "KIT GAP, LOGGED" comment:
  "this site already publishes 'no obligation' on /book:36, in CalcResultCta.tsx:12 and in both
  existing LeadCTAPanel descriptions, so the sentence introduces no new claim here."
- Verified: `/book:36` at phase 0 does say "no obligation" (`... will call you then, no obligation.`);
  `CalcResultCta.tsx:12` does ("No obligation, and we reply within one working day."); both
  `LeadCTAPanel` descriptions do. So the cited half is true.
- But the sentence being adopted is "**Free**, no obligation. **The form is just below.**", and none
  of the three cites covers the word "Free" or the second clause. The actual precedent for
  "Free, no-obligation" is `niche.config.json:131` and `web/public/llms.txt:68`, i.e. ledger row C3,
  which the comment does not mention.
- Severity: nit. The conclusion is right, the evidence trail is incomplete.
- Minimal fix: cite C1/C3 in the comment.

### NIT 8. The `/for` breadcrumb crumb is a route name, not a page title

- `/for` renders `Home / For`, in the visible trail and in the `BreadcrumbList`. The page's `<h1>` is
  "Specialist accounting for every hospitality sector." and its `<title>` is
  "Hospitality Sectors We Work With | ...". Nothing on the site publishes "For" as a page name.
- Rule: "breadcrumb labels that equal existing page titles".
- Already logged by the builder, honestly, at `hospitality/web/src/app/layout.tsx`: "The labels are
  raw route names ('For', not 'Who we help'); rewording them is a copy change, not a chrome change,
  and is an open owner question, so nothing is authored here." That is the correct call under the
  rules, and the label matches the nav item it mirrors (`niche.config.json` navigation, `"For"`).
- Severity: nit, and it is the same string the primary nav has always published.
- Minimal fix: owner decision, listed in D below. Do not let a reviewer or builder reword it.

### NIT 9. The one `acceptedAnswer.text` on the site containing raw HTML is the answer the blocker edited

- `/services/tronc-scheme-setup`, `FAQPage` -> first `mainEntity` -> `acceptedAnswer.text` now
  contains `<a href="/services/hospitality-payroll">hospitality payroll</a>`.
- Measured across all 62 served pages: exactly 1 page has an `<a ` inside an `acceptedAnswer.text`,
  and it is this one. All other FAQ answers on the site are clean, including the 23 posts.
  (`hospitality-services.ts` carries 8 raw anchors in total, up from 7 at phase 0; the other 7 are
  in `body` and `detail` fields, which never reach `buildFaqJsonLd`.)
- Severity: nit, subordinate to the blocker. Fixing the blocker as written keeps the anchor and
  therefore keeps the markup in the schema string.
- Minimal fix: when the blocker is fixed, strip tags in `buildFaqJsonLd` before emitting
  `acceptedAnswer.text` (`hospitality/web/src/lib/schema.ts`), so the visible link survives and the
  machine answer is plain text. One helper, applies to the whole site.

---

## C) CLEARED

| # | check | command | decisive line |
|---|---|---|---|
| 1 | source diff, sentence level | `git diff -U0 port-hospitality-phase0..577e22e2 -- hospitality/web/src hospitality/web/content hospitality/niche.config.json`, then a prose extractor over every `+`/`-` line (quoted strings, template literals and JSX text nodes with >= 5 word tokens, comments and class strings excluded) | 2 removed-only prose strings and 28 added-only. Of the 28, 13 are test assertions, CSS gradients or comment fragments; the remaining 15 were each grepped against the whole phase-0 tree (`hospitality/` + `packages/web-shared/`) and 16 label props resolved MOVED byte-identical. REMOVED = `"All sectors"` (`for/[slug]/page.tsx:64`) and `"All services"` (`services/[slug]/page.tsx:64`), both expected. `"Need help with your hospitality business accounts?"` left `blog/[category]/[slug]/page.tsx:187` and is now fed from `niche.config.json` `blog.cta_heading`, the same string, still rendering. CHANGED = 1, the blocker |
| 1b | every added label prop | `git diff ... \| grep '^+' \| grep -oE '(eyebrow\|formTitle\|submitLabel\|label\|title)="[^"]+"' \| sort -u` then `git grep -F` each at phase 0 | 27 distinct label strings. All present at phase 0 except `"Your callback"` (permitted), `"Source: Companies House"` and `"Source: ONS Business Demography"` (GAP 3). "Get started", "Real outcomes", "What operators say", "Common questions", "Frequently asked questions", "Complete your details", "Confirmed", "You are all set", "Hospitality tax figures at a glance", "Key hospitality compliance figures", "Union Jack flag", "Request callback", "Send enquiry", "Get in touch" all verbatim reuse, with the phase-0 file:line for each |
| 2 | rendered freeze, 21 routes | per route, prose extracted from the phase-0 source file (JSX text nodes and quoted strings, comments stripped) and checked against the served visible text of `<p> <li> <h1>-<h4> <blockquote> <td> <th> <figcaption> <summary>`, normalised for entities, curly quotes and inline-tag splits | 0 sentences lost. 46 raw hits on `/` and 5-11 per other route all resolved as JSX-punctuation or metadata false positives and were re-checked individually: the business-rates multipliers sentence (38.2p / 43p / £51,000 / £499,999), the Companies House openings standfirst, the blog-band standfirst, "Calculators built for hospitality operators.", the AWRS and RHL card bodies, `/about`'s "Because tronc and tips compliance ..." and its trading-name paragraph, `/for`'s "A restaurant, a pub and a hotel ..." and "Each sector has its own rules.", `/services`' "Start with annual compliance ...", "Tell us about your hospitality business and we will tell you what is required and how we can help." and "Not sure which service you need?", `/for/restaurants`' "Other sectors we work with" - **all RENDERED**. The only strings absent are the two phase-0 deletions (B3's "covered the accountancy fee several times over", B5's "We deal with them every week across our hospitality client base."), both confirmed absent from the phase-0 source too, i.e. correctly still deleted |
| 3 | figures | phase-0 vs `577e22e2` `keyStats` and key-figures table, plus the pre-hydration band in the served HTML | Table: all six rows byte-identical, figure, value and `href` (`£90,000 (rolling 12 months)`, `£12.71 per hour`, `15%`, `£10,500 per tax year`, `Up to £1,000,000`, `100% business rates relief`). StatsCounter: the four labels and four gov.uk hrefs unchanged; `value: "£12.71"` and `value: "15%"` became `target: 12.71, decimals: 2, prefix: "£"` and `target: 15, suffix: "%"`. **T15 holds**: the served pre-hydration band reads `£90,000`, `£` + `12.71`, `15` + `%`, `£10,500`. No figure rounded, reformatted or re-sourced. FAQ, calculator-explainer and research figure-note numbers unchanged (`hospitality/web/content` diff empty; `hospitality/web/src/lib/calculators` untouched) |
| 4 | quotes | `git show <ref>:hospitality/web/src/app/page.tsx` `const testimonials` both refs | All three `quote` and all three `attribution` strings byte-identical. B3's deleted clause stays deleted. Served: three `<blockquote>` items, the footnote "Composite accounts based on patterns across our hospitality clients. Names and specific figures anonymised. The compliance situations described are real." present, 0 rating stars, 0 invented initials (`rounded-full` initials divs = 0) |
| 5 | links | per-route phase-0 source hrefs vs served hrefs on 14 routes; then all 65 unique internal hrefs across 62 pages fetched | `lost=none` on every route. 65/65 return 200. 0 `href="#"`. The restored `/services/hospitality-payroll` anchor renders as a real link inside the FAQ answer. Homepage blog band links `/blog/licensed-trade/alcohol-duty`, `/blog/hospitality-vat/is-there-vat-on-dog-food`, `/blog/business-rates/retail-hospitality-and-leisure-relief-scheme` - all three are real posts in the sitemap. `/blog` still lists 23 posts (no 12-post cap here) and keeps all eight category counts |
| 6 | schema vs page | every `ld+json` on all 62 pages parsed and reconciled against the visible text | 0 parse failures. **Exactly one** `BreadcrumbList` per route (0 on `/`, `/book`, `/thank-you`, `/complete`, which show no trail), items equal the visible trail on all 11 checked. FAQ: 290 questions, 0 not visible; 290 answers, 0 not visible. `BlogPosting.headline` = visible `<h1>` on all 23 posts with `datePublished`, `dateModified` and `author` present. `Service` on all 6 `/services/*` and 6 `/for/*`; `WebApplication` on all 3 calculators; `Dataset` on all 3 research pages; `Organization` once as `https://www.hospitalitytax.co.uk#organization` on every page with `areaServed: {"@type":"Country","name":"United Kingdom"}`. **No `priceRange` anywhere** (ledger E4 fix holds) |
| 7 | claims / kit defaults | every default string read out of `LeadCTAPanel.tsx`, `WhatToExpectCard.tsx`, `TestimonialsSection.tsx`, `BlogSidebarCta.tsx`, `ExampleFigureNote.tsx`, `NoticeCard.tsx`, then grepped across all 62 served pages | 11 of 13 default strings leaked 0 pages, including every fee and promise default: "Free first call, then a fixed fee in writing" 0, "Book your free first call" 0, all four `WhatToExpectCard` items 0, "What to expect" 0, "Testimonials" 0, "What landlords say" 0, "Anonymised feedback from landlords and investors we have worked with." 0, "Book a call" 0. Two leaked: GAP 2 and GAP 4. Re-running the ledger's rules over the rendered pages found no new turnaround promise, fee, regulator or qualification claim, client count, superlative or "most businesses qualify" |
| 8 | comments that claim copy facts | five verified against `port-hospitality-phase0` | (a) blog CTA triple "already published in hospitality/niche.config.json" - **TRUE**, `cta_heading`/`cta_body`/`cta_button` all at phase 0 `:135-137`, and the same heading the post's closing panel renders. (b) `/services` hub panel strings "already publishes on the identical panel (src/app/services/page.tsx:160-166), copied verbatim" - **TRUE**, phase 0 `services/page.tsx:82-83` carries both strings and `577e22e2:160-166` is the cite's own file. (c) category hub "`summary` is fed post.metaDescription, which is the exact string this hub's cards already published" - **TRUE**, phase 0 rendered `{post.metaDescription}` at `blog/[category]/page.tsx`. (d) homepage band 14 "every string in the list is post frontmatter this site already publishes" - **TRUE**, `content/blog` diff empty, titles and summaries read through `getAllPosts()`. (e) `getRelatedPosts` "had zero consumers until the blog post template mounted the kit RelatedArticles rail" - **TRUE**, `git grep getRelatedPosts port-hospitality-phase0` returns only the definition. (f) layout nav "niche.config.json navigation verbatim, in its order, with its labels and hrefs unchanged: all seven probed 200" - **TRUE**, seven items, order matches, all 200. One comment is incomplete: NIT 7 |
| 9 | config | `git diff port-hospitality-phase0..577e22e2 -- hospitality/niche.config.json` | Exactly three added lines, `label_topics: "Topics"`, `label_library: "The library"`, `related_heading: "Keep exploring"`. Nothing else changed. All three render: `/blog` shows "Topics" over the eight category chips (counts intact) and "The library" over the post list; the post template shows "Keep exploring" over the related rail |
| 10 | meta | `git diff ... \| grep -E 'metadata\|title:\|description:\|canonical\|openGraph'`, plus `<title>`, description, canonical and og on all 62 served pages | No `export const metadata` block changed on any route, and `hospitality/web/content` is byte-unchanged, so every post and hub title and description is untouched. 0 doubled `| Hospitality Tax` suffixes. Canonical present on 61 of 62; the one absent is `/thank-you`, which is `robots: { index: false }` at phase 0 too, unchanged |
| 11 | artefacts, all 62 URLs | byte-level grep on the saved HTML | em-dash U+2014 **0 files**; en-dash U+2013 **0 files**; `(HP` 0; "verify at build" 0; `£` literal 0 (an earlier 40-file hit was my own harness counting real `£` characters, retracted); `[object Object]` 0; `&lt;a href` as text 0; `undefined` / `NaN` / bare `null` as visible text 0; `href="#"` 0 |
| 12 | known and accepted, not reported as gaps | | the phase-1 dropped footer sentence "Specialist hospitality accountants. Editorial content only..." (R1 row 4, recorded, confirmed still absent) and the footer brand column's lost eyebrow/heading/"Contact us" link; the three blog labels and "Your callback"/"Your enquiry"; the stats band ground change; the eleven `OWNER RULING 09-29: LEFT AS IS` ledger rows, all re-verified present on the rendered pages (B1 three quotes, B2 composite footnote, C1-C4 the 24-hour promise on 11 surfaces, F1 the 24-month retention sentence, F2 the cookie-policy advertising sentence, F3 "published grading rubric"), plus B4 "Within a week of contacting the team" still present as ruled |
| 12b | phase-0 corrections survive | grep on the served HTML | G1 Tips Act wording: "in force since 1 October 2024" on 10 pages, the false "came into force on" form 0. G2 VAT hot-food test: "five tests, not one" and the five-test enumeration citing VAT Notice 709/1 live on `/services/hospitality-vat`. The restored `/services/hospitality-payroll` FAQ anchor renders (subject to the blocker's wording). E4 `priceRange` gone. E5 the four dead `/calculators/*` links: 0 non-200 internal hrefs, so all fixed slugs hold. E1 FAQ visibility: corrected, 290/290 |

Pre-existing defects carried forward, verified NOT introduced by this wave (diff shows no change to
the producing code, so not reported as gaps): `Service.name` differs from the `<h1>` on all six
`/for/*` pages (e.g. "Accounting for Restaurants" vs "Specialist accounts, VAT and payroll for
restaurants."); the insolvency index's `Article.headline` is the short report title while its `<h1>`
is the 117.6% sentence; the two research `Article` nodes carry no `author`.

---

## D) OPEN QUESTIONS for the owner

1. **Two words in one FAQ answer.** The tronc page's answer used to say "See also **our** hospitality
   payroll **service**". Adding the link dropped both words. Fix restores them and keeps the link.
   Confirm that is the fix you want rather than accepting the shorter wording.
2. **"Free, no obligation. The form is just below."** is now on 23 blog posts, printed by the shared
   kit with no way to turn it off. You have already ruled to keep "Free, no-obligation reply within
   24 hours" elsewhere. Keep this one as-is, or have the kit changed so the site can choose?
3. **"Source: Companies House" and "Source: ONS Business Demography"** are four new small labels
   under charts and tables on two research pages. Each repeats words already in that page's own
   methodology paragraph. Keep them, or leave those figures unlabelled?
4. **"Example figures displayed"** now sits under all three calculators. It is a hedge, not a claim,
   and it came from the shared kit rather than from us. Keep, or reword in our own voice?
5. **The breadcrumb on `/for` reads "For"**, because that is the word the top navigation has always
   used. It is a route name, not a page name. Do you want a real label there ("Sectors", "Who we
   work with"), and if so does it change the nav too? Nobody should touch this without your word.
6. **Three how-to guides publish their step lists only to search engines**, never to the reader: the
   SBRR cafes post, machine games duty, and AWRS checks. This is not new, but the same defect in the
   FAQs was just fixed. Do you want the steps rendered on the page as well?
7. **The data-sharing notice appears at step 2 of the main enquiry form**, so it is not in the page's
   first paint on 30 pages. Every visitor sees it before submitting. Do you want it shown from step 1
   so it is visible without interacting?
