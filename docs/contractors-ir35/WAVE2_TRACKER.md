# Wave 2 tracker (35 money-map pages), contractors-ir35

Opened and content-CLOSED 2026-06-12. **PAUSED by user before the final bookkeeping step** — see "Resume checklist" below and in `STATE.md`.

Slice source: `MONEY_KEYWORDS.md` §3 (LOCKED). 5 Opus pillars (#1-5) + 30 Sonnet clusters, per the model-tiering policy and the wave-1 bake-off (`BAKEOFF_2026-06.md`).

## Pipeline record

| Stage | Result |
|---|---|
| Writing | 35/35 written. An API socket cascade killed 15 writers mid-wave; all relaunched successfully (replace-partial-file instructions). Writer self-checks again proved unreliable in both directions; the deterministic validator is the gate. |
| Deterministic validation | Caught: stray `</faqs>` tags breaking YAML in 8 files, slug-style `category:` values in 5 files, wrong link category-paths in #18, FAQ overage in #11. All fixed mechanically pre-judging. |
| Judging (cost lever 2: 7 Sonnet judges x 5 drafts, recompute-all-arithmetic rubric) | 22 SHIP / 13 NO-SHIP first pass. NO-SHIP causes: arithmetic errors (#9 PA double-count, #19 four numeric errors, #20 worked-example span, #32 NIC off ~2.4x, #31 19% CT on £100k), fabricated mechanic (#10 contractor-side 45-day deadline), wrong statutes (#25 ITTOIA s.34-for-company, ITEPA ss.337-339-for-necessarily), HP-reference leaks (#26, #33, #10), levy £3,000-for-£3m typo (#35), allowance-history error (#18), duplicate paragraph (#21), missing frontmatter field (#14). |
| FLAG web-verification (Sonnet + gov.uk primaries) | 23 flags resolved: 14 confirmed, 5 figure insertions (AIA £1m, WFH £6/wk + simplified bands, AE £6,240, levy precision), 1 WRONG (council tax excluded from employee-route home-office calc, EIM32815) + material catch: employee s.336 deduction route closed 6 Apr 2026 (EIM32759), pages must frame employer reimbursement. |
| Repairs | 2 Opus agents (5 heavy rebuilds w/ full arithmetic chains shown + re-derived) + 1 Sonnet executor (17 prescriptive fixes) + manager-direct leak sweep. |
| Post-repair deterministic sweep | Found 12 further internal-reference/banned-word leaks the judges missed (incl. 2 in WAVE-1 files: how-to-choose-contractor-accountant "HP §17.G", umbrella-company-holiday-pay "§17.F" H2). All fixed. Final grep: 0 hits estate-pattern wide in this site's blog. |
| Final gates | Validator 33/35 clean (accepted: #21 at 2,763 words after mandated de-dup; mileage 45p WARN = false positive, correctly historical). Build GREEN 86/86 pages. Tests green. |

## Accepted residuals (deliberate, do not "fix")

- `vat-flat-rate-scheme-contractors.md` 2,763 body words (37 under floor; consequence of removing a duplicated paragraph; content complete).
- `mileage-claims-contractor-limited-company.md` triggers the validator's 45p heuristic; every 45p is correctly framed as historical.

## Resume checklist (next manager, in order)

1. `python .cache/mark_used_wave2.py --apply` — marks the 169 previewed pool rows used (preview already reviewed by manager 2026-06-12; counts: corporation-tax 32, MTD 21, CEST 16, MSC 14, deemed 13, inside-take-home 11, SA 11...; 0-row slugs are the 7+ net-new intents, protected by slug-dedupe). Prod DB write — needs the usual sign-off.
2. Commit is DONE for content+docs (see git log); verify clean tree for contractors-ir35 paths before further work.
3. Deploy: still gated on domain purchase; full runbook in `STATE.md` ("DEPLOY DAY RUNBOOK").

## Learnings folded forward

- Wave-2 BRIEF_PACKET amended: internal-reference ban (never "house position(s)", "HP", "§N", or packet/framework references in user-facing copy, headings included) + no `</faqs>`-style tags in YAML + `category:` must be the display name not the slug.
- The leak class ("HP §..." in copy) survives blind judging reliably; it is now a deterministic grep in the validator workflow (pattern: `house position|HP §|§[0-9]`), run before AND after repairs.
- Sonnet judging panel (lever 2) performed: recomputed-arithmetic catches were the highest-value findings; the post-repair deterministic sweep substitutes for the second-judge sample at near-zero cost. Keep both for wave 3.
