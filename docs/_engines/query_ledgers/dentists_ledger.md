# Query ledger — dentists (dentalfinancepartners.co.uk)

- Site: dentists (Dental Finance Partners)
- Date: 2026-07-17
- Data window: 90 days of GSC to 2026-07-15 (2-day lag), plus Bing snapshot queries
- Sampling loss: 52.9% of impressions are not attributable to sampled queries, so per-query evidence understates true volumes
- Curve note: the expected-CTR curve is site-derived and very depressed (positions 1-2 interpolated from position 3 at 0.46%, positions 16+ at 0%). The site has 12 clicks across 39 pages in 90 days, so CTR-gap signals are weak and directional only. Position and trajectory carry more weight than CTR gap in the calls below.
- Deployment note: 18 committed pages (gap-fill Waves 1 and 2, commits f7dda599 and 09b4448d, 2026-07-14) are built but not yet deployed. None of them appear in this ledger because they have no impressions yet. Separately, the site's legacy flat blog URLs (/blog/{slug} without a category segment) now 404 under the current /blog/[category]/[slug] routing; their content files exist and canonicalise to the categorised URLs. This affects three ledger rows, flagged below.

## Section 1 — HOLD pages (do not touch until window closes)

| Page | Reason | Window closes |
|---|---|---|
| /blog/buying-a-practice/dental-practice-goodwill-buying-selling | Ranking maturation (first impression 2026-06-23) | 2026-08-04 |
| /blog/buying-a-practice/dental-practice-valuation-methods-uk | SERP meta batch-2 28d outcome watch | 2026-08-05 |
| /blog/associate-tax/dentist-pension-contributions-tax-relief-uk | SERP meta batch-2 watch (2026-08-05) and ranking maturation (first impression 2026-06-28) | 2026-08-09 |
| /for-associates | Ranking maturation (first impression 2026-06-27) | 2026-08-08 |

## Section 2 — Actions grouped by type

### meta_fix

**/blog/practice-finance/how-to-pay-yourself-dental-practice-owner-uk** (action_source=llm, 83 impr, 0 clicks, pos 11.8, declining)

| Query | 90d impr | Clicks | Position | CTR vs expected |
|---|---|---|---|---|
| dental practice owner salary | 17 | 0 | 4.9 | 0% vs 0.43% |
| how much does a dental practice owner make uk | 12 | 0 | 4.4 | 0% vs 0.43% |
| clinic owner take home pay uk | 10 | 0 | 25.2 | 0% vs 0% |
| how much does a dental practice owner make | 7 | 0 | 6.0 | 0% vs 0.09% |

### expand

**/blog** (action_source=deterministic, 175 impr, 0 clicks, pos 43.0)

| Query | 90d impr | Clicks | Position | CTR vs expected |
|---|---|---|---|---|
| dental accounting | 49 | 0 | 66.8 | 0% vs 0% |
| dental practice tax | 15 | 0 | 19.4 | 0% vs 0% |
| tax dental practice | 14 | 0 | 17.2 | 0% vs 0% |

See Disagreements: the queries landing here are head service terms better served by the homepage or a new service page, not by expanding a blog index.

**/blog/dental-practice-software-accounting-integration** (action_source=deterministic, 50 impr, 0 clicks, pos 16.4)

See Disagreements: this is a legacy flat URL variant that now 404s; it should not be expanded.

**/blog/nhs-contracts/uda-value-explained-for-uk-dentists** (action_source=llm, 485 impr, 7 clicks, pos 10.7, stable) — moved here from ambiguous, see Section 3.

| Query | 90d impr | Clicks | Position | CTR vs expected |
|---|---|---|---|---|
| nhs uda rates | 167 | 3 | 9.4 | 1.80% vs 0.07% |
| uda value checker | 91 | 3 | 9.4 | 3.30% vs 0.07% |
| uda rate | 20 | 1 | 6.4 | 5.00% vs 0.09% |
| what is a uda | 19 | 0 | 9.8 | 0% vs 0.07% |

**/blog/practice-accounting/dental-accountant-london-how-to-choose-specialist** (action_source=llm) — moved here from ambiguous, see Section 3.

| Query | 90d impr | Clicks | Position | CTR vs expected |
|---|---|---|---|---|
| specialist dental accountants london | 88 | 0 | 11.7 | 0% vs 0.05% |
| dental tax accountant london | 29 | 0 | 14.6 | 0% vs 0.05% |
| dentist accountants near me | 28 | 0 | 60.3 | 0% vs 0% |
| specialist accountants for dentists | 11 | 0 | 30.0 | 0% vs 0% |

### refresh

**/** (homepage, action_source=llm) — see Section 3.

| Query | 90d impr | Clicks | Position | CTR vs expected |
|---|---|---|---|---|
| accountants for dentists | 1,157 | 0 | 53.4 | 0% vs 0% |
| dental accountants | 858 | 0 | 59.8 | 0% vs 0% |
| specialist dental accountants | 709 | 1 | 41.9 | 0.14% vs 0% |
| dental accounting | 252 | 0 | 71.7 | 0% vs 0% |

**/blog/practice-accounting/dental-practice-software-accounting-integration** (action_source=llm) — see Section 3.

| Query | 90d impr | Clicks | Position | CTR vs expected |
|---|---|---|---|---|
| accounting software for dental clinics | 81 | 0 | 10.1 | 0% vs 0.07% |
| cloud accounting for dentists | 41 | 0 | 9.1 | 0% vs 0.07% |
| xero dental accounting | 13 | 0 | 6.4 | 0% vs 0.09% |

### consolidate_candidate (owner approval required)

**/blog/dental-practice-goodwill-buying-selling** (action_source=deterministic, 10 impr, declining). Legacy flat URL variant of /blog/buying-a-practice/dental-practice-goodwill-buying-selling (which is on HOLD until 2026-08-04). The flat route now 404s under current routing; the fix is a 301 to the canonical categorised URL, not a content merge. The rewrite-only rule is not engaged because both URLs serve the same content file.

**/blog/associate-dentist-agreements-financial-clauses** (action_source=llm, 85 impr, 1 click). Same flat-URL situation; canonical is /blog/associate-tax/associate-dentist-agreements-financial-clauses. Redirect, not merge.

**/blog/self-assessment-registration-dentist-uk** (action_source=llm, 49 impr, 0 clicks). Same flat-URL situation; canonical is /blog/associate-tax/self-assessment-registration-dentist-uk. Redirect, not merge.

I would add /blog/dental-practice-software-accounting-integration (50 impr) and /blog/dentist-self-assessment-filing-guide-2026 (18 impr) to the same redirect batch, since they are the same class of dead flat URL.

### new_page_target

No page-level new_page_target calls. See Section 6 for the unowned head-term cluster, which is the single biggest opportunity on this site.

## Section 3 — Ambiguous resolutions (action_source=llm)

Twelve ambiguous pages had 30 or more impressions and were resolved individually after reading the source files in Dentists/web/content/blog.

| Page | Impr 90d | Resolution | Justification |
|---|---|---|---|
| / | 4,837 | refresh | Homepage sits at position 42-72 on the head terms (accountants for dentists, dental accountants) that make up nearly all site demand; this is a relevance and authority problem on an existing page, so a corepage-engine refresh, not a new page. |
| /blog/nhs-contracts/uda-value-explained-for-uk-dentists | 485 | expand | Best performer on the site (7 clicks, position 9-11, CTR far above expected). "uda value checker" (91 impr) is tool intent the 3,100-word article does not serve; adding a UDA value checker element plus band-rate coverage is the natural page-1 push. |
| /blog/practice-accounting/dental-accountant-london-how-to-choose-specialist | 165 | expand | Ranks 11.7 for "specialist dental accountants london" (commercial intent) but is a thin 1,553-word chooser listicle, declining, and cannibalising the homepage on near-me and London queries. Expand into the site's genuine London specialist page so it clearly owns the London cluster. |
| /blog/practice-accounting/dental-practice-software-accounting-integration | 156 | refresh | Position 9.7 but the whole query set has gone dormant (trajectory -100%); the meta was already rewritten once with no effect. The 2026-03 content needs a de-stale pass aligned to "accounting software for dental clinics" comparison intent (current tools, pricing, Xero integrations). |
| /blog/associate-tax/dentist-self-assessment-filing-guide-2026 | 142 | healthy | query_data_thin (no sampled queries at 52.9% sampling loss). Source is a solid 3,063-word guide, sources verified 2026-06-03, MTD-current. No evidence of a problem; revisit when query data exists. |
| /blog/practice-finance/hiring-first-associate-costs-structure-uk-dental | 93 | healthy | query_data_thin. 3,586-word guide with current 15%/£5,000 employer NIC figures, verified 2026-06-03. Nothing actionable without query evidence. |
| /blog/associate-dentist-agreements-financial-clauses | 85 | consolidate_candidate | Legacy flat URL that now 404s; content file canonicalises to /blog/associate-tax/associate-dentist-agreements-financial-clauses. Needs a 301, owner approval required. Source exists but this URL is no longer live under current routing. |
| /blog/practice-finance/how-to-pay-yourself-dental-practice-owner-uk | 83 | meta_fix | Positions 4.4-6.0 on "dental practice owner salary" and "how much does a dental practice owner make uk" with zero clicks against a 0.43% expected CTR. The title leads with "How to Pay Yourself, Salary vs Dividend", which does not answer the earnings-figure intent searchers have; rework meta to surface the take-home numbers. |
| /blog/associate-tax/when-hmrc-may-challenge-associate-self-employment | 73 | healthy | query_data_thin. 2,646-word status-risk guide with current 15% employer NIC figure. No query evidence of a fixable problem. |
| /blog/associate-tax/self-assessment-registration-dentist-uk | 69 | healthy | query_data_thin but 2 of the site's 12 clicks. Comprehensive, verified 2026-06-03, correct 5 October and MTD framing. Leave alone. |
| /blog/locum-tax/dft-to-dct-specialty-training-pay-tax-progression | 53 | healthy | query_data_thin and only first seen 2026-06-06, so still inside a reasonable ranking-maturation period. Long, current source file. No action yet. |
| /blog/self-assessment-registration-dentist-uk | 49 | consolidate_candidate | Legacy flat URL, 404s under current routing; canonical is the /blog/associate-tax/ version. 301 redirect, owner approval required. |

### Ambiguous below 30 impressions (bulk, not individually read)

| Classification | Pages | Total impressions 90d | Total clicks |
|---|---|---|---|
| Thin, no action yet | 18 | 159 | 3 |

## Section 4 — Disagreements with deterministic calls

1. **/blog/dental-practice-software-accounting-integration = expand.** Disagree. This is a dead legacy flat URL (the live page is /blog/practice-accounting/dental-practice-software-accounting-integration, which I have called refresh). Expanding a URL that 404s is wasted work; it belongs in the flat-URL redirect batch with the consolidate candidates.
2. **/blog = expand.** Partial disagreement. The blog index attracts head service terms (dental accounting, dental practice tax) at positions 17-67. Expanding an index page will not win service-intent queries; that demand belongs to the homepage refresh and the Section 6 new-page work. If expand means richer hub copy and internal linking it is harmless, but it should not be prioritised as a traffic play.
3. **/blog/dental-practice-goodwill-buying-selling = consolidate_candidate.** Agree with the outcome but not the framing: it is a URL variant of the same content file, not a competing page, so the action is a 301 redirect rather than a content consolidation, and the rewrite-only rule is not engaged.

## Section 5 — Healthy pages

- /blog/practice-finance/sole-trader-vs-limited-company-dentists-uk: 22 impr, 1 click, position-1 to 3 appearances plus steady Bing long-tail wins; leave alone.
- /blog/pension-contributions-dentists-tax-relief-annual-allowance: 20 impr, 70% of impressions in the position-10 band; leave alone (note: also a flat-URL variant class, worth checking its canonical in the redirect batch).
- Plus the five llm-resolved healthy pages in Section 3.

## Section 6 — Unowned queries (new_page_target inputs)

All 16 unowned queries are one head-term cluster the homepage currently half-owns at positions 32-76. This is not sixteen new pages; it is one problem: the site does not rank for its own category name. The homepage refresh (Section 3) is the primary fix, with at most one supporting service page (for example a "specialist dental accountants" service page) if the refresh alone does not move the cluster.

| Query | Impr 90d | Best position |
|---|---|---|
| accountants for dentists | 1,157 | 43.5 |
| dental accountants | 858 | 46.0 |
| specialist dental accountants | 709 | 41.8 |
| dental accounting | 301 | 59.0 |
| accountant for dentists | 244 | 53.3 |
| dentist accountants | 235 | 62.9 |
| accounting for dentists | 156 | 43.0 |
| dentist accountants near me | 153 | 37.3 |
| dental accountant | 151 | 44.5 |
| dental practice accountant | 104 | 42.9 |
| dental accountants london | 66 | 35.2 |
| dentist accountant | 44 | 56.8 |
| specialist accountant for dentists | 39 | 32.0 |
| dental practice accounting | 37 | 43.2 |
| doctors and dentists accountant | 34 | 75.8 |
| dental accountant wales | 31 | 42.5 |
