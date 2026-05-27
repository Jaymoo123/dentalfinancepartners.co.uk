# Property Net-New Program — Manager Handover Doc

**Owner:** Jeff (jeff@emplifex.com) + rolling Claude Opus 4.7 manager sessions.

**Status as of 2026-05-22:** Wave 1 complete (31 pages on `main`, not deployed). Wave 2 in planning.

**Purpose:** Single source of truth for the rolling multi-session program writing net-new Property pages and (later) rebuilding ~231 DeepSeek-era legacy pages. Any fresh manager agent reads this doc first and is competent from the next message.

---

## 0. Read first if you are a fresh manager session

You are taking over the orchestrator role for an ongoing program. Do this before responding to the user:

1. **Read this entire doc** (~15-20 min). It is the durable context. Do not skim.
2. Read `docs/network_state_and_handover_2026-05-21.md` for one-time broader-network context (other niche sites, history pre-this-program).
3. Run these four commands to see current state:
   ```
   git log --oneline -20
   git status --short
   ls docs/property/wave*_page_tracker.md 2>/dev/null
   ls docs/property/track1_page_tracker.md 2>/dev/null
   ```
4. If an active wave is running, read its tracker + flags + Q&A files.
5. Acknowledge the user with one short message: *"Picked up. Current state: [wave N, X of Y pages done, M flags open, K open questions]. Ready for next instruction."* — nothing longer.

**Critical norms before you do anything:**

- **You are the glue.** Sessions are siloed; you are the only one with the cross-session view. Treat that responsibility seriously.
- **`git status` on main is the primary signal of session activity mid-wave.** Sessions write tracker / flags / Q&A / discovery via absolute paths to main per §16.15 + §16.37. Mid-wave, main's working tree is INTENDED to be dirty with these uncommitted edits — **dirty working tree means active sessions, not a problem**. The tracker is the load-bearing diagnostic; Q&A files are sparse and only populate on blockers. If you need to check whether sessions are running, look at `git status` first. See §16.41 for the diagnostic discipline.
- **Self-awareness about your own context.** Output quality degrades as your context fills. When it does, **say so, write a handover update to this doc, then stop.** See §14.
- **Never deploy anything without explicit user instruction.** User has historically held deploys pending cleanup batches; check the current state before any deploy step.
- **Track what's needed, not everything.** See §15 on tracking discipline. Use TaskCreate sparingly. Compact summaries over verbose narration.
- **Never edit a session's branch without authorisation.** Manager fix-up commits on a session branch require: (a) a flag from that session OR (b) a clear user authorisation. Always preserve the session's authorship trail.
- **Verify factual claims before acting on them.** Sessions catch each other's errors; the manager catches errors that slip past sessions. If a session reports a statute, verify via WebFetch to legislation.gov.uk before applying the fix.

---

## 1. The goal

Build out Property Tax Partners (`propertytaxpartners.co.uk`) into the comprehensive #1 UK property-accounting resource.

Two pools of work:

| Pool | Count | Source | Status |
|---|---|---|---|
| **Net-new pages** | ~285 (user-narrowed target from 429 candidates) | `docs/property/topic_gaps_final.md` | 31 done (Wave 1), ~254 remain |
| **Legacy rebuilds** | ~231 (DeepSeek-era pages on `main`) | `Property/web/content/blog/*.md` | Not started; uses GSC + GA4 + competitor HTML enriched briefs |

Total program: ~485 pages over rolling waves. Net-new first; legacy after.

**Strategic constraints:**
- Zero cannibalisation.
- High quality (six-check verification per page; matches or beats specialist competitors).
- No regression to existing rankings (`monitored_pages` table tracks each new/rewritten page for 90 days with a regression detector).
- Anonymised social proof only (no real client names; no specific NHS Trust / agency / tenant dispute names).
- Lead-gen handoff to partner firm (no pricing on-page, no client names; LeadForm auto-injected at footer).

---

## 2. Network context

Property sits inside a six-site niche network plus one scaffolded:

| Site key | Brand | Domain | Posts | Position in network |
|---|---|---|---|---|
| `property` | Property Tax Partners | propertytaxpartners.co.uk | 316 (31 new from Wave 1) | **This program's focus.** Strongest GSC signal, biggest content pool. |
| `dentists` | Dental Finance Partners | dentalfinancepartners.co.uk | ~150 | Quality-lifted to Opus 4.7 May 20. Not in this program. |
| `medical` | Medical Accountants UK | medicalaccounts.co.uk | 46 | Too new (4 of 46 pages with GSC data). Scaffolded for full rewrite (3 worktrees + 46 briefs at `briefs/medical/`) but **PARKED** by user decision. |
| `solicitors` | Accounts For Lawyers | accountsforlawyers.co.uk | ~150 | Quality-lifted to Opus 4.7. Not in this program. |
| `agency` | Agency Founder Finance | agencyfounderfinance.co.uk | small | Thin; not in this program. |
| `generalist` | Holloway Davies | hollowaydavies.co.uk | 322 | Different brand; seed-only GSC. Not in this program. |
| `contractors-ir35` | (scaffolded, not launched) | (TBC) | 0 | High-CPC niche scaffolded May 20; awaiting domain/Vercel/GA4 setup. Not in this program. |

All sites are lead-gen handoffs to a partner firm. Don't conflate with the Property program scope.

**Why Property and only Property right now:** GSC signal is strongest, competitive set is biggest, and the topic-gap analysis (`docs/property/topic_gaps_final.md`) is already done. Network-wide rebuilds come later.

---

## 3. Where we are right now (this section updates every wave)

**Last updated:** 2026-05-27 (late evening) — **MegaWave 3 Stage 2 CLOSED; Stage 2b + RUN pending tomorrow.** Topic family: Compliance / operations / specialist family (HP touchpoints §17, §18, §19, §20, §27, §28 + new §27.10 + §31.B + §36 + §37). Stage 1 (60 seed briefs) closed ~20:40. Stage 1b sign-off committed at `53b3eba` with 5 new HP-locks + 2 critical drift catches verified (F-1 CT Sch 18 figures + F-3 SI 2021/1076 → SI 2026/336 revocation). Stage 2 (60 brief extensions) closed ~23:46 with all 12 batch markers + 3 lane-done flags. Wallclock Stage 2: ~2h6.

**`main` HEAD: `5a34d5c`** post-Stage-2 last commit. Stage 2b sign-off + RUN dispatch NOT YET done.

**Pending for tomorrow's manager session:**
1. **Stage 2b review** — read F-104 (SI title mis-citation, Bucket C) + F-105 (LURA 2023 section mis-citation, second-home council-tax premium, Bucket C) raised during Stage 2. Any earlier Stage-1b unresolved (F-1 + F-3 back-patch sweeps were scoped but only the single F-3 hit on `essential-bookkeeping-tips-for-sole-traders.md` was actioned; F-1 was clean — no pre-existing pages had stale CT figures). Decide on §27.10/§31.B/§36/§37 if additional refinement needed.
2. **Stage 2b sign-off** — write `briefs/property/megawave3/_signals/stage2b_signed_off.flag` (file already exists for Stage 1b at `stage1b_signed_off.flag`; same convention).
3. **RUN dispatch** — same pattern as MW2 RUN: reset queues to pending, archive Stage 2 lane-done flags + batch markers to `_stage2_done.json` / `.stage2.flag`, then `./scripts/rolling-orchestrator.ps1 -Wave 3 -Phase run -Lane {a,b,c}`. RUN uses `cwd=worktree` per drift-bug fix (sub-agents commit page files to worktree branches). Expect manager-merge per batch.
4. **Close + deploy gate.** All MW2 (60) + MW3 (60) pages remain held for deploy per user's "batch deploys" preference; expect a 120+ page consolidated push to production at some point post-RUN-close.

**MW3 issues handled today:**
- Worktree-drift on Lane A + C at Stage 1 (each batch needed manager-merge — 4× per drifted lane).
- Lane A tracker desync at A-B3 (sub-agent committed but didn't update tracker — manager flipped A13-A18 rows).
- Premature tracker flip on A19+A20 by manager (my error) → orchestrator wrote false lane_A_done.flag → rolled back, relaunched orchestrator A.
- 3× `_stage2_done.json` marker-filename drift at Stage 2 (A-B1 + A-B2 + B-B1) — renamed each time.
- F-1 verified via legislation.gov.uk (£200/£400 + £1,000/£2,000 CT Sch 18 para 17). HP §19.20 locked.
- F-3 verified via legislation.gov.uk (SI 2021/1076 revoked 1.4.2026 → SI 2026/336). HP §19.18 locked + §19.19 added on points-reset dual-condition. Single pre-existing page back-patched (`essential-bookkeeping-tips-for-sole-traders.md`).

**HP-locks added during MW3 Stage 1b (commit `53b3eba`):**
- §19.18 SI 2021/1076 → SI 2026/336 migration (F-3)
- §19.19 Points-based late submission regime dual-condition reset (F-3 secondary)
- §19.20 CT Sch 18 para 17 verified figures (F-1)
- §27.10 Disguised remuneration loan charge + settlement framework (F-2)
- §31.B Commonhold White Paper 2025 + forthcoming Bill — live pipeline floor (F-103)
- §36 Professional conduct of property accountants (F-100): POCA + MLR 2017 + Fraud Act
- §37 Share-exchange + reconstruction reliefs + transactions-in-securities anti-avoidance (F-101)

**HP-extension candidates still open from Stage 2 (for Stage 2b tomorrow):**
- F-104 (BRIEF_DRIFT: SI title mis-citation, Bucket C, Sub-Agent M3-C-B1 Stage 2)
- F-105 (BRIEF_DRIFT: LURA 2023 section mis-citation, second-home council-tax premium, Bucket C, Sub-Agent M3-C-B1 Stage 2)

**Worktrees:** `Accounting-wt-property-megawave3-{a,b,c}` alive at main HEAD or near. Lane B worktree branch is 2 commits ahead (residual stage1 drift, non-blocking; will be reset/archived at RUN dispatch).

**Network state — Property net-new program at MW3 close-pre-RUN:**
- 360 net-new pages on main from W1-W9 + MW1 + MW2 (pre-MW3).
- MW3 will add 60 more once RUN completes → 420 net-new total on main.
- 300 currently deployed in production (W1-W3 + W4-W9 + MW1, deployed 2026-05-26). Held for deploy: MW2 (60) + MW3 (60) = 120 pages once RUN closes.

---

**Last updated:** 2026-05-27 (afternoon) — **MegaWave 2 CLOSED via rolling architecture.** 60 new pages on main across 3 lanes (Bucket A 20 + Bucket B 20 + Bucket C 20). Topic family: Entity / incorporation / partnerships+LLPs / FICs / Companies House reforms + ECCTA + RoE / IHT + estate planning / trusts + beneficial ownership / joint ownership + Form 17 / payroll + bookkeeping. Build verification PASS on main: `Compiled successfully in 3.6s`; **672 routes prerendered** (was 577 at MW1-close → +60 MW2 blog pages + a handful of category route refreshes). **`main` is at `1ab5607`** post-MW2 close pre close-artifact commit.

**Stage timeline:**
- Stage 1 (60 seed briefs) + Stage 1b (11 HP-lock extensions §11.B / §11.C / §11.C.X / §11.C.Y / §11.C.Z / §21.8 / §22.21 / §29.12 / §33 / §34 / §35) closed 2026-05-27 ~11:53 BST.
- Stage 2 (60 brief extensions) closed ~13:57 BST. Wallclock ~1h54.
- Stage 2b sign-off ~14:18 BST (F-102 §15.4 BPR/APR cap quantum LOCKED at £2.5m per IHTA 1984 s.124D enacted by FA 2026 Sch 12 para 4 — TWELFTH consecutive Bill-vs-enacted-Act drift caught in the program; GOV.UK announcement-stage summary still cites stale £1m). D-20 §21.X unified entity-exit HP-lock candidate DEFERRED to MW3+ (sub-agent's own assessment was "no new lock needed").
- RUN (60 final blog pages) closed ~16:13 BST. Wallclock ~1h55.

**HP-lock + drift catch summary across MW2:**
- 11 new HP-locks added at Stage 1b sign-off (covering ECCTA Part 2 LP reforms + partnership statutory architecture + salaried-member regime + mixed-membership rules + LLP accounts/SORP/designated-member + multi-company group operation + RoE trust-disclosure 2025 + VAT artificial separation + CIS property-context + landlord allowable-expenses + home-office CGT-trap + payroll-for-property-businesses framework).
- 1 HP-lock corrected at Stage 2b (§15.4 quantum £1m → £2.5m per F-102).
- F-7 / F-8 / F-9 / F-10 / F-11 Stage 2 brief-drift catches all operationalised cleanly into RUN authoring (CTA 2010 ss.464C/D omission held; s.131 vs s.152 three-section composite; HMRC PM250000+/PM210000+/PM213000+ correct anchors; ITTOIA 2005 s.396B vs ITA 2007 s.396B phoenix-TAAR cite-correctness with defensive callouts in A20).

**Rolling-architecture drift bugs encountered (memory entries created/updated):**
- `_stage2_done.json` marker-infix drift on lane B M2-B-B1 (Stage 2) — one-line rename fix.
- YAML `.flag` instead of canonical JSON marker on lane C M2-C-B1 (RUN) — manager synthesised canonical JSON.
- Empty-commit marker (commit message only, no file) on lane B M2-B-B2 + M2-B-B3 (RUN) — manager synthesised canonical JSON twice.
- Worktree-branch drift (cwd=worktree at RUN by design causing page commits + markers to land on worktree branch not main) — 10× manual `git merge --no-ff property-megawave2-<lane>` workaround per `rolling_arch_drift_bug.md`.

**Held for deploy, not yet pushed to production.** All 60 MW2 pages on main are pending user deploy decision. Per §0 norm: never deploy without explicit user instruction. Manager-side close-out steps (build verify ✓, close artifacts commit, NETNEW update) complete pre-deploy.

**361 net-new pages on main** (W1-7 209 + W8 30 + W9 9 + MW1 53 + MW2 60 — historical totals to be reconciled post-deploy). 209 already in production (deployed 2026-05-26 22:43 BST). 152 pending deploy across MW1 + MW2 + holdovers.

**Back-patch list for post-deploy hygiene sweep (captured during MW2):**
- F-102 quantum back-patch: Wave 2 A4 + A10 + any earlier IHT-cluster page citing £1m → update to £2.5m s.124D enacted.
- A19 SSE HIGH CANNIBAL risk: monitored_pages 90d GSC impression watch for cannibalisation vs existing `substantial-shareholding-exemption-property-companies`.
- D-5 §11.A campaign-page F-12 URL sweep: grep `Property/web/content/blog/` for deprecated `gov.uk/government/news/changes-to-uk-company-law` URL and back-patch to live `changestoukcompanylaw.campaign.gov.uk`.
- D-24 §21.X unified entity-exit candidate: reconsider at MW3+ Stage 1b if multiple sibling picks need unification.
- B5 D-X out-of-wave back-patch: `landlord-expenses-allowable-uk-2026` pillar to surface s.224(1) PPR CGT-trap on home-office section.

---

**Last updated:** 2026-05-26 (evening) — **MegaWave 1 CLOSED via rolling architecture.** 52 new pages merged to main (Lane A 20 + Lane B 17 + Lane C 15; B12 dropped to MW2 carryover per F-51 lane-misclustering decision). 17 F-flags raised across Stage 1 / Stage 2 / Stage 2b / RUN; 15 closed in-session, 2 deferred (F-8 RUN per-write live-policy verification embedded in A18; F-10 effectively closed by Stage 2-extended Welsh page already covering Sch 13 post-Feb-2025/2026 amendments). 4 new HP-locks committed: §1.K FTB relief + §30 council-tax framework + §31 lease-extension + §32 CIL framework. §1.J extension applied (case-led sub-lines for s.116(1)(c) easement + PROW; A14 + A9 + A16 case-citation verified). F-52 drift in conductor's own §23.8 caught by Stage 2 sub-agent at write-time (s.41 → s.44 LTTA returns cite); propagated fix to Wave 9 welsh-LTT-MDR page. **301 net-new pages on main** (W1-7 209 + W8 30 + W9 9 + MW1 53; subtract 1 from MW1 for B12 carryover net 52, but rolling-arch also brought 1 new Stage 2 extension to A1 brief). MW1 + W4-W9 (~118 pages) all held for deploy pending user decision. Rolling architecture validated end-to-end: launcher pattern locked at `852cc0e`; batch-detect phase-aware fix at `8aae30f`; case-citation Agent dispatch pattern proven for §16-discipline; sub-agent commit-as-marker convention identified as gap (orchestrator polls for JSON files; manually synthesised markers to advance batches). Stage 2 + RUN markers needed manual synthesis 3× per lane → backlog item for batch-detect.ps1 / template harmonisation.

**`main` is at `100395a`** post-MW1-close. MW1 close chain: `eb50951` (F-52 §23.8 close in HP file) / `b141378` (Stage 2b HP-lock drafts) / `6a09540` (F-2 + F-4 + F-6 + F-9 closure entries in flags file) / `1119910` (Stage 1b HP-locks signed off: §1.K + §30 + §31) / `0d956ba` (Lane A metaDesc trims worktree) / `cef8b95` (Lane C reviewer credentials backpatch worktree) / `88d22e3` (lane B merge) / `967acbe` (lane A merge) / `0c30917` (lane C merge) / `100395a` (F-52 propagation to Wave 9 welsh page). Build verification PASS on main: `Compiled successfully in 4.5s`; 577 blog pages prerendered; all 9 category routes + middleware clean.

**DEPLOYED to production 2026-05-26 22:43 BST** via Vercel CLI (env-var override pattern from repo root — see `memory/vercel_cli_deploy_workflow.md`). First production deploy since post-W3; **~209 net-new pages going live in one batch** (W4 30 + W5 30 + W6 30 + W7 28 + W8 30 + W9 9 + MW1 52). Custom domain `www.propertytaxpartners.co.uk` serves all new pages (sample verified 4/4 = HTTP 200). IndexNow batch submitted: 602 URLs to Bing/Yandex/Seznam/Naver/Yep (HTTP 200; full sitemap submission). Inspect deployment at https://vercel.com/sitenudge-projects/property-tax-partners/71g8G9Jrw4RobgJ9n2Zni5aGAyAR.

---

**Last updated:** 2026-05-24 (end of day) — **Wave 7 CLOSED.** 28 new pages merged to main (Bucket A 9 + Bucket B 10 + Bucket C 9); pre-merge house-position corrections F-3 + F-5 locked (§20.2 verbatim-section disambiguation table + §27.2 Sch 24 careless-floor 12-month-qualifier drop); F-1 (§26.9 £30k → £40k) closed in-session by Session A; 5-file site-wide STALE sweep (£30k → £40k) applied via sub-agent dispatch per §16.43; 3-file in-wave precision back-patches (F-4 C1→C2 IPDI hyperlink + A4/B5 em-dash micro-fixes). **209 net-new pages on main** (W1 31 + W2 30 + W3 30 + W4 30 + W5 30 + W6 30 + W7 28). Wave 4 + 5 + 6 + 7 (118 pages) all held for deploy pending user decision. **5th consecutive zero-Q&A wave** preserved (W3 had 0 factual + 1 procedural at W5; W4 + W5 + W6 + W7 had 0 of either). Sub-agent dispatch validated again for site-wide STALE sweeps (§16.43 pattern); §16.45 (Wave 7 HP-lock 13 drift catches) lesson is now firmly load-bearing; §16.46 (NEW) on 5-wave zero-Q&A trend + manager-side-prep maturation hypothesis added.

**`main` is at `0b7df7d`** post-Wave-7-close. Wave 7 close chain: `6f6e79f` (step 1 pre-merge HP corrections §20.2 + §27.2) / `775e985` (step 2 audit trail: tracker + flags + 3× discovery + brief work-logs) / `75f8820` (step 3a A merge) / `683f4ad` (step 3b B merge) / `76937d8` (step 3c C merge) / `4588ea7` (step 4 batch 1 in-wave precision back-patches) / `0b7df7d` (step 4 batch 2 F-2 site-wide STALE sweep). 7 commits at close; 8 files touched in post-merge phase (3 in batch 1 + 5 in batch 2); ~11 individual edits.

**Wave 7 outputs on `main`:** 28 blog markdown files (9 Bucket A Regulatory + 10 Bucket B HMRC enquiry + 9 Bucket C Specialist transactional). All clean against §20 + §26 + §26.9 (A), §27 + §19 + §22.16 (B), §22.16-§22.18 + §22.21 + §25/§25.11 + §1+§1.A-§1.G + §15 + §22.9-§22.15 (C). monitored_pages IDs 251-278 assigned. Median body words ~3,000 (range 2,549-3,676; within §16.16). FAQ counts: A 12 / B 12 / C 14 (all in 10-14 range). Zero Tailwind classes across all 28 pages; 26 of 28 zero em-dashes (A4 + B5 micro-fixes applied at batch 1). Total ~85,000 body words.

**Wave 7 drift catches surfaced (across HP-lock + Stage 1a + Stage 1b + Stage 2 + write-time):**
- 13 at HP-lock stage (§16.45) — including 2 errors in the previous manager's Manager_prompt (CTA 2010 ss.464M-Q fiction; Sch 4 para 5 mis-cite) + 1 fundamental anchor crisis (FA 2003 s.58C is zero-carbon homes; C6 pick replaced with SDLT group relief)
- 19 additional at Stage 2 brief drafting (across A 6 + B 4 + C 9)
- 3 at session write time (F-1 HA 2004 s.249A £30k → £40k via SI 2026/319; F-3 RRA 2025 s.4/s.6 brief drift vs actual s.2 + s.15 / HA 1988 s.16E; F-5 Sch 24 careless-floor "(within 12 months)" qualifier conflated with Sch 41)
- **Total: 35 drift catches across the Wave 7 lifecycle.** The §16.40 + §16.42 + §16.45 territory-novelty pattern continues at each stage.

**Wave 6 CLOSED (preserved for audit).** All 30 pages merged to main; pre-merge house-position corrections (F-9 s.455, F-3 NRB 2031, F-4 s.169E) locked; 14 STALE + 12 INTERNAL_LINK + 5 REDIRECT + 4 CROSS_BUCKET back-patches applied across 24 files. **181 net-new pages on main** (W1 31 + W2 30 + W3 30 + W4 30 + W5 30 + W6 30). Wave 4 + 5 + 6 (90 pages) all held for deploy pending user decision. 4th consecutive zero-factual-Q&A wave preserved; sub-agent dispatch validated at production scale for site-wide STALE sweeps (§16.43).

**`main` is at `a904ca1`.** 181 net-new pages from Wave 1 (31) + Wave 2 (30) + Wave 3 (30) + Wave 4 (30) + Wave 5 (30) + Wave 6 (30) sit on `main`. Wave 6 close chain `3808019` (step 1 pre-merge HP corrections F-9 + F-3 + F-4) / `ad78212` (step 2 audit trail) / `b77b954` (step 3a A merge) / `e4f3ac2` (step 3b B merge) / `5b75303` (step 3c C merge) / `c27481e` (step 4 batch 1 in-wave cross-bucket forward-links) / `5a218f5` (step 4 batch 2 STALE sweeps + INTERNAL_LINK back-patches) / `a904ca1` (step 4 batch 3 middleware redirects). Wave 4 close chain `1e796df` (F-18 §15.4) / `e9b95fc` (audit-trail) / `c964ea4` (A merge) / `e461bb5` (B merge) / `1a4c211` (C merge) / `f11d801` (post-merge back-patches) / `f0bf5b7` (NETNEW_PROGRAM update). Wave 5 pre-launch chain `616c127` (F-19 + F-20 + housekeeping locks) / `2af6268` (Stage 1 + manager review + inter-wave queue closures) / `08bb069` (Stage 2 briefs + launch artefacts) / `050bd72` (Wave 4 audit-trail completion: discovery logs A/B/C) / `2e8b792` (HEAD placeholder fill) / `e3d9dee` (Wave 5 Q-1 templating spot-check answer). Wave 5 close chain `08e9d74` (pre-merge house-position corrections F-B7-1 + F-4) / `7a8206b` (audit-trail) / `8d0a21f` (A merge) / `cc99faf` (B merge) / `9c39ff1` (C merge) / `14c15be` (post-merge brief corrections + C9 §16.32 hyperlinks).

**Wave 4 outputs on `main`:** 30 blog markdown files (10 LtdCo + FIC = Bucket A, 10 MTD ITSA operational = Bucket B, 10 IHT estate-planning = Bucket C). All clean against §11 + §21 (A), §3 + §19 + §19.10-§19.17 (B), §15 + §22 + §21.5 (C). CIHC citation discipline held (CTA 2010 s.18N never s.34, per §16.3 + §21.7); penalty figures held against §19.7 corrected 15/30/31 + 3%/3%/10% (zero legacy 31/46/91 + 2%/2%/4% replication); zero em-dashes across the 30 pages; zero Tailwind classes; all internal links resolve. Median body words A 3,138 / B 2,556 / C 2,800. C7 (FIC strategic IHT framing) written last per launch-prompt sequencing constraint, after A6-A10 (FIC operational mechanics) shipped, so the 5 cross-bucket forward-links from C7 to A6/A7/A8/A9/A10 resolved cleanly at merge.

**Wave 4 close (2026-05-23 PM):**
- **F-18 §15.4 pre-merge correction (`1e796df`):** §15.4 AIM mechanics + anti-forestalling + trust anti-fragmentation locked from "verify before relying" hedge to verbatim-cited gov.uk text. Three positions: (a) AIM 50% sub-tier is separate and does NOT consume the £1m allowance; (b) anti-forestalling from 30 October 2024 if donor dies on/after 6 April 2026 within 7 years; (c) trust anti-fragmentation from 30 October 2024 for same-settlor multi-trust structures sharing a single £1m allowance. Surfaced via Wave 4 Session C8 session-time gov.uk WebFetch; manager independently verified before locking. **Fourth Bill-vs-enacted-Act drift caught in succession** (F-6, F-11, F-12/F-13, F-18); §16.22 + §16.27 pattern firmly load-bearing.
- **Audit-trail (`e9b95fc`):** tracker + flags committed; tracker shows all 30 ✅ done with body word counts, FAQ counts, monitored_pages IDs (157-186 across the 30 pages).
- **Three bucket merges** (`c964ea4` A, `e461bb5` B, `1a4c211` C): 30 new blog files added; all merges clean (no conflicts).
- **Post-merge back-patches (`f11d801`):** F-1 BPR pillar Related Reading add C1; F-2 A1 four cross-links to A2/A5/A8/A9; F-3 B7 two cross-links to C6; F-5 existing record-keeping page retention framing aligned with §19.16 7-year practical floor. Build PASS (411+ pages including the 30 new Wave 4 pages).
- **Zero Q&A across all three sessions** (third consecutive zero-Q&A wave after Waves 2 + 3); §16.23 prep-quality-signal pattern firmly load-bearing.

**Waves 1 + 2 + 3 are deployed; Waves 4 + 5 + 6 are held.** All three later-wave deploys deferred by user pending review (2026-05-23 for W4 + W5; 2026-05-24 confirmed for W6 close). GSC signal for the 91 W1-3 pages is therefore accruing; Wave 7+ bucket rotation can be data-led on W1-3 once 6-8 weeks have passed since their deploy dates. W4 + W5 + W6 GSC signal (90 additional pages) blocked on a later user-triggered deploy.

**Wave 5 outputs on `main`:** 30 blog markdown files (10 VAT topical-gap deepening = Bucket A; 10 Devolved property tax = Bucket B, 5 Welsh LTT + 5 Scottish LBTT/ADS; 10 Form 17 + joint ownership + spouse-mechanics = Bucket C). All clean against §1 + §23 (B), §1 + §4 + §15 + §19.4 + §22.5 + §23.5 + §24 (C). Bucket A is statute-isolated (VAT is UK-wide; no §X locked; per-write §16.35 verification caught 2 brief-quality errors at write time without house-position dependency). Zero em-dashes, zero Tailwind classes. Total ~82k body words, ~394 FAQs. monitored_pages IDs 188-216 across the 30 pages.

**Wave 5 close (2026-05-23 PM):**
- **Pre-merge house-position corrections (`08e9d74`):** §23.5 Scottish ADS joint-buyer aggregation cite Sch 2A para 4 → para 5(2) (F-B7-1 from B7 §16.35 verification); §24.1 + §24.6 + §24.9 ITTOIA 2005 s.282 removal (F-4 from C1 §16.35 verification — s.282 is "Assignments for profit of lease granted at undervalue", not the property-income 50/50 parallel; correct cite is ITA 2007 s.836 alone).
- **Audit-trail (`7a8206b`):** tracker + flags + Q&A + discovery logs committed; all 30 ✅ done (B1-B3 tracker row status drift, branch state authoritative).
- **Three bucket merges** (`8d0a21f` A, `cc99faf` B, `9c39ff1` C): 30 new blog files added; all merges clean.
- **Post-merge brief corrections (`14c15be`):** 4 brief annotations for §16.35-caught errors (A8 Sch 4A para 9 → Sch 6 para 9; A9 non-existent cladding-VAT zero-rate flagged; B5 LTTA 2017 s.34 → TCMA 2016 s.41; B10 FA 2003 Sch 7 → LBTT(S)A 2013 Sch 11); C9 §16.32 forward-link placeholders to B2 + B7 converted to live hyperlinks; bonus C9 fix 18-month → 36-month ADS replacement window per §23.5.
- **One Q&A** across the wave (B's Q-1 templating spot-check at B3 gate, PASS per launch-prompt instruction; procedural not factual blocker so §16.33 zero-Q&A factual-quality pattern preserved).
- **4 brief-quality errors caught at §16.35 per-write verification across all 3 buckets** (A8 + A9 + B5 + B10): §16.36 lesson on Stage 2 brief-template statutory-verification gate.
- **§16.15 worktree-vs-main Q&A discipline repeat** (B's Q-1 written to worktree's copy, propagated to main by manager): §16.37 lesson on hardening launch-prompt template.

**Worktrees that can now be deleted:** `Accounting-wt-property-wave5-{a,b,c}/`. (Previous Wave 1-4 worktrees already deleted; Wave 5 cleanup pending as part of close-out step 6.) **Medical worktrees** parked, not part of this program.

**Outstanding hygiene (still pending):**
- **Wave 5 existing-page back-patches (deferred to follow-up commit):** F-2 + F-6 + F-7 + F-10 existing VAT pages → A1 + A6 + A8 + A10 back-links (4 pages); 5 existing spouse-mechanics pages → C1 back-links per Session C D-4 (`section-24-joint-property-ownership-tax-split`, `mtd-itsa-jointly-owned-property-threshold-split`, `mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse`, `cgt-property-transfer-spouse`, `alphabet-shares-property-spv-dividend-splitting-spouse-children`). Cross-link hygiene; not blocking.
- **Wave 5 F-3** (low priority): existing `landlord-vat-registration-when-required` imprecise on 80% connected-party rule; replace with one-line pointer to A1 at next content refresh.
- **Wave 5 F-5 EXISTING_PAGE_STALE:** alexander-ene.co.uk URL set rotted (returns homepage). Drop from Property competitor seed lists for future waves (logged Session C D-5).
- **F-7 (Wave 2)** brand wordmark em-dash — separate scope, still outstanding from Wave 4 inter-wave queue.
- **F-1 PART 2 lead-page content rewrite** for `renters-rights-act-2026-tax-implications-landlords` (post-Royal-Assent restate). Brief scaffolded at `docs/property/f1_rra_lead_page_rewrite_brief.md`; future manual session task.
- **CGT deepen-existing sweep** (Wave 4 delta signal for legacy-rebuild track, not net-new program scope).

**House position refinements (cumulative log; locked dates as stamped):**
- §15.6 LTR test is **two-route** (10 consecutive OR 10 of 20 tax years), not single-route as originally locked. Wave 2 Session A surfaced via A6 research. Locked 2026-05-22.
- §17.6 TRF is **3-year at 12%/12%/15%** per Autumn Budget 2024 extension, not 2-year at 12% as originally locked. Wave 2 Session C surfaced via C8 research. Locked 2026-05-22.
- §12 (RRA Bill / in-passage) **superseded by §20** (RRA 2025 enacted state). §12 retained for audit. Wave 3 prep Stage 1 verification surfaced Royal Assent of 27 October 2025 (legislation.gov.uk verified 2026-05-22).
- §19.7 MTD ITSA late-payment day-triggers **corrected 31/46/91 → 15/30/31** at 3%/3%/10% (Spring Statement 2025 reform). Stage 2 MTD sub-agent surfaced 2026-05-22; F-6 broadcast. Locked 2026-05-22.
- §20.7 RRA 2025 pet rights **corrected** (three substantive points). Session C surfaced mid-C7 via legislation.gov.uk verification; F-11 broadcast. Locked 2026-05-23.
- §20.2 / §20.3 / §20.5 / §20.8 / §20.10 / §20.11 **corrected en bloc** via the §20 verification pass against the enacted RRA 2025 (F-12 through F-17). Two hard drifts (§20.10 RRO 12 months → 2 years; §20.5 Ombudsman £25k cap not in statute) + four precision flags. Locked 2026-05-23 PM. Full audit at `docs/property/section_20_verification_2026-05-23.md`.
- **§15.4 BPR/APR cap firmed (F-18)** from "verify before relying" hedge to verbatim-cited gov.uk positions: AIM 50% sub-tier separate (does NOT consume £1m allowance); anti-forestalling 30 October 2024 if donor dies on/after 6 April 2026 within 7 years; trust anti-fragmentation 30 October 2024 for same-settlor multi-trust structures. Wave 4 Session C8 session-time WebFetch surfaced; manager independently verified. Locked 2026-05-23 PM. **Fourth Bill-vs-enacted-Act drift in succession.**
- **§§19.10-19.17 (MTD operational), §21 (LtdCo + FIC), §22 (IHT estate planning) added** as Wave 4 prep house position extensions (commit `f9c838b`). CIHC citation discipline fixed at lock time (CTA 2010 s.18N, never s.34, per Wave 1 §16.3 lesson).
- **§21.4 F-19 + F-20 corrections** (Wave 5 pre-launch, commit `616c127`): employer NI 13.8% → 15% from 6 April 2025 (Reeves Autumn Budget 2024); dividend basic+higher 8.75%/33.75% → 10.75%/35.75% from 6 April 2026 (Reeves November 2025 Budget; additional rate 39.35% unchanged). Both verified gov.uk by manager WebFetch. s.455 close-company DLA charge follows F-20 via ITA 2007 s.8(2): 33.75% → 35.75%. 38-page back-patch on existing blog inventory landed same commit. Fifth + sixth consecutive Bill-vs-enacted-Act drift caught in succession (§16.22 + §16.27 pattern firmly load-bearing).
- **§15.4 trust anti-fragmentation, §15.5 pensions in IHT, §16.3 UK-Lux DTC housekeeping locks** (Wave 5 pre-launch, commit `2af6268`): trust anti-fragmentation deferred-mechanic hedge → draft Finance Bill 2025-26 published 21 July 2025; pensions in IHT consultation outcome confirmed PR liability + DIS exclusion; UK-Lux 2022 DTC confirmed in force from 22 November 2023.
- **§§20.12 Wales SI 2026/6 footnote** (Wave 5 pre-launch, commit `2af6268`): PTP advises England-only so Wales-specific RRA 2025 ss.43-49 commencement out of program scope; noted for completeness.
- **§§23 (Welsh LTT + Scottish LBTT + ADS), §24 (Form 17 + joint ownership + spouse-mechanics) added** as Wave 5 prep house position extensions (commit `2af6268`). 21 subsections total, 25+ verbatim gov.wales / revenue.scot / gov.uk / legislation.gov.uk citations. Three factual surprises folded in: Welsh LTT MDR not abolished alongside SDLT MDR + 3% min-rate floor from 13 Feb 2026; Scottish ADS replacement window 36 months (harmonised with SDLT); Welsh LTT higher rates uplifted 1pp from 11 Dec 2024 to 5%/8.5%/10%/12.5%/15%/17%.
- **§23.5 F-B7-1 correction** (Wave 5 close pre-merge, commit `08e9d74`): Scottish ADS joint-buyer aggregation cite Sch 2A para 4 → Sch 2A para 5(2). B7 session-time WebFetch surfaced.
- **§24.1 + §24.6 + §24.9 F-4 correction** (Wave 5 close pre-merge, commit `08e9d74`): ITTOIA 2005 s.282 removed from the 50/50 spouse-income parallel position. s.282 is "Assignments for profit of lease granted at undervalue" — no connection to the 50/50 rule. Correct cite is ITA 2007 s.836 alone. C1 session-time WebFetch surfaced.

**Program totals (Wave 6 closed):** ~485 total target (~285 net-new + ~231 legacy rebuilds). After Wave 1 (31) + Wave 2 (30) + Wave 3 (30) + Wave 4 (30) + Wave 5 (30) + Wave 6 (30) = **181 net-new on `main`** (W1-3 deployed; W4 + W5 + W6 held). ~104 candidates remain in the user-narrowed pool (134 minus 30 Wave 6 consumption). Wave 7+ pool = 104 narrowed + 65 new candidates from the 2026-05-23 Track 2B addendum at `topic_gaps_final.md` lines 1295+ (~37 of 65 ready immediately + ~28 requiring new house-position locks) + 74 Wave 6 discovery items as additional feeder.

**Wave 6 run summary (2026-05-23 evening to 2026-05-24 AM):**

- **Launch:** 2026-05-23 ~20:47Z via three fresh Opus 4.7 sessions per worktree (`Accounting-wt-property-wave6-{a,b,c}`).
- **Run duration:** overnight (~12-14 hours wall-clock).
- **Output: 30/30 pages shipped** across 3 worktree branches (10 + 10 + 12 commits respectively — Session C has 2 extra work-log fill commits for C1 + C2 per the per-page work-log convention).
- **Tracker:** 30 ✅, 0 🟦, 0 ⬜ (all marked done on main's working tree via §16.37 absolute-path discipline — **first wave where §16.15/§16.37 absolute-path discipline holds with zero violations, see §16.41**).
- **Q&A: zero real questions** across all 3 sessions (the "1 Q-N" each grep matches is the template `Q-N` placeholder per §16.41 fix; no real Q&A). **4th consecutive zero-factual-Q&A wave** (W3, W4, W5 had 0 factual + 1 procedural at W5, W6 has 0 of either). §16.33 prep-quality-signal pattern is firmly load-bearing.
- **Flags: 39 total** — 14 EXISTING_PAGE_STALE (3 CRITICAL drift catches on shipped content; see below), 12 INTERNAL_LINK (existing pages should back-link to W6 pages), 4 CROSS_BUCKET (forward-link hyperlinks needing back-patch at wave merge per §16.32), 2 REDIRECT (legacy slug repoints).
- **Discovery: 74 items total** (A: 30, B: 24, C: 20) — significant Wave 7+ feeder.
- **Branch commits to merge into main (32 total):**
  - `property-wave6-a` (10): `bb0f825` A4 / `39c0150` A1 / `753c523` A2 / `4690351` A7 / `e6f56dd` A3 / `1e673fa` A5 / `53d9c56` A6 / `539e6fa` A8 / `089f56c` A9 / `4db7b5c` A10 (A4 first per cross-bucket dep to C2; A7 before A8-A10 per within-bucket dep; A10 LAST per B4+B7 gate)
  - `property-wave6-b` (10): `0060cbb` B4 / `44d62d5` B7 / `6851b1a` B1 / `c3dcd30` B2 / `2c11533` B3 / `41614ae` B5 / `4c8eb19` B6 / `600bce5` B8 / `e0f7f1c` B9 / `dbaa59d` B10 (B4 + B7 first per A10 gate; pillar B1 then rest)
  - `property-wave6-c` (12): `c7340f6` C1 / `fcc54d8` C1 work-log / `d0f2931` C2 / `55c28c9` C2 work-log / `44b830f` C3 / `72f04da` C4 / `5a85654` C5 / `979f379` C6 / `e7ce1f7` C7 / `f803b4e` C8 / `a5bc4e6` C9 / `1c64adc` C10 (C1 pillar first; C2 before A4 had shipped at A-branch tip — back-patch needed)

**CRITICAL drift catches surfaced by sessions doing §16.35 per-write verification on adjacent existing content (these are the highest-priority pre-merge items for the close):**

- **F-9 (CRITICAL SITE-WIDE):** **CTA 2010 s.455 charge rate is now 35.75%** (not 33.75%) for loans made on or after 6 April 2026. s.455 is a calculated rate that references "the dividend upper rate specified in section 8(2) of ITA 2007 for the tax year". ITA 2007 s.8(2) was substituted by **FA 2026 s.4(1)(b)** to read "the dividend upper rate is 35.75%" with effect for tax year 2026/27 onwards. Verified at https://www.legislation.gov.uk/ukpga/2007/3/section/8 on 2026-05-23. **10th consecutive Bill-vs-enacted-Act drift catch in the program.** Needs §21.4 lock pre-merge + site-wide back-patch of every existing page citing 33.75% s.455 rate.
- **F-3 (CRITICAL):** NRB freeze extends to **5 April 2031** (not "April 2030" as Wave 4 C10 currently says). Spring Statement 2025 or Autumn Budget 2024 extended the freeze by one additional year. Verified at https://www.gov.uk/government/publications/rates-and-allowances-inheritance-tax-thresholds-and-interest-rates on 2026-05-23. **11th consecutive drift catch.** Needs §22 NRB-freeze-window lock pre-merge + back-patch of Wave 4 C10 + any sister IHT pages citing 2030.
- **F-6 (CRITICAL, cluster's worst pre-Wave-6 misframing):** Existing `landlord-capital-allowances-tax-relief` tells residential landlords kitchens, boilers, central heating, carpets, bedroom furniture, electrical systems, bathroom fixtures, and garden equipment are AIA-claimable. **None of these qualify** under CAA 2001 s.35 dwelling-house restriction (since 2013 and arguably 2008). Correct relief route for like-for-like replacement of domestic items is **ITTOIA 2005 s.311A** (Domestic Items Relief), not capital allowances. Page is on canonical chain via middleware line 53. C1 is the structural replacement; legacy page needs reframing AND middleware repoint to C1.
- **F-1:** Existing `extracting-money-from-property-limited-company` cites ITA 2007 s.396B (doesn't exist) for MVL TAAR. Correct: ITTOIA 2005 s.396B per FA 2016. Confirms Stage 2A drift catch propagated into existing content.
- **F-10:** CTA 2010 ss.464C/464D omission propagated into pre-Wave-6 sister pages (Wave 1 B1 DLA mechanics, Wave 4 A1 DLA repayment strategy, possibly Wave 1 B7). Confirms Stage 2A drift catch.
- **F-4:** Wave 6 B4 brief authority links mis-described TCGA s.169G as "settlor definition" — correct is **s.169E**. Session caught at write time; B4 body has dedicated H3 fixing this; other B-cluster briefs may carry same brief error.

**Wave 6 close (2026-05-24) — COMPLETED:**
- **Step 1 — Pre-merge house-position corrections (`3808019`):** F-9 s.455 framed by-reference to ITA 2007 s.8(2) substituted to 35.75% by FA 2026 s.4(1)(b) (locked in §21.1 and added to §21.4); F-3 NRB + RNRB freeze 5 April 2030 → **5 April 2031** in §9 + §15.1 (gov.uk IHT thresholds table verified per session-time WebFetch; §16.43 lesson on WebFetch summarizer limitation); F-4 §22.14 citations updated with s.169E settlor definition (s.169G is arrangement definition only), §22.15 do-not-write extended.
- **Step 2 — Audit-trail (`ad78212`):** tracker (30 ✅) + flags (39 entries) + discovery logs (74 items) committed; Q&A shells already on main per launch commit `26334b0`.
- **Step 3 — Three bucket merges:** `b77b954` A (10 commits) / `e4f3ac2` B (10) / `5b75303` C (12 incl 2 work-log fills). Zero conflicts on any merge; the Track 2 manager's `7083f40` + earlier work coexisted cleanly with Wave 6 prep base at `5daff18`.
- **Step 4 — Post-merge back-patches in 3 batches:**
  - **`c27481e` batch 1: in-wave cross-bucket forward-links (F-2, F-12, F-24, F-26).** A4 → C2; A8 → A9 (2 prose-to-href); A7 ↔ C4 + C5 reciprocal; B1 + B4 + B7 → A10 reciprocal. 7 files; 8 edits.
  - **`5a218f5` batch 2: STALE sweeps + INTERNAL_LINK back-patches.** F-9 s.455 + F-10 ss.464C/D site-wide sweep dispatched via sub-agent per §16.28 (§16.43 validates the pattern at production scale); 4 DLA-context pages patched, 11 edits. F-25 + F-16(B) zero hits in pre-Wave-6 content but surfaced 1 stale figure in Wave 6 B6 carried over from Stage 1a brief seed (manager-fixed). F-1 ITTOIA 2005 s.396B vs ITA 2007 s.396B on extracting-money page (2 occurrences). F-3 NRB 2030 → 2031 on Wave 4 C10 (2 occurrences). 11 INTERNAL_LINK forward-links added to pre-Wave-6 pages (F-5, F-6/A, F-7, F-14, F-18, F-19, F-20, F-22, F-23). F-15 in-wave cleanup of stale "forthcoming" temporal marker. 14 files; 39 insertions.
  - **`a904ca1` batch 3: middleware redirect repoints (F-8 + F-16 + F-6/F-7/F-11 C-bucket).** 6 entries added to DUPLICATE_REDIRECTS: legacy `property-company-profit-extraction-salary-vs-dividends` → A1; `property-company-employer-pension-contributions-directors` → A5; `landlord-capital-allowances-tax-relief` + `landlord-capital-allowances-maximizing-tax-relief` chain → C1; `hmo-capital-allowances-multi-tenant-landlords-claim` → C7; `full-expensing-capital-allowances` → C5.
- **Total Wave 6 close churn:** 8 commits; 24 files touched in post-merge phase; ~52 individual edits.
- **Drift-catch tally for Wave 6:** 11 confirmed pre-merge / Stage 1b / Stage 2 / write-time catches in succession; **11th + 12th consecutive Bill-vs-enacted-Act drifts** at F-9 s.455 35.75% (FA 2026 s.4(1)(b) substitution) + F-3 NRB freeze 5 April 2031 (one-year extension to the Autumn Budget 2024 settlement). §16.27 / §16.30 / §16.35 / §16.38 / §16.40 / §16.42 pattern firmly load-bearing.
- **Items deferred to inter-wave queue (not Wave 6 close scope):** F-8(C) SiteHeader em-dash (template chrome — separate scope); F-9(C) cgt-commercial-property pre-30-October-2024 rates rewrite (post-launch hygiene); F-15(B) legacy `cgt-gifting-property-family-members-uk` extension; F-17(C) HOUSE_POSITION_EXTENSION §25.11 LRR; §22.5 spouse-exemption pre-FA-2025 refresh (per §16.39).

**Wave 6 prep status (closed, included here for audit trail):** Stage 1 COMPLETE (2026-05-23 PM). User selected the §19-aligned trio per "everything needs to be created sooner or later, just execute" framing (deploy held; bucket selection intuition-led from outstanding-pool survey).

- **Bucket A — LtdCo extraction-sequence pillar (10 picks).** A1 multi-year sequencer pillar; A2 s.464C bed-and-breakfast trap; A3 share buyback; A4 MVL exit; A5 employer pension; A6 time-pressure 12-month window; A7 multi-SPV HoldCo extraction; A8 mid-incorporation phase 2; A9 pre-sale cash strip; A10 trust-owned SPV extraction. House positions §21 + §15.4 + §22.13.
- **Bucket B — Trusts + §24.7 adult/minor-child + settlements + GROB (10 picks).** B1 trust pillar; B2 settlements legislation ss.624/629; B3 IIP/IPDI; B4 settlor-interested IHT+CGT trifecta; B5 GROB family-home s.102B shared-occupation; B6 bare-trust/nominee/formal-trust decision; B7 settlor-interest + GROB double-trap; B8 adult-child gift decision-tree; B9 minor-child s.629 attribution; B10 intestacy operational walkthrough. House positions §22.9-§22.15 (Wave 6 extension locked) + §15 + §24.
- **Bucket C — Capital allowances + SBA + FYA (10 picks).** C1 CAA 2001 pillar; C2 disposal mechanics + balancing event; C3 SBA 3% claim mechanics; C4 AIA £1m + associated-co allocation; C5 full-expensing carve-outs; C6 fixtures s.198 election; C7 HMO common-parts s.35; C8 FHL post-FA-2025 grandfathered pools; C9 land remediation relief 150%; C10 super-deduction 1.3x disposal clawback. House positions §25 NEW cluster (Wave 6 extension locked).

**Cross-bucket sequencing constraints (§16.32, baked into launch prompts):** A4→C2 (A first; C2 cites A4 MVL mechanic); A7↔C4 (parallel, back-patch at merge); A7→C5 (A first; C5 cites A7 group); B4+B7→A10 (B first; A10 cites B for trust-side context).

**Drift catches at Wave 6 Stage 1b (5 brief-instruction errors + 1 existing-position drift):** (i) FHL abolition is **FA 2025 Sch 5** not FA 2024 (FA 2024 Sch 5 is museums/galleries); (ii) SBA residential exclusion is **CAA 2001 s.270CF** not s.270BG (s.270BG is land-acquisition); (iii) ITTOIA 2005 s.628 is **charities exception** with no 5% rule; (iv) FYA section identities: s.45EA = EV charging; s.45O = Freeport/special tax site; s.45K = designated assisted areas; (v) **IHTA 1984 s.48(3)-(3F) OMITTED by FA 2025 s.45 from 6 April 2025**, replaced by new s.48ZA long-term-resident test (citing s.48(3) would be a drift). **Seventh consecutive Bill-vs-enacted-Act drift catch in the program.** Plus existing **§22.5 drift catch** flagged (spouse-exemption framing for non-UK-domiciled spouses; pre-FA-2025 architecture; needs targeted §22.5 refresh — deferred to inter-wave queue, not Wave 6 blocker because Bucket B picks B3/B4/B7 cite §22.12-new not §22.5). See §16.38.

**Wave 6 prep status next steps:**
- (a) **Stage 2 dispatch** — three parallel sub-agents, one per bucket, generating 10 full briefs each. §16.36 statutory-citation cross-check gate baked into Stage 2 prompts.
- (b) **Artefacts** — wave6 tracker + flags + 3× Q&A + 3× discovery shells.
- (c) **Worktrees** — stand up 3 worktrees ff-verified to main HEAD per §16.25.
- (d) **START_HERE + LAUNCH_PROMPTS** — written with §16.37 Q&A absolute-path discipline paragraph baked in.
- (e) **User gate** — final manager-review summary, then user-triggered launch.

---

## 4. Brief anatomy: what every page brief must contain

The brief IS the session's research package. Sessions read it, fetch the competitor URLs, read the closest existing pages, then write to the framing differentiator. **A weak brief produces a weak page.** Every brief lives at `briefs/property/<wave>/<slug>.md` and has these blocks:

### 4.1 Header
- Title: "Track N brief: `<slug>`" or "Wave N brief: `<slug>`"
- Site, bucket, session assignment, brief type (net-new or legacy rebuild).
- Source markdown path on launch (where the session writes the file).
- Live URL on launch.

### 4.2 Manager pre-decisions
- **Suggested slug** (session may override, must log).
- **Suggested category** (one of: `landlord-tax-essentials`, `incorporation-and-company-structures`, `capital-gains-tax`, `making-tax-digital-mtd`, `non-resident-landlord-tax`, `portfolio-management`, `property-accountant-services`, `property-types-and-specialist-tax`, `section-24-and-tax-relief`).
- **Bucket** (matches `topic_gaps_final.md` classification).
- **Framing differentiator** — THE most important field. 2-4 sentences that say what makes THIS page distinct from siblings in the same bucket. Examples from Wave 1:
  > "Step-by-step process for reclaiming the 5% additional dwellings surcharge when the old main residence sells within the 3-year window. Practical claim mechanics + common failure modes + worked timeline; complementary to our SDLT-bands pillar which covers rates."
- Override-allowed clause: session may override slug/category if reasoning suggests, but must log in work-log.

### 4.3 Competitor URLs
- 3-5 URLs to fetch + read. From `competitor_serps` table or topic-gap analysis.
- Instruction: fetch with `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Read outline + FAQs + worked examples + citation density + component patterns. If a URL is poor, do own targeted search and document.

### 4.4 GSC data (for legacy rebuilds; empty for net-new)
- Top 20 queries by impressions for this URL, with position + clicks.
- Tells the session what queries the page is already ranking for that the rebuild should lean into.

### 4.5 Closest existing pages (cannibalisation context)
- 3-7 pages on our site closest by token similarity.
- Each with: slug, category, title, similarity score.
- **Discipline:** session reads each before writing. Decide if yours is the applied/scenario version (link out to pillar) or the deeper version (raise back-link flag from existing to yours).
- Two existing pages substantially overlap → CANNIBAL flag, don't proceed until manager arbitrates.

### 4.6 Redirect overlap
- Any of the existing 429 middleware redirects whose old slug tokens overlap with this new slug.
- Session repoints the redirect at the new page on launch (step 12 of the workflow).

### 4.7 Authority links (bucket-specific)
- 5-8 high-authority URLs the page should cite. HMRC manuals, legislation.gov.uk, gov.uk, tribunal cases.
- Examples per bucket:
  - SDLT: HMRC SDLT Manual (SDLTM), FA 2003, gov.uk SDLT calculator, FA (No.2) 2024.
  - Ltd Co / CT: CTA 2010, CTA 2009, HMRC CT Manual (CTM), TCGA 1992.
  - VAT: VATA 1994, HMRC VAT Manual (VATGPB), VAT Notices.
  - IHT: IHTA 1984, HMRC IHT Manual (IHTM), IHTA tapered relief tables.
  - DTAs: HMRC International Manual (INTM), OECD Model Tax Convention, specific treaty texts (UK-US, UK-France etc).
- Session picks 4-7 from this list + adds others found during research.

### 4.8 Universal rules (verbatim across all briefs)
- Voice (no em-dashes; specific; named legislation; anonymised personas; no real names).
- Lead-gen architecture (LeadForm auto-injected at footer; never duplicate in body).
- CSS in markdown (semantic HTML only; no Tailwind classes; `<aside>` styled by global CSS).
- FAQs (10-14, frontmatter `faqs:` array, auto-emitted as FAQPage JSON-LD).
- Cannibalisation discipline.
- Anti-templating (per-page framing differentiator, vary H2s, vary openings, vary FAQ phrasing).
- Quality bar (six checks, body word count target).

### 4.9 Workflow (verbatim — the 19 steps)
See §7.

### 4.10 Per-page work-log (filled by session during work)
- Decisions (slug, category, H1, meta title, why these vs alternatives).
- Competitor URLs fetched + key takeaway per URL.
- Existing-page review (overlap, differentiation decision).
- Citations added.
- Internal links added.
- Inline CTA placements.
- Build attempts (pass/fail).
- Verification (each of the six checks).
- Flags raised.
- 2-3 sentence summary.

The work-log is the audit trail. If a brief's work-log is unfilled at session end, the page is suspect.

---

## 5. House positions: the tie-breaker doc

`docs/property/house_positions.md` is the **single source of truth for figures, statutes, and framings**. Sessions read it once at start; it overrides any competitor source.

### 5.1 Current locked positions (index — read the doc for detail)
- SDLT bands and surcharges (residential, 5% from 31 October 2024; 6+ dwellings under **s.116(7) FA 2003 automatic** — corrected mid-Wave-1 from wrong Sch 6B cite).
- ATED bands 2026/27.
- MTD for ITSA threshold (£50k / £30k / £20k phased schedule; NOT £10k).
- S24 (mortgage interest restriction).
- CGT (18%/24% from April 2024; 60-day reporting).
- FHL (abolished from April 2025; transition rules).
- 2027 income tax surcharge (22%/42%/47% framed as "announced Autumn Budget 2024, scheduled, pending Royal Assent under Finance Act 2026").
- LTA (replaced by LSA/LSDBA from April 2024; £1,073,100 figure obsolete).
- IHT (currently SDLT/ATED-heavy; needs IHT-section extension for Wave 2).
- DTAs (currently empty; needs extension for Wave 2 — UK-US, UK-France, UK-Spain, etc.).
- Companies House reforms / ECCTA (currently empty).
- Welsh LTT / Scottish LBTT + ADS (briefly noted; needs extension if any wave touches Scottish/Welsh).
- Rent-a-Room relief allowance.

### 5.2 House position update process

A session flags `HOUSE_POSITION_CONFLICT` when a competitor source contradicts the doc and the session believes the doc is wrong.

Manager process (this happened twice in Wave 1, both correctly):
1. Read the flag carefully — session's reasoning is usually right because they're context-loaded on the topic.
2. **Verify via WebFetch to `legislation.gov.uk`** (NEVER trust your training data on statute interpretation; verify against the live text). For HMRC manual citations, also fetch the manual page.
3. If session is right: edit `house_positions.md` with a `Correction logged YYYY-MM-DD` stamp. Note the old framing in the correction note so the audit trail is preserved.
4. Drop manager-broadcast notes in all three sessions' Q&A files (so any session that already cached the wrong framing refreshes).
5. Authorise the affected session to fix-up their already-shipped pages on their branch.
6. Add any other live pages on `main` (outside the current wave) to a post-merge cleanup list.

### 5.3 Pre-wave: extend house positions for the wave's topics

Before launching a wave, **manager extends house_positions.md** with locked positions for the wave's topics. Wave 2 (IHT + DTAs + Expat) needs:

**IHT section:**
- NRB £325,000 (frozen to April 2028).
- RNRB £175,000 with taper at £2m+.
- Spouse exemption + transferable NRB/RNRB.
- BPR for property: Pawson, Brander, Personal Representatives of Pawson — investment property NOT eligible; furnished holiday lets historically borderline but **abolished FHL regime + April 2026 BPR/APR cap = harder**.
- Gifts with reservation of benefit (s.102 FA 1986) — implications for gifting property while continuing to occupy.
- PETs and 7-year taper.
- April 2026 £1m combined BPR+APR cap.

**DTAs section:**
- OECD Model 2017 baseline.
- Article 6 (immovable property — almost always source-state).
- Article 13 (capital gains — UK NRCGT applies even where treaty exempts; statute overrides treaty for NRCGT).
- Article 24 (non-discrimination).
- Tie-breaker tests for residence (Article 4) — permanent home, centre of vital interests, habitual abode, nationality, mutual agreement.
- Specific treaties: UK-US (saving clause), UK-France (Article 6/13), UK-Spain (real estate-rich entities), UK-Germany.

**Leaving the UK / expat section:**
- SRT (Statutory Residence Test) — automatic UK + automatic overseas + sufficient ties.
- Split-year treatment (Cases 1-8 in TCGA).
- Temporary non-residence rules — 5-year clock, CGT recapture on return.
- NRCGT (non-resident CGT) — applies to UK land/property from April 2015 (residential) / April 2019 (commercial + indirect via property-rich entities).
- 60-day NRCGT return requirement.
- NRL scheme (non-resident landlord) — gross or net election; 20% withholding default.

The manager who launches Wave 2 must complete this extension first.

---

## 6. Wave launch protocol (canonical 9-step checklist)

Pre-flight before any session prompt is sent:

1. **Extend `house_positions.md`** for the wave's topics. See §5.3.
2. **Generate per-page briefs** via brief-builder script. Wave 1 used `scripts/property_track1_brief_builder.py`; adapt with bucket-specific authority lists for the new wave's topics.
3. **Cannibalisation re-check** against current `main` (which now includes the previous wave's outputs). Run `scripts/property_cannibalisation_check.py` with current `main` as baseline.
4. **Stand up worktrees** at `C:/Users/user/Documents/Accounting-wt-property-wave<N>-{a,b,c}/` on branches `property-wave<N>-{a,b,c}`. Or reuse previous wave's worktrees after deleting branches.
5. **Copy missing files** into each worktree: `.env` and `optimisation_engine/competitor/_db.py` (both gitignored/untracked).
6. **Create wave artefact files**:
   - `docs/property/wave<N>_page_tracker.md`
   - `docs/property/wave<N>_site_wide_flags.md`
   - `docs/property/wave<N>_discovery_log_session_{A,B,C}.md`
   - `docs/property/wave<N>_questions_session_{A,B,C}.md`
7. **Write per-session START_HERE docs** at `docs/sessions/property/WAVE<N>_SESSION_{A,B,C}_START_HERE.md`. Each points at the wave-specific files + this NETNEW_PROGRAM doc.
8. **Arm manager-side watcher** (Monitor tool) on the three Q&A files, polling every 20s for new `STATUS: open` lines. Persistent: true.
9. **Hand the user three launch prompts** (one per session) to paste verbatim into fresh Opus sessions opened in the relevant worktrees.

---

## 7. The 19-step per-page workflow

Sessions follow this verbatim. Every brief contains it.

1. Read `house_positions.md` once at session start.
2. Claim ONE page in the wave tracker (`⬜ todo` → `🟡 in_progress` + UTC timestamp).
3. Read the brief (framing differentiator, closest existing, redirect overlap, authority links).
4. Fetch + read each competitor URL with `httpx + BeautifulSoup`.
5. Read closest-existing pages on our site.
6. Plan H2/H3 outline + meta + FAQs + CTA placements (vary per page — anti-templating).
7. Verify factual claims against authorities (HMRC manuals, legislation.gov.uk, gov.uk).
8. Fetch hero image from Pexels via `fetch_image_for_post(query)`.
9. Write the markdown file at `Property/web/content/blog/<slug>.md` (full frontmatter list in brief).
10. Build clean: `cd Property/web && npm run build`.
11. Six verifications: FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title ≤62, meta description ≤158, internal links resolve.
12. Apply redirect repointing in `middleware.ts` if brief lists overlap.
13. Register the new page in `monitored_pages` Supabase table.
14. **Commit on session's branch** (per-page commit; do NOT merge to main).
15. Fill in per-page work-log at bottom of brief.
16. Mark `✅ done` in tracker with 1-line Notes.
17. Append site-wide issues to wave's flags file.
18. Append discoveries to session's discovery log.
19. Claim next page.

**Critical order: step 14 (commit) before step 16 (mark done).** Wave 1 had multiple tracker-ahead-of-branch issues until calibrated in M-2/M-5.

---

## 8. Q&A channel + session-side watcher

### 8.1 Architecture

One question file per session: `docs/property/wave<N>_questions_session_{A,B,C}.md`. Lives in main repo (sessions edit via absolute main path). Append-only.

### 8.2 Lifecycle

```
Session writes Q-N with STATUS: open
   ↓
Manager watcher fires (~20s latency)
   ↓
Manager reads question, verifies any statute claims (WebFetch), drafts answer
   ↓
Manager appends `### Manager answer [TIMESTAMP]` block under Q-N
Manager flips STATUS: open → STATUS: answered
   ↓
Session-side watcher (if armed) fires
   ↓
Session re-reads file, acts on answer, marks done in flow
```

### 8.3 Manager-side watcher (Monitor tool)

```bash
declare -A seen
while true; do
  for f in docs/property/wave<N>_questions_session_A.md \
           docs/property/wave<N>_questions_session_B.md \
           docs/property/wave<N>_questions_session_C.md; do
    if [ -f "$f" ]; then
      while IFS= read -r line; do
        key="$f::$line"
        if [ -z "${seen[$key]:-}" ]; then
          seen[$key]=1
          echo "OPEN_QUESTION $f $line"
        fi
      done < <(grep -E "^## \[Q-[0-9]+\].*STATUS: open" "$f" 2>/dev/null || true)
    fi
  done
  sleep 20
done
```

Persistent: true. Stop at wave end via `TaskStop <task-id>`.

### 8.4 Session-side watcher (added for Wave 2+)

After appending a `STATUS: open` question, the session spawns a single Monitor task watching its own file for the `STATUS: answered` flip on its latest question:

```bash
QFILE="docs/property/wave<N>_questions_session_<X>.md"
LATEST_Q=$(grep -oE '^## \[Q-[0-9]+\]' "$QFILE" | tail -1)
echo "Watching for answer to $LATEST_Q..."
while true; do
  if grep -q "$LATEST_Q.*STATUS: answered" "$QFILE"; then
    echo "ANSWER_LANDED $LATEST_Q"
    break
  fi
  sleep 20
done
```

Persistent: false. Timeout: 1 hour. Session keeps working on another step/page while waiting.

### 8.5 When to use Q&A vs flag vs discovery vs just continue

- **Q&A:** decisions you need from manager that block forward progress. Pause this page; work another step/page meanwhile.
- **Flag (`wave<N>_site_wide_flags.md`):** things actioned already, OR cross-session issues. Never blocks.
- **Discovery log (`wave<N>_discovery_log_session_<X>.md`):** observations for future waves. No action needed.
- **Just continue:** anything inside your authority per START_HERE.

### 8.6 Manager-to-session notes (M-1, M-2, etc.)

The manager can append manager-initiated notes to a session's Q&A file (broadcasts, calibrations, blockers). Use format `## [M-N] [TIMESTAMP] [MANAGER NOTE] Title`. Sessions re-read on next poll. M-notes don't trigger the watcher (correct — manager isn't asking themselves a question).

---

## 9. Quality bar

Every page committed MUST pass these six checks (Wave 1 calibrated baseline):

| Check | Target |
|---|---|
| Em-dashes in body | 0 (commas, parentheses, full stops, middle dots only) |
| Tailwind utility classes in markdown body | 0 (semantic HTML only) |
| FAQ schema count in built HTML | == frontmatter `faqs:` array length |
| Meta title | ≤62 chars |
| Meta description | ≤158 chars |
| Internal `/blog/...` links resolve | every link → existing markdown file |

**FAQ count:** 10-14 per page. Lower end (10-12) for non-pillar; 13-14 for pillars and complex topics.

**Body word count:**
- Non-pillar: 2,800-3,500.
- Pillar / comprehensive reference: 3,500-4,500.
- Any 4,000+ non-pillar requires justification in work-log Decisions block.

**Word count gotcha:** `wc -w` total ≠ body. Total includes frontmatter (FAQ JSON inflates a lot). Sessions report **body words** in tracker notes. Manager spot-checks via `wc -w` for first-pass triage, then sanity-checks body count by subtracting ~1,000-1,500 for frontmatter.

**Anonymisation:** no real client names. Worked-example personas are invented (Patel-estate, Mawell-Estate, Singh, etc). No specific NHS Trust / agency / tenant dispute / firm names.

---

## 10. Anti-templating discipline

Wave 1's hardest risk was 10 SDLT pages in Session A reading like 10 versions of the same page. The **framing differentiator** in each brief is what protects against this.

**Per-page differentiator examples (Wave 1):**
- A1 (refund process) — process + failure modes + worked timeline.
- A2 (six-dwellings) — mechanics + savings + decision matrix vs siblings.
- A3 (sub-sale relief) — clarification, separating real use from myth.
- A6 (probate transfers) — taxonomy (five categories of transfer type).
- A8 (refund scams) — consumer-protection with tribunal authority.
- A9 (mixed-use classification) — case-law walkthrough.

Each differentiator yields a different H2 outline.

**Manager spot-checks after page 2-3 per session.** If a session's pages 1 and 2 share H2 structure or opening sentence, raise calibration immediately. Do not wait until page 8.

**Variation discipline:**
- Vary opening 2-3 sentences (no "Many landlords ask about..." across the wave).
- Vary H2 structure per page.
- Vary FAQ phrasing (no "Is X tax deductible?" across multiple pages).
- One worked example per concept per page.

---

## 11. Cannibalisation discipline

### 11.1 Token-level static check (pre-wave)

`scripts/property_cannibalisation_check.py` compares each candidate slug + title + h1 + metaTitle tokens against every existing Property page's. Threshold 0.55 = covered (drop); 0.30 = partial (warn); <0.30 = net-new (keep).

Run pre-every-wave with current `main` as baseline (the map grows as each wave adds pages).

### 11.2 Body-level check (session-driven)

Token-level catches title overlap but not body content overlap. Sessions catch body-level cannibalisation via the brief's **Closest existing pages** section: read each before writing, decide differentiation, raise CANNIBAL flag if two existing pages substantially overlap your topic.

### 11.3 Cross-session check (mid-wave)

Sessions in the same wave might write overlapping pages even when individual cannibalisation checks passed. CANNIBAL flag is for this — sessions watch each other via the shared flags file.

### 11.4 Anti-bandaid

If a CANNIBAL flag fires mid-wave, manager arbitrates: which session keeps which framing, which page gets retitled or skipped. Do not let two sessions write the same page.

---

## 12. Sub-agent guidance

A sub-agent is spawned via the Agent tool. It runs once, returns a structured report, doesn't iterate.

### 12.1 When to spawn a sub-agent

- **Wave preparation** (brief gen + cannibalisation re-check + house positions extension + scaffold files). Multi-step but deterministic; offloads ~5,000-10,000 tokens of manager context.
- **Statute verification** when you don't trust your training data. WebFetch + legislation.gov.uk + HMRC manual + summary.
- **Bulk file audits** (e.g., "scan all 285 existing Property pages for occurrences of '£10,000 MTD threshold' and report a list").
- **Research investigations** (when the user asks an open-ended question that needs multiple searches).

### 12.2 When NOT to spawn a sub-agent

- Decisions that need user input mid-flight (sub-agent can't pause and ask).
- Anything writing markdown content that ships (use a session, not a sub-agent — sessions follow the 19-step workflow including build verification).
- Trivial single-file reads or edits.
- When the user is waiting on a fast response (sub-agents take 30s-15min).

### 12.3 Sub-agent prompt discipline

Write the prompt like a brief to a smart colleague who hasn't seen this conversation. Include:
- What you're trying to accomplish and why.
- Specific file paths.
- What to return (format the structured output expected).
- Cap the response length if you can ("under 200 words", "as a markdown table").

**Never ask a sub-agent to "interpret" or "decide" on something where the user has authority.** Manager owns judgement calls; sub-agents execute defined tasks.

### 12.4 Examples relevant to this program

- **Wave 2 prep agent.** Scope: extend `house_positions.md` for IHT/DTAs/expat → adapt brief builder → generate ~30 briefs → cannibalisation re-check against `main` → scaffold wave2 tracker/flags/Q&A/START_HERE files → return launch prompts. Returns: file paths + summary of decisions taken + any open questions for manager.
- **Statute verification agent.** Used in Wave 1 implicitly via WebFetch; could be promoted to a sub-agent for complex multi-section verifications.
- **Bulk audit agent.** For Track 2 sweep on 234 untouched pages — sub-agent generates the actual fix list (grep + classify) so manager can review before delegating fixes to a session.

---

## 13. Manager instructions for sessions ABC

This is what sessions need from you as their manager. Sessions read their START_HERE doc and this NETNEW_PROGRAM doc; the START_HERE doc is the session's task brief and points back here for everything cross-cutting.

### 13.1 What sessions handle themselves (no manager input needed)

- Slug invention if assigned slug doesn't fit (log override in work-log).
- Em-dash removal, Tailwind class avoidance, FAQ count discipline.
- HMRC / legislation.gov.uk / gov.uk citations.
- Inline `<aside>` CTA placement at conversion moments.
- Cannibalisation handling via differentiation + linking to closest-existing.
- Factual statements matching the house positions doc.
- Building, verification, committing, marking tracker.

### 13.2 What sessions flag (no manager input until later)

Append to `wave<N>_site_wide_flags.md`:
- `HOUSE_POSITION_CONFLICT` — competitor evidence contradicts house position.
- `CANNIBAL` — two sibling pages overlap.
- `INTERNAL_LINK` — existing page should link to new page.
- `SCHEMA` — non-default schema type (HowTo, Course) might help SERP.
- `REDIRECT` — redirect action taken or not taken (log).
- `POSITIONING` — brand / lead-gen positioning question.
- `BUILD_BLOCKER` — build breaking from a non-own-page cause.
- `CALCULATOR_IDEA`, `COMPONENT_IDEA`, `CROSS_NICHE_LINK`, `FACTUAL` — also valid.

Flags never block. Sessions continue work after flagging.

### 13.3 What sessions ask manager (Q&A channel)

Use Q&A only when:
- Cannot make progress without manager decision AND
- Answer is not in brief, house positions, or session's judgement.

Examples from Wave 1:
- Session A Q-1: "worktree branch missing the entire Track 1 scaffold" (legitimate blocker).
- Sessions used flags for the rest.

### 13.4 What sessions log to discovery (no action needed)

`wave<N>_discovery_log_session_<X>.md`:
- `ADJACENT_TOPIC` — competitor covers something we don't, not in topic_gaps.
- `CALCULATOR_IDEA`, `COMPONENT_IDEA`.
- `EXISTING_PAGE_STALE` — existing page with stale figures/framing.
- `EXISTING_PAGE_LINK_OPPORTUNITY`.
- `AUTHORITY_GAP` — HMRC manual / legislation never cited on our site.
- `CROSS_NICHE_LINK`.

Manager reads at wave end; feeds future waves and Track 2 sweep.

### 13.5 Manager approval gates

Sessions DO NOT need manager approval for:
- Routine page writes (the brief is the authorisation).
- Committing on their own branch.
- Marking tracker rows.
- Adding redirects per brief.

Sessions DO need manager authorisation for:
- Fix-up commits to a previously-committed page (e.g., B2 CIHC fix-up). Manager authorises via Q&A note.
- Deleting or substantially restructuring an existing live page.
- Cross-branch edits (manager handles).
- Anything touching `main` directly.

### 13.6 Manager calibration interventions

If quality drifts (word count, FAQ count, templating, framing), manager appends M-note to Q&A file with the calibration. Wave 1 examples:
- M-3 / M-4: word count calibration (5,428 → 2,800-3,500 target).
- M-5: B2 CIHC fix-up authorisation.

Don't calibrate by editing the brief mid-flight. Always Q&A note so the audit trail is clear.

---

## 14. Manager self-awareness and handoff

You are powered by a model with a finite context window. Output quality degrades as context fills with tool results, conversation, and accumulated state.

### 14.1 Signs of degradation

- You catch yourself summarising tool results that are still visible (forgetting you can re-read).
- You make factual claims without verifying (assuming your training data is current).
- Your responses get longer and more hedged.
- You forget instructions from earlier in the conversation.
- You miss patterns across sessions (e.g., a flag in one session relevant to another).
- You delay decisions that need to be made now.
- You skip verification steps you would have done earlier.

### 14.2 What to do when you notice degradation

1. **Tell the user.** Explicitly: "I'm starting to feel context pressure; I want to write a handover update and stop." Do not push through silently.
2. **Update this doc** (`NETNEW_PROGRAM.md`):
   - Section 3 (Where we are now) — current wave state, completed work, open work.
   - Section 17 (Lessons learned) — anything from this session that should compound.
   - Section 21 (Open decisions) — anything pending.
3. **If a wave is mid-flight:** ensure the wave tracker, flags, and Q&A files are up to date so a fresh manager can pick up immediately.
4. **Stop.** Don't accept new work.

### 14.3 Handoff to fresh manager

The user opens a fresh Claude Opus session and points it at this doc. The fresh manager:
1. Follows §0 pickup checklist.
2. Reads the current wave state.
3. Acknowledges with the short status line.

If a session asks a Q&A while a manager handoff is in flight, the wave's session-side watchers will keep the sessions productive (they can work on other pages while waiting). The fresh manager picks up open questions on arrival.

---

## 15. Manager tracking discipline

Manager tracking is a balance: enough state to coordinate, not so much that it eats context.

### 15.1 What manager DOES track

- **Current wave state** — which session is on which page, latest commit per branch, open flags, open questions. Track via files (tracker, flags, Q&A) not via TaskCreate.
- **Pending cleanups** — post-merge work queued in this doc §3 or in a "Post-Wave-N cleanups" subsection.
- **Lessons learned** (this doc §17) — only the durable ones that change behaviour next time.
- **Open decisions** (this doc §21) — explicit list of things the manager + user haven't decided.

### 15.2 What manager does NOT track

- Every commit, every read, every minor edit.
- Verbose narration of what was done.
- TaskCreate for trivial single-action work.

### 15.3 When to use TaskCreate

Use sparingly. Worth a TaskCreate when:
- Multi-step work with clear sequential dependencies and >30 min duration.
- Work that spans multiple manager turns (so the next turn can resume cleanly).
- Work where the user benefits from seeing progress.

NOT worth a TaskCreate for:
- Single edits.
- Single tool calls.
- Verification checks.
- Q&A responses.

### 15.4 Periodic compaction

After every wave: update this doc, archive the wave's tracker/flags/Q&A (don't delete — they're the audit trail), update §17 with new lessons.

---

## 16. Lessons learned (running log)

Append to this section after every wave. Each lesson should describe what happened + what changed + why future managers should care.

### Wave 1 (2026-05-22)

**16.1 Tooling gaps**
- `optimisation_engine/competitor/_db.py` is untracked in git. Worktrees freshly created from main are missing it. Sessions need it for the `monitored_pages` Supabase insert (step 13). Fix: manager copies into every new worktree pre-launch.
- `.env` is gitignored (correctly) but worktrees need it. Without it, any `from optimisation_engine.*` import fails at config.py. Fix: manager copies into every new worktree pre-launch.

**16.2 Procedural gaps**
- Multiple sessions marked tracker `✅ done` before committing. Calibrated via M-2 / M-5 manager notes mid-wave. Bake into START_HERE for Wave 2+.
- Wave 1 worktrees were created before the brief scaffold landed on main, so each session opened on a branch 2 commits behind main. Fix: every wave's pre-launch checklist now includes "fast-forward each worktree branch to current main".

**16.3 Factual catches**
- **Six-dwellings rule** (Session A flag, 2026-05-22T02:00Z). House positions doc cited Sch 6B para 7 FA 2003 (definitional, unrelated rule) and called it an "election". Correct: **s.116(7) FA 2003**, automatic statutory deeming. Fixed in house_positions + A2 + manager-broadcast to B and C. Pattern: multi-session design caught it because Session A wrote a downstream page that surfaced the inconsistency.
- **CIHC carve-out** (Session B flag, 2026-05-22T10:20Z). B2 overstated CIHC scope by claiming BTL SPVs are CIHCs. Correct: most BTL SPVs are NOT CIHCs because the **s.18N CTA 2010 qualifying-purpose carve-out** takes unconnected-tenant land investment out of CIHC status. Manager fix-up commit on B's branch with revised worked example (marginal relief instead of flat 25%). Pattern: same as six-dwellings — downstream session caught upstream session's error.

**16.4 Word-count drift**
- Wave 1 initial pages overshot guidance (4,142 / 5,428 / 4,332 total words; target was 2,500-3,500 body). Calibration broadcast in M-3/M-4. Subsequent pages: 2,652-3,845 body words.
- **Body words ≠ total words.** Total includes frontmatter + FAQ JSON (typically +1,000-1,500). Sessions report body words; manager spot-checks via `wc -w` total then adjusts.

**16.5 Anti-templating held**
- 10 SDLT pages in Session A could have read like 10 versions of the same page. Each brief's framing differentiator kept them distinct. Manager spot-check after page 3 confirmed no drift.

**16.6 Multi-session pattern worked**
- The append-only flags + Q&A channel + manager broadcast pattern caught two factual issues that would have shipped wrong in a single-session pass. Both went from flag → verification → fix in under an hour. This is the system's core value proposition.

**16.7 Manager-side watcher worked**
- ~20s latency from new `STATUS: open` question to manager notification. No false positives. No missed events. Worth keeping the design.

**16.8 Session-side watcher missing in Wave 1**
- When manager answered a question, sessions saw it only on manual re-read. User had to ping sessions when answers landed. Wave 2+ adds session-side watchers (see §8.4).

**16.9 Sessions interpret "finished"**
- All three sessions reported "finished" after their first context-burning batch (Wave 1 day 1: A 4/10, B 3/8, C 4/13). User relaunched fresh sessions to continue. Pattern: "finished" means "out of context"; manager verifies actual completion via tracker + branch log.

**16.10 Sessions' tracker notes are gold**
- Each session's tracker note for a completed page captured: framing differentiator, key citations, body word count, worked-example saving figures, any deviations from brief. Reading the tracker = fast triage. Don't lose this practice.

### Wave 2 (2026-05-22)

**16.11 Token-Jaccard cannibalisation matcher breaks on novel topical clusters**
- The brief builder's "Closest existing pages" selector (`scripts/property_track1_brief_builder.py` / `_wave2_brief_builder.py`) scores by literal slug + title + h1 token overlap. Worked OK for Wave 1 (SDLT / Ltd Co / VAT / FIC clusters all share heavy token overlap with existing pages) but **systematically broke for Wave 2** — IHT and DTA slugs share few tokens with the existing 316 pages, so the script returned `what-is-aia-in-tax` / `vat-calculator` / `capital-allowances-on-property` as "closest matches" while missing the obvious neighbours (`inheritance-tax-rental-property-uk-guide`, `non-resident-landlord-scheme-uk-complete-guide`, etc.). Manager spawned three Opus reasoning sub-agents during pre-launch to regenerate the closest-existing + competitor URL sections of all 30 briefs. **Lesson:** before Wave 3, either rewrite the cannibalisation script to use sentence-embeddings (e.g. via DeepSeek/Anthropic), or build the reasoning regen step into the standard wave-prep workflow rather than as a post-hoc fix.

**16.12 Sessions correct house positions via downstream research — formalize the loop**
- Two Wave 2 sessions surfaced house position corrections during their work. A6 (April 2025 IHT residence test) found the LTR test has **two routes** (10 consecutive OR 10 of 20), where the locked position only named the 10-of-20 route. C8 (April 2025 non-dom reform) found the TRF runs **3 years at 12%/12%/15%** per Autumn Budget 2024 extension, where the locked position had it as 2 years at 12%. Both corrections logged via HOUSE_POSITION_CONFLICT flag and verified by manager post-merge. **Lesson:** sessions doing focused page research consistently outperform the pre-wave statute-verification pass on specific edge cases. Build the HOUSE_POSITION_CONFLICT flag-flow more explicitly into future waves — manager should expect and welcome 1-3 corrections per wave.

**16.13 Cross-bucket CANNIBAL coordination held without manager intervention**
- Three cross-bucket pairs were flagged at prep time: B6 UAE ↔ C6 Dubai (treaty mechanics vs landlord pathway), B7 Italy ↔ B8 generic (bilateral applied vs cascade explained), B10 CD ↔ C9/C10 (NRCGT framing overlap). All three pairs resolved cleanly through the briefs' explicit cross-reference notes — sessions wrote pages that knew about their sibling page, and raised back-patch F-XX flags rather than re-covering the same ground. **Lesson:** cross-bucket cannibalisation flags in the BRIEF (not just in the flags file) work as a coordination mechanism. Bake into Wave 3 prep agent's brief-generation step.

**16.14 Continuation handovers cost ~5-10% throughput; tracker discipline drifts at handover boundaries**
- Each Wave 2 session ran out of context around page 4-5 of its initial run, requiring 1-2 fresh-session relaunches. At each handover boundary, the outgoing session typically committed its current page (step 14) but did not flip the tracker (step 16) before stopping. The next continuation session has to back-patch the tracker as its first action. **Lesson:** bake "if you commit a page but feel context-pressured, flip the tracker IMMEDIATELY before stopping — this is the single most important handover hygiene item" into the continuation prompts. Also: encode the back-patch-on-startup step as an explicit FIRST ACTION in continuation prompts (already done in Wave 2 continuation prompts).

**16.15 Single-shared-tracker approach worked, but each branch's tracker copy drifts**
- Sessions edited the main repo's tracker file via absolute paths from inside their worktrees, so the live state was always in main. Worked well for cross-session visibility, but each worktree's committed-tracker copy stayed at the prep state (b9e783a). This caused merge conflicts on B branch (where Session B's session DID commit tracker edits on its branch, conflicting with main's live tracker at merge time). **Lesson:** for Wave 3, make tracker-edits-on-branch a documented anti-pattern. All session-time tracker edits go to the main repo file via absolute paths; no committed-on-branch tracker edits.

**16.16 Word count discipline calibration improved from Wave 1**
- Wave 1 needed mid-wave M-notes to calibrate from 4-5k bodies back to 2.5-3.5k. Wave 2 sessions self-calibrated: 27 of 30 pages in band 2,500-3,500, with the 3 over-shoots (A6, A7, B8, B9, B10) each documented in tracker Notes with explicit justification (regime complexity, multi-operational coverage, cascade walk-through, computational page, multi-jurisdiction). B4 came in under floor (2,312) with explicit calibration note (competitor median shorter). No drift, no manager intervention required. **Lesson:** the framing-differentiator-led word count (write to topic, not target) discipline works once sessions internalize it.

**16.17 Three regen agents hit rate limit; finish-each-brief-end-to-end recovery worked**
- During Wave 2 pre-launch, three parallel Opus regen sub-agents (one per bucket) hit a rate limit ~10 min in. Only 3 of 30 briefs were partially regenerated before the limit. Recovery: waited for reset, re-spawned with skip-lists for the 3 already-done briefs and an explicit "finish each brief end-to-end before moving on" instruction. Second run completed cleanly. **Lesson:** for any parallel sub-agent batch, instruct each agent to finish complete work units atomically rather than half-finishing many. Reduces rate-limit damage at the worst moment.

### Wave 3 prep (2026-05-22)

**16.18 Reasoning-first must be loud, even when §16.11 is captured**
- First attempt at Wave 3 Stage 1 launched a sub-agent that defaulted to running `scripts/property_wave2_brief_builder.py` + `scripts/property_cannibalisation_check.py` for selection and closest-existing — exactly the token-Jaccard trap §16.11 flagged as broken on novel topical clusters. User caught it before damage and called it out. Manager stopped the sub-agent and re-launched with an explicit "Reasoning-first, NOT Python" framing block at the top of the prompt, including the literal instruction "If you catch yourself reaching for a similarity script to make a decision, stop and reason directly instead." **Lesson:** when a wave-prep prompt references prior lessons (§16.11) it is not enough; manager must *also* spell out the prohibited specific scripts AND the affirmative reasoning behaviour in the prompt header. The default-to-Python pull is strong even after the lesson is on paper.

**16.19 Manager review gate between Stage 1 and Stage 2 catches top-level swaps**
- The Wave 3 Stage 1 sub-agent correctly flagged C1 cannibalisation against an existing stale-citation page but could not resolve it (sub-agents cannot pause and ask for direction mid-flight). Manager review gate between Stage 1 and Stage 2 caught this, made the swap decision, and resolved cleanly before Stage 2 reasoning began. The swap moved the original C1 (a stale-citation rewrite candidate) onto the legacy-rebuild track as F-1, and brought in a genuinely net-new replacement (RRA 2025 enforcement / civil-penalty defence) for the C1 slot. **Lesson:** the Stage 1 / Stage 2 split is the right structural pattern for wave prep — keep it. Stage 1 emits artefacts + surfaces decisions; manager reviews + decides + writes the surgical updates; Stage 2 fans out for the heavy reasoning work. Build a 5-10 minute manager-review gate into the standard wave-prep workflow.

**16.20 Factual catches at prep time can supersede whole house-position sections**
- Stage 1 verification against legislation.gov.uk surfaced that the Renters' Rights Act 2025 (2025 c. 26) received Royal Assent on 27 October 2025 — not "in passage" as house position §12 framed it (correct when written, now stale). §20 was added as a full supersedure, §12 retained as audit. Implication: every existing Property page that references "RRA 2026" / "Renters Rights Act 2026" / "Renters Rights Bill" is now incorrect; site-wide back-patch flagged as Wave 3 F-1. **Lesson:** when a wave's house-position extension covers a topic where the existing house position used an "in passage" / "scheduled, pending Royal Assent" / "to be confirmed" placeholder, automatically commission a site-wide back-patch sweep of the existing inventory as part of the wave's hygiene queue, not as an afterthought.

**16.21 Competitor set is hand-curated, not SERP-derived**
- `scripts/property_topic_gap_finder.py` hard-codes 13 competitor domains; `property_topic_gap_filter.py` narrows to 4. SERP-derived discovery data exists (`competitor_serps` + `serp_runner.py`) but is siloed in the per-page rewrite playbook track. Net-new candidate discovery has therefore been narrower than the available data supports. User flagged 2026-05-22. **Lesson:** the candidate-discovery pipeline and the per-page-rewrite competitor pipeline should share their competitor universe. Slated as infra deliverable between Wave 3 and Wave 4: replace the hand-curated list with a frequency-weighted SERP-derived list (likely 30-50 genuine competitors), with per-URL annotation of which queries each ranks for + at what position so triage becomes data-led.

### Wave 3 execution (2026-05-23)

**16.22 The Bill-vs-enacted-Act drift is a structural pattern, not a one-off catch**
- Wave 3 caught two drifts in locked house-position sections: F-6 §19.7 (MTD ITSA late-payment day-triggers 31/46/91 → 15/30/31 per Spring Statement 2025) at Stage 2 prep, and F-11 §20.7 (RRA 2025 pet rights — three substantive corrections: no pet damage insurance condition, narrow s.16B(4) refusal grounds, County Court remedy not FTT) mid-wave during C7. Both were locked in good faith but tracked Bill drafting or pre-reform mechanics rather than the enacted text. **Lesson:** for any wave's house-position extension that touches a recently-enacted Act or a recently-reformed regime, automatically commission a pre-wave statute-verification pass that diffs the locked position against the current legislation.gov.uk text. Build this into the §6 wave launch protocol as a standard step. Sub-agent task, ~30 min per topic area.

**16.23 A zero-Q&A wave is the prep-quality signal**
- Wave 3 sessions raised zero Q&A across all three buckets (A/B/C). Sessions self-directed end-to-end on reasoned briefs with explicit framing differentiators + cannibalisation discipline + bucket-specific authority links. Compared to Wave 1 (1 Q&A) and Wave 2 (~3 Q&A), the trajectory shows that prep-time reasoning depth (Stage 2 sub-agents + manager-review gate per §16.19) translates directly to in-flight session productivity. **Lesson:** treat zero-Q&A as a deliberate prep-quality target, not just a happy accident. If a wave's prep produces briefs that need manager arbitration mid-flight, the prep was light. Conversely, the temptation to skip the Stage 1 → manager review → Stage 2 split saves preparation time at the cost of wave-execution latency.

**16.24 Post-merge factual back-patches are mandatory when new pages contradict existing inventory**
- Wave 3 shipped MTD ITSA pages with corrected quarterly deadlines (7 August / November / February / May) and the Spring Statement 2025 late-payment schedule (3%/3%/10% at 15/30/31 days). Three existing pages on `main` carried the legacy figures (5-of-month deadlines, 2%/2%/4% schedule, in one case 5%/5%/5%). Without the F-7B + F-9 back-patches, the site would have shipped self-contradicting figures across neighbouring pages — visible to any reader cross-referencing. **Lesson:** add an explicit "scan for stale-existing-page back-patches" step to the wave-close process, between the bucket merges and the program-doc update. F-7B and F-9 were correctly flagged at session time; the manager-side aggregation discipline is what closes the loop. Sessions flagging F-XX with `EXISTING_PAGE_STALE` is now a load-bearing signal.

**16.25 Manager handover requires explicit worktree-branch ff-verification**
- Wave 3 prep Stage 1 + Stage 2 commits (`730add8` → `7d9d664`) landed on `main` but the previous manager closed the prep session without fast-forwarding the three Wave 3 worktree branches (`property-wave3-{a,b,c}`). The branches stayed at `8272c33` (Wave 2 post-merge HEAD), meaning the worktree checkouts physically didn't contain `briefs/property/wave3/`, the START_HERE docs, the corrected §§18-20 of `house_positions.md`, or the F-1 through F-6 flags. Sessions would have hit file-not-found on the first pickup-checklist read. Caught by the incoming manager at session-start verification (the user-facing acknowledgement was held while the ff blocker was surfaced). **Lesson:** the pre-launch checklist §6 step 4 ("fast-forward each worktree branch to current main") needs to be a verification-on-handover step, not just a one-time prep step. Any manager handover after wave-prep commits land on main must explicitly verify each worktree branch HEAD matches main HEAD before sessions are launched.

**16.26 Cross-bucket forward-link sweep at session-end is the right backstop, but mid-wave continuation handovers break it**
- Session C raised F-7C at C1 write (C1 needed forward-links to C5/C6/C9 once they existed). The flag was logged "end-of-session back-patch sweep should verify all four targets resolve". The Session C continuation that closed C9/C10 did not execute the in-session sweep before stopping. Result: C1 → {C5, C6, C9} forward-links were unhyperlinked plain text at merge. Manager picked it up in the post-merge cross-link batch (F-4 + F-7C + F-8 commit `6edc5d8`). No content damage but added one round-trip. **Lesson:** for any session-end back-patch sweep that depends on cross-page forward-links resolving, hard-encode it as Step 20 in the per-page workflow rather than relying on session-end discipline. Or: make it a manager-side post-merge step by default, and treat session-end as best-effort.

### Post-Wave-3 hygiene (2026-05-23 PM)

**16.27 Pre-wave statute verification is now a load-bearing standard step**
- Three §20-vs-enacted-Act drifts caught in succession across Wave 3 and post-Wave-3 hygiene: F-6 §19.7 (Wave 3 Stage 2 prep, MTD ITSA day-triggers), F-11 §20.7 (mid-Wave 3, pet rights), F-12 + F-13 (post-Wave-3, RRO maximum + Ombudsman cap). All three involved locked positions that tracked Bill drafting or pre-reform mechanics rather than enacted text. **Lesson:** §16.22's "structural pattern" call is firmly load-bearing. The sub-agent-driven verification pattern (~45 min, structured per-section verification report, no in-flight Q&A needed) is the right shape for this work. Build into §6 wave launch protocol as a mandatory pre-launch step for any newly-locked legislation. Use the full enacted-Act PDF (`legislation.gov.uk/ukpga/<year>/<chap>/data.pdf`) as the source of truth when per-section WebFetch returns only summary content.

**16.28 Sub-agent-driven inter-wave queue closure works as a pattern**
- Post-Wave-3 inter-wave hygiene was dispatched as three concurrent background sub-agents (competitor discovery + sitemap re-sweep / §20 verification / F-1 RRA-2026 back-patch). All three operated on non-overlapping file surfaces, returned structured reports, and the manager-side review-and-apply step took ~20 minutes per returned agent. Total wall-clock ~3-4 hours for work that would have been ~12+ hours of direct manager execution. **Lesson:** for inter-wave queue items that decompose into deterministic multi-step work with clear file outputs (verification reports, audit manifests, mechanical citation corrections), default to parallel sub-agent dispatch with structured-report return. Manager owns the review + apply step, not the discovery + drafting step.

**16.29 F-1 site-wide back-patch scope can be much smaller than the lesson-of-record assumes**
- §16.20 framed the post-F-1 site-wide back-patch as "every existing Property page that references RRA 2026 is now incorrect" (implying broad inventory contamination). Actual F-1 execution found only 3 stale-citation files across 376 markdown files. Reason: Wave 3 sessions had used correct citations throughout their own work, and prior cleanups had already caught most pre-Wave-3 stale references. **Lesson:** log lessons-of-record at worst-case scope (so they prompt sufficiently-broad sweeps), but track actual execution scope as a separate signal. A back-patch sweep that finds 3 files instead of 30 is not a wasted sweep; it's positive feedback that prior discipline + cumulative correctness held. Reserve manager judgement on whether subsequent back-patches require a full sweep or a targeted grep.

### Wave 4 execution (2026-05-23)

**16.30 Fourth Bill-vs-enacted-Act drift confirms §16.27 is mandatory, not optional**
- F-18 §15.4 caught via Wave 4 C8 session-time gov.uk WebFetch. This is the **fourth Bill-vs-enacted-Act drift in succession** (F-6 §19.7 Wave 3 prep, F-11 §20.7 mid-Wave 3, F-12 + F-13 §20.10 + §20.5 post-Wave-3 verification, F-18 §15.4 mid-Wave 4). Pattern: any house position locked from announcement-era policy material is liable to drift against enacted text by the time the next wave touches it. **Lesson:** §16.27 (pre-wave statute verification mandatory for newly-locked legislation) extends to ANY locked position carrying a "verify before relying" hedge — when the hedge is still active at next wave's launch, the verification IS the next-wave prep step. Don't keep "verify later" notes in locked positions across multiple waves; verify at next gate. If the position can't be verified yet (e.g., consultation pending), say so explicitly and put a re-verify date in the locked position itself.

**16.31 Stage 2 URL verification step is high-value, not low-cost overhead**
- Wave 4 Stage 2 sub-agents caught **4 dead / misrouted / off-topic Stage 1 seed URLs** across 30 briefs: A1 misrouted to A3 topic (sub-agent fixed); B3 lndo.site staging URL (should never have been public-facing; replaced); B9 off-topic (replaced with provestor cessation page); B10 homepage redirect (replaced with provestor MTD help + rentalbux OCR guide). Stage 1 selection trusts v2 universe membership without per-URL liveness check; Stage 2's verify-with-httpx step catches the dead/misrouted seeds before they reach sessions. **Lesson:** keep the Stage 2 URL-verify step explicit in the dispatch brief. 13% catch rate (4/30) on Stage 1 seed quality issues — significant enough that the verification step earns its place. Without Stage 2 verify, those four briefs would have shipped to sessions with broken or off-topic URLs that sessions would have hit at write time (and pulled forward into Q&A or session-time triage, undermining the §16.23 zero-Q&A target).

**16.32 Cross-bucket boundary policed via launch-prompt sequencing constraint works in practice**
- Wave 4 C7 (`fic-estate-planning-landlord-portfolio-value-freezing-iht-mechanics`) was written LAST in Session C, AFTER Session A's A6-A10 (FIC operational mechanics) had shipped on the A branch. The launch prompt for Session C explicitly mandated this sequencing for C7. Session C wrote C7 with 5 cross-bucket forward-links to A6/A7/A8/A9/A10; those links resolved cleanly at the bucket-merge step. C7's framing differentiator stayed strictly in the strategic-IHT lane and explicitly enumerated "where mechanics live" (A6 articles, A7 governance, A8 retirement income, A9 share-gift mechanics, A10 blended-family persona) without re-walking any of them. **Lesson:** for the highest-risk cross-bucket cannibalisation pairs in any future wave, add an explicit sequencing constraint in the launch prompt ("Session X writes page Y last, after the corresponding Bucket Z pages exist on the Z branch"). Stronger than dispatch-brief framing alone because the writing session can verify the sibling pages exist on disk before citing them. The Wave 2 §16.13 cross-bucket-cannibal-flag-in-brief pattern is the floor; the launch-prompt sequencing constraint is the ceiling.

**16.33 Third consecutive zero-Q&A wave confirms the prep pattern is durable**
- Waves 2, 3, and 4 have now each landed with **zero Q&A** across all three sessions. Across 90 pages of sustained net-new content, no session has hit a blocker requiring manager arbitration mid-flight. The §16.23 zero-Q&A-as-prep-quality-signal pattern is not a one-off; it's the operating point that the Stage 1 → manager review → Stage 2 reasoning → launch-prompt-with-constraints pipeline produces. **Lesson:** the prep cost (~3-4 hours of manager + sub-agent time per wave including Stage 1 + manager-review + Stage 2) buys ~10-15 hours of session productivity per session per wave (3 sessions × ~3-5 hours of friction-free writing each = ~10-15 saved session-hours per wave). The ROI is roughly 4-5× on prep investment. Maintain the discipline; do not skip Stage 1 or the manager review gate to save preparation time.

### Wave 5 prep (2026-05-23)

**16.34 Wave 4 discovery raw counts overstate true net-new lift; ~90% carry cannibal risk against current inventory**
- User correction 2026-05-23 mid-Wave-5 prep: the `topic_gaps_delta_2026-05-23.md` raw "net-new" classification (~1,136 candidates) was generated against the v2 competitor universe (243 domains, broader than the original 13-domain seed) but the cannibalisation check ran against the original narrower existing-inventory baseline. ~90% of the 1,136 carry meaningful overlap with one or more of the 121 already-shipped net-new pages + the 285 legacy pages on `main`. True net-new lift on top of the existing 164-narrowed-pool is only a handful, not 1,136. **Lesson:** when a Wave-N discovery delta reports a "large expansion" against prior baselines, treat the raw classification count as an UPPER bound. The actionable pool size is the *re-verified-against-current-inventory* count, which requires running the cannibalisation check against the actual current state (including the prior wave's outputs). For Wave 5 onward, treat the 164 narrowed pool + Wave 4 verified handful as the candidate inventory; do not plan multi-wave roadmaps off the raw 1,136 figure. Bucket viability for each Wave 5+ wave depends on candidate count in the narrowed pool + verified-net-new delta, not the raw classification count.

**16.35 Bill-vs-enacted-Act drift verification graduates from pre-wave to per-write check**
- F-19 (employer NI 13.8% → 15%) + F-20 (dividend basic+higher 8.75%/33.75% → 10.75%/35.75%) caught at Wave 5 pre-launch via the statute verification sub-agent (§16.27 pattern). These are the **fifth and sixth consecutive** Bill-vs-enacted-Act drifts in the program (after F-6 §19.7, F-11 §20.7, F-12+F-13 §20.10/§20.5, F-18 §15.4). Pattern is now so reliable that pre-wave statute verification alone is insufficient — every locked numeric figure in §21 (and any equivalent cluster) is liable to drift between waves as Budget cycles and Finance Acts proliferate. **Lesson:** graduate verification from "pre-wave statute verification sub-agent" to a **per-write discipline**. Every session writing a page that cites a numeric tax rate, threshold, or allowance should WebFetch gov.uk at write time to verify the figure before committing. The §16.27 pre-wave sub-agent remains valuable for surfacing house-position-level stale figures upstream but does not replace per-page verification. Update §7 session workflow to add explicit "verify every numeric tax figure against gov.uk at write time" step; §16.27 pre-wave sub-agent becomes a backstop, not the primary defence.

### Wave 5 close (2026-05-23)

**16.36 Stage 2 brief-template needs a statutory-citation cross-check gate before Wave 6**
- Wave 5 §16.35 per-write verification caught **4 independent brief-quality errors** across all 3 buckets in a single wave: A8 brief mis-cited VATA 1994 s.50A + Sch 4A para 9 for the long-stay reduced-value rule instead of Sch 6 para 9 (TOMS / place-of-supply vs valuation special-cases); A9 brief asserted a cladding-remediation VAT zero-rate "Sch 8 Group 5 Item 4A" that does not exist in statute or HMRC guidance (significant — would have shipped wrong content at 0% rather than the correct 20% standard rate if the session had propagated the brief); B5 brief cited LTTA 2017 s.34 (unit trust schemes) for return amendment when the correct cite is TCMA 2016 s.41 / s.63 / s.78; B10 brief referenced FA 2003 Sch 7 Part 2 (the English SDLT parallel) for Scottish acquisition relief when the operative Scottish base is LBTT(S)A 2013 Sch 11. All four caught and corrected at write time by the per-write §16.35 mandate (factual §16.33 zero-Q&A pattern preserved). **Pattern:** Stage 2 reasoning sub-agents generate verbatim-plausible statutory citations without verifying them against legislation.gov.uk; the briefs look authoritative but contain section / paragraph drift. 4 catches in 30 briefs is a 13% error rate at brief level. **Lesson:** before Wave 6 Stage 2 dispatch, add an explicit "statutory-citation cross-check" step to the Stage 2 sub-agent prompt: every section / schedule / paragraph cited in a brief should be WebFetched against legislation.gov.uk during brief generation, with the verbatim section title quoted back. The §16.35 per-write verification remains the final defence but should not be the only defence; tightening Stage 2 reduces load-bearing weight on session-time correction.

**16.37 §16.15 worktree-vs-main Q&A discipline is repeating — bake into launch prompts more prominently**
- Wave 5 Session B raised Q-1 (templating spot-check at B3 gate per launch-prompt instruction) but wrote the Q&A to the **worktree's** copy of `wave5_questions_session_B.md` rather than main's copy. Manager noticed when checking the file path. The §16.15 violation pattern (tracker / flags / Q&A edits going to branch copies instead of main absolute paths) has now appeared in Wave 4 (Session A flag F-2 propagated by continuation session) and Wave 5 (Session B Q-1 propagated by manager). **Pattern:** §16.15's launch-prompt phrasing is in the START_HERE Universal Rules section but not prominent enough that sessions internalise it at the first Q&A moment (the most common §16.15 trigger). **Lesson:** Wave 6 launch prompts should call out the Q&A path discipline in a top-level paragraph rather than relying on sessions to find it in Universal Rules. Recommended wording for the launch prompt: "**Q&A discipline (§16.15 critical):** when raising a Q to manager, append to `C:/Users/user/Documents/Accounting/docs/property/wave6_questions_session_{X}.md` via ABSOLUTE PATH from your worktree, NOT to the worktree's relative-path copy of the file. Manager polls main's path only; questions written to the worktree's relative-path copy are not seen by the monitor and require manual user-side propagation."

### Wave 6 prep (2026-05-23 PM)

**16.38 Manager-written statutory citations in sub-agent dispatch prompts are themselves drift-prone — verification-on-dispatch pattern is mandatory**
- Wave 6 Stage 1b (statute-verification sub-agent for §22 extension + new §25 CAA 2001 cluster) caught **5 brief-instruction errors in the manager's own dispatch prompt** via the explicit "WebFetch every statutory cite against legislation.gov.uk" mandate: (i) FHL abolition incorrectly stated as FA 2024 Sch 5 (correct: FA 2025 Sch 5; FA 2024 Sch 5 is museums/galleries); (ii) SBA residential exclusion as s.270BG (correct: s.270CF; s.270BG is land-acquisition); (iii) ITTOIA 2005 s.628 as a "5% rule" (correct: charities exception, no 5% rule); (iv) FYA section identities partially wrong (s.45EA is EV charging not s.45K; s.45O is Freeport; s.45K is designated assisted areas); (v) **IHTA 1984 s.48(3)-(3F) OMITTED in full by FA 2025 s.45 from 6 April 2025**, replaced by new s.48ZA — citing s.48(3) per the brief would have been the **seventh consecutive Bill-vs-enacted-Act drift** in the program. **Pattern:** the manager's dispatch prompt is not authoritative; it carries the same drift risk as locked house positions (the manager's training data and memory go stale between waves). The §16.27 / §16.30 / §16.35 / §16.36 pattern of "sub-agent verifies every cite against legislation.gov.uk" extends upstream to apply to the DISPATCH PROMPT itself, not only to locked positions or session-time writes. **Lesson:** every sub-agent dispatch prompt that contains statutory citations must instruct the sub-agent to verify each cite as part of its task — and to return any prompt-level errors as drift catches. Wave 6 Stage 1b returned 5 such catches; Stage 2 dispatch prompts should also carry this instruction. The pattern shifts manager confidence in own-prompt accuracy from "default trust" to "default verify" and accepts the time cost as the price of correctness.

**16.39 Stage 1b also catches existing-position drift, not just brief-prompt drift**
- Wave 6 Stage 1b independently flagged existing **§22.5 spouse-exemption framing for non-UK-domiciled spouses** as carrying pre-FA-2025 architecture (the s.18(2) limited exemption + s.267ZA election framework was written before the FA 2025 reforms shifted the operative criterion from domicile to long-term-residence). The sub-agent did NOT correct §22.5 (out-of-scope for its task) but surfaced the drift for separate manager review. **Pattern:** statute-verification sub-agents working on adjacent-cluster extensions naturally surface drift in existing-cluster positions where the existing position cross-references the same statutory anchors. The sub-agent's verbatim WebFetch discipline catches stale positions that would otherwise persist until a wave specifically touches them. **Lesson:** Stage 1b dispatch prompts should explicitly invite drift catches in adjacent existing positions ("if your work surfaces a stale citation or framing in an existing locked position, surface it as a drift catch in your report — do not correct it in-place"). The manager then triages each catch: fix immediately if it blocks the upcoming wave, defer to inter-wave queue if not blocking. Wave 6 §22.5 drift is non-blocking (Bucket B picks cite §22.12-new not §22.5) → deferred to inter-wave queue.

**16.42 EXISTING_PAGE_STALE flag density tracks new-bucket statutory novelty + adjacent-content age (Wave 6 closes the pattern)**
- Wave 6 sessions doing §16.35 per-write verification on step-5 closest-existing reads raised **14 EXISTING_PAGE_STALE flags** vs Wave 5's 4 at the same step. Density delta correlates strongly with: (a) statutory novelty of the bucket (Wave 6 LtdCo/CTA/IHT touches FA 2025 + FA 2026 reforms that no prior wave has surfaced; Wave 5 VAT/Devolved/Form-17 was on more-stable statute); (b) age of the adjacent existing content (Wave 6 closest-existing reads pulled in W1 + W4 + legacy pre-program content, all of which predates FA 2025 + FA 2026 by 6-18 months). **Pattern:** when a wave opens new statutory territory, its sessions naturally surface drift in adjacent older content. The flag-then-back-patch cycle is the system catching itself — sessions reading old content for cannibal differentiation become drift-detection sensors.
- Three of Wave 6's catches are critical site-wide: F-9 s.455 → 35.75% (FA 2026 propagation), F-3 NRB freeze → 2031 (Spring Statement 2025 / Autumn Budget 2024 extension), F-6 `landlord-capital-allowances-tax-relief` recommends AIA on residential plant (CAA 2001 s.35 violation). **Lesson:** budget the wave-close back-patch step in proportion to the wave's statutory novelty. Wave 6 close requires ~6-10 site-wide back-patches (rate updates + slug repoints + cluster-misframing reframings). Wave 7+ planners should expect similar density when buckets touch newly-locked house positions or recently-reformed regimes.
- **The 10th + 11th drift catches in succession** (F-9 s.455; F-3 NRB freeze 2031) extend the §16.22 / §16.27 / §16.30 / §16.35 / §16.38 / §16.40 pattern with no decay. The program now has continuous drift detection across 11 consecutive Bill-vs-enacted-Act discoveries. Future managers should expect this to continue indefinitely as long as Finance Acts and statutory reforms keep landing at Budget cycles.

**16.43 Sub-agent dispatch validated for post-merge STALE sweeps at production scale (Wave 6 close)**
- Wave 6 close STEP 4 batch 2 dispatched a single general-purpose sub-agent on four site-wide EXISTING_PAGE_STALE sweeps in parallel: F-9 (s.455 rate-by-reference), F-10 (ss.464C/D omission), F-25 (s.491 trust standard rate band omission), F-16/B (intestacy £270k → £322k). Sub-agent ran for ~9 minutes, returned a 400-word structured report, patched 4 files with 11 edits, surfaced 1 carry-over issue in a Wave 6 page (B6 stale £1,000 figure inherited from Stage 1a brief seed) that the manager fixed independently, and reported zero false positives on two sweeps where the search space genuinely held nothing. **Pattern validated:** §16.28 sub-agent-driven inter-wave queue closure pattern works at production scale for grep-driven mechanical work where the action specification is precise (token to search, reframe to apply). Manager-side cost: 1 prompt + 1 report read + 1 follow-up edit = roughly 5 minutes of manager context. Manager-side savings: ~30-45 minutes of grep-and-edit cycle that would otherwise consume late-close-session context. **For Wave 7+ close planning:** decompose the post-merge back-patch step into (a) precise in-wave forward-link patches that require live page knowledge (manager does these), (b) mechanical pre-Wave-N-page back-patches that grep + reframe deterministically (sub-agent), and (c) middleware redirect adds (manager, single file). The 2:3 split (in-wave manager + bulk sub-agent + manager middleware) ran cleanly in Wave 6 close as 3 separate commits per batch.
- **Caveat for sub-agent prompts:** the agent must be told explicitly NOT to commit and NOT to touch newly-merged Wave N pages (the guardrail catches Stage 1a brief-seed inheritance). The Wave 6 prompt did both successfully. The agent also independently validated YAML escape syntax (`<a href=\"...\">` in double-quoted answer fields) by checking existing patterns before propagating, which avoided a class of subtle YAML parse errors.

**16.46 Five consecutive zero-Q&A waves (W3-W7) + manager-side prep maturation hypothesis**

- Wave 7 closed with **zero Q&A across all three sessions for the fourth consecutive wave** (W4 + W5 + W6 + W7 all factually 0; W5 had 1 procedural Q on templating spot-check that is not a factual blocker). This is now a 5-wave trend (W3 had 0 factual Q's too; the §16.33 lesson was logged at Wave 4 close).
- **Hypothesis: manager-side prep is now locking down enough statutory territory pre-launch that sessions have nothing to ask.** The pattern correlates with:
  - HP-lock depth: Waves 1-3 locked §§1-12 + §15-20 (basic frameworks); Waves 4-7 added §§21-27 + 8 mini-locks (specialist clusters). Sessions writing on specialist territory have explicit anchors, do-not-write lists, and disambiguation tables.
  - Stage 1b cross-check: Wave 7 caught 13 HP-lock drifts BEFORE any session opened a worktree. Wave 7 Stage 2 brief drafting caught 19 more before any session wrote a page. Sessions inherit a corrected drift baseline.
  - §16.41(d) watcher template hygiene: Wave 7 launched without the false-fire incident that hit Wave 6 launch. Sessions and manager share a cleaner observability layer.
- **Operational implication for Wave 8+ prep:** the manager-side-prep maturation has changed the manager's job. The bottleneck is no longer Q&A throughput at session run-time; it's manager precision at HP-lock + Stage 1b. Future managers should over-invest in HP-lock + Stage 1b verification (the §16.18 reasoning-first + §16.36 statutory cross-check patterns) and under-invest in Q&A watcher attention.
- **Risk to monitor:** zero-Q&A is not zero-defects. Wave 7 had 35 drift catches total across the lifecycle (13 HP-lock + 19 Stage 2 + 3 write-time). Sessions caught these via §16.35 per-write verification, but a session that skipped verification on a similar territory could ship a defect. The §16.33 zero-Q&A pattern is a **prep-quality signal**, not a **session-quality signal**.
- **Pattern-break watchpoints:** future waves touching brand-new territory (no prior HP lock + first-time statutory cluster) may regress to non-zero Q&A; that is expected and not a degradation. Treat zero-Q&A as a leading indicator only for prep-mature territory.

**16.45 Wave 7 HP-lock surfaced 12 drift catches in a single ~3-hour session — territory-novelty density extends from Stage 2 brief generation into HP-lock prep itself**

- Wave 7 HP-lock (Stage 0, pre-Stage-1a) surfaced 12 distinct drift catches across the 5 commits (§26 + §27 + §22.16-§22.18 + §25.11 + §1.A-§1.D):
  1. **§20.5 plural-schemes nuance** — RRA 2025 s.64 permits one OR MORE approved redress schemes; "single statutory ombudsman" is government policy intent, not on the face of the Act. In-place corrected at commit 1.
  2. **EPC C 2030 NOT enacted** — government aspiration only; no SI laid; current MEES floor remains EPC E + £3,500 cap under SI 2015/962. Critical do-not-write for Wave 7 A8 + A9.
  3. **BSA 2022 SI 2025/1368 is WALES commencement** (W. 225) — out of PTP England-only scope; not the England commencement chain.
  4. **Manager_prompt typo: "CTA 2010 ss.464M-Q"** does not exist — EOT bonus exemption is ITEPA 2003 ss.312A-312I; CTA 2010 ss.464A-D are close-company loan-to-participator anti-avoidance (Wave 6 §21.1 omitted).
  5. **TRS penalty is £5,000 max DISCRETIONARY, not graduated £100/£200/£300 tariff** — popular misconception corrected via TRSM80020 verbatim quote.
  6. **Manager_prompt typo: "Sch 4 para 5 linked-transactions"** — Sch 4 para 5 is exchanges; linked-transactions definition is at **FA 2003 s.108** (with s.108(1A) Scottish/Welsh exclusion).
  7. **Sch 15 partnership share is income-profit-share** (para 34), not capital/voting share — common SDLT-commentary drift.
  8. **MLR 2017 reg 45 itself has no penalty provisions** — the statutory hook is reg 76 + HMRC administrative tariff at TRSM80020.
  9. **CAA 2001 s.198(5) is NOT the 2-year time limit** — the 2-year deadline is at s.201(1) (with s.201(1A) tribunal extension).
  10. **EOT controlling-interest test is "more than 50%" (50%+1)** under TCGA 1992 s.236M — equal-50/50 splits fail. Common mis-statement as "at least 50%".
  11. **ITEPA s.312A bonus £3,600 per employer per tax year, not per employee** — and FA 2026 c. 11 mid-passage uplift to £4,800 means sessions writing post-FA-2026 Royal Assent must verify operative figure.
  12. **Bewley narrowed substantially by Hyman / Mudan / MHB / Brown** — operational position 2026 much tighter than the 2019 leading case; unmodernised "fixer-upper" properties remain residential.
- **Pattern.** §16.40 + §16.42 territory-novelty drift density continues at HP-lock stage, not just Stage 2. The HP-lock catch count (12 in ~3 hours) is **above** the Stage 2 Wave 6 catch density (6 catches in Bucket A alone) on a per-hour basis. **Two of the drift catches were errors in the Manager_prompt itself** (CTA 2010 ss.464M-Q fiction; Sch 4 para 5 mis-cite) — even the prep document was not drift-free; HP-lock manager must independently verify every statutory anchor named in the Manager_prompt, not just the picks.
- **Lesson for Wave 8+ HP-lock prep:** the manager handover document should be a starting point, not authority. Treat ALL statutory citations in the Manager_prompt as candidates for verification at HP-lock time, including those framed as "verified" or "confirmed" by prior managers. The §16.18 reasoning-first + §16.40 statutory cross-check patterns apply to HP-lock work itself, not just brief drafting.
- **Lesson for §16.43 sub-agent dispatch pattern at Wave 7 Stage 2:** HP-lock catch density signals that Stage 2 catch density will be at least as high. Budget sub-agent prompts accordingly (longer verification time per brief; explicit instruction to re-verify section attribution + dates + figures even for HP-locked positions).

**16.44 WebFetch summarizer can hide HTML-table content — trust session-time capture when secondary verification path can't see the data**
- During Wave 6 close STEP 1 verification of F-3 (NRB freeze 2031), the manager's three independent WebFetch attempts on the gov.uk IHT thresholds publication URL (`/government/publications/rates-and-allowances-inheritance-tax-thresholds-and-interest-rates` plus its `/inheritance-tax-thresholds` sub-page) returned summarizer text that could see only the page's update-history note (mentioning the earlier 2028 → 2030 extension) but could NOT see the actual threshold-table HTML cell. The session-time verification record in flag F-3 quoted the table cell verbatim ("from 6 April 2009 to 5 April 2031") — i.e. Session B's contemporaneous WebFetch at write time captured what the manager's re-verification could not. **Lesson:** when secondary verification cannot reproduce a primary observation, trust the session's contemporaneous capture over your own re-fetch IF (a) the session's flag cites the URL + quoted text + verification timestamp, and (b) the secondary failure is attributable to a known summarizer limitation (table content, large pages, JS-rendered content) rather than to a substantive disagreement. The manager documented this in the close commit message for audit-trail integrity. **For Wave 7+ post-merge verification:** if WebFetch returns ambiguous summary, prefer (a) trusting the session's quoted-text record if present, (b) dispatching a sub-agent for a deeper fetch with explicit instruction to extract table content, or (c) flagging the verification as ambiguous in the close commit rather than overriding the session's verified position.

**16.41 Manager activity-diagnosis discipline + watcher template hygiene (Wave 6 launch incident)**
- Wave 6 launch surfaced four related failure modes in the manager-side observability layer:
  - **(a) Q&A shell template hygiene.** The Wave 6 artefact-creation Python script populated each `wave6_questions_session_{A,B,C}.md` shell with a documentation example block containing the literal line `**STATUS:** open`. The Q&A watcher's grep pattern `^\*\*STATUS:\*\* open` matched the example on first poll, emitting three false-positive notifications at launch time (one per session, all timestamped the same second the watcher armed — a physical impossibility for real session activity). Fix applied: example placeholder changed to `<open initially; manager flips to: answered>`. **Lesson:** Q&A shell templates (and any file the watcher polls) must NOT contain literal pattern-matching text in their documentation examples. Use placeholders that will not match the watcher's grep. For Wave 7+ artefact-creation scripts, the example block should use brace-style placeholders consistent with the surrounding `{timestamp}` / `{slug}` convention: `**STATUS:** <open initially; manager flips to: answered>`.
  - **(b) Activity-check discipline: tracker is the primary signal of session activity, NOT Q&A.** Sessions write to the tracker continuously (every page claim flips ⬜ to 🟦; every commit flips 🟦 to ✅) via the §16.15 absolute-path discipline. Q&A files are sparse by design — they populate only when a session hits a blocker requiring manager arbitration. **Absence of Q&A activity does NOT mean sessions are inactive.** The watcher reports questions; the working tree reports activity. `git status` on main is the load-bearing diagnostic for "are sessions running right now". §0 has been updated to make this explicit.
  - **(c) Manager-side false confidence after a false positive.** After the watcher false-fired and the manager correctly diagnosed the template bug, the user reported "sessions are running for 5 minutes now". The manager doubled down on "no they aren't, the Q&A files are empty" instead of running `git status` first. First-principles check immediately revealed three sessions had each claimed their priority pages (Session A → A4 first per C2 cross-bucket dep; Session B → B4 priority for A10 gate; Session C → C1 pillar first). **Lesson:** any time a manager assertion is challenged by user observation, the manager should re-verify against first-principles signals (`git status`, file mtimes, `git log` per worktree) BEFORE re-asserting. Do not trust the manager's prior diagnosis over the user's direct observation. This is a §14 self-awareness extension: degradation signals include false confidence in a recently-formed diagnosis.
  - **(d) Watcher script improvement (recommended for Wave 7+).** The grep-for-STATUS-line pattern is fragile against template baselines. Two more robust alternatives: (i) count `## Q-\d+` heading occurrences rather than STATUS: open lines (Q heading count is monotonic — sessions only add Q headings, never remove them — and template baseline doesn't trigger because the shell example uses `Q-N` not `Q-\d+`); (ii) initialise watcher state to current count at arm time (rather than 0) so any existing template-matched baseline becomes the floor and only NEW additions trigger. Option (i) is cleaner; Wave 7+ launch convention should adopt it.
- **First-time win surfaced in same incident:** §16.37 launch-prompt top-level Q&A absolute-path discipline paragraph is HOLDING in Wave 6. All three sessions' tracker writes (page claims) landed in main's working tree via absolute path, not in worktree-local copies. Waves 4 + 5 violated §16.15 here; Wave 6 does not. The §16.37 lesson (move discipline from Universal Rules buried text to top-level paragraph) was the operative fix. Confirmed durable.

**16.40 Stage 2 §16.36 statutory-citation gate catches additional brief-seed drift the Stage 1b house-position pass cannot reach**
- Wave 6 Stage 2A (Bucket A LtdCo extraction) caught **6 additional drift catches** that Stage 1b could not have reached because they live in the Stage 1a brief-seed authority links (cluster-specific section citations), not in the locked house positions Stage 1b verified. Two were CRITICAL: (i) **CTA 2010 ss.464C/464D OMITTED in full by FA 2025 with effect from 30 October 2024** (Stage 1a seed for A2 cited as live; entire topic anchor for A2 needed reframing); (ii) **ITA 2007 s.396B does not exist** — the correct cite is ITTOIA 2005 s.396B inserted by FA 2016 for the MVL anti-phoenix TAAR (Stage 1a seed for A4 cited the wrong Act). Plus 4 material catches: CTA 2010 s.18 omitted FA 2014, reinstated as ss.18A-18N FA 2021 (A1/A4/A6/A7 corrected); ITTOIA 2005 s.385 is "Person liable" not POS-distribution authority (A3 corrected); SDLT FA 2003 Sch 4 para 8 is "debt as consideration" not connected-co MV (correct: FA 2003 s.53) (A8 corrected); HMRC CTM61605 is debt-assignment not bed-and-breakfasting (A2 flagged). **Pattern:** the §16.36 Stage 2 statutory cross-check gate is doing structural work that the Stage 1b house-position pass cannot do, because Stage 1b verifies the *house position* statutory anchors but Stage 1a brief-seeds carry *additional* per-page citations (closer to write-time) that Stage 1b never sees. Counts now: Wave 6 prep alone caught **7 drift catches across Stage 1b + Stage 2 combined** (5 Stage 1b in §16.38; 6 Stage 2A here — net 11 unique because some overlap). The total program drift catch count is now **9+ consecutive Bill-vs-enacted-Act drifts in succession**. **Lesson:** Stage 2 §16.36 statutory cross-check earns its keep at exactly the rate Wave 5's projected (4 catches at 13% brief-quality error rate); Wave 6's higher catch count reflects (a) the LtdCo/CTA 2010 territory's higher drift density compared to Wave 5's VAT/devolved/Form-17 territory, AND (b) the post-FA-2025 reform wave (commenced 6 April 2025 / 30 October 2024 anti-forestalling dates) reaching back into prior-locked anchors. Future waves touching LtdCo extraction, IHT-non-dom, or any FA 2025 cluster should expect 5+ catches per bucket; budget Stage 2 sub-agent time accordingly (~30-40% longer than VAT-style clusters). Out-of-wave back-patch queue: existing-content grep + fix for s.464C/D, s.396B (ITA 2007 → ITTOIA 2005), and "CTA 2010 ss.18-44" range references (logged in §19).

---

## 17. Risk register

| Risk | Mitigation |
|---|---|
| Factual error ships in a page | House positions doc + flag-on-conflict + manager verifies via legislation.gov.uk + fix on branch before merge |
| Two sessions cannibalise each other | Token-level pre-wave check + CANNIBAL flag + manager arbitrates |
| Templating drift in same bucket | Per-page framing differentiator + manager spot-check after page 3 |
| Tracker ahead of branch (lost work risk) | Step 14 (commit) before step 16 (mark done) + manager checks `git log` vs tracker |
| Worktree missing runtime files | Pre-launch checklist copies `.env` + `_db.py` |
| Worktree branch behind main | Pre-launch checklist fast-forwards each branch |
| Session out of context mid-wave | Discovery log records stop point + tracker shows ⬜ todo + user relaunches |
| Q&A answer doesn't reach session | Session-side Monitor watcher (Wave 2+) |
| Word-count drift | M-3/M-4 calibration after page 2 of each session |
| Live-page regression from new link target | `monitored_pages` table + weekly regression detector; 90-day window; 14-day grace |
| Manager runs out of context mid-wave | §14 self-awareness: write handover update, stop, hand off to fresh manager |
| Sub-agent returns garbage | Manager verifies sub-agent's output before propagating (read the briefs the sub-agent generated, spot-check the cannibalisation re-check results) |

---

## 18. File map

```
docs/
├── property/
│   ├── NETNEW_PROGRAM.md                        ← this doc (THE pickup doc)
│   ├── house_positions.md                       ← locked factual positions
│   ├── topic_gaps_final.md                      ← 429 net-new candidate list
│   ├── topic_gaps_redirect_overlap.md
│   ├── topic_gaps_other_resolved.md
│   ├── topic_gaps_first_cut.md                  ← intermediate, reference
│   ├── competitor_rewrite_playbook.md           ← legacy-rebuild methodology (May 21)
│   ├── track1_page_tracker.md                   ← Wave 1 (closed, 31/31)
│   ├── track1_site_wide_flags.md                ← Wave 1 flags
│   ├── track1_discovery_log_session_{A,B,C}.md  ← Wave 1 discoveries
│   ├── track1_questions_session_{A,B,C}.md      ← Wave 1 Q&A logs
│   └── wave<N>_*.md                             ← per-wave artefacts (created at launch)
├── sessions/property/
│   ├── TRACK1_SESSION_{A,B,C}_START_HERE.md     ← Wave 1 briefs
│   └── WAVE<N>_SESSION_{A,B,C}_START_HERE.md    ← Wave N briefs
├── medical/                                     ← parked program
└── network_state_and_handover_2026-05-21.md     ← broader network state (May 21 baseline)

briefs/property/
├── track1/                                      ← Wave 1 per-page briefs
└── wave<N>/                                     ← Wave N per-page briefs

scripts/
├── property_topic_gap_finder.py
├── property_topic_gap_filter.py
├── property_other_reclassify.py
├── property_cannibalisation_check.py            ← re-run pre every wave
├── property_redirect_overlap_check.py
└── property_track1_brief_builder.py             ← adapt for wave N

optimisation_engine/
├── analysis/detectors.py                        ← monitored_pages regression detector
├── competitor/
│   ├── brief_for_opus.py                        ← SITE_RULES
│   ├── _db.py                                   ← UNTRACKED; copy to every new worktree
│   └── _fetch.py
└── ingestion/
    ├── ingest_gsc_queries.py
    └── ingest_gsc_pages.py

Property/web/                                    ← the site
├── content/blog/                                ← 316 markdown files
└── src/
    ├── middleware.ts                            ← 429 redirects + per-page additions
    ├── components/blog/BlogPostRenderer.tsx     ← auto-injects LeadForm
    └── app/globals.css                          ← .prose-blog aside CSS

Accounting-wt-property-track1-{a,b,c}/           ← Wave 1 worktrees (merged, can delete)
Accounting-wt-medical-{a,b,c}/                   ← Medical parked worktrees
```

### Key Supabase tables

| Table | Purpose |
|---|---|
| `sites` | Site registry (site_key, gsc_property_url) |
| `gsc_query_data` | Query-level GSC data per page per day |
| `gsc_page_performance` | Page-level GSC data per day |
| `ga4_page_data` | GA4 engagement / conversion |
| `competitor_serps` | One row per (site_key, query, fetch_date) |
| `competitor_pages` | One row per competitor URL per SERP |
| `competitor_gap_reports` | Per-page gap analysis + improvement brief |
| `monitored_pages` | Wave 1 (52 rewrites + 5 redirects) + future waves; 90-day regression window |
| `optimisation_opportunities` | Detector outputs queued for review/apply |

---

## 19. Open decisions / known unknowns

- ~~Wave 2 launch timing.~~ CLOSED. Wave 2 completed 2026-05-22 (merged + post-merge cleanups landed).
- ~~Worktree reuse vs fresh.~~ CLOSED. Fresh worktrees used for both Wave 2 and Wave 3 — confirmed working pattern.
- ~~Post-Wave-1 cleanups + deploy.~~ Cleanups done; deploy still held by user pending review of Waves 1 + 2 + 3.
- **Legacy rebuild brief generator.** Needs GA4 enrichment on top of GSC + competitor HTML. Design pending; can be a sub-agent task once Wave 3 lands.
- **285 target vs 429 candidate list.** User narrowed from 429 to ~285. Need to confirm which 144 candidates were dropped, on what basis. After Wave 3 ships, 91 net-new shipped and ~194 candidates remain in the user-narrowed pool.
- **House positions for legacy rebuilds.** Currently locked: §§1-12 plus Wave 2 extensions §§15-17 plus Wave 3 extensions §§18-20. Before legacy waves start, surface a checklist of any topic touched by ≥10 legacy pages that does not have a locked house position.
- **NEW: Data-driven competitor discovery.** §16.21. Current `property_topic_gap_finder.py` hard-codes 13 domains, narrowed to 4 by the filter; SERP-derived data exists but is siloed in the per-page rewrite playbook. Slated as infra deliverable between Wave 3 and Wave 4 (user-flagged 2026-05-22).
- ~~§19.7 MTD ITSA late-payment rate verification.~~ RESOLVED 2026-05-22 by Stage 2 MTD sub-agent. Day-triggers corrected from 31/46/91 to **15/30/31** (the Spring Statement 2025 reform accelerated both percentages AND day-triggers). Percentages 3%/3%/10% confirmed. §19.7 and §3 corrected with `Correction logged 2026-05-22`; F-6 broadcasts the change to sessions. Source: gov.uk Spring Statement 2025 HTML document. **Pattern:** the §5.2 correction process working as designed, factual catch via downstream Stage 2 verification.
- ~~**RRA-2026 citation back-patch sweep + existing-page rewrite (F-1).**~~ PARTIALLY RESOLVED 2026-05-23. F-1 site-wide back-patch sweep landed post-Wave-3 hygiene (commit `38b17b5`); §20.7 / §20.11 un-yeared citation tightening landed Wave 5 prep (commit `2af6268`, 17 patches across 16 location/landlord pages). **F-1 PART 2** (existing `renters-rights-act-2026-tax-implications-landlords` lead-page content rewrite) still pending; brief scaffolded at `docs/property/f1_rra_lead_page_rewrite_brief.md`. Future manual session task.
- ~~**Competitor sitemap re-sweep cadence.**~~ FIRST CYCLE RESOLVED 2026-05-23. Wave 5 prep SERP delta sub-agent re-ran `serp_runner.py` on the 83-query Wave 4 corpus + diffed against prior snapshot. Output: 25 net new specialist domains identified (top recommended additions: `landlordstudio.com`, `togetheraccounting.co.uk`, `leonandcompany.co.uk`); report at `docs/property/wave5_serp_delta_2026-05-23.md`. Recommended cadence: re-run weekly between waves. Next re-run candidate: Wave 6 prep window.

### Wave 5 close (2026-05-23 PM) — open decisions for Wave 6+

- **Deploy timing (W4 + W5 held).** Two batches pending: W4 (30 pages, held since Wave 4 close 2026-05-23 AM) and W5 (30 pages, held since Wave 5 close 2026-05-23 PM). User holds; combined or sequential deploy is user's call. Combined deploy unlocks ~6-8 weeks of GSC signal on W1-5 (151 live pages) → data-led Wave 6 rotation. **DECISION 2026-05-23 PM: user opted to hold both deploys and proceed Wave 6 intuition-led** ("everything needs to be created sooner or later, let's execute"). Deploy decision re-opens at Wave 6 close.
- ~~**Wave 6 bucket selection.**~~ RESOLVED 2026-05-23 PM. User selected the §19-aligned trio: A = LtdCo extraction-sequence pillar; B = Trusts + §24.7 adult/minor-child + settlements + GROB; C = Capital allowances + SBA + FYA (clean topical gap, never hit by a prior wave). 30 brief-seeds delivered by Stage 1a; house positions §22.9-§22.15 + new §25 cluster delivered by Stage 1b. See §3 for the picks and house-position locks.
- ~~**§16.36 Stage 2 brief-template statutory-citation cross-check gate.**~~ APPLIED to Stage 2 dispatch prompts in Wave 6 prep (no separate template file edit needed; baked into the prompt I write per-wave).
- ~~**§16.37 launch-prompt Q&A path discipline hardening.**~~ APPLIED to Wave 6 LAUNCH_PROMPTS draft (no separate template file edit needed; baked into the prompt I write per-wave).
- **Wave 5 follow-up hygiene back-patches (deferred, low priority).** ~9 existing-page cross-link inserts logged in Wave 5 site-wide flags: F-2 + F-6 + F-7 + F-10 existing VAT pages → A1 + A6 + A8 + A10 back-links (4 pages); 5 existing spouse-mechanics pages → C1 back-links (Session C D-4). Can run as a small standalone commit when convenient; not blocking anything.
- **Wave 5 F-3 + F-5 (low priority).** F-3: existing `landlord-vat-registration-when-required` imprecise on 80% connected-party rule (cosmetic refresh). F-5: alexander-ene.co.uk URL set rotted; drop from Property competitor seed lists for future waves.

### Wave 6 close (2026-05-24) — CLOSED

**Status:** Closed 2026-05-24. Commit chain `3808019` → `ad78212` → `b77b954` → `e4f3ac2` → `5b75303` → `c27481e` → `5a218f5` → `a904ca1`. 8 commits, ~52 individual edits across the post-merge phase. Full execution detail in §3 Wave 6 close subsection. The pre-execution close plan is retained below for audit-trail integrity (read-only from here).

**Pre-execution close plan (retained for audit):** Wave 6 RUN COMPLETE, CLOSE PENDING. 30 pages shipped on 3 worktree branches; NOT YET MERGED to main. Q&A watcher stopped at session end (re-arm only if relaunching). User instruction 2026-05-24 AM: "pick this up in the morning, document everything so fresh manager can resume exactly here".

**Mirror Wave 5 close pattern (commit chain `08e9d74` → `7a8206b` → `8d0a21f` → `cc99faf` → `9c39ff1` → `14c15be` in NETNEW_PROGRAM §3 Wave 5 close subsection).**

**STEP 1 — Pre-merge house-position corrections (CRITICAL, do FIRST):**
- **F-9 §21 lock:** add s.455 charge rate update — references ITA 2007 s.8(2) which was substituted by FA 2026 s.4(1)(b) to "the dividend upper rate is 35.75%" effective 2026/27. s.455 effective rate is **35.75% from 6 April 2026** (was 33.75% for 2025/26). Verify at https://www.legislation.gov.uk/ukpga/2007/3/section/8 before locking. F-9 detail in `docs/property/wave6_site_wide_flags.md`.
- **F-3 §22 lock:** NRB freeze window extends to **5 April 2031** (extended by one year beyond the 5 April 2030 Wave 4 framing). Verify at https://www.gov.uk/government/publications/rates-and-allowances-inheritance-tax-thresholds-and-interest-rates before locking. F-3 detail in same flags file.
- **F-4 §22.12 cite note:** add note that TCGA 1992 s.169G is "arrangement definition" NOT "settlor definition"; correct settlor definition is **s.169E**. Currently held only in Wave 6 B4 body; should be in §22.12 do-not-write list to prevent future brief-seed propagation. Verify at https://www.legislation.gov.uk/ukpga/1992/12/section/169E.

**STEP 2 — Audit-trail commit (uncommitted session live state):**
Session writes landed in main's working tree per §16.37 absolute-path discipline:
- `docs/property/wave6_page_tracker.md` (30 ✅ flips with session notes)
- `docs/property/wave6_site_wide_flags.md` (39 flag entries)
- `docs/property/wave6_discovery_log_session_{A,B,C}.md` (74 discovery items)
- `docs/property/wave6_questions_session_{A,B,C}.md` (no real Qs; just template fixes already in commit `26334b0`)
Commit as "Wave 6 close, step 2: audit trail (tracker + flags + discovery + Q&A)". Do NOT include Track 2 working-tree edits (separate manager's pipeline; let them commit).

**STEP 3 — Three bucket merges:**
```
git merge --no-ff property-wave6-a  # 10 commits, no expected conflicts
git merge --no-ff property-wave6-b  # 10 commits, no expected conflicts
git merge --no-ff property-wave6-c  # 12 commits incl 2 work-log fills
```
Each merge message: "Merge property-wave6-X: 10 Wave 6 [bucket name] pages (X1-X10)".

**STEP 4 — Post-merge back-patches:**
- **4 CROSS_BUCKET forward-link hyperlinks** (per §16.32):
  - F-2 A4→C2 (MVL distribution-in-specie → CAA s.61 event 8)
  - F-12 A7↔C4↔C5 bidirectional (HoldCo AIA shared cap + intra-group transfer)
  - F-24 A8→A9 (mid-incorporation → pre-sale companion)
  - F-26 A10←B4+B7 (trust-owned SPV ← settlor-interested IHT context)
- **12 INTERNAL_LINK back-patches** to existing pages: F-5 Wave 4 C10 → B4; F-6 Wave 1 B7 → A1; F-7 Wave 4 A5 → A1; F-11 DLA pages → A2; F-14 Wave 1 B7 → A3 + Wave 4 C4 → B8; F-15 A4 → A3 internal; F-18 Wave 4 A8 + Wave 2 A9 → A5; F-19 Wave 2 C1 → A6; F-20 Wave 2 A9 → A6; F-22 Wave 4 A1 → A8; F-23 Wave 1 B3 → A9.
- **2 REDIRECT slug repoints:** F-8 `property-company-profit-extraction-salary-vs-dividends` → A1; F-16 `property-company-employer-pension-contributions-directors` → A5. Plus C-bucket adds: `hmo-capital-allowances-multi-tenant-landlords-claim` → C7, `full-expensing-capital-allowances` → C5, `landlord-capital-allowances-tax-relief` chain → C1 (per F-6 + F-7C).
- **14 EXISTING_PAGE_STALE back-patches:** F-1 (s.396B fix on extracting-money page); F-9 (s.455 35.75% site-wide grep + fix; ~3-8 hits expected); F-3 (NRB 2031 fix on Wave 4 C10 + any sister IHT pages; grep for "April 2030"); F-6 (landlord-capital-allowances-tax-relief reframe — biggest, may be its own commit); F-10 (s.464C/D omitted; grep DLA-context pages for "30-day rule" / "£15,000 anti-arrangement"); F-13 (alphabet-shares-spouse-children → cross-link to settlements page); F-17 (sole-trader-vs-Ltd page stale on FA 2026 rates); F-21 (pension-IHT-2027 stale on LSDBA + IHT-at-death-2027 transition); F-25 (Wave 2 A7 inheriting-rental-property → B10 intestacy companion); plus 5 smaller fixes — full list in `wave6_site_wide_flags.md`.

**STEP 5 — NETNEW_PROGRAM updates:**
- §3 Wave 6 CLOSED stamp with the close commit chain + 30 pages on main + total program count (151 + 30 = **181 net-new pages**)
- §16 new lessons if any surfaced during close (§16.43+)
- §19 Wave 7+ open items refresh

**STEP 6 — Worktree cleanup:**
```
git worktree remove ../Accounting-wt-property-wave6-a
git worktree remove ../Accounting-wt-property-wave6-b
git worktree remove ../Accounting-wt-property-wave6-c
```

**Inter-wave queue for Wave 7+ planning (read after close):**
- **65 new candidates from Track 2B addendum** added to `topic_gaps_final.md` lines 1295+. Source detail in `docs/property/track2b_competitor_sitemap_gaps_2026-05-23.md`. ~28 of 65 require new house positions (~8-10 lock sessions: BSA 2022, MEES extension, TRS, R2R, IPDI/QIIP, EV chargepoints, SIPP/SSAS commercial, DAC7, s.198, partnership SDLT relief, HMRC enquiry mechanics). ~37 of 65 ready to commission immediately.
- **74 Wave 6 discovery items** in `wave6_discovery_log_session_{A,B,C}.md` — Wave 7 bucket-selection feeder.
- **W4 + W5 + W6 (now 90 pages) all held for deploy** pending user decision. Combined deploy unlocks GSC signal for data-led Wave 7 bucket rotation.
- **§22.5 spouse-exemption pre-FA-2025 drift refresh** (deferred from Wave 6 prep §16.39).
- **§25.8 PENDING items** (full-expensing leased-plant commencement; FA(No.2)2023 amendment chain doc; HMRC official rate).

**Watcher state:** stopped at Wave 6 run-end via TaskStop (task `bf3g864qs`). Re-arm only when launching Wave 7.

### Wave 7 close (2026-05-24 end of day) — CLOSED

**Status:** Closed 2026-05-24 end of day. Commit chain `6f6e79f` → `775e985` → `75f8820` → `683f4ad` → `76937d8` → `4588ea7` → `0b7df7d`. 7 commits in close; 8 files touched in post-merge phase. **209 net-new pages on main** (W1-7). Full execution detail in §3 Wave 7 close subsection.

**Wave 7 RUN summary (2026-05-24 evening, all 3 sessions):**
- **Launch:** 2026-05-24 PM via three fresh Opus 4.7 sessions per worktree (`Accounting-wt-property-wave7-{a,b,c}`).
- **Run duration:** evening to evening (single-day run, faster than W6's overnight 12-14 hours).
- **Output:** 28/28 pages shipped on 3 worktree branches (9 + 10 + 9 commits + 3 work-log fills).
- **Tracker:** 28 ✅, 0 🟦, 0 ⬜ (all marked done on main's working tree via §16.37 absolute-path discipline; second wave where §16.15/§16.37 absolute-path discipline holds with zero violations; W6 was the first).
- **Q&A: zero real questions** across all 3 sessions. **5th consecutive zero-Q&A wave.** §16.33 prep-quality-signal pattern firmly load-bearing; new §16.46 lesson logged on the manager-side-prep maturation hypothesis.
- **Flags: 5 total** + 2 Track 2 cross-track inputs. F-1 (£30k → £40k HA 2004 s.249A) closed in-session. F-2 (site-wide STALE sweep) resolved at close batch 2 via sub-agent. F-3 (§20.2 RRA section numbers) + F-5 (§27.2 Sch 24 12-month qualifier) resolved at close step 1 via pre-merge HP corrections. F-4 (C1 → C2 IPDI hyperlink) resolved at close batch 1.
- **Drift-catch tally for Wave 7:** **35 total** across the lifecycle. 13 at HP-lock (§16.45); 19 at Stage 2 brief drafting (A 6 + B 4 + C 9); 3 at session write time. Two of the HP-lock catches were errors in the previous manager's prep document itself.
- **Voice discipline:** 26 of 28 pages had zero em-dashes at session-side verification. 2 em-dashes escaped (A4 line 19 FAQ answer + B5 line 176 worked-scenario narrative); both micro-fixed at close batch 1. Sites-wide rate: 99.96% (2 em-dashes / ~85k body words). Zero Tailwind classes across all 28 pages.
- **Branch commits merged into main:** A-branch 9 (1b068ee A4 / db2c611 A2 / e0e644d A3 / 2b0cd6b A5 / 8425f81 A6 / f3bb456 A8 / 5b61670 A9 / b67a0ea A10 / bb28ebf A1 — A1 last per sequencing); B-branch 11 incl. 1 work-log fill (7e69bb0 B8 / 04a0e87 B8-worklog / 83e8543 B1 / 184aca5 B2 / 959b38a B3 / 1d2cb41 B4 / c062892 B5 / 1872827 B6 / bf1f783 B7 / 71a25b3 B9 / a45e12e B10 — B8 first per sequencing); C-branch 11 incl. 2 work-log fills (d07027b C1 / 7d1b4da C1-worklog / 5f3676a C9 / e4f1850 C9-worklog / 1cd3e88 C2 / 1922e7a C3 / 0c63197 C5 / d5a9844 C6 / 542796b C7 / 14439da C8 / 3d5a95f C10).

**Wave 7 close (2026-05-24 end of day) — execution detail:**
- **Step 1 — Pre-merge HP corrections (`6f6e79f`):** §20.2 F-3 verbatim-section disambiguation table added (RRA 2025 s.2 abolition / s.3 Sch 1 / s.4 ASB / s.5 amending vehicle for PEA 1977 / s.6 rent procedure / s.15 inserting HA 1988 s.16E re-letting + s.16J criminal + s.16K civil £40k — operative re-letting anchor); §27.2 F-5 careless-unprompted 0% floor "(within 12 months)" qualifier dropped + correction note added (Sch 24 has no such qualifier; the cliff is at Sch 41 para 13). F-1 (§26.9 £30k → £40k) already closed in-session by Session A at A4 write time; no additional §26.9 edits.
- **Step 2 — Audit-trail (`775e985`):** tracker (28 ✅) + flags (5 F + 2 Track 2 inputs) + 3× discovery logs + 3× brief work-log fills committed.
- **Step 3 — Three bucket merges:** `75f8820` A (9 commits) / `683f4ad` B (11 commits incl. work-log) / `76937d8` C (11 commits incl. 2 work-logs). Zero conflicts on any merge; the Track 2 manager's Phase 3 prep commits coexisted cleanly with Wave 7 branches.
- **Step 4 — Post-merge back-patches in 2 batches:**
  - **`4588ea7` batch 1 (in-wave precision back-patches):** F-4 C1 → C2 IPDI hyperlink added (`/blog/incorporation-and-company-structures/immediate-post-death-interest-ipdi-rental-property-tax-iht-1984-s49a`); A4 em-dash line 19 → semicolon; B5 em-dash line 176 → comma+since. 3 files; 3 edits.
  - **`0b7df7d` batch 2 (F-2 site-wide STALE sweep via sub-agent per §16.43):** 5 existing-page back-patches (£30k → £40k + SI 2026/319 note): `prs-database-landlord-ombudsman-registration-requirements` + `decent-homes-standard-prs-landlord-compliance-checklist` + `liverpool-property-accountant-tax-services-landlords` + `why-southampton-landlords-need-property-accountant` + `property-accountant-nottingham-landlords`. Sub-agent inspected 27 candidate files (~263 raw £30k occurrences across blog corpus) and correctly identified 22 false positives (MTD threshold; S24 worked examples; SDLT example tables — all legitimate non-HMO uses). 5 files; 5 edits.
- **Total Wave 7 close churn:** 7 commits; 8 files touched in post-merge phase; ~11 individual edits.
- **Items deferred to inter-wave queue (not Wave 7 close scope):**
  - Track 2 manager's CT three-figure framework recommendation (§21.X new HP lock for £250k / £50k / 19% / 25% / marginal-relief 26.5% — Wave-manager-callable per Track 2 deference rule; defer to post-Wave-7 manager session).
  - `rra-2025-landlord-enforcement-civil-penalties-banning-orders-defence.md` enhancement note (add SI 2026/319 reg.2 cross-reference alongside RRA 2025 s.15/Sch 5 framing for the £30k → £40k uplift; sub-agent identified but not edited as £30k references are deliberately historical/transitional).
  - `landlords-considering-selling-portfolio-rra-2025-tax-implications.md` light parallel.

**Watcher state at close:** running (`bff2tb120`, persistent). Can be TaskStop-ed now that Wave 7 is closed.

---

### Wave 7 prep (2026-05-24 PM) — STEP 1 HP-LOCK COMPLETE; Stage 1a next

**Status:** Fresh manager (post-Wave-6-close pickup) executed HP-lock step 1 in ~3 hours. **5 commits landed on main** covering 11 new sub-positions across 5 clusters:
- `72263ec` Wave 7 HP-lock step 1: §26 Regulatory framework (RRA pointer + BSA 2022 + MEES/EPC-C-not-enacted + Decent Homes + Redress + PRS Database) + §20.5 plural-schemes in-place nuance
- `f66d96c` Wave 7 HP-lock step 2: §27 HMRC enquiry mechanics (TMA s.29/s.28A/s.12B + Sch 24 + Sch 41 + CoP9 + LPC + WDF + FtC + record retention)
- `98146ea` Wave 7 HP-lock step 3: §22.16-§22.18 (TRS + IPDI/QIIP + EOT property-SPV)
- `9c62002` Wave 7 HP-lock step 4: §25.11 s.198 fixtures election (purchase-side depth)
- `1593b58` Wave 7 HP-lock step 5: §1.A-§1.F SDLT depth (Sch 15 partnership + s.108 linked + Bewley + Sch 3 para 3 divorce)

**12 drift catches surfaced at HP-lock; logged at §16.45 (NEW).** Two of the catches were errors in the previous manager's Manager_prompt itself (CTA 2010 ss.464M-Q fiction; Sch 4 para 5 linked-transactions mis-cite); the others were territory-novelty discoveries from §16.40 / §16.42 patterns extending into HP-lock stage. Most operationally critical: **EPC C 2030 is NOT enacted** (still policy aspiration; current floor EPC E + £3,500 cap) — sessions writing A8 + A9 must hedge accordingly.

**Wave 7 next steps:**
1. ~~HP-lock sessions~~ **COMPLETE** 2026-05-24 PM (5 commits, 5 clusters, 11 sub-positions, 12 drift catches).
2. ~~Cannibalisation re-check against main at 181 pages.~~ **COMPLETE** 2026-05-24 PM (commit `6a4e951`). Results: ✅ 25 net-new / ⚠️ 5 partial / ❌ 0 covered. **Lineup updated to 28 picks** (Bucket A 9 + B 10 + C 9) after user-confirmed audit decisions: A4 RRA rent reform replaced with HMO selective licensing compliance; A7 Decent Homes dropped; C4 s.198 fixtures depth dropped. See `docs/property/wave7_cannibalisation_check.md` for audit detail.
3. ~~Stage 1a brief seeds (sub-agent dispatch)~~ **COMPLETE** 2026-05-24 PM. Single general-purpose sub-agent generated 28 seeds at `briefs/property/wave7/STAGE1A_BRIEF_SEEDS.md` (~7,000 words). Three HP gaps surfaced (A4 HMO licensing; C6 SDLT cladding; C10 SIPP/SSAS); Stage 1a surfaced **drift catch #13** — FA 2003 s.58C is "Relief for new zero-carbon homes" not cladding remediation; no SDLT cladding relief exists in UK statute.
4. ~~Stage 1b manager review~~ **COMPLETE** 2026-05-24 PM. 3 HP gaps closed via mini-locks at commit `6cbb0ed`: §26.9 (HA 2004 Pt 2/3 HMO licensing) + §1.G (FA 2003 Sch 7 SDLT group relief) + §22.21 (FA 2004 Sch 29A SIPP/SSAS taxable property). C6 pick replaced (user choice: SDLT group relief depth at §1.G). A4 + C6 + C10 seeds updated in-place; Stage 1b review queue closed.
5. ~~Stage 2 full brief generation (3 parallel sub-agents per §16.43 pattern)~~ **COMPLETE** 2026-05-24 PM. 28 briefs delivered at `briefs/property/wave7/<slug>.md` (~5,688 lines total; ~200 lines per brief). Commit `aa0b646`. Drift catches per bucket: A 6, B 4, C 9. Low-confidence flagged: A8 EPC C 2030 SI risk, A6 first-scheme announcement risk, B3 CoP9 immunity construct, B7 dynamic Cat 1/2/3 territories Order, C10 SIPP/SSAS write-time verification.
6. ~~Artefact shells~~ **COMPLETE** 2026-05-24 PM. Commit `6d7343a`.
7. ~~Worktrees standup~~ **COMPLETE** 2026-05-24 PM. 3 worktrees at `6d7343a` with .env + _db.py copied; ff-verified per §16.25.
8. ~~START_HERE × 3 + WAVE7_LAUNCH_PROMPTS~~ **COMPLETE** 2026-05-24 PM. Commit `4fa1889`.
9. Watcher arm — **PENDING at launch**. Use §16.41(d) `## Q-\d+` heading-count pattern (template-immune; baseline becomes floor).
10. User gate — **PENDING**. Pre-launch summary delivered.
6. Artefacts (wave7_page_tracker + flags + Q&A shells + discovery shells).
7. Worktrees standup (3 fresh ff-verified to main HEAD).
8. START_HERE × 3 + WAVE7_LAUNCH_PROMPTS.
9. Watcher arm (§16.41(d) `## Q-\d+` heading-count pattern).
10. User gate — pre-launch summary.

**Original status retained for audit:** User confirmed 2026-05-24 PM after Wave 6 close: hold W4+W5+W6 deploy further, intuition-led bucket picks, 3 buckets × 10 pages = 30 total. Closing manager (Wave 6 close session) checkpointed here per §14 self-awareness — HP-lock work is the highest-precision territory in the program (drift propagates to all pages in the wave) and a fresh manager session is the right cost/quality trade-off.

**Wave 7 bucket selection (user-approved 2026-05-24 PM):**

**Bucket A — Regulatory/compliance landlord territory (10):**
- A1 RRA 2026 PART 2 lead-page rewrite (existing slug `renters-rights-act-2026-tax-implications-landlords`; brief scaffolded at `docs/property/f1_rra_lead_page_rewrite_brief.md` from earlier waves)
- A2 RRA s.21 abolition operational mechanics
- A3 RRA periodic-tenancy switch landlord obligations (fixed-to-periodic transition)
- A4 RRA rent reform + tribunal mechanics
- A5 RRA possession-ground reforms (new grounds + evidence + notice periods)
- A6 RRA Property Redress Scheme mandatory enrolment
- A7 Decent Homes Standard applied to PRS
- A8 EPC C 2030 + landlord spending cap mechanics (addendum #80)
- A9 EPC grant schemes available to landlords (addendum #81)
- A10 BSA 2022 cladding cost recovery + leaseholder protection (addendum #83)

**Bucket B — HMRC enquiry + tax compliance ops (10):**
- B1 Discovery assessment time limits (4/6/20-year framework, TMA 1970 s.29) (addendum #108)
- B2 Closure notice mechanics (TMA 1970 s.28A) (addendum #109)
- B3 CoP9 contractual disclosure framework (addendum #110)
- B4 Tribunal appeal process for landlords (FTT mechanics) (addendum #111)
- B5 HMRC nudge letter response playbook
- B6 Let Property Campaign formal disclosure route
- B7 Worldwide Disclosure Facility for offshore landlord catch-up
- B8 Sch 24 FA 2007 penalty behaviour categories (careless / deliberate / deliberate-concealed)
- B9 Reasonable-excuse case law for landlord penalties (Sch 55 / Sch 56)
- B10 Record retention discipline + voluntary disclosure vs failure-to-notify

**Bucket C — Specialist transactional + trust depth continuation (10):**
- C1 TRS compliance for trust-owned BTL (MLR 2017 reg 45ZA) (addendum #21)
- C2 IPDI/QIIP rental property tax (IHTA 1984 s.49A) (addendum #19)
- C3 EOT property-SPV exit mechanics (TCGA 1992 s.236M-Q) (addendum #42)
- C4 s.198 election commercial fixtures depth (CAA 2001 s.198) (addendum #70)
- C5 SDLT linked transactions Sch 4 para 5 FA 2003 (addendum #1)
- C6 SDLT cladding relief s.58C FA 2003 (addendum #8 — Wave 5 covered VAT side only)
- C7 SDLT divorce/separation transfer reliefs (Sch 3 para 3 FA 2003) (addendum #2)
- C8 SDLT Bewley uninhabitable-property test (addendum #3)
- C9 Partnership SDLT relief Sch 15 FA 2003 (addendum #7)
- C10 SIPP/SSAS commercial property purchase mechanics (addendum #68)

**House-position locks required pre-Stage-2 (~10-11 new positions):**

- **NEW §26 Regulatory framework cluster** (extends §20 RRA depth). ~6-8 sub-positions covering: §26.1 RRA 2026 enacted-state architecture (extends §20.1-§20.13); §26.2 BSA 2022 (Higher-Risk Buildings + Accountable Person + leaseholder protections); §26.3 EPC C 2030 + MEES extension regime; §26.4 Decent Homes Standard application to PRS; §26.5 Property Redress Scheme mandatory enrolment; §26.6 landlord database (if commenced; verify status). Citations against legislation.gov.uk: Building Safety Act 2022 (c. 30); Energy Efficiency (Private Rented Property) (England and Wales) Regulations 2015 (SI 2015/962) + 2025/2030 amendment instruments; RRA 2025 (verified-as-enacted state already in §20).
- **NEW §27 HMRC enquiry + compliance mechanics cluster**. ~4-5 sub-positions covering: §27.1 TMA 1970 s.29 discovery assessment time limits (ordinary 4-year, careless 6-year, deliberate 20-year); §27.2 Sch 24 FA 2007 penalty behaviour categories + mitigation framework; §27.3 closure notice mechanics (TMA 1970 s.28A) + FTT appeal route (TCEA 2007 Sch 4); §27.4 CoP9 contractual disclosure; §27.5 voluntary disclosure routes (Let Property Campaign + Worldwide Disclosure Facility) vs failure-to-notify position; §27.6 record retention statutory floor (TMA 1970 s.12B; CA 2006 s.388).
- **§22 extension** (extends §22.9-§22.15 Wave 6 lock) for: §22.16 TRS registration triggers + registrable trust classes + 90-day registration deadline + MLR 2017 reg 45ZA penalty regime; §22.17 IPDI/QIIP rental-property depth (IHTA 1984 s.49A operational mechanics beyond Wave 6 B3 IPDI page); §22.18 EOT property-SPV exit (TCGA 1992 ss.236M-Q + CTA 2010 ss.464M-Q + the 50%+1 employee-trust controlling-interest test for property-SPV qualification).
- **§25 extension** (extends Wave 6 §25 CAA 2001 cluster) for: §25.11 s.198 election depth (purchase-side mechanics + 2-year time limit + CAA 2001 s.198(2) form + s.187A no-late-claim consequence; complements Wave 6 C6's brief touch). Note: §25.11 LRR depth from F-17 (Wave 6) is a separate inter-wave queue item, distinct from this s.198 depth lock.
- **§1 extension** (extends §1 SDLT) for: §1.X Sch 15 FA 2003 partnership SDLT relief (sum-of-lower-proportions calculation + the SDLTM33500 HMRC manual page that F-21 Wave 6 confirmed is the correct partnership-transfer reference, not the s.75A Ramsay manual at SDLTM09050+). Also surface SDLT linked-transactions Sch 4 para 5 + Bewley + Sch 3 para 3 divorce/separation as adjacent §1 sub-positions if not already locked at this depth.

**Wave 7 prep workflow (estimated ~6 hours wall-clock for the fresh manager):**

1. **HP-lock sessions (~2-3 hours).** Lock §26 + §27 + §22 extensions + §25.11 + §1.X. Each position verified against legislation.gov.uk / gov.uk / HMRC manual / case law before locking. §16.18 reasoning-first + §16.40 Stage 2 statutory cross-check pattern firmly load-bearing. Watch for: BSA 2022 commencement order status; MEES extension SI status (verify SI 2025/* on legislation.gov.uk); landlord database commencement; TRS penalty figures (current MLR 2017 reg 45ZA values); EOT 50% test post-FA-2025 reforms.
2. **Cannibalisation re-check** against main at 181 pages. Run `scripts/property_cannibalisation_check.py` with current main as baseline. Audit 0.30-0.55 partial-overlap candidates. Likely areas of overlap to verify: Wave 1 + 2 + 3 RRA coverage vs Bucket A picks; Wave 1 + 4 + 5 SDLT coverage vs Bucket C SDLT picks; Wave 1 + 2 trust coverage vs Bucket C C1-C3 picks.
3. **Stage 1a brief seeds (sub-agent dispatch, ~1-2 hours).** 30 seeds across the 3 buckets. Each seed: slug + category + framing differentiator + 3-5 competitor URLs + closest-existing pages + authority links (cluster-specific). §16.36 statutory-citation cross-check gate baked into the seed prompt.
4. **Stage 1b cross-check (manager review, ~1 hour).** Manager reviews every seed against locked HPs + Wave 6 lessons. Expected catches: 5-7 brief-instruction errors (per §16.40 territory-novelty rule — Wave 7 territory is high statutory novelty for RRA + BSA + HMRC enquiry, lower for SDLT cluster).
5. **Stage 2 full brief generation (3 parallel sub-agents per §16.43 pattern, ~40 min each).** One sub-agent per bucket. Each generates 10 full briefs at `briefs/property/wave7/<slug>.md`. §16.36 + §16.40 + §16.42 patterns applied. Expected drift catches: per Wave 6 pattern, 3-6 brief-quality drifts per bucket (statutory section attribution + HMRC manual page numbers + rate-by-reference figures).
6. **Artefacts (~15 min).** wave7_page_tracker.md + wave7_site_wide_flags.md + 3× wave7_questions_session_{A,B,C}.md + 3× wave7_discovery_log_session_{A,B,C}.md shells. Q&A shells use the §16.41 placeholder convention (`<open initially; manager flips to: answered>`, not literal STATUS: open).
7. **Worktrees standup (~10 min).** 3 fresh worktrees `Accounting-wt-property-wave7-{a,b,c}/` on branches `property-wave7-{a,b,c}` from current main HEAD. ff-verified per §16.25. Copy `.env` + `optimisation_engine/competitor/_db.py` into each (§16.1).
8. **START_HERE × 3 + WAVE7_LAUNCH_PROMPTS (~30 min).** Adapted from Wave 6 template. New additions for Wave 7: (a) §16.41(d) watcher pattern — count `## Q-\d+` heading occurrences not STATUS: open lines; (b) §16.43 sub-agent dispatch awareness baked into the manager-side close section; (c) cross-bucket sequencing constraints per §16.32.
9. **Watcher arm** using §16.41(d) `## Q-\d+` heading count pattern (template-immune; Q heading count is monotonic).
10. **User gate** — final manager-review summary with pick list, HP-lock summary, cross-bucket sequencing constraints, watcher state. User-triggered launch.

**Cross-bucket sequencing constraints (manager to confirm at pre-launch):** Bucket A is statute-isolated (RRA + BSA + EPC + Decent Homes are non-tax statutes; minimal cross-link to B + C). Bucket B is operational tax mechanics (cross-references on TMA 1970 + Sch 24 + FTT appeals); cross-links possible to Bucket C's SDLT picks at tribunal-appeal angle. Bucket C cross-links inside cluster: C1 TRS → C2 IPDI/QIIP (IHTA s.49A interaction); C9 partnership SDLT → C5 linked transactions (Sch 15 + Sch 4 para 5 interaction).

**Inter-wave items still queued (carry into post-Wave-7):**
- F-7 (Wave 2) brand wordmark em-dash — separate scope, still outstanding from Wave 4 inter-wave queue.
- F-8 (Session C Wave 6) SiteHeader sr-only em-dash — template chrome, separate scope.
- F-9 (Session C Wave 6) `cgt-commercial-property-different-residential` post-30-October-2024 rate alignment rewrite — post-launch hygiene; can fold into Wave 7 close back-patches if convenient.
- F-15 (Session B Wave 6) legacy `cgt-gifting-property-family-members-uk` extension to surface five-route structural decision tree — could be Wave 8 candidate or post-Wave-7 hygiene.
- F-17 (Session C Wave 6) §25.11 LRR HOUSE_POSITION_EXTENSION — distinct from Wave 7 §25.11 s.198 lock; could fold into Wave 7 HP-lock work if convenient (LRR is CTA 2009 Part 14, not CAA 2001; either as §25.11 LRR sub-position OR new §26 if §26 is regulatory and CTA 2009 reliefs need their own cluster).
- §22.5 spouse-exemption pre-FA-2025 architecture refresh — deferred per §16.39 from Wave 6 prep; should land before any non-dom-IHT touch.
- §25.8 PENDING items (full-expensing leased-plant commencement; FA(No.2)2023 amendment chain doc; HMRC official rate).

**Watcher state:** stopped. Re-arm at Wave 7 launch per §16.41(d) pattern.

---

### Wave 6 prep (2026-05-23 PM) — open items

- **§22.5 drift catch (deferred, low priority).** Wave 6 Stage 1b surfaced §22.5 spouse-exemption framing for non-UK-domiciled spouses as carrying pre-FA-2025 architecture. Pre-FA-2025 s.18(2) limited exemption + s.267ZA election framework was written before FA 2025 reforms shifted the operative criterion from domicile to long-term-residence. **Not a Wave 6 blocker** because Bucket B picks B3/B4/B7 cite §22.12-new not §22.5. Recommended: targeted §22.5 refresh sub-agent run (~30 min) at Wave 6 close, in time for any future wave that touches non-dom IHT territory. See §16.39.
- **§25.8 PENDING items (3).** (i) Full expensing extension to leased plant (Autumn Budget 2024 announcement; commencement appointment order not on legislation.gov.uk as of 2026-05-23 — recheck at Wave 7 prep); (ii) FA(No.2) 2023 amendment-chain documentation for full-expensing permanence (low priority; section text in force and unambiguous); (iii) HMRC official rate of interest as a moving figure cited in §21.1 (separate from §25 but worth confirming at next §21 touch).
- ~~**Stage 2 dispatch.**~~ COMPLETE 2026-05-23 PM. All 30 briefs delivered to `briefs/property/wave6/`. Stage 2A reported 6 drift catches (2 CRITICAL — see §16.40 new lesson); Stage 2C reported zero new drift (correctly internalised Stage 1b corrections); Stage 2B reported zero new drift (correctly used new s.48ZA throughout, distinguished s.624 vs s.629).
- ~~**Wave 6 artefact shells.**~~ COMPLETE at commit `bab0184` (tracker + flags + 3× Q&A + 3× discovery; §16.37 Q&A absolute-path discipline baked into Q&A file headers).
- **START_HERE × 3 + WAVE6_LAUNCH_PROMPTS (queued).** Next manager step. Will be written from Wave 5 template + §16.37 top-level paragraph.
- **Wave 6 worktree standup (queued).** 3× worktrees ff-verified to main HEAD per §16.25 after START_HERE + LAUNCH_PROMPTS commit lands.

### Wave 6 out-of-wave back-patch queue (post-launch hygiene from Stage 2 catches)

These are existing-content back-patches surfaced during Stage 2 brief generation. Not blocking Wave 6 launch; queue as standalone post-launch commit before any Wave 7 LtdCo-adjacent work.

- **CTA 2010 ss.464C/464D references.** Omitted by FA 2025 from 30 October 2024. Grep existing `Property/web/content/blog/*.md` for `464C` / `464D` / `bed-and-breakfast` references; reframe to s.455 + s.464A residual anti-avoidance. Surfaced via Stage 2A A2 brief. Expected hit count: small (1-3 files).
- **ITA 2007 s.396B references.** Wrong Act. Correct cite is ITTOIA 2005 s.396B inserted by FA 2016 for MVL anti-phoenix TAAR. Grep for `ITA 2007 s.396B` / `ITA 2007 ss.396B-396D`; correct to ITTOIA 2005 s.396B. Surfaced via Stage 2A A4 brief. Expected hit count: small (0-2 files).
- **"CTA 2010 ss.18-44" range references.** s.18 omitted FA 2014; reinstated as ss.18A-18N FA 2021. Grep for the range; replace with `CTA 2010 ss.18A-18N` (specifically s.18A small profits rate, s.18E associated companies, s.18N CIHC). Surfaced via Stage 2A A1/A4/A6/A7 briefs. Expected hit count: moderate (3-8 files; pre-Wave-1 legacy SPV/marginal-relief content).
- **Legacy slug repoints (post-Wave-6 merge):** `property-company-profit-extraction-salary-vs-dividends` → A1; `property-company-employer-pension-contributions-directors` → A5 (A5 supersedes; existing content is stale on post-FA-2024 LTA architecture); `hmo-capital-allowances-multi-tenant-landlords-claim` → C7; `full-expensing-capital-allowances` → C5. Apply at wave merge, not now.

---

## 20. Wave 2 prep — what the prep agent / next manager needs to do

(Detailed handoff for the entity that takes Wave 2 from here.)

1. Extend `docs/property/house_positions.md` with IHT / DTAs / Expat sections (see §5.3 for the spec).
2. Filter `docs/property/topic_gaps_final.md` to the three buckets and select top 30 (10 IHT + 10 DTAs + 10 Expat) by priority signal.
3. Adapt `scripts/property_track1_brief_builder.py` with:
   - IHT / DTAs / Expat-specific authority link bucket.
   - References to the new house positions sections.
4. Generate ~30 briefs at `briefs/property/wave2/<slug>.md`.
5. Run `scripts/property_cannibalisation_check.py` with current `main` (post-Wave-1) as baseline. Audit any 0.30-0.55 partial-overlap candidates.
6. Create wave2 artefact files:
   - `docs/property/wave2_page_tracker.md`
   - `docs/property/wave2_site_wide_flags.md`
   - `docs/property/wave2_discovery_log_session_{A,B,C}.md`
   - `docs/property/wave2_questions_session_{A,B,C}.md`
7. Stand up fresh worktrees: `Accounting-wt-property-wave2-{a,b,c}/` on branches `property-wave2-{a,b,c}` from current `main`.
8. Copy `.env` and `_db.py` into each worktree.
9. Write `docs/sessions/property/WAVE2_SESSION_{A,B,C}_START_HERE.md`. Include the session-side watcher pattern (§8.4) baked into the workflow.
10. Write `docs/sessions/property/WAVE2_LAUNCH_PROMPTS.md` containing the three paste-verbatim launch prompts.

Once 1-10 are done, hand back to the manager for watcher-arm + session-launch.
