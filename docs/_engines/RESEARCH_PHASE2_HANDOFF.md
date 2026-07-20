# Research-Authority Program: HANDOFF (2026-07-20)

You are taking over mid-program. Read this fully before acting. It tells you exactly
what is done, what is in-flight, what to build next, where, and the rules.

## 0. The one-line mission
Make each of the 15 estate sites the CITED research standard for its niche, via
proprietary, data-derived research assets (data pages + gold-standard content), fully
schema'd and exposed to AI. This is the portfolio's growth lever: the estate is FLAT
(saturated at current domain authority); proprietary data is the only compounding
authority a faceless brand can build, and it unlocks head terms + AI citations.

## 1. IMMEDIATE DIRECTIVE (why this handoff exists)
Owner reviewed Phase-2 batch-1 (3 sites, built with only 2 posts + 2 research assets
each) and said that is TOO THIN. **Do NOT deploy batch-1 yet. First EXPAND each of the
3 batch-1 sites to comprehensive depth** (more research assets + more content, matching
or exceeding the construction pilot's 2 research pages + 4 posts), THEN deploy.
Comprehensive = build what the scouts already found, not a token extra. "Boat load" of
data-derived answers, never thin. Owner spend is NOT a constraint; quality IS the strategy.

## 2. IN-FLIGHT: none. (Dental expansion DONE - see below.)
Dental data expansion agent `aef2f5690` COMPLETED + COMMITTED (11c012c1). It added 2 new
dental research pages (build green, 311pp):
- `/research/dental-practice-density` - CQC Care Directory: 12,035 dental locations,
  per-100k by region (London 24.59 highest, East Midlands 17.24 lowest). Ingester
  `optimisation_engine/ingestion/ingest_dental_density.py`. CAVEATS to flag/verify:
  ONS regional population denominators are HARDCODED constants (mid-2024, not downloaded);
  CQC CSV URL is date-stamped-hardcoded (15_July_2026) - update constants on re-run.
- `/research/dental-company-formation-index` - SIC 86230 via engine (niche config
  `research/niches/dentists.py`): TTM 2,452 formations, decade +139.2%, March seasonality.
FIRST ACTION for you: fact-check these figures vs the JSONs (manager rule), then WRITE
CONTENT for these 2 new dental assets (dental-deserts / access piece; dental company
formation trend) + run dental finalize QA again. Dental now has 4 research pages, needs
its post count brought up to ~4-5 total.

## 3. WHAT IS DONE
### Engine (Phase 0) - reuse, do not rebuild
`optimisation_engine/ingestion/research/` = config-driven Companies House SIC ingestion
engine. Generalizes the old bespoke ingesters (now shims). Per-niche `NicheConfig` in
`niches/*.py` (segments, secondary sources, thin-gate). Run:
`python -m optimisation_engine.ingestion.research.engine --site <key> --execute --no-supabase`
(`--pilot` writes temp; `--dry-run` writes nothing). Snapshot JSON is consumed at build
by a `/research/<slug>` page. Pattern proven: real API/CSV -> JSON snapshot in
`{site}/web/src/data/*.json` -> `/research/<slug>` page (inline Dataset + FAQPage JSON-LD)
+ `<slug>/data/route.ts` CSV route + charts component + TS types lib.

### construction-cis pilot - DEPLOYED + LIVE (commit 89d1e6fb)
Live: /research/uk-construction-index (8 trade segments + seasonality),
/research/uk-construction-insolvency-index, 4 posts, llms.txt + llms-full.txt.
Verified 200s on www.tradetaxspecialists.co.uk. Owner Request-Indexing of the 6 URLs = OPEN.
STRUCTURAL TEMPLATE to copy for any new research page:
`construction-cis/web/src/app/research/uk-construction-insolvency-index/page.tsx`,
its charts component, `.../lib/research/insolvency-index.ts`, `.../data/route.ts`.

### Phase-2 batch-1 - BUILT + COMMITTED (e7374c63), NOT DEPLOYED, NEEDS EXPANSION
All three build green, QA-clean, AI-exposed, every figure fact-checked vs source JSON:
- **Dentists** (Dental Finance Partners, prj_f3tGDR4zozATcYOSLMmCqO2ZInNV, dentalfinancepartners.co.uk):
  /research/nhs-dental-activity-index (national recovery 100.3; per-ICB recovery is NULL
  in data so page shows UDA VOLUME by ICB, NOT recovery - keep it that way),
  /research/nhs-dentist-earnings-index (net GBP78,200). 2 posts. 307pp.
- **charities/Trustee Tax** (prj_ckcgp2JjoBzJ9ihNZfdacdgYUuEG, trusteetax.co.uk):
  /research/uk-charity-survival-index, /research/uk-charity-scrutiny-cliff. 2 posts. 78pp.
  Extends pre-existing /research/uk-small-charity-finance-index.
- **Solicitors** (Accounts for Lawyers, prj_fCtGxawB5DvMonbUtgyOJRJZUzQ9, accountsforlawyers.co.uk):
  /research/uk-legal-incorporation-index, /research/law-firm-survival-index. 2 posts. 304pp.

## 4. THE EXPANSION TO BUILD NOW (per site, before deploy)
Full confirmed sources per site are in `docs/_engines/RESEARCH_PHASE2_SPECS.md` (READ IT).
Build 1 agent per site (cross-site parallel is SAFE; intra-site MUST be sequential -
same-site agents collide on sitemap.ts + research hub + shared charts; see lesson 7.2).
Target each site to ~2-4 research assets + ~4-5 gold-standard posts total.

- **Dentists**: finish agent aef2f5690's work (CQC density map + SIC-86230 formation index).
  Add content: "dental deserts" (CQC density), dental company formation/seasonality.
  Optional extra: GDC registrant trend (PDF-only, manual - lower priority).
- **charities**: the cause-income + reserves-health data is ALREADY BUILT and staged
  (`charities/web/src/data/charity-cause-income.json` + `lib/research/cause-income.ts`)
  but has NO page/content yet. Build a /research/uk-charity-cause-income page (median
  income + reserves-health by cause) + content ("which causes thrive vs struggle",
  "charity reserves health"). Add regional density if quick.
- **Solicitors**: add SRA/ABS growth + solicitor-roll attrition (218,036 on roll vs
  177,841 practising) and/or Section-M insolvency context as a page/section + content.
  SRA LICENCE: aggregate stats + attribution only, NEVER named-firm rankings (reputational
  -damage clause). Keep SRA-STOCK vs CH-FLOW distinct (never imply 98% of law FIRMS are Ltd;
  98% is new-incorporation FLOW).

Then per site: re-run finalize (two-track QA + refresh llms.txt + build green), then
bring all 3 to the owner for the DEPLOY GATE (owner has not approved deploy).

## 5. CONTENT + DATA STANDARD (how to build)
- Data build: 1 Sonnet agent per site, sequential intra-site, mirrors the construction
  research-asset structure. Manager (you, Opus) FACT-CHECKS every published figure against
  the source JSON directly (locked rule). Ingesters must DERIVE from data, not hardcode
  (one caveat: dental earnings time-series is the published NHS Digital bulletin table -
  acceptable, attributed; openpyxl XLSX parse failed).
- Content: 1 Sonnet agent per post, PARALLEL across separate .md files is safe. Each post:
  HTML-in-frontmatter .md in `{site}/web/content/blog/`, read an existing post for the
  exact frontmatter contract, embed exact figures (agent reads the JSON), inline
  <sup><a href="#ref-N"> citations + Sources <ol>, cite our /research page + the OGL source,
  internal links to REAL slugs only, keyTakeaways + faqs, sourcesVerifiedAt, faceless author
  ("<Brand> Editorial Team"). metaTitle <=60, metaDescription <=160.
- AI exposure per site: llms.txt "Research and data" section listing every index;
  ensure `src/app/llms-full.txt/route.ts` exists (uses shared buildLlmsFullRoute; some sites
  lacked it - add by copying Dentists' route). Dataset JSON-LD on every research page.

## 6. DEPLOY MECHANICS (owner-gated; only after owner approves)
Vercel CLI IS installed (v55, authenticated jeff-9946) - ignore the false SessionStart hook.
Deploy from REPO ROOT with env override (no cd), --archive=tgz:
`VERCEL_PROJECT_ID=<id> VERCEL_ORG_ID=team_XF9WAygZX7SGk9Fo4tOAnihH vercel deploy --prod --yes --archive=tgz`
Project IDs above. .vercelignore present; keep worktrees clean. After deploy: verify live
200s on the custom domain + spot-check llms-full.txt carries the posts; give owner the URL
list for GSC Request Indexing. Commit work before/after (branch expansion/phase-0); auto-commit
is OFF; cluster pushes.

## 7. LOCKED RULES + LESSONS
7.1 Rules: gold-standard never-thin; NO em-dashes (and no &mdash; entities) use commas/
    parentheses/full stops; faceless (no named expert/quotes; owner is not an accountant);
    model tiering (Haiku grunt no-content, Sonnet build/write, Opus reason/judge/brief);
    manager fact-checks data direct; fan out to subagents keep manager context clean;
    deploy owner-gated; no auto-commit; two-track QA (factual vs source + editorial vs
    helpful-content); OGL v3.0 attribution on gov data.
7.2 Collision lesson: same-site concurrent build agents corrupt shared files (sitemap.ts,
    research hub page, shared charts). Run intra-site work in ONE sequential agent.
    Cross-site parallel is fine.
7.3 Workflow lesson: `Workflow` re-invoked via `scriptPath` + `args` does NOT
    re-parameterize (kept original construction args, wasted ~4M tokens across 3 runs).
    Bake niche into a fresh inline `script`, not scriptPath+args. Do NOT run multiple
    65-agent discovery workflows concurrently (Anthropic server rate-limits, synth dies).
    For replication use LIGHT per-site scouts (plain agents, explicit niche in prompt) -
    the universal template is already known; full discovery is overkill.
7.4 Never run QA/judge on a `model:opus` subagent (silent hang) - inherited/Sonnet only.

## 8. AFTER BATCH-1 (queued)
- **Wave B (construction-cis)**: HARVEST found dissolutions + net-formation are
  BUILDABLE_NOW via ch_hits() with company_status=dissolved + dissolved_from/to (NO bulk
  download). Then insolvency-by-SIC-subsector (41/42/43, Insolvency Service quarterly XLSX),
  ONS survival (single XLSX), PPR slow-payer league table (direct CSV, PR magnet). Spec +
  URLs in RESEARCH_PHASE2_SPECS.md and the Wave B task. Skip calculators (owner not interested).
- **Phase-2 batch-2+**: remaining sites (care, contractors-ir35, digital-agency, ecommerce,
  hospitality, pharmacies, crypto, startups-tech, generalist; Property + Medical already have
  partial assets). Same flow: light scout -> build -> content -> finalize -> deploy gate.

## 9. KEY FILES
- Plan: `C:\Users\user\.claude\plans\okay-then-let-s-say-adaptive-phoenix.md`
- Phase-2 specs (confirmed sources per site): `docs/_engines/RESEARCH_PHASE2_SPECS.md`
- Memory: `...\memory\research_authority_program.md` (+ MEMORY.md index line)
- Engine: `optimisation_engine/ingestion/research/`
- Template page: `construction-cis/web/src/app/research/uk-construction-insolvency-index/`
- Task list (harness): tasks #6 (Phase 2), #7 (Wave B), #8/9/10 (batch-1 sites, DEPLOY-READY-pending-expansion).

## 10. FIRST ACTIONS FOR THE NEXT AGENT
1. Dental DATA expansion is done+committed (11c012c1). Fact-check its CQC density + SIC-86230
   figures vs the JSONs, then write CONTENT for the 2 new dental pages (dental-deserts/access;
   dental formation trend) - dental needs ~4-5 posts total.
2. Launch charities + Solicitors DATA expansion agents (parallel, cross-site safe) per section 4
   (charities: page for the STAGED cause-income/reserves data + regional; Solicitors: SRA/ABS +
   solicitor-roll attrition + Section-M insolvency, aggregate-only). Then content for each.
3. After all data+content expands: per-site finalize QA + build green, then present all 3 to
   owner for the DEPLOY GATE. Do not deploy before owner approval.
Latest commits: 89d1e6fb (construction pilot, LIVE), e7374c63 (batch-1 core), 11c012c1 (dental expansion).
