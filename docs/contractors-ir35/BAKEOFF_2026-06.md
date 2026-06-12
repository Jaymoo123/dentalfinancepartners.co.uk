# Writing-model bake-off, 2026-06-12 (contractors-ir35 wave 1)

User-commissioned experiment to decide the volume-writing model for SEO blog content, run on the wave-1 proving pages (real pages, all shipped after remediation). Amends the "Opus 4.8 only" writing rule for this site's volume cluster pages; estate-wide extension is a separate user decision.

## Protocol

- 15 real wave-1 topics, stratified by tier/category, randomly assigned to arms: **Sonnet N=6** (4 pillar + 2 cluster), **Haiku N=6** (3 pillar + 3 cluster), **Opus control N=3** (2 pillar + 1 cluster).
- Identical inputs per topic: the same brief packet (`briefs/contractors-ir35/wave1/BRIEF_PACKET.md`) + HP-locked `house_positions.md`. Web research forbidden, so the model is the only variable.
- Mechanical validation (deterministic script) before judging; **blind judging** by 5 independent Opus judges (3 drafts each, arms mixed, nothing identifying the writer), fixed rubric: factual accuracy vs HP (any error = fail), out-of-HP figures flagged, rule violations, SEO craft 1-5, depth vs best-in-niche 1-5, ship/no-ship. Second Opus judge re-verified a 5-draft sample (one per first-round judge).
- Pre-agreed decision criteria: an arm qualifies iff ship-rate ≥ control minus one draft AND zero factual fails AND mean depth within 0.5 of control. Both qualify → Haiku on cost. Only Sonnet → Sonnet volume + Opus pillars. Neither → Opus-only stands.

## Results

First-round (5 blind judges):

| Arm | Ship | No-ship | Factual-fail drafts | Mean SEO | Mean depth |
|---|---|---|---|---|---|
| Opus control (3) | 3 | 0 | 0 | 4.00 | 4.67 |
| Sonnet (6) | 5 | 1 | 0 | 4.00 | 4.33 |
| Haiku (6) | 1 | 5 | 4 | 3.50 | 3.00 |

**Second-judge re-verification (5-draft sample, fresh eyes, law-level checking) amended two results:**
- `travel-expenses-inside-ir35` (haiku) flipped to factual fail: it claimed accommodation/meals ARE deductible inside IR35 four times incl. a worked example; the restriction covers travel AND subsistence (it also contradicted the sibling expenses guide). First judge missed it. → **Haiku final: 0/6 ship, 5/6 factual-fail drafts.**
- `flat-rate-vat-limited-cost-trader` (sonnet) gained two findings: "the house position" leaked into user copy twice, and one step-list line narrowed the limited-cost test with an AND where the law (and the draft's own body) says either limb. → **Sonnet final: 1 draft with a logic-slip finding** (its body stated the rule correctly; the slip was in a summary step list).
- The three re-verified clean: what-is-ir35 (opus), sds (opus), contractor-expenses-allowable-guide (sonnet, "notably the correct counterpoint on inside-IR35 subsistence").

Per-draft (slug, arm, verdict):

| Slug | Arm | Verdict | Notes |
|---|---|---|---|
| what-is-ir35 | opus | SHIP (4,5) | flagship; zero errors |
| contractor-pension-employer-contributions | opus | SHIP (4,5) | zero errors |
| sds-status-determination-statement | opus | SHIP (4,4) | zero errors |
| inside-ir35 | sonnet | SHIP (4,5) | illustrative figures hedged; 2 arithmetic touch-ups applied by manager |
| psc-limited-company-contractor-tax | sonnet | SHIP (4,4) | 1 illustrative CT rounding corrected by manager |
| contractor-expenses-allowable-guide | sonnet | SHIP (4,4) | out-of-HP items accurate + peripheral |
| how-to-choose-contractor-accountant | sonnet | SHIP (4,5) | depth 5; link overage trimmed pre-judging |
| flat-rate-vat-limited-cost-trader | sonnet | SHIP (4,4) | out-of-HP VAT facts accurate; self-flagged FAQ overage |
| umbrella-company-holiday-pay | sonnet | NO-SHIP → fixed | one filler word; correctly FLAGGED its own out-of-HP figure (model behaviour worth noting) |
| outside-ir35 | haiku | NO-SHIP → fixed | internal "§3 house positions" leak in user copy + markup in frontmatter; no factual error |
| limited-company-vs-umbrella-contractor | haiku | NO-SHIP → Opus repair | **FACTUAL: secondary threshold "£5,000/month, £60,000/year"** (HP §6: annual) + self-contradicting NIC maths |
| off-payroll-working-rules-private-sector | haiku | NO-SHIP → Opus repair | **FACTUAL x2: small/large test inverted (§1.A); set-off "automatic" (§4.A)** + US spellings |
| ir35-small-company-exemption | haiku | NO-SHIP → Opus repair | **FACTUAL x2: worked example exits Ch.10 in 2026/27 (§1.A locks 2027 earliest); fabricated "no employer NIC under Ch.8 worth ~15%" (§4)** |
| travel-expenses-inside-ir35 | haiku | SHIP overturned on re-review → manager repair | **FACTUAL (caught by 2nd judge): subsistence-deductible-inside-IR35 claim x4 incl. worked example**; also out-of-HP VAT line, under-linked, claimed PASS on a failing link count |
| contractor-pension-carry-forward | haiku | NO-SHIP → Opus repair | **FABRICATED MECHANICS x4: invented scheme-sanction charge; inverted adjusted/threshold income; false "employer contribution unwinds the taper" (x4); self-contradicting worked example** |

## Observed failure modes (why this verdict, not just scores)

- **Haiku failed on truth, not prose.** Its prose read fluently and its self-checks all claimed PASS, but 4/6 drafts contained genuine factual errors or invented tax mechanics, exactly the failure mode the gold-standard bar exists to block, and its self-reports were unreliable twice (claimed a passing link count that failed; nonsense self-measured meta lengths).
- **Sonnet behaved like a professional:** zero factual errors across six drafts, quoted colon-bearing YAML correctly without being told (the only arm that did), honestly flagged its own rule overages, and FLAGGED an out-of-HP figure for reviewer decision instead of asserting it.
- **Opus control:** error-free and deepest, justifying its retention for flagships/pillars and judging.

## DECISION (per the pre-agreed criteria, with second-review amendment)

- **Sonnet QUALIFIES, with a recorded nuance.** First round: 83% ship, 0 factual fails, depth 4.33 within 0.5 of control. The second review found one logic slip in one Sonnet draft (an AND/OR conjunction in a summary list that the same draft's body stated correctly). A strict zero-fail reading would revert to Opus-only; the manager ruling is that Sonnet qualifies because (a) the criteria's intent is to screen for systematic factual unreliability, and one conjunction slip across six drafts (~25k words) is categorically different from Haiku's five drafts of fabricated mechanics, (b) at second-review intensity no arm is provably zero-defect (the Opus pension draft was not re-reviewed), and (c) the QA chain, not the writer, is the correctness guarantee, and the chain caught it. User may veto this ruling.
- **Haiku FAILS decisively** (0/6 ship after re-review; 5 factual-fail drafts; depth gap 1.67; unreliable self-checks).
- **Policy: Sonnet writes volume cluster pages for contractors-ir35. Opus writes flagships/pillars where depth-5 matters, judges all waves, and rewrites failures. Haiku is disqualified from content writing (remains the mechanical-task tier: sweeps, greps, map entries, CI edits).**
- Every page still passes the wave QA chain regardless of writer: deterministic validation → blind Opus judging → manager gates. The bake-off changes who drafts, not what ships.

## Process improvements fed back into the wave machinery

1. Brief packet template must show QUOTED YAML values (colon-in-title broke 9/15 drafts' frontmatter; mechanical fix applied centrally; packet amended).
2. `<em>` for case names ruled acceptable house style (packet tag list amended).
3. Self-reported self-checks are advisory only; the deterministic validator is the gate.
4. Out-of-HP-but-true facts: writers must FLAG them (Sonnet's behaviour is the template); judges treat unflagged ones as findings.
