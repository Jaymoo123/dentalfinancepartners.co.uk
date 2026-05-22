# Wave 3 launch prompts (paste-verbatim into three fresh Claude Opus 4.7 sessions)

**Wave 3 prep is complete.** Stage 1 (infra + scaffolding) landed at commits `730add8` + `1806580`. Stage 2 (brief reasoning gen + house position corrections) landed at `652e81d`. The three sessions are ready to launch.

Open three fresh Claude Code (Opus 4.7) sessions, **one in each worktree**, and paste the matching prompt verbatim.

Manager (you) holds the watcher-arm + Q&A answer responsibilities throughout the wave. See `docs/property/NETNEW_PROGRAM.md` §13 for the session-manager protocol.

---

## Session A — ATED — paste in `C:/Users/user/Documents/Accounting-wt-property-wave3-a/`

```
You are Session A in Wave 3 of the Property Net-New Program. Your assignment is the ATED bucket: 10 net-new pages on Annual Tax on Enveloped Dwellings, written from scratch into a fresh Property worktree.

Worktree: C:/Users/user/Documents/Accounting-wt-property-wave3-a/
Branch: property-wave3-a (at main HEAD when launched)
Sibling sessions: Session B (MTD ITSA, branch property-wave3-b) and Session C (Renters' Rights Act 2025, branch property-wave3-c) are working in their own worktrees concurrently. You will never collide.

Pickup checklist (read in this order before any output):
1. docs/sessions/property/WAVE3_SESSION_A_START_HERE.md , your task brief. Read end-to-end.
2. docs/property/house_positions.md , the locked factual positions. For your bucket, read section 2 (headline ATED) AND section 18 (Wave 3 ATED extension, verified 2026-05-22, bands locked to gov.uk).
3. docs/property/NETNEW_PROGRAM.md , the durable program doc. Section 4 (brief anatomy), section 7 (19-step workflow), section 8.4 (session-side watcher), section 16 (lessons learned 16.11 through 16.21).
4. docs/property/wave3_page_tracker.md , the master tracker. Your assigned pages are the Session A rows (A1 through A10).
5. docs/property/wave3_site_wide_flags.md , the flags file. Read F-2 through F-5 in particular; they affect your bucket (F-2 category override recommendation, F-3 cannibalisation watchpoints, F-4 internal-link back-patch suggestions, F-5 verification confirmation).
6. Your 10 briefs at briefs/property/wave3/ated-*.md. Each brief has its full Stage 2 reasoning: validated competitor URLs, reasoned closest-existing pages, redirect-overlap check, bucket-specific authority links, universal rules, the 19-step workflow, and an empty per-page work-log block you fill as you write.

Acknowledge with one short status line: "Session A picked up. Worktree at HEAD [commit]. Reading briefs and starting A1." Nothing longer.

Then claim ONE page in wave3_page_tracker.md (todo to in_progress + UTC timestamp), read its brief, follow the 19-step workflow. Wave 2 lessons baked into your START_HERE: tracker-flip-on-context-pressure (section 16.14), no branch tracker commits (section 16.15), framing-differentiator-led word count (section 16.16), atomic recovery (section 16.17). Use the session-side watcher pattern (section 8.4) when you raise a Q&A.

If you hit a question that blocks progress, append to docs/property/wave3_questions_session_A.md with STATUS: open, spawn a session-side Monitor watcher, and keep working a different step or page until the manager answers. Manager watcher polls the questions file every 20 seconds.
```

---

## Session B — MTD for ITSA — paste in `C:/Users/user/Documents/Accounting-wt-property-wave3-b/`

```
You are Session B in Wave 3 of the Property Net-New Program. Your assignment is the MTD for ITSA bucket: 10 net-new pages on Making Tax Digital for Income Tax Self-Assessment, written from scratch into a fresh Property worktree.

Worktree: C:/Users/user/Documents/Accounting-wt-property-wave3-b/
Branch: property-wave3-b (at main HEAD when launched)
Sibling sessions: Session A (ATED) and Session C (Renters' Rights Act 2025) are working concurrently in their own worktrees.

Pickup checklist (read in this order before any output):
1. docs/sessions/property/WAVE3_SESSION_B_START_HERE.md , your task brief. Read end-to-end.
2. docs/property/house_positions.md , the locked factual positions. For your bucket, read section 3 (headline MTD ITSA) AND section 19 (Wave 3 MTD extension, verified 2026-05-22). **PAY PARTICULAR ATTENTION TO SECTION 19.7 PENALTY REGIME** , the late-payment day-triggers were corrected from 31/46/91 to 15/30/31 by Stage 2 (Correction logged 2026-05-22, source gov.uk Spring Statement 2025 HTML). Use 15 / 30 / 31 day-triggers with 3% / 3% / 10% percentages in any penalty content. The legacy 31 / 46 / 91 schedule applies only to non-MTD income tax and VAT.
3. docs/property/NETNEW_PROGRAM.md , the durable program doc. Section 4 (brief anatomy), section 7 (19-step workflow), section 8.4 (session-side watcher), section 16 (lessons learned, especially 16.11 / 16.16 / 16.17 / 16.18 / 16.19 / 16.20).
4. docs/property/wave3_page_tracker.md , the master tracker. Your assigned pages are the Session B rows (B1 through B10).
5. docs/property/wave3_site_wide_flags.md , the flags file. F-6 is your bucket's critical broadcast (the section 19.7 correction).
6. Your 10 briefs at briefs/property/wave3/mtd-itsa-*.md. Each brief has its full Stage 2 reasoning: validated competitor URLs, reasoned closest-existing pages, redirect-overlap check, bucket-specific authority links, universal rules, 19-step workflow, empty work-log block.

Acknowledge with one short status line: "Session B picked up. Worktree at HEAD [commit]. Section 19.7 day-trigger correction noted, starting B1." Nothing longer.

Then claim ONE page in wave3_page_tracker.md, read its brief, follow the 19-step workflow. Wave 2 lessons (16.14 through 16.17) are baked into your START_HERE. Session-side watcher pattern (section 8.4) when you raise a Q&A.

If you hit a question that blocks progress, append to docs/property/wave3_questions_session_B.md with STATUS: open, spawn a session-side Monitor watcher, and keep working.
```

---

## Session C — Renters' Rights Act 2025 — paste in `C:/Users/user/Documents/Accounting-wt-property-wave3-c/`

```
You are Session C in Wave 3 of the Property Net-New Program. Your assignment is the Renters' Rights Act 2025 bucket: 10 net-new pages on the post-Royal-Assent RRA 2025 regime, written from scratch into a fresh Property worktree.

Worktree: C:/Users/user/Documents/Accounting-wt-property-wave3-c/
Branch: property-wave3-c (at main HEAD when launched)
Sibling sessions: Session A (ATED) and Session B (MTD ITSA) are working concurrently in their own worktrees.

Pickup checklist (read in this order before any output):
1. docs/sessions/property/WAVE3_SESSION_C_START_HERE.md , your task brief. Read end-to-end.
2. docs/property/house_positions.md , the locked factual positions. For your bucket, read section 12 (RRA in-passage placeholder, retained for audit) AND section 20 (Wave 3 RRA extension, the post-Royal-Assent locked detail, verified legislation.gov.uk 2026-05-22). **PAY PARTICULAR ATTENTION TO SECTION 20.12 COMMENCEMENT TIMELINE** , Stage 2 added a 15-provision table showing which RRA sections are IN FORCE versus SCHEDULED as of 2026-05-22. Use present tense for the 1 May 2026 provisions (Section 21 abolition, periodic-tenancy default, Section 8 reform, Section 13 rent procedure, advance-rent ban, pet rights s.11, bidding-wars prohibition, civil-penalty regime, Ombudsman duty-to-belong s.74). Frame the still-scheduled provisions as "scheduled, pending further commencement order" (full Landlord Redress Scheme, PRS Database, full Decent Homes PRS extension).
3. docs/property/NETNEW_PROGRAM.md , the durable program doc. Section 4 (brief anatomy), section 7 (19-step workflow), section 8.4 (session-side watcher), section 16 (lessons learned 16.11 through 16.21).
4. docs/property/wave3_page_tracker.md , the master tracker. Your assigned pages are the Session C rows (C1 through C10).
5. docs/property/wave3_site_wide_flags.md , the flags file. **F-1 is critical for your bucket** , it documents the C1 swap (original C1 reframed as a legacy-rebuild item, replaced by `rra-2025-landlord-enforcement-civil-penalties-banning-orders-defence`) AND the site-wide RRA-2026 citation back-patch sweep (parked for post-Wave-3 hygiene, do NOT mix into your branch commits).
6. Your 10 briefs at briefs/property/wave3/. Your file set: rra-2025-landlord-enforcement-civil-penalties-banning-orders-defence, section-21-abolition-uk-landlord-possession-guide-2026, periodic-tenancy-default-ast-conversion-mechanics, renters-rights-act-rent-increase-section-13-tribunal-route, decent-homes-standard-prs-landlord-compliance-checklist, prs-database-landlord-ombudsman-registration-requirements, pet-rights-tenancy-landlord-refusal-reasonable-grounds, tenancy-agreement-template-rra-2025-compliant-clauses, landlords-considering-selling-portfolio-rra-2025-tax-implications, bidding-wars-asking-rent-cap-landlord-marketing-compliance. Each has its full Stage 2 reasoning.

Acknowledge with one short status line: "Session C picked up. Worktree at HEAD [commit]. Section 20.12 commencement timeline noted, F-1 swap context understood, starting C1." Nothing longer.

Then claim ONE page in wave3_page_tracker.md, read its brief, follow the 19-step workflow. Wave 2 lessons (16.14 through 16.17) baked into your START_HERE. Session-side watcher pattern (section 8.4) when you raise a Q&A.

Note: two of your briefs (C4 rent-increase, C8 tenancy-agreement-template) have competitor URLs that block raw httpx with 403; use the WebFetch tool (not raw httpx) for those two URLs.

If you hit a question that blocks progress, append to docs/property/wave3_questions_session_C.md with STATUS: open, spawn a session-side Monitor watcher, and keep working.
```

---

## Manager checklist after launching the three sessions

1. **Arm the manager-side Q&A watcher.** Run the Monitor pattern from NETNEW_PROGRAM §8.3 against the three `wave3_questions_session_{A,B,C}.md` files. Persistent: true. Polling every 20s. Stop with `TaskStop` at wave end.
2. **Watch the three sessions' first 2-3 commits per branch.** Wave 1 / 2 calibration was needed mid-wave; spot-check page 2-3 from each session for framing-differentiator adherence + word-count discipline (§16.16) + tracker-on-main not tracker-on-branch (§16.15).
3. **Answer Q&A questions promptly.** Sessions are using the session-side watcher pattern (§8.4) and will be productive on a different page while waiting, but a stale answer slows the wave.
4. **Spot-check the §19.7 day-triggers** in any MTD ITSA page that touches penalty mechanics. Sessions reading the corrected position should write 15/30/31 with 3%/3%/10%; flag any 31/46/91 drift immediately.
5. **Spot-check RRA tense discipline.** Sessions should write present-tense for provisions in force from 1 May 2026 (per §20.12 commencement timeline). Anything written as "the Act will" or "the Bill proposes" is stale framing; flag immediately.
6. **Hold deploy pending review.** Wave 1 + Wave 2 are not yet deployed; Wave 3 joins the held queue. F-1 site-wide RRA-2026 citation back-patch sweep + the legacy `renters-rights-act-2026-tax-implications-landlords` page rewrite belong in the post-Wave-3 hygiene batch, not in Wave 3 branches.
