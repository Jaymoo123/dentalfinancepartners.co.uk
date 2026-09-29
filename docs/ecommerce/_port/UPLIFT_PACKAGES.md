# ecommerce DESIGN UPLIFT: package plan

Read-only planning pass, 2026-09-29. No source file edited except this one. No
`next build`, no `next dev`, no server started (the `.next` build is STALE:
`ecommerce/web/.next/BUILD_ID` is `2026-09-28 23:05`, the last source commit
touching `ecommerce/web/src` is `2026-09-28 23:08:12 +0100`, so the brief's
conditional was not met and the plan is made from source). No git write. No
subagent. Every number below carries the command that produced it, run from the
monorepo root.

Trigger: the owner's standing ruling that the uplift is part of the port, "same
thing as other sites, make sure the advanced designer kit is ported as well as
the lead stuff". The precedent is `docs/startups-tech/_port/UPLIFT_PACKAGES.md`
plus its reviews `R5_UPLIFT_REVIEW.md` / `R6_UPLIFT_REREVIEW.md`, and the cause
analysis in `docs/_engines/DESIGN_GAP_DIAGNOSIS_2026-09-14.md` (kit adoption,
not art direction).

**Read section 0 before you plan any work. This site is not startups-tech.** It
starts from a materially stronger position and the package shape below is
re-cut to match what is actually missing, which is the lead kit and the
instrumentation, not the foundations.

---

## 0. Where this site actually sits, measured

### The §9.1 kit-adoption gate, run AS WRITTEN

Block from `docs/_engines/DESIGN_PORT_PLAYBOOK.md:813-833`, `DIR=ecommerce`:

```
1  layout-utils   : 6                                   PASS (>=1)
2  kit adopted    : 7 distinct / 45 call sites           PASS (no floor; generalist 15/140)
2a kit declined   : 159 comment references naming a kit path
2b homepage mktg  : adopted=3 declined=16                PASS
3  webfont        : geist/font/sans                      PASS
4  backdrop       : 1                                    PASS
5  eyebrow ratio  : Eyebrow=7 section-label=0            PASS
6  rings not token: (none printed)                       PASS
7  gradients      : app/page.tsx, components/layout/EcommerceBackdrop.tsx
8  ring guard     : walks=1 guards-the-guard=1           PASS
```

All eight rows pass. Row 2a is the row to read: **159 decline comments against
45 adoptions.** The playbook's note under row 2a ("a high row 2a with a low row
2 is a site that declined nearly everything") applies in a weaker form than it
did on startups-tech (5/40 against 114), but the ratio is still the shape that
produced "plain jane" elsewhere. Row 6 being empty is a genuine strength: this
site has exactly one ring mechanism, `outline-[var(--focus-ring)]`, and the
impossibility proof for it is written out in `globals.css` above
`--focus-ring-on-light`.

### The four-marker row, comment-stripped

```
P=ecommerce/web/src/app/page.tsx
S=$(perl -0pe 's{/\*.*?\*/}{}gs; s{//[^\n]*}{}g' $P)
echo "ping=$(echo "$S"|grep -c 'animate-ping') stats=$(echo "$S"|grep -c 'StatsCounter') backdrop=$(echo "$S"|grep -c 'Backdrop') rounded-full=$(echo "$S"|grep -o 'rounded-full'|wc -l)"
```

| site | ping | StatsCounter | Backdrop | rounded-full | owner verdict |
|---|---|---|---|---|---|
| Property | 1 | 2 | 3 | 4 | "wow" |
| generalist | 1 | 2 | 3 | 4 | "looks good" |
| **ecommerce TODAY** | **1** | **2** | **3** | **4** | not walked |
| startups-tech after uplift | 1 | 3 | 3 | 4 | "yep that's great" |
| hospitality after today's wave | 1 | 1 | 3 | 3 | not walked |
| crypto post-uplift | 0 | 0 | 3 | 1 | "much better" |

**ecommerce already sits at 1/2/3/4, the Property and generalist row, before a
single line of uplift.** Every hit is real code, not a comment: the
`animate-ping` live dot pair is `page.tsx:268-269`, `StatsCounter` is imported
at `:5` and mounted at `:307`, `EcommerceBackdrop` is imported at `:8` and
mounted twice (`:262` hero, `:673` closing panel), the four `rounded-full` are
the status pill and its dot pair plus the trust-badge dots. The judge the owner
set is therefore **already satisfied on this site**, which changes what this
wave is for: it is not about the homepage markers, it is about the kit breadth
and the lead instrumentation behind them. Report the row; do not chase it.

### Kit import census (real `from "..."` lines only)

```
grep -rhoE 'from "[^"]*web-shared/design/(marketing|primitives)/[A-Za-z-]+"' <site>/web/src \
  | grep -oE '(marketing|primitives)/[A-Za-z-]+' | sort | uniq -c | sort -rn
```

| component | generalist | ecommerce |
|---|---|---|
| page-blocks | 36 | 15 |
| Breadcrumb | 29 | 14 |
| LeadCTAPanel | 24 | 9 |
| FaqSection | 12 | 0 |
| NoticeCard | 7 | 2 |
| SlimHero | 5 | 3 |
| ExampleFigureNote | 5 | 0 |
| DrawnTickList | 5 | 0 |
| WhatToExpectCard | 4 | 0 |
| StatsCounter | 3 | 1 |
| ProcessTimeline | 3 | 0 |
| CoverageCards | 3 | 0 |
| PromptMarquee | 2 | 0 |
| NumberedReasons | 2 | 1 |
| accordion | 1 | 0 |
| ScrollGlowGroup | 1 | 0 |
| **distinct / call sites** | **15 / 140** | **7 / 45** |

Plus `design/blog/*`: ecommerce imports `ReadingProgress`, `TableOfContents` and
`RelatedArticles` on the post template (`blog/[category]/[slug]/page.tsx:6-8`)
and does **not** import `BlogSidebarCta`.

### The instrumentation hole, and it is the biggest single finding

```
grep -rhoE 'data-cta="[^"]*"' ecommerce/web/src --include=*.tsx | sort | uniq -c
      1 data-cta="thankyou-return-article"
```

and the port's own rendered snapshot agrees:

```
docs/ecommerce/_port/cta_final.json
  routes: 51, scanned: 51, non_interactive_ctas: []
  distinct_triples: { "header_book|header|contact|data-cta": count 51 }
```

**The entire live site emits ONE `data-cta` id, `header_book`, and it is the
same id on all 51 routes.** No hero CTA, no panel CTA, no blog CTA, no
calculator CTA, no research CTA. generalist emits 149. Nothing in
`vw_cta_performance` can attribute a single conversion on this site to anything
below the header. This is the "lead stuff" half of the owner's sentence and it
is the highest-value work in the wave, ahead of any visual change.

Two related facts, both source-derived and both to be re-asserted against the
rendered DOM at wave close:
- `PageShell.tsx:83-85` sets `ctaContactGoal: "contact"` and
  `ctaMobilePlacement: "header_mobile"` and leaves `ctaIds` at the kit defaults,
  so the kit *should* also emit `header_book_mobile` and `header_contact`
  (`packages/web-shared/design/chrome/SiteHeader.tsx:43-45`). The snapshot shows
  only `header_book`. Either the secondary and drawer links are not rendered on
  this site's nav config, or the scanner missed the drawer. **Resolve this
  before U-work starts; it is trap 22 territory.**
- `packages/web-shared/design/marketing/LeadCTAPanel.tsx` contains **no
  `data-cta` at all**, so the nine panels this site already mounts are silent by
  design. Instrumenting them is a kit edit (C1), not a site edit.

### Enquiry forms per money page

```
for f in $(find ecommerce/web/src/app -name page.tsx|sort); do
  s=$(perl -0pe 's{/\*.*?\*/}{}gs; s{//[^\n]*}{}g' $f)
  printf "%-50s panel=%s form=%s details=%s\n" "${f#ecommerce/web/src/app}" \
    "$(echo "$s"|grep -c '<LeadCTAPanel')" "$(echo "$s"|grep -c '<LeadForm')" "$(echo "$s"|grep -c '<details')"
done
```

Money pages with **zero** capture today:

| route | panel | form | verdict |
|---|---|---|---|
| `/blog` | 0 | 0 | **MISSING** |
| `/blog/[category]` (6 routes) | 0 | 0 | **MISSING** |
| `/calculators` (index) | 0 | 0 | **MISSING** |
| `/research` (hub) | 0 | 0 | **MISSING** |
| `/research/online-seller-index` | 0 | 0 | **MISSING** |
| `/research/online-seller-survival-index` | 0 | 1 | panel MISSING |
| `/blog/[category]/[slug]` (15 posts) | 0 | 1 | panel + sidebar CTA MISSING |

Already at parity: `/`, `/about`, `/for`, `/for/[slug]`, `/services`,
`/services/[slug]`, `/vat`, `/vat/[slug]`, `/calculators/[slug]`, `/contact`
(form only, correct for that route).

The owner's ruling is "enquiry form on every money page including calculators
and research indexes". That is 24 routes short today.

### Grey ramps

```
for r in neutral slate stone zinc gray; do echo -n "$r: "; \
  grep -rho "\b$r-[0-9]\{2,3\}" ecommerce/web/src --include=*.tsx --include=*.ts --include=*.css | wc -l; done
neutral: 517   slate: 280   stone: 0   zinc: 0   gray: 0
```

**Two ramps, the startups-tech defect at the same size.** 32 files carry
`neutral-*`. Every kit component this site mounts and every one this plan adds
paints `slate-*` (`StatsCounter.tsx:138-139`, `LeadCTAPanel`, `SlimHero`,
`Breadcrumb`, `NoticeCard`). So kit slate cards sit inside neutral sections on
the same screen. Two near-identical greys never line up and the eye reads the
mismatch as cheapness without being able to name it. This is the single most
likely remaining source of a "plain jane" verdict on this site and it is
mechanical to fix.

**Direction of the sweep is `neutral` -> `slate`**, one-for-one by step, because
the kit is slate and the kit is the standard. Note the cost honestly: 517 hits
against 280, so the majority moves. If a re-measure shows a token in
`globals.css` anchored on a neutral hex that a `slate` class would then clash
with, stop and report rather than inventing a step.

### globals.css motion layer

```
wc -l:  Property 832, generalist 329, ecommerce 435, startups-tech 262
grep -c '^@keyframes' ecommerce/web/src/app/globals.css   -> 1   (num-glow, :418)
grep -n '@import' ...                                     -> tailwindcss, packages/site-styles/prose-standard.css
grep -n 'globals-standard' ...                            -> :208, a comment saying the site does NOT import it
grep -n 'radius' ...                                      -> :64-74, --radius: 0.75rem DECLARED
grep -n 'brand-glow' ...                                  -> 0
```

Findings:
- **`--radius: 0.75rem` is declared** (`globals.css:73`), with a written reason
  for not adding the `--radius-*` siblings. **R5 blocker B1 does not exist on
  this site.** Do not "fix" it; the comment at `:64-72` explains that Tailwind
  v4 already derives the scale and that adding siblings would double-derive.
- The site **deliberately does not import** `globals-standard.css`
  (`globals.css:206-214`), and the reason written there is the crypto reason:
  it would drag Property's collapsed draw states across and left a sibling site
  with 64 pages of invisible marks. It instead declares six local `.related-card`
  lines in amber plus a local `num-glow` keyframe and a
  `[data-draw="off"]` pair at `:407-416`.
- **`[data-draw="off"]` has no release mechanism visible.** `grep -n
  'scripting\|noscript\|data-draw'` over `globals.css` and `layout.tsx` returns
  the two `globals.css` rules and nothing else. On startups-tech this was
  designed out by gating behind `(scripting: enabled)`. Here the pre-draw state
  is `neutral-300` text rather than `opacity: 0`, so a no-JS reader sees a
  legible-but-grey numeral rather than nothing, which is a much smaller defect
  than the one that hit the sibling. **Verify it in the rendered DOM with JS
  off before changing anything** (F-check F8); if the numeral is legible, the
  correct action is to leave it and write the measurement down.
- `.eyebrow-rule`, `.tick-draw`, `.card-glow` and `marquee-y` name nothing on
  this site. So `DrawnTickList` would ship a static tick and `Eyebrow`'s rule
  does not draw. That is the only thing the motion sheet would buy, and the
  seven `<Eyebrow>` call sites on the homepage are already the kit component.

### Breadcrumb `crumbOnBrand`

```
grep -rn 'crumbOnBrand' ecommerce/web/src | wc -l   -> 26 hits across 13 files
```

13 routes carry the wrapper hack, twice each (the class string plus its
explanatory comment, or two crumb mounts). `Breadcrumb.tone` landed 2026-09-29
(`packages/web-shared/design/primitives/Breadcrumb.tsx:36,83,90`; `tone` wins
over the legacy `onDark` boolean, and the tone table reproduces the legacy
strings exactly). The 13 files are: `about`, `calculators`, `calculators/[slug]`,
`contact`, `for`, `for/[slug]`, `research`, `research/online-seller-index`,
`research/online-seller-survival-index`, `services`, `services/[slug]`, `vat`,
`vat/[slug]`.

### `outline-none`, wrapper `data-cta`, hex census

```
grep -rc 'outline-none' ecommerce/web/src --include=*.tsx | grep -v ':0'
  -> components/forms/LeadForm.tsx: 1        (one hit; read it, it is paired with a ring)
grep -rnoE '<(div|section|aside|li|figure)[^>]*data-cta=' ecommerce/web/src --include=*.tsx
  -> (none)                                   R5 blocker B2 does not exist here. KEEP IT AT ZERO.
```

Raw hex, comment-stripped, live code only
(`perl -0pe 's{/\*.*?\*/}{}gs; s{//[^\n]*}{}g'` then `grep -coE '#[0-9a-fA-F]{6}'`):

| file | live hex | nature |
|---|---|---|
| `app/research/online-seller-index/page.tsx` | 37 | chart/table colours, `#1a3a5c` |
| `lib/emails/lead-service-template.ts` | 15 | email HTML, exempt (no CSS cascade) |
| `lib/leads/handoff.ts` | 12 | email HTML, exempt |
| `components/research/SurvivalIndexCharts.tsx` | 9 | SVG chart series |
| **`app/page.tsx`** | **8** | `bg-[#1a2942]`, `bg-[#fafaf9]` as arbitrary Tailwind values |
| `components/research/FormationSeasonalityChart.tsx` | 7 | SVG chart series |
| `app/research/online-seller-survival-index/page.tsx` | 6 | chart |
| `app/research/page.tsx` | 4 | chart |
| `app/api/**` (4 files) | 13 | transactional HTML, exempt |
| `components/layout/EcommerceBackdrop.tsx` | 2 | SVG gradient stops, documented |
| `components/layout/PageShell.tsx` | 1 | documented |
| `app/{vat,services,for,calculators,blog}/[slug]/page.tsx` | 1 each | check individually |

`globals.css` itself carries 64. The rule "no hex outside `globals.css`" is
violated most visibly on the homepage: `bg-[#1a2942]` (the hero ground, 4 uses)
and `bg-[#fafaf9]` (the alternating band ground, 4 uses) are arbitrary values
where a token exists. Those eight are in scope for U4. **Chart and email hexes
are NOT in scope**: an SVG series colour is data encoding, not a design token,
and an email body has no access to the sheet.

### Native `<details>` FAQ templates

Five templates hand-roll `<details>`:
`blog/[category]/[slug]:106`, `calculators/[slug]:129`, `for/[slug]:223`,
`services/[slug]:212`, `vat/[slug]:214`. Each carries a written decline naming
`packages/web-shared/design/primitives/FaqSection.tsx` and each sits directly
under a `buildFaqJsonLd(...)` block (`calculators/[slug]:68`, `for/[slug]:205`,
`services/[slug]:196`, `vat/[slug]:197`; the blog post emits an inline
`"@type": "FAQPage"` at `:68`). **The schema matches the rendered answers on all
five**, because native `<details>` keeps every answer in the server HTML whether
open or closed. That is exactly the defect the decline was written to avoid and
the decline was correct.

The homepage FAQ band (`page.tsx:645-660`) is a **third** shape again: plain
`<div>` cards, no `<details>`, no accordion, fed the same `faqs` array that
`buildFaqJsonLd` reads. So the site currently ships three FAQ presentations.

### Link floors

`docs/ecommerce/_port/sweep_final.json` (2026-09-26, 51 routes, `sha 505595df`)
carries a per-route count and it is the baseline this wave asserts `>=` against.
No new capture is needed. Floors, abbreviated: `/` 28, `/services` 20, `/for` 24,
`/vat` 20, `/blog` 40, `/calculators` 24, `/research` 22,
`/research/online-seller-index` 30, `/research/online-seller-survival-index` 23,
`/about` 20, `/contact` 20, the four `/services/*` 20 each, `/for/*` 25-28,
the five `/vat/*` 20-23, the four `/calculators/*` 20-23, the six
`/blog/<category>` 27-28, the fifteen posts 24-30. Read the file, do not retype.

`sweep_final.json` also records `dashes` and `deadLinks`; both are part of the
baseline diff, not just the link counts.

---

## A. Surface-by-surface gap table

Reference is generalist where it has the route, Property where it does not, and
`hospitality/web/src/app/page.tsx` at `577e22e2` as the most recent accepted
homepage shape. "Mechanical" = existing copy only, every new label a config
string. "GATE" = needs an owner decision or copy the site does not publish.

### A.1 Homepage (`ecommerce/web/src/app/page.tsx`, 896 lines, 11 bands)

| # | band | anchor | reference | gap | class |
|---|---|---|---|---|---|
| 1 | hero ground + backdrop | `:260-262` | generalist `:259-260` | **none.** `ground-dark bg-[#1a2942]` + `EcommerceBackdrop`. Only the arbitrary hex moves to a token | mechanical (U4) |
| 2 | status pill | `:266-270` | generalist `:263-268` | **none.** `rounded-full`, `ring-1 ring-white/50`, `backdrop-blur-lg`, `animate-ping` dot pair. Already the generalist shape | done |
| 3 | hero H1 | `:273` | generalist `:270` | `sm:text-5xl lg:text-6xl`, no `text-balance`; generalist is `lg:text-7xl text-balance` | mechanical |
| 4 | hero CTAs | `:280-289` | generalist `:284-303` | primary uses local `btnPrimary` (correct, 4.81 ring proof in `layout-utils.ts:61-75`). Secondary is a **hand-rolled string**, `border-white/50 bg-white/10`; the kit `btnOnDark` is `border-white/40`. **Neither carries `data-cta`.** `btnOnDark` is not exported from this site's `layout-utils.ts` | mechanical (needs U4 export) |
| 5 | trust badges | `:293-299` | generalist `:307` | `rounded-full` dots already present | done |
| 6 | stats strip | `:305-309` | generalist `:317-320` | `<StatsCounter stats={homeStats} />` on `bg-white`, already the generalist band. `tone`/`columns`/`href` props now exist if a figure should link its source | done |
| 7 | intro strip | `:312` | generalist `HomeSections.tsx:158` (`ProblemStatement`) | kit `ProblemStatement` hardcodes Property's landlord copy and takes no copy props (`ProblemStatement.tsx:33-40`) | decline stands |
| 8 | audiences grid | `:339-369` | generalist `WhoWeAreSection` | `CoverageCards` now HAS `href` (`CoverageCards.tsx:31`), so the old decline is stale. These cards carry the route's link floor, and `href` preserves them | mechanical |
| 9 | services grid | `:371-399` | generalist `:346-360` (`ScrollGlowGroup`) | wrapper only, changes no copy. Needs `card-glow`, which this site does not declare | **GATE-free but needs U4 motion decision** |
| 10 | problem table | `:401-482` | none | bespoke comparison table; kit `ComparisonTable` exists, shape unverified against this data | leave, or check |
| 11 | depth guides | `:484-543` | generalist blog band `:409-456` | existing | done |
| 12 | tools band | `:545-602` | generalist `:369-407` (`CalculatorTabs` + `data-cta="home_calculators_all"`) | no `data-cta` on any tool link | mechanical (instrumentation) |
| 13 | difference / reasons | `:604-643` | generalist `WhyChooseUsSection` | already `<NumberedReasons items={specialistSituations} />` at `:640` | done |
| 14 | FAQ | `:645-660` | generalist `:471` (`FaqSection`) | plain `<div>` cards, a third FAQ shape on one site. `FaqSection alwaysRenderAnswers` (landed `FaqSection.tsx:19,35,49`) now keeps answers in the server HTML, which is the only reason the site declined it | **mechanical, see D1** |
| 15 | closing panel | `:663-676` | generalist `:459-466` | already `LeadCTAPanel` + `EcommerceBackdrop`. The panel emits no `data-cta` (kit gap C1) | after C1 |
| 16 | blog band | `:679-700` | generalist `:409-456`, Property `:364-418` | **centred text plus ONE button, no posts listed.** This is diagnosis §c2 verbatim, on a site with 40 links on `/blog` and 15 posts | mechanical |
| all | grey ramp | | | `neutral-*` throughout against kit `slate-*` | mechanical |

### A.2 Services, audience and VAT hubs and details

`/vat` and `/vat/[slug]` have no generalist or Property analogue; they are this
site's own family and the reference is its own `/services/[slug]`.

| surface | generalist / Property | ecommerce | gap | class |
|---|---|---|---|---|
| hub heroes (`/services`, `/for`, `/vat`) | `SlimHero`-shaped band | hand-rolled brand bands | `SlimHero.sectionClassName` (default `"bg-slate-900"`, replaces exactly one class) makes adoption possible without moving the ground. `eyebrow` is still required, so adopting authors a label -> **GATE D3** | GATE |
| breadcrumbs | kit `Breadcrumb` | kit `Breadcrumb` + `crumbOnBrand` wrapper hack, 13 files | `tone="onBrand"` replaces it | mechanical |
| coverage grids | `CoverageCards` | hand-rolled | `href` now exists | mechanical |
| ticks | `DrawnTickList` | none | `.tick-draw` has no rule here; static tick unless the motion sheet lands | after U4 decision |
| process | `ProcessTimeline` | none | site publishes no `{n,title,body}` triples. Grep `src/data` and `src/config` first; decline in writing if absent | GATE (copy) |
| FAQ | `FaqSection` | native `<details>` x5 | see D1 | GATE |
| closing panel | `LeadCTAPanel` | `LeadCTAPanel` on all 6 detail+hub routes | at parity; needs the C1 `data-cta` | after C1 |
| calculators `[slug]` heading | `Calculator headingLevel` | check whether this template jumps h1 to h3 | one-line sweep if so | mechanical |

### A.3 Blog

| surface | generalist | ecommerce | gap | class |
|---|---|---|---|---|
| `/blog` index | `LeadForm` + `LeadCTAPanel` + `blog_index_book` / `blog_index_articles` | neither, and no `data-cta` | panel fed the `niche.config.json` `blog` triple | mechanical |
| `/blog/[category]` x6 | same | neither | same | mechanical |
| post reading aids | `ReadingProgress`, `TableOfContents`, `RelatedArticles` | all three, `:6-8` | none. `ReadingProgress.className` and `TableOfContents.stickyMobile` now exist if the port wrote an override | done |
| post sidebar CTA | `BlogSidebarCta`, emits its own `blog_sidebar_book` / `sidebar` / `form` | **absent** | fed the config triple: `cta_heading` "Need help with your online selling taxes?", `cta_body`, `cta_button` "Get in touch". Nothing authored | mechanical |
| post skip-to-form | `blog_skip_to_form` anchor | absent | label reuses the existing end-of-article form heading | mechanical |
| post mid-scroll | `InlineMiniLeadForm` | `InlineMiniLeadForm`, `:14` | done |
| post end form | `LeadForm` | `LeadForm`, `:13` | done |
| post closing panel | `LeadCTAPanel` | absent | mechanical |
| post FAQ | kit | native `<details>`, `:106`, schema matches | see D1 |
| `ToolIsland` | mounted | absent, no `lib/intent` taxonomy | GATE D5 |

### A.4 Calculators and research

| surface | generalist | ecommerce | gap | class |
|---|---|---|---|---|
| `/calculators` index | `LeadCTAPanel` + `LeadForm` + `calc_index_help` | **zero capture** | owner ruling names this route explicitly | mechanical |
| `/calculators/[slug]` | `LeadCTAPanel` + `FaqSection` | panel + form + native `<details>` | at parity bar D1; add `data-cta` | mechanical |
| `/research` hub | `LeadForm` + `LeadCTAPanel` + per-asset `data-cta` | **zero capture, zero `data-cta`** | owner ruling names research indexes explicitly | mechanical |
| `/research/online-seller-index` | detail pattern | **zero capture** | panel + form | mechanical |
| `/research/online-seller-survival-index` | detail pattern | `LeadForm` only | panel | mechanical |
| `--calc-result-accent` | | not needed: amber clears on slate-900 (owner ruling) | none |

### A.5 Lead-capture inventory, generalist against ecommerce

| surface | generalist `data-cta` | ecommerce | verdict |
|---|---|---|---|
| header desktop primary | `header_nav_primary` | `header_book` (51 routes) | parity |
| header drawer / xl secondary | `header_mobile_primary` / `header_nav_secondary` | **not in the snapshot** despite kit defaults | **INVESTIGATE FIRST** |
| hero primary / secondary | `hero_primary` / `hero_secondary` | none | **MISSING, mechanical** |
| `LeadCTAPanel` breadth | 25 routes | 9 routes | **MISSING on 24 routes** |
| panel's own CTA | panel emits one | kit panel emits **none** | **kit gap C1** |
| `BlogSidebarCta` | `blog_sidebar_book` | absent | **MISSING, mechanical** |
| blog skip-to-form | `blog_skip_to_form` | absent | **MISSING, mechanical** |
| blog index CTAs | 4 ids | absent | **MISSING, mechanical** |
| research CTAs | 12 ids | absent | **MISSING, mechanical** |
| calculator CTAs | `calc_index_help`, `calc_hero_help` | absent | **MISSING, mechanical** |
| inline mini capture | `InlineMiniLeadForm` | same | parity |
| booking flow | `BookingPicker` + `DetailsForm` | same file set | parity |
| `StickyCTA` | homepage | absent | **owner ruled NO** |
| `SpecialistWidget` / `DeepScrollModal` / `ReturningBar` / `NextStepOffer` | present | absent | **owner ruled NO** |
| newsletter `SignupForm` | present | absent | **owner ruled NO** |

**Net:** every missing capture surface is a `LeadCTAPanel` mount on a route
whose siblings already carry one, a `BlogSidebarCta` fed the config triple, or a
`data-cta` attribute on a link that already exists. **None of it authors a
sentence.** Everything interruptive is already ruled out by the owner and is not
in this plan at all.

---

## B. Work packages

**Four builders, strictly disjoint file sets.** U4 lands FIRST, ALONE: U1, U2
and U3 all consume `btnOnDark`, the `Breadcrumb` tone sweep decision and the
ramp mapping, all of which live in files U4 owns. U1, U2, U3 then run
concurrently.

**The grey-ramp conversion (517 `neutral-*` across 32 files) is NOT its own
package.** Each builder converts `neutral-N` -> `slate-N` in the files its own
package owns; U4 sweeps the residue nobody else owns. One-for-one by step, no
token invented, no hex moved.

### File ownership, verified with `ls`

All paths below were listed with
`ls ecommerce/web/src/app/**/page.tsx ecommerce/web/src/components/**/*.tsx` and
exist.

| package | owns |
|---|---|
| **U4** | `src/app/globals.css`, `src/app/layout.tsx`, `src/components/ui/layout-utils.ts`, `src/components/layout/EcommerceBackdrop.tsx`, `src/components/layout/PageShell.tsx`, `src/app/book/page.tsx`, `src/app/complete/page.tsx`, `src/app/thank-you/page.tsx`, `src/app/terms/page.tsx`, `src/app/privacy-policy/page.tsx`, `src/app/cookie-policy/page.tsx`, `src/app/not-found.tsx`, `src/app/error.tsx`, `src/app/embed/[slug]/page.tsx`, `src/components/forms/BookingPicker.tsx`, `src/components/forms/DetailsForm.tsx`, `src/components/forms/LeadForm.tsx`, `src/tests/**`, `web/package.json` |
| **U1** | `src/app/page.tsx` ONLY |
| **U2** | `src/app/services/page.tsx`, `src/app/services/[slug]/page.tsx`, `src/app/for/page.tsx`, `src/app/for/[slug]/page.tsx`, `src/app/vat/page.tsx`, `src/app/vat/[slug]/page.tsx`, `src/app/calculators/page.tsx`, `src/app/calculators/[slug]/page.tsx`, `src/app/research/page.tsx`, `src/app/research/online-seller-index/page.tsx`, `src/app/research/online-seller-survival-index/page.tsx`, `src/app/about/page.tsx`, `src/components/research/*.tsx` |
| **U3** | `src/app/blog/page.tsx`, `src/app/blog/[category]/page.tsx`, `src/app/blog/[category]/[slug]/page.tsx`, `src/components/blog/InlineMiniLeadForm.tsx`, `src/components/calculators/MiniCapture.tsx`, `src/app/contact/page.tsx` |

No file appears twice. `packages/web-shared/**` is owned by NOBODY: it is the
manager carve-out in section C and lands before any builder starts.
`src/app/admin/**` is out of scope for every package (non-public).

---

### U4. Foundations (RUNS FIRST, ALONE)

**Files:** the 19 listed above.

**Reference:** `crypto/web/src/app/globals.css:122-200` (local-keyframe
pattern); `packages/web-shared/design/globals-standard.css:85-295`;
`generalist/web/src/app/globals.css:5` (the import alternative);
`generalist/web/src/components/ui/layout-utils.ts:6-19`;
`contractors-ir35/web/src/app/globals.css` (`569d3304`, same shape).

**Work:**

1. **`layout-utils.ts`: export `btnOnDark`.** The file's own header comment
   (`:14-16`) already says "The kit has a real `btnOnDark` if one is ever
   needed: import it from `packages/web-shared/design/layout-utils`". U1 creates
   the consumer. **Measure it before exporting**: the kit recipes hardcode
   `focus-visible:outline-primary-600`, which on this site IS the primary button
   ground. `btnSecondary` was already wrapped-and-adopted for a written reason
   (`layout-utils.ts:31-38`); apply the identical test to `btnOnDark` and wrap
   it the same way if it embeds the outline. `focusRing` and `btnPrimary` stay
   local, reason already written at `:41-58`.

2. **The motion-sheet decision, and it must be MEASURED not assumed.** The site
   declines `globals-standard.css` at `globals.css:206-214` on the crypto
   reason. Re-read today, that file declares **no colour of its own**: its only
   Property values are CSS fallbacks inside `rgb(var(--brand-glow, 16 185 129) /
   ...)`, four tokens documented as the sibling override surface, which is why
   generalist imports it and is not emerald. **But this site's decline also
   cites the collapsed draw states**, and that half is still live. So:
   - Option A (preferred if it measures clean): import
     `globals-standard.css`, declare the four glow channels in amber in `:root`
     (`--brand-glow`, `--brand-glow-deep`, `--brand-glow-edge`,
     `--brand-glow-faint`, all from steps already in the `@theme` block; **no new
     colour and the brand amber `#c9861b` is not changed**), and prove it with
     `grep -c "16 185 129"` in the built CSS == 0.
   - Option B: declare `eyebrow-rule` / `tick-draw` / `card-glow` locally
     alongside the existing `num-glow`, the crypto route.
   - Option C: **do nothing.** This is a live option and it may be the right
     one. The only consumers the sheet would buy are `DrawnTickList` (not
     adopted anywhere in this plan) and `ScrollGlowGroup` (one homepage
     wrapper). The `Eyebrow` rule is cosmetic and the site already passes row 5
     at 7/0. Decide from the measurement; if you pick C, write down what you
     gave up.
   Whichever is chosen, `tw-animate-css` and `@radix-ui/react-accordion` become
   new dependencies only under A or under D1; run
   `python scripts/check_dependency_closure.py` if either lands.

3. **`[data-draw="off"]` release.** `globals.css:407-416` collapses
   `.story-numeral-rule` to `scaleX(0)` with no visible release. Load the page
   with JS disabled and read what a no-JS visitor sees. If the rule is
   permanently invisible, gate the block behind `@media (scripting: enabled)`
   as `crypto/web/src/app/globals.css:148` does. If the numeral is legible and
   only its rule is missing, that is acceptable and must be written down with
   the measurement rather than "fixed" blind.

4. **`Breadcrumb tone` sweep is NOT U4's.** It touches 13 files owned by U2. U4
   **decides and documents the mapping only** (`crumbOnBrand` -> `tone="onBrand"`,
   with the one-line proof that the tone table reproduces the legacy string,
   `Breadcrumb.tsx:43,74,90`), and U2 executes it. Recorded here so the
   reviewer knows where to look.

5. **Homepage arbitrary hexes are U1's**, not U4's (`bg-[#1a2942]`,
   `bg-[#fafaf9]`). U4 declares or confirms the tokens they should resolve to
   in `globals.css` and hands U1 the names.

6. **`SlimHero` backdrop slot** on the five call sites U4 owns
   (`book:49`, `complete:133`, `thank-you:107,131,157`): pass
   `backdrop={<EcommerceBackdrop ... />}` and, if the ground needs to stop being
   `bg-slate-900`, `sectionClassName`. The copy on `SlimHero` is FIXED light, so
   any ground passed must carry white at 4.5:1; measure it.

7. **`neutral-*` -> `slate-*`** in the 19 files U4 owns.

8. **Extend `src/tests/focus-ring.test.ts`** with an assertion that `btnOnDark`
   routes through this module, matching the existing `walks=1
   guards-the-guard=1` shape.

**Acceptance tests:**
- `grep -c 'btnOnDark' ecommerce/web/src/components/ui/layout-utils.ts` >= 1.
- `npx tsc --noEmit` clean.
- `npm test` green, denominator re-derived and reported.
- `grep -rho "\bneutral-[0-9]\{2,3\}"` over U4's 19 files == 0.
- If option A: `grep -c "16 185 129"` in the built CSS == 0, and each of
  `eyebrow-rule|tick-draw|card-glow|num-glow` resolves in the built CSS.
- `grep -rnoE '<(div|section|aside|li|figure)[^>]*data-cta='` still returns
  nothing (R5 B2 guard).
- `--radius: 0.75rem` still present and unchanged (R5 B1 is already solved
  here; a builder "fixing" it is the regression to watch for).

**OFF LIMITS:** every file owned by U1, U2, U3. `packages/**` (manager
carve-out). `Property/**`, `generalist/**` and every other site (trap 12).
The brand amber `#c9861b` and every designer-set colour. The `--focus-ring` /
`.ground-dark` mechanism and the impossibility proof above it. `leadConsentText`.

---

### U1. Homepage

**File:** `ecommerce/web/src/app/page.tsx` ONLY.

**Reference:** `generalist/web/src/app/page.tsx:236-474` band by band as mapped
in A.1; `hospitality/web/src/app/page.tsx` at `577e22e2` (`:29-33` for the kit
import set of the most recent accepted homepage);
`Property/web/src/app/page.tsx:364-418` (blog band listing real posts).

**Work, in the A.1 numbering. Bands 1, 2, 5, 6, 13 are already correct and are
NOT touched.**

| band | action | copy fed |
|---|---|---|
| 3 | `lg:text-6xl` -> `lg:text-7xl`, add `text-balance` | H1 string unchanged |
| 4 | replace the hand-rolled secondary string at `:283-287` with `btnOnDark` from `@/components/ui/layout-utils`; add `data-cta="hero_primary"` + `data-cta-placement="hero"` + `data-cta-goal="form"` to the primary and `data-cta="hero_secondary"` + `data-cta-placement="hero"` to the secondary | labels "Speak to a seller tax specialist" / "Our services" unchanged |
| 8 | `<CoverageCards items={...} />` with `href` per card, using `sellerHubs` from `@/data/for` | existing `hub.title` / body / `href` |
| 9 | wrap the services grid at `:371-399` in `<ScrollGlowGroup>` **only if U4 landed motion option A or B**; otherwise decline in writing naming the missing `.card-glow` rule | children only |
| 12 | `data-cta` on the tools-band links: `home_calculators_all` and per-tool ids matching generalist's naming | attributes only |
| 14 | `<FaqSection eyebrow="Questions" title="Common questions from online sellers." faqs={faqs} alwaysRenderAnswers />` **subject to owner gate D1** | `faqs`, the same binding `buildFaqJsonLd` reads |
| 16 | render the three most recent posts as a real list, mirroring `Property:364-418`; keep the existing standfirst and the existing "Browse all guides" button | `getAllPosts()` from `@/lib/blog` |
| all | the 8 arbitrary hexes -> the tokens U4 names; `neutral-*` -> `slate-*` | |

**Declines to WRITE at the call site, each naming the kit file path:**
`ProblemStatement` (`packages/web-shared/design/marketing/ProblemStatement.tsx:33-40`,
hardcoded Property landlord copy, no copy props).
`TestimonialsSection` (`.../TestimonialsSection.tsx`: the `items` prop now
exists, so the OLD reason is stale, but **this site publishes no authored social
proof at all** — `grep -rn 'testimonial' ecommerce/web/src` returns only the
decline at `about/page.tsx:68-69`. Adopting it would mean inventing quotes.
Rewrite the decline to the new, correct reason).
`ProcessTimeline` (no `{n,title,body}` published; grep `src/data` first).
`StickyCTA` (owner ruled NO).
The existing decline comment block on this page must be **rewritten, not
deleted**: several entries change state this wave.

**Link floor:** `/` = **28** (`sweep_final.json`). Band 16 adds 3 post links and
band 8 adds `href` to cards that already linked, so assert `>= 28` and report
the new number.

**Acceptance tests:** four-marker row still `1/2/3/4` or better; `data-cta` count
on `/` rises from 1 to at least 4 and **every one sits on an `<a>` or `<button>`,
never a wrapper** (R5 B2); homepage `<div>` FAQ gone only if D1 says yes, and if
so, `curl` the route with JS off and assert every answer string is in the server
HTML and the `FAQPage` JSON-LD count matches (R5 B3/B4); prose multiset
unchanged; `grep -coE '#[0-9a-fA-F]{6}'` comment-stripped on this file == 0.

**OFF LIMITS:** `globals.css`, `layout-utils.ts`, `EcommerceBackdrop.tsx`,
`PageShell.tsx`, every U2/U3/U4 file, `packages/**`. No sentence, figure, FAQ
question or FAQ answer changes. `homeStats` values and labels are frozen. The
brand amber is frozen.

---

### U2. Hubs, details, research, about

**Files:** the 13 listed above.

**Reference:** `generalist/web/src/app/services/page.tsx:175-290`;
`generalist/web/src/app/calculators/[slug]/page.tsx:72-159`;
`Property/web/src/app/for/[slug]/page.tsx:79-110`.

**Work:**
1. **`Breadcrumb tone="onBrand"` on all 13 `crumbOnBrand` sites**, deleting the
   wrapper hack and its now-false comment. This is the largest single mechanical
   win in the package. Proof that nothing moves: `Breadcrumb.tsx:90` picks the
   same recipe the legacy boolean did, and `:121-123` documents that the string
   is byte-identical.
2. **`LeadCTAPanel` + `LeadForm` on `/calculators`, `/research`,
   `/research/online-seller-index`**, and `LeadCTAPanel` on
   `/research/online-seller-survival-index` (which already has a form). Fed the
   same copy those routes already publish above their existing forms, or the
   `niche.config.json` `cta` triple. The owner ruling names calculators and
   research indexes explicitly.
3. **`data-cta` tuples on existing links**, matching generalist's naming so
   `vw_cta_performance` reads across sites: `calc_index_help`, `calc_hero_help`,
   `research_<asset>_hero_book`, `research_<asset>_hero_data`,
   `research_<asset>_csv`, `services_hero_book`, `for_hero_book`,
   `vat_hero_book`. **Attributes only, no new links, and never on a wrapper.**
4. **`CoverageCards`** on `/services`, `/for`, `/vat` hub grids now that `href`
   exists (`CoverageCards.tsx:31`), preserving every link the floors count.
5. **`Calculator headingLevel={2}`** on `/calculators/[slug]` if that template
   jumps h1 to h3; check the rendered heading order first.
6. **`ProcessTimeline`** only where a `{n,title,body}` triple already exists in
   `src/data` or `src/config`. Grep first; decline in writing if it does not.
7. `neutral-*` -> `slate-*` in these 13 files. Re-measure any ring whose ground
   changes step.
8. Research-page hexes: the 37 + 6 + 4 chart/table hexes stay. Write one line
   saying why (SVG series colour is data encoding, not a token) so the reviewer
   does not re-raise it.

**Declines:** `SlimHero` on the hand-rolled hub heroes stays declined pending
gate D3 (its `eyebrow` is required, `SlimHero.tsx:29`, so adopting authors a
label). Record it at each call site with that line number and with the note that
`sectionClassName` (`:27,47`) has removed the ground half of the old objection.
`FaqSection` on the four `<details>` templates: hold for D1.

**Link floors** (`sweep_final.json`, assert `>=`): `/services` 20, `/for` 24,
`/vat` 20, `/calculators` 24, `/research` 22, `/research/online-seller-index` 30,
`/research/online-seller-survival-index` 23, `/about` 20, the four
`/services/*` 20, the four `/for/*` 25-28, the five `/vat/*` 20-23, the four
`/calculators/*` 20-23.

**OFF LIMITS:** `globals.css`, `layout-utils.ts`, `EcommerceBackdrop.tsx`,
`PageShell.tsx`, `page.tsx`, every U1/U3/U4 file, `packages/**`. No prose
changes. The research figures, their sources and the "Cite as" apparatus are
frozen. The disclosed 50,699 discrepancy on `/research/online-seller-index` is
an open owner item, not a defect to fix here.

---

### U3. Blog and the lead kit

**Files:** the 6 listed above.

**Reference:** `generalist/web/src/components/blog/BlogPostRenderer.tsx:20,111,193,277,308`;
`packages/web-shared/design/blog/BlogSidebarCta.tsx:19-58`;
`charities/web/src/app/blog/[category]/[slug]/page.tsx:22,308` (the nearest
single-file precedent; generalist routes through a renderer this site does not
have).

**Work:**
1. **`<BlogSidebarCta copy={...} />`** in the existing desktop `<aside>` on the
   post template, under the `TableOfContents`. `copy` is the triple already in
   `ecommerce/niche.config.json` under `blog`: `cta_heading` "Need help with
   your online selling taxes?", `cta_body` "Tell us about your store or
   marketplace accounts and we will come back within 24 hours.", `cta_button`
   "Get in touch". **Nothing is authored.** The component emits its own
   `data-cta="blog_sidebar_book"` / `sidebar` / `form`.
   Note for the owner bundle: the `cta_body` repeats the "within 24 hours"
   promise that STATE.md already carries as an open estate-wide item. It is not
   new copy; flag it, do not change it.
2. **Skip-to-form anchor** in the article header, `data-cta="blog_skip_to_form"`
   / `article_header` / `form`, label reusing the existing end-of-article form
   heading.
3. **`LeadCTAPanel` on `/blog`, `/blog/[category]` (6 routes) and the post
   template**, fed the same config triple, with
   `data-cta="blog_index_book"` / `"blog_index_articles"` **on the controls, not
   on a wrapping `<div>`** (R5 blocker B2 verbatim: the autoCapture resolves
   every click through `closest("[data-cta]")`, so a wrapper around a form
   attributes every click inside it).
4. `data-cta` on the existing `/contact` links where one points at pricing or
   services; grep first, decline in writing if none exists.
5. `neutral-*` -> `slate-*` in these 6 files.

**Declines to write:** `FaqSection` on the post template stays native
`<details>` pending D1, and the existing decline comment at
`blog/[category]/[slug]/page.tsx:93-99` must be **updated**, because its stated
reason ("answers absent from the server HTML") has been solved by
`alwaysRenderAnswers` (`FaqSection.tsx:19,35,49`). Say that, then say which way
D1 went. `ToolIsland` needs an intent taxonomy
(`generalist/web/src/lib/intent/taxonomy.ts`) this site does not have: gate D5.
`StickyCTA`, `SpecialistWidget`, `DeepScrollModal`, `ReturningBar`,
`NextStepOffer`, newsletter: **owner ruled NO**, record as rulings, not declines.

**Link floors:** `/blog` 40, the six `/blog/<category>` 27-28, the fifteen posts
24-30, all from `sweep_final.json`. Assert `>=` on every one.

**OFF LIMITS:** `globals.css`, `layout-utils.ts`, `page.tsx`, every U1/U2/U4
file, `packages/**`. No article body is edited. `leadConsentText` inside
`LeadForm`/`MiniCapture` is frozen estate-wide (memory `leads_250_programme`).

---

## C. Manager carve-outs: kit edits needed

`packages/web-shared/**` is a manager-direct carve-out. **Almost everything this
plan needs already landed on 2026-09-29.** Verified present today:
`Breadcrumb.tone` (`:36,83,90`), `SlimHero.sectionClassName` (`:27,47`),
`CoverageItem.href` (`:31`), `StatsCounter.tone/columns/href` (`:25,91-92,106-110`),
`Calculator.headingLevel` (`:43,82,115`), `FaqSection.alwaysRenderAnswers`
(`:19,35,49`) with `accordion` `forceMount` + `data-[state=closed]:hidden`
(`accordion.tsx:57,60,65,68`), `TestimonialsSection.items/showRating/footnote/headingId`
(`:53-56,68-80`), `ReadingProgress.className`, `TableOfContents.stickyMobile`,
`PageShell.bypassWhen`, the accordion focus ring.

**One kit gap remains.**

### C1. `LeadCTAPanel` emits no `data-cta` (REQUIRED)

```
grep -n 'data-cta' packages/web-shared/design/marketing/LeadCTAPanel.tsx
  -> (nothing)
```

The panel is the estate's main closing capture surface and it is analytically
invisible. ecommerce mounts it 9 times today and this plan takes it to 24+. On
generalist the equivalent ids exist because generalist's own page code adds
them around the panel, which is precisely the wrapper pattern R5 blocked as B2.

**The edit:** add an optional `ctaId?: string` (and `ctaPlacement?`,
`ctaGoal?`) to `LeadCTAPanel`, applied to the panel's own submit control, unset
by default so every existing consumer renders byte-identically.

```
grep -rln "design/marketing/LeadCTAPanel" --include=*.tsx . | grep -v node_modules   # consumer set
grep -rn "ctaId" packages/web-shared/design/marketing/LeadCTAPanel.tsx               # 0 today
```

If the panel's submit lives inside the caller-supplied `form` slot rather than
in the panel itself, the correct fix is on `LeadForm` per site instead, and the
carve-out becomes unnecessary. **Check which before editing anything in
`packages/**`.**

### C2. Nothing else.

No motion kit edit is needed: `globals-standard.css` carries `eyebrow-rule`,
`tick-draw`, `card-glow`, `num-glow` and `marquee-y` with Property's colours
only as overridable `rgb(var(--token, ...))` fallbacks (`:27-34`). U4 either
imports it and declares the amber channels, or declares locally. No file in
`packages/**` changes for it.

---

## D. Owner gates, in plain English

Bundle all four into one ask. Nothing below is built until he answers.

**D1. The FAQ boxes.** Right now the site shows its frequently-asked questions
in three different ways: flat boxes on the home page, and click-to-open panels
on the guides, calculators, service pages, seller pages and VAT pages. The
shared house component is a click-to-open panel, and the reason we did not use
it before was that a closed answer vanished from the page's code, which broke
what we tell Google. That has now been fixed in the shared component. We can
either switch everything to the house panel, or keep what is there and only
make the home page match the other pages. **Recommendation: keep the current
click-to-open panels** (they already work without JavaScript, which the house
one needs a setting for) **and make the home page use the same panels as
everything else**, so the site shows one FAQ style instead of three. Blast
radius: 21 pages either way. Revert: one component swap.

**D2. Buttons that we can actually measure.** Today, every page on the site
reports exactly one clickable thing back to us: the button in the top bar. Every
other button, form and link on 51 pages is invisible in the numbers, so we
cannot tell you which page or which button brings in an enquiry. Fixing it adds
no new buttons and changes no words: it tags the ones already there.
**Recommendation: yes.** No visible change at all.

**D3. Enquiry forms on the pages that have none.** The blog index, the six blog
category pages, the calculators index and both research studies currently have
no way to get in touch beyond the top bar. Adding the same enquiry panel those
other pages already carry means the form appears on those pages too. It uses
words already written in the site's settings file. The one thing to note is that
those words include "we will come back within 24 hours", which is the same
promise already on 28 other pages and already on your open list.
**Recommendation: yes.** This is what "enquiry form on every money page" means
in practice.

**D4. Section labels on the four hub pages.** The services, seller-type, VAT and
research hub pages have a coloured band at the top with a heading. The house
version of that band also carries a small label above the heading (the way
"Audiences" and "The work" appear on the home page). Using the house band means
writing four short labels that do not exist today. **Recommendation: yes if you
want the hubs to match the home page**, and tell us the four words, or say no
and we keep the current bands.

**Not asked, because you already ruled on them:** no sticky bottom bar, no
deep-scroll panel, no returning-visitor bar, no next-step offer, no newsletter.
None appears anywhere in this plan.

**Not a gate, for information:** in-article calculator panels (the thing
Holloway Davies does where a relevant calculator drops into the middle of an
article) would need a map of which article gets which tool. That is a content
job for a later wave.

---

## E. False premises found, numbered

1. **The brief's premise that ecommerce needs the same uplift shape as
   startups-tech.** It does not. startups-tech went into its uplift at four-marker
   `0/0/0/0`, kit `5/40`, no backdrop mounted outside the footer, no `--radius`,
   no webfont-equivalent gaps, two grey ramps and a wrapper `data-cta` defect.
   ecommerce is at **`1/2/3/4`** (the Property and generalist row), kit **7/45**,
   backdrop mounted twice on the homepage, `--radius` declared, `Eyebrow` 7/0,
   ring row empty, zero wrapper `data-cta`. Three of the four R5/R6 blockers
   (`--radius` undeclared, wrapper `data-cta`, no-JS FAQ hide) **do not exist on
   this site**. The real gaps are the lead kit and the instrumentation.

2. **"the four-marker row... ecommerce needs to reach it."** It is already there,
   today, on real code and not comments. It is also a thermometer and not a
   blocker: `DESIGN_PORT_PLAYBOOK.md:868-873` says "Report it; do not chase it",
   and records the owner passing crypto at `0/0/3/1`.

3. **`docs/startups-tech/_port/UPLIFT_PACKAGES.md` section C1 and E2 claim
   "ecommerce imports `FaqSection` 11 times" and is therefore "live with the
   exact JSON-LD mismatch".** False on both halves. ecommerce imports
   `FaqSection` **zero** times; the 11 hits are all DECLINE comments naming the
   kit path. `grep -rhoE 'from "[^"]*FaqSection"' ecommerce/web/src` returns
   nothing. ecommerce's five FAQ templates use native `<details>`, which keeps
   every answer in the server HTML, so its `FAQPage` JSON-LD matches what it
   renders. The site was never exposed to that defect. Whether generalist and
   Medical are is a separate question and this correction does not clear them.

4. **"`--calc-result-accent` not needed (amber clears on slate-900)."** Correct
   and now doubly so: the token has no consumer on this site to need it.
   Recorded so a builder does not add it speculatively.

5. **"the 13 `crumbOnBrand` wrapper hacks."** There are 13 FILES and **26 grep
   hits**, because each site carries the class string plus its explanatory
   comment. The sweep is 13 call sites; the reviewer's grep will read 26 and
   must not be surprised.

6. **"`data-cta` on wrappers" as a thing to check for and fix.** There are none
   on this site. The check is a REGRESSION guard for the new work, not a repair.

7. **"no hex outside `globals.css`" as a clean rule.** The site has ~120 live
   hex values outside it, comment-stripped. Most are legitimate and out of scope:
   transactional email HTML (no cascade), SVG chart series colours (data
   encoding). The eight that are genuinely in scope are the homepage's
   `bg-[#1a2942]` and `bg-[#fafaf9]` arbitrary Tailwind values. Stating the rule
   without that carve-out would send a builder to rewrite two research pages and
   four email templates.

8. **"`TestimonialsSection` is now adoptable because `items` landed."** The prop
   landed, but this site publishes **no authored social proof of any kind**. The
   decline stands on a NEW reason and the old comment at `about/page.tsx:68-69`
   (which blames the hardcoded Property quotes) is now stale and must be
   rewritten, not deleted.

9. **"header CTA parity."** `PageShell.tsx:83-85` leaves `ctaIds` at kit
   defaults, so `header_book_mobile` and `header_contact` should render
   (`SiteHeader.tsx:43-45`), but `cta_final.json` scanned 51 routes and found
   only `header_book`. Either the drawer was not scanned or the secondary is not
   configured. **Resolve before any CTA work**; a wave that adds ids on top of an
   unexplained gap cannot tell a new id from a recovered one (trap 22).

10. **"the baseline must be captured by U4's verifier if absent."** It is not
    absent. `docs/ecommerce/_port/sweep_final.json` (51 routes, 2026-09-26) and
    `cta_final.json` are the baselines, and `sweep_final.json` also carries
    `dashes` and `deadLinks` for the same diff.

11. **"start `npx next start -p 3203` if the build is fresh."** It is not.
    `BUILD_ID` is `2026-09-28 23:05`; the last commit touching
    `ecommerce/web/src` is `2026-09-28 23:08:12`. Three minutes stale, but stale.
    Nothing was started and port 3203 was never bound.

---

## F. Wave-close verification list

One build, one server, every row run before any tag. Preflight first
(`netstat -ano | grep ":32"`, kill orphans, `git tag -l 'port-ecommerce-*'`).
**Port 3202 belongs to another site under review: never bind it.**

| # | check | expected |
|---|---|---|
| F1 | four-marker row, comment-stripped | `>= 1/2/3/4`, i.e. no regression |
| F2 | §9.1 gate, all 8 rows | all pass; row 2 up from 7 distinct / 45; row 2a **down** from 159 and every survivor measured |
| F3 | kit adoption delta | `>= 10` distinct, `>= 80` call sites |
| F4 | CTA triples, RENDERED | diff the full set against `cta_final.json`. Expect `header_book` unchanged on 51 routes, the `header_book_mobile` / `header_contact` question from E9 resolved and stated, and 30+ new ids. **`non_interactive_ctas` must stay `[]`** (R5 B2) |
| F5 | link floors | every route `>=` its `sweep_final.json` count; `deadLinks` empty |
| F6 | FAQ answers in server HTML | for every FAQ page, the count of answer strings present == the count its `FAQPage` JSON-LD asserts. Run on `/`, one `/services/*`, one `/for/*`, one `/vat/*`, one `/calculators/*`, one post |
| F7 | no-JS check | JS disabled: every FAQ answer reachable, every `.story-numeral` legible, no invisible marks (R5 B3, and the `[data-draw="off"]` question from U4 item 3) |
| F8 | JSON-LD parses | every `application/ld+json` block on all 51 routes `JSON.parse`s; block count `>=` pre-wave |
| F9 | prose multiset unchanged | sorted sentence multiset over all 51 routes, before against after: **empty diff**. Any non-empty diff is a stop |
| F10 | tsc | `cd ecommerce/web && npx tsc --noEmit` clean |
| F11 | tests | `npm test` green; denominator re-derived and reported |
| F12 | dependency closure | `python scripts/check_dependency_closure.py` OK, mandatory if U4 option A or D1-yes adds packages |
| F13 | em-dashes | comment-stripped: only `api/leads/events/route.ts` (1) and `lib/calculators/tools/side-hustle-tax-checker.test.ts` (1), both non-public, both pre-existing |
| F14 | raw hex | comment-stripped `page.tsx` == 0; research/chart/email files unchanged; `globals.css` unchanged in count unless U4 declared glow channels |
| F15 | grey ramp | `grep -rho "\bneutral-[0-9]\{2,3\}"` over `ecommerce/web/src` == **0** (from 517) |
| F16 | `--radius` intact | `--radius: 0.75rem` still in `globals.css` and no `--radius-*` siblings added (R5 B1 is pre-solved; guard against a helpful "fix") |
| F17 | ring guard | `npm test -- focus-ring`: walks the whole `src` tree, guards-the-guard present, 0 bypasses, `btnOnDark` asserted |
| F18 | contrast + overflow | the estate instrument at 390/768/1024/1440 over the changed routes: 0 contrast findings, 0 overflow, 0 anchor gaps. Every new ground measured stop by stop (gate row 7) |
| F19 | **owner side-by-side** | ecommerce on 3203 and generalist on its own port, headless Chrome, `/` at 1280x900 and 390x844, four full-page PNGs to the session scratchpad, delivered as two pairs. This is the only check that answers the question the owner actually asks |
| F20 | noise owned | count any failed CI run or failed deploy this wave caused and report it before he finds it |

**Deploy is NOT on this list.** Build local-first; production needs his explicit
go in that turn.

### Review briefs

**R1 (adversarial review, Opus).** Read the rendered DOM, not the source, for
every claim. Specifically: does every new `data-cta` sit on an `<a>` or
`<button>`; does the FAQ decision (D1) leave every answer in the server HTML on
every one of 21 pages; did the ramp sweep leave a kit slate card inside a
neutral section anywhere; did anyone "fix" `--radius`; is the brand amber
untouched; did any decline comment survive whose stated reason is now false
(there are at least three known: the `FaqSection` server-HTML reason, the
`TestimonialsSection` hardcoded-quotes reason, the `CoverageCards` no-`href`
reason). Check the prose multiset diff yourself rather than trusting F9's report.

**R2 (re-review, Sonnet).** Only the gap-fix diff plus a re-run of F1-F6 and
F15-F17. Do not re-open anything R1 passed.

---

## G. Agent budget

| role | count | model |
|---|---|---|
| planner (this pass) | 1 | done |
| U4 foundations, first and alone | 1 | Sonnet |
| U1 homepage / U2 hubs / U3 blog, concurrent | 3 | Opus for U1, Sonnet for U2 and U3 |
| adversarial review | 1 | Opus |
| gap-fix | 1 | Sonnet |
| re-review | 1 | Sonnet |
| **total** | **8** | worst case 10 with a mop-up pair |

The manager keeps: the C1 kit carve-out (if it survives the check in C1), all
git operations, the single build, the four screenshots, the owner readout.

If the owner says no to every gate in section D, the count is unchanged: the
gates remove work from U1, U2 and U3 rather than adding agents.

---

## H. GAP-FIX RECEIPT (R5 gap-fix agent, 2026-09-29)

Fixes only what `R5_UPLIFT_REVIEW.md` lists. No build, no server start or stop,
no git write, no `packages/web-shared` edit, no other site, no subagent.
`npx tsc --noEmit` clean; `npm test` 57/57 (was 50/50, +7 from the new
`src/tests/cta-instrumentation.test.ts`).

### Blockers

- **B1** `.related-card` and `.related-card:hover, :focus-within` moved OUT of
  `@layer components` in `globals.css`, the startups-tech `266be560` fix. Both
  halves were inert, not just the focus half: the kit puts `border-slate-200` on
  the same div, so the hover border never moved either. The "the `:focus-within`
  half is the load-bearing one" comment is corrected: the kit's stretched link
  now carries the kit `focusRing` itself (`RelatedArticles.tsx:2,111`, kit
  `f17702ff`), so the ring is the indicator and this glow is its card-level half
  plus the whole hover affordance. The two "this file has zero unlayered rules"
  comments are corrected as well. Rendered check waits on the manager's rebuild;
  the :3203 build predates both changes.
- **B2 PRE-EXISTING, NOT FIXED, BY RULING.** The -1 unique internal href per
  route is `09acd2af` (09-28 recheck) pointing the footer's "Book a
  consultation" at `/contact#form`, which collapses into `/contact`, already
  linked from the header. A deliberate change before this wave. No link was
  restored to make a number go up and the footer was not touched.
  **Re-reviewer: compare against the post-`09acd2af` count, not
  `sweep_final.json`.** Open owner question 4 in the review stands.
- **B3 FIXED, and by a different route than the review proposed.** There is no
  link control to tag on those fifteen routes; the only control is the enquiry
  panel's own button. `LeadForm` grew `ctaId` and `ctaPlacement` props, goal
  always `form`, defaulting off `FORM_ID` so an untouched mount still reports,
  and an explicit id is now passed at all 19 mounts (the new test fails if one
  is missed or two collide). The step-1 "Continue" button is tagged
  `<ctaId>_start` as well as the step-2 submit, and that is the half that makes
  this measurable: step 2 is client-only state, so the submit is NOT in the
  server HTML and a static `cta_snapshot` would still have found nothing.
  E9 recorded, nothing changed in the header: `header_contact` never renders
  because this site passes no `ctaSecondary`, and `header_book_mobile` renders
  only inside the open drawer, which no static scan can see.
- **B4 FIXED.** `ctaId` per record in `calculatorLinks`
  (`home_calculator_seller_take_home`, `_vat_threshold_tracker`,
  `_sole_trader_vs_ltd`), literal so a grep of `page.tsx` is the census, plus
  `data-cta-goal="tool"`. Placement unchanged.

### Gaps and nits

- **G1 REJECTED as written, owner decision.** The "minimal fix the accepted
  sites use" does not exist: `grep -rn contained` over `startups-tech/web/src`
  and `hospitality/web/src` returns nothing, and both ship the same kit
  `slate-900` footer under 20 and 15 non-contained navy panels. The seam is the
  family look, not this wave's defect, and the only call-site lever is
  `contained`, a visual change on 32 routes that is open owner question 1. Left
  for that answer; it is a one-word switch per call site when it comes.
- **G2 FIXED.** `LeadForm.tsx` swept to slate at the same step (`grep -c
  "neutral-" == 0`). Hue change, not contrast: on white, slate then the warm step
  it replaced, 900 17.83/17.93, 600 7.58/7.81, 500 4.76/4.74, 400 2.63/2.58, 300
  border 1.49/1.48. The `[.ground-dark_&]` variants are KEPT as a ground guard
  and stated as currently unreachable: every one of the 19 mounts now sits on a
  white card (the kit panel's `PanelBody` form card is `bg-white` in both
  variants; `/contact` and the blog end-of-article box are white too).
- **G3 FIXED for `/services`, `/for` and the homepage; REJECTED for `/vat`.**
  `columns={4}` where the set is four. `/vat` has FIVE items (`data/vat.ts`,
  five slugs, which is also why `vat_hero_book` mounted 5 times), so
  `columns={3}` renders 3+2 and orphans nothing; `columns={4}` there would
  create the orphan the review is objecting to.
- **G4 no change, owner call** (motion option C). Open owner question 3.
- **G5 FIXED, all six.** `about/page.tsx` (LeadCTAPanel listed as declined while
  mounted), `layout-utils.ts:99,129` (`bg-neutral-900` / "neutral-800 stats
  band" to the three real `bg-slate-800` citation bands),
  `EcommerceBackdrop.tsx` (the two dead grounds replaced with the ones it is
  actually mounted on, each recomputed: --ink-navy #1a2942 to #2c323e, white
  12.86; slate-900 #0f172b to #222229, white 15.80, slate-300 10.63),
  `LeadForm.tsx:17-21`, the BreadcrumbList "ONLY" claim on all three slug
  templates, and the `TestimonialsSection` decline on `/about` and
  `calculators/[slug]` REWRITTEN rather than appended to (E8), keeping only the
  live half.
- **G6 PRE-EXISTING, comments fixed, node left alone.** De-duping means deciding
  which of `buildSegmentPageSchema` and the kit `Breadcrumb` owns the node across
  three templates and a shared helper: a schema change, not a design one.
- **G7 FIXED.** The `lg:max-h-[calc(...)] lg:overflow-y-auto` pair moved off the
  `<aside>` onto a wrapper around `TableOfContents` only, so `BlogSidebarCta` is
  no longer inside a nested scroll box. `lg:sticky lg:top-24` unchanged.
- **G8 FIXED.** `/contact` is the thirteenth file: `tone="onBrand"`, the
  `crumbOnBrand` const and the legacy `onDark` boolean both gone.
- **G9 FIXED.** Goals added: `hero_secondary` services, `home_calculator_*`
  tool, `home_research` research, the two `research_hub_*` research, the two
  `*_csv` data, `research_seller_index_tool` tool. Four values are new to this
  site's vocabulary (`tool`, `research`, `data`, `services`) alongside the
  estate's `form`, `contact` and `pricing`; `data-cta-goal` is a free string that
  `autoCapture.ts:102` reads verbatim, so nothing had to change to accept them.
  `research_survival_index_book` now exists as the survival index panel's
  `ctaId`, so that study has the same id count as the seller index.
- **G10 FIXED.** `--ink-navy-via` and `--ink-navy-deep` declared in
  `globals.css`; `page.tsx` is at zero hexes comment-stripped. NO PAINTED COLOUR
  MOVED: `via-[#243550]/80` over this section's own `bg-[var(--ink-navy)]`
  composites to #22334d exactly per channel (36 to 34, 53 to 51, 80 to 77),
  which is what the token carries, so the stop is opaque and no alpha modifier on
  an arbitrary `var()` has to be trusted without a build. The review's own
  measurement agrees on #22334d, so every composited reading in that block still
  holds.
- **G11 FIXED.** The four `bg-[#fafaf7]` slug templates read
  `bg-[var(--ground-subtle)]`. One off-white on the site; `grep -rn fafaf7
  src/app src/components` is empty except the corrected notes.
- **G12 NOT DONE, out of this agent's lease.** F1-F18 artefacts need a rebuild
  and a served crawl; this pass may not build or start a server, and :3203 serves
  the pre-fix build. Manager/re-reviewer to capture `sweep_gapfix2` /
  `cta_gapfix2` / `browser_gapfix2` after the rebuild.
- **N1, N2, N4 recorded, no change.** N1 and N2 are kit `SiteFooter` facts,
  estate-wide and pre-existing; N4 is an instrument timeout, not a site defect.
- **N3 recorded, no change.** The 12 default-outline stops on `/` are the kit's
  own controls, whose ring is `--kit-focus-ring` and not reachable from a call
  site. The gate row 6 claim is over-stated, which is a claim to correct, not a
  contrast defect (18.2 on #fafaf9).

### data-cta census after

19 `LeadForm` mounts, each with its own id, each emitting `<id>_start` in the
server HTML and `<id>` on submit: `home_panel_book`, `about_panel_book`,
`contact_form_book` (placement `body`), `services_hub_book`,
`services_detail_book`, `for_hub_book`, `for_detail_book`, `vat_hub_book`,
`vat_detail_book`, `calc_index_help`, `calc_detail_help`, `blog_index_book`,
`blog_category_book`, `blog_post_end_book` (placement `body`),
`blog_post_closing_book`, `research_hub_book`, `research_seller_index_form`,
`research_survival_index_book`.

Routes and ids with NO control, recorded rather than faked: `calc_hero_help` (the
`/calculators` hero is breadcrumb, h1 and a standfirst, no CTA),
`home_calculators_all` (no "browse all calculators" link in the tools band),
`blog_index_articles` (only the category chips and the 40 post links, and one
shared id across 40 destinations is the defect B4 raised).
