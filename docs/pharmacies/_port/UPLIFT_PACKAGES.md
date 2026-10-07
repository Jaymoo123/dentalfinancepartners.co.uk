# pharmacies DESIGN UPLIFT: package plan

Read-only planning pass, 2026-10-07. No source edited, no build run, no server
started or stopped (the wave build on `:3111` was measured, never restarted), no
git write, no subagent launched. Every number carries the command that produced
it, run from the monorepo root on the working tree at `d2f6677fe` plus the
uncommitted phase 1 to 6 working set (`git tag -l 'port-pharmacies*'` returns
`port-pharmacies-phase0` only, so phases 1 to 6 are built but not yet tagged).

Owner ruling that frames this: the uplift is part of the port, budgeted from the
start, and it is where the designer-level edge lands. The complaint it answers is
"looks basic, kits missing" next to Property, which
`docs/_engines/DESIGN_GAP_DIAGNOSIS_2026-09-14.md` measured as **kit adoption,
not art direction**.

**Read section 0 before reading anything else. It deletes two of the four
packages the session plan budgeted.** That is trap T-H12 doing its job
(`DESIGN_PORT_PLAYBOOK.md:1651-1657`): a shape that worked on the last site is a
hypothesis, not a plan.

---

## 0. MEASURED STARTING POINT

### 0.1 The section 9.1 gate, re-derived today

Block run verbatim from `DESIGN_PORT_PLAYBOOK.md:836-855` with `DIR=pharmacies`.

| # | row | result | verdict |
|---|---|---|---|
| 1 | layout-utils | **7** | PASS (>= 1) |
| 2 | kit adopted | **12 distinct / 69 call sites** | PASS. generalist 25 distinct / 158 by the same grep widened to `blog`+`chrome`; on the gate's narrow `marketing|primitives` grep generalist is 15/140 |
| 2a | kit declined | **62** comment references naming a kit path | report only. High, but every one is measured: see 0.4 |
| 2b | homepage mktg | adopted=**6** declined=**6** | PASS |
| 3 | webfont | `next/font/google` | PASS (Plus Jakarta Sans, confirmed in the DOM, 0.6) |
| 4 | backdrop | **1** (`PharmaciesBackdrop.tsx`) | PASS |
| 5 | eyebrow ratio | Eyebrow=**9** section-label=**0** | PASS |
| 6 | rings not the token | (no lines printed) | PASS |
| 7 | gradient grounds | `app/page.tsx`, `components/layout/PharmaciesBackdrop.tsx` | both already carry per-stop contrast rows in-file |
| 8 | ring guard | walks=**2** guards-the-guard=**1** | PASS |

**Four-marker thermometer, comment-stripped, re-derived:**

| site | ping | StatsCounter | Backdrop | rounded-full |
|---|---|---|---|---|
| Property | 1 | 2 | 3 | 4 |
| generalist | 1 | 2 | 3 | 4 |
| **pharmacies `/`** | **1** | **2** | **4** | **3** |

**Correction to the brief handed to this planner.** It states ping 1 / stats 3 /
backdrop 5 / rounded-full 3. Re-derived on the comment-stripped source the row is
**1 / 2 / 4 / 3**. `W5_RECEIPT.md:19-37` reports the same 1/2/4/3, so the brief's
3 and 5 are a mis-transcription, not a later commit. The row is a thermometer, not
a blocker (`DESIGN_PORT_PLAYBOOK.md:886`); it is at the reference level and needs
no chasing.

### 0.2 DOM depth, per template family, measured on the live `:3111` build

puppeteer-core + the installed Edge at 1280x900, the `browser_check.mjs` launch
pattern. `sections` = `main section` count; `eyebrow` = elements whose class
contains `eyebrow`; `glow` = `[data-glow]` (ScrollGlowGroup); `cta` =
`[data-cta]`; `h1` = computed font-size / line-height.

| route | sections | eyebrow | glow | ping | h1 | data-cta | main links |
|---|---|---|---|---|---|---|---|
| `/` | **14** | **11** | 3 | 1 | 72px/86px | 14 | 43 |
| `/services` | 4 | **0** | 0 | 0 | 48px | 4 | 12 |
| `/services/[slug]` | 6 | 1 | 2 | 0 | 48px | 5 | 4 |
| `/for` | 3 | **0** | 1 | 0 | 48px | 4 | 6 |
| `/for/[slug]` | 6 | 1 | 2 | 0 | 48px | 5 | 10 |
| `/calculators` | **1** | **0** | 0 | 0 | **36px** | 8 | 5 |
| `/calculators/[slug]` | 5 | 1 | 0 | 0 | 36px | 5 | 2 |
| `/blog` | **1** | **0** | 0 | 0 | **30px** | 4 | 28 |
| `/blog/[category]` | **1** | **0** | 0 | 0 | **30px** | 4 | 9 |
| `/blog/[category]/[slug]` | 3 | **0** | 0 | 0 | 36px | 8 | 48 |
| `/research/[x]` | 9 | 2 | 0 | 0 | 48px | 4 | 14 |
| `/about` | 3 | 2 | 0 | 0 | 48px | 4 | 2 |
| `/contact` | 2 | **0** | 0 | 0 | 48px | 4 | 1 |
| `/thank-you`, `/book` | 2 | 1 | 0 | 0 | 48px | 4 | 1 |

`sameAdjacent` (two touching bands on the same ground) is **0 everywhere except
`/calculators/[slug]`, where it is 1.** Ground alternation is otherwise clean, and
G3 (`G3_GROUNDS_FIX_RECEIPT.md`) is why.

**The one finding that matters.** `/` is at the reference level on every row.
**Every other template is not, and the gap is one shape repeated: no band
structure and no section eyebrow off the homepage.** `/blog`, `/blog/[category]`
and `/calculators` are the worst: each renders as a single `<div class=container
py-16>` with an h1 at 30 to 36px, no hero ground, no backdrop above the fold and
no eyebrow anywhere. Reference, same grep on source:

| template | generalist `<section>` / `<Eyebrow>` | pharmacies |
|---|---|---|
| `/services` | 7 / 5 | 3 / 0 |
| `/calculators` | 3 / 3 | **0 / 0** |
| `/blog` | 5 / 5 | **0 / 0** |
| `/about` | 4 / 4 | 1 / 1 |
| `/contact` | 2 / 3 | 1 / 0 |

generalist's hub shape is literally: backdrop hero, then one eyebrowed band per
idea alternating white / slate-50, a StatsCounter strip, FaqSection, and a
`LeadCTAPanel` carrying the backdrop again (`generalist/web/src/app/services/page.tsx:175-364`,
`blog/page.tsx:94-215`, `calculators/page.tsx:105-214`). Pharmacies has the
ingredients (12 kit modules, a backdrop mounted on 13 routes, Eyebrow x20) and
spent them almost entirely on one page.

### 0.3 Motion, depth and typography, measured

- **Motion foundations are already in place.** `pharmacies/web/src/app/globals.css`
  is 312 lines and already `@import`s `tw-animate-css` (`:22`) and
  `@accounting-network/web-shared/design/globals-standard.css` (`:37`), declares
  all four glow channels at this site's ramp (`:152-155`), declares the
  `.story-numeral` / `.story-numeral-rule` rule set W5 D4 asked for (`:275-308`),
  and `--radius: 0rem` (`:109`) matches Property, generalist, hospitality and
  startups-tech exactly. The `<noscript>` draw release is in `layout.tsx:51-55`
  and W7 section 12 verified it.
- **`ScrollGlowGroup`: 8 live mounts** across `/` (3), `/for` (1),
  `/for/[slug]` (2), `/services/[slug]` (2). Measured in the DOM as `[data-glow]`
  = 3 on `/`, 2 on each detail template, 1 on `/for`, **0 on every hub, every
  blog route, every calculator and both research pages.**
- **`animate-ping`: 2 in source, 1 rendered, homepage hero only.** generalist is 2.
- **Grey ramp is already finished: `neutral-*` = 0, `stone-*` = 0, `slate-*` = 712.**
  (generalist 47 / 0 / 853.) The 506-hit conversion that dominated the
  startups-tech uplift does not exist here.
- **Typography rhythm is the real gap, and it is one line per hero.** `/` is the
  ONLY route whose h1 carries an `lg:` step (`lg:text-7xl`, computed 72px). Five
  hero h1s stop at `sm:text-5xl` (48px at 1280) and eight stop at `sm:text-4xl`
  (36px) or lower; none carries `leading-[1.15]`. generalist puts an `lg:` step
  and an explicit leading on 27 of its h1s
  (`grep -rhoE '<h1 className="[^"]*"' generalist/web/src/app`).

### 0.4 Kit marketing components not adopted anywhere, and whether each has a home

Every one is already declined in writing at a call site naming the kit file and
line. All were re-read today. **Verdict column is this plan's, not the receipt's.**

| component | declined at | the reason, re-checked | has a legitimate home? |
|---|---|---|---|
| `ProblemStatement` | `page.tsx:411` | hardcodes Property's landlord copy, no copy props | **No.** Known decline, stands |
| `DrawnTickList` | `page.tsx:560`, `services/[slug]:181` | `items: string[]`, one claim per tick; the only list on that band is a 2-column table | **No** on `/`. Possibly yes on a hub band that already publishes single-sentence claims; UA greps first |
| `ProcessTimeline` | `page.tsx:725`, `services/[slug]:168` | `n` is required; the four items are independent problems, not a sequence | **No.** Authoring "01".."04" asserts an order the copy does not publish |
| `PromptMarquee` | `page.tsx:955` | `Prompt.tag` required; six FAQ questions would need six new tags | **No.** Six authored labels |
| `ComparisonTable` | `page.tsx:846`, `services/[slug]:172` | needs a `general` column and three captions this site does not publish | **No** |
| `CardStack` | `services/[slug]:156`, `page.tsx:732` | `body` must be a string; every body is JSX with real `<a>` children | **No** |
| `WhatToExpectCard` | 7 call sites | its three fixed headings are copy this site does not publish | **No.** Widest decline on the site and consistent |
| `CoverageCards` | adopted on `/` band 4 and `/services`; declined `page.tsx:641`, `for:45` | one `href` per card drops 6 links to 3 | **Adopted where it fits.** Declines stand on link-floor grounds (locked rule 20) |
| `BlogCategoryHub` | `blog/page.tsx:36`, `blog/[category]:46` | requires six copy blocks (`intro`, `description`, `essentialsTitle`, `cta`, `libraryNote`, `sections`) none of which this site publishes | **Owner question Q2.** Code-reachable, copy-blocked |
| `BlogListWithSearch` | `blog/page.tsx:20` | `postsPerPage = 12` hardcoded at `:43` and `:91` SLICES, so posts 13..22 leave the server HTML; floor is 37 links | **Yes, after kit edit K-A.** This is the one decline a kit change legitimately reverses |
| `NumberedPagination` | `blog/page.tsx:28` | not imported directly, but `HubArticleList.tsx:117-124` mounts it itself and hides off-page cards with `hidden` rather than slicing | **Already live.** Nothing to do |
| `TestimonialsSection` | adopted, `/` band 11 | | done |

### 0.5 Lead-kit layers (`LEAD_KIT_FULL_CHECK_BRIEF_2026-09-28.md:37-58`)

| layer | state | evidence |
|---|---|---|
| Foot lead form in `LeadCTAPanel` | **present**, 13 call sites | import census |
| `inline_mini` | **present** | `components/blog/InlineMiniLeadForm.tsx:16`, mounted after the 2nd h2 |
| `calc_result` | **present** | `components/calculators/CalcResultCta.tsx:18` on all 3 calculators |
| `calc_result_form` / Property `ResultGate` | **deliberately absent** | plan: "exactly one form under each result, no gate, no PDF" |
| `calc_page_footer` | **deliberately absent** | `calculators/[slug]:113` — a footer capture would be a second form under one result, against the owner's 09-27 rule |
| `mobile_tool` | **declined at the call site** | `calculators/[slug]:87`, kit `MobileToolSlot.tsx:14` binds the kit `MiniCapture`, whose prop contract this site's local `MiniCapture` does not satisfy |
| `resource_block`, `blog_short_resource` | **absent, no host route** | both are `/resources/[topic]` surfaces; see Q1 |
| intent trio + `NextStepOffer` | **present**, mounted `layout.tsx:70-73` | W7 |
| `SpecialistWidget` | **present**, kit version, behind local `SupportProvider` | `layout.tsx:9,73` |
| `StickyCTA` | **present**, `phfp_sticky_dismissed`, retreats off the footer | W7 section 7 |
| `EntityBlock` | removed estate-wide by ruling | not a gap |
| consent text | frozen, byte-checked in phase 0 | T19 |
| post-submit, nurture, machine layer | present | W6, M1A section 1 |

**The lead kit is complete.** Its only holes are the two `/resources` form ids,
and a `/resources` route is **out of scope for this port**: owner decision 3 in
the session plan puts `/resources` in the estate-wide gap sweep that runs AFTER
the new ports, as one layer across crypto, charities, ecommerce, hospitality and
startups-tech. That is a plan ruling, not an open question; Q1 below only asks
whether he wants it pulled forward.

**The real lead-kit gap here is instrumentation breadth, not surfaces.** 21
distinct `data-cta` ids against generalist's 48 and Property's 66, and they sit on
6 files. **Twelve public routes carry no `data-cta` at all** beyond the chrome's
own three: `/about`, `/blog`, `/blog/[category]`, `/book`, `/calculators/[slug]`,
`/complete`, `/contact`, `/for/[slug]`, `/privacy-policy`, `/research` x2,
`/services`, `/services/[slug]`, `/terms`. Generalist's naming is the target
(`about_hero_book`, `services_hero_book`, `calc_hero_help`,
`research_<asset>_hero_book` / `_hero_data` / `_csv`, `blog_index_book` /
`_articles`, `contact_pricing_link`) so `vw_cta_performance` reads across sites.
**Attributes on links that already exist. No new link, no new sentence.**

### 0.6 The 46 hex literals in `.tsx`, classified

`grep -rnoE '#[0-9a-fA-F]{6}' pharmacies/web/src --include=*.tsx | wc -l` = 46.
Each was read in context.

- **37 are inside comments** recording measured contrast ratios (the contact,
  research, legal, backdrop and chart docblocks). Not paint. Leave them: they are
  the audit trail the gate's row 7 asks for.
- **8 are documented non-Tailwind paint, correct as written:**
  `app/api/og/route.tsx:10,12,13,14` (Satori inline styles, no Tailwind available),
  `components/layout/PharmaciesBackdrop.tsx:93,104` (`stroke="#45cdff"`, a declared
  ramp step, reason at `:22-27`), `components/research/PharmacyIndexCharts.tsx:26,27,28,37`
  (chart series constants with ratios written at each line).
- **ONE is a real defect:** `app/error.tsx:64` —
  `className="font-semibold text-[#0f3a4a] hover:opacity-70"`. A raw brand hex on
  an inline link **with no focus ring**. This is byte-for-byte the defect the
  privacy-policy, cookie-policy and terms waves already fixed on seven links
  (`privacy-policy/page.tsx:46-48`, `terms:33-34`, `cookie-policy:35-36`), and
  `error.tsx` was simply never in anyone's OWNS list. Fix: `text-primary-700`
  (`#177392`, 5.38:1 on white) plus `focusRing`. Owned by UC.

### 0.7 R2

`docs/pharmacies/_port/R2_DESIGN_REVIEW.md` **did not exist when section 0
closed** (`ls` fails). The hand-rolled remnants R2 is about to list are therefore
NOT folded into this plan. R5 reads R2 as an input, and any R2 remnant inside a
package's OWNS set is that package's work; anything outside every OWNS set goes to
the gap-fix agent. The one remnant already on record is `W6_RECEIPT.md:378`:
`components/forms/BookingPicker.tsx` and `DetailsForm.tsx` hand-roll their input,
chip and button recipes instead of reading `layout-utils`. UC owns it.

### 0.8 What the measurement DELETES

| session-plan package | verdict | why |
|---|---|---|
| **U4 motion/tokens/foundations, alone and first** | **DELETED** | Everything in its scope already landed in phase 1, G2 and G3: `globals-standard.css` imported, four glow channels declared, `tw-animate-css` present, `--radius` at the estate value, `.story-numeral` rules present, `<noscript>` release present, `layout-utils` row 1 = 7, grey ramp 0 `neutral` / 0 `stone`. There is nothing for U1..U3 to wait on, **so the serialisation constraint dies with it** and all builders run concurrently. Residue = two files, rolled into UC |
| **U1 homepage, Opus** | **DELETED** | `/` measures 14 bands, 11 eyebrows, 3 glow groups, 4 backdrop mounts, thermometer 1/2/4/3 against Property's 1/2/3/4, 43 main links, 14 `data-cta`, and all six homepage marketing declines re-read as measured and correct. It is the one surface already at the reference. It stays in scope **as a review row only**: R5 judges it, and anything R5 finds goes to the gap-fixer |
| U2 hubs | **SURVIVES, promoted and split** | It is now the whole uplift. Split into UA (thin hubs) and UB (detail templates) because the two families need different judgement and the file sets are naturally disjoint |
| U3 blog + lead kit | **SURVIVES, rescoped** | Lead kit is complete (0.5); what survives is blog-surface depth and `data-cta` breadth, which is distributed to whichever package owns each file rather than cutting across all of them |

---

## 1. PACKAGES

**Three builders, concurrent, no sequencing constraint.** File ownership is
disjoint and `ls`-verified: all 23 paths below returned from one `ls` with 23
lines and no error.

| package | owns | model | status |
|---|---|---|---|
| **UA** thin hubs | `app/blog/page.tsx`, `app/blog/[category]/page.tsx`, `app/calculators/page.tsx`, `app/services/page.tsx`, `app/for/page.tsx` | **Opus** | **DONE.** All five routes banded with a hero, an eyebrow and a glow group; `/blog` and `/blog/[category]` went from 1 bare section to 4 and 3; the one `sameAdjacent` on `/calculators` is gone; no sentence written. |
| **UB** detail templates | `app/services/[slug]/page.tsx`, `app/for/[slug]/page.tsx`, `app/calculators/[slug]/page.tsx`, `app/blog/[category]/[slug]/page.tsx` | Sonnet | **DONE.** H1 type step raised on all four; `calculators/[slug]` ground collision fixed (`sameAdjacent` 1 to 0); `blog/[category]/[slug]` gained its first eyebrow and closed the R2 navy-on-navy ending on all 22 posts. |
| **UC** standalone, funnel, legal, error | `app/about/page.tsx`, `app/contact/page.tsx`, `app/research/pharmacy-density-and-workload-index/page.tsx`, `app/research/pharmacy-openings-closures-index/page.tsx`, `app/book/page.tsx`, `app/complete/page.tsx`, `app/thank-you/page.tsx`, `app/error.tsx`, `app/not-found.tsx`, `app/privacy-policy/page.tsx`, `app/cookie-policy/page.tsx`, `app/terms/page.tsx`, `components/forms/BookingPicker.tsx`, `components/forms/DetailsForm.tsx` | Sonnet | **DONE.** `error.tsx`'s raw-hex link fixed; `/contact` gained its eyebrow; both research pages gained a glow group and two `data-cta` ids; the `BookingPicker`/`DetailsForm` chip and input recipes have no kit equivalent, logged as a KIT ASK rather than invented. |

**Owned by NOBODY:** `app/page.tsx` (deleted package U1, review-only),
`app/globals.css`, `components/ui/layout-utils.ts`,
`components/layout/PharmaciesBackdrop.tsx`, `components/layout/PageShell.tsx`,
`app/layout.tsx`, `components/forms/LeadForm.tsx`, `src/tests/**`, and
`packages/web-shared/**` (manager carve-out, section 2).

### Rules binding all three packages

1. **Existing wording stays.** No sentence, heading, FAQ question, FAQ answer,
   figure, label or button text is written, rewritten or deleted. Every eyebrow
   this plan adds must reuse a string the route already publishes **as a heading
   or a label in that band**; if no such string exists, **do not mint one** —
   write the decline at the call site. `LeadCTAPanel`'s `eyebrow=""` /
   `formTitle=""` / `proofPoints={[]}` pattern (locked rule 9) stays empty
   everywhere it already is.
2. **No new interruptive surface.** The four capture surfaces W7 built are the
   complete set. No modal, popup, banner, toast, auto-scroll or second sticky.
3. **Every decline is written at the call site and names the kit file path** (and
   line where the reason is a specific prop). Row 2a is a coverage check, not a
   penalty.
4. **Consent text is frozen** (`src/config/site.ts`), byte-identical, never
   retyped, never paraphrased.
5. **Link floors are a floor, never a ceiling.** `sweep_baseline.json` numbers are
   quoted per package; assert `>=`.
6. **No `packages/**` edit, no `Property/**` read-write, no other site touched**
   (trap 12). Reference files are read-only.
7. **No new ground without a measured contrast row written at the call site**, per
   stop if it is a gradient (gate row 7). `PharmaciesBackdrop.tsx:34-40` carries
   the two rows already measured (`bg-slate-900`, `bg-primary-950`); reuse a
   measured ground rather than inventing a third.
8. Do NOT launch subagents. No git command. No build, no server start or stop.

---

### UA. The thin hubs — this is the designer-edge package

**Files:** `app/blog/page.tsx`, `app/blog/[category]/page.tsx`,
`app/calculators/page.tsx`, `app/services/page.tsx`, `app/for/page.tsx`.

**Design intent, two sentences.** Property and generalist make a hub read as a
designed page by giving it a *ground rhythm*: a dark hero carrying the site motif,
then one eyebrowed band per idea alternating white and slate-50, closing on a
panel that carries the motif again — so the eye is handed from band to band
instead of scrolling one flat column (`generalist/web/src/app/blog/page.tsx:94-215`,
`services/page.tsx:175-364`). Pharmacies should echo that rhythm with its own
dispensary-shelving motif and its own published copy, and must never echo
Property's wording or its landlord motifs.

**Work:**

1. **`/blog` and `/blog/[category]`, the two worst routes.** Both render a bare
   `<div className={siteContainerLg} py-16>` with an h1 at 30px, no hero ground
   and no band. Give each a real hero `<section>` on an already-measured ground
   with `<PharmaciesBackdrop />` mounted inside it (the component is read-only;
   pass a fresh unique `patternId`, as every other mount does), and promote the
   h1 to `text-3xl sm:text-5xl lg:text-6xl leading-[1.15] text-balance` to match
   the hub step. Then band the body: the category chip row and the article list
   are already two distinct ideas, so they become two `<section>`s on alternating
   grounds. The existing `LeadCTAPanel` stays exactly as it is.
2. **Section eyebrows, from existing strings only.** `<Eyebrow>` from
   `packages/web-shared/design/primitives/page-blocks.tsx` on each new band, text
   taken from a label the route already renders (the category row already prints
   category names; `/services` and `/for` already print band headings). Use
   `onDark` on a dark ground, and note `Eyebrow.className` exists
   (playbook section 8, added 2026-09-29) if `onDark`'s slate-300 fails 4.5 on the
   ground you pick — measure before you reach for it. **If a band has no existing
   label, leave it without an eyebrow and say so.**
3. **`ScrollGlowGroup`** (`design/marketing/ScrollGlowGroup.tsx`) around the
   article-card grid on `/blog` and `/blog/[category]`, the tool grid on
   `/calculators`, and the card grids on `/services` and `/for` that are not
   already inside one. It is a wrapper: zero copy, and its `card-glow` keyframe
   reads this site's declared `--brand-glow-deep`, so no colour enters.
4. **`/calculators`** is one section with a 36px h1. Give it the hero band + h1
   step + eyebrowed tool band, same shape as item 1. Its `LeadCTAPanel` at
   `ground="white"` and the `#calculator-enquiry` anchor (M1A) stay untouched.
5. **`/services` and `/for`**: 4 and 3 bands, 0 eyebrows. Add the eyebrows and
   the ground alternation. A `StatsCounter` strip is the generalist shape here
   (`services/page.tsx:213-215`) — adopt it **only if a figure set with its own
   source links already exists in `src/config` or `src/data` for that route**;
   grep first, decline in writing if not. `StatsCounter.tone` / `.columns` /
   `StatItem.href` all exist (playbook section 8), so the old string-mangling
   decline is stale, but the figures must already be published.
6. **`DrawnTickList`** only where a route already publishes a set of
   single-sentence claims (`items: string[]`). Grep; decline at the call site
   naming `design/marketing/DrawnTickList.tsx:33` if not.
7. **`BlogListWithSearch`** only if manager kit edit **K-A** lands. Otherwise the
   existing decline at `blog/page.tsx:20-26` **stands verbatim** and must not be
   silently overwritten.
8. **`data-cta` on existing links only:** `services_hero_book`,
   `blog_index_book`, `blog_index_articles`, `blog_category_book`,
   `calc_index_help` (already present), plus `data-cta-placement` and
   `data-cta-goal` on each, matching generalist's naming.

**OFF LIMITS:** `app/page.tsx`, every UB and UC file, `globals.css`,
`layout-utils.ts`, `PharmaciesBackdrop.tsx`, `PageShell.tsx`, `layout.tsx`,
`LeadForm.tsx`, `packages/**`, every other site. The `BlogCategoryHub` and
`NumberedPagination` declines stand (0.4). No article body, no category name, no
tool name, no `niche.config.json` string is edited.

**Acceptance (run them, paste the output in the receipt):**

```bash
# 1. bands and eyebrows, in the DOM, on the manager's build
#    (the measure script shape is in section 3; run per route at 1280)
#    PASS: sections >= 3 on /blog, /blog/<cat>, /calculators; eyebrow >= 1 on all five
# 2. link floors, assert >=
curl -s localhost:3111/blog | grep -oE 'href="/blog/[^"]+/[^"]+"' | sort -u | wc -l   # must stay 22
# /blog 37  /blog/nhs-contract-and-income 17  /blog/buying-a-pharmacy 17
# /blog/locum-pharmacists 13  /blog/selling-a-pharmacy 13  /blog/vat-and-retail-schemes 12
# /calculators 13  /services 18  /for 15
# 3. prose multiset unchanged on all five routes (extract visible text, sort, diff) -> empty
# 4. every ld+json block on all five routes json.loads -> 0 failures, block count >= before
# 5. new grounds: one contrast row per stop, written at the call site
grep -rc "data-cta" pharmacies/web/src/app/blog/page.tsx pharmacies/web/src/app/services/page.tsx
```

**Receipt:** `docs/pharmacies/_port/UA_RECEIPT.md`. **Model: Opus** — this is the
package the owner's verdict turns on now that the homepage is done.

---

### UB. Detail templates

**Files:** `app/services/[slug]/page.tsx`, `app/for/[slug]/page.tsx`,
`app/calculators/[slug]/page.tsx`, `app/blog/[category]/[slug]/page.tsx`.

**Design intent.** The detail templates are closer (6/6/5/3 bands, 1 eyebrow
each, 2 glow groups on two of them) but they still read as one long column
because only the first band is labelled and the article template has no eyebrow at
all; Property gives every band on a detail page the same eyebrow + ground
treatment as a hub, so a long page still has a visible skeleton. Echo the
treatment, not Property's copy.

**Work:**

1. `<Eyebrow>` on each band that already renders a heading or label and does not
   have one. Existing strings only; no eyebrow where no label exists.
2. `ScrollGlowGroup` on the card grids on `/calculators/[slug]` (0 today) and on
   any grid in the other three not already wrapped.
3. **Fix the one ground collision:** `/calculators/[slug]` measures
   `sameAdjacent = 1`, two touching bands on the same computed background. Find
   the pair and alternate one of them (white / slate-50), the G3 rule.
4. H1 rhythm: `/services/[slug]` and `/for/[slug]` stop at `sm:text-5xl`,
   `/calculators/[slug]` and the post template at 36px. Add the `lg:` step and
   `leading-[1.15]` to match `/`'s treatment one step down. **Class strings only;
   no heading text changes.**
5. `data-cta` on existing links: `service_hero_book`, `hub_hero_book`,
   `calc_hero_help`, plus placement and goal. `blog_skip_to_form` and
   `blog_sidebar_book` already exist on the post template; leave them.
6. Re-read the three `WhatToExpectCard` / `CardStack` / `ComparisonTable` declines
   at `services/[slug]:156-184` and either uphold each with its measurement or
   reverse it with one — **never silently overwrite**.

**OFF LIMITS:** `app/page.tsx`, every UA and UC file, the shared chrome, tests,
`packages/**`, every other site. No article body is edited; no calculator input,
label, formula, golden or result string is touched (phase 0 closed the claims
ledger and T36 applies). `InlineMiniLeadForm` and `CalcResultCta` mounts stay
exactly where they are, one form per result.

**Acceptance:**

```bash
# 1. eyebrow >= 2 and sections unchanged-or-up on all four templates, in the DOM
# 2. sameAdjacent == 0 on /calculators/locum-take-home-comparator
# 3. link floors >= : /services/* 10 each (8 routes)
#    /for/pharmacy-owners 16  /for/buying-a-pharmacy 15  /for/selling-a-pharmacy 13
#    /for/pharmacy-groups 17  /for/locum-pharmacists 13
#    /calculators/* 11 each (3)  every post route 14 to 23, see sweep_baseline.json
# 4. prose multiset unchanged on all 8+5+3+22 routes -> empty diff
# 5. calculator goldens: cd pharmacies/web && npm test  -> unchanged pass count
# 6. one ld+json parse pass over every route these four templates generate
```

**Receipt:** `docs/pharmacies/_port/UB_RECEIPT.md`. **Model: Sonnet.**

---

### UC. Standalone pages, funnel, legal, error

**Files:** the 14 listed in the ownership table.

**Design intent.** These are the pages a visitor lands on after a decision, and on
Property they still carry the site's motif and labelling rather than dropping to
plain documents; `/contact` here already mounts the backdrop but has no eyebrow at
all, and the funnel and legal pages are unlabelled. Give them the same minimum —
motif above the fold, one eyebrow per band, instrumented links — without adding a
single word.

**Work:**

1. **The one real paint defect: `app/error.tsx:64`.** `text-[#0f3a4a]` with no
   focus ring becomes `text-primary-700` (`#177392`, 5.38:1 on white) plus
   `focusRing` from `@/components/ui/layout-utils`, exactly as
   `privacy-policy/page.tsx:46-48`, `terms:33-34` and `cookie-policy:35-36`
   already did for seven links. Check `not-found.tsx` for the same shape.
2. **`/contact`** (2 bands, 0 eyebrow): eyebrow the bands from existing labels;
   the backdrop mount at `:70` stays.
3. **`/about`** (3 bands, 2 eyebrows): third band's eyebrow if a label exists.
4. **Both research pages** (9 bands, 2 eyebrows each, 0 glow): eyebrows on the
   labelled bands, `ScrollGlowGroup` on the card grids. **Do not touch
   `PharmacyIndexCharts.tsx`** — it is not in OWNS, its hex constants are
   documented, and T16 (`role="img"`) plus the "chart values as text nodes" rule
   are already satisfied.
5. **`/book`, `/complete`, `/thank-you`:** already 2 bands with a `SlimHero` +
   backdrop. Then close `W6_RECEIPT.md:378`: `BookingPicker.tsx` and
   `DetailsForm.tsx` hand-roll input, chip and button recipes — route them through
   `layout-utils` (`btnPrimary`, `btnSecondary`, `focusRing`). **Lead-pipeline
   files: class strings only. No field name, no `name=`, no `formId`, no submit
   handler, no API path, no consent string, no redirect target changes.** If a
   recipe swap would change a rendered control's geometry enough to move the
   submit button, stop and record it rather than shipping it.
6. **Legal pages:** eyebrow where a heading already exists (`privacy-policy` has
   one adopted at `:42`); leave the rest. The `SlimHero` / `FaqSection` /
   `LeadCTAPanel` declines at `privacy-policy:52-60` stand.
7. **`data-cta` on existing links:** `about_hero_book`, `contact_pricing_link`
   (grep first; decline in writing if no pricing link exists),
   `research_pharmacy_openings_closures_index_hero_book` / `_hero_data` / `_csv`
   and the density twin, matching generalist's `research_*` naming.

**OFF LIMITS:** `app/page.tsx`, every UA and UB file, `components/forms/LeadForm.tsx`,
`components/research/PharmacyIndexCharts.tsx`, `globals.css`, `layout-utils.ts`,
`PharmaciesBackdrop.tsx`, `PageShell.tsx`, `layout.tsx`, tests, `packages/**`,
every other site. The Aswatax post-submit message, the nurture config and every
legal sentence are frozen.

**Acceptance:**

```bash
# 1. zero raw hex paint left in tsx outside the 8 documented ones
grep -rnoE 'text-\[#|bg-\[#|border-\[#' pharmacies/web/src --include=*.tsx   # expect 0
# 2. focus ring present on every inline link these files render (ring guard test passes)
cd pharmacies/web && npm test -- focus-ring
# 3. link floors >= : /about 10  /contact 10  /privacy-policy 10  /cookie-policy 10
#    /terms 10  /research/pharmacy-openings-closures-index 18
#    /research/pharmacy-density-and-workload-index 14
# 4. booking flow still submits: POST /api/leads/book reaches a lead row on the local build,
#    and the consent paragraph is byte-identical to src/config/site.ts
# 5. prose multiset unchanged across all 14 routes -> empty diff
# 6. 390px: zero horizontal overflow on /book, /complete, /thank-you after the recipe swap
```

**Receipt:** `docs/pharmacies/_port/UC_RECEIPT.md`. **Model: Sonnet.**

---

## 2. Manager carve-outs: `packages/web-shared/**`

Both are additive with a default equal to today's behaviour, so every existing
consumer renders byte-identically. Manager-direct, before the builders start,
recorded in playbook section 8 item 11 in the same commit, `npm test` in the kit.

### K-A. `BlogListWithSearch.postsPerPage` + hide instead of slice (RECOMMENDED)

`packages/web-shared/design/blog/BlogListWithSearch.tsx:43` hardcodes
`postsPerPage = 12` and `:91` slices the array before render, so posts 13..22
never reach the server HTML. **This is the live estate trap in memory
`kit_blog_list_12_post_cap`: Solicitors (196 posts), Dentists (223), Medical,
construction-cis, charities and Property all cap their server HTML at 12.**

The edit: add `postsPerPage?: number` (default 12) and replace the slice with the
`hidden`-attribute pattern `HubArticleList.tsx:42-55,117-124` already uses, so
off-page cards stay in the HTML behind the pager. Two changes, one default
preserved, and it unlocks a real search box on a 22-post index here.

**It changes the rendered HTML of six live sites, so turning it on for them is a
separate job with its own check — not this wave's work.** Q3 asks for the go on
the kit change itself; UA adopts the component here only if it lands.

### K-B. `CoverageCards` glow literals (OPTIONAL)

`design/marketing/CoverageCards.tsx:88` carries
`shadow-[0_6px_20px_-8px_rgba(5,150,105,0.28)]` and its hover twin at `0.4` —
literal Property emerald inside a Tailwind arbitrary value that no prop and no
custom property can override, which is why `/` band 4 ships `glow` OFF
(`W5_RECEIPT.md` D3). Swap both for `rgb(var(--brand-glow-deep, 5 150 105) / 0.28)`
and `/ 0.4`: byte-identical for every site that does not declare the channel, and
pharmacies declares all four. Not on the critical path.

---

## 3. R5 review, gap-fix, R6 re-review

### R5, adversarial design review, Opus

**Inputs:** this file, the three receipts, `R2_DESIGN_REVIEW.md` and
`R3_CONTENT_REVIEW.md` once they exist, `DESIGN_GAP_DIAGNOSIS_2026-09-14.md`,
`sweep_baseline.json`, `cta_baseline.json`, `browser_baseline.json`.

**Method:** the **rendered DOM** on the manager's single build at `:3111`, via
curl and puppeteer-core + the installed Edge, never source grep alone, never a
screenshot as the only evidence. Measure at 1280 and 390.

**Scope includes `app/page.tsx`**, which no builder owns: U1 was deleted on
measurement, so R5 is the only thing that looks at the homepage this round. It
also re-reads, and either upholds with a measurement or reverses with one, every
decline the builders wrote or left standing.

**Ship with a KNOWN AND ACCEPTED list** (the eight documented hex literals, the
`WhatToExpectCard` declines, the `BlogCategoryHub` copy block, `/resources`
absence, `--radius: 0rem`, the 37 comment hexes) so it spends its effort on new
ground. **Finding nothing is a failed review.** Output
`docs/pharmacies/_port/R5_UPLIFT_REVIEW.md`, severity-tagged, every finding with
the command that found it and the file:line that must change.

### Gap-fix, Sonnet

**Input:** R5's findings plus every "could not reach" row in the three receipts
plus any R2 remnant that fell outside all three OWNS sets. **Owns:** only the
files R5 names. Same rules as section 1. Receipt
`docs/pharmacies/_port/U_GAPFIX_RECEIPT.md`.

### R6, re-review, Sonnet

Re-runs R5's own commands against the rebuilt site, one row per R5 finding:
fixed / not fixed / fixed and broke something else. No new scope. It closes when
every R5 row is closed or carried into STATE.md as a named owner item. Output
`docs/pharmacies/_port/R6_UPLIFT_REREVIEW.md`.

---

## 4. Manager block

Manager writes no page code. All git, the kit carve-outs, builds, STATE.md and
owner comms are manager-direct.

1. **Before briefs ship:** `ls`-verify the three OWNS lists (done above, 23/23),
   `netstat -ano | grep ":31"` and kill orphans, `git tag -l 'port-*'`.
2. **Kit edits K-A (and K-B if taken)** land first, manager-direct, with
   `cd packages/web-shared && npm test` and the playbook section 8 item 11 entry
   in the same commit.
3. **Launch UA, UB, UC concurrently.** No sequencing: the foundations package that
   forced serialisation on startups-tech does not exist here (0.8).
4. **One serialised build at wave close**, from the monorepo root, explicit paths,
   never `git add -A`:
   ```
   python scripts/check_dependency_closure.py
   cd pharmacies/web && npx tsc --noEmit && npm test
   cd packages/web-shared && npm test          # only if the kit was touched
   cd pharmacies/web && npx next build && npx next start -p 3111
   node docs/_engines/instruments/sweep.mjs          # 0 internal 404s, link floors, em-dash 0
   node docs/_engines/instruments/browser_check.mjs  # scrollWidth == 390 on every route
   node docs/_engines/instruments/cta_snapshot.mjs   # full data-cta triple diff vs cta_baseline.json
   ```
   **Trap 22 lives here:** the `data-cta` work in all three packages ADDS ids. Diff
   the whole set against `cta_baseline.json` and report every triple whose
   placement or goal CHANGED, separately from the ones that are new. The chrome
   triples (`header_book`, `header_book_mobile`, `header_contact`) must be
   byte-identical.
5. **Re-run the section 9.1 gate block verbatim** from the monorepo root with
   `DIR=pharmacies` and the **four-marker thermometer**, both comment-stripped.
   Expected: row 1 >= 7, row 2 up from 12/69, row 2a up (more declines written is
   correct), rows 3/4/5/8 pass, rows 6/7 every printed line explained in-file.
   Thermometer: report it, do not chase it.
6. **Paste both tables into `docs/pharmacies/STATE.md`** in the same commit as the
   phase they describe, with the per-template DOM depth table from 0.2 re-measured
   after the wave. Every decline in STATE.md names the kit file path and the kit
   SHA.
7. **Tag:** `port-pharmacies-uplift` = `port-pharmacies-complete`, both on the LAST
   fix commit (T-H15), and STATE.md's close block names that SHA.
8. `HANDOFF_NEXT_PORT.md` next site = care. `PORT_FIELD_NOTES.md` appended last,
   with 0.8 as its headline: **two of four uplift packages were deleted by the
   measurement, and T-H12 is now two-for-two.**
9. **Owner walk** on a local dev server. Side-by-side full-page PNGs of
   pharmacies and generalist at 1280x900 and 390x844 for `/`, `/blog` and
   `/services`, saved to the session scratchpad — `/blog` is the pair that shows
   the uplift, because it is the route the measurement found worst.
10. **No push, no deploy, no IndexNow, no `monitored_pages` change.** Report agents
    used and any CI or deploy noise before he finds it. Clean the scratchpad.

---

## 5. Owner questions, bundled, nothing blocked

**Q1. A resources page.** Holloway Davies has a `/resources` section where a
visitor swaps an email for a template or a worked example. Pharmacies has no such
page, which is why two of the twelve lead-kit slots are empty. The programme plan
already puts this in a later estate-wide round covering five other sites at once,
and that is still the cheaper way to do it. **Recommendation: leave it there.**
Say so only if you want it pulled into this port instead.

**Q2. Blog category landing pages.** The shared component that gives a blog
category its own designed landing page needs six blocks of copy this site has
never published — an intro, a description, an essentials heading, a library note
and a CTA pair. Writing them is a content job, not a design one. **Recommendation:
no for now**, and the pages keep their current working shape either way.

**Q3. A search box on the blog index.** Holloway Davies lets you search its
articles. Adding it here needs a small change to the shared code, because today
that component silently hides everything past the twelfth article — which it is
also doing right now on six live sites, including Property and Solicitors, where
several hundred articles are missing from the page search engines read. The change
is a few lines and makes every one of those pages more complete. **Recommendation:
yes.** Turning it on for the other six sites afterwards should be its own small
job with its own check, because it changes what those pages send.

**Q4. Does anything get rewritten?** No. Not one sentence, heading, question,
answer, figure or button label. The uplift is band structure, labels taken from
words already on the page, the site's own motif, and tracking attributes on links
that already exist.

---

## 6. Agent count

The port has used **32 of about 38**. Six remain, and this plan needs six.

| role | count | model |
|---|---|---|
| UA thin hubs | 1 | **Opus** |
| UB detail templates | 1 | Sonnet |
| UC standalone, funnel, legal, error | 1 | Sonnet |
| R5 adversarial design review | 1 | **Opus** |
| gap-fix | 1 | Sonnet |
| R6 re-review | 1 | Sonnet |
| **total** | **6** | |

One under the session plan's seven, because the deleted U4 and U1 bought back two
and the hub split spent one. All three builders run concurrently. If R5 comes back
heavy, the spare slot is a second gap-fixer on a disjoint file set, never a second
reviewer.

---

## Close (2026-10-07, manager)

**What landed.** UA, UB and UC all ran concurrently and all closed DONE (section 1
table above). The five thin hubs and four detail templates now carry a hero,
an eyebrow and a glow group where the measurement in section 0 found none; the
one real paint defect (`error.tsx:64`) is fixed; the research pages and
`/contact` gained their eyebrows and tracking attributes. The independent
design review (R2) and content review (R3) that followed found 2 blockers, 7
serious and 6 minor (R2) and 0 blockers, 2 serious and 4 minor (R3); every
blocker and both R3 serious items are fixed in source, by W7B (the two R2
blockers, B1 and B2, plus S4 and the focus-return half of H8-9), G4 (S3, the
dark-ground ring token), and M1b (R3's S1 and S2, the sr-only caption and the
breadcrumb truncation). Full detail and disposition of every remaining finding
is in `docs/pharmacies/STATE.md`, "Uplift (same day)".

**What the measurement deleted.** Section 0.8 killed two of the four
session-plan packages before a single line was written: U4 (motion, tokens
and foundations) because everything in its scope had already landed in phase
1/G2/G3, and U1 (the homepage rebuild) because the homepage already measured
at the reference level (14 bands, thermometer 1/2/4/3). That is why this plan
shipped three packages, not four, and why U2 survived split into UA and UB
rather than standing alone.

**Residuals pending R4.** The final build and the R4 re-review are running now
and are not available to this close. Nothing in R2's serious or minor list
beyond the two blockers and the two R3 serious items has been re-verified
against the fixed source; R2's own S2 and S5 (two brand darks on one page, and
the two hub-hero shape gaps) were explicitly sent to this uplift rather than
to a fixer, and R4 is what judges whether they are now closed. The K-A
(`BlogListWithSearch` page cap) and K-B (`CoverageCards` glow literal) kit
edits did not land; both declines stand verbatim, unchanged by this close.

**Agents used.** UA, UB, UC (the three builders this plan specified), plus the
R2 gap-fixers W7B, G4 and M1b, the uplift planner, two STATE.md drafting
passes, a handoff drafter, a playbook fixer, the M1_INPUT compiler, and the
V1/R2/R3 review passes themselves: 16 agents in this stage. Running port
total, with this stage added: **52** (see `docs/pharmacies/STATE.md`).

---

## Round 2 (2026-10-07, after R4)

Four packages, all done, closing the R4 Part B parity verdict and the V2
blocker.

| package | agent | one-line result |
|---|---|---|
| **W7C** | Opus | Modal guard re-arms via a `MutationObserver` on the widget panel's open state rather than checking DOM presence once; the real defect was the one-shot gate. Blog takeaways band ground fixed (`bg-slate-50` to `bg-white`). No prose changed; V2's "rewording" finding traced to its own hyphen-stripping normaliser, not a source edit. |
| **G5** | Sonnet | Ring reset rescoped to `:not(a):not(button)` after G4's unscoped selector caught white CTA links (the N2 regression). 10 prose-anchor rings with no recipe at all closed at the token level with one base `a:focus-visible, button:focus-visible` rule. Research captions moved `white/50` to `white/60`. m1 fixed with `eyebrow=""` on both research `FaqSection` mounts. |
| **UA2** | Opus | `/services` and `/for` hero padding raised to close the thin-hero gap; `/for` card wall gained at-rest arrow affordance and a 3-up breakpoint; `/blog` gained a second eyebrow from an existing label. Four-plus eyebrows per hub confirmed unreachable without owner-written band labels; every candidate kit component checked and declined with its reason named at the call site. |
| **UB2** | Sonnet | `CoverageCards` and `NumberedReasons` adopted on `services/[slug]`; `CoverageCards html` adopted on `for/[slug]` (load-bearing: 19 anchors in the source data); kit `Prose` adopted on `calculators/[slug]`'s explainer band. V2's white/white ground pair on `calculators/[slug]` closed (band moved to `bg-slate-50`, the W7C handoff). Eyebrows land at 3/1/1 across the three templates; the round-1 decline blocking `CoverageCards` on every card grid is reversed, since the anchor-colour hook already existed at the call site. |

**Close block, residuals updated.** R2's S2 (two brand darks) and S5 (two thin
heroes) are now addressed by UA2's padding and G5's token fix; S1 and S7 are
CLOSED by G5; m1 is CLOSED by G5; m4 (one missing full stop) stays open,
outside every package's lease. The eyebrow-density gap (R4 Part B item 2) and
the illustrative-component count (item 4, honest total 4 against Property's
12) are both now owner decisions, not engineering residue: see
`docs/pharmacies/STATE.md`, "Owner decisions needed, bundled (2026-10-07)".
Tests moved 83 to 86 across 8 files. Final verification V3 and re-review R5
are pending; tags remain on the final fix commit, not yet cut.
