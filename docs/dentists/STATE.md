# Dentists — program state (living heartbeat)

> ## PICKUP - design port, ALL SIX PHASES BUILT, REVIEWED AND TAGGED. DEPLOYED to production 2026-09-16 from `90fbea9c` (estate-wide release: design port, claims fixes, header CTA fix, favicons).
>
> Phase 0: `9936547a`. Then tag + commit per phase:
> `port-dentists-phase1` @ `f1df9e93`, `port-dentists-phase2` @ `3f2d4d35`,
> `port-dentists-phase3` @ `39d8a797`, `port-dentists-phase4` @ `5d2f0236`,
> `port-dentists-phase5` @ `6f986cf3`, `port-dentists-phase6` @ `bdb3f5e7`.
> (Phase 1 also carries the interim commits `e62029fa`, owner decisions, and `f1197d7a`,
> brand layer + content remediation, plus the fix pass swept into `f75438bf`, see below.)
> Production moved to `90fbea9c` on 2026-09-16.
>
> **NEXT: owner walk, then owner decisions on what remains.** No pending deploy; there is no
> further build work queued; phases 0-6 are done. `PHASE3_BUILD_PLAN.md` and
> `PHASE456_SCOPE.md` are build RECORDS of what shipped, not forward plans, read them for
> history, not for a next step.
>
> **DO NOT RE-ASK THESE. Owner decisions taken 2026-09-11:** navy primary ramp with gold
> demoted to a non-text accent; warning ladder D-W1 (red-600 / pink-700 / purple-800);
> start the port now and accept the re-baseline of the 18 armed windows; remove ALL
> published pricing, rewritten individually; rewrite out the named competitor passage;
> drop the calculator message floor on Dentists ONLY and leave the nine siblings as a
> comparison group; retire NO route and fix the broken links instead. Separately, the owner
> ruled estate-wide (`6966c1f1`) that the studio credit STAYS, so phase 2 passes nothing
> for `showBuilderCredit` and inherits `true`.
>
> **Phase 1 close verification, superseded by phases 2-6, do not quote these as current
> state** (re-run after the last content change, not once):
> build 321/321 exit 0, page count unchanged from the pre-port baseline; tsc clean;
> tests 434/434; dependency closure OK across 19 sites; frontmatter parses on all 235
> content files; sweep against the production-SHA baseline = 283/283 URLs clean,
> **0 dead internal links (from 23), 0 link-floor breaches at 5,537 links exactly,
> 0 `data-cta` regressions at 808 exactly, 0 dashes**.
>
> **What phase 1 actually changed:** the token layer (navy `primary-*` ramp, D-W1 warning
> ladder, slate neutrals, radius chain, `components.json`, `layout-utils` reduced to a kit
> re-export), 44 locked-rule content breaches across 29 files, 21 dead links, the capture
> floor, and two inherited accessibility defects (the focus ring measured 1.90 on this
> site's navy ground; `.section-label` was gold-on-white at 3.76).
>
> **THE THREE THINGS THAT NEARLY SHIPPED during phase 1, each caught by a different check.
> Kept here because later phases touched the same surfaces:**
> 1. **The port made the hero CTA invisible.** Moving `btnPrimary` to navy put it on
>    sections whose own ground is the same `#001b3d`: measured 1.00. The white label read,
>    the button had no shape. Caught by the adversarial review, NOT by the build, the tests
>    or `tsc`. Dark-ground CTAs now use `btnGold` (6.23), which is also what the site
>    rendered pre-port. RULE for phase 2: measure a button against the SECTION ground, never
>    against its own label.
> 2. **A rewritten FAQ answer broke the production build** by putting a colon-space inside
>    an unquoted YAML scalar. `tsc`, `npm test` and the agent's own reported frontmatter
>    parse ALL passed it. Only a real `next build` caught it. A re-runnable parser check
>    over all 235 files now exists; use it after any frontmatter edit.
> 3. **Fixing dead links COST two pages a unique internal link each.** Both already linked
>    the calculator via their template, so the corrected body link collapsed into a
>    duplicate (trap T14). Build green, links resolving, site fine, floor down. ONLY the
>    link floor catches this. Restored with a genuinely relevant article each, never padding.
>
> **Corrections to this doc's own earlier claims, left visible rather than deleted:**
> the "6 dead links" figure was a SAMPLE (the crawler checks sampled link targets), the true
> census was **23**; a competing estimate of 21 was also wrong. The blog route does NOT set
> `dynamicParams=false` and redirects a wrong category rather than 404ing, so 20 of the 23
> were hard 404s and one was a wasted hop.
>
> **Two dead links deliberately LEFT, outside what the owner approved:**
> `src/app/about/page.tsx:66` points at a post that does not exist, and
> `src/app/contact/page.tsx:44` points at `/pricing`, a route planned and never built
> (`StickyCTA.tsx:93` still branches on it). Both need the owner's word.
>
> **NOT ASSERTED, do not repeat it as fact:** the resolved capture floor. The 40-char /
> 8-word override is gone, so it falls to the estate default, which is 20/4 with
> `NEXT_PUBLIC_MINIFORMS_MULTISTEP` on and 10/0 with it off. The Vercel API would not return
> that flag's production value. Read it off the deployed page at cutover.
>
> **AUDIT-TRAIL WARNING.** The phase 1 gap fix is NOT in a Dentists commit. A sibling
> agent's repo-wide `git add` swept 28 Dentists files into `f75438bf`
> ("feat(generalist): high-street mechanic wave 5"). Nothing was lost and the content is
> byte-identical to the verified build, but `git log -- Dentists/` will not show it. History
> was deliberately NOT rewritten, with four ports live in one tree. See
> `docs/_engines/PORT_FIELD_NOTES.md` section 8.
>
> **The conversion finding that outranks the design work.** `ResultGateModal` hardcoded a
> 40-character / 8-word message floor against an estate default of 20. Dentists recorded 23
> gate starts, **49 `form_error` events every one on the message field, and 0 submits**.
> Property overrides nothing and converts. **Nine sibling sites still carry this override
> and Property does not.** Dentists is now the test case; read it ~2026-09-25 against that
> baseline before touching the other nine.
>
> **The honest scoreboard for this port.** Head terms sit at average position 45 (5,106
> impressions, 8 clicks, 90d). At position 45 no redesign wins a click: that is an AUTHORITY
> problem and the owner has parked it deliberately. Judge this port on pages that already
> rank, e.g. `uda-value-explained` at position 6.6 with 6,833 impressions.
>
> ---
>
> ## Phase 0 record, kept for the baseline numbers
>
> **Where it stands.** Phase 0 baseline captured for the Property-standard design port.
> Production is `18b4f25f` (2026-09-09, READY) and `git diff 18b4f25f..HEAD -- Dentists/`
> is EMPTY, so nothing pending rides this cutover. This is the cleanest baseline of the
> four ports. Baseline build: **321/321 static pages, exit 0**, `BUILD_ID` newer than all
> source (trap T2 cleared).
>
> **Artefacts** (all under `docs/dentists/_port/`, plus `docs/dentists/DESIGN_DELTA.md`):
> `DISPOSITION_SLICE1-3.md` (993 lines), `FUNNEL_BASELINE.md` (332), `LIVE_DEFECTS.md`
> (372), `sweep_baseline.json`. The delta is the brand contract and is PROPOSED, not
> approved.
>
> **Link-floor baseline, from production SHA `18b4f25f`:** 283 URLs, 5,537 unique internal
> links, 808 `data-cta`, 1,186 dashes. Any decrease in the first two is a blocker.
> NOTE the filename: this site's floor lives in `sweep_baseline.json`, not
> `link_baseline.json`. Same `["links"]`/`["dashes"]` shape the playbook §5 crawl consumes.
>
> **The number that sets this port's priorities.** Dentists converts at **4.44 leads per
> 1,000 sessions against Property's 9.83** (2026-08-23 to 2026-09-11, post bot-gate only,
> 19 days). A 2.2x gap, far tighter than Solicitors' 8.5x. Top of funnel BEATS Property
> (form starts 6.44% vs 5.60%, calculator use 20.6% vs 13.3%). The leak is
> **start-to-complete, 6.9% against 17.9%**. 83% of sessions land on blog articles, which
> produced 24 of 30 form starts and **zero completions**; both completions came from
> `/contact` off 6 sessions. So the value in this port is the blog subsystem and the
> article template, NOT the homepage.
>
> **Locked pre-port analytics values** (playbook T22, has bitten two sites). Phase 2 must
> pass `ctaContactGoal="contact"` and `ctaMobilePlacement="header_mobile"`. Kit defaults
> `"form"` / `"mobile_menu"` would split this site's funnel history at the cutover.
>
> **What NOT to re-ask or re-derive.** Re-measured on disk 2026-09-11: 223 blog posts,
> 6 dental-guides, 6 resource topics, 2 locations, 13 calculators, 43 static `page.tsx`,
> **309 addressable routes (292 public)**, and **7 templates render 262 of them**. The
> pound sign is the LITERAL `£` in this site's source (no unicode-escape trap, unlike
> generalist) EXCEPT `src/data/*.json|csv`, where money is bare numbers formatted at render
> by `fmtGBP`, so a `£` grep is blind to the research layer. The blog category filter
> already keys on `slugifyCategory`; do not "fix" it. `brand.primary_color: "#2563eb"` in
> `niche.config.json` is never consumed for rendering, but blue IS hardcoded into the OG
> image routes, so share cards carry an accent that appears nowhere on the site.
>
> **Next:** owner gate (swatch, warning ladder, pricing policy, retirements), then Phase 1.
>
> **CORRECTION to this file, 2026-09-11.** The Onboarding section below says "Bing: 0 rows
> ingested for dentists". That is FALSE: `bing_query_data` holds **19,226 rows for dentists,
> 2026-06-03 to 2026-09-07**. Ingestion is live and current. The stale line is struck in
> place below rather than deleted.
>
> **AND A CORRECTION TO THE CORRECTION, same day, recorded because the wrong number was
> briefly reported to the owner as verified.** An earlier read of this claimed Bing sent
> 1,682 clicks against Google's 109 over 28 days, a ~15x split. **That was WRONG.** It came
> from `SUM(clicks)` over `bing_query_data`, which holds weekly SNAPSHOT buckets of
> per-query rows: 8,523 rows across only **4 distinct dates**, so the sum counts the same
> clicks roughly four times and is not a site total at all. This is the documented trap
> (memory `bing_query_stats_topn_trap`: only `GetRankAndTrafficStats` gives site totals) and
> the Bing-side twin of the standing "never SUM `gsc_query_data`" rule.
>
> **The true figures, pulled fresh from the APIs 2026-09-11:** 28 days, Google **131 clicks
> / 14,188 impressions** against Bing **109 clicks / 4,954 impressions**. 90 days: Google
> 320 against Bing 309. Google leads on clicks; Bing earns ~83% of them off a third of the
> impressions, so it is a strong second channel and must be in any before-and-after read,
> but it is NOT the dominant one and no decision should be taken as if it were.
> Evidence and per-route detail: `docs/dentists/_port/SEARCH_EVIDENCE.md`.

The single living state doc for the Dentists site (Dental Finance Partners). The
methodology lives in the shared engines (`docs/_engines/NETNEW_PROGRAM.md`,
`REWRITE_PROGRAM.md`, `ENGINE_MAP_AND_ONBOARDING.md`); this doc holds only the
site-specific WHAT and the heartbeat. Ground-truth facts live in
`docs/dentists/house_positions.md`, never here.

Last updated: 2026-07-19.

## 2026-08-25 — Port-branch merge: nothing pending for this site

`design/property-redesign-port` was merged to main on 2026-08-25 (Property Standard
rollout, decision §8.10). Passenger enumeration for this site: **48 commits** were on
the branch and not in `origin/main`.

**All 48 are already on production, so the merge ships nothing new here.** This site's
live production deployment is SHA `435cc12e`, deployed 2026-08-24 ~20:2x UTC
(Vercel API `GET /v9/projects` -> `targets.production.meta.gitCommitSha`, readyState
READY, read 2026-08-25; this is what the production alias actually points at, which a
`/v6/deployments` listing alone would not prove), and
`git log 435cc12e..design/property-redesign-port --oneline -- 'Dentists/'` returns 0.
Main was BEHIND production for this site, not ahead of it.

Reproduce the passenger list: `git log 902ea014..435cc12e --oneline -- 'Dentists/'`.
Everything on it (estate lead-parity port, pool-model disclosure sweep, FA 2026 factual
sweeps, the 2026-08-24 consent-wording revert) is live and was deployed before this merge.

## 2026-07-19 — Corepage B2 (DEPLOYED; heading corrected 2026-08-25)
- Homepage corepage rewrite committed (d3e705dd): head-token title/H1 + commercial schema. Dividend-rate fix on profit-extraction guide (88ee3a3d, 2026/27 rates 10.75/35.75).
- **CORRECTION 2026-08-25: this is LIVE, not "awaiting deploy word".** `d3e705dd` is an ancestor of the production SHA `435cc12e` (`git merge-base --is-ancestor d3e705dd 435cc12e` = 0) and it is also already in `origin/main`. It went live with the estate deploy of 2026-08-24 20:25 UTC. The rollout doc repeated this same "committed but NOT deployed" claim for Dentists and Solicitors and has been corrected too. Anyone reading this section for a before/after read should date the change from 2026-08-24, not 2026-07-19.
- Dental Pay & Tax Index P1 manifest committed (53eed5d8): `docs/dentists/research/P1_DATA_MANIFEST.md` — awaiting owner data-source sign-off.
- Log: `docs/_engines/logs/SESSION_2026-07-19_GROWTH_DAY1.md`.

## Site facts
- Brand: Dental Finance Partners · domain `www.dentalfinancepartners.co.uk`
- Vercel: project `prj_f3tGDR4zozATcYOSLMmCqO2ZInNV` (org `team_XF9WAygZX7SGk9Fo4tOAnihH`), project.json at `Dentists/web/.vercel/project.json`
- GA4: `G-273RJY0LZQ` · IndexNow key `0d90ff23794225ef49bd56fdaad369f1`
- GSC property: `sc-domain:dentalfinancepartners.co.uk` (canonical; see Onboarding below)
- Audience: UK dental practice owners and associate dentists
- Existing corpus: 150 blog posts (~12 categories), 6 dental-guides, `/for-{associates,principals,practice-buyers,locum-dentists}`, `/free-practice-health-check`, `/calculators`, `/locations/{london,manchester}`

## Onboarding status (engine-readiness) — 2026-06-03

**Done**
- GSC property canonicalised to `sc-domain:dentalfinancepartners.co.uk` (was a URL-prefix property; the old `dentistaccountants.co.uk` in the code map was dead). Fixed `sites.gsc_property_url` + `gsc_page_client._SITE_URL_MAP`. Re-ingested 90d: 1086 rows / 136 queries / 3342 impressions / 2 clicks.
- `sites/dentists.json` wave-runner config created + validated (all paths resolve; buildDir + Vercel project.json exist).
- Cannibalisation checker generalised: `scripts/wave_cannibalisation_check.py` (site-neutral entry) + `check-cannib.ps1` generic fallback. Already `--site`-driven.
- Link-resolution floor parameterised for `--site` and tested on dentists (baseline: 0 HARD 404s, 0 SOFT): `scripts/track2_link_audit.py`, `scripts/predeploy_gate.py`, `scripts/deploy-and-index.ps1` (pre-deploy gate now runs for any site, not property-only).
- All wave PS scripts confirmed `-Site` parameterised (`slice-megawave`, `scaffold-wave`, `dispatch-stage`, `prepare-wave`, `launch-wave`, `close-wave`, `rolling-orchestrator`, `megawave-autopilot`).

**Done (cont.)**
- `docs/dentists/house_positions.md` authored: 10 sections + 6 sub-sections, 18 primary sources, lock-dated 2026-06-03. Caught + corrected drift in the existing guides: dividend rises 8.75→10.75% / 33.75→35.75% (FA 2026 c.11 s.4, from 6 Apr 2026), VAT threshold £90k (corpus had £85k/£90k mix), goodwill 6.5% relief qualifying-IP + 6× cap (CTA 2009 Ch 15A). One `VERIFY` flag: §3 NHS clawback ~96% threshold (frame as "materially below target" until confirmed).

**In progress**
- Discovery engine: `scripts/topic_gap_finder.py` / `topic_gap_filter.py` generalised + `sites/dentists.discovery.json` (competitors SERP-derived; + architecture/tools + sitemap-lastmod harvest). Producing `docs/dentists/topic_gaps_first_cut.md`.

**Deferred / not on the net-new critical path**
- ~~Bing: 0 rows ingested for dentists. Needed for the rewrite ROI worklist later, not for net-new (which feeds off competitor crawls). Set up Bing Webmaster + ingest before running the rewrite engine here.~~ **STRUCK 2026-09-11: FALSE.** Ingestion is live and current: 19,226 rows, 2026-06-03 to 2026-09-07. Nothing needs setting up. Bing is a strong second channel (28d: 109 clicks against Google's 131), NOT the dominant one; an earlier claim of a 15x Bing lead was a summing error over weekly snapshot rows and is corrected in the PICKUP block at the top of this file.
- Formal `/run-netnew-wave <site> <wave>` conductor command: codify after the proving wave from real experience. Driving Wave 1 manually as conductor for now.
- `SITE_RULES[dentists]` (competitor/brief_for_opus.py) + `CORE_PAGES[dentists]` (corepage/config.py): add when first running the rewrite / core-page engines for dentists.

## Known content debt
- 181 lines across the legacy 150 posts contain em-dashes (U+2014). Non-blocking warning today; sweep before enabling `predeploy_gate.py --strict`. New wave pages enforce 0 em-dashes via the six-check floor.
- 3 legacy posts carry hourly-rate mentions (lead-gen sites carry no pricing) — review opportunistically.
- Blog category frontmatter has minor case/spacing variance ("Associate Tax" vs "Associate tax"); cosmetic only — `slugifyCategory` lowercases so routes still resolve (link audit clean).

## Signal read (why net-new first)
Dentists is indexed and earning impressions for its head family ("accountants for dentists" 658 impr, "dental accountants" 655 impr, "specialist dental accountants" 416 impr) but ranks at positions ~49-78 (page 4-7) with ~2 clicks in 90d. Own-site organic is too thin for the rewrite/core-page engines to bite yet; net-new (which derives its gap pool from competitor crawls + cannibal-checks against the 150 indexed posts) is the right lead engine to build the topical depth needed to climb. The captured head-keyword family also seeds the core-page engine later.

## Net-new program heartbeat
- Wave 1 (proving wave): 9 pages WRITTEN + VERIFIED 2026-06-03, awaiting user deploy approval. Build GREEN (208/208 static pages, the 9 new ones generated), repo-wide link floor 0 HARD 404, six-check floor passed (0 new em-dashes). Buckets: A practice-sale/exit (3), B incorporation post-FA-2026 (3), C extraction mechanics (3). HP extended at the gate (§4.A disposal-timing, §5.A s455, §5 employer-cost, §2.B carry-forward, §2.C principal hedge). Not yet committed or deployed.
- Pages live (net-new): 0 (9 pending deploy) [deployed 2026-06-04, see below; also carried by the 2026-09-16 estate release, 90fbea9c].
- Pipeline PROVEN end-to-end for dentists: GSC fix → discovery (440 pool) → picks + cannib GREEN → 3-bucket briefs → conductor HP-lock gate → 9 pages → six-check + link floor + green build. Ready to scale to full ~30-page waves after deploy.
- Wave 2 (15 pages, CLUSTER-BY-CLUSTER): VAT §6 (5), capital allowances §7 (5), NHS pension §2 (5). Written + verified (link floor 0 HARD 404, build green), parked uncommitted. Each cluster gated one HP area; gates extended/corrected house_positions: §6.A-C + Item 2A, §7 WDA 18→14% correction + §7.A-E, §2.C provider refinement + §2.D Scheme Pays + §2.E retirement. house_positions surfaced + fixed its own stale 18% WDA at the §7 gate.
- TOTAL net-new written (uncommitted, pending deploy) [deployed 2026-06-04, see below]: Wave 1 (9) + Wave 2 (15) = 24 dentist pages. Plus a parallel rewrite batch de-staling existing pages (FA-2026 rate-currency + legacy em-dashes, 181→139). Single committer (manager) at deploy.
- DEPLOYED 2026-06-04: committed (cf665616, 191 dentists files surgically staged — Dentists/ + docs/dentists + sites/dentists.* + briefs/dentists, NO other-site files) + vercel prod deploy via deploy-and-index.ps1 -Site dentists. LIVE at www.dentalfinancepartners.co.uk (build web-qrpjh13qx, gate passed); 54 new-page URLs submitted to IndexNow (HTTP 202). The rewrite agent's de-staled existing pages shipped in the same commit. ISR size fine at 204 pages (well under Property's 686). Future waves: deploy as-you-go or batch, user's call.
- SCALING (user directive): drive net-new toward WAVE 15 (multi-session). Model: one CONDUCTOR SUB-AGENT per wave that COMPOSES its picks from the prior wave's farm + cannib-checks GREEN, then runs cluster-by-cluster (self-gating + source-verifying against the mature house_positions). NOTE: spawned sub-agents have NO Agent tool (cannot nest) — the conductor does brief+page writing itself. Manager reviews each report compactly + relaunches the next wave.
- WAVE 3 COMPLETE (15 pages, verified): clusters locum/foundation (§1/§8), NHS contract/UDA (§3), practice finance (§5). 39 net-new total (W1 9 + W2 15 + W3 15), all uncommitted. Gate-locked §1.B (DFT £42,408 from 1 Apr 2025), §11 (SRT FA2013 Sch45), §3.A (UDA 96% clawback + 4% carry-forward), §5.B (finance-cost deductibility + CIR £2m). RESOLVED 2 hedges: §3 96% clawback, §2.C NPE=43.9% of TCV (NHSBSA KA-02063). >> MANAGER RE-VERIFY AT DEPLOY REVIEW: the 43.9% NPE figure (conductor resolved a deliberate hedge) + spot-check Wave-3 gate locks.
- Rewrite hit-list additions from W3: dental-foundation-training-pay-scales (£42,408), nhs-dental-contract-clawback-explained + managing-uda-shortfall (96%/4%), nhs-pension-pensionable-pay + incorporated-principal (43.9% NPE).
- WAVE 4 COMPLETE + VERIFIED (2026-06-04; recovered cleanly after a session-limit interrupt then a rate-limit interrupt — the conductors finished the work before each error, only the tracker rows were left stale). Clusters: ownership transitions/financing (locks §12, §12.A), mobility/residence (locks §11.A temp-non-residence, §11.B FIG-from-6-Apr-2025, §11.C DTT tie-breaker), staff/systems (locks §13 payroll/auto-enrolment, §13.A trivial benefits). Link floor 0 HARD 404, build exit 0.
- CONFIRMED net-new on disk (verified, uncommitted): W1 (9) + W2 (15) + W3 (15) + W4 (15) = 54 pages.
- >> RESUME at WAVE 5: one self-composing conductor seeded by the W4 farm (the wave4 tracker discovery log + prior reports), cannib GREEN, cluster-by-cluster, holding deploys.
- RATE-LIMIT NOTE: server-side throttling appears under heavy CONCURRENCY (multiple long conductors + the rewrite + solicitors + medical agents at once). Mitigate: run fewer simultaneous long-runners / space waves out. Recovery-from-interrupt is proven (assess on-disk state via globs + predeploy_gate + build, then complete the remainder).
- DEPLOY-REVIEW re-verify list (conductor self-gated locks): W3 43.9% NPE; W4 §11.A-C, §13, §13.A.
- Wave 1 surfaced a rewrite-engine backlog (FA-2026 rate-currency staleness: BADR 10% pages, sole-trader-vs-ltd "saves £5k", pre-FA-2026 dividend pages) — see wave1_page_tracker flags F-1..F-4.

- SERP META BATCH 1 (2026-06-12): 35 pages re-titled/re-described from fresh 90d GSC + Bing query data, deployed + IndexNow'd; 90-day regression watch in monitored_pages (to 2026-09-10); engine + methodology in docs/_engines/SERP_META_PROGRAM.md; content-gap follow-ups in docs/dentists/opportunity_register_meta_2026-06-12.md.
- SERP META BATCH 2 (2026-07-08): 10 pages, Opus copy + Sonnet adversarial QA, DEPLOYED + IndexNow'd; monitored to 2026-10-06. how-to-value-a-uk-dental-practice-2026 re-angled to worth-intent to avoid title/query collision with dental-practice-valuation-methods-uk (the stronger page for 'dental practice valuation uk'). Estate readouts: docs/_engines/meta_batch1_verdicts_2026-07.md + OPPORTUNITY_READOUT_2026-07.md. Batch-1 26d pre-read: imp 186->658, clicks 2->4 (uda-value page = cleanest CTR win). Dominant untouched fact: homepage holds 4,825 imp / 1 click and head terms (accountants for dentists 1,081 imp) rank pos 44-70 = AUTHORITY/core-page problem, not meta.

## Wave 5 (gap-discovery batch) — WRITTEN + QA CLEAN 2026-07-09 [deployed 2026-09-16, 90fbea9c]

- Source: gap discovery 2026-07 curated batch (6 pending topics; A5 tax-planning hub STRUCK at page-level collision verify as duplicate of the two existing hub pages, rejected in blog_topics).
- 5 pages written (single lane, batchSize 1, one Sonnet writer per pick in parallel worktrees): dental-practice-succession-planning-family-transfer, wealth-management-for-dentists-uk, dental-hygienist-dcp-tax-employment-status, buying-car-through-limited-company-dentist, vat-loan-dental-practices-uk.
- HP locks added at Stage 1b (isolated commits): SS1.C DCP status, SS4.B BPR GBP2.5m allowance (FA 2026 Sch 12 s.124D verified at legislation.gov.uk; announcement-era GBP1m figure is WRONG), SS4.C s.165 holdover, SS6.D VAT late-payment+TTP, SS8.A NIC 2026/27 (SPT 7,105), SS14 company car, SS15 wealth wrappers + CIHC s.18N.
- QA: independent per-page agents (arithmetic re-derivation + statute WebFetch) caught 2 HIGH on A3 (expense transcription + leaked draft reasoning) and 1 arithmetic parenthetical on A2 - all fixed manager-direct, verdicts recorded 5/5 all_clear (qa_verdict wave5), pending list clear, predeploy gate PASS.
- Tone/GEO review vs 3 live baselines: 3 PASS as-is, A2 opener + A6 audience line polished. No cross-page templating drift.
- Back-patches: 3 stale-45p AMAP pages corrected (55p from 6 Apr 2026); 13 back-link insertions across 12 existing pages; F-147 GBP85k flag was a false positive.
- Link floor 0 HARD 404 / 0 SOFT; ONE green build x2 (post-merge, post-QA-fix). monitored_pages registered (net_new, monitor_until 2026-10-07). blog_topics rows flipped to written/used.
- >> DEPLOYED 2026-09-16 (90fbea9c). NEXT: IndexNow the 5 URLs.

## Blog audit + rewrite program (2026-06-12)

- Provenance: 95 deepseek / 55 claude / 54 opus-wave (204 posts total).
- Blind quality audit: untouched deepseek failed 2/2 (both AIA pages: stale 18% WDA citing the old rate, not the FA 2026 14% WDA); de-staled deepseek passed 3/3 (the 2026-06-03 de-stale held); claude passed 2/3 (dental-group-structure has an SSE-applies-to-dividends error plus no sources, queued for rewrite).
- Rewrite worklist: `docs/dentists/rewrite_worklist_2026-06-12.md`. Tier A+B = 6 pages (wave DEN-R1) but all 6 are in SERP meta cooldown until 2026-06-26, so wave DEN-R1 starts after that date. Tier C = 88 zero-traction deepseek pages, deferred to a prune/consolidate decision (lean-prune posture per Opus adjudication).
- Known debt: HP LEL figure 6,708 is stale (verified correct = 6,500 for 2025/26); 2 pages carry stale 13.8%/9,100 employer NIC (sweep queued estate-wide).
- generator: frontmatter field now stamped on all posts and written by all pipelines going forward (see docs/_engines/ENGINE_MAP_AND_ONBOARDING.md section 5).
- Methodology: docs/deepseek_quality_audit_2026-06-12.md + docs/provenance_summary_2026-06-12.md + docs/_engines/rewrite_gold_patterns.md.

## Claims audit remediation, SERIOUS TIER (2026-09-12)

Owner approved the serious tier on 2026-09-12. Fixed local-first, DEPLOYED 2026-09-16 (90fbea9c). Verified from `Dentists/web`: `npx tsc --noEmit` clean, `npx vitest run` 495/495 pass, 0 em-dashes introduced. ~95 files changed, all under `Dentists/`.

**Positioning ruling applied throughout.** Replacement language was taken from the site's own live pages, not invented: terms page s.2 ("does not constitute accounting, tax, financial, or legal advice... No accountant-client relationship is created"), `privacy-policy:113` ("regulated firms in our specialist partner network"), `contact:80` ("your enquiry goes to our specialist partner network rather than to a single in-house team") and `niche.config.json` `partner.name`. The site is a content and lead-gen site that introduces dentists to regulated firms; it is not a practice.

### Batch 1: fabricated evidence (DONE)
- `content/blog/accountants-for-dentists.md` carried two INVENTED client testimonials presented as real ("Having an accountant who understands the dental world has made a huge difference to my financial confidence"; "The advice on practice purchase was invaluable..."). DMCCA exposure in its own right. DELETED, not replaced with other invented quotes. The `<h2>Client Testimonials</h2>` section now points at the site's own published research, the pattern Property and this site's homepage already use (the P8 band at `src/app/page.tsx:224/639`). No anonymised case study was invented either: we have no client outcomes to summarise.
- Swept the 5 sibling "we are accountants" landing pages. NO further fabricated testimonials anywhere in the corpus. Two quote-looking passages in `accountant-for-dentists.md` and `dentist-accountants-near-me.md` are genuine quotes FROM the cited source with intact citation markers, and were left.

### Batch 2: claims to qualifications and regulated capability (DONE)
- **Schema sweep, mechanical, by rule.** 48 content files (NOT 96 files as briefed: 96 OCCURRENCES across 48 files). Removed `"jobTitle":"Specialist dental accountant"` x96; moved "Reviewed against legislation.gov.uk and HMRC guidance" from `jobTitle` to `description` x96 (94 single-line, plus 2 that YAML had folded across lines and a literal grep missed); `"@type":"AccountingService"` to `"Organization"` x97. Shape matches Property (`Property/web/src/lib/schema.ts`: Organization publisher, author Person with no jobTitle) and this site's own fallback `buildBlogPostingJsonLd`. All 48 re-parsed as valid JSON inside valid YAML.
- **Prose sweep by rule**, the ~45 named call sites plus ~60 more the named list did not reach: `for-principals` (the "we audit ... we file amendments" line), `locations/[slug]` (both city blocks, indexed), `about` ("accounting practice", "partner-led"), `for-associates` ("we represent you if HMRC opens an enquiry"), `for-practice-buyers`, `services/page.tsx`, `services/[slug]/data.ts` (22 passages), `for-locum-dentists`, homepage (21 passages including the two FAQ answers that feed JSON-LD), plus components and libs. 21 content files also fixed. Rule applied: no sentence may state or imply we employ accountants, are a practice, audit, file, or represent clients at HMRC. "Contact our team" and the introduction proposition were preserved.
- `content/dental-guides/goodwill-valuation-and-sale-playbook.md`: "Our pre-sale planning engagement typically starts 18-24 months before target exit" reframed to the timing advice without the claimed engagement. The 18-24 month framing is house-locked (HP section 4) and was kept.
- **Structured-data follow-through:** rewriting FAQ prose stranded contradicting copies inside the `schema:` JSON-LD string. Re-synced `accountants-for-dentists.md` (FAQPage mainEntity, Article headline and description, breadcrumb, Service name) from its frontmatter. Verified corpus-wide afterwards: 48 schema blocks valid, 0 FAQ mismatches, 0 claim phrases left in any JSON-LD.
- `src/lib/schema/service.ts` and `src/lib/schema/web-application.ts` emitted an `AccountingService` PROVIDER node on service and calculator pages. Same defect as the content sweep, corrected to `Organization`.

### Batch 3: figures that give a reader a wrong answer (DONE)
- **`nhs-uda-rates-2026-27-practice-finances.md` had a FALSE PREMISE.** Built end to end on "the standard NHS UDA rate for 2026/27 is £25.20", in title, metaTitle, metaDescription, h1, summary, JSON-LD and FAQs. HP section 3 is explicit: there is no national UDA value, do NOT quote one. £25.20 is invented. Rewritten around the truth (2006 baseline = test-year fees divided by contracted UDAs, uplifted annually; England range roughly £15 to £45+, clustering £25 to £35, per HP section 3) plus how a dentist finds their own value. Removed with it: £12.60 at a 50% split, £201,600, £75.60, £50,400, and a clawback illustration that contradicted the 96% line. Slug and canonical unchanged. Now links `/calculators/uda-value`, which already carried the correct position.
- **`nhs-superannuation-contribution-dental-associate-tax.md` overstated an associate's pension contribution by about 2.7x.** It applied a FLAT 9.8% to £72,000 GROSS fees to reach £7,056. Two compounding errors: practitioner rates are TIERED, and gross fees are not pensionable pay. Prose now matches the compute module and HP section 2.F (six tiers 5.2/6.5/8.3/9.8/10.7/12.5%, thresholds £13,259/£28,854/£35,155/£52,778/£67,668, in force 1 Apr 2026, England and Wales, actual pay not WTE, rate applied to the whole of pensionable pay rather than a slice). Employer rate corrected from 20.9% to 23.7% (23.78% with the levy). The pre-October-2022 tier structure ("5.2% to 14.5%", "above £93,532") and the invented 7.7%/8.8% bands are gone. **CARE TAKEN on 43.9%:** it is now stated as the contract-level NPE ceiling covering all dentists on a GDS/PDS contract, allocated via the ARR (HP section 2.C), NOT as "43.9% of your gross is pensionable". Both worked examples relabelled so every input is an explicit assumption.
- **Class 2 NIC, abolished but still published.** `resources/associate.md` self-contradicted in consecutive sentences; `resources/principal.md` carried "Class 2 around £179". Fixed to HP sections 8 and 8.A (removed 6 Apr 2024; SPT £7,105 for 2026/27; voluntary £3.65 a week below it). Found and fixed TWO MORE the brief did not list: `resources/associate-incorporation.md` (3 places) and `blog/associate-dentist-tax-calculator-uk.md`, the latter also carrying a stale 9% Class 4 rate (now 6%). No abolished Class 2 charge remains anywhere on the site.
- **`resources/principal.md` had a second, unrelated arithmetic error** not in the brief: sole-trader income tax at £120,000 profit was stated as £35,432, which is what you get by ignoring the personal allowance taper the same page describes four paragraphs earlier. Correct is £39,432 (PA tapers to £2,570, taxable £117,430), and net £76,911 rather than £80,732. Re-derived and verified independently.
- **Cookie policy contradicted its own table and the code.** `cookie-policy:68` said "We do not set any cookies on the public pages" 16 lines above a table of the `_ga` cookies it sets, and `layout.tsx:96` mounts `ConsentedScripts` with the GA4 id for every non-opted-out visitor. Traced the real flow (ConsentProvider to AnalyticsProvider posture="opt-out" to ConsentedScripts to GoogleAnalytics; the first-party SDK uses localStorage not cookies; the admin sign-in cookie is real) and rewrote the prose to match. Also corrected an overstatement that opting out "immediately stops all analytics" (the gtag script already injected into the current page is not unloaded) and noted that existing GA cookies persist until they expire or are deleted. **No banner, modal or new disclosure added**, per the standing opt-out rule.
- **Time-expired advice, live today.** `health-check/rules.ts` and `support/faq.ts` told readers "if a sale can complete before 6 April 2026, the lower 14% rate applies", five months after that date passed. Rewritten as current state: BADR is 18% from 6 Apr 2026, £1m lifetime limit, and the planning value now sits in the qualifying conditions (HP section 4). Found and fixed a SECOND expired countdown in the same file that the brief did not list: `mtd-itsa-2026` ("MTD ITSA hits you from April 2026", now "applies to you now", HP section 9). `mtd-itsa-2027` is genuinely future-dated and was left.
- **R&D page carried repealed figures.** "deduct 230%" and "cash credit of 14.5%" replaced after primary-source verification at gov.uk: merged scheme for accounting periods beginning on or after 1 Apr 2024 (20% expenditure credit, itself taxable), ERIS (extra 86%, 186% total, up to 14.5% of the surrenderable loss, gated on the 30% intensity condition). The worked example double-counted twice over (£20,000 x 230% already includes the base 100% deduction, then 25% was applied to the whole enhanced figure) and was replaced with £20,000 x 20% = £4,000, net £3,000 after CT on the credit. **Two further errors the brief did not flag:** a £50,000 CBCT scanner example claiming £10,000 of relief (capital expenditure does not qualify at all, CIRD83000, deleted), and a £150,000 principal contributing £15,000 of staffing cost (assumes the whole sum is payrolled; an owner-director on small salary plus dividends has little to bring into a claim). Premise tightened: most dental practice activity does not qualify.
- **Two test-guarded removals were over-cautious and were restored with sources.** The BADR FAQ agent deleted the 24% standard CGT rate as unverifiable and dropped the s.28 unconditional-exchange rule; both are house-locked (24% non-residential higher rate at HP section 15 wrappers, s.28 at HP section 4.A). Restored as current-state law rather than as a countdown, and `assistant-journey-opener.test.ts` passes again.

### Left deliberately, needs an owner decision
- **`Dentists/niche.config.json` dormant `packages` CTA variant.** Still present. Deletion was attempted on 2026-09-12 and BLOCKED by the shared config validator; two of the premises were also wrong. See the dated entry below. Still needs an owner/estate decision.
- **Page titles, H1s and meta descriptions still assert the firm identity**: homepage title "Dental Accountants | Accountants for Dentists UK", location H1 "Specialist dental accountants in {city}", the `/services` H1, the audience H1s, and most metaDescriptions opening "Specialist accountants for...". Under a strict reading of the rule these imply what the body copy no longer does. This is the site's entire SEO surface, so it is a ranking decision rather than a copy edit. NOT changed.
- **`packages/web-shared/schema/local-business.ts` hardcodes `"@type":"AccountingService"`** in `buildAccountingService`, which the homepage and both city pages call, so the page-level structured data still declares the site an accounting service. SHARED ACROSS SITES, so out of scope for a Dentists-only pass. Needs an estate-level decision.
- ~~**`compute/superannuation-contributions.ts` defaults an associate's NPE to gross fees x 43.9%.**~~ **RESOLVED 2026-09-12**, see the dated entry below.

### Out of scope, logged for the later pass
- ~40 unsourced benchmark numbers (EBITDA multiples, goodwill share, lock-up, margins). Confirmed still present, for example `understanding-dental-practice-ebitda-normalisation.md:163` and `exit-planning-3-5-years-out-uk-dental-practice.md:29` ("what we see working for principals who sell well").
- ~22 other stale statutory figures: NHS tier thresholds in the four other prose pages, annual allowance £40,000, patient charge bands, DFT pay, Plan 2 threshold.
- Arithmetic errors in `dental-tax-deductions.ts` and `uda-value.ts`.
- The "free scoping call" / "30-minute scoping call" framing survives in both dental guides and several audience pages.
- `maternity-paternity-leave-associate-dentists-uk.md:49` conditions Maternity Allowance on having "paid Class 2 NI for at least 13 of the 66 weeks". Post-abolition this needs a benefits-rules check rather than a guess, so it was not touched.
- `resources/associate.md` is labelled `version: "2025/26"` and `lastReviewed: "July 2025"` but now necessarily carries 2026/27 NIC figures. The figures are date-tagged so nothing is false, but the page label is a year behind its content.
- `nhs-uda-rates-2026-27-practice-finances.md` still holds the invented £25.20 in its archival `metaDescription_prev` field. Nothing in `src/` reads the `*_prev` fields, so it is not rendered or indexed; kept as the provenance record of what the meta used to be.
- Expired-countdown copy was only swept within `health-check` and `support`. Three of the four found were in one file, so a site-wide sweep for date-countdown copy is worth its own pass.

## 2026-09-12 - two escalated claims items

**Superannuation calculator no longer derives pensionable pay from gross fees. FIXED.**
The tool defaulted an associate's net pensionable earnings to gross NHS fee income x 43.9% and explained 43.9% as a deemed-expenses deduction. HP section 2.C says the opposite: 43.9% of Total Contract Value is the ceiling on declared NPE for a single GDS/PDS contract covering every dentist on it combined, allocated by the provider via the Annual Reconciliation Report, and "a dentist cannot claim a colleague's pensionable income". HP gives no per-dentist derivation from gross, so none was invented. Changes: `ASSOCIATE_DEFAULT_PENSIONABLE_PCT` deleted from `compute/superannuation-contributions.ts` (nothing else imported it; the tier table, rates and all exported maths are untouched and still HP section 2.F); the config's five fields collapsed to two, a required "Net pensionable earnings" currency input defaulting to 0 (the existing `<= 0` branch already shows a prompt rather than a number) plus the higher-rate toggle, with field help pointing the reader at the annual certificate of pensionable profits or their ARR allocation. Explainer paragraphs 1 and 2, worked example 1, the "why only 43.9%" FAQ and the Wales FAQ rewritten so the 43.9% ceiling is described as a contract-level pool and explicitly not a rate on one dentist's gross. Tool and blog prose now agree with each other and with HP. No other calculator on the site applied the shortcut (`nhs-pension-aa-taper` does not; `associate-take-home` and `associate-incorporation` use `grossFees` for fee-split maths, not pensionable pay). `for-principals/page.tsx:19` already states 43.9% correctly as the NPE ceiling on contract value and was left alone.
Test guard NOT weakened: `superannuation-contributions.test.ts` kept every numeric assertion including the 52680 case. Only the test's title changed, from "associate, £120,000 gross fees at 43.9% pensionable" to "associate, £52,680 net pensionable earnings", because the title asserted the framing that was wrong. Suite green at 495, tsc clean.

**Dormant `packages` CTA block NOT deleted. Blocked by the shared validator, and two premises were wrong.**
The shared config validator at `packages/web-shared/lib/niche-config.ts:249-283` loops `for (const model of ["packages", "leadgen"])` whenever `cta.variants` exists and throws on any missing key, so deleting the `packages` block alone breaks config load for this site. Deleting the whole `variants` block instead is worse: `getActiveCta` throws for a site with no variants, and `page.tsx`, `StickyCTA.tsx` and `contact/page.tsx` all read it. Either route needs the shared file changed, which is a manager carve-out, so nothing was touched. Two corrections to the escalation as written: (1) `/pricing` is not a 404, `Dentists/web/next.config.ts:24` 301-redirects `/pricing` to `/services`, so flipping the variant would send the header, hero and sticky CTAs to the services page rather than to nothing, which is arguably worse because it looks deliberate; (2) all six sites carrying `cta.variants` (Dentists, Medical, Property, Solicitors, construction-cis, generalist) sit at `variant: "leadgen"` with a full dormant `packages` block, so this is an estate-wide shape, not a Dentists artefact. The live harm is one string away and the config offers no guard against it.
