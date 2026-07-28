# Opportunity Execution Program — HANDOFF 2026-07-23

Spec: `docs/_engines/OPPORTUNITY_EXECUTION_PLAN_2026-07.md` (durable copy `~/.claude/plans/piped-painting-seahorse.md`).
Audit evidence: `docs/_engines/opportunity_audit_2026-07-23/`.
**The implementing session MUST run on an Opus-or-better model** (writers inherit the session model; never pass `model:opus` — silent-hang gotcha).

## Session boundary reason
Subagent session token limit hit mid-Wave-1 (resets 12am Europe/London). All Wave-1 writer output that completed is on disk; P4 QA not yet run.

## What is DONE (uncommitted, on branch `expansion/phase-0`)

### Solicitors duplicate-route fix — DONE
- `practice-sale-succession` pair: already fixed 2026-07-06 (redirect live in next.config.ts); no action needed. Residual GSC rows are old indexed URLs, handled by the 301.
- Real bug: 8 posts carried `canonical:` frontmatter pointing at never-live `/blog/vat-and-compliance/`. Equity check (Supabase): `vat-compliance` holds all Bing equity (500+ clicks); variant had 40 GSC imps, 0 clicks.
- Fixed: 8 canonicals corrected; 2× 301 added in `Solicitors/web/next.config.ts` (`/blog/vat-and-compliance*` → `/blog/vat-compliance*`).

### Generalist exact-dupe pairs (5) — DONE, flag at deploy gate
Equity-checked per pair (GSC+Bing). Losers `git rm`'d + 5 permanent redirects in `generalist/web/next.config.ts`; 2 internal links repointed.
Winners: `how-to-change-company-name-companies-house` (842 Bing imp, 7 clicks), `gifting-shares-family-member-cgt`, `directors-loan-written-off-tax-implications` (no equity either side, better phrasing), `tax-efficient-salary-dividend-split-director-2025-26`, `director-takes-dividend-before-board-minutes-signed`.
**OWNER FLAG: 5 markdown files deleted (recoverable in git). Confirm at deploy gate.**

### Wave 1 stale-fact sweep — DONE (nothing to fix)
Only flagged post (generalist `employee-mileage-45p-tax-free-rules`) is already fully 55p/2026-27. Audit flag was stale.

### Wave 1 P1 seeding — DONE
16 topics seeded into `blog_topics` (notes prefixed `WAVE1.` with evidence + cannibalisation instructions). Enrich ran on generalist/property/dentists/contractors-ir35/construction-cis; **solicitors got HTTP 400; hospitality/startups-tech/crypto hit DataForSEO daily budget gate ($1 ceiling)** — non-blocking, priorities set manually; re-run enrich tomorrow if wanted.

### Wave 1 P2.5 risk gate — DONE (16/16 verified, ultracode workflow wf_ddcfb6e9-af3)
- **PASS (5)**: generalist dividend-tax-rates-2026-27, generalist capital-allowances-2026-27-guide (pillar), generalist employer-nic-true-cost-of-employee-2026-27, construction-cis vans-tools-capital-allowances-trades-2026-27 (pillar), startups-tech founder-salary-vs-dividends-2026-27.
- **DEEPEN (9)** — verifiers found incumbents already covering the intent (several audit premises factually wrong; the estate's earlier FA-2026 de-stale sweeps had already covered these). Incumbents recorded in blog_topics notes (status='deepen'):
  - property FA2026-CA → `writing-down-allowance-rates` (already the delta post)
  - property mileage → `landlord-tax-deductions-uk-2026-complete-list` (pos 5, 12 clicks on the exact head intent)
  - dentists mileage → `can-dental-associates-claim-mileage-multiple-practices` (already 55p×8)
  - dentists payroll NIC → `employing-first-dental-nurse-practice-manager-cost-tax`
  - solicitors BADR → `goodwill-tax-treatment-law-firm-sale` + `solicitor-retiring-tax-planning-uk` (deepen: retiring post's worked example still leads with 14%)
  - solicitors NIC → `llp-employer-ni-2026`
  - contractors-ir35 MVL → `closing-contractor-limited-company` (has dedicated MVL/BADR-18/TAAR content)
  - hospitality seasonal NIC → `casual-staff-employment-status` (missing pieces: seasonal cost modelling + under-21/apprentice/veteran reliefs)
  - crypto CGT ref → `how-crypto-is-taxed-uk`
  → Fold these into the Wave 4 deepen sweep (add the named delta sections; rewrite-only rule).
- **PARK (2), owner decision**: solicitors fee-earner-mileage (zero demand evidence), construction-cis mileage-vs-van (zero demand evidence). Status='parked' in blog_topics.

### Wave 1 P3 writing — 5/5 drafts ON DISK, 4 unvalidated
All five PASS topics have complete files (each ends with Sources `</ol>`):
- `generalist/web/content/blog/dividend-tax-rates-2026-27.md`
- `generalist/web/content/blog/capital-allowances-2026-27-guide.md`
- `generalist/web/content/blog/employer-nic-true-cost-of-employee-2026-27.md` (only writer that returned a full receipt)
- `construction-cis/web/content/blog/vans-tools-capital-allowances-trades-2026-27.md`
- `startups-tech/web/content/blog/founder-salary-vs-dividends-2026-27.md`
4 writers died on session limit AFTER writing, DURING self-check → treat all 5 as unvalidated drafts.
Manager mechanical checks done: 0 em-dashes, metaTitle ≤60 / metaDescription ≤160 all 5, citation refs present, ground-truth figure grep consistent (10.75/35.75/39.35, 14%, 40%, 55p, £5,000, £6,708).
blog_topics rows: written 5 marked used=true/status='written'.

## NEXT ACTIONS (in order)
1. **P4 2-track QA** on the 5 drafts (adversarial factual vs primary sources + editorial rubric; independent refuter agents per plan). One QA agent per post, inherited model. Fix defects with surgical single-file agents.
2. **P5 gates**: `python scripts/predeploy_gate.py --site <site> --qa-batch <batch>` for generalist/construction-cis/startups-tech (needs the QA verdict cache from step 1). Smoke builds ALREADY GREEN 2026-07-23 for all 4 touched sites (generalist, Solicitors, startups-tech, construction-cis) — re-run only if content changes in QA fixes.
3. **Wave 2** per plan (batch by site) → same pipeline. Note P2.5 lesson: verify incumbents BEFORE seeding; several audit "zero content" claims were stale.
4. **Wave 3 calculators** (check Property `lbtt` registration first).
5. **Wave 4 deepen sweep** — now includes the 9 DEEPEN conversions above with named incumbents + named missing sections.
6. **ONE owner deploy-gate presentation** covering everything (include the 5 generalist dupe deletions flag + PARKED items list). Deploy → IndexNow → Request-Indexing handoff → commit + clustered push.

## Open gates / owner decisions
- Deploy: everything owner-gated, nothing deployed.
- Generalist: confirm 5 dupe-file deletions.
- PARKED: solicitors fee-earner mileage; construction-cis mileage-vs-van (revive only with query evidence).
- Nothing committed yet this session (cluster-commit when QA green; include plan doc + audit dir + outreach/ untracked files decision).

## Lessons banked
- P2.5 gate earned its keep: 11 of 16 audit topics would have duplicated existing equity. Audit "gap" claims MUST be verified against current content (post-de-stale corpus), not trusted.
- Writers can die after Write but before receipt: always scan content dirs for orphan drafts after a writer batch.
- DataForSEO enrich budget gate ($1/day) limits enrich to ~5 sites/day.
