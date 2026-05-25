# Property Wave 9, Session A, start here (FIG / non-dom IHT / leaving-UK depth)

**You are Session A.** One of three parallel Claude Opus 4.7 sessions writing NET-NEW Property pages from scratch. Your assignment is **FIG regime + non-dom IHT + leaving-UK depth** — 10 pages covering the post-FA-2025 reform territory: the 4-year Foreign Income and Gains regime (ITTOIA 2005 ss.845A-J inserted by FA 2025 s.37), the Temporary Repatriation Facility (FA 2025 s.41 + Sch 10), CGT rebasing (FA 2025 s.42 + Sch 11), the IHT long-term-resident test (IHTA 1984 ss.6A-6C inserted by FA 2025 Sch 13), and excluded-property + spouse-exemption operational depth + returning-to-UK + s.10A interaction.

This is **Wave 9** of the Property Net-New Program. Waves 1-7 (209 net-new pages) are on `main` already (W1-3 deployed; W4 + W5 + W6 + W7 = 118 pages held pending user decision).

## Q&A discipline (§16.15 + §16.37 CRITICAL — read this first)

When raising a Q to manager, append to `C:/Users/user/Documents/Accounting/docs/property/wave9_questions_session_A.md` via **ABSOLUTE PATH** from your worktree. **NEVER** append to your worktree's relative-path copy. Manager polls main's path only. Same discipline for tracker (`wave9_page_tracker.md`), flags (`wave9_site_wide_flags.md`), discovery (`wave9_discovery_log_session_A.md`). Waves 6 + 7 held this discipline with zero violations; Wave 9 must preserve.

## Worktree

You run inside `C:/Users/user/Documents/Accounting-wt-property-WAVE9-a/` on branch `property-WAVE9-a`. **Stay inside that worktree.** Sessions B/C are in their own worktrees; you will never collide.

## Read order before touching any code

1. **This file.**
2. **`docs/property/NETNEW_PROGRAM.md`** — §0 norms, §4 brief anatomy, §7 19-step workflow, §8.4 session-side watcher, §11 reasoning-first, §13 manager instructions, §16 lessons especially **§16.14 tracker hygiene**, **§16.15 + §16.37 Q&A absolute-path**, **§16.16 word count**, **§16.27 + §16.30 + §16.35 Bill-vs-enacted-Act drift mandatory per-write verification**, **§16.32 cross-bucket sequencing**, **§16.36 statutory cross-check gate**, **§16.40 + §16.42 territory-novelty drift density**, **§16.45 + §16.46 manager-side prep maturation + drift density at HP-lock**.
3. **`docs/property/house_positions.md`** — for Session A: **§17** (full expat cluster Wave 2 lock plus §17.8 FIG depth + §17.9 TRF mechanics + §17.10 CGT rebasing — all Wave 9 mini-locks) + **§15.6** (IHT LTR headline) + **§22.5** (spouse exemption refresh — SPOUSAL s.267ZC not generic) + **§22.X** (NEW IHT LTR operational depth — full cluster Wave 9) + **§16** (DTAs for dual-residence tie-breakers).
4. **Your assigned briefs** at `briefs/property/WAVE9/*.md` per the table below.
5. **`docs/property/wave9_page_tracker.md`** — your A1-A10 rows.

## Bucket-specific authorities

Finance Act 2025 c. 8 (ss.37 FIG, 40 RB abolition, 41 TRF, 42 rebasing, 44 s.6 IHTA LTR substitution, Sch 8 employment income, Sch 10 TRF detail, Sch 11 rebasing detail, Sch 13 IHT residence reforms inserting IHTA ss.6A-6C + ss.267ZC-267ZF). ITTOIA 2005 Chapter 5 ss.845A-845J (FIG regime detail). IHTA 1984 s.6 (excluded property, LTR-based post-FA-2025), s.6A (LTR test), s.6B (young-person variation), s.18 (spouse exemption, LTR-based), Sch 1 Table (NRB by-reference for s.18(2A)), Sch A1 (enveloped UK residential property), ss.267ZA + 267ZC-267ZF (SPOUSAL elections — BOTH require spousal connection). TCGA 1992 s.1A + Schs 1A/1B/4AA (NRCGT — backstop for UK land), s.10A (5-year temporary non-residence). FA 2013 Sch 45 (SRT). ITA 2007 ss.809B (RB claim, historic), 809D (auto-RB), 809E (small-foreign-income).

## CRITICAL drift watchpoints (51 catches surfaced through Wave 9 prep — read all 11 below before writing)

1. **IHTA s.267 (deemed domicile) OMITTED by FA 2025** effective 6 April 2025 — do NOT cite s.267 in post-FA-2025 content; use s.6A LTR test.
2. **s.267ZC is SPOUSAL LTR election (NOT generic)** — Conditions A + B both require spouse/civil-partner LTR connection within 7-year window. No freestanding "any non-LTR can elect LTR" route exists. s.267ZA is also SPOUSAL with the spousal-connection cutoff being "before 6 April 2025" (no automatic repeal date on s.267ZA itself).
3. **IHT LTR test (s.6A) is 10-of-20 single test** — HP §15.6 + §22.X.1 present as "10 consecutive OR 10 of 20" but 10 consecutive trivially satisfies 10 of 20; statute is single-route. Tail-period to LOSE LTR scales 3-10 years per s.6A table (NOT flat 3-year deemed-domicile tail).
4. **s.18(2) IHTA limit is by-reference to Sch 1 NRB** (currently £325k cumulative lifetime) per s.18(2A); do NOT hard-code £325k — rate-by-reference discipline per §16.27 (parallel to s.455 / ITA 2007 s.8(2)).
5. **FIG regime is in FA 2025 s.37 + ITTOIA 2005 ss.845A-J** — NOT FA 2025 Sch 9 (Sch 9 removes historic remittance basis architecture; does NOT contain FIG regime).
6. **FIG qualifying conditions are FOUR per s.845B(1)** — (a) UK-resident current year; (b) NOT UK-resident any of prior 10 years; (c) not disqualified per s.845B(2); (d) **age-floor: at least 10 years old at commencement of tax year** (HP §17.8 Stage 2b correction — earlier 2-condition framing incomplete).
7. **FIG claim deadline is s.845A's OWN 12-month-from-31-January-following-tax-year deadline** — NOT TMA 1970 s.43 4-year amendment window (s.43 is return-amendment not claim-creation). Late claims forfeit the year's relief.
8. **TRF qualifying overseas capital has THREE scenarios per Sch 10 para 2** — Scenario A (para 2(2) unremitted at designation); Scenario B (para 2(5) in-window remittance 2025-28); Scenario C (para 2(8) pre-6-April-2025 capital held outside UK + continuously). Earlier 2-scenario framing missed Scenario C.
9. **TRF rates verified: 12% (2025-26), 12% (2026-27), 15% (2027-28)** — designation deadline = 12 months from 31 January following tax year end.
10. **CGT rebasing FA 2025 Sch 11 has FIVE eligibility conditions** (not four — Stage 2b heading-count correction): asset held 5 April 2017 + disposal on/after 6 April 2025 + asset NOT in UK between 6 March 2024 and 5 April 2025 + non-dom pre-2025-26 + ACTIVE s.809B claim in 2017-18 to 2024-25. **UK property EXCLUDED** by condition (3) — most departing landlords cannot use rebasing for UK land.
11. **TCGA 1992 s.10A is 5-year window** (not 4) — temporary non-residence rule; interacts with FIG: post-FIG returnee within 5 years of departure faces s.10A recapture on disposals during non-residence period.

The §16.45 + §16.46 pattern: 51 substantive drift catches surfaced through HP-lock + Stage 1a + Stage 1b + Stage 2. Stage 2 verification on every numeric figure, every statutory section identity, and every commencement date MUST run before commit.

## Your 10 assigned briefs

Within-bucket sequencing: **A7 LTR-test pillar first** (A8 + A9 build on s.6A architecture); A1-A3 FIG cluster (A1 pillar then A2 → A3); A4-A5 TRF cluster (A4 pillar then A5); A6 standalone CGT rebasing; **A10 LAST** (references A7 LTR + A1 FIG + §17.3 s.10A).

| Pos | Slug | Brief at |
|---|---|---|
| A1 | `fig-regime-qualifying-new-resident-10-year-non-residence-test-landlords` | briefs/property/WAVE9/ |
| A2 | `fig-election-mechanics-per-year-claim-personal-allowance-cgt-aea-cost` | briefs/property/WAVE9/ |
| A3 | `fig-year-5-cliff-post-fig-arising-basis-planning-non-doms-landlords` | briefs/property/WAVE9/ |
| A4 | `temporary-repatriation-facility-trf-designation-mechanics-12-15-percent-rates` | briefs/property/WAVE9/ |
| A5 | `trf-qualifying-overseas-capital-what-can-be-designated-non-doms` | briefs/property/WAVE9/ |
| A6 | `cgt-rebasing-election-fa-2025-schedule-11-narrow-eligibility-non-doms` | briefs/property/WAVE9/ |
| A7 | `iht-long-term-resident-test-section-6a-tail-period-table-landlords` | briefs/property/WAVE9/ |
| A8 | `excluded-property-trust-long-term-resident-settlor-pivot-landlords` | briefs/property/WAVE9/ |
| A9 | `iht-spouse-exemption-long-term-resident-section-18-section-267zc-election` | briefs/property/WAVE9/ |
| A10 | `returning-to-uk-after-non-residence-section-10a-recapture-fig-eligibility` | briefs/property/WAVE9/ |

## Per-page workflow (canonical in each brief; summary)

1. Read house positions (once at session start — §17 + §22 + §22.X above tell you which sections).
2. Claim ONE page in tracker (todo → in_progress + UTC timestamp; ABSOLUTE PATH).
3. Read the brief.
4. Fetch + read each competitor URL (httpx + BeautifulSoup).
5. Read closest-existing pages on our site (cannib context already audited; no covered cases).
6. Plan H2/H3 outline + meta + FAQs + CTA placements (vary per page; anti-templating discipline).
7. **Verify factual claims against authorities. Per §16.35, WebFetch gov.uk / legislation.gov.uk for every numeric figure + statutory section identity + commencement date before committing.**
8. Fetch hero image from Pexels.
9. Write the markdown file at `Property/web/content/blog/<slug>.md`.
10-16. Build / test / commit (full sequence in brief).
17. Flip tracker row to ✅ done (ABSOLUTE PATH).
18-19. Discovery log + flag any cross-bucket / EXISTING_PAGE issues (ABSOLUTE PATH).

**Critical handover hygiene (§16.14):** if context-pressured, FLIP THE TRACKER FIRST before stopping.

**Critical anti-templating discipline:** 10 pages cannot read like 10 versions of the same page. Stop after page 3 and self-check; report any templating drift via flag.


**F-numbering range (Bug #2 fix - prevents cross-session F-number collisions like Wave 8 F-4 dupe):** when raising flags in this session's bucket, use F-numbers in the range **F-1 to F-9** ONLY. Do not use F-numbers outside this range even if the next available number sequentially appears free.
