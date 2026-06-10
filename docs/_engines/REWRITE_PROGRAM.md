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
