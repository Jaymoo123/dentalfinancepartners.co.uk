# DENTISTS PORT — PHASE 4 BUILD PLAN: CALCULATORS

Site: `Dentists/web`. Reference: `Property/web`. Kit: `packages/web-shared/design/`.
Written 2026-09-11 against the working tree as it stands, not against a commit diff.
**Read-only survey. Nothing was built by this plan's author, no build was run, no git write
command was run.** Every count below was re-derived this session unless attributed.

**Predecessors, already landed. Do not redo them.**
- Phase 1 brand layer: `f1197d7a`, plus `f1df9e93 fix(dentists): phase 1 close`.
- Phase 2 chrome: `51a2c3bc feat(dentists): phase 2 chrome`.
- Scope: `PHASE456_SCOPE.md` §2. Disposition: `DISPOSITION_SLICE2.md` §E. Contract:
  `DESIGN_DELTA.md`. Plan shape: `PHASE2_BUILD_PLAN.md`.

**Decisions already taken. Not reopened here, and NOT filed as owner questions.**
No capture gate on the free calculators. `ResultGateModal` stays, with no message-length
override. End-of-page enquiry panels are approved. `StickyCTA` stays site-wide. Navy is the
`primary-*` ramp; gold is a non-text accent; **dark-ground CTAs use `btnGold`, light-ground use
`btnPrimary`**.

---

## 0. THE HEADLINE, BEFORE THE DETAIL

**Phase 4 is much smaller than `PHASE456_SCOPE.md` sized it, and much more dangerous.**

Two of its six work packages are already done. WP4.4 (20 dead calculator hrefs across 16
content files) was closed by `f1df9e93`, whose subject line literally reads "23 dead links".
WP4.3 (`/embed/` chrome bypass) was delivered by phase 2's shell swap. Neither needs a builder.

What is left is smaller in design terms than the scope doc implies, because phase 1 and phase 2
already satisfied most of the surface. But the phase's real content is **not design work at
all**. It is WP4.5, the arithmetic re-verification, and it is no longer a hypothetical risk:

> **`src/lib/tools/compute/associate-take-home.ts:32-33,86` charges every associate a Class 2
> NIC of £3.45/week × 52 = £179. House positions §8 says Class 2 liability was REMOVED from
> 6 April 2024 and instructs in terms: "do NOT tell associates to pay a weekly Class 2 charge".
> The same constants appear in three further compute modules. The same £179 is written out in
> the rendered worked-example prose of three calculator configs.**

That is a wrong tax figure, computed and stated, on live pages whose hero eyebrow reads "Free
calculator · UK 2026/27 rates". It is exactly the failure mode the brief calls worse than any
design defect, and it was found by reading two files. Nobody has read the other twenty-three.

**Therefore: WP4.5 is not the long pole of this phase. It is the phase.** The design packages
are three short files and should be priced as such.

---

## 1. REALITY CHECK, PER SURFACE

What phases 1 and 2 already did, so nobody rebuilds it. Every row verified this session.

| Item the blueprint asks for | Actual state | Phase 4 work |
|---|---|---|
| `/embed/` chrome bypass (SLICE2 §E.3) | **DONE by phase 2.** Kit `PageShell` bypasses chrome on `/embed/`. `Dentists/web/src/components/layout/PageShell.tsx` is now kit wiring only | **none.** WP4.3 is deleted |
| 20 dead hrefs to 5 non-existent calculator routes (SCOPE §7.2) | **DONE by `f1df9e93`.** `grep -rhoE 'href="/calculators/[a-z0-9-]+"' content src \| sort \| uniq -c` now returns 23 hrefs to **5 real slugs** and zero dead ones | **none.** WP4.4 is deleted |
| White-on-gold closing CTA, 2.75, 13 pages (SLICE2 §E.1 item 1) | **DONE by phase 1.** `calculators/[slug]/page.tsx:161` is now `bg-[var(--gold)] … text-[var(--navy)]` = **6.23, passes** | swap the hand-rolled string for the `btnGold` constant. Cosmetic, not a fix |
| SLICE2 §E.1's prescribed fix, "use `btnPrimary`" | **WRONG AND DANGEROUS. Do not follow it.** That button's section ground is `bg-[var(--navy)]` (`:147`). `btnPrimary` is navy-ground/white-label. Navy on navy = **1.00** — the exact defect phase 1 shipped on the hero and had to repair | use **`btnGold`** (`layout-utils.ts:55-56`) |
| `--brand-primary` aliases gold, putting gold on kit text surfaces (DELTA §1) | **DONE by phase 1.** `globals.css:67` is `--brand-primary: var(--navy)`. The kit `Calculator`'s `border-[var(--brand-primary)]` is now navy on white = 17.15 | **none** |
| T17, FAQ single-array binding | **ALREADY STRUCTURAL.** `tool.faqs` feeds `buildFaqPage` at `[slug]/page.tsx:64` and the render at `:128`. One array, both consumers | add the acceptance test only |
| T15, animated numbers must SSR their true value | **NOT APPLICABLE, verified.** `packages/web-shared/tools/components/Calculator.tsx:99` computes `tool.compute(values)` **during render** from `defaultValues`. No counter, no animation, no `ssr:false`. The true default-state figure is in the pre-hydration HTML | **none.** Do not "fix" this |
| Chrome links all 13 calculators from every route | **TRUE, and derived not hand-listed.** `src/lib/nav.ts:28-30` maps `allTools()` through `toolPath()`; `layout.tsx:98` passes it to `PageShell` | **none**, but see §7 (T14) |
| "The calculator pages have no capture surface" | **FALSE.** `CalculatorClient.tsx:31` injects `CalcResultCta` into the result slot on `variant="page"`, and that renders a `MiniCapture` with `formId="calc_result"`. There is already an in-flow capture at the moment of result | the approved end-of-page panel is a **second** capture, not a first. Say so to the owner |
| `/calculators` index has no capture surface | **TRUE.** 101 lines, hero + card grid, no form | WP4.2 adds the approved panel |
| 13 routed tools, `dynamicParams = false`, unknown slug = hard 404 | **TRUE.** `registry.ts` composes 13 configs; `[slug]/page.tsx:12` and `:54` | **none** |
| 6 premium tools with no routes | **TRUE, and the comment is worse than the brief said.** `premium/registry.ts:24` says "All five R2 tools" over a map of **six** keys, and `premium-tools.test.ts:552` asserts "all 5" and never tests `associate-incorporation-premium` | do not list them anywhere. See §6 |

**Net: three of the scope doc's six packages survive, one of them grows, and two are deleted.**

---

## 2. THE SMALLEST EDIT POINT

**One template renders all 13 tool pages. Do not propose touching 13 files.**

```
app/calculators/[slug]/page.tsx   172 lines  ->  13 pages
app/calculators/page.tsx          101 lines  ->   1 page
app/embed/[slug]/page.tsx          41 lines  ->  13 pages  (NOT TOUCHED this phase)
```

The whole design half of phase 4 is **four files**:

```
EDIT  Dentists/web/src/app/calculators/[slug]/page.tsx        (WP4.1)
EDIT  Dentists/web/src/app/calculators/page.tsx               (WP4.2)
EDIT  Dentists/web/src/components/tools/CalculatorClient.tsx  (WP4.3)
DEL   Dentists/web/src/components/tools/CalcResultCta.tsx     (WP4.3, after its consumer moves)
```

The arithmetic half is **31 files** under `src/lib/tools/**` and one under
`src/components/tools/premium/`. No page file is in that set.

---

## 3. LOCKED VALUES — COPY VERBATIM

```tsx
// The closing CTA on /calculators/[slug]. Its SECTION ground is bg-[var(--navy)].
// btnGold  = gold ground, navy label, 6.23  <- USE THIS on the navy section
// btnPrimary = navy ground, white label, 17.15 <- navy-on-navy here = 1.00. NEVER.
import { btnGold } from "@/components/ui/layout-utils";

data-cta="calculator-page-cta"        // id is LIVE. Do NOT rename it.
data-cta-placement="calculator_page"  // NEW, currently absent
data-cta-goal="health_check"          // NEW, currently absent. See the warning below.
```

**The `data-cta` id `calculator-page-cta` must not change.** Renaming it starts a new
`vw_cta_performance` series and flatlines the old one, which reads as a regression that never
happened (T22).

**Its true status, from `FUNNEL_BASELINE.md` §A: DORMANT, not live.** One recorded event, on
**2026-06-19**, and **nothing in the 84 days since**, on a route family that drew 38 sessions in
the last 19 days. The same document files this as an **open question, not a finding**: "whether
`calculator-page-cta` is retired or broken … Absence is a question. Not resolved." So: it has
almost no history to protect, but it also may not be wired at all. **WP4.1 does not answer that
question and must not assume either way** — it preserves the id and reports the observation.

**Adding `data-cta-placement` / `data-cta-goal` where none exist today is itself a T22 event,
and `FUNNEL_BASELINE.md` says so in terms.** `packages/web-shared/analytics/autoCapture.ts:106`
falls back to `nearestSection(cta)` when `data-cta-placement` is absent — which is why the live
`see_result` id reports placements like `"Free NHS contracts and pensions tool"`. Those are
section headings, not placement values. The baseline's own words: "**adding an explicit
`data-cta-placement` to those ids in the port would itself split their history**."

**WP4.1's first action is therefore to read `autoCapture.ts:106` and report what the fallback
emits for this button today.** If it emits a stable value, pin that exact string. If it emits a
section heading, say so and let the manager decide whether a one-event id is worth splitting.
Do not pick `calculator_page` because it reads well.

**Confirmed placement vocabulary on this site, all 7 values** (do not invent an eighth):
`contact, header, header_mobile, hero, home_cta, sticky, thank_you`. Goal vocabulary rendered:
`contact` and `form`.

Pre-port CTA triples for the whole site live at `docs/dentists/_port/sweep_baseline.json`
(`ctas` field, per route: `/calculators` = 2, each tool route = 3).

---

## 4. WORK PACKAGES

**Six packages, five builders** (4.6 is the manager's). Every package's acceptance tests
include, without exception:

```
cd Dentists/web && npx tsc --noEmit
python scripts/check_dependency_closure.py          # playbook T24, EVERY brief
```

**Concurrency discipline, in every brief, verbatim (field notes §8):**
stage and commit as ONE command — `git add <explicit paths> && git commit` — then verify with
`git show --name-only --format="" HEAD | grep -c "^Dentists/"`. **Never a repo-wide `git add`.**
Four ports are live in this checkout and a sibling's repo-wide add already swept this port's
files into the wrong commit once today. Never rebase, never amend.

> **WORKING TREE WARNING, verified this session.** `git status --porcelain Dentists/` is
> **NOT clean**: `Dentists/web/src/app/page.tsx` and
> `Dentists/web/src/components/layout/PageShell.tsx` are modified and uncommitted. Neither is a
> phase-4 file. **Every builder's `git add` must name its own paths explicitly**, or these two
> ride into a phase-4 commit. Do not stash them, do not revert them, do not commit them. They
> belong to someone else.

**Builders never build (T1).** The manager builds, serially, in WP4.6.

---

### WP4.1 — `/calculators/[slug]` template

**Files (owned exclusively):**
- EDIT `Dentists/web/src/app/calculators/[slug]/page.tsx` (172 lines)

**Reference, with line anchors:**
- `Property/web/src/app/calculators/[slug]/page.tsx` (216 lines). Tail order at
  `:197-213`: `<div id="get-expert-help" className="scroll-mt-24">` → `LeadCTAPanel` →
  `FaqSection`. The comment at `:184-196` explains the adjacency rule and is worth reading in
  full before moving anything.
- Kit panel: `packages/web-shared/design/marketing/LeadCTAPanel.tsx` (179 lines). Props at
  `:28-66`. Defaults at `:18-26`: `eyebrow = "Free consultation"`,
  `formTitle = "Book your free consultation"`, `ground = "slate"`. It takes `form: ReactNode`
  (`:43`) — Dentists passes its own `LeadForm`; Property's is not importable.

**Build:**

1. **The closing CTA (`:158-166`).** Replace the hand-rolled class string with `btnGold`.
   The section ground at `:147` is `bg-[var(--navy)]`; `btnGold` is gold-ground/navy-label,
   6.23. Keep `href="/free-practice-health-check"` and keep the id. Add the two `data-cta-*`
   attributes per §3, **after** reading `autoCapture.ts`.

2. **Add the approved end-of-page enquiry panel.** Kit `LeadCTAPanel`, wrapped in
   `<div id="..." className="scroll-mt-24">` so the site gains a scroll target it does not
   have today. Place it following Property's tail order.

   **Do not copy Property's `proofPoints` (`[slug]/page.tsx:201-205`).** They read
   "Fixed fees, quoted upfront" and "24-hour response". **Both are banned on this site** — the
   owner ruled on 2026-09-11 to remove all 21 turnaround promises and all 15 pricing claims.
   Copying that array imports two locked-rule breaches into 13 pages. Write dental proof points
   that make no pricing and no turnaround claim, and no two pages in the estate may read the
   same.

   **Ground check before you style the panel's button.** Read which ground the kit renders
   (`LeadCTAPanel.tsx:69` for the contained variant, `:90` for the full-bleed one) and measure
   the button against **that** ground, not against the page. Navy adjacency: the ported footer
   is navy, so a navy panel placed last would merge into it — this is why Property puts the FAQ
   after the panel.

3. **Gold audit, per-ground, with the deriving command.** In this file
   `grep -noE 'text-\[var\(--gold[a-z-]*\)\]' src/app/calculators/\[slug\]/page.tsx` returns
   **exactly 1** row: `:81`, the hero eyebrow. Its ground is `bg-[var(--navy)]` (`:77`), where
   gold measures **6.23 and PASSES**. **Leave it.** This is a sanctioned deviation
   (DELTA §3 item 2). Do not sweep it because a site-wide gold count told you to.
   The three `border-[var(--gold)]` rules at `:106`, `:131` are borders, not text; they are
   decorative and stay.

4. `font-serif` classes: 4 in this file (`:84`, `:107`, `:124`, `:133`). Delete them as this
   phase's share of the T26 transitional mapping.

5. **Do NOT adopt the kit `FaqSection` on this template, even though Property does**
   (`Property/web/src/app/calculators/[slug]/page.tsx:213`). Field notes §2 records the kit's
   `FaqSection.tsx` as a Radix collapsible **whose closed answers are not in the server HTML**,
   and which **escapes answer HTML**. Swapping the current `<dl>` (`:127-141`) for it would
   remove 13 pages' FAQ answer text from the crawlable document while the `FAQPage` JSON-LD
   still claims it — a T17 breach created by the fix, and the T8 shape exactly. Keep the `<dl>`,
   restyle it. If someone later wants the kit component here, that is a separate decision with
   a rendered-HTML check attached.

6. **T17 acceptance test, made structural.** The binding is already single-array; add a test
   that asserts it stays: for a known slug, the set of questions in the rendered `<dt>` nodes
   equals the set of `name` values in the emitted `FAQPage` JSON-LD. Not a count comparison —
   a set comparison. (T8: verify the thing that produces the behaviour, not a proxy.)

7. **Do NOT touch** the JSON-LD builders, `dynamicParams`, `generateStaticParams`,
   `generateMetadata`, or `CalculatorClient`'s props.

**Where each component you touch renders — T7, name every place:**
- `calculators/[slug]/page.tsx` → **13 routes**, and nowhere else.
- `btnGold` → currently **zero** call sites (phase 2 used it nowhere); this WP creates the
  first. `grep -rn "btnGold" Dentists/web/src` before and after.
- Kit `LeadCTAPanel` → new to this site. Check `grep -rn "LeadCTAPanel" Dentists/web/src`
  returns only your call site, so nobody assumes a second one was covered.
- `CalculatorPageResources` (`:98`) → **one call site only**, verified
  (`grep -rn "CalculatorPageResources" Dentists/web/src`). It is not a T7 exposure. Do not
  touch it.

**Acceptance tests:** `tsc`; closure check; the T17 set-equality test;
`grep -n "btnPrimary" src/app/calculators/\[slug\]/page.tsx` returns **zero rows**;
`grep -c "font-serif" src/app/calculators/\[slug\]/page.tsx` returns **0**;
`grep -n 'data-cta="calculator-page-cta"' …` still returns exactly 1 row;
zero em-dashes added (`grep -c '—' …` unchanged);
no pricing or turnaround string in the new panel copy.

**OFF LIMITS:** `app/calculators/page.tsx` (WP4.2); `components/tools/CalculatorClient.tsx`
and both `CalcResultCta.tsx` (WP4.3); everything under `src/lib/tools/**` (WP4.4);
`src/components/tools/premium/**` (WP4.5); `app/embed/**` (nobody); anything under
`packages/` (manager-direct, 19 sites); `app/page.tsx` and `components/layout/PageShell.tsx`
(uncommitted, someone else's); anything outside `Dentists/`.

---

### WP4.2 — `/calculators` index

**Files (owned exclusively):**
- EDIT `Dentists/web/src/app/calculators/page.tsx` (101 lines)

**Reference:** `Property/web/src/app/calculators/page.tsx` (208 lines).

**Build:**

1. **Three live copy defects, all in the first 70 lines, all verified this session.** The
   index says one thing and the 13 pages it links to say another:

   | Line | Says | Truth |
   |---|---|---|
   | `:13` `<title>` | "Dental Tax Calculators (UK **2025/26**)" | the 13 tool pages say **2026/27** (`[slug]:82`) |
   | `:15` description | "All at **2025/26** rates" | same |
   | `:60` eyebrow | "Free tools · UK **2025/26** rates" | same |
   | `:66` body | "**Five** dental-specific calculators" | there are **13** |

   The served `<title>` was confirmed live on the phase-4 build at `http://localhost:3146`
   before that server stopped: `Dental Tax Calculators (UK 2025/26) | Dental Finance Partners`.
   This is shipped, indexed, and wrong.

2. **T17, and it is a live breach on this page.** `:47` emits
   `numberOfItems: tools.length` = **13** into `CollectionPage` JSON-LD while `:66` tells the
   reader **Five**. The structured data and the page disagree about the size of the collection.
   Fix by deriving the rendered sentence from `tools.length` — one binding, both consumers —
   not by hand-editing "Five" to "13", which drifts again the next time a tool is added.

3. **Gold audit, per-ground, with the deriving command.**
   `grep -noE 'text-\[var\(--gold[a-z-]*\)\]' src/app/calculators/page.tsx` returns **4** rows:
   - `:59` `--gold` on `bg-[var(--navy)]` (`:55`) = **6.23, PASSES, leave it.**
   - `:82`, `:85` (hover), `:91` `--gold-strong` on `bg-white` cards (`:80`) = **3.76,
     FAILS the 4.5 text floor.** These three are the only genuine gold-as-text failures in the
     whole phase-4 file set. Re-point them to the navy ramp / `--ink-soft`.

   **Read that as the method, not just the answer**: four instances, one passes and three fail,
   and only measuring each against its own section ground separates them.

4. **Add the approved end-of-page enquiry panel**, same kit component and same copy rules as
   WP4.1 item 2. Different copy from WP4.1's — no two pages read the same.

5. `font-serif`: 2 in this file (`:62`, `:85`). Delete.

6. **Card grid** → kit card recipe.

**T7 — where this renders:** `/calculators` only, one route. The card grid is local to this
file and shared with nothing.

**Acceptance tests:** `tsc`; closure check; zero `2025/26` strings in this file; the rendered
count sentence and `numberOfItems` both derive from `tools.length` (test asserts they agree);
`grep -noE 'text-\[var\(--gold-strong\)\]' page.tsx` returns **0**; 1 remaining
`text-[var(--gold)]` and it is the on-navy eyebrow; zero em-dashes added.

**OFF LIMITS:** as WP4.1, but `app/calculators/[slug]/page.tsx` is WP4.1's.

---

### WP4.3 — `CalcResultCta` convergence

**Files (owned exclusively):**
- EDIT `Dentists/web/src/components/calculators/CalcResultCta.tsx` (28 lines)
- EDIT `Dentists/web/src/components/tools/CalculatorClient.tsx` (35 lines)
- EDIT `Dentists/web/src/components/tools/premium/PremiumCalculator.tsx` (**import line only**)
- DELETE `Dentists/web/src/components/tools/CalcResultCta.tsx` (27 lines), last

**The premise correction, carried into this brief.** `DISPOSITION_SLICE2.md` §E.4 and
`DISPOSITION_SLICE3.md` §H both say one of the pair is unimported and should be retired.
**Both are imported and both are live**, re-verified this session:

| File | Imported by | Renders on |
|---|---|---|
| `components/calculators/CalcResultCta.tsx` | `components/tools/CalculatorClient.tsx:16` | the **13 public calculator pages** (`variant="page"` only) |
| `components/tools/CalcResultCta.tsx` | `components/tools/premium/PremiumCalculator.tsx:37` | the **in-blog premium islands**, desktop only |

**Deleting either one breaks a live surface. Converge, then delete the loser.**

They have diverged in exactly four ways, all verified:

| | `calculators/` (public) | `tools/` (premium) |
|---|---|---|
| heading | "Sense-check your figure with a specialist dental accountant" | "Confirm your figure with a specialist dental accountant" |
| blurb | one wording | a different wording |
| ground token | `bg-[var(--surface)]` (#ffffff) | `bg-[var(--surface-elevated)]` (#eef1f6) |
| message prefix | `calculatorMessagePrefix(campaign)` → `` `[Calculator: ${slug}] ` `` **with a trailing space** (`src/lib/lead-message.ts:11`) | literal `` `[Calculator: ${campaign}]` `` **without one** |

**Build:** keep `components/calculators/CalcResultCta.tsx` as the survivor (it uses the shared
helper; the other hardcodes the string the helper exists to own). Add a `surface?: "base" |
"elevated"` prop defaulting to the public behaviour, point `PremiumCalculator.tsx:37` at the
survivor passing `surface="elevated"`, then delete the loser **in the same commit** (T23: fix
every consumer in the same commit, or leave the component standing).

**Two things that must NOT change:**
- `formId="calc_result"`. **Both copies already use the same `formId`**, so lead attribution
  cannot distinguish them today and convergence changes nothing there. Do not "improve" this
  by splitting the id: that is a live `form_id` vocabulary change.
- The message prefix's **trailing space**. Adopting the helper adds one space to the premium
  path's lead message. Note it in the receipt; do not strip the helper's space to match the
  literal, because 13 routes already depend on the helper's form.

**T7 — where the survivor will render after this WP, all three, named:**
1. `/calculators/[slug]` × **13 routes**, via `CalculatorClient` `variant="page"`.
2. **NOT** on `/embed/[slug]` × 13 — `CalculatorClient.tsx:31` passes `resultCta` only when
   `variant === "page"`. Verified. **Do not change that conditional.**
3. In-blog premium islands, via `PremiumCalculator.tsx`, desktop only.

There is no fourth site today: `grep -rn "CalculatorClient" Dentists/web/src --include=*.tsx`
returns exactly **two** import sites (`calculators/[slug]/page.tsx:8`,
`embed/[slug]/page.tsx:2`). **If a later phase adds a homepage calculator tab strip it becomes
a third, and anything keyed off `variant` must be re-checked then.** Record that in STATE.md.

**Acceptance tests:** `tsc`; closure check;
`grep -rn "CalcResultCta" Dentists/web/src` returns exactly **one** component file and exactly
**two** import sites; `ls Dentists/web/src/components/tools/CalcResultCta.tsx` fails;
`grep -rn 'formId="calc_result"' Dentists/web/src` count is **unchanged at 2**;
`grep -n "resultCta={variant === \"page\"" CalculatorClient.tsx` still matches.

**OFF LIMITS:** both `app/calculators/*` files (WP4.1, WP4.2); everything under
`src/lib/tools/**` (WP4.4); `PremiumBarChart.tsx` and the rest of
`src/components/tools/premium/**` except the single import line named above (WP4.5);
`src/components/forms/MiniCapture.tsx` (consent surface, T19 — not in this phase at all).

---

### WP4.4 — THE ARITHMETIC RE-VERIFICATION

> **This is the package most likely to be silently skipped, because it does not look like
> design work and produces no visible change. It is also the only thing standing between the
> "UK 2026/27 rates" eyebrow on 13 pages and a false statement. It has already produced one
> confirmed wrong tax figure on a live page before a builder was assigned. Price it separately,
> give it its own reviewer, and do not let it ride inside WP4.1.**

**Model: Opus. This is judgement work against a 514-line ground truth, not a sweep.**

**Files (owned exclusively) — the full set, with the real line counts:**

| Group | Files | Lines | Note |
|---|---|---|---|
| `src/lib/tools/configs/*.ts` | 13 | **2,074** | the 13 routed tools |
| `src/lib/tools/compute/*.ts` (non-test) | 12 | **1,598** | |
| `src/lib/tools/compute/*.test.ts` | 3 | **534** | golden tests. An ASSET, not a burden |
| `src/lib/tools/premium/configs/*.ts` | 6 | **1,273** | render in blog articles; same rates |
| `src/lib/tools/premium/*.ts` (registry, resources, types) | 3 | 237 | |
| `src/lib/tools/premium/premium-tools.test.ts` | 1 | 712 | |
| `src/lib/tools/registry.ts` | 1 | 40 | |

**Correction to `PHASE456_SCOPE.md` §1: the "4,206 lines" figure is `2,074 + 2,132`, and the
2,132 INCLUDES 534 lines of test files.** The code to be read is **3,672 lines** across 25
files for the routed fleet, plus **1,273 lines** across 6 premium configs. The 1,246 lines of
existing tests are the mechanism for proving a fix, not more surface to read.

**The unit of work is the named constant, not the line.** Every compute module declares its
figures as `UPPER_CASE` consts under a `Figures sourced:` header comment (see
`compute/associate-take-home.ts:7-19, 22-33`). That header is a claim; the job is to check the
claim.

#### 4.4.a — The figure checklist: what to check, against which house-position section

Work tool by tool. For each, check **the constant, the header comment that cites it, and any
worked-example prose in the matching config** — the same wrong number appears in all three.

| Tool / module | Figures to check | Against |
|---|---|---|
| `associate-take-home` (config 119 + compute 101) | PA 12570, basic limit 50270, higher limit 125140, rates .20/.40/.45, PA taper >100000, Class 4 6%/2% at 12570/50270, **Class 2 3.45/wk + 6725 threshold** | **§8, §8.A** |
| `principal-extraction` (91 + 169) | dividend allowance 500, dividend rates .1075/.3575/.3935, CT 19%/25%, **marginal relief between 50k and 250k — check it is MODELLED, not just bracketed**, `LTD_ADMIN_COST` 2500 (an assumption, must be labelled as one), **Class 2** | **§5** (CT + extraction), **§8** (Class 2), verification log (dividends) |
| `locum-structure` (101 + 187) | dividend + CT as above, umbrella margin and employer-NIC assumptions, **Class 2** | **§5**, **§5 employer-cost block** (employer NIC 15% above £5,000 from 6 Apr 2025), **§8** |
| `practice-sale-cgt` (151 + 191) | BADR 18% from 6 Apr 2026, lifetime limit £1,000,000, CGT standard rates, AEA | **§4** (already cites HP §4 in-code — verify the citation is honest, do not assume) |
| `practice-valuation` (121 + 75) | EBITDA multiple ranges by mix/region, goodwill 60-80% of price | **§4** opening position |
| `practice-purchase` (161 + `practice-affordability` 80) | multiple ranges, the 1.2× cover ratio (a rule of thumb — must be labelled), loan assumptions | **§4**; note `practice-affordability.ts:8,26,31` already says these are the reader's assumptions, not house figures |
| `uda-value` (116 + 65) | band-to-UDA ratios (1 / 3 / 12 / 1.2), patient charges £27.90 / £76.60 / £332.10 / £27.90 from 1 Apr 2026, **the "no national UDA value" framing**, the 96% clawback line and 4% carry-forward | **§3, §3.A** |
| `superannuation-contributions` (168 + 105) | six-tier member rates 5.2/6.5/8.3/9.8/10.7/12.5, **the tier thresholds**, employer 23.7% + 0.08% levy, NPE default 43.9%, accrual 1/54th, CPI+1.5% | **§2, §2.C** (43.9% NPE ceiling is locked there). **The tier THRESHOLDS are not in house positions — see 4.4.c** |
| `nhs-pension-aa-taper` (218 + 153) | AA £60,000, threshold income £200,000, adjusted income £260,000, taper £1 per £2, floor £10,000, MPAA £10,000, 3-year carry-forward, ×16 input valuation, Scheme Pays >£2,000 AND input >£60k, 31 July deadline | **§2.B, §2.D** |
| `equipment-capital-allowance` (166 + 131) | **WDA 18% → 14%**, the new 40% FYA, special rate 6%, AIA £1m, full expensing | **§7, §7.A** — and note §7 records that a flat 18% WDA was a ground-truth CORRECTION, so a stale 18% here is a known-shape defect |
| `dental-tax-deductions` (232 config, no compute) | **mileage 55p first 10,000 miles from 6 Apr 2026 / 25p thereafter** (45p only for 2025/26 and earlier), GDC retention allowable but restoration fees NOT, List 3 subscriptions, home-to-first-practice commuting rule | **§8** |
| `sdr-scotland` (247 config, no compute) | Scottish SDR item-of-service framing, and that Scotland does **not** use UDAs; Scottish income tax bands if any are stated | **§3** |
| `practice-owner-income-benchmark` (183 + 119) | benchmark ranges, and whether they are presented as evidence or as assumption | **§4, §5**; flag any aggregate-performance claim (a locked-rule breach, LIVE_DEFECTS #7-11) |
| premium `associate-incorporation` (268 + compute 222) | full income-tax/NIC/dividend/CT set, **Class 2** | **§5, §8**, verification log |
| premium × 5 others (1,005 lines) | every rate restated in them | as their routed twin above |

**Scale, so the receipt can be checked:** numeric-token density, derived with
`grep -oE '[0-9][0-9_.]{2,}|0\.[0-9]+' <file> | wc -l`, is **773 across the 13 configs** and
**460 across the 12 compute modules**. Most are UI step/min/max values. The **rate, threshold
and formula** figures — the ones this package owns — are the named constants and the numbers
quoted in `note`, `help` and worked-example strings. Report the count you actually checked.

#### 4.4.b — Defects already confirmed, to be fixed by this package

These were found this session by reading two files. **They are the floor, not the list.**

1. **Class 2 NIC is charged where none is due. FOUR modules.** Verified:
   `compute/associate-take-home.ts:32-33,86`; `compute/associate-incorporation.ts:46-47,174`;
   `compute/locum-structure.ts:49-50,142`; `compute/principal-extraction.ts:44`.
   All four carry `CLASS2_WEEKLY = 3.45` and `CLASS2_THRESHOLD = 6725`, and all four add
   52 × 3.45 = **£179** to the tax bill.
   **House positions §8:** "Class 2 liability removed from 6 April 2024 … State plainly that
   **Class 2 is no longer payable from 6 Apr 2024** … **do NOT tell associates to pay a weekly
   Class 2 charge**."
   **House positions §8.A (2026/27):** Class 2 is *treated as paid* at or above the small
   profits threshold of **£7,105**; the **voluntary** rate is **£3.65/week**.
   So three figures are wrong at once: the charge should not arise, the threshold is £7,105 not
   £6,725, and the rate is £3.65 not £3.45. Every header comment claiming "HMRC 2026/27" for
   these is false.

2. **The same £179 is written into rendered prose.** `configs/associate-take-home.ts:98`
   ("Class 2 NI is £179"), `configs/locum-structure.ts:84` ("plus Class 2 of £179"),
   `configs/principal-extraction.ts:74` ("Class 2 NI is £179"). Fixing the compute without
   rewriting these three worked examples leaves the wrong number on the page and the right
   number in the widget. **Both, in the same commit.**

3. **A self-declared unverified figure is live.**
   `compute/superannuation-contributions.ts:14-15`:
   `⚠ VERIFY before publishing: confirm current-year threshold uprating (2026/27)`, over a tier
   table whose own `TIER_EFFECTIVE_DATE` (`:40`) is **"1 April 2024"** — on a page whose eyebrow
   reads "UK 2026/27 rates". See 4.4.c: this one cannot be closed inside the port.

4. **Tax-year labels contradict each other across the fleet.** Derived with
   `grep -rn "2025/26\|2026/27" src/lib/tools src/app/calculators`: `practice-valuation` config
   carries **5** `2025/26` strings, `practice-purchase` **2**, `principal-extraction` **1**,
   `practice-sale-cgt` **1**, `nhs-pension-aa-taper` compute **1**, `associate-take-home`
   compute **1**, `practice-valuation` compute **2**, against the `[slug]` template's
   **2026/27** eyebrow. Each is either a stale figure (fix the figure) or a correctly
   date-tagged historic comparison (fix nothing, but say which it is).

5. **Correct, for contrast, so nobody assumes the fleet is uniformly broken:**
   `practice-sale-cgt` (BADR 18%, £1m, cites HP §4), and dividend/CT rates in
   `principal-extraction`, `locum-structure` and premium `associate-incorporation`
   (.1075/.3575/.3935, 19%/25%) are **RIGHT** against the verification log and §5. The failure
   is concentrated in NIC and in date-tagging, which is why a spot-check would have missed it.

#### 4.4.c — What this package must NOT decide on its own

- **The NHS Pension member-contribution tier thresholds are not locked in
  `house_positions.md`.** §2 locks the sections, accrual and revaluation; §2.B locks the annual
  allowance; §2.C locks the 43.9% NPE ceiling. There is **no tier table**. So this package
  **cannot** verify `TIERS_ENGLAND_WALES` against house positions, and must not invent a
  verification. **Record it as an HP-lock gap needing a primary-source read at
  `https://www.nhsbsa.nhs.uk/member-hub/your-membership/contribution-rates`, and hand it to the
  orchestrator.** Per the house-positions preamble, a factual conflict is appended as a flag,
  never unilaterally re-framed.
- **Do not change any input default, field id, step, min or max.** Those are UI, they are
  WP4.1/4.2's surface, and changing one moves the SSR'd default result on 13 pages.
- **Do not change `formId`, tracking calls or `data-cta` values.**

#### 4.4.d — The acceptance test, made unskippable

A "we read it" receipt is not a test. Three gates, all mechanical:

1. **The golden tests must be updated and must fail first.** `compute.test.ts` (400 lines),
   `associate-incorporation.test.ts` (60) and `nhs-pension-aa-taper.test.ts` (74) pin current
   output — which means they currently pin the **£179 Class 2 bug**. Fix the module, watch the
   golden test **fail**, then update the expectation with the corrected figure in the same
   commit. **A run where no golden test failed is proof the fix did not land** (T9: prove the
   guard bites).
2. **A per-figure ledger, committed as part of the receipt**, one row per checked figure:
   `file:line | constant or quoted string | value in code | house-position section | VERDICT
   (MATCHES / CORRECTED / NOT IN HP)`. The ledger's row count is the package's deliverable, and
   the manager checks it against the table in 4.4.a: **every tool in that table has at least one
   row, or the package is not done.**
3. **A grep gate that bites on the known defect class:**
   `grep -rn "CLASS2_WEEKLY\|CLASS2_THRESHOLD\|3\.45\|6725" Dentists/web/src/lib/tools` returns
   **zero rows**, and `grep -rn "Class 2 NI is £179\|Class 2 of £179" Dentists/web/src/lib/tools`
   returns **zero rows**.

Plus `tsc`, the closure check, and `npx vitest run src/lib/tools` green at the end.

**T7 — where these figures render, every place:**
- The 13 routed configs → `/calculators/[slug]` × **13** AND `/embed/[slug]` × **13**. The embed
  widgets run the same `tool.compute`. **A figure fixed for the page is fixed for the embed
  automatically, because both go through `CalculatorClient` → the kit `Calculator`** — but say
  so explicitly in the receipt rather than leaving it assumed.
- The 6 premium configs → in-blog premium islands, desktop only, for the 7 mapped topics in
  `premium/resources.ts`. **Not** on any `/calculators/*` route.
- The worked-example prose → rendered as `note` / explainer text on the tool page, and also
  fed to nothing else. Verify that claim before relying on it.

**OFF LIMITS:** `app/calculators/**` (WP4.1, WP4.2); `components/tools/CalculatorClient.tsx`
and both `CalcResultCta.tsx` (WP4.3); `components/tools/premium/**` **except nothing — this WP
owns no component files at all** (WP4.5 owns them); `app/embed/**`; anything under `packages/`;
`docs/dentists/house_positions.md` (**read-only: a builder never edits the ground truth**).

---

### WP4.5 — Premium island accessibility and chart colour

**Model: Sonnet.** Small, mechanical, but it is a live accessibility failure.

**Files (owned exclusively):**
- EDIT `Dentists/web/src/components/tools/premium/PremiumBarChart.tsx`

**Build:**

1. **T16, confirmed live.** `PremiumBarChart.tsx:90-92` puts `aria-hidden="true"` on the
   wrapper `<div>`, and `:96-99` puts `role="img"` on the `<svg>` inside it. The `aria-hidden`
   wrapper removes the whole subtree from the accessibility tree, so **every chart value is
   unreachable**, and the inner `role="img"` is dead. This is `LIVE_DEFECTS.md` #21.
   **The rule (T16): values as text nodes, decorative bars `aria-hidden`.** So: remove
   `aria-hidden` from the wrapper, keep `aria-hidden` on the decorative `<svg>`, and render the
   series values as a visually-hidden list or a `<table>` sibling so a screen reader gets the
   numbers. Do not "fix" it by moving `role="img"` up — that collapses the subtree too.

2. **Chart series colour.** The 6 premium configs set `color: "var(--gold)"` on a series
   (`associate-incorporation.ts:206`, `associate-take-home.ts:197`, `practice-purchase.ts:243`,
   `practice-sale.ts:221`, `principal-extraction.ts:164`, `uda-nhs.ts:122`). Gold on white is
   **2.75, under the 3:1 graphics floor**, so a gold bar against the chart's white ground is a
   non-text contrast failure. **Those six lines live in `src/lib/tools/premium/configs/`, which
   is WP4.4's file set.** Do **not** edit them from here. Instead: determine the chart's actual
   ground in this component, compute the ratio, and if it fails, **report the six exact lines to
   the manager for a single follow-up edit after WP4.4 lands.** Two builders must not both open
   those files.

   This is a deliberate hand-off, not a deferral: WP4.6 verifies it was made.

**T7 — where this renders, every place:** `PremiumBarChart` renders only inside
`PremiumCalculator` → `PremiumUpgrade` → `BlogPostRenderer:236`, i.e. **in blog articles only,
desktop only (`hidden sm:block`), client only (`dynamic(…, { ssr: false })`)**, for the 7 mapped
topics. **It renders on zero `/calculators/*` routes.** Grep the import path before claiming
otherwise.

**Acceptance tests:** `tsc`; closure check;
`grep -n 'aria-hidden' PremiumBarChart.tsx` shows the attribute on the `<svg>` and **not** on
the outer wrapper; the numeric values appear as text nodes in the component's output; the six
config lines are listed in the receipt with their measured ratio.

**OFF LIMITS:** everything under `src/lib/tools/**` (WP4.4), including the six config lines
this WP reports on; `app/calculators/**`; `CalculatorClient.tsx` and `CalcResultCta.tsx`;
`PremiumCalculator.tsx` (WP4.3 owns its one import line).

---

### WP4.6 — Verification and receipt (the manager's, not a builder's)

Runs **after** 4.1-4.5 have all landed. **Nobody else builds (T1).**

1. **`rm -rf .next/cache && cd Dentists/web && npm run build`** — once, serially. Check
   `BUILD_ID` mtime is newer than the newest source file (T2).

   > **The cache clear is not optional, and the reason is a sibling port's PHASE 4.**
   > Field notes §3: on Solicitors, Next's incremental cache served a stale prerender **despite
   > a newer `BUILD_ID`**, on a calculator route (`/calculators/law-firm-sale-cgt`). The stale
   > page rendered the old wording **and had lost `data-cta="see_result"`, a live id with 73
   > recorded events**, while the source was correct. **T2's mtime check is necessary and NOT
   > sufficient.** It was caught only because the sweep's total `data-cta` count fell by one —
   > no route fell below its link baseline, so the link gate stayed green.
   > Confirmation step, after the build: grep the emitted HTML for a string this phase changed,
   > e.g. `grep -o "btnGold-era string" .next/server/app/calculators/<slug>.html`. If a rendered
   > page contradicts source you have just read, **suspect the cache before the builder**.

2. `npx next start -p <port>`, then **assert the served title contains "Dental" before
   measuring anything**. Field notes §5: an instrument on this programme measured the wrong
   site **three times in one session** — `next start` failed to bind because another session
   held the port, the error went to a log nobody read, and the sweep crawled whatever was on
   that port. Twice it was Medical, once generalist.
   **A failed-looking start is not proof that nothing is listening.** Check the port, not the
   exit code: `netstat -ano | grep ":<PORT> "`, and `taskkill //PID <pid> //F` before
   restarting.

3. `node docs/_engines/instruments/sweep.mjs --site=Dentists --base=http://localhost:<port>
   --sha=<production sha> --sample=9999 --out=tmp/sweep_phase4.json`, diffed against
   `docs/dentists/_port/sweep_baseline.json`. **Gate: zero routes below baseline** (§7).
   > **Two flags that are not optional, both from field notes §5.** Without `--sha` the
   > instrument prints `WARNING: no --sha given … a baseline without them is invalid for
   > link-floor purposes` **and still writes the file**. And the default `--sample=30` measures
   > roughly a tenth of the corpus. Pass both. Pass your own `--out` or concurrent runs clobber
   > each other.
   > **Never report a link, CTA or dash number from a hand-rolled crawler.** A sibling's
   > hand-rolled crawler produced 5,786 links against the committed instrument's 5,234, and the
   > numbers went into a phase report nobody could reproduce.

3a. **Diff the sweep's TOTAL `data-cta` count as well as the per-route floor.** The Solicitors
   defect in step 1 was invisible to the route-level gate and showed up only as a total falling
   by one. Both numbers, both directions, in the receipt.
   > **Instrument gap, found this session:** `sweep.mjs` asserts only that `<title>` is
   > **non-empty** (`:134-135`). It does **not** assert site identity. It cannot tell you it is
   > measuring the wrong site. The title assert in step 2 is therefore not optional.
4. `node docs/_engines/instruments/cta_snapshot.mjs …` for the T22 triple diff.
   > **This instrument does not work on Dentists as committed.**
   > `cta_snapshot.mjs:25` hardcodes `const EXPECT_TITLE = "CIS Accountants";` and `:32-35`
   > exits 2 on mismatch. It fails safe rather than measuring the wrong site, which is correct
   > behaviour, but it means a Dentists run needs the expected title parameterised. That is an
   > edit to a **shared instrument**: apply T23 — grep every consumer and keep them all working
   > in the same commit — and treat it as manager-direct, not a builder task.
5. The T17 set-equality test from WP4.1 and the count-binding test from WP4.2, green.
6. `npx vitest run src/lib/tools` green, with the WP4.4 golden-test updates in place.
7. Re-run the gold audit per ground and record the residual count for phase-4 files with its
   deriving command, not a site-wide total (field notes §5: a builder handed an underived
   target number corrupted two correct figures).
8. Receipt records: files changed, the WP4.4 figure ledger row count, link floors before and
   after per route family, the CTA triple diff, and **the count of failed CI runs and failed
   deploys this phase produced** (owner-visible noise is reported before he finds it).

---

## 5. DEPENDENCIES AND WHAT MUST BE SERIAL

```
WP4.1  /calculators/[slug]        ─┐
WP4.2  /calculators               ─┤
WP4.3  CalcResultCta convergence  ─┼─ CONCURRENT. Verified disjoint file sets.
WP4.4  ARITHMETIC  (start FIRST)  ─┤
WP4.5  PremiumBarChart a11y       ─┘
                                    │
WP4.6  build + sweep + receipt    ──┘  SERIAL, manager only, after all five
```

**Disjointness, verified file by file:**

| WP | Owns | Touched by nobody else |
|---|---|---|
| 4.1 | `app/calculators/[slug]/page.tsx` | ✓ |
| 4.2 | `app/calculators/page.tsx` | ✓ |
| 4.3 | `components/calculators/CalcResultCta.tsx`, `components/tools/CalculatorClient.tsx`, `components/tools/CalcResultCta.tsx` (del), `PremiumCalculator.tsx` (1 import line) | ✓ |
| 4.4 | all of `src/lib/tools/**` | ✓ |
| 4.5 | `components/tools/premium/PremiumBarChart.tsx` | ✓ |

**What must be serial, and why:**

| Must be serial | Why |
|---|---|
| Every `next build` | T1, shared `.next`, four ports live in this checkout |
| WP4.6 against everything | It measures the finished state |
| WP4.5's six-config colour fix against WP4.4 | Same files. WP4.5 **reports**, the manager applies after 4.4 lands |
| WP4.3's delete against its two consumers | T23: both consumers move in the same commit as the delete |
| Any edit to `cta_snapshot.mjs` | Shared instrument, manager-direct, T23 |
| Any edit to `packages/**` | Manager-direct, up to 19 sites. **A kit gap found in phase 4 is mirrored locally, never fixed in the kit** (T12) |

**Start WP4.4 first.** It is the only package whose size is genuinely unknown, and the other
four are short.

**Cross-phase:** nothing in phase 4 blocks phase 5 or 6. `StickyCTA`, `LeadForm` and
`MiniCapture` are phase-6 surfaces and are untouched here.

---

## 6. THE PREMIUM TOOLS HAVE NO ROUTES. DO NOT LIST THEM.

Re-verified this session. `src/lib/tools/premium/registry.ts:25-32` exports `PREMIUM_TOOLS`
with **six** keys: `associate-take-home-premium`, `associate-incorporation-premium`,
`principal-extraction-premium`, `practice-purchase-premium`, `practice-sale-premium`,
`uda-nhs-premium`. There is **no `app/` route for any of them**; the only non-test consumer is
`PremiumUpgrade.tsx:28`.

**Two stale "five"s in the code, both found this session:**
- `premium/registry.ts:24` comment: "All five R2 tools" — over a map of six.
- `premium-tools.test.ts:552`: `it("hasPremiumTool returns true for all 5 registered
  toolIds")`, and its body asserts five, **never testing `associate-incorporation-premium`**.
  The registry's own header says "Append-only: never remove or rename a toolId once a blog post
  has linked to it", so the untested one is exactly the entry that most needs the guard.
  **WP4.4 fixes both** (it owns those files): correct the comment to six and extend the test to
  the sixth id.

**A two-tier `/calculators` index listing free and premium tools would emit 6 dead links.** A
sibling port nearly shipped 5 of exactly that shape. **WP4.2 does not build a two-tier index.**
If one is ever wanted, tier 2 links to the **blog articles** that host the premium islands —
URLs that exist — never to `/calculators/<premium-slug>`.

---

## 7. LINK FLOORS

**Baseline:** `docs/dentists/_port/sweep_baseline.json`, production SHA
`18b4f25f39cd0c4aa084e582d69a87c8a10710ac`, captured from `http://localhost:3141` at
2026-09-11T09:39Z. **283 URLs, 5,537 unique internal links, 808 `data-cta` attributes.**

Phase-4 routes, exact, from that file:

| Route | Baseline unique internal links | Baseline `data-cta` |
|---|---:|---:|
| `/calculators` | **24** | 2 |
| `/calculators/associate-take-home` | **11** | 3 |
| `/calculators/dental-tax-deductions` | **11** | 3 |
| `/calculators/equipment-capital-allowance` | **11** | 3 |
| `/calculators/locum-structure` | **11** | 3 |
| `/calculators/nhs-pension-aa-taper` | **11** | 3 |
| `/calculators/practice-owner-income-benchmark` | **11** | 3 |
| `/calculators/practice-purchase` | **11** | 3 |
| `/calculators/practice-sale-cgt` | **11** | 3 |
| `/calculators/practice-valuation` | **11** | 3 |
| `/calculators/principal-extraction` | **11** | 3 |
| `/calculators/sdr-scotland` | **11** | 3 |
| `/calculators/superannuation-contributions` | **11** | 3 |
| `/calculators/uda-value` | **11** | 3 |
| **13 tool routes** | **143 total, floor 11, no variance** | 39 |

**11 was the entire chrome, and the 13 tool pages carried ZERO internal links of their own.**
`PHASE2_BUILD_PLAN.md` §6 establishes that the pre-port chrome contributed exactly 11 unique
links to every route, and these 13 sitting at exactly 11 with zero variance is the proof.

**Phase 2 raised the floor and the chrome now contributes nearly all of it.** `src/lib/nav.ts`
derives all 13 calculator links from the registry into the header dropdown, plus 5 service
sub-pages and 6 dental guides into the footer columns, on **every** route.

> **I could not measure the post-phase-2 floor. The production server at
> `http://localhost:3146` answered my first probe — served `<title>` was
> `Dental Tax Calculators (UK 2025/26) | Dental Finance Partners`, so the site identity IS
> confirmed — and then stopped responding before I could crawl. I did not start a server
> (read-only brief, T1). WP4.6 must measure the real current floor with `sweep.mjs`, and the
> gate is against `sweep_baseline.json`, not against any number in this document.**

**T14, and it cuts both ways here:**
- **A link from a calculator page to another calculator adds ZERO unique links**, because all
  13 are already in the chrome dropdown on every route. Do not add a "related calculators"
  block expecting a link gain; there is none. If it is added, it is for the reader, and say so.
- **A link to `/contact`, `/services/*`, `/dental-guides/*`, `/about` or `/research` from the
  new closing panels also adds ZERO**, for the same reason.
- **What the new panels genuinely add is nothing to the link graph at all.** Their value is
  conversion, not crawl. Do not let anyone report a link-floor gain from WP4.1 or WP4.2.
- **The floor can still FALL.** Deleting `components/tools/CalcResultCta.tsx` (WP4.3) is safe
  because it contains no `<a href>`. Verify that rather than assuming it.

**Gate: zero routes below baseline.** A single route below its own baseline is a blocker even
if the site total rises (`DESIGN_DELTA.md` §5).

---

## 8. STRUCTURED DATA

**The rule (T17): whatever the page emits must match what it renders. One binding, both
consumers, and an acceptance test.**

| Route | Emits | Binding today | Verdict |
|---|---|---|---|
| `/calculators/[slug]` | `WebApplication` (`:56-61`) + conditional `FAQPage` (`:62-65`) | `tool.faqs` feeds `buildFaqPage` at `:64` **and** the `<dl>` render at `:128` — **one array** | **ALREADY STRUCTURAL.** Add the test (WP4.1 item 5) so it stays |
| `/calculators` | `CollectionPage` (`:43-48`) + `BreadcrumbList` (`:49`) | `numberOfItems: tools.length` = **13**, while the visible copy at `:66` says **"Five"** | **LIVE T17 BREACH.** WP4.2 fixes by deriving the sentence from `tools.length` |
| `/embed/[slug]` | none, `robots: { index: false }` | — | correct, leave it |

**Two further checks WP4.1 must make and report, not assume:**
- `buildWebApplication` is passed `name: tool.metaTitle` (`:57`) while the visible `<h1>` is
  `tool.name` (`:85`). Those are different strings. Decide deliberately whether the schema
  should name what the page displays, and record the decision. Do not change it silently.
- The FAQ answers are plain strings in these configs, so the kit `FaqSection` escaping question
  does not bite here — **verify that for the specific tool you test, do not assume it across
  all 13** (SLICE2 §B.4 makes the same point about guides).

**T15 — animated or counted numbers:** none on this surface. Verified:
`packages/web-shared/tools/components/Calculator.tsx:99` computes the result **during render**
from `defaultValues(tool.fields)`, with no counter, no animation and no `ssr: false`, so the
pre-hydration HTML already carries the true default figure. **No work. Do not introduce an
animated counter into a calculator result.**

---

## 9. RISKS AND AMBIGUITIES, WITH MY RECOMMENDED RESOLUTION

| # | Risk / ambiguity | Likelihood | My recommended resolution |
|---|---|---|---|
| 1 | **WP4.4 is skipped or reduced to a skim**, because it produces no visible change | **High.** It is the least glamorous package in the port | It has already produced a confirmed live wrong tax figure before a builder was assigned. Give it its own Opus builder and its own reviewer, make the figure ledger a deliverable, and make the golden-test failure the proof (§4.4.d). **A run where no golden test failed is proof the fix did not land.** |
| 2 | **A builder follows SLICE2 §E.1 and applies `btnPrimary` to the closing CTA**, putting navy on navy at 1.00 | **Medium-high.** The disposition document says it in terms | Corrected in §1 and §3 of this plan and stated twice in WP4.1. Acceptance test: `grep -n "btnPrimary" src/app/calculators/\[slug\]/page.tsx` returns zero rows. **Measure every button against its SECTION ground** |
| 3 | **A builder sweeps the on-navy gold eyebrows** because a site-wide gold count told them to, breaking a sanctioned deviation | Medium | §4 gives per-file counts with the deriving command and the ground for each instance. 4 gold-as-text rows in the phase-4 page files: **1 passes, 3 fail**. Never hand a builder a site-wide total (field notes §5) |
| 4 | **WP4.4 and WP4.5 collide on the six premium config files** | Medium, if not stated | WP4.5 **reports** the six lines and their measured ratio; the manager applies the edit after WP4.4 lands. Written into both briefs |
| 5 | **A phase-4 commit sweeps the two uncommitted files** (`app/page.tsx`, `PageShell.tsx`) that are already modified in this tree | **Medium-high.** It already happened once today on this port | Explicit-path `git add` in every brief, verified with `git show --name-only --format="" HEAD`. Never a repo-wide add, never a rebase or amend to tidy up |
| 6 | **The NHS Pension tier thresholds cannot be verified**, because house positions does not lock them, and the code itself carries an unresolved `⚠ VERIFY` marker | **Certain** | §4.4.c. **Do not invent a verification.** Record as an HP-lock gap, hand to the orchestrator for a primary-source NHSBSA read. This is a question, not a finding |
| 7 | **The closing panel imports Property's banned copy** ("Fixed fees, quoted upfront", "24-hour response") straight from the reference file | **Medium-high.** They are sitting in the reference at `:201-205` and reads as the thing to copy | Named in WP4.1 with the exact line anchor and the reason. Acceptance test greps the new copy for pricing and turnaround strings |
| 8 | **Adding `data-cta-placement`/`data-cta-goal` splits the CTA series** (T22), the very defect the attributes are meant to prevent | Medium | WP4.1's first action is to read `autoCapture.ts` and pin the value the fallback already emits. If that cannot be established, **add the attributes but report the pre/post triple diff to the manager before the commit lands**, and let the manager decide |
| 9 | **Phase 4 damages the one metric this site beats Property on** (calculator use per viewer, 20.6% vs 13.3%) | Medium | The gate decision already protects the biggest lever. Beyond that: WP4.1 and WP4.2 change chrome and copy around the widget, never the widget's fields, defaults or steps. **The two numbers to re-read after cutover, from `FUNNEL_BASELINE.md` §B: calc-used/calc-viewed = 34/165 = 20.6% (Property 13.3%), and form-start rate = 29/450 = 6.44% (Property 5.60%).** Read the port's effect off those (34 and 29 observations), **never off lead count**: the site produced **2** leads in the window, where a single lead moves leads-per-1,000 by 2.2. Any after-read pulls Bing as well as Google — Bing delivers ~15x Google's clicks on this domain (1,682 vs 109) |
| 16 | **A builder swaps the `<dl>` FAQ for the kit `FaqSection` because Property does**, removing 13 pages' answer text from the server HTML while the `FAQPage` JSON-LD still claims it | **Medium-high.** It is right there in the reference file at `:213` | Named and forbidden in WP4.1 item 5, with the field-notes §2 evidence. Acceptance test: the `<dl>` answers are present in the built HTML (`grep` the emitted `.next/server/app/calculators/<slug>.html`), not merely in the JSX |
| 17 | **The stale-cache defect repeats** — a rendered calculator page silently loses a `data-cta` while source is correct | **Medium. It happened on a sibling's phase 4, on a calculator route, to a live id with 73 events** | WP4.6 step 1 clears `.next/cache` before the build and greps the emitted HTML; step 3a diffs the total CTA count, which is the only signal that caught it last time |
| 18 | **`calculator-page-cta` may be unwired rather than merely unclicked**, and the port silently "fixes" it, so a post-cutover lift is read as a design win | Medium | `FUNNEL_BASELINE.md` lists this as an open question and explicitly warns that on never-fired surfaces "any 'lift' measured after the port is the instrumentation landing, not the design". WP4.1 reports the observation; nobody credits the design for it |
| 10 | **`cta_snapshot.mjs` cannot run on Dentists** (hardcoded `EXPECT_TITLE = "CIS Accountants"`) | **Certain** | Manager-direct, T23: parameterise the expected title and keep every consumer working in the same commit. Not a builder task |
| 11 | **`sweep.mjs` cannot detect that it is measuring the wrong site** (asserts only a non-empty title) | Medium | Assert the served title manually in WP4.6 step 2 before every measurement. Longer term this belongs in the instrument, but that is a shared-instrument change and not phase 4's to make |
| 12 | **A "related calculators" block is added and reported as a link-floor gain** | Low-medium | §7. All 13 are already in the chrome; the gain is exactly zero (T14) |
| 13 | **The premium `associate-incorporation-premium` entry stays untested** and a rename breaks a blog link | Low, but the registry's own header calls it out | WP4.4 extends `premium-tools.test.ts:552` to six ids and corrects the "five" comment at `registry.ts:24` |
| 14 | **A builder "fixes" the `/embed` variant conditional** while converging `CalcResultCta`, putting a lead form inside 13 partner iframes | Low-medium | Named in WP4.3 with the exact line (`CalculatorClient.tsx:31`) and an acceptance grep that it still matches |
| 15 | **`PHASE456_SCOPE.md` §2.2 and `DESIGN_DELTA.md:129` still disagree about capture-surface gates**, so a builder reading either could reach the wrong conclusion | Medium | Both are now settled by the decisions in this plan's preamble: **no result gate, end-of-page panels approved**. Recommend the orchestrator amend `DESIGN_DELTA.md:129` and `PHASE456_SCOPE.md` §2.2 with a one-line note pointing here, so the next reader does not re-litigate it |

---

## 10. WHAT I RE-VERIFIED, AND WHAT I FOUND FALSE

### Verified TRUE this session

| Claim | How |
|---|---|
| 13 routed tools via `calculators/[slug]` plus the `/calculators` index | `registry.ts` composes 13 configs; 13 files in `configs/`; `allTools()` is derived, nothing hand-listed |
| `dynamicParams = false`, unknown slug = hard 404 | `[slug]/page.tsx:12`, `:54 notFound()` |
| **6** premium tools with NO routes | `premium/registry.ts:25-32`, six keys; `ls src/app` has no premium route; only non-test consumer is `PremiumUpgrade.tsx:28` |
| The premium registry's own comment says "five" and is wrong | `registry.ts:24` |
| Registry / configs / compute paths | `src/lib/tools/registry.ts`, `configs/`, `compute/` — all present as stated |
| Phase 1 fixed white-on-gold to navy-on-gold | `[slug]/page.tsx:161` is `text-[var(--navy)]` on `bg-[var(--gold)]` = 6.23 |
| Those buttons sit on `bg-[var(--navy)]`, not a light ground | `[slug]/page.tsx:147` |
| The chrome links all 13 calculators from every route | `src/lib/nav.ts:28-30` over `allTools()`/`toolPath()`; `layout.tsx:98` |
| Served site identity is Dentists | `curl http://localhost:3146/calculators` returned `<title>Dental Tax Calculators (UK 2025/26) \| Dental Finance Partners</title>` — contains "Dental", asserted before anything else |
| Both `CalcResultCta.tsx` are imported and live | `CalculatorClient.tsx:16` and `PremiumCalculator.tsx:37` |
| The calculator result already carries a capture | `CalculatorClient.tsx:31` → `CalcResultCta` → `MiniCapture formId="calc_result"` |
| T15 not applicable: the kit calculator SSRs its true value | `Calculator.tsx:99` computes during render from `defaultValues`; no counter, no `ssr:false` |
| T17 already structural on `[slug]` | `tool.faqs` → `buildFaqPage` at `:64` and the `<dl>` at `:128` |
| `--brand-primary` now aliases navy, not gold | `globals.css:67` |
| `btnGold` exists and is the right recipe | `layout-utils.ts:55-56` |
| Baseline link floors | `sweep_baseline.json`: `/calculators` 24, all 13 tool routes exactly 11 |
| Dividend and corporation-tax rates are CORRECT across the fleet | `.1075/.3575/.3935`, `500`, `0.19/0.25` in `principal-extraction`, `locum-structure`, premium `associate-incorporation` — match the verification log and §5 |
| BADR is CORRECT | `compute/practice-sale-cgt.ts:91-97`: 18% from 6 Apr 2026, £1,000,000 lifetime — matches §4 |
| Calculator-family funnel, 19 days post bot-gate | `FUNNEL_BASELINE.md`: **38 sessions, 55 page views, 19 calc uses, 4 form starts, 0 completions**. Site-wide `calc_view` = 165 sessions; calc-used/calc-viewed = **20.6%** against Property's 13.3% |
| `calculator-page-cta` carries no placement and no goal | `[slug]/page.tsx:162`, and `FUNNEL_BASELINE.md` §A confirms both absent |
| `autoCapture.ts:106` falls back to `nearestSection()` when placement is absent | Field notes §1 and `FUNNEL_BASELINE.md`; the live `see_result` id reports section headings as placements because of it |

### Found FALSE, or materially changed since the scope doc

1. **WP4.4 of `PHASE456_SCOPE.md` ("5 dead calculator routes, 20 hrefs, 16 content files, hard
   404s") is NO LONGER TRUE.** Fixed by `f1df9e93 fix(dentists): phase 1 close — punctuation
   repair, capture floor, **23 dead links**, restored floor`.
   `grep -rhoE 'href="/calculators/[a-z0-9-]+"' content src | sort | uniq -c` now returns
   9 `practice-valuation`, 5 `uda-value`, 4 `associate-take-home`, 3 `principal-extraction`,
   2 `locum-structure` — **23 hrefs, five real slugs, zero dead.** The package is deleted.

2. **WP4.3 of `PHASE456_SCOPE.md` (`/embed` chrome bypass) is NO LONGER NEEDED.** Delivered by
   `51a2c3bc` phase 2. The package is deleted.

3. **`DISPOSITION_SLICE2.md` §E.1 item 1's prescribed fix — "Fix = use `btnPrimary`" — is
   WRONG, and following it would repeat the phase-1 invisible-CTA incident.** That button's
   section ground is navy; `btnPrimary` is a navy ground with a white label; navy on navy is
   **1.00**. The correct recipe is `btnGold`. The same document's premise that the button is
   currently a white-on-gold 2.78 failure is also out of date: phase 1 already fixed it to 6.23.

4. **The "4,206 lines" sizing for the arithmetic package double-counts tests.** It is
   `2,074 (13 configs) + 2,132 (compute dir)`, and the compute figure includes **534 lines of
   test files**. The code to read is **3,672 lines across 25 files**, plus **1,273 lines across
   6 premium configs** the scope doc did not count at all. The tests are an asset.

5. **`PHASE456_SCOPE.md` §7.1 attributes 13 gold-as-text lines to phase 4 and treats them as
   defects. Measured against their own section grounds, most PASS.** In the phase-4 page files
   there are 4 instances: `[slug]:81` and `page.tsx:59` are gold on **navy** = 6.23 and are
   sanctioned; only `page.tsx:82`, `:85`, `:91` (`--gold-strong` on white cards = 3.76) fail.
   `CalculatorPageResources.tsx:44` is gold on a `bg-[var(--navy)]` chip = 6.23 and passes.
   The 6 premium-config instances are **chart series fills, not text**, and belong to the 3:1
   graphics floor, not the 4.5:1 text floor.

6. **"The calculator pages have no capture surface" is FALSE.** `CalcResultCta` → `MiniCapture`
   already captures at the moment of result on all 13. The approved end-of-page panel is a
   second capture surface, and the owner should be told that rather than told it is the first.

7. **`/calculators` carries four live copy defects nobody has recorded**, including a T17
   structured-data breach: the page's `CollectionPage` says `numberOfItems: 13` while the
   visible copy says "Five", and three separate strings say "2025/26" where the 13 pages they
   link to say "2026/27". The wrong year is in the `<title>`, which I confirmed served.

8. **The fleet contains a confirmed wrong tax figure.** Class 2 NIC of £179/year is computed in
   **four** compute modules and stated in the worked-example prose of **three** configs, against
   house positions §8 which says Class 2 was abolished from 6 Apr 2024 and instructs writers not
   to state it. §8.A also puts the small-profits threshold at £7,105 (code: £6,725) and the
   voluntary rate at £3.65 (code: £3.45). This alone justifies WP4.4.

9. **`premium-tools.test.ts:552` asserts "all 5 registered toolIds" against a registry of six**,
   and never tests `associate-incorporation-premium`.

10. **`docs/_engines/instruments/cta_snapshot.mjs` cannot run against Dentists**: `:25`
    hardcodes `EXPECT_TITLE = "CIS Accountants"` and `:32-35` exits 2. And **`sweep.mjs` cannot
    detect a wrong-site measurement at all** — `:134-135` asserts only that `<title>` is
    non-empty.

11. **`git status --porcelain Dentists/` is NOT clean**, contrary to the state recorded in
    `PHASE456_SCOPE.md`. `app/page.tsx` and `components/layout/PageShell.tsx` are modified and
    uncommitted.

12. **`calculator-page-cta` is NOT a live id.** `PHASE456_SCOPE.md` §2.5 and the brief treat it
    as an instrumented CTA needing its attributes completed. `FUNNEL_BASELINE.md` §A classifies
    it **DORMANT**: one event on 2026-06-19, none in the 84 days since, and lists "is it retired
    or broken?" as unresolved. The attribute completion is still right; the framing that it is a
    live series to protect is not.

13. **Property's `FaqSection` is not safely copyable to this template.** The kit component is a
    Radix collapsible whose closed answers are absent from the server HTML and which escapes
    answer HTML (field notes §2). The reference file uses it at `:213`; Dentists must not.

---

## 11. OWNER QUESTIONS

**Everything already decided is excluded**: the result gate (no), `ResultGateModal` and its
message floor (stays, no override), end-of-page enquiry panels (approved), `StickyCTA`
(site-wide), the colour rules, pricing and turnaround removal, and deploy (never autonomous).

Two questions, both short, both bundled into one message.

1. **Our calculators are telling dentists to pay a National Insurance charge that was abolished
   in April 2024.** Four of our calculators add about £179 a year of "Class 2 National
   Insurance" to the answer, and three of them spell that £179 out in the worked example on the
   page. It has not been payable since April 2024. It is on the site now.
   **No decision needed, and this is not a question about the redesign** — we are fixing it as
   part of this work either way. You are being told because it is a wrong tax figure on a live
   page, it has been there a while, and you should hear it from us. We are also reading every
   rate in all nineteen calculators against our locked position document in the same pass,
   which is how this one surfaced.

2. **One NHS Pension figure we cannot check ourselves.** Our NHS pension contribution
   calculator uses contribution bands dated April 2024, on a page that says it uses 2026/27
   rates, and there is a note in our own code saying "verify before publishing" that nobody ever
   closed. Our internal position document does not cover these particular bands, so there is
   nothing to check them against. **Recommendation: we take ten minutes to read the current
   bands off the NHS Business Services Authority's own page, add them to our locked position
   document so every future page uses the same numbers, and correct the calculator.** Say yes
   and we will do it in this pass; say no and we will label the calculator with the April 2024
   date so at least it is honest about what it is using.

---

## 12. WHAT THIS PLAN COULD NOT VERIFY, AND WHY

| Item | Why not |
|---|---|
| **Current rendered link floors and CTA triples for the 14 phase-4 routes** | The production build at `http://localhost:3146` answered my first probe (site identity confirmed: served title contained "Dental") and then stopped responding. I did not start a server: read-only brief, and T1 forbids a builder-side build. All link-floor numbers in §7 are the **pre-port baseline** from `sweep_baseline.json`. WP4.6 must measure the real current floor |
| **Whether the post-phase-2 floor is the ~37 that `PHASE2_BUILD_PLAN.md` §6 predicted** | Same reason. The brief quotes a site total of 9,786 unique links after phase 2, which over 283 URLs implies roughly +15 per route rather than the predicted +26. I could not reconcile the two without a crawl, and I am not going to assert either number |
| **What `autoCapture.ts` currently emits as the fallback placement for `calculator-page-cta`** | It requires reading the shipped client bundle, which needs a build. Made WP4.1's first action instead, with the decision escalated to the manager if it cannot be established |
| **Whether every one of the ~1,233 numeric tokens in the tool fleet is correct** | That is WP4.4's entire job and it is judgement work against a 514-line ground truth. I verified the sizing, built the per-tool figure checklist in §4.4.a, and read enough to prove the package is necessary (§4.4.b). I did not do the package |
| **The NHS Pension member-contribution tier thresholds** | Not lockable from this repo: `house_positions.md` contains no tier table, and the code carries its own unresolved `⚠ VERIFY`. Needs a primary-source read (§4.4.c, owner question 2) |
| **Rendered-DOM contrast figures** | No server. `DESIGN_DELTA.md` records that `browser_check.mjs` cannot resolve this site's `var()` colours (T25), so every ratio here is inherited from the delta's hand-computed table, which self-tested against slate-500/white = 4.76 and slate-400/white = 2.56 |
| **Whether the kit `LeadCTAPanel`'s non-contained ground clashes with the navy footer** | Needs it rendered. Made a required check inside WP4.1 item 2 rather than guessed |
| **Whether `deploy-watch` covers `site_key='dentists'`** | Still unverified, as `FUNNEL_BASELINE.md` flagged. A pre-deploy check, not a phase-4 item |
| **Whether `calculator-page-cta` is wired at all** | Needs a click test on a rendered page. `FUNNEL_BASELINE.md` leaves it open after 84 days of silence and the same document warns that absence is a question, not a finding |
| **The `form_id` vocabulary, including whether `calc_result` is in `MINIFORM_FORM_IDS`** | `FUNNEL_BASELINE.md` records it as not pulled. It matters to WP4.3 only in the negative — the instruction there is to change no `formId` — so the port does not need it, but a pre-deploy check does |
| **Whether the 38-session calculator-family figure is strictly comparable to the sibling ports'** | It is not, and the subagent flagged it: Dentists' funnel baseline filters `is_bot=false` on `web_events` only, without the `web_sessions` join, so it uses the loose definition. Its internal ratios (20.6% vs 13.3%) are computed the same way on both sides and are sound; the absolute session counts are not comparable to Trade's strict numbers |
