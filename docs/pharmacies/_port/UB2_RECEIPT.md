# UB2 RECEIPT: second uplift round on the three pharmacies detail templates

Answering R4's PART B parity verdict (`R4_REREVIEW.md` §3) on the detail
templates only.

Files edited, all three and nothing else:

- `pharmacies/web/src/app/services/[slug]/page.tsx`
- `pharmacies/web/src/app/for/[slug]/page.tsx`
- `pharmacies/web/src/app/calculators/[slug]/page.tsx`

No build, no server start or stop, no subagent, no git command of any kind.
`localhost:3111` read with `curl` only (once, for the calculator band sequence).
`src/data/**`, `lib/calculators/**`, the kit under `packages/web-shared/**`, the
blog post template and the hubs: read, never written.

---

## 0. THE HEADLINE: the decline that blocked round 1 was wrong, and it fell

W3 and UB both declined `CardStack` and `CoverageCards` on every card grid on
these templates. Both receipts rest the decline on one sentence: *"the body is
one fixed `text-slate-700` `<p>` with no hook for the anchor colour and focus
ring the authored anchors need"*.

That hook exists at the **call site** and always did. `linkOnLight` in both
files is a set of `[&_a]:` Tailwind descendant variants, so a plain `div`
carrying it paints and rings every anchor inside whatever it wraps, kit
component included. **The same file already ships exactly that construct**
around the kit `FaqSection`:

```tsx
<div className={linkOnLight}><FaqSection … html alwaysRenderAnswers /></div>
```

So round 1 declined a shape the same file was already shipping twelve lines
below. No kit change was needed for this round and none was made. That is the
whole unlock behind R4 PART B gap 1, and it is recorded at each new call site so
the next reviewer does not re-file the dead decline.

---

## 1. `app/services/[slug]/page.tsx` (8 URLs)

### Band map, before and after

| # | band | ground BEFORE | ground AFTER | changed? |
|---|---|---|---|---|
| 1 | hero + backdrop | `bg-primary-950` DARK | `bg-primary-950` DARK | no |
| 2 | stats (`StatsCounter`) | `bg-slate-800` DARK | `bg-slate-800` DARK | no |
| 3 | challenges | `bg-white` LIGHT | `bg-white` LIGHT | no (contents only) |
| 4 | how we help | `bg-slate-50` LIGHT | `bg-slate-50` LIGHT | no (contents only) |
| 5 | FAQ (`FaqSection`) | `bg-white` LIGHT | `bg-white` LIGHT | no |
| 6 | `NextStepOffer` mount | UNGROUNDED (white) | UNGROUNDED (white) | no, see §4 |
| 7 | `LeadCTAPanel` | `contained ground="slate"` LIGHT | same | no |

**No ground was added, removed or re-tinted on this template.** Sequence is
`D D L L L L L`; last band light into the `slate-900` footer, as G3 left it.
The two leading darks are two different grounds (`0f3a4a` then `1e293b`), not an
adjacent repeat, and R4's own sweep reported `darkOnDark = 0` on these routes.

### Eyebrows: 1 → 3

| band | before | after | basis |
|---|---|---|---|
| hero | `service.title` | unchanged | UB |
| challenges | none | `service.title` | ADOPTED |
| how we help | none | `service.title` | ADOPTED |
| FAQ | `eyebrow=""` | `eyebrow=""` | declined, see below |

`service.title` is a string **this template already prints twice above** (final
breadcrumb crumb, hero Eyebrow), so nothing is minted and rule 1 holds. It also
clears the kit's own constraint on the primitive, checked both ways:
`design/marketing/TopicSection.tsx:51` requires an eyebrow that *"must not
repeat the heading's words"*, and neither `The challenges clients face.` nor
`How we help.` contains any word of `service.title`.

**Target was 4+ and this lands at 3.** Honest reason: `eyebrow=""` stays on the
`FaqSection`, because the kit default is the word "FAQ", which R4 m1 re-states
is a label this site does not publish, and `service.title` a fourth time on one
page is noise, not rhythm. The residual gap is R4 PART B gap 2 verbatim and
routes to the owner: four short band labels from him, or nothing.

### Components adopted, with props

| kit path | band | props | why it fits |
|---|---|---|---|
| `design/marketing/CoverageCards.tsx:46` | challenges | `items={service.challenges}` `columns={2}` `tone="slate"` `html`, inside `<div className={linkOnLight}>` | `CoverageItem` is `{title, body}` + three optionals, so the FROZEN data shape is assignable unchanged. `columns={2}` (:84) = the `md:grid-cols-2` this band already had; `tone="slate"` (:92) = the `bg-slate-50` card on a white band it already had. **AFFORDANCE, the point of the round:** `ring-1 ring-slate-200/70 hover:shadow-[0_18px_40px_-28px_rgba(15,23,42,0.4)]` + `transition-shadow duration-200` (:91,109). The boxes now lift under the cursor. |
| `design/marketing/NumberedReasons.tsx:130` | how we help | `items={service.howWeHelp}` | `{title, body}[]` exact match; its own grid is `md:grid-cols-3` (:160) = the three-up this band already had. It **dissolves** the card wall rather than restyling it: a drawn brand numeral and rule per item, lighting in sequence on first sight then stopping. Same `.story-numeral` / `.story-numeral-rule` pair the homepage already ships six of, which R4 measured at **5.14 on slate-50 with JS both on and off**. |

**Two more illustrative kit components on this template, as asked.**

### Contrast rows (every one already measured, no new ground)

| element | ground | ratio |
|---|---|---|
| `CoverageCards` card `bg-slate-50` on `bg-white` band | n/a | card/band edge is `ring-slate-200/70`, a graphic cue |
| card `h3` slate-900 | slate-50 | ~16:1 |
| card body slate-700 (`hex 334155`) | slate-50 | ~9.9:1 |
| body anchors `text-primary-700` (`hex 177392`) | slate-50 | **5.16** (W3 §5 row, unchanged) |
| `NumberedReasons` `.story-numeral` | slate-50 | **5.14** (R4's own measurement on `/`) |
| `NumberedReasons` `h3` slate-900 / body slate-600 | slate-50 | ~16:1 / ~7.0:1 |
| `Eyebrow` default `text-slate-600` | white and slate-50 | clears 4.5, the reason the kit picked 600 over 500 (`page-blocks.tsx:55-61`) |

### The one condition on `NumberedReasons`, measured not assumed

`NumberedReasons` renders its body as a **JSX text child** (`:176`) and carries
**no `html` prop**, so an anchor in a body string would print as literal markup
in front of the reader.

```
$ grep -c '<a href' pharmacies/web/src/data/pharmacies-services.ts
0
```

**Zero anchors in any field of that data file** (0 of 56 bodies, 0 of 32 FAQ
answers). A writer guard is written at the call site: if a cross-reference is
ever added to a `howWeHelp[].body` there, the band moves back to
`CoverageCards html` (two lines) or `NumberedReasons` gains the same `html` prop
`CardStack` (:108), `CoverageCards` (:65) and `ProcessTimeline` (:33) already
carry. Reported as a kit gap candidate.

---

## 2. `app/for/[slug]/page.tsx` (5 URLs)

### Band map, before and after

Identical to the twin, row for row, including the untouched grounds and the
`D D L L L L L` sequence. The `hub.noLeadForm` signpost band is **dead on all 5
live URLs** (no record sets the flag) and is not in the sequence; it was not
touched.

### Eyebrows: 1 → 1

**DECLINED on both card bands, and this is NOT a copy of the twin's verdict.
The twin adopts, this one cannot, and the reason is in the h2 strings rather
than the data.** `hub.title` is the only label either band could carry, but both
h2s on this template already interpolate `hub.title.toLowerCase()`:

- `What makes locum pharmacists accounting different.`
- `How we help locum pharmacists.`

An eyebrow reading "Locum Pharmacists" directly above either one repeats the
heading's own words, which is the single constraint the kit states on this
primitive (`TopicSection.tsx:51`). The twin's two h2s name no service, which is
why the same label earns its place there and not here. Minting a different one
is rule 1. **Count stays 1; this is R4 PART B gap 2 unchanged and the owner's
call.**

### Components adopted, with props

| kit path | band | props |
|---|---|---|
| `design/marketing/CoverageCards.tsx:46` | challenges | `items={hub.challenges}` `columns={2}` `tone="slate"` `html`, inside `<div className={linkOnLight}>` |
| `design/marketing/CoverageCards.tsx:46` | how we help | `items={hub.howWeHelp}` `columns={3}` `tone="white"` `html`, inside `<div className={linkOnLight}>` |

`columns={3}` + `tone="white"` reproduces the three-up white-card-on-slate-50
this band already had. `html` is **load-bearing on both bands here**, unlike on
the twin: measured on the data file, 2 of 20 `challenges[].body` and 12 of 15
`howWeHelp[].body` strings carry a real `<a href>` (`grep -c '<a href'
src/data/pharmacies-hubs.ts` = 19 across the file). The `linkOnLight` wrapper
colours and rings every one of them, so the `5.16 on slate-50` /
`5.37 on white` row carries over unchanged and **not one anchor is lost**.

### Shortfall, stated rather than padded

**One new distinct kit component on this template at two call sites, against a
target of two.** I did not find a second that the data genuinely fits, and I did
not force one. The four candidates and the measurement that killed each are in
§3. The specific thing that would close it is one kit prop:
`NumberedReasons` + `html`.

### Twin divergence, declared

`NumberedReasons` is adopted on the twin's "How we help" band and declined here.
Adopting it here would print **twelve raw anchor tags as visible text**. The two
templates are one shape by rule where the data is one shape; here it
demonstrably is not, and the reason is written at both call sites with the
counts. If `NumberedReasons` gains `html`, this band moves to it and the twin
proof is restored.

---

## 3. `app/calculators/[slug]/page.tsx` (3 URLs)

### Band map, before and after

| # | band | ground BEFORE | ground AFTER |
|---|---|---|---|
| 1 | hero | `ground-dark bg-[var(--brand-primary)]` DARK | unchanged DARK |
| 2 | calculator (+ `CalcResultCta` **card** inside) | `bg-white` LIGHT | **`bg-slate-50` LIGHT** |
| 3 | explainer | `bg-white` LIGHT | `bg-white` LIGHT |
| 4 | FAQ | `bg-[var(--surface)]` LIGHT | `bg-[var(--surface)]` LIGHT |

**Band 2's class is the coordinator's W7C handoff, applied.** W7C measured the
defect (`W7C_RECEIPT.md` §3) and could not reach the file; this round owns it.

**Why the defect existed, and the honest correction to UB's receipt.** Served
HTML of the build under test:

```
$ curl -s http://localhost:3111/calculators/locum-take-home-comparator \
  | grep -oE '<section[^>]{0,120}'
<section class="ground-dark bg-[var(--brand-primary)] py-12 sm:py-16"
<section class="bg-white py-12 sm:py-16"
<section class="rounded-2xl border-l-4 border-[var(--brand-primary)] bg-[var(--surface)] p-5 sm:p-6" aria-labelledby="calc_resul…
<section class="bg-white py-12 sm:py-16"
<section class="bg-[var(--surface)] py-12 sm:py-16"
```

Five `<section>` **elements**, so UB recorded "dark / white / surface / white /
surface, zero adjacent repeats" and R4's element-counting sweep agreed. Entry 3
is not a band: the class string is a rounded, brand-edged **card** inside band 2
(`CalcResultCta.tsx:23`). At band level the real sequence was
**dark / white / white / surface**, which is exactly the pair V2 measured at 390,
768 and 1440.

**After:** `DARK / slate-50 / white / surface`. Zero adjacent repeats at band
level, last band light (`--surface` = `globals.css:129` `hex f8fafc`) before the
dark footer. `slate-50` is an already-measured ground on this route (the FAQ band
paints the same value through `--surface`), so **no new contrast row is needed**
and the kit Calculator's own cards are white and keep their edge.

**One consequence, declared rather than left for the next reviewer:**
`CalcResultCta`'s card is `bg-[var(--surface)]`, now the same value as its
band's ground, so that card no longer separates by fill. It keeps the edge it
already had, `rounded-2xl border-l-4 border-[var(--brand-primary)]`, a brand
rule rather than a tint. `components/calculators/**` is off limits here, so
repainting that card white is the next package's one-class change if the owner
wants fill separation back as well.

### Eyebrows: 1 → 1

DECLINED on the explainer band, re-checked against **each of the three records**
rather than inherited. `tool.category` is the only label the shape publishes and
it is already the hero Eyebrow, but the decisive test is `TopicSection.tsx:51`
and all three fail it:

| category | explainer heading | repeats? |
|---|---|---|
| Locum Pharmacists | Why the tax route matters less than employment status for **locum pharmacists** | yes |
| NHS Contract and Income | How the **NHS** FP34 payment cycle drives pharmacy cash flow | yes |
| Buying a Pharmacy | How to assess **pharmacy** purchase affordability | yes |

`oneLiner` is the only other string on the record and this page never prints it,
so using it publishes new copy. **Count 1, owner's call.**

### R4 PART B gap 1 does not apply to this template, stated not skipped

**There is no card wall on it.** Its four bands are a hero, the kit calculator
(whose cards all live in `components/calculators/**` and
`packages/web-shared/tools/**`, both off limits), one prose column, and the kit
`FaqSection`. `GenericTool` (`packages/web-shared/tools/types.ts:86-100`)
publishes no `{title, body}` set and no `string[]` of claims on any of the three
records: `related` and `workedExamples` are both optional and both **absent**
(`grep -n 'related\|workedExamples' src/lib/calculators/tools/*.ts` = 0), so the
two fields that would have fed a card grid or a tick list carry nothing.
**Nothing was forced into place to make a count.**

### The one component the data does fit

| kit path | band | props |
|---|---|---|
| `design/primitives/page-blocks.tsx:13` `Prose` | explainer | children = the existing `tool.explainer.paragraphs.map(p => <p key={i}>{p}</p>)` |

This replaces a hand-rolled copy of the kit's own body stack.
**Byte-equivalent colour, checked:** the local class was
`text-[var(--ink-soft)]` and `globals.css:132` binds `--ink-soft: hex 334155`,
which **is** slate-700, the colour `Prose` paints (`:17`). Same
`mt-6 space-y-4 leading-relaxed`. The only delta is `text-sm sm:text-base`
instead of a flat `text-base`, one step smaller at 390 only, which is the
site-wide body rhythm every other kit band already uses.

### Exactly one form, re-checked

One form on the route, directly under the result, **no gate and no PDF**. The
explainer's duplicate went in phase 0 and nothing was added back.
`lib/calculators/**` untouched, so the three golden test files are unchanged.

---

## 4. Declines, every one at the call site, naming the kit path

| kit path | where | verdict and reason, re-read today |
|---|---|---|
| `design/marketing/CoverageCards.tsx:119-134` "no anchor hook" | both twins, both bands | **DEAD. Reversed.** The hook is the `[&_a]:` call-site wrapper the same file already uses on `FaqSection`. §0. |
| `design/marketing/CoverageCards.tsx:88` `glow` | both twins | DECLINED. The glow surface hardcodes `rgba(5,150,105,0.28)` / `rgba(5,150,105,0.4)`, a **green** drop shadow no call site can repoint; this brand is `hex 0f3a4a`. R4 asked for "one `card-glow` per card"; the hover lift is that affordance without painting another site's brand onto this one. |
| `CoverageCards.tsx:23` `icon`, `:16` `outcome` | both twins | DECLINED. Both optional, so the old *reason* is stale, but neither has a source: the frozen shapes publish no icon and no outcome line. Choosing a lucide glyph per subject, or writing a "what you walk away holding" line, is authoring. **R4's "one icon per card" needs eight icon choices from the owner, or nothing.** |
| `CoverageCards.tsx:31` `href` | both twins | DECLINED. Nothing in the data names a destination for a challenge or a service step; rule 1 forbids minting one. |
| `design/primitives/page-blocks.tsx:97` `CardStack` | both twins | DECLINED. `columns` is still `1 \| 2` (`:112`) so it cannot lay out the three-up band, and its card carries **no hover or focus treatment at all** (`:117`). Adopting it would satisfy "is a kit component" while leaving R4's actual finding, the missing affordance, exactly where it was. |
| `design/marketing/NumberedReasons.tsx:130` | `for/[slug]` how we help | DECLINED, **measured**: body is a JSX text child (`:176`), no `html` prop, and 12 of 15 `howWeHelp[].body` strings in `pharmacies-hubs.ts` carry an `<a href>`. Twelve raw anchor tags as visible text. ADOPTED on the twin, whose data file has 0. |
| `design/marketing/WhyUsList.tsx:65` | `for/[slug]` how we help | DECLINED, same measured reason, same line of markup. |
| `design/marketing/NumberedReasons.tsx:130`, `WhyUsList.tsx:12` | `calculators/[slug]` | DECLINED. `explainer.paragraphs` is `string[]` with no titles, and both assert an ordinal sequence the paragraphs do not claim. |
| `design/marketing/ProcessTimeline.tsx:26` | all three | DECLINED. Needs `{n, title, body}`; no data file publishes staged steps, and minting the step numbers as labels asserts an order the copy does not claim. (`NumberedReasons` is adopted on the twin precisely because its numerals are ordinals the component generates, not labels the data must carry.) |
| `design/marketing/ComparisonTable.tsx:32-47` | all three | DECLINED. Still forces a `general` string per row plus a "Most recommended" pill; these are single-column `{title, body}` lists, so the other column would be authored. |
| `design/marketing/WhatToExpectCard.tsx:22-27` | both twins | DECLINED, **new reason, old one retired.** `items` and `title` are both overridable now, so the DEFAULT_ITEMS fixed-fee line is stale. The standing reason: the only candidate `items` source is `howWeHelp[].title`, which the band below already prints. A navy card re-listing three headings directly under them is duplication, not a component. |
| `design/marketing/DrawnTickList.tsx:33` | both twins | DECLINED. Takes `string[]` of short claims. The frozen shapes publish no list of claims anywhere: every field is a scalar, a `{value,label}` stat, a `{title,body}` pair or a `{question,answer}` pair. Feeding it `challenges[].title` or `howWeHelp[].title` would drop the bodies, i.e. **delete prose**. Same verdict as W3, re-derived. |
| `design/marketing/DrawnTickList.tsx:33` | `calculators/[slug]` | DECLINED although `explainer.paragraphs` *is* `string[]`: the item renders as one `<span>` beside a 20px tick (`:98`), a one-line claim. These are 40-to-70-word paragraphs; three of them as tick rows reads as a promise list, a different claim from the explanation they are. |
| `design/marketing/TopicSection.tsx:38` | `calculators/[slug]` | DECLINED. Requires a non-optional `eyebrow`, which is exactly what §3's eyebrow decline says cannot be supplied. |
| `design/marketing/StatsCounter.tsx` | `calculators/[slug]` | DECLINED. `GenericTool` publishes no `stats` array at all, unlike `PharmacyService`. |
| `design/primitives/ExampleFigureNote.tsx:22` | `calculators/[slug]` | DECLINED. Its default label is a kit string so rule 9 would permit it, but each tool already publishes its own caveat in `result.note`, which the kit Calculator renders on the result panel. Same objection that already stands against `NoticeCard` here. |
| `design/marketing/ScrollGlowGroup.tsx` | both twins, both bands | **REMOVED, not adopted.** Its stagger keys off `[data-glow="on"] > *`, i.e. DIRECT children, and each kit component now renders its own single grid element, so wrapping either would glow one opaque block instead of a per-card wave. Both kit components bring their own entrance or hover treatment, so the wrapper goes rather than firing on a single child. |
| `design/primitives/FaqSection.tsx` `eyebrow` | all three | `eyebrow=""` HELD. Kit default is "FAQ", which R4 m1 re-states is a label this site does not publish. FAQ stays on the **same binding** that feeds the JSON-LD on all three templates: `service.faqs` / `hub.faqs` / `tool.faqs`, untouched. |
| R4 **N3**, un-grounded `NextStepOffer` band | both twins | **RE-CHECKED, RECORDED, NOT FIXED.** R4's measurement is right and its named fix is `<section className="bg-slate-50 py-12">`. It is not taken from these files because `NextStepOffer` is a **client** component that returns null when the visitor has no behaviour-matched offer (`NextStepOffer.tsx:26`), which a server component cannot know, so a padded grounded section paints a ~96px **empty slate-50 stripe** on every route where no offer matches. Dropping the padding so the section collapses when empty leaves slate-50 hugging the card with white above and below, which is not a band either. Both candidates are worse than the minor they close. The honest fix is `NextStepOffer` rendering its own grounded section when it has something to show: `components/intent/**`, handed on. |

---

## 5. Prose multiset statement

**Not one sentence was written, rewritten, reordered or deleted on any of the
three templates.** Every `{title}`, `{body}`, `{question}`, `{answer}`,
`{headline}`, `{intro}`, `{explainer.heading}` and `{explainer.paragraphs}`
string is read from the same frozen field, at the same position in the band, and
rendered through the same mechanism (`dangerouslySetInnerHTML` stays
`dangerouslySetInnerHTML` wherever it was; JSX text children stay JSX text
children). Read-diff by hand on all three files: only `className` strings,
component identities, props, two new `<Eyebrow>` elements and one `<section>`
background class changed.

Three rendered-text deltas, all duplication of strings the template already
prints or kit-generated ordinals, none of them authored copy:

1. `services/[slug]`: `service.title` now prints **two more times** (the two
   band eyebrows), alongside the breadcrumb crumb and hero eyebrow it already
   had. Same precedent already shipped on these templates (`service.title` /
   `hub.title` duplicated between crumb and hero eyebrow) and on the blog post
   template (`post.category`).
2. `services/[slug]`: `NumberedReasons` prints `01`, `02`, `03` as text. These
   are **ordinals the kit component generates** (`String(i + 1).padStart(2,
   "0")`, `:168`), not labels from the data, and they are the same
   `.story-numeral` marks the homepage already ships six of.
3. Nothing new on `for/[slug]` or `calculators/[slug]`.

**Nothing removed.** Flagging (1) and (2) in case the multiset tool treats
eyebrow duplication or generated ordinals as a diff.

### Link floors

No `href` was added or removed on any of the three files.

```
href= occurrences:  services/[slug] 1   for/[slug] 2   calculators/[slug] 0
```

Unchanged from before this round (hero `/contact` on each twin, plus the dead
`noLeadForm` signpost link on `for/[slug]`). Body anchors are preserved by
`html` on every band that carries one: `for/[slug]` 2 of 20 challenges + 12 of
15 how-we-help, `services/[slug]` 0 of either (measured, `grep -c '<a href'` on
that data file = **0**), FAQ answers untouched on all three. **Every floor R4
and UA named holds or rises; none can drop.**

---

## 6. Verification

```
$ cd pharmacies/web && npx tsc --noEmit
TSC_EXIT=0          # no output, clean
```

```
$ cd pharmacies/web && npx vitest run
 ✓ src/tests/capture-exclusion.test.ts (14 tests)
 ✓ src/tests/focus-ring.test.ts (3 tests)
 ✓ src/lib/calculators/tools/locum-take-home-comparator.test.ts (11 tests)
 ✓ src/lib/calculators/tools/pharmacy-fp34-cash-flow-estimator.test.ts (6 tests)
 ✓ src/lib/calculators/tools/pharmacy-purchase-affordability.test.ts (7 tests)
 ✓ src/tests/lead-submit-verify.test.ts (6 tests)
 ✓ src/tests/lead-contactability-bridge.test.ts (7 tests)
 ✓ src/tests/intent-taxonomy.test.ts (32 tests)

 Test Files  8 passed (8)
      Tests  86 passed (86)
```

**Baseline note, flagged not fixed:** the brief states 83. The tree runs **86**
across 8 files. No test file was created, edited or deleted by this round, and
the three calculator golden files (24 of the 86) pass unchanged with
`lib/calculators/**` untouched, so the 3-test delta came from another package
landing concurrently. Worth one line in whoever tags, so the next reviewer does
not read 86 as drift.

### Standing-rule greps over the three edited files

| check | services | for | calculators |
|---|---|---|---|
| `grep -cE 'text-\[#\|bg-\[#\|border-\[#'` raw hex | 0 | 0 | 0 |
| `grep -c '—\|–'` em / en dash, whole file incl. comments | **0** | **0** | **0** |
| `grep -c 'outline-none\|section-label'` | 0 | 0 | 0 |
| `focusRing` recipe intact on every focusable | yes | yes | n/a (no link on template) |
| `ScrollGlowGroup` live references | 0 (comment only) | 0 (comment only) | 0 (comment only) |

Seven em-dashes were introduced by this round's own comments and removed before
finishing; the three files now grep to a true zero, which is the state R4
verified and the gate row expects.

---

## 7. What is still open after this round

1. **Eyebrow density, owner question.** 3 / 1 / 1 against R4's target of 4+.
   Every remaining band either publishes no label or publishes one that repeats
   its own heading. **Four short band labels from the owner closes it; nothing
   else can without authoring copy.** This is R4 PART B gap 2, unchanged.
2. **One kit prop closes the twin divergence and `for/[slug]`'s component
   shortfall at once:** `html` on `NumberedReasons.tsx`, mirroring
   `CardStack:108` / `CoverageCards:65` / `ProcessTimeline:33`. Additive,
   byte-identical for every existing caller.
3. **Card icons, owner question.** `CoverageItem.icon` is optional and ready;
   R4's "one icon per card" needs the owner to pick eight glyphs. Not authored
   here.
4. **R4 N3**, the un-grounded `NextStepOffer` band: belongs in
   `components/intent/**`, see §4.
5. **`CalcResultCta` card fill** now matches its band's ground; one class in
   `components/calculators/**` if the owner wants fill separation as well as the
   brand edge.
6. **`glow`'s hardcoded green** (`CoverageCards.tsx:88`) remains unusable on any
   non-green brand. Estate-wide kit defect, already logged by W3 §9 item 5.
