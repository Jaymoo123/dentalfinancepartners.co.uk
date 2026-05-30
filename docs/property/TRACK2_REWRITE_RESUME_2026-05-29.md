# Track 2 — RESUME POINT for the rewrite manager (start here) — updated 2026-05-30 (batch 3 shipped)

**Read this first, then `track2_remediation_state` + `property_2027_rates_ground_truth` + `property_capital_allowances_2026_ground_truth` + `fa2026_corpus_sweep_state` + `bing_webmaster_data` memories, then `TRACK2_PROGRAM.md §16.T1-T6` (load-bearing lessons), then `docs/property/TRACK2_MANAGER_PICKUP.md` for the rewrite-program mechanics.**

> ## ⭐ SESSION-END STATE 2026-05-30 PM — START THE REWRITE PROGRAM FROM HERE (fresh session)
> The pipeline is hardened and two corpus issues are cleared. **You are GO to run the rewrite program at pace.** Done this session:
> - **Batch 4 shipped** (`26ee0342`): 4 capital-allowances rewrites + FA-2026 capital-allowances ground truth ([[property_capital_allowances_2026_ground_truth]], house_positions §38). ~155 residual rewrites remain.
> - **Scale-readiness hardening DONE** (`0e0f5fc1`, `e6ceeecf`, `c17d3601`): writer auto-quotes frontmatter + a HARD frontmatter gate (the YAML build-breaker cannot recur); a `-QaBatch` deploy is self-sufficient (gate → deploy → auto-register monitored G+Bing → IndexNow exact URLs, wired into `deploy-and-index.ps1`); worklist ROI now combines **Google+Bing** demand; `weekly_run` Step 1.3 ingests Bing; qa_verdict blocks vacuous statute passes; independent-QA requires a secondary GOV.UK/HMRC source for figures changed in the last ~18 months.
> - **FA-2026 PROPERTY wrong-advice sweep SHIPPED** (`554e7173`): 31 Property pages corrected (dividend 8.75→10.75 / 33.75→35.75, WDA 18→14%, APR/BPR £2.5m cap, incorporation-relief-now-a-claim s.39, NRB freeze→5 Apr 2031, EOT 100→50%, pension-into-IHT, home-office s.21). Verified live. **Cross-site (dentists/solicitors/medical) DEFERRED** per user — their hit-lists are ready ([[fa2026_corpus_sweep_state]]).
> - **Bing Webmaster data ingested** for Property ([[bing_webmaster_data]]): legacy pages rank page-1 Bing / page 4-8 Google — the worklist is now Bing-aware.
> - **Context discipline:** this was a very long session; the rewrite program was deliberately deferred to a FRESH session for clean judgment.
>
> **To run the rewrite program:** rebuild the worklist (`python scripts/track2_worklist.py` — now Google+Bing ROI), pick the top cluster (CapitalAllowances cluster is large + has a consolidation need; or the Bing-buried winners non-resident-landlord-scheme / sa105 / finance-costs-section-24), and run the mandatory per-batch chain (§16.T5 below). The chain now self-deploys+monitors via `deploy-and-index.ps1 -Site property -QaBatch <name>`.

---

## ✅ CURRENT STATUS — 2026-05-30 (pipeline validated end-to-end; first batch live)

**The hardened pipeline is built, validated, and has shipped TWO batches to production. ~155 residual rewrites remain.** To continue: scope the next highest-ROI cluster from the worklist and run the mandatory chain below.

> **UPDATE 2026-05-30 (batch 4 shipped, commit `26ee0342`):** 4 capital-allowances rewrites live (AIA-uk, AIA-landlords, WDA-rates, WDA-cars) on the source-verified **FA 2026 capital-allowances ground truth** (WDA 18%→14% s.28, new 40% FYA s.29, special rate 6%; memory [[property_capital_allowances_2026_ground_truth]] + house_positions §38). A 5th page's collapse was DROPPED (target pillar had zero ranking equity — collapse guard hardened with R6 to block collapse into unproven targets). **Bing Webmaster data is now ingested** ([[bing_webmaster_data]]) and wired into the writer + engine; legacy pages rank page-1 Bing / page 4-8 Google. **The monitoring net was rebuilt** (red-team-driven): it was Google-only + structurally blind for ~256/338 zero-click pages; now has a Bing arm + impression fallback + QA-manifest-driven registration with Google+Bing baselines (`scripts/register_monitored_batch.py`). **NEXT PRIORITY (user-chosen): the FA-2026 cross-site wrong-advice sweep** — ~9-13 Property capital-allowance pages + 5 dividend-rate pages + APR/BPR "draft" framing are LIVE-WRONG, and dentists/solicitors/medical carry the same FA-2026 staleness; build one ledger-driven (section→old/new token→effective date) sweep, not per-batch discovery. Full red-team findings: `optimisation_engine/.cache/redteam_summary.txt`.
>
> **SCALE-READINESS HARDENING COMPLETE (commits `0e0f5fc1`, `e6ceeecf`, `c17d3601`):** the writer now auto-quotes frontmatter + the gate hard-blocks invalid YAML (the batch-4 build-breaker cannot recur); a `-QaBatch` deploy is self-sufficient (gate → deploy → auto-register monitored with G+Bing baselines → IndexNow exact URLs); the worklist ranks by combined Google+Bing demand; weekly_run ingests Bing (Step 1.3); qa_verdict blocks vacuous statute passes; the independent-QA requires a secondary GOV.UK/HMRC source for any figure changed in the last ~18 months. **The program is now ready to run at pace once the FA-2026 sweep lands.**
>
> **WATCH ITEM (recheck ~2026-06-20): 60-day-CGT redirect bundle buried Bing equity.** The Phase-3 redirect 301'd `how-to-report-property-sale-hmrc-60-days` (Bing 157 impr / 9 clicks / pos 5.2), `report-property-sale-hmrc-60-days-guide` (Bing 80) and `60-day-cgt-reporting-property-sales-complete-guide` (Bing 33) into `cgt-payment-deadlines-property-sales-2026`, which is Google-strong (271 impr, pos 6.5) but Bing-absent (1 impr). The Bing-blind collapse guard never saw this. NOT reversing now (redirect is 1 day old; Bing 301-transfer takes weeks). The hardened Bing-aware redirect-leak detector covers "old slug still leaking Bing clicks" from ~2026-06-12. If by ~2026-06-20 the canonical has NOT absorbed the ~270 Bing impr / 9 clicks, restore `how-to-report-property-sale-hmrc-60-days` from git (it predates the Phase-3 redirect commit) and drop its DUPLICATE_REDIRECTS entry. (Also: the collapse guard is still Bing-blind on the equity comparison — a future hardening should fold Bing into source/target equity, not just R6 target-establishment.)

**Live now** (commit `c151126b`, prod `www.propertytaxpartners.co.uk`): 4 rewrites + 1 equity-safe collapse, all QA-gated. The full chain caught real problems and held: the equity guard auto-flipped a reversed-equity collapse; the independent-QA caught wrong tax advice (s.94H flat-rate home-office wrongly offered to landlords) that the writer-verify had missed; and a source-check rejected a bad statute "fix" (the verify wanted to change a correct ITTOIA 2005 cite to a 404 ITA 2007 section). Blow-by-blow in memory `track2_remediation_state`.

**Count reconciliation (the "where did the 200+ go" answer):** original residual universe **234** → **77 handled** (Phase 3 + the 2026-05-21 rewrite pass + the CityService cluster 2026-05-29 + this batch) → **~157 remaining**. Worklist: `docs/property/track2_worklist_2026-05-29.md` (rebuild with `python scripts/track2_worklist.py`; it auto-excludes anything in `monitored_pages`, so you never redo a page).

### THE MANDATORY PER-BATCH CHAIN (full detail in `TRACK2_PROGRAM.md §16.T5`)
1. **`track2_rewrite_engine.wf.js {slugs, cluster}`** — diagnose + brief. The collapse-equity guard (§16.T2) runs between diagnose and brief and auto-flips any reversed-equity collapse to REWRITE. **Adjudicate every statute flag at legislation.gov.uk — trust the source, not the agent.**
2. **`track2_rewrite_writer.wf.js {slugs, depth:'full', cluster, briefDir:'briefs/property/track2/<batchN>'}`** — rewrites in place, reads the brief + `<slug>.corrections.md`, canonicalises links.
3. **`python scripts/qa_verdict.py pending --batch <name> --slugs …`** — the gate now blocks until QA clears these.
4. **`track2_independent_qa.wf.js {slugs}`** — re-derives every worked example + content-verifies every statute. **This is the layer that catches what writer-verify misses — never skip it.** Fix any blocking issue (verify the fix at legislation.gov.uk), then re-QA the fixed pages.
5. Save the QA return to JSON → **`python scripts/qa_verdict.py record --batch <name> --verdicts <json>`** (derives all_clear from the data; clears pending).
6. **`python scripts/predeploy_gate.py --qa-batch <name>`** — MUST be PASS (0 HARD links, all slugs all_clear, hashes match).
7. Commit (surgical staging), build (`cd Property/web && npm run build`), deploy, then insert `monitored_pages` rows (timed to go-live) + IndexNow.

### Deploy method
`scripts/deploy-and-index.ps1 -Site property -QaBatch <name>` now works (the vercel-stderr-banner bug was fixed, commit `16242597`). If it ever trips again, fall back to the raw command this batch used, from repo root:
`VERCEL_PROJECT_ID=prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU VERCEL_ORG_ID=team_XF9WAygZX7SGk9Fo4tOAnihH vercel deploy --prod --yes` (env vars override the restored project.json), then `python -m optimisation_engine.indexing.submit_indexnow --site property <urls>`.

### Open items / nuances for the next manager
- **Reversed-collapse audit (done, NO reverts needed):** all 115 live `DUPLICATE_REDIRECTS` were audited; 13 looked reversed on a static snapshot but the weekly time-series showed every one was a single-week spike or a same-day rewrite, not a durable buried ranking. 4 Tier-A targets are registered on `monitored_pages` as absorb-watch (`london-property-accountant`, `birmingham-property-accountant`, `section-24-mortgage-interest-restriction-uk-landlords`, `incorporation-timing-…`) — confirm they recover over the next 2-4 weeks; act only if they don't.
- **2 pages quietly retired from the worklist:** `section-24-mortgage-interest-restriction-uk-landlords` + `incorporation-timing-when-to-incorporate-property-portfolio` were registered for absorb-watch, so the worklist now excludes them. `incorporation-timing` is weak (pos ~89) and may still merit a rewrite — revisit it deliberately rather than letting monitoring retire it.
- **Parked:** `london-property-accountant` is indexed under both `/blog/<slug>` and `/blog/property-accountant-services/<slug>` (duplicate-URL / canonical issue worth a corpus check).
- Residual minor follow-ups (em-dash sweep then `predeploy_gate.py --strict`, the SOFT 301-hops, non-2027 arithmetic nits) — see `track2_remediation_state`.

### This session's commits (audit trail)
`bda6ad8c` D3+D4 hardening · `4c1f643a` + `586fc819` collapse-equity guard · `1b73c68e` §16.T1-T6 lessons · `6328d7ef` writer reads brief+corrections · `c151126b` batch 3 (4 rewrites + collapse) · `16242597` deploy-script fix. Working tree: only pre-existing unrelated WIP (`Medical/`, `contractors-ir35/`, megawave docs) remains uncommitted — leave it.

---

You are picking up the **Property legacy rewrite program** (~233 residual legacy pages). It was paused mid-flight because QA found the generator was producing systematic errors. **That remediation is now finished** — the blocker is cleared and the engine is hardened, so you can resume generating/executing rewrites on a sound footing.

---

> **⚡ UPDATE 2026-05-29 PM (commit `bda6ad8c`) — the two unbuilt hardening pieces are now BUILT, and the program has RESUMED.** Before resuming the rewrites the user directed "harden first": the plan's D3 + D4 (specified but not built at WS-D `717f0038`) are done.
> - **D3 (writer link-canonicalisation):** `slug_resolver.py --fix` CLI + a deterministic **Normalise** stage in `track2_rewrite_writer.wf.js` (legacy rewrites bypass `content_pipeline`, so they were NOT getting the auto-canonicalisation §1.1 describes for net-new — now they are). Invented slugs fail `html_valid`, never guessed.
> - **D4 (deterministic QA gate):** `track2_independent_qa.wf.js` now forces `arithmetic_recomputed[]` + `statute_checks[]` + `links_resolve` + `all_clear`; new `scripts/qa_verdict.py` records verdicts keyed to file sha256 (with `all_clear` **DERIVED from the dimensions, not trusted from the agent**) + a **pending-QA** marker; `predeploy_gate.py` blocks known-bad live pages + pending-unQA'd rewrites; strict `--qa-batch <name>` coverage wired through `deploy-and-index.ps1 -QaBatch`.
> - **MANDATORY operator chain per rewrite batch:** `track2_rewrite_engine.wf.js` (diagnose+brief, rewrite-vs-collapse) → `track2_rewrite_writer.wf.js` (rewrite in place) → `python scripts/qa_verdict.py pending --batch X --slugs …` → `track2_independent_qa.wf.js` → save its return → `python scripts/qa_verdict.py record --batch X --verdicts …` → `python scripts/predeploy_gate.py --qa-batch X` → build → deploy (`-QaBatch X`) → monitored_pages + IndexNow.
> - **Worklist:** **164 residual pages remain** — `docs/property/track2_worklist_2026-05-29.md` (+ `.json`), ROI-ranked + clustered; rebuild with `python scripts/track2_worklist.py`. Batch 1 (5 high-ROI pages) is the first run through the hardened pipeline.
> - Full state + the per-batch chain: memory [[track2_remediation_state]].
> - **Institutionalised (do not rediscover):** the principles behind all of this are now baked into `TRACK2_PROGRAM.md` **§16.T1-T6** + §17 risks 9-10 — the deterministic-floor rule (never gate a high-consequence call on LLM plausibility), the data-gated collapse-equity guard (`scripts/track2_collapse_guard.py`, run before ANY hand-added `DUPLICATE_REDIRECTS`), monitored_pages as a decision input, and the mandatory per-batch execution chain. Read them.

---

## 0. What just happened (the remediation — now COMPLETE)

A single root cause (the pipeline let the LLM guess internal-link categories and "verify" by plausibility only; `house_positions.md` was itself wrong on the April-2027 rules and re-seeded the error) produced four defect classes. All four workstreams are done:

| WS | What | Status | Commit |
|----|------|--------|--------|
| A | CityService cluster (41 pages + birmingham) + ITTOIA cites + house_positions §4/§7 root-seed fix | ✅ deployed | `dfb3d277` |
| B | Corpus-wide April-2027 framing sweep, 28 pages (backwards wedge / worked examples / draft-vs-enacted / wrong budget year) | ✅ deployed | `4ca1f97e` |
| C | All broken internal `/blog` links, **229 HARD 404s → 0** (292 wrong-category fixes + 18 hand-adjudicated invented links) | ✅ deployed | `f4f6d977` |
| D | Engine hardening: slug resolver + pre-deploy gate (root-cause prevention) | ✅ committed (tooling) | `717f0038` |

WS-B was independently re-verified by an adversarial workflow (37 agents, two rounds, ~95 worked examples re-derived). Prod is `www.propertytaxpartners.co.uk`.

---

## 1. What changed in the ENGINE that you MUST use

These are new since the program paused. They prevent the exact errors you'd otherwise re-introduce on the next ~233 pages.

1. **Internal links are now auto-canonicalised at generation.** `optimisation_engine/blog_generator/slug_resolver.py` is the single source of truth (slug → its one real `/blog/<category>/<slug>`). It is wired into `content_pipeline._apply_post_processing`, so every internal link the model emits gets its category fixed automatically. The model still chooses *which* page (the slug) and the anchor text; the resolver only fixes the mechanical category. **Invented slugs (pages that don't exist) are LEFT and flagged** on `fields["_unresolved_links"]` — the resolver never guesses them; you (or an LLM-repair pass) resolve those.

2. **A pre-deploy gate now exists — RUN IT before every Property deploy.**
   ```bash
   python scripts/predeploy_gate.py        # or: npm run gate:property
   ```
   It HARD-blocks on any broken internal `/blog` link (exit 1). Em-dashes and service-pricing surface as **warnings** (the legacy corpus still has ~117 pre-existing em-dashes; once swept, run `--strict` to enforce). It is also wired as Step 0 of `scripts/deploy-and-index.ps1` (Property only). **Do not deploy if the gate fails.**

3. **The April-2027 ground truth is fixed and locked.** `house_positions.md` §4/§7 (the doc every writer cites) was the root seed and is now correct. Any rewrite touching the 2027 rates MUST use this verified position (see `property_2027_rates_ground_truth` memory):
   - Rates **22% / 42% / 47% from 6 Apr 2027, England + Northern Ireland only** (Scotland/Wales devolved).
   - **Announced Autumn Budget 2025**, **enacted Finance Act 2026 (Royal Assent 18 March 2026)** — NOT draft/awaiting/scheduled, NOT the 2024 budget.
   - **FA 2026 Sch 1 lifts the Section 24 finance-cost reducer to 22% in step** → a basic-rate landlord has **no new wedge**; the higher/additional wedge is **unchanged** at 20pp/25pp. The "credit stays at 20% so the wedge widens" framing is BACKWARDS.
   - Worked-example invariant (2027/28): S24 credit = 22% × finance costs; the year-on-year increase = 2% × **net profit after finance costs**, not 2% of gross.
   - Section 24 cite is **ITTOIA 2005 ss.272A/274A** (reducer in ss.274AA/274C), never ITA 2007. CGT 18/24 + SDLT 5% surcharge correctly belong to the **30/31 Oct 2024** budget — leave those.

4. **Use the adversarial-verification pattern before deploy.** It paid off this session (caught real misses the scoper/QA missed). For any batch: independently recompute every worked example, fetch + content-verify each legislation.gov.uk cite, and confirm links resolve. The deterministic auditor + manager adjudication beat plausibility QA.

---

## 2. How to resume the rewrites

- **Canonical mechanics + worklist:** `docs/property/TRACK2_MANAGER_PICKUP.md` (the program pickup) and `docs/property/TRACK2_PROGRAM.md` (full §0-§20). These predate the remediation — read them for the brief-drafting + Phase-3-execution mechanics and the ~233-page target, but treat git + the trackers as the live state.
- **Program state (per `track2_program_state` memory, plus this session):** Trial (4 briefs) + Batch 1 (9 CGT briefs) closed; the **CityService cluster (47 pages) was executed and is now remediated + live** (it was the batch that surfaced the root cause). The remaining residual legacy pages (~233 target, minus what's shipped) are the next executions.
- **Recurring program risk:** the Bill-vs-enacted-Act drift family (12+ catches). Every statute citation in a brief must be URL-fetched AND content-verified AND (for "inserted by FA X" parentheticals) inserting-Act verified.
- **Bulk execution** runs via the `/run-wave` skill / Manager-with-sub-agents pattern (see `track2_dispatch_pattern` memory: 3+ parallel sub-agents go in separate terminals, not Agent dispatch). Start a fresh session for the bulk run — cleaner context.

---

## 3. Deploy + verify (Property)

```bash
# 1. gate (MUST pass)
python scripts/predeploy_gate.py
# 2. build
cd Property/web && npm run build
# 3. deploy (from repo root)
VERCEL_PROJECT_ID=prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU VERCEL_ORG_ID=team_XF9WAygZX7SGk9Fo4tOAnihH vercel deploy --prod --yes
# aliases to www.propertytaxpartners.co.uk; verify a changed page with WebFetch after
```
Auditor (authoritative link check): `python scripts/track2_link_audit.py` (expect 0 HARD). Resolver self-check: `python optimisation_engine/blog_generator/slug_resolver.py`.

---

## 4. Residual follow-ups (minor / optional — none block resuming)

- **Em-dash sweep:** ~117 pre-existing em-dashes corpus-wide (gate warns). Sweep them, then run the gate with `--strict` to enforce em-dash + pricing going forward.
- **Pricing review:** ~41 gate pricing warnings — mostly legitimate market-rate/educational context (e.g. "letting agents charge 12-15% of rent", an accountant-cost explainer page) and case quotes; confirm none is the firm advertising its own price.
- **SOFT links:** 29 working-via-301 links (1 self-loop + 28 redirect-hops). The resolver would canonicalise them; optional cleanup.
- **Non-2027 arithmetic nits** (current-year/CGT examples, conclusions unaffected): PPR £100,949→£100,955 (£6); cgt-property-sold-loss SDLT "£5,400 = surcharge plus regular bands" (£5,400 is the surcharge alone); tax-efficient dividend label £3,170→£2,580. See `track2_remediation_state` memory.
- **Slugify de-dup:** the slugify rule lives in 3 verified-identical places (`lib/blog.ts`, `track2_link_audit.py`, `slug_resolver.py`). Optionally make the auditor import it from `slug_resolver` (needs a `__main__` guard refactor of the auditor — the gate subprocesses it).

---

## 5. Working-tree note

The tree has pre-existing unrelated WIP that was dirty at session start and is NOT part of Track 2: `Medical/*`, `contractors-ir35/*`, `briefs/property/megawave1|3/*`, `docs/property/megawave1_*`, `optimisation_engine/{llm_providers,gsc_query_client,weekly_run}.py`, `image.png`, `package-lock.json`, `.claude/settings.json`. Leave these alone unless you own them. All Track 2 work this session is committed (HEAD `717f0038`).

## 6. Doc + memory map

- This doc — resume point (remediation done + engine changes).
- `docs/property/TRACK2_WSB_HANDOVER_2026-05-29.md` — the remediation handover (WS-B/C/D detail).
- `docs/property/TRACK2_MANAGER_PICKUP.md` + `TRACK2_PROGRAM.md` — the rewrite program.
- Memories: `track2_remediation_state` (remediation, all 4 WS), `track2_program_state` (rewrite program), `property_2027_rates_ground_truth` (the verified 2027 facts), `track2_dispatch_pattern` (sub-agent dispatch), `feedback_autonomous_mode`.
- Full plan (user-home, this session): `C:\Users\user\.claude\plans\vast-booping-kite.md`.
