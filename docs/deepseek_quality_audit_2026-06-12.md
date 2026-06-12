# DeepSeek-Era Quality Audit and Adjudication, 2026-06-12

> Blind content-quality audit across 4 accounting sites in this monorepo
> (medical excluded: every post already rewritten or net-new wave).
> Purpose: decide whether the rewrite program should weight by authoring
> era, by performance, or by targeted defect, and set the `era_factor`
> inputs for `scripts/rewrite_worklist.py`. Adjudicated by the program
> manager from four independent blind Sonnet grader reports.

---

## 1. Method

- **Sample**: 31 posts drawn by seeded RNG (`seed 20260612`) from the
  provenance inventories, stratified to cover each site and each authoring
  era present. Manifest: `.cache/quality_audit/sample_manifest.json`.
- **Blinding**: graders received page bodies only. Authoring era
  (deepseek / claude-supabase / opus-wave / ambiguous), GSC performance,
  and provenance confidence were all withheld. Eras were re-attached to
  the scores only at adjudication.
- **Graders**: four independent Sonnet instances, one per site.
- **Dimensions** (1-5): depth, currency, ai_tells (higher = fewer/cleaner),
  citations. **Verdict** per post: a_star / acceptable / needs_rewrite.
- **Provenance base** (`.cache/provenance/<site>/inventory.json`):
  dentists 95 ds / 55 cl / 54 opus-wave; solicitors 39 ds / 27 cl /
  117 rewritten+wave; generalist 3 ds / 363 cl (all low-confidence);
  agency 306 cl (all low-confidence).
- **Sample-size caveat**: 3-6 posts per site/era cell. Findings are
  directional signals, not precise failure rates. Every decision below is
  written to be robust to that uncertainty, and each is paired with a
  data trigger that would revise it.

---

## 2. Per-site score tables by era

Means are grader means across the cell. Verdicts are counts within the cell.

### Dentists (site means: depth 3.9, currency 4.1, ai_tells 3.8, citations 3.1)

| Era / state | n | Verdicts | Notes |
|---|---|---|---|
| deepseek, UNTOUCHED since creation | 2 | 0 a_star / 0 acc / 2 needs_rewrite | stale 18% WDA, decorative citations, thin, internal contradiction on pre-trading AIA |
| deepseek, DE-STALED 2026-06-03 (cf665616) | 3 | 2 a_star / 1 acc / 0 needs_rewrite | de-stale lifted all three to pass |
| claude-supabase | 3 | 2 a_star / 0 acc / 1 needs_rewrite | one hard error (SSE described as applying to dividends; SSE is a CGT relief on share disposals) + stale 2024/25 tag + zero sources |

Distribution: 4 a_star / 1 acceptable / 3 needs_rewrite.

### Solicitors (site means: depth 3.1, currency 2.9, ai_tells 2.9, citations 1.9)

| Era / state | n | Verdicts | Notes |
|---|---|---|---|
| deepseek (May-18 batches) | 5 | 0 a_star / 3 acc / 2 needs_rewrite | 2 failures carried dangerous errors: fabricated "Accounts Rule 8.5"; search fees mis-classed (disbursements), Brabners absent |
| claude-supabase (April launch) | 3 | 0 a_star / 0 acc / 3 needs_rewrite | goodwill-as-income inversion; "transition to current year basis" backwards; legal aid stated VAT-exempt (house position: standard-rated); explicit pricing breach |

Distribution: 0 a_star / 3 acceptable / 5 needs_rewrite. **Worst cell in
the estate, and the claude-era subset graded worse than the deepseek subset.**

### Generalist (site means: depth 3.9, currency 4.1, ai_tells 3.7, citations 3.0)

| Era | n | Verdicts | Notes |
|---|---|---|---|
| claude-supabase | 6 | 3 a_star / 3 acc / 0 needs_rewrite | a_star: CGT pence-level worked example (had a mid-sentence truncation, now patched); variable-director-salary with NIM12050 ref (EA contradiction, now patched); 55p AMAP mileage correct. acc: payroll (pricing-table breach + RTI inconsistency, patched); R&D software (missing merged-scheme context); bookkeeping solid |
| deepseek (consolidated generator) | 3 | 0 a_star / 2 acc / 1 needs_rewrite | CIS: Ponzi digression off a Nature demographics paper, zero worked examples; hmrc-reclaim borderline; vat-calculator keyword-stuffed (9+ bold repeats) + stale BoE rate |

Distribution: 3 a_star / 5 acceptable / 1 needs_rewrite. The grader
independently flagged a quality step-down at the era boundary **without
knowing the eras**, corroborating the provenance split blind.

### Agency (site means: depth 4.0, currency 3.7, ai_tells 3.8, citations 2.5)

| Era | n | Verdicts | Notes |
|---|---|---|---|
| claude-supabase (all) | 6 | 1 a_star / 4 acc / 1 needs_rewrite | a_star: R&D-for-AI-agency (verified arithmetic, ML-specific depth). needs_rewrite: remittance-basis/Dubai (suspect FIG transitional, SRT oversimplified, keyword repetition). Rest acceptable; citation poverty the common gap |

Distribution: 1 a_star / 4 acceptable / 1 needs_rewrite.

---

## 3. The de-stale natural experiment (dentists)

The dentists sample contains a clean controlled contrast inside a single era:

- **deepseek, never touched** (2 posts): **2/2 needs_rewrite.**
- **deepseek, de-staled on 2026-06-03 in commit cf665616** (3 posts):
  **3/3 pass (2 a_star, 1 acceptable).**

Same authoring engine, same site, same draw. The only variable is whether
the de-stale pass ran. The pass moved every page it touched from fail to
pass. This is the strongest single result in the audit: it shows the
deepseek-era problems are largely **remediable by maintenance**, and that
the failures we see are concentrated in pages that have **not yet** been
maintained. It argues against blanket era-driven condemnation and for
era-as-a-prior that targeted fixes discharge.

---

## 4. Surgical patches already applied (2026-06-12, manager-direct)

Per the factual-backpatch rule (live-liability fixes are made manager-direct,
no sub-agent), the dangerous errors surfaced by this audit were patched the
same day. These removed live liability only; the pages remain full-rewrite
candidates where they have demand.

Solicitors (the 5 dangerous-error pages):
- `sra-breach-notification-when-and-how`: removed fabricated "Accounts Rule 8.5".
- `solicitor-vat-accounting-guide`: legal aid corrected to standard-rated (house position); cash-accounting-as-default framing fixed.
- `disbursements-vs-recharges-conveyancing-vat`: search-fee classification corrected, Brabners caveat added.
- `law-firm-succession-planning-guide-uk`: goodwill-as-income inversion corrected; basis-period direction fixed.
- `solicitor-accountant-birmingham`: explicit pricing removed (lead-gen model: no pricing).

Generalist (defects noted in grading, patched):
- CGT-rates page: mid-sentence truncation repaired.
- `variable-director-salary-ni-management`: Employment Allowance contradiction resolved.
- payroll post: pricing-table breach removed; RTI inconsistency fixed.

Dentists:
- The claude-era `dental-group-structure-multiple-sites-uk` SSE error
  (SSE described as applying to dividends) is a hard technical error and is
  flagged for correction at rewrite; it is not a one-line live-liability
  patch and is carried into the dentists rewrite queue rather than
  back-patched in isolation.

---

## 5. Adjudicated decisions

### 5.1 Per-site approach

| Site | Verdict on approach | Reasoning |
|---|---|---|
| **Dentists** | **Performance-driven, with deepseek as a maintenance prior** | The de-stale experiment shows deepseek pages are fixable, not condemned. Failures cluster in untouched pages. Keep a deepseek prior in scoring, but drive the queue by GSC demand (Tier A/B), not by era alone. |
| **Solicitors** | **Targeted-fix now, full rewrite on demand; era is NOT the discriminator** | Both eras are weak and the claude era is worse. Era weighting cannot separate good from bad here. Dangerous errors are already patched. Rewrite is gated to pages with proven demand. |
| **Generalist** | **Performance-driven; claude corpus is sound** | Claude cell 3 a_star / 3 acceptable / 0 fail. Defects are isolated and already patched. The 3 deepseek pages are the only era-driven concern and they are low/zero-traction. |
| **Agency** | **Performance-driven; claude corpus is sound** | 1 a_star / 4 acceptable / 1 fail. Single-era site; no era contrast to exploit. Citation poverty is the systemic gap to fix at rewrite, not an era problem. |

### 5.2 `era_factor` recommendation (input to `rewrite_worklist.py` scoring)

Current global: deepseek 1.5, ambiguous 1.2, claude 1.0.

| Site | deepseek | ambiguous | claude | Change vs current | Why |
|---|---|---|---|---|---|
| Dentists | **1.5** | 1.2 | 1.0 | unchanged | Untouched deepseek failed 2/2; the prior is earned. Keep it. |
| Solicitors | **1.3** | 1.2 | **1.3** | raise claude to 1.3, lower deepseek to 1.3 | Both eras weak; the launch-era claude corpus deserves the same suspicion as deepseek. Flatten the gap so demand, not era, orders the queue. |
| Generalist | 1.5 | 1.2 | 1.0 | unchanged | Era split is real and the deepseek cell stepped down detectably; keep the prior for the 3 deepseek pages. |
| Agency | n/a (1.5 retained nominally) | 1.2 | 1.0 | unchanged | Single-era; factor is inert. No change. |

Net effect: only **solicitors** changes. Its claude-era prior rises to match
deepseek so the worklist stops treating April-launch claude pages as
trustworthy by default. Everywhere else the existing factors are vindicated.

### 5.3 Scope / pause decision (program gate)

The gate: pause generalist and agency for a user decision **only if** their
claude corpora graded badly. **They did not.** Generalist claude = 3 a_star /
3 acceptable / 0 fail; agency claude = 1 a_star / 4 acceptable / 1 fail.
Both are largely sound with isolated, already-patched defects.

**Decision: do NOT pause. Proceed with the demand-gated rewrite queues as
generated.** Generalist (A+B = 26 pages, batches GEN-R1/R2) and agency
(A+B = 3, AGN-R1) continue. Note both sites' GSC is young, with 344 and 303
pages respectively parked on watch lists pending ranking maturation; that is
the correct holding pattern, not a pause.

### 5.4 Tier C (deferred prune/consolidate) recommendation

Tier C is the zero-traction deepseek tail: **dentists 88, solicitors 38,
generalist 2** (agency 0). The untouched-deepseek result (2/2 fail) says these
are **quality liabilities that happen to be unindexed-but-live**, exactly the
profile that erodes site-level E-E-A-T without earning a single click.

Recommendation to carry into the deferred decision:
- **Default posture: prune, not rewrite.** These pages have no demand and a
  demonstrated quality-failure prior. Rewriting them is the worst use of
  effort (high cost, zero proven upside).
- **Salvage exception:** any Tier C page whose *topic* maps to a live GSC
  demand query that lacks a dedicated page is a consolidate-into-a-keeper
  candidate, not a prune. Resolve via the data-gated consolidation rule
  (GSC+Bing refresh, guard, Bing veto, Opus reasoning, per-cluster user
  approval), not a blanket delete.
- **Mechanism:** treat the de-stale pass as the cheap triage. If a Tier C page
  ever shows emerging traction (watch-list promotion), de-stale it first
  (cf665616 proved this lifts fail→pass) before any rewrite spend.
- This stays a **deferred** decision requiring user sign-off; this audit
  supplies the evidence that the default should lean prune.

---

## 6. Cross-site systemic findings

1. **Citation poverty is the weakest dimension estate-wide.** Citations means:
   solicitors 1.9, agency 2.5, generalist 3.0, dentists 3.1, the lowest score
   on every site. Decorative or absent sourcing is the single most consistent
   defect across eras and sites. **Action:** make verifiable, load-bearing
   citation a blocking gate in every rewrite brief, not a nice-to-have.
2. **Era is a real but partial signal, and not monotonic.** The provenance
   split tracks quality on generalist (grader caught the boundary blind) and on
   untouched dentists deepseek pages, but **inverts on solicitors**, where the
   claude launch corpus is the worst cell sampled. Era is a useful prior, never
   a sufficient one. Performance plus defect-class must govern.
3. **Maintenance state dominates authoring era.** The de-stale experiment
   (3/3 pass vs 2/2 fail within one era) shows "has it been maintained since
   creation" predicts quality better than "which engine wrote it." This
   reframes the whole program: cheap de-stale first, expensive rewrite only on
   demand.
4. **The single worst cell is the solicitors April-2026 launch corpus.**
   It produced the goodwill inversion, the backwards basis-period statement,
   the legal-aid VAT error, and the pricing breach: four serious defects in
   three sampled pages. The sample only saw 3 of those launch pages; **27
   claude-era solicitors pages remain in the corpus.** This corpus warrants a
   dedicated factual sweep beyond the 5 already-patched dangerous-error pages,
   independent of the demand-gated rewrite queue.
5. **Dangerous-error class is rare but high-severity.** Fabricated rule
   citations (Accounts Rule 8.5), reversed reliefs (SSE on dividends, goodwill
   as income), and reversed regime statements (legal aid VAT-exempt) are the
   liabilities that matter most. All identified instances are patched; the
   lesson is that a per-page factual gate must run ahead of, and independently
   of, the SEO-demand prioritisation.

---

## 7. What would change these verdicts

- **More GSC data.** Generalist and agency GSC are young (344 + 303 watch-list
  pages). A maturation window could promote watch-list pages into Tier A/B and
  re-order the queues. Re-run `rewrite_worklist.py` after the window.
- **Bigger samples.** 3-6 posts per cell. A 15-20-per-cell re-draw would tighten
  the solicitors "claude worse than deepseek" finding (currently 0/3 vs 3/5)
  and confirm the generalist era step-down at higher confidence. The same seed
  protocol can be re-run with a wider draw.
- **A solicitors launch-corpus census.** Grading the remaining 27 claude-era
  solicitors pages (not a random sample) would tell us whether the four serious
  defects are representative or unlucky, and whether the corpus needs a full
  re-author rather than page-by-page fixes.
- **Provenance confidence.** Generalist and agency provenance is entirely
  low-confidence (363 + 306 pages tagged low). If a higher-confidence
  re-classification surfaced hidden deepseek pages on those sites, the
  era_factor recommendation for them would need revisiting.
