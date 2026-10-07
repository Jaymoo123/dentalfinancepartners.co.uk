# R3 — content and claims review, pharmacies design port wave (phases 1-6)

Independent adversarial review. Read-only on the site. Server asserted before any
measurement: `curl -s http://localhost:3111/` returns 200 and
`<title>Pharmacy Tax | Specialist Accountants for UK Pharmacy Owners</title>`;
`.next/BUILD_ID` timestamped 12:36:04, review ran from 12:42 — the build postdates
the wave's files (T2 satisfied).

**Baseline note the brief did not anticipate.** `port-pharmacies-phase0` **is** `HEAD`
(`d2f6677fe`). The whole wave is an uncommitted working tree: 42 modified files, 2
deleted (`SiteHeader.tsx`, `SiteFooter.tsx`), 8 new paths. `port-pharmacies-phase2`
.. `phase6` and `port-pharmacies-complete` **do not exist**. So "phase-0 text" is
`git show port-pharmacies-phase0:<file>` and "current" is the working tree, which is
what I used. Recorded as process finding P1.

`pharmacies/niche.config.json`, `pharmacies/web/content/**` and
`pharmacies/web/public/**` are **byte-identical** to phase 0 — no blog markdown, no
config string and no static file moved. That removes the largest class of prose risk
by construction.

## Method (independently derived, V8 not consulted)

1. Crawled all 55 sitemap routes plus `/book`, `/complete`, `/thank-you`, the 3
   `/embed/*`, `robots.txt`, `llms.txt`, `llms-full.txt` = **64 documents** from the
   running build (`scratchpad/r3/crawl.py`), stripped `<script>`/`<style>`, extracted
   visible text per route.
2. **Deletion sweep.** Every prose sentence in every phase-0 public file (app minus
   admin/api, components, data, content, lib/calculators/tools, niche.config.json) —
   **2,501 sentences** — checked for presence in the rendered corpus. 113 raw misses,
   each run down to source. A second pass over phase-0 **template literals** (the
   blind spot of a sentence index: `${}` strings never match) added 17 more.
3. **Addition sweep.** Every rendered block-level text fragment on all 64 documents
   tokenised into 5-word shingles and checked against the entire phase-0 pharmacies
   tree. **256 fragments carried at least one novel shingle**; each triaged.
4. Claims, figures, schema, em-dash, kit-default, data-cta and capture-surface
   sweeps run on the served HTML, by rule, not from the brief's list.

## Findings

| # | sev | route(s) | evidence | package | minimal fix |
|---|---|---|---|---|---|
| **S1** | **serious** | `/` (homepage band 10) | Phase-0 `page.tsx` band 10 was a `<table>` with an `sr-only <caption>` "How Pharmacy Tax handles common pharmacy finance areas". `grep -c "handles common pharmacy finance areas" index.html` = **0**. The two column headers *were* restored by M1a as the visible lead-in "Area / Our approach" (`grep -o "Area / Our approach" index.html` = 2 ✓). The caption was not. Under the 2026-09-28 ruling this is published wording deleted, and no exemption (a)/(b)/(c) covers it. W5 §419 and M1A §5 both declare it and invite an overrule, which is the right behaviour — it is still a deletion until the owner rules. | W5, left open by M1a | Add `<p className="sr-only">How {siteConfig.name} handles common pharmacy finance areas</p>` above the `NumberedReasons` list, **or** one owner line accepting the deletion. |
| **S2** | **serious** | 22 blog posts | New kit `Breadcrumb` on the post template (`blog/[category]/[slug]/page.tsx:241-249`) passes `{ label: post.title }` as the final crumb, so both the visible trail and the new `BreadcrumbList` JSON-LD carry the post's **full title sentence**. 13 of 22 exceed 60 chars; worst = `Share Purchase vs Asset Purchase: Which Structure Should You Use to Buy a Pharmacy?` (83). The brief's bar is explicit: "its current crumb a short label not the page's full title sentence". Not a wording change (the title is the site's own string) — a schema-and-chrome quality defect on a surface the wave created. | W2 | `{ label: post.h1.split(/[:?]/)[0].trim() }`, or add a short `breadcrumbLabel` to the three long posts' frontmatter. One line. |
| **m1** | minor | `/research/pharmacy-density-and-workload-index`, `/research/pharmacy-openings-closures-index` | `<FaqSection faqs={faqs} alwaysRenderAnswers tone="slate" .../>` (`:414-419`) passes neither `eyebrow` nor `title`, so **both kit defaults ship**: eyebrow `FAQ` (`grep -l ">FAQ<"` = exactly these 2 files) and h2 `Frequently asked questions`. Phase 0 published neither (FAQs were JSON-LD only). Exemption (c) covers a kit default, so this is not a ruling breach — but the same wave blanked it elsewhere for the opposite reason: `calculators/[slug]/page.tsx` comments `eyebrow="" because the kit default "FAQ" is a label this site does not publish`. Two routes now contradict that. | W6 | `eyebrow=""` on both call sites. |
| **m2** | minor | `/calculators/locum-take-home-comparator`, `/calculators/pharmacy-purchase-affordability` | `tool.intro` renders twice as visible prose: once in the hero (`text-white/85`, `page.tsx:81`) and once as `explainer.paragraphs[0]` (`:106`). Verified: `grep -o "Enter your day rate" …html` = 3 (2 visible + 1 RSC). **Pre-existing** — the duplication is in `lib/calculators/tools/*.ts` data (`intro` and the first explainer paragraph are the same string) and phase 0 rendered both the same way. Not a wave regression; surfaced because the restyle makes the repeat more obvious. | none (data, off-lease) | Drop `explainer.paragraphs[0]` where it equals `intro`. Needs an owner nod, it is published copy. |
| **m3** | minor | `/llms.txt` | 7 lines render the literal string `pound-sterling` where `£` belongs, e.g. "up to the pound-sterling 1 million lifetime limit per person". `pharmacies/web/public/llms.txt:47-54`. **Pre-existing and untouched by the wave** (`git status -- pharmacies/web/public` is empty). Every figure in those 7 lines is correct and agrees with `rates_ledger.json`. | none | One `sed` on the static file. |
| **m4** | minor | 35 routes | `NextStepOffer` review reason publishes `You have spent real time on this. A quick look will confirm where you stand` — no terminal full stop, where the sentence before it has one. Authored line, W7 §10b, so owner-reviewable rather than a defect. | W7 | add `.` |
| **P1** | process | — | Wave uncommitted, no `phase2`..`phase6`/`complete` tags (launch-order step 6 not done). R4 has no diff to review and a `git stash`/checkout would lose the wave. | manager | Commit and tag before R4. |

**BLOCKERS: 0. Serious: 2. Minor: 4 (two of them pre-existing). Process: 1.**

## What came back clean, with the command

- **Prose freeze.** Of 2,501 phase-0 public prose sentences, **exactly one is gone**:
  S1's sr-only caption. Every other raw miss resolved to instrument noise —
  `howToSteps[].text` (schema-only in both versions, `@type":"HowToStep"` count = 10
  on the checklist post), `metaDescription`/`summary` (attribute text my visible-text
  pass strips), dead branches (`hub.noLeadForm` is false on all 5 hubs in both
  versions; `/thank-you` and `/complete` nurture branches), and code comments. The 22
  blog posts render every phase-0 field (`post.contentHtml`, `keyTakeaways`, `faqs`,
  `howToSteps`, dates) — field-for-field comparison of `grep -o 'post\.[a-zA-Z]*'`
  before and after.
- **No unlisted authored addition.** All 256 novel fragments resolve to: W7 §10's
  listed lines (exemption b), kit defaults (exemption c), `niche.config`/existing
  strings re-templated, or rendered data values. Specifically checked and found
  **pre-existing**, not new: `Step 1 of 2 · About you` (`LeadForm.tsx:203`→`:204`),
  `Powered by Pharmacy Tax … specialist UK pharmacy accountants` (`embed/[slug]:43`→`:56`),
  `What makes … accounting different.` / `How we help …` / `Speak to a pharmacy
  finance specialist.` (all three in phase-0 `/for/[slug]`), `… min read`, the
  `/for/[slug]` LeadCTAPanel description, and both research-page panel titles and
  bodies (`git grep -c "<string>" port-pharmacies-phase0`).
- **The five "no copy" surfaces reuse, not author** (E.2 risk 4 held): `/for` →
  existing `Speak to a pharmacy finance specialist.`; `/blog` → `niche.blog.cta_*`;
  `/calculators` → `CALC_CAPTURE_HEADING`/`_BLURB` moved into `lib/calculators/site.ts`;
  both research pages → their own phase-0 band copy, verbatim.
- **Kit-default copy sweep, 64 documents.** `Free consultation` **0** ·
  `Book your free consultation` **0** · `Fixed fee quote if you decide to proceed`
  **0** · `Most recommended` **0** · `What landlords say` / `Your rent went up` /
  `Section 24` **0** · `these are estimates, check your own figures` (NoticeCard
  default) **0**. `Free, no obligation. The form is just below.` = **22** blog posts
  (K5, deliberately adopted, W2 §110). `Example figures displayed` = **3**, the three
  `/calculators/*` pages and not the embeds — intended, as briefed.
- **Star ratings and invented identity.** `Rated 5 out of 5` **0** · `★` **0** ·
  `data-rating` **0** · `initials` **0**. Exactly 3 quotes and 3 attributions on `/`,
  each byte-identical to phase-0 `page.tsx:185-201`; the composite disclaimer
  ("Composite accounts based on patterns across our client base. Names, amounts and
  specific details anonymised. The situations described are real.") present once. No
  fourth quote.
- **Figures.** Every tax figure on every rendered surface re-derived against
  `rates_ledger.json` (31 rows) and `house_positions.md`. All agree: BADR 18% 2026/27
  (was 14% in 2025/26) up to £1m per person; CGT 18/24 with £3,000 AEA and the £37,700
  boundary; CT 19/25 with £50,000/£250,000 and Marginal Relief, divided by associated
  companies (the published worked case "£12,500 and £62,500 per entity" for four
  companies is correct); dividends 10.75/35.75/39.35 with the £500 allowance; employer
  NIC 15% above £5,000 with EA £10,500 and the 13.8%/£9,100 pair correctly labelled
  stale; AIA £1,000,000, WDA 14% (from 18%), new 40% FYA, special rate 6%; SDLT to 5%,
  share duty 0.5%; VAT threshold £90,000; MTD £50,000 from Apr 2026 falling to £30,000
  Apr 2027. **Arithmetic, not only strings** (T6): `/calculators/pharmacy-purchase-affordability`
  publishes CT £12,150 on £60,000 profit — marginal relief at 3/200 gives
  15,000 − 0.015×(250,000−60,000) = 12,150 ✓. `StatsCounter` checked in the
  pre-hydration HTML (T15): all four homepage values are strings, nothing animates,
  nothing invented.
- **The three calculators agree with P0F1** (checked on the rendered page, not the
  tests — T36). Locum: no `Class 2` row anywhere, `Class 4 NIC (6% / 2%)` row present,
  note carries the corrected Class-2 sentence. Affordability: new `Premises (property)
  value included in the price (£)` input and help text, `Asset deal: SDLT on the
  premises element (est.)`, `SDLT less share duty (difference)` reading −£2,000 on the
  leasehold default, note carries the corrected SDLT-scope sentence and the removed
  5-8% lender-rate figure is gone. FP34: `Monthly shortfall while you wait` row
  present above `Working-capital gap to bridge`, note carries the "accumulated across
  the 2 months you wait" wording, £20,000 claim / 50% advance / 2-month lag → £20,000
  gap ✓.
- **Schema vs page** (`scratchpad/r3/schema.py`, all 64 documents, JSON parsed not
  grepped). **Raw HTML in `acceptedAnswer.text`: 0** — K9's one-line strip landed on
  `/services/*`, `/for/*` and the post template. Every `Question.name` and
  `acceptedAnswer.text` present in the visible HTML, from one binding. **Exactly one
  `BreadcrumbList` per URL** on all 52 that carry one; `/`, `/book`, `/complete`,
  `/thank-you` and the 3 embeds carry none, as before. `BlogPosting` present on all 22
  posts with `headline` **equal to the visible `<h1>` on all 22**, and
  `datePublished` + `author` present and distinct from `dateModified`. No unparseable
  block.
- **Em-dashes: 0.** `grep -c $'—'` and the `&mdash;`/`&#8212;`/`&#x2014;`
  entities across all 64 documents, whole-file — body text, `<title>`, meta
  descriptions and every JSON-LD string included.
- **No qualification, regulator or PI claim.** `chartered` 0 · `ACCA` 0 · `ICAEW` 0 ·
  `qualified accountant` 0 · `regulated` 16 (all pre-existing NHS-regulations copy in
  blog bodies) · `professional indemnity` 6 (pre-existing locum-status content) ·
  `Chartered` 1, on `/thank-you` only, the pre-existing Aswatax advisory sentence.
- **No fee or turnaround promise beyond the standing line.** `fixed fee` 0 ·
  `free consultation` 0. `within 24 hours` on 60 documents, every instance the
  site's own standing wording: `niche.cta.sticky_secondary` ("Free, no-obligation
  reply within 24 hours", byte-identical in phase-0 and current `niche.config.json`),
  the `/contact` line, `MiniCapture`, and the widget's `We reply within 24 hours`.
- **Firm voice.** `partner network` 26 — every one inside `siteConfig.leadConsentText`,
  which is exactly where the 2026-09-28 estate ruling puts the disclosure, and W7
  §10d confirms it is passed frozen. No marketing surface claims a network.
  `not an accountancy practice` 0 · `our network` 0 · `introduce you to` 0.
- **AI tells in authored lines: none.** `delve`, `tapestry`, `seamless`, `elevate`,
  `game-changer`, `navigate the complexities`, `in today's fast-paced`, `robust
  solution`, `leverage`, `dive into` all 0. `unlock` 1 and `landscape` 5 are
  pre-existing blog/tool prose, not wave lines.
- **llms.txt / llms-full.txt agree with the pages.** Both route/file outputs unchanged
  by the wave; `llms-full.txt` lists 22 post URLs with titles and summaries matching
  the rendered posts; every figure in `llms.txt` matches the ledger (formatting aside,
  m3).
- **Compliance rows reported, not touched** (brief item 7, both owner-ruled LEFT AS
  IS). `enquiry_retention_months: 24` in `niche.config.json`; `/privacy-policy`
  publishes "We keep enquiry data for 24 months" — consistent. Cookie policy carries
  advertising wording; `gaMeasurementId` empty, `adsenseClientId` set. **No new drift
  introduced by the wave.** Not reopened.
- **Pipeline artefacts: none.** No `undefined`, `NaN`, `[object Object]`, `{{`,
  unresolved `${`, doubled punctuation or stray `\n` in any rendered document. The
  `&lt;` literals on the density page are the correctly-escaped "less than"
  comparisons already ruled on (F13).

## `data-cta` inventory (brief item 9)

Baseline was 3 ids and zero `data-cta-goal`. The wave publishes **19 ids** across the
64 documents, and `data-cta-goal` on **156** elements — a new live dimension, declared
in `PageShell.tsx:161-166` rather than silently inherited.

| id | routes | goal | placement | element | href/target |
|---|---|---|---|---|---|
| `header_contact` | 58 | form | header | `a` | `/contact` (baseline id kept, not the kit default) |
| `sticky_cta` | 58 | form | sticky | `a` | `/contact` (baseline) |
| `sticky_cta_close` | 58 | form | sticky | `button` | dismiss (baseline) |
| `specialist_widget` | 58 | form | sticky | `button` | opens widget — **in the SSR HTML, not only the bundle** |
| `next_step` | 35 | tool/form | next_step | `a` | calculator or `/contact` |
| `mini_capture_submit` | 25 | form | sidebar/next_step | `button` | submit |
| `blog_skip_to_form` | 22 | form | article_header | `a` | in-page anchor |
| `blog_sidebar_book` | 22 | form | sidebar | `a` | `/book` |
| `home_blog_post` ×3, `home_tool_*` ×3, `home_research_*` ×2, `home_hero_primary/secondary`, `calc_index_tool` ×3, `calc_index_help`, `embed_attribution` ×3 | 1-3 each | read/tool/research/hub/form | hero, home_*, index_grid, embed | all `a` | per card |

Every id sits on an `<a>` or a `<button>` — **no `data-cta` on a `<div>`**
(`grep -o '<[a-z]* [^>]*data-cta="[^"]*"'`, 19 distinct id/tag pairs, zero `div`).

## Capture-surface census (brief item 10)

| family | forms | sticky bar | widget | NextStepOffer | DeepScrollModal |
|---|---|---|---|---|---|
| `/`, `/about`, `/contact`, `/blog*` index, `/calculators*`, `/services`, `/for`, research | 1 | 1 | 1 | 0 | 1 |
| 22 blog posts | **2** | 1 | 1 | 1 | 1 |
| 8 `/services/*`, 5 `/for/*` | 1 | 1 | 1 | 1 | 1 |
| `/book`, `/complete`, `/thank-you`, `/terms`, `/privacy-policy`, `/cookie-policy` | 0 | 1 | 1 | 0 | 1 |
| 3 `/embed/*` | 0 | 0 | 0 | 0 | 0 |

**No route carries two of the same thing.** The 2 forms on blog posts are
`InlineMiniLeadForm` (mid-body) + `LeadForm` in the closing panel — **both present at
phase 0** (`blog/[category]/[slug]/page.tsx:128` and `:142` in the tag), so the count
is unchanged, not a wave addition. The four-surface stack on `/services/*` and
`/for/*` is owner question G5, already bundled: suppression rules are the only thing
separating it from pushy, and it needs the owner's walk, not a reviewer's verdict.

## Authored lines now published, verbatim, for owner review

All of these are W7 §10 (exemption b). Nothing below is outside that list, and nothing
in that list is missing from the build. `SSR` = in the served HTML; `BUNDLE` = client
module, reachable at runtime on interaction.

**Topic CTA copy, 6 (SSR):** `Check what a pharmacy purchase looks like on your
numbers` · `Check where you stand on a pharmacy sale` · `Map your FP34 cash flow month
by month` · `Check your VAT retail scheme is the right one` · `Compare your locum
take-home pay` · `Check your pharmacy structure and payroll are right`

**Offer copy (SSR):** `Most-used tool for this topic` · `Run your own numbers on
{label} in a couple of minutes.` · `A no-obligation look at your position with a
pharmacy accountant.` · `You have spent real time on this. A quick look will confirm
where you stand` · `Speak to a pharmacy accountant` · `Open the calculator`

**Offer copy (BUNDLE):** `Get your position on {label} checked by a pharmacy
accountant.` · `You have spent real time here. An accountant can confirm your
position` · `Pick up where you left off. Get your position looked at` ·
`Welcome back. {offer.reason}.` · `Open the calculator instead` · `Get the free guide`
(**unreachable today — no topic declares a `guide` offer; it is in the bundle only**)

**Widget copy:** `Ask an accountant` (SSR) · `We reply within 24 hours` ·
`See your numbers` · `Send to an accountant` · `Sending...` · `Your email` ·
`Your question for an accountant` · `Your question` · `Enter a valid email address.` ·
`Add a short message so the accountant knows how to help.` ·
`Something went wrong. Please try again.` · `Thanks, we have your message. One of our
accountants will reply by email within 24 hours. Please keep an eye on your inbox, and
your spam or junk folder, so the reply is not missed.` · `Close` · `Dismiss`
(all BUNDLE except the launcher)

**Opener hooks, 19 (BUNDLE):** three per topic across buying / selling / nhs-income /
vat-retail / locum / structure, plus the buying+selling combination. Full text at
W7 §10e; I verified each string is present in the client chunks and that none carries
an em-dash, a fee, a free-call promise or a regulatory claim.

**Kit default labels newly published (exemption c), logged for the owner:** footer
column headings `Services` / `Resources` / `Calculators` / `Company` — **`Resources`
sits over the `/for` audience links, which the header calls `For`**, the one place the
kit's hardcoded heading reads slightly off (handoff 6, already known) · footer credit
`Built by Double Wired Creative` on 58 routes, a new followed outbound link, taken
deliberately on the owner's 2026-09-11 estate ruling (`PageShell.tsx:242-245`) ·
footer `Do not track me` (the site's only on-site opt-out, mandatory under
`posture="opt-out"`) · `Frequently asked questions` on 27 documents ·
`Free, no obligation. The form is just below.` on 22 posts (K5) ·
`Example figures displayed` on 3 · the `FAQ` eyebrow on 2 (finding m1).
Nav labels unchanged: `Services · For · Research · Blog · About · Contact ·
Get in touch`.

## KNOWN AND ACCEPTED (section F) — verified, not reported as findings

F1 (nine P0-A rows as ruled; rows 8 composite testimonials and 9 cookie-policy/AdSense
+ 24-month retention LEFT AS IS) — both rows re-measured above and unchanged, not
reopened. F2 (P0-A not-serious list) — untouched. F3 (AdSense CSP `frame-src` noise) —
not a content matter. F4 (`brand.logo_path` to a file that never existed; text
wordmark renders) — still the case, owner question. F5 (`content_strategy.categories`
7 names vs 5 live blog slugs) — config drift confirmed, not consumed by routing,
logged. F6 (admin login ring) — out of lease. F7 (`--calc-result-accent`) — not
repointed. F8/F9/F10/F11 — R2's instruments, not mine. F12 (`/book` and `/complete`
absent from `robots.txt` disallow while `/thank-you` is present) — re-confirmed on the
served `robots.txt`, owner question. F13 (`&lt;` on the density page) — correct escapes
in body copy, confirmed. F14 (`og:image` absent on 11, 8 over-length metas) — not
re-swept; no wave file made either worse.

## Verdict

The prose freeze held, and it held under an instrument built to break it. Of 2,501
phase-0 public prose sentences, exactly one is no longer published: an `sr-only` table
caption whose table the wave replaced, declared in two receipts and explicitly offered
up for overrule. Of 256 rendered fragments carrying language phase 0 never contained,
every one resolves to a line W7 listed verbatim, a kit default label, or an existing
string re-templated — there is no sentence on this site today that a builder wrote and
did not declare. The claims side is cleaner than I expected to find it: no em-dash
anywhere including JSON-LD, no star rating, no invented identity, no fee or
fixed-quote language, no qualification or regulator claim, the only "partner network"
text sitting in the consent block where the estate ruling puts it, and every published
figure reconciling to the rates ledger by arithmetic and not only by string match. The
three calculators carry P0F1's corrected maths on the rendered page rather than only
in their tests, which is the one place a golden-tested calculator has lied here before.
K9 landed: zero raw HTML in any `acceptedAnswer.text`, one `BreadcrumbList` per URL,
and `BlogPosting.headline` equal to the visible `h1` on all 22 posts.

What is left is small and cheap. S1 is one line of markup or one line from the owner.
S2 is one line in the post template and matters because the wave created that
breadcrumb — shipping a 83-character sentence as a crumb is the kind of detail that
reads as unfinished in a SERP. m1 is two `eyebrow=""` props and closes a
self-contradiction inside the wave's own stated rule. m2 and m3 are pre-existing and
should be recorded as such rather than fixed under this wave's budget. **No blocker.**
The real open item is not a content defect at all: the wave is uncommitted and
untagged, so R4 has nothing to diff and a careless checkout loses it. Commit and tag
before M1's fixes land, then S1, S2 and m1 close in a single pass.
