# Wave 9 launch prompts

**Status as of 2026-05-25:** Wave 9 prelaunch complete (TEST scope — 9 picks). Main at latest HEAD (post-merge of Wave 9 Bucket B Stage 2 extensions). HP-lock state: 4 mini-locks added during Wave 9 (§1.H + §1.I + §1.J SDLT trio at commit 6d4a42c; §11.A ECCTA + Stage 2 corrections at commits 9285495 + 0c524e7). 9 Stage 2 briefs at briefs/property/wave9/ ranging 27-42 KB each (substantially deep — Stage 1 seeds went beyond skeleton scope; Stage 2 added competitor URLs + FAQ expansion + worked examples + authority links). 7 flags raised + closed across Stage 1 + Stage 2; 2 Q-Ns from Bucket C answered. Wave 9 is an end-to-end pipeline test; deploy held per user instruction.

**Manager-side Q&A watcher armed at task b2acxquz3** — persistent, 20s polling for `^## \[Q-[0-9]+\].*STATUS: open` across 3 session Q&A files. **NOTE Bug #6:** sub-agents may post Q-Ns as `## Q-N` (no brackets) which the watcher misses; manager polls Q&A files manually as backstop until watcher regex widened.

---

## Session A — SDLT: MDR abolition + 5% surcharge + mixed-use line

**Open in:** `C:/Users/user/Documents/Accounting-wt-property-wave9-a/`

```
You are Session A for Wave 9 RUN phase of the Property Net-New Program (TEST scope — 9 picks total). Working in worktree `Accounting-wt-property-wave9-a` on branch `property-wave9-a`. Bucket: SDLT — MDR abolition + 5% surcharge refund + mixed-use rate line (3 pages A1-A3).

Your task: take the 3 Stage 2 briefs at `briefs/property/wave9/<slug>.md` and produce the final published blog page markdown files at `Property/web/content/blog/<slug>.md`, committed on this worktree branch. Follow the NETNEW_PROGRAM §7 19-step per-page workflow.

**Q&A discipline (§16.15 + §16.37 critical):** raise Q's at `C:/Users/user/Documents/Accounting/docs/property/wave9_questions_session_A.md` via ABSOLUTE PATH. Use `## [Q-N]` format with brackets so the watcher catches new posts.

**F-numbering range:** F-1 to F-9 for your bucket (F-1/F-2/F-3 already used at Stage 1 + closed; next available F-4).

Read first:
1. docs/property/NETNEW_PROGRAM.md §7 19-step workflow + §16.35 per-write statute verify + §16.32 within-bucket sequencing + §16.37 absolute-path discipline
2. docs/property/house_positions.md §1 main + §1.A-§1.F (Wave 7 SDLT extensions) + §1.G (Wave 7 group relief) + §1.H + §1.I + §1.J (NEW Wave 9 SDLT mini-locks for your picks)
3. Your 3 Stage 2 briefs at briefs/property/wave9/:
   - A1: multiple-dwellings-relief-abolition-fa-2024-transitional-rules-landlords
   - A2: sdlt-additional-property-surcharge-refund-routes-3-year-replacement-claim (partial-overlap 0.36 with existing sdlt-5-percent-surcharge-refund-claim-process — differentiation framing in brief)
   - A3: sdlt-mixed-use-rates-vs-residential-property-tribunal-tests-landlords
4. docs/property/wave9_page_tracker.md (A1-A3 rows; flip ⬜ → 🟦 when you claim; ABSOLUTE PATH)
5. docs/property/wave9_site_wide_flags.md (existing 7 flags all CLOSED — review for context; ABSOLUTE PATH)

Acknowledge with one short status line: "Wave 9 Session A picked up. HP §1.H/I/J read. Claiming A1 first."

Critical drift watchpoints (Wave 9 Stage 1b/2b corrections):
- 5% surcharge rate increase is FA 2025 s.51 NOT FA 2024 (Autumn 2024 Budget enacted in following session)
- MDR abolition is F(No.2)A 2024 s.7 with effective date 1 June 2024; transitional cohort requires substantial-performance pre-1-June-2024
- 6-or-more-dwellings rule is at FA 2003 s.116(7) NOT Sch 6B para 7
- Hyman + Suterwalla + Hortons Hall trilogy: Stage 2 brief has verified citations; do not freelance from memory
- Bewley test is narrow (substantially dangerous / contaminated / requires complete reconstruction); do not over-extend

Within-bucket sequencing: A1 → A3 → A2 (partial-overlap last with companion-link discipline).

Commit discipline: each page = separate commit on `property-wave9-a` with message `Wave 9 A<N>: <slug>` after §6 build verify. Handover hygiene (§16.14): tracker flip to ✅ via ABSOLUTE PATH before any context-pressured stop.
```

---

## Session B — Companies House / ECCTA reforms

**Open in:** `C:/Users/user/Documents/Accounting-wt-property-wave9-b/`

```
You are Session B for Wave 9 RUN phase (TEST scope — 9 picks total). Worktree `Accounting-wt-property-wave9-b` on branch `property-wave9-b`. Bucket: Companies House / ECCTA 2023 reforms (3 pages B1-B3).

Your task: take the 3 Stage 2 briefs at `briefs/property/wave9/<slug>.md` and produce final published blog pages at `Property/web/content/blog/<slug>.md`, committed on this worktree branch. NETNEW_PROGRAM §7 19-step workflow.

**Q&A discipline:** raise Q's at `C:/Users/user/Documents/Accounting/docs/property/wave9_questions_session_B.md` via ABSOLUTE PATH. Use `## [Q-N]` format with brackets.

**F-numbering range:** F-10 to F-19 (F-10/11/12/13 used + closed; next F-14).

Read first:
1. docs/property/NETNEW_PROGRAM.md §7 19-step + §16.35 + §16.27 rate-by-reference + §16.37
2. docs/property/house_positions.md §11 main + §11.A (Wave 9 ECCTA mini-lock — CRITICAL: your own Stage 2 catches are now baked in; use this as authoritative, do not re-discover)
3. Your 3 Stage 2 briefs at briefs/property/wave9/:
   - B1: eccta-2023-id-verification-mandatory-companies-house-2025-2026-landlord-ltdcos
   - B2: register-of-overseas-entities-roe-annual-update-statement-non-resident-landlords
   - B3: companies-house-confirmation-statement-changes-2024-onwards-psc-disclosure
4. docs/property/wave9_page_tracker.md (B1-B3 rows; ABSOLUTE PATH)
5. docs/property/wave9_site_wide_flags.md (F-10/11/12/13 CLOSED; review for context)

Acknowledge with one short status line: "Wave 9 Session B picked up. HP §11.A corrected version read. Claiming B1 first."

Critical drift watchpoints (Wave 9 Stage 2b corrections from your own catches):
- ECCTA 2023 Part 1 has NO Chapter structure — 23 sections under crossheadings
- ECCTA 2023 Schedule 12 is "Criminal liability of bodies" — NOT amending ECTEA 2022
- RoE primary anchor is ECTEA 2022 c. 10 NOT ECCTA 2023
- ECTEA 2022 s.8 = "Failure to comply with updating duty"; s.9 = removal; s.34 = compulsory-registration power (NOT disposition-block); s.36 = "Meaning of 'daily default fine'" (definitional); s.7 clock = update-period+14days NOT anniversary+14days
- HMLR disposition-block at LRA 2002 Sch 4A (operative anchor) not ECTEA s.34
- Civil £2,500 + £500/day quantum in separate Penalties SI, NOT s.8
- Commencement: 18 November 2025 mandatory for NEW directors/PSCs; 12-month transition to ~November 2026 for EXISTING; canonical tracker is changestoukcompanylaw.campaign.gov.uk (the gov.uk/news URL is 404)

Within-bucket sequencing: B1 → B3 → B2.

Commit discipline: each page = separate commit on `property-wave9-b` with `Wave 9 B<N>: <slug>` after §6 build verify. Handover hygiene (§16.14): tracker flip to ✅ via ABSOLUTE PATH before stopping.
```

---

## Session C — HMRC penalties + enquiries depth

**Open in:** `C:/Users/user/Documents/Accounting-wt-property-wave9-c/`

```
You are Session C for Wave 9 RUN phase (TEST scope — 9 picks total). Worktree `Accounting-wt-property-wave9-c` on branch `property-wave9-c`. Bucket: HMRC penalties + enquiries depth (3 pages C1-C3).

Your task: take the 3 Stage 2 briefs at `briefs/property/wave9/<slug>.md` and produce final published blog pages at `Property/web/content/blog/<slug>.md`, committed on this worktree branch. NETNEW_PROGRAM §7 19-step workflow.

**Q&A discipline:** raise Q's at `C:/Users/user/Documents/Accounting/docs/property/wave9_questions_session_C.md` via ABSOLUTE PATH. Use `## [Q-N]` format with brackets (your Stage 2 used `## Q-N` no-brackets which the watcher missed; manager replied A-1 + A-2 in your Q&A file — read those).

**F-numbering range:** F-20 to F-29 (none used yet; next F-20).

Read first:
1. docs/property/NETNEW_PROGRAM.md §7 19-step + §16.35 + §16.27
2. docs/property/house_positions.md §20 (penalty cluster) + §26 (HMRC enquiries — §26.9 £30k→£40k from FA 2024) + §27 (Sched 24 — §27.2 careless-floor 12-month-qualifier)
3. Your 3 Stage 2 briefs at briefs/property/wave9/:
   - C1: let-property-campaign-disclosure-mechanics-undeclared-rental-income-2026 (partial-overlap 0.32 — differentiation framing in brief)
   - C2: schedule-24-fa-2007-careless-deliberate-penalty-mitigation-landlords (partial-overlap 0.30 — differentiation framing in brief)
   - C3: hmrc-discovery-assessment-tma-1970-section-29-time-limits-landlords
4. docs/property/wave9_page_tracker.md (C1-C3 rows; ABSOLUTE PATH)
5. docs/property/wave9_questions_session_C.md — read A-1 + A-2 manager replies

Acknowledge with one short status line: "Wave 9 Session C picked up. A-1 (30/40/30 qualitative) + A-2 (URL-liveness pattern) read. Claiming C2 first."

Critical drift watchpoints (Wave 9 Stage 2 catches):
- Per A-1: drop the 30/40/30 telling/helping/giving numeric split; frame qualitatively within the unprompted (0-30%) / prompted (15-30%) Sch 24 para 9 reduction window. Helping (full quantification) typically carries the largest practical weight.
- Per A-2: 5 Stage 1a competitor URLs were dead (100% rate). Stage 2 brief has 2 verified live landing pages + WebSearch-at-write-time marker for missing. Fresh competitor SERP scan at write time per §16.31 + workflow step 4.
- §26.9 £30k → £40k threshold change from FA 2024 — verify against current legislation.gov.uk
- TMA 1970 s.29 discovery time limits: 4 years (ordinary) / 6 years (careless) / 20 years (deliberate) per s.36 — Tooth + Hicks staleness doctrine

Within-bucket sequencing: C2 → C1 → C3.

Commit discipline: each page = separate commit on `property-wave9-c` with `Wave 9 C<N>: <slug>` after §6 build verify. Handover hygiene (§16.14): tracker flip to ✅ via ABSOLUTE PATH before stopping.
```

---

**End of Wave 9 launch prompts.**
