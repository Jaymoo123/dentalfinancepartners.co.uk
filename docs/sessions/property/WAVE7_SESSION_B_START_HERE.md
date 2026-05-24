# Property Wave 7, Session B, start here (HMRC enquiry + tax compliance ops)

**You are Session B.** One of three parallel Claude Opus 4.7 sessions writing NET-NEW Property pages from scratch. Your assignment is **HMRC enquiry + tax compliance ops** — 10 pages covering discovery assessment time limits, closure notice mechanics, CoP9 contractual disclosure, tribunal appeals, HMRC nudge letter response, Let Property Campaign, Worldwide Disclosure Facility + FtC, Sch 24 FA 2007 penalty behaviour categories, reasonable-excuse case law, and record retention.

This is **Wave 7** of the Property Net-New Program. Waves 1-6 (181 net-new pages) are on `main` (W1-3 deployed; W4 + W5 + W6 held).

## Q&A discipline (§16.15 + §16.37 CRITICAL — read this first)

When raising a Q to manager, append to `C:/Users/user/Documents/Accounting/docs/property/wave7_questions_session_B.md` via **ABSOLUTE PATH** from your worktree. NEVER append to your worktree's relative-path copy. Same discipline for tracker, flags, discovery — all absolute-path to main.

## Worktree

You run inside `C:/Users/user/Documents/Accounting-wt-property-wave7-b/` on branch `property-wave7-b`. Stay inside that worktree.

## Read order

1. **This file.**
2. **`docs/property/NETNEW_PROGRAM.md`** — §0 norms, §4 brief anatomy, §7 19-step workflow, §8 Q&A, §13 manager instructions, §16 lessons (esp §16.14/§16.15/§16.16/§16.17/§16.27/§16.30/§16.32/§16.35/§16.36/§16.37/§16.40/§16.42/§16.45).
3. **`docs/property/house_positions.md`** — for Wave 7 Session B: **§27** (HMRC enquiry mechanics, your primary cluster — §27.1 through §27.9) plus **§19** (MTD penalty regime — Sch 56/55 adjacent to Sch 24/41) plus **§22.16** (TRS penalty regime — adjacent to §27 for trust-side disclosure routes).
4. **Your assigned briefs** at `briefs/property/wave7/*.md`.
5. **`docs/property/wave7_page_tracker.md`** — your B1-B10 rows.

## Bucket-specific authorities

TMA 1970 (s.7 notification, s.9A enquiry, s.12B records, s.28A closure, s.29 discovery, s.31A appeal, s.34 4-yr, s.36 + s.36A FA 2019 extended limits, s.43 claim limit); Finance Act 2007 Schedule 24 (inaccuracy penalties + para 4A offshore uplift); Finance Act 2008 Schedule 41 (failure-to-notify + Cat 1/2/3 territories); FA 2015 Sch 21 (asset-move penalty); FA 2017 Sch 18 (Requirement to Correct / Failure-to-Correct); Tribunals, Courts and Enforcement Act 2007 + Tribunal Procedure (First-tier Tribunal) (Tax Chamber) Rules 2009 (SI 2009/273); Companies Act 2006 s.388 (company records 6-yr); ITTOIA 2005 s.272 + Property Income Manual. HMRC: CH80000+ (penalties), CH71000+ (failure-to-notify), CH51000+ (discovery), EM3270+ (enquiry), EM6000+ (CoP9/CDF), ARTG2000+ (appeals + tribunals), SAM50000+ (records), Let Property Campaign + Worldwide Disclosure Facility published guidance. Case law: Perrin v HMRC [2018] UKUT 156 (reasonable excuse four-stage); HMRC v Tooth [2021] UKSC 17 (deliberate test); Martland v HMRC [2018] UKUT 178 (late-appeal framework); Veltema / Sanderson (s.29(5) competent officer).

## CRITICAL drift catches inherited from Wave 7 HP-lock + §16.45 (13 catches; read before writing)

**Read all 13 in §16.45 of NETNEW_PROGRAM.** Operationally critical for Bucket B:

1. **FOUR distinct discovery time limits — distinguish carefully.** s.34 ordinary 4-yr / s.36(1) careless 6-yr / s.36(1A) deliberate 20-yr / **s.36A FA 2019 offshore 12-yr innocent-error** (the offshore 12-yr is the no-behaviour extension; do NOT collapse into careless or deliberate brackets). B1 spotlight.
2. **Closure-notice appeal window is 30 DAYS under TMA 1970 s.31A** — NOT 60 days. Late appeals require Martland framework (reasonable excuse). B2 spotlight.
3. **Sch 24 FA 2007 standard maxima are 30%/70%/100%** (careless/deliberate/deliberate-concealed) with mitigation floors **0%/20%/30% unprompted within 12 months** + **15%/35%/50% prompted**. Offshore para 4A uplift: Cat 2 (1.5x) + Cat 3 (2x) up to **200%** max. B8 spotlight.
4. **TMA 1970 s.12B retention: 5 years from 31 January following tax year for income tax** (not 6-year); 6-year for corporation tax under CA 2006 s.388. PTP standing recommendation: 7-year practical floor (one year above s.12B statutory minimum). B10 must distinguish IT vs CT vs PTP-practical floors.
5. **CoP9 is HMRC-initiated civil-fraud investigation track — NOT a landlord-friendly voluntary-disclosure route.** Distinguish HMRC-initiated CoP9 from taxpayer-requested CDF. Immunity scope is limited to matters disclosed. B3 framing.
6. **FtC FA 2017 Sch 18 deadline was 30 September 2018 — NOT extended.** Post-deadline disclosure attracts 200% (unprompted) / 100% (otherwise) penalty under Sch 18 para 4. WDF disclosures post-deadline operate within FtC framework. B7 framing.
7. **Perrin v HMRC [2018] UKUT 156 is the controlling Upper Tribunal four-stage reasonable-excuse test.** Sch 41 para 20 + Sch 24 para 14 are the statutory hooks. B9 spotlight.
8. **TRS penalty £5,000 max DISCRETIONARY not graduated** — common myth in commentary; cite TRSM80020 verbatim. Adjacent to §27 but locked at §22.16; B10 voluntary-disclosure decision-tree may cross-reference.

The pattern: 13 drift catches at HP-lock stage alone. Stage 2 §16.36 verification on every statutory section identity + percentage figure before commit.

## Per-page workflow (canonical version in each brief; summary)

[Same 19-step workflow as Session A — see §7 of NETNEW_PROGRAM.]

## Sequencing constraints (§16.32 within-bucket priorities for Session B)

1. **B8 ships FIRST in Bucket B.** B8 (Sch 24 FA 2007 penalty behaviour categories) is the penalty-matrix reference page; B5 (nudge letter response) + B6 (LPC) + B7 (WDF) + B10 (record retention + voluntary disclosure decision-tree) all cite B8's penalty matrix. Write B8 early; the bucket flows from B8 outward.
2. **B1 → B7 (offshore framework dependency).** B1 covers the four discovery time limits including s.36A FA 2019 offshore 12-year. B7 (WDF + FtC) cites B1 for the offshore-discovery framework. Ship B1 before B7.
3. **B2/B3/B4/B9/B10 ship independently.** B2 closure notice + B3 CoP9 + B4 FTT + B9 reasonable excuse have no strict within-bucket order. Take in any sequence.

**No strict cross-bucket dependencies for Bucket B** — your bucket is operationally isolated from A (regulatory) and C (specialist trust/SDLT).

## Universal rules (non-negotiable)

[Same as Session A — voice, lead-gen, FAQs, anti-templating, house positions, quality bar.]

### House positions
- For Wave 7 Session B: §27 (HMRC enquiry mechanics, primary) + §19 (MTD penalty regime adjacent) + §22.16 (TRS penalty regime for trust-side cross-references).
- If a competitor source contradicts a locked house position, the house position wins. Flag in `wave7_site_wide_flags.md`.

## Q&A channel + session-side watcher

[Same as Session A — append to `wave7_questions_session_B.md` via absolute path, spawn watcher per §8.4.]

## Your Session B pages (10 assigned)

Claim ONE at a time. Within-bucket priorities marked in notes.

| # | Slug | Notes |
|---|---|---|
| B1 | `discovery-assessment-time-limits-landlord-tax-enquiries-tma-1970-s29` | FOUR distinct limits per §27.1; cited by B7 |
| B2 | `hmrc-closure-notice-mechanics-landlord-enquiries-tma-1970-s28a` | s.28A(4) tribunal lever; 30-day appeal under s.31A |
| B3 | `cop9-contractual-disclosure-facility-landlord-tax-fraud-investigation` | NOT a voluntary disclosure route; HMRC-initiated civil-fraud track |
| B4 | `tribunal-appeal-process-landlords-first-tier-tribunal-tax-chamber` | FTT under TCEA 2007 + SI 2009/273; ADR alongside |
| B5 | `hmrc-nudge-letter-response-playbook-landlords-property-income` | References B8's penalty matrix |
| B6 | `let-property-campaign-formal-disclosure-route-landlords-undisclosed-rental` | Residential rental only; 90-day disclosure; references B8 |
| B7 | `worldwide-disclosure-facility-offshore-landlord-catch-up-fa-2017-ftc` | FtC overlay; references B1 framework + B8 matrix |
| B8 | `schedule-24-fa-2007-penalty-behaviour-categories-landlord-enquiries` | **SHIPS FIRST**; penalty-matrix anchor |
| B9 | `reasonable-excuse-case-law-landlord-penalties-perrin-martland` | Perrin four-stage; Martland late-appeal |
| B10 | `record-retention-discipline-voluntary-disclosure-failure-to-notify-landlords` | 5-yr IT / 6-yr CT / 7-yr PTP; LPC/WDF/DDS decision-tree |

## Continuation prompt boilerplate (read before stopping)

[Same as Session A.]

## When done with all 10

Update summary at top of `wave7_page_tracker.md` (absolute path). Append `[SESSION_B_COMPLETE]` to `wave7_site_wide_flags.md`.

Begin with **B8** per the within-bucket priority (penalty matrix is the reference for B5/B6/B7/B10).
