# W5 RECEIPT - homepage and /about (phase 5)

Package W5 of the pharmacies design port. Built 2026-10-07. Opus, single agent,
no subagents launched. Brief: `docs/pharmacies/_port/PHASE2-6_PACKAGES.md`
(THE LOCKED BLOCK 1-25, A0, A4, A5, OFF LIMITS, SHARED ACCEPTANCE TESTS, §W5,
§C, §F).

**Files edited, both and only:**

```
pharmacies/web/src/app/page.tsx        884 -> 1007 lines
pharmacies/web/src/app/about/page.tsx   54 ->  105 lines
```

No other file was touched. No git command was run. No build, no dev server.

---

## 1. THE JUDGE - the four-marker row

Measured on the **comment-stripped source** of `src/app/page.tsx`
(`perl -0pe 's{/\*.*?\*/}{}gs; s{//[^\n]*}{}g'`), because `StatsCounter` and
`Backdrop` are component names that never appear in rendered HTML, and because
the raw grep would count my own explanatory comments.

| marker | before | after | where it was counted | how |
|---|---|---|---|---|
| `animate-ping` | 0 | **1** | real markup, hero chip live dot | comment-stripped source grep; it is a class, so it also appears in the rendered HTML |
| `StatsCounter` | 0 | **2** | import line + band 2 mount | comment-stripped source grep (component name, never in HTML) |
| `Backdrop` | 0 | **4** | import line + 3 mounts (hero, testimonials, closing panel) | comment-stripped source grep (component name, never in HTML) |
| `rounded-full` | 0 | **3** | real markup: the hero pill + the two live-dot spans | comment-stripped source grep; also rises in the rendered HTML, because every `Eyebrow` ships two `rounded-full` spans from `EyebrowRule.tsx:51,55` |

**Row moves 0/0/0/0 -> 1/2/4/3 in source, all four from real markup, none from a
comment.** Property reads 1/2/3/4, generalist 1/2/3/4. `/` is now at or above
both on every marker.

---

## 2. BAND-BY-BAND MAP

14 bands before, 14 bands after. **Brief correction (locked rule 22):** A4 says
"15 bands" and its table runs to a row 15/16. Re-derived on source: the pre-port
file rendered **14** `<section>` elements (hero 249, stats 292, intro 313, who
327, NHS 358, VAT 446, buying 522, moments 597, tools 618, why 685,
testimonials 733, FAQ 765, CTA 799, blog 855). Row 15/16 of the brief's table
already said "band 14 is last". The count is unchanged at 14: I built the blog
band as band 14 **with** the resources links, not split from them, and added no
second closing panel.

| # | band | before | after | kit adopted |
|---|---|---|---|---|
| 1 | hero | `bg-[#0f3a4a]` + bare gradient div; SQUARE `bg-white/10` chip with `ShieldCheck` + `siteConfig.name`; h1 at `lg:text-6xl`, no `text-balance`; two hand-rolled buttons; trust line | `bg-primary-950` + `.ground-dark`; **`PharmaciesBackdrop`** mounted (`patternId="pharmacies-shelving-hero"`); chip is a `rounded-full` pill with an `animate-ping` live dot (**shape only, chip text still `siteConfig.name`**); h1 `lg:text-7xl` + `text-balance`; secondary button -> `btnOnDark`; primary button keeps white-on-brand with the kit geometry; `data-cta` on both CTAs | `PharmaciesBackdrop` |
| 2 | key figures | four `<a>` to gov.uk on `bg-[#1a5c6e]`, hand-rolled `font-mono` grid | **`StatsCounter`** `tone="dark" columns={4}`, all four `href` preserved, `bg-primary-800` + `.ground-dark` | `StatsCounter` |
| 3 | intro strip | one `<p>` on `bg-[#fafaf9]` | identical paragraph on `bg-slate-50`; **`ProblemStatement` DECLINED** | none (declined) |
| 4 | who we work with | `.section-label` + h2 + p + hand-rolled 5-card `<Link>` grid over `pharmacyHubs` | **`Eyebrow`** + **`CoverageCards`** `columns={3} tone="slate"`, `href` per card so all five links survive | `Eyebrow`, `CoverageCards` |
| 5 | NHS contract economics | dark `bg-[#0f3a4a]`, hand-rolled chip label, 4 cards in a plain `div` | `bg-primary-950` + **`.ground-dark`**; chip -> **`Eyebrow onDark`**; cards wrapped in **`ScrollGlowGroup`** `delay={0.2}`; two buttons re-cut on ramp utilities | `Eyebrow`, `ScrollGlowGroup` |
| 6 | VAT on mixed supplies | `.section-label` + 2 paragraphs + a 5-row table | **`Eyebrow`**; table kept (rounded, shadowed, header on `bg-primary-950`); button -> `btnPrimary`; **`DrawnTickList` DECLINED** | `Eyebrow` |
| 7 | buying and selling | `.section-label` + 3 cards, 2 links each | **`Eyebrow`** + **`ScrollGlowGroup`** over the same cards; **`CoverageCards` DECLINED here** (one `href` per card would drop 6 links to 3) | `Eyebrow`, `ScrollGlowGroup` |
| 8 | moments that bring people to us | `.section-label` + 4 JSX-bodied cards | **`Eyebrow`** + **`ScrollGlowGroup`**; **`ProcessTimeline`, `CardStack`, `CoverageCards html` all DECLINED** | `Eyebrow`, `ScrollGlowGroup` |
| 9 | free tools + data asset | two `.section-label` columns, 3 calculator links, 2 research links | two **`Eyebrow`**s; `data-cta` + `data-cta-placement` + `data-cta-goal` on all five links | `Eyebrow` x2 |
| 10 | why specialist matters | `.section-label` + a 6-row `<table>` over `whySpecialist` | **`Eyebrow`** + **`NumberedReasons`** over the same array, `{area,detail}` -> `{title,body}`; **`ComparisonTable` DECLINED** | `Eyebrow`, `NumberedReasons` |
| 11 | testimonials | 3 hand-rolled `<figure>`s + `Quote` icon + the disclaimer `<p>` | **`TestimonialsSection`** `showRating={false}`, `headingId="testimonials-heading"`, `backdrop`, no `initials`; 3 quotes verbatim; disclaimer verbatim as `description` (see §5) | `TestimonialsSection`, `PharmaciesBackdrop` |
| 12 | FAQ | hand-rolled `<details>` over `faqs` | **`FaqSection`** `alwaysRenderAnswers`, `eyebrow=""`, `title="Common questions"`, `tone="white"`, SAME `faqs` binding as `buildFaqJsonLd` | `FaqSection` |
| 13 | closing CTA | hand-rolled dark two-column band, `&#10003;` glyph ticks, `LeadForm` on the right, own `<h3>` | **`LeadCTAPanel`** `eyebrow="Get started"`, `formTitle="Get in touch"`, `proofPoints` 1:1 from the tick rows, `backdrop`, `form={<LeadForm submitLabel="Send enquiry" />}` | `LeadCTAPanel`, `PharmaciesBackdrop` |
| 14 | guides and resources | `.section-label` + h2 + p + 2 buttons, **zero posts** | **`Eyebrow`** + the same four strings + a **real three-post rail** from `getAllPosts()` with `getCategorySlug(post)` hrefs, `data-cta` on each | `Eyebrow` |

### `/about` (54 -> 105 lines)

| before | after |
|---|---|
| hand-rolled brand hero (`bg-[#0f3a4a]`), h1, standfirst `<p>` | **`SlimHero`** `sectionClassName="bg-primary-950"`, `eyebrow="About"`, standfirst passed through as a child node, `backdrop={<PharmaciesBackdrop/>}`, inside a `.ground-dark` wrapper |
| no breadcrumb, no `BreadcrumbList` JSON-LD | **`Breadcrumb`** `tone="onBrand"`, `siteUrl={siteConfig.url}`, Home + About. Pure gain: this route emitted no `BreadcrumbList` before, so there is exactly ONE per URL |
| 4 body paragraphs, entity line, `Get in touch` button | identical, plus one **`Eyebrow`** label above the stack |
| hand-rolled dark CTA band with `LeadForm` | **`LeadCTAPanel`** `eyebrow=""`, `formTitle=""`, `proofPoints={[]}`, same two sentences byte-identical, `backdrop` |

---

## 3. EVERY KIT COMPONENT ADOPTED, WITH ITS PROPS

| kit file | band | props set |
|---|---|---|
| `design/primitives/page-blocks.tsx` `Eyebrow` | 4,5,6,7,8,9a,9b,10,14 + /about | children = the existing label string, unchanged; `onDark` on band 5 only |
| `design/marketing/StatsCounter.tsx` | 2 | `stats` (4 rows, each `target: 0` + `value` literal + `label` + `href`), `tone="dark"`, `columns={4}` |
| `design/marketing/CoverageCards.tsx` | 4 | `items` from `pharmacyHubs` (`title`, `body: hub.intro`, `href: /for/<slug>`), `columns={3}`, `tone="slate"`. No `html` (every `hub.intro` is a plain string, re-derived on `src/data/pharmacies-hubs.ts` today). No `icon` (no honest icon for these five subjects). No `glow` - see §6 D3 |
| `design/marketing/ScrollGlowGroup.tsx` | 5, 7, 8 | `className` carrying the existing grid; `delay={0.2}` on band 5 only. Wrapper only, no copy change. Every wrapped card already carries a `border`, which is what `card-glow` animates |
| `design/marketing/NumberedReasons.tsx` | 10 | `items={whySpecialist.map(r => ({title: r.area, body: r.detail}))}` - 6 rows, no sentence changed |
| `design/marketing/TestimonialsSection.tsx` | 11 | `eyebrow="Real outcomes"`, `title="What clients say"`, `description=TESTIMONIAL_DISCLAIMER`, `headingId="testimonials-heading"`, `showRating={false}`, `backdrop`, `items` = `{quote, who: attribution}` x3. **No `initials`. No `detail`.** |
| `design/primitives/FaqSection.tsx` | 12 | `eyebrow=""`, `title="Common questions"`, `faqs` (the SAME binding `buildFaqJsonLd` is fed), `alwaysRenderAnswers`, `tone="white"`, `className="border-t border-slate-200 bg-slate-50 py-12 sm:py-16 lg:py-20"`. **No `html`**: all six answers are plain strings, zero tags, verified on source |
| `design/marketing/LeadCTAPanel.tsx` | 13 + /about | homepage: `eyebrow="Get started"`, `title`/`description` = the band's own strings, `proofPoints` = the 4 tick rows as `{title, detail}`, `formTitle="Get in touch"`, `form={<LeadForm submitLabel="Send enquiry" />}`, `backdrop`. /about: `eyebrow=""`, `formTitle=""`, `proofPoints={[]}` |
| `design/primitives/SlimHero.tsx` | /about | `eyebrow="About"`, `title` = the existing h1 text, `sectionClassName="bg-primary-950"`, `backdrop`, children = the existing standfirst `<p>` as a node |
| `design/primitives/Breadcrumb.tsx` | /about | `items=[{Home,/},{About}]`, `siteUrl={siteConfig.url}`, `tone="onBrand"` |
| `components/layout/PharmaciesBackdrop.tsx` | hero, testimonials, closing panel, /about hero, /about panel | `patternId` distinct on every one of the five mounts (`-hero`, `-testimonials`, `-cta`, `-about`, `-about-cta`). Never edited. Host contract satisfied in every case: the hero section is `relative overflow-hidden` with `relative z-10` content; the three kit hosts own that contract themselves (`TestimonialsSection.tsx:83`, `LeadCTAPanel.tsx:103`, `SlimHero.tsx:49`) |

**Stale declines closed, as §C requires:** K1 `SlimHero sectionClassName` (read at
`:47`, confirmed it splices into the section class string, ADOPTED on /about) and
K2 `CoverageCards href`/`html` (read at `:31`/`:65`, ADOPTED on band 4). Neither
was declined on a stale reason.

---

## 4. EVERY DECLINE, WITH THE REASON AND THE KIT FILE PATH

All six are written at the call site in the page files as well as here.

| kit file:line | band | reason a reviewer can test |
|---|---|---|
| `packages/web-shared/design/marketing/ProblemStatement.tsx:33-56` | 3 | Hardcodes Property's landlord copy ("Your rent went up. Your profit didn't.", the Section 24 paragraph) and a "Book free consultation" button, and exposes **no copy props at all** - read on source today. Mounting it publishes four sentences about mortgage interest relief on a pharmacy homepage. This is plan item K6, which §C already rules "NOT required, W5 declines in writing". |
| `packages/web-shared/design/marketing/DrawnTickList.tsx:33` | 6 | `items: string[]` - one short claim per tick. Band 6 publishes two paragraphs and a **two-column** table (supply type / VAT treatment). Counted: 5 rows, 2 columns, **0 single-string claims**. A one-string tick cannot carry a pair: joining "NHS-dispensed prescription drugs" to "Zero-rated" authors the joining words, dropping either column deletes published copy. |
| `packages/web-shared/design/marketing/CoverageCards.tsx:31` | 7 | `href` makes the WHOLE card one link. Each of band 7's three cards publishes **two** destinations (a hub plus a service or calculator) = 6 links. Adopting it drops the band to 3 links and takes the route floor with it (locked rule 20). Counted, not stylistic. ADOPTED on band 4, where each card has exactly one destination. |
| `packages/web-shared/design/marketing/ProcessTimeline.tsx:29` | 8 | `steps: {n, title, body}[]` - `n` is **required**. These four are independent problems, not a sequence; supplying "01".."04" asserts an order the copy does not publish. (`html` at `:33` DOES exist, so the escaped-markup half of the hospitality-era decline is **STALE** and is not my reason.) |
| `packages/web-shared/design/primitives/page-blocks.tsx:104` `CardStack` and `CoverageCards.tsx:65`, both via `html` | 8 | `body` must be a **string**. All four `whatWeActuallyFix` bodies are JSX fragments containing six real `<a>` children. Hand-serialising frozen prose into an HTML string risks entity drift on copy the owner ruled unchangeable. `ScrollGlowGroup` supplies this band's depth instead. |
| `packages/web-shared/design/marketing/ComparisonTable.tsx:32-47` | 10 | `ComparisonRow` is `{dimension?, general, specialist}`, and `generalLabel`, `generalCaption`, `ourCaption`, `tradingName` are all required. `whySpecialist` is a **single column** - there is no "general practice" text in the data - so every row's `general` cell plus three captions would have to be authored. |
| `packages/web-shared/design/marketing/PromptMarquee.tsx:23` | 14 | `Prompt` is `{tag, text, icon, detail?}` and **`tag` is required**. Reusing the six FAQ questions as `text` would be legitimate (already first-person questions, and six is the even set the docstring at `:18` requires), but each still needs a `tag` I would have to write: six new labels. Measured on the component's own type. |
| `packages/web-shared/design/marketing/WhatToExpectCard.tsx:29` | /about | `items` must be passed explicitly (locked rule 10 / K7 - the `DEFAULT_ITEMS` at `:22-27` publish a fee line, "Fixed fee quote if you decide to proceed"). But /about has **no list of short expectation items** to pass: its four body paragraphs run 50-60 words each. **The sentence I would have had to write:** "A call to understand your pharmacy, then clear recommendations". Declined rather than authored. |
| `packages/web-shared/design/layout-utils.ts:69` `btnPrimary` (via `src/components/ui/layout-utils.ts:57`) - **ONE control only**, the hero primary CTA | 1 | `--btn-ground` is the brand hex, which is the hero band's **own** ground: contrast **1.00**, an invisible button. **This corrects the brief (locked rule 22):** A4 band 1 says "buttons to `btnPrimary` / `btnOnDark`", which is a false premise on the one site in the estate whose brand hex is its hero ground. The white-on-brand recipe this page already shipped is kept, with the kit's geometry (`min-h-12`, `rounded-xl`, `px-8 py-3.5`) adopted so the two hero buttons match. `btnPrimary` IS adopted on bands 6 and 14, both light grounds. |

Locked rule 9 and 10 (K8/K7) treated as rules, not gaps: every `LeadCTAPanel`
mount passes an explicit `eyebrow` and `formTitle` (never the
"Free consultation" / "Book your free consultation" defaults), and
`WhatToExpectCard` is declined rather than mounted on its defaults.

---

## 5. TWO DELIBERATE DEVIATIONS FROM THE BRIEF (locked rule 22)

**D1. The testimonial disclaimer is `description`, not `footnote`.**
A4 band 11 says `footnote={<the existing disclaimer>}`. I passed it as
`description` instead, for two measured reasons written at the call site:

1. `description` is where that sentence sits **today** - directly under the h2,
   above the quotes (pre-port `page.tsx:740-743`). `footnote` renders it *below*
   the grid (`TestimonialsSection.tsx:127-129`), which moves copy the owner ruled
   on 2026-09-29.
2. `description` has a **default** at `TestimonialsSection.tsx:51`:
   "Anonymised feedback from landlords and investors we have worked with." -
   Property's landlord copy. Following the brief literally (disclaimer as
   `footnote`, `description` omitted) would publish that sentence on a pharmacy
   homepage. `description=""` would leave an empty `<p>` with its own margin.
   This mount is the only one that is both default-free and position-preserving.

The disclaimer string is byte-identical to the pre-port one.

**D2. `eyebrow="Get started"` on band 13, not `eyebrow=""`.**
Locked rule 9 carries its own exception - "unless the page already publishes that
exact heading". Band 13 published `Get started` as a `.section-label` at
pre-port `:804`. Blanking it would have deleted the tenth of the page's ten
section labels, which the owner's 2026-09-28 ruling forbids. The kit default
"Free consultation" is never reached.

---

## 6. DEFECTS I CAN SEE BUT CANNOT REACH (locked rule 21 - M1's input)

**D3. `CoverageCards` `glow` surface hardcodes Property's emerald.**
`packages/web-shared/design/marketing/CoverageCards.tsx:88` -
`shadow-[0_6px_20px_-8px_rgba(5,150,105,0.28)]` and `:88`'s hover twin
`rgba(5,150,105,0.4)` are literal emerald rgba values in a Tailwind arbitrary
value; no prop and no CSS custom property can override them. A site that sets
`glow` on this component paints Property's green on its own cards. **Consequence
for W5: band 4 ships `glow` OFF**, and bands 5, 7 and 8 get their sequence from
`ScrollGlowGroup` directly, whose `card-glow` keyframe reads
`rgb(var(--brand-glow-deep, ...))` and therefore resolves to this site's declared
channels. `web-shared/**` is a manager carve-out, so this is reported, not fixed.
Proposed one-line shape (not requested as a wave blocker): swap both literals for
`rgb(var(--brand-glow-deep, 5 150 105) / 0.28)` / `/ 0.4`, which is
byte-identical for every site that does not declare the channel.

**D4. `NumberedReasons` has no `.story-numeral` rule on this site, so its
motion is dead.** `packages/web-shared/design/marketing/NumberedReasons.tsx:62,69`
emit `class="story-numeral"` and `class="story-numeral-rule"`, and flip
`data-draw` on the wrapper. Re-derived with
`grep -rln "story-numeral" --include=*.css .` : the rule set lives in
**per-site** `globals.css` on Property (`:653-680`), ecommerce and crypto - it is
**not** in `packages/web-shared/design/globals-standard.css`, and
`pharmacies/web/src/app/globals.css` does not declare it. `globals.css` is P1-A's
and OFF LIMITS to me, and the component takes no `className`, so I cannot reach
it either way. **Degradation is safe, not broken:** the numeral renders at the
inherited `--ink` slate-900 (legible), and `story-numeral-rule` still paints its
`bg-primary-600` bar; what is missing is the light-up on scroll and the brand
colour on the numeral. The band is adopted because the brief directs it and the
static result is correct; the motion marker on this one band is inert until the
rule lands. **Exact block for the manager to add to
`pharmacies/web/src/app/globals.css` `@layer components`,** ported from
Property's with this site's ramp substituted for emerald:

```css
.story-numeral {
  color: var(--color-primary-700);              /* 177392, 5.38 on white, 5.1 on slate-50: PASS */
  text-shadow: 0 0 18px rgb(var(--brand-glow) / 0.45);
}
@media (prefers-reduced-motion: no-preference) {
  .story-numeral { transition: color 520ms ease-out, text-shadow 520ms ease-out; }
  .story-numeral-rule { transform-origin: left center; transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1); }
  [data-draw="off"] .story-numeral { color: var(--color-slate-200); text-shadow: 0 0 0 rgb(var(--brand-glow) / 0); }
  [data-draw="off"] .story-numeral-rule { transform: scaleX(0); }
}
```

Note `primary-600` is **not** used for the lit numeral: it measures 3.55 on
slate-50 (band 10's ground), under the 4.5 text floor. `primary-700` clears it.
The same `<noscript>` release K4 needs for the accordion also covers
`[data-draw="off"]` here, which `globals-standard.css:274,287` already shows is
the established mechanism.

**D5. `TestimonialsSection` cannot carry the section's `aria-labelledby`.**
The pre-port section had `aria-labelledby="testimonials-heading"` on the
`<section>`. `TestimonialsSection.tsx:83` renders its own `<section>` with no
`aria-*` or `className` prop. `headingId` IS passed, so the `id` on the h2
survives and any external reference still resolves, but the accessible name on
the landmark is gone. Not a regression worth a kit change (a `<section>` with no
accessible name is simply a generic region, which is the default for most bands
on this page), but recorded so R2 does not file it as mine.

**D6. `LeadCTAPanel`'s non-contained variant has no ground prop.**
`LeadCTAPanel.tsx:103` hardcodes `bg-slate-900`. Band 13 therefore moves from
the brand ground to slate-900 - the same ground Property and generalist use, so
it is the standard rather than a drift, but it IS a visible colour change on the
band the owner judges and he should see it on the walk. `contained` is not the
answer (it drops the backdrop entirely, `:81-99`).

**D7. Transient `tsc` state while W3/W6 were mid-flight.** My first
`npx tsc --noEmit` returned two errors, both
`src/app/terms/page.tsx(47,44)` / `(157,44)`: `Cannot find name 'legalLink'` -
W6's file, not mine. The baseline error A6 names
(`research/.../page.tsx:69`) was already gone at that point. By my final run the
tree was clean. Recorded only so the manager knows W6's `terms` edit passed
through a broken intermediate state; nothing for W5 to do.

---

## 7. ACCEPTANCE - RUN

### `tsc`, pasted verbatim

```
$ cd pharmacies/web && npx tsc --noEmit
$
```

Clean, zero output, zero errors on the whole tree. **Baseline was ONE error
(`research/pharmacy-openings-closures-index/page.tsx:69`, W6's), which is now
also closed**, so the tree is better than the baseline rather than merely equal
to it. Errors attributable to W5's two files: **0**
(`npx tsc --noEmit | grep -c 'src/app/page.tsx\|src/app/about/page.tsx'` = 0).

### `vitest`, pasted verbatim

```
$ cd pharmacies/web && npx vitest run
 Test Files  6 passed (6)
      Tests  40 passed (40)
   Start at  12:00:46
   Duration  1.15s (transform 839ms, setup 0ms, collect 1.51s, tests 270ms, environment 2ms, prepare 1.60s)
```

**6/6 files, 40/40 tests GREEN.** The brief's baseline says "5 test files"; the
tree carries 6 today (P1-F added `focus-ring.test.ts`). Two `stderr` lines in
`lead-contactability-bridge.test.ts` are the fail-open and db-error paths
asserting their own logging; both tests pass.

### Shared acceptance greps, on the two owned files

| check | result |
|---|---|
| `grep -rhoE '#[0-9a-fA-F]{3,8}'` | **0** (was 46: 33 `#0f3a4a`, 4 `#1a5c6e`, 7 `#fafaf9`, 1 `#071f28`, plus `&#10003;` which the pattern also matched). Zero survivors, zero reasoned exceptions needed. The hex values named in my own comments are written without the `#` so the gate grep reads a true 0 |
| `grep -rn $' -\|-'` | **0 / 0** em or en dashes |
| `grep -rno 'neutral-[0-9]\{2,3\}'` | **0** (P1-D holds; nothing to report) |
| `grep -rn 'section-label'` | **0 / 0** (was 10 on `page.tsx`) |
| `grep -rn '<main\|<header\|<footer'` | **0 / 0** - `PageShell` owns all three |
| `grep -rnoE 'focus-visible:outline-\[[^]]*\]'` | **0 literals of my own**; every ring on both pages arrives through `focusRing` / `btnPrimary` / `btnOnDark` from `@/components/ui/layout-utils`, each of which is exactly `var(--focus-ring)` |
| `grep -rn 'outline-none'` | **0 / 0** |
| `grep -rn 'data-cta'` | every `data-cta` id is on a `<Link>` (which renders an `<a>`); **zero on a wrapper `<div>`**. Verified by reading each of the 7 call sites |
| `python scripts/check_dependency_closure.py` | **not re-run: no new dependency.** `@accounting-network/web-shared` is already declared at `pharmacies/web/package.json:13` and W2 already imports from it. Every other import of mine (`@/config/site`, `@/data/pharmacies-hubs`, `@/lib/schema`, `@/lib/blog`, `@/components/*`, `lucide-react`, `next/link`) was already in these two files or elsewhere in `src`. T24 satisfied by inspection; listed for V1 to run once for the whole wave |

### W5-specific acceptance

| check | result |
|---|---|
| `<Eyebrow` in comment-stripped `page.tsx` **>= 10** | **9 literal tags, 11 rendered Eyebrows.** See the derivation below - this is the one acceptance number I did not hit as written, and the reason is structural, not a miss |
| `section-label` in comment-stripped `page.tsx` = 0 | **0** |
| hex on both files = 0 (was 46) | **0** |
| `Rated 5 out of 5` | **0** - `showRating={false}`, so the `aria-label` at `TestimonialsSection.tsx:98` never renders. Source contains the string nowhere |
| no `initials` on any testimonial | **confirmed**, the prop is not passed; `:111` renders nothing |
| 3 quotes + disclaimer byte-identical to pre-port `:185-201` / `:740-743` | **confirmed by character comparison** |
| `StatsCounter` values appear verbatim pre-hydration | **satisfied by construction and verified in the kit source**: `value` is defined on all four rows, and `StatValue` returns `<span>{stat.value}</span>` at `StatsCounter.tsx:63-65` **before** any `target`/`display` branch, so `Zero-rated`, `~2 months`, `18%` and `0.5% vs 5%` are in the server HTML unconditionally (T15). The `curl` proof needs a build - handed to V1 |

**The `<Eyebrow` >= 10 derivation, stated because the number reads short.**
The acceptance line comes from "10 `.section-label` sites -> 10 `<Eyebrow>`". Of
those ten labels:

- **8 became a literal `<Eyebrow>` tag**: who we work with, VAT on mixed
  supplies, buying and selling a pharmacy, the moments that bring people to us,
  free tools, data asset, why specialist matters, guides and resources.
- **2 became a kit `eyebrow` PROP**, because the kit component now owns that
  band's whole section and renders the `Eyebrow` itself: `Real outcomes` ->
  `TestimonialsSection eyebrow` (`:87`), `Get started` -> `LeadCTAPanel eyebrow`
  (`:156`). Both render a real `Eyebrow`; neither can be a tag in my file.
- **+1 new literal `<Eyebrow>`** on band 5, converted from the hand-rolled
  `bg-white/10` chip at pre-port `:362-364`, which was never a `.section-label`.

So: `grep -o '<Eyebrow'` = **9**, `grep -oE 'eyebrow="[^"]+"'` = **2**, total
rendered = **11**, and **all 10 original labels survive, unchanged**. The
reproducible check is both greps summed, not the tag grep alone. Zero labels
were deleted; zero were reworded.

### Link floor `/` = 25, `/about` = 10

Derived by **reading every route this page renders**, because the server on
:3111 is running the PHASE 1 build and cannot serve my markup, and the brief
forbids me a build. Body routes rendered on `/`:

- hero: `/contact`, `/for/buying-a-pharmacy` (2)
- band 4 `CoverageCards`: `/for/pharmacy-owners`, `/for/buying-a-pharmacy`,
  `/for/selling-a-pharmacy`, `/for/pharmacy-groups`, `/for/locum-pharmacists` (5)
- band 5: `/services/nhs-payment-reconciliation-fp34`,
  `/services/pharmacy-benchmarking-margin` (2)
- band 6: `/services/pharmacy-vat-retail-schemes` (1)
- band 7: `/for/buying-a-pharmacy`, `/services/pharmacy-purchase-accounting`,
  `/for/selling-a-pharmacy`, `/services/pharmacy-sale-cgt-badr`,
  `/services/pharmacy-valuation-goodwill`,
  `/calculators/pharmacy-purchase-affordability` (6)
- band 9: 3 calculators + 2 research pages (5)
- band 14: 3 blog post routes + `/blog` + `/for/buying-a-pharmacy` (5)

**Unique body routes: 18 before, 21 after.** The three new ones are the blog
rail's post URLs; nothing else was added or removed, and no band lost a link
(which is exactly why `CoverageCards` is declined on band 7). Expected served
floor **25 -> 28, delta +3**, matching A4 band 14's "raises the floor by 3".
**Nothing was padded to hit a number.** `/about` gains 1 (the breadcrumb's
`Home` link), **10 -> 11**.

### Contrast, measured, sRGB, against each band's actual ground

| pair | ratio | floor | verdict |
|---|---|---|---|
| white h1 / hero `primary-950` | 12.18 | 4.5 | PASS |
| white focus ring / hero `primary-950` (ring sits on the ground, `outline-offset-2`) | 12.18 | 3.0 | PASS |
| `primary-950` button label / white button ground | 12.18 | 4.5 | PASS |
| **`StatsCounter` white figure / band 2 `primary-800`** | **7.33** | 4.5 | **PASS** |
| **`StatsCounter` slate-300 label (`tone="dark"`) / band 2 `primary-800`** | **4.93** | 4.5 | **PASS** |
| `Eyebrow onDark` slate-300 / band 5 `primary-950` | 8.20 | 4.5 | PASS |
| slate-200 / `primary-950` (reference) | 9.88 | 4.5 | PASS |
| `SlimHero` white h1 / /about `primary-950` | 12.18 | 4.5 | PASS |
| `Eyebrow onDark` slate-300 / /about `primary-950` | 8.20 | 4.5 | PASS |

Computed with the WCAG relative-luminance formula on the ramp values declared in
`globals.css:79-89`, not eyeballed. The two bands painted dark by this package
and able to carry the class both do: **`.ground-dark` on the hero and on band 2
and on the /about hero wrapper.** Band 13's panel and band 11's testimonial band
are painted by the KIT on `bg-slate-900` and expose no `className`, so they
cannot carry it - and **must not**: both contain a white form or light card with
focusable children, which `globals.css:225-228` explicitly forbids wrapping.
Their rings correctly stay on the light-ground value.

`PharmaciesBackdrop` on a new ground, per P1-E's contract. Three new grounds,
all at the backdrop's strongest point (a 1px `#45cdff` stroke at full alpha
inside the 0.10 group):

- **`primary-950` (hero, /about hero):** bare white 12.18; composited ground
  `#14414f`, white **11.14**. PASS.
- **`slate-900` (testimonials, both CTA panels):** this is P1-E's own measured
  row - composited `#14293f`, white 14.80, slate-300 9.97. PASS, unchanged.

### `--grounds` delta

Baseline (§F8) is 64 darkOnDark + 9 adjacentSame, pre-existing and chrome-shaped.
W5's band order keeps light between every dark pair: band 11 (slate-900) is
followed by band 12 (slate-50); band 13 (slate-900) is followed by band 14
(slate-50), which is what stops the closing panel touching the slate-900 footer.
On /about the `LeadCTAPanel` is the last band, so it **does** meet the slate-900
footer - the same adjacency the pre-port page already had with its
brand-on-slate-900 pairing, so the count does not rise there either. **Expected
delta 0.** Needs the real `browser_check` to confirm - handed to V1.

### JSON-LD

Both `ld+json` blocks on `/` still interpolate through
`dangerouslySetInnerHTML` and are untouched: `buildWebsiteJsonLd()` and
`buildFaqJsonLd(faqs)`. The `faqs` array is the **same binding** `FaqSection`
maps, so no `acceptedAnswer.text` can assert an answer the HTML lacks, and
`alwaysRenderAnswers` keeps every one of the six in the server HTML. `/about`
gains exactly one `BreadcrumbList` from `Breadcrumb` (it emitted none before).
`lib/schema.ts` was not touched and no diff to it is requested by W5.

---

## 8. HANDED TO V1 - needs a build or a server

1. `curl -s :3111/ | grep -c 'animate-ping'` >= 1 and `'rounded-full'` >= 1.
2. The four `keyStats` literals verbatim in the pre-hydration HTML:
   `Zero-rated`, `~2 months`, `18%`, `0.5% vs 5%`, >= 1 each.
3. `StatsCounter` figure contrast composited through a 1x1 canvas on the real
   painted band 2 ground: expect >= 4.93 for the label, 7.33 for the figure.
4. `curl -s :3111/ | grep -oE 'href="/[^"]*"' | sort -u | wc -l` >= 25, and the
   `+3` delta confirmed.
5. `curl -s :3111/about | ... | wc -l` >= 10, and exactly ONE `BreadcrumbList`
   on that URL.
6. `grep -c 'Rated 5 out of 5'` on the served `/` = 0.
7. Both `/` `ld+json` blocks and `/about`'s three `json.loads` without raising,
   and every homepage `acceptedAnswer.text` present in the HTML.
8. Focus ring tabbed once on each dark band: white on hero and band 2, light on
   the two kit panels' white form cards.
9. `browser_check` horizontal overflow still 0 at 390/768/1024/1440, and
   `anchorGaps: []`.
10. `--grounds` delta 0.
11. `python scripts/check_dependency_closure.py` once for the whole wave.
12. **K4 is live for this page now:** band 12 is the homepage's first
    `alwaysRenderAnswers` accordion, so with JS off all six FAQ answers are
    hidden until the manager's one-line `<noscript>` release lands in
    `layout.tsx`. V30 is the proof. W5 cannot touch `layout.tsx`.

---

## 9. OWNER-VISIBLE THINGS HE SHOULD SEE ON THE WALK

1. Band 13 and band 11 are now **slate-900**, not the brand teal - the kit owns
   those two grounds (D6). Same as Property and generalist. Reversible only by a
   kit change.
2. Band 10's six-row **table became a numbered list**. Every sentence survives;
   what went with the table is its sr-only caption and the two column headers
   "Area" and "Our approach". **This is the only wording deletion in the
   package**, and those three strings existed only to name columns that no
   longer exist.
3. The warm off-white `#fafaf9` on four bands is now `slate-50` - the only way
   to clear the hex gate, since the ramp has no warm step. A cool off-white
   instead of a warm one.
4. Band 14 now shows the three newest guides by name, where it previously showed
   none.
5. The ten section labels are the existing wording, moved into the shared label
   component unchanged (owner question §G6 stands open).
6. `data-cta` ids added, all NEW, all on the new or restyled surfaces, none on
   the three existing chrome triples: `home_hero_primary`,
   `home_hero_secondary`, `home_tool_affordability`, `home_tool_fp34`,
   `home_tool_locum`, `home_research_openings`, `home_research_density`,
   `home_blog_post`. Each carries `data-cta-placement` and `data-cta-goal`
   (§G4's recommendation: goal only on new surfaces).

## 10. NOT TOUCHED, CONFIRMED

`globals.css`, `layout-utils.ts`, `PageShell.tsx`, `PharmaciesBackdrop.tsx`,
`lib/schema.ts`, `config/site.ts` (`leadConsentText` unread and unchanged),
`niche.config.json`, `lib/blog.ts` and `markdown-utils.ts` (W2's - imported
only, exported shape relied on, not altered), `data/pharmacies-hubs.ts` and
`pharmacies-services.ts` (W3's - `pharmacyHubs` imported only), `content/blog/**`,
`packages/web-shared/**`, `Property/**`, every other package's page files, and
every baseline JSON in this directory.
