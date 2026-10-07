# UA2 receipt: second uplift round on the pharmacies hubs

2026-10-07. Answers R4 Part B (the parity verdict and its cheapest-fix list).
Four files touched, all inside the OWNS set. No build, no server start or stop,
no git command that writes, no subagent, no `packages/**` edit, no
`/calculators` (W7C owns it), no detail template (UB2 owns them), no other site.

## 0. The whole change set, enumerated

Every edit was made as an exact-string replacement with a uniqueness assertion,
so this list is the complete delta and the prose statement in section 5 rests on
it:

| # | file | edit |
|---|---|---|
| 1 | `services/page.tsx` | hero `py-16 sm:py-20` -> `py-20 sm:py-28` |
| 2 | `for/page.tsx` | hero `py-16 sm:py-20` -> `py-20 sm:py-28` |
| 3 | `for/page.tsx` | card grid `sm:grid-cols-2` -> `sm:grid-cols-2 lg:grid-cols-3` |
| 4 | `for/page.tsx` | card class `block border` -> `flex flex-col rounded-xl border` |
| 5 | `for/page.tsx` | `ArrowRight` affordance added per card (`aria-hidden`, no text), plus its `lucide-react` import |
| 6 | `blog/page.tsx` | `<Eyebrow>Browse by category</Eyebrow>` mounted on band 2 |
| 7 | all four | UA2 comment blocks: the declines, each naming its kit path |

No `href` was added, removed or altered anywhere. No component was unmounted.
No band was added or removed. Edit 6 is the only new visible string.

---

## 1. Per route: band map before/after, eyebrow count, components

### `/services`

| band | before (ground) | after (ground) |
|---|---|---|
| 1 | hero, **primary-950**, `py-16 sm:py-20` (281px measured, R4) | hero, **primary-950**, `py-20 sm:py-28` |
| 2 | "Service tiers" + `ServiceTiers`, **white** | unchanged, **white** |
| 3 | "All services" + `CoverageCards` in `ScrollGlowGroup`, **slate-50** | unchanged, **slate-50** |
| 4 | `LeadCTAPanel contained ground="white"`, **white** | unchanged, **white** |

Sequence `D W S W`, footer `slate-900`. No adjacent pair shares a ground; the
last band is light. Unchanged by this round, re-checked after it.
**Eyebrow count 1 -> 1.** Components adopted this round: none (section 2).

### `/for`

| band | before (ground) | after (ground) |
|---|---|---|
| 1 | hero, **primary-950**, `py-16 sm:py-20` (281px) | hero, **primary-950**, `py-20 sm:py-28` |
| 2 | 5 local linked cards, 2-up, **white** section / slate-50 cards | same 5 cards, **2-up then 3-up from `lg`**, `rounded-xl`, arrow affordance at the card foot, **white** / slate-50 |
| 3 | `LeadCTAPanel contained ground="slate"`, **slate-50** | unchanged, **slate-50** |

Sequence `D W S`, footer `slate-900`. No adjacent pair shares a ground; last
band light. **Eyebrow count 1 -> 1.**

### `/blog`

| band | before (ground) | after (ground) |
|---|---|---|
| 1 | hero, `Eyebrow onDark "Blog"`, **primary-950** | unchanged |
| 2 | category chips in `nav aria-label="Browse by category"`, **white** | **+ `Eyebrow "Browse by category"`**, **white** |
| 3 | `HubArticleList` in `ScrollGlowGroup`, **slate-50** | unchanged |
| 4 | `LeadCTAPanel contained ground="white"`, **white** | unchanged |

Sequence `D W S W`, footer `slate-900`. Clean. **Eyebrow count 1 -> 2.**

### `/blog/[category]` (5 live slugs)

| band | before (ground) | after (ground) |
|---|---|---|
| 1 | hero, `Eyebrow onDark "Blog"`, **primary-950** | unchanged |
| 2 | `HubArticleList` in `ScrollGlowGroup`, **white** | unchanged |
| 3 | `LeadCTAPanel contained ground="slate"`, **slate-50** | unchanged |

Sequence `D W S`, footer `slate-900`. Clean. **Eyebrow count 1 -> 1.**
No functional change on this route; the reason is written in the file head and
summarised in section 3.

---

## 2. Components adopted, with props

| component (kit path) | route | props / detail |
|---|---|---|
| `design/primitives/page-blocks.tsx:43` `Eyebrow` | `/blog` band 2 | no props (light ground), text `"Browse by category"` - the nav's own `aria-label` on the same band, verbatim |
| `lucide-react` `ArrowRight` (not a kit component; the site's own recipe at `src/app/page.tsx:708`) | `/for` band 2, 5 cards | `aria-hidden` wrapper span, `h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5`, `text-primary-950`, pinned with `mt-auto pt-4` |

That is the honest total: **one kit component newly mounted, plus one in-site
affordance recipe reused.** Brief item 3 asked for two more illustrative kit
components per hub; the data does not carry them, and every candidate is
declined at source in section 3 rather than fudged.

### Card-affordance status after this round (brief item 1)

| card wall | component | affordance at rest / on hover / on focus |
|---|---|---|
| `/services` band 3 | kit `CoverageCards` | whole card is an `<a href>` (`CoverageCards.tsx:103-111`); `hover:shadow-[0_18px_40px_-28px_rgba(15,23,42,0.4)]` + `transition-shadow duration-200` (:91,109); local `focusRing` (:110) |
| `/for` band 2 | local `<Link>` cards | whole card links; `hover:border-primary-950 hover:shadow-md transition-all` + `group-hover:text-primary-950` on the title (pre-existing); **new** arrow at the card foot that slides on hover; `focusRing` |
| `/blog` band 3, `/blog/[category]` band 2 | kit `HubArticleList` | whole card links; `hover:ring-primary-600 hover:shadow-md transition-all` (`HubArticleList.tsx:82`); `focusRing` (:86) |
| `/blog` band 2 | chips | `hover:border-slate-400`, `focusRing` |

**No bare prose box remains on any of the four routes.** R4's "prose-box card
walls with no affordance" was read off static 1440 screenshots; the hover and
focus treatments were already in the class strings on three of the four walls.
What was genuinely missing was an **at-rest** mark, and `/for` now has one.
`/services` cannot get one from the call site (section 3).

### Contrast rows for the one new paint

| foreground | ground | ratio | floor | verdict |
|---|---|---|---|---|
| `primary-950` `#0f3a4a` arrow (graphic, `aria-hidden`) | card `slate-50` `#f8fafc` | 11.64 | 3.0 | PASS |
| `Eyebrow` light branch slate-600 `#475569` | band `white` | 7.58 | 4.5 | PASS |
| `EyebrowRule` mark primary-600 `#1c8fb6` (graphic) | band `white` | 3.71 | 3.0 | PASS |

Both rows are reuses of rows UA already measured on these exact pairs, not new
grounds (binding rule 7). No raw hex entered: every colour is a declared token
step or a utility on this site's ramp. No new focusable element was added, so no
new ring was needed; the `/for` cards keep the local `focusRing` recipe.

---

## 3. Declines, each written at the call site naming the kit path

| decline | written at | reason |
|---|---|---|
| `CoverageCards` `glow` (`CoverageCards.tsx:81,88`) | `services/page.tsx`, "All services" band | the glow surface hardcodes `rgba(5,150,105,0.28)` / `rgba(5,150,105,0.4)`, a green drop shadow no call site can repoint. The brand glow this site owns arrives via `ScrollGlowGroup`, which reads `--brand-glow-deep`. Brief item 1 names "href + glow"; the href half is already taken, the glow half is a kit colour defect |
| `CoverageCards` `icon` (`:23`) | same | `LucideIcon` **per item**; the 8 services publish no glyph in `src/data/pharmacies-services.ts`, so 8 glyphs would be chosen here. Editorial |
| arrow / trailing mark inside `CoverageCards` | same | the component renders its card internals and exposes no children, trailing slot or per-item attribute prop. **Kit ask for the manager**, alongside the per-item `data-cta` gap phase 3 already logged |
| `CoverageCards` on `/for` (`:118`) | `for/page.tsx` card band | hardcoded `<h3>` with no prop; this band has no intervening `<h2>` (the 5 cards ARE the h2s), so adopting gives an h1 -> h3 skip. `Eyebrow` is a `<p>` (`page-blocks.tsx:52`), not a heading. **Kit ask: a `titleAs` prop** |
| `ProcessTimeline` (`ProcessTimeline.tsx:29`) | `/services`, `/for`, `/blog/[category]` | needs `{n,title,body}` steps. No route publishes step copy. The only step set on the site is `pharmacies/niche.config.json` `entity.howItWorks` (4 strings) and `grep -rn howItWorks pharmacies/web/src` = **0** - no route renders them, so mounting them publishes prose the site does not currently print. Authoring by relocation. Generalist's timeline is fed a written `STEPS` const |
| `DrawnTickList` (`DrawnTickList.tsx:33`) | `/services`, `/for` | the only claim-shaped lists are the card bodies (each inside an `href`; tick rows are plain text and would drop 8 of 18 and 5 of 15 floor links) and `src/config/service-tiers.ts` `features`, which kit `ServiceTiers` already renders as tick rows one band above. A second list of the same strings is a duplicate |
| `PromptMarquee` | `/services`, `/for`, `/blog/[category]` | `Prompt` = `{tag, text, icon}`: needs first-person prompts **and** a `LucideIcon` each, and its docstring requires an even, unattributed set. Restating the per-slug FAQ questions as first-person lines is writing |
| `ComparisonTable` | same | needs `rows`, `generalLabel`, `generalCaption`, `ourCaption` - a written "them against us" set this site publishes nowhere |
| `TopicSection` (`:40-41`) | `/services`, `/blog/[category]` | requires an authored `eyebrow` **and** `title` per band, and its own prop doc forbids the eyebrow repeating the heading |
| `StatsCounter` | `/services`, `/for` | unchanged from UA: figures exist per service / hub **slug** only, consumed by the detail templates, and no record carries a source URL for `StatItem.href` |
| `Eyebrow` on `/blog` band 3 (the library) | `blog/page.tsx` head | publishes no heading, label or `aria-label`. Property's label for that band is the written string "The archive" (`Property/web/src/app/blog/page.tsx:231`), which is the point |
| `Eyebrow` on `/blog/[category]` band 2 | `blog/[category]/page.tsx` head | the only label available is `cat.name`, which is this route's h1 verbatim |
| `Eyebrow` on the `LeadCTAPanel` on all four routes | `/services`, `/for` band comments | the kit default is `"Free consultation"` (`LeadCTAPanel.tsx:18`), a commercial claim this site publishes on no route. Held at `eyebrow=""` by locked rule 9. The brief permits a kit default label; this particular default is a claim, so it goes to the owner rather than being taken on a brief |
| `BlogListWithSearch`, `BlogCategoryHub`, `NumberedPagination` | both blog files | UA's declines stand **verbatim**, not overwritten; K-A has not landed |

### Brief item 2 (eyebrows, "4 or more per hub") is NOT met, and cannot be honestly

`/blog` went 1 -> 2 on a label the route already prints. The rest is arithmetic:
`/services` has 4 bands, `/for` and `/blog/[category]` have 3. The only labels
these routes publish are their own route words and their own h2s, and an eyebrow
fed its own heading prints the heading twice. Reaching 4 means four written band
labels, exactly what R4 itself routed to the owner (**Part B item 2**: "the owner
supplies four short band labels"). It stays there. Property's own density comes
from authored labels ("Essential guides", "Browse by topic", "The archive",
"Free tools") - that is the whole difference, and it is a copy decision.

---

## 4. R4 Part B, line by line

| R4 Part B item | this round |
|---|---|
| 1. hub card walls are paragraph boxes, no affordance | **answered.** `/for` gets an at-rest arrow and loses the dead half-row; `/services`, `/blog`, `/blog/[category]` are already kit card walls with linked cards, hover and focus treatments, measured and tabled in section 2. Icon-per-card and `glow` declined with the kit defect named |
| 2. eyebrow density 1 per hub against 4-6 | **not met, escalated.** `/blog` 1 -> 2 from a printed string; the rest needs owner copy, as R4 concluded |
| 3. `/services` and `/for` heroes at 281px | **taken.** `py-16 sm:py-20` -> `py-20 sm:py-28` on both, two tokens each, no copy |
| 4. illustrative kit components, 4 against Property's 12 | **not moved.** Six candidate components checked at source; every one needs copy this site does not publish. The honest count stays 4 distinct. R4's own N4 says the STATE.md line should read 4, not 12 |

Out of scope for this round, left alone: N1 (widget opener, `layout.tsx`), N2/S1/S7
(`globals.css`, `page.tsx`, research pages), N3 (`NextStepOffer` mount on the
detail templates), `/calculators`.

---

## 5. Acceptance checks

- **`npx tsc --noEmit`** -> **no output, clean.** (First run showed four
  `ScrollGlowGroup` errors in `src/app/services/[slug]/page.tsx`, a UB2 file
  mid-edit; the re-run moments later was clean. Zero errors in any UA2 file on
  either run.)
- **`npx vitest run`** -> `Test Files 8 passed (8)` / `Tests 86 passed (86)`,
  duration 3.95s. The brief's baseline is 83 on 7 files; the extra file and 3
  tests arrived from another agent in this session. **No failures.**
- **Prose multiset.** From the enumerated delta in section 0: the only visible
  string added anywhere is `"Browse by category"` on `/blog`, a second
  occurrence of the string that route already prints as the accessible name of
  the nav immediately below it. No sentence, heading, FAQ, figure, label or
  button text was written, rewritten, moved between routes or deleted. The
  `ArrowRight` is `aria-hidden` and carries no text. Declared side effect: a
  screen reader meets "Browse by category" twice on `/blog`, once as the eyebrow
  and once as the nav's name; deleting the `aria-label` to avoid that would
  remove an accessible name to buy a cosmetic win, so it was not taken.
- **Link floors.** Held by construction: no `href` added, removed or altered in
  any of the four files. `/blog` 68 >= 37, `/services` 52 >= 18, `/for` 46 >= 15
  (R4's measured counts) are unaffected by a padding step, a grid breakpoint, an
  `aria-hidden` icon and an `Eyebrow`.
- **Grounds.** Re-read after the edits and tabled in section 1: `adjacentSame`
  0 and `darkOnDark` 0 on all four routes, every route still ending light into
  the `slate-900` footer. No band was added or removed, so the sequences are the
  ones UA left.
- **Raw hex / tokens.** No colour literal entered; the one new paint is
  `text-primary-950` on a `bg-slate-50` card.

Needs the manager's build (none run here; `:3111` serves the pre-UA build):

1. DOM measure at 1440: `/services` and `/for` hero height, expect ~340-360px,
   up from 281.
2. `/for` at 1440: 3 cards in the first row, 2 in the second, an arrow visible
   at the foot of each of the 5 cards at rest.
3. `/blog` eyebrow count 2, `/services` `/for` `/blog/[category]` 1.
4. `--grounds` re-run on the four routes: `adjacentSame` 0, `darkOnDark` 0.
5. `curl` link floors, assert `>=` the four numbers R4 measured.

## 6. For the manager

- **Two one-line kit edits would close what this round could not**, both in
  `packages/web-shared/design/marketing/CoverageCards.tsx`: a `titleAs` prop
  (unblocks the component on `/for`, closing the last local card wall) and a
  per-item trailing slot or attribute prop (unblocks both the at-rest arrow and
  the per-item `data-cta` phase 3 logged). A third, `glow`'s hardcoded green
  `rgba(5,150,105,...)` at `:88`, is a brand defect for every site that calls it.
- **Eyebrow density is an owner copy decision**, not an engineering one. Four
  short band labels (`/services` x2, `/for` x1, `/blog` x1) would take all four
  hubs to R4's 4-6 range in one pass. R4 asked for the same thing.
- **`"Free consultation"`** is the kit `LeadCTAPanel` default eyebrow. The brief
  permits kit defaults; this one is a commercial claim, so it is an owner yes/no,
  not a brief item. A yes adds one eyebrow to every route on the site.
- **Illustrative-component parity with Property is a content gap**, not a port
  gap: six kit components were checked at source and each needs copy this site
  has never published. `entity.howItWorks` in `niche.config.json` is the nearest
  thing to step copy and **no route renders it today** - if the owner wants it
  published, `ProcessTimeline` on `/services` is where it goes and the count
  moves to 5.
