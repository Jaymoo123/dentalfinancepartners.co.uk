# Wave 7 launch prompts

**Status as of 2026-05-24 PM:** Wave 7 prelaunch in progress. Main at `6d7343a` (artefact-shells commit). Three worktrees on branches `property-wave7-{a,b,c}` standing up at `6d7343a` per §16.25 ff-verify. HP-lock state: 14 sub-positions across 8 commits (5 cluster locks §26 + §27 + §22.16-§22.18 + §25.11 + §1.A-§1.F + 3 mini-locks §26.9 + §1.G + §22.21). 28 brief seeds at `briefs/property/wave7/STAGE1A_BRIEF_SEEDS.md`. Stage 2 full briefs (28 files at `briefs/property/wave7/<slug>.md`) IN PROGRESS via 3 parallel sub-agents per §16.43.

**Manager-side Q&A watcher to be armed at launch.** Wave 7 watcher uses **`## Q-\d+` heading-count pattern per §16.41(d)** (NOT the Wave 6 `STATUS: open` grep, which false-fired at Wave 6 launch on the template baseline). The heading count is monotonic (sessions only add Q headings, never remove); any baseline becomes a floor; new Q-N headings trigger notifications.

**To launch:** open three fresh Claude Opus 4.7 sessions, one per worktree directory below. Paste the corresponding prompt verbatim into each session as the first user message.

---

## Session A — Regulatory / compliance

**Open in:** `C:/Users/user/Documents/Accounting-wt-property-wave7-a/`

```
You are Session A for Wave 7 of the Property Net-New Program. Working in worktree `Accounting-wt-property-wave7-a` on branch `property-wave7-a` at HEAD `6d7343a` (will refresh if more prep commits land before launch). Bucket: Regulatory / compliance (9 briefs A1-A10 with A7 dropped — actual: A1, A2, A3, A4, A5, A6, A8, A9, A10).

**Q&A discipline (§16.15 + §16.37 critical):** when raising a Q to manager, append to `C:/Users/user/Documents/Accounting/docs/property/wave7_questions_session_A.md` via ABSOLUTE PATH from your worktree. NEVER append to the worktree's relative-path copy of the file. Same discipline for tracker, flags, discovery logs. Manager polls main's path only; relative-path edits are NOT seen.

Read first, in this order:
1. docs/sessions/property/WAVE7_SESSION_A_START_HERE.md (your task brief + bucket overview)
2. docs/property/NETNEW_PROGRAM.md (§0 norms, §4 brief anatomy, §7 19-step workflow, §8 Q&A channel, §13 manager instructions, §16.14 + §16.15 + §16.16 + §16.17 + §16.27 + §16.30 + §16.32 + §16.35 + §16.36 + §16.37 + §16.40 + §16.42 + §16.45 lessons)
3. docs/property/house_positions.md — for Session A: §20 (RRA 2025 enacted) + §26 (Regulatory framework — Wave 7 lock) + §26.9 (HMO licensing mini-lock for A4) + §4 (S24 mortgage interest restriction for tax-side hooks)
4. Your 9 briefs at briefs/property/wave7/:
   - A1: renters-rights-act-2026-tax-implications-landlords (SAME-SLUG depth rewrite)
   - A2: renters-rights-act-section-21-abolition-landlord-operational-mechanics
   - A3: renters-rights-act-periodic-tenancy-switch-landlord-obligations
   - A4: hmo-selective-licensing-compliance-housing-act-2004-landlord-licensing-mechanics
   - A5: renters-rights-act-possession-grounds-reform-section-8-landlords
   - A6: renters-rights-act-property-redress-scheme-mandatory-enrolment-landlords
   - A8: epc-c-2030-minimum-energy-efficiency-landlord-spending-cap
   - A9: epc-improvement-grant-schemes-landlords-eco4-bus-gbis
   - A10: building-safety-act-2022-cladding-cost-recovery-leaseholder-protections-landlords
5. docs/property/wave7_page_tracker.md (your A1-A10 rows; flip ⬜ → in_progress when you claim; ABSOLUTE PATH)
6. docs/property/wave7_site_wide_flags.md (cross-session flags; ABSOLUTE PATH)
7. docs/property/wave7_questions_session_A.md (your Q&A channel; ABSOLUTE PATH)
8. docs/property/wave7_discovery_log_session_A.md (your discoveries; ABSOLUTE PATH)

Acknowledge with one short status line: "Session A picked up. Main at 6d7343a. Reading START_HERE and brief A1 now."

Then claim brief per within-bucket priority (A2 or A4 are good first picks; A1 ships LAST per the lead-page-absorbs-cross-links convention) and follow the 19-step workflow.

After raising any Q-N, spawn a session-side watcher per §8.4. Keep working on other briefs while waiting.

**Critical §16.35 + §16.45 per-write verification:**
- EPC C 2030 is NOT enacted (A8/A9 hedge as policy aspiration; current floor EPC E + £3,500 cap under SI 2015/962)
- "Renters' Rights Act 2025" (NOT 2026); slug grandfathered for SEO
- RRA s.64 permits PLURAL approved schemes (A6 — NOT "single statutory ombudsman")
- £25k Ombudsman cap is policy commentary NOT face of Act
- BSA 2022 SI 2025/1368 is Wales commencement (out of PTP scope); England chain is SI 2022/561+ (A10)
- LFRA 2024 amendments via SI 2024/1018 effective 31 Oct 2024 (A10)
13 total drift catches at Wave 7 HP-lock per §16.45 — read all before writing.

**Within-bucket sequencing:** A1 ships LAST (absorbs cross-links); A2 → A1 (operational mechanics anchor); A2 ↔ A5 reciprocal; A4 independent (§26.9 mini-lock); A8/A9/A10 independent.

**Critical anti-templating discipline:** 9 pages cannot read like 9 versions of the same page. Stop after page 3 and self-check; report any templating drift via flag.

**Critical handover hygiene (§16.14):** if you commit a brief but feel context-pressured, FLIP THE TRACKER FIRST (step 16) before stopping. ABSOLUTE PATH to main.
```

---

## Session B — HMRC enquiry + tax compliance ops

**Open in:** `C:/Users/user/Documents/Accounting-wt-property-wave7-b/`

```
You are Session B for Wave 7 of the Property Net-New Program. Working in worktree `Accounting-wt-property-wave7-b` on branch `property-wave7-b` at HEAD `6d7343a`. Bucket: HMRC enquiry + tax compliance ops (10 briefs B1-B10).

**Q&A discipline (§16.15 + §16.37 critical):** when raising a Q to manager, append to `C:/Users/user/Documents/Accounting/docs/property/wave7_questions_session_B.md` via ABSOLUTE PATH from your worktree. NEVER append to the worktree's relative-path copy. Same discipline for tracker, flags, discovery logs.

Read first, in this order:
1. docs/sessions/property/WAVE7_SESSION_B_START_HERE.md (your task brief + bucket overview)
2. docs/property/NETNEW_PROGRAM.md (§0 norms + §4 brief anatomy + §7 19-step workflow + §8 Q&A + §13 manager instructions + §16 lessons as listed in START_HERE)
3. docs/property/house_positions.md — for Session B: §27 (HMRC enquiry mechanics — Wave 7 primary lock §27.1-§27.9) + §19 (MTD penalty regime adjacent) + §22.16 (TRS penalty regime for trust-side cross-references)
4. Your 10 briefs at briefs/property/wave7/:
   - B1: discovery-assessment-time-limits-landlord-tax-enquiries-tma-1970-s29
   - B2: hmrc-closure-notice-mechanics-landlord-enquiries-tma-1970-s28a
   - B3: cop9-contractual-disclosure-facility-landlord-tax-fraud-investigation
   - B4: tribunal-appeal-process-landlords-first-tier-tribunal-tax-chamber
   - B5: hmrc-nudge-letter-response-playbook-landlords-property-income
   - B6: let-property-campaign-formal-disclosure-route-landlords-undisclosed-rental
   - B7: worldwide-disclosure-facility-offshore-landlord-catch-up-fa-2017-ftc
   - B8: schedule-24-fa-2007-penalty-behaviour-categories-landlord-enquiries
   - B9: reasonable-excuse-case-law-landlord-penalties-perrin-martland
   - B10: record-retention-discipline-voluntary-disclosure-failure-to-notify-landlords
5. docs/property/wave7_page_tracker.md (your B1-B10 rows; ABSOLUTE PATH)
6. docs/property/wave7_site_wide_flags.md (ABSOLUTE PATH)
7. docs/property/wave7_questions_session_B.md (ABSOLUTE PATH)
8. docs/property/wave7_discovery_log_session_B.md (ABSOLUTE PATH)

Acknowledge with one short status line: "Session B picked up. Main at 6d7343a. Reading START_HERE and brief B8 now."

Then claim brief **B8** first per within-bucket priority (penalty matrix referenced by B5/B6/B7/B10) and follow the 19-step workflow.

After raising any Q-N, spawn a session-side watcher per §8.4. Keep working on other briefs while waiting.

**Critical §16.35 + §16.45 per-write verification:**
- FOUR discovery limits per §27.1 — s.34 4yr / s.36(1) 6yr careless / s.36(1A) 20yr deliberate / s.36A FA 2019 12yr offshore innocent-error (do NOT collapse) (B1)
- Closure notice 30-day appeal under s.31A (NOT 60-day) (B2)
- Sch 24 30%/70%/100% standard maxima; mitigation floors 0%/20%/30% unprompted; offshore Cat 2 1.5x / Cat 3 2x up to 200% max (B8)
- FtC FA 2017 Sch 18 deadline 30 Sep 2018 NOT extended; post-deadline 200%/100% penalty (B7)
- Perrin v HMRC [2018] UKUT 156 four-stage reasonable-excuse (B9)
- TMA s.12B 5-yr IT / CA 2006 s.388 6-yr CT; PTP standing 7-yr practical floor (B10)
- CoP9 is HMRC-initiated civil-fraud track — NOT landlord-friendly voluntary disclosure (B3)
13 total drift catches at Wave 7 HP-lock per §16.45 — read all before writing.

**Within-bucket sequencing:** B8 ships FIRST (penalty matrix anchor for B5/B6/B7/B10); B1 → B7 (offshore framework dependency); B2/B3/B4/B9 independent.

**Critical anti-templating discipline:** 10 pages cannot read like 10 versions of the same page. Stop after page 3 and self-check.

**Critical handover hygiene (§16.14):** if you commit a brief but feel context-pressured, FLIP THE TRACKER FIRST (step 16) before stopping. ABSOLUTE PATH to main.
```

---

## Session C — Specialist transactional + trust depth

**Open in:** `C:/Users/user/Documents/Accounting-wt-property-wave7-c/`

```
You are Session C for Wave 7 of the Property Net-New Program. Working in worktree `Accounting-wt-property-wave7-c` on branch `property-wave7-c` at HEAD `6d7343a`. Bucket: Specialist transactional + trust depth (9 briefs C1, C2, C3, C5, C6, C7, C8, C9, C10 — note C4 dropped at cannibal audit; C6 replaced at Stage 1b after fictional-anchor catch).

**Q&A discipline (§16.15 + §16.37 critical):** when raising a Q to manager, append to `C:/Users/user/Documents/Accounting/docs/property/wave7_questions_session_C.md` via ABSOLUTE PATH from your worktree. NEVER append to the worktree's relative-path copy. Same discipline for tracker, flags, discovery logs.

Read first, in this order:
1. docs/sessions/property/WAVE7_SESSION_C_START_HERE.md (your task brief + bucket overview)
2. docs/property/NETNEW_PROGRAM.md (§0 norms + §4 brief anatomy + §7 19-step workflow + §8 Q&A + §13 manager instructions + §16 lessons as listed in START_HERE)
3. docs/property/house_positions.md — for Session C: §22.16-§22.18 (TRS/IPDI/EOT primary) + §22.21 (SIPP/SSAS mini-lock for C10) + §25 + §25.11 (CAA adjacent for C3 trading test) + §1 + §1.A-§1.F (SDLT depth) + §1.G (SDLT group relief mini-lock for C6) + §15 (IHT context for C2) + §22.9-§22.15 (Wave 6 trust cluster context for C1)
4. Your 9 briefs at briefs/property/wave7/:
   - C1: trust-registration-service-trs-compliance-trust-owned-btl-mlr-2017
   - C2: immediate-post-death-interest-ipdi-rental-property-tax-iht-1984-s49a
   - C3: employee-ownership-trust-eot-property-spv-exit-mechanics-tcga-1992-s236
   - C5: sdlt-linked-transactions-fa-2003-section-108-landlord-portfolio-acquisition
   - C6: sdlt-group-relief-schedule-7-fa-2003-claw-back-connected-party-recovery-depth
   - C7: sdlt-divorce-separation-transfer-relief-schedule-3-paragraph-3-fa-2003
   - C8: sdlt-bewley-uninhabitable-property-test-non-residential-rates-landlords
   - C9: partnership-sdlt-relief-schedule-15-fa-2003-incorporation-sum-lower-proportions
   - C10: sipp-ssas-commercial-property-purchase-mechanics-landlord-pension-fund
5. docs/property/wave7_page_tracker.md (your C-rows; ABSOLUTE PATH)
6. docs/property/wave7_site_wide_flags.md (ABSOLUTE PATH)
7. docs/property/wave7_questions_session_C.md (ABSOLUTE PATH)
8. docs/property/wave7_discovery_log_session_C.md (ABSOLUTE PATH)

Acknowledge with one short status line: "Session C picked up. Main at 6d7343a. Reading START_HERE and brief C1 now."

Then claim brief **C1** OR **C9** first per within-bucket priorities (TRS pillar / partnership SDLT pillar) and follow the 19-step workflow.

After raising any Q-N, spawn a session-side watcher per §8.4. Keep working on other briefs while waiting.

**Critical §16.35 + §16.45 per-write verification:**
- TRS penalty £5,000 max DISCRETIONARY (NOT graduated £100/£200/£300 tariff myth) per TRSM80020 (C1)
- CTA 2010 ss.464M-Q does NOT exist; EOT bonus is ITEPA 2003 ss.312A-312I £3,600/employer/tax year (C3)
- EOT controlling-interest "more than 50%" — NOT "at least 50%"; 4-prong test (C3)
- EOT trading-company gating — property letting NOT a trade per CG65700+; most landlord SPVs disqualified (C3)
- FA 2025 EOT reforms commenced 6 April 2025 (UK-resident trustee + independence + consideration + extended disqualifying-event period) (C3)
- FA 2003 s.108 (NOT Sch 4 para 5) for linked transactions; s.108(1A) Scotland/Wales excluded (C5)
- FA 2003 s.58C is zero-carbon homes NOT cladding (no SDLT cladding relief exists in UK statute; C6 replaced with group relief Sch 7) (C6)
- Sch 15 para 17A 3-year anti-withdrawal (NOT 7-year); para 34 income-profit-share (NOT capital/voting); SDLTM33500+ NOT SDLTM09050+ (C9)
- Bewley narrowly applied post-Hyman/Mudan/MHB/Brown (C8)
- FA 2004 Sch 29A residential = taxable (55-70% effective rate); commercial excluded para 7; FA 2024 lump-sum-allowance replaces LTA (C10)
13 total drift catches at Wave 7 HP-lock per §16.45 — read all before writing.

**Within-bucket sequencing:** C1 → C2 (TRS framework cited by IPDI); C9 → C5 (partnership SDLT cited by linked transactions); C3/C6/C7/C8/C10 independent.

**Critical anti-templating discipline:** 9 pages cannot read like 9 versions of the same page. Stop after page 3 and self-check.

**Critical handover hygiene (§16.14):** if you commit a brief but feel context-pressured, FLIP THE TRACKER FIRST (step 16) before stopping. ABSOLUTE PATH to main.
```

---

## Wave 7 prelaunch summary

| Step | Status | Reference |
|---|---|---|
| HP-lock cluster commits §26 / §27 / §22.16-§22.18 / §25.11 / §1.A-§1.F | ✅ | commits 72263ec / f66d96c / 98146ea / 9c62002 / 1593b58 |
| §16.45 new lesson (13 HP-lock drift catches) | ✅ | commit 1fc18d6 |
| Cannibalisation re-check (28-pick lineup; A7+C4 dropped; A4+C6 replaced) | ✅ | commits 6a4e951 + 71bd14e |
| HP-gap mini-locks §26.9 + §1.G + §22.21 | ✅ | commit 6cbb0ed |
| Stage 1a brief seeds (28 picks) | ✅ | commit dccf6ec |
| Stage 1b manager review (HP gaps + C6 pick replacement) | ✅ | commit dccf6ec |
| Stage 2 full briefs (28 files) | ⏳ IN PROGRESS via 3 parallel sub-agents per §16.43 | dispatched 2026-05-24 PM |
| Wave 7 artefact shells (tracker + flags + 3×Q&A + 3×discovery) | ✅ | commit 6d7343a |
| Worktrees standup + .env + _db.py + ff-verify per §16.25 | ✅ | 3 worktrees at 6d7343a |
| START_HERE × 3 + LAUNCH_PROMPTS | ✅ | this commit |
| Manager-side watcher armed (§16.41(d) heading-count pattern) | ⏳ Pending | at launch |
| Pre-launch user-gate summary | ⏳ Pending | next manager step |

**User action when ready to launch:** open three fresh Opus 4.7 sessions in the three worktree directories, paste the three prompts above as the first user message. Manager picks up by arming the Q&A watcher.

**Wave 7 prep summary:**
- 28 picks across 3 buckets (Bucket A regulatory 9 + Bucket B HMRC enquiry 10 + Bucket C specialist transactional 9)
- 14 HP sub-positions across 8 commits (5 cluster locks + 3 mini-locks)
- 13 drift catches at HP-lock stage alone (§16.45) — including 2 errors in the previous manager's prep document (CTA 2010 ss.464M-Q fiction; Sch 4 para 5 mis-cite) + 1 fundamental anchor crisis (FA 2003 s.58C is zero-carbon homes not cladding; C6 pick replaced)
- 30+ WebFetch verifications at HP-lock + Stage 1a + Stage 1b
- Watcher pattern upgraded to §16.41(d) heading-count (template-immune; Wave 6 launch-baseline-false-fire incident addressed)

Wave 7 launch is contingent only on: (a) Stage 2 sub-agents completing brief generation; (b) user-triggered launch instruction.
