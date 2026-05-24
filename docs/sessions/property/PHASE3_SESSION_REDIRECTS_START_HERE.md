# Phase 3 Session REDIRECTS — paste-ready pickup

**How to use this file:** open a new Claude Code terminal at `C:/Users/user/Documents/Accounting-wt-property-track2-phase3-redirects/`. Copy everything below the first horizontal rule and paste as the first message in that terminal. **Only dispatch this AFTER worktrees A + B + C have returned their chat summaries** — the REDIRECT bundle must merge LAST.

---

You are the Worktree REDIRECTS sub-agent for Track 2 Phase 3 — REDIRECT bundle EXECUTION. Working in the worktree branch `track2-phase3-redirects` at `C:/Users/user/Documents/Accounting-wt-property-track2-phase3-redirects/`. Bucket: 6 REDIRECT operations across the 60-day-CGT cluster collapse (5 redirects → `cgt-payment-deadlines-property-sales-2026`) + 1 cross-cluster redirect (1 → `cgt-selling-buy-to-let-property-calculation-guide`).

**This is NOT brief drafting (Stage 2). This is EXECUTION — you take 6 REDIRECT-PROPOSED briefs, you make the redirects live in middleware.ts, you delete the 6 source markdowns, you patch every internal link on the site that points to the 6 deleted slugs.**

**Q&A discipline (§16.15 + §16.37 critical):** when raising a Q to manager, append to `C:/Users/user/Documents/Accounting/docs/property/track2_phase3_questions_redirects.md` via ABSOLUTE PATH. Same discipline for tracker, flags, discovery.

Read first, in this order (~20 minutes):
1. `C:/Users/user/Documents/Accounting/docs/property/TRACK2_PROGRAM.md` — §0 norms, §7 cannibalisation protocol, §10 tracker convention, §13 sub-agent instructions, §15 quality gates.
2. `C:/Users/user/Documents/Accounting/docs/property/NETNEW_PROGRAM.md` §16 lessons — particularly §16.14/§16.15/§16.37 absolute-path tracker edits + §16.31 URL liveness + §16.36 statutory-citation cross-check.
3. `C:/Users/user/Documents/Accounting/docs/property/track2_page_tracker.md` — confirm your 6 rows in the Phase 3 dispatch section + read the post-merge close tasks.
4. `C:/Users/user/Documents/Accounting/docs/property/track2_cannib_index_2026-05-23.md` — §6 known cross-source pairs + §7 in-flight tables.
5. **The 6 REDIRECT briefs** at:
   - `C:/Users/user/Documents/Accounting/briefs/property/track2/batch1_cgt/sub_b/60-day-cgt-reporting-property-sales-complete-guide.md` (B1-B1)
   - `C:/Users/user/Documents/Accounting/briefs/property/track2/batch1_cgt/sub_b/60-day-cgt-reporting-property-sales-rule.md` (B1-B2)
   - `C:/Users/user/Documents/Accounting/briefs/property/track2/batch1_cgt/sub_b/cgt-reporting-deadlines-property-2026.md` (B1-B3) — F-15 lift already shipped on main; verify the lifted content survives in the calculation walkthrough sibling before deleting this source
   - `C:/Users/user/Documents/Accounting/briefs/property/track2/batch2_cgt/sub_a/how-to-report-property-sale-hmrc-60-days.md` (B2-A1) — D-11 lift already shipped on main; verify the lifted content survives in the 60-day-CGT canonical before deleting this source
   - `C:/Users/user/Documents/Accounting/briefs/property/track2/batch2_cgt/sub_a/report-property-sale-hmrc-60-days-guide.md` (B2-A2)
   - `C:/Users/user/Documents/Accounting/briefs/property/track2/batch2_cgt/sub_a/capital-gains-tax-selling-rental-property-uk.md` (B2-A3) — D-12 lift already shipped on main; verify the lifted content survives in the BTL CGT calculation canonical before deleting this source
6. **The 2 redirect target canonicals** (read end-to-end before any redirect lands):
   - `C:/Users/user/Documents/Accounting/Property/web/content/blog/cgt-payment-deadlines-property-sales-2026.md` (target for B1-B1, B1-B2, B1-B3, B2-A1, B2-A2) — verify F-13 back-patch still present + D-11 lift (H3 "Filing without digital access") still present
   - `C:/Users/user/Documents/Accounting/Property/web/content/blog/cgt-selling-buy-to-let-property-calculation-guide.md` (target for B2-A3 only) — verify D-12 lift (H2 "Capital Losses on Disposal") still present
7. **The current middleware.ts** at `C:/Users/user/Documents/Accounting-wt-property-track2-phase3-redirects/Property/web/src/middleware.ts` — search for `DUPLICATE_REDIRECTS` map; understand the format of existing entries; you will add 6 new entries.
8. `C:/Users/user/Documents/Accounting/docs/property/track2_site_wide_flags.md` — full file. **Read F-13 + F-14 + F-15 + F-16 + F-19 + F-21 + F-22 + F-32 + F-33 + F-34 + F-35 + resolution log** for context on cluster + canonical state.

**Your 6 REDIRECTs (2 commit bundles):**

**Commit 1 — 5 redirects to `cgt-payment-deadlines-property-sales-2026` (F-16 cluster collapse complete):**
- B1-B1: `60-day-cgt-reporting-property-sales-complete-guide` → `cgt-payment-deadlines-property-sales-2026`
- B1-B2: `60-day-cgt-reporting-property-sales-rule` → `cgt-payment-deadlines-property-sales-2026`
- B1-B3: `cgt-reporting-deadlines-property-2026` → `cgt-payment-deadlines-property-sales-2026`
- B2-A1: `how-to-report-property-sale-hmrc-60-days` → `cgt-payment-deadlines-property-sales-2026`
- B2-A2: `report-property-sale-hmrc-60-days-guide` → `cgt-payment-deadlines-property-sales-2026`

**Commit 2 — 1 redirect to `cgt-selling-buy-to-let-property-calculation-guide`:**
- B2-A3: `capital-gains-tax-selling-rental-property-uk` → `cgt-selling-buy-to-let-property-calculation-guide`

**Per-bundle workflow:**

**Pre-redirect verification (do once, for all 6):**

1. **Claim the rows:** mark all 6 Phase 3 status rows 🔵 phase3_in_progress in tracker via ABSOLUTE PATH to main repo file.
2. **Lift verification:** confirm the 3 pre-execution lifts are still present on main:
   - Open `C:/Users/user/Documents/Accounting-wt-property-track2-phase3-redirects/Property/web/content/blog/cgt-calculation-selling-buy-to-let-property-step-by-step.md` — Grep for "Worked example 2a: large gain with a small unused basic-rate band" — must be present (F-15)
   - Open `C:/Users/user/Documents/Accounting-wt-property-track2-phase3-redirects/Property/web/content/blog/cgt-selling-buy-to-let-property-calculation-guide.md` — Grep for "Capital Losses on Disposal" + "TMA 1970 s.43" must both be present (D-12)
   - Open `C:/Users/user/Documents/Accounting-wt-property-track2-phase3-redirects/Property/web/content/blog/cgt-payment-deadlines-property-sales-2026.md` — Grep for "Filing without digital access" + "0300 200 3300" must both be present (D-11) + F-13 back-patch verify: Grep for "paragraph 3 sets the reporting and payment obligation, extended from 30 to 60 days by the Finance Act 2022" must be present
   - **If ANY of the lifts is missing on the worktree branch, do NOT proceed — STOP and flag to manager** (something has gone wrong with the worktree base or with the manager's main commits).
3. **Canonical health-check:** Read both target canonicals end-to-end. Confirm structure + voice + completeness — these are absorbing 5 + 1 redirect equities. No content edits at this step; just verification that the canonicals are ready to absorb.

**Commit 1 — 5 redirects to 60-day-CGT canonical:**

4. **Middleware edit (single edit, 5 entries):** open `Property/web/src/middleware.ts` in the worktree subdir. Locate `DUPLICATE_REDIRECTS` map. Add 5 entries — preserve the existing map's format exactly. Each entry maps the source slug to the canonical slug. Confirm Edit tool sees the EXACT existing format before adding (no whitespace drift).
5. **Delete 5 source markdowns** from `Property/web/content/blog/`:
   - `60-day-cgt-reporting-property-sales-complete-guide.md`
   - `60-day-cgt-reporting-property-sales-rule.md`
   - `cgt-reporting-deadlines-property-2026.md`
   - `how-to-report-property-sale-hmrc-60-days.md`
   - `report-property-sale-hmrc-60-days-guide.md`
   Use `git rm` for clean staging.
6. **Internal-link survey for 5 slugs:** Grep across:
   - `Property/web/content/blog/*.md` for each of the 5 deleted slugs (full-path internal `<a href>` and slug-only references)
   - `Property/web/src/**/*.tsx` for each of the 5 deleted slugs (component-level cross-references)
   - `Property/web/src/**/*.ts` for each of the 5 deleted slugs (data-file references like sitemap inputs, related-post arrays)
   Per F-11 INVISIBLE-page pattern + B2-A1's 12-GA4-sessions-vs-2-baseline finding: B2-A1's internal-link footprint is non-trivial. Expect ~10-30 hits across the 5 slugs combined. Update each occurrence to the canonical slug `cgt-payment-deadlines-property-sales-2026`.
7. **Build verify after middleware + deletions + link patches:** `cd Property/web && npm run build`. Must pass; sitemap regenerates without the 5 old slugs. Sitemap should grow shorter by 5 entries.
8. **Commit 1 (surgical):** stage the modified middleware.ts + the 5 git-rm'd source markdowns + every modified internal-link-surveyed file. Commit message: `Track 2 Phase 3 (redirects): 5-redirect bundle to cgt-payment-deadlines-property-sales-2026 canonical (F-16 cluster collapse complete)`. Include in commit body: source slug list + internal-link patch count + sitemap delta confirmation.

**Commit 2 — 1 redirect to BTL CGT calculation canonical:**

9. **Middleware edit (1 entry):** add 1 entry to `DUPLICATE_REDIRECTS` map for B2-A3.
10. **Delete 1 source markdown:** `git rm Property/web/content/blog/capital-gains-tax-selling-rental-property-uk.md`.
11. **Internal-link survey for 1 slug:** Grep across `*.md` + `*.tsx` + `*.ts` for `capital-gains-tax-selling-rental-property-uk`. Update each occurrence to `cgt-selling-buy-to-let-property-calculation-guide`.
12. **Build verify:** `cd Property/web && npm run build`. Must pass; sitemap delta = -1.
13. **Commit 2:** stage middleware + deletion + link patches. Commit message: `Track 2 Phase 3 (redirects): 1-redirect bundle to cgt-selling-buy-to-let-property-calculation-guide canonical`.

**Post-bundle:**

14. **Tracker mark-done:** mark all 6 Phase 3 status rows ✅ executed in tracker via ABSOLUTE PATH. Record both commit hashes in the Branch + Commit columns of the original Batch 1/2 sub-bucket B + sub-bucket A row tables.
15. **monitored_pages staging:** append to discovery log 6 lines for redirect_post inserts:
    - `monitored_pages row needed: source=<slug>, target=<canonical>, tracking_type=redirect_post, redirect_date=<today>, window=90d` × 6
    Manager batch-inserts at close.
16. **Cannib Index close:** append to discovery log: "F-16 cluster collapse COMPLETE — 5-page collapse to cgt-payment-deadlines-property-sales-2026; B2-A3 standalone redirect to cgt-selling-buy-to-let-property-calculation-guide. Recommend manager mark F-16 RESOLVED in track2_site_wide_flags.md resolution log + close §7 Batch 1 + Batch 2 in-flight tables in Cannibalisation Index."
17. **Discovery log final entry:** any execution-time finding (internal-link patches surprise count, build edge cases, middleware format learnings). Numbering: D-R1, D-R2, etc.
18. **Flag log:** if you find a new pattern flag during execution, append to `track2_site_wide_flags.md`. Phase 3 starts at F-37.

**Hard constraints (Phase 3 — inherits Track 2 norms):**
- Do NOT delete the 3 pre-execution-lift target canonicals (cgt-calculation-selling-buy-to-let-property-step-by-step / cgt-selling-buy-to-let-property-calculation-guide / cgt-payment-deadlines-property-sales-2026) — they're the redirect TARGETS, not sources.
- Do NOT touch any other markdown file in `Property/web/content/blog/` outside the 6 named sources.
- Do NOT touch any Wave 5/6/7 file outside the absolute-path-tracker / flags / discovery files.
- Do NOT auto-deploy.
- Do NOT use `git add .` or `git add -A`. Surgical staging only.
- Do NOT commit on main directly. Worktree branch only.
- Do NOT amend or force-push.
- Do NOT skip build verification.

**Manager merge order at close:** A → B → C → REDIRECTS. Your worktree merges LAST so that the canonical depth-ups in worktrees A + B + C (where applicable) land before the redirect bundle removes the legacy sources. If any of worktrees A/B/C hasn't merged, do NOT merge yet — flag to manager and wait.

**Output to chat when complete:**

```
Worktree REDIRECTS Phase 3 close — 6 redirects across 2 commits

Commit 1 (5 redirects to cgt-payment-deadlines-property-sales-2026): <commit hash>
- Sources deleted: B1-B1, B1-B2, B1-B3, B2-A1, B2-A2
- Middleware entries added: 5
- Internal-link patches: <count> across <file count> files
- Sitemap delta: -5

Commit 2 (1 redirect to cgt-selling-buy-to-let-property-calculation-guide): <commit hash>
- Sources deleted: B2-A3
- Middleware entries added: 1
- Internal-link patches: <count> across <file count> files
- Sitemap delta: -1

Build verify: PASS / FAIL (details)
F-16 cluster collapse: COMPLETE
Lift verifications passed: F-15 / D-11 / D-12 all present on worktree branch
monitored_pages staging: 6 rows recorded in discovery log
Branch: track2-phase3-redirects at <commit 2 hash>
Time taken: <hours>
Open questions for manager: <list, or "none">
```

**Time estimate:** 2-3 hours total. Most of the time is internal-link survey + verification (manual Grep-and-Edit across many files). The middleware edit + deletions themselves are fast.
