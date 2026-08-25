# NEW-NICHE SITE BUILD PLAYBOOK + HANDOFF
Date: 2026-07-24. Distilled from the wills-probate build (executed same day, this is the as-run process including corrections). For: a fresh agent building the NEXT screener-approved niche site end-to-end. First target: **divorce-finances** (screener #2, 59.9, owner-approved fast-follow as a SEPARATE site).

## Ground rules (locked, non-negotiable)
- **Opus-only content bodies** (blog posts, pillar copy, research assets, nurture copy): subagents on the INHERITED session model. NEVER pass model:opus override (hangs silently). Sonnet = mechanical build/scaffold/integration only. Haiku = grunt scripts, never content.
- A* gold-standard bar; no em or en dashes anywhere (ranges = "£X to £Y"); blog body = raw HTML in frontmatter; British English.
- Faceless authority: owner is NOT a solicitor/adviser. No named experts, no "legal advice"/"financial advice" except in negation, no regulated-activity claims, no product advice (for divorce: no pension-sharing product recs, no mortgage products). Information + free calculators + "speak to a specialist" handoff only.
- Entity: new brand = trading name of Ashfield Trading Ltd (CH 16358723, 20 Ashfield Avenue, Shipley, Bradford BD18 3AL). /contact-only. Mandatory consent checkbox. Leads → estate Supabase `leads` with new source value.
- **Brand/domain DEFERRED to G1 (end of build). Do NOT ask the owner about branding — ever — until G1.** Build under a greppable placeholder brand + placeholder domain confined to niche.config.json (grep gate pre-deploy). Prepare a silent brand-shortlist doc for G1. Bodies brand-agnostic.
- Wave batch size 1: one subagent per topic, parallel. Auto-commit OFF; manager commits per phase; pushes clustered at session end. Local-first; prod deploy needs owner sign-off. `optimisation_engine/niche_screener/` code is READ-ONLY (running the instrument to produce an export is allowed).
- YMYL day-one hygiene: entity schema + sameAs, SSR blog links, stable sitemap lastmod, research data-PR assets with primary-source citations, IndexNow at deploy, zero off-topic content.

## Phase 0 — Research inputs
1. If the niche lacks a full research export (`optimisation_engine/niche_screener/out/<niche>_research_export/` with universe/volumes/serps/classify/gates), run the screener instrument to produce one. universe.json items = {q, intent(DIY/DELEGATION/OTHER), source} — there is NO dropped_off_niche field; use all queries.
2. Build ranked topic pool (script in scratchpad, outputs to `docs/<site>/TOPIC_POOL_<date>.{json,md}`):
   - Exclude non-UK jurisdictions + brand-bank lookups. Scotland stays, tagged.
   - Thinness per query from serps.json/classify.json (UGC/GOV-heavy top-10 = soft); unsampled inherit family mean. Score = (volume+10) × thinness.
   - Cluster same-intent variants into topics (sub-cluster big families by trigger; do NOT split near-duplicates into filler).
   - ADD curated strategic topics (calculator companions, reg-shock cluster, pillar support) flagged origin="strategic".
   - **ADD competitor corpus mining (learned late in wills build — do it up front)**: fetch specialist domains' sitemaps/blog indexes (domain list from classify.json), harvest all content URLs/titles (~15 domains), cluster to topics, dedupe by MEANING vs pool, append candidates with domain-coverage counts → `docs/<site>/COMPETITOR_CORPUS_<date>.{md,json}`. Target pool 115-150 topics, waves 1-4 assigned (wave1 = heads + calculator companions ~14).
3. Derive the calculator fleet FROM DATA, never a round number. Selection rule per tool-answerable query family: R1 explicit tool-frame UK volume > 0; R2 family volume ≥1,000/mo AND decision/computation-shaped AND SERP top-10 prose-only; R3 screener-validated regulatory shock. Document the applied table (family|vol|gap|rule|verdict) in the plan. Wills yielded 7; divorce yields whatever it yields.
4. Identify 2 research data-PR assets from REAL published statistics (zero fabrication; source URLs mandatory; nulls never estimated). Wills used HMCTS FCSQ + HMRC TIIN. Divorce candidates: MoJ Family Court divorce statistics (applications/timeliness), ONS divorce rates, CMS/legal-aid stats, pension-sharing-order volumes — verify what actually exists before promising.

## Phase 1 — Scaffold (Sonnet)
Template = `construction-cis/web` (canonical; wills-probate/web is a second reference with the same shapes). Copy minus node_modules/.next/content/site-specific routes+tools+research+data. Create `<site>/niche.config.json` (validated by packages/web-shared/lib/niche-config.ts; required fields listed there). site_key/source_identifier final + brand-independent (e.g. `divorce-finances`). Placeholder display_name/domain greppable. company block verbatim Ashfield. partner = in-house (never name Reflex). NEW storage prefix (not bfp/wpc). Rewrite site.ts/service-tiers/lead-nurture (empty compiling stubs OK initially), leads handler source, purge every source-niche reference (grep sweep), pillar route stubs, /for audiences data, glossary seeds, vercel.json kept (monorepo installCommand). Exit: build green, tests green, zero content.
Known scaffold gotchas: experiments registry needs a new entry in packages/web-shared/experiments/registries (additive); resources/xlsx builders → empty BUILDERS; delete golden tests pinned to removed fixtures; root package.json workspaces entry.

## Phase 2 — Calculators + copy + research (parallel fan-out; stage in scratchpad if scaffold still running, else write direct)
- Calculators (Sonnet build): shared ground-truth math module (mirror estate-tax.ts/cis-tax.ts role) + one GenericTool file per tool (contract: packages/web-shared/tools/types.ts) + vitest edge-case tests + registry entries. Every tool: workedExamples (GEO), faqs, specialist-handoff close, MiniCapture on result.
- Pillar pages + core copy (Opus subagents): 3-5 pillar/commercial pages targeting delegation queries; homepage/about/contact/thank-you/for-audiences/service-tiers. Use {{BRAND}} token → replaced with siteConfig variable at integration, never hardcoded. Writers MUST flag every figure they weren't 100% sure of.
- Research assets (Opus): snapshot JSON (meta/sources/headline/series) + page copy + CSV /data route spec, pattern = construction-cis uk-construction-index (page + force-static CSV + Article/Dataset/FAQ JSON-LD + OGL attribution).
- START `docs/<site>/FACT_VERIFICATION_QUEUE.md` immediately; append every flagged figure from every agent.

## Phase 3 — Integration + verification (sequence matters)
1. Integrate (Sonnet): staged calculators/copy/research into site; intent taxonomy category→tool mapping; sitemap additions; build + site-local vitest green. (Run vitest from the site dir, not the shared package config.)
2. **Fact-verification pass (Opus, WebSearch)**: every queue item vs PRIMARY sources, FIX in place, tick with source URL. Expect drift: in the wills build 4 figures had moved between writing and verification (probate fee £300→£526 Jul 2026, LPA £82→£92, deputyship £421→£432, BR cap £1m→£2.5m transferable) and one scope error (death-in-service). Also: dash sweep (zero tolerance, includes calculator strings), regulated-language sweep.
3. Propagate corrected figures into the engine SITE_CONFIG hallucination_zones (they were written earlier; they WILL be stale).
4. Commit site tree.

## Phase 4 — Engine registration (Sonnet; see COORDINATION below)
Exact edit list: routing_safety.py EXPECTED_SITE_PREFIXES (required, import fails without); new site_configs/<site>.py (auto-discovered; mirror wills_probate.py which has the YMYL-hardened prompt shape); gsc_page_client _SITE_URL_MAP; bing_query_client DEFAULT_SITE_URL; indexing/config.py SITE_INDEXNOW_CONFIG (new 32-hex key; public .txt only at G1); ops/spinup_site.py EXISTING_SITE_KEYS + EXISTING_LEAD_SOURCES; scripts/spinup_site_check.py SITE_DIR_CANDIDATES; .github/workflows/ci-build-test.yml matrix; sites/<site>.json resolver paths; docs/<site>/STATE.md with `brand_locked: true` + brand-agnostic-bodies note (satisfies generate.py brand-lock gate without violating deferred brand). Sanity: import SITE_CONFIGS.

## Phase 5 — Corpus waves (batch size 1)
1. Write a shared wave brief file (scratchpad): exact frontmatter spec (mirror a construction-cis post; required: slug/title/date/category/metaDescription + full house set), raw-HTML body rules, voice/compliance block, ALL locked figures verbatim (post-verification values), the complete internal-link whitelist INCLUDING the wave's own predefined slugs with category paths (predefine every slug before launching so cross-links are safe), scope guards per post (each post owns one intent; siblings linked not answered), calculator embed mandate (AIO countermeasure: BLUF answer + tool reason to click), 3+ primary-source citations, Unsplash image verified 200 via WebFetch.
2. **Per-topic brief step (learned gap — do NOT skip)**: before writers run, produce a mini competitor/SERP brief per topic (WebSearch top results + serps.json evidence + competitor corpus URLs for that topic) and include it in each writer's prompt. The engine's GSC-driven brief pipeline can't run pre-launch; this substitutes.
3. Launch one Opus writer per topic (inherited model), ~13-14 parallel per wave. Merge obvious same-SERP-intent head duplicates before launch.
4. Gates after each wave: slug_resolver selftest (0 unresolved), build green, then THREE QA passes — run Track A and Track B SEQUENTIALLY, not concurrently (wills ran 3 concurrent editors on the same files; it worked but was conflict-prone): Track A factual (locked figures verbatim, frontmatter schema, link whitelist incl. external-domain whitelist, regulated language); Track B editorial (cross-post sameness from parallel authorship: identical openers/FAQ repeats/stock sentences; image diversification max 2 uses per image; cannibalisation trim; AI-tell purge); Track C retroactive SERP-gap patch (per-keyword top-results diff, patch material gaps only). Then reconciliation: dash grep + slug resolver + rebuild. Commit.
5. **Owner spot-check gate after wave 1** before waves 2-4 fan out.

## Phase 6 — Conversion stack completion + deploy prep (before G1)
Nurture sequences (Opus copy; structure = LeadNurtureConfig, two sequences: contactability 8-step ~11 days + detail-capture email-only; niche-sensitive cadence adjustments), re-enable enrollLead; Supabase migration (single tranche: re-read live constraint defs via pg_get_constraintdef, DROP+re-ADD leads_source_valid + sites_site_key_check with full key lists, INSERT sites row active=false, ON CONFLICT DO NOTHING); Vercel project (Root Directory <site>/web, team sitenudge-projects); spinup_site_check all-PASS; test-lead cycle (DISABLE leads_to_email_trg + leads_to_enrich_trg first, verify row, re-enable, DELETE).
**G1 (owner)**: brand+domain decision (present the silent shortlist), rename swap (grep gate: placeholder only in niche.config.json; also engine maps + IndexNow host + key .txt + CI matrix URL), domain attach (apex 308→www via Vercel), prod deploy sign-off, day-one runbook (IndexNow all URLs, owner GSC sitemap + Request Indexing, monitored_pages, live battery re-run).

## COORDINATION — two builds running simultaneously
The wills-probate build (this session) and the next-site build share these files; expect merge conflicts if edited concurrently. Rules for the fresh agent:
- Shared touchpoints: routing_safety.py, spinup_site.py, spinup_site_check.py, indexing/config.py, gsc_page_client.py, bing_query_client.py, ci-build-test.yml, packages/web-shared/experiments/registries/index.ts, root package.json workspaces, supabase constraint migrations (list ALL keys incl. wills-probate when re-adding constraints).
- Before editing any shared file: `git pull`/check current branch state; make additive single-key edits only; commit shared-file edits promptly and small.
- Branch: coordinate with owner; wills-probate is on `expansion/phase-0`.
- Do NOT touch `wills-probate/**` or its docs.
- Supabase migration: whichever build runs its migration second must include the first's keys (re-read live constraints first — the migration pattern already mandates this).

## Reference paths (wills build artefacts, use as live examples)
- Site: `wills-probate/web` (57+ routes, calculators in src/lib/calculators/, research pattern in src/app/research/)
- Engine config example: `optimisation_engine/blog_generator/site_configs/wills_probate.py`
- Pool + competitor corpus + verification queue + STATE: `docs/wills-probate/`
- Wave brief example: session scratchpad `wave1-brief.md` pattern is embedded in this playbook §5.1
- Template runbook: `docs/construction-cis/STATE.md` (§2 deploy-day battery)

## Divorce-finances specifics (next site)
- Screener evidence: cross-domain league `docs/_engines/CROSS_DOMAIN_LEAGUE_2026-07-24.md` (59.9); full research export likely NOT yet generated — Phase 0 step 1 applies.
- Candidate calculator families to TEST against the data (do not assume): divorce cost, financial settlement estimator, spousal maintenance, child maintenance (CMS formula is published — strong tool candidate), pension sharing/offsetting, house-who-keeps-it/buyout, form E checklist. Apply R1/R2/R3 strictly.
- Regulatory cautions: no family-law advice claims; child arrangements = extra-sensitive tone; CMS figures = gov.uk formula verbatim; pensions = no product advice (sharing orders factual only); avoid McKenzie-friend/claims-management territory. Lead selling in family law: VERIFY regulatory position before building the lead model (wills was unregulated; divorce may differ — check SRA/claims-management scope for family matters explicitly in Phase 0).
- Same Ashfield entity, same /contact model, new source key `divorce-finances`, new storage prefix.
