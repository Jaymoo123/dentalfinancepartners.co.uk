# Google Read — agencyfounderfinance.co.uk (B1 battery step)

**DATA-TRUST HEADER:** GSC data exists 2026-05-17 to 2026-07-06 (51 days). No data before mid-May — site registered ~2026-04-15 but Google discovery lag means first impression only appeared 2026-05-17. Generalist benchmark data runs 2026-05-18 to 2026-06-27 (41 days). All vs-generalist comparisons use the shared window 2026-05-18 to 2026-06-27 to avoid window-length artefacts. Last 28d = 2026-06-09 to 2026-07-06. Data fresh through 2026-07-06.

Raw artifact: `.cache/agency_diag/google_segments.json`

---

## 1. Headline totals

| Metric | Full window (51d) | Last 28d |
|--------|-------------------|---------|
| Impressions | 1,908 | 885 |
| Clicks | 2 | 2 |
| CTR | 0.10% | 0.23% |
| Pages with impressions | 40 | 26 |
| Sitemap URLs (approx) | 433 | — |
| Page coverage | **9.2%** | — |
| Impr/day | 37.4 | **31.6** |

Source: `gsc_page_performance` (niche='agency').

The site is alive in Google's index but barely. 40 of ~433 sitemap pages have ever earned an impression — 9.2% coverage. Two clicks in 51 days. The 37.4 impr/day full-window figure is inflated by a spike in week 2 (week of 2026-05-18: 574 impressions); the last 28d rate is actually lower at 31.6/day, indicating the week-2 spike was a one-off crawl/discovery burst, not growth.

---

## 2. Weekly trend

| Week start | Impressions | Clicks |
|------------|-------------|--------|
| 2026-05-11 | 22 | 0 |
| 2026-05-18 | **574** | 0 |
| 2026-05-25 | 215 | 0 |
| 2026-06-01 | 186 | 0 |
| 2026-06-08 | 198 | 0 |
| 2026-06-15 | 243 | 0 |
| 2026-06-22 | 221 | 2 |
| 2026-06-29 | 221 | 0 |
| 2026-07-06* | 28 | 0 |

*Partial week (data through 2026-07-06, Monday).

**Trend verdict: FLAT with a decayed spike.** The week of 2026-05-18 produced 574 impressions — approximately 2.5x any subsequent week. This is characteristic of a first Google crawl/discovery burst when a new site is initially processed. After that burst decayed, weekly impressions stabilised in the 186-243 range with no discernible growth trajectory from late May through end of June. The 221/221 pair in weeks of 2026-06-22 and 2026-06-29 confirms flat, not growing. This is not a site in organic momentum; it is a site where Google has settled at a low steady-state impression level after the discovery spike.

Zero-click weeks: 8 of 9 complete weeks produced zero clicks. The two total clicks came in a single week (2026-06-22).

---

## 3. Page coverage gap

40 pages with any GSC impression out of ~433 sitemap URLs = **9.2% coverage**. This is the most structurally alarming number in the Google read.

For comparison: medical at diagnosis had ~9 pages with impressions from ~112 sitemap URLs (8% coverage), and the root cause was a combination of phantom canonicals and thin discovery. Medical recovered sharply once fixed. Agency's coverage gap is similar in magnitude but has a different likely cause — the site has been live ~12 weeks and 91% of its pages have never appeared in a Google search result.

The 40 pages that do have impressions span glossary pages, blog posts across multiple clusters (international, tax, MTD), and two /agencies/ landing pages. The /agencies/pr-agencies page leads all impressions (468) despite having zero clicks — see section 4.

---

## 4. Top pages: the position-volume trap

### Top 10 pages by impressions

| Page | Impr | Clicks | Avg pos |
|------|------|--------|---------|
| /agencies/pr-agencies | 468 | 0 | 32.1 |
| /blog/tax.../annual-investment-allowance-2024-25 | 453 | 0 | 48.3 |
| /glossary/cis | 253 | 0 | 72.8 |
| /blog/intl/dubai-free-zone-minimum-office-space... | 121 | 0 | 9.8 |
| /blog/intl/hiring-remote-employee-spain... | 102 | **1** | 7.6 |
| /glossary/vat-threshold | 64 | 0 | 68.2 |
| /blog/intl/uae-corporate-tax-registration-threshold... | 64 | 0 | 59.9 |
| / (homepage) | 49 | 0 | 51.3 |
| /blog/tax.../aia-capital-allowance-agency-equipment | 44 | 0 | 10.2 |
| /blog/mtd/mtd-software-xero-agency-reporting | 43 | 0 | 48.5 |

The homepage (49 impressions, avg position 51.3, zero clicks) is invisible for all commercial head terms. The leading impression page — /agencies/pr-agencies — sits at position 32.1 and generates zero clicks. The AIA blog post (453 impressions) sits at position 48.3 — deep non-click territory.

A cluster of international-agency blog posts shows strong near-page-1 positions (7.6, 9.8, 9.7, 8.5, 6.4, 8.3, 6.1, 5.9, 5.4) but very low impression volumes (6-121 per page). These are low-volume long-tail terms; the positions are real but the audience size is tiny. The only page to have generated a click is /blog/intl/hiring-remote-employee-spain (1 click, pos 7.6) and /malta-relocation (1 click, pos 22.9).

**The site has no page earning both high position and meaningful impression volume simultaneously.**

---

## 5. Top queries: wrong traffic and CIS bleed

### Top 10 queries by impressions

| Query | Impr | Clicks | Avg pos |
|-------|------|--------|---------|
| accountants for pr agencies | 202 | 0 | 28.1 |
| pr agency for accountants | 143 | 0 | 40.1 |
| cis accountant | **138** | 0 | **70.3** |
| accounting for pr agencies | 66 | 0 | 24.8 |
| annual investment allowance | 62 | 0 | 69.0 |
| annual investment allowance calculator | 51 | 0 | 51.4 |
| investment allowance | 27 | 0 | 83.7 |
| aia allowance | 26 | 0 | 69.0 |
| accountancy pr agency | 19 | 0 | 44.8 |
| agency accounting | 18 | 0 | 75.1 |

Two notable problems:

**"cis accountant" (138 impressions, position 70.3):** CIS is Construction Industry Scheme — a completely different sector. The agency site is ranking for construction-industry accountant queries, almost certainly because of content overlap or the /glossary/cis page. These impressions are wasted; the audience has no intent to hire an agency-sector accountant. This is topic leakage from the construction-cis sibling site or cross-contamination from shared glossary content.

**"pr agency for accountants" (143 impressions, position 40.1):** This query means "a PR firm that serves accountancy businesses" — the reverse of the target audience. The site's own head term is "accountants for pr agencies" (position 28.1). Google is conflating the service-direction and surfacing the page for backward-intent queries. Neither converts.

The absence of "agency accountants", "accountants for marketing agencies", "creative agency accountants" or "agency founder finance" from the top 25 is diagnostic — the site has essentially no impression volume on its own brand/primary terms.

---

## 6. vs Generalist benchmark (shared window 2026-05-18 to 2026-06-27, 41 days)

| Metric | Agency | Generalist | Gap |
|--------|--------|-----------|-----|
| Total impressions | 1,602 | 15,997 | **10x** |
| Clicks | 2 | 51 | 26x |
| Pages with impressions | 40 | 515 | 13x |
| Impr/day | 39.1 | 390.2 | **10x** |
| Distinct queries | 209 | 1,275 | 6x |

Generalist is the same-age site benchmark (both live since ~April 2026). Generalist shows a strongly growing weekly trend: 1,126 → 603 → 1,731 → 4,658 → 4,598 → 3,281 over 6 weeks, culminating at ~4,000-4,600/week in mid-June before a slight drop. Agency flatlined at 186-243/week over the same period.

The 10x impression gap at equal site age is not explained by content volume alone (agency has ~433 sitemap URLs, generalist presumably similar). The gap in distinct queries (6x) and especially pages-with-impressions (13x) points to a discovery/crawl problem: Google has not indexed or is not surfacing the vast majority of agency's content.

Generalist's weekly growth trajectory (1,126 to 4,658 over 5 weeks) represents the expected organic pattern for a new niche site with content being discovered. Agency shows no equivalent growth — the 574-week was a one-off, not the start of a compounding trend.

---

## 7. Overall verdict: discovery failure + wrong traffic, not just youth

**The shape is STRUCTURAL DISCOVERY FAILURE compounded by topic leakage. This is not normal youth.**

Evidence:
- 9.2% page coverage (40/433) after 12 weeks is abnormally low. Medical at diagnosis had 8% coverage but with a confirmed canonical fault causing phantom-404. Agency needs a B3 index coverage sweep to identify the structural cause.
- The weekly trend is flat (186-243/week) not growing. A healthy new site accelerates; agency stalled immediately after the first-crawl spike.
- CIS accountant impressions (138) from the wrong sector is content contamination producing wasted impression volume.
- Primary commercial terms — "accountants for agencies", "agency accountants", "creative agency accountants" — appear only at position 24-40 with volumes of 15-202. None have generated a click.
- The international-agency cluster (Dubai, Spain, UAE tax) ranks well (pos 6-10) but on ultra-low-volume long-tail terms with a narrow audience. These are good for E-E-A-T signals but will never drive lead volume at current scale.
- vs generalist: 10x impression gap, 26x click gap, 13x page-coverage gap at equal site age. The generalist benchmark shows the gap is not explained by site maturity — generalist was growing, agency was flat, over the same calendar weeks.

**Single most diagnostic observation:** The homepage sits at position 51.3 with only 49 total impressions across 51 days. On sibling sites (medical, property, generalist) the homepage typically leads impressions even when ranking poorly, because it has the most inbound signals. Agency's homepage is almost invisible to Google — suggesting either a crawl/indexing problem at the root domain level, or the homepage has no competitive footprint on any query, or both. B3 index coverage sweep is the critical next step.
