# divorce-finances (placeholder brand) site state

Last updated 2026-07-28 (Phases 0-5 COMPLETE; Phase 6 next, owner-GO'd).

brand_locked: true

Real brand and domain deferred to owner gate G1; all content bodies must stay
brand-agnostic (zero brand-name mentions) until then. Phases 0-5 complete and
committed on `expansion/phase-0` (unpushed): scaffold, staging integrated,
fact-verify done, engine registration, 5 calculators + 2 research assets + 4
pillars + 3 commercial hubs, plus Phase-5 wave-1 (8 spokes). `_staging/`
deleted. 5 wave-2 spokes sit UNTRACKED (07-24), pending commit + QA. Phase 6
(nurture / Supabase migration / Vercel) approved by owner 2026-07-28.

## Identity

- site_key `divorce-finances` | placeholder display name **TBD** | placeholder domain `www.placeholder-divorce-domain.example`
- IndexNow key registered in `optimisation_engine/indexing/config.py` (`4d2abeb261e1ca7875c6f16ee1257ac4`); public `<key>.txt` file NOT yet created (created at G1 rename, per the real domain)
- Real brand + domain: TBD at owner gate G1

## Status

- [x] Content/ops engine registration (this pass, 2026-07-24): routing_safety,
      GSC/Bing client maps, IndexNow config, spinup_site + spinup_site_check
      registries, `sites/divorce-finances.json`, CI build matrix entry
- [ ] blog_generator site_config (`divorce_finances.py`) — authored on a
      separate concurrent track, not touched here
- [ ] divorce-finances/web scaffold (owned by a separate build track; not touched here)
- [ ] Phase 3: integrate `_staging/` content + fact-verify
- [ ] Topic pool -> blog_topics seed (site_key=divorce-finances)
- [ ] Wave content generation
- [ ] Calculators + pillar pages + research assets build
- [ ] Vercel project + domain (gated on real brand/domain decision at G1)
- [ ] Request Indexing / GSC + Bing verification (post real-domain attach)

## Notes

- Jurisdiction default: England and Wales; state explicitly where Scotland differs.
- Follow the same prohibited-topics / hallucination-zone discipline as the
  wills-probate build once `divorce_finances.py` site_config lands.
