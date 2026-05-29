# Track 2 — RESUME POINT for the rewrite manager (start here) — 2026-05-29 PM

**Read this first, then `track2_program_state` + `track2_remediation_state` + `property_2027_rates_ground_truth` memories, then `docs/property/TRACK2_MANAGER_PICKUP.md` for the rewrite-program mechanics.**

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
