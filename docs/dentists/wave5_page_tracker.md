# Wave 5 page tracker (dentists)

**Created:** 2026-07-09. **Status:** Pre-launch. Wave 5 = up to 6 net-new pages, SINGLE lane (owner ruling 2026-07-08: no A/B/C buckets, batchSize 1, one sub-agent per pick in parallel). Source: gap discovery 2026-07 batch (5 already rejected at collision verify pre-wave), page-level cannib verify at compose.

Tracker columns: status | pos | slug | category | body words | FAQ count | monitored_pages ID | session notes.

**Status legend:** [ ] todo / [~] in progress / [x] done / [!] blocked / [<] needs back-patch.

**Discipline reminder (engine §6):** all session-time tracker edits go to THIS file in main via absolute path `C:/Users/user/Documents/Accounting/docs/dentists/wave5_page_tracker.md`. NEVER commit tracker edits on a worktree branch. Q&A files use same absolute-path discipline.

---

## Session A — single lane: gap discovery 2026-07 batch (6 picks)

| Status | Pos | Slug | Category | Body words | FAQs | MP ID | Notes |
|---|---|---|---|---|---|---|---|
| [ ] | A1 | dental-practice-succession-planning-family-transfer | Goodwill & Practice Sale | | | | |
| [ ] | A2 | wealth-management-for-dentists-uk | NHS Pension | | | | FCA boundary: education only |
| [ ] | A3 | dental-hygienist-dcp-tax-employment-status | Associate Tax | | | | |
| [ ] | A4 | buying-car-through-limited-company-dentist | Practice Accounting | | | | |
| [ ] | A5 | tax-planning-for-dentists | General | | | | HUB page for cluster H |
| [ ] | A6 | vat-loan-dental-practices-uk | Practice Finance | | | | informational only; VAT-exemption context mandatory |

---

## Sequencing constraints

- **A5 (hub)** links out to A1-A4 topics where relevant and to existing sub-topic pages; other picks link INTO A5.
- **A1 (succession)** must stay in the internal-transfer lane; the arms-length sale lane belongs to existing practice-sale/BADR pages (cross-link, never re-cover).
- batchSize 1 = every pick is its own batch; otherwise standalone.

## Pre-launch checklist (manager)

- [x] Topic batch committed + collision-verified (blog_topics, status='pending')
- [x] picks.yaml written (briefs/dentists/wave5/picks.yaml, competitor URLs pre-selected per pick)
- [x] Jaccard cannib check GREEN (docs/dentists/wave5_cannibalisation_check.md)
- [ ] Page-level corpus verify (UPGRADE 2) complete
- [ ] Stage 1 seeds + Stage 1b HP gate
- [ ] Stage 2 briefs + Stage 2b drift gate
