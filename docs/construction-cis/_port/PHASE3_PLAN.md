# TRADE DESIGN PORT, PHASE 3 PLAN: TRADE PAGES, LOCATIONS, GLOSSARY, RESOURCES

Site: `construction-cis/web` (Trade Tax Specialists). Written 2026-09-11, planner pass, no code
written, no file edited outside this one. Four work packages for parallel builders, **all four
concurrent** (disjoint file sets, see section 5).

**Scope, counted at source, not read off a prior doc.**

| Family | Routes | Template | Data |
|---|---|---|---|
| `/for` index | 1 | `src/app/for/page.tsx` (118 lines) | none |
| `/for/[slug]` | **45** | `src/app/for/[slug]/page.tsx` (279 lines) | `src/data/trade-types.ts` (3,305 lines) |
| `/locations` index | 1 | `src/app/locations/page.tsx` (198 lines) | none |
| `/locations/[slug]` | **25** | `src/app/locations/[slug]/page.tsx` (338 lines) | `src/app/locations/[slug]/data.ts` (1,943 lines) |
| `/glossary` index | 1 | `src/app/glossary/page.tsx` (132 lines) | none |
| `/glossary/[slug]` | **50** | `src/app/glossary/[slug]/page.tsx` (148 lines) | `src/app/glossary/[slug]/data.ts` (959 lines) |
| `/resources/[topic]` | **3** | `src/app/resources/[topic]/page.tsx` (120 lines) | `content/resources/*.md` |

**126 of the baseline's 246 routes.** Derivations:
`grep -oE 'slug: *"[^"]+"' src/data/trade-types.ts | sort -u | wc -l` = **45** (`grep -c 'slug:'`
gives 47: two lines are `slug: string` type annotations. The brief's suggested
`grep -c '^    slug:'` happens to give 45 here, but only by accident of indentation; use the
`sort -u` form). `grep -oE '^    slug: "' glossary/[slug]/data.ts | wc -l` = **50**.
`grep -c '"slug":' locations/[slug]/data.ts` = **25** (note locations data is JSON-quoted keys, so
the unquoted `slug:` grep that works on the other two files returns **0** here; the Phase 2
planner's class of trap, and it would read as "the file is empty"). Resources: **6** registry
topics, **4** guide entries across **3** distinct guide slugs, **3** `.md` files on disk, and
`generateStaticParams` is `publishedGuideTopicsWithFile()` = enabled AND file present, so **3**
routes, all HTTP 200. The brief's "5 registered topics" is wrong; it is 6.

**Binding spec.** `docs/_engines/PROPERTY_STANDARD_ROLLOUT.md` §A.1-A.8, §D.1/D.3, §F.1, §F.3, §F.4,
§I; `docs/property/DESIGN_SYSTEM.md` §0, §2, §4, §4a, §4e, §5, §6a, §7, §9; `DESIGN_DELTA.md` §1, §2,
§3, §3a, §4; `_port/DISPOSITION_SLICE2.md` §7-§14 (the starting spec, corrected in section 0 below);
`_port/PHASE2_PLAN.md` §1d and §4 (precedents this plan inherits); `LIVE_DEFECTS.md` TD-01, TD-08,
TD-09, TD-22, TD-27, TD-34; **`_port/GROUNDS_BASELINE.md`** (the authoritative per-route §9
measurement, 246 routes, written in parallel with this plan); `link_baseline.json`,
`cta_baseline.json`, `sweep_baseline.json`; playbook traps T8, T12, T14, T17, T22, T23, T24, T26,
T30.

**Method.** Every number below was measured against the running post-Phase-2 production server at
`http://localhost:3257`, with `<title>` asserted on `/` as
`CIS Accountants &amp; Construction Tax Specialists | UK` before anything was trusted. Grounds
measured with the committed instrument, `browser_check.mjs --grounds`, on real slugs. Link counts
re-derived with the sweep instrument's own metric (unique `<a href="/...">`, hash and query
stripped, `_next` assets excluded). CTA triples re-derived from `cta_baseline.json`'s `per_route`
map. Every file path named was opened. No build, no test, no dev server, no git write.

---

## 0. CORRECTIONS TO THE BRIEF AND TO DISPOSITION_SLICE2

Read these first. Six of them change what a builder is told to do, and the first is the class of
defect the brief asked me to look for: it is sitting inside the acceptance test the brief names.

| # | Claim | Status | Correction |
|---|---|---|---|
| 1 | "The committed check is `browser_check.mjs --grounds`; build it into the plan as an acceptance test" | **The instrument is BROKEN, twice, in exactly the way DESIGN_DELTA §3a says it was written to prevent** | **D1, it cannot read `oklch()`.** `browser_check.mjs:337-345` derives luminance with a regex (`/\d+(\.\d+)?/g`) over the computed `backgroundColor` and divides the first three captures by 255, an sRGB assumption. Tailwind v4 emits `oklch()`, which `getComputedStyle` returns verbatim, so `oklch(0.985 0.001 106.423)` (stone-50, true luminance 0.956) scores **0.0106** and is classified **dark**. Measured this run: `/glossary` and `/locations` both report "dark band touches dark footer" with `last=oklch(0.985 0.001 106.423)`. Two false positives on a light tail. The contrast path in the same file resolves colour by PAINTING a probe (`:125` onward) and is correct; the grounds path does not use it. **D2, `bandsOf` does not see `<article>`.** `:325` selects `:scope > section, :scope > div[class*='bg-']` under `<main>`, so a page whose body is an `<article>` reports **one** band, the hero. **Consequence: neither the `darkOnDark` boolean nor the `bands` array can be the acceptance test on its own.** See section 3. |
| 2 | "79 routes end dark; of those 50 are `/glossary` and 25 are `/locations`, so Phase 3 closes 75 of 79" | **FALSE. Phase 3 closes 25, not 75, and the 79 itself is wrong** | The `/glossary/[slug]` 50 is an artefact of D2. Verified independently on the served HTML: `/glossary/cis` renders `<main id="main">` containing exactly `<section class="bg-neutral-900 py-12 sm:py-16">` (the hero) then `<article class="bg-white py-12 sm:py-16">` (the whole rest of the page) then a nested `<section>` inside it. The probe matches only the hero, so `bands.length == 1`, `lastBand` is the navy hero three screens up, and the route is scored dark-on-dark **while the band actually touching the footer is white**. `/glossary/[slug]` is NOT in breach. `/locations/[slug]` IS: its closing `<section class="bg-neutral-900 py-12 sm:py-16 lg:py-20">` at `:275` is a direct child of `<main>` and genuinely is the last band, on all 25. **Real total: 29, not 79** (locations 25 + the four standalone routes `/cis-refund`, `/gross-payment-status`, `/cis-invoice-template`, `/cis-payment-deduction-statement-template`, which are phases 5 and 6). Phase 3 closes **25 of 29**. This is corroborated independently, and at full 246-route coverage, by `_port/GROUNDS_BASELINE.md`, written in parallel by the measuring agent; the two derivations were made separately and agree on both instrument defects and on 29. |
| 3 | `DISPOSITION_SLICE2.md` 7b.7, 8b.5, 9b.8: "hand-rolled `<details>` → kit `FaqSection`" | **FALSE for this site, and Phase 2 already established why** | `PHASE2_PLAN.md` §1d: the kit `FaqSection` renders `<p>{faq.answer}</p>` (escapes HTML) and wraps answers in Radix `AccordionContent` with **no `forceMount`** (`packages/web-shared/design/primitives/accordion.tsx`, `grep -c forceMount` = **0**), so closed answers leave the server HTML. Re-verified for Phase 3 scope: `/for/[slug]` carries **124** FAQ pairs and `/locations/[slug]` **138**, all in server HTML today as `<details>`/`<summary>`, and **0 of the 262 answers contain HTML**, so the escaping defect does not bite here but the crawlability one does. **Adopting the kit component would remove 262 answer bodies from the server HTML of 70 pages.** Verdict: keep the native `<details>`, restyle only. Same verdict Phase 2 reached, for the same reason. |
| 4 | `DISPOSITION_SLICE2.md` §13 WP-C/WP-E: "Property source: `Property/web/src/app/section-24/page.tsx`", "`Property/web/src/app/locations/page.tsx`" | Half right | `Property/web/src/app/locations/page.tsx` (90 lines) and `locations/[slug]/page.tsx` (1,006 lines) exist and are the right reference for WP-C2. **Property has no `/for` route and no `/glossary` route at all** (`ls Property/web/src/app` confirms), so WP-C1 and WP-C3 have no direct sibling. Their reference is `section-24/page.tsx` (1,113 lines, the topic-pillar anatomy) plus Property's locations pages for the hub/tail shape. Say so rather than let a builder hunt for a file that is not there. |
| 5 | Brief: "Property's canonical tail is panel then FAQ then footer, i.e. a light band before the navy" | **Imprecise, and copying it literally would be wrong here** | Property's locations index and its `/locations/[slug]` both end on `LeadCTAPanel contained` and **no FAQ follows** (`locations/page.tsx:77-87`, `locations/[slug]/page.tsx:991-1002`). `contained` renders `<section class="py-12 ... bg-slate-50">` (`LeadCTAPanel.tsx:69`), which IS the light band. The panel-then-FAQ order is the ARTICLE tail. Either shape closes §3a; the rule that matters is "the last opaque band under `<main>` is light". |
| 6 | `DISPOSITION_SLICE2.md` 8b.9 / 9b.8 / 7b.9: copy Property's `LeadCTAPanel` | **A live trap: Property's panel copy is BANNED on this site** | Property's `proofPoints` on both panels read `"Fixed fees, quoted upfront"` and `"24-hour response"`. Those are **TD-18** and **TD-13** verbatim. Phase 2 closed 23 turnaround-promise breaches across 19 files; copying Property's panel props into 70+ Trade routes would reintroduce the exact claim, at the largest scale it has ever had on this site, inside the package that is supposed to be a restyle. **Copy the component, never the props.** |
| 7 | `DISPOSITION_SLICE2.md` §0.6 / brief: `/for/[slug]` renders a `LeadForm` nothing points at | **STILL TRUE after Phase 2** | Re-verified in the current tree: `for/[slug]/page.tsx:64` hero primary → `/contact`, `:68` secondary → `/cis-refund`, `grep -n '#book\|id="book"'` = **0 hits**, `LeadForm` at `:237`, FAQ `<details>` at `:177`. The form is below the FAQ and no anchor reaches it. Phase 2 did not touch this file. |
| 8 | `DISPOSITION_SLICE2.md` §11 link floors | **TRUE, all seven verified against `link_baseline.json`** | `/for` 59, `/for/[slug]` 20 (all 45 identical), `/locations` 39, `/locations/[slug]` 24 (all 25 identical), `/glossary` 64, `/glossary/[slug]` 18 or 19 (both values present), `/resources/[topic]` **15** (the disposition never names this one; it is now in section 4). |
| 9 | `STATE.md` PICKUP BLOCK: "Phase 2 is BUILT AND REVIEWED but NOT COMMITTED" | Stale, as that block itself warned | `git log --oneline -- construction-cis/` = `6575bbb6` (phase 2) over `405faf37` (phase 1) over `18b4f25f` (production). The only uncommitted path under `construction-cis/` is `src/components/layout/SiteFooter.tsx`, which another agent is holding. **That file is OFF LIMITS to all four packages.** |
| 10 | `LIVE_DEFECTS.md` TD-34 "low priority, may be left" | Agreed, with one addition | The named `locations/[slug]/data.ts` lines all still carry "typical"/"illustrative" framing, which `house_positions.md` §13 permits. **Recommend LEAVE.** They are prose inside a data file WP-C2 is otherwise only touching for `priceRange` and would be a 12-line diff for no rule breach. Owner gate 7 records the alternative. |

### What Phase 1 and Phase 2 already did for Phase 3, so nobody builds it twice

- **`.prose-blog` is now a THREE-family class.** `grep -rn 'article-body' src` returns
  `glossary/[slug]/page.tsx:98`, `locations/[slug]/page.tsx:150` and
  `blog/BlogPostRenderer.tsx:262`. Phase 2's fix to `.prose-blog h2` (`globals.css:312`,
  `border-left: 4px solid var(--btn-ground)`, 5.18, replacing `--accent` at 2.80) and its move of
  `.prose-blog a` into `@layer components` therefore **already landed on 50 glossary entries and 25
  city pages**. Phase 3 inherits both fixes free and must not re-do them.
- Chrome now contributes **20** unique internal destinations (was 14 at baseline). Measured today:
  `/about` 20, `/for` 65, `/for/[slug]` 25, `/locations` 45, `/locations/[slug]` 30, `/glossary` 70,
  `/glossary/[slug]` 25, `/resources/[topic]` 21. **Every route sits exactly 6 above its baseline
  floor, which is the chrome delta and nothing else.** There is no body-link headroom anywhere in
  this phase: the floors bind on body links one for one.
- The token layer is complete: `--warn-1..4` + on-dark twins, `--btn-ground{,-hover,-active}`,
  `--accent-strong`, `--hero-cream`, the `--color-primary-*` ramp, `globals-standard.css`.
  **Phase 3 consumes tokens only and adds none. No package edits `globals.css`** (see section 5).

---

## 1. REALITY CHECK PER SURFACE

### 1a. `/for/[slug]`, 45 routes: the capture problem is one template edit

**What the disposition says.** §0.6/§0.7: the biggest under-monetised surface in the port, and the
fix is to point the hero at the form that already exists, not to add capture to 45 pages.

**What is actually there, today.** Phase 0's funnel read (`FUNNEL_BASELINE.md:171,244`): 24
sessions across 19 distinct slugs, 2 CTA clicks, **0 form views, 0 form starts, 0 leads**. The
template has a working `LeadForm` at `:237` and no way to reach it. Confirmed unchanged post-Phase-2
(correction 7).

**What the minimal fix is.** Four edits in one file:
1. `:64` hero primary `href="/contact"` → `href="#book"`, `data-cta="for_hero_book"`,
   `data-cta-placement="hero"`, `data-cta-goal="form"`. (Owner gate 1: new id.)
2. Wrap the capture section at `:211` in `<div id="book" className="scroll-mt-24">`.
3. Move the FAQ block (`:162-201`) ABOVE the capture section, so the order is content, FAQ, panel.
4. Leave the hero secondary at `/cis-refund`.

`/contact` and `/cis-refund` are both chrome destinations, so repointing costs **0** unique links.

**The trap in doing more.** The instinct is "45 pages with no capture, build a capture component".
There is capture. One `href` and one `id` on one file is the whole conversion fix. Everything else
in WP-C1 is design.

### 1b. The `/for` family: 46 adjacency breaches, a metric §3a does not currently track

`--grounds` reports a second §9 clause, "consecutive bands must not share a ground", and the site
has **48** instances. **46 of them are Phase 3's**, which no disposition slice and no earlier phase
plan records:

- **`/for` index, 1 route, and it is the literal navy-touching-navy case.** Bands 0 and 1 are both
  `oklch(0.205 0 0)`: the navy hero at `:20` immediately followed by a navy trades grid at `:33`,
  with a third navy at `:63` (`bg-neutral-800`, a ground that exists nowhere in the standard).
  Disposition 7a.2 called this correctly. All **45** trade links live in those navy grids and every
  one must survive the flip to light cards.
- **`/for/[slug]`, 45 routes.** Bands 5 and 6 are both `rgb(255,255,255)`: the white FAQ section at
  `:169` immediately followed by the white `NextStepOffer` wrapper at `:204`
  (`<div className="bg-white px-4 sm:px-6 lg:px-8">`). Unconditional siblings, so **one template
  edit fixes all 45**; the band index shifts to 4/5 on some routes only because an optional section
  above them does not render.

The other 2 are `/` and `/services`, phase 5, and they are pre-existing: `/services/page.tsx` has
not been touched since before Phase 0, so this metric is not a breach the port created. Neither
`/for` route is part of the dark-tail count.

### 1c. `/locations/[slug]`, 25 routes: the real dark tail, and a published price signal

Last band under `<main>` is the `bg-neutral-900` capture section at `:275`
(`--grounds`: `last=oklch(0.205 0 0)`), running straight into the slate-900 footer. **25 of the 29, and the only §3a closure in this phase.**
The page also carries `priceRange: "££"` in its `LocalBusiness` JSON-LD via `src/lib/schema.ts:71`
(**TD-01**, still live, `grep -rn priceRange src` returns `:71` and `:200`), the FAQ `<details>` at
`:218`, five `max-w-4xl mx-auto` body clamps, a `priority` hero photo with a Pexels credit at
`:107-127`, and 10 `tradeMix` chips that are its entire unique-link budget.

### 1d. `/glossary/[slug]`, 50 routes: NOT a dark tail, and two understated statutory penalties

**This family is not in breach and no §3a fix is to be written for it.** The page is
`<section class="bg-neutral-900">` (hero, `:71`) then `<article class="bg-white py-12 sm:py-16">`
(`:94`) running to the end of `<main>`, so the band touching the footer is white. The instrument
reports it dark because it cannot see `<article>` (correction 2). If a builder converts that
`<article>` to a `<section>` for tidiness, this family becomes visible to the instrument for the
first time and the tail must still be light: note it, do not do it casually.

The navy CTA card at `:103-115` is still wrong on its own terms, as §9 decoration inside a white
article, and is fixed as design. It is not a §3a closure.

**Both ledger penalty errors are STILL LIVE**, verified by grep in the current tree, despite the
2026-06-16 session recording s.62B as fixed and despite Phase 2 correcting the same error class in
a blog post:
- `data.ts:518`, "a penalty of **20% of the relevant payment** (FA 2004 s.62A) or **20% of the sums
  treated as paid on a return** (FA 2004 s.62B)". `house_positions.md` §3 bans "20%" for s.62B by
  name; it is 100% of the sum returned. Understates exposure fivefold. **TD-08.**
- `data.ts:359`, `:377`, `:432`, "£300 or **100%** of the CIS liability at twelve months", three
  times. §4's ladder is £100 / £200 / £300-or-5% / £300-or-5%, with 100% an ADDITIONAL charge for
  deliberate withholding only. Overstates a statutory penalty twentyfold. **TD-09.**

And the index stamps "All figures verified for **2025/26**" (`glossary/page.tsx:72`, and again in
the metadata description at `:12`) over 50 definitions whose ground truth is 2026/27.

### 1e. `/resources/[topic]`, 3 routes: outside every disposition slice, and worse than it looks

This family appears in **none** of the three disposition slices. Read fresh:
- It renders its own `<main>` **inside** `PageShell`'s `<main id="main">` (`PageShell.tsx:40`). Two
  `<main>` landmarks on 3 routes, confirmed in the served HTML (`grep -o '<main' | wc -l` = 2).
  Not in the ledger. New.
- `prose-a:text-[#f97316]` on the article body: `--accent` as body link text, **2.80**, on all 3
  pages.
- The xlsx download button is `text-white` on `background:#f97316`, **2.80**, and
  `browser_check.mjs` flags it by name today:
  `a "CIS refund and deduction model (Excel)" ratio=2.80 floor=4.5`.
- Inline `style={{background:"#1e293b"}}`, a `gray-*` palette used nowhere else on the site, a
  `max-w-3xl` page clamp, and 10 heading anchors with `scroll-margin-top: 0` (TD-22 family).
- Tail is light (`--grounds` reports no dark-on-dark), so it is not part of the 29. `DESIGN_DELTA`
  §3a already removed `/resources` 3 as a false positive, and that removal is correct.

### 1f. The `--accent` glyph exposure in Phase 3 scope

`DESIGN_DELTA` §1's corrected contract forbids `--accent` (orange-500, **2.80** as a token, **2.89**
as a Tailwind utility, and those two numbers are not interchangeable, §2 preamble) on any icon,
glyph, numeral or meaning-bearing border. In scope, by grep:

| Instance | File:line | Routes | Class |
|---|---|---|---|
| `✓` tick on a `bg-orange-500` square, white glyph | `for/[slug]:229` | 45 | glyph on 2.80 ground |
| FAQ `Plus` toggle icon `text-orange-500` | `for/[slug]:184` | 45 | meaning-bearing glyph |
| `border-l-4 border-l-orange-500` challenge cards | `for/[slug]:102` | 45 | meaning-bearing border |
| FAQ `Plus` toggle `text-orange-500` | `locations/[slug]:234` | 25 | meaning-bearing glyph |
| `ArrowRight` `text-orange-500` in trade chips | `locations/[slug]:207` | 25 | meaning-bearing glyph |
| `border-l-4 border-l-orange-500` project cards | `locations/[slug]:169` | 25 | meaning-bearing border |
| `text-orange-500` "Get started" eyebrow | `locations/[slug]:279` | 25 | **text**, 2.89 |
| `text-orange-600` as link/CTA text | `locations:74,151`; `glossary:94,117`; `glossary/[slug]:133` | 77 | **text**, 3.56, fails 4.5 |
| `bg-orange-500` category/region pills | `locations:120`; `locations/[slug]:319`; `glossary:63`; `glossary/[slug]:82` | 77 | ground, legal; retire for `Eyebrow` on style grounds only |
| `prose-a:text-[#f97316]` body links | `resources/[topic]:107` | 3 | **text**, 2.80 |
| `#f97316` download-button ground with white label | `resources/[topic]:71` | 3 | **2.80, instrument-confirmed** |

**Total: 8 distinct glyph/border instances rendering `--accent`, over 140 route-instances, plus 82
route-instances of orange-600/`#f97316` as text.** Resolution is mechanical: glyphs and borders take
`--accent-strong` / `--btn-ground` (`#c2410c`, 5.18); text takes `text-orange-700` on light and
`text-orange-300` on dark; grounds keep orange-500. No owner input needed beyond the standing
Phase-1 gate on the ticks and numerals.

### 1g. Trap 22: exactly 45 routes in scope carry a `next_step` triple, and none of them are safe to touch

Derived from `cta_baseline.json`'s `per_route` map, not from the summary:

| Triple | Total routes | In Phase 3 scope | Where |
|---|---|---|---|
| `next_step\|null\|null` | 109 | **45** | **all 45 `/for/[slug]`**, `href` into `/calculators/*` |
| `next_step\|null\|form` | 18 | **0** | blog only |
| `header_nav_primary\|header\|contact` | 246 | 126 | chrome |
| `specialist_widget\|null\|null` | 246 | 126 | chrome |
| `hero_primary\|hero\|lead` | 1 | 0 | `/` only |

`/locations/*`, `/glossary/*`, `/resources/*` and `/for` carry **zero** `next_step`. So the
exposure is precisely the 45 trade pages, and it is owned entirely by WP-C1.

`NextStepOffer` is also **1 of the 6 unique body links** that hold the `/for/[slug]` floor of 20
(the other 5 are the "other trades" `slice(0,5)`). Removing it, or adding a `placement`/`goal` to
it, splits `next_step|null|null` from 109 into 64 + 45 and breaks the locked triple. **WP-C1 must
not add `data-cta-placement` or `data-cta-goal` to `NextStepOffer`**, which is what
`DISPOSITION_SLICE2.md` 7b.8 and §13 WP-C both instruct. That instruction is the Phase-2 trap-22
shape repeating, and it is countermanded here: restyle only, attributes byte-identical. Owner gate
9 if the owner wants it changed anyway.

---

## 2. WORK PACKAGES

Smallest edit point, stated once: **three templates render 120 of the 126 routes.** No package
touches 45 files, or 50, or 25. Per-row data edits exist only where a ledger defect names a line.

Every package's acceptance list ends with these three, which are not repeated per package:
`python scripts/check_dependency_closure.py` (T24); `node docs/_engines/instruments/sweep.mjs`
with `totalDashes == 2` (the two protected en-dashes, `cis-self-assessment-calculator.ts:125` and
`cis-vs-paye-comparison.ts:113`, TD-28) and 0 dead internal links; and the package's own routes at
or above their `link_baseline.json` floor, asserted **per route, not per family**.

---

### WP-C1: `/for` index + `/for/[slug]` x45, the capture fix and the navy adjacency

**Owns:** `src/app/for/page.tsx`, `src/app/for/[slug]/page.tsx`, `src/data/trade-types.ts`.

**Property source:** `Property/web/src/app/section-24/page.tsx` (pillar anatomy: hero, stat strip,
topic sections, `DrawnTickList`, panel). Property has no `/for` family (correction 4).

**Spec:** rollout §F.1, §D.1, §D.3, §A.3, §A.8; DESIGN_SYSTEM §4a, §5, §6a, §9;
`DISPOSITION_SLICE2.md` §7a and §7b, minus rows 7b.7 and 7b.8 (corrections 3 and 1g).

**TD ids:** TD-22 (anchor `scroll-mt`), TD-27 (leave the `schema.ts` FAQ builder in place; T17 is
already satisfied because `:165` builds from the same array `:177` renders).
TD-13 and TD-33 are **already CLOSED** on this file by Phase 2 and must be confirmed, not re-fixed:
`grep -n '24-hour\|guarantee' src/app/for/[slug]/page.tsx` must stay at 0.

**Work.**
1. The capture fix, section 1a, four edits. This is the package's reason to exist.
2. **The adjacency closure, 46 routes** (section 1b; `GROUNDS_BASELINE.md` §4 carries the per-route
   list). `/for` index: flip the trades grid and businesses grid off navy to light cards on white
   and slate-50, so hero-navy is followed by a light band. `bg-neutral-800` at `:63` retired. All
   **45** anchors survive; `:35` and `:65`, which are `h2`s styled as 12px uppercase eyebrows, split
   into `Eyebrow` + a real `h2`. `/for/[slug]`: the white FAQ section at `:169` and the white
   `NextStepOffer` wrapper at `:204` are unconditional siblings sharing `rgb(255,255,255)`; oscillate
   them (the FAQ to slate-50, or stop the wrapper being a band by dropping `bg-white` from a
   `<div>` that only needs padding). **One edit, all 45. Changing the wrapper's ground is not
   touching `NextStepOffer` itself, which stays byte-identical** (section 1g).
3. `/for/[slug]`: hero to `py-12 sm:py-16` + §A.3 scale; the `bg-orange-600` full-bleed stat band at
   `:78` to a white `StatsCounter` strip with `ExampleFigureNote` (§5 rule 6; and `text-orange-100`
   on `bg-orange-600` is not in `BRAND_LAYER.md`'s measured table, so hand-compute before shipping
   any variant that keeps it); glyph and border fixes from the 1f table; `max-w-3xl`/`max-w-4xl`
   body clamps removed per §6a; `.section-label` call sites at `:56,94,115,215` to kit `Eyebrow`.
4. FAQ stays a native `<details>`, restyled (`rounded-xl`, `ring-1`, §A.3 heading), moved above the
   panel. **Do not import the kit `FaqSection`** (correction 3).
5. `trade-types.ts`: payload STRINGS only, and only where a rule names them. The `:154` testimonial
   footnote "Composite snapshot based on client patterns" asserts a client base (§I ban); rewrite to
   describe the mechanics. Owner gate 6 if the owner wants all 45 testimonial payloads audited.

**Do NOT:** touch `src/components/intent/NextStepOffer.tsx` (1g); delete `.section-label` from
`globals.css` (6 consumers outside this phase, T26); add `RelatedArticles` or a `ProcessTimeline`
(both need copy that does not exist; owner gate 10).

**Acceptance.**
- `curl /for | grep -o 'href="/for/[a-z-]*"' | sort -u | wc -l` == **45**, and `/for` >= **59**
  unique internal links.
- All 45 `/for/*` routes >= **20** unique internal links, asserted per slug, and each still contains
  `/calculators/` in its STATIC html (the `NextStepOffer` link is 1 of the 6 that make the floor; if
  an intent arm changes, 45 pages silently shed a link).
- `curl /for/electricians | grep -c 'id="book"'` == 1, the div carries `scroll-mt-24`, and the hero
  primary `href` is `#book`.
- `node .../cta_snapshot.mjs`: `next_step|null|null` still **109** and its 45 in-scope routes still
  carry `placement=null, goal=null`. Exactly ONE new triple, `for_hero_book|hero|form`, at count 45.
- `--grounds` on `/for` and on at least 3 trade slugs: `grounds.adjacentSame` is **empty** (it is
  non-empty on all 46 today), and `lastBand` is not `oklch(0.205 0 0)` / `rgb(30,41,59)` /
  slate-900. This is the metric's only Phase 3 owner outside WP-C2.
- `grep -c '<summary' /for/electricians` served HTML unchanged, and every one of the 124 FAQ answers
  still present in the static HTML.

---

### WP-C2: `/locations` index + `/locations/[slug]` x25, the dark tail and TD-01

**Owns:** `src/app/locations/page.tsx`, `src/app/locations/[slug]/page.tsx`,
`src/app/locations/[slug]/data.ts`, `src/lib/schema.ts`.

**Property source:** `Property/web/src/app/locations/page.tsx` (90 lines) and
`Property/web/src/app/locations/[slug]/page.tsx` (1,006 lines), whose tails at `:77-87` and
`:991-1002` are the canonical shape. **Copy the structure, never the `proofPoints`** (correction 6).

**Spec:** rollout §F.1, §D.1/D.3, §I; DESIGN_SYSTEM §6a, §9; `DISPOSITION_SLICE2.md` §8a and §8b,
minus row 8b.5 (correction 3).

**TD ids:** **TD-01** (`priceRange: "££"`, 26 surfaces), TD-34 (recommend leave, correction 10),
TD-22 (anchors).

**Work.**
1. **The §3a closure, 25 routes, and this package is the only one that closes any of it.** Replace
   the `bg-neutral-900` capture band at `:275-302` with
   `LeadCTAPanel contained` wrapped in `<div id="book" className="scroll-mt-24">`, and move the FAQ
   `<details>` block (`:218-256`) to sit before it. `contained` renders `bg-slate-50`
   (`LeadCTAPanel.tsx:69`), so the tail goes light. The existing `LeadForm` at `:298` passes into the
   panel's `form` prop; **the consent wording inside `LeadForm` is untouchable.**
2. TD-01: strike `priceRange` from `src/lib/schema.ts:71` and `:200`. The shared fork at
   `packages/web-shared/schema/local-business.ts:127` is **TD-K1 and NOT this package's to touch**
   (T12). Hand it to the orchestrator in the completion report, explicitly, in the same breath: a
   half fix here is the T23 shape.
3. Delete the `h-[420px]` `priority` hero photo, the 3-stop scrim and the two outbound Pexels credit
   links (`:95-140`, `:107-127`); navy motif hero instead. Owner gate 3.
4. Index: `CityCard` photo tiles and the `orange-500 → orange-700` gradient fallback to text cards;
   chips to `min-h-[44px]` (§A.8); `max-w-6xl` clamp at `:139` deleted; `LeadCTAPanel contained`
   added, since the populated state currently has no ask at all.
5. Glyph and text-colour fixes from the 1f table. The 10 `tradeMix` chips keep their derivation
   (`t.toLowerCase().replace(/\s+/g,"-")`, `:78`) and all 250 pairs resolve today; add a build-time
   guard over the 250, not a spot check.

**Do NOT:** convert `nearbyAreas` to links (those towns have no pages, `:266-268` is correctly plain
text); reduce the `tradeMix` list below 10; edit `packages/web-shared/**`.

**Acceptance.**
- `--grounds` on `/locations/london` and at least 2 other cities: `lastBand` is **not**
  `oklch(0.205 0 0)`, read as a VALUE out of the JSON (correction 1). All 25 share one band
  signature, so a 3-route sample is sufficient and the template guarantees the rest. Expect the
  `darkOnDark` boolean to be unreliable and expect the `/locations` INDEX to still be flagged,
  falsely (D1).
- All 25 city routes >= **24** unique internal links, per route, with all 10 `tradeMix` anchors
  resolving to a real `trade-types.ts` slug; `/locations` >= **39** with all 25 city anchors.
- `grep -rn 'priceRange' src` == **0**, and the report names TD-K1 as handed over.
- `grep -c '<summary'` on a city page unchanged; all 138 FAQ answers still in static HTML.
- `cta_snapshot.mjs`: the two chrome triples unchanged at 246; at most ONE new id in this family.
- `grep -rn 'pexels\|Pexels' src/app/locations` == 0.

---

### WP-C3: `/glossary` index + `/glossary/[slug]` x50, the dark tail and two false penalty figures

**Owns:** `src/app/glossary/page.tsx`, `src/app/glossary/[slug]/page.tsx`,
`src/app/glossary/[slug]/data.ts`.

**Property source:** none direct (correction 4). Use Property's locations tail for the panel shape
and `section-24` for the body scale. The sibling already correct ON THIS SITE is
`src/lib/calculators/tools/cis-penalty-calculator.ts`, whose ladder copy is clean: use it as the
reference for the TD-09 rewrite so page and tool cannot disagree.

**Spec:** rollout §F.1, §I; DESIGN_SYSTEM §6a, §9; `house_positions.md` §3 and §4;
`DISPOSITION_SLICE2.md` §9a and §9b, minus the `FaqSection` half of 9b.8 (correction 3, and the
disposition itself recommends no FAQ here).

**TD ids:** **TD-08** (`data.ts:518`), **TD-09** (`data.ts:359`, `:377`, `:432`), TD-34 (`data.ts:68`,
recommend leave), plus the 2025/26 stamp, which is not in the ledger.

**Work.**
1. **Not a §3a closure. This family is not in breach** (correction 2, section 1d). Replace the navy
   CTA card at `:103-115` with the §D.3 mid-page LIGHT card
   (`rounded-xl bg-white p-6 ring-1 ring-slate-200`, statement specific to the entry) pointing at
   `#book`, and end the page with `LeadCTAPanel contained` in
   `<div id="book" className="scroll-mt-24">` after the related-terms section. 50 reference pages
   currently have no ask at all. **Keep the tail light and keep the body an `<article>`**: turning
   it into a `<section>` would make the family visible to the grounds instrument for the first
   time, and that is a decision, not a tidy-up.
2. **TD-08.** `:518` "20% of the sums treated as paid on a return (FA 2004 s.62B)" → "an amount
   equal to the sum the return treats as paid on account of the person's liabilities (100% of the
   sum returned)". Fix the s.62A half in the same edit so the two quanta read as different. Note the
   neighbouring entry at `:540-552` is already correct, so one data file contradicts itself today.
   Owner gate 5 covers the wording.
3. **TD-09.** `:359`, `:377`, `:432`: reproduce §4's ladder (£100 / £200 / £300-or-5% / £300-or-5%)
   with deliberate withholding as a separate, additional tier capped at "up to £3,000 or 100%".
   Three separate wordings; **do not bulk-sed**.
4. The "All figures verified for 2025/26" stamp at `:72` and the metadata description at `:12` →
   the year the data is actually on. Owner gate 6.
5. Index: `max-w-6xl` clamp at `:80`; `bg-stone-50` → `bg-slate-50`; the ruled-underline `h2` at
   `:104` → `Eyebrow` + `h2` with explicit ground oscillation; the no-op `hover:bg-white` on a
   `bg-white` card at `:112` deleted; `LeadCTAPanel contained` added. All **50** term links survive.
   Note the empty state at `:91` contains the word "shortly" (TD-14 family) but is unreachable with
   50 entries; fix it while you are in the file rather than leaving a landmine.
6. Entry template: `max-w-3xl` clamp at `:96` removed (`.prose-blog` governs the measure);
   `bg-orange-500` category pill at `:82` → `Eyebrow`; `text-orange-600` at `:133` → orange-700;
   `related` `slice(0,3)` KEPT (3 of the 4-5 unique links that make the 18/19 floor).

**Do NOT:** author FAQs for 50 entries (the entry IS the answer; owner gate 11 records it);
edit `globals.css`: `.prose-blog` and `.article-body` are shared with 82 blog articles and 25 city
pages, and an unlayered rule there beats its consumers' utilities (T30, which has bitten four times
in this codebase). If a restyle seems to need a `.prose-blog` change, it goes to the manager.

**Acceptance.**
- `--grounds` on `/glossary/cis` and `/glossary/contractor`: the served HTML still ends
  `</article></main>` with the article on a light ground. Expect the instrument to keep reporting
  this family dark; that is D2 and it is a false positive both before and after.
- All 50 term routes at or above their **own** measured floor (18 or 19; it varies by inline body
  links, so it is per page, not per family); `/glossary` >= **64** with all 50 term anchors.
- `grep -n '20% of the sums' src/app/glossary/[slug]/data.ts` == 0.
- `grep -c '100% of the CIS liability' src/app/glossary/[slug]/data.ts` == 0 **at the 12-month
  tier**; any surviving instance must be the deliberate-withholding tier and must say so.
- `grep -rn '2025/26' src/app/glossary/` == 0.
- `cta_snapshot.mjs`: at most ONE new id in this family; the two chrome triples still 246.

---

### WP-C4: `/resources/[topic]` x3, the standard pass and two live contrast failures

**Owns:** `src/app/resources/[topic]/page.tsx`.

**Property source:** `Property/web/src/app/resources/[topic]/page.tsx`.

**Spec:** rollout §F.3 (article anatomy), §A.1-A.3; DESIGN_SYSTEM §0, §2, §7, §9.

**TD ids:** none in the ledger. Four findings raised here for the first time (section 1e).

**Work.**
1. Remove the inner `<main>`: `PageShell.tsx:40` already renders `<main id="main">`, so these 3
   routes ship two `<main>` landmarks. Return a fragment with `<section>` bands instead.
2. `prose-a:text-[#f97316]` (2.80) → `var(--accent-strong)` (5.18). `background:#f97316` with a
   white download label (2.80, instrument-confirmed) → `var(--btn-ground)`.
3. Retire the inline `style={{background:"#1e293b"}}` header bar for a navy `<section>` band on the
   token; retire the `gray-*` palette for `slate-*`; drop the `max-w-3xl` page clamp for
   `siteContainerLg`.
4. Give the 10 in-guide heading anchors `scroll-mt-24` (TD-22 family; `--grounds` flags them today).
5. Leave `ResourceGate` where it is. It is the post-2026-07-18 no-email-unlock `MiniCapture`, so
   carve-out 2 is intact, and it is the only ask on these pages.

**Do NOT:** touch `src/lib/resources/registry.ts` or `content/resources/*.md`. The 6-topic / 3-file
registry is correct as it stands and a "missing guide" is a content commission, not a port defect.

**Acceptance.**
- `curl /resources/cis-refund | grep -o '<main' | wc -l` == **1**.
- `browser_check.mjs` on the 3 routes: the `ratio=2.80` finding on the Excel link is gone, and no
  new anchor-gap findings.
- All 3 routes >= **15** unique internal links (`link_baseline.json`; the disposition never carried
  this floor).
- Tail stays light: `--grounds` `lastBand` not slate-900.

---

## 3. THE §9 GROUNDS CLOSURE, AND HOW IT IS PROVEN

Authoritative per-route lists: **`_port/GROUNDS_BASELINE.md`** (281 lines, all 246 routes at width
1440, post-Phase-2 build, commit `6575bbb6`). Read it before building. This plan's numbers were
derived independently and agree with it on every count.

**What Phase 3 closes.**

| Metric | Site total | Phase 3's share | Remainder, and whose |
|---|---|---|---|
| Dark band touching the footer | **29** (not 79) | **25**, all `/locations/[slug]`, WP-C2 | 4: `/cis-refund`, `/gross-payment-status` (phase 5); `/cis-invoice-template`, `/cis-payment-deduction-statement-template` (phase 6) |
| Adjacent bands sharing a ground | **48** | **46**: `/for` index 1 + `/for/[slug]` 45, WP-C1 | 2: `/`, `/services` (phase 5, pre-existing) |

**Say this plainly to the owner: Phase 3 does NOT close the blocking item.** It closes 25 of the 29,
and 4 survive into phases 5 and 6 by design. The claim in `STATE.md` and in the brief that Phase 3
closes "most of the 79" rests on a count that was wrong; `DESIGN_DELTA` §3a needs restating to 29,
and it does not currently track the adjacency metric at all, which is where 46 of Phase 3's grounds
work actually lives.

**The fix per family, stated so a builder cannot get it wrong:**

| Family | Today | Becomes | Routes fixed by one edit |
|---|---|---|---|
| `/locations/[slug]` | last band `bg-neutral-900` at `:275` | FAQ moved above it, then `LeadCTAPanel contained` (`bg-slate-50`) | **25** |
| `/for` index | navy hero `:20` then navy grid `:33` then `bg-neutral-800` `:63` | hero navy then a LIGHT trades grid; `bg-neutral-800` retired | **1** |
| `/for/[slug]` | white FAQ `:169` then white `NextStepOffer` wrapper `:204` | the two bands oscillate (slate-50 / white), or the wrapper stops being a band | **45** |
| `/glossary/[slug]` | white `<article>` tail, correct | unchanged tail; the mid-article navy card is fixed as design only | 0 (not in breach) |
| `/glossary`, `/locations` indexes | light already | stay light; both gain `LeadCTAPanel contained` | 0 (not in breach) |

**The proof, and the caveat that makes the naive proof worthless.**

```
MSYS_NO_PATHCONV=1 node docs/_engines/instruments/browser_check.mjs --site=construction-cis \
  --base=http://localhost:PORT --grounds --widths=1440 --out=<scratch>/p3_grounds.json \
  "//locations/london" "//locations/manchester" "//for" "//for/electricians" "//for/plumbers" \
  "//glossary" "//glossary/cis" "//locations" "//resources/cis-refund"
```
(Routes quoted as `"//x"` or Git Bash rewrites them into Windows paths. `--widths=1440` because a
ground does not change with viewport and the instrument keys grounds one per route anyway.)

**Do not read the instrument's summary line, and do not read the `darkOnDark` boolean.** Per
correction 1 it has two defects: every `oklch()` ground scores dark (D1), and `<article>` is
invisible to the band selector (D2). Until a fix lands, the gate is textual and exact, read out of
the per-route JSON:

- PASS when `grounds.lastBand` is `oklch(0.985 ...)`, `rgb(255, 255, 255)`, `rgb(250, 250, 249)` or
  a slate-50 value, AND `grounds.adjacentSame` is empty on `/for` and on all 45 `/for/*`.
- FAIL when `lastBand` is `oklch(0.205 0 0)` (neutral-900) or `rgb(30, 41, 59)` (`#1e293b`).
- IGNORE the `/glossary` and `/locations` index rows entirely; they are D1 false positives and will
  still be reported after this phase has fixed everything real.

**A fix to the instrument is being commissioned separately** (resolve `oklch` by painting, the way
the same file's contrast path already does at `:125`; widen the band selector to `article`). It is a
shared instrument six ports read and it is **not Phase 3's to patch**. If it lands before the owner
walk, re-run against the corrected tool and expect 4 dark routes and 2 adjacency routes remaining,
all outside this phase. If it does not land, the textual gate above and
`GROUNDS_BASELINE.md`'s per-route lists are the gate.

---

## 4. PER-ROUTE LINK FLOORS

Chrome is now **20** unique internal destinations (baseline was 14). The floors in
`link_baseline.json` were captured at 14, so every route in this phase currently sits exactly **+6**
over its floor and that margin is chrome, not headroom. **Body links must not fall, one for one.**

| Family | Routes | Floor (each) | Arithmetic at baseline | Measured today | Body-link budget, and what holds it |
|---|---|---|---|---|---|
| `/for` | 1 | **59** | 14 + 45 trades | 65 | 45. The businesses grid at `:62` is conditional on a non-empty filter; if the segment split changes the hub silently sheds links |
| `/for/[slug]` | 45 | **20** | 14 + 5 other-trades + 1 `NextStepOffer` | 25 | **6, the most fragile in the port.** 5 from `slice(0,5)` at `:252`; the 6th from a conditional personalisation component |
| `/locations` | 1 | **39** | 14 + 25 cities | 45 | 25. Deleting the photo tiles must keep all 25 anchors |
| `/locations/[slug]` | 25 | **24** | 14 + 10 `tradeMix` | 30 | 10, all of it the trade chips. All 250 pairs resolve; `nearbyAreas` stay plain text |
| `/glossary` | 1 | **64** | 14 + 50 terms | 70 | 50, the highest on the site. Category regrouping must not drop a term |
| `/glossary/[slug]` | 50 | **18 or 19** | 14 + 3 related + 1-2 inline body links | 25 | 4-5. `related` is `slice(0,3)` over same-category siblings, so a small category yields fewer. **Per page, not per family** |
| `/resources/[topic]` | 3 | **15** | 14 + 1 | 21 | 1 |

Any link to one of the 20 chrome destinations (`/`, `/about`, `/blog`, `/calculators`,
`/cis-refund`, `/contact`, `/cookie-policy`, `/for`, `/glossary`, `/gross-payment-status`,
`/locations`, `/privacy-policy`, `/services`, `/terms`, and the six phase-1 additions) scores
**zero** unique links. That is why repointing the `/for/[slug]` hero from `/contact` to `#book`
is free, and why an in-page `#` anchor never counts at all.

---

## 5. OFF LIMITS, PER PACKAGE

The manager runs all four concurrently. Touching a file on your OFF LIMITS list is a merge conflict
at best and a silently reverted fix at worst.

| Package | OWNS (only files it may edit) | OFF LIMITS |
|---|---|---|
| **C1** | `app/for/page.tsx`, `app/for/[slug]/page.tsx`, `data/trade-types.ts` | `components/intent/NextStepOffer.tsx` (**read-only, trap 22, section 1g**); everything in C2's, C3's and C4's OWNS columns; `lib/schema.ts` |
| **C2** | `app/locations/page.tsx`, `app/locations/[slug]/page.tsx`, `app/locations/[slug]/data.ts`, `lib/schema.ts` | `data/trade-types.ts` (**read-only: C1 owns it, and the 250 `tradeMix` pairs resolve against it**); everything in C1's, C3's and C4's OWNS columns |
| **C3** | `app/glossary/page.tsx`, `app/glossary/[slug]/page.tsx`, `app/glossary/[slug]/data.ts` | everything in C1's, C2's and C4's OWNS columns; `lib/schema.ts` |
| **C4** | `app/resources/[topic]/page.tsx` | `lib/resources/registry.ts`, `lib/resources/content.ts`, `content/resources/*` (all read-only); everything in the other three OWNS columns |

**Shared, read-only for all four, no exceptions:**
- `src/app/globals.css`. Phase 1 owns it, Phase 2 amended one block of it, and `.prose-blog` /
  `.article-body` is consumed by **three** families across **two phases** (82 blog articles, 50
  glossary entries, 25 city pages). `.section-label` at `:279` is **unlayered** with **8** consumers,
  6 of them in phases 5 and 6. T30 and T26 both apply. Any needed change goes to the manager.
- `src/components/layout/*` (phase 1; and `SiteFooter.tsx` is uncommitted in another agent's hands
  right now).
- `src/components/forms/LeadForm.tsx` and `DetailsForm.tsx`. The consent wording is the most
  expensive surface in the programme. Do not touch.
- `packages/web-shared/**`. T12: read freely, mirror locally, never edit. The kit
  `LeadCTAPanel` is copy-agnostic and safe to import as-is; `FaqSection` and `accordion` are not
  safe here (correction 3) and must not be imported.
- `src/components/blog/**`, `content/blog/**`, `niche.config.json` (phase 2).
- `src/lib/calculators/**`, `src/app/services/page.tsx`, `src/app/gross-payment-status/page.tsx`,
  `src/config/service-tiers.ts` (phase 5). **This is where the TD-05 "30% of the tax lost"
  fabrication lives** and it is NOT Phase 3's: `gross-payment-status/page.tsx:49`,
  `services/page.tsx:46`, `cis-gps-eligibility-checker.ts:157` and `:169`, all four still live,
  verified today, all four phase 5's, all four to be fixed in ONE commit (T23) together with the
  three "Finance Bill 2026" instances (TD-06) and the repointed guard at
  `src/tests/assistant-journey-opener.test.ts:706` (TD-07).

**Repo-wide, all four:** other agents have uncommitted work for Dentists, Medical, Solicitors,
generalist and hospitality in this checkout, and one has `SiteFooter.tsx` open right now.
**Never run a repository-wide git command.** Path-scope every git invocation to `construction-cis/`
and `docs/construction-cis/`, read-only. Builders never commit; the manager commits. Builders never
build: T1. The manager builds, serially, and checks `BUILD_ID` mtime against the newest source file
before trusting a green run (T2).

---

## 6. OWNER GATES

1. **New tracking id on the trade pages.** Pointing the hero button at the form on the page needs a
   new label (`for_hero_book`) so the analytics can tell it apart from the header button. New labels
   are his call. Recommend approve: without it the single highest-value fix in the phase is
   invisible in the reporting.
2. **New tracking ids on locations, glossary and resources.** Same question, one per family, for
   asks that do not exist today. Recommend approve, one id each, no more.
3. **Deleting the city photography.** 25 stock photos come off the location pages, along with the
   two credit links to the photo site. Confirm nothing we agreed obliges us to keep the credit once
   the photo is gone.
4. **The published price band.** `priceRange: "££"` is our own fee signal, in machine-readable data,
   on 26 pages. Recommend strike. The identical line also sits in the shared estate code, which
   another site owns; fixing only one end leaves it live, so both go or neither does.
5. **Two penalty figures on the glossary are wrong in opposite directions** and both understate or
   overstate the law to contractors: one says 20% where the law says the whole sum, three say 100%
   where the law says 5%. Needs his word on the replacement wording, which is the same sign-off the
   ground-truth penalty phrase already needs.
6. **"All figures verified for 2025/26" on 50 definition pages** whose figures are 2026/27.
   Recommend restate to the year the data is actually on.
7. **The remaining refund-average lines** in the locations data (roughly 12), hedged as "typical" or
   "illustrative" but carrying no source. House rules permit that framing. Recommend LEAVE.
8. **The booking-picker step.** Turning it on for the 45 trade pages and 25 city pages changes what
   the funnel measures across 70 routes, so before and after will not compare cleanly. Recommend
   deciding it once, for the whole port, not per phase.
9. **The personalisation block on the trade pages.** Recommend LEAVE IT EXACTLY AS IT IS. The
   disposition says to add two tracking attributes to it; doing that splits a locked measurement
   series across 109 pages and breaks the funnel history. If he wants it changed anyway, it is a
   deliberate restatement of the baseline in the same commit.
10. **Two net-new content commissions the disposition assumes.** A "how we help" sequence for the
    trade pages and related-reading links for the city pages. Both need copy that does not exist.
    Recommend DEFER: a figure may not invent a fact.
11. **Questions and answers on the 50 glossary pages.** Recommend NO. A glossary entry is already
    the answer to a question.
12. **The tick and numeral colours** (standing from phase 1). Phase 3 carries 8 distinct instances
    over roughly 140 route-instances; they are fixed mechanically against the agreed contract, so
    this gate only needs confirming, not re-deciding.

---

## 7. RISKS AND AMBIGUITIES

| # | Risk | Recommended resolution |
|---|---|---|
| 1 | **The acceptance test for the phase's headline item is broken, twice**, and a builder trusting it would rewrite a correct light tail on 50 glossary pages to chase a ground that is already right, and would still see failures after closing everything real. | Section 3: read `lastBand` as a VALUE against the exact pass/fail strings, cross-checked against `GROUNDS_BASELINE.md`'s per-route lists. The instrument fix is commissioned separately and is not Phase 3's to make; the gate must not wait on it. |
| 1b | **The tracked blocking number is wrong and the plan built on it would have been wrong with it.** 79 is really 29; `/glossary` 50 is an instrument artefact; and a whole second §9 metric, 46 routes of which are Phase 3's, is tracked nowhere. | `DESIGN_DELTA` §3a needs restating to 29 and widening to cover adjacency, by whoever owns that doc. Phase 3 must report "closes 25 of 29 plus 46 of 48 adjacency", never "closes most of the 79". |
| 2 | A builder follows `DISPOSITION_SLICE2.md` 7b.7 / 8b.5 and swaps the native `<details>` for the kit `FaqSection`. **262 FAQ answers leave the server HTML of 70 pages**, the build stays green, and the phase reports a standards win it did not make. | Correction 3 and every package's "Do NOT". The acceptance test is an HTTP count of `<summary>` and of answer text in the static HTML, not a code read. |
| 3 | A builder copies Property's `LeadCTAPanel` props along with the component and reintroduces "Fixed fees, quoted upfront" and "24-hour response" onto 70+ routes: **TD-18 and TD-13, the exact claims Phase 2 spent its larger half closing across 19 files.** | Correction 6, stated in WP-C2 and WP-C3. Add `grep -rn '24-hour\|guarantee\|Fixed fee' src/app/{locations,glossary,for}` == 0 to the manager's post-merge sweep, not just to each package. |
| 4 | Adding or removing anything around `NextStepOffer` on the 45 trade pages splits `next_step\|null\|null` from 109 into 64 + 45 and destroys a locked triple, mid-phase, on the family whose funnel history is the whole reason for the phase. | Section 1g: the file is read-only for C1, and the acceptance test asserts 109 and the null/null attributes, not just the id. |
| 5 | The `/for/[slug]` floor of 20 leans on a conditional personalisation component for its 20th link. An intent-arm change drops 45 links and no test notices. | Assert `/calculators/` present in the STATIC html of all 45 routes. The durable fix (make the calculator link unconditional template markup and let the component be a bonus) is a net-new link, so it is a link-floor RISE, not a fall, and is safe: recommend it, but it is not required for this phase to pass. |
| 6 | `.prose-blog` is now shared by 82 blog articles (phase 2), 50 glossary entries and 25 city pages (phase 3), and `.section-label` is unlayered with 6 consumers in phases 5 and 6. An unlayered rule beats its consumers' utilities, which has bitten this codebase four times. | `globals.css` is read-only for all four packages, stated in section 5. A package that thinks it needs a change there escalates; the manager makes it once, having enumerated all three families. |
| 7 | `locations/[slug]/data.ts` uses JSON-quoted keys, so the `slug:` grep that counts the other two data files returns **0** on it, which reads as "the data is gone". | Section 0 records the correct command. Same shape as the path-scoped-git-from-the-wrong-directory trap. |
| 8 | Four packages, four families, one shared `LeadCTAPanel` adoption. If each invents its own panel copy, the site ends with four different asks and four different footnotes. | The manager sets the panel copy once, before the packages start, from `src/lib/page-summaries.ts` conventions and the house rules, and hands the same three `proofPoints` to C1, C2 and C3. None of them are Property's. |
| 9 | TD-08 was recorded as fixed by the 2026-06-16 session and is live again, or was never fully swept. A "fix" that is not guarded will come back a third time. | WP-C3's acceptance greps are the guard, and they belong in the committed test suite, not only in the completion report. Prove the guard bites (T9) by reintroducing the string once and watching it go red. |
| 10 | 126 routes, 4 builders, one production server on port 3257 shared with two other agents. A rebuild mid-measurement makes every number in every report wrong. | Builders do not build and do not restart the server (T1). The manager builds serially and re-measures after each package, so a regression is attributable. |
