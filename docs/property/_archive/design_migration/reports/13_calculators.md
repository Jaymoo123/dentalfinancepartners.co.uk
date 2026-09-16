# Report 13 — Calculators and tools subsystem

Written 2026-08-22. Sources: designer snapshot `8041183..eb745e1` in
`tmp/design_migration/Property_zip`, monorepo `1d68a570..HEAD`.
All paths relative to `web/` unless shown otherwise. **Verified** = I opened the file or
ran the command. **Inferred** = reasoning from what I read.

---

## Headline

**No correctness change in the designer's tool definitions.** Every one of their nine
edits under `src/lib/calculators/tools/` and `src/lib/calculators/premium/tools/` is an
em-dash removal inside a copy string. Zero computed values move. Verified by reading the
full diff (§1).

**The correctness risk runs the other way.** Their snapshot still carries a wrong
figure we have since fixed: first-time-buyer relief "a saving of up to **£6,250**"
(`Property_zip/web/src/lib/calculators/tools/first-time-buyer-stamp-duty-calculator.ts:44`).
The right number is **£5,000** and we corrected it in `f7794767`
(`Property/web/src/lib/calculators/tools/first-time-buyer-stamp-duty-calculator.ts:44`).
Take their file wholesale and the site re-publishes a wrong tax figure.

Second headline: **our `/embed` gallery renders with no header and no footer today**
(`Property/web/src/components/layout/PageShell.tsx:17`). Live bug, designer fixed it,
port the one-liner independently of everything else (§3).

---

## 1. Calculation logic vs presentation

### 1a. The designer's tool-definition edits — all presentation, all safe

Full diff read. Nine files, all string-only:

| File | Change | Verdict |
|---|---|---|
| `premium/tools/capital-gains.ts:142` | `"Yes — within 60 days"` → `"Yes, within 60 days"` | Copy. **Port.** |
| `premium/tools/capital-gains.ts:172` | intro em-dash → colon/full stop | Copy. **Port.** |
| `premium/tools/landlord-essentials.ts:190` | grid heading em-dash → comma | Copy. **Port.** |
| `premium/tools/mtd.ts:75,79,112,150-153,174` | 7 em-dashes in readiness rows, verdict text, note | Copy. **Port.** |
| `premium/tools/section-24.ts:138` | note em-dash → full stop | Copy. **Port.** |
| `premium/tools/stamp-duty.ts:81,123,163` | headline sub, intro, explainer para | Copy. **Port.** |
| `tools/first-time-buyer-stamp-duty-calculator.ts:38` | `"£300,001–£500,000"` → `"£300,001 to £500,000"` (en-dash) | Copy. **Port.** |
| `tools/lbtt-calculator.ts:23,29` | two toggle labels, em-dash → colon | Copy. **Port.** |
| `tools/ltt-calculator.ts:23` | toggle label, em-dash → colon | Copy. **Port.** |

Verified: not one edit touches a rate, band, threshold, arithmetic expression, field
`default`, or a `compute()` body. Nothing here can move a computed value.

These edits are **aligned with our house rule** (no em-dashes in user-facing copy) and
with our own tests, which ban em-dashes in the four newest tools
(`src/tests/calculator-goldens.test.ts:1090-1092, 1294-1296, 1640-1642, 2009-2011`).
We have **26 em-dashes still live** across our tool files today (verified by grep):

```
tools/lbtt-calculator.ts:2            premium/tools/capital-gains.ts:5
tools/lease-extension-premium-calculator.ts:1   premium/tools/incorporation.ts:1
tools/ltt-calculator.ts:1             premium/tools/landlord-essentials.ts:3
                                      premium/tools/mtd.ts:9
                                      premium/tools/section-24.ts:3
                                      premium/tools/stamp-duty.ts:5
```

(Some are in code comments, which are exempt. The designer's nine edits clear most of
the user-facing ones.) **Recommendation: port all nine as a standalone house-rule fix.
They are risk-free and independently shippable.**

### 1b. Our tool-definition edits — one is a fact correction

`first-time-buyer-stamp-duty-calculator.ts`, +23/-4, two commits:

- `c218d7a6` "SEO audit remediation" — meta description rewrite.
- `f7794767` "SDLT cluster batch, 7 pages: subject-match answer blocks, calculator
  reframe, **statute corrections**" — this is the one that matters. It changed
  "a saving of up to £6,250" to "a saving of up to **£5,000**", and added four
  explainer paragraphs and three FAQs.

**Verified correct.** `docs/Property/house_positions.md:27` gives the bands: 0% to
£300,000, 5% on £300,000–£500,000, fully withdrawn above £500,000. Standard SDLT at
£500,000 = 0 + (£125k × 2%) + (£250k × 5%) = £15,000. FTB at £500,000 = £200k × 5% =
£10,000. Maximum saving = **£5,000**. £6,250 is wrong at 2026/27 bands.

**Consequence for the port: `first-time-buyer-stamp-duty-calculator.ts` must be ours
plus their one en-dash swap. Never theirs.** Same shape for `lbtt-calculator.ts` and
`ltt-calculator.ts`: our edits there are meta-title/description CTR repairs
(`06195d7d`, `c218d7a6`) and theirs are label em-dashes. Both sides' edits are in
different lines of the same files, so both apply cleanly.

### 1c. Files only we touched

We added ten new generic tools and rewrote four existing ones
(`buy-to-let-cashflow` +106/-23, `capital-gains-tax-calculator` +73/-19,
`rental-income-tax-calculator` +80/-17, `rental-yield-calculator` +236/-30) across
Waves 9-12. The designer has never seen any of them. Nothing to reconcile; theirs
simply lacks them.

---

## 2. The gating model

### 2a. What we run today (verified)

Two separate mechanisms, and it is worth being precise because "we already gate" is
half true.

**The five bespoke calculators (`/calculators/stamp-duty-calculator` etc., and the
homepage): NOT gated.** The result renders immediately. Underneath it,
`<CalcResultCta>` renders an always-visible inline `MiniCapture` form
(`src/components/calculators/Section24Calculator.tsx:144`,
`MTDCheckerCalculator.tsx:136`, `IncorporationCostCalculator.tsx:179`,
`PortfolioProfitabilityCalculator.tsx:227`) — but only when the caller passes
`resultCta`, which today is **only the homepage** (`src/app/page.tsx:457-466`).
`StampDutyCalculator` has no `resultCta` path at all. So on
`/calculators/stamp-duty-calculator` the result is ungated with no inline capture.

**The premium (blog) calculators: gated, blog placement only.**
`src/components/calculators/premium/PremiumCalculator.tsx:483`
`const gated = placement === "blog" && !isConverted();`
Pre-reveal the reader sees a plain centred box, "Your figure is ready." + a
"See your result" button (`:641-651`), with `min-h-[220px]` reserving the space. The
real figure is **not** in the DOM. Pressing the button opens `ResultGateModal` the
**first time only in the session** — a module-level `let gateModalShownThisSession`
at `:59` — after which every later press reveals directly with no ask.

**Storage today:** nothing persisted. `gateModalShownThisSession` is a module variable,
so it dies on a full page load. `isConverted()` reads shared visit memory.

**What reaches the lead API:** `ResultGateModal` delegates to the shared component
(`packages/web-shared/leads/ResultGateModal.tsx:77-79`) with
`formId="calc_result_gate"` and `messagePrefix="[Result gate: <campaign>]"`, heading
from Property's topic taxonomy via `deriveTopic(pathname)`
(`Property/web/src/components/calculators/ResultGateModal.tsx:38-46`). The inline
`CalcResultCta` sends `formId="calc_result"`, prefix `[Calculator result: <campaign>]`
(`packages/web-shared/leads/CalcResultCta.tsx`, wrapped at
`Property/web/src/components/calculators/CalcResultCta.tsx:32`). Skip fires
`track("cta_click", {cta_id:"result_gate_skip", placement:"result_gate"})`
(shared modal `:32`).

**Calculator pages also carry a third ask:** `CalculatorPageResources` renders
`<GateOrForm>` (another MiniCapture) below the tool when the topic has an enabled
resource (`Property/web/src/components/resources/CalculatorPageResources.tsx:57-59`).

### 2b. What the designer proposes (verified)

Three new files: `ResultGate.tsx` (103), `HeldResult.tsx` (90),
`resultGateStorage.ts` (28). `CalcResultCta.tsx` is **deleted** (0/-36).

**Every on-site calculator gates, every time.** `ResultGate` wraps the result panel of
all five bespoke calculators (`StampDutyCalculator.tsx:152`, `Section24Calculator.tsx:103`,
plus MTD / Incorporation / Portfolio) with `enabled={variant !== "embed"}`. Premium widens
from `placement === "blog"` to `placement !== "embed"`
(`PremiumCalculator.tsx:481` in their tree), so blog **and** calculator-page premium
tools now gate too.

**What the user sees:** the reader's **real result, rendered in the DOM, behind a 10px
blur + navy scrim**, with a prompt card on top: "Your figure is ready. Confirm it with a
specialist, or skip straight to the numbers." + "See my result"
(`HeldResult.tsx:57-88`). The held content gets `inert` set imperatively
(`HeldResult.tsx:45-47`) so it is not tabbable or screen-reader reachable.

**When the gate appears:** on every press of "See my result", on every calculator, with
**no once-per-session bypass** — they explicitly deleted `gateModalShownThisSession`
and say so in the comment (`ResultGate.tsx:12-14`). Two exemptions only: converted
visitors (`isConverted()`) and embeds.

**What is stored:** `sessionStorage["ptp_calc_revealed_<campaign>"] = "1"`, keyed per
calculator (`resultGateStorage.ts:12-27`). Shared by `ResultGate` and
`PremiumCalculator` so the two cannot drift. Session-scoped, not local.

**What is sent to the lead API:** unchanged. Same `calc_result_gate` formId, same
`[Result gate: <campaign>]` prefix. **But** they also removed the topic-aware heading —
their `ResultGateModal` drops `deriveTopic`/`getTopic` and hardcodes "Confirm your figure
with a specialist" (their diff, `-14/-15/+82`). That is a **regression against our
current code**, which we since refactored to pass `topicCtaCopy` into the shared modal.
Keep ours.

**New event:** after reveal, a persistent "Confirm my figure with a specialist" button
sits under the result, firing `cta_id: "calc_confirm_figure"`, `placement:
"result_shown"` (`ResultGate.tsx:76-79`), deliberately separable from
`calc_see_result` / `placement: "result_gate"` (`:63-66`).

**Removed asks:** the inline `CalcResultCta` under premium results (their
`PremiumCalculator` diff), and `GateOrForm` from calculator pages (their
`CalculatorPageResources.tsx` header comment states this was removed **"on instruction"**,
under a one-form-per-page rule).

### 2c. What changes for conversion measurement

| | Today | Theirs |
|---|---|---|
| Bespoke calc result | always visible | held behind blur |
| Bespoke calc capture | inline form, homepage only | modal gate, every page |
| Premium gate scope | blog only | blog + calculator pages |
| Repeat gate | once per session, then free | every calculator, every time |
| Reveal persistence | none | sessionStorage, per calculator |
| `formId="calc_result"` volume | current baseline | **goes to zero** (component deleted) |
| `formId="calc_result_gate"` volume | blog only | all on-site placements |
| `GateOrForm` on calc pages | present | removed |
| New CTA events | — | `calc_see_result`, `calc_confirm_figure` |

**The series break is the problem.** Any before/after read on calculator conversion will
compare two different form populations. If the owner ships this, the honest measurement
is a fresh baseline from the deploy date, not a comparison to history.

**OWNER SIGN-OFF REQUIRED (per CONTEXT.md §7, the designer's own unvalidated-decision
note).** The specific decisions needing a yes/no, each shippable independently:

1. Gate the five bespoke calculators at all (today they are ungated).
2. Widen premium gating from blog to all non-embed placements.
3. Remove the once-per-session bypass (a reader running four calculators is asked four
   times).
4. Delete `CalcResultCta` — this kills the `calc_result` form_id and, on the homepage,
   removes the only capture under those four calculators.
5. Remove `GateOrForm` from calculator pages.

My read, as one line: (1) and (5) are the two with real upside and real downside and
should be decided on data; (3) is the most likely to annoy; the rest are cosmetic
consequences of (1).

---

## 3. The embed surface

### 3a. What a third-party embed renders today (verified)

Snippet, from `src/app/embed/page.tsx`, is a plain `<iframe>` at
`https://www.propertytaxpartners.co.uk/embed/<slug>` with a fixed height from
`registry.ts` (`embedHeight`: SDLT 620, S24 620, incorporation 740, MTD 560, portfolio
900) plus an optional resize script.

Inside the iframe: `PageShell` strips header/footer for `/embed*`
(`src/components/layout/PageShell.tsx:15-19`), the calculator renders with
`variant="embed"`, `<EmbedCta>` links out to
`https://www.propertytaxpartners.co.uk/contact?utm_source=partner-embed&utm_medium=iframe&utm_campaign=<slug>`
(`src/components/embed/EmbedCta.tsx:9`), and `EmbedAutoResize` posts
`{type: "ptp-embed-height", height}` to the parent. **That message type is explicitly
frozen** — `src/components/embed/EmbedAutoResize.tsx:5-8` says so and records the
F2 STOP check.

`/embed/*` is also on the analytics no-track list:
`packages/web-shared/analytics/react/AnalyticsProvider.tsx:79`
`noTrackPrefixes = ["/embed", "/admin"]`.

### 3b. Live embeds in the wild? — no positive evidence, but not provable from here

Verified by querying the estate Supabase (`scripts/_expansion_sql.py`, read-only):

- `web_events`: 734,921 rows, 2026-06-05 → 2026-08-22.
- Rows with `is_embed = true`: **0**. Rows on any `/embed%` path: **0**.
  **This proves nothing** — `/embed` is on `noTrackPrefixes`, so embed traffic is
  deliberately never recorded.
- Rows where `page_query ILIKE '%partner-embed%'`: **0**. This is the one downstream
  signal that *would* land in our telemetry: an embed reader clicking `EmbedCta` arrives
  on our `/contact` with that UTM. Zero in 2.5 months.

**Inference (not proof): there are probably no live embedders, or none producing a
single click-through.** A low-traffic embed with zero CTR is not excluded.

**Before shipping anything that changes embed output, do one check we cannot do from the
repo:** pull Vercel access logs for `/embed/*` and group by `Referer` host. That is the
only authoritative answer. It is a five-minute check and it converts an inference into a
fact.

### 3c. What would break for an existing embedder

| Change | Breaks an embed? |
|---|---|
| `ResultGate` on the five bespoke calculators | **No.** `enabled={variant !== "embed"}` and `ResultGate.tsx:82` returns children untouched. Verified. |
| Premium gating widened to `placement !== "embed"` | **No.** Premium tools do not run in `/embed/*` routes. |
| `EmbedAutoResize` message type | **No.** Untouched by the designer. |
| `EmbedCta` | **No.** Untouched. |
| Snippet / URL / route shape | **No.** Untouched. |
| Card radii, `Eyebrow` badge replacing the navy pill, `rounded-xl` | **Cosmetic but outward-facing.** Every live embed changes appearance the moment we deploy, on someone else's page, without their consent. |
| Rendered height | **Risk.** The `Eyebrow` swap and radius changes alter the calculator's intrinsic height. Registry `embedHeight` values are the defaults pasted into partner HTML. An embedder who pasted the iframe **without** the resize script gets a scrollbar or dead space. Nobody can fix that but us, by re-tuning `embedHeight` — and even then their pasted HTML keeps the old number. |
| Global design-system port (fonts, tokens, `globals.css`) | **The real outward risk.** It reaches inside every live iframe. |

**Treatment.** The embed is the only surface in this migration that appears on property
we do not own. Recommend: (a) run the Vercel referrer check first; (b) if any embedder
exists, freeze `embedHeight` and screenshot-diff all five `/embed/<slug>` routes before
and after the port at 320 / 375 / 768 px widths; (c) if none exists, note it and proceed,
because the exposure is theoretical.

### 3d. Free fix, ship independently of the port

`PageShell.tsx:17` tests `startsWith("/embed")`, which also catches `/embed` itself —
the **public gallery page where partners go to find the embed codes**. It renders with
no header, no footer, no nav. The designer found this and fixed it with a trailing
slash (`Property_zip/web/src/components/layout/PageShell.tsx:24-29`). One character.
We made `/embed` explicitly indexable in `src/app/embed/page.tsx:15-17`, so we are
actively pointing search traffic at a chrome-free page.

---

## 4. Golden tests

**File:** `Property/web/src/tests/calculator-goldens.test.ts`, 2,095 lines
(+1,549/-19 since the snapshot).

**Case count: 241, all passing.** Verified by running it. The "~1479" figure in commit
`6960986e` is the whole `Property/web` suite, not this file.

**Command (run just this suite):**
```
cd Property/web && npx vitest run src/tests/calculator-goldens.test.ts
```

**What it asserts, by layer:**

1. **Registry contract** (`:74-146`): `TOOLS.length === 26`, 5 bespoke + 21 generic,
   `allTools().length === 26`, `getGenericTool`/`toolPath` behaviour, and every expected
   slug present by name.
2. **Format helpers** (`:149-165`): `gbp`, `pct`.
3. **Per-tool goldens**: hand-computed expected values for each calculator at its field
   defaults and at named edge cases (AEA used, FTB above £500k, LBTT first-time buyer,
   lease-extension marriage value, etc.). These call the **underlying lib functions**
   (`computeLbtt`, `computeLtt`, `firstTimeBuyerSdlt`, `marginalSdlt`) and the tools'
   `compute()`, and assert on numeric outputs and on formatted row strings.
4. **Copy guards** on the four newest tools: em-dash/en-dash bans (`:1090`, `:1294`,
   `:1640`, `:2009`), meta-length limits, no-pricing patterns, and specific `note`
   substrings (`:1524` "30 October 2024", `:1601` "Pawson", `:1795` "£4,941" …).

**Which designer changes move a golden: none.**

- All nine of their tool edits are copy. The goldens that assert copy assert either
  numeric row values or specific substrings **none of which they touched**, or they
  assert the *absence* of em-dashes — which their edits move toward, not away from.
- Their premium-tool edits are entirely uncovered: **the goldens do not test premium
  tools at all** (only `lease-extension-premium-calculator`, which is a generic tool
  whose name happens to contain "premium"). That is a real coverage gap and worth a line
  in the plan, but it means their premium edits cannot break the suite either.
- Their `calculator-goldens.test.ts` asserts `TOOLS.length === 16`
  (`Property_zip/web/src/tests/calculator-goldens.test.ts:72`). **Do not port their test
  file.** Ours is authoritative at 26.

**What *would* move a golden if ported carelessly:** taking their
`first-time-buyer-stamp-duty-calculator.ts` wholesale would not fail the suite (nothing
asserts the £5,000 string) but *would* silently restore the £6,250 error. The suite is
not a safety net for that. It is caught only by house-positions QA.

---

## 5. CalculatorTabs, HeldResult, CalculatorLinkCards

### `CalculatorTabs.tsx` (211 lines, new)

A WAI-ARIA tab switcher showing **one bespoke calculator at a time**, replacing a
4-deep vertical stack. Five tab keys: `section24 | incorporation | mtd | portfolio |
stampduty`, each `next/dynamic` imported with a skeleton loader (`:15-40`). Default set
is the original four, no stamp duty (`:52`). Full roving-tabindex keyboard support with
both axes bound because the bar wraps to a grid below `lg` (`:89-124`). Deep links work:
`#section24` / `#mtd` etc. select the tab on load and on `hashchange` (`:126-135`).
Column count is a literal-class lookup table (`:62-68`) because Tailwind cannot scan a
template string.

**Page structure it assumes:** a container that gives it full width, and calculators
called with **no props** (`:201-205`) — so `resultCta` must be gone from the four
components that still take it. Also assumes every listed panel mounts and downloads
(their own comment on `/calculators/page.tsx` warns not to grow the list past five).
It is used on **11 pages** in their tree (homepage, `/calculators`, `/landlord-tax`,
`/section-24`, `/making-tax-digital-landlords`, `/property-tax-rates`,
`/research/landlord-tax-index`, and four `/services/*`), so porting it is not a
calculators-only decision — it lands in the middle of every one of the 8 forked pages.

### `HeldResult.tsx` (90 lines, new)

The pre-reveal state, shared by `ResultGate` and `PremiumCalculator` so they cannot
drift. Renders `children` (the **real** result) blurred 10px, scaled 1.03, `inert`, with
a scrim and a solid prompt card on top. Two grounds: `navy` (dark result panels — forces
`bg-slate-900` on the child and strips its vertical margin, `:54`) and `light` (the
premium card stack, heavier scrim). Configurable `minHeightClass`, `buttonLabel`,
`dataCta`.

**Page structure it assumes:** its child is a **single** element (`[&>*]` selectors at
`:54` apply to direct children) and that child is either a dark panel or a set of light
cards. Anything with its own light background inside a navy calculator will look wrong.

### `CalculatorLinkCards.tsx` (57 lines, new)

A 2-column grid of crawlable `next/link` cards out to calculators, used by the "Free
tools" section on service pages. Explicitly the **opposite** trade-off to
`CalculatorTabs` and the file says why: real links, all readable at once, no JS
(`:4-15`). Icons come from a slug→lucide map (`:17-23`) with a `Calculator` fallback,
so it is safe with our 26 tools — the 21 without an entry just get the generic icon.
Takes `items: {href, title, body}[]`, hand-written per page, not registry-derived.

**Note the internal tension:** they use tabs on the homepage and `/calculators`, and
cards on service pages, for the same job. Both are worth having; just be deliberate
about which page gets which.

---

## 6. Our `/calculators/stamp-duty-calculator` (+260/-25) and `/calculators/[slug]` (+57)

### `[slug]/page.tsx`, +57/-0 (verified)

Three additive blocks, all inside the existing `max-w-3xl` body column:

1. **Worked examples** (`:96-136`) — renders `tool.workedExamples`, handling both
   shapes (`title`/`heading`, `inputs`/`steps`/`result`).
2. **Related reading** (`:152-166`) — renders `tool.related` as an internal link list.

Seven tools populate these today: `bpr-apr-allowance`, `buy-to-let-cashflow`,
`buy-to-let-mortgage`, `cost-of-selling`, `lease-extension-premium`,
`rental-income-tax`, `rental-yield`.

**Does the designer's version lose it? Yes, completely.** Verified: grep for
`workedExamples` / `tool.related` / "Worked examples" / "Related reading" in
`Property_zip/web/src/app/calculators/[slug]/page.tsx` returns **nothing**. Their page
renders hero → calculator → explainer `<Prose>` → `LeadCTAPanel` → `FaqSection`. Porting
theirs as-is silently deletes worked examples and the internal-link block from seven
calculator pages — content Waves 11 and 12 shipped, and internal links that feed the
cluster.

**Their page is otherwise a genuine improvement** and mostly compatible:
- `LeadForm` in a pale mint gradient card at the foot → full-bleed navy `LeadCTAPanel`
  above the FAQ, keeping `id="get-expert-help"` (StampDutyCalculator links to it).
- Removes the `max-w-5xl` clamp that made the calculator 64px narrower than every other
  section.
- `FaqSection` is rendered **unconditionally** with `tool.faqs ?? []`. Their comment
  says every generic tool defines `faqs`. **Verified still true at 26 tools** — all 21
  generic tool files define `faqs`. Assumption holds.
- They drop the `pageTitle` prop from `CalculatorPageResources`. Harmless (it is unused
  in our implementation too).

**Port shape: take their layout, re-insert our two blocks between `<Prose>` and the
`LeadCTAPanel`.** Cheap, and it is the difference between keeping and losing Wave
content.

### `stamp-duty-calculator/page.tsx`, +260/-25 (verified)

Four commits, `f7794767` being the substantive one ("SDLT cluster batch: subject-match
answer blocks, calculator reframe, statute corrections"). What we added:

- A `const faqs = [...]` block (`:60`ff) and a **`FAQPage` JSON-LD script**
  (`:106-118`) — structured data that can win a rich result.
- Six new `<h2>` sections of body copy: "How much is stamp duty?" and five more.
  Our page now has **8 `<h2>`s**; theirs has **1** (verified by grep).

**Does the designer's version lose it? Yes, all of it.** Their `+63/-50` is a pure
re-skin of the pre-Wave page: brick hero, `sm:text-4xl` headings, `rounded-xl`,
`ResultGate` around the result. It never saw the SDLT cluster batch.

**This page is the clearest "keep ours, re-skin" case in the whole calculators
subsystem** (and matches CONTEXT.md §7's standing recommendation for the 8 forked
pages). The only thing worth lifting from theirs is the `ResultGate` wrapper and the
`Eyebrow` swap inside `StampDutyCalculator.tsx` — the component, not the page.

---

## 7. The calculator registry and the "16 calculators" assumption

**How tools are registered** (`src/lib/calculators/registry.ts`, verified in full):
`BESPOKE: Tool[]` is 5 inline objects with `slug`, `name`, `category`, `oneLiner`,
`embedHeight` (`:40-85`). `GENERIC: GenericTool[]` is 21 imported tool objects
(`:87-109`). `export const TOOLS = [...BESPOKE, ...GENERIC]` (`:111`). Helpers
(`allTools`, `genericTools`, `getGenericTool`, `toolPath`) come from
`makeRegistryHelpers(TOOLS)` in the shared package (`:114`). Adding a tool is one
import + one array entry; the gallery, sitemap, nav and `/embed` all read this.

**Our current count: 26** (5 bespoke + 21 generic). Verified by reading the file and by
`src/tests/calculator-goldens.test.ts:76,86,90`, which pins 26 / 5 / 21 and passes.

**Does their "View all 16 calculators" band break?** No. Verified: their blog bridge band
derives it — `Property_zip/web/src/app/blog/page.tsx:263` and `:284` both interpolate
`{TOOLS.length}`. On our registry it renders "26 free calculators" and "View all 26
calculators" with no edit. The neighbouring prose "Start with the five landlords use
most" also still holds (5 bespoke). Their `/calculators/page.tsx` does the same
(`{tools.length} free tools`).

**The one hardcode that does break:** their test file asserts `TOOLS.length === 16`
(`Property_zip/web/src/tests/calculator-goldens.test.ts:72`). Do not port their tests.

**Two assumptions that scale badly, both worth flagging in the plan:**

1. **`src/lib/calculators/nav.ts` (new theirs, 52 lines).** Builds the header
   Calculators dropdown from `TOOLS`, grouped by `tool.category`, ordered by a
   6-entry `CATEGORY_ORDER` (`:26-33`), with unknown categories appended in registry
   order (`:44-49`). At the snapshot that was 16 items in 6 categories. On our registry
   it is **26 items in 9 categories** — the three they never saw are `Property Finance`
   (5 tools), `Specialist Tax` (3) and `Leasehold` (1), all of which fall into the
   unranked tail. It will not break: the fallback is correct by design. It will just
   produce a very long dropdown with the newest 9 tools at the bottom. **Recommend
   extending `CATEGORY_ORDER` to all 9 as part of the port, or capping the dropdown.**
   Inferred, not measured: I did not render it.
2. **`/calculators/page.tsx`, their tier-1 tab block.** Their own comment warns that
   every listed tab panel mounts and downloads, so do not grow it past five. That is a
   constraint on us, not a break.

---

## 8. Toggle-field rendering — which pages, and how to verify

The shared `Field.tsx` fix is another agent's item (CONTEXT.md §5). What matters here is
**scope**: the designer named three pages, and there are now **six**.

Verified by grepping `type: "toggle"` across `src/lib/calculators/tools/`:

| Tool file | Page | Designer knew? |
|---|---|---|
| `capital-gains-tax-calculator.ts` | `/calculators/capital-gains-tax-calculator` | yes |
| `lbtt-calculator.ts` | `/calculators/lbtt-calculator-scotland` | yes |
| `ltt-calculator.ts` | `/calculators/ltt-calculator-wales` | yes |
| `bpr-apr-allowance-calculator.ts` | `/calculators/bpr-apr-allowance-calculator` | **no** |
| `cost-of-selling-calculator.ts` | `/calculators/cost-of-selling-calculator` | **no** |
| `rd-tax-credit-calculator.ts` | `/calculators/rd-tax-credit-calculator` | **no** |

The three they never saw all shipped in Waves 11-12 and have the same bare-checkbox
defect today, because it lives in the shared renderer, not in the tool files.

Note the bespoke `StampDutyCalculator` is **not** affected: it hand-rolls its own
checkboxes with `accent-emerald-600` and a bordered label
(`src/components/calculators/StampDutyCalculator.tsx:108-141`). That is in fact the
visual target the shared fix should match.

**How to verify visually** (local, no deploy):

```
cd Property/web && npm run dev
```
then open each of the six URLs above at 375px and 1280px and check, for every toggle:

1. The control is at least 24px tall and has its own row, not inline with the label text.
2. The checked state is emerald, not the browser's default blue.
3. Label text is not clipped and wraps rather than pushing the control off-row.
4. The hit target is at least 44×44 (tap target), and keyboard focus is visible.
5. The label reads correctly after the designer's em-dash→colon swap on LBTT/LTT
   ("Additional property (buy-to-let or second home): adds the 8% ADS").

Then confirm nothing regressed on `/calculators/stamp-duty-calculator`, which uses the
hand-rolled checkboxes and must not change, and on the other 14 sites in the estate,
since the fix is in `packages/web-shared/`.

---

## Summary of recommendations

**Ship independently of the port (small, safe, current bugs):**

1. `PageShell.tsx:17` → `startsWith("/embed/")`. The `/embed` gallery is currently
   chrome-free and we point search traffic at it.
2. The nine em-dash removals in tool copy. House-rule compliance, zero risk.

**Port with modification:**

3. `[slug]/page.tsx` — take their layout, re-insert our worked-examples and
   related-reading blocks.
4. `stamp-duty-calculator/page.tsx` — keep ours, lift only the `ResultGate` +
   `Eyebrow` changes from their `StampDutyCalculator.tsx`.
5. `ResultGateModal.tsx` — keep ours (shared delegation + topic-aware heading); take
   only their two class tweaks and the "Skip, see my numbers" copy.
6. `nav.ts` — port, but extend `CATEGORY_ORDER` to all 9 of our categories.
7. `first-time-buyer-stamp-duty-calculator.ts` / `lbtt` / `ltt` — ours plus their
   dash swaps. **Never theirs wholesale.**

**Do not port:**

8. Their `src/tests/calculator-goldens.test.ts` (asserts 16 tools).
9. Their `vendor/web-shared/` copies of anything named here.

**Owner decision before any of the gating work:**

10. The five gating decisions in §2c. This is the flagged unvalidated conversion
    decision, and it also breaks the `calc_result` / `calc_result_gate` time series.

**Do before touching embed output:**

11. Pull Vercel logs for `/embed/*` grouped by `Referer` host. Our own telemetry cannot
    answer whether embeds are live, because `/embed` is on the analytics no-track list.

**Coverage gap noted, not fixed:** the golden suite does not test any premium tool.
