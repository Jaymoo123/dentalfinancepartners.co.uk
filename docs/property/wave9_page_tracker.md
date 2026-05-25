# Wave 9 page tracker

**Created:** 2026-05-25. **Status:** Pre-launch (all 9 picks ⬜ todo). Wave 9 = 9 net-new pages across 3 buckets (TEST scope — Bucket A SDLT/MDR-abolition 3 + Bucket B Companies House/ECCTA 3 + Bucket C HMRC penalties+enquiries 3). End-to-end test of the full autopilot pipeline; deliberately small to validate mechanics without committing 30 pages of judgment-light content. HP-lock state: no Wave-9-specific HP additions yet — Stage 1b will surface any needed.

Tracker columns: status | bucket-pos | slug | category | body words | FAQ count | monitored_pages ID | session notes.

**Status legend:** ⬜ todo / 🟦 in progress / ✅ done / ⚠ blocked / 🔁 needs back-patch.

**Discipline reminder (§16.14, §16.15, §16.37):** all session-time tracker edits go to THIS file in main via absolute path `C:/Users/user/Documents/Accounting/docs/property/wave9_page_tracker.md`. NEVER commit tracker edits on a worktree branch — branch-copy edits cause merge conflicts at wave close. Q&A files use same absolute-path discipline.

---

## Session A — Bucket A: SDLT — MDR abolition + surcharge mechanics (3 pages)

| Status | Pos | Slug | Category | Body words | FAQs | MP ID | Notes |
|---|---|---|---|---|---|---|---|
| ⬜ | A1 | `multiple-dwellings-relief-abolition-fa-2024-transitional-rules-landlords` | property-types-and-specialist-tax | | | | MDR abolished 1 June 2024 FA 2024; transitional rules for pre-existing contracts |
| ⬜ | A2 | `sdlt-additional-property-surcharge-refund-routes-3-year-replacement-claim` | property-types-and-specialist-tax | | | | 5% surcharge (Autumn 2024 increase); refund routes when sale delayed; **partial overlap 0.36** with `sdlt-5-percent-surcharge-refund-claim-process` — differentiate by ROUTES + 3-year window |
| ⬜ | A3 | `sdlt-mixed-use-rates-vs-residential-property-tribunal-tests-landlords` | property-types-and-specialist-tax | | | | Residential-vs-mixed-use line; Hyman, Suterwalla, Hortons Hall case-law |

## Session B — Bucket B: Companies House / ECCTA reforms (3 pages)

| Status | Pos | Slug | Category | Body words | FAQs | MP ID | Notes |
|---|---|---|---|---|---|---|---|
| ⬜ | B1 | `eccta-2023-id-verification-mandatory-companies-house-2025-2026-landlord-ltdcos` | incorporation-and-company-structures | | | | ECCTA 2023 ID verification phased 2025-2026; landlord LtdCo + PSC obligations |
| ⬜ | B2 | `register-of-overseas-entities-roe-annual-update-statement-non-resident-landlords` | incorporation-and-company-structures | | | | RoE annual update obligation; non-resident landlord corporate entities; sanctions |
| ⬜ | B3 | `companies-house-confirmation-statement-changes-2024-onwards-psc-disclosure` | incorporation-and-company-structures | | | | March 2024 ECCTA-driven changes; PSC disclosure + registered email |

## Session C — Bucket C: HMRC penalties + enquiries depth (3 pages)

| Status | Pos | Slug | Category | Body words | FAQs | MP ID | Notes |
|---|---|---|---|---|---|---|---|
| ⬜ | C1 | `let-property-campaign-disclosure-mechanics-undeclared-rental-income-2026` | landlord-tax-essentials | | | | LPC mechanics; **partial overlap 0.32** with `let-property-campaign-formal-disclosure-route-...` — differentiate by full mechanics + quality-of-disclosure framework |
| ⬜ | C2 | `schedule-24-fa-2007-careless-deliberate-penalty-mitigation-landlords` | landlord-tax-essentials | | | | Sched 24 penalty bands + mitigation routes; **partial overlap 0.30** with `schedule-24-fa-2007-penalty-behaviour-categories-...` — differentiate by MITIGATION routes + T/H/G reductions |
| ⬜ | C3 | `hmrc-discovery-assessment-tma-1970-section-29-time-limits-landlords` | landlord-tax-essentials | | | | TMA 1970 s.29 discovery; 4/6/20-year time limits; staleness doctrine |

---

## Within-bucket + cross-bucket sequencing constraints (§16.32)

- **Bucket A (SDLT):** A1 (MDR abolition) standalone; A2 (surcharge refund) standalone; A3 (mixed-use line) standalone. No strict ordering within bucket.
- **Bucket B (Companies House):** B1 (ID verification) is most current-news; B2 (RoE) + B3 (confirmation statement) reference B1's ECCTA framework. Recommend B1 first, then B2/B3.
- **Bucket C (HMRC enquiries):** C2 (Sched 24) → C1 (LPC, which uses Sched 24 penalty math) → C3 (discovery assessment, which often opens the door to Sched 24 penalties). Light sequencing only.
- **Cross-bucket:** B1 ECCTA ID verification may affect Bucket C enquiry mechanics (HMRC information powers); no live cross-links anticipated.

## Pre-launch checklist (manager)

- [x] Topic clusters decided (conductor judgment — SDLT, ECCTA, HMRC enquiries)
- [x] picks.yaml written (briefs/property/wave9/picks.yaml)
- [x] Cannibalisation check passed (6 net-new + 3 partial — partials need differentiation framing)
- [ ] Stage 1 prompts authored (docs/sessions/property/wave9_stage1_prompts/{a,b,c}.txt)
- [ ] Stage 1 brief seeds dispatched
- [ ] Stage 1b drift review + HP corrections
- [ ] Stage 2 prompts authored (with Bug #3 URL-liveness guardrail)
- [ ] Stage 2 full briefs dispatched
- [ ] Stage 2b drift triage
- [ ] WAVE9_LAUNCH_PROMPTS + START_HERE scaffolded + edited
- [ ] 3 worktrees created (property-wave9-{a,b,c})
- [ ] PREP + LAUNCH
- [ ] §8.3 Q&A watcher armed
- [ ] RUN sub-agent supervision
- [ ] close-wave validate/audit/merge/build
- [ ] **STOP before deploy** per user instruction (end-to-end test only)
