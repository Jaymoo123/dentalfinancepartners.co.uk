# F6 — Chart accessibility fix, contractors-ir35/web

Scope: chart components only. No page TSX, no content, no figures changed, no
`packages/web-shared/` edits, no sibling-site files touched.

## The pattern used

Reused what the site already had:

- Tailwind `sr-only`, already in use at `src/app/page.tsx:382`
  (`<caption className="sr-only">`), `BlogListWithSearch.tsx:84`, and the skip
  link in `PageShell.tsx:16`. No new CSS, no new dependency.
- New 45-line local helper `src/components/research/ChartDataTable.tsx`:
  an `sr-only <table>` with a `<caption>` (the chart's old `aria-label` text),
  `<th scope="col">` headers and `<th scope="row">` row headers.

Per chart: the decorative `<svg>` now carries `aria-hidden="true"
focusable="false"` (`role="img"` + `aria-label` removed, they were the thing
collapsing the subtree), and a `ChartDataTable` carrying every plotted value
sits beside it. Figures are echoed from the exact same expressions that feed
the SVG — same `toLocaleString("en-GB")` / `toFixed(1)` calls, so no published
number changes.

## Per chart

| # | file:line (post-edit) | What was hidden | What is now reachable | Verified |
|---|---|---|---|---|
| 1 | `src/components/research/SurvivalIndexCharts.tsx:73` `SurvivalCurveChart` | `role="img"` + one label; all 6 year/percentage pairs for both series unreachable | Table "Survival curve: contractor SIC groups vs all industries, {year} birth cohort" — rows Birth/Year 1-5, columns contractor % and all-industries %, nulls read "no data" | render test: `<td>92.5%</td>`, `<td>90.2%</td>`, `<td>no data</td>` present; `role="img"` absent |
| 2 | `SurvivalIndexCharts.tsx:160` `OneYearTrendChart` | every cohort bar's 1-year survival rate | Table "1-year survival rate by birth-year cohort" — row header = cohort year, cell = `92.5%` | render test: `<th scope="row">2018</th>` + `<td>92.5%</td>` |
| 3 | `src/components/research/ContractorIndexCharts.tsx:69` `AnnualIncorporationsChart` | every year's incorporation count | Table Year / New companies | render test: `<td>12,345</td>` |
| 4 | `ContractorIndexCharts.tsx:185` `MonthlyIncorporationsChart` | the whole monthly series, incl. which months are provisional | Table Month / New companies / Status (Settled or Provisional) | render test: `<td>900</td>` + "Provisional" present |
| 5 | `ContractorIndexCharts.tsx:301` `ReformOverlayChart` | annual union formations + which years carry a reform marker | Table Year / New contractor-sector companies / Off-payroll reform (label in the marked year's row) | render test: `<td>7,777</td>` + `<td>Apr 2021</td>` |
| 6 | `src/components/research/ContractorInsolvencyCharts.tsx:63` `AnnualInsolvencyChart` | every year's Section J+M total | Table Year / Section J+M insolvencies | render test: `<td>4,321</td>` |
| 7 | `ContractorInsolvencyCharts.tsx:167` `MonthlyInsolvencyChart` | the whole stacked series; the three procedure bands were only in `<title>` hover text | Table Month / CVL / Compulsory / Administration / Total | render test: `<td>11</td><td>22</td><td>4</td><td>37</td>` (administration = administration + administration_to_cvl, same as the plot) |
| 8 | `ContractorInsolvencyCharts.tsx:265` `CapturedShareChart` | captured vs other split per year | Table Year / Divisions 62-70-71 / Elsewhere in Section J+M / Section J+M total | render test: `<td>200</td><td>300</td><td>500</td>` |
| 9 | `src/components/calculators/premium/PremiumBarChart.tsx:89-103` | worst case: outer `<div aria-hidden="true">` removed the chart entirely, so even the `role="img"` label was unreachable — a screen reader got nothing, not even a name | Table moved OUTSIDE the `aria-hidden` div (so it is not inside the hidden subtree): caption from `spec.valueAxisLabel`, columns = Group + each series label, cells = `formatValue()` output, same formatter the bars use | render test: `<table class="sr-only">`, "Umbrella" header, `<td>£41,234</td><td>£47,890</td>` |

Verification method: a temporary vitest file rendered all nine chart
components through `react-dom/server` `renderToStaticMarkup` and asserted the
literal markup above, plus `not.toContain('role="img"')` on every one. 8 test
cases (chart 1 and 2 share one), all passing. The temp test and its temp
vitest config were deleted afterwards. `npx tsc --noEmit` clean; `npx eslint`
on both directories clean. `grep -rn 'role="img"' src/` now returns zero hits
site-wide.

## Reported, not fixed

**`packages/web-shared/`** — swept `packages/web-shared/` for `role="img"`,
`aria-hidden` and chart/SVG components. **Zero hits, and no chart component
exists there at all.** Nothing to report and nothing was touched.

**Sibling `PremiumBarChart.tsx` copies** (report only, not edited):

| Site | Same defect? |
|---|---|
| `construction-cis/web/.../PremiumBarChart.tsx` | yes, 6 hits of `role="img"`/`aria-hidden="true"` |
| `divorce-finances/web/.../PremiumBarChart.tsx` | yes, 2 hits (same double-hide shape) |
| `wills-probate/web/.../PremiumBarChart.tsx` | yes, 2 hits |

**Figures that looked wrong:** none. No chart plotted a value I could not trace
back to its source array.

**Stale comment corrected** (`ContractorIndexCharts.tsx`, monthly chart): the
source claimed "Accessible data table fallback is provided in prose on the
page". That was **false** — the three research pages do carry tables, but they
hold different data (reform-era TTM totals, SIC-division breakdowns, cohort
tables), not the plotted series. Comment updated to point at the real table.

**Pre-existing React warning fixed** (same file family, one line,
`PremiumBarChart.tsx`): the SVG `<title>` was `{s.label}: {formatValue(...)}`,
an array of 3 children, which React logs a warning for on every render and
which browsers do not reliably use as tooltip text. Changed to a single
template-literal child. Same text, no figure change.

## Where the brief was wrong

1. **"`PremiumBarChart.tsx` is byte-identical on two sibling sites."** Not true
   here. MD5 of this site's pre-edit copy (`5ce0a0ce…`) matches none of
   construction-cis (`5682bb16…`), divorce-finances (`bd5c9a1f…`) or
   wills-probate (`d8c15c2e…`), and the three siblings differ from each other
   too. They are four drifted forks that share the same defect, not clones.
2. **The under-count precedent did not repeat.** The handed-over list said nine
   instances; a rule-based sweep of the whole site for `role="img"`,
   `aria-hidden` and `aria-label` on data containers found exactly nine. Every
   other `aria-hidden` hit (24 of them) is a decorative icon, a bullet
   separator, a rule line, or the SpecialistWidget honeypot input — all correct
   uses, none hiding data. The list was right for once.
