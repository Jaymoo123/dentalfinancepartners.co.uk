# Expansion handoff — bring every Tier-1 site to the charities standard

Written 2026-07-12 (session close, branch `expansion/phase-0`). Owner directive: advance
every approved Tier-1 site to the same state as the charities pilot, so each sits
**G1-gated only** (owner picks brand + buys domain → content + preview flow immediately).
Methodology: [EXPANSION_PROGRAM.md](EXPANSION_PROGRAM.md). Live state:
[EXPANSION_TRACKER.md](EXPANSION_TRACKER.md). Plan of record:
`.claude/plans/okay-we-need-comprehensive-nifty-rabbit.md`.

## The charities standard (parity checklist per site)

What "done to charities standard" means — charities has ALL of these, committed:

1. **R3 dossier** — checker-verified, volume-enriched (COMPETITORS/TOPICS/LAUNCH_CORE/
   CALCULATORS/DATA_ASSET/HOUSE_POSITIONS_OUTLINE + raw evidence + re-runnable s1-s7).
2. **R4 brand shortlist** — RDAP-verified available names + trademark sanity
   (`pilot_charities/BRAND_SHORTLIST.md` + `r4_domain_check.py` are the template).
3. **S2 scaffold** — `optimisation_engine/ops/spinup_site.py` run: `<Niche>/web` dir,
   STATE.md (brand_locked: false), CI matrix entry, `sites/<site>.json` wave stub.
4. **S3 seeding** — Supabase `sites` row (active=false) + blog_topics seeded from the
   dossier pool with priority deciles (template `scripts/_seed_charities_topics.py`,
   SQL runner `scripts/_expansion_sql.py`; idempotence guard mandatory).
5. **S4 machinery** — site_configs/<site>.py, niche.config.json (brand = BRAND_TBD until
   G1), voice/seo_persona, spinup_site_check green.
6. **S5 niche build** — calculators with golden-figure vitest, data-asset pipeline RUN
   for real (not stubbed), house_positions.md (every position gov.uk-cited, second-pass
   verified), machine-readable rates ledger. Full test suite green (charities = 33).
7. **Wave-1 briefs** — Opus briefs for the launch core, BRAND-AGNOSTIC, verified
   figure-by-figure vs house_positions + every citation URL live-fetched, committed under
   `briefs/<site>/wave1/` with _INDEX.md (charities = 29 briefs).
8. **NOT done pre-G1 (hard rule, the medical trap):** any content generation, any brand
   literal in the corpus, Vercel project/preview. predeploy_gate hard-fails BRAND_TBD.

## Per-site work queue (order = tranche order; ONE site at a time through S2-S5, then
brief-prep agents can overlap the next site's S2)

| # | Site | Has | Needs |
|---|---|---|---|
| 1 | hospitality | R3 dossier (volume-enriched in its own run) | R4 shortlist → S2-S5 → briefs. NOTE: 4 Holloway Davies overlap posts — fence at brief level unless owner rules otherwise |
| 2 | care | R3 enriched 2026-07-12 | R4 → S2-S5 → briefs. Tracker note "after medical watch ~08-03" applies to DEPLOY, not build. Launch core: 22 pages + 3 tools (FNC calc promoted to 4th) + Care Provider Business Index |
| 3 | startups-tech | R3 dossier | R4 → S2-S5 → briefs. **Reflex SaaS conflict is an open owner question — flag before brief-writing, not after** |
| 4 | pharmacies | R3 enriched 2026-07-12 | R4 → S2-S5 → briefs. 26 pages + 3 tools + Openings & Closures Index (NHSBSA schema check is a build step). Medical-adjacency wall enforced at page level |
| 5 | crypto | R3 enriched 2026-07-12 | R4 → S2-S5 → briefs. Route around Koinly/Recap DIY heads per LAUNCH_CORE; HMRC-disclosure service page is the top money surface |
| 6 | ecommerce | R3 enriched 2026-07-12 | R4 → S2-S5 → briefs, BUILD LAST. 14-page core; side-hustle/platform-reporting block first. **Blocked-ish: generalist overlap ruling (6 live "Accountant For [ecommerce]" pages) should precede brief-writing** |
| — | manufacturing | R3 complete, PARK RECOMMENDED | Nothing until owner ratifies or overrides. If overridden: volumes already pulled, run s5b enrichment then the normal line |
| — | charities (pilot) | EVERYTHING | G1 only. On the pick: swap niche.config brand/domain → `predeploy_gate.py --site charities --brand-only` PASS → 29-page launch core from briefs → `scripts/vercel_create_site.py` + live battery |

## Standing rules that bind this work (do not re-derive)

- Brand+domain locked before ANY content; briefs are brand-agnostic; predeploy brand lint.
- Live sites untouched except per-tranche Property notify-allowlist deploy (STOP otherwise).
- One Supabase migration pair PER TRANCHE (t1: hospitality+care+startups-tech; t2:
  pharmacies+crypto; t3: ecommerce) — re-read live constraints before writing migrations
  (a live 'test' source was nearly dropped once).
- Content model tiering: Opus briefs, Sonnet writes, Haiku verify-only, batch size 1.
- Sub-agents run pipeline scripts SYNCHRONOUSLY (orphaned-background-job lesson) and NEVER
  touch spend guards. Manager may lift the DataForSEO daily guard via `DATAFORSEO_ABORT_AT`
  env (owner ruling 2026-07-11); paid-pull runner: `scripts/_r3_paid_pulls.py`.
- Producer/checker split for every research/brief artifact; no round numbers; every claim
  cited or backed by a raw file.
- No cross-linking between estate sites; distinct design tokens/voice/assets per site.

## Session-start ritual for whoever carries on

1. Read this file + EXPANSION_TRACKER.md; update tracker at every stage transition.
2. Check owner-decision queue (below) — anything answered unblocks its site immediately.
3. Take the topmost unblocked site in the queue and run its next stage. R4 shortlists for
   ALL queued sites can be produced in one early batch ($0, parallel agents) so the owner
   can pick brands in bulk.
4. Commit per completed stage; never leave verified work uncommitted at handoff.

## Owner decision queue (current)

1. **Charities brand pick (G1)** — `expansion_research/pilot_charities/BRAND_SHORTLIST.md`;
   re-verify RDAP before buying. Unblocks the entire pilot end-game same-session.
2. **Manufacturing PARK ratification** — data in `tier1_manufacturing/DOSSIER.md` (hire
   family 360/mo; dedicated brand earns zero hire traffic). Plus CBAM-cluster home ruling.
3. **Ecommerce vs Holloway Davies** — migrate-vs-fence on the 6 live pages (also the
   smaller hospitality 4-post and startups ~37-URL overlaps from the R2 era).
4. **Reflex SaaS conflict** — startups-tech positioning.
5. **Serper top-up** — unblocks every dossier's queued Google re-sweep (nice-to-have for
   builds; SERPs were compensated by fetch-verification).
6. **VERCEL_TOKEN in .env** — needed at each site's first preview (G4), not before.

## Blockers that are NOT blockers for this work

Vercel preview, domains, GSC/Bing, GA4, Resend — all post-G1/G4 per STATE.md checklists.
Everything in the parity checklist above is buildable today with zero owner input except
where a site's row says otherwise.
