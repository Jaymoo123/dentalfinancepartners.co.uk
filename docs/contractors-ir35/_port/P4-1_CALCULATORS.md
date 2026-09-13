# P4-1 — Calculator surfaces, contractors-ir35

Package as briefed: the calculator index, the per-tool template, both embed
routes, and the presentational components under `src/components/calculators/`.
Compute layer (`src/lib/calculators/**`) NOT touched: no calculator output,
figure, rate or threshold changed in this package.

Date 2026-09-13. Nothing built, nothing pushed, nothing deployed. The serialised
build and the verification list below are the manager's.

---

## 1. Tool inventory, derived from this site's own registry

Derived, not assumed. Source of truth `src/lib/calculators/registry.ts` and
`src/lib/calculators/premium/registry.ts`.

### 1a. Routed tools: 10, all generic, no bespoke

`BESPOKE: Tool[] = []` (registry.ts:29). Every tool is generic and is served by
the single dynamic route `app/calculators/[slug]/page.tsx` with
`dynamicParams = false` and `generateStaticParams()` over `genericTools()`.
`grep -rhn "slug:" src/lib/calculators/tools/*.ts` returns exactly 10.

| # | slug | route | pre-port served |
|---|---|---|---|
| 1 | `outside-ir35-take-home-calculator` | `/calculators/[slug]` | 200, link floor 11 |
| 2 | `inside-ir35-take-home-calculator` | `/calculators/[slug]` | 200, link floor 11 |
| 3 | `umbrella-vs-limited-calculator` | `/calculators/[slug]` | 200, link floor 11 |
| 4 | `dividend-tax-calculator` | `/calculators/[slug]` | 200, link floor 11 |
| 5 | `corporation-tax-calculator` | `/calculators/[slug]` | 200, link floor 11 |
| 6 | `contractor-salary-dividend-calculator` | `/calculators/[slug]` | 200, link floor 11 |
| 7 | `umbrella-take-home-calculator` | `/calculators/[slug]` | 200, link floor 13 |
| 8 | `contractor-day-rate-calculator` | `/calculators/[slug]` | 200, link floor 11 |
| 9 | `managed-service-company-risk-checker` | `/calculators/[slug]` | 200, link floor 11 |
| 10 | `ir35-status-indicator` | `/calculators/[slug]` | 200, link floor 14 |

Link floors are `sweep_baseline.json` `links[...]`, SHA `18b4f25f`. Verified
live against the pre-port server on :3611 with the sweep's own counting rule
(unique `<a href="/...">`, no `#`/`?`, trailing slash stripped):
`/calculators` = 21, `/calculators/dividend-tax-calculator` = 11,
`/calculators/ir35-status-indicator` = 14. All three reproduce the baseline
exactly, so the instrument and the baseline agree.

### 1b. Island tools: 4 PREMIUM, NO routes

`PREMIUM_TOOLS` (premium/registry.ts:23) holds four configs:
`ir35-take-home-compare-premium`, `umbrella-vs-limited-premium`,
`salary-dividend-planner-premium`, `corporation-tax-planner-premium`.

`ls src/app/calculators` returns `[slug]` and `page.tsx` and nothing else, so
none of the four has a static page, and `generateStaticParams()` emits only the
10 generic slugs with `dynamicParams = false`. **Listing any of them on
`/calculators` emits a dead link that 404s.** They are client islands mounted in
blog posts by `PremiumUpgrade`.

The brief's derived fact is CORRECT on both halves for this site, and the guard
that pins it (`src/tests/calculator-crawl-path.test.ts`, final test) is intact.
The index carries a comment saying so, so the next agent does not "complete" it.

---

## 2. The embed routes: before and after

### 2a. The recorded defect, re-verified live

`P3_ROUTE_ANATOMIES.md` §B6 is right and `PHASE_PLAN.md` §C.2 is wrong: the
chrome was NOT absent. Re-verified on the current build (:3641, age probe
`curl -s <base>/ | grep -o -i "fixed[- ]fee" | wc -l` returns 0 on :3641 and 17
on :3611, so :3641 is post-port and :3611 is the pre-port production SHA; both
served `<title>Specialist Contractor Accountants | IR35 Advice UK</title>`):

```
/embed/corporation-tax-calculator on :3641   footer=1  "Skip to content"=2  data-cta="header_book"=1
```

### 2b. THE BRIEF IS WRONG ON THE FIX, and so is §B6's closing paragraph

Both name `src/app/embed/layout.tsx`. **That file cannot remove the chrome.**
`PageShell` is mounted in the ROOT layout (`src/app/layout.tsx`), and
`find src/app -name "layout.tsx"` returns that one file. A nested layout NESTS
INSIDE the root layout in the App Router; it does not replace it. An
`app/embed/layout.tsx` rendering `{children}` would render those children inside
the very header and footer it was meant to remove, and would have shipped as a
silent no-op that looked fixed in the diff.

Escaping a root layout needs multiple root layouts: delete `app/layout.tsx`,
re-parent all 29 routes into a route group, duplicate `<html>`/`<body>`. That is
a far larger and riskier change than the defect warrants, and the root layout is
outside this lease.

**What was built instead**, using the mechanism the site already uses to opt out
of `/embed` (`StickyCTA.tsx:103`, `SpecialistWidget.tsx:263`,
`IntentProvider.tsx:35`):

- NEW `src/components/layout/ChromeGate.tsx`, 10 lines, `"use client"`. Renders
  a `bare` tree instead of the chrome when `usePathname()` starts with
  `/embed/`. Header and footer are passed in as already-constructed nodes, so
  they stay server-rendered; only the choice is client-side.
- `src/components/layout/PageShell.tsx`: wrapped its existing tree in
  `<ChromeGate bare={children}>`. Two lines plus an import and a docstring.
  Nothing inside the shell changed.

**LEASE EXCURSION, flagged for the manager.** `PageShell.tsx` is not in the
P4-1 lease (it closed in P1-4) and neither is a new file under
`src/components/layout/`. The brief ordered the embed chrome removed and named a
file that provably cannot do it; per the pushback clause I trusted the source
and built the smallest thing that actually works. If the manager would rather
this landed in P6-3, revert these two files and the rest of the package stands
on its own.

### 2c. SCOPE: `/embed/<slug>` only, NOT `/embed`

The gate is `pathname.startsWith("/embed/")`, not `"/embed"`. The brief's
`app/embed/layout.tsx` would have stripped both. `/embed` is a real,
indexable page of ours (no robots meta; confirmed absent from `sitemap.xml`, so
outside the swept set) whose whole job is to emit the ten `/calculators/<slug>`
preview links to partners. It needs its navigation and its footer legal links.
Only the documents that render inside a third party's iframe lose the chrome.

### 2d. Link and chrome counts per embed route

Counted with the sweep's own rule (unique same-site `<a href>`). Raw `href="/`
counts in brackets, to line up with §B6's advisory numbers.

| Route | Server | uniq internal links | chrome | data-cta |
|---|---|---|---|---|
| `/embed` | :3611 pre-port | 20 (31 raw) | header, footer, skip link | none |
| `/embed` | :3641 current | 23 (36 raw) | header, footer, skip link | `header_book` |
| `/embed` | **after P4-1** | **23, UNCHANGED (UNVERIFIED)** | unchanged, deliberately | `header_book` |
| `/embed/<slug>` | :3611 pre-port | 10 (19 raw) | header, footer, skip link | none |
| `/embed/<slug>` | :3641 current | 13 (24 raw) | header, footer, skip link | `header_book` |
| `/embed/<slug>` | **after P4-1** | **0 (UNVERIFIED)** | NONE | NONE |

The 13 links removed from every partner iframe: `/`, `/about`, `/blog`, `/book`,
`/calculators`, `/contact`, `/cookie-policy`, `/for`, `/ir35-status`,
`/locations`, `/privacy-policy`, `/services`, `/terms`.

The after-state is 0 because the page's only anchor, the attribution link, is
ABSOLUTE (`${siteConfig.url}/calculators/<slug>?utm_source=partner-embed...`)
and the sweep counts relative hrefs only. It is still a real `<a>` and it still
carries the partner back to our own page.

**Consequences, stated explicitly as the brief requires.**

1. **No link-floor breach.** `/embed` and `/embed/<slug>` are both ABSENT from
   `sweep_baseline.json`, and `/embed/<slug>` is `robots: noindex, nofollow`.
   The ten preview links into `/calculators/<slug>` all still exist on `/embed`,
   which is the route that actually emits them.
2. **It DOES change what partners' pages render.** Every live embed on the
   internet loses our header, our footer, our skip link, our lead CTA and 13
   internal links, and keeps the calculator, the "Powered by" attribution and
   the resize script. That is a visible change in third-party pages the moment
   this deploys, and it is the change the route exists to have.
3. **`/embed/<slug>` loses its one `data-cta`**, `header_book`, which only
   existed because the chrome leaked in. The route is absent from the CTA
   baseline, so no funnel row that anything counts on disappears; a
   `header_book` click from inside a partner iframe was never a real signal.

### 2e. Canonical points away, as it should

`/embed/<slug>` keeps `robots: { index: false, follow: false }` and
`alternates.canonical` at `${siteConfig.url}/calculators/${tool.slug}`. Not
touched, verified by reading the file after the edit. This is the legitimate
point-away case and it survives.

### 2f. Carve-outs verified byte-unchanged

`RESIZE_SNIPPET` (the `ir35-embed-height` message name and the
`iframe[src*="<domain>/embed/"]` selector), `iframeSnippet()`, `c.embedHeight`
from the registry, the attribution condition copy, the ten
`/calculators/<slug>` preview links, the `utm_source=embed-gallery` UTMs on the
partnership CTA, the `partner-embed`/`iframe`/`<slug>` UTMs on the attribution
link, `target="_blank" rel="noopener"`, `dynamicParams = false`,
`generateStaticParams`, `variant="embed"`, `EmbedAutoResize`, and
`noTrackPrefixes: ["/admin", "/embed"]` in the root layout. None edited.

---

## 3. What changed on each surface

### 3a. `/calculators`

- Hero: `border-b border-neutral-200 bg-neutral-900 py-14 sm:py-20` becomes
  `bg-neutral-900 py-12 sm:py-16 lg:py-20`, matching the ported `/locations`,
  `/glossary` and `/research` heroes. Hand-rolled mono eyebrow. Standfirst moves
  `max-w-2xl` to `max-w-3xl` (the one narrow measure that stays).
- **NEW hero CTA** `href="#book"`, `data-cta="hero_book"` /
  `data-cta-placement="hero"` / `data-cta-goal="form"`. §0.5: a page a reader
  can scroll to the bottom of without meeting an ask is not finished.
- Cards: `rounded-2xl border-2 border-neutral-200` becomes `rounded-xl ... ring-1
  ring-neutral-200/70` with `hover:ring-primary-600/40` and a focus-visible
  outline. `text-cyan-700`/`text-cyan-800` become `text-primary-600`/`700`
  (identical hexes through the P1-7 ramp, see §4).
- Category headings adopt the `/locations` recipe (`text-2xl font-bold` with a
  `border-b` rule) instead of `text-xl sm:text-2xl`.
- The `/embed` link stops being `text-neutral-500` centred fine print and
  becomes a real sentence with a `primary-600` underlined link. Link preserved.
- Closing ask: the hand-rolled `bg-neutral-900` box with a `/contact` button is
  replaced by `LeadCTAPanel` (`contained`, `ground="slate"`, `eyebrow="Free
  call"`, `formTitle="Book your free call"`, `proofPoints={[]}`) inside
  `<div id="book" className="scroll-mt-24">`. Its published copy moves into the
  panel's `title` and `description`; the `/contact` link is preserved in the
  footnote, so nothing drops out of the link floor.
- Section rhythm: hero dark, tools white, panel slate-50, footer dark. Light
  before the dark footer, nothing dark touching dark.

### 3b. `/calculators/[slug]`

- Same hero treatment and the same new `hero_book` CTA.
- **Body clamps removed**, per §6a (standing owner rule, 2026-08-23): the
  `max-w-5xl` around the tool and the `max-w-3xl` around the explainer, related
  links, FAQ and the old CTA box are gone. `siteContainerLg` is the measure. The
  one clamp kept is on the explainer PROSE column (`max-w-3xl` on the paragraph
  stack under a full-width h2), which is the standfirst pattern, not a body box.
- Tool section ground `bg-[#fafaf7]` becomes `bg-white`. DESIGN_DELTA §3 N2
  (move the body ground off cream, reserve cream for hero surfaces) is still
  PENDING as an owner question, so this is a per-section choice matching the
  already-ported `/locations`, `/glossary`, `/research` and `/resources/[topic]`,
  not a change to the `<body>` ground.
- Related reading: bullet list becomes a card grid of real `<a href>` elements.
  Every link preserved, which is what the floor counts.
- FAQ: h3 + p pairs kept and restyled as ring cards. **`FaqSection` NOT
  adopted**: it is a Radix accordion with no `forceMount`, so closed answers
  leave the server HTML while `buildFaqJsonLd` still asserts them. Banned on
  this site by written decision. The visible copy and the JSON-LD read the same
  `tool.faqs` array.
- Closing ask: the `rounded-2xl border-2 border-cyan-700/20 bg-gradient-to-br
  from-cyan-50` box with a bare `LeadForm` becomes `LeadCTAPanel` (`contained`,
  `ground="white"` so it alternates with the slate-50 section above). The form
  keeps `redirectOnSuccess={false}` and `submitLabel="Request a review"`.
- **Anchor renamed `#get-expert-help` to `#book`.** Checked first:
  `grep -rn "get-expert-help" contractors-ir35 packages` returned that one page
  and nothing else, so no in-repo link, no blog post and no shared component
  pointed at it. The brief's `<div id="book" className="scroll-mt-24">` is now
  the one anchor name across glossary, locations, research and the calculators.
- Section rhythm: hero dark, tool white, explainer/FAQ slate-50, panel white,
  footer dark.

### 3c. `/embed`

Restyled to its recorded §B5 anatomy, chrome deliberately kept (§2c).

- Hero band and eyebrow as above. **No hero CTA**, which is §B5's documented
  exception: this reader is a partner, not a lead.
- "How to embed" loses its `max-w-3xl` clamp and becomes two ring cards with
  mono "Step 1"/"Step 2" labels. The step copy is preserved in substance; the
  literal "1." / "2." prefixes are now the step labels.
- Tool cards: `rounded-2xl border-2` becomes `rounded-xl ... ring-1
  ring-neutral-200/70`. The `bg-[#fafaf7]` literal on that band becomes
  `bg-slate-50`, the standard alternate ground (§B5 flags the literal).
- Partnership panel: `mx-auto max-w-3xl bg-neutral-900 p-8` becomes a
  full-container `rounded-xl bg-slate-900 ... ring-1 ring-slate-800` card on a
  white section, which is the `LeadCTAPanel` recipe without the component. The
  component is not used because this ask has no form, and adding a lead form
  would change what the page asks for. Copy, destination and UTMs unchanged.
- `EmbedSnippet` untouched, so the copy affordance, the monospace and the
  snippet's own overflow behaviour are unchanged.

### 3d. `src/components/calculators/`

- `CalcResultCta.tsx`: `rounded-2xl border-l-4 border-cyan-700` becomes
  `rounded-xl border-l-4 border-primary-600 ... ring-1 ring-neutral-200/70`.
  Same hex, one radius, hairline ring. Copy, `formId`, `messagePrefix`,
  `submitLabel` unchanged.
- `CalculatorClient.tsx`: NOT edited. It is a 32-line RSC boundary wrapper with
  no markup of its own; the shared `Calculator` renders the tool and is in
  `packages/web-shared`, which this lease may not touch (trap 12). See §6.
- `premium/*`: NOT edited. Those are P4-3 and P4-4 in `PHASE_PLAN.md` §H and
  belong to parallel packages; the brief's lease and the plan's lease disagree
  there and I took the narrower reading rather than race another agent.

---

## 4. Contrast, hand-measured

WCAG relative luminance, sRGB to linear per channel, `(L1+0.05)/(L2+0.05)`.
The script self-tests against the required anchors and asserts on mismatch:
slate-500 `#64748b` on white = **4.76**, slate-400 `#94a3b8` on white = **2.56**.
Both reproduced exactly before any row below was trusted. It also reproduces the
brief's two brand anchors: cyan-700 `#0e7490` = **5.36** and cyan-600 `#0891b2`
= **3.68** on white.

**The "bind one step darker" rule is already baked into this site's ramp.**
`globals.css:141-151` (P1-7) shifts the primary scale so `--color-primary-600`
IS cyan-700 `#0e7490` and `--color-primary-700` IS cyan-800 `#155e75`. So
`text-primary-600` measures 5.36 on white, not 3.68. cyan-600 `#0891b2` is
`--color-primary-500` here and is not used as text or as a ground anywhere in
this package. No 3.68 failure is emitted by these files.

| Pair | Role | Ratio | Floor | Verdict |
|---|---|---|---|---|
| primary-400 `#22d3ee` on neutral-900 `#171717` | hero eyebrow | 9.92 | 4.5 | PASS |
| white on neutral-900 | hero h1 | 17.93 | 4.5 | PASS |
| neutral-300 `#d4d4d4` on neutral-900 | hero standfirst | 12.09 | 4.5 | PASS |
| neutral-400 `#a3a3a3` on neutral-900 | `/embed` attribution condition | 7.11 | 4.5 | PASS |
| white on primary-600 `#0e7490` | `btnPrimary` label | 5.36 | 4.5 | PASS |
| primary-600 `#0e7490` on white | card link, "Open calculator" | 5.36 | 4.5 | PASS |
| primary-700 `#155e75` on white | link hover | 7.27 | 4.5 | PASS |
| neutral-900 on white | headings | 17.93 | 4.5 | PASS |
| neutral-600 `#525252` on white | card body, fine print | 7.81 | 4.5 | PASS |
| primary-600 on slate-50 `#f8fafc` | link on the alternate band | 5.12 | 4.5 | PASS |
| neutral-600 on slate-50 | explainer body | 7.47 | 4.5 | PASS |
| neutral-900 on slate-50 | explainer headings | 17.13 | 4.5 | PASS |
| primary-600 on neutral-50 `#fafafa` | `CalcResultCta` accent, card hover | 5.13 | 4.5 | PASS |
| slate-600 `#475569` on slate-100 `#f1f5f9` | `Eyebrow` + footnote inside the contained panel | 6.92 | 4.5 | PASS |
| slate-900 `#0f172a` on slate-100 | panel title | 16.30 | 4.5 | PASS |
| primary-400 on slate-900 | `/embed` partnership eyebrow | 9.88 | 4.5 | PASS |
| neutral-200 `#e5e5e5` on slate-900 | `/embed` partnership body | 14.17 | 4.5 | PASS |
| neutral-500 `#737373` on white | REMOVED (was the `/embed` index link) | 4.74 | 4.5 | replaced by neutral-600 |

Lowest ratio emitted by this package: **5.12**. Nothing on a 600-step recipe
that is really cyan-600, nothing at 3.68, nothing on slate-400 or neutral-400 on
a light ground.

`.eyebrow` was NOT used and `globals.css` was NOT edited. That rule is UNLAYERED
at `globals.css:211` and pins `color: var(--accent)`, which no utility can
override, so every eyebrow in this package is hand-rolled from
`font-mono text-xs font-medium uppercase tracking-[0.1em]` plus an explicit
colour, the same way `/locations` does it. `LeadCTAPanel`'s own eyebrow is the
shared `Eyebrow` primitive, which is utility-coloured (slate-600 / slate-300)
and does not touch that class.

`PanelBody` renders `footnote` INSIDE a `<p>`. Both footnotes passed here are a
fragment of inline text plus a `<Link>`, no `<div>` and no block element, so
there is no paragraph-in-paragraph hydration mismatch.

---

## 5. `data-cta` triples, before and after

Attribute NAMES preserved exactly: `data-cta`, `data-cta-placement`,
`data-cta-goal`. Nothing was renamed, moved or dropped. "Before" is the current
build (:3641); the pre-port baseline (:3611) had only `specialist_widget`,
because `header_book` arrived with the phase 1 header.

| Route | Before (:3641) | After |
|---|---|---|
| `/calculators` | `header_book` (chrome), `specialist_widget` | `header_book`, **`hero_book` / `hero` / `form` (NEW)**, `specialist_widget` |
| `/calculators/<slug>` x10 | `header_book`, `specialist_widget` | `header_book`, **`hero_book` / `hero` / `form` (NEW)**, `specialist_widget` |
| `/embed` | `header_book` | `header_book` (unchanged) |
| `/embed/<slug>` x10 | `header_book` (chrome leak) | **NONE** (chrome removed, §2d note 3) |

`hero_book` / `hero` / `form` is the name already emitted by the ported
`/glossary`, `/locations` and `/research` heroes. One name per thing.

The `LeadCTAPanel` submit button carries no `data-cta`, matching every other
ported call site on this site. The `/embed` partnership button carries no
`data-cta` either; it did not before this package and I did not add one, because
a new analytics row is a new thing to explain. **FLAGGED for the owner, not
fixed**: that CTA is the one real ask on `/embed` and it is invisible in
`vw_cta_performance`.

---

## 6. Flagged, not fixed

1. **`PHASE_PLAN.md` §C.2's premise on `/embed/<slug>` is wrong** (chrome was
   present) and **both the brief and `P3_ROUTE_ANATOMIES.md` §B6 name a fix file
   that cannot work** (`app/embed/layout.tsx` nests inside the root layout).
   §2b. §B6's "The lazy fix is one file, `src/app/embed/layout.tsx`" should be
   corrected in place before P6-3 reads it and ships a no-op.
2. **Lease excursion**: `src/components/layout/PageShell.tsx` edited and
   `src/components/layout/ChromeGate.tsx` created. §2b.
3. **Guard-test harness change**: `src/tests/calculator-crawl-path.test.ts` now
   mocks `next/navigation` (4 lines). The index's closing ask is now the real
   `LeadCTAPanel` carrying the real `LeadForm`, and `LeadForm` calls
   `useRouter()`, which throws `invariant expected app router to be mounted`
   under `renderToStaticMarkup`. All five assertions are unchanged and all five
   still pass, including the premium-tools one. No invariant was weakened.
4. **`packages/web-shared` NOT edited** (trap 12, 18 sites). Two things live
   there that this package would otherwise have touched: the shared `Calculator`
   renderer behind `CalculatorClient`, and `LeadCTAPanel`/`Eyebrow`. Both were
   adopted as-is.
5. **`premium/*` and `CalculatorClient.tsx` left alone**, because
   `PHASE_PLAN.md` §H leases them to P4-2, P4-3 and P4-4 in the same wave. The
   brief's lease is wider than the plan's; I took the narrower reading. If those
   packages are not running, they are still owed.
6. **`/embed` partnership CTA has no `data-cta`.** §5.
7. **DESIGN_DELTA §3 N2 (body ground) is still PENDING.** This package chose
   per-section grounds matching the already-ported routes and did not touch the
   `<body>` ground.
8. **No calculator output, figure, rate or threshold was read or changed.**
   `src/lib/calculators/**` untouched; `tax2026.test.ts` (13 tests) and
   `tools.test.ts` still pass unchanged. Nothing looked wrong.

---

## 7. Verification list for the serialised build

Run after `next build` + `next start` on a port of your choosing. `<BASE>` is
that port. Every expected result below is stated so a mismatch is a failure, not
a judgement call.

**Step 0, prove which server you are on.** Anything else is unverified.

```
curl -s <BASE>/ | grep -o "<title>[^<]*</title>"
   -> <title>Specialist Contractor Accountants | IR35 Advice UK</title>
curl -s <BASE>/ | grep -o -i "fixed[- ]fee" | wc -l
   -> 0   (17 means you are on the pre-port SHA, :3611)
```

**Already run and PASSING before handover** (no build needed):

```
cd contractors-ir35/web && npx tsc --noEmit            -> clean, no output
cd contractors-ir35/web && npx vitest run              -> 21 files, 448 tests, all pass
cd contractors-ir35/web && npx vitest run src/tests/calculator-crawl-path.test.ts
                                                       -> 5 passed  (incl. the premium guard)
npx eslint src/app/calculators/** src/app/embed/** \
  src/components/layout/ChromeGate.tsx src/components/layout/PageShell.tsx \
  src/components/calculators/CalcResultCta.tsx src/tests/calculator-crawl-path.test.ts
                                                       -> clean, no output
```

**Build-gated. All UNVERIFIED until the manager's build runs.**

| # | URL | Command | Expected |
|---|---|---|---|
| V1 | `/calculators` | `curl -s -o /dev/null -w "%{http_code}" <BASE>/calculators` | `200` |
| V2 | `/calculators` | `curl -s <BASE>/calculators \| grep -o 'href="/calculators/[a-z0-9-]*"' \| sort -u \| wc -l` | `10` (the ten routed tools, no more) |
| V3 | `/calculators` | `curl -s <BASE>/calculators \| grep -c -E "premium"` | `0` (no premium island linked) |
| V4 | `/calculators` | `node docs/_engines/instruments/sweep.mjs`-style count: unique `<a href="/...">` | `>= 21` (baseline floor) |
| V5 | `/calculators` | `curl -s <BASE>/calculators \| grep -o 'data-cta="[^"]*"' \| sort \| uniq -c` | `header_book` 1, `hero_book` 1, `specialist_widget` 1 |
| V6 | `/calculators` | `curl -s <BASE>/calculators \| grep -c 'id="book"'` | `1` |
| V7 | `/calculators` | `curl -s <BASE>/calculators \| grep -c 'rounded-2xl\|border-2 border-neutral'` | `0` |
| V8 | each of the 10 `/calculators/<slug>` | `curl -s -o /dev/null -w "%{http_code}"` | `200` on all ten |
| V9 | `/calculators/dividend-tax-calculator` | unique `<a href="/...">` | `>= 11` |
| V10 | `/calculators/ir35-status-indicator` | unique `<a href="/...">` | `>= 14` |
| V11 | `/calculators/umbrella-take-home-calculator` | unique `<a href="/...">` | `>= 13` |
| V12 | any `/calculators/<slug>` | `grep -o 'data-cta="[^"]*"' \| sort \| uniq -c` | `header_book` 1, `hero_book` 1, `specialist_widget` 1 |
| V13 | any `/calculators/<slug>` | `grep -c 'id="book"'` | `1` |
| V14 | any `/calculators/<slug>` | `grep -c "max-w-5xl"` | `0` |
| V15 | any `/calculators/<slug>` with FAQs | every `f.question` and `f.answer` appears in the raw HTML AND in the `FAQPage` JSON-LD | both present, same strings (no accordion, nothing hidden) |
| V16 | **`/embed/corporation-tax-calculator`** | `curl -s <BASE>/embed/corporation-tax-calculator \| grep -o 'href="/[^"#?]*"' \| sort -u \| wc -l` | **`0`** (was 13 unique / 24 raw) |
| V17 | `/embed/corporation-tax-calculator` | `grep -c "<footer"` | `0` (was 1) |
| V18 | `/embed/corporation-tax-calculator` | `grep -o "Skip to content" \| wc -l` | `0` (was 2) |
| V19 | `/embed/corporation-tax-calculator` | `grep -o 'data-cta="[^"]*"' \| wc -l` | `0` (was 1, `header_book`) |
| V20 | `/embed/corporation-tax-calculator` | `grep -o '<link rel="canonical"[^>]*>'` | `href=".../calculators/corporation-tax-calculator"` — points AWAY, at the twin |
| V21 | `/embed/corporation-tax-calculator` | `grep -o '<meta name="robots"[^>]*>'` | contains `noindex` and `nofollow` |
| V22 | `/embed/corporation-tax-calculator` | `grep -c 'utm_source=partner-embed'` | `1` (attribution link and its UTMs intact) |
| V23 | `/embed/corporation-tax-calculator` | `grep -c 'ir35-embed-height'` | `>= 1` (`EmbedAutoResize` still mounted) |
| V24 | all 10 `/embed/<slug>` | `curl -s -o /dev/null -w "%{http_code}"` | `200` on all ten |
| V25 | **`/embed`** | unique `<a href="/...">` | **`>= 23`, i.e. UNCHANGED** — the chrome must still be there |
| V26 | `/embed` | `grep -c "<footer"` | `1` (chrome kept on purpose) |
| V27 | `/embed` | `grep -o 'href="/calculators/[a-z0-9-]*"' \| sort -u \| wc -l` | `10` |
| V28 | `/embed` | `grep -c 'ir35-embed-height'` | `>= 1` (resize snippet byte-intact) |
| V29 | `/embed` | `grep -c 'utm_source=embed-gallery'` | `1` |
| V30 | `/embed` | `grep -c "bg-\[#fafaf7\]"` | `0` |
| V31 | all 4 routes | `grep -o "—\|–"` on rendered body text | `0` |
| V32 | any route | `grep -ni "fixed fee\|fixed-fee\|24 hour\|24-hour\|chartered\|ICAEW\|ACCA"` | `0` |
| V33 | full sweep | `node docs/_engines/instruments/sweep.mjs --site=contractors-ir35 --base=<BASE> --out=tmp/sweep_p4_1.json` | no link-floor decrease on any `/calculators*` row |

V16 to V19 are the four that prove the embed fix landed. If V16 returns 13
rather than 0, `ChromeGate` did not engage and the fix is a no-op: check that
`usePathname()` is resolving during prerender for the statically generated
`/embed/<slug>` routes, and that `PageShell` still wraps its tree in it.

V25 and V26 are the guard in the other direction: if they drop, the gate is
matching `/embed` as well as `/embed/<slug>` and the partner gallery has lost
its navigation.
