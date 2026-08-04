# wills-probate (Probate Compass) site state

Last updated 2026-08-04 (CONTENT BUILD COMPLETE, 146 posts; Phase-6 code prep
DONE; remaining = owner externals at G1).

brand_locked: true

Placeholder brand "Probate Compass"; all content bodies brand-agnostic (zero
brand-name mentions); real brand and domain decided at G1 pre-deploy. Site
scaffolded + calculators + pillars + research assets committed on
`expansion/phase-0`. Content: **complete, 146 posts** across all 7 categories
(Probate Process, Making a Will, Inheritance Tax, Executors, Intestacy,
Pensions and IHT 2027, Power of Attorney); wave 4 batches B5/B6 plus QA and
figure-reconciliation fixes landed `fb66e0bd` through `3319bfc4`. The earlier
"23 cards unwritten" / "stray untracked post" state is stale: everything is
committed, tree clean. Provenance: 89 of 146 posts tag
`generator: claude-fable-5`; the other 57 carry no generator field. A quality
audit found the untagged posts meet the same bar (correct arithmetic,
primary paragraph-level citations, zero fabricated statistics, zero
em-dashes), so this is a policy question for the owner under the Opus-only
rule (see `PHASE6_G1_RUNBOOK_2026-08-04.md` section (d)), not a quality
remediation. Deploy still gated on owner G1 (brand + domain), which owner has
NOT yet released.

**Phase-6 code prep done 2026-08-04** (mirrors the divorce-finances pass):
migration verified apply-ready and storage-prefix-safe (`wpc`, not `bfp`);
`blog_generator` internal-link slug list was stale/empty, regenerated from
the full 146-post corpus; `tsc --noEmit` and `npm run build` both clean (210
static pages); 4 posts with `metaDescription` over 160 chars trimmed; nurture
confirmed fail-closed without `CRON_SECRET`. Full detail and G1 runbook:
`docs/wills-probate/PHASE6_G1_RUNBOOK_2026-08-04.md`.

## Identity

- site_key `wills-probate` | placeholder display name **"Probate Compass"** | placeholder domain `www.probate-compass-placeholder.co.uk`
- IndexNow key registered in `optimisation_engine/indexing/config.py` (`37e0691c896359206d633a53c60877c0`); public `<key>.txt` file NOT yet created (created at G1 rename, per the real domain)
- Real brand + domain: TBD at owner gate G1

## Status (per `docs/wills-probate/TOPIC_POOL_2026-07-24.md`)

Topic pool ranked and wave-bucketed: wave1=14, wave2=13, wave3=28, wave4=64.

- [x] Content/ops engine registration (this pass, 2026-07-24): routing_safety,
      blog_generator site_config, GSC/Bing client maps, IndexNow config,
      spinup_site + spinup_site_check registries, `sites/wills-probate.json`,
      CI build matrix entry
- [x] wills-probate/web scaffold
- [x] Topic pool -> blog_topics seed (site_key=wills-probate)
- [x] All waves complete: 146 posts, all committed, tree clean
- [x] Calculators + pillar pages + research assets build
- [x] Phase-6 code prep (2026-08-04): migration verified, blog_generator
      internal-link slugs regenerated, build verified, corpus spot-guard
      clean, runbook written
- [ ] Migration apply (owner / SQL editor)
- [ ] Vercel project + domain (gated on real brand/domain decision at G1 — HELD by owner 2026-07-28)
- [ ] Fable-authorship policy decision (owner, see PHASE6_G1_RUNBOOK section (d))
- [ ] Test-lead cycle end to end
- [ ] Request Indexing / GSC + Bing verification (post real-domain attach)

## Notes

- All statutory figures locked in `optimisation_engine/blog_generator/site_configs/wills_probate.py`
  (`hallucination_zones`) must be quoted verbatim in generated content.
- Prohibited topics: equity release, pension product recommendations/transfers,
  contentious probate legal strategy, personal injury, claims management.
- Jurisdiction default: England and Wales; state explicitly where Scotland differs.
