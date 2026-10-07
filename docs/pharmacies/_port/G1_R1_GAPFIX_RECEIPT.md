# G1 — gap-fix after review R1 (pharmacies design port)

Agent: G1 (Opus), single agent, **no subagents launched**. No build, no dev
server started or stopped (the stale build on :3111 was left alone), **no git
command of any kind**.

**Files edited, both and only:**

```
pharmacies/web/src/components/layout/PageShell.tsx   174 -> 262 lines
```

`pharmacies/web/src/app/page.tsx` was in my OWNS list and was **read in full but
not edited** — see fix 1 and the coordinator-message section for why. Nothing
else under `src`, `packages/**` or `docs/**` (bar this file) was touched.

Sources read in full before editing: `R1_PHASE1_REVIEW.md`, `W5_RECEIPT.md`,
`P1C_RECEIPT.md`, the `.ground-dark` / focus-ring block of `P1A_RECEIPT.md` and
of `src/app/globals.css` (:160-245), kit
`packages/web-shared/design/chrome/SiteFooter.tsx` and `PageShell.tsx`
(read-only), `design/chrome/nav.ts`, `src/data/pharmacies-services.ts`,
`src/data/pharmacies-hubs.ts`, `src/lib/calculators/registry.ts` and its three
tool modules.

---

## FIX 1 — homepage focus rings. ALREADY CLOSED IN THE TREE. No edit needed.

**R1's own words, finding S1:** "The worktree's newer `page.tsx` already fixes
it; the tagged build does not." R1 measured the build at `.next/BUILD_ID`
11:44:27; W5 rewrote `page.tsx` at 12:02:34. The 11 sub-floor rings are a
property of the **stale build on :3111**, not of the source.

Verified by reading every band wrapper in the current `src/app/page.tsx`, band by
band. There are **three** dark-ground bands on the homepage, and all three
already carry the class:

| band | ground | wrapper line | class present | ring expected |
|---|---|---|---|---|
| 1 hero | `bg-primary-950` (`#0f3a4a`) | `page.tsx:329` | **`ground-dark`** | white `#ffffff` on `#0f3a4a` = **12.18** |
| 2 key figures (`StatsCounter tone="dark"`) | `bg-primary-800` | `page.tsx:402` | **`ground-dark`** | white on `primary-800` = **7.33** |
| 5 NHS contract economics | `bg-primary-950` | `page.tsx:471` | **`ground-dark`** | white on `#0f3a4a` = **12.18** |

All three clear the 3:1 non-text indicator floor by 2.4x or more. The mechanism
is `globals.css:226-229`: `.ground-dark` rebinds `--focus-ring` and
`--kit-focus-ring` to `--focus-ring-on-brand` (`#ffffff`), custom properties
inherit, and every ring on these bands arrives through `focusRing` / `btnOnDark`
from `@/components/ui/layout-utils`, each of which is exactly
`outline-[var(--focus-ring)]`. The pre-fix value was
`--focus-ring-on-light` = `--color-primary-950` = `#0f3a4a`, which on the hero
and band 5 is **brand on brand, 1.00** — R1's worst row, reproduced exactly.

**Kit components rendered `tone="dark"` whose outer wrapper I control:** one,
`StatsCounter` on band 2, and its wrapper is the `ground-dark` section at :402.

**Dark surfaces I deliberately did NOT add the class to, with the reason:**

- **Band 11 `TestimonialsSection`** (`page.tsx:882`) and **band 13
  `LeadCTAPanel`** (`:928`). Both paint their own `bg-slate-900` inside the kit
  and expose no `className`, so there is no wrapper of mine to class — and the
  class **must not** be added even if there were: `globals.css:224-225` forbids
  wrapping a dark section that contains a light-ground card with focusable
  children, and both of these contain a white `LeadForm` card. Their rings
  correctly stay on the light-ground brand value (`#0f3a4a` on white = 12.18).
- **Band 6's table header row** (`:609`, `bg-primary-950 text-white`). A dark
  `<tr>`, but it contains two `<th>` cells and **zero focusable children**, so
  there is no ring to rebind. Adding the class there would be noise.
- `/about`'s brand hero already carries `ground-dark` on its own wrapper
  (`about/page.tsx:36`). Out of my file list anyway.

**Net: 0 classes added, because the correct 3 were already present.** The
honest gate row is R1's: *11 sub-floor rings were live in the 11:44 build; the
source fixes all 11; the number is unverified in a render until someone rebuilds.*
This is handoff 1.

---

## FIX 2 — the thin footer (R1 serious S5)

### The false premise that shaped the fix

The brief said to populate the columns "through the props PageShell already
passes". **The kit footer has no link-list prop for Services, Resources or
Calculators.** `SiteFooter.tsx buildFooterColumns` derives all three from the
**`nav` array**: `childrenOf("/services")`, `childrenOf(resourcesHref)`, and
`find("/calculators")?.groups`. A nav item with no `children` self-links
(`SiteFooter.tsx:110-115`), which is precisely why four columns rendered one
link each. Only `companyItems` is a real link-list prop.

So the fix is a **richer nav for the footer**, which is data, exactly as R1
predicted ("the fix is data, not code"). No file under `packages/**` was edited.

### Why a footer-only nav, and how it is passed

The kit shell forwards **one** nav to the header and the footer
(`kit PageShell.tsx:59,63`). Putting `children` on `/services` and `/for` in that
shared array would also turn both header items into dropdowns — a visible chrome
change on 55 routes that no package declared and that R1 did not ask for. And
`layout.tsx`, where the shared nav is built, is OFF LIMITS to me.

The kit spreads `{...footer}` **after** its own `nav={nav}` (`kit PageShell.tsx:63`),
so a `nav` key on the footer props object replaces the footer's copy and the
header's is untouched. The key is carried past the kit's
`Omit<SiteFooterProps, "nav">` prop type by a single `as` assertion on the footer
object; `nav` is a real `SiteFooterProps` field, so nothing unchecked is
introduced. This is handoff 5 — the clean shape is a kit `footerNav?` prop.

**Labels are literals, not imports.** `PageShell.tsx` is `"use client"`.
Importing `@/data/pharmacies-services`, `pharmacies-hubs` or
`@/lib/calculators/registry` here would ship every service body, every hub body
and every calculator **compute function** into the client bundle on all 55
routes — the exact hazard the kit's own comment at `SiteFooter.tsx:84-87` names.
Every label is the published `title` (services, hubs), `name` (calculators) or
h1 (research) from those modules, **copied verbatim. No new copy was authored.**
Drift risk is real and is handoff 4.

### Columns, before and after, with hrefs

**BEFORE — 5 columns, 9 links** (R1's rendered footer text, confirmed against
`P1C_RECEIPT.md`):

| column | links | hrefs |
|---|---|---|
| SERVICES | 1 | `/services` |
| RESOURCES | 1 | `/research/pharmacy-openings-closures-index` |
| CALCULATORS | 1 | `/calculators` |
| BLOG | 1 | `/blog` |
| COMPANY | 5 | `/about`, `/contact`, `/privacy-policy`, `/terms`, `/cookie-policy` |

**AFTER — 4 columns, 27 links:**

| column | links | hrefs |
|---|---|---|
| SERVICES | **9** | `/services`, `/services/pharmacy-purchase-accounting`, `/services/pharmacy-sale-cgt-badr`, `/services/pharmacy-valuation-goodwill`, `/services/nhs-payment-reconciliation-fp34`, `/services/pharmacy-vat-retail-schemes`, `/services/pharmacy-payroll-workforce`, `/services/pharmacy-incorporation-structure`, `/services/pharmacy-benchmarking-margin` |
| RESOURCES (= the audiences column) | **6** | `/for`, `/for/pharmacy-owners`, `/for/buying-a-pharmacy`, `/for/selling-a-pharmacy`, `/for/pharmacy-groups`, `/for/locum-pharmacists` |
| CALCULATORS (= the tools column) | **6** | `/calculators/pharmacy-purchase-affordability`, `/calculators/pharmacy-fp34-cash-flow-estimator`, `/calculators/locum-take-home-comparator`, `/research/pharmacy-openings-closures-index`, `/research/pharmacy-density-and-workload-index`, `/calculators` |
| COMPANY | **6** | `/about`, `/contact`, `/blog`, `/privacy-policy`, `/terms`, `/cookie-policy` |

**Link count 9 -> 27, delta +18. Monotone: zero hrefs lost.** Every one of the
11 chrome hrefs `P1C_RECEIPT.md` lists survives, so the phase-0 link baseline and
the per-route floors can only rise:

| P1-C href | still in the chrome? |
|---|---|
| `/` (wordmark x2) | yes, header + footer lockup, untouched |
| `/services` | yes, first row of the Services column |
| `/for` | yes, first row of the Resources column (it reached the footer **not at all** before — R1 S5 and P1-C handoff 2, now closed) |
| `/research/pharmacy-openings-closures-index` | yes, moved from the Resources heading into the tools column |
| `/blog` | yes, moved from its own stub column into Company |
| `/about`, `/contact` | yes, Company |
| `/privacy-policy`, `/terms`, `/cookie-policy` | yes, Company |
| `/calculators` | yes, the kit's unsuppressable "All calculators" row |

**CTA triples untouched.** No `data-cta` attribute was added, removed or
renamed; `header_contact`, `header_contact_mobile`, `sticky_cta` and
`sticky_cta_close` are all in untouched code. No `header`/`footer`/`main`
landmark changed. `footerLinks: siteConfig.footer` still renders empty by the
kit's dedupe, for the same reason as before (all five hrefs are column hrefs);
the legal row is unchanged in shape.

**Grid:** the kit's column `<nav>` is `grid-cols-2 sm:grid-cols-4`, so 4 columns
fill it exactly — R1's "the right ~60% of the column grid is empty" at 1440
closes structurally, where 5 columns in a 4-wide grid previously wrapped one
column onto a second row.

---

## THE COORDINATOR'S MID-TASK FINDING — FALSE PREMISE ON THE HOMEPAGE

Asked mid-task to make the homepage's final band a light ground, on the grounds
that a dark content band runs into the dark `slate-900` kit footer.

**The homepage's final band is already light.** Read on source: band 13, the
`LeadCTAPanel` on `slate-900`, ends at `page.tsx:936`; **band 14, "Guides and
resources", is the last band and is `bg-slate-50`** (`page.tsx:948`, `border-t
border-slate-200 bg-slate-50`). W5's own note at `page.tsx:926-927` says the
same, and `W5_RECEIPT.md` §`--grounds delta` states it as the reason the delta is
0. **No change made, and none should be:** `contained ground="white"` on band 13
would drop the backdrop entirely (`LeadCTAPanel.tsx:81-99`) and change a
ground the owner has not walked, to fix an adjacency that does not exist.

Before = after on the homepage: band 13 `slate-900`, band 14 `slate-50`, footer
`slate-900`. Light sits between the panel and the footer.

**Where the finding IS real: `/about`.** There the `LeadCTAPanel` on `slate-900`
**is** the last band, so it meets the `slate-900` footer directly —
`W5_RECEIPT.md` records this and notes the pre-port page had the same adjacency.
`src/app/about/page.tsx` is **not** in my file list, so this is handoff 2, not a
silent edit. Whoever picks it up should also re-read the instrument output: if it
reported `/` rather than `/about`, the reading is of the 11:44 build, which
pre-dates W5's band 14.

---

## HANDOFFS

1. **Fix 1 is unverified in a render.** The source is correct on all three dark
   bands; the 11 sub-floor rings R1 measured are a property of the stale 11:44
   build. One rebuild plus one tab-walk on `/` closes the gate row. Nobody
   should carry "11 sub-floor rings live" forward from R1 without re-measuring,
   and nobody should carry "fixed" forward from this receipt either.
2. **`/about`'s closing panel meets the footer dark-on-dark** (DESIGN_SYSTEM
   §9). Real, pre-existing, out of my file list. One class on the last band or
   a light `LeadCTAPanel` variant.
3. **Footer column HEADINGS are hardcoded in the kit.** `buildFooterColumns`
   writes the literals "Services" / "Resources" / "Calculators" / "Company"
   (`SiteFooter.tsx:127-135`). The site's five `/for` pages therefore render
   under **"Resources"** and the two research indexes under **"Calculators"**.
   The content is right; two of the four labels are not the words anyone would
   choose. The fix is a kit `columnTitles?` prop or per-column overrides —
   manager-only. I used the nearest existing prop (`resourcesHref`) rather than
   edit the kit.
4. **The footer link inventory is 25 literal label/href pairs in
   `PageShell.tsx`, not derived.** Forced by `"use client"` (see fix 2). A new
   service, hub or calculator will NOT appear in the footer by itself. The clean
   shape is to build the footer nav server-side in `layout.tsx` (OFF LIMITS to
   me) next to the existing `primaryNav`, where the data modules and the tool
   registry can be imported freely, and pass it down as plain data. A guard test
   asserting footer hrefs against the three data modules belongs with it;
   `src/tests/` is also outside my file list, so none was added.
5. **The `nav` override rides the kit's prop ORDER.** It works because
   `kit PageShell.tsx:63` is `<SiteFooter nav={nav} {...footer} />`. If anyone
   reorders that line the footer silently falls back to the flat header nav and
   R1 S5 returns. A kit `footerNav?: NavItem[]` prop on `PageShellProps` removes
   the dependency in one line.
6. **The Calculators column takes one link per GROUP**
   (`group.items[0]`, `.slice(0, 5)`), so the five tool links are expressed as
   five one-item groups whose `category` strings the footer never renders. It
   reads oddly on the page and is capped at 5 — a sixth tool link cannot reach
   that column at all.
7. **Still open from P1-C, unchanged:** `/calculators` remains an unsuppressable
   kit footer link (handoff 1 there), and `btnOnDark`'s `primary-400` ring is
   still unmeasured.
8. **Not mine, still open from R1:** B1 (skip link, `globals.css` — another
   agent), S4 (sticky bar covering the consent control, `StickyCTA.tsx` /
   `layout.tsx` — another agent), S2 and S3 (receipt corrections), B2 (the tag's
   scope — manager).

---

## ACCEPTANCE — RUN

### `tsc`, pasted verbatim

```
$ cd pharmacies/web && npx tsc --noEmit
$
```

Zero output, exit 0, whole tree. Equal to W5's clean baseline.

### `vitest`, pasted verbatim (tail)

```
$ cd pharmacies/web && npx vitest run
 ✓ src/tests/lead-contactability-bridge.test.ts (7 tests) 31ms

 Test Files  6 passed (6)
      Tests  40 passed (40)
   Start at  12:20:04
   Duration  746ms (transform 497ms, setup 0ms, collect 957ms, tests 211ms, environment 2ms, prepare 907ms)
```

**6/6 files, 40/40 tests GREEN**, identical to W5's run. The two `stderr` lines
in `lead-contactability-bridge.test.ts` are the fail-open and db-error paths
asserting their own logging; both tests pass.

### Greps on the edited file

| check | result |
|---|---|
| `grep -coE '#[0-9a-fA-F]{3,8}' src/components/layout/PageShell.tsx` | **0** |
| em / en dashes added by this edit | **0.** The file carries 3, all in P1-C's pre-existing header comments; the 5 my first draft introduced were rewritten out, so the diff adds none |
| `grep -c 'neutral-[0-9]' ...` | **0** |
| `grep -c 'header_contact"' ...` | **1**, unchanged |
| `grep -c 'header_mobile_menu' ...` | **1**, unchanged |
| `grep -c 'PharmaciesBackdrop />' / 'StickyCTA />'` | **1 / 1**, unchanged |
| new imports | **one, type-only** (`SiteFooterProps`). Zero runtime imports added, zero new dependencies, so `check_dependency_closure.py` needs no re-run |

### Needs a build or a server (handed on)

1. Footer link count per route: expect the column set to go **9 -> 27** links,
   and every route's total to rise by **+18** against `sweep_baseline.json`.
   Tightest baselines were 10 (`/about`, `/contact`, the three legal routes, all
   8 `/services/*`); expect ~28.
2. All 25 footer hrefs probed for status. The ones never previously in the
   chrome and therefore never probed: the 8 `/services/*`, the 5 `/for/*`, the 3
   `/calculators/*` and `/research/pharmacy-density-and-workload-index`.
3. Exactly **4** footer columns rendered, one row of the `sm:grid-cols-4` grid,
   at 390 / 768 / 1024 / 1440, and `scrollWidth === clientWidth` at 390 (the
   longest label, "Pharmacy Density and Dispensing Workload Index", is the
   overflow candidate in a 2-column mobile grid).
4. **Header unchanged:** six nav items, no dropdown panel on Services or For,
   same CTA ids and placements. This is the check that proves the footer-only
   nav override did what it claims.
5. Fix 1's tab-walk: white ring on bands 1, 2 and 5 of `/` (12.18 / 7.33 /
   12.18), brand ring inside the two kit panels' white form cards.
6. `--grounds` delta still 0 on `/`.
