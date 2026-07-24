# divorce-finances (placeholder brand) site state

Last updated 2026-07-24 (SCAFFOLDED, pre-launch).

brand_locked: true

Real brand and domain deferred to owner gate G1; all content bodies must stay
brand-agnostic (zero brand-name mentions) until then. Phases 0-2 (scaffold +
staging) complete and committed 2026-07-24; Phase 3 (integrate `_staging/` +
fact-verify) is next.

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
