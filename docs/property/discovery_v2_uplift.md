# Discovery v2 uplift — new engine vs the DDG-era gap method (property, 2026-08-16)

Comparison basis: `discovery_candidates` (site_key='property', 5,630 scored survivors, run 2026-08-15) versus `docs/property/_archive/topic_gaps_final.md` (the old DDG-era pool: 450 candidates, 429 net-new, produced by slug matching against competitor sitemaps with no demand data).

## (a) Demand-validated candidates the old method never surfaced

The new pool contains **887 candidates with volume >= 500/mo and a lane tag**. Phrase-matching each against the full text of `topic_gaps_final.md` (both plain and slug-hyphenated forms), **826 of the 887 (93%) are absent** from the old pool. The old file was slug-based, so a loose topical overlap exists that phrase matching understates, but the direction is unambiguous: the old method had no visibility of the demand layer at all. Examples absent from the old pool, with measured volume:

- stamp duty calculator, 246,000 (sdlt)
- nrls, 110,000 (non_resident; acronym conflation likely, but the old pool had zero NRLS-scheme head coverage either)
- mortgage repayment calculator, 90,500 (finance_mortgages, SERP-verified winnability 1.0)
- tenancy deposit scheme, 49,500 (compliance_licensing)
- sdlt calculator, 40,500 (sdlt)
- check vat number and ~20 variants, 33,100 and 27,100 (vat_commercial, 3 variants SERP-verified 1.0)
- register for vat, 22,200 (vat_commercial)
- register for self assessment, 18,100 (landlord_ops)
- dividend tax rate, 18,100 (incorporation_structures)
- iht calculator, 9,900 (iht_estate)

None of these could have come out of the old method, because competitor sitemap slugs plus DDG lookups never carried a volume figure, and several (the whole calculator and checker families) are demand shapes competitors do not publish slugs for.

## (b) What the old pool over-weighted

The old pool ranked by slug frequency across competitor sitemaps, with no measurable demand attached to any entry. Sample of 10 old net-new picks looked up in `discovery_candidates`:

| Old pick (slug) | New-pool volume verdict |
|---|---|
| multiple-dwellings-relief (7 slug variants in old pool) | No volume rows; only zero-volume case notes. MDR was abolished June 2024, the old pool was recommending 7 pages on a dead relief |
| sdlt-group-relief-claims | Absent from pool entirely |
| unlocking-the-benefits-of-sale-and-leaseback-relief | Absent (one zero-volume VAT case note) |
| corporation-tax-marginal-relief-uk-guide | Absent from pool entirely |
| substantial-shareholding-exemption-sse | Absent from pool entirely |
| directors-loan-accounts | 260/mo (ltd company directors loan) |
| a-complete-guide-to-stamp-duty-refund | 1,600/mo (stamp duty refund), real demand |
| sdlt-returns | 2,400/mo (sdlt return), real demand |
| sdlt-on-shared-ownership | 880/mo (stamp duty on shared ownership), real demand |
| first-time-buyer-relief-calculator | 590/mo (first time buyer relief), real demand |

**5 of the 10 sampled old picks have volume below 100 or are absent from the demand pool altogether**; 1 is modest (260); 4 carry real demand (590 to 2,400). The failure mode is clear: slug frequency rewarded whatever competitors happened to publish a lot of (case notes, dead reliefs, corporate-tax esoterica) regardless of whether anyone searches for it.

## (c) What the SERP divergence means for past winnability verdicts

The dual-mode head-query test measured a divergence of 0.83 between DDG and real Google results, meaning the DDG top-10 shared only about 17% of its domains with the actual Google top-10. Every winnability verdict the old method produced was therefore graded against the wrong exam: a topic could look winnable because DDG's top-10 was thin, while the real Google SERP was wall-to-wall gov.uk, MoneySavingExpert and established brokers, or the reverse, a genuinely open Google SERP could be dismissed because DDG surfaced a different set of incumbents. With five in six domains differing, old "winnable" and "blocked" labels carry close to no signal, and any past prioritisation decision that leaned on a DDG SERP read should be treated as unvalidated rather than wrong-by-default: the verdicts are noise, not inverted truth.

## (d) Cost

- New engine, full run: **$1.68** DataForSEO.
- Old method: **$0** (DDG scraping, free).

## (e) Verdict

The new engine is surfacing money keywords the old one structurally could not see: the entire calculator and tool demand layer (246k stamp duty, 90.5k mortgage repayment, 33.1k VAT checker, 9.9k IHT calculator), head-term volumes on assets we already own, and SERP-verified winnability on the queries that matter most, none of which exists in a slug-frequency pool, and 93% of all demand-validated candidates at 500+/mo are new information. It also kills bad spend the old method actively invited (7 recommended pages on an abolished relief). The old method was not worthless: 4 of the 10 sampled old picks had real demand, and those picks were in fact built and now sit in the content directory (stamp-duty-refund, first-time-buyer-relief, shared-ownership, and related pages), so the slug-frequency signal did find genuine topics at roughly a coin-flip hit rate. The honest summary is that the old pool was a topic-idea generator with a ~50% demand hit rate and unusable winnability labels, while the new pool is a demand-ranked, lane-tagged, partially SERP-verified target list for $1.68 a run. Retire the old pool as a selection mechanism; keep its already-built survivors.
