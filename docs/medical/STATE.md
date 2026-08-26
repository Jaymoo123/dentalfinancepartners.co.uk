# Medical — program state (living heartbeat)

The single living state doc for the Medical site (Medical Accountants UK). The
methodology lives in the shared engines (`docs/_engines/NETNEW_PROGRAM.md`,
`REWRITE_PROGRAM.md`, `ENGINE_MAP_AND_ONBOARDING.md`); this doc holds only the
site-specific WHAT and the heartbeat. Ground-truth facts live in
`docs/medical/house_positions.md`, never here.

Last updated: 2026-08-26 (Stage 0 diagnosis, Track 2 / R.5).

## Stage 0 diagnosis 2026-08-26 (Track 2 / R.5, first site of the merge-expansion queue)

**Binding constraint: INDEXATION on Google, and it is authority-driven, not a config defect.
Bing is the working channel and converts. The funnel is not the problem.**

Owner decision 2026-08-26 (rollout doc decision 16): Medical is the first R.5 site, taking the
full Property treatment including the DataForSEO query-level competitor pass. Owner decision the
same day on this diagnosis: proceed with content AND run an indexing/authority track alongside,
rather than halting content until Google improves.

All figures below are fresh API pulls of 2026-08-26, never stored snapshots. `gsc_query_data` was
not used and no SUM of it appears here. Raw JSON in session scratchpad `medical_stage0/` (scratch,
not repo).

### Search reality
- **GSC** (`sc-domain:medicalaccounts.co.uk`, 2026-05-28 to 2026-08-26, **data through 2026-08-23**,
  date dimension = unsampled): **97 clicks, 8,267 impressions / 90d, average position 33.18,
  CTR 1.17%**, 88 date rows. Page dimension: 21 pages with >=1 impression. Query dimension: 217 rows.
  Command: `GSCQueryFetcher("medical")` -> `searchanalytics().query(dimensions=["date"])`.
  Note recorded live, not just from the stored table: summing the query dimension gives 3 clicks
  against a true site total of 97, so the undercount trap reproduces against the API itself.
- **Bing** (`GetRankAndTrafficStats`, site truth per the top-N trap memo, 2026-05-17 to 2026-08-23,
  99 daily rows): **326 clicks, 8,903 impressions**. `GetQueryStats` 648 rows and `GetPageStats`
  303 rows are top-N, reference only.
- **Bing out-clicks Google 3.4x on this site** while Google shows a similar impression count at
  position 33. Same channel-truth pattern as Property.

### Indexation - FAIL, and verified by inspection, not inferred
- Sitemap (fetched live 2026-08-26): **130 URLs, 87 of them blog.**
- Only **21 of 130 (16.2%)** earned >=1 GSC impression in 90d; blog subset 17 of 87 (19.5%).
- Zero impressions is only a PROXY for not-indexed, so it was settled directly:
  **GSC URL Inspection API** (`urlInspection.index.inspect`, `siteUrl=sc-domain:medicalaccounts.co.uk`)
  over 27 unique zero-impression URLs (25 random, seed 42, plus the 5 highest-value pages
  `/services`, `/calculators`, `/for-gps`, `/for-locum-doctors`, `/medical-guides`, 3 overlapping):
  **0 indexed.** 17 "Discovered - currently not indexed", 9 "URL is unknown to Google"
  (`lastCrawlTime: never`), 1 "Crawled - currently not indexed" (`/services`, crawled 2026-07-23,
  `pageFetchState=SUCCESSFUL`, `robotsTxtState=ALLOWED`, and still declined).
  Raw: scratchpad `medical_stage0/url_inspections.json`.
- **The usual technical causes were checked and are all CLEAN**, so do not go looking for them again:
  `robots.ts` and the live `/robots.txt` agree and disallow only `/api/` and `/thank-you`;
  `medicalaccounts.co.uk` -> `https://www.medicalaccounts.co.uk/` is a single-hop 308 with no chain;
  3 spot-checked live pages render a self-referential canonical matching the sitemap entry exactly;
  `sitemap.ts` emits the www host with stable lastmod.
- Diagnosis: crawl-demand starvation on a low-authority domain. All 27 inspected URLs report
  `inSitemap=False` in the Inspection response despite being in the submitted sitemap.
- **REFINED SAME DAY, and the refinement matters: indexation is SPARSE, not absent.** The competitor
  pass found two of our URLs holding live Google top-10 organic positions (`/blog/buying-into-gp-partnership-capital-parity-explained`
  rank 6 for "gp partnership goodwill valuation"; `/blog/gp-accounting-guide` rank 6 for "gp partnership
  accounts specialist", DataForSEO live SERP 2026-08-26), and GSC corroborates with queries averaging
  position 10-11 over 90d, which is impossible for an unindexed page. So roughly the 21 impression-earning
  URLs are indexed and the ~109 others are not; the 27-URL sample was drawn from the zero-impression set
  by construction and is representative of THAT set, not of the site. Do not restate this as "the site is
  not indexed". **The indexed slice skews hard to the GP-partnership and goodwill cluster, which is where
  Google already gives this domain air, and is therefore the cluster to push first.**
- **Consequence for spend:** the standard "never spend content on an unindexed site" rule applies
  to GOOGLE only here. Bing indexes the corpus (303 pages in page stats) and is the channel that
  actually delivers, so new content earns on Bing while the Google authority work runs in parallel.

### Conversion funnel - NOT the constraint, and the best in the estate per session
- Leads `source='medical'` (verified by `select source, count(*) from leads group by source`, no
  zero-row key trap here), test-excluded per migration `20260819000003`:
  **19 / 90d, 10 / 28d.** By month: Apr 2, May 0, Jun 1, Jul 9, Aug 9 (to 08-26).
- `estate_kpis` since the bot gate (2026-08-23 to now, the only trustworthy traffic window):
  60 sessions, 52 humans, 47 engaged, 1 lead. 90d: 879 sessions / 647 humans / 19 leads, traffic
  side inflated ~12% pre-gate, leads side unaffected.
- Roughly **1 lead per 46 sessions**. Traffic volume is the lever, not funnel surgery.
- **No invisible-label bug here**: `Medical/web/src/components/forms/LeadForm.tsx` labels use
  `text-[var(--ink)]` (#001b3d) on `--surface` #ffffff. That defect is generalist and digital-agency
  only; do not "fix" it here. Re-verified 2026-08-26 after the §5.0a item 6 link work.
- **`calculator-page-cta` was split per calculator on 2026-08-26.** It was one shared id across all
  ten `/calculators/<slug>` routes, and `vw_cta_performance` groups without `page_path`, so the fleet
  reported as a single uninterpretable row. The ids are now `calculator-page-cta-<slug>`, matching the
  `calculator-gallery-<slug>` pattern that `calculators/page.tsx` already got right. **Any
  `calculator-page-cta` figure dated before 2026-08-26 is the merged ten-calculator fleet total, not
  one calculator.** The discontinuity at that date is the split, not a collapse in conversions. No
  baseline needed restating: the id appears nowhere outside site source, `sweep.mjs` counts
  `data-cta=` occurrences per route rather than ids (the count is unchanged at 1 per route), and
  `deploy-watch.ts` is hardcoded to `site_key='property'`.
- Still merged across routes by design, left alone as genuine global aggregates: `nav-book-call`
  (142 routes) and `specialist_widget` (131). `cta-section-primary` spans 9 routes and is the next
  candidate if anyone needs per-page CTA reads.
- **Two interruptive surfaces are live** and pre-date this work: `DeepScrollModal` and `ReturningBar`,
  both mounted in `src/app/layout.tsx` (lines 117-118), so both render on every route. Recorded here
  because §5.0a item 7 asks whether any exist, and the answer is yes. Neither was added or removed.

### Armed monitored windows - FROZEN, excluded from every sweep
**CORRECTED 2026-08-26: the frozen set is 19 rows, not 16, and the `status` predicate must not be
used.** The correct derivation is `monitor_until > now()` and nothing else:
`select slug, status, monitor_until from monitored_pages where site_key='medical' and monitor_until
> now()`. That returns **19 rows**: 18 blog posts expiring **2026-09-10** plus `__home`
(`page_url = '/'`) expiring **2026-10-06**. Three of the 19 carry `status='flagged'`
(`__home`, `gp-accounting-guide`, `nhs-pension-scheme-pays-doctors-deadlines`) and a
`lower(status)='active'` filter silently excuses all three while their windows are still live. Every
row returned by the date predicate is frozen whatever its status says. Note the status value is
lowercase in this table. The set is the GP-partnership and NHS-pension content plus the homepage,
which is also the site's best-performing content, so the Stage 2 sweep works around them until 09-11.

### Corpus + tooling readiness
- **Namespace finding 2026-08-26, not yet diagnosed:** the corpus is not only `/blog/<slug>`. Live pages
  also exist at `/calculators/nhs-pension-annual-allowance` and `/medical-guides/nhs-pension-annual-allowance`,
  i.e. two further namespaces carrying a page on the SAME topic as each other. Check for cannibalisation
  before writing anything in the NHS-pension lane. Never collapse: differentiate.
- **79 posts** in `Medical/web/content/blog` (the STATE figures of "46" and "73" elsewhere in this
  doc were both stale), dated 2026-04-01 to 2026-07-14. Flat routing, `/blog/<slug>`; the only
  correct link auditor is `scripts/medical_flat_link_audit.py`, never the slug resolver.
- metaTitle/metaDescription present on 79/79; `keyTakeaways` GEO block present on 79/79.
  **`image: ""` on 79/79**, so the whole corpus needs the hero-image backfill that generalist just had.
- `docs/medical/house_positions.md`: 12 sections, last touched `fa8400ab` (2026-06-03). Currency-pass
  candidates are the blocks explicitly locked to 2025/26 language: annual allowance (£60k/£200k/£260k/
  £10k), personal allowance and NIC bands, Class 4 NIC. BADR (14% -> 18% from 6 Apr 2026) and the
  FA 2026 capital allowances are already correctly forward-dated.
- Tooling, each verified by opening the file: `sites/medical.discovery.json` is legacy schema with no
  `lanes` / `lane_negative_tokens` (the lane gate silently skips); `optimisation_engine/corepage/config.py`
  has NO `medical` entry in CORE_PAGES; `sites/medical.json` `paths.topicPool` points at
  `docs/medical/topic_gaps_final.md` which does not exist; `scripts/track2_worklist.py` is a Property
  REBUILD not a flag pass (Property-only SITES dict, DONE-slug lists, cluster regexes).
  READY: `optimisation_engine/blog_generator/site_configs/medical.py` including its `seo_persona`.
- Structural floor present at file level: robots.ts, llms-full.txt + public/llms.txt, sitemap.ts,
  schema.ts, blog opengraph-image.

### Corrections to this doc made in the same session (living-doc contract)
The 2026-07-17 read ("~11/117 indexed", 68.8 impressions/day) is superseded by the pull above. The
"46 blog posts" and "73" counts were wrong (79). The 2026-07-20 / 2026-08-03 fix-wave checkpoints
named in this doc were never closed out in writing and are treated as lapsed; the 2026-08-26
diagnosis replaces them.

**FROZEN-SET DEFINITION, CORRECTED 2026-08-26. Binding estate-wide, and the old form is a live trap.**
The armed set is **`monitor_until > now()`, with NO status predicate.** Every query in this repo and in
the session that produced this correction used `status = 'active'` (or `lower(status)='active'`), which
SILENTLY EXCUSES rows at status `'flagged'` that still have a live measurement window. On Medical that
understated the frozen set by three pages: the true count was 19, not the 16 that the dossier, the batch-1
packs, the SERP meta pass and this doc all reported.

`'flagged'` does NOT mean cleared. It is written in exactly one place (`detectors.py:1400`) and nothing
resets it: the regression detector fired DURING the window and stamped the row so the weekly job would not
re-mail the same finding. It is a de-duplication marker on an OPEN regression, so a flagged row is arguably
MORE sensitive than an active one, not less.

Consequence on Medical, recorded rather than hidden: two flagged pages took an image-only frontmatter change
(no text touched, no measurable effect) and the third, the homepage, stored under the slug `__home` with a
window to 2026-10-06, was fully rewritten by the planned corepage pass. That window is knowingly re-baselined.
The homepage was invisible to every exclusion list precisely because of this predicate plus its non-obvious slug.

Derive the armed set with:
`select slug, status, monitor_until from monitored_pages where site_key='<site>' and monitor_until > now();`
and treat every row it returns as frozen, whatever the status says.

## SESSION CLOSE 2026-08-26: where Medical stands and what the next agent does first

**No separate handoff doc exists, by house rule. This section and `docs/_engines/PROPERTY_STANDARD_ROLLOUT.md`
(runbook R.5, decisions 16 to 22) are the handoff. Read them, then the packs.**

### What shipped into the repo today. Nothing is deployed.

| Work | Count | Where |
|---|---|---|
| Batch 1, existing pages rewritten or extended | 12 | 6 markdown, 6 TSX/TS surfaces |
| Batch 2, net-new | 7 | `Medical/web/content/blog/` |
| Coverage clusters, net-new | 2 | opticians, allied health |
| Commercial pages rewritten | 6 | homepage plus 5 |
| `/resources/` pages repurposed | 3 | now document the downloadable models |
| Titles and descriptions rewritten | 21 | 34 more deliberately left alone |
| Hero images backfilled | 79 | whole corpus |
| Calculators corrected | 4 | two were publishing invented figures |
| Spreadsheet models corrected | 2 | both computed tax wrongly |

Corpus 79 markdown posts to 88. Real indexable surface is **138 sitemap URLs**, not the 149 previously stated and
not the 86 a markdown glob returns; a glob misses 52 TSX, TS and derived surfaces. Derivation in `BATCH3_INDEX.md` §2.1.

### THE FIRST THREE THINGS THE NEXT AGENT DOES, in this order

1. ~~**Re-derive the peer-winnable column before touching the batch 3 order.**~~ **DONE 2026-08-26, same day.
   Nothing re-sequences, so go straight to point 2.** The harvest is confirmed at **39,296 rows across 44 domains**,
   not the 32,872 across 27 that most documents still repeat. The unclassified set was **17, not 22** (the 22 figure
   double-counted the five §2b institutional non-peers, which were classified all along). All 17 are private
   accountancy firms and therefore peers, so the peer set is **39 of 44**. Re-deriving the §4 column against it moves
   **two rows** (uniform 27,550 to 30,860, pharmacist 2,090 to 2,610) and reorders none: row 4 stays first, row 9
   stays ninth. The widening adds 902 keywords corpus-wide but only **38 of them carry any medical vocabulary**,
   because the 17 domains are mostly generalists ranking for `shopify accountants` and the like. Full working,
   including the exact peer list and the method's limits, is `BATCH3_INDEX.md` D13. D12 was closed in the same pass:
   opticians and allied health are still unpackable on the full 44 domains, so the $1.13 unblock remains the only
   route to them. **$0.00 spent, SQL only against the persisted harvest.**
2. **Write batch 3 waves A and B.** Nine packs are frozen at `docs/medical/packs/PACK_B3_*` with an ownership map
   (rows O19 to O35) built BEFORE the packs and repeated inside each one. Wave A is GP funding, 6 pages; wave B is
   premises, 3. Conductor rulings that unblock them are in `BATCH3_INDEX.md` under "CONDUCTOR RULINGS".
3. **Then the dual QA, both tracks, no exceptions.** Today the second track caught two blocking defects the first
   had passed and the writers had each self-verified. That is the single highest-value step in the process.

### Standing state a new agent will get wrong without reading this

- **The frozen set is 19 rows**, derived with `monitor_until > now()` and NO status predicate. Three sit at
  `status='flagged'` (`__home` to 2026-10-06, `gp-accounting-guide` and `nhs-pension-scheme-pays-doctors-deadlines`
  to 2026-09-10). A `status='active'` filter silently excuses them and that mistake has already been made twice.
- **Nothing ever resets `flagged` to `active`.** A false positive permanently drops a page out of every routine
  sweep. See the CARETAKER false-alarm class: the detector that flags them reads the sampled query table, compares
  a 28-day window to a 90-day baseline while storing but never reading its own baseline setting, and averages
  position unweighted. Re-derive any flagged row from the APIs before believing it.
- **`docs/medical/ready/nhs-pension-scheme-pays-doctors-deadlines.md` is a finished page held for 2026-09-11.**
  Its three live factual errors were corrected early today under the rule below; the header block says exactly what
  was applied so nobody re-applies it.
- **From 2026-09-11 also:** waves D, E, F and H, and the one-line change making the blog category eyebrow a link,
  which would give all eight pillar hubs their first inbound links from the 79 posts. Wave G waits on data to
   2026-09-24, not on a freeze.
- **The governing principle, applied three times today: a rule that protects a measurement must never be allowed to
  preserve a defect.** Stale year tags, live factual errors and ownership breaches inside frozen copy are all
  corrected; structure, positioning and headings are not touched.
- **Ground truth is unusually strong and was corrected four times today**, including twice after being "verified"
  the same morning. Two standing method rules came out of it: check a Directions or Regulations citation for
  AMENDING INSTRUMENTS before locking a figure, and never read an amending instrument without reading the text it
  amends. Both are in `house_positions.md`.
- **Blocked figures: only the GMC annual retention fee remains.** The Global Sum (£130.07) and the QOF point value
  (£227.95) were both settled at source today and are usable with citations. Any gate still blocking them is stale.

### Known defects recorded, deliberately not fixed

`/blog/locum-tax` and `/blog/gp-tax-and-accounts` are to be LEFT ALONE, not "not yet": both are the best untreated
pages on the site and a rewrite would reset a working measurement. The monitored-pages detector needs its own pass.
Two sentences of architecture jargon sit on Property, untouched under the standing rule. 364 pages estate-wide
exceed the new meta length warning. `GenericTool` has no table field, decided against. Four sibling sites share the
`<dt>`-without-heading weakness, recorded and not actioned.

### Owner-gated, none of it started

Publishing everything above. Registering changed pages in `monitored_pages`, which writes to production. IndexNow
submission after any deploy. The owner's standing instruction today was to hold all of it until Medical was complete.

## Backlog raised during batch 1 (2026-08-26), not actioned mid-batch

1. **The calculator renderer drops `workedExamples[]` entirely.** `Medical/web/src/app/calculators/[slug]/page.tsx`
   renders `explainer.heading` plus two fixed headings, renders FAQ questions as `<dt>` rather than
   headings, and never renders `workedExamples[]` even though the shared tool type carries the field.
   Consequence: a worked example authored into any calculator config is INVISIBLE to readers and to
   crawlers, and the language spec's heading-structure rules are unreachable on every calculator page
   by construction. Found while writing `/calculators/nhs-pension-scheme-pays`, 2026-08-26. This is a
   template fix affecting the whole calculator fleet, so it was deliberately not attempted mid-batch
   while ten writers were live. Verify the same gap on the sibling sites before fixing, and fix the class.
2. **Three `/resources/` pages are outside the whole Track 2 scope so far**: `/resources/nhs-pension`,
   `/resources/locum`, `/resources/incorporation-private`. `/resources/nhs-pension` earns 49 Google
   impressions at position 13.5, better than most counted pages. The live indexable corpus is 108
   pages, not the 105 the dossier counted or the 79 a markdown glob returns.
3. **Three `monitored_pages` rows sit at status `flagged`**, so they are caught by neither the armed
   test nor the expired test. One is `nhs-pension-scheme-pays-doctors-deadlines`, which holds the
   second-highest-confidence topic in the market map and the batch's biggest forgone prize. Resolve
   the flag state, then take it as batch 2 item 1.
   **RESOLVED 2026-08-26 for that row, and the answer generalises: the flag was a DETECTOR ARTEFACT,
   not a regression.** See item 3a.

3a. **`detect_monitored_page_regressions` produces false positives, and flagged rows estate-wide may be
   the same artefact.** Established 2026-08-26 while preparing `/blog/nhs-pension-scheme-pays-doctors-deadlines`.
   Do **not** change the detector on the strength of this note; it is estate tooling
   (`optimisation_engine/analysis/detectors.py`) and needs its own deliberate pass with its own
   verification. This entry exists so that pass starts from evidence rather than from scratch.

   **The case.** `monitored_pages` id 501, flagged 2026-07-19 18:02:04. Baseline stored at registration
   on 2026-06-12 with `baseline_window_days = 90`: Google clicks 0, impressions 15, position 48.53;
   Bing impressions 0, position NULL. The detector's current-window read of `gsc_query_data` for the
   28 days to 2026-07-19 was **1 impression, 0 clicks, avg position 54.00**. Two conditions therefore
   fired: impressions, because `15 >= 10` and `1 < 15 x 0.5`; and position, because
   `54.00 - 48.53 = 5.47 >= 5.0`.

   **A fresh GSC API pull for the identical window says 35 impressions at position 8.8**, against 51
   impressions at position 19.7 in the 28 days before the 2026-06-12 rewrite. The page was improving
   sharply. There was no regression to detect.

   **Three contributing causes, all independent, all fixable separately.**
   - **It reads the sampled table, not the API.** `current` is built by summing `gsc_query_data`, which
     is PARTIAL and sampled (memory `gsc_query_sum_undercount`; Property showed 22 stored clicks per
     28d against 510 from the API). Here it undercounted 35 impressions to 1, a factor of 35.
   - **A 90-day baseline is compared against a 28-day current window.** `baseline_window_days` is stored
     on the row and is simply never read by the detector, which hardcodes `window_days=28`. Any row
     registered on a 90-day baseline is structurally biased toward firing the impressions condition,
     because it compares three months of history with one month of present.
   - **Position is an unweighted `AVG(position)` across query-days**, not impression-weighted. A handful
     of one-impression tail queries at position 90 moves the mean several places on a low-volume page.
     On this page the fresh impression-weighted position was 8.8 while the unweighted stored average
     was 54.00.

   **Scope.** Any row whose baseline was captured at a window length other than 28 days, or whose page
   is low-volume enough for `gsc_query_data` sampling to bite, is exposed. That is most of the corpus.
   `__home` (medical, flagged 2026-07-27) and `gp-accounting-guide` (medical, flagged 2026-07-19)
   should be re-derived the same way before either is treated as a real regression, and the same check
   should be run across the other sites' flagged rows.

   **Second-order effect worth naming.** Because `status='flagged'` is written only to suppress repeat
   mail and nothing ever resets it to `active`, a false positive permanently removes a page from the
   `status='active'` sweeps as well. So a detector artefact silently converts into a page that no
   scheduled job looks at again. That is the more expensive half of this bug.
4. **Dossier vs pack divergence on per-topic keyword counts is unreconciled** and in places flips
   priority order (`/blog/nhs-pension-planning` peer-winnable 70 against 4,590; `/calculators/nhs-pension-scheme-pays`
   91,230 against 2,880). The dossier's seed-node clustering both fragments term families and drops
   1,336 below-threshold keywords. The packs rebuilt the sets locally with the regex printed. Neither
   was harmonised, deliberately. Decide which is canonical before batch 2 sequencing.
5. **Bing impressions are reported two different ways** (`GetPageStats` page-level against
   `GetPageQueryStats` named-query level, 261 against 129 on the same page). Both are true and they are
   never comparable to each other. The REWRITE_PROGRAM §9.2 equity grade test is written on
   "impressions" without naming the endpoint. Name it before the next grading run or grades drift.
7. **~~Five guides render raw markup~~ CORRECTED 2026-08-26: the defect is REAL but currently UNREACHABLE, and
   no guide renders broken today.** Verified by building the site and grepping all six built guide HTML files for
   escaped markup: zero hits, and running the renderer logic over the live guide data matched 0 lines. The pattern's
   character class is uppercase-only (`[A-Z0-9/]+`), so "Sole trader:", "The 1995 section formula" and similar never
   matched; "1995 section:" did, which is why the annual allowance guide broke, and its batch-1 restructure removed
   the only line in the corpus that could hit it. The earlier claim here that five other guides still carry it came
   from a writer's report and was not re-derived. Fixed anyway at the root (`splitLabelledLine` in
   `Medical/web/src/lib/markdown-utils.ts` returns the label as DATA so the template renders a real element), because
   any future "NHS employees:" line would silently re-arm it. Test left behind walks the live corpus.
   ORIGINAL DESCRIPTION, for the record: `medical-guides/[slug]/page.tsx` `renderBody()` injected a literal `<strong>`
   string into a React text node** for any body line matching `^[A-Z0-9/]+ (section|trader|company|employees?):`, so the markup renders
   as visible text rather than as bold. The live annual-allowance guide was hitting this on its "1995 section:"
   lines. The batch-1 rewrite sidestepped it by restructuring those lines, so that one guide is clean, but the
   bug remains for the other five guides and it is a rendering defect visible to readers. Fix the class.
8. **CLOSED 2026-08-26: the calculator template silently dropped `workedExamples[]`, and it was reader-visible.**
   Confirmed from the built DOM, not the code: `gp-partner-drawings-planner.html` contained none of its authored
   worked example and none of its six computed figures, and the page had zero heading layer because FAQ questions
   rendered as bare `<dt>`. Both fixed in Medical's calculator template (the `workedExamples` block was lifted from
   the existing wills-probate implementation; `<dt>` now wraps an `<h3>`). Estate check: construction-cis,
   divorce-finances, wills-probate and Property already rendered it; Medical was the only site with populated configs
   and no renderer. Eleven other sites lack the renderer but populate nothing, so they carry a latent gap and no
   defect. `GenericTool` still has no table field; DECIDED not to add one, since worked examples now carry what was
   being forced into prose and a table field means a type change plus five templates plus config migration.
   Dentists, digital-agency, generalist and Solicitors share the `<dt>`-without-heading weakness: recorded, not actioned. Consequence:
   year-tagged allowance-history vocabulary cannot be placed on a calculator page without becoming a keyword
   dump, and the language spec's heading rules are structurally unreachable there. A `table` field on the shared
   type would close both. Deliberately not attempted mid-batch.
9. **Live pipeline artefact found and fixed** on `/research/annual-allowance-pension-tax-index`: the page was
   rendering a writer instruction as body copy ("Label clearly as a single-year illustration on a different
   counting basis..."). An estate-wide grep for the class (`label clearly`, `verify at build`, `writer note`,
   `per the brief`, `(HP<n>)`, `insert figure`) across every site's `web/content` and `web/src/app` on
   2026-08-26 returned **zero** further instances, so this was an isolated escape, not a systemic one. The
   only greps that matched elsewhere were `placeholder` attributes on admin login inputs, which are not copy.
6. **bma.org.uk still publishes 2025/26 tier bands**, superseded by the 1 April 2026 uplift, so
   `/calculators/nhs-superannuation-tiered-contribution` is worth a delta check against the current
   NHS Employers table.

## 2026-08-25 — Port-branch merge: nothing pending for this site

`design/property-redesign-port` was merged to main on 2026-08-25 (Property Standard
rollout, decision §8.10). Passenger enumeration for this site: **34 commits** were on
the branch and not in `origin/main`.

**All 34 are already on production, so the merge ships nothing new here.** This site's
live production deployment is SHA `435cc12e`, deployed 2026-08-24 ~20:2x UTC
(Vercel API `GET /v9/projects` -> `targets.production.meta.gitCommitSha`, readyState
READY, read 2026-08-25; this is what the production alias actually points at, which a
`/v6/deployments` listing alone would not prove), and
`git log 435cc12e..design/property-redesign-port --oneline -- 'Medical/'` returns 0.
Main was BEHIND production for this site, not ahead of it.

Reproduce the passenger list: `git log 902ea014..435cc12e --oneline -- 'Medical/'`.
Everything on it (estate lead-parity port, pool-model disclosure sweep, FA 2026 factual
sweeps, the 2026-08-24 consent-wording revert) is live and was deployed before this merge.

## Heartbeat 2026-07 (diagnosis + fix wave + early check)
- 2026-07-06: full SEO/indexing diagnosis (`DIAGNOSIS_2026-07_SYNTHESIS.md`) — root cause Google discovery failure (103/112 never crawled). Fix wave SHIPPED same day (6d0c1930 + 4702b8bd): sitemap lastmod pinned, llms.txt de-phantomed, blog SSR all posts, orphans cross-linked, 5 new posts (corpus now 78). Deployed dpl_HHomcnfjnDbC9bRB9A3878r7HdST.
- 2026-07-17 EARLY CHECK (fresh GSC + Bing + 40-URL inspection sample): PARTIALLY WORKING. All 5 new posts "Submitted and indexed" (4 earning impressions); sitemap re-downloaded 07-09 (97→117 URLs, 0 errors); impressions 42→68.8/day, clicks ~1.2/day; Bing 38→43 pages / 706→945 impr / 70→90 clicks; "gp accountants" pos 54.5→49.0. BUT all legacy core pages + all 24 sampled previously-unknown URLs STILL "unknown to Google" (~11/117 indexed). Action: confirm owner actually did GSC-UI Request Indexing (MED-F2); if done and still unknown at ~28d, authority-wall branch triggers (pivot to faceless off-site authority). No hard watch windows (owner call 2026-07-17) — check anytime.
- UNDEPLOYED: /research routes (commit 4aa24075, 404 live) + gap-fill pillar `private-practice-incorporation-complete-guide` (f7dda599, currently 301s to medical-practice-incorporation-step-by-step live).

## Site facts
- Brand: Medical Accountants UK · domain `www.medicalaccounts.co.uk`
- Vercel: project `prj_50vByZ3rqXQQwCUeENUTBbNBB41n` (org `team_XF9WAygZX7SGk9Fo4tOAnihH`), project.json at `Medical/.vercel/project.json` (note: at `Medical/.vercel/`, not `Medical/web/.vercel/`; rootDirectory = `Medical/web`)
- GA4: `G-CQF7KFZ1P6` · IndexNow key `8ced3150f417cef04367b717f0d21dc1` (key file at `Medical/web/public/8ced3150f417cef04367b717f0d21dc1.txt`)
- GSC property: `sc-domain:medicalaccounts.co.uk` (canonical owned property; see Onboarding below)
- Audience: UK GPs, salaried/partner; hospital consultants; private-practice owners; locum doctors; junior/training doctors
- Existing corpus: 46 blog posts (GP-heavy, broad-but-shallow), 9 categories, `/for-{gps,consultants,locum-doctors,junior-doctors}`, `/free-practice-health-check`, `/calculators`, `/nhs-pension`, `/medical-guides`, `/services`, `/locations`

## Onboarding status (engine-readiness) — 2026-06-03

**Done**
- GSC property confirmed `sc-domain:medicalaccounts.co.uk` (the OAuth account owns it as siteOwner). The Supabase `sites.gsc_property_url` for medical was ALREADY correct; the only stale reference was the cosmetic `site_url` LABEL in `gsc_page_client._SITE_URL_MAP['medical']` (was the dead `medicalaccountants.co.uk`, one letter group off), now fixed. The query fetcher reads the Supabase value, so ingestion was already correct. Re-ingested 90d: 373 query rows.
- `sites/medical.json` wave-runner config created + validated (Get-SiteConfig 'medical' loads; buildDir, blogContentDir, housePositions, Vercel projectJson, siteConfigJson all resolve).
- IndexNow key generated + registered: `optimisation_engine/indexing/config.py` medical entry + key file in `Medical/web/public/`.
- Discovery: `sites/medical.discovery.json` authored (medical topic tokens + 24 topic buckets + news/evergreen patterns). Competitors SERP-derived via `derive_competitor_universe.py` (top by head-query frequency: medicsmoney, r-m-t, nicholsmedical, sial-accountants, bw-medical, sandisoneasson, ramsaybrown, hawsons, jcssutton, azets, medicaccountants, gpaccountant, +others). `topic_gap_finder.py` + `topic_gap_filter.py` produced `docs/medical/topic_gaps_first_cut.md`: **668 filtered gap topics across 25 buckets** (raw first cut, an upper bound; the genuine medical-specialist signal sits in NHS pension, BADR/CGT, buying-into/selling a practice, incorporation, PCN/ARRS, locum, premises, GP partnership; the bulk of the "Other"/VAT/payroll buckets is generalist noise from azets/hawsons/medicaccountants that the brief agent filters by reasoning).

**In progress**
- `docs/medical/house_positions.md` rebuild to dentists-grade (## N sections, Statutory hooks + HMRC anchors + Practical writing rule per section, Verification log, Citations index): authored by an Opus sub-agent that verifies every statute/rate at primary source. Replaces the older thin 2026-05-21 rewrite-era doc; preserves the medical-specific facts (NHS GP goodwill-sale prohibition since 1 Apr 2004, GP premises/notional-cost-rent, type 1/2 pension certification, LSA/LSDBA).

**Deferred / not on the net-new critical path**
- Bing: ingest before running the rewrite ROI worklist (net-new feeds off competitor crawls, not own organic, so not a blocker here).
- `SITE_RULES[medical]` (competitor/brief_for_opus.py) + `CORE_PAGES[medical]` (corepage/config.py): add when first running the rewrite / core-page engines for medical. The captured head family ("gp accountants", "medical accountants uk", "gp practice accountants") seeds the core-page engine later.
- Formal `/run-netnew-wave medical <wave>` conductor command: driving Wave 1 manually as conductor for now.

## Coordination note (parallel agents, one repo)
- A medical REWRITE agent is live in the MAIN tree at the same time. Net-new and rewrite SHARE one file: `docs/medical/house_positions.md` (rebuilt here to dentists-grade, a strict upgrade; rewrite sessions read it but do not write it). Net-new flag/tracker files are `wave1_*`-prefixed (per `sites/medical.json` naming) and do NOT collide with the rewrite agent's `page_rewrite_tracker.md` / `site_wide_flags.md`. Neither agent commits or deploys; the human reconciles + ships.

## Signal read (why net-new first)
Medical is indexed and earning impressions for its head family ("gp accountants" 844 impr, "medical accountants uk" 177, "gp practice accountants" 101, "gp accountant" 63, "specialist medical accountants" 45) but ranks page 5-9 (positions ~53-94) with 0 clicks in 90d (1,408 impr / 53 distinct queries). Own-site organic is too thin for the rewrite/core-page engines to bite yet; net-new (gap pool from competitor crawls + cannibal-checks against the 46 indexed posts) is the right lead engine to build topical depth. Same shape dentists had.

## Net-new program heartbeat
- Wave 1 (proving wave): 9 pages WRITTEN + VERIFIED 2026-06-03, awaiting user commit + deploy. Build GREEN (next build exit 0; all 9 new pages statically generated under /blog/[slug]). Flat-link floor 0 HARD 404 (corpus-wide), six-check floor passed (0 em-dashes in the 9). Clusters: A NHS pension beyond the AA basics (McCloud / Scheme Pays deep-dive / partial retirement, §2.A/§2.D/§2.E), B GP surgery premises (notional vs cost rent / last-man-standing / own-vs-rent, §4 premises), C practice sale, goodwill & CGT (NHS goodwill ban SI 2019/251 / private-practice BADR / s.162 incorporation relief, §4+§5). HP extended at the gate: FA 2026 s.39 makes s.162 a CLAIMED relief from 6 Apr 2026; Premises Costs Directions 2024 locked. NOT committed, NOT deployed.
- Wave 2 (18 net-new): WRITTEN + VERIFIED + SHIPPED 2026-06-03. 6 clusters: A GMS funding (Global Sum/Carr-Hill, QOF, enhanced services), B PCN/ARRS (Network Contract DES, ARRS reimbursement, clinical-director pay), C other income (dispensing zero-rate VAT, private/non-NHS, PCSE reconciliation), D partnership accounts (reading accounts, drawings vs profit, basis-period reform), E joining (capital buy-in/parity, mutual assessment, financing + ITA 2007 s.398 interest relief), F leaving/mergers (retiring/cessation, mergers, expense-sharing). HP extended at the gates: §6.A dispensing-drug VAT zero-rating (Sch 8 Group 12). FUTURE HP-lock candidates (deferred): basis-period reform, qualifying-loan-interest-relief.
- COMMITTED + DEPLOYED 2026-06-03: commit fa8400ab on main (medical-scoped: 27 net-new + 46 Track-2 rewrites + onboarding). Deployed to production via root-.vercel-swap + `vercel deploy --prod` from repo root; live + aliased at https://www.medicalaccounts.co.uk (new pages return 200). IndexNow: 73 URLs submitted (HTTP 202).
- Pages live (net-new): 27 (9 Wave 1 + 18 Wave 2). Corpus now 73 posts.
- Pipeline PROVEN end-to-end for medical: GSC fix -> discovery (668 pool) -> picks + cannib GREEN -> per-cluster briefs -> conductor HP-lock gate -> pages -> six-check + flat-link floor + green build -> commit + deploy + IndexNow. Scaled from 9 (Wave 1) to 18 (Wave 2).
- Wave 1 surfaced a rewrite-engine backlog (gp-vat-registration £85k + "private = standard VAT" error; becoming-gp-partner Class 4 9%; GMC fee £425; legacy em-dashes; gp-accountant-cost pricing) - see wave1_page_tracker EXISTING_PAGE_STALE list.
- Link tooling note: medical is FLAT-routed, so the shared nested auditor (track2_link_audit / predeploy_gate link check) reports false-positive HARD 404s; use scripts/medical_flat_link_audit.py (added this onboarding) for the real floor.

- SERP META BATCH 1 (2026-06-12): 18 pages re-titled/re-described from fresh 90d GSC + Bing query data, deployed + IndexNow'd; 90-day regression watch in monitored_pages (to 2026-09-10); engine + methodology in docs/_engines/SERP_META_PROGRAM.md; content-gap follow-ups in docs/medical/opportunity_register_meta_2026-06-12.md.
- TRACKING FIX (2026-07-08): medical monitored_pages rows had CATEGORISED page_url paths (/blog/<cat>/<slug>) but the live site serves FLAT routes (/blog/<slug>) — every monitoring join silently missed. All 18 rows + 10 audit-row URLs corrected to flat; scripts/register_monitored_batch.py now emits flat paths for medical automatically. If registering medical pages, page_url must be /blog/<slug>. Analysis-only this cycle (signal window open); Bing is the working channel (batch-1 pages 276->625 Bing imp); no meta batch until fix-wave checkpoints (~07-20/08-03) read out.

## Blog audit + rewrite program (2026-06-12)

- Provenance: 46 track2-rewritten + 27 opus-wave, ZERO deepseek-era posts. Medical is the most mature corpus in the estate.
- No rewrite candidates identified: the entire corpus was either Track-2 de-staled or opus-wave written; the quality floor is already met.
- Flat routing onboarded into all 4 track2 wf.js targets: writer and QA prompts branch to flat /blog/slug links; track2_link_audit.py gained a flat mode; verified 0 HARD / 0 SOFT on the current corpus.
- generator: frontmatter field backfilled on all 73 posts; all pipelines write it going forward (see docs/_engines/ENGINE_MAP_AND_ONBOARDING.md section 5).
- Methodology: docs/deepseek_quality_audit_2026-06-12.md + docs/provenance_summary_2026-06-12.md + docs/_engines/rewrite_gold_patterns.md.
