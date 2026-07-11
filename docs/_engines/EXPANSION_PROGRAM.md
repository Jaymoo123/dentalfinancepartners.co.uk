# Estate Expansion Program

Methodology for expanding the estate to full coverage of the UK accounting lead-gen niche. Approved 2026-07-11. Live program state lives in [EXPANSION_TRACKER.md](EXPANSION_TRACKER.md) (one table, updated at every stage transition). Full plan of record: `.claude/plans/okay-we-need-comprehensive-nifty-rabbit.md`.

## Shape

Two workstreams converge at a pilot site, then sites flow in tranches of 3-5:

- **Workstream A (factory hardening, one-time):** brand-consistency lint in the predeploy gate, extended `spinup_site.py` (STATE.md, migrations, CI entry, wave stub, prefix collision check), `vercel_create_site.py`, path-filtered CI matrix, template defect remediation, tranche-batched Supabase migrations.
- **Workstream B (niche research):** R0 preconditions (DataForSEO gate, 28d corpora, own-estate exclusion list) → R1 enumeration (4 independent sources) → R2 scoring + OWNER GATE → R3 per-niche dossier → R4 brand/domain lock (OWNER GATE, before any content).

## Assembly line per site

S1 brand lock (G1, owner) → S2 scaffold → S3 research pack seeded (G2, owner) → S4 machinery composition → S5 niche build (calculators with golden-figure tests, data asset, house_positions, rates ledger) → S6 content (NETNEW rules: Opus briefs, Sonnet writes, Haiku verifies-only, batch size 1) → S7 Vercel preview + live battery (G3/G4) → S8 domain-ready close-out.

## Hard rules

1. **Brand + domain locked before ANY content generation** (medical-trap rule). Enforced by the blog_generator brand-lock guard + `check_brand_consistency` in the predeploy gate.
2. Live sites untouched, except the sanctioned per-tranche Property `/api/leads/notify` allowlist deploy. Anything beyond that is a STOP condition.
3. No round-number targets: niche count and content volume are research outputs with shown derivations.
4. No cross-linking between estate sites, ever.
5. Content, meta, design, voice per the page-quality specification in the plan of record.
6. Nurture ships configured but DISABLED on new sites.
7. Preview hygiene: canonicals point at the future production domain, never *.vercel.app; GSC/IndexNow strictly post-domain-attach.
8. Pre-attach refresh: on domain-purchase day, run the rates-ledger lint + dated-reference sweep before DNS attach.
9. Cost guards are manager-owned: sub-agents must NEVER raise DATAFORSEO_ABORT_AT or any spend ceiling themselves, even process-locally. If a guard blocks a planned call, stop and report. (Rule added 2026-07-11 after two dossier agents raised the daily guard in-process; spend was small and documented, but the precedent is banned.)

## Git + tranches

New-site dirs are built on `expansion/tranche-N` branches (Phase 0 on `expansion/phase-0`), merged to main on full CI green. One Supabase migration pair per tranche (`sites` CHECK + `leads_source_valid`, rows `active=false` until G4). A failing site is dropped from its tranche, not a blocker for siblings.

## Definition of done ("domain-ready")

spinup_site_check exit 0; CI green; predeploy_gate green incl. brand lint; vitest green incl. calculator golden figures; an01 pass on the preview URL; console shows the site; STATE.md contains only human-only external steps.

## Debt ledger (deferred parameterisations)

| Item | Why deferred | Trigger to do it |
|---|---|---|
| `optimisation_engine/track2/pull_page_data.py` site_key='property' literal | Track 2 needs 28d+ GSC data new sites won't have | First Track 2 run for a non-property site |
| `scripts/track2_collapse_guard.py` SITE literal | Same | Same |
| `scripts/register_monitored_batch.py` SITE/PROD_DOMAIN/BLOG_DIR literals | monitored_pages registration deferred ~4 weeks post-domain | First registration for a new site |
| `optimisation_engine/corepage/` CORE_PAGES / ROOT_TOKENS / guide_audit BLOG+CLUSTERS | Corepage engine needs ranking data | First corepage run for a non-property site |
| leads source CHECK → FK refactor | Constraint change on a live table (STOP territory) | Only with explicit owner sign-off |
| Console query cost at 30 sites | Rollups presumed sufficient | Console slowness observed |
| contractors-ir35 + construction-cis blog `[slug]` pages lack `dynamicParams = false` (Property's 19MB ISR fix) | They are LIVE sites; edits reverted per live-site rule | Owner sign-off, then apply + deploy with their next ship |
| og:image SVG + missing favicon/schema on LIVE sites (solicitors, agency, others per presence audit) | Live-site rule; fixed in scaffold for new sites only | Owner sign-off on a presence-fix wave |
