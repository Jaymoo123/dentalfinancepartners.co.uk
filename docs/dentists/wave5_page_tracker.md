# Wave 5 page tracker (dentists)

**Created:** 2026-07-09. **Status:** WRAP COMPLETE 2026-07-09 - 5 pages written, QA clean, merged, build GREEN, monitored to 2026-10-07. AWAITING DEPLOY WORD. Wave 5 = up to 6 net-new pages, SINGLE lane (owner ruling 2026-07-08: no A/B/C buckets, batchSize 1, one sub-agent per pick in parallel). Source: gap discovery 2026-07 batch (5 already rejected at collision verify pre-wave), page-level cannib verify at compose.

Tracker columns: status | pos | slug | category | body words | FAQ count | monitored_pages ID | session notes.

**Status legend:** [ ] todo / [~] in progress / [x] done / [!] blocked / [<] needs back-patch.

**Discipline reminder (engine Â§6):** all session-time tracker edits go to THIS file in main via absolute path `C:/Users/user/Documents/Accounting/docs/dentists/wave5_page_tracker.md`. NEVER commit tracker edits on a worktree branch. Q&A files use same absolute-path discipline.

---

## Session A â€” single lane: gap discovery 2026-07 batch (6 picks)

| Status | Pos | Slug | Category | Body words | FAQs | MP ID | Notes |
|---|---|---|---|---|---|---|---|
| [x] | A1 | dental-practice-succession-planning-family-transfer | Goodwill & Practice Sale | 3825 | 10 | | commit 01b80564 |
| [x] | A2 | wealth-management-for-dentists-uk | NHS Pension | ~3,250 | 12 | | commit ec940baa; LISA £450k cap + 25% withdrawal charge verified gov.uk 2026-07-09; succession page cross-link deferred (A1 not yet merged) |
| [x] | A3 | dental-hygienist-dcp-tax-employment-status | Associate Tax | ~3150 | 12 | | commit 82de3c57; back-patch: employing-first-dental-nurse needs reciprocal link (F-125) |
| [x] | A4 | buying-car-through-limited-company-dentist | Practice Accounting | ~2,950 | 12 | | commit 1ab3c623; AER 7p/mi resolved; VAT 50% block confirmed; EV 2027/28+ not on EIM24705, write-around applied |
| [x] | A5 | ~~tax-planning-for-dentists~~ | STRUCK | | | | DUPLICATE at page-level verify (two existing hubs); cluster-H â†’ meta/improve track |
| [x] | A6 | vat-loan-dental-practices-uk | Practice Finance | 3241 | 12 | | commit fc93495c; informational only; VAT-exemption context mandatory |

---

## Sequencing constraints

- **A5 (hub)** links out to A1-A4 topics where relevant and to existing sub-topic pages; other picks link INTO A5.
- **A1 (succession)** must stay in the internal-transfer lane; the arms-length sale lane belongs to existing practice-sale/BADR pages (cross-link, never re-cover).
- batchSize 1 = every pick is its own batch; otherwise standalone.

## Pre-launch checklist (manager)

- [x] Topic batch committed + collision-verified (blog_topics, status='pending')
- [x] picks.yaml written (briefs/dentists/wave5/picks.yaml, competitor URLs pre-selected per pick)
- [x] Jaccard cannib check GREEN (docs/dentists/wave5_cannibalisation_check.md)
- [x] Page-level corpus verify (UPGRADE 2) complete â€” 5 DISTINCT / A5 STRUCK (docs/dentists/wave5_collision_verify.md)
- [x] Stage 1 seeds + Stage 1b HP gate (5 HP lock commits, 8 flags closed)
- [x] Stage 2 briefs + Stage 2b drift gate (A3 45p drift caught + fixed)



