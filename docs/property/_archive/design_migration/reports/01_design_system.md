# Report 01 - The design system the designer built

Written 2026-08-22. Read-only investigation. Nothing outside `tmp/design_migration/` was
touched.

**Purpose.** This is the reference an implementer works from when applying the designer's
system to pages the designer never saw (`/cost-of-selling-a-property`, `/leasehold`,
`/landed-estates`, `/landlord-compliance`, `/for-letting-agents`, `/blog/property-finance`),
without opening `Property_zip`.

**Path convention in this report.**
- `ZIP/…` = `tmp/design_migration/Property_zip/…` (designer snapshot, read-only)
- `MONO/…` = `Property/…` (canonical monorepo)

**Verification legend.** Every claim is tagged:
- **[V]** verified - I read the file at the cited line, or ran the command.
- **[I]** inferred - reasoned from what I read, not observed rendering. No browser was run.
- **[D]** designer's assertion - stated in their docs, cited, not independently confirmed.

Nothing in this report was verified in a browser. Where rendering matters, it says so.

---

## 0. The one-paragraph summary

Emerald on slate-900 navy, Plus Jakarta Sans everywhere, sentence case, `rounded-xl` on
every surface, one shared container gutter, alternating section grounds, one solid-emerald
primary CTA per surface, one form per page sitting on a light surface, and motion that
draws once on scroll and then stops. Everything reusable lives in
`ZIP/web/src/components/ui/layout-utils.ts` - the standing instruction is **use the
constants, never retype the class string** (`ZIP/web/DESIGN_GUIDELINES.md:8-9` [V]).

---

## 1. The design system spec

### 1.1 Colour roles and exact tokens

Source: `ZIP/web/DESIGN_GUIDELINES.md:12-26` [V].

| Role | Exact value | Rule |
|---|---|---|
| Primary action | `emerald-600`, hover `emerald-700`, active `emerald-800` | Buttons and primary links only |
| Ground, dark ("navy") | `slate-900` | Heroes, closing panels, footer, testimonial bands |
| Ground, cream | `#fbfaf7` via `heroCreamSurface` | One-off value. **Never retype the hex** - `ZIP/web/src/components/ui/layout-utils.ts:47` [V] |
| Ground, light | `white` / `slate-50` | Consecutive sections must not share a ground |
| Ink on light | `slate-900` heading, `slate-600`/`slate-700` body | |
| Ink on dark | `white` heading, `slate-200`/`slate-300` body | `Prose onDark` deliberately uses `slate-300`, not white: a full-white paragraph under a white h2 flattens the hierarchy - `ZIP/web/src/components/ui/page-blocks.tsx:6-12` [V] |
| Negation / risk | `rose` (`text-rose-600`) | Site-wide since session 9. "What goes wrong", never decoration - `ZIP/CONTEXT_SUMMARY_SESSION9.md:200-221` [V] |
| Freshness accent | `emerald-50` bg + `emerald-700` text pill | Blog "Updated {date}" only |
| Icon badge, light | `bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100` | `DESIGN_GUIDELINES.md:154` [V] |
| Icon badge, dark | `bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30` | `DESIGN_GUIDELINES.md:155-156` [V] |
| Inline link, light | `text-emerald-700` | `page-blocks.tsx:68` [V] |
| Inline link, dark | `text-emerald-400` | emerald-700 on slate-900 is ~1.9:1, unreadable - `page-blocks.tsx:48-53` [V] |

**Not palette members, do not reuse:**
- `bg-blue-600` on the homepage hero primary. It is an A/B experiment variant carrying
  `data-cta="hero_book"`. Do not copy it elsewhere and do not "fix" it -
  `DESIGN_GUIDELINES.md:24-26` [V]; present in both trees:
  `ZIP/web/src/app/page.tsx:292` [V] and `MONO/web/src/app/page.tsx:331` [V].
- `#818cf8` → `#fb923c` (the Double Wired Creative gradient). Reserved for the footer
  credit alone - `DESIGN_GUIDELINES.md:46-48` [V]. See §6.

**Solid emerald fills are for buttons, never badges** - `DESIGN_GUIDELINES.md:157` [V].

**CSS custom properties are unchanged.** The designer added no `:root` variables. The whole
token block (`--emerald-*`, `--slate-*`, `--radius`, `@theme inline`) is byte-identical to
ours: `MONO/web/src/app/globals.css:11-116` vs `ZIP/web/src/app/globals.css:10-115` [V]
(`diff -u` produces no hunk between lines 5 and 214).

### 1.2 The radius trap (verified token-level; consequence inferred)

The guide says `rounded-xl` on cards, buttons, inputs, images and panels
(`DESIGN_GUIDELINES.md:167-168` [V]). But `@theme inline` redefines the radius scale in
both trees:

```
--radius: 0rem;                        MONO/web/src/app/globals.css:70   [V]
--radius-sm: calc(var(--radius) - 4px) MONO/web/src/app/globals.css:111  [V]
--radius-md: calc(var(--radius) - 2px) MONO/web/src/app/globals.css:112  [V]
--radius-lg: var(--radius)             MONO/web/src/app/globals.css:113  [V]
--radius-xl: calc(var(--radius) + 4px) MONO/web/src/app/globals.css:114  [V]
```

Identical in `ZIP/web/src/app/globals.css:69,110-113` [V].

In Tailwind v4 the `rounded-*` utilities resolve through the `--radius-*` theme namespace,
so on this site **`rounded-xl` renders 4px, not the stock 12px; `rounded-lg` renders 0px;
`rounded-md` renders a negative value (clamped to 0)** [I - token values verified, rendered
radius not measured in a browser].

Consequences for the port:
- The designer's "square corners swept out, everything is `rounded-xl`" sweep is in
  practice a **0px → 4px** change, not 0px → 12px. Example: `LeadForm`'s field class went
  `rounded-lg` → `rounded-xl`, which is exactly 0px → 4px -
  `MONO/web/src/components/forms/LeadForm.tsx:16` vs
  `ZIP/web/src/components/forms/LeadForm.tsx:16` [V]. Same single-token change in
  `ui/input.tsx` (`rounded-md` → `rounded-xl`) [V].
- If the owner expects visibly rounded cards, the lever is `--radius` / `--radius-xl` in
  `globals.css`, **not** editing component class strings. Changing it is site-wide and
  needs its own QA. Flag, do not act.
- `rounded-full` (eyebrow rule, meta pills, carousel dots) is unaffected - it is a literal
  `9999px`, not a theme var [I].

### 1.3 Typography

Source `DESIGN_GUIDELINES.md:50-77` [V] and `CLASS_NAMING_CONVENTIONS.md:58-70` [V].

- **Face**: Plus Jakarta Sans via `next/font/google`, the only face on the site.
  Confirmed in our tree: `MONO/web/src/app/layout.tsx:2,16-17,85` [V], wired as
  `--font-sans` at `MONO/web/src/app/globals.css:115` [V].
- **`font-serif` is banned** - last uses removed by the designer 2026-08-20
  (`DESIGN_GUIDELINES.md:54`, `ZIP/CONTEXT_SUMMARY_SESSION11.md:83-85` [V]).
  **Still present in our tree**, 20+ occurrences across
  `MONO/web/src/app/{privacy-policy,cookie-policy,terms}/page.tsx`,
  `MONO/web/src/app/not-found.tsx:9`, and a decorative quote glyph at
  `MONO/web/src/app/page.tsx:590` [V]. See §6 - this is a policy call, not a drive-by.

| Element | Recipe |
|---|---|
| Section `h2` | `text-2xl font-bold text-slate-900 sm:text-4xl`, sentence case always |
| Page hero `h1` | `text-4xl sm:text-5xl lg:text-6xl` (homepage `lg:text-7xl`) |
| Article `h1` | `text-3xl sm:text-4xl md:text-5xl` |
| Card heading, standard | `text-base sm:text-lg font-bold text-slate-900` |
| Card heading, compact | `text-sm sm:text-base font-bold text-slate-900` (dense 4-up grids) |
| Card body | `text-sm sm:text-base` (compact tier: `text-xs sm:text-sm`) |
| Standfirst / summary | `text-base leading-7 text-slate-600` - body size, looser leading, **never `text-lg`** |
| Blog card article titles | `font-bold! tracking-normal! leading-snug!` at the card tiers - important modifiers REQUIRED, see §4 |

**`text-xl` on a card heading is banned**: it outsizes the `h2` above it and breaks the
page hierarchy - `CLASS_NAMING_CONVENTIONS.md:69-70` [V].

**Weights**: `font-bold` headings/buttons/card titles; `font-semibold` form labels and small
emphasis; `font-medium` quiet UI (pagination captions, sort labels). Nothing heavier than
bold - `DESIGN_GUIDELINES.md:63-66` [V].

### 1.4 Eyebrows

`Eyebrow` from `ZIP/web/src/components/ui/page-blocks.tsx:35-46` [V] is the **only**
pre-header treatment. Exact recipe (line 38):

```
mb-3 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-wide sm:text-xs
```
plus `text-slate-500` on light, `text-slate-300` when `onDark`.

- It carries its own `mb-3`, so the heading beneath needs **no top margin** [V, line 38].
- The mark is `EyebrowRule` - a 24px emerald bar (`h-0.5 w-6`, `bg-emerald-600`, or
  `bg-emerald-400` on dark) that draws left-to-right on first scroll into view -
  `ZIP/web/src/components/ui/EyebrowRule.tsx:47-59` [V].
- **Do not hand-roll uppercase labels.** The old recipe (bold + widest tracking + saturated
  emerald on the text) was rejected as reading louder than the heading it introduces -
  `page-blocks.tsx:25-33` [V], `ZIP/CONTEXT_SUMMARY_SESSION3.md:36-48` [D].
- **In-card labels and footer column headings are NOT eyebrows** - an eyebrow's rule has
  nothing to align against inside a card - `ZIP/CONTEXT_SUMMARY_SESSION3.md:58-66` [D].
- Don't repeat the eyebrow's words in the heading directly beneath it -
  `DESIGN_GUIDELINES.md:85-86` [V].
- Every section gets an eyebrow + h2 [D, `SESSION3.md:199-202`].

### 1.5 Containers

All from `layout-utils.ts`. Every one carries the identical gutter
`mx-auto w-full px-4 sm:px-6 lg:px-8 min-w-0` - **the horizontal page gutter is always this
triple, never ad-hoc** (`DESIGN_GUIDELINES.md:178-179` [V]).

| Constant | Max width | Use | Line |
|---|---|---|---|
| `siteContainer` | `max-w-5xl` | Narrower utility pages | `layout-utils.ts:3-4` [V] |
| `siteContainerLg` | `max-w-6xl` | **The default**: most sections, blog, hubs | `layout-utils.ts:6-7` [V] |
| `siteContainerXl` | `max-w-7xl` | Wide layouts (article grid + sidebar) | `layout-utils.ts:9-10` [V] - **new**, not in our tree |
| `contentNarrow` | `max-w-3xl` | **RESERVED for hero paragraphs only** | `layout-utils.ts:12-13` [V] |

**Hero copy** sits in a `max-w-3xl` block INSIDE the section container. **Body copy runs the
full container.** Session 10 removed every mid-page `max-w-3xl` box; do not reintroduce them
- `DESIGN_GUIDELINES.md:188-189` [V], `ZIP/CONTEXT_SUMMARY_SESSION10.md:164-168` [V].

### 1.6 Vertical rhythm

Source `DESIGN_GUIDELINES.md:192-200` [V], constants at `layout-utils.ts:15-17` [V].

| Context | Padding |
|---|---|
| Standard section | `py-16 sm:py-20` |
| `sectionY` constant | `py-12 sm:py-16 md:py-20` |
| `sectionYLoose` constant | `py-16 sm:py-20 md:py-24 lg:py-28` |
| Page hero | `py-10 sm:py-12 lg:py-14`, `min-h-[350px]`, `flex items-center` |
| `LeadCTAPanel` full-bleed | `py-12 sm:py-20 lg:py-24` (verified in code: `LeadCTAPanel.tsx:84` [V]) |
| `LeadCTAPanel` contained | `py-12 sm:py-16 lg:py-20` (`LeadCTAPanel.tsx:62` [V]) |
| `FaqSection` default | `bg-white py-12 sm:py-16 lg:py-20` (`FaqSection.tsx:16` [V]) |

- Grounds alternate white / slate-50 / navy. **Consecutive sections never share a ground.**
- **Every in-page anchor target carries `scroll-mt-24`** (96px, clears the sticky header).
- Card surface must contrast with its ground - that is what the `tone` props are for
  [D, `SESSION5.md:262-264`].
- `#fff` vs `#f8fafc` is invisible at scroll speed: alternating white/slate-50 alone does
  not break up a long page, you need a device change too [D, `SESSION6.md:108-111`].

### 1.7 Padding inside surfaces

`DESIGN_GUIDELINES.md:204-212` [V]:

| Surface | Padding |
|---|---|
| Grid/feature cards, TOC card | `p-5 sm:p-6` (blog card link areas `p-6`) |
| Archive list cards | `p-6 sm:p-7` (loosened 2026-08-21) |
| White form card in a navy panel | `p-6 sm:p-8`, `LeadCTAPanel` goes `lg:p-10` (verified `LeadCTAPanel.tsx:169` [V]) |
| Navy panels/sections | `p-6` (sidebar) / `p-8 sm:p-10` |
| Contained `LeadCTAPanel` card | `p-6 sm:p-10 lg:p-14` (verified `LeadCTAPanel.tsx:64` [V]) |
| Chips (calculator bridge, other-topics) | `px-5 py-3`, `min-h-12` |
| Meta pills | `px-3 py-1`, `min-h-7` |
| `CardStack` / `CardCarousel` cards | `p-6 sm:p-8` (`page-blocks.tsx:97` [V], `CardCarousel.tsx:210` [V]) |

### 1.8 Margins and gaps

`DESIGN_GUIDELINES.md:216-226` [V]:

- **Grid gaps**: cards `gap-4 sm:gap-6`; chip rows `gap-3`; meta-pill rows `gap-2`;
  CTA button pairs `gap-3 sm:gap-4`; pagination `gap-1.5 sm:gap-2`.
- **Section header**: `Eyebrow` carries `mb-3`; h2 → standfirst `mb-2`; standfirst →
  content `mb-8`.
- **Within a card**: label → title `mt-3`; title → summary `mt-3`; summary → meta row
  `mt-4`; grid cards use an `mt-3 mb-5` wrapper with the meta row pinned by `mt-auto`.
- **Hero**: breadcrumb → h1 `mt-6`; h1 → standfirst `mt-4`; standfirst → CTA row
  `mt-6 sm:mt-8`.
- **Article template**: `mt-16` between the major blocks (form, FAQ, author box, related).
- **Bottom-align repeated card affordances with `mt-auto`**, or a row of six emerald rules
  lands at six heights and the grid stops reading as a set [D, `SESSION5.md:208-211`];
  implemented at `CardCarousel.tsx:232` [V].

### 1.9 Card anatomy

Canonical implementation to copy: `CardStack` (`page-blocks.tsx:82-104` [V]) and
`CardCarousel`'s card (`CardCarousel.tsx:205-237` [V]).

```
rounded-xl  +  surface (bg-white on slate ground / bg-slate-50 on white ground)
  ├─ icon badge      h-11 w-11 rounded-xl, light or dark badge palette, mb-4
  │                  lucide icon h-5 w-5 strokeWidth={1.75} aria-hidden
  ├─ h3              text-base sm:text-lg font-bold text-slate-900   (compact: text-sm sm:text-base)
  ├─ p               mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-slate-700
  └─ link/meta       mt-auto, text-sm font-semibold text-emerald-700 underline underline-offset-2
  padding            p-6 sm:p-8 (stack/carousel) or p-5 sm:p-6 (grid cards)
```

Two hard rules:
- **`next/link` renders an inline `<a>`.** Any card-shaped link needs `flex` or `block`, or
  padded anchors in a `space-y-*` stack overlap [D, `SESSION3.md:325-328`].
- **`line-clamp-*` and `flex-grow` must not share an element.** Put `flex-grow` on a wrapper;
  a stretched clamped box shows the clamped lines past the ellipsis again -
  `DESIGN_GUIDELINES.md:287-289` [V].

Column count is not a rule: 40-60 word bodies become ribbons at 3 columns, ~20 word bodies
do not. Look at the rendered page rather than applying a default [D, `SESSION7.md:100-111`
vs `SESSION6.md:112-116` - the two pages resolved in opposite directions].

### 1.10 Button variants - when to use each

All in `ZIP/web/src/components/ui/layout-utils.ts` [V]. Shared traits: `rounded-xl`,
`min-h-12` (48px), `font-bold`, `px-8 py-3.5 text-base`, visible focus ring,
`transition-all duration-150`.

| Constant | Line | Look | Use when |
|---|---|---|---|
| `btnPrimary` | 23-24 | Solid `bg-emerald-600`, white text, hover 700, active 800 | "The one action we want." **One primary per surface.** |
| `btnSecondary` | 27-28 | `border-2 border-emerald-600` on `bg-white`, `text-emerald-700` | Secondary action on a white/light ground |
| `btnOnDark` | 31-32 | `border-2 border-white/40 bg-white/5` + `backdrop-blur-sm`, white text, emerald-400 focus ring | Secondary action on a navy ground |
| `btnOnCream` | 55-56 | `border-2 border-slate-900` transparent, navy text, **inverts to navy fill on hover** | Secondary action on a `heroCreamSurface` hero. The cream counterpart of `btnOnDark` |
| `focusRing` | 19-20 | `focus-visible:outline outline-2 outline-offset-2 outline-emerald-600` | Every interactive element, including non-button links |

**Delta against our tree** (`diff MONO/web/src/components/ui/layout-utils.ts` vs ZIP [V]):
- `siteContainerXl`, `heroCreamSurface`, `btnOnCream` are **new**.
- `btnPrimary`, `btnSecondary`, `btnOnDark` were all **restyled**: our current versions are
  the "sharp" chunky treatment (`border-b-4 border-emerald-800`, `active:border-b-2
  active:translate-y-0.5`, no radius). The designer's are flat + `rounded-xl` with a plain
  `active:bg-emerald-800`. **This is a site-wide visual change on every CTA on the site,
  not a new utility** - see §3.
- Porting consequence: `MONO/web/src/app/page.tsx:331` overrides the blue variant with
  `border-blue-800 hover:border-blue-900` [V]. Those classes become dead once `btnPrimary`
  loses its bottom border. Strip them when porting or the blue hero button keeps a stray
  1px-ish border rule that no longer participates [I].

**Analytics contract on every CTA** (`DESIGN_GUIDELINES.md:95-98` [V]): `data-cta` (unique
snake_case), `data-cta-placement` (`hero`, `sidebar`, `calculator_bridge`,
`article_header`, …), and `data-cta-goal="form"` when it leads to a form. **A new CTA
without these is invisible to the funnel readouts.**

`CLASS_NAMING_CONVENTIONS.md:76-79` shows a `btnPrimaryBlue` constant as an example. **It
does not exist in the codebase** - grep finds zero references in either tree [V]. See §7.

### 1.11 Forms and lead capture

- **`LeadForm` is THE form.** Seven required fields. Field recipe
  (`MONO/web/src/components/forms/LeadForm.tsx:16` [V]):
  `mt-1 w-full min-h-12 touch-manipulation rounded-xl border-2 border-slate-300 bg-white
  px-3.5 py-3 text-base text-slate-900 shadow-sm focus:border-emerald-600
  focus:outline-none focus:ring-2 focus:ring-emerald-600/25 transition-colors`
  (`rounded-lg` in ours, `rounded-xl` in theirs - the only difference in the whole file
  besides two alert boxes [V]).
- Labels are `block text-sm font-semibold text-slate-900` -
  `MONO/web/src/components/forms/LeadForm.tsx:197,226,249,273,296,320,358` [V].
- **STANDING RULE: `LeadForm` must always sit on a white or light surface.** On a navy panel
  that means a white `rounded-xl` card inside the panel -
  `DESIGN_GUIDELINES.md:108-115` [V].
  **Confirmed broken in our tree today:** `MONO/web/src/components/blog/BlogPostRenderer.tsx:292`
  renders the enquiry section as `bg-slate-900 p-8 sm:p-10 text-white` and drops a bare
  `<LeadForm>` into it at line 302 [V]. Every article's primary conversion point has
  slate-900 labels on a slate-900 ground. This is live and independent of the port.
- **One form per page.** Calculator pages: exactly one, enforced session 10
  (`ZIP/CONTEXT_SUMMARY_SESSION10.md:180-192` [V]). Blog articles carry the closing enquiry
  form plus, on enabled topics, the data-informed resource-gate island; that pair is
  deliberate - `DESIGN_GUIDELINES.md:125-128` [V].
- **Anchors, never modals.** In-page conversion jumps are anchors to a `scroll-mt-24` target
  (`#book`, `#enquiry-form`, `#guides`) riding the global smooth scroll. A modal would put a
  second seven-field form in the DOM and the anchor costs zero JS -
  `DESIGN_GUIDELINES.md:100-104` [V].
- **No sticky bottom CTA.** Removed 2026-07-09 on 586-shown / 1-click data. Do not re-add -
  `DESIGN_GUIDELINES.md:103-104` [V], `ZIP/CONTEXT_SUMMARY_SESSION9.md:117-131` [V].
- **Copy pairing.** Any shoutout that quotes a form must render the form's own copy object,
  not a paraphrase (the blog sidebar CTA and the article enquiry form share
  `CTA_BY_CATEGORY`) - `DESIGN_GUIDELINES.md:129-130` [V].
- Forms post to `/api/leads/submit`, which is a 503 stub in the snapshot. Any end-to-end
  form claim sourced from the designer's repo is untrustworthy -
  `DESIGN_GUIDELINES.md:131-132` [V]. Ours is real.

### 1.12 Motion and reduced-motion posture

The canonical shape, stated five ways across the handoffs and confirmed in code:

1. A **client component's IntersectionObserver flips a `data-` attribute on the root** and
   nothing else; children stay server-rendered
   (`EyebrowRule.tsx:25-45` [V], `ScrollGlowGroup.tsx:47-74` [V]).
2. **Every keyframe and transition lives in `globals.css`**, behind
   `@media (prefers-reduced-motion: no-preference)` [V - every added block in §3 follows
   this].
3. The undrawn state is scoped to `[data-draw="off"]`, which is present in the **server**
   HTML, so no-JS is released by a `<noscript>` `<style>` block in the root layout -
   `ZIP/web/src/app/layout.tsx:91-102` [V].
4. Stagger is an inline `transition-delay` per item, not `:nth-child`, because item counts
   are data. (`card-glow` is the exception and uses `:nth-child` because its children are
   opaque server-rendered nodes - `globals.css` glow block [V].)
5. Transform and opacity only. No layout cost.
6. **Every failure mode lands in the SETTLED state** - reduced motion, missing
   `IntersectionObserver`, no JS. Never an empty box beside a promise
   (`EyebrowRule.tsx:28-31` [V], `ScrollGlowGroup.tsx:51-57` [V]).
7. **The observed node must not be the node you scale to zero.** `scaleX(0)` has zero area
   and can never reach a threshold; observe a stable-size wrapper -
   `EyebrowRule.tsx:12-17` [V].

**The only permitted loops** are the homepage marquee and the MTD "live pulse" dot. A pulse
that stops pulsing stops meaning "live", which is the entire content of the mark - that is
the whole justification, and it is not licence for other loops -
`DESIGN_GUIDELINES.md:236` [V], `ZIP/CONTEXT_SUMMARY_SESSION9.md:178-190` [V].

**Programmatic scrolls are instant, not smooth** (pagination page-change); anchor jumps ride
the global CSS smooth scroll, which the browser suppresses under reduced motion -
`DESIGN_GUIDELINES.md:237-238` [V]. Note `html { scroll-behavior: smooth }` at
`MONO/web/src/app/globals.css:135-139` [V] applies to programmatic scrolls too and has
already broken one screenshot harness [D, `SESSION8.md:52-77`].

**Any new animation needs its own `<noscript>` release line** in
`app/layout.tsx` [V, the block at lines 91-102 is a per-class list, so it does not
generalise].

### 1.13 Accessibility floors

`DESIGN_GUIDELINES.md:240-249` [V]:

- Tap targets ≥ 24×24 (WCAG 2.5.8); interactive controls typically `min-h-12` (48px). Only
  exception: the offscreen honeypot input.
- Anything on `slate-900` uses the `onDark` variant. Slate-600-on-navy has shipped as an
  invisible-text bug **twice** (calculator breadcrumbs session 1, LeadForm labels session
  11). If it sits on navy, check the contrast.
- `focusRing` on every interactive element; `aria-current="page"` on current nav/pagination;
  icons `aria-hidden` with text or `aria-label` alongside.
- **Zero horizontal overflow at 320 / 390 / 768 / 1024 / 1280 / 1600.** Re-verify after any
  layout work.
- Decoration is `aria-hidden` and the content underneath must survive without it
  [D, `SESSION5.md:266-267`].

### 1.14 Copy rules

`DESIGN_GUIDELINES.md:251-263` [V]:

- **No em or en dashes in visible copy.** Enforced: `MONO/web/src/lib/ai/qa-gate.ts:182`
  `if (/-|-/.test(allText)) failures.push("em_dash");` [V] - note it catches en dashes too.
  Rewrite with comma / colon / parentheses, or "to" for ranges ("£300,001 to £500,000").
  Verify the **rendered** HTML, not the source, and watch for `&mdash;` entities
  [D, `SESSION6.md:228-232`].
- Sentence case for headings. Title Case only for proper nouns and article titles.
- **Testimonials are anonymised by design** (role + portfolio shape, never names). The
  homepage "Sound familiar?" prompts are self-identification cues, not testimonials, and
  stay unattributed.
- Example/illustrative figures on visuals carry the fine-print asterisk (see §6).
- Category labels render via `categoryDisplayName()` from `src/lib/blog.ts`, never raw
  frontmatter.
- **Never invent a factual claim.** "A free 30-minute consultation" was removed because that
  duration exists nowhere in the codebase [D, `SESSION6.md:205-211`]. Never square off a
  layout row by inventing a figure; leave the asymmetry [D, `SESSION7.md:204-207`].

---

## 2. Structural rules, stated precisely

**R1 - The adjacency rule. Two navy fields must never touch.**
Stated at `DESIGN_GUIDELINES.md:118-123` [V] and again at `:198-199` [V]. Precisely:

> A full-bleed navy `LeadCTAPanel` (or navy testimonial band, or any `bg-slate-900`
> section) must never be the last section on a page, because the site footer is navy, and
> it must never sit directly adjacent to another navy band. Two dark fields with no light
> between them read as one undifferentiated slab.

Two permitted resolutions, no third:
1. Pass `contained` (+ `ground="slate"|"white"`) so the panel renders as a light grey card
   inset on a light section - `LeadCTAPanel.tsx:38-50, 60-79` [V]; or
2. Put a **light section between the panel and the footer**. The established tails:
   - generic calculator pages: panel → FAQ (`SESSION10.md:174-178` [V])
   - `/blog` index: panel → calculator bridge band (`SESSION11.md:56-61` [V])
   - blog category hubs: panel → slate-50 "Browse other topics" chip band
     (`SESSION11.md:136-140` [V])

`ground` exists for the second-order case: flip the contained section to `white` when the
section **above** it is already slate-50, so the panel still reads as its own band -
`LeadCTAPanel.tsx:45-50` [V].

**Known accepted exception:** the five bespoke calculator pages have no FAQ, so their panel
is last and does touch the footer. The owner saw this and accepted it -
`ZIP/CONTEXT_SUMMARY_SESSION10.md:174-178` [V]. Do not "fix" it without asking.

**R2 - One form per page.** §1.11. Mid-page asks are anchors to `#book`, never embedded
forms. Session 9 built inline `MiniCapture` blocks on three pages and removed them on
instruction; this is recorded as "will not do", not "not yet done" -
`ZIP/CONTEXT_SUMMARY_SESSION9.md:103-115` [V].

**R3 - One sticky wrapper per column.** `sticky top-24` + `max-h-[calc(100vh-7rem)]
overflow-y-auto` on the column wrapper. **Never nest sticky/scroll areas** -
`DESIGN_GUIDELINES.md:173-174` [V]. The blog sidebar's CTA card and TOC stick as one unit;
`TableOfContents` had its own sticky removed (`SESSION11.md:105-108` [V]).

**R4 - Consecutive sections never share a ground**, and grounds alternate
white / slate-50 / navy - `DESIGN_GUIDELINES.md:198-199` [V]. Corollary: **reordering
sections breaks the alternation**; retune the whole run plus every `tone` prop and every
`bg-white` card that would vanish [D, `SESSION4.md:239-243`].

**R5 - Six sections in a row must not share the same device.** A card pair is right twice
and wrong the third time. Plan the device budget across the whole page before building it
[D, `SESSION7.md:191-193`, `SESSION9.md:223-265`].

**R6 - One idea per block; each block is either text or figure.** A section reads as messy
when text and figure alternate inside it, not because it has figures
[D, `SESSION7.md:133-137`].

**R7 - Every anchor target carries `scroll-mt-24`**, and **check the anchor exists before
pointing a CTA at it** - `DESIGN_GUIDELINES.md:200` [V]; a live page shipped with `#book`
CTAs and no `id="book"` [D, `SESSION6.md:264-265`].

**R8 - Every primary CTA scrolls to the on-page form** (`href="#book"`, panel wrapped in
`<div id="book" className="scroll-mt-24">`). Explicit owner instruction
[D, `SESSION5.md:173-176`]. **A hero secondary CTA must not point at the FAQ**
[D, `SESSION5.md:163-164`].

**R9 - Prefer a prop on the shared component over a second component, and every new prop's
default must be the previous behaviour** so existing usages are byte-identical
[D, `SESSION3.md:335-338` and four later restatements]. Verified in code: `Eyebrow onDark`,
`Prose onDark`, `InlineLink onDark`, `Breadcrumb onDark`, `HeroBrickBackdrop tone`,
`CardStack columns`, `LeadCTAPanel contained|ground|redirectOnSuccess`, `FaqSection tone`,
`CardCarousel tone|autoplay|numbered`, `ScrollGlowGroup as|delay` - all default to the old
behaviour [V].

**R10 - Registry-derived counts.** Anything listing calculators derives from
`src/lib/calculators/registry.ts` and the count is `TOOLS.length`. Never hand-list tools,
never hand-type the count - `DESIGN_GUIDELINES.md:135-139` [V].

**R11 - `HeroBrickBackdrop` host contract.** The host section needs
`relative overflow-hidden` and the content needs `relative z-10`, or the texture paints over
the copy - `DESIGN_GUIDELINES.md:169-172` [V], enforced by construction at
`LeadCTAPanel.tsx:82-84` [V].

**R12 - `<noscript>` must live inside `<body>`.** React hoists `<link>` but not
`<noscript>`; as a direct child of `<html>` it throws. Recorded as a mistake already made
and fixed - `ZIP/web/src/app/layout.tsx:90` [V].

**R13 - Tailwind scans for literal class names.** `lg:grid-cols-${n}` compiles to nothing;
write the variants out in full [D, `SESSION5.md:108-109`]. Also relevant to the port: our
`globals.css` carries `@source "../../../../packages/web-shared";` and the designer's does
not (§3).

---

## 3. The `globals.css` delta

Measured: `MONO` 382 lines, `ZIP` 748 lines; `diff -u` = 391 lines across **three** hunks
[V]. Everything between line 5 and line 214 is identical - **no token, `@theme`, base-style
or `.prose-blog` rule was changed.**

### 3.1 Hunk 1 (lines 1-5): two changes, one of them a real regression

| Change | Verdict |
|---|---|
| UTF-8 BOM stripped from line 1 | Cosmetic. Ours has it (`MONO:1` [V]) |
| **`@source "../../../../packages/web-shared";` DELETED** | **⚠ SITE-WIDE BEHAVIOUR CHANGE. DO NOT PORT.** |

The `@source` line tells Tailwind v4 to scan the shared package for class names. The
designer removed it because `packages/web-shared` does not exist in their snapshot [I -
they never mention it; the deletion is consistent with the missing directory documented in
`CONTEXT.md` §5]. In the monorepo the package is real and its components' classes would
stop being generated. **Keep `MONO/web/src/app/globals.css:3`.**

### 3.2 Hunk 2 (line ~216): encoding fix

Our line 219 contains a mojibaked em dash (`colours â€” without`) inside a comment; theirs
is a correctly encoded U+2014 [V]. Comment-only, no rendering effect. Safe either way. (Note: em dashes in
comments are exempt from the copy rule.)

### 3.3 Hunk 3 (appended after line 379): +367 lines, all new, all additive

Grouped by purpose. Every one of these is a **new utility keyed off a class or a
`data-` attribute** - none of them changes an existing selector. Nothing in this hunk is a
site-wide behaviour change.

| # | Purpose | Selectors / keyframes added | Notes |
|---|---|---|---|
| 1 | Logo draw | `.logo-house path/polyline`, `@keyframes logo-draw`, `logo-draw-hover` | Runs on page load, replays on hover under `@media (hover: hover)`. **Not** guarded by `prefers-reduced-motion` - see §7 |
| 2 | Homepage vertical marquee | `@keyframes marquee-y`, `.marquee-track`, `.marquee-viewport:hover/:focus-within` pause, reduced-motion block turning the viewport into a plain scroll area | One of the two permitted loops. 33s linear infinite. Track holds the card set twice; `-50%` translate loops seamlessly, so **the prompt set must be an even count** |
| 3 | "Why choose us" numerals | `@keyframes num-glow` | Emerald text-shadow flare, settles to none |
| 4 | Client-tier card glow | `@keyframes card-glow`, `[data-glow="on"] > *` + `:nth-child(2|3|4)` delays 0.7 / 1.4 / 2.1s, `--glow-delay` var | 3.4s, owner-tuned. `:nth-child` beats the var, so a staggered row ignores `delay` |
| 5 | Eyebrow rule draw | `.eyebrow-rule`, `[data-draw="off"]` `scaleX(0)`, 600ms `cubic-bezier(0.22,1,0.36,1)` | The one every new page will use |
| 6 | Drawn ticks | `.tick-draw` `stroke-dashoffset` 24→0, 420ms | `DrawnTickList` |
| 7 | About-page story numerals | `.story-numeral`, `.story-numeral-rule` | Lit is the RESTING state; `[data-draw="off"]` is the unlit one |
| 8 | Penalty ladder | `.penalty-ladder-rail`, `-rail-v`, `.penalty-ladder-step` | Horizontal rail from `md` up, vertical rail on mobile |
| 9 | Section 24 rate wedge | `.rate-wedge-fill` | Both bars share one delay deliberately, so the reader compares two finished bars |
| 10 | Landlord profit stack | `.profit-stack-seg`, `.profit-stack-marker` | Marker animates opacity only, because it is centred with a static `-translate-x-1/2` |
| 11 | MTD live pulse | `.live-pulse-ring`, `@keyframes live-pulse` | **The one infinite loop.** Rests at `opacity: 0`, solid dot always painted, so reduced-motion and no-JS both leave a plain emerald dot |

Blocks 5-10 are all `[data-draw="off"]`-scoped and every one has a matching release line in
the `<noscript>` block at `ZIP/web/src/app/layout.tsx:91-102` [V]. Block 4 uses
`[data-glow]` and needs no release (its rest state is the finished state). Blocks 2 and 11
are pure CSS with no observer.

### 3.4 Site-wide behaviour changes that are NOT in `globals.css`

Flagged here because an implementer looking only at the CSS will miss them:

- **`btnPrimary` / `btnSecondary` / `btnOnDark` were restyled in `layout-utils.ts`** (§1.10)
  [V]. Every CTA on every page changes appearance. This is the largest single visual delta
  in the design system and it is one file.
- **`ui/accordion.tsx`**: `AccordionItem` went from
  `bg-slate-50 border-l-4 border-slate-300` (a left rule that turns emerald on open) to
  `rounded-xl bg-slate-50 border border-transparent` (a full emerald outline on open) [V].
  Affects every FAQ on the site.
- **`ui/input.tsx`**: `rounded-md` → `rounded-xl` [V].
- **`ui/Breadcrumb.tsx`**: gains `onDark`, and links gain `inline-block py-0.5` to take the
  hit area from 20px to 24px (WCAG 2.5.8) [V]. Purely additive.
- **`layout/PageShell.tsx`**: `startsWith("/embed")` → `startsWith("/embed/")`, so the
  `/embed` gallery gets header and footer back; plus a `nav` prop threaded to header and
  footer [V]. The `/embed` fix is a genuine bug fix, independent of design.

---

## 4. The unlayered `h1..h6` override

### 4.1 It exists in our tree. Verified.

`MONO/web/src/app/globals.css:155-159` [V]:

```css
h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
}
```

`grep -n "@layer" MONO/web/src/app/globals.css` returns **nothing** [V]. The file's only
at-rules are `@import "tailwindcss"` (line 2), `@import "tw-animate-css"` (line 4) and
`@theme inline` (line 86) [V]. Tailwind is `^4` (`MONO/web/package.json:46` [V]).

### 4.2 Why it wins

Tailwind v4's `@import "tailwindcss"` declares the cascade layers `theme, base, components,
utilities` and puts all generated utilities inside `utilities`. **Unlayered author CSS
outranks every layered rule regardless of specificity** - that is the defined behaviour of
CSS cascade layers, and unlayered styles sit at the top of the layer order. So a bare
`h1..h6` selector, specificity 0-0-1, beats `.leading-tight` for `line-height`. [I on the
cascade mechanics - this is spec behaviour, not something I ran; V on the file having no
`@layer`.]

### 4.3 Exactly what it defeats

Only these three properties, and only on `h1`-`h6` elements:

| Property pinned | Utilities silently defeated |
|---|---|
| `font-weight: 700` | every `font-*` weight utility except `font-bold`: `font-thin` `font-extralight` `font-light` `font-normal` `font-medium` `font-semibold` `font-extrabold` `font-black`, and arbitrary `font-[500]` |
| `line-height: 1.2` | every `leading-*`: `leading-none` `leading-tight` `leading-snug` `leading-normal` `leading-relaxed` `leading-loose` `leading-6` `leading-7` and arbitrary `leading-[1.15]` |
| `letter-spacing: -0.02em` | every `tracking-*`: `tracking-tighter` `tracking-tight` `tracking-normal` `tracking-wide` `tracking-wider` `tracking-widest` |

**Not affected**: `text-*` size utilities, colour, `text-balance`, everything else. And
`line-height` bundled into a `text-*` utility's shorthand is also defeated, because the
unlayered rule sets `line-height` directly [I].

**Escape hatch**: the `!` important modifier (`leading-snug!`), which is what the designer
used on the blog card titles - `DESIGN_GUIDELINES.md:280-286` [V],
`SESSION11.md:172-183` [V].

### 4.4 How much dead code we already carry

Counted over single-line `className` attributes on heading tags in
`MONO/web/src/**/*.tsx` [V]:

| Dead utility | Count |
|---|---|
| `font-semibold` on a heading | 53 |
| `leading-tight` | 19 |
| `leading-[1.1]`, `leading-[1.15]` | 2 |
| `tracking-wider` | 2 |
| `tracking-wide` | 1 |
| **Heading tags carrying at least one dead utility** | **76** |

Out of 401 heading tags with a single-line `className`. This is a **lower bound** - the
count excludes headings whose `className` spans multiple lines, which the regex cannot see
[V on the method, so the number is a floor not a total].

Concretely: 53 headings across the site are written `font-semibold` and render at 700.
Fixing the layering makes all 53 visibly lighter at once.

Also note `.prose-blog h2 { font-weight: 700 }` at `MONO/web/src/app/globals.css:195-203`
[V] - that rule is itself unlayered and specificity 0-1-1, so it survives the fix and blog
body headings will not move.

### 4.5 The proper fix, and the QA it requires

**Fix** (one edit, `MONO/web/src/app/globals.css:155-159`):

```css
@layer base {
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }
}
```

This puts the reset in Tailwind's `base` layer, where utilities correctly override it while
un-utilitied headings keep the house default. It is the minimal correct change.

**Do not** ship it as a drive-by. It re-activates ~76+ previously dead utilities in one
deploy. Required QA:

1. **Inventory first.** Regenerate the counts above including multi-line `className`
   attributes, and produce a per-route list of every affected heading. That list is the QA
   checklist, not a spot check.
2. **Decide per utility, not per file.** Some of those 53 `font-semibold` headings were
   written by someone who wanted semibold and never got it; others were copy-paste and the
   author expected bold. Both look identical today. Every one is a content decision.
3. **Visual diff every route at 390 and 1280** before/after. 46+ routes plus the blog
   article template (which reaches ~800 pages through one component) plus the nine hub
   templates. The hero `h1`s are the highest-risk: `leading-tight` and `leading-[1.15]`
   going live changes hero height on every page, which shifts the fold.
4. **Verify with `getComputedStyle`, not screenshots.** This is exactly how the designer
   found the bug - mid-session title changes were no-ops until computed styles were read
   (`SESSION11.md:177-183` [V]).
5. **Then remove the `!` workarounds** the designer shipped on the blog card titles, or
   they keep pinning `tracking-normal` / `leading-snug` and become invisible debt. Their
   final computed target is 700 / normal tracking / 1.375 leading
   (`SESSION11.md:273-274` [V]) - after the fix that has to be re-expressed as ordinary
   utilities and re-verified.
6. **Re-check zero horizontal overflow** at 320/390/768/1024/1280/1600, since letter-spacing
   changes on long headings.

**Recommendation:** do the fix, but as its own commit with its own QA pass, after the port
lands and before the port's own visual QA. Doing it during the port makes every heading
regression ambiguous between the two causes.

---

## 5. New shared UI primitives

Every one of these is **new** - absent from `MONO/web/src/components/{ui,layout}/` [V,
directory listing of both trees].

### `Eyebrow` - `ZIP/web/src/components/ui/page-blocks.tsx:35-46`
```ts
{ children: ReactNode; onDark?: boolean }
```
The only pre-header treatment. Server component. Carries `mb-3`. `onDark` lifts rule to
`emerald-400` and text to `slate-300`. Use above every section `h2`.

### `EyebrowRule` - `ZIP/web/src/components/ui/EyebrowRule.tsx:21`
```ts
{ onDark?: boolean }
```
`"use client"`. The 24px emerald mark inside `Eyebrow`. Split out so `page-blocks` stays
server-rendered - only this 24px span ships an observer. **You never call this directly**;
use `Eyebrow`. Degrades to drawn if `IntersectionObserver` is missing (lines 28-31).

### `Prose` - `page-blocks.tsx:13-23`
```ts
{ children: ReactNode; onDark?: boolean }
```
Body copy stack: `mt-6 space-y-4 text-sm sm:text-base leading-relaxed`, `text-slate-700`
light / `text-slate-300` dark. Use for topic and service page body copy.

### `InlineLink` - `page-blocks.tsx:55-74`
```ts
{ href: string; children: ReactNode; onDark?: boolean }
```
Emerald in-body cross-reference. **`onDark` is mandatory inside a `Prose onDark`** -
emerald-700 on slate-900 is ~1.9:1.

### `CardStack` - `page-blocks.tsx:82-104`
```ts
{ items: Array<{ title: string; body: string }>; tone?: "slate" | "white"; columns?: 1 | 2 }
```
Titled card stack. `tone` picks the card surface so it contrasts with its ground.
`columns={2}` is two-up from `md`, single below. Note: `mt-8 sm:mt-10` is baked in.
**Zero live usages as of session 10 - pending an owner keep/delete decision**
(`ZIP/CONTEXT_SUMMARY_SESSION10.md:271-278` [V]).

### `FaqSection` - `ZIP/web/src/components/ui/FaqSection.tsx:12-47`
```ts
{ eyebrow?: string;         // default "FAQ"
  title?: string;           // default "Frequently asked questions"
  faqs: FaqEntry[];
  className?: string;       // default "bg-white py-12 sm:py-16 lg:py-20"
  tone?: "slate" | "white" } // card surface; "white" when the section is slate-50
```
Single-open collapsible accordion in `siteContainerLg`. **Pair it with
`buildFaqPageJsonLd()` in the page** so markup and schema stay in sync (line 7-8).
Collapsing is SEO-free because the JSON-LD is emitted separately. This is the standard
light section that keeps a navy `LeadCTAPanel` off the navy footer.

### `ExampleFigureNote` - `ZIP/web/src/components/ui/ExampleFigureNote.tsx:22-30`
```ts
{ className?: string }
```
Renders `* Example figures displayed` at `text-[11px] leading-relaxed text-slate-400` with
an `aria-hidden` asterisk and an `sr-only` "Note: " prefix. **Owner instruction: it goes on
every visual carrying figures, statutory ones included.** One deliberate exclusion:
`StatsCounter`. See §6.

### `CardCarousel` - `ZIP/web/src/components/ui/CardCarousel.tsx:51-83`
```ts
{ items: CarouselItem[];    // { title, body, icon?, href?, linkLabel? } - href and linkLabel both or neither
  tone?: "slate" | "white";
  label: string;            // required, becomes aria-label on the carousel group
  numbered?: boolean;       // position badge instead of icon; ignored on cards with an icon
  autoplay?: boolean }      // 6.5s rotation, opt-in
```
`"use client"`. Horizontal version of `CardStack` for sets that would otherwise make a very
long column. Native scroll + CSS scroll-snap, **not** a transform slider, so swipe,
trackpad, keyboard and screen-reader scrolling all work and every card stays in the DOM in
order (lines 41-50). Icons are addressed **by name** through the `ICONS` registry
(lines 21-27) because a function prop cannot cross the server/client boundary; adding a
card icon means adding a key there. Autoplay guards: no motion under
`prefers-reduced-motion` (150-157), pause on hover / keyboard focus / hidden tab, and a
**permanent** stop the moment anyone works an arrow, a dot or a card link (146-147).
**Known WCAG 2.2.2 departure: there is no pause button, by explicit owner instruction**
(lines 74-81). Do not "fix" it back - see §6.

### `HeroBrickBackdrop` - `ZIP/web/src/components/layout/HeroBrickBackdrop.tsx:21`
```ts
{ tone?: "navy" | "cream" }
```
The etched-brick texture: an inline SVG data-URI, right-hand 55%, `sm:block` only (mobile
gets a solid ground), masked so it fades out before the copy.
`navy` = slate-300 strokes, width 1, opacity 0.18, fade from 35%.
`cream` = slate-900 strokes, width 1.15, opacity 0.10, fade from 45% (lines 22-28, 37-39).
Both sets of numbers are owner-tuned over three rounds [D, `SESSION6.md:150-154`] - do not
re-tune.
**Host contract: parent needs `relative overflow-hidden`, content needs `relative z-10`.**

### `ScrollGlowGroup` - `ZIP/web/src/components/property/ScrollGlowGroup.tsx:20-43`
```ts
{ children: ReactNode; className?: string; as?: "div" | "ol"; delay?: number }
```
`"use client"`. Fires a one-time staggered glow across its **direct children** by flipping
`data-glow="on"`; the animation is `card-glow` in `globals.css`. Children stay
server-rendered - the wrapper never needs to know what it wraps. Threshold is derived from
group height vs viewport height and clamped (lines 59-60), because a flat `threshold: 1`
can never fire for a group taller than the viewport. `delay` publishes `--glow-delay` and
only reaches single-child groups (the `:nth-child` rules are more specific). `as="ol"`
preserves list semantics for a genuine sequence. Disconnects after firing.

### `LeadCTAPanel` - `ZIP/web/src/components/property/LeadCTAPanel.tsx:19-59`
```ts
{ eyebrow?: string;              // default "Free consultation"
  title: string;
  description: string;
  proofPoints: Array<{ title: string; detail: string }>;
  formTitle?: string;            // default "Book your free consultation"
  submitLabel?: string;          // default "Request callback"
  footnote?: ReactNode;
  contained?: boolean;           // light grey card variant - the adjacency-rule escape
  ground?: "slate" | "white";    // section ground behind the contained card
  redirectOnSuccess?: boolean }  // default true; false on calculators and blog articles
```
The standard closing conversion block, and the most important primitive in the port.
Default = full-bleed navy + `HeroBrickBackdrop` + white form card. `contained` = grey card
inset on a light section. Both variants share one `PanelBody` so they cannot drift (lines
101-110). Layout is `lg:grid-cols-[1fr_2fr]` - pitch left, form right (line 133).
Icon badges switch palette by variant (lines 146-150). **This component is why the
adjacency rule exists.**

### `NumberedPagination` - `ZIP/web/src/components/blog/NumberedPagination.tsx`
The one pagination bar: First / ‹ / five-number sliding window / › / Last, filled current
page with `aria-current`, dimmed-not-hidden end states, 48px targets, "Page N of M"
caption. **Reuse it for any future long list** - `DESIGN_GUIDELINES.md:275-279` [V],
`SESSION11.md:154-159` [V]. Props not read in this pass - flagged in §7.

### Also new, page-template scope rather than primitives
`BlogCategoryHub`, `HubArticleList`, `BlogSidebarCta`, `ResultGate`, `HeldResult`,
`CalculatorTabs`, `CalculatorLinkCards`, plus ~28 bespoke storytelling components under
`components/property/` [V, `git diff --name-status 8041183 eb745e1 -- web/src/components`].
Out of scope for this report; they belong to the per-page port briefs.

---

## 6. POLICY decisions, not style decisions - owner sign-off required

These are in the style guide as though they were design rules. They are not. Each one is a
commercial, legal or conversion decision that arrived through the designer and has never
been signed off on our side. **None of them should be ported silently.**

**P1 - The "Built by Double Wired Creative" footer credit and backlink.**
`DESIGN_GUIDELINES.md:27-48` [V]. Markup at
`ZIP/web/src/components/layout/SiteFooter.tsx:132-142` [V]:
a `text-xs` gradient-clipped link to `https://www.doublewiredcreative.com/`,
`target="_blank" rel="noopener noreferrer"`, in the footer legal row **on every page**.
- **It does not exist in our tree** - `grep -rni doublewired MONO/web/src` returns
  nothing [V]. This is a net-new outbound link on every page of the site (~800 blog
  articles plus every core page).
- It is `rel="noopener noreferrer"` only - **no `rel="nofollow"` or `sponsored"`** [V].
  That makes it a site-wide dofollow external link to an agency site. Whether that is
  acceptable is an SEO and commercial call, not a design call.
- Background: `ZIP/CONTEXT_SUMMARY_SESSION2.md:99-112` [V] - the markup was fetched from
  `sidekickaccounting.co.uk`, and two deviations were made for this footer's dark ground
  (gradient always on rather than hover-reveal; stops lightened from `#3e40d6`/`#f2772a`
  to `#818cf8`/`#fb923c` so `text-xs` clears contrast).
- **Decision needed:** ship / ship with `rel="nofollow"` / drop. Already on the CONTEXT open
  list.

**P2 - `font-serif` is banned.** `DESIGN_GUIDELINES.md:53-54` [V]. Enforcing it means
editing the three legal pages, `not-found.tsx` and a decorative quote glyph on the homepage
in our tree (20+ occurrences, §1.3) [V]. Editing legal-page typography is trivial visually
but touches privacy policy, terms and cookie policy, which is owner territory in this
estate. Small, but ask.

**P3 - One form per page.** `DESIGN_GUIDELINES.md:125-128` [V],
`ZIP/CONTEXT_SUMMARY_SESSION9.md:103-115` [V]. This is a **conversion-surface reduction**
decided by owner instruction inside the designer's project ("we need only one form on page
which is the only navy brick form at the end of the page"). It removed mid-page capture
from three resources pages and two hidden forms from every calculator page. Our monorepo
has its own capture map (`docs/Property/LEAD_CAPTURE_MAP.md`) and its own lead-volume
history. **Confirm the instruction transfers to the canonical site before we delete capture
points.**

**P4 - Seven-field `LeadForm`.** Called the biggest conversion lever left, and explicitly
unvalidated - `DESIGN_GUIDELINES.md:108-110` [V], `SESSION11.md:236` [V]. The designer's
recommendation is staging into two steps, not deleting fields
[D, `SESSION8.md:320-330`]. Owner decision, and it needs data, not a design opinion.

**P5 - Soft-gated calculator results (`ResultGate`).** A conversion decision the designer
made that has never been validated against our data
(`DESIGN_GUIDELINES.md:140-148` [V], `SESSION11.md:49-50` [V]). The internal rules (inputs
stay live, only the result is held, skipping always reveals, per-calculator, converted
visitors exempt, embeds never gated) are deliberate and marked "do not simplify" - but
whether we gate at all is the owner's call.

**P6 - The `* Example figures displayed` asterisk on every figure, statutory ones
included.** `ZIP/CONTEXT_SUMMARY_SESSION9.md:71-101` [V]. The designer argued for putting
it on illustrative figures only and **was overruled by the owner** - it goes everywhere.
Rendered counts at the time: 7 on `/landlord-tax`, 3 on `/section-24`, 6 on
`/making-tax-digital-landlords`, 7 on `/property-tax-rates`, 6 on
`/research/landlord-tax-index`. **Open sub-question, still unanswered:** whether
`StatsCounter` (100+ landlords / 24hr / £2.4M+) also gets it. The designer's position is
no, because captioning the firm's own proof strip "example figures" reads as admitting the
proof is invented - `ZIP/web/src/components/ui/ExampleFigureNote.tsx:16-20` [V]. Needs the
owner's answer before we apply the note to the six unseen pages.

**P7 - No pause control on the autoplaying carousel.** A knowing WCAG 2.2.2 departure, kept
by explicit owner instruction - `ZIP/web/src/components/ui/CardCarousel.tsx:74-81` [V].
Flagged because it is an accessibility floor exception on a site that otherwise holds its
floors, and because a future reviewer will "fix" it. It is deliberate. Re-confirm rather
than assume it transfers.

**P8 - No `StickyCTA`, anywhere.** `DESIGN_GUIDELINES.md:103-104` [V],
`ZIP/CONTEXT_SUMMARY_SESSION9.md:117-131` [V]. Justified on 586-shown / 1-click data from a
readout that is **not in the snapshot** [V - the summary says so explicitly]. We can
re-derive that from our own analytics. Until then this is an assertion, not a finding.

**P9 - Testimonials stay anonymised, and stay navy-only.** `DESIGN_GUIDELINES.md:257-259`
[V]. A `tone="light"` variant was built and reverted at the owner's request
[D, `SESSION2.md:74-80`]. Consistent with our own estate rule that niche sites use
anonymised social proof only. Noted for completeness, not contested.

**P10 - Dead components kept alive by owner decision.** `CTASection`, `CardStack`,
`ResourceGateLazy`, `ResourceGate`, `ExcelPreview` have zero live usages and deletion was
recommended twice and declined - `ZIP/CONTEXT_SUMMARY_SESSION10.md:271-278` [V]. Their
rationale ("the repo is not under git, deletion is unrecoverable") **does not apply to us**;
the monorepo is under git. The decision may reverse cheaply here. Worth re-asking.

**P11 - Homepage hero closer is an owner-reserved placeholder.** Currently "Property tax
sorted, your way, with ease." Four drafted alternatives were rejected; the owner writes it
himself at final review - `DESIGN_GUIDELINES.md:76-77` [V], `SESSION11.md:234-235` [V].
**Remind him.** Not a design item at all.

---

## 7. Explicit gaps - asserted but not verified

1. **Nothing was verified in a browser.** No rendering claim in this report is observed.
   In particular the radius finding (§1.2), the cascade-layer mechanics (§4.2) and every
   "this will change appearance" statement are reasoned, not measured. A single
   `getComputedStyle` pass on a running dev server would settle all of them.

2. **`btnPrimaryBlue` does not exist.** `CLASS_NAMING_CONVENTIONS.md:76-79` presents it as
   the worked example of a reusable constant. `grep -rn "btnPrimaryBlue"` finds zero hits in
   either tree [V]. The blue hero CTA is an inline override on `btnPrimary`
   (`ZIP/web/src/app/page.tsx:292` [V]). The guide's own §5 rule ("if introducing a new
   recurring colour pattern e.g. blue CTA, extract a reusable class constant") was not
   followed. Harmless, but do not go looking for the constant.

3. **The `rounded-xl` claim is true as written and misleading in effect.** §1.2. The guide
   never mentions that `--radius: 0rem` rescales the whole radius namespace. Whether the
   designer knew is unknown; nothing in eleven handoff docs mentions a radius scale at all
   (confirmed by a full read of `CONTEXT_SUMMARY.md` and sessions 3-8 - the only radius
   references are `rounded-full` on the eyebrow rule and 4px chart data-ends).

4. **`iconBadge` / `iconBadgeOnDark` constants do not exist.** §1.1 gives exact badge class
   strings, and `DESIGN_GUIDELINES.md:8-9` says "when a pattern recurs and has no constant
   yet, add one". The badge classes are still inline in ~14 places, deliberately, "to avoid
   a half-adopted abstraction" [D, `CONTEXT_SUMMARY.md:143-146`]. So the badge is a
   copy-paste recipe, not a constant. Expect to retype it.

5. **`NumberedPagination` props not read.** Cited from the guide and session 11 only. Read
   the file before reusing it on a new long list.

6. **Section rhythm numbers are partly unreconciled.** `DESIGN_GUIDELINES.md:193` says the
   standard section is `py-16 sm:py-20`, then names `sectionY` as
   `py-12 sm:py-16 md:py-20`. Those are different. In practice components use hand-written
   values (`FaqSection.tsx:16` is `py-12 sm:py-16 lg:py-20`, `LeadCTAPanel.tsx:62` is
   `py-12 sm:py-16 lg:py-20`, `:84` is `py-12 sm:py-20 lg:py-24`) [V] and I found no
   component importing `sectionY` or `sectionYLoose` in the files I read. **Treat
   `py-12 sm:py-16 lg:py-20` as the observed default for a standard section**, and check
   before assuming the constants are live.

7. **"Consecutive sections never share a ground" is a rule with no enforcement.** No lint,
   no test. It is a review checklist item. Same for the adjacency rule, the one-form rule
   and the `data-cta` contract. If any of these matter after the port, they need a check -
   but note that adding one is its own decision, not part of this brief.

8. **Sessions 3-8 contain no mention of the heading override, cascade layers, container
   widths, a radius scale, a padding/gap scale, the footer credit, banned fonts, the
   one-form rule, the sticky-wrapper rule or the anchors-not-modals rule** (verified by a
   full read of those seven documents). Those all entered the record in sessions 2, 9, 10
   and 11, or were written up for the first time in `DESIGN_GUIDELINES.md` itself on
   2026-08-20/21. **The guide is younger than the code it describes**, so where guide and
   code disagree, the code is the older authority and the guide is the intent. Cite both.

9. **Not checked in this pass** (out of brief, flagged for whoever picks them up): the
   `SpecialistWidget` failure mode, the middleware shadowing bug, `SiteHeader`/`SiteFooter`
   nav threading, and whether the `.disabled` quarantine leaves any design-system file
   contaminated.

---

## 8. The short version for an implementer

Building one of the six unseen pages, in order:

1. Hero: `heroCreamSurface` or `bg-slate-900`, `relative overflow-hidden`,
   `<HeroBrickBackdrop tone=… />`, content `relative z-10`, container `siteContainerLg`,
   `py-10 sm:py-12 lg:py-14 min-h-[350px] flex items-center`. Breadcrumb (`onDark` if navy)
   → `mt-6` h1 `text-4xl sm:text-5xl lg:text-6xl` → `mt-4` standfirst in a `max-w-3xl`
   block → `mt-6 sm:mt-8` CTA row `gap-3 sm:gap-4`: `btnPrimary` → `#book`, plus
   `btnOnCream` or `btnOnDark`.
2. Body sections: alternate white / slate-50, `py-12 sm:py-16 lg:py-20`, `siteContainerLg`,
   `<Eyebrow>` → h2 `text-2xl font-bold text-slate-900 sm:text-4xl` (sentence case) →
   `mb-2` standfirst → `mb-8` content. Body copy runs the **full container**. Change the
   device every couple of sections.
3. Cards: `rounded-xl`, surface contrasting the ground, `p-5 sm:p-6`, `gap-4 sm:gap-6`,
   icon badge `h-11 w-11`, h3 at the standard tier, `mt-auto` on the foot affordance.
4. Every figure with a number gets `<ExampleFigureNote />` (pending P6).
5. Close: `<LeadCTAPanel>` wrapped in `<div id="book" className="scroll-mt-24">`, then a
   **light** section (a `<FaqSection>` is the default answer) so the navy panel never
   touches the navy footer.
6. Every CTA carries `data-cta`, `data-cta-placement`, and `data-cta-goal="form"` when it
   leads to a form.
7. No em or en dashes. Sentence case. `A*` on every fact, checked against
   `docs/Property/house_positions.md`.
8. Before claiming done: zero horizontal overflow at 320/390/768/1024/1280/1600, exactly
   one `<form>` in the DOM, and every heading's computed style read with `getComputedStyle`
   rather than eyeballed.
