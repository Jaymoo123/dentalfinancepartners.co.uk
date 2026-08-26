# Legacy-Page Rewrite Program — Reusable Engine

> **This is the SITE-AGNOSTIC engine.** It is true for any niche site (property, medical, dentists, solicitors, generalist, contractors-ir35). To run the program on a new site you reuse this doc **verbatim** plus the existing code and write only a small per-site STATE doc (see §8). Property examples are labelled `(example, Property)` and illustrate a mechanism; the RULE itself is always stated site-neutrally.
>
> **Engine vs state:** this doc holds the pipeline, the per-batch chain, the tooling, the rules, the QA/gate discipline, the ground-truth discipline, the collapse-safety machinery, drift patterns, and the operating model. A site's specific counts, slugs, queue, stash, statute facts, and house-positions content live in a per-site state doc — never here.

---

## §1 Purpose & when to use

The rewrite program turns the existing legacy corpus of a niche site into **ranking-grade, de-staled pages**, page by page, with deterministic quality gates and no value-destroying mistakes.

Use it when a site has a backlog of older blog/content pages that:

- carry **stale facts** (superseded rates, abolished regimes, repealed statute sections, out-of-date thresholds), and/or
- **rank but underperform** (proven impression demand on Google/Bing but weak position or weak CTR), and/or
- are **invisible** (indexed but zero impressions — needs depth/intent repair, not a teardown).

It is distinct from the **net-new program** (which writes brand-new pages). The rewrite program modifies pages **in place** at their existing path and slug, preserving their index presence while lifting quality. Two things define the value:

1. **De-stale** — every fact, figure, and statute citation is brought current and verified at source.
2. **Make ranking-grade** — the page's proven query demand (GSC + Bing, plus adjacent opportunity for invisible pages) is woven through meta/H1/H2s/FAQs/body, with on-page SEO, schema, and E-E-A-T signals, and a deterministic coverage floor proving the demand was not dropped.

**Standing operating modes (locked, see §5):** rewrite-only (never collapse/redirect), writer-first (no engine briefs except tightly-coupled cannibalisation knots), manual deploys only.

---

## §2 The per-batch chain (end to end)

A "batch" is ~10-13 pages, usually one topic cluster (or a sub-batch of one). Run the chain once per batch. **Name every script and its argument shape.** `.cache/*.json` artefacts are gitignored transient gate state.

```
# 0. (COUPLED CLUSTERS ONLY — e.g. a cannibalisation knot) generate distinct-intent briefs:
Workflow scripts/track2_rewrite_engine.wf.js   { slugs:[...], cluster:'<Cluster>', briefDir:'briefs/<site>/track2/<batch>' }
#    rewrite-only by default (REWRITE_ONLY, pass rewriteOnly:false to re-enable collapse — normally never).
#    Standalone pages SKIP this step (writer self-diagnoses from pull_page_data).

# 1. Rewrite each page in place (no-brief fallback is fine for standalone pages):
Workflow scripts/track2_rewrite_writer.wf.js   { slugs:[...], depth:'full', cluster:'<Cluster>', briefDir:'' }
#    depth:'full' = gold-reference depth; depth:'refresh' = lighter de-leak/de-stale for invisible/low-traffic pages.
#    briefDir:'' = no-brief fallback (writer self-diagnoses); set it to read <briefDir>/<slug>.md + <slug>.corrections.md.
#    Stages: Rewrite -> Normalise (slug_resolver link canonicalisation) -> Coverage (query-coverage + bounded weave-repair) -> Verify.

# 2. Mark the batch pending (the gate then blocks any deploy until each clears QA):
python scripts/qa_verdict.py pending --batch <B> --slugs <slug> [<slug> ...]

# 3. Rolling QA + auto-fix + editorial (writes per-slug verdicts to .cache/qa_runner/<B>/<slug>.json):
Workflow scripts/track2_qa_autofix_runner.wf.js { slugs:[...], batch:'<B>', maxRounds:2 }
#    Per page: independent-QA (verbatim from track2_independent_qa.wf.js) -> classify each failing item
#    fixable/escalate -> Fix agent applies QA-prescribed fixes (re-verifying every statute at legislation.gov.uk;
#    escalates if the prescribed fix is itself wrong) -> editorial pass (blocks only on 'weak') -> re-QA, loop max 2.
#    Returns a COMPACT manifest only (keeps manager context flat).

# 3a. Manager adjudicates ONLY the ESCALATED items, at source:
#    For each escalated page: open the cited statute at legislation.gov.uk, TRUST THE SOURCE (not the agent),
#    fix the page (or delegate the surgical fix), then RE-RUN the runner on that ONE slug (overwrites its verdict).
#    Escalate = cite contradicts locked ground-truth doc / no concrete fix / unresolved. Manager-only.

# 4. Merge per-slug verdicts -> record -> coverage manifest:
#    merge .cache/qa_runner/<B>/*.json into {"pages":[...]} -> .cache/<B>_verdicts.json
python scripts/qa_verdict.py record   --batch <B> --verdicts .cache/<B>_verdicts.json
python scripts/qa_verdict.py coverage --batch <B> --slugs <slug> [<slug> ...]

# 5. Pre-deploy gate (MUST be PASS):
python scripts/predeploy_gate.py --qa-batch <B> --coverage --coverage-batch <B>
#    HARD gates: 0 broken internal links (repo-wide), every batch slug all_clear with matching sha256, coverage manifest valid.

# 6. Build + commit (NO deploy):
cd <Site>/web && npm run build        # exit 0
git add <the batch .md files>         # SURGICAL staging only — never `git add .` / `-A`
git commit                            # .cache/* is gitignored

# 7. (MANUAL, user-triggered) deploy + register + index:
scripts/deploy-and-index.ps1 -Site <site> -QaBatch <B>
#    gate -> deploy -> auto-register monitored_pages (Google + Bing baselines) -> IndexNow exact URLs.
```

**Cadence note:** launch the writer, and after it returns launch the runner, as background workflows. You read two compact results per cluster. The manager only adjudicates escalated statute calls and commits; finalisation (merge/record/coverage/gate/build/commit) is delegated to a sub-agent to keep manager context flat.

---

## §3 Tooling inventory

One-line role each. All are site-parameterised or trivially so (see §8 for the `--site` plumbing).

**Workflows (`.wf.js`):**
- `scripts/track2_rewrite_engine.wf.js` — diagnose (rewrite-vs-collapse) + draft gold-reference brief + adversarial verify. Rewrite-only by default; collapse-guard runs between diagnose and brief. **Used only for coupled clusters.** Args: `{slugs, cluster, briefDir, rewriteOnly?}`.
- `scripts/track2_rewrite_writer.wf.js` — the workhorse: per-page data pull, in-place rewrite of the `.md`, deterministic link-Normalise, query-Coverage weave-repair, adversarial Verify. Args: `{slugs, depth:'full'|'refresh', cluster, briefDir}`.
- `scripts/track2_qa_autofix_runner.wf.js` — context-preserving rolling QA orchestrator: independent-QA -> classify -> auto-fix routine items + editorial polish -> re-QA (max rounds). Writes per-slug verdicts to disk, returns a compact manifest, escalates manager-only items. Args: `{slugs, batch, maxRounds}`.
- `scripts/track2_independent_qa.wf.js` — the independent second-opinion QA reviewer (skeptical senior domain expert). Forces deterministic dimensions: `arithmetic_recomputed[]`, `statute_checks[]`, `links_resolve`, `query_coverage`, `meta_quality`, `eeat_present`, `schema_valid`, `all_clear`. The runner embeds this verbatim. Args: `{slugs}`.

**Python tooling (`scripts/` + `optimisation_engine/`):**
- `scripts/track2_query_coverage.py` — deterministic query-coverage floor. Stdlib-only matcher (numbers literal: "section 24" != "section 23"); per-query covered/partial/missing + WHERE it appears; gates only on high-demand (impr>=`--gate-impr`) queries; invisible pages never gate. `--slug <slug> [--json] [--data <pull.json>] [--gate-impr 50] [--gate-bar 0.80] [--adjacent] [--selftest]`.
- `scripts/qa_verdict.py` — persists QA verdicts keyed to the reviewed file's sha256; `all_clear` is **derived from the dimensions, not trusted from the agent**. Subcommands: `pending --batch <B> --slugs ...`; `record --batch <B> --verdicts <json>`; `coverage --batch <B> --slugs ...`.
- `scripts/predeploy_gate.py` — HARD-blocks a deploy on broken internal links (repo-wide), pending/not-all_clear QA, or coverage failure. `[--strict] [--qa-batch <B>] [--coverage|--coverage-strict] [--coverage-batch <B>] [--coverage-run]`. Also Step 0 of the deploy script.
- `scripts/track2_collapse_guard.py` — deterministic collapse-direction guard (spike-robust, monitored-aware, target-establishment). Verdict ALLOW/REVERSED. Run before ANY hand-added redirect even when rewrite-only is the standing rule (defence in depth). (Dormant under rewrite-only, but the floor must exist.)
- `scripts/track2_link_audit.py` — authoritative internal-link auditor (the route's source of truth: `dynamicParams=false`, so a correct slug under the wrong category 404s). HARD=404, SOFT=resolves via a 301 hop. The gate subprocesses this.
- `scripts/register_monitored_batch.py` — registers an all_clear batch into `monitored_pages` for the regression watch, driven off the QA-batch manifest, capturing BOTH a Google and a Bing baseline. `--batch <B> [--commit] [--rewrite-date YYYY-MM-DD]` or `--slugs a b c [--commit]`. Idempotent.
- `scripts/track2_worklist.py` — builds the ROI-ranked, clustered worklist: residual universe minus already-handled (Phase 3 + anything in `monitored_pages`), with combined Google+Bing demand. Read-only; emits `.md` + `.json`.
- `optimisation_engine/track2/pull_page_data.py` — per-slug Supabase pull (GSC + Bing + GA4 + competitor SERPs/pages + page_content_map + gap reports + free/cached adjacent keywords; NO paid API). Exposes `build_target_queries()` + `build_adjacent()` so the writer and the coverage checker share one contract. `--slug <slug> [--json]`.
- `optimisation_engine/blog_generator/slug_resolver.py` — single source of truth mapping an internal-blog-link slug to its one canonical `/blog/<category>/<slug>` URL. Fixes only the mechanical category; never guesses invented slugs (leaves + flags them). `--fix` CLI + `selftest()`.

---

## §4 The deterministic-floor discipline (and WHY)

**The principle (load-bearing):** for any decision that can lose rankings, money, or correctness, the floor is **deterministic data/code — never an LLM judgement**. An adversarial LLM verify is a SECOND layer, never the only one.

**Root cause this exists for:** the pipeline once trusted LLM *plausibility* for high-consequence calls. The LLM guesses internal-link categories, guesses tax/statute facts, and "verifies" by plausibility. All three review layers (writer-verify, QA, manager skim) **share the same blind spots** — they reason the same way, so they agree on the same wrong answer. Worse, the per-site **ground-truth doc itself can be wrong and re-seed the error** into every page that cites it. (Example, Property: `house_positions.md` had backwards April-2027 framing and a wrong-Act citation; the writer faithfully reproduced it, and plausibility QA passed it, until a deterministic re-derivation caught it. ~229 internal links 404'd from category-guessing alone.)

The four deterministic floors:

1. **Query-coverage floor** (`track2_query_coverage.py`). Proves the page's proven impression demand is actually *placed* on the page (ideally in metaTitle/H1/H2/FAQ, body as backstop). Numbers match exactly. Gates only on high-demand queries; invisible pages never gate. This guarantees a rewrite never silently drops the demand the page already had.

2. **Arithmetic recompute** (`track2_independent_qa.wf.js` `arithmetic_recomputed[]`). Every worked example is RE-DERIVED, not judged plausible. `qa_verdict.py` derives `all_clear` from these fields, never from the agent's self-reported boolean.

3. **Statute verification at source + Royal Assent** (`statute_checks[]`). Every citation is WebFetched from legislation.gov.uk and content-verified — URL liveness alone is insufficient (a section URL can resolve while its operative wording was substituted/repealed by a later Act). For "(inserted by FA X)" parentheticals the inserting Act is verified from amendment history, and for any cited Finance Act the **Royal Assent date is checked against the chapter masthead** to catch the Bill-vs-enacted family (see §7).

4. **Link resolution** (`slug_resolver.py` + `track2_link_audit.py` + `predeploy_gate.py`). A slug maps to exactly one category; the resolver fixes the mechanical category automatically and flags invented slugs (never guesses them). The gate HARD-blocks on any unresolved/404 internal link.

**The meta-rule:** when you add a new high-consequence decision to the pipeline, ask first — *what is the deterministic floor for this?* If the answer is "the LLM decides," it is not safe to ship.

**Known gap → the next floor to build (the rates-currency problem).** The four floors above catch links, arithmetic, and statute *existence* — but NOT whether a *named rate/threshold* is the CURRENT value. Rate-currency is still left to probabilistic LLM QA, so a recently-changed figure leaks UNEVENLY across the corpus (fixed on the pages QA happened to scrutinise, stale on the rest). It is systematic, not random, for two reasons that compound: (a) every page cites the **same ground-truth doc**, so one stale line there seeds the same error into every citing page; and (b) every page is written by the **same model with the same training prior**, which defaults to the OLD value for anything changed recently (post-cutoff or recent reform) unless forced to verify that specific number. Hence the recurring experience: a spot-check finds "one small stale fact" and it turns out corpus-wide, because you've hit the tip of a systematic prior. Observed instances: SDLT Sch 4A flat rate 15→17% (Oct 2024), additional-dwelling surcharge 3→5%, dividend 8.75→10.75% / 33.75→35.75% (Apr 2026), NIC ST→£5,000 with LEL £6,708 (the "£5k earns a pension year" trap), s.162 now claim-required (FA 2026), WDA 18→14%, AIA £1m permanent. **Proposed fix: a machine-readable rates/facts ledger** `{term → current value → effective date → regime → source}` + a linter/gate that greps the whole corpus and flags any page stating a non-current value, **regime-tagged** so devolved LBTT/LTT figures are not false-flagged against the SDLT value. This converts rate-staleness from a probabilistic LLM catch into a deterministic floor — exactly what `slug_resolver` did for links. (Until built: keep correcting the ground-truth seed first when found, and treat any single stale-rate spot-find as a corpus-wide signal, not a one-off.)

---

## §5 Locked rules

- **Rewrite-only, never collapse.** Never add a redirect/`DUPLICATE_REDIRECTS` entry. If two pages overlap, keep BOTH and differentiate (distinct primary intent + distinct query targets the sibling does not own). The engine runs `REWRITE_ONLY` (auto-overrides any collapse decision to REWRITE). Collapse is a deferred future workstream. The collapse-guard remains wired as a defence-in-depth floor (§3) but stays dormant. (Example, Property: 10 not-yet-deployed collapses from an earlier session were reversed; the 2 already-deployed collapses were left.)
- **No em-dashes** in user-facing copy. Em-dashes (U+2014) read as AI-generated; use commas, parentheses, full stops, or middle dots. The gate warns on em-dashes today and HARD-blocks under `--strict` once a corpus sweep clears the legacy backlog.
- **Manager adjudicates statute fixes at source, and DELEGATES application.** When QA escalates a statute call, the manager opens legislation.gov.uk, trusts the source over the agent, and decides; the surgical edit + the record/gate/build/commit finalisation are delegated to a sub-agent to preserve manager context. Manager owns only the judgment calls.
- **The per-site ground-truth doc is the seed-of-truth and must be kept correct.** Every rewrite cites it by section number (`§N.M`) with a lock-date stamp; the section number is the contract, never paraphrased. Because errors in it re-seed into every citing page, a ground-truth correction is the FIRST job whenever a page is found to contradict a locked position. (Example, Property: `house_positions.md`.)
- **Writer-first, no engine briefs** — EXCEPT tightly-coupled cannibalisation knots. Standalone pages use the writer's no-brief fallback (it self-diagnoses from `pull_page_data --json`, with identical rigor — validated at scale). Reserve engine briefs (`track2_rewrite_engine.wf.js`) for coupled clusters where several near-identical pages must be partitioned into distinct intents first. (Example, Property: the AIA cluster — four near-identical "annual investment allowance" pages + canonicals — is the one cluster that gets engine briefs; everything else is no-brief.)
- **Manual deploys only.** Commit to the default branch; nothing goes live until the user explicitly deploys. A deploy ships the whole branch HEAD (every committed-but-undeployed page goes live together).

---

## §6 Operating model / cadence

- **≤2 content workflows in flight** (one writer + one runner, offset). You read two compact results per cluster; the manager's context stays flat.
- **Near-dupe pair sequencing across sub-batches.** When two pages are near-duplicates, commit the FIRST so the SECOND differentiates against the already-shipped version. Compose each ~10-13-page batch with only ONE of each near-dupe group; the second sibling goes in a later sub-batch.
- **Cross-cluster link-gate rule (important).** `predeploy_gate.py`'s internal-link check is **repo-wide**. A HARD 404 in *another* in-flight cluster's *dirty* file does NOT block committing THIS batch — this batch's own files are clean. The final consolidated repo-wide gate *before deploy* is the real backstop. (Example, Property: a batch's finalisation stalled on a transient broken link in a different in-flight cluster's working-tree file; the rule is to commit the clean batch and let the pre-deploy gate be the repo-wide arbiter.)
- **Scale batches to whole clusters where possible** — agent parallelism makes per-stage wall-clock roughly flat with batch size.
- **Manager adjudicates only judgment calls; delegates execution.** Statute escalations and differentiation calls are the manager's; fix-application + record/gate/build/commit are delegated.
- **Pick the next cluster from the ROI worklist** (`track2_worklist.py`, combined Google+Bing). Highest-ROI = proven content with near-page-1 Bing but weak Google (a pure Google lift).

---

## §7 Drift patterns + fixes (observed in practice)

The single most recurrent risk family is **Bill-vs-enacted-Act / statute-citation drift**. Sub-patterns and their deterministic fix:

- **Bill-vs-enacted** — asserting a Bill-form rate as enacted (or, after Royal Assent, leaving a "scheduled/pending" hedge that is now STALE). Fix: verify the Royal Assent date against the chapter masthead at write time.
- **Sections-don't-exist** — parenthetical claims about Act section numbers that don't exist. Fix: content-verify the section at legislation.gov.uk.
- **Same-year-different-Act** — citing "FA 20XX" when the actual is "Finance (No. 2) Act 20XX". Fix: verify the chapter/Act identity, not just the year.
- **URL-live-content-gutted** — the section URL resolves but its operative wording was substituted/repealed by a later Act. Fix: content-verify, never trust URL liveness alone.
- **Wrong-tax-term / wrong-statute-family** — e.g. naming the wrong governing Act for a rule (example, Property: the Section 24 reducer is ITTOIA 2005, NOT ITA 2007 — a recurring writer trap the runner catches). Fix: ground-truth doc + statute content-check.
- **Manager-prompt drift (self-catch)** — a wrong statute cite the MANAGER wrote into a dispatch prompt. Fix: any statutory cite a manager writes into a prompt must itself be verify-on-dispatch; the sub-agent is instructed to verify the manager's cite against legislation.gov.uk and surface drift.
- **Stale-framing density beyond the obvious cohort** — staleness is found not only in untouched legacy pages but also in PRIOR rewrite-pass output and in pages only *tangentially* touching the changed rule. Fix: treat the corrected-ground-truth as a ledger (section -> old token -> new token -> effective date) and fix opportunistically on rewrite rather than micro-sweeping the whole corpus.
- **Worklist re-lists not-deployed rewrites.** `track2_worklist.py` excludes `monitored_pages`, but committed-not-deployed rewrites aren't registered there until DEPLOY. So the worklist re-lists pages already rewritten this/last session. Fix: before picking a cluster's slugs, exclude everything already rewritten (via `git log --name-only` over the rewrite commits, or the qa_verdict caches) — otherwise you redo pages.
- **Editorial/coverage backfill gap.** Pages rewritten before the coverage and editorial gates existed are factually clean but not uniformly ranking-grade. Fix: decide per cohort whether to re-run them through the editorial-enabled runner before deploy.
- **(Parked) duplicate flat/nested blog URLs** — a page indexed under both `/blog/<slug>` and `/blog/<category>/<slug>` splits its impressions. Worth a periodic canonical-hygiene corpus check.

---

## §8 Applying to a NEW site — checklist

**Reused AS-IS (no edits — this is the whole point):**
- This engine doc, verbatim.
- All the code: every `.wf.js` workflow and every Python script in §3, plus `slug_resolver.py`. They are site-parameterised.
- The per-batch chain (§2), the deterministic floors (§4), the locked rules (§5), the operating model (§6), and the drift watch-list (§7).

**Created PER SITE (the only new authoring work — goes in a per-site STATE doc, not here):**
1. **A ground-truth doc** (the `house_positions.md`-equivalent): the site's locked positions, section-numbered with lock dates, statute citations verified at source. This is the seed-of-truth every rewrite cites; it MUST be correct before any batch (§5). Lock its sections deliberately, not in passing.
2. **A worklist** built from that site's GSC + Bing demand: run `track2_worklist.py` (site-parameterised) to produce the residual universe minus already-handled, ROI-ranked and clustered. This requires the site's GSC + Bing query data ingested into Supabase first.
3. **`monitored_pages` baselines** captured at deploy via `register_monitored_batch.py` (Google + Bing). These are per-site and accrue as batches ship.
4. A thin per-site STATE doc recording counts, the current queue, the in-flight stash, deployed-vs-not, and a pointer to the ground-truth doc. (This is the only doc that goes stale; the engine doc does not.)

**The `--site` plumbing:**
- The deploy + monitoring entry point is `scripts/deploy-and-index.ps1 -Site <site> -QaBatch <B>` (gate -> deploy -> register monitored Google+Bing -> IndexNow).
- The writer/engine workflows take a `cluster` arg and operate on the site's blog dir; the per-site blog path and Vercel project/org IDs are the site-specific config the scripts read.
- The Python tooling reads `SUPABASE_ACCESS_TOKEN` from `.env` and queries the per-site GSC/Bing/GA4 tables; the gate and link-audit resolve against the site's `web/content/blog` + route config (`dynamicParams=false`, `slugifyCategory`, redirect maps).
- Confirm `slug_resolver.py` / `track2_link_audit.py` / `blog.ts slugifyCategory` / `middleware.ts` maps stay identical for the new site (the resolver's `selftest()` asserts 0 invented slugs against the live corpus).


---

## §9 Cluster coverage input — rewriting against the MARKET's query set, not ours

**Status: designed 2026-08-17, not yet built.** Origin: a Property structural audit
(`docs/property/STRUCTURE_VS_COMPETITORS_2026-08-17.md`) found that our corpus outranks nobody
on the plain-language layer of a topic while covering the specialist layer better than any
competitor. On SDLT, 108 of the 150 highest-volume competitor keywords appear nowhere in 760
posts. The pages exist; the phrasings do not.

### §9.1 Why the existing coverage floor is not enough

The query-coverage floor (§4.1) proves a rewrite does not DROP the demand a page already had.
Its input is our own GSC + Bing history plus free/cached adjacent ideas. By construction it can
only ever protect what we already rank for, so a page that was written against the wrong
vocabulary stays written against the wrong vocabulary, forever, and passes every gate.

The fix is an additional input, not a new pipeline: the union of the keyword sets that the
whole competitor set ranks for in that cluster. We can see all of them at once, which no single
competitor can. That union is the market's definition of the topic.

### §9.2 The six steps

**1. Harvest.** For one cluster, pull `dataforseo_labs/google/ranked_keywords/live` per competitor
domain, filtered to the cluster's term family, NO volume floor, and persist to the existing
`dataforseo_competitor_data` table (columns already carry `ranked_keyword`, `position`,
`search_volume`, `url`). The `DataForSEOClient.ranked_keywords()` method already exists.
Cost measured on SDLT across 8 domains: 1,600 keywords for about $0.50.

RULE: no volume floor. The sub-100 variants carry the phrasing, which is the whole point. The
existing stored pulls used a 30-50 floor and a 500-row cap per domain, which is why they missed it.

**2. Cluster, using the competitors' own page groupings as the signal.** Each competitor URL with
3+ keywords is a node carrying its keyword set. Merge nodes across domains when the overlap is
30% or more of the smaller set. The result is a consensus topic map: for each topic, the union
keyword set, its combined volume, and the number of independent domains that treat it as one page.
Domain count IS the confidence score. A topic that 5 domains give a page to is a real topic; one
that a single domain covers is that domain's idiosyncrasy or a news spike.

**3. Screen.** Drop news-cycle clusters (named politicians, "budget", "abolished", "scrapped"),
off-niche clusters, and anything whose SERP is owned end-to-end by gov.uk or a national brand.
State every exclusion with its volume; never drop silently.

**4. Assign, one cluster to one page, uniquely.** Score each of our existing pages in that cluster
against the topic's top keyword tokens (title + slug). Highest scorer above threshold takes the
topic and is then unavailable to other topics. Unique assignment is what surfaces the real gaps:
without it, four topics all "match" the same page and the map lies.

Three outcomes: a page of ours owns the topic; no page of ours is close (NO-PAGE); or a page of
ours matches nothing in the map at all (our specialist tail, which the market does not group).

**5. Grade by equity, and let equity decide how much we are allowed to change.** Join per-page
Google (GSC 90d) and Bing (`GetRankAndTrafficStats` / page stats) figures onto the assignment:

| Grade | Test | What is allowed |
|---|---|---|
| REFRAME | Google impressions < 300 AND Bing clicks = 0 AND Bing impressions < 300 | metaTitle, H1, H2s, body, FAQ. Full rewrite against the topic's keyword set. |
| EXTEND | Bing clicks >= 3 OR Bing impressions >= 300 OR Google clicks >= 1 OR Google impressions >= 300 | ADDITIVE ONLY. Keep metaTitle, H1 and existing H2 order. Add new H2 blocks and FAQ entries carrying the missing phrasings. **Clarified 2026-08-26 (Medical batch 1): EXTEND restricts STRUCTURE AND POSITIONING, never TRUTH.** The additive-only constraint exists to protect the equity that lives in the metaTitle, H1, H2 order and matched queries. A factual correction inside frozen copy that changes no heading, reorders nothing and does not alter what the page is about carries no equity risk and is REQUIRED, not merely permitted: leaving a stale year tag or a wrong figure on a live page fails the quality bar regardless of grade. Writers note such edits in a one-line addendum so QA does not read them as scope creep. |

**Corollary on scoring an EXTEND page (same date, same batch).** A frozen structure can make the language spec's structural bands unreachable: the Medical QOF page landed at 42% question-form headings against a 50-75% band, and 19 FAQs against a 4-8 band, purely because 7 existing H2s and 14 existing FAQs could not be touched. Those are consequences of the grade, not defects. Editorial QA scores an EXTEND page against the EXTEND reality, and a writer must never contort a page to hit a band the grade forbids it from reaching.

| EXTEND (boundary case, added 2026-08-26) | Bing clicks of 1 or 2 AND Bing position 10 or better. **This closes a hole in the table above: 1 or 2 Bing clicks match neither branch as originally written.** Found on Medical, where 26 pages fell into it and every one sat at Bing position 1.0 to 7.0, which is exactly the equity the conservative Bing-first rule exists to protect. Treat as EXTEND, additive only. | ADDITIVE ONLY, as EXTEND above. |
| NO-PAGE | no page scores above threshold | Attach the cluster to the nearest hub as a new section, or queue a single new page. Never a page per keyword. |

Bing is graded FIRST and more conservatively than Google. On Property, Bing returns roughly twice
Google's clicks from two thirds of the impressions, and the pages carrying it sit at positions 4
to 8 where a title change is a real risk. Google impressions at position 40+ are not equity.

**6. Execute through the existing chain.** The topic's keyword set becomes the target-query set
for `track2_query_coverage.py` on that page. Nothing else in §2 changes. That converts the new
input into the fifth deterministic floor:

**Cluster-coverage floor.** A rewritten page must place, in metaTitle/H1/H2/FAQ or body, the
topic's consensus keywords above a stated volume floor, where "consensus" means at least N of the
harvested domains rank a page for it. The gate output names every phrase not placed. LLM judgement
never decides whether coverage happened; the matcher does.

### §9.3 Rules

- **Coverage is additive to the specialist layer, never a replacement.** The specialist pages are
  the differentiator and the reason the corpus is defensible. The primer layer is what makes them
  findable. Never delete depth to make room for a plain-English section.
- **One page per consensus topic, not per keyword.** The corpus is already over-fragmented; the
  map exists to consolidate demand onto fewer pages, not to justify more.
- **Prioritise by peer-winnable volume, not raw volume. NARROWED 2026-08-26 (owner instruction,
  rollout decision 21): peer-winnable volume SEQUENCES the work and never excludes any of it.**
  Nothing leaves the coverage set for being held by an unwinnable domain, and harvests include
  those domains because they define the market's vocabulary. The killing evidence: a Google-derived
  winnability screen on Medical would have discarded a third of the head SERP, on a site where Bing
  out-clicks Google 3.4x and indexes the corpus fully while Google indexes ~16% of it. Winnability is
  per engine, and screening on one engine throws away the other. Original rationale, still valid for
  ORDERING: For each cluster compute the volume of
  keywords where a peer-authority domain (a specialist firm, not gov.uk / MSE / a bank / a
  national brand) holds a top-10 position. That number, not the headline volume, is the
  addressable prize. (Example, Property SDLT: the calculator cluster is 1.54M raw but 275k
  peer-winnable, and the peer-held slots are all modified variants such as "buy to let stamp duty
  calculator", never the naked head term.)
- **One change per page, then measure.** Bing re-crawls in days and is the faster read; Google
  takes weeks. Do not stack a reframe and an internal-link change on the same page in the same
  batch or attribution is lost.
- **Rewrite-only still applies.** No URL changes, no redirects, no collapses (§5).

### §9.4 What this costs and what it does not need

Needs: one harvest script (the client method exists), one clustering + assignment script, and one
extra input path into `track2_query_coverage.py`. It does NOT need a new engine, new tables
(`dataforseo_competitor_data` already has the schema), new agents, or new content. Per-cluster API
cost is about $0.50 at 8 competitor domains with no volume floor.


### §9.5 The research pack (what the Opus writer actually receives)

One file per target page, assembled from live data, never from memory. Eight sections, in this
order, because the order is the reading order:

1. **Target and permission level.** Page, cluster, grade (REFRAME / EXTEND / NO-PAGE), what may be
   changed, what may not, and the revert path in one line. The constraint comes FIRST so the writer
   reads it before forming a plan.
2. **Equity register.** Every query the page already earns, on both engines, with impressions,
   clicks and position. Google from GSC page+query; Bing from `GetPageQueryStats` per URL, which
   returns far more rows than GSC does (specimen: 2 Google rows against 262 Bing queries on the
   same page). This section is the "do not lose this" list.
3. **The market's keyword set.** Every keyword in the cluster with volume, the best position any
   peer holds, which domain holds it, and whether the phrase appears verbatim in our current copy.
   Sorted by volume. Peer-held-top-10 count stated, because that is the addressable prize.
4. **Competitor teardown, all of them, not the best one.** For every competitor page in the
   cluster: URL, title, word count, full H2/H3 list, tables, whether it has a calculator, whether
   it has an FAQ block. Any page that fails to fetch is listed as a flagged gap, never silently
   dropped. The union of their headings minus ours is the coverage checklist.
5. **Ours, side by side.** Title, metaTitle, word count, current heading list.
6. **Whitespace.** What our page covers that no competitor does. Explicitly marked KEEP. The pack
   adds a plain-language layer above the depth; it never trades the depth away.
7. **Acceptance criteria.** Deterministic and gate-checkable: equity queries still match, protected
   elements byte-identical, the named phrasings present in an H2/FAQ/body, plus the four existing
   floors (arithmetic, statute, links, coverage).
8. **Expectation.** Stated before the work, not after.

Specimen: `briefs/property/sdlt/PACK_sdlt-transfer-property-company-cost.md` (hand-assembled
2026-08-17 to fix the format; the generator is not built).

**Why section 3 matters more than it looks.** On the specimen page, 0 of the cluster's 98 keywords
appear verbatim in 3,530 words. The page says "stamp duty" twice and "SDLT" everywhere else. The
market searches the words. No amount of writer talent finds that without the pack putting the list
in front of it.

### §9.6 Tracker and expectations — reuse, do not build

Both tables already exist and already carry Bing:

- **`monitored_pages`** (946 rows): `slug`, `rewrite_date`, `monitor_until`, `rewrite_type`,
  `status`, and baselines for BOTH engines (`baseline_clicks/impressions/position` plus
  `baseline_bing_*`). One row per page at rewrite time. This is the register of what is in flight.
- **`blog_optimizations`** (111 rows): baseline block, `impact_*_week1..week4` for impressions,
  clicks, position and CTR, `impact_verdict`, `confidence_level`, `rolled_back`,
  `rollback_reason`, `content_backup_path`, `supersedes` / `superseded_by`. This is the outcome
  ledger, including the revert trail.

What is missing is not a table, it is three fields' worth of discipline:

1. `target_keywords` on `blog_optimizations` must be populated with the cluster's MISSING phrases,
   not with what the page already ranked for. Otherwise the measurement re-measures the past.
2. The verdict must be read against **phrase coverage**, not total traffic. Success is impressions
   appearing on the named missing phrases. Total impressions rising while the missing list stays
   missing is drift, and must be recorded as a fail.
3. The **failure trigger is written before the rewrite**, in the pack, as a number. Specimen: "if
   Bing average position falls below 8 or clicks drop under 40 in a 28-day window, revert."

**Cadence.** Bing re-crawls in days and is the early read at 14 to 28 days. Google is the 28 to 90
day read. One change per page per window, or attribution is lost (§9.3).

**No new notification.** Reading the tracker is a pull, not a push: the console renders it. Nothing
in this program emails anyone without an explicit request (see `CARETAKER.md`).


### §9.7 Scope contract, source union and the reconciliation ledger

The failure this section exists to prevent: a cluster is worked, the writer does good work, and
nobody can say afterwards whether anything was missed, because nothing ever defined what "all of
it" was. Caps and volume floors are how that happens quietly.

**Rule: no caps, no floors, ever, at harvest.** `ranked_keywords` is paginated to exhaustion per
domain. No `search_volume` minimum. No row limit per domain. The stored pulls that predate this
section used a 500-row cap and a 30-to-50 volume floor and are therefore NOT a valid input; they
are a sample, and a sample cannot support a completeness claim. Measured cost of an uncapped
cluster harvest: about $0.50 for 1,600 keywords across 7 domains.

**Rule: the universe is a union of named sources, never one source.** Measured on SDLT, 2026-08-17:

| Source | Keywords in family | Unique to that source |
|---|---|---|
| Competitor ranked keywords (7 domains, uncapped) | 1,602 | 1,602 |
| Our GSC queries, 90d | 493 | 399 (81% of them) |
| Our Bing page-query stats, 91d, across our 26 pages with Bing data | 594 | 538 |

Any single source misses between a fifth and four fifths of the universe. Competitor data alone
would have dropped 937 queries we already earn impressions on, which is precisely the "queries we
rank for get removed" risk. Both of our own engines are mandatory inputs, and Bing is the biggest
single contributor of phrasings nobody else can see, because it reports queries GSC anonymises.

Add, where the cluster's head terms justify it, the free expansions already in the repo
(autocomplete, PAA, `keyword_ideas`). Every source used is named in the dossier with its pull date
and row count. A source not named was not used, and that is a stated limitation, not a silence.

**Rule: our page scope is defined by body signal, not by slug.** Measured on SDLT: 69 posts carry
the term family in slug or title. A further **190 posts** mention it five or more times in the
body. Scoping by slug alone would have rewritten 69 pages and left 190 pages carrying the same
terminology, competing for the same queries, unreviewed. Page scope is therefore:
`slug/title match UNION body-frequency match at a stated threshold`, plus every tool page in the
family. All of them are in scope and accounted for; triage then decides which are worked, which
are left, and which are only checked for conflict.

**The reconciliation ledger (the deterministic completeness floor).** Every member of the query
universe lands in exactly one bucket, and the counts must balance to the total or the gate fails:

| Bucket | Meaning |
|---|---|
| `assigned` | mapped to exactly one page, and that page's pack carries it |
| `already-covered` | present in our copy and we already rank; protected by the equity gate |
| `excluded` | with a reason code: news-cycle, off-niche, brand, SERP owned by gov.uk or a national brand |
| `deferred` | real but out of this cluster's scope, named with the cluster it belongs to |

`assigned + already-covered + excluded + deferred == universe`. No fifth bucket, no silent drop.
The same balance rule applies to competitor pages: every page carrying a cluster keyword is either
torn down or listed as fetch-failed with its status code.

### §9.8 The cluster dossier, and the order of work

**One dossier per cluster, frozen before any page is written.** It is the shared context every
agent reads, and no agent may add scope that is not in it:

1. Scope declaration: term family, our page count and list, competitor domains, competitor pages,
   query universe with per-source counts and pull dates.
2. The consensus topic map (§9.2) with per-topic volume, domain count and peer-winnable volume.
3. The assignment table: topic to page, unique, with each page's grade (§9.5) and equity figures.
4. The reconciliation ledger.
5. Audience and voice: who the page is for, reading level, the register to write in, per
   `VOICE_STANDARD.md`. Stated once for the cluster so twenty pages do not drift into twenty voices.
6. Ground truth: which `house_positions.md` sections govern this cluster.

Order of work, and the freeze point matters:

```
declare scope -> harvest (uncapped, all sources) -> map -> triage + bucket -> DOSSIER FREEZE
   -> per-page packs (derived from the dossier ONLY) -> writer -> QA -> gate -> commit
```

Anything discovered after the freeze goes into a named delta list and is worked in a later pass. It
does not get quietly folded in, because a moving scope cannot be reconciled.

### §9.9 QA additions (all deterministic, all blocking)

The four existing floors (§4) stay exactly as they are. Four more, specific to this program:

5. **Equity preservation.** Build the page's pre-rewrite query set from GSC (any impression, 90d)
   and Bing page-query stats (any impression, 91d). After the rewrite, every query in that set must
   still be matchable in metaTitle, H1, an H2, an FAQ or body prose. Any query that stops matching
   is a BLOCK, listed by name, with the diff line that removed it. This is the gate that makes
   "nothing we rank for gets removed" a fact rather than an intention.
6. **Cluster coverage.** Every keyword the dossier assigned to this page is placed, and the checker
   names each one that is not. Same matcher as floor 1, different input.
7. **Reconciliation balance.** The ledger sums to the universe. A cluster whose ledger does not
   balance cannot reach the pre-deploy gate.
8. **Competitor re-read.** Every heading theme present on any competitor page in the cluster is
   marked covered, deliberately-declined-with-reason, or belongs-to-another-page. The deterministic
   part is that the count of undecided themes must be zero. Judgement decides which; the gate only
   enforces that a decision exists and is recorded.

Plus the two human-readable passes already in the chain: adversarial factual QA against house
positions, and the editorial pass, which here also checks audience fit and that the plain-language
layer reads as prose rather than as inserted keywords.

**On the writer.** The pack is the writer's whole world: scope, constraints, equity register,
keyword set, competitor teardown, whitespace, acceptance criteria. It does not get to decide scope
and it does not need to. Anything it believes is missing goes back as a delta, not into the page.


### §9.10 Competitor domain teardown (one domain at a time, every page)

Run before the dossier freezes, one domain per pass. Purpose: learn how a domain HANDLES a term
family across its whole corpus, which the keyword data cannot show.

Seed the crawl from **sitemap UNION known ranking URLs (from the keyword harvest) UNION crawl
discovery**. Sitemaps under-declare: one competitor declared 53 URLs and a breadth-first crawl found
195, including the silo carrying its rankings. Strip nav, header and footer before counting text or
classifying links, or every page looks like it links to everything.

Per page record: status, title, H1, word count, term-family mentions, family-in-URL, family-in-title,
and body-only internal links. Then compute, for the domain: pages mentioning the family, pages with
5+ mentions, owner pages, non-owner-heavy pages, and **the share of non-owner-heavy pages that link
to an owner**. That last number is the one that separates the models (measured: 98% and 100% for two
competitors, 39% for us).

Domains that block crawling (HTTP 202 with an empty body, no reachable sitemap) are recorded as
keyword-data-only, with the limitation stated in the dossier. Never substitute a guess.


### §9.11 The language pass (cluster level, once, before any page is written)

**Decision, 2026-08-17: do it per cluster, not per page, and never leave it to the page writer.**
Voice is a property of the cluster. If twenty per-page writers each derive the register from raw
competitor pages, twenty interpretations ship and the corpus drifts. It is also cheap to get wrong
by intuition: measuring first killed three plausible assumptions in one pass (see
`docs/property/STRUCTURE_VS_COMPETITORS_2026-08-17.md` Appendix F, where our sentences turned out
SHORTER than the winners', our reading ease identical, and our question-heading rate higher).

Two halves, in this order:

**1. Quantitative probe, automated, no judgement.** Fetch every competitor page that holds a top-10
position in the cluster, plus a matched set of ours (our best performers and our invisible ones),
strip nav/header/footer, and measure: words, sentence length, Flesch reading ease, share of
question-form headings, second-person rate per 1,000 words, first-person rate, statute references
per 1,000 words, jargon-noun rate, tables. Output is a table, not a conclusion. Winners are defined
by top-10 density, never by brand impression, because two of the four domains torn down for Property
rank badly and their habits must not be copied.

**2. Written analysis, one Opus pass over the same pages.** What the probe cannot count: how they
open an answer (direct answer first, or context first), how a question becomes a heading, where the
number goes, how they handle "it depends", how they hand off to a CTA, what they leave out. Quote
real sentences from real pages. Include a matched pair per pattern: their sentence, our sentence on
the same point.

**Output: an answer-pattern spec in the dossier**, one page, carrying the measured targets (with our
current numbers beside them), the answer patterns with examples, and the explicit do-not-copy list.
Every per-page pack inherits it by reference. The editorial QA pass then checks the page against the
spec, not against the reviewer's taste.

**Order matters:** the spec is written once the cluster's winners are known (post-harvest,
pre-freeze). Doing it earlier means guessing who the winners are; doing it later means the first
pages are written blind.


### §9.12 Lever status board (with provenance, because provenance is the point)

Do not cite a lever as settled without naming who derived it and whether anyone re-derived it. The
owner flagged on 2026-08-17 that the 2026-08-16 internal-linking analysis went through repeated
self-corrections during that session and is not trustworthy. That judgement is respected here: the
number is not carried forward.

| Lever | Status | Evidence and provenance |
|---|---|---|
| Word count / depth | **Not a lever** | Corroborated independently 2026-08-17: competitor pages holding top-10 SDLT slots average 1,327 words against our 4,299, and provestor's winners run 274 to 985. Two methods, same answer. |
| Page shape (tool with a working form) | **Live lever** | 2026-08-16 SERP sample (41 of 44 top-5 slots), corroborated 2026-08-17 by a live SERP pull where the "stamp duty calculator" top ten is MoneyHelper, gov.uk, stampdutycalculator.org.uk, MSE, CBRE and Savills, and by one competitor calculator carrying 515 keywords. |
| Vocabulary / phrase coverage | **Live lever, no prior analysis touched it** | 2026-08-17: 108 of the top 150 competitor SDLT keywords absent from 760 posts; the assigned page holds 0 of its cluster's 98 keywords. |
| Register (statute density, direct address) | **Live lever, measured once** | 2026-08-17 probe: statute refs 12.3 per 1k against 0.1, jargon 3.3 against 0.1, direct address at half their rate. Sentence length and reading ease are NOT different. |
| Internal linking | **UNPROVEN, hygiene only** | The 2026-08-16 null is withdrawn as untrustworthy per the owner. Independent re-derivation 2026-08-17 from our own full-site crawls of four competitor domains (n=58 pages that both rank for SDLT terms and were crawled, inbound body links counted from the full site graph): rho -0.173, p 0.190 against best position; rho -0.204, p 0.118 against median position. Directionally favourable, not significant, and underpowered because inbound counts run 0 to 12 with a median of 1. Neither proven nor disproven. |
| Tables, slug matching, year in title | **Unverified single-source** | 2026-08-16 only, not re-derived. Open questions, not settled nulls. |
| Span of years mentioned | **Unverified single-source, kept on editorial merit** | 2026-08-16 reported +0.228, p 0.007 (more tax years, worse position). Not re-derived. Leading with one current year and subordinating historical rates is better writing regardless, so the rule stands on that basis, not on the statistic. |

**Rule going forward.** Any lever that drives a batch of work must be either corroborated by two
independent methods, or run as an isolated experiment through `monitored_pages` with a stated
expectation and a revert trigger. A single correlation from a single session is a hypothesis.

**The internal-linking experiment, if we want the answer.** Ten pages with existing equity, add links
from their topical siblings, change nothing else, read Bing at 14 and 28 days. One variable, one
window, one tracker row per page. Until that runs, links get improved where they genuinely help a
reader and are never billed as the mechanism.
