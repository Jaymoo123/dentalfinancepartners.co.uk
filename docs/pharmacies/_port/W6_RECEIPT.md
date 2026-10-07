# W6 RECEIPT — contact, funnel, legal, research and forms (phase 6)

Date 2026-10-07. Builder: W6. No subagents launched. No build, no server, no git
write command. Every path and count below re-derived from the working tree.

---

## 1. GATES

```
cd pharmacies/web && npx tsc --noEmit
  (no output, EXIT=0)

cd pharmacies/web && npx vitest run
  Test Files  6 passed (6)
       Tests  40 passed (40)
   Duration   724ms
  lead-submit-verify.test.ts (6 tests) GREEN
  lead-contactability-bridge.test.ts (7 tests) GREEN
  (the two stderr lines in that file are its own deliberate fail-open and
   db-error fixtures, not failures)

python scripts/check_dependency_closure.py
  dependency closure OK across 19 sites
```

**BRIEF CORRECTION 1 (T11).** The brief's shared-acceptance block says
"BASELINE: ONE error, research page:69 (W6 owns it)" and §E.1 item 11 says the
same. **It is false on the working tree.** `npx tsc --noEmit` was run BEFORE any
W6 edit and was already clean: `page.tsx:69` now reads `value: r.count ?? 0` at
line 83 of the pre-edit file (the `const seasonalityMax` line is what sits at
:69 today). Phase 0 part 3 fixed it. **W6 verified it and did NOT redo it.** V1
row V1 still expects zero errors and gets zero.

**BRIEF CORRECTION 2.** The brief's baseline is "5 test files"; it is **6**
(P1-F added `src/tests/focus-ring.test.ts`). 40 tests, all green.

**BRIEF CORRECTION 3.** The brief's W6 ADOPT list says `SlimHero` on "the
research pages and the three legal pages". Re-derived against the current kit,
that is wrong on both sets and right somewhere else: SlimHero is adopted on
`/book`, `/complete` and `/thank-you`, the three pages its own docblock
(`SlimHero.tsx:5-13`) names, and declined on research and legal for reasons
written at every call site (§4). Hospitality's research hero and startups-tech's
legal pages reached the same two verdicts independently.

**BRIEF CORRECTION 4.** The brief's §C **K4** says the `<noscript>` FAQ-hiding
fix is "YES, REQUIRED" and a pending manager edit. **It is already applied**:
`pharmacies/web/src/app/layout.tsx:50` carries
`[data-state="closed"][role="region"] { display: block !important; }` inside the
existing `<noscript>` block. Radix `AccordionContent` renders `role="region"`,
so both of this package's `FaqSection alwaysRenderAnswers` mounts are covered.
V30 should PASS as shipped; nothing is owed.

**BRIEF CORRECTION 5.** The brief's §C **K3** asks whether
`accordion.tsx`'s trigger ring is a hardcoded `outline-primary-600` literal.
**It is not, and there is no gap.** `accordion.tsx:39` already reads
`focus-visible:outline-[var(--kit-focus-ring,var(--color-primary-600))]`, which
is exactly the proposed fix, and this site declares `--kit-focus-ring` in
`globals.css`. Both FaqSection mounts here sit on light sections with no
`.ground-dark` in scope, so the trigger ring resolves to brand-950 `#0f3a4a`,
12.18 on white. PASS. Gate row 6 does not need the kit FAQ trigger listed.

---

## 2. SHARED ACCEPTANCE GREPS, over the 14 owned files

| check | result |
|---|---|
| `grep -c $'—\|–'` em/en dashes | **0** (one en-dash found and removed from a `ponytail:` comment at `BookingPicker.tsx:22`; it was never user-facing, but the rule's grep does not know that) |
| `neutral-[0-9]{2,3}` | **0**. P1-D is intact. No hit anywhere, so no revert to report |
| `section-label` | **0** |
| `<main` / `<header` / `<footer` | **0**. PageShell owns all four |
| `focus-visible:outline-\[[^]]*\]` | **0 literal occurrences** in owned files: every ring arrives through `focusRing` from `@/components/ui/layout-utils`, which is the single `var(--focus-ring)` recipe |
| `outline-none` | **1, reasoned AT the line** (`LeadForm.tsx:325`). See §5 |
| `data-cta` | **2 attribute hits, both on a `<Link>`**, both pre-existing and byte-identical: `data-cta="thankyou-return-article"` and `data-cta-placement="thank_you"` on `/thank-you`. Zero on a `<div>`. See §6 |
| `role="img"` on charts + both research pages | **0 / 0 / 0** (was 4 on the charts file) |
| `@layer components` rules, unlayered author rules | **0** in owned files |

### Hex census (`grep -rhoE '#[0-9a-fA-F]{3,8}'`)

Brief's target for W6 was **77**. Now **30 occurrences, of which 25 are prose
inside comments** (measured contrast ratios and the names of the values that were
replaced, which have to be written down to be checkable) and **5 are paint**, all
five reasoned at the line in `PharmacyIndexCharts.tsx:26,27,28,37`:

| value | role | reason, written at the line |
|---|---|---|
| `#0f3a4a` | `BRAND` | primary-950, THE brand hex. 12.18 on white |
| `#177392` | `ACCENT` | primary-700. Replaces off-ramp `#2d7a94`. 5.38 on white |
| `#acefff` | `MUTED` | primary-200. Replaces off-ramp `#c9d8dd` / `#a8c5cd` |
| `#c2410c` | `SERIES_B` | the one genuinely off-ramp literal: a two-series comparison chart needs a second HUE and this ramp is single-hue (OKLCH -133) by construction, so every step reads as the same line at a different lightness. A dash pattern alone does not separate two overlapping lines on a shared scale |

All four survive for the reason `PharmaciesBackdrop.tsx` already records for its
own literal: an SVG `fill`/`stroke` presentation attribute cannot take a Tailwind
utility, an undefined custom property invalidates the whole declaration and
paints nothing with every test still green, and the v4 ramp emits oklch rather
than the sRGB these ratios were measured on. **Everywhere the colour sits on a
real DOM element rather than an SVG attribute, a utility is used and no literal
remains**: tick labels `fill-slate-500`, horizontal bars
`bg-primary-950`/`bg-primary-700`, seasonality bars
`bg-primary-950`/`bg-primary-200`, legal links `text-primary-700`.

**TOKEN ASK for the manager (one line, additive, globals.css):** a declared
`--chart-series-2` would retire `SERIES_B`. Not required; the wave completes
without it.

---

## 3. WHAT CHANGED, PER FILE

| file | change |
|---|---|
| `app/contact/page.tsx` | rebuilt: brand hero (`ground-dark bg-primary-950` + backdrop + kit Breadcrumb `tone="onBrand"` + h1) then `LeadCTAPanel contained ground="white"` wrapping the existing `LeadForm`. Was a bare `max-w-2xl` div with an h1, one `<p>` and a form |
| `app/book/page.tsx` | `SlimHero` + backdrop; the "needs the personal link" card becomes `NoticeCard tone="slate"` |
| `app/complete/page.tsx` | `SlimHero` + backdrop; all three outcome cards become `NoticeCard` (`slate`, `slate`, `primary`) |
| `app/thank-you/page.tsx` | `SlimHero` + backdrop on all three branches via one local `ThankYouShell`, so the hero, grounds and container cannot drift between them. Booking-picker wrapper restyled to the kit's `rounded-xl ring-1` surface. `data-cta` pair byte-identical |
| `app/privacy-policy/page.tsx` | kit `Breadcrumb` (replacing the local one W3 retires) + kit `Eyebrow` "Privacy"; 7 inline links off `#0f3a4a` onto `text-primary-700` + `focusRing` |
| `app/cookie-policy/page.tsx` | same, `Eyebrow` "Cookie", 5 links |
| `app/terms/page.tsx` | same, `Eyebrow` "Terms", 2 links |
| `research/pharmacy-openings-closures-index/page.tsx` | hero: self-referential "Research" link replaced by kit Breadcrumb + Eyebrow, `ground-dark bg-primary-950` + backdrop. FAQ array extracted to one binding feeding both `buildFaqJsonLd` and a new visible `FaqSection alwaysRenderAnswers`. Hand-rolled slate-900 CTA band replaced by `LeadCTAPanel` + `LeadForm`. Seasonality bars onto ramp utilities plus an sr-only value list. All `[#0f3a4a]` utilities onto `primary-950`. Stack series no longer carry colours |
| `research/pharmacy-density-and-workload-index/page.tsx` | same five moves |
| `components/research/PharmacyIndexCharts.tsx` | 4 SVGs off `role="img" aria-label` onto `aria-hidden="true"`, with the existing sr-only value lists now named by each chart's own `label`. Colour constants onto ramp steps; `StackSeries.color` optional with a default palette; tick labels and bar fills onto utilities |
| `components/forms/LeadForm.tsx` | ONE comment added: the reason `outline-none` stays on the step-2 heading. No code change |
| `components/forms/DetailsForm.tsx` | 3 outcome cards become `NoticeCard tone="primary"` |
| `components/forms/BookingPicker.tsx` | 2 outcome cards become `NoticeCard` (`primary`, `slate`); one en-dash removed from a comment |
| `components/calculators/MiniCapture.tsx` | docblock ONLY: the fork-vs-shared answer in writing (§7). **Prop signature untouched, byte for byte** |
| `lib/research/pharmacy-openings-closures-index.ts` | **NOT TOUCHED.** The one-line fix the brief assigned here was already applied by phase 0 (correction 1) |

---

## 4. ADOPTIONS AND DECLINES (playbook §9.1)

### ADOPTED

| kit file | where | note |
|---|---|---|
| `design/primitives/Breadcrumb.tsx` | /contact, both research pages (`tone="onBrand"`), 3 legal pages (default tone) | replaces `src/components/ui/Breadcrumb.tsx`, which W3 retires. **Still exactly ONE BreadcrumbList per URL** on the legal pages; the two research URLs GAIN one they did not have |
| `design/primitives/page-blocks.tsx` `Eyebrow` | both research heroes (`onDark className="text-white"`), 3 legal pages | every word is the first word of that route's own published h1 or its own published back-link text. Zero authored copy |
| `design/primitives/SlimHero.tsx` | /book, /complete, /thank-you | the three pages its own docblock names. `sectionClassName` deliberately NOT passed: the kit default `bg-slate-900` is the one ground PharmaciesBackdrop was already measured on, so no new contrast row is owed |
| `design/primitives/NoticeCard.tsx` | /book (1), /complete (3), DetailsForm (3), BookingPicker (2) = **9 call sites** | its docblock names these exact cards: "eight near-copies across /book, /complete, BookingPicker and DetailsForm" that had started to drift. `tone` used as meaning: `slate` for a neutral dead end, `primary` for the outcome the reader wanted |
| `design/primitives/FaqSection.tsx` `alwaysRenderAnswers` | both research pages | T17, one binding two consumers. These Q&A pairs previously existed ONLY in the FAQPage JSON-LD; the schema asserted seven answers the HTML did not carry. `html` NOT passed: all seven answers are plain text, checked at the array. `tone="white"` on a slate-50 section |
| `design/marketing/LeadCTAPanel.tsx` | /contact, both research pages | **+3 forms. The two research URLs, the highest-authority pages on the site, carried NO form at all.** `eyebrow=""` and `formTitle=""` at every mount (K8/locked rule 9: this site publishes neither "Free consultation" nor "Book your free consultation"); `proofPoints={[]}` at every mount, because no page publishes a proof list and writing one is authoring copy |
| `leads/capture-steps.ts` | already live | `isSafeReturnPath` on /thank-you, `buildThankYouUrl` in LeadForm. Recorded, not newly adopted |

### DECLINED, each with a reason a reviewer can test, written AT the call site

1. **`design/primitives/SlimHero.tsx` on both research heroes and all three
   legal pages.** NOT the stale `sectionClassName` reason (K1 is right, that
   prop exists at `:27,47,50`). Two fresh reasons: (a) SlimHero holds Eyebrow,
   h1 and children in ONE container (`:52-57`) with **no slot above the
   eyebrow**, so these heroes' Breadcrumb could only drop below the h1 or into
   `backdrop`, which sits outside the container and under the absolute motif;
   (b) its `py-8 sm:py-10 lg:py-12` rhythm is structural (`:50`) and outside
   `sectionClassName`'s reach, which replaces the single ground class and
   nothing else (`:36-38`), against these heroes' `py-16 sm:py-20`. For the
   legal pages its own docblock (`:5-13`) also scopes it to noindex post-submit
   pages and states it carries no breadcrumb by design, while the legal routes
   are indexed and have trails. **KIT ASK: a `breadcrumb` slot above the
   eyebrow** (hospitality filed the identical ask).
2. **`design/primitives/NoticeCard.tsx` on the research "About this index"
   methodology and caveat blocks.** It hardcodes `text-center` on its panel
   (`:38`) and exposes no alignment prop, so a methodology paragraph and a
   five-item list of statistical caveats would centre and read worse than the
   left-aligned prose they replace. Its docblock (`:1-17`) also scopes it to
   token-gated outcome states. **KIT ASK: `align?: "center" | "start"`,
   defaulting to `center` so all nine existing consumers stay byte-identical.**
3. **`design/marketing/WhatToExpectCard.tsx` on /contact and /book** (and on
   /complete, /thank-you and the legal pages). `items` must always be passed,
   because the defaults publish a fee line this site never promises
   (`"Fixed fee quote if you decide to proceed"`, `:22-27`) — K7, locked rule
   10. **Neither /contact nor /book publishes a "what happens next" list to
   pass.** /contact's entire published copy is three strings, all three already
   in use; /book's is two sentences, both already the h1 and its standfirst.
   The four items would have to be written here, and these are the sentences I
   would have had to author: *"Instant text and email from us. Reply to confirm
   your callback"*, *"Initial call to understand your situation"*, *"Clear
   recommendations with no obligation"*, and a fourth about fees. Authored copy
   is forbidden by the 2026-09-28 owner ruling, so this is a DECLINE, not an
   omission. **If the owner wants this card on /contact and /book, it is four
   config strings and it is a one-line mount.**
4. **`design/primitives/NoticeCard.tsx` on /thank-you.** The body there is a
   stack of three paragraphs plus, on one branch, the booking picker; one
   centred `ring-1` panel around all of it would centre the picker's
   day-and-time grid and read as one disclaimer wrapping three different jobs.
   Same verdict startups-tech reached on the same route.
5. **`design/primitives/FaqSection.tsx` on the three legal pages.** A
   single-open Radix accordion (`:45`) would collapse legal text a reader must
   be able to find with ctrl-F, whatever `alwaysRenderAnswers` does for the
   schema; and none of the three emits FAQPage JSON-LD, so there is no binding
   to serve.
6. **`design/marketing/LeadCTAPanel.tsx` on the three legal pages.** A
   lead-capture surface on a privacy policy, cookie policy or terms page is
   wrong on its own terms, and the panel's required `title`/`description` have
   no published strings on those routes.
7. **`design/primitives/ExampleFigureNote.tsx` on the research source notes.**
   Not in this package's ADOPT list and not needed: its `label` is a plain
   `string` and these notes already publish inline source `<a>` links the prop
   cannot carry, while `children` renders ahead of a visible `*` marker. Its own
   docblock (`:32-40`) is the authority that a research page passes the
   attribution instead of "Example figures displayed", which these notes
   already do.
8. **`leads/MiniCapture.tsx`** — the deferred fork-vs-shared question. Full
   answer in §7.

---

## 5. GROUNDS, RINGS AND CONTRAST (measured, not assumed)

**New ground this package paints: `bg-primary-950` `#0f3a4a`, on three heroes
(/contact and both research pages), each carrying `PharmaciesBackdrop`.** Its
header comment asks every new ground for its own row. Motif stroke `#45cdff` at
the component's 0.10 group opacity composites to `#15485c`:

| pair | bare `#0f3a4a` | composited `#15485c` | floor | verdict |
|---|---|---|---|---|
| white (h1, standfirst) | 12.18 | 9.95 | 4.5 | PASS |
| white/80 (Breadcrumb `onBrand` list + chevron) | 8.60 | 7.02 | 4.5 text / 3.0 graphic | PASS |
| slate-300 (`Eyebrow onDark` default) | 8.20 | 6.70 | 4.5 | PASS |

`.ground-dark` is on all three of those sections, so `--focus-ring` and
`--kit-focus-ring` rebind to white. None of the three contains a light-ground
card with focusable children, which is the one case `globals.css` warns the
class must not wrap.

**`LeadCTAPanel` is deliberately NOT given `.ground-dark`,** and this is the
reasoning a reviewer should check rather than file: the component hardcodes
`relative overflow-hidden bg-slate-900` on its own section with no className
prop to reach it, AND its non-contained variant puts a **white** form card
inside that dark band (`:191-192`). That is exactly the "dark section containing
a light-ground card with focusable children" shape `globals.css` says must not
be wrapped: the form's rings must stay on the light brand value. The dark half
carries no focusable control, because `proofPoints` is empty at all three mounts.

**PRE-EXISTING DEFECTS CLOSED as a side effect, recorded so nobody files them
as new:** the hand-rolled slate-900 CTA bands on the two research pages carried
three focusable `<Link>` controls on a dark ground with no `.ground-dark`
anywhere on either route, so their focus rings resolved to the brand hex at
**1.47** against that ground, i.e. invisible. All three are gone.

**`outline-none` survivor, `LeadForm.tsx:325`,** reason written at the line: the
element is an `<h3 tabIndex={-1}>`, programmatically focusable only so that
advancing to step 2 moves a screen reader to the new heading. It is never
keyboard-reachable, so no focus affordance is lost, and a visible ring on a
heading nobody can tab to reads as a rendering fault. The step-2 fields
immediately below carry the site's real `focusRing`.

---

## 6. `data-cta` AND THE LOCK THAT CONFLICTS WITH IT — manager decision

**Nothing new is tagged. Zero new `data-cta` ids. The three existing site ids
(`header_contact`, `sticky_cta`, `sticky_cta_close`) and `/thank-you`'s
`thankyou-return-article` / `data-cta-placement="thank_you"` pair are
byte-identical.**

**This is a deliberate refusal, not an oversight, and the brief contains the
conflict.** The standing default says every enquiry form gets a `data-cta` on
its submit button. This package's own lock says `git diff` on the four form
files "must show **zero** changes to any line matching
`formId|data-cta|leadConsent|redirectOnSuccess|submitLabel|name=|enquiry_ref`".
A new line carrying `data-cta` is a change to a line matching that pattern. The
narrower, package-specific lock wins, and its intent is plainly "do not touch
the lead pipeline mid-port".

Reinforcing it: `LeadForm` is already instrumented at the form level, not the
button level, via `useFormTracking(FORM_ID)` at `LeadForm.tsx:62-63` with
`FORM_ID = "lead_form"`, so a submit-button `data-cta` would be a second,
redundant signal on the one form the site already measures.

**Targets for the manager, if the owner wants button-level ids after the wave
(four one-line edits, all inside the lock):**

- `src/components/forms/LeadForm.tsx:431` — the `type="submit"` button. Suggested `data-cta="lead_form_submit"`, `data-cta-goal="enquiry"`.
- `src/components/calculators/MiniCapture.tsx:208` — the submit button. Suggested `data-cta="mini_capture_submit"`, `data-cta-goal="enquiry"`, and it is the one form with no `useFormTracking`, so it is the one that would actually gain information.
- `src/components/forms/DetailsForm.tsx` and `BookingPicker.tsx` — post-submit completion, not enquiry; recommend leaving untagged.

Owner question 4 in the brief already recommends `data-cta-goal` only on new
surfaces with the three existing ids untouched. **That is exactly what shipped:
no new surface in W6 carries a control of its own** (the three `LeadCTAPanel`
mounts expose a form, not a button, and `proofPoints` is empty), so there was
nothing new to tag.

---

## 7. MiniCapture: FORK-VS-SHARED, ANSWERED IN WRITING

**Verdict: DECLINE the kit component this wave. Keep the local fork. Recommend a
separate, measured swap after the port.** Written in full at
`src/components/calculators/MiniCapture.tsx:8-50`. Four testable reasons:

1. **Prop signature.** `packages/web-shared/leads/MiniCapture.tsx:122-123`
   requires `siteConfig: MiniCaptureConfig` **and** `submitLead:
   MiniCaptureSubmitFn`, both non-optional, at every call site. The W6 contract
   freezes the local signature for this wave because W2
   (`components/blog/InlineMiniLeadForm.tsx`) and W4 (`CalcResultCta` on three
   calculator pages) mount it concurrently. Adding two required props is the one
   change the contract forbids.
2. **It is a behaviour change, not a restyle.** The kit component is gated on
   `NEXT_PUBLIC_MINIFORMS_MULTISTEP` (`leads/capture-steps.ts:152`) and with the
   flag on splits into a two-step flow with a role SELECT fed from
   `leadForm.roleOptions`. The local form posts `role: "Other"` and asks four
   fields on one step. That is measured in leads per week, and the owner ruling
   for this wave is restructure and restyle only.
3. **Locked analytics.** Its header (`:11-14`) declares the event names and
   props LOCKED because deploy-watch queries on other sites depend on them.
   Pointing a nineteenth site at them is a shared-surface decision, and
   `packages/web-shared/**` is a manager carve-out (trap 12).
4. **The package lock.** See §6: a swap rewrites every `formId`, `submitLabel`,
   `name=`, `leadConsentText` and `enquiry_ref` line in the file.

**`DetailsForm` and `BookingPicker`: the question does not arise.**
`packages/web-shared/leads/` contains `MiniCapture.tsx`, `CalcResultCta.tsx`,
`MobileToolSlot.tsx`, `ResultGateModal.tsx`, `capture-steps.ts` and
`server/` — **there is no kit equivalent of either component to adopt or
decline.** What those two CAN adopt, and now do, is `NoticeCard` for their five
outcome cards. The shared validation layer in `capture-steps.ts` is already
in use on this site.

**Phase 1's ring swap VERIFIED present, not re-applied,** on all four form
files: `LeadForm.tsx:12`, `DetailsForm.tsx:16`, `BookingPicker.tsx:17`,
`MiniCapture.tsx` all import `focusRing` from `@/components/ui/layout-utils` and
compose it into their input recipes. P1-D/P1-F were not reverted.

**`leadConsentText` FROZEN (T19):** not touched in any file. `MiniCapture`
reads `site.leadConsentText`, `LeadForm` reads `siteConfig.leadConsentText`,
both unchanged, both byte-identical to Property's.

---

## 8. LINK FLOORS — derivation, and the one delta

Floors from `sweep_baseline.json` (re-read, not rewritten): `/contact` 10,
`/privacy-policy` 10, `/cookie-policy` 10, `/terms` 10,
`/research/pharmacy-openings-closures-index` **18**,
`/research/pharmacy-density-and-workload-index` **14**.

**Method:** the floor counts unique `href="/..."` in the SERVED HTML, which
includes chrome. No build was run (manager builds, T1), so the derivation is a
unique-href diff of the page source plus a check that every dropped href is
re-emitted by chrome on every route.

| route | in-page unique `/` hrefs before | after | dropped | covered by |
|---|---|---|---|---|
| `/research/pharmacy-openings-closures-index` | 10 | 8 | `/contact`; `/research/pharmacy-openings-closures-index` (the hero's self-referential link) | `/contact` = header CTA (`layout.tsx:72` → `ctaPrimary`) + footer nav (`niche.config.json:52,55`); the research URL = primary nav (`niche.config.json:49`), on every route |
| `/research/pharmacy-density-and-workload-index` | 5 | 4 (+1 templated) | `/contact` | same two chrome surfaces |
| `/contact`, 3 legal pages | unchanged | unchanged | none | — |

**Net expected floor delta: 0 on all six routes.** Both research pages also GAIN
`/` through the new Breadcrumb's Home crumb, which chrome already emitted.
**V1 must confirm this against the one build** — it is the single claim in this
receipt that a build could falsify, and nothing was padded to hit a number.

---

## 9. ACCEPTANCE CHECKS NEEDING THE BUILD — for V1

Everything checkable without a build is in §1, §2, §5 and §8. These need the
one `next build` + `next start -p 3111`:

1. `curl -s :3111/research/pharmacy-openings-closures-index | grep -c '<form'` = **1** (was 0). Same for the density page = **1** (was 0).
2. `grep -o '"@type":"Dataset"'` = **1** on each research URL; `json.loads` EVERY `ld+json` block on both — now **three** blocks each (Dataset, FAQPage, BreadcrumbList), the third being new. Tag presence is not enough: parse them (the `[object Object]` defect).
3. `json.loads` every `ld+json` on `/privacy-policy`, `/cookie-policy`, `/terms`: exactly **one** BreadcrumbList each, no duplicate, and absolute URLs built from `siteConfig.url`.
4. `/thank-you`: `grep -c '<main'` = **1**, `grep -c '<h1'` = **1**, on all three branches (`?optout=1`, `?confirmed=1`, bare, and bare+`?bt=`).
5. Link floors per §8: 18 / 14 / 10 / 10 / 10 / 10, none dropped.
6. **V30 (the `<noscript>` FAQ proof): JS OFF, both research pages, all seven answers visible.** Per correction 4 the layout line is already there, so this should pass as shipped. If it fails, `role="region"` is not what Radix renders and the manager's line needs its selector widened.
7. `data-cta` census unchanged at 3 triples + `/thank-you`'s pair; zero new ids; `sticky_cta` / `sticky_cta_close` intact (W7's, not mine).
8. Horizontal overflow at 390 still **0** on all six routes. The three new hero sections are `relative overflow-hidden` and the backdrop is `w-[55%]` right-anchored, so the risk is low but unmeasured.
9. Both `FaqSection` triggers: tab to one on each research page and confirm the ring is the light brand value, not primary-600 (K3 says it should be; measured 12.18 on white).
10. `grep -o "primary-950" .next/static/css/*.css | wc -l` non-zero (`-o ... | wc -l`, never `grep -c`: a built stylesheet is ONE line). Three heroes now depend on that step compiling.

---

## 10. DEFECTS SEEN BUT NOT REACHED — M1's input (rule 21)

1. **`src/components/forms/LeadForm.tsx:65`** — `const consentText = ...` is assigned and never read; step 2 renders the consent notice inline at `:398-405`. Dead local. Not removed: the line matches the package lock's `leadConsent` pattern. One-line delete for the manager.
2. **`src/components/research/PharmacyIndexCharts.tsx:28,40`** — `MUTED` `#acefff` (primary-200) and the pale stack series measure about **1.2 on white**, under the 3.0 graphic floor. **PRE-EXISTING**: the off-ramp values they replace (`#c9d8dd`, `#a8c5cd`) measured 1.37 and 1.42, so this is not a regression, and every figure in every chart is also a real text node (sr-only list plus the full data table each chart sits beside). Fixing it means darkening a chart nobody ruled on. Owner question if anyone cares.
3. **Both research pages, "About this index"** — the methodology and caveat blocks are still hand-rolled `<p>`/`<ul>`. They are the natural `NoticeCard` consumers and will become one the moment the kit grows `align` (decline 2 above).
4. **`src/components/forms/BookingPicker.tsx` and `DetailsForm.tsx`** — both still hand-roll their input, chip and button recipes rather than reading `btnSecondary`/`btnOnDark` from `layout-utils`. In scope for a later uplift, not for a restyle wave that must not touch lead-pipeline lines.
5. **`/book` and `/complete` are not in `robots.txt`'s disallow list while `/thank-you` is.** Known-and-accepted item 12, confirmed still true. Owner question, not a wave defect.
6. **No `/research` hub route**, confirmed: `app/research/` holds exactly the two index directories and no `page.tsx`. **Not created** (owner question G2). The breadcrumbs on both research pages therefore run `Home > <this index>` with no middle crumb, because a crumb to `/research` would 404.
7. **`og:image` is absent on `/contact`, `/book`, `/complete`, `/thank-you`, both research pages and `/terms`** (`/privacy-policy` and `/cookie-policy` have openGraph blocks but no `images`). Known-and-accepted item 14 says fixing it is in scope and welcome; **not fixed**, because `/api/og` is the shared route and adding it to nine `Metadata` exports is a mechanical sweep better done once, estate-style, than nine times by one builder. Flagged, not silently skipped.

## 11. KNOWN-AND-ACCEPTED, NOT REOPENED

Compliance copy vs the code that runs (T18): **drift REPORTED, nothing changed.**
The cookie-policy-vs-AdSense row and the 24-month retention row are owner-ruled
LEFT AS IS (2026-09-29) and were not reopened. The retention figure is still
read from `siteConfig.company.enquiryRetentionMonths`, not restated. The
`&lt;` literals on the density page are correctly escaped comparisons and were
left exactly as they are. The Aswatax post-submit intro on `/thank-you` is
byte-identical, still post-submit only, never removed.
