# Track 2 — RESUME POINT for the next manager (start here) — 2026-05-31

> **This supersedes `TRACK2_REWRITE_RESUME_2026-05-29.md`.** Read this top-to-bottom, then the memories `track2_ranking_grade_engine`, `feedback_rewrite_only_no_collapse`, `track2_remediation_state`, `property_2027_rates_ground_truth`, `property_capital_allowances_2026_ground_truth`. The engine is now **ranking-grade + rewrite-only**; the program is a "turn-the-crank" cluster-by-cluster run.

---

## 1. What this session built (the engine changed materially — use it)

The pipeline went from "de-stale a page" to **ranking-grade, verified, rewrite-only**. Four things:

1. **REWRITE-ONLY rule (hard).** Never collapse. Every engine `redirect-collapse` is overridden to REWRITE (`track2_rewrite_engine.wf.js` `REWRITE_ONLY` mode, default on). Collapse is a deferred future workstream. The 10 not-yet-deployed collapses from the prior session were **reversed** (source `.md` restored, `DUPLICATE_REDIRECTS` removed) in commit `9bf06b16`. See memory `feedback_rewrite_only_no_collapse`. The 2 already-DEPLOYED collapses (Wave-6 era) stay.

2. **Ranking-grade rewrite (the real value).** Every rewrite now takes the page's proven **GSC + Bing query demand** (+ adjacent opportunity for invisible pages) and weaves it naturally through meta/H1/H2s/FAQs/body, with **deterministic coverage verification**:
   - `scripts/track2_query_coverage.py` — stop-word/light-stem/set-overlap matcher (numbers literal: "section 24" != "section 23"); per-query covered/partial/missing + WHERE it appears; gates only on high-demand (impr>=50) queries; invisible pages never gate. `--json` + `--selftest`.
   - `optimisation_engine/track2/pull_page_data.py --json` — shared contract with `target_queries[]` (computed once) + free/cached adjacent-keyword section. No paid API.
   - On-page SEO: metaTitle<=60 (primary query + CTR hook), metaDescription<=155, query-aligned H1/H2s, PAA FAQs, `reviewedBy/reviewerCredentials/reviewedAt/dateModified`, `howToSteps` (auto HowTo schema), **comparison `<table>` mandatory on vs/decision pages**, 3-6 internal links. Rendering: `schema.ts` now emits real `dateModified`, reviewer `Person`, HowTo.

3. **Rolling QA + auto-fix runner** `scripts/track2_qa_autofix_runner.wf.js` — the context-preserving orchestrator. Per page: independent-QA (verbatim from `track2_independent_qa.wf.js`) -> classify each failing item fixable/escalate -> a Fix agent applies QA-prescribed fixes (re-verifying every statute at legislation.gov.uk; escalates if the prescribed fix is itself wrong) -> re-QA, loop max 2. Writes each full verdict to `optimisation_engine/.cache/qa_runner/<batch>/<slug>.json` and returns a **compact manifest only**. **Escalate = manager-only** (cite contradicts locked house_positions / no concrete fix / unresolved). This keeps the manager's context flat across the program.

4. **Editorial-quality gate** — a distinct commissioning-editor pass IN the runner (filler, repetition, hedging, listicle-in-prose, weak structure/voice). Grades strong/adequate/weak; **blocks only on 'weak'** (auto-polishes weak prose then re-QAs facts). Writer HARD rules gained an EDITORIAL STANDARD bullet.

Tooling commits: `a68f8acd` (engine+coverage), `0b33d741` (rewrite-only+QA Wales), `42644f39` (writer Welsh-scope+dynamic-date+table mandate), `e63af6df` (house_positions §30 council-tax), `c40264ed` (rolling runner), `3eaee9b4` (editorial gate + runner could_not_apply fix).

---

## 2. What is SHIPPED (all on `main`, NOTHING deployed — manual deploys only)

| Batch | Pages | Commit | Engine | Notes |
|---|---|---|---|---|
| Canary (GG) | 3 | `eaec7026` | ranking-grade, factual QA (no editorial gate yet) | structure-planning, accounting-services, when-to-sell |
| GG-2 | 7 | `5f2969f1` | ranking-grade + coverage; editorial on 1 | commercial-property-tax, first-time-landlord, how-to-value, landlord-accounting-spreadsheet, property-accounting-software, property-investment-tax-2026, property-investment-vs-stocks |
| GG-3 | 6 | `3edcd34f` | ranking-grade + coverage; editorial on 1 | how-to-set-up-company, both insurance, business-rates, both HMO |
| Reversal | 10 restored | `9bf06b16` | **restored STALE, NOT yet rewritten** | see §4 |
| Evening (prior session) | ~23 rewrites | `ee4f424f`/`2ef24d4a`/`8f6ac8e9` | factual QA only (NO coverage/editorial) | NonResident 3, SA-Deductions 10, CapitalAllowances 10 |

**GeneralGuides cluster is COMPLETE (16 ranking-grade rewrites).** Every one all_clear via the runner, gate PASS, build green.

---

## 3. The MANDATORY per-batch chain (now coverage + editorial aware)

```
# 0. (coupled clusters only — e.g. AIA) generate briefs:
Workflow scripts/track2_rewrite_engine.wf.js  {slugs, cluster, briefDir}   # rewrite-only; overrides any collapse
# 1. rewrite in place (no-brief fallback is fine for standalone pages):
Workflow scripts/track2_rewrite_writer.wf.js   {slugs, depth:'full', cluster, briefDir}
# 2. mark pending:
python scripts/qa_verdict.py pending --batch <B> --slugs <...>
# 3. rolling QA + auto-fix + editorial (writes per-slug verdicts to .cache/qa_runner/<B>/):
Workflow scripts/track2_qa_autofix_runner.wf.js {slugs, batch:'<B>', maxRounds:2}
#    -> read the COMPACT manifest. For each ESCALATED page: adjudicate the statute at
#       legislation.gov.uk (trust the source), fix it (or delegate the surgical fix),
#       then re-run the runner on that ONE slug (overwrites its verdict).
# 4. merge per-slug verdicts -> record -> coverage manifest:
python - <<'PY'  # merge .cache/qa_runner/<B>/*.json into {"pages":[...]} -> .cache/<B>_verdicts.json
PY
python scripts/qa_verdict.py record   --batch <B> --verdicts .cache/<B>_verdicts.json
python scripts/qa_verdict.py coverage --batch <B> --slugs <...>
# 5. gate (MUST be PASS):
python scripts/predeploy_gate.py --qa-batch <B> --coverage --coverage-batch <B>
# 6. build + commit (NO deploy):
cd Property/web && npm run build      # exit 0
git add <the batch .md files> && git commit   # surgical staging; .cache/* is gitignored
```
**Cadence that works:** launch the writer and (after it returns) the runner as background workflows; you read two compact results per cluster. Manager only adjudicates ESCALATED statute calls + commits. `.cache/*.json` are gitignored (transient gate state). **Deploy is the user's** via `scripts/deploy-and-index.ps1 -Site property -QaBatch <B>` (auto-registers monitored_pages G+Bing baselines + IndexNow). See memory `vercel_blog_fallback_size_limit` for the ISR env var.

---

## 4. What needs DOING (remaining ~137 of 153)

**Worklist:** `python scripts/track2_worklist.py` (ROI-ranked, Google+Bing). Next clusters by ROI: **NonResident, SelfAssessment, CapitalAllowances, Incorporation, MTD, VATcalc, Section24, CGT, FinanceMortgage, Calculators, PortfolioOps, IHT, FHL, SDLT.**

**The 10 reversed-collapse pages are restored STALE and need rewriting** (they are in the queue, in their old clusters): `non-resident-cgt-selling-uk-property-overseas-guide`, `hmrc-penalties-late-landlord-tax-returns-2026`, `aia-capital-allowance-property-landlords`, `capital-allowance-aia-property-landlords`, `aia-capital-allowances`, `annual-investment-allowance-2025`, `buy-to-let-accountants-near-me-guide`, `mtd-penalties-landlords-miss-deadline`, `mtd-quarterly-reporting-landlords-step-by-step-guide`, `rental-income-tax-uk-complete-guide-landlords`. Each must be DIFFERENTIATED from its former canonical (rewrite-only; the writer/runner cannibalisation checks enforce this).

**Coupled clusters need coordinated lanes before briefing:** the **AIA cluster** (the 4 reversed AIA pages + the existing `annual-investment-allowance-uk` / `-landlords-uk` / `annual-investment-allowance-2024-25` / `what-is-aia-in-tax` canonicals) is the worst cannibalisation knot — assign each page a distinct primary intent first. Most other (standalone) pages can use the **writer's no-brief fallback** (it self-diagnoses from `pull_page_data --json`); reserve engine briefs for coupled clusters.

---

## 5. CRITICAL gotchas before the next push

1. **Deploy is manual + nothing is in prod.** The 16 GG rewrites + the 10 reversals + the ~23 evening rewrites are all on `main`, undeployed. When the user deploys `main`, they all go live together.
2. **Worklist re-lists not-deployed rewrites.** `track2_worklist.py` excludes `monitored_pages`, but committed rewrites are not registered there until DEPLOY. So the worklist WILL re-list pages already rewritten this/last session. **Before picking a cluster's slugs, exclude everything already rewritten** (use `git log --name-only` over the rewrite commits, or the qa_verdict caches). Otherwise you redo pages.
3. **Editorial + coverage backfill before deploy.** ~37 committed pages predate one or both new gates: the 14 GG pages QA'd before the editorial gate (canary 3 + GG-2 6 + GG-3 5; `property-accounting-software` + `property-business-rates` already have editorial=strong) AND the ~23 evening rewrites (factual QA only — no coverage, no editorial). Decide: run them through the editorial-enabled runner (`maxRounds:2`) before deploy for uniform ranking-grade, or accept the evening 23 as factually-clean. Recommended: at least an editorial-only pass on all ~37 before deploy.
4. **Rewrite-only is absolute** — never add a `DUPLICATE_REDIRECTS` entry; if two pages overlap, keep both + differentiate.

---

## 6. Ground-truth corrections made this session (do NOT re-derive — locked)

- **2027 property rates apply to England, WALES & NI** (only Scotland carved out for 2027/28; the Welsh self-setting power is a future FA 2026 s.8/Sch 2 power not in force). house_positions §7 + writer HARD rules + QA prompt all corrected. ("England + NI only" is the pervasive STALE error.)
- **CTA 2010 marginal relief = Part 3A (computed s.18B, fraction 3/200 under s.18)** — NOT s.19/s.20 (omitted by FA 2014). CIHC SPR denial = s.18A(1)(b); divisor = ss.18D/18E. (house_positions § CT-rates updated.)
- **Council-tax owner liability = SI 1992/551** "Liability for Owners" (NOT SI 1992/612, the base-calc regs). HMO single-dwelling banding settled by **SI 2023/1175** art 3C (in force 1 Dec 2023). (house_positions §30 updated.)
- **Section 24 / property-business profit rule = ITTOIA 2005 s.271E(1)** (s.272(1) was omitted 16.11.2017; s.272 is now just the GAAP limitation list). Section 24 reducer provisions = ITTOIA 2005 ss.272A/274A.
- **MTD digital records = SI 2026/336** (Income Tax (Digital Obligations) Regs 2026, in force 1 Apr 2026; revoked SI 2021/1076 + SI 2024/167).
- **Second-home council-tax premium (LGFA 1992 s.11C, inserted by LURA 2023 RA 26 Oct 2023): earliest application 1 April 2025** (one-year-notice rule makes 2024/25 impossible).
- **HA 1988 s.16E (RRA 2025 re-let restriction) inserted by RRA 2025 s.13** (not s.15).

---

## 7. Key files
- Tooling: `scripts/track2_query_coverage.py`, `scripts/track2_qa_autofix_runner.wf.js`, `scripts/track2_rewrite_writer.wf.js`, `scripts/track2_rewrite_engine.wf.js`, `scripts/track2_independent_qa.wf.js`, `scripts/qa_verdict.py`, `scripts/predeploy_gate.py`, `optimisation_engine/track2/pull_page_data.py`, `scripts/frontmatter_lint.py`, `optimisation_engine/blog_generator/slug_resolver.py`, `scripts/track2_link_audit.py`.
- Rendering: `Property/web/src/lib/schema.ts` + `lib/blog.ts` + `types/blog.ts` + `app/blog/[category]/[slug]/page.tsx`.
- Briefs (committed, MTD + GeneralGuides only): `briefs/property/track2/{mtd,generalguides}/`.
- Memories: `track2_ranking_grade_engine` (THIS session's engine + program state — primary), `feedback_rewrite_only_no_collapse`, `track2_remediation_state`, `property_2027_rates_ground_truth`, `property_capital_allowances_2026_ground_truth`, `bing_webmaster_data`, `feedback_factual_backpatch_manager_direct`, `feedback_autonomous_mode`.
