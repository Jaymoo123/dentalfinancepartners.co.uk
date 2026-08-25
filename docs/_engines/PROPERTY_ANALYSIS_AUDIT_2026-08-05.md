# Property analysis audit, 2026-08-05

**What was audited:** the four Property commercial-capture documents written on 2026-08-05
(ceiling analysis, capture scope, execution plan, handoff), checked claim by claim against
data re-pulled the same day (GSC, Bing Webmaster, Supabase, DataForSEO, repo counts) plus a
100-query hand validation of the intent classifier and an adversarial pass on the five
decision-driving conclusions.

**Overall verdict:** the analysis is directionally right and materially wrong in specific
numbers and two conclusions. Right: Property is far from its ceiling, it has never won a
commercial query, the head term is mis-served by a careers article, cannibalisation is real
(and is now measured, not asserted), and informational blog posts are the main lead source.
Wrong: the Bing under-performance argument (no position data exists and the "6-9% normal"
benchmark does not exist), the city-page denominators (24 real assets, not 40/55/16/11), the
301 direction for city consolidation (city pages hold the site's best commercial positions),
the categorical ban on reference content (built on an n=8 outlier with no denominators), and
the measurability of the plan as sequenced (2.1 and 3.1 in parallel, read at 28 days).

Audit inputs live in `expansion_research/_prop_audit_2026_08_05/`. Every figure below traces
to a file there; see the provenance appendix (§7).

---

## 1. Executive verdict on the five conclusions

**C1. "Property is far from its ceiling." STANDS, with caveats.** The dilution counter-attack
is contradicted by measurement: over Apr-Jul 2026 average position improved from 13.8 to 10.1
while impressions grew 6.7x (11,521 to 77,466) and clicks 73x (11 to 811), and CTR rose
monotonically from 0.10% to 1.05%. Pages earning impressions went from 78 to 725. Corrected
page coverage (870 pages with ≥1 impression, 252 with ≥100, 28 with ≥1,000 over the 90 days
to 2026-08-05) is materially higher than the 665/118/16 published, which strengthens the
conclusion. Two caveats: this is an impressions ceiling verdict, not a revenue one (the ~600
page informational tail sits at 0.26% CTR and position ~30, so activating it buys impressions
rather than leads), and a launch curve off a near-zero base (230 impressions in March) proves
non-saturation rather than durable headroom. The first meaningful read is whether Aug-Sep
flattens against a mature base.

**C2. "The gap is commercial capture, not content volume." STANDS. The 'CTR weakness = query
mix' clause FALLS.** The capture gap survives on one clean fact: `landlord tax` (2,900/mo)
earns zero Google impressions on exact match while Bing serves the same term 1,064
impressions and 121 clicks (11.4% CTR) over 2026-05-17 to 08-03. Zero on one engine while the
other converts is a serving and targeting failure, not an authority ceiling. Classifier
validation makes the gap slightly larger, not smaller: commercial precision 1.00, recall 0.80,
so the published 4,856 commercial impressions is a floor and the true figure is roughly 6,080.
The query-mix clause is dead: informational CTR of 0.26% at average position 29.8 is exactly
what position predicts, leaving no residual anomaly for query mix to explain, and the Bing leg
of the "both engines under-perform" argument is unfalsifiable because
`GetRankAndTrafficStats` returns no position field and no modern Bing CTR-by-position
benchmark exists. The elimination argument must be re-founded on the Google leg alone (0.46%
measured at position 1 against a ~20%+ benchmark).

**C3. "Local pages are wrong, consolidate into national pages." STANDS AMENDED. The 301
direction is REVERSED.** The duplication is real and measured (six London posts plus
`/locations/london`, 814 impressions and zero clicks over 90 days), and the Bing veto is clear
(zero of 191 Bing-indexed pages match a city name or `/locations/`). But the direction of
consolidation is wrong. City queries hold the site's best commercial positions (9.2 to 14.8)
while the national head terms sit at 25 to 34, so redirecting city assets into national
targets destroys the only page-1-adjacent commercial rankings the site has. The "zero volume"
premise is also not established: Google Ads rounds long-tail variants to zero (the same terms
earned 2,465 GSC impressions in 90 days, and `landlord tax` at 2,900/mo returning zero
Google impressions proves the tools cut both ways), and autocomplete shows near-me demand on
every seed. Amended playbook: consolidate duplicates *within* each city into one canonical
city page, keep `/locations/[slug]` as the survivor, start with London, and do it after the
canonicalisation fix has settled.

**C4. "Decision-stage content wins, stop commissioning reference content." The positive half
STANDS as a bet. The ban FALLS.** The top-10 lead-earning posts are one n=8 outlier
(`transfer-property-into-limited-company`) plus noise: every other named winner is n=2, and
two of the ten are commercial or local pages rather than decision-stage informational. There
are no denominators anywhere, so raw lead counts track traffic rather than conversion
propensity, and 28 of the 52 blog leads sit in an uninspected one-lead tail spread across 746
posts. Attribution cannot carry the weight either: 54% of all leads (32 homepage, 17
unattributed, 14 other, of 116 all-time) have no blog entry page, and the self-referral host
carried 8 July leads, which proves multi-session journeys that last-session attribution hides,
so reference pages could be systematically first-touch and score zero by construction. The
claimed mechanism also fails on its own data: form/HMRC CTR is 0.19% against informational
0.26%, no differential, and the SA105 form post (37 clicks in 90 days) is itself a reference
winner the plan would freeze. Keep "commission more decision-stage" as a stated bet; delete
the categorical stop and keep per-page judgment.

**C5. "Geography: hold." STANDS, on different grounds.** The verdict is right but the
load-bearing argument is wrong. GSC geo-targeting is genuinely unavailable for ccTLDs, but a
ccTLD is a relevance signal rather than a filter, link authority is domain-level and crosses
borders, and hreflang on a `/us/` path is the documented mechanism, so the ccTLD point is a
handicap and not a blocker. "Near-zero marginal cost" is also wrong: the build system
transfers but the content does not, and Opus-only A* authoring is the expensive half. The two
grounds that actually decide it are that there is no US buyer relationship (rankings without a
buyer are unmonetisable) and that `landlord tax` at 2,900/mo remains uncaptured in the home
market, which proves the capability gap would travel. Re-found the hold on those two and
demote the ccTLD claim to a handicap.

---

## 2. Verdict ledger

Judged against `fresh_facts_2026_08_05.md` and `ctr_benchmark_notes.md`. Docs: CEIL =
`PROPERTY_CEILING_ANALYSIS_2026-08-05.md`, SCOPE =
`PROPERTY_COMMERCIAL_CAPTURE_SCOPE_2026-08-05.md`, PLAN =
`PROPERTY_COMMERCIAL_PLAN_2026-08-05.md`, HANDOFF =
`PROPERTY_COMMERCIAL_HANDOFF_2026-08-05.md`. Severity **DC** = decision-changing (a phase,
gate or build target moves if the claim is wrong); **cos** = cosmetic (wrong or unsourced, no
action depends on it).

### A. Numeric claims

| # | Claim (where) | Verdict | Sev | Note |
|---|---|---|---|---|
| 1 | July sessions 6,161 / 5,188 / 3,679 (CEIL §4, HANDOFF trap 3) | CORRECTED: 6,161 human, 3,679 engaged >10s, 8,878 bot rows | cos | "5,188 human" and "7,451 bot" reproduce from no filter combination; CEIL §4 is right, the HANDOFF trap line is stale |
| 2 | City post count 40 (PLAN, HANDOFF), 16 (SCOPE §1c), ~11 (SCOPE W2), 55 (PLAN Phase 0) | CORRECTED: 19 city blog posts + 5 `/locations` routes = 24 | DC | Every downstream scope figure is sized against a denominator that does not exist |
| 3 | Commercial impressions 4,856 / 4,733 / ~2,300 used interchangeably | CORRECTED: 4,856 = whole bucket (326 queries, 5 clicks); 4,733 = its off-page-1 subset; ~2,343 = the 16 rows in SCOPE §1c only | DC | PLAN 2.3 attributes the ~2,300 to "40 city posts"; it is the sum of a 16-row table |
| 4 | Bing 79-day site total 139,458 vs monthly rows summing 134,650 (SCOPE §1a) | CONFIRMED, gap explained | cos | 4,808 gap = omitted 1-3 Aug partial month; May row is 15/31 days |
| 5 | "`GetPageStats` tracks the site aggregate closely" (SCOPE §1a) | WRONG for impressions, CONFIRMED for CTR | DC | 89,116 vs 139,458 = 36.1% shortfall; CTR does track (2.58% vs 2.51%). Phase 0/2 use GetPageStats as the Bing veto input |
| 6 | July lead total 61 (channel table) vs 62 (headline) | CORRECTED: 62 | cos | Table missed www.google.co.uk = 1 lead |
| 7 | "property accountant" position 25.2 / 24.8 / "25th" | CONFIRMED, three granularities | cos | 278 impressions spread across 11 pages, so a single position does not exist |
| 8 | SCOPE §1b mixes GSC average position with DataForSEO volume and CPC in one row | CONFIRMED presentation defect | cos | Different systems, different query normalisation; implies a per-keyword ranking GSC never reported |
| 9 | "Expected CTR at position 6 is roughly 4-5%" (CEIL §2) | CONFIRMED, now sourced | cos | ~4.35% aggregate; blended, and AI Overviews depress all positions |
| 9b | "6-9% would be normal" for Bing (SCOPE §1a) | UNSUPPORTED | DC | No modern Bing benchmark exists; historical Bing pos 1 = 9.66%, pos 2 = 5.51%; normal at pos 4-6 ≈ 2-4%, so 2.51% may be near-normal |
| 10 | Bing "average impression position of 4-6" (SCOPE §1a, HANDOFF finding 7) | UNVERIFIABLE | DC | `GetRankAndTrafficStats` returns no position field; this is the denominator of the whole Bing argument |
| 11 | "~800 informational posts" (SCOPE §2) | CORRECTED: 746 blog posts total | cos | And 746 is all posts, not all informational |
| 12 | Jobs cluster "~400/mo combined" (SCOPE §5b) | UNSUPPORTED | cos | No per-term breakdown anywhere; the quarantine action does not depend on it |
| 13 | "`landlord tax` (2,900/mo) earns ZERO impressions" | CORRECTED: Google exact-match zero confirmed; CONTAINS variants = 46 queries / 897 impr / 0 clicks; Bing = 1,064 impr / 121 clicks | DC | "Complete absence" is wrong; the hub is still justified (0 clicks either way) |
| 14 | Other 0-click claims read off the query dimension | CONFIRMED as sample proportions | cos | Query dimension captures 17.8% of impressions (29,225 of 163,939); CEIL §2 states the caveat, SCOPE and PLAN drop it |
| 15 | Lead entry table (blog 52 / homepage 32 / other 14 / services 1) beside July figures | CONFIRMED exact, but all-time | DC | Sits in PLAN Phase 4 next to July lead counts, inviting a same-window reading; the commissioning rule rests on it |
| 16 | Lead totals from the entry-page join | CORRECTED: true total 116, not 99 | cos | Inner join dropped 17 unattributed leads (14.7%); ranking unaffected, absolute base is not |
| 17 | ChatGPT "4 leads in June and 4 in July from 43 sessions" | CORRECTED: July 43 sessions / 4 leads (9.3%); June 74 / 4 (5.4%) | cos | The 43 belongs to July only |
| 30 | Page coverage "665 / 118 / 16" (CEIL §1, HANDOFF finding 1) | CORRECTED: 870 ≥1 impr / 252 ≥100 / 28 ≥1,000 | cos | Stale snapshot; strengthens "far from ceiling" |
| 31 | Monthly GSC totals, intent buckets, `/locations/leeds` dual-host split, careers cluster, `landlord tax` in 33 metaTitles | CONFIRMED | cos | "property accountant" in 50 metaTitles, claimed 51 |

### B. Unsourced claims

| # | Claim | Verdict | Sev | Note |
|---|---|---|---|---|
| 9b | Bing 6-9% normal | UNSUPPORTED | DC | Plausible band is 2-4% |
| 10 | Bing average position 4-6 | UNVERIFIABLE | DC | API returns no position field |
| 12 | Jobs cluster ~400/mo | UNSUPPORTED | cos | No breakdown anywhere |
| 24 | "Bing veto" invoked as a gate with no threshold defined | UNSUPPORTED as specified, moot in practice | cos | Zero of 191 Bing-indexed pages match a city name or `/locations/`; define the threshold before applying it to a non-city cluster |
| 25 | Intent-bucket regex precedence | UNVERIFIABLE as documented | DC | Totals reproduce exactly, but no doc states matching order; validation shows precedence is immaterial (3 queries, 46 impressions, 0.1%), the damage is the residue rule |
| 26 | Withdrawn-claim hygiene (19.7% Bing CTR, "19x better", "do not commission informational content") | PARTIAL | cos | SCOPE §4 still carries the un-struck "do not commission more informational blog volume" bullet that §5b withdraws |
| 29 | "Everything below is measured, not inferred" (HANDOFF opening) | WRONG | DC | Bing position, the 6-9% norm, ~400/mo jobs, the 40/55 page counts and "~800 posts" are inferred, unsourced or stale |

### C. Logic and method

| # | Claim | Verdict | Sev | Note |
|---|---|---|---|---|
| 18 | "CTR weak on BOTH engines, therefore query mix is binding" | UNSUPPORTED as stated; conclusion survives on the Google leg | DC | Rewrite the elimination argument to rest on Google alone |
| 19 | "City terms measure zero volume, therefore no local market" | UNSUPPORTED (over-stated), direction survives | cos | Correct statement: demand is long-tail scatter at 1 click per 90 days |
| 20 | Cannibalisation on the commercial cluster | CONFIRMED, now measured | cos | Head term's 278 impressions spread across 11 pages |
| 21 | Homepage should be the money page (PLAN 2.1) | CONFIRMED, wrong evidence cited | cos | Load-bearing argument is that the head term is served by a careers article and no page owns the cluster, not owner instinct |
| 22 | 28-day re-read cadence as a decision point | UNSUPPORTED | DC | Below the maturation window; set the decision read at 90 days, keep 28 as a regression tripwire |
| 23 | Phases 2.1 and 3.1 run in parallel | WRONG (method) | DC | Both change the head-term picture; running together makes the read unattributable |
| 27 | Sequencing omits the DJH conversation as a gate | CONFIRMED gap | DC | PLAN Risk 6 says it must be answered before 2.1, but sequencing and RESUME HERE put 2.1 first |
| 28 | `GetAiPerformance` assumption flag | FLAGGED in W5/5.2, MISSING from Risks | cos | Unlisted single point of failure in the AI/GEO measurement plan |

### Summary counts

| Verdict | Count |
|---|---:|
| CONFIRMED | 8 |
| CORRECTED | 9 |
| UNSUPPORTED | 7 |
| WRONG | 3 |
| UNVERIFIABLE | 2 |
| PARTIAL | 1 |
| **Total distinct claims judged** | **30** |

Claim numbers are unique across the three tables (items 9b, 10 and 12 are listed twice, once
as a numeric claim and once as an unsourced one, and are counted once here). Thirteen carry
the DC flag, and those thirteen are set out in §3.

---

## 3. The 13 decision-changing corrections

**1. City denominator.** Wrong claim: 40 city posts (PLAN, HANDOFF), variously 55, 16 or ~11
elsewhere. Correct fact: 19 city blog posts plus 5 `/locations` routes, 24 assets total (repo
count, `repo_counts.json`). Changes: the size of Phase 2.3, the Phase 0 Bing veto pull scope
("55 commercial/city posts"), and the SCOPE W2 retirement target. All three must be re-sized
to 24.

**2. Commercial impression attribution.** Wrong claim: 4,856, 4,733 and ~2,300 used
interchangeably, with PLAN 2.3 attributing ~2,300 to the city posts. Correct fact (GSC 90d to
2026-08-05): 4,856 impressions is the whole commercial bucket (326 queries, 5 clicks), 4,733
is its off-page-1 subset, and ~2,343 is the sum of the 16-row table in SCOPE §1c only.
Changes: the headline benefit of city consolidation is over-attributed by roughly 2x and the
phase must be justified on the 16-row figure.

**3. GetPageStats coverage.** Wrong claim: `GetPageStats` "tracks the site aggregate closely".
Correct fact: it sums to 89,116 impressions against a site total of 139,458 over 2026-05-17 to
08-03, a 36.1% shortfall; CTR does track (2.58% vs 2.51%). Changes: the Bing veto input in
Phases 0 and 2 is missing over a third of impressions, so pages will look Bing-dead when they
are not. The veto must state the coverage hole or use a different input.

**4. Bing "6-9% normal".** Wrong claim: Bing CTR of 2.52% is under-performing a 6-9% norm.
Correct fact: no modern Bing CTR-by-position benchmark exists; historical Bing measures pos 1
at 9.66% and pos 2 at 5.51%, roughly half Google, implying a normal band of 2-4% at mid-page.
Changes: the site's 2.51% may be near-normal, so "Bing under-performs" cannot motivate the
Phase 5.1 Bing-first programme on CTR grounds.

**5. Bing average position 4-6.** Wrong claim: presented as measured. Correct fact:
unverifiable, because `GetRankAndTrafficStats` returns no position field and no table exists
behind the number. Changes: it is the denominator of the entire Bing under-performance
argument, which must be withdrawn rather than caveated.

**6. `landlord tax` "complete absence".** Wrong claim: the term earns zero impressions,
therefore the site is invisible on it. Correct fact: Google exact-match zero is confirmed, but
CONTAINS variants earn 46 queries / 897 impressions / 0 clicks on Google (90d) and Bing serves
the term 1,064 impressions / 121 clicks / 11.4% CTR (2026-05-17 to 08-03). Changes: the Phase
3.1 hub is still justified on zero clicks, but the baseline for any post-launch read must be
the correct one (897 Google impressions, not zero), or the hub will appear to succeed by
measuring a pre-existing footprint.

**7. Lead entry-bucket window.** Wrong presentation: the all-time bucket table (blog 52 /
homepage 32 / other 14 / services 1) sits in PLAN Phase 4 beside July-window lead counts.
Correct fact: buckets are exact but all-time; July's lead total is 62. Changes: the Phase 4
commissioning rule rests on this table, so the window must be labelled or the rule is derived
from a mixed-window comparison.

**8. Classifier reproducibility.** Wrong claim: the intent buckets are presented as a stated
method. Correct fact: no doc states the regex matching order, and validation shows precedence
affects only 3 queries (46 impressions, 0.1%) while the residue rule misfiles roughly 45% of
the informational bucket. Changes: the commercial-bucket baseline is the headline metric for
the post-launch read and is not reproducible by a fresh agent from the docs alone; the
classifier and its correction factors must be pinned in the plan.

**9. "Everything below is measured, not inferred".** Wrong claim: the HANDOFF opening line.
Correct fact: at least five load-bearing figures in it are inferred, unsourced or stale.
Changes: a fresh agent following RESUME HERE is told to trust the whole document; the line
must be replaced with a per-claim sourcing note.

**10. The "both engines" elimination argument.** Wrong logic: weak CTR on Google and Bing
therefore query mix is the binding constraint. Correct fact: the Bing leg collapses (items 4
and 5), and informational CTR of 0.26% at position 29.8 is exactly what position predicts, so
there is no residual anomaly. The Google leg stands alone (0.46% measured at position 1
against ~20%+ benchmark). Changes: W3 stays central because of the Google evidence, not
because of a cross-engine coincidence, and the argument must be rewritten.

**11. 28-day decision read.** Wrong method: SCOPE W6 and PLAN Phase 6 hang the geography
go/no-go on a 28-day re-read. Correct fact: 28 days is below the maturation window for new
pages and consolidations, especially with the dual-host split only just fixed. Changes: set
the decision read at 90 days and keep 28 as a regression tripwire only.

**12. Phases 2.1 and 3.1 in parallel.** Wrong method: both target overlapping commercial
intent and both change the head-term picture. Correct fact: running them together makes the
read unattributable, which contradicts the plan's own time-segmentation gate and Phase 1's
stated requirement to deploy and verify before Phase 2 so measurement is not confounded.
Changes: stagger them, or state explicitly that neither will be individually measurable.

**13. Missing DJH gate.** Wrong sequencing: PLAN Risk 6 says the DJH conversation "should be
answered before 2.1 ships", but the sequencing block and the HANDOFF RESUME steps both put
2.1 first with no gate. Correct fact: DJH ranks 6 for the head term and is the lead buyer.
Changes: a fresh agent following RESUME HERE would ship 2.1 into an unresolved conflict with
the buyer; the gate must appear in the sequencing block.

### Three further decision-changing findings from the adversarial pass

These are not corrections to a stated number, they are conclusions that move (see §6 for the
resulting amendments).

- **301 direction reversed.** City queries hold the site's best commercial positions (9.2 to
  14.8) against national head terms at 25 to 34, so consolidating city assets into national
  pages destroys the only page-1-adjacent commercial rankings. Consolidate within each city
  instead, keeping `/locations/[slug]`.
- **Phase 4's categorical ban falls.** The "stop commissioning reference content" rule rests
  on one n=8 outlier with every other winner at n=2, no denominators, and 54% of leads having
  no blog entry page at all.
- **Local pack present on `property accountant`.** DataForSEO SERP pulls show a local pack on
  11 of 25 tracked commercial terms including `property accountant`, which the scope doc
  claimed was pack-free, and AI Overviews on 17 of 25. The no-GBP rule therefore caps the
  whole commercial head-term set, not just `landlord accountant`.

---

## 4. Classifier validation summary

The regex bucketing in `scripts/property_commercial_baseline.py` (`COMMERCIAL_RE` /
`FORMCODE_RE`, lines 53-58, commercial tested first, informational as the residue) was
validated against a 100-query hand classification drawn deterministically from
`gsc_query_rows_90d.json` (3,763 rows): the top 40 by impressions with alphabetical
tie-breaks, plus 60 evenly spaced indices through the remaining 3,723 sorted alphabetically.
The sample carries 7,553 impressions.

| bucket | precision | recall |
|---|---|---|
| commercial | 1.00 (12/12) | 0.80 (12/15) |
| form/HMRC | 1.00 (15/15) | 0.38 (15/39) |
| informational | 0.63 (46/73) | 1.00 (46/46) |

Overall accuracy 73/100. All 27 errors are one-directional: real commercial and real form/HMRC
queries leak into informational, and nothing leaks the other way because informational is the
residue. There are no false positives in either matched bucket.

Failure modes, by impact:

1. **Rate-table blindness**, 20 of 27 errors. `FORMCODE_RE` assumes official lookups say
   "hmrc" or "gov.uk", so Revenue Scotland, LBTT, ATED, devolved and bare "... rates 2026"
   queries fall through into informational.
2. **Plural and adjacent commercial tokens**, 3 errors and 315 impressions: "specialists"
   (the regex has only the singular), "software", "advisors".
3. **Precedence is immaterial.** Across all 3,763 rows only 3 queries (46 impressions, 0.1%)
   match both regexes; in the sample, zero. The damage is in the residue rule, not the
   ordering.

Correction factors from the sample's impression-level rates:

| bucket | published impr | implied true impr | factor |
|---|---:|---:|---:|
| commercial | 4,856 | ~6,080 | x1.25 |
| form/HMRC | 5,336 | ~9,060 | x1.70 |
| informational | 19,033 | ~10,400 | x0.55 |

Verdict: **usable with a correction factor, and only for the commercial bucket.** Commercial
is safe to act on, since precision 1.00 makes the published 326 queries / 4,856 impressions a
floor understated by roughly 25%, which strengthens the capture-gap conclusion. Form/HMRC at
recall 0.38 fences off less than half the structurally unwinnable demand it exists to fence
off, so it is not usable as published. Informational is a residue rather than a
classification, with roughly 45% of its sampled impressions being misfiled rate-table lookups,
so it must not be used to argue anything about content demand or headroom.

---

## 5. Corrected fact base

Canonical numbers going forward. Any doc quoting a different figure for these is stale.

**Repo (as at 2026-08-05)**

| Fact | Value |
|---|---|
| Blog posts total | 746 (not ~800) |
| City assets | 24 total: 19 city blog posts + 5 `/locations` routes (not 40, 55, 16 or ~11) |
| Blog metaTitles containing "property accountant" | 50 (claimed 51) |
| Blog metaTitles containing "landlord tax" | 33 |
| Careers cluster | 3 core posts + 2 related |
| Canonical host | www, config-driven |
| Embed calculator pages | noindexed; the gallery route `/embed` is not |

**GSC, sc-domain property, 90 days to 2026-08-05 unless stated**

| Fact | Value |
|---|---|
| Monthly impressions / clicks | Apr 11,521/11; May 26,747/74; Jun 55,335/318; Jul 77,466/811; Aug to date 5,328/40 |
| 90d date-dimension impressions | 163,939 |
| 90d query-dimension impressions | 29,225 (17.8% of total; all query-level claims are sample proportions) |
| Commercial bucket (as scripted) | 326 queries / 4,856 impr / 5 clicks |
| Commercial bucket (corrected) | ~6,080 impressions (x1.25) |
| Form/HMRC bucket | 388 / 5,336 / 10 as scripted; ~9,060 corrected (x1.70) |
| Informational bucket | 3,049 / 19,033 / 50 as scripted; ~10,400 corrected (x0.55); do not use for demand arguments |
| Page coverage | 870 pages ≥1 impression, 252 ≥100, 28 ≥1,000 (not 665/118/16) |
| `landlord tax` exact | 0 impressions |
| `landlord tax` CONTAINS variants | 46 queries / 897 impr / 0 clicks |
| Bare "property accountant" | 278 impressions spread across 11 pages |
| `/locations/leeds` dual host | www 805 impr at pos 24.1, non-www 140 at pos 24.7 |
| Average position trend | 13.8 (Apr) to 10.1 (Jul) |

**Bing, 2026-05-17 to 2026-08-03**

| Fact | Value |
|---|---|
| Site totals (`GetRankAndTrafficStats`) | 139,458 impr / 3,497 clicks / 2.51% CTR |
| Monthly rows sum | 134,650; the 4,808 gap is the omitted 1-3 Aug partial month (May row is 15/31 days) |
| `GetPageStats` sum | 89,116 impr, 36.1% below the site total; CTR 2.58% does track |
| Average position | not available, the API returns no position field |
| `landlord tax` | 1,064 impr / 121 clicks / 11.4% CTR |
| Head terms (property/landlord accountant) | 45 impr / 0 clicks |
| City / `/locations` pages with any Bing footprint | 0 of 191 indexed pages |

**Supabase leads and sessions**

| Fact | Value |
|---|---|
| Lead total, all-time, entry-page join | 116 (not 99; the inner join dropped 17 unattributed, 14.7%) |
| Entry buckets, all-time | blog 52, homepage 32, other 14, services 1, unattributed 17 (sums to 116) |
| Top post | `transfer-property-into-limited-company`, 8 leads |
| Leads by month | Apr 2, May 8, Jun 34, Jul 62, Aug partial 10 |
| July lead total | 62 (published 61 missed www.google.co.uk = 1) |
| July sessions | 15,039 rows total; 6,161 human (`is_bot=false`); 3,679 engaged >10s; 8,878 bot |
| ChatGPT July | 43 sessions / 4 leads = 9.3% (Wilson CI 3.7%-21.6%) vs site-wide 1.01% |
| ChatGPT June | 74 sessions / 4 leads = 5.4% |

**Benchmarks**

| Fact | Value |
|---|---|
| Google CTR at position 6 | ~4.35% (blended; AI Overviews depress all positions) |
| Site's own measured CTR at position 1 | 0.46% |
| Bing normal CTR at mid-page | plausibly 2-4%; the 6-9% figure has no source |

**SERP layer (DataForSEO, 25 tracked commercial terms)**

| Fact | Value |
|---|---|
| Local pack present | 11 of 25, including `property accountant` |
| AI Overview present | 17 of 25 |
| Calculator volume | stamp duty calculator cluster ~246k + 60.5k + 40.5k/mo; property gains tax calculator 14.8k |

**Autocomplete**: 1,812 unique UK property-tax terms, with untargeted commercial clusters
around "near me" (present on every seed), fees and cost, "best X" comparisons, and "how much
landlord tax do i pay" question forms.

---

## 6. Amendments required to the 6-phase plan

The plan's shape is sound and is not being redesigned. These eight amendments are required
before execution.

**A1. Reverse the 301 direction for city consolidation (Phase 2.3).** As written, city assets
redirect into national commercial pages. City queries sit at positions 9.2 to 14.8 while the
national head terms sit at 25 to 34, so that direction discards the site's only
page-1-adjacent commercial rankings. Amend to: consolidate duplicates *within* each city into
one canonical page, keep `/locations/[slug]` as the survivor, run London first (6 posts plus
`/locations/london`, 814 impressions and 0 clicks in 90 days), and start only after the
canonicalisation fix from Phase 1.1 has settled. Re-size the phase against 24 assets, not 40.

**A2. Delete the categorical ban in Phase 4.** Remove "do not commission reference content" as
a rule and keep "commission more decision-stage content" as a stated bet with per-page
judgment retained. Also strike the contradicting bullet still standing in SCOPE §4, and label
the lead entry-bucket table as all-time so it is not read against July figures.

**A3. Add the DJH gate before Phase 2.1.** DJH ranks 6 on the head term and is the lead buyer.
Put the gate in the sequencing block and in the HANDOFF RESUME steps, not only in Risk 6.

**A4. Stagger 2.1 and 3.1, or record the confound.** Both move the head-term picture. Either
sequence them with a gap long enough to attribute, or state in the plan that neither will be
individually measurable and drop the per-phase success criteria accordingly.

**A5. Move the decision read to 90 days.** Phase 6's go/no-go reads at 90 days. Keep the
28-day read as a regression tripwire only, with no decision authority.

**A6. Define the Bing veto threshold, and note it is moot for cities.** The veto is currently
unfalsifiable, with no impressions, clicks or position bar stated. Set one before it is applied
to any non-city cluster. For the city consolidation it is academic: zero of 191 Bing-indexed
pages match a city name or `/locations/`. Also record that `GetPageStats`, the veto's input,
under-counts impressions by 36.1%.

**A7. Fix `FORMCODE_RE` and the commercial tokens before re-quoting buckets.** Per the
validation: add `revenue scotland|lbtt|ated|\brates?\b.*20\d\d|annual exempt|allowance` to
`FORMCODE_RE`, pluralise the commercial tokens (`specialists?`, `advis(or|er)s?`), add
`software`, and test `FORMCODE_RE` first so a rate-table query cannot be claimed as
commercial. That closes 25 of the 27 observed errors. Until then, quote commercial as ~6,080
and do not quote the informational total at all.

**A8. Extend the no-GBP cap to the whole commercial head-term set.** The scope doc treated
`property accountant` as pack-free. A local pack is present on it, and on 11 of the 25 tracked
terms. Owner decision 5 is therefore materially larger than stated: without GBP the ceiling on
national commercial capture applies to the head term itself, not just to `landlord accountant`.

Two further housekeeping items, not gating: carry the `GetAiPerformance` assumption flag from
W5/5.2 into the risk register, and replace the HANDOFF's "everything below is measured, not
inferred" opening with per-claim sourcing.

---

## 7. Provenance appendix

All raw pulls are in `expansion_research/_prop_audit_2026_08_05/`. Pull scripts: `pull.py`
(GSC, Bing, Supabase, repo), `dfs/pull.py` and `dfs/build_universe.py` (DataForSEO),
`autocomplete_property.py` (Google Autocomplete). All figures pulled 2026-08-05.

| Figure(s) | File | Tool / method | Window and filters |
|---|---|---|---|
| Monthly impressions and clicks, Apr-Aug | `gsc_monthly.json` | GSC Search Analytics API, date dimension | 2026-04-01 to 2026-08-05, `sc-domain:propertytaxpartners.co.uk`, web search |
| 90d totals (163,939) and query-dimension total (29,225) | `gsc_monthly.json`, `gsc_query_rows_90d.json` | GSC API, date dimension vs query dimension | 90 days to 2026-08-05; the 17.8% ratio is the two totals divided |
| Intent buckets (326/4,856/5, 388/5,336/10, 3,049/19,033/50) | `gsc_buckets.json`, `gsc_query_rows_90d.json` | `scripts/property_commercial_baseline.py` regexes applied to 3,763 query rows | 90 days to 2026-08-05, query dimension |
| Classifier confusion matrices, precision/recall, correction factors | `bucket_validation.md` | 100-query deterministic hand label (top 40 by impressions, 60 evenly spaced) over `gsc_query_rows_90d.json` | Same 90d window; sample carries 7,553 impressions |
| Page coverage 870 / 252 / 28 | `gsc_pages.json` | GSC API, page dimension, thresholds ≥1, ≥100, ≥1,000 impressions | 90 days to 2026-08-05 |
| `landlord tax` exact 0, CONTAINS 46q/897/0 | `gsc_landlordtax_filter.json` | GSC API, query dimension with equals and contains filters | 90 days to 2026-08-05 |
| Head term 278 impr across 11 pages | `gsc_headterm_pages.json` | GSC API, query+page dimensions, query equals "property accountant" | 90 days to 2026-08-05 |
| `/locations/leeds` www 805 / non-www 140 | `gsc_pages.json` | GSC API, page dimension, both hosts | 90 days to 2026-08-05 |
| Bing site totals 139,458 / 3,497 / 2.51% | `bing_site_totals.json` | Bing Webmaster API `GetRankAndTrafficStats` | 2026-05-17 to 2026-08-03 (API-fixed window) |
| GetPageStats 89,116 and 36.1% shortfall | `bing_pagestats_vs_total.json` | `GetPageStats` summed, compared with site total | Same window |
| Bing `landlord tax` 1,064 / 121 | `bing_landlordtax.json` | `GetQueryStats`, query filter | Same window |
| Bing head terms 45 impr / 0 clicks | `bing_headterms.json` | `GetQueryStats`, property/landlord accountant queries | Same window |
| Bing city veto, 0 of 191 pages | `bing_veto_citypages.json` | `bing_query_data` page list matched against city names and `/locations/` | Same window |
| Lead buckets, 116 total, 17 unattributed, monthly leads, July sessions and channels, AI referrers | `supabase_leads_sessions.json` | Supabase SQL, project `dhlxwmvmkrfnmcgjbntk` | Leads all-time to 2026-08-05; sessions July 2026; bot filter `is_bot=false`, engagement >10s |
| 746 posts, 24 city assets, metaTitle counts, careers cluster, noindex and canonical host | `repo_counts.json` | Repo grep over Property content and config | Repo state at 2026-08-05 |
| SERP features (local pack 11/25, AI Overview 17/25), competitor rankings, four-market volumes, calculator volumes | `dfs/serp_composition.json`, `dfs/serp_*.json`, `dfs/ranked_*.json`, `dfs/four_market.json`, `dfs/volume_*.json` | DataForSEO SERP and Labs APIs | Live SERPs pulled 2026-08-05, UK unless the file names a market; volumes are Google Ads monthly averages |
| 1,812 autocomplete terms | `autocomplete_property.json` | Google Autocomplete via `autocomplete_property.py` | Pulled 2026-08-05, UK |
| Google CTR ~4.35% at pos 6; Bing historical pos 1 9.66% / pos 2 5.51% | `ctr_benchmark_notes.md` | Web-sourced benchmark review (navboost aggregate, growthsrc 200k-keyword 2025 study, thestacc; Slingshot SEO for Bing) | Published 2025-26 studies; Bing figures are historical |
| Site's own CTR curve, 0.46% at position 1 | `query_ledgers/property_ledger.json` | Existing ledger, cross-checked against GSC | 90 days to 2026-08-05 |

Consolidated verdicts and reasoning: `verdict_ledger.md` (claim-by-claim),
`skeptic_verdicts.md` (adversarial pass on the five conclusions), `fresh_facts_2026_08_05.md`
(all re-pulled figures in one place).
