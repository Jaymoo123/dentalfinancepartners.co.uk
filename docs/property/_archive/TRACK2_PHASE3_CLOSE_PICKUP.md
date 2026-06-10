# Track 2 Phase 3 — close pickup doc (next session resume)

**Created:** 2026-05-24 PM by Track 2 manager (immediately after Phase 3 close commit `02ce3bf`).
**Purpose:** if a fresh Claude Opus 4.7 session picks up post-Phase-3 work, this is the starting context. Read this first, then `TRACK2_PROGRAM.md` §3 heartbeat.

---

## 0. Read first, in this order (~10 minutes)

1. **This doc** end to end.
2. `docs/property/TRACK2_PROGRAM.md` §3 heartbeat (most recent entry is Phase 3 CLOSED 2026-05-24 PM).
3. `docs/property/track2_site_wide_flags.md` resolution log (F-15 / F-16 / F-18 RESOLVED; F-37 OPEN-DEFERRED to Wave 8).
4. `docs/property/track2_cannib_index_2026-05-23.md` §7 (Batch 1 + Batch 2 + Phase 3 all CLOSED).
5. `docs/property/track2_page_tracker.md` Phase 3 dispatch section (all 22 rows ✅ executed).

---

## 1. State on entry

**Phase 3 EXECUTION COMPLETE on main HEAD `02ce3bf`.** 16 REWRITEs + 6 REDIRECTs shipped. NOT yet deployed. Build PASS. Awaiting user authorisation on deploy.

**Total Phase 3 commits on main (13):**
- 3 pre-execution lifts: `dcf504f` F-15 + `da7dbe8` D-12 + `5d9259a` D-11
- 1 resolution-log housekeeping: `44684f5`
- 2 prep bundles: `9ad48e4` + `8502b08`
- 1 REWRITE doc-trail: `6593851`
- 3 REWRITE worktree merges: `50269ba` A + `8d3dc93` B + `9cf0743` C
- 1 REDIRECTS doc-trail: `a65b501`
- 1 REDIRECTS worktree merge: `a973f1a`
- 1 final close: `02ce3bf`

Concurrent on main (NOT Track 2): Wave 7 closed; Wave 8 prep IN FLIGHT (already has §28 cluster + §25.12 LRR + §21.A CT three-figure framework HP-locks).

**Worktrees still on disk (4 — manager can prune at user signal):**
- `Accounting-wt-property-track2-phase3-a` [track2-phase3-a]
- `Accounting-wt-property-track2-phase3-b` [track2-phase3-b]
- `Accounting-wt-property-track2-phase3-c` [track2-phase3-c]
- `Accounting-wt-property-track2-phase3-redirects` [track2-phase3-redirects]

(Each branch has been merged via `--no-ff` to main; safe to delete after deploy + monitored_pages staging. Use `git worktree remove` for each.)

**Aggregate Track 2 state after Phase 3:**
- 22 briefs DRAFTED across all phases (4 trial + 9 Batch 1 + 9 Batch 2)
- 22 briefs EXECUTED at Phase 3 (16 REWRITE + 6 REDIRECT)
- ~211 residual legacy slugs remaining (233 - 16 - 6)
- 38 total flags raised (F-1 → F-38); F-13/F-15/F-16/F-18 RESOLVED; F-37 DEFERRED to Wave 8
- 13 consecutive Bill-vs-enacted catches across the program

---

## 2. Open decisions awaiting user

### Decision A: Deploy timing
- Phase 3 outputs on main + build PASS but NOT deployed.
- Per memory note `vercel_cli_deploy_workflow.md`: GitHub auto-deploy OFF; `cd Property && vercel deploy --prod` from parent dir on explicit user authorisation only.
- Wave 7 close commits + Wave 8 prep commits are ALSO on main — deploy bundles all of them together unless user specifies a more granular boundary.
- **Manager recommendation:** wait for user signal. Deploy IS the next concrete operational action.

### Decision B: Deploy bundling
- Bundle Phase 3 outputs with held W4+W5+W6 deploy pool (per NETNEW §19 last note) OR ship as separate Track 2 deploy.
- **Manager recommendation:** SEPARATE Track 2 deploy — keeps monitored_pages signals disaggregable across initiatives. Track 2's 22 changes are conceptually distinct from W4+W5+W6 net-new launches.

### Decision C: monitored_pages Supabase batch-insert (22 rows)
- 16 rewrite_post rows + 6 redirect_post rows.
- Staging captured in discovery logs (`track2_phase3_discovery_log_{a,b,c,redirects}.md`).
- **IMPORTANT:** inserts should be timed to DEPLOY, not merge — `redirect_date` / `rewrite_date` must match when the changes go live so the 14-day grace + 90-day regression window starts correctly. Inserting at merge time would distort the regression watch.
- No existing executable script for the insert was found at the codebase level — `monitored_pages` is referenced in docs but no `optimisation_engine/*` script handles inserts. Manager may need to write a one-off insert script OR use Supabase Management API via curl with SUPABASE_ACCESS_TOKEN (in .env per memory `supabase_cli_access.md`).
- **Manager recommendation:** defer until deploy moment; build the insert tooling at that point.

### Decision D: F-37 follow-up (Wave 8 manager territory)
- FA 2026 c.11 s.7 received Royal Assent 18 March 2026 (verified at write time by Worktree C T3 sub-agent).
- `house_positions.md §7 LOCKED` Bill-form hedge framing is now STALE — position-shape change required, which is Wave-N manager territory not Track 2 manager.
- 4-8 page back-patch sweep likely needed on rewrite cohort + residual pages citing April 2027 rates.
- Wave 8 prep is actively in flight on main (commits `cc00f68` + `6c88708` + `adc33f4` + `3de0ec3` visible).
- **Manager recommendation:** flag to Wave 8 manager pickup. Track 2's recommendation entry is already filed via the F-37 entry in `track2_site_wide_flags.md`.

### Decision E: D-C5 follow-up (Peterborough pricing-leak)
- Worktree C T2 sub-agent surfaced that the F-1 pricing-leak pattern extends to the 2026-05-21 rewrite cohort, not just residual city pages.
- Peterborough page FAQ #2 carries "£800-£1,500" vs "£500-£800" general-market accountancy fee comparison (softer than Birmingham's £300-£600 / £1,500-£3,000 firm-fee implication; but still arguably pricing-leak under strict `agency_lead_gen_model.md` reading).
- Estimated 6+ rewritten city pages affected: Peterborough, Leeds, Wolverhampton, Leicester, Bournemouth, Nottingham, Swansea, London.
- **Manager recommendation:** user decision needed on whether soft-fee comparison framing (with general-market context, not firm-fee implication) is acceptable. If user says "no soft comparison either", queue a sub-agent dispatch to reframe all 6+ city rewrites.

### Decision F: Phase 2 cluster-audit dispatch
- 5 cluster audits queued from Phase 3 discovery logs: F-26 NRCGT-adjacent + F-28 Lettings Relief site-wide + F-30 commercial-rate Budget-2024 cluster + F-31 small-profits-rate cluster + F-35 rewrite-cohort year-stamp cluster.
- §16.43 sub-agent STALE-sweep dispatch pattern is validated (Wave 6 close lesson; ~15-30 min sub-agent run time per cluster, low manager context cost).
- **Manager recommendation:** can be batched as one §16.43 STALE-sweep dispatch in a future session. Not urgent; bank-the-value-while-context-is-hot logic doesn't apply (Phase 3 work is done; context is now cold).

### Decision G: reviewedBy frontmatter convention adoption
- QA sweep found reviewedBy populated on only 6 of 16 Phase 3 rewrites (all from Worktree B — Worktrees A + C didn't adopt).
- Inconsistent convention — could be back-patched on the 10 missing files OR left as-is (the field is optional per launch prompt guidance "schema empty until reviewedBy lifecycle").
- **Manager recommendation:** consider standardising — either back-patch the 10 missing or document as B-bucket-exclusive pattern. User call on standardisation.

---

## 3. Worktree cleanup (optional, post-deploy)

After deploy + monitored_pages staging are done, the 4 Phase 3 worktrees can be removed:

```
git worktree remove ../Accounting-wt-property-track2-phase3-a
git worktree remove ../Accounting-wt-property-track2-phase3-b
git worktree remove ../Accounting-wt-property-track2-phase3-c
git worktree remove ../Accounting-wt-property-track2-phase3-redirects

# Optional branch cleanup (history preserved in merge commits):
git branch -D track2-phase3-a track2-phase3-b track2-phase3-c track2-phase3-redirects
```

Manager should NOT execute the cleanup without user authorisation — the worktrees are useful as historical reference until deploy+monitoring are complete.

---

## 4. Lessons / methodology validated by Phase 3

- **Verify-at-write-time discipline catches Royal Assent transitions cleanly** (F-37 / F-38). Recommend baking "explicitly check Royal Assent of any cited Finance Act" into all future dispatch prompts touching post-Autumn-Budget statutes.
- **Invisible pages are also orphan-in-link-graph** (D-R1 finding). F-11 INVISIBLE pattern is broader than first hypothesised — invisible pages are not just SERP-invisible but also marginalised in internal navigation. Validates cluster-collapse-by-redirect as a default response to INVISIBLE pages.
- **Separate-terminal dispatch with surgical staging + absolute-path tracker/flags/discovery edits scales to 16-brief execution sessions cleanly** with zero Q&A round-trips when launch prompts are comprehensive (the Phase 3 launch prompts averaged ~2,000 words per worktree). Compare to Batch 2 (Agent background mode user-override) — both patterns worked; the separate-terminal pattern is the recommended default per saved feedback.
- **Worktree node_modules are not auto-hoisted** (D-R3). Future worktree creation protocol should include `npm install` at the worktree root as a pre-flight step. Add to the worktree-creation script if one exists.
- **Per-brief commits on worktree branches + manager merge --no-ff at close** gives clean audit trail without conflicts. 17 commits across 3 worktrees merged with zero conflicts (the 16 rewrites all touched different files; the metatrim fixup on c4bbd35 was a same-file follow-up to 716bd74 and merged cleanly).

---

## 5. Next session pickup acknowledgement

If a fresh Track 2 manager picks up here, the appropriate acknowledgement is:

*"Picked up post-Phase-3. Phase 3 closed (22 ops shipped to main HEAD 02ce3bf, build PASS, NOT deployed). Open decisions: A deploy timing / B deploy bundling / C monitored_pages timing-on-deploy / D F-37 deferred to Wave 8 / E D-C5 pricing-leak in Peterborough cohort / F Phase 2 cluster audit dispatch / G reviewedBy standardisation. Ready for user signal on which decision to take first."*

End of close pickup doc.
