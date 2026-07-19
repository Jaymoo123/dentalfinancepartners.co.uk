# Agency query ledger review

- Site: agency (agencyfounderfinance.co.uk)
- Date: 2026-07-17
- Data window: 90 days to 2026-07-15 (GSC lag 2 days); Bing trailing-aggregate snapshot only.
- Sampling loss: 37.4% of impressions not attributable to sampled query rows.
- Curve note: expected-CTR curve is thin and partly interpolated (positions 1-2 interpolated from position 3; several bands monotonic-clipped; positions 16+ expected CTR is 0). CTR-gap signals on this site are weak and should be treated as directional only.

**SITE-WIDE CAVEAT: the whole site is inside an open post-fix signal window (fix wave deployed 2026-07-08; checkpoints 2026-07-22 and 2026-08-05). Every action in this ledger carries the caveat "execute only after window closes". No new content is proposed into the window.**

## Section 1 — HOLD pages

No individual pages carry hold=true in the ledger JSON. The effective hold is site-wide:

| Page | Reason | Window closes |
|---|---|---|
| All 40 pages (entire site) | Agency crawl-budget fix wave shipped 2026-07-08; signal window open, no changes allowed into it | 2026-07-22 (14d) / 2026-08-05 (28d) |

## Section 2 — Actions grouped by type

All actions below: execute only after window closes (2026-07-22 at the earliest; prefer 2026-08-05 for content-level changes).

### meta_fix
None assigned deterministically. See Disagreements for two pages I would move here or to refresh.

### expand

**/glossary/vat-threshold** (159 impr 90d, 0 clicks, weighted position 76.5, trajectory emerging). Deterministic call. A burst of emerging generic VAT-registration queries in the last 7 days, all at deep positions. A glossary stub cannot own these; an expanded page covering the £90k threshold, registration mechanics and agency-specific angles could. Execute only after window closes.

| Query | 90d impr | Clicks | Position | CTR vs expected |
|---|---|---|---|---|
| self employed vat threshold | 17 | 0 | 78.8 | 0 vs 0 |
| vat threshold | 16 | 0 | 89.0 | 0 vs 0 |
| how much do you have to earn to be vat registered | 7 | 0 | 72.8 | 0 vs 0 |
| how much to be vat registered | 7 | 0 | 64.1 | 0 vs 0 |
| vat threshold uk | 7 | 0 | 78.7 | 0 vs 0 |
| vat registration limit | 5 | 0 | 96.9 | 0 vs 0 |

### refresh

**/blog/tax-and-compliance/aia-capital-allowance-agency-equipment** (my call, see Section 3). Execute only after window closes.

### consolidate_candidate
None. (Any future consolidation is owner-approval-required and additionally gated by the rewrite-only rule.)

### new_page_target

Inputs listed in Section 6. Per the window constraint, no new pages are proposed now; re-evaluate after 2026-08-05 with fresh data. Note two of the four unowned queries should probably never become agency pages (see Section 6 notes).

## Section 3 — Ambiguous resolutions (action_source="llm")

Only 2 of the 30 ambiguous pages have impressions_90d >= 30. Both were read at source (`digital-agency/web/content/blog/`).

**1. /blog/international-agencies/hiring-remote-employee-spain-uk-agency-tax-compliance** (122 impr, 1 click, no sampled query rows, no position data) → **healthy**. The page is a comprehensive, well-structured guide with FAQ schema, and its meta was already rewritten on 2026-06-12 under the SERP meta programme. With zero query-level data (all impressions fell into the 37.4% sampling loss) there is no evidence base for any targeted change; it also earned the site's only click among ambiguous pages. Leave alone and re-check when query data surfaces after the window.

**2. /blog/tax-and-compliance/aia-capital-allowance-agency-equipment** (49 impr, 0 clicks, no sampled query rows) → **refresh**. The page states the writing-down allowance as "18% per year" (body and FAQ). Under FA 2026 the main-rate WDA fell from 18% to 14% and a new 40% FYA was introduced, so the page is factually stale for 2026/27, and capital-allowance queries are demonstrably the site's biggest impression source (AIA cluster: 340 + 84 + 53 unowned impressions). A factual FA 2026 refresh is warranted regardless of query data. Execute only after window closes; this is a factual back-patch, manager-direct per locked rule.

**Thin ambiguous pages (below 30 impressions): no action yet.**

| Group | Pages | Total 90d impressions |
|---|---|---|
| Ambiguous, impressions_90d < 30, bulk-classified thin | 28 | 157 |

These are mostly Dubai/UAE cluster posts, growth-and-exit posts and glossary stubs, each 1-20 impressions. Many were first seen late May 2026 and are inside the ranking-maturation window on top of the site-wide signal window. Reassess in the next ledger run.

## Section 4 — Disagreements with deterministic calls

1. **/blog/tax-and-compliance/annual-investment-allowance-2024-25 — deterministic healthy, I say refresh (title and tax-year update).** 340 impressions is the second-highest page on the site, 0 clicks, and the slug and title anchor it to the 2024-25 tax year in July 2026. The estate audit (ESTATE_AUDIT_2026-07-17.md) independently flags an "AIA-2024/25 title refresh (614 impr, stale tax-year title)". A page targeting "annual investment allowance" head terms with a two-year-old year label is not healthy. Execute only after window closes.

2. **/agencies/pr-agencies — deterministic healthy, I say expand.** 525 impressions (highest on the site), 0 clicks, weighted position 32, all impressions in the 21+ band, trajectory stable. The estate audit flags a "pr-agencies rewrite (554 impr pos 32)". A stable page-3 position on the site's biggest query cluster ("accountants for pr agencies", 235 impr) is a strengthening candidate, not a healthy one. One caution: the second query, "pr agency for accountants" (166 impr), is reverse intent (firms seeking PR services) and should not shape the rewrite. Execute only after window closes.

JSON left unchanged in both cases.

## Section 5 — Healthy pages

- /agencies/pr-agencies: 525 impr, page 3 on its core cluster (but see Disagreement 2).
- /blog/tax-and-compliance/annual-investment-allowance-2024-25: 340 impr on AIA head terms (but see Disagreement 1).
- /glossary/cis: 246 impr on "cis accountant" terms at position 70, all trivial trajectory; CIS is construction-cis territory, so deep positions here are acceptable.
- /blog/international-agencies/uae-corporate-tax-registration-threshold-small-agency-founder: 54 impr, all trivial, deep positions.
- / (homepage): 49 impr on generic "agency finance" terms, dormant; brand queries will define this page post-window.
- /blog/making-tax-digital/mtd-software-xero-agency-reporting: 36 impr, stable, deep positions.
- /agencies/creative-agencies: 27 impr, trivial, matches core service intent.
- /glossary/aia: 24 impr, trivial; feeds the AIA cluster.
- /blog/making-tax-digital/missed-mtd-filing-deadline-penalties-appeals-mitigation: 11 impr, healthy at low volume.

## Section 6 — Unowned queries (new_page_target inputs)

| Query | 90d impr | Best position | Deterministic action | Note |
|---|---|---|---|---|
| pr agency for accountants | 166 | 34.4 | new_page_target | Reverse intent (buyers of PR for accountancy firms). Do not build; would attract wrong traffic. |
| cis accountant | 138 | 70.3 | new_page_target | Belongs to construction-cis (Trade Tax Specialists), not the agency site. Do not build here; cross-site cannibalisation risk. |
| annual investment allowance | 84 | 48.1 | new_page_target | Better served by refreshing the existing AIA 2024-25 page (Disagreement 1) than a new page. |
| annual investment allowance calculator | 53 | 34.0 | new_page_target | Genuine candidate: an AIA calculator tool page. Consider only after window closes and after the AIA refresh has matured. |

All new-page decisions deferred until after 2026-08-05. Execute only after window closes.
