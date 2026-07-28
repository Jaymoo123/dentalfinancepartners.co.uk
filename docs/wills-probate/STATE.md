# wills-probate (Probate Compass) site state

Last updated 2026-07-28 (CONTENT BUILD COMPLETE, pre-deploy).

brand_locked: true

Placeholder brand "Probate Compass"; all content bodies brand-agnostic (zero
brand-name mentions); real brand and domain decided at G1 pre-deploy. Site
scaffolded + calculators + pillars + research assets + waves 1-4 (~123 posts)
all built and committed on `expansion/phase-0` (unpushed). One stray untracked
post `how-much-does-it-cost-to-make-a-will.md` pending commit. Deploy still
gated on owner G1 (brand + domain), which owner has NOT yet released.

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
- [x] Waves 1-4 content generation (~123 posts committed; nurture sequences done)
- [x] Calculators + pillar pages + research assets build
- [ ] Commit stray post `how-much-does-it-cost-to-make-a-will.md`
- [ ] Vercel project + domain (gated on real brand/domain decision at G1 — HELD by owner 2026-07-28)
- [ ] Request Indexing / GSC + Bing verification (post real-domain attach)

## Notes

- All statutory figures locked in `optimisation_engine/blog_generator/site_configs/wills_probate.py`
  (`hallucination_zones`) must be quoted verbatim in generated content.
- Prohibited topics: equity release, pension product recommendations/transfers,
  contentious probate legal strategy, personal injury, claims management.
- Jurisdiction default: England and Wales; state explicitly where Scotland differs.
