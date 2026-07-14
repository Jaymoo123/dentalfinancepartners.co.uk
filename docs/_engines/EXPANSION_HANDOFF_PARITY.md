# Expansion handoff — bring every Tier-1 site to the charities standard

Updated 2026-07-13 after the parity session of 2026-07-12 (see "Progress log" below):
all six R4 shortlists are done, and hospitality + care are at FULL parity minus wave-1
briefs. Originally written 2026-07-12 (branch `expansion/phase-0`). Owner directive: advance
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

All six R4 brand shortlists were batch-produced + independently RDAP re-verified 2026-07-12
(`expansion_research/tier1_*/BRAND_SHORTLIST.md`); owner can pick brands in bulk.

| # | Site | Has (as of 2026-07-13) | Needs |
|---|---|---|---|
| 1 | hospitality | R4 + **S2-S5 DONE 2026-07-12** (3 calculators 30/30 tests; Openings & Closures Index run for real, pub headline 42,280; house_positions 28 positions checker-verified; 1,257 topics seeded) | Wave-1 briefs ONLY (Opus-heavy; owner budget-gated it 2026-07-12). Fence the 4 Holloway Davies overlap posts at brief level unless owner rules otherwise |
| 2 | care | R4 + **S2-S5 DONE 2026-07-12** (4 calculators incl. FNC & fee-mix, 18/18 tests; Care Provider Business Index run for real, 67,261 companies / 57,725 CQC locations; house_positions 30 positions checker-verified; 652 topics seeded) | Wave-1 briefs ONLY. "after medical watch ~08-03" applies to DEPLOY, not briefs |
| 3 | startups-tech | R4 shortlist (rec: Founder Finance Partners, prefix ffp); Supabase sites row + leads source already LIVE via t1 migration pair | S2-S5 → briefs. **Reflex SaaS conflict is an open owner question — flag before brief-writing, not after** |
| 4 | pharmacies | R4 shortlist (rec: Pharmacy Finance Partners, phfp); R3 enriched | S2-S5 → briefs (t2 migration pair with crypto — ONE pair). 26 pages + 3 tools + Openings & Closures Index (NHSBSA schema check is a build step). Medical-adjacency wall at page level |
| 5 | crypto | R4 shortlist (rec: Digital Asset Tax Partners, datp); R3 enriched | S2-S5 → briefs (t2 pair with pharmacies). Route around Koinly/Recap DIY heads; HMRC-disclosure service page is the top money surface |
| 6 | ecommerce | R4 shortlist (rec: Ecommerce Tax Partners, ectp); R3 enriched | S2-S5 → briefs, BUILD LAST (t3 pair). 14-page core; side-hustle/platform-reporting block first. **Generalist overlap ruling should precede brief-writing** |
| — | manufacturing | R3 complete, PARK RECOMMENDED (no R4 run, deliberately) | Nothing until owner ratifies or overrides |
| — | charities (pilot) | EVERYTHING | G1 only. On the pick: swap niche.config brand/domain → `predeploy_gate.py --site charities --brand-only` PASS → 29-page launch core from briefs → `scripts/vercel_create_site.py` + live battery |

## Progress log + operational learnings (2026-07-12 session)

- **Commits** (all on `expansion/phase-0`): R4 batch → hospitality S2 / S3 / S4 / S5 →
  care S2+S3 / S4 / S5. Working pattern that held: Sonnet workers build (S4 machinery port,
  calculators, data-asset pipeline, house_positions producer), Haiku checker verifies
  house_positions, manager independently re-runs checker/build/tests + brand/em-dash lint
  before every commit, and reconciles figures ACROSS agents (caught FNC year-label mismatch).
- **t1 Supabase migration pair APPLIED live 2026-07-12** (hospitality+care+startups-tech rows,
  active=false). The mandatory live-constraint re-read caught TWO would-be regressions:
  generator omitted 'charities' and the live 'test' lead source. Generator lists fixed in
  `optimisation_engine/ops/spinup_site.py`. **Gotcha: re-running spinup for a same-tranche
  site on the same day OVERWRITES the applied migration files — `git checkout` them back
  after the run** (done for care; will recur for startups-tech, pharmacies/crypto t2).
- `scripts/spinup_site_check.py` check 08 now parses the current `SITES='dir|url'` CI format.
- **Generic seeder**: `scripts/_seed_expansion_topics.py <site_key> <pool_final.json> <tag>`
  (idempotence-guarded) replaces per-site seed scripts.
- **s5b finalise**: hospitality lacked one; pattern = copy `pilot_charities/s5b_finalise.py`,
  apply manager judgment to `borderline_for_judgment` (restore false positives, keep
  estate-overlap dupes fenced), junk-sweep, cluster. Care/pharmacies/crypto/ecommerce already
  have `topic_pool_final.json` — check before writing a new s5b.
- **New ground truths found during S5 verification** (memory + `docs/care/rates_ledger.json`):
  FNC £267.68/week is the **2026-27** England rate (2025-26 was £254.06); **BADR 18% from
  6 Apr 2026** (spec docs assumed 10% — estate-wide stale-figure sweep pending); tronc NIC
  exemption anchors to **NIM02922**, not NIM02935 (outline was wrong).
- S4/S5 reference implementations, freshest first: care → hospitality → charities.

## Demand-vs-coverage parse (run 2026-07-13; re-runnable, works on ANY site)

> **EXECUTED 2026-07-14** for contractors-ir35 / dentists / agency / generalist (enriched in
> place) and construction-cis (pool built from scratch). Full results + tooling:
> [CONTENT_GAP_ENRICHMENT.md](CONTENT_GAP_ENRICHMENT.md).


One query + one ratio per site: `SELECT site_key, count(*), count(search_volume),
sum(search_volume), count(*) FILTER (WHERE used) FROM blog_topics GROUP BY site_key`
(via `scripts/_expansion_sql.py`), read against live md counts in `<Site>/web/content`.
"Measured volume" counts only clusters with a DataForSEO figure; null-volume topics are
uncounted long-tail, so these are FLOORS.

**New niches (pre-launch), measured monthly volume in pool:**
charities 116,600 · crypto 114,690 (heads are DIY/brand noise — koinly 6,600, blockchain
explorer 6,600; usable money volume is far lower, per the dossier's route-around ruling) ·
hospitality 34,300 · pharmacies 18,080 (dominated by one informational head, drug tariff
14,800) · ecommerce 16,400 · care 6,750 · manufacturing 0 measured (supports PARK).

**Existing sites — the actionable findings:**
1. **medical: 62 topics, ALL volume-measured (32,926/mo), 0 used.** The whole enriched pool
   sits untouched. Content is deploy-held by the discovery watch (~08-03), but briefs/writing
   are not.
2. **solicitors: 65 of 78 topics unused, 27,980/mo measured.** Biggest ready-to-write
   backlog with known demand.
3. **property: pool 85% exhausted (423/495 used).** The next constraint is pool REFILL
   (R3-style sweep), not writing.
4. **dentists (139), generalist (303), agency (314), contractors-ir35 (644 topics, only 225
   used): ZERO volume data.** Their pools predate volume enrichment. The R3 paid-pull step
   (`scripts/_r3_paid_pulls.py`, ~$0.25-0.42/site) would rank these backlogs by measured
   demand — contractors-ir35 alone has 419 unused topics currently ordered blind.

Recipe to onboard an existing site to this parse: run the DataForSEO enrichment against its
blog_topics primary keywords → backfill search_volume/keyword_difficulty → re-decile
priority. Same spend guard rules as R3 (manager-only lift via DATAFORSEO_ABORT_AT).

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
3. Take the topmost unblocked site in the queue and run its next stage. As of 2026-07-13
   that is: **startups-tech S2** (its DB rows are already live; flag Reflex before briefs),
   OR hospitality/care wave-1 briefs if the owner has released the Opus budget for them.
4. Commit per completed stage; never leave verified work uncommitted at handoff.
5. Budget note (owner, 2026-07-12): weekly token allocation is tight — S2-S4 are cheap
   (scripts + one Sonnet worker), S5 costs ~3 Sonnet workers + 1 Haiku checker, briefs are
   the expensive Opus stage. Ask before starting a briefs batch unless already released.

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
