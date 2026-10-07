# W7 receipt — capture surfaces (pharmacies phase 6, owner decision 1)

Package: W7. Model: Opus. **No subagents launched. No `next build`, no `next dev`,
no git write command.** Every path and count below was re-derived from the
working tree on 2026-10-07.

## 1. Files touched

| file | action | lines |
|---|---|---|
| `src/lib/intent/taxonomy.ts` | NEW | 181 |
| `src/lib/intent/labels.ts` | NEW | 80 |
| `src/lib/intent/widget-config.ts` | NEW | 185 |
| `src/lib/assistant/opener.ts` | NEW | 153 |
| `src/components/support/SupportProvider.tsx` | NEW | 23 |
| `src/components/intent/ReturningBar.tsx` | NEW | 95 |
| `src/components/intent/DeepScrollModal.tsx` | NEW | 196 |
| `src/components/intent/NextStepOffer.tsx` | NEW | 53 |
| `src/components/ui/StickyCTA.tsx` | REWRITTEN (restyled, not retired) | 64 -> 167 |
| `src/app/layout.tsx` | capture region only: 4 imports + the mount block | +21 |
| `src/tests/intent-taxonomy.test.ts` | NEW (32 tests) | 150 |

Nothing under `globals.css`, `layout-utils.ts`, `PageShell.tsx`,
`PharmaciesBackdrop.tsx`, `lib/schema.ts`, `config/`, `niche.config.json`,
`packages/**`, `Property/**`, any other package's page files, or
`src/tests/focus-ring.test.ts` was touched. **P1-A's font region and P1-C's
chrome props in `layout.tsx` are byte-identical.**

## 2. THE ONE DELIBERATE DEVIATION FROM THE BRIEF — read this first

**The brief's premise that two `IntentProvider`s must be mounted is stale, and
the second one is not built here.** Verified in source, not assumed:

- `packages/web-shared/support/IntentProvider.tsx:95-110` exports
  `useIntent(surface)` for the **whole** `Surface` union
  (`sticky_cta`, `hero_cta`, `next_step`, `deep_scroll_modal`, `returning_bar`
  — `support/types.ts:76-82`), plus `useIntentContext`, `useWidgetConfig` and
  `trackPersonalization`.
- `packages/web-shared/support/engine.ts` is construction-cis's
  `lib/intent/engine.ts` with the offer COPY lifted out into
  `EngineConfig.offers`. The ladder, the rule ids and the thresholds are
  identical, line for line.
- `packages/web-shared/support/journeyModel.ts` + `createJourneyModel` is the
  same for `lib/intent/journeyModel.ts`.

So the kit provider is a strict superset of the construction-cis fork. Mounting
both would have meant two context providers, two 1500 ms polling intervals and
**~500 forked lines** (`engine.ts` 213, `journeyModel.ts` 251, the fork's
`IntentProvider.tsx` 113, `deriveTopic.ts` 24) whose only difference is that the
copy is hardcoded. The brief itself rules "the kit version is the shared
implementation; construction-cis's is the pre-kit fork — use the kit" for the
widget; the same sentence applies to the engine and the journey model, which
live in the same kit module.

**Consequence, stated plainly: `components/intent/IntentProvider.tsx`,
`lib/intent/engine.ts`, `lib/intent/journeyModel.ts` and `lib/intent/deriveTopic.ts`
from the OWNS list were NOT created.** The name collision the brief warns about
twice cannot occur, because there is one provider. Every surface imports from
`@accounting-network/web-shared/support/IntentProvider`, and
`grep -rn "components/intent/IntentProvider" src` = 0.

The config lives at `lib/intent/widget-config.ts`, the worked example's path, not
the session plan's `config/support.ts` (§E.1 row 5 instructs exactly this).

## 3. Mounts, verbatim from `layout.tsx`

```tsx
<SupportProvider>
  <PageShell nav={primaryNav}>{children}</PageShell>
  <ReturningBar />
  <DeepScrollModal />
  <div className="print:hidden">
    <SpecialistWidget />
  </div>
</SupportProvider>
```

The two import lines the brief asks to be quoted:

```tsx
import { SpecialistWidget } from "@accounting-network/web-shared/support/SpecialistWidget";
import { IntentProvider } from "@accounting-network/web-shared/support/IntentProvider"; // in SupportProvider.tsx
```

`StickyCTA` is mounted by `PageShell` (P1-C, off limits) and sits **inside** this
provider, so its `useIntent` call resolves. All four surfaces mount on every
public route.

## 4. No-op conditions (all four surfaces)

| surface | mechanism | evidence |
|---|---|---|
| widget | `hiddenOnPaths: ["/embed", "/admin"]` → provider yields a null context; the widget's own `if (!ctx) return null` | `widget-config.ts`, kit `IntentProvider.tsx:48`, `SpecialistWidget.tsx` |
| ReturningBar | `useIntent` returns null with a null context | `ReturningBar.tsx:48` |
| DeepScrollModal | same | `DeepScrollModal.tsx:127` |
| StickyCTA | its own `pathname.startsWith("/embed") \|\| startsWith("/admin")` → `return null`, **and** PageShell's existing `/embed/` gate | `StickyCTA.tsx:91,106` |
| consent denied | `state !== "denied"` in the kit provider kills the context for all four | kit `IntentProvider.tsx:47` |

Posture stays `opt-out`; no new disclosure, banner, popup or cadence was added
(`clarity_removed_pecr_decision`). Personalisation is hardcoded default-ON: no
experiment-assign block, no `useExperiment` caller, no new experiment.

## 5. Suppression rules as implemented, with the Property source line each came from

| rule | implemented as | Property source |
|---|---|---|
| ONE deep-scroll offer per page-load session, across topics | module-level `let shownThisSession = false` | `Property/web/src/components/intent/DeepScrollModal.tsx:32` |
| 30-day per-topic suppress | `localStorage`, key `pfp_deepscroll_<topic>`, `SUPPRESS_DAYS = 30`, `Date.now() - Number(v) < 30 * 86_400_000` | `.../DeepScrollModal.tsx:13-29` (`ptp_deepscroll_<topic>`) |
| returning bar session-dismissible | `sessionStorage`, key `pfp_returning_bar_dismissed`, `useState(true)` until confirmed | `.../ReturningBar.tsx:13` (`ptp_returning_bar_dismissed`) |
| sticky dismissal | `sessionStorage`, key `pfp_sticky_dismissed` | key named by the brief; Property's bar has no persistence, generalist's uses `hd_sticky_dismissed` at `:27` |

**Nothing under `Property/` was read for anything but data, and nothing under it
was written (T12).** `construction-cis`'s extra `bfp_modal_shown`
sessionStorage cap was NOT ported: Property is the named ground truth and uses
the module flag alone.

Storage prefix is `pfp` everywhere (`pfp_journey`, `pfp_assistant_active`,
`pfp_assistant_autoopened` via the kit, plus the three keys above), matching
`AnalyticsProvider storagePrefix="pfp"` in `layout.tsx`. **No `phfp` anywhere:**
`grep -rn phfp src` = 0.

## 6. `data-cta` census this package adds

**Preserved byte-identical, and this is the acceptance row that matters:**
`sticky_cta|sticky|null` and `sticky_cta_close|sticky|null`, same ids, same
placements, **no `data-cta-goal` on either**, and the `href` on `sticky_cta`
stays `/contact` in the server HTML.

That last one is a trap W7 found and closed: the kit provider derives
`pageTopic` **deterministically on the server** (kit `IntentProvider.tsx:77`),
so an un-gated personalised sticky would have emitted
`href="/calculators/<slug>"` in the SSR markup on every blog, service, hub,
calculator and research route, and `cta_snapshot.mjs` reads raw `fetch` HTML and
records `href` (`cta_snapshot.mjs:109,125`). **The personalised offer is
therefore gated on `visible`, which only a client scroll event can set**, so the
server HTML always carries the generic offer. Same reason the generalist
`if (!mounted) return null` gate was NOT adopted: it would have removed
`sticky_cta` from the server HTML on all 55 routes and broken the baseline
outright.

New ids, all on an `<a>`/`<button>`, never a wrapper `<div>`:

| id | placement | goal | surface |
|---|---|---|---|
| `specialist_widget` | kit's own | kit's own | widget launcher (**client-only render**, invisible to an SSR crawl — read the shipped bundle, T-H13) |
| `returning_bar` | `returning_bar` | `form` when href starts `/contact` | returning bar CTA |
| `returning_bar_close` | `returning_bar` | — | returning bar dismiss |
| `deep_scroll_modal` | `deep_scroll_modal` | `form` when href starts `/contact` | modal primary |
| `deep_scroll_secondary` | `deep_scroll_modal` | `form` when href starts `/contact` | modal secondary |
| `deep_scroll_close` | `deep_scroll_modal` | — | modal close |
| `next_step` | `next_step` | `form` when href starts `/contact` | the card M1 mounts |

`data-cta-goal` is a declared NEW dimension on the six new ids above (the site
had zero before P1-C's `header_contact` goal). It is deliberately **not** added
to the two sticky ids.

## 7. R1's serious finding: the sticky bar covering the footer consent control

Fixed in `StickyCTA.tsx:76-90`. An `IntersectionObserver` on
`document.querySelector("footer")` sets `footerInView`, and the bar slides down
(`translate-y-full`) while the footer is on screen, so the footer's last row,
which holds the site's only consent control, is never covered at any width.

**Why this shape and not another:** the kit widget solves the identical defect
with the identical observer but *lifts* instead of hiding
(`packages/web-shared/support/SpecialistWidget.tsx:131-195`, GF7 NB-1/NB-2),
because its launcher must stay keyboard-reachable. That reasoning does not
transfer: a full-width bar cannot be lifted clear of a full-width footer, and
unlike the launcher the bar's CTA is a duplicate of the header CTA, so retreating
costs the visitor nothing. Neither Property's nor generalist's bar handles this
at all (`grep -n "footer\|IntersectionObserver"` on both = 0), so there was no
smaller proven pattern to copy; the observer is the proven half and is reused.
The bar stays in the DOM while retreated, exactly as it already did when
unscrolled, so the server-HTML CTA census is untouched. `sticky_cta`,
`sticky_cta_close` and `pfp_sticky_dismissed` are unchanged.

A second overlap was found in the same region and closed: the returning bar also
paints the bottom edge. The sticky bar now stands down for the page load while a
returning-bar offer exists (`StickyCTA.tsx:52-57`, marked with a `ponytail:`
comment naming the ceiling: a visitor who dismisses the greeting does not get the
sticky bar back until the next page). The widget launcher is at `bottom-24`
(§8) so it clears both bars.

## 8. Widget config deltas from the kit defaults

- `classes: { ...defaultWidgetClasses(focusRing), container: "fixed bottom-24 right-4 z-[55] print:hidden" }`.
  The kit default is `bottom-4`, written for startups-tech, which mounts no
  sticky bar; this site does, so the launcher would sit behind it. `bottom-24` is
  the value generalist uses for the same reason
  (`generalist/web/src/components/support/SpecialistWidget.tsx:346`).
- `focusRing` is this site's recipe from `@/components/ui/layout-utils`, because
  `src/tests/focus-ring.test.ts` bans both `focus-visible:outline-primary-*` and
  any bracketed outline that is not `var(--focus-ring)`. The same ban is why the
  construction-cis `outline-primary-400` literals in `ReturningBar` and the
  `outline-primary-600` ones in the modal were replaced, not copied.
- `formId` / `ctaId` = `"specialist_widget"`, byte-identical to Property and
  generalist (estate analytics views key on it).
- `leadSource` = `niche.content_strategy.source_identifier` = `"pharmacies"`,
  the same value `LeadForm.tsx` sends. No rival source key.
- `submitLead` = `submitSiteLead({ ...payload, role: "Other" }, honeypot)`.
  Verified `submitSiteLead` exists (`src/lib/leads/submit-client.ts:59`) and that
  `api/leads/submit/route.ts:71` defaults `role` to `"Other"`, so "Other" is a
  value the chokepoint already accepts; the six configured role options are all
  self-declared and the widget asks for none of them.
- `consentPrefix` = `siteConfig.leadConsentText`, untouched and unread by any
  other path (T19 frozen).
- `thresholds` not passed: the kit defaults (90s/60s/60%/70%) are
  construction-cis's own constants, unchanged.

## 9. Taxonomy, derived from CONTENT truth

`niche.config.json content_strategy.categories` was **not** used (7 names, two
with zero posts). Derived instead from the repo:

- 5 published blog categories (`content/blog/*.md` `category:` through
  `slugifyCategory`, counted: Buying a Pharmacy 7, NHS Contract and Income 7,
  Selling a Pharmacy 3, Locum Pharmacists 3, VAT and Retail Schemes 2)
- 8 service slugs (`data/pharmacies-services.ts`)
- 5 hub slugs (`data/pharmacies-hubs.ts`)
- 3 calculator slugs (`lib/calculators/tools/*.ts`)
- 2 research slugs (`app/research/<slug>/`)

Six topics: `buying`, `selling`, `nhs-income`, `vat-retail`, `locum`,
`structure`. Every blog category, calculator, service, hub and research route
maps to one, asserted by `src/tests/intent-taxonomy.test.ts` against the real
slug sets (so adding a calculator or a category fails the test rather than
falling back silently). Two mappings are judgement calls and both are commented
at the line: `pharmacy-valuation-goodwill` → `selling`,
`pharmacy-benchmarking-margin` → `nhs-income`. `selling` and `vat-retail` have
`primaryCalculator: null` because no tool on this site covers them, which makes
the ladder fall to a review rather than pointing a seller at the buyer's tool.
No `/research` hub route was invented (P0-E §2).

## 10. EVERY AUTHORED VISITOR-FACING LINE, VERBATIM

The owner reviews every line below. No em-dashes, no pricing, no fee or
fixed-quote language, no "free call", no turnaround promise beyond the "within
24 hours" the site already publishes (`niche.config.json cta.sticky_secondary`,
`MiniCapture.tsx:67`), no regulatory claim, firm voice throughout.

### 10a. Topic labels and CTA copy (`lib/intent/taxonomy.ts`)

| topic | label | ctaCopy |
|---|---|---|
| buying | buying a pharmacy | Check what a pharmacy purchase looks like on your numbers |
| selling | selling a pharmacy | Check where you stand on a pharmacy sale |
| nhs-income | NHS contract income and FP34 cash flow | Map your FP34 cash flow month by month |
| vat-retail | VAT and retail schemes | Check your VAT retail scheme is the right one |
| locum | locum pharmacist pay and tax | Compare your locum take-home pay |
| structure | pharmacy structure, payroll and benchmarking | Check your pharmacy structure and payroll are right |

### 10b. Offer copy (`lib/intent/widget-config.ts`)

- tool blurb: `Run your own numbers on {label} in a couple of minutes.`
- tool reason: `Most-used tool for this topic`
- review blurb: `A no-obligation look at your position with a pharmacy accountant.`
- review reason (default): `You have spent real time on this. A quick look will confirm where you stand`
- specialist title: `Speak to a pharmacy accountant`
- specialist blurb: `Get your position on {label} checked by a pharmacy accountant.`
- specialist reason: `You have spent real time here. An accountant can confirm your position`
- returning reason: `Pick up where you left off. Get your position looked at`

### 10c. Surface labels and buttons

- ReturningBar: `Welcome back. {offer.reason}.` / `aria-label="Welcome back"` / dismiss `aria-label="Dismiss"`
- DeepScrollModal buttons: `Open the calculator`, `Speak to a pharmacy accountant`, `Open the calculator instead`, `Get the free guide` (unreachable today: no topic has a `guide` offer), close `aria-label="Close"`
- StickyCTA button when personalised: `Open the calculator` or `Speak to a pharmacy accountant`. Un-personalised it renders `niche.cta.sticky_*` unchanged.
- NextStepOffer button: `Open the calculator` / `Speak to a pharmacy accountant` / `Get the free guide`

### 10d. Widget copy (`lib/intent/widget-config.ts` `copy`)

`Ask an accountant` (launcher and ask button) · `Close` · header title =
`siteConfig.name` · `We reply within 24 hours` · `Dismiss` ·
`See your numbers` · contact chip = `niche.cta.sticky_button` ("Get in touch") ·
`Send to an accountant` · `Sending...` · email placeholder =
`niche.lead_form.placeholders.email` · `Your email` ·
`Your question for an accountant` · `Your question` ·
`Enter a valid email address.` ·
`Add a short message so the accountant knows how to help.` ·
`Something went wrong. Please try again.` ·
`Thanks, we have your message. One of our accountants will reply by email within 24 hours. Please keep an eye on your inbox, and your spam or junk folder, so the reply is not missed.` ·
consent prefix = `siteConfig.leadConsentText` (frozen, unmodified).

### 10e. Opener lines (`lib/assistant/opener.ts`)

Topic nouns: `buying a pharmacy`, `selling your pharmacy`,
`your NHS contract income`, `your VAT retail scheme`, `your locum pay and tax`,
`your pharmacy structure`.

Hooks, three per topic (curious / helpful / direct):

- buying: `Looking at buying a pharmacy? We can pull up the affordability calculator.` / `Want a hand checking whether the numbers on a pharmacy purchase stack up?` / `Speak to a pharmacy accountant about the purchase, shall we point you to the form?`
- selling: `Thinking about selling? We can show you how a pharmacy sale is usually taxed.` / `Want a hand working out what a sale leaves you with after tax?` / `Speak to a pharmacy accountant about the sale, want us to set that up?`
- nhs-income: `Following your NHS contract income? We can pull up the FP34 cash flow estimator.` / `Want a hand reconciling what the FP34 statement actually pays you?` / `Speak to a pharmacy accountant about your NHS income, shall we point you to the form?`
- vat-retail: `Working out which VAT retail scheme fits? We can point you to the right page.` / `Want a hand checking your retail scheme and your zero-rated split?` / `Speak to a pharmacy accountant about your VAT, want us to set that up?`
- locum: `Comparing locum pay? We can pull up the take-home comparator.` / `Want a hand comparing locum take-home pay across the usual options?` / `Speak to a pharmacy accountant about your locum tax, shall we point you to the form?`
- structure: `Anything we can help you find on pharmacy structure or payroll?` / `Want a hand checking your structure and payroll are set up the right way?` / `Speak to a pharmacy accountant about your structure, want us to set that up?`

Combination (buying + selling): `Buying one pharmacy while selling another takes care on both sides. Want us to line them up?` / `A purchase and a sale together change the tax on each. Want us to show you why?` / `Speak to a pharmacy accountant about both together, want us to set that up?`

Used-calculator: `You have already run the numbers. Want a second pair of eyes on them?` / `A calculator gives a picture. An accountant confirms it fits your pharmacy, want a check?` / `Ready to sanity-check those results? An accountant goes further than any calculator.`

Generic: `Not sure what you are looking for? We can point you to the right tool.` / `Happy to help you find what you need. What is the main thing on your mind?` / `Speak to a pharmacy accountant and get a straight answer. Want us to set that up?`

Friction: `Send a question about {noun} here instead, we reply within 24 hours.` (no topic: `Send a question here instead, we reply within 24 hours.`)

Exit: `Before you go: send a question about {noun} and one of our accountants will come back to you.` (no topic: `Before you go: send a question and one of our accountants will come back to you.`)

**One line to flag to the owner:** "A no-obligation look at your position with a
pharmacy accountant." reuses the site's published "no obligation"
(`app/book/page.tsx:76`). Nothing here promises a free consultation, a fixed fee
or a call.

## 11. Accessibility work beyond both source copies

Neither Property's nor construction-cis's `DeepScrollModal` has a focus trap,
an Escape handler or focus return. A dialog that opens by itself and eats the
keyboard is exactly the T-H8 blocker, so all three were added
(`DeepScrollModal.tsx:81-113`): focus moves to the first control on open, Tab
and Shift+Tab cycle inside the panel, Escape closes it and dismisses, and focus
returns to whatever was focused when it opened. The backdrop click still closes.
`role="dialog" aria-modal="true" aria-labelledby` sit on the PANEL, not the
backdrop (construction-cis puts them on the backdrop div, which makes the
overlay itself the dialog).

No animation is used by any new surface, so `prefers-reduced-motion` has nothing
to suppress; the one animated element in the layer is the kit launcher badge,
which already carries `motion-reduce:animate-none`
(`support/classes.ts` `badgePing`).

## 12. EXTRA TASK K4 — the `<noscript>` accordion line: ALREADY PRESENT, verified, no edit made

The line the manager delegated is **already in `layout.tsx`'s `<noscript>`
block**, added by P1-A:

```css
[data-state="closed"][role="region"] { display: block !important; }
```

Verified it is the right selector rather than assumed:

1. `@radix-ui/react-accordion/dist/index.mjs:283` sets `role: "region"` on the
   content element, and the kit `AccordionContent` passes `forceMount` so Radix
   keeps it in the DOM with `data-state="closed"` plus the `hidden` attribute
   (`packages/web-shared/design/primitives/accordion.tsx:54-78`).
2. `display: block !important` beats Tailwind preflight's un-important
   `[hidden] { display: none }`, so the answer paints.
3. There is **no accordion-specific class to scope to**: `AccordionContent`'s
   root className is the literal `"overflow-hidden text-sm ..."` string and the
   caller's `className` goes to the inner `<div>`, not the root. `role="region"`
   + `data-state="closed"` is the tightest available scope, and it is also
   exactly the Radix collapsible/accordion content signature, so it cannot
   match anything else on this site.
4. `animate-accordion-up` / `-down` are **inert**: no `--animate-accordion-*`
   theme entry and no `accordion-up` keyframes exist anywhere in the repo
   (`grep -rn "accordion-up" --include=*.css --include=*.ts` = 0 outside built
   `.next` output), so nothing re-collapses the released panel.

**So K4 needs no new line.** What it needs is the V30 proof with JS off, which
is V1's row, not a builder's.

## 13. Acceptance, run now

```
$ cd pharmacies/web && npx tsc --noEmit
(no output, exit 0)        <- the brief's ONE baseline error (research page:69) is already closed

$ cd pharmacies/web && npx vitest run
 Test Files  7 passed (7)
      Tests  72 passed (72)
(includes src/tests/focus-ring.test.ts GREEN with all 8 new .tsx files in its corpus,
 and the new src/tests/intent-taxonomy.test.ts, 32 tests)

$ python scripts/check_dependency_closure.py
dependency closure OK across 19 sites

$ grep -rnoE '#[0-9a-fA-F]{3,8}' <owned>            -> 0
$ grep -rno 'neutral-[0-9]\{2,3\}' <owned>          -> 0
$ grep -rn 'section-label' <owned>                  -> 0
$ grep -rn '<main\|<header\|<footer' <owned>        -> 0
$ grep -rn 'outline-none' <owned>                   -> 0
$ grep -rnoE 'focus-visible:outline-\[[^]]*\]' <owned> -> 0 inline literals (all rings via `focusRing`)
$ grep -rn 'data-cta=' <owned>                      -> 8 hits, every one on a <Link> or <button>
$ grep -rn phfp src                                 -> 0
$ grep -rn 'components/intent/IntentProvider' src    -> 0
```

Em/en-dash grep over the owned set returns three hits, none of them
user-facing copy: `layout.tsx:21` is P1-C's existing code comment, and
`intent-taxonomy.test.ts:57-58` are the dash characters **inside the regex that
bans them**. Zero in any string a visitor can see.

## 14. T-H8 KEYBOARD WALK — acceptance rows for V1 (needs the build on :3111)

W7 ran no server and no build, so these are specified, not claimed. Default
state: nothing dismissed, no storage seeded, consent not denied.

| row | route | width | command / action | expected decisive line |
|---|---|---|---|---|
| H8-1 | `/` | 1280 | `keyboard.press("Tab")` from `document.body`; record the Tab-press count to the first page-content control and the full focus order for 12 presses | press 1 = the skip link (`href="#main"`). **A rise of more than one press before the skip link vs the pre-W7 build is a BLOCKER.** |
| H8-2 | `/` | 390 | same | same |
| H8-3 | `/calculators/pharmacy-purchase-affordability` | 1280 | same | same |
| H8-4 | `/calculators/pharmacy-purchase-affordability` | 390 | same | same |
| H8-5 | both routes, both widths | — | the SAME walk on the pre-W7 build (`port-pharmacies-phase1` tree) | the two orders, diffed press by press |
| H8-6 | `/` | 1280 | open the widget by clicking the launcher, then Tab repeatedly | focus cycles INSIDE the panel, never escapes to the page |
| H8-7 | `/` | 1280 | with the widget open, press Escape | panel closes AND `document.activeElement` is the launcher |
| H8-8 | a blog post | 1280 | scroll past 70% so the modal shows, then Tab repeatedly | focus trapped in the panel (first control focused on open) |
| H8-9 | same | 1280 | with the modal shown, press Escape | modal closes AND focus returns to the element focused before it opened |
| H8-10 | `/` | 390 | emulate `prefers-reduced-motion: reduce`, show each surface | every surface renders a finished mark; no empty box beside a promise |
| H8-11 | `/`, a blog post | 1280 | JS OFF | **no** surface renders, and nothing that was visible before is now hidden (this row also carries V30, the FAQ answers) |
| H8-12 | all 3 `/embed/<slug>` | — | `curl -s localhost:3111/embed/<slug> \| grep -c 'sticky_cta\|specialist_widget\|deepscroll\|returning'` | **0** on each |
| H8-13 | all 55 routes | — | `cta_snapshot.mjs` from the repo ROOT vs `cta_baseline.json` | `sticky_cta\|sticky\|null` and `sticky_cta_close\|sticky\|null` unchanged, id AND placement AND goal AND href |
| H8-14 | `/` | — | the launcher's `data-cta="specialist_widget"` read from the SHIPPED CLIENT BUNDLE, not the SSR HTML | 1 hit (T-H13 shape) |
| H8-15 | `/` and every route the bars paint on | — | sweep link floor | never drops (the bars are client-only, so the floor should not move at all) |
| H8-16 | `/` | 390 and 1440 | scroll to the very bottom | the footer's last row, including the consent control, is fully visible and clickable; the sticky bar has retreated (R1's finding) |

## 15. NextStepOffer mount targets for M1 — RE-DERIVED, the brief's numbers are stale

W7 built `components/intent/NextStepOffer.tsx` and mounts it NOWHERE. The brief
quoted `blog/[category]/[slug]/page.tsx:319`, `services/[slug]:248` and
`for/[slug]:152`; W2 and W3 have since landed and those files are now 356 / 288 /
192 lines. Re-derived against the working tree on 2026-10-07, insert
`<NextStepOffer />` immediately BEFORE the closing panel in each:

| file | insert before | current line |
|---|---|---|
| `src/app/blog/[category]/[slug]/page.tsx` | the comment block at `:326` that introduces `<LeadCTAPanel` at `:344` | `{/* The bordered "Need help with your pharmacy finances?" box ... */}` |
| `src/app/services/[slug]/page.tsx` | `<LeadCTAPanel` at `:277` (and its comment block from `:258`) | `<LeadCTAPanel` |
| `src/app/for/[slug]/page.tsx` | `{!hub.noLeadForm && (` at `:160`, so the card shows on BOTH branches of the flag | `{!hub.noLeadForm && (` |

It is a `"use client"` component with no props, imported as
`import { NextStepOffer } from "@/components/intent/NextStepOffer";`. It renders
null when the route has no topic or the visitor has converted, so a mount on a
topicless route is harmless. All three routes DO have topics
(`/blog/<category>`, `/services/<slug>`, `/for/<slug>` are route families in
`ROUTE_RULES`), so all three will paint.

## 16. Defects seen but not reachable from this package

1. **Kit `AccordionContent` cannot be given a scoping class.** Its root
   `className` is a literal string and the caller's `className` lands on the
   inner `<div>` (`accordion.tsx:54-78`). The `<noscript>` release therefore has
   to key on `role="region"`. Manager/kit note only; it works today.
2. **`animate-accordion-up` / `animate-accordion-down` resolve to nothing on
   this site** (no keyframes, no theme entry). Harmless, and it is what makes
   K4 safe, but the kit ships a class that does nothing on 19 sites unless each
   declares the animation.
3. **Kit `SiteFooter` has no sticky-bar awareness.** The retreat in §7 lives in
   the bar because the footer is off limits; a kit `bottomBarHeight` prop would
   be the cleaner fix and is a manager call, not a wave blocker.
4. **`niche.config.json` has no `cta.variant`**, so no `data-cta-variant` is
   emitted anywhere (Property and generalist both emit it). Not a defect, but any
   estate view that groups by variant sees `undefined` for this site.
5. **`/admin` was previously reachable with the sticky bar painted.** W7's own
   route gate closes it. Admin routes are outside the 55-route baseline, so no
   baseline row moves.
