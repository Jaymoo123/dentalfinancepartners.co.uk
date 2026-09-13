# R4 — independent adversarial fidelity review, PHASE 4 (contractors-ir35)

Reviewer built none of phase 4. Read-only: no code, content or config changed,
no state-changing git command, no `next build`, no deploy. One file written
(this one).

Date 2026-09-13. Reviewed against `docs/property/DESIGN_SYSTEM.md` §0 and
`docs/contractors-ir35/DESIGN_DELTA.md`. Receipts falsified:
`P4-1_CALCULATORS.md` (33 rows) and `P4-2_PREMIUM.md` (16 rows). Both lists were
RUN, not read.

---

## VERDICT: **FAITHFUL-WITH-GAPS**

The most consequential item in the phase — the embed chrome fix — **landed, and
landed correctly in both directions**. The gate did not over-apply. The
canonical point-away survived. No calculator figure moved. No interruption
changed. The gaps are three real §0 deviations that are not written in the
delta, plus four low-severity accuracy defects in the receipts themselves. None
of them is a regression against the pre-port production SHA.

**Gap count: 3 MEDIUM, 4 LOW, 0 HIGH.**

**Servers re-asserted before every quote** (the brief's own probe):

```
:3651  <title>Specialist Contractor Accountants | IR35 Advice UK</title>   fixed[- ]fee = 0
:3611  <title>Specialist Contractor Accountants | IR35 Advice UK</title>   fixed[- ]fee = 17
```

---

## 1. THE EMBED CHROME FIX — verdict: **LANDED, CORRECT, BOTH DIRECTIONS**

### 1a. `/embed/<slug>` — chrome gone, all ten routes

Measured on the current build, all 10 slugs, `<a href="/...">` anchors only:

| Probe | :3611 pre-port | :3651 current | Expected |
|---|---|---|---|
| HTTP | 200 x10 | **200 x10** | 200 |
| internal `<a>` links | 17 raw / 12 unique | **0 on all ten** | 0 |
| `<header` | 1 | **0** | 0 |
| `<footer` | 1 | **0** | 0 |
| `data-cta` | 0 | **0** | 0 |
| rendered anchors | many | **exactly 1**, absolute, `utm_source=partner-embed&utm_medium=iframe&utm_campaign=<slug>`, `target="_blank" rel="noopener"` | 1 |

The one surviving anchor is the attribution link, as designed. V17, V19, V22,
V24 PASS as written. V16 PASSES on the anchor rule (0) but **returns 2 as the
receipt literally spells it**, because `grep -o 'href="/[^"#?]*"'` also catches
`/_next/static/chunks/webpack-*.js` and `/_next/static/css/*.css`. Instrument
defect in the receipt, not a build defect.

### 1b. The trap did NOT resurface

`find src/app -name "layout.tsx"` returns exactly one file,
`src/app/layout.tsx`. **There is no `src/app/embed/layout.tsx`.** The fix is
`src/components/layout/ChromeGate.tsx` (a 10-line `"use client"` component
gating on `usePathname().startsWith("/embed/")`), consumed by
`PageShell.tsx`, which passes `bare={children}`. Read both files. The builder's
reasoning in §2b is correct: a nested layout would have rendered children
inside the chrome it was removing and looked right in the diff.

### 1c. The gate did NOT over-apply — `/embed` is intact

| Probe | :3611 | :3651 | Required |
|---|---|---|---|
| unique internal `<a>` links | 20 | **23** | unchanged / no loss |
| `<header` | 1 | **1** | 1 |
| `<footer` | 1 | **1** | 1 |
| `Skip to content` | 2 | **2** | present |
| `/calculators/<slug>` links | 10 | **10** | 10 |
| `utm_source=embed-gallery` | 1 | **1** | 1 |
| `bg-[#fafaf7]` | — | **0** | 0 |
| `ir35-embed-height` (page script) | — | **2** | >= 1 |
| `rounded-2xl` | — | **0** | 0 |

V25–V30 all PASS. The partner gallery kept its navigation. **This is the
regression the brief warned about and it did not happen.**

### 1d. Two residues, both LOW

- **V18 returns 1, not 0.** The single `Skip to content` hit is inside the RSC
  flight payload (`\"children\":\"Skip to content\"`), not the rendered DOM. The
  skip link is inline JSX in `PageShell`, so it serialises as a prop of the
  `ChromeGate` client boundary. Alongside it the payload carries one hit each
  for `SiteHeader`, `Privacy`, `Cookie`, `nav` and zero for `header_book` or
  `<header`. Nothing renders; a few hundred bytes of unrendered markup ship to
  every partner iframe. **Cosmetic, bytes only. Not a chrome leak.**
- **V23 returns 0, not `>= 1`.** `ir35-embed-height` is absent from
  `/embed/<slug>` server HTML — **and it is also 0 on the pre-port SHA :3611**.
  The string lives in the client chunk, not the document. The check was never
  satisfiable from server HTML and proves nothing either way. `EmbedAutoResize`
  is still mounted (1 reference in the payload) and
  `src/components/embed/EmbedAutoResize.tsx:14` still passes
  `messageType="ir35-embed-height"`. **Receipt instrument defect, not a
  regression.**

---

## 2. CANONICAL STILL POINTS AWAY — **PASS, all ten**

All ten `/embed/<slug>` routes:

```
<link rel="canonical" href="https://www.contractortaxaccountants.co.uk/calculators/<slug>"/>
<meta name="robots" content="noindex, nofollow"/>
```

Not one self-canonicalises. V20, V21 PASS. The legitimate point-away case
survived the phase that fixed five other route families.

---

## 3. 10 ROUTED, 4 PREMIUM UNROUTED — **PASS, both halves, derived from this site**

Derived from this site's own registry, not a sibling's:

- `src/lib/calculators/registry.ts:29` — `const BESPOKE: Tool[] = [];`
- `grep -rh "slug:" src/lib/calculators/tools/*.ts` = **10**
- `ls src/app/calculators` = `[slug]`, `page.tsx`. Nothing else.
- `/calculators` emits **exactly 10** `/calculators/<slug>` links (V2 PASS).
- `grep -c "premium"` on `/calculators` = **0** (V3 PASS).
- The four premium ids (`ir35-take-home-compare-premium`,
  `umbrella-vs-limited-premium`, `salary-dividend-planner-premium`,
  `corporation-tax-planner-premium`) appear **0 times** in any `.tsx` under
  `src`. Nothing lists them anywhere.
- `src/tests/calculator-crawl-path.test.ts:105-113` still asserts it AND still
  carries its own anti-vacuity assertion (`PREMIUM_TOOLS.length > 0`).

**Tests run here:** `npx vitest run` → **21 files, 448 tests, all pass**.
`npx vitest run src/tests/calculator-crawl-path.test.ts
src/lib/calculators/premium/premium-tools.test.ts` → **45 passed**.

---

## 4. NO CALCULATOR OUTPUT, RATE OR THRESHOLD CHANGED — **PASS, but the brief's premise is wrong**

**The brief says `src/lib/calculators/**` was off-limits and untouched. Three
files under it DID change between `18b4f25f` and HEAD.**

```
premium/configs/corporation-tax-planner.ts   | 4 ++--
premium/configs/salary-dividend-planner.ts   | 4 ++--
tools/corporation-tax-calculator.ts          | 2 +-
3 files changed, 5 insertions(+), 5 deletions(-)
```

I read the whole diff. **Every one of the five changed lines is a string
literal inside an `explainer.paragraphs` or a `note`.** No compute function, no
rate, no threshold, no band, no fraction. They were made by commit
`6d0155b65 fix(contractors-ir35): figures by arithmetic` — **phase 0, not phase
4.** Phase 4's own two packages touched nothing here.

**A passing test is not evidence a figure is right**, so I re-derived all three
corrections by hand rather than trusting `tax2026.test.ts`:

| Correction | Arithmetic | Verdict |
|---|---|---|
| "£1,000 per year" → "about £744" on basic-rate dividends | basic band £37,700 − £500 allowance = £37,200; £37,200 x (10.75% − 8.75%) = **£744** | new figure RIGHT, old figure was wrong |
| LEL salary "small employer NIC cost" → "£256, being 15% of the £1,708 above the £5,000 secondary threshold" | (£6,708 − £5,000) x 15% = **£256.20** | RIGHT |
| CT "effective rate ~26.5% at the midpoint" → "at the £150,000 midpoint it is 24.0% … the effective **marginal** rate is roughly 26.5%" | 25% x 150,000 − 3/200 x (250,000 − 150,000) = 37,500 − 1,500 = £36,000; 36,000/150,000 = **24.0%**. Marginal = **26.5%** | RIGHT; the old text confused average with marginal |

**Finding: no figure moved wrongly. Three figures moved from wrong to right, in
phase 0.** Correct the brief's claim that the directory is untouched; the safe
claim is "no compute code and no rate or threshold changed", which is true.

---

## 5. NO INTERRUPTIVE SURFACE ADDED, REMOVED OR RETIMED — **PASS**

Diffed `ResultGateModal.tsx` and `PremiumCalculator.tsx` against `18b4f25f`.

`PremiumCalculator.tsx`: **6 changed content lines, all class strings**
(`rounded-lg` → `rounded-xl` on `inputCls` and the segmented buttons). Every
gate invariant is byte-present and identical:

```
PremiumCalculator.tsx:43   let gateModalShownThisSession = false;     (module scope, once/session)
PremiumCalculator.tsx:499  const gated = placement === "blog" && !isConverted();
PremiumCalculator.tsx:541  if (!gateModalShownThisSession) { ... }
PremiumUpgrade.tsx:62      { ssr: false, loading: () => <ToolLoading /> }
PremiumUpgrade.tsx:108/113 sm:hidden -> MobileToolSlot ; hidden sm:block -> PremiumCalculator
```

Desktop-only, non-converted-only, once per session, click-triggered,
`ssr:false`: **all five unchanged.** No modal added, none removed, none
rescheduled. `ResultGateModal.tsx`'s diff is four class strings **plus one copy
line** (see gap L1).

---

## 6. `data-cta` TRIPLES — **PASS**, rendered-diffed, not counted

Attribute names `data-cta` / `data-cta-placement` / `data-cta-goal` byte-intact.

| Route | :3611 pre-port | :3651 current |
|---|---|---|
| `/calculators` | `specialist_widget` | `header_book`/`header`/`contact`, **`hero_book`/`hero`/`form` (NEW)**, `specialist_widget` |
| `/calculators/<slug>` x10 | `specialist_widget` | same three, identical on all ten |
| `/embed` | *(none)* | `header_book`/`header`/`contact` |
| `/embed/<slug>` x10 | ***(none)*** | *(none)* |

Nothing renamed, nothing dropped. The new triple is spelled exactly as the
ported `/glossary`, `/locations` and `/research` heroes spell it.

**The brief is slightly wrong here.** It says `/embed/<slug>` "correctly LOSES
`header_book`". Against the **pre-port SHA** that route carried **zero**
`data-cta` attributes, so nothing that existed in production was lost;
`header_book` arrived with the phase-1 header and was removed again in phase 4.
Same for "`/embed` is UNCHANGED at 23 links" — 23 is the intermediate build's
number; pre-port it was 20. `/embed` is unchanged **relative to the build being
reviewed**, which is the point the brief was making, and it gained 3 links
against production. No loss either way.

---

## 7. CONTRAST — **PASS. Both real failures fixed. Every published number reproduces.**

Hand-measured with an independent implementation (sRGB → linear,
`(L1+0.05)/(L2+0.05)`), self-tested against the brief's anchors **before** any
row was trusted:

```
slate-500 #64748b on white = 4.76   PASS (matches brief)
slate-400 #94a3b8 on white = 2.56   PASS (matches brief)
cyan-700  #0e7490 on white = 5.36   PASS (matches brief)
cyan-600  #0891b2 on white = 3.68   PASS (matches brief)
```

The ramp claim is **TRUE**, read in source at `globals.css` `@theme`:

```
--color-primary-500: #0891b2;  /* cyan-600 */
--color-primary-600: #0e7490;  /* cyan-700 = brand */
--color-primary-700: #155e75;  /* cyan-800 */
```

So `text-primary-600` really is 5.36, not 3.68. `PremiumCalculator.tsx` and its
siblings are `var()`-themed and the automated tool would have lied; nothing here
came from it.

The two claimed failures reproduce exactly and are fixed:

| Affordance | Before | After | File |
|---|---|---|---|
| Gate X button | `text-neutral-400` = **2.52 FAIL** | `text-neutral-600` = **7.81** | `ResultGateModal.tsx:148` region |
| "No thanks, just show my result" | `text-neutral-400` = **2.52 FAIL** | `text-neutral-600` = **7.81** | `ResultGateModal.tsx:148` region |
| Gate eyebrow | `text-neutral-500` = 4.74 marginal | `text-[var(--muted)]` = **7.81** | same file |

Independent sweep of low-contrast text classes across the whole phase-4 scope
(`src/components/calculators`, `src/app/calculators`, `src/app/embed`):
`text-neutral-400` survives at exactly one site, `src/app/embed/page.tsx:82` —
and I read its ground: it sits on the `bg-neutral-900` hero, **7.11 PASS**. No
`text-slate-400`, no `text-neutral-500`, no `text-cyan-600`, no
`text-primary-500` anywhere in scope. Lowest emitted text ratio in scope:
**5.12** (`primary-600` on `slate-50`). Checked and found nothing further.

Hairlines (`ring-1 ring-neutral-200/70` = 1.15, `--border` #e5e5e5 = 1.26) are
below 3.0 and are correctly left: decorative separators between same-coloured
surfaces, not state-bearing control boundaries. Recorded, not raised.

---

## 8. ONE RADIUS — **PASS in the components, FAIL on the rendered route**

Source census across the full phase-4 scope:

```
rounded-xl    31
rounded-full   3   (toggle track, toggle knob, "Better" pill — correct)
rounded        2   (ToolLoading shimmer bars — see gap L3)
rounded-2xl    2   (BOTH are inside code comments, zero markup)
rounded-lg     0
```

No `rounded-2xl` with a border in any phase-4 component. But see **gap M3**:
the rendered `/calculators/<slug>` still emits one, from a component outside
both leases.

---

## 9. `PremiumBarChart` NEVER RENDERS — **CONFIRMED TRUE**

Traced end to end, independently:

- `PremiumCalculator.tsx:642` — `{full && config.chart && result.chart && (`
- `PremiumCalculator.tsx:475` — `full = false,` (default)
- `PremiumUpgrade.tsx:67` — `full = false,` (default)
- `PremiumUpgrade.tsx:116` — `full={full}` (forwards its own default)
- `grep -rn "full={" src --include=*.tsx` returns **one hit**: that forward. No
  call site anywhere passes it.
- `PremiumUpgrade` is the only mount of `PremiumCalculator` in the repo, and
  its four call sites in `BlogPostRenderer.tsx` (lines 316, 327, 343, 351) pass
  only `topic`, `placement` and `category`. I read all four.

**Stated plainly: `PremiumBarChart` is unreachable on every route this site
serves. The F6 chart-accessibility fix earlier in this port repaired something
no visitor can see.** No recommendation to switch it on; that is a content
decision for the owner.

---

## GAPS

### MEDIUM

**M1 — `/calculators` renders white cards on a white section. §0.1 violated, not in the delta.**
`src/app/calculators/page.tsx` (rendered on :3651).
Standard: §0.1 — *"A card's ground is the opposite of its section's. White cards
on `bg-slate-50`, `bg-slate-50` cards on white. A white card on a white section
has no edge."*
Actual: section is `<section class="bg-white py-12 sm:py-16 lg:py-20">`; the ten
tool cards are `rounded-xl bg-white p-5 ring-1 ring-neutral-200/70`. At rest the
only edge is a 1.15-contrast hairline. `P4-1_CALCULATORS.md` §3a records the
choice ("hero dark, tools white") without noticing the rule. The already-ported
`/calculators/<slug>` gets this right: its related cards are `bg-white` on
`bg-slate-50`. Fix is one token: either the section to `bg-slate-50` or the
cards to `bg-slate-50` on white.

**M2 — Related-reading BULLETS were converted into CARDS pointing at sibling `/calculators/<slug>` routes. §0.4 violated, not in the delta.**
`src/app/calculators/[slug]/page.tsx:131-142`.
Standard: §0.4 — *"A calculator never gets a related-reading card. Where a card
would point at `/calculators/<slug>`, render the tool as a tabs block instead.
Standing rule."*
Actual: two routes now emit exactly that affordance —
`/calculators/ir35-status-indicator` (3 sibling calculator cards) and
`/calculators/umbrella-take-home-calculator` (1). Pre-port (:3611) these were
`<li><a>` bullets, which the rule does not ban. **This phase created the
violation.** Honest caveat: `CalculatorTabs` does not exist on this site (its
own `calculator-crawl-path.test.ts:5` says so), so the remedy §0.4 prescribes is
unavailable and the delta should have recorded the deviation with its reason.
Cheapest fix: keep the card grid for non-calculator targets, render the two
sibling-calculator entries as inline links. Or write the carve-out into the
delta.

**M3 — `ResourceGate` still ships the pre-redesign recipe onto all ten `/calculators/<slug>` routes, beside a restyled sibling.**
`src/components/resources/ResourceGate.tsx:42` —
`className="not-prose my-10 rounded-2xl border-l-4 border-cyan-700 bg-neutral-50 p-6 sm:p-8"`.
Standard: §0.1 — *"Radii and edges are `rounded-xl` with `ring-1 ring-slate-200/70`.
`rounded-2xl` and `border border-slate-200` are the pre-redesign recipe."*
`DESIGN_DELTA.md:281` marks `ResourceGate` **RESTYLE**.
Actual: `git diff 18b4f25f HEAD` on that file is **empty**. It renders on every
tool route via `resources/CalculatorPageResources.tsx`, directly beside
`CalcResultCta`, which phase 4 DID restyle. The same page now emits both
recipes, three lines apart:

```
<section class="not-prose my-10 rounded-2xl border-l-4 border-cyan-700 bg-neutral-50 ...">   <- ResourceGate
<section class="rounded-xl border-l-4 border-primary-600 bg-neutral-50 p-5 ring-1 ...">      <- CalcResultCta
```

Both P4-1 §3d/§6 and P4-2 §7.2 correctly identified this as outside their lease
and flagged it. **The lease boundary is honoured; the route is not finished.**
It is the last instance of that recipe and it is one class string.

### LOW

**L1 — `P4-2` §4.4 claims "Every string of copy is unchanged … success text". Against the pre-port SHA that is FALSE.**
`ResultGateModal.tsx` `successText`:
`"Thanks, we will be in touch within one working day. Your result is below."` →
`"Thanks, we will be in touch. Your result is below."`
Made by commit `1340c74d fix(contractors-ir35): phase 0 claims audit, serious
tier`, **not by P4-2**. The change is correct (it removed an unbacked
one-working-day promise). The receipt's sentence is true of its own diff and
false of the component. Word it as "unchanged by this package".

**L2 — Both receipts justify hand-rolling the eyebrow with a rationale that is no longer true.**
P4-1 §4 and P4-2 §4.3: *"`.eyebrow` is UNLAYERED at `globals.css:211` and pins
`color: var(--accent)`, which no utility can override."*
Actual: `.eyebrow` is at `globals.css:230` and is **inside `@layer components`**
— F10 layered it, and the comment immediately above it at `globals.css:215-223`
explains that it did, precisely so utilities win. The hand-rolled utilities emit
the same pixels, so nothing is visually wrong, but a stale rationale copied
forward into later packages is how a real defect gets re-introduced. Correct the
two receipts.

**L3 — `ToolLoading` skeleton bars are not on one radius.**
`src/components/calculators/premium/PremiumUpgrade.tsx:42-43` — both shimmer
bars are bare `rounded` (4px), a fourth radius. `P4-2` §4.2 claims "Skeleton
bars `rounded-lg` to `rounded-xl`". Trivial (3.5px and 5px tall placeholders,
visible for a fraction of a second), but the census claim is wrong.

**L4 — The ramp is adopted unevenly; `cyan-*` literals still render.**
`/calculators` emits `cyan-700` x20, `cyan-800` x6, `cyan-900` x4 alongside
`primary-600` x110 — the hero CTA is
`bg-cyan-700 … hover:bg-cyan-800 … focus-visible:outline-cyan-700`, from the
shared `btnPrimary` constant. Identical hexes to the ramp, so **zero contrast or
visual consequence**, and it is not a phase-4 file. P4-1 §3a's "cyan-700/800
become primary-600/700" is true of the cards and false of the button. Record it;
do not chase it inside this phase.

---

## RECEIPT ROWS THAT FAIL AS WRITTEN (instrument, not build)

| Row | Expected | Actual | Verdict |
|---|---|---|---|
| P4-1 V16 | 0 | **2** | instrument defect — both hits are `/_next` asset hrefs, not `<a>`. 0 by the anchor rule. **Fix stands.** |
| P4-1 V18 | 0 | **1** | RSC flight payload, not DOM. Chrome does not render. |
| P4-1 V23 | >= 1 | **0** | check never satisfiable from server HTML; **also 0 on the pre-port SHA**. `EmbedAutoResize` is mounted. |
| P4-1 V4 / V25 | 21 / >= 23 | 24 / 23 | counting-rule drift only. Strict-anchor rule reproduces the baseline exactly (see below). **No floor breach.** |
| P4-2 §4 census | `rounded-2xl 0` | true in-lease | **false on the rendered route** — gap M3. |

## LINK FLOORS — measured both servers with the sweep's own anchor rule

| Route | :3611 | :3651 | Lost |
|---|---|---|---|
| `/calculators` | 21 | **24** | none |
| `/calculators/dividend-tax-calculator` | 11 | **13** | none |
| `/calculators/corporation-tax-calculator` | 11 | **13** | none |
| `/calculators/umbrella-take-home-calculator` | 13 | **15** | none |
| `/calculators/ir35-status-indicator` | 14 | **16** | none |

`comm -23` on the sorted sets returns **empty for every route**: not one link was
dropped. The floors reproduce the receipt's stated baseline (21 / 11 / 13 / 14)
exactly, which means the instrument and the baseline agree.

## OTHER ROWS RUN AND PASSING

V1 (200), V2 (10), V3 (0), V5 (three CTAs), V6 (1), V7 (0/0), V8 (200 x10),
V12 (identical triple on all ten), V13 (1), V14 (`max-w-5xl` = 0), V15 (all six
FAQ questions present in BOTH the raw HTML and the `FAQPage` JSON-LD — nothing
hidden behind an accordion), V26–V30, V31 (0 em-dashes on all four route
families), V32 (0 hits for `fixed fee` / `24-hour` / `chartered` / `ICAEW` /
`ACCA` on all four).

Section rhythm checked in rendered HTML: `/calculators` = dark → white →
slate-50 → dark footer; `/calculators/<slug>` = dark → white → slate-50 → white
→ dark footer. No ground touches itself, no navy touches navy. §0.1 PASS apart
from M1.

## SILENT-SUBSTITUTION HUNT — result

Checked for a builder reusing the old pattern while appearing to adopt the
standard, and read rendered output rather than source in every case:

- Card recipe on `/calculators` is genuinely emitted:
  `rounded-xl bg-white p-5 ring-1 ring-neutral-200/70 hover:ring-primary-600/40
  focus-visible:outline-2 focus-visible:outline-primary-600`. Real, 24 `ring-1`
  instances, zero `border-2`. **Not a substitution.**
- `LeadCTAPanel` really mounts inside `<div id="book" class="scroll-mt-24">` on
  a `bg-slate-50` section. **Not a facade.**
- `.eyebrow` is used **0 times** in phase-4 scope; every eyebrow is the
  hand-rolled `font-mono text-xs font-medium uppercase tracking-[0.1em]`.
  **Consistent with the ported routes.**
- `FaqSection` was **not** adopted; FAQ copy is in the server HTML and matches
  the JSON-LD string for string. **The stated reason holds.**
- **Two substitutions FOUND**: M2 (a banned card affordance adopted under the
  banner of "card grid = the standard") and M3 (a pre-redesign recipe surviving
  untouched on a restyled route, invisible in every phase-4 diff).

## THINGS IN THIS BRIEF THAT WERE WRONG

1. **"No calculator output, rate or threshold changed. Diff `src/lib/calculators/**` … confirm no figure moved."** Three files under that path DID change between `18b4f25f` and HEAD. All five changed lines are prose in `note` / `explainer.paragraphs`, made by phase 0 (`6d0155b65`), not phase 4. No compute code, rate or threshold moved. I re-derived all three figures by arithmetic and all three went from wrong to right. The claim survives; its premise does not.
2. **"`/embed/<slug>` correctly LOSES `header_book`."** Against the pre-port SHA that route had **zero** `data-cta` attributes. `header_book` was introduced by the phase-1 header and removed again here; no production signal was lost.
3. **"`/embed` itself is UNCHANGED at 23 links."** 23 is the intermediate build's count; the pre-port SHA is 20. Unchanged relative to the build under review, +3 relative to production.
4. **"P4-1's own highest-value rows are V16-V19."** Agreed on value, but V16, V18 and V23 are written so they fail on a build where the fix is correct. The four rows that actually prove it are the anchor-only link count (0), `<header` (0), `<footer` (0) and `data-cta` (0).

## NOT CHECKED — stated so it is not mistaken for a pass

- **P4-2 rows 6-14** (browser, DevTools): computed `border-radius` on the
  hydrated card, live modal open/close and once-per-session behaviour, all three
  escape hatches revealing, computed `rgb(82,82,82)` on the two dismiss
  affordances, focus-ring visibility, 390px mobile behaviour, horizontal
  overflow. **No browser was driven.** Source and diff say all of these are
  correct; that is not the same as observing them.
- **P4-1 V33**, the full `sweep.mjs` run: it writes an output file, and this
  review is read-only with a one-file budget. Link floors were verified by hand
  instead, on five routes, against both servers (table above).
- **Whether the result gate has ever fired for a real visitor.** That is a data
  pull against `cta_id = "result_gate_skip"` and `formId = "calc_result_gate"`,
  not a code read.
- **`src/lib/calculators/**` compute correctness beyond the three changed
  prose figures.** The compute layer was declared off-limits and is unchanged;
  I did not re-derive the other tools' outputs.

---

## RECEIPT

- **Verdict: FAITHFUL-WITH-GAPS.**
- **Gaps: 0 HIGH, 3 MEDIUM (M1 card ground on `/calculators`; M2 related-reading cards pointing at sibling calculators, newly introduced; M3 `ResourceGate` unrestyled on all ten tool routes), 4 LOW.**
- **Embed fix verdict: LANDED AND CORRECT IN BOTH DIRECTIONS.** `/embed/<slug>` x10: 0 internal links, 0 `<header>`, 0 `<footer>`, 0 `data-cta`, 1 absolute attribution anchor, canonical still points away, `noindex, nofollow` intact. `/embed` untouched at 23 links with header, footer and skip link. The `embed/layout.tsx` trap did not resurface: one layout file exists on this site.
- **Builder claims found false:** (a) P4-2 §4.4 "every string of copy is unchanged" — `successText` changed, by phase 0; (b) P4-1 §4 and P4-2 §4.3 "`.eyebrow` is UNLAYERED at `globals.css:211`" — it is layered, at :230; (c) P4-2 §4.2 "skeleton bars `rounded-lg` to `rounded-xl`" — two are bare `rounded`; (d) P4-2 §4 "after: `rounded-2xl` 0" — true in-lease, false on the rendered route. **Everything else in both receipts that could be run, was run, and held.** Both packages' self-flagged limitations were honest, and P4-1's §2b pushback against the brief's `embed/layout.tsx` was correct.
- **Wrong in this brief:** four items, listed above; the material one is that `src/lib/calculators/**` is not untouched (prose only, phase 0, all three figures corrected).
- Tests run: `npx vitest run` → 21 files, **448 passed**. Guard pair → **45 passed**, non-vacuous.
- Nothing built, pushed or deployed. No code, content or config changed.
