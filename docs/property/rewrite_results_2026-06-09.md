# Property rewrite/meta-change results — preliminary read (2026-06-09)

## What this is
Early before/after for the Track-2 ranking-grade rewrites (which changed
`metaTitle`/`metaDescription` plus body), live **2026-05-31 to 06-02**, tracked
via `monitored_pages`. The user asked to "see the results ~10 days on."

## Two blockers found first
1. **GSC data was stale.** `gsc_page_performance` (niche='property') had only
   ingested to **2026-05-19** — before the changes. The optimisation/GSC pipeline
   is run manually and had not been run in ~3 weeks. **Fixed:** re-ran
   `GSCPageFetcher`/`GSCQueryFetcher` (days=90); data now current to
   **2026-06-07** (6,333 page rows + 6,439 query rows). The page fetcher itself
   is healthy (auth fine) — it simply had not been run. It WILL go stale again
   without a schedule.
2. **Too early + zero baselines.** 470 of 471 monitored pages had **0 clicks** at
   baseline (new/maturing pages). So clicks/CTR cannot show a result yet; the
   meaningful early metric is **impressions + average position**.

## Method
- Scope: 118 monitored pages with `rewrite_date >= 2026-05-30` (the recent batch).
- Pre = 14 days before each page's `rewrite_date`; Post = `rewrite_date` → 06-07
  (~6 days). Source: `gsc_page_performance`, impression-weighted avg position.
- **Join on slug**, not URL: `monitored_pages.page_url` is stored FLAT
  (`/blog/<slug>`) while live/GSC URLs are NESTED (`/blog/<category>/<slug>`), so
  a URL join misses. (This mismatch likely also weakens the regression detector,
  which joins on URL — worth fixing.)

## Headline (preliminary, directional)
- **Impressions/day up ~39%**: ~167/day (pre, 14d) → ~233/day (post, ~6d).
- **Clicks flat**: 16 (pre 14d) → 6 (post ~6d), ~1/day both — expected this early.
- **71 of 118** changed pages already have post-change impressions.

## Early winners — position gains (>=20 post impressions)
| Page | Position pre → post | Impr pre→post |
|---|---|---|
| landlord-expenses-allowable-uk-2026 | 63.4 → **4.2** | 39→76 |
| tax-sell-rental-property-uk | 32.1 → **11.9** | 355→64 |
| writing-down-allowance-cars | 17.5 → **9.2** | 59→151 |
| writing-down-allowance-rates | 16.7 → **8.7** | 45→90 |
| mortgage-interest-deductible-landlords-uk-2026 | 14.3 → **6.6** | 40→35 |
| sa105-property-income-form-2026-complete-guide | 12.1 → **6.8** | 48→48 |

Top by post impressions also include landlord-tax-deductions-uk-2026 (83→196 impr,
pos 7.4→5.8) and writing-down-allowance-cars (59→151 impr).

## Watch (position slipped — mostly low/noisy)
- tax-relief-mortgage-interest-rented-property-guide 40.3 → 53.9 (page 4→5, small impr)
- penalties-not-declaring-rental-income-hmrc 3.0 → 7.3 (tiny pre impr; noisy)
- incorporation-existing-portfolios-phased-approach 16.0 → 17.5 (flat)

## Honest caveats
- Only ~6 days of post-change data; GSC lag 2-3 days. **Directional only.**
- Zero-click baselines → clicks/CTR results need a **~4-8 week** revisit.
- Position deltas mix query-set shifts over a short window; treat per-page numbers
  as indicative, the aggregate impressions lift as the more reliable signal.
- Impressions lift isn't isolated from general indexation growth (no control).

## Follow-ups
- Schedule the GSC pull so data does not go 3 weeks stale again. (Still open;
  offered as a weekly /schedule.)
- ~~Fix `monitored_pages` flat-URL storage so the regression detector joins GSC
  correctly.~~ **Investigated 2026-06-09: not a bug.** `monitored_pages.page_url`
  is stored NESTED (`/blog/<category>/<slug>`), and `detect_monitored_page_regression`
  already tags GSC rows by slug suffix (`page_url ILIKE '%/<slug>'`), so it
  matches the nested live/GSC URLs correctly. The flat-vs-URL mismatch only bit
  the ad-hoc analysis in this report (which joined `gsc_page_performance` on a
  path vs the stored full `https://` URL). 188/471 active pages match GSC in 28d;
  the other 283 simply have no GSC impressions yet (maturing, zero baseline).
  No code change warranted.
- Revisit this report in ~4-8 weeks for the click/CTR read.
