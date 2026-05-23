# Wave 5 Session B questions (Devolved property tax: Welsh LTT + Scottish LBTT + ADS)

Append-only. Each question uses format:

```
## [Q-N] [YYYY-MM-DD HH:MMZ] [STATUS: open|answered] Title

(Session question body)

### Manager answer [TIMESTAMP]

(Manager response; flip STATUS open → answered when answer is appended.)
```

Manager-side watcher polls every 20s for new `STATUS: open` lines.

Use Q&A only when blocked AND answer not in brief / house positions / session's authority per §13.3.

Manager-initiated notes use format `## [M-N] [TIMESTAMP] [MANAGER NOTE] Title` (no STATUS).

---

## [Q-1] [2026-05-23 18:30Z] [STATUS: answered] Manager templating spot-check at B3 gate per launch-prompt instruction

Per the launch prompt: "Manager spot-check after your first 3 pages. Stop after B3 and confirm no templating drift before proceeding to B4-B10." B1, B2, B3 are now done (commits 92a488f, 2a63a1a, b81e0d7 on branch property-wave5-b). Pausing work pending manager confirmation.

**Self-assessment of templating risk across B1, B2, B3:**

- **B1 H2 outline:** Three things Welsh buyers should know first / The 2026/27 main residential rate table / What "effective date" means + 30-day return clock / Three worked examples at main rates (Davies Pontypridd £220k, Williams-Hughes Cardigan £395k, Jones Cowbridge £1.6m) / Cross-border transactions / Four-nation comparison / Filing the return / Where this page sits / Common mistakes / Where to go next.
- **B2 H2 outline:** What "higher rates" means in Wales (standalone-band-structure positive framing) / The 2026/27 higher residential rate table / £40k minor-interest threshold / 36-month replacement window / Spousal aggregation under Sch 5 para 25 / Corporate buyers + trust interests / Three worked examples (Evans-Thomas Anglesey £165k, Williams-Hughes Cardigan £325k BTL, Jones-Edwards Powys £900k replacement) / Cross-jurisdictional comparison (different table from B1) / Where this page sits / Common mistakes.
- **B3 H2 outline:** Welsh policy choice (survive-and-modify framing) / Mean-consideration formula in detail / 7 February 2025 subsidiary-dwelling carve-out / Minimum-rate floor in detail / Three worked examples (Davies Holdings Newport corporate £900k, Williams-Hughes Estates Carmarthen LLP £480k, Evans-Thomas Brecon main-with-annexe £350k pre/post 2025) / Reliefs interaction / SDLT abolition contrast / Common mistakes / Where this page sits.

**Positive-framing leads (anti-templating discipline check):**
- B1 leads with "Three things Welsh buyers should know first" (universal £225k nil band + no NR surcharge + no FTB regime, all positive Welsh-policy choices).
- B2 leads with "What 'higher rates' means in Wales (and why it is not a surcharge)" (standalone band structure positive).
- B3 leads with "The Welsh policy choice: survive and modify, not abolish" (live-relief positive).

None of the three pages structures itself as "the Welsh equivalent of SDLT X" or as a mirror to B6/B7 (which haven't been written). H2 outlines diverge significantly. Worked-example personas vary: Davies + Williams-Hughes + Jones (B1) / Evans-Thomas + Williams-Hughes + Jones-Edwards (B2) / Davies Holdings + Williams-Hughes Estates + Evans-Thomas (B3). The Williams-Hughes name re-uses across pages because it's used in different scenarios (FTB Cardigan barn in B1, joint-tenant Bristol+Cardigan BTL in B2, Carmarthen partnership in B3); persona name re-use was deliberate and the role differs each time. Manager may flag if persona-name overlap is itself a templating-risk signal.

**FAQ framing variation check:** No "Is X tax deductible?" patterns; no "How does X work?" patterns. Each FAQ leads with the specific Welsh-statute mechanic.

**Citations density:** All three pages cite LTTA 2017 by section + Schedule (B1: ss.10, 24, 41, Sch 22; B2: Sch 5 paras 3/8/11/14/17/20/25/27-28/29 + s.24; B3: Sch 13 paras 5-9 + Schs 7/16/19 + s.30(6)(b)) plus relevant SI / contrasting FA 2003 cites.

Proceeding with B4 (Welsh FTB absence) unless manager M-notes drift detected. The §16.32 sequencing for C9 is on track: B2 already done so the Welsh spousal-aggregation parallel is on branch ahead of C9 launch.

### Manager answer [2026-05-23 19:05Z]

**Templating spot-check at B3 gate: PASS. Proceed to B4-B10.**

Reviewed B1 + B2 + B3 in detail. Anti-templating discipline held cleanly on every dimension:

1. **H2 outlines starkly distinct.** B1 leads with "Three things Welsh buyers should know first" + 4-nation comparison table. B2 leads with "What 'higher rates' means in Wales (and why it is not a surcharge)" + standalone-band-structure framing. B3 leads with "The Welsh policy choice: survive and modify" + SDLT-abolition contrast. Zero structural mirroring across the three pages.

2. **Positive-framing leads held.** All three pages anchor on positive Welsh-policy choices (universal £225k nil band; standalone band structure; survive-and-modify MDR) rather than "the Welsh equivalent of SDLT X". The standalone-band-structure framing in B2 is the load-bearing anti-templating lever against the eventual B7 (Scottish ADS 8%-on-entire-price); the three additional-charge regimes are now clearly differentiated.

3. **Persona variation acceptable.** Davies (B1) / Evans-Thomas (B2 + B3) / Williams-Hughes (B1 + B2 + B3) / Jones (B1) / Jones-Edwards (B2) / Davies Holdings (B3) / Williams-Hughes Estates (B3). The reuses sit in distinct scenarios (FTB barn vs BTL purchase vs Carmarthen LLP; holiday cottage vs annexe), and read as different fictional households sharing common Welsh surnames. **Optional refinement for B4-B10:** introduce additional distinct surnames (Rhys, Powell, Morgan, Pugh, Owen, Pritchard) to reduce sense of recurrence. NOT a blocker.

4. **FAQ framing varied.** No formulaic "Is X tax deductible?" / "How does X work?" templates. Each FAQ leads with the specific Welsh-statute mechanic.

5. **Citation density appropriate per topic.** B1 cites LTTA 2017 ss.10, 24, 41, Sch 22 + cross-reference to FA 2003 Sch 4A. B2 cites LTTA 2017 Sch 5 paras 3/8/11/14/17/20/25/27-28/29 + s.24 + 2024 Amendment Regulations. B3 cites LTTA 2017 Sch 13 paras 5-9 + Schs 7/16/19 + s.30(6)(b) + FA (No.2) Act 2024 + 2025 + 2026 Modification Regulations. Welsh statutory specificity is on the right plane throughout.

6. **§16.32 cross-bucket sequencing honored.** B2 carries the forward-link placeholder to C9 ("Our forthcoming sibling page covers the SDLT mechanic in depth alongside the Welsh and Scottish equivalents; the manager will hyperlink that page at merge"). Welsh side of the C9 spousal-aggregation parallel is now on branch ahead of C9 launch.

7. **§16.35 per-write verification honored.** B3 explicitly carries the verify-at-write hedge for the 2026 MDR floor SI commencement ("verify the exact commencement date against legislation.gov.uk at the time of any transaction; the regulations are subject to Senedd approval"). B2 uses post-uplift figures with appropriate verification anchoring on gov.wales.

8. **No em-dashes detected** across all three pages on review.

**Process correction (§16.15):** Q-1 was written to the **worktree's** copy of `wave5_questions_session_B.md`, not main's copy. Per §16.15, all session-time Q&A / tracker / flags edits go to main's repo file via absolute path (`C:/Users/user/Documents/Accounting/docs/property/wave5_questions_session_B.md`), NEVER as branch commits. For Q-2 onwards please append directly to main's path. This Q-1 has been preserved to main's copy as part of this answer; the worktree copy can stay as-is or be reverted to scaffold (your choice; doesn't affect main).

**Proceed sequence:** B4 (Welsh FTB-absence) → B5 (derelict refund) → B6 (Scottish main rates) → B7 (Scottish ADS, second §16.32-critical brief for C9 coordination) → B8-B10. No further spot-check gate until session-completion. Continue per the 19-step workflow.
