# Track A factual QA: ir35-contract-review

Site: contractors-ir35. Page: `docs/contractors-ir35/_wave1/ir35-contract-review.json`.
Reviewed 2026-09-27 against `docs/contractors-ir35/house_positions.md` (HP) and, where HP is
silent, primary law on legislation.gov.uk. Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md`
section 13, S4a, "QA".

## Assertions

| # | Where | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | intro | Where the client is medium or large, the client decides status | HP §1 | CORRECT |
| 2 | intro | Reasonable care and a 45-day disagreement route apply on that path | HP §3 | CORRECT |
| 3 | intro | A review reads the contract, the upper-level agreement and the working practices | HP §17.B, §17.D | CORRECT |
| 4 | stats 1 | Irreducible minimum = 3 tests: personal service, control, mutuality | HP §2 (locked wording) | CORRECT (HP §2 is the tie-breaker; note the RMC third limb is framed in the HP verification log as "terms consistent with a contract of service", HP §2 states MOO, page follows §2) |
| 5 | stats 2 | 45 days for the client to respond, ITEPA s.61T | HP §3, ITEPA 2003 s.61T | CORRECT |
| 6 | stats 3 | 6 Apr 2027 = earliest a previously medium client leaves the rules | HP §1.A | CORRECT |
| 7 | stats 4 | PGMOL [2024] UKSC 29, the Supreme Court's latest word on status | HP §2, verification log (16 Sep 2024) | CORRECT |
| 8 | ch.1 | No statutory definition of employment for tax | HP §2 | CORRECT |
| 9 | ch.1 | Ready Mixed Concrete [1968] 2 QB 497 | HP §2 | CORRECT |
| 10 | ch.1 | Personal service / substitution, control (what, how, when, where), MOO (offer and accept paid work) | HP §2 | CORRECT |
| 11 | ch.1 | PGMOL confirmed control and MOO can both be present and still not settle it | HP §2 ("necessary but not sufficient") | CORRECT |
| 12 | ch.1 | The whole picture governs; "in business on own account" | HP §2, Atholl House | CORRECT |
| 13 | ch.2 | HMRC and tribunals judge working practices, not just the clauses | HP §17.B, §17.D | CORRECT |
| 14 | ch.2 | A substitution clause nobody could use carries no weight | HP §2 (fettered/sham clause) | CORRECT |
| 15 | ch.3 | Two regimes; medium/large = off-payroll, client issues the SDS | HP §1 | CORRECT |
| 16 | ch.3 | Fee payer, usually the agency nearest the PSC, operates PAYE before paying the company | HP §1, §4 (s.61N) | CORRECT (source added, see edit 2) |
| 17 | ch.3 | Small client, or wholly overseas with no UK connection, leaves the original rules with the PSC | HP §1, §1.A | CORRECT |
| 18 | ch.3 | Small-company thresholds rose for financial years beginning on or after 6 April 2025 | HP §1.A, CA 2006 s.382 | CORRECT |
| 19 | ch.3 | Filing lag + two consecutive years = 6 April 2027 earliest exit; assume in scope for 2026/27 | HP §1.A | CORRECT |
| 20 | ch.4 | SDS needs a conclusion, reasons and reasonable care, and must reach the worker and the next party | HP §3, ITEPA s.61NA | CORRECT |
| 21 | ch.4 | Blanket inside call with no individual assessment is very likely a failure of reasonable care | HP §17.E, §3 | CORRECT |
| 22 | ch.4 | Failure of reasonable care can invalidate the SDS and leave the liability with the client | HP §3 | CORRECT |
| 23 | ch.4 | Representations go through the client-led process; client has 45 days | HP §3 | CORRECT |
| 24 | ch.4 | Timetable is in the SDS guide | `sds-status-determination-statement.md` has "A worked timeline" | CORRECT |
| 25 | ch.5 | No guarantee; status decided on the facts of the engagement as it runs | HP §17.A, §17.B | CORRECT (no outcome is promised anywhere on the page) |
| 26 | ch.5 | HMRC backs a CEST result where inputs are accurate and match the working practices; not binding on a tribunal; MOO narrower than the case law | HP §2, §17.A | CORRECT (two of HP's four stand-behind conditions here; the other two, "in line with the guidance" and "no avoidance", are stated in FAQ 2, so the page carries the full stance) |
| 27 | hw.1 | Upper-level agreement can contradict the lower contract | HP §17.B | CORRECT |
| 28 | hw.4 | "What each route costs you" is covered in the challenge post | That post is a five-step how-to with no cost section; the cost section is in the SDS post | WRONG, fixed (edit 1) |
| 29 | hw.5 | The IR35 status indicator walks the same tests, a screen not a determination | `src/lib/calculators/tools/ir35-status-indicator.ts`, registered in `registry.ts`; HP §17.A | CORRECT |
| 30 | faq 1 | No guarantee; multi-factorial; only a tribunal settles it finally | HP §2, §17.A | CORRECT |
| 31 | faq 2 | CEST stand-behind conditions in full (accurate, consistent with working practices, in line with guidance, no avoidance); does not bind a tribunal; MOO narrower | HP §17.A verbatim stance | CORRECT |
| 32 | faq 3 | Small client, or wholly overseas with no UK connection = PSC self-assesses; public body is in Chapter 10 | HP §1, §1.A | CORRECT |
| 33 | faq 3 | "Small" under the Companies Act tests | HP §1.A (CA 2006 s.382 via ITEPA s.60A) | CORRECT |
| 34 | faq 5 | Client must respond within 45 days, confirming with reasons or issuing a new statement | HP §3 | CORRECT |
| 35 | meta | metaTitle 49 chars, metaDescription 143 chars | spec S4a (≤ 60 / ≤ 160) | CORRECT |

No em-dashes. No pricing, no named people, no firm claims, no "we advise". No outcome of a
review is promised: the page disclaims a guarantee in challenge 5 and again in FAQ 1.

### Internal links, all verified on disk

- `/blog/ir35-status/ir35-status-tests-explained` -> `contractors-ir35/web/content/blog/ir35-status-tests-explained.md`, category "IR35 Status" -> `ir35-status`. OK
- `/blog/ir35-status/sds-status-determination-statement` OK
- `/blog/ir35-status/challenge-ir35-determination-sds` OK
- `/blog/ir35-status/ir35-contract-review-checklist` OK
- `/calculators/ir35-status-indicator` -> `src/lib/calculators/tools/ir35-status-indicator.ts`, imported in `src/lib/calculators/registry.ts`. OK

### Sources array coverage

Covers HP §1, §1.A, §2, §3, §17 and the two primary-law URLs the page relies on. One gap
found (fee-payer PAYE, HP §4) and closed. One inaccuracy found (the array listed
`substitution-clause-ir35` as a verified link, but the page does not link to it) and removed.

## Edit log

1. `howWeHelp[3].body`: "What each route costs you is covered in" -> "The step by step route is
   covered in". Reason: the linked post `challenge-ir35-determination-sds.md` has no cost
   section (its H2s are the five steps, the 45-day process and the mechanics summary); the cost
   section lives in `sds-status-determination-statement.md`. One-clause fix, word-neutral.
2. `sources[2]`: "house_positions.md 1 and 1.A" -> "house_positions.md 1, 1.A and 4", adding the
   fee-payer / s.61N hook that challenge 3 relies on. Reason: uncited assertion, source exists.
3. `sources[6]`: removed `substitution-clause-ir35` from the "verified on disk" link list. Reason:
   the page does not link to it, so the claim was inaccurate.

3 edits. No figure, rate, threshold or date was changed: none was wrong. No items removed for
being unsourced. JSON re-parsed clean after the edits. Word count 1,199 (intro, challenge and
howWeHelp titles and bodies, FAQ questions and answers, anchor markup stripped), inside the
800 to 1,200 band but with one word of headroom, so any later addition must be offset.

VERDICT: PASS
