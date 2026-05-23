# Wave 5 launch prompts

**Status as of 2026-05-23:** Wave 5 prelaunch in progress. Main at `050bd72` (manager fills at worktree-creation time). Three worktrees on branches `property-wave5-{a,b,c}` (to be created from current main HEAD per task #10). House positions §23 (Devolved property tax) + §24 (Form 17 + joint ownership + spouse-mechanics) locked. 30 briefs at `briefs/property/wave5/` from Stage 2 (verified-live URLs + framing differentiators + cross-mechanism authority links).

**Manager-side Q&A watcher to be armed at launch** (polls the three `wave5_questions_session_*.md` files every 20 seconds for new `STATUS: open` lines).

**To launch:** open three fresh Claude Opus 4.7 sessions, one per worktree directory below. Paste the corresponding prompt verbatim into each session as the first user message.

---

## Session A — VAT topical-gap deepening

**Open in:** `C:/Users/user/Documents/Accounting-wt-property-wave5-a/`

```
You are Session A for Wave 5 of the Property Net-New Program. Working in worktree `Accounting-wt-property-wave5-a` on branch `property-wave5-a` at HEAD `050bd72`. Bucket: VAT topical-gap deepening (10 briefs A1-A10).

Read first, in this order:
1. docs/sessions/property/WAVE5_SESSION_A_START_HERE.md (your task brief and bucket overview)
2. docs/property/NETNEW_PROGRAM.md (§0 norms, §4 brief anatomy, §7 19-step workflow, §8 Q&A channel, §13 manager instructions, §16.14 + §16.15 + §16.16 + §16.17 + §16.27 + §16.30 + §16.35 lessons)
3. docs/property/house_positions.md — Bucket A has NO dedicated locked section (VAT is UK-wide statute, statute-isolated from §15-§24). Your authorities are VATA 1994, VAT Regulations 1995, HMRC VAT Notices (708, 706/2, 706, 742, 709/3), HMRC VAT Manuals (VATSC, VATLAND, PE, VIT). §16.35 per-write verification mandate is paramount for this bucket; every numeric VAT figure verified against current gov.uk at write time before committing.
4. Your 10 briefs at briefs/property/wave5/:
   - A1: vat-option-to-tax-commercial-property-mechanics-election-revocation
   - A2: vat-capital-goods-scheme-property-businesses-10-year-adjustment-mechanics
   - A3: vat-partial-exemption-landlords-mixed-residential-commercial-portfolios-standard-method
   - A4: vat-mixed-use-property-purchase-residential-commercial-element-apportionment
   - A5: vat-dilapidations-payments-tenant-landlord-vat-treatment-supply-or-damages
   - A6: vat-property-conversion-residential-to-commercial-or-commercial-to-residential-zero-rate-reduced-rate
   - A7: vat-developer-pre-registration-input-tax-recovery-property-development-projects
   - A8: vat-toms-long-term-stays-hotel-aparthotel-28-day-rule-mechanics
   - A9: vat-cladding-remediation-relief-residential-building-safety-act-section-30a-mechanics
   - A10: vat-on-rental-income-residential-vs-commercial-landlord-vat-status-decision-framework
5. docs/property/wave5_page_tracker.md (your A1-A10 rows; flip ⬜ → 🟡 when you claim a brief)
6. docs/property/wave5_site_wide_flags.md (cross-session flags; append when you raise one)
7. docs/property/wave5_questions_session_A.md (your Q&A channel)

Acknowledge with one short status line: "Session A picked up. Main at 050bd72. Reading START_HERE and brief A1 now."

Then claim brief A1 in the tracker and follow the 19-step workflow.

After raising any STATUS: open Q&A, spawn a session-side watcher per §8.4. Keep working on other briefs while waiting.

Critical §16.35 per-write verification: every numeric VAT figure (rates, scheme thresholds, day-triggers, percentages, register positions) MUST be WebFetched against current gov.uk at write time before being baked into a worked example. Bucket A has no locked house position; you are the per-write defence against Bill-vs-enacted-Act drift.

Anti-templating for A1-A10: 10 pages all VAT cannot read like 10 versions of the same page. A1 (OTT) is foundational; A2 + A3 cite A1 as upstream. A6 (conversion) differentiates from existing new-build + DIY pages. A8 (long-stay TOMS) is a deepening of the existing TOMS framework page. A10 (umbrella) is the entry-level cross-link to A1 + A3.

Critical handover hygiene (§16.14): if you commit a brief but feel context-pressured, FLIP THE TRACKER FIRST (step 16) before stopping.
```

---

## Session B — Devolved property tax (Welsh LTT + Scottish LBTT + ADS)

**Open in:** `C:/Users/user/Documents/Accounting-wt-property-wave5-b/`

```
You are Session B for Wave 5 of the Property Net-New Program. Working in worktree `Accounting-wt-property-wave5-b` on branch `property-wave5-b` at HEAD `050bd72`. Bucket: Devolved property tax (10 briefs B1-B10; 5 Welsh + 5 Scottish).

Read first, in this order:
1. docs/sessions/property/WAVE5_SESSION_B_START_HERE.md (your task brief and bucket overview)
2. docs/property/NETNEW_PROGRAM.md (§0 norms, §4 brief anatomy, §7 19-step workflow, §8 Q&A channel, §13 manager instructions, §16.14 + §16.15 + §16.16 + §16.17 + §16.27 + §16.30 + §16.32 + §16.35 lessons)
3. docs/property/house_positions.md — §1 (SDLT for England + NI cross-jurisdictional comparison) plus §23 (Welsh LTT + Scottish LBTT + ADS Wave 5 extension, locked 2026-05-23). §23 covers Welsh main rates, Welsh higher rates (post-uplift 5%/8.5%/10%/12.5%/15%/17% from 11 Dec 2024), Welsh MDR retained (subsidiary-dwelling carve-out 7 Feb 2025 + 3% min-rate floor from 13 Feb 2026), Scottish main rates, Scottish ADS (8% from 5 Dec 2024, 36-month replacement window), Scottish MDR retained, NI SDLT confirmation, cross-jurisdictional traps. §22 for IHT cross-jurisdictional contexts.
4. Your 10 briefs at briefs/property/wave5/:
   - B1: welsh-land-transaction-tax-ltt-rates-bands-2026-27-residential-buyers
   - B2: welsh-ltt-higher-rates-residential-second-homes-additional-properties-surcharge-mechanics
   - B3: welsh-ltt-multiple-dwellings-relief-bulk-purchases-mechanics-survives-vs-sdlt-abolition
   - B4: welsh-ltt-first-time-buyer-relief-mechanics-eligibility-comparison-england-scotland
   - B5: welsh-ltt-derelict-uninhabitable-property-refund-relief-claim-mechanics
   - B6: scottish-lbtt-rates-bands-2026-27-residential-buyers-complete-guide
   - B7: scottish-lbtt-additional-dwelling-supplement-ads-mechanics-second-home-buyers
   - B8: scottish-lbtt-first-time-buyer-relief-eligibility-mechanics
   - B9: scottish-lbtt-corporate-buyer-15-percent-flat-rate-or-ads-pathway-decision
   - B10: scottish-lbtt-bare-trust-acquisition-relief-corporate-restructuring-mechanics
5. docs/property/wave5_page_tracker.md (your B1-B10 rows)
6. docs/property/wave5_site_wide_flags.md (cross-session flags)
7. docs/property/wave5_questions_session_B.md (your Q&A channel)

Acknowledge with one short status line: "Session B picked up. Main at 050bd72. Reading START_HERE and brief B1 now."

Then claim brief B1 in the tracker and follow the 19-step workflow.

After raising any STATUS: open Q&A, spawn a session-side watcher per §8.4. Keep working on other briefs while waiting.

**Critical §16.32 cross-bucket sequencing:** B2 (Welsh higher rates) + B7 (Scottish ADS) must ship BEFORE Session C's C9 (English SDLT spousal aggregation). All three cover the joint-buyer spousal-aggregation parallel across the three jurisdictions. Suggested order: B1 → B2 (early shipping for B2) → B3 → B4 → B5 → B6 → B7 (early shipping for B7) → B8 → B9 → B10. This maximises Session C's C9 coordination flexibility.

**Critical §16.35 per-write verification:** devolved property tax figures change annually with each Welsh / Scottish Budget cycle. The §23 drafter flagged three explicit verify-at-write hedges:
- Welsh LTT MDR 3% minimum-rate floor from 13 Feb 2026 (B3): SI commencement cite not on legislation.gov.uk at 2026-05-23 lock time; re-verify before writing.
- Scottish LBTT MDR minimum-rate floor (B6, B10): set by SSI, periodically revised.
- Scottish ADS rate-step SSIs (B7): precise SSI cites partially captured.
Every numeric figure verified against current gov.wales / revenue.scot / legislation.gov.uk at write time before being baked into a worked example.

**Critical anti-templating discipline:** within-bucket parallel pairs (B1↔B6 main rates; B2↔B7 surcharges; B4↔B8 FTB treatment) are the biggest templating risk. Each brief MUST own a POSITIVE-framing of the specific Welsh/Scottish mechanic with its own statute + own worked example with jurisdiction-specific figures. NOT "the Welsh equivalent of England's SDLT X". Manager spot-check after your first 3 pages — stop after B3 and confirm no templating drift before proceeding to B4-B10.

Critical handover hygiene (§16.14): if you commit a brief but feel context-pressured, FLIP THE TRACKER FIRST (step 16) before stopping.
```

---

## Session C — Form 17 + joint ownership + spouse-mechanics

**Open in:** `C:/Users/user/Documents/Accounting-wt-property-wave5-c/`

```
You are Session C for Wave 5 of the Property Net-New Program. Working in worktree `Accounting-wt-property-wave5-c` on branch `property-wave5-c` at HEAD `050bd72`. Bucket: Form 17 + joint ownership + spouse-mechanics (10 briefs C1-C10).

Read first, in this order:
1. docs/sessions/property/WAVE5_SESSION_C_START_HERE.md (your task brief and bucket overview)
2. docs/property/NETNEW_PROGRAM.md (§0 norms, §4 brief anatomy, §7 19-step workflow, §8 Q&A channel, §13 manager instructions, §16.14 + §16.15 + §16.16 + §16.17 + §16.27 + §16.30 + §16.32 + §16.35 lessons)
3. docs/property/house_positions.md — §24 (Form 17 + joint ownership + spouse-mechanics Wave 5 extension, locked 2026-05-23) is your primary locked position. Cross-references: §4 (Section 24 finance cost restriction), §15.2 (GROB family-home), §15.5 (IHT spousal exemption), §19.4 (MTD joint-owner threshold gross-share rule), §21.2 (settlements legislation Arctic Systems carve-out), §22.5 (transferable NRB + RNRB), §23.5 (ADS joint-buyer trigger), §1 (SDLT for C9 FA 2003 Sch 4ZA mechanic).
4. Existing on-site joint-ownership inventory (read for cannibal context):
   - section-24-joint-property-ownership-tax-split (BACK-PATCHED 2026-05-23 with correct §24 Form 17 framing per F-1; C1 + C4 forward-link to this as cousin-applied content)
   - cgt-property-transfer-spouse (sibling to C7)
   - mtd-itsa-jointly-owned-property-threshold-split (Wave 3 B3)
   - mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse (Wave 4 B1)
   - iht-spouse-exemption-second-death-property-portfolio-window-mechanics (Wave 4 C2, downstream mechanic for C8)
   - alphabet-shares-property-spv-dividend-splitting-spouse-children (Wave 4 A2, settlements legislation cross-link)
   - fic-property-retirement-decumulation-mechanics-uk (Wave 4 A8, FIC alternative-route sibling to C10)
5. Your 10 briefs at briefs/property/wave5/:
   - C1: form-17-declaration-beneficial-interest-property-mechanics-filing-revocation
   - C2: joint-tenants-vs-tenants-in-common-property-tax-consequences-uk-landlords
   - C3: declaration-of-trust-property-beneficial-ownership-mechanics-evidence-form-17
   - C4: unequal-rental-income-split-spouses-tax-planning-form-17-vs-default-50-50-decision
   - C5: civil-partnerships-joint-property-ownership-tax-treatment-form-17-equality
   - C6: unmarried-co-owners-property-tax-rental-income-split-actual-beneficial-share
   - C7: cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics
   - C8: iht-joint-ownership-property-spouse-exemption-transferable-allowances-jointly-tic-vs-jt
   - C9: second-home-sdlt-additional-dwellings-surcharge-joint-owners-spouse-aggregation-rules
   - C10: retirement-planning-spousal-rental-income-shift-form-17-marginal-rate-restructure
6. docs/property/wave5_page_tracker.md (your C1-C10 rows)
7. docs/property/wave5_site_wide_flags.md (cross-session flags)
8. docs/property/wave5_questions_session_C.md (your Q&A channel)

Acknowledge with one short status line: "Session C picked up. Main at 050bd72. Reading START_HERE and brief C1 now."

Then claim brief C1 in the tracker and follow the 19-step workflow.

After raising any STATUS: open Q&A, spawn a session-side watcher per §8.4. Keep working on other briefs while waiting.

**Critical §16.32 cross-bucket sequencing:**

1. **C1 must ship BEFORE C5.** C5 is civil-partner-cohort-applied; C1 is the upstream Form 17 mechanic. Write C1 first in your sequence, OR if you write C5 in parallel include a forward-link placeholder for manager to hyperlink at merge.

2. **B2 + B7 must ship before C9.** C9 is the English SDLT spousal-aggregation page; B2 (Welsh LTT higher rates) + B7 (Scottish ADS) cover the devolved equivalents. Before claiming C9, check wave5_page_tracker.md for B2 + B7 status; if not yet committed, EITHER wait OR include forward-link placeholders. Suggested: claim C9 LAST in your sequence (after C1-C8 + C10) to maximise B2/B7 coordination flexibility.

3. **C8 ↔ Wave 4 C2 cross-wave:** C8 (structural-choice JT vs TIC) cites Wave 4 C2 (second-death window mechanic) as downstream. Wave 4 C2 is on main; cite directly.

4. **C10 ↔ Wave 4 A8 cross-wave:** C10 (retirement Form-17 shift) cross-links Wave 4 A8 (FIC retirement decumulation) as alternative-route via FIC corporate structure.

**Critical §16.35 per-write verification:** every numeric figure cited from §24 OR from cross-mechanism positions (§4 / §15 / §19.4 / §22.5 / §23.5 / §1 / §21.2) must be re-verified against current gov.uk + legislation.gov.uk at write time before being baked into a worked example. F-19 + F-20 = 5th + 6th consecutive Bill-vs-enacted-Act drift; the per-write mandate exists because the pattern is so reliable.

**HOUSE_POSITION_CONFLICT awareness:** §24 is freshly locked 2026-05-23 (today). The existing section-24-joint-property-ownership-tax-split.md was back-patched today to align (F-1 fix). If any competitor source contradicts §24, the house position wins; flag in wave5_site_wide_flags.md.

Critical handover hygiene (§16.14): if you commit a brief but feel context-pressured, FLIP THE TRACKER FIRST (step 16) before stopping.

Sequence note: C1 (Form 17 mechanic) MUST ship first. C2 + C3 (structural underpinnings) next. C4-C10 cite C1/C2/C3 as upstream. C9 last to maximise B2/B7 coordination.
```

---

## Wave 5 prelaunch summary

| Step | Status | Reference |
|---|---|---|
| House positions §23 (Devolved) + §24 (Form 17) locked | ✅ | commit `2af6268` |
| F-19 + F-20 §21.4 patch + 38-page back-patch | ✅ | commit `616c127` |
| §16.35 per-write verification lesson added | ✅ | commit `2af6268` |
| Inter-wave queue closures (F-9 + §20.7/§20.11 + Wales footnote) | ✅ | commit `2af6268` |
| F-1 back-patch (existing section-24 Form 17 framing) | ✅ | commit `2af6268` |
| Wave 5 Stage 1 candidates (30 across 3 buckets) | ✅ | commit `2af6268` |
| Wave 5 Stage 2 briefs (30 at briefs/property/wave5/*) | 🟡 In flight | Sessions A done, B+C running at time of doc draft |
| Wave 5 tracker + flags + Q&A scaffolds (A/B/C) | ✅ | commit `2af6268` |
| START_HERE docs × 3 | ✅ | this commit |
| Launch prompts | ✅ | this document |
| Worktrees + .env + _db.py + ff-verify per §16.25 | ⏳ Pending | task #10 final step (after Stage 2 commit) |
| Manager-side watcher armed | ⏳ Pending | at launch |
| Final HEAD ref filled in launch prompts | ⏳ Pending | at worktree-creation time |

User action when ready to launch: open three fresh Opus 4.7 sessions in the three worktree directories, paste the three prompts above into them (with `050bd72` placeholder filled in by manager).
