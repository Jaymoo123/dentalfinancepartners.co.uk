# divorce-finances (placeholder brand) site state

Last updated 2026-08-04 (waves 1-4 written, content COMPLETE; Phase 6 = deploy plumbing remaining).

brand_locked: true

Real brand and domain deferred to owner gate G1; all content bodies must stay
brand-agnostic (zero brand-name mentions) until then. Phases 0-5 complete on
`expansion/phase-0`: scaffold, staging integrated, fact-verify done, engine
registration, 5 calculators + 2 research assets + 4 pillars + 3 commercial
hubs. Phase 6 approved by owner 2026-07-28.

## Identity

- site_key `divorce-finances` | placeholder display name **TBD** | placeholder domain `www.placeholder-divorce-domain.example`
- IndexNow key registered in `optimisation_engine/indexing/config.py` (`4d2abeb261e1ca7875c6f16ee1257ac4`); public `<key>.txt` file NOT yet created (created at G1 rename, per the real domain)
- Real brand + domain: TBD at owner gate G1

## Content state (2026-08-03)

- Wave 1: 8 spokes, committed (Phase 5)
- Wave 2: 4 spokes, committed `3c0b8f99` (earlier "5 wave-2 spokes UNTRACKED" note is stale; resolved as 4 committed)
- Wave 3: 16 spokes, committed `e35d6d11`
- Table backfill on the 12 legacy (wave 1 + 2) posts: DONE
- Wave 4: 13 spokes written 2026-08-04 (joint debts, mortgage-during-separation, stay-at-home parent, litigant in person, settlement examples, checklist, adultery, inheritance, legal aid, Scotland, expert costs, money after divorce, financial abuse). Content build COMPLETE; no wave 5 planned.
- Live blog corpus: 45 posts in `divorce-finances/web/content/blog/` (4 pillars + 41 spokes)
- `optimisation_engine/blog_generator/site_configs/divorce_finances.py` `_INTERNAL_LINK_SLUGS` refreshed 2026-08-04 (45 posts + 3 hubs)

## Phase 6 remaining

- [ ] Supabase migration APPLY (owner / SQL editor)
- [ ] Vercel project
- [ ] Test-lead cycle end to end
- [ ] G1: real brand + domain decision, metadata swap, deploy

## Notes

- Jurisdiction default: England and Wales; state explicitly where Scotland differs.
- Prohibited-topics / hallucination-zone discipline enforced via
  `divorce_finances.py` site_config (mirrors the wills-probate build).
