# W4 receipt, calculators and the embed surface (phase 4)

Date 2026-10-07. Package W4 of the pharmacies design port. Read-only outside the
OWNS list. No build, no dev server, no git write, no subagent.

## 1. Files changed (all inside OWNS)

| file | change |
|---|---|
| `src/app/calculators/page.tsx` | kit `Breadcrumb`, paragraph split, `data-cta` on the three cards, kit `NoticeCard`, kit `LeadCTAPanel` + `LeadForm` (first form on this route) |
| `src/app/calculators/[slug]/page.tsx` | kit `Breadcrumb tone="onBrand"` replacing the hand-rolled trail, `Eyebrow onDark` on `tool.category`, `.ground-dark` + `text-balance` on the hero, flat FAQ block replaced by kit `FaqSection alwaysRenderAnswers`, two written declines |
| `src/app/embed/[slug]/page.tsx` | visually-hidden `h1`, `data-cta` on the attribution link |
| `src/components/calculators/CalculatorClient.tsx` | `headingLevel={2}` on the kit `Calculator`; `eyebrow` deliberately not passed (reason at the call site) |
| `src/components/calculators/CalcResultCta.tsx` | kit `ExampleFigureNote` above the one capture; strings now imported, not literal |
| `src/lib/calculators/site.ts` | two exported copy consts (`CALC_CAPTURE_HEADING`, `CALC_CAPTURE_BLURB`), one source for two consumers |

Not touched: `lib/calculators/registry.ts`, `lib/calculators/tools/**`,
`lib/calculators/schema.ts` (`WebApplication` JSON-LD byte-identical),
`components/calculators/MiniCapture.tsx` (mounted, props unchanged), and every
file on the OFF LIMITS list.

## 2. Adoptions

| kit file | where | notes |
|---|---|---|
| `design/primitives/Breadcrumb.tsx` | all 3 tool pages (`tone="onBrand"`) + `/calculators` (default tone) | these 4 routes emitted NO `BreadcrumbList` before. Pure gain. |
| `design/primitives/page-blocks.tsx` `Eyebrow` | tool hero, `onDark`, fed `tool.category` | existing string, no new label |
| `design/primitives/FaqSection.tsx` | all 3 tool pages, `alwaysRenderAnswers`, `eyebrow=""`, `tone="white"` | same `tool.faqs` binding that feeds `FAQPage` (T17). `html` NOT passed: a tag scan of the whole `faqs` block in all three tool files returns `[]`, the answers are plain text. |
| `design/primitives/NoticeCard.tsx` | `/calculators`, `tone="slate" ground="white"` | fed the page's own second sentence, verbatim |
| `design/primitives/ExampleFigureNote.tsx` | `CalcResultCta`, directly under the result panel on all 3 tools | default label kept: these are explicitly scenario estimates, per its docstring `:1-21` ruling (note on every visual carrying figures; `StatsCounter` the one exception) |
| `design/marketing/LeadCTAPanel.tsx` | `/calculators`, `contained` + `ground="white"` | `eyebrow=""`, `formTitle=""` (locked rule 9), `proofPoints={[]}` (the index publishes none and inventing three would author copy), `form={<LeadForm submitLabel="Send enquiry" />}`. `contained` not the navy band: a new dark ground here would need `.ground-dark`, a backdrop and a measured ratio for no design reason, with the navy footer directly beneath (section F item 8). |
| `tools/components/Calculator` | kept (already adopted), now `headingLevel={2}` | the heading-skip lever, see §3 |

## 3. Heading order, P0-B #9 and #10

- `headingLevel={2}` on the kit `Calculator` makes the widget's tool name an
  `h2`. The kit accordion wraps each trigger in Radix's `AccordionPrimitive.Header`,
  which is an `h3` (`accordion.tsx:35`), and the explainer and FAQ titles are
  `h2`. Served order on each tool page is therefore `h1 -> h2 -> h2 -> h2 -> h3`:
  no skip, and the in-widget `h3 -> h2 -> h3` jump is gone.
- `/embed/[slug]` now carries `<h1 className="sr-only">{tool.name}</h1>`
  (**owner decision, default yes**). The reason is written at the line: the embed
  is a real page on its own URL that an assistive reader can land on, so it needs
  a top-level heading, while a VISIBLE one would put a second title above the
  widget's own name inside a partner's layout. Order there is `h1 -> h2`.
- These are derived from the source, not from a rendered page. **V1 must confirm
  them on the served HTML** (no build in this package).

## 4. Declines, each written at the call site

| kit file | where the reason is written | reason, in one line |
|---|---|---|
| `packages/web-shared/leads/MobileToolSlot.tsx:14` | `calculators/[slug]/page.tsx`, above the `CalculatorClient` mount | it is the mobile stand-in for a DESKTOP-ONLY premium tool (docstring `:3-10`, rendered inside `PremiumUpgrade`'s `sm:hidden` block); all three pharmacy tools run fine at 390 and this site has no `PremiumUpgrade` surface, so the slot would hide a working calculator behind a form on mobile. It also requires `siteConfig` and `submitLead` (`:25-26`) binding the KIT `MiniCapture`; this site's local `MiniCapture` signature is frozen (W6) and accepts neither. **Testable:** `grep -rn PremiumUpgrade pharmacies/web/src` hits nothing but that comment. |
| `packages/web-shared/design/primitives/NoticeCard.tsx:19` (tool pages only) | `calculators/[slug]/page.tsx`, in the kept phase-0 comment block | each tool already publishes the estimates caveat inside its own `result.note`, which the kit `Calculator` renders on the result panel (`tools/components/Calculator.tsx:211-240`); a card here would print a second, weaker copy of a caveat the reader has just read, and `result.note` lives in the OFF LIMITS `lib/calculators/tools/**` so it cannot be moved. The component **is** adopted on `/calculators`, where the same sentence had no home. **Testable:** `grep 'note:' lib/calculators/tools/*.ts`. |
| kit `Calculator`'s `eyebrow` prop | `CalculatorClient.tsx` | `tool.category` is the site's only candidate label and the hero now renders it as `<Eyebrow onDark>`; passing it here as well would print the same label twice within one screen. The kit's default black "Calculator" tag stays, unchanged, on both variants. |

No stale decline reused: K1/K2 do not touch this package, and both of W4's
declines were re-derived from the kit source today.

## 5. Wording

**No sentence was written, changed or deleted.** Two existing strings moved:

1. `/calculators`'s single paragraph was split at its own sentence break. The
   claim ("Free scenario tools built on current HMRC rules.") stays under the
   `h1`; the caveat ("All calculators are estimation tools only: speak to a
   specialist before filing or transacting.") moves, byte-identical, into the
   `NoticeCard` below the cards.
2. `CalcResultCta`'s heading and blurb became two consts in
   `lib/calculators/site.ts` and feed the `/calculators` `LeadCTAPanel`'s
   required `title` / `description`. The index publishes no CTA copy of its own
   and locked rule 1 bars authoring any, so the panel is fed the strings the same
   visitor already reads one click deeper. They live in `site.ts`, not in the
   `"use client"` `CalcResultCta`, because `/calculators` is a Server Component
   and a non-component export of a client module reaches it as a client
   reference, not a string. `leadConsentText` in that file was not touched (T19).

## 6. One form per result, and the embed

- `grep -c '<form'` across every W4-owned file = **0**: every form on these
  routes comes from `MiniCapture` (one mount, in `CalcResultCta`) or `LeadForm`
  (one mount, on the index panel). No gate, no PDF, no second capture. The
  phase-0 comment recording the deleted duplicate is kept and extended.
- `/embed/[slug]`: no chrome, no form, no `LeadCTAPanel`, no backdrop, no sticky,
  no widget. `variant="embed"` also means the kit `Calculator` never renders
  `resultCta`, so the capture cannot leak onto the embed even if one were passed.
  `PageShell`'s `/embed/` PREFIX bypass (`PageShell.tsx:63`) is untouched.

## 7. `data-cta`, new live segmentation

Zero `data-cta-goal` existed on this site before this wave. W4 adds, all on an
`<a>`, never a wrapper:

| id | placement | goal | route |
|---|---|---|---|
| `calc_index_tool` | `index_grid` | `tool` | `/calculators`, the three tool cards |
| `embed_attribution` | `embed` | `tool` | `/embed/*`, the "Powered by" link |

The existing three triples (`header_contact`, `sticky_cta`, `sticky_cta_close`)
are untouched; the existing calc CTA ids were not renamed.

**`calc_index_help` was NOT emitted, and this is a deliberate departure from the
brief (rule 22).** The brief asks for it "on the control". The only control it
could sit on is a hero anchor to the panel, and `/calculators` publishes no link
label for one, so creating it would mean authoring a sentence (locked rule 1) or
hanging the id on a `<div>` (locked rule 19). `LeadForm`'s submit button carries
no `data-cta` and that file is not W4's. **Manager/owner item:** one
`niche.config.json` string (a help-CTA link label) unblocks the anchor, and then
`calc_index_help` is a one-line add.

## 8. Contrast measured on every new ground

| text / mark | ground | ratio | floor |
|---|---|---|---|
| `Breadcrumb tone="onBrand"` link, white | brand hero | 12.18 | 4.5 PASS |
| same, `white/80` separator and list | brand hero | 8.41 | 4.5 PASS (3.0 graphic PASS) |
| `Eyebrow onDark` text, slate-300 | brand hero | 8.20 | 4.5 PASS |
| `EyebrowRule onDark`, `bg-primary-400` | brand hero | 6.63 | 3.0 PASS |
| `ExampleFigureNote`, slate-500 at 11px | the calculator card's white ground | 4.76 | 4.5 PASS |
| `NoticeCard` body, `--ink-soft` | slate-50 card on white | 9.90 | 4.5 PASS |

`.ground-dark` added to the tool hero section, so every ring inside it (the
breadcrumb links) takes the white `--focus-ring-on-brand` value. The brand hero
is the only ground W4 paints dark; no new dark band was created, and the
`LeadCTAPanel` was deliberately kept off the navy variant (§2).

K3 is a non-issue for this package, verified: `AccordionTrigger`'s ring reads
`var(--kit-focus-ring,var(--color-primary-600))` (`accordion.tsx:39`) and
`globals.css:182,228` declares `--kit-focus-ring` on both grounds, so the kit FAQ
ring is already inside this site's mechanism.

## 9. Acceptance checks run now (no build needed)

```
cd pharmacies/web && npx tsc --noEmit
(no output)  TSC_CLEAN

cd pharmacies/web && npx vitest run
 Test Files  6 passed (6)
      Tests  40 passed (40)
   Duration  742ms

python scripts/check_dependency_closure.py
dependency closure OK across 19 sites
```

Greps over the seven owned files:

| check | result |
|---|---|
| em/en dashes | 0 |
| `#[0-9a-fA-F]{3,8}` | **0** (target was 0; the one transient hit was a hex inside a comment I wrote and removed) |
| `neutral-[0-9]{2,3}` | 0 (P1-D holds, no re-sweep) |
| `section-label` | 0 |
| `<main` / `<header` / `<footer` | 0 |
| `outline-none` | 0 |
| `focus-visible:outline-[...]` arbitrary values | 0 in owned files (rings come from `layout-utils` / the kit) |
| `data-cta` on a `<div>` | 0, all on `<a>` |
| `prose-neutral` | 0 |
| `<form` | 0 (both forms are mounted components) |

**`tsc` note for the manager:** the brief's baseline says ONE error,
`research/pharmacy-openings-closures-index/page.tsx:69`. It is already closed on
the working tree (`value: r.count ?? 0`), so the tree is at zero before and after
W4. W6's one-line row is done.

## 10. Phase-0 serious items, verified not deferred

All four calculator factual items (P0-A serious 1-4) are fixed in the OFF LIMITS
`lib/calculators/tools/**`, verified by reading the source, not assumed:

1. Class 2 NIC: `locum-take-home-comparator.ts:283` states it is not charged
   above the Small Profits Threshold.
2. SDLT on goodwill: `pharmacy-purchase-affordability.ts:157` applies the
   non-residential bands to the premises figure only and says goodwill and the
   NHS contract are outside SDLT.
3. FP34 delay: `pharmacy-fp34-cash-flow-estimator.ts` models the settlement lag
   and the accumulated working-capital gap (`:131`).
4. Uncited lending range: the tool now declines to publish a valuation multiple
   at all and says so in its own FAQ (`pharmacy-purchase-affordability.ts:180`).

Nothing to report as a phase-0 regression.

## 11. For V1, everything that needs the build

1. Heading order on each of the three tool URLs is `h1 -> h2 -> ... -> h3` with
   no jump (baseline `h1 -> h3`), and `h1 -> h2` on each `/embed/*`.
2. `grep -c '<form'` on each served tool URL = **1**.
3. `grep -o '"@type":"WebApplication"' | wc -l` = **1** per tool, and the block is
   byte-identical to the baseline.
4. `curl /embed/<slug> | grep -c '<header\|<footer\|<nav\|data-cta="sticky_cta"\|<form'`
   = **0** for all three slugs. (The kit `Breadcrumb` renders a `<nav>`; it is
   mounted on the tool pages and the index, NOT on the embed, so this stays 0.)
5. `json.loads` every `ld+json` block on all 7 URLs: 3 tools now serve three
   blocks each (`WebApplication`, `FAQPage`, and the new `BreadcrumbList`),
   `/calculators` serves one (`BreadcrumbList`), `/embed/*` serves none.
6. Link floors from the SERVER HTML: `/calculators` >= **13**, each tool >= **11**.
   W4 removed no link (the hand-rolled trail's Home and Calculators links are
   both reproduced by the kit `Breadcrumb`) and added none to the tool pages, so
   the expected delta is 0 on the tools and 0 on the index. Report the measured
   delta; never pad.
7. JS OFF on a tool URL: every FAQ answer must be readable. `alwaysRenderAnswers`
   puts them in the HTML but `accordion.tsx` sets `data-[state=closed]:hidden`,
   so **K4 (the one-line `layout.tsx` `<noscript>` release) is now load-bearing
   for these three routes as well.** It is a MANAGER edit; V1 row V30 is the proof.
8. Horizontal overflow at 390 stays 0 on all 7 routes.
9. `--grounds` delta: W4 paints no new dark ground (the tool hero was already
   brand-dark and now declares `.ground-dark`), so the expected delta is 0.

## 12. Defects seen but not reachable (M1 input)

1. `src/components/forms/LeadForm.tsx` carries **no `data-cta` on its submit
   button** (grep = 0). Every `LeadCTAPanel` on this site therefore ends in an
   unmeasured control. Not W4's file. One attribute, one place.
2. `src/lib/calculators/site.ts:7-8` holds a SECOND copy of `leadConsentText`,
   with the comment "must stay in step with web/src/config/site.ts". Two frozen
   copies of a string whose last edit cost another site 6 leads a week is a trap
   waiting for the next editor; it wants one import, not two literals. Left
   exactly as found (T19) and raised rather than touched.
3. `/calculators` has **no `openGraph` block** in its metadata, unlike the three
   tool pages (section F item 14 territory: a phase-0 minor nobody owns).
4. `src/app/embed/[slug]/page.tsx:43` renders `&middot;` as an HTML entity inside
   JSX text, which React prints literally as the character; harmless, but it is
   the kind of entity that reads as markup in a scrape. Cosmetic, left alone.
