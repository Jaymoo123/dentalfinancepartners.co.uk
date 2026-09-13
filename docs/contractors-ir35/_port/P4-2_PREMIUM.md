# P4-2 — Premium calculator surfaces + calculator client shell, contractors-ir35

Lease as briefed: `src/components/calculators/premium/**` and
`src/components/calculators/CalculatorClient.tsx`. Nothing outside it was
edited. `src/lib/calculators/**` NOT touched: no calculator output, figure,
rate or threshold was changed, or needed changing.

Date 2026-09-13. Nothing built, nothing pushed, nothing deployed. `next build`
and `next start` were NOT run (shared `.next`). Server age asserted before any
reading:

```
curl -s http://localhost:3611/ | grep -o -i "fixed[- ]fee" | wc -l   -> 17   (pre-port)
curl -s http://localhost:3641/ | grep -o -i "fixed[- ]fee" | wc -l   ->  0   (current build)
```

---

## 1. Mount trace, derived from this site and not inherited

Every chain below was derived by grepping this repo, then confirmed against the
live current build where server HTML can show it.

### 1a. The one entry point

`grep -rn "PremiumUpgrade" src` returns exactly one JSX mount file:
`src/components/blog/BlogPostRenderer.tsx`, at four slots (lines 316, 327, 343,
351). Not `/calculators`, not `/calculators/[slug]`, not `/embed`, not
`/embed/[slug]`. All four slots pass `placement="blog"`.

```
BlogPostRenderer  (4 slots, placement="blog")
   |
   +-- PremiumUpgrade                                       server component
         |  topic -> resourceForTopic -> toolId -> getPremiumTool
         |  returns null at any of those three misses
         |
         +-- sm:hidden       -> MobileToolSlot     -> MiniCapture   (server-rendered)
         +-- hidden sm:block -> PremiumCalculator  dynamic(ssr:false)
                                  |
                                  +-- PremiumBarChart   ONLY when full===true
                                  +-- CalcResultCta     placement blog + converted
                                  +-- ResultGateModal   when gateOpen
```

Confirmed live on the current build, a real post rather than a category page:

```
curl -s http://localhost:3641/blog/ir35-status/off-payroll-working-rules-hub
  premium-tool-ir...          present (the PremiumUpgrade section + sr-only h2)
  "Free interactive tool"     1
  mobile_tool                 1     (MobileToolSlot IS in server HTML)
  see_result                  0     (PremiumCalculator is ssr:false, as designed)
```

**The brief's sibling-site description holds here too, and I derived it rather
than inheriting it.** `PremiumCalculator` on this site is reachable only from
the blog renderer, is desktop-only (`hidden sm:block`, the `sm` breakpoint at
640px) and is client-only (`dynamic(..., { ssr: false })`).

### 1b. Four PREMIUM tools, no routes — unchanged, and correctly so

`PREMIUM_TOOLS` holds four configs and `ls src/app/calculators` is `[slug]` and
`page.tsx` only, with `dynamicParams = false` over the ten generic slugs.
Listing any of the four emits a dead link. `src/tests/calculator-crawl-path.test.ts`
pins this and still passes (5/5). Nothing in this package lists them.

### 1c. `PremiumBarChart` NEVER RENDERS on this site — a finding, not a fix

`PremiumBarChart` is gated on `full && config.chart && result.chart`.
`full` defaults to `false` in `PremiumCalculator`, defaults to `false` in
`PremiumUpgrade`, and **no mount passes it**: all four `PremiumUpgrade` call
sites in `BlogPostRenderer` pass only `topic`, `placement` and `category`.
Since `PremiumUpgrade` is the only mount of `PremiumCalculator` anywhere in the
repo, `full` is structurally always `false` and the chart is dead code on every
route this site serves.

Reported, not fixed. Turning the chart on would add a surface to four blog
positions, which is a content and layout decision, not a restyle. It also
explains a loose end in `P1-1_TOKENS.md`, which flagged that
`PremiumBarChart.tsx` was not wired to `--chart-1..5`: wiring it changes
nothing visible until somebody passes `full`.

Its two series colours were checked anyway, since they are the thing a future
`full={true}` would expose: `var(--accent)` `#0e7490` = **5.36** and slate-500
`#64748b` = **4.76** on white, both above the 3.0 graphics floor, and every
value carries a text label (`fill="var(--ink)"`, 19.80). The F6 accessibility
fix (`ChartDataTable`) is present and untouched.

### 1d. `CalculatorClient.tsx` — in lease, deliberately NOT edited

32 lines, an RSC boundary wrapper. It resolves a slug to a tool config inside
the client module graph (the config carries a compute function, which cannot
cross the server-to-client boundary) and renders
`@accounting-network/web-shared/tools/components/Calculator`. It has **no markup
of its own**: no class, no element, nothing to restyle. Every pixel it is
responsible for is rendered by the shared `Calculator` in
`packages/web-shared`, which is trap 12 and forbidden.

**Reported, not fixed:** `/calculators/<slug>` x10 and `/embed/<slug>` x10 draw
their tool body from an unported kit component. If those twenty routes are to
reach the standard, that is a `packages/web-shared` decision for the manager,
affecting 18 sites. P4-1 reached the same conclusion independently (§6 item 4).

---

## 2. `ResultGateModal` render verdict

### 2a. Verdict: IT RENDERS. The mount path is live.

Gate condition, `PremiumCalculator.tsx`:

```
const gated = placement === "blog" && !isConverted();
```

- `placement === "blog"` is satisfied: all four `PremiumUpgrade` mounts pass it
  explicitly.
- `PremiumUpgrade` returning a live island on a real post is confirmed above
  against :3641, not assumed.
- `gateOpen` is set by `onSeeResult`, the click handler on the `See your result`
  button, which is the only way to reveal the figure when `gated`.

So the chain has no dead link in it. The narrowing conditions are all real but
none of them is a floor of zero:

| Condition | Effect |
|---|---|
| `placement === "blog"` | satisfied on every mount; `/calculators` and `/embed` never gate |
| viewport `>= sm` (640px) | phone readers get `MobileToolSlot` instead and never see the gate |
| `!isConverted()` | returning converted visitors are never gated |
| module-level `gateModalShownThisSession` | at most once per browser session |
| requires a click on `See your result` | a reader who does not interact never triggers it |
| `dynamic(ssr:false)` | client-only, so it is invisible to any server-HTML probe |

**A server-HTML sweep can never see this component.** Any baseline built by
curling routes would report it absent whether or not it works. That is the most
likely reason the pre-port baseline could not distinguish the two cases, and it
is a property of the instrument, not of the component.

### 2b. The brief is WRONG on "ZERO analytics events of any kind"

Verified against source. `ResultGateModal` fires, on **every** dismiss path
(X button, "No thanks", backdrop click, Esc key, all routed through one `skip`
callback):

```
track("cta_click", { cta_id: "result_gate_skip", placement: "result_gate" });
```

and the submit path goes through `MiniCapture` with `formId="calc_result_gate"`,
which carries its own form instrumentation.

Since the escape hatch is the only non-submit exit and submit is the only other
exit, **the gate cannot open and close without emitting something**. Therefore
a zero-row baseline means "nobody reached the gate", not "it never renders".
The question the brief asked is answerable from the instrumentation that already
exists.

What is genuinely absent is an **open** event. There is no `result_gate_view`,
so opens cannot be counted and a skip rate cannot be computed. That is the real
instrumentation gap.

**No instrumentation was added.** New tracking is an owner decision and stays
one. Flagged for the owner in §6.

---

## 3. Contrast, hand-measured

WCAG relative luminance, sRGB to linear per channel, `(L1+0.05)/(L2+0.05)`.
The script asserts on the required anchors before any row below is trusted and
reproduces them exactly:

```
slate-500 #64748b on white = 4.76      slate-400 #94a3b8 on white = 2.56
cyan-700  #0e7490 on white = 5.36      cyan-600  #0891b2 on white = 3.68
```

**Every file in this lease is `var()`-themed, so the automated instrument falls
back to white and lies.** Nothing below came from it. Each row resolves the
custom property to its literal hex from `globals.css:19-40` first, then measures.

This site's ramp binds `--color-primary-600` to cyan-700 `#0e7490`, so
`text-primary-600` is **5.36**, not 3.68 (`P1-7_RAMP.md`, re-read, and
`P1-1_TOKENS.md`). True cyan-600 is `--color-primary-500` here and is not used
as text or as a ground anywhere in this package.

| Pair | Role | Ratio | Floor | Verdict |
|---|---|---|---|---|
| `--ink` `#0a0a0a` on white | headline figure, labels | 19.80 | 4.5 | PASS |
| `--ink` on `--surface` `#fafaf7` | headings on warm ground | 18.93 | 4.5 | PASS |
| `--ink-soft` / `--muted` `#525252` on white | body, help text, workings | 7.81 | 4.5 | PASS |
| `--muted` on `--surface` `#fafaf7` | same on the warm ground | 7.47 | 4.5 | PASS |
| `--muted` on amber-50 `#fffbeb` | warn-tone headline sub | 7.54 | 4.5 | PASS |
| `--ink` on amber-50 | warn-tone headline figure | 19.09 | 4.5 | PASS |
| `--accent` `#0e7490` on white | eyebrow (NEW), segmented active label | 5.36 | 4.5 | PASS |
| white on `--accent` ground | chip label (OLD, now removed) | 5.36 | 4.5 | PASS |
| `--accent` on `--accent`/10 tint `#e7f1f4` | segmented-active label, "Better" pill | 4.67 | 4.5 | PASS |
| `--accent` border on white | best-scenario edge, active segment edge | 5.36 | 3.0 | PASS |
| neutral-900/60 backdrop `#8a8a8a` vs white | modal dim layer | 4.67 | 3.0 | PASS |
| **neutral-400 `#a3a3a3` on white** | **gate X button + "No thanks" (BEFORE)** | **2.52** | **4.5** | **FAIL** |
| neutral-500 `#737373` on white | gate eyebrow heading (BEFORE) | 4.74 | 4.5 | PASS, marginal |
| neutral-600 `#525252` on white | gate X + "No thanks" (AFTER) | 7.81 | 4.5 | PASS |
| `--muted` `#525252` on white | gate eyebrow heading (AFTER) | 7.81 | 4.5 | PASS |
| slate-500 `#64748b` on white | chart secondary series fill | 4.76 | 3.0 | PASS |

**One real defect found and fixed: 2.52:1 on both dismiss affordances of the
result gate.** Both were `text-neutral-400`. The "No thanks, just show my
result" link is 12px underlined text and is the reader's escape hatch from an
interruption, so it is exactly the wrong place to be 2.5:1. Now 7.81.

The 4.74 heading was inside the floor but marginal, and was being replaced
anyway to hand-roll the eyebrow (§4.3). It is now 7.81.

### Decorative hairlines, measured and deliberately left

`ring-1 ring-neutral-200/70` computes **1.15** on white and
`border-[var(--border)]` `#e5e5e5` computes **1.26**. Both are below 3.0.
They are left as-is: they are decorative separators between same-coloured
surfaces, not graphics required to understand content and not the boundary of
any control whose state they signal. `ring-1 ring-neutral-200/70` is the card
recipe the standard itself mandates and that every already-ported route on this
site now uses, so changing it here would break consistency to chase a floor that
does not apply. Recorded so the number is on the page rather than discovered
later and mistaken for an oversight.

---

## 4. What was restyled

Radius census inside the lease, before and after:

```
before:  rounded-2xl 3    rounded-lg 3    rounded-xl 6    rounded-full 3
after:   rounded-2xl 0    rounded-lg 0    rounded-xl 12   rounded-full 3
```

`rounded-full` is retained on the three places it is correct: the toggle switch
track, the switch knob, and the "Better" pill. Those are pills and switches, not
card surfaces.

### 4.1 `PremiumCalculator.tsx`

- Root card: `rounded-2xl border border-[var(--border)]` becomes
  `rounded-xl ... ring-1 ring-neutral-200/70`. The 2xl-plus-border recipe is the
  pre-redesign one the standard names as a defect.
- `inputCls` (every text input and every `<select>`): `rounded-lg` to
  `rounded-xl`.
- Segmented radio buttons: `rounded-lg` to `rounded-xl`.
- `HeadlineCard`, `ScenarioTiles`, `Workings` and the "Advanced options"
  `<details>` were **already** `rounded-xl` and were left alone. They keep
  `border` rather than `ring` because on three of them the border colour is
  load-bearing state (`border-[var(--accent)]` marks the best scenario, the
  active segment and the warn tone); swapping a state signal to a ring for
  cosmetic consistency is a bigger risk than the inconsistency. Noted, not done.
- Section rhythm and the two-column grid are unchanged. There is no page measure
  to fix here: this component is an in-body island and inherits the article
  measure from `BlogPostRenderer`, which P2-1 already ported. No clamp was added
  and none was found.

### 4.2 `PremiumUpgrade.tsx`

- `ToolLoading` skeleton: same root-card change as the real card, so the
  placeholder and the hydrated component now have identical geometry and there
  is no radius pop on hydration. Skeleton bars `rounded-lg` to `rounded-xl`.
  `minHeight: 480` is untouched, so the CLS guard still holds.
- Eyebrow: see 4.3.

### 4.3 The eyebrow, hand-rolled

`.eyebrow` is UNLAYERED at `globals.css:211` and pins `color: var(--accent)`,
which no Tailwind utility can override. Confirmed by reading the rule, not by
trusting the brief. **`globals.css` was not edited and the `.eyebrow` class is
not used anywhere in this lease** (`grep` for it returns nothing).

The "Free interactive tool" chip was a filled cyan block with white 11px bold
text and a bare `rounded` (4px), which is a fourth radius and matches nothing
else on the ported site. It is now the same hand-rolled eyebrow that
`/glossary`, `/locations` and `/research` use:

```
font-mono text-xs font-medium uppercase tracking-[0.1em] text-[var(--accent)]
```

Copy is unchanged. Contrast goes from 5.36 (white on cyan) to 5.36
(cyan on white): the same number, because it is the same pair inverted.

### 4.4 `ResultGateModal.tsx`

- Card: `border-l-4 border-[var(--accent)] ... rounded-xl` becomes
  `rounded-xl border-l-4 border-[var(--accent)] ... ring-1 ring-neutral-200/70`.
  The `border-l-4` accent flag is **kept**, matching the recipe P4-1 landed on
  `CalcResultCta.tsx` in this same wave (`rounded-xl border-l-4
  border-primary-600 ... ring-1 ring-neutral-200/70`, P4-1 §3d). The defect the
  standard names is the 2xl radius with a plain border, not the accent edge, and
  a split recipe between two sibling capture cards would be worse than either.
- X button: `rounded-lg` to `rounded-xl`; `text-neutral-400` to
  `text-neutral-600` (2.52 to 7.81), hover `neutral-800` to `neutral-900`.
- "No thanks" link: `text-neutral-400` to `text-neutral-600` (2.52 to 7.81),
  hover `neutral-700` to `neutral-900`, plus `rounded-xl` so its focus ring has
  the right corner.
- Heading: hand-rolled eyebrow as above, `text-neutral-500` (4.74) to
  `text-[var(--muted)]` (7.81).
- **Every string of copy is unchanged**: heading, blurb, submit label, success
  text, placeholder, and the "No thanks, just show my result" wording.
  `formId`, `messagePrefix`, `messageMinLength` and `messageMinWords` untouched.

### 4.5 `MobileToolSlot.tsx`

`rounded-2xl border-l-4` to `rounded-xl border-l-4 ... ring-1
ring-neutral-200/70`. Identical to `CalcResultCta`. `formId`, `messagePrefix`,
`role`, heading, blurb and `submitLabel` unchanged.

### 4.6 `PremiumBarChart.tsx` and `CalculatorClient.tsx`

Not edited. §1c and §1d.

---

## 5. `data-cta` triples, before and after

`grep -rn 'data-cta' src/components/calculators/`:

| File | Before | After |
|---|---|---|
| `PremiumCalculator.tsx:658` | `data-cta="see_result"` | `data-cta="see_result"` |
| `ResultGateModal.tsx` | none, by design | none, by design |
| `MobileToolSlot.tsx` | none | none |
| `PremiumUpgrade.tsx` | none | none |
| `PremiumBarChart.tsx` | none | none |
| `CalculatorClient.tsx` | none | none |

**Zero changes. No attribute added, removed, renamed or moved.** Attribute names
are byte-identical.

Two things worth recording rather than acting on:

1. **`see_result` is a singleton, not a triple.** It carries `data-cta` and
   neither `data-cta-placement` nor `data-cta-goal`, so its `vw_cta_performance`
   rows land with those columns empty. The brief said preserve the triples, and
   `P3_ROUTE_ANATOMIES.md` §A.8 says every CTA should carry all three. I
   preserved rather than completed, matching P4-1's ruling that a new analytics
   column is a new thing to explain and the owner's call. Flagged in §6.
2. **`ResultGateModal`'s dismiss buttons carry no `data-cta` deliberately**, and
   that is correct. The component tracks `cta_click` /
   `cta_id="result_gate_skip"` manually so that backdrop clicks and the Esc key
   are counted too; adding `data-cta` to the two buttons would double-count them
   against the autocapture layer. The existing comment saying so was left in
   place and is accurate.

---

## 6. Interruptive behaviour, before and after

The estate baseline is ten live capture surfaces. This lease contains **one**
interruptive surface, `ResultGateModal`, plus two non-interruptive inline
captures (`MobileToolSlot`, `CalcResultCta`) that are always-present in-body
blocks and interrupt nothing.

| Property | Before | After | Changed |
|---|---|---|---|
| Trigger | click on `See your result` | click on `See your result` | NO |
| Timing | synchronous on that click, no delay, no timer | identical | NO |
| Frequency | at most once per session (`gateModalShownThisSession`, module scope) | identical | NO |
| Scope | `placement === "blog"` only | identical | NO |
| Suppression | never shown to `isConverted()` visitors | identical | NO |
| Escape | X, "No thanks", backdrop click, Esc; all reveal the result | identical | NO |
| Result withheld? | never, every exit reveals | identical | NO |
| Focus behaviour | container focused on open, not a field | identical | NO |
| Surface count | 1 in this lease | 1 in this lease | NO |

**Nothing about any interruption's timing, trigger or frequency was touched.**
The edits to this component are four class strings. No modal was added, none
removed, none rescheduled.

**No kit component was adopted in this package, so there is no kit-default
behaviour to compare against and nothing to refuse.** The restyle is done with
literal Tailwind utilities written in `src/`, which is also why the
`globals-standard.css` focus-ring trap does not apply here: `globals.css` does
not import that sheet (`P1-1_TOKENS.md`), so any kit component delegating its
ring to it would render an invisible one, as it already did to
`RelatedArticles`. Every focus ring in this lease is an explicit
`focus:ring-2 focus:ring-[var(--accent)]` generated from this site's own source.
`FaqSection` was not adopted, and there is no FAQ in this lease.

### Flagged for the owner, not built

1. **No `result_gate_view` event.** Opens cannot be counted, so the gate's skip
   rate and conversion rate cannot be computed, only its absolute skip and
   submit counts. Adding one is new tracking and therefore the owner's call.
2. **`see_result` has no `data-cta-placement` / `data-cta-goal`.** §5 item 1.

---

## 7. Things in the brief that were wrong

1. **"`ResultGateModal` has ZERO analytics events of any kind" is wrong.** It
   fires `cta_click` with `cta_id="result_gate_skip"` on every dismiss path, and
   its submit path is a `MiniCapture` with `formId="calc_result_gate"`. §2b. The
   correct statement is narrower and still useful: there is no **open** event.
   This matters, because it changes the answer to the question the brief asked:
   a zero-row baseline does distinguish the two cases, since the gate cannot open
   and close without emitting a row.
2. **"`ResourceGate.tsx` ... if it is in your lease" — it is not.** It lives at
   `src/components/resources/ResourceGate.tsx`, not under
   `src/components/calculators/`. Not touched, reported per instruction. The
   parallel agent's report of `rounded-2xl border-l-4` on it is consistent with
   what this package found on its own two siblings (`MobileToolSlot`, and
   `CalcResultCta` before P4-1 fixed it), so it is very likely real and is the
   last instance of that recipe. It belongs to whichever package leases
   `src/components/resources/`.
3. **The sibling-site derivation for `PremiumCalculator` was correct here**, but
   only because I derived it: blog-renderer-only, desktop-only, client-only all
   reproduce on this site. I did not inherit it.
4. **Nothing about the ramp was wrong.** `--color-primary-600` is cyan-700 and
   `text-primary-600` measures 5.36. Confirmed by reading `P1-1_TOKENS.md` and
   `P1-7_RAMP.md` before measuring, as instructed.
5. **Nothing about `.eyebrow` was wrong.** Unlayered at `globals.css:211`,
   pinning `color: var(--accent)`. Hand-rolled instead; `globals.css` untouched.
6. **Not in the brief, and it should be:** `PremiumBarChart` is unreachable on
   every route this site serves, because no mount ever passes `full`. §1c.
7. **Not in the brief, and it should be:** `CalculatorClient.tsx` is in the
   lease but has no markup. The twenty calculator and embed tool bodies are
   rendered by `packages/web-shared`, which is trap 12. §1d.

---

## 8. Checks run here

Not a substitute for the manager's build, but these did run:

- `npx tsc --noEmit` in `contractors-ir35/web` -> **exit 0**, no errors.
- `npx vitest run src/tests/calculator-crawl-path.test.ts
  src/lib/calculators/premium/premium-tools.test.ts` -> **45 passed**, 2 files.
  The crawl-path guard that pins "the four premium tools are never listed" is
  among them and is unchanged.

**A passing test is not evidence a figure is right.** These prove only that
nothing regressed; they prove nothing about the correctness of any rate or
threshold, and this package changed none, read none and relied on none.

---

## 9. Verification list for the serialised build

Run `next build` then `next start` once, on a port of your choosing. `<BASE>` is
that port. Every expected result is stated so a mismatch is a failure rather
than a judgement call.

**Step 0, prove which server you are on. Everything below is void without it.**

```
curl -s <BASE>/ | grep -o -i "fixed[- ]fee" | wc -l        -> 0   (post-port)
curl -s <BASE>/ | grep -o "<title>[^<]*</title>"
   -> <title>Specialist Contractor Accountants | IR35 Advice UK</title>
```

**Server-HTML checks (curl, no browser).**

1. **The premium island still mounts on a blog post.**
   `curl -s <BASE>/blog/ir35-status/off-payroll-working-rules-hub | grep -c "premium-tool-"`
   -> **>= 1**. This is the whole surface; if it is 0, nothing else matters.
2. **The eyebrow changed and the copy did not.** Same URL:
   `grep -c "Free interactive tool"` -> **1** (unchanged), and
   `grep -c "bg-\[var(--accent)\] px-2.5"` -> **0** (the old filled chip is gone).
3. **`MobileToolSlot` is on the new recipe.** Same URL:
   `grep -o 'rounded-xl border-l-4 border-\[var(--accent)\][^"]*ring-1' | head -1`
   -> one hit. And `grep -c "rounded-2xl border-l-4"` -> **0**.
4. **No premium tool is listed on the index.**
   `curl -s <BASE>/calculators | grep -c "premium"` -> **0**, and the page's
   unique-internal-link count is still **21** (the P4-1 baseline).
5. **`see_result` is still absent from server HTML** (it is `ssr:false`, so
   presence would mean the dynamic boundary broke):
   `curl -s <BASE>/blog/ir35-status/off-payroll-working-rules-hub | grep -c "see_result"`
   -> **0**.

**Browser checks, desktop viewport >= 1024px, on a blog post with a mapped
category** (`/blog/ir35-status/off-payroll-working-rules-hub`).

6. **The calculator card hydrates and is on one radius.** Scroll to the tool.
   Computed `border-radius` on the card is **12px** on all four corners, its
   `box-shadow` includes a 1px `rgb(229 229 229 / 0.7)` ring, and it has **no**
   `border-width`. The loading skeleton, if you catch it on a throttled
   connection, has the same 12px and the same 480px min-height, with no pop.
7. **Inputs and segmented buttons are on the same radius.** Any text input,
   any `<select>` and any segmented option button computes **12px**.
   The toggle switch and the "Better" pill stay fully round: that is correct.
8. **The result gate opens, once.** Change any input, then click
   `See your result`. The modal must appear. Close it with Esc: the figure must
   be revealed behind it. Click `See your result` on a second calculator in the
   same tab: the modal must **not** appear again and the figure must reveal
   directly. Reload the tab and it may appear once more. This is the
   once-per-session behaviour and it must be **unchanged**.
9. **Every escape hatch reveals.** In three fresh tabs, dismiss the gate by
   (a) the X, (b) "No thanks, just show my result", (c) a click on the dimmed
   backdrop. All three must reveal the result. None may leave it hidden.
10. **The gate's contrast fix is live.** With the modal open, DevTools computed
    `color` on the X button and on the "No thanks" link must be
    **`rgb(82, 82, 82)`** (neutral-600). If either reads `rgb(163, 163, 163)`,
    the fix did not ship.
11. **The gate eyebrow.** "Before you see your result" renders in the monospace
    face, uppercase, `rgb(82, 82, 82)`, with visible letter-spacing. If it is
    cyan `rgb(14, 116, 144)`, something has picked up the unlayered `.eyebrow`
    rule and it must be traced.
12. **Focus rings are visible.** Tab through the open modal. The X button, the
    form fields and the "No thanks" link must each show a cyan
    (`rgb(14, 116, 144)`) 2px ring. An invisible ring means the
    `globals-standard.css` delegation problem has reached this component.
13. **Mobile gets the capture, not the calculator, and never the gate.**
    At 390px wide on the same post: the `MobileToolSlot` form is visible, the
    calculator is not, and there is no way to open the gate. The slot's card is
    12px-radius with the cyan left edge.
14. **No horizontal overflow at 390px** on that post.
    `document.documentElement.scrollWidth` must equal `clientWidth`.

**Regression guards.**

15. `npx tsc --noEmit` -> exit 0.
16. `npx vitest run src/tests/calculator-crawl-path.test.ts
    src/lib/calculators/premium/premium-tools.test.ts` -> 45 passed.

**UNVERIFIED by this package, and named so explicitly:**

- Every one of items 1 to 16 above. No build was run here, per the wave rule.
- **All rendered geometry.** Static analysis cannot prove emitted CSS. The
  `ring-1 ring-neutral-200/70` utility in particular is new to these five files;
  it is a literal utility written in `src/` and so should be generated normally,
  but that is an expectation, not an observation.
- **Whether the gate has ever actually been reached by a real visitor.** §2a
  proves the mount path is live and §2b proves an open would emit a row. It does
  not tell you what the analytics tables contain. Answering that is a data pull
  against `cta_id = "result_gate_skip"` and `formId = "calc_result_gate"`, not a
  code read, and it was not run here.
- **`PremiumBarChart`'s appearance.** It cannot be observed on any route,
  because no mount passes `full`. §1c.
