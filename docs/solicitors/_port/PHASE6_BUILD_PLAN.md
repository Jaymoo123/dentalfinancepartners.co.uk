# SOLICITORS DESIGN PORT — PHASE 6 BUILD PLAN (the last build phase)

Written 2026-09-11, read-only planning pass. Scope: `/contact`, the post-submit set
(`/thank-you`, `/book`, `/complete`), `/about`, research (hub + 3 data pages + the shared
charts file), resources (`/resources/[topic]`, and the `/resources` index DECISION), the
three legal pages, the four pillar-shaped statics, `/free-firm-health-check`, the
interruptive restyle, and two families nobody has owned yet (see 1.4).

Method: `docs/_engines/DESIGN_PORT_PLAYBOOK.md` 3-6, 10, 12, 14-16. Contract:
`docs/property/DESIGN_SYSTEM.md` 0/4b/4c/4d, rollout appendices F.6/F.7, and
`docs/solicitors/DESIGN_DELTA.md`. `_port/DISPOSITION_SLICE3.md` is a HYPOTHESIS written
2026-09-10, BEFORE the owner's hard rule; section 1 below records where it is now wrong.

---

## 0. THE DOMINANT CONSTRAINT, restated so no builder can miss it

**No copy changes. No SEO changes.** No visible text rewritten, moved, retitled or
re-sequenced. No `metaTitle`, `metaDescription`, `canonical`, JSON-LD *content*, sitemap
entry, route, redirect or internal link `href` touched.

The only permitted new text is chrome arriving with a standard component — **and phase 5
proved that includes text arriving through a component's DEFAULT props.**

### 0.1 The defaulted-visible-prop register (DERIVED, not assumed)

Every one of these puts words on the page when the caller passes nothing. Deriving command:
`grep -nE '^\s+[a-zA-Z]+ = ("|\{|\[)' packages/web-shared/design/*/*.tsx`

| component | prop | default string | phase 6 instruction |
|---|---|---|---|
| `marketing/LeadCTAPanel.tsx:18` | `eyebrow` | `"Free consultation"` | pass `""` unless the route already publishes that phrase |
| `marketing/LeadCTAPanel.tsx:27` | `formTitle` | `"Book your free consultation"` | pass the route's OWN existing ask heading, verbatim; `""` if none |
| `marketing/LeadCTAPanel.tsx` | `proofPoints` | required, no default | pass `[]` unless the words already exist on that route (phase 5 precedent) |
| `primitives/FaqSection.tsx:13,14` | `eyebrow`, `title` | `"FAQ"`, `"Frequently asked questions"` | pass each route's existing FAQ heading verbatim |
| `marketing/WhatToExpectCard.tsx:22-27` | `items` | **four Property strings**, incl. "Instant text and email from us" | ALWAYS pass explicit `items`. Never rely on the default. See WP1 gate. |
| `marketing/WhatToExpectCard.tsx:30` | `title` | `"What to expect"` | `/contact` already publishes "What happens next?" — pass that |
| `primitives/ExampleFigureNote.tsx:24` | `label` | `"Example figures displayed"` | FALSE over official statistics. Do not mount it on research. See R-3. |
| `marketing/TestimonialsSection.tsx:39-41` | `eyebrow/title/description` | Property's landlord copy | **do not mount this component anywhere in phase 6** |
| `marketing/ComparisonTable.tsx:70` | hardcoded | `"Most recommended"` pill, unconditional | **do not adopt**; new copy with no prop to suppress it (T12/T13) |
| `marketing/DrawnTickList.tsx:36` | `tickClassName` | `text-primary-400` (about 1.9:1 on white) | pass `tickClassName="text-[var(--btn-ground)]"` |
| `primitives/SlimHero.tsx` | `eyebrow` | **required, no default** | the eyebrow is NET-NEW text on 3 routes. See R-1. |

### 0.2 The sweep rule

Every rule-based sweep in this phase is scoped to **all of `Solicitors/web/src/` and
`Solicitors/web/content/`**, never to the file list in a work package. This lesson has now
been learned three times on this port; phase 5's review found a turnaround promise on
`/for-firm-buyers`, a page no disposition slice lists, and this plan found two whole
families the same way (1.4).

---

## 1. REALITY CHECK PER SURFACE — including FALSE PREMISES in the brief

### 1.1 Already done, do not re-do

| Claimed as phase-6 work | Actual state, with the command |
|---|---|
| `/contact` carries four turnaround promises, two in metadata | **ALL FOUR ARE GONE.** `git log -1 -- Solicitors/web/src/app/contact/page.tsx` = `9b3c3dab` ("remove every turnaround promise"). `grep -niE "24 hour\|within 24\|same working day\|turnaround" src/app/contact/page.tsx` = **0 hits**, metadata included; the description now reads "Fixed-fee quotes". **The metadata/body split the brief asks me to adjudicate does not exist any more.** |
| `StickyCTA`'s dismiss carries no `data-cta` id | **IT DOES.** `src/components/ui/StickyCTA.tsx:185-186` = `data-cta="sticky_cta_close"` + `data-cta-placement="sticky"`, landed in `021cc8cd`. Disposition 9.1 is stale. |
| `prose-solicitor` is an orphan CSS block | **FALSE. The string does not exist anywhere in `Solicitors/`.** `grep -rn "prose-solicitor" Solicitors/` = 0 hits; the only hits in the repo are the three doc lines asserting it. The real orphan is **`.hero-glass` (`globals.css:232`, zero consumers)** and the definition-less class name **`display-serif`** at `CTASection.tsx:37`. |
| The `globals.css` zero-consumer CSS recipes need deleting | **Phase 1 already deleted all of them** (`.btnPrimary`, `.btnSecondary`, `.btnOnDark`, `.focusRing`, `.siteContainerLg`, `.contentNarrow`, `.sectionY*`), and `.btnMailOutline` with them. Only `.card-premium`, `.card-flat`, `.hero-glass` survive. |
| Phases 3, 4 **and 5** restated routes in `link_baseline.json` | **FALSE. Exactly TWO restatements exist**, `restatements[].phase` = `["3","4"]`. Phase 5 restated nothing. |
| `link_baseline.json` totalDashes is 330 | 330 was the phase-0 capture; the file now reads **`totalDashes: 447`** after the two restatements. Quote 447, or quote 330 and say which. |
| Guard tests still to be authored | `src/tests/` already holds 14 files including `nav-active-state`, `no-em-dash`, `summary-quality`, `blog-category-copy`, `blog-post-binding`, `hub-article-crawl-path`, `calculator-tabs-crawl-path`, `calculator-route-collision`. Only `consent-anchor-drift`, `niche-config` and a chart-a11y guard are missing. |

### 1.2 Confirmed still live, exactly as recorded

- `/resources` 404: no route (`ls src/app/resources` = `[topic]` only), no redirect
  (`next.config.ts` has 6, none for it), absent from `sitemap.ts`, linked from **one**
  source line, `src/app/resources/[topic]/page.tsx:56`, rendering on 8 routes.
- Research WCAG: `research/page.tsx:90` and `uk-legal-incorporation-index:323,327,331,335`
  are `text-neutral-400` (2.52:1). Crimson eyebrows on the dark hero at
  `law-firm-survival-index:182`, `uk-legal-incorporation-index:177`,
  `uk-solicitor-profession-structure:190` (3.06-3.07:1).
- `LegalIncorporationCharts.tsx`: THREE charts, `aria-hidden="true"` on the wrapper at
  `:36 :98 :177` AND a dead `role="img"` at `:41 :103 :182`. Values live only in `<title>`.
  `fontSize` 7, 8 and 9 throughout. Two consumers, both research pages.
- Kit `SiteHeader` `aria-controls`: `:259` points at `menuId`, whose element renders only
  inside `{open ? ...}` at `:277`/`:313`; `:478` points at `panelId`, rendered only at `:501`.
  Same defect class phase 4 fixed on `CalculatorTabs.tsx:190-192`.
- `src/config/site.ts:8` still reads `niche.company.registered_office` unguarded.
- `health-check/Wizard.tsx:610-611,625-626` still carry the red/amber severity ramp that
  collides with the brand; `:356` is the legitimate form-error red.
- `ExitIntentModal.tsx`: 0 importers; three referring comments at `PageShell.tsx:5`,
  `SpecialistWidget.tsx:18,136`.
- `/contact:52-66` still holds the dormant `packagesMode` "49 a month" + `/pricing` branch.
- Cookie policy `:64` `_gid`, `:71` "IP addresses are anonymised" / "retained for 14 months",
  `:91` "takes effect immediately"; `_ga_N6ZPRB3DSQ` missing. GA4 genuinely live
  (`layout.tsx:102`).

### 1.3 The interruptive stack

`layout.tsx:109-113` mounts `ReturningBar`, `DeepScrollModal`, `SpecialistWidget` inside
`IntentProvider`; `PageShell.tsx` mounts `StickyCTA`. `src/tests/intent-engine.test.ts`
(360 lines) pins triggers, the ladder and the surface gates. **RESTYLE ONLY: that file stays
green and unedited, and that is the acceptance test.**

### 1.4 TWO FAMILIES NOBODY OWNS — found by sweeping, not by the file list

1. **The four audience routes are entirely unported.** `/for-partners`,
   `/for-junior-solicitors`, `/for-locum-solicitors`, `/for-firm-buyers` all render
   `src/components/audience/AudienceStageLayout.tsx`, last touched by `9814d1502`
   ("Solicitors Phase 3: 4 audience-stage pages"), long before the port. It carries
   **12 `font-serif` and 4 `rounded-2xl`**. STATE assigns them to "slice 2", phase 5 did not
   touch them, and this is the last build phase. **One template, four routes.** Floors
   14/14/14/14; dash ceilings 7/4/1/1.
2. **`font-serif` will not reach zero without them.** `grep -ro font-serif src | wc -l` =
   **110** (from 194). The phase-6 page files account for about 90; the remainder are
   `AudienceStageLayout.tsx` (12), `health-check/Wizard.tsx` (11), `error.tsx` (1),
   `not-found.tsx` (1), `admin/analytics/login/page.tsx` (1), plus the 6 comment/mapping lines
   in `globals.css`. **The transitional `--font-serif` mapping (`globals.css:130`) can only be
   deleted when all 104 src uses are gone**, so this phase either finishes the job or the
   mapping ships to production as permanent debt.

---

## 2. FLOORS AND CEILINGS (from `link_baseline.json`, SHA `18b4f25f`, captured 2026-09-10)

Read out of the file, not transcribed from the disposition.

| route | link floor | CTA floor | dash ceiling |
|---|---:|---:|---:|
| `/contact` | 11 | 2 | 0 |
| `/about` | 11 | 4 | 1 |
| `/research` | 14 | 2 | 0 |
| `/research/law-firm-survival-index` | 12 | 2 | 0 |
| `/research/uk-legal-incorporation-index` | 13 | 2 | 0 |
| `/research/uk-solicitor-profession-structure` | 13 | 2 | 0 |
| `/resources/{incorporation,partnership-llp,practice-finance,sole-practitioner,sra-compliance,succession-sale}` | 13 each | 2 | 0 |
| `/resources/{professional-indemnity,vat}` | 12 each | 2 | 0 |
| `/free-firm-health-check` | 14 | 2 | 1 |
| `/privacy-policy`, `/terms`, `/cookie-policy` | 11 each | 2 | 0 |
| `/sra-compliance` | 11 | 4 | 2 |
| `/uk-solicitor-tax-rates` | 11 | 2 | **10** |
| `/specialist-vs-generalist-accountant` | 11 | 2 | 3 |
| `/law-firm-chart-of-accounts-template` | 16 | 2 | 0 |
| `/for-partners` / `-junior-` / `-locum-` / `-firm-buyers` | 14 each | 2 | 7 / 4 / 1 / 1 |
| `/thank-you`, `/book`, `/complete` | **absent** (noindex, not in the sitemap) | — | — |
| `/resources` | **absent** (it is the 404) | — | — |

Totals to hold: `totalLinks` 5,343 baseline, **10,692 today**; `totalCtas` 774 baseline,
**1,507 today**; `totalDashes` ceiling **447**. Diff the TOTAL as well as the per-route
counts: phase 4's route collision was invisible to every per-route gate and surfaced only as
a one-unit drop in the total.

**DASH CEILINGS ARE CEILINGS, NOT TARGETS.** The disposition planned to remove 17 em-dashes
across five phase-6 routes. **That is CANCELLED by the hard rule** — every one is visible
published text. `/uk-solicitor-tax-rates` keeps its 10. Do not lower `MAX_SRC` (71) in
`src/tests/no-em-dash.test.ts`.

---

## 3. WORK PACKAGES

Six packages. Every package's acceptance tests include, verbatim, each reported with its
decisive output line:

```
python scripts/check_dependency_closure.py
cd Solicitors/web && npx tsc --noEmit
cd Solicitors/web && npm test
```

plus a **word-multiset check per touched route** (the phase-3 decisive gate): extract the
visible text of the route before and after and prove the multiset is unchanged, except for
strings on an explicit, enumerated ADDED list the builder reports in full for manager
fact-QA. Builders do NOT run `next build`, `next dev`, or any git write command; read-only
git from the monorepo ROOT only.

### WP0 (MANAGER-DIRECT, runs alone and first) — kit `aria-controls`, and nothing else

- `packages/web-shared/design/chrome/SiteHeader.tsx:259` becomes
  `aria-controls={open ? menuId : undefined}`; `:478` becomes
  `aria-controls={open ? panelId : undefined}`.
- **Pattern to copy:** `Solicitors/web/src/components/tools/CalculatorTabs.tsx:190-192`,
  comment included — the same fix phase 4 shipped on the tablist.
- **T23:** the consumer set is now **FOUR sites**, not two.
  `grep -rln "web-shared/design/chrome" --include=*.tsx .` returns Dentists, generalist,
  Medical and Solicitors `PageShell.tsx` (plus `Dentists/.../DentalMark.tsx`). Property is not
  a consumer. Zero visual diff on all four: the attribute only disappears while closed.
- Acceptance: `cd packages/web-shared && npm test` (19 files / 406 tests), plus `tsc` on
  Solicitors AND generalist.
- **OFF LIMITS:** every other kit file. Do not touch `LeadCTAPanel`, `WhatToExpectCard`,
  `ExampleFigureNote` or `ComparisonTable` — WP1-WP5 work around their defaults by passing
  props, deliberately, so Property and three siblings stay byte-identical.

### WP1 — Post-submit set + `/contact` (F.6 + F.7)

Files: `src/app/thank-you/page.tsx` (211), `src/app/book/page.tsx` (57),
`src/app/complete/page.tsx` (130), `src/app/contact/page.tsx` (157).
Port from: `Property/web/src/app/{thank-you,book,complete,contact}/page.tsx`.
In-repo pattern: phase 5's `/locations/[slug]` `LeadCTAPanel` call site, which already
demonstrates passing every visible prop explicitly.

1. All four adopt `SlimHero` + `NoticeCard` + the ask-left / reassurance-right grid
   `grid gap-8 sm:gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16`, with **F.6's four deliberate
   departures honoured**: no `LeadCTAPanel`, no breadcrumb, shallow hero with no CTA row, no
   tick badge (`thank-you`'s `CheckIcon` at `:14-26` is deleted, not restyled).
2. `contentNarrow` / `mx-auto max-w-2xl` body clamps and their `text-center` go.
   `siteContainerLg` IS the measure.
3. `rounded-2xl` to `rounded-xl` + `ring-1 ring-slate-200/70`; grounds oscillate navy hero
   then white/slate-50; the tail is light so navy never touches the navy footer.
4. The three hand-rolled notice cards on `/complete` (`:24-36`, `:53-63`, `:93-107`) become
   `NoticeCard`; the token / `adminSelect` logic at `:51-110` is byte-untouched.
5. `/contact`: navy motif hero (`SolicitorsBackdrop tone="navy"`, host
   `relative overflow-hidden`, content `relative z-10`), then the `#book scroll-mt-24` capture
   band with `LeadForm redirectOnSuccess submitLabel="Send enquiry"` **byte-unchanged**, then
   the existing "Common enquiries" band as `CoverageCards columns={2}`. All anchor targets get
   `scroll-mt-24`.
6. The page-level duplicate `Organization` JSON-LD (`contact:26,:30-33`) is deleted —
   `layout.tsx:87` already emits the same `@id` site-wide. This removes a duplicate node; it
   changes no JSON-LD *content*, so it is inside the hard rule. Say so in the commit message.

**HARD GATES for this package:**
- `WhatToExpectCard` must receive **explicit `items`**, built from `/contact`'s own existing
  three `<li>` at `:86-104`, and **`title="What happens next?"`** from `:94`. The component's
  `DEFAULT_ITEMS` are four Property strings including "Instant text and email from us";
  letting them render is the phase-5 failure repeating.
- Every item must be checkable against `/privacy-policy` section 5 (up to six recipient
  firms). No item may imply exclusivity.
- `SlimHero.eyebrow` is REQUIRED and has no default, so it is **net-new visible text on three
  noindex routes**. See R-1: adopt, report the three strings on the ADDED list, keep every
  existing h1 and standfirst byte-identical so the fallback is a one-line revert.
- **F.7's WhoWeAre / WhyChooseUs / WhatWeCover bands are DROPPED.** No `MarketingSections`
  module exists (`grep -rln "WhoWeAre\|WhyChooseUs\|WhatWeCover\|MarketingSections" src` = 0;
  phase 5 never built one) and authoring those bands is new copy. Recorded departure.
- **`TestimonialsSection` is not mounted.** No anonymisable quotes exist on this site and its
  defaults are Property's landlord copy.
- The dormant `packagesMode` branch (`contact:52-66`, plus the `:11` const and the `:9`
  import) is deleted along with its `data-cta="contact_pricing_link"`. It renders nothing
  today (`niche.cta.variant = "leadgen"`), so no visible copy changes and no live series dies.
  **This is the phase-6 dormant-pricing item STATE.md records.**

Acceptance: `/contact` at or above 11 unique internal links and 2 `data-cta`; dash ceiling 0
held; word multiset on `/contact` unchanged except the enumerated ADDED list; `npm test`
green **including `lead-payload.test.ts`**, the consent tripwire (T19). The three post-submit
routes have no floor, so report absolute link and CTA counts before and after instead.

**OFF LIMITS:** every file in WP2-WP5, all of `packages/`, `src/components/intent/`,
`src/components/ui/StickyCTA.tsx`, `src/lib/leads/**`, `src/config/site.ts`,
`src/app/globals.css`.

### WP2 — `/about`, `/sra-compliance`, and the retirement of `CTASection`

Files: `src/app/about/page.tsx` (133), `src/app/sra-compliance/page.tsx` (206),
`src/components/ui/CTASection.tsx` (delete).
Port from: `Property/web/src/app/about/page.tsx`. In-repo pattern: phase 3's
`/solicitor-guides/[slug]` `TopicSection` consumption.

1. Navy motif hero on both; `Breadcrumb` moves into the hero (`about:31`,
   `sra-compliance:87`); h1 `text-white`, any accent `text-rose-300` (9.44 on navy) — the
   brand hex is **3.06 on slate-900 and must never carry text there**.
2. `about` four `.card-premium` blocks (`:43,:58,:73,:91`) and `sra-compliance` two
   (`:123,:150`) become `TopicSection` with `id` + `scroll-mt-24` and grounds set explicitly,
   oscillating white / slate-50, a card ground opposing its section ground.
3. `sra-compliance:154` `text-red-600` consequence line moves to W1 step 4 `text-violet-700`
   (7.10 on white), direct-labelled so nothing rests on hue. `:134` inline
   `style={{background:"var(--surface-elevated)"}}` becomes `className="bg-slate-50"`.
4. Both `CTASection` mounts (`about:127`, `sra-compliance:200`) become `LeadCTAPanel`, every
   visible prop passed explicitly per 0.1, then **delete `src/components/ui/CTASection.tsx`**
   — those are its only two consumers (`grep -rn "CTASection" src --include=*.tsx`).

**The data-cta finding that changes the cost:** `cta-section-primary` and
`cta-section-secondary` **also render from INLINE copies on `/locations` (`:133,:140`) and
`/locations/[slug]` (`:369,:376`)**, which phase 5 kept verbatim. Deleting the component does
NOT kill either series and **no baseline restatement is needed**. The disposition said one was.

**Do NOT delete `.card-premium` or `.card-flat` from `globals.css`.** After this package they
still have 5 and 3 consumers on phase 5 pages (`/`, `/locations`, `/locations/[slug]`), and
phase 5 deliberately left the recipe untouched. `.hero-glass` is WP5 to delete.

**COPY GATES, all FROZEN in this phase:** `about:50` carries 26.2% and `:68` the route one
em-dash; `about:77` ("100% legal sector focus ... Every client is a solicitor") and `:53` are
client-count assertions; `sra-compliance:117` carries 26.2% with the wrong period label and 2
em-dashes; US spellings on both pages. Every one is an owner item (section 5), not a fix.

Acceptance: `/about` at or above 11 links and **4** `data-cta`; `/sra-compliance` at or above
11 and **4**. The CTA floors are 4 on both and `CTASection` supplies two of each, so
`LeadCTAPanel` must emit at least two instrumented links per page or the floor breaks — state
the count and how it was derived. Dash ceilings 1 and 2 unchanged.

**OFF LIMITS:** `/locations` and `/locations/[slug]`, `src/app/page.tsx`, everything in
WP1/WP3/WP4/WP5, `packages/`, `src/app/globals.css`.

### WP3 — Research: the hub, three data pages, and the charts

Files: `src/app/research/page.tsx` (98), `src/app/research/law-firm-survival-index/page.tsx`,
`src/app/research/uk-legal-incorporation-index/page.tsx`,
`src/app/research/uk-solicitor-profession-structure/page.tsx`,
`src/components/research/LegalIncorporationCharts.tsx` (239).
Port from: **`Solicitors/web/src/components/tools/premium/PremiumBarChart.tsx` in THIS repo** —
phase 4 fixed the identical defect class there and its sr-only data table is the pattern.

**Charts first, because one file feeds two pages.**
1. Delete `aria-hidden="true"` from the three wrappers (`:36,:98,:177`) and delete the dead
   `role="img"` + `aria-label` pairs (`:41-42,:103-104,:182-183`).
2. Mark each `<rect>` `aria-hidden`, and render an **sr-only `<table>` built from the SAME
   formatter that produces the visible labels**. Do not type any number twice and do not build
   a second array.
3. `fontSize` 7/8/9 becomes 11 throughout. `#7c6ff7` at `:92` is the only non-token colour in
   the file; replace with a ramp token. The comparison series stays neutral slate, never red.
4. New guard `src/tests/research-chart-a11y.test.ts`: no `role="img"`, no `aria-hidden` on a
   chart wrapper, every series value reaching a text node. **Prove it bites** by reintroducing
   `aria-hidden`, watching it fail, removing it again; report the failing output.

**Then the three WCAG failures, before anything cosmetic:**
- `research/page.tsx:90` and `uk-legal-incorporation-index:323,327,331,335`:
  `text-neutral-400` (2.52) to `text-slate-500` (4.76).
- `law-firm-survival-index:182`, `uk-legal-incorporation-index:177`,
  `uk-solicitor-profession-structure:190`: crimson eyebrow on the dark hero (3.06-3.07) to
  `text-rose-300` (9.44 on slate-900).

**Then the restyle:** `bg-neutral-900` to `bg-slate-900` + `SolicitorsBackdrop tone="navy"`;
the whole `neutral-*` island (124 hits across the four research files and the charts) moves to
`slate-*`; `rounded-2xl` to `rounded-xl` + `ring-1 ring-slate-200/70`; the
`border-t first:border-t-0` auto-ground device replaced by explicit per-section grounds
oscillating white/slate-50; tables keep `overflow-x-auto` and gain `tabular-nums`;
`scroll-mt-24` on every anchor target.

**Do NOT mount `ExampleFigureNote`.** Its default `label` is "Example figures displayed",
false over Companies House / SRA / ONS data, and the only fix is a kit edit. See R-3.

**FROZEN:** every `Dataset` and `FAQPage` JSON-LD block, `temporalCoverage`,
`variableMeasured`, `license`, the derived `HEADLINE_SENTENCE` h1s, the `/data` CSV routes,
the missing `law-firm-survival-index/data/route.ts` (adding a route is forbidden), and the
zero-capture posture of all four routes. **Add no capture surface here.**

Acceptance: floors 14 / 12 / 13 / 13; dash ceilings 0 on all four; the chart guard proven to
bite; `grep -c 'aria-hidden' src/components/research/LegalIncorporationCharts.tsx` reported
before and after; every chart value present as a text node in the rendered component.

**OFF LIMITS:** everything in WP1/WP2/WP4/WP5, `packages/`, `src/app/globals.css`, and the
research data snapshots — never retype a figure.

### WP4 — Resources template, the health check, and the three remaining pillar statics

Files: `src/app/resources/[topic]/page.tsx` (113, **one file, 8 routes**),
`src/app/free-firm-health-check/page.tsx` (216), `src/components/health-check/Wizard.tsx`,
`src/app/uk-solicitor-tax-rates/page.tsx` (162),
`src/app/specialist-vs-generalist-accountant/page.tsx` (153),
`src/app/law-firm-chart-of-accounts-template/page.tsx` (335).
Port from: `Property/web/src/app/landlord-tax/[topic]/page.tsx`. In-repo pattern: phase 3
guide anatomy and phase 4 `/calculators/[slug]`.

1. **Smallest edit point is the template**: one edit changes all 8 resource routes. The
   full-bleed `bg-[var(--primary)]` hero (`resources/[topic]:53`) and the equivalents on the
   other five files become navy + motif.
2. The hand-rolled "Back to resources" chevron (`:55-63`) becomes the kit `Breadcrumb`. **Its
   `/resources` href stays `/resources` and stays a 404 until section 5 item 1 is decided.
   Do not change the href, do not delete the link.**
3. `font-serif` off all six files (1 + 9 + 11 + 6 + 5 + 14 = 46 uses); `rounded-2xl` to
   `rounded-xl` + `ring-1 ring-slate-200/70` (3 + 3 + 4 + 3 + 2 + 7 = 22); body clamps go;
   `scroll-mt-24` on anchor targets.
4. FAQ blocks stay fed from the SAME array already passed to `buildFaqPage()`
   (`uk-solicitor-tax-rates:66`, `free-firm-health-check:79`,
   `specialist-vs-generalist-accountant:79`, `law-firm-chart-of-accounts-template:71`) — one
   binding, both consumers (T17). **MANAGER OVERRIDE FROM PHASE 4 STANDS: do NOT adopt the kit
   `FaqSection`.** It is a Radix collapsible whose closed answers are not in the server HTML
   and which escapes HTML in answers; phase 4 overruled adopting it on 12 indexed pages for
   exactly that reason. Restyle the existing accordion in place. A builder who thinks the
   override should be lifted stops and asks the manager.
5. `Wizard.tsx:610-611,625-626` severity ramp off red: high to `violet-700`/`violet-50`,
   medium to `amber-700`/`amber-50`, escalation direction and direct labels preserved.
   `:356` `text-red-600` form error STAYS red with its existing `role="alert"` and icon.
6. `ResourceGate` (`resources/[topic]:106`) wrapper restyled only; mechanics byte-kept.
   **Verify no email-gated arm remains** (`src/lib/resources/registry.ts:13`, retired
   2026-07-17). `resource_block` is the residual open item from the consent-wording incident
   and sits at 0 leads; the port must not be read as its cause.
7. `#downloads` on the chart-of-accounts page: both `download` links and both filenames
   verbatim; buttons to `btnPrimary` and `btnSecondary` so the 44px pdf button clears the 48px
   primary floor.
8. `ComparisonTable` is **NOT adopted** on `/specialist-vs-generalist-accountant`: it
   hardcodes a "Most recommended" pill at `:70` with no prop to suppress it. Restyle the
   existing 2-up comparison rows in place.

**FROZEN:** `/uk-solicitor-tax-rates` keeps its **10 em-dashes** and every rate string;
`/specialist-vs-generalist-accountant` was already de-priced in phase 5 (`e93c9e00`,
`30d7a75c`), so **do not re-open it hunting pricing**, and its 3 em-dashes stay; every JSON-LD
block on all six files is content-frozen.

Acceptance: floors 13/13/13/13/13/13/12/12 across the 8 resource routes, then 14, 11, 11, 16;
dash ceilings 0, 1, 10, 3, 0; every rate on `/uk-solicitor-tax-rates` still traceable to
`docs/solicitors/house_positions.md` and used inside its stated scope.

**OFF LIMITS:** everything in WP1/WP2/WP3/WP5, `packages/`, `src/app/globals.css`,
`src/lib/resources/**` data.

### WP5 — Legal x3 (design only), the interruptive restyle, and the font-serif closure

Files: `src/app/privacy-policy/page.tsx`, `src/app/terms/page.tsx`,
`src/app/cookie-policy/page.tsx`, `src/components/ui/StickyCTA.tsx`,
`src/components/intent/ReturningBar.tsx`, `src/components/intent/DeepScrollModal.tsx`,
`src/components/support/SpecialistWidget.tsx`,
`src/components/blog/ExitIntentModal.tsx` (delete),
`src/components/audience/AudienceStageLayout.tsx`, `src/app/error.tsx`,
`src/app/not-found.tsx`, `src/app/admin/analytics/login/page.tsx`, `src/config/site.ts`,
`src/app/globals.css`.
Port from: the three Property legal pages and `Property/web/src/components/ui/StickyCTA.tsx`.

**Legal, DESIGN ONLY.** `font-serif` x12 / x14 / x6 dropped; h1 to
`text-3xl sm:text-4xl font-bold text-slate-900`, h2 to `text-2xl sm:text-3xl`; the inline
`text-[var(--accent-strong)] underline` links to the kit `InlineLink` (slate-700, 10.35:1 —
**keep the second hue, never re-point it at the brand**). `contentNarrow` is the SANCTIONED
measure on these three routes and stays. **NOT ONE WORD OF COMPLIANCE COPY IS EDITED IN THIS
PHASE.** Every finding goes to section 5.

**`src/config/site.ts:8`:** port the Property guard so a partial chunk load cannot throw.
Seven production `client_error` rows on Property came from exactly that, and
`/privacy-policy` and `/terms` are the two routes that render the office address.

**Interruptive restyle. Every trigger, threshold and cadence FROZEN.**
- `StickyCTA`: threshold `min(500px,25%)` at `:77-80` frozen, a recorded deviation from the
  Property 30%. `bg-white/95 border-t` (`:151`) to
  `bg-slate-900 border-t-4 border-[var(--brand-primary)]`; `max-w-7xl` (`:153`) to
  `siteContainerLg`. `sticky_cta_close` already exists at `:185`; do not re-add it.
- `ReturningBar`: `bg-[var(--primary)]` (`:41`) to the SAME bar language as StickyCTA; never
  two bar languages on one site. `max-w-5xl` (`:42`) to `siteContainerLg`.
  **DO NOT wire `deriveTopic` into `layout.tsx`.** The bar has never rendered; enabling it
  changes what the sticky bar shows on topic-less routes, which is a copy change. Owner item.
- `DeepScrollModal`: 70% plus once-per-page-load plus 30-day per-topic suppress, all frozen.
  The sheet keeps `rounded-2xl`, the sanctioned overlay exception. Actions to `btnPrimary`
  and `btnSecondary`: both are 42px today, under the 44px touch floor, and `min-h-12` fixes
  it. `data-cta="deep_scroll_close"` KEPT over the canonical spelling; record the mapping.
- `SpecialistWidget`: cadence, arm times, exit-intent and form-friction triggers frozen.
  `bg-red-500` and `bg-red-600` badge (`:514-516`) to `--brand-primary`; `:460` form-error red
  stays. **Its exit-intent arm is what makes the privacy policy exit-form sentence TRUE. Do
  not remove it.** Its auto-open is a non-human signal and is never a conversion metric.
- `ExitIntentModal.tsx`: **DELETE** (0 importers, verified) and tidy the three referring
  comments in the same commit.
- **DO NOT touch `data-cta-placement` or `data-cta-goal` on any of these.** Trap T22.

**Font-serif closure:** sweep the remaining uses in `AudienceStageLayout.tsx` (12),
`error.tsx`, `not-found.tsx` and `admin/analytics/login/page.tsx` (1 each). **These are pure
class deletions against a mapping that is already a documented no-op, so nothing renders
differently.** Then, and ONLY if the site-wide count outside `globals.css` reaches 0, delete
the transitional `--font-serif` mapping and its comment block (`globals.css:121-130`). Delete
`.hero-glass` (`globals.css:232`), zero consumers, verified.

**The audience template DESIGN port is deliberately NOT in this package.** See R-5.

Acceptance: `src/tests/intent-engine.test.ts` **green and unedited**, proven with
`git diff --stat` on that path returning empty. That is the proof the restyle stayed a
restyle. `lead-payload.test.ts` green. The site-wide `font-serif` count reported before and
after. Floors at or above 11 on each legal route. A full `data-cta` attribute diff of the
working tree showing zero changed ids, placements or goals.

**OFF LIMITS:** everything in WP1-WP4, `packages/`, `src/lib/intent/**`,
`src/tests/intent-engine.test.ts`, `src/tests/lead-payload.test.ts`.

---

## 4. DEPENDENCIES, SEQUENCING AND RISKS

```
WP0 (manager-direct, kit)  -- runs ALONE, first. Lands on 4 sites.
        |
        +-- WP1 contact + post-submit  --+
        +-- WP2 about + sra-compliance  -+
        +-- WP3 research + charts       -+-- all five PARALLEL, disjoint files
        +-- WP4 resources + statics     -+
        +-- WP5 legal + interruptive  ---+
                    |
                    +-- manager: serialised build, sweep, review, gap-fix, re-review, tag
```

- **WP0 is manager-direct** (the `packages/web-shared/` carve-out) and must land before the
  wave, or a builder who meets the header defect will patch it locally on one site.
- WP1-WP5 touch **disjoint file sets**, verified path by path. The only shared file is
  `src/app/globals.css`, owned exclusively by **WP5**; WP2 only reports on `.hero-glass`.
- `src/config/site.ts` belongs to WP5. WP1 reads `siteConfig` and must not edit it.
- Nothing in WP1-WP5 blocks anything else. This is a genuine five-way fan-out, which is what
  the owner asked for in phase 5.
- **Manager-direct beyond WP0:** every git operation from the monorepo ROOT, the single
  serialised build, any `link_baseline.json` restatement (see R-2), the owner bundle, and any
  per-citation factual back-patch.
- **Concurrency:** other sessions share this checkout. Stage explicit paths, `git add <paths>
  && git commit` as ONE command, and verify afterwards that the commit contains YOUR files.

### R-1. `SlimHero.eyebrow` is required and has no default

Adopting it puts a net-new string on `/thank-you`, `/book` and `/complete`.
**RECOMMENDATION: adopt and disclose.** All three are `robots index:false`, absent from the
sitemap and absent from `link_baseline.json`, so there is no SEO surface and no floor to
breach, and an eyebrow above an existing h1 is the clearest case of chrome arriving with a
standard component. The builder reports the three strings in full on the ADDED list and the
manager carries them in the phase bundle. If the owner declines, the revert is to keep the
local hero markup and restyle it in place, so instruct the builder to keep every existing h1
and standfirst byte-identical either way.

### R-2. Does anything need a dash-ceiling restatement?

Two families are at real risk of a rise: `/contact` (ceiling 0) if `CoverageCards` echoes
body text, and the eight resource routes (ceiling 0) if a table of contents echoes headings —
which is exactly what forced the phase 3 restatement.
**RECOMMENDATION: builders report the rendered dash count per touched route and STOP rather
than restate.** A restatement is a manager act, in the same commit, with the reason and the
deriving command written into `link_baseline.json.restatements`. There are exactly two
restatements in the file today (phases 3 and 4); the brief statement that phase 5 restated
routes is false.

### R-3. `ExampleFigureNote` over official statistics

Its literal default is "Example figures displayed", false over Companies House / SRA / ONS
data, and the fix is a `label` prop on a kit component shared across the estate.
**RECOMMENDATION: do not mount it on the research pages in this phase.** The alternative is a
manager-direct, estate-level kit edit, and generalist has already raised the same gate;
resolving it inside a Solicitors phase resolves it for everyone without anyone deciding to.
Ship research without the note and leave the gate open.

### R-4. The `data-cta` ids with no authored placement

`grep` finds SEVEN at source level, not four: `cta-section-primary`,
`cta-section-secondary`, `deep_scroll_close`, `deep_scroll_modal`, `next_step`,
`specialist_widget` and `see_result` (premium). `vw_cta_performance` therefore groups them on
the nearest heading text, including one machine-translated Italian heading, across about 563
events.
**RECOMMENDATION: OWNER ITEM, do not fix in this phase.** I cannot show it is safe. Adding a
placement rewrites a live grouping key, which is trap T22 and needs a baseline restatement in
the same commit, and this phase is already the largest in the port. It is also not urgent:
the grouping is wrong today and equally wrong next week, whereas a botched rewrite splits the
series permanently. Bundle it with the cutover, where the funnel is being re-baselined anyway.
Note also the T22 corollary: a fix scoped to the four LIVE ids leaves three source ids
unprotected.

### R-5. The four audience routes are unported and this is the last build phase

`/for-partners`, `/for-junior-solicitors`, `/for-locum-solicitors` and `/for-firm-buyers`
render one untouched template carrying 12 `font-serif` and 4 `rounded-2xl`.
**RECOMMENDATION: split it, and say so plainly to the owner.** WP5 sweeps the `font-serif`
classes, a no-op deletion with zero visual change that is required before the transitional
mapping can retire, but does NOT attempt the design port of the template. A four-route
template port is a sixth work package with no plan, no floors analysis and no reviewer budget
inside this phase. Record it in STATE.md as **the one family that ships pre-port**, and
either commission a phase 6b or accept it. Quietly omitting it is how `/for-firm-buyers`
slipped through phase 5.

### R-6. The build and the artefact

Phase 4 lost time to Next serving a stale prerender while `BUILD_ID` was newer than every
source file. **Prove the artefact contains a string changed in THIS build** before trusting
any sweep, and diff the sweep TOTALS as well as the per-route counts. Assert the served page
title before trusting any crawl; three wrong-site measurements have happened on this port and
two more in phase 5.

---

## 5. OWNER DECISIONS, costed, with my recommendation

### 1. `/resources`: build the index, or leave the 404

| | BUILD the index | LEAVE the 404 |
|---|---|---|
| Hard-rule cost | **Breaches it twice**: a NEW ROUTE and a NEW SITEMAP ENTRY. Plus an h1, a standfirst, an eyebrow, card labels and a section heading, all net-new copy. | **Zero.** Nothing changes. |
| Work | New `src/app/resources/page.tsx` derived from `publishedGuideTopics()` joined to `resourceForTopic()`; a `sitemap.ts` edit; a new `data-cta`; a new baseline row; a reviewer pass. About a day with review. | None. |
| Effect on readers | 8 indexable pages stop dead-ending on their primary back-link. | 8 pages keep a back-link that has 404ed since launch. |
| Effect on search | A new indexable hub; the DESIGN_DELTA already approves an in-flow `LeadCTAPanel` on it. | Unchanged. It is absent from the sitemap, so nothing is being de-indexed. |
| Third option | A `next.config.ts` redirect to `/solicitor-guides` (308). Still a redirect edit, still forbidden, and it leaves the footer without a hub. | |

**RECOMMENDATION: leave the 404 in phase 6 and raise it as a standalone, named owner
decision.** The hard rule is the dominant constraint of this port and it forbids new routes,
new sitemap entries and new copy; the index needs all three. It is not a regression the port
introduced: it has 404ed throughout, it is absent from `link_baseline.json`, and no floor
depends on it. Building it inside a design phase would be the port absorbing a product
decision, which is exactly what the owner told us not to do. The DELTA approval (appendix K,
"the one addition is an in-flow LeadCTAPanel on the net-new /resources index") predates the
hard rule and is superseded by it. Cost to build later is unchanged, and cheaper once the
design system is finished.

### 2. The cookie policy is wrong in both directions, and fixing it is a copy change

`:64` `_gid` is a Universal Analytics cookie on a GA4 property (UA retired 2024): a cookie we
declare and do not set. `_ga_N6ZPRB3DSQ`, which GA4 DOES set, is undeclared. `:71` "IP
addresses are anonymised" understates (GA4 records none) and "retained for 14 months" cannot
be verified from code. `:91` "takes effect immediately" overstates for GA: no
`gtag('consent','update')` is ever called, so the already-injected script persists for the
rest of that page load.
**RECOMMENDATION: the owner authorises these four edits as a COMPLIANCE CARVE-OUT from the
hard rule, shipping as their own commit, not inside a design phase.** A notice that names a
cookie we do not set is a defect whichever direction it errs in (T18). Note the mirror the
brief flags and it is correct: the same operation stripped FALSE Google Analytics claims from
generalist, but **GA is genuinely live here** (`layout.tsx:102`, `G-N6ZPRB3DSQ`), so the right
answer is to EXPAND the disclosure, not delete it.

### 3. 26.2%, on 4 pages, without its denominator

VERIFIED: 11 of 42 SRA-year closures to 30 September 2025, against 11 of 59 the year before.
The count did not rise; the share rose because total closures fell. Live at `about:50`,
`sra-compliance:117`, `src/app/page.tsx:219` and `:611`. `sra-compliance:117` also dates it
"in 2024-25", the wrong scope.
**RECOMMENDATION: owner item with the evidence, FROZEN in phase 6.** Correcting it is a copy
change on four pages, two of which are phase 5 surfaces. Land the `house_positions.md` entry
first so the figures trace, then edit in one commit across all four.

### 4. The privacy policy and terms describe surfaces this site does not have

No newsletter or subscribe form exists (`grep -rln "subscribe|newsletter|SignupForm" src` = 0)
and the guides are ungated, yet five privacy sections describe an email sign-up and a consent
lawful basis. `/terms` section 2 never discloses the referral model that the privacy policy
spells out.
**RECOMMENDATION: bundle with item 2 as the same compliance carve-out. FROZEN in phase 6.**

### 5. The returning bar has never rendered

It needs a topic from visit memory and `layout.tsx` does not pass `deriveTopic`. Enabling it
also changes what the sticky bar shows on topic-less routes.
**OWNER ITEM. WP5 does not plan the fix**, and its OFF LIMITS list says so.

### 6. Three `SlimHero` eyebrows on the post-submit routes

See R-1. Three new strings, reported in full, one-line revertible.

### 7. The four audience routes ship pre-port

See R-5, or a phase 6b is commissioned.

### 8. The `data-cta` placement rewrite

See R-4. Defer to the cutover re-baseline.

---

## 6. FALSE PREMISES IN THE BRIEF, collected

1. **`/contact` carries four turnaround promises, two in metadata.** All four were removed in
   phase 2 (`9b3c3dab`); zero remain, metadata included. The metadata-versus-body split the
   brief asks me to adjudicate no longer exists.
2. **`prose-solicitor` is an orphan CSS block.** The string exists nowhere in `Solicitors/`.
   The real orphan is `.hero-glass` (`globals.css:232`), plus the definition-less class name
   `display-serif` at `CTASection.tsx:37`, which dies with that component.
3. **Phases 3, 4 AND 5 restated routes in `link_baseline.json`.** Only phases 3 and 4 did.
4. **`StickyCTA` dismiss carries no `data-cta` id.** It has carried `sticky_cta_close` with
   `data-cta-placement="sticky"` since `021cc8cd`.
5. **Four live `data-cta` ids carry no authored placement.** Seven do at source level. Four
   may be the live subset, but a fix scoped to four leaves three wrong.
6. **Deleting `CTASection` needs a baseline restatement for its two ids.** It does not: both
   ids also render from inline copies on `/locations` and `/locations/[slug]`.
7. **The `/contact` F.7 plan depends on a local `MarketingSections` module.** No such module
   exists; phase 5 never built one. The F.7 marketing bands are dropped as a recorded
   departure rather than authored as new copy.
8. **The disposition removes 17 em-dashes across five phase-6 routes.** Cancelled by the hard
   rule; every one is visible published text, and the ceilings stay where they are.
9. **The kit chrome is imported by two sites.** It is now four: Dentists, generalist, Medical
   and Solicitors. Property is still not one of them. T23 must be re-derived, not quoted.
10. **`link_baseline.json.totalDashes` is 330.** It reads 447 after the two restatements;
    330 was the phase-0 capture.

---

## 7. DEFINITION OF DONE FOR PHASE 6

- Build exit 0 at **294** prerendered pages, unchanged.
- Sweep 273/274 clean, **0 link-floor breaches**, totals at or above 10,692 unique internal
  links and 1,507 `data-cta`, dashes at or below 447, with the TOTALS diffed as well as the
  per-route counts.
- `data-cta` TRIPLES (id, placement, goal) diffed against the pre-port render, not counted.
- Solicitors tsc clean; `npm test` green with the file and test counts quoted verbatim, and
  `intent-engine.test.ts` and `lead-payload.test.ts` both green and unedited.
- `packages/web-shared` tests green (WP0 touched the kit), and generalist, Medical and
  Dentists tsc clean.
- `python scripts/check_dependency_closure.py` OK across 19 sites.
- Three WCAG failures closed and re-measured; three charts reachable to assistive technology
  with the new guard proven to bite.
- Every ADDED string from every package listed in one place for owner fact-QA.
- STATE.md updated with: the false premises above, the audience-route decision, the owner
  bundle, and whatever is deliberately shipping unfixed.
