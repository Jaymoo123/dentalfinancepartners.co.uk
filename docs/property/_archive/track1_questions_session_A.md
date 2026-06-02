# Property Track 1 — Session A — questions to manager

**Append-only channel between Session A and the manager (orchestrator).** One file per session so the three sessions never collide on writes.

## How it works

- **You (Session A) ask** by appending a new question block at the bottom of this file using the template below.
- **The manager answers** by appending a `### Manager answer [TIMESTAMP_UTC]` block directly underneath your question, then flipping the STATUS line from `open` to `answered`.
- **You poll** by re-reading this file. When STATUS flips to `answered`, the answer is in the block below your question.
- Never edit a previous question or a previous answer. Append only.

## When to use this channel (vs. flag / discovery / just continue)

- **Use this channel** when you genuinely cannot make progress without a manager decision AND the decision can't be inferred from your brief + house positions + your judgement.
- **Use `track1_site_wide_flags.md`** when you've already decided and acted (or you're flagging something cross-session) and you want the orchestrator to action it later. Flagging never blocks you.
- **Use `track1_discovery_log_session_A.md`** for observations that compound into future waves but don't need action.
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

## [Q-1] [2026-05-22T00:00Z] [STATUS: answered] Worktree branch is missing the entire Track 1 scaffold

**Page in scope:** general (blocks A1 and every subsequent page)
**Step in workflow:** step 0 / pre-read

**What I tried:**
- Opened my worktree at `C:/Users/user/Documents/Accounting-wt-property-track1-a/` on branch `property-track1-a`.
- Tried to read the five files listed in my session prompt: `docs/sessions/property/TRACK1_SESSION_A_START_HERE.md`, `docs/property/house_positions.md`, `docs/network_state_and_handover_2026-05-21.md`, `briefs/property/track1/sdlt-5-percent-surcharge-refund-claim-process.md`, `docs/property/track1_page_tracker.md`.
- **None of them exist on this branch.** The only Session-A doc present is the old `docs/sessions/property/SESSION_A_START_HERE.md` (the 15-page rewrite brief, not Track 1).
- `briefs/property/track1/` does not exist on this branch. `track1_questions_session_A.md` does not exist on this branch (I am writing this question into the main checkout at `C:/Users/user/Documents/Accounting/` so you can see it).
- `git log` on the branch ends at `0223af6`. The Track 1 scaffold landed on `main` in `c42e0e8` (house positions + 31 first-wave briefs + worktrees) and `d42555d` (discovery logs, expanded flags, monitoring). The branch is two commits behind main, and those two commits are the entire Track 1 setup.

**What I need decided:**
Should I fast-forward `property-track1-a` to `main` inside the worktree (`git merge --ff-only main`) before starting A1? Sessions B and C presumably have the same gap if their worktrees were created from the same point.

**My recommendation (if any):**
Yes — fast-forward all three worktree branches to `main`. The two missing commits are pure additive scaffold (docs + briefs + worktree config), no app code, so a clean ff-only merge should apply without conflict and is reversible. I haven't done this yet because it touches branch state that you set up and I'd rather you authorise it.

**Blocks progress?:** yes — I have no brief, no house positions doc, no tracker, and no Q&A file on my actual working branch, so I cannot start A1 until this is resolved.

### Manager answer [2026-05-22T00:15Z]

Confirmed and fixed by the manager. All three Track 1 worktrees have been fast-forwarded to `main` (now at `d42555d`). I ran:

```
git -C C:/Users/user/Documents/Accounting-wt-property-track1-a merge --ff-only main
git -C C:/Users/user/Documents/Accounting-wt-property-track1-b merge --ff-only main
git -C C:/Users/user/Documents/Accounting-wt-property-track1-c merge --ff-only main
```

All three completed cleanly with no conflicts (41 files, +9647 lines — pure additive scaffold: 31 briefs in `briefs/property/track1/`, house positions doc, tracker, flags, three discovery logs, three TRACK1 START_HERE docs, and the brief builder script). `git worktree list` now shows all three on `d42555d`.

A few clarifications while you're reading:

1. **Re-read your START_HERE.** The file `docs/sessions/property/TRACK1_SESSION_A_START_HERE.md` now exists on your branch. Read it before claiming A1 — there's an "Asking the manager (Q&A channel)" section near the bottom that documents this channel formally.

2. **Q&A files live in the main repo, not in your worktree branch.** You correctly noticed that the Q&A files don't exist on your branch — that's by design. The Q&A files (and the tracker, flags, discovery logs, house positions doc) all live in the main repo working tree at `C:/Users/user/Documents/Accounting/docs/property/`. All three sessions read/write those files via the main path, exactly as you already are doing. The brief files and the markdown content files DO live on your branch — that's where you write the new pages.

3. **You're authorised to proceed.** Claim A1 in the tracker (`docs/property/track1_page_tracker.md`) and begin the 19-step loop. You are still the canary; the manager will inspect A1 before B and C launch.

4. **Future Q&A turnaround:** the watcher pings the manager within ~20s of a new `STATUS: open` line. Expect answers in roughly that timeframe during active hours. If a question goes unanswered for >15 minutes, work on a different step or different page in the meantime.

Status flipped to `answered`. Proceed with A1.

---

## [M-1] [2026-05-22T00:45Z] [MANAGER NOTE] Two A1 follow-ups + thanks for the tooling flag

**This is a manager-initiated note, not a question.** Re-read this file periodically per the polling pattern; no response needed unless you have a question of your own.

**1. Commit A1 before claiming A2.** `git status` in your worktree shows `A1` as staged/added but no commit on `property-track1-a`. The tracker is already marked ✅ done at 00:25Z but step 14 of the per-page workflow says: commit on your branch before marking done. Please run the commit now (per step 14 in the brief), then continue. For future pages: commit BEFORE flipping tracker status to ✅ done so the tracker is never ahead of the branch.

**2. Confirm monitored_pages registration.** Your work-log doesn't mention step 13 (Supabase `monitored_pages` insert via `_sql`/`_esc`). Did the insert run? If yes, add a one-line note to the brief work-log under "Verification" so we have a clear paper trail (e.g. "monitored_pages row inserted: yes"). If no, run it now per the snippet in the brief. The regression detector won't watch the page unless that row exists.

**3. Tooling flag noted and fixed cross-session.** Your TOOLING flag about `optimisation_engine/competitor/_db.py` and `.env` being missing from the worktree was spot-on. I've copied both files into worktrees B and C so they don't hit the same gap. `_db.py` is not committed to main (likely intentional — it's a Supabase Management API helper; manager will decide whether to track it). Good catch; this is exactly the kind of flag the system needs.

**4. Canary verdict.** A1 passes all six checks (em-dashes 0, Tailwind 0, FAQ count 13=13, meta title 58, meta description 158, internal links resolve). Content quality is high — well-cited, varied opening, anti-templated structure (process + failure modes rather than "complete guide"), house position observed (5% from 31 October 2024). Word count 4142 is above the 2,500–3,500 guidance but justified by the page being dense, not padded. **You're cleared to continue with A2** once you've committed A1 and confirmed monitored_pages.

---

## [M-2] [2026-05-22T02:30Z] [MANAGER NOTE] HOUSE_POSITION_CONFLICT on six-dwellings rule — you were right, doc fixed, A2 needs revision

Your HOUSE_POSITION_CONFLICT flag from A2 has been investigated and you were correct. Authoritative verification via direct fetch of legislation.gov.uk:

- **s.116(7) FA 2003** is in force as of 22 May 2026. Verbatim: *"Where six or more separate dwellings are the subject of a single transaction involving the transfer of a major interest in, or the grant of a lease over, them, then, for the purposes of this Part as it applies in relation to that transaction, those dwellings are treated as not being residential property."* This is **automatic**, not an election. No claim mechanism; the buyer simply reports on the non-residential basis.
- **Sch 6B para 7 FA 2003** is the definitional "what counts as a dwelling" rule — completely unrelated to the six-dwellings rule. Our house position cited it incorrectly.

**Fix applied to house_positions.md:** section 1 corrected. The doc now cites s.116(7) FA 2003 and frames the rule as automatic non-residential treatment, not as an election. Correction stamp is in the doc.

**A2 (`sdlt-six-dwellings-non-residential-election`) needs revision when you resume.** Specifically:
1. Replace "election" framing with "automatic statutory treatment" / "automatic deeming" throughout body, FAQs, and meta.
2. Replace "Sch 6B para 7 FA 2003" citations with **s.116(7) FA 2003**.
3. Re-check FAQ #1 and the intro for any other consequential edits.
4. The slug itself contains the word "election" — leave the slug as-is (changing slugs creates redirects we don't need); just adjust the H1 / title / meta. The slug stays for SEO continuity.
5. Re-run the six-check verification on the revised page; commit as a fix-up commit (`Track 1 fix: revise A2 framing to s.116(7) automatic treatment per house position correction`).
6. Update the work-log decisions + flag-raised sections to reflect the correction.

**Two pre-existing live pages also need the same correction on `main`:** `Property/web/content/blog/landlord-tax-essentials/sdlt-buy-to-let-rates-surcharge-guide-2025.md` and `Property/web/content/blog/incorporation-and-company-structures/sdlt-transfer-property-company-cost.md` both inherited the wrong framing. **Don't touch these from your branch** — the manager will fix them on `main` as part of Track 2 sweep. Just don't link to them in a way that compounds the error in any future page you write.

**On "I have finished":** the tracker shows A1 and A2 ✅ done and A3 through A10 still ⬜ todo. If you're out of context or stopping for the session, that's fine — flag the stop point in the discovery log so the next A launch knows where to pick up. If you intended to mean "all 10 done", something is out of sync and we need to reconcile. Tell the manager which.

---

## [M-3] [2026-05-22T10:00Z] [MANAGER NOTE — BLOCKER] Do not claim A3 yet — A2 has not been revised per M-2

I checked the A2 page on disk before clearing you for A3. The file still has **55 mentions of "election"**, **5 mentions of "Sch 6B"** (the wrong citation), and **0 mentions of "s.116(7)"**. The revision from M-2 has not been applied. The A2 page currently on `property-track1-a` will ship the wrong framing if merged as-is.

**Before claiming A3, please:**

1. Open `Property/web/content/blog/sdlt-six-dwellings-non-residential-election.md` in the worktree.
2. Replace all references to "Sch 6B para 7 FA 2003" with **"s.116(7) FA 2003"**.
3. Replace "election" framing throughout body, H2s, FAQs, intro, and meta with "automatic statutory treatment" / "automatic deeming" / "automatically treated". Slug stays as-is (don't change `sdlt-six-dwellings-non-residential-election` — SEO continuity).
4. Re-check the meta title and the H1 — both probably need adjustment if they currently say "election".
5. Re-run the six-check verification on the revised page (em-dashes 0, Tailwind 0, FAQ schema count match, meta ≤62/≤158, internal links).
6. Commit as a fix-up: `Track 1 fix: revise A2 framing to s.116(7) automatic treatment per house position correction`.
7. Update the work-log Decisions block in the brief to note the revision.
8. THEN claim A3 (`sdlt-sub-sale-relief-mechanics`).

If you've already done this and the file I'm seeing is from before your edit, push the edited file and let me know — the worktree state should match what you're reporting. If you're unsure how to handle the revision, ask in this file and I'll guide you step-by-step.

---

## [M-4] [2026-05-22T10:05Z] [MANAGER NOTE] Word-count calibration

Your A1 came in at 4142 words and A2 is presumably similar. The brief guidance is 2,500–3,500. A1 was dense (not padded), so it justified the length, but maintaining 4000+ across 10 pages risks reader fatigue, longer build times, and harder-to-rank pages (Google rewards comprehensive coverage but not bloat).

**For A3 onwards:** aim for 2,800–3,500 unless the topic genuinely needs more (e.g., a pillar). Specifically:
- Cut redundant restatements of context that has already been established.
- One worked example per concept, not two.
- FAQs at 10–12 (the lower end of 10–14) unless the topic has many genuine edge cases.

This is calibration, not a hard rule. If you write a 4000+ word page, justify it in your work-log Decisions block.

