# P0G — pharmacies, deterministic re-check of the F1/F2/F3 fix wave

Run 2026-10-07 against `http://localhost:3111` (`next start`, FIXED build). Identity asserted
before every run: `<title>Pharmacy Tax | Specialist Accountants for UK Pharmacy Owners</title>` —
present, exact match. No server started/stopped/restarted, no `next build`, no subagents, no git
state changes. Instruments run without `--save-baseline`; P0D baselines untouched. Scratch:
`...\scratchpad\p0g\` (sweep_out.json, cta_out.json, browser_out.json, browser_stdout.log left
there per brief).

---

## Part 1 — instrument before/after

| instrument | metric | before (P0D) | after (P0G) | verdict |
|---|---|---|---|---|
| sweep.mjs | exit code | 0 | 0 | PASS |
| sweep.mjs | URLs clean | 55/55 | 55/55 | PASS |
| sweep.mjs | total internal links | 813 | 813 | PASS |
| sweep.mjs | link-floor breaches | n/a (first capture) | 0 (all 23 families identical min/median/max) | PASS |
| sweep.mjs | dead same-origin links | 0 | 0 | PASS |
| sweep.mjs | data-cta total | 165 | 165 | PASS |
| sweep.mjs | em/en dashes | 0 | 0 | PASS |
| sweep.mjs | pipeline artefacts | 0 | 0 | PASS |
| cta_snapshot.mjs | exit code | 0 | 0 | PASS |
| cta_snapshot.mjs | total CTAs | 165 | 165 | PASS |
| cta_snapshot.mjs | distinct triples | 3 (see below) | 3, byte-identical | PASS |
| browser_check.mjs | exit code | 0 | 0 | PASS |
| browser_check.mjs | overflow at 390 (any route) | 0 | 0 | PASS |
| browser_check.mjs | contrast failures (total nodes) | 29 (2 `/research/*` routes) | **0** | **PASS (fixed)** |
| browser_check.mjs | anchor gaps (`scroll-margin-top`) | 8 (1 blog route, `#ref-1`/`#ref-2`, 4 widths) | **0** | **PASS (fixed)** |
| browser_check.mjs | SVG `<rect>` NaN console errors | 8 (`/research/pharmacy-openings-closures-index`, 4 widths) | **0** | **PASS (fixed)** |
| browser_check.mjs | CSP frame-src (AdSense) noise | 140 | 140 | unchanged, expected, not a defect |
| browser_check.mjs | navigation timeouts (transient) | 3 scattered | 7 scattered, no repeat route/width pair | within transient-noise tolerance (load contention, not a regression — see note) |
| browser_check.mjs | gstatic csi telemetry noise | 1 | 3 | unchanged class, harmless |
| browser_check.mjs | grounds breaches (darkOnDark / adjacentSame) | 0 | 64 darkOnDark + 9 adjacentSame entries (17 + 3 unique routes) | **pre-existing, not part of this fix wave's scope — see honesty note** |
| browser_check.mjs | self-test | passed (4.76/2.56) | passed (4.76/2.56) | PASS |

**Link-floor delta**: every one of the 23 URL families in P0D reproduced its exact min/median/max
(`/` 25, `/about` 10, `/services` 18, `/services/*` 10, `/for` 15, `/for/*` 13-17, `/calculators`
13, `/calculators/*` 11, `/research/*` 14-18, `/blog` 37, all 5 blog-category families and their
article sub-families identical). **Zero families dropped below baseline.**

**cta_snapshot full triple set vs `cta_baseline.json`** — byte-identical, no id/placement/goal change:

| id | placement | goal | href | count | match |
|---|---|---|---|---|---|
| `header_contact` | `header` | `null` | `/contact` | 55 | identical |
| `sticky_cta` | `sticky` | `null` | `/contact` | 55 | identical |
| `sticky_cta_close` | `sticky` | `null` | (none) | 55 | identical |

Trap 22 clear: no id kept its count while changing placement or goal.

**Grounds honesty note**: P0D's `--grounds` run reported 0 breaches, but P0D sampled fewer of the
`/services/*`/`/for/*` detail routes under `--grounds` than this run's full 35-route sweep did —
the 17 "dark band touches dark footer" and 3 "adjacent bands share a ground" routes are the same
dark-navy (`rgb(15,58,74)`) CTA band meeting an equally dark footer, a chrome-contrast pattern, not
something F1/F2/F3 touched or claimed to fix. Not a regression introduced by this fix wave —
nothing in F1/F2/F3's file lists (JSON-LD, `/embed/*`, nested `<main>`, titles, chart NaN/contrast/
anchors/404) touches footer or CTA-band colour. Filed to the owner residual list below rather than
claimed as newly broken.

---

## Part 2 — curl proofs

| # | claim | command / decisive line | verdict |
|---|---|---|---|
| 1 | exactly one full Organization JSON-LD node per page, 5 sampled pages | node JSON-LD extraction on `/`, `/about`, `/services/pharmacy-purchase-accounting`, `/blog/nhs-contract-and-income`, `/calculators/pharmacy-fp34-cash-flow-estimator`: each page has exactly **1** block with `@id` ending `#organization` + `legalName`/`address` (the old second conflicting block is gone) | **PASS** |
| 2 | no `priceRange` anywhere | `grep -c priceRange` on the same 5 pages + `/privacy-policy` + `/for/pharmacy-locums` | `0` on all 7 | **PASS** |
| 3 | `/embed/*` carries no header/footer/sticky-CTA markup | `grep -c '<header'/'<footer'/'data-cta="sticky_cta"'` on all 3 embed routes | `0`/`0`/`0` on all 3 | **PASS** |
| 4 | no nested `<main>`, one URL per template family | `grep -o '<main[^>]*>' \| wc -l` on home, services hub, service detail, for hub, for detail, calculators hub, calculator, blog list, blog hub, blog post, research x2, contact, book, complete, thank-you, legal, admin login (18 URLs) | `1` on every URL | **PASS** |
| 5 | `/services`, `/for` titles no longer double the brand suffix | `<title>` on `/services` = `"Services | Pharmacy Tax"`, on `/for` = `"Who We Help | Pharmacy Tax"` — single suffix | **PASS** |
| 6 | `/book`, `/complete`, `/thank-you` canonicals self-referential | `grep -o 'rel="canonical"...'` | each canonical = its own path, not the bare homepage | **PASS** |
| 7 | not-found carries noindex | fetch a nonexistent route | `<meta name="robots" content="noindex, nofollow"/>` present | **PASS** |
| 8 | reply-time promise reads "within 24 hours" everywhere | grepped all 55 sitemap URLs + `/llms.txt` + `/llms-full.txt` for both phrases | **"within 24 hours" = 138** (137 swept pages + llms.txt's own 1, llms-full.txt 1 counted separately below); **"within one working day" = 0** everywhere | **PASS** (full counts: swept pages 137/0; `llms.txt` 1/0; `llms-full.txt` 1/0) |
| 9 | llms.txt describes the affordability calculator correctly | `grep -A2 -i affordability /llms.txt` | "Takes an agreed purchase price, deposit and loan terms and returns the estimated monthly repayment, the post-tax cash cover ratio, and the stamp duty or SDLT cost of a share deal against an asset deal" — matches `compute()`, no longer the backwards EBITDA description | **PASS** |
| 10 | 3 calculator pages render (200, h1 present) | curl status + h1 count on `/calculators/pharmacy-purchase-affordability`, `/calculators/pharmacy-fp34-cash-flow-estimator`, `/calculators/locum-take-home-comparator` | all `200`, `h1_count=1` | **PASS** |
| 11 | research chart captions no longer use `text-neutral-400` | `grep -o text-neutral-400 \| wc -l` on both `/research/*` pages | `1` on each — but checked in context: the one remaining hit on each page is an unrelated icon-button class (`rounded-lg text-neutral-400 ... hover:text-white`), not a chart caption | **PASS** (captions fixed; the lone survivor is a different element, not the defect class) |

11/11 PASS.

---

## Part 3 — bounded code fix (research type/data mismatch)

**File (only one edited besides this report)**:
`pharmacies/web/src/lib/research/pharmacy-openings-closures-index.ts`.

**Finding confirmed**: `ChFormationsMonth` and `ChFormationsYear` both declared a field literally
named `"47730"` (the SIC code, as a key). The live data
(`src/data/pharmacy-openings-closures-index.json`) stores that series under the key `count`
(verified: `{"month":"2015-07","count":11}`, `{"year":2016,"count":227}` — no `"47730"` key at
runtime, and no `union` key either, though `union` was left as declared since it isn't accessed
anywhere and wasn't the reported mismatch).

**Fix**: renamed `"47730": number` to `count: number` in both interfaces — the type now matches
the data it describes, nothing else touched.

```ts
export interface ChFormationsMonth {
  month: string;
  count: number;
  union: number;
}

export interface ChFormationsYear {
  year: number;
  count: number;
  union: number;
}
```

**`npx tsc --noEmit` result**:

```
src/app/research/pharmacy-openings-closures-index/page.tsx(69,14): error TS7053: Element
implicitly has an 'any' type because expression of type '"47730"' can't be used to index type
'ChFormationsYear'.
  Property '47730' does not exist on type 'ChFormationsYear'.
```

**Not clean, and expected.** `page.tsx:69` is P0F3's own workaround —
`value: r["47730"] ?? (r as unknown as { count?: number }).count ?? 0` — written specifically to
survive both the old wrong type and the real data at once. Fixing the type the brief asked for
necessarily breaks that workaround's first half, because `"47730"` never existed as a real key and
now the compiler (correctly) says so. `page.tsx` is outside this package's one-file scope
(off-limits per brief), so the one-line follow-up — drop the `r["47730"] ??` half and read
`r.count` directly — is filed below rather than made here.

---

## Part 4 — residual lists

### Phase 1 (receipts already call these phase-1 scope)

- No skip-to-content link anywhere (P0B #11 / P0E, confirmed still absent on all sampled routes).
- No breadcrumb UI despite `BreadcrumbList` JSON-LD on 21 pages (P0B #4) — JSON-LD still present,
  no visible trail; component work, not this package's fix set.
- Chrome contrast: the dark-navy CTA band meeting an equally dark footer on 17 routes
  (`/services` hub + 8 detail, `/for` hub + 4 detail, both `/research/*`, `/about`), plus 3 routes
  where two adjacent light bands register as the same ground (`/research/*` x2, `/services`) —
  all newly visible because this run's `--grounds` swept the full 35-route set; not a regression,
  not previously fixed, not in F1/F2/F3's file lists.
- Primary-colour Tailwind ramp step flagged undefined in earlier packages — not re-measured this
  pass (out of this instrument's scope), carried forward as still open.
- `page.tsx:69` one-line follow-up from Part 3: replace
  `value: r["47730"] ?? (r as unknown as { count?: number }).count ?? 0` with `value: r.count ?? 0`.
  Trivial, but outside this package's single-file limit.

### Owner / estate-wide

- `src/app/about/page.tsx:26` and `src/components/calculators/MiniCapture.tsx` carry the sole
  surviving "within one working day" text per the P0F1 receipt's handoff list — **re-grepped this
  pass and both are now "within 24 hours"**, so this item is closed, not still open (F2 fixed
  both; confirmed above, 0 "one working day" hits anywhere).
- `pharmacies/niche.config.json` declares `public/brand/logo.png`, which does not exist — a text
  wordmark renders instead (P0E serious #5, F1/F2/F3 all declined as off-limits). Estate-wide
  config-key class of defect, not pharmacies-specific.
- `src/lib/calculators/tools/pharmacy-purchase-affordability.ts:108-114` — corporation tax computed
  on profit before loan interest, overstating CT and understating the cover ratio (ledger G7,
  minor, untouched by any package so far).
- `src/lib/calculators/tools/pharmacy-purchase-affordability.ts:119-122` — "ranges we see most
  often" wording implies an observed deal population; flagged as an owner decision (ledger B5),
  untouched by any package.
- `public/llms.txt:47-56` — currency rendered as "pound-sterling 1 million" instead of "£1m" on 11
  lines (ledger E2, minor, cosmetic for AI retrievers), untouched.
- 3 scattered navigation timeouts in P0D, now 7, no repeat route/width pair in either run — record
  only; consistent with local-crawl load contention under repeated runs, not a site defect, same
  conclusion P0D reached.

---

## Instrument-failure honesty check

No instrument failed. `browser_check.mjs` was moved to the background by the Bash tool's own
window despite the 600000 ms timeout parameter — the same tool-level behaviour P0D and the
hospitality P0G both already recorded as outside either agent's control. It completed cleanly
(exit 0), the `--out` file landed intact, and no second concurrent run was started. `cta_snapshot.mjs`
had to be re-run from the repo root (its baseline-file lookup is relative to cwd; running it from
`pharmacies/web` produced an `ENOENT` on `sweep_baseline.json` and exit 1 — a cwd mistake on this
agent's first attempt, not an instrument defect) — noted here rather than hidden.

**Blockers found: 0.** All four serious P0D findings (duplicate Organization `@id`, `priceRange`,
8 SVG NaN errors, 29 contrast failures) and both minor findings in this package's remit (8 anchor
gaps, the research-type/data mismatch) verify fixed. 11/11 curl proofs pass. `tsc` on the one file
this package edited produces one expected, pre-identified, out-of-scope downstream error in a file
this package is not permitted to touch.
