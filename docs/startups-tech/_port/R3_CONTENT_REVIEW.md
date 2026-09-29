# R3: independent adversarial review, CONTENT AND CLAIMS, startups-tech phases 2 to 6

Reviewer: R3 (content and claims track). Date 2026-09-29. Read-only: nothing edited, committed,
tagged, built, started or stopped. Scratch scripts were written to the session scratchpad and deleted.

BEFORE = source at `port-startups-tech-phase1` (`6e02711e`) plus `startups-tech/web/content/blog/*.md`
(unchanged in this wave). AFTER = the served HTML on `http://localhost:3201` (`next start`, current
working tree). Server identity asserted first:
`curl -s localhost:3201 | grep -o '<title>[^<]*'` returned
`<title>Founder Tax Partners | Accountants for Funded and Scaling UK Startups`.

81 URLs fetched: the 68 in `/sitemap.xml`, plus `/book`, `/complete`, `/thank-you`, the four
`/embed/<calculator>` routes, `/llms.txt`, `/llms-full.txt`, `/robots.txt`, `/feed.xml`,
`/sitemap.xml`. All 200. The five `/embed/<research-slug>` URLs named in the brief are 404: this
site's embeds are the four calculator embeds, not research embeds (see FALSE PREMISES 1).

---

## A) VERDICT

**PASS-WITH-GAPS.** Blockers 0. Gaps 6. Nits 2.

No published sentence was changed, added or removed on any existing page. The wave's authored text is
19 distinct structural labels and five breadcrumb constants, every one of which is a verbatim reuse of
a phrase the site already published. Every gap below is in the machine layer or is a pre-existing
site defect that this wave carried forward, not a rewrite of prose.

Finding nothing would have been a failed review, so the six gaps are stated at the severity they
deserve: none of them is an owner-ruling breach, three of them are new machine-layer claims this wave
introduced, and three are pre-existing items that this wave made newly worth naming.

---

## B) GAPS, most severe first

### G1 (gap) Article JSON-LD `headline` does not match the visible h1 on 19 of 32 posts

- URL: every `/blog/<category>/<slug>` page. Source: `startups-tech/web/src/app/blog/[category]/[slug]/page.tsx:216`.
- Rule: brief check 3, "Article JSON-LD on posts is NEW: report its fields and that they match the
  visible headline, dates and author."
- Before: no Article JSON-LD on any post (confirmed: `git show port-startups-tech-phase1:...` has no
  `"@type": "Article"`).
- After: `headline` is fed from the post's `title` frontmatter, while the rendered `<h1>` is fed from
  the post's `h1` frontmatter. On 19 of 32 posts those two strings differ. Example,
  `/blog/seis-and-eis/seis-vs-eis-explained`:
  - schema `headline`: `"SEIS vs EIS Explained: Which Venture Capital Scheme Fits Your Raise?"`
  - rendered `<h1>`: `"SEIS vs EIS Explained: Which Scheme Fits Your Company and Your Raise?"`
- Severity: gap. Nothing false is asserted, but a new machine-layer headline now tells a search engine
  a title no reader sees, on 19 pages.
- Minimal fix: feed `headline` from the same value the `<h1>` renders (`post.h1 ?? post.title`) in
  `buildArticleJsonLd`'s call site, one line. Do not touch either frontmatter field.

Full list of the 19 posts: eris-rd-intensive-30-percent, rd-additional-information-form-guide,
rd-claim-notification-6-month-deadline, founder-salary-vs-dividends-2026-27,
startup-cfo-pay-and-fractional-cfo-cost, eis3-certificate-explained,
how-to-apply-for-seis-eis-advance-assurance, seis1-eis1-compliance-statements, seis-vs-eis-explained,
emi-disqualifying-events, emi-option-valuation, growth-shares-explained,
option-pool-basics-uk-founders, section-431-elections, stock-vesting-explained,
val231-emi-valuation-form-walkthrough, what-is-emi, uk-tech-company-formation-boom,
uk-tech-startup-5-year-survival-rate.

### G2 (gap) The new Article JSON-LD carries no `datePublished` and no `author`, and files the publication date as `dateModified`

- URL: all 32 posts. Source: same call site.
- Before: no Article node at all, so no date or author claim existed.
- After: the node emits `headline`, `description`, `url`, `dateModified`, `publisher`,
  `mainEntityOfPage`. `dateModified` is set from the post's `date:` frontmatter, which is the
  publication date. There is no `datePublished` and no `author` key on any of the 32 posts.
- Severity: gap. Two effects. First, every post now tells a search engine it was *modified* on its
  publication date, which is a claim the site cannot support for any post that has since been edited.
  Second, the absence of `author` is correct for this site (the `author:` frontmatter is empty on all
  32 posts, and inventing one would be a credential claim), so that half should stay as it is.
- Minimal fix: emit `datePublished` from the same `date:` value and drop `dateModified`, or emit both
  only where a distinct modified date exists. Leave `author` absent.

### G3 (gap) Five research routes render the page's full title sentence as the current breadcrumb crumb

- URLs: `/research/rd-tax-relief-index`, `/research/startup-formation-survival-index`,
  `/research/tech-startup-survival-index`, `/research/uk-tech-formations-index`,
  `/research/uk-tech-funding-reliefs-index`. Source: the `const CRUMB = ...` added at the top of each
  of the five page files.
- Rule: brief check 5, "confirm each is a label not a sentence".
- Before: a single back-link reading `Research`, no BreadcrumbList.
- After: `Home / Research / R&D Tax Relief Usage Index: the post-clampdown squeeze on tech` (rendered
  and in schema, identical). The crumb is 57 characters of sentence, and on each of the five pages it
  repeats the `<h1>` word for word, immediately above that `<h1>`.
- Severity: gap, not a blocker: the words are the site's own, taken verbatim from the `/research` hub's
  own `reports[].title`, so no new sentence was authored. But it is the one place in the wave where an
  authored string is a sentence rather than a label, and it duplicates the h1 on screen.
- Minimal fix: shorten the five `CRUMB` constants to the report's short name only (the part before the
  colon, e.g. `R&D Tax Relief Usage Index`), which is still the site's own wording. This is an owner
  call, not a reviewer call, because it changes a visible string.

The same shape appears on posts: the last crumb is `post.title` while the `<h1>` below it is
`post.h1`, so on the 19 posts in G1 the breadcrumb shows one wording and the headline another. Same
fix decision.

### G4 (gap, KNOWN, site defect) The hospitality placeholder is served on 36 pages

- URL: all 32 posts (inline capture) and all four `/calculators/<slug>` pages.
  Source: `startups-tech/web/src/components/calculators/MiniCapture.tsx:149`.
- Served text: `placeholder="e.g. pub with 12 staff, need help with tronc setup and food VAT"` on a
  startup and tech accountancy site.
- Origin: `git log -S"tronc" -- .../MiniCapture.tsx` returns a single commit, `0d64c4f16`
  ("Expansion (site 5): build full startups-tech launch core under working brand"). It pre-dates the
  port entirely. This wave did not introduce it and did not fix it.
- Severity: gap (known, going to mop-up). It is a visible content defect on 36 pages, which is a
  larger blast radius than "the calculators".
- Minimal fix: replace the example with a startup one. Owner wording call.

### G5 (gap) Raw HTML inside `acceptedAnswer.text` is on 11 pages, and it is not the six the build receipts name

- URLs: the six `/services/<slug>` and the five `/for/<slug>` pages.
  Source: `buildFaqJsonLd` in `startups-tech/web/src/lib/schema.ts:46` (file unchanged in this wave).
- Measured, `<` characters inside `acceptedAnswer.text` per URL:
  `/services/core-compliance` 12, `/services/emi-scheme-setup` 10, `/services/fractional-cfo` 14,
  `/services/rd-tax-claims` 10, `/services/seis-eis-advance-assurance` 8, `/services/share-schemes` 8,
  `/for/fintech-startups` 10, `/for/funded-startups` 14, `/for/pre-seed-founders` 8,
  `/for/saas-companies` 4, `/for/software-development-companies` 4.
  Homepage: 0. All four `/research/*` FAQ pages: 0. All 32 posts: 0.
- Severity: gap, pre-existing and unchanged by this wave, but W2's receipt names the wrong page set
  (see FALSE PREMISES 2), so the mop-up scope would have been wrong.
- Minimal fix: strip tags in `buildFaqJsonLd` the way the blog template now does. One function, and it
  changes no rendered text.

### G6 (gap) Kit default lead-panel copy reaches 14 pages, not one, and it is a fee claim

- URLs: `/about`, `/for`, the five `/for/<slug>`, `/services`, the six `/services/<slug>`.
- Served: eyebrow `Free first call, then a fixed fee in writing` and form title
  `Book your free first call`, both supplied by
  `packages/web-shared/design/marketing/LeadCTAPanel.tsx` defaults because no prop is passed.
- WHEN it arrived: `git log -S"LeadCTAPanel" -- startups-tech/web/src/app/about/page.tsx` returns one
  commit, `5f2e63da` (2026-09-28, "phase 0 parity with Property"). `git merge-base --is-ancestor
  5f2e63da port-startups-tech-phase1` succeeds, so it is pre-wave, not introduced here. The kit
  default itself comes from estate commit `815ae7de4`.
- Contradiction check: no startups-tech page contradicts the free-call or fixed-fee wording.
  `startups-tech/niche.config.json:9` already publishes "We agree the scope and a fixed fee in writing
  before any work starts." The rest of the site says "free review call" (`/book` h1, the
  BookingPicker submit label) rather than "free first call", so the site now offers the same thing
  under two names. That is a wording inconsistency, not a contradiction.
- The homepage, which is the one page that newly adopted `LeadCTAPanel` in this wave, passes every
  string explicitly (`eyebrow="Get started"`, `title="Talk to a startup specialist"`,
  `formTitle="Get in touch"`, `startups-tech/web/src/app/page.tsx:819-825`). Zero kit copy leaked
  there. That part of the wave is clean.
- Severity: gap, owner item. A fee promise on 14 pages arrived without an authoring decision.
- Minimal fix: none by a builder. Owner decides whether the wording is wanted; if it is, pass it
  explicitly rather than inheriting it.

### Nits

- N1 `startups-tech/web/src/app/page.tsx`: the decorative `&#10003;` glyph in the closing proof-point
  list is gone (it was the only removed digit-bearing token in the whole wave). Decoration, not a
  figure. The four proof-point titles and sub-lines are unchanged, including "24-hour response /
  Usually the same working day" (a ledger row the owner left).
- N2 The homepage emits a second `Organization` node that is a bare `{@context, @type, @id}` stub
  pointing at the same `#organization` id as the `AccountingService` node. It is a reference, not a
  duplicate entity, and `src/app/layout.tsx` and `src/lib/organization-schema.ts` are byte-identical
  to the tag, so this wave did not cause it. Not graded.

---

## C) CLEARED, one line per mandatory check

**Check 1, word-level prose diff, 25 public routes + 8 posts + 4 embeds.**
Method: extracted every string literal and JSX text node from each changed file at the tag and now,
CSS-filtered, and took the multiset difference; then swept the served HTML of all 76 HTML routes for
any text fragment absent from a corpus of every `.tsx/.ts/.md/.json/.txt` file at the tag plus
`packages/web-shared`.
Decisive output: `python prose.py $(cat files.txt)` -> **zero removed prose strings across all 34
changed files** (the two "removed" lines were extractor artefacts: `getCategorySlug(p) === category);
return (` and a className fragment). `python added_strings.py` -> the only authored strings longer
than three words added anywhere in the wave are the five research `CRUMB` constants, each a verbatim
copy of the `/research` hub's existing `reports[].title`.
(a) sentence changed: **0**. (b) new structural labels: **19**, listed under check 5.
(c) newly visible machine data: `python faq.py` -> `posts matched: 32 faq pairs: 205 mismatches: 0`.
The W2 `<details>` FAQ block is rendered on all 32 posts; **205 question/answer pairs** now visible;
every rendered answer is identical to the `faqs:` frontmatter that already fed the FAQPage JSON-LD.
(d) kit default copy: see G6, established as pre-wave (`5f2e63da`, ancestor of the tag).

**Check 2, figures, six research routes and four calculators.**
Method: digit-bearing token multiset from CSS-stripped, comment-stripped prose at the tag vs now.
Decisive output: `python figs2.py` -> the only removed token in the entire wave is `10003` on
`page.tsx`, which is the HTML entity for a decorative tick, not a figure. Every added token is a
Tailwind shade fragment (`600`, `700`, `800`, `950`). `#4f46e5` is removed from five research files
and `TechFundingReliefsCharts.tsx` and replaced by `var(--color-primary-600)`; `#c7d2fe` ->
`var(--color-primary-200)`; `#78716c` -> `currentColor`. **Zero figure drift. W5R's claim holds.**
`src/data/*`, `src/lib/*`, `src/config/*`, `content/`, `niche.config.json` are byte-identical to the
tag (`git diff --stat port-startups-tech-phase1 -- ...` empty), so no rendered figure has a changed
input.

**Check 3, JSON-LD per URL.**
`python jsonld.py` over all 76 HTML routes: **every block parses, 0 parse failures**.
Organization: exactly one `AccountingService` node per page at `@id
https://www.foundertaxpartners.co.uk#organization`; the homepage additionally carries a bare
reference stub at the same id (N2, pre-existing).
FAQPage: exactly one per page where present; schema question count equals rendered question count on
every page (blog: 8 vs 8, services 4-5, audience 4-5, research 5-6 rendered as `h3`+`p`, calculators
5-8 rendered as `h3`+`p`); **every `acceptedAnswer.text` was found in the served body** after
normalising to lowercase alphanumerics with tags stripped and entities decoded: `missing: []` on all
52 FAQ-bearing URLs, and 0 crypto-style false positives because the match is on the full normalised
answer, not a prefix.
BreadcrumbList: exactly one per page where present, **0 pages with two**. Rendered crumbs match the
schema item names on every page checked (`Home / All services / R&D Tax Claims`,
`Home / All company types / SaaS Companies`, `Home / Research / R&D Tax Relief Usage Index: ...`,
`Home / Blog / SEIS and EIS / SEIS vs EIS Explained: ...`).
W3's crumb-rename claim, confirmed from the diff: the tag's `services/[slug]` and `for/[slug]` each
hand-rolled a `buildBreadcrumbJsonLd` script whose middle item was `{ label: "Services", href:
"/services" }` / `{ label: "For", href: "/for" }` (wave.diff lines 3447 and 1464, both removed) while
the *visible* element was a back link reading "All services" / "All company types". After: one
`Breadcrumb` component emits both the rendering and the schema, both reading "All services" /
"All company types". So the schema name changed; **the word a reader sees did not**. That is a
correction of a pre-existing schema-vs-render mismatch, not a copy change.
Raw HTML in `acceptedAnswer.text`: see G5 for the per-URL `<` counts.
Article on posts: new, 32 pages, fields `headline, description, url, dateModified, publisher,
mainEntityOfPage`. Dates: `dateModified` is visible on the page on all 32 (0 mismatches). Headline:
19 mismatches, G1. Author: absent, correct.

**Check 4, sweep by rule over the served HTML of all routes.**
`python sweep.py` over all 81 fetched documents:
em-dash (U+2014) **0**; `organize`/`optimize`/`analyze`/`favor`/`center` as prose **0** (the single
`organiz` hit is the literal schema type name `Organization` in `/llms-full.txt`); `color` as prose
**0**; `license` as a verb **0**; `(HP` **0**; "verify at build" **0**; `TODO` **0**; `lorem` **0**;
escaped `&lt;a ` or a visible `<strong>` **0**; `[object Object]` **0**; `undefined` **0**; `NaN`
**0**; empty headings **0**; duplicated `h1` **0**; doubled title suffix **0**.
The only non-zero row is `h1count=0`, on the four calculator embeds (deliberate, the embed contract
gives them no chrome and no h1) and on the five non-HTML documents.

**Check 5, authored labels, verified against the served pages.**
Every label below is served, is a label and not a sentence, and is UK-spelt. The complete set of
authored strings the wave adds (from `added_strings.py`, which diffs every quoted string and JSX text
node against the tag, excluding classNames, comments, decline notes and aria attributes):
`Home` (breadcrumb root, all crumbed pages) · `About` (eyebrow + crumb, `/about`) ·
`Frequently asked questions` and `Related reading` (blog post) · `The library` (`/blog`,
`/blog/<category>`) · `Keep exploring` (`/blog/<category>`) · `Topics` (`/blog`) · `Blog` (crumb) ·
`Your callback` (`/book`) · `Calculators` (crumb) · `Calculator` (calculator eyebrow) ·
`Your enquiry` (`/complete`, `/thank-you`) · `Contact` (eyebrow + crumb) · `Cookie` (eyebrow) ·
`Privacy` (eyebrow) · `Terms` (eyebrow) · `Who we help` (`/for` crumb) · `All company types`
(`/for/<slug>` crumb) · `Research` (`/research` crumb) · `Services` (`/services` crumb) ·
`All services` (`/services/<slug>` crumb).
Plus the five research `CRUMB` constants, which are sentences and are raised as G3.
**No other authored string exists.** The `Eyebrow` wrappers that appear on the homepage, `/services`,
`/for` and `/research/startup-formation-survival-index` ("Who we work with", "Specialist services",
"The moments that bring founders here", "Free tools", "Research asset", "Why specialist matters",
"Real outcomes", "Get started", "Guides and analysis") wrap words that were already published at the
tag; the multiset diff shows them on neither side, so they are re-wrappings, not new text. Same for
the `NoticeCard` titles ("You are all set", "Callback booked", "Thank you, that is everything we need")
and the three `/thank-you` `SlimHero` titles.

**Check 6, the calculator MiniCapture placeholder.** See G4. Served on 36 pages
(`grep -l tronc html/*.html | wc -l` -> 36, and it is not on the embeds). Origin `0d64c4f16`,
pre-port.

**Check 7, machine layer beyond JSON-LD.**
`git diff --stat port-startups-tech-phase1 --` over `src/app/llms-full.txt`, `src/app/sitemap.ts`,
`src/app/robots.ts`, `src/app/feed.xml`, `public/llms.txt`, `src/lib`, `src/data`, `src/config`,
`content`, `niche.config.json`, `src/app/layout.tsx` -> **empty, every one unchanged**. Grepping the
wave diff for `metadata`, `generateMetadata`, `title:`, `description:`, `canonical`, `openGraph`,
`alternates`, `robots:` outside comments returns **no metadata export line**, so no `<title>` and no
meta description can have moved. Canonical: present, single and self-referencing on every indexable
route; absent on `/book`, `/complete`, `/thank-you` (noindex, pre-existing and untouched); the four
embeds canonical to `/calculators/<slug>` as the embed contract requires. `og:image`: 37 distinct
URLs, **all 200 `image/png`**. `/llms.txt`, `/llms-full.txt`, `/sitemap.xml`, `/robots.txt`,
`/feed.xml` all 200 and generated by unchanged builders.

**Check 8, forms contract.**
Per component, `diff` of the sorted multiset of every `data-cta|formId|name|id|type|placeholder|href|
submitLabel|action|method` attribute at the tag vs now, over `LeadForm.tsx`, `DetailsForm.tsx`,
`BookingPicker.tsx`, `MiniCapture.tsx`, `CalcResultCta.tsx`, `CalculatorClient.tsx`:
**six empty diffs, zero attribute changes.**
Served: field names `full_name`, `email`, `phone`, `message`, `role`, `situation`, `prompted`,
`callGoal`, `enquiry_ref`; `data-cta="header_book"` on 76 pages and nowhere else; submit labels
`Get a quick reply` x32, `Get my figures checked` x4, `Request a review` x4; consent text
`... By submitting this enquiry you confirm you understand this.` on 40 pages, rendered from
`siteConfig.leadConsentText` (`LeadForm.tsx:80,412`; `MiniCapture.tsx:47,172`), unchanged.
Capture-surface count per page, tag vs now: identical on every file except `src/app/page.tsx`, which
goes 1 -> 2 *components* because `LeadCTAPanel` now wraps the pre-existing `LeadForm`. The served
homepage has exactly **one** `<form>`, as before. **No lead-capture surface added, none removed.**
The eight "partner network" sentences: `diff` of the extracted sentences at the tag vs now on
`/contact`, `/complete`, `/thank-you`, `DetailsForm.tsx` and `privacy-policy` -> identical; the only
added lines in those files are code comments. Confirmed unchanged, not graded.

---

## D) FALSE PREMISES

1. **This brief.** "all 4 embeds" combined with the research-slug embed URLs: this site has no
   `/embed/<research-slug>` route. `src/app/embed/[slug]/page.tsx` sets `dynamicParams = false` and
   generates params from `genericTools()`, so the four embeds are the four calculators. The five
   research embed URLs return 404. The four calculator embeds were reviewed instead.
2. **W2's receipt.** "`buildFaqJsonLd` puts raw HTML into `acceptedAnswer.text` on six consumers
   (homepage, service and audience pages, four research pages)". Measured: the homepage carries
   **0** `<` characters inside `acceptedAnswer.text`, and so do all four research FAQ pages. The real
   set is **11 pages**: six `/services/<slug>` and five `/for/<slug>`. A mop-up scoped from the
   receipt would have chased two page families that are already clean and missed one of the two that
   are not.
3. **W5's receipt.** "`/about`'s LeadCTAPanel takes the kit's default eyebrow and form title". True,
   but it is 14 pages, not one: `/about`, `/for`, five `/for/<slug>`, `/services` and six
   `/services/<slug>`. Framing it as an about-page item understates the reach of a fee promise by a
   factor of fourteen.
4. **W3's receipt,** "changed the middle crumb name from Services/For to All services/All company
   types", is true of the JSON-LD and false of the page. The words "All services" and "All company
   types" were already the visible back-link text at the tag. What changed is that the schema stopped
   disagreeing with the render. Reported as an improvement, not as a change to what a reader is told.
5. **This brief,** "the phase 1 build is gone, so derive the before-text from SOURCE". Correct, and it
   worked, but it has a limit worth stating: a source-side diff cannot by itself prove that a string
   still present in source is still *rendered*. That hole was closed from the other side, by sweeping
   the served HTML for text absent from the tag corpus; the residue was 137 fragments, every one of
   which is a template composition (a `<title>` with its suffix, an interpolated hub name, a computed
   figure) and none of which is new prose.

---

## E) OPEN QUESTIONS FOR THE OWNER

1. **The FAQ boxes now showing on every guide.** Each of the 32 blog guides now shows its questions
   and answers on the page, in collapsible boxes. That is 205 answers that were previously written but
   only readable by Google, never by a visitor. The words are exactly as they were written. Do you
   want them on the page?

2. **The wording in the enquiry panel on 14 pages.** Fourteen pages carry the line "Free first call,
   then a fixed fee in writing" above the enquiry form, and the form is headed "Book your free first
   call". Neither line was written for this site: both come from the shared design kit and appeared in
   the 28 September parity work, not in this design wave. Elsewhere the site calls the same thing a
   "free review call". Two questions: is the fee promise the one you want to make, and should the site
   settle on one name for the call?

3. **The trail of links at the top of the research reports.** Each of the five research reports now
   shows "Home / Research /" followed by the report's full title, and then repeats that same title as
   the heading directly underneath. Would you rather the trail used a short name, for example "R&D Tax
   Relief Usage Index" instead of "R&D Tax Relief Usage Index: the post-clampdown squeeze on tech"?

4. **The example text in the message box.** On 36 pages, the "tell us more" box shows the grey example
   "e.g. pub with 12 staff, need help with tronc setup and food VAT". It is left over from another
   site and has been there since the site was built. It is on the list to fix. Do you want a specific
   example used, or shall the fix just make it a startup one?

5. **What Google is told a guide is called.** On 19 of the 32 guides, the title we hand to Google is a
   slightly different sentence from the heading on the page. Both are yours and both are accurate;
   they are simply two different drafts of the same title. Shall we make the two match, and if so,
   which one wins, the one on the page?
