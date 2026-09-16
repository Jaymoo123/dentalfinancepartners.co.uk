# Report 09 — Shared package delta and estate-wide blast radius

Agent brief: analyse `Property_zip/web/vendor/web-shared/` (31 files) against the real
`packages/web-shared/`, and size the estate-wide blast radius of anything worth porting.

Written 2026-08-22. Everything below labelled **VERIFIED** was read or executed in this
session. **INFERRED** means reasoned from evidence without direct execution.

---

## 0. Headline

1. **The Field.tsx "toggle" bug does NOT exist in our real component.** It was an artefact
   of the designer's own stub. Our `packages/web-shared/tools/components/Field.tsx:108-120`
   has had a dedicated, styled toggle branch since `0413be08` (2026-06-10) — five weeks
   before the 2026-07-16 snapshot. **VERIFIED** by reading both files and by
   `git log -L 108,120`. Nothing to port. Do not touch the shared component for this.
2. **There is one real, smaller defect in our toggle branch, found by looking:** it drops
   `field.help`. 48 toggle fields across 10 sites set `help:` text that has never rendered.
   That is a genuine estate-wide content-loss bug, unrelated to the designer's claim.
3. **Zero of the 31 vendored files are worth porting.** All 31 are STUBs. None is missing
   from ours. Discard the directory wholesale, as CONTEXT §5 already says.
4. **All 36 designer import specifiers resolve** against our real exports map. No port
   blocker from paths. Three blockers exist at the *signature* level (§4).
5. **The estate has 19 web-shared consumers, not 15.** `python scripts/check_dependency_closure.py`
   reports "dependency closure OK across 19 sites" (**VERIFIED**, run this session).

---

## 1. File-by-file classification of the 31 vendored files

Line counts: theirs / ours. `packages/web-shared/` paths are relative to repo root.

| # | Path under `vendor/web-shared/` | Theirs | Ours | Verdict |
|---|---|---:|---:|---|
| 1 | `analytics/autoCapture.ts` | 8 | 399 | STUB — returns 0 for both getters; ours is a full scroll/engagement capture installer |
| 2 | `analytics/bus.ts` | 16 | 48 | STUB — no `_resetAnalyticsBus`, `props` optional vs required |
| 3 | `analytics/consent.ts` | 19 | 90 | STUB — **different state machine**: theirs `"granted"\|"denied"\|"pending"`, ours `"undecided"\|"granted"\|"denied"`; ours also has `isTrackingAllowed`, `hasOptedOut`, `onConsentChange` |
| 4 | `analytics/ids.ts` | 30 | 140 | STUB — no legacy-migration, no `isNewSession`, no `safeGet/safeSet` |
| 5 | `analytics/react/AnalyticsProvider.tsx` | 14 | 138 | STUB — renders children only, no page-view capture |
| 6 | `analytics/react/ConsentProvider.tsx` | 37 | 71 | STUB — **different context shape**: theirs `{state,setState}`, ours `{state,accept,reject}` |
| 7 | `analytics/react/ConsentedScripts.tsx` | 9 | 26 | STUB — returns null; **accepts `clarityProjectId`, ours does not** (see §4.3) |
| 8 | `analytics/react/WebVitals.tsx` | 6 | 45 | STUB — returns null |
| 9 | `analytics/server/createTrackHandler.ts` | 6 | 284 | STUB — 204s everything; ours does bot filtering, session building, Supabase writes |
| 10 | `analytics/track.ts` | 11 | 205 | STUB — console.debug; ours has `configureAnalytics`, `scrubProps`, batching, `flush` |
| 11 | `analytics/types.ts` | 2 | 138 | STUB — two aliases vs our full event taxonomy |
| 12 | `analytics/useInViewOnce.ts` | 27 | 59 | STUB — ours takes an options arg (`useInViewOnce<T>(onInView, ...)`) |
| 13 | `analytics/visitMemory.ts` | 54 | 168 | STUB — **different signatures**, see §4.2 |
| 14 | `experiments/assign.ts` | 6 | 51 | STUB — always returns null (control) |
| 15 | `experiments/react/exposure.ts` | 12 | 50 | STUB — `(...args: unknown[])` no-ops |
| 16 | `experiments/react/useExperiment.ts` | 10 | 59 | STUB — always control |
| 17 | `experiments/registries/property.ts` | 7 | 148 | STUB — empty registry; **ours holds the live Property experiments** |
| 18 | `experiments/types.ts` | 21 | 55 | STUB — **`Variant` is `string` in theirs, `{id,weight}` in ours**; `status` union differs; no `ExperimentPrimary` object |
| 19 | `lead-nurture/lead-nurture-shared.ts` | 15 | 46 | STUB — no `computeMissingContact`, no null-tolerant args |
| 20 | `lib/frontmatter.ts` | 18 | 70 | STUB — **manifest is `{required: string[]}` vs our `FrontmatterField[]`** |
| 21 | `lib/security-headers.d.ts` | 6 | — | STUB shim (ours is a single `.ts`, 115 lines) |
| 22 | `lib/security-headers.js` | 17 | 115 | STUB — two headers vs our full CSP; CJS vs ESM |
| 23 | `package.json` | 6 | 129 | STUB — no `exports` map at all |
| 24 | `tools/components/Calculator.tsx` | 77 | 158 | STUB — inline styles, no analytics, no `verdict`/`tone` handling |
| 25 | `tools/components/Field.tsx` | 83 | 150 | STUB — see §2. (CONTEXT §5 says 78 vs 140; actual is **83 vs 150**, **VERIFIED** by `wc -l`) |
| 26 | `tools/embed/EmbedAttribution.tsx` | 7 | 68 | STUB — **props differ**: theirs `{siteName?,href?}`, ours `{siteName,siteUrl,toolSlug,leadCtaLabel?}` all required bar the last |
| 27 | `tools/embed/EmbedAutoResize.tsx` | 6 | 32 | STUB — returns null; ours takes required `{messageType}` |
| 28 | `tools/embed/EmbedSnippet.tsx` | 12 | 41 | STUB — **props differ**: theirs `{slug?,height?}` and builds the iframe itself; ours takes `{code,label?}` |
| 29 | `tools/format.ts` | 13 | 6 | STUB — `Intl.NumberFormat` currency style vs our `"£"+toLocaleString`. Same rendered output for GBP; `pct` identical |
| 30 | `tools/registry-helpers.ts` | 10 | 33 | STUB — **`toolPath` signature differs**, see §4.1 |
| 31 | `tools/types.ts` | 55 | 104 | STUB — see §4.4 |

**Tally: IDENTICAL 0 · STUB 31 · DIVERGED-worth-considering 0 · MISSING FROM OURS 0.**
**VERIFIED** — every one of the 31 was read in this session; every one has a real
counterpart in `packages/web-shared/` (`security-headers` as one `.ts` rather than
`.js` + `.d.ts`).

---

## 2. The Field.tsx claim — verdict: the bug is theirs, not ours

### 2.1 What our real component actually does

`packages/web-shared/tools/components/Field.tsx:108-120`:

```tsx
  if (field.type === "toggle") {
    return (
      <label className="flex items-start gap-3 cursor-pointer rounded-lg border-2 border-slate-200 p-3.5 hover:border-[var(--brand-primary)] transition-colors has-[:checked]:border-[var(--brand-primary)] has-[:checked]:bg-[var(--brand-primary)]/5">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--brand-primary)]"
        />
        <span className="text-sm leading-snug text-slate-800">{field.label}</span>
      </label>
    );
  }
```

Rendered, that is: a bordered card, checkbox and label **side by side inside one
`<label>`** (whole card is the hit area), a **20px** checkbox (`h-5 w-5`), 14px padding
(`p-3.5`) so the target is comfortably past the WCAG 2.5.8 24px minimum, `accent-[var(--brand-primary)]`
which on Property resolves to **#059669 emerald-600** (stated at
`Property/web/src/components/calculators/fields/Field.tsx:4-6`), plus hover and
`has-[:checked]` states the designer's version does not have.

That is the designer's stated fix, already shipped, and then some. **VERIFIED.**

### 2.2 The described symptom cannot occur in our tree

`git log -1 -L 108,120:packages/web-shared/tools/components/Field.tsx` →
**`0413be08`, Wed 10 Jun 2026, "GAP-2: S1 tool platform into web-shared/tools/"** — the
toggle branch arrived with the file, `--- /dev/null` on the left side. The only later
commit touching the file is `ba86c2ae` (rage-click string-backed number inputs), which did
not touch the toggle branch. **VERIFIED.**

### 2.3 Where the bug actually lived

The designer's stub (`vendor/web-shared/tools/components/Field.tsx`) is a from-scratch
reimplementation written *because the real file was absent from the snapshot*. Before
their session-10 fix it had no `toggle` branch at all, so a toggle fell through to the
generic block at their lines 48-77: a full-width `<label>` stacked **above** an
`<input type="number">` control — and for `type="toggle"` the browser default checkbox.
That is exactly the "full-width label over a bare 13px checkbox" they describe. Their own
session-10 comment (their lines 15-24) says so: *"They used to fall through the shared
layout below, which stacks a label ABOVE the control."*

The pre-fix stub is not recoverable for direct proof — the designer's history is one
squashed commit `eb745e1` (`git log --all -- web/vendor/web-shared/tools/components/Field.tsx`
returns that single commit, **VERIFIED**), so §2.3's reconstruction is **INFERRED** from
their surviving comment plus the shape of the post-fix file. §2.1 and §2.2 are VERIFIED
and are what the decision rests on.

**Conclusion: no port. No change to `packages/web-shared/tools/components/Field.tsx` for
this item. Close it out of the gated-items list.**

### 2.4 The real defect that IS in our component

Our toggle branch **never renders `field.help`**. Compare: the `select` branch renders it
(`Field.tsx:143`), `NumberOrCurrencyField` renders it (`Field.tsx:91`), the toggle branch
(108-120) does not. The designer's stub *does* render it (their lines 41-43).

This is silent content loss. Example, `Property/web/src/lib/calculators/tools/cost-of-selling-calculator.ts:110-115`:

```ts
    {
      id: "letOrSecond",
      label: "This was a let property or a second home, not my main home",
      type: "toggle",
      default: false,
      help: "Tick this and the tool adds a capital gains tax estimate. Leave it clear and there is no tax line, because private residence relief covers a main home.",
    },
```

The sentence that explains why a CGT line appears has never been shown to a user.
**VERIFIED** by reading both files.

Secondary, smaller: `CalcField.advanced` (`packages/web-shared/tools/types.ts:31`, "tucked
into the Advanced options section") is **not honoured by the shared `Calculator`** — it
renders every field flat at `Calculator.tsx:91-93`. Affects toggles and non-toggles alike.
Out of scope for this brief; flagging so it is not rediscovered.

### 2.5 Blast radius — every site and tool rendering a toggle through shared `Field`

Render path, **VERIFIED** end to end for Property: `/calculators/[slug]/page.tsx` →
`CalculatorClient` (`Property/web/src/components/calculators/CalculatorClient.tsx:20`
imports `@accounting-network/web-shared/tools/components/Calculator`) →
`Calculator.tsx:91-93` → `Field`. Premium calculators do **not** use it — they have their
own `ToggleField` (`Property/web/src/components/calculators/premium/PremiumCalculator.tsx:216`,
`generalist/web/src/components/calculators/premium/ui/Field.tsx`), so `/premium/` paths are
excluded from the counts below.

**17 sites import the shared `Calculator`** (**VERIFIED** by grep):
Dentists, Medical, Property, Solicitors, care, charities, construction-cis,
contractors-ir35, crypto, digital-agency, divorce-finances, ecommerce, generalist,
hospitality, pharmacies, startups-tech, wills-probate.

**13 of them ship generic tools with toggle fields — 46 tool configs, 95 toggle fields,
48 of which carry `help` text that has never rendered:**

| Site | Tools | Toggles | Toggles with unrendered `help` |
|---|---:|---:|---:|
| construction-cis | 6 | 18 | 10 |
| wills-probate | 7 | 22 | 0 |
| divorce-finances | 5 | 9 | 6 |
| generalist | 5 | 9 | 4 |
| Property | 6 | 7 | 3 |
| Solicitors | 4 | 7 | 5 |
| contractors-ir35 | 1 | 6 | 6 |
| digital-agency | 4 | 5 | 5 |
| charities | 1 | 4 | 4 |
| Dentists | 3 | 3 | 1 |
| startups-tech | 2 | 3 | 3 |
| ecommerce | 2 | 2 | 1 |
| **Total** | **46** | **95** | **48** |

Per-tool detail (path : toggles / with-help). **VERIFIED** by AST-free regex scan over all
non-`/premium/` `*.ts` under each site, excluding `node_modules`, `.next` and
`tmp/design_migration`:

- **Property** (7 toggles, 3 with help) —
  `Property/web/src/lib/calculators/tools/capital-gains-tax-calculator.ts:52` (1/0);
  `.../lbtt-calculator.ts:24,30` (2/0); `.../ltt-calculator.ts:24` (1/0);
  `.../cost-of-selling-calculator.ts:113` (1/1);
  `.../bpr-apr-allowance-calculator.ts:92` (1/1);
  `.../rd-tax-credit-calculator.ts:45` (1/1).
  Note the three routes the designer named — `capital-gains-tax-calculator`,
  `lbtt-calculator-scotland`, `ltt-calculator-wales` — are exactly the Property configs with
  **no** `help` on their toggles, which is consistent with the bug being purely visual in
  their stub and not a content-loss report.
- **construction-cis** — `cis-reverse-charge-checker.ts` (6/6), `cis-back-years-calculator.ts` (4/0),
  `cis-penalty-calculator.ts` (3/3), `cis-gps-eligibility-checker.ts` (2/0),
  `cis-invoice-splitter.ts` (2/0), `cis-deduction-calculator.ts` (1/1).
- **wills-probate** — `making-a-will-checklist.ts` (6/0), `probate-diy-vs-solicitor.ts` (5/0),
  `do-i-need-probate-checker.ts` (4/0), `probate-cost-calculator.ts` (3/0),
  `iht-threshold-calculator.ts` (2/0), `probate-timeline-estimator.ts` (1/0),
  `pensions-iht-2027-estimator.ts` (1/0).
- **divorce-finances** — `help-with-fees-checker.ts` (3/2), `consent-order-cost-calculator.ts` (2/2),
  `mediation-vs-solicitor-costs.ts` (2/1), `divorce-cost-calculator.ts` (1/1),
  `settlement-range-estimator.ts` (1/0).
- **generalist** — `mtd-itsa-readiness.ts` (3/3), `p11d-bik-calculator.ts` (3/0),
  `badr-cgt-calculator.ts` (1/0), `capital-allowances-vehicle.ts` (1/1),
  `salary-dividend-optimiser.ts` (1/0).
- **Solicitors** — `vat-disbursements-classifier.ts` (4/4), `colp-cofa-checker.ts` (1/0),
  `fa2014-salaried-member.ts` (1/1), `law-firm-sale-cgt.ts` (1/0).
- **contractors-ir35** — `managed-service-company-risk-checker.ts` (6/6).
- **digital-agency** — `employer-ni-calculator.ts` (2/2), `agency-valuation.ts` (1/1),
  `badr-cgt-calculator.ts` (1/1), `salary-dividend-optimiser.ts` (1/1).
- **charities** — `independent-examination-audit-checker.ts` (4/4).
- **Dentists** — `equipment-capital-allowance.ts` (1/1), `principal-extraction.ts` (1/0),
  `superannuation-contributions.ts` (1/0).
- **startups-tech** — `founder-dividend-vs-salary-calculator.ts` (2/2),
  `emi-vs-unapproved-calculator.ts` (1/1).
- **ecommerce** — `side-hustle-tax-checker.ts` (1/1), `seller-take-home.ts` (1/0).

`care`, `crypto`, `hospitality`, `pharmacies` and `Medical` import the shared `Calculator`
but ship no toggle fields — unaffected either way.

### 2.6 The minimal correct fix (for the `help` defect only), and its check

**Do not copy their stub.** Ours is strictly better on structure, hit area, brand token and
state styling. The whole fix is one line inside our existing branch:

```diff
   if (field.type === "toggle") {
     return (
-      <label className="flex items-start gap-3 cursor-pointer rounded-lg border-2 ...">
-        <input type="checkbox" ... />
-        <span className="text-sm leading-snug text-slate-800">{field.label}</span>
-      </label>
+      <label className="flex items-start gap-3 cursor-pointer rounded-lg border-2 ...">
+        <input type="checkbox" ... />
+        <span className="text-sm leading-snug text-slate-800">
+          {field.label}
+          {field.help && <span className="mt-1 block text-xs text-slate-500">{field.help}</span>}
+        </span>
+      </label>
     );
   }
```

Keeping the help text inside the `<label>` preserves the "whole card is the hit area"
property, which a sibling `<p>` outside the label would break. No new element outside the
existing tree, no class changes, no API change.

**Runnable check.** `packages/web-shared/vitest.config.ts:4` sets `environment: "node"` and
`include: ["**/*.test.ts"]` — there is no DOM environment and no `.tsx` test in the package
today, so any component assertion needs a server-render. Smallest thing that fails if the
branch breaks, as a new `packages/web-shared/tools/field-toggle.test.ts`:

```ts
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { Field } from "./components/Field";

it("toggle renders label and help inside one <label>", () => {
  const html = renderToStaticMarkup(
    createElement(Field, {
      field: { id: "x", label: "L", type: "toggle", default: false, help: "H" },
      value: false,
      onChange: () => {},
    })
  );
  expect(html).toMatch(/^<label[^>]*>/);          // one row, whole thing is the hit area
  expect(html).toContain('type="checkbox"');
  expect(html).toContain("H");                    // the regression this guards
  expect(html.indexOf("H")).toBeGreaterThan(html.indexOf("checkbox")); // help inside, after control
});
```

This is the *only* new test worth adding; the existing `packages/web-shared/tools/tools.test.ts:90`
already covers toggle *compute* semantics. Note it needs `react-dom` resolvable from the
package (it is a peer dep, `package.json:123-127`) — confirm before committing, and if it
does not resolve, drop the test rather than adding a dependency for it.

**Recommendation: this is a separate, owner-gated estate-wide item, not part of the
Property design port.** It touches 13 sites' rendered output. Ship it on its own, with all
13 sites redeployed, or not at all.

---

## 3. Public API surface, and every designer import path

### 3.1 Complete export surface

`packages/web-shared/package.json:9-110` declares **99 export entries**. Read in full;
grouped here:

- **Root** — `.` → `./index.ts`
- **lib (6)** — `./lib/supabase-client`, `./lib/local-business-schema`, `./lib/niche-config`,
  `./lib/security-headers`, `./lib/frontmatter`, plus `./components/ui/layout-utils`
- **analytics core (10)** — `./analytics`, `/types`, `/init`, `/consent`, `/ids`, `/track`,
  `/bus`, `/autoCapture`, `/visitMemory`, `/useInViewOnce`
- **analytics/experiments (6)** — `./analytics/experiments`, `/active`, `/assign`,
  `/registry`, `/useExperiment`, `/exposure`
- **analytics server (3)** — `./analytics/server`, `/bots`, `/createTrackHandler`
- **analytics/react (9)** — `./analytics/react`, `/ConsentProvider`, `/ConsentBanner`,
  `/ConsentedScripts`, `/GoogleAnalytics`, **`/Clarity`**, `/WebVitals`,
  `/AnalyticsProvider`, `/useFormTracking`
- **schema (1)** — `./schema`
- **content (6)** — `./content/markdown-utils`, `/TableOfContents`, `/ReadingProgress`,
  `/feed`, `/llmsFull`, `/blog-splits`
- **tools (9)** — `./tools`, `/types`, `/format`, `/registry-helpers`,
  `/components/Calculator`, `/components/Field`, `/embed/EmbedAutoResize`,
  `/embed/EmbedSnippet`, `/embed/EmbedAttribution`
- **console (14)** — `./console`, `/adminData`, `/estateData`, `/consoleAuth`, `/journey`,
  and 9 `console/components/*`
- **experiments (10)** — `./experiments/types`, `/assign`, `/registries`, `/registries/property`,
  `/registries/generalist`, `/registries/dentists`, `/registries/medical`,
  `/registries/solicitors`, `/registries/agency`, `/react/useExperiment`, `/react/exposure`
- **nurture (8)** — `./nurture`, `/tokens`, `/config`, `/admin`, `/send`, `/subscribe`,
  `/webhook`, `/cron`
- **lead-nurture (7)** — `./lead-nurture/config`, `/tokens`, `/send`, `/opt-out`, `/cron`,
  `/t0`, `/lead-nurture-shared`
- **leads (6)** — `./leads`, `/capture-steps`, `/MiniCapture`, `/ResultGateModal`,
  `/CalcResultCta`, `/MobileToolSlot`, plus `./leads/server`
- **components (2)** — `./components/ServiceTiers`, `./components/StatsBar`

**Dead entry, VERIFIED:** `"./analytics/react/Clarity": "./analytics/react/Clarity.tsx"`
(`package.json:42`) points at a file that **does not exist** — `ls packages/web-shared/analytics/react/`
shows no `Clarity.tsx` (residue of the Clarity removal). No site imports it, so it is inert
today, but it is a live footgun: the first import of that path fails at build, not at lint.
Recommend deleting the line as a one-word tidy, separate from this port.

Note the exports map has no `"./*"` wildcard and no `"./package.json"` entry, so only these
99 specifiers are importable. Nothing outside the list resolves.

### 3.2 Designer import specifiers, resolved

36 distinct specifiers across `Property_zip/web/src` plus `next.config.ts`. Counts are
occurrences. **VERIFIED** against the exports map above.

| Specifier | Uses | Verdict |
|---|---:|---|
| `.../lead-nurture/config` | 16 | RESOLVES |
| `.../lead-nurture/send` | 13 | RESOLVES |
| `.../lead-nurture/tokens` | 10 | RESOLVES |
| `.../analytics/visitMemory` | 9 | RESOLVES |
| `.../analytics/track` | 8 | RESOLVES |
| `.../lead-nurture/lead-nurture-shared` | 4 | RESOLVES |
| `.../analytics/ids` | 4 | RESOLVES |
| `.../analytics/useInViewOnce` | 3 | RESOLVES |
| `.../nurture/admin` | 2 | RESOLVES |
| `.../experiments/types` | 2 | RESOLVES |
| `.../experiments/registries/property` | 2 | RESOLVES |
| `.../analytics/react/ConsentedScripts` | 2 | RESOLVES (path); **prop mismatch, §4.3**|
| `.../analytics/react/ConsentProvider` | 2 | RESOLVES |
| `.../analytics/bus` | 2 | RESOLVES |
| `.../tools/types` | 1 | RESOLVES |
| `.../tools/registry-helpers` | 1 | RESOLVES (path); **signature mismatch, §4.1** |
| `.../tools/format` | 1 | RESOLVES |
| `.../tools/embed/EmbedSnippet` | 1 | RESOLVES |
| `.../tools/embed/EmbedAutoResize` | 1 | RESOLVES |
| `.../tools/embed/EmbedAttribution` | 1 | RESOLVES |
| `.../tools/components/Field` | 1 | RESOLVES |
| `.../tools/components/Calculator` | 1 | RESOLVES |
| `.../nurture/webhook` | 1 | RESOLVES |
| `.../lib/supabase-client` | 1 | RESOLVES |
| `.../lib/frontmatter` | 1 | RESOLVES |
| `.../lead-nurture/t0` | 1 | RESOLVES |
| `.../lead-nurture/cron` | 1 | RESOLVES |
| `.../experiments/react/useExperiment` | 1 | RESOLVES |
| `.../experiments/react/exposure` | 1 | RESOLVES |
| `.../experiments/assign` | 1 | RESOLVES |
| `.../analytics/types` | 1 | RESOLVES |
| `.../analytics/server/createTrackHandler` | 1 | RESOLVES |
| `.../analytics/react/WebVitals` | 1 | RESOLVES |
| `.../analytics/react/AnalyticsProvider` | 1 | RESOLVES |
| `.../analytics/consent` | 1 | RESOLVES |
| `.../analytics/autoCapture` | 1 | RESOLVES |
| `.../lib/security-headers` (next.config.ts:4) | 1 | RESOLVES |

**36/36 resolve. Zero path-level port blockers.** The reason is structural: the designer
did not invent new import paths, they stubbed the ones already in the snapshot.

---

## 4. Signature divergences — the actual blockers

Ours is a superset in almost every case, so most stub-vs-real gaps are harmless. These
four are not, and three of them bite on files the designer *changed*.

### 4.1 BLOCKER — `toolPath` argument type, in a NEW designer file

`packages/web-shared/tools/registry-helpers.ts:29` — ours is **`toolPath: (slug: string) => string`**.
Their stub is **`toolPath: (tool: Tool) => string`**.

`Property_zip/web/src/lib/calculators/nav.ts:40` (a file the designer **created**; no
`Property/web/src/lib/calculators/nav.ts` exists in the monorepo — **VERIFIED**) calls:

```ts
    items.push({ label: tool.name, href: toolPath(tool) });
```

Against our real helper this is a type error, and at runtime it would emit
`/calculators/[object Object]` for **every** calculator link in the designer's primary nav.
Their own test contradicts it: `Property_zip/web/src/tests/calculator-goldens.test.ts:100`
asserts `toolPath("rental-yield-calculator")`. So their tree is internally inconsistent —
`nav.ts` was written against the stub and never exercised by the test.

**Fix on port: `toolPath(tool.slug)` in `nav.ts`.** One character class of change. Every
other `toolPath` call site in the estate already passes a slug (**VERIFIED**, 41 call sites
across 11 sites, all string args). Do not change the shared helper.

### 4.2 SAFE, but check on port — `visitMemory`

| Function | Stub | Real (`analytics/visitMemory.ts`) |
|---|---|---|
| `setBookingNudge` | `(value?: unknown)` | `(token: string, expiresAtMs: number)` — :131 |
| `getBookingNudge` | `(): unknown` | `(): { token: string } \| null` — :142 |
| `isReturning/isConverted/setConverted/setBookingDone/getEntryTopic/getLastTopic` | present | present, same shape |
| — | absent | `recordEntryTopic`, `recordTopicVisit`, `bumpVisits`, `getVisitCount` |

**VERIFIED not a blocker:** the designer's call sites use the *real* two-arg form —
`Property_zip/web/src/components/forms/LeadForm.tsx:165` and
`components/forms/MiniCapture.tsx:357` both call
`setBookingNudge(result.bookingToken, Date.now() + 14 * 24 * 3600000)`. Their stub is
deliberately loose (`value?: unknown`) so the real call sites still compiled against it.
`SpecialistWidget.tsx:101` uses `getBookingNudge()` only for truthiness. All fine.

### 4.3 BLOCKER — `ConsentedScripts` accepts `clarityProjectId` in theirs, not in ours

`Property_zip/web/src/app/layout.tsx:116-119`:

```tsx
            <ConsentedScripts
              gaMeasurementId={niche.seo.google_analytics_id}
              clarityProjectId={process.env.NEXT_PUBLIC_CLARITY_ID}
            />
```

Our real `packages/web-shared/analytics/react/ConsentedScripts.tsx:16-20` accepts
**`{ gaMeasurementId?: string }`** only. Passing `clarityProjectId` is a TS excess-property
error.

Provenance, **VERIFIED**: `git show 8041183:web/src/app/layout.tsx` line 102 already had
`clarityProjectId`, and the designer's diff shows it as an unchanged context line. So this
is not a designer addition — it is **our** removal (Clarity killed; see the
`clarity_removed_pecr_decision` locked rule) that the snapshot predates.

**Fix on port: delete the `clarityProjectId` line when porting `layout.tsx`.** Do not
re-add Clarity support to the shared component — that would reopen a locked decision.

### 4.4 Type-shape differences (ours superset, but three flips to watch)

`tools/types.ts`, theirs (55) vs ours (104):

| Member | Stub | Real | Direction |
|---|---|---|---|
| `FieldType` | union **`\| string`** (open) | closed union of 4 | ours **stricter** |
| `CalcField.default` | optional | **required** (`types.ts:24`) | ours stricter |
| `CalcField.advanced`, `.suffix` | absent | present (:32, :34) | ours superset |
| `CalcResult.rows` | **required** | optional (`types.ts:47`) | ours looser |
| `CalcResult.headline.tone` | absent | present (:45) | ours superset |
| `CalcResult.verdict` | absent | present (:51) | ours superset |
| `ToolMetaBase.embedHeight` | optional | **required** (:64) | ours stricter |
| `GenericTool.metaTitle/metaDescription/intro/explainer` | optional | **required** (:88-96) | ours stricter |
| `GenericTool.related`, `.workedExamples` | absent | present (:98, :100) | ours superset |

Practical impact: **none for the designer's files** — they authored no new tool configs
(`Property_zip/web/src/lib/calculators/registry.ts:1-40` imports the same 11 generic tools
as ours plus the bespoke five, and `Property_zip/web/src/lib/calculators/types.ts` is just a
re-export of the shared types). **INFERRED** from reading their registry head and types
re-export; a full config-by-config diff belongs to the calculators-focused report, not this
one.

`experiments/types.ts` — the stub's `Variant = string` vs our `Variant = {id, weight}` and
`status: "running"|"off"` vs their open union would break anything the designer wrote
against it. **VERIFIED** they wrote nothing new against it: their
`src/lib/experiments/registry.ts` and `assign.ts` are unchanged shims from the snapshot.

`lib/frontmatter.ts` — stub manifest is `{required: string[]}`, ours is `FrontmatterField[]`
(`lib/frontmatter.ts:11-25, 64`). `Property_zip/web/src/lib/blog.ts:6` imports
`STANDARD_MANIFEST` and passes it straight through, so it binds to whichever shape is real.
Not a blocker.

`analytics/consent.ts` — stub `ConsentState` has `"pending"`, ours has `"undecided"`
(`consent.ts:17`); stub `ConsentProvider` context is `{state,setState}`, ours is
`{state,accept,reject}` (`ConsentProvider.tsx:30-32`). **Not a blocker** because the
designer consumes the provider only through the unchanged shim
`Property_zip/web/src/components/analytics/ConsentProvider.tsx:7-9`. But **any new designer
component that calls `useConsent().setState(...)` would not compile.** Grep for it during
the port; none found in the files listed in §4's scan, but the component sweep is report
02/03's job, not mine.

`analytics/bus.ts` — stub listener is `(name, props?)`, ours `(eventName, props)` with
`props` required. Callbacks are contravariant-safe in TS, and
`SpecialistWidget.tsx:236` uses `onAnalyticsEvent((name: string) => ...)`. Fine.

`tools/embed/*` — all three have genuinely different props (§1 rows 26-28), but the
designer's `src/components/embed/*` shims are unchanged snapshot files that already match
the real API. No action.

`tools/format.ts` — `gbp` differs in implementation (`Intl.NumberFormat` currency style vs
manual `"£"` prefix) but produces the same string for GBP integers; `pct` is identical.
Ours wins by default (it is the real file); no port.

---

## 5. Estate-wide risk register for any `packages/web-shared` change

Every site listed here declares `@accounting-network/web-shared` as a workspace dependency
(**VERIFIED**, `grep -l` over `*/web/package.json`), so *any* edit under `packages/web-shared/`
is an edit to all of them:

**19 consumers:** Dentists, Medical, Property, Solicitors, ashfield, care, charities,
**console**, construction-cis, contractors-ir35, crypto, digital-agency, divorce-finances,
ecommerce, generalist, hospitality, pharmacies, startups-tech, wills-probate.

CONTEXT and the brief both say 15; the measured number is **19**. `console` is the estate
analytics dashboard and `ashfield` is the parent site — both consume the package and both
are easy to forget in a redeploy sweep.

| Candidate change | Sites affected | What must be re-verified |
|---|---|---|
| **`tools/components/Field.tsx`** (the `help` fix, §2.6) | **13** rendering toggles: construction-cis, wills-probate, divorce-finances, generalist, Property, Solicitors, contractors-ir35, digital-agency, charities, Dentists, startups-tech, ecommerce (+ Medical/care/crypto/hospitality/pharmacies compile-only) | Visual check of one toggle calculator per site; layout of the toggle card with two lines of text; that `has-[:checked]` styling still applies; no CLS on the calculator panel |
| **`tools/components/Calculator.tsx`** (if the design system reskins it) | **17** importers (§2.5) | Every site's calculator visual + the `calc_*` analytics events (`Calculator.tsx:54,65,68,72`); brand token resolution per site (`--brand-primary`); embed variant at `/embed/[slug]` |
| **`tools/types.ts`** (any new required field) | all 17 tool-fleet sites | Typecheck each site; a newly required member breaks ~46+ configs at once |
| **`tools/registry-helpers.ts`** (do **not** change `toolPath`) | 11 sites, 41 call sites | If ever changed: every `toolPath(...)` call and every internal link it emits |
| **`analytics/react/ConsentedScripts.tsx`** (do **not** re-add Clarity) | 19 | PECR posture, the `clarity_removed_pecr_decision` locked rule, GA4 opt-out behaviour |
| **`analytics/*`** (track/ids/visitMemory/bus) | 19 including **console** | `console/web` dashboards read the events these emit; any prop or ID change silently corrupts `web_timeseries`/`estate_kpis`. Run `packages/web-shared/analytics/analytics.test.ts` (665 lines) and `console/console.test.ts` (613) |
| **`leads/*`, `lead-nurture/*`, `nurture/*`** | 19; live lead flow on 15 armed sites | Nothing in this migration should touch these. If it does: the full lead-engine walk, not a spot check |
| **`package.json` exports map** | 19 | `python scripts/check_dependency_closure.py` (see below) plus a build of at least one site |

**Gate before any deploy:** `python scripts/check_dependency_closure.py`. Run this session:
**`dependency closure OK across 19 sites`** — currently green. Its docstring
(`scripts/check_dependency_closure.py:4-13`) records why: the estate was silently
undeployable for nine days because `.vercelignore` became an allowlist and sites were
resolving packages via workspace hoisting from siblings. Note the script deliberately
**skips** `@accounting-network/*` specifiers (`package_of`, line ~57), so it proves
third-party dependency closure, **not** that a shared-package export path exists. A deleted
or renamed export in `packages/web-shared/package.json` would pass this check and fail the
Vercel build. Any exports-map edit needs a real `next build` of at least one consumer as
well.

**Standing recommendation:** make no change to `packages/web-shared/` as part of the
Property design port. Everything the designer produced that is worth having lives in
`Property/web/src/`. The one shared-package item worth doing (§2.6) is an independent,
owner-gated, 13-site item.

---

## 6. The 22 quarantined backend files — confirmed, nothing to port

Method: for each `*.disabled` in `Property_zip/web/src`, compare its content against the
same path at the snapshot commit `8041183` in the `Property_zip` repo, normalising CRLF.
**VERIFIED**, run this session.

Result: **21 of 22 byte-identical. 1 differs.** CONTEXT §5 confirmed.

The 21 identical: all five `api/cron/*` (`deploy-watch`, `lead-nurture-digest`,
`lead-nurture`, `lead-reconcile`, `lead-retention`); `api/leads/` `book`, `booking-viewed`,
`complete`, `confirm/[token]`, `enrich`, `enroll`, `forwarded/[token]`,
`generate-sequence`, `handoff/resend`, `ics`, `inbound/email`, `inbound/twilio`, `notify`,
`optout/[token]`, `submit`; and `app/complete/page.tsx`.

### The 2-line difference in `api/leads/events/route.ts`

It is a one-line change, which shows as `-1 / +2` lines in the diffstat sense the CONTEXT
note used. At **line 136** of the file:

```
-    console.error("[leads/events] LEAD_RESEND_WEBHOOK_SECRET not set — refusing (SEC-05)");
+    console.error("[leads/events] LEAD_RESEND_WEBHOOK_SECRET not set, refusing (SEC-05)");
```

The designer replaced an em-dash with a comma in a `console.error` string inside the SEC-05
unconfigured-secret guard. **VERIFIED** by `diff -u` against both the snapshot and the
current monorepo file (`Property/web/src/app/api/leads/events/route.ts:136`, which still
carries the em-dash).

Assessment: a mechanical application of the house no-em-dash rule to a **server log line**,
which is not user-facing copy and is explicitly exempt under `CLAUDE.md` ("Code comments,
commits and PRs are exempt"; a log string is nearer to that than to page copy). No
behaviour change, no security change, no port required. Take it or leave it — I would leave
it, so the file stays byte-identical to what shipped.

**Conclusion: the 22 quarantined files carry nothing. Discard as CONTEXT §5 directs.**

---

## 7. Decision

**Discard `vendor/web-shared/` and all 22 quarantined files. Make no change to
`packages/web-shared/` as part of this port.** Carry three one-line fixes into the
Property-side port instead: `toolPath(tool.slug)` in the designer's `nav.ts`, drop
`clarityProjectId` from their `layout.tsx`, and leave the shared `Field` alone. Raise the
toggle `help` defect (13 sites, 48 hidden help strings) with the owner as its own gated
item.
