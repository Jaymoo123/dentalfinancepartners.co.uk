# Research-Authority Program: HANDOFF (2026-07-23)

You are taking over mid-program. Read this fully before acting. This SUPERSEDES
`RESEARCH_PHASE2_HANDOFF.md` (that doc's top half is stale: it predates batch-1 deploy
and the batch-2 build sweep). The engine/rules/lessons in the old doc are still valid;
this doc is the current state + next actions.

## 0. Mission (unchanged)
Make each of the ~15 estate sites the CITED research standard for its niche via
proprietary, data-derived research assets (data-index pages + gold-standard blog posts),
fully schema'd (Dataset + FAQPage JSON-LD) and exposed to AI (llms.txt + llms-full.txt).
This is the portfolio's one compounding growth lever for a faceless brand: proprietary
data unlocks head terms + AI citations. Calculators are OUT (owner not interested).

## 1. WHAT IS LIVE (deployed to prod)
- **construction-cis pilot** (Trade Tax Specialists) - the original pilot, live.
- **batch-1: Dentists, charities, Solicitors** - DEPLOYED + live-verified 2026-07-23.
  Domains: dentalfinancepartners.co.uk, trusteetax.co.uk, accountsforlawyers.co.uk.
  Owner has the GSC Request-Indexing URL list (research pages + blog posts + llms-full).
  Nothing else below is deployed.

## 2. WHAT IS BUILT + COMMITTED (this session), NOT DEPLOYED
Commit `855ac834` on branch `expansion/phase-0`, pushed to origin. All figures were
grep-verified against source JSON (locked manager rule). Every site build is green,
including a content-inclusive re-verify for the three sites that got blog posts.
Owner-deploy-gated: DO NOT deploy without owner approval.

### Wave B (construction-cis) - data DONE, 3 of 4 posts DONE
- `/research/uk-construction-index` - added a net-formation section (union net +30,361 in
  2016 to +1,341 in 2025, -95.6%; SIC 41202 domestic first net-negative in 2025).
- `/research/uk-construction-insolvency-index` - deepened with a 41/42/43 division split
  (div43 56.3% share, div41 fastest-rising +79.9% decade).
- `/research/uk-construction-survival-index` (NEW) - 2019 cohort 43.3% vs 38.4% all-industry.
- `/research/uk-construction-payment-practices-league` (NEW) - 225 construction cos, median
  33 days to pay. **THIS PAGE NAMES REAL LARGE FIRMS** from their own statutory PPR
  disclosures (Alstom 71d slowest etc.), SIC-cross-referenced, with caveats. **OWNER MUST
  REVIEW THIS PAGE BEFORE IT DEPLOYS.** The matching blog post is HELD (unwritten) pending
  that review. The other 3 Wave B posts are written + QA-clean.

### Batch-2 research assets (6 sites) - data DONE + fact-checked
IMPORTANT: nearly every scout doc wrongly said a site was "greenfield". FIVE sites already
had a research page. Build agents were told to grep `*/web/src/app/research/` FIRST and
DEEPEN, not duplicate. Do the same for any future site.

- **hospitality** (brand "Hospitality Tax"): `/research/uk-hospitality-insolvency-index` (NEW;
  Section-I insolvencies TTM 3,523, +117.6% decade; survival 38.1% vs 38.4% = in line),
  `/research/uk-hospitality-food-hygiene-map` (NEW; FSA FHRS 375,015 establishments, 77.0%
  top-rated, AGGREGATE-only, no business named). Pre-existing
  `/research/hospitality-openings-closures-index` folded into the hub. CONTENT DONE (2 posts).
- **startups-tech** (brand "Founder Tax Partners"): `/research/uk-tech-funding-reliefs-index`
  (SEIS/EIS: EIS 3,735 cos/GBP1,575m, I&C 34.9%), `/research/rd-tax-relief-index` (46,950
  claims -26.4% YoY, I&C #1 26.2%), `/research/uk-tech-formations-index` (SIC 62012 +293.9%
  decade), `/research/tech-startup-survival-index` (2019 tech 37.0% vs 38.4%). Pre-existing
  `/research/startup-formation-survival-index` - cannibalisation on "survival" query RESOLVED
  via disambiguating cross-links (no retitle). CONTENT DONE (4 posts).
- **ecommerce** (brand: read from site config): `/research/online-seller-index` (deepened;
  SIC 47910 formations 10,316 in 2016 to 78,065 in 2025 = +656.7%, TTM 76,885, YoY -13.4%;
  paired with ONS internet-sales share), `/research/online-seller-survival-index` (NEW; Retail
  broad-group 2019 5yr 34.5% vs 38.4%, caveated as not 47910-specific). CONTENT PENDING.
- **pharmacies** (brand: read from site config): `/research/pharmacy-openings-closures-index`
  (deepened with real NHSBSA monthly data; 10,391 open May 2026 vs 11,206 Jan 2021, net -815;
  independents 4,024 to 5,075 while multiples 5,220 to 3,153; CH 47730 +314.1% decade),
  `/research/pharmacy-density-and-workload-index` (NEW; NE&Yorks 20.9 vs SE 14.99 per 100k;
  items/pharmacy 7,226 to 9,835 +36.1% while count 11,764 to 10,382 -11.7%). CONTENT PENDING.
  CAVEAT: the 3 assets carry 3 slightly different pharmacy totals (10,391 / 10,617 / 10,382)
  from 3 different NHSBSA datasets+dates - CONTENT MUST ATTRIBUTE EACH, not pick one canonical.
- **generalist** (brand "Holloway Davies", distinct locked design system - off-white+ink+orange,
  Geist Sans; respect it): `/research/uk-small-business-barometer` (815,280 incorporations FYE
  Mar 2026, 787,261 dissolutions, 23,151 insolvencies TTM 76% CVL, 5,690,265 businesses 99.85%
  SME), `/research/uk-sector-insolvency-league` (Construction 3,805/16.4%, Wholesale/retail
  15.0%, Accom/food 14.0%), `/research/uk-late-payment-index` (2026H1 mean 33.5d/median 31.0d,
  down from 39.1d; AGGREGATE only, no named firms), `/research/uk-business-density-map` (UK
  1,020/10k, London 1,436, Wales 742). CONTENT PENDING.
- **care** (brand "Care Home Tax"): `/research/uk-care-density-quality-index` (NEW; 14,797 CQC
  care homes, 480,491 beds, 4.4 beds per 100 age-65+, Good-or-above 76.0%, deactivation churn
  4.9%; care deserts Haringey 1.3/Hackney 1.4, AGGREGATE by LA only, NO home ever named),
  `/research/uk-care-business-survival-index` (NEW; 2019 cohort SIC87 45.5%, SIC88 63.9%,
  combined 58.8%), pre-existing `/research/care-provider-business-index` got a formation/
  seasonality section (union TTM 12,064, decade +62.5%). CONTENT PENDING.

## 3. NEXT ACTIONS (priority order)
### 3.1 Write CONTENT for ecommerce, pharmacies, generalist, care
Same flow as this session (proven): ONE Sonnet content agent per post, PARALLEL across
separate `.md` files (collision-safe). Content agents are LIGHT (no build) so parallelise
freely; they do NOT count against the build cap. Aim ~2-4 posts per site. For each post the
agent must:
- Read 1-2 existing posts in that site's `web/content/blog/` to copy the EXACT frontmatter
  schema + house body style (body = raw HTML in frontmatter, NOT markdown). Find the site's
  faceless brand name from its config; pick an EXISTING blog category (never invent one).
- OPEN the specific research JSON in `{site}/web/src/data/` and read exact figures (do not
  invent). Suggested figures + JSON per site are in section 2 above.
- Faceless author ("<Brand> Editorial Team" or blank if that is the site's convention);
  NO em-dashes or `&mdash;` (commas/parentheses/full stops/middle dots); inline
  `<sup><a href="#ref-N">` citations tied to a Sources `<ol>`; cite OUR /research page + the
  OGL source; internal links to REAL slugs only; keyTakeaways + faqs; `sourcesVerifiedAt`
  2026-07-23; metaTitle <=60, metaDescription <=160.
- Do NOT put a visible FAQ block in the body if the site auto-emits FAQPage JSON-LD from
  frontmatter `faqs` (it does) - frontmatter-only, else you double the content.
After each site's posts land: run the editorial QA sweep (see 3.4), fix defects, then run a
content-inclusive `npm run build` for that site to confirm green.

### 3.2 Build contractors-ir35 + digital-agency (last 2 batch-2 sites)
Specs: `docs/_engines/scout_batch2/contractors-ir35.md`, `.../digital-agency.md`.
- contractors-ir35: flagship = PSC formation reform-impact index (CH formations annotated
  against Apr-2017 + Apr-2021 off-payroll reforms). The niche config
  `optimisation_engine/ingestion/research/niches/contractors_ir35.py` ALREADY EXISTS but
  needs: a derived reform-overlay layer, a notes-bug fix (its "no survivorship bias" claim is
  FALSE for the live-only CH snapshot), and 3 new source refs (Insolvency Service + 2 ONS).
- digital-agency: flagship = agency survival/churn index (CH cluster 731/70210/74100/73200 +
  ONS Business Demography). One supplementary (slow-payment) needs a company-number->SIC join.
Use ONE build agent per site (intra-site sequential; cross-site parallel is fine). Same build
pattern as section 3.3.

### 3.3 The proven build pattern (copy exactly)
Per new research asset: real ingester (derive from source, NEVER hardcode) -> JSON snapshot in
`{site}/web/src/data/*.json` -> `/research/<slug>/page.tsx` with inline Dataset + FAQPage
JSON-LD -> `<slug>/data/route.ts` CSV export -> charts component (use recharts only if the site
already has it, else dependency-free inline SVG) -> TS types/formatter lib in
`{site}/web/src/lib/research/` -> add to the research hub + `sitemap.ts` -> a line under
"Research and data" in `{site}/web/public/llms.txt` -> ensure
`{site}/web/src/app/llms-full.txt/route.ts` exists (shared buildLlmsFullRoute). Structural
template to copy: `construction-cis/web/src/app/research/uk-construction-insolvency-index/`.
Engine: `optimisation_engine/ingestion/research/` (config-driven CH SIC ingester + per-niche
`niches/*.py`). Run: `python -m optimisation_engine.ingestion.research.engine --site <key>
--execute --no-supabase`.

### 3.4 Editorial QA (locked, 2-track) before any deploy
Read-only sweep per site's new posts: em-dash / `&mdash;` (hard fail), draft artifacts
(stray tags, placeholder cells), citation integrity (every inline `<sup>` matches a Sources
entry and vice versa), meta lengths, faceless author, internal-link validity, cannibalisation
vs sibling pages, cross-post sameness. Fix defects (surgical single-file agents), then rebuild.

### 3.5 DEPLOY GATE (owner-gated)
Present Wave B + all batch-2 sites to the owner for deploy approval. SPECIALLY flag the
construction `uk-construction-payment-practices-league` page (names firms - owner review).
Deploy mechanics: from REPO ROOT, env-override, `--archive=tgz` (see
`memory/vercel_cli_deploy_workflow.md` for the command + per-site VERCEL_PROJECT_IDs; batch-1
IDs are in `memory/research_authority_program.md`). Vercel CLI v55 installed, authed jeff-9946.
After deploy: verify live 200s on the custom domain + spot-check llms-full carries the posts +
give owner the URL list for GSC Request Indexing. Commit + cluster pushes; auto-commit is OFF.

## 4. LOCKED RULES (apply to all work)
Gold-standard never-thin; NO em-dashes (and no `&mdash;`); faceless (no named expert/quotes -
owner is not an accountant); model tiering (Haiku grunt no-content, Sonnet build/write, Opus
reason/judge/brief; never run QA/judge on a `model:opus` subagent - silent hang); manager
(you) fact-checks EVERY published figure vs source JSON directly; fan out to subagents, keep
manager context clean; deploy owner-gated; no auto-commit; two-track QA; OGL v3.0 attribution
on gov data; aggregate-only + never name individual businesses for CQC/FSA/SRA-style sources
(reputational). See `memory/` index for the full locked-rule set.

## 5. LESSONS FROM THIS SESSION (bank these)
1. **Scout "greenfield" labels are unreliable** - 5 of 6 batch-2 sites already had a research
   page. Every build agent MUST grep `*/web/src/app/research/` first and deepen, not duplicate.
2. **Local build cap ~3** concurrent `npm run build` agents (more thrashes CPU/memory ->
   failures). Content agents are light (no build) - parallelise those freely. Vercel deploys
   build remotely, so they do not count against the local cap.
3. **Fact-check by grep, not full Read** - grep the JSON for the specific claimed numbers;
   full JSON reads (esp. the PPR file at 3,668 lines) burn context fast.
4. **A batch-2 subagent can die mid-stream** (API stall). Check the site's actual filesystem
   state (git status + ls) rather than trusting a garbled final message; relaunch with a
   "reuse already-downloaded raw data, clean any partial files" instruction.
5. **Cannibalisation** is real when a new page shares a head term with a pre-existing one
   (startups-tech "survival"). Fix = disambiguating cross-links + methodology statement, NOT
   retitling the incumbent page (protect its existing SEO equity - minimal-intervention rule).
6. Raw source dumps (`.ods`/`.xlsx`, tens of MB) must NOT be committed - now gitignored via
   `**/pipeline/raw/` and `/tmp/`. Commit the JSON snapshots + ingesters (regenerable), not
   the raw downloads.

## 6. KEY FILES
- This handoff: `docs/_engines/RESEARCH_HANDOFF_2026-07-23.md` (supersedes RESEARCH_PHASE2_HANDOFF.md)
- Batch-2 scout specs: `docs/_engines/scout_batch2/{site}.md` (all 8 sites)
- Batch-1 build specs: `docs/_engines/RESEARCH_PHASE2_SPECS.md`
- Engine: `optimisation_engine/ingestion/research/` (+ `niches/*.py`)
- Template page: `construction-cis/web/src/app/research/uk-construction-insolvency-index/`
- Memory: `memory/research_authority_program.md` (+ MEMORY.md index line)
- Deploy: `memory/vercel_cli_deploy_workflow.md`
- Latest commit: `855ac834` (Wave B + batch-2 builds + content), on `expansion/phase-0`, pushed.

## 7. STILL OPEN ELSEWHERE (not this program, do not lose)
- Owner GSC Request-Indexing of the batch-1 URL list (owner action).
- construction-cis Wave B + batch-2 all await the owner DEPLOY GATE.
