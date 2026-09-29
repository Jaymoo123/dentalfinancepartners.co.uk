# startups-tech DESIGN UPLIFT: package plan

Read-only planning pass, 2026-09-29. No source edited, no build run, no server
started, no git write, no subagent launched. Every number below carries the
command that produced it and was run from the monorepo root on the working tree
at `a77e49e1` + the uncommitted port working set listed in `git status`.

Trigger: the owner walked the finished port on 2026-09-29 and said, verbatim,
"okay it's good, but again, plain jane - same thing as other sites make sure the
advanced designer kit is ported as well as the lead stuff". That is the crypto
verdict of 2026-09-14 restated. The answer then was
`docs/_engines/DESIGN_GAP_DIAGNOSIS_2026-09-14.md` and the four uplift commits
`7dfe04b3` (crypto), `ba7b184a` (charities), `569d3304` (contractors-ir35),
`48312e2c` (construction-cis).

---

## 0. Where this site actually sits, measured

The §9.1 kit-adoption gate, run today with the CORRECTED block from
`DESIGN_PORT_PLAYBOOK.md:730-750`:

```
1  layout-utils   : 6            PASS (>=1)
2  kit adopted    : 5 distinct / 40 call sites   PASS (no floor; generalist 15/140)
2a kit declined   : 114 comment references naming a kit path
2b homepage mktg  : adopted=1 declined=8         PASS
3  webfont        : geist/font/sans              PASS
4  backdrop       : 1                            PASS
5  eyebrow ratio  : Eyebrow=8 section-label=0    PASS
6  rings not token: (none)                       PASS
7  gradients      : app/page.tsx, components/layout/StartupsBackdrop.tsx
8  ring guard     : walks=1 guards-the-guard=1   PASS
```

Every row passes. Row 2a is the row that explains the owner's verdict: **114
decline comments against 40 adoptions.** The playbook's own warning under row 2a
reads "a high row 2a with a low row 2 is a site that declined nearly everything".
That is this site.

The four-marker row, comment-stripped:

| site | ping | StatsCounter | Backdrop | rounded-full | owner |
|---|---|---|---|---|---|
| Property | 1 | 2 | 3 | 4 | "wow" |
| generalist | 1 | 2 | 3 | 4 | "looks good" |
| **startups-tech** | **0** | **0** | **0** | **0** | **"plain jane"** |
| crypto POST-uplift | 0 | 0 | 3 | 1 | "much better" |

`StartupsBackdrop` exists (`startups-tech/web/src/components/layout/StartupsBackdrop.tsx`)
and is mounted **once**, in the footer, at
`startups-tech/web/src/components/layout/PageShell.tsx:113`. The homepage hero,
every hub hero and every `SlimHero` call site paint flat colour.

Kit imports, real `from "..."` lines only:

| | generalist | startups-tech |
|---|---|---|
| page-blocks | 36 | 10 |
| Breadcrumb | 29 | 17 |
| LeadCTAPanel | 24 | 6 |
| FaqSection | 12 | 0 |
| NoticeCard | 7 | 4 |
| SlimHero | 5 | 3 |
| ExampleFigureNote | 5 | 0 |
| DrawnTickList | 5 | 0 |
| WhatToExpectCard | 4 | 0 |
| ProcessTimeline | 3 | 0 |
| CoverageCards | 3 | 0 |
| StatsCounter | 2 | 0 |
| PromptMarquee | 2 | 0 |
| NumberedReasons | 2 | 0 |
| ScrollGlowGroup | 1 | 0 |
| **distinct / call sites** | **15 / 140** | **5 / 40** |

Two more measurements that are not in any brief and matter more than most of the
above:

- **The site runs two grey ramps.** `grep -rho '\bneutral-[0-9]\{2,3\}'` over
  `startups-tech/web/src` returns **506** hits across 25 files; `slate-*` returns
  **299**; `stone-*` returns 7. generalist is 47 neutral against 852 slate. Every
  kit component the site mounts (`LeadCTAPanel`, `Breadcrumb`, `SlimHero`,
  `NoticeCard`, and every one this plan adds) paints `slate-*`, and the site's own
  `:root` tokens in `startups-tech/web/src/app/globals.css:66-73` are slate hexes
  (`--surface #f8fafc`, `--ink #0f172a`, `--border #e2e8f0`). So kit slate cards
  sit inside neutral sections on the same screen. This is crypto STATE item 10 at
  five times the size, and it is the single most likely source of "plain jane":
  two near-identical greys never line up, and the eye reads the mismatch as
  cheapness without being able to name it.
- **The motion layer is empty.** `wc -l` on `globals.css`: Property 832,
  generalist 329, startups-tech 262. `grep -n "^@keyframes"`: Property 10
  systems, generalist 0 locally but it `@import`s
  `@accounting-network/web-shared/design/globals-standard.css` at line 5,
  startups-tech **0 keyframes and no such import**. `.eyebrow-rule`, `.tick-draw`,
  `num-glow`, `card-glow` and `marquee-y` all name nothing on this site, so the
  `Eyebrow` component's rule does not draw and `DrawnTickList` would ship a static
  tick.

---

## A. Surface-by-surface comparison

Where generalist has no analogue the reference is Property, and that is stated.
"Mechanical" = existing copy only. "GATE" = needs an owner decision or copy the
site does not publish.

### A.1 Homepage (`startups-tech/web/src/app/page.tsx`, 868 lines)

| # | band | generalist renders | startups-tech renders today | gap | class |
|---|---|---|---|---|---|
| 1 | sticky bar | `<StickyCTA />` local, `page.tsx:245`, homepage only | nothing; the kit `StickyCTA` is declined as "interruptive" at `page.tsx:32` | copy already exists in config (see D1) | **GATE** |
| 2 | hero ground | `bg-slate-900` + `<GeneralistBackdrop tone="navy" />` at `:259-260` | `bg-primary-950` + a bare `bg-gradient-to-br` div at `:463-466`; no backdrop | mount `StartupsBackdrop` | mechanical |
| 3 | status pill | `rounded-full` pill, `animate-ping` dot, `ring-1 ring-white/25 backdrop-blur-lg`, `:263-268` | square `bg-white/10 border border-white/20` chip with a `ShieldCheck` and the site name, `:469-472` | shape only; the chip's text is `siteConfig.name`, unchanged | mechanical |
| 4 | hero H1 | `sm:text-5xl lg:text-7xl`, `text-balance`, `:270` | `sm:text-5xl lg:text-6xl`, no `text-balance`, `:474` | one step of scale | mechanical |
| 5 | hero CTAs | `btnPrimary` / `btnOnDark` from kit `layout-utils`, with `data-cta="hero_primary"` / `"hero_secondary"` + placement + goal + variant, `:284-303` | two hand-rolled `inline-flex ... bg-white` / `border border-white/30 bg-white/10` strings at `:479-493`; **no `data-cta` at all** | `border-white/30` is the exact defect `569d3304` fixed on contractors-ir35: 2.47 at the copy column's right edge, under the 3.0 floor for a button's only visible boundary; the kit `btnOnDark` is `border-white/40` at 3.20. And the site's `layout-utils.ts` does not export `btnOnDark` or `btnSecondary` at all (deleted as unused, with the reason written). | mechanical (contrast defect) |
| 6 | trust badges | `rounded-full` dots, `:307` | single `ShieldCheck` + one sentence, `:496-502` | leave the copy; dots are decoration | mechanical |
| 7 | stats strip | `<StatsCounter stats={heroStats} />` on `bg-white py-5`, `:317-320` | four `<a>` to gov.uk on a `bg-primary-900` dark band, `:510-529` | see C2; the four gov.uk links are the whole reason it was declined and they must survive | mechanical **after** kit edit C2 |
| 8 | problem / self-ID | `<HomeProblemStatement />`, `HomeSections.tsx:158`, uses `Eyebrow` + `Prose` + `PromptMarquee` | "Intro strip", a single `<p>` on `bg-stone-50`, `:531-541` | the kit `ProblemStatement` hardcodes Property's landlord copy and takes no copy props | GATE or kit edit C4 |
| 9 | who we are / why us | `<WhoWeAreSection />` + `<WhyChooseUsSection />` (`DrawnTickList`, `NumberedReasons`) | "Who we work with" audience grid `:543-571`, "Why specialist matters" `:697-740` | `CoverageCards` has no per-card `href` and these cards ARE the link floor | decline stands unless C5 |
| 10 | services grid | `<ScrollGlowGroup className="grid ...">` wrapping 4 cards, `:346-360` | plain `<div className="grid ...">`, `:573-604` | `ScrollGlowGroup` is a wrapper, changes no copy | mechanical (needs C6 motion) |
| 11 | process | none on generalist's homepage | "The moments that bring founders here" `:606-631` | not a numbered process; `ProcessTimeline` needs `{n,title,body}` the site does not publish | decline stands |
| 12 | tools band | `<CalculatorTabs />` + `data-cta="home_calculators_all"`, `:369-407` | two-column tools + research band, `:633-695`, no `data-cta` | instrumentation only | mechanical |
| 13 | proof | omitted on generalist ("no real anonymisable quotes exist") | **three real anonymised quotes** in a hand-rolled `<figure>` grid, `:740-769` | the kit `TestimonialsSection` hardcodes Property's three landlord quotes at `TestimonialsSection.tsx:8-28` and exposes **no `items` prop** | mechanical **after** kit edit C3 |
| 14 | FAQ | `<FaqSection eyebrow="Common questions" title="The honest answers" faqs={faqs} />`, `:471` | hand-rolled `<details>` + a plus-sign SVG, `:772-804` | see C1 | mechanical **after** kit edit C1 |
| 15 | closing panel | `<LeadCTAPanel ... backdrop={<GeneralistBackdrop />} />`, `:459-466` | `<LeadCTAPanel ...>` with a flat two-div backdrop, `:823-837` | swap the backdrop slot for `StartupsBackdrop` | mechanical |
| 16 | blog band | a real list of 3 recent posts with category rails, `:409-456` | centred text plus two buttons, no posts, `:839-864` | this is diagnosis §c2 verbatim, on a site with 37 links on `/blog` | mechanical |

### A.2 Services hub and detail

| surface | generalist | startups-tech | gap | class |
|---|---|---|---|---|
| `/services` hero | `SlimHero`-shaped band, `services/page.tsx:175` | hand-rolled `bg-primary-700 py-16`, `services/page.tsx:57`; `SlimHero` declined at `:32` because its `eyebrow` prop is **required** and the section has no label today | mount `StartupsBackdrop` on the existing band (no copy, no kit change) | mechanical |
| stats | `<StatsCounter stats={HERO_STATS} />`, `:213-215` | none | same as A.1/7 | after C2 |
| coverage | `<CoverageCards ... />`, `:226` | hand-rolled card grid, `:90` | `CoverageCards` takes no per-card `href`; these cards are the link floor | decline stands unless C5 |
| ticks | `<DrawnTickList>` | none | needs C6 (`.tick-draw` has no rule here) | after C6 |
| process | `<ProcessTimeline>` | none | `ProcessTimeline` now has an `html` prop (`ProcessTimeline.tsx:27`), so the old "escaped markup" decline is stale, but the site publishes no staged steps | GATE (copy) |
| FAQ | `<FaqSection>` | hand-rolled `<details>`, `services/[slug]/page.tsx:162` | after C1 | mechanical |
| closing | `<LeadCTAPanel>` | `<LeadCTAPanel>` at `services/page.tsx:102`, `services/[slug]/page.tsx:192` | already adopted; add the backdrop slot | mechanical |

### A.3 Audience hub and detail (`/for`, `/for/[slug]`)

**generalist has no `/for` route.** Reference is `Property/web/src/app/for/[slug]/page.tsx`.
Property's own file declines `StatsCounter` at `:81` for the same string reason
this site recorded ("values are strings like 18% / 24%"), so that decline matches
the standard rather than diverging from it. Property uses kit `CardStack`
(`:4`), `FaqSection ... html` (`:107`) and `LeadCTAPanel` (`:110`).

| surface | Property | startups-tech | gap | class |
|---|---|---|---|---|
| hero | `TopicHero` with motif | flat `bg-primary-700`, `for/page.tsx:40`, `for/[slug]/page.tsx:75` | backdrop mount | mechanical |
| key figures | plain text, deliberately | plain text on `bg-neutral-800`, `for/[slug]/page.tsx:92` | `bg-neutral-800` inside a slate-token site; convert to `slate-800` | mechanical |
| FAQ | `FaqSection html` | hand-rolled, `for/[slug]/page.tsx:141` | after C1, with `html` if any answer carries a link | mechanical |

### A.4 Blog

| surface | generalist | startups-tech | gap | class |
|---|---|---|---|---|
| `/blog` index | `LeadForm` + `LeadCTAPanel` + `data-cta="blog_index_book"` / `"blog_index_articles"` | no `LeadCTAPanel`, no `data-cta` | add panel, existing config copy | mechanical |
| category | `LeadForm` + `LeadCTAPanel` | neither | same | mechanical |
| post: reading aids | `ReadingProgress`, `TableOfContents`, `RelatedArticles` | all three, `blog/[category]/[slug]/page.tsx:22-24` | none | done |
| post: sidebar CTA | `<BlogSidebarCta>` (kit `design/blog/BlogSidebarCta.tsx`), `BlogPostRenderer.tsx:20,308` | **absent** | see E5: the site has ONE global blog CTA triple in `startups-tech/niche.config.json` (`blog.cta_heading` / `cta_body` / `cta_button`), not per-category copy. Feeding that triple authors nothing. | mechanical |
| post: skip-to-form | `data-cta="blog_skip_to_form"` link, `BlogPostRenderer.tsx:193` | absent | new anchor, label is a repeat of the existing form heading | mechanical |
| post: mid-scroll | `<InlineMiniLeadForm>` | `<InlineMiniLeadForm>`, `:222` | none, wording already parallel | done |
| post: end form | `<LeadForm>` | `<LeadForm>`, `:269` | none | done |
| post: FAQ | kit | declined at `:227` | after C1 | mechanical |
| post: ToolIsland | `<ToolIsland tool={earlyTool} />`, `:249` | absent, and the site has no `lib/intent` taxonomy | GATE (new surface, needs a tool map) |

### A.5 Calculators

| surface | generalist | startups-tech | gap | class |
|---|---|---|---|---|
| index | `LeadCTAPanel` + `LeadForm` + `data-cta="calc_index_help"` | `LeadCTAPanel` declined at `calculators/page.tsx` | adopt with existing copy | mechanical |
| detail hero | `bg-slate-900` + motif | `ground-dark bg-primary-600`, `calculators/[slug]/page.tsx:74`, `SlimHero` declined at `:63` | backdrop mount | mechanical |
| the tool | `CalculatorClient` | `CalculatorClient` with `resultCta={<CalcResultCta />}`, `:100` | none | done |
| result capture | `ResultCaptureForm` / `ResultGate` / `MobileToolSlot` / `PremiumCalculator` exist under `generalist/web/src/components/calculators/**` but **none is mounted on any `app/` route** (`grep -rl` over `generalist/web/src/app` returns nothing for all four) | `MiniCapture` at `:143` | see E4: there is no live `ResultCaptureForm` parity to reach | none |
| footer capture | `LeadCTAPanel` | `MiniCapture formId="calc_page_footer"`, `:143` | a second capture, not a missing one | none |
| FAQ | `<FaqSection faqs={faqs} />`, `:159` | declined at `:109` | after C1 | mechanical |

### A.6 Research, contact, about, thank-you, complete, book

| surface | generalist | startups-tech | gap | class |
|---|---|---|---|---|
| `/research` hub | `LeadForm` + `LeadCTAPanel` + per-asset `data-cta` (12 ids: `research_*_hero_book`, `_hero_data`, `_csv`) | `research/page.tsx` has neither a `LeadCTAPanel` nor one `data-cta` | panel + instrumentation | mechanical |
| research detail (x5) | `FaqSection` + `LeadCTAPanel` + 3 `data-cta` each | `LeadForm` only | panel + instrumentation | mechanical |
| `/about` | `LeadCTAPanel` + `data-cta="about_hero_book"` | `LeadCTAPanel` at `:82`, no `data-cta` | instrumentation | mechanical |
| `/contact` | `LeadForm` + `data-cta="contact_pricing_link"` | `LeadForm` + `MiniCapture` | none material | done |
| `/thank-you` | `SlimHero ... backdrop={<GeneralistBackdrop />}`, `:88`; `BookingPicker` | `SlimHero` x3 with **no backdrop**, `:66,86,106`; `BookingPicker` | pass the backdrop slot | mechanical |
| `/complete` | `SlimHero` + `DetailsForm` | `SlimHero` + `DetailsForm`, no backdrop | same | mechanical |
| `/book` | `SlimHero` + `BookingPicker` | same, no backdrop | same | mechanical |

### A.7 Lead-capture surface inventory, generalist against startups-tech

Header and drawer CTAs come from the kit `SiteHeader` and are **already at
parity**: `startups-tech/web/src/components/layout/PageShell.tsx:80-82` sets
`ctaContactGoal: "form"` and `ctaMobilePlacement: "mobile_menu"` and leaves
`ctaIds` at the kit defaults, so the rendered DOM carries
`header_book` / `header_book_mobile` / `header_contact`
(`packages/web-shared/design/chrome/SiteHeader.tsx:42-46,441,469,611`). That is
source-derived and must be confirmed in the rendered DOM at wave close (F4).

| surface | generalist mount | `data-cta` tuple | startups-tech | verdict |
|---|---|---|---|---|
| header desktop primary | kit `SiteHeader` | `header_nav_primary` / `header` / `form` | kit default `header_book` | parity (ids differ by design; both sites' own history) |
| header xl secondary | kit `SiteHeader` | `header_nav_secondary` / `header` | `header_contact` | parity |
| drawer primary | kit `SiteHeader` | `header_mobile_primary` / `mobile_menu` | `header_book_mobile` / `mobile_menu` | parity |
| hero primary | `page.tsx:285-291` | `hero_primary` / `hero` / `form` | none | **MISSING, mechanical** |
| hero secondary | `page.tsx:297-302` | `hero_secondary` / `hero` | none | **MISSING, mechanical** |
| homepage `LeadCTAPanel` | `page.tsx:459` | panel's own | `page.tsx:823` | parity |
| `LeadCTAPanel` breadth | 25 routes | 6 routes (`about`, `for`, `for/[slug]`, `page`, `services`, `services/[slug]`) | **MISSING on `/blog`, `/blog/[category]`, `/calculators`, `/calculators/[slug]`, `/research`, 5 research details** | **MISSING, mechanical** |
| `BlogSidebarCta` | `BlogPostRenderer.tsx:308` | `blog_sidebar_book` / `sidebar` / `form` | absent | **MISSING, mechanical (C-free)** |
| blog skip-to-form | `BlogPostRenderer.tsx:193` | `blog_skip_to_form` / `article_header` / `form` | absent | **MISSING, mechanical** |
| blog index CTAs | `blog/page.tsx` | `blog_index_book`, `blog_index_articles`, `blog_calculators_bridge`, `blog_calculators_all` | absent | **MISSING, mechanical** |
| inline mini capture | `InlineMiniLeadForm` -> `MiniCapture` | `formId="inline_mini"` | same, `blog/[category]/[slug]/page.tsx:222` | parity |
| calculator result CTA | none mounted | `CalcResultCta`, `calculators/[slug]/page.tsx:100` | **startups is AHEAD** |
| calculator footer capture | `LeadCTAPanel` | `MiniCapture formId="calc_page_footer"` | parity in kind |
| research CTAs | 12 ids across 4 assets | none | **MISSING, mechanical** |
| `/contact` pricing link | `contact_pricing_link` | none | **MISSING, mechanical** |
| booking flow | `BookingPicker` + `DetailsForm` + `/api/leads/book`, `/complete`, `/thank-you` | identical file set and identical API routes | parity |
| `StickyCTA` | `page.tsx:245`, homepage only | declined | **GATE D1** |
| `SpecialistWidget` | `layout.tsx`, site-wide, `data-cta="specialist_widget"` | absent | **GATE D3, interruptive** |
| `DeepScrollModal` | `layout.tsx`, `data-cta="deep_scroll_modal"` | absent | **GATE D3, interruptive** |
| `ReturningBar` | `layout.tsx`, `data-cta="returning_bar"` | absent | **GATE D3, interruptive** |
| `NextStepOffer` | `BlogPostRenderer.tsx:30`, `data-cta="next_step"` | absent | **GATE D3, interruptive** |
| newsletter `SignupForm` | `/newsletter` + footer | absent; no `api/nurture/*` routes on this site | **GATE D4, a new lane not a missing CTA** |
| `GateOrForm` / `ResultGate` / premium | `/resources/[topic]` only | no `/resources` route | out of scope, no route |

**Net:** every missing capture surface that is NOT interruptive is either a
`LeadCTAPanel` mount on a route that already has one elsewhere, a
`BlogSidebarCta` fed the config triple, or a `data-cta` attribute on a link that
already exists. None of it authors a sentence. Everything interruptive is a
gate.

---

## B. Work packages

**Four builders, strictly disjoint file sets, verified below with `ls`.**

**SEQUENCING, and it is not optional: U4 lands FIRST, alone.** U1, U2 and U3 all
consume `btnOnDark`, `.eyebrow-rule`, `.tick-draw` and `card-glow`, none of which
exist on this site today, and all four live in the two files U4 owns. Running U4
concurrently with the others is the "brief was wrong" case the playbook §10.1
pushback clause exists for. U1, U2 and U3 then run concurrently.

**The grey-ramp conversion (506 `neutral-*` classes) is NOT its own package.**
Doing it centrally would touch every file and destroy disjointness. Each builder
converts `neutral-*` to the matching `slate-*` step **in the files its own
package owns**, and U4 sweeps the residue nobody else owns. Step mapping is
one-for-one (`neutral-50`->`slate-50` ... `neutral-900`->`slate-900`); `stone-50`
(7 hits) -> `slate-50`. No token is invented and no hex moves.

### File ownership, verified

```
$ ls startups-tech/web/src/app/page.tsx \
     startups-tech/web/src/components/layout/StartupsBackdrop.tsx \
     startups-tech/web/src/app/globals.css \
     startups-tech/web/src/components/ui/layout-utils.ts
all four exist
```

| package | owns |
|---|---|
| **U1** | `src/app/page.tsx` |
| **U2** | `src/app/services/page.tsx`, `src/app/services/[slug]/page.tsx`, `src/app/for/page.tsx`, `src/app/for/[slug]/page.tsx`, `src/app/calculators/page.tsx`, `src/app/calculators/[slug]/page.tsx`, `src/app/research/page.tsx`, `src/app/research/rd-tax-relief-index/page.tsx`, `src/app/research/startup-formation-survival-index/page.tsx`, `src/app/research/tech-startup-survival-index/page.tsx`, `src/app/research/uk-tech-formations-index/page.tsx`, `src/app/research/uk-tech-funding-reliefs-index/page.tsx` |
| **U3** | `src/app/blog/page.tsx`, `src/app/blog/[category]/page.tsx`, `src/app/blog/[category]/[slug]/page.tsx`, `src/components/blog/InlineMiniLeadForm.tsx`, `src/components/calculators/MiniCapture.tsx`, `src/components/calculators/CalcResultCta.tsx`, `src/app/contact/page.tsx`, `src/app/about/page.tsx` |
| **U4** | `src/app/globals.css`, `src/components/ui/layout-utils.ts`, `src/components/layout/StartupsBackdrop.tsx`, `src/components/layout/PageShell.tsx`, `src/app/layout.tsx`, `web/package.json`, `src/app/book/page.tsx`, `src/app/complete/page.tsx`, `src/app/thank-you/page.tsx`, `src/app/terms/page.tsx`, `src/app/privacy-policy/page.tsx`, `src/app/cookie-policy/page.tsx`, `src/app/not-found.tsx`, `src/app/embed/[slug]/page.tsx`, `src/tests/**` |

No file appears twice. `web-shared/**` is owned by NOBODY: it is the manager
carve-out in section C and lands before any builder starts.

---

### U4. Motion layer, tokens and foundations (RUNS FIRST, ALONE)

**Files:** as listed above.

**Reference files:**
- `crypto/web/src/app/globals.css:122-200` (the local-keyframe pattern, added by `7dfe04b3`)
- `packages/web-shared/design/globals-standard.css:85-295` (the rules themselves)
- `generalist/web/src/app/globals.css:5` (the one-line import alternative)
- `generalist/web/src/components/ui/layout-utils.ts:6-19` (the full re-export)
- `contractors-ir35/web/src/app/globals.css` (`569d3304`, +94 lines, same shape)

**The decision this package makes, and it must be made from measurement, not
from the crypto precedent.** crypto declared its keyframes locally because
importing `globals-standard.css` was believed to drag in Property's emerald and
cream. Re-read today, that file declares **no colour of its own**: the only
Property values in it are CSS *fallbacks* inside
`rgb(var(--brand-glow, 16 185 129) / ...)` at `:141-196`, four tokens
(`--brand-glow`, `--brand-glow-deep`, `--brand-glow-edge`, `--brand-glow-faint`),
each documented at `:27-34` as "declare the token in a sibling's `:root` to
override". generalist imports it and is not emerald. So **the cheapest correct
answer is the import plus the four indigo channel declarations**, not 80 lines of
copied keyframes. The builder must verify this by diffing the built CSS for
`16 185 129` before and after, and fall back to the crypto local-declaration
route only if that grep is non-empty.

**Work:**
1. `package.json`: add `tw-animate-css` (generalist `package.json:29`), required
   by `globals-standard.css` and NOT bundled by it (`globals-standard.css:23`).
   Add `@radix-ui/react-accordion` (generalist `:15`), required by the kit
   `accordion` that `FaqSection` imports. Both are new dependencies: run
   `python scripts/check_dependency_closure.py` before handing back.
2. `globals.css`: add `@import "tw-animate-css";` and
   `@import "@accounting-network/web-shared/design/globals-standard.css";` in the
   order `globals-standard.css:11-18` specifies, then declare in `:root`:
   `--brand-glow: 99 102 241` (primary-500 `#6366f1`),
   `--brand-glow-deep: 79 70 229` (primary-600, the brand hex),
   `--brand-glow-edge: 129 140 248` (primary-400, the step `StartupsBackdrop.tsx`
   already paints), `--brand-glow-faint: 224 231 255` (primary-100). No new
   colour: all four are steps already declared in the `@theme` block at
   `globals.css:35-46`.
3. `globals.css`: alias `--font-mono` in `@theme inline` alongside the existing
   `--font-sans` at `:49-58`. Today `font-mono` is used on the homepage key
   figures (`page.tsx:519`) and resolves to Tailwind's stock `ui-monospace`
   because no alias exists. Either load `GeistMono` in `layout.tsx` the way
   `crypto`'s `7dfe04b3` did, or drop the `font-mono` class. Measure, then pick.
4. `globals.css`: the `<noscript>` release. `globals-standard.css:256-264`
   documents that `[data-draw="off"]` is in the server HTML and is released by a
   `<noscript>` override **in the root layout**. Check `layout.tsx` for it. If it
   is absent, add it, or gate the collapsed states behind
   `(scripting: enabled)` as `crypto/web/src/app/globals.css:148` does. Shipping
   a collapsed state with no release is the defect that left 64 pages on a
   sibling site with invisible marks.
5. `layout-utils.ts`: re-export `btnOnDark`, `btnSecondary` and `siteContainer`
   from the kit. They were deleted during the port with the reason "ZERO
   consumers"; U1 and U2 create consumers. `btnPrimary` and `focusRing` **stay
   local** for the reason already written at `layout-utils.ts:60-75` (the kit
   recipes hardcode `focus-visible:outline-primary-600`, which measures 1.82 to
   2.99 on this site's four dark grounds). `btnOnDark` must be checked the same
   way and wrapped if it embeds the same outline.
6. `StartupsBackdrop.tsx`: add a light-ground `tone` if the measurement requires
   one. Today the component's contrast note only covers `slate-900`
   (`StartupsBackdrop.tsx:32-40`); U1 mounts it on `primary-950` and U2 on
   `primary-700` and `primary-600`, so each new ground needs its own row.
7. `book`, `complete`, `thank-you`: pass `backdrop={<StartupsBackdrop />}` to the
   five `SlimHero` call sites, matching `generalist/web/src/app/thank-you/page.tsx:88`.
8. `neutral-*` -> `slate-*` in the files U4 owns.
9. Extend `src/tests/focus-ring.test.ts` (already `walks=1 guards-the-guard=1`)
   with an assertion that `btnOnDark` routes through this module.

**Declines:** none pre-recorded. Every decline this package writes names the kit
file path, per the row 2a counter-rule.

**OFF LIMITS:** every file owned by U1, U2, U3. `packages/**` (manager
carve-out). `Property/**`, `generalist/**` and every other site (trap 12: never
change Property, even indirectly). The brand hex `#4f46e5` and the 600 step. The
`--focus-ring` / `.ground-dark` mechanism.

---

### U1. Homepage

**File:** `startups-tech/web/src/app/page.tsx` ONLY.

**Reference files:** `generalist/web/src/app/page.tsx:236-474` band by band as
mapped in A.1; `Property/web/src/app/page.tsx:250` (the byte-identical H1 class
string) and `:364-418` (the blog band that lists real posts).

**Work, in the A.1 numbering:**

| band | action | prop carrying the existing copy |
|---|---|---|
| 2 | mount `<StartupsBackdrop />` inside the hero `<section>` before the gradient div | none |
| 3 | restyle the chip to generalist's pill: `rounded-full`, `ring-1 ring-white/25`, `backdrop-blur-lg`, and the `animate-ping` dot pair from `generalist/web/src/app/page.tsx:264-267` | the chip's text stays `{siteConfig.name}` |
| 4 | `lg:text-6xl` -> `lg:text-7xl`, add `text-balance` | H1 string unchanged |
| 5 | replace the two hand-rolled strings with `btnPrimary` / `btnOnDark` from `@/components/ui/layout-utils`; add `data-cta="hero_primary"` + `data-cta-placement="hero"` + `data-cta-goal="form"` and `data-cta="hero_secondary"` + `data-cta-placement="hero"` | labels "Speak to a startup specialist" / "R&D tax claims" unchanged |
| 7 | `<StatsCounter stats={keyStats} />` on a **light** band (`bg-white`, as `generalist:317`), each `StatItem` carrying `target`/`prefix`/`suffix` derived from the published string and the existing `href` via kit edit **C2**. `"20%"` -> `{target:20, suffix:"%"}`; `"£250k"` -> `{target:250, prefix:"£", suffix:"k"}`; `"18%"` -> `{target:18, suffix:"%"}`. All four `label` strings and all four gov.uk `href`s survive byte for byte. | `stats` + the new `href` |
| 10 | wrap the services grid in `<ScrollGlowGroup>` | `children` |
| 13 | `<TestimonialsSection items={testimonials} eyebrow="Real outcomes" title="What founders say" description={<existing standfirst>} backdrop={<StartupsBackdrop />} />` via kit edit **C3** | `items` + the three copy props |
| 14 | `<FaqSection eyebrow="Common questions" title="Common questions" faqs={faqs} />` via kit edit **C1** | `faqs`, the same binding `buildFaqJsonLd(faqs)` reads |
| 15 | `backdrop={<StartupsBackdrop />}` on the existing `LeadCTAPanel` | unchanged |
| 16 | render the three most recent posts as a real list, mirroring `generalist:414-449`; keep the existing standfirst and both existing buttons | `getAllPosts()` from `@/lib/blog` |
| all | `neutral-*`/`stone-*` -> `slate-*` | |

**Declines to WRITE at the call site, each naming the kit file path:**
`ProcessTimeline` (`packages/web-shared/design/marketing/ProcessTimeline.tsx`:
its `steps` are `{n,title,body}`; band 11 publishes no numbered stages).
`ProblemStatement` (`.../ProblemStatement.tsx:33-40`: hardcoded Property landlord
copy, one `marquee` prop, no copy props). `CoverageCards`
(`.../CoverageCards.tsx:5-15`: `CoverageItem` has no `href`, and the audience
cards ARE the homepage's links). `StickyCTA` (owner gate D1, not a measurement).
The existing decline comment block at `page.tsx:14-40` must be **rewritten, not
deleted**: seven of its eight entries change state.

**Link floor:** `/` = **18** (`docs/startups-tech/_port/sweep_baseline.json`).
Band 16 adds 3 post links, so the floor becomes 18 and the expected value rises;
assert `>= 18` and report the new number.

**OFF LIMITS:** `globals.css`, `layout-utils.ts`, `StartupsBackdrop.tsx`,
`PageShell.tsx`, every file owned by U2, U3, U4, and `packages/**`. No sentence,
figure, FAQ question or FAQ answer changes. `keyStats` values, labels and hrefs
are frozen. The three testimonial quotes and the "Composite accounts based on
patterns across our client base" disclaimer are frozen.

---

### U2. Hubs and detail templates

**Files:** the 12 listed above.

**Reference files:** `generalist/web/src/app/services/page.tsx:175-290`;
`generalist/web/src/app/calculators/[slug]/page.tsx:72-159`;
`Property/web/src/app/for/[slug]/page.tsx:79-110`.

**Work:**
1. Mount `<StartupsBackdrop />` in each hand-rolled hero band (`services:57`,
   `services/[slug]:93`, `for:40`, `for/[slug]:75`, `calculators/[slug]:74`,
   `research:119`). Six mounts, no copy, no kit change. This is the single
   highest-value line in the package: it is what makes a flat colour band read as
   art-directed, and it is why six of eight ported sites built a backdrop.
2. `FaqSection` on `services/[slug]`, `for/[slug]`, `calculators/[slug]` once
   **C1** lands. Pass `html` where an answer contains a `<a`; check each corpus
   rather than assuming.
3. `LeadCTAPanel` on `/calculators`, `/calculators/[slug]`, `/research` and the
   five research details, fed the same copy those routes already publish above
   their existing forms.
4. `data-cta` tuples on the existing links, matching generalist's naming so the
   `vw_cta_performance` series is readable across sites: `calc_index_help`,
   `calc_hero_help`, `research_<asset>_hero_book`, `research_<asset>_hero_data`,
   `research_<asset>_csv`, `services_hero_book`. Attributes only, no new links.
5. `ProcessTimeline` **only** where a `{n,title,body}` triple already exists in
   `src/config` or `src/data`. Grep first; if it does not exist, decline and say so.
6. `CoverageCards` **only** if kit edit **C5** lands; otherwise decline at each
   call site naming `packages/web-shared/design/marketing/CoverageCards.tsx` and
   the missing `href`.
7. `neutral-*`/`stone-*` -> `slate-*` in these 12 files. `bg-neutral-800` at
   `services/[slug]:111` and `for/[slug]:92` becomes `bg-slate-800`; both bands
   carry `ground-dark`, so re-measure the ring against the new ground.

**Declines:** `SlimHero` stays declined on all six hand-rolled heroes: its
`eyebrow` is a **required** prop (`SlimHero.tsx:28`) and its ground is a hardcoded
`bg-slate-900` (`:36`), so adopting it both authors a label and moves the ground.
Record it at each call site with those two line numbers. (Kit edit **C7** would
lift the first half; it is listed as optional and NOT on this package's critical
path.)

**Link floors** (`sweep_baseline.json`, assert `>=`): `/services` 7, `/for` 5,
`/calculators` 4, `/research` 6, `/research/startup-formation-survival-index` 6,
`/research/uk-tech-funding-reliefs-index` 4, `/research/rd-tax-relief-index` 4,
`/research/tech-startup-survival-index` 5, `/research/uk-tech-formations-index` 5,
`/services/rd-tax-claims` 2, `/services/seis-eis-advance-assurance` 2,
`/services/emi-scheme-setup` 2, `/services/share-schemes` 3,
`/services/fractional-cfo` 7, `/services/core-compliance` 5,
`/for/pre-seed-founders` 2, `/for/funded-startups` 2, `/for/saas-companies` 2,
`/for/software-development-companies` 2, `/for/fintech-startups` 2,
`/calculators/rd-relief-estimator` 3, `/calculators/seis-eis-relief-calculator` 3,
`/calculators/emi-vs-unapproved-calculator` 3,
`/calculators/founder-dividend-vs-salary-calculator` 3.

**OFF LIMITS:** `globals.css`, `layout-utils.ts`, `StartupsBackdrop.tsx`,
`page.tsx`, every U1/U3/U4 file, `packages/**`. No prose changes. The research
figures and their sources are frozen.

---

### U3. Blog and the lead kit

**Files:** the 8 listed above.

**Reference files:** `generalist/web/src/components/blog/BlogPostRenderer.tsx:20,111,193,277,308`;
`packages/web-shared/design/blog/BlogSidebarCta.tsx:19-58`;
`charities/web/src/app/blog/[category]/[slug]/page.tsx:22,308` (the nearest
single-file precedent, since generalist routes through a renderer component this
site does not have).

**Work:**
1. `<BlogSidebarCta copy={...} />` in the existing desktop `<aside>` at
   `blog/[category]/[slug]/page.tsx:290`, under the `TableOfContents`. `copy` is
   the triple already published in `startups-tech/niche.config.json`
   (`blog.cta_heading` = "Need specialist startup tax advice?", `blog.cta_body`,
   `blog.cta_button` = "Get in touch"). Nothing is authored. The component emits
   `data-cta="blog_sidebar_book"` / `data-cta-placement="sidebar"` /
   `data-cta-goal="form"` itself (`BlogSidebarCta.tsx:56-58`).
2. Skip-to-form anchor in the article header with
   `data-cta="blog_skip_to_form"` / `article_header` / `form`, label reusing the
   existing end-of-article form heading.
3. `FaqSection` on the post template (declined today at `:227`) once **C1** lands,
   with `html` if any answer carries a link.
4. `LeadCTAPanel` on `/blog` and `/blog/[category]`, fed the same config triple,
   with `data-cta="blog_index_book"` / `"blog_index_articles"`.
5. `data-cta="contact_pricing_link"` on the existing `/contact` link that points
   at pricing, if one exists; grep first, and decline in writing if it does not.
6. `neutral-*` -> `slate-*` in these 8 files. `InlineMiniLeadForm.tsx:20` already
   says `bg-slate-50`; align its `rounded-2xl border-l-4` card with generalist's
   `rounded-xl ... ring-1 ring-slate-200/70` only if the ramp sweep leaves it
   inconsistent, and say which.

**Declines to write:** `StickyCTA`, `SpecialistWidget`, `DeepScrollModal`,
`ReturningBar`, `NextStepOffer` are all **owner gates (D1, D3)**, not
measurements: record them as gates, not as declines. `ToolIsland` needs an
intent taxonomy (`generalist/web/src/lib/intent/taxonomy.ts`) this site does not
have; that is a build, and it is gate D5.

**Link floors:** `/blog` 37, `/blog/share-schemes-and-emi` 13,
`/blog/research-and-development` 8, `/blog/seis-and-eis` 7,
`/blog/saas-and-tech-finance` 5, `/blog/startup-compliance` 4, and every post
route in `sweep_baseline.json` (8 to 13 each). Assert `>=` on all of them.

**OFF LIMITS:** `globals.css`, `layout-utils.ts`, `page.tsx`, every U1/U2/U4
file, `packages/**`. No article body is edited. The consent paragraph inside
`LeadForm`/`MiniCapture` is the shared `leadConsentText` and is frozen
estate-wide (memory `leads_250_programme`).

---

## C. Manager carve-outs: the exact additive kit edits

`packages/web-shared/**` is a manager-direct carve-out. Every edit below is
**additive with a default equal to today's behaviour**, so every existing
consumer renders byte-identically. The consumer set that proves it is given as a
grep per edit.

### C1. `FaqSection`: server-HTML answers (REQUIRED, and it is a live defect elsewhere)

**No `forceMount` option exists today.** `packages/web-shared/design/primitives/FaqSection.tsx`
is 52 lines and renders `<Accordion type="single" collapsible>` from
`./accordion`, which is a thin wrapper over `@radix-ui/react-accordion`
(`accordion.tsx:4,9,48-62`). `AccordionPrimitive.Content` without `forceMount`
unmounts when closed, so a closed answer is absent from the server HTML while the
page's `FAQPage` JSON-LD keeps asserting it. The startups-tech decline at
`page.tsx:38-40` is therefore **correct as written**.

**It is also live on generalist right now.** `generalist/web/src/app/page.tsx:261`
builds `buildFaqPage(faqs)` and `:471` renders `<FaqSection faqs={faqs} />` from
the same binding, across 12 call sites. Same on `Medical`, `ecommerce` and
`construction-cis`. This edit fixes all of them.

**The edit:**
- `packages/web-shared/design/primitives/accordion.tsx:48` — add
  `forceMount?: true` passthrough on `AccordionContent`, and when it is set, add
  `data-[state=closed]:hidden` to the existing `className` so a force-mounted
  closed panel is present in the DOM but not visible. Radix requires the literal
  `true`, never `false`.
- `packages/web-shared/design/primitives/FaqSection.tsx:14` — new prop
  `alwaysRenderAnswers?: boolean` (default `false`), passed through to
  `AccordionContent` as `forceMount={alwaysRenderAnswers ? true : undefined}`.

**Default = current behaviour**, so the proof that nothing else moves is:

```
grep -rn "design/primitives/FaqSection" --include=*.tsx . | grep -v node_modules
  -> 32 files: construction-cis 1, ecommerce 11, generalist 12, Medical 3, startups-tech 5 (all 5 comments)
grep -rn "alwaysRenderAnswers" . | grep -v node_modules
  -> 0 today; after the edit, only the new startups-tech call sites
```

Every one of those 32 files omits the prop and is unaffected. Whether to turn it
ON for generalist and the other three is a **separate decision for the owner or a
separate sweep**, not this wave's work: it changes their rendered HTML.

### C2. `StatsCounter`: a link slot (REQUIRED for the homepage marker)

`packages/web-shared/design/marketing/StatsCounter.tsx:5-22`. `StatItem` already
carries `value?: string` (`:14`, "literal text shown instead of the count-up"),
which **falsifies half of every StatsCounter decline in the estate**: the
"mangles 18% / 24%, strips the separator from £3,000" reason recorded on crypto
(`crypto/web/src/app/page.tsx:345`), construction-cis, charities and here is
stale. What is still true is the other half: there is **no slot for a link**, and
startups-tech's four figures each carry a gov.uk source `href`
(`startups-tech/web/src/app/page.tsx:51-72`).

**The edit:** add `href?: string` to `StatItem` (`:5-22`) and, in the render at
`:114-117`, wrap the value `<div>` in an `<a href>` **only when `href` is set**,
carrying the site's focus ring via the existing utility rather than a new one.

```
grep -rn "design/marketing/StatsCounter" --include=*.tsx . | grep -v node_modules
  -> generalist 2 imports, Medical, Solicitors, plus decline comments
grep -rn "StatItem" packages generalist Medical Solicitors --include=*.tsx
  -> no existing caller sets href
```

Every existing caller omits `href` and renders byte-identically.

### C3. `TestimonialsSection`: an `items` prop (REQUIRED for homepage band 13)

`packages/web-shared/design/marketing/TestimonialsSection.tsx:8-31` hardcodes
Property's three landlord quotes in a module-scope `export const testimonials`,
and the component signature at `:38-52` takes `eyebrow`, `title`, `description`
and `backdrop` but **no `items`**. That is why this site, construction-cis and
crypto all declined it.

**The edit:** add `items?: typeof testimonials` (default the existing module
constant) at `:43-52` and map over `items` instead of the constant in the render.

```
grep -rn "TestimonialsSection" --include=*.tsx . | grep -v node_modules
  -> Property (its own local copy, untouched), 1 kit consumer, plus decline comments
```

This is what turns D2 from an owner gate into a mechanical adoption: the site
already publishes three anonymised quotes and the disclaimer that governs them
(`startups-tech/web/src/app/page.tsx:740-769`). **No quote is invented.**

### C4. `ProblemStatement`: copy props (OPTIONAL)

`packages/web-shared/design/marketing/ProblemStatement.tsx:33-40` hardcodes
"Your rent went up. Your profit didn't." and the Section 24 paragraph. Adding
`eyebrow?`, `title?`, `body?` with the current strings as defaults would let
homepage band 8 adopt it. **Not on the critical path**; the site's intro strip is
one paragraph and the kit component is a two-column layout that would need a
right-hand `marquee` this site does not publish. Recommend: skip this wave.

### C5. `CoverageCards`: per-card `href` (OPTIONAL)

`packages/web-shared/design/marketing/CoverageCards.tsx:5-15`. `CoverageItem` has
`title`, `body`, `outcome?`, `icon` and no `href`, which is the honest reason
`/for`, `/services` and the homepage all declined it: those cards carry the
routes' link floors. Adding `href?: string` (wrap the card in a `Link` when set)
would unlock three adoptions. Note that the `html` prop already exists (`:35,92-97`),
so **the "would print escaped markup and kill the gov.uk citations" decline
recorded on crypto and construction-cis is also stale**; same for
`ProcessTimeline` (`ProcessTimeline.tsx:27,134`).

### C6. Nothing. The motion rules need no kit edit.

`globals-standard.css` already carries `eyebrow-rule`, `tick-draw`, `num-glow`,
`card-glow`, `marquee-y`, `fadeInUp`/`hero-reveal`, with Property's colours only
as overridable `rgb(var(--token, <default>))` fallbacks (`:27-34`). U4 imports it
and declares the four indigo channels. No file in `packages/**` changes.

### C7. `SlimHero`: optional eyebrow (OPTIONAL, NOT recommended this wave)

`SlimHero.tsx:28` requires `eyebrow: string`; `:36` hardcodes `bg-slate-900`.
Making the eyebrow optional is trivial; making the ground a prop is a bigger
change to a primitive Property depends on. Mounting `StartupsBackdrop` on the
site's existing heroes (U2 item 1) gets the visual result for free. Skip.

---

## D. Owner gates, in plain English

**D1. The sticky bar at the bottom of the screen.**
Property and Holloway Davies both have a slim bar that slides up from the bottom
of the home page once you have scrolled about half a screen, with one line of
text and a button. You can close it, and it stays closed for the rest of the
visit. It does not appear on the admin or embed pages, and it does not appear to
someone who has already sent an enquiry.
The words are already written and sitting in this site's own settings file:
"Speak to a startup accountant", "Specialist advice on R&D, SEIS/EIS, EMI and
share schemes. No obligation.", button "Get in touch". Nothing new would be
written.
**Decision: yes or no.** It is the one thing on the "lead stuff" list that
interrupts the reader, which is why it is being asked rather than built. Blast
radius: the home page only. Revert: delete one line.

**D2. Testimonials. RESOLVED, no gate needed.**
The brief expected this to need quotes the site does not have. It does not: the
site already publishes three anonymised founder quotes with a disclaimer
explaining they are composites. The only blocker was that the shared component
had Property's landlord quotes welded into it, and that is a code fix (C3). No
owner decision.

**D3. The four other pop-up style surfaces on Holloway Davies.**
A floating help button in the corner, a panel that appears when you scroll most
of the way down an article, a bar that greets returning visitors, and a
next-step offer at the end of a post. All four interrupt. **Recommendation: no**,
unless you want them, and if you do it should be one at a time so we can tell
which one earns its place.

**D4. A newsletter.** Holloway Davies has a newsletter sign-up and this site has
none, including no back-end for it. That is a new marketing channel, not a
missing button. **Recommendation: not now.**

**D5. In-article calculator panels.** Holloway Davies drops a relevant calculator
into the middle of an article. Building that here needs a map of which article
gets which tool, which is a content job. **Recommendation: a later wave.**

**D6. Turning the FAQ fix on for the other sites.** The code fix in C1 also fixes
a live problem on Holloway Davies, Medical and two others, where the answers we
promise search engines are not actually in the page. Fixing them is a few lines
each but it changes what those pages send, so it should be its own small job with
its own check. **Recommendation: yes, but separately.**

---

## E. False premises in this brief and in the prior docs, numbered

1. **"startups imports `LeadCTAPanel` and `page-blocks` only."** It imports five
   kit modules across 40 call sites: `Breadcrumb` (17), `page-blocks` (10),
   `LeadCTAPanel` (6), `NoticeCard` (4), `SlimHero` (3). Command:
   `grep -rh "^import .*web-shared/design/\(marketing\|primitives\)/" startups-tech/web/src`.
2. **"generalist's homepage imports `FaqSection`... and the kit `FaqSection` has
   been declined on every port."** Both halves cannot be true, and the second is
   the false one. generalist imports `FaqSection` at 12 call sites including the
   homepage (`generalist/web/src/app/page.tsx:19,471`), and so do `ecommerce`
   (11), `Medical` (3) and `construction-cis` (1). It was declined on crypto,
   charities and startups-tech. Consequence: generalist is **live with the exact
   JSON-LD mismatch** the decline exists to avoid.
3. **"`StatsCounter`... would have mangled '18% / 24%' and stripped the separator
   from '£3,000'."** Stale since `StatItem.value?: string` was added
   (`StatsCounter.tsx:14`, whose own comment records the "28 February rendered as
   0" incident that prompted it). The surviving reason is the missing link slot
   only. The same staleness applies to the `CoverageCards` and `ProcessTimeline`
   "escaped markup" declines: both gained an `html` prop
   (`CoverageCards.tsx:35`, `ProcessTimeline.tsx:27`).
4. **"`ResultCaptureForm` parity."** There is no parity to reach.
   `generalist/web/src/components/calculators/ResultCaptureForm.tsx`,
   `ResultGate.tsx`, `premium/MobileToolSlot.tsx` and `premium/PremiumCalculator.tsx`
   all exist but **none is mounted on any route under `generalist/web/src/app`**
   (`grep -rl` returns nothing for all four). They are reachable only through
   `/resources/[topic]`, a route this site does not have. This is the estate's own
   rule landing on the brief: a surface is live because something renders it.
5. **"`BlogSidebarCta` with the site's per-category copy already in config."**
   There is no per-category blog CTA copy on this site. `startups-tech/niche.config.json`
   publishes ONE global triple under `blog` (`cta_heading`, `cta_body`,
   `cta_button`). generalist's per-category map is `generalist/web/src/lib/blog-cta-map.ts`,
   and `startups-tech/web/src/lib` has no such file. The adoption still authors
   nothing, because the global triple is real copy; the plan just cannot promise
   per-category variation.
6. **"`TestimonialsSection`... is an OWNER GATE item, never invented."** The
   quotes exist (`startups-tech/web/src/app/page.tsx:740-769`). The blocker is the
   component's missing `items` prop, which is a manager carve-out, not an owner
   decision.
7. **"Audience hub and detail: what generalist renders."** generalist has no
   `/for` route and no `/services/[slug]` route. The reference for both is
   Property (`Property/web/src/app/for/[slug]/page.tsx`,
   `Property/web/src/app/services/*/page.tsx`).
8. **"four-marker row target: ping=1 stats>=1 backdrop>=1 rounded-full>=1."** The
   playbook that defines the row says the opposite: "It is a thermometer, not a
   blocker... Report it; do not chase it", and records that the owner passed
   crypto at **0/0/3/1** post-uplift (`DESIGN_PORT_PLAYBOOK.md:780-786`). The
   target is adopted here because the owner asked for the kit specifically, but it
   is an instruction, not a gate, and `rounded-full` in particular is a
   homepage-copy artefact.
9. **"`globals.css` and `layout-utils.ts` are OPEN to U4 only" while U1 adopts the
   kit button recipes.** `btnOnDark` and `btnSecondary` do not exist in this
   site's `layout-utils.ts` (deleted during the port, reason at
   `layout-utils.ts:10-19`). U1 cannot use what U4 has not yet exported. Resolved
   by sequencing U4 first, alone.
10. **"the crypto route: declare keyframes LOCALLY... without importing
    `globals-standard.css` and its palette."** `globals-standard.css` declares no
    palette. Its only Property values are four overridable `rgb(var(--token,
    ...))` fallbacks documented at `:27-34` as the sibling swap surface, which is
    why generalist imports it and is not emerald. The local-declaration route is
    the fallback, not the default.
11. **"`StartupsBackdrop` sits in the footer only" (implied: nowhere else
    possible).** True today (`PageShell.tsx:113`), but `/calculators` also carries
    an explicit decline of it at `calculators/page.tsx:50`. That decline must be
    re-read and either upheld with its measurement or reversed, not silently
    overwritten.
12. **Diagnosis §1 "generalist 16 distinct / 138 call sites" and §9.1 row 2
    "16 / 142".** Re-derived today: **15 distinct / 140 call sites**. The three
    published figures disagree with each other and with the tree. Minor, but the
    row is quoted as a benchmark in two places.
13. **`startups-tech/web/src/app/globals.css:5`** says the import is needed
    because "the homepage uses `.section-label`". `grep -rn section-label
    startups-tech/web/src` returns that comment only; the homepage has zero. Same
    stale-comment shape crypto fixed in `7dfe04b3`. The `.prose` half of the
    reason is still load-bearing: do not drop the import.

---

## F. Wave-close verification list

One build, one server, every row executed before any tag. Run the playbook
preflight first (`netstat -ano | grep ":31"`, kill orphans, `git tag -l 'port-*'`).

| # | check | command | expected |
|---|---|---|---|
| F1 | four-marker row | `P=startups-tech/web/src/app/page.tsx; S=$(perl -0pe 's{/\*.*?\*/}{}gs; s{//[^\n]*}{}g' $P); echo "ping=$(echo "$S"|grep -c 'animate-ping') stats=$(echo "$S"|grep -c 'StatsCounter') backdrop=$(echo "$S"|grep -c 'Backdrop') rounded-full=$(echo "$S"|grep -o 'rounded-full'|wc -l)"` | `ping=1 stats>=1 backdrop>=1 rounded-full>=1` |
| F2 | §9.1 gate, all 8 rows | the block at `DESIGN_PORT_PLAYBOOK.md:730-750` | row 1 >=6, row 2 >= 10 distinct, row 2a DOWN from 114, rows 3/4/5/8 pass, rows 6/7 every line explained |
| F3 | kit adoption delta | `grep -rh "^import .*web-shared/design/\(marketing\|primitives\)/" startups-tech/web/src \| grep -o "design/\(marketing\|primitives\)/[A-Za-z-]*" \| sort \| uniq -c` | >= 10 distinct, >= 80 call sites |
| F4 | CTA triples, RENDERED | `curl -s localhost:3201/ \| grep -o 'data-cta="[^"]*"' \| sort \| uniq -c` | `header_book`, `header_book_mobile`, `header_contact` still present and unchanged; `hero_primary`, `hero_secondary` new. Diff the whole set against `docs/startups-tech/_port/cta_baseline.json` and report every triple that changed placement or goal (trap 22). |
| F5 | link floors | the 66-route sweep that produced `sweep_baseline.json`, same script, same base | every route `>=` its baseline count; 0 dead links |
| F6 | FAQ answers in server HTML | `curl -s localhost:3201/ \| grep -c "<the first 40 chars of each FAQ answer>"` for every `faqs` entry, and the same on `/services/rd-tax-claims`, `/for/funded-startups`, `/calculators/rd-relief-estimator`, one blog post | count == the number of answers the page's `FAQPage` JSON-LD asserts, on every page |
| F7 | JSON-LD parses | extract every `application/ld+json` block across all 66 routes and `JSON.parse` each | 0 parse failures; block count `>=` the pre-wave count |
| F8 | prose multiset unchanged | extract all visible text from each of the 66 routes before and after, sort the sentence multiset, diff | empty diff except for sentences this plan explicitly moves (none are edited). Any non-empty diff is a stop. |
| F9 | tsc | `cd startups-tech/web && npx tsc --noEmit` | clean |
| F10 | tests | `cd startups-tech/web && npm test` | 81/81 (re-derive the denominator; new guards raise it) |
| F11 | dependency closure | `python scripts/check_dependency_closure.py` | OK across all sites. **Mandatory**: U4 adds `tw-animate-css` and `@radix-ui/react-accordion`. |
| F12 | em-dashes | `grep -rn '—' startups-tech/web/src --include=*.tsx --include=*.ts` | only `src/app/admin/analytics/page.tsx` (pre-existing, 1, non-public) |
| F13 | raw hex in components | `grep -rnoE '#[0-9a-fA-F]{6}' startups-tech/web/src --include=*.tsx` | every hit has a written reason at that line (today: `StartupsBackdrop.tsx` `#818cf8`, `PageShell.tsx` `#4f46e5`, both documented) |
| F14 | grey ramp | `grep -rho '\bneutral-[0-9]\{2,3\}\|\bstone-[0-9]\{2,3\}' startups-tech/web/src --include=*.tsx \| wc -l` | **0** (from 513) |
| F15 | motion actually resolves | in the built CSS, `grep -c "eyebrow-rule\|tick-draw\|card-glow\|num-glow"` | > 0 for each; and `grep -c "16 185 129"` in the built CSS == **0** (no Property emerald leaked through a fallback) |
| F16 | no-JS release | disable JS, load `/`, screenshot | every eyebrow rule drawn, every tick drawn, no invisible marks |
| F17 | contrast + overflow | the estate instrument at four widths (390/768/1024/1440) over 24 page-loads | 0 contrast findings, 0 overflow, 0 anchor gaps. Every new backdrop ground measured stop by stop (row 7). |
| F18 | ring guard | `npm test -- focus-ring` | walks the whole `src` tree, guards-the-guard assertion present, 0 bypasses |
| F19 | **the owner's side-by-side** | run both sites (`startups-tech` on 3201, `generalist` on its own port), then headless Chrome: `/` at **1280x900** and at **390x844**, full-page PNG, four files named `startups_1280.png`, `generalist_1280.png`, `startups_390.png`, `generalist_390.png`, saved to the session scratchpad and attached to the readout | four images, delivered as two pairs. This is the only check that answers the question the owner actually asked, and it is the one the diagnosis §11 says could not be done last time. |
| F20 | noise owned | count any failed CI run or failed deploy this wave caused | report the number before he finds it |

**Deploy is NOT part of this list.** Build local-first; production needs his
explicit go in that turn.

---

## G. Agent count

The port has used **26 of about 36**. Ten remain.

| role | count | model |
|---|---|---|
| U4 motion/tokens/foundations (runs first, alone) | 1 | Sonnet |
| U1 homepage, U2 hubs, U3 blog + lead kit (concurrent) | 3 | Opus for U1 (the page the owner judges), Sonnet for U2 and U3 |
| adversarial review | 1 | Opus |
| gap-fix | 1 | Sonnet |
| re-review | 1 | Sonnet |
| **total** | **7** | |

**Seven fits in ten, with three in reserve** for the mop-up the playbook says to
budget from the start. The manager keeps the carve-outs: the three
`packages/web-shared` edits in section C, all git operations, the single build,
the four screenshots, and the owner readout.

If the owner says no to every gate in section D, the count is unchanged: the
gates add no agent, they only remove work from U1 and U3.
