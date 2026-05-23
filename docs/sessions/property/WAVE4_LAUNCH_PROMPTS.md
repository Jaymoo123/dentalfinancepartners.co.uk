# Wave 4 launch prompts

**Status as of 2026-05-23 PM:** Wave 4 prelaunch complete. Main at `f9778a4`. Three worktrees on branches `property-wave4-{a,b,c}`. House positions §19 extended + §21 new + §22 new locked. 30 briefs at `briefs/property/wave4/` with Stage 2-deepened framing + competitor URLs + authority links.

**Manager-side Q&A watcher is armed** (polls the three `wave4_questions_session_*.md` files every 20 seconds for new `STATUS: open` lines).

**To launch:** open three fresh Claude Opus sessions, one per worktree directory below. Paste the corresponding prompt verbatim into each session as the first user message.

---

## Session A — LtdCo mechanics + FIC depth

**Open in:** `C:/Users/user/Documents/Accounting-wt-property-wave4-a/`

```
You are Session A for Wave 4 of the Property Net-New Program. Working in worktree `Accounting-wt-property-wave4-a` on branch `property-wave4-a` at HEAD `f9778a4`. Bucket: LtdCo mechanics + FIC depth (10 briefs A1-A10).

Read first, in this order:
1. docs/sessions/property/WAVE4_SESSION_A_START_HERE.md (your task brief and bucket overview)
2. docs/property/NETNEW_PROGRAM.md (§0 norms, §4 brief anatomy, §7 19-step workflow, §8 Q&A channel, §13 manager instructions for sessions)
3. docs/property/house_positions.md — locked figures and statutes. For LtdCo + FIC work, §11 (existing Ltd Co essentials) and §21 (NEW Wave 4 LtdCo + FIC extension) together. The CIHC citation is CTA 2010 s.18N (NOT s.34, per §16.3 lesson and §21.7 do-not-write).
4. docs/property/wave4_stage2_dispatch_brief.md Bucket A section (Stage 2 deepened your briefs; this is the reference)
5. Your 10 briefs at briefs/property/wave4/:
   - A1: btl-spv-directors-loan-repayment-strategy-tax-efficient-extraction
   - A2: alphabet-shares-property-spv-dividend-splitting-spouse-children
   - A3: btl-limited-company-year-end-date-changing-tax-planning
   - A4: charging-market-rent-to-own-property-company-tax-treatment
   - A5: salary-vs-dividends-property-spv-2026-27-marginal-rate-analysis
   - A6: fic-articles-of-association-property-control-mechanics
   - A7: fic-property-corporate-governance-board-meetings-resolutions-discipline
   - A8: fic-property-retirement-decumulation-mechanics-uk
   - A9: fic-gifting-shares-children-property-7-year-iht-mechanics
   - A10: fic-blended-family-protected-legacy-property-second-marriage
6. docs/property/wave4_page_tracker.md (your A1-A10 rows; flip ⬜ → 🟡 when you claim a brief)
7. docs/property/wave4_site_wide_flags.md (cross-session flags; append when you raise one)
8. docs/property/wave4_questions_session_A.md (your Q&A channel; append `## [Q-N] [TIMESTAMP] STATUS: open` when you need manager input)

Acknowledge with one short status line: "Session A picked up. Main at f9778a4. Reading START_HERE and brief A1 now."

Then claim brief A1 in the tracker and follow the 19-step workflow.

After raising any STATUS: open Q&A, spawn a session-side watcher per §8.4 (Monitor or shell loop polling your Q&A file for `STATUS: answered` on the latest Q-N). Keep working on other briefs while waiting.

Anti-templating discipline for A6-A10: each FIC page owns a distinct primary mechanic per the Stage 2 framing differentiator. Do NOT let two pages collapse onto the same template; vary openings, vary H2 outlines, vary FAQ phrasing.

Cross-bucket boundary: A8 (retirement income), A9 (share-gift PET mechanics), A10 (blended-family persona) own FIC operational mechanics. Bucket C's C7 owns the strategic IHT value-freeze framing and will cite A6-A10 as siblings. Do NOT write strategic IHT framing in A8/A9/A10; that belongs in C7.

Critical handover hygiene (§16.14): if you commit a brief but feel context-pressured, FLIP THE TRACKER FIRST (step 16 of the workflow) before stopping. This is the single most important handover discipline item.
```

---

## Session B — MTD ITSA operational details

**Open in:** `C:/Users/user/Documents/Accounting-wt-property-wave4-b/`

```
You are Session B for Wave 4 of the Property Net-New Program. Working in worktree `Accounting-wt-property-wave4-b` on branch `property-wave4-b` at HEAD `f9778a4`. Bucket: MTD ITSA operational details (10 briefs B1-B10).

Read first, in this order:
1. docs/sessions/property/WAVE4_SESSION_B_START_HERE.md (your task brief and bucket overview)
2. docs/property/NETNEW_PROGRAM.md (§0 norms, §4 brief anatomy, §7 19-step workflow, §8 Q&A channel, §13 manager instructions for sessions)
3. docs/property/house_positions.md — locked figures and statutes. For MTD work, §3 (existing MTD) and §19 (Wave 3 MTD extension with F-6 corrected day-triggers 15/30/31 + 3%/3%/10%) plus §19.10-§19.17 (NEW Wave 4 MTD operational extension covering ASA, foreign property, pension funds, letting-agent who-files, digital links, mid-year cessation, evidence discipline).
4. docs/property/wave4_stage2_dispatch_brief.md Bucket B section (Stage 2 deepened your briefs; this is the reference)
5. Your 10 briefs at briefs/property/wave4/:
   - B1: mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse
   - B2: mtd-itsa-choosing-software-by-landlord-scenario-decision-tree
   - B3: mtd-itsa-agent-services-account-asa-authorisation-walkthrough
   - B4: mtd-itsa-foreign-property-income-quarterly-reporting-rules
   - B5: mtd-itsa-late-submission-points-late-payment-15-30-31-worked
   - B6: mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly
   - B7: mtd-itsa-pension-funds-sipp-ssas-holding-rental-property-treatment
   - B8: mtd-itsa-spreadsheets-with-bridging-software-allowed-mechanics
   - B9: mtd-itsa-stopping-letting-mid-year-cessation-quarterly-mechanics
   - B10: mtd-itsa-digital-records-receipts-bank-feeds-what-counts-evidence
6. docs/property/wave4_page_tracker.md (your B1-B10 rows; flip ⬜ → 🟡 when you claim a brief)
7. docs/property/wave4_site_wide_flags.md (cross-session flags; append when you raise one)
8. docs/property/wave4_questions_session_B.md (your Q&A channel)

Acknowledge with one short status line: "Session B picked up. Main at f9778a4. Reading START_HERE and brief B1 now."

Then claim brief B1 in the tracker and follow the 19-step workflow.

After raising any STATUS: open Q&A, spawn a session-side watcher per §8.4. Keep working on other briefs while waiting.

Critical penalty-content discipline: all Wave 4 MTD penalty content (B5 especially) cites the corrected §19.7 schedule (15/30/31 days at 3%/3%/10%). Do NOT replicate the legacy 31/46/91 + 2%/2%/4% schedule from competitor sites. The existing on-site pages `mtd-rental-income-threshold-exemptions`, `mtd-quarterly-reporting-landlords-step-by-step-guide`, `mtd-penalties-landlords-miss-deadline` are partially back-patched but may still contain stale figures; do NOT cite them as authority. Cite house position §19 instead.

Anti-templating discipline: B5 owns the worked-example floor (numbers, timelines). Wave 3 B6 owns the action checklist (process). Wave 3 B8 owns the rule summary (overview). Cross-link densely; do NOT re-walk content the siblings already own. B2 owns the decision-tree framework, NOT product recommendations; cite gov.uk compatible-software register, not branded picks.

Critical handover hygiene (§16.14): if you commit a brief but feel context-pressured, FLIP THE TRACKER FIRST (step 16) before stopping.
```

---

## Session C — IHT estate planning for landlords

**Open in:** `C:/Users/user/Documents/Accounting-wt-property-wave4-c/`

```
You are Session C for Wave 4 of the Property Net-New Program. Working in worktree `Accounting-wt-property-wave4-c` on branch `property-wave4-c` at HEAD `f9778a4`. Bucket: IHT estate planning for landlords (10 briefs C1-C10).

Read first, in this order:
1. docs/sessions/property/WAVE4_SESSION_C_START_HERE.md (your task brief and bucket overview)
2. docs/property/NETNEW_PROGRAM.md (§0 norms, §4 brief anatomy, §7 19-step workflow, §8 Q&A channel, §13 manager instructions for sessions)
3. docs/property/house_positions.md — locked figures and statutes. For IHT work, §15 (Wave 2 IHT extension covering NRB / RNRB / BPR / PETs / GROB / 7-year clock / April 2026 £1m cap / pension-IHT 2027) and §22 (NEW Wave 4 IHT estate-planning extension covering Pawson BPR test for landlords, deed of variation s.142, charitable 36% rate Sch 1A, CLT discretionary trust + s.260 holdover boundary, spouse exemption + transferable allowances, FIC value-freeze IHT framing). Also §21.5 (FIC mechanics) for the C7 cross-bucket boundary.
4. docs/property/wave4_stage2_dispatch_brief.md Bucket C section (Stage 2 deepened your briefs; this is the reference)
5. Your 10 briefs at briefs/property/wave4/:
   - C1: bpr-pure-btl-pawson-test-why-buy-to-let-fails-investment-line
   - C2: iht-spouse-exemption-second-death-property-portfolio-window-mechanics
   - C3: iht-gift-with-reservation-letting-children-paying-rent-mechanics
   - C4: iht-7-year-clock-property-gifting-mid-life-landlord-strategy
   - C5: deed-of-variation-property-estate-redirecting-inheritance-iht-saving
   - C6: pension-decumulation-property-portfolio-iht-2027-cohort-sequence
   - C7: fic-estate-planning-landlord-portfolio-value-freezing-iht-mechanics
   - C8: iht-1m-bpr-apr-cap-mixed-trading-investing-landlord-allocation
   - C9: iht-charitable-legacy-property-portfolio-36-percent-reduced-rate
   - C10: iht-clt-property-discretionary-trust-20-percent-entry-charge
6. docs/property/wave4_page_tracker.md (your C1-C10 rows; flip ⬜ → 🟡 when you claim a brief)
7. docs/property/wave4_site_wide_flags.md (cross-session flags; append when you raise one)
8. docs/property/wave4_questions_session_C.md (your Q&A channel)

Acknowledge with one short status line: "Session C picked up. Main at f9778a4. Reading START_HERE and brief C1 now."

Then claim brief C1 in the tracker and follow the 19-step workflow.

After raising any STATUS: open Q&A, spawn a session-side watcher per §8.4. Keep working on other briefs while waiting.

CRITICAL cross-bucket boundary for C7: C7 owns the strategic IHT value-freeze framing for portfolio landlords ~£2m+. It cites Bucket A pages A6 (articles drafting), A7 (governance), A8 (in-life retirement income), A9 (share-gift PET mechanics at point of gift), A10 (blended-family persona) as sibling pages providing the operational mechanics, WITHOUT re-walking their ground. C7's framing must compare FIC value-freeze vs direct property 7-year PET (C4) and CLT into discretionary trust (C10). If your draft of C7 drifts into A8 (drawdown mechanics) or A9 (gift-point mechanics) territory, STOP and pull back into the strategic IHT framing.

C1 anti-templating: lead with "Why your BTL doesn't qualify". Short and sharp on the negative case. Defer the boundary case to Wave 2 `serviced-accommodation-bpr-eligibility-pawson-test` and the general rule to Wave 2 `business-property-relief-rental-property-iht`.

C8 verification flag: §15.4 of house_positions notes AIM-shares mechanics as "most likely to be amended". Verify precise AIM rate, AIM allowance interaction (separate sub-tier vs cap-consuming), and trust anti-fragmentation rules against current gov.uk at write time before committing precise figures.

Critical handover hygiene (§16.14): if you commit a brief but feel context-pressured, FLIP THE TRACKER FIRST (step 16) before stopping.
```

---

## Wave 4 prelaunch summary

| Step | Status | Reference |
|---|---|---|
| House positions §19 extended + §21 + §22 locked | ✅ | commit `f9c838b` |
| 30 briefs at `briefs/property/wave4/` (Stage 1 skeletons + Stage 2 deepened) | ✅ | commits `f9c838b` + `f9778a4` |
| Wave tracker + flags + Q&A scaffolds | ✅ | `docs/property/wave4_*` |
| START_HERE docs × 3 | ✅ | `docs/sessions/property/WAVE4_SESSION_{A,B,C}_START_HERE.md` |
| Stage 2 dispatch brief | ✅ | `docs/property/wave4_stage2_dispatch_brief.md` |
| Worktrees + .env + _db.py | ✅ | `Accounting-wt-property-wave4-{a,b,c}` at HEAD `f9778a4` |
| Manager-side watcher armed | ✅ | persistent Monitor on Q&A files |
| Launch prompts | ✅ | this document |

User action: open three fresh Opus sessions in the three worktree directories, paste the three prompts above into them.
