# Wave 4 page tracker (generalist / Holloway Davies)

**Created:** 2026-07-09. **Status:** WRAP COMPLETE 2026-07-09 - 12 pages written, QA 12/12 all_clear, merged, build GREEN, monitored to 2026-10-07. AWAITING DEPLOY WORD. NOTE: image fields left empty by design - run blog_image_backfill before/after deploy. Wave 4 = up to 13 net-new pages, SINGLE lane (owner ruling 2026-07-08: batchSize 1, one sub-agent per pick, parallel). Source: gap discovery 2026-07 curated batch (sitemap v2 + GSC lanes). NOTE: waves 0-3b were the parity/GEO programme, not net-new; this is the first net-new content wave.

Tracker columns: status | pos | slug | category | body words | FAQ count | monitored_pages ID | session notes.

**Status legend:** [ ] todo / [~] in progress / [x] done / [!] blocked / [<] needs back-patch.

**Discipline reminder (engine Â§6):** all session-time tracker edits go to THIS file in main via absolute path `C:/Users/user/Documents/Accounting/docs/generalist/wave4_page_tracker.md`. NEVER on a worktree branch.

---

## Session A â€” single lane: gap discovery 2026-07 batch (13 picks pre-verify)

| Status | Pos | Slug | Category | Body words | FAQs | MP ID | Notes |
|---|---|---|---|---|---|---|---|
| [x] | A1 | cash-flow-management-small-business-uk | Bookkeeping and Compliance | ~3,200 | 12 | | SHA a029e0a6; worktree agent-a271379dbec3d5950; clusters with A11 |
| [x] | A2 | double-entry-bookkeeping-explained-uk | Bookkeeping and Compliance | ~3,050 | 10 | | commit 73cd6a2b; worktree agent-a6883a36e9fe2303b |
| [x] | A3 | corporation-tax-paying-early-or-in-instalments-uk | Corporation Tax | 3,020 | 10 | | SHA 01dbfd36; both competitor URLs dead (404/500); dropped per brief instruction |
| [x] | A4 | do-i-need-a-separate-business-bank-account-uk | Bookkeeping and Compliance | ~3,050 | 10 | | SHA 76bdf6f9; crunch.co.uk competitor URL dead (404); dropped per brief instruction |
| [x] | A5 | how-to-set-up-a-business-partnership-uk | Sole Trader and Self Employment | 2984 | 10 | | SHA 88111484 |
| [x] | A6 | what-is-a-balance-sheet-uk-sme | Bookkeeping and Compliance | ~3,400 | 10 | | SHA 365d63c1; informi.co.uk competitor URL dead (404) dropped; CA 2006 s.382 thresholds verified as £15m/£7.5m/50 (SI 2024/1303, from 6 Apr 2025) — brief cited stale £10.2m/£5.1m |
| [x] | A7 | unique-taxpayer-reference-utr-uk | Sole Trader and Self Employment | ~2,850 | 12 | | SHA 4b9caf29; both competitor URLs dead (404); built from gov.uk primary sources |
| [x] | A8 | christmas-party-tax-rules-limited-company-uk | Limited Company Tax | ~3,100 | 10 | | SHA 0027fedc; both competitor URLs dead (404); built from s.264/EIM21690/EIM21691/VIT43600/PSA primary sources |
| [x] | A9 | how-to-complete-and-submit-vat-return-uk | VAT and Making Tax Digital | ~3,050 | 11 | | F-91 RESOLVED (live 700/12 verified); F-92 conservative (thresholds unverified, conservative language used) |
| [x] | A10 | high-income-child-benefit-charge-business-owners-uk | Director Pay and Dividends | 3,019 | 12 | | SHA 1f681ec1; committed 2026-07-09 |
| [x] | A11 | late-payment-rules-small-business-uk | Bookkeeping and Compliance | ~3050 | 11 | | clusters with A1; 11.75% rate tagged; SHA 08f97d53 |
| [x] | A12 | personal-tax-for-llp-members-uk | Sole Trader and Self Employment | 3,147 | 12 | | SHA 2b24a524; committed 2026-07-09 |
| [x] | A13 | ~~benefit-in-kind-company-car-tax-uk~~ | STRUCK | | | | DUPLICATE (limited-company-car-tax-relief-2025-26); route rewrite/refresh |

---

## Pre-launch checklist (manager)

- [x] Topic batch committed + collision-verified (blog_topics, status='pending')
- [x] picks.yaml written (briefs/generalist/wave4/picks.yaml, competitor URLs pre-selected)
- [x] Jaccard cannib check GREEN (13 net-new, 0 partial)
- [x] Page-level corpus verify (UPGRADE 2) â€” 12 DISTINCT / A13 STRUCK (wave4_collision_verify.md)
- [x] Combined brief round (single-pass Stage 1+2, cost-conscious adaptation) + conductor gate (HP SS3.A/SS6.A)
- [x] Drift triage at gate (A3 QIP date caught at QA; base rate triple-verified)



