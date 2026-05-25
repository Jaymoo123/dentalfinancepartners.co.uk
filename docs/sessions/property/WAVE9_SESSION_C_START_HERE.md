# Property Wave 9, Session C, start here (VAT operational depth on commercial property)

**You are Session C.** One of three parallel Claude Opus 4.7 sessions writing NET-NEW Property pages from scratch. Your assignment is **VAT operational depth on commercial property** — 9 pages covering option-to-tax (election + revocation + disapplication), TOGC, partial exemption special method, commercial-to-residential 5% reduced rate, self-storage standard-rated carve-out, VAT registration thresholds + group registration, and VAT recovery on professional/capital fees.

This is **Wave 9** of the Property Net-New Program. Waves 1-7 (209 net-new pages) are on `main` already (W1-3 deployed; W4 + W5 + W6 + W7 = 118 pages held pending user decision).

**Bucket C is statute-isolated** — no FA 2025 reform territory; the per-write §16.35 verification load is on rates, thresholds, SI numbers, and form numbers (which drift by Budget and SI amendment). The §29 Wave 9 NEW VAT cluster lock gives you architectural anchors; sessions write the operational depth.

## Q&A discipline (§16.15 + §16.37 CRITICAL — read this first)

When raising a Q to manager, append to `C:/Users/user/Documents/Accounting/docs/property/wave9_questions_session_C.md` via **ABSOLUTE PATH** from your worktree. **NEVER** append to your worktree's relative-path copy. Manager polls main's path only. Same discipline for tracker (`wave9_page_tracker.md`), flags (`wave9_site_wide_flags.md`), discovery (`wave9_discovery_log_session_C.md`).

## Worktree

You run inside `C:/Users/user/Documents/Accounting-wt-property-WAVE9-c/` on branch `property-WAVE9-c`. **Stay inside that worktree.** Sessions A/B are in their own worktrees.

## Read order before touching any code

1. **This file.**
2. **`docs/property/NETNEW_PROGRAM.md`** — §0 norms, §4 brief anatomy, §7 19-step workflow, §16 lessons especially **§16.14 + §16.15 + §16.16 + §16.27 (rate-by-reference for £90k threshold + £88k de-registration + £250k CGS) + §16.32 + §16.35 + §16.36 + §16.37 + §16.45 + §16.46**.
3. **`docs/property/house_positions.md`** — for Session C: **§29** (NEW Wave 9 VAT architectural cluster — the SINGLE primary anchor for all 9 picks). Sub-sections §29.1 (VATA 1994 overview with Stage 2b corrections on s.26B drop + Sch 7A Group 7 reframe), §29.2 (Sch 9 Gr 1 + 14 carve-outs incl para (ka) self-storage standard-rated), §29.3 (Sch 10 option-to-tax + form numbers), §29.4 (TOGC), §29.5 (CGS — SI 1995/2518 Part XV regs 112-116), §29.6 (partial exemption with Stage 2b SI 2002/1074 reg 107A inserting cite correction), §29.7 (reduced rate 5%), §29.8 (registration thresholds).
4. **Your assigned briefs** at `briefs/property/WAVE9/*.md`.
5. **`docs/property/wave9_page_tracker.md`** — your C1-C10 rows (C4 dropped; 9 picks).

## Bucket-specific authorities

VATA 1994 c. 23: s.1 (charge); s.4 (scope); ss.26B (Flat-Rate Scheme — NOT CGS, despite earlier mis-cite); ss.43-43D (group registration); s.29A + Sch 7A Group 6 (residential conversions 5%) + Group 7 (empty-homes 2-year-vacancy renovation relief — NOT changed-number-of-dwellings); s.30 + Sch 8 (zero rates); s.31 + Sch 9 Gr 1 (exempt land + 14 carve-outs incl para (ka) self-storage inserted by FA 2012 Sch 26 paras 5(2)+7(1) effective 1 October 2012); s.49 (TOGC); Sch 10 (option-to-tax — paras 2 election, 5 dwelling automatic disapplication, 6 recipient certification VAT 1614D, 12 "developers of exempt land" anti-avoidance, 21 real estate election, 23 cooling-off revocation, 25 20-year revocation, 28-30 prior permission); Sch 1 para 1(1)(a) (registration threshold £90k from 1 April 2024 per SI 2024/307). SI 1995/1268 reg 5 (TOGC conditions). SI 1995/2518 Part XV regs 112-116 (CGS — £250k + 10-year adjustment); regs 99-110 (partial exemption — standard method 101, special method 102 + HMRC direction 102B, override 107A inserted SI 2002/1074, de minimis 106). HMRC manuals: VATLP (Land + Property), Notice 706 (partial exemption), 700/9 (TOGC), 742 + 742A (land + option to tax), 708 (buildings + construction), 706/2 (CGS). VAT form series 1614A-1614J.

## CRITICAL drift watchpoints (Wave 9 prep surfaced 51 catches — 7 directly Bucket C; read all before writing)

1. **VATA 1994 s.26B is Flat-Rate Scheme** (NOT CGS). CGS lives entirely in SI 1995/2518 Part XV regs 112-116 with enabling powers elsewhere in VATA 1994. Earlier HP framing was wrong — Stage 2b correction.
2. **Sch 7A Group 7 is "Renovation or alteration of qualifying residential premises"** (empty-homes 2-year-vacancy relief), NOT "changed number of dwellings". Changed-number-of-dwellings is a Group 6 conversion sub-category.
3. **Reg 107A standard-method override was inserted by SI 2002/1074** (effective 18 April 2002), NOT SI 2002/1142 as earlier locked.
4. **Self-storage is STANDARD-RATED, not exempt**, since 1 October 2012 via Sch 9 Gr 1 Item 1 para (ka) inserted by FA 2012 Sch 26 paras 5(2)+7(1). Competitor pages still framing self-storage as "exempt land supply" are pre-FA-2012-Sch-26 stale — C8 must front the carve-out explicitly.
5. **Sch 10 para 12 is "Developers of exempt land" anti-avoidance** (caught: developer + grant to connected party + recipient intends mixed-use). Dwelling disapplication is paras 5 (automatic per "designed or adapted as dwelling") + 6 (recipient-certified VAT 1614D). All three paragraphs distinct — C7 covers all three.
6. **CGS threshold £250k + 10-year adjustment** for land + buildings. NOT 5-year (5-year applies to capital goods other than land per SI 1995/2518 reg 113).
7. **VAT registration threshold £90k from 1 April 2024** (up from £85k); de-registration £88k. Per §16.27 rate-by-reference — verify against gov.uk at write time.

## Your 9 assigned briefs (C4 dropped at cannib audit)

Within-bucket sequencing: **C1 PILLAR option-to-tax first** (C2 + C7 reference); C2 (revocation) + C7 (disapplication paras 5+6+12) build on C1; C3 TOGC cross-references C1 option-matching rule; C5 (partial exemption SPECIAL method) + C10 (input-tax recovery) cluster on recovery mechanics; C6 + C8 + C9 independent sub-topic depth.

| Pos | Slug | Brief at |
|---|---|---|
| C1 | `option-to-tax-vata-1994-schedule-10-commercial-property-20-year-lock` (PILLAR) | briefs/property/WAVE9/ |
| C2 | `option-to-tax-revocation-routes-6-month-cooling-off-20-year-exit-landlords` | briefs/property/WAVE9/ |
| C3 | `transfer-of-going-concern-togc-commercial-property-option-matching-vat-free` | briefs/property/WAVE9/ |
| C5 | `vat-partial-exemption-special-method-approval-landlords-standard-method-override-mechanics` | briefs/property/WAVE9/ |
| C6 | `vat-commercial-to-residential-conversion-5-percent-reduced-rate-developer-recovery-mechanics` | briefs/property/WAVE9/ |
| C7 | `disapplication-option-to-tax-schedule-10-paragraph-12-residential-conversion` | briefs/property/WAVE9/ |
| C8 | `vat-storage-facility-lettings-schedule-9-group-1-supply-categorisation-landlords` | briefs/property/WAVE9/ |
| C9 | `vat-registration-threshold-90k-landlords-april-2024-group-registration` | briefs/property/WAVE9/ |
| C10 | `landlord-vat-recovery-professional-fees-capital-costs-commercial-property` | briefs/property/WAVE9/ |

## Per-page workflow (canonical in each brief)

Same 19-step workflow as Buckets A + B — tracker claim → competitor fetch → existing-page read → outline → §16.35 per-write statute verification (CRITICAL for SI numbers + form numbers + thresholds in VAT territory) → image → write → build → commit → tracker flip → discovery + flags. ABSOLUTE PATH per §16.37.

**Critical handover hygiene (§16.14):** flip tracker before stopping. **Anti-templating:** 9 pages cannot read like 9 variants; self-check after page 3.


**F-numbering range (Bug #2 fix - prevents cross-session F-number collisions like Wave 8 F-4 dupe):** when raising flags in this session's bucket, use F-numbers in the range **F-20 to F-29** ONLY. Do not use F-numbers outside this range even if the next available number sequentially appears free.
