# Content sweeps backlog — parked 2026-07-06 (owner: "park the content sweeps for a new agent")

> **If you are a fresh agent picking this up: this file is self-sufficient. Read it top to bottom, then execute sweeps in priority order. No conversation context required.**
> Ground-truth sources: `docs/agency/house_positions.md` (agency facts, LOCKED), the estate memory index, and per-site HP/STATE docs. Deploy recipes + Vercel project IDs + gate pipeline = `docs/_engines/CRO_PARITY_PROGRAM.md` (follow its Gate pipeline for EVERY deploy, and its Property protection protocol; Property/** remains read-only).
> Locked rules that bind all of this work: no em-dashes in user-facing copy (including the ` -- ` double-hyphen substitute); gold-standard A* quality bar; factual back-patches are per-citation-judgment (manager-direct or tightly-QA'd workers with pinned goldens — never blind regex on advisory copy); UK English; no credential claims ever (specialism framing only); no DJH in user-facing copy; rebuild + full gate + deploy per site after content changes.

## Status of what is ALREADY DONE (do not redo)
- Agency CODE layer credential strip: COMPLETE + LIVE 2026-07-06 (~35 src files + niche.config.json sticky CTA + 29 claims in content/fundamentals; commits `aabb1387`, `e30819e9`, config/fundamentals in `e30819e9`-family). Live checks ICAEW=0.
- Agency `/r-and-d-credits` CODE page ERIS figures: FIXED 2026-07-06 (14.5%/30%/86%, merged-scheme dating).
- Agency `rd-tax-credit.ts` compute lib: CORRECTED (pre-R2; goldens pinned).
- Agency BADR/CGT money-page cluster: FIXED 2026-07-06 (selling-agency, earn-out, when-to-incorporate, exit-tax/temp-non-residence verified clean; commit `71da7b5d`).
- Property: 518-page credential sweep + source fix LIVE since 2026-06-23. Generalist: full de-credential VERIFIED LIVE 2026-07-06 (rode the CRO-parity G-0 deploy; live JSON-LD + home/about checked; generalist CLOSED).

## THE SWEEPS (priority order)

### 1. Agency R&D content cluster (~60+ blog files) — HP §9 items 3-4
Stale/garbled R&D figures across the R&D blog cluster (NOT the code page, already fixed). Known-bad named files: `merged-r-and-d-scheme-agency-2023.md` (self-contradictory placeholders + wrong commencement 2023-vs-2024), `r-and-d-intensive-sme-test-agencies.md` (27% credit + unresolved placeholder text), `does-fine-tuning-llm-qualify-rd-tax-credits.md` + `rd-claim-cloud-compute-aws-gcp.md` (old SME model presented as current, no merged-scheme cut-over caveat). Sweep the WHOLE cluster (60+ files, e.g. `rd-tax-credit-subcontractor-costs-65-percent-rule*`, `paye-ni-cap-rd-claim-agencies.md`) for stale-model tokens.
**Correct figures (HP §4, estate-verified):** merged scheme 20% above-the-line credit / ~15% net, periods beginning on/after 1 Apr 2024; ERIS = 30% intensity threshold + 86% enhanced deduction + 14.5% payable credit; never publish 27% as a statutory ERIS rate; never a 40% threshold for post-Apr-2024 periods; old SME model (186%/86p/14.5% surrender/65% subcontractor) only with an explicit pre-1-Apr-2024 framing. Eligibility-boundary honesty: routine agency work does not qualify; name excluded activities; flag the overseas-subcontractor restriction.

### 2. Agency employer-NIC sweep (~45 pages) — HP §9 item 9
Any `13.8% / £9,100` employer-NIC figure is stale for 2025/26 onward → `15% / £5,000` (EA £10,500, 2+ employee eligibility rule; single-director companies NOT eligible). This is advisory-grade REWORK where worked examples embed the old arithmetic — recompute the examples, don't token-swap. Keep 13.8%/£9,100 only as clearly date-tagged history. (Estate memory `employer_nic_15pc_2025_ground_truth`: dentists 2 + ir35 2 residual pages may also remain; verify with a grep.)

### 3. Blog-md credential sweep: agency ~30 + Dentists 40 pages — estate memory `estate_credential_claim_risk`
Strip the unsubstantiated ICAEW/ACA/Chartered reviewer from blog frontmatter (`reviewedBy`/`reviewerCredentials`), embedded `schema:` JSON-LD, AND in-body firm-voice self-claims ("As ICAEW qualified accountants..."). Replacement doctrine (used estate-wide): reviewedBy → "<Brand> Editorial Team", reviewerCredentials → "Reviewed against legislation.gov.uk and HMRC guidance"; body claims → specialism framing. Source generator profiles are already fixed (no re-stamping). KEEP legitimate educational/comparison/reader-advice mentions.
**LESSON (twice-proven 2026-07-06):** sweeps must also grep `src/` (pages, components, emails, PDFs), `niche.config.json`, and `content/fundamentals/` — not just blog md. Dentists' code layer has NOT been swept; grep it first.

### 4. WS8 keyTakeaways backfills — owner pre-approved 2026-07-06 ("okay")
Dentists: ~42% of posts have keyTakeaways → backfill the rest. Medical: 0/73 → full backfill (Medical is FLAT-routed: never run nested-slug link tooling; use `scripts/medical_flat_link_audit.py`). Run via the sites' content engines with per-post QA; keyTakeaways are the AI-answer-engine citation surface (GEO program dependency).

### 5. Agency fleet year-label + meta-length pass (small)
Fleet tool configs label "2025/26" while computing FA-2026 (2026/27) rates in several places (badr-cgt models BOTH years correctly — leave its date-banded copy; salary-dividend + calculators page already fixed). Audit each of the 8 fleet configs: label = what the lib actually computes. Also trim ~15 meta descriptions over the ~160-char soft target (worst: free-health-check 196, r-and-d-credits 192).

### 6. OPEN-ITEM verifications (verify-then-fix; do NOT lock figures without primary sources)
- QFZP de-minimis stated inconsistently across agency UAE pages (HP §9 item 7) — verify at UAE FTA before reconciling.
- `remittance-basis-dubai` FIG-regime description (HP §9 item 10 / OPEN-ITEM 6) — verify against the UK FIG 4-year regime before it is cited anywhere.
- IR35 medium/large size-test thresholds (2025 uplift, OPEN-ITEM 7) — pages currently state the principle without numbers (correct posture); only add numbers after a gov.uk check.

## Owner decisions recorded 2026-07-06 (context for whoever executes)
- Resend from-domains: everything sends under the Property-verified domain "for the time being" — owner will revisit; emailed resource delivery stays OFF (on-page delivery live) until he does.
- Phone numbers: NO phone numbers displayed on any site (verified 2026-07-06: zero rendered phones/tel:/JSON-LD telephone estate-wide; only the lead-form input placeholder shows a format example — that stays).
- /newsletter disposition approved as-is (delinked, cron disarmed, page live).
- Generalist credential-strip: owner said "deploy it" 2026-07-06; verification showed it was ALREADY LIVE (shipped inside the CRO program's G-0 baseline deploy). Closed, no action.
