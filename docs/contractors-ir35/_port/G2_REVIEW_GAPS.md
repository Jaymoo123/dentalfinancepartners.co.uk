# G2 — gap-fix package, review gaps (contractors-ir35)

Closes the actionable gaps from R3 (phase 3) and R4 (phase 4). Four files
touched, all inside the declared lease. No `next build`, no state-changing git
command, no deploy, nothing under `packages/web-shared/`, nothing outside
`contractors-ir35/web/`.

**Servers asserted before any quote, and again after the edits:**

```
:3651  fixed[- ]fee = 0    (current build)
:3611  fixed[- ]fee = 17   (pre-port, SHA 18b4f25f)
```

**Contrast table used: Tailwind v4.** Independent implementation (sRGB →
linear, `(L1+0.05)/(L2+0.05)`), self-tested before any row below was trusted:

| Self-test | v4 hex | measured | v3 hex | measured |
|---|---|---|---|---|
| slate-500 on white | `#62748e` | **4.764** | `#64748b` | 4.759 |
| slate-400 on white | `#90a1b9` | **2.630** | `#94a3b8` | 2.564 |

The brief's v4 anchors are 4.77 and 2.63. slate-400 reproduces exactly.
slate-500 reproduces as 4.764, which rounds to 4.76, not 4.77 — a third-decimal
rounding difference between implementations, not a disagreement about the hex.
Every ratio below is from this implementation against the **v4** hexes.

---

## GAP 1 (R4 M2) — related-reading cards pointing at sibling calculators

**Claimed.** Phase 4 converted pre-port bullets into cards pointing at
`/calculators/<slug>`, which §0.4 bans outright ("a calculator never gets a
related-reading card"). Two routes affected. The port created the violation.

**Verified.** True, in both halves.

- Pre-port markup read off `:3611/calculators/ir35-status-indicator` (not
  assumed): `<ul class="mt-3 list-disc space-y-2 pl-5 text-base text-neutral-700">`
  with `<li><a class="font-semibold text-cyan-700 underline underline-offset-2
  hover:text-cyan-800">`. Bullets, exactly as the reviewer said.
- Current build at `src/app/calculators/[slug]/page.tsx` rendered a
  `grid sm:grid-cols-2 lg:grid-cols-3` of `rounded-xl bg-white … ring-1` cards.
- Scope is exactly two routes, confirmed from this site's own data rather than
  the rendered pages: `grep -n "related:" src/lib/calculators/tools/*.ts`
  returns two files only — `ir35-status-indicator.ts` (3 entries, all
  `/calculators/<slug>`) and `umbrella-take-home-calculator.ts` (2 entries, one
  `/calculators/<slug>`, one `/blog/...`). The other eight tools have no
  `related` block, so they emitted no cards at all.
- §0.4's prescribed remedy (`CalculatorTabs`) genuinely does not exist on this
  site — `src/tests/calculator-crawl-path.test.ts:5` records that.

**Changed.** Restored the `<ul><li><a>` list form for the whole block, keeping
the phase-4 restyle on the link itself: `text-primary-600` /
`hover:text-primary-700` (the ramp) in place of the pre-port `cyan-700` /
`cyan-800` literals, plus an explicit `focus-visible` outline the pre-port link
did not have. One block, no per-entry branching: the mixed-target route
(`umbrella-take-home-calculator`) gets one affordance rather than a card beside
a bullet.

**Links.** No `href` added or removed; the same entries render, in the same
order, in a different element. Measured with one instrument (unique `href` on
rendered `<a>` elements) across both servers:

| Route | `:3611` pre-port | `:3651` before this fix | floor in `sweep_baseline.json` |
|---|---|---|---|
| `/calculators/ir35-status-indicator` | 15 | 19 | 14 |
| `/calculators/umbrella-take-home-calculator` | 14 | 18 | 13 |

My instrument runs one above the baseline's on the same SHA (15 vs 14, 14 vs
13), so the two count hash-only anchors differently; used consistently, the
relationship is what matters. The edit is href-preserving, so the after-count is
the before-count. **Re-measure after your build and confirm 19 and 18 are
unchanged and both stay above the floor** (verification list, V1).

---

## GAP 2 (R4 M1) — white cards on a white section on `/calculators`

**Claimed.** §0.1: "a card's ground is the opposite of its section's … a white
card on a white section has no edge." The listing section was
`bg-white`, the ten tool cards `rounded-xl bg-white … ring-1 ring-neutral-200/70`.
Not recorded as a deviation in `DESIGN_DELTA.md`. One token fixes it.

**Verified.** True as stated, read in source at
`src/app/calculators/page.tsx:96` (section) and `:115` (cards), and in the
served HTML on `:3651`. The empty-state card at `:99` had the same defect.

**Changed.** Section `bg-white` → `bg-slate-50`, cards left white. That is the
direction the already-ported `/calculators/[slug]` uses for its own cards, so
the two routes now share one recipe.

Two consequences followed from §0.1 and were fixed with it, both in the same
leased file:

- **"Grounds oscillate … two touching sections never share a ground."** The
  closing `LeadCTAPanel` was `ground="slate"`, which would now touch a slate-50
  section. Flipped to `ground="white"` — identical to the slug route, whose
  panel is `ground="white"` under its own slate-50 section. The panel's own card
  is `bg-slate-100` either way, so it keeps its edge.
- The card hover was `hover:bg-neutral-50`, which against a slate-50 ground
  would have made the card sink into the section on hover (1.00 against the
  ground). Dropped; `hover:ring-primary-600/40` carries the hover state on its
  own, which is what the sibling route does.

**Measured (hand, v4 table).**

| Pair | Before | After |
|---|---|---|
| card ground vs section ground | `#ffffff` on `#ffffff` = **1.00**, no edge at rest | `#ffffff` on `#f8fafc` = **1.05** |
| card hairline `ring-neutral-200` vs section | `#e5e5e5` on white = 1.26 | `#e5e5e5` on slate-50 = **1.21** |
| card body text `neutral-600` on card | 7.81 | **7.81** (unchanged, card is still white) |
| "Open calculator" `primary-600` on card | 5.36 | **5.36** (unchanged) |
| section-level text `neutral-600` (the `/embed` footnote line) | 7.81 on white | **7.47** on slate-50 |

Note plainly what the 1.05 is and is not: a card/ground step is not a text
contrast and 3:1 does not apply to it. §0.1 asks for an *edge*, and the edge is
now the ground step plus the 1.21 hairline rather than the hairline alone. Every
text ratio on the route stays at or above 5.12 (`primary-600` on slate-50),
which is the lowest emitted ratio in scope and unchanged by this package.

**Links.** `/calculators` = 22 on `:3611`, 27 on `:3651`, baseline floor 21.
Ground and hover classes, plus a `ground` prop; no `href` touched, no count
change expected.

---

## GAP 3 (R3 M2 + R4 M3) — `ResourceGate` still ships the pre-redesign recipe

**Claimed.** `src/components/resources/ResourceGate.tsx` is byte-unchanged from
pre-port and renders `rounded-2xl border-l-4 border-cyan-700`. §0.1: one radius,
`rounded-xl` with a hairline ring; `rounded-2xl` plus a border is the
pre-redesign recipe. `DESIGN_DELTA.md:281` marks it RESTYLE. It renders on all
ten tool routes three lines below the already-restyled `CalcResultCta`, and as
the last band before the footer on all three `/resources/*` routes.

**Verified.** All of it. The served class string on `:3651` was
`not-prose my-10 rounded-2xl border-l-4 border-cyan-700 bg-neutral-50 p-6 sm:p-8`,
and `CalcResultCta.tsx:24` three lines away is
`rounded-xl border-l-4 border-primary-600 bg-neutral-50 p-5 ring-1 ring-neutral-200/70 sm:p-6`.
Both previous builders were right that it sat outside their lease; it is inside
this one.

**Changed.** One class string, made byte-identical in its frame to
`CalcResultCta` so the two bands beside each other cannot drift again:

```
- not-prose my-10 rounded-2xl border-l-4 border-cyan-700  bg-neutral-50 p-6 sm:p-8
+ not-prose my-10 rounded-xl  border-l-4 border-primary-600 bg-neutral-50 p-5 ring-1 ring-neutral-200/70 sm:p-6
```

`border-cyan-700` → `border-primary-600` is the same hex (`#0e7490`; the ramp
pins `--color-primary-600: #0e7490`), so this is a token adoption with zero
colour consequence, not a colour change. The component docblock's
"Petrol-cyan (#0e7490)" line stays true.

**RADIUS DEPENDENCY, stated as the brief asks.** The rendered value of
`rounded-xl` depends on the parallel G1 fix landing. I did **not** compensate by
picking another radius class. Checked at the time of writing: `globals.css:51-70`
now carries the G1 note (`--radius: 0rem` is inert, `--radius-xl` deliberately
not redeclared in the plain `:root`, `--btn-radius: var(--radius-xl, 0.75rem)`),
so on a build made from the current tree `rounded-xl` resolves to 0.75rem/12px.
If G1 is reverted or lands differently, this band renders at 4px — along with
every other `rounded-xl` on the site, which is the correct coupling.

**Measured.** `border-primary-600 #0e7490` against the band ground
`neutral-50 #fafafa` = **5.13**; the new `ring-neutral-200` hairline = **1.21**
on the same ground (decorative separator between same-coloured surfaces, below
3.0 by design, matching `CalcResultCta`). Body text inside `MiniCapture` is
unchanged by this package.

**Links.** Frame classes only. No `href` touched on any of the thirteen routes
this component renders on.

---

## GAP 4 (R3 M1) — no hero CTA on the three `/resources/*` pages

**Claimed.** §0.5: "the hero carries a primary CTA to the on-page form."
`curl … | grep -o 'href="#book"' | wc -l` returns 0 on all three, so the funnel
is unmeasured, on the one surface carrying a standing zero-lead watch
(`formId="resource_block"`). The `#book` anchor already exists.

**Verified.** True. `src/app/resources/[topic]/page.tsx` renders
`<section id="book" className="scroll-mt-24 bg-slate-50 …">` at the foot, and
the hero emitted no CTA at all — only the conditional xlsx download. Pre-fix
`data-cta` on these routes was chrome only (`header_book`, `specialist_widget`).

**Judgement call, and the line I did not cross.** P3-2 §5c declined to add
`LeadCTAPanel` here because it would create an eleventh capture surface, an
owner decision. That reasoning is sound and I left it intact: **no capture
surface was added.** `ResourceGate`/`MiniCapture` is still the only form on the
route, still one per page. What I added is a link to an anchor that already
existed. No `LeadCTAPanel`, no `LeadForm`, no `FaqSection`, no kit component of
any kind, so the `globals-standard.css` focus-ring trap and the `footnote`-in-a-`<p>`
trap are both out of scope here.

**Changed.** A hero CTA in the navy hero, spelled exactly as the ported
siblings spell it:

```tsx
<a href="#book" data-cta="hero_book" data-cta-placement="hero" data-cta-goal="form" …>
  Book a free call
</a>
```

Attribute names `data-cta` / `data-cta-placement` / `data-cta-goal` are byte-identical
to `glossary/page.tsx:84-86`, `research/page.tsx:69-71` and `calculators/page.tsx`.
One name per thing: `hero_book` / `hero` / `form`. Copy is "Book a free call",
the same string those routes use — permitted under the 2026-09-12 rulings; no
fee, no turnaround, no qualification or regulator claim.

Styling: hand-rolled rather than `btnPrimary`, because this hero is
`var()`-themed (`bg-[var(--accent)]`, `focus-visible:outline-cyan-300` against
the navy ground) and `btnPrimary` hard-codes `outline-cyan-700`, which is the
wrong ring on `neutral-900`. `rounded-xl`, so it inherits the same G1 dependency
as gap 3.

**One consequence handled.** The hero would otherwise have carried two
identically-styled primary buttons (the new CTA and the xlsx download, both
`bg-[var(--accent)]`). The two are now a primary and a secondary in one
`flex flex-wrap gap-3` row: the book CTA keeps the accent fill, the download
becomes an outline button (`border border-white/70 text-white`,
`hover:bg-white hover:text-neutral-900`). The download is unchanged in
behaviour, `href`, `download` attribute, label and icon. **Flagged for your
walk**: this is a demotion of an existing affordance, inside my lease, made to
keep one primary per hero. Reverting it is one class string if you disagree.

**Measured (hand, v4 table, hero ground `neutral-900 #171717`).**

| Element | Ratio | Verdict |
|---|---|---|
| CTA label `white` on `--accent #0e7490` | **5.36** | PASS (16px bold; 4.5 threshold) |
| CTA button fill `#0e7490` vs hero ground `#171717` | 3.23 | non-text, boundary is legible |
| download label `white` on `#171717` | **17.93** | PASS |
| download border `white/70` on `#171717` | ~9.4 effective | decorative edge, well clear |
| focus ring `cyan-300 #67e8f9` on `#171717` | **12.37** | PASS, ≥3.0 |

**Links.** `#book` is one new same-page anchor on each of three routes; no
existing `href` removed.

| Route | `:3611` | `:3651` before | floor |
|---|---|---|---|
| `/resources/ir35` | 20 | 24 | 11 |
| `/resources/structure` | 20 | 24 | 11 |
| `/resources/pay-planning` | 22 | 26 | 11 |

`data-cta` count on each goes 2 → 3.

---

## What I ran

- `npx tsc --noEmit` → clean, no output.
- `npx vitest run` → **21 files, 448 tests, all pass** (same totals R4 reported).
- Em-dash sweep over the four edited files: zero. The only `fixed-fee` /
  `24-hour` hits in them are two pre-existing code comments naming the ban.
- `git status --porcelain` shows exactly my four files plus the parallel agents'
  `globals.css` / `SiteFooter.tsx` / `P1-1_TOKENS.md`. No stray files; nothing
  temporary written into the repo.

## Verification list for the serialised build

Run against the rebuilt server (`:3651R` below = whatever port the new build
serves on). Every row is a number, not an opinion.

| # | Check | Command | Expect |
|---|---|---|---|
| V1 | related reading is a list again, not cards | `curl -s <base>/calculators/ir35-status-indicator \| grep -c 'list-disc space-y-2 pl-5'` | **1** |
| V2 | no card grid survives in that block | `curl -s <base>/calculators/ir35-status-indicator \| grep -o 'Related reading and tools.\{0,200\}' \| grep -c 'grid'` | **0** |
| V3 | same on the second route | `curl -s <base>/calculators/umbrella-take-home-calculator \| grep -c 'list-disc space-y-2 pl-5'` | **1** |
| V4 | no link lost, route 1 | unique-`href` count on `/calculators/ir35-status-indicator` | **19**, ≥ floor 14 |
| V5 | no link lost, route 2 | unique-`href` count on `/calculators/umbrella-take-home-calculator` | **18**, ≥ floor 13 |
| V6 | the three sibling calculator hrefs still render | `curl -s <base>/calculators/ir35-status-indicator \| grep -o 'href="/calculators/[a-z0-9-]*"' \| sort -u \| wc -l` | **≥ 3** |
| V7 | `/calculators` listing ground flipped | `curl -s <base>/calculators \| grep -c 'bg-slate-50 py-12 sm:py-16 lg:py-20'` | **≥ 1** |
| V8 | cards still white (the edge exists) | `curl -s <base>/calculators \| grep -c 'rounded-xl bg-white p-5 ring-1 ring-neutral-200/70'` | **10** |
| V9 | grounds still oscillate at the tail | `curl -s <base>/calculators \| grep -o 'id="book"[^>]*>.\{0,90\}'` | contains `bg-white`, not `bg-slate-50` |
| V10 | `/calculators` links held | unique-`href` count on `/calculators` | **27**, ≥ floor 21 |
| V11 | `rounded-2xl` is gone estate-wide on this site | `for r in /calculators /calculators/ir35-status-indicator /resources/ir35 /resources/structure /resources/pay-planning; do curl -s <base>$r \| grep -c rounded-2xl; done` | **0** on every row |
| V12 | `ResourceGate` now matches `CalcResultCta`'s frame | `curl -s <base>/resources/ir35 \| grep -c 'rounded-xl border-l-4 border-primary-600 bg-neutral-50 p-5 ring-1 ring-neutral-200/70'` | **1** |
| V13 | and on a tool route, beside its sibling | `curl -s <base>/calculators/ir35-status-indicator \| grep -c 'rounded-xl border-l-4 border-primary-600'` | **2** |
| V14 | `rounded-xl` really is 12px (G1 dependency) | `curl -s <base>/<any css asset> \| grep -o '\--radius-xl:[^;]*'` | `0.75rem`, and **no** second declaration in a plain `:root` |
| V15 | hero CTA present, all three resources routes | `for t in ir35 structure pay-planning; do curl -s <base>/resources/$t \| grep -o 'href="#book"' \| wc -l; done` | **≥ 1** each |
| V16 | the triple, attribute names included | `curl -s <base>/resources/ir35 \| grep -o 'data-cta="hero_book" data-cta-placement="hero" data-cta-goal="form"' \| wc -l` | **1** |
| V17 | no capture surface added | `curl -s <base>/resources/ir35 \| grep -c '<form'` | **1** (unchanged) |
| V18 | `LeadCTAPanel` still absent from resources | `curl -s <base>/resources/ir35 \| grep -c 'shadow-\[0_24px_50px'` | **0** |
| V19 | the anchor still lands under the sticky header | `curl -s <base>/resources/ir35 \| grep -o 'id="book"[^>]*'` | contains `scroll-mt-24` |
| V20 | resources links held | unique-`href` on the three routes | **24 / 24 / 26**, all ≥ floor 11 |
| V21 | xlsx download intact where it exists | `curl -s <base>/resources/pay-planning \| grep -c 'download'` | **≥ 1**, same `href` as now |
| V22 | no fee or promise re-entered | `curl -s <base>/resources/ir35 <base>/calculators \| grep -icE 'fixed[- ]fee\|24[- ]hour\|same working day\|chartered'` | **0** |
| V23 | tests | `npx vitest run` | **448 pass** |
