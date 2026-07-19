# SERP Meta Optimisation Program (GSC + Bing query-driven)

Standing engine for optimising metaTitle/metaDescription against real search-query demand, estate-wide. First run: 2026-06-12 (medical, dentists, generalist, solicitors, agency; 157 pages). Property runs separately through the Track-2 rewrite engine and joins this cadence once its post-rewrite maturation window closes.

## What it does

Pages that earn impressions but few clicks are losing the SERP click, not the ranking. This engine refreshes Google Search Console + Bing Webmaster query data, ranks every page by CTR shortfall (impressions x [expected CTR at position - actual CTR]), rewrites the meta pair for the dominant query intent, applies with full audit + rollback, and watches for regressions for 90 days.

Scope per run is **meta-only**. Content gaps and intent mismatches surfaced by the query data go to a per-site opportunity register (`docs/<site>/opportunity_register_meta_<date>.md`), never auto-edited. Core pages (homepage, /for-*, TSX-routed) are excluded from auto-edit (HP-lock); their demand also lands in the register.

## Pipeline (one cycle)

1. **Refresh** (Python, free):
   - `python -m optimisation_engine.ingestion.ingest_gsc_queries --days 90`
   - `python -m optimisation_engine.ingestion.ingest_gsc_pages --days 90`
   - `python -m optimisation_engine.clients.bing_query_client <site>` per site (Bing is snapshot-based; latest snapshot date only is used downstream)
2. **Worklist**: `python scripts/meta_worklist.py --site <key>` → `.cache/meta_program/<site>/worklist.json` (top 40 by CTR-shortfall score, min 5 impressions) + the opportunity register. GSC 90d + Bing latest snapshot merged per (page, query): impressions/clicks summed, best position kept.
3. **Copy (Opus subagent, one per site)**: receives the worklist, the site's `seo_persona` (`optimisation_engine/blog_generator/site_configs/<site>.py`), and the hard rules below; reads every target page body; writes `.cache/meta_program/<site>/proposals.json`.
4. **QA (Sonnet subagent, one per site)**: adversarial check of every proposal against worklist + page body: fabrication (figures must exist in the body), misrepresentation, query alignment, mechanical rules, regression risk. Verdicts → `.cache/meta_program/<site>/qa_verdicts.json`. Manager adjudicates "fix" verdicts and patches proposals directly (no second Opus round needed when QA supplies the fix).
5. **Apply**: `python scripts/meta_apply.py --site <key> --proposals <json>` (dry-run default; `--execute` to apply). Validators re-check everything; applies via the `meta_only` lifecycle: `metaTitle_prev`/`metaDescription_prev` preserved, dateModified stamped, atomic write, `optimisation_changes` audit row (change_type `title_meta_rewrite`). No git commit from the script.
6. **Baseline**: `python scripts/register_monitored_batch.py --site <key> --slugs <slugs...> --commit` → 90-day Google+Bing baselines in `monitored_pages`; the existing `detectors_v2` monitored-page detector watches for regressions.
7. **Ship**: `npm run build` per site (must be green) → one git commit per site → `vercel link --yes --project <name>` at REPO ROOT then `vercel deploy --prod` (projects have Root Directory set to `<Site>/web`; never link inside the site dir) → spot-check live `<title>`/description → IndexNow submit changed URLs.
8. **Read results**: weekly_run step 5 auto-reviews `optimisation_changes` outcomes after 28d; monitored-page regression detector runs daily. Read per-batch via `monitored_pages` + `vw_change_performance`.

## Hard copy rules (validator-enforced)

- metaTitle 50-60 chars, front-loads the dominant query's core noun phrase; brand pipe only if it fits.
- metaDescription 120-155 chars; opens with searcher outcome; exactly ONE specific figure **taken from the page body**; closes with benefit/action.
- No em/en-dashes; no hype words (ultimate, unlock, secret, amazing, discover, supercharge, essential, comprehensive, game-changing); UK English; tax years as 2026/27; no title↔description duplication; titles unique site-wide.
- No fabrication: every figure must appear in the page body. If the body itself is wrong (it happens: see CS01 penalty page, 2026-06-12), fix the page first or pull it from the batch; never ship a meta repeating a false claim.

## Model tiering (cost policy)

- **Python** does all data work (refresh, worklist, validation, apply, baselines). Free.
- **Opus 4.8** writes the user-facing copy. One batched agent per site, never per page.
- **Sonnet** does the independent QA pass and tooling authorship. One per site.
- **Manager** orchestrates, adjudicates QA verdicts, patches proposals via small Python scripts, commits, deploys. Keep manager context flat: agents return counts + flags, not prose.
- Gotcha: do NOT pipe Python containing non-ASCII (em-dashes, £) through PowerShell stdin; it mangles to `?`. Write patch scripts to files with the Write tool.

## Validator gotchas (known, accepted)

- `metaTitle_contains_query_token` does exact token match, no stemming: "calculation" ≠ "calculate", "solicitors" ≠ "solicitor". When QA confirms the title is right and the query token is a plural/typo artifact, repoint `primary_query` to a normalised phrasing of the same intent rather than distorting the title.
- Worklists can contain the same file under multiple URL variants; dedupe proposals by `file` before apply (keep highest-scored row).
- Junk long-tail dominant queries (1 impression, malformed) are common on thin pages; the copy agent substitutes the page's real head noun phrase.

## Cadence + scope bar

- **Monthly per site** while sites are young (data accrues slowly); a site enters a cycle when it has ≥5 pages with ≥10 combined impressions (90d GSC + Bing) that are not already under a recent (<28d) meta change or rewrite watch.
- Re-running on pages changed <28d ago is forbidden (no signal yet); the detectors' recently-optimised guard enforces this.
- Quality bar is absolute (gold-standard rule): a smaller truthful batch beats a bigger sloppy one.

## First-run results log

- **2026-06-12 batch 1 + generalist tail**: medical 18, dentists 35, generalist 39+22 (tail extended coverage to every page ≥8 impressions after the top-40 cap was found to cut real demand; cap is now a smell, not a rule), solicitors 35, agency 30 = **179 meta pairs**. Plus corrective content work the QA layer forced: CS01 penalty page fully rewritten (presented annual-accounts penalty bands as CS01 fines; GOV.UK-verified rewrite), employee-mileage-45p page rewritten and director-mileage + delivery-drivers pages back-patched (stale 45p AMAP; 55p from 6 Apr 2026). 197 pages monitored to 2026-09-10. QA caught 13 real issues pre-ship (7 fabrication/staleness, 2 misrepresentation, 4 alignment). Yield at decision time: generalist 58 pages ≥10 impr / dentists 15 / solicitors 23 / medical 13 / agency 9.
- Read the 28d outcome verdicts from ~2026-07-10 via weekly_run step 5.
- **2026-07-08 batch 2**: solicitors 19, generalist 12 (13th pulled: BADR page body cites stale 14% rate, needs factual fix first), dentists 10 = **41 meta pairs**, deployed + IndexNow same day; monitored to 2026-10-06. 26d batch-1 pre-read: impressions up strongly (dentists +254%, solicitors +331%, Bing 3-7x) but clicks ~0 — position, not snippet copy, is now the binding constraint (see `meta_batch1_verdicts_2026-07.md`). Tracking defects found+fixed this cycle: empty `target_url` in all batch-1 audit rows (meta_apply now populates it; 179 backfilled), medical monitored paths were categorised vs live FLAT routes (corrected), weekly_run verdict window capped at 28d + no-signal/immature-baseline tagging, `net_new` rewrite_type added and 203 ranking-but-unmonitored pages registered.

## Analysis methodology v2 — change-aware, isolated (2026-07-19)

All verdicts and new proposals now run through the v2 analysis layer (Property is
the reference implementation: `scripts/meta_property_ledger.py` +
`scripts/meta_property_analysis.py`). Rules are hard requirements, not guidance:

1. **Intervention ledger first.** Per canonical page, union of `optimisation_changes`,
   `monitored_pages`, and git frontmatter history of metaTitle/metaDescription edits
   (catches unaudited/manual passes; the file-creation commit is birth, not an edit).
   Birth = min(first git commit, first GSC impression). URL canonicalisation must
   merge www/non-www, path-only, flat-vs-categorised and miscategorised slug variants
   (all four occur in real data).
2. **Cohort decomposition.** Fixed 28d PRE/POST windows at the data edge; every page is
   NEW (born after PRE start) / CHANGED (intervention in window) / CONTROL (untouched,
   >=90d old). Site deltas are always reported as the three-term sum - new-page growth
   is never optimisation credit (the batch-1 confound, made structural).
3. **Difference-in-differences.** Control drift r = exp(median per-page log(post/pre)),
   per position band (1-10/11-20/21+); changed-page deltas are adjusted by r_band
   before any verdict. Control <20 pages or <500 pre-impressions -> `control_weak`;
   |log r| > 0.2 -> `window_volatile` (check the manually maintained ALGO_UPDATES list
   in the analysis script against Google's Search Status Dashboard).
4. **Per-intervention windows.** post=[ship+4, ship+31], pre=[ship-29, ship-2].
   Neighbouring interventions truncate windows; truncated <14d -> `confounded`
   (attribution is never split). Page <90d old at ship -> capped `immature`.
   Unequal windows normalise to per-28d rates.
5. **CTR conditional on position.** Raw CTR pre/post is banned. Primary = expected-CTR
   residual per query vs the pooled curve (`build_expected_ctr_curve`), so position
   movement nets out. A CTR delta is real only with >=5 expected clicks in BOTH
   windows and non-overlapping Wilson 95% CIs. Per-page CTR verdicts are therefore
   rare at current volumes - the pooled changed-vs-control residual is the batch-level
   click test, and readouts must say per-page clicks/CTR are unmeasurable.
6. **Bing is directional only** - trailing-window aggregates, no date dimension, never
   used for pre/post.
7. **Query intent.** retained/gained/lost sets at >=5 impressions; lost queries checked
   for cannibalisation before being called regressions; gained-query credit requires
   >2x the control cohort's natural churn. Proposal targeting uses recency-weighted
   queries (half-life 28d), never all-time aggregates.
8. **Verdicts** (first match): insufficient-data -> immature -> confounded -> clean-loss
   (adjusted delta <= -25% at pre>=100 impr, or weighted position worse by >3) ->
   clean-win (adjusted delta >= +25%, no position/click loss) -> neutral.
   **Routing**: frozen page -> hold always (per-site frozen-pages file, e.g.
   `docs/_engines/property_frozen_pages.md`; analysis hard-fails if missing/empty;
   un-freezing needs a per-page owner sign-off line); weighted position >15 ->
   needs-position-not-meta (route to content/authority backlog); clean-loss ->
   revert-candidate via `metaTitle_prev` after a 14d persistence re-check; clean-win ->
   hold; propose-meta only with clean evidence + intent mismatch + position <=15.
9. **Placebo self-check every run**: >=40 control pages through the same pipeline with
   a fake ship date must come out overwhelmingly neutral/insufficient, else thresholds
   are miscalibrated - fix before trusting verdicts.
10. **Serialisation**: no meta batch while any other wave for the same site is in
    flight - otherwise verdicts are confounded by construction.
11. **Careful-mode apply (Property)**: `meta_apply.py --execute` also stamps
    dateModified/reviewedBy/EEAT schema via `stamp_trust_signals` and churns
    frontmatter ordering. For Property add/use a stamp-skip path so the diff is
    title/desc/_prev only; review the first file's diff before batch. Re-rewrites
    overwrite `metaTitle_prev` (prior generation survives only in git).
12. Re-run analysis no sooner than 32d post-ship (28d window + grace).

- **2026-07-19 Property v2 first run (shipped + deployed same day)**: v2 change-aware analysis (see methodology section) on 526 recorded interventions — all causally unjudgeable (site too young at edit time, cascading waves; placebo clean). Real finding: benign Google dedup prune (23 pages "Crawled - currently not indexed", Bing unaffected, clicks 51->162/wk through the prune) — diagnosis `docs/property/COLLAPSE_DIAGNOSIS_2026-07-19.md`. Shipped: 4 meta pairs (of 6 written; 2 banked on collapsed pages) via new `META_APPLY_SKIP_STAMP=1` env flag on `meta_apply.py` (title/desc/_prev only — USE THIS FOR ALL PROPERTY APPLIES), + generic recategorisation 301 in Property middleware. Live-verified, IndexNow'd (10 URLs). Owner manual: 5-URL Request Indexing list in the diagnosis doc. Re-analyse >=2026-08-20 via `scripts/meta_property_analysis.py`.

## Per-site onboarding

A site joins the program when: it has a `sites` row (active), GSC + Bing data flowing (ingestion commands above), its content dir resolves in `scripts/meta_worklist.py` (`_resolve_content_dir`), and `register_monitored_batch.py` knows its blog dir + prod domain (sites/<site>.json or the `_SITE_FALLBACK` map). Contractors-ir35: add once it has impressions.
