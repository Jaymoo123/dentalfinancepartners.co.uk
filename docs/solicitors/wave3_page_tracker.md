# Wave 3 page tracker (solicitors)

**Created:** 2026-07-09. **Status:** WRAP COMPLETE 2026-07-09 - 7 pages written, QA clean, merged, build GREEN, monitored to 2026-10-07. AWAITING DEPLOY WORD. Wave 3 = up to 11 net-new pages, SINGLE lane (owner ruling 2026-07-08: batchSize 1, one sub-agent per pick, parallel). Source: gap discovery 2026-07 curated batch; A7 + A11 CONDITIONAL pending page-level collision verify.

Tracker columns: status | pos | slug | category | body words | FAQ count | monitored_pages ID | session notes.

**Status legend:** [ ] todo / [~] in progress / [x] done / [!] blocked / [<] needs back-patch.

**Discipline reminder (engine §6):** all session-time tracker edits go to THIS file in main via absolute path `C:/Users/user/Documents/Accounting/docs/solicitors/wave3_page_tracker.md`. NEVER commit tracker edits on a worktree branch. Q&A files use same absolute-path discipline.

---

## Session A — single lane: gap discovery 2026-07 batch (11 picks pre-verify)

| Status | Pos | Slug | Category | Body words | FAQs | MP ID | Notes |
|---|---|---|---|---|---|---|---|
| [x] | A1 | ~~sra-rules-law-firm-mergers-acquisitions~~ | STRUCK | | | | DUPLICATE (sra-consent-on-firm-acquisition); route meta/improve |
| [x] | A2 | finance-training-fee-earners-law-firm-uk | Practice Finance & Cash Flow | ~3,100 | 12 | | commit 52346cc2; tight boundary held; all metric definitions linked not re-explained; Levy Level 7 caveat carried |
| [x] | A3 | law-firm-financial-distress-restructuring-uk | Practice Finance & Cash Flow | ~3,350 | 12 | | commit 01a57bf4; SRA consumer URLs all 404; intervention from SA 1974 Sch 1 statute only |
| [x] | A4 | forensic-accounting-litigation-law-firms-uk | Practice Accounting | ~3,250 | 13 | | service-area/lead-gen angle; commit b4e52c70; CROSS_BUCKET A8 forward-link flagged |
| [x] | A5 | what-does-a-legal-cashier-do-sra-requirements | SRA Compliance & Trust Accounting | 3,106 | 13 | | Wave 3 A5 written + committed 2026-07-09; SHA 86e2cf1a |
| [x] | A6 | outsourced-legal-cashiering-guide-uk-law-firms | SRA Compliance & Trust Accounting | 3,021 | 12 | | commit 65c06b0e; CROSS_BUCKET: wave-internal link to A5 (what-does-a-legal-cashier-do-sra-requirements) |
| [x] | A7 | ~~abortive-conveyancing-fee-tax-treatment~~ | STRUCK | | | | DUPLICATE (abortive VAT+WIP page covers deductibility); route meta/improve |
| [x] | A8 | business-valuation-for-family-lawyers-uk | Practice Accounting | 3347 | 12 | | expert-witness/divorce angle; committed c5d4f802 |
| [x] | A9 | accountant-for-barristers-chambers-uk | Fee-Earner Tax & Compensation | ~3,250 | 12 | | commit 2a6b453c; reg 92 + 3 chambers VAT methods + cash basis s.24A; payer-pair cross-links to counsel-fees pages |
| [x] | A10 | ~~credit-control-law-firms-uk-guide~~ | STRUCK | | | | DUPLICATE (law-firm-debt-management); route meta/improve |
| [x] | A11 | ~~law-firm-financial-metrics-kpis-uk~~ | STRUCK | | | | DUPLICATE (benchmarking + management-accounts); route meta/improve |

---

## Pre-launch checklist (manager)

- [x] Topic batch committed + collision-verified (blog_topics, status='pending')
- [x] picks.yaml written (briefs/solicitors/wave3/picks.yaml, competitor URLs pre-selected)
- [x] Jaccard cannib check GREEN (11 net-new, 0 partial)
- [x] Page-level corpus verify (UPGRADE 2) — 7 DISTINCT / 4 STRUCK (wave3_collision_verify.md)
- [x] Stage 1 seeds + Stage 1b HP gate (4 new HP sections, 10 flags closed)
- [x] Stage 2 briefs + Stage 2b drift gate (chambers-VAT un-hedged)



