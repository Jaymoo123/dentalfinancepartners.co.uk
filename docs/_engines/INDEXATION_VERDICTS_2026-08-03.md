# Indexation verdicts: medical and agency, 2026-08-03

Both sites had a pre-agreed failure test with a watch window closing this week. Both windows
are now read. Method: `optimisation_engine.snapshot.index_coverage <site> --skip-bing`,
every sitemap URL put through the GSC URL Inspection API. **Both runs are live API calls,
zero cache reads** (verified in the run logs), so the coverage states are current.

---

## Medical: FAIL in substance, authority wall confirmed

**Pre-agreed test:** ≤10 indexed at ~28 days after confirmed sitemap re-fetch ⇒ authority
wall, pivot off-site. Sitemap re-fetch confirmed 2026-07-09.

| Bucket | URLs | Share |
|---|---:|---:|
| Indexed, self-canonical | **13** | 10.0% |
| Unknown to Google (never discovered) | **113** | 86.9% |
| Crawled, not indexed | 2 | 1.5% |
| Canonicalised away | 2 | 1.5% |
| Excluded or redirect | 0 | 0% |
| **Total inspected** | **130** | |

**Trend:** 2026-07-17 showed ~11 indexed of 117. Today, 13 of 130. That is **+2 indexed in 17
days** while the corpus grew by 13 URLs.

**Verdict.** The numeric trigger does not literally fire (13 > 10), but the substance is not
ambiguous. Nearly nine in ten URLs have never been crawled at all, 25 days after a confirmed
sitemap re-fetch. This is a pure **discovery** failure: Google is not spending crawl budget on
the domain. The site converts well when it is found (7 leads from 41 Google clicks in 30 days,
the best ratio in the estate), so the problem is upstream of everything on-page.

**Recommendation: trigger the authority-wall branch.** More content and more on-page work will
not move a corpus Google declines to crawl. The lever is off-site authority, per the standing
constraint that this is a faceless brand. Do not ship further Medical content waves against
this ceiling.

**One caveat on the record.** My first run of this sweep reported `excluded_or_redirect: 115`,
which would have inverted the diagnosis into "Google crawled and rejected them". That was a
tool bug, not a finding: cache reads dropped `coverage_state`, so every cached row fell into
the catch-all bucket. Fixed this session (`_load_inspection_cache` now selects `raw_response`;
`_fill_extended_fields` recovers the three extended fields from it). Verified by re-running
from cache and getting buckets identical to the live API run. Any earlier cached sweep of any
site is suspect and should be re-read.

---

## Agency: PASSES the test, do not escalate yet

**Pre-agreed test:** ≤25 indexed at 28 days (~2026-08-05) ⇒ authority wall ⇒ escalate F11.
Read taken at 26 days.

| Bucket | URLs | Share |
|---|---:|---:|
| Indexed, self-canonical | **36** | 8.3% |
| Discovered, not indexed | **178** | 40.8% |
| Unknown to Google | 211 | 48.4% |
| Crawled, not indexed | 11 | 2.5% |
| Canonicalised away | 0 | 0% |
| **Total inspected** | **436** | |

**Trend:** 18 indexed of 433 at the 2026-07-08 baseline. Now 36 of 436. **Indexed has doubled
in 26 days.**

**Verdict: the test does not fire, and the trend is positive.** 36 clears the ≤25 threshold,
and reading two days early cannot change that (the count only moves up). The 2026-07-08 fix
wave worked directionally.

**But read the shape, not just the headline.** Agency and Medical are in genuinely different
places, and the buckets show it:

| | Medical | Agency |
|---|---:|---:|
| Never discovered | 86.9% | 48.4% |
| Discovered or crawled but not indexed | 3.0% | 43.3% |
| Indexed | 10.0% | 8.3% |

Medical is stuck at **discovery**. Agency is past discovery for 43% of its corpus and stuck at
the **indexing decision**: Google has found 178 pages, queued them, and declined to index them
so far. That is still an authority signal, but it is a later-stage one and it is the stage that
responds to domain-level trust rather than to crawl-budget mechanics.

**Recommendation:**
1. **Do not escalate to F11 yet.** The criterion the owner agreed was not met and the direction
   is right. Escalating now would burn the pre-registration.
2. **Lift the content freeze.** The freeze was "no content ships until the 14d read". Both the
   14d and 28d reads are now done. The freeze has served its purpose.
3. **Set one more read at ~2026-09-01** and watch the 178 discovered-not-indexed specifically.
   That cohort is the live question: if it converts to indexed over the next month, authority
   is building and the site is fine. If it stalls while the unknown bucket keeps shrinking,
   that is the authority wall arriving at agency too, and F11 is the answer then.

---

## What this means together

The estate has two low-indexation sites and they need **opposite** treatments.

- **Medical** needs off-site authority and nothing else. Its problem is that Google will not
  come. On-page work there is currently wasted spend.
- **Agency** needs patience plus whatever raises domain trust. Google is coming; it is not yet
  convinced. A content freeze is no longer the right tool.

Both sit behind the same underlying constraint already recorded estate-wide: the backlink
campaign runs on Property only, and Property is the only site with page-one mass. Agency's
178-page discovered-not-indexed cohort is the cleanest natural experiment available for
whether off-site authority is the binding constraint. If a second site is ever given link
budget, agency is the one where the effect would be measurable.
