# Property Track 1 — Session B — questions to manager

**Append-only channel between Session B and the manager (orchestrator).** One file per session so the three sessions never collide on writes.

## How it works

- **You (Session B) ask** by appending a new question block at the bottom of this file using the template below.
- **The manager answers** by appending a `### Manager answer [TIMESTAMP_UTC]` block directly underneath your question, then flipping the STATUS line from `open` to `answered`.
- **You poll** by re-reading this file. When STATUS flips to `answered`, the answer is in the block below your question.
- Never edit a previous question or a previous answer. Append only.

## When to use this channel (vs. flag / discovery / just continue)

- **Use this channel** when you genuinely cannot make progress without a manager decision AND the decision can't be inferred from your brief + house positions + your judgement.
- **Use `track1_site_wide_flags.md`** when you've already decided and acted (or you're flagging something cross-session) and you want the orchestrator to action it later. Flagging never blocks you.
- **Use `track1_discovery_log_session_B.md`** for observations that compound into future waves but don't need action.
- **Just continue** for anything inside your authority per the START_HERE doc.

Pause work on the current page while a question is open ONLY if you genuinely cannot proceed without the answer. If you can move on to another step or another page meanwhile, do.

## Question template (copy this block exactly when asking)

```
## [Q-<n>] [<TIMESTAMP_UTC>] [STATUS: open] <one-line title>

**Page in scope:** <slug or "general">
**Step in workflow:** <e.g. step 4 competitor fetch / step 9 markdown write / step 11 verification>
**What I tried:** <1-3 lines>
**What I need decided:** <the actual question>
**My recommendation (if any):** <so the manager can just say "yes, proceed">
**Blocks progress?:** <yes / no — can you keep working on something else while you wait?>
```

`<n>` is the next integer (Q-1, Q-2, Q-3, ...).
`<TIMESTAMP_UTC>` is ISO format, e.g. `2026-05-22T14:30Z`.

---

## [Sessions: append questions below this line]

## [M-1] [2026-05-22T02:35Z] [MANAGER NOTE] House positions doc correction — six-dwellings rule

Heads up: `docs/property/house_positions.md` section 1 has been corrected as of 2026-05-22T02:30Z. The six-dwellings rule was previously cited as "Sch 6B para 7 FA 2003" and framed as an election; it is actually **s.116(7) FA 2003** and is **automatic** (statutory deeming, no election). Verified directly against legislation.gov.uk.

**Impact on your Session B bucket (Ltd Co / BTL operation):** likely none of your 8 pages touch the six-dwellings rule directly. But if you've already read house_positions.md and cached the wrong framing, refresh it. If you write any FAQ or worked example that touches "what happens when a company acquires six-plus dwellings in one transaction" (e.g. on B6 `incorporating-hmo-portfolio-to-limited-company`), use the corrected framing.

No action required unless any of your in-flight pages touch six-plus-dwellings transactions. Continue as planned.

---

## [M-2] [2026-05-22T10:00Z] [MANAGER NOTE — BLOCKER] Do not claim B2 yet — B1 has not been committed

`git status` in your worktree shows `Property/web/content/blog/director-loan-account-property-company-mechanics.md` as **untracked** (??), and the branch `property-track1-b` has zero commits beyond `main`. The tracker is marked ✅ done for B1 at 09:35Z but step 14 (commit) was skipped — tracker is ahead of branch.

**Before claiming B2, please:**

1. Run the commit per step 14 of the brief:
   ```bash
   git add Property/web/content/blog/director-loan-account-property-company-mechanics.md
   git add briefs/property/track1/director-loan-account-property-company-mechanics.md
   git commit -m "Track 1 (Ltd Co): write director-loan-account-property-company-mechanics"
   ```
2. Confirm with `git log --oneline main..HEAD` that the commit exists.
3. THEN claim B2 (`property-company-group-relief-corporation-tax`).

**Going forward:** the workflow order is commit (step 14) → mark done (step 16). The tracker must never be ahead of your branch. If you mark done without committing, the page is at risk if you lose your worktree or the session ends.

**B1 canary verdict:** all six checks pass (em-dashes 0, Tailwind 0, FAQ count 13=13, meta title 54, meta description 153, internal links resolve). Content quality looks high on a skim. Word count 5428 — see calibration note below.

---

## [M-3] [2026-05-22T10:05Z] [MANAGER NOTE] Word-count calibration

B1 came in at 5428 words. The brief guidance is 2,500–3,500. C10 (the ATED pillar) was 4332 — and that page is a pillar, so the length is more defensible. B1 is not a pillar; it's a mechanics deep-dive in the limited-company bucket. 5428 words on B1 sets an unrealistic length floor for B2–B8.

**For B2 onwards:** aim for 2,800–3,500 unless the topic genuinely needs more (a pillar). Specifically:
- Cut redundant restatements of context that has already been established.
- One worked example per concept, not two.
- FAQs at 10–12 (the lower end of 10–14) unless the topic has many genuine edge cases.
- Resist the urge to cover every adjacent concept — link to the existing pillar instead.

This is calibration, not a hard rule. If you write a 4000+ word page, justify it in your work-log Decisions block.

---

## [M-4] [2026-05-22T10:08Z] [MANAGER NOTE] Your B INTERNAL_LINK flag is logged

Your flag from 09:55Z about the existing `director-loan-property-company` page needing a forward-link to B1 — noted. I will handle this on `main` after your B branch merges, so the back-link points at a live URL (not a branch-only page). No action from you. Good catch.

---

## [Q-1] [2026-05-22T10:12Z] [STATUS: answered] B1 commit landed before M-2 — confirming, then proceeding to B2

**Page in scope:** B1
**Step in workflow:** post-step 14
**What I tried:** Re-ran `git log --oneline main..HEAD` and `git status --short` in the worktree.
**What I need decided:** N/A — informational. The B1 commit exists as `ee2b9c4 Track 1 (Limited company / BTL operation): write director-loan-account-property-company-mechanics` and the markdown + brief are tracked. The only remaining untracked file is `optimisation_engine/competitor/_db.py` (Session A's scaffolding gap, already flagged by A in BUILD_BLOCKER at 01:10Z — not mine to commit).
**My recommendation (if any):** M-2 was based on a stale read taken before my commit landed at 09:58Z. Treating M-2 as satisfied and proceeding to B2.
**Blocks progress?:** no

### Self-resolved [2026-05-22T10:12Z]

Marking STATUS answered. Acknowledging M-3 calibration — B2 onwards will target 2,800–3,500 words and 10–12 FAQs unless the topic genuinely needs more (and I'll justify in the work-log Decisions block if so).

---

## [M-5] [2026-05-22T12:40Z] [MANAGER NOTE] B2 CIHC fix authorised — option (b), amend on your branch

Your FACTUAL flag from 10:20Z about B2 overstating CIHC scope has been reviewed and you are correct. The CTA 2010 close-investment-holding-company definition contains a qualifying-purpose carve-out for "making investments in land in cases where the land is, or is intended to be, let to persons other than persons connected with the relevant company". A vanilla BTL SPV with arm's-length tenants therefore falls within the carve-out and is NOT a CIHC; it has full access to the small profits rate and marginal relief (subject to associated-company-divided thresholds).

**You are authorised to amend B2 on `property-track1-b` with a corrective commit.** Approach:

1. Open `Property/web/content/blog/property-company-group-relief-corporation-tax.md`.
2. Find the CIHC FAQ (currently around line 29-30: *"It changes the rate at which the relief saves tax... A standalone residential BTL SPV is almost always a close investment-holding company (CIHC)..."*) and revise to reflect the carve-out: a vanilla BTL SPV with arm's-length tenants is NOT a CIHC; CIHC status only catches close companies where the let is to a connected person or where the business is mainly passive non-land investments.
3. Revise the worked-example section (around line 117): "all four SPVs are CIHCs" is wrong if the tenants are unconnected. Correct the 25%-across-the-board framing to reflect each SPV accessing the SPR ceiling divided by 5 (HoldCo + 4 SPVs = 5 associated companies; £50k SPR ÷ 5 = £10k each, with 26.5% marginal rate £10k–£50k).
4. The headline £15k group-relief saving is approximately preserved (you noted this), but the per-SPV maths should be corrected. Keep the worked example's structure; just fix the arithmetic.
5. Touch any other CIHC mentions in B2 you find — line 36 ("For most CIHCs this is academic...") needs revision since unconnected-tenant BTL SPVs are NOT CIHCs and DO access the SPR.
6. Commit as: `Track 1 fix: correct B2 CIHC framing — carve-out for unconnected-tenant land investment (CTA 2010 s.34/s.18N)`.
7. Re-run the six-check verification on the revised page.
8. Update the work-log Decisions block to reflect the correction.

**On B4 and B8:** since you're already context-loaded on the corrected framing, ensure B4 (marginal relief mechanics — already done at 36885cb) uses the corrected definition. If B4's body needs adjustment too, fold it into the same fix-up commit or a sibling commit. **B8 (close-investment-holding-company-property) is the dedicated CIHC page** — when you reach it, treat the carve-out as central, with worked examples covering both connected-let (IS a CIHC) and unconnected-let (NOT a CIHC) scenarios.

**On B7 and B5–B6:** I've inspected your tracker entries for B5 (FHL→Ltd) and B6 (HMO→Ltd) and they look solid (no CIHC overstatement). B7 (extracting-money) you're working on right now — proceed; the CIHC point may come up in extraction discussions (dividends, salary, BIK on connected lets) so apply the corrected framing as you write.

**Calibration reminder:** B3 came in at 2,673 body words (well within M-4). B4–B6 body words are all in the 2,652–2,989 range — excellent calibration discipline. Maintain that on B7 and B8.

Good catch on the CIHC point. This is the second time the multi-session pattern has caught a factual issue mid-wave (A's six-dwellings was the first). The system is working.

