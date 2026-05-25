# Wave 9 page tracker

**Created:** 2026-05-25. **Status:** Pre-launch (all picks ⬜ todo). Wave 9 = 29 net-new pages across 3 buckets (Bucket A FIG/non-dom IHT/leaving-UK 10 + Bucket B Transactions-in-UK-land/developer 10 + Bucket C VAT operational depth 9). HP-lock state: 8 commits since Wave 7 close — §21.A CT three-figure framework + §17.8/9/10 FIG/TRF/rebasing + §22.5 refresh + §22.X IHT LTR + §28 Transactions in UK land + §25.12 LRR + §29 NEW VAT cluster (Stage 1b HP-gap closure). Stage 1a complete (28 seeds delivered); Stage 1b complete (5 drift catches closed + §29 lock); Stage 2 dispatched 2026-05-25 (3 parallel sub-agents).

Tracker columns: status | bucket-pos | slug | category | body words | FAQ count | monitored_pages ID | session notes.

**Status legend:** ⬜ todo / 🟦 in progress / ✅ done / ⚠ blocked / 🔁 needs back-patch.

**Discipline reminder (§16.14, §16.15, §16.37):** all session-time tracker edits go to THIS file in main via absolute path `C:/Users/user/Documents/Accounting/docs/property/wave9_page_tracker.md`. NEVER commit tracker edits on a worktree branch — branch-copy edits cause merge conflicts at wave close. Q&A files use same absolute-path discipline (see Q&A shell file headers).

---

## Session A — Bucket A: FIG / non-dom IHT / leaving-UK depth (10 pages)

| Status | Pos | Slug | Category | Body words | FAQs | MP ID | Notes |
|---|---|---|---|---|---|---|---|

## Session B — Bucket B: Transactions in UK land + developer tax (10 pages)

| Status | Pos | Slug | Category | Body words | FAQs | MP ID | Notes |
|---|---|---|---|---|---|---|---|

## Session C — Bucket C: VAT operational depth on commercial property (9 pages — C4 dropped at cannib audit)

| Status | Pos | Slug | Category | Body words | FAQs | MP ID | Notes |
|---|---|---|---|---|---|---|---|

---

## Within-bucket + cross-bucket sequencing constraints (§16.32)

- **Bucket A:** A7 (LTR test pillar) → A8 (excluded property trust depth) → A9 (spouse exemption); A1-A3 FIG cluster; A4-A5 TRF cluster; A6 standalone CGT rebasing; A10 references A7 + A1-A3 + §17.3 s.10A
- **Bucket B:** B1 (pillar) → B2/B3/B4 (Conditions A/D/C); B4 ↔ B7 (trading-stock + badges of trade); B5 + B6 anti-avoidance overlay; B9 LRR cross-link Wave 7 §25.11 + Wave 6 §25 + §25.12 HP-lock; B10 cross-link Wave 7 §1.A SDLT partnership
- **Bucket C:** C1 (option-to-tax pillar) → C2 (revocation) → C7 (disapplication paras 5+6+12); C5 + C10 recovery-mechanics cluster
- **Cross-bucket:** B4 cites §21.A.2 expansive s.18N(3) (Stage 1b fix); no live A↔B↔C cross-links

## Pre-launch checklist (manager)

- [x] HP-locks complete (8 commits cc00f68 → 431f62b)
- [x] Cannibalisation re-check (29 picks final)
- [x] Stage 1a brief seeds dispatched (sub-agent commit 692438b)
- [x] Stage 1b corrections + §29 VAT cluster (commit 431f62b)
- [ ] Stage 2 brief generation (3 parallel sub-agents dispatched 2026-05-25; in flight)
- [ ] Artefact shells created (this file + flags + 3× Q&A + 3× discovery)
- [ ] 3 worktrees stood up at main HEAD
- [ ] START_HERE × 3 + wave9_LAUNCH_PROMPTS
- [ ] Q&A watcher armed (§16.41(d) `## Q-\d+` heading-count pattern)
- [ ] User gate

