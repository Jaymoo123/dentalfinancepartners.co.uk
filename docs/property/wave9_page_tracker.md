# Wave 9 page tracker

**Created:** 2026-05-25. **Status:** Pre-launch (all 9 picks ⬜ todo). Wave 9 = 9 net-new pages across 3 buckets (TEST scope — Bucket A SDLT/MDR-abolition 3 + Bucket B Companies House/ECCTA 3 + Bucket C HMRC penalties+enquiries 3). End-to-end test of the full autopilot pipeline; deliberately small to validate mechanics without committing 30 pages of judgment-light content. HP-lock state: no Wave-9-specific HP additions yet — Stage 1b will surface any needed.

Tracker columns: status | bucket-pos | slug | category | body words | FAQ count | monitored_pages ID | session notes.

**Status legend:** ⬜ todo / 🟦 in progress / ✅ done / ⚠ blocked / 🔁 needs back-patch.

**Discipline reminder (§16.14, §16.15, §16.37):** all session-time tracker edits go to THIS file in main via absolute path `C:/Users/user/Documents/Accounting/docs/property/wave9_page_tracker.md`. NEVER commit tracker edits on a worktree branch — branch-copy edits cause merge conflicts at wave close. Q&A files use same absolute-path discipline.

---

## Session A — Bucket A: SDLT — MDR abolition + surcharge mechanics (3 pages)

| Status | Pos | Slug | Category | Body words | FAQs | MP ID | Notes |
|---|---|---|---|---|---|---|---|
| ✅ | A1 | `multiple-dwellings-relief-abolition-fa-2024-transitional-rules-landlords` | property-types-and-specialist-tax | 3,386 | 11 | 289 | Committed 2026-05-25 (494d37e on `property-wave9-a`). HP §1.H primary anchor; s.7(1) repeal + s.7(3) 1-June effective date + s.7(4)(a)/(b) two-tier transitional + s.7(5) anti-forestalling verbatim per legislation.gov.uk. F-4 raised (existing surcharge-refund page misattributes FA 2025 s.51 to F(No.2)A 2024). |
| ✅ | A2 | `sdlt-additional-property-surcharge-refund-routes-3-year-replacement-claim` | property-types-and-specialist-tax | 3,282 | 12 | 290 | Committed 2026-05-25 (4312a44 on `property-wave9-a`). HP §1.I primary anchor; FA 2025 s.51 attribution corrected throughout. Sch 4ZA para 3(7A)(a)/(b) + para 3(7B) verbatim. Five refund routes (standard, chain-break, divorce, probate, repossession); para 9 disposal-side spousal aggregation. F-5 raised (HP §1.I para 3(7B) vs para 3(7A)(b) extension-power re-anchor). |
| ✅ | A3 | `sdlt-mixed-use-rates-vs-residential-property-tribunal-tests-landlords` | property-types-and-specialist-tax | 3,216 | 12 | 291 | Committed 2026-05-25 (244c14f on `property-wave9-a`). HP §1.J primary anchor. s.116(1)(b) verbatim; Hyman trilogy [2019] UKFTT 469 → [2021] UKUT 68 → [2022] EWCA Civ 185 (binding); Suterwalla [2024] UKUT 188 (TCC); Hortons Hall FTT line. Sch 4ZA para 18 surcharge exemption. F-6 raised (HP §1.J Hyman UT citation re-anchor from "[2019] UKUT 0411" to [2021] UKUT 68). |

## Session B — Bucket B: Companies House / ECCTA reforms (3 pages)

| Status | Pos | Slug | Category | Body words | FAQs | MP ID | Notes |
|---|---|---|---|---|---|---|---|
| ✅ | B1 | `eccta-2023-id-verification-mandatory-companies-house-2025-2026-landlord-ltdcos` | incorporation-and-company-structures | 3,135 | 12 | 294 | Committed 2026-05-25 (967bd7a on `property-wave9-b`). Multi-SPV landlord-LtdCo operational walkthrough; HP §11.A primary anchor (with F-14 brief-drift correction applied at write time). Verbatim ECCTA crossheadings ss.64-69 + ss.40-45 + ss.29-30 per legislation.gov.uk fetch; campaign page 18 Nov 2025 mandatory + 12-month transition verified. F-14 raised (ECCTA s.64-69 mis-attribution in §11.A + Stage 2 brief). |
| ✅ | B2 | `register-of-overseas-entities-roe-annual-update-statement-non-resident-landlords` | non-resident-landlord-tax | 3,055 | 12 | 295 | Committed 2026-05-25 (dd5f8a2 on `property-wave9-b`). Annual-update-side operational walkthrough; HP §11.A primary anchor. ECTEA 2022 s.7 + s.8 verbatim per legislation.gov.uk fetch. LRA 2002 Sch 4A HMLR disposition block as operational teeth. Multi-axis compliance frame (RoE + ATED + NRL + CT + NRCGT). Category override: incorporation-and-company-structures → non-resident-landlord-tax for sibling routing. |
| ✅ | B3 | `companies-house-confirmation-statement-changes-2024-onwards-psc-disclosure` | incorporation-and-company-structures | 2,917 | 13 | 296 | Committed 2026-05-25 (15270a6 on `property-wave9-b`). Four-changes-at-a-glance walkthrough for post-March-2024 CS regime; HP §11.A primary anchor. Campaign page commencement state + gov.uk fees (£50/£110) + £5,000 max penalty all verified live. ECCTA inserting provisions ss.28 + ss.29-30 + ss.51-52 + ss.59-63 + ss.64-69 attributions used (safer than inserted-CA-2006-section numbers given Stage 2 empty fetches). |

## Session C — Bucket C: HMRC penalties + enquiries depth (3 pages)

| Status | Pos | Slug | Category | Body words | FAQs | MP ID | Notes |
|---|---|---|---|---|---|---|---|
| ✅ | C1 | `let-property-campaign-disclosure-mechanics-undeclared-rental-income-2026` | landlord-tax-essentials | 3,349 | 12 | | Committed 2026-05-25 (e730b86 on `property-wave9-c`). HP §27.6 primary anchor; Sch 41 para 13 case A/B + LPC campaign liveness verbatim via WebFetch. F-5 NAMED CALLOUT (Sch 41 12-month MUST NOT be imported into Sch 24). 4 worked scenarios with quantified £9k prompted-vs-unprompted differential. F-20 raised (Stage 2 C1 brief scenario 3 Sch 41 prompted-floor 10% should be 20% case B; corrected in page). Build: PASSED. |
| ✅ | C2 | `schedule-24-fa-2007-careless-deliberate-penalty-mitigation-landlords` | landlord-tax-essentials | 3,775 | 12 | | Committed 2026-05-25 (8afb8d7 on `property-wave9-c`). HP §27.2 primary anchor; Sch 24 para 10 floors + para 14 suspension verbatim via WebFetch. F-5 NAMED CALLOUT (no 12-month qualifier on careless-unprompted 0% floor). 30/40/30 telling/helping/giving framed qualitatively per A-1. 6 worked scenarios. Build: PASSED. |
| ✅ | C3 | `hmrc-discovery-assessment-tma-1970-section-29-time-limits-landlords` | landlord-tax-essentials | 3,453 | 12 | | Committed 2026-05-25 (d7849ef on `property-wave9-c`). HP §27.1 primary anchor; s.36A(1)/(2) + s.36(1)/(1A) verbatim via WebFetch. Case-law depth (post-Tooth staleness death + post-Sanderson s.29(5) + brought-forward losses pre-FA 2008 trap). 5 worked scenarios. Build: PASSED. |

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
