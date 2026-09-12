# P1-GUARD: the tests the port phases are measured against

Written before the phases run, on `contractors-ir35/web/`. Six new files under
`contractors-ir35/web/src/tests/`. No new dependencies, no fixtures, same
framework (vitest, `npm test` = `vitest run`) and same style as the existing
suites.

Run: `cd contractors-ir35/web && npx vitest run`
State at the time of writing: **21 files, 448 tests, 447 pass, 1 fail**. The
single failure is one of these guards and it is a real defect (below).

Note on rendering. `vitest.config.ts` includes `src/**/*.test.ts` only, not
`.tsx`, and the app's `.tsx` files are transformed with the classic JSX
runtime. Every guard that renders a component is therefore a `.ts` file using
`React.createElement` and sets `globalThis.React` before importing any
component. No config change was needed and none was made.

---

## 1. `calculator-crawl-path.test.ts` (5 tests, all PASS)

Guards: every registry tool is reachable by a real crawlable link and resolves
to a real route.

- Renders `/calculators` (a synchronous server component) with
  `renderToStaticMarkup` and collects the real `href="/calculators/<slug>"`
  anchors, so a card that stops being an `<a>` fails here where a grep would
  not.
- All 10 registry tools must appear as anchors.
- Every rendered anchor must resolve, either through
  `generateStaticParams()` on `app/calculators/[slug]/page.tsx`
  (`dynamicParams = false`, so an unemitted slug is a 404) or through a
  bespoke `page.tsx`. The reverse is asserted too: no bespoke tool without a
  page.
- `generateStaticParams()` must emit exactly the generic registry slugs.
- No premium toolId may be linked under `/calculators/`.

Derived, not assumed:

- There is no `<CalculatorTabs` anywhere on this site, so the estate
  `calculator-tabs-crawl-path` guard was NOT registered: with
  `requireLiveUsage: true` it would fail for a reason unrelated to any
  regression, and with it false it would pass vacuously.
- All 10 registry tools are generic and route through `[slug]`; `BESPOKE` is
  empty. All 10 returned 200 in the port baseline.
- The 4 premium tools in `lib/calculators/premium/registry.ts` have **no
  routes at all**. They are client islands mounted inside blog posts by
  `PremiumUpgrade`. Listing them would have emitted 4 dead links, so the guard
  asserts they stay unlisted.

## 2. `hub-article-crawl-path.test.ts` (4 tests, all PASS as of this run)

Guards: the number of article links reaching **server HTML** equals the corpus
count, on `/blog` and on every category hub.

- Renders `BlogListWithSearch` (the component both `/blog` and
  `/blog/[category]` use) with the full corpus and counts
  `/blog/<category>/<slug>` anchors in the markup.
- `/blog`: all 62 posts. Each hub: its whole category. The hub's advertised
  count must equal the posts actually in it.

**Expected-fail status, and why it currently passes.** The invariant asserted
is the correct one (full corpus reachable), not today's behaviour. On the
committed `HEAD` version of the component the list sliced to `postsPerPage =
12`, and this guard fails against it: rendering the `HEAD` copy produces **12
of 62** anchors (verified by rendering the `git show HEAD:` version in a
throwaway test, which failed as expected and was deleted). The fix by the
concurrent agent is already staged in the working tree, so the guard is green
here. If that fix is reverted or lands differently, this goes red again, which
is the point. Two categories are over the old page size and were also
truncated: IR35 Status (17) and Umbrella vs Limited Company (13).

Derived, not assumed: the estate `hub-article-crawl-path` guard source-scans
Property's `HubArticleList` / `BlogCategoryHub` for "maps the full array" plus
a `hidden={` attribute. This site uses neither component, and the landed fix
removes pagination rather than hiding cards, so that guard would fail on a
correct fix. The outcome is asserted instead of the spelling.

## 3. `nav-active-state.test.ts` (5 tests, all PASS)

Guards: exactly one nav row lights per page, and no nav or footer link is dead.

- Reproduces SiteHeader's predicate (`pathname === href ||
  pathname.startsWith(href + "/")`) and asserts exactly one lit row on each
  nav route and on a representative child route beneath it.
- No nav href may be a prefix of another (the two-lit-rows regression for a
  flat, prefix-matched nav).
- Every nav and footer href resolves to a real `page.tsx`.

Derived, not assumed: this site's nav is FLAT, five items from
`niche.config.json -> navigation`, rendered by `SiteHeader` with one
predicate. There is no `src/lib/nav.ts` and no dropdown, so the estate guard's
opening assertion ("has at least one dropdown to test") would fail on shape,
not on a regression. It was not registered.

## 4. `post-summary-excerpt.test.ts` (4 tests, all PASS)

Guards: the excerpt mechanism this site actually uses.

- Every post carries a non-empty `summary`.
- Each summary is a readable sentence: at least 60 characters, ends in
  terminal punctuation, carries no markup, no em dash, is not just the title.
- Summaries are distinct across the corpus.

Derived, not assumed: **there is no `firstSentence` helper on this site.**
`lib/blog.ts` reads frontmatter `summary` and defaults it to `""`; that string
is the only excerpt in the product (listing card, TLDR panel, related-article
cards). The estate `first-sentence` guard has nothing to bind to here. Worse,
`summary` is not in `STANDARD_MANIFEST`, so `assertFrontmatter` does not
require it: a post without one renders a blank card and a blank TLDR with no
error. That gap is what this guard closes. No upper length bound is asserted:
nothing clamps the summary and the live corpus runs 247 to 659 characters.

## 5. `no-em-dash.test.ts` (4 tests, all PASS)

Guards: no em dash (U+2014 or `&mdash;`) in user-facing copy, in three buckets:
`src/` with comment bodies blanked, `content/` bodies plus rendered
frontmatter, and `metaTitle` / `metaDescription` on their own.

The meta bucket is the uncaught class: an em dash there never reaches rendered
body text, so both a rendered-route sweep and a body-text scan miss it, but it
reaches every user who sees the result in Google or Bing.

**Zero gate, not a ratchet, and the baseline number is misleading.**
`sweep_baseline.json` records 14 dashes across 157 URLs, but
`docs/_engines/instruments/sweep.mjs:72` counts en dashes and HTML entities as
well (`/[—–]|&mdash;|&ndash;/`). Scanning this site's own source for U+2014
alone, comments stripped, gives **zero** in `src/` and **zero** in `content/`,
body and frontmatter alike. The 14 are en dashes: 13 in
`src/data/contractor-types.ts` (which feeds the `/for` pages) and 1 on the home
page. En dashes are allowed by the house rule in numeric ranges, so they are
not this gate's business. With the true em-dash count already at zero, a
ratchet at 14 would license regressions that do not exist. Solicitors needed a
ratchet because its baseline was ~330; this site does not.

## 6. `house-position-constants.test.ts` (7 tests, **1 FAIL**)

Guards: every published tax constant against
`docs/contractors-ir35/house_positions.md`.

Enumerated from both ends so it cannot pass by omission:

1. Every numeric/string leaf exported by `lib/calculators/tax2026.ts` is
   discovered **at runtime** and must have a row in the expected table. A new
   or renamed constant with no ground-truth row fails.
2. Every constant must equal its HP figure (25 leaves: PA and taper, band
   limits, the three income tax rates, dividend allowance and the three
   dividend rates, seven NIC figures, the levy, five CT figures, the tax year).
3. Every expected figure must still be **stated in house_positions.md**. If HP
   is re-locked with a new figure, the anchor stops matching and the gate
   fires, rather than the code quietly drifting from the document it cites.
4. `BASIC_RATE_LIMIT` (37,700) is asserted as derived (UEL 50,270 less PA
   12,570), because HP states the two inputs and not the band width.
5. A separate block covers an HP figure that is not a constant: the £6,708
   LEL, hardcoded as a salary option in four calculator and premium config
   files. Every "(lower earnings limit)" option found must be 6708.

**The one failure, and it is real, not expected-red scaffolding:**

```
APPRENTICESHIP_LEVY: house_positions.md no longer contains "Apprenticeship Levy** is **0.5%"
```

`tax2026.ts` publishes `APPRENTICESHIP_LEVY = 0.005` and it is inside every
umbrella take-home figure the site prints. `house_positions.md` locks that the
levy is funded from the assignment rate (§12) and that it is deducted before
the worker is paid, but **never states the 0.5% rate**. So the figure is
published to users with no locked ground truth behind it. 0.5% is the correct
statutory rate, so this is a documentation gap rather than a wrong number on
the site, and the fix is an HP edit (add the rate to §12 with its source),
not a code edit. It is left failing deliberately: silencing it would be the
exact "green over a figure nobody checked" failure this guard exists to stop.

---

## Summary

| File | Tests | State |
|---|---|---|
| `calculator-crawl-path.test.ts` | 5 | PASS |
| `hub-article-crawl-path.test.ts` | 4 | PASS (would fail on `HEAD`; the `/blog` fix is staged) |
| `nav-active-state.test.ts` | 5 | PASS |
| `post-summary-excerpt.test.ts` | 4 | PASS |
| `no-em-dash.test.ts` | 4 | PASS |
| `house-position-constants.test.ts` | 7 | 6 PASS, 1 FAIL (real: levy rate not locked in HP) |
