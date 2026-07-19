# Medical query ledger — medicalaccounts.co.uk

- Site: medical (medicalaccounts.co.uk)
- Date: 2026-07-17 (GSC data to 2026-07-15, 2-day lag)
- Data window: 90 days, with 7d vs prior-21d trajectory windows
- Sampling loss: 41.2% (high; per-query tables understate totals, treat page-level figures as the floor)
- Curve note: the expected-CTR curve is very depressed (0.46% at position 1, effectively 0% beyond position 15) and positions 1-2 are interpolated from thin data. CTR-gap signals are therefore weak on this site. The dominant fact is the known Google discovery failure: most pages have never been crawled, the homepage sits at weighted position 57.8 with 99% of impressions in the 21+ band, and 21+ band impressions (33,508) dwarf every other band combined. Indexing and crawl recovery come before any content optimisation.

## Section 1 — HOLD pages

| Page | Reason | Window closes |
|---|---|---|
| /blog/medico-legal-expert-witness-income-doctors-tax | Ranking maturation (first GSC impression 2026-07-08) | 2026-08-19 |
| /blog/consultant-directors-loan-account-s455-medical-company | Ranking maturation (first GSC impression 2026-07-08) | 2026-08-19 |
| /blog/family-investment-company-doctors-consultants | Ranking maturation (first GSC impression 2026-07-15) | 2026-08-26 |
| /blog/salary-vs-dividend-medical-limited-company-2026 | Ranking maturation (first GSC impression 2026-07-15) | 2026-08-26 |

No changes proposed to these four pages. Note their windows overlap the site-wide fix-wave watch (14/28 day checks around 2026-07-20 and 2026-08-03), so their first read-out should be folded into that verdict email.

## Section 2 — Actions grouped by type

No deterministic meta_fix, expand, refresh, consolidate_candidate or new_page_target page actions were produced for this site. This is consistent with the discovery failure: pages that Google has never properly crawled cannot generate reliable CTR-gap or trajectory signals, so the pipeline correctly resolved everything to healthy, hold or ambiguous.

The only actionable output is the unowned-query set (Section 6), and even there the correct first move is indexing, not new pages: every unowned head query already maps to the homepage (it appears in the homepage's own top_queries at positions 42-80), so the site is not missing pages, it is missing crawl and rank.

## Section 3 — Ambiguous resolutions (action_source="llm")

### /blog/gp-partner-vs-salaried-gp-tax-comparison — resolved: healthy

212 impressions and 6 clicks over 90 days makes this the best-converting page on the site, and it holds Bing page-1 positions (1-4) across a wide spread of partner-vs-salaried queries with 2 Bing clicks. The GSC side is empty of queries (query_data_thin) purely because of the discovery failure, not page weakness. The source file is a recent Opus track-2 rewrite (dateModified 2026-06-12) with current 2025/26 and 2026/27 figures, strong FAQ schema content and an already-optimised meta from the SERP meta programme. Nothing on the page needs changing; it needs Google to crawl it.

Evidence (Bing snapshot, top owning queries):

| Query | Impr | Clicks | Position |
|---|---|---|---|
| gp partners returning as salaried employee | 2 | 1 | 1.0 |
| salaried gp vs gp partner | 2 | 0 | 1.0 |
| gp partnership national insurance | 2 | 0 | 2.0 |
| hmrc how gp partners income | 2 | 0 | 3.0 |
| how much does a self employed gp pay in superannuation uk | 2 | 1 | 9.0 |

### Ambiguous pages below 30 impressions_90d — thin, no action yet

| Count | Pages | Total impressions_90d |
|---|---|---|
| 3 | /blog/locum-doctor-self-assessment-filing-guide (26), /blog/gp-limited-company-tax-benefits-drawbacks (3), /blog/gp-partnership-mutual-assessment-period-what-to-check (1) | 30 |

Bulk-classified as thin. Re-assess once the indexing fix wave has had its 28-day window.

## Section 4 — Disagreements with deterministic calls

None. All five healthy calls are defensible given the constraint that the whole site is discovery-starved:

- Homepage marked healthy despite 2,083 impressions at position 57.8 and 0.1% CTR. Under normal conditions this would be a strong meta_fix or expand candidate for "gp accountants" (1,295 impressions, position 53). But nothing about the title or content moves a page from position 53 to page 1; only crawl and authority recovery does. Healthy is the right no-touch call for now, and this page becomes the first re-review target once indexing recovers.
- becoming-gp-partner-financial-implications, gp-accounting-guide, buying-into-gp-partnership-capital-parity-explained and nhs-pension-scheme-pays-doctors-deadlines are all low-volume pages ranking pages 2-5 with Bing page-1 spot placements. Same logic applies.

## Section 5 — Healthy pages

- https://medicalaccounts.co.uk/ — 2,083 impressions, position 57.8; owns all site head terms; blocked by discovery failure, not by the page itself.
- /blog/becoming-gp-partner-financial-implications — 77 impressions, dormant; some page-1 impressions for "salaried gp vs gp partner"; Bing click on partnership-buy-in query.
- /blog/gp-accounting-guide — 42 impressions, improving trajectory (+125%); Bing page-1 placements including a click.
- /blog/buying-into-gp-partnership-capital-parity-explained — 35 impressions at position 21.3, the best average position on the site; nearly half of impressions in the 11-15 band; Bing click on capital-account query.
- /blog/nhs-pension-scheme-pays-doctors-deadlines — 17 impressions, trivial volume; queries are broad pension terms; leave until crawled.

## Section 6 — Unowned queries (new_page_target inputs)

| Query | Impr 90d | Best position | Note |
|---|---|---|---|
| gp accountants | 1,299 | 49.5 | Homepage already owns this (1,295 of its impressions); duplicate of homepage demand, not a page gap |
| medical accountants uk | 200 | 58.0 | Same; homepage owns it |
| gp practice accountants | 149 | 77.8 | Same; homepage owns it |
| specialist medical accountants | 83 | 63.3 | Same; homepage owns it |
| gp accountant | 76 | 44.2 | Same; homepage owns it |
| medical accounting | 32 | 78.2 | Same; homepage owns it |
| accounting specialists for medical professionals | 30 | 49.8 | Same; homepage owns it |

All seven "unowned" queries are in fact owned by the homepage in its own query table; the deterministic ownership threshold simply did not attach them because of the terrible positions. Recommendation: build no new pages for these. They are homepage head terms and any new page would cannibalise it. The route to owning them is the indexing fix wave plus authority, then a homepage review once Google positions become meaningful.

## Summary

Counts: healthy 5 (deterministic) + 1 (llm) = 6; hold 4; thin no-action 3; meta_fix 0; expand 0; refresh 0; consolidate_candidate 0; new_page_target 0 (all 7 unowned queries reclassified as homepage-owned, no new pages).

Three highest-value single actions for this site:

1. Complete and verify the Google indexing recovery (fix wave shipped 2026-07-06, watch windows ~2026-07-20 and 2026-08-03). This is worth more than every content action combined; 92% of pages have never been crawled and the homepage sits at position 58 for 1,299-impression head terms.
2. At the 28-day watch verdict, re-run this ledger. If crawl coverage has improved, the homepage becomes the single highest-value optimisation target (all seven head queries, ~1,870 combined impressions, currently 2 clicks).
3. Do nothing to page content in the meantime. In particular, do not create pages for the "unowned" head queries; they belong to the homepage and new pages would split what little signal exists.
