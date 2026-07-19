# Query ledger review: construction-cis (tradetaxspecialists.co.uk)

- Site: construction-cis (Trade Tax Specialists)
- Date: 2026-07-17 (GSC data to 2026-07-15, 2-day lag)
- Data window: 90 days, but the site is roughly one month old so effective data is thin. All ambiguous resolutions are biased toward "healthy / too early" per instruction.
- Sampling loss: not reported (null).
- Curve note: expected-CTR curve is very flat and low (0.46% at positions 1-3 falling to 0% beyond position 15), built from only ~48k impressions dominated by the 21+ band (33.5k). Interpolated at positions 1-2 and monotonic-clipped at 5, 7, 9, 10 and 21+. CTR-gap signals are weak and should not drive action on their own.

## Section 1: HOLD pages

None. No pages on this site carry hold=true.

## Section 2: Actions grouped by type (deterministic)

### expand

**/for/roofers** (352 impr, 0 clicks, weighted position 18.6, stable). This is the known "accountant for roofers" opportunity and it shows clearly in the data: three near-identical head queries all sit page 2 with zero clicks. Expanding the page (depth, FAQs, roofing-specific CIS detail) to push these from ~16-22 into the top 10 is the highest-value single action on the site.

| Query | 90d impr | Clicks | Position | CTR vs expected |
|---|---|---|---|---|
| accountants for roofers | 118 | 0 | 15.9 | 0% vs 0% (curve is 0 at this depth) |
| roofers accountant | 117 | 0 | 22.1 | 0% vs 0% |
| accountant for roofers | 116 | 0 | 17.8 | 0% vs 0% |
| cis roofing | 1 | 0 | 35.0 | trivial |

### consolidate_candidate (owner-approval-required)

All three are owner-approval-required and, per the locked rewrite-only rule, collapse is deferred anyway. See Disagreements: on a one-month-old site these calls are premature.

**/locations/birmingham** (29 impr, 0 clicks, position 64.0, stable)

| Query | 90d impr | Clicks | Position | CTR vs expected |
|---|---|---|---|---|
| construction accountants west midlands | 7 | 0 | 40.1 | 0% vs 0% |
| accountant for tradesmen west midlands | 6 | 0 | 55.2 | 0% vs 0% |
| cis accountant cannock | 5 | 0 | 94.6 | 0% vs 0% |

**/locations/bristol** (25 impr, 0 clicks, position 33.4, stable)

| Query | 90d impr | Clicks | Position | CTR vs expected |
|---|---|---|---|---|
| cis tax return bristol | 25 | 0 | 33.4 | 0% vs 0% |

**/contact** (16 impr, 0 clicks, position 79.1, stable)

| Query | 90d impr | Clicks | Position | CTR vs expected |
|---|---|---|---|---|
| cis accountant cannock | 11 | 0 | 73.8 | 0% vs 0% |
| cis accountants cornwall | 4 | 0 | 90.3 | 0% vs 0% |

### meta_fix, refresh, new_page_target (page-level)

None assigned deterministically. New-page targets appear only at query level (Section 6).

## Section 3: Ambiguous resolutions (action_source="llm")

Only 2 ambiguous pages met the 30-impression threshold.

| Page | 90d impr | Resolution | Justification |
|---|---|---|---|
| /locations | 148 | healthy | Index page catching city long-tail queries (cornwall, cannock, norfolk, bristol) at positions 48-85 with zero clicks. That is the index doing its fallback job on a site with a partial city set; the real fix is the query-level new_page_target entries in Section 6 (cannock, bristol), not a change to this page. Too early to act on the page itself. |
| /blog/software-and-tools/cis-payroll-software-guide | 133 | healthy | Position 16.4 overall, best query "cis payroll software" already at 12.0 and "top cis payroll management software in 2026" at 5.2 but on only 12 impressions. Trajectory reads "declining" on tiny weekly counts. Page is comprehensive and current (2026/27, FA 2026 nil-return detail). One watch item: "cis software free" (44 impr) lands here while the dedicated sibling /blog/software-and-tools/free-cis-payroll-software ranks position 2 on its own query with only 2 impressions; if the free-intent queries keep routing to the general guide after another month, revisit as a targeting question. No action now. |

### Thin ambiguous pages (below 30 impressions)

| Count | Total 90d impressions | Classification |
|---|---|---|
| 50 | 136 | Thin, no action yet. Mostly /for/* trade pages, /glossary/* entries and /locations/* city pages from launch. Re-review once the site has 90 real days of data. |

## Section 4: Disagreements with deterministic calls

1. All three consolidate_candidate calls (/locations/birmingham, /locations/bristol, /contact). Disagree with acting on them. The site is about one month old, these pages have 16-29 impressions each, and /locations/bristol owns the exact query ("cis tax return bristol", 25 impr) that also appears as an unowned new_page_target, which is contradictory: the page exists and is the natural home for that query, it just has not matured. The locked estate rule is rewrite-only, never collapse, with consolidation data-gated and owner-approved. Recommend leaving all three untouched and re-running the ledger in 60-90 days. /contact ranking for city queries is a normal young-site artefact, not a consolidation signal.

2. The unowned query "cis tax return bristol" (Section 6) is not genuinely unowned in any useful sense: /locations/bristol already ranks 33.4 for it. Treat it as a maturation case for the existing page, not a new-page target.

## Section 5: Healthy pages

- /glossary/cis-refund (65 impr): ranking on definitional queries, leave alone.
- /locations/london (46 impr): flagship city page maturing normally.
- /cis-refund (41 impr): core service page, normal early trajectory.
- /glossary/cis-deduction (35 impr): definitional traffic, fine.
- /for/drainage-contractors (25 impr): trade page maturing.
- /blog/cis-advanced/cis-limited-company-reclaim (22 impr): fine.
- /blog/cis-refunds/cis-self-assessment-complete-guide (22 impr): fine.
- /for/carpenters (21 impr): trade page maturing.
- /blog/cis-refunds/cis-tax-refund-how-to-claim (19 impr): fine.
- /for/bricklayers (18 impr): trade page maturing.
- /locations/hull (15 impr): fine.
- / (14 impr): homepage, brand-building phase.
- /locations/stoke-on-trent (14 impr): fine.
- /blog/cis-basics/what-is-a-cis-accountant (13 impr): fine.
- /glossary/employment-status (11 impr): fine.
- /gross-payment-status (11 impr): core page, fine.

## Section 6: Unowned queries (new_page_target inputs)

| Query | 90d impr | Best position | Note |
|---|---|---|---|
| cis tax return bristol | 35 | 33.2 | Not truly unowned: /locations/bristol owns 25 of these impressions at 33.4. Maturation, not a new page. |
| cis accountant cannock | 32 | 67.6 | Genuine gap. Impressions scatter across /locations (index), /contact and /locations/birmingham because no Cannock page exists. A /locations/cannock page is a reasonable low-effort candidate once the site earns action, but not urgent at 32 impressions. |

The known "accountant for roofers" opportunity is present but owned: /for/roofers holds all three query variants (351 combined impressions) at page 2. It surfaces as the deterministic expand call in Section 2, which is the correct treatment.

## Top 3 highest-value single actions

1. Expand /for/roofers to break the three "accountant(s) for roofers" variants (351 impr combined) from page 2 into the top 10.
2. Do nothing to the three consolidate candidates; re-run the ledger in 60-90 days (deliberate non-action is the value here, it avoids destroying maturing city pages).
3. Note /locations/cannock as a future city-page candidate (32 impr, no owning page) for the next location wave, not now.
