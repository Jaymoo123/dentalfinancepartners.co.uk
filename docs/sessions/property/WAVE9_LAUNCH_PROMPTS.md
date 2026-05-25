# Wave 9 launch prompts

**Status as of 2026-05-25:** SCAFFOLDED FROM WAVE 8 - conductor must update bucket descriptions, drift watchpoints, brief lineup, and Status header before launch. F-numbering ranges injected per bucket (Bug #2 fix).

**Manager-side Q&A watcher to be armed at launch.** Wave 9 watcher uses **`## Q-\d+` heading-count pattern per §16.41(d)** (template-immune; ran cleanly through Wave 7 with zero false fires). Heading count is monotonic; new Q-N headings trigger notifications; template baseline does not match.

**To launch:** open three fresh Claude Opus 4.7 sessions, one per worktree directory below. Paste the corresponding prompt verbatim into each session as the first user message.

---

## Session A — FIG / non-dom IHT / leaving-UK depth

**Open in:** `C:/Users/user/Documents/Accounting-wt-property-WAVE9-a/`

```
You are Session A for Wave 9 of the Property Net-New Program. Working in worktree `Accounting-wt-property-WAVE9-a` on branch `property-WAVE9-a` at HEAD `b48406e` (will refresh if more prep commits land before launch). Bucket: FIG regime + non-dom IHT + leaving-UK depth (10 briefs A1-A10).

**Q&A discipline (§16.15 + §16.37 critical):** when raising a Q to manager, append to `C:/Users/user/Documents/Accounting/docs/property/wave9_questions_session_A.md` via ABSOLUTE PATH from your worktree. NEVER append to the worktree's relative-path copy of the file. Same discipline for tracker, flags, discovery logs. Manager polls main's path only; relative-path edits are NOT seen.

Read first, in this order:
1. docs/sessions/property/wave9_SESSION_A_START_HERE.md (your task brief + bucket overview + 11 critical drift watchpoints)
2. docs/property/NETNEW_PROGRAM.md (§0 norms, §4 brief anatomy, §7 19-step workflow, §8 Q&A channel, §13 manager instructions, §16.14 + §16.15 + §16.16 + §16.17 + §16.27 + §16.30 + §16.32 + §16.35 + §16.36 + §16.37 + §16.40 + §16.42 + §16.45 + §16.46 lessons)
3. docs/property/house_positions.md — for Session A: §17 (Wave 2 expat + Wave 9 §17.8 FIG + §17.9 TRF + §17.10 rebasing) + §15.6 (IHT LTR headline) + §22.5 (Stage 1b refresh — SPOUSAL s.267ZC not generic) + §22.X (NEW Wave 9 IHT LTR depth) + §16 (DTAs)
4. Your 10 briefs at briefs/property/WAVE9/:
   - A1: fig-regime-qualifying-new-resident-10-year-non-residence-test-landlords
   - A2: fig-election-mechanics-per-year-claim-personal-allowance-cgt-aea-cost
   - A3: fig-year-5-cliff-post-fig-arising-basis-planning-non-doms-landlords
   - A4: temporary-repatriation-facility-trf-designation-mechanics-12-15-percent-rates
   - A5: trf-qualifying-overseas-capital-what-can-be-designated-non-doms
   - A6: cgt-rebasing-election-fa-2025-schedule-11-narrow-eligibility-non-doms
   - A7: iht-long-term-resident-test-section-6a-tail-period-table-landlords
   - A8: excluded-property-trust-long-term-resident-settlor-pivot-landlords
   - A9: iht-spouse-exemption-long-term-resident-section-18-section-267zc-election
   - A10: returning-to-uk-after-non-residence-section-10a-recapture-fig-eligibility
5. docs/property/wave9_page_tracker.md (your A1-A10 rows; flip ⬜ → in_progress when you claim; ABSOLUTE PATH)
6. docs/property/wave9_site_wide_flags.md (cross-session flags; ABSOLUTE PATH)
7. docs/property/wave9_questions_session_A.md (your Q&A channel; ABSOLUTE PATH)
8. docs/property/wave9_discovery_log_session_A.md (your discoveries; ABSOLUTE PATH)

Acknowledge with one short status line: "Session A picked up. Main at b48406e. Reading START_HERE and pillar brief A7 now."

Then claim brief per within-bucket priority (A7 LTR pillar first per cross-link convention; A8 + A9 reference A7's s.6A architecture; A1-A3 FIG cluster A1 first then A2 + A3; A4 TRF pillar then A5; A6 standalone; A10 LAST per cross-link convention) and follow the 19-step workflow.

After raising any Q-N, spawn a session-side watcher per §8.4. Keep working on other briefs while waiting.

Critical §16.35 + §16.45 per-write verification (11 watchpoints from Wave 9 prep 51 drift catches):
- IHTA s.267 OMITTED by FA 2025 — do NOT cite in post-FA-2025 content; use s.6A LTR test
- s.267ZC is SPOUSAL (NOT generic) — Conditions A + B both require spouse/civil-partner connection
- s.267ZA also SPOUSAL with pre-6-April-2025 cutoff on spousal-connection date (no automatic repeal)
- s.18(2) by-reference to Sch 1 NRB (currently £325k — do NOT hard-code)
- FIG is in FA 2025 s.37 + ITTOIA 2005 ss.845A-J (NOT Sch 9)
- FIG 4 conditions per s.845B(1) incl. age-floor 10+
- FIG claim deadline: s.845A's own 12-month-from-31-January (NOT TMA 1970 s.43)
- TRF 3 scenarios per Sch 10 para 2: 2(2), 2(5), 2(8)
- TRF rates: 12% / 12% / 15%
- CGT rebasing Sch 11: 5 narrow conditions; UK property excluded; active s.809B required
- s.6A tail-period table: 3-10 years scaling (NOT flat 3-year)

Within-bucket sequencing (§16.32): A7 first (LTR pillar); A1-A3 FIG cluster A1 first; A4-A5 TRF cluster A4 first; A6 standalone; A10 LAST.

Critical anti-templating discipline: 10 pages cannot read like 10 versions of the same page. Stop after page 3 and self-check; report any templating drift via flag.

Critical handover hygiene (§16.14): if you commit a brief but feel context-pressured, FLIP THE TRACKER FIRST (step 14) before stopping. ABSOLUTE PATH to main.
```

---



**F-numbering range (Bug #2 fix - prevents cross-session F-number collisions like Wave 8 F-4 dupe):** when raising flags in this session's bucket, use F-numbers in the range **F-1 to F-9** ONLY. Do not use F-numbers outside this range even if the next available number sequentially appears free.
## Session B — Transactions in UK land + developer tax

**Open in:** `C:/Users/user/Documents/Accounting-wt-property-WAVE9-b/`

```
You are Session B for Wave 9 of the Property Net-New Program. Working in worktree `Accounting-wt-property-WAVE9-b` on branch `property-WAVE9-b` at HEAD `b48406e`. Bucket: Transactions in UK land + trading-vs-investment + developer tax (10 briefs B1-B10).

**Q&A discipline (§16.15 + §16.37 critical):** when raising a Q to manager, append to `C:/Users/user/Documents/Accounting/docs/property/wave9_questions_session_B.md` via ABSOLUTE PATH from your worktree. NEVER append to the worktree's relative-path copy. Same discipline for tracker, flags, discovery logs.

Read first, in this order:
1. docs/sessions/property/wave9_SESSION_B_START_HERE.md (your task brief + bucket overview + 13 critical drift watchpoints)
2. docs/property/NETNEW_PROGRAM.md (§0 + §4 + §7 + §8 + §13 + §16 lessons especially §16.14/§16.15/§16.16/§16.27/§16.30/§16.32/§16.35/§16.36/§16.37/§16.40/§16.42/§16.45/§16.46)
3. docs/property/house_positions.md — for Session B: §28 (NEW Wave 9 cluster Transactions in UK land + Stage 2b refresh) + §21 (Wave 4 LtdCo) + §21.A (Wave 9 CT three-figure framework + Stage 1b expansive s.18N(3)) + §25 (Wave 6 CAA 2001) + §25.11 (Wave 7 s.198 fixtures) + §25.12 (Wave 9 LRR mini-lock + Stage 2b s.1178 + s.1175 range corrections) + §22.1 (Pawson BPR investment line) + §5 (CGT) + §1 + §1.A (Wave 7 SDLT partnership)
4. Your 10 briefs at briefs/property/WAVE9/:
   - B1 (PILLAR): transactions-in-uk-land-cta-2010-part-8zb-ita-2007-part-9a-four-conditions-test
   - B2: condition-a-acquisition-main-purpose-test-trader-by-stealth-landlord-trap
   - B3: condition-d-development-main-purpose-convert-and-flip-trap-landlord-developers
   - B4: condition-c-trading-stock-section-162-incorporation-relief-denial-developers
   - B5: indirect-disposals-property-rich-entities-section-356od-section-517d-slice-action
   - B6: anti-fragmentation-rule-section-356oh-section-517h-multi-entity-developer-scheme-defeat
   - B7: badges-of-trade-marson-morton-property-flipping-investment-distinction-landlords
   - B8: non-resident-developer-uk-tax-scope-fa-2016-offshore-developer-planning-closure
   - B9: land-remediation-relief-cta-2009-part-14-100-50-percent-deduction-polluter-exclusion
   - B10: property-partnership-trading-investment-jv-developer-structures-sch-15-sdlt-interaction
5. docs/property/wave9_page_tracker.md (your B1-B10 rows; ABSOLUTE PATH)
6. docs/property/wave9_site_wide_flags.md (ABSOLUTE PATH)
7. docs/property/wave9_questions_session_B.md (ABSOLUTE PATH)
8. docs/property/wave9_discovery_log_session_B.md (ABSOLUTE PATH)

Acknowledge with one short status line: "Session B picked up. Main at b48406e. Reading START_HERE and pillar brief B1 now."

Then claim B1 PILLAR first (B2-B6 reference B1's four-conditions architecture). After B1: B2/B3/B4 deep-dive Conditions A/D/C; B5/B6 anti-avoidance; B7 badges of trade; B8 non-resident scope; B9 LRR (cross-link Wave 7 §25.11 + Wave 6 §25 + §25.12); B10 partnership JV LAST (cross-link Wave 7 §1.A + B1 + B6 + RPDT for >£25m groups).

Critical §16.35 + §16.45 per-write verification (13 watchpoints from Wave 9 prep — read all in START_HERE):
- CTA 2010 Part 8ZB ss.356OA-356OT + ITA 2007 Part 9A ss.517A-517U (FA 2016 ss.77/79 commencement 5 July 2016)
- Conditions A-D disjunctive "main purpose, or one of the main purposes" per s.356OB(4)-(7)
- s.356OB(2) chargeable-person rule + s.356OB(8) six-month time-period definition (distinct)
- s.356OD is THREE-condition framework (NOT parallel four-conditions)
- CTA 2009 Part 14 ends at s.1175 (NOT s.1179)
- LRR rate = 100% + 50% additional per s.1149(8) (use additive framing)
- LRR relevant-connection at s.1178 (NOT s.1150(3); three-pathway test)
- LRR is company-only (individuals must incorporate)
- RPDT IS IN FORCE per FA 2022 Part 2 (NOT repealed at FA 2024 s.81 as earlier framing wrongly stated; verified 2026-05-25)
- s.18N(3) expansive exclusion: connected + spouses + relatives + spouses of relatives
- s.162 incorporation relief blocked for trading stock (Condition C); use CTA 2010 Part 22 route
- Marson v Morton nine badges (do NOT condense)

Within-bucket sequencing (§16.32): B1 PILLAR first; B2/B3/B4 deep-dive Conditions; B5/B6 anti-avoidance; B7 badges; B8 non-resident; B9 LRR cross-link Wave 7 §25.11 + Wave 6 §25 + §25.12; B10 partnership JV LAST.

Critical anti-templating discipline: 10 pages cannot read like 10 variants. Stop after page 3 and self-check.

Critical handover hygiene (§16.14): if context-pressured, FLIP THE TRACKER FIRST before stopping. ABSOLUTE PATH to main.
```

---



**F-numbering range (Bug #2 fix - prevents cross-session F-number collisions like Wave 8 F-4 dupe):** when raising flags in this session's bucket, use F-numbers in the range **F-10 to F-19** ONLY. Do not use F-numbers outside this range even if the next available number sequentially appears free.
## Session C — VAT operational depth on commercial property

**Open in:** `C:/Users/user/Documents/Accounting-wt-property-WAVE9-c/`

```
You are Session C for Wave 9 of the Property Net-New Program. Working in worktree `Accounting-wt-property-WAVE9-c` on branch `property-WAVE9-c` at HEAD `b48406e`. Bucket: VAT operational depth on commercial property (9 briefs — C4 dropped at cannib audit; C5 + C6 reframed at Stage 1a; final lineup C1, C2, C3, C5, C6, C7, C8, C9, C10).

**Q&A discipline (§16.15 + §16.37 critical):** when raising a Q to manager, append to `C:/Users/user/Documents/Accounting/docs/property/wave9_questions_session_C.md` via ABSOLUTE PATH from your worktree. NEVER append to the worktree's relative-path copy. Same discipline for tracker, flags, discovery logs.

Read first, in this order:
1. docs/sessions/property/wave9_SESSION_C_START_HERE.md (your task brief + bucket overview + 7 critical drift watchpoints)
2. docs/property/NETNEW_PROGRAM.md (§0 + §4 + §7 + §8 + §13 + §16 lessons especially §16.14/§16.15/§16.16/§16.27/§16.32/§16.35/§16.36/§16.37/§16.45/§16.46)
3. docs/property/house_positions.md — for Session C: §29 (NEW Wave 9 VAT architectural cluster — single primary anchor for all 9 picks; sub-sections §29.1-§29.11 with Stage 2b corrections on s.26B drop + Sch 7A Group 7 reframe + reg 107A SI 2002/1074 cite)
4. Your 9 briefs at briefs/property/WAVE9/:
   - C1 (PILLAR): option-to-tax-vata-1994-schedule-10-commercial-property-20-year-lock
   - C2: option-to-tax-revocation-routes-6-month-cooling-off-20-year-exit-landlords
   - C3: transfer-of-going-concern-togc-commercial-property-option-matching-vat-free
   - C5: vat-partial-exemption-special-method-approval-landlords-standard-method-override-mechanics (REFRAMED — SPECIAL method, not standard which is Wave 5)
   - C6: vat-commercial-to-residential-conversion-5-percent-reduced-rate-developer-recovery-mechanics (REFRAMED — narrow com-to-res 5% focus)
   - C7: disapplication-option-to-tax-schedule-10-paragraph-12-residential-conversion (covers paras 5+6+12 distinguished)
   - C8: vat-storage-facility-lettings-schedule-9-group-1-supply-categorisation-landlords (self-storage STANDARD-RATED carve-out)
   - C9: vat-registration-threshold-90k-landlords-april-2024-group-registration
   - C10: landlord-vat-recovery-professional-fees-capital-costs-commercial-property
5. docs/property/wave9_page_tracker.md (your C-bucket rows; ABSOLUTE PATH)
6. docs/property/wave9_site_wide_flags.md (ABSOLUTE PATH)
7. docs/property/wave9_questions_session_C.md (ABSOLUTE PATH)
8. docs/property/wave9_discovery_log_session_C.md (ABSOLUTE PATH)

Acknowledge with one short status line: "Session C picked up. Main at b48406e. Reading START_HERE and pillar brief C1 now."

Then claim C1 PILLAR first (C2 + C7 reference C1's option-to-tax architecture). After C1: C2 (revocation); C3 (TOGC + option-matching); C5 (special method); C7 (disapplication paras 5+6+12); C6 + C8 + C9 + C10 independent.

Critical §16.35 + §16.45 per-write verification (7 watchpoints from Wave 9 prep — read all in START_HERE):
- VATA 1994 s.26B is Flat-Rate Scheme (NOT CGS); CGS is in SI 1995/2518 Part XV regs 112-116
- Sch 7A Group 7 is empty-homes 2-year-vacancy renovation (NOT changed-number-of-dwellings)
- Reg 107A inserted by SI 2002/1074 (NOT SI 2002/1142)
- Self-storage STANDARD-RATED per Sch 9 Gr 1 para (ka) (FA 2012 Sch 26) from 1 October 2012
- Sch 10 para 12 = "Developers of exempt land" anti-avoidance (dwelling disapplication is paras 5 + 6)
- CGS = £250k threshold + 10-year adjustment (NOT 5-year)
- VAT registration threshold £90k from 1 April 2024 (rate-by-reference; verify at write time)

Within-bucket sequencing (§16.32): C1 PILLAR first; C2 + C7 build on C1; C3 cross-references C1 option-matching; C5 + C10 recovery-mechanics cluster; C6 + C8 + C9 independent.

Critical anti-templating discipline: 9 pages cannot read like 9 variants. Stop after page 3 and self-check.

Critical handover hygiene (§16.14): if context-pressured, FLIP THE TRACKER FIRST before stopping. ABSOLUTE PATH to main.
```

---

**End of Wave 9 launch prompts.**


**F-numbering range (Bug #2 fix - prevents cross-session F-number collisions like Wave 8 F-4 dupe):** when raising flags in this session's bucket, use F-numbers in the range **F-20 to F-29** ONLY. Do not use F-numbers outside this range even if the next available number sequentially appears free.
