# Property meta program — analysis register 2026-07-19

Change-aware v2 analysis (methodology: `docs/_engines/SERP_META_PROGRAM.md`,
"Analysis methodology v2"). Data: GSC to 2026-07-17 (fresh), Bing 2026-07-17
(directional only). **UPDATE 2026-07-19 (later same day): owner approved; the 4 ship-ready proposals + recategorisation 301 are SHIPPED, DEPLOYED and live-verified.** See COLLAPSE_DIAGNOSIS_2026-07-19.md for the ship log. The 2 banked proposals remain held.

## 1. Verdict on past meta work (the honest answer)

526 recorded meta interventions (9 audited 2026-05-19 rewrites + April DeepSeek
pass + May/June bulk waves), collapsed into 364 measurable bursts:

- **0 clean wins, 0 clean losses. 316 insufficient-data, 48 immature.**
- This is not a tooling failure, it is the truth: every page was <90 days old at
  edit time (site content born Mar-May 2026), pre-windows were data-thin
  (April: ~13 impressions/page/month), and waves cascaded days apart so no edit
  has an uncontaminated post-window. Past meta work on this site is causally
  unjudgeable, and any claim otherwise would be the exact confound this
  methodology exists to kill.
- Placebo check (34 untouched pages through the same pipeline): 0 false
  wins/losses — thresholds are honest, not timid.

## 2. Site decomposition 2026-05-23 → 2026-07-17 (28d vs 28d)

| Cohort | Pages | Pre impr | Post impr |
|---|---|---|---|
| NEW (born in window) | 269 | 14,625 | 11,774 |
| CHANGED | 329 | 21,803 | 27,840 |
| CONTROL (untouched, ≥45d old) | 34 | 2,312 | 12,393 |
| OTHER | 271 | 10,530 | 10,497 |

Control drift (median per-page): r=0.935 — the typical untouched page is FLAT
(-6.5%). The control sum (+436%) is one exploding page; median is the honest
signal. So "site impressions grew" ≠ optimisations worked: growth is
concentrated in new pages and a handful of breakout pages.

## 3. THE headline finding: mid-June collapse event (68 pages)

68 pages that peaked ≥100 impressions/28d are now below 40% of peak; the top
losers went to ~zero around 2026-06-08/15 while site totals kept growing (new
pages masked it — this is why decomposition is mandatory). Worst:

| Page | Peak 28d | Now 28d |
|---|---|---|
| cgt-rates-property-2026-27-current-rates-explained | 4,175 | 0 |
| capital-gains-tax-property-sale-uk-2026-rates-allowances | 2,161 | 10 |
| scottish-lbtt-additional-dwelling-supplement-ads | 1,979 | 717 |
| sdlt-buy-to-let-rates-surcharge-guide | 1,633 | 0 |
| mortgage-interest-tax-relief-changes-landlords | 972 | 0 |
| letting-relief-landlords-2026-changes | 882 | 0 |
| 60-day-cgt-reporting-property-sales-rule | 838 | 0 |

Traced for the CGT cluster: the lost queries did not vanish — Google
consolidated them onto `capital-gains-tax-property-complete-guide-uk` (frozen,
top-clicks page) at positions 21-83 vs the specialist pages' former 2-6. The
collapse follows the 2026-05-19 internal-link wave + late-May bulk meta edits,
but attribution is formally confounded (multiple interventions + possible June
core update). Full list: `.cache/meta_program/property/analysis.json`
→ `collapsed_pages`.

**This is the single most valuable target on the site right now** (~10k+
impressions/28d of former traffic) and it is NOT a meta-copy problem. Next step
(separate session, one variable at a time): per-cluster diagnosis — index
status, canonical/internal-link audit of the 05-19 wave, cannibalisation
resolution. No meta edits to collapsed pages until diagnosed.

## 4. Proposals (Opus-written, Sonnet-QA'd, validator-passed)

Pipeline: 40 worklist pages → 16 eligible (9 frozen, 11 position-bound, 1
cooldown, 3 no query data rejected) → Opus wrote 6, skipped 10 with reasons
(current meta already serves dominant recency intent / noise / sibling
cannibalisation avoidance) → QA caught 1 fabrication (s.455 rate dating) + 2
fixes, remediated → all 6 pass `meta_apply.py` dry-run.

**Ship-ready (4)** — alive pages, clean evidence, position ≤15:
| Slug | New title |
|---|---|
| ated-complete-guide-2026-27 | ATED Rates 2026/27: Charges, Bands and Reliefs Explained |
| welsh-land-transaction-tax-ltt-rates-bands-2026-27… | Welsh LTT Residential Rates and Bands 2026/27 Explained |
| directors-loan-repayment…s464c-s464d | CTA 2010 s.455 Rate: 33.75% Rises to 35.75% in 2026/27 |
| sdlt-transfer-property-company-cost | SDLT on Transferring Property to a Limited Company 2026/27 |

**Held despite valid copy (2)** — pages are in the collapse list; changing meta
now would break variable isolation: cgt-rates-property-2026-27 (4,175→0),
single-person-council-tax (1,504→497). Copy is banked in proposals.json for
after diagnosis.

Full proposals + rationales: `.cache/meta_program/property/proposals.json`;
skips: `proposals_skipped.json`; QA: `qa_verdicts.json`.

## 5. Standing risk controls now in force

- Frozen list `docs/_engines/property_frozen_pages.md` (top-10 click drivers +
  conversion surfaces); analysis hard-fails without it.
- 28d cooldown after any meta edit; position >15 routes to
  needs-position-not-meta; no proposals off confounded evidence.
- Apply caution: `meta_apply.py --execute` stamps dateModified/EEAT schema —
  needs a stamp-skip flag before any Property apply (do NOT run as-is).
- Serialisation: no meta batch while another Property wave is in flight.

## 6. Apply runbook (EXECUTED 2026-07-19; kept for the next batch)

1. Add stamp-skip to `optimisation_engine/apply/meta_only.py` (title/desc/_prev only).
2. Trim proposals.json to the 4 alive slugs.
3. `python scripts/meta_apply.py --site property --proposals … --execute`
4. Review first diff, build, deploy, `register_monitored_batch.py`, IndexNow.
5. Re-analyse no sooner than 32d post-ship.
