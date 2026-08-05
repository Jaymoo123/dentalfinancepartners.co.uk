# Verdict ledger — Property SEO analysis audit, 2026-08-05

Judged against `fresh_facts_2026_08_05.md` (all figures re-pulled today) and
`ctr_benchmark_notes.md`. Docs audited: `PROPERTY_CEILING_ANALYSIS_2026-08-05.md` (CEIL),
`PROPERTY_COMMERCIAL_CAPTURE_SCOPE_2026-08-05.md` (SCOPE),
`PROPERTY_COMMERCIAL_PLAN_2026-08-05.md` (PLAN),
`PROPERTY_COMMERCIAL_HANDOFF_2026-08-05.md` (HANDOFF).

Severity: **DC** = decision-changing (a phase, a gate or a build target moves if the claim
is wrong). **cos** = cosmetic (wrong or unsourced, but no action depends on it).

## A. Numeric claims

| # | Claim (where) | Verdict | Sev | Rationale |
|---|---|---|---|---|
| 1 | July sessions quoted as 6,161 / 5,188 / 3,679 (CEIL §4, HANDOFF trap 3) | CORRECTED: 6,161 human, 3,679 engaged >10s, bot rows 8,878 | cos | "5,188 human" and "7,451 bot" reproduce from no filter combination; the CEIL §4 pair (3,679 of 6,161) is right, only the HANDOFF trap line is stale. |
| 2 | City post count given as 40 (PLAN, HANDOFF), 16 (SCOPE §1c), ~11 (SCOPE W2), 55 (PLAN Phase 0) | CORRECTED: 19 city blog posts + 5 `/locations` routes | DC | Repo count is definitive. Every downstream scope figure ("touches 40+ pages", "55 commercial/city posts" for the Bing veto pull, "retire the ~11") is sized against a denominator that does not exist. |
| 3 | Commercial impressions 4,856 / 4,733 / ~2,300 used interchangeably | CORRECTED: 4,856 = the whole commercial bucket (326q, 5 clicks); 4,733 = its off-page-1 subset; ~2,343 = the 16 rows in SCOPE §1c only | DC | PLAN 2.3 attributes the ~2,300 to "40 city posts". It is the sum of a 16-row table. The consolidation's headline benefit is over-attributed. |
| 4 | Bing 79-day site total 139,458 vs monthly rows summing 134,650 (SCOPE §1a) | CONFIRMED, gap explained | cos | 4,808 gap = omitted Aug 1-3 partial month; May row is 15/31 days. Both totals correct, the doc just never reconciles them. |
| 5 | "`GetPageStats` ... tracks the site aggregate closely" (SCOPE §1a) | WRONG for impressions, CONFIRMED for CTR | DC | 89,116 vs 139,458 = 36.1% shortfall. CTR does track (2.58% vs 2.51%). Phase 0/2 use GetPageStats as the Bing veto input, so the coverage hole must be stated or pages will look Bing-dead that are not. |
| 6 | July lead total 61 (channel table) vs 62 (headline) | CORRECTED: 62 | cos | Published table missed www.google.co.uk = 1 lead. Headline 62 is right. |
| 7 | "property accountant" position quoted 25.2 (CEIL, SCOPE §1b) / 24.8 (SCOPE §5b, HANDOFF) / 25 ("ranks 25th") | CONFIRMED, but three granularities | cos | 278 impr on the bare term is spread across 11 pages, so a single "the position" does not exist. Rounding to "25th" is fine; presenting 25.2 and 24.8 as the same number is not. |
| 8 | SCOPE §1b table mixes GSC avg position with DataForSEO volume/CPC in one row | CONFIRMED as a presentation defect | cos | The two columns come from different systems with different query normalisation; the table implies a per-keyword ranking that GSC never reported. |
| 9 | "Expected CTR at position 6 is roughly 4-5%" (CEIL §2) | CONFIRMED (now sourced) | cos | ~4.35% aggregate, per ctr_benchmark_notes. Caveat: blended, and AI Overviews depress all positions. |
| 9b | "6-9% would be normal" for Bing (SCOPE §1a) | UNSUPPORTED | DC | No modern Bing CTR-by-position benchmark exists. Historical Bing pos 1 = 9.66%, pos 2 = 5.51%, roughly half Google. Normal at pos 4-6 is ~2-4%. Site's 2.51% may be near-normal. See logic item 18. |
| 10 | Bing "average impression position of 4-6" (SCOPE §1a, HANDOFF finding 7) | UNVERIFIABLE | DC | `GetRankAndTrafficStats` returns no position field. The figure has no table and no API source behind it, and it is the denominator of the whole "Bing under-performs its position" argument. |
| 11 | "~800 informational posts" (SCOPE §2) | CORRECTED: 746 blog posts total | cos | Repo count. Also note 746 is all posts, not all informational. |
| 12 | Jobs cluster "~400/mo combined" (SCOPE §5b) | UNSUPPORTED | cos | No per-term breakdown appears in any doc or dataset. The quarantine decision does not depend on the number (the careers page demonstrably serves the head term), so the action stands. |
| 13 | "`landlord tax` (2,900/mo) earns ZERO impressions" (SCOPE, PLAN 3.1, HANDOFF) | CORRECTED: exact-match 0 on Google confirmed; CONTAINS variants = 46 queries / 897 impr / 0 clicks; Bing = 1,064 impr / 121 clicks | DC | The zero is Google-exact-match-only. "Complete absence" is wrong: there is a live Bing footprint on the term and a Google long tail. The hub is still justified (0 clicks on Google either way), but the gap is smaller than "invisible" implies and the baseline for the 28-day read must be the right one. |
| 14 | Other 0-click claims read off the query dimension (commercial 5 clicks, local 1 click, homepage 42 impr) | CONFIRMED as sample proportions | cos | Query dimension captures 17.8% of impressions (29,225 of 163,939). CEIL §2 states this caveat correctly; SCOPE and PLAN then quote the same numbers as totals without repeating it. |
| 15 | Lead entry table (blog 52 / homepage 32 / other 14 / services 1) presented next to July-window figures | CONFIRMED exact, but all-time | DC | Buckets verified. They are all-time and sit in PLAN Phase 4 beside July lead counts, inviting a same-window reading. The commissioning rule rests on this table, so the window must be labelled. |
| 16 | Lead totals from the entry-page join | CORRECTED: true total 116, not 99 | cos | Inner join dropped 17 unattributed leads (14.7%). Bucket ranking is unaffected; the absolute base is. |
| 17 | ChatGPT "4 leads in June and 4 in July from 43 sessions" (CEIL §4.2, SCOPE §2.5, PLAN 5.2) | CORRECTED: July 43 sessions / 4 leads (9.3%); June 74 sessions / 4 leads (5.4%) | cos | The 43 belongs to July only and was mis-attributed to both months. |
| — | Page coverage "665 / 118 / 16" (CEIL §1, HANDOFF finding 1) | CORRECTED: 870 ≥1 impr / 252 ≥100 / 28 ≥1,000 | cos | Stale snapshot; the site grew. Strengthens the "far from ceiling" conclusion rather than weakening it. |
| — | Monthly GSC totals, intent buckets, `/locations/leeds` dual-host split, "property accountant" in 50 metaTitles (claimed 51), careers cluster exists, `landlord tax` in 33 metaTitles | CONFIRMED | cos | All reproduce exactly from today's pulls; metaTitle count off by one. |

## B. Unsourced claims

| # | Claim | Verdict | Sev | Rationale |
|---|---|---|---|---|
| 9b | Bing 6-9% normal | UNSUPPORTED | DC | See above. No benchmark exists; the plausible band is 2-4%. |
| 10 | Bing avg position 4-6 | UNVERIFIABLE | DC | API returns no position field. |
| 12 | Jobs cluster ~400/mo | UNSUPPORTED | cos | No breakdown anywhere. |
| 24 | "Bing veto" invoked as a gate with no threshold defined (SCOPE W2, PLAN 0/2.3, HANDOFF) | UNSUPPORTED as specified, but moot in practice | cos | No impressions/clicks/position bar is ever stated, so the gate is unfalsifiable. Fresh fact makes it academic: **zero of 191 Bing-indexed pages match a city name or `/locations/`**, so no city page carries measurable Bing risk. Define the threshold anyway before it is applied to a non-city cluster. |
| 25 | Intent-bucket regex precedence (commercial / form-HMRC / informational) | UNVERIFIABLE | DC | Bucket totals reproduce exactly, but no doc states the matching order, so a query hitting two patterns is assigned by unstated precedence. The commercial-bucket baseline is the headline metric for the 28-day read, and it is not reproducible by a fresh agent from the docs alone. |
| 26 | Withdrawn-claim hygiene (19.7% Bing CTR, "19x better", "do not commission informational content") | PARTIAL | cos | Withdrawals are explicit and well done in CEIL §4 and SCOPE §1a/§5b. But SCOPE §4 still carries the un-struck "Do not commission more informational blog volume" bullet that §5b withdraws, and PLAN's §4 restates the corrected rule without flagging that §4 of SCOPE contradicts it. |
| 29 | "Everything below is measured, not inferred" (HANDOFF opening) | WRONG | DC | Not true as written. Bing avg position 4-6, the 6-9% Bing normal, ~400/mo jobs volume, the 40/55 page counts and "~800 posts" are all inferred, unsourced or stale. A fresh agent is told to treat the whole document as measured. |

## C. Logic and method

| # | Claim | Verdict | Sev | Rationale |
|---|---|---|---|---|
| 18 | "CTR is weak on BOTH engines, therefore query mix is the binding constraint" (SCOPE §1a, CEIL §4 correction, HANDOFF 7) | UNSUPPORTED as stated; conclusion survives on the Google leg alone | DC | The Bing leg collapses: 2.51% may be near-normal for Bing at any mid-page position, and the position itself is unverifiable. Google's leg stands unaided (0.46% measured at pos 1 vs ~20%+ benchmark). The elimination argument must be rewritten to rest on Google, and W3 stays central for that reason, not because of a cross-engine coincidence. |
| 19 | "City terms measure zero volume, therefore there is no local market" (SCOPE §1b/§4, PLAN 2.3) | UNSUPPORTED (over-stated), direction survives | cos | DataForSEO zero-volume is a rounding floor on long-tail variants, not proof of no demand: the same terms earned 2,465 GSC impressions. The correct statement is "demand is long-tail scatter with 1 click per 90 days", which supports "do not build a local page factory" without the stronger claim. |
| 20 | Cannibalisation on the commercial cluster | CONFIRMED, and now measured | cos | Fresh fact: the bare head term's 278 impressions are spread across 11 different pages. Previously asserted from a page table; it is now demonstrated. |
| 21 | Homepage should be the money page (PLAN 2.1) | CONFIRMED as reasoning, but the strongest evidence is not the one cited | cos | 42 impr / 1 click / 10 queries and pos 82 for `landlord tax accountant` are real. The justification leans on owner instinct ("the owner instinct is correct"); the load-bearing argument is that the head term is currently served by a careers article and no page owns the cluster. |
| 22 | 28-day re-read cadence (SCOPE W6, PLAN Phase 6) | UNSUPPORTED as a decision point | DC | 28 days is below the maturation window for new pages and consolidations on Google, especially with the dual-host split only just fixed. A 28-day read is a safety check for regression; it cannot support the geography go/no-go the plan hangs on it. Set the decision read at 90 days, keep 28 as a regression tripwire. |
| 23 | Phases 2.1 and 3.1 run in parallel (PLAN sequencing) | WRONG (method) | DC | Both target overlapping commercial intent and both change the head-term picture. Running them together makes the 28-day read unattributable, which contradicts the plan's own `feedback_time_segmented_analysis_and_qa` gate and Phase 1's stated "deploy and verify before Phase 2 so measurement is not confounded". Stagger them or accept that neither can be measured. |
| 27 | Sequencing omits the DJH conversation as a gate | CONFIRMED as a gap | DC | DJH ranks 6 for the head term and is the lead buyer. PLAN Risk 6 says this "should be answered before 2.1 ships", but the sequencing block and the HANDOFF RESUME steps both put 2.1 first with no DJH gate. A fresh agent following RESUME HERE would ship it. |
| 28 | `GetAiPerformance` assumption flag | CONFIRMED as flagged in W5/5.2, MISSING from Risks | cos | The ASSUMPTION FLAG is stated where the method is proposed but never carried into the risk register, so the AI/GEO measurement plan has an unlisted single point of failure. |

## Summary counts

| Verdict | Count |
|---|---:|
| CONFIRMED | 8 |
| CORRECTED | 9 |
| UNSUPPORTED | 7 |
| WRONG | 3 |
| UNVERIFIABLE | 2 |
| PARTIAL | 1 |

The core conclusions survive: Property is far from its ceiling, it has never won a
commercial query, the head term is mis-served by a careers article, cannibalisation is
real and now measured, and informational blog posts are the primary lead source. What
does not survive is the Bing under-performance argument, several page-count
denominators, and the measurability of the plan as sequenced.
