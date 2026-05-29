# Track 2 CityService + autonomous-mode pickup (2026-05-29)

**Mode:** AUTONOMOUS. User is away from keyboard and has authorised decisions without
yes/no confirmation; when uncertain take the safest reversible option and log it. See
memory `feedback_autonomous_mode.md`. Deploy verified reversible changes autonomously;
produce + verify + commit bulk new content, deploy in verified batches.

## Done + DEPLOYED + verified this session
1. **/blog 502 fixed** (commit `3f587fbd`) + lead-capture WIP committed (`7da4a764`). Deployed.
2. **Source refresh run + PARKED** (MW4 deferred ~2 weeks for GSC maturity): GSC mined
   (gsc_query_data, 4,416 rows), sitemap re-swept. No DataForSEO needed (DDG+Serper+GSC).
   Artifacts: `docs/property/topic_gaps_delta_2026-05-29.md`, `briefs/property/_mw4_gsc_opportunities_2026-05-29.json`.
3. **Track 2 Phase 3 (22 pages)** confirmed already live; `monitored_pages` gap closed (Decision C) -
   22 rows inserted, baselines from GSC. Tool: `scripts/insert_monitored_pages.py`.
4. **CityService cluster-collapse (8 pages)** — commit `6e85f71c`, DEPLOYED + verified (301s + canonicals 200)
   + 8 `monitored_pages` redirect rows inserted (`scripts/track2_cityservice_collapse_monitor.py`).
   8 weak/dupe pages merged (LOSSLESS - query coverage lifted into canonical first) into 2 canonicals:
   - `london-property-accountant` <- property-specialist-accountant-london, best-property-accountant-london
   - `what-does-a-property-accountant-do` <- what-services-buy-to-let-accountant,
     online-property-accountant-remote-accounting, property-accountant-services,
     property-accountant-vs-general-accountant, accountant-accounting-services,
     what-should-property-investors-expect-from-specialist-accountants
   - middleware: 8 new 301s + 6 pre-existing redirects repointed off sources (no chains).

## Engine / tooling (committed `6f8137c3`) - reasoning-first; scripts only touch data/IO
- `scripts/track2_worklist.py` -> `docs/property/track2_worklist_2026-05-29.{md,json}` (211 residual, ROI-ranked, clustered)
- `scripts/track2_triage.wf.js` - per-page rewrite/collapse/keep triage (cannibalisation-aware)
- `scripts/track2_collapse_verify.wf.js` - MERGE check (canonical must cover source queries; chain resolution; equity)
- `scripts/track2_apply_lifts.wf.js` - lift query coverage into a canonical (GSC+GA4 grounded) + coverage verify
- `scripts/track2_rewrite_writer.wf.js` - EXECUTE rewrites in place + adversarial verify. args {slugs,depth:'full'|'refresh',cluster}
- `scripts/track2_rewrite_engine.wf.js` - diagnose->brief->verify (brief-only variant)
- `scripts/_sb_query.py` "SELECT ..." - read-only Supabase Management API
Invoke a workflow: `Workflow({scriptPath, args:{...}})`. Workflows write pages to disk + return compact audits.

## CityService triage result (47 pages) - the reasoned map
- **11 collapse** -> 8 confirmed (DONE above), **3 REJECTED -> rewrite track**:
  `manchester-property-accountant` (proposed redirect was a 301 LOOP; it is the Manchester canonical),
  `accountant-payroll-services` (distinct commercial intent), `property-accountant-near-me` (distinct geo intent).
- **36 rewrite + 3 ex-rejects = 39 to rewrite.** 43/47 were INVISIBLE (~0 GSC). Tier the rewrites:
  - **Tier 1 (depth='full')** ~13 with GSC traction / distinct non-city intent: milton-keynes(18imp/p9),
    bristol(15/p37), salary-complete-guide(10/p26), stockport(p11), ipswich(p6), derby(p8), swindon(p5),
    glasgow(p34), how-to-choose(p70), how-to-become(p30), manchester, accountant-payroll-services, property-accountant-near-me.
  - **Tier 2 (depth='refresh')** ~26 invisible long-tail city pages: belfast, brighton, cambridge, cheltenham,
    coventry, exeter, plymouth, portsmouth, aberdeen, bath, dundee, edinburgh, middlesbrough, northampton,
    norwich, oxford, preston, reading, warrington, sunderland, york, why-cardiff, why-luton, why-sheffield, slough, newcastle.
    Refresh = strip pricing + fix stale facts + add genuine local depth, NOT full gold-reference bloat.
- **SYSTEMIC finding:** PRICING_LEAK on 41/47 (banned fee figures) + STALE_FACTS on 31/47 (MTD/S24/FHL/2027).
  ~108/697 site-wide pages carry fee-quote phrasing (candidate, needs per-page reasoning). User chose
  "fix leaks inline" during rewrites (not a separate firefight). NON-Track-2 leak pages (net-new/rewritten,
  ~half of 108) won't be reached inline -> parked for a later optimisation pass.

## PROGRESS (autonomous, updated through Tier-1)
- DONE+DEPLOYED+MONITORED: CityService **13 Tier-1 rewrites** (commits `22b82a40` rewrites + `d8301db3` markup strip). All verified (statutes/pricing/em-dash/facts/cannibalisation/HTML). 13 monitored_pages rewrite rows inserted.
- DONE+DEPLOYED: **site-wide leaked-markup strip** - 34 live pages had `</content></invoke>` from prior sub-agents; stripped via `scripts/strip_leaked_tool_markup.py`. Verify caught it (now a standing guard).
- Rewrite-writer hardened: rewrite stage returns minimal payload (StructuredOutput flakiness fixed); verify stage reads the saved file as the gate.
- **CITYSERVICE CLUSTER COMPLETE (47/47): 8 collapse + 13 Tier-1 full + 26 Tier-2 refresh, all deployed + monitored.** Tier-2A commit `27ec789e`, Tier-2B commit `7eb620c8`. Recurring fixes applied by verify+manager: CGT 24% cite = Finance (No.2) Act 2024 not FA 2024 (cambridge/coventry/aberdeen); FA 2026 enacted-not-awaiting framing (belfast/how-to-become/ipswich); SCOTLAND - 22/42/47 are rest-of-UK, Scottish property rates set by Holyrood per FA2026 s.8/Sch2 (edinburgh/aberdeen fixed; glasgow/dundee already correct; reading "all UK landlords" softened); newcastle CGT attribution (wrong Act+date) corrected to plain current-rate statement.
- **PARKED corpus-quality sweeps** (do as dedicated reasoning passes, not blanket script): (1) CGT 18/24 Act-attribution consistency across the corpus - safe pattern is state current rates, attribute carefully (residential 24% = F(No.2)A 2024 c.12 from 6 Apr 2024; main rates aligned 18/24 by FA 2025 from 30 Oct 2024) or omit the Act; newcastle FAILED on this, several others had advisories. (2) FA2024->F(No.2)A2024 same family. (3) non-Track-2 pricing-leak pages (~half of 108; e.g. nottingham flagged by norwich verify).
- NEXT CLUSTER: Incorporation(35)+CGT(7) rewrite-heavy; Section24(27)+CapitalAllowances(21) collapse-heavy (run triage -> collapse-verify(merge) -> apply-lifts, like CityService collapses). VATcalc(4) collapse. Then smaller clusters.
- Per-batch loop: workflow -> read compact audits -> fix pass-with-fixes (factual, manager-direct) -> build -> commit (rewrites + any markup) -> deploy -> insert monitored_pages (rewrite_type) at deploy. Keep batches at 13 so the tree never holds a huge uncommitted set (compaction-safe).
- AFTER CityService: next clusters via triage->engine. Section24(27) + CapitalAllowances(21) are collapse-heavy (severe self-cannibalisation, mostly redirect-collapse with query-coverage MERGE per track2_collapse_verify + track2_apply_lifts). Then CGT(7) + Incorporation(35) rewrites.
- Then the other clusters via the same triage->engine: CGT(7), Incorporation(35), CapitalAllowances(21, collapse-heavy),
  Section24(27, collapse-heavy - severe self-cannibalisation, mostly collapse), MTD(8), VATcalc(4, collapse), etc.
- Deploy: repo root, `VERCEL_PROJECT_ID=prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU VERCEL_ORG_ID=team_XF9WAygZX7SGk9Fo4tOAnihH vercel deploy --prod --yes`.
- After any rewrite/redirect deploy: insert monitored_pages rows (rewrite_type='rewrite'|'redirect') via insert_monitored_pages.py pattern, dated to the deploy.

## Pointers
- `docs/property/TRACK2_MANAGER_PICKUP.md` + `TRACK2_PHASE3_CLOSE_PICKUP.md` (prior Track 2 state, pre-this-session)
- `docs/property/house_positions.md`, `docs/competitor_rewrite_playbook.md`
- Memory: `feedback_autonomous_mode`, `vercel_blog_fallback_size_limit` (/blog fix), `vercel_cli_deploy_workflow`, `monitored_pages_system`.
