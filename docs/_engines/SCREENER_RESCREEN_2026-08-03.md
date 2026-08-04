# Niche screener: re-screen batch, 2026-08-03

Follow-up to `CROSS_DOMAIN_LEAGUE_2026-07-24.md`, which closed with a re-screen queue of
five niches whose failures were suspected to be **seed artefacts rather than real verdicts**.
This run tests that suspicion on the three that were testable now.

Instrument unchanged (rubric 2.0, prereg `NICHE_SCREENER_V2_PREREG.md`). New v2 specs live
alongside the originals so the batch-1 provenance stays intact:
`specs/{insolvency-rescue,dental-implants,employment-law-employers}-v2.json`. Each carries a
`seed_evidence` line recording what was changed and why.

---

## First, a correction to how the league is being read

The batch-1 league table has two entries at or near the top that are **calibration controls,
not build candidates**, and the doc says so in its own Notes column:

| Entry | Score | What it actually is |
|---|---:|---|
| ext-boiler | 65.4 | Known-success **control**. Present to prove the instrument ranks a proven niche highly. Its own note reads "not a build candidate" (comparison-war on the conversion side). |
| ext-equity-release | 59.6 | Known-success **control**, and IAR-gated (regulated) on top. |
| ext-wills-probate / ext-pension-transfer / ext-conveyancing / ext-rd-tax | various | External controls, incl. one deliberately G0-banned as a negative test. |

Anything prefixed `ext-` is a control. Reading boiler as "the highest-scoring opportunity we
never built" is a misreading of the table, and I stated it that way earlier in this session.
The real build-candidate league, controls removed, is:

| # | Niche | Score | Status |
|---|---|---:|---|
| 1 | wills-probate | 60.6 | BUILT, awaiting domain |
| 2 | divorce-finances | 59.9 | BUILT, awaiting domain |
| 3 | leasehold-rights | 57.1 | unbuilt |
| 4 | older-driver-renewal | 56.3 | unbuilt |
| 5 | solar-installation | 56.2 | unbuilt |
| - | buy-to-let (anchor) | 56.1 | our best live site |

So the honest position is that the screener has produced **two** build candidates that beat
the anchor by a clear margin, and both are already built.

---

## Re-screen results

### 1. insolvency-rescue → KILL (verdict now settled)

Batch 1 failed G2+G3+G4 and the league flagged "SUSPECT SEEDS (bounce-back-loan era queries
dated); one re-screen with refreshed seeds before accepting". Fair challenge: the original
spec led with `cant pay bounce back loan`, a 2021-22 artefact.

v2 dropped that seed and added twelve current-era distress terms (HMRC time-to-pay, company
strike off with debts, director disqualification, CVA, pre-pack administration, can't pay
corporation tax).

| Gate | Batch 1 | v2 | Threshold |
|---|---:|---:|---|
| G0 regulatory | PASS | PASS | none |
| G1 buyer evidence | — | PASS | live seller SERPs |
| G2 DIY demand | 800 | **1,420** | 3,000 |
| G3 head-lock | FAIL | **FAIL** (delegation volume 0, DIY share 1.00) | — |
| G4 churn | FAIL | PASS (4 spiking queries) | — |

Refreshing the seeds nearly doubled the measured universe and it still lands at **47% of the
threshold**. G3 is the more damning of the two: measured delegation volume is **zero**. Nobody
searches for the "find me someone to do this" shape in this vertical, which is the shape that
converts.

**Verdict: the doubt is resolved and the original failure stands.** Insolvency is genuinely
small in UK search, not a seed artefact. Remove it from the queue.

### 2. employment-law-employers → PARK (improved, still short)

Batch 1 failed G2 at 1,630. The league hypothesised the seeds were "too procedural" and that
employers search reactively in bursts. v2 added seven reactive/crisis-shaped seeds plus the
Employment Rights Act rollout term.

| Gate | Batch 1 | v2 | Threshold |
|---|---:|---:|---|
| G2 DIY demand | 1,630 | **2,210** | 3,000 |
| G3 head-lock | FAIL | **PASS** (delegation 140, DIY share 0.925) | — |
| G4 churn | — | PASS | — |

The hypothesis was **partly right**: reactive seeds lifted the universe 36% and flipped G3
from fail to pass, so delegation demand does exist. But G2 is still 26% short of the floor.

**Verdict: park, do not build.** It is the closest of the three misses and the only one where
a further seed iteration could plausibly clear the gate, so it is worth one more attempt if
the queue ever empties. It is not worth a build decision today.

### 3. dental-implants → GATES ALL PASS, but currently unscoreable

Batch 1 was a G2 near miss at 2,240 (75% of threshold), queued for "re-screen with broader
pain seeds". v2 added seven seeds covering per-unit cost, NHS availability, alternatives and
longevity.

| Gate | Batch 1 | v2 | Threshold |
|---|---:|---:|---|
| G0 regulatory | PASS | PASS | none |
| G1 buyer evidence | PASS | PASS | 13 seller domains, £68-150 price signals |
| G2 DIY demand | 2,240 FAIL | **6,430 PASS** | 3,000 |
| G3 head-lock | — | PASS (delegation 260, DIY share 0.967) | — |
| G4 churn | — | PASS (4 spiking queries) | — |

**The near-miss was a seed artefact.** The broader seed set measures 2.9x the original demand
and clears every gate.

**But the stage-2 score cannot be trusted yet.** The scoring run returned
`total=28.6 range=[28.6, 68.6]` with `unknown_rate=0.87` — 139 of 160 SERP domains are
unclassified, so 28.6 is only the pessimistic floor of a 40-point band. Batch 1 scored every
niche at zero unknown-rate, which is why those numbers are comparable and this one is not.

Closing that gap needs a domain-classification pass over the 160 SERP domains (the
`llm_classify_batch` stub is still unimplemented; the established pattern is a classify pass
merged into `classify_data.json`). That is the blocker, not the data.

**Verdict: promoted from "failed on volume" to "passes all five gates, score pending
classification".** It is the only genuinely new candidate this batch produced.

---

## Not re-run, and why

| Niche | Reason |
|---|---|
| ev-road-charging | Failed G2+G3 as too early. Demand arrives nearer Apr 2028. Re-screen 2027, per batch 1. Re-running now would burn spend to reproduce a known answer. |
| landlord-epc-retrofit | Failed G2+G3+G4. Gated on the MEES consultation concluding. Same reasoning. |

---

## Instrument defects confirmed this run

1. **Same-day idempotency blanking is still live.** The dental-implants stage-2 expansion
   logged three `IdempotencyHit ... treating as empty` lines on `keyword_suggestions`, so that
   run's expansion pool is thinner than a clean-day run would produce. This is the same defect
   recorded in the batch-1 prereg FAILs. It biases scores **down**, so it cannot have inflated
   any result above.
2. **`unknown_rate` does not gate scoring.** A run with 87% unclassified domains still emits a
   `total=` figure that reads like a league-comparable score. It should refuse to score, or
   the score should be labelled provisional at the point of output rather than only inferable
   from the range width.

## Spend

Three screens plus one stage-2 scoring run. `DATAFORSEO_ABORT_AT` was raised to $8.00 for the
batch (default $0.85/day would have aborted after roughly the first niche). Nothing else about
the cost path was changed, and the default is untouched on disk.

## What this changes

- **Remove** insolvency-rescue from the re-screen queue. Answered.
- **Park** employment-law-employers. One further seed iteration is defensible, a build is not.
- **dental-implants is the one live new candidate**, pending a classification pass to score it.
  Note it is not accounting-adjacent (`accounting_adjacent: false`), so it would not reuse the
  estate's tax-content muscle the way wills and divorce do.

  **2026-08-04 ADDENDUM: classification pass done, verdict = KILL.** All 139 unknown domains
  classified (112 SPECIALIST, 12 INFO, 9 GENERALIST, 3 GOV_EDU, 2 UGC; 11 ambiguous cases
  homepage-verified) and merged into `classify_data.json` (220→359 hand_labels). Re-score:
  `total=20.83 range=[20.83, 60.83] unknown_rate=0.0`. The 0.87 unknown rate was masking a
  SERP saturated with implant clinics (mean thinness 0.4356): the gates pass on volume, but
  the results pages are already owned by providers, which is the losing shape. Two components
  (`diy_pain_demand`, `calculator_demand`) remain NULL on a separate pre-existing defect
  (volumes coverage 0.24 &lt; 0.30), so 60.83 is not a real ceiling; the honest floor sits ~35
  points below every build candidate. Combined with `accounting_adjacent: false`, dental-implants
  is removed from the candidate list. Instrument patch shipped alongside: `score.py` now prints
  a `PROVISIONAL (unknown_rate=...)` warning when unknown_rate &gt; 0.2 (defect 2 above).
- The unbuilt league below the two finished sites (leasehold 57.1, older-driver 56.3, solar
  56.2) is unchanged and all three sit within 1 point of the anchor, not above it by the margin
  wills and divorce showed.
