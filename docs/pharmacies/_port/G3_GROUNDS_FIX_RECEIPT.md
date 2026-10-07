# G3 receipt — grounds fix, pharmacies design port

Date 2026-10-07. Fixer G3. Closes V1 blocker B2 (`V1_PHASE1_VERIFICATION.md`
§Blockers): 17 routes with a dark band touching the dark footer, 5 routes with an
adjacent white-on-white pair. Rule: `docs/property/DESIGN_SYSTEM.md` §9
("consecutive sections must never share a ground, navy must never touch navy;
the footer is slate-900, so a full-bleed `LeadCTAPanel` needs a light section
between it and the foot of the page"), plus `LeadCTAPanel.tsx:60-71`
(`contained` = the light inset variant; `ground` picks white or slate-50 behind
the card).

No build, no server, no git command, no subagent. Only the 7 template files in
the brief were edited. No wording changed, no form removed, no `data-cta`
touched, no internal link added or removed, no kit adoption reversed.

## 1. Mechanics used

| Lever | Where it came from |
|---|---|
| `contained` + `ground` on `LeadCTAPanel` | the W4 pattern on `/calculators` (`W4_RECEIPT.md` §2: `contained` + `ground="white"`, "no new dark band was created") |
| section ground flipped white -> slate-50 | one side of each adjacent white pair only |
| card `tone` flipped with the section | `CoverageCards.tsx:56-61` and `FaqSection.tsx:37` both require the card surface to contrast with the band behind it |
| `.ground-dark` wrapper REMOVED where the panel became contained | `globals.css:222-225`: the class must never wrap a section containing a light-ground card with focusable children, which is what the contained panel is (it holds the `LeadForm`) |
| `backdrop` prop REMOVED on contained panels | `LeadCTAPanel.tsx:72-77` renders it on the navy variant only; keeping it would be a dead prop |

No new band was added anywhere. Every route ends on a light ground and no two
adjacent bands share one.

## 2. Per route family — band sequence before and after

### `/services` (1 route) — `src/app/services/page.tsx`

| | before | after |
|---|---|---|
| 1 | hero — primary-950 (dark) | hero — primary-950 (dark) |
| 2 | Service tiers — white | Service tiers — white |
| 3 | All services — **white** (adjacentSame with 2) | All services — **slate-50**, `CoverageCards tone="white"` |
| 4 | LeadCTAPanel — **slate-900** (dark) | LeadCTAPanel — **contained `ground="white"`** (white) |
| 5 | footer — slate-900 | footer — slate-900 |

Closes both breaches on this route: the white-on-white pair and darkOnDark.

### `/services/[slug]` (8 routes) — `src/app/services/[slug]/page.tsx`

| | before | after |
|---|---|---|
| 1 | hero — primary-950 (dark) | unchanged |
| 2 | StatsCounter strip — slate-800 (dark) | unchanged |
| 3 | The challenges — white | unchanged |
| 4 | How we help — slate-50 | unchanged |
| 5 | FaqSection — white | unchanged |
| 6 | LeadCTAPanel — **slate-900** (dark) | LeadCTAPanel — **contained `ground="slate"`** (slate-50) |
| 7 | footer — slate-900 | footer — slate-900 |

Band 5 always renders: no record in `src/data/pharmacies-services.ts` has an
empty `faqs` array (`grep -n 'faqs: \[\]'` = 0), so the predecessor of the panel
is white on every one of the 8 URLs and slate-50 cannot collide with it.

### `/for` (1 route) — `src/app/for/page.tsx`

| | before | after |
|---|---|---|
| 1 | hero — primary-950 (dark) | unchanged |
| 2 | hub card grid — white | unchanged |
| 3 | LeadCTAPanel — **slate-900** (dark) | LeadCTAPanel — **contained `ground="slate"`** (slate-50) |
| 4 | footer — slate-900 | footer — slate-900 |

### `/for/[slug]` (5 routes) — `src/app/for/[slug]/page.tsx`

| | before | after |
|---|---|---|
| 1 | hero — primary-950 (dark) | unchanged |
| 2 | StatsCounter strip — slate-800 (dark) | unchanged |
| 3 | challenges — white | unchanged |
| 4 | how we help — slate-50 | unchanged |
| 5 | FaqSection — white | unchanged |
| 6 | LeadCTAPanel — **slate-900** (dark) | LeadCTAPanel — **contained `ground="slate"`** (slate-50) |
| 7 | footer — slate-900 | footer — slate-900 |

Same `faqs` guarantee as the twin template (`pharmacies-hubs.ts`, 0 empty
arrays). The `hub.noLeadForm` signpost branch (`bg-slate-900`) is LEFT AS IS and
is called out rather than silently changed: no record sets the flag, so it
renders on no URL, it was not one of the 17 routes `--grounds` reported, and
re-grounding a band nothing renders would mean restyling white-on-dark copy for
a dead path.

### `/about` (1 route) — `src/app/about/page.tsx`

| | before | after |
|---|---|---|
| 1 | SlimHero — primary-950 (dark) | unchanged |
| 2 | body + registration details — white | unchanged |
| 3 | LeadCTAPanel — **slate-900** (dark) | LeadCTAPanel — **contained `ground="slate"`** (slate-50) |
| 4 | footer — slate-900 | footer — slate-900 |

### `/research/pharmacy-density-and-workload-index` (1 route)

| | before | after |
|---|---|---|
| 1 | hero — primary-950 (dark) | unchanged |
| 2 | headline figures — white | unchanged |
| 3 | regional table — slate-50 | unchanged |
| 4 | dispensing trend — white | unchanged |
| 5 | on-funnel cards — slate-50 | unchanged |
| 6 | related-research cross-link — white | unchanged |
| 7 | About this index (methodology) — **white** (adjacentSame with 6) | **slate-50** |
| 8 | FaqSection — slate-50 (would now collide with 7) | **white**, `tone="slate"` |
| 9 | LeadCTAPanel — **slate-900** (dark) | LeadCTAPanel — **contained `ground="slate"`** (slate-50) |
| 10 | footer — slate-900 | footer — slate-900 |

### `/research/pharmacy-openings-closures-index` (1 route)

Identical shape and identical fix:

| | before | after |
|---|---|---|
| 1 | hero — primary-950 (dark) | unchanged |
| 2 | headline figures — white | unchanged |
| 3 | monthly table — slate-50 | unchanged |
| 4 | seasonality — white | unchanged |
| 5 | on-funnel cards — slate-50 | unchanged |
| 6 | related-research cross-link — white | unchanged |
| 7 | About this index (methodology) — **white** (adjacentSame with 6) | **slate-50** |
| 8 | FaqSection — slate-50 | **white**, `tone="slate"` |
| 9 | LeadCTAPanel — **slate-900** (dark) | LeadCTAPanel — **contained `ground="slate"`** (slate-50) |
| 10 | footer — slate-900 | footer — slate-900 |

## 3. What this does NOT cover

The 5 adjacentSame routes in B2 are `/services`, both `/research/*`, and the two
long-tail `/blog/nhs-contract-and-income/*` articles. The two blog routes are
rendered by a blog template outside this package's OWNS list and are NOT fixed
here. Three of five closed, two handed on.

## 4. Checks run

```
cd pharmacies/web && npx tsc --noEmit
```
clean, no output, exit 0.

```
npx vitest run
 Test Files  6 passed (6)
      Tests  40 passed (40)
   Duration  3.62s
```

(The two stderr lines in the run are the fail-open and db-error cases of
`lead-contactability-bridge.test.ts` asserting their own logging; both tests
pass.)

Not re-run, by the brief: no build, no server, so `browser_check.mjs --grounds`
was not re-measured. The claim here is a source-level one — every affected
route's last band is now a light ground and no two adjacent bands share one —
and it needs a rendered `--grounds` run on a fresh build to be a verified one.
The server on 3111 is a stale build and does not carry these edits.

## 5. Contrast rows — none newly needed

Every ground used here is one this port has already measured on light bands:
white and slate-50 with slate-900 headings, slate-600/slate-700 body and the
`linkOnLight` anchor colour. The contained panel's own card is the kit's
`bg-slate-100` inset with `text-slate-900` / `text-slate-600`, the same shape
W4 measured on `/calculators`. The three dark grounds that remain (hero
primary-950, the slate-800 stats strip, the footer) are unchanged and keep their
existing rows and their `.ground-dark` bindings. The only focus-ring change is
the removal of four `.ground-dark` wrappers around panels that are no longer
dark, which returns those forms' rings to the light value — the correct one for
a slate-100 card.
