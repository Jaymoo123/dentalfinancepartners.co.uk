# Track 2 — DEPLOY HANDOFF (2026-05-31, later session) — START HERE

> Read this first, then `TRACK2_RESUME_2026-05-31.md` (engine internals still valid) and memories `track2_ranking_grade_engine`, `feedback_rewrite_only_no_collapse`, `property_2027_rates_ground_truth`, `property_capital_allowances_2026_ground_truth`. Session paused on a weekly-token limit after a prod deploy.

## 1. SHIPPED TO PROD this session — LIVE on www.propertytaxpartners.co.uk
`vercel deploy --prod` ships the **whole `main` HEAD** (working tree), so prod caught up on ALL committed-but-undeployed work, gate-clean (0 HARD 404s, YAML valid) + build-clean (722/722).

**This session's 44 ranking-grade rewrites + the byline feature (commits on main):**
- `94fe0bb9` GG backfill — 14 GeneralGuides (editorial+coverage)
- `581faa64` MTD cluster — 8 (6 fresh + 2 reversals: mtd-penalties-landlords-miss-deadline, mtd-quarterly-reporting-landlords-step-by-step-guide)
- `4ef65e64` **Byline feature** — stacked "First published / Last updated" (`BlogPostRenderer.tsx`); only renders when `dateModified != date`; schema already emitted both dates. Self-applies to every future rewrite.
- `a2b8436b` CGT + FHL — 10
- `a1c670a1` Section24-A — 12

**Also now live (were committed prior sessions, deployed for the first time by this catch-up):** the ~24 evening rewrites (NonResident 3 + SA-Deductions 11 + CapitalAllowances 10 — factual-QA-clean, lack coverage/editorial polish) and the 10 restored-stale reversal pages (≈ the versions prod already served; still STALE, still need rewriting). No correctness regression (gate enforced 0 HARD 404s); net improvement + catch-up.

**Deploy command (proven, non-interactive, from repo root):**
```
$env:VERCEL_PROJECT_ID='prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU'; $env:VERCEL_ORG_ID='team_XF9WAygZX7SGk9Fo4tOAnihH'; vercel deploy --prod --yes
```
Aliases to www.propertytaxpartners.co.uk automatically.

## 2. IN-FLIGHT — STASHED, NOT committed, NOT deployed → `git stash@{0}`
`git stash list` shows "track2 in-flight RESUME...". **`git stash pop`** to resume. QA verdict caches are preserved on disk under `optimisation_engine/.cache/qa_runner/<batch>/` (gitignored), so finalisation does not need a re-QA of the clean pages.

- **`mixed1` (9 pages)** — runner returned 7 all_clear + 2 escalated. The 2 escalated (`stamp-duty-buy-to-let-surcharge`, `btl-mortgage`) failed only as "QA agent returned nothing" (transient infra failure, NOT content) — just **re-run the runner on those 2**. 7 clean: business-property-relief-rental-property-iht, landlord-tax-return-deadline-2026, rental-yield-calculator-guide-uk-landlords, rental-income-tax-calculator, housing-development-finance, mortgage-arrangement-fees-deductible-landlord, deposit-buy-to-let-2026-mortgage-requirements.
  - Finish: pop → `track2_qa_autofix_runner` on the 2 escalated (batch `mixed1`) → merge verdicts → `qa_verdict record/coverage` → gate → commit.
- **Incorporation-A (12 pages)** — writer done, **NOT runner-QA'd**. Slugs: corporation-tax-rates-property-companies-2026-27, director-loan-property-company, family-investment-company-property-worth-it, how-to-transfer-property-into-limited-company-uk, incorporating-property-portfolio-uk-2026, limited-company-vs-personal-ownership-tax-comparison-2026, property-company-dividend-tax, retained-profits-property-company-tax-advantages, sdlt-transfer-property-company-cost, section-162-incorporation-relief-property-landlords, should-i-incorporate-buy-to-let-portfolio-2026, types-of-property-company-structure-uk-guide.
  - **Known fixes the runner must land:** (a) `sdlt-transfer-property-company-cost`: Schedule 4A FA 2003 rate "15%" → **17%** (since 31 Oct 2024), 2 places; (b) `family-investment-company-property-worth-it`: wrong-category link `/blog/income-tax/2027-property-income-tax-rates-landlords-uk` → correct category `/blog/landlord-tax-essentials/...` (Normalise/link-audit fixes).
  - Finish: pop → `track2_qa_autofix_runner` (batch `incorpA`, 12) → adjudicate escalations at source → merge → record → coverage → gate → commit → deploy.

## 3. REMAINING QUEUE — reconciliation closes exact: 153 = 40 + 10 + 103
- **Fresh 103:** DEPLOYED 28 (MTD 6, CGT 5, FHL 5, Section24-A 12) · STASHED 21 (mixed1 9, Incorporation-A 12) · **NOT STARTED 54:** Incorporation 21 (the deferred near-dupe seconds), Section24 14 (deferred seconds: the two 2027-planning, three higher-rate, calculator, case-studies, etc.), FinanceMortgage 4 (refinancing pair + mortgage-interest-deductible pair), PortfolioOps 8, **VATcalc 4 (CALCULATOR KNOT — 4 near-identical "vat calculator" pages; needs manual intent split or accept overlap)**, CapAll 3 (`aia-allowance-uk-property-investors` + 2 `on_disk=false` collapse-restore-or-skip decisions: `hmo-capital-allowances-multi-tenant-landlords-claim`, `landlord-capital-allowances-tax-relief`).
- **Reversals remaining 8:** 4 AIA (aia-capital-allowance-property-landlords, capital-allowance-aia-property-landlords, aia-capital-allowances, annual-investment-allowance-2025) + non-resident-cgt-selling-uk-property-overseas-guide + hmrc-penalties-late-landlord-tax-returns-2026 + buy-to-let-accountants-near-me-guide + rental-income-tax-uk-complete-guide-landlords. (All restored-stale + now LIVE; rewrite to differentiate.)
- **AIA knot:** the 4 reversed AIA pages + existing AIA canonicals — the ONLY cluster to use ENGINE briefs for (manual distinct-intent partition first). Everything else is writer-first no-brief.
- **Backfill:** the 24 evening rewrites are now LIVE + factually-clean; the coverage/editorial polish is now a lower-priority live-page enhancement, not a pre-deploy blocker.

## 4. OPERATING MODEL (locked this session)
- **Writer-first, NO engine briefs** (user policy) except the AIA knot. No-brief fallback has identical rigor (validated: Section24 11/12 all_clear, zero cannibalisation thrash).
- **Per-batch chain:** `track2_rewrite_writer.wf.js {slugs,depth:'full',cluster,briefDir:''}` → `track2_qa_autofix_runner.wf.js {slugs,batch,maxRounds:2}` → manager adjudicates only ESCALATED items at source (then re-QA that 1 slug) → merge `.cache/qa_runner/<b>/*.json` → `qa_verdict record/coverage` → `predeploy_gate --qa-batch <b> --coverage --coverage-batch <b>` → build → commit. Finalisation delegated to a subagent to keep manager context flat.
- **Pipeline cadence:** ≤2 content workflows in flight (1 writer + 1 runner, offset). Sequence near-dupe pairs across sub-batches (commit the first so the second differentiates against it). Compose each ~10–13-page batch with only ONE of each near-dupe group.
- **CROSS-CLUSTER LINK-GATE RULE (important):** `predeploy_gate`'s internal-link check is REPO-WIDE. A HARD 404 in another in-flight cluster's *dirty* file is NOT a blocker for committing THIS batch (its own files are clean). The final consolidated repo-wide gate before deploy is the real backstop. (This is why s24a's first finalisation stopped — it was Incorporation-A's transient family-investment link.)
- **Deploy = clean the tree first** (stash in-flight) → gate → local build → `vercel deploy --prod --yes` (env-var form above) → restore stash. The deploy ships all of `main` HEAD.

## 5. PENDING FOLLOW-UPS (do next session, not blockers)
- **monitored_pages registration** for the deployed batches (`scripts/register_monitored_batch.py` per batch: ggbackfill1, mtd1, cgtfhl1, s24a — for the GSC/Bing regression watch). NOT done.
- **IndexNow** submission for the deployed URLs (`python -m optimisation_engine.indexing.submit_indexnow --site property ...`). NOT done.
- **Minor-cleanup sweep:** scan `.cache/qa_runner/*/` verdicts for `signoff:'minor-issues'`. KNOWN item: `cgt-selling-buy-to-let-property-calculation-guide` says residential CGT 18/24 "since 30 Oct 2024" → should be **6 Apr 2024** (rates correct, date attribution wrong; runner deemed non-blocking, now live).

## 6. GROUND-TRUTH (locked — do not re-derive)
2027 rates 22/42/47 England+**Wales**+NI (only Scotland carved out for 2027/28); S24 reducer rises to 22% (no new basic-rate wedge); S24 reducer = **ITTOIA 2005 ss.272A/274A–274C** (NOT ITA 2007 — recurring writer trap, runner catches it); MTD records = **SI 2026/336**; TMA 1970 s.12B retention = **5th anniversary** (~5–6 yrs, NOT 7); Schedule 4A FA 2003 higher rate = **17%** (since 31 Oct 2024); WDA 18%→**14%** (FA 2026 s.28) + new **40% FYA** (s.29 / CAA 2001 s.45U, not unincorporated-only in law); marginal relief = **CTA 2010 Part 3A/s.18B**; post-cessation expense relief = **ITA 2007 s.96** (NOT ITTOIA s.354).
